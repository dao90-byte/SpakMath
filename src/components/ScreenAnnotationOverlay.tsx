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
const ERASER_RADIUS = 16;
const MAX_STROKE_HISTORY = 150;
const MAX_UNDO_SNAPSHOTS = 40;

interface CommittedStroke {
  id: number;
  color: string;
  width: number;
  /** Document-anchored interleaved [x0, y0, x1, y1, ...] relative to the SVG layer */
  points: number[];
  /** Precomputed SVG path string (empty for single-dot taps) */
  pathD: string;
  /** Axis-aligned bounding box for O(1) eraser hit rejection */
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
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

function buildSmoothSvgPath(pts: number[]): string {
  const count = pts.length;
  if (count < 4) return '';

  let d = `M ${pts[0].toFixed(1)} ${pts[1].toFixed(1)}`;
  if (count === 4) {
    return `${d} L ${pts[2].toFixed(1)} ${pts[3].toFixed(1)}`;
  }

  let prevX = pts[0];
  let prevY = pts[1];
  for (let i = 2; i < count - 2; i += 2) {
    const x = pts[i];
    const y = pts[i + 1];
    const midX = (prevX + x) * 0.5;
    const midY = (prevY + y) * 0.5;
    d += ` Q ${prevX.toFixed(1)} ${prevY.toFixed(1)} ${midX.toFixed(1)} ${midY.toFixed(1)}`;
    prevX = x;
    prevY = y;
  }
  d += ` Q ${prevX.toFixed(1)} ${prevY.toFixed(1)} ${pts[count - 2].toFixed(1)} ${pts[count - 1].toFixed(1)}`;
  return d;
}

function createCommittedStroke(
  id: number,
  color: string,
  width: number,
  points: number[]
): CommittedStroke {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (let i = 0; i < points.length; i += 2) {
    const x = points[i];
    const y = points[i + 1];
    if (x < minX) minX = x;
    if (y < minY) minY = y;
    if (x > maxX) maxX = x;
    if (y > maxY) maxY = y;
  }
  return {
    id,
    color,
    width,
    points,
    pathD: buildSmoothSvgPath(points),
    minX,
    minY,
    maxX,
    maxY,
  };
}

/** Squared distance from point (px, py) to line segment (ax, ay)-(bx, by) */
function pointToSegmentDistSq(
  px: number,
  py: number,
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  const dx = bx - ax;
  const dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    const ox = px - ax;
    const oy = py - ay;
    return ox * ox + oy * oy;
  }
  let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
  if (t < 0) t = 0;
  else if (t > 1) t = 1;
  const projX = ax + t * dx;
  const projY = ay + t * dy;
  const ox = px - projX;
  const oy = py - projY;
  return ox * ox + oy * oy;
}

function strokeHitsPoint(
  stroke: CommittedStroke,
  px: number,
  py: number,
  radius: number
): boolean {
  const pad = radius + stroke.width * 0.5;
  if (
    px < stroke.minX - pad ||
    px > stroke.maxX + pad ||
    py < stroke.minY - pad ||
    py > stroke.maxY + pad
  ) {
    return false;
  }
  const thresholdSq = pad * pad;
  const pts = stroke.points;
  if (pts.length === 2) {
    const dx = px - pts[0];
    const dy = py - pts[1];
    return dx * dx + dy * dy <= thresholdSq;
  }
  for (let i = 0; i < pts.length - 2; i += 2) {
    if (
      pointToSegmentDistSq(px, py, pts[i], pts[i + 1], pts[i + 2], pts[i + 3]) <=
      thresholdSq
    ) {
      return true;
    }
  }
  return false;
}

