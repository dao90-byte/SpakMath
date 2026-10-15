/**
 * Spark Math Grade 3 - Comprehensive Curriculum & Interactive Lessons Data
 * Based on "Sách Bài tập TOÁN TƯ DUY - Lớp 3" (Everest Education / Spark Math)
 */

export interface CharacterDialogue {
  name: 'Benny' | 'Abby' | 'Casey' | 'Mayle';
  avatar: string;
  quote: string;
}

export interface OptionChoice {
  id: string;
  label: string;
  isCorrect?: boolean;
}

export interface LessonQuestion {
  id: string;
  topicId: 'pictograph' | 'volume' | 'sudoku' | 'queue_logic' | 'super_challenge';
  topicName: string;
  badgeTitle: string;
  title: string;
  instruction: string;
  mascot: CharacterDialogue;
  questionType: 
    | 'pictograph_read'
    | 'pictograph_build'
    | 'volume_slider'
    | 'volume_compare'
    | 'bar_model'
    | 'sudoku_shape'
    | 'sudoku_number'
    | 'pattern_sequence'
    | 'pattern_maze'
    | 'queue_counter'
    | 'corner_cross'
    | 'logic_height'
    | 'logic_seating'
    | 'pixidoku_5x5';
  interactiveData: Record<string, unknown>;
  hint: string;
  explanation: string;
}

export interface TopicInfo {
  id: string;
  title: string;
  subtitle: string;
  mascotName: string;
  color: string;
  bgGradient: string;
  iconName: string;
  lessonIds: string[];
}

export const TOPICS: TopicInfo[] = [
  {
    id: 'pictograph',
    title: 'Biểu Đồ Hình Ảnh',
    subtitle: 'Khảo sát, biểu diễn và giải mã các bí ẩn bằng tranh ảnh!',
    mascotName: 'Thỏ Abby & Khỉ Benny',
    color: '#059669', // Emerald
    bgGradient: 'from-emerald-500 to-teal-600',
    iconName: 'BarChart3',
    lessonIds: ['pic-1', 'pic-2', 'pic-3', 'pic-4', 'pic-scale', 'pic-builder-10']
  },
  {
    id: 'volume',
    title: 'Thể Tích & Đơn Vị Lít',
    subtitle: 'Khám phá không gian chất lỏng, đong nước và sơ đồ thanh kỳ diệu!',
    mascotName: 'Chuột Casey',
    color: '#0284C7', // Sky Blue
    bgGradient: 'from-sky-500 to-blue-600',
    iconName: 'Droplet',
    lessonIds: ['vol-fill', 'vol-compare', 'vol-glasses', 'vol-barmodel-1', 'vol-barmodel-2']
  },
  {
    id: 'sudoku',
    title: 'Sudoku & Quy Luật Lặp Lại',
    subtitle: 'Rèn luyện tư duy không gian với Sudoku hình khối và chuỗi hoa bí ẩn!',
    mascotName: 'Khỉ Benny',
    color: '#D97706', // Amber
    bgGradient: 'from-amber-500 to-orange-600',
    iconName: 'Grid',
    lessonIds: ['sudoku-shape', 'sudoku-num', 'pattern-animals', 'pattern-flower-maze']
  },
  {
    id: 'queue_logic',
    title: 'Vị Trí Hàng Ngũ & Suy Luận',
    subtitle: 'Bí mật đếm vị trí, hàng chữ L, chữ T và suy luận thám tử logic!',
    mascotName: 'Thỏ Abby',
    color: '#8B5CF6', // Purple
    bgGradient: 'from-purple-500 to-indigo-600',
    iconName: 'Users',
    lessonIds: ['queue-formula', 'queue-l-shape', 'queue-t-shape', 'logic-height-order', 'logic-seat-puzzle']
  },
  {
    id: 'super_challenge',
    title: 'Đấu Trường Siêu Thử Thách',
    subtitle: 'Pixidoku 5 con thú rừng nhiệt đới & Thử thách đặt ngôi sao may mắn!',
    mascotName: 'Biệt đội Spark Math',
    color: '#E11D48', // Rose
    bgGradient: 'from-rose-500 to-pink-600',
    iconName: 'Trophy',
    lessonIds: ['challenge-pixidoku', 'challenge-slitherlink', 'challenge-star-battle']
  }
];

