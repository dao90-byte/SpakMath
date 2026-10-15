// Lesson catalogue for the Spark Math grade 3 adventure.
// Each lesson references one interactive activity component in `components/activities`.

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
      items: { id: string; label: string; icon: string; count: number; actualValue?: number }[];
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
    subtitle: 'Đọc và vẽ biểu đồ tranh, mỗi biểu tượng có thể đại diện cho nhiều đơn vị.',
    mascotName: 'Khỉ Benny',
    bgGradient: 'from-amber-400 to-orange-500'
  },
  {
    id: 'volume',
    title: 'Thể Tích (Lít)',
    subtitle: 'So sánh lượng nước trong các bình và giải toán có lời văn với đơn vị lít.',
    mascotName: 'Thỏ Abby',
    bgGradient: 'from-sky-400 to-blue-600'
  },
  {
    id: 'sudoku',
    title: 'Sudoku Vui Nhộn',
    subtitle: 'Điền hình, số và con vật sao cho mỗi hàng, mỗi cột không lặp lại.',
    mascotName: 'Chuột Casey',
    bgGradient: 'from-emerald-400 to-teal-600'
  },
  {
    id: 'pattern',
    title: 'Quy Luật & Mê Cung',
    subtitle: 'Tìm quy luật lặp lại, đi theo đường hoa và săn những ngôi sao ẩn.',
    mascotName: 'Thỏ Abby',
    bgGradient: 'from-purple-400 to-fuchsia-600'
  },
  {
    id: 'logic',
    title: 'Logic Hàng Ngũ',
    subtitle: 'Đếm số người trong hàng, xếp hàng chữ L, chữ T và sắp xếp chỗ ngồi.',
    mascotName: 'Khỉ Benny',
    bgGradient: 'from-rose-400 to-pink-600'
  }
];

const BENNY = { name: 'Khỉ Benny', avatar: '🐵' };
const ABBY = { name: 'Thỏ Abby', avatar: '🐰' };
const CASEY = { name: 'Chuột Casey', avatar: '🐹' };

const topicName = (id: string) => TOPICS.find((t) => t.id === id)?.title ?? '';

