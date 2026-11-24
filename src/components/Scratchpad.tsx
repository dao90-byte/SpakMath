import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Pencil, Eraser, Trash2, X, Undo2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCRATCHPAD_STORAGE_KEY = 'spark_math_scratchpad_data';
const MAX_STROKE_HISTORY = 120;
const PERSIST_DEBOUNCE_MS = 1200;
const CANVAS_BG = '#050A1F';
const GRID_STEP = 28;

interface StrokeRecord {
  tool: 'pencil' | 'eraser';
  color: string;
  width: number;
  /** Flat interleaved [x0, y0, x1, y1, ...] in CSS px relative to canvas */
  points: number[];
}

interface DelegatedInkTrailPresenterLike {
  updateInkTrailStartPoint: (
    event: PointerEvent,
    style: { color: string; diameter: number }
  ) => void;
}

interface NavigatorWithInk extends Navigator {
  ink?: {
    requestPresenter?: (params?: {
      presentationArea?: Element | null;
    }) => Promise<DelegatedInkTrailPresenterLike>;
  };
}

/**
 * Creates a 28×28 repeating cosmic star-chart tile for opaque `alpha: false` canvas fill & seamless erasing.
 */
function createCosmicGridPattern(
  ctx: CanvasRenderingContext2D
): CanvasPattern | null {
  const tile = document.createElement('canvas');
  tile.width = GRID_STEP;
  tile.height = GRID_STEP;
  const tCtx = tile.getContext('2d', { alpha: false });
  if (!tCtx) return null;

  tCtx.fillStyle = CANVAS_BG;
  tCtx.fillRect(0, 0, GRID_STEP, GRID_STEP);
  tCtx.strokeStyle = 'rgba(56, 189, 248, 0.09)';
  tCtx.lineWidth = 1;
  tCtx.beginPath();
  tCtx.moveTo(0.5, 0);
  tCtx.lineTo(0.5, GRID_STEP);
  tCtx.moveTo(0, 0.5);
  tCtx.lineTo(GRID_STEP, 0.5);
  tCtx.stroke();

  return ctx.createPattern(tile, 'repeat');
}

/**
 * Replays a single vector stroke onto a 2D context in one batched GPU draw call.
 */
