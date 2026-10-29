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
import { PersistentMistakeDock } from './components/PersistentMistakeDock';
import { sound } from './utils/soundEffects';
import { getMistakesStats } from './utils/mistakeManager';
import { getProgramErrors } from './utils/devErrorCollector';
import { isTeacherUnlocked } from './data/periodicAssessmentsData';
import { Bug } from 'lucide-react';

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
      return saved ? JSON.parse(saved) : ['pic-1']; // First lesson marked done for quick demo feeling
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
      setTotalStars((prev) => prev + 3); // 3 stars per lesson
    }
  };

  const currentLesson: LessonQuestion | undefined = ALL_LESSONS.find(
    (l) => l.id === activeLessonId
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-sky-50/20 to-slate-100/50 flex flex-col font-sans">
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-6">
        {/* Prominent Periodic Assessment Banner */}
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
              className="px-5 py-2.5 rounded-xl bg-white text-orange-600 hover:bg-orange-50 font-black text-xs sm:text-sm whitespace-nowrap shadow-md active:scale-95 transition-transform flex items-center gap-2 shrink-0 self-stretch md:self-auto justify-center"
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
              // Return directly to the last execution station, not the default top home screen
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
      </main>

      {/* In-Screen Scratchpad Modal */}
      <Scratchpad
        isOpen={isScratchpadOpen}
        onClose={() => setIsScratchpadOpen(false)}
      />

      {/* Self Assessment Rubric Modal (Page 41) */}
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

      {/* ALWAYS-VISIBLE Persistent Mistake Notebook & Periodic Assessment Floating Quick Access */}
      <PersistentMistakeDock
        unresolvedCount={unresolvedMistakesCount}
        onOpenMistakes={() => setIsMistakeNotebookOpen(true)}
        onOpenMethodology={() => {
          setActivePeriodicAssessmentId('periodic-comparison-bar-model');
          setIsPeriodicRunnerOpen(true);
        }}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-semibold">
            ✨ Vương Quốc Toán Tư Duy Lớp 3 · Dựa trên tài liệu Spark Math
          </p>
          <div className="flex items-center gap-3 font-medium text-slate-400 flex-wrap justify-center">
            <span>Biểu đồ hình ảnh</span>
            <span>·</span>
            <span>Thể tích (Lít)</span>
            <span>·</span>
            <span>Sudoku & Quy luật</span>
            <span>·</span>
            <span>Logic hàng ngũ</span>
            <span>·</span>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setIsDevConsoleOpen(true);
              }}
              className="text-amber-600 hover:underline font-bold inline-flex items-center gap-1"
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
