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

export interface ChoiceQuestion {
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

export const BENNY: Mascot = { name: 'Khỉ Benny', avatar: '🐵', message: '' };
export const ABBY: Mascot = { name: 'Thỏ Abby', avatar: '🐰', message: '' };
export const CASEY: Mascot = { name: 'Chuột Casey', avatar: '🐹', message: '' };
export const MAYLE: Mascot = { name: 'Thầy Mayle', avatar: '👨‍🏫', message: '' };

export const topicName = (id: string) => TOPICS.find((t) => t.id === id)?.title ?? '';
