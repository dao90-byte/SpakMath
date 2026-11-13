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
} from 'lucide-react';

interface InMonthDailyRunnerProps {
  monthNumber: number;
  monthLabel: string;
  dayPlan: InMonthDayPlan;
  onBack: () => void;
  onCompleteDay: (dayNumber: number, score: number, totalQuestions: number, elapsedSeconds: number) => void;
  onSelectNextDay: (nextDayNumber: number) => void;
  onOpenExam: () => void;
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
  dayPlan,
  onBack,
  onCompleteDay,
  onSelectNextDay,
  onOpenExam,
}) => {
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

  // Hydrate saved state when switching days or months
  useEffect(() => {
    const saved = loadSavedDayState(monthNumber, dayPlan.dayNumber, dayPlan.questions.length);
    setCurrentIdx(saved.currentIdx);
    setAnswers(saved.answers);
    setSolvedMap(saved.solvedMap);
    setWrongAttemptsMap(saved.wrongAttemptsMap);
    setElapsedSeconds(saved.elapsedSeconds);
    setIsPaused(false);
    setShowCelebration(false);
  }, [monthNumber, dayPlan.dayNumber, dayPlan.questions.length]);

  // Persist in-progress state automatically to localStorage
  useEffect(() => {
    try {
      const payload: SavedDayState = {
        currentIdx,
        answers,
        solvedMap,
        wrongAttemptsMap,
        elapsedSeconds,
      };
      localStorage.setItem(getStorageKey(monthNumber, dayPlan.dayNumber), JSON.stringify(payload));
    } catch {
      // Ignore storage write errors
    }
  }, [monthNumber, dayPlan.dayNumber, currentIdx, answers, solvedMap, wrongAttemptsMap, elapsedSeconds]);

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

  // Furthest reachable question index (only allow jumping up to the first unsolved question)
  const firstUnsolvedIdx = questions.findIndex((q) => !solvedMap[q.id]);
  const maxReachableIdx =
    firstUnsolvedIdx === -1 ? questions.length - 1 : firstUnsolvedIdx;

  const solvedCount = Object.values(solvedMap).filter(Boolean).length;
  const isAllDayCompleted = solvedCount === questions.length;

  const triggerDayVictory = useCallback(() => {
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
          <circle cx="470" cy="60" r="1.2" fill="#FFFFFF" />
          <circle cx="640" cy="210" r="1.8" fill="#67E8F9" />
          <circle cx="880" cy="90" r="1.5" fill="#F9A8D4" />
          <circle cx="1090" cy="240" r="2" fill="#FDE68A" />
          <circle cx="1320" cy="310" r="1.4" fill="#FFFFFF" />
          <circle cx="195" cy="490" r="1.7" fill="#FDE68A" />
          <circle cx="520" cy="640" r="1.4" fill="#67E8F9" />
          <circle cx="840" cy="740" r="1.6" fill="#FFFFFF" />
          <circle cx="1160" cy="680" r="1.8" fill="#F9A8D4" />
          <circle cx="1360" cy="820" r="1.5" fill="#67E8F9" />
        </svg>
      </div>

      {/* Top Cosmic Mission Command Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-2xl bg-[radial-gradient(ellipse_at_15%_0%,_rgba(56,189,248,0.20),_transparent_50%),radial-gradient(ellipse_at_85%_0%,_rgba(192,132,252,0.20),_transparent_50%),linear-gradient(180deg,_rgba(6,10,32,0.97),_rgba(11,17,48,0.94))] border-b border-cyan-300/30 px-4 py-3.5 shadow-[0_20px_52px_rgba(3,7,24,0.78)] overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-300/55 to-transparent shadow-[0_0_14px_rgba(34,211,238,0.5)]"
        />
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={onBack}
              className="px-3.5 py-2.5 rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 text-white font-bold text-xs flex items-center gap-1.5 border border-cyan-300/35 hover:border-cyan-300/70 shadow-[0_0_18px_rgba(34,211,238,0.16)] transition-all duration-200 cursor-pointer min-h-[44px] whitespace-nowrap"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-300" aria-hidden="true" />
              <span>Lịch {monthLabel}</span>
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-amber-400/20 to-orange-400/15 border border-amber-300/45 text-amber-200 font-black uppercase tracking-wider tabular-nums inline-flex items-center gap-1.5 shadow-[0_0_12px_rgba(251,191,36,0.2)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.9)]" aria-hidden="true" />
                  <span>Ngày {dayPlan.dayNumber}/30</span>
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black font-display bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent mt-1 drop-shadow-[0_2px_16px_rgba(34,211,238,0.28)]">
                {dayPlan.title}
              </h2>
            </div>
          </div>

          {/* 30-Minute Session Chronometer */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-[#0A1136]/95 border border-cyan-300/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_0_24px_rgba(34,211,238,0.2)] min-h-[44px]">
              <Clock className="w-4 h-4 text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" aria-hidden="true" />
              <div className="text-xs">
                <span className="font-black text-cyan-200 tabular-nums drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
                  {formatTime(elapsedSeconds)}
                </span>
                <span className="text-indigo-200/80 tabular-nums"> / 30:00</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Tiếp tục đồng hồ' : 'Tạm dừng đồng hồ'}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-cyan-400/20 border border-white/15 text-white transition-colors duration-200 cursor-pointer flex items-center justify-center"
                title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5 text-cyan-200" aria-hidden="true" />
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
                    ? 'bg-gradient-to-r from-cyan-500/28 via-indigo-600/40 to-fuchsia-500/25 border-cyan-300/80 shadow-[0_0_26px_rgba(34,211,238,0.35)] cursor-pointer'
                    : done
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/12 border-emerald-400/55 hover:border-emerald-300 hover:shadow-[0_0_20px_rgba(52,211,153,0.32)] text-emerald-100 cursor-pointer'
                    : unlocked
                    ? 'bg-white/[0.06] border-white/15 text-indigo-100 hover:bg-cyan-400/12 hover:border-cyan-300/70 hover:shadow-[0_0_20px_rgba(34,211,238,0.28)] cursor-pointer'
                    : 'bg-white/[0.03] border-white/10 text-indigo-300/45 opacity-55 cursor-not-allowed'
                }`}
              >
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 inset-x-3 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-pink-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
                  />
                )}
                <div className="min-w-0">
                  <div className="text-xs font-black text-white truncate">{stage.shortTitle}</div>
                </div>
                {done && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Constellation Question Progress Matrix Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-6">
        <div className="relative overflow-hidden flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.14),_transparent_45%),linear-gradient(135deg,_rgba(14,22,62,0.95),_rgba(19,16,58,0.95))] backdrop-blur-2xl border border-cyan-300/30 p-4 shadow-[0_18px_46px_rgba(3,7,24,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-6 h-[2px] rounded-full bg-gradient-to-r from-cyan-300/75 via-indigo-400/60 to-amber-300/75"
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
                      ? 'bg-gradient-to-br from-cyan-300 via-sky-300 to-fuchsia-300 text-slate-950 ring-2 ring-cyan-200 shadow-[0_0_26px_rgba(56,189,248,0.6),0_0_32px_rgba(232,121,249,0.32)] scale-105 cursor-pointer'
                      : qSolved
                      ? 'bg-gradient-to-br from-emerald-400/90 to-teal-600/90 text-white border border-emerald-200/70 hover:shadow-[0_0_18px_rgba(52,211,153,0.45)] shadow-[0_0_14px_rgba(52,211,153,0.3)] cursor-pointer'
                      : canJump
                      ? 'bg-indigo-900/60 text-cyan-100 border border-cyan-300/35 hover:border-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.42)] cursor-pointer'
                      : 'bg-white/[0.03] text-indigo-300/40 border border-white/10 cursor-not-allowed'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#080E2B]/85 border border-emerald-400/35 shadow-inner">
              <span className="text-emerald-300 font-black tabular-nums">
                {solvedCount}/{questions.length} hoàn thành
              </span>
              <div className="w-20 h-2 rounded-full bg-slate-950 border border-white/10 overflow-hidden hidden sm:block">
                <div
                  style={{ width: `${Math.round((solvedCount / questions.length) * 100)}%` }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300 transition-all duration-300 shadow-[0_0_10px_rgba(52,211,153,0.6)]"
                />
              </div>
            </div>
            {isAllDayCompleted && (
              <button
                type="button"
                onClick={triggerDayVictory}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-300 via-orange-400 to-pink-500 text-slate-950 font-black flex items-center gap-1.5 ring-1 ring-amber-200/80 shadow-[0_8px_24px_rgba(251,191,36,0.42)] cursor-pointer whitespace-nowrap"
              >
                <PartyPopper className="w-4 h-4" aria-hidden="true" />
                <span>Xem Chúc Mừng</span>
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
            <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/18 to-orange-500/10 backdrop-blur-2xl border border-amber-300/60 rounded-3xl p-5 shadow-[0_14px_34px_rgba(251,191,36,0.18)] animate-fade-in">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-0 inset-x-5 h-[2px] rounded-full bg-gradient-to-r from-amber-300 to-orange-400"
              />
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-300" aria-hidden="true" />
                <span className="text-sm font-extrabold font-display text-amber-200 uppercase tracking-wider">
                  Gợi ý
                </span>
              </div>
              <p className="text-sm text-amber-50 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-amber-300/25">
                {currentQ.hint}
              </p>
            </div>
          )}
        </div>

        {/* Right Zone: Flagship Cosmic Mission Question Console */}
        <div className="lg:col-span-5 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_rgba(251,191,36,0.20),_transparent_48%),radial-gradient(ellipse_at_bottom_left,_rgba(56,189,248,0.16),_transparent_50%),linear-gradient(168deg,_rgba(18,28,80,0.98),_rgba(7,12,38,0.99))] backdrop-blur-2xl text-white rounded-3xl p-6 sm:p-7 shadow-[0_30px_76px_rgba(3,7,24,0.88),inset_0_1px_0_rgba(255,255,255,0.18)] border border-cyan-300/35">
          <svg
            aria-hidden="true"
            viewBox="0 0 180 120"
            className="pointer-events-none absolute -top-2 -right-2 w-48 h-32 opacity-50"
          >
            <circle cx="152" cy="18" r="24" fill="rgba(103,232,249,0.12)" stroke="rgba(103,232,249,0.25)" strokeWidth="1" />
            <ellipse cx="152" cy="18" rx="46" ry="12" transform="rotate(-18 152 18)" fill="none" stroke="rgba(251,191,36,0.28)" strokeWidth="1" />
            <circle cx="152" cy="18" r="68" fill="none" stroke="rgba(251,191,36,0.2)" strokeWidth="1" strokeDasharray="4 6" />
            <circle cx="152" cy="18" r="96" fill="none" stroke="rgba(34,211,238,0.16)" strokeWidth="1" />
            <circle cx="104" cy="24" r="1.8" fill="#FDE68A" />
            <circle cx="136" cy="52" r="1.6" fill="#67E8F9" />
          </svg>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-6 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-pink-500 shadow-[0_0_20px_rgba(34,211,238,0.75)]"
          />

          <div className="relative z-10 flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-amber-400/15 border border-amber-300/40 text-xs font-black uppercase tracking-wider shadow-[0_0_16px_rgba(251,191,36,0.18)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
              <span className="text-amber-200 tabular-nums">
                Câu {currentIdx + 1} / {questions.length}
              </span>
            </div>
            {isSolved && (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/45 text-emerald-200 font-black text-xs flex items-center gap-1 whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>Đã hoàn thành</span>
              </span>
            )}
          </div>

          <div className="relative z-10 rounded-2xl bg-[#070C26]/88 border border-cyan-300/20 p-4 sm:p-5 mb-6 shadow-[inset_0_2px_14px_rgba(0,0,0,0.45)]">
            <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed">
              {currentQ.prompt}
            </p>
          </div>

          {/* Answer Input (for Calculation questions) or Choice Cards (for non-calculation questions) */}
          {inputSpec.mode === 'choice' ? (
            <div role="group" aria-label="Các lựa chọn đáp án" className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = currentAnswer.trim() === opt.trim();
                const isRightOption = isSolved && opt.trim() === currentQ.correctAnswer.trim();

                return (
                  <button
                    key={oIdx}
                    type="button"
                    disabled={isSolved}
                    aria-pressed={isSelected}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-4 rounded-2xl border-2 font-black text-left transition-all duration-200 flex items-center justify-between gap-2 cursor-pointer tabular-nums min-h-[56px] active:scale-[0.98] ${
                      isRightOption
                        ? 'bg-emerald-500/25 border-emerald-400 text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.35)]'
                        : isSelected
                        ? 'bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 border-cyan-100 text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.52),0_0_36px_rgba(232,121,249,0.28)]'
                        : 'bg-[#080E2B]/90 border-indigo-400/28 text-white hover:border-cyan-300 hover:bg-indigo-900/60 hover:shadow-[0_0_26px_rgba(34,211,238,0.38)]'
                    }`}
                  >
                    <span className="flex items-center gap-2.5 text-sm">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                          isRightOption
                            ? 'bg-emerald-400 text-slate-950'
                            : isSelected
                            ? 'bg-slate-950 text-cyan-300'
                            : 'bg-white/10 text-cyan-200 border border-cyan-300/25'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{opt}</span>
                    </span>
                    {isRightOption && <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          ) : inputSpec.mode === 'division_remainder' ? (
            (() => {
              const { quotient, remainder } = parseDivisionRemainderAnswer(currentAnswer);
              return (
                <div className="relative z-10 mb-6 p-4 rounded-2xl bg-[#070B22]/90 border border-cyan-300/35 shadow-[inset_0_2px_12px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.1)] space-y-3">
                  <div className="text-xs font-black uppercase tracking-wider text-cyan-300">
                    Nhập kết quả phép chia
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor={`q-quot-${currentQ.id}`} className="block text-xs font-bold text-indigo-200 mb-1.5">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/95 border-2 border-indigo-400/40 focus:border-amber-300 focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-white font-black text-lg tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm disabled:opacity-70 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor={`q-rem-${currentQ.id}`} className="block text-xs font-bold text-indigo-200 mb-1.5">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/95 border-2 border-indigo-400/40 focus:border-amber-300 focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-white font-black text-lg tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm disabled:opacity-70 transition-all"
                      />
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="relative z-10 mb-6 p-4 rounded-2xl bg-[#070B22]/90 border border-cyan-300/35 shadow-[inset_0_2px_12px_rgba(0,0,0,0.6),0_0_24px_rgba(34,211,238,0.1)] space-y-2.5">
              <label htmlFor={`q-ans-${currentQ.id}`} className="block text-xs font-black uppercase tracking-wider text-cyan-300">
                Nhập câu trả lời của em
              </label>
              <div className="flex items-center gap-2.5">
                <input
                  id={`q-ans-${currentQ.id}`}
                  ref={answerInputRef}
                  type="text"
                  inputMode="numeric"
                  disabled={isSolved}
                  value={currentAnswer}
                  onChange={(e) => handleSelectOption(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCheckAnswer();
                  }}
                  placeholder="Nhập đáp án..."
                  className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-slate-950/95 border-2 border-indigo-400/40 focus:border-amber-300 focus:shadow-[0_0_20px_rgba(251,191,36,0.28)] focus:outline-none text-white font-black text-xl tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm disabled:opacity-70 transition-all"
                />
                {inputSpec.unitLabel && (
                  <span className="px-4 py-3.5 rounded-xl bg-indigo-900/75 border border-cyan-300/35 text-cyan-200 font-black text-sm shrink-0">
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
              className="relative z-10 w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-300 via-sky-300 to-fuchsia-300 hover:brightness-110 disabled:opacity-35 text-slate-950 font-black text-sm sm:text-base ring-2 ring-cyan-200/80 shadow-[0_14px_34px_rgba(56,189,248,0.42),0_0_36px_rgba(232,121,249,0.26)] hover:shadow-[0_18px_42px_rgba(56,189,248,0.6),0_0_44px_rgba(232,121,249,0.38)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer mb-4 min-h-[52px]"
            >
              Kiểm Tra Đáp Án
            </button>
          ) : (
            <div className="relative z-10 p-4 rounded-2xl border border-emerald-400/70 bg-gradient-to-r from-emerald-500/22 to-teal-500/15 text-emerald-100 mb-4 animate-fade-in shadow-[0_8px_24px_rgba(16,185,129,0.25)]">
              <div className="flex items-center gap-2.5 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" aria-hidden="true" />
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
                <span>Hoàn Thành Ngày {dayPlan.dayNumber}</span>
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
          className="fixed inset-0 z-50 bg-[#050817]/85 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative bg-gradient-to-b from-[#172158] via-[#1C1A5E] to-[#12163D] text-white rounded-3xl max-w-md w-full p-7 shadow-[0_0_60px_rgba(251,191,36,0.35)] border-2 border-amber-300 text-center animate-fade-in overflow-hidden">
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
                <span>Chinh phục rực rỡ Ngày {dayPlan.dayNumber}/30</span>
              </span>

              <h3 id="celebration-title" className="text-2xl font-extrabold font-display text-white mt-3">
                {dayPlan.title}
              </h3>

              <div className="grid grid-cols-2 gap-3 my-5">
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

              <div className="space-y-2.5">
                {isAllDayCompleted && (
                  dayPlan.dayNumber < 30 ? (
                    <button
                      type="button"
                      onClick={() => onSelectNextDay(dayPlan.dayNumber + 1)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-pink-500 hover:brightness-110 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 min-h-[50px]"
                    >
                      <span>Học Tiếp Ngày {dayPlan.dayNumber + 1}</span>
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
                )}

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs cursor-pointer transition-colors duration-200 min-h-[44px]"
                >
                  Quay Về Lịch 30 Ngày {monthLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
