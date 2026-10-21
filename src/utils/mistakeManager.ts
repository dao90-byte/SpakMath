/**
 * Mistake Collection & Mastery Management (Sổ Thu Thập Lỗi Sai & Luyện Tập)
 * Specialized educational error-logging, reflective analysis, and mastery system
 * based on Spark Math Singapore Pedagogy.
 */

export interface CollectedMistake {
  id: string;
  lessonId: string;
  lessonTitle: string;
  topicName: string;
  topicId: string;
  questionPrompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  timestamp: number;
  status: 'unresolved' | 'mastered';
  userNote?: string;
  category: 'calculation' | 'concept' | 'reading' | 'other';
  attemptsCount: number;
  options?: string[];
  mascotAvatar?: string;
}

export interface ReportedBug {
  id: string;
  lessonId?: string;
  lessonTitle?: string;
  description: string;
  category: 'typo' | 'logic_error' | 'display' | 'other';
  timestamp: number;
  status: 'sent' | 'reviewed';
}

const STORAGE_KEY = 'spark_math_mistakes';
const BUGS_STORAGE_KEY = 'spark_math_reported_bugs';

let currentContext: {
  lessonId: string;
  lessonTitle: string;
  topicName: string;
  topicId: string;
  mascotAvatar?: string;
} | null = null;

export const setCurrentLessonContext = (ctx: typeof currentContext) => {
  currentContext = ctx;
};

export const getCurrentLessonContext = () => currentContext;

const SEED_MISTAKES: CollectedMistake[] = [
  {
    id: 'seed-1',
    lessonId: 'pic-1',
    lessonTitle: 'Biểu đồ tranh: Tiệm bánh sinh nhật Abby',
    topicName: 'Biểu đồ hình ảnh & Dữ liệu',
    topicId: 'pictograph',
    questionPrompt: 'Có bao nhiêu chiếc bánh kem dâu được bán trong ngày?',
    userAnswer: '3 chiếc',
    correctAnswer: '15 chiếc (3 hình × 5 chiếc/hình)',
    explanation:
      'Lỗi nhầm quy ước biểu tượng: Mỗi hình chiếc bánh đại diện cho 5 chiếc bánh thật. Đếm được 3 hình thì phải làm phép nhân 3 × 5 = 15!',
    timestamp: Date.now() - 3600000 * 2,
    status: 'unresolved',
    userNote: 'Nhớ luôn liếc nhìn ô quy ước ở đầu bảng trước khi đếm!',
    category: 'reading',
    attemptsCount: 1,
    options: ['3 chiếc', '10 chiếc', '15 chiếc', '20 chiếc'],
    mascotAvatar: '🐰'
  },
  {
    id: 'seed-2',
    lessonId: 'lit-1',
    lessonTitle: 'Bình chứa kỳ diệu: So sánh dung tích (Lít)',
    topicName: 'Thể tích & Dung tích',
    topicId: 'volume',
    questionPrompt: 'Bình nào chứa được nhiều nước hơn khi mực nước dâng cao bằng nhau?',
    userAnswer: 'Bình A (vì bình A nhìn cao hơn)',
    correctAnswer: 'Bình B (vì bình B có tiết diện đáy rộng gấp đôi bình A)',
    explanation:
      'Bẫy thị giác về thể tích: Chiều cao chỉ là một yếu tố. Một chiếc bình thấp nhưng có đáy rộng phình to có thể chứa nhiều nước hơn bình cao mà hẹp!',
    timestamp: Date.now() - 3600000 * 5,
    status: 'mastered',
    userNote: 'Quan sát cả độ to của đáy bình nữa.',
    category: 'concept',
    attemptsCount: 2,
    options: ['Bình A', 'Bình B', 'Cả hai bình bằng nhau'],
    mascotAvatar: '🐵'
  }
];

export const getMistakes = (): CollectedMistake[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_MISTAKES));
      return SEED_MISTAKES;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_MISTAKES;
  }
};

const saveMistakes = (mistakes: CollectedMistake[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('spark_math_mistakes_updated'));
    }
  } catch (e) {
    console.error('Failed to save mistakes', e);
  }
};

