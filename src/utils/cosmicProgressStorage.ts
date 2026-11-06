// ============================================================================
// COSMIC PROGRESS PERSISTENCE (LƯU TIẾN TRÌNH THÁM HIỂM VŨ TRỤ TOÁN LỚP 3)
// ============================================================================

export interface PlanetConquestState {
  lessonId: string;
  sgkLessonNumber: number;
  planetName: string;
  planetColor: string;
  isUnlocked: boolean;
  socraticCompleted: boolean;
  exercisesCompletedCount: number;
  totalExercises: number;
  isFullyConquered: boolean;
}

export interface CosmicProgressData {
  unlockedLessons: string[]; // e.g. ['vn3-c4-l23']
  conqueredLessons: string[]; // Fully conquered lessons
  socraticCompletedCards: Record<string, boolean>; // cardId -> true
  exerciseProgress: Record<string, { completedCount: number; totalCount: number; passed: boolean }>;
  assessmentResult?: {
    score: number;
    maxScore: number;
    passed: boolean;
    date: string;
  };
  lastActiveLessonId: string;
  totalStars: number;
}

const STORAGE_KEY = 'grade3_math_cosmic_progress_v1';

export const INITIAL_COSMIC_PROGRESS: CosmicProgressData = {
  unlockedLessons: ['vn3-c4-l23'], // Bài 23 mở sẵn mặc định
  conqueredLessons: [],
  socraticCompletedCards: {},
  exerciseProgress: {},
  lastActiveLessonId: 'vn3-c4-l23',
  totalStars: 0
};

export const PLANETS_METADATA: {
  lessonId: string;
  sgkLessonNumber: number;
  planetName: string;
  planetTitle: string;
  symbol: string;
  orbitRadius: number; // for SVG map rendering
  glowColor: string;
  themeGradient: string;
  accentHex: string;
}[] = [
  {
    lessonId: 'vn3-c4-l23',
    sgkLessonNumber: 23,
    planetName: 'Hành Tinh Phép Nhân',
    planetTitle: 'Nhân 2 chữ số với 1 chữ số',
    symbol: '⚡',
    orbitRadius: 90,
    glowColor: 'from-cyan-400 to-blue-600',
    themeGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    accentHex: '#00F0FF'
  },
  {
    lessonId: 'vn3-c4-l24',
    sgkLessonNumber: 24,
    planetName: 'Hành Tinh Gấp Lần',
    planetTitle: 'Gấp một số lên nhiều lần',
    symbol: '🚀',
    orbitRadius: 130,
    glowColor: 'from-amber-400 to-yellow-600',
    themeGradient: 'from-amber-500/20 via-yellow-500/10 to-transparent',
    accentHex: '#FBBF24'
  },
  {
    lessonId: 'vn3-c4-l25',
    sgkLessonNumber: 25,
    planetName: 'Hành Tinh Số Dư',
    planetTitle: 'Phép chia hết và chia có dư',
    symbol: '🪐',
    orbitRadius: 170,
    glowColor: 'from-emerald-400 to-teal-600',
    themeGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentHex: '#10B981'
  },
  {
    lessonId: 'vn3-c4-l26',
    sgkLessonNumber: 26,
    planetName: 'Hành Tinh Chia Chục',
    planetTitle: 'Chia 2 chữ số cho 1 chữ số',
    symbol: '☄️',
    orbitRadius: 210,
    glowColor: 'from-rose-400 to-pink-600',
    themeGradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
    accentHex: '#F43F5E'
  },
  {
    lessonId: 'vn3-c4-l27',
    sgkLessonNumber: 27,
    planetName: 'Hành Tinh Giảm Lần',
    planetTitle: 'Giảm đi một số lần',
    symbol: '🛸',
    orbitRadius: 250,
    glowColor: 'from-purple-400 to-indigo-600',
    themeGradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    accentHex: '#A855F7'
  },
  {
    lessonId: 'vn3-c4-l28',
    sgkLessonNumber: 28,
    planetName: 'Hành Tinh Cầu Nối',
    planetTitle: 'Bài toán giải bằng 2 bước',
    symbol: '🌌',
    orbitRadius: 290,
    glowColor: 'from-indigo-400 to-sky-600',
    themeGradient: 'from-indigo-500/20 via-sky-500/10 to-transparent',
    accentHex: '#6366F1'
  },
  {
    lessonId: 'vn3-c4-l29',
    sgkLessonNumber: 29,
    planetName: 'Trạm Vũ Trụ Tổng Hợp',
    planetTitle: 'Luyện tập chung toàn vũ trụ',
    symbol: '👑',
    orbitRadius: 330,
    glowColor: 'from-amber-300 via-rose-500 to-purple-600',
    themeGradient: 'from-amber-500/20 via-purple-500/10 to-transparent',
    accentHex: '#E11D48'
  }
];

