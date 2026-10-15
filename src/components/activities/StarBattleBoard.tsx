import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, Sparkles } from 'lucide-react';

interface StarBattleProps {
  size?: number;
  targetStarCount?: number;
  regions: number[][];
  starsSolution: number[][];
  onCompleted: () => void;
}

export const StarBattleBoard: React.FC<StarBattleProps> = ({
  size = 6,
  targetStarCount = 6,
  regions,
  starsSolution,
  onCompleted
}) => {
  // Cell states: null = empty, 'star' = ⭐, 'dot' = •
  const [grid, setGrid] = useState<('star' | 'dot' | null)[][]>(
    Array.from({ length: size }, () => Array(size).fill(null))
  );
  const [isSuccess, setIsSuccess] = useState(false);

  // Region pastel colors
  const regionColors = [
    'bg-sky-100/70',
    'bg-amber-100/70',
    'bg-emerald-100/70',
    'bg-purple-100/70',
    'bg-rose-100/70',
    'bg-teal-100/70'
  ];

  const handleCellClick = (r: number, c: number) => {
    sound.playClick();
    const newGrid = grid.map((row) => [...row]);
    const current = newGrid[r][c];

    if (current === null) {
      newGrid[r][c] = 'star';
      sound.playCountTick(1);
    } else if (current === 'star') {
      newGrid[r][c] = 'dot';
    } else {
      newGrid[r][c] = null;
    }

    setGrid(newGrid);

    // Count stars
    let starCount = 0;
    newGrid.forEach((row) =>
      row.forEach((cell) => {
        if (cell === 'star') starCount++;
      })
    );

    if (starCount === targetStarCount) {
      checkStars(newGrid);
    }
  };

  const handleReset = () => {
    sound.playWrong();
    setGrid(Array.from({ length: size }, () => Array(size).fill(null)));
    setIsSuccess(false);
  };

  const checkStars = (currentGrid = grid) => {
    let matches = true;
    const starCoords: [number, number][] = [];

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] === 'star') {
          starCoords.push([r, c]);
        }
      }
    }

    if (starCoords.length !== targetStarCount) {
      matches = false;
    } else {
      for (const [r, c] of starCoords) {
        const isSolutionStar = starsSolution.some(([sr, sc]) => sr === r && sc === c);
        if (!isSolutionStar) {
          matches = false;
          break;
        }
      }
    }

    if (matches) {
      sound.playVictory();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
    }
  };

  const currentStarTotal = grid.reduce(
    (acc, row) => acc + row.filter((c) => c === 'star').length,
    0
  );

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Target status bar */}
      <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 text-center max-w-md w-full">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
          Quy tắc Ngôi Sao May Mắn
        </p>
        <p className="text-sm md:text-base font-black text-amber-950 mt-1">
          Mỗi hàng, mỗi cột và mỗi vùng màu có đúng 1 ngôi sao ⭐
        </p>
        <p className="text-xs text-amber-700 mt-1 font-semibold">
          Đã đặt:{' '}
          <span className="font-extrabold text-amber-900 bg-white px-2 py-0.5 rounded-full border border-amber-300">
            {currentStarTotal} / {targetStarCount} sao
          </span>
        </p>
      </div>

      {/* Board */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border-4 border-slate-700 shadow-xl inline-block">
        <div className="grid grid-cols-6 gap-1.5 md:gap-2">
          {grid.map((row, r) =>
            row.map((cell, c) => {
              const regId = regions[r]?.[c] ?? 0;
              const regionColor = regionColors[regId % regionColors.length];

              // Cell borders for region distinction
              const hasBorderTop = r > 0 && regions[r - 1]?.[c] !== regId;
              const hasBorderBottom = r < size - 1 && regions[r + 1]?.[c] !== regId;
              const hasBorderLeft = c > 0 && regions[r]?.[c - 1] !== regId;
              const hasBorderRight = c < size - 1 && regions[r]?.[c + 1] !== regId;

              const borderTopClass = hasBorderTop ? 'border-t-3 border-t-slate-800' : '';
              const borderBottomClass = hasBorderBottom ? 'border-b-3 border-b-slate-800' : '';
              const borderLeftClass = hasBorderLeft ? 'border-l-3 border-l-slate-800' : '';
              const borderRightClass = hasBorderRight ? 'border-r-3 border-r-slate-800' : '';

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  className={`w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-xl flex items-center justify-center text-2xl transition-all border border-slate-300 ${regionColor} ${borderTopClass} ${borderBottomClass} ${borderLeftClass} ${borderRightClass} hover:opacity-80 active:scale-95`}
                >
                  {cell === 'star' ? (
                    <span className="drop-shadow-sm animate-in zoom-in-75 duration-150">⭐</span>
                  ) : cell === 'dot' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 block" />
                  ) : null}
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="text-xs text-slate-500 text-center">
        💡 Bấm 1 lần: Đặt ⭐ sao · Bấm 2 lần: Đặt dấu chấm • · Bấm 3 lần: Xóa
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Xóa hết
        </button>
        <button
          onClick={() => checkStars()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Ngôi Sao
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Tuyệt đỉnh! 6 ngôi sao may mắn đã nằm đúng vị trí phong ấn kho báu!
        </div>
      )}
    </div>
  );
};
