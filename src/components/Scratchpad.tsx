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
  const [color, setColor] = useState('#2563EB');
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

  const colorPalette = ['#2563EB', '#DC2626', '#16A34A', '#D97706', '#9333EA', '#1E293B'];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            <div>
              <h2 className="text-xl font-bold font-display text-white">Bảng Vẽ & Tính Nháp Của Bé</h2>
              <p className="text-xs text-amber-100">
                Bé tự do vẽ hình, đặt tính nháp — bài vẽ được tự động lưu lại khi đóng mở!
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Đóng bảng nháp (vẫn giữ nguyên bài vẽ)"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => { setTool('pencil'); sound.playClick(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm transition-all ${
                tool === 'pencil' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-700 border border-amber-200'
              }`}
            >
              <Pencil className="w-4 h-4" />
              Bút vẽ
            </button>
            <button
              type="button"
              onClick={() => { setTool('eraser'); sound.playClick(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm transition-all ${
                tool === 'eraser' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-700 border border-amber-200'
              }`}
            >
              <Eraser className="w-4 h-4" />
              Tẩy gôm
            </button>
          </div>

          {/* Color palette */}
          {tool === 'pencil' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Màu mực:</span>
              <div className="flex items-center gap-1.5">
                {colorPalette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setColor(c); sound.playClick(); }}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full transition-transform border-2 ${
                      color === c ? 'scale-125 border-white shadow-md ring-2 ring-amber-400' : 'border-white hover:scale-110'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Line width */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Nét bút:</span>
            <input
              type="range"
              min="2"
              max="16"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-20 accent-amber-500"
            />
          </div>

          {/* Undo & Clear All buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleUndo}
              disabled={!canUndo}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                canUndo
                  ? 'bg-white text-slate-700 hover:bg-slate-100 border-amber-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              }`}
            >
              <Undo2 className="w-3.5 h-3.5" />
              Hoàn tác
            </button>

            <button
              type="button"
              onClick={clearAllCanvas}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-bold border border-rose-300 transition-colors shadow-xs active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Xóa tất cả
            </button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-white relative cursor-crosshair">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-full block touch-none"
          />
          <div className="absolute bottom-3 left-4 text-xs text-slate-400 pointer-events-none">
            💡 Gợi ý: Hãy dùng ngón tay hoặc chuột để viết số, vẽ sơ đồ đoạn thẳng... Tiến trình vẽ tự động lưu lại khi đóng!
          </div>
        </div>
      </div>
    </div>
  );
};
