import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, Info } from 'lucide-react';

interface QueueCounterProps {
  fromFront: number;
  fromBack: number;
  correctTotal: number;
  formula: string;
  onCompleted: () => void;
}

export const QueueCounter: React.FC<QueueCounterProps> = ({
  fromFront,
  fromBack,
  correctTotal,
  formula,
  onCompleted
}) => {
  const [selectedTotal, setSelectedTotal] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Character lineup array
  const totalSlots = correctTotal;
  const abbyIndex = fromFront - 1; // 0-indexed

  const options = [correctTotal - 1, correctTotal, correctTotal + 1, correctTotal + 2];

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
    <div className="space-y-6 flex flex-col items-center">
      {/* Visual queue diagram */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-2xl">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase px-2 mb-4">
          <span className="flex items-center gap-1 text-emerald-600">
            ⬅️ ĐẦU HÀNG (Phía trước)
          </span>
          <span className="flex items-center gap-1 text-purple-600">
            CUỐI HÀNG (Phía sau) ➡️
          </span>
        </div>

        {/* Queue Lineup */}
        <div className="flex items-center justify-center gap-2 md:gap-4 py-4 px-2 overflow-x-auto bg-slate-50/70 rounded-2xl border border-slate-200">
          {Array.from({ length: totalSlots }).map((_, idx) => {
            const isAbby = idx === abbyIndex;
            const fromFrontPos = idx + 1;
            const fromBackPos = totalSlots - idx;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                {/* Position from front indicator */}
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full">
                  #{fromFrontPos}
                </span>

                {/* Person avatar */}
                <div
                  className={`w-14 h-18 md:w-16 md:h-20 rounded-2xl flex flex-col items-center justify-center transition-all ${
                    isAbby
                      ? 'bg-pink-100 border-3 border-pink-500 ring-4 ring-pink-300 scale-110 shadow-lg'
                      : 'bg-white border-2 border-slate-300'
                  }`}
                >
                  <span className="text-3xl">{isAbby ? '🐰' : '🧒'}</span>
                  <span className="text-[10px] font-black text-slate-700 mt-1">
                    {isAbby ? 'Abby' : `Bạn ${idx + 1}`}
                  </span>
                </div>

                {/* Position from back indicator */}
                <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded-full">
                  #{fromBackPos}
                </span>
              </div>
            );
          })}
        </div>

        {/* Formula breakdown */}
        <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex items-center gap-2 text-amber-900 font-semibold">
            <Info className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Abby tính từ đầu là <span className="font-extrabold text-emerald-700">thứ {fromFront}</span>, tính từ cuối là <span className="font-extrabold text-purple-700">thứ {fromBack}</span>.
            </span>
          </div>
          <span className="bg-amber-200 text-amber-950 font-black px-3 py-1.5 rounded-xl text-sm">
            Công thức: {formula}
          </span>
        </div>
      </div>

      {/* Question Choices */}
      <div className="space-y-3 text-center">
        <h4 className="font-bold text-slate-800 text-base">
          Hỏi cả hàng có tất cả bao nhiêu bạn?
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
                onClick={() => handleSelectOption(opt)}
                className={`px-6 py-3 rounded-2xl text-base md:text-lg font-bold border-2 transition-all active:scale-95 ${btnStyle}`}
              >
                {opt} bạn
              </button>
            );
          })}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Chính xác! Vì bạn Abby bị đếm trùng 2 lần, ta lấy: {formula} = {correctTotal} bạn!
        </div>
      )}
    </div>
  );
};
