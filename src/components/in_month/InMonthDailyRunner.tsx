import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  InMonthDayPlan,
  IN_MONTH_STAGES_META,
  InMonthStageId,
} from '../../data/inMonthNovemberData';
import { getMonthStorageKeys } from '../../data/inMonthGrade3Catalog';
import { InMonthVisualModels } from './InMonthVisualModels';
import { sound } from '../../utils/soundEffects';
import { clearExerciseScreenInk } from '../ScreenAnnotationOverlay';
import {
  getInMonthQuestionInputSpec,
  isInMonthAnswerCorrect,
  parseDivisionRemainderAnswer,
} from '../../utils/inMonthAnswerUtils';
import {
  ArrowLeft,
  Clock,
  Lightbulb,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Trophy,
  Pause,
  Play,
  Gem,
  PartyPopper,
  BellRing,
  Calculator,
  MessageSquareQuote,
} from 'lucide-react';
import {
  InMonthWeeklyTest,
  InMonthWeeklyTestSavedResult,
} from '../../data/inMonthWeeklyTestsData';

interface InMonthDailyRunnerProps {
  monthNumber: number;
  monthLabel: string;
  totalDays?: number;
  totalWeeks?: number;
  unitLabel?: 'Ngày' | 'Buổi';
  dayPlan: InMonthDayPlan;
  weeklyTestForThisDay?: InMonthWeeklyTest | null;
  weeklyTestResult?: InMonthWeeklyTestSavedResult | null;
  isTeacherMode?: boolean;
  onBack: () => void;
  onCompleteDay: (dayNumber: number, score: number, totalQuestions: number, elapsedSeconds: number) => void;
  onSelectNextDay: (nextDayNumber: number) => void;
  onOpenExam: () => void;
  onOpenWeeklyTest?: (weeklyTest: InMonthWeeklyTest) => void;
  onOpenScratchpad: () => void;
}

interface SavedDayState {
  currentIdx: number;
  answers: Record<string, string>;
  solvedMap: Record<string, boolean>;
  wrongAttemptsMap: Record<string, number>;
  elapsedSeconds: number;
}

const getStorageKey = (monthNumber: number, dayNumber: number) =>
  getMonthStorageKeys(monthNumber).dayProgressKey(dayNumber);

function loadSavedDayState(
  monthNumber: number,
  dayNumber: number,
  totalQuestions: number
): SavedDayState {
  try {
    const raw = localStorage.getItem(getStorageKey(monthNumber, dayNumber));
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        currentIdx: Math.min(Math.max(0, parsed.currentIdx || 0), totalQuestions - 1),
        answers: parsed.answers || {},
        solvedMap: parsed.solvedMap || {},
        wrongAttemptsMap: parsed.wrongAttemptsMap || {},
        elapsedSeconds: parsed.elapsedSeconds || 0,
      };
    }
  } catch {
    // Ignore storage read errors
  }
  return {
    currentIdx: 0,
    answers: {},
    solvedMap: {},
    wrongAttemptsMap: {},
    elapsedSeconds: 0,
  };
}

function fireBrilliantCelebration() {
  const cosmicColors = ['#FBBF24', '#EC4899', '#22D3EE', '#34D399', '#A855F7', '#FFFFFF'];

  confetti({
    particleCount: 90,
    spread: 85,
    origin: { y: 0.6 },
    colors: cosmicColors,
  });

  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 70,
      origin: { x: 0.05, y: 0.7 },
      colors: cosmicColors,
    });
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 70,
      origin: { x: 0.95, y: 0.7 },
      colors: cosmicColors,
    });
  }, 220);

  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 110,
      startVelocity: 38,
      origin: { y: 0.4 },
      colors: cosmicColors,
    });
  }, 480);
}

