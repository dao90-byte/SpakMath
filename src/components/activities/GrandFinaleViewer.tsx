import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';
import { Trophy, Award, CheckCircle, RotateCcw, ArrowRight, Star, Sparkles } from 'lucide-react';

export interface FinaleQuestion {
  id: string;
  category: string;
  question: string;
  options: { id: string; text: string; isCorrect: boolean }[];
  explanation: string;
}

export interface GrandFinaleViewerProps {
  title: string;
  roundQuestions: FinaleQuestion[];
  onCompleted: () => void;
}

export const GrandFinaleViewer: React.FC<GrandFinaleViewerProps> = ({
  title,
  roundQuestions,
  onCompleted
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedInput, setTypedInput] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isAnsweredCorrect, setIsAnsweredCorrect] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCompletedAll, setIsCompletedAll] = useState(false);

  const currentQ = roundQuestions[currentIdx];
  const totalRounds = roundQuestions.length;

  const checkAnswerMatch = (input: string, correctText: string): boolean => {
    const cleanIn = input.trim().toLowerCase();
    const cleanCor = correctText.trim().toLowerCase();
    if (cleanIn === cleanCor) return true;
    const inDigits = cleanIn.match(/\d+/)?.[0];
    const corDigits = cleanCor.match(/\d+/)?.[0];
    if (inDigits && corDigits && inDigits === corDigits) return true;
    return cleanCor.includes(cleanIn) || cleanIn.includes(cleanCor);
  };

  const handleCheckAnswer = () => {
    if (!typedInput.trim() || isAnsweredCorrect) return;
    const correctOpt = currentQ.options.find((o) => o.isCorrect);
    if (!correctOpt) return;

    sound.playClick();
    if (checkAnswerMatch(typedInput, correctOpt.text)) {
      sound.playCorrect();
      sound.playStarCollect();
      setIsAnsweredCorrect(true);
      setShowExplanation(true);
      setErrorMessage(null);
      setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: correctOpt.id }));
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác. Em hãy phân tích đề bài và kiểm tra lại phép tính nhé!');
    }
  };

  const handleNextRound = () => {
    sound.playClick();
    setShowExplanation(false);
    setTypedInput('');
    setErrorMessage(null);
    setIsAnsweredCorrect(false);

    if (currentIdx < totalRounds - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Completed all questions
      sound.playVictory();
      setIsCompletedAll(true);
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        onCompleted();
      }, 1000);
    }
  };

  const handleRestart = () => {
    sound.playWrong();
    setCurrentIdx(0);
    setTypedInput('');
    setErrorMessage(null);
    setIsAnsweredCorrect(false);
    setSelectedAnswers({});
    setShowExplanation(false);
    setIsCompletedAll(false);
  };

  const score = Object.entries(selectedAnswers).filter(([qId, optId]) => {
    const q = roundQuestions.find((item) => item.id === qId);
    const opt = q?.options.find((o) => o.id === optId);
    return opt?.isCorrect;
  }).length;

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto select-none">
      {/* Trophy & Progress header */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-white rounded-3xl p-5 md:p-6 text-center w-full shadow-lg border-2 border-yellow-300">
        <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
          <Trophy className="w-4 h-4 text-amber-200" />
          {title}
        </div>
        <h2 className="text-xl md:text-2xl font-black font-display">
          Chung Kết Đấu Trường Toán Học Lớp 3
        </h2>
        <div className="mt-3 flex items-center justify-center gap-2">
          {roundQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentIdx
                  ? 'w-8 bg-white'
                  : i < currentIdx
                  ? 'w-4 bg-amber-200'
                  : 'w-4 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {!isCompletedAll ? (
        /* Question Card */
        <div className="w-full bg-white rounded-3xl border-2 border-slate-200 p-5 md:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-rose-100 text-rose-800">
              {currentQ.category}
            </span>
            <span className="text-xs font-bold text-slate-400">
              Câu {currentIdx + 1} / {totalRounds}
            </span>
          </div>

          <h3 className="text-base md:text-lg font-black text-slate-800 leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Typed Answer Input */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                type="text"
                placeholder="Tự tay nhập câu trả lời của em..."
                value={typedInput}
                disabled={isAnsweredCorrect}
                onChange={(e) => {
                  setTypedInput(e.target.value);
                  setErrorMessage(null);
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleCheckAnswer()}
                className={`flex-1 px-4 py-3.5 rounded-2xl border-2 font-bold text-sm md:text-base outline-none transition-all ${
                  isAnsweredCorrect
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                    : 'bg-slate-50 border-slate-300 text-slate-800 focus:border-amber-500 focus:bg-white'
                }`}
              />
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={isAnsweredCorrect || !typedInput.trim()}
                className={`px-6 py-3.5 rounded-2xl font-black text-sm md:text-base transition-all shadow-sm shrink-0 ${
                  isAnsweredCorrect
                    ? 'bg-emerald-600 text-white cursor-default'
                    : typedInput.trim()
                    ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isAnsweredCorrect ? 'Đúng ✓' : 'Kiểm tra'}
              </button>
            </div>

            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs md:text-sm text-rose-800 space-y-1 animate-shake">
                <p className="font-bold">❌ Chưa chính xác rồi em ơi!</p>
                <p className="font-medium text-slate-700">
                  🤔 <strong className="text-amber-800">Gợi mở tư duy:</strong> Em hãy đọc lại đề bài xem đại lượng nào đã biết và đại lượng nào đang cần tìm? Thử suy nghĩ về mối quan hệ giữa các dữ kiện xem nhé!
                </p>
              </div>
            )}
          </div>

          {/* Explanation & Next */}
          {showExplanation && (
            <div className="space-y-4 pt-3 border-t border-slate-100">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs md:text-sm font-semibold text-slate-700">
                <span className="font-black text-amber-800">💡 Giải thích chi tiết: </span>
                {currentQ.explanation}
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextRound}
                  className="py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm md:text-base shadow-md flex items-center gap-2 transition-transform active:scale-95"
                >
                  {currentIdx < totalRounds - 1 ? 'Câu tiếp theo' : 'Xem Cúp Quán Quân'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Certificate & Trophy Celebration */
        <div className="w-full bg-gradient-to-b from-amber-50 via-white to-amber-50 rounded-3xl border-4 border-amber-400 p-6 md:p-8 shadow-xl text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-amber-300/40 text-7xl select-none pointer-events-none">
            🏆
          </div>

          <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner border-2 border-amber-300">
            <Trophy className="w-10 h-10 animate-pulse text-amber-500" />
          </div>

          <span className="inline-block text-xs font-black uppercase tracking-widest text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full">
            Chứng Nhận Danh Dự
          </span>

          <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-display">
            VƯƠNG MIỆN QUÁN QUÂN TOÁN TƯ DUY
          </h2>

          <p className="text-sm md:text-base text-slate-700 max-w-md mx-auto font-medium">
            Chúc mừng bạn đã xuất sắc vượt qua toàn bộ Đấu Trường Siêu Thử Thách! Bạn đã trả lời đúng{' '}
            <strong className="text-amber-600 font-black">{score}/{totalRounds}</strong> câu hỏi thử thách đỉnh cao.
          </p>

          <div className="flex items-center justify-center gap-1 text-amber-500 text-2xl my-2">
            {'⭐⭐⭐⭐⭐'.split('').map((s, idx) => (
              <span key={idx} className="animate-bounce" style={{ animationDelay: `${idx * 100}ms` }}>
                {s}
              </span>
            ))}
          </div>

          <div className="p-4 bg-amber-100/60 rounded-2xl border border-amber-300 text-xs text-amber-950 font-bold max-w-sm mx-auto">
            Huy hiệu: <strong className="text-amber-800">Hiệp Sĩ Toán Học Xuất Sắc Lớp 3</strong>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
            >
              <RotateCcw className="w-4 h-4" /> Thử sức lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
