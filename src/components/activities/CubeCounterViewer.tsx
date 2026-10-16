import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Box, Layers, Check, RotateCcw, Lightbulb, Sparkles } from 'lucide-react';

export interface CubeLayer {
  layerName: string;
  count: number;
}

export interface CubeCounterViewerProps {
  title: string;
  instructionText: string;
  gridHeights: number[][]; // 2D array indicating heights of cubes at each [row][col]
  layers: CubeLayer[];
  totalCubes: number;
  options: number[];
  explanation: string;
  onCompleted: () => void;
}

export const CubeCounterViewer: React.FC<CubeCounterViewerProps> = ({
  title,
  instructionText,
  gridHeights,
  layers,
  totalCubes,
  options,
  explanation,
  onCompleted
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showLayersBreakdown, setShowLayersBreakdown] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectOption = (count: number) => {
    sound.playClick();
    setSelectedOption(count);

    if (count === totalCubes) {
      sound.playCorrect();
      setIsSuccess(true);
      setShowLayersBreakdown(true);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 600);
    } else {
      sound.playWrong();
    }
  };

  // Isometric rendering helpers
  // gridHeights is R x C. Isometric projection coordinates:
  // isoX = (col - row) * 36 + originX
  // isoY = (col + row) * 18 - height * 30 + originY
  const originX = 180;
  const originY = 160;

  // Generate individual cubes in drawing order (back to front, bottom to top)
  const cubeList: { r: number; c: number; h: number; x: number; y: number }[] = [];
  gridHeights.forEach((rowArr, r) => {
    rowArr.forEach((height, c) => {
      for (let h = 0; h < height; h++) {
        const x = (c - r) * 38 + originX;
        const y = (c + r) * 20 - h * 30 + originY;
        cubeList.push({ r, c, h, x, y });
      }
    });
  });

  // Sort cubes from back to front for correct painter's algorithm
  cubeList.sort((a, b) => {
    if (a.r + a.c !== b.r + b.c) return a.r + a.c - (b.r + b.c);
    return a.h - b.h;
  });

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto select-none">
      {/* Title */}
      <div className="bg-indigo-100/90 border-2 border-indigo-300 rounded-3xl p-4 text-center w-full shadow-sm">
        <div className="flex items-center justify-center gap-2 text-xs font-black text-indigo-800 uppercase tracking-wider">
          <Box className="w-4 h-4 text-indigo-600" />
          {title}
        </div>
        <p className="text-sm md:text-base font-black text-indigo-950 mt-1">
          {instructionText}
        </p>
      </div>

      {/* 3D Isometric Canvas */}
      <div className="relative bg-gradient-to-b from-slate-100 to-slate-200/80 p-4 sm:p-6 rounded-3xl border-2 border-slate-300 shadow-md flex flex-col items-center">
        <svg viewBox="0 0 360 260" className="w-72 h-56 sm:w-88 sm:h-64 filter drop-shadow-md">
          {cubeList.map((cube, idx) => {
            const { x, y } = cube;
            // Colors per layer height: layer 0: blue, layer 1: amber, layer 2: emerald, layer 3: rose
            const palette = [
              { top: '#60a5fa', left: '#2563eb', right: '#1d4ed8' }, // Layer 0
              { top: '#fcd34d', left: '#f59e0b', right: '#d97706' }, // Layer 1
              { top: '#6ee7b7', left: '#10b981', right: '#047857' }, // Layer 2
              { top: '#f472b6', left: '#db2777', right: '#be185d' }  // Layer 3
            ];
            const p = palette[cube.h % palette.length];

            return (
              <g key={`cube-${idx}`}>
                {/* Top face */}
                <polygon
                  points={`${x},${y - 18} ${x + 36},${y} ${x},${y + 18} ${x - 36},${y}`}
                  fill={p.top}
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Left face */}
                <polygon
                  points={`${x - 36},${y} ${x},${y + 18} ${x},${y + 48} ${x - 36},${y + 30}`}
                  fill={p.left}
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                {/* Right face */}
                <polygon
                  points={`${x},${y + 18} ${x + 36},${y} ${x + 36},${y + 30} ${x},${y + 48}`}
                  fill={p.right}
                  stroke="#1e293b"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
        </svg>

        <span className="text-[11px] font-bold text-slate-500 mt-1">
          💡 Chú ý: Đừng quên đếm cả các khối bị che khuất ở tầng dưới nhé!
        </span>
      </div>

      {/* Options Selection */}
      <div className="w-full space-y-3">
        <h4 className="text-center text-xs font-black uppercase text-slate-500 tracking-wider">
          Chọn số lượng khối lập phương chính xác:
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto">
          {options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrectOpt = opt === totalCubes;

            let btnStyle = 'bg-white border-2 border-slate-200 text-slate-800 hover:border-indigo-400';
            if (isSelected) {
              if (isSuccess && isCorrectOpt) {
                btnStyle = 'bg-emerald-500 border-2 border-emerald-600 text-white shadow-lg ring-2 ring-emerald-300';
              } else if (!isCorrectOpt) {
                btnStyle = 'bg-rose-100 border-2 border-rose-400 text-rose-800';
              }
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`py-3.5 px-4 rounded-2xl font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-1 shadow-xs ${btnStyle}`}
              >
                <span>{opt}</span>
                <span className="text-xs font-bold text-slate-400">khối</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Layer Breakdown Toggle & Display */}
      <div className="w-full bg-white rounded-3xl border-2 border-slate-200 p-4 md:p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowLayersBreakdown((v) => !v);
            }}
            className="flex items-center gap-2 text-xs font-black uppercase text-indigo-700 hover:text-indigo-900"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            {showLayersBreakdown ? 'Ẩn phân tích tầng' : 'Xem giải thích theo từng tầng'}
          </button>
          <span className="text-xs font-extrabold text-slate-500">
            Tổng cộng: <strong className="text-indigo-700 text-sm">{totalCubes}</strong> khối
          </span>
        </div>

        {showLayersBreakdown && (
          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs sm:text-sm font-semibold text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {layers.map((l, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <p className="font-extrabold text-slate-600 text-xs">{l.layerName}</p>
                  <p className="text-base font-black text-indigo-600">{l.count} khối</p>
                </div>
              ))}
            </div>
            <p className="text-slate-600 italic bg-amber-50 p-3 rounded-2xl border border-amber-200 mt-2">
              {explanation}
            </p>
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-950 font-bold text-center w-full shadow-md animate-bounce-slow">
          🎉 Hoan hô! Bạn đã đếm chính xác toàn bộ {totalCubes} khối lập phương không gian!
        </div>
      )}
    </div>
  );
};
