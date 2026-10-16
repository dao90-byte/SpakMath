import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { RotateCcw } from 'lucide-react';

interface FlowerMazeProps {
  pattern: string[];
  gridSize?: number;
  grid?: string[][];
  targetPath?: number[][];
  startPos?: [number, number];
  goalPos?: [number, number];
  startIcon?: string;
  startLabel?: string;
  goalIcon?: string;
  goalLabel?: string;
  ruleTitle?: string;
  patternDisplay?: { icon: string; name: string }[];
  successMessage?: string;
  onCompleted: () => void;
}

export const FlowerMaze: React.FC<FlowerMazeProps> = ({
  pattern,
  grid: customGrid,
  targetPath: customTargetPath,
  startPos = [0, 1],
  goalPos = [6, 6],
  startIcon = '🐰',
  startLabel = 'Abby xuất phát',
  goalIcon = '🐹',
  goalLabel = 'Đến gặp Casey',
  ruleTitle = 'Quy luật bước chân lặp lại',
  patternDisplay,
  successMessage = '🎉 Hoan hô! Bạn đã vượt qua mê cung thành công!',
  onCompleted
}) => {
  // Default 7x7 matrix matching the book page 54 if not provided
  const activeGrid = customGrid || [
    ['🌺', '🌸', '🌺', '🌸', '🌼', '🌺', '💠'],
    ['🌸', '🌼', '🌺', '🌸', '🌸', '🌺', '🌼'],
    ['💠', '🌼', '💠', '🌺', '🌼', '💠', '💠'],
    ['🌼', '🌼', '🌸', '🌺', '🌼', '🌺', '🌸'],
    ['🌺', '🌺', '💠', '🌸', '🌼', '🌺', '🌼'],
    ['🌸', '🌸', '🌼', '🌼', '🌸', '💠', '🌺'],
    ['💠', '🌼', '💠', '💠', '🌼', '🌺', '💠']
  ];

  const defaultTargetPath = [
    [0, 1],
    [1, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [3, 1],
    [4, 0],
    [5, 0],
    [5, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6]
  ];

  const activeTargetPath = customTargetPath || defaultTargetPath;
  const startKey = `${startPos[0]}-${startPos[1]}`;
  const goalKey = `${goalPos[0]}-${goalPos[1]}`;

  const [visitedCells, setVisitedCells] = useState<string[]>([startKey]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCellClick = (r: number, c: number) => {
    sound.playClick();
    const key = `${r}-${c}`;

    if (visitedCells.includes(key)) {
      if (visitedCells[visitedCells.length - 1] === key && visitedCells.length > 1) {
        setVisitedCells((prev) => prev.slice(0, -1));
      }
      return;
    }

    const lastKey = visitedCells[visitedCells.length - 1];
    const [lastR, lastC] = lastKey.split('-').map(Number);
    const isAdjacent = Math.abs(r - lastR) + Math.abs(c - lastC) <= 2;

    if (!isAdjacent) {
      sound.playWrong();
      return;
    }

    const currentStepIndex = visitedCells.length;
    const expectedItem = pattern[currentStepIndex % pattern.length];
    const actualItem = activeGrid[r][c];

    const isGoalCell = r === goalPos[0] && c === goalPos[1];

    if (actualItem === expectedItem || isGoalCell) {
      sound.playCountTick(visitedCells.length);
      const nextVisited = [...visitedCells, key];
      setVisitedCells(nextVisited);

      if (isGoalCell && nextVisited.length >= Math.min(6, activeTargetPath.length - 2)) {
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
    setVisitedCells([startKey]);
    setIsSuccess(false);
  };

  const numCols = activeGrid[0]?.length || 7;

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Pattern Banner */}
      <div className="bg-pink-100/90 border-2 border-pink-300 rounded-2xl p-4 text-center max-w-lg w-full">
        <p className="text-xs font-bold text-pink-800 uppercase tracking-wide">{ruleTitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-1 text-base md:text-lg font-black text-pink-950">
          {patternDisplay ? (
            patternDisplay.map((p, idx) => (
              <React.Fragment key={idx}>
                <span>{p.icon} {p.name}</span>
                {idx < patternDisplay.length - 1 && <span>➔</span>}
              </React.Fragment>
            ))
          ) : (
            pattern.map((p, idx) => (
              <React.Fragment key={idx}>
                <span>{p}</span>
                {idx < pattern.length - 1 && <span>➔</span>}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* Maze Board */}
      <div className="bg-white p-4 md:p-6 rounded-3xl border-4 border-pink-300 shadow-xl relative inline-block">
        {/* Character headers */}
        <div className="flex items-center justify-between mb-3 px-2">
          <div className="flex items-center gap-2 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            <span className="text-2xl">{startIcon}</span>
            <span className="text-xs font-bold text-pink-900">{startLabel}</span>
          </div>
          <div className="flex items-center gap-2 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            <span className="text-2xl">{goalIcon}</span>
            <span className="text-xs font-bold text-amber-900">{goalLabel}</span>
          </div>
        </div>

        {/* Dynamic Grid */}
        <div
          className="grid gap-1 md:gap-1.5"
          style={{ gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))` }}
        >
          {activeGrid.map((row, r) =>
            row.map((item, c) => {
              const key = `${r}-${c}`;
              const isVisited = visitedCells.includes(key);
              const isStart = key === startKey;
              const isGoal = key === goalKey;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleCellClick(r, c)}
                  className={`w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-2xl flex items-center justify-center text-xl sm:text-2xl transition-all border ${
                    isVisited
                      ? 'bg-amber-300 border-amber-500 scale-105 shadow-md ring-2 ring-pink-400 z-10'
                      : isStart
                      ? 'bg-pink-100 border-pink-400 font-bold'
                      : isGoal
                      ? 'bg-amber-100 border-amber-400 font-bold ring-2 ring-amber-300'
                      : 'bg-slate-50 border-slate-200 hover:bg-pink-50 hover:scale-105'
                  }`}
                >
                  {item}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm border border-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Đi lại từ đầu
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow max-w-md w-full">
          {successMessage}
        </div>
      )}
    </div>
  );
};
