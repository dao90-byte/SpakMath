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
      grid?: string[][];
      targetPath?: number[][];
      startPos?: [number, number];
      goalPos?: [number, number];
      startIcon?: string;
      startLabel?: string;
      goalIcon?: string;
      goalLabel?: string;
      ruleTitle?: string;
      patternDisplay?: { icon: string; name: string }[];
      successMessage?: string;
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
      mode?: 'twoEnds' | 'between' | 'circle';
      fromFront?: number;
      fromBack?: number;
      totalInQueue?: number;
      personA?: { name: string; avatar: string; pos: number };
      personB?: { name: string; avatar: string; pos: number };
      correctTotal: number;
      formula: string;
      options?: number[];
      promptTitle?: string;
    }
  | {
      type: 'balanceScale';
      title: string;
      ruleExplanation: string;
      scales: {
        leftIcons: string[];
        leftLabel: string;
        rightIcons: string[];
        rightLabel: string;
      }[];
      targetQuestion: {
        targetLeftIcons: string[];
        targetLeftLabel: string;
        options: { id: string; count: number; icon: string; label: string }[];
        correctOptionId: string;
        explanation: string;
      };
    }
  | {
      type: 'cornerCross';
      shape: 'L' | 'T' | '+';
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
    }
  | {
      type: 'matrix2x2';
      title: string;
      ruleExplanation: string;
      sampleGrids: { stepNum: number; grid: (string | null)[][] }[];
      choices: { id: string; label: string; grid: (string | null)[][] }[];
      correctChoiceId: string;
    }
  | {
      type: 'numberMatrix';
      title: string;
      subtitle: string;
      targetSum?: number;
      initialGrid: (number | null)[][];
      solution: number[][];
      allowedNumbers?: number[];
      hintFormula?: string;
    }
  | {
      type: 'sequencePattern';
      title: string;
      ruleExplanation: string;
      sequenceType: 'numbers' | 'domino' | 'beads' | 'pyramid';
      items: {
        id: number;
        label?: string;
        subLabel?: string;
        icon?: string;
        isMissing?: boolean;
        stepHint?: string;
      }[];
      choices: {
        id: string;
        label: string;
        subLabel?: string;
        icon?: string;
      }[];
      correctChoiceId: string;
      correctExplanation: string;
    }
  | {
      type: 'slitherlink';
      rows?: number;
      cols?: number;
      clues: (number | null)[][];
      solutionEdges: {
        h: boolean[][];
        v: boolean[][];
      };
    }
  | {
      type: 'treasureVault';
      title: string;
      codeLength: number;
      solutionCode: number[];
      clues: {
        attempt: number[];
        correctDigits: number;
        correctPositions: number;
        description: string;
      }[];
    }
  | {
      type: 'cubeCounter';
      title: string;
      instructionText: string;
      gridHeights: number[][];
      layers: { layerName: string; count: number }[];
      totalCubes: number;
      options: number[];
      explanation: string;
    }
  | {
      type: 'grandFinale';
      title: string;
      roundQuestions: {
        id: string;
        category: string;
        question: string;
        options: { id: string; text: string; isCorrect: boolean }[];
        explanation: string;
      }[];
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
    subtitle: '16 thử thách đỉnh cao: Mê cung tròn, Pixidoku rừng & biển, Hàng rào nông trại, Star Battle, Slitherlink, Mật mã két sắt, Cân đĩa, Khối 3D và Chung kết cúp vàng.',
    mascotName: 'Biệt đội Spark Math & Thầy Mayle',
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
    badgeTitle: 'Bài 1.1 · Trang 47',
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
    id: 'sud-shape-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku 4x4 biểu tượng kỳ diệu',
    badgeTitle: 'Bài 1.2 · Trang 47',
    instruction: 'Điền các biểu tượng kỳ diệu còn thiếu: ⭐️ Ngôi sao, 🌸 Bông hoa, 🌙 Mặt trăng, 🍀 Cỏ may mắn sao cho mỗi hàng, cột và khối 2x2 có đủ 4 biểu tượng.',
    hint: 'Khối 2x2 góc trên bên trái đã có Ngôi sao và Mặt trăng, chỉ còn thiếu Bông hoa và Cỏ may mắn!',
    mascot: { ...CASEY, message: 'Bộ 4 biểu tượng thiên nhiên cực xinh xắn, cùng thử sức nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'star', icon: '⭐️', name: 'Ngôi sao' },
        { id: 'flower', icon: '🌸', name: 'Bông hoa' },
        { id: 'moon', icon: '🌙', name: 'Mặt trăng' },
        { id: 'clover', icon: '🍀', name: 'Cỏ may mắn' }
      ],
      initialGrid: [
        [null, 'star', 'moon', null],
        ['moon', null, null, 'star'],
        ['star', null, null, 'moon'],
        [null, 'moon', 'star', null]
      ],
      solution: [
        ['flower', 'star', 'moon', 'clover'],
        ['moon', 'clover', 'flower', 'star'],
        ['star', 'flower', 'clover', 'moon'],
        ['clover', 'moon', 'star', 'flower']
      ]
    }
  },
  {
    id: 'sud-num-2-1',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku chữ số 1 đến 4 (Cơ bản)',
    badgeTitle: 'Bài 2.1 · Trang 48',
    instruction: 'Điền vào các ô. Mỗi hàng, cột và khối 2x2 phải có các số từ 1 đến 4 không trùng nhau.',
    hint: 'Mỗi hàng và mỗi cột phải có đủ các số 1, 2, 3, 4.',
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
    id: 'sud-num-2-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku chữ số 1 đến 4 (Thử thách nâng cao)',
    badgeTitle: 'Bài 2.2 · Trang 48',
    instruction: 'Cấp độ khó hơn với ít manh mối ban đầu hơn! Hãy suy luận để điền các chữ số từ 1 đến 4 vào toàn bộ lưới.',
    hint: 'Hàng 1 có số 1 và số 4 ở hai góc. Khối 2x2 trên bên phải đã có 3 và 4!',
    mascot: { ...MAYLE, message: 'Bình tĩnh suy luận loại trừ, em sẽ tìm ra tất cả các ô trống!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [1, null, null, 4],
        [null, 4, 1, null],
        [null, 1, 4, null],
        [4, null, null, 1]
      ],
      solution: [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1]
      ]
    }
  },
  {
    id: 'sud-jigsaw-3-1',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku 4x4 khối xếp hình cùng màu (Jigsaw)',
    badgeTitle: 'Bài 3.1 · Trang 49',
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
      solution: [
        [4, 1, 2, 3],
        [1, 4, 3, 2],
        [2, 3, 1, 4],
        [3, 2, 4, 1]
      ]
    }
  },
  {
    id: 'sud-jigsaw-3-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku khối đa hình bất đối xứng (Jigsaw 3.2)',
    badgeTitle: 'Bài 3.2 · Trang 49',
    instruction: 'Mỗi hàng, mỗi cột và mỗi khối màu (Hồng chữ L, Xanh khối vuông, Xanh ngọc chữ Z, Cam hàng dưới) đều phải chứa đủ 1, 2, 3, 4.',
    hint: 'Khối màu cam ở hàng dưới cùng đã có sẵn số 2 và 3, chỉ cần điền 1 và 4!',
    mascot: { ...BENNY, message: 'Các khối màu hình thù kỳ lạ biến bài toán thành trò chơi ghép hình!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      colorBlocks: [
        ['bg-rose-100', 'bg-rose-100', 'bg-sky-100', 'bg-sky-100'],
        ['bg-rose-100', 'bg-emerald-100', 'bg-sky-100', 'bg-sky-100'],
        ['bg-rose-100', 'bg-emerald-100', 'bg-emerald-100', 'bg-emerald-100'],
        ['bg-amber-100', 'bg-amber-100', 'bg-amber-100', 'bg-amber-100']
      ],
      initialGrid: [
        [1, null, 3, null],
        [null, 3, null, 1],
        [null, null, 1, null],
        [2, null, null, 3]
      ],
      solution: [
        [1, 2, 3, 4],
        [4, 3, 2, 1],
        [3, 4, 1, 2],
        [2, 1, 4, 3]
      ]
    }
  },
  {
    id: 'sud-killer-4-1',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku tính tổng (Killer Sudoku Mini)',
    badgeTitle: 'Bài 4.1 · Trang 50',
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
      solution: [
        [3, 4, 1, 2],
        [2, 3, 4, 1],
        [4, 1, 2, 3],
        [1, 2, 3, 4]
      ]
    }
  },
  {
    id: 'sud-killer-4-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku mini: Khung tổng nâng cao',
    badgeTitle: 'Bài 4.2 · Trang 50',
    instruction: 'Điền các số 1 đến 4 vào lưới. Tổng hai ô trong cùng một khung màu phải đúng bằng con số nhỏ ở góc trên!',
    hint: 'Khung góc trên bên trái có tổng = 6 (4 + 2 = 6). Khung có tổng = 4 (3 + 1 = 4)!',
    mascot: { ...ABBY, message: 'Thử thách Killer Sudoku giúp tính nhẩm siêu nhanh!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      sumLabels: [
        [6, null, 4, null],
        [null, 7, null, null],
        [null, 5, null, 7],
        [4, null, null, null]
      ],
      initialGrid: [
        [4, null, 3, null],
        [null, 3, null, 2],
        [2, null, 1, null],
        [null, 1, null, 4]
      ],
      solution: [
        [4, 2, 3, 1],
        [1, 3, 4, 2],
        [2, 4, 1, 3],
        [3, 1, 2, 4]
      ]
    }
  },
  {
    id: 'mat-rot-2x2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận số 2x2 xoay quy luật kim đồng hồ',
    badgeTitle: 'Bài 5.1 · Trang 55',
    instruction: 'Quan sát các con số 1, 2, 3, 4 trong ma trận 2x2 di chuyển xoay tròn theo chiều kim đồng hồ qua Ô 1, Ô 2, Ô 3. Hãy chọn Ô 4 chính xác!',
    hint: 'Số 1 ở Ô 1 nằm ở góc trên trái, sang Ô 2 chuyển sang góc trên phải, sang Ô 3 xuống góc dưới phải. Vậy ở Ô 4, số 1 sẽ ở góc dưới trái!',
    mascot: { ...CASEY, message: 'Hãy theo dõi đường đi của số 1 để tìm ra quy luật xoay tròn!' },
    activity: {
      type: 'matrix2x2',
      title: 'QUY LUẬT MA TRẬN SỐ XOAY 2x2',
      ruleExplanation: 'Các chữ số xoay chuyển vị trí theo chiều kim đồng hồ quanh 4 góc:',
      sampleGrids: [
        {
          stepNum: 1,
          grid: [
            ['1', '2'],
            ['4', '3']
          ]
        },
        {
          stepNum: 2,
          grid: [
            ['4', '1'],
            ['3', '2']
          ]
        },
        {
          stepNum: 3,
          grid: [
            ['3', '4'],
            ['2', '1']
          ]
        }
      ],
      choices: [
        {
          id: 'optA',
          label: 'Hình A (Chính xác)',
          grid: [
            ['2', '3'],
            ['1', '4']
          ]
        },
        {
          id: 'optB',
          label: 'Hình B',
          grid: [
            ['1', '2'],
            ['3', '4']
          ]
        },
        {
          id: 'optC',
          label: 'Hình C',
          grid: [
            ['4', '3'],
            ['2', '1']
          ]
        },
        {
          id: 'optD',
          label: 'Hình D',
          grid: [
            ['3', '2'],
            ['4', '1']
          ]
        }
      ],
      correctChoiceId: 'optA'
    }
  },
  {
    id: 'mat-sym-2x2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận số 2x2 quy luật hoán vị đối xứng',
    badgeTitle: 'Bài 5.2 · Trang 57',
    instruction: 'Các số chẵn 2, 4, 6, 8 biến đổi vị trí theo quy luật hoán vị cột và dòng qua các bước. Hãy tìm ma trận tiếp theo ở Ô 4.',
    hint: 'Bước 1 sang Bước 2 đổi chỗ 2 cột. Bước 2 sang Bước 3 đổi chỗ 2 hàng. Bước 3 sang Bước 4 đổi chỗ 2 cột tiếp tục!',
    mascot: { ...BENNY, message: 'Nhảy đổi chỗ giữa các hàng và cột thật là nhịp nhàng!' },
    activity: {
      type: 'matrix2x2',
      title: 'MA TRẬN HOÁN VỊ ĐỐI XỨNG',
      ruleExplanation: 'Quy luật đổi chỗ lần lượt giữa hai cột và hai hàng:',
      sampleGrids: [
        {
          stepNum: 1,
          grid: [
            ['2', '4'],
            ['6', '8']
          ]
        },
        {
          stepNum: 2,
          grid: [
            ['4', '2'],
            ['8', '6']
          ]
        },
        {
          stepNum: 3,
          grid: [
            ['8', '6'],
            ['4', '2']
          ]
        }
      ],
      choices: [
        {
          id: 'opt1',
          label: 'Ma trận 1',
          grid: [
            ['2', '4'],
            ['8', '6']
          ]
        },
        {
          id: 'opt2',
          label: 'Ma trận 2 (Đúng)',
          grid: [
            ['6', '8'],
            ['2', '4']
          ]
        },
        {
          id: 'opt3',
          label: 'Ma trận 3',
          grid: [
            ['4', '8'],
            ['2', '6']
          ]
        },
        {
          id: 'opt4',
          label: 'Ma trận 4',
          grid: [
            ['8', '4'],
            ['6', '2']
          ]
        }
      ],
      correctChoiceId: 'opt2'
    }
  },
  {
    id: 'mat-magic-3x3',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận số Ma Phương Magic Square 3x3 (Tổng = 15)',
    badgeTitle: 'Bài 6.1 · Trang 52',
    instruction: 'Điền các chữ số thích hợp vào ô trống sao cho TỔNG CÁC SỐ TRÊN MỖI HÀNG, MỖI CỘT đều bằng đúng 15!',
    hint: 'Hàng 1: 8 + ? + 6 = 15 => Cần điền số 1. Hàng 2: 3 + 5 + ? = 15 => Cần điền số 7. Hàng 3: ? + 9 + 2 = 15 => Cần điền số 4!',
    mascot: { ...MAYLE, message: 'Ma phương toán học cổ điển nổi tiếng thế giới! Mỗi hàng và mỗi cột đều có tổng đúng bằng 15!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ô VUÔNG MA THUẬT (MAGIC SQUARE 3x3)',
      subtitle: 'Điền số vào các ô trống sao cho tổng mỗi hàng và mỗi cột đều bằng 15',
      targetSum: 15,
      hintFormula: 'Hàng 1: 8 + 1 + 6 = 15; Hàng 2: 3 + 5 + 7 = 15; Hàng 3: 4 + 9 + 2 = 15',
      allowedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      initialGrid: [
        [8, null, 6],
        [3, 5, null],
        [null, 9, 2]
      ],
      solution: [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2]
      ]
    }
  },
  {
    id: 'mat-sum-grid',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận số phép tính cộng theo hàng (Tổng = 10)',
    badgeTitle: 'Bài 6.2 · Trang 52',
    instruction: 'Quan sát các phép tính cộng trong ma trận 3x3 và điền số còn thiếu vào các ô trống để hoàn thành ma trận.',
    hint: 'Hàng 1: 5 + 4 = 9. Hàng 2: 3 + ? = 10 => ? = 7. Hàng 3: ? + 2 = 10 => ? = 8!',
    mascot: { ...ABBY, message: 'Nhìn hàng ngang ta có các phép tính cộng: A + B = C!' },
    activity: {
      type: 'numberMatrix',
      title: 'MA TRẬN PHÉP TÍNH CỘNG A + B = C',
      subtitle: 'Tìm các số còn thiếu theo hàng: Ô thứ nhất + Ô thứ hai = Ô thứ ba',
      allowedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      hintFormula: '5 + 4 = 9 | 3 + 7 = 10 | 8 + 2 = 10',
      initialGrid: [
        [5, 4, null],
        [3, null, 10],
        [null, 2, 10]
      ],
      solution: [
        [5, 4, 9],
        [3, 7, 10],
        [8, 2, 10]
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
    badgeTitle: 'Bài 1.1 · Trang 53',
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
    id: 'pat-beads-1-2',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Chuỗi hạt vòng ngọc của Abby (Chu kỳ 3 hạt)',
    badgeTitle: 'Bài 1.2 · Trang 53',
    instruction: 'Abby xâu một chuỗi hạt vòng ngọc lặp lại theo nhịp 3 màu: 🔴 Hạt đỏ ➔ 🟡 Hạt vàng ➔ 🔵 Hạt xanh dương. Hỏi hạt thứ 10 mang màu gì?',
    hint: 'Chu kỳ gồm 3 hạt: 1 Đỏ, 2 Vàng, 3 Xanh. Ta lấy 10 chia cho 3 được 3 (dư 1). Số dư 1 chính là hạt đầu tiên của chu kỳ: Hạt Đỏ 🔴!',
    mascot: { ...ABBY, message: 'Dùng phép chia có dư để tìm hạt thứ 10 cực kỳ nhanh chóng!' },
    activity: {
      type: 'sequencePattern',
      title: 'CHUỖI HẠT NGỌC CHU KỲ 3 MÀU',
      ruleExplanation: 'Chuỗi hạt lặp lại theo quy luật: 🔴 Đỏ ➔ 🟡 Vàng ➔ 🔵 Xanh dương',
      sequenceType: 'beads',
      items: [
        { id: 1, icon: '🔴', label: 'Đỏ' },
        { id: 2, icon: '🟡', label: 'Vàng' },
        { id: 3, icon: '🔵', label: 'Xanh' },
        { id: 4, icon: '🔴', label: 'Đỏ' },
        { id: 5, icon: '🟡', label: 'Vàng' },
        { id: 6, icon: '🔵', label: 'Xanh' },
        { id: 7, icon: '🔴', label: 'Đỏ' },
        { id: 8, icon: '🟡', label: 'Vàng' },
        { id: 9, icon: '🔵', label: 'Xanh' },
        { id: 10, isMissing: true, label: '?' }
      ],
      choices: [
        { id: 'red', label: 'Hạt Đỏ (Chính xác)', icon: '🔴' },
        { id: 'yellow', label: 'Hạt Vàng', icon: '🟡' },
        { id: 'blue', label: 'Hạt Xanh dương', icon: '🔵' },
        { id: 'green', label: 'Hạt Xanh lá', icon: '🟢' }
      ],
      correctChoiceId: 'red',
      correctExplanation: 'Chính xác! 10 : 3 = 3 dư 1, vậy hạt thứ 10 là Hạt Đỏ 🔴 mở đầu chu kỳ mới!'
    }
  },
  {
    id: 'pat-maze-2',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Vẽ đường hoa dẫn Abby đến gặp Casey',
    badgeTitle: 'Bài 2.1 · Trang 54',
    instruction: 'Quy luật bước chân của Abby theo thứ tự 4 loài hoa: 🌸 Tím nhạt ➔ 🌼 Vàng cúc ➔ 🌺 Đỏ tươi ➔ 💠 Xanh biếc. Bấm vào các ô hoa kề cạnh để tạo đường đi!',
    hint: 'Bắt đầu từ mũi tên bạn thỏ Abby ở hàng 1 và đi đúng nhịp 4 màu hoa.',
    mascot: { ...ABBY, message: 'Đi đúng nhịp Tím ➔ Vàng ➔ Đỏ ➔ Xanh mới tới được nhà bạn Casey!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🌸', '🌼', '🌺', '💠'],
      ruleTitle: 'Quy luật bước chân 4 màu hoa',
      startIcon: '🐰',
      startLabel: 'Abby xuất phát',
      goalIcon: '🐹',
      goalLabel: 'Đến gặp Casey',
      patternDisplay: [
        { icon: '🌸', name: 'Tím' },
        { icon: '🌼', name: 'Vàng' },
        { icon: '🌺', name: 'Đỏ' },
        { icon: '💠', name: 'Xanh' }
      ],
      successMessage: '🎉 Hoan hô! Abby đã vượt qua mê cung hoa và đến gặp bạn Casey!'
    }
  },
  {
    id: 'pat-maze-fruits',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê cung hoa quả rừng của Khỉ Benny',
    badgeTitle: 'Bài 2.2 · Trang 54 Mở rộng',
    instruction: 'Khỉ Benny tìm nải chuối vàng qua vườn quả nhiệt đới. Hãy đi theo quy luật 4 loại quả: 🍌 Chuối ➔ 🍓 Dâu tây ➔ 🍎 Táo ➔ 🍊 Cam.',
    hint: 'Bắt đầu ở góc trên bên trái [0, 0] là quả Chuối 🍌, bước tiếp sang quả Dâu tây 🍓 kề cạnh!',
    mascot: { ...BENNY, message: 'Mỗi bước chân phải đúng nhịp Chuối ➔ Dâu ➔ Táo ➔ Cam nhé bạn ơi!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🍌', '🍓', '🍎', '🍊'],
      ruleTitle: 'Quy luật 4 loại hoa quả nhiệt đới',
      startPos: [0, 0],
      goalPos: [5, 5],
      startIcon: '🐵',
      startLabel: 'Benny xuất phát',
      goalIcon: '🍌',
      goalLabel: 'Nải chuối vàng',
      patternDisplay: [
        { icon: '🍌', name: 'Chuối' },
        { icon: '🍓', name: 'Dâu tây' },
        { icon: '🍎', name: 'Táo đỏ' },
        { icon: '🍊', name: 'Cam ngọt' }
      ],
      grid: [
        ['🍌', '🍓', '🍎', '🍊', '🍌', '🍓'],
        ['🍓', '🍌', '🍊', '🍎', '🍊', '🍎'],
        ['🍎', '🍊', '🍌', '🍓', '🍌', '🍊'],
        ['🍊', '🍌', '🍊', '🍎', '🍓', '🍌'],
        ['🍌', '🍓', '🍎', '🍊', '🍌', '🍓'],
        ['🍓', '🍎', '🍊', '🍌', '🍓', '🍌']
      ],
      targetPath: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [2, 2],
        [2, 3],
        [3, 3],
        [4, 3],
        [4, 4],
        [5, 4],
        [5, 5]
      ],
      successMessage: '🎉 Tuyệt vời! Khỉ Benny đã nhặt được nải chuối vàng thơm ngon!'
    }
  },
  {
    id: 'pat-maze-numbers',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê cung chữ số chu kỳ 1-2-3-4 của Casey',
    badgeTitle: 'Bài 2.3 · Mê Cung Số',
    instruction: 'Chuột Casey đi tìm miếng phô mai thơm ngon qua mê cung số theo đúng chu kỳ: 1 ➔ 2 ➔ 3 ➔ 4 ➔ 1 ➔ 2 ➔ 3 ➔ 4.',
    hint: 'Bắt đầu từ ô số 1 ở góc trên trái, bước sang số 2, số 3, số 4 kề cạnh!',
    mascot: { ...CASEY, message: 'Nhớ chu kỳ đếm từ 1 đến 4 không được nhảy cóc nha!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['1️⃣', '2️⃣', '3️⃣', '4️⃣'],
      ruleTitle: 'Quy luật đếm chu kỳ 1 ➔ 2 ➔ 3 ➔ 4',
      startPos: [0, 0],
      goalPos: [5, 5],
      startIcon: '🐹',
      startLabel: 'Casey xuất phát',
      goalIcon: '🧀',
      goalLabel: 'Miếng phô mai',
      patternDisplay: [
        { icon: '1️⃣', name: 'Số 1' },
        { icon: '2️⃣', name: 'Số 2' },
        { icon: '3️⃣', name: 'Số 3' },
        { icon: '4️⃣', name: 'Số 4' }
      ],
      grid: [
        ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '1️⃣', '2️⃣'],
        ['4️⃣', '1️⃣', '4️⃣', '1️⃣', '2️⃣', '3️⃣'],
        ['3️⃣', '4️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣'],
        ['2️⃣', '3️⃣', '4️⃣', '3️⃣', '4️⃣', '1️⃣'],
        ['1️⃣', '2️⃣', '3️⃣', '2️⃣', '1️⃣', '2️⃣'],
        ['4️⃣', '1️⃣', '4️⃣', '1️⃣', '2️⃣', '🧀']
      ],
      targetPath: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [2, 2],
        [2, 3],
        [2, 4],
        [3, 4],
        [4, 4],
        [5, 4],
        [5, 5]
      ],
      successMessage: '🎉 Hoan hô! Chuột Casey đã tìm được miếng phô mai béo ngậy!'
    }
  },
  {
    id: 'pat-maze-shapes',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê cung hình khối kỳ diệu của Spark Math',
    badgeTitle: 'Bài 2.4 · Mê Cung Hình',
    instruction: 'Đi qua mê cung hình khối theo chu kỳ: 🔺 Tam giác ➔ 🟢 Hình tròn ➔ 🟧 Hình vuông ➔ ⭐ Ngôi sao.',
    hint: 'Bắt đầu từ Tam giác 🔺, tiếp theo phải là Hình tròn 🟢!',
    mascot: { ...MAYLE, message: 'Nhận biết hình khối và đi đúng chu kỳ để mở kho báu!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🔺', '🟢', '🟧', '⭐'],
      ruleTitle: 'Quy luật hình khối: 🔺 ➔ 🟢 ➔ 🟧 ➔ ⭐',
      startPos: [0, 0],
      goalPos: [5, 5],
      startIcon: '🐰',
      startLabel: 'Abby xuất phát',
      goalIcon: '🏆',
      goalLabel: 'Cúp vàng',
      patternDisplay: [
        { icon: '🔺', name: 'Tam giác' },
        { icon: '🟢', name: 'Tròn' },
        { icon: '🟧', name: 'Vuông' },
        { icon: '⭐', name: 'Sao' }
      ],
      grid: [
        ['🔺', '🟢', '🟧', '⭐', '🔺', '🟢'],
        ['⭐', '🔺', '⭐', '🔺', '🟢', '🟧'],
        ['🟧', '🟢', '🔺', '⭐', '🟧', '⭐'],
        ['🟢', '🟧', '🟢', '🟧', '🔺', '🔺'],
        ['🔺', '⭐', '🔺', '⭐', '🟢', '🟧'],
        ['⭐', '🔺', '🟢', '🔺', '🟢', '🏆']
      ],
      targetPath: [
        [0, 0],
        [0, 1],
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [3, 3],
        [4, 3],
        [5, 3],
        [5, 4],
        [5, 5]
      ],
      successMessage: '🎉 Xuất sắc! Bạn đã giành được chiếc Cúp Vàng Spark Math!'
    }
  },
  {
    id: 'pat-domino-3',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Chuỗi quân cờ Domino hai nửa đối xứng',
    badgeTitle: 'Bài 3 · Trang 55',
    instruction: 'Quan sát các quân cờ Domino: Nửa trên có các số 1, 2, 3, 4. Nửa dưới có các số 6, 5, 4, 3. Hãy tìm quân Domino tiếp theo ở vị trí số 5!',
    hint: 'Nửa trên tăng thêm 1 đơn vị (1, 2, 3, 4 -> 5). Nửa dưới giảm đi 1 đơn vị (6, 5, 4, 3 -> 2). Tổng hai nửa luôn bằng 7! Đáp án là quân [5 | 2]!',
    mascot: { ...BENNY, message: 'Nửa trên đi lên, nửa dưới đi xuống, tổng 2 nửa luôn bằng 7 đấy!' },
    activity: {
      type: 'sequencePattern',
      title: 'QUY LUẬT QUÂN CỜ DOMINO',
      ruleExplanation: 'Nửa trên tăng dần +1, nửa dưới giảm dần -1:',
      sequenceType: 'domino',
      items: [
        { id: 1, label: '1', subLabel: '6' },
        { id: 2, label: '2', subLabel: '5' },
        { id: 3, label: '3', subLabel: '4' },
        { id: 4, label: '4', subLabel: '3' },
        { id: 5, isMissing: true }
      ],
      choices: [
        { id: 'opt52', label: '5', subLabel: '2' },
        { id: 'opt51', label: '5', subLabel: '1' },
        { id: 'opt42', label: '4', subLabel: '2' },
        { id: 'opt61', label: '6', subLabel: '1' }
      ],
      correctChoiceId: 'opt52',
      correctExplanation: 'Rất chính xác! Quân cờ tiếp theo là [5 | 2] (nửa trên là 5, nửa dưới là 2, tổng bằng 7)!'
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
    id: 'pat-seq-add3',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy số tăng dần cách đều (+3 mỗi bước)',
    badgeTitle: 'Bài 5.1 · Trang 57',
    instruction: 'Quan sát các viên đá bước chân nhảy qua suối: 2 ➔ 5 ➔ 8 ➔ 11 ➔ [ ? ] ➔ 17 ➔ 20. Hãy tìm con số trên viên đá bí mật!',
    hint: 'Mỗi bước con số tăng thêm 3 đơn vị: 2 + 3 = 5; 5 + 3 = 8; 8 + 3 = 11; 11 + 3 = 14!',
    mascot: { ...BENNY, message: 'Chú ếch nhảy mỗi lần đúng 3 bước, cộng thêm 3 là ra ngay!' },
    activity: {
      type: 'sequencePattern',
      title: 'DÃY SỐ TĂNG DẦN CÁCH ĐỀU',
      ruleExplanation: 'Mỗi số bằng số liền trước cộng thêm 3 (+3):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '2' },
        { id: 2, label: '5', stepHint: '+3' },
        { id: 3, label: '8', stepHint: '+3' },
        { id: 4, label: '11', stepHint: '+3' },
        { id: 5, isMissing: true, stepHint: '+3' },
        { id: 6, label: '17', stepHint: '+3' },
        { id: 7, label: '20', stepHint: '+3' }
      ],
      choices: [
        { id: '13', label: '13' },
        { id: '14', label: '14 (Đúng)' },
        { id: '15', label: '15' },
        { id: '16', label: '16' }
      ],
      correctChoiceId: '14',
      correctExplanation: 'Tuyệt vời! 11 + 3 = 14 và 14 + 3 = 17, quy luật tăng 3 hoàn toàn khớp!'
    }
  },
  {
    id: 'pat-seq-fib',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy số nhân đôi tăng tốc (×2 mỗi bước)',
    badgeTitle: 'Bài 5.2 · Trang 57',
    instruction: 'Quan sát dãy số tên lửa tăng tốc: 1 ➔ 2 ➔ 4 ➔ 8 ➔ 16 ➔ [ ? ]. Tìm con số bí mật tiếp theo!',
    hint: 'Mỗi số gấp 2 lần số trước đó: 1 × 2 = 2; 2 × 2 = 4; 4 × 2 = 8; 8 × 2 = 16; 16 × 2 = 32!',
    mascot: { ...MAYLE, message: 'Số phía sau gấp đôi số phía trước, phép nhân 2 thật kỳ diệu!' },
    activity: {
      type: 'sequencePattern',
      title: 'DÃY SỐ TĂNG TỐC GẤP ĐÔI',
      ruleExplanation: 'Mỗi số bằng số liền trước nhân với 2 (×2):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1' },
        { id: 2, label: '2', stepHint: '×2' },
        { id: 3, label: '4', stepHint: '×2' },
        { id: 4, label: '8', stepHint: '×2' },
        { id: 5, label: '16', stepHint: '×2' },
        { id: 6, isMissing: true, stepHint: '×2' }
      ],
      choices: [
        { id: '24', label: '24' },
        { id: '30', label: '30' },
        { id: '32', label: '32 (Đúng)' },
        { id: '36', label: '36' }
      ],
      correctChoiceId: '32',
      correctExplanation: 'Chính xác! 16 × 2 = 32, con số tiếp theo là 32!'
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
  {
    id: 'pat-pyramid-7',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Kim tự tháp số thông minh (Number Pyramid)',
    badgeTitle: 'Bài 7 · Trang 58 Mở rộng',
    instruction: 'Trong kim tự tháp số, mỗi viên gạch ở tầng trên bằng TỔNG CỦA HAI VIÊN GẠCH ngay dưới nó. Tầng 1 gồm 3, 4, 4. Tầng 2 gồm 7 và 8. Hỏi viên gạch ở ĐỈNH là số mấy?',
    hint: 'Tầng 2: 3 + 4 = 7; 4 + 4 = 8. Viên gạch ở đỉnh bằng tổng tầng 2: 7 + 8 = 15!',
    mascot: { ...MAYLE, message: 'Cộng dồn hai viên gạch bên dưới để tìm ra viên gạch bên trên!' },
    activity: {
      type: 'sequencePattern',
      title: 'KIM TỰ THÁP SỐ TỔNG CỘNG',
      ruleExplanation: 'Viên gạch tầng trên = Tổng hai viên gạch kề nhau ở tầng dưới (7 + 8 = ?):',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '15' }
      ],
      choices: [
        { id: '14', label: '14' },
        { id: '15', label: '15 (Chính xác)' },
        { id: '16', label: '16' },
        { id: '17', label: '17' }
      ],
      correctChoiceId: '15',
      correctExplanation: 'Xuất sắc! 7 + 8 = 15, số trên đỉnh kim tự tháp là 15!'
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
      mode: 'twoEnds',
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
    badgeTitle: 'Bài 2.1 · Trang 62',
    instruction: 'Abby đứng thứ hai tính từ đầu hàng. Bạn ấy đứng thứ tư tính từ cuối hàng. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Công thức toán tư duy: (Đầu) + (Cuối) - 1. Ta có: 2 + 4 - 1 = 5 bạn!',
    mascot: { ...ABBY, message: 'Lần này hàng dài hơn một chút, áp dụng đúng công thức là ra ngay!' },
    activity: {
      type: 'queueCounter',
      mode: 'twoEnds',
      fromFront: 2,
      fromBack: 4,
      correctTotal: 5,
      formula: '2 + 4 - 1 = 5'
    }
  },
  {
    id: 'log-queue-between-2b',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Tìm số bạn đứng ở giữa Benny và Abby',
    badgeTitle: 'Bài 2.2 · Trang 62 Mở rộng',
    instruction: 'Trong một hàng có tất cả 10 bạn. Benny đứng thứ 3 tính từ đầu hàng. Abby đứng thứ 2 tính từ cuối hàng. Hỏi có bao nhiêu bạn đứng Ở GIỮA Benny và Abby?',
    hint: 'Lấy tổng số bạn trừ đi vị trí của Benny và Abby: 10 - 3 - 2 = 5 bạn ở giữa!',
    mascot: { ...CASEY, message: 'Muốn tìm số bạn ở giữa, lấy cả hàng trừ đi hai đầu nhé!' },
    activity: {
      type: 'queueCounter',
      mode: 'between',
      totalInQueue: 10,
      personA: { name: 'Benny', avatar: '🐵', pos: 3 },
      personB: { name: 'Abby', avatar: '🐰', pos: 2 },
      correctTotal: 5,
      formula: '10 - 3 - 2 = 5',
      options: [4, 5, 6, 7],
      promptTitle: 'Hỏi có bao nhiêu bạn đứng Ở GIỮA Benny và Abby?'
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
    id: 'log-cross-6-1',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng người đứng thành hình chữ thập (+)',
    badgeTitle: 'Bài 6.1 · Trang 66',
    instruction: 'Có một hàng người đứng thành hình chữ thập (+). Hàng dọc có 5 bạn, hàng ngang có 5 bạn. Benny đứng ở chính giữa điểm giao nhau của hai hàng. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Benny ở chính giữa được tính trong cả hàng dọc và hàng ngang: 5 + 5 - 1 = 9 bạn!',
    mascot: { ...BENNY, message: 'Tớ đứng ngay ở trung tâm chữ thập, ngã tư giao nhau đấy!' },
    activity: {
      type: 'cornerCross',
      shape: '+',
      verticalCount: 5,
      horizontalCount: 5,
      intersectionPerson: 'Benny',
      options: ['8 bạn', '9 bạn', '10 bạn', '11 bạn'],
      correctAnswer: '9 bạn'
    }
  },
  {
    id: 'log-circle-6-2',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm hàng vòng tròn nắm tay (Circle Queue)',
    badgeTitle: 'Bài 6.2 · Trang 67',
    instruction: 'Các bạn nhỏ nắm tay nhau xếp thành một vòng tròn lớn. Đếm theo chiều kim đồng hồ từ Benny đến Abby là người thứ 4. Đếm ngược chiều kim đồng hồ từ Benny đến Abby là người thứ 5. Hỏi vòng tròn có tất cả bao nhiêu bạn?',
    hint: 'Vì cả bạn Benny và bạn Abby đều được đếm 2 lần (ở cả 2 chiều), nên ta phải trừ đi 2: 4 + 5 - 2 = 7 bạn!',
    mascot: { ...MAYLE, message: 'Lưu ý khi đếm vòng tròn giữa 2 người: cả hai bạn đều bị tính 2 lần nên phải trừ đi 2!' },
    activity: {
      type: 'queueCounter',
      mode: 'circle',
      fromFront: 4,
      fromBack: 5,
      correctTotal: 7,
      formula: '4 + 5 - 2 = 7',
      options: [6, 7, 8, 9],
      promptTitle: 'Hỏi vòng tròn có tất cả bao nhiêu bạn nhỏ?'
    }
  },
  {
    id: 'log-scale-balance',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Cân thăng bằng suy luận logic (Balance Scale)',
    badgeTitle: 'Bài 7 · Trang 68',
    instruction: 'Quan sát hai chiếc cân bập bênh thăng bằng:\n• Cân 1: 1 Chú gấu 🐻 nặng bằng 2 Chú khỉ 🐵\n• Cân 2: 1 Chú khỉ 🐵 nặng bằng 2 Chú thỏ 🐰\nHỏi: Cần bao nhiêu chú thỏ 🐰 để chiếc cân số 3 thăng bằng với 1 chú gấu 🐻?',
    hint: '1 gấu = 2 khỉ. Mỗi chú khỉ lại nặng bằng 2 chú thỏ. Vậy 1 gấu = 2 × 2 = 4 chú thỏ 🐰!',
    mascot: { ...MAYLE, message: 'Dùng phép thế đại lượng: Thay mỗi chú khỉ bằng 2 chú thỏ nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'BÍ ẨN CÂN THĂNG BẰNG ĐẠI LƯỢNG',
      ruleExplanation: 'Dựa vào 2 chiếc cân đầu tiên để tìm số chú thỏ làm thăng bằng chú gấu:',
      scales: [
        {
          leftIcons: ['🐻'],
          leftLabel: '1 Chú Gấu',
          rightIcons: ['🐵', '🐵'],
          rightLabel: '2 Chú Khỉ'
        },
        {
          leftIcons: ['🐵'],
          leftLabel: '1 Chú Khỉ',
          rightIcons: ['🐰', '🐰'],
          rightLabel: '2 Chú Thỏ'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🐻'],
        targetLeftLabel: '1 Chú Gấu',
        options: [
          { id: '2', count: 2, icon: '🐰', label: '2 Chú Thỏ' },
          { id: '3', count: 3, icon: '🐰', label: '3 Chú Thỏ' },
          { id: '4', count: 4, icon: '🐰', label: '4 Chú Thỏ (Đúng)' },
          { id: '5', count: 5, icon: '🐰', label: '5 Chú Thỏ' }
        ],
        correctOptionId: '4',
        explanation: 'Quá xuất sắc! Vì 1 Gấu = 2 Khỉ và mỗi Khỉ = 2 Thỏ, nên 1 Gấu = 2 × 2 = 4 Chú Thỏ!'
      }
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
  {
    id: 'log-race-ranking',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Bảng xếp hạng cuộc thi chạy rừng xanh',
    badgeTitle: 'Bài 5 · Trang 72 Mở rộng',
    instruction: 'Cuộc thi chạy cự ly rừng xanh có 4 bạn tham gia (Thỏ Abby, Khỉ Benny, Chuột Casey và Chú Rùa):\n• Abby về đích trước Benny.\n• Benny về đích trước Casey.\n• Rùa về đích sau cùng (sau Casey).\nHãy sắp xếp thứ tự về đích từ NGƯỜI CHẠY NHANH NHẤT đến NGƯỜI CHẠY CHẬM NHẤT!',
    hint: 'Thứ tự từ về nhất đến về cuối: Abby ➔ Benny ➔ Casey ➔ Rùa!',
    mascot: { ...ABBY, message: 'Abby nhanh chân về nhất, cùng sắp xếp thứ tự bảng vàng nào!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự các vận động viên từ về đích đầu tiên đến cuối cùng:',
      directionLabel: 'Nhanh nhất (Về đích 1) ➔ Chậm nhất (Về đích 4)',
      items: [
        { id: 'Abby', label: 'Thỏ Abby', description: 'Về đích trước Benny', icon: '🐰' },
        { id: 'Benny', label: 'Khỉ Benny', description: 'Về đích trước Casey', icon: '🐵' },
        { id: 'Casey', label: 'Chuột Casey', description: 'Về đích trước Rùa', icon: '🐹' },
        { id: 'Rua', label: 'Chú Rùa', description: 'Về đích sau cùng', icon: '🐢' }
      ],
      correctOrder: ['Abby', 'Benny', 'Casey', 'Rua']
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
    badgeTitle: 'Thử Thách 1.1 · Trang 74',
    instruction: 'Bạn hãy tìm đường nối giữa 2 mũi tên sao cho tạo thành 1 đường đi liền mạch từ cổng ngoài vào tâm mê cung tròn!',
    hint: 'Đi theo các khe hở của từng vòng tròn đồng tâm, cẩn thận không đâm vào vách ngăn.',
    mascot: { ...BENNY, message: 'Mê cung tròn nhìn hoa cả mắt, nhưng bình tĩnh là tìm ra đường ngay!' },
    activity: {
      type: 'circularMaze'
    }
  },
  {
    id: 'chal-pixidoku-1',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pixidoku 5x5: Động vật rừng nhiệt đới #1',
    badgeTitle: 'Thử Thách 2.1 · Trang 75',
    instruction: 'Mỗi hàng và mỗi cột phải chứa đủ 5 loài động vật rừng. Các ô cùng loài thú không được chạm nhau theo bất kỳ hướng nào!',
    hint: '5 loài động vật: 🐯 Hổ, 🐘 Voi, 🐵 Khỉ, 🦜 Vẹt, 🦌 Hươu.',
    mascot: { ...CASEY, message: 'Khu rừng rộn ràng muông thú đang chờ chúng mình sắp xếp trật tự nè!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'tiger', icon: '🐯', name: 'Hổ' },
        { id: 'elephant', icon: '🐘', name: 'Voi' },
        { id: 'monkey', icon: '🐵', name: 'Khỉ' },
        { id: 'parrot', icon: '🦜', name: 'Vẹt' },
        { id: 'deer', icon: '🦌', name: 'Hươu' }
      ],
      initialGrid: [
        ['tiger', null, 'monkey', null, 'deer'],
        [null, null, null, 'elephant', null],
        ['elephant', null, 'parrot', null, null],
        [null, 'tiger', null, null, null],
        ['monkey', null, null, null, 'elephant']
      ],
      solution: [
        ['tiger', 'elephant', 'monkey', 'parrot', 'deer'],
        ['parrot', 'deer', 'tiger', 'elephant', 'monkey'],
        ['elephant', 'monkey', 'parrot', 'deer', 'tiger'],
        ['deer', 'tiger', 'elephant', 'monkey', 'parrot'],
        ['monkey', 'parrot', 'deer', 'tiger', 'elephant']
      ]
    }
  },
  {
    id: 'chal-pixidoku-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pixidoku 5x5: Động vật rừng nhiệt đới #2',
    badgeTitle: 'Thử Thách 2.2 · Trang 76',
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
      solution: [
        ['wolf', 'monkey', 'bear', 'cow', 'wolf'],
        ['unicorn', 'cow', 'unicorn', 'monkey', 'bear'],
        ['bear', 'monkey', 'bear', 'cow', 'unicorn'],
        ['cow', 'unicorn', 'wolf', 'monkey', 'bear'],
        ['wolf', 'monkey', 'bear', 'cow', 'unicorn']
      ]
    }
  },
  {
    id: 'chal-cattle-3',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Hàng rào bảo vệ nông trại bò',
    badgeTitle: 'Thử Thách 3.1 · Trang 77',
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
    title: 'Săn ngôi sao may mắn (Star Battle 6x6)',
    badgeTitle: 'Thử Thách 4.1 · Trang 78',
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
    id: 'chal-slither-1',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Hàng rào ma trận số khép kín (Slitherlink 4x4)',
    badgeTitle: 'Thử Thách 5.1 · Trang 79',
    instruction: 'Nối các chấm tròn thành 1 đường viền khép kín duy nhất sao cho số trong mỗi ô bằng đúng số cạnh có đường viền đi qua!',
    hint: 'Ô số 2 có 2 cạnh được viền, ô số 1 có 1 cạnh được viền. Đường nối phải tạo thành một vòng khép kín!',
    mascot: { ...BENNY, message: 'Cẩn thận tính số cạnh xung quanh từng ô số để dựng hàng rào chuẩn nhé!' },
    activity: {
      type: 'slitherlink',
      rows: 4,
      cols: 4,
      clues: [
        [2, 2, 0, null],
        [1, 1, null, null],
        [2, 2, null, null],
        [null, null, null, null]
      ],
      solutionEdges: {
        h: [
          [true, true, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [true, true, false, false],
          [false, false, false, false]
        ],
        v: [
          [true, false, true, false, false],
          [true, false, true, false, false],
          [true, false, true, false, false],
          [false, false, false, false, false]
        ]
      }
    }
  },
  {
    id: 'chal-balance-scale',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đấu trường cân đĩa thăng bằng siêu logic',
    badgeTitle: 'Thử Thách 6.1 · Trang 80',
    instruction: 'Dựa vào hai chiếc cân thăng bằng đã cho, hãy suy luận xem 1 Ngôi sao ⭐ nặng bằng bao nhiêu Khối cầu xanh 🔵?',
    hint: 'Thay thế: Cân 2 cho biết ⭐ = 🔺 + 🔵. Hãy thay biểu thức này vào vị trí ⭐ ở Cân 1 để tìm cân nặng của 🔺 theo 🔵!',
    mascot: { ...MAYLE, message: 'Phương pháp đại lượng thế bằng hình ảnh sẽ giúp em tìm ra đáp án chỉ trong nháy mắt!' },
    activity: {
      type: 'balanceScale',
      title: 'Thử Thách Cân Đĩa Thăng Bằng',
      ruleExplanation: 'Quan sát các cân thăng bằng và tìm giá trị tương đương của hình Ngôi sao ⭐!',
      scales: [
        {
          leftIcons: ['⭐', '🔺'],
          leftLabel: '1 Sao + 1 Tam giác',
          rightIcons: ['🔵', '🔵', '🔵'],
          rightLabel: '3 Khối cầu xanh'
        },
        {
          leftIcons: ['⭐'],
          leftLabel: '1 Sao',
          rightIcons: ['🔺', '🔵'],
          rightLabel: '1 Tam giác + 1 Cầu'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['⭐'],
        targetLeftLabel: '1 Ngôi sao ⭐',
        options: [
          { id: 'opt-1', count: 1, icon: '🔵', label: '1 Khối cầu' },
          { id: 'opt-2', count: 2, icon: '🔵', label: '2 Khối cầu' },
          { id: 'opt-3', count: 3, icon: '🔵', label: '3 Khối cầu' },
          { id: 'opt-4', count: 4, icon: '🔵', label: '4 Khối cầu' }
        ],
        correctOptionId: 'opt-2',
        explanation: 'Thay ⭐ = 🔺 + 🔵 vào Cân 1 ta được: (🔺 + 🔵) + 🔺 = 3 🔵 => 2 🔺 = 2 🔵 => 1 🔺 = 1 🔵. Do đó 1 ⭐ = 1 🔺 + 1 🔵 = 1 🔵 + 1 🔵 = 2 🔵.'
      }
    }
  },
  {
    id: 'chal-treasure-vault',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Giải mã két sắt mật mã số bí ẩn',
    badgeTitle: 'Thử Thách 6.2 · Trang 81',
    instruction: 'Đọc kỹ 5 manh mối của cuốn sổ tay thám tử để xoay các chữ số mở chiếc két sắt chứa huy hiệu quán quân!',
    hint: 'Manh mối 4 cho biết [7, 3, 8] không có số nào đúng, hãy gạch bỏ ngay 7, 3, 8. Sau đó kết hợp manh mối 1 và 5 để tìm vị trí số 0 và số 2!',
    mascot: { ...ABBY, message: 'Em hãy làm thám tử tư duy tài ba để mở khóa chiếc két sắt bí mật này nhé!' },
    activity: {
      type: 'treasureVault',
      title: 'Mật Mã Két Sắt Spark Math',
      codeLength: 3,
      solutionCode: [0, 4, 2],
      clues: [
        {
          attempt: [6, 8, 2],
          correctDigits: 1,
          correctPositions: 1,
          description: '1 số đúng và đúng vị trí'
        },
        {
          attempt: [6, 1, 4],
          correctDigits: 1,
          correctPositions: 0,
          description: '1 số đúng nhưng sai vị trí'
        },
        {
          attempt: [2, 0, 6],
          correctDigits: 2,
          correctPositions: 0,
          description: '2 số đúng nhưng đều sai vị trí'
        },
        {
          attempt: [7, 3, 8],
          correctDigits: 0,
          correctPositions: 0,
          description: 'Không có số nào đúng'
        },
        {
          attempt: [7, 8, 0],
          correctDigits: 1,
          correctPositions: 0,
          description: '1 số đúng nhưng sai vị trí'
        }
      ]
    }
  },
  {
    id: 'chal-circle-seats',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Vòng tròn bạn bè: Suy luận chỗ ngồi dã ngoại',
    badgeTitle: 'Thử Thách 7.1 · Trang 82',
    instruction: '4 bạn Abby, Benny, Casey, Thầy Mayle ngồi quanh chiếc bàn tròn. Casey ngồi đối diện Benny; Abby ngồi bên phải Casey. Hãy xếp đúng thứ tự!',
    hint: 'Bắt đầu xếp từ Abby -> Benny -> Casey -> Thầy Mayle theo chiều kim đồng hồ.',
    mascot: { ...CASEY, message: 'Buổi dã ngoại thật vui khi cả nhóm ngồi đúng vị trí yêu thích!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 4,
      allowedCharacters: ['Abby', 'Benny', 'Casey', 'Mayle'],
      correctOrder: ['Abby', 'Benny', 'Casey', 'Mayle']
    }
  },
  {
    id: 'chal-magic-cross',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Ma trận số chữ thập & Kim cương kỳ diệu',
    badgeTitle: 'Thử Thách 8.1 · Trang 83',
    instruction: 'Điền các chữ số còn thiếu từ 1 đến 9 sao cho tổng các số trên mỗi hàng ngang, hàng dọc và đường chéo đều bằng đúng 15!',
    hint: 'Hàng 1 có: ? + 1 + 6 = 15 => ? = 8. Hàng 3 có: 4 + 9 + ? = 15 => ? = 2.',
    mascot: { ...BENNY, message: 'Ma trận 15 thần kỳ này là bài toán cổ kim cương cực kỳ nổi tiếng!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Trận Số Chữ Thập Kỳ Diệu',
      subtitle: 'Tổng mỗi hàng và mỗi cột đều bằng 15',
      targetSum: 15,
      allowedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      hintFormula: 'Hàng 1: 8 + 1 + 6 = 15 | Hàng 2: 3 + 5 + 7 = 15 | Hàng 3: 4 + 9 + 2 = 15',
      initialGrid: [
        [null, 1, 6],
        [3, 5, 7],
        [4, 9, null]
      ],
      solution: [
        [8, 1, 6],
        [3, 5, 7],
        [4, 9, 2]
      ]
    }
  },
  {
    id: 'chal-cube-counter',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm hình khối lập phương 3D xếp chồng',
    badgeTitle: 'Thử Thách 9.1 · Trang 84',
    instruction: 'Quan sát mô hình không gian 3 chiều và đếm chính xác tổng số khối lập phương, bao gồm cả những khối bị che khuất ở các tầng dưới!',
    hint: 'Đếm theo từng tầng: Tầng 1 (đáy) có 8 khối, Tầng 2 có 4 khối, Tầng 3 có 1 khối!',
    mascot: { ...MAYLE, message: 'Toán học không gian giúp phát triển tư duy hình học và trí tưởng tượng siêu việt!' },
    activity: {
      type: 'cubeCounter',
      title: 'Đếm Khối Lập Phương Không Gian 3D',
      instructionText: 'Đếm tổng số khối lập phương đơn vị cấu tạo nên khối kiến trúc dưới đây:',
      gridHeights: [
        [3, 2, 1],
        [2, 2, 1],
        [1, 1, 0]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy dưới cùng)', count: 8 },
        { layerName: 'Tầng 2 (Tầng giữa)', count: 4 },
        { layerName: 'Tầng 3 (Tầng đỉnh cao nhất)', count: 1 }
      ],
      totalCubes: 13,
      options: [11, 12, 13, 14],
      explanation: 'Phân tích: Hàng 1 có các cột cao 3, 2, 1 (tổng 6 khối); Hàng 2 có các cột cao 2, 2, 1 (tổng 5 khối); Hàng 3 có các cột cao 1, 1, 0 (tổng 2 khối). Tổng cộng = 6 + 5 + 2 = 13 khối lập phương.'
    }
  },
  {
    id: 'chal-ocean-pixidoku',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pixidoku 5x5: Đại dương kỳ bí',
    badgeTitle: 'Thử Thách 2.3 · Trang 86',
    instruction: 'Sắp xếp 5 sinh vật biển vào bảng 5x5 sao cho mỗi hàng, mỗi cột có đủ 5 sinh vật và không có 2 con vật giống nhau nào đứng cạnh nhau!',
    hint: '5 sinh vật biển: 🐬 Cá heo, 🐢 Rùa biển, 🐙 Bạch tuộc, ⭐ Sao biển, 🐠 Cá hề.',
    mascot: { ...ABBY, message: 'Đại dương xanh bao la với những người bạn biển đáng yêu đang đợi em!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'dolphin', icon: '🐬', name: 'Cá heo' },
        { id: 'seaTurtle', icon: '🐢', name: 'Rùa biển' },
        { id: 'octopus', icon: '🐙', name: 'Bạch tuộc' },
        { id: 'starfish', icon: '⭐', name: 'Sao biển' },
        { id: 'clownfish', icon: '🐠', name: 'Cá hề' }
      ],
      initialGrid: [
        ['dolphin', null, 'octopus', null, 'clownfish'],
        [null, 'clownfish', null, 'seaTurtle', null],
        ['seaTurtle', null, 'starfish', null, 'dolphin'],
        [null, 'dolphin', null, 'octopus', null],
        ['octopus', null, 'clownfish', null, 'seaTurtle']
      ],
      solution: [
        ['dolphin', 'seaTurtle', 'octopus', 'starfish', 'clownfish'],
        ['starfish', 'clownfish', 'dolphin', 'seaTurtle', 'octopus'],
        ['seaTurtle', 'octopus', 'starfish', 'clownfish', 'dolphin'],
        ['clownfish', 'dolphin', 'seaTurtle', 'octopus', 'starfish'],
        ['octopus', 'starfish', 'clownfish', 'dolphin', 'seaTurtle']
      ]
    }
  },
  {
    id: 'chal-cattle-sheep',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Hàng rào bảo vệ nông trại bò & cừu mở rộng',
    badgeTitle: 'Thử Thách 3.2 · Trang 87',
    instruction: 'Nông trại mở rộng thêm nhiều chú bò cần được bảo vệ trước các bụi cây xương rồng gai nhọn. Hãy khoanh vùng bảo vệ trọn vẹn nông trại!',
    hint: 'Tìm đường bao an toàn cho tất cả 7 chú bò, không chạm vào bất kỳ cây xương rồng nào.',
    mascot: { ...CASEY, message: 'Đồng cỏ xanh tươi tốt đã sẵn sàng để các chú bò vui chơi an toàn!' },
    activity: {
      type: 'cattleFence'
    }
  },
  {
    id: 'chal-star-battle-8',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Săn sao may mắn Đỉnh Cao (Star Battle 8x8)',
    badgeTitle: 'Thử Thách 4.2 · Trang 88',
    instruction: 'Bảng mở rộng 8x8 gồm 8 vùng màu sắc độc lập. Mỗi hàng, mỗi cột và mỗi vùng màu sắc chỉ được chứa DUY NHẤT một ngôi sao may mắn ⭐!',
    hint: 'Quan sát các vùng màu hẹp trước để tìm ô đặt sao duy nhất, sau đó loại trừ hàng và cột tương ứng.',
    mascot: { ...ABBY, message: 'Màn Star Battle 8x8 đỉnh cao này là bài toán tư duy tầm cỡ Olympic Toán tuổi thơ!' },
    activity: {
      type: 'starBattle',
      size: 8,
      targetStarCount: 8,
      regions: [
        [0, 0, 0, 1, 1, 2, 2, 2],
        [0, 0, 1, 1, 1, 2, 2, 3],
        [0, 0, 1, 1, 1, 2, 3, 3],
        [4, 4, 1, 5, 5, 2, 3, 3],
        [4, 4, 4, 5, 5, 6, 3, 3],
        [4, 4, 5, 5, 6, 6, 3, 3],
        [7, 4, 5, 6, 6, 6, 7, 7],
        [7, 7, 7, 6, 6, 7, 7, 7]
      ],
      starsSolution: [
        [0, 1],
        [1, 3],
        [2, 5],
        [3, 7],
        [4, 0],
        [5, 2],
        [6, 4],
        [7, 6]
      ]
    }
  },
  {
    id: 'chal-slither-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Siêu Slitherlink Bậc Thầy 5x5',
    badgeTitle: 'Thử Thách 5.2 · Trang 89',
    instruction: 'Nối các cạnh giữa các chấm tròn để tạo thành 1 vòng tròn khép kín bao quanh các ô số, thỏa mãn chính xác số cạnh quy định!',
    hint: 'Ô số 0 tuyệt đối không có cạnh nào đi qua! Ô số 2 có đúng 2 cạnh bao quanh.',
    mascot: { ...BENNY, message: 'Đường bao khép kín 5x5 này đòi hỏi sự kiên nhẫn và logic cực kỳ sắc bén!' },
    activity: {
      type: 'slitherlink',
      rows: 5,
      cols: 5,
      clues: [
        [null, null, 0, null, null],
        [null, 2, 1, 2, null],
        [null, 1, 0, 1, null],
        [null, 2, 1, 2, null],
        [null, null, 0, null, null]
      ],
      solutionEdges: {
        h: [
          [false, false, false, false, false],
          [false, true, true, true, false],
          [false, false, false, false, false],
          [false, false, false, false, false],
          [false, true, true, true, false],
          [false, false, false, false, false]
        ],
        v: [
          [false, false, false, false, false, false],
          [false, true, false, false, true, false],
          [false, true, false, false, true, false],
          [false, true, false, false, true, false],
          [false, false, false, false, false, false]
        ]
      }
    }
  },
  {
    id: 'chal-grand-finale',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đấu trường Chung kết - Vương miện Quán quân',
    badgeTitle: 'Thử Thách 10 · Trang 90',
    instruction: 'Vượt qua 3 thử thách tư duy đỉnh cao tích hợp để nhận Cúp Vàng Quán Quân và Chứng Nhận Hiệp Sĩ Toán Tư Duy Lớp 3!',
    hint: 'Vận dụng toàn bộ kiến thức về biểu đồ, thể tích lít, suy luận hàng ngũ và quy luật ma trận!',
    mascot: { ...MAYLE, message: 'Thầy rất tự hào về em! Hãy tự tin chinh phục vương miện quán quân hôm nay nhé!' },
    activity: {
      type: 'grandFinale',
      title: 'Đấu Trường Chung Kết Quán Quân',
      roundQuestions: [
        {
          id: 'fin-q1',
          category: 'Vị Trí Hàng Ngũ & Bù Trừ',
          question: 'Trong một hàng dọc có 15 bạn học sinh đang xếp hàng vào lớp. Bạn Nam đứng ở vị trí thứ 6 tính từ trên xuống. Hỏi có bao nhiêu bạn đứng ở phía sau bạn Nam?',
          options: [
            { id: 'q1-a', text: '8 bạn', isCorrect: false },
            { id: 'q1-b', text: '9 bạn', isCorrect: true },
            { id: 'q1-c', text: '10 bạn', isCorrect: false },
            { id: 'q1-d', text: '11 bạn', isCorrect: false }
          ],
          explanation: 'Vì Nam đứng thứ 6 nên tính cả Nam trở lên trước có 6 bạn. Số bạn đứng phía sau Nam là: 15 - 6 = 9 bạn.'
        },
        {
          id: 'fin-q2',
          category: 'Thể Tích & Đơn Vị Lít',
          question: 'Một can lớn đựng đầy 12 lít nước khoáng. Người ta rót đều toàn bộ lượng nước này vào 4 chiếc bình nhỏ giống hệt nhau thì vừa hết. Hỏi dung tích mỗi chiếc bình nhỏ là bao nhiêu lít?',
          options: [
            { id: 'q2-a', text: '2 lít', isCorrect: false },
            { id: 'q2-b', text: '3 lít', isCorrect: true },
            { id: 'q2-c', text: '4 lít', isCorrect: false },
            { id: 'q2-d', text: '6 lít', isCorrect: false }
          ],
          explanation: 'Lấy 12 lít chia đều cho 4 bình: 12 : 4 = 3 lít. Mỗi chiếc bình nhỏ chứa 3 lít nước.'
        },
        {
          id: 'fin-q3',
          category: 'Quy Luật Số Học & Ma Trận',
          question: 'Một viên kim cương số học có quy luật: Tổng của hai số ở hai đỉnh đối diện luôn bằng 20. Biết đỉnh trên là 7, đỉnh dưới là 13; đỉnh bên trái là 8. Hỏi số ở đỉnh bên phải là bao nhiêu?',
          options: [
            { id: 'q3-a', text: '10', isCorrect: false },
            { id: 'q3-b', text: '11', isCorrect: false },
            { id: 'q3-c', text: '12', isCorrect: true },
            { id: 'q3-d', text: '14', isCorrect: false }
          ],
          explanation: 'Kiểm tra cặp đỉnh trên - dưới: 7 + 13 = 20. Áp dụng quy luật cho cặp đỉnh trái - phải: 8 + ? = 20 => ? = 20 - 8 = 12.'
        }
      ]
    }
  }
];
