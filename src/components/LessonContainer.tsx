import React, { useState } from 'react';
import { ALL_LESSONS, LessonQuestion, LessonActivity, TOPICS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import { ArrowLeft, ArrowRight, Pencil, Lightbulb, CheckCircle, Star } from 'lucide-react';
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
      return <FlowerMaze pattern={activity.pattern} onCompleted={onCompleted} />;
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
          fromFront={activity.fromFront}
          fromBack={activity.fromBack}
          correctTotal={activity.correctTotal}
          formula={activity.formula}
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
  const [showHint, setShowHint] = useState(false);
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
    setShowHint(false);
    onLessonChange(id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top actions */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBackToMap();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" /> Về bản đồ
        </button>

        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onOpenScratchpad();
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-100 border-2 border-amber-300 text-sm font-bold text-amber-900 hover:bg-amber-200 shadow-xs"
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
            <span className="bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full flex items-center gap-1">
              <CheckCircle className="w-3 h-3" /> Đã hoàn thành
            </span>
          )}
        </div>
        <h1 className="mt-3 text-2xl md:text-3xl font-black font-display tracking-tight">{lesson.title}</h1>
        <p className="mt-2 text-sm md:text-base font-medium text-white/90">{lesson.instruction}</p>
      </div>

      {/* Mascot speech & hint */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex items-start gap-3 bg-white rounded-3xl border-2 border-slate-100 p-4 shadow-sm">
          <span className="text-4xl">{lesson.mascot.avatar}</span>
          <div>
            <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">{lesson.mascot.name}</p>
            <p className="text-sm md:text-base font-semibold text-slate-800">{lesson.mascot.message}</p>
          </div>
        </div>

        <div className="md:w-80 bg-sky-50 rounded-3xl border-2 border-sky-200 p-4">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowHint((v) => !v);
            }}
            className="inline-flex items-center gap-2 text-sm font-bold text-sky-800"
          >
            <Lightbulb className="w-4 h-4 text-amber-500" />
            {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
          </button>
          {showHint && <p className="mt-2 text-sm font-medium text-sky-900">{lesson.hint}</p>}
        </div>
      </div>

      {/* Activity (keyed so state resets between lessons) */}
      <div key={lesson.id} className="bg-white/70 rounded-3xl border-2 border-slate-100 p-4 md:p-6 shadow-sm">
        {renderActivity(lesson.activity, handleCompleted)}
      </div>

      {justFinished && (
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-5 text-center space-y-1">
          <p className="text-lg font-black text-emerald-800">🎉 Tuyệt vời! Bạn đã hoàn thành thử thách!</p>
          <p className="text-sm font-semibold text-emerald-700 flex items-center justify-center gap-1">
            <Star className="w-4 h-4 fill-amber-300 text-amber-400" /> Thu thập được ngôi sao mới
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          disabled={!prevLesson}
          onClick={() => prevLesson && goTo(prevLesson.id)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" /> Bài trước
        </button>
        <span className="text-xs font-bold text-slate-500">
          {lessonIndex + 1} / {ALL_LESSONS.length}
        </span>
        <button
          type="button"
          disabled={!nextLesson}
          onClick={() => nextLesson && goTo(nextLesson.id)}
          className={`inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-bold text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r ${
            topic?.bgGradient ?? 'from-emerald-500 to-teal-600'
          }`}
        >
          Bài tiếp theo <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
