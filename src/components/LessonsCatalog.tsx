import React, { useState } from 'react';
import { TOPICS, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { CheckCircle, Play } from 'lucide-react';

interface LessonsCatalogProps {
  completedLessonIds: string[];
  onSelectLesson: (lessonId: string) => void;
}

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
        <div>
          <h2 className="text-2xl sm:text-3xl font-black font-display bg-gradient-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent">
            Mục Lục Bài Tập Toán Tư Duy
          </h2>
          <p className="text-xs md:text-sm text-cyan-200/85 font-medium mt-0.5">
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
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson) => {
          const isDone = completedLessonIds.includes(lesson.id);

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
              className={`group relative overflow-hidden p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:-translate-y-1 backdrop-blur-xl ${
                isDone
                  ? 'bg-gradient-to-br from-[#0F2A56]/95 to-[#0B1C42]/95 border-emerald-400/55 shadow-[0_16px_40px_rgba(3,7,24,0.6)] hover:border-emerald-300 hover:shadow-[0_0_34px_rgba(52,211,153,0.34),0_16px_42px_rgba(34,211,238,0.2)]'
                  : 'bg-gradient-to-br from-[#131E58]/95 to-[#0B1136]/98 border-indigo-400/35 hover:border-cyan-300 shadow-[0_16px_40px_rgba(3,7,24,0.6)] hover:shadow-[0_0_36px_rgba(34,211,238,0.38),0_18px_44px_rgba(168,85,247,0.26)]'
              }`}
            >
              {/* Hover Target Spotlight */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.24),transparent_68%)]"
              />
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-0 inset-x-5 h-[2px] rounded-full transition-all duration-300 ${
                  isDone
                    ? 'bg-gradient-to-r from-emerald-300 to-cyan-400 opacity-85 group-hover:opacity-100 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.8)]'
                    : 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-400 opacity-55 group-hover:opacity-100 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.85)]'
                }`}
              />

              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-cyan-200 uppercase tracking-wider">
                    {lesson.badgeTitle}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-black text-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" /> Đã làm
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-indigo-300/80">
                      Chưa hoàn thành
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2.5 bg-[#080E2B]/90 rounded-2xl border border-cyan-300/25 shrink-0">
                    {lesson.mascot.avatar}
                  </span>
                  <div>
                    <h3 className="font-extrabold font-display text-white group-hover:text-cyan-200 text-sm md:text-base leading-snug transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-indigo-200/80 line-clamp-2 mt-1">
                      {lesson.instruction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                <span className="text-indigo-300/80">{lesson.topicName}</span>
                <span className="text-cyan-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Luyện tập ngay <Play className="w-3 h-3 fill-cyan-300" aria-hidden="true" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
