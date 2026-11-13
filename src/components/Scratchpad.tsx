import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Pencil, Eraser, Trash2, X, Undo2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

const SCRATCHPAD_STORAGE_KEY = 'spark_math_scratchpad_data';

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const savedDrawingRef = useRef<string | null>(null);
  const undoStackRef = useRef<string[]>([]);

  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#38BDF8');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [canUndo, setCanUndo] = useState(false);

  // Initialize from localStorage once on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SCRATCHPAD_STORAGE_KEY);
      if (saved) {
        savedDrawingRef.current = saved;
      }
    } catch {
      // Ignore storage access errors
    }
  }, []);

  const saveCanvasProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0 || canvas.height === 0) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      savedDrawingRef.current = dataUrl;
      localStorage.setItem(SCRATCHPAD_STORAGE_KEY, dataUrl);
    } catch {
      // Ignore storage quota errors, in-memory ref still keeps progress
    }
  }, []);

  const restoreDataUrlToCanvas = useCallback((dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      const currentCanvas = canvasRef.current;
      if (!currentCanvas) return;
      const currentCtx = currentCanvas.getContext('2d');
      if (!currentCtx) return;

      currentCtx.save();
      currentCtx.setTransform(1, 0, 0, 1, 0, 0);
      currentCtx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      currentCtx.globalCompositeOperation = 'source-over';
      currentCtx.drawImage(img, 0, 0, currentCanvas.width, currentCanvas.height);
      currentCtx.restore();
    };
    img.src = dataUrl;
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const setupAndRestore = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }

      if (savedDrawingRef.current) {
        restoreDataUrlToCanvas(savedDrawingRef.current);
      }
    };

    const rafId = requestAnimationFrame(setupAndRestore);
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, restoreDataUrlToCanvas]);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Push snapshot for undo before modifying
    try {
      const snapshot = canvas.toDataURL('image/png');
      undoStackRef.current = [...undoStackRef.current.slice(-19), snapshot];
      setCanUndo(true);
    } catch {
      // Ignore
    }

    setIsDrawing(true);
    sound.playClick();

    const { x, y } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e, canvas);

    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.lineWidth = tool === 'eraser' ? 24 : lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.globalCompositeOperation = 'source-over';
    }
    saveCanvasProgress();
  };

  const handleUndo = () => {
    if (undoStackRef.current.length === 0) return;
    sound.playClick();
    const prevSnapshot = undoStackRef.current[undoStackRef.current.length - 1];
    undoStackRef.current = undoStackRef.current.slice(0, -1);
    setCanUndo(undoStackRef.current.length > 0);
    savedDrawingRef.current = prevSnapshot;
    try {
      localStorage.setItem(SCRATCHPAD_STORAGE_KEY, prevSnapshot);
    } catch {
      // Ignore
    }
    restoreDataUrlToCanvas(prevSnapshot);
  };

  const clearAllCanvas = () => {
    sound.playWrong();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
      }
    }
    savedDrawingRef.current = null;
    undoStackRef.current = [];
    setCanUndo(false);
    try {
      localStorage.removeItem(SCRATCHPAD_STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleClose = () => {
    saveCanvasProgress();
    onClose();
  };

  if (!isOpen) return null;

  const colorPalette = ['#38BDF8', '#FDE047', '#34D399', '#F472B6', '#C084FC', '#FFFFFF'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#030617]/80 backdrop-blur-md p-4"
      onClick={handleClose}
    >
      <div
        className="relative bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.18),_transparent_55%),linear-gradient(160deg,_rgba(15,24,68,0.98),_rgba(7,12,38,0.99))] rounded-3xl shadow-[0_28px_70px_rgba(3,7,24,0.88),0_0_42px_rgba(34,211,238,0.18)] border border-cyan-300/45 w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden text-white animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
        />

        {/* Header */}
        <div className="relative bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.24),_transparent_58%),radial-gradient(ellipse_at_top_right,_rgba(217,70,239,0.2),_transparent_58%),linear-gradient(180deg,_rgba(12,22,66,0.96),_rgba(6,11,36,0.92))] border-b border-cyan-300/45 shadow-[0_8px_32px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(165,243,252,0.28)] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-fuchsia-400 text-slate-950 flex items-center justify-center shadow-[0_0_26px_rgba(34,211,238,0.68),0_0_46px_rgba(217,70,239,0.38)] ring-2 ring-cyan-200/45 shrink-0">
              <Pencil className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-black font-display bg-gradient-to-r from-white via-cyan-200 to-fuchsia-200 bg-clip-text text-transparent drop-shadow-[0_0_16px_rgba(56,189,248,0.68)]">
                Bảng Vẽ &amp; Tính Nháp Vũ Trụ
              </h2>
              <p className="text-xs font-medium text-cyan-100/95 drop-shadow-[0_0_10px_rgba(34,211,238,0.48)]">
                Tự do vẽ sơ đồ, đặt tính nháp — bài vẽ tự động lưu lại khi đóng mở!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-10 h-10 rounded-xl bg-white/[0.1] hover:bg-cyan-400/25 border border-cyan-300/30 hover:border-cyan-300/75 shadow-[0_0_14px_rgba(34,211,238,0.18)] hover:shadow-[0_0_22px_rgba(34,211,238,0.5)] flex items-center justify-center transition-all text-white cursor-pointer"
            title="Đóng bảng nháp (vẫn giữ nguyên bài vẽ)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="relative bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.16),_transparent_72%),linear-gradient(180deg,_rgba(12,23,70,0.95),_rgba(7,13,42,0.96))] border-b border-cyan-300/40 shadow-[0_8px_28px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(103,232,249,0.22)] px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setTool('pencil'); sound.playClick(); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                tool === 'pencil'
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.6),0_0_40px_rgba(217,70,239,0.28)]'
                  : 'bg-white/[0.07] text-cyan-100 border border-cyan-300/30 hover:bg-cyan-400/20 hover:border-cyan-300/70 hover:shadow-[0_0_18px_rgba(34,211,238,0.38)]'
              }`}
            >
              <Pencil className="w-4 h-4" />
              Bút vẽ
            </button>
            <button
              type="button"
              onClick={() => { setTool('eraser'); sound.playClick(); }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer ${
                tool === 'eraser'
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.6),0_0_40px_rgba(217,70,239,0.28)]'
                  : 'bg-white/[0.07] text-cyan-100 border border-cyan-300/30 hover:bg-cyan-400/20 hover:border-cyan-300/70 hover:shadow-[0_0_18px_rgba(34,211,238,0.38)]'
              }`}
            >
              <Eraser className="w-4 h-4" />
              Tẩy gôm
            </button>
          </div>

          {/* Color palette */}
          {tool === 'pencil' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-200/95 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]">Màu nét:</span>
              <div className="flex items-center gap-1.5">
                {colorPalette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setColor(c); sound.playClick(); }}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full transition-all border-2 cursor-pointer ${
                      color === c
                        ? 'scale-120 border-white shadow-[0_0_18px_rgba(56,189,248,0.85)] ring-2 ring-cyan-300'
                        : 'border-white/50 hover:scale-110 hover:shadow-[0_0_12px_rgba(255,255,255,0.45)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Line width */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-cyan-200/95 drop-shadow-[0_0_8px_rgba(34,211,238,0.35)]">Nét bút:</span>
            <input
              type="range"
              min="2"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-20 accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Undo & Clear All buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!canUndo}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                canUndo
                  ? 'bg-white/[0.08] text-cyan-100 hover:bg-cyan-400/20 border-cyan-300/35 hover:border-cyan-300/70 hover:shadow-[0_0_18px_rgba(34,211,238,0.38)] cursor-pointer'
                  : 'bg-white/[0.03] text-slate-500 border-white/10 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
              Hoàn tác
            </button>

            <button
              type="button"
              onClick={clearAllCanvas}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/20 text-rose-100 hover:bg-rose-500/30 text-xs font-bold border border-rose-400/50 shadow-[0_0_14px_rgba(244,63,94,0.2)] hover:shadow-[0_0_20px_rgba(244,63,94,0.45)] transition-all active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Canvas Area (Cosmic Blueprint Star-Chart Grid) */}
        <div
          className="flex-1 bg-[#050A1F] relative cursor-crosshair overflow-hidden"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.08) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full block touch-none relative z-10"
          />
          <div className="absolute bottom-3 left-4 text-xs text-cyan-200/70 pointer-events-none z-20">
            Gợi ý: Dùng chuột hoặc ngón tay để viết số, vẽ sơ đồ đoạn thẳng — nét vẽ được lưu tự động khi đóng!
          </div>
        </div>
      </div>
    </div>
  );
};
