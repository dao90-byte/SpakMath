import React, { useState } from 'react';
import { TOPICS, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { CheckCircle, Orbit, Play } from 'lucide-react';

interface LessonsCatalogProps {
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
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

const STATION_CARD_THEMES = [
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

export const LessonsCatalog: React.FC<LessonsCatalogProps> = ({
  completedLessonIds,
  onSelectLesson
}) => {
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>('all');

  const filteredLessons =
    selectedTopicFilter === 'all'
      ? ALL_LESSONS
      : ALL_LESSONS.filter((l) => l.topicId === selectedTopicFilter);

  return (
    <div className="space-y-6 pb-16 relative">
      {/* Ambient Cosmic Starfield & Nebula Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-[440px] h-[440px] rounded-full bg-cyan-500/16 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[460px] h-[460px] rounded-full bg-fuchsia-500/18 blur-[140px]" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-70">
          <circle cx="110" cy="95" r="1.4" fill="#E0F2FE" />
          <circle cx="290" cy="70" r="2" fill="#67E8F9" className="animate-cosmic-twinkle" />
          <circle cx="510" cy="135" r="1.3" fill="#FFFFFF" />
          <circle cx="760" cy="82" r="1.8" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="1020" cy="120" r="1.5" fill="#67E8F9" />
          <circle cx="1280" cy="76" r="2" fill="#FDE047" className="animate-cosmic-twinkle" />
          <circle cx="180" cy="490" r="1.6" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="620" cy="540" r="1.4" fill="#67E8F9" />
          <circle cx="1140" cy="510" r="1.8" fill="#FFFFFF" className="animate-cosmic-twinkle" />
          <circle cx="340" cy="800" r="1.8" fill="#FDE047" />
          <circle cx="940" cy="810" r="1.5" fill="#67E8F9" className="animate-cosmic-twinkle" />
        </svg>
      </div>

      {/* Header & Cosmic Filter Tabs */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full bg-[radial-gradient(ellipse_at_left,_rgba(56,189,248,0.24),_rgba(217,70,239,0.12)_48%,_transparent_72%)] blur-2xl cosmic-light-bloom"
          />
          <h2 className="relative text-2xl sm:text-3xl font-black font-display bg-gradient-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent cosmic-glow-title-cyan">
            Mục Lục Bài Tập Toán Tư Duy
          </h2>
          <p className="relative text-xs md:text-sm text-cyan-200/90 font-medium mt-0.5">
            Toàn bộ các chuyên đề không gian Toán Tư Duy Lớp 3
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1.5 bg-[#090F2E]/92 backdrop-blur-xl border border-cyan-300/30 rounded-2xl overflow-x-auto shadow-[0_12px_32px_rgba(3,7,24,0.65)]">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setSelectedTopicFilter('all');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              selectedTopicFilter === 'all'
                ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_24px_rgba(56,189,248,0.45),0_0_32px_rgba(232,121,249,0.28)]'
                : 'text-indigo-200 hover:text-white hover:bg-cyan-400/15 hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]'
            }`}
          >
            Tất cả bài học
          </button>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedTopicFilter(t.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedTopicFilter === t.id
                  ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 font-black shadow-[0_0_24px_rgba(56,189,248,0.45),0_0_32px_rgba(232,121,249,0.28)]'
                  : 'text-indigo-200 hover:text-white hover:bg-cyan-400/15 hover:shadow-[0_0_16px_rgba(34,211,238,0.28)]'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Cosmic Lesson Cards */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
        {filteredLessons.map((lesson, idx) => {
          const isDone = completedLessonIds.includes(lesson.id);
          const stationIdx = Math.max(0, TOPICS.findIndex((t) => t.id === lesson.topicId));
          const stationTheme = STATION_CARD_THEMES[stationIdx % STATION_CARD_THEMES.length];
          const lessonNum = LESSON_STATION_NUMBER_MAP[lesson.id] ?? idx + 1;

          return (
            <div
              key={lesson.id}
              role="button"
              tabIndex={0}
              onClick={() => {
                sound.playClick();
                onSelectLesson(lesson.id);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  sound.playClick();
                  onSelectLesson(lesson.id);
                }
              }}
              className={`group relative overflow-hidden p-2.5 sm:p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between gap-2.5 min-h-[108px] w-full min-w-0 hover:-translate-y-0.5 backdrop-blur-xl ${
                isDone ? COMPLETED_CARD_THEME.card : stationTheme.card
              }`}
            >
              {/* Hover Target Spotlight */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isDone ? COMPLETED_CARD_THEME.spotlight : stationTheme.spotlight
                }`}
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 inset-x-3 h-[3px] rounded-full transition-all duration-300 ${
                  isDone ? COMPLETED_CARD_THEME.topBar : stationTheme.topBar
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
                    isDone ? COMPLETED_CARD_THEME.numberBadge : stationTheme.numberBadge
                  }`}
                >
                  {lessonNum}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
