import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Trash2, X, Download } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ScratchpadProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Scratchpad: React.FC<ScratchpadProps> = ({ isOpen, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#2563EB');
  const [lineWidth, setLineWidth] = useState(4);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');

  useEffect(() => {
    if (isOpen && canvasRef.current) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    sound.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = tool === 'eraser' ? 24 : lineWidth;
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    sound.playWrong();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (!isOpen) return null;

  const colorPalette = ['#2563EB', '#DC2626', '#16A34A', '#D97706', '#9333EA', '#1E293B'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-3xl shadow-2xl border-4 border-amber-300 w-full max-w-4xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="text-2xl">✏️</span>
            <div>
              <h2 className="text-xl font-bold font-display text-white">Bảng Vẽ & Tính Nháp Của Bé</h2>
              <p className="text-xs text-amber-100">Bé có thể tự do vẽ hình, đặt tính nháp hoặc khoanh đáp án!</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors text-white"
            title="Đóng bảng nháp"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setTool('pencil'); sound.playClick(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-sm transition-all ${
                tool === 'pencil' ? 'bg-amber-500 text-white shadow-md' : 'bg-white text-slate-700 border border-amber-200'
              }`}
            >
              <Pencil className="w-4 h-4" />
              Bút vẽ
            </button>
            <button
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

          {/* Clear button */}
          <button
            onClick={clearCanvas}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold border border-rose-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Xóa sạch
          </button>
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
            💡 Gợi ý: Hãy dùng ngón tay hoặc chuột để viết số, vẽ sơ đồ đoạn thẳng...
          </div>
        </div>
      </div>
    </div>
  );
};
