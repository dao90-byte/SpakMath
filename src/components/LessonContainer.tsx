import React, { useState } from 'react';
import { ALL_LESSONS, LessonQuestion, LessonActivity, TOPICS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { ArrowLeft, ArrowRight, Pencil, CheckCircle, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
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
  onOpenScratchpad,
  onLessonCompleted
}) => {
  const [justFinishedId, setJustFinishedId] = useState<string | null>(null);

  const topic = TOPICS.find((t) => t.id === lesson.topicId);
  const lessonIndex = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? ALL_LESSONS[lessonIndex - 1] : undefined;
  const nextLesson = lessonIndex < ALL_LESSONS.length - 1 ? ALL_LESSONS[lessonIndex + 1] : undefined;
  const justFinished = justFinishedId === lesson.id;

  const handleCompleted = () => {
    setJustFinishedId(lesson.id);
    onLessonCompleted(lesson.id);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const goTo = (id: string) => {
    sound.playClick();
    onLessonChange(id);
  };

  return (
    <div className="space-y-6 pb-28">
      {/* Top actions bar with immediate navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onBackToMap();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Về bản đồ
          </button>

          {/* Quick previous button */}
          <button
            type="button"
            disabled={!prevLesson}
            onClick={() => prevLesson && goTo(prevLesson.id)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white border-2 border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs transition-colors"
            title="Bài trước"
          >
            <ChevronLeft className="w-4 h-4" /> Trước
          </button>

          {/* Quick next button at top */}
          {nextLesson && (
            <button
              type="button"
              onClick={() => goTo(nextLesson.id)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-xs transition-all active:scale-95 ${
                isCompleted || justFinished
                  ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 font-black ring-2 ring-amber-300'
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              title="Bài tiếp theo"
            >
              Tiếp <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenScratchpad();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 border-2 border-amber-300 text-sm font-bold text-amber-900 hover:bg-amber-200 shadow-xs transition-colors"
        >
          <Pencil className="w-4 h-4" /> Giấy nháp
        </button>
      </div>

      {/* Lesson header */}
      <div
        className={`rounded-3xl p-6 md:p-8 text-white shadow-lg bg-gradient-to-r ${
          topic?.bgGradient ?? 'from-emerald-500 to-teal-600'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-xs font-black uppercase tracking-wider">
          <span className="bg-black/20 px-2.5 py-1 rounded-full">{lesson.topicName}</span>
          <span className="bg-white/25 px-2.5 py-1 rounded-full">{lesson.badgeTitle}</span>
          {isCompleted && (
            <span className="bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full flex items-center gap-1 font-bold">
              <CheckCircle className="w-3.5 h-3.5" /> Đã hoàn thành
            </span>
          )}
        </div>
        <h1 className="mt-3 text-2xl md:text-3xl font-black font-display tracking-tight">{lesson.title}</h1>
        <p className="mt-2 text-sm md:text-base font-medium text-white/90">{lesson.instruction}</p>
      </div>

      {/* Mascot speech */}
      <div className="flex items-start gap-3 bg-white rounded-3xl border-2 border-slate-100 p-4 shadow-sm">
        <span className="text-4xl">{lesson.mascot.avatar}</span>
        <div>
          <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{lesson.mascot.name}</p>
          <p className="text-sm md:text-base font-semibold text-slate-800">{lesson.mascot.message}</p>
        </div>
      </div>

      {/* Activity (keyed so state resets between lessons) */}
      <div key={lesson.id} className="bg-white/80 rounded-3xl border-2 border-slate-100 p-4 md:p-6 shadow-sm">
        {renderActivity(lesson.activity, handleCompleted)}
      </div>

      {/* Immediate In-Situ Completion Card: Visible right below activity without scrolling */}
      {(justFinished || isCompleted) && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 border-2 border-emerald-300 rounded-3xl p-5 md:p-6 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
              ⭐
            </div>
            <div>
              <p className="text-lg md:text-xl font-black flex items-center gap-2 justify-center sm:justify-start">
                <span>🎉 Xuất sắc! Thử thách đã hoàn thành!</span>
              </p>
              <p className="text-xs md:text-sm text-white/90 font-medium mt-0.5">
                Bạn đã nhận được thêm 3 ngôi sao thông thái!
              </p>
            </div>
          </div>

          {nextLesson ? (
            <button
              type="button"
              onClick={() => goTo(nextLesson.id)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-sm md:text-base shadow-lg transition-transform active:scale-95 shrink-0 ring-4 ring-amber-300/50"
            >
              <span>Bài tiếp theo ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onBackToMap}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-emerald-800 font-black text-sm md:text-base shadow-lg transition-transform active:scale-95 shrink-0"
            >
              🏆 Quay lại Bản đồ vinh quang
            </button>
          )}
        </div>
      )}

      {/* Regular bottom in-flow Navigation */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          disabled={!prevLesson}
          onClick={() => prevLesson && goTo(prevLesson.id)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Bài trước
        </button>
        <span className="text-xs font-bold text-slate-500">
          Bài {lessonIndex + 1} / {ALL_LESSONS.length}
        </span>
        <button
          type="button"
          disabled={!nextLesson}
          onClick={() => nextLesson && goTo(nextLesson.id)}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 bg-gradient-to-r ${
            isCompleted || justFinished
              ? 'from-amber-500 via-orange-500 to-amber-600 ring-4 ring-amber-200'
              : topic?.bgGradient ?? 'from-emerald-500 to-teal-600'
          }`}
        >
          Bài tiếp theo <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Sticky Bottom Floating Dock: Always visible on screen so you never need to scroll */}
      <aside aria-label="Thanh điều hướng nhanh bài học" className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-4 py-2.5 shadow-[0_-6px_25px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onBackToMap();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Bản đồ</span>
            </button>
            <button
              type="button"
              disabled={!prevLesson}
              onClick={() => prevLesson && goTo(prevLesson.id)}
              className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              title="Bài trước"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Bài trước</span>
            </button>
          </div>

          {/* Center progress pill */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isCompleted || justFinished ? 'bg-amber-400 animate-ping' : 'bg-emerald-500'}`} />
            <span className="truncate">{lesson.title}</span>
            <span className="text-slate-400 shrink-0 text-[11px]">({lessonIndex + 1}/{ALL_LESSONS.length})</span>
          </div>

          {/* Right immediate next button */}
          <div className="flex items-center gap-2 shrink-0">
            {nextLesson ? (
              <button
                type="button"
                onClick={() => goTo(nextLesson.id)}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black shadow-md transition-all active:scale-95 ${
                  isCompleted || justFinished
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 ring-4 ring-amber-300/60 animate-bounce-slow shadow-amber-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isCompleted || justFinished ? (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
                    <span>Bài tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Bài tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={onBackToMap}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black bg-emerald-600 text-white shadow-md"
              >
                🏆 Hoàn thành!
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};
