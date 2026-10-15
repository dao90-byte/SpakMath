import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, Eraser } from 'lucide-react';

interface ShapeSymbol {
  id: string;
  icon: string;
  name: string;
}

interface SudokuBoardProps {
  type: 'shape' | 'number';
  symbols?: ShapeSymbol[];
  initialGrid: (string | number | null)[][];
  solution: (string | number)[][];
  colorBlocks?: string[][]; // For Jigsaw Sudoku (Page 49)
  sumLabels?: (number | null)[][]; // For Killer Sudoku (Page 50)
  onCompleted: () => void;
}

export const SudokuBoard: React.FC<SudokuBoardProps> = ({
  type,
  symbols = [],
  initialGrid,
  solution,
  colorBlocks,
  sumLabels,
  onCompleted
}) => {
  const [grid, setGrid] = useState<(string | number | null)[][]>(
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

  const handleValueSelect = (val: string | number) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    sound.playClick();

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = val;
    setGrid(newGrid);

    // Auto check if board is full
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
    let allMatch = true;
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r][c] !== solution[r][c]) {
          allMatch = false;
          break;
        }
      }
    }

    if (allMatch) {
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

  const getSymbolIcon = (val: string | number | null) => {
    if (val === null) return '';
    if (type === 'number') return String(val);
    const found = symbols.find((s) => s.id === val);
    return found ? found.icon : String(val);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* 4x4 Grid with custom or standard borders */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border-4 border-slate-700 shadow-xl inline-block">
        <div className="grid grid-cols-4 gap-1.5 md:gap-2">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isLocked = isInitialCell(r, c);
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;
              const isInSelectedRowCol =
                selectedCell && (selectedCell[0] === r || selectedCell[1] === c);

              // Standard 2x2 borders if not colorBlocks
              const borderBottom =
                !colorBlocks && r === 1 ? 'border-b-4 border-b-slate-700' : '';
              const borderRight =
                !colorBlocks && c === 1 ? 'border-r-4 border-r-slate-700' : '';

              const cellBg = colorBlocks?.[r]?.[c] || 'bg-slate-50';

              let bgStyle = `${cellBg} hover:opacity-90`;
              if (isLocked) {
                bgStyle = `${cellBg} text-slate-900 cursor-not-allowed font-extrabold brightness-95`;
              } else if (isSelected) {
                bgStyle = 'bg-amber-300 ring-4 ring-amber-500 scale-105 z-10 shadow-lg';
              } else if (isInSelectedRowCol) {
                bgStyle = `${cellBg} ring-2 ring-amber-200`;
              }

              const sumBadge = sumLabels?.[r]?.[c];

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  className={`w-14 h-14 md:w-18 md:h-18 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black transition-all border border-slate-300 relative ${borderBottom} ${borderRight} ${bgStyle}`}
                >
                  {sumBadge && (
                    <span className="absolute top-1 left-1.5 text-xs font-black text-rose-600 font-sans">
                      {sumBadge}
                    </span>
                  )}
                  {getSymbolIcon(val)}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Keypad Selector */}
      <div className="bg-amber-50/80 p-4 rounded-3xl border-2 border-amber-200 shadow-xs flex flex-wrap items-center justify-center gap-3">
        {type === 'shape' ? (
          symbols.map((sym) => (
            <button
              key={sym.id}
              onClick={() => handleValueSelect(sym.id)}
              className="px-4 py-3 bg-white hover:bg-amber-100 rounded-2xl text-2xl md:text-3xl border-2 border-amber-300 shadow-md transition-transform active:scale-90 flex items-center gap-2"
            >
              <span>{sym.icon}</span>
              <span className="text-xs font-bold text-slate-600 hidden sm:inline">{sym.name}</span>
            </button>
          ))
        ) : (
          [1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleValueSelect(num)}
              className="w-12 h-12 md:w-14 md:h-14 bg-white hover:bg-amber-100 rounded-2xl text-2xl md:text-3xl font-black text-amber-900 border-2 border-amber-300 shadow-md transition-transform active:scale-90 flex items-center justify-center"
            >
              {num}
            </button>
          ))
        )}

        {/* Clear Cell */}
        <button
          onClick={handleClearCell}
          className="px-3 py-3 bg-white hover:bg-rose-50 text-rose-600 rounded-2xl border-2 border-rose-200 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
          title="Xóa ô đang chọn"
        >
          <Eraser className="w-4 h-4" />
          Xóa ô
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Chơi lại
        </button>
        <button
          onClick={() => checkGrid()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Sudoku
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Chúc mừng! Bé đã giải đúng Sudoku xuất sắc!
        </div>
      )}
    </div>
  );
};
