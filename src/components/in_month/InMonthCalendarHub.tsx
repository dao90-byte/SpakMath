import React, { useState } from 'react';
import {
  NOVEMBER_IN_MONTH_DAYS,
  IN_MONTH_WEEKS_META,
  InMonthDayPlan,
} from '../../data/inMonthNovemberData';
import { InMonthExamSavedResult } from './InMonthFinalExamModal';
import {
  Rocket,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  Star,
  Trophy,
  Sparkles,
  Calendar,
  Award,
  ChevronRight,
  Orbit,
  Globe,
} from 'lucide-react';

export interface InMonthDayProgress {
  day: number;
  score: number;
  totalQuestions: number;
  elapsedSeconds: number;
  completedAt: string;
}

interface InMonthCalendarHubProps {
  completedDays: Record<number, InMonthDayProgress>;
  examResult: InMonthExamSavedResult | null;
  onSelectDay: (dayPlan: InMonthDayPlan) => void;
  onOpenExam: () => void;
}

function getSavedDaySolvedCount(dayNumber: number): number {
  try {
    const raw = localStorage.getItem(`spark_math_inmonth_nov_day_progress_${dayNumber}`);
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
  completedDays,
  examResult,
  onSelectDay,
  onOpenExam,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [unlockAllPreview, setUnlockAllPreview] = useState<boolean>(false);

  const completedCount = Object.keys(completedDays).length;
  const progressPct = Math.round((completedCount / 30) * 100);
  const totalStars = Object.values(completedDays).reduce(
    (acc, item) => acc + item.score,
    0
  );
  const totalMinutes = Math.max(
    completedCount * 30,
    Math.round(
      Object.values(completedDays).reduce((acc, i) => acc + i.elapsedSeconds, 0) / 60
    )
  );

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
      ? NOVEMBER_IN_MONTH_DAYS
      : NOVEMBER_IN_MONTH_DAYS.filter((d) => d.weekNumber === selectedWeek);

  const planetGradients = [
    'from-blue-600 to-indigo-600',
    'from-cyan-500 to-sky-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-pink-500 to-purple-600',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1026] via-[#131B42] to-[#1D1548] text-white pb-20 relative overflow-hidden">
      {/* Bright Cosmic Ambient Nebula Layers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/5 w-[420px] h-[420px] rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute top-1/4 -right-24 w-[380px] h-[380px] rounded-full bg-pink-500/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[480px] h-[480px] rounded-full bg-amber-400/10 blur-[140px]" />
      </div>

      {/* Bright Cosmic Hero Banner */}
      <div className="relative z-10 border-b border-indigo-400/25 bg-gradient-to-r from-[#121A44]/95 via-[#1E1B58]/95 to-[#2D185B]/95 backdrop-blur-md px-4 py-8 sm:py-10 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md">
                <Rocket className="w-4 h-4" aria-hidden="true" />
                <span>IN MONTH • THÁNG 11</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
                Hành Trình Vũ Trụ 30 Ngày Chinh Phục Toán Tư Duy Singapore
              </h1>

              {/* Orbital 30-Day Progress Bar */}
              <div className="cosmic-glass rounded-2xl p-4 max-w-xl">
                <div className="flex items-center justify-between text-xs font-extrabold mb-2">
                  <span className="flex items-center gap-1.5 text-cyan-200">
                    <Orbit className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                    <span>Tiến Độ Quỹ Đạo Tháng 11</span>
                  </span>
                  <span className="text-amber-300 tabular-nums">
                    {completedCount}/30 ngày ({progressPct}%)
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-900/80 border border-white/10 overflow-hidden p-0.5">
                  <div
                    style={{ width: `${Math.max(3, progressPct)}%` }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-amber-400 to-pink-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    const target =
                      NOVEMBER_IN_MONTH_DAYS.find(
                        (d) => d.dayNumber === nextActiveDayNumber
                      ) || NOVEMBER_IN_MONTH_DAYS[0];
                    onSelectDay(target);
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-[0_8px_24px_rgba(245,158,11,0.4)] flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[48px]"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>Bắt Đầu Ngay: Ngày {nextActiveDayNumber}/30</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={onOpenExam}
                  className="px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-amber-300/60 text-amber-200 font-black text-sm flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[48px]"
                >
                  <Trophy className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>
                    {examResult
                      ? `Xem Báo Cáo Cuối Tháng (${examResult.totalScore}/100đ)`
                      : 'Kiểm Tra Cuối Tháng 11'}
                  </span>
                </button>
              </div>
            </div>

            {/* 4-Metric KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3.5 shrink-0">
              <div className="p-4 rounded-2xl cosmic-glass shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <Calendar className="w-4 h-4" aria-hidden="true" />
                  <span>Tiến Độ Tháng 11</span>
                </div>
                <div className="text-2xl font-extrabold font-display text-white mt-1 tabular-nums">
                  {completedCount} <span className="text-sm font-sans text-indigo-200">/ 30 ngày</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl cosmic-glass shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Clock className="w-4 h-4" aria-hidden="true" />
                  <span>Thời Lượng Tích Lũy</span>
                </div>
                <div className="text-2xl font-extrabold font-display text-white mt-1 tabular-nums">
                  {totalMinutes} <span className="text-sm font-sans text-indigo-200">/ 900 phút</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl cosmic-glass shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <Star className="w-4 h-4" aria-hidden="true" />
                  <span>Sao Tư Duy CPA</span>
                </div>
                <div className="text-2xl font-extrabold font-display text-white mt-1 tabular-nums">
                  {totalStars} <span className="text-sm font-sans text-indigo-200">/ 330 câu</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl cosmic-glass shadow-lg">
                <div className="flex items-center gap-1.5 text-xs font-bold text-pink-300">
                  <Award className="w-4 h-4" aria-hidden="true" />
                  <span>Điểm Thi Cuối Tháng</span>
                </div>
                <div className="text-2xl font-extrabold font-display text-white mt-1 tabular-nums">
                  {examResult ? `${examResult.totalScore}/100` : 'Chưa thi'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Filter Tabs & Unlock Mode Toggle */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 cosmic-glass rounded-2xl p-3 shadow-md">
          <div role="group" aria-label="Lọc theo tuần" className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              aria-pressed={selectedWeek === 'all'}
              onClick={() => setSelectedWeek('all')}
              className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[40px] ${
                selectedWeek === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white/10 text-indigo-100 hover:bg-white/20'
              }`}
            >
              Tất Cả 30 Ngày
            </button>
            {IN_MONTH_WEEKS_META.map((w) => (
              <button
                key={w.weekNumber}
                type="button"
                aria-pressed={selectedWeek === w.weekNumber}
                onClick={() => setSelectedWeek(w.weekNumber)}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[40px] ${
                  selectedWeek === w.weekNumber
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-white/10 text-indigo-100 hover:bg-white/20'
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
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all duration-200 cursor-pointer min-h-[40px] ${
              unlockAllPreview
                ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200'
                : 'bg-white/10 border-white/20 text-indigo-100 hover:bg-white/20'
            }`}
          >
            {unlockAllPreview ? (
              <>
                <Unlock className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                <span>Mở Toàn Bộ 30 Ngày</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-amber-300" aria-hidden="true" />
                <span>Mở Khóa Tuần Tự</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 30-Day Cosmic Planetary Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDays.map((dayPlan) => {
            const unlocked = isDayUnlocked(dayPlan.dayNumber);
            const progress = completedDays[dayPlan.dayNumber];
            const isDone = !!progress;
            const savedCount = isDone
              ? dayPlan.questions.length
              : getSavedDaySolvedCount(dayPlan.dayNumber);
            const isCurrentTarget = dayPlan.dayNumber === nextActiveDayNumber;
            const grad = planetGradients[(dayPlan.weekNumber - 1) % planetGradients.length];
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
                className={`group rounded-3xl p-5 sm:p-6 border-2 text-left transition-all duration-200 relative overflow-hidden min-h-[146px] flex flex-col justify-between ${
                  unlocked
                    ? isCurrentTarget
                      ? 'bg-gradient-to-br from-[#1B276B] via-[#1C215D] to-[#291A62] text-white border-amber-400 shadow-[0_14px_34px_rgba(251,191,36,0.24)] hover:-translate-y-1 hover:border-amber-300 cursor-pointer'
                      : isDone
                      ? 'bg-gradient-to-br from-[#122C4D] via-[#132350] to-[#161E4A] text-white border-emerald-400/75 shadow-[0_10px_28px_rgba(16,185,129,0.18)] hover:-translate-y-1 hover:border-emerald-300 cursor-pointer'
                      : 'bg-[#141E54]/95 text-white border-cyan-400/45 shadow-lg hover:-translate-y-1 hover:border-amber-300 hover:bg-[#192563] cursor-pointer'
                    : 'bg-[#0F163E]/95 text-indigo-100 border-indigo-400/25 shadow-md cursor-not-allowed'
                }`}
              >
                <div className="w-full space-y-3.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`px-3 py-1 rounded-xl bg-gradient-to-r ${grad} text-white font-black text-xs uppercase tracking-wider shadow-sm tabular-nums whitespace-nowrap shrink-0`}
                      >
                        Ngày {dayPlan.dayNumber}
                      </span>
                      <span className="text-xs font-bold text-cyan-200/90 inline-flex items-center gap-1 truncate">
                        <Globe className="w-3.5 h-3.5 text-cyan-300 shrink-0" aria-hidden="true" />
                        <span className="truncate">{dayPlan.topicTag}</span>
                      </span>
                    </div>

                    {isDone ? (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-400/20 border border-emerald-300/50 text-emerald-200 font-black text-xs flex items-center gap-1 tabular-nums whitespace-nowrap shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                        {progress.score}/{progress.totalQuestions}
                      </span>
                    ) : savedCount > 0 ? (
                      <span className="px-2.5 py-1 rounded-xl bg-cyan-400/20 border border-cyan-300/50 text-cyan-200 font-black text-xs tabular-nums whitespace-nowrap shrink-0">
                        {savedCount}/{dayPlan.questions.length} câu
                      </span>
                    ) : unlocked ? (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 border border-amber-300/60 text-amber-200 font-black text-xs flex items-center gap-1 whitespace-nowrap shrink-0">
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                        Sẵn sàng
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-indigo-950/90 border border-indigo-400/30 text-indigo-200 font-bold text-xs flex items-center gap-1 whitespace-nowrap shrink-0">
                        <Lock className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
                        Chưa mở
                      </span>
                    )}
                  </div>

                  <h3
                    className={`text-base sm:text-[17px] font-extrabold font-display leading-snug tracking-tight ${
                      unlocked
                        ? 'text-white group-hover:text-amber-200 transition-colors'
                        : 'text-indigo-100/95'
                    }`}
                  >
                    {cleanTitle}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Final Assessment Callout Card at Bottom */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 p-6 sm:p-8 text-slate-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 text-amber-300 font-black text-xs uppercase">
              <Trophy className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Chặng Cuối Tháng 11</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-slate-950">
              Bài Kiểm Tra Tổng Kết &amp; Đánh Giá Năng Lực Tháng 11
            </h3>
          </div>

          <button
            type="button"
            onClick={onOpenExam}
            className="px-6 py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-black text-sm shadow-xl flex items-center gap-2 shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer min-h-[52px]"
          >
            <Award className="w-5 h-5" aria-hidden="true" />
            <span>
              {examResult
                ? `Xem Báo Cáo & Chứng Nhận (${examResult.totalScore}/100đ)`
                : 'Làm Bài Kiểm Tra Cuối Tháng 11'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
