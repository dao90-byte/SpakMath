import React, { useState, useRef } from 'react';
import { 
  TOPIC_4_PERIODIC_ASSESSMENT, 
  AssessmentQuestion 
} from '../../data/vietnamGrade3LessonsData';
import { sound } from '../../utils/soundEffects';
import { saveAssessmentResult } from '../../utils/cosmicProgressStorage';
import { 
  X, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  Clock, 
  ArrowRight, 
  ArrowLeft, 
  RotateCcw,
  BookOpen,
  Target,
  BarChart3
} from 'lucide-react';

interface VietnamGrade3AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCompletedScore?: (score: number) => void;
}

export const VietnamGrade3AssessmentModal: React.FC<VietnamGrade3AssessmentModalProps> = ({
  isOpen,
  onClose,
  onCompletedScore
}) => {
  const assessment = TOPIC_4_PERIODIC_ASSESSMENT;
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showReview, setShowReview] = useState(false);

  if (!isOpen) return null;

  const currentQ: AssessmentQuestion = assessment.questions[currentIdx];
  const totalCount = assessment.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;

  const handleSelectOption = (questionId: string, optionLabel: string) => {
    if (isSubmitted) return;
    sound.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionLabel
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    assessment.questions.forEach((q) => {
      const userAns = selectedAnswers[q.id];
      if (userAns && String(userAns).trim() === String(q.correctAnswer).trim()) {
        correctCount += 1;
      }
    });
    return correctCount;
  };

  const handleSubmit = () => {
    sound.playVictory();
    setIsSubmitted(true);
    const score = calculateScore();
    saveAssessmentResult(score, totalCount);
    if (onCompletedScore) {
      onCompletedScore(score);
    }
  };

  const handleRetake = () => {
    sound.playClick();
    setSelectedAnswers({});
    setIsSubmitted(false);
    setShowReview(false);
    setCurrentIdx(0);
  };

  const finalScore = calculateScore();
  const percentage = Math.round((finalScore / totalCount) * 100);

  // Competency level classification
  const getCompetencyBadge = (score: number) => {
    if (score >= 9) return { label: 'Xuất sắc (Nắm trọn bản chất & vận dụng cao)', color: 'text-emerald-700 bg-emerald-100 border-emerald-300' };
    if (score >= 7) return { label: 'Đạt chuẩn năng lực tốt (Nắm vững kiến thức SGK)', color: 'text-sky-700 bg-sky-100 border-sky-300' };
    if (score >= 5) return { label: 'Đạt mức cơ bản (Cần rèn luyện thêm bài toán 2 bước)', color: 'text-amber-700 bg-amber-100 border-amber-300' };
    return { label: 'Cần ôn tập lại (Xem lại video Socratic)', color: 'text-rose-700 bg-rose-100 border-rose-300' };
  };

  const badgeInfo = getCompetencyBadge(finalScore);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans">
      <div className="bg-[#0B0F19] rounded-3xl max-w-3xl w-full border-2 border-indigo-500/50 shadow-[0_0_50px_rgba(99,102,241,0.25)] overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in text-white relative">
        {/* Subtle ambient light */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white p-5 flex items-center justify-between gap-3 shrink-0 border-b border-indigo-500/30 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center font-black text-lg shadow-[0_0_12px_rgba(251,191,36,0.4)]">
              📝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/40 font-mono">
                  TRẠM ĐÁNH GIÁ ĐỊNH KỲ
                </span>
                <span className="text-xs text-cyan-200 hidden sm:inline font-medium">
                  10 thử thách suy ngẫm &amp; năng lực
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white leading-tight mt-0.5">
                {assessment.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div ref={modalBodyRef} className="p-5 sm:p-7 overflow-y-auto flex-1 relative z-10">
          {!isSubmitted ? (
            <div>
              {/* Question Navigation Bubbles */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-300 font-mono">
                  CÂU HỎI {currentIdx + 1} / {totalCount}
                </span>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {assessment.questions.map((q, idx) => {
                    const isAnswered = !!selectedAnswers[q.id];
                    const isCurrent = idx === currentIdx;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setCurrentIdx(idx);
                          modalBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-black transition-all font-mono ${
                          isCurrent
                            ? 'bg-gradient-to-tr from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_12px_rgba(0,240,255,0.6)] font-black'
                            : isAnswered
                            ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400/50'
                            : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cognitive level badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border font-mono ${
                  currentQ.cognitiveLevel === 'nhan_biet' ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' :
                  currentQ.cognitiveLevel === 'thong_hieu' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' :
                  currentQ.cognitiveLevel === 'van_dung' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' :
                  'bg-purple-500/20 text-purple-300 border-purple-400/40'
                }`}>
                  Mức độ: {currentQ.cognitiveLevel === 'nhan_biet' ? '1. Nhận biết' :
                           currentQ.cognitiveLevel === 'thong_hieu' ? '2. Thông hiểu' :
                           currentQ.cognitiveLevel === 'van_dung' ? '3. Vận dụng' : '4. Vận dụng cao'}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Chủ điểm: {currentQ.topicAspect}
                </span>
              </div>

              {/* Prompt */}
              <div className="text-base sm:text-xl font-black text-white leading-relaxed mb-5 drop-shadow-sm">
                {currentQ.prompt}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt.label;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(currentQ.id, opt.label)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-start gap-3 active:scale-[0.99] ${
                        isSelected
                          ? 'bg-cyan-950/70 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/50 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                          : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200 hover:border-cyan-500/50'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 text-xs sm:text-sm font-black mt-0.5 font-mono ${
                        isSelected ? 'border-cyan-300 text-cyan-300' : 'border-slate-500 text-slate-400'
                      }`}>
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer Question Nav */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (currentIdx > 0) {
                      setCurrentIdx(currentIdx - 1);
                      modalBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  disabled={currentIdx === 0}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 ${
                    currentIdx === 0
                      ? 'text-slate-600 cursor-not-allowed'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </button>

                <div className="flex items-center gap-2">
                  {currentIdx < totalCount - 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setCurrentIdx(currentIdx + 1);
                        modalBodyRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,240,255,0.35)] active:scale-95 transition-transform"
                    >
                      <span>Câu tiếp theo</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={answeredCount < totalCount}
                      className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 transition-all ${
                        answeredCount === totalCount
                          ? 'bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 active:scale-95 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <span>Nộp bài &amp; Chấm điểm ({answeredCount}/{totalCount})</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Result Report Screen */
            <div className="text-center py-4 text-white">
              <div className="w-16 h-16 rounded-3xl bg-amber-400/20 border border-amber-400/40 text-amber-300 mx-auto flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(251,191,36,0.3)] mb-3">
                🏆
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 block font-mono">
                KẾT QUẢ ĐÁNH GIÁ NĂNG LỰC HỌC PHẦN
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Điểm số: <span className="text-amber-400">{finalScore} / {totalCount}</span>
              </h3>

              <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black border text-center">
                <span className={`px-3 py-1 rounded-full border ${badgeInfo.color}`}>
                  {badgeInfo.label}
                </span>
              </div>

              {/* Competency Matrix Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6 text-left">
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-sky-500/40 shadow-xs">
                  <span className="text-[11px] font-bold text-sky-400 block font-mono">1. Nhận biết</span>
                  <span className="text-xs font-black text-white">Bản chất nhân chia</span>
                  <div className="text-xs text-sky-300 font-bold mt-1 font-mono">3/3 câu chuẩn</div>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-emerald-500/40 shadow-xs">
                  <span className="text-[11px] font-bold text-emerald-400 block font-mono">2. Thông hiểu</span>
                  <span className="text-xs font-black text-white">Gấp/Giảm số lần</span>
                  <div className="text-xs text-emerald-300 font-bold mt-1 font-mono">3/3 câu chuẩn</div>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-amber-500/40 shadow-xs">
                  <span className="text-[11px] font-bold text-amber-400 block font-mono">3. Vận dụng</span>
                  <span className="text-xs font-black text-white">Bài toán 2 bước</span>
                  <div className="text-xs text-amber-300 font-bold mt-1 font-mono">2/2 câu chuẩn</div>
                </div>
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-purple-500/40 shadow-xs">
                  <span className="text-[11px] font-bold text-purple-400 block font-mono">4. Vận dụng cao</span>
                  <span className="text-xs font-black text-white">Xếp thuyền &amp; tính ngược</span>
                  <div className="text-xs text-purple-300 font-bold mt-1 font-mono">2/2 câu chuẩn</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowReview(!showReview)}
                  className="px-5 py-2.5 rounded-xl border border-cyan-500/40 text-cyan-300 font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>{showReview ? 'Ẩn lời giải chi tiết' : 'Xem lại đáp án & lời giải'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 border border-slate-700"
                >
                  <RotateCcw className="w-4 h-4 text-cyan-400" />
                  <span>Làm lại bài kiểm tra</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_15px_rgba(251,191,36,0.4)] transition-transform active:scale-95"
                >
                  <span>Hoàn tất &amp; Đóng</span>
                </button>
              </div>

              {/* Detailed Review Section */}
              {showReview && (
                <div className="mt-6 pt-6 border-t border-slate-800 text-left space-y-4">
                  <h4 className="text-sm font-black text-cyan-300 uppercase tracking-wider mb-2 font-mono">
                    BẢNG ĐỐI CHIẾU ĐÁP ÁN &amp; GIẢI THÍCH CHI TIẾT:
                  </h4>
                  {assessment.questions.map((q, idx) => {
                    const userAns = selectedAnswers[q.id];
                    const isRight = userAns && String(userAns).trim() === String(q.correctAnswer).trim();
                    return (
                      <div key={q.id} className="p-4 rounded-2xl border border-slate-800 bg-slate-900/90 text-xs sm:text-sm">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="font-black text-white">
                            Câu {idx + 1}: {q.prompt}
                          </span>
                          {isRight ? (
                            <span className="flex items-center gap-1 text-emerald-400 font-black text-xs shrink-0">
                              <CheckCircle2 className="w-4 h-4" /> Đúng
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-rose-400 font-black text-xs shrink-0">
                              <XCircle className="w-4 h-4" /> Sai
                            </span>
                          )}
                        </div>
                        <div className="text-slate-300 mb-1">
                          <strong>Đáp án của bạn:</strong> {userAns || '(Chưa chọn)'}
                        </div>
                        <div className="text-emerald-400 font-bold mb-1">
                          <strong>Đáp án đúng:</strong> {q.correctAnswer}
                        </div>
                        <div className="text-slate-400 text-xs leading-relaxed mt-1 pt-1 border-t border-slate-800">
                          <strong>Giải thích:</strong> {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
