import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  InMonthFinalExam,
  InMonthSkillDomain,
} from '../../data/inMonthNovemberData';
import { getMonthStorageKeys } from '../../data/inMonthGrade3Catalog';
import { InMonthVisualModels } from './InMonthVisualModels';
import { sound } from '../../utils/soundEffects';
import {
  getInMonthQuestionInputSpec,
  isInMonthAnswerCorrect,
} from '../../utils/inMonthAnswerUtils';
import {
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Sparkles,
  RotateCcw,
  PenTool,
  Calendar,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  BookOpen,
} from 'lucide-react';

export interface InMonthExamSavedResult {
  totalScore: number;
  basicScore: number;
  olympiadScore: number;
  completedAt: string;
  studentName: string;
  answers: Record<string, string>;
}

interface InMonthFinalExamModalProps {
  monthNumber: number;
  finalExam: InMonthFinalExam;
  savedResult: InMonthExamSavedResult | null;
  onSaveResult: (result: InMonthExamSavedResult) => void;
  onClose: () => void;
  onJumpToDay: (dayNumber: number) => void;
  onOpenScratchpad: () => void;
}

const PILLAR_META: Record<
  InMonthSkillDomain,
  {
    title: string;
    color: string;
    reviewDays: number[];
    strongComment: string;
    improveComment: string;
  }
> = {
  bar_model: {
    title: 'Toán Đố Sơ Đồ Thanh (Nhân & Chia)',
    color: '#2563EB',
    reviewDays: [1, 3, 5, 7],
    strongComment:
      'Nắm vững kỹ thuật vẽ sơ đồ thanh Singapore (Bar Model), phân biệt xuất sắc bài toán Phần - Tổng và So sánh Hơn - Kém.',
    improveComment:
      'Cần chú ý bước xác định "1 phần bằng nhau" và kiểm tra kỹ đề bài hỏi Tổng hay Hiệu số phần.',
  },
  remainder: {
    title: 'Phép Chia Có Dư & Quy Luật Chu Kỳ',
    color: '#0284C7',
    reviewDays: [8, 10, 11, 13],
    strongComment:
      'Xử lý nhạy bén số dư thực tế (làm tròn lên khi thuê thuyền/xe, lấy phần nguyên khi đóng hộp) và tìm chính xác phần tử thứ N trong chu kỳ.',
    improveComment:
      'Cần ôn lại sự khác biệt giữa bài toán "Cần ít nhất bao nhiêu chuyến" (Thương + 1) và "Đóng được nhiều nhất bao nhiêu hộp" (Lấy thương).',
  },
  interval: {
    title: 'Toán Khoảng Cách & Ứng Dụng (Trồng Cây, Cưa Gỗ, Cầu Thang)',
    color: '#059669',
    reviewDays: [15, 18, 19, 20],
    strongComment:
      'Phân biệt chuẩn xác số khoảng và số điểm mốc trong cả 4 dạng: trồng 2 đầu, 1 đầu, không trồng 2 đầu, đường khép kín, cưa gỗ và cầu thang.',
    improveComment:
      'Lưu ý quy tắc vàng: Số lần cưa = Số đoạn - 1; Số khoảng tầng cầu thang cần leo = Tầng đến - Tầng xuất phát.',
  },
  measurement: {
    title: 'Đo Lường (Độ Dài, Khối Lượng, Thể Tích) & Biểu Đồ',
    color: '#9333EA',
    reviewDays: [22, 24, 25, 27],
    strongComment:
      'Đổi đơn vị đo (km-m-cm, kg-g, L-mL) thành thạo, đọc cân thăng bằng, tính vật rỗng/ruột và phân tích biểu đồ chính xác tuyệt đối.',
    improveComment:
      'Cần kiểm tra kỹ bước đổi về cùng một đơn vị đo trước khi cộng trừ và lưu ý trừ khối lượng vỏ hộp/chai khi tìm một nửa.',
  },
};

