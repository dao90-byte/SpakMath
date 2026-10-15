import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Compass, RotateCcw, Sparkles, Trophy } from 'lucide-react';

interface CircularMazeProps {
  onCompleted: () => void;
}

export const CircularMazeViewer: React.FC<CircularMazeProps> = ({ onCompleted }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  // Waypoints through the concentric labyrinth rings
  const totalSteps = 8;

  const handleStepForward = () => {
    sound.playClick();
    const next = currentStep + 1;
    setCurrentStep(next);
    sound.playCountTick(next);

    if (next >= totalSteps) {
      sound.playVictory();
      setIsSuccess(true);
      setTimeout(() => {
        sound.playStarCollect();
        onCompleted();
      }, 500);
    }
  };

  const handleReset = () => {
    sound.playWrong();
    setCurrentStep(0);
    setIsSuccess(false);
  };

  // Node coordinates along circular maze path from outer entrance (top-left) to inner center
  const pathNodes = [
    { x: 50, y: 50 },   // Outer entrance (Red arrow)
    { x: 90, y: 70 },
    { x: 140, y: 80 },
    { x: 190, y: 110 },
    { x: 170, y: 160 },
    { x: 130, y: 170 },
    { x: 110, y: 140 },
    { x: 100, y: 100 },  // Inner center (Green flag/gem)
  ];

  return (
    <div className="space-y-6 flex flex-col items-center">
      {/* Rules Notice */}
      <div className="bg-sky-100/90 border-2 border-sky-300 rounded-2xl p-4 text-center max-w-lg w-full">
        <p className="text-xs font-bold text-sky-800 uppercase tracking-wide">
          Thử thách mê cung tròn xoắn ốc (Trang 74)
        </p>
        <p className="text-sm md:text-base font-black text-sky-950 mt-1">
          Tìm đường nối giữa 2 mũi tên sao cho tạo thành 1 đường đi liền mạch!
        </p>
        <p className="text-xs text-sky-700 mt-1 font-semibold">
          Lưu ý: Không được vượt qua các vạch phân cách nhé!
        </p>
      </div>

      {/* SVG Circular Labyrinth */}
      <div className="relative bg-white p-6 rounded-3xl border-4 border-slate-700 shadow-xl inline-block">
        <svg viewBox="0 0 200 200" className="w-64 h-64 sm:w-80 sm:h-80 select-none">
          {/* Concentric maze circles with gaps matching page 74 */}
          <circle cx="100" cy="100" r="90" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="120 15 80 15 150 20" />
          <circle cx="100" cy="100" r="75" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="90 15 110 20 80 15" />
          <circle cx="100" cy="100" r="60" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="60 15 90 15 70 15" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="50 15 70 15 50 15" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="#334155" strokeWidth="2.5" strokeDasharray="40 15 45 15" />
          <circle cx="100" cy="100" r="15" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />

          {/* Radial partition walls */}
          <line x1="100" y1="10" x2="100" y2="40" stroke="#334155" strokeWidth="2.5" />
          <line x1="10" y1="100" x2="40" y2="100" stroke="#334155" strokeWidth="2.5" />
          <line x1="160" y1="100" x2="190" y2="100" stroke="#334155" strokeWidth="2.5" />
          <line x1="100" y1="160" x2="100" y2="190" stroke="#334155" strokeWidth="2.5" />
          <line x1="35" y1="35" x2="55" y2="55" stroke="#334155" strokeWidth="2.5" />
          <line x1="145" y1="145" x2="165" y2="165" stroke="#334155" strokeWidth="2.5" />
          <line x1="145" y1="55" x2="165" y2="35" stroke="#334155" strokeWidth="2.5" />
          <line x1="35" y1="165" x2="55" y2="145" stroke="#334155" strokeWidth="2.5" />

          {/* Solution path trace (red line) drawn up to currentStep */}
          {currentStep > 0 && (
            <polyline
              points={pathNodes
                .slice(0, currentStep + 1)
                .map((n) => `${n.x},${n.y}`)
                .join(' ')}
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-all duration-300"
            />
          )}

          {/* Entrance arrow marker (Red) */}
          <text x="32" y="48" fontSize="16" fill="#ef4444" className="font-bold">
            🏹
          </text>

          {/* Center Goal (Green Flag / Star) */}
          <text x="92" y="106" fontSize="14" fill="#16a34a" className="font-bold">
            ⛳
          </text>

          {/* Active explorer token */}
          {currentStep < totalSteps ? (
            <circle
              cx={pathNodes[currentStep].x}
              cy={pathNodes[currentStep].y}
              r="6"
              fill="#fbbf24"
              stroke="#b45309"
              strokeWidth="2"
              className="animate-pulse"
            />
          ) : (
            <text x="88" y="106" fontSize="20">
              🏆
            </text>
          )}
        </svg>

        {/* Progress indicator */}
        <div className="text-center mt-3 text-xs font-bold text-slate-500">
          Tiến trình: {currentStep} / {totalSteps} trạm
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm border border-slate-300 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Đi lại từ đầu
        </button>

        <button
          type="button"
          onClick={handleStepForward}
          disabled={currentStep >= totalSteps}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white font-black text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Compass className="w-5 h-5" />
          {currentStep >= totalSteps ? 'Đã tới đích!' : 'Bước tiếp theo vào tâm'}
        </button>
      </div>

      {isSuccess && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Xuất sắc! Bé đã vượt qua toàn bộ các vòng xoắn ốc của mê cung tròn kỳ diệu!
        </div>
      )}
    </div>
  );
};
