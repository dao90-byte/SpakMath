import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, RotateCcw, ShieldCheck } from 'lucide-react';

interface CattleFenceProps {
  onCompleted: () => void;
}

export const CattleFenceViewer: React.FC<CattleFenceProps> = ({ onCompleted }) => {
  // 6x6 grid where cells contain: 'cow' 🐮, 'cactus' 🌵, or 'empty'
  // and user toggles fenced status on each cow to enclose them safely!
  const initialGrid = [
    ['cow', 'cactus', 'empty', 'empty', 'cow', 'empty'],
    ['empty', 'cactus', 'cow', 'empty', 'cactus', 'cow'],
    ['cow', 'cactus', 'empty', 'empty', 'empty', 'cactus'],
    ['cactus', 'empty', 'cow', 'empty', 'cactus', 'empty'],
    ['empty', 'empty', 'empty', 'cactus', 'cow', 'cactus'],
    ['cow', 'empty', 'cactus', 'empty', 'empty', 'cow']
  ];

  // User selects which cow cells are safely fenced
  const [fencedCells, setFencedCells] = useState<Record<string, boolean>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const totalCows = initialGrid.flat().filter((c) => c === 'cow').length;

  const handleToggleFence = (r: number, c: number) => {
    sound.playClick();
    setStatusMessage(null);
    const key = `${r}-${c}`;
    const next = { ...fencedCells, [key]: !fencedCells[key] };
    setFencedCells(next);

    // Auto-check on toggle
    let safeCows = 0;
    let hitCactus = false;
    let extraFences = 0;

    Object.entries(next).forEach(([k, isFenced]) => {
      if (!isFenced) return;
      const [row, col] = k.split('-').map(Number);
      if (initialGrid[row][col] === 'cow') safeCows++;
      else if (initialGrid[row][col] === 'cactus') hitCactus = true;
      else extraFences++;
    });

    if (safeCows === totalCows && !hitCactus && extraFences === 0) {
      sound.playVictory();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 600);
    }
  };

  const handleCheckFence = () => {
    let safeCows = 0;
    let hitCactus = false;
    let extraFences = 0;

    Object.entries(fencedCells).forEach(([k, isFenced]) => {
      if (!isFenced) return;
      const [row, col] = k.split('-').map(Number);
      if (initialGrid[row][col] === 'cow') safeCows++;
      else if (initialGrid[row][col] === 'cactus') hitCactus = true;
      else extraFences++;
    });

    if (safeCows === totalCows && !hitCactus && extraFences === 0) {
      sound.playVictory();
      setIsSuccess(true);
      setStatusMessage(null);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 600);
    } else {
      sound.playWrong();
      if (hitCactus) {
        setStatusMessage('Ôi không! Hàng rào chạm vào cây xương rồng gai nhọn rồi. Hãy gỡ rào ở cây xương rồng nhé!');
      } else if (safeCows < totalCows) {
        setStatusMessage(`Bé mới rào được ${safeCows}/${totalCows} chú bò thôi. Hãy tiếp tục tìm và bảo vệ các chú bò còn lại nhé!`);
      } else if (extraFences > 0) {
        setStatusMessage('Bé chú ý chỉ dựng rào bảo vệ các chú bò, không rào vào các ô cỏ trống nhé!');
      }
    }
  };

  const handleReset = () => {
    sound.playClick();
    setFencedCells({});
    setIsSuccess(false);
    setStatusMessage(null);
  };

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Rules Notice */}
      <div className="bg-emerald-100/90 border-2 border-emerald-300 rounded-2xl p-4 text-center max-w-lg w-full">
        <p className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
          Hàng rào bảo vệ đàn bò (Trang 77 & 87)
        </p>
        <p className="text-sm md:text-base font-black text-emerald-950 mt-1">
          Dựng hàng rào khép kín bao quanh tất cả chú bò 🐮, không chứa cây xương rồng 🌵 nào!
        </p>
        <p className="text-xs text-emerald-700 mt-1 font-semibold">
          Chạm vào các chú bò để dựng hàng rào bảo vệ. Tránh xa các cây xương rồng!
        </p>
      </div>

      {/* Grid */}
      <div className="bg-amber-50 p-4 md:p-6 rounded-3xl border-4 border-amber-600 shadow-xl inline-block">
        <div className="grid grid-cols-6 gap-2">
          {initialGrid.map((row, r) =>
            row.map((cell, c) => {
              const key = `${r}-${c}`;
              const isFenced = !!fencedCells[key];

              let icon = '';
              if (cell === 'cow') icon = '🐮';
              else if (cell === 'cactus') icon = '🌵';

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleToggleFence(r, c)}
                  className={`w-11 h-11 sm:w-13 sm:h-13 md:w-15 md:h-15 rounded-2xl flex items-center justify-center text-2xl md:text-3xl transition-all border-2 ${
                    isFenced
                      ? 'bg-emerald-200 border-emerald-500 ring-4 ring-emerald-300 scale-105 shadow-md'
                      : cell === 'cactus'
                      ? 'bg-rose-50 border-rose-200 opacity-90'
                      : cell === 'cow'
                      ? 'bg-amber-100/80 border-amber-300 hover:bg-amber-200 hover:scale-105'
                      : 'bg-white/70 border-slate-200'
                  }`}
                >
                  {icon}
                  {isFenced && (
                    <span className="absolute -top-1.5 -right-1.5 text-xs bg-emerald-600 text-white rounded-full p-0.5">
                      🛡️
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm border border-slate-300"
        >
          <RotateCcw className="w-4 h-4" />
          Dựng lại từ đầu
        </button>

        <button
          onClick={handleCheckFence}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <ShieldCheck className="w-5 h-5" />
          Kiểm Tra Hàng Rào
        </button>
      </div>

      {statusMessage && (
        <div className="p-3.5 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-900 text-xs md:text-sm font-bold text-center max-w-lg w-full">
          {statusMessage}
        </div>
      )}

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow max-w-lg w-full">
          🎉 Tuyệt vời! Tất cả {totalCows} chú bò đã được bảo vệ an toàn trong hàng rào, không chạm phải cây xương rồng nào!
        </div>
      )}
    </div>
  );
};
