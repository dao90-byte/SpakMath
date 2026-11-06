import React, { useState } from 'react';
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col animate-scale-in">
        {/* Modal Top Bar */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-lg shadow-sm">
              📝
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  ĐÁNH GIÁ ĐỊNH KỲ
                </span>
                <span className="text-xs text-amber-100 hidden sm:inline">
                  10 câu hỏi suy ngẫm &amp; vận dụng
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
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <div>
              {/* Question Navigation Bubbles */}
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-500">
                  Câu hỏi {currentIdx + 1} / {totalCount}
                </span>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  {assessment.questions.map((q, idx) => {
                    const isAnswered = !!selectedAnswers[q.id];
                    const isCurrent = idx === currentIdx;
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`w-7 h-7 rounded-lg text-xs font-black transition-all ${
                          isCurrent
                            ? 'bg-slate-900 text-white shadow-xs'
                            : isAnswered
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
                <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                  currentQ.cognitiveLevel === 'nhan_biet' ? 'bg-sky-100 text-sky-800' :
                  currentQ.cognitiveLevel === 'thong_hieu' ? 'bg-emerald-100 text-emerald-800' :
                  currentQ.cognitiveLevel === 'van_dung' ? 'bg-amber-100 text-amber-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  Mức độ: {currentQ.cognitiveLevel === 'nhan_biet' ? '1. Nhận biết' :
                           currentQ.cognitiveLevel === 'thong_hieu' ? '2. Thông hiểu' :
                           currentQ.cognitiveLevel === 'van_dung' ? '3. Vận dụng' : '4. Vận dụng cao'}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Chủ điểm: {currentQ.topicAspect}
                </span>
              </div>

              {/* Prompt */}
              <div className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-5">
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
                      className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-start gap-3 active:scale-[0.99] ${
                        isSelected
                          ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-300 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center shrink-0 text-xs font-black mt-0.5">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Footer Question Nav */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
                  }}
                  disabled={currentIdx === 0}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 ${
                    currentIdx === 0
                      ? 'text-slate-300 cursor-not-allowed'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform"
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
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white active:scale-95'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-3xl shadow-inner mb-3">
                🏆
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Kết Quả Đánh Giá Năng Lực Học Phần
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
                Điểm số: <span className="text-amber-600">{finalScore} / {totalCount}</span>
              </h3>

              <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-black border text-center">
                <span className={`px-3 py-1 rounded-full border ${badgeInfo.color}`}>
                  {badgeInfo.label}
                </span>
              </div>

              {/* Competency Matrix Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6 text-left">
                <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200">
                  <span className="text-[11px] font-bold text-sky-800 block">1. Nhận biết</span>
                  <span className="text-xs font-black text-slate-800">Bản chất nhân chia</span>
                  <div className="text-xs text-sky-700 font-bold mt-1">3/3 câu chuẩn</div>
                </div>
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <span className="text-[11px] font-bold text-emerald-800 block">2. Thông hiểu</span>
                  <span className="text-xs font-black text-slate-800">Gấp/Giảm số lần</span>
                  <div className="text-xs text-emerald-700 font-bold mt-1">3/3 câu chuẩn</div>
                </div>
                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
                  <span className="text-[11px] font-bold text-amber-800 block">3. Vận dụng</span>
                  <span className="text-xs font-black text-slate-800">Bài toán 2 bước</span>
                  <div className="text-xs text-amber-700 font-bold mt-1">2/2 câu chuẩn</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200">
                  <span className="text-[11px] font-bold text-purple-800 block">4. Vận dụng cao</span>
                  <span className="text-xs font-black text-slate-800">Xếp thuyền &amp; tính ngược</span>
                  <div className="text-xs text-purple-700 font-bold mt-1">2/2 câu chuẩn</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowReview(!showReview)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4 text-slate-500" />
                  <span>{showReview ? 'Ẩn lời giải chi tiết' : 'Xem lại đáp án & lời giải'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Làm lại bài kiểm tra</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm shadow-sm transition-transform active:scale-95"
                >
                  <span>Hoàn tất</span>
                </button>
              </div>

              {/* Detailed Review Section */}
              {showReview && (
                <div className="mt-6 pt-6 border-t border-slate-200 text-left space-y-4">
                  <h4 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-2">
                    Bảng đối chiếu đáp án &amp; giải thích chi tiết:
                  </h4>
                  {assessment.questions.map((q, idx) => {
                    const userAns = selectedAnswers[q.id];
                    const isRight = userAns && String(userAns).trim() === String(q.correctAnswer).trim();
                    return (
                      <div key={q.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 text-xs sm:text-sm">
                        <div className="flex items-start justify-between gap-2 mb-1.5">
                          <span className="font-black text-slate-900">
                            Câu {idx + 1}: {q.prompt}
                          </span>
                          {isRight ? (
                            <span className="flex items-center gap-1 text-emerald-600 font-black text-xs shrink-0">
                              <CheckCircle2 className="w-4 h-4" /> Đúng
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-rose-600 font-black text-xs shrink-0">
                              <XCircle className="w-4 h-4" /> Sai
                            </span>
                          )}
                        </div>
                        <div className="text-slate-600 mb-1">
                          <strong>Đáp án của bạn:</strong> {userAns || '(Chưa chọn)'}
                        </div>
                        <div className="text-emerald-700 font-bold mb-1">
                          <strong>Đáp án đúng:</strong> {q.correctAnswer}
                        </div>
                        <div className="text-slate-500 text-xs leading-relaxed mt-1 pt-1 border-t border-slate-200">
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
