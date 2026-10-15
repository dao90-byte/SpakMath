import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Plus, Minus, Check, RefreshCw } from 'lucide-react';

interface CategoryConfig {
  id: string;
  label: string;
  targetSymbols: number;
  symbolColor: string;
}

interface PictographBuilderProps {
  categories: CategoryConfig[];
  multiplier: number;
  totalPeople: number;
  onCompleted: () => void;
}

export const PictographBuilder: React.FC<PictographBuilderProps> = ({
  categories,
  multiplier,
  totalPeople,
  onCompleted
}) => {
  const [counts, setCounts] = useState<Record<string, number>>({
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleAdd = (catId: string) => {
    sound.playClick();
    setCounts((prev) => ({
      ...prev,
      [catId]: Math.min(6, (prev[catId] || 0) + 1)
    }));
  };

  const handleRemove = (catId: string) => {
    sound.playClick();
    setCounts((prev) => ({
      ...prev,
      [catId]: Math.max(0, (prev[catId] || 0) - 1)
    }));
  };

  const handleReset = () => {
    sound.playWrong();
    setCounts({ spring: 0, summer: 0, autumn: 0, winter: 0 });
    setIsSuccess(false);
  };

  const currentTotalSymbols = Object.values(counts).reduce((a, b) => a + b, 0);
  const currentTotalPeople = currentTotalSymbols * multiplier;

  const handleCheck = () => {
    const isAllCorrect = categories.every(
      (cat) => counts[cat.id] === cat.targetSymbols
    );

    if (isAllCorrect) {
      sound.playCorrect();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 600);
    } else {
      sound.playWrong();
    }
  };

  return (
    <div className="space-y-6">
      {/* Target status bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-sky-700 font-bold uppercase tracking-wide">Quy đổi</p>
          <p className="text-lg font-black text-sky-900 mt-1">1 Ô 🟦 = 3 Người</p>
        </div>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-amber-700 font-bold uppercase tracking-wide">Tổng người khảo sát</p>
          <p className="text-lg font-black text-amber-900 mt-1">
            {currentTotalPeople} / {totalPeople} người
          </p>
        </div>
        <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-center">
          <p className="text-xs text-purple-700 font-bold uppercase tracking-wide">Số ô đã vẽ</p>
          <p className="text-lg font-black text-purple-900 mt-1">
            {currentTotalSymbols} / 8 ô
          </p>
        </div>
      </div>

      {/* Interactive Builder Grid */}
      <div className="bg-white rounded-3xl p-5 md:p-7 shadow-md border-2 border-slate-100 space-y-4">
        {categories.map((cat) => {
          const count = counts[cat.id] || 0;
          const isTargetReached = count === cat.targetSymbols;

          return (
            <div
              key={cat.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                isTargetReached
                  ? 'bg-emerald-50/50 border-emerald-300'
                  : 'bg-slate-50/70 border-slate-200'
              }`}
            >
              <div className="md:w-1/3">
                <span className="font-bold text-slate-800 text-base">{cat.label}</span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Đã xếp: <span className="font-bold text-slate-700">{count} ô</span> ({count * multiplier} người)
                </p>
              </div>

              {/* Symbol Slot Container */}
              <div className="flex-1 flex items-center gap-2 min-h-[48px] bg-white rounded-xl p-2 border border-slate-200">
                {count === 0 ? (
                  <span className="text-xs text-slate-400 italic px-2">Chưa có biểu tượng nào, bấm (+) để thêm</span>
                ) : (
                  Array.from({ length: count }).map((_, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-lg bg-sky-500 text-white font-bold flex items-center justify-center text-xs shadow-xs animate-in zoom-in-75 duration-150"
                    >
                      3
                    </div>
                  ))
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleRemove(cat.id)}
                  disabled={count === 0}
                  className="w-10 h-10 rounded-xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 flex items-center justify-center text-slate-700 font-bold transition-all active:scale-95"
                  title="Bớt 1 ô"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleAdd(cat.id)}
                  disabled={count >= 6}
                  className="w-10 h-10 rounded-xl bg-sky-500 hover:bg-sky-600 disabled:opacity-40 flex items-center justify-center text-white font-bold transition-all active:scale-95 shadow-xs"
                  title="Thêm 1 ô"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-100 font-semibold text-sm transition-colors border border-slate-200"
        >
          <RefreshCw className="w-4 h-4" />
          Vẽ lại từ đầu
        </button>
        <button
          type="button"
          onClick={handleCheck}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Kiểm Tra Kết Quả
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Xuất sắc! Bạn đã giúp Casey vẽ lại chính xác biểu đồ thời tiết 24 người rồi!
        </div>
      )}
    </div>
  );
};