function fireExamCelebration() {
  const cosmicColors = ['#FBBF24', '#EC4899', '#22D3EE', '#34D399', '#A855F7', '#FFFFFF'];
  confetti({
    particleCount: 110,
    spread: 90,
    origin: { y: 0.6 },
    colors: cosmicColors,
  });
  setTimeout(() => {
    confetti({
      particleCount: 70,
      angle: 60,
      spread: 75,
      origin: { x: 0.05, y: 0.7 },
      colors: cosmicColors,
    });
    confetti({
      particleCount: 70,
      angle: 120,
      spread: 75,
      origin: { x: 0.95, y: 0.7 },
      colors: cosmicColors,
    });
  }, 240);
}

export const InMonthFinalExamModal: React.FC<InMonthFinalExamModalProps> = ({
  monthNumber,
  finalExam,
  savedResult,
  onSaveResult,
  onClose,
  onJumpToDay,
  onOpenScratchpad,
}) => {
  const examDraftKey = getMonthStorageKeys(monthNumber).examDraftKey;

  const [studentName, setStudentName] = useState(() => {
    if (savedResult?.studentName) return savedResult.studentName;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) return JSON.parse(raw).studentName || 'Phi Hành Gia Nhí';
    } catch {
      // ignore
    }
    return 'Phi Hành Gia Nhí';
  });
  const [currentIdx, setCurrentIdx] = useState(() => {
    if (savedResult) return 0;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) return Math.min(Math.max(0, JSON.parse(raw).currentIdx || 0), 19);
    } catch {
      // ignore
    }
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (savedResult?.answers) return savedResult.answers;
    try {
      const raw = localStorage.getItem(examDraftKey);
      if (raw) return JSON.parse(raw).answers || {};
    } catch {
      // ignore
    }
    return {};
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedResult);
  const [activeTab, setActiveTab] = useState<'report' | 'review'>('report');

  useEffect(() => {
    if (isSubmitted) return;
    try {
      localStorage.setItem(
        examDraftKey,
        JSON.stringify({ studentName, currentIdx, answers })
      );
    } catch {
      // ignore
    }
  }, [examDraftKey, studentName, currentIdx, answers, isSubmitted]);

  const examQuestions = finalExam.questions;
  const currentQ = examQuestions[currentIdx];
  const currentExamInputSpec = getInMonthQuestionInputSpec(currentQ.correctAnswer);

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleSubmitExam = () => {
    let basicScore = 0;
    let olympiadScore = 0;

    examQuestions.forEach((q) => {
      const userAns = (answers[q.id] || '').trim();
      if (isInMonthAnswerCorrect(userAns, q.correctAnswer)) {
        if (q.part === 'A') basicScore += q.points;
        else olympiadScore += q.points;
      }
    });

    const totalScore = basicScore + olympiadScore;
    const result: InMonthExamSavedResult = {
      totalScore,
      basicScore,
      olympiadScore,
      completedAt: new Date().toLocaleDateString('vi-VN'),
      studentName: studentName.trim() || 'Phi Hành Gia Nhí',
      answers,
    };

    try {
      localStorage.removeItem(examDraftKey);
    } catch {
      // ignore
    }

    onSaveResult(result);
    setIsSubmitted(true);
    setActiveTab('report');
    sound.playVictory();
    fireExamCelebration();
  };

  const handleRetakeExam = () => {
    try {
      localStorage.removeItem(examDraftKey);
    } catch {
      // ignore
    }
    setAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const getPillarStats = (pillar: InMonthSkillDomain) => {
    const qs = examQuestions.filter((q) => q.skillDomain === pillar);
    const correct = qs.filter((q) =>
      isInMonthAnswerCorrect(answers[q.id] || '', q.correctAnswer)
    ).length;
    const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
    return { total: qs.length, correct, pct };
  };

  const basicScore = examQuestions
    .filter(
      (q) =>
        q.part === 'A' &&
        isInMonthAnswerCorrect(answers[q.id] || '', q.correctAnswer)
    )
    .reduce((acc, q) => acc + q.points, 0);

  const olympiadScore = examQuestions
    .filter(
      (q) =>
        q.part === 'B' &&
        isInMonthAnswerCorrect(answers[q.id] || '', q.correctAnswer)
    )
    .reduce((acc, q) => acc + q.points, 0);

  const totalScore = basicScore + olympiadScore;

  const getRankBadge = (score: number) => {
    if (score >= 90)
      return {
        rank: 'Chỉ Huy Tối Cao Ngân Hà (Xuất sắc - Đạt chuẩn Olympic Singapore)',
        badgeColor: 'from-amber-400 to-orange-500 text-slate-950',
      };
    if (score >= 75)
      return {
        rank: 'Thuyền Trưởng Tinh Anh (Giỏi - Nắm vững tư duy CPA)',
        badgeColor: 'from-cyan-400 to-blue-500 text-slate-950',
      };
    if (score >= 55)
      return {
        rank: 'Phi Hành Gia Khám Phá (Khá - Cần rèn thêm câu vận dụng cao)',
        badgeColor: 'from-emerald-400 to-teal-500 text-slate-950',
      };
    return {
      rank: 'Tân Binh Vũ Trụ (Cần ôn tập lại các ngày trọng tâm)',
      badgeColor: 'from-purple-500 to-indigo-600 text-white',
    };
  };

  const rankInfo = getRankBadge(totalScore);
  const answeredCount = examQuestions.filter(
    (q) => (answers[q.id] || '').trim() !== ''
  ).length;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(30,58,138,0.48),_transparent_60%),radial-gradient(ellipse_at_bottom_right,_rgba(126,34,206,0.32),_transparent_55%),linear-gradient(180deg,_#040715_0%,_#0B1232_45%,_#15103A_100%)] text-white pb-16 relative overflow-hidden">
      {/* Deep Space Starfield, Orbital Rings & Nebula Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-28 left-1/4 w-[480px] h-[480px] rounded-full bg-cyan-500/18 blur-[145px]" />
        <div className="absolute top-1/3 -right-24 w-[440px] h-[440px] rounded-full bg-purple-500/20 blur-[145px]" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-400/14 blur-[155px]" />
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full opacity-65"
        >
          <circle cx="1220" cy="140" r="260" fill="none" stroke="rgba(56,189,248,0.14)" strokeWidth="1" strokeDasharray="6 10" />
          <circle cx="1220" cy="140" r="370" fill="none" stroke="rgba(251,191,36,0.1)" strokeWidth="1" />
          <circle cx="180" cy="760" r="240" fill="none" stroke="rgba(168,85,247,0.13)" strokeWidth="1" strokeDasharray="4 10" />
          <circle cx="110" cy="95" r="1.6" fill="#67E8F9" />
          <circle cx="290" cy="160" r="1.4" fill="#FDE68A" />
          <circle cx="640" cy="210" r="1.8" fill="#67E8F9" />
          <circle cx="880" cy="90" r="1.5" fill="#F9A8D4" />
          <circle cx="1090" cy="240" r="2" fill="#FDE68A" />
          <circle cx="195" cy="490" r="1.7" fill="#FDE68A" />
          <circle cx="520" cy="640" r="1.4" fill="#67E8F9" />
          <circle cx="1160" cy="680" r="1.8" fill="#F9A8D4" />
        </svg>
      </div>

      {/* Top Cosmic Mission Command Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-2xl bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.14),_transparent_50%),radial-gradient(ellipse_at_top_right,_rgba(168,85,247,0.16),_transparent_50%),linear-gradient(180deg,_rgba(7,11,32,0.95),_rgba(11,17,46,0.92))] border-b border-cyan-300/25 px-4 py-3.5 shadow-[0_18px_46px_rgba(3,7,24,0.72)] overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.5)]"
        />
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.09] hover:bg-cyan-400/18 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/25 hover:border-cyan-300/60 cursor-pointer transition-all duration-200 min-h-[44px] whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-300" aria-hidden="true" />
              <span>Quay Về Lịch {finalExam.monthLabel}</span>
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-300">
                <span className="w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.85)]" aria-hidden="true" />
                <span>Lớp 3 · {finalExam.monthLabel}</span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold font-display bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent mt-0.5">
                {finalExam.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenScratchpad}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 hover:from-amber-200 hover:to-pink-400 text-slate-950 font-black text-xs flex items-center gap-1.5 ring-1 ring-amber-200/85 shadow-[0_8px_24px_rgba(251,191,36,0.4)] cursor-pointer transition-all duration-200 hover:-translate-y-0.5 min-h-[44px]"
            >
              <PenTool className="w-4 h-4" aria-hidden="true" />
              <span>Bảng Vẽ Nháp</span>
            </button>

            {isSubmitted && (
              <button
                type="button"
                onClick={handleRetakeExam}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer transition-colors duration-200 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Làm Lại Đề Thi</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mode 1: Taking the Exam */}
      {!isSubmitted ? (
        <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6">
          {/* Student Name & Part Switcher Banner */}
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.12),_transparent_45%),linear-gradient(135deg,_rgba(14,22,62,0.95),_rgba(19,16,58,0.95))] backdrop-blur-2xl border border-cyan-300/30 p-4 sm:p-5 mb-5 flex flex-wrap items-center justify-between gap-4 shadow-[0_16px_42px_rgba(3,7,24,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-300/75 via-indigo-400/60 to-amber-300/75"
            />
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="exam-student-name" className="text-xs font-extrabold text-cyan-200 uppercase tracking-wider">
                Họ tên thí sinh trên Chứng nhận:
              </label>
              <input
                id="exam-student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-4 py-2 rounded-xl bg-[#070B22]/90 text-white font-black text-sm border-2 border-amber-300/65 focus:border-cyan-300 focus:outline-none min-h-[42px] placeholder:text-indigo-400 shadow-inner"
                placeholder="Nhập tên của em..."
              />
            </div>

            <div role="group" aria-label="Chọn phần thi" className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                aria-pressed={currentQ.part === 'A'}
                onClick={() => setCurrentIdx(0)}
                className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[42px] ${
                  currentQ.part === 'A'
                    ? 'bg-gradient-to-r from-cyan-300 to-sky-400 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.35)]'
                    : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                }`}
              >
                Phần A: Cơ Bản (Câu 1–10 • 50đ)
              </button>
              <button
                type="button"
                aria-pressed={currentQ.part === 'B'}
                onClick={() => setCurrentIdx(10)}
                className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer min-h-[42px] ${
                  currentQ.part === 'B'
                    ? 'bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                    : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                }`}
              >
                Phần B: Tư Duy Olympic (Câu 11–20 • 50đ)
              </button>
            </div>
          </div>

          {/* Constellation 20 Question Number Navigator */}
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.14),_transparent_45%),linear-gradient(135deg,_rgba(14,22,62,0.95),_rgba(19,16,58,0.95))] backdrop-blur-2xl border border-cyan-300/30 p-4 mb-6 flex flex-wrap items-center justify-between gap-3 shadow-[0_18px_46px_rgba(3,7,24,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-300/75 via-indigo-400/60 to-amber-300/75"
            />
            <div role="group" aria-label="Danh sách 20 câu thi" className="flex flex-wrap gap-1.5">
              {examQuestions.map((q, idx) => {
                const hasAns = (answers[q.id] || '').trim() !== '';
                const isCurr = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    aria-label={`Câu ${idx + 1}${hasAns ? ' (Đã chọn)' : ''}`}
                    aria-pressed={isCurr}
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-10 h-10 rounded-xl font-black text-xs transition-all duration-200 cursor-pointer tabular-nums ${
                      isCurr
                        ? 'bg-gradient-to-br from-amber-300 via-orange-400 to-pink-500 text-slate-950 ring-2 ring-amber-200 shadow-[0_0_22px_rgba(251,191,36,0.55)] scale-105'
                        : hasAns
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border border-cyan-300/60 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                        : 'bg-indigo-900/55 text-indigo-200 border border-indigo-400/25 hover:border-cyan-300/65 hover:bg-cyan-500/20'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-2 rounded-xl bg-[#080E2B]/85 border border-cyan-300/25 text-xs font-bold text-indigo-200 tabular-nums">
                Đã trả lời: <strong className="text-cyan-300">{answeredCount}/20</strong>
              </span>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-teal-500 hover:brightness-110 text-slate-950 font-black text-xs shadow-[0_8px_24px_rgba(52,211,153,0.35)] cursor-pointer transition-all duration-200 min-h-[42px]"
              >
                Nộp Bài &amp; Xem Đánh Giá Năng Lực
              </button>
            </div>
          </div>

          {/* Two-Zone Exam Question Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <InMonthVisualModels model={currentQ.visualModel} isAnswered={false} />
            </div>

            <div className="lg:col-span-5 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.15),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(236,72,153,0.14),_transparent_50%),linear-gradient(170deg,_rgba(19,29,82,0.97),_rgba(8,13,40,0.99))] backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-7 shadow-[0_28px_72px_rgba(3,7,24,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] border border-indigo-300/40">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-pink-500 shadow-[0_0_18px_rgba(34,211,238,0.65)]"
              />
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span
                  className={`font-black text-xs uppercase tracking-wider ${
                    currentQ.part === 'A'
                      ? 'text-cyan-300'
                      : 'text-amber-300'
                  }`}
                >
                  Câu {currentIdx + 1}/20 ·{' '}
                  {currentQ.part === 'A' ? 'Phần A: Cơ Bản' : 'Phần B: Olympic'}
                </span>
                <span className="text-xs font-black text-amber-300 tabular-nums">
                  +{currentQ.points} điểm
                </span>
              </div>

              <div className="rounded-2xl bg-[#070B22]/80 border border-white/10 p-4 sm:p-5 mb-6 shadow-inner">
                <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed">
                  {currentQ.prompt}
                </p>
              </div>

              {currentExamInputSpec.mode === 'choice' ? (
                <div role="group" aria-label="Các lựa chọn đáp án" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {currentQ.options.map((opt, oIdx) => {
                    const selected = (answers[currentQ.id] || '').trim() === opt.trim();
                    return (
                      <button
                        key={oIdx}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => {
                          sound.playClick();
                          handleSelectOption(opt);
                        }}
                        className={`p-4 rounded-2xl border-2 font-black text-left transition-all duration-200 cursor-pointer tabular-nums min-h-[56px] active:scale-[0.98] flex items-center gap-2.5 ${
                          selected
                            ? 'bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 border-amber-200 text-slate-950 shadow-[0_8px_26px_rgba(251,191,36,0.42)]'
                            : 'bg-[#080E2B]/90 border-indigo-400/28 text-white hover:border-cyan-300/80 hover:bg-indigo-900/55 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            selected
                              ? 'bg-slate-950 text-amber-300'
                              : 'bg-white/10 text-cyan-200 border border-cyan-300/25'
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="text-sm">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="mb-6 p-4 rounded-2xl bg-[#070B22]/90 border border-cyan-300/35 shadow-[inset_0_2px_12px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.1)] space-y-2.5">
                  <label htmlFor={`exam-ans-${currentQ.id}`} className="block text-xs font-black uppercase tracking-wider text-cyan-300">
                    Nhập câu trả lời của em
                  </label>
                  <div className="flex items-center gap-2.5">
                    <input
                      id={`exam-ans-${currentQ.id}`}
                      type="text"
                      inputMode="numeric"
                      value={answers[currentQ.id] || ''}
                      onChange={(e) => handleSelectOption(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && currentIdx < examQuestions.length - 1) {
                          setCurrentIdx((prev) => Math.min(examQuestions.length - 1, prev + 1));
                        }
                      }}
                      placeholder="Nhập đáp án..."
                      className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-slate-950/95 border-2 border-indigo-400/40 focus:border-amber-300 focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-white font-black text-xl tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm transition-all"
                    />
                    {currentExamInputSpec.mode === 'text_number' && currentExamInputSpec.unitLabel && (
                      <span className="px-4 py-3.5 rounded-xl bg-indigo-900/75 border border-cyan-300/35 text-cyan-200 font-black text-sm shrink-0">
                        {currentExamInputSpec.unitLabel}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white font-bold text-xs flex items-center gap-1 border border-white/15 cursor-pointer transition-colors duration-200 min-h-[44px]"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Câu trước</span>
                </button>

                {currentIdx < examQuestions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentIdx((prev) =>
                        Math.min(examQuestions.length - 1, prev + 1)
                      )
                    }
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1 cursor-pointer transition-all duration-200 min-h-[46px] shadow-[0_8px_24px_rgba(34,211,238,0.35)]"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitExam}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_10px_28px_rgba(251,191,36,0.4)] cursor-pointer transition-all duration-200 min-h-[46px]"
                  >
                    <Trophy className="w-4 h-4" aria-hidden="true" />
                    <span>Hoàn Tất &amp; Xem Đánh Giá</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Comprehensive Competency Evaluation Report & Certificate */
        <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
          <div role="group" aria-label="Chuyển đổi báo cáo" className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              aria-pressed={activeTab === 'report'}
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer transition-all duration-200 min-h-[44px] ${
                activeTab === 'report'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Award className="w-4 h-4" aria-hidden="true" />
              <span>Báo Cáo Đánh Giá Năng Lực &amp; Chứng Nhận {finalExam.monthLabel}</span>
            </button>
            <button
              type="button"
              aria-pressed={activeTab === 'review'}
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer transition-all duration-200 min-h-[44px] ${
                activeTab === 'review'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>Xem Chi Tiết Đáp Án &amp; Lời Giải 20 Câu</span>
            </button>
          </div>

          {activeTab === 'report' ? (
            <>
              {/* Score Summary & Official Certificate Card */}
              <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-400/70 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-black uppercase">
                      <ShieldCheck className="w-4 h-4" aria-hidden="true" />
                      <span>Chứng Nhận Hoàn Thành IN MONTH • {finalExam.monthLabel}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                      Chúc mừng {studentName}!
                    </h3>
                    <p className="text-sm text-indigo-100 leading-relaxed">
                      Đã hoàn thành chương trình Toán Tư Duy Singapore Lớp 3 <strong>IN MONTH — {finalExam.monthLabel}</strong> ({finalExam.title}).
                    </p>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r ${rankInfo.badgeColor} font-black text-xs sm:text-sm shadow-md`}
                    >
                      <Award className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Danh hiệu: {rankInfo.rank}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
                    <div className="p-4 rounded-2xl cosmic-glass">
                      <div className="text-xs text-indigo-200 font-bold">Tổng Điểm</div>
                      <div className="text-3xl font-extrabold font-display text-amber-300 mt-1 tabular-nums">
                        {totalScore}
                        <span className="text-sm font-sans text-indigo-200">/100</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl cosmic-glass">
                      <div className="text-xs text-cyan-200 font-bold">Phần Cơ Bản</div>
                      <div className="text-2xl font-extrabold font-display text-white mt-1 tabular-nums">
                        {basicScore}
                        <span className="text-xs font-sans text-indigo-200">/50</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl cosmic-glass">
                      <div className="text-xs text-amber-200 font-bold">Phần Olympic</div>
                      <div className="text-2xl font-extrabold font-display text-white mt-1 tabular-nums">
                        {olympiadScore}
                        <span className="text-xs font-sans text-indigo-200">/50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-Pillar Competency Breakdown */}
              <div className="bg-[#111942]/90 backdrop-blur-xl text-white rounded-3xl p-6 shadow-xl border border-indigo-400/35">
                <h4 className="text-lg sm:text-xl font-extrabold font-display text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-cyan-300" aria-hidden="true" />
                  <span>Đánh Giá Chi Tiết Theo 4 Trụ Cột Năng Lực {finalExam.monthLabel}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.keys(PILLAR_META) as InMonthSkillDomain[]).map((pillarKey) => {
                    const meta = PILLAR_META[pillarKey];
                    const stats = getPillarStats(pillarKey);
                    const isStrong = stats.pct >= 80;

                    return (
                      <div
                        key={pillarKey}
                        className="p-5 rounded-2xl border border-indigo-400/25 bg-indigo-950/65 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-black text-sm text-white">
                              {meta.title}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg font-black text-xs tabular-nums ${
                                isStrong
                                  ? 'bg-emerald-500/25 text-emerald-200 border border-emerald-400/40'
                                  : 'bg-amber-400/20 text-amber-200 border border-amber-400/40'
                              }`}
                            >
                              {stats.correct}/{stats.total} câu ({stats.pct}%)
                            </span>
                          </div>

                          <div className="w-full h-3 bg-indigo-950 rounded-full overflow-hidden mb-3 border border-indigo-400/20">
                            <div
                              style={{
                                width: `${stats.pct}%`,
                                backgroundColor: meta.color,
                              }}
                              className="h-full rounded-full transition-all duration-500"
                            />
                          </div>

                          <p className="text-xs text-indigo-100 leading-relaxed mb-4 flex items-start gap-1.5">
                            {isStrong ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                            ) : (
                              <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                            )}
                            <span>{isStrong ? meta.strongComment : meta.improveComment}</span>
                          </p>
                        </div>

                        <div className="pt-3 border-t border-indigo-400/20 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-indigo-200 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                            Ngày ôn tập gợi ý:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {meta.reviewDays.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => onJumpToDay(d)}
                                className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-cyan-400 text-cyan-200 hover:text-slate-950 font-black text-xs border border-indigo-400/30 transition-colors duration-200 cursor-pointer tabular-nums min-h-[34px]"
                              >
                                Ngày {d}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-[#111942]/90 backdrop-blur-xl text-white rounded-3xl p-6 shadow-xl border border-indigo-400/35 space-y-4">
              <h4 className="text-lg sm:text-xl font-extrabold font-display text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-300" aria-hidden="true" />
                <span>Chi Tiết Đáp Án &amp; Giải Thích 20 Câu Đề Thi {finalExam.monthLabel}</span>
              </h4>
              <div className="space-y-3">
                {examQuestions.map((q, idx) => {
                  const userAns = (answers[q.id] || '').trim();
                  const correct = isInMonthAnswerCorrect(userAns, q.correctAnswer);
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border ${
                        correct
                          ? 'bg-emerald-500/10 border-emerald-400/40'
                          : 'bg-rose-500/10 border-rose-400/40'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="font-black text-xs uppercase text-cyan-200">
                          Câu {idx + 1} ({q.part === 'A' ? 'Phần A - Cơ Bản' : 'Phần B - Olympic'})
                        </span>
                        <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
                          <span className="text-indigo-200">
                            Bài làm: <strong className="text-white">{userAns || 'Chưa trả lời'}</strong>
                          </span>
                          <span>•</span>
                          <span className="text-emerald-300">
                            Đáp án đúng: <strong>{q.correctAnswer}</strong>
                          </span>
                          {correct ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-400" aria-hidden="true" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-white mb-2">{q.prompt}</p>
                      <p className="text-xs text-indigo-100 bg-indigo-950/75 p-3 rounded-xl border border-indigo-400/25 flex items-start gap-1.5">
                        <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>
                          <strong>Giải thích:</strong> {q.explanation}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
