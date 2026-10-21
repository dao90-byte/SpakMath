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
import { sound } from './utils/soundEffects';
import { getMistakesStats } from './utils/mistakeManager';
import { getProgramErrors } from './utils/devErrorCollector';
import { Bug } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'map' | 'lessons' | 'assessment'>('map');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [isScratchpadOpen, setIsScratchpadOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const [isMistakeNotebookOpen, setIsMistakeNotebookOpen] = useState(false);
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

    window.addEventListener('spark_math_mistakes_updated', handleMistakeUpdate);
    window.addEventListener('spark_math_dev_error_logged', handleDevErrorUpdate);

    return () => {
      window.removeEventListener('spark_math_mistakes_updated', handleMistakeUpdate);
      window.removeEventListener('spark_math_dev_error_logged', handleDevErrorUpdate);
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
        starsCount={totalStars}
        unresolvedMistakesCount={unresolvedMistakesCount}
        programErrorsCount={programErrorsCount}
      />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-6">
        {activeLessonId && currentLesson ? (
          <LessonContainer
            lesson={currentLesson}
            isCompleted={completedLessonIds.includes(currentLesson.id)}
            onLessonChange={(nextId) => setActiveLessonId(nextId)}
            onBackToMap={() => setActiveLessonId(null)}
            onOpenScratchpad={() => setIsScratchpadOpen(true)}
            onOpenMistakes={() => setIsMistakeNotebookOpen(true)}
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
            onSelectLesson={(lessonId) => {
              setActiveLessonId(lessonId);
            }}
            onSelectTopic={(topicId) => {
              const firstInTopic = ALL_LESSONS.find((l) => l.topicId === topicId);
              if (firstInTopic) {
                setActiveLessonId(firstInTopic.id);
              }
            }}
          />
        ) : (
          <LessonsCatalog
            completedLessonIds={completedLessonIds}
            onSelectLesson={(lessonId) => {
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
