import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw } from 'lucide-react';

interface SlitherlinkProps {
  rows?: number;
  cols?: number;
  clues: (number | null)[][];
  solutionEdges: {
    h: boolean[][]; // (rows + 1) x cols
    v: boolean[][]; // rows x (cols + 1)
  };
  onCompleted: () => void;
}

export const SlitherlinkBoard: React.FC<SlitherlinkProps> = ({
  rows = 4,
  cols = 4,
  clues,
  solutionEdges,
  onCompleted
}) => {
  // Horizontal edges: (rows + 1) rows, cols columns
  const [hEdges, setHEdges] = useState<boolean[][]>(
    Array.from({ length: rows + 1 }, () => Array(cols).fill(false))
  );

  // Vertical edges: rows rows, (cols + 1) columns
  const [vEdges, setVEdges] = useState<boolean[][]>(
    Array.from({ length: rows }, () => Array(cols + 1).fill(false))
  );

  const [isSuccess, setIsSuccess] = useState(false);

  const toggleHorizontal = (r: number, c: number) => {
    sound.playClick();
    const next = hEdges.map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? !val : val))
    );
    setHEdges(next);
    checkSolution(next, vEdges);
  };

  const toggleVertical = (r: number, c: number) => {
    sound.playClick();
    const next = vEdges.map((row, ri) =>
      row.map((val, ci) => (ri === r && ci === c ? !val : val))
    );
    setVEdges(next);
    checkSolution(hEdges, next);
  };

  const handleReset = () => {
    sound.playWrong();
    setHEdges(Array.from({ length: rows + 1 }, () => Array(cols).fill(false)));
    setVEdges(Array.from({ length: rows }, () => Array(cols + 1).fill(false)));
    setIsSuccess(false);
  };

  const checkSolution = (currH = hEdges, currV = vEdges) => {
    let totalEdges = 0;
    currH.forEach((row) => row.forEach((e) => { if (e) totalEdges++; }));
    currV.forEach((row) => row.forEach((e) => { if (e) totalEdges++; }));

    if (totalEdges < 4) return;

    let allCluesMatch = true;

    // Check each cell's edge count matches its clue
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const clue = clues[r]?.[c];
        if (clue !== null && clue !== undefined) {
          let edgeCount = 0;
          if (currH[r][c]) edgeCount++;
          if (currH[r + 1][c]) edgeCount++;
          if (currV[r][c]) edgeCount++;
          if (currV[r][c + 1]) edgeCount++;

          if (edgeCount !== clue) {
            allCluesMatch = false;
            break;
          }
        }
      }
      if (!allCluesMatch) break;
    }

    if (allCluesMatch) {
      sound.playVictory();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 500);
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Rules Notice */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 text-center max-w-lg w-full">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
          Câu đố ma trận số khép kín (Slitherlink - Trang 79)
        </p>
        <p className="text-sm md:text-base font-black text-amber-950 mt-1">
          Nối các điểm thành 1 đường đi khép kín sao cho số trong mỗi ô bằng đúng số cạnh có đường đi qua!
        </p>
        <p className="text-xs text-amber-700 mt-1 font-semibold">
          Chạm vào các đoạn thẳng giữa các dấu chấm để bật/tắt cạnh đường viền.
        </p>
      </div>

      {/* Grid Canvas */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-4 border-slate-700 shadow-xl inline-block select-none">
        <div className="flex flex-col">
          {Array.from({ length: rows }).map((_, r) => (
            <React.Fragment key={`row-chunk-${r}`}>
              {/* Horizontal edges above row r */}
              <div className="flex items-center">
                {Array.from({ length: cols }).map((_, c) => (
                  <React.Fragment key={`h-${r}-${c}`}>
                    {/* Dot */}
                    <div className="w-4 h-4 rounded-full bg-slate-800 shrink-0" />
                    {/* Horizontal Edge */}
                    <button
                      type="button"
                      onClick={() => toggleHorizontal(r, c)}
                      className={`h-4 w-14 sm:w-16 flex items-center justify-center transition-all ${
                        hEdges[r][c]
                          ? 'bg-emerald-500 shadow-md ring-2 ring-emerald-300'
                          : 'bg-slate-100 hover:bg-amber-200'
                      }`}
                    >
                      <div
                        className={`w-full h-1.5 rounded-full ${
                          hEdges[r][c] ? 'bg-emerald-600' : 'bg-transparent'
                        }`}
                      />
                    </button>
                  </React.Fragment>
                ))}
                {/* Last Dot on this horizontal line */}
                <div className="w-4 h-4 rounded-full bg-slate-800 shrink-0" />
              </div>

              {/* Middle row containing vertical edges and cell clues */}
              <div className="flex items-center">
                {Array.from({ length: cols }).map((_, c) => {
                  const clue = clues[r]?.[c];
                  // Calculate active edges around this cell
                  let currentCount = 0;
                  if (hEdges[r][c]) currentCount++;
                  if (hEdges[r + 1]?.[c]) currentCount++;
                  if (vEdges[r]?.[c]) currentCount++;
                  if (vEdges[r]?.[c + 1]) currentCount++;

                  const isClueSatisfied = clue !== null && currentCount === clue;

                  return (
                    <React.Fragment key={`v-cell-${r}-${c}`}>
                      {/* Vertical Edge Left */}
                      <button
                        type="button"
                        onClick={() => toggleVertical(r, c)}
                        className={`w-4 h-14 sm:h-16 flex items-center justify-center transition-all ${
                          vEdges[r][c]
                            ? 'bg-emerald-500 shadow-md ring-2 ring-emerald-300'
                            : 'bg-slate-100 hover:bg-amber-200'
                        }`}
                      >
                        <div
                          className={`h-full w-1.5 rounded-full ${
                            vEdges[r][c] ? 'bg-emerald-600' : 'bg-transparent'
                          }`}
                        />
                      </button>

                      {/* Cell Center Clue Number */}
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 flex flex-col items-center justify-center transition-colors ${
                          clue !== null
                            ? isClueSatisfied
                              ? 'bg-emerald-50 text-emerald-700 font-black'
                              : 'bg-slate-50 text-slate-800 font-extrabold'
                            : 'bg-slate-50/50'
                        }`}
                      >
                        {clue !== null && (
                          <>
                            <span className="text-xl sm:text-2xl">{clue}</span>
                            <span className="text-[9px] font-bold text-slate-400">
                              {currentCount}/{clue}
                            </span>
                          </>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}

                {/* Last Vertical Edge Right */}
                <button
                  type="button"
                  onClick={() => toggleVertical(r, cols)}
                  className={`w-4 h-14 sm:h-16 flex items-center justify-center transition-all ${
                    vEdges[r][cols]
                      ? 'bg-emerald-500 shadow-md ring-2 ring-emerald-300'
                      : 'bg-slate-100 hover:bg-amber-200'
                  }`}
                >
                  <div
                    className={`h-full w-1.5 rounded-full ${
                      vEdges[r][cols] ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                  />
                </button>
              </div>
            </React.Fragment>
          ))}

          {/* Bottom Horizontal Edges */}
          <div className="flex items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <React.Fragment key={`h-bottom-${c}`}>
                <div className="w-4 h-4 rounded-full bg-slate-800 shrink-0" />
                <button
                  type="button"
                  onClick={() => toggleHorizontal(rows, c)}
                  className={`h-4 w-14 sm:w-16 flex items-center justify-center transition-all ${
                    hEdges[rows][c]
                      ? 'bg-emerald-500 shadow-md ring-2 ring-emerald-300'
                      : 'bg-slate-100 hover:bg-amber-200'
                  }`}
                >
                  <div
                    className={`w-full h-1.5 rounded-full ${
                      hEdges[rows][c] ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                  />
                </button>
              </React.Fragment>
            ))}
            <div className="w-4 h-4 rounded-full bg-slate-800 shrink-0" />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Xóa các cạnh
        </button>

        <button
          onClick={() => checkSolution()}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Đường Nối
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Xuất sắc! Bạn đã tạo thành công 1 vòng khép kín chuẩn xác thỏa mãn tất cả các số cạnh!
        </div>
      )}
    </div>
  );
};
