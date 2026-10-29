import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw } from 'lucide-react';

interface AnimalItem {
  id: number;
  name: string;
  icon: string;
  isMissing?: boolean;
  answer?: string;
}

interface PatternAnimalsProps {
  sequence: AnimalItem[];
  choices: string[];
  target1: string;
  target2: string;
  onCompleted: () => void;
}

export const PatternAnimals: React.FC<PatternAnimalsProps> = ({
  sequence,
  choices,
  onCompleted
}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const checkAnswers = () => {
    sound.playClick();
    const clean1 = input1.trim().toLowerCase();
    const clean2 = input2.trim().toLowerCase();

    // Slot 1 (#8) must be 'Khỉ' (🐵), Slot 2 (#11) must be 'gấu' (🐻)
    const isSlot1Correct = clean1.includes('khỉ') || clean1.includes('🐵') || clean1 === 'khi';
    const isSlot2Correct = clean2.includes('gấu') || clean2.includes('gau') || clean2.includes('🐻');

    if (isSlot1Correct && isSlot2Correct) {
      sound.playCorrect();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        sound.playVictory();
        onCompleted();
      }, 500);
    } else {
      sound.playWrong();
      setErrorMessage('Chưa chính xác rồi em ơi! 🤔 Gợi mở tư duy: Chuỗi quy luật lặp lại gồm bao nhiêu con vật theo thứ tự nào? Khi đếm đến vị trí số 8 và số 11, con vật nào sẽ xuất hiện?');
    }
  };

  const handleReset = () => {
    sound.playClick();
    setInput1('');
    setInput2('');
    setErrorMessage(null);
    setIsSuccess(false);
  };

  return (
    <div className="space-y-6">
      {/* Rule helper card */}
      <div className="bg-amber-100/80 border-2 border-amber-300 rounded-2xl p-4 text-center">
        <p className="text-xs font-bold text-amber-800 uppercase tracking-wide">Quy luật chuỗi 4 con vật lặp lại</p>
        <p className="text-base md:text-lg font-black text-amber-950 mt-1">
          🐥 Vịt con ➔ 🐸 Chú ếch ➔ 🐻 Chú gấu ➔ 🐵 Khỉ con
        </p>
      </div>

      {/* Animal Parade Train */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md overflow-x-auto">
        <div className="flex items-center gap-3 min-w-[700px] justify-between">
          {sequence.map((item) => {
            if (item.id === 8) {
              return (
                <div
                  key={item.id}
                  className={`w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all ${
                    isSuccess
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-dashed border-amber-400 bg-amber-50/50'
                  }`}
                >
                  <span className="text-3xl">{isSuccess ? '🐵' : '❓'}</span>
                  <span className="text-[10px] font-black text-amber-800 mt-1">Hộp 1 (#8)</span>
                </div>
              );
            }

            if (item.id === 11) {
              return (
                <div
                  key={item.id}
                  className={`w-16 h-20 rounded-2xl border-2 flex flex-col items-center justify-center p-1 transition-all ${
                    isSuccess
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-dashed border-amber-400 bg-amber-50/50'
                  }`}
                >
                  <span className="text-3xl">{isSuccess ? '🐻' : '❓'}</span>
                  <span className="text-[10px] font-black text-amber-800 mt-1">Hộp 2 (#11)</span>
                </div>
              );
            }

            return (
              <div
                key={item.id}
                className="w-14 h-18 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col items-center justify-center"
              >
                <span className="text-3xl">{item.icon}</span>
                <span className="text-[10px] font-semibold text-slate-500 mt-1">#{item.id}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Direct Typed Answer Form */}
      <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm max-w-lg mx-auto space-y-4 text-center">
        <h4 className="font-black text-slate-800 text-sm md:text-base">
          Tự tay nhập tên con vật cho Hộp 1 (#8) và Hộp 2 (#11):
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Hộp bí mật 1 (Vị trí #8):</label>
            <input
              type="text"
              value={input1}
              disabled={isSuccess}
              onChange={(e) => {
                setInput1(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="VD: Khỉ con..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 font-bold text-sm text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-600">Hộp bí mật 2 (Vị trí #11):</label>
            <input
              type="text"
              value={input2}
              disabled={isSuccess}
              onChange={(e) => {
                setInput2(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="VD: Chú gấu..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-amber-300 font-bold text-sm text-slate-800 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </div>
        </div>

        {errorMessage && (
          <div className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 py-2.5 px-3 rounded-xl animate-shake text-left">
            {errorMessage}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs border border-slate-300"
          >
            <RotateCcw className="w-4 h-4" />
            Nhập lại
          </button>
          <button
            type="button"
            onClick={checkAnswers}
            disabled={isSuccess || !input1.trim() || !input2.trim()}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white font-black text-sm shadow-md transition-transform active:scale-95"
          >
            <Check className="w-4 h-4" />
            {isSuccess ? 'Đúng ✓' : 'Kiểm tra quy luật'}
          </button>
        </div>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow max-w-lg mx-auto">
          🎉 Chính xác! Hộp 1 là Khỉ con 🐵 và Hộp 2 là Chú gấu 🐻!
        </div>
      )}
    </div>
  );
};
