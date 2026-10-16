import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
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
  const [selectedTotal, setSelectedTotal] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalSlots = mode === 'between' ? totalInQueue : correctTotal;
  const abbyIndex = fromFront - 1;

  const handleSelectOption = (num: number) => {
    sound.playClick();
    setSelectedTotal(num);
    if (num === correctTotal) {
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

      {/* Question Choices */}
      <div className="space-y-3 text-center">
        <h4 className="font-bold text-slate-800 text-sm md:text-base">
          {promptTitle}
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {options.map((opt) => {
            const isSelected = selectedTotal === opt;
            const isCorrect = opt === correctTotal;

            let btnStyle = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300';
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                : 'bg-rose-500 text-white border-rose-600 font-bold';
            }

            return (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectOption(opt)}
                className={`px-5 py-2.5 rounded-2xl text-base font-bold border-2 transition-all active:scale-95 ${btnStyle}`}
              >
                {opt} bạn
              </button>
            );
          })}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow w-full">
          🎉 Rất chính xác! Theo công thức: {formula} = {correctTotal} bạn!
        </div>
      )}
    </div>
  );
};
