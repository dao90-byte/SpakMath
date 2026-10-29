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
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  const maxLength = Math.max(...bars.map((b) => b.lengthVal));

  const checkAnswerMatch = (input: string, correct: string) => {
    const cleanIn = input.trim().toLowerCase();
    const cleanCor = correct.trim().toLowerCase();
    if (cleanIn === cleanCor) return true;

    // Compare pure digits if both have numbers
    const inDigits = cleanIn.replace(/\D/g, '');
    const corDigits = cleanCor.replace(/\D/g, '');
    if (inDigits && corDigits && inDigits === corDigits) return true;

    // Check if correct answer contains the input or starts with it
    return cleanCor.includes(cleanIn) || cleanIn.includes(cleanCor);
  };

  const handleCheck = (qId: string, correct: string) => {
    sound.playClick();
    const entered = inputValues[qId] || '';
    if (!entered.trim()) return;

    const isMatch = checkAnswerMatch(entered, correct);
    if (isMatch) {
      sound.playCorrect();
      setFeedback((prev) => ({ ...prev, [qId]: 'correct' }));
      setAnswers((prev) => {
        const next = { ...prev, [qId]: entered };
        const allCorrect = questions.every((q) => {
          return q.id === qId ? true : prev[q.id] && checkAnswerMatch(prev[q.id], q.correctAnswer);
        });

        if (allCorrect) {
          setTimeout(() => {
            sound.playStarCollect();
            onCompleted();
          }, 500);
        }
        return next;
      });
    } else {
      sound.playWrong();
      setFeedback((prev) => ({ ...prev, [qId]: 'wrong' }));
    }
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

      {/* Sub questions with direct input typing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((q) => {
          const status = feedback[q.id];
          const isCorrect = status === 'correct';
          const isWrong = status === 'wrong';

          return (
            <div
              key={q.id}
              className={`p-5 rounded-3xl border-2 transition-all space-y-3 ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-400'
                  : isWrong
                  ? 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 text-sm md:text-base">
                  {q.prompt}
                </span>
                {status && (
                  isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-500" />
                  )
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValues[q.id] || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputValues((prev) => ({ ...prev, [q.id]: val }));
                    if (feedback[q.id] === 'wrong') {
                      setFeedback((prev) => ({ ...prev, [q.id]: null }));
                    }
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && handleCheck(q.id, q.correctAnswer)}
                  placeholder="Nhập kết quả..."
                  disabled={isCorrect}
                  className={`flex-1 px-3.5 py-2.5 rounded-xl border-2 text-sm font-bold text-slate-800 focus:outline-none transition-all ${
                    isCorrect
                      ? 'bg-emerald-100/60 border-emerald-400 text-emerald-950 font-black'
                      : 'border-slate-200 focus:border-amber-400'
                  }`}
                />

                {!isCorrect && (
                  <button
                    type="button"
                    onClick={() => handleCheck(q.id, q.correctAnswer)}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-white font-bold text-xs shadow-xs transition-transform active:scale-95 shrink-0"
                  >
                    Kiểm tra
                  </button>
                )}
              </div>

              {isWrong && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 animate-shake">
                  <p className="font-bold">❌ Chưa chính xác rồi em ơi!</p>
                  <p className="font-medium text-slate-700 mt-0.5">
                    🤔 <strong className="text-amber-800">Gợi mở tư duy:</strong> Em hãy nhìn vào phần chênh lệch giữa các đoạn thẳng trên sơ đồ. Đoạn dài hơn đang nhiều hơn đoạn ngắn hơn đại lượng nào?
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
