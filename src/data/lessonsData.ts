// Comprehensive Spark Math Grade 3 Curriculum & Interactive Lessons Catalogue
// Digitized directly from the complete 91-page "Sách Bài tập TOÁN TƯ DUY - Lớp 3" workbook

export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  mascotName: string;
  bgGradient: string;
}

export interface Mascot {
  name: string;
  avatar: string;
  message: string;
}

interface ChoiceQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctAnswer: string;
}

export type LessonActivity =
  | {
      type: 'pictographViewer';
      keyNotice: string;
      multiplier?: number;
      items: { id: string; label: string; icon: string; count: number; actualValue?: number; unit?: string }[];
      subQuestions: ChoiceQuestion[];
    }
  | {
      type: 'pictographBuilder';
      multiplier: number;
      totalPeople: number;
      categories: { id: string; label: string; targetSymbols: number; symbolColor: string }[];
    }
  | {
      type: 'volumeComparison';
      bottles: { id: string; label: string; levelPercent: number; color: string }[];
      questions: ChoiceQuestion[];
    }
  | {
      type: 'volumeSlider';
      bottles: { id: string; name: string; initial: number; capacity: number }[];
      targetCondition: 'A_GREATER_THAN_B';
    }
  | {
      type: 'barModel';
      bars: {
        label: string;
        lengthVal: number;
        display?: string;
        parts?: { val: number; label: string }[];
        color: string;
      }[];
      questions: ChoiceQuestion[];
    }
  | {
      type: 'sudoku';
      sudokuType: 'shape' | 'number';
      symbols?: { id: string; icon: string; name: string }[];
      initialGrid: (string | number | null)[][];
      solution: (string | number)[][];
      colorBlocks?: string[][];
      sumLabels?: (number | null)[][];
    }
  | {
      type: 'pixidoku';
      size: number;
      animals: { id: string; icon: string; name: string }[];
      initialGrid: (string | null)[][];
      solution: string[][];
    }
  | {
      type: 'patternAnimals';
      sequence: { id: number; name: string; icon: string; isMissing?: boolean; answer?: string }[];
      choices: string[];
      target1: string;
      target2: string;
    }
  | {
      type: 'flowerMaze';
      pattern: string[];
    }
  | {
      type: 'starBattle';
      size: number;
      targetStarCount: number;
      regions: number[][];
      starsSolution: number[][];
    }
  | {
      type: 'queueCounter';
      fromFront: number;
      fromBack: number;
      correctTotal: number;
      formula: string;
    }
  | {
      type: 'cornerCross';
      shape: 'L' | 'T';
      verticalCount: number;
      horizontalCount: number;
      intersectionPerson: string;
      options: string[];
      correctAnswer: string;
    }
  | {
      type: 'logicSeatOrder';
      seatsCount: number;
      correctOrder: string[];
      allowedCharacters: string[];
    }
  | {
      type: 'itemOrdering';
      promptText: string;
      items: { id: string; label: string; description?: string; icon?: string }[];
      correctOrder: string[];
      directionLabel?: string;
    }
  | {
      type: 'patternMatrix';
      ruleDescription: string;
      steps: { stepNum: number; content: string; note?: string }[];
      choices: { id: string; label: string; content: string }[];
      correctChoiceId: string;
    }
  | {
      type: 'circularMaze';
    }
  | {
      type: 'cattleFence';
    };

export interface LessonQuestion {
  id: string;
  topicId: string;
  topicName: string;
  title: string;
  badgeTitle: string;
  instruction: string;
  hint: string;
  mascot: Mascot;
  activity: LessonActivity;
}

export const TOPICS: Topic[] = [
  {
    id: 'pictograph',
    title: 'Biểu Đồ Hình Ảnh',
    subtitle: 'Khảo sát thực tế, đọc đếm tỷ lệ nhân và tự tay vẽ biểu đồ dữ liệu.',
    mascotName: 'Khỉ Benny & Chuột Casey',
    bgGradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'volume',
    title: 'Thể Tích & Đơn Vị Lít',
    subtitle: 'Rót nước vào bình, so sánh dung tích và giải toán có lời văn bằng sơ đồ thanh.',
    mascotName: 'Thỏ Abby',
    bgGradient: 'from-sky-500 to-blue-600'
  },
  {
    id: 'sudoku',
    title: 'Sudoku & Ma Trận Số',
    subtitle: 'Sudoku 4x4 hình khối, số 1-4, Sudoku khối màu zic-zac và Killer Sudoku tính tổng.',
    mascotName: 'Chuột Casey',
    bgGradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'pattern',
    title: 'Quy Luật Lặp Lại & Mê Cung',
    subtitle: 'Quy luật tăng dần, chuỗi hình học xoay 4 góc, mê cung hoa và chuỗi domino.',
    mascotName: 'Thỏ Abby',
    bgGradient: 'from-purple-500 to-fuchsia-600'
  },
  {
    id: 'logic',
    title: 'Vị Trí Hàng Ngũ & Suy Luận',
    subtitle: 'Công thức đếm bù trừ, hàng chữ L, chữ T, xếp thứ tự que đo và bài toán ghế rạp hát.',
    mascotName: 'Khỉ Benny & Thầy Mayle',
    bgGradient: 'from-rose-500 to-pink-600'
  },
  {
    id: 'challenge',
    title: 'Đấu Trường Siêu Thử Thách',
    subtitle: 'Mê cung tròn xoắn ốc, hàng rào nông trại bò, Pixidoku rừng và Star Battle săn sao.',
    mascotName: 'Biệt đội Spark Math',
    bgGradient: 'from-red-600 to-rose-700'
  }
];

const BENNY: Mascot = { name: 'Khỉ Benny', avatar: '🐵', message: '' };
const ABBY: Mascot = { name: 'Thỏ Abby', avatar: '🐰', message: '' };
const CASEY: Mascot = { name: 'Chuột Casey', avatar: '🐹', message: '' };
const MAYLE: Mascot = { name: 'Thầy Mayle', avatar: '👨‍🏫', message: '' };

const topicName = (id: string) => TOPICS.find((t) => t.id === id)?.title ?? '';

