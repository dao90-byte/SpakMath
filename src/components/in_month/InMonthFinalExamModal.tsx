import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  NOVEMBER_FINAL_EXAM,
  InMonthSkillDomain,
} from '../../data/inMonthNovemberData';
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

const EXAM_DRAFT_KEY = 'spark_math_inmonth_nov_exam_draft';

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
  savedResult,
  onSaveResult,
  onClose,
  onJumpToDay,
  onOpenScratchpad,
}) => {
  const [studentName, setStudentName] = useState(() => {
    if (savedResult?.studentName) return savedResult.studentName;
    try {
      const raw = localStorage.getItem(EXAM_DRAFT_KEY);
      if (raw) return JSON.parse(raw).studentName || 'Phi Hành Gia Nhí';
    } catch {
      // ignore
    }
    return 'Phi Hành Gia Nhí';
  });
  const [currentIdx, setCurrentIdx] = useState(() => {
    if (savedResult) return 0;
    try {
      const raw = localStorage.getItem(EXAM_DRAFT_KEY);
      if (raw) return Math.min(Math.max(0, JSON.parse(raw).currentIdx || 0), 19);
    } catch {
      // ignore
    }
    return 0;
  });
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    if (savedResult?.answers) return savedResult.answers;
    try {
      const raw = localStorage.getItem(EXAM_DRAFT_KEY);
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
        EXAM_DRAFT_KEY,
        JSON.stringify({ studentName, currentIdx, answers })
      );
    } catch {
      // ignore
    }
  }, [studentName, currentIdx, answers, isSubmitted]);

  const examQuestions = NOVEMBER_FINAL_EXAM.questions;
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
      localStorage.removeItem(EXAM_DRAFT_KEY);
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
      localStorage.removeItem(EXAM_DRAFT_KEY);
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
    <div className="min-h-screen bg-gradient-to-b from-[#090D24] via-[#131B42] to-[#1D1548] text-white pb-16">
      {/* Top Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-[#090D24]/90 border-b border-indigo-400/25 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 cursor-pointer transition-colors duration-200 min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Quay Về Lịch Tháng 11</span>
            </button>
            <div>
              <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs uppercase">
                {NOVEMBER_FINAL_EXAM.monthLabel}
              </span>
              <h2 className="text-base sm:text-xl font-extrabold font-display text-white mt-0.5">
                {NOVEMBER_FINAL_EXAM.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenScratchpad}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-all duration-200 min-h-[44px]"
            >
              <PenTool className="w-4 h-4" aria-hidden="true" />
              <span>Bảng Vẽ Nháp</span>
            </button>

            {isSubmitted && (
              <button
                type="button"
                onClick={handleRetakeExam}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer transition-colors duration-200 min-h-[44px]"
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
        <div className="max-w-7xl mx-auto px-4 mt-6">
          {/* Student Name & Part Switcher Banner */}
          <div className="cosmic-glass rounded-2xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <label htmlFor="exam-student-name" className="text-xs font-extrabold text-indigo-200 uppercase">
                Họ tên thí sinh trên Chứng nhận:
              </label>
              <input
                id="exam-student-name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-indigo-950/90 text-white font-black text-sm border-2 border-amber-400/70 focus:border-cyan-300 focus:outline-none min-h-[42px] placeholder:text-indigo-400"
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
                    ? 'bg-cyan-400 text-slate-950 shadow-md'
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
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                }`}
              >
                Phần B: Tư Duy Olympic (Câu 11–20 • 50đ)
              </button>
            </div>
          </div>

          {/* 20 Question Number Navigator */}
          <div className="cosmic-glass rounded-2xl p-3.5 mb-6 flex flex-wrap items-center justify-between gap-3">
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
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-white shadow-md'
                        : hasAns
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-indigo-200 tabular-nums">
                Đã trả lời: <strong className="text-white">{answeredCount}/20</strong>
              </span>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer transition-all duration-200 min-h-[42px]"
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

            <div className="lg:col-span-5 bg-[#111942]/90 backdrop-blur-xl text-white rounded-3xl p-6 shadow-2xl border border-indigo-400/35 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 via-amber-400 to-pink-500" />
              <div className="flex items-center justify-between mb-3 pt-1">
                <span
                  className={`px-3 py-1 rounded-xl font-black text-xs uppercase border ${
                    currentQ.part === 'A'
                      ? 'bg-cyan-500/20 text-cyan-200 border-cyan-400/40'
                      : 'bg-amber-400/20 text-amber-200 border-amber-400/40'
                  }`}
                >
                  Câu {currentIdx + 1}/20 •{' '}
                  {currentQ.part === 'A' ? 'Phần A: Cơ Bản' : 'Phần B: Olympic'}
                </span>
                <span className="text-xs font-black text-amber-300 tabular-nums">
                  +{currentQ.points} điểm
                </span>
              </div>

              <div className="rounded-2xl bg-indigo-950/75 border border-indigo-400/25 p-4 mb-5">
                <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed">
                  {currentQ.prompt}
                </p>
              </div>

              {currentExamInputSpec.mode === 'choice' ? (
                <div role="group" aria-label="Các lựa chọn đáp án" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
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
                        className={`p-3.5 rounded-2xl border-2 font-black text-left transition-all duration-200 cursor-pointer tabular-nums min-h-[54px] active:scale-[0.98] flex items-center gap-2.5 ${
                          selected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 border-cyan-300 text-white shadow-lg shadow-cyan-500/25'
                            : 'bg-indigo-950/65 border-indigo-400/25 text-indigo-100 hover:border-cyan-400/60 hover:bg-indigo-900/70'
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                            selected
                              ? 'bg-white text-blue-700'
                              : 'bg-indigo-800/80 text-cyan-200 border border-indigo-400/30'
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
                <div className="mb-5 p-4 rounded-2xl bg-indigo-950/75 border border-indigo-400/30 space-y-2.5">
                  <label htmlFor={`exam-ans-${currentQ.id}`} className="block text-xs font-extrabold uppercase tracking-wider text-cyan-200">
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
                      className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-slate-900/90 border-2 border-indigo-400/40 focus:border-cyan-300 focus:outline-none text-white font-black text-lg tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm"
                    />
                    {currentExamInputSpec.mode === 'text_number' && currentExamInputSpec.unitLabel && (
                      <span className="px-3.5 py-3.5 rounded-xl bg-indigo-900/80 border border-indigo-400/30 text-cyan-200 font-black text-sm shrink-0">
                        {currentExamInputSpec.unitLabel}
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 pt-4 border-t border-indigo-400/20">
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
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors duration-200 min-h-[44px] shadow-md"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitExam}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all duration-200 min-h-[44px]"
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
              <span>Báo Cáo Đánh Giá Năng Lực &amp; Chứng Nhận Tháng 11</span>
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
                      <span>Chứng Nhận Hoàn Thành IN MONTH • Tháng 11</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                      Chúc mừng {studentName}!
                    </h3>
                    <p className="text-sm text-indigo-100 leading-relaxed">
                      Đã hoàn thành chương trình Toán Tư Duy Singapore <strong>IN MONTH — Tháng 11</strong> (Toán đố Sơ đồ thanh, Phép chia có dư, Toán khoảng cách &amp; Đo lường chuẩn quốc tế).
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
                  <span>Đánh Giá Chi Tiết Theo 4 Trụ Cột Năng Lực Tháng 11</span>
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
                <span>Chi Tiết Đáp Án &amp; Giải Thích 20 Câu Đề Thi Tháng 11</span>
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
