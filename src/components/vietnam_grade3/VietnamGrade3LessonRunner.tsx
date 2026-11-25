import React, { useState, useRef, useEffect } from 'react';
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
  const [wrongAttemptsMap, setWrongAttemptsMap] = useState<Record<string, number>>({});
  const [showTeacherNotes, setShowTeacherNotes] = useState(false);
  const [answeredExercises, setAnsweredExercises] = useState<Record<string, boolean>>({});

  const cardTopRef = useRef<HTMLDivElement>(null);

  const currentExercise = lesson.exercises[exerciseIndex];
  const currentSocraticCard = lesson.socraticDiscovery[socraticStepIndex];
  const allExercisesCompleted = lesson.exercises.every(
    (ex) => answeredExercises[ex.id] === true
  );

  // Automatically scroll card top into view whenever step or tab changes
  useEffect(() => {
    if (activeTab === 'socratic' && cardTopRef.current) {
      const timer = setTimeout(() => {
        cardTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 40);
      return () => clearTimeout(timer);
    }
  }, [socraticStepIndex, activeTab]);

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

    const correct = String(selectedAnswer).trim() === String(currentExercise.correctAnswer).trim();

    if (correct) {
      setIsAnswerSubmitted(true);
      setIsCorrect(true);
      sound.playCorrect();
      const updatedAnswered = { ...answeredExercises, [currentExercise.id]: true };
      setAnsweredExercises(updatedAnswered);
      const doneCount = Object.keys(updatedAnswered).length;
      markExerciseCompleted(lesson.id, doneCount, lesson.exercises.length);

      const willBeAllDone = lesson.exercises.every(
        (ex) => ex.id === currentExercise.id || answeredExercises[ex.id] === true
      );
      if (willBeAllDone) {
        onLessonCompleted(lesson.id);
      }
    } else {
      // Do NOT report wrong or show solution steps; silently count wrong attempts and allow retry
      setWrongAttemptsMap((prev) => ({
        ...prev,
        [currentExercise.id]: (prev[currentExercise.id] || 0) + 1,
      }));
      setSelectedAnswer(null);
    }
  };

  const handleNextExercise = () => {
    sound.playClick();
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);

    if (exerciseIndex < lesson.exercises.length - 1) {
      setExerciseIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
      <div className="bg-[radial-gradient(ellipse_at_top_right,_rgba(34,211,238,0.22),_transparent_52%),radial-gradient(ellipse_at_bottom_left,_rgba(217,70,239,0.2),_transparent_52%),linear-gradient(155deg,_rgba(11,18,54,0.96),_rgba(20,12,56,0.96))] rounded-3xl p-5 sm:p-7 border border-cyan-300/45 shadow-[0_24px_64px_rgba(3,7,24,0.8),0_0_36px_rgba(34,211,238,0.18)] mb-6 backdrop-blur-2xl relative overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
        />
        {/* Ambient background light */}
        <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-400/24 rounded-full blur-3xl pointer-events-none cosmic-light-bloom" />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-fuchsia-500/24 rounded-full blur-3xl pointer-events-none cosmic-light-bloom" />

        <div className="flex flex-wrap items-center gap-2 mb-2.5 relative z-10">
          <span className="text-xs font-black text-cyan-200 bg-cyan-500/20 border border-cyan-400/50 px-3 py-1 rounded-xl font-mono shadow-xs">
            TRẠM HÀNH TINH {lesson.sgkLessonNumber}
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
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
              window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <div ref={cardTopRef} className="space-y-4 scroll-mt-6">
          {/* Interactive Socratic Stage Stepper Bar */}
          <div className="bg-[radial-gradient(ellipse_at_left,_rgba(34,211,238,0.16),_transparent_50%),linear-gradient(135deg,_rgba(11,18,54,0.95),_rgba(18,12,50,0.95))] rounded-2xl border border-cyan-300/40 p-2.5 sm:p-3 flex items-center justify-between gap-2 overflow-x-auto shadow-[0_14px_34px_rgba(3,7,24,0.65)] backdrop-blur-xl">
            <div className="flex items-center gap-2 shrink-0 px-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-black uppercase text-cyan-400 font-mono tracking-wider hidden sm:inline">
                CHẶNG KHÁM PHÁ:
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-1 justify-end">
              {lesson.socraticDiscovery.map((stepCard, idx) => {
                const isActive = idx === socraticStepIndex;
                const isPassed = idx < socraticStepIndex;
                return (
                  <button
                    key={stepCard.id}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSocraticStepIndex(idx);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 whitespace-nowrap transition-all active:scale-95 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.5)] ring-2 ring-cyan-300'
                        : isPassed
                        ? 'bg-slate-900 text-emerald-300 border border-emerald-500/40 hover:bg-slate-800'
                        : 'bg-slate-900/80 text-cyan-200/90 border border-slate-800 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-black/20 flex items-center justify-center font-mono text-[11px]">
                      {idx + 1}
                    </span>
                    <span>{stepCard.stageTitle.split(':')[0] || `Chặng ${idx + 1}`}</span>
                    {isPassed && (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <SocraticDiscoveryCard
            key={currentSocraticCard.id}
            card={currentSocraticCard}
            currentStep={socraticStepIndex + 1}
            totalSteps={lesson.socraticDiscovery.length}
            nextStageTitle={lesson.socraticDiscovery[socraticStepIndex + 1]?.stageTitle}
            lessonId={lesson.id}
            onNextStep={handleNextSocraticStep}
            onPrevStep={handlePrevSocraticStep}
            onCompleteDiscovery={() => {
              sound.playVictory();
              setActiveTab('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      )}

      {/* PHASE 2: PRACTICE EXERCISES */}
      {activeTab === 'practice' && currentExercise && (
        <div className="bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.22),_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(251,191,36,0.16),_transparent_50%),radial-gradient(ellipse_at_80%_20%,_rgba(217,70,239,0.2),_transparent_52%),linear-gradient(160deg,_rgba(10,17,54,0.97),_rgba(18,11,54,0.98)_55%,_rgba(6,10,34,0.99)_100%)] rounded-3xl border border-cyan-300/50 shadow-[0_30px_80px_rgba(3,7,24,0.88),0_0_46px_rgba(34,211,238,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] p-5 sm:p-7 text-white backdrop-blur-2xl relative overflow-hidden">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 inset-x-8 h-[2.5px] rounded-full bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-amber-300 shadow-[0_0_22px_rgba(34,211,238,0.85)]"
          />
          {/* Subtle cosmic accent glow */}
          <div className="absolute -top-16 right-1/4 w-72 h-72 bg-amber-400/18 rounded-full blur-[110px] pointer-events-none cosmic-light-bloom" />
          <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-cyan-400/20 rounded-full blur-[110px] pointer-events-none cosmic-light-bloom" />

          {/* Exercise Index & Indicator */}
          <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-white/15 relative z-10">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-300 via-yellow-300 to-orange-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-[0_0_18px_rgba(251,191,36,0.55)] font-mono">
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
              <span className="text-xs font-bold text-cyan-200 bg-[#050924]/90 px-2.5 py-0.5 rounded-full border border-cyan-400/45">
                {exerciseIndex + 1} / {lesson.exercises.length}
              </span>
            </div>
          </div>

          {/* Exercise Question Prompt */}
          <div className="rounded-2xl bg-[radial-gradient(ellipse_at_top_left,_rgba(56,189,248,0.16),_transparent_58%),linear-gradient(160deg,_rgba(5,9,34,0.95),_rgba(12,15,48,0.96))] border border-cyan-300/35 p-4 sm:p-5 mb-6 relative z-10 shadow-[inset_0_2px_16px_rgba(0,0,0,0.5),0_0_24px_rgba(34,211,238,0.12)]">
            <div className="text-lg sm:text-2xl font-black text-white leading-relaxed drop-shadow-sm">
              {currentExercise.prompt}
            </div>
          </div>

          {/* Options List */}
          {currentExercise.options && (
            <div className="space-y-3.5 mb-6 relative z-10">
              {currentExercise.options.map((opt) => {
                const isSelected = selectedAnswer === opt.label;
                let btnStyle = 'bg-[#080E32]/92 hover:bg-indigo-900/65 border-cyan-300/30 text-slate-100 hover:border-cyan-300 hover:shadow-[0_0_22px_rgba(34,211,238,0.3)] hover:text-white';

                if (isAnswerSubmitted) {
                  if (opt.label === currentExercise.correctAnswer) {
                    btnStyle = 'bg-emerald-950/85 border-emerald-400 text-emerald-100 ring-2 ring-emerald-400/55 shadow-[0_0_24px_rgba(16,185,129,0.4)]';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-950/85 border-rose-500 text-rose-100 ring-2 ring-rose-500/45';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-gradient-to-r from-cyan-500/25 via-indigo-600/35 to-fuchsia-500/25 border-cyan-300 text-white ring-2 ring-cyan-300/55 shadow-[0_0_26px_rgba(34,211,238,0.35)]';
                }

                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAnswer(opt.label)}
                    disabled={isAnswerSubmitted}
                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center justify-between gap-3.5 active:scale-[0.99] leading-relaxed cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-xl bg-cyan-400/15 border border-cyan-300/35 text-cyan-200 font-mono text-xs sm:text-sm font-black flex items-center justify-center shrink-0">
                        {opt.id.toUpperCase()}
                      </span>
                      <span className="leading-relaxed">{opt.label}</span>
                    </div>
                    {isAnswerSubmitted && opt.label === currentExercise.correctAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Action Bar: Submit / Next */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-5 border-t border-slate-800 relative z-10">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className={`px-7 py-3 rounded-2xl font-black text-xs sm:text-sm md:text-base shadow-md transition-all flex items-center gap-2.5 ${
                  selectedAnswer
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 active:scale-95 shadow-[0_0_20px_rgba(0,240,255,0.45)]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                }`}
              >
                <span>Kiểm tra kết quả</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex flex-wrap items-center justify-between w-full gap-3">
                <div className="flex items-center gap-2 text-emerald-300 font-black text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Chính xác tuyệt vời!</span>
                </div>

                {exerciseIndex < lesson.exercises.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNextExercise}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-[0_0_18px_rgba(0,240,255,0.35)] active:scale-95 transition-transform flex items-center gap-2"
                  >
                    <span>Bài tập tiếp theo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2.5">
                    {onNextLesson && (
                      <button
                        type="button"
                        onClick={() => {
                          sound.playVictory();
                          onNextLesson();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm md:text-base shadow-[0_0_20px_rgba(0,240,255,0.45)] active:scale-95 transition-transform flex items-center gap-2"
                      >
                        <span>Tiến Sang Hành Tinh Tiếp Theo</span>
                        <Rocket className="w-4 h-4 text-slate-950" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        sound.playVictory();
                        onBack();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-5 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-colors flex items-center gap-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Về Bản Đồ Thiên Hà</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Hint appears ONLY after 4 wrong attempts */}
          {!isAnswerSubmitted && (wrongAttemptsMap[currentExercise.id] || 0) >= 4 && (
            <div className="mt-5 p-4 sm:p-5 bg-amber-950/40 border-2 border-amber-400/60 rounded-2xl text-xs sm:text-sm text-amber-100 animate-fade-in flex items-start gap-3.5 shadow-[0_0_20px_rgba(251,191,36,0.15)] relative z-10">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center text-sm font-black shrink-0 shadow-xs">
                💡
              </div>
              <div className="flex-1">
                <strong className="block font-black text-amber-300 mb-0.5">Gợi ý:</strong>
                <p className="leading-relaxed font-bold text-amber-100">{currentExercise.hint}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
