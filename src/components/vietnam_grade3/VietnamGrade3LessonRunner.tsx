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
    <div className="max-w-4xl mx-auto pb-12 animate-fade-in font-sans text-white">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <button
          type="button"
          onClick={() => {
            sound.playClick();
            onBack();
          }}
          className="flex items-center gap-2 text-xs sm:text-sm font-black text-cyan-300 hover:text-white bg-[#0B0F19]/90 hover:bg-slate-800/90 px-4 py-2.5 rounded-2xl border border-cyan-500/40 transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)] active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>Về Bản Đồ Hành Tinh</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowTeacherNotes(!showTeacherNotes);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 px-3.5 py-2.5 rounded-2xl border border-amber-400/40 transition-colors shadow-xs"
            title="Ghi chú sư phạm dành cho giáo viên và phụ huynh"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Góc ba mẹ &amp; thầy cô</span>
          </button>

          {isCompleted && (
            <div className="flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-500/20 border border-emerald-400/50 px-3.5 py-2 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Star className="w-4 h-4 fill-amber-400 text-amber-300" />
              <span>ĐÃ CHINH PHỤC</span>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Metadata Banner - High-Tech Cosmic Station */}
      <div className="bg-[#0B0F19]/90 rounded-3xl p-5 sm:p-7 border-2 border-slate-800 shadow-[0_0_30px_rgba(0,240,255,0.1)] mb-6 backdrop-blur-md relative overflow-hidden">
        {/* Ambient background light */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center gap-2 mb-2.5 relative z-10">
          <span className="text-xs font-black text-cyan-200 bg-cyan-500/20 border border-cyan-400/50 px-3 py-1 rounded-xl font-mono shadow-xs">
            TRẠM HÀNH TINH {lesson.sgkLessonNumber} · SGK Trang {lesson.sgkPages}
          </span>
          <span className="text-xs font-bold text-slate-400 ml-auto flex items-center gap-1.5 font-mono">
            <span>⏱️</span>
            <span>~ {lesson.estimatedMinutes} phút du hành</span>
          </span>
        </div>

        <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug relative z-10">
          {lesson.title}
        </h1>
        <p className="text-xs sm:text-sm text-cyan-200/80 mt-1 font-semibold relative z-10">
          {lesson.subtitle}
        </p>

        {/* Elevated Core Socratic Philosophy Question - Radiant Nebula */}
        <div className="mt-5 p-5 bg-gradient-to-r from-amber-500/90 via-orange-600/90 to-purple-700/90 rounded-2xl text-white shadow-[0_0_25px_rgba(251,191,36,0.3)] border-2 border-amber-300/80 flex items-start gap-4 relative z-10">
          <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shrink-0 border border-white/30 shadow-inner">
            💡
          </div>
          <div className="flex-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-200 block mb-1 font-mono">
              CÂU HỎI TRIẾT LÝ BẢN CHẤT CỦA BÀI HỌC
            </span>
            <p className="text-sm sm:text-base font-black text-white leading-snug drop-shadow-sm">
              {lesson.coreQuestion}
            </p>
          </div>
        </div>

        {/* Teacher Notes Collapsible Box */}
        {showTeacherNotes && (
          <div className="mt-4 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-400/40 text-xs sm:text-sm animate-fade-in relative z-10 text-slate-200">
            <div className="font-black text-cyan-300 flex items-center gap-2 mb-2">
              <Info className="w-4 h-4 text-cyan-400" />
              <span>Chỉ dẫn phương pháp dạy (Bộ Giáo Dục &amp; Đào Tạo):</span>
            </div>
            <p className="text-slate-200 leading-relaxed mb-2">
              <strong className="text-cyan-200">Vì sao cần dạy bài này:</strong> {lesson.pedagogicalNotes.whyTeachThis}
            </p>
            <div className="mb-2">
              <strong className="text-rose-300">Lỗi sai học sinh thường mắc:</strong>
              <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-300">
                {lesson.pedagogicalNotes.commonMisconceptions.map((m, idx) => (
                  <li key={idx}>{m}</li>
                ))}
              </ul>
            </div>
            <p className="text-slate-200 leading-relaxed">
              <strong className="text-amber-300">Lời khuyên dành cho thầy cô:</strong> {lesson.pedagogicalNotes.teacherAdvice}
            </p>
          </div>
        )}

        {/* Phase Toggle Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-800/80 relative z-10">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('socratic');
            }}
            className={`py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              activeTab === 'socratic'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)] border-2 border-cyan-300'
                : 'bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeTab === 'socratic' ? 'text-slate-950' : 'text-cyan-400'}`} />
            <span>Phần 1: Khám phá bản chất ({lesson.socraticDiscovery.length} chòm sao)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('practice');
            }}
            className={`py-3 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
              activeTab === 'practice'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-[0_0_20px_rgba(251,191,36,0.4)] border-2 border-amber-300'
                : 'bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/30'
            }`}
          >
            <BookOpen className={`w-4 h-4 ${activeTab === 'practice' ? 'text-slate-950' : 'text-amber-400'}`} />
            <span>Phần 2: Luyện tập thực hành ({lesson.exercises.length} bài)</span>
            {allExercisesCompleted && (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
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
        <div className="bg-[#0B0F19]/90 rounded-3xl border-2 border-slate-800 shadow-[0_0_30px_rgba(0,240,255,0.12)] p-5 sm:p-7 text-white backdrop-blur-md relative overflow-hidden">
          {/* Subtle cosmic accent glow */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Exercise Index & Indicator */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-[0_0_12px_rgba(251,191,36,0.4)] font-mono">
                {currentExercise.order}
              </span>
              <span className="text-xs sm:text-sm font-black text-white">
                {currentExercise.title}
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                currentExercise.cognitiveLevel === 'nhan_biet' ? 'bg-sky-500/20 text-sky-300 border-sky-400/40' :
                currentExercise.cognitiveLevel === 'thong_hieu' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' :
                currentExercise.cognitiveLevel === 'van_dung' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' :
                'bg-purple-500/20 text-purple-300 border-purple-400/40'
              }`}>
                {currentExercise.cognitiveLevel === 'nhan_biet' ? '1. Nhận biết' :
                 currentExercise.cognitiveLevel === 'thong_hieu' ? '2. Thông hiểu' :
                 currentExercise.cognitiveLevel === 'van_dung' ? '3. Vận dụng' : '4. Vận dụng cao'}
              </span>
              <span className="text-xs font-bold text-cyan-300 bg-slate-900 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                {exerciseIndex + 1} / {lesson.exercises.length}
              </span>
            </div>
          </div>

          {/* Exercise Question Prompt */}
          <div className="text-base sm:text-lg font-black text-white leading-snug mb-6 relative z-10 drop-shadow-sm">
            {currentExercise.prompt}
          </div>

          {/* Options List */}
          {currentExercise.options && (
            <div className="space-y-3 mb-6 relative z-10">
              {currentExercise.options.map((opt) => {
                const isSelected = selectedAnswer === opt.label;
                let btnStyle = 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 text-slate-200 hover:border-cyan-500/50 hover:text-white';

                if (isAnswerSubmitted) {
                  if (opt.label === currentExercise.correctAnswer) {
                    btnStyle = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200 ring-2 ring-rose-500/40';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-cyan-950/70 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/50 shadow-[0_0_18px_rgba(0,240,255,0.25)]';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.label)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 active:scale-[0.99] ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-cyan-300 font-mono text-xs flex items-center justify-center shrink-0">
                        {opt.id.toUpperCase()}
                      </span>
                      <span>{opt.label}</span>
                    </div>
                    {isAnswerSubmitted && opt.label === currentExercise.correctAnswer && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Action Bar: Submit / Hint / Next */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 relative z-10">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setShowHint(!showHint);
              }}
              className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 transition-colors shadow-xs"
            >
              <Lightbulb className="w-4 h-4 text-amber-400" />
              <span>Gợi ý tư duy</span>
            </button>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`px-6 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                  selectedAnswer
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 active:scale-95 shadow-[0_0_18px_rgba(0,240,255,0.4)]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
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
                    className="px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-bold text-xs sm:text-sm hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4 text-cyan-400" />
                    <span>Thử lại</span>
                  </button>
                )}

                {exerciseIndex < lesson.exercises.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextExercise}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_18px_rgba(0,240,255,0.35)] active:scale-95 transition-transform flex items-center gap-2"
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
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-transform flex items-center gap-2"
                  >
                    <span>Hoàn Thành Hành Tinh Này!</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Elevated Cosmic Hint Card */}
          {showHint && (
            <div className="mt-5 p-4 sm:p-5 bg-amber-950/40 border-2 border-amber-400/60 rounded-2xl text-xs sm:text-sm text-amber-100 animate-fade-in flex items-start gap-3.5 shadow-[0_0_20px_rgba(251,191,36,0.15)] relative z-10">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-sm font-black shrink-0 shadow-xs">
                💡
              </div>
              <div className="flex-1">
                <strong className="block font-black text-amber-300 mb-0.5">Gợi ý tư duy:</strong>
                <p className="leading-relaxed font-bold text-amber-100">{currentExercise.hint}</p>
              </div>
            </div>
          )}

          {/* Elevated Cosmic Solution Steps Card */}
          {showSolution && (
            <div className="mt-5 p-4 sm:p-5 bg-emerald-950/40 border-2 border-emerald-400/60 rounded-2xl text-xs sm:text-sm animate-fade-in shadow-[0_0_20px_rgba(16,185,129,0.15)] relative z-10 text-emerald-100">
              <div className="font-black text-emerald-300 flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm font-black">Các bước giải thích bản chất:</span>
              </div>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-200 font-bold">
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
