import React, { useState } from 'react';
import {
  NOVEMBER_FINAL_EXAM,
  InMonthSkillDomain,
} from '../../data/inMonthNovemberData';
import { InMonthVisualModels } from './InMonthVisualModels';
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
    color: '#4F46E5',
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

export const InMonthFinalExamModal: React.FC<InMonthFinalExamModalProps> = ({
  savedResult,
  onSaveResult,
  onClose,
  onJumpToDay,
  onOpenScratchpad,
}) => {
  const [studentName, setStudentName] = useState(
    savedResult?.studentName || 'Phi Hành Gia Nhí'
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    savedResult?.answers || {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedResult);
  const [activeTab, setActiveTab] = useState<'report' | 'review'>('report');

  const examQuestions = NOVEMBER_FINAL_EXAM.questions;
  const currentQ = examQuestions[currentIdx];

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleSubmitExam = () => {
    let basicScore = 0;
    let olympiadScore = 0;

    examQuestions.forEach((q) => {
      const userAns = (answers[q.id] || '').trim();
      if (userAns === q.correctAnswer.trim()) {
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

    onSaveResult(result);
    setIsSubmitted(true);
    setActiveTab('report');
  };

  const handleRetakeExam = () => {
    setAnswers({});
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const getPillarStats = (pillar: InMonthSkillDomain) => {
    const qs = examQuestions.filter((q) => q.skillDomain === pillar);
    const correct = qs.filter(
      (q) => (answers[q.id] || '').trim() === q.correctAnswer.trim()
    ).length;
    const pct = qs.length > 0 ? Math.round((correct / qs.length) * 100) : 0;
    return { total: qs.length, correct, pct };
  };

  const basicScore = examQuestions
    .filter((q) => q.part === 'A' && (answers[q.id] || '').trim() === q.correctAnswer.trim())
    .reduce((acc, q) => acc + q.points, 0);

  const olympiadScore = examQuestions
    .filter((q) => q.part === 'B' && (answers[q.id] || '').trim() === q.correctAnswer.trim())
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
        badgeColor: 'from-cyan-400 to-indigo-500 text-white',
      };
    if (score >= 55)
      return {
        rank: 'Phi Hành Gia Khám Phá (Khá - Cần rèn thêm câu vận dụng cao)',
        badgeColor: 'from-emerald-400 to-teal-600 text-white',
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
      <div className="sticky top-0 z-30 backdrop-blur-md bg-[#090D24]/90 border-b border-indigo-500/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay Về Lịch Tháng 11</span>
            </button>
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-xs uppercase">
                {NOVEMBER_FINAL_EXAM.monthLabel}
              </span>
              <h2 className="text-base sm:text-lg font-black text-white mt-0.5">
                {NOVEMBER_FINAL_EXAM.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenScratchpad}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Bảng Vẽ Nháp</span>
            </button>

            {isSubmitted && (
              <button
                type="button"
                onClick={handleRetakeExam}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
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
          <div className="bg-white/10 border border-white/15 rounded-2xl p-4 mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-xs font-extrabold text-indigo-200 uppercase">
                Họ tên thí sinh trên Chứng nhận:
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="px-3.5 py-1.5 rounded-xl bg-white text-slate-900 font-black text-sm border-2 border-amber-300 focus:outline-none"
                placeholder="Nhập tên của em..."
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentIdx(0)}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
                  currentQ.part === 'A'
                    ? 'bg-cyan-400 text-slate-950 shadow-md'
                    : 'bg-white/10 text-indigo-200 hover:bg-white/20'
                }`}
              >
                Phần A: Cơ Bản (Câu 1–10 • 50đ)
              </button>
              <button
                type="button"
                onClick={() => setCurrentIdx(10)}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all cursor-pointer ${
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
          <div className="bg-white/5 border border-white/10 rounded-2xl p-3 mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {examQuestions.map((q, idx) => {
                const hasAns = (answers[q.id] || '').trim() !== '';
                const isCurr = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`w-8 h-8 rounded-lg font-black text-xs transition-all cursor-pointer tabular-nums ${
                      isCurr
                        ? 'bg-amber-400 text-slate-950 ring-2 ring-white scale-105'
                        : hasAns
                        ? 'bg-indigo-500 text-white'
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
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg cursor-pointer"
              >
                Nộp Bài & Xem Đánh Giá Năng Lực
              </button>
            </div>
          </div>

          {/* Two-Zone Exam Question Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <InMonthVisualModels model={currentQ.visualModel} isAnswered={false} />
            </div>

            <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 shadow-xl border-2 border-indigo-200">
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-3 py-1 rounded-lg font-black text-xs uppercase ${
                    currentQ.part === 'A'
                      ? 'bg-cyan-100 text-cyan-900'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  Câu {currentIdx + 1}/20 •{' '}
                  {currentQ.part === 'A' ? 'Phần A: Cơ Bản' : 'Phần B: Olympic'}
                </span>
                <span className="text-xs font-black text-indigo-700 tabular-nums">
                  +{currentQ.points} điểm
                </span>
              </div>

              <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed mb-5">
                {currentQ.prompt}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {currentQ.options.map((opt, oIdx) => {
                  const selected = (answers[currentQ.id] || '').trim() === opt.trim();
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelectOption(opt)}
                      className={`p-3.5 rounded-2xl border-2 font-black text-left transition-all cursor-pointer tabular-nums ${
                        selected
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400'
                      }`}
                    >
                      <span className="text-sm">
                        {String.fromCharCode(65 + oIdx)}. {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
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
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Câu tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmitExam}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Trophy className="w-4 h-4" />
                    <span>Hoàn Tất & Xem Đánh Giá</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mode 2: Comprehensive Competency Evaluation Report & Certificate */
        <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('report')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer ${
                activeTab === 'report'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Báo Cáo Đánh Giá Năng Lực & Chứng Nhận Tháng 11</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-2 cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Xem Chi Tiết Đáp Án & Lời Giải 20 Câu</span>
            </button>
          </div>

          {activeTab === 'report' ? (
            <>
              {/* Score Summary & Official Certificate Card */}
              <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-amber-400/70 shadow-2xl relative overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-black uppercase">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Chứng Nhận Hoàn Thành IN MONTH • Tháng 11</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      Chúc mừng {studentName}!
                    </h3>
                    <p className="text-sm text-indigo-100 leading-relaxed">
                      Đã hoàn thành chương trình Toán Tư Duy Singapore <strong>IN MONTH — Tháng 11</strong> (Toán đố Sơ đồ thanh, Phép chia có dư, Toán khoảng cách & Đo lường chuẩn quốc tế).
                    </p>
                    <div
                      className={`inline-block px-4 py-2 rounded-2xl bg-gradient-to-r ${rankInfo.badgeColor} font-black text-xs sm:text-sm shadow-md`}
                    >
                      🏅 Danh hiệu: {rankInfo.rank}
                    </div>
                  </div>

                  <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                      <div className="text-xs text-indigo-200 font-bold">Tổng Điểm</div>
                      <div className="text-3xl font-black text-amber-300 mt-1 tabular-nums">
                        {totalScore}
                        <span className="text-sm text-indigo-200">/100</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                      <div className="text-xs text-cyan-200 font-bold">Phần Cơ Bản</div>
                      <div className="text-2xl font-black text-white mt-1 tabular-nums">
                        {basicScore}
                        <span className="text-xs text-indigo-200">/50</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/10 border border-white/15">
                      <div className="text-xs text-amber-200 font-bold">Phần Olympic</div>
                      <div className="text-2xl font-black text-white mt-1 tabular-nums">
                        {olympiadScore}
                        <span className="text-xs text-indigo-200">/50</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4-Pillar Competency Breakdown */}
              <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl border border-indigo-100">
                <h4 className="text-lg font-black text-slate-900 mb-1">
                  📊 Đánh Giá Chi Tiết Theo 4 Trụ Cột Năng Lực Tháng 11
                </h4>
                <p className="text-xs text-slate-500 mb-5">
                  Hệ thống phân tích độ chính xác từng chuyên đề và gợi ý các ngày học cần ôn luyện thêm:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.keys(PILLAR_META) as InMonthSkillDomain[]).map((pillarKey) => {
                    const meta = PILLAR_META[pillarKey];
                    const stats = getPillarStats(pillarKey);
                    const isStrong = stats.pct >= 80;

                    return (
                      <div
                        key={pillarKey}
                        className="p-5 rounded-2xl border-2 border-slate-100 bg-slate-50/70 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-black text-sm text-slate-900">
                              {meta.title}
                            </span>
                            <span
                              className={`px-2.5 py-0.5 rounded-lg font-black text-xs tabular-nums ${
                                isStrong
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {stats.correct}/{stats.total} câu ({stats.pct}%)
                            </span>
                          </div>

                          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
                            <div
                              style={{
                                width: `${stats.pct}%`,
                                backgroundColor: meta.color,
                              }}
                              className="h-full rounded-full transition-all duration-500"
                            />
                          </div>

                          <p className="text-xs text-slate-600 leading-relaxed mb-4">
                            {isStrong ? `✅ ${meta.strongComment}` : `💡 ${meta.improveComment}`}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
                            Ngày ôn tập gợi ý:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {meta.reviewDays.map((d) => (
                              <button
                                key={d}
                                type="button"
                                onClick={() => onJumpToDay(d)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-black text-xs border border-indigo-200 transition-colors cursor-pointer tabular-nums"
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
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="text-lg font-black text-slate-900">
                📖 Chi Tiết Đáp Án & Giải Thích 20 Câu Đề Thi Tháng 11
              </h4>
              <div className="space-y-3">
                {examQuestions.map((q, idx) => {
                  const userAns = (answers[q.id] || '').trim();
                  const correct = userAns === q.correctAnswer.trim();
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-2xl border-2 ${
                        correct
                          ? 'bg-emerald-50/50 border-emerald-200'
                          : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <span className="font-black text-xs uppercase text-indigo-900">
                          Câu {idx + 1} ({q.part === 'A' ? 'Phần A - Cơ Bản' : 'Phần B - Olympic'})
                        </span>
                        <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
                          <span>
                            Bài làm: <strong>{userAns || 'Chưa chọn'}</strong>
                          </span>
                          <span>•</span>
                          <span className="text-emerald-700">
                            Đáp án đúng: <strong>{q.correctAnswer}</strong>
                          </span>
                          {correct ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )}
                        </div>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-2">{q.prompt}</p>
                      <p className="text-xs text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/80">
                        💡 <strong>Giải thích:</strong> {q.explanation}
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
