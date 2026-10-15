import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

interface CornerCrossProps {
  shape: 'L' | 'T';
  verticalCount: number;
  horizontalCount: number;
  intersectionPerson: string;
  options: string[];
  correctAnswer: string;
  onCompleted: () => void;
}

export const CornerCross: React.FC<CornerCrossProps> = ({
  shape,
  verticalCount,
  horizontalCount,
  intersectionPerson,
  options,
  correctAnswer,
  onCompleted
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSelect = (opt: string) => {
    sound.playClick();
    setSelectedOption(opt);
    if (opt === correctAnswer) {
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

  const formulaCalc = `${verticalCount} + ${horizontalCount} - 1 = ${verticalCount + horizontalCount - 1}`;

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Visual Canvas Representation */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-xl flex flex-col items-center">
        <div className="text-xs font-bold text-slate-500 uppercase mb-4">
          Hàng người đứng thành hình chữ {shape}
        </div>

        {/* Shape SVG Diagram */}
        <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 w-full flex items-center justify-center">
          {shape === 'L' ? (
            <div className="flex flex-col items-start space-y-1">
              {/* Vertical line top */}
              {Array.from({ length: verticalCount - 1 }).map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-sky-200 border-2 border-sky-400 flex items-center justify-center text-xs font-bold text-sky-800"
                >
                  {i + 1}
                </div>
              ))}

              {/* Corner row (Intersection + Horizontal) */}
              <div className="flex items-center space-x-1">
                {/* Intersection Casey */}
                <div
                  className="w-10 h-10 rounded-2xl bg-amber-300 border-3 border-amber-600 ring-4 ring-amber-300 flex items-center justify-center text-xl shadow-md"
                  title={`Điểm giao: ${intersectionPerson}`}
                >
                  🐹
                </div>

                {/* Horizontal line */}
                {Array.from({ length: horizontalCount - 1 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-800"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* T shape */
            <div className="flex flex-col items-center space-y-1">
              {/* Top Horizontal bar */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.floor((horizontalCount - 1) / 2) }).map((_, i) => (
                  <div
                    key={`left-${i}`}
                    className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-800"
                  >
                    {i + 1}
                  </div>
                ))}

                {/* Intersection Abby */}
                <div
                  className="w-10 h-10 rounded-2xl bg-pink-200 border-3 border-pink-600 ring-4 ring-pink-300 flex items-center justify-center text-xl shadow-md"
                  title={`Điểm giao: ${intersectionPerson}`}
                >
                  🐰
                </div>

                {Array.from({ length: Math.ceil((horizontalCount - 1) / 2) }).map((_, i) => (
                  <div
                    key={`right-${i}`}
                    className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-800"
                  >
                    {i + 4}
                  </div>
                ))}
              </div>

              {/* Vertical trunk under intersection */}
              {Array.from({ length: verticalCount - 1 }).map((_, i) => (
                <div
                  key={`trunk-${i}`}
                  className="w-8 h-8 rounded-full bg-sky-200 border-2 border-sky-400 flex items-center justify-center text-xs font-bold text-sky-800"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" />
            Hàng dọc ({verticalCount} bạn)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            Hàng ngang ({horizontalCount} bạn)
          </span>
          <span className="flex items-center gap-1.5 text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full">
            ★ Điểm giao: Bạn {intersectionPerson}
          </span>
        </div>
      </div>

      {/* Question Choices */}
      <div className="space-y-3 text-center">
        <h4 className="font-bold text-slate-800 text-base">
          Hỏi có tất cả bao nhiêu bạn đang đứng trong hàng?
        </h4>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {options.map((opt) => {
            const isSelected = selectedOption === opt;
            const isCorrect = opt === correctAnswer;

            let btnStyle = 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300';
            if (isSelected) {
              btnStyle = isCorrect
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                : 'bg-rose-500 text-white border-rose-600 font-bold';
            }

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`px-6 py-3 rounded-2xl text-base md:text-lg font-bold border-2 transition-all active:scale-95 ${btnStyle}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Quá giỏi! Vì bạn {intersectionPerson} ở điểm giao được tính 2 lần, ta lấy: {formulaCalc} bạn!
        </div>
      )}
    </div>
  );
};
