import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  InMonthWeeklyTest,
  InMonthWeeklyTestSavedResult,
  evaluateWeeklyReasoningText,
} from '../../data/inMonthWeeklyTestsData';
import { getMonthStorageKeys } from '../../data/inMonthGrade3Catalog';
import { InMonthVisualModels } from './InMonthVisualModels';
import { sound } from '../../utils/soundEffects';
import {
  getInMonthQuestionInputSpec,
  isInMonthAnswerCorrect,
  parseDivisionRemainderAnswer,
} from '../../utils/inMonthAnswerUtils';
import {
  Clock,
  Trophy,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  RotateCcw,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Calculator,
  MessageSquareQuote,
  Unlock,
  AlertTriangle,
  PenTool,
  Pause,
  Play,
} from 'lucide-react';

interface InMonthWeeklyTestModalProps {
  monthNumber: number;
  weeklyTest: InMonthWeeklyTest;
  savedResult: InMonthWeeklyTestSavedResult | null;
  onSaveResult: (res: InMonthWeeklyTestSavedResult) => void;
  onClose: () => void;
  onUnlockAndContinueNextWeek: (nextDayNumber: number) => void;
  onOpenFinalExam?: () => void;
  onOpenScratchpad?: () => void;
}

interface SavedWeeklyDraftState {
  currentIdx: number;
  selectedAnswers: Record<string, string>;
  reasoningTexts: Record<string, string>;
  remainingSeconds: number;
}

function loadWeeklyDraft(
  monthNumber: number,
  weekNumber: number,
  totalQuestions: number,
  defaultSeconds: number
): SavedWeeklyDraftState | null {
  try {
    const raw = localStorage.getItem(
      getMonthStorageKeys(monthNumber).weeklyTestDraftKey(weekNumber)
    );
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return {
      currentIdx: Math.min(Math.max(0, parsed.currentIdx || 0), totalQuestions - 1),
      selectedAnswers: parsed.selectedAnswers || {},
      reasoningTexts: parsed.reasoningTexts || {},
      remainingSeconds:
        typeof parsed.remainingSeconds === 'number' && parsed.remainingSeconds > 0
          ? parsed.remainingSeconds
          : defaultSeconds,
    };
  } catch {
    return null;
  }
}

