import { attachCPAToQuestion } from '../utils/singaporeCPABuilder';
import {
  InMonthSkillDomain,
  InMonthVisualModelConfig,
} from './inMonthNovemberData';

export interface InMonthWeeklyTestQuestion {
  id: string;
  section: 'calculation' | 'reasoning'; // 6 câu calculation (60đ) + 4 câu reasoning (40đ)
  points: number; // 10 điểm / câu -> 100 điểm tổng
  skillDomain: InMonthSkillDomain;
  relatedDayNumbers: number[];
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  visualModel: InMonthVisualModelConfig;
  // Dành cho phần Nghị luận Tư duy (section === 'reasoning')
  reasoningPrompt?: string;
  reasoningPlaceholder?: string;
  reasoningKeywords?: string[];
  reasoningSampleAnswer?: string;
}

export interface InMonthWeeklyTest {
  id: string;
  monthNumber: number;
  monthLabel: string;
  weekNumber: 1 | 2 | 3 | 4 | 5;
  weekTitle: string;
  triggerAfterDayNumber: number; // Ngày 7, 14, 21, 28, 30
  unlocksWeekNumber?: 2 | 3 | 4 | 5;
  unlocksDayNumber?: number; // Ngày 8, 15, 22, 29
  title: string;
  subtitle: string;
  durationMinutes: number; // 15 phút
  passingScore: number; // 70 điểm (70%)
  questions: InMonthWeeklyTestQuestion[];
}

export interface InMonthWeeklyTestSavedResult {
  weekNumber: number;
  totalScore: number;
  calculationScore: number;
  reasoningScore: number;
  passed: boolean;
  completedAt: string;
  elapsedSeconds: number;
  answers: Record<string, string>;
  reasoningTexts: Record<string, string>;
}

/**
 * Chấm điểm phần tự viết lời giải ngắn trong câu hỏi Nghị luận (tối đa 5 điểm / câu):
 * - Đạt 5/5 điểm nếu trẻ viết từ 6 ký tự trở lên VÀ nêu được ít nhất 1 số liệu/từ khóa cốt lõi của bài toán
 *   (hoặc viết từ 15 ký tự trở lên trình bày rõ ý giải thích).
 * - Đạt 3/5 điểm nếu trẻ có viết giải thích ngắn (từ 4 ký tự trở lên) nhưng thiếu từ khóa số học.
 */
export function evaluateWeeklyReasoningText(
  text: string | undefined,
  keywords: string[] = []
): { points: number; matchedKeywords: string[]; isComplete: boolean } {
  const clean = (text || '').trim().toLowerCase();
  if (!clean) {
    return { points: 0, matchedKeywords: [], isComplete: false };
  }

  const matched = keywords.filter((kw) => clean.includes(kw.toLowerCase()));
  if (clean.length >= 6 && (matched.length >= 1 || clean.length >= 14)) {
    return { points: 5, matchedKeywords: matched, isComplete: true };
  }
  if (clean.length >= 3) {
    return { points: 3, matchedKeywords: matched, isComplete: true };
  }
  return { points: 0, matchedKeywords: [], isComplete: false };
}

// ============================================================================
// BỘ ĐỀ KIỂM TRA 15 PHÚT CUỐI MỖI TUẦN — CHƯƠNG TRÌNH THÁNG 11 (TUẦN 1 .. TUẦN 5)
// (Khuôn mẫu chuẩn cho các tháng tiếp theo: 6 câu Tính toán + 4 câu Nghị luận)
// ============================================================================

