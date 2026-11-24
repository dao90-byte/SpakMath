import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Pencil,
  Eraser,
  Undo2,
  Trash2,
  MousePointer2,
  ArrowLeftRight,
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const SCREEN_INK_CLEAR_EVENT = 'mindmath_clear_screen_ink';

export function clearExerciseScreenInk() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(SCREEN_INK_CLEAR_EVENT));
  }
}

interface ScreenAnnotationOverlayProps {
  /** Only renders when the user is inside an active exercise/test screen */
  isActive: boolean;
  /** Temporarily hides the overlay controls while full-screen modals like Scratchpad are open */
  isSuspended?: boolean;
  /** Raises z-index above z-50 modal-based assessments while staying below Scratchpad (z-60) */
  elevated?: boolean;
  /** Changing contextKey (e.g. switching day, test, or lesson) automatically clears previous strokes */
  contextKey: string;
}

type AnnotationMode = 'interact' | 'pen' | 'eraser';

interface InkColorOption {
  id: string;
  label: string;
  hex: string;
  ringClass: string;
}

/** 3 curated high-contrast colors tailored for the dark cosmic MindMath workspace */
const INK_COLORS: InkColorOption[] = [
  {
    id: 'gold',
    label: 'Vàng sáng',
    hex: '#FACC15',
    ringClass: 'ring-amber-300',
  },
  {
    id: 'cyan',
    label: 'Xanh biển',
    hex: '#38BDF8',
    ringClass: 'ring-sky-300',
  },
  {
    id: 'coral',
    label: 'Đỏ san hô',
    hex: '#FB7185',
    ringClass: 'ring-rose-300',
  },
];

const PEN_WIDTH = 3.5;
const ERASER_WIDTH = 24;
const MAX_STROKE_HISTORY = 120;

interface OverlayStrokeRecord {
  tool: 'pen' | 'eraser';
  color: string;
  width: number;
  /** Viewport-fixed interleaved [x0, y0, x1, y1, ...] so strokes stay motionless when scrolling */
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

function replayOverlayStroke(
  ctx: CanvasRenderingContext2D,
  stroke: OverlayStrokeRecord
) {
  const pts = stroke.points;
  const count = pts.length;
  if (count < 2) return;

  const isEraser = stroke.tool === 'eraser';
  ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = stroke.width;
  ctx.strokeStyle = isEraser ? '#000000' : stroke.color;
  ctx.fillStyle = isEraser ? '#000000' : stroke.color;

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

export const ScreenAnnotationOverlay: React.FC<ScreenAnnotationOverlayProps> = ({
  isActive,
  isSuspended = false,
  elevated = false,
  contextKey,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const inkPresenterRef = useRef<DelegatedInkTrailPresenterLike | null>(null);
  const dprRef = useRef<number>(1);

  const strokesRef = useRef<OverlayStrokeRecord[]>([]);
  const isDrawingRef = useRef<boolean>(false);
  const activePointerIdRef = useRef<number | null>(null);
  const activeStrokeRef = useRef<OverlayStrokeRecord | null>(null);
  const lastXRef = useRef<number>(0);
  const lastYRef = useRef<number>(0);
  const lastMidXRef = useRef<number>(0);
  const lastMidYRef = useRef<number>(0);
  const rawUpdateSeenRef = useRef<boolean>(false);

  const [mode, setMode] = useState<AnnotationMode>('interact');
  const [selectedColor, setSelectedColor] = useState<string>(INK_COLORS[0].hex);
  const [strokeCount, setStrokeCount] = useState<number>(0);
  const [dockSide, setDockSide] = useState<'left' | 'right'>('left');

  const modeRef = useRef<AnnotationMode>(mode);
  const colorRef = useRef<string>(selectedColor);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  const repaintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const dpr = dprRef.current;
    // Clear full viewport in device pixel coordinates
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const strokes = strokesRef.current;
    if (strokes.length === 0) return;

    // Fixed viewport space: strokes never move when scrolling the screen
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let i = 0; i < strokes.length; i++) {
      replayOverlayStroke(ctx, strokes[i]);
    }
    ctx.globalCompositeOperation = 'source-over';
  }, []);

  const clearStrokes = useCallback(() => {
    strokesRef.current = [];
    setStrokeCount(0);
    repaintCanvas();
  }, [repaintCanvas]);

  // Reset strokes & return to interact mode when leaving exercise or switching exercise context
  useEffect(() => {
    strokesRef.current = [];
    setStrokeCount(0);
    setMode('interact');
    repaintCanvas();
  }, [isActive, contextKey, repaintCanvas]);

