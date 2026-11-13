import React, { useState, useEffect } from 'react';
import { ALL_LESSONS, LessonQuestion, LessonActivity, TOPICS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BookMarked,
  BookmarkCheck,
  Bug,
  Gem,
  Trophy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { setCurrentLessonContext, recordMistake } from '../utils/mistakeManager';
import { PictographViewer } from './activities/PictographViewer';
import { PictographBuilder } from './activities/PictographBuilder';
import { VolumeComparison } from './activities/VolumeComparison';
import { VolumeSlider } from './activities/VolumeSlider';
import { BarModelViewer } from './activities/BarModelViewer';
import { SudokuBoard } from './activities/SudokuBoard';
import { PixidokuBoard } from './activities/PixidokuBoard';
import { PatternAnimals } from './activities/PatternAnimals';
import { FlowerMaze } from './activities/FlowerMaze';
import { StarBattleBoard } from './activities/StarBattleBoard';
import { QueueCounter } from './activities/QueueCounter';
import { CornerCross } from './activities/CornerCross';
import { LogicSeatOrder } from './activities/LogicSeatOrder';
import { ItemOrdering } from './activities/ItemOrdering';
import { PatternMatrixViewer } from './activities/PatternMatrixViewer';
import { CircularMazeViewer } from './activities/CircularMazeViewer';
import { CattleFenceViewer } from './activities/CattleFenceViewer';
import { MatrixGrid2x2 } from './activities/MatrixGrid2x2';
import { NumberMatrixBoard } from './activities/NumberMatrixBoard';
import { SequencePatternBoard } from './activities/SequencePatternBoard';
import { BalanceScaleViewer } from './activities/BalanceScaleViewer';
import { SlitherlinkBoard } from './activities/SlitherlinkBoard';
import { TreasureVaultViewer } from './activities/TreasureVaultViewer';
import { CubeCounterViewer } from './activities/CubeCounterViewer';
import { GrandFinaleViewer } from './activities/GrandFinaleViewer';



interface LessonContainerProps {
  lesson: LessonQuestion;
  isCompleted: boolean;
  onLessonChange: (nextId: string) => void;
  onBackToMap: () => void;
  onOpenScratchpad: () => void;
  onOpenMistakes?: () => void;
  onOpenDevConsole?: (reportMode?: boolean) => void;
  onOpenPeriodicAssessment?: (assessmentId: string) => void;
  onOpenTeacherUnlock?: () => void;
  onLessonCompleted: (lessonId: string) => void;
}

const renderActivity = (activity: LessonActivity, onCompleted: () => void) => {
  switch (activity.type) {
    case 'pictographViewer':
      return (
        <PictographViewer
          keyNotice={activity.keyNotice}
          items={activity.items}
          subQuestions={activity.subQuestions}
          multiplier={activity.multiplier}
          onAllCompleted={onCompleted}
        />
      );
    case 'pictographBuilder':
      return (
        <PictographBuilder
          categories={activity.categories}
          multiplier={activity.multiplier}
          totalPeople={activity.totalPeople}
          onCompleted={onCompleted}
        />
      );
    case 'volumeComparison':
      return (
        <VolumeComparison
          bottles={activity.bottles}
          questions={activity.questions}
          onCompleted={onCompleted}
        />
      );
    case 'volumeSlider':
      return (
        <VolumeSlider
          bottles={activity.bottles}
          targetCondition={activity.targetCondition}
          onCompleted={onCompleted}
        />
      );
    case 'barModel':
      return (
        <BarModelViewer bars={activity.bars} questions={activity.questions} onCompleted={onCompleted} />
      );
    case 'sudoku':
      return (
        <SudokuBoard
          type={activity.sudokuType}
          symbols={activity.symbols}
          initialGrid={activity.initialGrid}
          solution={activity.solution}
          colorBlocks={activity.colorBlocks}
          sumLabels={activity.sumLabels}
          onCompleted={onCompleted}
        />
      );
    case 'pixidoku':
      return (
        <PixidokuBoard
          size={activity.size}
          animals={activity.animals}
          initialGrid={activity.initialGrid}
          solution={activity.solution}
          onCompleted={onCompleted}
        />
      );
    case 'patternAnimals':
      return (
        <PatternAnimals
          sequence={activity.sequence}
          choices={activity.choices}
          target1={activity.target1}
          target2={activity.target2}
          onCompleted={onCompleted}
        />
      );
    case 'flowerMaze':
      return (
        <FlowerMaze
          pattern={activity.pattern}
          grid={activity.grid}
          targetPath={activity.targetPath}
          startPos={activity.startPos}
          goalPos={activity.goalPos}
          startIcon={activity.startIcon}
          startLabel={activity.startLabel}
          goalIcon={activity.goalIcon}
          goalLabel={activity.goalLabel}
          ruleTitle={activity.ruleTitle}
          patternDisplay={activity.patternDisplay}
          successMessage={activity.successMessage}
          onCompleted={onCompleted}
        />
      );
    case 'starBattle':
      return (
        <StarBattleBoard
          size={activity.size}
          targetStarCount={activity.targetStarCount}
          regions={activity.regions}
          starsSolution={activity.starsSolution}
          onCompleted={onCompleted}
        />
      );
    case 'queueCounter':
      return (
        <QueueCounter
          mode={activity.mode}
          fromFront={activity.fromFront}
          fromBack={activity.fromBack}
          totalInQueue={activity.totalInQueue}
          personA={activity.personA}
          personB={activity.personB}
          correctTotal={activity.correctTotal}
          formula={activity.formula}
          options={activity.options}
          promptTitle={activity.promptTitle}
          onCompleted={onCompleted}
        />
      );
    case 'balanceScale':
      return (
        <BalanceScaleViewer
          title={activity.title}
          ruleExplanation={activity.ruleExplanation}
          scales={activity.scales}
          targetQuestion={activity.targetQuestion}
          onCompleted={onCompleted}
        />
      );
    case 'cornerCross':
      return (
        <CornerCross
          shape={activity.shape}
          verticalCount={activity.verticalCount}
          horizontalCount={activity.horizontalCount}
          intersectionPerson={activity.intersectionPerson}
          options={activity.options}
          correctAnswer={activity.correctAnswer}
          onCompleted={onCompleted}
        />
      );
    case 'logicSeatOrder':
      return (
        <LogicSeatOrder
          seatsCount={activity.seatsCount}
          correctOrder={activity.correctOrder}
          allowedCharacters={activity.allowedCharacters}
          onCompleted={onCompleted}
        />
      );
    case 'itemOrdering':
      return (
        <ItemOrdering
          promptText={activity.promptText}
          items={activity.items}
          correctOrder={activity.correctOrder}
          directionLabel={activity.directionLabel}
          onCompleted={onCompleted}
        />
      );
    case 'patternMatrix':
      return (
        <PatternMatrixViewer
          ruleDescription={activity.ruleDescription}
          steps={activity.steps}
          choices={activity.choices}
          correctChoiceId={activity.correctChoiceId}
          onCompleted={onCompleted}
        />
      );
    case 'circularMaze':
      return <CircularMazeViewer onCompleted={onCompleted} />;
    case 'cattleFence':
      return <CattleFenceViewer onCompleted={onCompleted} />;
    case 'matrix2x2':
      return (
        <MatrixGrid2x2
          title={activity.title}
          ruleExplanation={activity.ruleExplanation}
          sampleGrids={activity.sampleGrids}
          choices={activity.choices}
          correctChoiceId={activity.correctChoiceId}
          onCompleted={onCompleted}
        />
      );
    case 'numberMatrix':
      return (
        <NumberMatrixBoard
          title={activity.title}
          subtitle={activity.subtitle}
          targetSum={activity.targetSum}
          initialGrid={activity.initialGrid}
          solution={activity.solution}
          allowedNumbers={activity.allowedNumbers}
          hintFormula={activity.hintFormula}
          onCompleted={onCompleted}
        />
      );
    case 'sequencePattern':
      return (
        <SequencePatternBoard
          title={activity.title}
          ruleExplanation={activity.ruleExplanation}
          sequenceType={activity.sequenceType}
          items={activity.items}
          choices={activity.choices}
          correctChoiceId={activity.correctChoiceId}
          correctExplanation={activity.correctExplanation}
          onCompleted={onCompleted}
        />
      );
    case 'slitherlink':
      return (
        <SlitherlinkBoard
          rows={activity.rows}
          cols={activity.cols}
          clues={activity.clues}
          solutionEdges={activity.solutionEdges}
          onCompleted={onCompleted}
        />
      );
    case 'treasureVault':
      return (
        <TreasureVaultViewer
          title={activity.title}
          codeLength={activity.codeLength}
          solutionCode={activity.solutionCode}
          clues={activity.clues}
          onCompleted={onCompleted}
        />
      );
    case 'cubeCounter':
      return (
        <CubeCounterViewer
          title={activity.title}
          instructionText={activity.instructionText}
          gridHeights={activity.gridHeights}
          layers={activity.layers}
          totalCubes={activity.totalCubes}
          options={activity.options}
          explanation={activity.explanation}
          onCompleted={onCompleted}
        />
      );
    case 'grandFinale':
      return (
        <GrandFinaleViewer
          title={activity.title}
          roundQuestions={activity.roundQuestions}
          onCompleted={onCompleted}
        />
      );
  }
};

export const LessonContainer: React.FC<LessonContainerProps> = ({
  lesson,
  isCompleted,
  onLessonChange,
  onBackToMap,
  onOpenMistakes,
  onOpenDevConsole,
  onLessonCompleted
}) => {
  const [justFinishedId, setJustFinishedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sync lesson context for automatic mistake recording
  useEffect(() => {
    setCurrentLessonContext({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      topicName: lesson.topicName,
      topicId: lesson.topicId,
      mascotAvatar: lesson.mascot.avatar
    });
    setIsBookmarked(false);
  }, [lesson]);

  // Listen to mistake collection toasts
  useEffect(() => {
    const handleToast = (e: any) => {
      if (e.detail?.message) {
        setToastMessage(e.detail.message);
        setTimeout(() => setToastMessage(null), 4000);
      }
    };
    window.addEventListener('spark_math_mistake_toast', handleToast);
    return () => window.removeEventListener('spark_math_mistake_toast', handleToast);
  }, []);

  const handleBookmarkTricky = () => {
    sound.playStarCollect();
    recordMistake({
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      topicName: lesson.topicName,
      topicId: lesson.topicId,
      questionPrompt: `[${lesson.badgeTitle}] ${lesson.title}: ${lesson.instruction}`,
      userAnswer: 'Chủ động lưu để ôn luyện thêm',
      correctAnswer: 'Hoàn thành thử thách bài học này',
      explanation: `Bí kíp từ ${lesson.mascot.name}: ${lesson.mascot.message}`,
      category: 'concept',
      mascotAvatar: lesson.mascot.avatar,
      userNote: 'Bài tập tư duy cần xem lại'
    });
    setIsBookmarked(true);
  };

  const topic = TOPICS.find((t) => t.id === lesson.topicId);
  // Navigation scoped strictly within the current Station/Topic
  const stationLessons = ALL_LESSONS.filter((l) => l.topicId === lesson.topicId);
  const stationIndex = stationLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = stationIndex > 0 ? stationLessons[stationIndex - 1] : undefined;
  const nextLesson = stationIndex < stationLessons.length - 1 ? stationLessons[stationIndex + 1] : undefined;
  const isStationFinal = stationIndex === stationLessons.length - 1;
  const justFinished = justFinishedId === lesson.id;
  const isLessonFinished = isCompleted || justFinished;

  const handleCompleted = () => {
    setJustFinishedId(lesson.id);
    onLessonCompleted(lesson.id);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleNextClick = () => {
    if (nextLesson) {
      sound.playClick();
      onLessonChange(nextLesson.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      sound.playVictory();
      onBackToMap();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goTo = (id: string) => {
    sound.playClick();
    onLessonChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stationProgressPercent =
    stationLessons.length > 0
      ? Math.round(((stationIndex + 1) / stationLessons.length) * 100)
      : 0;

  return (
    <div className="space-y-4 sm:space-y-5 pb-28 relative">

      {/* Toast Notification for Mistake Collection */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B1232]/95 backdrop-blur-xl text-white px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(3,7,24,0.85)] flex items-center gap-3 text-xs md:text-sm font-bold border border-amber-400/50 animate-in fade-in slide-in-from-top-4">
          <span className="text-xl">📖</span>
          <span>{toastMessage}</span>
          {onOpenMistakes && (
            <button
              type="button"
              onClick={() => {
                setToastMessage(null);
                onOpenMistakes();
              }}
              className="ml-2 px-2.5 py-1 rounded-xl bg-amber-400 text-amber-950 font-black text-xs hover:bg-amber-300 transition-colors cursor-pointer"
            >
              Mở sổ
            </button>
          )}
        </div>
      )}

      {/* Top Cosmic Command Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-2xl bg-[#090F2D]/82 backdrop-blur-xl border border-cyan-300/20 px-3 py-2.5 shadow-[0_14px_36px_rgba(3,7,24,0.58)]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl bg-white/[0.07] border border-white/15 text-xs sm:text-sm font-bold text-slate-100 hover:bg-cyan-400/15 hover:border-cyan-300/45 transition-all cursor-pointer"
            title={`Quay về ${lesson.topicName}`}
          >
            <ArrowLeft className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
            <span className="truncate max-w-[160px] sm:max-w-none">Về {lesson.topicName || 'bản đồ'}</span>
          </button>

          {/* Quick previous button within station */}
          <button
            type="button"
            disabled={!prevLesson}
            onClick={() => prevLesson && goTo(prevLesson.id)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-white/[0.06] border border-white/15 text-xs font-bold text-slate-200 hover:bg-white/[0.12] hover:border-cyan-300/35 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            title="Bài trước trong trạm"
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Trước</span>
          </button>

          {/* Quick next button at top */}
          {nextLesson ? (
            <button
              type="button"
              onClick={handleNextClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-black transition-all active:scale-95 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 hover:brightness-105 text-slate-950 ring-1 ring-amber-200/70 shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer"
              title="Chuyển sang bài tiếp theo trong trạm"
            >
              <span>Tiếp</span>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBackToMap}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-black bg-emerald-400/20 border border-emerald-300/45 text-emerald-200 hover:bg-emerald-400/30 transition-colors cursor-pointer"
              title="Đã là bài cuối cùng trong trạm này"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              <span>Trạm hoàn tất</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Collect Mistake / Bookmark button */}
          <button
            type="button"
            onClick={handleBookmarkTricky}
            className={`inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer ${
              isBookmarked
                ? 'bg-emerald-400/20 border border-emerald-300/45 text-emerald-200'
                : 'bg-rose-500/15 border border-rose-400/35 text-rose-200 hover:bg-rose-500/25'
            }`}
            title="Lưu thử thách này vào Sổ Thu Thập Lỗi để tự ôn luyện"
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-300 shrink-0" aria-hidden="true" />
                <span className="hidden xs:inline">Đã thu thập!</span>
              </>
            ) : (
              <>
                <BookMarked className="w-4 h-4 text-rose-300 shrink-0" aria-hidden="true" />
                <span className="hidden xs:inline">Thu thập câu khó</span>
              </>
            )}
          </button>

          {/* Report Exercise Issue button */}
          {onOpenDevConsole && (
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenDevConsole(true);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-white/[0.06] border border-white/15 text-xs sm:text-sm font-bold text-slate-200 hover:bg-rose-500/15 hover:text-rose-200 hover:border-rose-400/40 transition-colors cursor-pointer"
              title="Báo lỗi bài tập này: Lỗi logic, hiển thị, tương tác hoặc lỗi lập trình"
            >
              <Bug className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              <span className="hidden sm:inline">Báo lỗi bài này</span>
            </button>
          )}
        </div>
      </div>

      {/* Flagship Lesson Cosmic Observatory Header */}
      <div className="relative overflow-hidden rounded-[26px] sm:rounded-[30px] p-5 sm:p-6 md:p-7 text-white bg-[radial-gradient(ellipse_at_top_right,_rgba(56,189,248,0.22),_transparent_50%),radial-gradient(ellipse_at_bottom_left,_rgba(168,85,247,0.20),_transparent_52%),linear-gradient(155deg,_#080E2B_0%,_#11194A_58%,_#1B1348_100%)] border border-cyan-300/25 shadow-[0_24px_64px_rgba(3,7,24,0.78),inset_0_1px_0_rgba(255,255,255,0.16)]">
        {/* Top aurora spectrum bar */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${
            topic?.bgGradient ?? 'from-cyan-400 via-indigo-400 to-amber-300'
          } opacity-90`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -right-14 -top-14 w-64 h-64 rounded-full bg-gradient-to-br ${
            topic?.bgGradient ?? 'from-cyan-500 to-indigo-600'
          } opacity-20 blur-3xl`}
        />

        {/* Orbital astrolabe decorative emblem */}
        <div className="pointer-events-none absolute right-5 top-4 opacity-35 hidden sm:block" aria-hidden="true">
          <svg width="112" height="112" viewBox="0 0 112 112" fill="none">
            <circle cx="56" cy="56" r="44" stroke="url(#lessonOrbRing)" strokeWidth="1.2" strokeDasharray="5 5" />
            <ellipse cx="56" cy="56" rx="50" ry="18" transform="rotate(-22 56 56)" stroke="rgba(251,191,36,0.45)" strokeWidth="1" />
            <circle cx="56" cy="56" r="24" stroke="rgba(103,232,249,0.5)" strokeWidth="1.1" />
            <circle cx="88" cy="24" r="3" fill="#67e8f9" />
            <circle cx="22" cy="82" r="2.5" fill="#fde047" />
            <circle cx="56" cy="56" r="5" fill="rgba(253,224,71,0.7)" />
            <defs>
              <linearGradient id="lessonOrbRing" x1="12" y1="12" x2="100" y2="100">
                <stop stopColor="#67e8f9" />
                <stop offset="0.5" stopColor="#a78bfa" />
                <stop offset="1" stopColor="#fde047" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-black uppercase tracking-wider">
            <span className="bg-cyan-400/15 border border-cyan-300/35 text-cyan-200 px-3 py-1 rounded-xl shadow-[0_0_16px_rgba(34,211,238,0.14)]">
              {lesson.topicName}
            </span>
            <span className="bg-white/[0.08] border border-white/15 text-slate-100 px-3 py-1 rounded-xl">
              {lesson.badgeTitle}
            </span>
            {isLessonFinished && (
              <span className="bg-gradient-to-r from-emerald-400/25 to-cyan-400/20 border border-emerald-300/50 text-emerald-200 px-3 py-1 rounded-xl flex items-center gap-1.5 font-black shadow-[0_0_16px_rgba(16,185,129,0.2)]">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-300" aria-hidden="true" />
                <span>Đã hoàn thành</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2.5 bg-[#070B22]/75 border border-cyan-300/25 rounded-xl px-3 py-1.5">
            <span className="text-xs font-black text-amber-200 tabular-nums">
              Bài {stationIndex + 1} / {stationLessons.length}
            </span>
            <div className="w-16 h-1.5 rounded-full bg-slate-900 border border-white/10 overflow-hidden hidden xs:block">
              <div
                style={{ width: `${stationProgressPercent}%` }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-orange-400 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <h1 className="relative z-10 mt-3.5 text-xl sm:text-2xl md:text-3xl font-black font-display tracking-tight bg-gradient-to-r from-amber-200 via-white to-cyan-200 bg-clip-text text-transparent leading-snug max-w-4xl drop-shadow-[0_2px_18px_rgba(34,211,238,0.22)]">
          {lesson.title}
        </h1>
      </div>

      {/* Activity Workspace (keyed so state resets between lessons) - Deep Cosmic Observatory Console */}
      <div
        key={lesson.id}
        className="rounded-[28px] sm:rounded-[32px] p-[2px] bg-gradient-to-br from-cyan-300/70 via-indigo-400/50 to-amber-300/65 shadow-[0_30px_84px_rgba(3,7,24,0.88),0_0_44px_rgba(34,211,238,0.12)]"
      >
        <div className="cosmic-activity-stage relative overflow-hidden rounded-[26px] sm:rounded-[30px] bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.17),_transparent_48%),radial-gradient(ellipse_at_bottom_right,_rgba(251,191,36,0.13),_transparent_48%),radial-gradient(ellipse_at_50%_0%,_rgba(129,140,248,0.14),_transparent_62%),linear-gradient(160deg,_#060B24_0%,_#0D1540_52%,_#171142_100%)] p-3.5 sm:p-6 md:p-8 text-slate-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
          {/* Top luminous hairline beam */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-8 h-[2px] rounded-full bg-gradient-to-r from-cyan-300 via-amber-300 to-fuchsia-400 opacity-85 shadow-[0_0_16px_rgba(34,211,238,0.7)]"
          />

          {/* Subtle cosmic orbital grid & starfield backdrop */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-55" aria-hidden="true">
            <svg viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
              <circle cx="1060" cy="110" r="190" fill="none" stroke="rgba(103,232,249,0.11)" strokeWidth="1" strokeDasharray="6 10" />
              <circle cx="1060" cy="110" r="270" fill="none" stroke="rgba(251,191,36,0.08)" strokeWidth="1" />
              <circle cx="130" cy="610" r="210" fill="none" stroke="rgba(168,85,247,0.11)" strokeWidth="1" strokeDasharray="4 9" />
              <circle cx="140" cy="90" r="1.6" fill="#67E8F9" />
              <circle cx="380" cy="52" r="1.4" fill="#FDE68A" />
              <circle cx="720" cy="70" r="1.5" fill="#FFFFFF" />
              <circle cx="960" cy="180" r="1.8" fill="#67E8F9" />
              <circle cx="1120" cy="430" r="1.5" fill="#F9A8D4" />
              <circle cx="240" cy="520" r="1.6" fill="#FDE68A" />
              <circle cx="640" cy="660" r="1.4" fill="#67E8F9" />
            </svg>
          </div>

          {/* Observatory Stage Top HUD Strip */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-white/12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-400/12 border border-cyan-300/30 text-[11px] sm:text-xs font-black uppercase tracking-wider text-cyan-200 shadow-[0_0_16px_rgba(34,211,238,0.12)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" aria-hidden="true" />
              <span>Trạm Thử Thách Tương Tác</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#070B22]/80 border border-amber-300/30 text-[11px] sm:text-xs font-extrabold text-amber-200">
              <Gem className="w-3.5 h-3.5 text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.85)] shrink-0" aria-hidden="true" />
              <span>Thưởng: +3 Tinh thể</span>
            </div>
          </div>

          {/* Interactive Activity Content */}
          <div className="relative z-10">
            {renderActivity(lesson.activity, handleCompleted)}
          </div>
        </div>
      </div>

      {/* Immediate In-Situ Completion Card: Visible right below activity without scrolling */}
      {(justFinished || isCompleted) && (
        <div className="relative overflow-hidden bg-[radial-gradient(ellipse_at_left,_rgba(52,211,153,0.28),_transparent_55%),linear-gradient(135deg,_rgba(6,78,59,0.88),_rgba(14,116,144,0.86))] border border-emerald-300/50 rounded-3xl p-5 md:p-6 text-white shadow-[0_20px_50px_rgba(16,185,129,0.28)] backdrop-blur-xl flex items-center gap-4 transition-all animate-fade-in">
          <div className="w-14 h-14 rounded-2xl bg-cyan-300/20 border border-cyan-200/45 flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(34,211,238,0.3)]">
            <Gem className="w-8 h-8 text-cyan-200 drop-shadow-[0_0_10px_rgba(34,211,238,0.85)]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-base sm:text-lg md:text-xl font-black flex items-center gap-2 text-emerald-100">
              <span>Xuất sắc! Thử thách đã hoàn thành!</span>
            </p>
            <p className="text-xs md:text-sm text-cyan-50/90 font-medium mt-0.5">
              Bạn đã nhận được thêm 3 tinh thể thông thái! Hãy bấm nút &quot;Bài tiếp theo&quot; ở thanh điều hướng bên dưới để tiếp tục hành trình.
            </p>
          </div>
        </div>
      )}

      {/* Sticky Bottom Floating Dock: Always visible on screen so you never need to scroll */}
      <aside aria-label="Thanh điều hướng nhanh bài học" className="fixed bottom-0 left-0 right-0 z-30 bg-[#060A1E]/94 backdrop-blur-2xl border-t border-cyan-300/25 px-3 sm:px-4 py-2.5 shadow-[0_-12px_40px_rgba(3,7,24,0.85)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
        />
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onBackToMap();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded-xl bg-white/[0.08] hover:bg-cyan-400/20 border border-white/15 hover:border-cyan-300/45 text-xs font-bold text-slate-100 transition-colors cursor-pointer"
              title={`Quay về ${lesson.topicName}`}
            >
              <ArrowLeft className="w-3.5 h-3.5 text-cyan-300 shrink-0" aria-hidden="true" />
              <span className="hidden xs:inline truncate max-w-[120px] sm:max-w-none">Về {lesson.topicName || 'bản đồ'}</span>
            </button>
            <button
              type="button"
              disabled={!prevLesson}
              onClick={() => prevLesson && goTo(prevLesson.id)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 min-h-[40px] rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-xs font-bold text-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Bài trước trong trạm"
            >
              <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Bài trước</span>
            </button>
          </div>

          {/* Center progress pill */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200 truncate max-w-[155px] sm:max-w-xs md:max-w-md">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isLessonFinished ? 'bg-amber-400 animate-ping' : 'bg-cyan-400/80'}`} />
            <span className="truncate hidden sm:inline">{lesson.title}</span>
            <span className="text-amber-200 font-extrabold bg-amber-400/20 border border-amber-300/35 px-2.5 py-0.5 rounded-xl shrink-0 text-[11px] tabular-nums">
              Bài {stationIndex + 1}/{stationLessons.length}
            </span>
          </div>

          {/* Right immediate next button */}
          <div className="flex items-center gap-2 shrink-0">
            {nextLesson ? (
              <button
                type="button"
                onClick={handleNextClick}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 min-h-[42px] rounded-2xl text-xs sm:text-sm font-black shadow-[0_0_24px_rgba(251,191,36,0.38)] transition-all active:scale-95 bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 text-slate-950 ring-2 ring-amber-300/50 cursor-pointer hover:brightness-105"
                title="Chuyển sang bài tiếp theo trong trạm"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950 fill-slate-950 shrink-0" aria-hidden="true" />
                <span>Bài tiếp theo</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToMap}
                className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2.5 min-h-[42px] rounded-2xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-105 text-slate-950 shadow-[0_0_24px_rgba(52,211,153,0.35)] active:scale-95 transition-all cursor-pointer"
                title="Bé đã hoàn thành xuất sắc tất cả bài tập trong trạm này!"
              >
                <Trophy className="w-4 h-4 text-slate-950 shrink-0" aria-hidden="true" />
                <span>Hoàn thành Trạm!</span>
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};
