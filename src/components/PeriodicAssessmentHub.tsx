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
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Top Banner */}
      <div className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="bg-black/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                Trung Tâm Khảo Sát &amp; Đánh Giá
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
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
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all active:scale-95 ${
                isTeacherMode
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
              }`}
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>{isTeacherMode ? 'Chế độ Giáo Viên (Đang Bật)' : 'Dành Cho Giáo Viên'}</span>
            </button>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-black font-display tracking-tight text-white flex items-center gap-2.5">
              <span>Hệ Thống Bài Kiểm Tra Định Kỳ</span>
              <span>🧠</span>
            </h1>
            <p className="text-sm md:text-base text-amber-100 font-medium mt-1 max-w-2xl leading-relaxed">
              Các bài kiểm tra phương pháp luận sau mỗi mô hình tư duy cốt lõi (So sánh hơn - kém, Biểu đồ tranh, Thể tích, Sudoku ma trận, Hàng ngũ) và Đấu trường kiểm tra định kỳ tổng hợp quy mô lớn.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
            <div className="bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-xl flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>Chốt chặn chuẩn hóa tư duy</span>
            </div>
            <div className="bg-white/20 backdrop-blur-xs px-3.5 py-1.5 rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Câu hỏi gợi mở tư duy kích thích tự vấn (Không lộ cách giải)</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED: Bài Kiểm Tra Định Kỳ Tổng Hợp Quy Mô Lớn */}
      {grandAssessment && (
        <div className="bg-gradient-to-r from-red-600 via-amber-600 to-rose-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border-2 border-amber-300">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner shrink-0">
                  🏆
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 text-amber-200 px-2.5 py-0.5 rounded-full border border-white/20">
                    BÀI KIỂM TRA ĐỊNH KỲ QUY MÔ LỚN
                  </span>
                  <h2 className="text-lg sm:text-xl font-black mt-0.5 text-white">
                    {grandAssessment.title}
                  </h2>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-amber-100 leading-relaxed font-medium">
                {grandAssessment.description}
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-bold text-amber-900 pt-1">
                {grandAssessment.keyRuleSummary.map((rule, idx) => (
                  <span key={idx} className="bg-white/90 px-3 py-1 rounded-xl shadow-xs">
                    ✓ {rule}
                  </span>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center gap-2 w-full md:w-auto">
              {completedAssessmentIds.includes(grandAssessment.id) ? (
                <div className="w-full text-center p-3 rounded-2xl bg-emerald-500/90 text-white font-black text-xs flex items-center justify-center gap-2 shadow-md">
                  <CheckCircle2 className="w-5 h-5 text-white" />
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
                className={`w-full md:w-auto px-6 py-3 rounded-2xl font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  isAssessmentUnlocked(grandAssessment)
                    ? 'bg-white text-orange-600 hover:bg-amber-50 cursor-pointer'
                    : 'bg-white/40 text-white/80 cursor-not-allowed'
                }`}
              >
                {isAssessmentUnlocked(grandAssessment) ? (
                  <>
                    <Play className="w-4 h-4 fill-orange-600 text-orange-600" />
                    <span>Vào Bài Kiểm Tra Tổng Hợp</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 text-white" />
                    <span>Cần hoàn thành các trạm tiên quyết</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid of 5 Standard Topic Assessments */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-black text-slate-800">
              Danh Sách Bài Kiểm Tra Định Kỳ Theo Mô Hình Tư Duy
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Chốt chặn bắt buộc để mở khóa bài học kế tiếp trong mỗi chuyên đề
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topicAssessments.map((assessment) => {
            const isCompleted = completedAssessmentIds.includes(assessment.id);
            const isUnlocked = isAssessmentUnlocked(assessment);

            return (
              <div
                key={assessment.id}
                className={`p-5 rounded-3xl border-2 flex flex-col justify-between gap-4 transition-all ${
                  isCompleted
                    ? 'bg-emerald-50/70 border-emerald-300 shadow-xs'
                    : isUnlocked
                    ? 'bg-white border-amber-300 shadow-sm hover:border-amber-400'
                    : 'bg-slate-50 border-slate-200 opacity-90'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{assessment.icon}</span>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                          {assessment.code} · {assessment.stationName}
                        </span>
                        <h3 className="text-sm font-black text-slate-900 leading-snug mt-1">
                          {assessment.title}
                        </h3>
                      </div>
                    </div>

                    {isCompleted ? (
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>ĐÃ ĐẠT</span>
                      </span>
                    ) : isUnlocked ? (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                        <Unlock className="w-3.5 h-3.5 text-amber-600" />
                        <span>SẴN SÀNG</span>
                      </span>
                    ) : (
                      <span className="bg-slate-200 text-slate-600 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                        <Lock className="w-3.5 h-3.5 text-slate-500" />
                        <span>ĐANG KHÓA</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {assessment.description}
                  </p>

                  <div className="bg-white/80 p-3 rounded-2xl border border-slate-200 text-[11px] space-y-1">
                    <span className="font-bold text-amber-900 block">
                      Mô hình tư duy: {assessment.thinkingModelName}
                    </span>
                    <span className="text-slate-500 block">
                      Điều kiện tiên quyết: Cần hoàn thành các bài{' '}
                      {assessment.prerequisiteLessonIds.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-500">
                    {assessment.totalStages} giai đoạn khảo sát
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      onStartAssessment(assessment.id);
                    }}
                    disabled={!isUnlocked}
                    className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 ${
                      isUnlocked
                        ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>{isCompleted ? 'Làm Lại Bài Kiểm Tra' : 'Bắt Đầu Làm Bài'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
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
