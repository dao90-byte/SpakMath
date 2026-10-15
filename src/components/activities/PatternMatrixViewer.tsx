import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { CheckCircle2, XCircle } from 'lucide-react';

interface MatrixStep {
  stepNum: number;
  content: string; // Emojis or textual/visual representation
  note?: string;
}

interface PatternChoice {
  id: string;
  label: string;
  content: string;
}

interface PatternMatrixViewerProps {
  ruleDescription: string;
  steps: MatrixStep[];
  choices: PatternChoice[];
  correctChoiceId: string;
  onCompleted: () => void;
}

export const PatternMatrixViewer: React.FC<PatternMatrixViewerProps> = ({
  ruleDescription,
  steps,
  choices,
  correctChoiceId,
  onCompleted
}) => {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelect = (choiceId: string) => {
    sound.playClick();
    setSelectedChoice(choiceId);

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

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Pattern Sequence Row */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-2xl">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 text-center">
          {ruleDescription}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 items-center">
          {steps.map((st) => (
            <div
              key={st.stepNum}
              className="flex flex-col items-center p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl"
            >
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-2">
                Bước {st.stepNum}
              </span>
              <div className="text-3xl md:text-4xl min-h-[50px] flex items-center justify-center font-black">
                {st.content}
              </div>
              {st.note && (
                <span className="text-[10px] text-slate-500 mt-1 font-semibold">
                  {st.note}
                </span>
              )}
            </div>
          ))}

          {/* Target Step 4 (Question Mark) */}
          <div
            className={`flex flex-col items-center p-4 rounded-2xl border-3 transition-all ${
              selectedChoice
                ? selectedChoice === correctChoiceId
                  ? 'bg-emerald-50 border-emerald-500 ring-4 ring-emerald-300'
                  : 'bg-rose-50 border-rose-400 ring-4 ring-rose-200'
                : 'bg-amber-50 border-dashed border-amber-400'
            }`}
          >
            <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full mb-2">
              Bước 4 (?)
            </span>
            <div className="text-3xl md:text-4xl min-h-[50px] flex items-center justify-center font-black">
              {selectedChoice
                ? choices.find((c) => c.id === selectedChoice)?.content
                : '❓'}
            </div>
            <span className="text-[10px] font-bold text-amber-800 mt-1">
              {selectedChoice
                ? choices.find((c) => c.id === selectedChoice)?.label
                : 'Chưa chọn'}
            </span>
          </div>
        </div>
      </div>

      {/* Choices to Pick */}
      <div className="space-y-3 text-center w-full max-w-xl">
        <h4 className="font-bold text-slate-800 text-sm md:text-base">
          Hình nào sẽ xuất hiện ở Bước 4?
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {choices.map((c) => {
            const isSelected = selectedChoice === c.id;
            const isCorrect = c.id === correctChoiceId;

            let btnStyle = 'bg-white hover:bg-amber-50 border-slate-300';
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                : 'bg-rose-500 text-white border-rose-600 font-bold';
            }

            return (
              <button
                key={c.id}
                type="button"
                onClick={() => handleSelect(c.id)}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all active:scale-95 ${btnStyle}`}
              >
                <span className="text-2xl md:text-3xl mb-1">{c.content}</span>
                <span className="text-xs font-bold">{c.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Chính xác! Bạn đã tìm ra quy luật biến đổi xoay vòng của hình ảnh!
        </div>
      )}
    </div>
  );
};
