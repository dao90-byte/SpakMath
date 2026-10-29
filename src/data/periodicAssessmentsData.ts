// Periodic Assessments Data & Thinking Model Checkpoints
// Digitized & structured for Spark Math Grade 3 Curriculum

export interface PeriodicAssessmentStage {
  id: string;
  stageNumber: number;
  title: string;
  focusQuestion: string;
  instructionText: string;
  metacognitiveGuidance: string; // Anti-spoiler thinking prompt
  conceptType: 'visual_model' | 'definition' | 'operation_reasoning' | 'practical_case' | 'mindmap_summary';
}

export interface PeriodicAssessment {
  id: string;
  code: string; // e.g. "ĐK-01"
  title: string;
  subtitle: string;
  thinkingModelName: string; // Tên mô hình tư duy
  stationId: string;
  stationName: string;
  icon: string;
  badgeColor: string;
  prerequisiteLessonIds: string[]; // Cụm bài tập cần hoàn thành trước khi mở khóa
  totalStages: number;
  description: string;
  keyRuleSummary: string[];
  isComprehensive?: boolean; // Bài kiểm tra quy mô lớn
}

export const PERIODIC_ASSESSMENTS: PeriodicAssessment[] = [
  {
    id: 'periodic-comparison-bar-model',
    code: 'ĐK-01',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình So Sánh Hơn - Kém',
    subtitle: 'Khảo sát bản chất đoạn thẳng, khoảng chênh lệch dôi ra và cơ chế phép trừ',
    thinkingModelName: 'Mô hình So Sánh Đoạn Thẳng (Comparison Bar Model)',
    stationId: 'pictograph',
    stationName: 'Trạm 1 & Trạm 2 (Biểu đồ & Thể tích)',
    icon: '📊',
    badgeColor: 'from-amber-500 to-orange-500',
    prerequisiteLessonIds: ['pic-1', 'pic-2', 'pic-3', 'pic-4'],
    totalStages: 5,
    description: 'Kiểm tra xem học sinh có thực sự hiểu: Ít hơn là gì? Nhiều hơn là gì? Tại sao phải dùng phép trừ để tìm phần hơn kém? Và bài toán san sẻ đều.',
    keyRuleSummary: [
      'Đoạn dài biểu diễn Số Lớn; đoạn ngắn biểu diễn Số Bé.',
      'Nhiều hơn là phần dôi ra vượt mức số bé; Ít hơn là khoảng còn thiếu để bằng số lớn.',
      'Phép trừ cắt bỏ phần bằng nhau của hai đại lượng, chỉ để lại duy nhất phần chênh lệch.',
      'Muốn san sẻ để bằng nhau: Rót sang một nửa phần chênh lệch (Chênh lệch : 2).'
    ]
  },
  {
    id: 'periodic-pictograph-ratio',
    code: 'ĐK-02',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Đọc Tỷ Lệ Nhân Biểu Đồ',
    subtitle: 'Khảo sát bản chất quy ước biểu tượng, nhân tỷ lệ và đọc dữ liệu phân tích',
    thinkingModelName: 'Mô hình Quy Ước Biểu Tượng & Bội Số (Pictograph Scaling)',
    stationId: 'pictograph',
    stationName: 'Trạm 1: Biểu Đồ Hình Ảnh',
    icon: '📈',
    badgeColor: 'from-emerald-500 to-teal-600',
    prerequisiteLessonIds: ['pic-5', 'pic-6', 'pic-7', 'pic-8'],
    totalStages: 4,
    description: 'Đánh giá năng lực giải mã biểu tượng: Một hình ảnh đại diện cho nhiều đơn vị thực tế, tư duy nhân bội số và so sánh giữa các nhóm.',
    keyRuleSummary: [
      'Một biểu tượng quy ước mang giá trị của một nhóm đơn vị.',
      'Tổng số lượng = Số lượng biểu tượng × Giá trị quy ước của 1 biểu tượng.',
      'Khi so sánh giữa hai cột: Có thể so sánh số biểu tượng chênh lệch trước khi nhân.'
    ]
  },
  {
    id: 'periodic-volume-fluid-sharing',
    code: 'ĐK-03',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Thể Tích & Dòng Chảy San Sẻ',
    subtitle: 'Khảo sát dung tích bình, mức nước dâng, vật chìm và bảo toàn thể tích',
    thinkingModelName: 'Mô hình Thể Tích Khối Nước & San Sẻ Cân Bằng (Fluid Volume & Equilibrium)',
    stationId: 'volume',
    stationName: 'Trạm 2: Thể Tích & Đơn Vị Lít',
    icon: '💧',
    badgeColor: 'from-sky-500 to-blue-600',
    prerequisiteLessonIds: ['vol-1', 'vol-2', 'vol-3', 'vol-4', 'vol-5'],
    totalStages: 4,
    description: 'Kiểm tra tư duy về dung tích thực tế: San sẻ giữa các bình để đạt cân bằng, tính lượng nước dâng khi thả vật chìm, và công thức bảo toàn thể tích.',
    keyRuleSummary: [
      'Thể tích nước không đổi khi rót qua lại giữa các bình (Định luật bảo toàn thể tích).',
      'Khoảng trống còn lại trong bình = Dung tích tối đa － Lượng nước hiện có.',
      'Khi thả vật chìm: Thể tích nước dâng lên đúng bằng thể tích của vật chìm chiếm chỗ.'
    ]
  },
  {
    id: 'periodic-logic-deduction-sudoku',
    code: 'ĐK-04',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Ma Trận Loại Trừ Suy Luận',
    subtitle: 'Khảo sát quy tắc không trùng lặp, khối zic-zac và suy luận khả dĩ duy nhất',
    thinkingModelName: 'Mô hình Ma Trận Loại Trừ Logic (Sudoku & Elimination Matrix)',
    stationId: 'sudoku',
    stationName: 'Trạm 3: Sudoku & Ma Trận Số',
    icon: '🧩',
    badgeColor: 'from-amber-600 to-yellow-600',
    prerequisiteLessonIds: ['sud-1', 'sud-2', 'sud-3', 'sud-4'],
    totalStages: 4,
    description: 'Đánh giá khả năng tư duy loại trừ: Xác định ô có điều kiện ràng buộc ngặt nghèo nhất, tư duy quét hàng/cột/khối để tìm vị trí duy nhất.',
    keyRuleSummary: [
      'Mỗi hàng, mỗi cột và mỗi khối màu chỉ chứa mỗi phần tử đúng 1 lần duy nhất.',
      'Luôn ưu tiên điền ô thuộc hàng hoặc cột chỉ còn thiếu 1 phần tử duy nhất.',
      'Phương pháp loại trừ: Nếu một hàng đã có các số A, B, C thì ô còn lại bắt buộc là D.'
    ]
  },
  {
    id: 'periodic-queue-intersection-counter',
    code: 'ĐK-05',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Hàng Ngũ & Điểm Giao Bù Trừ',
    subtitle: 'Khảo sát nguyên lý đếm bù trừ, bài toán vị trí trùng và giao điểm hai hàng',
    thinkingModelName: 'Mô hình Bù Trừ Điểm Trùng Hàng Ngũ (Inclusion-Exclusion Queue Model)',
    stationId: 'logic',
    stationName: 'Trạm 5: Vị Trí Hàng Ngũ & Logic',
    icon: '🚶',
    badgeColor: 'from-rose-500 to-pink-600',
    prerequisiteLessonIds: ['log-1', 'log-2', 'log-3', 'log-4'],
    totalStages: 4,
    description: 'Kiểm tra bản chất hiện tượng đếm lặp: Tại sao khi cộng thứ tự từ đầu hàng và cuối hàng ta phải trừ đi 1? Tại sao ở điểm giao chữ L và chữ thập ta phải trừ đi người đứng ở vị trí giao?',
    keyRuleSummary: [
      'Khi một người được đếm cả từ trước ra sau và từ sau ra trước: người đó bị đếm 2 lần!',
      'Tổng số người trong hàng = Thứ tự từ trước ＋ Thứ tự từ sau － 1.',
      'Tại điểm giao của hai hàng (chữ L hoặc chữ thập): Người ở ngã tư thuộc cả hai hàng, nên phải trừ 1 khi tính tổng.'
    ]
  },
  {
    id: 'periodic-grand-comprehensive-arena',
    code: 'ĐK-TỔNG HỢP',
    title: 'BÀI KIỂM TRA ĐỊNH KỲ TỔNG HỢP (QUY MÔ LỚN)',
    subtitle: 'Đấu trường kiểm tra năng lực tư duy liên môn toàn diện Spark Math Lớp 3',
    thinkingModelName: 'Đại Khảo Sát Năng Lực Toán Tư Duy Tổng Thể (Comprehensive Cognitive Arena)',
    stationId: 'challenge',
    stationName: 'Đấu Trường Toàn Năng',
    icon: '🏆',
    badgeColor: 'from-red-600 via-amber-600 to-rose-600',
    prerequisiteLessonIds: ['pic-1', 'vol-1', 'sud-1', 'pat-1', 'log-1'],
    totalStages: 5,
    description: 'Bài kiểm tra quy mô lớn tích hợp cả 5 mô hình tư duy cốt lõi: So sánh hơn kém, Tỷ lệ nhân biểu đồ, Cân bằng dung tích, Loại trừ ma trận và Bù trừ hàng ngũ.',
    keyRuleSummary: [
      'Làm chủ toàn bộ 5 mô hình tư duy toán học nền tảng lớp 3.',
      'Khả năng tự vấn, giải thích nguyên nhân và lựa chọn phép toán chính xác.',
      'Được cấp Chứng Chỉ Tinh Hoa Toán Tư Duy Spark Math sau khi hoàn thành.'
    ],
    isComprehensive: true
  }
];

// Local storage keys
export const STORAGE_KEY_TEACHER_UNLOCKED = 'spark_math_teacher_unlocked_mode';
export const STORAGE_KEY_COMPLETED_PERIODIC = 'spark_math_completed_periodic_assessments';

export function isTeacherUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_TEACHER_UNLOCKED) === 'true';
  } catch {
    return false;
  }
}

export function setTeacherUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      localStorage.setItem(STORAGE_KEY_TEACHER_UNLOCKED, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_TEACHER_UNLOCKED);
    }
    window.dispatchEvent(new Event('spark_math_teacher_unlock_updated'));
  } catch {
    // Ignore
  }
}

export function getCompletedPeriodicIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLETED_PERIODIC);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markPeriodicAssessmentCompleted(id: string): void {
  try {
    const list = getCompletedPeriodicIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(STORAGE_KEY_COMPLETED_PERIODIC, JSON.stringify(list));
      window.dispatchEvent(new Event('spark_math_periodic_updated'));
    }
  } catch {
    // Ignore
  }
}