export const ScreenAnnotationOverlay: React.FC<ScreenAnnotationOverlayProps> = ({
  isActive,
  isSuspended = false,
  elevated = false,
  contextKey,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const liveCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const liveCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const inkPresenterRef = useRef<DelegatedInkTrailPresenterLike | null>(null);
  const dprRef = useRef<number>(1);
  const nextStrokeIdRef = useRef<number>(1);

  const [committedStrokes, setCommittedStrokes] = useState<CommittedStroke[]>([]);
  const committedStrokesRef = useRef<CommittedStroke[]>([]);
  const undoStackRef = useRef<CommittedStroke[][]>([]);
  const [canUndo, setCanUndo] = useState<boolean>(false);

  // Active stroke mutable refs (ZERO React re-renders during live drawing)
  const isDrawingRef = useRef<boolean>(false);
  const activePointerIdRef = useRef<number | null>(null);
  const activeDocPointsRef = useRef<number[]>([]);
  const anchorOriginRef = useRef<{ left: number; top: number }>({ left: 0, top: 0 });
  const lastViewXRef = useRef<number>(0);
  const lastViewYRef = useRef<number>(0);
  const lastViewMidXRef = useRef<number>(0);
  const lastViewMidYRef = useRef<number>(0);
  const rawUpdateSeenRef = useRef<boolean>(false);
  const eraserPushedSnapshotRef = useRef<boolean>(false);

  const [mode, setMode] = useState<AnnotationMode>('interact');
  const [selectedColor, setSelectedColor] = useState<string>(INK_COLORS[0].hex);
  const [dockSide, setDockSide] = useState<'left' | 'right'>('left');

  const modeRef = useRef<AnnotationMode>(mode);
  const colorRef = useRef<string>(selectedColor);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor]);

  useEffect(() => {
    committedStrokesRef.current = committedStrokes;
  }, [committedStrokes]);

  const clearLiveCanvas = useCallback(() => {
    const canvas = liveCanvasRef.current;
    const ctx = liveCtxRef.current;
    if (!canvas || !ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, []);

  const pushUndoSnapshot = useCallback((snapshot: CommittedStroke[]) => {
    undoStackRef.current.push(snapshot);
    if (undoStackRef.current.length > MAX_UNDO_SNAPSHOTS) {
      undoStackRef.current.shift();
    }
    setCanUndo(true);
  }, []);

  const resetAllInk = useCallback(() => {
    undoStackRef.current = [];
    committedStrokesRef.current = [];
    setCommittedStrokes([]);
    setCanUndo(false);
    clearLiveCanvas();
  }, [clearLiveCanvas]);

  // Reset strokes & return to interact mode when leaving exercise or switching exercise context
  useEffect(() => {
    resetAllInk();
    setMode('interact');
  }, [isActive, contextKey, resetAllInk]);

  // Clear ink automatically when navigating between questions inside an exercise
  useEffect(() => {
    if (!isActive) return;
    const handleClearEvent = () => {
      resetAllInk();
    };
    window.addEventListener(SCREEN_INK_CLEAR_EVENT, handleClearEvent);
    return () => window.removeEventListener(SCREEN_INK_CLEAR_EVENT, handleClearEvent);
  }, [isActive, resetAllInk]);

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

  // Initialize transparent low-latency live drawing canvas & listeners
  useEffect(() => {
    if (!isActive) return;
    const canvas = liveCanvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let clearRafId: number | null = null;

    const syncLiveCanvasSize = () => {
      if (cancelled) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dprRef.current = dpr;
      const targetW = Math.max(1, Math.floor(window.innerWidth * dpr));
      const targetH = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      if (!liveCtxRef.current) {
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;
        liveCtxRef.current = ctx;
      }
    };

    syncLiveCanvasSize();

    const measureAnchorOrigin = () => {
      const svg = svgRef.current;
      if (!svg) return { left: 0, top: 0 };
      const r = svg.getBoundingClientRect();
      return { left: r.left, top: r.top };
    };

    const drawEraserCursor = (vx: number, vy: number) => {
      const ctx = liveCtxRef.current;
      if (!ctx) return;
      clearLiveCanvas();
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.beginPath();
      ctx.arc(vx, vy, ERASER_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(251, 191, 36, 0.16)';
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(253, 224, 71, 0.85)';
      ctx.stroke();
    };

    const eraseAtViewportPoint = (vx: number, vy: number) => {
      const origin = anchorOriginRef.current;
      const docX = vx - origin.left;
      const docY = vy - origin.top;
      const current = committedStrokesRef.current;
      if (current.length === 0) return;

      let hitAny = false;
      const remaining: CommittedStroke[] = [];
      for (let i = 0; i < current.length; i++) {
        if (strokeHitsPoint(current[i], docX, docY, ERASER_RADIUS)) {
          hitAny = true;
        } else {
          remaining.push(current[i]);
        }
      }

      if (hitAny) {
        if (!eraserPushedSnapshotRef.current) {
          pushUndoSnapshot(current);
          eraserPushedSnapshotRef.current = true;
        }
        committedStrokesRef.current = remaining;
        setCommittedStrokes(remaining);
      }
    };

    const processPenSamples = (e: PointerEvent) => {
      const ctx = liveCtxRef.current;
      if (!ctx) return;

      const coalesced =
        typeof e.getCoalescedEvents === 'function' ? e.getCoalescedEvents() : null;
      const samples = coalesced && coalesced.length > 0 ? coalesced : [e];
      const origin = anchorOriginRef.current;
      const docPts = activeDocPointsRef.current;

      let prevX = lastViewXRef.current;
      let prevY = lastViewYRef.current;
      let prevMidX = lastViewMidXRef.current;
      let prevMidY = lastViewMidYRef.current;
      let drewAny = false;

      ctx.beginPath();
      ctx.moveTo(prevMidX, prevMidY);

      for (let i = 0; i < samples.length; i++) {
        const s = samples[i];
        const vx = s.clientX;
        const vy = s.clientY;
        const dx = vx - prevX;
        const dy = vy - prevY;
        if (dx * dx + dy * dy < 0.25) continue;

        const midX = (prevX + vx) * 0.5;
        const midY = (prevY + vy) * 0.5;

        ctx.quadraticCurveTo(prevX, prevY, midX, midY);
        docPts.push(vx - origin.left, vy - origin.top);

        prevX = vx;
        prevY = vy;
        prevMidX = midX;
        prevMidY = midY;
        drewAny = true;
      }

      if (drewAny) {
        ctx.stroke();
        lastViewXRef.current = prevX;
        lastViewYRef.current = prevY;
        lastViewMidXRef.current = prevMidX;
        lastViewMidYRef.current = prevMidY;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const currentMode = modeRef.current;
      if (currentMode === 'interact') return;
      if (e.pointerType === 'mouse' && e.button !== 0) return;

      const ctx = liveCtxRef.current;
      if (!ctx) return;

      e.preventDefault();
      if (clearRafId !== null) {
        cancelAnimationFrame(clearRafId);
        clearRafId = null;
        clearLiveCanvas();
      }

      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if unsupported
      }

      // Snapshot the document-anchored SVG origin once at pointerdown
      const origin = measureAnchorOrigin();
      anchorOriginRef.current = origin;
      isDrawingRef.current = true;
      activePointerIdRef.current = e.pointerId;
      rawUpdateSeenRef.current = false;

      const vx = e.clientX;
      const vy = e.clientY;

      if (currentMode === 'eraser') {
        eraserPushedSnapshotRef.current = false;
        drawEraserCursor(vx, vy);
        eraseAtViewportPoint(vx, vy);
        return;
      }

      // Pen mode: prepare low-latency live stroke canvas
      const dpr = dprRef.current;
      const strokeColor = colorRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = PEN_WIDTH;
      ctx.strokeStyle = strokeColor;
      ctx.fillStyle = strokeColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      lastViewXRef.current = vx;
      lastViewYRef.current = vy;
      lastViewMidXRef.current = vx;
      lastViewMidYRef.current = vy;
      activeDocPointsRef.current = [vx - origin.left, vy - origin.top];

      // Instant zero-delay contact dot
      ctx.beginPath();
      ctx.arc(vx, vy, PEN_WIDTH * 0.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;
      if (modeRef.current === 'eraser') {
        drawEraserCursor(e.clientX, e.clientY);
        eraseAtViewportPoint(e.clientX, e.clientY);
      } else {
        processPenSamples(e);
      }
    };

    const finishStroke = (e: PointerEvent) => {
      if (!isDrawingRef.current || activePointerIdRef.current !== e.pointerId) return;

      let committed = false;
      if (modeRef.current === 'pen') {
        const origin = anchorOriginRef.current;
        const endVx = e.clientX;
        const endVy = e.clientY;
        const dx = endVx - lastViewXRef.current;
        const dy = endVy - lastViewYRef.current;
        const docPts = activeDocPointsRef.current;

        if (dx * dx + dy * dy >= 0.25) {
          docPts.push(endVx - origin.left, endVy - origin.top);
        }

        if (docPts.length >= 2) {
          const prevList = committedStrokesRef.current;
          pushUndoSnapshot(prevList);

          const newStroke = createCommittedStroke(
            nextStrokeIdRef.current++,
            colorRef.current,
            PEN_WIDTH,
            docPts.slice()
          );

          const nextList =
            prevList.length >= MAX_STROKE_HISTORY
              ? [...prevList.slice(1), newStroke]
              : [...prevList, newStroke];

          committedStrokesRef.current = nextList;
          setCommittedStrokes(nextList);
          committed = true;
        }
      }

      isDrawingRef.current = false;
      activePointerIdRef.current = null;
      activeDocPointsRef.current = [];
      rawUpdateSeenRef.current = false;
      eraserPushedSnapshotRef.current = false;

      if (committed) {
        // Clear live canvas on the next frame after React commits the SVG stroke (prevents blink)
        clearRafId = requestAnimationFrame(() => {
          clearRafId = null;
          if (!isDrawingRef.current) {
            clearLiveCanvas();
          }
        });
      } else {
        clearLiveCanvas();
      }

      try {
        if (canvas.hasPointerCapture(e.pointerId)) {
          canvas.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Ignore
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown, { passive: false });
    canvas.addEventListener('pointermove', handlePointerMove, { passive: true });
    canvas.addEventListener('pointerup', finishStroke, { passive: true });
    canvas.addEventListener('pointercancel', finishStroke, { passive: true });
    window.addEventListener('resize', syncLiveCanvasSize, { passive: true });

    return () => {
      cancelled = true;
      if (clearRafId !== null) cancelAnimationFrame(clearRafId);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', finishStroke);
      canvas.removeEventListener('pointercancel', finishStroke);
      window.removeEventListener('resize', syncLiveCanvasSize);
      inkPresenterRef.current = null;
      liveCtxRef.current = null;
    };
  }, [isActive, clearLiveCanvas, pushUndoSnapshot]);

  const handleSelectColor = (hex: string) => {
    sound.playClick();
    if (mode === 'pen' && selectedColor === hex) {
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
    const prevSnapshot = undoStackRef.current.pop();
    if (!prevSnapshot) return;
    sound.playClick();
    committedStrokesRef.current = prevSnapshot;
    setCommittedStrokes(prevSnapshot);
    setCanUndo(undoStackRef.current.length > 0);
  };

  const handleClear = () => {
    if (committedStrokesRef.current.length === 0) return;
    sound.playWrong();
    pushUndoSnapshot(committedStrokesRef.current);
    committedStrokesRef.current = [];
    setCommittedStrokes([]);
    clearLiveCanvas();
  };

  if (!isActive) return null;

  const isDrawingMode = mode !== 'interact';
  const strokeCount = committedStrokes.length;
  const showExtendedControls = isDrawingMode || strokeCount > 0 || canUndo;
  const activeColorMeta = INK_COLORS.find((c) => c.hex === selectedColor) || INK_COLORS[0];

  return (
    <>
      {/*
        Document-Anchored Vector Ink Layer:
        Positioned `absolute inset-0` inside the root scrollable page container so every drawn stroke
        is physically glued to the exact content point where it was drawn, scrolling at 120fps in
        hardware lockstep with zero frame lag or drift.
      */}
      <svg
        ref={svgRef}
        aria-hidden="true"
        className={`pointer-events-none ${
          elevated ? 'fixed inset-0 z-[51]' : 'absolute inset-0 z-[37]'
        } w-full h-full overflow-visible`}
      >
        {committedStrokes.map((stroke) =>
          stroke.pathD ? (
            <path
              key={stroke.id}
              d={stroke.pathD}
              fill="none"
              stroke={stroke.color}
              strokeWidth={stroke.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : stroke.points.length >= 2 ? (
            <circle
              key={stroke.id}
              cx={stroke.points[0]}
              cy={stroke.points[1]}
              r={stroke.width * 0.5}
              fill={stroke.color}
            />
          ) : null
        )}
      </svg>

      {/* Low-Latency Live Stroke Capture Canvas (100% pass-through when mode === 'interact') */}
      <canvas
        ref={liveCanvasRef}
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
                        ? 'scale-110 ring-2 ring-white shadow-[0_0_14px_rgba(255,255,255,0.45)]'
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

            {/* Contextual Controls: only shown while drawing or when ink/undo history exists */}
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

                {/* Stroke Eraser */}
                <button
                  type="button"
                  onClick={handleToggleEraser}
                  aria-pressed={mode === 'eraser'}
                  aria-label="Tẩy nét vẽ trên màn hình"
                  title="Quẹt lên nét vẽ để xóa nét đó"
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
                  disabled={!canUndo}
                  aria-label="Hoàn tác thao tác vẽ vừa rồi"
                  title="Hoàn tác"
                  className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                    canUndo
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
                  : 'Đang tẩy nét · Quẹt qua nét vẽ để xóa · Esc để quay lại'}
              </span>
            </div>
          )}
        </aside>
      )}
    </>
  );
};
