import React, { useState, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  InMonthDayPlan,
  IN_MONTH_STAGES_META,
  InMonthStageId,
} from '../../data/inMonthNovemberData';
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
  PenTool,
  Trophy,
  Pause,
  Play,
  Globe,
  Star,
  PartyPopper,
} from 'lucide-react';

interface InMonthDailyRunnerProps {
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

const getStorageKey = (dayNumber: number) =>
  `spark_math_inmonth_nov_day_progress_${dayNumber}`;

function loadSavedDayState(dayNumber: number, totalQuestions: number): SavedDayState {
  try {
    const raw = localStorage.getItem(getStorageKey(dayNumber));
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
  dayPlan,
  onBack,
  onCompleteDay,
  onSelectNextDay,
  onOpenExam,
  onOpenScratchpad,
}) => {
  const questions = dayPlan.questions;

  const [currentIdx, setCurrentIdx] = useState<number>(() =>
    loadSavedDayState(dayPlan.dayNumber, questions.length).currentIdx
  );
  const [answers, setAnswers] = useState<Record<string, string>>(() =>
    loadSavedDayState(dayPlan.dayNumber, questions.length).answers
  );
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>(() =>
    loadSavedDayState(dayPlan.dayNumber, questions.length).solvedMap
  );
  const [wrongAttemptsMap, setWrongAttemptsMap] = useState<Record<string, number>>(() =>
    loadSavedDayState(dayPlan.dayNumber, questions.length).wrongAttemptsMap
  );
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(() =>
    loadSavedDayState(dayPlan.dayNumber, questions.length).elapsedSeconds
  );
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const answerInputRef = useRef<HTMLInputElement>(null);

  // Hydrate saved state when switching days
  useEffect(() => {
    const saved = loadSavedDayState(dayPlan.dayNumber, dayPlan.questions.length);
    setCurrentIdx(saved.currentIdx);
    setAnswers(saved.answers);
    setSolvedMap(saved.solvedMap);
    setWrongAttemptsMap(saved.wrongAttemptsMap);
    setElapsedSeconds(saved.elapsedSeconds);
    setIsPaused(false);
    setShowCelebration(false);
  }, [dayPlan.dayNumber, dayPlan.questions.length]);

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
      localStorage.setItem(getStorageKey(dayPlan.dayNumber), JSON.stringify(payload));
    } catch {
      // Ignore storage write errors
    }
  }, [dayPlan.dayNumber, currentIdx, answers, solvedMap, wrongAttemptsMap, elapsedSeconds]);

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

  const currentStageMeta = IN_MONTH_STAGES_META.find((s) => s.id === currentQ.stage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1026] via-[#131B42] to-[#1D1548] text-white pb-16 relative overflow-hidden">
      {/* Bright Cosmic Ambient Nebula Layers */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
        <div className="absolute -top-24 left-1/4 w-[420px] h-[420px] rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute top-1/3 -right-24 w-[380px] h-[380px] rounded-full bg-pink-500/15 blur-[130px]" />
        <div className="absolute bottom-0 left-1/3 w-[440px] h-[440px] rounded-full bg-amber-400/10 blur-[140px]" />
      </div>

      {/* Top Cosmic Navigation Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-[#0B1026]/90 border-b border-indigo-400/25 px-4 py-3 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 transition-all duration-200 cursor-pointer min-h-[44px]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Lịch Tháng 11</span>
            </button>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                  Ngày {dayPlan.dayNumber}/30
                </span>
                <span className="text-xs text-cyan-200 font-bold inline-flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                  <span>{dayPlan.topicTag}</span>
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-extrabold font-display text-white mt-0.5">
                {dayPlan.title}
              </h2>
            </div>
          </div>

          {/* 30-Minute Session Timer & Scratchpad trigger */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl cosmic-glass min-h-[44px]">
              <Clock className="w-4 h-4 text-cyan-300" aria-hidden="true" />
              <div className="text-xs">
                <span className="font-black text-cyan-300 tabular-nums">
                  {formatTime(elapsedSeconds)}
                </span>
                <span className="text-indigo-200/80 tabular-nums"> / 30:00</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                aria-label={isPaused ? 'Tiếp tục đồng hồ' : 'Tạm dừng đồng hồ'}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 cursor-pointer flex items-center justify-center"
                title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              >
                {isPaused ? (
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                ) : (
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenScratchpad}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all duration-200 active:scale-95 cursor-pointer min-h-[44px]"
            >
              <PenTool className="w-4 h-4" aria-hidden="true" />
              <span>Bảng Nháp</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Stepper Bar */}
        <div className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
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
                className={`px-3.5 py-2.5 rounded-xl border text-left transition-all duration-200 flex items-center justify-between min-h-[46px] ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 border-amber-300 shadow-md cursor-pointer'
                    : done
                    ? 'bg-emerald-500/20 border-emerald-400/50 text-emerald-200 cursor-pointer'
                    : unlocked
                    ? 'bg-white/10 border-white/15 text-indigo-100 hover:bg-white/20 cursor-pointer'
                    : 'bg-white/5 border-white/10 text-indigo-300/60 opacity-60 cursor-not-allowed'
                }`}
              >
                <div>
                  <div className="text-xs font-black text-white">{stage.shortTitle}</div>
                  <div className="text-[11px] text-indigo-200/90 tabular-nums">
                    {stage.durationLabel}
                  </div>
                </div>
                {done && <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Number Pills Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 cosmic-glass rounded-2xl p-3">
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
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-white shadow-md cursor-pointer'
                      : qSolved
                      ? 'bg-emerald-500 text-white shadow-sm cursor-pointer'
                      : canJump
                      ? 'bg-white/15 text-white hover:bg-white/25 cursor-pointer'
                      : 'bg-white/5 text-indigo-300/50 cursor-not-allowed'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5 text-xs font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 tabular-nums">
              Hoàn thành: {solvedCount}/{questions.length}
            </span>
            {isAllDayCompleted && (
              <button
                type="button"
                onClick={triggerDayVictory}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <PartyPopper className="w-4 h-4" aria-hidden="true" />
                <span>Xem Chúc Mừng</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Two-Zone Interactive Cosmic Sandbox */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Luminous Cosmic CPA Visual Model & Hint ONLY after 4 wrong attempts */}
        <div className="lg:col-span-7 space-y-4">
          <InMonthVisualModels model={currentQ.visualModel} isAnswered={isSolved} />

          {/* Hint appears ONLY after 4 wrong attempts */}
          {shouldShowHint && (
            <div className="bg-amber-500/15 backdrop-blur-xl border-2 border-amber-400/70 rounded-3xl p-5 shadow-lg animate-fade-in">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-300" aria-hidden="true" />
                <span className="text-sm font-extrabold font-display text-amber-200">
                  Gợi ý
                </span>
              </div>
              <p className="text-sm text-amber-50 leading-relaxed bg-slate-900/60 p-3.5 rounded-2xl border border-amber-300/25">
                {currentQ.hint}
              </p>
            </div>
          )}
        </div>

        {/* Right Zone: Cohesive Cosmic Glass Question Card */}
        <div className="lg:col-span-5 bg-[#111942]/90 backdrop-blur-xl text-white rounded-3xl p-6 shadow-[0_18px_42px_rgba(6,10,32,0.55)] border-2 border-indigo-400/35">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/35 to-purple-500/35 border border-indigo-300/40 text-cyan-200 font-black text-xs uppercase tracking-wider">
              Câu {currentIdx + 1} / {questions.length} • {currentStageMeta?.shortTitle}
            </span>
            {isSolved && (
              <span className="px-3 py-1 rounded-xl bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-black text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Đã hoàn thành</span>
              </span>
            )}
          </div>

          <p className="text-base sm:text-lg font-extrabold text-white leading-relaxed mb-6">
            {currentQ.prompt}
          </p>

          {/* Answer Input (for Calculation questions) or Choice Cards (for non-calculation questions) */}
          {inputSpec.mode === 'choice' ? (
            <div role="group" aria-label="Các lựa chọn đáp án" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
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
                    className={`p-4 rounded-2xl border-2 font-black text-left transition-all duration-200 flex items-center justify-between cursor-pointer tabular-nums min-h-[56px] active:scale-[0.98] ${
                      isRightOption
                        ? 'bg-emerald-500/25 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                        : isSelected
                        ? 'bg-gradient-to-r from-amber-400 to-orange-400 border-amber-200 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.4)]'
                        : 'bg-slate-900/75 border-indigo-400/25 text-white hover:border-cyan-300/70 hover:bg-indigo-900/50'
                    }`}
                  >
                    <span className="text-sm">
                      {String.fromCharCode(65 + oIdx)}. {opt}
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
                <div className="mb-5 p-4 rounded-2xl bg-indigo-950/70 border border-indigo-400/30 space-y-3">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-cyan-200">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border-2 border-indigo-400/40 focus:border-cyan-300 focus:outline-none text-white font-black text-lg tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm disabled:opacity-70"
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border-2 border-indigo-400/40 focus:border-cyan-300 focus:outline-none text-white font-black text-lg tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm disabled:opacity-70"
                      />
                    </div>
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="mb-5 p-4 rounded-2xl bg-indigo-950/70 border border-indigo-400/30 space-y-2.5">
              <label htmlFor={`q-ans-${currentQ.id}`} className="block text-xs font-extrabold uppercase tracking-wider text-cyan-200">
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
                  className="flex-1 min-w-0 px-4 py-3.5 rounded-xl bg-slate-900/90 border-2 border-indigo-400/40 focus:border-cyan-300 focus:outline-none text-white font-black text-lg tabular-nums placeholder:text-indigo-400/60 placeholder:text-sm disabled:opacity-70"
                />
                {inputSpec.unitLabel && (
                  <span className="px-3.5 py-3.5 rounded-xl bg-indigo-900/80 border border-indigo-400/30 text-cyan-200 font-black text-sm shrink-0">
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
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 disabled:opacity-40 text-slate-950 font-black text-sm shadow-[0_8px_24px_rgba(34,211,238,0.35)] transition-all duration-200 active:scale-[0.98] cursor-pointer mb-4 min-h-[50px]"
            >
              Kiểm Tra Đáp Án
            </button>
          ) : (
            <div className="p-4 rounded-2xl border-2 bg-emerald-500/20 border-emerald-400/70 text-emerald-100 mb-4 animate-fade-in">
              <div className="flex items-center gap-2 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" aria-hidden="true" />
                <span>Chính xác tuyệt vời! Đáp án là: {currentQ.correctAnswer}</span>
              </div>
            </div>
          )}

          {/* Question Navigation: Next button ONLY visible when current question is solved */}
          <div className="flex items-center justify-between gap-3">
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
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-all duration-200 min-h-[46px] animate-fade-in"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {isAllDayCompleted && currentIdx === questions.length - 1 && (
              <button
                type="button"
                onClick={triggerDayVictory}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 hover:brightness-110 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-lg cursor-pointer transition-all duration-200 min-h-[46px] animate-fade-in"
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

              <div className="flex items-center justify-center gap-1.5 mb-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-300" aria-hidden="true" />
                <Star className="w-6 h-6 fill-amber-400 text-amber-300" aria-hidden="true" />
                <Star className="w-5 h-5 fill-amber-400 text-amber-300" aria-hidden="true" />
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
                      <span>Kiểm Tra Cuối Tháng 11</span>
                    </button>
                  )
                )}

                <button
                  type="button"
                  onClick={onBack}
                  className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs cursor-pointer transition-colors duration-200 min-h-[44px]"
                >
                  Quay Về Lịch 30 Ngày Tháng 11
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