const RAW_NOVEMBER_WEEKLY_TESTS: InMonthWeeklyTest[] = [
  // ==========================================================================
  // TUẦN 1 (SAU NGÀY 7): SƠ ĐỒ THANH (BAR MODEL) & TOÁN ĐỐ NHÂN CHIA
  // ==========================================================================
  {
    id: 'nov-weekly-test-w1',
    monthNumber: 11,
    monthLabel: 'Tháng 11',
    weekNumber: 1,
    weekTitle: 'Tuần 1 · Sơ Đồ Thanh (Bar Model)',
    triggerAfterDayNumber: 7,
    unlocksWeekNumber: 2,
    unlocksDayNumber: 8,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 1: Toán Đố Nhân Chia & Sơ Đồ Thanh',
    subtitle: 'Hoàn thành từ 70/100 điểm trở lên để mở khóa các bài học của Tuần 2 (Ngày 8 – 14)',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (6 CÂU - 60 ĐIỂM) ---
      {
        id: 'nov-w1-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [1, 2],
        prompt: '[Tính toán 1] Đội tàu Vũ Trụ Xanh thu thập được 24 viên đá năng lượng. Đội tàu Vũ Trụ Đỏ thu thập được số viên đá gấp 3 lần đội Xanh. Hỏi đội tàu Vũ Trụ Đỏ thu thập được bao nhiêu viên đá năng lượng?',
        options: ['72 viên đá', '64 viên đá', '96 viên đá', '48 viên đá'],
        correctAnswer: '72 viên đá',
        explanation: 'Đội Đỏ gấp 3 lần đội Xanh nên số viên đá của đội Đỏ là: 24 × 3 = 72 (viên đá).',
        visualModel: {
          type: 'bar_model',
          title: 'Đội Xanh (1 phần = 24) · Đội Đỏ (3 phần)',
          bars: [
            { label: 'Đội Xanh', valueLabel: '24 viên', units: 1, color: '#0284C7' },
            { label: 'Đội Đỏ', valueLabel: '? viên (×3)', units: 3, color: '#10B981' },
          ],
        },
      },
      {
        id: 'nov-w1-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [2, 3],
        prompt: '[Tính toán 2] Một trạm không gian dự trữ 84 bình dưỡng khí ở kho lớn. Số bình dưỡng khí ở kho nhỏ giảm đi 4 lần so với kho lớn. Hỏi cả hai kho có tất cả bao nhiêu bình dưỡng khí?',
        options: ['105 bình', '21 bình', '104 bình', '96 bình'],
        correctAnswer: '105 bình',
        explanation: 'Kho nhỏ có: 84 : 4 = 21 (bình). Tổng cả hai kho là: 84 + 21 = 105 (bình).',
        visualModel: {
          type: 'bar_model',
          title: 'Kho lớn: 84 bình (4 phần) · Kho nhỏ: 1 phần',
          bars: [
            { label: 'Kho lớn', valueLabel: '84 bình', units: 4, color: '#7C3AED' },
            { label: 'Kho nhỏ', valueLabel: '? bình (1 phần)', units: 1, color: '#F59E0B' },
          ],
          totalBracketLabel: 'Tổng cả 2 kho = ? bình',
        },
      },
      {
        id: 'nov-w1-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [3, 4],
        prompt: '[Tính toán 3] Hai kệ sách trên trạm nghiên cứu có tổng cộng 96 cuốn sách. Biết kệ thứ nhất có số sách gấp 3 lần kệ thứ hai. Hỏi kệ thứ hai (kệ ít hơn) có bao nhiêu cuốn sách?',
        options: ['24 cuốn sách', '32 cuốn sách', '72 cuốn sách', '28 cuốn sách'],
        correctAnswer: '24 cuốn sách',
        explanation: 'Tổng số phần bằng nhau là: 3 + 1 = 4 (phần). Số sách ở kệ thứ hai (1 phần) là: 96 : 4 = 24 (cuốn sách).',
        visualModel: {
          type: 'bar_model',
          title: 'Tổng 96 cuốn = 3 phần (Kệ 1) + 1 phần (Kệ 2)',
          bars: [
            { label: 'Kệ 1', valueLabel: '3 phần', units: 3, color: '#0284C7' },
            { label: 'Kệ 2', valueLabel: '1 phần = ?', units: 1, color: '#EC4899' },
          ],
          totalBracketLabel: 'Tổng = 96 cuốn sách',
        },
      },
      {
        id: 'nov-w1-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [4, 5],
        prompt: '[Tính toán 4] Số cây táo trong vườn nhiều hơn số cây cam là 54 cây. Biết số cây táo gấp 4 lần số cây cam. Hỏi trong vườn có bao nhiêu cây táo?',
        options: ['72 cây táo', '18 cây táo', '64 cây táo', '90 cây táo'],
        correctAnswer: '72 cây táo',
        explanation: 'Hiệu số phần bằng nhau là: 4 - 1 = 3 (phần). Số cây cam (1 phần) là: 54 : 3 = 18 (cây). Số cây táo là: 18 × 4 = 72 (cây táo).',
        visualModel: {
          type: 'bar_model',
          title: 'Hiệu 54 cây ứng với 4 - 1 = 3 phần bằng nhau',
          bars: [
            { label: 'Cây cam', valueLabel: '? cây (1 phần)', units: 1, color: '#F59E0B' },
            { label: 'Cây táo', valueLabel: '? cây (4 phần)', units: 4, color: '#10B981', highlightNote: 'Hơn 54 cây (3 phần)' },
          ],
          differenceBracketLabel: 'Hiệu = 54 cây',
        },
      },
      {
        id: 'nov-w1-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [5, 6],
        prompt: '[Tính toán 5] Thùng A có 18 lít dầu. Thùng B có số lít dầu nhiều hơn 2 lần số dầu của thùng A là 9 lít. Hỏi thùng B có bao nhiêu lít dầu?',
        options: ['45 lít', '36 lít', '27 lít', '54 lít'],
        correctAnswer: '45 lít',
        explanation: 'Hai lần số dầu thùng A là: 18 × 2 = 36 (lít). Số dầu của thùng B là: 36 + 9 = 45 (lít).',
        visualModel: {
          type: 'bar_model',
          title: 'Thùng B = 2 phần Thùng A (18 L) + thêm 9 L',
          bars: [
            { label: 'Thùng A', valueLabel: '18 L', units: 1, color: '#0284C7' },
            { label: 'Thùng B', valueLabel: '18 × 2 + 9 = ? L', units: 3, color: '#8B5CF6', highlightNote: '+9 L' },
          ],
        },
      },
      {
        id: 'nov-w1-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [6, 7],
        prompt: '[Tính toán 6] An và Bình có tổng cộng 60 nhãn vở. Sau khi An cho Bình 8 nhãn vở thì số nhãn vở của hai bạn bằng nhau. Hỏi lúc đầu An có bao nhiêu nhãn vở?',
        options: ['38 nhãn vở', '22 nhãn vở', '34 nhãn vở', '46 nhãn vở'],
        correctAnswer: '38 nhãn vở',
        explanation: 'Khi bằng nhau, mỗi bạn có: 60 : 2 = 30 (nhãn vở). Lúc đầu An có là: 30 + 8 = 38 (nhãn vở).',
        visualModel: {
          type: 'bar_model',
          title: 'Tổng không đổi = 60 · An cho Bình 8 thì bằng nhau',
          bars: [
            { label: 'An lúc đầu', valueLabel: '? nhãn vở', units: 1, color: '#10B981', highlightNote: 'Cho 8 nhãn' },
            { label: 'Bình lúc đầu', valueLabel: '? nhãn vở', units: 1, color: '#0284C7' },
          ],
          totalBracketLabel: 'Tổng = 60 nhãn vở',
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'nov-w1-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [3, 7],
        prompt: '[Nghị luận 1] Bao gạo lớn nặng gấp 4 lần bao gạo nhỏ, và tổng hai bao nặng 100 kg. Một bạn học sinh lấy 100 : 4 = 25 kg để tìm bao nhỏ. Theo em, cách làm đó đúng hay sai và phải chia cho mấy mới đúng?',
        options: [
          'Sai, vì bao lớn 4 phần và bao nhỏ 1 phần nên tổng cộng có 4 + 1 = 5 phần; phải lấy 100 : 5 = 20 kg.',
          'Đúng, vì đề bài nói gấp 4 lần nên chỉ cần lấy tổng chia cho 4.',
          'Sai, vì phải lấy 100 : (4 - 1) = 3 phần.',
          'Sai, vì phải lấy 100 × 4 = 400 kg.',
        ],
        correctAnswer:
          'Sai, vì bao lớn 4 phần và bao nhỏ 1 phần nên tổng cộng có 4 + 1 = 5 phần; phải lấy 100 : 5 = 20 kg.',
        reasoningPrompt:
          'Em hãy viết ngắn gọn phép tính tìm Tổng số phần bằng nhau và cân nặng của bao gạo nhỏ:',
        reasoningPlaceholder: 'Ví dụ: Tổng số phần là 4 + 1 = 5 phần. Bao nhỏ nặng: 100 : 5 = 20 kg...',
        reasoningKeywords: ['5', '20', '4 + 1', '100 : 5', 'tổng số phần'],
        reasoningSampleAnswer:
          'Tổng số phần bằng nhau là: 4 + 1 = 5 (phần). Bao gạo nhỏ nặng là: 100 : 5 = 20 (kg).',
        explanation:
          'Trong bài toán Tổng - Tỉ trên sơ đồ thanh, khi đại lượng lớn gấp 4 lần đại lượng nhỏ thì tổng số phần là 4 + 1 = 5 phần. Giá trị 1 phần (bao nhỏ) là 100 : 5 = 20 kg.',
        visualModel: {
          type: 'bar_model',
          title: 'Tổng 100 kg ứng với 4 + 1 = ? phần bằng nhau',
          bars: [
            { label: 'Bao nhỏ', valueLabel: '1 phần = ? kg', units: 1, color: '#0284C7' },
            { label: 'Bao lớn', valueLabel: '4 phần = ? kg', units: 4, color: '#10B981' },
          ],
          totalBracketLabel: 'Tổng = 100 kg',
        },
      },
      {
        id: 'nov-w1-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [4, 7],
        prompt: '[Nghị luận 2] Sợi dây dài dài gấp 5 lần sợi dây ngắn và dài hơn sợi dây ngắn 36 m. Vì sao để tìm độ dài sợi dây ngắn, ta lại lấy 36 chia cho 4?',
        options: [
          'Vì sợi dây dài có 5 phần, sợi dây ngắn có 1 phần nên phần hơn 36 m chính là hiệu 5 - 1 = 4 phần bằng nhau.',
          'Vì 36 chia hết cho 4 nên ta chọn số 4.',
          'Vì tổng của hai sợi dây là 4 phần bằng nhau.',
          'Vì sợi dây ngắn được chia làm 4 đoạn nhỏ.',
        ],
        correctAnswer:
          'Vì sợi dây dài có 5 phần, sợi dây ngắn có 1 phần nên phần hơn 36 m chính là hiệu 5 - 1 = 4 phần bằng nhau.',
        reasoningPrompt:
          'Em hãy trình bày lời giải ngắn tìm hiệu số phần và độ dài sợi dây ngắn:',
        reasoningPlaceholder: 'Ví dụ: Hiệu số phần là 5 - 1 = 4 phần. Sợi dây ngắn dài: 36 : 4 = 9 m...',
        reasoningKeywords: ['4', '9', '5 - 1', '36 : 4', 'hiệu'],
        reasoningSampleAnswer:
          'Hiệu số phần bằng nhau là: 5 - 1 = 4 (phần). Độ dài sợi dây ngắn là: 36 : 4 = 9 (m).',
        explanation:
          'Phần chênh lệch 36 m giữa hai thanh trên sơ đồ ứng với hiệu số phần: 5 - 1 = 4 (phần). Vậy 1 phần (dây ngắn) dài 36 : 4 = 9 m.',
        visualModel: {
          type: 'bar_model',
          title: 'Hiệu 36 m ứng với phần hơn trên sơ đồ thanh',
          bars: [
            { label: 'Dây ngắn', valueLabel: '1 phần = ? m', units: 1, color: '#F59E0B' },
            { label: 'Dây dài', valueLabel: '5 phần = ? m', units: 5, color: '#7C3AED', highlightNote: 'Hơn 36 m' },
          ],
          differenceBracketLabel: 'Hiệu = 36 m',
        },
      },
      {
        id: 'nov-w1-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [5, 7],
        prompt: '[Nghị luận 3] Mai có 15 bông hoa. Lan có số hoa kém 3 lần số hoa của Mai là 7 bông. Để tìm số hoa của Lan, em thực hiện các bước lập luận nào?',
        options: [
          'Bước 1 lấy 15 × 3 = 45 (bông) để tìm 3 lần số hoa của Mai; Bước 2 lấy 45 - 7 = 38 (bông) vì kém 7 bông.',
          'Bước 1 lấy 15 : 3 = 5 (bông); Bước 2 lấy 5 - 7.',
          'Bước 1 lấy 15 × 3 = 45 (bông); Bước 2 lấy 45 + 7 = 52 (bông).',
          'Bước 1 lấy 15 - 7 = 8 (bông); Bước 2 lấy 8 × 3 = 24 (bông).',
        ],
        correctAnswer:
          'Bước 1 lấy 15 × 3 = 45 (bông) để tìm 3 lần số hoa của Mai; Bước 2 lấy 45 - 7 = 38 (bông) vì kém 7 bông.',
        reasoningPrompt:
          'Em hãy viết phép tính hoàn chỉnh để tìm số bông hoa của Lan và giải thích vì sao phải trừ 7:',
        reasoningPlaceholder: 'Ví dụ: Ta tính 15 × 3 - 7 = 38 bông hoa, vì kém 3 lần là 7 bông nên phải trừ đi 7...',
        reasoningKeywords: ['38', '45', '15', '7', 'trừ'],
        reasoningSampleAnswer:
          'Ba lần số hoa của Mai là 15 × 3 = 45 (bông). Vì Lan kém mức đó 7 bông nên Lan có: 45 - 7 = 38 (bông).',
        explanation:
          '"Kém 3 lần số hoa của Mai là 7 bông" nghĩa là ít hơn (15 × 3) là 7 bông. Vậy số hoa của Lan = 15 × 3 - 7 = 38 bông.',
        visualModel: {
          type: 'bar_model',
          title: '3 lần hoa của Mai · Lan kém mức đó 7 bông',
          bars: [
            { label: 'Mai', valueLabel: '15 bông', units: 1, color: '#0284C7' },
            { label: 'Lan', valueLabel: '3 phần bớt 7 = ? bông', units: 3, color: '#EC4899', highlightNote: '-7 bông' },
          ],
        },
      },
      {
        id: 'nov-w1-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [6, 7],
        prompt: '[Nghị luận 4] Khi Kho A chuyển sang Kho B 12 tấn thóc thì hai kho có số thóc bằng nhau. Hỏi lúc đầu Kho A nhiều hơn Kho B bao nhiêu tấn thóc và vì sao?',
        options: [
          'Nhiều hơn 24 tấn thóc (12 × 2), vì Kho A giảm 12 tấn còn Kho B lại tăng thêm 12 tấn mới bằng nhau.',
          'Nhiều hơn 12 tấn thóc, vì chuyển đi 12 tấn thì chênh lệch đúng bằng 12 tấn.',
          'Nhiều hơn 6 tấn thóc (12 : 2), vì chia đôi số thóc chuyển đi.',
          'Nhiều hơn 36 tấn thóc (12 × 3).',
        ],
        correctAnswer:
          'Nhiều hơn 24 tấn thóc (12 × 2), vì Kho A giảm 12 tấn còn Kho B lại tăng thêm 12 tấn mới bằng nhau.',
        reasoningPrompt:
          'Em hãy giải thích bằng lời hoặc phép tính vì sao hiệu lúc đầu giữa hai kho gấp đôi số lượng chuyển đi:',
        reasoningPlaceholder: 'Ví dụ: Kho A bớt 12 tấn và Kho B thêm 12 tấn mới bằng nhau nên lúc đầu A hơn B là 12 × 2 = 24 tấn...',
        reasoningKeywords: ['24', '12', 'gấp đôi', '2'],
        reasoningSampleAnswer:
          'Khi Kho A bớt 12 tấn và Kho B nhận thêm 12 tấn thì hai kho bằng nhau. Vậy lúc đầu Kho A hơn Kho B là: 12 × 2 = 24 (tấn).',
        explanation:
          'Trên sơ đồ thanh, khi lấy 1 đoạn (12 tấn) của thanh dài ghép sang thanh ngắn mà hai thanh bằng nhau, thì phần chênh lệch ban đầu gồm 2 đoạn như thế: 12 × 2 = 24 tấn.',
        visualModel: {
          type: 'bar_model',
          title: 'Chuyển 12 tấn từ Kho A sang Kho B thì hai kho bằng nhau',
          bars: [
            { label: 'Kho A', valueLabel: 'Hơn ? tấn', units: 1, color: '#10B981', highlightNote: 'Chuyển 12 tấn' },
            { label: 'Kho B', valueLabel: '1 phần', units: 1, color: '#0284C7' },
          ],
          differenceBracketLabel: 'Hiệu ban đầu = ? tấn',
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 2 (SAU NGÀY 14): PHÉP CHIA CÓ DƯ & QUY LUẬT CHU KỲ
  // ==========================================================================
  {
    id: 'nov-weekly-test-w2',
    monthNumber: 11,
    monthLabel: 'Tháng 11',
    weekNumber: 2,
    weekTitle: 'Tuần 2 · Phép Chia Có Dư',
    triggerAfterDayNumber: 14,
    unlocksWeekNumber: 3,
    unlocksDayNumber: 15,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 2: Phép Chia Có Dư & Chu Kỳ Lặp',
    subtitle: 'Hoàn thành từ 70/100 điểm trở lên để mở khóa các bài học của Tuần 3 (Ngày 15 – 21)',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (6 CÂU - 60 ĐIỂM) ---
      {
        id: 'nov-w2-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [8, 9],
        prompt: '[Tính toán 1] Thực hiện phép chia 59 : 7. Hỏi thương và số dư của phép chia này là bao nhiêu?',
        options: ['Thương 8, dư 3', 'Thương 8, dư 4', 'Thương 7, dư 8', 'Thương 9, dư 2'],
        correctAnswer: 'Thương 8, dư 3',
        explanation: 'Vì 7 × 8 = 56 và 59 - 56 = 3 (3 < 7) nên 59 : 7 được thương là 8, dư 3.',
        visualModel: {
          type: 'remainder_groups',
          title: '59 chia thành các nhóm 7: được 8 nhóm và lẻ 3',
          dividend: 59,
          divisor: 7,
          quotient: 8,
          remainder: 3,
          itemIcon: '⭐',
          groupLabel: 'Nhóm 7 ngôi sao',
        },
      },
      {
        id: 'nov-w2-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [9],
        prompt: '[Tính toán 2] Trong một phép chia cho 8, thương tìm được là 11 và số dư là số dư lớn nhất có thể có. Hỏi số bị chia của phép chia đó là bao nhiêu?',
        options: ['95', '88', '96', '94'],
        correctAnswer: '95',
        explanation: 'Số chia là 8 nên số dư lớn nhất có thể là: 8 - 1 = 7. Số bị chia là: 11 × 8 + 7 = 88 + 7 = 95.',
        visualModel: {
          type: 'remainder_groups',
          title: 'Chia cho 8 ➔ Dư lớn nhất = 7 · Số bị chia = 11 × 8 + 7',
          dividend: 95,
          divisor: 8,
          quotient: 11,
          remainder: 7,
          itemIcon: '🔮',
          groupLabel: 'Nhóm 8 viên ngọc',
        },
      },
      {
        id: 'nov-w2-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [10],
        prompt: '[Tính toán 3] Đoàn thám hiểm có 46 nhà khoa học cần đi qua sông bằng thuyền. Mỗi chiếc thuyền chở được tối đa 6 người (không kể người lái). Hỏi cần ít nhất bao nhiêu chiếc thuyền để chở hết đoàn cùng một lúc?',
        options: ['8 chiếc thuyền', '7 chiếc thuyền', '9 chiếc thuyền', '6 chiếc thuyền'],
        correctAnswer: '8 chiếc thuyền',
        explanation: 'Ta có 46 : 6 = 7 (dư 4 người). 4 người còn lại vẫn cần thêm 1 chiếc thuyền nữa. Vậy cần ít nhất: 7 + 1 = 8 (chiếc thuyền).',
        visualModel: {
          type: 'remainder_groups',
          title: '46 : 6 = 7 thuyền (dư 4 người) ➔ Cần 7 + 1 = 8 thuyền',
          dividend: 46,
          divisor: 6,
          quotient: 7,
          remainder: 4,
          itemIcon: '🧑‍🚀',
          groupLabel: 'Thuyền 6 chỗ',
        },
      },
      {
        id: 'nov-w2-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [11],
        prompt: '[Tính toán 4] Xưởng chế tạo có 62 bánh xe đồ chơi. Mỗi chiếc ô tô mô hình cần lắp đủ 4 bánh xe. Hỏi xưởng lắp được nhiều nhất bao nhiêu chiếc ô tô hoàn chỉnh?',
        options: ['15 chiếc ô tô', '16 chiếc ô tô', '14 chiếc ô tô', '17 chiếc ô tô'],
        correctAnswer: '15 chiếc ô tô',
        explanation: 'Ta có 62 : 4 = 15 (dư 2 bánh xe). Vì 2 bánh xe dư không đủ lắp thêm 1 ô tô nên lắp được nhiều nhất 15 chiếc ô tô.',
        visualModel: {
          type: 'remainder_groups',
          title: '62 : 4 = 15 xe (dư 2 bánh không đủ lắp xe thứ 16)',
          dividend: 62,
          divisor: 4,
          quotient: 15,
          remainder: 2,
          itemIcon: '🛞',
          groupLabel: 'Xe 4 bánh',
        },
      },
      {
        id: 'nov-w2-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [12, 13],
        prompt: '[Tính toán 5] Dãy đèn tín hiệu trên trạm vũ trụ nhấp nháy lặp lại theo thứ tự 4 màu: Đỏ – Vàng – Lục – Lam. Hỏi bóng đèn thứ 35 trong dãy có màu gì?',
        options: ['Màu Lục', 'Màu Lam', 'Màu Vàng', 'Màu Đỏ'],
        correctAnswer: 'Màu Lục',
        explanation: 'Mỗi nhóm chu kỳ có 4 màu. Ta có 35 : 4 = 8 (nhóm) dư 3. Dư 3 ứng với màu thứ 3 trong nhóm là Màu Lục.',
        visualModel: {
          type: 'remainder_groups',
          title: 'Chu kỳ 4 màu (Đỏ-Vàng-Lục-Lam) · 35 : 4 = 8 dư 3 ➔ Màu Lục',
          dividend: 35,
          divisor: 4,
          quotient: 8,
          remainder: 3,
          itemIcon: '💡',
          groupLabel: 'Chu kỳ 4 đèn',
        },
      },
      {
        id: 'nov-w2-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [13, 14],
        prompt: '[Tính toán 6] Một số tự nhiên khi chia cho 6 thì được thương là 9 và dư 4. Hỏi nếu lấy chính số đó đem chia cho 7 thì số dư là bao nhiêu?',
        options: ['2', '3', '1', '4'],
        correctAnswer: '2',
        explanation: 'Số tự nhiên đó là: 9 × 6 + 4 = 58. Khi lấy 58 chia cho 7, ta có: 58 : 7 = 8 (dư 2). Vậy số dư là 2.',
        visualModel: {
          type: 'remainder_groups',
          title: 'Số bị chia = 9 × 6 + 4 = 58 · Lấy 58 : 7 = 8 dư 2',
          dividend: 58,
          divisor: 7,
          quotient: 8,
          remainder: 2,
          itemIcon: '🔢',
          groupLabel: 'Nhóm 7 đơn vị',
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'nov-w2-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [8, 9],
        prompt: '[Nghị luận 1] Bạn Nam làm phép chia 53 : 6 và viết kết quả là "Thương = 7, dư 11". Em hãy nhận xét kết quả của bạn Nam và giải thích quy tắc của số dư.',
        options: [
          'Sai, vì số dư (11) lớn hơn số chia (6); trong phép chia có dư, số dư phải luôn nhỏ hơn số chia nên kết quả đúng là thương 8, dư 5.',
          'Đúng, vì 7 × 6 + 11 = 53.',
          'Sai, vì số dư phải luôn lớn hơn số chia.',
          'Sai, vì 53 chia 6 là phép chia hết.',
        ],
        correctAnswer:
          'Sai, vì số dư (11) lớn hơn số chia (6); trong phép chia có dư, số dư phải luôn nhỏ hơn số chia nên kết quả đúng là thương 8, dư 5.',
        reasoningPrompt:
          'Em hãy giải thích vì sao không thể dư 11 khi chia cho 6 và viết phép chia đúng:',
        reasoningPlaceholder: 'Ví dụ: Vì 11 lớn hơn 6 nên lập thêm được 1 nhóm 6 nữa. Kết quả đúng là 53 : 6 = 8 dư 5...',
        reasoningKeywords: ['nhỏ hơn', '8', '5', '6', '11'],
        reasoningSampleAnswer:
          'Số dư phải luôn nhỏ hơn số chia (6). Vì 11 > 6 nên chia tiếp được 1 lần nữa: 53 : 6 = 8 (dư 5).',
        explanation:
          'Quy tắc bất khả xâm phạm của phép chia có dư là: Số dư < Số chia. Nếu còn dư 11 khi chia cho 6 thì 11 vẫn tách thêm được 1 nhóm 6 và còn dư 5.',
        visualModel: {
          type: 'remainder_groups',
          title: 'Quy tắc vàng: Số dư (5) luôn nhỏ hơn Số chia (6)',
          dividend: 53,
          divisor: 6,
          quotient: 8,
          remainder: 5,
          itemIcon: '⚡',
          groupLabel: 'Nhóm 6',
        },
      },
      {
        id: 'nov-w2-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [10, 11],
        prompt: '[Nghị luận 2] Cùng là phép chia 38 : 5 = 7 (dư 3), nhưng vì sao bài toán "38 học sinh đi đò, mỗi đò chở 5 em" lại đáp số là 8 chuyến đò, còn bài toán "38 m vải may áo, mỗi áo hết 5 m" lại đáp số là 7 chiếc áo?',
        options: [
          'Vì 3 học sinh dư vẫn cần thêm 1 chuyến đò để sang sông (7 + 1 = 8), còn 3 m vải dư không đủ may thêm 1 chiếc áo hoàn chỉnh nên chỉ được 7 áo.',
          'Vì bài toán đi đò luôn cộng thêm 2, còn may áo luôn trừ đi 1.',
          'Vì hai phép chia có thương khác nhau.',
          'Vì 38 chia 5 bằng 8.',
        ],
        correctAnswer:
          'Vì 3 học sinh dư vẫn cần thêm 1 chuyến đò để sang sông (7 + 1 = 8), còn 3 m vải dư không đủ may thêm 1 chiếc áo hoàn chỉnh nên chỉ được 7 áo.',
        reasoningPrompt:
          'Em hãy viết lời giải thích ngắn phân biệt khi nào lấy (Thương + 1) và khi nào giữ nguyên Thương:',
        reasoningPlaceholder: 'Ví dụ: Đi đò dư 3 người vẫn cần thêm 1 đò là 8 đò; còn dư 3m vải không đủ may 1 áo nên chỉ được 7 áo...',
        reasoningKeywords: ['8', '7', '3', 'thêm 1', 'không đủ'],
        reasoningSampleAnswer:
          'Dư 3 học sinh vẫn phải cần thêm 1 chuyến đò (7 + 1 = 8 đò). Còn dư 3 m vải không đủ 5 m để may 1 áo nên chỉ may được 7 áo.',
        explanation:
          'Đây là sự khác biệt cốt lõi giữa bài toán "Cần ít nhất" (làm tròn lên: Thương + 1) và bài toán "Lắp/may được nhiều nhất" (lấy phần nguyên: Thương).',
        visualModel: {
          type: 'remainder_groups',
          title: '38 : 5 = 7 dư 3 · Thuê đò = 8 chuyến vs May áo = 7 áo',
          dividend: 38,
          divisor: 5,
          quotient: 7,
          remainder: 3,
          itemIcon: '🛶',
          groupLabel: 'Nhóm 5',
        },
      },
      {
        id: 'nov-w2-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [12, 13],
        prompt: '[Nghị luận 3] Người ta cắm cờ theo nhóm 5 lá lặp lại: Xanh, Đỏ, Tím, Vàng, Trắng. Khi tìm màu của lá cờ thứ 40, ta thấy 40 : 5 = 8 (dư 0). Vì sao khi phép chia hết (dư 0) thì lá cờ thứ 40 lại mang màu Trắng (màu cuối cùng của nhóm)?',
        options: [
          'Vì dư 0 nghĩa là lá cờ thứ 40 vừa khít kết thúc nhóm thứ 8, nên nó nằm ở vị trí cuối cùng (vị trí thứ 5 - màu Trắng) của chu kỳ.',
          'Vì dư 0 ứng với vị trí đầu tiên là màu Xanh.',
          'Vì mọi lá cờ chẵn đều màu Trắng.',
          'Vì 40 chia 5 dư 5.',
        ],
        correctAnswer:
          'Vì dư 0 nghĩa là lá cờ thứ 40 vừa khít kết thúc nhóm thứ 8, nên nó nằm ở vị trí cuối cùng (vị trí thứ 5 - màu Trắng) của chu kỳ.',
        reasoningPrompt:
          'Em hãy tóm tắt quy tắc tìm phần tử trong bài toán chu kỳ khi phép chia có dư = 0:',
        reasoningPlaceholder: 'Ví dụ: Khi chia hết (dư 0) thì phần tử đó nằm ở vị trí cuối cùng của nhóm chu kỳ (màu Trắng)...',
        reasoningKeywords: ['cuối', 'trắng', 'dư 0', 'chia hết', 'thứ 5'],
        reasoningSampleAnswer:
          'Khi chia hết (dư 0), phần tử thứ 40 chính là phần tử khép lại nhóm thứ 8 nên có màu cuối cùng của chu kỳ là màu Trắng.',
        explanation:
          'Trong bài toán chu kỳ độ dài K: dư 1 ứng với vị trí 1, dư 2 ứng với vị trí 2,..., còn dư 0 (chia hết) luôn ứng với vị trí cuối cùng (vị trí K) của nhóm.',
        visualModel: {
          type: 'remainder_groups',
          title: '40 : 5 = 8 (dư 0) ➔ Vị trí cuối cùng của nhóm 5 (Màu Trắng)',
          dividend: 40,
          divisor: 5,
          quotient: 8,
          remainder: 0,
          itemIcon: '🏳️',
          groupLabel: 'Chu kỳ 5 cờ',
        },
      },
      {
        id: 'nov-w2-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [13, 14],
        prompt: '[Nghị luận 4] Để xếp các giỏ quà Tết mà mỗi giỏ cần đủ: 3 hộp bánh, 4 gói kẹo và 2 chai nước. Hiện kho có 20 hộp bánh, 25 gói kẹo và 15 chai nước. Làm thế nào để biết xếp được tối đa bao nhiêu giỏ quà đủ cả 3 món?',
        options: [
          'Chia riêng từng loại (20:3 = 6 dư 2; 25:4 = 6 dư 1; 15:2 = 7 dư 1) rồi chọn thương nhỏ nhất là 6 giỏ quà.',
          'Cộng tất cả lại (20 + 25 + 15 = 60) rồi chia cho (3 + 4 + 2 = 9).',
          'Chọn thương lớn nhất trong 3 phép chia là 7 giỏ quà.',
          'Lấy 20 - 3 = 17 giỏ quà.',
        ],
        correctAnswer:
          'Chia riêng từng loại (20:3 = 6 dư 2; 25:4 = 6 dư 1; 15:2 = 7 dư 1) rồi chọn thương nhỏ nhất là 6 giỏ quà.',
        reasoningPrompt:
          'Em hãy giải thích vì sao ta chỉ xếp được 6 giỏ quà mà không xếp được 7 giỏ quà:',
        reasoningPlaceholder: 'Ví dụ: Vì bánh và kẹo chỉ đủ cho 6 giỏ (20:3=6 dư 2, 25:4=6 dư 1) nên dù nước đủ 7 giỏ cũng chỉ ghép được 6 giỏ...',
        reasoningKeywords: ['6', 'nhỏ nhất', 'bánh', 'kẹo', 'không đủ'],
        reasoningSampleAnswer:
          'Bánh đủ cho 6 giỏ (20 : 3 = 6 dư 2), kẹo đủ cho 6 giỏ (25 : 4 = 6 dư 1), nước đủ cho 7 giỏ. Phải lấy theo số ít nhất nên chỉ xếp được 6 giỏ quà.',
        explanation:
          'Một giỏ quà hoàn chỉnh cần đủ cả 3 thành phần, nên số giỏ quà tối đa bị giới hạn bởi thành phần hết trước (thương nhỏ nhất trong các phép chia = 6 giỏ).',
        visualModel: {
          type: 'remainder_groups',
          title: 'Bánh: 6 giỏ · Kẹo: 6 giỏ · Nước: 7 giỏ ➔ Tối đa 6 giỏ đủ bộ',
          dividend: 20,
          divisor: 3,
          quotient: 6,
          remainder: 2,
          itemIcon: '🎁',
          groupLabel: 'Giỏ quà đủ bộ',
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 3 (SAU NGÀY 21): TOÁN KHOẢNG CÁCH (TRỒNG CÂY, CƯA GỖ, CẦU THANG)
  // ==========================================================================
  {
    id: 'nov-weekly-test-w3',
    monthNumber: 11,
    monthLabel: 'Tháng 11',
    weekNumber: 3,
    weekTitle: 'Tuần 3 · Toán Khoảng Cách',
    triggerAfterDayNumber: 21,
    unlocksWeekNumber: 4,
    unlocksDayNumber: 22,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 3: Toán Đố Khoảng Cách & Ứng Dụng',
    subtitle: 'Hoàn thành từ 70/100 điểm trở lên để mở khóa các bài học của Tuần 4 (Ngày 22 – 28)',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (6 CÂU - 60 ĐIỂM) ---
      {
        id: 'nov-w3-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [15, 16],
        prompt: '[Tính toán 1] Dọc theo một bên đường dài 45 m, người ta trồng các cây xanh cách đều nhau 5 m. Biết cả hai đầu đường đều có trồng cây. Hỏi trên bên đường đó có tất cả bao nhiêu cây xanh?',
        options: ['10 cây', '9 cây', '8 cây', '11 cây'],
        correctAnswer: '10 cây',
        explanation: 'Số khoảng cách 5 m là: 45 : 5 = 9 (khoảng). Vì trồng cây ở cả hai đầu đường nên số cây là: 9 + 1 = 10 (cây).',
        visualModel: {
          type: 'interval_model',
          title: 'Trồng cả 2 đầu: Số cây = (45 : 5) + 1 = 10 cây',
          intervalSubtype: 'both_ends',
          totalLength: 45,
          stepLength: 5,
          intervalsCount: 9,
          objectsCount: 10,
          objectIcon: '🌳',
          unitLabel: 'm',
        },
      },
      {
        id: 'nov-w3-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [17],
        prompt: '[Tính toán 2] Giữa hai tòa nhà cách nhau 36 m, người ta đặt các trụ đèn trang trí cách đều nhau 4 m. Biết ở sát vách hai tòa nhà (hai đầu đoạn đường) KHÔNG đặt trụ đèn. Hỏi có tất cả bao nhiêu trụ đèn?',
        options: ['8 trụ đèn', '9 trụ đèn', '10 trụ đèn', '7 trụ đèn'],
        correctAnswer: '8 trụ đèn',
        explanation: 'Số khoảng cách là: 36 : 4 = 9 (khoảng). Vì hai đầu không đặt trụ đèn nên số trụ đèn là: 9 - 1 = 8 (trụ đèn).',
        visualModel: {
          type: 'interval_model',
          title: 'Không đặt ở 2 đầu: Số trụ = (36 : 4) - 1 = 8 trụ',
          intervalSubtype: 'neither_end',
          totalLength: 36,
          stepLength: 4,
          intervalsCount: 9,
          objectsCount: 8,
          objectIcon: '🏮',
          unitLabel: 'm',
        },
      },
      {
        id: 'nov-w3-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [18],
        prompt: '[Tính toán 3] Xung quanh một hồ nước hình tròn có chu vi 80 m, người ta trồng các cây liễu cách đều nhau 5 m. Hỏi xung quanh hồ có tất cả bao nhiêu cây liễu?',
        options: ['16 cây liễu', '17 cây liễu', '15 cây liễu', '18 cây liễu'],
        correctAnswer: '16 cây liễu',
        explanation: 'Trên đường khép kín (hình tròn), số cây đúng bằng số khoảng cách: 80 : 5 = 16 (cây liễu).',
        visualModel: {
          type: 'interval_model',
          title: 'Đường khép kín (hồ tròn): Số cây = Số khoảng = 80 : 5 = 16',
          intervalSubtype: 'closed_loop',
          totalLength: 80,
          stepLength: 5,
          intervalsCount: 16,
          objectsCount: 16,
          objectIcon: '🌿',
          unitLabel: 'm',
        },
      },
      {
        id: 'nov-w3-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [19],
        prompt: '[Tính toán 4] Bác thợ mộc cần cưa một khúc gỗ dài 28 dm thành các đoạn ngắn bằng nhau, mỗi đoạn dài 4 dm. Biết mỗi lần cưa hết 3 phút. Hỏi bác cần bao nhiêu phút để cưa xong khúc gỗ đó?',
        options: ['18 phút', '21 phút', '15 phút', '24 phút'],
        correctAnswer: '18 phút',
        explanation: 'Số đoạn gỗ cưa được là: 28 : 4 = 7 (đoạn). Số lần cưa là: 7 - 1 = 6 (lần cưa). Thời gian cưa là: 6 × 3 = 18 (phút).',
        visualModel: {
          type: 'interval_model',
          title: '7 đoạn gỗ ➔ Chỉ cần 7 - 1 = 6 mạch cưa × 3 phút = 18 phút',
          intervalSubtype: 'wood_cuts',
          totalLength: 28,
          stepLength: 4,
          intervalsCount: 7,
          objectsCount: 6,
          objectIcon: '🪚',
          unitLabel: 'dm',
        },
      },
      {
        id: 'nov-w3-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [20],
        prompt: '[Tính toán 5] Bạn Minh đi bộ theo cầu thang từ tầng 1 lên tầng 5 của tòa nhà. Biết giữa hai tầng liên tiếp có 18 bậc thang. Hỏi bạn Minh đã bước qua tất cả bao nhiêu bậc thang?',
        options: ['72 bậc thang', '90 bậc thang', '54 bậc thang', '80 bậc thang'],
        correctAnswer: '72 bậc thang',
        explanation: 'Từ tầng 1 lên tầng 5 có số khoảng tầng là: 5 - 1 = 4 (khoảng tầng). Tổng số bậc thang phải leo là: 18 × 4 = 72 (bậc thang).',
        visualModel: {
          type: 'interval_model',
          title: 'Tầng 1 ➔ Tầng 5 có (5 - 1) = 4 khoảng tầng × 18 bậc',
          intervalSubtype: 'stairs',
          totalLength: 72,
          stepLength: 18,
          intervalsCount: 4,
          objectsCount: 5,
          objectIcon: '🏢',
          unitLabel: 'bậc',
        },
      },
      {
        id: 'nov-w3-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [21],
        prompt: '[Tính toán 6] Một hàng có 9 lá cờ cắm thẳng hàng và cách đều nhau. Khoảng cách từ lá cờ thứ nhất đến lá cờ thứ 9 là 48 m. Hỏi hai lá cờ liên tiếp cách nhau bao nhiêu mét?',
        options: ['6 m', '5 m', '8 m', '7 m'],
        correctAnswer: '6 m',
        explanation: 'Từ lá cờ thứ nhất đến lá cờ thứ 9 có số khoảng cách là: 9 - 1 = 8 (khoảng). Độ dài mỗi khoảng là: 48 : 8 = 6 (m).',
        visualModel: {
          type: 'interval_model',
          title: '9 lá cờ tạo ra (9 - 1) = 8 khoảng cách · 48 : 8 = 6 m',
          intervalSubtype: 'both_ends',
          totalLength: 48,
          stepLength: 6,
          intervalsCount: 8,
          objectsCount: 9,
          objectIcon: '🚩',
          unitLabel: 'm',
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'nov-w3-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [15, 16, 17],
        prompt: '[Nghị luận 1] Trên cùng một đoạn đường dài 30 m với khoảng cách 5 m (có 30 : 5 = 6 khoảng), vì sao trồng cây ở cả 2 đầu đường lại có 7 cây, còn không trồng ở 2 đầu đường lại chỉ có 5 cây?',
        options: [
          'Vì trồng 2 đầu thì mỗi khoảng có 1 cây đầu và thêm 1 cây chốt ở cuối (6 + 1 = 7), còn bỏ trống 2 đầu thì mất đi 2 điểm mốc đầu-cuối nên chỉ còn (6 - 1 = 5) cây.',
          'Vì trồng 2 đầu đường thì khoảng cách tự động ngắn lại.',
          'Vì 30 chia 5 lúc thì bằng 7, lúc thì bằng 5.',
          'Vì cây ở giữa lớn hơn cây ở hai đầu.',
        ],
        correctAnswer:
          'Vì trồng 2 đầu thì mỗi khoảng có 1 cây đầu và thêm 1 cây chốt ở cuối (6 + 1 = 7), còn bỏ trống 2 đầu thì mất đi 2 điểm mốc đầu-cuối nên chỉ còn (6 - 1 = 5) cây.',
        reasoningPrompt:
          'Em hãy viết công thức liên hệ giữa Số cây và Số khoảng cho 2 trường hợp (Trồng 2 đầu & Không trồng 2 đầu):',
        reasoningPlaceholder: 'Ví dụ: Trồng 2 đầu: Số cây = Số khoảng + 1 (6+1=7). Không trồng 2 đầu: Số cây = Số khoảng - 1 (6-1=5)...',
        reasoningKeywords: ['+ 1', '- 1', '7', '5', 'khoảng'],
        reasoningSampleAnswer:
          'Số khoảng là 30 : 5 = 6. Trồng 2 đầu thì Số cây = Số khoảng + 1 = 7 cây. Không trồng 2 đầu thì Số cây = Số khoảng - 1 = 5 cây.',
        explanation:
          'Cốt lõi của toán trồng cây thẳng hàng nằm ở 2 điểm mút đầu - cuối: Có đủ 2 đầu thì (+1), chỉ có 1 đầu thì giữ nguyên (= Số khoảng), bỏ cả 2 đầu thì (-1).',
        visualModel: {
          type: 'interval_model',
          title: '6 khoảng cách: Trồng 2 đầu = 7 cây · Bỏ 2 đầu = 5 cây',
          intervalSubtype: 'both_ends',
          totalLength: 30,
          stepLength: 5,
          intervalsCount: 6,
          objectsCount: 7,
          objectIcon: '🌲',
          unitLabel: 'm',
        },
      },
      {
        id: 'nov-w3-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [19],
        prompt: '[Nghị luận 2] Khi cưa một thanh gỗ thành 6 đoạn rời nhau, vì sao bác thợ mộc chỉ cần thực hiện 5 lần cưa mà không phải 6 lần cưa?',
        options: [
          'Vì mỗi lần cưa tạo thêm 1 đoạn mới, và lần cưa thứ 5 (áp chót) đã đồng thời tách rời cả đoạn thứ 5 lẫn đoạn thứ 6 cuối cùng.',
          'Vì đoạn gỗ đầu tiên không cần cưa đã tự rời ra.',
          'Vì máy cưa cắt được 2 đoạn cùng lúc.',
          'Vì thanh gỗ tự gãy ở đoạn cuối.',
        ],
        correctAnswer:
          'Vì mỗi lần cưa tạo thêm 1 đoạn mới, và lần cưa thứ 5 (áp chót) đã đồng thời tách rời cả đoạn thứ 5 lẫn đoạn thứ 6 cuối cùng.',
        reasoningPrompt:
          'Em hãy nêu quy tắc tính Số lần cưa theo Số đoạn gỗ và giải thích ngắn gọn:',
        reasoningPlaceholder: 'Ví dụ: Số lần cưa = Số đoạn - 1 (6 - 1 = 5 lần), vì nhát cưa cuối tách đôi thành 2 đoạn cuối...',
        reasoningKeywords: ['5', '6 - 1', 'cuối', 'số đoạn'],
        reasoningSampleAnswer:
          'Quy tắc: Số lần cưa = Số đoạn - 1 = 6 - 1 = 5 (lần cưa), vì lần cưa thứ 5 đã tách phần gỗ còn lại thành 2 đoạn cuối cùng.',
        explanation:
          'Mạch cưa nằm ở vị trí điểm chia bên trong thanh gỗ (tương tự bài toán không trồng cây ở 2 đầu), nên Số lần cưa = Số đoạn - 1.',
        visualModel: {
          type: 'interval_model',
          title: 'Cưa thành 6 đoạn ➔ Chỉ cần 6 - 1 = 5 mạch cưa',
          intervalSubtype: 'wood_cuts',
          totalLength: 30,
          stepLength: 5,
          intervalsCount: 6,
          objectsCount: 5,
          objectIcon: '🪚',
          unitLabel: 'dm',
        },
      },
      {
        id: 'nov-w3-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [20],
        prompt: '[Nghị luận 3] Một chiếc đồng hồ quả lắc cứ đánh 4 tiếng chuông thì mất 9 giây (tính từ tiếng thứ nhất đến tiếng thứ tư). Một bạn tính 1 tiếng chuông là 9 : 4, cách tính đó sai ở đâu và đánh 6 tiếng chuông mất bao nhiêu giây?',
        options: [
          'Sai vì thời gian chờ nằm ở khoảng nghỉ giữa các tiếng chuông (4 tiếng chỉ có 4 - 1 = 3 khoảng nghỉ, mỗi khoảng 9 : 3 = 3 giây). Đánh 6 tiếng có 5 khoảng nghỉ nên mất 5 × 3 = 15 giây.',
          'Đúng, mỗi tiếng chuông mất 2 giây.',
          'Sai vì phải lấy 9 × 6 = 54 giây.',
          'Sai vì 6 tiếng chuông có 6 khoảng nghỉ nên mất 18 giây.',
        ],
        correctAnswer:
          'Sai vì thời gian chờ nằm ở khoảng nghỉ giữa các tiếng chuông (4 tiếng chỉ có 4 - 1 = 3 khoảng nghỉ, mỗi khoảng 9 : 3 = 3 giây). Đánh 6 tiếng có 5 khoảng nghỉ nên mất 5 × 3 = 15 giây.',
        reasoningPrompt:
          'Em hãy viết các bước tính thời gian đồng hồ đánh 6 tiếng chuông theo số khoảng nghỉ:',
        reasoningPlaceholder: 'Ví dụ: 4 tiếng có 3 khoảng nghỉ -> 1 khoảng = 9 : 3 = 3 giây. 6 tiếng có 5 khoảng nghỉ -> 5 × 3 = 15 giây...',
        reasoningKeywords: ['3', '5', '15', 'khoảng'],
        reasoningSampleAnswer:
          '4 tiếng chuông có 4 - 1 = 3 khoảng nghỉ; 1 khoảng nghỉ mất 9 : 3 = 3 (giây). Đánh 6 tiếng có 6 - 1 = 5 khoảng nghỉ, mất: 5 × 3 = 15 (giây).',
        explanation:
          'Tiếng chuông thứ nhất vang lên ở giây 0. Thời gian 9 giây là tổng của (4 - 1 = 3) khoảng chờ giữa các tiếng chuông.',
        visualModel: {
          type: 'interval_model',
          title: '4 tiếng = 3 khoảng (9 giây ➔ 3s/khoảng) · 6 tiếng = 5 khoảng (15 giây)',
          intervalSubtype: 'both_ends',
          totalLength: 15,
          stepLength: 3,
          intervalsCount: 5,
          objectsCount: 6,
          objectIcon: '🔔',
          unitLabel: 'giây',
        },
      },
      {
        id: 'nov-w3-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [18, 21],
        prompt: '[Nghị luận 4] Vì sao khi trồng cây quanh một hồ nước khép kín (hình tròn hoặc hình chữ nhật), Số cây lại luôn BẰNG Số khoảng cách mà không cần cộng 1 hay trừ 1?',
        options: [
          'Vì khi uốn đoạn thẳng thành vòng khép kín, điểm đầu và điểm cuối chập trùng vào nhau làm một, nên mỗi cây tương ứng đúng 1 khoảng cách liền sau nó.',
          'Vì hồ nước không có chiều dài.',
          'Vì cây trồng quanh hồ cách nhau xa hơn.',
          'Vì số cây quanh hồ luôn là số chẵn.',
        ],
        correctAnswer:
          'Vì khi uốn đoạn thẳng thành vòng khép kín, điểm đầu và điểm cuối chập trùng vào nhau làm một, nên mỗi cây tương ứng đúng 1 khoảng cách liền sau nó.',
        reasoningPrompt:
          'Em hãy giải thích ngắn gọn điều gì xảy ra với 2 đầu đoạn đường khi khép kín thành vòng tròn:',
        reasoningPlaceholder: 'Ví dụ: Điểm đầu và điểm cuối chập làm một nên Số cây luôn bằng Số khoảng cách...',
        reasoningKeywords: ['trùng', 'chập', 'bằng', 'khoảng', 'khép kín'],
        reasoningSampleAnswer:
          'Khi khép kín thành vòng tròn, điểm đầu và điểm cuối trùng khít vào nhau nên mỗi cây đi kèm đúng 1 khoảng cách: Số cây = Số khoảng.',
        explanation:
          'Trên đường thẳng trồng 2 đầu có (K + 1) điểm mốc vì điểm đầu và điểm cuối tách rời; khi nối 2 đầu lại thành vòng khép kín, 2 điểm mốc đầu-cuối chập thành 1 nên còn đúng K điểm mốc.',
        visualModel: {
          type: 'interval_model',
          title: 'Đường khép kín: Điểm đầu trùng điểm cuối ➔ Số cây = Số khoảng',
          intervalSubtype: 'closed_loop',
          totalLength: 60,
          stepLength: 5,
          intervalsCount: 12,
          objectsCount: 12,
          objectIcon: '🌴',
          unitLabel: 'm',
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 4 (SAU NGÀY 28): ĐO LƯỜNG (KM-M-CM, KG-G, L-ML) & BIỂU ĐỒ
  // ==========================================================================
  {
    id: 'nov-weekly-test-w4',
    monthNumber: 11,
    monthLabel: 'Tháng 11',
    weekNumber: 4,
    weekTitle: 'Tuần 4 · Đo Lường & Biểu Đồ',
    triggerAfterDayNumber: 28,
    unlocksWeekNumber: 5,
    unlocksDayNumber: 29,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 4: Đo Lường Độ Dài, Khối Lượng, Thể Tích',
    subtitle: 'Hoàn thành từ 70/100 điểm trở lên để mở khóa các bài học của Tuần 5 (Ngày 29 – 30)',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (6 CÂU - 60 ĐIỂM) ---
      {
        id: 'nov-w4-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [22, 23],
        prompt: '[Tính toán 1] Rô-bốt thám hiểm đi từ Trạm A đến Trạm B dài 2 km 350 m, rồi đi tiếp từ Trạm B đến Trạm C dài 1 km 650 m. Hỏi tổng quãng đường rô-bốt đã đi dài bao nhiêu mét?',
        options: ['4000 m', '3900 m', '4100 m', '3000 m'],
        correctAnswer: '4000 m',
        explanation: 'Đổi 2 km 350 m = 2350 m; 1 km 650 m = 1650 m. Tổng quãng đường là: 2350 + 1650 = 4000 (m).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'length_scale',
          title: '2350 m + 1650 m = 4000 m (4 km)',
          primaryReading: 'AB = 2 km 350 m (2350 m)',
          secondaryReading: 'BC = 1 km 650 m (1650 m)',
          conversionRule: '1 km = 1000 m',
        },
      },
      {
        id: 'nov-w4-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [24],
        prompt: '[Tính toán 2] Trên đĩa cân bên trái có 1 bao bột mì và 1 quả cân 300 g. Trên đĩa cân bên phải có 2 quả cân 1 kg. Khi cân thăng bằng, hỏi bao bột mì nặng bao nhiêu gam?',
        options: ['1700 g', '1300 g', '2300 g', '700 g'],
        correctAnswer: '1700 g',
        explanation: 'Đổi 2 quả cân 1 kg = 2000 g. Khi cân thăng bằng, bao bột mì nặng là: 2000 - 300 = 1700 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Trái (Bột + 300 g) = Phải (2000 g) ➔ Bột = 1700 g',
          primaryReading: 'Đĩa phải: 2 kg = 2000 g',
          secondaryReading: 'Đĩa trái: Bột + 300 g',
          conversionRule: '1 kg = 1000 g',
        },
      },
      {
        id: 'nov-w4-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [25],
        prompt: '[Tính toán 3] Một bình thủy tinh khi đựng đầy mật ong thì cân nặng 1500 g. Khi rót ra một nửa lượng mật ong trong bình thì cả bình và mật ong còn lại nặng 900 g. Hỏi riêng vỏ bình thủy tinh rỗng nặng bao nhiêu gam?',
        options: ['300 g', '600 g', '400 g', '200 g'],
        correctAnswer: '300 g',
        explanation: 'Một nửa lượng mật ong nặng là: 1500 - 900 = 600 (g). Vậy vỏ bình thủy tinh rỗng nặng là: 900 - 600 = 300 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Nửa mật ong = 1500 - 900 = 600 g ➔ Vỏ bình = 900 - 600 = 300 g',
          primaryReading: 'Đầy bình: 1500 g',
          secondaryReading: 'Nửa bình: 900 g',
          conversionRule: 'Vỏ bình = Cân nửa bình (900 g) - Nửa mật ong (600 g)',
        },
      },
      {
        id: 'nov-w4-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26],
        prompt: '[Tính toán 4] Từ một bình đựng 3 L nước cam, mẹ rót đầy vào 4 cốc nhỏ, mỗi cốc chứa 450 mL. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước cam?',
        options: ['1200 mL', '1800 mL', '1400 mL', '1500 mL'],
        correctAnswer: '1200 mL',
        explanation: 'Đổi 3 L = 3000 mL. Lượng nước cam rót vào 4 cốc là: 450 × 4 = 1800 (mL). Trong bình còn lại: 3000 - 1800 = 1200 (mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: '3000 mL - (450 mL × 4) = 1200 mL',
          primaryReading: 'Ban đầu: 3 L = 3000 mL',
          secondaryReading: 'Đã rót 4 cốc: 1800 mL',
          conversionRule: '1 L = 1000 mL',
        },
      },
      {
        id: 'nov-w4-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26, 27],
        prompt: '[Tính toán 5] Hai thanh nẹp sắt mỗi thanh dài 50 cm được hàn nối tiếp nhau. Phần chồng khít lên nhau ở mối hàn dài 6 cm. Hỏi thanh sắt sau khi hàn dài bao nhiêu xăng-ti-mét?',
        options: ['94 cm', '100 cm', '88 cm', '96 cm'],
        correctAnswer: '94 cm',
        explanation: 'Tổng độ dài 2 thanh là: 50 + 50 = 100 (cm). Trừ đi 1 mối nối chồng lên nhau 6 cm, thanh ghép dài: 100 - 6 = 94 (cm).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'length_scale',
          title: 'Hai thanh 50 cm chồng lên nhau 6 cm: 100 - 6 = 94 cm',
          primaryReading: '2 thanh rời: 50 × 2 = 100 cm',
          secondaryReading: 'Mối nối chồng: 6 cm',
          conversionRule: 'Độ dài ghép = Tổng độ dài - Phần chồng lấn',
        },
      },
      {
        id: 'nov-w4-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [27, 28],
        prompt: '[Tính toán 6] Biểu đồ ghi nhận lượng mưa 3 ngày: Thứ Hai mưa 45 mm, Thứ Ba mưa gấp đôi Thứ Hai, Thứ Tư mưa ít hơn Thứ Ba 25 mm. Hỏi Thứ Tư lượng mưa là bao nhiêu mi-li-mét?',
        options: ['65 mm', '90 mm', '70 mm', '55 mm'],
        correctAnswer: '65 mm',
        explanation: 'Thứ Ba mưa là: 45 × 2 = 90 (mm). Thứ Tư mưa là: 90 - 25 = 65 (mm).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'length_chart',
          title: 'Biểu đồ lượng mưa 3 ngày (Thứ Hai: 45 mm)',
          chartItems: [
            { label: 'Thứ Hai', value: 45, unit: 'mm', color: '#0284C7' },
            { label: 'Thứ Ba', value: 90, unit: 'mm', color: '#10B981', masked: true },
            { label: 'Thứ Tư', value: 65, unit: 'mm', color: '#F59E0B', masked: true },
          ],
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'nov-w4-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [22, 24, 26],
        prompt: '[Nghị luận 1] Khi tính hiệu giữa "2 L nước" và "600 mL nước", một bạn viết ngay phép tính 2 - 600 (hoặc 600 - 2 = 598). Em hãy chỉ ra lỗi sai và nêu quy tắc bắt buộc khi tính toán với các số đo.',
        options: [
          'Sai vì hai số đo chưa cùng đơn vị (L và mL); bắt buộc phải đổi 2 L = 2000 mL rồi mới lấy 2000 - 600 = 1400 mL.',
          'Đúng, chỉ cần lấy số lớn trừ số bé là 600 - 2 = 598 mL.',
          'Sai vì 1 L chỉ bằng 100 mL.',
          'Sai vì không thể trừ thể tích cho nhau.',
        ],
        correctAnswer:
          'Sai vì hai số đo chưa cùng đơn vị (L và mL); bắt buộc phải đổi 2 L = 2000 mL rồi mới lấy 2000 - 600 = 1400 mL.',
        reasoningPrompt:
          'Em hãy viết bước đổi đơn vị và phép tính đúng để tìm lượng nước còn lại:',
        reasoningPlaceholder: 'Ví dụ: Đổi 2 L = 2000 mL. Phép tính đúng là: 2000 - 600 = 1400 mL...',
        reasoningKeywords: ['2000', '1400', 'đổi', 'cùng đơn vị'],
        reasoningSampleAnswer:
          'Phải đổi về cùng đơn vị đo: 2 L = 2000 mL. Lượng nước còn lại là: 2000 - 600 = 1400 (mL).',
        explanation:
          'Mọi phép cộng, trừ, so sánh đại lượng đo lường đều yêu cầu đưa về cùng một đơn vị đo (1 L = 1000 mL; 1 km = 1000 m; 1 kg = 1000 g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Đổi cùng đơn vị: 2 L = 2000 mL ➔ 2000 - 600 = 1400 mL',
          primaryReading: '2 L = 2000 mL',
          secondaryReading: 'Trừ 600 mL = 1400 mL',
          conversionRule: 'Quy tắc vàng: Đổi về cùng đơn vị trước khi cộng trừ',
        },
      },
      {
        id: 'nov-w4-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [25],
        prompt: '[Nghị luận 2] Một hộp bánh đầy cân nặng 800 g. Sau khi ăn hết một nửa số bánh trong hộp thì hộp bánh còn nặng 450 g. Vì sao một nửa số bánh chỉ nặng 800 - 450 = 350 g chứ không phải 800 : 2 = 400 g?',
        options: [
          'Vì 800 g bao gồm cả vỏ hộp và bánh; khi ăn một nửa số bánh thì vỏ hộp vẫn còn nguyên, nên phần giảm đi (800 - 450 = 350 g) chính là khối lượng của riêng một nửa số bánh.',
          'Vì cái cân bị lệch 50 g.',
          'Vì nửa số bánh sau nặng hơn nửa số bánh đầu.',
          'Vì vỏ hộp tự nhẹ đi một nửa.',
        ],
        correctAnswer:
          'Vì 800 g bao gồm cả vỏ hộp và bánh; khi ăn một nửa số bánh thì vỏ hộp vẫn còn nguyên, nên phần giảm đi (800 - 450 = 350 g) chính là khối lượng của riêng một nửa số bánh.',
        reasoningPrompt:
          'Từ nửa số bánh nặng 350 g, em hãy tính tiếp xem cả số bánh và riêng vỏ hộp nặng bao nhiêu gam:',
        reasoningPlaceholder: 'Ví dụ: Nửa số bánh = 350g -> Cả số bánh = 350 × 2 = 700g. Vỏ hộp nặng: 800 - 700 = 100g...',
        reasoningKeywords: ['350', '700', '100', 'vỏ hộp'],
        reasoningSampleAnswer:
          'Nửa số bánh nặng 800 - 450 = 350 (g). Cả số bánh nặng 350 × 2 = 700 (g). Vỏ hộp rỗng nặng: 800 - 700 = 100 (g).',
        explanation:
          'Nếu lấy 800 : 2 = 400 g thì ta đã vô tình chia đôi cả vỏ hộp! Vỏ hộp không đổi nên hiệu (800 - 450 = 350 g) là nửa ruột bánh, từ đó vỏ hộp = 450 - 350 = 100 g.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Đầy hộp (800 g) - Nửa hộp (450 g) = Nửa bánh (350 g) ➔ Vỏ = 100 g',
          primaryReading: 'Vỏ + 2 phần bánh = 800 g',
          secondaryReading: 'Vỏ + 1 phần bánh = 450 g',
          conversionRule: '1 phần bánh = 350 g · Vỏ hộp = 100 g',
        },
      },
      {
        id: 'nov-w4-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26, 28],
        prompt: '[Nghị luận 3] Khi dán nối tiếp 4 băng giấy mỗi băng dài 30 cm thành một băng giấy dài, biết mỗi chỗ dán chồng lên nhau 2 cm. Vì sao ta chỉ trừ đi 3 chỗ dán (3 × 2 = 6 cm) mà không trừ 4 chỗ dán?',
        options: [
          'Vì ghép 4 băng giấy thẳng hàng chỉ có 4 - 1 = 3 điểm tiếp giáp giữa các băng giấy liền kề, nên chỉ có 3 mối dán chồng lên nhau.',
          'Vì băng giấy cuối cùng không cần dán.',
          'Vì mỗi băng giấy tự dài thêm 2 cm.',
          'Vì 4 chia 2 bằng 2.',
        ],
        correctAnswer:
          'Vì ghép 4 băng giấy thẳng hàng chỉ có 4 - 1 = 3 điểm tiếp giáp giữa các băng giấy liền kề, nên chỉ có 3 mối dán chồng lên nhau.',
        reasoningPrompt:
          'Em hãy viết phép tính tìm độ dài băng giấy ghép từ 4 băng giấy trên:',
        reasoningPlaceholder: 'Ví dụ: Tổng 4 băng là 30 × 4 = 120 cm. Trừ 3 mối dán (3 × 2 = 6 cm) còn: 120 - 6 = 114 cm...',
        reasoningKeywords: ['120', '6', '114', '3'],
        reasoningSampleAnswer:
          'Tổng 4 băng giấy là 30 × 4 = 120 (cm). Có 4 - 1 = 3 mối dán mất 3 × 2 = 6 (cm). Băng giấy ghép dài: 120 - 6 = 114 (cm).',
        explanation:
          'Ghép N thanh thẳng hàng luôn tạo ra (N - 1) mối nối chồng lấn. Với 4 băng giấy, có 3 mối nối chồng 2 cm nên độ dài thực tế là 120 - 6 = 114 cm.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'length_scale',
          title: '4 băng giấy (120 cm) có 3 mối dán (6 cm) ➔ Dài 114 cm',
          primaryReading: 'Tổng 4 băng: 120 cm',
          secondaryReading: '3 mối dán: 3 × 2 = 6 cm',
          conversionRule: 'Ghép N đoạn thẳng hàng có (N - 1) mối nối',
        },
      },
      {
        id: 'nov-w4-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [24, 28],
        prompt: '[Nghị luận 4] Biết 1 quả dưa hấu nặng bằng 3 quả bưởi, và 1 quả bưởi nặng bằng 4 quả táo (mỗi quả táo nặng 200 g). Em lập luận như thế nào để tìm khối lượng của 1 quả dưa hấu?',
        options: [
          'Bước 1 tìm số quả táo nặng bằng 1 quả dưa hấu (3 × 4 = 12 quả táo); Bước 2 lấy 200 g × 12 = 2400 g (hoặc tìm 1 quả bưởi = 800 g rồi nhân 3).',
          'Lấy 3 + 4 = 7 quả táo rồi nhân với 200 g = 1400 g.',
          'Lấy 200 g × 3 = 600 g.',
          'Lấy 200 g × 4 = 800 g.',
        ],
        correctAnswer:
          'Bước 1 tìm số quả táo nặng bằng 1 quả dưa hấu (3 × 4 = 12 quả táo); Bước 2 lấy 200 g × 12 = 2400 g (hoặc tìm 1 quả bưởi = 800 g rồi nhân 3).',
        reasoningPrompt:
          'Em hãy trình bày phép tính bắc cầu để tìm cân nặng của 1 quả dưa hấu:',
        reasoningPlaceholder: 'Ví dụ: 1 quả bưởi nặng 200 × 4 = 800 g. Vậy 1 quả dưa hấu nặng: 800 × 3 = 2400 g...',
        reasoningKeywords: ['800', '2400', '12', 'bưởi'],
        reasoningSampleAnswer:
          '1 quả bưởi nặng là: 200 × 4 = 800 (g). 1 quả dưa hấu nặng bằng 3 quả bưởi nên nặng: 800 × 3 = 2400 (g).',
        explanation:
          'Phương pháp thế (bắc cầu) trên cân thăng bằng: 1 dưa hấu = 3 bưởi = 3 × (4 táo) = 12 táo = 12 × 200 g = 2400 g.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: '1 Dưa hấu = 3 Bưởi = 12 Táo = 2400 g',
          primaryReading: '1 Bưởi = 4 × 200 g = 800 g',
          secondaryReading: '1 Dưa = 3 × 800 g = 2400 g',
          conversionRule: 'Suy luận bắc cầu qua đại lượng trung gian',
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 5 (SAU NGÀY 30): TỔNG ÔN CHIẾN LƯỢC THÁNG 11
  // ==========================================================================
  {
    id: 'nov-weekly-test-w5',
    monthNumber: 11,
    monthLabel: 'Tháng 11',
    weekNumber: 5,
    weekTitle: 'Tuần 5 · Tổng Ôn Tháng 11',
    triggerAfterDayNumber: 30,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 5: Tổng Duyệt Chiến Lược Tháng 11',
    subtitle: 'Hoàn thành từ 70/100 điểm trở lên để hoàn tất trọn vẹn 5/5 Tuần và bước vào Kỳ Thi Cuối Tháng 11',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (6 CÂU - 60 ĐIỂM) ---
      {
        id: 'nov-w5-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [3, 29],
        prompt: '[Tính toán 1] Hai đội phi hành gia thu thập được tổng cộng 120 mẫu khoáng thạch. Đội Sao Kim thu thập được số mẫu gấp 4 lần đội Sao Hỏa. Hỏi đội Sao Kim thu thập được bao nhiêu mẫu khoáng thạch?',
        options: ['96 mẫu', '24 mẫu', '90 mẫu', '100 mẫu'],
        correctAnswer: '96 mẫu',
        explanation: 'Tổng số phần bằng nhau là: 4 + 1 = 5 (phần). Đội Sao Hỏa có: 120 : 5 = 24 (mẫu). Đội Sao Kim có: 24 × 4 = 96 (mẫu).',
        visualModel: {
          type: 'bar_model',
          title: 'Tổng 120 mẫu = 4 phần (Sao Kim) + 1 phần (Sao Hỏa)',
          bars: [
            { label: 'Sao Hỏa', valueLabel: '? mẫu (1 phần)', units: 1, color: '#0284C7' },
            { label: 'Sao Kim', valueLabel: '? mẫu (4 phần)', units: 4, color: '#10B981' },
          ],
          totalBracketLabel: 'Tổng = 120 mẫu',
        },
      },
      {
        id: 'nov-w5-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [10, 29],
        prompt: '[Tính toán 2] Có 75 hành khách cần đi cáp treo lên đỉnh núi, mỗi cabin chở được tối đa 8 người. Hỏi cần ít nhất bao nhiêu cabin để chở hết số hành khách đó?',
        options: ['10 cabin', '9 cabin', '11 cabin', '8 cabin'],
        correctAnswer: '10 cabin',
        explanation: 'Ta có 75 : 8 = 9 (dư 3 người). 3 người còn lại cần thêm 1 cabin nữa. Vậy cần ít nhất: 9 + 1 = 10 (cabin).',
        visualModel: {
          type: 'remainder_groups',
          title: '75 : 8 = 9 cabin (dư 3 người) ➔ Cần 9 + 1 = 10 cabin',
          dividend: 75,
          divisor: 8,
          quotient: 9,
          remainder: 3,
          itemIcon: '🚡',
          groupLabel: 'Cabin 8 chỗ',
        },
      },
      {
        id: 'nov-w5-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [16, 30],
        prompt: '[Tính toán 3] Dọc theo HAI BÊN một cây cầu dài 40 m, người ta gắn các ngọn đèn pha cách đều nhau 5 m (cả hai đầu cầu đều gắn đèn). Hỏi trên cả hai bên thành cầu có tất cả bao nhiêu ngọn đèn pha?',
        options: ['18 ngọn đèn', '9 ngọn đèn', '16 ngọn đèn', '20 ngọn đèn'],
        correctAnswer: '18 ngọn đèn',
        explanation: 'Mỗi bên cầu có số đèn là: (40 : 5) + 1 = 8 + 1 = 9 (ngọn đèn). Cả hai bên cầu có: 9 × 2 = 18 (ngọn đèn).',
        visualModel: {
          type: 'interval_model',
          title: 'Mỗi bên: (40 : 5) + 1 = 9 đèn · Hai bên: 9 × 2 = 18 đèn',
          intervalSubtype: 'both_ends',
          totalLength: 40,
          stepLength: 5,
          intervalsCount: 8,
          objectsCount: 9,
          objectIcon: '💡',
          unitLabel: 'm',
        },
      },
      {
        id: 'nov-w5-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [25, 30],
        prompt: '[Tính toán 4] Một can nhựa đựng đầy nước mắm cân nặng 11 kg. Sau khi rót ra một nửa lượng nước mắm thì can còn lại nặng 6 kg. Hỏi riêng vỏ can nhựa rỗng nặng bao nhiêu ki-lô-gam?',
        options: ['1 kg', '2 kg', '3 kg', '5 kg'],
        correctAnswer: '1 kg',
        explanation: 'Nửa lượng nước mắm nặng là: 11 - 6 = 5 (kg). Vậy vỏ can nhựa rỗng nặng là: 6 - 5 = 1 (kg).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Nửa nước mắm = 11 - 6 = 5 kg ➔ Vỏ can = 6 - 5 = 1 kg',
          primaryReading: 'Đầy can: 11 kg',
          secondaryReading: 'Nửa can: 6 kg',
          conversionRule: 'Vỏ can = 6 kg - 5 kg = 1 kg',
        },
      },
      {
        id: 'nov-w5-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [12, 30],
        prompt: '[Tính toán 5] Hôm nay là Thứ Năm. Hỏi 30 ngày nữa (kể từ hôm nay) sẽ là Thứ mấy trong tuần?',
        options: ['Thứ Bảy', 'Chủ Nhật', 'Thứ Sáu', 'Thứ Tư'],
        correctAnswer: 'Thứ Bảy',
        explanation: 'Mỗi tuần có 7 ngày lặp lại. Ta có 30 : 7 = 4 (tuần) dư 2 (ngày). Đếm tiếp 2 ngày từ Thứ Năm là: Thứ Sáu (dư 1), Thứ Bảy (dư 2).',
        visualModel: {
          type: 'remainder_groups',
          title: 'Chu kỳ 7 ngày trong tuần · 30 : 7 = 4 tuần dư 2 ngày ➔ Thứ Bảy',
          dividend: 30,
          divisor: 7,
          quotient: 4,
          remainder: 2,
          itemIcon: '📅',
          groupLabel: 'Tuần 7 ngày',
        },
      },
      {
        id: 'nov-w5-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [19, 30],
        prompt: '[Tính toán 6] Một khúc gỗ dài 3 m 6 dm được cưa thành các đoạn bằng nhau, mỗi đoạn dài 6 dm. Mỗi lần cưa mất 4 phút. Hỏi cưa xong khúc gỗ đó hết bao nhiêu phút?',
        options: ['20 phút', '24 phút', '16 phút', '18 phút'],
        correctAnswer: '20 phút',
        explanation: 'Đổi 3 m 6 dm = 36 dm. Số đoạn gỗ là: 36 : 6 = 6 (đoạn). Số lần cưa là: 6 - 1 = 5 (lần). Thời gian cưa là: 5 × 4 = 20 (phút).',
        visualModel: {
          type: 'interval_model',
          title: '36 dm : 6 dm = 6 đoạn ➔ 5 lần cưa × 4 phút = 20 phút',
          intervalSubtype: 'wood_cuts',
          totalLength: 36,
          stepLength: 6,
          intervalsCount: 6,
          objectsCount: 5,
          objectIcon: '🪚',
          unitLabel: 'dm',
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'nov-w5-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [4, 29],
        prompt: '[Nghị luận 1] Năm nay bố 36 tuổi, con 6 tuổi (bố hơn con 30 tuổi). Một bạn nói rằng 4 năm nữa bố sẽ hơn con 34 tuổi. Lập luận của bạn đó đúng hay sai và khi tuổi bố gấp 4 lần tuổi con thì con bao nhiêu tuổi?',
        options: [
          'Sai vì hiệu số tuổi giữa hai người không bao giờ thay đổi theo thời gian (luôn là 30 tuổi). Khi bố gấp 4 lần con, hiệu 30 tuổi ứng với 4 - 1 = 3 phần nên tuổi con là 30 : 3 = 10 tuổi.',
          'Đúng vì sau 4 năm hiệu số tuổi tăng thêm 4.',
          'Sai vì hiệu số tuổi giảm đi 4 còn 26 tuổi.',
          'Khi bố gấp 4 lần con thì con 9 tuổi.',
        ],
        correctAnswer:
          'Sai vì hiệu số tuổi giữa hai người không bao giờ thay đổi theo thời gian (luôn là 30 tuổi). Khi bố gấp 4 lần con, hiệu 30 tuổi ứng với 4 - 1 = 3 phần nên tuổi con là 30 : 3 = 10 tuổi.',
        reasoningPrompt:
          'Em hãy giải thích vì sao hiệu số tuổi của bố và con luôn bằng 30 và tính tuổi con khi bố gấp 4 lần con:',
        reasoningPlaceholder: 'Ví dụ: Mỗi năm bố và con cùng tăng 1 tuổi nên hiệu luôn là 30 tuổi. Khi bố gấp 4 lần con: 30 : (4 - 1) = 10 tuổi...',
        reasoningKeywords: ['30', '10', 'không đổi', '3'],
        reasoningSampleAnswer:
          'Mỗi năm cả bố và con cùng tăng thêm 1 tuổi nên hiệu số tuổi luôn bằng 36 - 6 = 30 (tuổi). Khi bố gấp 4 lần con, hiệu số phần là 4 - 1 = 3 (phần), lúc đó con: 30 : 3 = 10 (tuổi).',
        explanation:
          'Quy luật bất biến của toán tuổi tác: Hiệu số tuổi giữa hai người không đổi theo thời gian (= 30 tuổi). Khi tỉ số là 4:1, hiệu 3 phần ứng với 30 tuổi ➔ Con 10 tuổi.',
        visualModel: {
          type: 'bar_model',
          title: 'Hiệu tuổi không đổi = 30 tuổi (4 phần - 1 phần)',
          bars: [
            { label: 'Tuổi con', valueLabel: '1 phần = ? tuổi', units: 1, color: '#0284C7' },
            { label: 'Tuổi bố', valueLabel: '4 phần = ? tuổi', units: 4, color: '#10B981', highlightNote: 'Hơn 30 tuổi' },
          ],
          differenceBracketLabel: 'Hiệu luôn = 30 tuổi',
        },
      },
      {
        id: 'nov-w5-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [9, 29],
        prompt: '[Nghị luận 2] Khi chia một số tự nhiên A cho 9 thì còn dư 5. Hỏi phải thêm vào A ít nhất bao nhiêu đơn vị (hoặc bớt đi ít nhất bao nhiêu đơn vị) để phép chia trở thành phép chia hết?',
        options: [
          'Bớt đi ít nhất 5 đơn vị (bằng chính số dư) hoặc thêm vào ít nhất 9 - 5 = 4 đơn vị để phần dư đủ 9 đơn vị tạo thành 1 nhóm mới.',
          'Thêm vào 5 đơn vị hoặc bớt đi 9 đơn vị.',
          'Thêm vào 9 đơn vị.',
          'Bớt đi 4 đơn vị.',
        ],
        correctAnswer:
          'Bớt đi ít nhất 5 đơn vị (bằng chính số dư) hoặc thêm vào ít nhất 9 - 5 = 4 đơn vị để phần dư đủ 9 đơn vị tạo thành 1 nhóm mới.',
        reasoningPrompt:
          'Em hãy giải thích ngắn gọn vì sao thêm 4 đơn vị vào phần dư 5 lại giúp phép chia cho 9 chia hết:',
        reasoningPlaceholder: 'Ví dụ: Vì đang dư 5, thêm 4 đơn vị nữa sẽ được 5 + 4 = 9 chia hết cho 9 (tăng thương thêm 1)...',
        reasoningKeywords: ['4', '5', '9', 'chia hết'],
        reasoningSampleAnswer:
          'Vì đang dư 5 nên nếu bớt đi 5 sẽ chia hết; hoặc nếu thêm vào 9 - 5 = 4 đơn vị thì phần dư gom đủ 9 đơn vị và chia hết cho 9.',
        explanation:
          'Đang dư R trong phép chia cho B: muốn bớt ít nhất thì bớt R; muốn thêm ít nhất để chia hết thì thêm (B - R) để đủ 1 nhóm mới.',
        visualModel: {
          type: 'remainder_groups',
          title: 'Chia 9 dư 5: Bớt 5 hoặc Thêm (9 - 5 = 4) để đủ nhóm 9',
          dividend: 50,
          divisor: 9,
          quotient: 5,
          remainder: 5,
          itemIcon: '💎',
          groupLabel: 'Nhóm 9',
        },
      },
      {
        id: 'nov-w5-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [16, 20, 30],
        prompt: '[Nghị luận 3] Một tòa nhà có các tầng đánh số từ Tầng 1 (tầng trệt) lên đến Tầng 7. Vì sao quãng đường đi thang bộ từ Tầng 1 lên Tầng 7 lại gấp ĐÔI (chứ không phải gấp 7/3) quãng đường từ Tầng 1 lên Tầng 4?',
        options: [
          'Vì tính theo số khoảng tầng cần leo: từ Tầng 1 lên Tầng 4 có 4 - 1 = 3 khoảng tầng, còn từ Tầng 1 lên Tầng 7 có 7 - 1 = 6 khoảng tầng (6 gấp đôi 3).',
          'Vì Tầng 7 cao gấp đôi Tầng 4 do 7 : 4 = 2.',
          'Vì Tầng 1 không có bậc thang.',
          'Vì thang bộ ở các tầng trên ngắn hơn.',
        ],
        correctAnswer:
          'Vì tính theo số khoảng tầng cần leo: từ Tầng 1 lên Tầng 4 có 4 - 1 = 3 khoảng tầng, còn từ Tầng 1 lên Tầng 7 có 7 - 1 = 6 khoảng tầng (6 gấp đôi 3).',
        reasoningPrompt:
          'Em hãy viết phép tính so sánh số khoảng tầng khi leo từ Tầng 1 lên Tầng 7 với từ Tầng 1 lên Tầng 4:',
        reasoningPlaceholder: 'Ví dụ: Lên tầng 4 có 4 - 1 = 3 khoảng. Lên tầng 7 có 7 - 1 = 6 khoảng. Vì 6 : 3 = 2 nên gấp 2 lần...',
        reasoningKeywords: ['3', '6', '2', 'khoảng'],
        reasoningSampleAnswer:
          'Từ Tầng 1 lên Tầng 4 có 4 - 1 = 3 (khoảng tầng). Từ Tầng 1 lên Tầng 7 có 7 - 1 = 6 (khoảng tầng). Ta có 6 : 3 = 2 (lần).',
        explanation:
          'Trong bài toán cầu thang, quãng đường tỉ lệ với số khoảng tầng (Tầng đến - Tầng đi), tuyệt đối không lấy trực tiếp số thứ tự tầng chia cho nhau.',
        visualModel: {
          type: 'interval_model',
          title: 'Tầng 1➔4 (3 khoảng) vs Tầng 1➔7 (6 khoảng) · Gấp 6 : 3 = 2 lần',
          intervalSubtype: 'stairs',
          totalLength: 60,
          stepLength: 10,
          intervalsCount: 6,
          objectsCount: 7,
          objectIcon: '🪜',
          unitLabel: 'm',
        },
      },
      {
        id: 'nov-w5-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [27, 30],
        prompt: '[Nghị luận 4] Có 2 bình nước: Bình A chứa 1 L 800 mL nước, Bình B chứa 1000 mL nước. Cần rót từ Bình A sang Bình B bao nhiêu mi-li-lít nước để hai bình có lượng nước bằng nhau? Em hãy chọn và giải thích cách làm.',
        options: [
          'Đổi 1 L 800 mL = 1800 mL. Bình A hơn Bình B là 1800 - 1000 = 800 mL; chỉ cần rót một nửa phần hơn là 800 : 2 = 400 mL để cả hai bình cùng có 1400 mL.',
          'Rót toàn bộ phần hơn là 800 mL sang Bình B.',
          'Lấy 1800 : 2 = 900 mL rót sang Bình B.',
          'Rót 200 mL sang Bình B.',
        ],
        correctAnswer:
          'Đổi 1 L 800 mL = 1800 mL. Bình A hơn Bình B là 1800 - 1000 = 800 mL; chỉ cần rót một nửa phần hơn là 800 : 2 = 400 mL để cả hai bình cùng có 1400 mL.',
        reasoningPrompt:
          'Em hãy trình bày các bước tính lượng nước cần rót từ Bình A sang Bình B:',
        reasoningPlaceholder: 'Ví dụ: Đổi 1L 800mL = 1800mL. Hiệu là 1800 - 1000 = 800mL. Cần rót: 800 : 2 = 400mL (hoặc tổng 2800 : 2 = 1400mL)...',
        reasoningKeywords: ['1800', '400', '1400', '800'],
        reasoningSampleAnswer:
          'Đổi 1 L 800 mL = 1800 mL. Tổng 2 bình là 1800 + 1000 = 2800 (mL), khi bằng nhau mỗi bình có 2800 : 2 = 1400 (mL). Vậy cần rót: 1800 - 1400 = 400 (mL).',
        explanation:
          'Bài toán kết hợp Đổi đơn vị đo thể tích (1 L 800 mL = 1800 mL) và San bằng đại lượng trên sơ đồ thanh (rót 1/2 phần chênh lệch = 800 : 2 = 400 mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Bình A (1800 mL) rót sang Bình B (1000 mL) để hai bình bằng nhau',
          primaryReading: 'Bình A: 1 L 800 mL (1800 mL)',
          secondaryReading: 'Bình B: 1000 mL',
          conversionRule: 'Đổi cùng đơn vị rồi san đều phần chênh lệch',
        },
      },
    ],
  },
];

export const NOVEMBER_WEEKLY_TESTS: InMonthWeeklyTest[] =
  RAW_NOVEMBER_WEEKLY_TESTS.map((test) => ({
    ...test,
    questions: test.questions.map((q) => attachCPAToQuestion(q)),
  }));