export function getCosmicProgress(): CosmicProgressData {
  if (typeof window === 'undefined') return INITIAL_COSMIC_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_COSMIC_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_COSMIC_PROGRESS,
      ...parsed,
      unlockedLessons: parsed.unlockedLessons || INITIAL_COSMIC_PROGRESS.unlockedLessons,
      socraticCompletedCards: parsed.socraticCompletedCards || {},
      exerciseProgress: parsed.exerciseProgress || {}
    };
  } catch (e) {
    console.warn('Lỗi đọc tiến trình vũ trụ từ LocalStorage:', e);
    return INITIAL_COSMIC_PROGRESS;
  }
}

export function saveCosmicProgress(progress: CosmicProgressData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn('Lỗi lưu tiến trình vũ trụ vào LocalStorage:', e);
  }
}

export function markSocraticCardUnlocked(lessonId: string, cardId: string): CosmicProgressData {
  const current = getCosmicProgress();
  const next: CosmicProgressData = {
    ...current,
    lastActiveLessonId: lessonId,
    socraticCompletedCards: {
      ...current.socraticCompletedCards,
      [cardId]: true
    },
    totalStars: current.totalStars + 1
  };

  saveCosmicProgress(next);
  return next;
}

export function markExerciseCompleted(
  lessonId: string, 
  completedCount: number, 
  totalCount: number
): CosmicProgressData {
  const current = getCosmicProgress();
  const isPassed = completedCount >= totalCount;
  
  // Calculate next unlocked lesson
  const allLessonIds = PLANETS_METADATA.map(p => p.lessonId);
  const currentIdx = allLessonIds.indexOf(lessonId);
  const nextLessonId = currentIdx >= 0 && currentIdx < allLessonIds.length - 1 
    ? allLessonIds[currentIdx + 1] 
    : null;

  const unlockedSet = new Set(current.unlockedLessons);
  unlockedSet.add(lessonId);
  if (isPassed && nextLessonId) {
    unlockedSet.add(nextLessonId);
  }

  const conqueredSet = new Set(current.conqueredLessons);
  if (isPassed) {
    conqueredSet.add(lessonId);
  }

  const next: CosmicProgressData = {
    ...current,
    lastActiveLessonId: lessonId,
    unlockedLessons: Array.from(unlockedSet),
    conqueredLessons: Array.from(conqueredSet),
    exerciseProgress: {
      ...current.exerciseProgress,
      [lessonId]: {
        completedCount,
        totalCount,
        passed: isPassed
      }
    },
    totalStars: isPassed ? current.totalStars + 3 : current.totalStars + 1
  };

  saveCosmicProgress(next);
  return next;
}

export function saveAssessmentResult(score: number, maxScore: number): CosmicProgressData {
  const current = getCosmicProgress();
  const passed = score >= 7;
  const next: CosmicProgressData = {
    ...current,
    assessmentResult: {
      score,
      maxScore,
      passed,
      date: new Date().toISOString()
    },
    totalStars: passed ? current.totalStars + 10 : current.totalStars + score
  };

  saveCosmicProgress(next);
  return next;
}

export function resetCosmicProgress(): CosmicProgressData {
  saveCosmicProgress(INITIAL_COSMIC_PROGRESS);
  return INITIAL_COSMIC_PROGRESS;
}
