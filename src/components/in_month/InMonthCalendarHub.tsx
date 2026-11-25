import React, { useState, useEffect } from 'react';
import { InMonthDayPlan } from '../../data/inMonthNovemberData';
import {
  InMonthMonthProgram,
  getMonthStorageKeys,
} from '../../data/inMonthGrade3Catalog';
import {
  InMonthWeeklyTest,
  InMonthWeeklyTestSavedResult,
} from '../../data/inMonthWeeklyTestsData';
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
  Clock,
  Calculator,
  MessageSquareQuote,
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
  weeklyTestResults?: Record<number, InMonthWeeklyTestSavedResult>;
  isTeacherMode?: boolean;
  onSelectDay: (dayPlan: InMonthDayPlan) => void;
  onOpenExam: () => void;
  onOpenWeeklyTest?: (weeklyTest: InMonthWeeklyTest) => void;
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
  weeklyTestResults = {},
  isTeacherMode = false,
  onSelectDay,
  onOpenExam,
  onOpenWeeklyTest,
  onBackToGrade,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [unlockAllPreview, setUnlockAllPreview] = useState<boolean>(true);
  const effectiveUnlockAll = unlockAllPreview || isTeacherMode;

  useEffect(() => {
    setSelectedWeek('all');
  }, [monthProgram.monthNumber]);

  const totalDays = monthProgram.days.length;
  const totalWeeks = monthProgram.weeksMeta.length;
  const unitLabel = monthProgram.unitLabel || 'Ngày';
  const unitLower = unitLabel.toLowerCase();
  const completedCount = monthProgram.days.filter((d) => !!completedDays[d.dayNumber]).length;
  const progressPct = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;
  const weeklyTests = monthProgram.weeklyTests || [];

  const examQuestions = monthProgram.finalExam.questions;
  const examPartACount = examQuestions.filter((q) => q.part === 'A').length;
  const examPartBCount = examQuestions.filter((q) => q.part === 'B').length;
  const examPartCCount = examQuestions.filter((q) => q.part === 'C').length;
  const examDurationText =
    monthProgram.finalExam.durationRangeLabel || `${monthProgram.finalExam.durationMinutes} phút`;
  const examSummaryBadge =
    examPartCCount > 0
      ? `${examPartACount} Cơ bản · ${examPartBCount} Olympic · ${examPartCCount} Nghị luận · ${examDurationText}`
      : `${examQuestions.length} câu Cơ bản & Tư duy Olympic · ${examDurationText}`;

  // Sequential unlock + Weekly 15-minute test gate:
  // Session 1 is open; Session N opens when Session N-1 is completed AND all prior weeks' 15-minute tests are passed
  const getBlockingWeeklyTestForDay = (dayNum: number): InMonthWeeklyTest | null => {
    if (effectiveUnlockAll || weeklyTests.length === 0) return null;
    for (const wt of weeklyTests) {
      if (wt.triggerAfterDayNumber < dayNum) {
        const res = weeklyTestResults[wt.weekNumber];
        if (!res || !res.passed) {
          return wt;
        }
      }
    }
    return null;
  };

  const isDayUnlocked = (dayNum: number) => {
    if (effectiveUnlockAll) return true;
    if (dayNum === 1) return true;
    if (!completedDays[dayNum - 1]) return false;
    if (getBlockingWeeklyTestForDay(dayNum)) return false;
    return true;
  };

  const isWeeklyTestUnlocked = (wt: InMonthWeeklyTest) => {
    if (effectiveUnlockAll) return true;
    return !!completedDays[wt.triggerAfterDayNumber];
  };

  const nextActiveDayNumber = (() => {
    for (let d = 1; d <= totalDays; d++) {
      if (!completedDays[d]) return d;
    }
    return totalDays;
  })();

  const pendingWeeklyTest: InMonthWeeklyTest | null = (() => {
    for (const wt of weeklyTests) {
      if (completedDays[wt.triggerAfterDayNumber] && !weeklyTestResults[wt.weekNumber]?.passed) {
        return wt;
      }
    }
    return null;
  })();

  const filteredDays =
    selectedWeek === 'all'
      ? monthProgram.days
      : monthProgram.days.filter((d) => d.weekNumber === selectedWeek);

  return (
    <div className="min-h-screen mm-cosmic-canvas pb-20 relative overflow-hidden">
      {/* Deep Space Ambient Nebula & Starfield Canvas */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-cyan-400/20 blur-[145px] cosmic-light-bloom" />
        <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full bg-fuchsia-500/18 blur-[145px] cosmic-light-bloom" />
        <div className="absolute bottom-0 left-1/3 w-[520px] h-[520px] rounded-full bg-amber-400/12 blur-[155px] cosmic-light-bloom" />
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
      <div className="relative z-10 border-b border-[color:color-mix(in_oklch,var(--mm-cyan-border)_52%,transparent)] bg-[color:color-mix(in_oklch,var(--mm-surface-inset)_92%,transparent)] backdrop-blur-2xl shadow-[0_10px_32px_rgba(3,7,24,0.6)]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Điều hướng chương trình theo tháng" className="flex items-center gap-2 text-xs sm:text-sm font-bold flex-wrap">
            <button
              type="button"
              onClick={onBackToGrade}
              className="px-3.5 py-2 rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 text-[color:var(--mm-ink-primary)] font-bold text-xs flex items-center gap-1.5 border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_55%,transparent)] hover:border-[color:var(--mm-cyan-accent)] shadow-[0_0_16px_rgba(34,211,238,0.14)] transition-all duration-200 cursor-pointer min-h-[38px] whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
              <span>Lớp 3 · Các Tháng</span>
            </button>
            <ChevronRight className="w-4 h-4 text-[color:var(--mm-ink-muted)] shrink-0" aria-hidden="true" />
            <span className="px-3 py-1 rounded-xl bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_55%,transparent)] border border-[color:var(--mm-amber-border)] text-[color:var(--mm-amber-text)] font-black text-xs inline-flex items-center gap-1.5 shadow-[0_0_16px_rgba(251,191,36,0.16)] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--mm-amber-brightFill)] shadow-[0_0_8px_rgba(251,191,36,0.9)]" aria-hidden="true" />
              <span>{monthProgram.label}</span>
            </span>
            <span aria-hidden="true" className="text-[color:var(--mm-ink-muted)] hidden sm:inline">·</span>
            <span className="text-[color:var(--mm-ink-secondary)] font-semibold hidden sm:inline truncate max-w-md text-xs sm:text-sm">
              {monthProgram.title}
            </span>
          </nav>

          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.05] border border-white/15 text-[11px] font-bold text-[color:var(--mm-cyan-text)] tabular-nums">
            <Orbit className="w-3.5 h-3.5 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
            <span>{totalDays} {unitLower} · {completedCount}/{totalDays} hoàn thành</span>
          </div>
        </div>
      </div>

      {/* Month Overview Hero (Ethereal Luminous Cosmic Observatory) */}
      <div className="relative z-10 overflow-hidden border-b border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] bg-[radial-gradient(ellipse_at_14%_18%,_color-mix(in_oklch,var(--mm-cyan-accent)_22%,transparent),_transparent_50%),radial-gradient(ellipse_at_84%_20%,_color-mix(in_oklch,var(--mm-violet-accent)_22%,transparent),_transparent_50%),radial-gradient(ellipse_at_54%_96%,_color-mix(in_oklch,var(--mm-amber-accent)_16%,transparent),_transparent_52%),linear-gradient(118deg,_var(--mm-canvas)_0%,_var(--mm-canvas-mid)_48%,_var(--mm-surface-1)_100%)] backdrop-blur-2xl px-4 sm:px-6 py-8 sm:py-12 lg:py-14 shadow-[0_32px_86px_rgba(3,7,24,0.88),0_0_52px_rgba(34,211,238,0.18)]">
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
            <radialGradient id="monthHeroGlow" cx="85%" cy="32%" r="40%">
              <stop offset="0%" stopColor="rgba(251,191,36,0.38)" />
              <stop offset="45%" stopColor="rgba(232,121,249,0.22)" />
              <stop offset="75%" stopColor="rgba(56,189,248,0.16)" />
              <stop offset="100%" stopColor="rgba(15,23,42,0)" />
            </radialGradient>
            <radialGradient id="monthPlanetFill" cx="32%" cy="28%" r="72%">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.92" />
              <stop offset="38%" stopColor="#38BDF8" stopOpacity="0.54" />
              <stop offset="76%" stopColor="#A855F7" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#070B22" stopOpacity="0.2" />
            </radialGradient>
            <linearGradient id="monthCometGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(103,232,249,0)" />
              <stop offset="60%" stopColor="rgba(103,232,249,0.52)" />
              <stop offset="100%" stopColor="#FEF08A" />
            </linearGradient>
            <linearGradient id="monthRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(56,189,248,0.24)" />
              <stop offset="50%" stopColor="rgba(251,191,36,0.78)" />
              <stop offset="100%" stopColor="rgba(232,121,249,0.48)" />
            </linearGradient>
          </defs>
          <rect width="1200" height="380" fill="url(#monthHeroGlow)" />

          {/* Astrolabe Orbital Trajectories */}
          <circle cx="1030" cy="116" r="190" fill="none" stroke="rgba(56,189,248,0.28)" strokeWidth="1.2" strokeDasharray="6 8" />
          <circle cx="1030" cy="116" r="270" fill="none" stroke="rgba(251,191,36,0.22)" strokeWidth="1.1" />
          <circle cx="1030" cy="116" r="350" fill="none" stroke="rgba(232,121,249,0.22)" strokeWidth="1.1" strokeDasharray="3 10" />

          {/* Luminous Planet & Dual Tilted Rings */}
          <circle cx="1030" cy="116" r="62" fill="url(#monthPlanetFill)" stroke="rgba(186,230,253,0.68)" strokeWidth="1.4" />
          <ellipse cx="1030" cy="116" rx="134" ry="29" transform="rotate(-18 1030 116)" fill="none" stroke="url(#monthRingGrad)" strokeWidth="2.1" />
          <ellipse cx="1030" cy="116" rx="112" ry="22" transform="rotate(14 1030 116)" fill="none" stroke="rgba(103,232,249,0.34)" strokeWidth="1.2" strokeDasharray="4 6" />
          <circle cx="904" cy="156" r="4.2" fill="#67E8F9" />
          <circle cx="1156" cy="76" r="4.6" fill="#FDE68A" />

          {/* Comet Arc */}
          <line x1="680" y1="24" x2="804" y2="74" stroke="url(#monthCometGrad)" strokeWidth="1.9" strokeLinecap="round" />
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
              <h1 className="font-display text-3xl sm:text-5xl lg:text-[56px] font-black tracking-tight leading-[1.08] [text-wrap:balance]">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent [filter:drop-shadow(0_2px_4px_rgba(2,6,23,0.98))_drop-shadow(0_0_22px_rgba(34,211,238,0.95))_drop-shadow(0_0_52px_rgba(168,85,247,0.68))]">
                  Toán Tư Duy
                </span>
                <span aria-hidden="true" className="mx-2.5 sm:mx-3.5 text-amber-300 text-2xl sm:text-3xl align-middle [filter:drop-shadow(0_0_20px_rgba(251,191,36,1))_drop-shadow(0_0_40px_rgba(232,121,249,0.85))] animate-pulse">
                  ✦
                </span>
                <span className="whitespace-nowrap bg-gradient-to-r from-amber-200 via-pink-200 to-fuchsia-300 bg-clip-text text-transparent [filter:drop-shadow(0_2px_4px_rgba(2,6,23,0.98))_drop-shadow(0_0_22px_rgba(251,191,36,0.92))_drop-shadow(0_0_52px_rgba(236,72,153,0.7))]">
                  {monthProgram.label}
                </span>
              </h1>
              <span
                aria-hidden="true"
                className="block h-[3.5px] w-44 sm:w-64 rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 shadow-[0_0_26px_rgba(34,211,238,0.95),0_0_48px_rgba(217,70,239,0.65)]"
              />
            </div>

            <div className="relative flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 pt-1">
              {pendingWeeklyTest && !effectiveUnlockAll && onOpenWeeklyTest ? (
                <button
                  type="button"
                  onClick={() => onOpenWeeklyTest(pendingWeeklyTest)}
                  className="justify-center px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-300 to-fuchsia-300 hover:from-amber-200 hover:via-white hover:to-fuchsia-200 text-slate-950 font-black text-sm sm:text-base ring-2 ring-amber-200/90 shadow-[0_0_38px_rgba(251,191,36,0.72),0_0_72px_rgba(217,70,239,0.48),inset_0_1px_0_rgba(255,255,255,0.95)] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[48px] whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Làm Kiểm Tra 15 Phút Tuần {pendingWeeklyTest.weekNumber} (Mở khóa tuần tiếp)</span>
                  <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const target =
                      monthProgram.days.find(
                        (d) => d.dayNumber === nextActiveDayNumber
                      ) || monthProgram.days[0];
                    onSelectDay(target);
                  }}
                  className="justify-center px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-200 to-fuchsia-300 hover:from-cyan-200 hover:via-white hover:to-fuchsia-200 text-slate-950 font-black text-sm sm:text-base ring-2 ring-cyan-200/90 shadow-[0_0_38px_rgba(34,211,238,0.72),0_0_72px_rgba(217,70,239,0.48),inset_0_1px_0_rgba(255,255,255,0.95)] hover:shadow-[0_0_54px_rgba(34,211,238,0.92),0_0_92px_rgba(217,70,239,0.68)] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[48px] whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Bắt Đầu Ngay: {unitLabel} {nextActiveDayNumber}/{totalDays}</span>
                  <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={onOpenExam}
                className="justify-center px-5 py-3.5 rounded-2xl bg-white/[0.08] hover:bg-cyan-400/20 border border-cyan-300/45 hover:border-cyan-200/80 text-cyan-50 font-bold text-sm shadow-[0_0_24px_rgba(34,211,238,0.16)] hover:shadow-[0_0_32px_rgba(34,211,238,0.36)] flex items-center gap-2 transition-all duration-200 cursor-pointer min-h-[48px] backdrop-blur-xl whitespace-nowrap"
              >
                <Trophy className="w-4 h-4 text-amber-300 shrink-0 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]" aria-hidden="true" />
                <span>
                  {examResult
                    ? `Xem Báo Cáo Cuối Tháng (${examResult.totalScore}/100đ)`
                    : `Kiểm Tra Cuối ${monthProgram.label}`}
                </span>
              </button>
            </div>
          </div>

          {/* Right Unified Celestial Telemetry Instrument Deck */}
          <div className="relative overflow-hidden rounded-3xl bg-[color:color-mix(in_oklch,var(--mm-surface-inset)_92%,transparent)] backdrop-blur-2xl border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_65%,transparent)] shadow-[0_24px_60px_rgba(2,6,23,0.8),0_0_42px_rgba(34,211,238,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] grid grid-cols-2 divide-x divide-[color:color-mix(in_oklch,var(--mm-cyan-border)_42%,transparent)] w-full lg:w-auto lg:min-w-[430px] xl:min-w-[460px] shrink-0">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2px] bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-violet-accent)] to-[color:var(--mm-amber-brightFill)] shadow-[0_0_18px_rgba(34,211,238,0.75)]"
            />

            {/* Telemetry Cell 1: Progress */}
            <div className="p-4 sm:p-6 flex flex-col justify-between gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--mm-cyan-text)]">
                Tiến độ chặng
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl sm:text-3xl font-black font-display text-[color:var(--mm-ink-primary)] tabular-nums leading-none">
                  {completedCount}
                  <span className="text-xs font-mono font-bold text-[color:var(--mm-ink-muted)] ml-1.5">/ {totalDays}</span>
                </div>
                <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.4)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="monthProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67E8F9" />
                      <stop offset="100%" stopColor="#A855F7" />
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    fill="none"
                    stroke="url(#monthProgressGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.max(4, Math.round((completedCount / Math.max(1, totalDays)) * 113.1))} 113.1`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27.5" textAnchor="middle" className="fill-cyan-100 text-[10px] font-black font-mono tabular-nums">
                    {progressPct}%
                  </text>
                </svg>
              </div>
              <span className="text-xs text-[color:var(--mm-ink-muted)] font-medium tabular-nums">
                Đã hoàn thành {completedCount} {unitLower}
              </span>
            </div>

            {/* Telemetry Cell 2: Final Exam */}
            <div className="p-4 sm:p-6 flex flex-col justify-between gap-3">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[color:var(--mm-amber-text)]">
                Kiểm tra tháng
              </span>
              <div className="flex items-center justify-between gap-3">
                <div className="text-2xl sm:text-3xl font-black font-display text-[color:var(--mm-ink-primary)] tabular-nums leading-none">
                  {examResult ? (
                    <>
                      {examResult.totalScore}
                      <span className="text-xs font-mono font-bold text-[color:var(--mm-ink-muted)] ml-1.5">/ 100</span>
                    </>
                  ) : (
                    <span className="text-base sm:text-lg font-extrabold text-[color:var(--mm-ink-secondary)]">Chưa thi</span>
                  )}
                </div>
                <svg viewBox="0 0 48 48" className="w-12 h-12 shrink-0 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]" aria-hidden="true">
                  <defs>
                    <linearGradient id="monthExamGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#67E8F9" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                  </defs>
                  <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3.5" />
                  <circle
                    cx="24"
                    cy="24"
                    r="18"
                    fill="none"
                    stroke="url(#monthExamGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeDasharray={`${Math.max(4, Math.round(((examResult ? examResult.totalScore : 0) / 100) * 113.1))} 113.1`}
                    transform="rotate(-90 24 24)"
                  />
                  <text x="24" y="27.5" textAnchor="middle" className="fill-emerald-200 text-[10px] font-black font-mono tabular-nums">
                    {examResult ? `${examResult.totalScore}%` : '0%'}
                  </text>
                </svg>
              </div>
              <span className="text-xs text-[color:var(--mm-ink-muted)] font-medium">
                {examResult ? 'Đã lưu bảng điểm' : 'Sẵn sàng cuối tháng'}
              </span>
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
            className="flex flex-wrap items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl mm-surface-card border shadow-[0_16px_44px_rgba(3,7,24,0.78),0_0_28px_rgba(56,189,248,0.16),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl"
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
              Tất cả {totalDays} {unitLower}
            </button>
            {monthProgram.weeksMeta.map((w) => {
              const wt = weeklyTests.find((item) => item.weekNumber === w.weekNumber);
              const wtRes = wt ? weeklyTestResults[wt.weekNumber] : undefined;
              const isSelected = selectedWeek === w.weekNumber;

              return (
                <button
                  key={w.weekNumber}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelectedWeek(w.weekNumber)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] transition-all duration-200 cursor-pointer whitespace-nowrap min-h-[40px] sm:min-h-[42px] inline-flex items-center gap-2 ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_28px_rgba(34,211,238,0.6),0_0_20px_rgba(232,121,249,0.38),inset_0_1px_0_rgba(255,255,255,0.85)] ring-1 ring-cyan-100/95'
                      : 'bg-indigo-950/70 text-cyan-50 hover:text-white hover:bg-gradient-to-r hover:from-cyan-400/25 hover:to-fuchsia-400/25 border border-cyan-300/35 hover:border-cyan-200/80 shadow-[0_0_16px_rgba(34,211,238,0.14)] font-bold'
                  }`}
                >
                  <span>{w.shortLabel}</span>
                  {wt && (
                    <span
                      className={`px-1.5 py-0.5 rounded-md text-[10px] font-black tabular-nums ${
                        wtRes?.passed
                          ? isSelected
                            ? 'bg-slate-950/90 text-emerald-300'
                            : 'bg-emerald-500/25 border border-emerald-300/60 text-emerald-200'
                          : isSelected
                          ? 'bg-slate-950/85 text-amber-300'
                          : 'bg-amber-400/20 border border-amber-300/50 text-amber-200'
                      }`}
                    >
                      {wtRes?.passed ? `✓ ${wtRes.totalScore}đ` : '15p'}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-pressed={effectiveUnlockAll}
            disabled={isTeacherMode}
            onClick={() => {
              if (!isTeacherMode) setUnlockAllPreview(!unlockAllPreview);
            }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl font-extrabold text-xs sm:text-[13px] flex items-center gap-2 border transition-all duration-200 min-h-[44px] whitespace-nowrap backdrop-blur-xl shadow-[0_12px_28px_rgba(3,7,24,0.5)] ${
              isTeacherMode
                ? 'bg-emerald-500/25 border-emerald-300/80 text-emerald-100 shadow-[0_0_24px_rgba(52,211,153,0.34)] cursor-default'
                : effectiveUnlockAll
                ? 'bg-emerald-500/22 border-emerald-300/70 text-emerald-100 shadow-[0_0_22px_rgba(52,211,153,0.28)] cursor-pointer'
                : 'bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.16),_transparent_60%),linear-gradient(135deg,_rgba(8,12,44,0.96),_rgba(24,17,68,0.94))] border-cyan-300/40 text-white hover:border-cyan-300/75 hover:bg-cyan-400/15 cursor-pointer'
            }`}
          >
            {effectiveUnlockAll ? (
              <>
                <Unlock className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                <span>
                  {isTeacherMode
                    ? `Chế độ Giáo viên: Đã mở ${totalDays} ${unitLower}`
                    : `Đã Mở Toàn Bộ ${totalDays} ${unitLabel}`}
                </span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
                <span>Mở Khóa Tuần Tự</span>
              </>
            )}
          </button>
        </div>

        {/* Session Cosmic Grid + End-of-Week 15-Minute Test Gate Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDays.map((dayPlan) => {
            const unlocked = isDayUnlocked(dayPlan.dayNumber);
            const blockingWeeklyTest = !unlocked
              ? getBlockingWeeklyTestForDay(dayPlan.dayNumber)
              : null;
            const progress = completedDays[dayPlan.dayNumber];
            const isDone = !!progress;
            const savedCount = isDone
              ? dayPlan.questions.length
              : getSavedDaySolvedCount(monthProgram.monthNumber, dayPlan.dayNumber);
            const isCurrentTarget = dayPlan.dayNumber === nextActiveDayNumber && unlocked;
            const cleanTitle = dayPlan.title.replace(/^(?:Ngày|Buổi)\s+\d+\s*:\s*/i, '');

            const weeklyTestAfterThisDay = weeklyTests.find(
              (wt) => wt.triggerAfterDayNumber === dayPlan.dayNumber
            );

            return (
              <React.Fragment key={dayPlan.id}>
                <button
                  type="button"
                  disabled={!unlocked}
                  onClick={() => {
                    if (unlocked) onSelectDay(dayPlan);
                  }}
                  aria-label={`${unitLabel} ${dayPlan.dayNumber}: ${cleanTitle}`}
                  className={`group relative overflow-hidden rounded-3xl p-6 border text-left transition-all duration-200 min-h-[144px] flex flex-col justify-between backdrop-blur-xl ${
                    unlocked
                      ? isCurrentTarget
                        ? 'bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklch,var(--mm-cyan-accent)_22%,transparent),_transparent_55%),linear-gradient(145deg,_var(--mm-surface-2),_var(--mm-surface-1))] border-[color:var(--mm-cyan-accent)] animate-cosmic-beacon hover:-translate-y-1.5 hover:border-[color:var(--mm-cyan-bright)] hover:shadow-[0_0_48px_rgba(34,211,238,0.48),0_18px_50px_rgba(192,132,252,0.3)] cursor-pointer'
                        : isDone
                        ? 'bg-[linear-gradient(145deg,_var(--mm-surface-2),_var(--mm-surface-1))] border-[color:var(--mm-emerald-border)] hover:-translate-y-1.5 hover:border-[color:var(--mm-emerald-accent)] shadow-[0_14px_34px_rgba(3,7,24,0.55),0_0_20px_rgba(52,211,153,0.14)] hover:shadow-[0_0_42px_rgba(52,211,153,0.36),0_16px_44px_rgba(34,211,238,0.24)] cursor-pointer'
                        : 'mm-surface-card border-[color:color-mix(in_oklch,var(--mm-cyan-border)_52%,transparent)] hover:-translate-y-1.5 hover:border-[color:var(--mm-cyan-accent)] shadow-[0_14px_34px_rgba(3,7,24,0.55)] hover:shadow-[0_0_44px_rgba(34,211,238,0.38),0_18px_48px_rgba(168,85,247,0.26)] cursor-pointer'
                      : 'bg-[color:var(--mm-surface-inset)] border-[color:color-mix(in_oklch,var(--mm-neutral-border)_42%,transparent)] text-[color:var(--mm-ink-muted)] shadow-sm cursor-not-allowed'
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
                    <div className="flex items-center justify-between gap-2 text-xs font-bold">
                      <div className="flex items-center gap-1.5 text-[color:var(--mm-cyan-text)] min-w-0">
                        {isCurrentTarget && unlocked && (
                          <span className="w-2 h-2 rounded-full bg-[color:var(--mm-cyan-brightFill)] shadow-[0_0_10px_rgba(34,211,238,0.95)] animate-ping shrink-0" aria-hidden="true" />
                        )}
                        <span className="text-sm font-extrabold text-[color:var(--mm-ink-primary)] tabular-nums whitespace-nowrap shrink-0">
                          {unitLabel} {dayPlan.dayNumber}
                        </span>
                        <span aria-hidden="true" className="text-[color:var(--mm-ink-muted)] shrink-0">·</span>
                        <span className="truncate text-[color:var(--mm-cyan-text)] font-semibold">
                          {dayPlan.topicTag}
                        </span>
                      </div>

                      {isDone ? (
                        <span className="text-[color:var(--mm-emerald-text)] font-black inline-flex items-center gap-1 tabular-nums whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                          {progress.score}/{progress.totalQuestions}
                        </span>
                      ) : savedCount > 0 && unlocked ? (
                        <span className="text-[color:var(--mm-cyan-text)] font-black tabular-nums whitespace-nowrap shrink-0">
                          {savedCount}/{dayPlan.questions.length} câu
                        </span>
                      ) : unlocked ? (
                        <span className="text-[color:var(--mm-cyan-text)] group-hover:text-[color:var(--mm-violet-text)] font-black inline-flex items-center gap-1 whitespace-nowrap shrink-0 transition-colors">
                          <Sparkles className="w-3.5 h-3.5 text-[color:var(--mm-amber-accent)]" aria-hidden="true" />
                          Sẵn sàng
                        </span>
                      ) : blockingWeeklyTest && completedDays[dayPlan.dayNumber - 1] ? (
                        <span className="text-[color:var(--mm-amber-text)] font-bold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                          Chờ KT Tuần {blockingWeeklyTest.weekNumber}
                        </span>
                      ) : (
                        <span className="text-[color:var(--mm-ink-muted)] font-semibold inline-flex items-center gap-1 whitespace-nowrap shrink-0">
                          <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                          Chưa mở
                        </span>
                      )}
                    </div>

                    <h3
                      className={`text-lg font-extrabold font-display leading-snug tracking-tight ${
                        unlocked
                          ? 'text-[color:var(--mm-ink-primary)] group-hover:text-[color:var(--mm-cyan-text)] transition-colors'
                          : 'text-[color:var(--mm-ink-muted)]'
                      }`}
                    >
                      {cleanTitle}
                    </h3>

                    {weeklyTestAfterThisDay && (
                      <div className="pt-1 flex items-center gap-1.5 text-[11px] font-bold text-[color:var(--mm-amber-text)]">
                        <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>Cuối bài có Kiểm tra 15 phút Tuần {dayPlan.weekNumber}</span>
                      </div>
                    )}
                  </div>
                </button>

                {weeklyTestAfterThisDay && onOpenWeeklyTest && (
                  (() => {
                    const wtUnlocked = isWeeklyTestUnlocked(weeklyTestAfterThisDay);
                    const wtResult = weeklyTestResults[weeklyTestAfterThisDay.weekNumber];
                    const isPassed = !!wtResult?.passed;

                    return (
                      <button
                        type="button"
                        disabled={!wtUnlocked}
                        onClick={() => {
                          if (wtUnlocked) onOpenWeeklyTest(weeklyTestAfterThisDay);
                        }}
                        className={`group relative overflow-hidden rounded-3xl p-6 border-2 text-left transition-all duration-200 min-h-[144px] flex flex-col justify-between backdrop-blur-xl sm:col-span-2 lg:col-span-3 ${
                          wtUnlocked
                            ? isPassed
                              ? 'bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklch,var(--mm-emerald-accent)_20%,transparent),_transparent_55%),linear-gradient(135deg,_var(--mm-surface-2),_var(--mm-surface-1))] border-[color:var(--mm-emerald-border)] hover:-translate-y-1 shadow-[0_18px_46px_rgba(3,7,24,0.72),0_0_32px_rgba(52,211,153,0.22)] cursor-pointer'
                              : 'bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklch,var(--mm-amber-accent)_24%,transparent),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_color-mix(in_oklch,var(--mm-violet-accent)_22%,transparent),_transparent_55%),linear-gradient(135deg,_var(--mm-surface-2),_var(--mm-surface-1))] border-[color:var(--mm-amber-border)] hover:-translate-y-1 shadow-[0_20px_52px_rgba(3,7,24,0.82),0_0_36px_rgba(251,191,36,0.28)] cursor-pointer'
                            : 'bg-[color:var(--mm-surface-inset)] border-[color:color-mix(in_oklch,var(--mm-violet-border)_42%,transparent)] text-[color:var(--mm-ink-muted)] cursor-not-allowed'
                        }`}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-0 inset-x-8 h-[3px] rounded-full ${
                            wtUnlocked
                              ? isPassed
                                ? 'bg-gradient-to-r from-[color:var(--mm-emerald-brightFill)] via-[color:var(--mm-cyan-brightFill)] to-[color:var(--mm-amber-brightFill)] shadow-[0_0_18px_rgba(52,211,153,0.75)]'
                                : 'bg-gradient-to-r from-[color:var(--mm-amber-brightFill)] via-[color:var(--mm-violet-accent)] to-[color:var(--mm-cyan-brightFill)] shadow-[0_0_20px_rgba(251,191,36,0.8)]'
                              : 'bg-gradient-to-r from-indigo-400/30 to-fuchsia-400/30'
                          }`}
                        />

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider">
                              <span
                                className={`px-3 py-1 rounded-xl inline-flex items-center gap-1.5 border ${
                                  isPassed
                                    ? 'bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_60%,transparent)] border-[color:var(--mm-emerald-border)] text-[color:var(--mm-emerald-text)]'
                                    : wtUnlocked
                                    ? 'bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_55%,transparent)] border-[color:var(--mm-amber-border)] text-[color:var(--mm-amber-text)]'
                                    : 'bg-white/5 border-white/15 text-[color:var(--mm-ink-muted)]'
                                }`}
                              >
                                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Bài Kiểm Tra 15 Phút · Cuối Tuần {weeklyTestAfterThisDay.weekNumber}</span>
                              </span>

                              <span className="inline-flex items-center gap-1 text-[color:var(--mm-cyan-text)]">
                                <Calculator className="w-3.5 h-3.5 text-[color:var(--mm-cyan-accent)]" aria-hidden="true" />
                                <span>6 câu Tính toán (60đ)</span>
                              </span>
                              <span aria-hidden="true" className="text-[color:var(--mm-ink-muted)]">·</span>
                              <span className="inline-flex items-center gap-1 text-[color:var(--mm-violet-text)]">
                                <MessageSquareQuote className="w-3.5 h-3.5 text-[color:var(--mm-violet-accent)]" aria-hidden="true" />
                                <span>4 câu Nghị luận (40đ)</span>
                              </span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-black font-display text-[color:var(--mm-ink-primary)]">
                              {weeklyTestAfterThisDay.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-[color:var(--mm-ink-secondary)]">
                              {isPassed
                                ? `Đã vượt qua xuất sắc với ${wtResult.totalScore}/100 điểm (Tính toán: ${wtResult.calculationScore}/60đ · Nghị luận: ${wtResult.reasoningScore}/40đ). ${
                                    weeklyTestAfterThisDay.unlocksDayNumber
                                      ? `Đã mở khóa Tuần ${weeklyTestAfterThisDay.weekNumber + 1} (từ ${unitLabel} ${weeklyTestAfterThisDay.unlocksDayNumber})!`
                                      : `Đã hoàn tất trọn vẹn ${totalWeeks} tuần học!`
                                  }`
                                : wtUnlocked
                                ? effectiveUnlockAll
                                  ? `Đã mở khóa sẵn · Làm bài kiểm tra 15 phút để đánh giá năng lực tuần (mục tiêu ≥ ${weeklyTestAfterThisDay.passingScore}/100 điểm).`
                                  : weeklyTestAfterThisDay.unlocksDayNumber
                                  ? `Cần đạt từ ${weeklyTestAfterThisDay.passingScore}/100 điểm trở lên để mở khóa các bài học của tuần kế tiếp.`
                                  : `Hoàn thành bài kiểm tra 15 phút cuối tuần với điểm ≥ ${weeklyTestAfterThisDay.passingScore}/100 để sẵn sàng cho Kỳ Thi Cuối ${monthProgram.label}.`
                                : `Hoàn thành bài học ${unitLabel} ${weeklyTestAfterThisDay.triggerAfterDayNumber} để mở bài kiểm tra 15 phút này.`}
                            </p>
                          </div>

                          <div className="shrink-0">
                            {isPassed ? (
                              <span className="px-5 py-3 rounded-2xl bg-[color:var(--mm-emerald-brightFill)] text-[#05081D] font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_26px_rgba(52,211,153,0.45)]">
                                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                <span>Đã Đạt {wtResult.totalScore}/100đ · Xem / Làm Lại</span>
                              </span>
                            ) : wtUnlocked ? (
                              <span className="px-6 py-3.5 rounded-2xl bg-[color:var(--mm-amber-brightFill)] text-[#05081D] font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-[0_0_32px_rgba(251,191,36,0.45)]">
                                <Sparkles className="w-4 h-4" aria-hidden="true" />
                                <span>
                                  {wtResult
                                    ? `Làm Lại Ngay (${wtResult.totalScore}/100đ)`
                                    : 'Làm Kiểm Tra 15 Phút'}
                                </span>
                                <ChevronRight className="w-4 h-4" aria-hidden="true" />
                              </span>
                            ) : (
                              <span className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-[color:var(--mm-ink-muted)] font-bold text-xs inline-flex items-center gap-1.5">
                                <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Mở sau {unitLabel} {weeklyTestAfterThisDay.triggerAfterDayNumber}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })()
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Final Assessment Callout Card (harmonized with deep Cosmic Observatory theme) */}
        <div className="relative overflow-hidden mt-8 rounded-3xl mm-surface-card border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] p-6 sm:p-8 shadow-[0_24px_64px_rgba(3,7,24,0.82),0_0_42px_rgba(56,189,248,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-azure-accent)] to-[color:var(--mm-violet-accent)] shadow-[0_0_18px_rgba(34,211,238,0.8)]"
          />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[color:var(--mm-cyan-text)]">
              <Trophy className="w-4 h-4 text-[color:var(--mm-amber-accent)] drop-shadow-[0_0_8px_rgba(251,191,36,0.75)]" aria-hidden="true" />
              <span>Chặng Cuối {monthProgram.label}</span>
              <span aria-hidden="true" className="text-[color:var(--mm-ink-muted)]">·</span>
              <span className="text-[color:var(--mm-violet-text)]">{examSummaryBadge}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display bg-gradient-to-r from-white via-cyan-100 to-fuchsia-200 bg-clip-text text-transparent cosmic-glow-title-cyan">
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
