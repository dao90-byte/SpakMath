import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { recordMistake } from '../../utils/mistakeManager';
import { CheckCircle2, XCircle } from 'lucide-react';

interface BottleSpec {
  id: string;
  label: string;
  levelPercent: number;
  color?: string;
  subLabel?: string;
}

interface QuestionSpec {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

interface VolumeComparisonProps {
  bottles: BottleSpec[];
  questions: QuestionSpec[];
  onCompleted: () => void;
}

export const VolumeComparison: React.FC<VolumeComparisonProps> = ({
  bottles,
  questions,
  onCompleted
}) => {
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answeredStatus, setAnsweredStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});

  const checkAnswerMatch = (userInput: string, correctAnswer: string): boolean => {
    if (!userInput || !correctAnswer) return false;
    const cleanUser = userInput.trim().toLowerCase();
    const cleanCorrect = correctAnswer.trim().toLowerCase();

    if (cleanUser === cleanCorrect) return true;

    // Compare extracted numbers (e.g. user typed "200", correct is "200 mL" or "200ml")
    const userNum = cleanUser.match(/\d+/)?.[0];
    const correctNum = cleanCorrect.match(/\d+/)?.[0];
    if (userNum && correctNum && userNum === correctNum) return true;

    // Substring match (e.g. user typed "A" or "Bình A")
    if (cleanCorrect.includes(cleanUser) || cleanUser.includes(cleanCorrect)) return true;

    return false;
  };

  const handleCheckAnswer = (qId: string, correct: string) => {
    const rawVal = inputValues[qId] || '';
    if (!rawVal.trim()) return;

    const isMatch = checkAnswerMatch(rawVal, correct);

    if (isMatch) {
      sound.playCorrect();
      setAnsweredStatus((prev) => ({ ...prev, [qId]: 'correct' }));
      setAnswers((prev) => {
        const next = { ...prev, [qId]: correct };
        const allRight = questions.every((q) => {
          const val = q.id === qId ? correct : next[q.id];
          return val === q.correctAnswer;
        });

        if (allRight) {
          setTimeout(() => {
            sound.playStarCollect();
            onCompleted();
          }, 500);
        }
        return next;
      });
    } else {
      sound.playWrong();
      setAnsweredStatus((prev) => ({ ...prev, [qId]: 'wrong' }));
      const currentQ = questions.find((q) => q.id === qId);
      if (currentQ) {
        recordMistake({
          questionPrompt: currentQ.prompt,
          userAnswer: rawVal,
          correctAnswer: correct,
          explanation:
            'Khi so sánh lượng chất lỏng, phải xem xét cả chiều cao mực nước VÀ độ rộng đáy bình (diện tích đáy) nữa nhé!',
          options: currentQ.options,
          category: 'concept'
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Visual Bottles Grid */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md">
        <div className="flex flex-wrap justify-center items-end gap-6 md:gap-10">
          {bottles.map((b) => (
            <div key={b.id} className="flex flex-col items-center space-y-2">
              <span className="font-extrabold text-slate-700 text-sm md:text-base text-center max-w-[140px]">
                {b.label}
              </span>

              {/* Bottle Shape */}
              <div className="w-16 md:w-20 h-44 md:h-52 border-3 md:border-4 border-slate-700 rounded-b-2xl rounded-t-md bg-slate-50 relative overflow-hidden flex flex-col justify-end shadow-inner">
                {/* Cap */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-4 bg-slate-800 rounded-t-xs" />
                {/* Water Level */}
                <div
                  style={{
                    height: `${Math.min(100, Math.max(0, b.levelPercent))}%`,
                    backgroundColor: b.color || undefined
                  }}
                  className={`w-full ${!b.color ? 'bg-gradient-to-t from-sky-600 to-sky-400' : ''} transition-all relative`}
                >
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/40 rounded-full" />
                </div>
              </div>

              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {b.subLabel || `${b.levelPercent}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sub questions with Direct Input */}
      <div className="space-y-4">
        {questions.map((q) => {
          const status = answeredStatus[q.id];
          const isCorrect = status === 'correct';
          const isWrong = status === 'wrong';

          return (
            <div
              key={q.id}
              className={`p-5 rounded-3xl border-2 transition-all ${
                isCorrect
                  ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                  : isWrong
                  ? 'bg-rose-50/60 border-rose-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="font-bold text-slate-800 text-sm md:text-base leading-snug">
                  {q.prompt}
                </span>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {isWrong && <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
              </div>

              {/* Direct Input Form */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="text"
                    placeholder="Tự nhập câu trả lời của em..."
                    value={inputValues[q.id] || ''}
                    disabled={isCorrect}
                    onChange={(e) => {
                      setInputValues({ ...inputValues, [q.id]: e.target.value });
                      if (answeredStatus[q.id] === 'wrong') {
                        setAnsweredStatus({ ...answeredStatus, [q.id]: null });
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleCheckAnswer(q.id, q.correctAnswer);
                      }
                    }}
                    className={`flex-1 px-4 py-2.5 rounded-2xl border-2 text-sm md:text-base font-bold outline-none transition-all shadow-inner ${
                      isCorrect
                        ? 'bg-emerald-100/60 border-emerald-500 text-emerald-950 font-black cursor-not-allowed'
                        : isWrong
                        ? 'bg-rose-50 border-rose-400 text-rose-950 focus:border-rose-500 focus:ring-3 focus:ring-rose-200'
                        : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-sky-500 focus:ring-3 focus:ring-sky-200 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckAnswer(q.id, q.correctAnswer)}
                    disabled={isCorrect || !inputValues[q.id]?.trim()}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all shadow-xs shrink-0 active:scale-95 flex items-center gap-1.5 ${
                      isCorrect
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    {isCorrect ? 'Đúng ✓' : 'Kiểm tra'}
                  </button>
                </div>

                {isWrong && (
                  <p className="text-xs text-rose-600 font-bold animate-shake">
                    Chưa đúng rồi! Em hãy quan sát kỹ dung tích các bình và tính lại nhé!
                  </p>
                )}
                {isCorrect && (
                  <p className="text-xs text-emerald-700 font-bold">
                    ✓ Rất chính xác! Em đã tự tay tìm ra câu trả lời xuất sắc!
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
