import React, { useState } from 'react';
import {
  GRADE_3_IN_MONTH_PROGRAMS,
  InMonthMonthProgram,
  getMonthStorageKeys,
} from '../../data/inMonthGrade3Catalog';
import { InMonthDayProgress } from './InMonthCalendarHub';
import { InMonthExamSavedResult } from './InMonthFinalExamModal';
import {
  Calendar,
  ChevronRight,
  Sparkles,
  Trophy,
  CheckCircle2,
  BookOpen,
  Orbit,
} from 'lucide-react';

interface InMonthGradeHubProps {
  onSelectMonth: (monthProgram: InMonthMonthProgram) => void;
  onQuickStartDay: (monthProgram: InMonthMonthProgram, dayNumber: number) => void;
}

function readMonthProgressSummary(monthNumber: number): {
  completedCount: number;
  examScore: number | null;
  nextDayNumber: number;
} {
  const keys = getMonthStorageKeys(monthNumber);
  let completedDays: Record<number, InMonthDayProgress> = {};
  let examResult: InMonthExamSavedResult | null = null;

  try {
    const rawDays = localStorage.getItem(keys.completedDaysKey);
    if (rawDays) completedDays = JSON.parse(rawDays);
  } catch {
    completedDays = {};
  }

  try {
    const rawExam = localStorage.getItem(keys.examResultKey);
    if (rawExam) examResult = JSON.parse(rawExam);
  } catch {
    examResult = null;
  }

  const completedCount = Object.keys(completedDays).length;
  let nextDayNumber = 30;
  for (let d = 1; d <= 30; d++) {
    if (!completedDays[d]) {
      nextDayNumber = d;
      break;
    }
  }

  return {
    completedCount,
    examScore: examResult ? examResult.totalScore : null,
    nextDayNumber,
  };
}