export const ALL_LESSONS: LessonQuestion[] = [
  // ───────── Trạm 1: Biểu đồ hình ảnh ─────────
  {
    id: 'pic-1',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Trái cây yêu thích',
    badgeTitle: 'Bài 1',
    instruction: 'Quan sát biểu đồ trái cây yêu thích của lớp 3A rồi trả lời các câu hỏi.',
    hint: 'Mỗi biểu tượng 🙂 là 1 bạn. Hãy đếm cẩn thận từng hàng nhé!',
    mascot: { ...BENNY, message: 'Chào bạn! Mình cùng đếm xem các bạn thích trái cây nào nhất nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi 🙂 = 1 bạn học sinh',
      items: [
        { id: 'apple', label: 'Táo 🍎', icon: '🙂', count: 5 },
        { id: 'banana', label: 'Chuối 🍌', icon: '🙂', count: 7 },
        { id: 'mango', label: 'Xoài 🥭', icon: '🙂', count: 4 },
        { id: 'grape', label: 'Nho 🍇', icon: '🙂', count: 6 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Trái cây nào được nhiều bạn yêu thích nhất?',
          options: ['Táo', 'Chuối', 'Xoài', 'Nho'],
          correctAnswer: 'Chuối'
        },
        {
          id: 'q2',
          prompt: 'Số bạn thích Nho nhiều hơn số bạn thích Xoài là bao nhiêu?',
          options: ['1', '2', '3', '4'],
          correctAnswer: '2'
        },
        {
          id: 'q3',
          prompt: 'Lớp 3A có tất cả bao nhiêu bạn?',
          options: ['20', '21', '22', '23'],
          correctAnswer: '22'
        }
      ]
    }
  },
  {
    id: 'pic-2',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Sách thư viện (mỗi hình = 2)',
    badgeTitle: 'Bài 2',
    instruction: 'Mỗi quyển sách 📘 trong biểu đồ tượng trưng cho 2 quyển. Đọc biểu đồ và trả lời câu hỏi.',
    hint: 'Lấy số biểu tượng nhân với 2 để ra số quyển sách thật.',
    mascot: { ...BENNY, message: 'Cẩn thận nha, mỗi hình ở đây không phải là 1 đâu!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: 'Mỗi 📘 = 2 quyển sách',
      multiplier: 2,
      items: [
        { id: 'mon', label: 'Thứ Hai', icon: '📘', count: 3, actualValue: 6 },
        { id: 'tue', label: 'Thứ Ba', icon: '📘', count: 5, actualValue: 10 },
        { id: 'wed', label: 'Thứ Tư', icon: '📘', count: 2, actualValue: 4 },
        { id: 'thu', label: 'Thứ Năm', icon: '📘', count: 4, actualValue: 8 }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Thứ Ba thư viện cho mượn bao nhiêu quyển sách?',
          options: ['5', '8', '10', '12'],
          correctAnswer: '10'
        },
        {
          id: 'q2',
          prompt: 'Thứ Năm cho mượn nhiều hơn Thứ Tư bao nhiêu quyển?',
          options: ['2', '4', '6', '8'],
          correctAnswer: '4'
        },
        {
          id: 'q3',
          prompt: 'Cả 4 ngày thư viện cho mượn tất cả bao nhiêu quyển?',
          options: ['14', '24', '28', '30'],
          correctAnswer: '28'
        }
      ]
    }
  },
  {
    id: 'pic-3',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Vẽ biểu đồ mùa yêu thích',
    badgeTitle: 'Bài 3',
    instruction:
      'Có 24 bạn bình chọn mùa yêu thích: Xuân 8 bạn, Hạ 6 bạn, Thu 4 bạn, Đông 6 bạn. Mỗi ô biểu tượng là 2 bạn. Hãy xếp đúng số ô cho từng mùa.',
    hint: 'Lấy số bạn chia cho 2 để biết cần bao nhiêu ô. Ví dụ Xuân: 8 : 2 = 4 ô.',
    mascot: { ...BENNY, message: 'Đến lượt bạn làm họa sĩ biểu đồ rồi!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 2,
      totalPeople: 24,
      categories: [
        { id: 'spring', label: 'Mùa Xuân 🌸', targetSymbols: 4, symbolColor: 'bg-pink-400' },
        { id: 'summer', label: 'Mùa Hạ ☀️', targetSymbols: 3, symbolColor: 'bg-amber-400' },
        { id: 'autumn', label: 'Mùa Thu 🍂', targetSymbols: 2, symbolColor: 'bg-orange-500' },
        { id: 'winter', label: 'Mùa Đông ❄️', targetSymbols: 3, symbolColor: 'bg-sky-400' }
      ]
    }
  },

  // ───────── Trạm 2: Thể tích (Lít) ─────────
  {
    id: 'vol-1',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bình nào nhiều nước hơn?',
    badgeTitle: 'Bài 1',
    instruction: 'Ba bình giống hệt nhau chứa lượng nước khác nhau. Quan sát mực nước rồi trả lời câu hỏi.',
    hint: 'Các bình giống nhau nên mực nước càng cao thì nước càng nhiều.',
    mascot: { ...ABBY, message: 'Ồ, các bình nước này cao thấp khác nhau kìa!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'A', label: 'Bình A', levelPercent: 70, color: 'bg-sky-400' },
        { id: 'B', label: 'Bình B', levelPercent: 40, color: 'bg-sky-400' },
        { id: 'C', label: 'Bình C', levelPercent: 90, color: 'bg-sky-400' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Bình nào chứa nhiều nước nhất?',
          options: ['Bình A', 'Bình B', 'Bình C'],
          correctAnswer: 'Bình C'
        },
        {
          id: 'q2',
          prompt: 'Bình nào chứa ít nước nhất?',
          options: ['Bình A', 'Bình B', 'Bình C'],
          correctAnswer: 'Bình B'
        }
      ]
    }
  },
  {
    id: 'vol-2',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Rót nước cho bình A',
    badgeTitle: 'Bài 2',
    instruction: 'Kéo thanh trượt để điều chỉnh mực nước sao cho bình A chứa nhiều nước hơn bình B.',
    hint: 'Hãy làm mực nước bình A cao hơn bình B nhé.',
    mascot: { ...ABBY, message: 'Bạn giúp mình rót nước được không?' },
    activity: {
      type: 'volumeSlider',
      bottles: [
        { id: 'A', name: 'Bình A', initial: 30, capacity: 100 },
        { id: 'B', name: 'Bình B', initial: 60, capacity: 100 }
      ],
      targetCondition: 'A_GREATER_THAN_B'
    }
  },
  {
    id: 'vol-3',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ đồ đoạn thẳng: Lít nước',
    badgeTitle: 'Bài 3',
    instruction:
      'Thùng xanh chứa 12 lít nước. Thùng đỏ chứa nhiều hơn thùng xanh 5 lít. Dùng sơ đồ đoạn thẳng để trả lời câu hỏi.',
    hint: 'Thùng đỏ = 12 + 5. Cả hai thùng = thùng xanh + thùng đỏ.',
    mascot: { ...ABBY, message: 'Vẽ sơ đồ giúp mình nhìn bài toán rõ hơn đấy!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Thùng xanh', lengthVal: 12, display: '12 L', color: 'bg-sky-500' },
        {
          label: 'Thùng đỏ',
          lengthVal: 17,
          display: '? L',
          parts: [
            { val: 12, label: '12 L' },
            { val: 5, label: '5 L' }
          ],
          color: 'bg-rose-500'
        }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thùng đỏ chứa bao nhiêu lít nước?',
          options: ['7 L', '15 L', '17 L', '19 L'],
          correctAnswer: '17 L'
        },
        {
          id: 'q2',
          prompt: 'Cả hai thùng chứa tất cả bao nhiêu lít nước?',
          options: ['24 L', '27 L', '29 L', '31 L'],
          correctAnswer: '29 L'
        }
      ]
    }
  },

  // ───────── Trạm 3: Sudoku ─────────
  {
    id: 'sud-1',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku hình học 4×4',
    badgeTitle: 'Bài 1',
    instruction:
      'Điền các hình ⚪ 🟥 🔺 ⭐ vào ô trống sao cho mỗi hàng, mỗi cột và mỗi ô vuông 2×2 đều có đủ 4 hình khác nhau.',
    hint: 'Tìm hàng hoặc cột chỉ còn thiếu 1 hình rồi điền trước.',
    mascot: { ...CASEY, message: 'Mỗi hình chỉ xuất hiện 1 lần trong mỗi hàng và cột nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'circle', icon: '⚪', name: 'Hình tròn' },
        { id: 'square', icon: '🟥', name: 'Hình vuông' },
        { id: 'triangle', icon: '🔺', name: 'Tam giác' },
        { id: 'star', icon: '⭐', name: 'Ngôi sao' }
      ],
      initialGrid: [
        ['circle', null, 'triangle', null],
        [null, 'star', null, 'square'],
        ['square', null, 'star', null],
        [null, 'triangle', null, 'circle']
      ],
      solution: [
        ['circle', 'square', 'triangle', 'star'],
        ['triangle', 'star', 'circle', 'square'],
        ['square', 'circle', 'star', 'triangle'],
        ['star', 'triangle', 'square', 'circle']
      ]
    }
  },
  {
    id: 'sud-2',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku số 4×4',
    badgeTitle: 'Bài 2',
    instruction:
      'Điền các số 1, 2, 3, 4 vào ô trống sao cho mỗi hàng, mỗi cột và mỗi ô vuông 2×2 không có số nào lặp lại.',
    hint: 'Mỗi hàng phải có đủ 1, 2, 3, 4. Xem hàng đó còn thiếu số nào.',
    mascot: { ...CASEY, message: 'Giờ thử sức với các con số nào!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [1, null, null, 4],
        [null, 4, 1, null],
        [2, null, 4, null],
        [null, 3, null, 1]
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
    id: 'sud-3',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Pixidoku con vật 5×5',
    badgeTitle: 'Bài 3',
    instruction: 'Điền 5 con vật vào bảng sao cho mỗi hàng và mỗi cột đều có đủ 5 con vật khác nhau.',
    hint: 'Bắt đầu từ hàng hoặc cột có nhiều ô đã điền nhất.',
    mascot: { ...CASEY, message: 'Các bạn thú đang chờ được xếp chỗ đấy!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'cat', icon: '🐱', name: 'Mèo' },
        { id: 'dog', icon: '🐶', name: 'Chó' },
        { id: 'frog', icon: '🐸', name: 'Ếch' },
        { id: 'pig', icon: '🐷', name: 'Heo' },
        { id: 'chick', icon: '🐥', name: 'Gà con' }
      ],
      initialGrid: [
        ['cat', 'dog', null, 'pig', null],
        [null, 'pig', 'chick', null, 'dog'],
        ['chick', null, 'dog', 'frog', null],
        ['dog', 'frog', null, null, 'cat'],
        [null, 'chick', 'cat', 'dog', null]
      ],
      solution: [
        ['cat', 'dog', 'frog', 'pig', 'chick'],
        ['frog', 'pig', 'chick', 'cat', 'dog'],
        ['chick', 'cat', 'dog', 'frog', 'pig'],
        ['dog', 'frog', 'pig', 'chick', 'cat'],
        ['pig', 'chick', 'cat', 'dog', 'frog']
      ]
    }
  },

  // ───────── Trạm 4: Quy luật & Mê cung ─────────
  {
    id: 'pat-1',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Đoàn diễu hành thú',
    badgeTitle: 'Bài 1',
    instruction: 'Các con vật xếp hàng theo một quy luật lặp lại. Hãy tìm con vật trong Hộp 1 và Hộp 2.',
    hint: 'Nhóm 4 con vật được lặp lại: 🐰 🐱 🐻 🐵.',
    mascot: { ...ABBY, message: 'Đoàn diễu hành có hai bạn đang trốn, tìm giúp mình nhé!' },
    activity: {
      type: 'patternAnimals',
      sequence: [
        { id: 1, name: 'Thỏ', icon: '🐰' },
        { id: 2, name: 'Mèo', icon: '🐱' },
        { id: 3, name: 'Gấu', icon: '🐻' },
        { id: 4, name: 'Khỉ', icon: '🐵' },
        { id: 5, name: 'Thỏ', icon: '🐰' },
        { id: 6, name: 'Mèo', icon: '🐱' },
        { id: 7, name: 'Gấu', icon: '🐻' },
        { id: 8, name: 'Khỉ', icon: '❓', isMissing: true, answer: '🐵 Khỉ con' },
        { id: 9, name: 'Thỏ', icon: '🐰' },
        { id: 10, name: 'Mèo', icon: '🐱' },
        { id: 11, name: 'Gấu', icon: '❓', isMissing: true, answer: '🐻 Chú gấu' },
        { id: 12, name: 'Khỉ', icon: '🐵' }
      ],
      choices: ['🐰 Thỏ trắng', '🐱 Mèo mướp', '🐻 Chú gấu', '🐵 Khỉ con'],
      target1: '🐵 Khỉ con',
      target2: '🐻 Chú gấu'
    }
  },
  {
    id: 'pat-2',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê cung vườn hoa',
    badgeTitle: 'Bài 2',
    instruction:
      'Giúp Thỏ Abby đi tới chỗ Chuột Casey bằng cách bước lần lượt theo quy luật hoa: 🌸 → 🌼 → 🌺 → 💠 → 🌸 ...',
    hint: 'Mỗi bước chỉ được đi sang ô bên cạnh và phải đúng loài hoa tiếp theo trong quy luật.',
    mascot: { ...ABBY, message: 'Đi đúng thứ tự hoa mới không bị lạc nha!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🌸', '🌼', '🌺', '💠']
    }
  },
  {
    id: 'pat-3',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Săn sao Star Battle',
    badgeTitle: 'Bài 3',
    instruction:
      'Đặt 6 ngôi sao vào bảng sao cho mỗi hàng, mỗi cột và mỗi vùng màu có đúng 1 ngôi sao. Hai ngôi sao không được chạm nhau, kể cả chéo góc.',
    hint: 'Vùng màu chỉ có 1 ô chắc chắn chứa ngôi sao — hãy bắt đầu từ đó!',
    mascot: { ...CASEY, message: 'Những ngôi sao lấp lánh đang trốn trong bảng!' },
    activity: {
      type: 'starBattle',
      size: 6,
      targetStarCount: 6,
      regions: [
        [1, 1, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0],
        [1, 1, 2, 0, 0, 0],
        [4, 4, 4, 0, 0, 3],
        [4, 4, 4, 4, 5, 3],
        [4, 4, 4, 4, 5, 5]
      ],
      starsSolution: [
        [0, 3],
        [1, 0],
        [2, 2],
        [3, 5],
        [4, 1],
        [5, 4]
      ]
    }
  },

  // ───────── Trạm 5: Logic hàng ngũ ─────────
  {
    id: 'log-1',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng có bao nhiêu bạn?',
    badgeTitle: 'Bài 1',
    instruction: 'Abby đứng thứ 4 tính từ đầu hàng và thứ 6 tính từ cuối hàng. Hỏi hàng có bao nhiêu bạn?',
    hint: 'Abby được đếm 2 lần, nên ta lấy 4 + 6 rồi trừ đi 1.',
    mascot: { ...BENNY, message: 'Đếm từ hai đầu thì nhớ đừng đếm Abby hai lần nhé!' },
    activity: {
      type: 'queueCounter',
      fromFront: 4,
      fromBack: 6,
      correctTotal: 9,
      formula: '4 + 6 - 1 = 9'
    }
  },
  {
    id: 'log-2',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng chữ L',
    badgeTitle: 'Bài 2',
    instruction:
      'Các bạn xếp thành hình chữ L. Hàng dọc có 5 bạn, hàng ngang có 4 bạn, Benny đứng ở góc. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Bạn đứng ở góc thuộc cả hàng dọc lẫn hàng ngang.',
    mascot: { ...BENNY, message: 'Mình đứng ở góc nên được tính hai lần đấy!' },
    activity: {
      type: 'cornerCross',
      shape: 'L',
      verticalCount: 5,
      horizontalCount: 4,
      intersectionPerson: 'Benny',
      options: ['7', '8', '9', '10'],
      correctAnswer: '8'
    }
  },
  {
    id: 'log-3',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng chữ T',
    badgeTitle: 'Bài 3',
    instruction:
      'Các bạn xếp thành hình chữ T. Hàng ngang có 7 bạn, hàng dọc có 6 bạn, Casey đứng ở điểm giao. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Cộng hai hàng rồi trừ đi bạn đứng ở điểm giao.',
    mascot: { ...CASEY, message: 'Chữ T cũng có một điểm giao giống chữ L!' },
    activity: {
      type: 'cornerCross',
      shape: 'T',
      verticalCount: 6,
      horizontalCount: 7,
      intersectionPerson: 'Casey',
      options: ['11', '12', '13', '14'],
      correctAnswer: '12'
    }
  },
  {
    id: 'log-4',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Xếp chỗ ngồi xem phim',
    badgeTitle: 'Bài 4',
    instruction:
      'Xếp 5 người vào 5 ghế theo gợi ý: Bác sĩ Mayle ngồi ở rìa; Abby ngồi ghế giữa; Benny ngồi bên phải Abby; giữa Bác sĩ Mayle và Bác Ram có đúng 2 người.',
    hint: 'Abby ngồi ghế số 3. Thử đặt Bác sĩ Mayle ở ghế 1 hoặc ghế 5 rồi suy ra chỗ của Bác Ram.',
    mascot: { ...BENNY, message: 'Đọc kỹ từng gợi ý rồi suy luận như thám tử nhé!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 5,
      correctOrder: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Bác Ram', 'Benny'],
      allowedCharacters: ['Bác sĩ Mayle', 'Casey', 'Abby', 'Benny', 'Bác Ram']
    }
  }
];
