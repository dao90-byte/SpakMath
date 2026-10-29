import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw } from 'lucide-react';

interface GridOption {
  id: string;
  label: string;
  grid: (string | null)[][]; // 2x2
}

interface MatrixGrid2x2Props {
  title: string;
  ruleExplanation: string;
  sampleGrids: { stepNum: number; grid: (string | null)[][] }[];
  choices: GridOption[];
  correctChoiceId: string;
  onCompleted: () => void;
}

export const MatrixGrid2x2: React.FC<MatrixGrid2x2Props> = ({
  title,
  ruleExplanation,
  sampleGrids,
  choices,
  correctChoiceId,
  onCompleted
}) => {
  const [gridInputs, setGridInputs] = useState<string[][]>([
    ['', ''],
    ['', '']
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const correctChoice = choices.find((c) => c.id === correctChoiceId);

  const handleCellChange = (r: number, c: number, val: string) => {
    if (isSuccess) return;
    const next = gridInputs.map((row, ri) =>
      row.map((cell, ci) => (ri === r && ci === c ? val.trim() : cell))
    );
    setGridInputs(next);
    setErrorMessage(null);
  };

  const handleCheckGrid = () => {
    sound.playClick();
    if (!correctChoice) return;

    let allMatch = true;
    for (let r = 0; r < 2; r++) {
      for (let c = 0; c < 2; c++) {
        const expected = (correctChoice.grid[r][c] || '').trim().toLowerCase();
        const entered = (gridInputs[r][c] || '').trim().toLowerCase();
        if (expected !== entered) {
          allMatch = false;
          break;
        }
      }
    }

    if (allMatch) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Em hãy theo dõi đường đi của từng con số (ví dụ chữ số ở góc trên bên trái) qua các Ô 1, 2, 3 xem nó đang quay theo hướng nào nhé!');
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Rule Notice */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl p-4 text-center max-w-lg w-full">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-sm md:text-base font-black text-amber-950 mt-1">
          {ruleExplanation}
        </p>
      </div>

      {/* 4 Steps Sequence Matrix */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-3xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {sampleGrids.map((sg) => (
            <div
              key={sg.stepNum}
              className="flex flex-col items-center p-3 bg-slate-50 border-2 border-slate-200 rounded-2xl"
            >
              <span className="text-xs font-bold text-slate-500 mb-2">
                Ô {sg.stepNum}
              </span>
              <div className="grid grid-cols-2 gap-1.5 p-2 bg-white rounded-xl border border-slate-300 shadow-xs">
                {sg.grid.map((row, r) =>
                  row.map((val, c) => (
                    <div
                      key={`${r}-${c}`}
                      className="w-10 h-10 rounded-lg bg-amber-50/70 border border-amber-200 flex items-center justify-center text-lg font-black text-amber-900"
                    >
                      {val || ''}
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}

          {/* Interactive Step 4 (Direct 2x2 Grid Input) */}
          <div
            className={`flex flex-col items-center p-3 rounded-2xl border-3 transition-all ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                : 'bg-purple-50/60 border-purple-300'
            }`}
          >
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mb-2">
              Ô 4 (Tự tay điền)
            </span>
            <div className="grid grid-cols-2 gap-1.5 p-2 bg-white rounded-xl border-2 border-purple-300 shadow-sm">
              {[0, 1].map((r) =>
                [0, 1].map((c) => (
                  <input
                    key={`${r}-${c}`}
                    type="text"
                    maxLength={3}
                    disabled={isSuccess}
                    value={gridInputs[r][c]}
                    onChange={(e) => handleCellChange(r, c, e.target.value)}
                    placeholder="?"
                    className={`w-10 h-10 rounded-lg text-center font-black text-lg outline-none transition-all ${
                      isSuccess
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-400 cursor-default'
                        : 'bg-purple-50 text-purple-900 border border-purple-200 focus:bg-white focus:ring-2 focus:ring-purple-400'
                    }`}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Control Action and Error Feedback */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-sm md:text-base">
          Tự tay điền các chữ số vào 4 góc của Ô 4:
        </h4>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleCheckGrid}
            disabled={isSuccess || gridInputs.flat().some((v) => !v.trim())}
            className={`px-8 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 ${
              isSuccess
                ? 'bg-emerald-600 text-white cursor-default'
                : gridInputs.flat().every((v) => v.trim())
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSuccess ? 'Đúng ✓' : 'Kiểm tra Ô 4'}
          </button>
        </div>

        {errorMessage && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 py-2.5 px-3 rounded-xl animate-shake text-left">
            {errorMessage}
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full max-w-md">
          🎉 Rất chính xác! Bạn đã tự tay tìm ra quy luật quay vòng của ma trận 2x2!
        </div>
      )}
    </div>
  );
};
