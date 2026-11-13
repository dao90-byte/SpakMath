import React, { useState, useEffect } from 'react';
import { TOPICS, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { Gem, CheckCircle, Play, Trophy, ArrowLeft, Orbit, Sparkles, Radar, Rocket } from 'lucide-react';

interface AdventureMapProps {
  completedLessonIds: string[];
  totalStars: number;
  onSelectLesson: (lessonId: string) => void;
  onSelectTopic: (topicId: string) => void;
  onOpenPeriodicAssessment?: (assessmentId?: string) => void;
  onOpenMethodology?: () => void;
  initialTopicId?: string | null;
  highlightLessonId?: string | null;
}

const LESSON_STATION_NUMBER_MAP: Record<string, number> = (() => {
  const counts: Record<string, number> = {};
  const map: Record<string, number> = {};
  ALL_LESSONS.forEach((l) => {
    counts[l.topicId] = (counts[l.topicId] || 0) + 1;
    map[l.id] = counts[l.topicId];
  });
  return map;
})();

interface StationCardTheme {
  card: string;
  topBar: string;
  spotlight: string;
  stationBadge: string;
  stationIcon: string;
  actionBadge: string;
  numberBadge: string;
}

const STATION_CARD_THEMES: StationCardTheme[] = [
  {
    card: 'bg-gradient-to-br from-[#0B3B66] via-[#0B2254] to-[#081238] border-cyan-400/90 hover:border-cyan-200 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_22px_rgba(34,211,238,0.28)] hover:shadow-[0_0_34px_rgba(34,211,238,0.62),0_14px_34px_rgba(56,189,248,0.36)]',
    topBar: 'bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400 shadow-[0_0_16px_rgba(34,211,238,0.9)]',
    spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.36),transparent_70%)]',
    stationBadge: 'bg-cyan-400/25 border-cyan-300/85 text-cyan-100 shadow-[0_0_12px_rgba(34,211,238,0.35)]',
    stationIcon: 'text-cyan-200',
    actionBadge: 'bg-gradient-to-r from-cyan-300 to-sky-300 border-cyan-100 text-slate-950 shadow-[0_0_14px_rgba(34,211,238,0.58)]',
    numberBadge: 'bg-gradient-to-br from-cyan-400/38 via-sky-500/32 to-blue-600/38 border-cyan-200 text-white shadow-[0_0_24px_rgba(34,211,238,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]',
  },
  {
    card: 'bg-gradient-to-br from-[#4A1366] via-[#2D1154] to-[#170936] border-fuchsia-400/90 hover:border-fuchsia-200 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_22px_rgba(232,121,249,0.28)] hover:shadow-[0_0_34px_rgba(232,121,249,0.65),0_14px_34px_rgba(192,132,252,0.36)]',
    topBar: 'bg-gradient-to-r from-fuchsia-300 via-pink-400 to-purple-400 shadow-[0_0_16px_rgba(232,121,249,0.9)]',
    spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(232,121,249,0.36),transparent_70%)]',
    stationBadge: 'bg-fuchsia-400/25 border-fuchsia-300/85 text-fuchsia-100 shadow-[0_0_12px_rgba(232,121,249,0.35)]',
    stationIcon: 'text-fuchsia-200',
    actionBadge: 'bg-gradient-to-r from-fuchsia-300 to-pink-300 border-fuchsia-100 text-slate-950 shadow-[0_0_14px_rgba(232,121,249,0.58)]',
    numberBadge: 'bg-gradient-to-br from-fuchsia-400/38 via-purple-500/32 to-pink-500/38 border-fuchsia-200 text-white shadow-[0_0_24px_rgba(232,121,249,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]',
  },
  {
    card: 'bg-gradient-to-br from-[#5A2D0C] via-[#3A1C0E] to-[#1D0E12] border-amber-400/90 hover:border-amber-200 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_22px_rgba(251,191,36,0.28)] hover:shadow-[0_0_34px_rgba(251,191,36,0.65),0_14px_34px_rgba(249,115,22,0.36)]',
    topBar: 'bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-400 shadow-[0_0_16px_rgba(251,191,36,0.9)]',
    spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(251,191,36,0.36),transparent_70%)]',
    stationBadge: 'bg-amber-400/25 border-amber-300/85 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.35)]',
    stationIcon: 'text-amber-200',
    actionBadge: 'bg-gradient-to-r from-amber-300 to-yellow-300 border-amber-100 text-slate-950 shadow-[0_0_14px_rgba(251,191,36,0.58)]',
    numberBadge: 'bg-gradient-to-br from-amber-400/38 via-orange-500/32 to-yellow-500/38 border-amber-200 text-white shadow-[0_0_24px_rgba(251,191,36,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]',
  },
  {
    card: 'bg-gradient-to-br from-[#1B2C7A] via-[#151F5A] to-[#0B1038] border-indigo-300/90 hover:border-indigo-100 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_22px_rgba(129,140,248,0.32)] hover:shadow-[0_0_34px_rgba(129,140,248,0.65),0_14px_34px_rgba(96,165,250,0.38)]',
    topBar: 'bg-gradient-to-r from-blue-300 via-indigo-300 to-violet-400 shadow-[0_0_16px_rgba(129,140,248,0.9)]',
    spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(129,140,248,0.38),transparent_70%)]',
    stationBadge: 'bg-indigo-400/30 border-indigo-200/85 text-indigo-100 shadow-[0_0_12px_rgba(129,140,248,0.38)]',
    stationIcon: 'text-indigo-200',
    actionBadge: 'bg-gradient-to-r from-indigo-300 to-blue-300 border-indigo-100 text-slate-950 shadow-[0_0_14px_rgba(129,140,248,0.58)]',
    numberBadge: 'bg-gradient-to-br from-blue-400/38 via-indigo-500/35 to-violet-500/38 border-indigo-200 text-white shadow-[0_0_24px_rgba(129,140,248,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]',
  },
  {
    card: 'bg-gradient-to-br from-[#61123B] via-[#3E0E2D] to-[#1F071B] border-rose-400/90 hover:border-rose-200 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_22px_rgba(251,113,133,0.28)] hover:shadow-[0_0_34px_rgba(251,113,133,0.65),0_14px_34px_rgba(244,63,94,0.36)]',
    topBar: 'bg-gradient-to-r from-rose-300 via-pink-400 to-orange-300 shadow-[0_0_16px_rgba(251,113,133,0.9)]',
    spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(251,113,133,0.36),transparent_70%)]',
    stationBadge: 'bg-rose-400/25 border-rose-300/85 text-rose-100 shadow-[0_0_12px_rgba(251,113,133,0.35)]',
    stationIcon: 'text-rose-200',
    actionBadge: 'bg-gradient-to-r from-rose-300 to-pink-300 border-rose-100 text-slate-950 shadow-[0_0_14px_rgba(251,113,133,0.58)]',
    numberBadge: 'bg-gradient-to-br from-rose-400/38 via-pink-500/32 to-red-500/38 border-rose-200 text-white shadow-[0_0_24px_rgba(251,113,133,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]',
  },
  {
    card: 'bg-gradient-to-br from-[#124559] via-[#1B225A] to-[#0C1036] border-sky-300/90 hover:border-sky-100 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_22px_rgba(56,189,248,0.3)] hover:shadow-[0_0_34px_rgba(56,189,248,0.65),0_14px_34px_rgba(168,85,247,0.36)]',
    topBar: 'bg-gradient-to-r from-sky-300 via-cyan-300 to-purple-400 shadow-[0_0_16px_rgba(56,189,248,0.9)]',
    spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.36),transparent_70%)]',
    stationBadge: 'bg-sky-400/25 border-sky-300/85 text-sky-100 shadow-[0_0_12px_rgba(56,189,248,0.35)]',
    stationIcon: 'text-sky-200',
    actionBadge: 'bg-gradient-to-r from-sky-300 to-cyan-200 border-sky-100 text-slate-950 shadow-[0_0_14px_rgba(56,189,248,0.58)]',
    numberBadge: 'bg-gradient-to-br from-sky-400/38 via-cyan-500/32 to-purple-500/38 border-sky-200 text-white shadow-[0_0_24px_rgba(56,189,248,0.6),inset_0_1px_0_rgba(255,255,255,0.4)]',
  },
];

