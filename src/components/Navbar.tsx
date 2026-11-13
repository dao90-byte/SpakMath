import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import {
  Volume2,
  VolumeX,
  Pencil,
  Star,
  Award,
  Compass,
  BookOpen,
  BookMarked,
  KeyRound,
  ClipboardCheck,
  Calendar,
  Brain,
  Rocket,
  Orbit,
  Sparkles
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'map' | 'lessons' | 'periodic' | 'review' | 'assessment';
  onSelectTab: (tab: 'map' | 'lessons' | 'periodic' | 'review' | 'assessment') => void;
  programMode: 'thinking' | 'textbook' | 'inmonth';
  onToggleProgramMode: (mode: 'thinking' | 'textbook' | 'inmonth') => void;
  onOpenScratchpad: () => void;
  onOpenMistakes?: () => void;
  onOpenDevConsole?: () => void;
  onOpenMethodology?: () => void;
  onOpenTeacherUnlock?: () => void;
  isTeacherMode?: boolean;
  starsCount: number;
  unresolvedMistakesCount?: number;
  programErrorsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  programMode,
  onToggleProgramMode,
  onOpenScratchpad,
  onOpenTeacherUnlock,
  isTeacherMode = false,
  starsCount,
  unresolvedMistakesCount = 0,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  const isCosmicTheme = programMode === 'textbook' || programMode === 'inmonth';

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-xl transition-colors duration-300 border-b ${
        isCosmicTheme
          ? 'bg-[#0B1026]/92 border-indigo-400/20 text-white shadow-[0_8px_32px_rgba(6,10,28,0.65)]'
          : 'bg-white/95 border-slate-200/90 text-slate-800 shadow-xs'
      }`}
    >
      {/* Primary 3-Zone Scientific Header Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        {/* Zone 1 (Left): Minimal Brand Identity */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (programMode === 'thinking') {
              onSelectTab('map');
            }
          }}
          aria-label="Trang chủ chương trình"
          className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity duration-200 cursor-pointer min-h-[44px]"
        >
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md border ${
              programMode === 'thinking'
                ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 border-amber-300'
                : programMode === 'inmonth'
                ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white border-amber-300/60'
                : 'bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 border-cyan-300'
            }`}
          >
            {programMode === 'thinking' ? (
              <Sparkles className="w-5 h-5" aria-hidden="true" />
            ) : programMode === 'inmonth' ? (
              <Orbit className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Rocket className="w-5 h-5" aria-hidden="true" />
            )}
          </span>
          <span
            className={`hidden sm:inline-block text-lg md:text-xl font-extrabold font-display tracking-tight leading-none ${
              programMode === 'thinking'
                ? 'text-amber-600'
                : programMode === 'inmonth'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-300 to-cyan-300'
                : 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400'
            }`}
          >
            {programMode === 'thinking'
              ? 'Spark Math'
              : programMode === 'inmonth'
              ? 'IN MONTH'
              : 'Vũ Trụ Toán'}
          </span>
        </button>

        {/* Zone 2 (Center): Balanced Segmented Program Switcher */}
        <div
          role="group"
          aria-label="Chọn chương trình học"
          className={`flex items-center p-1 rounded-2xl border text-xs md:text-sm font-black transition-colors duration-200 ${
            isCosmicTheme
              ? 'bg-slate-900/90 border-indigo-400/30 shadow-inner'
              : 'bg-slate-100/90 border-slate-200'
          }`}
        >
          <button
            type="button"
            aria-pressed={programMode === 'thinking'}
            onClick={() => {
              sound.playClick();
              onToggleProgramMode('thinking');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap ${
              programMode === 'thinking'
                ? 'bg-white text-amber-700 shadow-sm ring-1 ring-slate-200'
                : isCosmicTheme
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Brain className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Toán Tư Duy</span>
          </button>

          <button
            type="button"
            aria-pressed={programMode === 'inmonth'}
            onClick={() => {
              sound.playClick();
              onToggleProgramMode('inmonth');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap ${
              programMode === 'inmonth'
                ? 'bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 text-slate-950 font-black shadow-[0_4px_16px_rgba(251,191,36,0.4)]'
                : isCosmicTheme
                ? 'text-amber-300 hover:text-white hover:bg-white/10'
                : 'text-indigo-700 hover:text-indigo-950 hover:bg-white/60'
            }`}
          >
            <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>IN MONTH</span>
          </button>

          <button
            type="button"
            aria-pressed={programMode === 'textbook'}
            onClick={() => {
              sound.playClick();
              onToggleProgramMode('textbook');
            }}
            className={`px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap ${
              programMode === 'textbook'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-black shadow-[0_4px_16px_rgba(34,211,238,0.35)]'
                : isCosmicTheme
                ? 'text-slate-300 hover:text-white hover:bg-white/10'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <Rocket className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">SGK Lớp 3</span>
            <span className="sm:hidden">SGK 3</span>
          </button>
        </div>

        {/* Zone 3 (Right): Compact Essential Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Star Counter */}
          <div
            aria-label={`Tổng số sao: ${starsCount}`}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border font-black text-xs md:text-sm min-h-[40px] ${
              isCosmicTheme
                ? 'bg-amber-400/15 border-amber-300/40 text-amber-200'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />
            <span className="tabular-nums">{starsCount}</span>
          </div>

          {/* Sound Toggle Icon Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-colors duration-200 cursor-pointer ${
              isCosmicTheme
                ? 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
                : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-rose-400" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            )}
          </button>

          {/* Teacher Mode Icon Button (No verbose label clutter) */}
          {onOpenTeacherUnlock && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTeacherUnlock();
              }}
              aria-label="Cổng giáo viên"
              title={isTeacherMode ? 'Chế độ giáo viên: Đã mở' : 'Cổng giáo viên'}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                isTeacherMode
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30'
                  : isCosmicTheme
                  ? 'bg-white/10 hover:bg-white/20 border-white/15 text-amber-300'
                  : 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-700'
              }`}
            >
              <KeyRound className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {/* Primary Action: Bảng Nháp */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenScratchpad();
            }}
            aria-label="Mở bảng vẽ nháp"
            className="px-3.5 py-2 text-xs md:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 rounded-xl shadow-md transition-all duration-200 active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bảng Nháp</span>
          </button>
        </div>
      </div>

      {/* Slim Secondary Sub-Nav (Shown only in Toán Tư Duy mode to keep top bar clean) */}
      {programMode === 'thinking' && (
        <nav
          aria-label="Điều hướng Toán Tư Duy"
          className="border-t border-slate-100 bg-slate-50/80 px-4 md:px-6"
        >
          <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-none text-xs md:text-sm font-bold text-slate-600 h-11">
            <button
              type="button"
              aria-pressed={currentTab === 'map'}
              onClick={() => {
                sound.playClick();
                onSelectTab('map');
              }}
              className={`flex items-center gap-1.5 h-full border-b-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'map'
                  ? 'text-amber-700 border-amber-500 font-black'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Compass className="w-4 h-4" aria-hidden="true" />
              <span>Bản đồ</span>
            </button>

            <button
              type="button"
              aria-pressed={currentTab === 'lessons'}
              onClick={() => {
                sound.playClick();
                onSelectTab('lessons');
              }}
              className={`flex items-center gap-1.5 h-full border-b-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'lessons'
                  ? 'text-amber-700 border-amber-500 font-black'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Bài tập</span>
            </button>

            <button
              type="button"
              aria-pressed={currentTab === 'periodic'}
              onClick={() => {
                sound.playClick();
                onSelectTab('periodic');
              }}
              className={`flex items-center gap-1.5 h-full border-b-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'periodic'
                  ? 'text-amber-700 border-amber-500 font-black'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <ClipboardCheck className="w-4 h-4 text-amber-600" aria-hidden="true" />
              <span>Kiểm tra định kỳ</span>
            </button>

            <button
              type="button"
              aria-pressed={currentTab === 'review'}
              onClick={() => {
                sound.playClick();
                onSelectTab('review');
              }}
              className={`flex items-center gap-1.5 h-full border-b-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'review'
                  ? 'text-amber-700 border-amber-500 font-black'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <BookMarked className="w-4 h-4 text-rose-500" aria-hidden="true" />
              <span>Sổ ôn tập</span>
              {unresolvedMistakesCount > 0 && (
                <span className="bg-rose-600 text-white font-black text-[10px] px-1.5 py-0.5 rounded-full leading-tight tabular-nums">
                  {unresolvedMistakesCount}
                </span>
              )}
            </button>

            <button
              type="button"
              aria-pressed={currentTab === 'assessment'}
              onClick={() => {
                sound.playClick();
                onSelectTab('assessment');
              }}
              className={`flex items-center gap-1.5 h-full border-b-2 transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                currentTab === 'assessment'
                  ? 'text-amber-700 border-amber-500 font-black'
                  : 'border-transparent hover:text-slate-900'
              }`}
            >
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Tự đánh giá</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
