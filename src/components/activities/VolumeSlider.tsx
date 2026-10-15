import React, { useState } from 'react';
import { sound } from '../../utils/soundEffects';
import { Check, Droplets } from 'lucide-react';

interface BottleData {
  id: string;
  name: string;
  initial: number;
  capacity: number;
}

interface VolumeSliderProps {
  bottles: BottleData[];
  targetCondition: 'A_GREATER_THAN_B';
  onCompleted: () => void;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  bottles,
  targetCondition,
  onCompleted
}) => {
  const [levelA, setLevelA] = useState(bottles[0]?.initial || 80);
  const [levelB, setLevelB] = useState(bottles[1]?.initial || 30);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSliderChangeA = (val: number) => {
    sound.playWaterPour();
    setLevelA(val);
  };

  const handleSliderChangeB = (val: number) => {
    sound.playWaterPour();
    setLevelB(val);
  };

  const checkResult = () => {
    let passed = false;
    if (targetCondition === 'A_GREATER_THAN_B') {
      passed = levelA > levelB;
    }

    if (passed) {
      sound.playCorrect();
      setIsCompleted(true);
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
      {/* Target prompt badge */}
      <div className="bg-sky-100 border-2 border-sky-300 rounded-2xl p-4 text-center">
        <span className="text-sky-900 font-bold text-sm md:text-base flex items-center justify-center gap-2">
          <Droplets className="w-5 h-5 text-sky-600" />
          Yêu cầu: Điều chỉnh sao cho Thể tích Chai A <span className="underline decoration-sky-500 font-extrabold">LỚN HƠN</span> Chai B!
        </span>
      </div>

      {/* Bottles Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 md:p-8 rounded-3xl border-2 border-slate-100 shadow-md">
        {/* Bottle A */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="font-bold text-lg text-slate-800">Chai Nước A</h3>
          
          {/* Bottle Graphic */}
          <div className="w-32 h-64 border-4 border-sky-600 rounded-b-3xl rounded-t-lg bg-sky-50/40 relative overflow-hidden shadow-inner flex flex-col justify-end">
            {/* Bottle cap */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-sky-700 rounded-t-md border border-sky-800 z-10" />

            {/* Liquid */}
            <div
              style={{ height: `${levelA}%` }}
              className="w-full bg-gradient-to-t from-sky-600 via-sky-400 to-sky-300 transition-all duration-300 relative flex items-center justify-center"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-sky-200/70 rounded-full" />
              <span className="text-white font-extrabold text-sm drop-shadow-sm">
                {levelA}%
              </span>
            </div>
          </div>

          {/* Slider control */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Hết nước (0%)</span>
              <span>Đầy chai (100%)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={levelA}
              onChange={(e) => handleSliderChangeA(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
            />
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleSliderChangeA(25)}
                className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                1/4 bình
              </button>
              <button
                type="button"
                onClick={() => handleSliderChangeA(50)}
                className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Nửa bình
              </button>
              <button
                type="button"
                onClick={() => handleSliderChangeA(100)}
                className="px-2 py-1 text-xs font-semibold bg-sky-100 text-sky-700 hover:bg-sky-200 rounded-lg font-bold"
              >
                Đầy bình
              </button>
            </div>
          </div>
        </div>

        {/* Bottle B */}
        <div className="flex flex-col items-center space-y-4">
          <h3 className="font-bold text-lg text-slate-800">Chai Nước B</h3>

          {/* Bottle Graphic */}
          <div className="w-32 h-64 border-4 border-indigo-600 rounded-b-3xl rounded-t-lg bg-indigo-50/40 relative overflow-hidden shadow-inner flex flex-col justify-end">
            {/* Bottle cap */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-6 bg-indigo-700 rounded-t-md border border-indigo-800 z-10" />

            {/* Liquid */}
            <div
              style={{ height: `${levelB}%` }}
              className="w-full bg-gradient-to-t from-indigo-600 via-indigo-400 to-indigo-300 transition-all duration-300 relative flex items-center justify-center"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-200/70 rounded-full" />
              <span className="text-white font-extrabold text-sm drop-shadow-sm">
                {levelB}%
              </span>
            </div>
          </div>

          {/* Slider control */}
          <div className="w-full max-w-xs space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Hết nước (0%)</span>
              <span>Đầy chai (100%)</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={levelB}
              onChange={(e) => handleSliderChangeB(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex gap-2 justify-center">
              <button
                type="button"
                onClick={() => handleSliderChangeB(25)}
                className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                1/4 bình
              </button>
              <button
                type="button"
                onClick={() => handleSliderChangeB(50)}
                className="px-2 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Nửa bình
              </button>
              <button
                type="button"
                onClick={() => handleSliderChangeB(100)}
                className="px-2 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 rounded-lg font-bold"
              >
                Đầy bình
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Statement & Submit Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-100 rounded-2xl">
        <div className="text-sm font-semibold text-slate-700">
          Hiện tại: <span className="font-bold text-sky-600">Chai A ({levelA}%)</span>{' '}
          {levelA > levelB ? 'lớn hơn (>)' : levelA < levelB ? 'nhỏ hơn (<)' : 'bằng (=)'}{' '}
          <span className="font-bold text-indigo-600">Chai B ({levelB}%)</span>
        </div>

        <button
          type="button"
          onClick={checkResult}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm md:text-base shadow-lg transition-transform active:scale-95"
        >
          <Check className="w-5 h-5" />
          Xác Nhận Thể Tích
        </button>
      </div>

      {isCompleted && (
        <div className="p-4 bg-emerald-100 border-2 border-emerald-400 rounded-2xl text-emerald-900 font-bold text-center animate-bounce-slow">
          🎉 Rất chính xác! Chai A có thể tích lớn hơn Chai B rồi!
        </div>
      )}
    </div>
  );
};