  // Clear ink automatically when navigating between questions inside an exercise
  useEffect(() => {
    if (!isActive) return;
    const handleClearEvent = () => {
      strokesRef.current = [];
      setStrokeCount(0);
      repaintCanvas();
    };
    window.addEventListener(SCREEN_INK_CLEAR_EVENT, handleClearEvent);
    return () => window.removeEventListener(SCREEN_INK_CLEAR_EVENT, handleClearEvent);
  }, [isActive, repaintCanvas]);

  // Press Escape to swiftly switch back from drawing mode to normal interactive mode
  useEffect(() => {
    if (!isActive || mode === 'interact' || isSuspended) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMode('interact');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isActive, mode, isSuspended]);

  // Initialize transparent viewport-sized low-latency canvas & listeners
  useEffect(() => {
    if (!isActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    const syncCanvasSize = () => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const targetW = Math.max(1, Math.floor(window.innerWidth * dpr));
      const targetH = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      if (!ctxRef.current) {
        const ctx =
          (canvas.getContext('2d', {
            alpha: true,
            desynchronized: true,
          }) as CanvasRenderingContext2D | null) || canvas.getContext('2d');
        if (!ctx) return;
        ctxRef.current = ctx;
      }
      repaintCanvas();
    };

    syncCanvasSize();

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

    const applyStrokeStyle = (
      ctx: CanvasRenderingContext2D,
      isEraser: boolean,
      width: number,
      strokeColor: string
    ) => {
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = isEraser ? 'destination-out' : 'source-over';
      ctx.lineWidth = width;
      ctx.strokeStyle = isEraser ? '#000000' : strokeColor;
      ctx.fillStyle = isEraser ? '#000000' : strokeColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const processSamples = (e: PointerEvent) => {
      const ctx = ctxRef.current;
      const stroke = activeStrokeRef.current;
      if (!ctx || !stroke) return;

      const coalesced =
        typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
      const samples = coalesced && coalesced.length > 0 ? coalesced : [e];

      let prevX = lastXRef.current;
      let prevY = lastYRef.current;
      let prevMidX = lastMidXRef.current;
      let prevMidY = lastMidYRef.current;
      let drewAny = false;

      ctx.beginPath();
      ctx.moveTo(prevMidX, prevMidY);

      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        const x = s.clientX;
        const y = s.clientY;
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

      if (inkPresenterRef.current && stroke.tool === 'pen') {
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
      const currentMode = modeRef.current;
      if (currentMode === 'interact') return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const ctx = ctxRef.current;
      if (!ctx) return;

      e.preventDefault();

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if unsupported
      }

      const isEraser = currentMode === 'eraser';
      const width = isEraser ? ERASER_WIDTH : PEN_WIDTH;
      const strokeColor = colorRef.current;

      applyStrokeStyle(ctx, isEraser, width, strokeColor);

      const x = e.clientX;
      const y = e.clientY;

      isDrawingRef.current = true;
      activePointerIdRef.current = e.pointerId;
      rawUpdateSeenRef.current = false;
      lastXRef.current = x;
      lastYRef.current = y;
      lastMidXRef.current = x;
      lastMidYRef.current = y;

      activeStrokeRef.current = {
        tool: isEraser ? 'eraser' : 'pen',
        color: strokeColor,
        width,
        points: [x, y],
      };

      // Instant zero-delay contact dot
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
      processSamples(e);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
      if (rawUpdateSeenRef.current) return;
      processSamples(e);
    };

    const finishStroke = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
      const ctx = ctxRef.current;
      const stroke = activeStrokeRef.current;

      if (ctx && stroke) {
        const endX = e.clientX;
        const endY = e.clientY;
        const dx = endX - lastXRef.current;
        const dy = endY - lastYRef.current;

        if (dx * dx + dy * dy >= 0.25) {
          ctx.beginPath();
          ctx.moveTo(lastMidXRef.current, lastMidYRef.current);
          ctx.quadraticCurveTo(lastXRef.current, lastYRef.current, endX, endY);
          ctx.stroke();
          stroke.points.push(endX, endY);
        }

        strokesRef.current.push(stroke);
        if (strokesRef.current.length > MAX_STROKE_HISTORY) {
          strokesRef.current.shift();
        }
        setStrokeCount(strokesRef.current.length);
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
    window.addEventListener('resize', syncCanvasSize, { passive: true });

    return () => {
      cancelled = true;
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener(
        'pointerrawupdate' as keyof HTMLElementEventMap,
        handlePointerRawUpdate as EventListener
      );
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', finishStroke);
      canvas.removeEventListener('pointercancel', finishStroke);
      window.removeEventListener('resize', syncCanvasSize);
      inkPresenterRef.current = null;
      ctxRef.current = null;
    };
  }, [isActive, repaintCanvas]);

  const handleSelectColor = (hex: string) => {
    sound.playClick();
    if (mode === 'pen' && selectedColor === hex) {
      // Tapping the already-active color toggles cleanly back to normal interactive mode
      setMode('interact');
      return;
    }
    setSelectedColor(hex);
    setMode('pen');
  };

  const handleTogglePen = () => {
    sound.playClick();
    setMode((prev) => (prev === 'pen' ? 'interact' : 'pen'));
  };

  const handleToggleEraser = () => {
    sound.playClick();
    setMode((prev) => (prev === 'eraser' ? 'interact' : 'eraser'));
  };

  const handleUndo = () => {
    if (strokesRef.current.length === 0) return;
    sound.playClick();
    strokesRef.current.pop();
    setStrokeCount(strokesRef.current.length);
    repaintCanvas();
  };

  const handleClear = () => {
    if (strokesRef.current.length === 0) return;
    sound.playWrong();
    clearStrokes();
  };

  if (!isActive) return null;

  const isDrawingMode = mode !== 'interact';
  const showExtendedControls = isDrawingMode || strokeCount > 0;
  const activeColorMeta = INK_COLORS.find((c) => c.hex === selectedColor) || INK_COLORS[0];

  return (
    <>
      {/* Transparent Direct-On-Screen Drawing Layer (100% pass-through when mode === 'interact') */}
      <canvas
        ref={canvasRef}
        aria-hidden={!isDrawingMode}
        className={`fixed inset-0 ${elevated ? 'z-[52]' : 'z-[38]'} w-screen h-screen block ${
          isDrawingMode && !isSuspended
            ? 'pointer-events-auto touch-none cursor-crosshair'
            : 'pointer-events-none'
        }`}
      />

      {/* Compact, Unobtrusive, High-Visibility Floating 3-Color Pen Dock */}
      {!isSuspended && (
        <aside
          aria-label="Thanh bút vẽ trực tiếp lên màn hình bài tập"
          className={`fixed bottom-3.5 ${elevated ? 'z-[55]' : 'z-[45]'} transition-all duration-200 select-none ${
            dockSide === 'left' ? 'left-3.5 sm:left-5' : 'right-3.5 sm:right-5'
          }`}
        >
          <div
            className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 rounded-2xl backdrop-blur-2xl border transition-all duration-200 ${
              isDrawingMode
                ? 'bg-[rgba(7,15,44,0.95)] border-sky-300/80 shadow-[0_12px_36px_rgba(2,6,23,0.85),0_0_24px_rgba(56,189,248,0.34)]'
                : 'bg-[rgba(8,16,46,0.88)] border-sky-300/45 shadow-[0_10px_30px_rgba(2,6,23,0.75),0_0_16px_rgba(56,189,248,0.18)] hover:border-sky-300/75'
            }`}
          >
            {/* Pen Mode Primary Toggle Button */}
            <button
              type="button"
              onClick={handleTogglePen}
              aria-pressed={mode === 'pen'}
              title={
                mode === 'pen'
                  ? 'Đang vẽ trực tiếp — Bấm để quay lại chế độ thao tác (Esc)'
                  : 'Bật bút vẽ trực tiếp lên màn hình bài tập'
              }
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                mode === 'pen'
                  ? 'bg-gradient-to-r from-sky-300 to-cyan-300 text-slate-950 shadow-[0_0_14px_rgba(56,189,248,0.5)]'
                  : 'bg-white/[0.08] hover:bg-sky-400/20 text-sky-100 border border-sky-300/30'
              }`}
            >
              <Pencil className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{mode === 'pen' ? 'Đang vẽ' : 'Bút vẽ'}</span>
            </button>

            {/* 3 High-Contrast Ink Colors — Always neatly visible for 1-tap drawing */}
            <div
              role="group"
              aria-label="Chọn 3 màu bút vẽ"
              className="flex items-center gap-1.5 px-1.5 py-1 rounded-xl bg-white/[0.05] border border-white/10"
            >
              {INK_COLORS.map((swatch) => {
                const isSelected = selectedColor === swatch.hex;
                const isActiveDrawingColor = mode === 'pen' && isSelected;
                return (
                  <button
                    key={swatch.id}
                    type="button"
                    onClick={() => handleSelectColor(swatch.hex)}
                    aria-label={`Bút màu ${swatch.label}${isActiveDrawingColor ? ' (Đang chọn — bấm lại để tắt)' : ''}`}
                    aria-pressed={isActiveDrawingColor}
                    title={`Vẽ màu ${swatch.label}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                      isActiveDrawingColor
                        ? `scale-110 ring-2 ring-white shadow-[0_0_14px_rgba(255,255,255,0.45)]`
                        : isSelected
                        ? `ring-1.5 ${swatch.ringClass} hover:scale-110`
                        : 'opacity-85 hover:opacity-100 hover:scale-110'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: swatch.hex }}
                      className={`w-5 h-5 rounded-full block border ${
                        isActiveDrawingColor ? 'border-slate-950/60' : 'border-white/50'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Contextual Controls: only shown while drawing or when ink exists on screen */}
            {showExtendedControls && (
              <>
                <div className="h-6 w-px bg-sky-300/20 shrink-0" aria-hidden="true" />

                {/* Return to Interact / Click & Type Answers */}
                {isDrawingMode && (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setMode('interact');
                    }}
                    title="Quay lại chế độ chuột để nhập đáp án và bấm nút (Esc)"
                    className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl bg-emerald-400/20 hover:bg-emerald-400/30 border border-emerald-300/60 text-emerald-100 text-xs font-black transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
                  >
                    <MousePointer2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span className="hidden sm:inline">Thao tác</span>
                  </button>
                )}

                {/* Eraser */}
                <button
                  type="button"
                  onClick={handleToggleEraser}
                  aria-pressed={mode === 'eraser'}
                  aria-label="Tẩy nét vẽ trên màn hình"
                  title="Tẩy từng nét vẽ"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                    mode === 'eraser'
                      ? 'bg-gradient-to-r from-amber-300 to-orange-300 text-slate-950 shadow-[0_0_12px_rgba(251,191,36,0.45)]'
                      : 'bg-white/[0.07] hover:bg-sky-400/20 text-sky-100 border border-sky-300/25'
                  }`}
                >
                  <Eraser className="w-4 h-4" aria-hidden="true" />
                </button>

                {/* Undo */}
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={strokeCount === 0}
                  aria-label="Hoàn tác nét vẽ vừa rồi"
                  title="Hoàn tác nét vẽ"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                    strokeCount > 0
                      ? 'bg-white/[0.07] hover:bg-sky-400/20 text-sky-100 border-sky-300/25 cursor-pointer'
                      : 'bg-white/[0.02] text-slate-500 border-white/10 cursor-not-allowed'
                  }`}
                >
                  <Undo2 className="w-4 h-4" aria-hidden="true" />
                </button>

                {/* Clear all screen ink */}
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={strokeCount === 0}
                  aria-label="Xóa toàn bộ nét vẽ trên màn hình"
                  title="Xóa hết nét vẽ"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                    strokeCount > 0
                      ? 'bg-rose-500/20 hover:bg-rose-500/35 text-rose-100 border-rose-400/50 cursor-pointer'
                      : 'bg-white/[0.02] text-slate-500 border-white/10 cursor-not-allowed'
                  }`}
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                </button>
              </>
            )}

            {/* Quick Left/Right Dock Snap Toggle so it never blocks any corner the user needs */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setDockSide((prev) => (prev === 'left' ? 'right' : 'left'));
              }}
              aria-label={dockSide === 'left' ? 'Chuyển thanh bút sang góc phải' : 'Chuyển thanh bút sang góc trái'}
              title={dockSide === 'left' ? 'Đưa sang góc phải' : 'Đưa sang góc trái'}
              className="w-8 h-9 rounded-lg bg-white/[0.05] hover:bg-sky-400/20 text-sky-200/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Crisp 1-line mode indicator strictly when drawing is active */}
          {isDrawingMode && (
            <div className="mt-1.5 px-2.5 text-[11px] font-bold text-sky-200/90 drop-shadow-[0_1px_6px_rgba(2,6,23,0.95)] flex items-center gap-1.5">
              <span>
                {mode === 'pen'
                  ? `Đang vẽ (${activeColorMeta.label}) · Bấm "Thao tác" hoặc Esc để gõ đáp án`
                  : 'Đang tẩy nét · Bấm "Thao tác" hoặc Esc để gõ đáp án'}
              </span>
            </div>
          )}
        </aside>
      )}
    </>
  );
};
