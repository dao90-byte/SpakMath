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
import { VietnamGrade3Hub } from './components/vietnam_grade3/VietnamGrade3Hub';
import { VietnamGrade3LessonRunner } from './components/vietnam_grade3/VietnamGrade3LessonRunner';
import { VietnamGrade3AssessmentModal } from './components/vietnam_grade3/VietnamGrade3AssessmentModal';
import { VIETNAM_GRADE_3_LESSONS, VietnamGrade3Lesson } from './data/vietnamGrade3LessonsData';
import { InMonthDayPlan } from './data/inMonthNovemberData';
import {
  GRADE_3_IN_MONTH_PROGRAMS,
  InMonthMonthProgram,
  getMonthStorageKeys,
} from './data/inMonthGrade3Catalog';
import { InMonthGradeHub } from './components/in_month/InMonthGradeHub';
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
      if (saved === 'thinking' || saved === 'inmonth') {
        return saved;
      }
      return 'inmonth';
    } catch {
      return 'inmonth';
    }
  });

  // IN MONTH Grade 3 multi-month hierarchy state
  // Always open directly into the active/in-progress month on startup
  const ACTIVE_MONTH_STORAGE_KEY = 'spark_math_inmonth_active_month_number';

  const resolveInitialActiveMonthNumber = (): number => {
    try {
      const saved = localStorage.getItem(ACTIVE_MONTH_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (GRADE_3_IN_MONTH_PROGRAMS.some((m) => m.monthNumber === parsed)) {
          return parsed;
        }
      }
      // Auto-detect an in-progress month if none was explicitly stored yet
      for (const prog of GRADE_3_IN_MONTH_PROGRAMS) {
        const keys = getMonthStorageKeys(prog.monthNumber);
        const rawCompleted = localStorage.getItem(keys.completedDaysKey);
        if (rawCompleted) {
          const parsedDays = JSON.parse(rawCompleted);
          const count = Object.keys(parsedDays || {}).length;
          if (count > 0 && count < 30) {
            return prog.monthNumber;
          }
        }
        for (let d = 1; d <= 30; d++) {
          if (localStorage.getItem(keys.dayProgressKey(d))) {
            return prog.monthNumber;
          }
        }
      }
    } catch {
      // Ignore storage errors
    }
    return 11; // Default active month: Tháng 11
  };

  const [lastActiveMonthNumber, setLastActiveMonthNumber] = useState<number>(
    resolveInitialActiveMonthNumber
  );
  const [selectedInMonthNumber, setSelectedInMonthNumber] = useState<number | null>(
    resolveInitialActiveMonthNumber
  );
  const [activeInMonthDay, setActiveInMonthDay] = useState<InMonthDayPlan | null>(null);
  const [isInMonthExamOpen, setIsInMonthExamOpen] = useState<boolean>(false);

  const [inMonthCompletedByMonth, setInMonthCompletedByMonth] = useState<
    Record<number, Record<number, InMonthDayProgress>>
  >(() => {
    const initial: Record<number, Record<number, InMonthDayProgress>> = {};
    GRADE_3_IN_MONTH_PROGRAMS.forEach((prog) => {
      try {
        const saved = localStorage.getItem(
          getMonthStorageKeys(prog.monthNumber).completedDaysKey
        );
        initial[prog.monthNumber] = saved ? JSON.parse(saved) : {};
      } catch {
        initial[prog.monthNumber] = {};
      }
    });
    return initial;
  });

  const [inMonthExamByMonth, setInMonthExamByMonth] = useState<
    Record<number, InMonthExamSavedResult | null>
  >(() => {
    const initial: Record<number, InMonthExamSavedResult | null> = {};
    GRADE_3_IN_MONTH_PROGRAMS.forEach((prog) => {
      try {
        const saved = localStorage.getItem(
          getMonthStorageKeys(prog.monthNumber).examResultKey
        );
        initial[prog.monthNumber] = saved ? JSON.parse(saved) : null;
      } catch {
        initial[prog.monthNumber] = null;
      }
    });
    return initial;
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
      if (vnAssessmentScore !== null) {
        localStorage.setItem('spark_math_vn_assessment_score', JSON.stringify(vnAssessmentScore));
      }
    } catch {
      // Ignore
    }
  }, [programMode, vnCompletedLessonIds, vnAssessmentScore]);

  const handleVnLessonCompleted = (lessonId: string) => {
    if (!vnCompletedLessonIds.includes(lessonId)) {
      setVnCompletedLessonIds((prev) => [...prev, lessonId]);
      setTotalStars((prev) => prev + 3);
    }
  };

  const activeMonthProgram: InMonthMonthProgram | null =
    selectedInMonthNumber !== null
      ? GRADE_3_IN_MONTH_PROGRAMS.find((m) => m.monthNumber === selectedInMonthNumber) || null
      : null;

  const setActiveMonthAndPersist = (monthNumber: number) => {
    setLastActiveMonthNumber(monthNumber);
    setSelectedInMonthNumber(monthNumber);
    try {
      localStorage.setItem(ACTIVE_MONTH_STORAGE_KEY, String(monthNumber));
    } catch {
      // Ignore storage errors
    }
  };

  const handleInMonthDayCompleted = (
    monthNumber: number,
    dayNumber: number,
    score: number,
    totalQuestions: number,
    elapsedSeconds: number
  ) => {
    setInMonthCompletedByMonth((prev) => {
      const monthMap = prev[monthNumber] || {};
      const existing = monthMap[dayNumber];
      const nextMonthMap: Record<number, InMonthDayProgress> = {
        ...monthMap,
        [dayNumber]: {
          day: dayNumber,
          score: existing ? Math.max(existing.score, score) : score,
          totalQuestions,
          elapsedSeconds,
          completedAt: new Date().toLocaleDateString('vi-VN'),
        },
      };
      try {
        localStorage.setItem(
          getMonthStorageKeys(monthNumber).completedDaysKey,
          JSON.stringify(nextMonthMap)
        );
      } catch {
        // Ignore storage write error
      }
      if (!existing) {
        setTotalStars((stars) => stars + 5);
      }
      return {
        ...prev,
        [monthNumber]: nextMonthMap,
      };
    });
  };

  const handleSaveInMonthExamResult = (
    monthNumber: number,
    res: InMonthExamSavedResult
  ) => {
    setInMonthExamByMonth((prev) => ({
      ...prev,
      [monthNumber]: res,
    }));
    try {
      localStorage.setItem(
        getMonthStorageKeys(monthNumber).examResultKey,
        JSON.stringify(res)
      );
    } catch {
      // Ignore storage write error
    }
    setTotalStars((prev) => prev + 10);
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

  return (
    <div className="min-h-screen flex flex-col font-sans relative transition-colors duration-500 bg-[radial-gradient(ellipse_at_15%_12%,_rgba(34,211,238,0.22),_transparent_50%),radial-gradient(ellipse_at_85%_18%,_rgba(217,70,239,0.24),_transparent_52%),radial-gradient(ellipse_at_50%_92%,_rgba(251,191,36,0.14),_transparent_54%),linear-gradient(180deg,_#030618_0%,_#090E34_46%,_#180D44_100%)] text-white selection:bg-cyan-400 selection:text-slate-950">
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
          if (m === 'inmonth') {
            if (
              programMode === 'inmonth' &&
              selectedInMonthNumber !== null &&
              !activeInMonthDay &&
              !isInMonthExamOpen
            ) {
              setSelectedInMonthNumber(null);
            } else {
              setSelectedInMonthNumber(lastActiveMonthNumber);
            }
          } else {
            setSelectedInMonthNumber(null);
            setActiveTab('map');
          }
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
        /* CHƯƠNG TRÌNH IN MONTH — LỚP 3 -> CÁC THÁNG -> 30 NGÀY */
        /* ======================================================== */
        <main className="flex-1 w-full">
          {!activeMonthProgram ? (
            <InMonthGradeHub
              onSelectMonth={(monthProgram) => {
                setActiveMonthAndPersist(monthProgram.monthNumber);
                setActiveInMonthDay(null);
                setIsInMonthExamOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onQuickStartDay={(monthProgram, dayNumber) => {
                const targetDay =
                  monthProgram.days.find((d) => d.dayNumber === dayNumber) ||
                  monthProgram.days[0];
                setActiveMonthAndPersist(monthProgram.monthNumber);
                setActiveInMonthDay(targetDay);
                setIsInMonthExamOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : isInMonthExamOpen ? (
            <InMonthFinalExamModal
              key={activeMonthProgram.monthNumber}
              monthNumber={activeMonthProgram.monthNumber}
              finalExam={activeMonthProgram.finalExam}
              savedResult={inMonthExamByMonth[activeMonthProgram.monthNumber] || null}
              onSaveResult={(res) =>
                handleSaveInMonthExamResult(activeMonthProgram.monthNumber, res)
              }
              onClose={() => {
                setIsInMonthExamOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onJumpToDay={(dayNum) => {
                const found = activeMonthProgram.days.find((d) => d.dayNumber === dayNum);
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
              monthNumber={activeMonthProgram.monthNumber}
              monthLabel={activeMonthProgram.label}
              dayPlan={activeInMonthDay}
              onBack={() => {
                setActiveInMonthDay(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onCompleteDay={(dayNum, score, totalQ, elapsed) =>
                handleInMonthDayCompleted(
                  activeMonthProgram.monthNumber,
                  dayNum,
                  score,
                  totalQ,
                  elapsed
                )
              }
              onSelectNextDay={(nextDayNum) => {
                const nextPlan = activeMonthProgram.days.find(
                  (d) => d.dayNumber === nextDayNum
                );
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
              monthProgram={activeMonthProgram}
              completedDays={inMonthCompletedByMonth[activeMonthProgram.monthNumber] || {}}
              examResult={inMonthExamByMonth[activeMonthProgram.monthNumber] || null}
              onSelectDay={(dayPlan) => {
                setActiveInMonthDay(dayPlan);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenExam={() => {
                setIsInMonthExamOpen(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onBackToGrade={() => {
                setSelectedInMonthNumber(null);
                setActiveInMonthDay(null);
                setIsInMonthExamOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSwitchMonth={(nextMonthProgram) => {
                setActiveMonthAndPersist(nextMonthProgram.monthNumber);
                setActiveInMonthDay(null);
                setIsInMonthExamOpen(false);
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
    </div>
  );
}
