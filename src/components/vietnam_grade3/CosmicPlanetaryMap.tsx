import React, { useState } from 'react';
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
  Sun,
  Rocket,
  Flame,
  Award,
  Orbit,
  Eye
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
  const [hoveredPlanetId, setHoveredPlanetId] = useState<string | null>(null);
  const conqueredCount = progress.conqueredLessons.length;
  const totalPlanets = PLANETS_METADATA.length;
  const percentComplete = Math.round((conqueredCount / totalPlanets) * 100);

  // Active or hovered planet details
  const currentInspectPlanet = PLANETS_METADATA.find(
    (p) => p.lessonId === (hoveredPlanetId || activeLessonId || 'vn3-c4-l23')
  ) || PLANETS_METADATA[0];

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#0B0F19] via-[#0D1322] to-[#080B14] border-2 border-cyan-400/55 shadow-[0_0_70px_rgba(0,240,255,0.22),0_26px_70px_rgba(2,6,23,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] p-5 sm:p-8 text-white font-sans mb-8">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-10 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]"
      />
      {/* Background Starfield & Colorful Nebulas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-cyan-500/24 rounded-full blur-[100px] animate-cosmic-twinkle" />
        <div className="absolute top-1/2 -right-20 w-80 h-80 bg-purple-600/24 rounded-full blur-[110px] animate-cosmic-twinkle" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-amber-500/18 rounded-full blur-[120px]" />
        
        {/* Subtle Constellation Grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#00F0FF_1px,transparent_1px),linear-gradient(to_bottom,#00F0FF_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-cyan-400/30">
        <div className="relative">
          <div
            aria-hidden="true"
            className="cosmic-light-bloom -left-8 -top-6 w-80 h-28 bg-gradient-to-r from-cyan-400/35 via-sky-300/25 to-fuchsia-500/25"
          />
          <div className="relative flex flex-wrap items-center gap-2 mb-2">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-cyan-950/85 text-cyan-200 border border-cyan-300/60 shadow-[0_0_18px_rgba(0,240,255,0.42)] font-mono">
              <Compass className="w-3.5 h-3.5 animate-spin-slow text-cyan-300" />
              Bản Đồ Hệ Mặt Trời Tri Thức
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-950/85 text-amber-200 border border-amber-300/60 shadow-[0_0_18px_rgba(251,191,36,0.42)]">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-spin-slow" />
              {progress.totalStars} Tinh Thể Sao
            </span>
            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-purple-950/85 text-purple-200 border border-purple-300/60 shadow-[0_0_16px_rgba(192,132,252,0.35)] font-mono">
              <Rocket className="w-3.5 h-3.5 text-purple-300" />
              Toán 3 SGK
            </span>
          </div>

          <h2 className="relative text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-300 cosmic-glow-title-cyan flex items-center gap-2.5">
            <span>Hành Trình Chinh Phục 7 Hành Tinh Toán Học</span>
            <Sparkles className="w-6 h-6 text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.9)] animate-pulse" />
          </h2>
          <p className="relative text-xs sm:text-sm text-cyan-100/90 mt-1.5 max-w-2xl font-medium leading-relaxed">
            Mỗi bài học là một hành tinh tri thức rực rỡ. Khám phá bản chất, kích hoạt Lõi Năng Lượng và hoàn thành thử thách để thắp sáng dải ngân hà!
          </p>
        </div>

        {/* Global Progress Dashboard Capsule */}
        <div className="bg-slate-900/92 border-2 border-cyan-400/55 rounded-2xl p-4 min-w-[240px] shadow-[0_0_32px_rgba(0,240,255,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-md">
          <div className="flex items-center justify-between text-xs font-bold mb-2">
            <span className="text-cyan-200 uppercase tracking-wider font-mono">Đã Chinh Phục:</span>
            <span className="font-mono text-cyan-300 font-black text-sm drop-shadow-[0_0_10px_rgba(34,211,238,0.65)]">{conqueredCount} / {totalPlanets} Hành Tinh</span>
          </div>
          <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-cyan-400/45 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_18px_rgba(0,240,255,0.95)]"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-200 font-bold mt-2 font-mono">
            <span>Tiến độ ngân hà</span>
            <span className="text-emerald-300 font-black drop-shadow-[0_0_8px_rgba(52,211,153,0.65)]">{percentComplete}%</span>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* VISUAL SOLAR SYSTEM ORBITAL STAGE (HỆ MẶT TRỜI ĐỒ HỌA TRỰC QUAN) */}
      {/* ==================================================================== */}
      <div className="relative z-10 my-6 p-4 sm:p-6 rounded-3xl bg-slate-950/80 border-2 border-cyan-500/30 shadow-inner overflow-hidden">
        {/* Orbital Stage Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Orbit className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300 font-mono">
              Quỹ Đạo Hệ Mặt Trời Toán 3 (Bấm vào hành tinh để du hành)
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-300">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
              <span>Đã sáng</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
              <span>Đang mở</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
              <span>Đang khóa</span>
            </span>
          </div>
        </div>

        {/* Horizontal Planetary Orbit Strip with Central Sun */}
        <div className="py-4 overflow-x-auto scrollbar-none">
          <div className="min-w-[860px] flex items-center justify-between relative px-6 py-4">
            {/* Glowing Orbit Highway Line */}
            <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-500/40 via-cyan-500/40 to-purple-500/40 border-t border-dashed border-cyan-400/50 pointer-events-none" />

            {/* Central Sun of Knowledge */}
            <div className="flex flex-col items-center shrink-0 z-10 group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-300 text-slate-950 flex items-center justify-center text-3xl shrink-0 neon-solar-glow shadow-[0_0_40px_rgba(251,191,36,0.8)] border-4 border-yellow-200 cursor-default">
                <Sun className="w-10 h-10 text-amber-950 animate-spin-slow" />
              </div>
              <span className="text-xs font-black text-amber-300 mt-2 font-mono uppercase tracking-wider">
                MẶT TRỜI
              </span>
              <span className="text-[10px] font-bold text-amber-200/80">
                Chủ đề 4
              </span>
            </div>

            {/* 7 Orbiting Planetary Stations */}
            {PLANETS_METADATA.map((planet, idx) => {
              const isUnlocked = progress.unlockedLessons.includes(planet.lessonId);
              const isConquered = progress.conqueredLessons.includes(planet.lessonId);
              const isActive = activeLessonId === planet.lessonId;
              const isHovered = hoveredPlanetId === planet.lessonId;

              return (
                <div 
                  key={planet.lessonId}
                  className="flex flex-col items-center shrink-0 z-10 mx-2"
                  onMouseEnter={() => setHoveredPlanetId(planet.lessonId)}
                  onMouseLeave={() => setHoveredPlanetId(null)}
                >
                  <button
                    type="button"
                    disabled={!isUnlocked}
                    onClick={() => {
                      sound.playClick();
                      onSelectLesson(planet.lessonId);
                    }}
                    className={`relative w-15 h-15 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-300 group ${
                      isUnlocked ? 'cursor-pointer hover:scale-125' : 'cursor-not-allowed opacity-50 grayscale'
                    } ${
                      isConquered
                        ? 'border-2 border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.7)]'
                        : isUnlocked
                        ? 'border-2 border-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.6)]'
                        : 'border-2 border-slate-700 bg-slate-900'
                    } bg-gradient-to-br ${planet.glowColor}`}
                  >
                    {/* Planet Emoji / Symbol */}
                    <span className="select-none transform transition-transform group-hover:rotate-12">
                      {planet.symbol}
                    </span>

                    {/* Active Rocket Indicator */}
                    {isActive && (
                      <div className="absolute -top-3.5 -right-2 text-base animate-bounce-slow" title="Bạn đang ở hành tinh này">
                        🚀
                      </div>
                    )}

                    {/* Conquered Checkmark Badge */}
                    {isConquered && (
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-md">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}

                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                        <Lock className="w-4 h-4 text-slate-400" />
                      </div>
                    )}
                  </button>

                  {/* Planet Label */}
                  <div className="text-center mt-2">
                    <span className="text-[10px] font-mono font-black text-cyan-400 block uppercase">
                      Bài {planet.sgkLessonNumber}
                    </span>
                    <span className={`text-xs font-black block truncate max-w-[85px] leading-tight ${
                      isConquered ? 'text-emerald-300' : isUnlocked ? 'text-white' : 'text-slate-500'
                    }`}>
                      {planet.planetName.replace('Hành Tinh ', '')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Planet Radar Teaser */}
        <div className="mt-2 p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-lg bg-gradient-to-br ${currentInspectPlanet.glowColor}`}>
              {currentInspectPlanet.symbol}
            </div>
            <div>
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-mono">
                Ra-đa Quỹ Đạo · Bài {currentInspectPlanet.sgkLessonNumber}
              </span>
              <div className="font-black text-white text-sm">
                {currentInspectPlanet.planetName} — {currentInspectPlanet.planetTitle}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onSelectLesson(currentInspectPlanet.lessonId);
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.4)] active:scale-95 transition-transform"
          >
            <span>Khai Phá Hành Tinh Này</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* DETAILED PLANETARY STATION COMMAND CARDS */}
      {/* ==================================================================== */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLANETS_METADATA.map((planet, index) => {
          const isUnlocked = progress.unlockedLessons.includes(planet.lessonId);
          const isConquered = progress.conqueredLessons.includes(planet.lessonId);
          const isActive = activeLessonId === planet.lessonId;
          const exProgress = progress.exerciseProgress[planet.lessonId];
          const hasSocratic = progress.socraticCompletedCards[`socr-${planet.sgkLessonNumber}-1`];

          return (
            <button
              key={planet.lessonId}
              type="button"
              disabled={!isUnlocked}
              onClick={() => {
                sound.playClick();
                onSelectLesson(planet.lessonId);
              }}
              className={`p-5 rounded-2xl border-2 text-left transition-all duration-300 relative group flex flex-col justify-between ${
                isConquered
                  ? 'border-emerald-500/70 bg-gradient-to-b from-slate-900/95 to-emerald-950/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]'
                  : isUnlocked
                  ? 'border-cyan-500/70 bg-gradient-to-b from-slate-900/95 to-cyan-950/30 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.35)]'
                  : 'border-slate-800/80 bg-slate-900/50 opacity-60 cursor-not-allowed'
              } ${isActive ? 'ring-2 ring-cyan-400 shadow-[0_0_25px_rgba(0,240,255,0.45)]' : ''}`}
            >
              {/* Card Header Tag */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-black tracking-wider text-cyan-300 flex items-center gap-1 font-mono">
                  <span>QUỸ ĐẠO {index + 1}</span>
                </span>
                
                {isConquered ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-300 bg-emerald-500/20 border border-emerald-400/50 px-2.5 py-0.5 rounded-full shadow-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ĐÃ SÁNG
                  </span>
                ) : isUnlocked ? (
                  <span className="flex items-center gap-1 text-[11px] font-black text-cyan-300 bg-cyan-500/20 border border-cyan-400/50 px-2.5 py-0.5 rounded-full shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    ĐANG MỞ
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-800/80 px-2.5 py-0.5 rounded-full">
                    <Lock className="w-3 h-3" />
                    KHÓA
                  </span>
                )}
              </div>

              {/* Planet Icon & Title */}
              <div className="flex items-start gap-3.5 my-2">
                <div 
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-lg transition-transform duration-300 ${
                    isUnlocked ? 'group-hover:rotate-12 group-hover:scale-110' : 'grayscale opacity-40'
                  } bg-gradient-to-br ${planet.glowColor}`}
                >
                  {planet.symbol}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-cyan-400 font-mono">
                    Bài {planet.sgkLessonNumber}
                  </div>
                  <h4 className="text-sm sm:text-base font-black text-white leading-snug group-hover:text-cyan-200 transition-colors">
                    {planet.planetName}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-1 font-medium mt-0.5">
                    {planet.planetTitle}
                  </p>
                </div>
              </div>

              {/* Bottom Progress Metrics */}
              <div className="mt-4 pt-3.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${hasSocratic ? 'bg-cyan-400 shadow-[0_0_8px_rgba(0,240,255,0.9)]' : 'bg-slate-700'}`} title="Khám phá Socratic" />
                  <span className="text-slate-300 font-mono">
                    {exProgress ? `${exProgress.completedCount}/${exProgress.totalCount} bài tập` : '0/3 bài tập'}
                  </span>
                </div>

                {isUnlocked && (
                  <span className="text-cyan-400 font-black flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>Đến nơi</span>
                    <ChevronRight className="w-4 h-4" />
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
