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
  const [slot1, setSlot1] = useState<string | null>(null);
  const [slot2, setSlot2] = useState<string | null>(null);
  const [activeSlot, setActiveSlot] = useState<1 | 2 | null>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePickChoice = (choice: string) => {
    sound.playClick();
    if (activeSlot === 1) {
      setSlot1(choice);
      setActiveSlot(2);
    } else if (activeSlot === 2) {
      setSlot2(choice);
      setActiveSlot(null);
    }
  };

  const checkAnswers = () => {
    // Slot 1 must be 'Khỉ con' (🐵), Slot 2 must be 'Chú gấu' (🐻)
    const isSlot1Correct = slot1?.includes('Khỉ');
    const isSlot2Correct = slot2?.includes('gấu');

    if (isSlot1Correct && isSlot2Correct) {
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

  const handleReset = () => {
    sound.playClick();
    setSlot1(null);
    setSlot2(null);
    setActiveSlot(1);
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
              const isSelected = activeSlot === 1;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setActiveSlot(1); sound.playClick(); }}
                  className={`w-14 h-18 rounded-2xl border-3 flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-300 scale-110 shadow-lg'
                      : slot1
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-100/50'
                  }`}
                >
                  <span className="text-3xl">{slot1 ? slot1.split(' ')[0] : '❓'}</span>
                  <span className="text-[10px] font-black text-amber-800 mt-1">Hộp 1</span>
                </button>
              );
            }

            if (item.id === 11) {
              const isSelected = activeSlot === 2;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => { setActiveSlot(2); sound.playClick(); }}
                  className={`w-14 h-18 rounded-2xl border-3 flex flex-col items-center justify-center transition-all ${
                    isSelected
                      ? 'border-amber-500 bg-amber-100 ring-4 ring-amber-300 scale-110 shadow-lg'
                      : slot2
                      ? 'border-emerald-400 bg-emerald-50'
                      : 'border-dashed border-amber-400 bg-amber-50/50 hover:bg-amber-100/50'
                  }`}
                >
                  <span className="text-3xl">{slot2 ? slot2.split(' ')[0] : '❓'}</span>
                  <span className="text-[10px] font-black text-amber-800 mt-1">Hộp 2</span>
                </button>
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

      {/* Choice picker */}
      <div className="bg-slate-50 p-5 rounded-3xl border-2 border-slate-200 flex flex-col items-center space-y-3">
        <span className="text-xs font-bold text-slate-600">
          Đang chọn cho: <span className="text-amber-700 font-extrabold">{activeSlot ? `Hộp bí mật ${activeSlot}` : 'Cả 2 hộp đã chọn'}</span>
        </span>

        <div className="flex flex-wrap gap-3 justify-center">
          {choices.map((c) => (
            <button
              key={c}
              onClick={() => handlePickChoice(c)}
              className="px-5 py-3 rounded-2xl bg-white hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-300 text-sm md:text-base font-bold text-slate-800 shadow-sm transition-transform active:scale-95"
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Chọn lại
        </button>
        <button
          onClick={checkAnswers}
          disabled={!slot1 || !slot2}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Quy Luật
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Chính xác! Hộp 1 là Khỉ con 🐵 và Hộp 2 là Chú gấu 🐻!
        </div>
      )}
    </div>
  );
};
