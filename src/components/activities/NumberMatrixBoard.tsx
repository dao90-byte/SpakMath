import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, Eraser, Sparkles } from 'lucide-react';

interface NumberMatrixBoardProps {
  title: string;
  subtitle: string;
  targetSum?: number; // e.g. 15 for 3x3 magic square
  initialGrid: (number | null)[][];
  solution: number[][];
  allowedNumbers?: number[]; // e.g. [1, 2, 3, 4, 5, 6, 7, 8, 9]
  hintFormula?: string;
  onCompleted: () => void;
}

export const NumberMatrixBoard: React.FC<NumberMatrixBoardProps> = ({
  title,
  subtitle,
  targetSum,
  initialGrid,
  solution,
  allowedNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  hintFormula,
  onCompleted
}) => {
  const size = initialGrid.length;
  const [grid, setGrid] = useState<(number | null)[][]>(
    initialGrid.map((row) => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const isInitialCell = (r: number, c: number) => {
    return initialGrid[r][c] !== null;
  };

  const handleCellClick = (r: number, c: number) => {
    if (isInitialCell(r, c)) return;
    sound.playClick();
    setSelectedCell([r, c]);
  };

  const handleNumberSelect = (num: number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    sound.playClick();

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = num;
    setGrid(newGrid);

    // Auto-check if full
    const isFull = newGrid.every((row) => row.every((cell) => cell !== null));
    if (isFull) {
      checkGrid(newGrid);
    }
  };

  const handleClearCell = () => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    sound.playClick();
    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = null;
    setGrid(newGrid);
  };

  const handleReset = () => {
    sound.playWrong();
    setGrid(initialGrid.map((row) => [...row]));
    setSelectedCell(null);
    setIsSuccess(false);
  };

  const checkGrid = (currentGrid = grid) => {
    let allCorrect = true;
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (currentGrid[r][c] !== solution[r][c]) {
          allCorrect = false;
          break;
        }
      }
    }

    if (allCorrect) {
      sound.playCorrect();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
    }
  };

  // Row and column sums for interactive visual feedback
  const getRowSum = (r: number) => {
    const row = grid[r];
    const hasNull = row.some((v) => v === null);
    const sum = row.reduce<number>((acc, v) => acc + (v ?? 0), 0);
    return { sum, isComplete: !hasNull };
  };

  const getColSum = (c: number) => {
    let sum = 0;
    let isComplete = true;
    for (let r = 0; r < size; r++) {
      const val = grid[r][c];
      if (val === null) isComplete = false;
      sum += val ?? 0;
    }
    return { sum, isComplete };
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Rule header card */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 text-center w-full">
        <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-800 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-amber-600" />
          {title}
        </div>
        <p className="text-sm md:text-base font-black text-amber-950 mt-1">
          {subtitle}
        </p>
        {hintFormula && (
          <p className="text-xs font-bold text-amber-700 mt-1 bg-amber-50 py-1 px-3 rounded-full inline-block">
            💡 Gợi ý: {hintFormula}
          </p>
        )}
      </div>

      {/* Interactive Matrix Grid */}
      <div className="bg-white p-5 md:p-7 rounded-3xl border-4 border-slate-700 shadow-xl inline-block">
        <div className="flex flex-col gap-2">
          {grid.map((row, r) => {
            const rowSumInfo = getRowSum(r);
            const isRowTargetMet = targetSum !== undefined && rowSumInfo.sum === targetSum && rowSumInfo.isComplete;

            return (
              <div key={r} className="flex items-center gap-2">
                {/* Cells in row */}
                <div className="flex items-center gap-2">
                  {row.map((val, c) => {
                    const isLocked = isInitialCell(r, c);
                    const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

                    let cellStyle = 'bg-slate-50 border-slate-300 text-slate-800 hover:border-amber-400';
                    if (isLocked) {
                      cellStyle = 'bg-slate-100 border-slate-300 text-slate-900 font-extrabold cursor-not-allowed';
                    } else if (isSelected) {
                      cellStyle = 'bg-amber-300 border-amber-500 ring-4 ring-amber-400 scale-105 z-10 shadow-md text-amber-950';
                    } else if (val !== null) {
                      cellStyle = 'bg-blue-50 border-blue-300 text-blue-900 font-black';
                    }

                    return (
                      <button
                        key={`${r}-${c}`}
                        type="button"
                        onClick={() => handleCellClick(r, c)}
                        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black border-2 transition-all ${cellStyle}`}
                      >
                        {val !== null ? val : <span className="text-slate-300 text-lg">?</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Row Sum indicator */}
                {targetSum !== undefined && (
                  <div
                    className={`ml-2 px-2.5 py-1.5 rounded-xl text-xs font-black whitespace-nowrap border flex items-center gap-1 ${
                      isRowTargetMet
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                        : rowSumInfo.isComplete
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-slate-100 text-slate-600 border-slate-200'
                    }`}
                  >
                    <span>= {rowSumInfo.sum}</span>
                    {isRowTargetMet && <span className="text-emerald-600">✓</span>}
                  </div>
                )}
              </div>
            );
          })}

          {/* Column sums indicator row */}
          {targetSum !== undefined && (
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
              <div className="flex items-center gap-2">
                {Array.from({ length: size }).map((_, c) => {
                  const colSumInfo = getColSum(c);
                  const isColTargetMet = colSumInfo.sum === targetSum && colSumInfo.isComplete;

                  return (
                    <div
                      key={c}
                      className={`w-14 md:w-16 py-1 rounded-xl text-xs font-black text-center border ${
                        isColTargetMet
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : colSumInfo.isComplete
                          ? 'bg-rose-100 text-rose-800 border-rose-300'
                          : 'bg-slate-100 text-slate-600 border-slate-200'
                      }`}
                    >
                      = {colSumInfo.sum}
                    </div>
                  );
                })}
              </div>
              <div className="ml-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                Tổng cột
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Number keypad */}
      <div className="bg-amber-50/90 p-4 rounded-3xl border-2 border-amber-200 shadow-xs flex flex-wrap items-center justify-center gap-2.5 w-full">
        {allowedNumbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => handleNumberSelect(num)}
            className="w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-amber-100 rounded-2xl text-2xl font-black text-amber-900 border-2 border-amber-300 shadow-md transition-transform active:scale-90 flex items-center justify-center"
          >
            {num}
          </button>
        ))}

        {/* Clear Cell */}
        <button
          type="button"
          onClick={handleClearCell}
          className="px-3.5 py-3 bg-white hover:bg-rose-50 text-rose-600 rounded-2xl border-2 border-rose-200 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 shadow-sm"
          title="Xóa ô đang chọn"
        >
          <Eraser className="w-4 h-4" />
          Xóa ô
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Làm lại
        </button>
        <button
          type="button"
          onClick={() => checkGrid()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Ma Trận
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-black text-center animate-bounce-slow w-full">
          🎉 Xuất sắc! Bé đã giải hoàn chỉnh ma trận số thông minh!
        </div>
      )}
    </div>
  );
};
