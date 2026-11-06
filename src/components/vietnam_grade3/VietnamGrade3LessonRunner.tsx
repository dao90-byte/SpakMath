import React, { useState } from 'react';
import { VietnamGrade3Lesson } from '../../data/vietnamGrade3LessonsData';
import { SocraticDiscoveryCard } from './SocraticDiscoveryCard';
import { sound } from '../../utils/soundEffects';
import { markExerciseCompleted } from '../../utils/cosmicProgressStorage';
import { 
  ArrowLeft, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Star, 
  Lightbulb, 
  RotateCcw,
  GraduationCap,
  ChevronRight,
  Info,
  Rocket
} from 'lucide-react';

interface VietnamGrade3LessonRunnerProps {
  lesson: VietnamGrade3Lesson;
  isCompleted: boolean;
  onBack: () => void;
  onLessonCompleted: (lessonId: string) => void;
  onNextLesson?: () => void;
}

export const VietnamGrade3LessonRunner: React.FC<VietnamGrade3LessonRunnerProps> = ({
  lesson,
  isCompleted,
  onBack,
  onLessonCompleted,
  onNextLesson
}) => {
  const [activeTab, setActiveTab] = useState<'socratic' | 'practice'>('socratic');
  const [socraticStepIndex, setSocraticStepIndex] = useState(0);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const [answeredExercises, setAnsweredExercises] = useState<Record<string, boolean>>({});

  const currentExercise = lesson.exercises[exerciseIndex];
  const currentSocraticCard = lesson.socraticDiscovery[socraticStepIndex];
  const allExercisesCompleted = lesson.exercises.every(
    (ex) => answeredExercises[ex.id] === true
  );

  const handleNextSocraticStep = () => {
    if (socraticStepIndex < lesson.socraticDiscovery.length - 1) {
      setSocraticStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevSocraticStep = () => {
    if (socraticStepIndex > 0) {
      setSocraticStepIndex((prev) => prev - 1);
    }
  };

  const handleSelectAnswer = (optionLabel: string) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(optionLabel);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const correct = String(selectedAnswer).trim() === String(currentExercise.correctAnswer).trim();
    setIsCorrect(correct);

    if (correct) {
      sound.playCorrect();
      const updatedAnswered = { ...answeredExercises, [currentExercise.id]: true };
      setAnsweredExercises(updatedAnswered);
      const doneCount = Object.keys(updatedAnswered).length;
      markExerciseCompleted(lesson.id, doneCount, lesson.exercises.length);

      // If last exercise, mark lesson complete
      const willBeAllDone = lesson.exercises.every(
        (ex) => ex.id === currentExercise.id || answeredExercises[ex.id] === true
      );
      if (willBeAllDone) {
        onLessonCompleted(lesson.id);
      }
    } else {
      sound.playWrong();
      setShowSolution(true);
    }
  };

  const handleNextExercise = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowSolution(false);

    if (exerciseIndex < lesson.exercises.length - 1) {
      setExerciseIndex((prev) => prev + 1);
    }
  };

  const handleRetryExercise = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setShowSolution(false);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-3.5 py-2 rounded-xl border border-slate-200 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh mục bài</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowTeacherNotes(!showTeacherNotes);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-2xl border border-slate-200 transition-colors"
            title="Ghi chú sư phạm dành cho giáo viên và phụ huynh"
          >
            <GraduationCap className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Góc ba mẹ &amp; thầy cô</span>
          </button>

          {isCompleted && (
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800 bg-emerald-100 border border-emerald-300 px-3 py-1.5 rounded-full">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>ĐÃ HOÀN THÀNH</span>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Metadata Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-xs font-black text-amber-800 bg-amber-100/90 px-3 py-1 rounded-xl">
            Bài {lesson.sgkLessonNumber} · {lesson.sgkPages}
          </span>
          <span className="text-xs font-bold text-slate-400 ml-auto">
            Thời lượng ~ {lesson.estimatedMinutes} phút
          </span>
        </div>

        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-semibold">
          {lesson.subtitle}
        </p>

        {/* Elevated Core Socratic Philosophy Question */}
        <div className="mt-4 p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl text-white shadow-md border-2 border-amber-300 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shrink-0 border border-white/25 shadow-inner">
            💡
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 block mb-0.5">
              CÂU HỎI TRIẾT LÝ CỦA BÀI HỌC
            </span>
            <p className="text-sm sm:text-base font-black text-white leading-snug">
              {lesson.coreQuestion}
            </p>
          </div>
        </div>

        {/* Teacher Notes Collapsible Box */}
        {showTeacherNotes && (
          <div className="mt-4 p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 text-xs sm:text-sm animate-fade-in">
            <div className="font-black text-indigo-950 flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>Chỉ dẫn phương pháp dạy (Bộ Giáo Dục &amp; Đào Tạo):</span>
            </div>
            <p className="text-slate-700 leading-relaxed mb-2">
              <strong>Vì sao cần dạy bài này:</strong> {lesson.pedagogicalNotes.whyTeachThis}
            </p>
            <div className="mb-2">
              <strong className="text-rose-700">Lỗi sai học sinh thường mắc:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                {lesson.pedagogicalNotes.commonMisconceptions.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
            <p className="text-slate-700 leading-relaxed">
              <strong>Lời khuyên dành cho thầy cô:</strong> {lesson.pedagogicalNotes.teacherAdvice}
            </p>
          </div>
        )}

        {/* Phase Toggle Buttons */}
        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('socratic');
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'socratic'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Phần 1: Khám phá bản chất Socratic ({lesson.socraticDiscovery.length} bước)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('practice');
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
              activeTab === 'practice'
                ? 'bg-amber-500 text-white shadow-sm'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Phần 2: Luyện tập thực hành ({lesson.exercises.length} bài)</span>
            {allExercisesCompleted && (
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </div>

      {/* PHASE 1: SOCRATIC DISCOVERY */}
      {activeTab === 'socratic' && currentSocraticCard && (
        <SocraticDiscoveryCard
          card={currentSocraticCard}
          currentStep={socraticStepIndex + 1}
          totalSteps={lesson.socraticDiscovery.length}
          lessonId={lesson.id}
          onNextStep={handleNextSocraticStep}
          onPrevStep={handlePrevSocraticStep}
          onCompleteDiscovery={() => {
            sound.playVictory();
            setActiveTab('practice');
          }}
        />
      )}

      {/* PHASE 2: PRACTICE EXERCISES */}
      {activeTab === 'practice' && currentExercise && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 sm:p-7">
          {/* Exercise Index & Indicator */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-amber-500 text-white font-black text-xs flex items-center justify-center">
                {currentExercise.order}
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-800">
                {currentExercise.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                currentExercise.cognitiveLevel === 'nhan_biet' ? 'bg-sky-100 text-sky-800' :
                currentExercise.cognitiveLevel === 'thong_hieu' ? 'bg-emerald-100 text-emerald-800' :
                currentExercise.cognitiveLevel === 'van_dung' ? 'bg-amber-100 text-amber-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {currentExercise.cognitiveLevel === 'nhan_biet' ? 'Nhận biết' :
                 currentExercise.cognitiveLevel === 'thong_hieu' ? 'Thông hiểu' :
                 currentExercise.cognitiveLevel === 'van_dung' ? 'Vận dụng' : 'Vận dụng cao'}
              </span>
              <span className="text-xs font-bold text-slate-400">
                {exerciseIndex + 1} / {lesson.exercises.length}
              </span>
            </div>
          </div>

          {/* Exercise Question Prompt */}
          <div className="text-base sm:text-lg font-black text-slate-900 leading-snug mb-5">
            {currentExercise.prompt}
          </div>

          {/* Options List */}
          {currentExercise.options && (
            <div className="space-y-3 mb-6">
              {currentExercise.options.map((opt) => {
                const isSelected = selectedAnswer === opt.label;
                let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isAnswerSubmitted) {
                  if (opt.label === currentExercise.correctAnswer) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-200';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-300';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.label)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-[0.99] ${btnStyle}`}
                  >
                    <span>{opt.label}</span>
                    {isAnswerSubmitted && opt.label === currentExercise.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Action Bar: Submit / Hint / Next */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowHint(!showHint);
              }}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Gợi ý tư duy</span>
            </button>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-sm transition-all flex items-center gap-2 ${
                  selectedAnswer
                    ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Kiểm tra kết quả</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                {!isCorrect && (
                  <button
                    type="button"
                    onClick={handleRetryExercise}
                    className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-50 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Làm lại</span>
                  </button>
                )}

                {exerciseIndex < lesson.exercises.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextExercise}
                    className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-sm active:scale-95 transition-transform flex items-center gap-2"
                  >
                    <span>Bài tập tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      sound.playVictory();
                      onBack();
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-transform flex items-center gap-2"
                  >
                    <span>Hoàn Thành Bài Học!</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Elevated Hint Card */}
          {showHint && (
            <div className="mt-5 p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl text-xs sm:text-sm text-amber-950 animate-fade-in flex items-start gap-3.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm font-black shrink-0 shadow-xs">
                💡
              </div>
              <div className="flex-1">
                <strong className="block font-black text-amber-900 mb-0.5">Gợi ý tư duy:</strong>
                <p className="leading-relaxed font-bold">{currentExercise.hint}</p>
              </div>
            </div>
          )}

          {/* Elevated Solution Steps Card */}
          {showSolution && (
            <div className="mt-5 p-4 sm:p-5 bg-emerald-50/80 border-2 border-emerald-300 rounded-2xl text-xs sm:text-sm animate-fade-in shadow-xs">
              <div className="font-black text-emerald-900 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span className="text-sm font-black">Các bước giải thích bản chất:</span>
              </div>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-800 font-bold">
                {currentExercise.solutionSteps.map((step, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