export const ALL_LESSONS: LessonQuestion[] = [
  // ==========================================
  // TRẠM 1: BIỂU ĐỒ HÌNH ẢNH (Trang 5 - Trang 20)
  // ==========================================
  {
    id: 'pic-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Món ăn trưa yêu thích của bạn Casey',
    badgeTitle: 'Bài 1 · Trang 6',
    instruction: 'Biểu đồ hình ảnh bên dưới cho thấy số lượt bình chọn những món ăn trưa yêu thích của bạn Casey. Lưu ý: 1 Phiếu = 1 lượt bình chọn.',
    hint: 'Em đếm số phiếu của từng món: Pizza có 4 phiếu, Bánh mì kẹp chỉ có 1 phiếu!',
    mascot: { ...BENNY, message: 'Tớ cứ tưởng tớ làm bánh mì kẹp dở, hóa ra là vì các bạn thích ăn pizza hơn!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '1 Phiếu 🎫 = 1 lượt bình chọn',
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
    }
  },
  {
    id: 'pic-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Đồ chơi yêu thích của 19 bạn nhỏ',
    badgeTitle: 'Bài 2 · Trang 7',
    instruction: 'Biểu đồ bên dưới cho thấy số lượt bình chọn của 19 bạn nhỏ. Lưu ý: 1 Mặt cười = 1 lượt bình chọn.',
    hint: 'Hàng ô tô có 3 mặt cười; hàng quả bóng có tới 7 mặt cười!',
    mascot: { ...CASEY, message: 'Chúng mình có thể dùng biểu đồ tranh để khảo sát mọi sở thích trong lớp!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '1 Mặt cười 😊 = 1 lượt bình chọn',
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
    }
  },
  {
    id: 'pic-3-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Món ăn trưa yêu thích của lớp Abby',
    badgeTitle: 'Bài 3.1 · Trang 8',
    instruction: 'Biểu đồ cho thấy số lượt bình chọn món ăn trưa của các bạn trong lớp Abby. Lưu ý: Mỗi biểu tượng thức ăn = 1 lượt bình chọn.',
    hint: 'Mì Ý có 5 đĩa, Bánh Taco có 3 chiếc, Gà rán có 4 miếng.',
    mascot: { ...ABBY, message: 'Lớp mình bình chọn món ăn trưa thật rôm rả!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi biểu tượng thức ăn 🍽️ = 1 lượt bình chọn',
      items: [
        { id: 'spaghetti', label: 'Mì Ý', icon: '🍝', count: 5 },
        { id: 'taco', label: 'Bánh Taco', icon: '🌮', count: 3 },
        { id: 'chicken', label: 'Gà rán', icon: '🍗', count: 4 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Món ăn trưa có NHIỀU lượt bình chọn nhất là:',
          options: ['Mì Ý', 'Bánh Taco', 'Gà rán'],
          correctAnswer: 'Mì Ý'
        },
        {
          id: 'q2',
          prompt: 'b) Món ăn trưa có ÍT lượt bình chọn nhất là:',
          options: ['Mì Ý', 'Bánh Taco', 'Gà rán'],
          correctAnswer: 'Bánh Taco'
        }
      ]
    }
  },
  {
    id: 'pic-3-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Các loài hoa mẹ Casey trồng trong vườn',
    badgeTitle: 'Bài 3.2 · Trang 8',
    instruction: 'Biểu đồ cho thấy các loại hoa khác nhau mà mẹ Casey đã trồng trong vườn. Lưu ý: Mỗi biểu tượng hoa = 1 lượt bình chọn.',
    hint: 'Tulip có 5 bông, Hồng có 4 bông, Lily có 2 bông, Cúc có 4 bông.',
    mascot: { ...CASEY, message: 'Vườn hoa của mẹ mình đẹp tuyệt vời!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi biểu tượng hoa 🌸 = 1 cây hoa trong vườn',
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
    }
  },
  {
    id: 'pic-4-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Bình chọn nhân vật yêu thích',
    badgeTitle: 'Bài 4.1 · Trang 9',
    instruction: 'Biểu đồ cho thấy số lượt bình chọn dành cho 4 nhân vật Benny, Abby, Casey, Rory. Lưu ý: Mỗi trái tim = 1 lượt bình chọn.',
    hint: 'Benny có 5 trái tim, Abby có 3 trái tim, Casey có 4 trái tim.',
    mascot: { ...BENNY, message: 'Cảm ơn các bạn đã thả tim cho chúng mình!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi ❤️ = 1 lượt bình chọn',
      items: [
        { id: 'benny', label: 'Benny 🐵', icon: '❤️', count: 5 },
        { id: 'abby', label: 'Abby 🐰', icon: '❤️', count: 3 },
        { id: 'casey', label: 'Casey 🐹', icon: '❤️', count: 4 },
        { id: 'rory', label: 'Rory 🐻', icon: '❤️', count: 0 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Có bao nhiêu lượt bình chọn cho Benny?',
          options: ['3', '4', '5', '6'],
          correctAnswer: '5'
        },
        {
          id: 'q2',
          prompt: 'b) Nhân vật được nhiều bạn yêu thích thứ hai là ai?',
          options: ['Benny', 'Abby', 'Casey', 'Rory'],
          correctAnswer: 'Casey'
        }
      ]
    }
  },
  {
    id: 'pic-4-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Môn học yêu thích & Phép trừ so sánh',
    badgeTitle: 'Bài 4.2 · Trang 9',
    instruction: 'Biểu đồ cho thấy số lượt bình chọn dành cho 4 môn học: Toán, Tiếng Việt, Tiếng Anh, Mỹ Thuật. Lưu ý: Mỗi trái tim = 1 lượt bình chọn.',
    hint: 'Môn Tiếng Việt có 4 tim. Môn Mỹ thuật có 6 tim, môn Toán có 3 tim. Lấy 6 - 3 = 3!',
    mascot: { ...ABBY, message: 'Toán học và Mỹ thuật đều giúp chúng mình rèn luyện tư duy sáng tạo!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi ❤️ = 1 lượt bình chọn',
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
          prompt: 'b) Môn Mỹ thuật được bình chọn nhiều hơn môn Toán mấy lượt?',
          options: ['2 lượt', '3 lượt', '4 lượt', '5 lượt'],
          correctAnswer: '3 lượt'
        }
      ]
    }
  },
  {
    id: 'pic-5-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Số lượng thú cưng trong nhà',
    badgeTitle: 'Bài 5.1 · Trang 10',
    instruction: 'Biểu đồ cho thấy số lượng thú cưng nuôi trong nhà. Lưu ý: Mỗi hình tam giác = 1 con.',
    hint: 'Hamster có 4 hình tam giác. Chó có 3 hình tam giác. 4 - 3 = 1 con!',
    mascot: { ...CASEY, message: 'Những chú chuột hamster nhỏ nhắn xinh xắn thật đáng yêu!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi tam giác 🔺 = 1 con thú cưng',
      items: [
        { id: 'dog', label: 'Chó 🐕', icon: '🔺', count: 3 },
        { id: 'cat', label: 'Mèo 🐈', icon: '🔺', count: 3 },
        { id: 'hamster', label: 'Hamster 🐹', icon: '🔺', count: 4 },
        { id: 'bird', label: 'Chim 🦜', icon: '🔺', count: 3 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'A. Có bao nhiêu con hamster?',
          options: ['2 con', '3 con', '4 con', '5 con'],
          correctAnswer: '4 con'
        },
        {
          id: 'q2',
          prompt: 'B. Hamster nhiều hơn chó bao nhiêu con?',
          options: ['1 con', '2 con', '3 con', '4 con'],
          correctAnswer: '1 con'
        }
      ]
    }
  },
  {
    id: 'pic-6-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tỉ lệ nhân: Số sách các bạn đã đọc',
    badgeTitle: 'Bài 6.1 · Trang 12',
    instruction: 'Biểu đồ cho thấy số sách Abby, Benny, Casey đã đọc. Lưu ý: Mỗi hình tam giác thể hiện 3 quyển sách.',
    hint: 'Abby có 5 tam giác = 5 × 3 = 15 quyển. Benny có 3 tam giác = 3 × 3 = 9 quyển. Abby hơn Benny: 15 - 9 = 6 quyển!',
    mascot: { ...ABBY, message: 'Nhớ nhân với 3 nhé: Mỗi hình tam giác = 3 quyển sách đấy!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🔺 = 3 quyển sách',
      multiplier: 3,
      items: [
        { id: 'abby', label: 'Abby 🐰', icon: '🔺', count: 5, actualValue: 15 },
        { id: 'benny', label: 'Benny 🐵', icon: '🔺', count: 3, actualValue: 9 },
        { id: 'casey', label: 'Casey 🐹', icon: '🔺', count: 1, actualValue: 3 },
        { id: 'blizzard', label: 'Blizzard 🐻', icon: '🔺', count: 2, actualValue: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Abby đã đọc được bao nhiêu quyển sách?',
          options: ['9 quyển', '12 quyển', '15 quyển', '18 quyển'],
          correctAnswer: '15 quyển'
        },
        {
          id: 'q2',
          prompt: 'Hỏi Abby đã đọc nhiều hơn Benny bao nhiêu quyển sách?',
          options: ['3 quyển', '6 quyển', '9 quyển', '12 quyển'],
          correctAnswer: '6 quyển'
        }
      ]
    }
  },
  {
    id: 'pic-6-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Số tàu giấy đã gấp (Mỗi hình tròn = 3 tàu)',
    badgeTitle: 'Bài 6.2 · Trang 12',
    instruction: 'Biểu đồ cho thấy số tàu giấy Abby, Benny, Casey và Blizzard đã gấp được. Lưu ý: Mỗi chấm vàng thể hiện 3 tàu giấy.',
    hint: 'Benny có 8 chấm vàng = 8 × 3 = 24 tàu. Casey có 5 chấm = 5 × 3 = 15 tàu. Benny hơn Casey: 24 - 15 = 9 tàu!',
    mascot: { ...BENNY, message: 'Tớ thi gấp tàu giấy với Casey nè, xem ai khéo tay hơn nào!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🟡 = 3 tàu giấy',
      multiplier: 3,
      items: [
        { id: 'abby', label: 'Abby 🐰', icon: '🟡', count: 1, actualValue: 3 },
        { id: 'benny', label: 'Benny 🐵', icon: '🟡', count: 8, actualValue: 24 },
        { id: 'casey', label: 'Casey 🐹', icon: '🟡', count: 5, actualValue: 15 },
        { id: 'blizzard', label: 'Blizzard 🐻', icon: '🟡', count: 3, actualValue: 9 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Benny đã gấp được bao nhiêu tàu giấy?',
          options: ['18 tàu', '21 tàu', '24 tàu', '27 tàu'],
          correctAnswer: '24 tàu'
        },
        {
          id: 'q2',
          prompt: 'Hỏi Benny đã gấp được nhiều hơn Casey bao nhiêu tàu giấy?',
          options: ['6 tàu', '9 tàu', '12 tàu', '15 tàu'],
          correctAnswer: '9 tàu'
        }
      ]
    }
  },
  {
    id: 'pic-7-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tổng số thú cưng của 3 bạn',
    badgeTitle: 'Bài 7.1 · Trang 13',
    instruction: 'Dùng biểu đồ hình ảnh dưới đây để trả lời câu hỏi: Hỏi cả 3 bạn Andre, Maddie, Scott có tất cả bao nhiêu thú cưng? Lưu ý: Mỗi hình thoi thể hiện 3 thú cưng.',
    hint: 'Andre có 1 thoi, Maddie có 4 thoi, Scott có 2 thoi. Tổng cộng = 1 + 4 + 2 = 7 thoi. Mỗi thoi là 3 con: 7 × 3 = 21 con!',
    mascot: { ...CASEY, message: 'Cộng tất cả số hình thoi rồi nhân với 3 là ra tổng số thú cưng!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🔶 = 3 thú cưng',
      multiplier: 3,
      items: [
        { id: 'andre', label: 'Andre', icon: '🔶', count: 1, actualValue: 3 },
        { id: 'maddie', label: 'Maddie', icon: '🔶', count: 4, actualValue: 12 },
        { id: 'scott', label: 'Scott', icon: '🔶', count: 2, actualValue: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Cả 3 bạn nhỏ có tất cả bao nhiêu thú cưng?',
          options: ['15 thú cưng', '18 thú cưng', '21 thú cưng', '24 thú cưng'],
          correctAnswer: '21 thú cưng'
        }
      ]
    }
  },
  {
    id: 'pic-7-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tổng số lượng bài tập về nhà',
    badgeTitle: 'Bài 7.2 · Trang 13',
    instruction: 'Hỏi cả 3 bạn Rort, Blizzard và Mike có tất cả bao nhiêu bài tập về nhà? Lưu ý: Mỗi hình thoi thể hiện 3 bài tập.',
    hint: 'Rort: 3 thoi, Blizzard: 1 thoi, Mike: 2 thoi. Tổng số thoi = 3 + 1 + 2 = 6 thoi. 6 × 3 = 18 bài tập!',
    mascot: { ...BENNY, message: 'Làm xong bài tập thì chúng mình cùng đi chơi công viên nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🔶 = 3 bài tập',
      multiplier: 3,
      items: [
        { id: 'rort', label: 'Rort', icon: '🔶', count: 3, actualValue: 9 },
        { id: 'blizzard', label: 'Blizzard', icon: '🔶', count: 1, actualValue: 3 },
        { id: 'mike', label: 'Mike', icon: '🔶', count: 2, actualValue: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Ba bạn có tất cả bao nhiêu bài tập về nhà?',
          options: ['12 bài tập', '15 bài tập', '18 bài tập', '21 bài tập'],
          correctAnswer: '18 bài tập'
        }
      ]
    }
  },
  {
    id: 'pic-8-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Độ tuổi trẻ em (Mỗi hình tròn = 4 trẻ em)',
    badgeTitle: 'Bài 8.1 · Trang 14',
    instruction: 'Biểu đồ cho thấy các độ tuổi khác nhau của các bạn nhỏ. Hỏi số lượng các trẻ em 7 tuổi nhiều hơn bao nhiêu so với số lượng trẻ em 4 tuổi? Lưu ý: Mỗi chấm tròn thể hiện cho 4 trẻ em.',
    hint: '7 tuổi có 7 chấm tròn, 4 tuổi có 1 chấm tròn. Chênh lệch là: (7 - 1) × 4 = 6 × 4 = 24 trẻ em!',
    mascot: { ...ABBY, message: 'Mỗi chấm tròn ở đây đại diện cho tận 4 bạn nhỏ đấy!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🟡 = 4 trẻ em',
      multiplier: 4,
      items: [
        { id: 'age4', label: '4 tuổi', icon: '🟡', count: 1, actualValue: 4 },
        { id: 'age5', label: '5 tuổi', icon: '🟡', count: 7, actualValue: 28 },
        { id: 'age6', label: '6 tuổi', icon: '🟡', count: 5, actualValue: 20 },
        { id: 'age7', label: '7 tuổi', icon: '🟡', count: 7, actualValue: 28 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Trẻ em 7 tuổi nhiều hơn trẻ em 4 tuổi bao nhiêu trẻ em?',
          options: ['16 trẻ em', '20 trẻ em', '24 trẻ em', '28 trẻ em'],
          correctAnswer: '24 trẻ em'
        }
      ]
    }
  },
  {
    id: 'pic-8-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Trang phục yêu thích (Mỗi hình tròn = 5 học sinh)',
    badgeTitle: 'Bài 8.2 · Trang 14',
    instruction: 'Biểu đồ cho thấy trang phục yêu thích của học sinh. Hỏi có bao nhiêu học sinh thích áo sơ mi hơn áo thun? Lưu ý: Mỗi chấm vàng thể hiện cho 5 học sinh.',
    hint: 'Áo sơ mi có 5 chấm = 25 bạn. Áo thun có 1 chấm = 5 bạn. 25 - 5 = 20 học sinh!',
    mascot: { ...CASEY, message: 'Tỷ lệ là 1 chấm = 5 bạn học sinh nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🟡 = 5 học sinh',
      multiplier: 5,
      items: [
        { id: 'tshirt', label: 'Áo thun 👕', icon: '🟡', count: 1, actualValue: 5 },
        { id: 'jeans', label: 'Quần jean 👖', icon: '🟡', count: 5, actualValue: 25 },
        { id: 'jacket', label: 'Áo khoác 🧥', icon: '🟡', count: 4, actualValue: 20 },
        { id: 'shirt', label: 'Áo sơ mi 👔', icon: '🟡', count: 5, actualValue: 25 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Có bao nhiêu học sinh thích áo sơ mi hơn áo thun?',
          options: ['15 học sinh', '20 học sinh', '25 học sinh', '30 học sinh'],
          correctAnswer: '20 học sinh'
        }
      ]
    }
  },
  {
    id: 'pic-9-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Mùa yêu thích (Mỗi ô vuông = 4 lượt)',
    badgeTitle: 'Bài 9.1 · Trang 15',
    instruction: 'Biểu đồ cho thấy số lượt bình chọn về các mùa yêu thích. Hỏi tổng số lượt bình chọn của mùa xuân nhiều hơn số lượt bình chọn của mùa thu bao nhiêu lượt? Lưu ý: Mỗi ô vuông thể hiện cho 4 lượt bình chọn.',
    hint: 'Xuân có 3 ô = 12 lượt. Thu có 1 ô = 4 lượt. Lấy 12 - 4 = 8 lượt!',
    mascot: { ...BENNY, message: 'Mùa xuân hoa nở chim hót nên nhiều bạn thích nhất nè!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🟦 = 4 lượt bình chọn',
      multiplier: 4,
      items: [
        { id: 'spring', label: 'Mùa Xuân 🌸', icon: '🟦', count: 3, actualValue: 12 },
        { id: 'summer', label: 'Mùa Hạ ☀️', icon: '🟦', count: 1, actualValue: 4 },
        { id: 'autumn', label: 'Mùa Thu 🍂', icon: '🟦', count: 1, actualValue: 4 },
        { id: 'winter', label: 'Mùa Đông ❄️', icon: '🟦', count: 2, actualValue: 8 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Tổng số lượt bình chọn của mùa xuân nhiều hơn mùa thu bao nhiêu lượt?',
          options: ['4 lượt', '6 lượt', '8 lượt', '10 lượt'],
          correctAnswer: '8 lượt'
        }
      ]
    }
  },
  {
    id: 'pic-9-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Trò chơi ra chơi (Mỗi hình tròn = 3 lượt)',
    badgeTitle: 'Bài 9.2 · Trang 15',
    instruction: 'Hỏi tổng số lượt bình chọn của trò bắn bi ít hơn số lượt bình chọn của nhảy dây bao nhiêu lượt? Lưu ý: Mỗi hình tròn thể hiện cho 3 lượt bình chọn.',
    hint: 'Nhảy dây có 4 chấm = 12 lượt. Bắn bi có 1 chấm = 3 lượt. 12 - 3 = 9 lượt!',
    mascot: { ...CASEY, message: 'Giờ ra chơi chúng mình hay chơi nhảy dây và trốn tìm vui lắm!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🟡 = 3 lượt bình chọn',
      multiplier: 3,
      items: [
        { id: 'jump', label: 'Nhảy dây', icon: '🟡', count: 4, actualValue: 12 },
        { id: 'hide', label: 'Trốn tìm', icon: '🟡', count: 3, actualValue: 9 },
        { id: 'marbles', label: 'Bắn bi', icon: '🟡', count: 1, actualValue: 3 },
        { id: 'blind', label: 'Bịt mắt bắt dê', icon: '🟡', count: 5, actualValue: 15 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Số lượt bình chọn của trò bắn bi ÍT HƠN nhảy dây bao nhiêu lượt?',
          options: ['3 lượt', '6 lượt', '9 lượt', '12 lượt'],
          correctAnswer: '9 lượt'
        }
      ]
    }
  },
  {
    id: 'pic-10',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tự vẽ lại biểu đồ bị biến mất cùng Casey',
    badgeTitle: 'Bài 10 · Trang 16',
    instruction: 'Casey đã hỏi 24 người về mùa yêu thích của họ. Mười hai người nói mùa xuân. Số người nói mùa hè và thu đều giống nhau. Sáu người nói mùa đông. Lưu ý: Mỗi ô vuông thể hiện cho 3 lượt bình chọn. Hãy bấm (+) và (-) để vẽ lại các ô!',
    hint: 'Tổng 24 người: Xuân 12 người (12:3 = 4 ô); Đông 6 người (6:3 = 2 ô); Còn lại 24 - 12 - 6 = 6 người chia đều cho Hè và Thu (mỗi mùa 3 người = 1 ô)!',
    mascot: { ...CASEY, message: 'Các ký hiệu trong biểu đồ bị gió thổi mất rồi, bạn giúp mình vẽ lại nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 3,
      totalPeople: 24,
      categories: [
        { id: 'spring', label: 'Mùa Xuân (12 người)', targetSymbols: 4, symbolColor: 'bg-emerald-500' },
        { id: 'summer', label: 'Mùa Hạ (3 người)', targetSymbols: 1, symbolColor: 'bg-amber-500' },
        { id: 'autumn', label: 'Mùa Thu (3 người)', targetSymbols: 1, symbolColor: 'bg-orange-500' },
        { id: 'winter', label: 'Mùa Đông (6 người)', targetSymbols: 2, symbolColor: 'bg-blue-500' }
      ]
    }
  },

  // ==========================================
  // TRẠM 2: THỂ TÍCH & ĐƠN VỊ LÍT (Trang 21 - Trang 40)
  // ==========================================
  {
    id: 'vol-fill',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đổ đầy nước vào chai giúp Benny & So sánh',
    badgeTitle: 'Bài 1.1 & 1.2 · Trang 25',
    instruction: 'Thể tích là lượng chất lỏng trong một vật chứa, đơn vị đo là Lít (l). Hãy kéo thanh trượt để điều chỉnh lượng nước sao cho thể tích chai A LỚN HƠN chai B.',
    hint: 'Kéo để mực nước của Chai A cao hơn Chai B.',
    mascot: { ...BENNY, message: 'Chai càng to thì thể tích chứa được càng lớn đấy!' },
    activity: {
      type: 'volumeSlider',
      bottles: [
        { id: 'A', name: 'Chai Nước A', initial: 80, capacity: 100 },
        { id: 'B', name: 'Chai Nước B', initial: 30, capacity: 100 }
      ],
      targetCondition: 'A_GREATER_THAN_B'
    }
  },
  {
    id: 'vol-compare-2-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'So sánh thể tích 4 chai nước A, B, C, D',
    badgeTitle: 'Bài 2.1 · Trang 26',
    instruction: 'Quan sát 4 chai nước có cùng kích thước nhưng lượng nước khác nhau và chọn đáp án chính xác.',
    hint: 'Chai B đầy nước nhất, Chai C ít nước nhất. Chai A và Chai D có mực nước bằng nhau!',
    mascot: { ...CASEY, message: 'Các chai giống nhau thì nhìn mực nước là biết ngay chai nào nhiều hơn!' },
    activity: {
      type: 'volumeComparison',
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
          prompt: 'c) Thể tích nước trong chai A BẰNG thể tích chai nào?',
          options: ['Chai B', 'Chai C', 'Chai D'],
          correctAnswer: 'Chai D'
        }
      ]
    }
  },
  {
    id: 'vol-compare-3-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Cốc nước cam của Casey, Abby, Benny & Thầy Mayle',
    badgeTitle: 'Bài 3.2 · Trang 27',
    instruction: 'Casey muốn cốc nước cam có thể tích lớn nhất. Abby muốn cốc nước cam nhỏ nhất. Benny muốn cốc cùng thể tích với Thầy Mayle.',
    hint: 'Cốc B nhiều nước nhất -> Casey. Cốc C ít nước nhất -> Abby. Cốc A và D bằng nhau -> Benny và Thầy Mayle!',
    mascot: { ...MAYLE, message: 'Cùng chia nước cam giải khát sau giờ học nào các em!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'A', label: 'Cốc A 🍊', levelPercent: 60, color: '#f59e0b' },
        { id: 'B', label: 'Cốc B 🍊', levelPercent: 95, color: '#f59e0b' },
        { id: 'C', label: 'Cốc C 🍊', levelPercent: 25, color: '#f59e0b' },
        { id: 'D', label: 'Cốc D 🍊', levelPercent: 60, color: '#f59e0b' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Casey muốn cốc lớn nhất, Casey sẽ chọn cốc nào?',
          options: ['Cốc A', 'Cốc B', 'Cốc C', 'Cốc D'],
          correctAnswer: 'Cốc B'
        },
        {
          id: 'q2',
          prompt: 'Abby muốn cốc nhỏ nhất, Abby sẽ chọn cốc nào?',
          options: ['Cốc A', 'Cốc B', 'Cốc C', 'Cốc D'],
          correctAnswer: 'Cốc C'
        }
      ]
    }
  },
  {
    id: 'vol-compare-4-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Các bể nước 1, 2, 3 có cùng chiều cao',
    badgeTitle: 'Bài 4.1 · Trang 28',
    instruction: 'Các bể nước 1, 2 và 3 có cùng chiều cao được đổ nước vào. Hãy so sánh thể tích nước của 3 bể.',
    hint: 'Bể có đáy càng rộng thì thể tích càng lớn: Bể 2 rộng nhất, Bể 1 hẹp nhất. Thứ tự từ nhỏ đến lớn là: 1, 3, 2!',
    mascot: { ...CASEY, message: 'Cùng chiều cao nhưng đáy rộng hơn thì chứa được nhiều nước hơn!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: '1', label: 'Bể 1 (Hẹp)', levelPercent: 30, color: '#38bdf8' },
        { id: '2', label: 'Bể 2 (Rộng nhất)', levelPercent: 90, color: '#38bdf8' },
        { id: '3', label: 'Bể 3 (Trung bình)', levelPercent: 60, color: '#38bdf8' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Bể chứa có thể tích nước LỚN NHẤT là:',
          options: ['Bể 1', 'Bể 2', 'Bể 3'],
          correctAnswer: 'Bể 2'
        },
        {
          id: 'q2',
          prompt: 'b) Bể chứa có thể tích nước NHỎ NHẤT là:',
          options: ['Bể 1', 'Bể 2', 'Bể 3'],
          correctAnswer: 'Bể 1'
        }
      ]
    }
  },
  {
    id: 'vol-compare-5-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sắp xếp 4 bình nước ép A, B, C, D theo thể tích',
    badgeTitle: 'Bài 5.2 · Trang 29',
    instruction: 'Quan sát số cốc nước ép đong được từ 4 bình A, B, C, D. Hãy sắp xếp 4 bình theo thứ tự thể tích từ NHỎ NHẤT tới LỚN NHẤT.',
    hint: 'Bình C đong được ít cốc nhất, tiếp theo là bình D, bình A và bình B nhiều cốc nhất!',
    mascot: { ...BENNY, message: 'Đong cốc giúp ta xếp hạng thể tích cực kỳ trực quan!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự thể tích nước ép từ nhỏ nhất đến lớn nhất:',
      directionLabel: 'Từ Nhỏ Nhất ➔ Lớn Nhất (C, D, A, B)',
      items: [
        { id: 'A', label: 'Bình A', description: '4 cốc', icon: '🧃' },
        { id: 'B', label: 'Bình B', description: '6 cốc', icon: '🧃' },
        { id: 'C', label: 'Bình C', description: '2 cốc', icon: '🧃' },
        { id: 'D', label: 'Bình D', description: '3 cốc', icon: '🧃' }
      ],
      correctOrder: ['C', 'D', 'A', 'B']
    }
  },
  {
    id: 'vol-tank-6-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đo thể tích bể nước bằng chai 1 Lít',
    badgeTitle: 'Bài 6.1 · Trang 30',
    instruction: 'Nước từ Bể A rót đầy 6 chai 1L. Nước từ Bể B rót đầy 9 chai 1L. So sánh thể tích của hai bể.',
    hint: 'Bể A ít hơn Bể B: 9 - 6 = 3 lít. Cả hai bể: 6 + 9 = 15 lít!',
    mascot: { ...MAYLE, message: 'Mỗi chai tiêu chuẩn là 1 Lít (1L). Chúng ta cùng làm phép tính cộng trừ nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '1 Chai 🧴 = 1 Lít nước',
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
          options: ['12 lít', '15 lít', '18 lít', '21 lít'],
          correctAnswer: '15 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-7',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ đồ đoạn thẳng: Nước ép táo của Benny & Abby',
    badgeTitle: 'Bài 7 · Trang 32',
    instruction: 'Benny có 46L nước ép táo. Abby có nhiều hơn Benny 54L nước ép táo. Quan sát sơ đồ đoạn thẳng để trả lời câu hỏi.',
    hint: 'Abby = 46 + 54 = 100L. Cả hai bạn = 46 + 100 = 146L.',
    mascot: { ...ABBY, message: 'Sơ đồ đoạn thẳng giúp bé nhìn thấy rõ đại lượng nhiều hơn và tổng số!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Benny 🐵', lengthVal: 46, display: '46 L', color: 'bg-emerald-500' },
        {
          label: 'Abby 🐰',
          lengthVal: 100,
          display: '? L',
          parts: [
            { val: 46, label: '46 L' },
            { val: 54, label: '+54 L' }
          ],
          color: 'bg-amber-400'
        }
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
          options: ['140 lít', '146 lít', '150 lít', '156 lít'],
          correctAnswer: '146 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-8-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Nước ép rau củ của Casey & Abby',
    badgeTitle: 'Bài 8.1 · Trang 33',
    instruction: 'Casey có 68L nước ép rau củ. Abby có nhiều hơn Casey 32L nước rau củ.',
    hint: 'Abby = 68 + 32 = 100L. Cả hai bạn = 68 + 100 = 168L!',
    mascot: { ...CASEY, message: 'Nước ép rau củ vừa bổ dưỡng vừa tốt cho sức khỏe!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Casey 🐹', lengthVal: 68, display: '68 L', color: 'bg-emerald-500' },
        {
          label: 'Abby 🐰',
          lengthVal: 100,
          display: '? L',
          parts: [
            { val: 68, label: '68 L' },
            { val: 32, label: '+32 L' }
          ],
          color: 'bg-amber-400'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'A. Abby có bao nhiêu lít nước ép rau củ?',
          options: ['90 lít', '100 lít', '110 lít', '120 lít'],
          correctAnswer: '100 lít'
        },
        {
          id: 'q2',
          prompt: 'B. Cả hai bạn có tất cả bao nhiêu lít nước ép rau củ?',
          options: ['158 lít', '168 lít', '178 lít', '188 lít'],
          correctAnswer: '168 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-8-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Nước ép táo của Benny & Abby',
    badgeTitle: 'Bài 8.2 · Trang 33',
    instruction: 'Benny có 37 L nước ép táo. Abby có nhiều hơn Benny 63L nước ép táo.',
    hint: 'Abby = 37 + 63 = 100L. Cả hai bạn = 37 + 100 = 137L!',
    mascot: { ...BENNY, message: 'Cộng tròn trăm thật là thích: 37 + 63 = 100 tròn!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Benny 🐵', lengthVal: 37, display: '37 L', color: 'bg-sky-500' },
        {
          label: 'Abby 🐰',
          lengthVal: 100,
          display: '? L',
          parts: [
            { val: 37, label: '37 L' },
            { val: 63, label: '+63 L' }
          ],
          color: 'bg-rose-500'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Abby có bao nhiêu lít nước ép táo?',
          options: ['90 lít', '100 lít', '110 lít', '120 lít'],
          correctAnswer: '100 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Cả hai bạn có tổng cộng bao nhiêu lít nước ép táo?',
          options: ['127 lít', '137 lít', '147 lít', '157 lít'],
          correctAnswer: '137 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-9-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thùng nước và bình nước',
    badgeTitle: 'Bài 9.1 · Trang 34',
    instruction: 'Một bình nước có 48 lít nước. Một thùng nước chứa nhiều hơn bình nước 35 lít nước.',
    hint: 'Thùng nước = 48 + 35 = 83L. Cả bình và thùng = 48 + 83 = 131L!',
    mascot: { ...BENNY, message: 'Thùng to hơn bình thì chứa được nhiều lít nước hơn!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bình nước 🫖', lengthVal: 48, display: '48 L', color: 'bg-emerald-500' },
        {
          label: 'Thùng nước 🛢️',
          lengthVal: 83,
          display: '? L',
          parts: [
            { val: 48, label: '48 L' },
            { val: 35, label: '+35 L' }
          ],
          color: 'bg-amber-500'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Thùng nước chứa bao nhiêu lít nước?',
          options: ['73 lít', '83 lít', '93 lít', '103 lít'],
          correctAnswer: '83 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Cả bình và thùng chứa tất cả bao nhiêu lít nước?',
          options: ['121 lít', '131 lít', '141 lít', '151 lít'],
          correctAnswer: '131 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-9-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bể cá và bồn nước lớn',
    badgeTitle: 'Bài 9.2 · Trang 34',
    instruction: 'Một bể cá chứa 120 lít nước. Một bồn nước chứa nhiều hơn bể cá 80 lít nước.',
    hint: 'Bồn nước = 120 + 80 = 200 lít. Cả bể cá và bồn nước = 120 + 200 = 320 lít!',
    mascot: { ...MAYLE, message: 'Những con số lớn hơn một trăm nhưng cách tính vẫn tương tự nhé các em!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể cá 🐠', lengthVal: 120, display: '120 L', color: 'bg-sky-500' },
        {
          label: 'Bồn nước 🚰',
          lengthVal: 200,
          display: '? L',
          parts: [
            { val: 120, label: '120 L' },
            { val: 80, label: '+80 L' }
          ],
          color: 'bg-indigo-500'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Hỏi bồn nước chứa bao nhiêu lít nước?',
          options: ['180 lít', '200 lít', '220 lít', '240 lít'],
          correctAnswer: '200 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Hỏi cả bể cá và bồn nước chứa tất cả bao nhiêu lít nước?',
          options: ['300 lít', '320 lít', '340 lít', '360 lít'],
          correctAnswer: '320 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-10-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bài toán bớt: Nước ép dưa hấu',
    badgeTitle: 'Bài 10.1 · Trang 35',
    instruction: 'Casey có 83 L nước ép dưa hấu. Benny có ít hơn Casey 33L nước ép dưa hấu.',
    hint: 'Benny ít hơn thì ta dùng phép trừ: 83 - 33 = 50L. Tổng cả hai bạn = 83 + 50 = 133L!',
    mascot: { ...CASEY, message: 'Nhớ đọc kỹ từ khóa "ÍT HƠN" để dùng phép trừ nhé!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Casey 🐹', lengthVal: 83, display: '83 L', color: 'bg-rose-500' },
        { label: 'Benny 🐵', lengthVal: 50, display: '50 L', color: 'bg-emerald-500' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Hỏi Benny có bao nhiêu lít nước dưa hấu?',
          options: ['40 lít', '50 lít', '60 lít', '70 lít'],
          correctAnswer: '50 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Cả hai bạn có tất cả bao nhiêu lít nước ép dưa hấu?',
          options: ['123 lít', '133 lít', '143 lít', '153 lít'],
          correctAnswer: '133 lít'
        }
      ]
    }
  },
  {
    id: 'vol-bar-10-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bài toán một nửa (1/2)',
    badgeTitle: 'Bài 10.2 · Trang 35',
    instruction: 'Abby có 42 L nước ép dưa hấu. Casey chỉ có một nửa (1/2) số thể tích nước ép bưởi so với Abby.',
    hint: 'Một nửa của 42 là: 42 : 2 = 21L. Tổng cả hai = 42 + 21 = 63L!',
    mascot: { ...ABBY, message: 'Một nửa chính là chia cho 2 đấy bạn ơi!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Abby 🐰', lengthVal: 42, display: '42 L', color: 'bg-amber-500' },
        { label: 'Casey 🐹 (Một nửa)', lengthVal: 21, display: '21 L', color: 'bg-teal-500' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Hỏi Casey có bao nhiêu lít nước ép bưởi?',
          options: ['18 lít', '21 lít', '24 lít', '27 lít'],
          correctAnswer: '21 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Cả hai bạn có tổng cộng bao nhiêu lít nước ép?',
          options: ['59 lít', '63 lít', '67 lít', '71 lít'],
          correctAnswer: '63 lít'
        }
      ]
    }
  },

  // ==========================================
  // TRẠM 3: SUDOKU & MA TRẬN SỐ (Trang 45 - Trang 50)
  // ==========================================
  {
    id: 'sud-shape-1',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku hình học 4x4 màu sắc',
    badgeTitle: 'Bài 1 · Trang 47',
    instruction: 'Vẽ các hình còn thiếu sao cho mỗi hàng, mỗi cột và mỗi khối 2x2 đều phải có đủ 4 hình: 🔺 Tam giác, 🟢 Hình tròn, 🟧 Hình vuông, ❤️ Trái tim.',
    hint: 'Tìm hàng hoặc cột chỉ còn thiếu 1 hình để điền trước!',
    mascot: { ...ABBY, message: 'Không được có 2 hình giống hệt nhau trong cùng 1 hàng, cột hay khối 2x2 đâu nha!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'triangle', icon: '🔺', name: 'Tam giác' },
        { id: 'circle', icon: '🟢', name: 'Tròn' },
        { id: 'square', icon: '🟧', name: 'Vuông' },
        { id: 'heart', icon: '❤️', name: 'Tim' }
      ],
      initialGrid: [
        ['triangle', null, null, 'square'],
        [null, null, 'circle', null],
        [null, null, 'square', 'heart'],
        [null, 'heart', null, null]
      ],
      solution: [
        ['triangle', 'circle', 'heart', 'square'],
        ['square', 'heart', 'circle', 'triangle'],
        ['circle', 'triangle', 'square', 'heart'],
        ['heart', 'square', 'triangle', 'circle']
      ]
    }
  },
  {
    id: 'sud-num-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku chữ số 1 đến 4',
    badgeTitle: 'Bài 2 · Trang 48',
    instruction: 'Điền vào các ô. Mỗi hàng, cột và khối 2x2 phải có các số từ 1 đến 4.',
    hint: 'Mỗi hàng phải có đủ các số 1, 2, 3, 4 không trùng nhau.',
    mascot: { ...BENNY, message: 'Các số 1, 2, 3, 4 đang chờ bạn sắp xếp vào đúng vị trí nè!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, null, 1, 3],
        [null, 3, null, 4],
        [null, 2, null, null],
        [3, 1, null, null]
      ],
      solution: [
        [2, 4, 1, 3],
        [1, 3, 2, 4],
        [4, 2, 3, 1],
        [3, 1, 4, 2]
      ]
    }
  },
  {
    id: 'sud-jigsaw-3',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku 4x4 khối xếp hình cùng màu (Jigsaw)',
    badgeTitle: 'Bài 3 · Trang 49',
    instruction: 'Điền vào các ô. Mỗi hàng, cột và các khối cùng màu phải có các số từ 1 đến 4.',
    hint: 'Thay vì khối 2x2, lần này là 4 khối màu zic-zac: Hồng, Xanh dương, Xanh lá, Vàng! Mỗi khối màu phải có đủ 1, 2, 3, 4.',
    mascot: { ...CASEY, message: 'Dạng Sudoku khối zic-zac này rất thú vị! Chú ý các ô cùng màu nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      colorBlocks: [
        ['bg-rose-100', 'bg-sky-100', 'bg-sky-100', 'bg-sky-100'],
        ['bg-rose-100', 'bg-sky-100', 'bg-emerald-100', 'bg-emerald-100'],
        ['bg-rose-100', 'bg-rose-100', 'bg-amber-100', 'bg-emerald-100'],
        ['bg-amber-100', 'bg-amber-100', 'bg-amber-100', 'bg-emerald-100']
      ],
      initialGrid: [
        [4, null, null, 3],
        [null, 4, 3, null],
        [null, null, null, 4],
        [3, null, null, 1]
      ],
      // Solution from page 81 (Trang 5 đáp án)
      solution: [
        [4, 1, 2, 3],
        [1, 4, 3, 2],
        [2, 3, 1, 4],
        [3, 2, 4, 1]
      ]
    }
  },
  {
    id: 'sud-killer-4',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku tính tổng (Killer Sudoku Mini)',
    badgeTitle: 'Bài 4 · Trang 50',
    instruction: 'Điền số thích hợp từ 1 đến 4. Mỗi hàng và cột có số 1-4. Tổng các số trong mỗi khung hai ô phải bằng số màu đỏ ở góc trái trên cùng.',
    hint: 'Khung có số 7 ở góc trên gồm 2 ô: 3 và 4 (3+4=7). Khung có số 3 gồm 1 và 2 (1+2=3). Khung có số 5 gồm 1 và 4 hoặc 2 và 3!',
    mascot: { ...MAYLE, message: 'Vừa giải Sudoku vừa rèn luyện phép cộng nhẩm rất tuyệt vời!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      sumLabels: [
        [7, null, 5, 3],
        [5, null, null, null],
        [5, 3, 7, null],
        [null, null, 5, null]
      ],
      initialGrid: [
        [null, null, null, 2],
        [null, 3, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ],
      // Solution from page 81 (Trang 6 đáp án)
      solution: [
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
        [1, 2, 3, 4]
      ]
    }
  },

  // ==========================================
  // TRẠM 4: QUY LUẬT LẶP LẠI & MÊ CUNG (Trang 51 - Trang 58)
  // ==========================================
  {
    id: 'pat-animals-1',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Tìm quy luật đoàn động vật diễu hành',
    badgeTitle: 'Bài 1 · Trang 53',
    instruction: 'Đoàn diễu hành gồm các con vật lặp lại theo nhóm 4 bạn: 🐥 Vịt con ➔ 🐸 Chú ếch ➔ 🐻 Chú gấu ➔ 🐵 Khỉ con. Hãy tìm con vật trong Hộp 1 và Hộp 2.',
    hint: 'Sau chú gấu số 7 là bạn Khỉ con 🐵, trước bạn khỉ số 12 là Chú gấu 🐻.',
    mascot: { ...ABBY, message: 'Đoàn diễu hành đi theo chu kỳ 4 bạn, cùng đếm nhịp nào!' },
    activity: {
      type: 'patternAnimals',
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
    }
  },
  {
    id: 'pat-maze-2',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Vẽ đường hoa dẫn Abby đến gặp Casey',
    badgeTitle: 'Bài 2 · Trang 54',
    instruction: 'Quy luật bước chân của Abby theo thứ tự 4 loài hoa: 🌸 Tím nhạt ➔ 🌼 Vàng cúc ➔ 🌺 Đỏ tươi ➔ 💠 Xanh biếc. Bấm vào các ô hoa kề cạnh để tạo đường đi!',
    hint: 'Bắt đầu từ mũi tên bạn thỏ Abby ở hàng 1 và đi đúng nhịp 4 màu hoa.',
    mascot: { ...ABBY, message: 'Đi đúng nhịp Tím ➔ Vàng ➔ Đỏ ➔ Xanh mới tới được nhà bạn Casey!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🌸', '🌼', '🌺', '💠']
    }
  },
  {
    id: 'pat-matrix-4',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Vẽ hình để hoàn thành quy luật xoay 4 góc',
    badgeTitle: 'Bài 4 · Trang 56',
    instruction: 'Quan sát các hình tam giác 🔺, tròn 🟢, vuông 🟧, hình thang ⏢ xoay chuyển qua các lưới ①, ②, ③. Hãy tìm hình ④ chính xác!',
    hint: 'Mỗi hình di chuyển 1 ô theo chiều kim đồng hồ quanh 4 cạnh của lưới!',
    mascot: { ...CASEY, message: 'Hãy chú ý xem từng hình dịch chuyển như thế nào qua từng bước nhé!' },
    activity: {
      type: 'patternMatrix',
      ruleDescription: 'Quy luật chuyển động xoay theo chiều kim đồng hồ quanh các cạnh:',
      steps: [
        { stepNum: 1, content: '🔺 🟢 🟧 ⏢', note: 'Góc trên cùng' },
        { stepNum: 2, content: '⏢ 🔺 🟢 🟧', note: 'Xoay sang phải' },
        { stepNum: 3, content: '🟧 ⏢ 🔺 🟢', note: 'Xoay xuống đáy' }
      ],
      choices: [
        { id: 'optA', label: 'Phương án A', content: '🟢 🟧 ⏢ 🔺' },
        { id: 'optB', label: 'Phương án B', content: '🔺 🟧 🟢 ⏢' },
        { id: 'optC', label: 'Phương án C', content: '⏢ 🟢 🔺 🟧' }
      ],
      correctChoiceId: 'optA'
    }
  },
  {
    id: 'pat-shapes-6',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Hình gì sẽ xuất hiện tiếp theo? (Hình lồng hình)',
    badgeTitle: 'Bài 6 · Trang 58',
    instruction: 'Quan sát quy luật biến đổi các hình lồng nhau qua các hàng (Vuông lồng tròn, Tam giác lồng chữ nhật, Tròn lồng thoi).',
    hint: 'Ở hàng 3: Hình tròn lớn chứa hình thoi ở giữa có chấm tròn trên dưới. Đáp án đúng là B (trang 82 đáp án)!',
    mascot: { ...ABBY, message: 'Nhìn thật kỹ hình bên ngoài và hình lồng bên trong nhé!' },
    activity: {
      type: 'patternMatrix',
      ruleDescription: 'Quy luật chuyển đổi hình bên ngoài và hình bên trong:',
      steps: [
        { stepNum: 1, content: '🔲(⚪)', note: 'Vuông lồng tròn' },
        { stepNum: 2, content: '🔺(🔲)', note: 'Tam giác lồng vuông' },
        { stepNum: 3, content: '⚪(🔶)', note: 'Tròn lồng thoi' }
      ],
      choices: [
        { id: 'A', label: 'Hình A', content: '⚪(🔷 2 chấm)' },
        { id: 'B', label: 'Hình B (Đúng)', content: '⚪(🔶 2 chấm đối xứng)' },
        { id: 'C', label: 'Hình C', content: '⚪(▭ chữ nhật)' }
      ],
      correctChoiceId: 'B'
    }
  },

  // ==========================================
  // TRẠM 5: VỊ TRÍ HÀNG NGŨ & SUY LUẬN (Trang 59 - Trang 72)
  // ==========================================
  {
    id: 'log-queue-1',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Bí mật đếm hàng: Tránh đếm trùng 2 lần',
    badgeTitle: 'Bài 1 · Trang 61',
    instruction: 'Abby đứng thứ hai tính từ đầu hàng. Bạn ấy đứng thứ ba tính từ cuối hàng. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Abby được đếm 1 lần từ đầu và 1 lần từ cuối, nên bị đếm 2 lần: 2 + 3 - 1 = 4 bạn!',
    mascot: { ...ABBY, message: 'Vì tớ đứng ở cả hai đầu đếm nên phải trừ đi 1 để không bị đếm trùng nhé!' },
    activity: {
      type: 'queueCounter',
      fromFront: 2,
      fromBack: 3,
      correctTotal: 4,
      formula: '2 + 3 - 1 = 4'
    }
  },
  {
    id: 'log-queue-2',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Xếp hàng tính từ đầu và cuối',
    badgeTitle: 'Bài 2 · Trang 62',
    instruction: 'Abby đứng thứ hai tính từ đầu hàng. Bạn ấy đứng thứ tư tính từ cuối hàng. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Công thức toán tư duy: (Đầu) + (Cuối) - 1. Ta có: 2 + 4 - 1 = 5 bạn!',
    mascot: { ...ABBY, message: 'Lần này hàng dài hơn một chút, áp dụng đúng công thức là ra ngay!' },
    activity: {
      type: 'queueCounter',
      fromFront: 2,
      fromBack: 4,
      correctTotal: 5,
      formula: '2 + 4 - 1 = 5'
    }
  },
  {
    id: 'log-l-shape',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng người đứng thành hình chữ L',
    badgeTitle: 'Bài 3 · Trang 63',
    instruction: 'Có 1 hàng người đứng thành hình chữ L. Có 6 bạn đứng trên hàng dọc. Có 4 bạn đứng trên hàng ngang. Casey đứng ở điểm giao của 2 hàng. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Bạn Casey ở góc được tính trong cả 2 hàng: 6 + 4 - 1 = 9 bạn!',
    mascot: { ...CASEY, message: 'Tớ đứng ngay góc ngã rẽ chữ L nè!' },
    activity: {
      type: 'cornerCross',
      shape: 'L',
      verticalCount: 6,
      horizontalCount: 4,
      intersectionPerson: 'Casey',
      options: ['8 bạn', '9 bạn', '10 bạn', '11 bạn'],
      correctAnswer: '9 bạn'
    }
  },
  {
    id: 'log-t-shape-4',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng người đứng thành hình chữ T (Bài 4)',
    badgeTitle: 'Bài 4 · Trang 64',
    instruction: 'Có 1 hàng người đứng thành hình chữ T. Có 4 bạn đứng trên hàng dọc. Có 7 bạn đứng trên hàng ngang. Abby đứng ở điểm giao của 2 hàng. Tổng cộng có bao nhiêu bạn?',
    hint: 'Tổng số bạn = 4 (dọc) + 7 (ngang) - 1 (Abby ở điểm giao) = 10 bạn!',
    mascot: { ...ABBY, message: 'Tớ đứng ở chính giữa ngã ba chữ T đấy!' },
    activity: {
      type: 'cornerCross',
      shape: 'T',
      verticalCount: 4,
      horizontalCount: 7,
      intersectionPerson: 'Abby',
      options: ['9 bạn', '10 bạn', '11 bạn', '12 bạn'],
      correctAnswer: '10 bạn'
    }
  },
  {
    id: 'log-t-shape-5',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng người đứng thành hình chữ T (Bài 5)',
    badgeTitle: 'Bài 5 · Trang 65',
    instruction: 'Có 1 hàng người đứng hình chữ T. Có 4 bạn trên hàng dọc, 5 bạn trên hàng ngang. Abby đứng ở điểm giao của 2 hàng. Hỏi có tất cả bao nhiêu bạn?',
    hint: '4 + 5 - 1 = 8 bạn!',
    mascot: { ...ABBY, message: 'Bé đã quen với công thức điểm giao nhau chưa nào?' },
    activity: {
      type: 'cornerCross',
      shape: 'T',
      verticalCount: 4,
      horizontalCount: 5,
      intersectionPerson: 'Abby',
      options: ['7 bạn', '8 bạn', '9 bạn', '10 bạn'],
      correctAnswer: '8 bạn'
    }
  },
  {
    id: 'log-height-order-1',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Thám tử đo chiều cao các bạn (Bài 1)',
    badgeTitle: 'Bài 1 · Trang 69',
    instruction: 'Casey, Abby và Benny đo chiều cao.\n• Casey thấp hơn Benny.\n• Abby thấp hơn Casey.\n• Benny cao hơn Abby.\nHỏi ai là người cao nhất và ai là người thấp nhất trong số họ?',
    hint: 'Abby thấp hơn Casey, Casey thấp hơn Benny. Thứ tự: Benny > Casey > Abby!',
    mascot: { ...BENNY, message: 'So sánh từng cặp rồi xếp thứ tự như que đo nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'benny', label: 'Benny 🐵 (Cao nhất)', levelPercent: 95, color: '#f59e0b' },
        { id: 'casey', label: 'Casey 🐹 (Ở giữa)', levelPercent: 65, color: '#f59e0b' },
        { id: 'abby', label: 'Abby 🐰 (Thấp nhất)', levelPercent: 35, color: '#f59e0b' }
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
    }
  },
  {
    id: 'log-height-order-3',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đo chiều cao Bác sĩ Mayle, Bác Ram, Benny & Casey',
    badgeTitle: 'Bài 3 · Trang 71',
    instruction: 'Đọc kỹ các gợi ý:\n• Bác sĩ Mayle thấp hơn Bác Ram.\n• Bác Ram thấp hơn Benny.\n• Benny cao hơn Bác sĩ Mayle.\nHỏi ai là người cao nhất trong số họ?',
    hint: 'Mayle < Ram < Benny. Vậy Benny là người cao nhất!',
    mascot: { ...BENNY, message: 'Benny cao hơn cả Bác sĩ Mayle và Bác Ram đấy!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'benny', label: 'Benny 🐵', levelPercent: 95, color: '#f59e0b' },
        { id: 'ram', label: 'Bác Ram 🧔', levelPercent: 65, color: '#f59e0b' },
        { id: 'mayle', label: 'Bác sĩ Mayle 👨‍⚕️', levelPercent: 40, color: '#f59e0b' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Ai là người CAO NHẤT trong số họ?',
          options: ['Bác sĩ Mayle', 'Bác Ram', 'Benny'],
          correctAnswer: 'Benny'
        }
      ]
    }
  },
  {
    id: 'log-ribbon-order-4',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp xếp độ dài 4 đoạn ruy băng A, B, C, D',
    badgeTitle: 'Bài 4 · Trang 72',
    instruction: 'Một đoạn ruy băng được cắt thành 4 đoạn A, B, C và D có độ dài khác nhau:\n• D dài hơn C.\n• B ngắn hơn D nhưng dài hơn C.\n• A ngắn hơn C.\nHãy sắp xếp các mảnh A, B, C, D theo thứ tự từ DÀI NHẤT tới NGẮN NHẤT.',
    hint: 'D dài nhất, sau đó đến B, rồi đến C, và A ngắn nhất! Thứ tự là: D, B, C, A!',
    mascot: { ...ABBY, message: 'Dùng trục so sánh: D dài hơn B, B dài hơn C, C dài hơn A!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp các mảnh ruy băng theo thứ tự từ dài nhất tới ngắn nhất:',
      directionLabel: 'Từ Dài Nhất ➔ Ngắn Nhất (D, B, C, A)',
      items: [
        { id: 'A', label: 'Đoạn A', description: 'Ngắn hơn C', icon: '🎀' },
        { id: 'B', label: 'Đoạn B', description: 'Dài hơn C, ngắn hơn D', icon: '🎀' },
        { id: 'C', label: 'Đoạn C', description: 'Ngắn hơn D', icon: '🎀' },
        { id: 'D', label: 'Đoạn D', description: 'Dài nhất', icon: '🎀' }
      ],
      correctOrder: ['D', 'B', 'C', 'A']
    }
  },
  {
    id: 'log-seats',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Xếp chỗ ngồi rạp hát cùng Bác sĩ Mayle',
    badgeTitle: 'Bài 2 · Trang 70',
    instruction: 'Bác sĩ Mayle, Abby, Benny, Casey và Bác Ram ngồi cạnh nhau từ Ghế 1 (trái) sang Ghế 5 (phải):\n• Bác sĩ Mayle: Tôi ngồi ở bên rìa.\n• Abby: Tôi đang ngồi ở trung tâm.\n• Benny: Tôi đang ngồi ở bên phải của Abby.\n• Bác Ram: Có 2 người ở giữa Bác sĩ Mayle và tôi.',
    hint: 'Abby ngồi ghế 3. Bác sĩ Mayle ngồi ghế 1. Bác Ram cách Mayle 2 người nên ngồi ghế 4 hoặc 5...',
    mascot: { ...MAYLE, message: 'Đọc kỹ từng manh mối và xếp ghế như một thám tử thực thụ!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 5,
      correctOrder: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram'],
      allowedCharacters: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram']
    }
  },

  // ==========================================
  // TRẠM 6: ĐẤU TRƯỜNG SIÊU THỬ THÁCH (Trang 73 - Trang 90)
  // ==========================================
  {
    id: 'chal-maze-1',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mê cung hình tròn xoắn ốc',
    badgeTitle: 'Thử Thách 1 · Trang 74 & 85',
    instruction: 'Bạn hãy tìm đường nối giữa 2 mũi tên sao cho tạo thành 1 đường đi liền mạch từ cổng ngoài vào tâm mê cung tròn!',
    hint: 'Đi theo các khe hở của từng vòng tròn đồng tâm, cẩn thận không đâm vào vách ngăn.',
    mascot: { ...BENNY, message: 'Mê cung tròn nhìn hoa cả mắt, nhưng bình tĩnh là tìm ra đường ngay!' },
    activity: {
      type: 'circularMaze'
    }
  },
  {
    id: 'chal-cattle-3',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Hàng rào bảo vệ nông trại bò',
    badgeTitle: 'Thử Thách 3 · Trang 77 & 87',
    instruction: 'Xây dựng một hàng rào khép kín bao quanh tất cả các chú bò sao cho không chứa bất kỳ cây xương rồng nào! Hàng rào không cắt qua chính nó ở bất kỳ điểm nào.',
    hint: 'Bảo vệ đủ 7 chú bò, tuyệt đối không rào phải cây xương rồng.',
    mascot: { ...CASEY, message: 'Các chú bò thích ăn cỏ, ăn phải xương rồng sẽ bị đau bụng đấy!' },
    activity: {
      type: 'cattleFence'
    }
  },
  {
    id: 'chal-star-battle',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Săn ngôi sao may mắn (Star Battle 8x8)',
    badgeTitle: 'Thử Thách 4 · Trang 78 & 88',
    instruction: 'Mỗi thử thách được chia thành các khối khác nhau. Mỗi khối, mỗi hàng và mỗi cột chứa DUY NHẤT một ngôi sao may mắn ⭐. Hãy tìm vị trí đặt ngôi sao!',
    hint: 'Bấm 1 lần đặt ⭐ sao, bấm lần nữa đặt dấu chấm • để đánh dấu ô trống.',
    mascot: { ...ABBY, message: 'Những ngôi sao may mắn ẩn chứa kho báu siêu toán học!' },
    activity: {
      type: 'starBattle',
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
      starsSolution: [
        [0, 1],
        [1, 5],
        [2, 0],
        [3, 3],
        [4, 4],
        [5, 2]
      ]
    }
  },
  {
    id: 'chal-pixidoku-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pixidoku 5x5: Động vật rừng nhiệt đới #2',
    badgeTitle: 'Thử Thách 2 · Trang 76 & 86',
    instruction: 'Mỗi vùng có 5 ô vuông phải chứa tất cả 5 con vật. Các con vật giống hệt nhau không được đặt cạnh nhau dù là theo chiều ngang, chiều dọc hay đường chéo.',
    hint: '5 loài động vật: 🐻 Gấu, 🐵 Khỉ, 🐺 Sói, 🐮 Bò sữa, 🦄 Kỳ lân.',
    mascot: { ...BENNY, message: 'Màn Pixidoku cấp độ cao này đòi hỏi tập trung cao độ nè!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'bear', icon: '🐻', name: 'Gấu' },
        { id: 'monkey', icon: '🐵', name: 'Khỉ' },
        { id: 'wolf', icon: '🐺', name: 'Sói' },
        { id: 'cow', icon: '🐮', name: 'Bò sữa' },
        { id: 'unicorn', icon: '🦄', name: 'Kỳ lân' }
      ],
      initialGrid: [
        ['wolf', null, null, null, 'wolf'],
        [null, null, null, null, null],
        ['bear', null, null, null, 'unicorn'],
        ['cow', null, 'wolf', 'monkey', null],
        [null, null, null, 'cow', null]
      ],
      // Solution from page 86 (Pixidoku Jungle #2)
      solution: [
        ['wolf', 'monkey', 'bear', 'cow', 'wolf'],
        ['unicorn', 'cow', 'unicorn', 'monkey', 'bear'],
        ['bear', 'monkey', 'bear', 'cow', 'unicorn'],
        ['cow', 'unicorn', 'wolf', 'monkey', 'bear'],
        ['wolf', 'monkey', 'bear', 'cow', 'unicorn']
      ]
    }
  }
];
