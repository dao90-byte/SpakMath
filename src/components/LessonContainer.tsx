import React, { useState } from 'react';
import { LessonQuestion, ALL_LESSONS } from '../data/lessonsData';
import { sound } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Lightbulb,
  CheckCircle,
  HelpCircle,
  Pencil,
  BookOpen,
  Award
} from 'lucide-react';

// Activity components
import { PictographViewer } from './activities/PictographViewer';
import { PictographBuilder } from './activities/PictographBuilder';
import { VolumeSlider } from './activities/VolumeSlider';
import { VolumeComparison } from './activities/VolumeComparison';
import { BarModelViewer } from './activities/BarModelViewer';
import { SudokuBoard } from './activities/SudokuBoard';
import { PatternAnimals } from './activities/PatternAnimals';
import { FlowerMaze } from './activities/FlowerMaze';
import { QueueCounter } from './activities/QueueCounter';
import { CornerCross } from './activities/CornerCross';
import { LogicSeatOrder } from './activities/LogicSeatOrder';
import { PixidokuBoard } from './activities/PixidokuBoard';
import { StarBattleBoard } from './activities/StarBattleBoard';

interface LessonContainerProps {
  lesson: LessonQuestion;
  onLessonChange: (lessonId: string) => void;
  onBackToMap: () => void;
  onOpenScratchpad: () => void;
  onLessonCompleted: (lessonId: string) => void;
  isCompleted: boolean;
}