export const recordMistake = (
  entry: Partial<CollectedMistake> & {
    questionPrompt: string;
    correctAnswer: string;
  }
): CollectedMistake => {
  const list = getMistakes();
  const ctx = currentContext;

  // Check if this exact mistake in this lesson already exists
  const existingIdx = list.findIndex(
    (m) =>
      m.questionPrompt.trim().toLowerCase() === entry.questionPrompt.trim().toLowerCase() &&
      m.lessonId === (entry.lessonId || ctx?.lessonId)
  );

  let result: CollectedMistake;

  if (existingIdx >= 0) {
    const existing = list[existingIdx];
    result = {
      ...existing,
      userAnswer: entry.userAnswer || existing.userAnswer,
      correctAnswer: entry.correctAnswer || existing.correctAnswer,
      explanation: entry.explanation || existing.explanation,
      timestamp: Date.now(),
      status: 'unresolved', // Re-trigger for practice
      attemptsCount: existing.attemptsCount + 1,
      options: entry.options || existing.options,
      category: entry.category || existing.category
    };
    list[existingIdx] = result;
  } else {
    result = {
      id: `err-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      lessonId: entry.lessonId || ctx?.lessonId || 'general',
      lessonTitle: entry.lessonTitle || ctx?.lessonTitle || 'Bài tập toán tư duy',
      topicName: entry.topicName || ctx?.topicName || 'Toán Spark Math',
      topicId: entry.topicId || ctx?.topicId || 'general',
      questionPrompt: entry.questionPrompt,
      userAnswer: entry.userAnswer || 'Chưa trả lời đúng',
      correctAnswer: entry.correctAnswer,
      explanation:
        entry.explanation ||
        'Hãy suy nghĩ cẩn thận về các dữ kiện trong đề bài và quy tắc tính toán của bài này nhé!',
      timestamp: Date.now(),
      status: 'unresolved',
      userNote: entry.userNote || '',
      category: entry.category || 'concept',
      attemptsCount: 1,
      options: entry.options,
      mascotAvatar: entry.mascotAvatar || ctx?.mascotAvatar || '✨'
    };
    list.unshift(result);
  }

  saveMistakes(list);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('spark_math_mistake_toast', {
        detail: {
          message: 'Đã thu thập câu này vào Sổ Lỗi Sai để bạn ôn tập!',
          mistake: result
        }
      })
    );
  }

  return result;
};

export const markMistakeMastered = (id: string) => {
  const list = getMistakes();
  const updated = list.map((m) =>
    m.id === id ? { ...m, status: 'mastered' as const, attemptsCount: m.attemptsCount + 1 } : m
  );
  saveMistakes(updated);
};

export const reopenMistake = (id: string) => {
  const list = getMistakes();
  const updated = list.map((m) =>
    m.id === id ? { ...m, status: 'unresolved' as const } : m
  );
  saveMistakes(updated);
};

export const updateMistakeNote = (id: string, note: string) => {
  const list = getMistakes();
  const updated = list.map((m) => (m.id === id ? { ...m, userNote: note } : m));
  saveMistakes(updated);
};

export const deleteMistake = (id: string) => {
  const list = getMistakes().filter((m) => m.id !== id);
  saveMistakes(list);
};

export const clearMasteredMistakes = () => {
  const list = getMistakes().filter((m) => m.status === 'unresolved');
  saveMistakes(list);
};

export const clearAllMistakes = () => {
  saveMistakes([]);
};

export const getMistakesStats = () => {
  const list = getMistakes();
  const total = list.length;
  const unresolved = list.filter((m) => m.status === 'unresolved').length;
  const mastered = list.filter((m) => m.status === 'mastered').length;
  const masteryRate = total > 0 ? Math.round((mastered / total) * 100) : 100;

  return { total, unresolved, mastered, masteryRate };
};

// User Bug Reporting
export const getReportedBugs = (): ReportedBug[] => {
  try {
    const raw = localStorage.getItem(BUGS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const reportBug = (bug: Omit<ReportedBug, 'id' | 'timestamp' | 'status'>): ReportedBug => {
  const list = getReportedBugs();
  const newBug: ReportedBug = {
    ...bug,
    id: `bug-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
    status: 'sent'
  };
  list.unshift(newBug);
  try {
    localStorage.setItem(BUGS_STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error('Failed to save reported bug', e);
  }
  return newBug;
};
