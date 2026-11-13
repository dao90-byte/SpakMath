import React, { useState, useEffect } from 'react';
import { InMonthDayPlan } from '../../data/inMonthNovemberData';
import {
  InMonthMonthProgram,
  getMonthStorageKeys,
} from '../../data/inMonthGrade3Catalog';
import { InMonthExamSavedResult } from './InMonthFinalExamModal';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Trophy,
  Sparkles,
  Award,
  ChevronRight,
  ArrowLeft,
  Orbit,
  Rocket,
} from 'lucide-react';

export interface InMonthDayProgress {
  day: number;
  score: number;
  totalQuestions: number;
  elapsedSeconds: number;
  completedAt: string;
}

interface InMonthCalendarHubProps {
  monthProgram: InMonthMonthProgram;
  completedDays: Record<number, InMonthDayProgress>;
  examResult: InMonthExamSavedResult | null;
  onSelectDay: (dayPlan: InMonthDayPlan) => void;
  onOpenExam: () => void;
  onBackToGrade: () => void;
  onSwitchMonth?: (monthProgram: InMonthMonthProgram) => void;
}

function getSavedDaySolvedCount(monthNumber: number, dayNumber: number): number {
  try {
    const raw = localStorage.getItem(
      getMonthStorageKeys(monthNumber).dayProgressKey(dayNumber)
    );
    if (!raw) return 0;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.solvedMap && typeof parsed.solvedMap === 'object') {
      return Object.values(parsed.solvedMap).filter(Boolean).length;
    }
    return 0;
  } catch {
    return 0;
  }
}

