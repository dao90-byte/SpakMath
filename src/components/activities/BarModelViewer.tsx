import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { CheckCircle2, XCircle } from 'lucide-react';

interface BarPart {
  val: number;
  label: string;
}

interface BarItem {
  label: string;
  lengthVal: number;
  display?: string;
  parts?: BarPart[];
  color: string;
}

interface QuestionSpec {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

interface BarModelViewerProps {
  bars: BarItem[];
  questions: QuestionSpec[];
  onCompleted: () => void;
}

export const BarModelViewer: React.FC<BarModelViewerProps> = ({
  bars,
  questions,
  onCompleted
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const maxLength = Math.max(...bars.map((b) => b.lengthVal));

  const handleSelect = (qId: string, opt: string, correct: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [qId]: opt };
      if (opt === correct) {
        sound.playCorrect();
      } else {
        sound.playWrong();
      }

      const allCorrect = questions.every((q) => {
        const a = q.id === qId ? opt : next[q.id];
        return a === q.correctAnswer;
      });

      if (allCorrect) {
        setTimeout(() => {
          sound.playStarCollect();
          onCompleted();
        }, 500);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {/* Sơ đồ đoạn thẳng Canvas container */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md space-y-6">
        <h4 className="text-xs uppercase tracking-wider font-extrabold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl w-fit">
          📊 Mô Hình Sơ Đồ Đoạn Thẳng (Bar Model)
        </h4>

        <div className="space-y-6">
          {bars.map((bar, idx) => {
            const widthPercent = (bar.lengthVal / maxLength) * 90;

            return (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm font-bold text-slate-700">
                  <span>{bar.label}</span>
                  {bar.display && (
                    <span className="text-xs px-2 py-0.5 bg-slate-100 rounded-md font-extrabold text-slate-600">
                      {bar.display}
                    </span>
                  )}
                </div>

                {/* Bar representation */}
                <div className="h-10 bg-slate-100 rounded-2xl p-1 flex items-stretch overflow-hidden border border-slate-200">
                  {bar.parts && bar.parts.length > 0 ? (
                    bar.parts.map((part, pIdx) => {
                      const partWidth = (part.val / bar.lengthVal) * 100;
                      return (
                        <div
                          key={pIdx}
                          style={{ width: `${partWidth}%` }}
                          className={`h-full rounded-xl flex items-center justify-center text-xs md:text-sm font-bold text-white transition-all shadow-xs ${
                            pIdx === 0 ? 'bg-emerald-500' : 'bg-amber-500 border-l-2 border-white'
                          }`}
                        >
                          {part.label}
                        </div>
                      );
                    })
                  ) : (
                    <div
                      style={{ width: `${widthPercent}%` }}
                      className={`h-full ${bar.color} rounded-xl flex items-center justify-center text-xs md:text-sm font-bold text-white transition-all shadow-xs`}
                    >
                      {bar.display || `${bar.lengthVal} L`}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 italic text-center border-t border-slate-100 pt-3">
          💡 Đoạn thẳng biểu diễn số lít: đoạn càng dài tương ứng số lít càng nhiều.
        </div>
      </div>

      {/* Sub questions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correctAnswer;
          const hasAnswered = !!selected;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-3xl border-2 transition-all ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-400'
                  : hasAnswered
                  ? 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800 text-sm md:text-base">
                  {q.prompt}
                </span>
                {hasAnswered && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isThisSelected = selected === opt;
                  let style = 'bg-slate-100 text-slate-700 hover:bg-slate-200';
                  if (isThisSelected) {
                    style = isCorrect
                      ? 'bg-emerald-500 text-white font-bold shadow-md'
                      : 'bg-rose-500 text-white font-bold';
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(q.id, opt, q.correctAnswer)}
                      className={`px-4 py-2.5 rounded-2xl font-semibold text-xs md:text-sm border transition-all active:scale-95 ${style}`}
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
