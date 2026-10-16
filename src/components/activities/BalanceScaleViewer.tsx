import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Scale, Sparkles } from 'lucide-react';

interface ScaleItem {
  leftIcons: string[];
  leftLabel: string;
  rightIcons: string[];
  rightLabel: string;
}

interface BalanceScaleViewerProps {
  title: string;
  ruleExplanation: string;
  scales: ScaleItem[];
  targetQuestion: {
    targetLeftIcons: string[];
    targetLeftLabel: string;
    options: { id: string; count: number; icon: string; label: string }[];
    correctOptionId: string;
    explanation: string;
  };
  onCompleted: () => void;
}

export const BalanceScaleViewer: React.FC<BalanceScaleViewerProps> = ({
  title,
  ruleExplanation,
  scales,
  targetQuestion,
  onCompleted
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedOption = targetQuestion.options.find((o) => o.id === selectedOptionId);

  const handleSelectOption = (optId: string) => {
    sound.playClick();
    setSelectedOptionId(optId);

    if (optId === targetQuestion.correctOptionId) {
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

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Title banner */}
      <div className="bg-rose-100/90 border-2 border-rose-300 rounded-2xl p-4 text-center w-full">
        <div className="flex items-center justify-center gap-2 text-xs font-black text-rose-800 uppercase tracking-wide">
          <Scale className="w-4 h-4 text-rose-600" />
          {title}
        </div>
        <p className="text-sm md:text-base font-black text-rose-950 mt-1">
          {ruleExplanation}
        </p>
      </div>

      {/* Given Clue Scales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {scales.map((scale, idx) => (
          <div
            key={idx}
            className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm flex flex-col items-center"
          >
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Cân thăng bằng #{idx + 1}
            </span>

            {/* Visual scale */}
            <div className="w-full flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
              {/* Left plate */}
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl">
                  {scale.leftIcons.map((ic, i) => (
                    <span key={i}>{ic}</span>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-slate-700 mt-1 text-center">
                  {scale.leftLabel}
                </span>
              </div>

              {/* Balance pivot */}
              <div className="px-3 flex flex-col items-center text-amber-500 font-black text-lg">
                <Scale className="w-5 h-5 text-amber-600" />
                <span className="text-xs text-amber-700 font-bold">=</span>
              </div>

              {/* Right plate */}
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center justify-center gap-1 text-2xl md:text-3xl flex-wrap">
                  {scale.rightIcons.map((ic, i) => (
                    <span key={i}>{ic}</span>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-slate-700 mt-1 text-center">
                  {scale.rightLabel}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Target Mystery Scale */}
      <div className="bg-white p-6 rounded-3xl border-3 border-rose-300 shadow-md w-full flex flex-col items-center">
        <span className="text-xs font-black text-rose-800 bg-rose-100 px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          ❓ Cân cần giải: Cần bao nhiêu bạn để thăng bằng?
        </span>

        <div className="w-full flex items-center justify-between p-4 bg-rose-50/50 rounded-2xl border border-rose-200">
          {/* Target Left */}
          <div className="flex flex-col items-center flex-1">
            <div className="flex items-center justify-center gap-1 text-3xl md:text-4xl">
              {targetQuestion.targetLeftIcons.map((ic, i) => (
                <span key={i}>{ic}</span>
              ))}
            </div>
            <span className="text-xs font-black text-rose-900 mt-1">
              {targetQuestion.targetLeftLabel}
            </span>
          </div>

          {/* Scale pivot */}
          <div className="px-4 flex flex-col items-center text-rose-600 font-black text-xl">
            <Scale className="w-6 h-6 text-rose-600 animate-bounce" />
            <span className="text-xs font-bold text-rose-700">= ?</span>
          </div>

          {/* Target Right */}
          <div className="flex flex-col items-center flex-1">
            <div
              className={`min-w-16 min-h-16 rounded-2xl border-2 flex items-center justify-center p-2 text-2xl flex-wrap gap-1 transition-all ${
                selectedOption
                  ? selectedOptionId === targetQuestion.correctOptionId
                    ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-300'
                    : 'bg-rose-100 border-rose-400 ring-4 ring-rose-200'
                  : 'bg-amber-100 border-dashed border-amber-400 animate-pulse text-sm font-bold text-amber-800'
              }`}
            >
              {selectedOption ? (
                Array.from({ length: selectedOption.count }).map((_, i) => (
                  <span key={i}>{selectedOption.icon}</span>
                ))
              ) : (
                'Chọn đĩa cân'
              )}
            </div>
            <span className="text-xs font-bold text-slate-500 mt-1">
              {selectedOption ? selectedOption.label : 'Chưa chọn'}
            </span>
          </div>
        </div>
      </div>

      {/* Option Buttons */}
      <div className="space-y-3 text-center w-full">
        <h4 className="font-bold text-slate-800 text-sm md:text-base">
          Chọn số lượng thích hợp:
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {targetQuestion.options.map((opt) => {
            const isSelected = selectedOptionId === opt.id;
            const isCorrect = opt.id === targetQuestion.correctOptionId;

            let borderStyle = 'border-slate-300 hover:border-rose-400 bg-white';
            if (isSelected) {
              borderStyle = isCorrect
                ? 'border-emerald-500 ring-4 ring-emerald-300 bg-emerald-50'
                : 'border-rose-500 ring-4 ring-rose-200 bg-rose-50';
            }

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectOption(opt.id)}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 shadow-sm ${borderStyle}`}
              >
                <div className="flex items-center gap-1 text-xl mb-1">
                  <span className="font-black text-rose-900">{opt.count}</span>
                  <span>{opt.icon}</span>
                </div>
                <span className="text-xs font-bold text-slate-600">{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full">
          🎉 {targetQuestion.explanation}
        </div>
      )}
    </div>
  );
};
