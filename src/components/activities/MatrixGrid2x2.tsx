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
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelectChoice = (choiceId: string) => {
    sound.playClick();
    setSelectedChoiceId(choiceId);

    if (choiceId === correctChoiceId) {
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

  const selectedChoice = choices.find((c) => c.id === selectedChoiceId);

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

          {/* Missing Step 4 */}
          <div
            className={`flex flex-col items-center p-3 rounded-2xl border-3 transition-all ${
              selectedChoiceId
                ? selectedChoiceId === correctChoiceId
                  ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                  : 'bg-rose-50 border-rose-400 ring-4 ring-rose-200'
                : 'bg-amber-50 border-dashed border-amber-400'
            }`}
          >
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mb-2">
              Ô 4 (?)
            </span>
            <div className="grid grid-cols-2 gap-1.5 p-2 bg-white rounded-xl border border-slate-300 shadow-xs">
              {selectedChoice
                ? selectedChoice.grid.map((row, r) =>
                    row.map((val, c) => (
                      <div
                        key={`${r}-${c}`}
                        className="w-10 h-10 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-lg font-black text-emerald-900"
                      >
                        {val || ''}
                      </div>
                    ))
                  )
                : Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400 font-bold"
                    >
                      ?
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Choices to pick */}
      <div className="space-y-3 text-center w-full max-w-2xl">
        <h4 className="font-bold text-slate-800 text-sm md:text-base">
          Chọn ma trận 2x2 tiếp theo:
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {choices.map((c) => {
            const isSelected = selectedChoiceId === c.id;
            const isCorrect = c.id === correctChoiceId;

            let borderStyle = 'border-slate-300 hover:border-amber-400 bg-white';
            if (isSelected) {
              borderStyle = isCorrect
                ? 'border-emerald-500 ring-4 ring-emerald-300 bg-emerald-50'
                : 'border-rose-500 ring-4 ring-rose-200 bg-rose-50';
            }

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelectChoice(c.id)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${borderStyle}`}
              >
                <div className="grid grid-cols-2 gap-1 p-1 bg-white rounded-lg border border-slate-200 shadow-xs mb-2">
                  {c.grid.map((row, r) =>
                    row.map((val, ci) => (
                      <div
                        key={`${r}-${ci}`}
                        className="w-7 h-7 rounded bg-amber-50 flex items-center justify-center text-xs font-black text-amber-900"
                      >
                        {val || ''}
                      </div>
                    ))
                  )}
                </div>
                <span className="text-xs font-bold text-slate-700">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Rất chính xác! Bạn đã tìm ra quy luật quay vòng của ma trận 2x2!
        </div>
      )}
    </div>
  );
};
