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
  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [answeredStatus, setAnsweredStatus] = useState<Record<string, 'correct' | 'wrong' | null>>({});
  const [activeCell, setActiveCell] = useState<{ itemId: string; index: number } | null>(null);

  const checkAnswerMatch = (userInput: string, correctAnswer: string): boolean => {
    if (!userInput || !correctAnswer) return false;
    const cleanUser = userInput.trim().toLowerCase();
    const cleanCorrect = correctAnswer.trim().toLowerCase();

    if (cleanUser === cleanCorrect) return true;

    // Normalize numbers with thousand separators (spaces, dots, commas): e.g. "12 000" -> "12000"
    const normalizedUser = cleanUser.replace(/(\d)[\s.,]+(?=\d)/g, '$1');
    const normalizedCorrect = cleanCorrect.replace(/(\d)[\s.,]+(?=\d)/g, '$1');

    const userNums = normalizedUser.match(/\d+/g);
    const correctNums = normalizedCorrect.match(/\d+/g);
    if (userNums && correctNums && userNums[0] === correctNums[0]) return true;

    // For non-numeric or named answers, require at least 3 characters and no numeric mismatch
    if (!userNums && !correctNums && cleanUser.length >= 3) {
      if (cleanCorrect.includes(cleanUser) || cleanUser.includes(cleanCorrect)) return true;
    }

    return false;
  };

  const handleSelectOption = (questionId: string, optionText: string, correctAnswer: string) => {
    sound.playClick();
    setInputValues((prev) => ({ ...prev, [questionId]: optionText }));
    handleCheckAnswer(questionId, correctAnswer, optionText);
  };

  const handleCheckAnswer = (questionId: string, correctAnswer: string, overrideVal?: string) => {
    const rawVal = overrideVal !== undefined ? overrideVal : (inputValues[questionId] || '');
    if (!rawVal.trim()) return;

    const isMatch = checkAnswerMatch(rawVal, correctAnswer);

    if (isMatch) {
      sound.playCorrect();
      setAnsweredStatus((prev) => ({ ...prev, [questionId]: 'correct' }));
      setSelectedAnswers((prev) => {
        const next = { ...prev, [questionId]: correctAnswer };
        const allCorrect = subQuestions.every((q) => {
          const ans = q.id === questionId ? correctAnswer : next[q.id];
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
    } else {
      sound.playWrong();
      setAnsweredStatus((prev) => ({ ...prev, [questionId]: 'wrong' }));
      const currentQ = subQuestions.find((q) => q.id === questionId);
      if (currentQ) {
        recordMistake({
          questionPrompt: `[Quy ước: ${keyNotice}] ${currentQ.prompt}`,
          userAnswer: rawVal,
          correctAnswer: correctAnswer,
          explanation: `Quy ước đề bài ghi rõ: "${keyNotice}". Hãy đếm số lượng hình vẽ rồi nhân với hệ số tương ứng trước khi kết luận!`,
          options: currentQ.options,
          category: 'reading'
        });
      }
    }
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

      {/* Sub Questions with Direct Input Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subQuestions.map((q) => {
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
                <h4 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                  {q.prompt}
                </h4>
                {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                {isWrong && <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />}
              </div>

              {/* Option Pills + Direct Input Form */}
              <div className="space-y-2.5">
                {q.options && q.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {q.options.map((opt, oIdx) => {
                      const isPicked = inputValues[q.id] === opt;
                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={isCorrect}
                          onClick={() => handleSelectOption(q.id, opt, q.correctAnswer)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all active:scale-95 ${
                            isCorrect && opt === q.correctAnswer
                              ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                              : isPicked
                              ? 'bg-amber-200 text-amber-950 border-amber-400'
                              : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200 hover:border-amber-300'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    inputMode="text"
                    placeholder="Hoặc tự nhập kết quả của em..."
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
                        : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500 focus:ring-3 focus:ring-amber-200 focus:bg-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => handleCheckAnswer(q.id, q.correctAnswer)}
                    disabled={isCorrect || !inputValues[q.id]?.trim()}
                    className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all shadow-xs shrink-0 active:scale-95 flex items-center gap-1.5 ${
                      isCorrect
                        ? 'bg-emerald-500 text-white cursor-default'
                        : 'bg-amber-500 hover:bg-amber-600 text-white disabled:opacity-40 disabled:cursor-not-allowed'
                    }`}
                  >
                    {isCorrect ? 'Đúng ✓' : 'Kiểm tra'}
                  </button>
                </div>

                {isWrong && (
                  <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 animate-shake">
                    <p className="font-bold">❌ Chưa chính xác rồi em ơi!</p>
                    <p className="font-medium text-slate-700 mt-0.5">
                      🤔 <strong className="text-amber-800">Gợi mở tư duy:</strong> Mỗi biểu tượng trong bảng tương ứng với bao nhiêu đơn vị thực tế? Em hãy quan sát kỹ hàng tương ứng và suy nghĩ về quy ước đề bài nhé!
                    </p>
                  </div>
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