function renderVectorStroke(
  ctx: CanvasRenderingContext2D,
  stroke: StrokeRecord,
  gridPattern: CanvasPattern | null
) {
  const pts = stroke.points;
  const count = pts.length;
  if (count < 2) return;

  const isEraser = stroke.tool === 'eraser';
  const fillOrStroke: string | CanvasPattern = isEraser
    ? gridPattern || CANVAS_BG
    : stroke.color;

  ctx.globalCompositeOperation = 'source-over';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke.width;
  ctx.strokeStyle = fillOrStroke;
  ctx.fillStyle = fillOrStroke;

  if (count === 2) {
    ctx.beginPath();
    ctx.arc(pts[0], pts[1], stroke.width * 0.5, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.beginPath();
  ctx.moveTo(pts[0], pts[1]);

  if (count === 4) {
    ctx.lineTo(pts[2], pts[3]);
    ctx.stroke();
    return;
  }

  let prevX = pts[0];
  let prevY = pts[1];
  for (let i = 2; i < count - 2; i += 2) {
    const x = pts[i];
    const y = pts[i + 1];
    const midX = (prevX + x) * 0.5;
    const midY = (prevY + y) * 0.5;
    ctx.quadraticCurveTo(prevX, prevY, midX, midY);
    prevX = x;
    prevY = y;
  }
  ctx.quadraticCurveTo(prevX, prevY, pts[count - 2], pts[count - 1]);
  ctx.stroke();
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const gridPatternRef = useRef<CanvasPattern | null>(null);
  const inkPresenterRef = useRef<DelegatedInkTrailPresenterLike | null>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
  });
  const dprRef = useRef<number>(1);

  // Zero-GPU-readback vector stroke history + optional previous-session raster base
  const strokesRef = useRef<StrokeRecord[]>([]);
  const baseImageRef = useRef<HTMLImageElement | null>(null);
  const savedDataUrlRef = useRef<string | null>(null);
  const isDirtyRef = useRef<boolean>(false);

  // Active stroke mutable refs (ZERO React re-renders during drawing)
  const isDrawingRef = useRef<boolean>(false);
  const activePointerIdRef = useRef<number | null>(null);
  const activeStrokeRef = useRef<StrokeRecord | null>(null);
  const lastXRef = useRef<number>(0);
  const lastYRef = useRef<number>(0);
  const lastMidXRef = useRef<number>(0);
  const lastMidYRef = useRef<number>(0);
  const rawUpdateSeenRef = useRef<boolean>(false);

  const persistTimerRef = useRef<number | null>(null);
  const idleCallbackIdRef = useRef<number | null>(null);

  const [color, setColor] = useState('#38BDF8');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [canUndo, setCanUndo] = useState(false);

  const toolRef = useRef(tool);
  const colorRef = useRef(color);
  const lineWidthRef = useRef(lineWidth);

  useEffect(() => {
    toolRef.current = tool;
  }, [tool]);

  useEffect(() => {
    colorRef.current = color;
  }, [color]);

  useEffect(() => {
    lineWidthRef.current = lineWidth;
  }, [lineWidth]);

  // Load saved drawing once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SCRATCHPAD_STORAGE_KEY);
      if (saved) {
        savedDataUrlRef.current = saved;
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const cancelScheduledPersist = useCallback(() => {
    if (persistTimerRef.current !== null) {
      window.clearTimeout(persistTimerRef.current);
      persistTimerRef.current = null;
    }
    if (idleCallbackIdRef.current !== null && 'cancelIdleCallback' in window) {
      (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(
        idleCallbackIdRef.current
      );
      idleCallbackIdRef.current = null;
    }
  }, []);

  const persistNow = useCallback(() => {
    cancelScheduledPersist();
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0 || !isDirtyRef.current) return;
    try {
      // WebP encoding is 3–5× faster than PNG; falls back to PNG transparently if unsupported
      let dataUrl = canvas.toDataURL('image/webp', 0.88);
      if (!dataUrl.startsWith('data:image/webp')) {
        dataUrl = canvas.toDataURL('image/png');
      }
      savedDataUrlRef.current = dataUrl;
      isDirtyRef.current = false;
      localStorage.setItem(SCRATCHPAD_STORAGE_KEY, dataUrl);
    } catch {
      // Ignore storage quota errors; in-memory strokes still keep progress
    }
  }, [cancelScheduledPersist]);

  const scheduleBackgroundPersist = useCallback(() => {
    cancelScheduledPersist();
    persistTimerRef.current = window.setTimeout(() => {
      persistTimerRef.current = null;
      const runSave = () => {
        idleCallbackIdRef.current = null;
        if (!isDrawingRef.current) {
          persistNow();
        }
      };
      if ('requestIdleCallback' in window) {
        idleCallbackIdRef.current = (
          window as unknown as {
            requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
          }
        ).requestIdleCallback(runSave, { timeout: 1500 });
      } else {
        runSave();
      }
    }, PERSIST_DEBOUNCE_MS);
  }, [cancelScheduledPersist, persistNow]);

  const repaintFullCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = dprRef.current;
    const cssW = canvas.width / dpr;
    const cssH = canvas.height / dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = gridPatternRef.current || CANVAS_BG;
    ctx.fillRect(0, 0, cssW, cssH);

    if (baseImageRef.current && baseImageRef.current.complete) {
      ctx.drawImage(baseImageRef.current, 0, 0, cssW, cssH);
    }

    const strokes = strokesRef.current;
    for (let i = 0; i < strokes.length; i++) {
      renderVectorStroke(ctx, strokes[i], gridPatternRef.current);
    }
  }, []);

  // Initialize opaque desynchronized 2D context, W3C Delegated Ink API, ResizeObserver & pointerrawupdate
  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    const syncRect = () => {
      const r = canvas.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top, width: r.width, height: r.height };
      return r;
    };

    const initCanvasBackingStore = () => {
      if (cancelled) return;
      const r = syncRect();
      if (r.width === 0 || r.height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const targetW = Math.max(1, Math.floor(r.width * dpr));
      const targetH = Math.max(1, Math.floor(r.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      if (!ctxRef.current) {
        // Opaque + desynchronized unlocks direct hardware scanout low-latency ink in Chromium
        const ctx =
          (canvas.getContext('2d', {
            alpha: false,
            desynchronized: true,
          }) as CanvasRenderingContext2D | null) || canvas.getContext('2d');
        if (!ctx) return;
        ctxRef.current = ctx;
        gridPatternRef.current = createCosmicGridPattern(ctx);
      }

      repaintFullCanvas();

      // Load saved session raster base once if present and not yet loaded
      if (savedDataUrlRef.current && !baseImageRef.current && strokesRef.current.length === 0) {
        const img = new Image();
        img.onload = () => {
          if (cancelled) return;
          baseImageRef.current = img;
          repaintFullCanvas();
        };
        img.src = savedDataUrlRef.current;
      }
    };

    const rafId = requestAnimationFrame(initCanvasBackingStore);

    // Request W3C OS-Compositor Delegated Ink Presenter when supported (Chrome/Edge)
    const navWithInk = navigator as NavigatorWithInk;
    if (navWithInk.ink?.requestPresenter) {
      navWithInk.ink
        .requestPresenter({ presentationArea: canvas })
        .then((presenter) => {
          if (!cancelled) {
            inkPresenterRef.current = presenter;
          }
        })
        .catch(() => {
          inkPresenterRef.current = null;
        });
    }

    // Keep cached bounding rect synchronized automatically (zero layout reflow during drawing)
    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            initCanvasBackingStore();
          })
        : null;
    resizeObserver?.observe(canvas);

    const handleWindowShift = () => {
      syncRect();
    };

    const applyActiveStrokeStyle = (ctx: CanvasRenderingContext2D, isEraser: boolean, width: number, strokeColor: string) => {
      const style: string | CanvasPattern = isEraser
        ? gridPatternRef.current || CANVAS_BG
        : strokeColor;
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = width;
      ctx.strokeStyle = style;
      ctx.fillStyle = style;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const processPointerSamples = (e: PointerEvent) => {
      const ctx = ctxRef.current;
      const stroke = activeStrokeRef.current;
      if (!ctx || !stroke) return;

      const { left, top } = rectRef.current;
      const coalesced =
        typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
      const samples = coalesced && coalesced.length > 0 ? coalesced : [e];

      let prevX = lastXRef.current;
      let prevY = lastYRef.current;
      let prevMidX = lastMidXRef.current;
      let prevMidY = lastMidYRef.current;
      let drewAny = false;

      // Single batched GPU path for ALL coalesced points in this hardware tick
      ctx.beginPath();
      ctx.moveTo(prevMidX, prevMidY);

      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        const x = s.clientX - left;
        const y = s.clientY - top;
        const dx = x - prevX;
        const dy = y - prevY;
        if (dx * dx + dy * dy < 0.25) continue;

        const midX = (prevX + x) * 0.5;
        const midY = (prevY + y) * 0.5;

        ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        stroke.points.push(x, y);

        prevX = x;
        prevY = y;
        prevMidX = midX;
        prevMidY = midY;
        drewAny = true;
      }

      if (drewAny) {
        ctx.stroke();
        lastXRef.current = prevX;
        lastYRef.current = prevY;
        lastMidXRef.current = prevMidX;
        lastMidYRef.current = prevMidY;
      }

      // Feed OS-level Delegated Ink Trail for sub-frame visual response on pencil tool
      if (inkPresenterRef.current && stroke.tool === 'pencil') {
        try {
          inkPresenterRef.current.updateInkTrailStartPoint(e, {
            color: stroke.color,
            diameter: stroke.width,
          });
        } catch {
          // Ignore unsupported pointer types
        }
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      const ctx = ctxRef.current;
      if (!ctx) return;

      e.preventDefault();
      cancelScheduledPersist();

      // Ensure rect is initialized (only measure if somehow zero)
      if (rectRef.current.width === 0) {
        syncRect();
      }

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if unsupported
      }

      const isEraser = toolRef.current === 'eraser';
      const width = isEraser ? Math.max(24, lineWidthRef.current * 4) : lineWidthRef.current;
      const strokeColor = colorRef.current;

      applyActiveStrokeStyle(ctx, isEraser, width, strokeColor);

      const x = e.clientX - rectRef.current.left;
      const y = e.clientY - rectRef.current.top;

      isDrawingRef.current = true;
      activePointerIdRef.current = e.pointerId;
      rawUpdateSeenRef.current = false;
      lastXRef.current = x;
      lastYRef.current = y;
      lastMidXRef.current = x;
      lastMidYRef.current = y;

      activeStrokeRef.current = {
        tool: toolRef.current,
        color: strokeColor,
        width,
        points: [x, y],
      };

      // Instant zero-delay dot on pen contact
      ctx.beginPath();
      ctx.arc(x, y, width * 0.5, 0, Math.PI * 2);
      ctx.fill();

      if (inkPresenterRef.current && !isEraser) {
        try {
          inkPresenterRef.current.updateInkTrailStartPoint(e, {
            color: strokeColor,
            diameter: width,
          });
        } catch {
          // Ignore
        }
      }
    };

    const handlePointerRawUpdate = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
      rawUpdateSeenRef.current = true;
      processPointerSamples(e);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
      // If browser already delivered raw sub-frame hardware updates for this stroke, skip redundant vsync move
      if (rawUpdateSeenRef.current) return;
      processPointerSamples(e);
    };

    const finishStroke = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
      const ctx = ctxRef.current;
      const stroke = activeStrokeRef.current;

      if (ctx && stroke) {
        const endX = e.clientX - rectRef.current.left;
        const endY = e.clientY - rectRef.current.top;
        const dx = endX - lastXRef.current;
        const dy = endY - lastYRef.current;

        if (dx * dx + dy * dy >= 0.25) {
          ctx.beginPath();
          ctx.moveTo(lastMidXRef.current, lastMidYRef.current);
          ctx.quadraticCurveTo(lastXRef.current, lastYRef.current, endX, endY);
          ctx.stroke();
          stroke.points.push(endX, endY);
        }

        // O(1) in-memory vector commit — ZERO GPU readback (getImageData) stall!
        strokesRef.current.push(stroke);
        if (strokesRef.current.length > MAX_STROKE_HISTORY) {
          strokesRef.current.shift();
        }
        setCanUndo((prev) => (prev ? prev : true));
      }

      isDrawingRef.current = false;
      activePointerIdRef.current = null;
      activeStrokeRef.current = null;
      rawUpdateSeenRef.current = false;

      try {
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }

      isDirtyRef.current = true;
      scheduleBackgroundPersist();
    };

    canvas.addEventListener('pointerdown', handlePointerDown, { passive: false });
    canvas.addEventListener(
      'pointerrawupdate' as keyof HTMLElementEventMap,
      handlePointerRawUpdate as EventListener,
      { passive: true }
    );
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerup', finishStroke, { passive: true });
    canvas.addEventListener('pointercancel', finishStroke, { passive: true });
    window.addEventListener('resize', handleWindowShift, { passive: true });
    window.addEventListener('scroll', handleWindowShift, { passive: true });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      resizeObserver?.disconnect();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener(
        'pointerrawupdate' as keyof HTMLElementEventMap,
        handlePointerRawUpdate as EventListener
      );
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', finishStroke);
      canvas.removeEventListener('pointercancel', finishStroke);
      window.removeEventListener('resize', handleWindowShift);
      window.removeEventListener('scroll', handleWindowShift);
      inkPresenterRef.current = null;
      persistNow();
      ctxRef.current = null;
      gridPatternRef.current = null;
    };
  }, [isOpen, cancelScheduledPersist, persistNow, repaintFullCanvas, scheduleBackgroundPersist]);

  const handleUndo = () => {
    if (strokesRef.current.length === 0) return;
    sound.playClick();
    strokesRef.current.pop();
    setCanUndo(strokesRef.current.length > 0);
    repaintFullCanvas();
    isDirtyRef.current = true;
    scheduleBackgroundPersist();
  };

  const clearAllCanvas = () => {
    sound.playWrong();
    cancelScheduledPersist();
    strokesRef.current = [];
    baseImageRef.current = null;
    savedDataUrlRef.current = null;
    isDirtyRef.current = false;
    setCanUndo(false);
    repaintFullCanvas();
    try {
      localStorage.removeItem(SCRATCHPAD_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleClose = useCallback(() => {
    persistNow();
    onClose();
  }, [persistNow, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const colorPalette = ['#38BDF8', '#FDE047', '#34D399', '#FB7185', '#F97316', '#FFFFFF'];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[#030617]/92 p-1.5 sm:p-2.5"
      onClick={handleClose}
    >
      <div
        className="relative bg-[linear-gradient(160deg,_rgba(11,20,54,0.99),_rgba(5,10,32,1))] rounded-2xl shadow-[0_24px_64px_rgba(3,7,24,0.92),0_0_32px_rgba(34,211,238,0.16)] border border-sky-300/40 w-[98vw] max-w-[1680px] h-[94vh] flex flex-col overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-sky-300 via-cyan-300 to-amber-300"
        />

        {/* Compact Single-Row Toolbar */}
        <div className="relative bg-[linear-gradient(180deg,_rgba(11,21,58,0.98),_rgba(7,13,38,0.98))] border-b border-sky-300/30 px-3.5 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setTool('pencil');
                sound.playClick();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                tool === 'pencil'
                  ? 'bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950 shadow-[0_0_14px_rgba(56,189,248,0.45)]'
                  : 'bg-white/[0.07] text-sky-100 border border-sky-300/30 hover:bg-sky-400/18'
              }`}
            >
              <Pencil className="w-4 h-4" />
              Bút vẽ
            </button>
            <button
              type="button"
              onClick={() => {
                setTool('eraser');
                sound.playClick();
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                tool === 'eraser'
                  ? 'bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950 shadow-[0_0_14px_rgba(56,189,248,0.45)]'
                  : 'bg-white/[0.07] text-sky-100 border border-sky-300/30 hover:bg-sky-400/18'
              }`}
            >
              <Eraser className="w-4 h-4" />
              Tẩy gôm
            </button>
          </div>

          {/* Color palette */}
          {tool === 'pencil' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-sky-200/95 hidden sm:inline whitespace-nowrap">Màu nét:</span>
              <div className="flex items-center gap-1.5">
                {colorPalette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setColor(c);
                      sound.playClick();
                    }}
                    style={{ backgroundColor: c }}
                    aria-label={`Chọn màu ${c}`}
                    className={`w-7 h-7 rounded-full transition-transform border-2 cursor-pointer ${
                      color === c
                        ? 'scale-115 border-white ring-2 ring-sky-300'
                        : 'border-white/45 hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Line width */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-200/95 tabular-nums whitespace-nowrap">
              Nét bút: {lineWidth}px
            </span>
            <input
              type="range"
              min="2"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-20 sm:w-24 accent-sky-400 cursor-pointer"
            />
          </div>

          {/* Undo, Clear All & Close buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!canUndo}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-colors whitespace-nowrap shrink-0 ${
                canUndo
                  ? 'bg-white/[0.08] text-sky-100 hover:bg-sky-400/20 border-sky-300/35 cursor-pointer'
                  : 'bg-white/[0.03] text-slate-500 border-white/10 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
              Hoàn tác
            </button>

            <button
              type="button"
              onClick={clearAllCanvas}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-100 hover:bg-rose-500/30 text-xs font-bold border border-rose-400/50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Xóa tất cả
            </button>

            <div className="h-6 w-px bg-sky-300/25 mx-0.5" aria-hidden="true" />

            <button
              type="button"
              onClick={handleClose}
              aria-label="Đóng bảng nháp"
              title="Đóng bảng nháp (tự động lưu bài vẽ)"
              className="w-9 h-9 rounded-xl bg-white/[0.08] hover:bg-sky-400/20 border border-sky-300/35 hover:border-sky-300/75 flex items-center justify-center transition-colors text-white cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Unobstructed Opaque Direct-Scanout Canvas Area (zero overlapping DOM elements) */}
        <div
          className="flex-1 bg-[#050A1F] relative cursor-crosshair overflow-hidden select-none"
          style={{ contain: 'strict' }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
          />
        </div>
      </div>
    </div>
  );
};
