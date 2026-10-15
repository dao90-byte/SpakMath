import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, ArrowRight } from 'lucide-react';

interface OrderItem {
  id: string;
  label: string;
  description?: string;
  icon?: string;
}

interface ItemOrderingProps {
  promptText: string;
  items: OrderItem[];
  correctOrder: string[]; // e.g. ['D', 'B', 'C', 'A']
  directionLabel?: string; // e.g. "Từ Dài Nhất ➔ Ngắn Nhất"
  onCompleted: () => void;
}

export const ItemOrdering: React.FC<ItemOrderingProps> = ({
  promptText,
  items,
  correctOrder,
  directionLabel = 'Sắp xếp theo thứ tự',
  onCompleted
}) => {
  // Slots holding item IDs
  const [slots, setSlots] = useState<(string | null)[]>(
    Array.from({ length: correctOrder.length }, () => null)
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const availableItems = items.filter((it) => !slots.includes(it.id));

  const handlePlaceItem = (itemId: string) => {
    sound.playClick();
    const firstEmpty = slots.findIndex((s) => s === null);
    if (firstEmpty !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmpty] = itemId;
      setSlots(newSlots);

      if (newSlots.every((s) => s !== null)) {
        checkOrder(newSlots as string[]);
      }
    }
  };

  const handleRemoveFromSlot = (slotIdx: number) => {
    sound.playClick();
    const newSlots = [...slots];
    newSlots[slotIdx] = null;
    setSlots(newSlots);
  };

  const handleReset = () => {
    sound.playWrong();
    setSlots(Array.from({ length: correctOrder.length }, () => null));
    setIsSuccess(false);
  };

  const checkOrder = (currentSlots = slots) => {
    const isMatched = correctOrder.every((id, idx) => currentSlots[idx] === id);
    if (isMatched) {
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

  const getItem = (id: string | null) => items.find((it) => it.id === id);

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Direction Banner */}
      <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl px-6 py-3 text-center max-w-lg w-full">
        <span className="text-xs uppercase font-extrabold text-amber-800 tracking-wider block">
          Hướng sắp xếp
        </span>
        <span className="text-base md:text-lg font-black text-amber-950 flex items-center justify-center gap-2 mt-0.5">
          {directionLabel}
        </span>
      </div>

      {/* Target Slots */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md w-full max-w-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
          {slots.map((placedId, idx) => {
            const item = getItem(placedId);

            return (
              <div key={idx} className="flex flex-col items-center space-y-2">
                <span className="text-xs font-bold text-slate-400">
                  Vị trí {idx + 1}
                </span>

                <div
                  onClick={() => placedId && handleRemoveFromSlot(idx)}
                  className={`w-full aspect-square rounded-2xl border-3 flex flex-col items-center justify-center p-2 transition-all cursor-pointer ${
                    placedId
                      ? 'bg-amber-50 border-amber-400 shadow-md scale-102 hover:border-rose-400 hover:bg-rose-50'
                      : 'bg-slate-50 border-dashed border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  {placedId && item ? (
                    <>
                      <span className="text-3xl">{item.icon || '🏷️'}</span>
                      <span className="text-sm font-black text-slate-800 mt-1">
                        {item.label}
                      </span>
                      <span className="text-[10px] text-slate-400">Chạm để bỏ</span>
                    </>
                  ) : (
                    <span className="text-xs font-bold text-slate-300">Ô trống</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Items to Pick */}
      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 w-full max-w-2xl space-y-3">
        <div className="text-xs font-bold text-slate-500 text-center">
          Chạm vào từng mục dưới đây để xếp vào ô trống tiếp theo:
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {items.map((it) => {
            const isUsed = slots.includes(it.id);

            return (
              <button
                key={it.id}
                type="button"
                disabled={isUsed}
                onClick={() => handlePlaceItem(it.id)}
                className={`px-4 py-3 rounded-2xl border-2 flex items-center gap-2 font-bold text-sm md:text-base transition-all active:scale-95 ${
                  isUsed
                    ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed opacity-50'
                    : 'bg-white hover:bg-amber-100 border-amber-300 text-slate-800 shadow-sm hover:scale-105'
                }`}
              >
                <span>{it.icon || '🏷️'}</span>
                <span>{it.label}</span>
                {it.description && (
                  <span className="text-xs text-slate-500 font-normal">
                    ({it.description})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Sắp xếp lại
        </button>
        <button
          onClick={() => {
            if (slots.every((s) => s !== null)) {
              checkOrder(slots as string[]);
            } else {
              sound.playWrong();
            }
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Thứ Tự
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Rất chính xác! Bạn đã suy luận và sắp xếp đúng thứ tự {correctOrder.join(' ➔ ')}!
        </div>
      )}
    </div>
  );
};
