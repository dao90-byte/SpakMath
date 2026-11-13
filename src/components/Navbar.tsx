import React, { useState } from 'react';
import { sound } from '../utils/soundEffects';
import {
  Volume2,
  VolumeX,
  Pencil,
  Gem,
  KeyRound,
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
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  const handleToggleSound = () => {
    const next = sound.toggleMute();
    setIsMuted(next);
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-300 border-b bg-[#070B1E]/92 border-cyan-300/20 text-white shadow-[0_10px_36px_rgba(3,7,24,0.72)]">
      {/* Primary 3-Zone Scientific Header Bar */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        {/* Zone 1 (Left): Minimal Brand Identity */}
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            if (programMode === 'thinking') {
              onSelectTab('map');
            } else if (programMode === 'inmonth') {
              onToggleProgramMode('inmonth');
            }
          }}
          aria-label="Trang chủ chương trình"
          className="flex items-center gap-2.5 shrink-0 hover:opacity-90 transition-opacity duration-200 cursor-pointer min-h-[44px]"
        >
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md border ${
              programMode === 'thinking'
                ? 'bg-gradient-to-br from-cyan-300 via-sky-400 to-fuchsia-500 text-slate-950 border-cyan-200/80 shadow-[0_0_20px_rgba(34,211,238,0.45)]'
                : programMode === 'inmonth'
                ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 text-white border-cyan-300/60 shadow-[0_0_20px_rgba(168,85,247,0.45)]'
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
        </button>

        {/* Zone 2 (Center): Balanced Segmented Program Switcher */}
        <div
          role="group"
          aria-label="Chọn chương trình học"
          className="flex items-center gap-1.5 p-1.5 rounded-2xl border text-xs md:text-sm font-black transition-colors duration-200 bg-[#0B1233]/95 border-cyan-300/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_28px_rgba(3,7,24,0.65)]"
        >
          <button
            type="button"
            aria-pressed={programMode === 'thinking'}
            onClick={() => {
              sound.playClick();
              onToggleProgramMode('thinking');
            }}
            className={`px-3.5 sm:px-4.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap ${
              programMode === 'thinking'
                ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black ring-1 ring-cyan-100/80 shadow-[0_0_24px_rgba(34,211,238,0.48),0_0_32px_rgba(232,121,249,0.24),inset_0_1px_0_rgba(255,255,255,0.65)]'
                : 'text-cyan-200/85 hover:text-white bg-white/[0.03] hover:bg-cyan-400/15 border border-transparent hover:border-cyan-300/50 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]'
            }`}
          >
            <Brain className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>SUPER MINDMATH</span>
          </button>

          <button
            type="button"
            aria-pressed={programMode === 'inmonth'}
            onClick={() => {
              sound.playClick();
              onToggleProgramMode('inmonth');
            }}
            className={`relative overflow-hidden px-3.5 sm:px-4.5 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 cursor-pointer min-h-[38px] whitespace-nowrap ${
              programMode === 'inmonth'
                ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black ring-1 ring-cyan-100/80 shadow-[0_0_24px_rgba(34,211,238,0.48),0_0_34px_rgba(232,121,249,0.28),inset_0_1px_0_rgba(255,255,255,0.65)]'
                : 'text-cyan-100/90 hover:text-white bg-white/[0.04] hover:bg-fuchsia-400/15 border border-cyan-300/20 hover:border-cyan-300/55 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)] shadow-inner'
            }`}
          >
            <Orbit className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tracking-tight">MINDMATH K12</span>
          </button>
        </div>

        {/* Zone 3 (Right): Compact Essential Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Crystal Counter */}
          <div
            aria-label={`Tổng số tinh thể: ${starsCount}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-black text-xs md:text-sm min-h-[40px] bg-gradient-to-r from-cyan-400/20 via-indigo-500/20 to-fuchsia-500/20 border-cyan-300/45 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.22)]"
          >
            <Gem className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]" aria-hidden="true" />
            <span className="tabular-nums">{starsCount}</span>
          </div>

          {/* Sound Toggle Icon Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className="w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer bg-white/[0.08] hover:bg-cyan-400/15 border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] text-white"
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
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-400/30 hover:shadow-[0_0_18px_rgba(52,211,153,0.45)]'
                  : 'bg-white/[0.08] hover:bg-cyan-400/15 border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] text-cyan-200'
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
            className="px-3.5 py-2 text-xs md:text-sm font-black text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.38)] hover:shadow-[0_0_28px_rgba(34,211,238,0.6)] transition-all duration-200 active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bảng Nháp</span>
          </button>
        </div>
      </div>

    </header>
  );
};