export const InMonthCalendarHub: React.FC<InMonthCalendarHubProps> = ({
  monthProgram,
  completedDays,
  examResult,
  onSelectDay,
  onOpenExam,
  onBackToGrade,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [unlockAllPreview, setUnlockAllPreview] = useState<boolean>(false);

  useEffect(() => {
    setSelectedWeek('all');
  }, [monthProgram.monthNumber]);

  const completedCount = Object.keys(completedDays).length;
  const progressPct = Math.round((completedCount / 30) * 100);

  // Sequential unlock: Day 1 is open; Day N opens when Day N-1 is completed (or when unlockAllPreview is toggled)
  const isDayUnlocked = (dayNum: number) => {
    if (unlockAllPreview) return true;
    if (dayNum === 1) return true;
    return !!completedDays[dayNum - 1];
  };

  const nextActiveDayNumber = (() => {
    for (let d = 1; d <= 30; d++) {
      if (!completedDays[d]) return d;
    }
    return 30;
  })();

  const filteredDays =
    selectedWeek === 'all'
      ? monthProgram.days
      : monthProgram.days.filter((d) => d.weekNumber === selectedWeek);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.14),_transparent_52%),radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.28),_transparent_55%),linear-gradient(180deg,_#030617_0%,_#0A1038_46%,_#1A0E46_100%)] text-white pb-20 relative overflow-hidden">
      {/* Deep Space Ambient Nebula & Starfield Canvas */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[480px] h-[480px] rounded-full bg-cyan-500/18 blur-[145px]" />
        <div className="absolute top-1/3 -right-24 w-[440px] h-[440px] rounded-full bg-fuchsia-500/18 blur-[145px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-indigo-500/16 blur-[155px]" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-55">
          <circle cx="120" cy="140" r="1.5" fill="#67E8F9" />
          <circle cx="310" cy="80" r="1.2" fill="#FDE68A" />
          <circle cx="540" cy="210" r="1.7" fill="#FFFFFF" />
          <circle cx="790" cy="110" r="1.4" fill="#F9A8D4" />
          <circle cx="1040" cy="190" r="1.8" fill="#67E8F9" />
          <circle cx="1310" cy="120" r="1.4" fill="#FDE68A" />
          <circle cx="190" cy="460" r="1.5" fill="#FFFFFF" />
          <circle cx="430" cy="540" r="1.6" fill="#67E8F9" />
          <circle cx="680" cy="490" r="1.3" fill="#F9A8D4" />
          <circle cx="960" cy="610" r="1.7" fill="#FDE68A" />
          <circle cx="1240" cy="520" r="1.5" fill="#67E8F9" />
          <circle cx="280" cy="790" r="1.6" fill="#F9A8D4" />
          <circle cx="840" cy="820" r="1.5" fill="#FFFFFF" />
          <circle cx="1350" cy="780" r="1.8" fill="#67E8F9" />
        </svg>
      </div>

      {/* Top Observatory Telemetry & Breadcrumb Bar */}
      <div className="relative z-10 border-b border-cyan-300/25 bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.14),_transparent_50%),linear-gradient(180deg,_rgba(7,11,34,0.97),_rgba(11,17,48,0.93))] backdrop-blur-2xl shadow-[0_10px_32px_rgba(3,7,24,0.6)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Điều hướng chương trình theo tháng" className="flex items-center gap-2 text-xs sm:text-sm font-bold flex-wrap">
            <button
              type="button"
              onClick={onBackToGrade}
              className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/30 hover:border-cyan-300/65 shadow-[0_0_16px_rgba(34,211,238,0.14)] transition-all duration-200 cursor-pointer min-h-[38px] whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
              <span>Lớp 3 · Các Tháng</span>
            </button>
            <ChevronRight className="w-4 h-4 text-cyan-300/60 shrink-0" aria-hidden="true" />
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400/20 to-orange-400/15 border border-amber-300/45 text-amber-200 font-black text-xs inline-flex items-center gap-1.5 shadow-[0_0_16px_rgba(251,191,36,0.18)] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)]" aria-hidden="true" />
              <span>{monthProgram.label}</span>
            </span>
            <span aria-hidden="true" className="text-indigo-400/70 hidden sm:inline">·</span>
            <span className="text-cyan-100/90 font-semibold hidden sm:inline truncate max-w-md text-xs sm:text-sm">
              {monthProgram.title}
            </span>
          </nav>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-[11px] font-bold text-cyan-200/90 tabular-nums">
            <Orbit className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
            <span>30 chặng · {completedCount}/30 hoàn thành</span>
          </div>
        </div>
      </div>

      {/* Month Overview Hero (Flagship Cosmic Observatory) */}
      <div className="relative z-10 overflow-hidden border-b border-cyan-300/35 bg-[radial-gradient(ellipse_at_10%_15%,_rgba(56,189,248,0.38),_transparent_46%),radial-gradient(ellipse_at_88%_18%,_rgba(192,132,252,0.34),_transparent_46%),radial-gradient(ellipse_at_68%_96%,_rgba(245,158,11,0.28),_transparent_50%),linear-gradient(132deg,_#05081E_0%,_#111548_48%,_#271059_100%)] backdrop-blur-2xl px-4 sm:px-6 py-7 sm:py-12 lg:py-16 shadow-[0_32px_84px_rgba(3,7,24,0.8)]">
        {/* Ambient Aurora Glow Orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/3 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-cyan-400/15 blur-[110px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-fuchsia-500/15 blur-[120px]" aria-hidden="true" />

        {/* Cosmic Observatory Rings, Ringed Planet, Comet & Constellation Starfield */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 380"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-90"
        >
          <defs>
            <radialGradient id="monthHeroGlow" cx="83%" cy="30%" r="38%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.32)" />
              <stop offset="45%" stopColor="rgba(56,189,248,0.16)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0)" />
            </radialGradient>
            <radialGradient id="monthPlanetFill" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#A5F3FC" stopOpacity="0.72" />
              <stop offset="42%" stopColor="#6366F1" stopOpacity="0.4" />
              <stop offset="85%" stopColor="#311068" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#0F172A" stopOpacity="0.1" />
            </radialGradient>
            <linearGradient id="monthCometGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(103,232,249,0)" />
              <stop offset="65%" stopColor="rgba(103,232,249,0.38)" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
            <linearGradient id="monthRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.1)" />
              <stop offset="50%" stopColor="rgba(251,191,36,0.5)" />
              <stop offset="100%" stopColor="rgba(232,121,249,0.22)" />
            </linearGradient>
          </defs>
          <rect width="1200" height="380" fill="url(#monthHeroGlow)" />

          {/* Astrolabe Orbital Trajectories */}
          <circle cx="1015" cy="108" r="195" fill="none" stroke="rgba(56,189,248,0.24)" strokeWidth="1.2" strokeDasharray="6 8" />
          <circle cx="1015" cy="108" r="275" fill="none" stroke="rgba(251,191,36,0.16)" strokeWidth="1" />
          <circle cx="1015" cy="108" r="355" fill="none" stroke="rgba(168,85,247,0.16)" strokeWidth="1" strokeDasharray="3 10" />

          {/* Luminous Planet & Dual Tilted Rings */}
          <circle cx="1015" cy="108" r="64" fill="url(#monthPlanetFill)" stroke="rgba(165,243,252,0.42)" strokeWidth="1.2" />
          <ellipse cx="1015" cy="108" rx="134" ry="30" transform="rotate(-18 1015 108)" fill="none" stroke="url(#monthRingGrad)" strokeWidth="1.8" />
          <ellipse cx="1015" cy="108" rx="112" ry="23" transform="rotate(14 1015 108)" fill="none" stroke="rgba(103,232,249,0.25)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="889" cy="148" r="4" fill="#67E8F9" />
          <circle cx="1141" cy="68" r="4.5" fill="#FDE68A" />

          {/* Shooting Star / Comet Trail */}
          <line x1="650" y1="22" x2="778" y2="74" stroke="url(#monthCometGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="778" cy="74" r="2.6" fill="#FEF08A" />

          {/* Constellation Geometry & 4-Point Diamond Stars */}
          <polyline points="88,62 215,32 356,82 512,34 654,76" fill="none" stroke="rgba(103,232,249,0.2)" strokeWidth="1" strokeDasharray="3 5" />
          <path d="M215 24 L217 30 L223 32 L217 34 L215 40 L213 34 L207 32 L213 30 Z" fill="#FDE68A" />
          <path d="M512 25 L514 32 L521 34 L514 36 L512 43 L510 36 L503 34 L510 32 Z" fill="#67E8F9" />
          <path d="M878 24 L880 30 L886 32 L880 34 L878 40 L876 34 L870 32 L876 30 Z" fill="#F9A8D4" />
          <circle cx="88" cy="62" r="2.2" fill="#67E8F9" />
          <circle cx="356" cy="82" r="1.6" fill="#FFFFFF" />
          <circle cx="654" cy="76" r="2" fill="#67E8F9" />
          <circle cx="1142" cy="188" r="2.2" fill="#FDE68A" />
          <circle cx="165" cy="300" r="1.8" fill="#FFFFFF" />
          <circle cx="480" cy="322" r="1.6" fill="#67E8F9" />
          <circle cx="790" cy="312" r="1.8" fill="#F9A8D4" />
        </svg>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/75 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.5)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent shadow-[0_0_14px_rgba(251,191,36,0.45)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-10">
          <div className="space-y-5 sm:space-y-6 w-full lg:max-w-3xl">
            <h1 className="font-display space-y-3 [text-wrap:balance]">
              <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400/18 via-indigo-400/15 to-fuchsia-400/18 border border-cyan-300/40 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] sm:tracking-[0.26em] text-cyan-100 shadow-[0_0_24px_rgba(34,211,238,0.26)] backdrop-blur-md max-w-full">
                <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" aria-hidden="true" />
                <span>HÀNH TRÌNH VŨ TRỤ KHÁM PHÁ</span>
              </span>
              <span className="block relative">
                <span className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-[28px] sm:text-5xl lg:text-[58px] font-black uppercase tracking-tight leading-[1.08]">
                  <span className="whitespace-nowrap bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent drop-shadow-[0_6px_30px_rgba(56,189,248,0.48)]">
                    TOÁN TƯ DUY
                  </span>
                  <span aria-hidden="true" className="text-amber-300/90 text-xl sm:text-3xl drop-shadow-[0_0_12px_rgba(251,191,36,0.85)]">
                    ✦
                  </span>
                  <span className="whitespace-nowrap bg-gradient-to-r from-amber-200 via-yellow-100 to-orange-300 bg-clip-text text-transparent drop-shadow-[0_6px_28px_rgba(251,191,36,0.52)]">
                    {monthProgram.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="block mt-2.5 sm:mt-3 h-1 w-28 sm:w-44 rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-fuchsia-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]"
                />
              </span>
            </h1>

            <div className="grid grid-cols-1 sm:flex sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => {
                  const target =
                    monthProgram.days.find(
                      (d) => d.dayNumber === nextActiveDayNumber
                    ) || monthProgram.days[0];
                  onSelectDay(target);
                }}
                className="w-full sm:w-auto justify-center px-5 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:from-cyan-200 hover:via-sky-200 hover:to-fuchsia-200 text-slate-950 font-black text-sm sm:text-base ring-2 ring-cyan-200/90 shadow-[0_0_34px_rgba(34,211,238,0.52),0_14px_38px_rgba(192,132,252,0.38),inset_0_1px_0_rgba(255,255,255,0.85)] hover:shadow-[0_0_44px_rgba(34,211,238,0.7),0_18px_46px_rgba(217,70,239,0.5)] flex items-center gap-2 sm:gap-2.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[48px] sm:min-h-[52px]"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
                <span>Bắt Đầu Ngay: Ngày {nextActiveDayNumber}/30</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onOpenExam}
                className="w-full sm:w-auto justify-center px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl bg-white/[0.1] hover:bg-cyan-400/20 border border-cyan-300/40 hover:border-cyan-300/70 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all duration-200 cursor-pointer min-h-[46px] sm:min-h-[52px] backdrop-blur-xl shadow-[0_10px_28px_rgba(3,7,24,0.4)]"
              >
                <Trophy className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
                <span>
                  {examResult
                    ? `Xem Báo Cáo Cuối Tháng (${examResult.totalScore}/100đ)`
                    : `Kiểm Tra Cuối ${monthProgram.label}`}
                </span>
              </button>
            </div>
          </div>

          {/* 2 Cosmic Observatory KPI Cards (2-col balanced across every device) */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:shrink-0">
            <div className="group relative overflow-hidden p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-fuchsia-400/22 via-[#141D58]/94 to-[#26125B]/96 backdrop-blur-2xl border border-fuchsia-300/55 hover:border-cyan-300/80 shadow-[0_20px_48px_rgba(168,85,247,0.26),inset_0_1px_0_rgba(255,255,255,0.25)] hover:shadow-[0_0_36px_rgba(217,70,239,0.42)] transition-all duration-200 min-w-0 lg:min-w-[206px] xl:min-w-[218px]">
              <div className="pointer-events-none absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-fuchsia-400/25 blur-2xl" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-4 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 shadow-[0_0_14px_rgba(217,70,239,0.7)]"
              />
              <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] text-fuchsia-200">
                <span>TIẾN ĐỘ</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-fuchsia-400/22 border border-fuchsia-300/45 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(217,70,239,0.3)]">
                  <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200" aria-hidden="true" />
                </span>
              </div>
              <div className="relative z-10 mt-2.5 sm:mt-3 flex items-center justify-between gap-2 sm:gap-3">
                <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums leading-none min-w-0">
                  {completedCount}
                  <span className="text-[11px] sm:text-xs font-sans font-bold text-cyan-200/80 ml-1">/ 30</span>
                </div>
                <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-13 sm:h-13 shrink-0 drop-shadow-[0_0_12px_rgba(217,70,239,0.45)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="monthProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67E8F9" />
                      <stop offset="55%" stopColor="#E879F9" />
                      <stop offset="100%" stopColor="#FDE047" />
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(232,121,249,0.22)" strokeWidth="1" strokeDasharray="2 3" />
                  <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="17"
                    fill="none"
                    stroke="url(#monthProgressGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.max(4, Math.round((completedCount / 30) * 106.8))} 106.8`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27.5" textAnchor="middle" className="fill-cyan-100 text-[10px] font-black tabular-nums">
                    {progressPct}%
                  </text>
                </svg>
              </div>
              <div className="relative z-10 mt-2.5 sm:mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  style={{ width: `${Math.max(completedCount > 0 ? 6 : 0, progressPct)}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 transition-all duration-500"
                />
              </div>
            </div>

            <div className="relative overflow-hidden p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-300/22 via-[#131C4B]/92 to-[#0E2656]/95 backdrop-blur-2xl border border-cyan-300/55 shadow-[0_20px_48px_rgba(34,211,238,0.25),inset_0_1px_0_rgba(255,255,255,0.25)] min-w-0 lg:min-w-[206px] xl:min-w-[218px]">
              <div className="pointer-events-none absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-cyan-400/20 blur-2xl" aria-hidden="true" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-4 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-emerald-400 to-teal-300 shadow-[0_0_14px_rgba(34,211,238,0.7)]"
              />
              <div className="relative z-10 flex items-center justify-between gap-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.14em] sm:tracking-[0.2em] text-cyan-200">
                <span>BÀI THI</span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-cyan-400/22 border border-cyan-300/45 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
                  <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" aria-hidden="true" />
                </span>
              </div>
              <div className="relative z-10 mt-2.5 sm:mt-3 flex items-center justify-between gap-2 sm:gap-3">
                <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums leading-none min-w-0">
                  {examResult ? (
                    <>
                      {examResult.totalScore}
                      <span className="text-[11px] sm:text-xs font-sans font-bold text-cyan-200/80 ml-1">/ 100</span>
                    </>
                  ) : (
                    <span className="text-sm sm:text-lg font-extrabold text-cyan-100">Chưa thi</span>
                  )}
                </div>
                <svg viewBox="0 0 48 48" className="w-10 h-10 sm:w-13 sm:h-13 shrink-0 drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="monthExamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67E8F9" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="21" fill="none" stroke="rgba(56,189,248,0.2)" strokeWidth="1" strokeDasharray="2 3" />
                  <circle cx="24" cy="24" r="17" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
                  <circle
                    cx="24"
                    cy="24"
                    r="17"
                    fill="none"
                    stroke="url(#monthExamGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.max(4, Math.round(((examResult ? examResult.totalScore : 0) / 100) * 106.8))} 106.8`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27.5" textAnchor="middle" className="fill-emerald-200 text-[10px] font-black tabular-nums">
                    {examResult ? `${examResult.totalScore}%` : '0%'}
                  </text>
                </svg>
              </div>
              <div className="relative z-10 mt-2.5 sm:mt-3 h-1 rounded-full bg-white/10 overflow-hidden">
                <div
                  style={{ width: `${examResult ? Math.max(6, examResult.totalScore) : 0}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-emerald-400 to-teal-300 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Filter Tabs & Unlock Mode Toggle */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-7">
        <div className="flex flex-wrap items-center justify-between gap-3.5 sm:gap-4 mb-6">
          <div
            role="group"
            aria-label="Lọc theo tuần"
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.22),_transparent_50%),radial-gradient(ellipse_at_right,_rgba(192,132,252,0.24),_transparent_50%),linear-gradient(135deg,_rgba(8,12,44,0.96),_rgba(24,17,68,0.94))] border border-cyan-300/45 shadow-[0_14px_40px_rgba(3,7,24,0.74),0_0_26px_rgba(56,189,248,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl"
          >
            <button
              type="button"
              aria-pressed={selectedWeek === 'all'}
              onClick={() => setSelectedWeek('all')}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-[42px] ${
                selectedWeek === 'all'
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_26px_rgba(34,211,238,0.52),0_0_18px_rgba(232,121,249,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-cyan-100/90'
                  : 'bg-indigo-950/60 text-cyan-50 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-fuchsia-400/20 border border-indigo-300/25 hover:border-cyan-300/65 font-bold'
              }`}
            >
              Tất cả 30 ngày
            </button>
            {monthProgram.weeksMeta.map((w) => (
              <button
                key={w.weekNumber}
                type="button"
                aria-pressed={selectedWeek === w.weekNumber}
                onClick={() => setSelectedWeek(w.weekNumber)}
                className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-[42px] ${
                  selectedWeek === w.weekNumber
                    ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_26px_rgba(34,211,238,0.52),0_0_18px_rgba(232,121,249,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-cyan-100/90'
                    : 'bg-indigo-950/60 text-cyan-50 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-fuchsia-400/20 border border-indigo-300/25 hover:border-cyan-300/65 font-bold'
                }`}
              >
                {w.shortLabel}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-pressed={unlockAllPreview}
            onClick={() => setUnlockAllPreview(!unlockAllPreview)}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-[13px] flex items-center gap-2 border transition-all duration-200 cursor-pointer min-h-[44px] whitespace-nowrap backdrop-blur-xl shadow-[0_12px_28px_rgba(3,7,24,0.5)] ${
              unlockAllPreview
                ? 'bg-emerald-500/22 border-emerald-300/70 text-emerald-100 shadow-[0_0_22px_rgba(52,211,153,0.28)]'
                : 'bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.16),_transparent_60%),linear-gradient(135deg,_rgba(8,12,44,0.96),_rgba(24,17,68,0.94))] border-cyan-300/40 text-white hover:border-cyan-300/75 hover:bg-cyan-400/15'
            }`}
          >
            {unlockAllPreview ? (
              <>
                <Unlock className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                <span>Mở Toàn Bộ 30 Ngày</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
                <span>Mở Khóa Tuần Tự</span>
              </>
            )}
          </button>
        </div>

        {/* 30-Day Cosmic Grid (matching Grade Hub zero-pill card design) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDays.map((dayPlan) => {
            const unlocked = isDayUnlocked(dayPlan.dayNumber);
            const progress = completedDays[dayPlan.dayNumber];
            const isDone = !!progress;
            const savedCount = isDone
              ? dayPlan.questions.length
              : getSavedDaySolvedCount(monthProgram.monthNumber, dayPlan.dayNumber);
            const isCurrentTarget = dayPlan.dayNumber === nextActiveDayNumber;
            const cleanTitle = dayPlan.title.replace(/^Ngày\s+\d+\s*:\s*/i, '');

            return (
              <button
                key={dayPlan.id}
                type="button"
                disabled={!unlocked}
                onClick={() => {
                  if (unlocked) onSelectDay(dayPlan);
                }}
                aria-label={`Ngày ${dayPlan.dayNumber}: ${cleanTitle}`}
                className={`group relative overflow-hidden rounded-3xl p-6 border text-left transition-all duration-200 min-h-[144px] flex flex-col justify-between backdrop-blur-xl ${
                  unlocked
                    ? isCurrentTarget
                      ? 'bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.22),_transparent_55%),linear-gradient(145deg,_rgba(20,30,96,0.96),_rgba(40,18,96,0.96))] border-cyan-300/85 animate-cosmic-beacon hover:-translate-y-1.5 hover:border-cyan-200 hover:shadow-[0_0_40px_rgba(34,211,238,0.46),0_18px_46px_rgba(192,132,252,0.3)] cursor-pointer'
                      : isDone
                      ? 'bg-gradient-to-br from-[#12265B]/95 to-[#0D1A44]/95 border-emerald-400/60 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_0_34px_rgba(52,211,153,0.34),0_16px_40px_rgba(34,211,238,0.2)] shadow-lg cursor-pointer'
                      : 'bg-gradient-to-br from-[#101A50]/95 via-[#13194D]/95 to-[#1B1248]/95 border-indigo-400/35 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_0_34px_rgba(34,211,238,0.36),0_18px_44px_rgba(168,85,247,0.24)] shadow-md cursor-pointer'
                    : 'bg-[#070B22]/85 border-indigo-400/20 text-indigo-200/75 shadow-sm cursor-not-allowed'
                }`}
              >
                {unlocked && (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.18),_transparent_60%),radial-gradient(ellipse_at_bottom_left,_rgba(217,70,239,0.14),_transparent_60%)]"
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-0 inset-x-5 h-[2.5px] rounded-full transition-all ${
                        isCurrentTarget
                          ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-400 opacity-100 shadow-[0_0_16px_rgba(34,211,238,0.85)]'
                          : isDone
                          ? 'bg-gradient-to-r from-emerald-300 to-cyan-400 opacity-85 group-hover:opacity-100'
                          : 'bg-gradient-to-r from-cyan-400 to-fuchsia-400 opacity-50 group-hover:opacity-100 group-hover:shadow-[0_0_14px_rgba(34,211,238,0.8)]'
                      }`}
                    />
                  </>
                )}
                <div className="relative z-10 w-full space-y-3">
                  {/* Quiet Unboxed Metadata Kicker (Zero-Pill Rule, identical to Grade Hub) */}
                  <div className="flex items-center justify-between gap-2 text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-cyan-300 min-w-0">
                      {isCurrentTarget && unlocked && (
                        <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.95)] animate-ping shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-sm font-extrabold text-white tabular-nums whitespace-nowrap shrink-0">
                        Ngày {dayPlan.dayNumber}
                      </span>
                      <span aria-hidden="true" className="text-indigo-400 shrink-0">·</span>
                      <span className="truncate text-cyan-200/90 font-semibold">
                        {dayPlan.topicTag}
                      </span>
                    </div>

                    {isDone ? (
                      <span className="text-emerald-300 font-black inline-flex items-center gap-1 tabular-nums whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        {progress.score}/{progress.totalQuestions}
                      </span>
                    ) : savedCount > 0 ? (
                      <span className="text-cyan-300 font-black tabular-nums whitespace-nowrap shrink-0">
                        {savedCount}/{dayPlan.questions.length} câu
                      </span>
                    ) : unlocked ? (
                      <span className="text-cyan-200 group-hover:text-fuchsia-200 font-black inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                        Sẵn sàng
                      </span>
                    ) : (
                      <span className="text-indigo-300/70 font-semibold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                        <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                        Chưa mở
                      </span>
                    )}
                  </div>

                  {/* Day Lesson Title */}
                  <h3
                    className={`text-lg font-extrabold font-display leading-snug tracking-tight ${
                      unlocked
                        ? 'text-white group-hover:text-cyan-200 transition-colors'
                        : 'text-indigo-200/75'
                    }`}
                  >
                    {cleanTitle}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Final Assessment Callout Card (harmonized with deep Cosmic Observatory theme) */}
        <div className="relative overflow-hidden mt-8 rounded-3xl bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.22),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(192,132,252,0.24),_transparent_52%),linear-gradient(135deg,_#0A1138_0%,_#181A5C_52%,_#2B1460_100%)] border border-cyan-300/45 p-6 sm:p-8 text-white shadow-[0_24px_60px_rgba(3,7,24,0.8),0_0_32px_rgba(56,189,248,0.16)] flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-400"
          />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-200">
              <Trophy className="w-4 h-4 text-amber-300" aria-hidden="true" />
              <span>Chặng Cuối {monthProgram.label}</span>
              <span aria-hidden="true" className="text-indigo-400">·</span>
              <span className="text-fuchsia-200">20 câu Cơ bản &amp; Tư duy Olympic</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-transparent">
              Bài Kiểm Tra Tổng Kết &amp; Đánh Giá Năng Lực {monthProgram.label}
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenExam}
            className="relative z-10 px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:from-cyan-200 hover:via-sky-200 hover:to-fuchsia-200 text-slate-950 font-black text-sm ring-2 ring-cyan-200/90 shadow-[0_0_32px_rgba(34,211,238,0.48),0_12px_34px_rgba(192,132,252,0.34)] hover:shadow-[0_0_42px_rgba(34,211,238,0.68),0_16px_42px_rgba(217,70,239,0.46)] flex items-center gap-2 shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[52px] whitespace-nowrap"
          >
            <Award className="w-5 h-5" aria-hidden="true" />
            <span>
              {examResult
                ? `Xem Báo Cáo & Chứng Nhận (${examResult.totalScore}/100đ)`
                : `Làm Bài Kiểm Tra Cuối ${monthProgram.label}`}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