export const ALL_LESSONS: LessonQuestion[] = [
  // ==================== TRẠM 1: BIỂU ĐỒ HÌNH ẢNH ====================
  {
    id: 'pic-1',
    topicId: 'pictograph',
    topicName: 'Biểu Đồ Hình Ảnh',
    badgeTitle: 'Bài 1 · Trang 6',
    title: 'Khảo Sát Món Ăn Trưa Của Casey',
    instruction: 'Quan sát biểu đồ hình ảnh các phiếu bình chọn món ăn trưa và trả lời câu hỏi.',
    mascot: {
      name: 'Benny',
      avatar: '🐵',
      quote: 'Tớ cứ tưởng tớ làm bánh mì kẹp dở, hóa ra là do các bạn thích pizza hơn đấy!'
    },
    questionType: 'pictograph_read',
    interactiveData: {
      keyNotice: '1 Phiếu = 1 lượt bình chọn',
      symbolType: 'ticket',
      items: [
        { id: 'sandwich', label: 'Bánh Mì Kẹp', icon: '🥪', count: 1 },
        { id: 'pizza', label: 'Pizza', icon: '🍕', count: 4 },
        { id: 'hotdog', label: 'Bánh Mì Xúc Xích', icon: '🌭', count: 3 },
        { id: 'soup', label: 'Canh Súp', icon: '🥣', count: 2 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'A. Món ăn trưa có NHIỀU lượt bình chọn nhất là:',
          options: ['Bánh Mì Kẹp', 'Pizza', 'Bánh Mì Xúc Xích', 'Canh Súp'],
          correctAnswer: 'Pizza'
        },
        {
          id: 'q2',
          prompt: 'B. Món ăn trưa có ÍT lượt bình chọn nhất là:',
          options: ['Bánh Mì Kẹp', 'Pizza', 'Bánh Mì Xúc Xích', 'Canh Súp'],
          correctAnswer: 'Bánh Mì Kẹp'
        }
      ]
    },
    hint: 'Em hãy đếm số lượng phiếu màu vàng ở từng hàng: Món nào có 4 phiếu? Món nào chỉ có 1 phiếu?',
    explanation: 'Pizza có 4 phiếu là nhiều nhất. Bánh Mì Kẹp chỉ có 1 phiếu là ít nhất.'
  },
  {
    id: 'pic-2',
    topicId: 'pictograph',
    topicName: 'Biểu Đồ Hình Ảnh',
    badgeTitle: 'Bài 2 · Trang 7',
    title: 'Đồ Chơi Yêu Thích Của 19 Bạn Nhỏ',
    instruction: 'Biểu đồ dưới đây cho thấy số lượt bình chọn của 19 bạn nhỏ. Lưu ý: 1 mặt cười = 1 lượt bình chọn.',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Chúng mình có thể dùng biểu đồ để khảo sát bất cứ điều gì trong lớp!'
    },
    questionType: 'pictograph_read',
    interactiveData: {
      keyNotice: '1 Mặt cười 😊 = 1 lượt bình chọn',
      symbolType: 'smile',
      items: [
        { id: 'doll', label: 'Búp Bê Vải', icon: '🧸', count: 4 },
        { id: 'car', label: 'Ô Tô Đồ Chơi', icon: '🚗', count: 3 },
        { id: 'lego', label: 'Khối Xếp Hình', icon: '🧩', count: 5 },
        { id: 'ball', label: 'Quả Bóng', icon: '⚽', count: 7 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'A. Đồ chơi được ÍT bạn chọn nhất là:',
          options: ['Búp Bê Vải', 'Ô Tô Đồ Chơi', 'Khối Xếp Hình', 'Quả Bóng'],
          correctAnswer: 'Ô Tô Đồ Chơi'
        },
        {
          id: 'q2',
          prompt: 'B. Đồ chơi được NHIỀU bạn chọn nhất là:',
          options: ['Búp Bê Vải', 'Ô Tô Đồ Chơi', 'Khối Xếp Hình', 'Quả Bóng'],
          correctAnswer: 'Quả Bóng'
        }
      ]
    },
    hint: 'Hàng ô tô đồ chơi có 3 mặt cười; hàng quả bóng có tới 7 mặt cười!',
    explanation: 'Ô tô đồ chơi có 3 lượt chọn (ít nhất). Quả bóng có 7 lượt chọn (nhiều nhất).'
  },
  {
    id: 'pic-3',
    topicId: 'pictograph',
    topicName: 'Biểu Đồ Hình Ảnh',
    badgeTitle: 'Bài 3.2 · Trang 8',
    title: 'Vườn Hoa Mẹ Casey Trồng',
    instruction: 'Quan sát các loại hoa trong vườn của mẹ Casey (mỗi bông hoa = 1 lượt bình chọn).',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Vườn hoa của mẹ Casey thật rực rỡ! Cùng đếm xem hoa nào nhiều nhất nhé!'
    },
    questionType: 'pictograph_read',
    interactiveData: {
      keyNotice: '1 Bông hoa = 1 cây hoa trong vườn',
      symbolType: 'flower',
      items: [
        { id: 'tulip', label: 'Hoa Tulip', icon: '🌷', count: 5 },
        { id: 'rose', label: 'Hoa Hồng', icon: '🌹', count: 4 },
        { id: 'lily', label: 'Hoa Lily', icon: '🌸', count: 2 },
        { id: 'daisy', label: 'Hoa Cúc', icon: '🌼', count: 4 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Loài hoa mẹ Casey trồng NHIỀU nhất là:',
          options: ['Hoa Tulip', 'Hoa Hồng', 'Hoa Lily', 'Hoa Cúc'],
          correctAnswer: 'Hoa Tulip'
        },
        {
          id: 'q2',
          prompt: 'b) Loài hoa mẹ Casey trồng ÍT nhất là:',
          options: ['Hoa Tulip', 'Hoa Hồng', 'Hoa Lily', 'Hoa Cúc'],
          correctAnswer: 'Hoa Lily'
        }
      ]
    },
    hint: 'Hoa Tulip có 5 bông, Hoa Lily chỉ có 2 bông.',
    explanation: 'Tulip có 5 bông (nhiều nhất), Lily có 2 bông (ít nhất).'
  },
  {
    id: 'pic-4',
    topicId: 'pictograph',
    topicName: 'Biểu Đồ Hình Ảnh',
    badgeTitle: 'Bài 4.2 · Trang 9',
    title: 'Môn Học Yêu Thích & Phép So Sánh',
    instruction: 'Đọc biểu đồ và tính số lượt chênh lệch giữa các môn học.',
    mascot: {
      name: 'Benny',
      avatar: '🐵',
      quote: 'Mỗi trái tim đỏ ❤️ đại diện cho 1 bạn học sinh yêu thích môn học đó!'
    },
    questionType: 'pictograph_read',
    interactiveData: {
      keyNotice: '1 Trái tim ❤️ = 1 lượt bình chọn',
      symbolType: 'heart',
      items: [
        { id: 'math', label: 'Toán', icon: '📐', count: 3 },
        { id: 'viet', label: 'Tiếng Việt', icon: '📖', count: 4 },
        { id: 'eng', label: 'Tiếng Anh', icon: '🌐', count: 5 },
        { id: 'art', label: 'Mỹ Thuật', icon: '🎨', count: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Có bao nhiêu lượt bình chọn cho môn Tiếng Việt?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '4'
        },
        {
          id: 'q2',
          prompt: 'b) Môn Mỹ Thuật được bình chọn nhiều hơn môn Toán mấy lượt?',
          options: ['2 lượt', '3 lượt', '4 lượt', '5 lượt'],
          correctAnswer: '3 lượt'
        }
      ]
    },
    hint: 'Mỹ thuật có 6 trái tim, Toán có 3 trái tim. Ta lấy: 6 - 3 = ?',
    explanation: 'Tiếng Việt có 4 lượt. Môn Mỹ thuật (6) hơn môn Toán (3) là: 6 - 3 = 3 lượt.'
  },
  {
    id: 'pic-scale',
    topicId: 'pictograph',
    topicName: 'Biểu Đồ Hình Ảnh',
    badgeTitle: 'Bài 6.1 · Trang 12',
    title: 'Tỉ Lệ Nâng Cao: Mỗi Biểu Tượng = 3 Quyển Sách',
    instruction: 'Chú ý tỉ lệ quy đổi: Mỗi hình tam giác 🔺 thể hiện cho 3 quyển sách đã đọc!',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Hãy nhớ nhân với 3 nhé! 1 tam giác là 3 quyển, 2 tam giác là 6 quyển!'
    },
    questionType: 'pictograph_read',
    interactiveData: {
      keyNotice: 'Lưu ý: 1 Tam giác 🔺 = 3 quyển sách',
      symbolType: 'triangle',
      multiplier: 3,
      items: [
        { id: 'abby', label: 'Abby', icon: '🐰', count: 5, actualValue: 15 },
        { id: 'benny', label: 'Benny', icon: '🐵', count: 3, actualValue: 9 },
        { id: 'casey', label: 'Casey', icon: '🐹', count: 1, actualValue: 3 },
        { id: 'blizzard', label: 'Blizzard', icon: '🐻', count: 2, actualValue: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Hỏi Abby đã đọc được bao nhiêu quyển sách?',
          options: ['5 quyển', '9 quyển', '15 quyển', '18 quyển'],
          correctAnswer: '15 quyển'
        },
        {
          id: 'q2',
          prompt: 'Abby đã đọc nhiều hơn Benny bao nhiêu quyển sách?',
          options: ['2 quyển', '4 quyển', '6 quyển', '8 quyển'],
          correctAnswer: '6 quyển'
        }
      ]
    },
    hint: 'Abby có 5 tam giác = 5 × 3 = 15 quyển. Benny có 3 tam giác = 3 × 3 = 9 quyển. Lấy 15 - 9!',
    explanation: 'Abby đọc: 5 × 3 = 15 quyển. Benny đọc: 3 × 3 = 9 quyển. Abby đọc nhiều hơn Benny: 15 - 9 = 6 quyển sách.'
  },
  {
    id: 'pic-builder-10',
    topicId: 'pictograph',
    topicName: 'Biểu Đồ Hình Ảnh',
    badgeTitle: 'Bài 10 · Trang 16',
    title: 'Tự Vẽ Lại Biểu Đồ Bị Biến Mất Cùng Casey',
    instruction: 'Casey khảo sát 24 người về mùa yêu thích. Xuân: 12 người. Đông: 6 người. Hè và Thu bằng nhau. (Mỗi ô xanh 🟦 = 3 người). Hãy bấm cộng/trừ để xếp đủ số ô!',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Các ký hiệu trên bảng của tớ bị gió thổi bay mất rồi, bạn giúp tớ vẽ lại nhé!'
    },
    questionType: 'pictograph_build',
    interactiveData: {
      multiplier: 3,
      totalPeople: 24,
      categories: [
        { id: 'spring', label: 'Mùa Xuân (12 người)', targetSymbols: 4, symbolColor: 'bg-emerald-500' },
        { id: 'summer', label: 'Mùa Hạ (? người)', targetSymbols: 1, symbolColor: 'bg-amber-500' },
        { id: 'autumn', label: 'Mùa Thu (? người)', targetSymbols: 1, symbolColor: 'bg-orange-500' },
        { id: 'winter', label: 'Mùa Đông (6 người)', targetSymbols: 2, symbolColor: 'bg-blue-500' }
      ]
    },
    hint: 'Tổng là 24 người. Xuân (12) + Đông (6) = 18 người. Còn lại: 24 - 18 = 6 người chia đều cho Hạ và Thu (mỗi mùa 3 người = 1 ô). Xuân cần 12 : 3 = 4 ô, Đông cần 6 : 3 = 2 ô!',
    explanation: 'Xuân: 12 : 3 = 4 ô. Hạ: 3 : 3 = 1 ô. Thu: 3 : 3 = 1 ô. Đông: 6 : 3 = 2 ô. Tổng cộng đúng 24 người!'
  },

  // ==================== TRẠM 2: THỂ TÍCH & ĐƠN VỊ LÍT ====================
  {
    id: 'vol-fill',
    topicId: 'volume',
    topicName: 'Thể Tích & Đơn Vị Lít',
    badgeTitle: 'Bài 1.1 & 1.2 · Trang 25',
    title: 'Rót Nước Đầy Bình & So Sánh Mực Nước',
    instruction: 'Điều chỉnh lượng nước vào bình giúp bạn Benny sao cho thể tích Chai A LỚN HƠN Chai B.',
    mascot: {
      name: 'Benny',
      avatar: '🐵',
      quote: 'Thể tích là lượng chất lỏng chứa bên trong vật chứa, đơn vị đo phổ biến là Lít (l)!'
    },
    questionType: 'volume_slider',
    interactiveData: {
      targetCondition: 'A_GREATER_THAN_B',
      bottles: [
        { id: 'A', name: 'Chai Nước A', initial: 80, capacity: 100 },
        { id: 'B', name: 'Chai Nước B', initial: 30, capacity: 100 }
      ]
    },
    hint: 'Hãy kéo thanh trượt để Chai A có nhiều nước hơn Chai B (mực nước Chai A cao hơn Chai B).',
    explanation: 'Khi mực nước chai A cao hơn chai B (cùng loại chai), thể tích nước chai A sẽ lớn hơn chai B.'
  },
  {
    id: 'vol-compare',
    topicId: 'volume',
    topicName: 'Thể Tích & Đơn Vị Lít',
    badgeTitle: 'Bài 2.1 · Trang 26',
    title: 'So Sánh Thể Tích 4 Chai Nước',
    instruction: 'Quan sát 4 chai nước A, B, C, D có mực nước khác nhau và trả lời câu hỏi.',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Các chai có cùng hình dạng, chai nào có mực nước cao nhất thì chứa nhiều nước nhất!'
    },
    questionType: 'volume_compare',
    interactiveData: {
      bottles: [
        { id: 'A', label: 'Chai A', levelPercent: 65, color: '#38bdf8' },
        { id: 'B', label: 'Chai B', levelPercent: 95, color: '#38bdf8' },
        { id: 'C', label: 'Chai C', levelPercent: 20, color: '#38bdf8' },
        { id: 'D', label: 'Chai D', levelPercent: 65, color: '#38bdf8' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Chai có thể tích nước LỚN NHẤT là:',
          options: ['Chai A', 'Chai B', 'Chai C', 'Chai D'],
          correctAnswer: 'Chai B'
        },
        {
          id: 'q2',
          prompt: 'b) Chai có thể tích nước NHỎ NHẤT là:',
          options: ['Chai A', 'Chai B', 'Chai C', 'Chai D'],
          correctAnswer: 'Chai C'
        },
        {
          id: 'q3',
          prompt: 'c) Thể tích nước trong Chai A BẰNG thể tích nước trong chai nào?',
          options: ['Chai B', 'Chai C', 'Chai D'],
          correctAnswer: 'Chai D'
        }
      ]
    },
    hint: 'Chai B gần đầy nhất (nhiều nhất). Chai C chỉ có một chút ở đáy (ít nhất). Chai A và Chai D có mực nước ngang nhau!',
    explanation: 'Chai B có thể tích lớn nhất (gần đầy). Chai C nhỏ nhất. Chai A bằng Chai D.'
  },
  {
    id: 'vol-glasses',
    topicId: 'volume',
    topicName: 'Thể Tích & Đơn Vị Lít',
    badgeTitle: 'Bài 6.1 · Trang 30',
    title: 'Đo Thể Tích Bể Nước Bằng Chai 1L',
    instruction: 'Nước từ Bể A rót vừa đầy 6 chai 1L. Nước từ Bể B rót vừa đầy 9 chai 1L.',
    mascot: {
      name: 'Mayle',
      avatar: '👨‍🏫',
      quote: 'Mỗi chai tiêu chuẩn chứa đúng 1 Lít (1L). Chúng ta cùng tính dung tích nhé!'
    },
    questionType: 'pictograph_read',
    interactiveData: {
      keyNotice: '1 Chai = 1 Lít nước',
      items: [
        { id: 'tankA', label: 'Bể Nước A', icon: '🚰', count: 6, unit: 'L' },
        { id: 'tankB', label: 'Bể Nước B', icon: '💧', count: 9, unit: 'L' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Thể tích nước của Bể A ÍT HƠN Bể B bao nhiêu lít?',
          options: ['2 lít', '3 lít', '4 lít', '5 lít'],
          correctAnswer: '3 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Tổng thể tích nước của cả Bể A và Bể B là bao nhiêu lít?',
          options: ['12 lít', '15 lít', '18 lít', '20 lít'],
          correctAnswer: '15 lít'
        }
      ]
    },
    hint: 'Bể A = 6 lít, Bể B = 9 lít. Hiệu là: 9 - 6 = ? Tổng là: 6 + 9 = ?',
    explanation: 'Bể A ít hơn Bể B: 9 - 6 = 3 lít. Tổng thể tích: 6 + 9 = 15 lít.'
  },
  {
    id: 'vol-barmodel-1',
    topicId: 'volume',
    topicName: 'Thể Tích & Đơn Vị Lít',
    badgeTitle: 'Bài 7 · Trang 32',
    title: 'Sơ Đồ Đoạn Thẳng: Nước Ép Táo Của Benny & Abby',
    instruction: 'Benny có 46L nước ép táo. Abby có NHIỀU HƠN Benny 54L nước ép táo. Hãy nhìn sơ đồ và điền kết quả.',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Phương pháp sơ đồ đoạn thẳng giúp chúng mình nhìn thấy rõ bài toán cộng trừ cực kỳ dễ hiểu!'
    },
    questionType: 'bar_model',
    interactiveData: {
      bars: [
        { label: 'Benny 🐵', lengthVal: 46, display: '46 L', color: 'bg-emerald-500' },
        { label: 'Abby 🐰', lengthVal: 100, parts: [{ val: 46, label: '46 L' }, { val: 54, label: '+54 L' }], color: 'bg-amber-400' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'A. Hỏi Abby có bao nhiêu lít nước ép táo?',
          options: ['90 lít', '98 lít', '100 lít', '104 lít'],
          correctAnswer: '100 lít'
        },
        {
          id: 'q2',
          prompt: 'B. Cả hai bạn có tất cả bao nhiêu lít nước ép táo?',
          options: ['146 lít', '150 lít', '154 lít', '160 lít'],
          correctAnswer: '146 lít'
        }
      ]
    },
    hint: 'Abby = 46 + 54 = 100 lít. Cả hai bạn = Benny (46) + Abby (100) = ?',
    explanation: 'Số lít nước ép táo của Abby: 46 + 54 = 100 lít. Cả hai bạn có: 46 + 100 = 146 lít.'
  },
  {
    id: 'vol-barmodel-2',
    topicId: 'volume',
    topicName: 'Thể Tích & Đơn Vị Lít',
    badgeTitle: 'Bài 9.2 · Trang 34',
    title: 'Toán Đố Bể Cá & Bồn Nước Lớn',
    instruction: 'Một bể cá chứa 120 lít nước. Một bồn nước chứa nhiều hơn bể cá 80 lít nước.',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Số lớn hơn thì đoạn thẳng dài hơn! Cùng cộng nhẩm nào!'
    },
    questionType: 'bar_model',
    interactiveData: {
      bars: [
        { label: 'Bể cá 🐠', lengthVal: 120, display: '120 L', color: 'bg-sky-500' },
        { label: 'Bồn nước 🚰', lengthVal: 200, parts: [{ val: 120, label: '120 L' }, { val: 80, label: '+80 L' }], color: 'bg-indigo-500' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Bồn nước chứa bao nhiêu lít nước?',
          options: ['180 lít', '190 lít', '200 lít', '220 lít'],
          correctAnswer: '200 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Cả bể cá và bồn nước chứa tất cả bao nhiêu lít nước?',
          options: ['300 lít', '320 lít', '340 lít', '360 lít'],
          correctAnswer: '320 lít'
        }
      ]
    },
    hint: 'Bồn nước = 120 + 80 = 200 lít. Cả hai = 120 + 200 = 320 lít!',
    explanation: 'Bồn nước chứa: 120 + 80 = 200 lít. Cả bể cá và bồn chứa: 120 + 200 = 320 lít.'
  },

  // ==================== TRẠM 3: SUDOKU & QUY LUẬT LẶP LẠI ====================
  {
    id: 'sudoku-shape',
    topicId: 'sudoku',
    topicName: 'Sudoku & Quy Luật',
    badgeTitle: 'Bài 1 · Trang 47',
    title: 'Sudoku 4x4 Hình Khối Màu Sắc',
    instruction: 'Điền các hình còn thiếu sao cho mỗi hàng, mỗi cột và mỗi khối 2x2 đều có đủ 4 hình: 🔺 Tam giác, 🟢 Hình tròn, 🟧 Hình vuông, ❤️ Trái tim.',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Trong mỗi hàng, cột và ô 2x2, không được có 2 hình giống hệt nhau đâu nhé!'
    },
    questionType: 'sudoku_shape',
    interactiveData: {
      size: 4,
      symbols: [
        { id: 'triangle', icon: '🔺', name: 'Tam giác' },
        { id: 'circle', icon: '🟢', name: 'Tròn' },
        { id: 'square', icon: '🟧', name: 'Vuông' },
        { id: 'heart', icon: '❤️', name: 'Tim' }
      ],
      // Initial puzzle matrix (empty cells represented by null)
      initialGrid: [
        ['triangle', null, null, 'square'],
        [null, null, 'circle', null],
        [null, null, 'square', 'heart'],
        [null, 'heart', null, null]
      ],
      // Correct solution based on Page 81 (Trang 3 đáp án)
      solution: [
        ['triangle', 'circle', 'heart', 'square'],
        ['square', 'heart', 'circle', 'triangle'],
        ['circle', 'triangle', 'square', 'heart'],
        ['heart', 'square', 'triangle', 'circle']
      ]
    },
    hint: 'Nhìn hàng đầu tiên: đã có Tam giác và Vuông, khối 2x2 bên trái cần thêm hình gì nữa?',
    explanation: 'Theo luật loại trừ Sudoku, mỗi hàng, cột và khối 2x2 đều xuất hiện đủ 4 hình duy nhất một lần.'
  },
  {
    id: 'sudoku-num',
    topicId: 'sudoku',
    topicName: 'Sudoku & Quy Luật',
    badgeTitle: 'Bài 2 · Trang 48',
    title: 'Sudoku 4x4 Chữ Số 1 Đến 4',
    instruction: 'Điền số từ 1 đến 4 vào các ô trống sao cho không bị trùng nhau trên cùng một hàng, cột hay khối 2x2.',
    mascot: {
      name: 'Benny',
      avatar: '🐵',
      quote: 'Mỗi hàng và mỗi cột chỉ có đúng các số 1, 2, 3, 4!'
    },
    questionType: 'sudoku_number',
    interactiveData: {
      size: 4,
      initialGrid: [
        [null, null, 1, 3],
        [null, 3, null, 4],
        [null, 2, null, null],
        [3, 1, null, null]
      ],
      // Solution from Page 81 (Trang 4 đáp án)
      solution: [
        [2, 4, 1, 3],
        [1, 3, 2, 4],
        [4, 2, 3, 1],
        [3, 1, 4, 2]
      ]
    },
    hint: 'Ở hàng 1: đã có 1 và 3, cột 4 có số 3 và 4. Hãy tìm số còn thiếu duy nhất!',
    explanation: 'Hàng 1 điền [2, 4, 1, 3]. Hàng 2 điền [1, 3, 2, 4]. Hàng 3 điền [4, 2, 3, 1]. Hàng 4 điền [3, 1, 4, 2].'
  },
  {
    id: 'pattern-animals',
    topicId: 'sudoku',
    topicName: 'Sudoku & Quy Luật',
    badgeTitle: 'Bài 1 · Trang 53',
    title: 'Tìm Quy Luật Đoàn Động Vật Diễu Hành',
    instruction: 'Đoàn diễu hành có chuỗi lặp lại: 🐥 Vịt con ➔ 🐸 Chú ếch ➔ 🐻 Chú gấu ➔ 🐵 Khỉ con. Hãy chọn 2 bạn động vật đang bị giấu trong hộp bí mật!',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Hãy xem chuỗi 4 con vật được lặp đi lặp lại nhé: Vịt, Ếch, Gấu, Khỉ!'
    },
    questionType: 'pattern_sequence',
    interactiveData: {
      sequence: [
        { id: 1, name: 'Vịt con', icon: '🐥' },
        { id: 2, name: 'Chú ếch', icon: '🐸' },
        { id: 3, name: 'Chú gấu', icon: '🐻' },
        { id: 4, name: 'Khỉ con', icon: '🐵' },
        { id: 5, name: 'Vịt con', icon: '🐥' },
        { id: 6, name: 'Chú ếch', icon: '🐸' },
        { id: 7, name: 'Chú gấu', icon: '🐻' },
        { id: 8, name: 'Khỉ con', icon: '❓', isMissing: true, answer: '🐵' },
        { id: 9, name: 'Vịt con', icon: '🐥' },
        { id: 10, name: 'Chú ếch', icon: '🐸' },
        { id: 11, name: 'Chú gấu', icon: '❓', isMissing: true, answer: '🐻' },
        { id: 12, name: 'Khỉ con', icon: '🐵' }
      ],
      choices: ['🐻 Chú gấu', '🐵 Khỉ con', '🐸 Chú ếch', '🐥 Vịt con'],
      target1: 'Khỉ con',
      target2: 'Chú gấu'
    },
    hint: 'Chu kỳ gồm 4 bạn: Vịt -> Ếch -> Gấu -> Khỉ. Sau chú gấu số 7 là ai? Trước bạn khỉ số 12 là ai?',
    explanation: 'Hộp bí mật thứ nhất là Khỉ con 🐵, hộp bí mật thứ hai là Chú gấu 🐻.'
  },
  {
    id: 'pattern-flower-maze',
    topicId: 'sudoku',
    topicName: 'Sudoku & Quy Luật',
    badgeTitle: 'Bài 2 · Trang 54',
    title: 'Vẽ Đường Hoa Dẫn Abby Đến Gặp Casey',
    instruction: 'Quy luật bước chân của Abby theo thứ tự chuỗi 4 bông hoa lặp lại: 🌸 Tím nhạt ➔ 🌼 Vàng cúc ➔ 🌺 Đỏ tươi ➔ 💠 Xanh biếc. Bấm vào các ô hoa để tạo đường đi!',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Hãy đi đúng thứ tự: Tím ➔ Vàng ➔ Đỏ ➔ Xanh rồi lại Tím ➔ Vàng ➔ Đỏ ➔ Xanh nhé!'
    },
    questionType: 'pattern_maze',
    interactiveData: {
      pattern: ['🌸', '🌼', '🌺', '💠'],
      gridSize: 7,
      start: { r: 0, c: 1 },
      goal: { r: 6, c: 6 }
    },
    hint: 'Bắt đầu từ mũi tên Abby ở hàng trên, di chuyển từng bước sang ô kề cạnh đúng màu quy luật.',
    explanation: 'Đi theo đúng chu kỳ: Tím nhạt -> Vàng cúc -> Đỏ tươi -> Xanh biếc dẫn thẳng đến vị trí của Chuột Casey!'
  },

  // ==================== TRẠM 4: VỊ TRÍ HÀNG NGŨ & SUY LUẬN ====================
  {
    id: 'queue-formula',
    topicId: 'queue_logic',
    topicName: 'Vị Trí & Suy Luận',
    badgeTitle: 'Bài 1 & 2 · Trang 61-62',
    title: 'Bí Mật Đếm Hàng: Tránh Đếm Trùng 2 Lần!',
    instruction: 'Abby đứng thứ 2 từ đầu hàng. Bạn ấy đứng thứ 3 tính từ cuối hàng. Hỏi có tất cả bao nhiêu bạn?',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Vì tớ được đếm một lần từ đầu hàng và một lần từ cuối hàng, nên tớ bị đếm trùng 2 lần! Hãy nhớ trừ đi 1 nhé!'
    },
    questionType: 'queue_counter',
    interactiveData: {
      fromFront: 2,
      fromBack: 3,
      correctTotal: 4,
      formula: '2 + 3 - 1 = 4'
    },
    hint: 'Công thức toán tư duy: (Vị trí từ đầu) + (Vị trí từ cuối) - 1. Ta có: 2 + 3 - 1 = ?',
    explanation: 'Tính từ trước có 2 người, tính từ sau có 3 người. Bạn Abby được đếm 2 lần, nên tổng số người là: 2 + 3 - 1 = 4 bạn.'
  },
  {
    id: 'queue-l-shape',
    topicId: 'queue_logic',
    topicName: 'Vị Trí & Suy Luận',
    badgeTitle: 'Bài 3 · Trang 63',
    title: 'Hàng Người Đứng Chữ L',
    instruction: 'Có 1 hàng người đứng thành hình chữ L. Hàng dọc có 6 bạn. Hàng ngang có 4 bạn. Chuột Casey đứng ở ĐIỂM GIAO NHAU của 2 hàng. Hỏi có tất cả bao nhiêu bạn?',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Tớ đứng ngay góc giao giữa hàng dọc và hàng ngang! Đố bạn biết có bao nhiêu người?'
    },
    questionType: 'corner_cross',
    interactiveData: {
      shape: 'L',
      verticalCount: 6,
      horizontalCount: 4,
      intersectionPerson: 'Casey',
      options: ['8 bạn', '9 bạn', '10 bạn', '11 bạn'],
      correctAnswer: '9 bạn'
    },
    hint: 'Nếu cộng 6 + 4 = 10 thì bạn Casey ở góc đã bị tính 2 lần! Vậy: 6 + 4 - 1 = ?',
    explanation: 'Tổng số bạn = 6 (hàng dọc) + 4 (hàng ngang) - 1 (bạn Casey ở góc) = 9 bạn.'
  },
  {
    id: 'queue-t-shape',
    topicId: 'queue_logic',
    topicName: 'Vị Trí & Suy Luận',
    badgeTitle: 'Bài 4 · Trang 64',
    title: 'Hàng Người Đứng Chữ T',
    instruction: 'Có 1 hàng người đứng hình chữ T. Hàng dọc có 4 bạn, hàng ngang có 7 bạn. Abby đứng ở điểm giao của 2 hàng. Hỏi tổng cộng có bao nhiêu bạn?',
    mascot: {
      name: 'Abby',
      avatar: '🐰',
      quote: 'Tớ đứng ở ngay chính giữa điểm ngã ba chữ T đấy!'
    },
    questionType: 'corner_cross',
    interactiveData: {
      shape: 'T',
      verticalCount: 4,
      horizontalCount: 7,
      intersectionPerson: 'Abby',
      options: ['9 bạn', '10 bạn', '11 bạn', '12 bạn'],
      correctAnswer: '10 bạn'
    },
    hint: 'Tính: 4 (dọc) + 7 (ngang) - 1 (điểm giao Abby) = ?',
    explanation: 'Tổng số bạn = 4 + 7 - 1 = 10 bạn.'
  },
  {
    id: 'logic-height-order',
    topicId: 'queue_logic',
    topicName: 'Vị Trí & Suy Luận',
    badgeTitle: 'Bài 1 · Trang 69',
    title: 'Thám Tử Suy Luận: Đo Chiều Cao Các Bạn',
    instruction: 'Casey, Abby và Benny đo chiều cao. Manh mối:\n• Casey thấp hơn Benny.\n• Abby thấp hơn Casey.\n• Benny cao hơn Abby.\nHỏi ai là người CAO NHẤT và ai là người THẤP NHẤT?',
    mascot: {
      name: 'Benny',
      avatar: '🐵',
      quote: 'Hãy vẽ sơ đồ các que đứng để so sánh từng cặp một nhé!'
    },
    questionType: 'logic_height',
    interactiveData: {
      characters: [
        { id: 'benny', name: 'Benny', icon: '🐵', heightRank: 1 },
        { id: 'casey', name: 'Casey', icon: '🐹', heightRank: 2 },
        { id: 'abby', name: 'Abby', icon: '🐰', heightRank: 3 }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Ai là người CAO NHẤT trong số họ?',
          options: ['Benny', 'Casey', 'Abby'],
          correctAnswer: 'Benny'
        },
        {
          id: 'q2',
          prompt: 'Ai là người THẤP NHẤT trong số họ?',
          options: ['Benny', 'Casey', 'Abby'],
          correctAnswer: 'Abby'
        }
      ]
    },
    hint: 'Abby thấp hơn Casey, mà Casey lại thấp hơn Benny. Thứ tự từ cao đến thấp là: Benny > Casey > Abby!',
    explanation: 'Benny cao nhất, Abby thấp nhất.'
  },
  {
    id: 'logic-seat-puzzle',
    topicId: 'queue_logic',
    topicName: 'Vị Trí & Suy Luận',
    badgeTitle: 'Bài 2 · Trang 70',
    title: 'Xếp Chỗ Ngồi Rạp Xiếc Cùng Bác Ram & Bác Sĩ Mayle',
    instruction: 'Xếp 5 nhân vật vào 5 ghế (từ Ghế 1 bên Trái sang Ghế 5 bên Phải) theo các gợi ý:\n1. Bác sĩ Mayle: Tôi ngồi ở bên rìa.\n2. Abby: Tôi ngồi ở trung tâm (Ghế 3).\n3. Benny: Tôi ngồi ở bên phải của Abby.\n4. Bác Ram: Có 2 người ở giữa Bác sĩ Mayle và tôi.',
    mascot: {
      name: 'Mayle',
      avatar: '👨‍🏫',
      quote: 'Gợi ý quan trọng: Abby ở chính giữa trung tâm! Hãy bắt đầu từ chiếc ghế số 3 nhé!'
    },
    questionType: 'logic_seating',
    interactiveData: {
      seatsCount: 5,
      // Target order from left (index 0) to right (index 4) based on Page 84 (Trang 26 đáp án):
      // "Bác Ram, Bác sĩ Mayle, Casey, Abby, Benny" hoặc "Bác sĩ Mayle, Bác Ram, Abby, Benny, Casey"
      correctOrder: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram'],
      allowedCharacters: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram']
    },
    hint: 'Ghế 3 (ở giữa) chắc chắn là Abby. Bác sĩ Mayle ngồi rìa (Ghế 1). Bác Ram cách Bác sĩ Mayle 2 người...',
    explanation: 'Thứ tự từ trái sang phải: Bác sĩ Mayle (Ghế 1) -> Casey (Ghế 2) -> Abby (Ghế 3 trung tâm) -> Benny (Ghế 4) -> Bác Ram (Ghế 5).'
  },

  // ==================== TRẠM 5: ĐẤU TRƯỜNG SIÊU THỬ THÁCH ====================
  {
    id: 'challenge-pixidoku',
    topicId: 'super_challenge',
    topicName: 'Siêu Thử Thách',
    badgeTitle: 'Thử Thách 2 · Trang 76 & 86',
    title: 'Pixidoku 5x5: Động Vật Rừng Nhiệt Đới',
    instruction: 'Điền các loài động vật (🐻 Gấu, 🐵 Khỉ, 🐺 Sói, 🐮 Bò sữa, 🦄 Kỳ lân) vào lưới 5x5 sao cho mỗi hàng, mỗi cột và mỗi khối 5 ô viền đậm đều có đủ 5 con vật!',
    mascot: {
      name: 'Benny',
      avatar: '🐵',
      quote: 'Đây là trò chơi tư duy độc đáo từ Spark Math: Sudoku hình động vật siêu cuốn hút!'
    },
    questionType: 'pixidoku_5x5',
    interactiveData: {
      size: 5,
      animals: [
        { id: 'bear', icon: '🐻', name: 'Gấu' },
        { id: 'monkey', icon: '🐵', name: 'Khỉ' },
        { id: 'wolf', icon: '🐺', name: 'Sói' },
        { id: 'cow', icon: '🐮', name: 'Bò sữa' },
        { id: 'unicorn', icon: '🦄', name: 'Kỳ lân' }
      ],
      // Puzzle grid with preset and blank cells (based on Page 76 & Page 86 answer)
      initialGrid: [
        ['bear', null, null, 'monkey', null],
        [null, null, null, null, null],
        ['cow', null, null, null, 'unicorn'],
        ['wolf', null, null, 'cow', 'monkey'],
        ['unicorn', null, null, null, null]
      ],
      solution: [
        ['bear', 'unicorn', 'bear', 'monkey', 'unicorn'],
        ['monkey', 'wolf', 'cow', 'wolf', 'cow'],
        ['cow', 'unicorn', 'monkey', 'bear', 'unicorn'],
        ['wolf', 'bear', 'wolf', 'cow', 'monkey'],
        ['unicorn', 'cow', 'monkey', 'bear', 'wolf']
      ]
    },
    hint: 'Tìm ô chỉ còn thiếu đúng 1 con vật trong hàng hoặc cột trước.',
    explanation: 'Hoàn thành Pixidoku bằng cách đảm bảo 5 con vật xuất hiện đủ trong mỗi vùng 5 ô!'
  },
  {
    id: 'challenge-star-battle',
    topicId: 'super_challenge',
    topicName: 'Siêu Thử Thách',
    badgeTitle: 'Thử Thách 4 · Trang 78 & 88',
    title: 'Đặt Ngôi Sao May Mắn (Star Battle)',
    instruction: 'Mỗi hàng, mỗi cột và mỗi khối hình vẽ chỉ được chứa DUY NHẤT một ngôi sao may mắn ⭐. Các ngôi sao không được nằm sát cạnh nhau (kể cả đường chéo)!',
    mascot: {
      name: 'Casey',
      avatar: '🐹',
      quote: 'Hãy tìm vị trí ngôi sao may mắn để mở khóa kho báu bí mật của Vương quốc!'
    },
    questionType: 'sudoku_shape',
    interactiveData: {
      size: 6,
      targetStarCount: 6,
      regions: [
        [0, 0, 1, 1, 1, 2],
        [0, 0, 1, 2, 2, 2],
        [3, 3, 3, 2, 4, 4],
        [3, 5, 5, 5, 4, 4],
        [3, 5, 5, 5, 4, 4],
        [5, 5, 5, 5, 4, 4]
      ],
      // Star positions [row, col]
      starsSolution: [
        [0, 1],
        [1, 5],
        [2, 0],
        [3, 3],
        [4, 4],
        [5, 2]
      ]
    },
    hint: 'Bấm vào ô để đặt ngôi sao ⭐ hoặc dấu chấm tròn để đánh dấu ô trống.',
    explanation: 'Mỗi hàng, mỗi cột và mỗi vùng hình zic-zac đều chứa chính xác 1 ngôi sao, không ngôi sao nào chạm nhau.'
  }
];
