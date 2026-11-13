import React, { useState, useEffect } from 'react';
import { 
  VIETNAM_GRADE_3_LESSONS, 
  VietnamGrade3Lesson 
} from '../../data/vietnamGrade3LessonsData';
import { 
  getCosmicProgress, 
  CosmicProgressData, 
  PLANETS_METADATA 
} from '../../utils/cosmicProgressStorage';
import { CosmicPlanetaryMap } from './CosmicPlanetaryMap';
import { sound } from '../../utils/soundEffects';
import { 
  BookOpen, 
  CheckCircle2, 
  Star, 
  Award, 
  ArrowRight, 
  HelpCircle, 
  Sparkles,
  Layers,
  GraduationCap,
  Calendar,
  ClipboardCheck,
  Compass,
  Rocket
} from 'lucide-react';

interface VietnamGrade3HubProps {
  completedLessonIds: string[];
  assessmentScore?: number | null;
  isTeacherMode?: boolean;
  onSelectLesson: (lesson: VietnamGrade3Lesson) => void;
  onOpenAssessment: () => void;
}

export const VietnamGrade3Hub: React.FC<VietnamGrade3HubProps> = ({
  completedLessonIds,
  assessmentScore,
  isTeacherMode = false,
  onSelectLesson,
  onOpenAssessment
}) => {
  const lessons = VIETNAM_GRADE_3_LESSONS;
  const [cosmicProgress, setCosmicProgress] = useState<CosmicProgressData>(getCosmicProgress);

  // Sync cosmic progress on mount and visibility
  useEffect(() => {
    const handleSync = () => {
      setCosmicProgress(getCosmicProgress());
    };
    handleSync();
    window.addEventListener('storage', handleSync);
    return () => window.removeEventListener('storage', handleSync);
  }, []);

  const handleSelectPlanetLesson = (lessonId: string) => {
    const target = lessons.find((l) => l.id === lessonId);
    if (target) {
      onSelectLesson(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in pb-12 font-sans">
      {/* Interactive Solar System & Planetary Conquest Map */}
      <CosmicPlanetaryMap 
        progress={cosmicProgress}
        isTeacherMode={isTeacherMode}
        onSelectLesson={handleSelectPlanetLesson}
      />

      {/* Prominent Periodic Assessment Cosmic Gate */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 rounded-3xl p-5 sm:p-6 border-2 border-cyan-400/50 shadow-[0_0_48px_rgba(34,211,238,0.2),0_20px_50px_rgba(2,6,23,0.75)] flex flex-col md:flex-row items-center justify-between gap-4 animate-scale-in text-white relative overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-amber-300 via-50% to-transparent shadow-[0_0_18px_rgba(251,191,36,0.75)]"
        />
        <div
          aria-hidden="true"
          className="cosmic-light-bloom -left-8 -top-6 w-64 h-36 bg-gradient-to-r from-amber-400/25 via-cyan-400/20 to-fuchsia-500/20"
        />
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-300 to-yellow-200 text-slate-950 flex items-center justify-center text-2xl shadow-[0_0_26px_rgba(251,191,36,0.65)] shrink-0">
            📜
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/25 text-amber-200 px-2.5 py-0.5 rounded-full border border-amber-300/50 shadow-[0_0_12px_rgba(251,191,36,0.3)] font-mono">
                TRẠM ĐÁNH GIÁ THIÊN HÀ · CHỦ ĐỀ 4
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-[0_0_14px_rgba(255,255,255,0.28)]">
              Bài Kiểm Tra Định Kỳ Năng Lực Học Phần
            </h3>
            <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-medium">
              10 thử thách vũ trụ bao quát 4 cấp độ nhận thức: Nhận biết, Thông hiểu, Vận dụng và Vận dụng cao.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenAssessment();
          }}
          className="relative z-10 px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm whitespace-nowrap shadow-[0_0_26px_rgba(0,240,255,0.55)] hover:shadow-[0_0_36px_rgba(0,240,255,0.78)] active:scale-95 transition-all flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
        >
          <ClipboardCheck className="w-4 h-4 text-slate-950" />
          <span>{assessmentScore !== undefined && assessmentScore !== null ? `Kiểm tra lại (${assessmentScore}/10 điểm)` : 'Khai Hỏa Kiểm Tra Ngay'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Planetary Exploration Stations List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative">
            <div
              aria-hidden="true"
              className="cosmic-light-bloom -left-6 -top-4 w-72 h-20 bg-gradient-to-r from-cyan-400/30 via-sky-300/20 to-indigo-500/20"
            />
            <span className="relative text-xs font-bold text-cyan-300 block font-mono uppercase tracking-wider">
              DANH MỤC TRẠM HÀNH TINH
            </span>
            <h2 className="relative text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-100 to-indigo-200 cosmic-glow-title-cyan flex items-center gap-2">
              <span>Học Phần 1: Phép Nhân & Phép Chia Trong Phạm Vi 100</span>
              <Rocket className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_12px_rgba(34,211,238,0.85)]" />
            </h2>
          </div>
          <span className="text-xs font-bold text-cyan-200 bg-slate-900/95 px-3 py-1.5 rounded-xl border border-cyan-400/50 shadow-[0_0_16px_rgba(34,211,238,0.25)] font-mono">
            7 HÀNH TINH
          </span>
        </div>

        {/* Planet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lessons.map((lesson) => {
            const isDone = completedLessonIds.includes(lesson.id) || cosmicProgress.conqueredLessons.includes(lesson.id);
            const isUnlocked = isTeacherMode || cosmicProgress.unlockedLessons.includes(lesson.id);
            const planetMeta = PLANETS_METADATA.find(p => p.lessonId === lesson.id);

            return (
              <div
                key={lesson.id}
                className="bg-[#0B0F19]/95 rounded-3xl border-2 border-cyan-400/30 hover:border-cyan-300/80 shadow-[0_14px_38px_rgba(2,6,23,0.7),0_0_22px_rgba(34,211,238,0.1)] hover:shadow-[0_20px_52px_rgba(2,6,23,0.85),0_0_38px_rgba(0,240,255,0.3)] transition-all duration-300 p-5 sm:p-6 flex flex-col justify-between group text-white relative overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-300/65 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"
                />
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 font-black text-xs flex items-center justify-center shadow-xs font-mono">
                        {lesson.sgkLessonNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        {planetMeta ? planetMeta.planetName : `Bài ${lesson.sgkLessonNumber}`}
                      </span>
                    </div>

                    {isDone ? (
                      <span className="flex items-center gap-1 text-[11px] font-black text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Đã Chinh Phục
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-[11px] font-bold text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2.5 py-0.5 rounded-full">
                        Đang Mở
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-500 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                        Chưa Mở
                      </span>
                    )}
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                    {lesson.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium leading-relaxed">
                    {lesson.subtitle}
                  </p>

                  {/* Core Socratic Question HUD */}
                  <div className="mt-3.5 p-3.5 bg-slate-900/90 border border-cyan-500/30 rounded-2xl flex items-start gap-2.5 shadow-inner">
                    <span className="text-lg shrink-0">💡</span>
                    <span className="text-cyan-100 font-bold text-xs sm:text-sm leading-relaxed">
                      {lesson.coreQuestion}
                    </span>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                  <div className="text-xs font-semibold text-slate-300 font-mono">
                    {lesson.socraticDiscovery.length} trạm khám phá · {lesson.exercises.length} bài tập
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                      onSelectLesson(lesson);
                    }}
                    className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
                      isDone
                        ? 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black shadow-[0_0_12px_rgba(0,240,255,0.3)]'
                    }`}
                  >
                    <span>{isDone ? 'Khám phá lại' : 'Đến Hành Tinh'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Curriculum Footnote */}
      <div className="p-4 bg-[#0B0F19] rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-slate-300">Toán Lớp 3 · Bộ sách Kết Nối Tri Thức Với Cuộc Sống (Phiên bản Vũ Trụ Tri Thức)</span>
        </div>
        <span className="font-bold text-cyan-400 hidden sm:inline font-mono">
          Học sâu bản chất · Khám phá thiên hà
        </span>
      </div>
    </div>
  );
};