export const InMonthWeeklyTestModal: React.FC<InMonthWeeklyTestModalProps> = ({
  monthNumber,
  weeklyTest,
  savedResult,
  onSaveResult,
  onClose,
  onUnlockAndContinueNextWeek,
  onOpenFinalExam,
  onOpenScratchpad,
}) => {
  const questions = weeklyTest.questions;
  const defaultSeconds = weeklyTest.durationMinutes * 60; // 15 * 60 = 900s

  const initialDraft = !savedResult
    ? loadWeeklyDraft(monthNumber, weeklyTest.weekNumber, questions.length, defaultSeconds)
    : null;

  const [currentIdx, setCurrentIdx] = useState<number>(initialDraft?.currentIdx ?? 0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>(
    savedResult ? savedResult.answers : initialDraft?.selectedAnswers || {}
  );
  const [reasoningTexts, setReasoningTexts] = useState<Record<string, string>>(
    savedResult ? savedResult.reasoningTexts : initialDraft?.reasoningTexts || {}
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!savedResult);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(
    initialDraft?.remainingSeconds ?? defaultSeconds
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Persist draft while test is in progress
  useEffect(() => {
    if (isSubmitted) return;
    try {
      const payload: SavedWeeklyDraftState = {
        currentIdx,
        selectedAnswers,
        reasoningTexts,
        remainingSeconds,
      };
      localStorage.setItem(
        getMonthStorageKeys(monthNumber).weeklyTestDraftKey(weeklyTest.weekNumber),
        JSON.stringify(payload)
      );
    } catch {
      // Ignore storage errors
    }
  }, [
    monthNumber,
    weeklyTest.weekNumber,
    currentIdx,
    selectedAnswers,
    reasoningTexts,
    remainingSeconds,
    isSubmitted,
  ]);

  const computeScores = (
    ansMap: Record<string, string>,
    textMap: Record<string, string>
  ) => {
    let calculationScore = 0;
    let reasoningScore = 0;

    questions.forEach((q) => {
      const chosen = ansMap[q.id] || '';
      const isOptionRight = isInMonthAnswerCorrect(chosen, q.correctAnswer);

      if (q.section === 'calculation') {
        if (isOptionRight) {
          calculationScore += q.points; // 10 points
        }
      } else {
        // Reasoning section: 5 points for selecting the right argument + up to 5 points for written solution
        const textVal = textMap[q.id] || '';
        const evalRes = evaluateWeeklyReasoningText(textVal, q.reasoningKeywords);
        if (isOptionRight) {
          reasoningScore += 5;
        }
        reasoningScore += evalRes.points;
      }
    });

    const totalScore = calculationScore + reasoningScore;
    const passed = totalScore >= weeklyTest.passingScore;
    return { calculationScore, reasoningScore, totalScore, passed };
  };

  const handleSubmitTest = () => {
    const { calculationScore, reasoningScore, totalScore, passed } = computeScores(
      selectedAnswers,
      reasoningTexts
    );

    const elapsedSeconds = Math.max(1, defaultSeconds - remainingSeconds);

    const result: InMonthWeeklyTestSavedResult = {
      weekNumber: weeklyTest.weekNumber,
      totalScore,
      calculationScore,
      reasoningScore,
      passed,
      answers: selectedAnswers,
      reasoningTexts,
      completedAt: new Date().toLocaleDateString('vi-VN'),
      elapsedSeconds,
    };

    try {
      localStorage.removeItem(
        getMonthStorageKeys(monthNumber).weeklyTestDraftKey(weeklyTest.weekNumber)
      );
    } catch {
      // Ignore
    }

    setIsSubmitted(true);
    onSaveResult(result);

    if (passed) {
      sound.playVictory();
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#22D3EE', '#FBBF24', '#EC4899', '#34D399', '#A855F7'],
      });
    } else {
      sound.playClick();
    }
  };

  // 15-Minute Countdown Timer
  useEffect(() => {
    if (isSubmitted || isPaused) return;
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, isPaused]);

  // Auto-submit when countdown reaches 0
  useEffect(() => {
    if (!isSubmitted && remainingSeconds === 0) {
      handleSubmitTest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remainingSeconds, isSubmitted]);

  const handleRetake = () => {
    try {
      localStorage.removeItem(
        getMonthStorageKeys(monthNumber).weeklyTestDraftKey(weeklyTest.weekNumber)
      );
    } catch {
      // Ignore
    }
    setSelectedAnswers({});
    setReasoningTexts({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setRemainingSeconds(defaultSeconds);
    setIsPaused(false);
  };

  const formatCountdown = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(rem).padStart(2, '0')}`;
  };

  const isQuestionCompleted = (qId: string) => {
    const q = questions.find((item) => item.id === qId);
    if (!q) return false;
    const ans = (selectedAnswers[qId] || '').trim();
    if (q.section === 'calculation') {
      const spec = getInMonthQuestionInputSpec(q.correctAnswer);
      if (spec.mode === 'division_remainder') {
        const { quotient, remainder } = parseDivisionRemainderAnswer(ans);
        return quotient.trim() !== '' && remainder.trim() !== '';
      }
      return ans !== '';
    }
    // Reasoning requires both selecting an argument AND writing a short explanation
    const txt = (reasoningTexts[qId] || '').trim();
    return ans !== '' && txt.length >= 6;
  };

  const completedCount = questions.filter((q) => isQuestionCompleted(q.id)).length;
  const currentQ = questions[currentIdx];
  const currentInputSpec = getInMonthQuestionInputSpec(currentQ.correctAnswer);
  const currentReasoningEval =
    currentQ.section === 'reasoning'
      ? evaluateWeeklyReasoningText(reasoningTexts[currentQ.id] || '', currentQ.reasoningKeywords)
      : null;

  const liveScores = computeScores(selectedAnswers, reasoningTexts);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_15%_12%,_rgba(34,211,238,0.25),_transparent_50%),radial-gradient(ellipse_at_85%_18%,_rgba(217,70,239,0.26),_transparent_52%),radial-gradient(ellipse_at_50%_92%,_rgba(251,191,36,0.16),_transparent_54%),linear-gradient(180deg,_#030618_0%,_#090E34_46%,_#180D44_100%)] text-white pb-20 relative overflow-hidden">
      {/* Ambient Starfield & Nebula Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-[520px] h-[520px] rounded-full bg-cyan-400/25 blur-[145px] cosmic-light-bloom" />
        <div className="absolute top-1/3 -right-20 w-[480px] h-[480px] rounded-full bg-fuchsia-500/25 blur-[145px] cosmic-light-bloom" />
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-400/18 blur-[150px] cosmic-light-bloom" />
      </div>

      {/* Top Sticky 15-Minute Assessment Command Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-2xl bg-[radial-gradient(ellipse_at_15%_0%,_rgba(34,211,238,0.34),_transparent_52%),radial-gradient(ellipse_at_85%_0%,_rgba(217,70,239,0.34),_transparent_52%),linear-gradient(180deg,_rgba(5,9,30,0.97),_rgba(11,15,48,0.94))] border-b border-cyan-300/55 px-4 py-3.5 shadow-[0_24px_64px_rgba(3,7,24,0.88),0_0_40px_rgba(34,211,238,0.24)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 opacity-95 shadow-[0_0_22px_rgba(34,211,238,0.85)]"
        />
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.09] hover:bg-cyan-400/20 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/45 hover:border-cyan-200/80 shadow-[0_0_20px_rgba(34,211,238,0.22)] transition-all cursor-pointer min-h-[42px]"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-300" aria-hidden="true" />
              <span>Quay lại</span>
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-black">
                <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-400/30 to-fuchsia-500/25 border border-amber-300/65 text-amber-200 uppercase tracking-wider inline-flex items-center gap-1.5 shadow-[0_0_16px_rgba(251,191,36,0.3)]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                  <span>Kiểm Tra 15 Phút · Tuần {weeklyTest.weekNumber}</span>
                </span>
                <span className="text-cyan-200/90 hidden sm:inline">
                  6 Câu Tính Toán (60đ) + 4 Câu Nghị Luận (40đ)
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black font-display bg-gradient-to-r from-white via-cyan-100 to-amber-200 bg-clip-text text-transparent mt-0.5">
                {weeklyTest.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {onOpenScratchpad && (
              <button
                type="button"
                onClick={onOpenScratchpad}
                className="px-3.5 py-2 rounded-xl bg-indigo-950/80 hover:bg-cyan-500/20 border border-cyan-300/40 text-cyan-200 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer min-h-[42px]"
              >
                <PenTool className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                <span className="hidden sm:inline">Giấy nháp</span>
              </button>
            )}

            {!isSubmitted ? (
              <>
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-2xl border font-black text-xs sm:text-sm tabular-nums min-h-[42px] ${
                    remainingSeconds <= 180
                      ? 'bg-rose-950/90 border-rose-400 text-rose-200 shadow-[0_0_24px_rgba(244,63,94,0.45)] animate-pulse'
                      : 'bg-[#0A1136]/95 border-cyan-300/55 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.28)]'
                  }`}
                >
                  <Clock className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>{formatCountdown(remainingSeconds)}</span>
                  <button
                    type="button"
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-cyan-400/25 border border-cyan-300/30 flex items-center justify-center text-white cursor-pointer"
                    title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
                  >
                    {isPaused ? (
                      <Play className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                    ) : (
                      <Pause className="w-3.5 h-3.5 text-cyan-200" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_28px_rgba(251,191,36,0.45)] ring-1 ring-amber-200 transition-all cursor-pointer min-h-[42px] whitespace-nowrap"
                >
                  Nộp Bài ({completedCount}/{questions.length})
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleRetake}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_24px_rgba(34,211,238,0.4)] cursor-pointer min-h-[42px]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Làm Lại Bài Kiểm Tra</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6 space-y-6">
        {/* RESULT SUMMARY CARD WHEN SUBMITTED */}
        {isSubmitted && (
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(217,70,239,0.26),_transparent_52%),linear-gradient(145deg,_rgba(11,18,56,0.97),_rgba(24,13,66,0.97))] border-2 border-cyan-300/65 p-6 sm:p-8 shadow-[0_28px_72px_rgba(3,7,24,0.88),0_0_44px_rgba(34,211,238,0.25)] animate-fade-in">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-8 h-[3px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-fuchsia-400 shadow-[0_0_20px_rgba(34,211,238,0.85)]"
            />
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="space-y-2.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-xs font-black uppercase tracking-wider bg-white/10 border-cyan-300/50 text-cyan-200">
                  <Award className="w-4 h-4 text-amber-300" aria-hidden="true" />
                  <span>Kết Quả Kiểm Tra 15 Phút · {weeklyTest.weekTitle}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black font-display text-white">
                  {liveScores.passed ? (
                    <span className="bg-gradient-to-r from-emerald-300 via-cyan-200 to-amber-200 bg-clip-text text-transparent">
                      Xuất Sắc! Em Đã Vượt Qua Bài Kiểm Tra Tuần {weeklyTest.weekNumber}
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-rose-300 bg-clip-text text-transparent">
                      Chưa Đạt Mốc Mở Khóa ({weeklyTest.passingScore}/100 điểm)
                    </span>
                  )}
                </h2>

                <p className="text-sm text-indigo-100/90 leading-relaxed">
                  {liveScores.passed
                    ? weeklyTest.unlocksDayNumber
                      ? `Chúc mừng em! Đạt ${liveScores.totalScore}/100 điểm (≥ ${weeklyTest.passingScore}%). Toàn bộ bài học của Tuần ${weeklyTest.weekNumber + 1} (bắt đầu từ Ngày ${weeklyTest.unlocksDayNumber}) đã chính thức được mở khóa!`
                      : `Chúc mừng em đã hoàn thành trọn vẹn Bài Kiểm Tra 15 Phút Tuần 5 với ${liveScores.totalScore}/100 điểm và sẵn sàng bước vào Kỳ Thi Tổng Kết Cuối Tháng 11!`
                    : `Em đạt ${liveScores.totalScore}/100 điểm. Để mở khóa các bài học của tuần kế tiếp, em cần đạt tối thiểu ${weeklyTest.passingScore}/100 điểm. Hãy xem lại hướng dẫn từng câu bên dưới và bấm "Làm Lại Bài Kiểm Tra Ngay" nhé!`}
                </p>
              </div>

              {/* Score Breakdown Pills */}
              <div className="grid grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
                <div className="p-4 rounded-2xl bg-[#070D2D]/90 border border-cyan-300/45 text-center">
                  <div className="text-[11px] font-bold uppercase text-cyan-300">Tính Toán</div>
                  <div className="text-2xl font-black font-display text-white tabular-nums mt-1">
                    {liveScores.calculationScore}
                    <span className="text-xs text-slate-400 font-normal">/60</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-[#070D2D]/90 border border-fuchsia-300/45 text-center">
                  <div className="text-[11px] font-bold uppercase text-fuchsia-300">Nghị Luận</div>
                  <div className="text-2xl font-black font-display text-white tabular-nums mt-1">
                    {liveScores.reasoningScore}
                    <span className="text-xs text-slate-400 font-normal">/40</span>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-2xl border text-center ${
                    liveScores.passed
                      ? 'bg-emerald-500/20 border-emerald-300/70 shadow-[0_0_24px_rgba(52,211,153,0.3)]'
                      : 'bg-rose-500/20 border-rose-300/70 shadow-[0_0_24px_rgba(244,63,94,0.3)]'
                  }`}
                >
                  <div className="text-[11px] font-bold uppercase text-amber-200">Tổng Điểm</div>
                  <div className="text-2xl font-black font-display text-white tabular-nums mt-1">
                    {liveScores.totalScore}
                    <span className="text-xs text-slate-300 font-normal">/100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons After Submission */}
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-bold">
                {liveScores.passed ? (
                  <span className="text-emerald-300 flex items-center gap-1.5">
                    <Unlock className="w-4 h-4" aria-hidden="true" />
                    <span>Đã mở khóa tuần tiếp theo!</span>
                  </span>
                ) : (
                  <span className="text-amber-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                    <span>Cần đạt từ {weeklyTest.passingScore}/100 điểm để mở khóa tuần kế tiếp</span>
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-cyan-300/45 text-white font-black text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all"
                >
                  <RotateCcw className="w-4 h-4 text-cyan-300" aria-hidden="true" />
                  <span>Làm Lại Bài Kiểm Tra Ngay</span>
                </button>

                {liveScores.passed && weeklyTest.unlocksDayNumber && (
                  <button
                    type="button"
                    onClick={() => onUnlockAndContinueNextWeek(weeklyTest.unlocksDayNumber!)}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-300 via-cyan-300 to-sky-300 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_32px_rgba(52,211,153,0.5)] cursor-pointer transition-all"
                  >
                    <Unlock className="w-4 h-4" aria-hidden="true" />
                    <span>Mở Khóa &amp; Học Tiếp Ngày {weeklyTest.unlocksDayNumber}</span>
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                )}

                {liveScores.passed && !weeklyTest.unlocksDayNumber && onOpenFinalExam && (
                  <button
                    type="button"
                    onClick={onOpenFinalExam}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-400 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_32px_rgba(251,191,36,0.5)] cursor-pointer transition-all"
                  >
                    <Trophy className="w-4 h-4" aria-hidden="true" />
                    <span>Bước Vào Kỳ Thi Cuối Tháng 11</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* QUESTION MATRIX NAVIGATOR (1..6 Calculation, 7..10 Reasoning) */}
        <div className="rounded-3xl bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.2),_transparent_50%),radial-gradient(ellipse_at_right,_rgba(217,70,239,0.2),_transparent_50%),linear-gradient(135deg,_rgba(10,16,50,0.95),_rgba(22,13,60,0.95))] border border-cyan-300/45 p-4 shadow-[0_18px_46px_rgba(3,7,24,0.72)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-300 mr-1 flex items-center gap-1">
              <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Tính toán:</span>
            </span>
            {questions.slice(0, 6).map((q, idx) => {
              const isCurr = currentIdx === idx;
              const done = isQuestionCompleted(q.id);
              const isRightAfterSubmit =
                isSubmitted && isInMonthAnswerCorrect(selectedAnswers[q.id] || '', q.correctAnswer);
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all flex items-center justify-center tabular-nums cursor-pointer ${
                    isCurr
                      ? 'bg-gradient-to-br from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 ring-2 ring-cyan-100 scale-105 shadow-[0_0_22px_rgba(34,211,238,0.6)]'
                      : isSubmitted
                      ? isRightAfterSubmit
                        ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-100'
                        : 'bg-rose-500/30 border border-rose-400 text-rose-100'
                      : done
                      ? 'bg-cyan-500/25 border border-cyan-300/70 text-cyan-100'
                      : 'bg-indigo-950/70 border border-white/15 text-indigo-200 hover:border-cyan-300/50'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}

            <span className="text-xs font-black uppercase tracking-wider text-fuchsia-300 ml-3 mr-1 flex items-center gap-1">
              <MessageSquareQuote className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Nghị luận:</span>
            </span>
            {questions.slice(6, 10).map((q, offset) => {
              const idx = offset + 6;
              const isCurr = currentIdx === idx;
              const done = isQuestionCompleted(q.id);
              const isOptionRight = isInMonthAnswerCorrect(
                selectedAnswers[q.id] || '',
                q.correctAnswer
              );
              const isTextRight = evaluateWeeklyReasoningText(
                reasoningTexts[q.id] || '',
                q.reasoningKeywords
              ).isComplete;
              const fullRight = isSubmitted && isOptionRight && isTextRight;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-10 h-10 rounded-xl font-black text-xs transition-all flex items-center justify-center tabular-nums cursor-pointer ${
                    isCurr
                      ? 'bg-gradient-to-br from-fuchsia-300 via-amber-200 to-cyan-300 text-slate-950 ring-2 ring-fuchsia-100 scale-105 shadow-[0_0_22px_rgba(232,121,249,0.6)]'
                      : isSubmitted
                      ? fullRight
                        ? 'bg-emerald-500/30 border border-emerald-400 text-emerald-100'
                        : isOptionRight || isTextRight
                        ? 'bg-amber-500/30 border border-amber-300 text-amber-100'
                        : 'bg-rose-500/30 border border-rose-400 text-rose-100'
                      : done
                      ? 'bg-fuchsia-500/25 border border-fuchsia-300/70 text-fuchsia-100'
                      : 'bg-indigo-950/70 border border-white/15 text-indigo-200 hover:border-fuchsia-300/50'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-bold text-cyan-200 tabular-nums">
            Đã làm: <span className="text-amber-300 font-black">{completedCount}/10</span> câu · Đạt tối thiểu:{' '}
            <span className="text-emerald-300 font-black">{weeklyTest.passingScore}/100đ</span>
          </div>
        </div>

        {/* MAIN TWO-COLUMN QUESTION WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: CPA Visual Model & Explanation (when submitted) */}
          <div className="lg:col-span-6 space-y-4">
            <InMonthVisualModels model={currentQ.visualModel} isAnswered={isSubmitted} />

            {isSubmitted && (
              <div className="rounded-3xl bg-[radial-gradient(ellipse_at_top_left,_rgba(52,211,153,0.2),_transparent_55%),linear-gradient(145deg,_rgba(8,22,48,0.96),_rgba(14,16,52,0.96))] border border-emerald-300/55 p-5 space-y-3 shadow-[0_16px_40px_rgba(3,7,24,0.75)]">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                    <span>Đáp án &amp; Giải thích chuẩn Singapore CPA</span>
                  </span>
                  <span className="text-xs font-bold text-cyan-200">
                    Đáp án đúng: <strong className="text-amber-300">{currentQ.correctAnswer}</strong>
                  </span>
                </div>
                <p className="text-sm text-emerald-50 leading-relaxed bg-[#050B24]/85 p-4 rounded-2xl border border-emerald-300/30">
                  {currentQ.explanation}
                </p>
                {currentQ.section === 'reasoning' && currentQ.reasoningSampleAnswer && (
                  <div className="p-4 rounded-2xl bg-fuchsia-950/50 border border-fuchsia-300/40 space-y-1">
                    <div className="text-xs font-black uppercase tracking-wider text-fuchsia-200">
                      Lời giải nghị luận mẫu:
                    </div>
                    <p className="text-sm text-white leading-relaxed">
                      {currentQ.reasoningSampleAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Question Prompt + Calculation Input OR Dual Reasoning Assessment */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.22),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(34,211,238,0.22),_transparent_52%),linear-gradient(165deg,_rgba(14,22,68,0.97),_rgba(18,12,56,0.98)_55%,_rgba(6,10,34,0.99)_100%)] border border-cyan-300/55 p-6 sm:p-7 shadow-[0_32px_84px_rgba(3,7,24,0.9),0_0_46px_rgba(34,211,238,0.18)] space-y-5">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-fuchsia-400 shadow-[0_0_20px_rgba(34,211,238,0.85)]"
            />

            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/15">
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider inline-flex items-center gap-1.5 border ${
                    currentQ.section === 'calculation'
                      ? 'bg-cyan-500/20 border-cyan-300/60 text-cyan-200'
                      : 'bg-fuchsia-500/25 border-fuchsia-300/65 text-fuchsia-200'
                  }`}
                >
                  {currentQ.section === 'calculation' ? (
                    <>
                      <Calculator className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                      <span>Phần I · Tính Toán ({currentQ.points} điểm)</span>
                    </>
                  ) : (
                    <>
                      <MessageSquareQuote className="w-3.5 h-3.5 text-fuchsia-300" aria-hidden="true" />
                      <span>Phần II · Nghị Luận Tư Duy ({currentQ.points} điểm)</span>
                    </>
                  )}
                </span>
              </div>
              <span className="text-xs font-black text-amber-200 tabular-nums">
                Câu {currentIdx + 1} / {questions.length}
              </span>
            </div>

            {/* Prompt Box */}
            <div className="rounded-2xl bg-[#060B28]/95 border border-cyan-300/35 p-4 sm:p-5 shadow-inner">
              <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed">
                {currentQ.prompt}
              </p>
            </div>

            {currentQ.section === 'calculation' ? (
              /* ========================================== */
              /* PHẦN I: TÍNH TOÁN (6 CÂU x 10 ĐIỂM)         */
              /* ========================================== */
              <div className="space-y-4">
                {currentInputSpec.mode === 'division_remainder' ? (
                  (() => {
                    const { quotient, remainder } = parseDivisionRemainderAnswer(
                      selectedAnswers[currentQ.id] || ''
                    );
                    return (
                      <div className="p-4 rounded-2xl bg-[#070D30]/95 border border-cyan-300/45 space-y-3">
                        <div className="text-xs font-black uppercase tracking-wider text-cyan-300">
                          Nhập kết quả phép chia có dư
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-bold text-indigo-200 mb-1">
                              Thương
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              disabled={isSubmitted}
                              value={quotient}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^\d]/g, '');
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [currentQ.id]: `Thương ${val}, dư ${remainder}`,
                                }));
                              }}
                              placeholder="Nhập thương..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-indigo-400/45 focus:border-amber-300 focus:outline-none text-white font-black text-base tabular-nums"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-indigo-200 mb-1">
                              Số dư
                            </label>
                            <input
                              type="text"
                              inputMode="numeric"
                              disabled={isSubmitted}
                              value={remainder}
                              onChange={(e) => {
                                const val = e.target.value.replace(/[^\d]/g, '');
                                setSelectedAnswers((prev) => ({
                                  ...prev,
                                  [currentQ.id]: `Thương ${quotient}, dư ${val}`,
                                }));
                              }}
                              placeholder="Nhập số dư..."
                              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-indigo-400/45 focus:border-amber-300 focus:outline-none text-white font-black text-base tabular-nums"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="p-4 rounded-2xl bg-[#070D30]/95 border border-cyan-300/45 space-y-2">
                    <label className="block text-xs font-black uppercase tracking-wider text-cyan-300">
                      Nhập kết quả tính toán của em
                    </label>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="text"
                        inputMode={currentInputSpec.mode === 'text_number' ? 'numeric' : 'text'}
                        disabled={isSubmitted}
                        value={selectedAnswers[currentQ.id] || ''}
                        onChange={(e) =>
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [currentQ.id]: e.target.value,
                          }))
                        }
                        placeholder={
                          currentInputSpec.mode === 'text_number'
                            ? 'Nhập số...'
                            : 'Nhập câu trả lời...'
                        }
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-indigo-400/45 focus:border-amber-300 focus:outline-none text-white font-black text-lg tabular-nums"
                      />
                      {currentInputSpec.mode === 'text_number' && currentInputSpec.unitLabel && (
                        <span className="px-3.5 py-3 rounded-xl bg-indigo-900/75 border border-cyan-300/35 text-cyan-200 font-black text-xs shrink-0">
                          {currentInputSpec.unitLabel}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ============================================================ */
              /* PHẦN II: NGHỊ LUẬN TƯ DUY (CHỌN LẬP LUẬN ĐÚNG + VIẾT LỜI GIẢI) */
              /* ============================================================ */
              <div className="space-y-5">
                {/* Bước 1: Chọn lập luận đúng (5 điểm) */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-fuchsia-200">
                    <span>Bước 1 (5 điểm): Chọn lập luận toán học đúng nhất</span>
                    {selectedAnswers[currentQ.id] && (
                      <span className="text-emerald-300">✓ Đã chọn lập luận</span>
                    )}
                  </div>
                  <div className="space-y-2.5">
                    {currentQ.options.map((opt, oIdx) => {
                      const chosen = selectedAnswers[currentQ.id] || '';
                      const isSelected = chosen.trim() === opt.trim();
                      const isRightOpt =
                        isSubmitted && isInMonthAnswerCorrect(opt, currentQ.correctAnswer);
                      const isWrongSelected = isSubmitted && isSelected && !isRightOpt;

                      return (
                        <button
                          key={oIdx}
                          type="button"
                          disabled={isSubmitted}
                          onClick={() =>
                            setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: opt }))
                          }
                          className={`w-full p-3.5 rounded-2xl border-2 font-bold text-left transition-all flex items-start justify-between gap-3 cursor-pointer ${
                            isRightOpt
                              ? 'bg-emerald-500/25 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                              : isWrongSelected
                              ? 'bg-rose-500/25 border-rose-400 text-rose-100'
                              : isSelected
                              ? 'bg-gradient-to-r from-fuchsia-300/95 via-amber-200/95 to-cyan-300/95 border-white text-slate-950 font-black shadow-[0_0_26px_rgba(232,121,249,0.5)]'
                              : 'bg-[#080E32]/90 border-fuchsia-300/35 text-white hover:border-fuchsia-300 hover:bg-indigo-900/60'
                          }`}
                        >
                          <span className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                            <span
                              className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                                isRightOpt
                                  ? 'bg-emerald-400 text-slate-950'
                                  : isWrongSelected
                                  ? 'bg-rose-400 text-slate-950'
                                  : isSelected
                                  ? 'bg-slate-950 text-fuchsia-300'
                                  : 'bg-fuchsia-400/20 text-fuchsia-200 border border-fuchsia-300/40'
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {isRightOpt && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                          )}
                          {isWrongSelected && (
                            <XCircle className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bước 2: Tự viết lời giải ngắn (5 điểm) */}
                <div className="p-4 rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_rgba(232,121,249,0.16),_transparent_60%),rgba(6,10,34,0.95)] border border-fuchsia-300/50 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label
                      htmlFor={`reasoning-input-${currentQ.id}`}
                      className="text-xs font-black uppercase tracking-wider text-amber-200"
                    >
                      Bước 2 (5 điểm): Tự viết phép tính &amp; lời giải ngắn của em
                    </label>
                    {currentReasoningEval && (
                      <span
                        className={`text-[11px] font-black px-2.5 py-0.5 rounded-full border ${
                          currentReasoningEval.points === 5
                            ? 'bg-emerald-500/20 border-emerald-300/60 text-emerald-200'
                            : currentReasoningEval.points > 0
                            ? 'bg-cyan-500/20 border-cyan-300/50 text-cyan-200'
                            : 'bg-amber-500/20 border-amber-300/50 text-amber-200'
                        }`}
                      >
                        {currentReasoningEval.points === 5
                          ? '✓ Lời giải đầy đủ (+5đ)'
                          : currentReasoningEval.points > 0
                          ? `✓ Đã viết lời giải (+${currentReasoningEval.points}đ)`
                          : 'Hãy nêu phép tính hoặc con số kết quả'}
                      </span>
                    )}
                  </div>

                  {currentQ.reasoningPrompt && (
                    <p className="text-xs text-cyan-100/90 font-semibold">
                      {currentQ.reasoningPrompt}
                    </p>
                  )}

                  <textarea
                    id={`reasoning-input-${currentQ.id}`}
                    rows={3}
                    disabled={isSubmitted}
                    value={reasoningTexts[currentQ.id] || ''}
                    onChange={(e) =>
                      setReasoningTexts((prev) => ({
                        ...prev,
                        [currentQ.id]: e.target.value,
                      }))
                    }
                    placeholder={
                      currentQ.reasoningPlaceholder ||
                      'Ví dụ: Ta lấy ... chia cho ... được ... Vậy đáp án là ...'
                    }
                    className="w-full p-3.5 rounded-xl bg-slate-950/95 border-2 border-fuchsia-400/40 focus:border-amber-300 focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-white text-sm font-medium leading-relaxed placeholder:text-indigo-300/50 disabled:opacity-75"
                  />
                </div>
              </div>
            )}

            {/* Question Prev / Next / Submit Footer */}
            <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-3">
              <button
                type="button"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-35 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all min-h-[44px]"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Câu trước</span>
              </button>

              {currentIdx < questions.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))
                  }
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_24px_rgba(34,211,238,0.4)] cursor-pointer transition-all min-h-[44px]"
                >
                  <span>Câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              ) : !isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitTest}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-[0_0_28px_rgba(251,191,36,0.5)] cursor-pointer transition-all min-h-[44px]"
                >
                  <Trophy className="w-4 h-4" aria-hidden="true" />
                  <span>Hoàn Tất &amp; Chấm Điểm</span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
