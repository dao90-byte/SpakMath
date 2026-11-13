import React, { useState, useEffect } from 'react';
import { ALL_LESSONS, LessonQuestion } from './data/lessonsData';
import { Navbar } from './components/Navbar';
import { AdventureMap } from './components/AdventureMap';
import { LessonsCatalog } from './components/LessonsCatalog';
import { LessonContainer } from './components/LessonContainer';
import { Scratchpad } from './components/Scratchpad';
import { SelfAssessmentModal } from './components/SelfAssessmentModal';
import { MistakeNotebookModal } from './components/MistakeNotebookModal';
import { DevErrorConsoleModal } from './components/DevErrorConsoleModal';
import { PeriodicAssessmentRunnerModal } from './components/PeriodicAssessmentRunnerModal';
import { PeriodicAssessmentHub } from './components/PeriodicAssessmentHub';
import { TeacherUnlockModal } from './components/TeacherUnlockModal';
import { sound } from './utils/soundEffects';
import { getMistakesStats } from './utils/mistakeManager';
import { getProgramErrors } from './utils/devErrorCollector';
import { isTeacherUnlocked } from './data/periodicAssessmentsData';
import { Bug } from 'lucide-react';
import { VietnamGrade3Hub } from './components/vietnam_grade3/VietnamGrade3Hub';
import { VietnamGrade3LessonRunner } from './components/vietnam_grade3/VietnamGrade3LessonRunner';
import { VietnamGrade3AssessmentModal } from './components/vietnam_grade3/VietnamGrade3AssessmentModal';
import { VIETNAM_GRADE_3_LESSONS, VietnamGrade3Lesson } from './data/vietnamGrade3LessonsData';
import {
  NOVEMBER_IN_MONTH_DAYS,
  InMonthDayPlan,
} from './data/inMonthNovemberData';
import {
  InMonthCalendarHub,
  InMonthDayProgress,
} from './components/in_month/InMonthCalendarHub';
import { InMonthDailyRunner } from './components/in_month/InMonthDailyRunner';
import {
  InMonthFinalExamModal,
  InMonthExamSavedResult,
} from './components/in_month/InMonthFinalExamModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'lessons' | 'periodic' | 'review' | 'assessment'>('map');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [lastActiveLessonId, setLastActiveLessonId] = useState<string | null>(null);
  const [lastActiveTopicId, setLastActiveTopicId] = useState<string | null>(null);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isMistakeNotebookOpen, setIsMistakeNotebookOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isTeacherMode, setIsTeacherMode] = useState<boolean>(() => isTeacherUnlocked());
  const [activePeriodicAssessmentId, setActivePeriodicAssessmentId] = useState<string | null>(null);
  const [isPeriodicRunnerOpen, setIsPeriodicRunnerOpen] = useState(false);
  const [isDevConsoleOpen, setIsDevConsoleOpen] = useState(false);
  const [devConsoleDefaultTab, setDevConsoleDefaultTab] = useState<'list' | 'report'>('list');

  const [unresolvedMistakesCount, setUnresolvedMistakesCount] = useState<number>(() => {
    return getMistakesStats().unresolved;
  });

  const [programErrorsCount, setProgramErrorsCount] = useState<number>(() => {
    return getProgramErrors().length;
  });

  // Program Switcher: 'thinking' (Spark Math) | 'inmonth' (IN MONTH Tháng 11) | 'textbook' (Vũ Trụ SGK 3)
  // Default to 'inmonth' so the newly designed IN MONTH November program is immediately visible
  const [programMode, setProgramMode] = useState<'thinking' | 'textbook' | 'inmonth'>(() => {
    try {
      const saved = localStorage.getItem('spark_math_program_mode_v2');
      if (saved === 'thinking' || saved === 'textbook' || saved === 'inmonth') {
        return saved;
      }
      return 'inmonth';
    } catch {
      return 'inmonth';
    }
  });

  // IN MONTH November state
  const [activeInMonthDay, setActiveInMonthDay] = useState<InMonthDayPlan | null>(null);
  const [isInMonthExamOpen, setIsInMonthExamOpen] = useState<boolean>(false);

  const [inMonthCompletedDays, setInMonthCompletedDays] = useState<Record<number, InMonthDayProgress>>(() => {
    try {
      const saved = localStorage.getItem('spark_math_inmonth_nov_completed_days');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [inMonthExamResult, setInMonthExamResult] = useState<InMonthExamSavedResult | null>(() => {
    try {
      const saved = localStorage.getItem('spark_math_inmonth_nov_exam_result');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activeVnLesson, setActiveVnLesson] = useState<VietnamGrade3Lesson | null>(null);
  const [isVnAssessmentOpen, setIsVnAssessmentOpen] = useState(false);

  const [vnCompletedLessonIds, setVnCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('spark_math_vn_completed_lessons');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [vnAssessmentScore, setVnAssessmentScore] = useState<number | null>(() => {
    try {
      const saved = localStorage.getItem('spark_math_vn_assessment_score');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('spark_math_program_mode_v2', programMode);
      localStorage.setItem('spark_math_vn_completed_lessons', JSON.stringify(vnCompletedLessonIds));
      localStorage.setItem('spark_math_inmonth_nov_completed_days', JSON.stringify(inMonthCompletedDays));
      if (inMonthExamResult !== null) {
        localStorage.setItem('spark_math_inmonth_nov_exam_result', JSON.stringify(inMonthExamResult));
      }
      if (vnAssessmentScore !== null) {
        localStorage.setItem('spark_math_vn_assessment_score', JSON.stringify(vnAssessmentScore));
      }
    } catch {
      // Ignore
    }
  }, [programMode, vnCompletedLessonIds, vnAssessmentScore, inMonthCompletedDays, inMonthExamResult]);

  const handleVnLessonCompleted = (lessonId: string) => {
    if (!vnCompletedLessonIds.includes(lessonId)) {
      setVnCompletedLessonIds((prev) => [...prev, lessonId]);
      setTotalStars((prev) => prev + 3);
    }
  };

  const handleInMonthDayCompleted = (
    dayNumber: number,
    score: number,
    totalQuestions: number,
    elapsedSeconds: number
  ) => {
    const existing = inMonthCompletedDays[dayNumber];
    setInMonthCompletedDays((prev) => ({
      ...prev,
      [dayNumber]: {
        day: dayNumber,
        score: existing ? Math.max(existing.score, score) : score,
        totalQuestions,
        elapsedSeconds,
        completedAt: new Date().toLocaleDateString('vi-VN'),
      },
    }));
    if (!existing) {
      setTotalStars((prev) => prev + 5);
    }
  };

  // Track reactive updates to mistake notebook and programming error collector
  useEffect(() => {
    const handleMistakeUpdate = () => {
      setUnresolvedMistakesCount(getMistakesStats().unresolved);
    };
    const handleDevErrorUpdate = () => {
      setProgramErrorsCount(getProgramErrors().length);
    };
    const handleTeacherUnlockUpdate = () => {
      setIsTeacherMode(isTeacherUnlocked());
    };

    window.addEventListener('spark_math_mistakes_updated', handleMistakeUpdate);
    window.addEventListener('spark_math_dev_error_logged', handleDevErrorUpdate);
    window.addEventListener('spark_math_teacher_unlock_updated', handleTeacherUnlockUpdate);

    return () => {
      window.removeEventListener('spark_math_mistakes_updated', handleMistakeUpdate);
      window.removeEventListener('spark_math_dev_error_logged', handleDevErrorUpdate);
      window.removeEventListener('spark_math_teacher_unlock_updated', handleTeacherUnlockUpdate);
    };
  }, []);

  // Load progress from localStorage
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('spark_math_completed_lessons');
      return saved ? JSON.parse(saved) : ['pic-1'];
    } catch {
      return ['pic-1'];
    }
  });

  const [totalStars, setTotalStars] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('spark_math_stars');
      return saved ? JSON.parse(saved) : 3;
    } catch {
      return 3;
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('spark_math_completed_lessons', JSON.stringify(completedLessonIds));
      localStorage.setItem('spark_math_stars', JSON.stringify(totalStars));
    } catch {
      // Ignore
    }
  }, [completedLessonIds, totalStars]);

  const handleLessonCompleted = (lessonId: string) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
      setTotalStars((prev) => prev + 3);
    }
  };

  const currentLesson: LessonQuestion | undefined = ALL_LESSONS.find(
    (l) => l.id === activeLessonId
  );

  const isCosmicMode = programMode === 'textbook' || programMode === 'inmonth';

  return (
    <div className={`min-h-screen flex flex-col font-sans relative transition-colors duration-500 ${
      isCosmicMode
        ? 'bg-[#060913] text-white selection:bg-cyan-400 selection:text-slate-950'
        : 'bg-gradient-to-b from-amber-50/40 via-sky-50/20 to-slate-100/50 text-slate-800'
    }`}>
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'assessment') {
            setIsAssessmentModalOpen(true);
          } else {
            setActiveTab(tab);
            setActiveLessonId(null);
          }
        }}
        programMode={programMode}
        onToggleProgramMode={(m) => {
          sound.playClick();
          setProgramMode(m);
          setActiveLessonId(null);
          setActiveVnLesson(null);
          setActiveInMonthDay(null);
          setIsInMonthExamOpen(false);
        }}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        onOpenMistakes={() => setIsMistakeNotebookOpen(true)}
        onOpenDevConsole={() => {
          setDevConsoleDefaultTab('list');
          setIsDevConsoleOpen(true);
        }}
        onOpenTeacherUnlock={() => setIsTeacherModalOpen(true)}
        isTeacherMode={isTeacherMode}
        onOpenMethodology={() => {
          setActivePeriodicAssessmentId('periodic-comparison-bar-model');
          setIsPeriodicRunnerOpen(true);
        }}
        starsCount={totalStars}
        unresolvedMistakesCount={unresolvedMistakesCount}
        programErrorsCount={programErrorsCount}
      />

      {/* Main View Area */}
      {programMode === 'inmonth' ? (
        /* ======================================================== */
        /* CHƯƠNG TRÌNH IN MONTH — THÁNG 11 (30 NGÀY SINGAPORE MATH) */
        /* ======================================================== */
        <main className="flex-1 w-full">
          {isInMonthExamOpen ? (
            <InMonthFinalExamModal
              savedResult={inMonthExamResult}
              onSaveResult={(res) => {
                setInMonthExamResult(res);
                setTotalStars((prev) => prev + 10);
              }}
              onClose={() => {
                setIsInMonthExamOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onJumpToDay={(dayNum) => {
                const found = NOVEMBER_IN_MONTH_DAYS.find((d) => d.dayNumber === dayNum);
                if (found) {
                  setIsInMonthExamOpen(false);
                  setActiveInMonthDay(found);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onOpenScratchpad={() => setIsScratchpadOpen(true)}
            />
          ) : activeInMonthDay ? (
            <InMonthDailyRunner
              dayPlan={activeInMonthDay}
              onBack={() => {
                setActiveInMonthDay(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCompleteDay={handleInMonthDayCompleted}
              onSelectNextDay={(nextDayNum) => {
                const nextPlan = NOVEMBER_IN_MONTH_DAYS.find((d) => d.dayNumber === nextDayNum);
                if (nextPlan) {
                  setActiveInMonthDay(nextPlan);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onOpenExam={() => {
                setActiveInMonthDay(null);
                setIsInMonthExamOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenScratchpad={() => setIsScratchpadOpen(true)}
            />
          ) : (
            <InMonthCalendarHub
              completedDays={inMonthCompletedDays}
              examResult={inMonthExamResult}
              onSelectDay={(dayPlan) => {
                setActiveInMonthDay(dayPlan);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenExam={() => {
                setIsInMonthExamOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          )}
        </main>
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-6">
          {programMode === 'textbook' ? (
            /* ======================================================== */
            /* CHƯƠNG TRÌNH TOÁN LỚP 3 TIỂU HỌC VIỆT NAM (KẾT NỐI TRI THỨC) */
            /* ======================================================== */
            activeVnLesson ? (
              <VietnamGrade3LessonRunner
                lesson={activeVnLesson}
                isCompleted={vnCompletedLessonIds.includes(activeVnLesson.id)}
                onBack={() => {
                  setActiveVnLesson(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onLessonCompleted={handleVnLessonCompleted}
                onNextLesson={() => {
                  const currentIdx = VIETNAM_GRADE_3_LESSONS.findIndex((l) => l.id === activeVnLesson.id);
                  if (currentIdx >= 0 && currentIdx < VIETNAM_GRADE_3_LESSONS.length - 1) {
                    const nextL = VIETNAM_GRADE_3_LESSONS[currentIdx + 1];
                    setActiveVnLesson(nextL);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    setActiveVnLesson(null);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              />
            ) : (
              <VietnamGrade3Hub
                completedLessonIds={vnCompletedLessonIds}
                assessmentScore={vnAssessmentScore}
                onSelectLesson={(lesson) => {
                  setActiveVnLesson(lesson);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenAssessment={() => setIsVnAssessmentOpen(true)}
              />
            )
          ) : (
            /* ======================================================== */
            /* CHƯƠNG TRÌNH TOÁN TƯ DUY (SPARK MATH) */
            /* ======================================================== */
            <>
              {!activeLessonId && activeTab === 'map' && (
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-4 border-2 border-amber-300 animate-fade-in">
                  <div className="flex items-center gap-3.5">
                    <span className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl shadow-inner shrink-0 border border-white/20">
                      🧠
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-black/25 text-amber-200 px-2 py-0.5 rounded-full border border-white/20">
                          BÀI KIỂM TRA ĐỊNH KỲ
                        </span>
                        <span className="text-xs text-amber-100 font-bold hidden sm:inline">
                          · Khảo sát phương pháp luận sau cụm bài tập
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black leading-snug">
                        Mô Hình Tư Duy: So Sánh Hơn - Kém (Sơ Đồ Thanh &amp; Bản Chất Phép Trừ)
                      </h3>
                      <p className="text-xs text-amber-100 mt-0.5 leading-relaxed">
                        Khảo sát định kỳ 5 bước: <em>Ít hơn là gì? Nhiều hơn là gì? Vì sao dùng phép trừ? Bình 18L &amp; 12L và bài toán san sẻ nước.</em>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActivePeriodicAssessmentId('periodic-comparison-bar-model');
                      setIsPeriodicRunnerOpen(true);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-black text-xs sm:text-sm whitespace-nowrap shadow-md active:scale-95 transition-transform flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center cursor-pointer"
                  >
                    <span>Vào Bài Kiểm Tra Định Kỳ</span>
                    <span className="text-base">→</span>
                  </button>
                </div>
              )}
              {activeLessonId && currentLesson ? (
                <LessonContainer
                  lesson={currentLesson}
                  isCompleted={completedLessonIds.includes(currentLesson.id)}
                  onLessonChange={(nextId) => {
                    const next = ALL_LESSONS.find((l) => l.id === nextId);
                    if (next) {
                      setLastActiveTopicId(next.topicId);
                    }
                    setLastActiveLessonId(nextId);
                    setActiveLessonId(nextId);
                  }}
                  onBackToMap={() => {
                    setActiveLessonId(null);
                  }}
                  onOpenScratchpad={() => setIsScratchpadOpen(true)}
                  onOpenMistakes={() => setIsMistakeNotebookOpen(true)}
                  onOpenPeriodicAssessment={(id) => {
                    setActivePeriodicAssessmentId(id);
                    setIsPeriodicRunnerOpen(true);
                  }}
                  onOpenTeacherUnlock={() => setIsTeacherModalOpen(true)}
                  onOpenDevConsole={(reportMode) => {
                    setDevConsoleDefaultTab(reportMode ? 'report' : 'list');
                    setIsDevConsoleOpen(true);
                  }}
                  onLessonCompleted={handleLessonCompleted}
                />
              ) : activeTab === 'map' ? (
                <AdventureMap
                  completedLessonIds={completedLessonIds}
                  totalStars={totalStars}
                  initialTopicId={lastActiveTopicId}
                  highlightLessonId={lastActiveLessonId}
                  onOpenPeriodicAssessment={(id) => {
                    setActivePeriodicAssessmentId(id || 'periodic-comparison-bar-model');
                    setIsPeriodicRunnerOpen(true);
                  }}
                  onSelectLesson={(lessonId) => {
                    const l = ALL_LESSONS.find((item) => item.id === lessonId);
                    if (l) {
                      setLastActiveTopicId(l.topicId);
                    }
                    setLastActiveLessonId(lessonId);
                    setActiveLessonId(lessonId);
                  }}
                  onSelectTopic={(topicId) => {
                    setLastActiveTopicId(topicId);
                    const firstInTopic = ALL_LESSONS.find((l) => l.topicId === topicId);
                    if (firstInTopic) {
                      setLastActiveLessonId(firstInTopic.id);
                      setActiveLessonId(firstInTopic.id);
                    }
                  }}
                />
              ) : activeTab === 'periodic' ? (
                <PeriodicAssessmentHub
                  completedLessonIds={completedLessonIds}
                  onStartAssessment={(assessmentId) => {
                    setActivePeriodicAssessmentId(assessmentId);
                    setIsPeriodicRunnerOpen(true);
                  }}
                  onOpenTeacherUnlock={() => setIsTeacherModalOpen(true)}
                  isTeacherMode={isTeacherMode}
                />
              ) : activeTab === 'review' ? (
                <MistakeNotebookModal
                  isOpen={true}
                  isFullPageTab={true}
                  onClose={() => setActiveTab('map')}
                  onOpenMethodology={() => {
                    setActivePeriodicAssessmentId('periodic-comparison-bar-model');
                    setIsPeriodicRunnerOpen(true);
                  }}
                  onSelectLesson={(lessonId) => {
                    const l = ALL_LESSONS.find((item) => item.id === lessonId);
                    if (l) {
                      setLastActiveTopicId(l.topicId);
                    }
                    setLastActiveLessonId(lessonId);
                    setActiveLessonId(lessonId);
                  }}
                  currentLessonId={activeLessonId}
                />
              ) : (
                <LessonsCatalog
                  completedLessonIds={completedLessonIds}
                  onSelectLesson={(lessonId) => {
                    const l = ALL_LESSONS.find((item) => item.id === lessonId);
                    if (l) {
                      setLastActiveTopicId(l.topicId);
                    }
                    setLastActiveLessonId(lessonId);
                    setActiveLessonId(lessonId);
                  }}
                />
              )}
            </>
          )}
        </main>
      )}

      {/* Vietnam Grade 3 Periodic Assessment Modal */}
      <VietnamGrade3AssessmentModal
        isOpen={isVnAssessmentOpen}
        onClose={() => setIsVnAssessmentOpen(false)}
        onCompletedScore={(score) => {
          setVnAssessmentScore(score);
          setTotalStars((prev) => prev + 5);
        }}
      />

      {/* In-Screen Scratchpad Modal */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Self Assessment Rubric Modal */}
      <SelfAssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        onOpenScratchpad={() => setIsScratchpadOpen(true)}
        totalStars={totalStars}
      />

      {/* Mistake Notebook & Mastery Modal */}
      <MistakeNotebookModal
        isOpen={isMistakeNotebookOpen}
        onClose={() => setIsMistakeNotebookOpen(false)}
        onOpenMethodology={() => {
          setActivePeriodicAssessmentId('periodic-comparison-bar-model');
          setIsPeriodicRunnerOpen(true);
        }}
        onSelectLesson={(lessonId) => {
          setActiveLessonId(lessonId);
          setIsMistakeNotebookOpen(false);
        }}
        currentLessonId={activeLessonId}
      />

      {/* Developer & Programming Error Console Modal */}
      <DevErrorConsoleModal
        isOpen={isDevConsoleOpen}
        onClose={() => setIsDevConsoleOpen(false)}
        defaultTab={devConsoleDefaultTab}
        currentLessonId={activeLessonId}
        currentLessonTitle={currentLesson?.title}
      />

      {/* Teacher Unlock Mode Modal */}
      <TeacherUnlockModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        onUnlockedStatusChange={(unlocked) => setIsTeacherMode(unlocked)}
      />

      {/* Periodic Assessment Runner Modal */}
      <PeriodicAssessmentRunnerModal
        isOpen={isPeriodicRunnerOpen}
        assessmentId={activePeriodicAssessmentId || 'periodic-comparison-bar-model'}
        onClose={() => setIsPeriodicRunnerOpen(false)}
      />

      {/* Footer */}
      <footer className={`py-6 text-center text-xs transition-colors duration-500 ${
        isCosmicMode
          ? 'bg-slate-950/90 border-t border-indigo-500/20 text-slate-400 backdrop-blur-md'
          : 'bg-white border-t border-slate-200 text-slate-500 mt-12'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold flex items-center gap-2">
            {programMode === 'inmonth' ? (
              <>
                <span className="text-amber-300">🌌</span>
                <span className="text-slate-200">
                  IN MONTH · Chương Trình Tháng 11 (30 Ngày Toán Tư Duy Chuẩn Singapore &amp; Quốc Tế)
                </span>
              </>
            ) : programMode === 'textbook' ? (
              <>
                <span className="text-cyan-400">🌌</span>
                <span className="text-slate-300">Vũ Trụ Toán 3 · Kết Nối Tri Thức (Chủ Đề 4: Phép Nhân &amp; Phép Chia)</span>
              </>
            ) : (
              <>
                <span>✨</span>
                <span>Vương Quốc Toán Tư Duy Lớp 3 · Dựa trên tài liệu Spark Math</span>
              </>
            )}
          </p>
          <div className="flex items-center gap-3 font-medium text-slate-400 flex-wrap justify-center">
            {programMode === 'inmonth' ? (
              <>
                <span className="text-amber-300 font-bold">Sơ Đồ Thanh CPA</span>
                <span>·</span>
                <span className="text-cyan-300 font-bold">Phép Chia Có Dư</span>
                <span>·</span>
                <span className="text-emerald-300 font-bold">Toán Khoảng Cách</span>
                <span>·</span>
                <span className="text-fuchsia-300 font-bold">Đo Lường &amp; Biểu Đồ</span>
              </>
            ) : programMode === 'textbook' ? (
              <>
                <span className="text-cyan-300 font-bold">7 Hành Tinh Tri Thức</span>
                <span>·</span>
                <span className="text-amber-300 font-bold">Chòm Sao Suy Ngẫm</span>
                <span>·</span>
                <span className="text-emerald-300 font-bold">Trạm Vũ Trụ Định Kỳ</span>
              </>
            ) : (
              <>
                <span>Biểu đồ hình ảnh</span>
                <span>·</span>
                <span>Thể tích (Lít)</span>
                <span>·</span>
                <span>Sudoku &amp; Quy luật</span>
                <span>·</span>
                <span>Logic hàng ngũ</span>
              </>
            )}
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsDevConsoleOpen(true);
              }}
              className="text-amber-400 hover:text-amber-300 hover:underline font-bold inline-flex items-center gap-1 cursor-pointer"
            >
              <Bug className="w-3 h-3" />
              <span>Chẩn đoán lỗi code</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
