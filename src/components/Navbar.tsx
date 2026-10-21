import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import { Volume2, VolumeX, Pencil, Star, Award, Compass, BookOpen, BookMarked, Bug } from 'lucide-react';

interface NavbarProps {
  currentTab: 'map' | 'lessons' | 'assessment';
  onSelectTab: (tab: 'map' | 'lessons' | 'assessment') => void;
  onOpenScratchpad: () => void;
  onOpenMistakes: () => void;
  onOpenDevConsole?: () => void;
  starsCount: number;
  unresolvedMistakesCount?: number;
  programErrorsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenScratchpad,
  onOpenMistakes,
  onOpenDevConsole,
  starsCount,
  unresolvedMistakesCount = 0,
  programErrorsCount = 0
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 md:gap-6 px-4 md:px-6 py-2.5">
        {/* Zone 1: Single text element Brand title */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onSelectTab('map');
          }}
          className="flex items-center gap-2 text-left shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl md:text-3xl">✨</span>
          <div>
            <span className="text-base md:text-xl font-black font-display tracking-tight text-amber-600 block leading-tight">
              Spark Math
            </span>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Toán Tư Duy Lớp 3
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1.5 sm:gap-3 md:gap-5 text-xs md:text-sm font-bold text-slate-600 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('map');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'map'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">Bản đồ</span> Phiêu lưu
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('lessons');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'lessons'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Sách</span> Bài tập
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenMistakes();
            }}
            className="flex items-center gap-1.5 py-1 text-slate-600 hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 relative"
            title="Sổ thu thập và sửa lỗi tư duy"
          >
            <BookMarked className="w-4 h-4 text-rose-500" />
            <span>Sổ Thu Thập Lỗi</span>
            {unresolvedMistakesCount > 0 && (
              <span className="bg-rose-500 text-white font-black text-[10px] px-1.5 py-0.2 rounded-full leading-tight shrink-0 shadow-xs animate-bounce-slow">
                {unresolvedMistakesCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectTab('assessment');
            }}
            className={`flex items-center gap-1.5 py-1 transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'assessment'
                ? 'text-amber-600 border-b-2 border-amber-500'
                : 'hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Nhật ký</span> Tự đánh giá
          </button>
        </nav>

        {/* Zone 3: Star Counter & Primary Action */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          {/* Star counter */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-full font-black text-amber-900 text-xs md:text-sm">
            <Star className="w-4 h-4 fill-amber-400 text-amber-500 animate-spin-slow" />
            <span className="tabular-nums">{starsCount}</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200"
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
          </button>

          {/* Unified Error Center Button */}
          {onOpenDevConsole && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenDevConsole();
              }}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap active:scale-95 ${
                programErrorsCount > 0
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-300 ring-2 ring-rose-200'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
              title="Trung tâm chẩn đoán & báo lỗi (lập trình, logic, hiển thị, tương tác)"
            >
              <Bug className={`w-3.5 h-3.5 ${programErrorsCount > 0 ? 'text-rose-600 animate-pulse' : 'text-slate-500'}`} />
              <span className="hidden lg:inline">Báo & Bắt Lỗi</span>
              {programErrorsCount > 0 && (
                <span className="bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.2 rounded-full leading-tight shrink-0">
                  {programErrorsCount}
                </span>
              )}
            </button>
          )}

          {/* Primary Action Button: Bảng Vẽ Nháp */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenScratchpad();
            }}
            className="px-3.5 py-2 text-xs md:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Bảng Vẽ Nháp</span>
          </button>
        </div>
      </div>
    </header>
  );
};
