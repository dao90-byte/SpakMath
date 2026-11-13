import React, { useState, useEffect } from 'react';
import {
  InMonthDayPlan,
  IN_MONTH_STAGES_META,
  InMonthStageId,
} from '../../data/inMonthNovemberData';
import { InMonthVisualModels } from './InMonthVisualModels';
import { sound } from '../../utils/soundEffects';
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
} from 'lucide-react';

interface InMonthDailyRunnerProps {
  dayPlan: InMonthDayPlan;
  onBack: () => void;
  onCompleteDay: (dayNumber: number, score: number, totalQuestions: number, elapsedSeconds: number) => void;
  onSelectNextDay: (nextDayNumber: number) => void;
  onOpenExam: () => void;
  onOpenScratchpad: () => void;
}

export const InMonthDailyRunner: React.FC<InMonthDailyRunnerProps> = ({
  dayPlan,
  onBack,
  onCompleteDay,
  onSelectNextDay,
  onOpenExam,
  onOpenScratchpad,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [solvedMap, setSolvedMap] = useState<Record<string, boolean>>({});
  const [wrongAttemptsMap, setWrongAttemptsMap] = useState<Record<string, number>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const questions = dayPlan.questions;
  const currentQ = questions[currentIdx];

  useEffect(() => {
    setCurrentIdx(0);
    setAnswers({});
    setSolvedMap({});
    setWrongAttemptsMap({});
    setElapsedSeconds(0);
    setIsPaused(false);
    setShowCelebration(false);
  }, [dayPlan.dayNumber]);

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

  const currentAnswer = answers[currentQ.id] || '';
  const isSolved = !!solvedMap[currentQ.id];
  const wrongAttempts = wrongAttemptsMap[currentQ.id] || 0;
  const shouldShowHint = !isSolved && wrongAttempts >= 4;

  const handleSelectOption = (opt: string) => {
    if (isSolved) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleCheckAnswer = () => {
    if (!currentAnswer.trim() || isSolved) return;

    const isRight = currentAnswer.trim() === currentQ.correctAnswer.trim();

    if (isRight) {
      sound.playCorrect();
      const nextSolved = { ...solvedMap, [currentQ.id]: true };
      setSolvedMap(nextSolved);

      if (Object.keys(nextSolved).length === questions.length) {
        onCompleteDay(dayPlan.dayNumber, questions.length, questions.length, elapsedSeconds);
      }
    } else {
      // Do NOT show wrong alert or solution steps; silently increment wrong attempts & reset selection
      setWrongAttemptsMap((prev) => ({
        ...prev,
        [currentQ.id]: (prev[currentQ.id] || 0) + 1,
      }));
      setAnswers((prev) => ({ ...prev, [currentQ.id]: '' }));
    }
  };

  const stageQuestions = (stageId: InMonthStageId) =>
    questions.filter((q) => q.stage === stageId);

  const isStageDone = (stageId: InMonthStageId) => {
    const sq = stageQuestions(stageId);
    return sq.length > 0 && sq.every((q) => solvedMap[q.id]);
  };

  const jumpToStage = (stageId: InMonthStageId) => {
    const firstIdx = questions.findIndex((q) => q.stage === stageId);
    if (firstIdx !== -1) {
      setCurrentIdx(firstIdx);
    }
  };

  const solvedCount = Object.keys(solvedMap).length;
  const currentStageMeta = IN_MONTH_STAGES_META.find((s) => s.id === currentQ.stage);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1026] via-[#141B41] to-[#1E164B] text-white pb-16">
      {/* Top Cosmic Navigation Bar */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-[#0B1026]/90 border-b border-indigo-500/30 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 border border-white/15 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Lịch Tháng 11</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider">
                  Ngày {dayPlan.dayNumber}/30
                </span>
                <span className="text-xs text-indigo-200 font-semibold">
                  {dayPlan.planetIcon} {dayPlan.topicTag} • {dayPlan.subtitle}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-white">
                {dayPlan.title}
              </h2>
            </div>
          </div>

          {/* 30-Minute Session Timer & Scratchpad trigger */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-indigo-950/90 border border-indigo-400/40">
              <Clock className="w-4 h-4 text-cyan-300" />
              <div className="text-xs">
                <span className="text-indigo-200 mr-1.5">Thời lượng:</span>
                <span className="font-black text-cyan-300 tabular-nums">
                  {formatTime(elapsedSeconds)}
                </span>
                <span className="text-indigo-300/80 tabular-nums"> / 30:00</span>
              </div>
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title={isPaused ? 'Tiếp tục' : 'Tạm dừng'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenScratchpad}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <PenTool className="w-4 h-4" />
              <span>Bảng Vẽ Nháp</span>
            </button>
          </div>
        </div>

        {/* 4-Stage Stepper Bar */}
        <div className="max-w-7xl mx-auto mt-3 pt-2.5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {IN_MONTH_STAGES_META.map((stage) => {
            const isActive = currentQ.stage === stage.id;
            const done = isStageDone(stage.id);
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => jumpToStage(stage.id)}
                className={`px-3 py-2 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 border-amber-300 shadow-md'
                    : done
                    ? 'bg-emerald-950/60 border-emerald-400/50 text-emerald-200'
                    : 'bg-white/5 border-white/10 text-indigo-200 hover:bg-white/10'
                }`}
              >
                <div>
                  <div className="text-xs font-black text-white flex items-center gap-1.5">
                    <span>{stage.shortTitle}</span>
                  </div>
                  <div className="text-[11px] text-indigo-200/90 tabular-nums">
                    {stage.durationLabel}
                  </div>
                </div>
                {done && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Number Pills Strip */}
      <div className="max-w-7xl mx-auto px-4 mt-5">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-2xl p-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {questions.map((q, idx) => {
              const qSolved = !!solvedMap[q.id];
              const isCurr = idx === currentIdx;
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-9 h-9 rounded-xl font-black text-xs transition-all flex items-center justify-center cursor-pointer tabular-nums ${
                    isCurr
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-white scale-105'
                      : qSolved
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-indigo-100 hover:bg-white/20'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 tabular-nums">
              Đã hoàn thành: {solvedCount}/{questions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Interactive Sandbox */}
      <div className="max-w-7xl mx-auto px-4 mt-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Interactive Visual Model & Hint ONLY after 4 wrong attempts */}
        <div className="lg:col-span-7 space-y-4">
          <InMonthVisualModels model={currentQ.visualModel} isAnswered={isSolved} />

          {/* Hint appears ONLY after 4 wrong attempts */}
          {shouldShowHint && (
            <div className="bg-amber-950/70 border-2 border-amber-400/60 rounded-2xl p-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-5 h-5 text-amber-300" />
                <span className="text-sm font-black text-amber-200">
                  Gợi ý
                </span>
              </div>
              <p className="text-sm text-amber-100 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
                💡 {currentQ.hint}
              </p>
            </div>
          )}
        </div>

        {/* Right Zone: Question Prompt, Options & Correct-Only Feedback */}
        <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 shadow-xl border-2 border-indigo-200">
          <div className="flex items-center justify-between mb-3">
            <span className="px-3 py-1 rounded-lg bg-indigo-100 text-indigo-800 font-black text-xs uppercase tracking-wider">
              Câu {currentIdx + 1} / {questions.length} • {currentStageMeta?.shortTitle}
            </span>
          </div>

          <p className="text-base sm:text-lg font-extrabold text-slate-900 leading-relaxed mb-5">
            {currentQ.prompt}
          </p>

          {/* 4 Multiple Choice Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = currentAnswer.trim() === opt.trim();
              const isRightOption = isSolved && opt.trim() === currentQ.correctAnswer.trim();

              return (
                <button
                  key={oIdx}
                  type="button"
                  disabled={isSolved}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-3.5 rounded-2xl border-2 font-black text-left transition-all flex items-center justify-between cursor-pointer tabular-nums ${
                    isRightOption
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                      : isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40'
                  }`}
                >
                  <span className="text-sm">
                    {String.fromCharCode(65 + oIdx)}. {opt}
                  </span>
                  {isRightOption && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Check Action or Correct-Only Notification */}
          {!isSolved ? (
            <button
              type="button"
              disabled={!currentAnswer.trim()}
              onClick={handleCheckAnswer}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-40 text-white font-black text-sm shadow-lg transition-all cursor-pointer mb-4"
            >
              Kiểm Tra Đáp Án
            </button>
          ) : (
            <div className="p-4 rounded-2xl border-2 bg-emerald-50 border-emerald-300 text-emerald-950 mb-4">
              <div className="flex items-center gap-2 font-black text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Chính xác tuyệt vời! Đáp án là: {currentQ.correctAnswer}</span>
              </div>
            </div>
          )}

          {/* Question Navigation */}
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            {currentIdx < questions.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentIdx((prev) => Math.min(questions.length - 1, prev + 1))}
                className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <span>Câu tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={solvedCount < questions.length}
                onClick={() => {
                  onCompleteDay(dayPlan.dayNumber, questions.length, questions.length, elapsedSeconds);
                  setShowCelebration(true);
                }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 disabled:opacity-40 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Trophy className="w-4 h-4" />
                <span>Hoàn Thành Ngày {dayPlan.dayNumber}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Completion Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border-4 border-amber-300 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-9 h-9" />
            </div>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-black text-xs uppercase">
              Chinh phục thành công Ngày {dayPlan.dayNumber}/30
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-2">
              {dayPlan.title}
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Hành tinh {dayPlan.planetIcon} đã được thắp sáng trên bản đồ Ngân Hà Tháng 11!
            </p>

            <div className="grid grid-cols-2 gap-3 my-5">
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="text-xs text-emerald-700 font-bold">Số câu hoàn thành</div>
                <div className="text-xl font-black text-emerald-900 tabular-nums">
                  {solvedCount} / {questions.length}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-indigo-50 border border-indigo-200">
                <div className="text-xs text-indigo-700 font-bold">Thời gian học</div>
                <div className="text-xl font-black text-indigo-900 tabular-nums">
                  {formatTime(elapsedSeconds)}
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {dayPlan.dayNumber < 30 ? (
                <button
                  type="button"
                  onClick={() => onSelectNextDay(dayPlan.dayNumber + 1)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Học Tiếp Ngày {dayPlan.dayNumber + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenExam}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Bước Vào Bài Kiểm Tra Cuối Tháng 11</span>
                </button>
              )}

              <button
                type="button"
                onClick={onBack}
                className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                Quay Về Lịch 30 Ngày Tháng 11
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
