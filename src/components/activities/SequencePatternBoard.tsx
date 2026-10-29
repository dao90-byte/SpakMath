import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, Sparkles } from 'lucide-react';

export type SequenceType = 'numbers' | 'domino' | 'beads' | 'pyramid';

export interface SequenceStepItem {
  id: number;
  label?: string;
  subLabel?: string; // e.g. for domino bottom half
  icon?: string;
  isMissing?: boolean;
  stepHint?: string; // e.g. "+3" or "×2"
}

export interface ChoiceOption {
  id: string;
  label: string;
  subLabel?: string;
  icon?: string;
}

interface SequencePatternBoardProps {
  title: string;
  ruleExplanation: string;
  sequenceType: SequenceType;
  items: SequenceStepItem[];
  choices: ChoiceOption[];
  correctChoiceId: string;
  correctExplanation: string;
  onCompleted: () => void;
}

export const SequencePatternBoard: React.FC<SequencePatternBoardProps> = ({
  title,
  ruleExplanation,
  sequenceType,
  items,
  choices,
  correctChoiceId,
  correctExplanation,
  onCompleted
}) => {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [typedInput, setTypedInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedChoice = choices.find((c) => c.id === selectedChoiceId);
  const correctChoice = choices.find((c) => c.id === correctChoiceId);

  const handleSelectChoice = (choiceId: string) => {
    sound.playClick();
    setSelectedChoiceId(choiceId);

    if (choiceId === correctChoiceId) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác, em hãy quan sát kỹ quy luật tăng/giảm hoặc lặp lại nhé!');
    }
  };

  const handleCheckInput = () => {
    sound.playClick();
    const clean = typedInput.trim().toLowerCase();
    if (!clean) return;

    // Check if matches label, sublabel, or id of correctChoice
    const isMatch =
      correctChoice &&
      (correctChoice.label.trim().toLowerCase() === clean ||
        clean.replace(/\D/g, '') === correctChoice.label.trim().replace(/\D/g, '') ||
        (correctChoice.subLabel && correctChoice.subLabel.trim().toLowerCase() === clean));

    if (isMatch) {
      setSelectedChoiceId(correctChoiceId);
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Em hãy so sánh sự thay đổi hoặc khoảng cách giữa các số/hình liền kề nhau để nhận ra quy luật nhé!');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setSelectedChoiceId(null);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Rule header */}
      <div className="bg-purple-100/90 border-2 border-purple-300 rounded-2xl p-4 text-center w-full">
        <div className="flex items-center justify-center gap-2 text-xs font-black text-purple-800 uppercase tracking-wide">
          <Sparkles className="w-4 h-4 text-purple-600" />
          {title}
        </div>
        <p className="text-sm md:text-base font-black text-purple-950 mt-1">
          {ruleExplanation}
        </p>
      </div>

      {/* Main Sequence Display */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-200 shadow-md w-full overflow-x-auto">
        {/* Pyramid layout */}
        {sequenceType === 'pyramid' ? (
          <div className="flex flex-col items-center gap-3 py-2">
            {/* Top row */}
            <div className="flex justify-center">
              <div
                className={`w-18 h-18 rounded-2xl border-3 flex flex-col items-center justify-center font-black text-2xl shadow-md ${
                  selectedChoiceId
                    ? selectedChoiceId === correctChoiceId
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300'
                      : 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                    : 'bg-amber-100 border-dashed border-amber-400 text-amber-900 animate-pulse'
                }`}
              >
                <span>{selectedChoice ? selectedChoice.label : '?'}</span>
                <span className="text-[10px] font-bold text-slate-500">Đỉnh</span>
              </div>
            </div>

            {/* Mid row */}
            <div className="flex justify-center gap-4">
              <div className="w-16 h-16 rounded-2xl border-2 border-purple-300 bg-purple-50 flex flex-col items-center justify-center font-black text-xl text-purple-900 shadow-sm">
                <span>7</span>
                <span className="text-[9px] font-bold text-purple-400">(3+4)</span>
              </div>
              <div className="w-16 h-16 rounded-2xl border-2 border-purple-300 bg-purple-50 flex flex-col items-center justify-center font-black text-xl text-purple-900 shadow-sm">
                <span>8</span>
                <span className="text-[9px] font-bold text-purple-400">(4+4)</span>
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex justify-center gap-3">
              {['3', '4', '4'].map((num, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-xl border border-slate-300 bg-slate-50 flex items-center justify-center font-black text-lg text-slate-700"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>
        ) : sequenceType === 'domino' ? (
          /* Domino layout */
          <div className="flex items-center justify-center gap-3 sm:gap-4 min-w-[420px] py-2">
            {items.map((item) => {
              if (item.isMissing) {
                return (
                  <div
                    key={item.id}
                    className={`w-16 h-28 rounded-2xl border-3 flex flex-col items-center justify-between p-2 shadow-md transition-all ${
                      selectedChoiceId
                        ? selectedChoiceId === correctChoiceId
                          ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                          : 'bg-rose-50 border-rose-400 ring-4 ring-rose-200'
                        : 'bg-amber-50 border-dashed border-amber-400 animate-pulse'
                    }`}
                  >
                    <span className="text-xl font-black text-purple-900">
                      {selectedChoice ? selectedChoice.label : '?'}
                    </span>
                    <div className="w-full h-0.5 bg-slate-300 my-1" />
                    <span className="text-xl font-black text-purple-900">
                      {selectedChoice ? selectedChoice.subLabel : '?'}
                    </span>
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  className="w-16 h-28 rounded-2xl border-2 border-slate-700 bg-slate-900 text-white flex flex-col items-center justify-between p-2 shadow-sm"
                >
                  <span className="text-xl font-black text-amber-300">{item.label}</span>
                  <div className="w-full h-0.5 bg-slate-600 my-1" />
                  <span className="text-xl font-black text-sky-300">{item.subLabel}</span>
                </div>
              );
            })}
          </div>
        ) : (
          /* Stepping Stones / Beads layout */
          <div className="flex items-center justify-center gap-2 sm:gap-3 min-w-[500px] py-4">
            {items.map((item, index) => {
              if (item.isMissing) {
                return (
                  <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                    {index > 0 && (
                      <span className="text-purple-400 text-sm font-bold">➔</span>
                    )}
                    <div
                      className={`w-16 h-18 sm:w-18 sm:h-20 rounded-2xl border-3 flex flex-col items-center justify-center font-black transition-all ${
                        selectedChoiceId
                          ? selectedChoiceId === correctChoiceId
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 shadow-lg scale-105'
                            : 'bg-rose-100 border-rose-400 text-rose-950 ring-4 ring-rose-200'
                          : 'bg-amber-100 border-dashed border-amber-400 text-amber-900 animate-pulse'
                      }`}
                    >
                      <span className="text-2xl">{selectedChoice ? selectedChoice.icon || selectedChoice.label : '?'}</span>
                      <span className="text-[10px] font-bold text-slate-500 mt-1">Ô bí mật</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.id} className="flex items-center gap-2 sm:gap-3">
                  {index > 0 && (
                    <span className="text-purple-400 text-sm font-bold">➔</span>
                  )}
                  <div className="w-16 h-18 sm:w-18 sm:h-20 rounded-2xl border-2 border-slate-200 bg-slate-50 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl font-black text-slate-800">
                      {item.icon || item.label}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 mt-1">#{item.id}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Direct typing input box */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-purple-200 shadow-sm space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-sm md:text-base">
          Tự tay nhập giá trị hoặc con số còn thiếu vào ô:
        </h4>
        <div className="flex items-center justify-center gap-3">
          <input
            type="text"
            value={typedInput}
            disabled={isSuccess}
            onChange={(e) => {
              setTypedInput(e.target.value);
              setErrorMessage(null);
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleCheckInput()}
            placeholder="Nhập kết quả của em..."
            className={`flex-1 px-4 py-3 rounded-2xl border-2 text-base font-bold text-center outline-none transition-all ${
              isSuccess
                ? 'bg-emerald-50 border-emerald-400 text-emerald-800 font-black cursor-default'
                : 'border-purple-300 text-slate-800 focus:ring-4 focus:ring-purple-200 focus:border-purple-500'
            }`}
          />
          <button
            type="button"
            onClick={handleCheckInput}
            disabled={isSuccess || !typedInput.trim()}
            className={`px-6 py-3 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 ${
              isSuccess
                ? 'bg-emerald-600 text-white cursor-default'
                : typedInput.trim()
                ? 'bg-purple-600 hover:bg-purple-500 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isSuccess ? 'Đúng ✓' : 'Kiểm tra'}
          </button>
        </div>

        {errorMessage && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 py-2.5 px-3 rounded-xl animate-shake text-left">
            {errorMessage}
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full">
          🎉 {correctExplanation}
        </div>
      )}
    </div>
  );
};
