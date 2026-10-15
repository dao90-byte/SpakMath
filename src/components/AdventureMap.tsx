import React from 'react';
import { TOPICS, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { Star, CheckCircle, Lock, Play, Sparkles, Trophy } from 'lucide-react';

interface AdventureMapProps {
  completedLessonIds: string[];
  totalStars: number;
  onSelectLesson: (lessonId: string) => void;
  onSelectTopic: (topicId: string) => void;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  completedLessonIds,
  totalStars,
  onSelectLesson,
  onSelectTopic
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-600 p-6 md:p-10 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-bold uppercase tracking-wider text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Vương Quốc Toán Học Spark Math
          </div>

          <h1 className="text-2xl md:text-4xl font-black font-display tracking-tight text-white">
            Bản Đồ Thám Hiểm Toán Tư Duy Lớp 3
          </h1>

          <p className="text-sm md:text-base text-teal-50 font-medium">
            Cùng Khỉ Benny, Thỏ Abby và Chuột Casey khám phá 5 vùng đất kỳ thú, thu thập đủ các ngôi sao và giải mã các câu đố logic siêu cuốn hút!
          </p>

          {/* Quick Progress Bar */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-bold">
            <div className="bg-white/25 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-300 text-amber-400" />
              <span>{totalStars} Ngôi sao thu thập</span>
            </div>
            <div className="bg-white/25 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-200" />
              <span>{completedLessonIds.length} / {ALL_LESSONS.length} Thử thách hoàn thành</span>
            </div>
          </div>
        </div>

        {/* Mascot trio illustration */}
        <div className="hidden lg:flex items-center gap-2 absolute right-8 bottom-4 text-6xl drop-shadow-lg select-none pointer-events-none animate-bounce-slow">
          <span>🐰</span>
          <span>🐵</span>
          <span>🐹</span>
        </div>
      </div>

      {/* 5 Island Stations Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black font-display text-slate-800">
              5 Trạm Phiêu Lưu Kỳ Thú
            </h2>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              Chạm vào từng trạm để bắt đầu làm quen và luyện tập theo giáo trình
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Cập nhật theo sách bài tập
          </span>
        </div>

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
                className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Station Card Header */}
                <div className={`p-6 bg-gradient-to-r ${topic.bgGradient} text-white relative`}>
                  <div className="flex items-start justify-between">
                    <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-1 rounded-full">
                      Trạm 0{index + 1}
                    </span>
                    {isAllCompleted ? (
                      <span className="bg-amber-400 text-amber-950 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
                        <Trophy className="w-3 h-3" /> Hoàn thành
                      </span>
                    ) : (
                      <span className="bg-white/20 text-xs font-bold px-2.5 py-1 rounded-full">
                        {completedInTopic}/{topicLessons.length} bài
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-black font-display mt-3 text-white leading-tight">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-white/90 font-medium mt-1">
                    Bạn đồng hành: <span className="font-bold underline">{topic.mascotName}</span>
                  </p>
                </div>

                {/* Subtitle & Lessons List Preview */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs text-slate-600 font-medium">
                    {topic.subtitle}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <span>Tiến độ hoàn thành</span>
                      <span className="tabular-nums">{progressPercent}%</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        style={{ width: `${progressPercent}%` }}
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      />
                    </div>
                  </div>

                  {/* Lesson Buttons */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
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
                          className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between text-xs font-bold transition-all active:scale-98 ${
                            isDone
                              ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 hover:bg-emerald-100/70'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span>{lesson.mascot.avatar}</span>
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          {isDone ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Play className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Topic Action Button */}
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectLesson(topicLessons[0]?.id);
                    }}
                    className={`w-full py-3 rounded-2xl font-bold text-sm text-white shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2 bg-gradient-to-r ${topic.bgGradient}`}
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isAllCompleted ? 'Luyện tập lại' : 'Bắt đầu khám phá'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
