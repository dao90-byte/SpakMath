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
      bottles: { id: string; label: string; levelPercent: number; color?: string; subLabel?: string }[];
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
    title: 'Món Ăn Trưa Yêu Thích Của Đội Bạn Casey',
    badgeTitle: 'Bài 1 · Trang 6',
    instruction: 'Biểu đồ hình ảnh bên dưới cho thấy số lượt bình chọn những món ăn trưa yêu thích của bạn Casey và các bạn nhỏ. Quy ước: Mỗi biểu tượng thể hiện cho 1 lượt bình chọn.',
    hint: 'Pizza có 4 chiếc bánh; Bánh mì kẹp có 1 chiếc; Bánh mì xúc xích có 3 chiếc; Canh súp có 2 bát. Em hãy quan sát và thực hiện các phép tính!',
    mascot: { ...BENNY, message: 'Chào mừng bạn đến với Trạm 1! Hãy quan sát biểu đồ tranh và làm quen với các phép tính thú vị nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Quy ước: Mỗi hình = 1 lượt bình chọn',
      multiplier: 1,
      items: [
        { id: 'sandwich', label: 'Bánh Mì Kẹp', icon: '🥪', count: 1 },
        { id: 'pizza', label: 'Pizza Thơm Giòn', icon: '🍕', count: 4 },
        { id: 'hotdog', label: 'Bánh Mì Xúc Xích', icon: '🌭', count: 3 },
        { id: 'soup', label: 'Canh Súp Nóng', icon: '🥣', count: 2 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Tổng số lượt bình chọn cho Pizza và Bánh mì xúc xích là bao nhiêu lượt?',
          options: ['5 lượt', '6 lượt', '7 lượt', '8 lượt'],
          correctAnswer: '7 lượt'
        },
        {
          id: 'q2',
          prompt: 'b) Số bạn thích Pizza nhiều hơn số bạn thích Canh súp bao nhiêu bạn?',
          options: ['1 bạn', '2 bạn', '3 bạn', '4 bạn'],
          correctAnswer: '2 bạn'
        },
        {
          id: 'q3',
          prompt: 'c) Cả 4 món ăn trưa nhận được tất cả bao nhiêu lượt bình chọn?',
          options: ['8 lượt', '9 lượt', '10 lượt', '11 lượt'],
          correctAnswer: '10 lượt'
        }
      ]
    }
  },
  {
    id: 'pic-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Sắp xếp thứ tự Đồ chơi yêu thích của 19 bạn nhỏ',
    badgeTitle: 'Bài 2 · Trang 7',
    instruction: 'Số liệu khảo sát 19 bạn nhỏ: Ô Tô Đồ Chơi có 3 bạn, Búp Bê Vải có 4 bạn, Khối Xếp Hình có 5 bạn, Quả Bóng Đá có 7 bạn. Hãy sắp xếp các món đồ chơi theo thứ tự từ ÍT LƯỢT BÌNH CHỌN NHẤT đến NHIỀU LƯỢT BÌNH CHỌN NHẤT!',
    hint: 'Xếp từ ít nhất đến nhiều nhất: Ô tô (3) -> Búp bê (4) -> Khối Lego (5) -> Quả bóng (7)!',
    mascot: { ...CASEY, message: 'Sắp xếp thứ tự giúp chúng mình nắm bắt xu hướng bình chọn nhanh chóng hơn!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự đồ chơi từ ÍT lượt bình chọn nhất đến NHIỀU lượt bình chọn nhất:',
      directionLabel: 'Từ Ít Nhất ➔ Nhiều Nhất',
      items: [
        { id: 'car', label: 'Ô Tô Đồ Chơi', description: '3 bạn chọn', icon: '🚗' },
        { id: 'doll', label: 'Búp Bê Vải', description: '4 bạn chọn', icon: '🧸' },
        { id: 'lego', label: 'Khối Xếp Hình', description: '5 bạn chọn', icon: '🧩' },
        { id: 'ball', label: 'Quả Bóng Đá', description: '7 bạn chọn', icon: '⚽' }
      ],
      correctOrder: ['car', 'doll', 'lego', 'ball']
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
          prompt: 'a) Tổng số bạn bình chọn cho Mì Ý và Bánh Taco là bao nhiêu bạn?',
          options: ['6 bạn', '7 bạn', '8 bạn', '9 bạn'],
          correctAnswer: '8 bạn'
        },
        {
          id: 'q2',
          prompt: 'b) Số bạn thích Mì Ý nhiều hơn số bạn thích Gà rán bao nhiêu bạn?',
          options: ['1 bạn', '2 bạn', '3 bạn', '4 bạn'],
          correctAnswer: '1 bạn'
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
    instruction: 'Biểu đồ cho thấy các loại hoa khác nhau mà mẹ Casey đã trồng trong vườn. Lưu ý: Mỗi biểu tượng hoa = 1 cây hoa. Em hãy quan sát biểu đồ và thực hiện phép tính.',
    hint: 'Tulip có 5 bông, Hồng có 4 bông, Lily có 2 bông, Cúc có 4 bông. Tổng = 5 + 4 + 2 + 4 = 15 bông!',
    mascot: { ...CASEY, message: 'Vườn hoa của mẹ mình đẹp tuyệt vời! Cùng đếm và tính toán số lượng hoa nhé!' },
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
          prompt: 'a) Mẹ Casey đã trồng tất cả bao nhiêu bông hoa trong vườn?',
          options: ['13 bông', '14 bông', '15 bông', '16 bông'],
          correctAnswer: '15 bông'
        },
        {
          id: 'q2',
          prompt: 'b) Số hoa Tulip nhiều hơn số hoa Lily bao nhiêu bông?',
          options: ['2 bông', '3 bông', '4 bông', '5 bông'],
          correctAnswer: '3 bông'
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
    id: 'pic-5-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Khảo sát hoa quả yêu thích của lớp 3A',
    badgeTitle: 'Bài 5.2 · Trang 11',
    instruction: 'Biểu đồ cho thấy loại trái cây yêu thích của các bạn nhỏ lớp 3A. Lưu ý: Mỗi hình vuông 🟩 = 1 bạn nhỏ bình chọn.',
    hint: 'Chuối có 8 ô vuông, Táo có 6 ô, Cam có 5 ô, Nho có 4 ô!',
    mascot: { ...CASEY, message: 'Hoa quả vừa ngon vừa cung cấp nhiều vitamin giúp chúng mình khỏe mạnh!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi ô vuông 🟩 = 1 bạn nhỏ bình chọn',
      items: [
        { id: 'banana', label: 'Chuối 🍌', icon: '🟩', count: 8 },
        { id: 'apple', label: 'Táo 🍎', icon: '🟩', count: 6 },
        { id: 'orange', label: 'Cam 🍊', icon: '🟩', count: 5 },
        { id: 'grape', label: 'Nho 🍇', icon: '🟩', count: 4 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Loại trái cây nào được NHIỀU bạn yêu thích nhất?',
          options: ['Chuối', 'Táo', 'Cam', 'Nho'],
          correctAnswer: 'Chuối'
        },
        {
          id: 'q2',
          prompt: 'b) Số bạn thích Chuối nhiều hơn số bạn thích Nho bao nhiêu bạn?',
          options: ['2 bạn', '3 bạn', '4 bạn', '5 bạn'],
          correctAnswer: '4 bạn'
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
    title: 'Khảo Sát 4 Mùa Yêu Thích: Bội Số 3 & Tỉ Lệ',
    badgeTitle: 'Bài 10 · Trang 16',
    instruction: 'Casey đã hỏi 24 người về mùa yêu thích của họ. Biểu đồ dưới đây biểu diễn kết quả khảo sát. Lưu ý quy ước: Mỗi bông hoa 🌸 thể hiện cho 3 lượt bình chọn.',
    hint: 'Mỗi 🌸 = 3 người: Mùa xuân 4 bông = 12 người; Mùa hạ 1 bông = 3 người; Mùa thu 1 bông = 3 người; Mùa đông 2 bông = 6 người. Tổng: 12 + 3 + 3 + 6 = 24 người!',
    mascot: { ...CASEY, message: 'Nhớ nhân mỗi biểu tượng hoa với 3 để tìm số người thật của từng mùa nhé bạn!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🌸 = 3 người bình chọn',
      multiplier: 3,
      items: [
        { id: 'spring', label: 'Mùa Xuân', icon: '🌸', count: 4, actualValue: 12 },
        { id: 'summer', label: 'Mùa Hạ', icon: '🌸', count: 1, actualValue: 3 },
        { id: 'autumn', label: 'Mùa Thu', icon: '🌸', count: 1, actualValue: 3 },
        { id: 'winter', label: 'Mùa Đông', icon: '🌸', count: 2, actualValue: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Mùa Xuân có số người yêu thích gấp mấy lần Mùa Hạ?',
          options: ['2 lần', '3 lần', '4 lần', '5 lần'],
          correctAnswer: '4 lần'
        },
        {
          id: 'q2',
          prompt: 'b) Tổng số người yêu thích Mùa Xuân và Mùa Đông là bao nhiêu người?',
          options: ['15 người', '18 người', '21 người', '24 người'],
          correctAnswer: '18 người'
        },
        {
          id: 'q3',
          prompt: 'c) Cả 4 mùa có tất cả bao nhiêu người tham gia khảo sát?',
          options: ['20 người', '22 người', '24 người', '26 người'],
          correctAnswer: '24 người'
        }
      ]
    }
  },
  {
    id: 'pic-11',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Ống heo tiết kiệm của Benny, Abby, Casey & Rory',
    badgeTitle: 'Bài 11 · Trang 17',
    instruction: 'Biểu đồ cho thấy số đồng xu tiết kiệm được trong ống heo của 4 bạn nhỏ. Lưu ý tỉ lệ nhân: Mỗi đồng xu 🪙 thể hiện 5 xu thật.',
    hint: 'Abby có 6 đồng xu = 6 × 5 = 30 xu. Casey có 3 đồng xu = 3 × 5 = 15 xu. Chênh lệch là: 30 - 15 = 15 xu!',
    mascot: { ...BENNY, message: 'Nhớ nhân với 5 nhé: Mỗi biểu tượng đồng xu = 5 xu thật đấy!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi 🪙 = 5 xu tiết kiệm',
      multiplier: 5,
      items: [
        { id: 'abby', label: 'Abby 🐰', icon: '🪙', count: 6, actualValue: 30, unit: 'xu' },
        { id: 'rory', label: 'Rory 🐻', icon: '🪙', count: 5, actualValue: 25, unit: 'xu' },
        { id: 'benny', label: 'Benny 🐵', icon: '🪙', count: 4, actualValue: 20, unit: 'xu' },
        { id: 'casey', label: 'Casey 🐹', icon: '🪙', count: 3, actualValue: 15, unit: 'xu' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Bạn Abby đã tiết kiệm được tất cả bao nhiêu xu?',
          options: ['20 xu', '25 xu', '30 xu', '35 xu'],
          correctAnswer: '30 xu'
        },
        {
          id: 'q2',
          prompt: 'b) Bạn Abby tiết kiệm nhiều hơn bạn Casey bao nhiêu xu?',
          options: ['10 xu', '15 xu', '20 xu', '25 xu'],
          correctAnswer: '15 xu'
        }
      ]
    }
  },
  {
    id: 'pic-12',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tổng kết Ngôi Sao Thi Đua của 4 Tổ',
    badgeTitle: 'Bài 12 · Trang 18',
    instruction: 'Biểu đồ hình ảnh tổng kết số ngôi sao thi đua đạt được của 4 tổ học tập trong tháng. Lưu ý: Mỗi ngôi sao ⭐ thể hiện 4 điểm thi đua.',
    hint: 'Tổ 2 có 7 sao = 7 × 4 = 28 điểm; Tổ 1 có 5 sao = 5 × 4 = 20 điểm. Tổng điểm của Tổ 1 và Tổ 3 = 20 + 16 = 36 điểm!',
    mascot: { ...MAYLE, message: 'Cả 4 tổ đều thi đua học tập rất chăm chỉ và giành nhiều ngôi sao sáng!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý: Mỗi ⭐ = 4 điểm thi đua',
      multiplier: 4,
      items: [
        { id: 'group1', label: 'Tổ 1 🌟', icon: '⭐', count: 5, actualValue: 20, unit: 'điểm' },
        { id: 'group2', label: 'Tổ 2 🚀', icon: '⭐', count: 7, actualValue: 28, unit: 'điểm' },
        { id: 'group3', label: 'Tổ 3 🍀', icon: '⭐', count: 4, actualValue: 16, unit: 'điểm' },
        { id: 'group4', label: 'Tổ 4 🎯', icon: '⭐', count: 6, actualValue: 24, unit: 'điểm' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Tổ có số điểm thi đua cao nhất là tổ nào?',
          options: ['Tổ 1', 'Tổ 2', 'Tổ 3', 'Tổ 4'],
          correctAnswer: 'Tổ 2'
        },
        {
          id: 'q2',
          prompt: 'b) Tổng số điểm thi đua của Tổ 1 và Tổ 3 là bao nhiêu?',
          options: ['32 điểm', '36 điểm', '40 điểm', '44 điểm'],
          correctAnswer: '36 điểm'
        }
      ]
    }
  },
  {
    id: 'pic-13',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Nông Trại Trái Cây Hữu Cơ: Bội Số 6 & Hiệu Cực Đại',
    badgeTitle: 'Bài 13 · Độ khó Cấp 1',
    instruction: 'Biểu đồ biểu diễn khối lượng 4 loại trái cây thu hoạch được tại nông trại hữu cơ của bạn Benny. Lưu ý quy ước tỉ lệ: Mỗi quả táo đỏ 🍎 đại diện cho 6 kg quả thật.',
    hint: 'Mỗi 🍎 = 6 kg. Dâu tây: 5 × 6 = 30 kg; Táo ngọt: 8 × 6 = 48 kg; Nho tím: 3 × 6 = 18 kg; Cam vàng: 6 × 6 = 36 kg. Hiệu quả nhiều nhất và ít nhất là: 48 - 18 = 30 kg!',
    mascot: { ...BENNY, message: 'Chào mừng bạn đến cấp độ nâng cao! Hãy nhớ nhân mỗi biểu tượng với 6 kg nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🍎 = 6 kg quả thu hoạch',
      multiplier: 6,
      items: [
        { id: 'strawberry', label: 'Dâu Tây Mọng 🍓', icon: '🍎', count: 5, actualValue: 30, unit: 'kg' },
        { id: 'apple', label: 'Táo Ngọt Giòn 🍏', icon: '🍎', count: 8, actualValue: 48, unit: 'kg' },
        { id: 'grape', label: 'Nho Tím Rừng 🍇', icon: '🍎', count: 3, actualValue: 18, unit: 'kg' },
        { id: 'orange', label: 'Cam Vàng Mọng 🍊', icon: '🍎', count: 6, actualValue: 36, unit: 'kg' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Loại quả nào thu hoạch được nhiều nhất và nặng bao nhiêu kg?',
          options: ['Cam vàng (36 kg)', 'Táo ngọt (48 kg)', 'Dâu tây (30 kg)', 'Táo ngọt (42 kg)'],
          correctAnswer: 'Táo ngọt (48 kg)'
        },
        {
          id: 'q2',
          prompt: 'b) Hiệu khối lượng giữa loại quả nhiều nhất và loại quả ít nhất là bao nhiêu kg?',
          options: ['24 kg', '28 kg', '30 kg', '36 kg'],
          correctAnswer: '30 kg'
        },
        {
          id: 'q3',
          prompt: 'c) Tổng khối lượng của cả 4 loại quả thu hoạch được là bao nhiêu kg?',
          options: ['120 kg', '126 kg', '132 kg', '138 kg'],
          correctAnswer: '132 kg'
        }
      ]
    }
  },
  {
    id: 'pic-14',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Khảo Sát Phương Tiện Giờ Cao Điểm: Bội Số 4 & Tìm Ẩn Số',
    badgeTitle: 'Bài 14 · Độ khó Cấp 2',
    instruction: 'Đội tuần tra của Casey đếm được tổng cộng 48 phương tiện qua ngã tư giờ cao điểm. Quy ước: Mỗi biểu tượng 🚗 đại diện cho 4 xe thật.',
    hint: 'Mỗi 🚗 = 4 xe: Xe máy có 4 hình = 16 xe; Ô tô con có 5 hình = 20 xe; Xe buýt có 2 hình = 8 xe; Xe đạp có 1 hình = 4 xe. Tổng = 16 + 20 + 8 + 4 = 48 xe!',
    mascot: { ...CASEY, message: 'Nhân số biểu tượng với 4 để tìm số xe thật và giải các câu hỏi toán học nhé bạn!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🚗 = 4 xe thật',
      multiplier: 4,
      items: [
        { id: 'motorbike', label: 'Xe máy', icon: '🚗', count: 4, actualValue: 16, unit: 'xe' },
        { id: 'car', label: 'Ô tô con', icon: '🚗', count: 5, actualValue: 20, unit: 'xe' },
        { id: 'bus', label: 'Xe buýt', icon: '🚗', count: 2, actualValue: 8, unit: 'xe' },
        { id: 'bicycle', label: 'Xe đạp', icon: '🚗', count: 1, actualValue: 4, unit: 'xe' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Có bao nhiêu chiếc xe đạp đi qua ngã tư trong giờ cao điểm?',
          options: ['4 xe', '6 xe', '8 xe', '10 xe'],
          correctAnswer: '4 xe'
        },
        {
          id: 'q2',
          prompt: 'b) Số ô tô con nhiều hơn số xe buýt bao nhiêu chiếc xe?',
          options: ['8 xe', '10 xe', '12 xe', '14 xe'],
          correctAnswer: '12 xe'
        },
        {
          id: 'q3',
          prompt: 'c) Số xe máy gấp mấy lần số xe đạp?',
          options: ['2 lần', '3 lần', '4 lần', '5 lần'],
          correctAnswer: '4 lần'
        }
      ]
    }
  },
  {
    id: 'pic-15',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thư Viện Sách Của Biệt Đội Rừng Xanh: Bội Số 8 & Bài Toán Tỉ Số',
    badgeTitle: 'Bài 15 · Độ khó Cấp 3',
    instruction: 'Biểu đồ biểu diễn 4 thể loại sách trong phòng đọc của Thỏ Abby. Lưu ý quy ước tỉ lệ nhân: Mỗi cuốn sách mở 📚 đại diện cho 8 quyển sách thật.',
    hint: 'Khoa học: 4 × 8 = 32 quyển. Lịch sử: 2 × 8 = 16 quyển. 32 gấp 16 số lần là: 32 : 16 = 2 lần! Thơ ca: 3 × 8 = 24 quyển; Cần thêm 32 - 24 = 8 quyển để bằng Khoa học.',
    mascot: { ...ABBY, message: 'Ở bài này, chúng mình sẽ so sánh gấp mấy lần và tính số sách cần bổ sung đấy!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 📚 = 8 quyển sách thật',
      multiplier: 8,
      items: [
        { id: 'comics', label: 'Truyện Tranh Thiếu Nhi 🦸', icon: '📚', count: 7, actualValue: 56, unit: 'quyển' },
        { id: 'science', label: 'Khám Phá Khoa Học 🔬', icon: '📚', count: 4, actualValue: 32, unit: 'quyển' },
        { id: 'history', label: 'Lịch Sử & Danh Nhân 🏛️', icon: '📚', count: 2, actualValue: 16, unit: 'quyển' },
        { id: 'poetry', label: 'Văn Học & Thơ Ca 📜', icon: '📚', count: 3, actualValue: 24, unit: 'quyển' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Số sách Khám Phá Khoa Học gấp mấy lần số sách Lịch Sử?',
          options: ['2 lần', '3 lần', '4 lần', '1,5 lần'],
          correctAnswer: '2 lần'
        },
        {
          id: 'q2',
          prompt: 'b) Cần bổ sung thêm bao nhiêu quyển sách Thơ Ca để số sách Thơ Ca bằng số sách Khoa Học?',
          options: ['6 quyển', '8 quyển (1 biểu tượng)', '12 quyển', '16 quyển'],
          correctAnswer: '8 quyển (1 biểu tượng)'
        },
        {
          id: 'q3',
          prompt: 'c) Tổng số sách của cả 4 thể loại trong thư viện là bao nhiêu quyển?',
          options: ['112 quyển', '120 quyển', '128 quyển', '136 quyển'],
          correctAnswer: '128 quyển'
        }
      ]
    }
  },
  {
    id: 'pic-16',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Dự Án Phủ Xanh 5 Ngọn Đồi: Quy Ước Bội Số 10 & Tính Trung Bình',
    badgeTitle: 'Bài 16 · Độ khó Cấp 4',
    instruction: 'Biểu đồ biểu diễn chiến dịch trồng rừng trên 5 ngọn đồi của trường Spark Math. Lưu ý: Mỗi cây xanh 🌲 thể hiện cho đúng 10 cây xanh đã được trồng.',
    hint: 'Đồi Sao Mai: 60 cây; Đồi Ánh Dương: 90 cây; Đồi Thung Lũng: 40 cây; Đồi Gió Lộng: 70 cây; Đồi Mây Trắng: 40 cây. Tổng = 300 cây. Trung bình mỗi đồi = 300 : 5 = 60 cây!',
    mascot: { ...MAYLE, message: 'Hãy cộng tổng số cây của cả 5 ngọn đồi rồi chia cho 5 để tìm số cây trung bình nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🌲 = 10 cây xanh đã trồng',
      multiplier: 10,
      items: [
        { id: 'hill1', label: 'Đồi Sao Mai 🌄', icon: '🌲', count: 6, actualValue: 60, unit: 'cây' },
        { id: 'hill2', label: 'Đồi Ánh Dương ☀️', icon: '🌲', count: 9, actualValue: 90, unit: 'cây' },
        { id: 'hill3', label: 'Đồi Thung Lũng 🏞️', icon: '🌲', count: 4, actualValue: 40, unit: 'cây' },
        { id: 'hill4', label: 'Đồi Gió Lộng 🍃', icon: '🌲', count: 7, actualValue: 70, unit: 'cây' },
        { id: 'hill5', label: 'Đồi Mây Trắng ☁️', icon: '🌲', count: 4, actualValue: 40, unit: 'cây' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Hai ngọn đồi nào có số lượng cây trồng bằng nhau?',
          options: ['Đồi Sao Mai & Đồi Gió Lộng', 'Đồi Thung Lũng & Đồi Mây Trắng', 'Đồi Ánh Dương & Đồi Sao Mai', 'Đồi Mây Trắng & Đồi Gió Lộng'],
          correctAnswer: 'Đồi Thung Lũng & Đồi Mây Trắng'
        },
        {
          id: 'q2',
          prompt: 'b) Tổng số cây xanh đã trồng được trên cả 5 ngọn đồi là bao nhiêu cây?',
          options: ['280 cây', '290 cây', '300 cây', '320 cây'],
          correctAnswer: '300 cây'
        },
        {
          id: 'q3',
          prompt: 'c) Trung bình mỗi ngọn đồi trồng được bao nhiêu cây xanh?',
          options: ['50 cây', '55 cây', '60 cây', '65 cây'],
          correctAnswer: '60 cây'
        }
      ]
    }
  },
  {
    id: 'pic-17',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Hội Thao Bốn Môn Học Đường: Bội Số 5 & Phân Tích Thống Kê',
    badgeTitle: 'Bài 17 · Độ khó Cấp 5',
    instruction: 'Tổng cộng có 65 học sinh đăng ký tham gia 4 môn hội thao: Bóng đá, Cầu lông, Bơi lội, Cờ vua. Quy ước: Mỗi biểu tượng huy chương 🏅 đại diện cho 5 học sinh.',
    hint: 'Mỗi 🏅 = 5 bạn: Bóng đá 5 hình = 25 bạn; Cầu lông 3 hình = 15 bạn; Bơi lội 2 hình = 10 bạn; Cờ vua 3 hình = 15 bạn. Tổng: 25 + 15 + 10 + 15 = 65 bạn!',
    mascot: { ...BENNY, message: 'Nhớ nhân mỗi biểu tượng với 5 nhé bạn!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🏅 = 5 học sinh',
      multiplier: 5,
      items: [
        { id: 'soccer', label: 'Bóng đá ⚽', icon: '🏅', count: 5, actualValue: 25, unit: 'bạn' },
        { id: 'badminton', label: 'Cầu lông 🏸', icon: '🏅', count: 3, actualValue: 15, unit: 'bạn' },
        { id: 'swimming', label: 'Bơi lội 🏊', icon: '🏅', count: 2, actualValue: 10, unit: 'bạn' },
        { id: 'chess', label: 'Cờ vua ♟️', icon: '🏅', count: 3, actualValue: 15, unit: 'bạn' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Môn Bóng đá có nhiều hơn môn Bơi lội bao nhiêu bạn học sinh?',
          options: ['10 bạn', '12 bạn', '15 bạn', '18 bạn'],
          correctAnswer: '15 bạn'
        },
        {
          id: 'q2',
          prompt: 'b) Hai môn có số lượng học sinh đăng ký bằng nhau là môn nào?',
          options: [
            'Bóng đá và Cầu lông',
            'Cầu lông và Cờ vua',
            'Bơi lội và Cờ vua',
            'Bóng đá và Bơi lội'
          ],
          correctAnswer: 'Cầu lông và Cờ vua'
        },
        {
          id: 'q3',
          prompt: 'c) Cả 4 môn thể thao có tất cả bao nhiêu học sinh đăng ký tham gia?',
          options: ['55 bạn', '60 bạn', '65 bạn', '70 bạn'],
          correctAnswer: '65 bạn'
        }
      ]
    }
  },
  {
    id: 'pic-18',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thám Tử Suy Luận: Truy Tìm Quy Ước Bị Ẩn (Missing Key Multiplier)',
    badgeTitle: 'Bài 18 · Độ khó Cấp 6',
    instruction: 'Bảng khảo sát bóng trong phòng dụng cụ thể dục của trường. Lưu ý: Đề bài KHÔNG cho biết trước 1 biểu tượng 🏀 là bao nhiêu quả! Thầy Mayle cung cấp manh mối: "Tổng số bóng rổ và bóng đá là 40 quả bóng". Em hãy giải mã quy ước và trả lời các câu hỏi.',
    hint: 'Manh mối: Bóng rổ có 3 hình, bóng đá có 5 hình => Tổng là 3 + 5 = 8 hình. Vì 8 hình = 40 quả nên 1 hình 🏀 = 40 : 8 = 5 quả! Khi đó bóng bàn có 4 hình = 4 × 5 = 20 quả.',
    mascot: { ...MAYLE, message: 'Dạng toán suy luận tìm ẩn số quy ước: Hãy lấy tổng số quả chia cho tổng số hình để tìm giá trị 1 hình nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Manh mối: Tổng số bóng rổ (3 hình) và bóng đá (5 hình) là 40 quả',
      multiplier: 5,
      items: [
        { id: 'basketball', label: 'Bóng Rổ 🏀', icon: '🏀', count: 3, actualValue: 15, unit: 'quả' },
        { id: 'soccer', label: 'Bóng Đá ⚽', icon: '🏀', count: 5, actualValue: 25, unit: 'quả' },
        { id: 'volleyball', label: 'Bóng Chuyền 🏐', icon: '🏀', count: 2, actualValue: 10, unit: 'quả' },
        { id: 'pingpong', label: 'Bóng Bàn 🏓', icon: '🏀', count: 4, actualValue: 20, unit: 'quả' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Mỗi biểu tượng bóng 🏀 đại diện cho bao nhiêu quả bóng thật?',
          options: ['4 quả bóng', '5 quả bóng', '6 quả bóng', '8 quả bóng'],
          correctAnswer: '5 quả bóng'
        },
        {
          id: 'q2',
          prompt: 'b) Trong phòng dụng cụ có tất cả bao nhiêu quả bóng bàn?',
          options: ['16 quả', '18 quả', '20 quả', '24 quả'],
          correctAnswer: '20 quả'
        },
        {
          id: 'q3',
          prompt: 'c) Tổng số bóng của cả 4 môn trong phòng thể dục là bao nhiêu quả?',
          options: ['60 quả', '65 quả', '70 quả', '75 quả'],
          correctAnswer: '70 quả'
        }
      ]
    }
  },
  {
    id: 'pic-19',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Bài Toán Chuyển Giao Biểu Tượng (Dạng Toán Cân Bằng Cho - Nhận)',
    badgeTitle: 'Bài 19 · Độ khó Cấp 7',
    instruction: 'Biểu đồ biểu diễn số huy chương thi đấu của 4 đội tuyển. Quy ước: Mỗi huy chương vàng 🏅 đại diện cho 6 huy chương thật. Rồng Lửa có 9 hình (54), Hổ Trắng có 5 hình (30), Đại Bàng có 8 hình (48), Sói Xám có 6 hình (36).',
    hint: 'Rồng Lửa hơn Hổ Trắng: 54 - 30 = 24 huy chương (tương ứng 4 biểu tượng). Để hai đội bằng nhau, Rồng Lửa phải chuyển một nửa số chênh lệch: 4 : 2 = 2 biểu tượng (tức 12 huy chương). Khi đó mỗi đội đều có 7 biểu tượng = 42 huy chương!',
    mascot: { ...CASEY, message: 'Dạng toán chuyển giao: Muốn hai bên bằng nhau, phải lấy hiệu số chia cho 2 đấy bạn!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🏅 = 6 huy chương thật',
      multiplier: 6,
      items: [
        { id: 'dragon', label: 'Đội Rồng Lửa 🔥', icon: '🏅', count: 9, actualValue: 54, unit: 'huy chương' },
        { id: 'tiger', label: 'Đội Hổ Trắng 🐯', icon: '🏅', count: 5, actualValue: 30, unit: 'huy chương' },
        { id: 'eagle', label: 'Đội Đại Bàng 🦅', icon: '🏅', count: 8, actualValue: 48, unit: 'huy chương' },
        { id: 'wolf', label: 'Đội Sói Xám 🐺', icon: '🏅', count: 6, actualValue: 36, unit: 'huy chương' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Đội Rồng Lửa hiện có nhiều hơn Đội Hổ Trắng bao nhiêu huy chương?',
          options: ['18 huy chương', '24 huy chương', '30 huy chương', '36 huy chương'],
          correctAnswer: '24 huy chương'
        },
        {
          id: 'q2',
          prompt: 'b) Đội Rồng Lửa phải chuyển cho Đội Hổ Trắng bao nhiêu biểu tượng 🏅 để số huy chương của hai đội bằng nhau?',
          options: ['1 biểu tượng (6 huy chương)', '2 biểu tượng (12 huy chương)', '3 biểu tượng (18 huy chương)', '4 biểu tượng (24 huy chương)'],
          correctAnswer: '2 biểu tượng (12 huy chương)'
        },
        {
          id: 'q3',
          prompt: 'c) Cần thêm bao nhiêu huy chương cho Đội Sói Xám để vươn lên bằng điểm Đội Đại Bàng?',
          options: ['8 huy chương', '12 huy chương (2 biểu tượng)', '16 huy chương', '18 huy chương'],
          correctAnswer: '12 huy chương (2 biểu tượng)'
        }
      ]
    }
  },
  {
    id: 'pic-20',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Hành Trình 5 Trạm Điểm Bí Mật: Bội Số 6 & Phân Tích Đa Tầng',
    badgeTitle: 'Bài 20 · Độ khó Cấp 8',
    instruction: 'Tổng số điểm nhiệm vụ tích lũy được qua 5 chặng đua là 72 điểm. Quy ước: Mỗi ngôi sao sáng ⭐ đại diện cho 6 điểm nhiệm vụ.',
    hint: 'Mỗi ⭐ = 6 điểm: Trạm 1: 3 × 6 = 18 điểm; Trạm 2: 2 × 6 = 12 điểm; Trạm 3: 2 × 6 = 12 điểm; Trạm 4: 1 × 6 = 6 điểm; Trạm 5: 4 × 6 = 24 điểm. Tổng: 18 + 12 + 12 + 6 + 24 = 72 điểm!',
    mascot: { ...ABBY, message: 'Quan sát các ngôi sao ở 5 trạm và nhân với 6 để trả lời các câu hỏi đa tầng nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi ⭐ = 6 điểm nhiệm vụ',
      multiplier: 6,
      items: [
        { id: 'stage1', label: 'Trạm 1: Khởi động 🌿', icon: '⭐', count: 3, actualValue: 18, unit: 'điểm' },
        { id: 'stage2', label: 'Trạm 2: Vượt dốc ⛰️', icon: '⭐', count: 2, actualValue: 12, unit: 'điểm' },
        { id: 'stage3', label: 'Trạm 3: Giải đố 🦇', icon: '⭐', count: 2, actualValue: 12, unit: 'điểm' },
        { id: 'stage4', label: 'Trạm 4: Cầu khỉ 🌸', icon: '⭐', count: 1, actualValue: 6, unit: 'điểm' },
        { id: 'stage5', label: 'Trạm 5: Về đích 🏰', icon: '⭐', count: 4, actualValue: 24, unit: 'điểm' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Trạm 5 (Về đích) có số điểm gấp mấy lần Trạm 2?',
          options: ['2 lần', '3 lần', '4 lần', '5 lần'],
          correctAnswer: '2 lần'
        },
        {
          id: 'q2',
          prompt: 'b) Hiệu số điểm giữa trạm cao nhất (Trạm 5) và trạm thấp nhất (Trạm 4) là bao nhiêu điểm?',
          options: ['12 điểm', '15 điểm', '18 điểm', '20 điểm'],
          correctAnswer: '18 điểm'
        },
        {
          id: 'q3',
          prompt: 'c) Tổng số điểm đạt được ở cả 5 trạm là bao nhiêu điểm?',
          options: ['60 điểm', '66 điểm', '72 điểm', '78 điểm'],
          correctAnswer: '72 điểm'
        }
      ]
    }
  },
  {
    id: 'pic-21',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tiệm Nước Ép Trái Cây Abby: Biểu Đồ Doanh Thu & Giá Tiền Hai Bước',
    badgeTitle: 'Bài 21 · Độ khó Cấp 9',
    instruction: 'Biểu đồ biểu diễn số ly nước ép Abby đã bán trong ngày hội chợ. Quy ước: Mỗi biểu tượng ly nước 🥤 đại diện cho 8 ly nước thật. Bảng giá: Nước Cam (10.000đ/ly), Dưa Hấu (10.000đ/ly), Táo Đặc Biệt (15.000đ/ly), Cà Rốt (10.000đ/ly).',
    hint: 'Cam: 6 × 8 = 48 ly; Dưa Hấu: 5 × 8 = 40 ly; Táo: 3 × 8 = 24 ly; Cà Rốt: 4 × 8 = 32 ly. Tiền nước ép Táo = 24 ly × 15.000đ = 360.000đ! Trung bình số ly bán được mỗi loại = (48 + 40 + 24 + 32) : 4 = 144 : 4 = 36 ly.',
    mascot: { ...ABBY, message: 'Bài toán kết hợp số lượng từ biểu đồ tranh với đơn giá để tính tổng doanh thu đấy!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Lưu ý quy ước: Mỗi 🥤 = 8 ly nước ép đã bán',
      multiplier: 8,
      items: [
        { id: 'orange_juice', label: 'Nước Ép Cam Tươi (10.000đ) 🍊', icon: '🥤', count: 6, actualValue: 48, unit: 'ly' },
        { id: 'watermelon_juice', label: 'Nước Ép Dưa Hấu (10.000đ) 🍉', icon: '🥤', count: 5, actualValue: 40, unit: 'ly' },
        { id: 'apple_special', label: 'Nước Ép Táo Mật (15.000đ) 🍎', icon: '🥤', count: 3, actualValue: 24, unit: 'ly' },
        { id: 'carrot_juice', label: 'Nước Ép Cà Rốt (10.000đ) 🥕', icon: '🥤', count: 4, actualValue: 32, unit: 'ly' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Quán của Abby đã bán được tổng cộng bao nhiêu ly Nước Ép Cam và Dưa Hấu?',
          options: ['80 ly', '84 ly', '88 ly', '92 ly'],
          correctAnswer: '88 ly'
        },
        {
          id: 'q2',
          prompt: 'b) Tổng số tiền thu được từ việc bán Nước Ép Táo Mật (24 ly giá 15.000đ/ly) là bao nhiêu?',
          options: ['240.000 đồng', '300.000 đồng', '360.000 đồng', '400.000 đồng'],
          correctAnswer: '360.000 đồng'
        },
        {
          id: 'q3',
          prompt: 'c) Trung bình mỗi loại nước ép quán bán được bao nhiêu ly?',
          options: ['32 ly', '36 ly', '40 ly', '44 ly'],
          correctAnswer: '36 ly'
        }
      ]
    }
  },
  {
    id: 'pic-22',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'ĐẠI THỬ THÁCH TRẠM 1: Kho Báu 5 Rương Kim Cương Hoàng Gia',
    badgeTitle: 'Bài 22 · Đỉnh Cao Trạm 1',
    instruction: 'Thử thách tối thượng của Trạm 1! Biểu đồ biểu diễn số viên kim cương trong 5 rương kho báu hoàng gia. Lưu ý quy ước cấp cao: Mỗi viên kim cương xanh 💎 đại diện cho đúng 12 viên kim cương thật.',
    hint: 'Mỗi 💎 = 12 viên. Hoàng Kim (7×12=84); Lam Ngọc (5×12=60); Hồng Ngọc (8×12=96); Lục Bảo (4×12=48); Thạch Anh (6×12=72). Hiệu lớn nhất và nhỏ nhất: 96 - 48 = 48 viên (4 biểu tượng). Tổng cả 5 rương = 360 viên. Chia đều 9 hiệp sĩ: 360 : 9 = 40 viên/người!',
    mascot: { ...MAYLE, message: 'Chúc mừng bạn đã tiến tới bài thi cuối cùng của Trạm 1! Hãy vận dụng toàn bộ tư duy số học để giải mã nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Quy ước tối thượng: Mỗi 💎 = 12 viên kim cương thật',
      multiplier: 12,
      items: [
        { id: 'chest_gold', label: 'Rương Hoàng Kim 👑', icon: '💎', count: 7, actualValue: 84, unit: 'viên' },
        { id: 'chest_sapphire', label: 'Rương Lam Ngọc 🔷', icon: '💎', count: 5, actualValue: 60, unit: 'viên' },
        { id: 'chest_ruby', label: 'Rương Hồng Ngọc 🌹', icon: '💎', count: 8, actualValue: 96, unit: 'viên' },
        { id: 'chest_emerald', label: 'Rương Lục Bảo 🍀', icon: '💎', count: 4, actualValue: 48, unit: 'viên' },
        { id: 'chest_amethyst', label: 'Rương Thạch Anh 🔮', icon: '💎', count: 6, actualValue: 72, unit: 'viên' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Rương chứa nhiều kim cương nhất hơn rương chứa ít kim cương nhất bao nhiêu viên?',
          options: ['36 viên (3 biểu tượng)', '44 viên', '48 viên (4 biểu tượng)', '52 viên'],
          correctAnswer: '48 viên (4 biểu tượng)'
        },
        {
          id: 'q2',
          prompt: 'b) Tổng số kim cương có trong cả 5 rương kho báu là bao nhiêu viên?',
          options: ['320 viên', '340 viên', '360 viên', '380 viên'],
          correctAnswer: '360 viên'
        },
        {
          id: 'q3',
          prompt: 'c) Nếu chia đều toàn bộ số kim cương của cả 5 rương cho 9 hiệp sĩ Spark Math, mỗi người nhận được bao nhiêu viên?',
          options: ['36 viên', '40 viên', '45 viên', '50 viên'],
          correctAnswer: '40 viên'
        },
        {
          id: 'q4',
          prompt: 'd) Cần chuyển từ Rương Hồng Ngọc sang Rương Lục Bảo bao nhiêu biểu tượng 💎 để hai rương có số kim cương bằng nhau?',
          options: ['1 biểu tượng (12 viên)', '2 biểu tượng (24 viên)', '3 biểu tượng (36 viên)', '4 biểu tượng (48 viên)'],
          correctAnswer: '2 biểu tượng (24 viên)'
        }
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
    id: 'vol-preserve-2-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bảo toàn thể tích: Bình cao thon & Bình lùn bè',
    badgeTitle: 'Bài 2.2 · Trang 26',
    instruction: 'Benny đổ toàn bộ nước từ Bình cao thon A sang Bình lùn đáy rộng B mà không làm rơi rớt giọt nào. Hãy quan sát và rút ra kết luận về thể tích nước.',
    hint: 'Vì lượng nước không đổi nên thể tích nước trong Bình A và Bình B là HOÀN TOÀN BẰNG NHAU!',
    mascot: { ...BENNY, message: 'Dù hình dạng bình chứa có khác nhau, nhưng thể tích nước vẫn giữ nguyên đấy!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'tall', label: 'Bình A (Cao thon)', levelPercent: 80, color: '#38bdf8' },
        { id: 'wide', label: 'Bình B (Lùn đáy rộng)', levelPercent: 40, color: '#38bdf8' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) So sánh thể tích nước giữa Bình A và Bình B:',
          options: ['Bình A nhiều hơn', 'Bình B nhiều hơn', 'Bằng nhau', 'Không thể biết'],
          correctAnswer: 'Bằng nhau'
        },
        {
          id: 'q2',
          prompt: 'b) Hình dạng của khối nước có bị biến đổi theo hình dạng của bình chứa không?',
          options: ['Có biến đổi theo bình', 'Giữ nguyên không đổi', 'Biến mất'],
          correctAnswer: 'Có biến đổi theo bình'
        }
      ]
    }
  },
  {
    id: 'vol-scale-3-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đo thể tích nước trong 3 ca có vạch chia Lít',
    badgeTitle: 'Bài 3.1 · Trang 27',
    instruction: 'Ba ca nước A, B, C có các vạch chia đơn vị Lít bằng nhau. Hãy quan sát mực nước và so sánh thể tích giữa các ca.',
    hint: 'Ca A đạt vạch 3L, Ca B đạt vạch 7L, Ca C đạt vạch 5L. Ca B nhiều hơn Ca A: 7 - 3 = 4L!',
    mascot: { ...ABBY, message: 'Nhìn vào các vạch chia số Lít là chúng mình biết ngay mỗi ca có bao nhiêu lít nước!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'A', label: 'Ca A (3 Lít)', levelPercent: 30, color: '#06b6d4' },
        { id: 'B', label: 'Ca B (7 Lít)', levelPercent: 70, color: '#06b6d4' },
        { id: 'C', label: 'Ca C (5 Lít)', levelPercent: 50, color: '#06b6d4' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Ca nước nào chứa thể tích nước LỚN NHẤT?',
          options: ['Ca A', 'Ca B', 'Ca C'],
          correctAnswer: 'Ca B'
        },
        {
          id: 'q2',
          prompt: 'b) Ca B chứa nhiều hơn Ca A bao nhiêu lít nước?',
          options: ['3 Lít', '4 Lít', '5 Lít', '6 Lít'],
          correctAnswer: '4 Lít'
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
    id: 'vol-depth-4-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bể nước cùng đáy nhưng khác chiều cao mực nước',
    badgeTitle: 'Bài 4.2 · Trang 28',
    instruction: 'Ba bể nước X, Y, Z có kích thước mặt đáy hoàn toàn bằng nhau. Hãy quan sát chiều cao của mực nước và so sánh thể tích nước trong 3 bể.',
    hint: 'Khi đáy bể bằng nhau, bể nào có mực nước cao nhất thì chứa nhiều nước nhất: Bể Y (8 vạch) > Bể Z (6 vạch) > Bể X (4 vạch)!',
    mascot: { ...ABBY, message: 'Đáy bể bằng nhau thì nhìn chiều cao mực nước là biết ngay bể nào nhiều hơn!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'X', label: 'Bể X (4 vạch)', levelPercent: 40, color: '#0284c7' },
        { id: 'Y', label: 'Bể Y (8 vạch - Cao nhất)', levelPercent: 80, color: '#0284c7' },
        { id: 'Z', label: 'Bể Z (6 vạch)', levelPercent: 60, color: '#0284c7' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Bể nước có thể tích nước LỚN NHẤT là:',
          options: ['Bể X', 'Bể Y', 'Bể Z'],
          correctAnswer: 'Bể Y'
        },
        {
          id: 'q2',
          prompt: 'b) Bể nước có thể tích nước NHỎ NHẤT là:',
          options: ['Bể X', 'Bể Y', 'Bể Z'],
          correctAnswer: 'Bể X'
        }
      ]
    }
  },
  {
    id: 'vol-cups-5-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đong dung tích bình nước bằng cốc tiêu chuẩn',
    badgeTitle: 'Bài 5.1 · Trang 29',
    instruction: 'Abby đong nước từ 3 bình nước quả ra các cốc tiêu chuẩn cùng kích thước. Bình Trà Đào rót được 4 cốc. Bình Trà Sữa rót được 7 cốc. Bình Trà Chanh rót được 5 cốc.',
    hint: 'Bình Trà Sữa rót được 7 cốc (nhiều nhất). Bình Trà Sữa hơn Bình Trà Đào: 7 - 4 = 3 cốc!',
    mascot: { ...BENNY, message: 'Đong ra cốc giúp ta đo lường dung tích các bình chứa một cách dễ dàng!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'peach', label: 'Trà Đào (4 cốc)', levelPercent: 40, color: '#fb923c' },
        { id: 'milk', label: 'Trà Sữa (7 cốc)', levelPercent: 70, color: '#d97706' },
        { id: 'lemon', label: 'Trà Chanh (5 cốc)', levelPercent: 50, color: '#facc15' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Bình nước nào có dung tích LỚN NHẤT?',
          options: ['Bình Trà Đào', 'Bình Trà Sữa', 'Bình Trà Chanh'],
          correctAnswer: 'Bình Trà Sữa'
        },
        {
          id: 'q2',
          prompt: 'b) Bình Trà Sữa chứa nhiều hơn Bình Trà Đào bao nhiêu cốc?',
          options: ['2 cốc', '3 cốc', '4 cốc', '5 cốc'],
          correctAnswer: '3 cốc'
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
    id: 'vol-bucket-6-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thể tích xô nước và ấm đun nước (Đo bằng bình 2 Lít)',
    badgeTitle: 'Bài 6.2 · Trang 31',
    instruction: 'Nước từ Xô đổ đầy được 4 can 2 Lít. Nước từ Ấm đổ đầy được 2 can 2 Lít. Lưu ý: Mỗi can thể hiện 2 Lít nước.',
    hint: 'Xô nước = 4 can × 2L = 8 Lít. Ấm nước = 2 can × 2L = 4 Lít. Xô nhiều hơn ấm: 8 - 4 = 4 Lít!',
    mascot: { ...MAYLE, message: 'Nhớ nhân với 2 nhé vì mỗi can chứa được 2 Lít nước!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '1 Can 🪣 = 2 Lít nước',
      multiplier: 2,
      items: [
        { id: 'bucket', label: 'Xô Nước Lớn', icon: '🪣', count: 4, actualValue: 8, unit: 'L' },
        { id: 'kettle', label: 'Ấm Đun Nước', icon: '🫖', count: 2, actualValue: 4, unit: 'L' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'a) Xô nước chứa được tất cả bao nhiêu lít nước?',
          options: ['6 lít', '8 lít', '10 lít', '12 lít'],
          correctAnswer: '8 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Xô nước chứa nhiều hơn ấm nước bao nhiêu lít?',
          options: ['2 lít', '4 lít', '6 lít', '8 lít'],
          correctAnswer: '4 lít'
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
  {
    id: 'vol-bar-11',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ đồ đoạn thẳng 3 thùng nước A, B, C',
    badgeTitle: 'Bài 11 · Trang 36',
    instruction: 'Thùng A chứa 12L nước. Thùng B chứa nhiều hơn Thùng A 6L nước. Thùng C có lượng nước bằng Thùng A. Hỏi cả 3 thùng chứa tất cả bao nhiêu lít nước?',
    hint: 'Thùng B = 12 + 6 = 18L. Thùng C = 12L. Tổng cả 3 thùng = 12 + 18 + 12 = 42L!',
    mascot: { ...MAYLE, message: 'Dùng sơ đồ 3 đoạn thẳng giúp chúng mình giải quyết bài toán nhiều đối tượng rất dễ dàng!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Thùng A 🪣', lengthVal: 12, display: '12 L', color: 'bg-sky-500' },
        {
          label: 'Thùng B 🪣',
          lengthVal: 18,
          display: '18 L',
          parts: [
            { val: 12, label: '12 L' },
            { val: 6, label: '+6 L' }
          ],
          color: 'bg-emerald-500'
        },
        { label: 'Thùng C 🪣', lengthVal: 12, display: '12 L', color: 'bg-indigo-500' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Thùng B chứa bao nhiêu lít nước?',
          options: ['16 lít', '18 lít', '20 lít', '22 lít'],
          correctAnswer: '18 lít'
        },
        {
          id: 'q2',
          prompt: 'b) Cả 3 thùng chứa tất cả bao nhiêu lít nước?',
          options: ['36 lít', '40 lít', '42 lít', '44 lít'],
          correctAnswer: '42 lít'
        }
      ]
    }
  },
  {
    id: 'vol-12',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'San Sẻ Cân Bằng: Rót nước giữa hai bình',
    badgeTitle: 'Bài 12 · Độ khó Cấp 1',
    instruction: 'Bình A có 28 Lít nước ép táo. Bình B có 16 Lít nước ép dứa. Hỏi phải rót từ Bình A sang Bình B bao nhiêu lít nước để hai bình có thể tích bằng nhau?',
    hint: 'Tổng số nước của 2 bình: 28 + 16 = 44 Lít. Khi bằng nhau, mỗi bình sẽ có: 44 : 2 = 22 Lít. Vậy số nước cần rót từ Bình A sang Bình B là: 28 - 22 = 6 Lít (hoặc lấy chênh lệch (28 - 16) : 2 = 6 Lít)!',
    mascot: { ...BENNY, message: 'Bài toán san sẻ nước: Tổng lượng nước của cả hai bình luôn luôn không đổi bạn nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'A', label: 'Bình A (Táo)', levelPercent: 70, color: '#f97316', subLabel: '28 Lít' },
        { id: 'B', label: 'Bình B (Dứa)', levelPercent: 40, color: '#eab308', subLabel: '16 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Tổng số lít nước ép của cả hai bình là bao nhiêu?',
          options: ['40 Lít', '42 Lít', '44 Lít', '46 Lít'],
          correctAnswer: '44 Lít'
        },
        {
          id: 'q2',
          prompt: 'b) Khi hai bình bằng nhau, mỗi bình sẽ có bao nhiêu lít nước?',
          options: ['20 Lít', '22 Lít', '24 Lít', '26 Lít'],
          correctAnswer: '22 Lít'
        },
        {
          id: 'q3',
          prompt: 'c) Cần rót từ Bình A sang Bình B bao nhiêu lít nước để hai bình bằng nhau?',
          options: ['4 Lít', '5 Lít', '6 Lít', '8 Lít'],
          correctAnswer: '6 Lít'
        }
      ]
    }
  },
  {
    id: 'vol-13',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Đoạn Thẳng: Tổng và Tỉ số thể tích',
    badgeTitle: 'Bài 13 · Độ khó Cấp 2',
    instruction: 'Bình nước cam và Bình nước chanh có tổng cộng 36 Lít. Biết thể tích bình nước cam gấp 3 lần thể tích bình nước chanh. Tìm thể tích nước của mỗi bình.',
    hint: 'Nước chanh là 1 phần, Nước cam là 3 phần. Tổng số phần bằng nhau: 1 + 3 = 4 phần. Giá trị 1 phần (Nước chanh): 36 : 4 = 9 Lít. Nước cam: 9 × 3 = 27 Lít!',
    mascot: { ...ABBY, message: 'Nhìn sơ đồ đoạn thẳng: Nước cam vẽ 3 đoạn, nước chanh vẽ 1 đoạn, tổng là 4 đoạn bằng nhau!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Nước Chanh 🍋 (1 phần)', lengthVal: 9, display: '9 L', color: 'bg-amber-400' },
        {
          label: 'Nước Cam 🍊 (3 phần)',
          lengthVal: 27,
          display: '27 L',
          parts: [
            { val: 9, label: '9 L' },
            { val: 9, label: '9 L' },
            { val: 9, label: '9 L' }
          ],
          color: 'bg-orange-500'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Tổng số phần bằng nhau của nước cam và nước chanh là bao nhiêu?',
          options: ['3 phần', '4 phần', '5 phần', '6 phần'],
          correctAnswer: '4 phần'
        },
        {
          id: 'q2',
          prompt: 'b) Bình nước chanh chứa bao nhiêu lít nước?',
          options: ['8 Lít', '9 Lít', '10 Lít', '12 Lít'],
          correctAnswer: '9 Lít'
        },
        {
          id: 'q3',
          prompt: 'c) Bình nước cam chứa bao nhiêu lít nước?',
          options: ['24 Lít', '27 Lít', '30 Lít', '32 Lít'],
          correctAnswer: '27 Lít'
        }
      ]
    }
  },
  {
    id: 'vol-14',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thực Nghiệm Archimedes: Đo thể tích viên đá phong thủy',
    badgeTitle: 'Bài 14 · Độ khó Cấp 3',
    instruction: 'Một bình đo vạch chứa 300 mL nước sạch. Benny nhẹ nhàng thả một viên đá thạch anh chìm hoàn toàn vào bình nước. Mực nước dâng lên tới vạch 480 mL. Hãy tìm thể tích của viên đá.',
    hint: 'Thể tích của viên đá chìm chính là phần thể tích nước dâng thêm: 480 - 300 = 180 mL!',
    mascot: { ...BENNY, message: 'Khi vật chìm trong nước, nó chiếm chỗ và đẩy nước dâng lên đúng bằng thể tích của chính nó!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'before', label: 'Trước khi thả đá', levelPercent: 50, color: '#38bdf8', subLabel: '300 mL' },
        { id: 'after', label: 'Sau khi thả đá 💎', levelPercent: 80, color: '#0284c7', subLabel: '480 mL' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Mực nước trong bình đã dâng lên thêm bao nhiêu mL?',
          options: ['120 mL', '150 mL', '180 mL', '200 mL'],
          correctAnswer: '180 mL'
        },
        {
          id: 'q2',
          prompt: 'b) Thể tích của viên đá thạch anh là bao nhiêu?',
          options: ['180 mL', '300 mL', '480 mL', '780 mL'],
          correctAnswer: '180 mL'
        }
      ]
    }
  },
  {
    id: 'vol-15',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đo Thể Tích Đa Vật Thể: Ba viên bi sắt cùng cỡ',
    badgeTitle: 'Bài 15 · Độ khó Cấp 4',
    instruction: 'Một ca đo có sẵn 500 mL nước. Casey thả 3 viên bi sắt có kích thước hoàn toàn bằng nhau vào trong ca, làm nước dâng lên vạch 680 mL. Tính thể tích của mỗi viên bi sắt.',
    hint: 'Tổng thể tích 3 viên bi sắt = Nước dâng = 680 - 500 = 180 mL. Vì 3 viên bi bằng nhau nên mỗi viên có thể tích là: 180 : 3 = 60 mL!',
    mascot: { ...CASEY, message: 'Nhớ tính tổng lượng dâng lên trước, sau đó chia đều cho 3 viên bi nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'initial', label: 'Ca ban đầu', levelPercent: 50, color: '#06b6d4', subLabel: '500 mL' },
        { id: 'withBalls', label: 'Thả 3 bi sắt ⚪⚪⚪', levelPercent: 68, color: '#0891b2', subLabel: '680 mL' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Cả 3 viên bi sắt chiếm thể tích tổng cộng là bao nhiêu?',
          options: ['150 mL', '160 mL', '180 mL', '200 mL'],
          correctAnswer: '180 mL'
        },
        {
          id: 'q2',
          prompt: 'b) Thể tích của MỖI VIÊN BI SẮT là bao nhiêu mL?',
          options: ['50 mL', '60 mL', '70 mL', '80 mL'],
          correctAnswer: '60 mL'
        }
      ]
    }
  },
  {
    id: 'vol-16',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Đoạn Thẳng: Hiệu và Tỉ số thể tích bể cá',
    badgeTitle: 'Bài 16 · Độ khó Cấp 5',
    instruction: 'Bể cá nhà bạn Benny chứa nhiều hơn bể cá nhà bạn Rory 45 Lít nước. Biết thể tích bể cá của Benny gấp 4 lần thể tích bể cá của Rory. Hỏi mỗi bể chứa bao nhiêu lít nước?',
    hint: 'Bể Benny 4 phần, Bể Rory 1 phần. Hiệu số phần bằng nhau: 4 - 1 = 3 phần. Giá trị 1 phần (Bể Rory): 45 : 3 = 15 Lít. Bể Benny: 15 × 4 = 60 Lít. Tổng cả 2 bể: 60 + 15 = 75 Lít!',
    mascot: { ...MAYLE, message: 'Bài toán Hiệu - Tỉ: Hãy tìm hiệu số phần trước: 4 phần trừ 1 phần bằng 3 phần tương ứng 45L!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể Rory 🐻 (1 phần)', lengthVal: 15, display: '15 L', color: 'bg-emerald-500' },
        {
          label: 'Bể Benny 🐵 (4 phần)',
          lengthVal: 60,
          display: '60 L',
          parts: [
            { val: 15, label: '15 L' },
            { val: 45, label: '+45 L (Hiệu)' }
          ],
          color: 'bg-blue-600'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Hiệu số phần bằng nhau giữa 2 bể là bao nhiêu phần?',
          options: ['2 phần', '3 phần', '4 phần', '5 phần'],
          correctAnswer: '3 phần'
        },
        {
          id: 'q2',
          prompt: 'b) Bể cá nhà Rory chứa bao nhiêu lít nước?',
          options: ['12 Lít', '15 Lít', '18 Lít', '20 Lít'],
          correctAnswer: '15 Lít'
        },
        {
          id: 'q3',
          prompt: 'c) Bể cá nhà Benny chứa bao nhiêu lít nước?',
          options: ['50 Lít', '55 Lít', '60 Lít', '65 Lít'],
          correctAnswer: '60 Lít'
        },
        {
          id: 'q4',
          prompt: 'd) Cả hai bể cá chứa tổng cộng bao nhiêu lít nước?',
          options: ['70 Lít', '75 Lít', '80 Lít', '85 Lít'],
          correctAnswer: '75 Lít'
        }
      ]
    }
  },
  {
    id: 'vol-17',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'San Sẻ 3 Bình Nước: Đưa về trạng thái cân bằng',
    badgeTitle: 'Bài 17 · Độ khó Cấp 6',
    instruction: 'Có ba bình nước: Bình A có 14 Lít, Bình B có 24 Lít, Bình C có 34 Lít. Hỏi cần chuyển nước như thế nào để cả ba bình có số lít nước bằng nhau mà không làm đổ giọt nào?',
    hint: 'Tổng 3 bình: 14 + 24 + 34 = 72 Lít. Khi 3 bình bằng nhau, mỗi bình sẽ có: 72 : 3 = 24 Lít. Ta thấy Bình B đã có đúng 24 Lít (giữ nguyên). Bình C thừa 34 - 24 = 10 Lít. Rót 10 Lít từ Bình C sang Bình A (14 + 10 = 24 Lít) là xong!',
    mascot: { ...ABBY, message: 'Tìm số trung bình của cả 3 bình trước: 72 chia cho 3 bằng 24 Lít!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'A', label: 'Bình A', levelPercent: 35, color: '#38bdf8', subLabel: '14 Lít' },
        { id: 'B', label: 'Bình B', levelPercent: 60, color: '#38bdf8', subLabel: '24 Lít' },
        { id: 'C', label: 'Bình C', levelPercent: 85, color: '#38bdf8', subLabel: '34 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Tổng thể tích nước trong cả ba bình là bao nhiêu?',
          options: ['68 Lít', '70 Lít', '72 Lít', '74 Lít'],
          correctAnswer: '72 Lít'
        },
        {
          id: 'q2',
          prompt: 'b) Khi ba bình bằng nhau, mỗi bình sẽ có bao nhiêu lít nước?',
          options: ['22 Lít', '24 Lít', '26 Lít', '28 Lít'],
          correctAnswer: '24 Lít'
        },
        {
          id: 'q3',
          prompt: 'c) Cách san sẻ nước chính xác và nhanh nhất là gì?',
          options: [
            'Rót từ Bình C sang Bình A 10 Lít',
            'Rót từ Bình B sang Bình A 5 Lít',
            'Rót từ Bình C sang Bình B 6 Lít',
            'Rót từ Bình A sang Bình C 10 Lít'
          ],
          correctAnswer: 'Rót từ Bình C sang Bình A 10 Lít'
        }
      ]
    }
  },
  {
    id: 'vol-18',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Vòi Nước Đơn: Tính thời gian đổ đầy bể chứa',
    badgeTitle: 'Bài 18 · Độ khó Cấp 7',
    instruction: 'Một bể nước có dung tích 150 Lít, hiện tại trong bể đang có sẵn 30 Lít nước. Người ta mở một vòi nước chảy vào bể với lưu lượng 20 Lít mỗi phút. Hỏi sau bao nhiêu phút thì bể sẽ đầy nước?',
    hint: 'Lượng nước cần chảy thêm để đầy bể: 150 - 30 = 120 Lít. Mỗi phút vòi chảy 20 Lít, vậy thời gian cần là: 120 : 20 = 6 phút!',
    mascot: { ...CASEY, message: 'Lấy lượng nước còn thiếu chia cho tốc độ chảy mỗi phút là ra thời gian nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'current', label: 'Nước có sẵn 💧', levelPercent: 20, color: '#67e8f9', subLabel: '30 Lít' },
        { id: 'needed', label: 'Lượng cần thêm 🚰', levelPercent: 80, color: '#0891b2', subLabel: '120 Lít' },
        { id: 'full', label: 'Dung tích đầy bể', levelPercent: 100, color: '#0369a1', subLabel: '150 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Bể cần thêm bao nhiêu lít nước nữa để đầy hoàn toàn?',
          options: ['110 Lít', '120 Lít', '130 Lít', '140 Lít'],
          correctAnswer: '120 Lít'
        },
        {
          id: 'q2',
          prompt: 'b) Sau bao nhiêu phút vòi nước sẽ chảy đầy bể?',
          options: ['5 phút', '6 phút', '7 phút', '8 phút'],
          correctAnswer: '6 phút'
        }
      ]
    }
  },
  {
    id: 'vol-19',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Hai Vòi Cùng Chảy: Hiệp đồng lưu lượng đổ đầy bể rỗng',
    badgeTitle: 'Bài 19 · Độ khó Cấp 8',
    instruction: 'Một bể rỗng có dung tích 240 Lít. Có hai vòi nước cùng chảy vào bể: Vòi thứ nhất chảy 18 Lít mỗi phút, Vòi thứ hai chảy 22 Lít mỗi phút. Nếu mở cả hai vòi cùng một lúc, hỏi sau bao lâu thì bể đầy nước?',
    hint: 'Trong 1 phút, cả hai vòi cùng chảy được: 18 + 22 = 40 Lít. Thời gian để cả 2 vòi đổ đầy bể 240 Lít là: 240 : 40 = 6 phút!',
    mascot: { ...BENNY, message: 'Cả hai vòi cùng chảy thì chúng mình cộng lưu lượng của hai vòi lại với nhau!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'v1', label: 'Vòi 1 (1 phút) 🚰', levelPercent: 45, color: '#38bdf8', subLabel: '18 Lít/phút' },
        { id: 'v2', label: 'Vòi 2 (1 phút) 🚰', levelPercent: 55, color: '#6366f1', subLabel: '22 Lít/phút' },
        { id: 'tank', label: 'Bể nước lớn 🌊', levelPercent: 100, color: '#0284c7', subLabel: '240 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Trong 1 phút, cả hai vòi chảy vào bể được bao nhiêu lít nước?',
          options: ['38 Lít', '40 Lít', '42 Lít', '44 Lít'],
          correctAnswer: '40 Lít'
        },
        {
          id: 'q2',
          prompt: 'b) Sau bao nhiêu phút thì cả hai vòi đổ đầy bể 240 Lít?',
          options: ['5 phút', '6 phút', '7 phút', '8 phút'],
          correctAnswer: '6 phút'
        },
        {
          id: 'q3',
          prompt: 'c) Khi bể vừa đầy, riêng Vòi thứ nhất đã chảy được bao nhiêu lít nước?',
          options: ['90 Lít', '108 Lít', '120 Lít', '132 Lít'],
          correctAnswer: '108 Lít'
        }
      ]
    }
  },
  {
    id: 'vol-20',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Vòi Bơm & Lỗ Rò Rỉ: Bài toán lưu lượng ròng',
    badgeTitle: 'Bài 20 · Độ khó Cấp 9',
    instruction: 'Một bồn chứa nước sạch có dung tích 200 Lít đang cạn rỗng. Người ta mở máy bơm nước vào bồn với tốc độ 30 Lít/phút. Tuy nhiên ở đáy bồn có một van xả rò rỉ làm thất thoát 5 Lít/phút. Hỏi sau bao nhiêu phút bồn nước sẽ đầy?',
    hint: 'Mỗi phút bơm vào 30L nhưng rò rỉ mất 5L, nên lượng nước thực tế đọng lại trong bồn mỗi phút là: 30 - 5 = 25 Lít. Thời gian để bồn đầy 200 Lít là: 200 : 25 = 8 phút!',
    mascot: { ...MAYLE, message: 'Lưu lượng ròng = Lượng nước bơm vào TRỪ Lượng nước rò rỉ thất thoát!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'in', label: 'Vòi bơm vào 📥', levelPercent: 75, color: '#10b981', subLabel: '30 Lít/phút' },
        { id: 'out', label: 'Lỗ rò rỉ đáy 📤', levelPercent: 20, color: '#f43f5e', subLabel: '5 Lít/phút' },
        { id: 'tank', label: 'Bồn chứa 200L 🛢️', levelPercent: 100, color: '#0ea5e9', subLabel: '200 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Sau mỗi phút, lượng nước thực tế tăng thêm trong bồn là bao nhiêu?',
          options: ['20 Lít', '25 Lít', '30 Lít', '35 Lít'],
          correctAnswer: '25 Lít'
        },
        {
          id: 'q2',
          prompt: 'b) Sau bao nhiêu phút thì bồn chứa 200 Lít sẽ đầy nước?',
          options: ['6 phút', '7 phút', '8 phút', '9 phút'],
          correctAnswer: '8 phút'
        },
        {
          id: 'q3',
          prompt: 'c) Khi bồn đầy, tổng lượng nước đã bị rò rỉ ra ngoài là bao nhiêu?',
          options: ['30 Lít', '35 Lít', '40 Lít', '45 Lít'],
          correctAnswer: '40 Lít'
        }
      ]
    }
  },
  {
    id: 'vol-21',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đại Thử Thách Trạm Nước Thần: Hệ thống bể liên hoàn',
    badgeTitle: 'Bài 21 · Thử Thách Tối Thượng',
    instruction: 'Tại Tháp Nước Thần, Thầy Mayle giao nhiệm vụ cho đội thám hiểm: Một bể thủy tinh đang chứa 1000 mL nước. Khi nhúng khối kim cương thần, mực nước dâng lên 1450 mL. Tiếp đó, nước được chia theo tỉ lệ vào hai bình dự trữ A và B, trong đó Bình A gấp 2 lần Bình B. Hãy giải quyết chuỗi 4 câu hỏi tư duy tối thượng!',
    hint: '1) Thể tích kim cương = 1450 - 1000 = 450 mL. 2) Chia 450 mL thành 3 phần bằng nhau (1 + 2 = 3): Mỗi phần = 450 : 3 = 150 mL. Bình B = 150 mL, Bình A = 300 mL. 3) Bơm nước với vòi 50 mL/phút vào bình A cần 300 : 50 = 6 phút!',
    mascot: { ...MAYLE, message: 'Chúc mừng bạn đã tiến tới thử thách đỉnh cao của Trạm Thể Tích & Lít! Vận dụng toàn bộ tư duy nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'b0', label: 'Bể nước đầu 💧', levelPercent: 50, color: '#38bdf8', subLabel: '1000 mL' },
        { id: 'b1', label: 'Nhúng Kim Cương 💎', levelPercent: 72, color: '#0284c7', subLabel: '1450 mL' },
        { id: 'bA', label: 'Bình dự trữ A (2/3)', levelPercent: 60, color: '#8b5cf6', subLabel: '300 mL' },
        { id: 'bB', label: 'Bình dự trữ B (1/3)', levelPercent: 30, color: '#a855f7', subLabel: '150 mL' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'a) Thể tích của khối kim cương thần là bao nhiêu mL?',
          options: ['400 mL', '450 mL', '500 mL', '550 mL'],
          correctAnswer: '450 mL'
        },
        {
          id: 'q2',
          prompt: 'b) Khi chia 450 mL cho Bình A và Bình B (A gấp đôi B), Bình B có bao nhiêu mL?',
          options: ['120 mL', '150 mL', '180 mL', '200 mL'],
          correctAnswer: '150 mL'
        },
        {
          id: 'q3',
          prompt: 'c) Thể tích nước chia vào Bình dự trữ A là bao nhiêu mL?',
          options: ['250 mL', '300 mL', '350 mL', '400 mL'],
          correctAnswer: '300 mL'
        },
        {
          id: 'q4',
          prompt: 'd) Nếu dùng một vòi rót 50 mL mỗi phút, mất bao lâu để rót đầy lượng nước 300 mL vào Bình A?',
          options: ['5 phút', '6 phút', '7 phút', '8 phút'],
          correctAnswer: '6 phút'
        }
      ]
    }
  },

  // ==========================================
  // TRẠM 3: SUDOKU & MA TRẬN SỐ (Trang 45 - Trang 52)
  // ==========================================
  {
    id: 'sud-warmup-1',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Khởi động Sudoku 4x4 Động Vật Dễ Thương',
    badgeTitle: 'Bài Khởi Động 0.1 · Trang 46',
    instruction: 'Mỗi hàng, mỗi cột và mỗi khối 2x2 đều phải có đủ 4 bạn nhỏ: 🐰 Thỏ Abby, 🐵 Khỉ Benny, 🐹 Chuột Casey, 🐻 Gấu Rory.',
    hint: 'Nhìn vào hàng hoặc khối 2x2 chỉ còn trống đúng 1 ô để điền bạn còn thiếu vào nhé!',
    mascot: { ...CASEY, message: 'Chào mừng bạn đến với Thung Lũng Sudoku! Cùng khởi động với các bạn nhỏ nào!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'rabbit', icon: '🐰', name: 'Thỏ Abby' },
        { id: 'monkey', icon: '🐵', name: 'Khỉ Benny' },
        { id: 'mouse', icon: '🐹', name: 'Chuột Casey' },
        { id: 'bear', icon: '🐻', name: 'Gấu Rory' }
      ],
      initialGrid: [
        ['rabbit', 'monkey', null, 'bear'],
        ['mouse', 'bear', 'rabbit', null],
        ['monkey', 'mouse', 'bear', null],
        ['bear', null, 'monkey', 'mouse']
      ],
      solution: [
        ['rabbit', 'monkey', 'mouse', 'bear'],
        ['mouse', 'bear', 'rabbit', 'monkey'],
        ['monkey', 'mouse', 'bear', 'rabbit'],
        ['bear', 'rabbit', 'monkey', 'mouse']
      ]
    }
  },
  {
    id: 'sud-warmup-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Khởi động Sudoku 4x4 Hoa Quả Rực Rỡ',
    badgeTitle: 'Bài Khởi Động 0.2 · Trang 46',
    instruction: 'Điền các loại quả còn thiếu vào ô trống sao cho mỗi hàng, cột và khối 2x2 có đủ: 🍎 Táo, 🍌 Chuối, 🍓 Dâu tây, 🍇 Nho.',
    hint: 'Hàng 1 đã có Táo, Chuối, Dâu -> chỉ còn thiếu Nho!',
    mascot: { ...BENNY, message: 'Khởi động nhẹ nhàng với vườn hoa quả ngọt ngào trước khi bước vào các thử thách lớn!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'apple', icon: '🍎', name: 'Táo' },
        { id: 'banana', icon: '🍌', name: 'Chuối' },
        { id: 'berry', icon: '🍓', name: 'Dâu Tây' },
        { id: 'grape', icon: '🍇', name: 'Nho' }
      ],
      initialGrid: [
        ['apple', 'banana', 'berry', null],
        [null, 'grape', 'apple', 'banana'],
        ['banana', 'apple', null, 'berry'],
        ['grape', null, 'banana', 'apple']
      ],
      solution: [
        ['apple', 'banana', 'berry', 'grape'],
        ['berry', 'grape', 'apple', 'banana'],
        ['banana', 'apple', 'grape', 'berry'],
        ['grape', 'berry', 'banana', 'apple']
      ]
    }
  },
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
        ['heart', null, null, null]
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
      colorBlocks: [
        ['bg-rose-100', 'bg-rose-100', 'bg-sky-100', 'bg-sky-100'],
        ['bg-amber-100', 'bg-amber-100', 'bg-emerald-100', 'bg-emerald-100'],
        ['bg-sky-100', 'bg-sky-100', 'bg-rose-100', 'bg-rose-100'],
        ['bg-emerald-100', 'bg-emerald-100', 'bg-amber-100', 'bg-amber-100']
      ],
      sumLabels: [
        [7, null, 3, null],
        [3, null, 7, null],
        [7, null, 3, null],
        [3, null, 7, null]
      ],
      initialGrid: [
        [null, 4, null, 2],
        [1, null, null, null],
        [null, null, 2, null],
        [2, null, null, 3]
      ],
      solution: [
        [3, 4, 1, 2],
        [1, 2, 3, 4],
        [4, 3, 2, 1],
        [2, 1, 4, 3]
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
    badgeTitle: 'Bài 5.1 · Trang 51',
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
    badgeTitle: 'Bài 5.2 · Trang 51',
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
  {
    id: 'sud-15',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận phép tính cộng hai chiều liên hoàn',
    badgeTitle: 'Bài Nâng Cao 7.1 · Trang 52+',
    instruction: 'Điền các số còn thiếu vào ô trống sao cho đúng cả phép cộng hàng ngang (A + B = C) và phép cộng cột dọc (A + D = G)!',
    hint: 'Hàng 1: 4 + ? = 10 => 6. Hàng 2: 3 + 5 = 8. Cột 1: 4 + 3 = 7!',
    mascot: { ...CASEY, message: 'Thử thách hai chiều: vừa kiểm tra hàng ngang vừa kiểm tra cột dọc nhé!' },
    activity: {
      type: 'numberMatrix',
      title: 'MA TRẬN HAI CHIỀU A + B = C',
      subtitle: 'Hàng ngang: Ô 1 + Ô 2 = Ô 3 | Cột dọc: Ô trên + Ô giữa = Ô dưới',
      allowedNumbers: [3, 4, 5, 6, 7, 8, 10, 11, 18],
      hintFormula: '4+6=10 | 3+5=8 | 7+11=18',
      initialGrid: [
        [4, null, 10],
        [3, 5, null],
        [null, 11, 18]
      ],
      solution: [
        [4, 6, 10],
        [3, 5, 8],
        [7, 11, 18]
      ]
    }
  },
  {
    id: 'sud-16',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận phép nhân bảng số học 3x3',
    badgeTitle: 'Bài Nâng Cao 7.2 · Trang 52+',
    instruction: 'Mỗi hàng ngang trong ma trận là một phép nhân số học: Ô thứ nhất × Ô thứ hai = Ô thứ ba. Hãy điền số thích hợp!',
    hint: 'Hàng 1: 3 × ? = 12 => Số cần điền là 4. Hàng 2: 5 × 6 = 30. Hàng 3: ? × 8 = 56 => Số 7!',
    mascot: { ...BENNY, message: 'Nhân nhẩm thật chuẩn xác để tìm ra các ô trống nào!' },
    activity: {
      type: 'numberMatrix',
      title: 'MA TRẬN PHÉP NHÂN A × B = C',
      subtitle: 'Tìm các số còn thiếu theo hàng: Ô thứ nhất × Ô thứ hai = Ô thứ ba',
      allowedNumbers: [3, 4, 5, 6, 7, 8, 12, 30, 56],
      hintFormula: '3 × 4 = 12 | 5 × 6 = 30 | 7 × 8 = 56',
      initialGrid: [
        [3, null, 12],
        [5, 6, null],
        [null, 8, 56]
      ],
      solution: [
        [3, 4, 12],
        [5, 6, 30],
        [7, 8, 56]
      ]
    }
  },
  {
    id: 'sud-17',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Magic Square 3x3 (Tổng = 18)',
    badgeTitle: 'Bài Nâng Cao 8.1 · Trang 52+',
    instruction: 'Điền các số từ 2 đến 10 vào ô trống sao cho tổng các số trên mỗi hàng, mỗi cột và 2 đường chéo đều đúng bằng 18!',
    hint: 'Số chính giữa là 6! Hàng 1: 9 + ? + 7 = 18 => Cần điền số 2. Hàng 2: 4 + 6 + ? = 18 => Cần điền số 8!',
    mascot: { ...MAYLE, message: 'Mỗi hàng và mỗi cột đều cộng lại bằng 18, em hãy kiểm tra từng hàng nhé!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ô VUÔNG MA THUẬT (MAGIC SQUARE TỔNG 18)',
      subtitle: 'Điền số từ 2 đến 10 sao cho tổng mỗi hàng và mỗi cột đều bằng 18',
      targetSum: 18,
      allowedNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      initialGrid: [
        [9, null, 7],
        [null, 6, null],
        [5, null, 3]
      ],
      solution: [
        [9, 2, 7],
        [4, 6, 8],
        [5, 10, 3]
      ]
    }
  },
  {
    id: 'sud-18',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku 4x4: Chuồng tổng liên hoàn',
    badgeTitle: 'Bài Nâng Cao 8.2 · Trang 52+',
    instruction: 'Điền các số từ 1 đến 4. Mỗi hàng và cột có đủ 1-4 không trùng lặp. Tổng các số trong mỗi khung màu phải bằng con số nhỏ ở góc!',
    hint: 'Khung màu cam có tổng = 3 gồm 1 và 2 (1+2=3). Khung màu xanh ngọc có tổng = 7 gồm 3 và 4 (3+4=7)!',
    mascot: { ...ABBY, message: 'Killer Sudoku kết hợp tính nhẩm siêu tốc và tư duy Sudoku đỉnh cao!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      colorBlocks: [
        ['bg-rose-100', 'bg-rose-100', 'bg-sky-100', 'bg-sky-100'],
        ['bg-emerald-100', 'bg-amber-100', 'bg-amber-100', 'bg-purple-100'],
        ['bg-emerald-100', 'bg-teal-100', 'bg-teal-100', 'bg-purple-100'],
        ['bg-yellow-100', 'bg-yellow-100', 'bg-indigo-100', 'bg-indigo-100']
      ],
      sumLabels: [
        [5, null, 5, null],
        [5, 3, null, 5],
        [null, 7, null, null],
        [5, null, 5, null]
      ],
      initialGrid: [
        [null, 3, null, null],
        [null, null, 2, null],
        [1, null, null, null],
        [null, null, null, 4]
      ],
      solution: [
        [2, 3, 4, 1],
        [4, 1, 2, 3],
        [1, 4, 3, 2],
        [3, 2, 1, 4]
      ]
    }
  },
  {
    id: 'sud-19',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku Jigsaw 4x4: Khối đa giác chữ L zic-zac',
    badgeTitle: 'Bài Nâng Cao 9.1 · Trang 52+',
    instruction: 'Mỗi hàng, mỗi cột và mỗi khối màu kỳ dị (chữ T hồng, chữ L xanh biển, chữ L xanh lá, chữ T vàng) đều phải chứa đủ các số 1, 2, 3, 4!',
    hint: 'Nhìn vào khối chữ T màu hồng ở trên: đã có 1, 4 và 2 -> chỉ còn thiếu số 3!',
    mascot: { ...CASEY, message: 'Khối màu không vuông mà uốn lượn zic-zac, đòi hỏi mắt quan sát thật tinh tường!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      colorBlocks: [
        ['bg-rose-100', 'bg-rose-100', 'bg-rose-100', 'bg-sky-100'],
        ['bg-emerald-100', 'bg-rose-100', 'bg-sky-100', 'bg-sky-100'],
        ['bg-emerald-100', 'bg-emerald-100', 'bg-amber-100', 'bg-sky-100'],
        ['bg-emerald-100', 'bg-amber-100', 'bg-amber-100', 'bg-amber-100']
      ],
      initialGrid: [
        [1, null, null, 4],
        [null, 4, 1, null],
        [null, 1, null, null],
        [2, null, null, 1]
      ],
      solution: [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
        [2, 3, 4, 1]
      ]
    }
  },
  {
    id: 'sud-20',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Magic Square 3x3 (Tổng = 21)',
    badgeTitle: 'Bài Nâng Cao 9.2 · Trang 52+',
    instruction: 'Điền các số từ 3 đến 11 vào ma trận 3x3 sao cho tổng của mỗi hàng, mỗi cột và hai đường chéo đều đúng bằng 21!',
    hint: 'Số ở chính giữa là 7. Hàng 1: 10 + ? + 8 = 21 => Cần điền số 3. Hàng 3: 6 + ? + 4 = 21 => Cần điền số 11!',
    mascot: { ...BENNY, message: 'Số trung tâm là 7 vì 21 chia 3 bằng 7 đấy các bạn nhỏ ơi!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ô VUÔNG MA THUẬT (MAGIC SQUARE TỔNG 21)',
      subtitle: 'Điền số từ 3 đến 11 sao cho tổng mỗi hàng và mỗi cột đều bằng 21',
      targetSum: 21,
      allowedNumbers: [3, 4, 5, 6, 7, 8, 9, 10, 11],
      initialGrid: [
        [10, null, 8],
        [null, 7, null],
        [6, null, 4]
      ],
      solution: [
        [10, 3, 8],
        [5, 7, 9],
        [6, 11, 4]
      ]
    }
  },
  {
    id: 'sud-21',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma trận số Kim Tự Tháp cộng dồn 3 tầng',
    badgeTitle: 'Bài Nâng Cao 10.1 · Trang 52+',
    instruction: 'Quy luật kim tự tháp: Hai số đầu ở mỗi hàng cộng lại bằng số thứ ba (A + B = C), đồng thời hai hàng trên cộng dồn ra hàng dưới cùng!',
    hint: 'Hàng 1: 6 + ? = 15 => Cần điền số 9. Hàng 2: ? + 14 = 23 => Cần điền số 9. Hàng 3: 15 + 23 = 38!',
    mascot: { ...ABBY, message: 'Cộng dồn từ tầng dưới lên tầng đỉnh kim tự tháp thật kỳ ảo!' },
    activity: {
      type: 'numberMatrix',
      title: 'KIM TỰ THÁP CỘNG DỒN 3 TẦNG',
      subtitle: 'Hàng ngang: Ô 1 + Ô 2 = Ô 3 | Cột dọc: Hàng 1 + Hàng 2 = Hàng 3',
      allowedNumbers: [6, 9, 14, 15, 23, 38],
      hintFormula: '6 + 9 = 15 | 9 + 14 = 23 | 15 + 23 = 38',
      initialGrid: [
        [6, null, 15],
        [null, 14, 23],
        [15, 23, null]
      ],
      solution: [
        [6, 9, 15],
        [9, 14, 23],
        [15, 23, 38]
      ]
    }
  },
  {
    id: 'sud-22',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Magic Square 3x3 (Tổng = 24)',
    badgeTitle: 'Bài Nâng Cao 10.2 · Trang 52+',
    instruction: 'Sử dụng các số từ 4 đến 12 để điền vào ma phương sao cho tổng mỗi hàng, cột và đường chéo đều đúng bằng 24!',
    hint: 'Số trung tâm là 8 (vì 24 : 3 = 8). Hàng 1: ? + 4 + 9 = 24 => Cần điền số 11. Hàng 2: 6 + ? + 10 = 24 => Cần điền số 8!',
    mascot: { ...MAYLE, message: 'Quy luật ma phương 3x3 luôn có số trung tâm bằng 1/3 tổng mục tiêu!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ô VUÔNG MA THUẬT (MAGIC SQUARE TỔNG 24)',
      subtitle: 'Điền số từ 4 đến 12 sao cho tổng mỗi hàng và mỗi cột đều bằng 24',
      targetSum: 24,
      allowedNumbers: [4, 5, 6, 7, 8, 9, 10, 11, 12],
      initialGrid: [
        [null, 4, 9],
        [6, null, 10],
        [7, 12, null]
      ],
      solution: [
        [11, 4, 9],
        [6, 8, 10],
        [7, 12, 5]
      ]
    }
  },
  {
    id: 'sud-23',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku 4x4 Thử thách loại trừ siêu cấp',
    badgeTitle: 'Bài Nâng Cao 11.1 · Trang 52+',
    instruction: 'Cấp độ Chuyên gia: Chỉ có 4 manh mối ban đầu! Phải phối hợp suy luận hàng, cột và khối 2x2 để tìm từng số một.',
    hint: 'Ở hàng 2 đã có 4 và 1, suy luận vị trí của số 3 và 2 bằng cách đối chiếu với cột 1 và cột 4!',
    mascot: { ...CASEY, message: 'Độ khó cao nhất của Sudoku 4x4, em hãy suy luận cẩn thận từng ô nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [3, null, null, null],
        [null, 4, null, 1],
        [null, null, 1, null],
        [null, null, null, 4]
      ],
      solution: [
        [3, 1, 4, 2],
        [2, 4, 3, 1],
        [4, 2, 1, 3],
        [1, 3, 2, 4]
      ]
    }
  },
  {
    id: 'sud-24',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Đại thử thách Ma Phương số chẵn (Tổng = 30)',
    badgeTitle: 'Đại Thử Thách Trạm 3 · Trang 52+',
    instruction: 'Đỉnh cao Trạm 3: Điền các số chẵn 2, 4, 6, 8, 10, 12, 14, 16, 18 vào ô trống để tổng mỗi hàng, cột và đường chéo đều bằng 30!',
    hint: 'Số ở chính giữa là 10. Hàng 1: 16 + ? + 12 = 30 => Cần điền 2. Hàng 3: 8 + ? + 4 = 30 => Cần điền 18!',
    mascot: { ...BENNY, message: 'Chúc mừng bạn đã chinh phục đỉnh cao nhất của Thung Lũng Sudoku & Ma Trận Số!' },
    activity: {
      type: 'numberMatrix',
      title: 'ĐẠI MA PHƯƠNG SỐ CHẴN (TỔNG = 30)',
      subtitle: 'Điền các số chẵn 2, 4, 6, 8, 10, 12, 14, 16, 18 sao cho tổng mỗi hàng và cột đều bằng 30',
      targetSum: 30,
      allowedNumbers: [2, 4, 6, 8, 10, 12, 14, 16, 18],
      initialGrid: [
        [16, null, 12],
        [null, 10, null],
        [8, null, 4]
      ],
      solution: [
        [16, 2, 12],
        [6, 10, 14],
        [8, 18, 4]
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
    badgeTitle: 'Bài 3.1 · Trang 55',
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
    id: 'pat-dice-3-2',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Quy luật chuỗi chấm xúc xắc xí ngầu',
    badgeTitle: 'Bài 3.2 · Trang 55',
    instruction: 'Quan sát số chấm trên các mặt xúc xắc theo hàng ngang: 1 chấm ➔ 3 chấm ➔ 5 chấm ➔ ? Hãy tìm mặt xúc xắc tiếp theo!',
    hint: 'Mỗi bước số chấm tăng thêm 2 đơn vị: 1 + 2 = 3; 3 + 2 = 5; 5 + 2 = 7 chấm!',
    mascot: { ...ABBY, message: 'Dãy số chấm lẻ tăng đều 2 đơn vị qua mỗi bước nhảy!' },
    activity: {
      type: 'sequencePattern',
      title: 'QUY LUẬT XÚC XẮC TĂNG DẦN',
      ruleExplanation: 'Số chấm trên mặt xúc xắc tăng thêm 2 qua từng bước (+2):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1 🎲', stepHint: '+2' },
        { id: 2, label: '3 🎲', stepHint: '+2' },
        { id: 3, label: '5 🎲', stepHint: '+2' },
        { id: 4, isMissing: true }
      ],
      choices: [
        { id: 'opt6', label: '6 🎲' },
        { id: 'opt7', label: '7 🎲 (Chính xác)' },
        { id: 'opt8', label: '8 🎲' },
        { id: 'opt9', label: '9 🎲' }
      ],
      correctChoiceId: 'opt7',
      correctExplanation: 'Rất xuất sắc! Số tiếp theo trong chuỗi là 7 vì 5 + 2 = 7 chấm!'
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
  {
    id: 'pat-14',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy số Fibonacci tự nhiên: Tổng hai số liền trước',
    badgeTitle: 'Bài Nâng Cao 8.1 · Trang 58+',
    instruction: 'Quan sát dãy số vỏ ốc thần kỳ: 1 ➔ 2 ➔ 3 ➔ 5 ➔ 8 ➔ [ ? ] ➔ 21. Hãy tìm con số bí mật tiếp theo!',
    hint: 'Mỗi số bằng tổng 2 số liền trước nó: 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8; 5 + 8 = 13; 8 + 13 = 21!',
    mascot: { ...ABBY, message: 'Dãy số vỏ ốc Fibonacci kỳ diệu trong thiên nhiên, hai bạn trước cộng lại ra bạn sau!' },
    activity: {
      type: 'sequencePattern',
      title: 'DÃY SỐ FIBONACCI TỰ NHIÊN',
      ruleExplanation: 'Mỗi số bằng tổng của hai số đứng ngay trước nó:',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1' },
        { id: 2, label: '2' },
        { id: 3, label: '3', stepHint: '1+2' },
        { id: 4, label: '5', stepHint: '2+3' },
        { id: 5, label: '8', stepHint: '3+5' },
        { id: 6, isMissing: true, stepHint: '5+8' },
        { id: 7, label: '21', stepHint: '8+?' }
      ],
      choices: [
        { id: '11', label: '11' },
        { id: '12', label: '12' },
        { id: '13', label: '13 (Đúng)' },
        { id: '14', label: '14' }
      ],
      correctChoiceId: '13',
      correctExplanation: 'Chính xác! 5 + 8 = 13 và 8 + 13 = 21. Bạn giải dãy Fibonacci xuất sắc!'
    }
  },
  {
    id: 'pat-15',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy số khoảng cách bậc hai: Bước nhảy tăng dần',
    badgeTitle: 'Bài Nâng Cao 8.2 · Trang 58+',
    instruction: 'Chú thỏ Abby nhảy qua các mỏm đá với bước nhảy dài hơn sau mỗi lần: 1 ➔ 2 ➔ 4 ➔ 7 ➔ 11 ➔ 16 ➔ [ ? ]. Tìm con số ở mỏm đá tiếp theo!',
    hint: 'Khoảng cách giữa các mỏm đá tăng dần: +1, +2, +3, +4, +5! Bước tiếp theo nhảy +6: 16 + 6 = 22!',
    mascot: { ...BENNY, message: 'Bước nhảy dài thêm 1 sau mỗi lần nhảy: +1, +2, +3, +4, +5, rồi đến +6!' },
    activity: {
      type: 'sequencePattern',
      title: 'BƯỚC NHẢY TĂNG DẦN BẬC HAI',
      ruleExplanation: 'Khoảng cách tăng đều (+1, +2, +3, +4, +5, +6):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1' },
        { id: 2, label: '2', stepHint: '+1' },
        { id: 3, label: '4', stepHint: '+2' },
        { id: 4, label: '7', stepHint: '+3' },
        { id: 5, label: '11', stepHint: '+4' },
        { id: 6, label: '16', stepHint: '+5' },
        { id: 7, isMissing: true, stepHint: '+6' }
      ],
      choices: [
        { id: '20', label: '20' },
        { id: '21', label: '21' },
        { id: '22', label: '22 (Chính xác)' },
        { id: '24', label: '24' }
      ],
      correctChoiceId: '22',
      correctExplanation: 'Quá đỉnh! 16 + 6 = 22, bạn đã nắm vững quy luật khoảng cách bậc hai!'
    }
  },
  {
    id: 'pat-16',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy số đan xen hai phép tính luân phiên (+5 và -2)',
    badgeTitle: 'Bài Nâng Cao 9.1 · Trang 58+',
    instruction: 'Quan sát nhịp điệu của các nốt nhạc: 3 ➔ 8 ➔ 6 ➔ 11 ➔ 9 ➔ 14 ➔ [ ? ]. Tìm nốt nhạc bí mật tiếp theo!',
    hint: 'Quy luật đan xen: Cộng 5 rồi Trừ 2! (3 + 5 = 8; 8 - 2 = 6; 6 + 5 = 11; 11 - 2 = 9; 9 + 5 = 14). Tiếp theo là Trừ 2: 14 - 2 = 12!',
    mascot: { ...CASEY, message: 'Nhảy lên rồi lùi xuống luân phiên như đang khiêu vũ: +5 rồi lại -2!' },
    activity: {
      type: 'sequencePattern',
      title: 'DÃY SỐ ĐAN XEN LUÂN PHIÊN (+5 / -2)',
      ruleExplanation: 'Phép tính luân phiên: Tiến 5 bước rồi lùi 2 bước (+5, -2, +5, -2):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '3' },
        { id: 2, label: '8', stepHint: '+5' },
        { id: 3, label: '6', stepHint: '-2' },
        { id: 4, label: '11', stepHint: '+5' },
        { id: 5, label: '9', stepHint: '-2' },
        { id: 6, label: '14', stepHint: '+5' },
        { id: 7, isMissing: true, stepHint: '-2' }
      ],
      choices: [
        { id: '11', label: '11' },
        { id: '12', label: '12 (Đúng)' },
        { id: '13', label: '13' },
        { id: '19', label: '19' }
      ],
      correctChoiceId: '12',
      correctExplanation: 'Rất chính xác! 14 - 2 = 12, con số tiếp theo là 12!'
    }
  },
  {
    id: 'pat-17',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Chuỗi quân cờ Domino: Nhân đôi và cộng dồn',
    badgeTitle: 'Bài Nâng Cao 9.2 · Trang 58+',
    instruction: 'Quan sát các quân cờ Domino: [1|2] ➔ [2|5] ➔ [4|8] ➔ [8|11] ➔ [ ? | ? ]. Tìm quân Domino tiếp theo ở vị trí số 5!',
    hint: 'Nửa trên nhân đôi: 1 × 2 = 2; 2 × 2 = 4; 4 × 2 = 8 => Nửa trên tiếp theo là 16! Nửa dưới cộng 3: 2 + 3 = 5; 5 + 3 = 8; 8 + 3 = 11 => Nửa dưới tiếp theo là 14! Quân cần tìm là [16 | 14]!',
    mascot: { ...MAYLE, message: 'Nửa trên gấp đôi, nửa dưới cộng ba, kết hợp hai quy luật cùng lúc!' },
    activity: {
      type: 'sequencePattern',
      title: 'QUÂN CỜ DOMINO ĐA QUY LUẬT',
      ruleExplanation: 'Nửa trên gấp đôi (×2), nửa dưới cộng ba (+3):',
      sequenceType: 'domino',
      items: [
        { id: 1, label: '1', subLabel: '2' },
        { id: 2, label: '2', subLabel: '5' },
        { id: 3, label: '4', subLabel: '8' },
        { id: 4, label: '8', subLabel: '11' },
        { id: 5, isMissing: true }
      ],
      choices: [
        { id: 'opt1614', label: '16', subLabel: '14' },
        { id: 'opt1613', label: '16', subLabel: '13' },
        { id: 'opt1414', label: '14', subLabel: '14' },
        { id: 'opt1214', label: '12', subLabel: '14' }
      ],
      correctChoiceId: 'opt1614',
      correctExplanation: 'Tuyệt đỉnh! Quân cờ tiếp theo là [16 | 14] với nửa trên là 16 và nửa dưới là 14!'
    }
  },
  {
    id: 'pat-18',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê cung ngọc quý chu kỳ 4 sắc màu huyền bí',
    badgeTitle: 'Bài Nâng Cao 10.1 · Trang 58+',
    instruction: 'Dẫn bạn nhỏ đi qua mê cung để chạm tay vào Cúp Vàng Spark Math theo đúng chu kỳ 4 viên ngọc: 🟡 Vàng ➔ 🔵 Xanh biển ➔ 🔴 Đỏ ➔ 🟣 Tím.',
    hint: 'Bắt đầu từ viên Vàng góc trên trái [0,0], lần lượt bước sang Xanh biển [0,1], Đỏ [0,2], Tím [0,3], Vàng [0,4], rồi rẽ xuống theo chu kỳ để tới Cúp Vàng!',
    mascot: { ...ABBY, message: 'Hãy giữ đúng nhịp 4 màu ngọc quý: Vàng, Lam, Đỏ, Tím trên từng bước đi!' },
    activity: {
      type: 'flowerMaze',
      ruleTitle: 'QUY LUẬT 4 SẮC MÀU HUYỀN BÍ',
      patternDisplay: [
        { icon: '🟡', name: 'Vàng' },
        { icon: '🔵', name: 'Xanh biển' },
        { icon: '🔴', name: 'Đỏ' },
        { icon: '🟣', name: 'Tím' }
      ],
      pattern: ['🟡', '🔵', '🔴', '🟣'],
      startPos: [0, 0],
      goalPos: [4, 4],
      startIcon: '🐰',
      startLabel: 'Abby xuất phát',
      goalIcon: '🏆',
      goalLabel: 'Cúp Vàng Spark',
      grid: [
        ['🟡', '🔵', '🔴', '🟣', '🟡'],
        ['🟣', '🔴', '🟡', '🟡', '🔵'],
        ['🟡', '🔵', '🔴', '🟣', '🔴'],
        ['🔵', '🔴', '🟡', '🟡', '🟣'],
        ['🔴', '🟣', '🟡', '🔵', '🏆']
      ],
      targetPath: [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 4]
      ],
      successMessage: '🎉 Chúc mừng! Bạn đã chinh phục mê cung 4 sắc màu huyền bí xuất sắc!'
    }
  },
  {
    id: 'pat-19',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Ma trận biến đổi hình học: Quy luật số cạnh đa giác',
    badgeTitle: 'Bài Nâng Cao 10.2 · Trang 58+',
    instruction: 'Quan sát quy luật tăng số đoạn thẳng và số cạnh: 1 đoạn thẳng ➔ 2 đoạn cắt nhau (dấu cộng) ➔ Tam giác (3 cạnh) ➔ Hình vuông (4 cạnh). Hình tiếp theo là gì?',
    hint: 'Số cạnh tăng dần: 1 cạnh ➔ 2 cạnh ➔ 3 cạnh (tam giác) ➔ 4 cạnh (hình vuông) ➔ Hình tiếp theo phải có 5 cạnh (Hình ngũ giác)!',
    mascot: { ...BENNY, message: 'Đếm số cạnh của từng hình: 1, 2, 3, 4... Tiếp theo là hình có mấy cạnh nhỉ?' },
    activity: {
      type: 'patternMatrix',
      ruleDescription: 'Quy luật tăng dần số cạnh của đa giác (+1 cạnh):',
      steps: [
        { stepNum: 1, content: '➖', note: '1 đoạn thẳng' },
        { stepNum: 2, content: '➕', note: '2 đoạn thẳng vuông góc' },
        { stepNum: 3, content: '🔺', note: 'Tam giác (3 cạnh)' },
        { stepNum: 4, content: '🔲', note: 'Hình vuông (4 cạnh)' }
      ],
      choices: [
        { id: 'A', label: 'Hình A (Đúng)', content: '⬟ Ngũ giác (5 cạnh)' },
        { id: 'B', label: 'Hình B', content: '⚪ Hình tròn (0 cạnh)' },
        { id: 'C', label: 'Hình C', content: '⭐ Ngôi sao (10 cạnh)' },
        { id: 'D', label: 'Hình D', content: '➖ Đoạn thẳng' }
      ],
      correctChoiceId: 'A'
    }
  },
  {
    id: 'pat-20',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Kim tự tháp số 4 tầng cộng dồn đa lớp',
    badgeTitle: 'Bài Nâng Cao 11.1 · Trang 58+',
    instruction: 'Kim tự tháp số 4 tầng khổng lồ: Tầng đáy gồm 2, 3, 5, 4. Tầng 2 gồm 5, 8, 9. Tầng 3 gồm 13, 17. Hỏi viên gạch trên đỉnh chóp là con số mấy?',
    hint: 'Tầng 3 gồm 13 và 17. Viên gạch ở đỉnh bằng tổng của hai viên gạch tầng 3: 13 + 17 = 30!',
    mascot: { ...MAYLE, message: 'Kim tự tháp 4 tầng cao vút, tính nhẩm tầng 3: 13 + 17 là ra đỉnh chóp ngay!' },
    activity: {
      type: 'sequencePattern',
      title: 'KIM TỰ THÁP SỐ 4 TẦNG',
      ruleExplanation: 'Viên gạch đỉnh chóp = Tổng hai viên gạch tầng 3 (13 + 17 = ?):',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '30' }
      ],
      choices: [
        { id: '28', label: '28' },
        { id: '29', label: '29' },
        { id: '30', label: '30 (Chính xác)' },
        { id: '32', label: '32' }
      ],
      correctChoiceId: '30',
      correctExplanation: 'Xuất sắc! 13 + 17 = 30, viên gạch trên đỉnh chóp kim tự tháp là 30!'
    }
  },
  {
    id: 'pat-21',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy số mã hóa chữ cái kết hợp số học',
    badgeTitle: 'Bài Nâng Cao 11.2 · Trang 58+',
    instruction: 'Mật mã thông minh kết hợp chữ cái và số lẻ: A1 ➔ B3 ➔ C5 ➔ D7 ➔ [ ? ]. Tìm mật mã tiếp theo!',
    hint: 'Chữ cái đi theo bảng chữ cái: A, B, C, D ➔ tiếp theo là E. Chữ số tăng theo số lẻ: 1, 3, 5, 7 ➔ tiếp theo là 9. Mật mã là E9!',
    mascot: { ...CASEY, message: 'Phối hợp chữ cái A, B, C, D, E và số lẻ 1, 3, 5, 7, 9 để giải mã!' },
    activity: {
      type: 'sequencePattern',
      title: 'MẬT MÃ CHỮ CÁI & SỐ LẺ',
      ruleExplanation: 'Chữ cái tiếp theo trong bảng chữ cái + Số lẻ tăng dần (+2):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: 'A1' },
        { id: 2, label: 'B3', stepHint: '+2' },
        { id: 3, label: 'C5', stepHint: '+2' },
        { id: 4, label: 'D7', stepHint: '+2' },
        { id: 5, isMissing: true, stepHint: '+2' }
      ],
      choices: [
        { id: 'E8', label: 'E8' },
        { id: 'E9', label: 'E9 (Chính xác)' },
        { id: 'F9', label: 'F9' },
        { id: 'E11', label: 'E11' }
      ],
      correctChoiceId: 'E9',
      correctExplanation: 'Rất thông minh! Sau D là chữ E, sau số 7 là số 9, mật mã đúng là E9!'
    }
  },
  {
    id: 'pat-22',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Chuỗi vòng ngọc đối xứng trục gương (Mirror Symmetry)',
    badgeTitle: 'Bài Nâng Cao 12.1 · Trang 58+',
    instruction: 'Chiếc vòng ngọc đối xứng qua tấm gương ở giữa: 🔴 🔵 🟡 🟢 | GƯƠNG | 🟢 🟡 🔵 [ ? ]. Tìm hạt ngọc cuối cùng để chuỗi đối xứng hoàn hảo!',
    hint: 'Đối xứng qua gương: 🟢 soi với 🟢, 🟡 soi với 🟡, 🔵 soi với 🔵. Hạt ngoài cùng bên trái là 🔴 nên hạt ngoài cùng bên phải cũng phải là 🔴 Đỏ!',
    mascot: { ...ABBY, message: 'Quy luật đối xứng gương: hình ảnh bên phải phản chiếu y hệt bên trái!' },
    activity: {
      type: 'sequencePattern',
      title: 'VÒNG NGỌC ĐỐI XỨNG TRỤC GƯƠNG',
      ruleExplanation: 'Hai nửa đối xứng nhau qua gương (🔴 🔵 🟡 🟢 🪞 🟢 🟡 🔵 🔴):',
      sequenceType: 'beads',
      items: [
        { id: 1, icon: '🔴', label: '1' },
        { id: 2, icon: '🔵', label: '2' },
        { id: 3, icon: '🟡', label: '3' },
        { id: 4, icon: '🟢', label: '4' },
        { id: 5, icon: '🟢', label: '5' },
        { id: 6, icon: '🟡', label: '6' },
        { id: 7, icon: '🔵', label: '7' },
        { id: 8, isMissing: true, label: '?' }
      ],
      choices: [
        { id: 'red', icon: '🔴', label: 'Hạt Đỏ 🔴 (Đúng)' },
        { id: 'blue', icon: '🔵', label: 'Hạt Xanh 🔵' },
        { id: 'yellow', icon: '🟡', label: 'Hạt Vàng 🟡' },
        { id: 'green', icon: '🟢', label: 'Hạt Lục 🟢' }
      ],
      correctChoiceId: 'red',
      correctExplanation: 'Tuyệt vời! Hạt Đỏ 🔴 hoàn thành bức tranh đối xứng gương tuyệt đẹp!'
    }
  },
  {
    id: 'pat-23',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Đại Thử Thách Trạm 4: Dãy số hai tầng sóng lồng nhau',
    badgeTitle: 'Đại Thử Thách Trạm 4 · Trang 58+',
    instruction: 'Đỉnh cao Trạm 4: Dãy số gồm hai quy luật chạy lồng vào nhau: 1, 10, 3, 20, 9, 30, [ ? ], 40. Tìm số bí mật ở vị trí số 7!',
    hint: 'Vị trí lẻ (1, 3, 5, 7): 1 × 3 = 3; 3 × 3 = 9; 9 × 3 = 27! Vị trí chẵn (2, 4, 6, 8): 10, 20, 30, 40. Vị trí số 7 cần điền là 27!',
    mascot: { ...BENNY, message: 'Chúc mừng bạn đã chinh phục đỉnh cao nhất của Thung Lũng Quy Luật & Mê Cung!' },
    activity: {
      type: 'sequencePattern',
      title: 'DÃY SỐ HAI TẦNG SÓNG LỒNG NHAU',
      ruleExplanation: 'Vị trí lẻ nhân 3 (1, 3, 9, 27) | Vị trí chẵn cộng 10 (10, 20, 30, 40):',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1' },
        { id: 2, label: '10' },
        { id: 3, label: '3', stepHint: '1×3' },
        { id: 4, label: '20', stepHint: '+10' },
        { id: 5, label: '9', stepHint: '3×3' },
        { id: 6, label: '30', stepHint: '+10' },
        { id: 7, isMissing: true, stepHint: '9×3' },
        { id: 8, label: '40', stepHint: '+10' }
      ],
      choices: [
        { id: '21', label: '21' },
        { id: '24', label: '24' },
        { id: '27', label: '27 (Chính xác)' },
        { id: '36', label: '36' }
      ],
      correctChoiceId: '27',
      correctExplanation: 'Kỳ tài toán học! 9 × 3 = 27. Bạn đã hoàn thành xuất sắc toàn bộ thử thách Trạm 4!'
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
    hint: '🤔 Em hãy vẽ sơ đồ hàng dọc: Bạn Abby được tính theo mấy hướng? Vị trí của bạn ấy có bị tính lặp lại không?',
    mascot: { ...ABBY, message: 'Hãy để ý xem có bạn nào được đếm ở cả hai chiều không nhé!' },
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
    hint: '🤔 Khi cộng thứ tự đếm từ đầu hàng và cuối hàng, bạn Abby đã được tính mấy lần?',
    mascot: { ...ABBY, message: 'Hãy quan sát bạn đứng ở vị trí giao thoa giữa hai hướng đếm nhé!' },
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
    hint: '🤔 Hàng gồm có phần đầu, phần đuôi và phần ở giữa. Làm thế nào để tách biệt phần ở giữa ra khỏi hai đầu?',
    mascot: { ...CASEY, message: 'Quan sát các bạn ở hai đầu để xác định nhóm bạn ở giữa nhé!' },
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
    hint: '🤔 Bạn Casey đứng ở khúc cua chữ L có mặt trong những hàng nào? Làm sao để không tính trùng bạn ấy?',
    mascot: { ...CASEY, message: 'Tớ đứng ngay khúc cua nối giữa hai hàng đấy!' },
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
    hint: '🤔 Tại ngã ba chữ T, bạn Abby tham gia vào mấy hàng? Điều này ảnh hưởng thế nào khi em tính tổng số bạn?',
    mascot: { ...ABBY, message: 'Hãy quan sát kỹ vị trí điểm giao cắt giữa hai hàng nhé!' },
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
    hint: '🤔 Điểm giao nhau giữa hai hàng được đếm mấy lần nếu em chỉ cộng số lượng của từng hàng lại?',
    mascot: { ...ABBY, message: 'Hãy suy ngẫm về người đứng ở điểm giao nhau của hai hàng nhé!' },
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
    hint: '🤔 Benny đứng ở ngã tư chữ thập, bạn ấy thuộc về hàng dọc hay hàng ngang, hay cả hai hàng?',
    mascot: { ...BENNY, message: 'Tớ đứng ngay ở trung tâm ngã tư giao nhau đấy!' },
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
    hint: '🤔 Khi đếm theo hai chiều trên một vòng tròn khép kín, những bạn mốc được nhắc tên bị đếm mấy lần?',
    mascot: { ...MAYLE, message: 'Hãy vẽ vòng tròn ra giấy nháp và quan sát các điểm mốc được đếm nhé!' },
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
    hint: '🤔 Em hãy quan sát: Mỗi chú khỉ tương ứng với bao nhiêu chú thỏ? Khi đó trên đĩa cân của chú gấu sẽ tương ứng với mấy chú thỏ?',
    mascot: { ...MAYLE, message: 'Dùng phép thế đại lượng: Thay mỗi chú khỉ bằng số lượng thỏ tương ứng nhé!' },
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
          { id: '4', count: 4, icon: '🐰', label: '4 Chú Thỏ' },
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
    badgeTitle: 'Bài 1.1 · Trang 69',
    instruction: 'Casey, Abby và Benny đo chiều cao.\n• Casey thấp hơn Benny.\n• Abby thấp hơn Casey.\n• Benny cao hơn Abby.\nHỏi ai là người cao nhất và ai là người thấp nhất trong số họ?',
    hint: '🤔 Em hãy phác thảo ba bạn từ thấp lên cao trên giấy nháp để xem ai ở đỉnh cao nhất và ai ở chân hàng nhé.',
    mascot: { ...BENNY, message: 'So sánh từng cặp rồi xếp thứ tự như que đo nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'benny', label: 'Benny 🐵', levelPercent: 95, color: '#f59e0b' },
        { id: 'casey', label: 'Casey 🐹', levelPercent: 65, color: '#f59e0b' },
        { id: 'abby', label: 'Abby 🐰', levelPercent: 35, color: '#f59e0b' }
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
    id: 'log-weight-order-1-2',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Thám tử so sánh cân nặng thú cưng',
    badgeTitle: 'Bài 1.2 · Trang 69',
    instruction: 'Chó Vàng, Mèo Mướp và Chuột Nhắt cùng bước lên cân:\n• Chó Vàng nặng hơn Mèo Mướp.\n• Mèo Mướp nặng hơn Chuột Nhắt.\nHỏi ai là bạn nặng nhất và ai là bạn nhẹ nhất trong số họ?',
    hint: '🤔 Em hãy sắp xếp ba bạn từ nhẹ đến nặng để xác định bạn ở hai đầu nhé.',
    mascot: { ...CASEY, message: 'So sánh từng cặp giúp chúng mình tìm ra bạn nặng nhất thật dễ dàng!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'dog', label: 'Chó Vàng 🐕', levelPercent: 95, color: '#f59e0b' },
        { id: 'cat', label: 'Mèo Mướp 🐈', levelPercent: 65, color: '#f59e0b' },
        { id: 'mouse', label: 'Chuột Nhắt 🐭', levelPercent: 35, color: '#f59e0b' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Ai là bạn NẶNG NHẤT trong số họ?',
          options: ['Chó Vàng', 'Mèo Mướp', 'Chuột Nhắt'],
          correctAnswer: 'Chó Vàng'
        },
        {
          id: 'q2',
          prompt: 'Ai là bạn NHẸ NHẤT trong số họ?',
          options: ['Chó Vàng', 'Mèo Mướp', 'Chuột Nhắt'],
          correctAnswer: 'Chuột Nhắt'
        }
      ]
    }
  },
  {
    id: 'log-seats',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Xếp chỗ ngồi rạp hát cùng Bác sĩ Mayle',
    badgeTitle: 'Bài 2.1 · Trang 70',
    instruction: 'Bác sĩ Mayle, Abby, Benny, Casey và Bác Ram ngồi cạnh nhau từ Ghế 1 (trái) sang Ghế 5 (phải):\n• Bác sĩ Mayle: Tôi ngồi ở bên rìa.\n• Abby: Tôi đang ngồi ở trung tâm.\n• Benny: Tôi đang ngồi ở bên phải của Abby.\n• Bác Ram: Có 2 người ở giữa Bác sĩ Mayle và tôi.',
    hint: '🤔 Em hãy bắt đầu từ bạn có vị trí xác định rõ ràng nhất (ví dụ bạn ở chính giữa), rồi đối chiếu các điều kiện xung quanh nhé.',
    mascot: { ...MAYLE, message: 'Đọc kỹ từng manh mối và xếp ghế như một thám tử thực thụ!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 5,
      correctOrder: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram'],
      allowedCharacters: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram']
    }
  },
  {
    id: 'log-lineup-order-2-2',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Xếp hàng nhận thưởng cùng Thầy Mayle',
    badgeTitle: 'Bài 2.2 · Trang 70',
    instruction: 'Bốn bạn Rory, Casey, Abby và Benny xếp thành một hàng dọc trước bục nhận thưởng:\n• Rory đứng ở vị trí cuối cùng (Vị trí 4).\n• Casey đứng ở vị trí đầu tiên (Vị trí 1).\n• Abby đứng ngay sau Benny (Benny trước, Abby sau).\nHãy sắp xếp 4 bạn theo thứ tự từ vị trí 1 đến 4!',
    hint: '🤔 Em hãy xác định vị trí cố định của bạn đứng đầu và bạn đứng cuối trước, sau đó sắp xếp cặp bạn còn lại nhé.',
    mascot: { ...MAYLE, message: 'Đọc kỹ từng vị trí cố định trước, rồi xếp các bạn còn lại vào nhé!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp 4 bạn theo thứ tự từ vị trí 1 đến vị trí 4:',
      directionLabel: 'Vị trí 1 (Đầu hàng) ➔ Vị trí 4 (Cuối hàng)',
      items: [
        { id: 'Casey', label: 'Casey 🐹', description: 'Đứng đầu tiên (Vị trí 1)', icon: '🐹' },
        { id: 'Benny', label: 'Benny 🐵', description: 'Đứng trước Abby', icon: '🐵' },
        { id: 'Abby', label: 'Abby 🐰', description: 'Đứng ngay sau Benny', icon: '🐰' },
        { id: 'Rory', label: 'Rory 🐻', description: 'Đứng cuối cùng (Vị trí 4)', icon: '🐻' }
      ],
      correctOrder: ['Casey', 'Benny', 'Abby', 'Rory']
    }
  },
  {
    id: 'log-height-order-3',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đo chiều cao Bác sĩ Mayle, Bác Ram, Benny & Casey',
    badgeTitle: 'Bài 3 · Trang 71',
    instruction: 'Đọc kỹ các gợi ý:\n• Bác sĩ Mayle thấp hơn Bác Ram.\n• Bác Ram thấp hơn Benny.\n• Benny cao hơn Bác sĩ Mayle.\nHỏi ai là người cao nhất trong số họ?',
    hint: '🤔 Em hãy so sánh từng cặp đôi một: Ai cao hơn ai? Chuỗi so sánh này dẫn tới ai là người cao nhất?',
    mascot: { ...BENNY, message: 'Hãy dùng sơ đồ que đo chiều cao để so sánh từng cặp nhé!' },
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
    hint: '🤔 Em hãy chọn đoạn ruy băng làm mốc trung gian (như đoạn C) để so sánh các đoạn còn lại dài hơn hay ngắn hơn nhé.',
    mascot: { ...ABBY, message: 'Dùng trục so sánh: Đối chiếu từng đoạn với mốc chuẩn nhé!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp các mảnh ruy băng theo thứ tự từ dài nhất tới ngắn nhất:',
      directionLabel: 'Từ Dài Nhất ➔ Ngắn Nhất',
      items: [
        { id: 'A', label: 'Đoạn A', description: 'Ngắn hơn C', icon: '🎀' },
        { id: 'B', label: 'Đoạn B', description: 'Dài hơn C, ngắn hơn D', icon: '🎀' },
        { id: 'C', label: 'Đoạn C', description: 'Mốc so sánh', icon: '🎀' },
        { id: 'D', label: 'Đoạn D', description: 'Dài hơn C', icon: '🎀' }
      ],
      correctOrder: ['D', 'B', 'C', 'A']
    }
  },
  {
    id: 'log-race-ranking',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Bảng xếp hạng cuộc thi chạy rừng xanh',
    badgeTitle: 'Bài 5 · Trang 72 Mở rộng',
    instruction: 'Cuộc thi chạy cự ly rừng xanh có 4 bạn tham gia (Thỏ Abby, Khỉ Benny, Chuột Casey và Chú Rùa):\n• Abby về đích trước Benny.\n• Benny về đích trước Casey.\n• Rùa về đích sau cùng (sau Casey).\nHãy sắp xếp thứ tự về đích từ NGƯỜI CHẠY NHANH NHẤT đến NGƯỜI CHẠY CHẬM NHẤT!',
    hint: '🤔 Em hãy lập danh sách theo thứ tự ai về trước ai, sau đó ghép nối các thứ bậc lại từ đầu đến cuối.',
    mascot: { ...ABBY, message: 'Đọc kỹ từng manh mối về người về trước và người về sau nhé!' },
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
  {
    id: 'log-17',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm hàng có khoảng cách giữa hai bạn',
    badgeTitle: 'Bài Nâng Cao 6.1 · Trang 72+',
    instruction: 'Trong một hàng dọc: Thỏ Abby đứng thứ 5 tính từ đầu hàng. Chuột Casey đứng thứ 8 tính từ cuối hàng. Giữa Abby và Casey có đúng 3 bạn. Hỏi có tất cả bao nhiêu bạn trong hàng?',
    hint: '🤔 Em hãy vẽ sơ đồ hàng dọc: Hàng được chia thành mấy phần riêng biệt? Có bạn nào bị tính lặp lại không?',
    mascot: { ...ABBY, message: 'Hãy phân tích các phần của hàng để xác định tổng số bạn nhé!' },
    activity: {
      type: 'queueCounter',
      mode: 'between',
      fromFront: 5,
      fromBack: 8,
      promptTitle: 'TÍNH TỔNG SỐ BẠN TRONG HÀNG',
      personA: { name: 'Thỏ Abby', avatar: '🐰', pos: 5 },
      personB: { name: 'Chuột Casey', avatar: '🐹', pos: 8 },
      correctTotal: 16,
      formula: '5 (đầu đến Abby) + 3 (ở giữa) + 8 (Casey đến cuối) = 16 bạn',
      options: [14, 15, 16, 17]
    }
  },
  {
    id: 'log-18',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Cân thăng bằng bắc cầu 2 bước: Dưa hấu, Dứa & Cam',
    badgeTitle: 'Bài Nâng Cao 6.2 · Trang 72+',
    instruction: 'Quan sát 2 chiếc cân thăng bằng:\n• Cân 1: 1 quả Dưa hấu 🍉 thăng bằng với 2 quả Dứa 🍍.\n• Cân 2: 1 quả Dứa 🍍 thăng bằng với 3 quả Cam 🍊.\nHỏi 1 quả Dưa hấu 🍉 nặng bằng mấy quả Cam 🍊?',
    hint: '🤔 Em hãy suy ngẫm: Nếu thay thế từng quả dứa bằng số cam tương ứng, chiếc cân của quả dưa sẽ cần bao nhiêu quả cam?',
    mascot: { ...BENNY, message: 'Quan sát mối liên hệ bắc cầu giữa dưa, dứa và cam nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'CÂN THĂNG BẰNG BẮC CẦU 2 BƯỚC',
      ruleExplanation: 'Sử dụng tính chất bắc cầu: 1 Dưa = 2 Dứa | 1 Dứa = 3 Cam:',
      scales: [
        {
          leftIcons: ['🍉'],
          leftLabel: '1 Dưa hấu',
          rightIcons: ['🍍', '🍍'],
          rightLabel: '2 quả Dứa'
        },
        {
          leftIcons: ['🍍'],
          leftLabel: '1 quả Dứa',
          rightIcons: ['🍊', '🍊', '🍊'],
          rightLabel: '3 quả Cam'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🍉'],
        targetLeftLabel: '1 quả Dưa hấu = ? quả Cam',
        options: [
          { id: 'opt-4', count: 4, icon: '🍊', label: '4 quả Cam' },
          { id: 'opt-5', count: 5, icon: '🍊', label: '5 quả Cam' },
          { id: 'opt-6', count: 6, icon: '🍊', label: '6 quả Cam' },
          { id: 'opt-8', count: 8, icon: '🍊', label: '8 quả Cam' }
        ],
        correctOptionId: 'opt-6',
        explanation: 'Chính xác! 1 Dưa hấu = 2 Dứa = 2 × 3 = 6 quả Cam!'
      }
    }
  },
  {
    id: 'log-19',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng người đứng thành khung chữ nhật rỗng 4 góc',
    badgeTitle: 'Bài Nâng Cao 7.1 · Trang 72+',
    instruction: 'Các bạn nhỏ xếp hàng tạo thành khung chữ nhật rỗng: Mỗi cạnh có đúng 4 bạn. Hỏi có tất cả bao nhiêu bạn xếp hàng?',
    hint: '🤔 Khi đếm lần lượt 4 cạnh của khung hình chữ nhật, những bạn đứng ở vị trí góc giao nhau có đặc điểm gì cần lưu ý?',
    mascot: { ...CASEY, message: 'Hãy chú ý vị trí giao nhau ở các góc của khung chữ nhật nhé!' },
    activity: {
      type: 'queueCounter',
      mode: 'twoEnds',
      fromFront: 4,
      fromBack: 4,
      promptTitle: 'ĐẾM HÀNG KHUNG CHỮ NHẬT RỖNG 4 GÓC',
      correctTotal: 12,
      formula: '4 cạnh × 4 bạn - 4 bạn ở 4 góc = 12 bạn',
      options: [12, 14, 16, 18]
    }
  },
  {
    id: 'log-20',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Thám tử gia đình: Sắp xếp độ tuổi 5 thành viên',
    badgeTitle: 'Bài Nâng Cao 7.2 · Trang 72+',
    instruction: 'Hãy xếp thứ tự các thành viên trong gia đình từ LỚN TUỔI NHẤT đến NHỎ TUỔI NHẤT dựa vào các manh mối:\n• Ông ngoại là người lớn tuổi nhất trong nhà.\n• Bố lớn tuổi hơn Mẹ.\n• Mẹ lớn tuổi hơn Chị gái.\n• Bé Út là thành viên nhỏ tuổi nhất.',
    hint: '🤔 Em hãy xác định người nhiều tuổi nhất và người nhỏ tuổi nhất trước, rồi sắp xếp các thành viên ở giữa nhé.',
    mascot: { ...MAYLE, message: 'Đọc kỹ từng manh mối để xác định mối tương quan độ tuổi!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự từ LỚN TUỔI NHẤT (Trái) đến NHỎ TUỔI NHẤT (Phải):',
      directionLabel: 'Nhiều tuổi nhất ➔ Ít tuổi nhất',
      items: [
        { id: 'Ong', label: 'Ông ngoại', description: 'Lớn tuổi nhất nhà', icon: '👴' },
        { id: 'Bo', label: 'Bố', description: 'Lớn tuổi hơn Mẹ', icon: '👨' },
        { id: 'Me', label: 'Mẹ', description: 'Lớn tuổi hơn Chị gái', icon: '👩' },
        { id: 'Chi', label: 'Chị gái', description: 'Lớn tuổi hơn Bé Út', icon: '👧' },
        { id: 'BeUt', label: 'Bé Út', description: 'Nhỏ tuổi nhất nhà', icon: '👶' }
      ],
      correctOrder: ['Ong', 'Bo', 'Me', 'Chi', 'BeUt']
    }
  },
  {
    id: 'log-21',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Cân thăng bằng tổng - hiệu: Cân nặng Chó & Mèo',
    badgeTitle: 'Bài Nâng Cao 8.1 · Trang 72+',
    instruction: 'Hai chú thú cưng lên bàn cân:\n• Cân 1: 1 chú Chó 🐶 và 1 chú Mèo 🐱 nặng tổng cộng 10 kg.\n• Cân 2: 1 chú Chó 🐶 nặng đúng bằng 1 chú Mèo 🐱 cộng thêm quả cân 2 kg.\nHỏi chú Chó 🐶 nặng bao nhiêu kg?',
    hint: '🤔 Chú chó nặng hơn chú mèo bao nhiêu kg? Nếu bớt đi phần chênh lệch đó thì hai chú thú cưng sẽ có cân nặng ra sao?',
    mascot: { ...ABBY, message: 'Phân tích mối liên hệ tổng và hiệu trên bàn cân nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'TÍNH CÂN NẶNG TỔNG - HIỆU THÚ CƯNG',
      ruleExplanation: 'Chó + Mèo = 10 kg | Chó = Mèo + 2 kg:',
      scales: [
        {
          leftIcons: ['🐶', '🐱'],
          leftLabel: 'Chó + Mèo',
          rightIcons: ['⚖️', '⚖️'],
          rightLabel: '10 kg'
        },
        {
          leftIcons: ['🐶'],
          leftLabel: '1 chú Chó',
          rightIcons: ['🐱', '⚖️'],
          rightLabel: '1 Mèo + 2 kg'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🐶'],
        targetLeftLabel: '1 chú Chó = ? kg',
        options: [
          { id: 'opt-4', count: 4, icon: '⚖️', label: '4 kg' },
          { id: 'opt-5', count: 5, icon: '⚖️', label: '5 kg' },
          { id: 'opt-6', count: 6, icon: '⚖️', label: '6 kg' },
          { id: 'opt-8', count: 8, icon: '⚖️', label: '8 kg' }
        ],
        correctOptionId: 'opt-6',
        explanation: 'Xuất sắc! Mèo nặng 4 kg, Chó nặng 6 kg (6 + 4 = 10 kg và 6 - 4 = 2 kg)!'
      }
    }
  },
  {
    id: 'log-22',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm hàng chữ thập đôi có 2 điểm giao nhau',
    badgeTitle: 'Bài Nâng Cao 8.2 · Trang 72+',
    instruction: 'Một hàng ngang có 7 bạn. Có hai hàng dọc, mỗi hàng có 5 bạn cắt ngang qua hai vị trí khác nhau trên hàng ngang. Hỏi có tất cả bao nhiêu bạn?',
    hint: '🤔 Hai bạn đứng tại các điểm giao cắt của hai hàng có mặt trong bao nhiêu hàng cùng một lúc?',
    mascot: { ...BENNY, message: 'Hãy quan sát những bạn đứng ở điểm giao cắt của các hàng nhé!' },
    activity: {
      type: 'queueCounter',
      mode: 'twoEnds',
      fromFront: 7,
      fromBack: 8,
      promptTitle: 'ĐẾM HÀNG CHỮ THẬP ĐÔI (2 GIAO ĐIỂM)',
      correctTotal: 15,
      formula: '7 (ngang) + 5 (dọc 1) + 5 (dọc 2) - 2 giao điểm = 15 bạn',
      options: [14, 15, 16, 17]
    }
  },
  {
    id: 'log-23',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp xếp chỗ ngồi 5 bạn trong rạp hát',
    badgeTitle: 'Bài Nâng Cao 9.1 · Trang 72+',
    instruction: 'Năm bạn ngồi ở dãy ghế từ Ghế 1 (trái) đến Ghế 5 (phải):\n• Chuột Casey ngồi ở Ghế 1 ngoài cùng bên trái.\n• Bác sĩ Mayle ngồi ở Ghế 3 chính giữa.\n• Khỉ Benny ngồi ở Ghế 2 bên cạnh Mayle.\n• Thỏ Abby ngồi ở Ghế 4 bên phải Mayle.\n• Bác Ram ngồi ở Ghế 5 ngoài cùng bên phải.\nHãy xếp đúng vị trí cả 5 bạn!',
    hint: '🤔 Em hãy đối chiếu từng bạn với vị trí ghế được mô tả trong đề bài để xếp vào đúng chỗ nhé.',
    mascot: { ...MAYLE, message: 'Đọc kỹ từng manh mối và xếp các bạn vào đúng vị trí ghế nhé!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 5,
      allowedCharacters: ['Casey', 'Benny', 'Bác sĩ Mayle', 'Abby', 'Bác Ram'],
      correctOrder: ['Casey', 'Benny', 'Bác sĩ Mayle', 'Abby', 'Bác Ram']
    }
  },
  {
    id: 'log-24',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Cân thăng bằng dây chuyền 3 chặng: Dưa, Bưởi, Táo & Dâu',
    badgeTitle: 'Bài Nâng Cao 9.2 · Trang 72+',
    instruction: 'Chuỗi thăng bằng 3 chặng:\n• Cân 1: 1 quả Dưa hấu 🍉 = 2 quả Bưởi 🍈.\n• Cân 2: 1 quả Bưởi 🍈 = 2 quả Táo 🍎.\n• Cân 3: 1 quả Táo 🍎 = 3 quả Dâu tây 🍓.\nHỏi 1 quả Dưa hấu 🍉 thăng bằng với bao nhiêu quả Dâu tây 🍓?',
    hint: '🤔 Em hãy lần theo từng bước quy đổi: Từ dưa hấu qua bưởi, từ bưởi qua táo, và từ táo qua dâu tây nhé.',
    mascot: { ...CASEY, message: 'Quy đổi từng bước một để tìm ra số dâu tây tương ứng nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'CÂN THĂNG BẰNG DÂY CHUYỀN 3 CHẶNG',
      ruleExplanation: '1 Dưa = 2 Bưởi | 1 Bưởi = 2 Táo | 1 Táo = 3 Dâu:',
      scales: [
        {
          leftIcons: ['🍉'],
          leftLabel: '1 Dưa hấu',
          rightIcons: ['🍈', '🍈'],
          rightLabel: '2 quả Bưởi'
        },
        {
          leftIcons: ['🍈'],
          leftLabel: '1 quả Bưởi',
          rightIcons: ['🍎', '🍎'],
          rightLabel: '2 quả Táo'
        },
        {
          leftIcons: ['🍎'],
          leftLabel: '1 quả Táo',
          rightIcons: ['🍓', '🍓', '🍓'],
          rightLabel: '3 quả Dâu tây'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🍉'],
        targetLeftLabel: '1 Dưa hấu = ? quả Dâu tây',
        options: [
          { id: 'opt-8', count: 8, icon: '🍓', label: '8 quả Dâu' },
          { id: 'opt-10', count: 10, icon: '🍓', label: '10 quả Dâu' },
          { id: 'opt-12', count: 12, icon: '🍓', label: '12 quả Dâu (Đúng)' },
          { id: 'opt-16', count: 16, icon: '🍓', label: '16 quả Dâu' }
        ],
        correctOptionId: 'opt-12',
        explanation: 'Quá đỉnh! 1 Dưa = 2 Bưởi = 4 Táo = 4 × 3 = 12 quả Dâu tây!'
      }
    }
  },
  {
    id: 'log-25',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Thám tử thời gian: Sắp xếp 5 bạn nộp bài thi sớm nhất',
    badgeTitle: 'Bài Nâng Cao 10.1 · Trang 72+',
    instruction: 'Xếp thứ tự 5 bạn hoàn thành bài thi từ SỚM NHẤT đến MUỘN NHẤT:\n• Thầy Mayle hoàn thành bài đầu tiên (sớm nhất).\n• Thỏ Abby hoàn thành trước Khỉ Benny.\n• Khỉ Benny nộp bài trước Chuột Casey.\n• Gấu Rory nộp bài sau cùng (muộn nhất).',
    hint: 'Thứ tự từ sớm nhất đến muộn nhất: Thầy Mayle ➔ Thỏ Abby ➔ Khỉ Benny ➔ Chuột Casey ➔ Gấu Rory!',
    mascot: { ...ABBY, message: 'Quan sát các mốc thời gian trước sau để sắp xếp thật chuẩn xác!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự nộp bài từ SỚM NHẤT (Trái) đến MUỘN NHẤT (Phải):',
      directionLabel: 'Nộp sớm nhất ➔ Nộp muộn nhất',
      items: [
        { id: 'Mayle', label: 'Thầy Mayle', description: 'Nộp bài đầu tiên', icon: '👨‍🏫' },
        { id: 'Abby', label: 'Thỏ Abby', description: 'Nộp trước Benny', icon: '🐰' },
        { id: 'Benny', label: 'Khỉ Benny', description: 'Nộp trước Casey', icon: '🐵' },
        { id: 'Casey', label: 'Chuột Casey', description: 'Nộp trước Rory', icon: '🐹' },
        { id: 'Rory', label: 'Gấu Rory', description: 'Nộp bài sau cùng', icon: '🐻' }
      ],
      correctOrder: ['Mayle', 'Abby', 'Benny', 'Casey', 'Rory']
    }
  },
  {
    id: 'log-26',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đại Thử Thách Trạm 5: Vòng tròn 20 bạn & Vị trí đối diện',
    badgeTitle: 'Đại Thử Thách Trạm 5 · Trang 72+',
    instruction: 'Đỉnh cao Trạm 5: Có 20 bạn nhỏ đứng thành một vòng tròn nắm tay cách đều nhau, được đánh số từ 1 đến 20 theo chiều kim đồng hồ. Hỏi bạn số 3 đứng ĐỐI DIỆN TRỰC TIẾP với bạn số mấy?',
    hint: 'Một nửa vòng tròn có 20 : 2 = 10 khoảng cách. Bạn đứng đối diện cách bạn số 3 đúng 10 bước: 3 + 10 = 13!',
    mascot: { ...BENNY, message: 'Chúc mừng bạn đã chinh phục đỉnh cao nhất của Thung Lũng Vị Trí Hàng Ngũ & Suy Luận!' },
    activity: {
      type: 'queueCounter',
      mode: 'circle',
      totalInQueue: 20,
      promptTitle: 'TÌM BẠN ĐỨNG ĐỐI DIỆN TRONG VÒNG TRÒN 20 BẠN',
      correctTotal: 13,
      formula: '3 + (20 : 2) = 13 (Bạn số 13 đối diện bạn số 3)',
      options: [11, 12, 13, 14]
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
    id: 'chal-maze-star-1-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mê cung hoa quả tinh tú của Khỉ Benny',
    badgeTitle: 'Thử Thách 1.2 · Trang 74',
    instruction: 'Tìm đường đi từ Khỉ Benny 🐵 đến Ngôi Sao Vàng ⭐ theo quy luật chu kỳ 3 bước: Chuối 🍌 ➔ Táo 🍎 ➔ Nho 🍇 ➔ Chuối 🍌...',
    hint: 'Bắt đầu từ ô (0,0) có quả Chuối 🍌, bước tiếp theo phải là Táo 🍎, rồi đến Nho 🍇, rồi lại Chuối 🍌!',
    mascot: { ...BENNY, message: 'Nhớ quy luật chu kỳ: Chuối ➔ Táo ➔ Nho nhé bạn ơi!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🍌', '🍎', '🍇'],
      startPos: [0, 0],
      goalPos: [3, 3],
      startIcon: '🐵',
      startLabel: 'Khỉ Benny',
      goalIcon: '⭐',
      goalLabel: 'Sao Vàng',
      ruleTitle: 'Quy luật hoa quả tinh tú:',
      patternDisplay: [
        { icon: '🍌', name: 'Chuối' },
        { icon: '🍎', name: 'Táo' },
        { icon: '🍇', name: 'Nho' }
      ],
      successMessage: 'Tuyệt vời! Khỉ Benny đã hái được Ngôi Sao Vàng tinh tú!',
      grid: [
        ['🍌', '🍎', '🍇', '🍒'],
        ['🍓', '🍇', '🍌', '🍎'],
        ['🍋', '🍎', '🍇', '🍇'],
        ['🍊', '🍌', '🍎', '⭐']
      ],
      targetPath: [
        [0, 0],
        [0, 1],
        [1, 1],
        [1, 2],
        [1, 3],
        [2, 3],
        [3, 3]
      ]
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
        ['wolf', null, null, null, 'unicorn'],
        [null, 'bear', null, 'unicorn', null],
        ['bear', null, null, 'wolf', null],
        [null, 'unicorn', null, null, 'bear'],
        ['unicorn', null, 'monkey', null, 'cow']
      ],
      solution: [
        ['wolf', 'monkey', 'bear', 'cow', 'unicorn'],
        ['monkey', 'bear', 'cow', 'unicorn', 'wolf'],
        ['bear', 'cow', 'unicorn', 'wolf', 'monkey'],
        ['cow', 'unicorn', 'wolf', 'monkey', 'bear'],
        ['unicorn', 'wolf', 'monkey', 'bear', 'cow']
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
        [0, 0, 1, 1, 1, 1],
        [0, 0, 1, 1, 2, 2],
        [0, 0, 3, 3, 2, 2],
        [3, 3, 3, 4, 2, 2],
        [3, 4, 4, 4, 5, 5],
        [4, 4, 5, 5, 5, 5]
      ],
      starsSolution: [
        [0, 0],
        [1, 2],
        [2, 4],
        [3, 1],
        [4, 3],
        [5, 5]
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
        [2, 2, 1, null],
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
    id: 'chal-circle-seats-7-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Bàn tiệc sinh nhật tròn 5 bạn của Benny',
    badgeTitle: 'Thử Thách 7.2 · Trang 82',
    instruction: 'Năm bạn ngồi quanh bàn tiệc sinh nhật từ Ghế 1 đến Ghế 5:\n• Gấu Rory ngồi ở Ghế 1.\n• Chuột Casey ngồi ở Ghế 5.\n• Thỏ Abby ngồi ở vị trí chính giữa (Ghế 3).\n• Khỉ Benny ngồi bên phải Thỏ Abby (Ghế 4).\n• Bác Ram ngồi ở ghế còn lại (Ghế 2).\nHãy xếp đúng vị trí 5 bạn!',
    hint: 'Ghế 1: Rory, Ghế 2: Bác Ram, Ghế 3: Thỏ Abby, Ghế 4: Khỉ Benny, Ghế 5: Chuột Casey!',
    mascot: { ...BENNY, message: 'Bữa tiệc sinh nhật của Benny đông đủ và ấm áp quá!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 5,
      allowedCharacters: ['Rory', 'Bác Ram', 'Thỏ Abby', 'Khỉ Benny', 'Chuột Casey'],
      correctOrder: ['Rory', 'Bác Ram', 'Thỏ Abby', 'Khỉ Benny', 'Chuột Casey']
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
    id: 'chal-magic-triangle-8-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Ma trận số đối xứng tổng bằng 10',
    badgeTitle: 'Thử Thách 8.2 · Trang 85',
    instruction: 'Điền các số thích hợp vào ô trống sao cho tổng các hàng ngang và cột dọc đều bằng đúng 10!',
    hint: 'Hàng 1 có: 4 + ? = 10 => ? = 6. Hàng 2 có: ? + 4 = 10 => ? = 6!',
    mascot: { ...CASEY, message: 'Các số kết hợp với nhau tạo thành tổng 10 thật kỳ diệu!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Trận Số Cặp Đôi Tổng Bằng 10',
      subtitle: 'Tổng mỗi hàng và mỗi cột đều bằng 10',
      targetSum: 10,
      allowedNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      hintFormula: '4 + 6 = 10 và 6 + 4 = 10',
      initialGrid: [
        [4, null],
        [null, 4]
      ],
      solution: [
        [4, 6],
        [6, 4]
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
    id: 'chal-cube-counter-9-2',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm khối lập phương 3D góc khuất nâng cao',
    badgeTitle: 'Thử Thách 9.2 · Trang 85',
    instruction: 'Quan sát kiến trúc không gian 3 chiều 3x3 và đếm tổng số khối lập phương đơn vị, bao gồm cả các khối bị che lấp ở tầng dưới.',
    hint: 'Phân tích từng tầng: Tầng 1 (đáy) có 9 khối, Tầng 2 có 4 khối, Tầng 3 (đỉnh) có 1 khối. Tổng cộng = 9 + 4 + 1 = 14 khối!',
    mascot: { ...MAYLE, message: 'Đếm cẩn thận từng tầng từ đáy lên đỉnh để không bỏ sót khối nào nhé!' },
    activity: {
      type: 'cubeCounter',
      title: 'Đếm Khối Lập Phương 3D Bậc Thầy',
      instructionText: 'Đếm tổng số khối lập phương đơn vị cấu tạo nên khối kim tự tháp 3D dưới đây:',
      gridHeights: [
        [3, 2, 1],
        [2, 2, 1],
        [1, 1, 1]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy 3x3)', count: 9 },
        { layerName: 'Tầng 2 (Tầng giữa)', count: 4 },
        { layerName: 'Tầng 3 (Đỉnh cao nhất)', count: 1 }
      ],
      totalCubes: 14,
      options: [12, 13, 14, 15],
      explanation: 'Cách đếm khoa học theo tầng: Tầng 1 (đáy) có 9 khối, Tầng 2 có 4 khối, Tầng 3 có 1 khối. Tổng cộng: 9 + 4 + 1 = 14 khối lập phương!'
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
        [null, null, 1, null, null],
        [null, 2, 1, 2, null],
        [null, 1, 0, 1, null],
        [null, 2, 1, 2, null],
        [null, null, 1, null, null]
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
  },
  {
    id: 'chal-21',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm khối lập phương 3D tháp bậc thang đa tầng',
    badgeTitle: 'Thử Thách 11.1 · Trang 90+',
    instruction: 'Quan sát mô hình kim tự tháp bậc thang 3 tầng được ghép từ các khối lập phương đơn vị giống hệt nhau. Hỏi có tất cả bao nhiêu khối lập phương?',
    hint: 'Đếm theo từng tầng: Tầng 1 (đáy) có 9 khối; Tầng 2 có 4 khối; Tầng 3 (đỉnh) có 1 khối: 9 + 4 + 1 = 14 khối!',
    mascot: { ...ABBY, message: 'Đếm theo từng tầng từ dưới lên trên hoặc cộng các cột trụ lại nhé!' },
    activity: {
      type: 'cubeCounter',
      title: 'ĐẾM KHỐI LẬP PHƯƠNG THÁP BẬC THANG',
      instructionText: 'Đếm tổng số khối lập phương đơn vị tạo nên mô hình tháp bậc thang 3 tầng:',
      gridHeights: [
        [3, 2, 1],
        [2, 2, 1],
        [1, 1, 1]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy 3x3)', count: 9 },
        { layerName: 'Tầng 2 (Bậc 2x2)', count: 4 },
        { layerName: 'Tầng 3 (Đỉnh chóp)', count: 1 }
      ],
      totalCubes: 14,
      options: [12, 13, 14, 15],
      explanation: 'Tổng số khối lập phương là: 9 (tầng đáy) + 4 (tầng 2) + 1 (tầng 3) = 14 khối!'
    }
  },
  {
    id: 'chal-22',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Giải mã két sắt mật mã Thần Kỳ 3 chữ số',
    badgeTitle: 'Thử Thách 11.2 · Trang 90+',
    instruction: 'Sử dụng các manh mối suy luận logic loại trừ để tìm mật mã két sắt 3 chữ số chứa Cúp Kim Cương!',
    hint: '🤔 Em hãy quan sát manh mối nào loại trừ được nhiều chữ số nhất trước, rồi đối chiếu vị trí của các số còn lại trong các manh mối khác nhé.',
    mascot: { ...CASEY, message: 'Thử thách thám tử Mastermind: kết hợp suy luận loại trừ để mở két sắt!' },
    activity: {
      type: 'treasureVault',
      title: 'KÉT SẮT MẬT MÃ KIM CƯƠNG (3 CHỮ SỐ)',
      codeLength: 3,
      solutionCode: [4, 7, 2],
      clues: [
        {
          attempt: [1, 2, 3],
          correctDigits: 1,
          correctPositions: 0,
          description: '1 chữ số đúng nhưng SAI vị trí'
        },
        {
          attempt: [4, 5, 6],
          correctDigits: 1,
          correctPositions: 1,
          description: '1 chữ số đúng và ĐÚNG vị trí'
        },
        {
          attempt: [8, 7, 0],
          correctDigits: 1,
          correctPositions: 1,
          description: '1 chữ số đúng và ĐÚNG vị trí'
        },
        {
          attempt: [9, 1, 8],
          correctDigits: 0,
          correctPositions: 0,
          description: 'Không có chữ số nào đúng trong 3 số này'
        }
      ]
    }
  },
  {
    id: 'chal-23',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đấu trường Cân thăng bằng bốn loài mãnh thú',
    badgeTitle: 'Thử Thách 12.1 · Trang 90+',
    instruction: 'Quan sát chuỗi 3 chiếc cân thăng bằng trong rừng xanh:\n• Cân 1: 1 chú Hổ 🐯 = 2 chú Báo 🐆.\n• Cân 2: 1 chú Báo 🐆 = 2 chú Sói 🐺.\n• Cân 3: 1 chú Sói 🐺 = 3 chú Cáo 🦊.\nHỏi 1 chú Hổ 🐯 nặng bằng bao nhiêu chú Cáo 🦊?',
    hint: '🤔 Em hãy đi từng bước một: Mỗi chú hổ bằng mấy chú báo? Mỗi chú báo lại bằng mấy chú sói? Và mỗi chú sói bằng mấy chú cáo?',
    mascot: { ...BENNY, message: 'Dùng tư duy bắc cầu thay thế liên tiếp qua từng nấc cân nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'CÂN THĂNG BẰNG 4 LOÀI MÃNH THÚ',
      ruleExplanation: '1 Hổ = 2 Báo | 1 Báo = 2 Sói | 1 Sói = 3 Cáo:',
      scales: [
        {
          leftIcons: ['🐯'],
          leftLabel: '1 chú Hổ',
          rightIcons: ['🐆', '🐆'],
          rightLabel: '2 chú Báo'
        },
        {
          leftIcons: ['🐆'],
          leftLabel: '1 chú Báo',
          rightIcons: ['🐺', '🐺'],
          rightLabel: '2 chú Sói'
        },
        {
          leftIcons: ['🐺'],
          leftLabel: '1 chú Sói',
          rightIcons: ['🦊', '🦊', '🦊'],
          rightLabel: '3 chú Cáo'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🐯'],
        targetLeftLabel: '1 chú Hổ = ? chú Cáo',
        options: [
          { id: 'opt-8', count: 8, icon: '🦊', label: '8 chú Cáo' },
          { id: 'opt-10', count: 10, icon: '🦊', label: '10 chú Cáo' },
          { id: 'opt-12', count: 12, icon: '🦊', label: '12 chú Cáo (Đúng)' },
          { id: 'opt-16', count: 16, icon: '🦊', label: '16 chú Cáo' }
        ],
        correctOptionId: 'opt-12',
        explanation: 'Tuyệt đỉnh! 1 Hổ = 2 Báo = 4 Sói = 4 × 3 = 12 chú Cáo 🦊!'
      }
    }
  },
  {
    id: 'chal-24',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pixidoku 5x5: Vương Quốc Thần Thoại',
    badgeTitle: 'Thử Thách 12.2 · Trang 90+',
    instruction: 'Điền các linh thú thần thoại vào ô trống sao cho mỗi hàng và mỗi cột đều có đủ 5 linh thú: 🦄 Kỳ Lân, 🐉 Rồng Vàng, 🦅 Đại Bàng, 🦁 Sư Tử, 🐬 Cá Heo.',
    hint: 'Tìm hàng hoặc cột chỉ còn thiếu đúng 1 bạn linh thú để điền trước nhé!',
    mascot: { ...MAYLE, message: 'Pixidoku 5x5 thần thoại đòi hỏi sự tập trung tuyệt đối của một kiện tướng!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'unicorn', icon: '🦄', name: 'Kỳ Lân' },
        { id: 'dragon', icon: '🐉', name: 'Rồng Vàng' },
        { id: 'eagle', icon: '🦅', name: 'Đại Bàng' },
        { id: 'lion', icon: '🦁', name: 'Sư Tử' },
        { id: 'dolphin', icon: '🐬', name: 'Cá Heo' }
      ],
      initialGrid: [
        ['unicorn', 'dragon', 'eagle', null, 'dolphin'],
        ['dragon', null, 'dolphin', 'unicorn', 'eagle'],
        ['eagle', 'dolphin', null, 'dragon', 'unicorn'],
        ['lion', 'unicorn', 'dragon', 'dolphin', null],
        [null, 'eagle', 'unicorn', 'lion', 'dragon']
      ],
      solution: [
        ['unicorn', 'dragon', 'eagle', 'lion', 'dolphin'],
        ['dragon', 'lion', 'dolphin', 'unicorn', 'eagle'],
        ['eagle', 'dolphin', 'lion', 'dragon', 'unicorn'],
        ['lion', 'unicorn', 'dragon', 'dolphin', 'eagle'],
        ['dolphin', 'eagle', 'unicorn', 'lion', 'dragon']
      ]
    }
  },
  {
    id: 'chal-25',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm khối lập phương 3D khuyết hầm chữ U',
    badgeTitle: 'Thử Thách 13.1 · Trang 90+',
    instruction: 'Quan sát khối kiến trúc 3D đặc biệt: Hình vuông 3x3 nhưng ở chính giữa bị đục rỗng thành đường hầm xuyên suốt. Mỗi cột xung quanh cao 3 khối. Hỏi có tất cả bao nhiêu khối lập phương?',
    hint: 'Có 8 cột xung quanh, mỗi cột cao đúng 3 khối lập phương: 8 × 3 = 24 khối!',
    mascot: { ...ABBY, message: 'Chú ý ô chính giữa cao bằng 0 vì đã bị khoét thành đường hầm rỗng nhé!' },
    activity: {
      type: 'cubeCounter',
      title: 'ĐẾM KHỐI LẬP PHƯƠNG KHUYẾT HẦM XUYÊN TÂM',
      instructionText: 'Đếm tổng số khối lập phương tạo nên tòa tháp hầm rỗng xuyên tâm:',
      gridHeights: [
        [3, 3, 3],
        [3, 0, 3],
        [3, 3, 3]
      ],
      layers: [
        { layerName: 'Tầng 1 (8 khối bao quanh)', count: 8 },
        { layerName: 'Tầng 2 (8 khối bao quanh)', count: 8 },
        { layerName: 'Tầng 3 (8 khối bao quanh)', count: 8 }
      ],
      totalCubes: 24,
      options: [21, 22, 24, 27],
      explanation: 'Có 8 cột, mỗi cột cao 3 khối: 8 × 3 = 24 khối lập phương!'
    }
  },
  {
    id: 'chal-26',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Giải mã két sắt Siêu Cấp 4 chữ số bí ẩn',
    badgeTitle: 'Thử Thách 13.2 · Trang 90+',
    instruction: 'Két sắt bảo mật 4 chữ số tối cao. Sử dụng 3 manh mối để tìm ra dãy 4 số chuẩn xác mở khóa két sắt!',
    hint: '🤔 Em hãy phân tích xem các cặp số ở manh mối 2 và 3 có vị trí cụ thể thế nào để kết hợp lại với nhau nhé.',
    mascot: { ...CASEY, message: 'Ghép nối các manh mối về vị trí chính xác để tìm ra mật mã két sắt!' },
    activity: {
      type: 'treasureVault',
      title: 'KÉT SẮT BẢO MẬT TỐI CAO (4 CHỮ SỐ)',
      codeLength: 4,
      solutionCode: [3, 8, 1, 5],
      clues: [
        {
          attempt: [1, 2, 3, 4],
          correctDigits: 2,
          correctPositions: 0,
          description: '2 chữ số đúng nhưng SAI vị trí'
        },
        {
          attempt: [3, 8, 9, 0],
          correctDigits: 2,
          correctPositions: 2,
          description: '2 chữ số đúng và ĐÚNG vị trí'
        },
        {
          attempt: [7, 6, 1, 5],
          correctDigits: 2,
          correctPositions: 2,
          description: '2 chữ số đúng và ĐÚNG vị trí'
        }
      ]
    }
  },
  {
    id: 'chal-27',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Ma Phương Magic Square 3x3 Đỉnh Cao (Tổng = 27)',
    badgeTitle: 'Thử Thách 14.1 · Trang 90+',
    instruction: 'Sử dụng các số từ 5 đến 13 để điền vào ma phương 3x3 sao cho tổng mỗi hàng, cột và 2 đường chéo đều đúng bằng 27!',
    hint: '🤔 Em hãy quan sát các hàng hoặc cột đã có sẵn 2 số để tìm số còn thiếu sao cho tổng đạt đúng 27 nhé.',
    mascot: { ...BENNY, message: 'Mỗi hàng và mỗi cột đều có tổng đúng bằng 27, tính toán cẩn thận từng hàng nhé!' },
    activity: {
      type: 'numberMatrix',
      title: 'SIÊU MA PHƯƠNG TỔNG 27',
      subtitle: 'Điền các số từ 5 đến 13 sao cho tổng mỗi hàng và mỗi cột đều bằng 27',
      targetSum: 27,
      allowedNumbers: [5, 6, 7, 8, 9, 10, 11, 12, 13],
      initialGrid: [
        [12, null, 10],
        [null, 9, null],
        [8, null, 6]
      ],
      solution: [
        [12, 5, 10],
        [7, 9, 11],
        [8, 13, 6]
      ]
    }
  },
  {
    id: 'chal-28',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đấu trường Cân thăng bằng bài toán Tổng - Tỉ',
    badgeTitle: 'Thử Thách 14.2 · Trang 90+',
    instruction: 'Hai người bạn thân cùng leo lên bàn cân:\n• Cân 1: 1 chú Gấu 🐻 và 1 chú Thỏ 🐰 nặng tổng cộng 12 kg.\n• Cân 2: 1 chú Gấu 🐻 nặng gấp 3 lần 1 chú Thỏ 🐰 (Gấu = 3 Thỏ).\nHỏi chú Gấu 🐻 nặng bao nhiêu kg?',
    hint: '🤔 Nếu coi cân nặng của chú thỏ là 1 phần thì chú gấu chiếm mấy phần? Tổng cân nặng 12 kg tương ứng với tất cả bao nhiêu phần bằng nhau?',
    mascot: { ...MAYLE, message: 'Dùng sơ đồ đoạn thẳng biểu diễn số phần bằng nhau để giải nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'BÀI TOÁN CÂN TỔNG - TỈ GẤU VÀ THỎ',
      ruleExplanation: 'Gấu + Thỏ = 12 kg | Gấu = 3 Thỏ:',
      scales: [
        {
          leftIcons: ['🐻', '🐰'],
          leftLabel: 'Gấu + Thỏ',
          rightIcons: ['⚖️', '⚖️'],
          rightLabel: '12 kg'
        },
        {
          leftIcons: ['🐻'],
          leftLabel: '1 chú Gấu',
          rightIcons: ['🐰', '🐰', '🐰'],
          rightLabel: '3 chú Thỏ'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🐻'],
        targetLeftLabel: '1 chú Gấu = ? kg',
        options: [
          { id: 'opt-6', count: 6, icon: '⚖️', label: '6 kg' },
          { id: 'opt-8', count: 8, icon: '⚖️', label: '8 kg' },
          { id: 'opt-9', count: 9, icon: '⚖️', label: '9 kg (Chính xác)' },
          { id: 'opt-10', count: 10, icon: '⚖️', label: '10 kg' }
        ],
        correctOptionId: 'opt-9',
        explanation: 'Rất xuất sắc! Thỏ nặng 3 kg, Gấu nặng 9 kg (9 + 3 = 12 kg và 9 = 3 × 3)!'
      }
    }
  },
  {
    id: 'chal-29',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm khối lập phương 3D Tòa Lâu Đài 4 tầng',
    badgeTitle: 'Thử Thách 15.1 · Trang 90+',
    instruction: 'Mô hình Tòa Lâu Đài kiên cố gồm 4 tháp góc cao 4 tầng, tường bao cao 2 tầng và tháp trung tâm cao 3 tầng. Hỏi cần tất cả bao nhiêu khối lập phương để xây dựng?',
    hint: 'Cộng chiều cao các cột: 4 góc cao 4 tầng (4 × 4 = 16); 4 tường bao cao 2 tầng (4 × 2 = 8); 1 tháp trung tâm cao 3 tầng (1 × 3 = 3): 16 + 8 + 3 = 27 khối!',
    mascot: { ...ABBY, message: 'Kiểm tra từng tháp: 4 tháp góc, 4 tường và 1 tháp giữa!' },
    activity: {
      type: 'cubeCounter',
      title: 'ĐẾM KHỐI LẬP PHƯƠNG TÒA LÂU ĐÀI 4 TẦNG',
      instructionText: 'Đếm tổng số khối lập phương tạo nên tòa lâu đài hoàng gia:',
      gridHeights: [
        [4, 2, 4],
        [2, 3, 2],
        [4, 2, 4]
      ],
      layers: [
        { layerName: 'Tầng 1 (9 khối đáy đầy đủ)', count: 9 },
        { layerName: 'Tầng 2 (9 khối tường & tháp)', count: 9 },
        { layerName: 'Tầng 3 (5 khối tháp chính & góc)', count: 5 },
        { layerName: 'Tầng 4 (4 khối đỉnh tháp góc)', count: 4 }
      ],
      totalCubes: 27,
      options: [24, 25, 27, 30],
      explanation: 'Tổng số khối lập phương là: (4 × 4) + (4 × 2) + 3 = 16 + 8 + 3 = 27 khối!'
    }
  },
  {
    id: 'chal-30',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'ĐẠI CHUNG KẾT VÔ ĐỊCH TOÁN TƯ DUY LỚP 3',
    badgeTitle: 'ĐẠI CHUNG KẾT · HUY CHƯƠNG VÀNG',
    instruction: 'Vượt qua 3 câu hỏi tích hợp đỉnh cao liên trạm để bước lên bục vinh quang, nhận HUY CHƯƠNG VÀNG QUỐC GIA và Cúp Vô Địch Spark Math!',
    hint: 'Vận dụng toàn diện: biểu đồ hình ảnh, bài toán thể tích rót nước cân bằng và quy luật số trung tâm ma phương!',
    mascot: { ...MAYLE, message: 'Chúc mừng em đã đi đến trận chung kết tối cao! Em là niềm tự hào của cả học viện!' },
    activity: {
      type: 'grandFinale',
      title: 'Đại Chung Kết Vô Địch Spark Math',
      roundQuestions: [
        {
          id: 'super-q1',
          category: 'Biểu Đồ Hình Ảnh & Tỷ Lệ Nhân',
          question: 'Một biểu đồ tranh có 3 cột: Cột A có 3 ngôi sao ⭐, Cột B có 5 ngôi sao ⭐, Cột C có 4 ngôi sao ⭐. Biết mỗi ngôi sao thể hiện cho 6 điểm số. Hỏi cả 3 cột có tất cả bao nhiêu điểm?',
          options: [
            { id: 'sq1-a', text: '60 điểm', isCorrect: false },
            { id: 'sq1-b', text: '66 điểm', isCorrect: false },
            { id: 'sq1-c', text: '72 điểm', isCorrect: true },
            { id: 'sq1-d', text: '78 điểm', isCorrect: false }
          ],
          explanation: 'Tổng số ngôi sao: 3 + 5 + 4 = 12 ngôi sao. Mỗi ngôi sao ứng với 6 điểm: 12 × 6 = 72 điểm!'
        },
        {
          id: 'super-q2',
          category: 'Thể Tích & San Sẻ Nước Cân Bằng',
          question: 'Có 3 can nước A, B, C chứa tổng cộng 27 lít nước. Nếu rót từ can A sang can B đúng 2 lít thì lượng nước ở cả 3 can bằng nhau. Hỏi lúc đầu can A có bao nhiêu lít nước?',
          options: [
            { id: 'sq2-a', text: '9 lít', isCorrect: false },
            { id: 'sq2-b', text: '10 lít', isCorrect: false },
            { id: 'sq2-c', text: '11 lít', isCorrect: true },
            { id: 'sq2-d', text: '12 lít', isCorrect: false }
          ],
          explanation: 'Khi lượng nước bằng nhau, mỗi can có: 27 : 3 = 9 lít. Vì can A đã bớt đi 2 lít mới còn 9 lít nên lúc đầu can A có: 9 + 2 = 11 lít nước!'
        },
        {
          id: 'super-q3',
          category: 'Sudoku & Ma Phương Số Học',
          question: 'Một ô vuông ma thuật (Magic Square 3x3) có tổng các số trên mỗi hàng, mỗi cột và mỗi đường chéo đều bằng 36. Hỏi con số nằm ở Ô CHÍNH GIỮA ma trận là số bao nhiêu?',
          options: [
            { id: 'sq3-a', text: '10', isCorrect: false },
            { id: 'sq3-b', text: '11', isCorrect: false },
            { id: 'sq3-c', text: '12', isCorrect: true },
            { id: 'sq3-d', text: '14', isCorrect: false }
          ],
          explanation: 'Theo quy luật toán học ma phương 3x3, số ở ô chính giữa luôn bằng 1/3 tổng mục tiêu: 36 : 3 = 12!'
        }
      ]
    }
  }
];
