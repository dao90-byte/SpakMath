import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { recordMistake } from '../../utils/mistakeManager';
import { CheckCircle2, XCircle } from 'lucide-react';

interface SubQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

interface PictographItem {
  id: string;
  label: string;
  icon: string;
  count: number;
  actualValue?: number;
}

interface PictographViewerProps {
  keyNotice: string;
  items: PictographItem[];
  subQuestions: SubQuestion[];
  multiplier?: number;
  onAllCompleted: () => void;
}

export const PictographViewer: React.FC<PictographViewerProps> = ({
  keyNotice,
  items,
  subQuestions,
  multiplier = 1,
  onAllCompleted
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [activeCell, setActiveCell] = useState<{ itemId: string; index: number } | null>(null);

  const handleSelectOption = (questionId: string, option: string, correctAnswer: string) => {
    setSelectedAnswers((prev) => {
      const next = { ...prev, [questionId]: option };
      if (option === correctAnswer) {
        sound.playCorrect();
      } else {
        sound.playWrong();
        const currentQ = subQuestions.find((q) => q.id === questionId);
        if (currentQ) {
          recordMistake({
            questionPrompt: `[Quy ước: ${keyNotice}] ${currentQ.prompt}`,
            userAnswer: option,
            correctAnswer: correctAnswer,
            explanation: `Quy ước đề bài ghi rõ: "${keyNotice}". Hãy đếm số lượng hình vẽ rồi nhân với hệ số tương ứng trước khi kết luận!`,
            options: currentQ.options,
            category: 'reading'
          });
        }
      }

      // Check if all questions are answered correctly
      const allCorrect = subQuestions.every((q) => {
        const ans = q.id === questionId ? option : next[q.id];
        return ans === q.correctAnswer;
      });

      if (allCorrect) {
        setTimeout(() => {
          sound.playStarCollect();
          onAllCompleted();
        }, 500);
      }
      return next;
    });
  };

  const handleSymbolClick = (itemId: string, index: number) => {
    sound.playCountTick(index);
    setActiveCell({ itemId, index });
    setTimeout(() => setActiveCell(null), 300);
  };

  return (
    <div className="space-y-6">
      {/* Notice Banner */}
      <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl px-5 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">💡</span>
          <span className="font-bold text-amber-900 text-sm md:text-base">{keyNotice}</span>
        </div>
        <span className="text-xs text-amber-700 bg-amber-200/70 px-2.5 py-1 rounded-full font-medium">
          Chạm vào biểu tượng để đếm!
        </span>
      </div>

      {/* Pictograph Table */}
      <div className="bg-white rounded-3xl p-4 md:p-6 shadow-md border-2 border-slate-100 overflow-x-auto">
        <table className="w-full min-w-[500px] border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-200 text-slate-500 text-xs md:text-sm">
              <th className="py-3 px-4 text-left font-bold w-1/3">Đối tượng</th>
              <th className="py-3 px-4 text-left font-bold">Số lượng biểu tượng biểu diễn</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b border-slate-100 transition-colors hover:bg-slate-50/80 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'
                }`}
              >
                <td className="py-3 px-4 flex items-center gap-3 font-semibold text-slate-800 text-sm md:text-base">
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.label}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {Array.from({ length: item.count }).map((_, i) => {
                      const isCellActive = activeCell?.itemId === item.id && activeCell?.index === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSymbolClick(item.id, i)}
                          className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-lg md:text-xl transition-all active:scale-90 border-2 ${
                            isCellActive
                              ? 'scale-125 bg-amber-300 border-amber-500 shadow-md rotate-6'
                              : 'bg-amber-100/70 border-amber-300 hover:bg-amber-200 hover:scale-105'
                          }`}
                          title={`Chạm để đếm: ${i + 1}`}
                        >
                          <span className="text-base md:text-lg select-none">{item.icon}</span>
                        </button>
                      );
                    })}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Sub Questions & Option Choices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subQuestions.map((q) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;
          const hasAnswered = !!userAns;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-3xl border-2 transition-all ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                  : hasAnswered
                  ? 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <h4 className="font-bold text-slate-900 text-sm md:text-base mb-3 flex items-start justify-between">
                <span>{q.prompt}</span>
                {hasAnswered && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )
                )}
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isSelected = userAns === opt;
                  const isThisCorrect = opt === q.correctAnswer;

                  let btnStyle = 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200';
                  if (isSelected) {
                    btnStyle = isThisCorrect
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                      : 'bg-rose-500 text-white border-rose-600 font-bold';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(q.id, opt, q.correctAnswer)}
                      className={`px-3 py-2.5 rounded-2xl text-xs md:text-sm font-semibold border-2 transition-transform active:scale-95 ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
