import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { recordMistake } from '../../utils/mistakeManager';
import { Info, Users } from 'lucide-react';

interface QueueCounterProps {
  mode?: 'twoEnds' | 'between' | 'circle';
  fromFront?: number;
  fromBack?: number;
  totalInQueue?: number;
  personA?: { name: string; avatar: string; pos: number };
  personB?: { name: string; avatar: string; pos: number };
  correctTotal: number;
  formula: string;
  options?: number[];
  promptTitle?: string;
  onCompleted: () => void;
}

export const QueueCounter: React.FC<QueueCounterProps> = ({
  mode = 'twoEnds',
  fromFront = 2,
  fromBack = 3,
  totalInQueue = 10,
  personA = { name: 'Benny', avatar: '🐵', pos: 3 },
  personB = { name: 'Abby', avatar: '🐰', pos: 2 },
  correctTotal,
  formula,
  options = [correctTotal - 1, correctTotal, correctTotal + 1, correctTotal + 2],
  promptTitle = 'Hỏi cả hàng có tất cả bao nhiêu bạn?',
  onCompleted
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalSlots = mode === 'between' ? totalInQueue : correctTotal;
  const abbyIndex = fromFront - 1;

  const handleCheck = () => {
    sound.playClick();
    const parsed = parseInt(inputValue.trim(), 10);
    if (isNaN(parsed)) {
      setErrorMessage('Bé hãy nhập một số nguyên nhé!');
      sound.playWrong();
      return;
    }

    if (parsed === correctTotal) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage(`Chưa chính xác (${parsed} bạn). Bé hãy tính lại theo công thức nhé!`);
      recordMistake({
        questionPrompt: `${promptTitle} (Bài toán hàng ngũ: ${formula})`,
        userAnswer: `${parsed} bạn`,
        correctAnswer: `${correctTotal} bạn`,
        explanation: `Quy tắc hàng ngũ Spark Math: ${formula}. Chú ý xem đối tượng có bị đếm trùng 2 lần hoặc bị bỏ sót không nhé!`,
        category: 'calculation'
      });
    }
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full max-w-2xl mx-auto">
      {/* Visual queue diagram */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase px-2 mb-4">
          <span className="flex items-center gap-1 text-emerald-600">
            ⬅️ ĐẦU HÀNG (Phía trước)
          </span>
          <span className="flex items-center gap-1 text-purple-600">
            CUỐI HÀNG (Phía sau) ➡️
          </span>
        </div>

        {/* Queue Lineup */}
        <div className="flex items-center justify-center gap-2 md:gap-3 py-4 px-2 overflow-x-auto bg-slate-50/70 rounded-2xl border border-slate-200">
          {mode === 'between' ? (
            /* Between mode lineup */
            Array.from({ length: totalInQueue }).map((_, idx) => {
              const posFromFront = idx + 1;
              const posFromBack = totalInQueue - idx;
              const isPersonA = posFromFront === personA.pos;
              const isPersonB = posFromBack === personB.pos;
              const isBetween = posFromFront > personA.pos && posFromBack > personB.pos;

              let style = 'bg-white border-2 border-slate-300 text-slate-700';
              if (isPersonA) {
                style = 'bg-amber-100 border-3 border-amber-500 ring-4 ring-amber-300 scale-105 shadow-md';
              } else if (isPersonB) {
                style = 'bg-pink-100 border-3 border-pink-500 ring-4 ring-pink-300 scale-105 shadow-md';
              } else if (isBetween) {
                style = 'bg-emerald-50 border-2 border-dashed border-emerald-400 text-emerald-900';
              }

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold text-slate-500">
                    #{posFromFront}
                  </span>
                  <div
                    className={`w-12 h-16 sm:w-14 sm:h-18 rounded-2xl flex flex-col items-center justify-center ${style}`}
                  >
                    <span className="text-2xl">
                      {isPersonA
                        ? personA.avatar
                        : isPersonB
                        ? personB.avatar
                        : isBetween
                        ? '❓'
                        : '🧒'}
                    </span>
                    <span className="text-[9px] font-black mt-0.5 truncate max-w-[48px]">
                      {isPersonA
                        ? personA.name
                        : isPersonB
                        ? personB.name
                        : isBetween
                        ? 'Ở giữa'
                        : `B${posFromFront}`}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            /* Standard two ends mode */
            Array.from({ length: totalSlots }).map((_, idx) => {
              const isAbby = idx === abbyIndex;
              const fromFrontPos = idx + 1;
              const fromBackPos = totalSlots - idx;

              return (
                <div key={idx} className="flex flex-col items-center gap-1.5 shrink-0">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                    #{fromFrontPos}
                  </span>

                  <div
                    className={`w-12 h-16 sm:w-14 sm:h-18 rounded-2xl flex flex-col items-center justify-center transition-all ${
                      isAbby
                        ? 'bg-pink-100 border-3 border-pink-500 ring-4 ring-pink-300 scale-105 shadow-md'
                        : 'bg-white border-2 border-slate-300'
                    }`}
                  >
                    <span className="text-2xl">{isAbby ? '🐰' : '🧒'}</span>
                    <span className="text-[9px] font-black text-slate-700 mt-0.5">
                      {isAbby ? 'Abby' : `Bạn ${idx + 1}`}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-full">
                    #{fromBackPos}
                  </span>
                </div>
              );
            })
          )}
        </div>

        {/* Formula breakdown */}
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-amber-900 font-semibold">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              {mode === 'between'
                ? `Hàng có ${totalInQueue} bạn. ${personA.name} đứng thứ ${personA.pos} từ đầu, ${personB.name} đứng thứ ${personB.pos} từ cuối.`
                : `Tính từ đầu hàng là thứ ${fromFront}, tính từ cuối hàng là thứ ${fromBack}.`}
            </span>
          </div>
          <span className="bg-amber-200 text-amber-950 font-black px-3 py-1.5 rounded-xl text-xs sm:text-sm whitespace-nowrap">
            Công thức: {formula}
          </span>
        </div>
      </div>

      {/* Direct Input Answer Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-base">
          {promptTitle}
        </h4>
        <p className="text-xs text-slate-500">
          Bé hãy tự tính toán và nhập con số chính xác vào ô dưới đây (không đoán mò):
        </p>

        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setErrorMessage(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="Nhập số bạn..."
              className="w-40 px-4 py-3 rounded-2xl border-2 border-amber-300 text-xl font-black text-center text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-200 shadow-inner"
            />
            <span className="absolute right-3 top-3.5 text-xs font-bold text-slate-400 pointer-events-none">
              bạn
            </span>
          </div>

          <button
            type="button"
            onClick={handleCheck}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-white font-black text-sm shadow-md transition-all active:scale-95"
          >
            Kiểm tra
          </button>
        </div>

        {errorMessage && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 py-2 px-3 rounded-xl animate-shake">
            {errorMessage}
          </div>
        )}
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full">
          🎉 Rất chính xác! Theo công thức: {formula} = {correctTotal} bạn!
        </div>
      )}
    </div>
  );
};