export const InMonthDailyRunner: React.FC<InMonthDailyRunnerProps> = ({
  monthNumber,
  monthLabel,
  totalDays = 30,
  totalWeeks = 5,
  unitLabel = 'Ngày',
  dayPlan,
  weeklyTestForThisDay,
  weeklyTestResult,
  isTeacherMode = false,
  onBack,
  onCompleteDay,
  onSelectNextDay,
  onOpenExam,
  onOpenWeeklyTest,
}) => {
  const unitLower = unitLabel.toLowerCase();
  const questions = dayPlan.questions;

  const [currentIdx, setCurrentIdx] = useState<number>(() =>
    loadSavedDayState(monthNumber, dayPlan.dayNumber, questions.length).currentIdx
  );
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    loadSavedDayState(monthNumber, dayPlan.dayNumber, questions.length).answers
  );
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() =>
    loadSavedDayState(monthNumber, dayPlan.dayNumber, questions.length).solvedMap
  );
  const [wrongAttemptsMap, setWrongAttemptsMap] = useState<Record<string, number>>(() =>
    loadSavedDayState(monthNumber, dayPlan.dayNumber, questions.length).wrongAttemptsMap
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() =>
    loadSavedDayState(monthNumber, dayPlan.dayNumber, questions.length).elapsedSeconds
  );
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const answerInputRef = useRef<HTMLInputElement>(null);
  const activeStorageKey = getStorageKey(monthNumber, dayPlan.dayNumber);
  const hydratedKeyRef = useRef<string>(activeStorageKey);

  // Hydrate saved state when switching days or months
  useEffect(() => {
    if (hydratedKeyRef.current === activeStorageKey) return;
    const saved = loadSavedDayState(monthNumber, dayPlan.dayNumber, dayPlan.questions.length);
    hydratedKeyRef.current = activeStorageKey;
    setCurrentIdx(saved.currentIdx);
    setAnswers(saved.answers);
    setSolvedMap(saved.solvedMap);
    setWrongAttemptsMap(saved.wrongAttemptsMap);
    setElapsedSeconds(saved.elapsedSeconds);
    setIsPaused(false);
    setShowCelebration(false);
  }, [activeStorageKey, monthNumber, dayPlan.dayNumber, dayPlan.questions.length]);

  // Persist in-progress state automatically to localStorage (only when hydrated for this exact day)
  useEffect(() => {
    if (hydratedKeyRef.current !== activeStorageKey) return;
    try {
      const payload: SavedDayState = {
        currentIdx,
        answers,
        solvedMap,
        wrongAttemptsMap,
        elapsedSeconds,
      };
      localStorage.setItem(activeStorageKey, JSON.stringify(payload));
    } catch {
      // Ignore storage write errors
    }
  }, [activeStorageKey, currentIdx, answers, solvedMap, wrongAttemptsMap, elapsedSeconds]);

  // Clear direct on-screen ink annotations when moving to another question
  useEffect(() => {
    clearExerciseScreenInk();
  }, [currentIdx]);

  // 30-Minute Session Timer
  useEffect(() => {
    if (isPaused || showCelebration) return;
    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused, showCelebration]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remSecs = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(remSecs).padStart(2, '0')}`;
  };

  const currentQ = questions[currentIdx];
  const currentAnswer = answers[currentQ.id] || '';
  const isSolved = !!solvedMap[currentQ.id];
  const wrongAttempts = wrongAttemptsMap[currentQ.id] || 0;
  const shouldShowHint = !isSolved && wrongAttempts >= 4;
  const inputSpec = getInMonthQuestionInputSpec(currentQ.correctAnswer);

  // All stages & questions within each daily lesson are unlocked by default
  const maxReachableIdx = questions.length - 1;

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;
  const isAllDayCompleted = solvedCount === questions.length;

  const triggerDayVictory = useCallback(() => {
    clearExerciseScreenInk();
    sound.playVictory();
    fireBrilliantCelebration();
    onCompleteDay(dayPlan.dayNumber, questions.length, questions.length, elapsedSeconds);
    setShowCelebration(true);
  }, [dayPlan.dayNumber, elapsedSeconds, onCompleteDay, questions.length]);

  const handleSelectOption = (opt: string) => {
    if (isSolved) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const isAnswerReady = (() => {
    if (inputSpec.mode === 'division_remainder') {
      const { quotient, remainder } = parseDivisionRemainderAnswer(currentAnswer);
      return quotient.trim() !== '' && remainder.trim() !== '';
    }
    return currentAnswer.trim() !== '';
  })();

  const handleCheckAnswer = () => {
    if (!isAnswerReady || isSolved) return;

    const isRight = isInMonthAnswerCorrect(currentAnswer, currentQ.correctAnswer);

    if (isRight) {
      sound.playCorrect();
      confetti({
        particleCount: 36,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#FBBF24', '#22D3EE', '#EC4899', '#34D399'],
      });

      const nextSolved = { ...solvedMap, [currentQ.id]: true };
      setSolvedMap(nextSolved);

      const allDoneNow = questions.every((q) => nextSolved[q.id]);
      if (allDoneNow) {
        onCompleteDay(dayPlan.dayNumber, questions.length, questions.length, elapsedSeconds);
        // Trigger brilliant celebration automatically after completing the final question
        setTimeout(() => {
          sound.playVictory();
          fireBrilliantCelebration();
          setShowCelebration(true);
        }, 450);
      }
    } else {
      // Do NOT report wrong or show solution steps; silently increment wrong attempts & reset answer
      setWrongAttemptsMap((prev) => ({
        ...prev,
        [currentQ.id]: (prev[currentQ.id] || 0) + 1,
      }));
      setAnswers((prev) => ({ ...prev, [currentQ.id]: '' }));
      setTimeout(() => {
        answerInputRef.current?.focus();
      }, 20);
    }
  };

  const stageQuestions = (stageId: InMonthStageId) =>
    questions.filter((q) => q.stage === stageId);

  const isStageDone = (stageId: InMonthStageId) => {
    const sq = stageQuestions(stageId);
    return sq.length > 0 && sq.every((q) => solvedMap[q.id]);
  };

  const isStageUnlocked = (stageId: InMonthStageId) => {
    const firstIdx = questions.findIndex((q) => q.stage === stageId);
    return firstIdx !== -1 && firstIdx <= maxReachableIdx;
  };

  const jumpToStage = (stageId: InMonthStageId) => {
    const firstIdx = questions.findIndex((q) => q.stage === stageId);
    if (firstIdx !== -1 && firstIdx <= maxReachableIdx) {
      setCurrentIdx(firstIdx);
    }
  };

  return (
    <div className="min-h-screen mm-cosmic-canvas pb-16 relative overflow-hidden">
      {/* Deep Space Starfield, Orbital Rings & Multi-Spectrum Aurora Blooms */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-28 left-1/5 w-[540px] h-[540px] rounded-full bg-cyan-400/20 blur-[145px] cosmic-light-bloom" />
        <div className="absolute top-1/4 -right-24 w-[500px] h-[500px] rounded-full bg-fuchsia-500/18 blur-[145px] cosmic-light-bloom" />
        <div className="absolute bottom-0 left-1/3 w-[540px] h-[540px] rounded-full bg-amber-400/12 blur-[155px] cosmic-light-bloom" />
        <svg
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full opacity-80"
        >
          <circle cx="1220" cy="140" r="260" fill="none" stroke="rgba(103,232,249,0.22)" strokeWidth="1.2" strokeDasharray="6 10" />
          <circle cx="1220" cy="140" r="370" fill="none" stroke="rgba(251,191,36,0.16)" strokeWidth="1" />
          <circle cx="180" cy="760" r="240" fill="none" stroke="rgba(232,121,249,0.2)" strokeWidth="1.2" strokeDasharray="4 10" />
          <circle cx="110" cy="95" r="1.8" fill="#67E8F9" />
          <circle cx="290" cy="160" r="1.6" fill="#FDE68A" />
          <circle cx="470" cy="60" r="1.4" fill="#FFFFFF" />
          <circle cx="640" cy="210" r="2" fill="#67E8F9" />
          <circle cx="880" cy="90" r="1.7" fill="#F9A8D4" />
          <circle cx="1090" cy="240" r="2.2" fill="#FDE68A" />
          <circle cx="1320" cy="310" r="1.6" fill="#FFFFFF" />
          <circle cx="195" cy="490" r="1.9" fill="#FDE68A" />
          <circle cx="520" cy="640" r="1.6" fill="#67E8F9" />
          <circle cx="840" cy="740" r="1.8" fill="#FFFFFF" />
          <circle cx="1160" cy="680" r="2" fill="#F9A8D4" />
          <circle cx="1360" cy="820" r="1.7" fill="#67E8F9" />
        </svg>
      </div>

      {/* Top Cosmic Mission Command Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-2xl bg-[color:color-mix(in_oklch,var(--mm-surface-inset)_94%,transparent)] border-b border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] px-4 py-3.5 shadow-[0_24px_64px_rgba(3,7,24,0.88),0_0_40px_rgba(34,211,238,0.18)] overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 opacity-95 shadow-[0_0_22px_rgba(34,211,238,0.85)]"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/90 to-transparent shadow-[0_0_22px_rgba(34,211,238,0.75)]"
        />
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onBack}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.09] hover:bg-cyan-400/20 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/45 hover:border-cyan-200/80 shadow-[0_0_22px_rgba(34,211,238,0.24)] hover:shadow-[0_0_28px_rgba(34,211,238,0.45)] transition-all duration-200 cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-300" aria-hidden="true" />
              <span>Lịch {monthLabel}</span>
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-400/25 to-orange-400/20 border border-amber-300/60 text-amber-200 font-black uppercase tracking-wider tabular-nums inline-flex items-center gap-1.5 shadow-[0_0_18px_rgba(251,191,36,0.32)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_10px_rgba(251,191,36,1)]" aria-hidden="true" />
                  <span>{unitLabel} {dayPlan.dayNumber}/{totalDays}</span>
                </span>
                {weeklyTestForThisDay && (
                  <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-fuchsia-500/30 to-cyan-500/25 border border-fuchsia-300/65 text-fuchsia-100 font-black uppercase tracking-wider inline-flex items-center gap-1.5 shadow-[0_0_16px_rgba(232,121,249,0.35)]">
                    <BellRing className="w-3 h-3 text-amber-300" aria-hidden="true" />
                    <span>{unitLabel} cuối {dayPlan.weekTitle} · Có Kiểm tra 15p</span>
                  </span>
                )}
              </div>
              <h2 className="text-base sm:text-xl font-black font-display bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent mt-1 cosmic-glow-title-cyan">
                {dayPlan.title}
              </h2>
            </div>
          </div>

          {/* 30-Minute Session Chronometer */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[color:var(--mm-surface-1)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_68%,transparent)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_28px_rgba(34,211,238,0.22)] min-h-[44px]">
              <Clock className="w-4 h-4 text-[color:var(--mm-cyan-accent)] drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]" aria-hidden="true" />
              <div className="text-xs">
                <span className="font-black text-[color:var(--mm-cyan-text)] tabular-nums drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
                  {formatTime(elapsedSeconds)}
                </span>
                <span className="text-[color:var(--mm-ink-muted)] tabular-nums"> / 30:00</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Tiếp tục đồng hồ' : 'Tạm dừng đồng hồ'}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-cyan-400/25 border border-cyan-300/25 hover:border-cyan-300/65 text-white transition-all duration-200 cursor-pointer flex items-center justify-center"
                title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 text-[color:var(--mm-amber-accent)]" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5 text-[color:var(--mm-cyan-text)]" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 4-Stage Cosmic Flight Phase Stepper */}
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {IN_MONTH_STAGES_META.map((stage) => {
            const isActive = currentQ.stage === stage.id;
            const done = isStageDone(stage.id);
            const unlocked = isStageUnlocked(stage.id);
            return (
              <button
                key={stage.id}
                type="button"
                disabled={!unlocked}
                aria-pressed={isActive}
                onClick={() => jumpToStage(stage.id)}
                className={`relative overflow-hidden px-3.5 py-2.5 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between min-h-[50px] ${
                  isActive
                    ? 'bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklch,var(--mm-cyan-accent)_22%,transparent),_transparent_58%),var(--mm-surface-2)] border-[color:var(--mm-cyan-accent)] shadow-[0_0_24px_rgba(34,211,238,0.28)] cursor-pointer'
                    : done
                    ? 'bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_45%,transparent)] border-[color:var(--mm-emerald-border)] hover:border-[color:var(--mm-emerald-accent)] text-[color:var(--mm-emerald-text)] cursor-pointer'
                    : unlocked
                    ? 'bg-[color:var(--mm-surface-1)] border-[color:color-mix(in_oklch,var(--mm-cyan-border)_42%,transparent)] text-[color:var(--mm-ink-secondary)] hover:border-[color:var(--mm-cyan-accent)] cursor-pointer'
                    : 'bg-[color:var(--mm-surface-inset)] border-white/10 text-[color:var(--mm-ink-muted)] opacity-75 cursor-not-allowed'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 inset-x-3 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-amber-brightFill)] to-[color:var(--mm-violet-accent)] shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                  />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-black text-[color:var(--mm-ink-primary)] truncate">{stage.shortTitle}</div>
                </div>
                {done && <CheckCircle2 className="w-4 h-4 text-[color:var(--mm-emerald-accent)] shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* PRE-ANNOUNCEMENT BANNER AT THE OPENING OF THE LAST DAY OF THE WEEK */}
      {weeklyTestForThisDay && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 mt-5">
          <div
            className={`relative overflow-hidden rounded-3xl border p-4 sm:p-5 backdrop-blur-2xl transition-all ${
              currentQ.stage === 'warmup'
                ? 'bg-[radial-gradient(ellipse_at_top_left,_rgba(251,191,36,0.28),_transparent_52%),radial-gradient(ellipse_at_bottom_right,_rgba(232,121,249,0.26),_transparent_52%),linear-gradient(135deg,_rgba(24,16,64,0.96),_rgba(12,20,58,0.96))] border-amber-300/80 shadow-[0_18px_48px_rgba(251,191,36,0.24),0_0_34px_rgba(232,121,249,0.22)]'
                : 'bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.18),_transparent_55%),linear-gradient(135deg,_rgba(14,18,54,0.92),_rgba(22,14,58,0.92))] border-cyan-300/50 shadow-[0_12px_32px_rgba(3,7,24,0.65)]'
            }`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-amber-300 via-fuchsia-400 to-cyan-300 shadow-[0_0_18px_rgba(251,191,36,0.85)]"
            />
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-300 via-orange-400 to-fuchsia-500 text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(251,191,36,0.55)]">
                  <BellRing className="w-5 h-5" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider">
                    <span className="text-amber-300">
                      Thông Báo Trước Ở Phần Mở Đầu · {unitLabel} Cuối Tuần {weeklyTestForThisDay.weekNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 border border-cyan-300/40 text-cyan-200 text-[11px]">
                      15 Phút · {weeklyTestForThisDay.questions.filter((q) => q.section === 'calculation').length} Tính Toán +{' '}
                      {weeklyTestForThisDay.questions.filter((q) => q.section === 'reasoning').length} Nghị Luận
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-relaxed">
                    Hôm nay là {unitLower} học cuối cùng của <strong>{dayPlan.weekTitle}</strong>! Ngay sau khi hoàn thành bài học hôm nay, em sẽ thực hiện{' '}
                    <strong className="text-amber-200">{weeklyTestForThisDay.title}</strong> (15 phút · gồm{' '}
                    {weeklyTestForThisDay.questions.filter((q) => q.section === 'calculation').length} câu Tính toán &amp;{' '}
                    {weeklyTestForThisDay.questions.filter((q) => q.section === 'reasoning').length} câu Nghị luận).{' '}
                    {weeklyTestForThisDay.unlocksDayNumber
                      ? `Em cần hoàn thành và đạt từ ${weeklyTestForThisDay.passingScore}/100 điểm trở lên để mở khóa các bài học của tuần kế tiếp (bắt đầu từ ${unitLabel} ${weeklyTestForThisDay.unlocksDayNumber}).`
                      : `Em hãy hoàn thành bài kiểm tra với kết quả từ ${weeklyTestForThisDay.passingScore}/100 điểm trở lên để khép lại trọn vẹn ${totalWeeks} tuần học và bước vào Bài Kiểm Tra Cuối ${monthLabel}!`}
                  </p>
                </div>
              </div>

              {(isAllDayCompleted || isTeacherMode) && onOpenWeeklyTest && (
                <button
                  type="button"
                  onClick={() => onOpenWeeklyTest(weeklyTestForThisDay)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shrink-0 shadow-[0_0_28px_rgba(251,191,36,0.5)] cursor-pointer transition-all whitespace-nowrap"
                >
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {weeklyTestResult?.passed
                      ? `Xem Kiểm Tra 15p (${weeklyTestResult.totalScore}/100đ)`
                      : 'Làm Bài Kiểm Tra 15 Phút Ngay'}
                  </span>
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Constellation Question Progress Matrix Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-5">
        <div className="relative overflow-hidden flex flex-wrap items-center justify-between gap-3 rounded-3xl mm-surface-card backdrop-blur-2xl border p-4 shadow-[0_20px_52px_rgba(3,7,24,0.72),0_0_32px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.14)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-violet-accent)] to-[color:var(--mm-amber-brightFill)] shadow-[0_0_16px_rgba(34,211,238,0.7)]"
          />
          <div role="group" aria-label="Danh sách câu hỏi" className="flex flex-wrap items-center gap-2">
            {questions.map((q, idx) => {
              const qSolved = !!solvedMap[q.id];
              const isCurr = idx === currentIdx;
              const canJump = idx <= maxReachableIdx;
              return (
                <button
                  key={q.id}
                  type="button"
                  disabled={!canJump}
                  aria-label={`Câu ${idx + 1}${qSolved ? ' (Đã hoàn thành)' : ''}`}
                  aria-pressed={isCurr}
                  onClick={() => {
                    if (canJump) setCurrentIdx(idx);
                  }}
                  className={`w-11 h-11 rounded-xl font-black text-xs transition-all duration-200 flex items-center justify-center tabular-nums ${
                    isCurr
                      ? 'bg-[color:var(--mm-cyan-brightFill)] text-[#05081D] ring-2 ring-[color:var(--mm-cyan-bright)] shadow-[0_0_24px_rgba(56,189,248,0.55)] scale-105 cursor-pointer'
                      : qSolved
                      ? 'bg-[color:var(--mm-emerald-fill)] text-white border border-[color:var(--mm-emerald-accent)] hover:shadow-[0_0_18px_rgba(52,211,153,0.45)] cursor-pointer'
                      : canJump
                      ? 'bg-[color:var(--mm-surface-inset)] text-[color:var(--mm-cyan-text)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_55%,transparent)] hover:border-[color:var(--mm-cyan-accent)] cursor-pointer'
                      : 'bg-[color:var(--mm-surface-inset)] text-[color:var(--mm-ink-muted)] border border-white/10 opacity-65 cursor-not-allowed'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-emerald-border)_55%,transparent)] shadow-inner">
              <span className="text-[color:var(--mm-emerald-text)] font-black tabular-nums">
                {solvedCount}/{questions.length} hoàn thành
              </span>
              <div className="w-20 h-2 rounded-full bg-[color:var(--mm-canvas)] border border-white/10 overflow-hidden hidden sm:block">
                <div
                  style={{ width: `${Math.round((solvedCount / questions.length) * 100)}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-[color:var(--mm-emerald-brightFill)] via-[color:var(--mm-cyan-brightFill)] to-[color:var(--mm-amber-brightFill)] transition-all duration-300"
                />
              </div>
            </div>
            {isAllDayCompleted && (
              <button
                type="button"
                onClick={triggerDayVictory}
                className="px-4 py-2.5 rounded-2xl bg-[color:var(--mm-amber-brightFill)] text-[#05081D] font-black flex items-center gap-1.5 ring-1 ring-[color:var(--mm-amber-bright)] shadow-[0_8px_24px_rgba(251,191,36,0.42)] cursor-pointer whitespace-nowrap"
              >
                <PartyPopper className="w-4 h-4" aria-hidden="true" />
                <span>
                  {weeklyTestForThisDay && !weeklyTestResult?.passed
                    ? 'Mở Bài Kiểm Tra 15 Phút'
                    : 'Xem Chúc Mừng'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Two-Zone Interactive Cosmic Sandbox */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Luminous Cosmic CPA Visual Model & Hint ONLY after 4 wrong attempts */}
        <div className="lg:col-span-7 space-y-4">
          <InMonthVisualModels model={currentQ.visualModel} isAnswered={isSolved} />

          {/* Hint appears ONLY after 4 wrong attempts */}
          {shouldShowHint && (
            <div className="relative overflow-hidden mm-surface-card border border-[color:var(--mm-amber-border)] rounded-3xl p-5 shadow-[0_18px_42px_rgba(251,191,36,0.2)] animate-fade-in">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-5 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-amber-brightFill)] to-[color:var(--mm-violet-accent)] shadow-[0_0_14px_rgba(251,191,36,0.7)]"
              />
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-[color:var(--mm-amber-accent)] drop-shadow-[0_0_10px_rgba(251,191,36,0.85)]" aria-hidden="true" />
                <span className="text-sm font-extrabold font-display text-[color:var(--mm-amber-text)] uppercase tracking-wider">
                  Gợi ý
                </span>
              </div>
              <p className="text-sm text-[color:var(--mm-ink-primary)] leading-relaxed bg-[color:var(--mm-surface-inset)] p-4 rounded-2xl border border-[color:color-mix(in_oklch,var(--mm-amber-border)_55%,transparent)]">
                {currentQ.hint}
              </p>
            </div>
          )}
        </div>

        {/* Right Zone: Flagship Cosmic Mission Question Console */}
        <div className="lg:col-span-5 relative overflow-hidden mm-surface-card backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-[0_32px_84px_rgba(3,7,24,0.9),0_0_46px_rgba(34,211,238,0.16),inset_0_1px_0_rgba(255,255,255,0.16)] border">
          <svg
            aria-hidden="true"
            viewBox="0 0 180 120"
            className="pointer-events-none absolute -top-2 -right-2 w-48 h-32 opacity-65"
          >
            <circle cx="152" cy="18" r="24" fill="rgba(103,232,249,0.16)" stroke="rgba(103,232,249,0.34)" strokeWidth="1" />
            <ellipse cx="152" cy="18" rx="46" ry="12" transform="rotate(-18 152 18)" fill="none" stroke="rgba(251,191,36,0.36)" strokeWidth="1.2" />
            <circle cx="152" cy="18" r="68" fill="none" stroke="rgba(251,191,36,0.24)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="152" cy="18" r="96" fill="none" stroke="rgba(34,211,238,0.22)" strokeWidth="1" />
            <circle cx="104" cy="24" r="2" fill="#FDE68A" />
            <circle cx="136" cy="52" r="1.8" fill="#67E8F9" />
            <circle cx="118" cy="70" r="1.4" fill="#F9A8D4" />
          </svg>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-[color:var(--mm-cyan-brightFill)] via-[color:var(--mm-amber-brightFill)] to-[color:var(--mm-violet-accent)] shadow-[0_0_22px_rgba(34,211,238,0.8)]"
          />

          <div className="relative z-10 flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/15">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-[color:color-mix(in_oklch,var(--mm-amber-tint)_55%,transparent)] border border-[color:var(--mm-amber-border)] text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[color:var(--mm-amber-accent)] shrink-0" aria-hidden="true" />
              <span className="text-[color:var(--mm-amber-text)] tabular-nums">
                Câu {currentIdx + 1} / {questions.length}
              </span>
            </div>
            {isSolved && (
              <span className="px-2.5 py-1 rounded-xl bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_60%,transparent)] border border-[color:var(--mm-emerald-border)] text-[color:var(--mm-emerald-text)] font-black text-xs flex items-center gap-1 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-[color:var(--mm-emerald-accent)]" aria-hidden="true" />
                <span>Đã hoàn thành</span>
              </span>
            )}
          </div>

          <div className="relative z-10 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_58%,transparent)] p-4 sm:p-5 mb-6 shadow-[inset_0_2px_16px_rgba(0,0,0,0.5)]">
            <p className="text-base sm:text-lg font-extrabold text-[color:var(--mm-ink-primary)] leading-relaxed">
              {currentQ.prompt}
            </p>
          </div>

          {/* Blank Direct Input Form (for all exercise questions) */}
          {inputSpec.mode === 'division_remainder' ? (
            (() => {
              const { quotient, remainder } = parseDivisionRemainderAnswer(currentAnswer);
              return (
                <div className="relative z-10 mb-6 p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_62%,transparent)] shadow-[inset_0_2px_14px_rgba(0,0,0,0.6)] space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-[color:var(--mm-cyan-text)]">
                    Nhập kết quả phép chia
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`q-quot-${currentQ.id}`} className="block text-xs font-bold text-[color:var(--mm-ink-secondary)] mb-1.5">
                        Thương
                      </label>
                      <input
                        id={`q-quot-${currentQ.id}`}
                        ref={answerInputRef}
                        type="text"
                        inputMode="numeric"
                        disabled={isSolved}
                        value={quotient}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          handleSelectOption(`Thương ${val}, dư ${remainder}`);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCheckAnswer();
                        }}
                        placeholder="Nhập thương..."
                        className="w-full px-4 py-3 rounded-xl bg-[color:var(--mm-canvas)] border-2 border-[color:var(--mm-azure-border)] focus:border-[color:var(--mm-amber-brightFill)] focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-[color:var(--mm-ink-primary)] font-black text-lg tabular-nums placeholder:text-[color:var(--mm-ink-muted)] placeholder:text-sm disabled:opacity-70 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor={`q-rem-${currentQ.id}`} className="block text-xs font-bold text-[color:var(--mm-ink-secondary)] mb-1.5">
                        Số dư
                      </label>
                      <input
                        id={`q-rem-${currentQ.id}`}
                        type="text"
                        inputMode="numeric"
                        disabled={isSolved}
                        value={remainder}
                        onChange={(e) => {
                          const val = e.target.value.replace(/[^\d]/g, '');
                          handleSelectOption(`Thương ${quotient}, dư ${val}`);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleCheckAnswer();
                        }}
                        placeholder="Nhập số dư..."
                        className="w-full px-4 py-3 rounded-xl bg-[color:var(--mm-canvas)] border-2 border-[color:var(--mm-azure-border)] focus:border-[color:var(--mm-amber-brightFill)] focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-[color:var(--mm-ink-primary)] font-black text-lg tabular-nums placeholder:text-[color:var(--mm-ink-muted)] placeholder:text-sm disabled:opacity-70 transition-all"
                      />
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="relative z-10 mb-6 p-4 rounded-2xl bg-[color:var(--mm-surface-inset)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_62%,transparent)] shadow-[inset_0_2px_14px_rgba(0,0,0,0.6)] space-y-2.5">
              <label htmlFor={`q-ans-${currentQ.id}`} className="block text-xs font-black uppercase tracking-wider text-[color:var(--mm-cyan-text)]">
                Nhập câu trả lời của em
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  id={`q-ans-${currentQ.id}`}
                  ref={answerInputRef}
                  type="text"
                  inputMode={inputSpec.mode === 'text_number' ? 'numeric' : 'text'}
                  disabled={isSolved}
                  value={currentAnswer}
                  onChange={(e) => handleSelectOption(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder={inputSpec.mode === 'text_number' ? 'Nhập đáp án...' : 'Nhập câu trả lời...'}
                  className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-[color:var(--mm-canvas)] border-2 border-[color:var(--mm-azure-border)] focus:border-[color:var(--mm-amber-brightFill)] focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-[color:var(--mm-ink-primary)] font-black text-xl tabular-nums placeholder:text-[color:var(--mm-ink-muted)] placeholder:text-sm disabled:opacity-70 transition-all"
                />
                {inputSpec.mode === 'text_number' && inputSpec.unitLabel && (
                  <span className="px-4 py-3.5 rounded-xl bg-[color:var(--mm-surface-2)] border border-[color:color-mix(in_oklch,var(--mm-cyan-border)_62%,transparent)] text-[color:var(--mm-cyan-text)] font-black text-sm shrink-0">
                    {inputSpec.unitLabel}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Check Action or Correct-Only Notification */}
          {!isSolved ? (
            <button
              type="button"
              disabled={!isAnswerReady}
              onClick={handleCheckAnswer}
              className="relative z-10 w-full py-4 rounded-2xl bg-[color:var(--mm-cyan-brightFill)] hover:brightness-110 disabled:opacity-40 text-[#05081D] font-black text-sm sm:text-base ring-2 ring-[color:var(--mm-cyan-bright)] shadow-[0_14px_34px_rgba(56,189,248,0.38)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer mb-4 min-h-[52px]"
            >
              Kiểm Tra Đáp Án
            </button>
          ) : (
            <div className="relative z-10 p-4 rounded-2xl border border-[color:var(--mm-emerald-border)] bg-[color:color-mix(in_oklch,var(--mm-emerald-tint)_45%,transparent)] text-[color:var(--mm-emerald-text)] mb-4 animate-fade-in">
              <div className="flex items-center gap-2.5 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-[color:var(--mm-emerald-accent)] shrink-0" aria-hidden="true" />
                <span>Chính xác tuyệt vời! Đáp án là: {currentQ.correctAnswer}</span>
              </div>
            </div>
          )}

          {/* Question Navigation: Next button ONLY visible when current question is solved */}
          <div className="relative z-10 flex items-center justify-between gap-3">
            {currentIdx > 0 && (
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors duration-200 min-h-[44px]"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Câu trước</span>
              </button>
            )}

            {isSolved && currentIdx < questions.length - 1 && (
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400 hover:brightness-110 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_8px_26px_rgba(34,211,238,0.4)] cursor-pointer transition-all duration-200 min-h-[48px] animate-fade-in"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {isAllDayCompleted && currentIdx === questions.length - 1 && (
              <button
                type="button"
                onClick={triggerDayVictory}
                className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 via-pink-500 to-purple-500 hover:brightness-110 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-[0_10px_28px_rgba(236,72,153,0.45)] cursor-pointer transition-all duration-200 min-h-[48px] animate-fade-in"
              >
                <Trophy className="w-4 h-4" aria-hidden="true" />
                <span>
                  {weeklyTestForThisDay
                    ? `Hoàn Thành ${unitLabel} ${dayPlan.dayNumber} & Kiểm Tra 15p`
                    : `Hoàn Thành ${unitLabel} ${dayPlan.dayNumber}`}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Brilliant, Joyful Cosmic Celebration Modal */}
      {showCelebration && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="celebration-title"
          className="fixed inset-0 z-50 bg-[color:color-mix(in_oklch,var(--mm-canvas)_88%,transparent)] backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative mm-surface-card rounded-3xl max-w-lg w-full p-7 shadow-[0_0_60px_rgba(251,191,36,0.32)] border-2 border-[color:var(--mm-amber-border)] text-center animate-fade-in overflow-hidden">
            {/* Festive Glow Ring */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-400/20 blur-3xl" aria-hidden="true" />

            <div className="relative z-10">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-slate-950 flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-bounce-slow">
                <Trophy className="w-11 h-11" aria-hidden="true" />
              </div>

              <div className="flex items-center justify-center gap-2 mb-2">
                <Gem className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" aria-hidden="true" />
                <Gem className="w-6 h-6 text-fuchsia-300 drop-shadow-[0_0_10px_rgba(232,121,249,0.85)]" aria-hidden="true" />
                <Gem className="w-5 h-5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" aria-hidden="true" />
              </div>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/50 text-amber-200 font-black text-xs uppercase">
                <PartyPopper className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Chinh phục rực rỡ {unitLabel} {dayPlan.dayNumber}/{totalDays}</span>
              </span>

              <h3 id="celebration-title" className="text-2xl font-extrabold font-display text-white mt-3">
                {dayPlan.title}
              </h3>

              <div className="grid grid-cols-2 gap-3 my-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-400/50">
                  <div className="text-xs text-emerald-200 font-bold">Hoàn thành</div>
                  <div className="text-2xl font-extrabold font-display text-white tabular-nums mt-0.5">
                    {solvedCount} / {questions.length}
                  </div>
                </div>
                <div className="p-3.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/50">
                  <div className="text-xs text-cyan-200 font-bold">Thời gian</div>
                  <div className="text-2xl font-extrabold font-display text-white tabular-nums mt-0.5">
                    {formatTime(elapsedSeconds)}
                  </div>
                </div>
              </div>

              {/* IF THIS IS THE LAST SESSION OF A WEEK WITH A 15-MINUTE WEEKLY TEST */}
              {weeklyTestForThisDay && onOpenWeeklyTest && (() => {
                const wtCalcQs = weeklyTestForThisDay.questions.filter((q) => q.section === 'calculation');
                const wtReasonQs = weeklyTestForThisDay.questions.filter((q) => q.section === 'reasoning');
                const wtCalcMax = wtCalcQs.reduce((s, q) => s + q.points, 0);
                const wtReasonMax = wtReasonQs.reduce((s, q) => s + q.points, 0);
                return (
                  <div className="my-4 p-4 rounded-2xl bg-[radial-gradient(ellipse_at_top_right,_rgba(232,121,249,0.28),_transparent_55%),linear-gradient(145deg,_rgba(15,23,66,0.95),_rgba(30,15,72,0.95))] border-2 border-fuchsia-300/75 text-left space-y-2.5 shadow-[0_0_32px_rgba(232,121,249,0.28)]">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>Bài Kiểm Tra 15 Phút Cuối Tuần {weeklyTestForThisDay.weekNumber}</span>
                      </span>
                      <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-white/10 text-cyan-200">
                        Cần đạt ≥ {weeklyTestForThisDay.passingScore}/100đ
                      </span>
                    </div>
                    <p className="text-xs text-indigo-100 leading-relaxed">
                      Em đã hoàn thành {unitLower} học cuối của <strong>{dayPlan.weekTitle}</strong>! Hãy thực hiện Bài Kiểm Tra 15 Phút gồm{' '}
                      <strong>{wtCalcQs.length} câu Tính Toán ({wtCalcMax}đ)</strong> và <strong>{wtReasonQs.length} câu Nghị Luận Tư Duy ({wtReasonMax}đ)</strong>{' '}
                      {weeklyTestForThisDay.unlocksDayNumber
                        ? 'để mở khóa các bài học của tuần kế tiếp.'
                        : `để hoàn tất ${totalWeeks} tuần học và bước vào Kỳ Thi Cuối ${monthLabel}.`}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold text-cyan-200">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/20 border border-cyan-300/40">
                        <Calculator className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                        {wtCalcQs.length} câu Tính toán ({wtCalcMax}đ)
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-fuchsia-500/20 border border-fuchsia-300/40">
                        <MessageSquareQuote className="w-3.5 h-3.5 text-fuchsia-300" aria-hidden="true" />
                        {wtReasonQs.length} câu Nghị luận ({wtReasonMax}đ)
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="space-y-2.5">
                {weeklyTestForThisDay && onOpenWeeklyTest ? (
                  <>
                    <button
                      type="button"
                      onClick={() => onOpenWeeklyTest(weeklyTestForThisDay)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-fuchsia-400 hover:brightness-110 text-slate-950 font-black text-sm shadow-[0_0_32px_rgba(251,191,36,0.5)] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[52px]"
                    >
                      <Sparkles className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {weeklyTestResult?.passed
                          ? `Xem / Làm Lại Kiểm Tra 15p (${weeklyTestResult.totalScore}/100đ)`
                          : `Bắt Đầu Bài Kiểm Tra 15 Phút Tuần ${weeklyTestForThisDay.weekNumber}`}
                      </span>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    {dayPlan.dayNumber < totalDays ? (
                      <button
                        type="button"
                        onClick={() => onSelectNextDay(dayPlan.dayNumber + 1)}
                        className="w-full py-3 rounded-2xl bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-300/70 text-emerald-100 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[46px]"
                      >
                        <span>
                          {weeklyTestResult?.passed
                            ? `Học Tiếp ${unitLabel} ${dayPlan.dayNumber + 1} (Đã đạt KT 15p)`
                            : `Học Tiếp ${unitLabel} ${dayPlan.dayNumber + 1}`}
                        </span>
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenExam}
                        className="w-full py-3 rounded-2xl bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-300/70 text-emerald-100 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all min-h-[46px]"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>Kiểm Tra Cuối {monthLabel}</span>
                      </button>
                    )}
                  </>
                ) : (
                  isAllDayCompleted && (
                    dayPlan.dayNumber < totalDays ? (
                      <button
                        type="button"
                        onClick={() => onSelectNextDay(dayPlan.dayNumber + 1)}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[50px]"
                      >
                        <span>Học Tiếp {unitLabel} {dayPlan.dayNumber + 1}</span>
                        <ChevronRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenExam}
                        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[50px]"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>Kiểm Tra Cuối {monthLabel}</span>
                      </button>
                    )
                  )
                )}

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs cursor-pointer transition-colors duration-200 min-h-[44px]"
                >
                  Quay Về Lịch {totalDays} {unitLabel} {monthLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
