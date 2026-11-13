import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';

interface CornerCrossProps {
  shape: 'L' | 'T' | '+';
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
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const targetNum = Number(correctAnswer.replace(/\D/g, ''));
  const isHollowRect = targetNum === (verticalCount + horizontalCount) * 2 - 4;

  const handleCheck = (overrideVal?: string) => {
    sound.playClick();
    const rawVal = overrideVal !== undefined ? overrideVal : inputValue;
    const cleanInput = rawVal.trim().toLowerCase();
    const cleanTarget = correctAnswer.trim().toLowerCase();
    if (!cleanInput) return;

    const inputDigits = cleanInput.replace(/\D/g, '');
    const targetDigits = cleanTarget.replace(/\D/g, '');

    const isMatch =
      (inputDigits && targetDigits && inputDigits === targetDigits) ||
      cleanInput === cleanTarget;

    if (isMatch) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage(
        isHollowRect
          ? `Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Khung hình chữ nhật có 4 cạnh, nhưng 4 bạn ở 4 góc đều thuộc cả 2 cạnh kề nhau nên bị đếm trùng 2 lần. Em nhớ trừ đi 4 góc nhé!`
          : `Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Bạn ${intersectionPerson} đang đứng ở vị trí giao nhau của hai hàng. Vị trí này được tính bao nhiêu lần khi em đếm từng hàng riêng biệt?`
      );
    }
  };

  const formulaCalc = isHollowRect
    ? `(${verticalCount} + ${horizontalCount}) × 2 - 4 = ${targetNum}`
    : `${verticalCount} + ${horizontalCount} - 1 = ${verticalCount + horizontalCount - 1}`;

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Visual Canvas Representation */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-xl flex flex-col items-center">
        <div className="text-xs font-bold text-slate-500 uppercase mb-4">
          {isHollowRect
            ? `Đội hình khung chữ nhật (${verticalCount} × ${horizontalCount})`
            : `Hàng người đứng thành hình chữ ${shape === '+' ? 'thập (+)' : shape}`}
        </div>

        {/* Shape Diagram */}
        <div className="relative p-6 bg-slate-50 rounded-2xl border border-slate-200 w-full flex items-center justify-center overflow-x-auto">
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
                <div
                  className="w-10 h-10 rounded-2xl bg-amber-300 border-3 border-amber-600 ring-4 ring-amber-300 flex items-center justify-center text-xl shadow-md"
                  title={`Điểm giao: ${intersectionPerson}`}
                >
                  🐹
                </div>

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
          ) : shape === 'T' ? (
            <div className="flex flex-col items-center space-y-1">
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.floor((horizontalCount - 1) / 2) }).map((_, i) => (
                  <div
                    key={`left-${i}`}
                    className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-800"
                  >
                    {i + 1}
                  </div>
                ))}

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
                    {i + 1}
                  </div>
                ))}
              </div>

              {Array.from({ length: verticalCount - 1 }).map((_, i) => (
                <div
                  key={`trunk-${i}`}
                  className="w-8 h-8 rounded-full bg-sky-200 border-2 border-sky-400 flex items-center justify-center text-xs font-bold text-sky-800"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-1">
              {Array.from({ length: Math.floor((verticalCount - 1) / 2) }).map((_, i) => (
                <div
                  key={`vtop-${i}`}
                  className="w-8 h-8 rounded-full bg-sky-200 border-2 border-sky-400 flex items-center justify-center text-xs font-bold text-sky-800"
                >
                  {i + 1}
                </div>
              ))}

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.floor((horizontalCount - 1) / 2) }).map((_, i) => (
                  <div
                    key={`hleft-${i}`}
                    className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-800"
                  >
                    {i + 1}
                  </div>
                ))}

                <div
                  className="w-10 h-10 rounded-2xl bg-amber-300 border-3 border-amber-600 ring-4 ring-amber-300 flex items-center justify-center text-xl shadow-md"
                  title={`Điểm giao: ${intersectionPerson}`}
                >
                  🐵
                </div>

                {Array.from({ length: Math.ceil((horizontalCount - 1) / 2) }).map((_, i) => (
                  <div
                    key={`hright-${i}`}
                    className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-400 flex items-center justify-center text-xs font-bold text-emerald-800"
                  >
                    {i + 1}
                  </div>
                ))}
              </div>

              {Array.from({ length: Math.ceil((verticalCount - 1) / 2) }).map((_, i) => (
                <div
                  key={`vbot-${i}`}
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
            ★ Điểm giao: {intersectionPerson}
          </span>
        </div>
      </div>

      {/* Direct Input Answer Form */}
      <div className="w-full max-w-md bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-base">
          Hỏi có tất cả bao nhiêu bạn đang đứng trong đội hình?
        </h4>

        <p className="text-xs text-slate-500">
          Tự tính toán và nhập đáp án vào ô trống bên dưới:
        </p>

        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              disabled={isSuccess}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setErrorMessage(null);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
              placeholder="Nhập số..."
              className="w-40 pl-4 pr-11 py-3 rounded-2xl border-2 border-amber-300 text-xl font-black text-center text-slate-800 focus:outline-none focus:ring-4 focus:ring-amber-200 shadow-inner"
            />
            <span className="absolute right-3 top-3.5 text-xs font-bold text-slate-400 pointer-events-none">
              bạn
            </span>
          </div>

          <button
            type="button"
            disabled={isSuccess}
            onClick={() => handleCheck()}
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
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Quá giỏi! Trừ đi các vị trí góc giao nhau bị đếm trùng, ta có: {formulaCalc} bạn!
        </div>
      )}
    </div>
  );
};
