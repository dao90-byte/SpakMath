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
  BookOpen,
  Award,
  ChevronRight,
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

export const InMonthCalendarHub: React.FC<InMonthCalendarHubProps> = ({
  completedDays,
  examResult,
  onSelectDay,
  onOpenExam,
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number | 'all'>('all');
  const [unlockAllPreview, setUnlockAllPreview] = useState<boolean>(false);

  const completedCount = Object.keys(completedDays).length;
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
    'from-indigo-500 to-purple-600',
    'from-cyan-500 to-blue-600',
    'from-emerald-500 to-teal-600',
    'from-amber-500 to-orange-600',
    'from-fuchsia-500 to-rose-600',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1026] via-[#131B42] to-[#1D1548] text-white pb-20">
      {/* Bright Cosmic Hero Banner */}
      <div className="relative overflow-hidden border-b border-indigo-500/30 bg-gradient-to-r from-[#121A44] via-[#1F1A58] to-[#2B175A] px-4 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm">
                <Rocket className="w-3.5 h-3.5" />
                <span>CHƯƠNG TRÌNH IN MONTH • LỘ TRÌNH THÁNG 11</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                Hành Trình Vũ Trụ 30 Ngày Chinh Phục Toán Tư Duy Singapore
              </h1>
              <p className="text-sm sm:text-base text-indigo-100 leading-relaxed">
                Thiết kế chuẩn <strong>Spark Math & Singapore CPA</strong> dàn đều cho <strong>30 ngày trong Tháng 11</strong> (mỗi ngày ~30 phút qua 4 chặng: Khởi động, Mô hình trực quan, Thực hành, Thử thách) cùng <strong>Bài Kiểm Tra & Đánh Giá Năng Lực Cuối Tháng</strong>.
              </p>

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
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    Bắt Đầu Ngay: Ngày {nextActiveDayNumber}/30
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={onOpenExam}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-amber-300/50 text-amber-200 font-black text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Trophy className="w-4 h-4 text-amber-300" />
                  <span>
                    {examResult
                      ? `Xem Báo Cáo Cuối Tháng (${examResult.totalScore}/100đ)`
                      : 'Bài Kiểm Tra & Đánh Giá Cuối Tháng 11'}
                  </span>
                </button>
              </div>
            </div>

            {/* 4-Metric KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                  <Calendar className="w-4 h-4" />
                  <span>Tiến Độ Tháng 11</span>
                </div>
                <div className="text-2xl font-black text-white mt-1 tabular-nums">
                  {completedCount} <span className="text-sm text-indigo-200">/ 30 ngày</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                  <Clock className="w-4 h-4" />
                  <span>Thời Lượng Tích Lũy</span>
                </div>
                <div className="text-2xl font-black text-white mt-1 tabular-nums">
                  {totalMinutes} <span className="text-sm text-indigo-200">/ 900 phút</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300">
                  <Star className="w-4 h-4" />
                  <span>Sao Tư Duy CPA</span>
                </div>
                <div className="text-2xl font-black text-white mt-1 tabular-nums">
                  {totalStars} <span className="text-sm text-indigo-200">/ 330 câu</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs font-bold text-fuchsia-300">
                  <Award className="w-4 h-4" />
                  <span>Điểm Thi Cuối Tháng</span>
                </div>
                <div className="text-2xl font-black text-white mt-1 tabular-nums">
                  {examResult ? `${examResult.totalScore}/100` : 'Chưa thi'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Filter Tabs & Unlock Mode Toggle */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 border border-white/10 rounded-2xl p-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedWeek('all')}
              className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
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
                onClick={() => setSelectedWeek(w.weekNumber)}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
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
            onClick={() => setUnlockAllPreview(!unlockAllPreview)}
            className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
              unlockAllPreview
                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200'
                : 'bg-white/10 border-white/15 text-indigo-200 hover:bg-white/15'
            }`}
          >
            {unlockAllPreview ? (
              <>
                <Unlock className="w-3.5 h-3.5 text-emerald-300" />
                <span>Đang Mở Khóa Toàn Bộ 30 Ngày (Xem Nhanh)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-300" />
                <span>Mở Khóa Tuần Tự Từng Ngày (Nhấn để mở toàn bộ)</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 30-Day Cosmic Planetary Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDays.map((dayPlan) => {
            const unlocked = isDayUnlocked(dayPlan.dayNumber);
            const progress = completedDays[dayPlan.dayNumber];
            const isDone = !!progress;
            const isCurrentTarget = dayPlan.dayNumber === nextActiveDayNumber;
            const grad = planetGradients[(dayPlan.weekNumber - 1) % planetGradients.length];

            return (
              <div
                key={dayPlan.id}
                onClick={() => {
                  if (unlocked) onSelectDay(dayPlan);
                }}
                className={`rounded-3xl p-5 border-2 transition-all flex flex-col justify-between relative overflow-hidden ${
                  unlocked
                    ? isCurrentTarget
                      ? 'bg-white text-slate-900 border-amber-400 shadow-xl scale-[1.01] cursor-pointer'
                      : isDone
                      ? 'bg-white/95 text-slate-900 border-emerald-400 shadow-md hover:shadow-xl cursor-pointer'
                      : 'bg-white/95 text-slate-900 border-indigo-200 hover:border-amber-300 shadow-md cursor-pointer'
                    : 'bg-indigo-950/50 text-indigo-200 border-indigo-500/20 opacity-75 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-xl bg-gradient-to-r ${grad} text-white font-black text-xs uppercase tracking-wider shadow-xs tabular-nums`}
                      >
                        Ngày {dayPlan.dayNumber}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-lg ${
                          unlocked
                            ? 'bg-slate-100 text-slate-700'
                            : 'bg-white/10 text-indigo-200'
                        }`}
                      >
                        {dayPlan.planetIcon} {dayPlan.topicTag}
                      </span>
                    </div>

                    {isDone ? (
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-black text-xs flex items-center gap-1 tabular-nums">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {progress.score}/{progress.totalQuestions}
                      </span>
                    ) : unlocked ? (
                      <span className="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-900 font-black text-xs flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        Sẵn sàng
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-xl bg-white/10 text-indigo-300 font-bold text-xs flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        Khóa
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 mb-1">
                    {dayPlan.subtitle}
                  </div>
                  <h3
                    className={`text-base font-black leading-snug mb-3 ${
                      unlocked ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {dayPlan.title}
                  </h3>
                </div>

                <div
                  className={`pt-3 border-t flex items-center justify-between text-xs font-bold ${
                    unlocked
                      ? 'border-slate-100 text-slate-600'
                      : 'border-white/10 text-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-3 tabular-nums">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {dayPlan.estimatedMinutes} phút
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-purple-500" />4 chặng (11 câu)
                    </span>
                  </div>

                  {unlocked && (
                    <span className="text-indigo-700 font-black flex items-center gap-0.5">
                      <span>{isDone ? 'Ôn lại' : 'Học ngay'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Assessment Callout Card at Bottom */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-500 p-6 sm:p-8 text-slate-950 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950 text-amber-300 font-black text-xs uppercase">
              <Trophy className="w-3.5 h-3.5" />
              <span>Chặng Cuối Tháng 11 • Đánh Giá Toàn Diện</span>
            </div>
            <h3 className="text-2xl font-black text-slate-950">
              Bài Kiểm Tra Tổng Kết Tháng 11 & Bảng Đánh Giá Năng Lực 4 Trụ Cột
            </h3>
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              Gồm 2 phần: <strong>Phần A - Cơ Bản (10 câu)</strong> và <strong>Phần B - Tư Duy Olympic (10 câu)</strong>. Sau khi hoàn thành, hệ thống lập tức phân tích điểm mạnh/yếu từng chuyên đề và cấp Chứng nhận hoàn thành Tháng 11!
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenExam}
            className="px-6 py-4 rounded-2xl bg-slate-950 hover:bg-slate-800 text-amber-300 font-black text-sm shadow-xl flex items-center gap-2 shrink-0 transition-transform hover:scale-105 cursor-pointer"
          >
            <Award className="w-5 h-5" />
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
