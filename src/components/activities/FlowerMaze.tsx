import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw } from 'lucide-react';

interface FlowerMazeProps {
  pattern: string[];
  gridSize?: number;
  onCompleted: () => void;
}

export const FlowerMaze: React.FC<FlowerMazeProps> = ({
  pattern,
  gridSize = 7,
  onCompleted
}) => {
  // Preset 7x7 matrix matching the book page 54
  const flowerGrid = [
    ['🌺', '🌸', '🌺', '🌸', '🌼', '🌺', '💠'],
    ['🌸', '🌼', '🌺', '🌸', '🌸', '🌺', '🌼'],
    ['💠', '🌼', '💠', '🌺', '🌼', '💠', '💠'],
    ['🌼', '🌼', '🌸', '🌺', '🌼', '🌺', '🌸'],
    ['🌺', '🌺', '💠', '🌸', '🌼', '🌺', '🌼'],
    ['🌸', '🌸', '🌼', '🌼', '🌸', '💠', '🌺'],
    ['💠', '🌼', '💠', '💠', '🌼', '🌺', '💠']
  ];

  // Target path coordinate sequence
  const targetPath = [
    [0, 1], // 🌸 Abby start
    [1, 1], // 🌼
    [1, 2], // 🌺
    [2, 2], // 💠
    [3, 2], // 🌸
    [3, 1], // 🌼
    [4, 0], // 🌺
    [5, 0], // 🌸
    [5, 2], // 🌼
    [6, 3], // 💠
    [6, 4], // 🌼
    [6, 5], // 🌺
    [6, 6]  // 💠 Casey goal
  ];

  const [visitedCells, setVisitedCells] = useState<string[]>(['0-1']);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCellClick = (r: number, c: number) => {
    sound.playClick();
    const key = `${r}-${c}`;

    if (visitedCells.includes(key)) {
      // Toggle off if clicking the last cell
      if (visitedCells[visitedCells.length - 1] === key && visitedCells.length > 1) {
        setVisitedCells((prev) => prev.slice(0, -1));
      }
      return;
    }

    // Check adjacency with previous cell
    const lastKey = visitedCells[visitedCells.length - 1];
    const [lastR, lastC] = lastKey.split('-').map(Number);
    const isAdjacent = Math.abs(r - lastR) + Math.abs(c - lastC) <= 2; // Allow diagonal or straight adjacent

    if (!isAdjacent) {
      sound.playWrong();
      return;
    }

    // Check pattern cycle
    const currentStepIndex = visitedCells.length;
    const expectedFlower = pattern[currentStepIndex % pattern.length];
    const actualFlower = flowerGrid[r][c];

    if (actualFlower === expectedFlower || (r === 6 && c === 6)) {
      sound.playCountTick(visitedCells.length);
      const nextVisited = [...visitedCells, key];
      setVisitedCells(nextVisited);

      // Check if reached Casey (6, 6)
      if (r === 6 && c === 6 && nextVisited.length >= 8) {
        sound.playVictory();
        setIsSuccess(true);
        setTimeout(() => {
          sound.playStarCollect();
          onCompleted();
        }, 600);
      }
    } else {
      sound.playWrong();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setVisitedCells(['0-1']);
    setIsSuccess(false);
  };

  const autoSolve = () => {
    sound.playCorrect();
    const allKeys = targetPath.map(([r, c]) => `${r}-${c}`);
    setVisitedCells(allKeys);
    setIsSuccess(true);
    setTimeout(() => {
      sound.playStarCollect();
      onCompleted();
    }, 600);
  };

  const currentPatternStep = pattern[visitedCells.length % pattern.length];

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Pattern Banner */}
      <div className="bg-pink-100/80 border-2 border-pink-300 rounded-2xl p-4 text-center max-w-lg w-full">
        <p className="text-xs font-bold text-pink-800 uppercase tracking-wide">Quy luật bước chân 4 màu hoa</p>
        <div className="flex items-center justify-center gap-2 mt-1 text-xl font-bold">
          <span>🌸 Tím</span>
          <span>➔</span>
          <span>🌼 Vàng</span>
          <span>➔</span>
          <span>🌺 Đỏ</span>
          <span>➔</span>
          <span>💠 Xanh</span>
        </div>
        <p className="text-xs text-pink-700 mt-1 font-semibold">
          Hoa tiếp theo cần bước đến:{' '}
          <span className="text-lg bg-white px-2 py-0.5 rounded-md border border-pink-300">
            {currentPatternStep}
          </span>
        </p>
      </div>

      {/* Maze Board */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border-4 border-pink-300 shadow-xl relative inline-block">
        {/* Abby Character at Start */}
        <div className="flex items-center justify-between mb-2 px-2">
          <div className="flex items-center gap-2 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            <span className="text-2xl">🐰</span>
            <span className="text-xs font-bold text-pink-900">Abby xuất phát</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <span className="text-2xl">🐹</span>
            <span className="text-xs font-bold text-amber-900">Đến gặp Casey</span>
          </div>
        </div>

        {/* 7x7 Grid */}
        <div className="grid grid-cols-7 gap-1 md:gap-1.5">
          {flowerGrid.map((row, r) =>
            row.map((flower, c) => {
              const key = `${r}-${c}`;
              const isVisited = visitedCells.includes(key);
              const isStart = r === 0 && c === 1;
              const isGoal = r === 6 && c === 6;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl transition-all border ${
                    isVisited
                      ? 'bg-amber-300 border-amber-500 scale-105 shadow-md ring-2 ring-pink-400'
                      : isStart
                      ? 'bg-pink-100 border-pink-400 font-bold'
                      : isGoal
                      ? 'bg-amber-100 border-amber-400 font-bold'
                      : 'bg-slate-50 border-slate-200 hover:bg-pink-50 hover:scale-105'
                  }`}
                >
                  {flower}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Đi lại từ đầu
        </button>
        <button
          onClick={autoSolve}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs md:text-sm shadow-md"
        >
          💡 Xem đường đi đúng
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Hoan hô! Bạn thỏ Abby đã băng qua mê cung hoa và tìm thấy bạn chuột Casey rồi!
        </div>
      )}
    </div>
  );
};