export const InMonthGradeHub: React.FC<InMonthGradeHubProps> = ({
  onSelectMonth,
  onQuickStartDay,
}) => {
  const [semesterFilter, setSemesterFilter] = useState<'all' | 1 | 2>('all');

  const monthSummaries = GRADE_3_IN_MONTH_PROGRAMS.map((prog) => ({
    program: prog,
    ...readMonthProgressSummary(prog.monthNumber),
  }));

  const totalCompletedDays = monthSummaries.reduce(
    (sum, item) => sum + item.completedCount,
    0
  );
  const completedExamsCount = monthSummaries.filter(
    (item) => item.examScore !== null
  ).length;

  // Featured resume target: Month with in-progress days or Tháng 11 by default
  const featuredItem =
    monthSummaries.find(
      (item) => item.completedCount > 0 && item.completedCount < 30
    ) ||
    monthSummaries.find((item) => item.program.monthNumber === 11) ||
    monthSummaries[0];

  const visibleMonths =
    semesterFilter === 'all'
      ? monthSummaries
      : monthSummaries.filter((item) => item.program.semester === semesterFilter);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_16%_14%,_rgba(34,211,238,0.2),_transparent_50%),radial-gradient(ellipse_at_84%_20%,_rgba(217,70,239,0.24),_transparent_52%),radial-gradient(ellipse_at_50%_90%,_rgba(251,191,36,0.12),_transparent_54%),linear-gradient(180deg,_#030617_0%,_#0A1038_46%,_#1A0E46_100%)] text-white pb-20 relative overflow-hidden">
      {/* Deep Space Ambient Nebula & Starfield Canvas */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-cyan-400/26 blur-[145px] cosmic-light-bloom" />
        <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full bg-fuchsia-500/26 blur-[145px] cosmic-light-bloom" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-amber-400/16 blur-[155px] cosmic-light-bloom" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-75">
          <circle cx="120" cy="140" r="1.8" fill="#67E8F9" />
          <circle cx="310" cy="80" r="1.5" fill="#FDE68A" />
          <circle cx="540" cy="210" r="2" fill="#FFFFFF" />
          <circle cx="790" cy="110" r="1.6" fill="#F9A8D4" />
          <circle cx="1040" cy="190" r="2" fill="#67E8F9" />
          <circle cx="1310" cy="120" r="1.6" fill="#FDE68A" />
          <circle cx="190" cy="460" r="1.7" fill="#FFFFFF" />
          <circle cx="430" cy="540" r="1.8" fill="#67E8F9" />
          <circle cx="680" cy="490" r="1.5" fill="#F9A8D4" />
          <circle cx="960" cy="610" r="1.9" fill="#FDE68A" />
          <circle cx="1240" cy="520" r="1.7" fill="#67E8F9" />
          <circle cx="280" cy="790" r="1.8" fill="#F9A8D4" />
          <circle cx="840" cy="820" r="1.7" fill="#FFFFFF" />
          <circle cx="1350" cy="780" r="2" fill="#67E8F9" />
        </svg>
      </div>

      {/* Top Observatory Telemetry & Breadcrumb Bar */}
      <div className="relative z-10 border-b border-cyan-300/25 bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.14),_transparent_50%),linear-gradient(180deg,_rgba(7,11,34,0.97),_rgba(11,17,48,0.93))] backdrop-blur-2xl shadow-[0_10px_32px_rgba(3,7,24,0.6)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Phân cấp chương trình" className="flex items-center gap-2 text-xs sm:text-sm font-bold flex-wrap">
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-400/20 to-orange-400/15 border border-amber-300/45 text-amber-200 font-black text-xs inline-flex items-center gap-1.5 shadow-[0_0_16px_rgba(251,191,36,0.18)]">
              <Orbit className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              <span>MINDMATH K12</span>
            </span>
            <ChevronRight className="w-4 h-4 text-cyan-300/60 shrink-0" aria-hidden="true" />
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.08] border border-white/15 text-white text-xs font-extrabold">
              Lớp 3
            </span>
            <ChevronRight className="w-4 h-4 text-cyan-300/60 shrink-0" aria-hidden="true" />
            <span className="text-cyan-100/95 text-xs sm:text-sm font-semibold">Chương Trình Theo Tháng</span>
          </nav>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/10 text-[11px] font-bold text-cyan-200/90 tabular-nums">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
            <span>12 tháng · 360 ngày rèn luyện</span>
          </div>
        </div>
      </div>

      {/* Grade 3 Overview Hero (Ethereal Luminous Cosmic Observatory) */}
      <div className="relative z-10 overflow-hidden border-b border-cyan-300/50 bg-[radial-gradient(ellipse_at_14%_18%,_rgba(34,211,238,0.36),_transparent_48%),radial-gradient(ellipse_at_84%_20%,_rgba(217,70,239,0.36),_transparent_48%),radial-gradient(ellipse_at_54%_96%,_rgba(251,191,36,0.24),_transparent_52%),linear-gradient(118deg,_#030618_0%,_#090E36_46%,_#1B0C4A_100%)] backdrop-blur-2xl px-4 sm:px-6 py-8 sm:py-12 lg:py-14 shadow-[0_32px_86px_rgba(3,7,24,0.88),0_0_52px_rgba(34,211,238,0.22)]">
        {/* Ethereal Multi-Spectrum Aurora Orbs */}
        <div className="pointer-events-none absolute -top-24 left-12 w-80 sm:w-[440px] h-80 sm:h-[440px] rounded-full bg-cyan-400/28 blur-[115px] cosmic-light-bloom" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-16 right-1/4 w-80 sm:w-[440px] h-80 sm:h-[440px] rounded-full bg-fuchsia-500/26 blur-[120px] cosmic-light-bloom" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 right-12 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-amber-400/20 blur-[115px] cosmic-light-bloom" aria-hidden="true" />

        {/* Calibrated Celestial Astrolabe & Ringed Planet Backdrop */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 380"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 w-full h-full opacity-95"
        >
          <defs>
            <radialGradient id="gradeHeroGlow" cx="85%" cy="32%" r="40%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.38)" />
              <stop offset="45%" stopColor="rgba(232,121,249,0.22)" />
              <stop offset="75%" stopColor="rgba(56,189,248,0.16)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0)" />
            </radialGradient>
            <radialGradient id="gradePlanetFill" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.92" />
              <stop offset="38%" stopColor="#38BDF8" stopOpacity="0.54" />
              <stop offset="76%" stopColor="#A855F7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#070B22" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="gradeCometGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(103,232,249,0)" />
              <stop offset="60%" stopColor="rgba(103,232,249,0.52)" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
            <linearGradient id="gradeRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.24)" />
              <stop offset="50%" stopColor="rgba(251,191,36,0.78)" />
              <stop offset="100%" stopColor="rgba(232,121,249,0.48)" />
            </linearGradient>
          </defs>
          <rect width="1200" height="380" fill="url(#gradeHeroGlow)" />

          {/* Astrolabe Orbital Trajectories */}
          <circle cx="1030" cy="116" r="190" fill="none" stroke="rgba(56,189,248,0.28)" strokeWidth="1.2" strokeDasharray="6 8" />
          <circle cx="1030" cy="116" r="270" fill="none" stroke="rgba(251,191,36,0.22)" strokeWidth="1.1" />
          <circle cx="1030" cy="116" r="350" fill="none" stroke="rgba(232,121,249,0.22)" strokeWidth="1.1" strokeDasharray="3 10" />

          {/* Luminous Planet & Dual Tilted Rings */}
          <circle cx="1030" cy="116" r="62" fill="url(#gradePlanetFill)" stroke="rgba(186,230,253,0.68)" strokeWidth="1.4" />
          <ellipse cx="1030" cy="116" rx="134" ry="29" transform="rotate(-18 1030 116)" fill="none" stroke="url(#gradeRingGrad)" strokeWidth="2.1" />
          <ellipse cx="1030" cy="116" rx="112" ry="22" transform="rotate(14 1030 116)" fill="none" stroke="rgba(103,232,249,0.34)" strokeWidth="1.2" strokeDasharray="4 6" />
          <circle cx="904" cy="156" r="4.2" fill="#67E8F9" />
          <circle cx="1156" cy="76" r="4.6" fill="#FDE68A" />

          {/* Comet Arc */}
          <line x1="680" y1="24" x2="804" y2="74" stroke="url(#gradeCometGrad)" strokeWidth="1.9" strokeLinecap="round" />
          <circle cx="804" cy="74" r="2.8" fill="#FEF08A" />

          {/* Subtle Constellation Starfield */}
          <polyline points="560,46 675,88 805,36 920,76" fill="none" stroke="rgba(103,232,249,0.22)" strokeWidth="1.1" strokeDasharray="3 5" />
          <path d="M560 39 L562 44 L567 46 L562 48 L560 53 L558 48 L553 46 L558 44 Z" fill="#FDE68A" />
          <path d="M805 28 L807 34 L813 36 L807 38 L805 44 L803 38 L797 36 L803 34 Z" fill="#67E8F9" />
          <circle cx="675" cy="88" r="2" fill="#FFFFFF" />
          <circle cx="1142" cy="198" r="2.3" fill="#FDE68A" />
          <circle cx="790" cy="312" r="1.9" fill="#F9A8D4" />
          <circle cx="480" cy="322" r="1.7" fill="#67E8F9" />
        </svg>

        {/* Top & Bottom Intense Aurora Horizon Beams */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300 via-50% to-transparent shadow-[0_0_24px_rgba(34,211,238,0.95),0_0_40px_rgba(217,70,239,0.5)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-fuchsia-400 via-50% to-transparent shadow-[0_0_22px_rgba(232,121,249,0.85),0_0_38px_rgba(251,191,36,0.45)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Left Editorial Typography & Action Stage */}
          <div className="space-y-4 sm:space-y-5 w-full lg:max-w-2xl relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -top-2 h-36 rounded-full bg-[radial-gradient(ellipse_at_30%_50%,_rgba(34,211,238,0.34),_rgba(217,70,239,0.22)_50%,_transparent_75%)] blur-2xl cosmic-light-bloom"
            />
            <div className="relative inline-flex items-center gap-2.5 text-[11px] sm:text-xs font-extrabold tracking-[0.2em] uppercase text-cyan-200 drop-shadow-[0_0_14px_rgba(34,211,238,0.8)]">
              <Orbit className="w-4 h-4 text-amber-300 shrink-0 drop-shadow-[0_0_12px_rgba(251,191,36,0.95)]" aria-hidden="true" />
              <span>Hành trình vũ trụ khám phá</span>
              <span aria-hidden="true" className="hidden sm:inline-block w-12 h-[1.5px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-transparent shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            </div>

            <div className="relative space-y-3">
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[58px] font-black tracking-tight leading-[1.06] [text-wrap:balance]">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent [filter:drop-shadow(0_2px_4px_rgba(2,6,23,0.98))_drop-shadow(0_0_22px_rgba(34,211,238,0.95))_drop-shadow(0_0_52px_rgba(168,85,247,0.68))]">
                  Toán Tư Duy
                </span>{' '}
                <span className="whitespace-nowrap bg-gradient-to-r from-amber-200 via-pink-200 to-fuchsia-300 bg-clip-text text-transparent [filter:drop-shadow(0_2px_4px_rgba(2,6,23,0.98))_drop-shadow(0_0_22px_rgba(251,191,36,0.92))_drop-shadow(0_0_52px_rgba(236,72,153,0.7))]">
                  Lớp 3
                </span>
              </h1>
              <span
                aria-hidden="true"
                className="block h-[3.5px] w-44 sm:w-64 rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 shadow-[0_0_26px_rgba(34,211,238,0.95),0_0_48px_rgba(217,70,239,0.65)]"
              />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() =>
                  onQuickStartDay(featuredItem.program, featuredItem.nextDayNumber)
                }
                className="justify-center px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 hover:from-cyan-200 hover:via-white hover:to-fuchsia-200 text-slate-950 font-black text-sm sm:text-base ring-2 ring-cyan-200/90 shadow-[0_0_38px_rgba(34,211,238,0.72),0_0_72px_rgba(217,70,239,0.48),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_0_54px_rgba(34,211,238,0.92),0_0_92px_rgba(217,70,239,0.68)] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[48px] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>
                  Học Tiếp: {featuredItem.program.label} · Ngày {featuredItem.nextDayNumber}
                </span>
                <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onSelectMonth(featuredItem.program)}
                className="justify-center px-5 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-cyan-400/20 border border-cyan-300/45 hover:border-cyan-200/80 text-cyan-50 font-bold text-sm shadow-[0_0_24px_rgba(34,211,238,0.16)] hover:shadow-[0_0_32px_rgba(34,211,238,0.36)] flex items-center gap-2 transition-all duration-200 cursor-pointer min-h-[48px] backdrop-blur-xl whitespace-nowrap"
              >
                <Calendar className="w-4 h-4 text-cyan-300 shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.85)]" aria-hidden="true" />
                <span>Xem Lịch {featuredItem.program.label}</span>
              </button>
            </div>
          </div>

          {/* Right Unified Celestial Telemetry Instrument Deck */}
          <div className="relative overflow-hidden rounded-3xl bg-[#070D28]/88 backdrop-blur-2xl border border-cyan-300/45 shadow-[0_24px_60px_rgba(2,6,23,0.8),0_0_42px_rgba(34,211,238,0.22),0_0_68px_rgba(217,70,239,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] grid grid-cols-2 divide-x divide-cyan-300/20 w-full lg:w-auto lg:min-w-[430px] xl:min-w-[460px] shrink-0">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
            />

            {/* Telemetry Cell 1: Progress */}
            <div className="p-4 sm:p-6 flex flex-col justify-between gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300/90">
                Tiến độ năm học
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums leading-none">
                  {totalCompletedDays}
                  <span className="text-xs font-mono font-bold text-slate-400 ml-1.5">/ 360</span>
                </div>
                <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradeProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67E8F9" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    fill="none"
                    stroke="url(#gradeProgressGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.max(4, Math.round((totalCompletedDays / 360) * 113.1))} 113.1`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27.5" textAnchor="middle" className="fill-cyan-100 text-[10px] font-black font-mono tabular-nums">
                    {Math.round((totalCompletedDays / 360) * 100)}%
                  </text>
                </svg>
              </div>
              <span className="text-xs text-slate-400 font-medium tabular-nums">
                Đã hoàn thành {totalCompletedDays} ngày
              </span>
            </div>

            {/* Telemetry Cell 2: Completed Exams */}
            <div className="p-4 sm:p-6 flex flex-col justify-between gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300/90">
                Bài thi tháng
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl sm:text-3xl font-black font-display text-white tabular-nums leading-none">
                  {completedExamsCount}
                  <span className="text-xs font-mono font-bold text-slate-400 ml-1.5">/ 12</span>
                </div>
                <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="gradeExamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67E8F9" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="3.5" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    fill="none"
                    stroke="url(#gradeExamGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.max(4, Math.round((completedExamsCount / 12) * 113.1))} 113.1`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27.5" textAnchor="middle" className="fill-emerald-200 text-[10px] font-black font-mono tabular-nums">
                    {Math.round((completedExamsCount / 12) * 100)}%
                  </text>
                </svg>
              </div>
              <span className="text-xs text-slate-400 font-medium tabular-nums">
                {completedExamsCount} tháng đã đánh giá
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Semester Filter Bar & 12-Month Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-7">
        <div className="flex flex-wrap items-center justify-start gap-4 mb-6">
          <div
            role="group"
            aria-label="Lọc theo học kỳ"
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.22),_transparent_50%),radial-gradient(ellipse_at_right,_rgba(192,132,252,0.24),_transparent_50%),linear-gradient(135deg,_rgba(8,12,44,0.96),_rgba(24,17,68,0.94))] border border-cyan-300/45 shadow-[0_14px_40px_rgba(3,7,24,0.74),0_0_26px_rgba(56,189,248,0.16),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl"
          >
            <button
              type="button"
              aria-pressed={semesterFilter === 'all'}
              onClick={() => setSemesterFilter('all')}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-[42px] ${
                semesterFilter === 'all'
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_26px_rgba(34,211,238,0.52),0_0_18px_rgba(232,121,249,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-cyan-100/90'
                  : 'bg-indigo-950/60 text-cyan-50 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-fuchsia-400/20 border border-indigo-300/25 hover:border-cyan-300/65 font-bold'
              }`}
            >
              Tất cả 12 tháng
            </button>
            <button
              type="button"
              aria-pressed={semesterFilter === 1}
              onClick={() => setSemesterFilter(1)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-[42px] ${
                semesterFilter === 1
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_26px_rgba(34,211,238,0.52),0_0_18px_rgba(232,121,249,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-cyan-100/90'
                  : 'bg-indigo-950/60 text-cyan-50 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-fuchsia-400/20 border border-indigo-300/25 hover:border-cyan-300/65 font-bold'
              }`}
            >
              Học kỳ 1 (T6–T11)
            </button>
            <button
              type="button"
              aria-pressed={semesterFilter === 2}
              onClick={() => setSemesterFilter(2)}
              className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-[42px] ${
                semesterFilter === 2
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_26px_rgba(34,211,238,0.52),0_0_18px_rgba(232,121,249,0.32),inset_0_1px_0_rgba(255,255,255,0.8)] ring-1 ring-cyan-100/90'
                  : 'bg-indigo-950/60 text-cyan-50 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/20 hover:to-fuchsia-400/20 border border-indigo-300/25 hover:border-cyan-300/65 font-bold'
              }`}
            >
              Học kỳ 2 (T12–T5)
            </button>
          </div>
        </div>

        {/* 12-Month Curriculum Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleMonths.map(({ program, completedCount, examScore, nextDayNumber }) => {
            const pct = Math.round((completedCount / 30) * 100);
            const isNovember = program.monthNumber === 11;
            const isStarted = completedCount > 0;

            return (
              <button
                key={program.id}
                type="button"
                onClick={() => onSelectMonth(program)}
                className={`group relative overflow-hidden rounded-3xl p-6 border text-left transition-all duration-200 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer backdrop-blur-xl ${
                  isNovember
                    ? 'bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.26),_transparent_52%),linear-gradient(145deg,_rgba(20,30,96,0.96),_rgba(40,18,96,0.96))] border-cyan-300/90 animate-cosmic-beacon hover:border-cyan-200 hover:shadow-[0_0_48px_rgba(34,211,238,0.52),0_18px_50px_rgba(192,132,252,0.36)]'
                    : isStarted
                    ? 'bg-gradient-to-br from-[#12265B]/95 to-[#0D1A44]/95 border-emerald-400/65 hover:border-cyan-200 shadow-[0_14px_34px_rgba(3,7,24,0.55),0_0_20px_rgba(52,211,153,0.16)] hover:shadow-[0_0_42px_rgba(52,211,153,0.42),0_16px_44px_rgba(34,211,238,0.28)]'
                    : 'bg-gradient-to-br from-[#101A50]/95 via-[#13194D]/95 to-[#1B1248]/95 border-cyan-300/30 hover:border-cyan-200 shadow-[0_14px_34px_rgba(3,7,24,0.55),0_0_18px_rgba(34,211,238,0.1)] hover:shadow-[0_0_44px_rgba(34,211,238,0.44),0_18px_48px_rgba(168,85,247,0.32)]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.24),_transparent_60%),radial-gradient(ellipse_at_bottom_left,_rgba(217,70,239,0.18),_transparent_60%)]"
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 inset-x-5 h-[2.5px] rounded-full bg-gradient-to-r ${program.accentGradient} opacity-85 shadow-[0_0_12px_rgba(34,211,238,0.45)] group-hover:opacity-100 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.95)] transition-all`}
                />
                <div className="relative z-10 w-full space-y-3">
                  {/* Quiet Unboxed Metadata Kicker (Zero-Pill Rule) */}
                  <div className="flex items-center justify-between gap-2 text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-cyan-300 tabular-nums">
                      {isNovember && (
                        <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.95)] animate-ping shrink-0" aria-hidden="true" />
                      )}
                      <span className="text-sm font-extrabold text-white">{program.label}</span>
                      <span aria-hidden="true" className="text-indigo-400">·</span>
                      <span>Học kỳ {program.semester}</span>
                      <span aria-hidden="true" className="text-indigo-400">·</span>
                      <span>30 ngày</span>
                    </div>

                    {examScore !== null ? (
                      <span className="text-emerald-300 font-black inline-flex items-center gap-1 tabular-nums whitespace-nowrap">
                        <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
                        {examScore}/100đ
                      </span>
                    ) : completedCount === 30 ? (
                      <span className="text-emerald-300 font-black inline-flex items-center gap-1 whitespace-nowrap">
                        <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                        Hoàn tất
                      </span>
                    ) : null}
                  </div>

                  {/* Month Title */}
                  <h3 className="text-lg font-extrabold font-display text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {program.title}
                  </h3>

                  {/* 3 Concise Syllabus Topic Lines */}
                  <ul className="space-y-1.5 pt-1">
                    {program.topics.map((topic, tIdx) => (
                      <li
                        key={tIdx}
                        className="text-xs text-indigo-100/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-cyan-400 font-bold mt-0.5" aria-hidden="true">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clean Progress Strip & Single-Line Action */}
                <div className="relative z-10 w-full mt-5 pt-4 border-t border-white/10 space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold tabular-nums">
                      <span className="text-indigo-200">Tiến độ tháng</span>
                      <span className="text-white">{completedCount}/30 ngày ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-900/80 overflow-hidden">
                      <div
                        style={{ width: `${Math.max(completedCount > 0 ? 4 : 0, pct)}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 transition-all duration-300 shadow-[0_0_10px_rgba(34,211,238,0.45)]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-black">
                    <span className="text-indigo-200/90 inline-flex items-center gap-1.5 font-semibold">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                      <span>330 bài tập · Bài thi 20 câu</span>
                    </span>
                    <span className="text-cyan-300 group-hover:text-fuchsia-200 inline-flex items-center gap-1 whitespace-nowrap transition-colors">
                      <span>
                        {completedCount > 0 && completedCount < 30
                          ? `Tiếp Ngày ${nextDayNumber}`
                          : `Mở ${program.label}`}
                      </span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
