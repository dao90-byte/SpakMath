import React from 'react';
import { 
  PLANETS_METADATA, 
  CosmicProgressData 
} from '../../utils/cosmicProgressStorage';
import { sound } from '../../utils/soundEffects';
import { 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  Star, 
  Compass, 
  ChevronRight,
  Sun
} from 'lucide-react';

interface CosmicPlanetaryMapProps {
  progress: CosmicProgressData;
  onSelectLesson: (lessonId: string) => void;
  activeLessonId?: string;
}

export const CosmicPlanetaryMap: React.FC<CosmicPlanetaryMapProps> = ({
  progress,
  onSelectLesson,
  activeLessonId
}) => {
  const conqueredCount = progress.conqueredLessons.length;
  const totalPlanets = PLANETS_METADATA.length;
  const percentComplete = Math.round((conqueredCount / totalPlanets) * 100);

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0B0F19] border-2 border-cyan-500/30 shadow-2xl p-5 sm:p-7 text-white font-sans mb-8">
      {/* Background Starry Nebula Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-950/40 via-purple-950/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Compass className="w-3.5 h-3.5 animate-spin-slow" />
              Bản Đồ Hệ Mặt Trời Tri Thức
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {progress.totalStars} Tinh Thể Sao
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <span>Hành Trình Khám Phá Vũ Trụ Toán 3</span>
            <Sparkles className="w-5 h-5 text-cyan-400 animate-pulse" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-medium leading-relaxed">
            Mỗi bài học là một hành tinh tri thức. Hãy suy ngẫm, mở khóa Lõi Năng Lượng và hoàn thành thử thách để thắp sáng toàn bộ thiên hà!
          </p>
        </div>

        {/* Global Galaxy Progress Gauge */}
        <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-3.5 min-w-[220px] shadow-lg">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1.5">
            <span className="text-cyan-300">Đã Chinh Phục:</span>
            <span className="font-mono text-cyan-400 font-black">{conqueredCount} / {totalPlanets} Hành Tinh</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(0,240,255,0.7)]"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold mt-1.5">
            <span>Tiến độ thiên hà</span>
            <span className="text-emerald-400 font-bold">{percentComplete}%</span>
          </div>
        </div>
      </div>

      {/* Central Solar System Overview Banner */}
      <div className="relative z-10 my-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-cyan-500/10 border border-slate-800 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.5)]">
            <Sun className="w-7 h-7 text-amber-950 animate-spin-slow" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-amber-300">
              Mặt Trời Tri Thức (Chủ đề 4)
            </div>
            <div className="text-sm sm:text-base font-extrabold text-white">
              Phép Nhân & Phép Chia Trong Phạm Vi 100
            </div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>Đã sáng</span>
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] ml-2" />
          <span>Đang mở</span>
          <span className="w-2.5 h-2.5 rounded-full bg-slate-600 ml-2" />
          <span>Khóa</span>
        </div>
      </div>

      {/* Interactive Planet Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {PLANETS_METADATA.map((planet, index) => {
          const isUnlocked = progress.unlockedLessons.includes(planet.lessonId);
          const isConquered = progress.conqueredLessons.includes(planet.lessonId);
          const isActive = activeLessonId === planet.lessonId;
          const exProgress = progress.exerciseProgress[planet.lessonId];
          const hasSocratic = progress.socraticCompletedCards[`socr-${planet.sgkLessonNumber}-1`];

          let cardBorder = 'border-slate-800/80 bg-slate-900/60 opacity-60';
          let ringGlow = '';

          if (isConquered) {
            cardBorder = 'border-emerald-500/60 bg-gradient-to-b from-slate-900/95 to-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.15)]';
            ringGlow = 'ring-1 ring-emerald-400/40';
          } else if (isUnlocked) {
            cardBorder = 'border-cyan-500/60 bg-gradient-to-b from-slate-900/95 to-cyan-950/20 shadow-[0_0_20px_rgba(0,240,255,0.15)]';
            ringGlow = 'ring-1 ring-cyan-400/50';
          }

          if (isActive) {
            ringGlow = 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.35)]';
          }

          return (
            <button
              key={planet.lessonId}
              type="button"
              disabled={!isUnlocked}
              onClick={() => {
                sound.playClick();
                onSelectLesson(planet.lessonId);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 relative group flex flex-col justify-between ${cardBorder} ${ringGlow} ${
                isUnlocked ? 'hover:scale-[1.02] cursor-pointer' : 'cursor-not-allowed'
              }`}
            >
              {/* Planetary Orbit Track Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-black tracking-wider text-slate-400 flex items-center gap-1 font-mono">
                  <span>QUỸ ĐẠO {index + 1}</span>
                </span>
                
                {isConquered ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Chinh Phục
                  </span>
                ) : isUnlocked ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-cyan-300 bg-cyan-500/20 border border-cyan-500/40 px-2 py-0.5 rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Đang Mở
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    Chưa Mở
                  </span>
                )}
              </div>

              {/* Planet Icon & Title */}
              <div className="flex items-start gap-3 my-1">
                <div 
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-md transition-transform duration-300 ${
                    isUnlocked ? 'group-hover:rotate-12 group-hover:scale-110' : 'grayscale opacity-40'
                  } bg-gradient-to-br ${planet.glowColor}`}
                >
                  {planet.symbol}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-cyan-400">
                    Bài {planet.sgkLessonNumber}
                  </div>
                  <h4 className="text-sm font-black text-white truncate leading-snug group-hover:text-cyan-200 transition-colors">
                    {planet.planetName}
                  </h4>
                  <p className="text-[11px] text-slate-400 line-clamp-1 font-medium mt-0.5">
                    {planet.planetTitle}
                  </p>
                </div>
              </div>

              {/* Bottom Progress Metrics */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-bold">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${hasSocratic ? 'bg-cyan-400 shadow-[0_0_6px_rgba(0,240,255,0.8)]' : 'bg-slate-700'}`} title="Khám phá Socratic" />
                  <span className="text-slate-400 font-mono">
                    {exProgress ? `${exProgress.completedCount}/${exProgress.totalCount} bài tập` : '0/3 bài tập'}
                  </span>
                </div>

                {isUnlocked && (
                  <span className="text-cyan-400 font-black flex items-center group-hover:translate-x-1 transition-transform">
                    <span>Vào học</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
