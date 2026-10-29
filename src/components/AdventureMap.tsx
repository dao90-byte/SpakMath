import React, { useState, useEffect } from 'react';
import { TOPICS, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { Star, CheckCircle, Play, Sparkles, Trophy, ArrowLeft, Grid, Compass, Brain } from 'lucide-react';

interface AdventureMapProps {
  completedLessonIds: string[];
  totalStars: number;
  onSelectLesson: (lessonId: string) => void;
  onSelectTopic: (topicId: string) => void;
  onOpenMethodology?: () => void;
  initialTopicId?: string | null;
  highlightLessonId?: string | null;
}

export const AdventureMap: React.FC<AdventureMapProps> = ({
  completedLessonIds,
  totalStars,
  onSelectLesson,
  onSelectTopic,
  onOpenMethodology,
  initialTopicId = null,
  highlightLessonId = null
}) => {
  // If user just executed a lesson in a station, focus on that station directly
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(initialTopicId);

  useEffect(() => {
    if (initialTopicId) {
      setSelectedTopicId(initialTopicId);
    }
  }, [initialTopicId]);

  // Scroll into view to the last executed lesson
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
    <div className="space-y-6 pb-16">
      {/* Station Navigation Quick Bar */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 bg-slate-200/80 rounded-2xl scrollbar-thin">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            setSelectedTopicId(null);
          }}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
            selectedTopicId === null
              ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-300'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-emerald-600" />
          <span>Bản đồ tổng quan (6 Trạm)</span>
        </button>

        {TOPICS.map((topic, idx) => {
          const isSelected = selectedTopicId === topic.id;
          const count = ALL_LESSONS.filter((l) => l.topicId === topic.id).length;
          const done = ALL_LESSONS.filter(
            (l) => l.topicId === topic.id && completedLessonIds.includes(l.id)
          ).length;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedTopicId(topic.id);
              }}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-white text-slate-900 shadow-sm ring-2 ring-emerald-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <span>Trạm {idx + 1}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  done === count
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {done}/{count}
              </span>
            </button>
          );
        })}
      </div>

      {/* VIEW MODE 1: FOCUSED STATION VIEW (Returning to the station you just executed!) */}
      {selectedTopicId && focusedTopic ? (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Station Banner */}
          <div
            className={`rounded-3xl p-6 md:p-8 text-white shadow-xl bg-gradient-to-r ${focusedTopic.bgGradient} relative overflow-hidden`}
          >
            <div className="relative z-10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="bg-black/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    Trạm Đang Thực Thi
                  </span>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                    {completedInFocused} / {focusedLessons.length} Thử thách đã vượt qua
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedTopicId(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Xem toàn cảnh 6 Trạm
                </button>
              </div>

              <div>
                <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white">
                  {focusedTopic.title}
                </h1>
                <p className="text-sm md:text-base text-white/90 font-medium mt-1">
                  {focusedTopic.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
                <div className="bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                  <span>Bạn đồng hành:</span>
                  <span className="underline font-black">{focusedTopic.mascotName}</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-xl flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>{completedInFocused * 3} Ngôi sao tích lũy tại trạm</span>
                </div>
              </div>
            </div>
          </div>

          {/* Methodology Thinking Checkpoint Card for Comparison stations */}
          {onOpenMethodology && (selectedTopicId === 'volume' || selectedTopicId === 'pictograph') && (
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border-2 border-amber-300 animate-fade-in">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl shrink-0">
                  🧠
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-black/20 text-amber-100 px-2 py-0.5 rounded-full">
                      CỘT MỐC PHƯƠNG PHÁP LUẬN
                    </span>
                    <span className="text-xs text-amber-100 font-bold hidden sm:inline">
                      Mô hình tư duy nền tảng
                    </span>
                  </div>
                  <h3 className="text-sm font-black mt-0.5">
                    Bài Kiểm Tra Tư Duy: Mô Hình So Sánh Hơn - Kém
                  </h3>
                  <p className="text-xs text-amber-100">
                    Khảo sát sâu: Ít hơn là gì? Nhiều hơn là gì? Vì sao dùng phép trừ? Bình 18L &amp; 12L và bài toán san sẻ.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onOpenMethodology();
                }}
                className="px-4 py-2 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-black text-xs whitespace-nowrap shadow-sm active:scale-95 transition-transform shrink-0"
              >
                Làm Bài Kiểm Tra Mẫu →
              </button>
            </div>
          )}

          {/* Lessons Grid for Focused Station */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg md:text-xl font-black text-slate-800">
                Danh Sách Bài Tập ({focusedLessons.length} Thử Thách)
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Chạm vào bài bất kỳ để tiếp tục luyện tập
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {focusedLessons.map((lesson, idx) => {
                const isDone = completedLessonIds.includes(lesson.id);
                const isHighlighted = highlightLessonId === lesson.id;

                return (
                  <button
                    key={lesson.id}
                    id={`station-lesson-${lesson.id}`}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onSelectLesson(lesson.id);
                    }}
                    className={`p-4 rounded-2xl border-2 text-left flex flex-col justify-between gap-3 transition-all active:scale-98 ${
                      isHighlighted
                        ? 'bg-amber-50/90 border-amber-400 ring-4 ring-amber-300/80 shadow-md'
                        : isDone
                        ? 'bg-emerald-50/60 border-emerald-300 hover:bg-emerald-100/70 hover:shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{lesson.mascot.avatar}</span>
                        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded-md">
                          {lesson.badgeTitle}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {isHighlighted && (
                          <span className="bg-amber-400 text-amber-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow-xs animate-pulse">
                            📍 Vừa thực hiện
                          </span>
                        )}
                        {isDone ? (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle className="w-3.5 h-3.5" /> Xong
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            <Play className="w-3 h-3 text-slate-400" /> Bắt đầu
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="font-bold text-slate-800 text-sm line-clamp-2 leading-snug">
                      {lesson.title}
                    </p>

                    <p className="text-xs text-slate-500 line-clamp-1">
                      {lesson.instruction}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* VIEW MODE 2: OVERVIEW MAP (6 Stations Cards Grid) */
        <div className="space-y-8 animate-in fade-in duration-200">
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
                Cùng Khỉ Benny, Thỏ Abby và Chuột Casey khám phá trọn vẹn 6 vùng đất kỳ thú, thu thập đủ các ngôi sao và giải mã các câu đố logic siêu cuốn hút!
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

          {/* 6 Island Stations Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-black font-display text-slate-800">
                  6 Trạm Phiêu Lưu Kỳ Thú & Đấu Trường
                </h2>
                <p className="text-xs md:text-sm text-slate-500 font-medium">
                  Chạm vào từng trạm để xem toàn bộ thử thách và lộ trình chi tiết
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                Toàn bộ 121 thử thách
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
                    <div
                      onClick={() => {
                        sound.playClick();
                        setSelectedTopicId(topic.id);
                      }}
                      className={`p-6 bg-gradient-to-r ${topic.bgGradient} text-white relative cursor-pointer`}
                    >
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
                      <div className="space-y-2 pt-2 border-t border-slate-100 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
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

                      {/* Topic Action Button: Opens focused station view or starts first lesson */}
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            setSelectedTopicId(topic.id);
                          }}
                          className="flex-1 py-2.5 rounded-2xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        >
                          Xem chi tiết trạm
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            sound.playClick();
                            onSelectLesson(topicLessons[0]?.id);
                          }}
                          className={`px-4 py-2.5 rounded-2xl font-bold text-xs text-white shadow-md transition-transform active:scale-95 flex items-center justify-center gap-1.5 bg-gradient-to-r ${topic.bgGradient}`}
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>Vào bài</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