const COMPLETED_CARD_THEME = {
  card: 'bg-gradient-to-br from-[#065F46] via-[#073B3A] to-[#042127] border-emerald-300/95 hover:border-emerald-200 shadow-[0_10px_28px_rgba(3,7,24,0.68),0_0_24px_rgba(52,211,153,0.38)] hover:shadow-[0_0_36px_rgba(52,211,153,0.72),0_14px_34px_rgba(16,185,129,0.42)]',
  topBar: 'bg-gradient-to-r from-emerald-300 via-lime-300 to-teal-300 shadow-[0_0_18px_rgba(52,211,153,0.95)]',
  spotlight: 'bg-[radial-gradient(circle_at_50%_0%,rgba(52,211,153,0.38),transparent_70%)]',
  actionBadge: 'bg-gradient-to-r from-emerald-300 to-lime-300 border-emerald-100 text-slate-950 shadow-[0_0_14px_rgba(52,211,153,0.65)]',
  numberBadge: 'bg-gradient-to-br from-emerald-400/42 via-teal-500/36 to-lime-400/32 border-emerald-200 text-white shadow-[0_0_26px_rgba(52,211,153,0.7),inset_0_1px_0_rgba(255,255,255,0.45)]',
};

export const AdventureMap: React.FC<AdventureMapProps> = ({
  completedLessonIds,
  totalStars,
  onSelectLesson,
  initialTopicId = null,
  highlightLessonId = null
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(initialTopicId);
  const [overviewMode, setOverviewMode] = useState<'stations' | 'all'>('stations');
  const [allTopicFilter, setAllTopicFilter] = useState<string>('all');

  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  useEffect(() => {
    if (highlightLessonId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(`station-lesson-${highlightLessonId}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [highlightLessonId, selectedTopicId]);

  const focusedTopic = TOPICS.find((t) => t.id === selectedTopicId);
  const focusedLessons = selectedTopicId
    ? ALL_LESSONS.filter((l) => l.topicId === selectedTopicId)
    : [];
  const completedInFocused = focusedLessons.filter((l) =>
    completedLessonIds.includes(l.id)
  ).length;

  return (
    <div className="space-y-7 pb-16 relative">
      {/* Ambient Cosmic Starfield & Nebula Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-28 left-1/4 w-[460px] h-[460px] rounded-full bg-cyan-500/16 blur-[140px]" />
        <div className="absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-fuchsia-500/18 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 w-[480px] h-[480px] rounded-full bg-indigo-500/16 blur-[150px]" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-70">
          <circle cx="90" cy="95" r="1.4" fill="#E0F2FE" />
          <circle cx="265" cy="64" r="2" fill="#67E8F9" className="animate-cosmic-twinkle" />
          <circle cx="495" cy="128" r="1.3" fill="#FFFFFF" />
          <circle cx="740" cy="76" r="1.8" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="990" cy="122" r="1.5" fill="#67E8F9" />
          <circle cx="1275" cy="74" r="2" fill="#FDE047" className="animate-cosmic-twinkle" />
          <circle cx="170" cy="495" r="1.7" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="590" cy="540" r="1.4" fill="#67E8F9" />
          <circle cx="1115" cy="510" r="1.8" fill="#FFFFFF" className="animate-cosmic-twinkle" />
          <circle cx="310" cy="805" r="1.8" fill="#FDE047" />
          <circle cx="890" cy="815" r="1.5" fill="#67E8F9" className="animate-cosmic-twinkle" />
        </svg>
      </div>

      {/* VIEW MODE 1: FOCUSED STATION VIEW */}
      {selectedTopicId && focusedTopic ? (
        <div className="relative z-10 space-y-6 animate-in fade-in duration-200">
          {/* Cosmic Station Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/50 bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.3),_transparent_52%),radial-gradient(ellipse_at_bottom_right,_rgba(168,85,247,0.28),_transparent_56%),linear-gradient(135deg,_rgba(10,16,52,0.98),_rgba(24,20,76,0.96))] p-6 md:p-8 text-white shadow-[0_24px_64px_rgba(3,7,24,0.82),0_0_40px_rgba(34,211,238,0.2)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-pink-500 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
            />
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs font-black uppercase tracking-wider">
                  <span className="text-amber-300 inline-flex items-center gap-1.5 drop-shadow-[0_0_10px_rgba(251,191,36,0.65)]">
                    <Orbit className="w-4 h-4" aria-hidden="true" />
                    <span>Trạm Đang Thực Thi</span>
                  </span>
                  <span aria-hidden="true" className="text-indigo-400">·</span>
                  <span className="text-cyan-200 tabular-nums">
                    {completedInFocused} / {focusedLessons.length} Thử thách đã vượt qua
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedTopicId(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-cyan-400/20 border border-cyan-300/40 hover:border-cyan-300/80 shadow-[0_0_16px_rgba(34,211,238,0.18)] text-xs font-bold text-white transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span>Xem toàn cảnh 6 Trạm</span>
                </button>
              </div>

              <div className="relative">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full bg-[radial-gradient(ellipse_at_left,_rgba(56,189,248,0.28),_transparent_65%)] blur-xl cosmic-light-bloom"
                />
                <h1 className="relative text-2xl md:text-4xl font-black font-display tracking-tight bg-gradient-to-r from-amber-200 via-white to-cyan-300 bg-clip-text text-transparent cosmic-glow-title-cyan">
                  {focusedTopic.title}
                </h1>
                <p className="relative text-sm md:text-base text-indigo-100/95 font-medium mt-1.5">
                  {focusedTopic.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3.5 text-xs font-bold pt-1">
                <div className="bg-gradient-to-br from-cyan-400/25 via-[#131C4B]/90 to-fuchsia-500/25 border border-cyan-300/65 px-4 py-2.5 rounded-2xl flex items-center gap-2.5 text-cyan-100 shadow-[0_0_28px_rgba(34,211,238,0.34)]">
                  <Gem className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.9)]" aria-hidden="true" />
                  <span className="tabular-nums font-black">{completedInFocused * 3} Tinh thể tích lũy tại trạm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lessons Grid for Focused Station */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-black font-display text-white">
                Danh Sách Bài Tập ({focusedLessons.length} Thử Thách)
              </h2>
              <span className="text-xs font-bold text-cyan-200/80">
                Chạm vào bài bất kỳ để tiếp tục luyện tập
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {focusedLessons.map((lesson, idx) => {
                const isDone = completedLessonIds.includes(lesson.id);
                const isHighlighted = highlightLessonId === lesson.id;
                const stationIdx = Math.max(0, TOPICS.findIndex((t) => t.id === lesson.topicId));
                const stationTheme = STATION_CARD_THEMES[stationIdx % STATION_CARD_THEMES.length];
                const lessonNum = LESSON_STATION_NUMBER_MAP[lesson.id] ?? idx + 1;

                return (
                  <button
                    key={lesson.id}
                    id={`station-lesson-${lesson.id}`}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectLesson(lesson.id);
                    }}
                    className={`group relative overflow-hidden p-2.5 sm:p-3 rounded-2xl border-2 text-left flex flex-col justify-between gap-2.5 min-h-[108px] w-full min-w-0 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer backdrop-blur-xl ${
                      isHighlighted
                        ? 'bg-gradient-to-br from-[#1E2B72] via-[#2A1D6E] to-[#13184A] border-amber-300 ring-2 ring-amber-300/75 shadow-[0_0_32px_rgba(251,191,36,0.55)] animate-cosmic-beacon'
                        : isDone
                        ? COMPLETED_CARD_THEME.card
                        : stationTheme.card
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isDone ? COMPLETED_CARD_THEME.spotlight : stationTheme.spotlight
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-0 inset-x-3 h-[3px] rounded-full transition-all duration-300 ${
                        isHighlighted
                          ? 'bg-gradient-to-r from-amber-300 via-cyan-300 to-fuchsia-400 shadow-[0_0_18px_rgba(251,191,36,0.95)]'
                          : isDone
                          ? COMPLETED_CARD_THEME.topBar
                          : stationTheme.topBar
                      }`}
                    />

                    <div className="relative z-10 flex flex-wrap items-center justify-between gap-1 w-full min-w-0 pt-0.5">
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-tight leading-tight whitespace-nowrap max-w-full ${stationTheme.stationBadge}`}
                      >
                        <Orbit className={`w-2.5 h-2.5 shrink-0 ${stationTheme.stationIcon}`} aria-hidden="true" />
                        <span>Trạm 0{stationIdx + 1}</span>
                      </span>

                      <div className="flex items-center gap-1 max-w-full">
                        {isHighlighted && (
                          <span className="relative flex h-2 w-2 shrink-0" aria-label="Vừa thực hiện">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-85" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
                          </span>
                        )}
                        {isDone ? (
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-black leading-tight whitespace-nowrap max-w-full ${COMPLETED_CARD_THEME.actionBadge}`}
                          >
                            <CheckCircle className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                            <span>Xong</span>
                          </span>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-black leading-tight whitespace-nowrap max-w-full transition-all group-hover:brightness-110 ${stationTheme.actionBadge}`}
                          >
                            <Play className="w-2.5 h-2.5 fill-current shrink-0" aria-hidden="true" />
                            <span>Bắt đầu</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 flex items-center justify-center w-full min-w-0 py-0.5">
                      <span
                        className={`inline-flex items-center justify-center min-w-[3.4rem] max-w-full px-3.5 py-1.5 rounded-xl border-2 text-2xl sm:text-[28px] leading-none font-black font-display tabular-nums tracking-tight transition-all duration-200 ${
                          isHighlighted
                            ? 'bg-gradient-to-br from-amber-400/40 via-cyan-400/35 to-fuchsia-500/35 border-amber-200 text-white shadow-[0_0_26px_rgba(251,191,36,0.75)]'
                            : isDone
                            ? COMPLETED_CARD_THEME.numberBadge
                            : stationTheme.numberBadge
                        }`}
                      >
                        {lessonNum}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: COSMIC OBSERVATORY OVERVIEW MAP */
        <div className="relative z-10 space-y-5 sm:space-y-7 animate-in fade-in duration-200">
          {/* Cosmic Observatory Hero Banner */}
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-[28px] border border-cyan-300/50 bg-[radial-gradient(ellipse_at_12%_16%,_rgba(56,189,248,0.42),_transparent_48%),radial-gradient(ellipse_at_88%_18%,_rgba(192,132,252,0.36),_transparent_48%),radial-gradient(ellipse_at_70%_95%,_rgba(245,158,11,0.3),_transparent_52%),linear-gradient(130deg,_#05091F_0%,_#111648_48%,_#29115B_100%)] backdrop-blur-2xl p-5 sm:p-8 lg:p-11 text-white shadow-[0_26px_76px_rgba(3,7,24,0.86),0_0_46px_rgba(34,211,238,0.22),inset_0_1px_0_rgba(165,243,252,0.24)]">
            {/* Ambient Aurora Glow Orbs */}
            <div className="pointer-events-none absolute -top-24 left-1/3 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-cyan-400/25 blur-[100px] cosmic-light-bloom" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 right-1/4 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-fuchsia-500/22 blur-[110px] cosmic-light-bloom" aria-hidden="true" />

            {/* Flagship Ringed Planet, Comet, Constellation & Astrolabe SVG */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 380"
              preserveAspectRatio="xMidYMid slice"
              className="pointer-events-none absolute inset-0 w-full h-full opacity-75 sm:opacity-90"
            >
              <defs>
                <radialGradient id="advHeroGlow" cx="84%" cy="32%" r="40%">
                  <stop offset="0%" stopColor="rgba(251,191,36,0.32)" />
                  <stop offset="45%" stopColor="rgba(56,189,248,0.16)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                </radialGradient>
                <radialGradient id="advPlanetFill" cx="32%" cy="28%" r="72%">
                  <stop offset="0%" stopColor="#A5F3FC" stopOpacity="0.75" />
                  <stop offset="45%" stopColor="#6366F1" stopOpacity="0.42" />
                  <stop offset="85%" stopColor="#311068" stopOpacity="0.24" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.1" />
                </radialGradient>
                <linearGradient id="advCometGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(103,232,249,0)" />
                  <stop offset="65%" stopColor="rgba(103,232,249,0.42)" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>
                <linearGradient id="advRingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(56,189,248,0.12)" />
                  <stop offset="50%" stopColor="rgba(251,191,36,0.55)" />
                  <stop offset="100%" stopColor="rgba(232,121,249,0.26)" />
                </linearGradient>
              </defs>
              <rect width="1200" height="380" fill="url(#advHeroGlow)" />

              {/* Astrolabe Orbital Trajectories */}
              <circle cx="1015" cy="108" r="185" fill="none" stroke="rgba(56,189,248,0.24)" strokeWidth="1.2" strokeDasharray="6 8" />
              <circle cx="1015" cy="108" r="265" fill="none" stroke="rgba(251,191,36,0.16)" strokeWidth="1" />
              <circle cx="1015" cy="108" r="345" fill="none" stroke="rgba(168,85,247,0.16)" strokeWidth="1" strokeDasharray="3 10" />

              {/* Luminous Ringed Planet & Orbiting Moons */}
              <circle cx="1015" cy="108" r="58" fill="url(#advPlanetFill)" stroke="rgba(165,243,252,0.45)" strokeWidth="1.2" />
              <ellipse cx="1015" cy="108" rx="126" ry="28" transform="rotate(-18 1015 108)" fill="none" stroke="url(#advRingGrad)" strokeWidth="1.8" />
              <ellipse cx="1015" cy="108" rx="106" ry="21" transform="rotate(14 1015 108)" fill="none" stroke="rgba(103,232,249,0.28)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="896" cy="144" r="3.8" fill="#67E8F9" />
              <circle cx="1134" cy="70" r="4.2" fill="#FDE68A" />

              {/* Shooting Star / Comet Trail */}
              <line x1="655" y1="24" x2="782" y2="76" stroke="url(#advCometGrad)" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="782" cy="76" r="2.6" fill="#FEF08A" />

              {/* Constellation Geometry & 4-Point Diamond Stars */}
              <polyline points="82,58 210,28 352,78 508,32 650,74" fill="none" stroke="rgba(103,232,249,0.2)" strokeWidth="1" strokeDasharray="3 5" />
              <path d="M210 20 L212 26 L218 28 L212 30 L210 36 L208 30 L202 28 L208 26 Z" fill="#FDE68A" />
              <path d="M508 23 L510 30 L517 32 L510 34 L508 41 L506 34 L499 32 L506 30 Z" fill="#67E8F9" />
              <path d="M876 24 L878 30 L884 32 L878 34 L876 40 L874 34 L868 32 L874 30 Z" fill="#F9A8D4" />
              <circle cx="82" cy="58" r="2.2" fill="#67E8F9" />
              <circle cx="352" cy="78" r="1.6" fill="#FFFFFF" />
              <circle cx="650" cy="74" r="2" fill="#67E8F9" />
              <circle cx="1142" cy="192" r="2.2" fill="#FDE68A" />
              <circle cx="165" cy="296" r="1.8" fill="#FFFFFF" />
              <circle cx="480" cy="318" r="1.6" fill="#67E8F9" />
            </svg>

            {/* Top & Bottom Hairline Neon Beams */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 sm:inset-x-10 h-[2.5px] rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.85)]"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-6 sm:inset-x-10 h-[2.5px] rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent shadow-[0_0_22px_rgba(251,191,36,0.72)]"
            />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 lg:gap-8">
              <div className="w-full lg:max-w-3xl space-y-5 sm:space-y-6">
                <div className="space-y-2.5 sm:space-y-3 relative">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-x-6 top-2 bottom-0 rounded-full bg-[radial-gradient(ellipse_at_28%_55%,_rgba(56,189,248,0.3),_rgba(251,191,36,0.14)_48%,_transparent_74%)] blur-2xl cosmic-light-bloom"
                  />
                  <div className="relative inline-flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.16em] sm:tracking-[0.26em] text-cyan-100 drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                    <Orbit className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0 drop-shadow-[0_0_10px_rgba(251,191,36,0.85)]" aria-hidden="true" />
                    <span>Hành Trình Khám Phá 6 Trạm Vũ Trụ</span>
                  </div>

                  <h1 className="relative font-display [text-wrap:balance]">
                    <span className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-0.5 text-2xl sm:text-4xl lg:text-[46px] font-black uppercase tracking-tight leading-[1.12] drop-shadow-[0_0_26px_rgba(56,189,248,0.45)]">
                      <span className="bg-gradient-to-r from-white via-cyan-100 to-sky-300 bg-clip-text text-transparent cosmic-glow-title-cyan">
                        TRẠM KHÔNG GIAN
                      </span>
                      <span aria-hidden="true" className="text-amber-300 text-lg sm:text-2xl lg:text-3xl drop-shadow-[0_0_20px_rgba(251,191,36,0.98)] animate-pulse">
                        ✦
                      </span>
                      <span className="bg-gradient-to-r from-amber-100 via-yellow-200 to-orange-300 bg-clip-text text-transparent cosmic-glow-title-gold">
                        TOÁN TƯ DUY
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="block mt-2.5 sm:mt-3 h-[4px] w-32 sm:w-52 rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-fuchsia-400 shadow-[0_0_26px_rgba(34,211,238,0.95),0_0_42px_rgba(251,191,36,0.45)]"
                    />
                  </h1>
                </div>

                {/* Cosmic Telemetry Progress Pods (Responsive 2-col on mobile, inline on sm+) */}
                <div className="grid grid-cols-2 sm:inline-flex items-stretch gap-2.5 sm:gap-4 w-full sm:w-auto text-xs sm:text-sm font-black">
                  <div className="relative overflow-hidden bg-gradient-to-br from-cyan-400/26 via-indigo-500/32 to-fuchsia-500/26 border border-cyan-300/75 px-3 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2.5 sm:gap-3.5 shadow-[0_0_32px_rgba(34,211,238,0.34),0_12px_34px_rgba(34,211,238,0.24),inset_0_1px_0_rgba(255,255,255,0.3)] backdrop-blur-xl min-w-0">
                    <span
                      aria-hidden="true"
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-300 via-sky-400 to-fuchsia-400 text-slate-950 flex items-center justify-center shadow-[0_0_26px_rgba(34,211,238,0.85)] shrink-0 ring-2 ring-white/35"
                    >
                      <Gem className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col leading-tight min-w-0">
                      <span className="text-lg sm:text-2xl font-black text-white tabular-nums tracking-tight drop-shadow-[0_0_14px_rgba(34,211,238,0.72)]">
                        {totalStars}
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider text-cyan-200 mt-0.5 truncate">
                        Tinh thể thu thập
                      </span>
                    </div>
                  </div>

                  <div className="relative overflow-hidden bg-gradient-to-br from-amber-300/24 via-[#151E54]/90 to-emerald-400/24 border border-amber-300/65 px-3 py-3 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl flex items-center gap-2.5 sm:gap-3.5 shadow-[0_0_30px_rgba(251,191,36,0.28),0_12px_32px_rgba(251,191,36,0.22),inset_0_1px_0_rgba(255,255,255,0.26)] backdrop-blur-xl min-w-0">
                    <span
                      aria-hidden="true"
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-200 via-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center shadow-[0_0_24px_rgba(251,191,36,0.72)] shrink-0 ring-2 ring-white/35"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                    </span>
                    <div className="flex flex-col leading-tight min-w-0">
                      <span className="text-lg sm:text-2xl font-black text-white tabular-nums tracking-tight drop-shadow-[0_0_14px_rgba(251,191,36,0.58)]">
                        {completedLessonIds.length}
                        <span className="text-amber-200/90 text-xs sm:text-sm font-extrabold"> / {ALL_LESSONS.length}</span>
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide sm:tracking-wider text-amber-200 mt-0.5 truncate">
                        Thử thách hoàn thành
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Standalone Cosmic Command Mode Bar (Outside Hero, Responsive Across All Devices) */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="grid grid-cols-2 sm:inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 w-full sm:w-auto rounded-2xl bg-[linear-gradient(135deg,_rgba(8,13,44,0.95),_rgba(20,24,78,0.9))] border border-cyan-300/35 shadow-[0_16px_40px_rgba(3,7,24,0.68),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-2xl">
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setOverviewMode('stations');
                }}
                className={`group relative overflow-hidden inline-flex items-center justify-center gap-1.5 sm:gap-2.5 min-h-[44px] sm:min-h-[48px] px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  overviewMode === 'stations'
                    ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.52),0_0_36px_rgba(232,121,249,0.26),inset_0_1px_0_rgba(255,255,255,0.65)]'
                    : 'bg-white/[0.04] hover:bg-cyan-400/15 text-cyan-100 hover:text-white border border-cyan-300/20 hover:border-cyan-300/60 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]'
                }`}
              >
                <Radar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-200 group-hover:rotate-12" aria-hidden="true" />
                <span>Bản đồ 6 Trạm</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  setOverviewMode('all');
                }}
                className={`group relative overflow-hidden inline-flex items-center justify-center gap-1.5 sm:gap-2.5 min-h-[44px] sm:min-h-[48px] px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-black uppercase tracking-wide transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  overviewMode === 'all'
                    ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_28px_rgba(34,211,238,0.52),0_0_36px_rgba(232,121,249,0.28),inset_0_1px_0_rgba(255,255,255,0.65)]'
                    : 'bg-white/[0.04] hover:bg-fuchsia-400/15 text-fuchsia-100 hover:text-white border border-fuchsia-300/25 hover:border-cyan-300/60 hover:shadow-[0_0_18px_rgba(232,121,249,0.32)]'
                }`}
              >
                <Rocket className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                <span>TẤT CẢ CÁC TRẠM</span>
              </button>
            </div>

            <div className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-bold text-cyan-100/85">
              <Orbit className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
              <span>
                {overviewMode === 'stations'
                  ? 'Đang hiển thị 6 Trạm Không Gian'
                  : `Đang mở toàn bộ ${ALL_LESSONS.length} Thử thách`}
              </span>
            </div>
          </div>

          {overviewMode === 'stations' ? (
            /* 6 Cosmic Space Stations Grid */
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TOPICS.map((topic, index) => {
                  const topicLessons = ALL_LESSONS.filter((l) => l.topicId === topic.id);
                  const completedInTopic = topicLessons.filter((l) =>
                    completedLessonIds.includes(l.id)
                  ).length;
                  const isAllCompleted =
                    completedInTopic === topicLessons.length && topicLessons.length > 0;
                  const progressPercent = Math.round(
                    (completedInTopic / topicLessons.length) * 100
                  );

                  return (
                    <div
                      key={topic.id}
                      className="group relative overflow-hidden bg-gradient-to-br from-[#131E58]/95 to-[#0B1136]/98 backdrop-blur-xl rounded-3xl border border-cyan-300/35 hover:border-cyan-200 shadow-[0_18px_46px_rgba(3,7,24,0.68),0_0_24px_rgba(34,211,238,0.12)] hover:shadow-[0_0_48px_rgba(34,211,238,0.44),0_22px_58px_rgba(168,85,247,0.34)] transition-all duration-200 flex flex-col justify-between"
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.28),transparent_65%)]"
                      />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-0 inset-x-5 h-[2.5px] rounded-full transition-all duration-300 ${
                          isAllCompleted
                            ? 'bg-gradient-to-r from-emerald-300 to-cyan-400 shadow-[0_0_14px_rgba(52,211,153,0.65)] group-hover:shadow-[0_0_22px_rgba(52,211,153,0.95)]'
                            : 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-400 opacity-85 shadow-[0_0_12px_rgba(56,189,248,0.45)] group-hover:opacity-100 group-hover:shadow-[0_0_22px_rgba(56,189,248,0.95)]'
                        }`}
                      />

                      {/* Cosmic Station Card Header */}
                      <div
                        onClick={() => {
                          sound.playClick();
                          setSelectedTopicId(topic.id);
                        }}
                        className="relative overflow-hidden p-6 border-b border-white/10 bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.2),_transparent_60%),linear-gradient(135deg,_rgba(22,33,92,0.85),_rgba(24,20,70,0.85))] text-white cursor-pointer"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-wider">
                          <span className="text-cyan-300 inline-flex items-center gap-1.5">
                            <Orbit className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                            <span>Trạm 0{index + 1}</span>
                          </span>
                          {isAllCompleted ? (
                            <span className="text-emerald-300 inline-flex items-center gap-1">
                              <Trophy className="w-3.5 h-3.5" aria-hidden="true" /> Hoàn thành
                            </span>
                          ) : (
                            <span className="text-amber-300 tabular-nums">
                              {completedInTopic}/{topicLessons.length} bài
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-black font-display mt-2.5 text-white group-hover:text-cyan-200 leading-tight transition-colors">
                          {topic.title}
                        </h3>
                      </div>

                      {/* Subtitle & Cosmic Lesson List */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                        <p className="text-xs text-indigo-100/85 font-medium leading-relaxed">
                          {topic.subtitle}
                        </p>

                        {/* Cosmic Progress bar */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-bold text-indigo-200">
                            <span>Tiến độ hoàn thành</span>
                            <span className="text-cyan-300 font-black tabular-nums">{progressPercent}%</span>
                          </div>
                          <div className="h-2.5 bg-slate-950/90 rounded-full overflow-hidden border border-white/10">
                            <div
                              style={{ width: `${progressPercent}%` }}
                              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
                            />
                          </div>
                        </div>

                        {/* Cosmic Lesson Buttons */}
                        <div className="space-y-2 pt-2 border-t border-white/10 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
                          {topicLessons.map((lesson) => {
                            const isDone = completedLessonIds.includes(lesson.id);

                            return (
                              <button
                                key={lesson.id}
                                type="button"
                                onClick={() => {
                                  sound.playClick();
                                  onSelectLesson(lesson.id);
                                }}
                                className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all active:scale-[0.98] cursor-pointer ${
                                  isDone
                                    ? 'bg-emerald-500/15 border-emerald-400/45 text-emerald-100 hover:bg-emerald-500/25 hover:border-emerald-300 hover:shadow-[0_0_16px_rgba(52,211,153,0.28)]'
                                    : 'bg-[#080E2B]/85 border-indigo-400/25 text-indigo-100 hover:bg-indigo-900/55 hover:border-cyan-300/75 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)]'
                                }`}
                              >
                                <div className="flex items-center gap-2 truncate pr-2">
                                  <span>{lesson.mascot.avatar}</span>
                                  <span className="truncate">{lesson.title}</span>
                                </div>
                                {isDone ? (
                                  <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                                ) : (
                                  <Play className="w-3.5 h-3.5 text-cyan-300 shrink-0" aria-hidden="true" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Topic Action Buttons */}
                        <div className="flex gap-2.5 mt-2">
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              setSelectedTopicId(topic.id);
                            }}
                            className="flex-1 py-2.5 rounded-2xl font-bold text-xs bg-white/10 hover:bg-cyan-400/15 border border-white/15 hover:border-cyan-300/60 hover:shadow-[0_0_18px_rgba(34,211,238,0.3)] text-white transition-all cursor-pointer"
                          >
                            Xem chi tiết trạm
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              sound.playClick();
                              onSelectLesson(topicLessons[0]?.id);
                            }}
                            className="px-4 py-2.5 rounded-2xl font-black text-xs text-slate-950 bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 shadow-[0_6px_22px_rgba(56,189,248,0.38)] hover:shadow-[0_0_26px_rgba(34,211,238,0.55)] transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-slate-950" aria-hidden="true" />
                            <span>Vào bài</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* TẤT CẢ CÁC TRẠM - All Exercises Across Stations View */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight bg-gradient-to-r from-amber-200 via-white to-cyan-300 bg-clip-text text-transparent cosmic-glow-title-cyan">
                    TẤT CẢ CÁC TRẠM
                  </h2>
                  <p className="text-xs sm:text-sm text-cyan-200/85 font-medium mt-0.5">
                    Toàn bộ {ALL_LESSONS.length} bài tập trong 6 trạm không gian để luyện tập trực tiếp
                  </p>
                </div>

                {/* Station Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1.5 bg-[#0E1642]/90 backdrop-blur-xl border border-cyan-300/25 rounded-2xl overflow-x-auto shadow-[0_10px_28px_rgba(3,7,24,0.5)] scrollbar-thin">
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setAllTopicFilter('all');
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                      allTopicFilter === 'all'
                        ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_22px_rgba(56,189,248,0.45),0_0_30px_rgba(232,121,249,0.26)]'
                        : 'text-indigo-200 hover:text-white hover:bg-cyan-400/15 hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]'
                    }`}
                  >
                    <span>Tất cả</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-md font-black tabular-nums ${
                        allTopicFilter === 'all'
                          ? 'bg-slate-950/20 text-slate-950'
                          : 'bg-white/10 text-cyan-200'
                      }`}
                    >
                      {ALL_LESSONS.length}
                    </span>
                  </button>

                  {TOPICS.map((topic, idx) => {
                    const isSelected = allTopicFilter === topic.id;
                    const topicLessons = ALL_LESSONS.filter((l) => l.topicId === topic.id);
                    const done = topicLessons.filter((l) =>
                      completedLessonIds.includes(l.id)
                    ).length;

                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setAllTopicFilter(topic.id);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_22px_rgba(56,189,248,0.45),0_0_30px_rgba(232,121,249,0.26)]'
                            : 'text-indigo-200 hover:text-white hover:bg-cyan-400/15 hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]'
                        }`}
                      >
                        <span>Trạm 0{idx + 1}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-md font-extrabold tabular-nums ${
                            isSelected
                              ? 'bg-slate-950/20 text-slate-950'
                              : done === topicLessons.length
                              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40'
                              : 'bg-white/10 text-cyan-200'
                          }`}
                        >
                          {done}/{topicLessons.length}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* All Lessons Cosmic Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
                {(allTopicFilter === 'all'
                  ? ALL_LESSONS
                  : ALL_LESSONS.filter((l) => l.topicId === allTopicFilter)
                ).map((lesson, idx) => {
                  const isDone = completedLessonIds.includes(lesson.id);
                  const isHighlighted = highlightLessonId === lesson.id;
                  const stationIdx = Math.max(0, TOPICS.findIndex((t) => t.id === lesson.topicId));
                  const stationTheme = STATION_CARD_THEMES[stationIdx % STATION_CARD_THEMES.length];
                  const lessonNum = LESSON_STATION_NUMBER_MAP[lesson.id] ?? idx + 1;

                  return (
                    <button
                      key={lesson.id}
                      id={`station-lesson-${lesson.id}`}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        onSelectLesson(lesson.id);
                      }}
                      className={`group relative overflow-hidden p-2.5 sm:p-3 rounded-2xl border-2 text-left flex flex-col justify-between gap-2.5 min-h-[108px] w-full min-w-0 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer backdrop-blur-xl ${
                        isHighlighted
                          ? 'bg-gradient-to-br from-[#1E2B72] via-[#2A1D6E] to-[#13184A] border-amber-300 ring-2 ring-amber-300/75 shadow-[0_0_32px_rgba(251,191,36,0.55)] animate-cosmic-beacon'
                          : isDone
                          ? COMPLETED_CARD_THEME.card
                          : stationTheme.card
                      }`}
                    >
                      <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          isDone ? COMPLETED_CARD_THEME.spotlight : stationTheme.spotlight
                        }`}
                      />
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute top-0 inset-x-3 h-[3px] rounded-full transition-all duration-300 ${
                          isHighlighted
                            ? 'bg-gradient-to-r from-amber-300 via-cyan-300 to-fuchsia-400 shadow-[0_0_18px_rgba(251,191,36,0.95)]'
                            : isDone
                            ? COMPLETED_CARD_THEME.topBar
                            : stationTheme.topBar
                        }`}
                      />

                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-1 w-full min-w-0 pt-0.5">
                        <span
                          className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-black uppercase tracking-tight leading-tight whitespace-nowrap max-w-full ${stationTheme.stationBadge}`}
                        >
                          <Orbit className={`w-2.5 h-2.5 shrink-0 ${stationTheme.stationIcon}`} aria-hidden="true" />
                          <span>Trạm 0{stationIdx + 1}</span>
                        </span>

                        <div className="flex items-center gap-1 max-w-full">
                          {isHighlighted && (
                            <span className="relative flex h-2 w-2 shrink-0" aria-label="Vừa thực hiện">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-85" />
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300" />
                            </span>
                          )}
                          {isDone ? (
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-black leading-tight whitespace-nowrap max-w-full ${COMPLETED_CARD_THEME.actionBadge}`}
                            >
                              <CheckCircle className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
                              <span>Xong</span>
                            </span>
                          ) : (
                            <span
                              className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border text-[10px] font-black leading-tight whitespace-nowrap max-w-full transition-all group-hover:brightness-110 ${stationTheme.actionBadge}`}
                            >
                              <Play className="w-2.5 h-2.5 fill-current shrink-0" aria-hidden="true" />
                              <span>Bắt đầu</span>
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="relative z-10 flex items-center justify-center w-full min-w-0 py-0.5">
                        <span
                          className={`inline-flex items-center justify-center min-w-[3.4rem] max-w-full px-3.5 py-1.5 rounded-xl border-2 text-2xl sm:text-[28px] leading-none font-black font-display tabular-nums tracking-tight transition-all duration-200 ${
                            isHighlighted
                              ? 'bg-gradient-to-br from-amber-400/40 via-cyan-400/35 to-fuchsia-500/35 border-amber-200 text-white shadow-[0_0_26px_rgba(251,191,36,0.75)]'
                              : isDone
                              ? COMPLETED_CARD_THEME.numberBadge
                              : stationTheme.numberBadge
                          }`}
                        >
                          {lessonNum}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
