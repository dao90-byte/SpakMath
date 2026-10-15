import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, Eraser } from 'lucide-react';

interface AnimalSymbol {
  id: string;
  icon: string;
  name: string;
}

interface PixidokuBoardProps {
  size?: number;
  animals: AnimalSymbol[];
  initialGrid: (string | null)[][];
  solution: string[][];
  onCompleted: () => void;
}

export const PixidokuBoard: React.FC<PixidokuBoardProps> = ({
  size = 5,
  animals,
  initialGrid,
  solution,
  onCompleted
}) => {
  const [grid, setGrid] = useState<(string | null)[][]>(
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

  const handleSelectAnimal = (animalId: string) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    sound.playClick();

    const newGrid = grid.map((row) => [...row]);
    newGrid[r][c] = animalId;
    setGrid(newGrid);

    // Auto verify if full
    const isFull = newGrid.every((row) => row.every((c) => c !== null));
    if (isFull) {
      checkPixidoku(newGrid);
    }
  };

  const handleClear = () => {
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

  const checkPixidoku = (currentGrid = grid) => {
    let allValid = true;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (currentGrid[r][c] !== solution[r][c]) {
          allValid = false;
          break;
        }
      }
    }

    if (allValid) {
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

  const getAnimalIcon = (id: string | null) => {
    if (!id) return '';
    const found = animals.find((a) => a.id === id);
    return found ? found.icon : '';
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* 5x5 Animal Grid */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border-4 border-slate-700 shadow-xl inline-block">
        <div className="grid grid-cols-5 gap-1.5 md:gap-2">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const isLocked = isInitialCell(r, c);
              const isSelected = selectedCell?.[0] === r && selectedCell?.[1] === c;

              let bgStyle = 'bg-slate-50 hover:bg-amber-50';
              if (isLocked) {
                bgStyle = 'bg-slate-200/90 cursor-not-allowed';
              } else if (isSelected) {
                bgStyle = 'bg-amber-300 ring-4 ring-amber-500 scale-105 z-10 shadow-lg';
              }

              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl transition-all border border-slate-300 ${bgStyle}`}
                >
                  {getAnimalIcon(val)}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Animal Keypad Selector */}
      <div className="bg-amber-50/80 p-4 rounded-3xl border-2 border-amber-200 shadow-xs flex flex-wrap items-center justify-center gap-3">
        {animals.map((a) => (
          <button
            key={a.id}
            onClick={() => handleSelectAnimal(a.id)}
            className="px-3.5 py-2.5 bg-white hover:bg-amber-100 rounded-2xl text-2xl border-2 border-amber-300 shadow-md transition-transform active:scale-90 flex items-center gap-1.5"
          >
            <span>{a.icon}</span>
            <span className="text-xs font-bold text-slate-700 hidden sm:inline">{a.name}</span>
          </button>
        ))}

        <button
          onClick={handleClear}
          className="px-3 py-2.5 bg-white hover:bg-rose-50 text-rose-600 rounded-2xl border-2 border-rose-200 font-bold text-xs flex items-center gap-1"
        >
          <Eraser className="w-4 h-4" />
          Xóa
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Chơi lại
        </button>
        <button
          onClick={() => checkPixidoku()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Pixidoku
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Siêu đỉnh! Bé đã chinh phục hoàn toàn Pixidoku 5x5 Rừng Nhiệt Đới!
        </div>
      )}
    </div>
  );
};