export const LessonContainer: React.FC<LessonContainerProps> = ({
  lesson,
  onLessonChange,
  onBackToMap,
  onOpenScratchpad,
  onLessonCompleted,
  isCompleted
}) => {
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === lesson.id);
  const prevLesson = currentIndex > 0 ? ALL_LESSONS[currentIndex - 1] : null;
  const nextLesson = currentIndex < ALL_LESSONS.length - 1 ? ALL_LESSONS[currentIndex + 1] : null;

  const handleComplete = () => {
    onLessonCompleted(lesson.id);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const renderActivity = () => {
    switch (lesson.questionType) {
      case 'pictograph_read': {
        const d = lesson.interactiveData as any;
        return (
          <PictographViewer
            key={lesson.id}
            keyNotice={d.keyNotice}
            items={d.items}
            subQuestions={d.subQuestions}
            multiplier={d.multiplier || 1}
            onAllCompleted={handleComplete}
          />
        );
      }
      case 'pictograph_build': {
        const d = lesson.interactiveData as any;
        return (
          <PictographBuilder
            key={lesson.id}
            categories={d.categories}
            multiplier={d.multiplier}
            totalPeople={d.totalPeople}
            onCompleted={handleComplete}
          />
        );
      }
      case 'volume_slider': {
        const d = lesson.interactiveData as any;
        return (
          <VolumeSlider
            key={lesson.id}
            bottles={d.bottles}
            targetCondition={d.targetCondition}
            onCompleted={handleComplete}
          />
        );
      }
      case 'volume_compare': {
        const d = lesson.interactiveData as any;
        return (
          <VolumeComparison
            key={lesson.id}
            bottles={d.bottles}
            questions={d.questions}
            onCompleted={handleComplete}
          />
        );
      }
      case 'bar_model': {
        const d = lesson.interactiveData as any;
        return (
          <BarModelViewer
            key={lesson.id}
            bars={d.bars}
            questions={d.questions}
            onCompleted={handleComplete}
          />
        );
      }
      case 'sudoku_shape': {
        const d = lesson.interactiveData as any;
        if (lesson.id === 'challenge-star-battle') {
          return (
            <StarBattleBoard
              key={lesson.id}
              size={d.size}
              targetStarCount={d.targetStarCount}
              regions={d.regions}
              starsSolution={d.starsSolution}
              onCompleted={handleComplete}
            />
          );
        }
        return (
          <SudokuBoard
            key={lesson.id}
            type="shape"
            symbols={d.symbols}
            initialGrid={d.initialGrid}
            solution={d.solution}
            onCompleted={handleComplete}
          />
        );
      }
      case 'sudoku_number': {
        const d = lesson.interactiveData as any;
        return (
          <SudokuBoard
            key={lesson.id}
            type="number"
            initialGrid={d.initialGrid}
            solution={d.solution}
            onCompleted={handleComplete}
          />
        );
      }
      case 'pattern_sequence': {
        const d = lesson.interactiveData as any;
        return (
          <PatternAnimals
            key={lesson.id}
            sequence={d.sequence}
            choices={d.choices}
            target1={d.target1}
            target2={d.target2}
            onCompleted={handleComplete}
          />
        );
      }
      case 'pattern_maze': {
        const d = lesson.interactiveData as any;
        return (
          <FlowerMaze
            key={lesson.id}
            pattern={d.pattern}
            gridSize={d.gridSize}
            onCompleted={handleComplete}
          />
        );
      }
      case 'queue_counter': {
        const d = lesson.interactiveData as any;
        return (
          <QueueCounter
            key={lesson.id}
            fromFront={d.fromFront}
            fromBack={d.fromBack}
            correctTotal={d.correctTotal}
            formula={d.formula}
            onCompleted={handleComplete}
          />
        );
      }
      case 'corner_cross': {
        const d = lesson.interactiveData as any;
        return (
          <CornerCross
            key={lesson.id}
            shape={d.shape}
            verticalCount={d.verticalCount}
            horizontalCount={d.horizontalCount}
            intersectionPerson={d.intersectionPerson}
            options={d.options}
            correctAnswer={d.correctAnswer}
            onCompleted={handleComplete}
          />
        );
      }
      case 'logic_height': {
        const d = lesson.interactiveData as any;
        return (
          <VolumeComparison
            key={lesson.id}
            bottles={[
              { id: 'benny', label: 'Benny 🐵', levelPercent: 90, color: '#f59e0b' },
              { id: 'casey', label: 'Casey 🐹', levelPercent: 60, color: '#f59e0b' },
              { id: 'abby', label: 'Abby 🐰', levelPercent: 40, color: '#f59e0b' }
            ]}
            questions={d.questions}
            onCompleted={handleComplete}
          />
        );
      }
      case 'logic_seating': {
        const d = lesson.interactiveData as any;
        return (
          <LogicSeatOrder
            key={lesson.id}
            seatsCount={d.seatsCount}
            correctOrder={d.correctOrder}
            allowedCharacters={d.allowedCharacters}
            onCompleted={handleComplete}
          />
        );
      }
      case 'pixidoku_5x5': {
        const d = lesson.interactiveData as any;
        return (
          <PixidokuBoard
            key={lesson.id}
            size={d.size}
            animals={d.animals}
            initialGrid={d.initialGrid}
            solution={d.solution}
            onCompleted={handleComplete}
          />
        );
      }
      default:
        return <div>Chuyên đề đang được chuẩn bị.</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBackToMap();
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm transition-colors border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại bản đồ
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            Bài {currentIndex + 1} / {ALL_LESSONS.length}
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-black">
            {lesson.badgeTitle}
          </span>
        </div>
      </div>

      {/* Mascot Speech Bubble Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-3xl p-4 md:p-6 shadow-sm flex items-start gap-4">
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white border-2 border-amber-300 shadow-md flex items-center justify-center text-3xl md:text-4xl shrink-0">
          {lesson.mascot.avatar}
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-black text-amber-900 text-sm md:text-base font-display">
              {lesson.mascot.name} nhắn nhủ:
            </span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3" /> Đã hoàn thành
              </span>
            )}
          </div>
          <p className="text-xs md:text-sm text-amber-950 font-medium leading-relaxed italic">
            "{lesson.mascot.quote}"
          </p>
        </div>
      </div>

      {/* Lesson Title & Instruction */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-200/90 shadow-md space-y-4">
        <div>
          <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider block">
            {lesson.topicName}
          </span>
          <h2 className="text-xl md:text-2xl font-black font-display text-slate-900 mt-1">
            {lesson.title}
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-medium mt-2 whitespace-pre-line leading-relaxed">
            {lesson.instruction}
          </p>
        </div>

        {/* The Core Interactive Exercise */}
        <div className="pt-2">{renderActivity()}</div>

        {/* Footer Support Tools: Hint, Scratchpad, Explanation */}
        <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowHint(!showHint);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowExplanation(!showExplanation);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold border border-sky-200 transition-colors"
            >
              <HelpCircle className="w-4 h-4 text-sky-600" />
              {showExplanation ? 'Ẩn lời giải' : 'Đáp án & Lời giải'}
            </button>

            <button
              type="button"
              onClick={() => {
                sound.playClick();
                onOpenScratchpad();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 transition-colors"
            >
              <Pencil className="w-4 h-4 text-slate-600" />
              Bảng vẽ nháp
            </button>
          </div>

          {/* Next / Prev Navigation */}
          <div className="flex items-center gap-2">
            {prevLesson && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onLessonChange(prevLesson.id);
                }}
                className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                title="Bài trước"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            {nextLesson && (
              <button
                type="button"
                onClick={() => {
                  sound.playClick();
                  onLessonChange(nextLesson.id);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs md:text-sm shadow-md transition-transform active:scale-95"
              >
                <span>Bài tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Hint Drawer */}
        {showHint && (
          <div className="p-4 bg-amber-50/90 rounded-2xl border-2 border-amber-300 text-xs md:text-sm text-amber-900 font-medium animate-in fade-in duration-150">
            <span className="font-black flex items-center gap-1.5 text-amber-800 mb-1">
              💡 Gợi ý tư duy:
            </span>
            {lesson.hint}
          </div>
        )}

        {/* Collapsible Explanation Drawer */}
        {showExplanation && (
          <div className="p-4 bg-sky-50/90 rounded-2xl border-2 border-sky-300 text-xs md:text-sm text-sky-950 font-medium animate-in fade-in duration-150">
            <span className="font-black flex items-center gap-1.5 text-sky-800 mb-1">
              📖 Giải thích chi tiết từ giáo trình:
            </span>
            {lesson.explanation}
          </div>
        )}
      </div>
    </div>
  );
};
