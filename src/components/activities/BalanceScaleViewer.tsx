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
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const correctOption = targetQuestion.options.find((o) => o.id === targetQuestion.correctOptionId);
  const selectedOption = isSuccess ? correctOption : undefined;

  const handleCheck = () => {
    sound.playClick();
    const parsed = parseInt(inputValue.trim(), 10);
    if (isNaN(parsed)) {
      setErrorMessage('Bé hãy nhập một số nguyên nhé!');
      sound.playWrong();
      return;
    }

    if (correctOption && parsed === correctOption.count) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Em hãy nhìn vào chiếc cân thứ nhất và thứ hai xem một đồ vật này có thể thay thế bằng bao nhiêu đồ vật kia? Thử suy nghĩ về sự cân bằng giữa chúng xem nhé!');
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
                  ? isSuccess
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
                'Chờ nhập số...'
              )}
            </div>
            <span className="text-xs font-bold text-slate-500 mt-1">
              {selectedOption ? selectedOption.label : 'Chưa chọn'}
            </span>
          </div>
        </div>
      </div>

      {/* Direct Input Answer Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-base">
          Cần bao nhiêu {correctOption?.icon || 'vật phẩm'} để đĩa cân thăng bằng?
        </h4>
        <p className="text-xs text-slate-500">
          Bé hãy suy luận quy đổi từ các đĩa cân mẫu và tự nhập con số chính xác:
        </p>

        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setErrorMessage(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="Nhập số lượng..."
              className="w-40 px-4 py-3 rounded-2xl border-2 border-rose-300 text-xl font-black text-center text-slate-800 focus:outline-none focus:ring-4 focus:ring-rose-200 shadow-inner"
            />
            <span className="absolute right-3 top-3.5 text-xs font-bold text-slate-400 pointer-events-none">
              {correctOption?.icon || 'quả'}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm shadow-md transition-all active:scale-95"
          >
            Kiểm tra
          </button>
        </div>

        {errorMessage && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 py-2 px-3 rounded-xl animate-shake">
            {errorMessage}
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full">
          🎉 {targetQuestion.explanation}
        </div>
      )}
    </div>
  );
};
