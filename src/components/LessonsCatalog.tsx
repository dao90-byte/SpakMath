import React, { useState } from 'react';
import { TOPICS, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { BookOpen, CheckCircle, Play, Star, Sparkles } from 'lucide-react';

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
    <div className="space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black font-display text-slate-900">
            Mục Lục Sách Bài Tập Toán Tư Duy
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            Toàn bộ các chuyên đề chuẩn theo tài liệu Toán Tư Duy Lớp 3
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-2xl overflow-x-auto">
          <button
            onClick={() => {
              sound.playClick();
              setSelectedTopicFilter('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedTopicFilter === 'all'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả bài học
          </button>
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                sound.playClick();
                setSelectedTopicFilter(t.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedTopicFilter === t.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.title}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Lesson Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLessons.map((lesson) => {
          const isDone = completedLessonIds.includes(lesson.id);

          return (
            <div
              key={lesson.id}
              onClick={() => {
                sound.playClick();
                onSelectLesson(lesson.id);
              }}
              className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-lg hover:-translate-y-1 ${
                isDone
                  ? 'bg-emerald-50/60 border-emerald-300'
                  : 'bg-white border-slate-200 hover:border-amber-300'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
                    {lesson.badgeTitle}
                  </span>
                  {isDone ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3.5 h-3.5" /> Đã làm
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400">
                      Chưa hoàn thành
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
                    {lesson.mascot.avatar}
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm md:text-base leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {lesson.instruction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">{lesson.topicName}</span>
                <span className="text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Luyện tập ngay <Play className="w-3 h-3 fill-amber-600" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
