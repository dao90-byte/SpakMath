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
    if (!cleanIn || !cleanCor) return false;
    if (cleanIn === cleanCor) return true;

    const normIn = cleanIn.replace(/(\d)[\s.,]+(?=\d)/g, '$1');
    const normCor = cleanCor.replace(/(\d)[\s.,]+(?=\d)/g, '$1');
    const inDigits = normIn.match(/\d+/)?.[0];
    const corDigits = normCor.match(/\d+/)?.[0];
    if (inDigits && corDigits) {
      return inDigits === corDigits;
    }
    if (!inDigits && !corDigits && cleanIn.length >= 2) {
      return cleanCor.includes(cleanIn) || cleanIn.includes(cleanCor);
    }
    return false;
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
      <div className="bg-[radial-gradient(ellipse_at_top_left,_rgba(251,191,36,0.34),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.28),_transparent_55%),linear-gradient(135deg,_#121A4F_0%,_#1D1252_55%,_#241145_100%)] text-white rounded-3xl p-5 md:p-6 text-center w-full shadow-[0_20px_54px_rgba(3,7,24,0.85),0_0_36px_rgba(251,191,36,0.28)] border-2 border-amber-300/70">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-300/50 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 text-amber-200">
          <Trophy className="w-4 h-4 text-amber-300" />
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

          {/* Direct Typed Answer Input */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
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
        <div className="w-full bg-[radial-gradient(ellipse_at_top,_rgba(251,191,36,0.26),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.22),_transparent_55%),linear-gradient(160deg,_#0A1138_0%,_#15114A_55%,_#090D2E_100%)] rounded-3xl border-2 border-amber-300/75 p-6 md:p-8 shadow-[0_28px_72px_rgba(3,7,24,0.88),0_0_48px_rgba(251,191,36,0.28)] text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-2 right-2 text-amber-300/25 text-7xl select-none pointer-events-none">
            🏆
          </div>

          <div className="w-20 h-20 bg-amber-400/20 text-amber-300 rounded-full flex items-center justify-center mx-auto shadow-[0_0_28px_rgba(251,191,36,0.45)] border-2 border-amber-300/70">
            <Trophy className="w-10 h-10 animate-pulse text-amber-300" />
          </div>

          <span className="inline-block text-xs font-black uppercase tracking-widest text-amber-200 bg-amber-400/20 border border-amber-300/50 px-3 py-1 rounded-full">
            Chứng Nhận Danh Dự
          </span>

          <h2 className="text-2xl md:text-3xl font-black text-amber-100 font-display cosmic-glow-title-gold">
            VƯƠNG MIỆN QUÁN QUÂN TOÁN TƯ DUY
          </h2>

          <p className="text-sm md:text-base text-slate-100 max-w-md mx-auto font-medium">
            Chúc mừng bạn đã xuất sắc vượt qua toàn bộ Đấu Trường Siêu Thử Thách! Bạn đã trả lời đúng{' '}
            <strong className="text-amber-300 font-black">{score}/{totalRounds}</strong> câu hỏi thử thách đỉnh cao.
          </p>

          <div className="flex items-center justify-center gap-1 text-amber-400 text-2xl my-2">
            {'⭐⭐⭐⭐⭐'.split('').map((s, idx) => (
              <span key={idx} className="animate-bounce" style={{ animationDelay: `${idx * 100}ms` }}>
                {s}
              </span>
            ))}
          </div>

          <div className="p-4 bg-amber-400/15 rounded-2xl border border-amber-300/45 text-xs text-amber-100 font-bold max-w-sm mx-auto">
            Huy hiệu: <strong className="text-amber-200">Hiệp Sĩ Toán Học Xuất Sắc Lớp 3</strong>
          </div>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 border border-cyan-300/45 text-white font-bold text-xs hover:bg-cyan-400/20 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Thử sức lại
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
