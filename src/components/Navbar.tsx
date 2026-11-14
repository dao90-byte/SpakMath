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
    <header className="sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-300 border-b border-[color:color-mix(in_oklch,var(--mm-cyan-border)_40%,transparent)] bg-[linear-gradient(180deg,color-mix(in_oklch,var(--mm-surface-1)_88%,transparent)_0%,color-mix(in_oklch,var(--mm-canvas)_94%,transparent)_100%)] text-[color:var(--mm-ink-primary)] shadow-[0_12px_36px_rgba(3,7,24,0.72),inset_0_1px_0_rgba(255,255,255,0.07)] relative overflow-hidden">
      {/* Subtle Architectural Celestial Sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_18%_0%,color-mix(in_oklch,var(--mm-cyan-accent)_14%,transparent),transparent_48%),radial-gradient(ellipse_at_82%_0%,color-mix(in_oklch,var(--mm-violet-accent)_12%,transparent),transparent_46%)]"
      />
      {/* Precision Bottom Specular Hairline */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[color:color-mix(in_oklch,var(--mm-cyan-accent)_75%,transparent)] via-50% to-transparent"
      />

      {/* Primary 3-Zone Scientific Header Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-3">
        {/* Zone 1 (Left): Refined Cosmic Emblem */}
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
          className="flex items-center gap-2.5 shrink-0 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer min-h-[44px] group"
        >
          <span
            className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
              programMode === 'thinking'
                ? 'bg-[linear-gradient(135deg,var(--mm-cyan-brightFill),var(--mm-azure-brightFill))] text-[#05081D] border-[color:var(--mm-cyan-bright)] shadow-[0_6px_18px_color-mix(in_oklch,var(--mm-cyan-accent)_32%,transparent),inset_0_1px_0_rgba(255,255,255,0.6)]'
                : programMode === 'inmonth'
                ? 'bg-[linear-gradient(135deg,var(--mm-azure-fill),var(--mm-violet-fill))] text-white border-[color:color-mix(in_oklch,var(--mm-cyan-accent)_65%,transparent)] shadow-[0_6px_18px_color-mix(in_oklch,var(--mm-violet-accent)_30%,transparent),inset_0_1px_0_rgba(255,255,255,0.35)]'
                : 'bg-[linear-gradient(135deg,var(--mm-azure-brightFill),var(--mm-cyan-brightFill))] text-[#05081D] border-[color:var(--mm-cyan-bright)] shadow-[0_6px_18px_color-mix(in_oklch,var(--mm-azure-accent)_30%,transparent),inset_0_1px_0_rgba(255,255,255,0.6)]'
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

        {/* Zone 2 (Center): Precision Segmented Program Switcher */}
        <div
          role="group"
          aria-label="Chọn chương trình học"
          className="flex items-center gap-1 p-1 rounded-2xl border text-xs md:text-sm font-extrabold transition-all duration-200 bg-[color:color-mix(in_oklch,var(--mm-surface-inset)_92%,transparent)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_38%,transparent)] shadow-[inset_0_1px_3px_rgba(2,5,18,0.65),0_4px_16px_rgba(3,7,24,0.45)]"
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
                ? 'bg-[linear-gradient(135deg,var(--mm-cyan-brightFill)_0%,var(--mm-azure-brightFill)_100%)] text-[#05081D] font-black ring-1 ring-[color:var(--mm-cyan-bright)] shadow-[0_4px_18px_color-mix(in_oklch,var(--mm-cyan-accent)_34%,transparent),inset_0_1px_0_rgba(255,255,255,0.65)]'
                : 'text-[color:var(--mm-ink-secondary)] hover:text-[color:var(--mm-ink-primary)] hover:bg-white/[0.05]'
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
                ? 'bg-[linear-gradient(135deg,var(--mm-azure-fill)_0%,var(--mm-violet-fill)_100%)] text-white font-black ring-1 ring-[color:color-mix(in_oklch,var(--mm-cyan-accent)_62%,transparent)] shadow-[0_4px_20px_color-mix(in_oklch,var(--mm-violet-accent)_32%,transparent),inset_0_1px_0_rgba(255,255,255,0.32)]'
                : 'text-[color:var(--mm-ink-secondary)] hover:text-[color:var(--mm-ink-primary)] hover:bg-white/[0.05]'
            }`}
          >
            <Orbit className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tracking-tight">MINDMATH K12</span>
          </button>
        </div>

        {/* Zone 3 (Right): Cohesive Essential Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Crystal Counter */}
          <div
            aria-label={`Tổng số tinh thể: ${starsCount}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-extrabold text-xs md:text-sm min-h-[40px] bg-[color:color-mix(in_oklch,var(--mm-surface-2)_82%,transparent)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_46%,transparent)] text-[color:var(--mm-ink-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Gem className="w-4 h-4 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
            <span className="tabular-nums">{starsCount}</span>
          </div>

          {/* Sound Toggle Icon Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isMuted
                ? 'bg-[color:color-mix(in_oklch,var(--mm-rose-tint)_45%,transparent)] hover:bg-[color:color-mix(in_oklch,var(--mm-rose-tint)_65%,transparent)] border-[color:color-mix(in_oklch,var(--mm-rose-border)_70%,transparent)] text-[color:var(--mm-rose-text)]'
                : 'bg-[color:color-mix(in_oklch,var(--mm-surface-2)_82%,transparent)] hover:bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_48%,transparent)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_42%,transparent)] hover:border-[color:var(--mm-emerald-border)] text-[color:var(--mm-emerald-text)]'
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Volume2 className="w-4 h-4" aria-hidden="true" />
            )}
          </button>

          {/* Teacher Mode Icon Button */}
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
                  ? 'bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_55%,transparent)] border-[color:var(--mm-emerald-accent)] text-[color:var(--mm-emerald-bright)] ring-1 ring-[color:color-mix(in_oklch,var(--mm-emerald-accent)_40%,transparent)]'
                  : 'bg-[color:color-mix(in_oklch,var(--mm-surface-2)_82%,transparent)] hover:bg-[color:color-mix(in_oklch,var(--mm-cyan-tint)_48%,transparent)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_42%,transparent)] hover:border-[color:var(--mm-cyan-accent)] text-[color:var(--mm-cyan-text)]'
              }`}
            >
              <KeyRound className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {/* Primary Action: Bảng Nháp (Harmonized with Cosmic Cyan-Azure Theme) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenScratchpad();
            }}
            aria-label="Mở bảng vẽ nháp"
            className="px-4 py-2 text-xs md:text-sm font-black text-[#05081D] bg-[linear-gradient(135deg,var(--mm-cyan-brightFill)_0%,var(--mm-azure-brightFill)_100%)] hover:brightness-105 rounded-xl border border-[color:var(--mm-cyan-bright)] shadow-[0_6px_22px_color-mix(in_oklch,var(--mm-cyan-accent)_34%,transparent),inset_0_1px_0_rgba(255,255,255,0.68)] transition-all duration-200 active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bảng Nháp</span>
          </button>
        </div>
      </div>

    </header>
  );
};
