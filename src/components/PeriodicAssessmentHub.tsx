import React from 'react';
import {
  PERIODIC_ASSESSMENTS,
  PeriodicAssessment,
  getCompletedPeriodicIds,
  isTeacherUnlocked
} from '../data/periodicAssessmentsData';
import { sound } from '../utils/soundEffects';
import {
  Brain,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  Trophy,
  Award,
  Sparkles,
  KeyRound,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface PeriodicAssessmentHubProps {
  completedLessonIds: string[];
  onStartAssessment: (assessmentId: string) => void;
  onOpenTeacherUnlock: () => void;
  isTeacherMode?: boolean;
}

export const PeriodicAssessmentHub: React.FC<PeriodicAssessmentHubProps> = ({
  completedLessonIds,
  onStartAssessment,
  onOpenTeacherUnlock,
  isTeacherMode = isTeacherUnlocked()
}) => {
  const completedAssessmentIds = getCompletedPeriodicIds();

  // Helper to check if an assessment is unlocked
  const isAssessmentUnlocked = (assessment: PeriodicAssessment): boolean => {
    if (isTeacherMode) return true;
    // Check if all prerequisite lessons are completed
    return assessment.prerequisiteLessonIds.every((id) => completedLessonIds.includes(id));
  };

  const grandAssessment = PERIODIC_ASSESSMENTS.find((a) => a.isComprehensive);
  const topicAssessments = PERIODIC_ASSESSMENTS.filter((a) => !a.isComprehensive);

  const completedCount = completedAssessmentIds.length;
  const totalCount = PERIODIC_ASSESSMENTS.length;

  return (
    <div className="space-y-8 pb-16 relative animate-fade-in">
      {/* Ambient Cosmic Starfield & Nebula Backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-[460px] h-[460px] rounded-full bg-cyan-500/16 blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[440px] h-[440px] rounded-full bg-fuchsia-500/18 blur-[145px]" />
        <div className="absolute bottom-0 left-1/3 w-[480px] h-[480px] rounded-full bg-indigo-500/18 blur-[150px]" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className="w-full h-full opacity-70">
          <circle cx="96" cy="110" r="1.4" fill="#E0F2FE" />
          <circle cx="240" cy="68" r="2" fill="#67E8F9" className="animate-cosmic-twinkle" />
          <circle cx="420" cy="145" r="1.2" fill="#FFFFFF" />
          <circle cx="640" cy="84" r="1.8" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="880" cy="128" r="1.5" fill="#67E8F9" />
          <circle cx="1140" cy="72" r="2.1" fill="#FDE047" className="animate-cosmic-twinkle" />
          <circle cx="1310" cy="160" r="1.4" fill="#FFFFFF" />
          <circle cx="150" cy="480" r="1.7" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="480" cy="520" r="1.3" fill="#67E8F9" />
          <circle cx="920" cy="490" r="1.8" fill="#FFFFFF" className="animate-cosmic-twinkle" />
          <circle cx="1280" cy="540" r="1.6" fill="#67E8F9" />
          <circle cx="210" cy="790" r="1.9" fill="#FDE047" />
          <circle cx="760" cy="810" r="1.5" fill="#E879F9" className="animate-cosmic-twinkle" />
          <circle cx="1180" cy="780" r="1.7" fill="#67E8F9" />
        </svg>
      </div>

      {/* Top Cosmic Observatory Banner */}
      <div className="relative z-10 rounded-3xl p-6 md:p-8 border border-cyan-300/35 bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.28),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(217,70,239,0.26),_transparent_52%),linear-gradient(135deg,_#050A22_0%,_#11164B_50%,_#271158_100%)] text-white shadow-[0_24px_64px_rgba(3,7,24,0.78)] overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_16px_rgba(34,211,238,0.75)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent shadow-[0_0_16px_rgba(232,121,249,0.6)]"
        />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-cyan-400/15 border border-cyan-300/40 text-cyan-200 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                Trung Tâm Khảo Sát &amp; Đánh Giá
              </span>
              <span className="bg-white/10 border border-white/15 text-indigo-100 px-3 py-1 rounded-full text-xs font-bold tabular-nums">
                {completedCount} / {totalCount} Bài Kiểm Tra Đã Đạt Chuẩn
              </span>
            </div>

            {/* Teacher status action */}
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenTeacherUnlock();
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
                isTeacherMode
                  ? 'bg-emerald-500/25 hover:bg-emerald-500/35 text-emerald-200 border border-emerald-400/60 shadow-[0_0_18px_rgba(52,211,153,0.3)]'
                  : 'bg-white/10 hover:bg-cyan-400/20 text-cyan-100 hover:text-white border border-cyan-300/30 hover:border-cyan-300/65 hover:shadow-[0_0_18px_rgba(34,211,238,0.35)]'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{isTeacherMode ? 'Chế độ Giáo Viên (Đang Bật)' : 'Dành Cho Giáo Viên'}</span>
            </button>
          </div>

          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-4 -inset-y-2 rounded-full bg-[radial-gradient(ellipse_at_left,_rgba(56,189,248,0.26),_rgba(217,70,239,0.14)_48%,_transparent_72%)] blur-2xl cosmic-light-bloom"
            />
            <h1 className="relative text-2xl md:text-3xl font-black font-display tracking-tight flex items-center gap-2.5">
              <Brain className="w-7 h-7 text-cyan-300 shrink-0 drop-shadow-[0_0_16px_rgba(34,211,238,0.85)]" aria-hidden="true" />
              <span className="bg-gradient-to-r from-white via-cyan-100 to-fuchsia-300 bg-clip-text text-transparent cosmic-glow-title-cyan">
                Hệ Thống Bài Kiểm Tra Định Kỳ
              </span>
            </h1>
            <p className="relative text-sm md:text-base text-indigo-100/95 font-medium mt-1.5 max-w-2xl leading-relaxed">
              Các bài kiểm tra phương pháp luận sau mỗi mô hình tư duy cốt lõi (So sánh hơn - kém, Biểu đồ tranh, Thể tích, Sudoku ma trận, Hàng ngũ) và Đấu trường kiểm tra định kỳ tổng hợp quy mô lớn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-bold pt-1">
            <div className="bg-cyan-400/12 border border-cyan-300/30 backdrop-blur-xs px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-cyan-100">
              <Trophy className="w-4 h-4 text-amber-300" aria-hidden="true" />
              <span>Chốt chặn chuẩn hóa tư duy</span>
            </div>
            <div className="bg-fuchsia-400/12 border border-fuchsia-300/30 backdrop-blur-xs px-3.5 py-1.5 rounded-xl flex items-center gap-2 text-fuchsia-100">
              <ShieldCheck className="w-4 h-4 text-emerald-300" aria-hidden="true" />
              <span>Câu hỏi gợi mở tư duy kích thích tự vấn (Không lộ cách giải)</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED: Bài Kiểm Tra Định Kỳ Tổng Hợp Quy Mô Lớn */}
      {grandAssessment && (
        <div className="group relative z-10 bg-[radial-gradient(ellipse_at_top_right,_rgba(232,121,249,0.28),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(56,189,248,0.22),_transparent_55%),linear-gradient(135deg,_rgba(16,24,78,0.96),_rgba(40,16,88,0.96))] rounded-3xl p-6 sm:p-8 text-white shadow-[0_24px_64px_rgba(3,7,24,0.75)] hover:shadow-[0_0_44px_rgba(217,70,239,0.34),0_20px_54px_rgba(34,211,238,0.24)] overflow-hidden border border-fuchsia-300/50 hover:border-cyan-300 transition-all duration-300 animate-cosmic-beacon">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.24),transparent_65%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-400 shadow-[0_0_18px_rgba(56,189,248,0.8)]"
          />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/25 via-indigo-500/30 to-fuchsia-500/30 border border-cyan-300/45 flex items-center justify-center shadow-[0_0_22px_rgba(34,211,238,0.35)] shrink-0">
                  <Award className="w-6 h-6 text-cyan-200" aria-hidden="true" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-fuchsia-500/25 text-fuchsia-200 px-2.5 py-0.5 rounded-full border border-fuchsia-300/45">
                    BÀI KIỂM TRA ĐỊNH KỲ QUY MÔ LỚN
                  </span>
                  <h2 className="text-lg sm:text-xl font-black mt-1 text-white group-hover:text-cyan-200 transition-colors">
                    {grandAssessment.title}
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed font-medium">
                {grandAssessment.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold pt-1">
                {grandAssessment.keyRuleSummary.map((rule, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-400/12 border border-cyan-300/30 text-cyan-100 px-3 py-1 rounded-xl"
                  >
                    ✓ {rule}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2.5 w-full md:w-auto">
              {completedAssessmentIds.includes(grandAssessment.id) ? (
                <div className="w-full text-center p-3 rounded-2xl bg-emerald-500/25 border border-emerald-400/55 text-emerald-200 font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(52,211,153,0.28)]">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" aria-hidden="true" />
                  <span>Đã Hoàn Thành Xuất Sắc</span>
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onStartAssessment(grandAssessment.id);
                }}
                disabled={!isAssessmentUnlocked(grandAssessment)}
                className={`w-full md:w-auto px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isAssessmentUnlocked(grandAssessment)
                    ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.5),0_0_40px_rgba(232,121,249,0.28)] hover:brightness-110 cursor-pointer'
                    : 'bg-white/10 border border-white/15 text-indigo-200/70 cursor-not-allowed'
                }`}
              >
                {isAssessmentUnlocked(grandAssessment) ? (
                  <>
                    <Play className="w-4 h-4 fill-slate-950 text-slate-950" aria-hidden="true" />
                    <span>Vào Bài Kiểm Tra Tổng Hợp</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-indigo-300" aria-hidden="true" />
                    <span>Cần hoàn thành các trạm tiên quyết</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 5 Standard Topic Assessments */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-black font-display bg-gradient-to-r from-cyan-200 via-white to-fuchsia-300 bg-clip-text text-transparent cosmic-glow-title-cyan flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-cyan-300 shrink-0 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" aria-hidden="true" />
              <span>Danh Sách Bài Kiểm Tra Định Kỳ Theo Mô Hình Tư Duy</span>
            </h2>
            <p className="text-xs text-cyan-200/85 font-medium mt-0.5">
              Chốt chặn bắt buộc để mở khóa bài học kế tiếp trong mỗi chuyên đề
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {topicAssessments.map((assessment) => {
            const isCompleted = completedAssessmentIds.includes(assessment.id);
            const isUnlocked = isAssessmentUnlocked(assessment);

            return (
              <div
                key={assessment.id}
                className={`group relative overflow-hidden p-5 sm:p-6 rounded-3xl border flex flex-col justify-between gap-4 transition-all duration-200 backdrop-blur-xl ${
                  isCompleted
                    ? 'bg-gradient-to-br from-[#0F2A56]/95 via-[#0B1E44]/95 to-[#0D234A]/95 border-emerald-400/55 hover:border-emerald-300 hover:shadow-[0_0_36px_rgba(52,211,153,0.34),0_18px_44px_rgba(34,211,238,0.18)] shadow-[0_16px_40px_rgba(3,7,24,0.65)]'
                    : isUnlocked
                    ? 'bg-gradient-to-br from-[#131E58]/95 via-[#0F1746]/95 to-[#1E124E]/95 border-cyan-300/45 hover:border-cyan-300 hover:shadow-[0_0_38px_rgba(34,211,238,0.38),0_18px_46px_rgba(168,85,247,0.26)] shadow-[0_16px_42px_rgba(3,7,24,0.68)] hover:-translate-y-1'
                    : 'bg-[#070B22]/88 border-indigo-400/20 opacity-85 hover:border-indigo-300/45'
                }`}
              >
                {/* Hover Target Spotlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.22),transparent_65%)]"
                />
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute top-0 inset-x-5 h-[2px] rounded-full transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-emerald-300 to-cyan-400 opacity-85 group-hover:opacity-100 group-hover:shadow-[0_0_16px_rgba(52,211,153,0.8)]'
                      : isUnlocked
                      ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-400 opacity-70 group-hover:opacity-100 group-hover:shadow-[0_0_16px_rgba(56,189,248,0.85)]'
                      : 'bg-indigo-400/30 opacity-40'
                  }`}
                />

                <div className="relative z-10 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl p-2 rounded-2xl bg-[#080E2B]/90 border border-cyan-300/25 shrink-0">
                        {assessment.icon}
                      </span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-cyan-200 bg-cyan-400/12 border border-cyan-300/30 px-2 py-0.5 rounded-md">
                          {assessment.code} · {assessment.stationName}
                        </span>
                        <h3 className="text-sm sm:text-base font-black text-white group-hover:text-cyan-200 leading-snug mt-1.5 transition-colors">
                          {assessment.title}
                        </h3>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="bg-emerald-500/20 border border-emerald-400/50 text-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                        <span>ĐÃ ĐẠT</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="bg-cyan-400/18 border border-cyan-300/50 text-cyan-100 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <Unlock className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                        <span>SẴN SÀNG</span>
                      </span>
                    ) : (
                      <span className="bg-white/5 border border-white/15 text-indigo-200/75 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
                        <Lock className="w-3.5 h-3.5 text-indigo-300" aria-hidden="true" />
                        <span>ĐANG KHÓA</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-indigo-100/85 leading-relaxed font-medium">
                    {assessment.description}
                  </p>

                  <div className="bg-[#080D2B]/85 p-3 rounded-2xl border border-indigo-400/25 text-[11px] space-y-1">
                    <span className="font-bold text-cyan-200 block">
                      Mô hình tư duy: {assessment.thinkingModelName}
                    </span>
                    <span className="text-indigo-200/75 block">
                      Điều kiện tiên quyết: Cần hoàn thành các bài{' '}
                      {assessment.prerequisiteLessonIds.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="relative z-10 pt-3 flex items-center justify-between border-t border-white/10">
                  <span className="text-[11px] font-bold text-cyan-200/80">
                    {assessment.totalStages} giai đoạn khảo sát
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onStartAssessment(assessment.id);
                    }}
                    disabled={!isUnlocked}
                    className={`px-4 py-2 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                      isUnlocked
                        ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.38)] hover:brightness-110 cursor-pointer'
                        : 'bg-white/5 border border-white/10 text-indigo-300/50 cursor-not-allowed'
                    }`}
                  >
                    <span>{isCompleted ? 'Làm Lại Bài Kiểm Tra' : 'Bắt Đầu Làm Bài'}</span>
                    <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
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
