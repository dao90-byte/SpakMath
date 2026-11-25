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
    <header className="sticky top-0 z-40 backdrop-blur-2xl transition-colors duration-300 border-b border-cyan-400/50 bg-[linear-gradient(100deg,rgba(4,10,42,0.95)_0%,rgba(20,11,64,0.94)_48%,rgba(6,18,58,0.95)_100%)] text-white shadow-[0_18px_50px_rgba(1,3,16,0.92),0_4px_34px_rgba(56,189,248,0.24),0_0_44px_rgba(139,92,246,0.22),inset_0_1px_0_rgba(255,255,255,0.16)] relative overflow-hidden">
      {/* Multi-Layer Saturated Galactic Nebula Aura inside Header */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_150%_at_10%_30%,rgba(6,182,212,0.34),transparent_64%),radial-gradient(ellipse_52%_170%_at_50%_95%,rgba(124,58,237,0.36),transparent_65%),radial-gradient(ellipse_45%_150%_at_90%_20%,rgba(59,130,246,0.32),transparent_64%)]"
      />

      {/* Top Specular Ice-Cyan Rim */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-0 h-px bg-gradient-to-r from-cyan-400/10 via-cyan-200/45 to-violet-400/10"
      />

      {/* Panoramic Header Starfield, Constellation Lines & Orbital Arcs */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 68"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="nav-galaxy-arc-bright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="20%" stopColor="#22D3EE" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#E0F7FF" stopOpacity="1" />
            <stop offset="80%" stopColor="#A855F7" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="nav-star-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="40%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sweeping Galactic Horizon Orbit Arcs */}
        <path
          d="M -80 62 Q 720 -24 1520 62"
          fill="none"
          stroke="url(#nav-galaxy-arc-bright)"
          strokeWidth="1.35"
          strokeOpacity="0.72"
        />
        <path
          d="M 90 66 Q 720 6 1350 66"
          fill="none"
          stroke="#67E8F9"
          strokeWidth="0.9"
          strokeOpacity="0.34"
          strokeDasharray="3 7"
        />

        {/* Subtle Constellation Geometry Left & Right */}
        <polyline
          points="72,20 132,48 214,16 286,38"
          fill="none"
          stroke="#67E8F9"
          strokeOpacity="0.28"
          strokeWidth="0.9"
        />
        <polyline
          points="1138,18 1218,46 1304,16 1384,42"
          fill="none"
          stroke="#C4B5FD"
          strokeOpacity="0.28"
          strokeWidth="0.9"
        />

        {/* Crisp Multi-Depth Starfield */}
        <circle cx="72" cy="20" r="1.4" fill="#E0F7FF" opacity="0.9" className="animate-cosmic-twinkle" />
        <circle cx="132" cy="48" r="1.1" fill="#67E8F9" opacity="0.8" />
        <circle cx="214" cy="16" r="1.6" fill="#FFFFFF" opacity="0.95" className="animate-cosmic-twinkle" style={{ animationDelay: '0.7s' }} />
        <circle cx="286" cy="38" r="1.1" fill="#C4B5FD" opacity="0.8" />
        <circle cx="364" cy="14" r="1.3" fill="#38BDF8" opacity="0.85" />
        <circle cx="432" cy="46" r="1.0" fill="#FFFFFF" opacity="0.7" />
        <circle cx="1008" cy="46" r="1.1" fill="#67E8F9" opacity="0.75" />
        <circle cx="1068" cy="14" r="1.4" fill="#E0F7FF" opacity="0.9" className="animate-cosmic-twinkle" style={{ animationDelay: '1.4s' }} />
        <circle cx="1138" cy="18" r="1.7" fill="#FFFFFF" opacity="0.96" className="animate-cosmic-twinkle" style={{ animationDelay: '0.3s' }} />
        <circle cx="1218" cy="46" r="1.1" fill="#38BDF8" opacity="0.78" />
        <circle cx="1304" cy="16" r="1.5" fill="#D8B4FE" opacity="0.92" className="animate-cosmic-twinkle" style={{ animationDelay: '1.9s' }} />
        <circle cx="1384" cy="42" r="1.2" fill="#FFFFFF" opacity="0.82" />

        {/* Luminous 4-Point Anchor Star Flares */}
        <g transform="translate(214, 16)" className="animate-cosmic-twinkle" style={{ animationDelay: '0.7s' }}>
          <circle cx="0" cy="0" r="11" fill="url(#nav-star-halo)" />
          <path d="M 0 -7.5 Q 0 0 7.5 0 Q 0 0 0 7.5 Q 0 0 -7.5 0 Q 0 0 0 -7.5 Z" fill="#E0F7FF" />
        </g>
        <g transform="translate(1138, 18)" className="animate-cosmic-twinkle" style={{ animationDelay: '0.3s' }}>
          <circle cx="0" cy="0" r="11" fill="url(#nav-star-halo)" />
          <path d="M 0 -7.5 Q 0 0 7.5 0 Q 0 0 0 7.5 Q 0 0 -7.5 0 Q 0 0 0 -7.5 Z" fill="#E9D5FF" />
        </g>
      </svg>

      {/* Luminous Dual-Tone Horizon Laser Beam + Center Flare */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-400/10 via-cyan-300 via-35% to-violet-400/20 opacity-95 shadow-[0_0_16px_rgba(34,211,238,0.65)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_24px_rgba(56,189,248,1)]"
      />

      {/* Primary 3-Zone Scientific Header Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 h-[68px] flex items-center justify-between gap-3">
        {/* Upward Galactic Core Bloom behind Switcher */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 w-[26rem] h-14 rounded-full blur-2xl opacity-70 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.42)_0%,rgba(139,92,246,0.36)_55%,transparent_100%)]"
        />

        {/* Zone 1 (Left): Electric Orbital Emblem + Celestial Brand Wordmark */}
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
          className="flex items-center gap-3 shrink-0 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 cursor-pointer min-h-[44px] group"
        >
          <span className="relative flex items-center justify-center">
            {/* Tilted Planetary Orbit Ring */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-1.5 rounded-full border border-cyan-300/70 -rotate-12 scale-y-[0.58] shadow-[0_0_12px_rgba(34,211,238,0.45)] group-hover:border-white/90 transition-colors"
            />
            <span
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center border transition-all duration-200 ${
                programMode === 'thinking'
                  ? 'bg-gradient-to-br from-cyan-300 via-sky-400 to-blue-500 text-[#020617] border-white/85 shadow-[0_0_28px_rgba(34,211,238,0.72),0_8px_20px_rgba(1,3,16,0.82),inset_0_1px_0_rgba(255,255,255,0.85),inset_0_-2px_0_rgba(2,6,23,0.24)]'
                  : programMode === 'inmonth'
                  ? 'bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white border-cyan-200/85 shadow-[0_0_28px_rgba(139,92,246,0.72),0_8px_20px_rgba(1,3,16,0.82),inset_0_1px_0_rgba(255,255,255,0.55),inset_0_-2px_0_rgba(2,6,23,0.34)]'
                  : 'bg-gradient-to-br from-sky-300 via-cyan-400 to-indigo-500 text-[#020617] border-white/80 shadow-[0_0_28px_rgba(56,189,248,0.68),0_8px_20px_rgba(1,3,16,0.82),inset_0_1px_0_rgba(255,255,255,0.8)]'
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
          </span>
          <span className="hidden lg:flex flex-col items-start leading-none">
            <span className="font-display text-lg font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_2px_14px_rgba(34,211,238,0.55)]">
              MindMath
            </span>
            <span className="text-[10px] font-extrabold tracking-[0.16em] text-cyan-300 mt-0.5 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
              OBSERVATORY
            </span>
          </span>
        </button>

        {/* Zone 2 (Center): Radiant Gradient-Framed Celestial Console Switcher */}
        <div className="p-[1.5px] rounded-2xl bg-gradient-to-r from-cyan-400/80 via-indigo-400/75 to-fuchsia-400/80 shadow-[0_0_30px_rgba(34,211,238,0.28),0_10px_28px_rgba(1,3,16,0.82)]">
          <div
            role="group"
            aria-label="Chọn chương trình học"
            className="relative flex items-center gap-1.5 p-1 rounded-[14.5px] text-xs md:text-sm font-extrabold bg-[#050a24]/95 shadow-[inset_0_2px_8px_rgba(1,3,14,0.92)]"
          >
            <button
              type="button"
              aria-pressed={programMode === 'thinking'}
              onClick={() => {
                sound.playClick();
                onToggleProgramMode('thinking');
              }}
              className={`px-4 sm:px-5 py-2 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer min-h-[38px] whitespace-nowrap ${
                programMode === 'thinking'
                  ? 'bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 text-[#020617] font-black ring-1 ring-white/85 shadow-[0_0_28px_rgba(34,211,238,0.68),0_6px_18px_rgba(1,3,16,0.75),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(2,6,23,0.22)]'
                  : 'text-cyan-100/85 hover:text-white hover:bg-indigo-500/25'
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
              className={`relative overflow-hidden px-4 sm:px-5 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer min-h-[38px] whitespace-nowrap ${
                programMode === 'inmonth'
                  ? 'bg-gradient-to-r from-sky-700/90 via-cyan-700/85 to-blue-800/90 text-sky-50 font-black ring-1 ring-cyan-200/60 animate-soft-sky-glow hover:brightness-110'
                  : 'text-sky-200/80 hover:text-white hover:bg-sky-400/15 hover:shadow-[0_0_16px_rgba(56,189,248,0.22)] hover:ring-1 hover:ring-cyan-300/35'
              }`}
            >
              {programMode === 'inmonth' && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_65%_at_50%_0%,rgba(186,230,253,0.32),transparent_72%)]"
                />
              )}
              <Orbit
                className={`relative z-10 w-4 h-4 shrink-0 ${
                  programMode === 'inmonth' ? 'text-cyan-200 drop-shadow-[0_0_8px_rgba(165,243,252,0.75)]' : ''
                }`}
                aria-hidden="true"
              />
              <span className="relative z-10 tracking-tight">MINDMATH K12</span>
            </button>
          </div>
        </div>

        {/* Zone 3 (Right): Jewel-Toned Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Crystal Counter */}
          <div
            aria-label={`Tổng số tinh thể: ${starsCount}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border font-extrabold text-xs md:text-sm min-h-[40px] bg-gradient-to-r from-cyan-500/25 via-indigo-600/30 to-violet-600/30 border-cyan-300/65 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_18px_rgba(1,3,16,0.72),0_0_20px_rgba(34,211,238,0.28)]"
          >
            <Gem className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.95)]" aria-hidden="true" />
            <span className="tabular-nums drop-shadow-[0_0_8px_rgba(165,243,252,0.55)]">{starsCount}</span>
          </div>

          {/* Sound Toggle Icon Button */}
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_4px_16px_rgba(1,3,16,0.72)] ${
              isMuted
                ? 'bg-rose-500/25 hover:bg-rose-500/35 border-rose-400/70 text-rose-200 shadow-[0_0_18px_rgba(244,63,94,0.3)]'
                : 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/60 text-emerald-200 shadow-[0_0_18px_rgba(16,185,129,0.26)]'
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
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 cursor-pointer shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_4px_16px_rgba(1,3,16,0.72)] ${
                isTeacherMode
                  ? 'bg-gradient-to-br from-emerald-500/35 to-teal-500/35 border-emerald-300 text-emerald-100 ring-1 ring-emerald-300/60 shadow-[0_0_22px_rgba(52,211,153,0.45)]'
                  : 'bg-indigo-500/25 hover:bg-cyan-400/25 border-indigo-300/60 hover:border-cyan-300 text-cyan-200 shadow-[0_0_18px_rgba(99,102,241,0.28)]'
              }`}
            >
              <KeyRound className="w-4 h-4" aria-hidden="true" />
            </button>
          )}

          {/* Primary Action: Bảng Nháp (Electric Cosmic Cyan-Sky, Harmonized with Galaxy Theme) */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenScratchpad();
            }}
            aria-label="Mở bảng vẽ nháp"
            className="px-4 py-2 text-xs md:text-sm font-black text-[#020617] bg-gradient-to-r from-cyan-300 via-cyan-400 to-sky-400 hover:brightness-105 rounded-xl border border-white/85 shadow-[0_0_28px_rgba(34,211,238,0.58),0_8px_22px_rgba(1,3,16,0.8),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_0_rgba(2,6,23,0.22)] transition-all duration-200 active:scale-95 flex items-center gap-1.5 whitespace-nowrap cursor-pointer min-h-[40px]"
          >
            <Pencil className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Bảng Nháp</span>
          </button>
        </div>
      </div>

    </header>
  );
};
