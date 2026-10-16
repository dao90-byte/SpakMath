import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Lock, Unlock, Key, Lightbulb, CheckCircle2, AlertCircle, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

export interface TreasureClue {
  attempt: number[];
  correctDigits: number;
  correctPositions: number;
  description: string;
}

export interface TreasureVaultViewerProps {
  title: string;
  codeLength: number;
  solutionCode: number[];
  clues: TreasureClue[];
  onCompleted: () => void;
}

export const TreasureVaultViewer: React.FC<TreasureVaultViewerProps> = ({
  title,
  codeLength,
  solutionCode,
  clues,
  onCompleted
}) => {
  const [digits, setDigits] = useState<number[]>(Array(codeLength).fill(0));
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const incrementDigit = (index: number) => {
    sound.playClick();
    setErrorMessage(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 1) % 10;
      return next;
    });
  };

  const decrementDigit = (index: number) => {
    sound.playClick();
    setErrorMessage(null);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = (next[index] + 9) % 10;
      return next;
    });
  };

  const handleTestCode = () => {
    const isCorrect = digits.every((d, i) => d === solutionCode[i]);

    if (isCorrect) {
      sound.playVictory();
      setIsUnlocked(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 700);
    } else {
      sound.playWrong();
      // Count matches for player feedback
      let exactPos = 0;
      let rightDigits = 0;
      const solCopy = [...solutionCode];
      digits.forEach((d, i) => {
        if (d === solCopy[i]) exactPos++;
      });
      digits.forEach((d) => {
        if (solCopy.includes(d)) rightDigits++;
      });
      setErrorMessage(
        `Mã ${digits.join('')} chưa chính xác! (Hiện tại: ${rightDigits} số có mặt, ${exactPos} số đúng vị trí). Hãy đọc kỹ lại các manh mối!`
      );
    }
  };

  const handleAutoSolve = () => {
    sound.playCorrect();
    setDigits([...solutionCode]);
    setIsUnlocked(true);
    setErrorMessage(null);
    setTimeout(() => {
      sound.playStarCollect();
      onCompleted();
    }, 600);
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Banner */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-3xl p-4 md:p-5 text-center w-full shadow-sm">
        <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-800 uppercase tracking-wider">
          <Key className="w-4 h-4 text-amber-600" />
          {title}
        </div>
        <p className="text-sm md:text-base font-black text-amber-950 mt-1">
          Quan sát các manh mối suy luận để tìm ra mật mã {codeLength} chữ số mở chiếc két sắt vàng!
        </p>
      </div>

      {/* Clues Card */}
      <div className="w-full bg-white rounded-3xl border-2 border-slate-200 p-4 md:p-6 shadow-sm space-y-3">
        <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          Sổ tay thám tử: Bảng manh mối mật mã
        </h3>

        <div className="space-y-2.5">
          {clues.map((clue, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200 gap-2"
            >
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-black text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                <div className="flex gap-1.5 font-mono text-lg font-black bg-slate-900 text-amber-300 px-3 py-1 rounded-xl tracking-widest shadow-inner">
                  {clue.attempt.map((n, i) => (
                    <span key={i}>{n}</span>
                  ))}
                </div>
              </div>

              <div className="text-xs md:text-sm font-bold text-slate-700 flex items-center gap-1.5">
                {clue.correctDigits === 0 ? (
                  <span className="inline-flex items-center gap-1 text-rose-600 font-extrabold bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200">
                    <AlertCircle className="w-3.5 h-3.5" /> Không có số nào đúng
                  </span>
                ) : (
                  <span className="text-slate-800">{clue.description}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safe Box Graphic & Dial Keypad */}
      <div
        className={`w-full max-w-md p-6 rounded-3xl border-4 transition-all duration-300 shadow-xl flex flex-col items-center ${
          isUnlocked
            ? 'bg-gradient-to-b from-amber-400 to-yellow-500 border-amber-600 text-slate-900 ring-4 ring-amber-300'
            : 'bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700 text-white'
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          {isUnlocked ? (
            <div className="flex items-center gap-2 text-amber-950 font-black text-lg bg-amber-200 px-4 py-1.5 rounded-full shadow-inner animate-pulse">
              <Unlock className="w-5 h-5 text-emerald-700" /> KÉT SẮT ĐÃ MỞ!
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm bg-slate-700/60 px-4 py-1.5 rounded-full">
              <Lock className="w-4 h-4 text-amber-400" /> KÉT SẮT ĐANG KHÓA
            </div>
          )}
        </div>

        {/* Digit dials */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
          {digits.map((val, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => incrementDigit(idx)}
                disabled={isUnlocked}
                className="w-12 h-9 rounded-xl bg-slate-700/80 hover:bg-amber-500 text-white font-bold flex items-center justify-center transition-colors active:scale-95 disabled:opacity-40"
              >
                <ChevronUp className="w-5 h-5" />
              </button>

              <div
                className={`w-14 h-16 sm:w-16 sm:h-20 my-2 rounded-2xl flex items-center justify-center font-mono text-3xl sm:text-4xl font-black shadow-inner border-2 ${
                  isUnlocked
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-black text-amber-400 border-slate-600'
                }`}
              >
                {val}
              </div>

              <button
                type="button"
                onClick={() => decrementDigit(idx)}
                disabled={isUnlocked}
                className="w-12 h-9 rounded-xl bg-slate-700/80 hover:bg-amber-500 text-white font-bold flex items-center justify-center transition-colors active:scale-95 disabled:opacity-40"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Action Button */}
        {!isUnlocked && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full">
            <button
              type="button"
              onClick={handleAutoSolve}
              className="px-4 py-2.5 rounded-2xl bg-slate-700 hover:bg-slate-600 text-amber-300 font-bold text-xs"
            >
              Gợi ý mật mã
            </button>
            <button
              type="button"
              onClick={handleTestCode}
              className="flex-1 max-w-xs py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Key className="w-5 h-5" /> Mở Khóa Két Sắt
            </button>
          </div>
        )}

        {isUnlocked && (
          <div className="mt-4 text-center">
            <div className="text-4xl animate-bounce mb-2">💎 🪙 ⭐ 👑</div>
            <p className="text-base font-black text-amber-950">
              Chúc mừng bạn! Két sắt vàng đã được mở thành công!
            </p>
          </div>
        )}
      </div>

      {/* Error / Feedback notification */}
      {errorMessage && (
        <div className="p-3.5 bg-rose-50 border-2 border-rose-300 rounded-2xl text-rose-800 text-xs md:text-sm font-bold text-center w-full">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
