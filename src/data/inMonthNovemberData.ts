export type InMonthStageId = 'warmup' | 'visualModel' | 'practice' | 'challenge';

export type InMonthSkillDomain = 'bar_model' | 'remainder' | 'interval' | 'measurement';

export interface BarModelSegment {
  label: string;
  valueLabel: string;
  units: number;
  color: string;
  highlightNote?: string;
}

export interface InMonthVisualModelConfig {
  type: 'bar_model' | 'remainder_groups' | 'interval_model' | 'measurement_lab';
  title: string;
  subtitle?: string;
  // For bar_model
  bars?: BarModelSegment[];
  totalBracketLabel?: string;
  differenceBracketLabel?: string;
  // For remainder_groups
  dividend?: number;
  divisor?: number;
  quotient?: number;
  remainder?: number;
  itemIcon?: string;
  groupLabel?: string;
  // For interval_model
  intervalSubtype?: 'both_ends' | 'one_end' | 'neither_end' | 'closed_loop' | 'wood_cuts' | 'stairs';
  totalLength?: number;
  stepLength?: number;
  intervalsCount?: number;
  objectsCount?: number;
  objectIcon?: string;
  unitLabel?: string;
  // For measurement_lab
  measurementSubtype?: 'length_scale' | 'weight_balance' | 'volume_beaker' | 'length_chart';
  primaryReading?: string;
  secondaryReading?: string;
  conversionRule?: string;
  chartItems?: { label: string; value: number; unit: string; color: string }[];
}

export interface InMonthQuestion {
  id: string;
  stage: InMonthStageId;
  skillDomain: InMonthSkillDomain;
  prompt: string;
  options: string[];
  correctAnswer: string;
  hint: string;
  stepByStepExplanation: string[];
  visualModel: InMonthVisualModelConfig;
}

export interface InMonthDayPlan {
  id: string;
  dayNumber: number; // 1..30
  weekNumber: 1 | 2 | 3 | 4 | 5;
  weekTitle: string;
  title: string;
  subtitle: string;
  topicTag: string;
  skillDomain: InMonthSkillDomain;
  estimatedMinutes: number; // 30
  planetIcon: string;
  accentColor: string;
  learningGoals: string[];
  questions: InMonthQuestion[]; // 11 questions across 4 stages (~30 mins)
}

export interface InMonthExamQuestion {
  id: string;
  part: 'A' | 'B'; // A: Cơ bản (10 câu), B: Tư duy Olympic (10 câu)
  points: number; // 5 points each -> 100 total
  skillDomain: InMonthSkillDomain;
  relatedDayNumbers: number[];
  prompt: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  visualModel: InMonthVisualModelConfig;
}

export interface InMonthFinalExam {
  id: string;
  monthLabel: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  passingScore: number;
  excellenceScore: number;
  questions: InMonthExamQuestion[];
}

export const IN_MONTH_STAGES_META: {
  id: InMonthStageId;
  stepIndex: number;
  title: string;
  shortTitle: string;
  durationLabel: string;
  badgeColor: string;
  description: string;
}[] = [
  {
    id: 'warmup',
    stepIndex: 1,
    title: 'Chặng 1: Khởi Động Tư Duy',
    shortTitle: '1. Khởi động',
    durationLabel: '5 phút · 2 câu',
    badgeColor: '#F59E0B',
    description: 'Đánh thức phản xạ số học và khái niệm cốt lõi trước khi vào bài mới.'
  },
  {
    id: 'visualModel',
    stepIndex: 2,
    title: 'Chặng 2: Mô Hình Trực Quan Singapore (CPA)',
    shortTitle: '2. Mô hình CPA',
    durationLabel: '8 phút · 3 câu',
    badgeColor: '#0284C7',
    description: 'Quan sát và tương tác trên Sơ đồ thanh, Sơ đồ khoảng cách và Dụng cụ đo lường.'
  },
  {
    id: 'practice',
    stepIndex: 3,
    title: 'Chặng 3: Thực Hành Chuyên Sâu',
    shortTitle: '3. Thực hành',
    durationLabel: '10 phút · 4 câu',
    badgeColor: '#10B981',
    description: 'Vận dụng giải toán có lời văn 2–3 bước theo chuẩn Spark Math F3.'
  },
  {
    id: 'challenge',
    stepIndex: 4,
    title: 'Chặng 4: Thử Thách Sao Băng Olympic',
    shortTitle: '4. Thử thách',
    durationLabel: '7 phút · 2 câu',
    badgeColor: '#7C3AED',
    description: 'Phát triển tư duy suy luận ngược và kết nối đa kiến thức chuẩn quốc tế.'
  }
];

export const IN_MONTH_WEEKS_META = [
  {
    weekNumber: 1,
    title: 'Tuần 1 (Ngày 1 – 7): Toán Đố Nhân Chia & Sơ Đồ Thanh (Bar Model)',
    shortLabel: 'Tuần 1 · Sơ Đồ Thanh',
    daysRange: [1, 7] as [number, number],
    skillDomain: 'bar_model' as InMonthSkillDomain,
    color: '#0284C7',
    description: 'Gấp một số lên nhiều lần, giảm một số lần, toán đố 2–3 bước dùng sơ đồ Phần - Tổng & So sánh.'
  },
  {
    weekNumber: 2,
    title: 'Tuần 2 (Ngày 8 – 14): Phép Chia Có Dư & Ứng Dụng Thực Tế',
    shortLabel: 'Tuần 2 · Chia Có Dư',
    daysRange: [8, 14] as [number, number],
    skillDomain: 'remainder' as InMonthSkillDomain,
    color: '#0D9488',
    description: 'Tìm thương và số dư, quy tắc số dư < số chia, bài toán thuê thuyền, đóng hộp & chu kỳ lặp.'
  },
  {
    weekNumber: 3,
    title: 'Tuần 3 (Ngày 15 – 21): Toán Đố Về Khoảng Cách & Ứng Dụng',
    shortLabel: 'Tuần 3 · Khoảng Cách',
    daysRange: [15, 21] as [number, number],
    skillDomain: 'interval' as InMonthSkillDomain,
    color: '#7C3AED',
    description: 'Trồng cây 2 đầu, 1 đầu, không trồng ở đầu, trồng quanh hồ, cưa gỗ, leo cầu thang & tiếng chuông.'
  },
  {
    weekNumber: 4,
    title: 'Tuần 4 (Ngày 22 – 28): Đo Lường Độ Dài, Khối Lượng, Thể Tích & Biểu Đồ',
    shortLabel: 'Tuần 4 · Đo Lường',
    daysRange: [22, 28] as [number, number],
    skillDomain: 'measurement' as InMonthSkillDomain,
    color: '#EA580C',
    description: 'Đổi đơn vị km-m-cm, đọc cân kg-g, thể tích L-mL và so sánh độ dài bằng biểu đồ trực quan.'
  },
  {
    weekNumber: 5,
    title: 'Tuần 5 (Ngày 29 – 30): Tổng Ôn Chiến Lược & Chinh Phục Đỉnh Cao Tháng 11',
    shortLabel: 'Tuần 5 · Tổng Ôn',
    daysRange: [29, 30] as [number, number],
    skillDomain: 'bar_model' as InMonthSkillDomain,
    color: '#E11D48',
    description: 'Hệ thống hóa toàn bộ 4 trụ cột Tháng 11 và luyện giải đề tổng hợp trước kỳ thi cuối tháng.'
  }
];

// Helper to build a deterministic 4-option array containing the exact correctAnswer
function makeOptions(correct: string, distractors: string[]): string[] {
  const set = new Set<string>([correct]);
  for (const d of distractors) {
    if (d && d.trim() !== '') {
      set.add(d);
    }
    if (set.size === 4) break;
  }
  let fallbackStep = 1;
  while (set.size < 4) {
    const match = correct.match(/(\d+)/);
    if (match) {
      const num = parseInt(match[1], 10);
      const candidate = correct.replace(match[1], String(num + fallbackStep * 7));
      set.add(candidate);
    } else {
      set.add(`${correct} (${fallbackStep})`);
    }
    fallbackStep++;
  }
  const unique = Array.from(set).slice(0, 4);
  // Deterministic rotation based on string length & char codes
  const seed = correct.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const shift = seed % unique.length;
  return [...unique.slice(shift), ...unique.slice(0, shift)];
}

// ============================================================================
// BUILDER FUNCTIONS FOR EACH WEEK'S 30-MINUTE DAILY SESSIONS (11 QUESTIONS/DAY)
// ============================================================================

function buildWeek1Day(day: number): InMonthDayPlan {
  // Day 1..7: Bar Model & Multi-step Multiplication/Division Word Problems
  const baseA = 12 + day * 3; // e.g., Day 1: 15, Day 2: 18, Day 3: 21, Day 4: 24, Day 5: 27, Day 6: 30, Day 7: 33
  const mult = (day % 4) + 3; // 3, 4, 5, 6
  const bonus = 8 + day * 2;  // 10, 12, 14, 16, 18, 20, 22
  const bigVal = baseA * mult;
  const totalAB = baseA + bigVal;
  const diffAB = bigVal - baseA;

  const titles = [
    'Sơ Đồ Thanh: Gấp Một Số Lên Nhiều Lần',
    'Sơ Đồ Phần - Tổng: Tìm Tổng Hai Đại Lượng Tỉ Lệ',
    'Sơ Đồ So Sánh: Tìm Hiệu Khi Biết Tỉ Số Gấp Lần',
    'Toán Đố 2 Bước: Gấp Lần Kết Hợp Thêm Bớt Đơn Vị',
    'Toán Đố Chia Đều & Rút Về Đơn Vị Trên Sơ Đồ Thanh',
    'Sơ Đồ Thanh 3 Đại Lượng: Liên Kết Bắc Cầu Nhân Chia',
    'Tổng Hợp Tuần 1: Giải Toán Bằng Sơ Đồ Đoạn Thẳng'
  ];

  const planetIcons = ['🪐', '🌟', '🚀', '🛸', '🛰️', '☄️', '🌌'];

  const q1Ans = `${bigVal} ngôi sao`;
  const q2Ans = `${baseA} viên đá`;
  const q3Ans = `${totalAB} lít`;
  const q4Ans = `${diffAB} thùng`;
  const q5Ans = `${bigVal + bonus} cây`;
  const q6Ans = `${bigVal - bonus} kg`;
  const q7Unit = 7 + day; // 8..14
  const q7Boxes = 4;
  const q7Total = q7Unit * q7Boxes;
  const q7TargetBoxes = 7;
  const q7Ans = `${q7Unit * q7TargetBoxes} quyển`;
  const q8Small = 14 + day * 2;
  const q8Ans = `${q8Small * (mult + 1)} hành khách`;
  const q9Total = (baseA + 5) * 3;
  const q9Ans = `${baseA + 5} m`;
  const q10Small = 10 + day * 2;
  const q10Mid = q10Small * 2;
  const q10Big = q10Mid + 15;
  const q10Ans = `${q10Small + q10Mid + q10Big} điểm`;
  const q11Transfer = 6 + day;
  const q11Equal = 40 + day * 5;
  const q11Ans = `${q11Equal + q11Transfer} năng lượng`;

  const questions: InMonthQuestion[] = [
    // WARMUP (2 questions)
    {
      id: `nov-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Trạm quan sát A thu thập được ${baseA} ngôi sao. Trạm B thu thập được gấp ${mult} lần Trạm A. Hỏi Trạm B thu thập được bao nhiêu ngôi sao?`,
      options: makeOptions(q1Ans, [`${bigVal - baseA} ngôi sao`, `${bigVal + mult} ngôi sao`, `${baseA + mult} ngôi sao`]),
      correctAnswer: q1Ans,
      hint: `Gấp ${mult} lần nghĩa là lấy số ngôi sao của Trạm A nhân với ${mult}.`,
      stepByStepExplanation: [
        `Trạm A (1 phần) = ${baseA} ngôi sao.`,
        `Trạm B (${mult} phần bằng nhau) = ${baseA} × ${mult} = ${bigVal} ngôi sao.`
      ],
      visualModel: {
        type: 'bar_model',
        title: `Sơ đồ gấp ${mult} lần`,
        subtitle: `1 phần = ${baseA} ngôi sao`,
        bars: [
          { label: 'Trạm A', valueLabel: `${baseA}`, units: 1, color: '#0284C7' },
          { label: 'Trạm B', valueLabel: `? (${mult} phần)`, units: mult, color: '#7C3AED' }
        ]
      }
    },
    {
      id: `nov-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Khoang tàu lớn có ${bigVal} viên đá mặt trăng, nhiều gấp ${mult} lần khoang tàu nhỏ. Hỏi khoang tàu nhỏ có bao nhiêu viên đá mặt trăng?`,
      options: makeOptions(q2Ans, [`${baseA + 3} viên đá`, `${baseA - 2} viên đá`, `${bigVal - mult} viên đá`]),
      correctAnswer: q2Ans,
      hint: `Biết số lớn (${mult} phần) là ${bigVal}, muốn tìm 1 phần (khoang nhỏ) ta thực hiện phép chia cho ${mult}.`,
      stepByStepExplanation: [
        `Khoang lớn chiếm ${mult} phần bằng nhau ứng với ${bigVal} viên đá.`,
        `Số viên đá ở khoang nhỏ (1 phần) là: ${bigVal} : ${mult} = ${baseA} (viên đá).`
      ],
      visualModel: {
        type: 'bar_model',
        title: `Tìm 1 phần khi biết ${mult} phần`,
        subtitle: `Tổng ${mult} phần = ${bigVal} viên đá`,
        bars: [
          { label: 'Khoang lớn', valueLabel: `${bigVal} viên`, units: mult, color: '#0284C7' },
          { label: 'Khoang nhỏ', valueLabel: '? viên (1 phần)', units: 1, color: '#10B981' }
        ]
      }
    },
    // VISUAL MODEL CPA (3 questions)
    {
      id: `nov-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Quan sát sơ đồ thanh: Bình nhiên liệu X chứa ${baseA} lít. Bình Y chứa gấp ${mult} lần Bình X. Hỏi CẢ HAI bình chứa tất cả bao nhiêu lít nhiên liệu?`,
      options: makeOptions(q3Ans, [`${bigVal} lít`, `${totalAB + baseA} lít`, `${totalAB - 10} lít`]),
      correctAnswer: q3Ans,
      hint: `Bước 1: Tìm số lít của Bình Y (${baseA} × ${mult}). Bước 2: Cộng Bình X và Bình Y (hoặc lấy ${baseA} × ${mult + 1} phần).`,
      stepByStepExplanation: [
        `Bước 1: Bình Y chứa số lít là: ${baseA} × ${mult} = ${bigVal} (lít).`,
        `Bước 2: Cả hai bình chứa tất cả là: ${baseA} + ${bigVal} = ${totalAB} (lít).`,
        `Cách Singapore Math: Tổng số phần bằng nhau là 1 + ${mult} = ${mult + 1} phần. Tổng = ${baseA} × ${mult + 1} = ${totalAB} (lít).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ Phần - Tổng (Part-Whole Bar Model)',
        subtitle: `Bình X (1 phần) + Bình Y (${mult} phần) = ${mult + 1} phần`,
        bars: [
          { label: 'Bình X', valueLabel: `${baseA} L`, units: 1, color: '#0284C7' },
          { label: 'Bình Y', valueLabel: `${bigVal} L`, units: mult, color: '#F59E0B' }
        ],
        totalBracketLabel: `Tổng cả 2 bình = ? Lít (${mult + 1} phần)`
      }
    },
    {
      id: `nov-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Quan sát sơ đồ so sánh: Kho Đội 1 có ${baseA} thùng lương thực. Kho Đội 2 có số thùng gấp ${mult} lần Đội 1. Hỏi Đội 2 có NHIỀU HƠN Đội 1 bao nhiêu thùng?`,
      options: makeOptions(q4Ans, [`${bigVal} thùng`, `${totalAB} thùng`, `${diffAB + baseA} thùng`]),
      correctAnswer: q4Ans,
      hint: `Đội 1 có 1 phần, Đội 2 có ${mult} phần. Hiệu số phần là ${mult} - 1 = ${mult - 1} phần!`,
      stepByStepExplanation: [
        `Bước 1: Số thùng của Đội 2 là: ${baseA} × ${mult} = ${bigVal} (thùng).`,
        `Bước 2: Đội 2 nhiều hơn Đội 1 số thùng là: ${bigVal} - ${baseA} = ${diffAB} (thùng).`,
        `Mẹo Sơ đồ thanh: Phần chênh lệch ứng với ${mult} - 1 = ${mult - 1} phần. Vậy hiệu = ${baseA} × ${mult - 1} = ${diffAB} (thùng).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ So sánh Hơn - Kém (Comparison Bar Model)',
        subtitle: `Chênh lệch = ${mult} - 1 = ${mult - 1} phần`,
        bars: [
          { label: 'Đội 1', valueLabel: `${baseA} thùng`, units: 1, color: '#10B981' },
          { label: 'Đội 2', valueLabel: `${bigVal} thùng`, units: mult, color: '#7C3AED' }
        ],
        differenceBracketLabel: `Nhiều hơn ? thùng (${mult - 1} phần)`
      }
    },
    {
      id: `nov-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Vườn sinh thái Khu A có ${baseA} cây xanh. Khu B có số cây gấp ${mult} lần Khu A rồi trồng thêm ${bonus} cây nữa. Hỏi Khu B có bao nhiêu cây xanh?`,
      options: makeOptions(q5Ans, [`${bigVal} cây`, `${bigVal - bonus} cây`, `${(baseA + bonus) * mult} cây`]),
      correctAnswer: q5Ans,
      hint: `Nhìn thanh Khu B gồm ${mult} đoạn bằng Khu A cộng thêm 1 đoạn lẻ dài ${bonus} cây.`,
      stepByStepExplanation: [
        `Bước 1: ${mult} lần số cây của Khu A là: ${baseA} × ${mult} = ${bigVal} (cây).`,
        `Bước 2: Cộng thêm ${bonus} cây trồng thêm ở Khu B: ${bigVal} + ${bonus} = ${bigVal + bonus} (cây).`
      ],
      visualModel: {
        type: 'bar_model',
        title: `Sơ đồ Gấp ${mult} lần và Thêm ${bonus} đơn vị`,
        subtitle: `Khu B = (${baseA} × ${mult}) + ${bonus}`,
        bars: [
          { label: 'Khu A', valueLabel: `${baseA} cây`, units: 1, color: '#0284C7' },
          { label: 'Khu B', valueLabel: `${mult} phần + ${bonus} cây`, units: mult, color: '#F59E0B', highlightNote: `+ ${bonus} cây` }
        ]
      }
    },
    // PRACTICE (4 questions)
    {
      id: `nov-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Một kiện hàng thiết bị nặng ${baseA} kg. Kiện hàng máy móc nặng kém ${mult} lần kiện thiết bị là ${bonus} kg (tức là gấp ${mult} lần rồi bớt đi ${bonus} kg). Hỏi kiện máy móc nặng bao nhiêu ki-lô-gam?`,
      options: makeOptions(q6Ans, [`${bigVal} kg`, `${bigVal + bonus} kg`, `${bigVal - bonus - 5} kg`]),
      correctAnswer: q6Ans,
      hint: `Tính ${baseA} × ${mult} trước, sau đó trừ đi phần kém ${bonus} kg.`,
      stepByStepExplanation: [
        `Bước 1: Gấp ${mult} lần kiện thiết bị là: ${baseA} × ${mult} = ${bigVal} (kg).`,
        `Bước 2: Bớt đi ${bonus} kg: ${bigVal} - ${bonus} = ${bigVal - bonus} (kg).`
      ],
      visualModel: {
        type: 'bar_model',
        title: `Gấp ${mult} lần rồi bớt ${bonus} kg`,
        bars: [
          { label: 'Thiết bị', valueLabel: `${baseA} kg`, units: 1, color: '#0284C7' },
          { label: 'Máy móc', valueLabel: `${bigVal} - ${bonus} = ? kg`, units: mult, color: '#E11D48', highlightNote: `Bớt ${bonus} kg` }
        ]
      }
    },
    {
      id: `nov-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Bài toán rút về đơn vị: Có ${q7Total} quyển cẩm nang thiên văn xếp đều vào ${q7Boxes} hộp. Hỏi nếu có ${q7TargetBoxes} hộp như thế thì đựng được tất cả bao nhiêu quyển cẩm nang?`,
      options: makeOptions(q7Ans, [`${q7Unit * (q7TargetBoxes - 1)} quyển`, `${q7Total + q7TargetBoxes} quyển`, `${q7Unit * (q7TargetBoxes + 1)} quyển`]),
      correctAnswer: q7Ans,
      hint: `Bước 1 (Rút về đơn vị): Tìm số quyển trong 1 hộp (${q7Total} : ${q7Boxes}). Bước 2: Nhân với ${q7TargetBoxes} hộp.`,
      stepByStepExplanation: [
        `Bước 1: Số quyển cẩm nang trong mỗi hộp (1 phần) là: ${q7Total} : ${q7Boxes} = ${q7Unit} (quyển).`,
        `Bước 2: Số quyển trong ${q7TargetBoxes} hộp là: ${q7Unit} × ${q7TargetBoxes} = ${q7Unit * q7TargetBoxes} (quyển).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Mô hình Rút về đơn vị (Unitary Method)',
        subtitle: `${q7Boxes} hộp = ${q7Total} quyển ➔ 1 hộp = ${q7Unit} quyển`,
        bars: [
          { label: `${q7Boxes} hộp đầu`, valueLabel: `${q7Total} quyển`, units: q7Boxes, color: '#0284C7' },
          { label: `${q7TargetBoxes} hộp cần tìm`, valueLabel: `? quyển`, units: q7TargetBoxes, color: '#10B981' }
        ]
      }
    },
    {
      id: `nov-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Tàu con thoi Alpha chở ${q8Small} hành khách. Tàu Beta chở nhiều hơn tàu Alpha đúng bằng ${mult - 1} lần số khách của tàu Alpha (tức là gấp ${mult} lần Alpha). Hỏi cả hai tàu chở bao nhiêu hành khách?`,
      options: makeOptions(q8Ans, [`${q8Small * mult} hành khách`, `${q8Small * (mult + 2)} hành khách`, `${q8Small * mult + 10} hành khách`]),
      correctAnswer: q8Ans,
      hint: `Alpha là 1 phần (${q8Small} khách), Beta là ${mult} phần. Tổng cả hai tàu là ${mult + 1} phần!`,
      stepByStepExplanation: [
        `Tàu Alpha chiếm 1 phần = ${q8Small} hành khách.`,
        `Tàu Beta chiếm ${mult} phần = ${q8Small} × ${mult} = ${q8Small * mult} hành khách.`,
        `Tổng số hành khách trên cả hai tàu là: ${q8Small} + ${q8Small * mult} = ${q8Small * (mult + 1)} (hành khách).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Tổng hai đại lượng theo số phần',
        bars: [
          { label: 'Tàu Alpha', valueLabel: `${q8Small} khách`, units: 1, color: '#0284C7' },
          { label: 'Tàu Beta', valueLabel: `${q8Small * mult} khách`, units: mult, color: '#7C3AED' }
        ],
        totalBracketLabel: `Tổng = ${mult + 1} phần`
      }
    },
    {
      id: `nov-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Một sợi cáp quang vũ trụ dài ${q9Total} m được cắt thành 2 đoạn: đoạn dài gấp đôi đoạn ngắn. Hỏi đoạn cáp NGẮN dài bao nhiêu mét?`,
      options: makeOptions(q9Ans, [`${(baseA + 5) * 2} m`, `${baseA + 8} m`, `${q9Total - 10} m`]),
      correctAnswer: q9Ans,
      hint: `Đoạn ngắn là 1 phần, đoạn dài là 2 phần. Tổng cộng cả sợi cáp là 1 + 2 = 3 phần bằng nhau!`,
      stepByStepExplanation: [
        `Tổng số phần bằng nhau là: 1 + 2 = 3 (phần).`,
        `Độ dài đoạn cáp ngắn (1 phần) là: ${q9Total} : 3 = ${baseA + 5} (m).`
      ],
      visualModel: {
        type: 'bar_model',
        title: `Bài toán Tổng - Tỉ cơ bản (Tổng = ${q9Total} m)`,
        subtitle: 'Đoạn ngắn (1 phần) + Đoạn dài (2 phần) = 3 phần',
        bars: [
          { label: 'Đoạn ngắn', valueLabel: '? m (1 phần)', units: 1, color: '#10B981' },
          { label: 'Đoạn dài', valueLabel: '2 phần', units: 2, color: '#0284C7' }
        ],
        totalBracketLabel: `Tổng cộng = ${q9Total} m (3 phần)`
      }
    },
    // CHALLENGE (2 questions)
    {
      id: `nov-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách 3 đại lượng: Trong cuộc thi Toán Vũ Trụ, An đạt ${q10Small} điểm. Bình đạt số điểm gấp đôi An. Chi đạt nhiều hơn Bình 15 điểm. Hỏi tổng số điểm của cả BA bạn An, Bình và Chi là bao nhiêu?`,
      options: makeOptions(q10Ans, [`${q10Small + q10Mid + q10Mid} điểm`, `${q10Mid + q10Big} điểm`, `${q10Small + q10Mid + q10Big + 10} điểm`]),
      correctAnswer: q10Ans,
      hint: `Tính điểm của Bình (${q10Small} × 2), rồi tính điểm của Chi (Bình + 15), sau đó cộng cả 3 bạn lại!`,
      stepByStepExplanation: [
        `Điểm của An = ${q10Small} điểm.`,
        `Điểm của Bình = ${q10Small} × 2 = ${q10Mid} điểm.`,
        `Điểm của Chi = ${q10Mid} + 15 = ${q10Big} điểm.`,
        `Tổng số điểm của cả 3 bạn là: ${q10Small} + ${q10Mid} + ${q10Big} = ${q10Small + q10Mid + q10Big} (điểm).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ thanh 3 đại lượng liên kết',
        bars: [
          { label: 'Bạn An', valueLabel: `${q10Small} điểm`, units: 1, color: '#0284C7' },
          { label: 'Bạn Bình', valueLabel: `${q10Mid} điểm`, units: 2, color: '#F59E0B' },
          { label: 'Bạn Chi', valueLabel: `${q10Mid} + 15 điểm`, units: 3, color: '#7C3AED', highlightNote: '+15 điểm' }
        ],
        totalBracketLabel: 'Tổng điểm cả 3 bạn = ?'
      }
    },
    {
      id: `nov-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Tư duy Trước - Sau (Working Backwards): Nếu chuyển ${q11Transfer} viên năng lượng từ Trạm X sang Trạm Y thì hai trạm có số viên bằng nhau và mỗi trạm đều có ${q11Equal} viên. Hỏi LÚC ĐẦU Trạm X có bao nhiêu viên năng lượng?`,
      options: makeOptions(q11Ans, [`${q11Equal - q11Transfer} năng lượng`, `${q11Equal + q11Transfer * 2} năng lượng`, `${q11Equal} năng lượng`]),
      correctAnswer: q11Ans,
      hint: `Sau khi cho đi ${q11Transfer} viên, Trạm X còn ${q11Equal} viên. Vậy lúc đầu Trạm X phải có nhiều hơn ${q11Equal} viên!`,
      stepByStepExplanation: [
        `Sau khi chuyển cho Trạm Y ${q11Transfer} viên, Trạm X còn lại ${q11Equal} viên.`,
        `Vậy lúc đầu Trạm X có số viên năng lượng là: ${q11Equal} + ${q11Transfer} = ${q11Equal + q11Transfer} (viên).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ Trước - Sau (San sẻ bằng nhau)',
        subtitle: `Sau khi chuyển ${q11Transfer} viên, mỗi trạm có ${q11Equal} viên`,
        bars: [
          { label: 'Trạm X lúc sau', valueLabel: `${q11Equal} viên`, units: 3, color: '#0284C7' },
          { label: 'Trạm X lúc đầu', valueLabel: `${q11Equal} + ${q11Transfer} = ?`, units: 4, color: '#10B981', highlightNote: `+${q11Transfer} đã chuyển` }
        ]
      }
    }
  ];

  return {
    id: `nov-day-${day}`,
    dayNumber: day,
    weekNumber: 1,
    weekTitle: IN_MONTH_WEEKS_META[0].title,
    title: titles[day - 1],
    subtitle: 'Chuẩn Singapore Math F3 · Tuần 1: Sơ Đồ Thanh & Toán Đố Nhân Chia',
    topicTag: 'Sơ Đồ Thanh CPA',
    skillDomain: 'bar_model',
    estimatedMinutes: 30,
    planetIcon: planetIcons[day - 1],
    accentColor: '#0284C7',
    learningGoals: [
      'Biểu diễn bài toán gấp lần và thêm/bớt bằng sơ đồ đoạn thẳng (Bar Model)',
      'Giải thành thạo toán có lời văn 2–3 bước kết hợp nhân chia',
      'Phát triển tư duy tính ngược Trước - Sau trên sơ đồ thanh'
    ],
    questions
  };
}

function buildWeek2Day(day: number): InMonthDayPlan {
  // Day 8..14: Division with Remainder, Rounding Up/Down in Context & Cyclic Patterns
  const idx = day - 8; // 0..6
  const divisor = 4 + idx; // 4, 5, 6, 7, 8, 9, 6
  const actualDivisor = divisor > 9 ? 6 : divisor;
  const quotient = 6 + idx; // 6, 7, 8, 9, 10, 11, 12
  const remainder = (idx % (actualDivisor - 1)) + 1;
  const dividend = actualDivisor * quotient + remainder;

  const titles = [
    'Bản Chất Phép Chia Có Dư & Quy Tắc Số Dư',
    'Tìm Số Bị Chia Khi Biết Thương, Số Chia Và Số Dư',
    'Toán Thực Tế Làm Tròn Lên: Bài Toán Thuê Tàu & Đóng Hộp',
    'Toán Thực Tế Lấy Phần Nguyên: Bài Toán Đổi Quà & Lắp Bánh Xe',
    'Số Dư Lớn Nhất Có Thể Trong Phép Chia',
    'Ứng Dụng Số Dư Giải Bài Toán Chu Kỳ Lặp Lại',
    'Tổng Hợp Tuần 2: Làm Chủ Phép Chia Có Dư'
  ];
  const planetIcons = ['🛸', '🪐', '🌠', '🛰️', '🌙', '⚡', '🌟'];

  // Q1: Find quotient & remainder
  const q1Ans = `Thương ${quotient}, dư ${remainder}`;
  // Q2: Max remainder for divisor D
  const maxRemDivisor = actualDivisor + 1;
  const q2Ans = `Số dư lớn nhất là ${maxRemDivisor - 1}`;
  // Q3: Reconstruct dividend = divisor * quotient + remainder
  const q3Divisor = 5 + (idx % 4);
  const q3Quot = 8 + idx;
  const q3Rem = q3Divisor - 2;
  const q3Dividend = q3Divisor * q3Quot + q3Rem;
  const q3Ans = `${q3Dividend}`;
  // Q4: Round UP (boats/cabins)
  const q4People = actualDivisor * (quotient + 1) - 1;
  const q4Boats = quotient + 1;
  const q4Ans = `${q4Boats} khoang tàu`;
  // Q5: Round DOWN (boxes/gifts)
  const q5Stars = actualDivisor * quotient + (actualDivisor - 1);
  const q5Ans = `${quotient} hộp đầy`;
  // Q6: Leftover items needed to fill one more box
  const q6NeedMore = actualDivisor - remainder;
  const q6Ans = `Cần thêm ${q6NeedMore} viên`;
  // Q7: Cyclic pattern of 4 colors
  const cycleColors = ['Đỏ', 'Vàng', 'Xanh', 'Tím'];
  const q7Pos = 24 + idx + 1; // 25..31
  const q7Rem = q7Pos % 4;
  const q7Color = cycleColors[(q7Rem === 0 ? 4 : q7Rem) - 1];
  const q7Ans = `Màu ${q7Color}`;
  // Q8: Day of week cycle (7 days)
  const q8DaysLater = 15 + idx; // 15..21
  const weekDays = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  // Today is Sunday (index 0)
  const q8Ans = weekDays[q8DaysLater % 7];
  // Q9: Multi-step division with remainder
  const q9Total = actualDivisor * 9 + 2;
  const q9Ans = `Dư 2 quả`;
  // Q10 Challenge: Dividend with max remainder
  const q10Div = 7 + (idx % 3);
  const q10Quot = 6 + idx;
  const q10MaxRem = q10Div - 1;
  const q10Total = q10Div * q10Quot + q10MaxRem;
  const q10Ans = `${q10Total}`;
  // Q11 Challenge: Count specific color in cyclic sequence
  const q11TotalBeads = 4 * (6 + idx) + 2; // remainder 2 -> Red, Yellow
  const q11RedCount = 6 + idx + 1;
  const q11Ans = `${q11RedCount} hạt màu Đỏ`;

  const questions: InMonthQuestion[] = [
    {
      id: `nov-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'remainder',
      prompt: `Thực hiện phép chia: ${dividend} : ${actualDivisor}. Kết quả thương và số dư là bao nhiêu?`,
      options: makeOptions(q1Ans, [
        `Thương ${quotient}, dư ${remainder + 1}`,
        `Thương ${quotient - 1}, dư ${remainder}`,
        `Thương ${quotient + 1}, dư 1`
      ]),
      correctAnswer: q1Ans,
      hint: `Ta có ${actualDivisor} × ${quotient} = ${actualDivisor * quotient}. Lấy ${dividend} - ${actualDivisor * quotient} để tìm số dư.`,
      stepByStepExplanation: [
        `Ta thấy ${actualDivisor} × ${quotient} = ${actualDivisor * quotient}.`,
        `Số dư là: ${dividend} - ${actualDivisor * quotient} = ${remainder} (luôn nhỏ hơn số chia ${actualDivisor}).`,
        `Vậy ${dividend} : ${actualDivisor} = ${quotient} (dư ${remainder}).`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Chia ${dividend} vật phẩm vào các nhóm ${actualDivisor}`,
        dividend,
        divisor: actualDivisor,
        quotient,
        remainder,
        itemIcon: '⭐',
        groupLabel: 'Nhóm'
      }
    },
    {
      id: `nov-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'remainder',
      prompt: `Trong một phép chia có số chia là ${maxRemDivisor}, hỏi số dư LỚN NHẤT có thể là bao nhiêu?`,
      options: makeOptions(q2Ans, [
        `Số dư lớn nhất là ${maxRemDivisor}`,
        `Số dư lớn nhất là ${maxRemDivisor + 1}`,
        `Số dư lớn nhất là ${maxRemDivisor - 2}`
      ]),
      correctAnswer: q2Ans,
      hint: `Quy tắc vàng: Số dư luôn NHỎ HƠN số chia. Vậy số tự nhiên lớn nhất nhỏ hơn ${maxRemDivisor} là số nào?`,
      stepByStepExplanation: [
        `Trong mọi phép chia, số dư luôn phải nhỏ hơn số chia.`,
        `Vì số chia là ${maxRemDivisor}, nên số dư lớn nhất có thể là: ${maxRemDivisor} - 1 = ${maxRemDivisor - 1}.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Quy tắc: Số dư < Số chia (${maxRemDivisor})`,
        dividend: maxRemDivisor * 3 + (maxRemDivisor - 1),
        divisor: maxRemDivisor,
        quotient: 3,
        remainder: maxRemDivisor - 1,
        itemIcon: '💎',
        groupLabel: 'Hộp'
      }
    },
    {
      id: `nov-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Tìm số bị chia $X$, biết $X$ chia cho ${q3Divisor} được thương là ${q3Quot} và số dư là ${q3Rem}.`,
      options: makeOptions(q3Ans, [`${q3Divisor * q3Quot}`, `${q3Dividend - q3Rem}`, `${q3Dividend + 2}`]),
      correctAnswer: q3Ans,
      hint: `Công thức: Số bị chia = Thương × Số chia + Số dư.`,
      stepByStepExplanation: [
        `Áp dụng quy tắc tìm số bị chia trong phép chia có dư:`,
        `X = ${q3Quot} × ${q3Divisor} + ${q3Rem} = ${q3Divisor * q3Quot} + ${q3Rem} = ${q3Dividend}.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Khôi phục Số bị chia từ ${q3Quot} nhóm và ${q3Rem} phần dư`,
        dividend: q3Dividend,
        divisor: q3Divisor,
        quotient: q3Quot,
        remainder: q3Rem,
        itemIcon: '🪐',
        groupLabel: 'Khay'
      }
    },
    {
      id: `nov-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Đoàn thám hiểm gồm ${q4People} phi hành gia cần đi qua trạm trung chuyển. Mỗi khoang tàu chở được tối đa ${actualDivisor} người. Hỏi cần ÍT NHẤT bao nhiêu khoang tàu để chở hết cả đoàn cùng lúc?`,
      options: makeOptions(q4Ans, [`${quotient} khoang tàu`, `${quotient - 1} khoang tàu`, `${quotient + 2} khoang tàu`]),
      correctAnswer: q4Ans,
      hint: `Thực hiện phép chia ${q4People} : ${actualDivisor}. Những người còn dư vẫn cần thêm 1 khoang tàu nữa!`,
      stepByStepExplanation: [
        `Ta có: ${q4People} : ${actualDivisor} = ${quotient} (dư ${actualDivisor - 1} người).`,
        `Vì ${actualDivisor - 1} người còn dư không thể bỏ lại nên cần thêm 1 khoang tàu nữa.`,
        `Tổng số khoang tàu ít nhất là: ${quotient} + 1 = ${q4Boats} (khoang tàu).`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Bài toán Thuê Tàu (Làm tròn lên +1 khoang cho phần dư)`,
        dividend: q4People,
        divisor: actualDivisor,
        quotient,
        remainder: actualDivisor - 1,
        itemIcon: '👩‍🚀',
        groupLabel: 'Khoang'
      }
    },
    {
      id: `nov-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Có ${q5Stars} viên pha lê năng lượng. Người ta đóng vào các hộp, mỗi hộp phải có ĐỦ ${actualDivisor} viên. Hỏi đóng được nhiều nhất bao nhiêu hộp ĐẦY?`,
      options: makeOptions(q5Ans, [`${quotient + 1} hộp đầy`, `${quotient - 1} hộp đầy`, `${actualDivisor} hộp đầy`]),
      correctAnswer: q5Ans,
      hint: `Lấy ${q5Stars} : ${actualDivisor}. Số viên dư ra chưa đủ để tạo thành 1 hộp đầy!`,
      stepByStepExplanation: [
        `Ta có phép chia: ${q5Stars} : ${actualDivisor} = ${quotient} (dư ${actualDivisor - 1} viên).`,
        `Vì ${actualDivisor - 1} viên dư chưa đủ ${actualDivisor} viên nên chỉ đóng được tối đa ${quotient} hộp đầy.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Bài toán Đóng Hộp Đầy (Lấy phần thương nguyên)`,
        dividend: q5Stars,
        divisor: actualDivisor,
        quotient,
        remainder: actualDivisor - 1,
        itemIcon: '💎',
        groupLabel: 'Hộp đầy'
      }
    },
    {
      id: `nov-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Từ bài toán chia ${dividend} viên đá vào các hộp (mỗi hộp ${actualDivisor} viên), ta thấy còn dư ${remainder} viên. Hỏi cần lấy THÊM ít nhất bao nhiêu viên đá nữa để hộp cuối cùng cũng vừa đầy?`,
      options: makeOptions(q6Ans, [`Cần thêm ${remainder} viên`, `Cần thêm ${actualDivisor} viên`, `Cần thêm 1 viên`]),
      correctAnswer: q6Ans,
      hint: `Mỗi hộp cần ${actualDivisor} viên, hiện tại hộp dở dang đã có ${remainder} viên. Ta lấy ${actualDivisor} - ${remainder}.`,
      stepByStepExplanation: [
        `Phép chia ${dividend} : ${actualDivisor} = ${quotient} (dư ${remainder} viên).`,
        `Để ${remainder} viên dư tạo thành 1 hộp đầy (${actualDivisor} viên), cần thêm: ${actualDivisor} - ${remainder} = ${q6NeedMore} (viên).`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Bù thêm ${q6NeedMore} viên vào phần dư (${remainder} viên)`,
        dividend,
        divisor: actualDivisor,
        quotient,
        remainder,
        itemIcon: '🔮',
        groupLabel: 'Hộp'
      }
    },
    {
      id: `nov-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Dây đèn tín hiệu trên trạm vũ trụ nhấp nháy lặp lại theo chu kỳ 4 màu: Đỏ ➔ Vàng ➔ Xanh ➔ Tím. Hỏi bóng đèn thứ ${q7Pos} có màu gì?`,
      options: makeOptions(q7Ans, ['Màu Đỏ', 'Màu Vàng', 'Màu Xanh', 'Màu Tím']),
      correctAnswer: q7Ans,
      hint: `Mỗi nhóm chu kỳ có 4 bóng. Lấy ${q7Pos} chia cho 4 rồi xét số dư (Dư 1: Đỏ, Dư 2: Vàng, Dư 3: Xanh, Dư 0: Tím).`,
      stepByStepExplanation: [
        `Chu kỳ lặp lại gồm 4 màu: (1) Đỏ, (2) Vàng, (3) Xanh, (4) Tím.`,
        `Ta lấy: ${q7Pos} : 4 = ${Math.floor(q7Pos / 4)} (dư ${q7Rem}).`,
        `Số dư là ${q7Rem} nên bóng đèn thứ ${q7Pos} có ${q7Ans}!`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Chu kỳ 4 màu: Đỏ (1) · Vàng (2) · Xanh (3) · Tím (0)`,
        dividend: q7Pos,
        divisor: 4,
        quotient: Math.floor(q7Pos / 4),
        remainder: q7Rem,
        itemIcon: '💡',
        groupLabel: 'Chu kỳ 4'
      }
    },
    {
      id: `nov-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Hôm nay là Chủ Nhật. Hỏi sau ${q8DaysLater} ngày nữa sẽ là thứ mấy trong tuần?`,
      options: makeOptions(q8Ans, ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Chủ Nhật']),
      correctAnswer: q8Ans,
      hint: `Một tuần có 7 ngày lặp lại. Lấy ${q8DaysLater} chia cho 7 để tìm số ngày lẻ ra sau các tuần tròn!`,
      stepByStepExplanation: [
        `Mỗi tuần có 7 ngày nên cứ sau 7 ngày lại trở về Chủ Nhật.`,
        `Ta có: ${q8DaysLater} : 7 = ${Math.floor(q8DaysLater / 7)} tuần (dư ${q8DaysLater % 7} ngày).`,
        `Đếm thêm ${q8DaysLater % 7} ngày từ Chủ Nhật, ta được: ${q8Ans}.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Chu kỳ 7 ngày trong tuần (${q8DaysLater} : 7)`,
        dividend: q8DaysLater,
        divisor: 7,
        quotient: Math.floor(q8DaysLater / 7),
        remainder: q8DaysLater % 7,
        itemIcon: '📅',
        groupLabel: 'Tuần'
      }
    },
    {
      id: `nov-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Nông trại thu hoạch được ${q9Total} quả táo vũ trụ, đem chia đều vào ${actualDivisor} giỏ lớn. Hỏi sau khi chia đều cho các giỏ thì còn thừa ra mấy quả táo?`,
      options: makeOptions(q9Ans, ['Dư 1 quả', 'Dư 3 quả', 'Không dư quả nào']),
      correctAnswer: q9Ans,
      hint: `Thực hiện phép chia ${q9Total} : ${actualDivisor} và tìm số dư.`,
      stepByStepExplanation: [
        `Ta có: ${q9Total} : ${actualDivisor} = 9 (dư 2).`,
        `Mỗi giỏ có 9 quả táo và còn dư 2 quả táo.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Chia ${q9Total} quả táo vào ${actualDivisor} giỏ`,
        dividend: q9Total,
        divisor: actualDivisor,
        quotient: 9,
        remainder: 2,
        itemIcon: '🍎',
        groupLabel: 'Giỏ'
      }
    },
    {
      id: `nov-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'remainder',
      prompt: `Thử thách Olympic: Trong một phép chia có số chia là ${q10Div}, thương là ${q10Quot} và số dư là số dư LỚN NHẤT có thể có. Tìm số bị chia của phép chia đó.`,
      options: makeOptions(q10Ans, [`${q10Div * q10Quot + 1}`, `${q10Div * q10Quot + q10Div}`, `${q10Total - 2}`]),
      correctAnswer: q10Ans,
      hint: `Bước 1: Tìm số dư lớn nhất (Số chia - 1 = ${q10Div} - 1 = ${q10MaxRem}). Bước 2: Số bị chia = Thương × Số chia + Số dư.`,
      stepByStepExplanation: [
        `Bước 1: Vì số chia là ${q10Div} nên số dư lớn nhất có thể là: ${q10Div} - 1 = ${q10MaxRem}.`,
        `Bước 2: Số bị chia cần tìm là: ${q10Quot} × ${q10Div} + ${q10MaxRem} = ${q10Div * q10Quot} + ${q10MaxRem} = ${q10Total}.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Số chia = ${q10Div} ➔ Số dư lớn nhất = ${q10MaxRem}`,
        dividend: q10Total,
        divisor: q10Div,
        quotient: q10Quot,
        remainder: q10MaxRem,
        itemIcon: '🌟',
        groupLabel: 'Nhóm'
      }
    },
    {
      id: `nov-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'remainder',
      prompt: `Thử thách Chu kỳ nâng cao: Bạn Abby xâu một chuỗi vòng gồm ${q11TotalBeads} hạt ngọc theo thứ tự lặp lại: 1 Đỏ, 1 Vàng, 1 Xanh, 1 Tím. Hỏi trong toàn bộ ${q11TotalBeads} hạt đó có tất cả bao nhiêu hạt màu Đỏ?`,
      options: makeOptions(q11Ans, [`${q11RedCount - 1} hạt màu Đỏ`, `${q11RedCount + 1} hạt màu Đỏ`, `${q11RedCount + 2} hạt màu Đỏ`]),
      correctAnswer: q11Ans,
      hint: `Mỗi nhóm 4 hạt có 1 hạt Đỏ (đứng đầu nhóm). Lấy ${q11TotalBeads} : 4 được ${6 + idx} nhóm dư 2 hạt (2 hạt dư là Đỏ và Vàng).`,
      stepByStepExplanation: [
        `Mỗi nhóm chu kỳ có 4 hạt (Đỏ, Vàng, Xanh, Tím), trong đó có 1 hạt Đỏ.`,
        `Số nhóm đầy đủ là: ${q11TotalBeads} : 4 = ${6 + idx} (nhóm) và dư 2 hạt.`,
        `2 hạt dư tiếp theo theo thứ tự là: 1 hạt Đỏ và 1 hạt Vàng.`,
        `Tổng số hạt màu Đỏ là: ${6 + idx} + 1 = ${q11RedCount} (hạt).`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Đếm số phần tử trong ${6 + idx} chu kỳ + 2 hạt dư`,
        dividend: q11TotalBeads,
        divisor: 4,
        quotient: 6 + idx,
        remainder: 2,
        itemIcon: '🔴',
        groupLabel: 'Chu kỳ'
      }
    }
  ];

  return {
    id: `nov-day-${day}`,
    dayNumber: day,
    weekNumber: 2,
    weekTitle: IN_MONTH_WEEKS_META[1].title,
    title: titles[idx],
    subtitle: 'Chuẩn Singapore Math F3 · Tuần 2: Phép Chia Có Dư & Chu Kỳ',
    topicTag: 'Phép Chia Có Dư',
    skillDomain: 'remainder',
    estimatedMinutes: 30,
    planetIcon: planetIcons[idx],
    accentColor: '#0D9488',
    learningGoals: [
      'Nắm vững mối liên hệ: Số bị chia = Thương × Số chia + Số dư (Số dư < Số chia)',
      'Phân biệt chính xác bài toán thực tế cần +1 vào thương và bài toán lấy phần nguyên',
      'Giải quyết bài toán tìm phần tử thứ N trong dãy chu kỳ bằng phép chia có dư'
    ],
    questions
  };
}

function buildWeek3Day(day: number): InMonthDayPlan {
  // Day 15..21: Interval Problems (Planting Trees, Cutting Logs, Climbing Stairs, Closed Loops)
  const idx = day - 15; // 0..6
  const stepDist = 4 + (idx % 4); // 4, 5, 6, 7 m
  const intervals = 6 + idx;      // 6..12 intervals
  const totalDist = stepDist * intervals;

  const titles = [
    'Toán Khoảng Cách Loại 1: Trồng Cây Ở Cả Hai Đầu Đường',
    'Toán Khoảng Cách Loại 2: Trồng Cây Ở Một Đầu Đường',
    'Toán Khoảng Cách Loại 3: Hai Đầu Đường Đều Không Trồng Cây',
    'Toán Khoảng Cách Khép Kín: Trồng Cây Quanh Hồ Hình Tròn',
    'Ứng Dụng Khoảng Cách: Bài Toán Cưa Gỗ & Cắt Dây Cáp',
    'Ứng Dụng Khoảng Cách: Bài Toán Leo Cầu Thang Giữa Các Tầng',
    'Tổng Hợp Tuần 3: Đỉnh Cao Tư Duy Toán Khoảng Cách'
  ];
  const planetIcons = ['🌳', '🌲', '🎋', '🏞️', '🪵', '🪜', '🏆'];

  const q1Ans = `${intervals} khoảng cách`;
  const q2BothEndsTrees = intervals + 1;
  const q2Ans = `${q2BothEndsTrees} cây`;
  const q3OneEndTrees = intervals;
  const q3Ans = `${q3OneEndTrees} cột đèn`;
  const q4NeitherEndTrees = intervals - 1;
  const q4Ans = `${q4NeitherEndTrees} biển báo`;
  const q5LoopTrees = intervals + 2;
  const q5LoopDist = q5LoopTrees * stepDist;
  const q5Ans = `${q5LoopTrees} cây liễu`;
  // Q6: Wood cutting: N pieces -> N - 1 cuts
  const q6Pieces = 5 + (idx % 4); // 5..8 pieces
  const q6Cuts = q6Pieces - 1;
  const q6MinutesPerCut = 3 + (idx % 3);
  const q6TotalMins = q6Cuts * q6MinutesPerCut;
  const q6Ans = `${q6TotalMins} phút`;
  // Q7: Stairs: Floor 1 to Floor F -> (F - 1) flights
  const q7TopFloor = 5 + (idx % 4); // Floor 5..8
  const q7StepsPerFlight = 16 + (idx % 3) * 2;
  const q7TotalSteps = (q7TopFloor - 1) * q7StepsPerFlight;
  const q7Ans = `${q7TotalSteps} bậc thang`;
  // Q8: Given trees (both ends), find total length
  const q8Trees = 9 + idx;
  const q8Gap = 5;
  const q8Len = (q8Trees - 1) * q8Gap;
  const q8Ans = `${q8Len} m`;
  // Q9: Both sides of the road (2 bên đường)
  const q9OneSideTrees = intervals + 1;
  const q9BothSidesTrees = q9OneSideTrees * 2;
  const q9Ans = `${q9BothSidesTrees} cây`;
  // Q10 Challenge: Clock chime interval problem
  const q10ChimesA = 4; // 3 intervals
  const q10TimeA = 6;   // 2 seconds per interval
  const q10ChimesB = 7 + (idx % 3); // 7, 8, 9 chimes -> 6, 7, 8 intervals
  const q10TimeB = (q10ChimesB - 1) * 2;
  const q10Ans = `${q10TimeB} giây`;
  // Q11 Challenge: Alternating flowers between trees
  const q11Trees = 8 + idx;
  const q11FlowersPerGap = 3;
  const q11TotalFlowers = (q11Trees - 1) * q11FlowersPerGap;
  const q11Ans = `${q11TotalFlowers} khóm hoa`;

  const questions: InMonthQuestion[] = [
    {
      id: `nov-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'interval',
      prompt: `Một đoạn đường dài ${totalDist} m được chia thành các đoạn nhỏ bằng nhau, mỗi đoạn dài ${stepDist} m. Hỏi có tất cả bao nhiêu KHOẢNG CÁCH?`,
      options: makeOptions(q1Ans, [
        `${intervals + 1} khoảng cách`,
        `${intervals - 1} khoảng cách`,
        `${intervals + 2} khoảng cách`
      ]),
      correctAnswer: q1Ans,
      hint: `Số khoảng cách = Tổng độ dài : Độ dài mỗi khoảng (${totalDist} : ${stepDist}).`,
      stepByStepExplanation: [
        `Tổng độ dài đoạn đường là ${totalDist} m, mỗi khoảng dài ${stepDist} m.`,
        `Số khoảng cách là: ${totalDist} : ${stepDist} = ${intervals} (khoảng cách).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Chia đoạn đường ${totalDist} m thành các khoảng ${stepDist} m`,
        intervalSubtype: 'both_ends',
        totalLength: totalDist,
        stepLength: stepDist,
        intervalsCount: intervals,
        objectsCount: intervals + 1,
        objectIcon: '🚩',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'interval',
      prompt: `Trên đoạn đường dài ${totalDist} m, người ta trồng cây ở CẢ HAI ĐẦU ĐƯỜNG, cứ cách ${stepDist} m trồng 1 cây. Hỏi trồng được tất cả bao nhiêu cây?`,
      options: makeOptions(q2Ans, [`${intervals} cây`, `${intervals - 1} cây`, `${intervals + 2} cây`]),
      correctAnswer: q2Ans,
      hint: `Khi trồng ở cả hai đầu đường: Số cây = Số khoảng + 1.`,
      stepByStepExplanation: [
        `Bước 1: Số khoảng cách là: ${totalDist} : ${stepDist} = ${intervals} (khoảng).`,
        `Bước 2: Vì trồng cây ở cả hai đầu đường nên Số cây = Số khoảng + 1 = ${intervals} + 1 = ${q2BothEndsTrees} (cây).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Trồng cây cả 2 đầu: Số cây = Số khoảng (${intervals}) + 1`,
        intervalSubtype: 'both_ends',
        totalLength: totalDist,
        stepLength: stepDist,
        intervalsCount: intervals,
        objectsCount: q2BothEndsTrees,
        objectIcon: '🌳',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Dọc theo lối đi dài ${totalDist} m dẫn vào cổng trạm vũ trụ, ở đầu cổng đã có sẵn nhà bảo vệ nên chỉ lắp cột đèn ở MỘT ĐẦU ĐƯỜNG (đầu kia không lắp), mỗi cột cách nhau ${stepDist} m. Hỏi có bao nhiêu cột đèn?`,
      options: makeOptions(q3Ans, [`${intervals + 1} cột đèn`, `${intervals - 1} cột đèn`, `${intervals + 2} cột đèn`]),
      correctAnswer: q3Ans,
      hint: `Khi chỉ trồng/lắp ở MỘT đầu đường: Số cột đèn = Số khoảng cách!`,
      stepByStepExplanation: [
        `Số khoảng cách trên lối đi là: ${totalDist} : ${stepDist} = ${intervals} (khoảng).`,
        `Vì chỉ lắp cột đèn ở 1 đầu đường nên mỗi khoảng ứng với đúng 1 cột đèn: Số cột đèn = ${intervals}.`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Chỉ đặt ở 1 đầu đường: Số cột = Số khoảng (${intervals})`,
        intervalSubtype: 'one_end',
        totalLength: totalDist,
        stepLength: stepDist,
        intervalsCount: intervals,
        objectsCount: q3OneEndTrees,
        objectIcon: '🏮',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Giữa hai tòa tháp cách nhau ${totalDist} m, người ta đặt các biển báo cách đều nhau ${stepDist} m (sát chân hai tòa tháp ở HAI ĐẦU KHÔNG ĐẶT biển báo). Hỏi có bao nhiêu biển báo?`,
      options: makeOptions(q4Ans, [`${intervals} biển báo`, `${intervals + 1} biển báo`, `${intervals - 2} biển báo`]),
      correctAnswer: q4Ans,
      hint: `Khi cả hai đầu đều KHÔNG đặt vật: Số biển báo = Số khoảng - 1.`,
      stepByStepExplanation: [
        `Số khoảng cách giữa hai tòa tháp là: ${totalDist} : ${stepDist} = ${intervals} (khoảng).`,
        `Vì hai đầu đều không đặt biển báo nên Số biển báo = ${intervals} - 1 = ${q4NeitherEndTrees} (biển báo).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Hai đầu không đặt: Số vật = Số khoảng (${intervals}) - 1`,
        intervalSubtype: 'neither_end',
        totalLength: totalDist,
        stepLength: stepDist,
        intervalsCount: intervals,
        objectsCount: q4NeitherEndTrees,
        objectIcon: '🪧',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Xung quanh một hồ nước hình tròn có chu vi ${q5LoopDist} m, người ta trồng các cây liễu cách đều nhau ${stepDist} m. Hỏi quanh hồ trồng được bao nhiêu cây liễu?`,
      options: makeOptions(q5Ans, [`${q5LoopTrees + 1} cây liễu`, `${q5LoopTrees - 1} cây liễu`, `${q5LoopTrees + 2} cây liễu`]),
      correctAnswer: q5Ans,
      hint: `Trên đường khép kín (hình tròn, hồ nước): Điểm đầu trùng điểm cuối nên Số cây = Số khoảng cách!`,
      stepByStepExplanation: [
        `Trên đường tròn khép kín, số cây luôn bằng đúng số khoảng cách.`,
        `Số cây liễu trồng quanh hồ là: ${q5LoopDist} : ${stepDist} = ${q5LoopTrees} (cây liễu).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Đường khép kín quanh hồ: Số cây = Số khoảng (${q5LoopTrees})`,
        intervalSubtype: 'closed_loop',
        totalLength: q5LoopDist,
        stepLength: stepDist,
        intervalsCount: q5LoopTrees,
        objectsCount: q5LoopTrees,
        objectIcon: '🌿',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Robot thợ mộc cần cưa một khúc gỗ dài thành ${q6Pieces} đoạn ngắn bằng nhau. Biết mỗi lần cưa đứt 1 mạch gỗ mất ${q6MinutesPerCut} phút. Hỏi Robot cần bao nhiêu phút để cưa xong?`,
      options: makeOptions(q6Ans, [
        `${q6Pieces * q6MinutesPerCut} phút`,
        `${(q6Pieces + 1) * q6MinutesPerCut} phút`,
        `${q6TotalMins - 2} phút`
      ]),
      correctAnswer: q6Ans,
      hint: `Cưa thành ${q6Pieces} đoạn thì chỉ cần bao nhiêu LẦN CƯA? (Số lần cưa = Số đoạn - 1).`,
      stepByStepExplanation: [
        `Để cưa khúc gỗ thành ${q6Pieces} đoạn, số lần cưa cần thực hiện là: ${q6Pieces} - 1 = ${q6Cuts} (lần cưa).`,
        `Tổng thời gian cần thiết là: ${q6Cuts} × ${q6MinutesPerCut} = ${q6TotalMins} (phút).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Cưa gỗ: ${q6Pieces} đoạn gỗ ➔ Chỉ cần ${q6Cuts} mạch cưa`,
        intervalSubtype: 'wood_cuts',
        totalLength: q6Pieces,
        stepLength: 1,
        intervalsCount: q6Pieces,
        objectsCount: q6Cuts,
        objectIcon: '🪚',
        unitLabel: 'đoạn'
      }
    },
    {
      id: `nov-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Bạn Benny đi bộ từ Tầng 1 lên Tầng ${q7TopFloor} của Trung tâm Vũ trụ. Biết cầu thang giữa hai tầng liên tiếp bất kỳ đều có ${q7StepsPerFlight} bậc thang. Hỏi Benny phải bước qua tất cả bao nhiêu bậc thang?`,
      options: makeOptions(q7Ans, [
        `${q7TopFloor * q7StepsPerFlight} bậc thang`,
        `${(q7TopFloor - 2) * q7StepsPerFlight} bậc thang`,
        `${q7TotalSteps + 10} bậc thang`
      ]),
      correctAnswer: q7Ans,
      hint: `Từ Tầng 1 lên Tầng ${q7TopFloor} có bao nhiêu khoảng tầng (nhịp cầu thang)? Lấy ${q7TopFloor} - 1!`,
      stepByStepExplanation: [
        `Đi từ Tầng 1 lên Tầng ${q7TopFloor}, số khoảng tầng phải leo là: ${q7TopFloor} - 1 = ${q7TopFloor - 1} (khoảng tầng).`,
        `Tổng số bậc thang Benny phải bước là: ${q7TopFloor - 1} × ${q7StepsPerFlight} = ${q7TotalSteps} (bậc thang).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Leo cầu thang: Tầng 1 ➔ Tầng ${q7TopFloor} có ${q7TopFloor - 1} nhịp cầu thang`,
        intervalSubtype: 'stairs',
        totalLength: q7TotalSteps,
        stepLength: q7StepsPerFlight,
        intervalsCount: q7TopFloor - 1,
        objectsCount: q7TopFloor,
        objectIcon: '🏢',
        unitLabel: 'bậc'
      }
    },
    {
      id: `nov-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Một hàng cây có ${q8Trees} cây trồng thẳng hàng ở cả hai đầu đường, hai cây liên tiếp cách nhau ${q8Gap} m. Hỏi khoảng cách từ cây đầu tiên đến cây cuối cùng là bao nhiêu mét?`,
      options: makeOptions(q8Ans, [`${q8Trees * q8Gap} m`, `${(q8Trees + 1) * q8Gap} m`, `${q8Len - 3} m`]),
      correctAnswer: q8Ans,
      hint: `Có ${q8Trees} cây thì giữa chúng có bao nhiêu khoảng cách? (Số khoảng = Số cây - 1).`,
      stepByStepExplanation: [
        `Giữa ${q8Trees} cây có số khoảng cách là: ${q8Trees} - 1 = ${q8Trees - 1} (khoảng).`,
        `Độ dài từ cây đầu đến cây cuối là: ${q8Trees - 1} × ${q8Gap} = ${q8Len} (m).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Biết ${q8Trees} cây ➔ Có ${q8Trees - 1} khoảng cách`,
        intervalSubtype: 'both_ends',
        totalLength: q8Len,
        stepLength: q8Gap,
        intervalsCount: q8Trees - 1,
        objectsCount: q8Trees,
        objectIcon: '🌲',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Chú ý đọc kỹ đề: Trên đại lộ dài ${totalDist} m, người ta trồng cây ở CẢ HAI BÊN ĐƯỜNG (hai đầu đường đều có cây), mỗi cây cách nhau ${stepDist} m. Hỏi cả hai bên đường trồng tất cả bao nhiêu cây?`,
      options: makeOptions(q9Ans, [`${q9OneSideTrees} cây`, `${intervals * 2} cây`, `${q9BothSidesTrees + 2} cây`]),
      correctAnswer: q9Ans,
      hint: `Bước 1: Tìm số cây ở MỘT bên đường (Số khoảng + 1). Bước 2: Nhân đôi cho HAI bên đường!`,
      stepByStepExplanation: [
        `Bước 1: Số khoảng cách ở một bên đường là: ${totalDist} : ${stepDist} = ${intervals} (khoảng).`,
        `Bước 2: Số cây ở một bên đường là: ${intervals} + 1 = ${q9OneSideTrees} (cây).`,
        `Bước 3: Số cây ở CẢ HAI bên đường là: ${q9OneSideTrees} × 2 = ${q9BothSidesTrees} (cây).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Trồng cây 2 bên đường: (${intervals} + 1) × 2 bên`,
        intervalSubtype: 'both_ends',
        totalLength: totalDist,
        stepLength: stepDist,
        intervalsCount: intervals,
        objectsCount: q9OneSideTrees,
        objectIcon: '🌴',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Đồng hồ đổ chuông: Lúc 4 giờ, đồng hồ gõ ${q10ChimesA} tiếng chuông mất hết ${q10TimeA} giây (tính từ tiếng thứ nhất đến tiếng thứ tư). Hỏi lúc ${q10ChimesB} giờ, đồng hồ gõ ${q10ChimesB} tiếng chuông thì mất bao nhiêu giây?`,
      options: makeOptions(q10Ans, [
        `${q10ChimesB * 2} giây`,
        `${q10TimeB - 2} giây`,
        `${q10TimeB + 4} giây`
      ]),
      correctAnswer: q10Ans,
      hint: `Giữa 4 tiếng chuông chỉ có 4 - 1 = 3 khoảng nghỉ! Vậy mỗi khoảng nghỉ là 6 : 3 = 2 giây. Khi gõ ${q10ChimesB} tiếng thì có ${q10ChimesB} - 1 khoảng nghỉ!`,
      stepByStepExplanation: [
        `Giữa 4 tiếng chuông có số khoảng thời gian là: 4 - 1 = 3 (khoảng).`,
        `Thời gian giữa 2 tiếng chuông liên tiếp là: 6 : 3 = 2 (giây).`,
        `Khi gõ ${q10ChimesB} tiếng chuông, số khoảng thời gian là: ${q10ChimesB} - 1 = ${q10ChimesB - 1} (khoảng).`,
        `Tổng thời gian cần là: ${q10ChimesB - 1} × 2 = ${q10TimeB} (giây).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Tiếng chuông đồng hồ: ${q10ChimesB} tiếng chuông = ${q10ChimesB - 1} khoảng nghỉ`,
        intervalSubtype: 'both_ends',
        totalLength: q10TimeB,
        stepLength: 2,
        intervalsCount: q10ChimesB - 1,
        objectsCount: q10ChimesB,
        objectIcon: '🔔',
        unitLabel: 'giây'
      }
    },
    {
      id: `nov-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Xen Kẽ: Hàng cây trước cổng học viện có ${q11Trees} cây cổ thụ đứng thẳng hàng. Cứ ở mỗi khoảng giữa 2 cây cổ thụ liên tiếp, người ta trồng thêm ${q11FlowersPerGap} khóm hoa hồng. Hỏi có tất cả bao nhiêu khóm hoa hồng?`,
      options: makeOptions(q11Ans, [
        `${q11Trees * q11FlowersPerGap} khóm hoa`,
        `${(q11Trees + 1) * q11FlowersPerGap} khóm hoa`,
        `${q11TotalFlowers - 2} khóm hoa`
      ]),
      correctAnswer: q11Ans,
      hint: `${q11Trees} cây cổ thụ tạo ra ${q11Trees} - 1 khoảng trống ở giữa. Mỗi khoảng có ${q11FlowersPerGap} khóm hoa!`,
      stepByStepExplanation: [
        `Số khoảng trống giữa ${q11Trees} cây cổ thụ là: ${q11Trees} - 1 = ${q11Trees - 1} (khoảng).`,
        `Tổng số khóm hoa hồng được trồng là: ${q11Trees - 1} × ${q11FlowersPerGap} = ${q11TotalFlowers} (khóm hoa).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `${q11Trees} cây ➔ ${q11Trees - 1} khoảng × ${q11FlowersPerGap} khóm hoa`,
        intervalSubtype: 'both_ends',
        totalLength: q11TotalFlowers,
        stepLength: q11FlowersPerGap,
        intervalsCount: q11Trees - 1,
        objectsCount: q11Trees,
        objectIcon: '🌺',
        unitLabel: 'hoa'
      }
    }
  ];

  return {
    id: `nov-day-${day}`,
    dayNumber: day,
    weekNumber: 3,
    weekTitle: IN_MONTH_WEEKS_META[2].title,
    title: titles[idx],
    subtitle: 'Chuẩn Singapore Math F3 · Tuần 3: Toán Đố Khoảng Cách & Ứng Dụng',
    topicTag: 'Toán Khoảng Cách',
    skillDomain: 'interval',
    estimatedMinutes: 30,
    planetIcon: planetIcons[idx],
    accentColor: '#7C3AED',
    learningGoals: [
      'Phân biệt rõ mối quan hệ giữa Số vật và Số khoảng trong 4 mô hình trồng cây',
      'Vận dụng tư duy khoảng cách vào bài toán cưa gỗ, leo cầu thang và tiếng chuông',
      'Giải quyết bài toán trồng cây 2 bên đường và trồng xen kẽ đa tầng'
    ],
    questions
  };
}

function buildWeek4Day(day: number): InMonthDayPlan {
  // Day 22..28: Measurement (Length km/m/cm, Mass kg/g & Scales, Volume L/mL, Bar Charts)
  const idx = day - 22; // 0..6
  const kmVal = 2 + idx; // 2..8 km
  const mExtra = 150 + idx * 50; // 150..450 m
  const totalMeters = kmVal * 1000 + mExtra;

  const mVal = 3 + idx; // 3..9 m
  const cmExtra = 25 + idx * 5; // 25..55 cm
  const totalCm = mVal * 100 + cmExtra;

  const kgVal = 1 + (idx % 3); // 1..3 kg
  const gExtra = 200 + idx * 100; // 200..800 g
  const totalGrams = kgVal * 1000 + gExtra;

  const titles = [
    'Đo Độ Dài Quốc Tế: Quy Đổi Giữa Ki-lô-mét (km), Mét (m) & Xăng-ti-mét (cm)',
    'So Sánh & Tính Toán Độ Dài Đường Bay Vũ Trụ',
    'Đo Khối Lượng: Đọc Cân Đồng Hồ & Đổi Đơn Vị Ki-lô-gam (kg) - Gam (g)',
    'Cân Thăng Bằng & Bài Toán Khối Lượng Kép (Cả Vỏ Và Ruột)',
    'Đo Thể Tích Chất Lỏng: Lít (L), Mi-li-lít (mL) & Bình Chia Độ',
    'So Sánh Độ Dài & Khối Lượng Qua Biểu Đồ Trực Quan',
    'Tổng Hợp Tuần 4: Chuyên Gia Đo Lường Chuẩn Quốc Tế'
  ];
  const planetIcons = ['📏', '🛤️', '⚖️', '🏋️', '🧪', '📊', '🏅'];

  const q1Ans = `${totalMeters} m`;
  const q2Ans = `${totalCm} cm`;
  const q3Ans = `${totalGrams} g`;
  // Q4: Scale reading: pointer shows weight of 3 identical melons
  const singleItemGrams = 300 + idx * 50; // 300..600 g
  const totalScaleGrams = singleItemGrams * 3;
  const q4Ans = `${singleItemGrams} g`;
  // Q5: Volume L and mL subtraction
  const startLiters = 3 + (idx % 3); // 3..5 L
  const pourOutMl = 600 + idx * 50;  // 600..900 mL
  const remainMl = startLiters * 1000 - pourOutMl;
  const q5Ans = `${remainMl} mL`;
  // Q6: Length chart comparison
  const lenA = 240 + idx * 20;
  const lenB = 380 + idx * 30;
  const lenC = 190 + idx * 15;
  const diffBC = lenB - lenC;
  const q6Ans = `${diffBC} cm`;
  // Q7: Rope cutting in cm/m
  const ropeMeters = 4 + (idx % 3); // 4..6 m
  const usedCm = 140 + idx * 10;
  const remainCm = ropeMeters * 100 - usedCm;
  const q7Ans = `${remainCm} cm`;
  // Q8: Total path A -> B -> C in km and m
  const d1 = 1200 + idx * 100;
  const d2 = 1800 - idx * 100; // sum = 3000 m = 3 km
  const q8Ans = `3 km`;
  // Q9: Pouring water between beakers to equalize
  const beakerA = 750 + idx * 20;
  const beakerB = 350 + idx * 20; // diff = 400 mL -> transfer 200 mL
  const q9Ans = `200 mL`;
  // Q10 Challenge: Container + Honey (Half vs Full)
  const emptyBottleG = 150 + idx * 20;
  const halfHoneyG = 400 + idx * 50;
  const halfTotalG = emptyBottleG + halfHoneyG;
  const fullTotalG = emptyBottleG + halfHoneyG * 2;
  const q10Ans = `${emptyBottleG} g`;
  // Q11 Challenge: Overlapping boards nailed together
  const boardLenCm = 80 + idx * 10;
  const overlapCm = 12 + idx;
  const joinedLenCm = boardLenCm * 2 - overlapCm;
  const q11Ans = `${joinedLenCm} cm`;

  const questions: InMonthQuestion[] = [
    {
      id: `nov-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Đổi đơn vị độ dài: Quãng đường tàu thăm dò đi được là ${kmVal} km ${mExtra} m. Đổi ra đơn vị mét (m) được kết quả là bao nhiêu?`,
      options: makeOptions(q1Ans, [`${kmVal * 100 + mExtra} m`, `${totalMeters + 100} m`, `${kmVal + mExtra} m`]),
      correctAnswer: q1Ans,
      hint: `Nhớ quy tắc: 1 km = 1000 m. Vậy ${kmVal} km = ${kmVal * 1000} m, rồi cộng thêm ${mExtra} m.`,
      stepByStepExplanation: [
        `Ta có: 1 km = 1000 m nên ${kmVal} km = ${kmVal * 1000} m.`,
        `Vậy ${kmVal} km ${mExtra} m = ${kmVal * 1000} m + ${mExtra} m = ${totalMeters} m.`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: `Quy đổi Ki-lô-mét sang Mét (1 km = 1000 m)`,
        primaryReading: `${kmVal} km ${mExtra} m`,
        secondaryReading: `${kmVal * 1000} m + ${mExtra} m`,
        conversionRule: '1 km = 1 000 m · 1 m = 100 cm'
      }
    },
    {
      id: `nov-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Cánh buồm năng lượng mặt trời dài ${mVal} m ${cmExtra} cm. Hỏi cánh buồm đó dài bao nhiêu xăng-ti-mét (cm)?`,
      options: makeOptions(q2Ans, [`${mVal * 10 + cmExtra} cm`, `${mVal * 1000 + cmExtra} cm`, `${totalCm + 10} cm`]),
      correctAnswer: q2Ans,
      hint: `1 m = 100 cm. Vậy ${mVal} m = ${mVal * 100} cm.`,
      stepByStepExplanation: [
        `Ta có: 1 m = 100 cm nên ${mVal} m = ${mVal * 100} cm.`,
        `Tổng độ dài là: ${mVal * 100} cm + ${cmExtra} cm = ${totalCm} cm.`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: `Quy đổi Mét sang Xăng-ti-mét (1 m = 100 cm)`,
        primaryReading: `${mVal} m ${cmExtra} cm`,
        secondaryReading: `${mVal * 100} cm + ${cmExtra} cm`,
        conversionRule: '1 m = 10 dm = 100 cm'
      }
    },
    {
      id: `nov-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Trên bàn cân điện tử, túi mẫu đá thiên thạch cân nặng ${kgVal} kg ${gExtra} g. Hãy đổi khối lượng đó sang đơn vị gam (g).`,
      options: makeOptions(q3Ans, [`${kgVal * 100 + gExtra} g`, `${totalGrams + 100} g`, `${totalGrams - 200} g`]),
      correctAnswer: q3Ans,
      hint: `1 kg = 1000 g. Lấy ${kgVal * 1000} g cộng với ${gExtra} g!`,
      stepByStepExplanation: [
        `Ta có: 1 kg = 1000 g nên ${kgVal} kg = ${kgVal * 1000} g.`,
        `Khối lượng tính theo gam là: ${kgVal * 1000} + ${gExtra} = ${totalGrams} (g).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: `Đọc Cân Khối Lượng (1 kg = 1000 g)`,
        primaryReading: `${kgVal} kg ${gExtra} g`,
        secondaryReading: `= ? gam`,
        conversionRule: '1 kg = 1 000 g'
      }
    },
    {
      id: `nov-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Đặt 3 hộp sữa dinh dưỡng giống hệt nhau lên đĩa cân thì kim đồng hồ chỉ đúng vạch ${totalScaleGrams} g. Hỏi MỖI hộp sữa nặng bao nhiêu gam?`,
      options: makeOptions(q4Ans, [`${singleItemGrams + 50} g`, `${singleItemGrams - 50} g`, `${totalScaleGrams - 300} g`]),
      correctAnswer: q4Ans,
      hint: `3 hộp giống nhau nặng ${totalScaleGrams} g. Muốn tìm 1 hộp, ta lấy ${totalScaleGrams} chia cho 3.`,
      stepByStepExplanation: [
        `Tổng khối lượng của 3 hộp sữa là ${totalScaleGrams} g.`,
        `Khối lượng của mỗi hộp sữa là: ${totalScaleGrams} : 3 = ${singleItemGrams} (g).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: `Cân 3 hộp đồng nhất: Tổng = ${totalScaleGrams} g`,
        primaryReading: `3 hộp = ${totalScaleGrams} g`,
        secondaryReading: `1 hộp = ${totalScaleGrams} : 3`,
        conversionRule: 'Chia đều tổng chỉ số cân cho số vật đồng nhất'
      }
    },
    {
      id: `nov-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Bình chứa ban đầu có ${startLiters} L nước tinh khiết. Phi hành gia rót ra ${pourOutMl} mL để tưới vườn cây vũ trụ. Hỏi trong bình còn lại bao nhiêu mi-li-lít (mL) nước?`,
      options: makeOptions(q5Ans, [`${remainMl + 100} mL`, `${remainMl - 100} mL`, `${startLiters * 100 - pourOutMl} mL`]),
      correctAnswer: q5Ans,
      hint: `Đổi ${startLiters} L = ${startLiters * 1000} mL trước, rồi trừ đi ${pourOutMl} mL!`,
      stepByStepExplanation: [
        `Đổi đơn vị: ${startLiters} L = ${startLiters * 1000} mL.`,
        `Lượng nước còn lại trong bình là: ${startLiters * 1000} - ${pourOutMl} = ${remainMl} (mL).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'volume_beaker',
        title: `Đo Thể Tích Chất Lỏng (1 L = 1000 mL)`,
        primaryReading: `Ban đầu: ${startLiters} L (${startLiters * 1000} mL)`,
        secondaryReading: `Rót ra: ${pourOutMl} mL`,
        conversionRule: '1 Lít (L) = 1 000 Mi-li-lít (mL)'
      }
    },
    {
      id: `nov-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Quan sát biểu đồ độ dài của 3 mẫu tên lửa mô hình: Mẫu A dài ${lenA} cm, Mẫu B dài ${lenB} cm, Mẫu C dài ${lenC} cm. Hỏi mẫu dài nhất hơn mẫu ngắn nhất bao nhiêu xăng-ti-mét?`,
      options: makeOptions(q6Ans, [`${lenB - lenA} cm`, `${lenA - lenC} cm`, `${diffBC + 20} cm`]),
      correctAnswer: q6Ans,
      hint: `Mẫu dài nhất là Mẫu B (${lenB} cm), mẫu ngắn nhất là Mẫu C (${lenC} cm). Lấy ${lenB} - ${lenC}!`,
      stepByStepExplanation: [
        `Trong 3 mẫu, Mẫu B dài nhất (${lenB} cm) và Mẫu C ngắn nhất (${lenC} cm).`,
        `Hiệu độ dài giữa mẫu dài nhất và mẫu ngắn nhất là: ${lenB} - ${lenC} = ${diffBC} (cm).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_chart',
        title: 'Biểu đồ so sánh độ dài 3 mẫu tên lửa',
        chartItems: [
          { label: 'Mẫu A', value: lenA, unit: 'cm', color: '#0284C7' },
          { label: 'Mẫu B', value: lenB, unit: 'cm', color: '#7C3AED' },
          { label: 'Mẫu C', value: lenC, unit: 'cm', color: '#10B981' }
        ]
      }
    },
    {
      id: `nov-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Cuộn dây cáp dài ${ropeMeters} m. Kỹ sư cắt ra một đoạn dài ${usedCm} cm để nối mạch điện. Hỏi cuộn dây cáp còn lại dài bao nhiêu xăng-ti-mét?`,
      options: makeOptions(q7Ans, [`${remainCm - 20} cm`, `${remainCm + 10} cm`, `${ropeMeters * 10 - usedCm} cm`]),
      correctAnswer: q7Ans,
      hint: `Đổi ${ropeMeters} m = ${ropeMeters * 100} cm rồi trừ đi ${usedCm} cm.`,
      stepByStepExplanation: [
        `Đổi: ${ropeMeters} m = ${ropeMeters * 100} cm.`,
        `Đoạn dây còn lại dài là: ${ropeMeters * 100} - ${usedCm} = ${remainCm} (cm).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: `Trừ độ dài khác đơn vị: Đổi ${ropeMeters} m = ${ropeMeters * 100} cm`,
        primaryReading: `Tổng: ${ropeMeters} m (${ropeMeters * 100} cm)`,
        secondaryReading: `Cắt đi: ${usedCm} cm`,
        conversionRule: 'Luôn đưa về cùng đơn vị đo trước khi cộng trừ'
      }
    },
    {
      id: `nov-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Tàu tự hành đi từ Trạm 1 đến Trạm 2 hết quãng đường ${d1} m, rồi đi tiếp từ Trạm 2 đến Trạm 3 hết ${d2} m. Hỏi tổng quãng đường tàu đã đi dài bao nhiêu ki-lô-mét (km)?`,
      options: makeOptions(q8Ans, ['2 km', '4 km', '30 km']),
      correctAnswer: q8Ans,
      hint: `Cộng ${d1} m + ${d2} m = 3000 m, sau đó đổi từ mét sang ki-lô-mét!`,
      stepByStepExplanation: [
        `Tổng quãng đường tính theo mét là: ${d1} + ${d2} = 3000 (m).`,
        `Đổi 3000 m = 3 km.`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: `Cộng quãng đường và đổi sang km`,
        primaryReading: `${d1} m + ${d2} m = 3000 m`,
        secondaryReading: `3000 m = ? km`,
        conversionRule: '1000 m = 1 km'
      }
    },
    {
      id: `nov-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Bình A có ${beakerA} mL nước cam, Bình B có ${beakerB} mL nước cam. Hỏi phải rót từ Bình A sang Bình B bao nhiêu mi-li-lít để hai bình có lượng nước cam bằng nhau?`,
      options: makeOptions(q9Ans, ['400 mL', '150 mL', '250 mL']),
      correctAnswer: q9Ans,
      hint: `Bình A nhiều hơn Bình B là ${beakerA} - ${beakerB} = 400 mL. Chia đôi phần chênh lệch để san đều!`,
      stepByStepExplanation: [
        `Hiệu lượng nước giữa hai bình là: ${beakerA} - ${beakerB} = 400 (mL).`,
        `Lượng nước cần rót từ Bình A sang Bình B là: 400 : 2 = 200 (mL).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'volume_beaker',
        title: `San sẻ thể tích: Chênh lệch = ${beakerA - beakerB} mL`,
        primaryReading: `Bình A: ${beakerA} mL`,
        secondaryReading: `Bình B: ${beakerB} mL`,
        conversionRule: 'Lượng rót san bằng = Hiệu thể tích : 2'
      }
    },
    {
      id: `nov-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'measurement',
      prompt: `Thử thách Cân Cả Vỏ Và Ruột: Một hũ thủy tinh đựng ĐẦY mật ong cân nặng ${fullTotalG} g. Nếu chỉ đựng NỬA hũ mật ong thì cân nặng ${halfTotalG} g. Hỏi riêng cái vỏ hũ thủy tinh rỗng nặng bao nhiêu gam?`,
      options: makeOptions(q10Ans, [`${emptyBottleG + 50} g`, `${emptyBottleG - 30} g`, `${halfHoneyG} g`]),
      correctAnswer: q10Ans,
      hint: `Hiệu giữa hũ đầy (${fullTotalG} g) và nửa hũ (${halfTotalG} g) chính là khối lượng của NỬA lượng mật ong (không tính vỏ)!`,
      stepByStepExplanation: [
        `Bước 1: Khối lượng của một nửa lượng mật ong trong hũ là: ${fullTotalG} - ${halfTotalG} = ${halfHoneyG} (g).`,
        `Bước 2: Vì nửa hũ (gồm vỏ + nửa mật ong) nặng ${halfTotalG} g, nên vỏ hũ rỗng nặng là: ${halfTotalG} - ${halfHoneyG} = ${emptyBottleG} (g).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: `Tách khối lượng Vỏ hũ & Ruột mật ong`,
        primaryReading: `Đầy hũ: ${fullTotalG} g`,
        secondaryReading: `Nửa hũ: ${halfTotalG} g`,
        conversionRule: 'Nửa lượng mật ong = Cân đầy hũ - Cân nửa hũ'
      }
    },
    {
      id: `nov-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'measurement',
      prompt: `Thử thách Ghép Thanh Chồng Lấn: Hai thanh hợp kim mỗi thanh dài ${boardLenCm} cm được ghép nối tiếp nhau. Phần chồng khít lên nhau ở mối nối dài ${overlapCm} cm. Hỏi thanh ghép mới dài tất cả bao nhiêu xăng-ti-mét?`,
      options: makeOptions(q11Ans, [`${boardLenCm * 2} cm`, `${joinedLenCm - overlapCm} cm`, `${joinedLenCm + 5} cm`]),
      correctAnswer: q11Ans,
      hint: `Tổng độ dài 2 thanh là ${boardLenCm} × 2 = ${boardLenCm * 2} cm. Vì phần mối nối ${overlapCm} cm bị chồng lên nhau nên phải trừ đi ${overlapCm} cm!`,
      stepByStepExplanation: [
        `Tổng độ dài của 2 thanh khi chưa ghép là: ${boardLenCm} + ${boardLenCm} = ${boardLenCm * 2} (cm).`,
        `Do mối nối chồng lên nhau ${overlapCm} cm, độ dài thanh ghép mới là: ${boardLenCm * 2} - ${overlapCm} = ${joinedLenCm} (cm).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: `Ghép 2 thanh ${boardLenCm} cm có đoạn chồng ${overlapCm} cm`,
        primaryReading: `2 thanh = ${boardLenCm * 2} cm`,
        secondaryReading: `Phần chồng = ${overlapCm} cm`,
        conversionRule: 'Độ dài ghép = Tổng độ dài - Phần chồng lấn'
      }
    }
  ];

  return {
    id: `nov-day-${day}`,
    dayNumber: day,
    weekNumber: 4,
    weekTitle: IN_MONTH_WEEKS_META[3].title,
    title: titles[idx],
    subtitle: 'Chuẩn Singapore Math F3 · Tuần 4: Đo Lường Độ Dài, Khối Lượng, Thể Tích',
    topicTag: 'Đo Lường & Biểu Đồ',
    skillDomain: 'measurement',
    estimatedMinutes: 30,
    planetIcon: planetIcons[idx],
    accentColor: '#EA580C',
    learningGoals: [
      'Quy đổi chính xác giữa km - m - cm, kg - g, và L - mL',
      'Đọc chỉ số cân, bình chia độ và biểu đồ so sánh độ dài',
      'Giải bài toán nâng cao về cân cả vỏ và ruột, ghép thanh chồng lấn'
    ],
    questions
  };
}

function buildReviewDay(day: number): InMonthDayPlan {
  // Day 29 & Day 30: Comprehensive Synthesis across all 4 pillars of November
  const isDay30 = day === 30;
  const k = isDay30 ? 2 : 1;

  const questions: InMonthQuestion[] = [
    {
      id: `nov-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Khởi động Tổng ôn: Đội Tiên Phong có ${18 * k} phi thuyền. Đội Tinh Vân có số phi thuyền gấp 3 lần Đội Tiên Phong. Hỏi cả hai đội có tất cả bao nhiêu phi thuyền?`,
      options: makeOptions(`${72 * k} phi thuyền`, [`${54 * k} phi thuyền`, `${64 * k} phi thuyền`, `${80 * k} phi thuyền`]),
      correctAnswer: `${72 * k} phi thuyền`,
      hint: `Đội Tiên Phong (1 phần) + Đội Tinh Vân (3 phần) = 4 phần. Lấy ${18 * k} × 4!`,
      stepByStepExplanation: [
        `Số phi thuyền của Đội Tinh Vân là: ${18 * k} × 3 = ${54 * k} (phi thuyền).`,
        `Tổng số phi thuyền của cả hai đội là: ${18 * k} + ${54 * k} = ${72 * k} (phi thuyền).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ Phần - Tổng 4 phần',
        bars: [
          { label: 'Tiên Phong', valueLabel: `${18 * k}`, units: 1, color: '#0284C7' },
          { label: 'Tinh Vân', valueLabel: `${54 * k}`, units: 3, color: '#7C3AED' }
        ],
        totalBracketLabel: `Tổng = ${72 * k} phi thuyền`
      }
    },
    {
      id: `nov-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Khởi động Đo lường: Đổi ${3 + k} km ${250 * k} m sang đơn vị mét (m) được kết quả nào?`,
      options: makeOptions(`${(3 + k) * 1000 + 250 * k} m`, [
        `${(3 + k) * 100 + 250 * k} m`,
        `${(3 + k) * 1000 + 25 * k} m`,
        `${(4 + k) * 1000} m`
      ]),
      correctAnswer: `${(3 + k) * 1000 + 250 * k} m`,
      hint: `1 km = 1000 m. Lấy ${(3 + k) * 1000} + ${250 * k}.`,
      stepByStepExplanation: [
        `Đổi ${3 + k} km = ${(3 + k) * 1000} m.`,
        `Cộng thêm ${250 * k} m được ${(3 + k) * 1000 + 250 * k} m.`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: 'Quy đổi đơn vị độ dài km ➔ m',
        primaryReading: `${3 + k} km ${250 * k} m`,
        secondaryReading: `= ${(3 + k) * 1000 + 250 * k} m`,
        conversionRule: '1 km = 1 000 m'
      }
    },
    {
      id: `nov-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Có ${38 + k * 7} học sinh đăng ký tham quan đài thiên văn bằng xe điện, mỗi xe chở tối đa 7 học sinh. Hỏi cần ít nhất bao nhiêu chuyến xe điện để chở hết học sinh?`,
      options: makeOptions(`${6 + k} chuyến xe`, [`${5 + k} chuyến xe`, `${7 + k} chuyến xe`, `${4 + k} chuyến xe`]),
      correctAnswer: `${6 + k} chuyến xe`,
      hint: `Lấy ${38 + k * 7} chia cho 7. Số học sinh còn dư vẫn cần thêm 1 chuyến xe nữa!`,
      stepByStepExplanation: [
        `Ta có: ${38 + k * 7} : 7 = ${5 + k} (dư 3 học sinh).`,
        `3 học sinh còn dư cần thêm 1 chuyến xe nữa nên tổng cộng cần: ${5 + k} + 1 = ${6 + k} (chuyến xe).`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: `Chia ${38 + k * 7} học sinh vào các xe 7 chỗ`,
        dividend: 38 + k * 7,
        divisor: 7,
        quotient: 5 + k,
        remainder: 3,
        itemIcon: '🚌',
        groupLabel: 'Xe'
      }
    },
    {
      id: `nov-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Dọc theo một bên hành lang dài ${40 * k} m, người ta đặt các chậu cây cảnh cách đều nhau 5 m, cả hai đầu hành lang đều có chậu cây. Hỏi có tất cả bao nhiêu chậu cây?`,
      options: makeOptions(`${8 * k + 1} chậu cây`, [`${8 * k} chậu cây`, `${8 * k - 1} chậu cây`, `${8 * k + 2} chậu cây`]),
      correctAnswer: `${8 * k + 1} chậu cây`,
      hint: `Số khoảng = ${40 * k} : 5 = ${8 * k}. Trồng cả hai đầu nên Số cây = Số khoảng + 1!`,
      stepByStepExplanation: [
        `Số khoảng cách là: ${40 * k} : 5 = ${8 * k} (khoảng).`,
        `Vì cả hai đầu hành lang đều đặt chậu cây nên tổng số chậu cây là: ${8 * k} + 1 = ${8 * k + 1} (chậu cây).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Đặt chậu cây 2 đầu hành lang (${40 * k} m)`,
        intervalSubtype: 'both_ends',
        totalLength: 40 * k,
        stepLength: 5,
        intervalsCount: 8 * k,
        objectsCount: 8 * k + 1,
        objectIcon: '🪴',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Trên đĩa cân có 4 quả cầu năng lượng giống hệt nhau, tổng khối lượng cân được là ${1200 * k} g. Hỏi mỗi quả cầu nặng bao nhiêu gam?`,
      options: makeOptions(`${300 * k} g`, [`${250 * k} g`, `${350 * k} g`, `${400 * k} g`]),
      correctAnswer: `${300 * k} g`,
      hint: `Lấy tổng khối lượng ${1200 * k} g chia đều cho 4 quả cầu.`,
      stepByStepExplanation: [
        `Khối lượng của mỗi quả cầu năng lượng là: ${1200 * k} : 4 = ${300 * k} (g).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: `Cân 4 quả cầu đồng nhất (${1200 * k} g)`,
        primaryReading: `4 quả = ${1200 * k} g`,
        secondaryReading: `1 quả = ${300 * k} g`,
        conversionRule: 'Khối lượng 1 vật = Tổng khối lượng : Số vật'
      }
    },
    {
      id: `nov-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Kho A có ${25 * k} thùng hàng. Kho B có nhiều hơn gấp 2 lần Kho A là 10 thùng. Hỏi Kho B có nhiều hơn Kho A bao nhiêu thùng hàng?`,
      options: makeOptions(`${25 * k + 10} thùng`, [`${50 * k + 10} thùng`, `${25 * k} thùng`, `${50 * k} thùng`]),
      correctAnswer: `${25 * k + 10} thùng`,
      hint: `Bước 1: Tìm số thùng ở Kho B (${25 * k} × 2 + 10). Bước 2: Lấy Kho B trừ đi Kho A!`,
      stepByStepExplanation: [
        `Số thùng hàng ở Kho B là: ${25 * k} × 2 + 10 = ${50 * k + 10} (thùng).`,
        `Kho B nhiều hơn Kho A số thùng là: ${50 * k + 10} - ${25 * k} = ${25 * k + 10} (thùng).`
      ],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ so sánh Kho A và Kho B',
        bars: [
          { label: 'Kho A', valueLabel: `${25 * k} thùng`, units: 1, color: '#0284C7' },
          { label: 'Kho B', valueLabel: `${50 * k} + 10 thùng`, units: 2, color: '#F59E0B', highlightNote: '+10 thùng' }
        ],
        differenceBracketLabel: `Hơn = ${25 * k + 10} thùng`
      }
    },
    {
      id: `nov-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Tìm số bị chia lớn nhất trong phép chia có số chia là 8 và thương là ${10 + k}.`,
      options: makeOptions(`${8 * (10 + k) + 7}`, [`${8 * (10 + k) + 8}`, `${8 * (10 + k) + 1}`, `${8 * (10 + k)}`]),
      correctAnswer: `${8 * (10 + k) + 7}`,
      hint: `Số chia là 8 nên số dư lớn nhất là 7. Số bị chia = Thương × 8 + 7!`,
      stepByStepExplanation: [
        `Vì số chia là 8 nên số dư lớn nhất có thể là: 8 - 1 = 7.`,
        `Số bị chia lớn nhất là: ${10 + k} × 8 + 7 = ${8 * (10 + k) + 7}.`
      ],
      visualModel: {
        type: 'remainder_groups',
        title: 'Số bị chia lớn nhất ứng với số dư lớn nhất (7)',
        dividend: 8 * (10 + k) + 7,
        divisor: 8,
        quotient: 10 + k,
        remainder: 7,
        itemIcon: '⭐',
        groupLabel: 'Nhóm 8'
      }
    },
    {
      id: `nov-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Để cắt một thanh thép dài thành ${6 + k} đoạn ngắn, máy cắt lazer cần thực hiện bao nhiêu lần cắt? Nếu mỗi lần cắt hết 4 giây thì mất tất cả bao nhiêu giây?`,
      options: makeOptions(`${(5 + k) * 4} giây`, [`${(6 + k) * 4} giây`, `${(7 + k) * 4} giây`, `${(5 + k) * 3} giây`]),
      correctAnswer: `${(5 + k) * 4} giây`,
      hint: `Số lần cắt = Số đoạn - 1 = ${6 + k} - 1 = ${5 + k} lần cắt!`,
      stepByStepExplanation: [
        `Số lần cắt cần thực hiện là: ${6 + k} - 1 = ${5 + k} (lần cắt).`,
        `Tổng thời gian cắt là: ${5 + k} × 4 = ${(5 + k) * 4} (giây).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Cắt thành ${6 + k} đoạn ➔ ${5 + k} lần cắt`,
        intervalSubtype: 'wood_cuts',
        totalLength: 6 + k,
        stepLength: 1,
        intervalsCount: 6 + k,
        objectsCount: 5 + k,
        objectIcon: '⚡',
        unitLabel: 'đoạn'
      }
    },
    {
      id: `nov-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Một bình chứa ${2 * k} L nước. Sau khi rót đầy vào 3 cốc, mỗi cốc 400 mL, thì trong bình còn lại bao nhiêu mi-li-lít nước?`,
      options: makeOptions(`${2000 * k - 1200} mL`, [`${2000 * k - 800} mL`, `${2000 * k - 400} mL`, `${1000 * k} mL`]),
      correctAnswer: `${2000 * k - 1200} mL`,
      hint: `Đổi ${2 * k} L = ${2000 * k} mL. Trừ đi lượng nước trong 3 cốc (3 × 400 = 1200 mL).`,
      stepByStepExplanation: [
        `Đổi ${2 * k} L = ${2000 * k} mL.`,
        `Lượng nước rót vào 3 cốc là: 400 × 3 = 1200 (mL).`,
        `Lượng nước còn lại trong bình là: ${2000 * k} - 1200 = ${2000 * k - 1200} (mL).`
      ],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'volume_beaker',
        title: `Đổi ${2 * k} L = ${2000 * k} mL rồi trừ 1200 mL`,
        primaryReading: `Ban đầu: ${2000 * k} mL`,
        secondaryReading: `Rót 3 cốc: 1200 mL`,
        conversionRule: '1 L = 1 000 mL'
      }
    },
    {
      id: `nov-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Liên hợp: Dọc theo cả HAI BÊN của một cây cầu dài ${30 * k} m, người ta gắn các ngọn đèn trang trí cách đều nhau 6 m (cả hai đầu cầu đều gắn đèn). Hỏi trên cả hai bên cầu có tất cả bao nhiêu ngọn đèn?`,
      options: makeOptions(`${(5 * k + 1) * 2} ngọn đèn`, [`${5 * k + 1} ngọn đèn`, `${5 * k * 2} ngọn đèn`, `${(5 * k + 2) * 2} ngọn đèn`]),
      correctAnswer: `${(5 * k + 1) * 2} ngọn đèn`,
      hint: `Một bên cầu có (${30 * k} : 6) + 1 = ${5 * k + 1} ngọn đèn. Nhân 2 cho hai bên cầu!`,
      stepByStepExplanation: [
        `Số khoảng cách ở một bên cầu là: ${30 * k} : 6 = ${5 * k} (khoảng).`,
        `Số ngọn đèn ở một bên cầu (có cả 2 đầu) là: ${5 * k} + 1 = ${5 * k + 1} (ngọn đèn).`,
        `Tổng số ngọn đèn ở cả 2 bên cầu là: ${5 * k + 1} × 2 = ${(5 * k + 1) * 2} (ngọn đèn).`
      ],
      visualModel: {
        type: 'interval_model',
        title: `Đèn 2 bên cầu: (${5 * k} khoảng + 1) × 2 bên`,
        intervalSubtype: 'both_ends',
        totalLength: 30 * k,
        stepLength: 6,
        intervalsCount: 5 * k,
        objectsCount: 5 * k + 1,
        objectIcon: '🏮',
        unitLabel: 'm'
      }
    },
    {
      id: `nov-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách Sơ đồ thanh Olympic: Tổng số sách ở hai ngăn là ${60 * k} quyển. Nếu chuyển ${5 * k} quyển từ ngăn trên xuống ngăn dưới thì số sách ở ngăn trên gấp đôi ngăn dưới. Hỏi LÚC ĐẦU ngăn trên có bao nhiêu quyển sách?`,
      options: makeOptions(`${45 * k} quyển`, [`${40 * k} quyển`, `${35 * k} quyển`, `${50 * k} quyển`]),
      correctAnswer: `${45 * k} quyển`,
      hint: `Tổng số sách không đổi (${60 * k} quyển). Lúc sau ngăn trên (2 phần) + ngăn dưới (1 phần) = 3 phần ➔ Ngăn trên lúc sau = ${40 * k} quyển. Cộng trả lại ${5 * k} quyển đã chuyển!`,
      stepByStepExplanation: [
        `Khi chuyển sách giữa hai ngăn, tổng số sách không đổi và bằng ${60 * k} quyển.`,
        `Lúc sau, ngăn trên chiếm 2 phần, ngăn dưới chiếm 1 phần (tổng 3 phần).`,
        `Số sách ngăn trên lúc sau là: (${60 * k} : 3) × 2 = ${40 * k} (quyển).`,
        `Số sách ngăn trên LÚC ĐẦU là: ${40 * k} + ${5 * k} = ${45 * k} (quyển).`
      ],
      visualModel: {
        type: 'bar_model',
        title: `Bất biến Tổng (${60 * k} quyển) & Tính ngược Trước - Sau`,
        bars: [
          { label: 'Ngăn dưới (Sau)', valueLabel: `${20 * k} quyển`, units: 1, color: '#0284C7' },
          { label: 'Ngăn trên (Sau)', valueLabel: `${40 * k} quyển`, units: 2, color: '#7C3AED', highlightNote: `Lúc đầu +${5 * k}` }
        ],
        totalBracketLabel: `Tổng không đổi = ${60 * k} quyển`
      }
    }
  ];

  return {
    id: `nov-day-${day}`,
    dayNumber: day,
    weekNumber: 5,
    weekTitle: IN_MONTH_WEEKS_META[4].title,
    title: isDay30
      ? 'Đại Thử Thách Tổng Duyệt Cuối Tháng 11'
      : 'Tổng Ôn Chiến Lược 4 Chuyên Đề Tháng 11',
    subtitle: 'Chuẩn Singapore Math F3 · Tổng Ôn & Chuẩn Bị Kỳ Thi Đánh Giá Tháng 11',
    topicTag: 'Tổng Ôn Tháng 11',
    skillDomain: isDay30 ? 'interval' : 'bar_model',
    estimatedMinutes: 30,
    planetIcon: isDay30 ? '👑' : '🚀',
    accentColor: '#E11D48',
    learningGoals: [
      'Tổng hợp phản xạ giải toán Sơ đồ thanh, Phép chia có dư, Toán khoảng cách và Đo lường',
      'Rèn luyện tốc độ phân tích đề và tránh bẫy đơn vị / bẫy số khoảng',
      'Sẵn sàng 100% cho Bài Kiểm Tra Tổng Kết Tháng 11'
    ],
    questions
  };
}

export const NOVEMBER_IN_MONTH_DAYS: InMonthDayPlan[] = Array.from({ length: 30 }, (_, i) => {
  const day = i + 1;
  if (day <= 7) return buildWeek1Day(day);
  if (day <= 14) return buildWeek2Day(day);
  if (day <= 21) return buildWeek3Day(day);
  if (day <= 28) return buildWeek4Day(day);
  return buildReviewDay(day);
});

// ============================================================================
// FINAL NOVEMBER EXAM (2 PARTS: PART A BASIC + PART B OLYMPIAD · 20 QUESTIONS)
// ============================================================================

export const NOVEMBER_FINAL_EXAM: InMonthFinalExam = {
  id: 'in-month-november-final-exam',
  monthLabel: 'Tháng 11',
  title: 'Kỳ Thi Đánh Giá Năng Lực Cuối Tháng 11 — Chuẩn Singapore Math F3',
  subtitle: 'Gồm 2 phần: Phần A (Nền tảng Cơ bản · 50 điểm) & Phần B (Tư duy Olympic · 50 điểm)',
  durationMinutes: 35,
  passingScore: 70,
  excellenceScore: 90,
  questions: [
    // PART A: CƠ BẢN (10 câu · 5 điểm/câu = 50 điểm)
    {
      id: 'nov-exam-a1',
      part: 'A',
      points: 5,
      skillDomain: 'bar_model',
      relatedDayNumbers: [1, 2],
      prompt: 'Trạm Không Gian A có 24 vệ tinh. Trạm B có số vệ tinh gấp 3 lần Trạm A. Hỏi cả hai trạm có tất cả bao nhiêu vệ tinh?',
      options: ['72 vệ tinh', '96 vệ tinh', '84 vệ tinh', '90 vệ tinh'],
      correctAnswer: '96 vệ tinh',
      explanation: 'Trạm B có: 24 × 3 = 72 (vệ tinh). Cả hai trạm có: 24 + 72 = 96 (vệ tinh).',
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ Phần - Tổng',
        bars: [
          { label: 'Trạm A', valueLabel: '24', units: 1, color: '#0284C7' },
          { label: 'Trạm B', valueLabel: '24 × 3 = 72', units: 3, color: '#7C3AED' }
        ],
        totalBracketLabel: 'Tổng = 96 vệ tinh'
      }
    },
    {
      id: 'nov-exam-a2',
      part: 'A',
      points: 5,
      skillDomain: 'bar_model',
      relatedDayNumbers: [3, 4],
      prompt: 'Thùng thứ nhất chứa 18 lít nhiên liệu. Thùng thứ hai chứa nhiều hơn gấp 4 lần thùng thứ nhất là 6 lít. Hỏi thùng thứ hai chứa bao nhiêu lít nhiên liệu?',
      options: ['72 lít', '78 lít', '66 lít', '84 lít'],
      correctAnswer: '78 lít',
      explanation: '4 lần thùng thứ nhất là: 18 × 4 = 72 (lít). Thùng thứ hai chứa: 72 + 6 = 78 (lít).',
      visualModel: {
        type: 'bar_model',
        title: 'Gấp 4 lần và thêm 6 lít',
        bars: [
          { label: 'Thùng 1', valueLabel: '18 L', units: 1, color: '#0284C7' },
          { label: 'Thùng 2', valueLabel: '4 phần + 6 L', units: 4, color: '#F59E0B', highlightNote: '+6 L' }
        ]
      }
    },
    {
      id: 'nov-exam-a3',
      part: 'A',
      points: 5,
      skillDomain: 'remainder',
      relatedDayNumbers: [8, 9],
      prompt: 'Biết một số chia cho 7 được thương là 9 và số dư là 5. Số bị chia đó là bao nhiêu?',
      options: ['63', '68', '58', '70'],
      correctAnswer: '68',
      explanation: 'Số bị chia = Thương × Số chia + Số dư = 9 × 7 + 5 = 63 + 5 = 68.',
      visualModel: {
        type: 'remainder_groups',
        title: 'Khôi phục số bị chia: 9 × 7 + 5',
        dividend: 68,
        divisor: 7,
        quotient: 9,
        remainder: 5,
        itemIcon: '⭐',
        groupLabel: 'Nhóm'
      }
    },
    {
      id: 'nov-exam-a4',
      part: 'A',
      points: 5,
      skillDomain: 'remainder',
      relatedDayNumbers: [10, 11],
      prompt: 'Có 45 hành khách cần qua sông bằng thuyền, mỗi chiếc thuyền chở được tối đa 6 hành khách (không kể người lái). Hỏi cần ít nhất bao nhiêu chiếc thuyền để chở hết số khách đó cùng lúc?',
      options: ['7 chiếc thuyền', '8 chiếc thuyền', '6 chiếc thuyền', '9 chiếc thuyền'],
      correctAnswer: '8 chiếc thuyền',
      explanation: 'Ta có 45 : 6 = 7 (dư 3 người). 3 người còn dư cần thêm 1 chiếc thuyền nữa. Vậy cần 7 + 1 = 8 chiếc thuyền.',
      visualModel: {
        type: 'remainder_groups',
        title: 'Bài toán thuê thuyền: 45 : 6 = 7 (dư 3)',
        dividend: 45,
        divisor: 6,
        quotient: 7,
        remainder: 3,
        itemIcon: '🚣',
        groupLabel: 'Thuyền'
      }
    },
    {
      id: 'nov-exam-a5',
      part: 'A',
      points: 5,
      skillDomain: 'interval',
      relatedDayNumbers: [15, 16],
      prompt: 'Trên một đoạn đường dài 48 m, người ta trồng cây ở cả hai đầu đường, cứ cách 6 m trồng một cây. Hỏi trên đoạn đường đó có tất cả bao nhiêu cây?',
      options: ['8 cây', '9 cây', '7 cây', '10 cây'],
      correctAnswer: '9 cây',
      explanation: 'Số khoảng cách là: 48 : 6 = 8 (khoảng). Vì trồng ở cả hai đầu đường nên số cây là: 8 + 1 = 9 (cây).',
      visualModel: {
        type: 'interval_model',
        title: 'Trồng cây cả 2 đầu đường (48 m)',
        intervalSubtype: 'both_ends',
        totalLength: 48,
        stepLength: 6,
        intervalsCount: 8,
        objectsCount: 9,
        objectIcon: '🌳',
        unitLabel: 'm'
      }
    },
    {
      id: 'nov-exam-a6',
      part: 'A',
      points: 5,
      skillDomain: 'interval',
      relatedDayNumbers: [18, 19],
      prompt: 'Bác thợ mộc cưa một cây gỗ dài thành 7 khúc gỗ ngắn. Biết mỗi lần cưa hết 5 phút. Hỏi bác cưa xong cây gỗ đó trong bao nhiêu phút?',
      options: ['35 phút', '30 phút', '25 phút', '40 phút'],
      correctAnswer: '30 phút',
      explanation: 'Cưa thành 7 khúc gỗ thì số lần cưa là: 7 - 1 = 6 (lần cưa). Thời gian cần là: 6 × 5 = 30 (phút).',
      visualModel: {
        type: 'interval_model',
        title: 'Cưa thành 7 khúc ➔ 6 lần cưa',
        intervalSubtype: 'wood_cuts',
        totalLength: 7,
        stepLength: 1,
        intervalsCount: 7,
        objectsCount: 6,
        objectIcon: '🪚',
        unitLabel: 'khúc'
      }
    },
    {
      id: 'nov-exam-a7',
      part: 'A',
      points: 5,
      skillDomain: 'measurement',
      relatedDayNumbers: [22, 23],
      prompt: 'Đổi đơn vị đo độ dài: 4 km 35 m = ... m. Số thích hợp điền vào chỗ chấm là:',
      options: ['435 m', '4035 m', '4350 m', '40035 m'],
      correctAnswer: '4035 m',
      explanation: 'Vì 1 km = 1000 m nên 4 km = 4000 m. Vậy 4 km 35 m = 4000 m + 35 m = 4035 m.',
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: 'Quy đổi 4 km 35 m sang mét',
        primaryReading: '4 km 35 m',
        secondaryReading: '4000 m + 35 m = 4035 m',
        conversionRule: '1 km = 1 000 m'
      }
    },
    {
      id: 'nov-exam-a8',
      part: 'A',
      points: 5,
      skillDomain: 'measurement',
      relatedDayNumbers: [24, 25],
      prompt: 'Một túi gạo nặng 3 kg 450 g. Sau khi lấy ra 1250 g để nấu cơm thì trong túi còn lại bao nhiêu gam gạo?',
      options: ['2200 g', '2150 g', '2250 g', '1800 g'],
      correctAnswer: '2200 g',
      explanation: 'Đổi 3 kg 450 g = 3450 g. Lượng gạo còn lại là: 3450 - 1250 = 2200 (g).',
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: 'Trừ khối lượng: 3450 g - 1250 g',
        primaryReading: 'Ban đầu: 3 kg 450 g (3450 g)',
        secondaryReading: 'Lấy ra: 1250 g',
        conversionRule: '1 kg = 1 000 g'
      }
    },
    {
      id: 'nov-exam-a9',
      part: 'A',
      points: 5,
      skillDomain: 'measurement',
      relatedDayNumbers: [26, 27],
      prompt: 'Một bình nước có 2 L 500 mL nước. Người ta rót đều toàn bộ số nước đó vào 5 chai nhỏ. Hỏi mỗi chai nhỏ có bao nhiêu mi-li-lít nước?',
      options: ['400 mL', '500 mL', '450 mL', '600 mL'],
      correctAnswer: '500 mL',
      explanation: 'Đổi 2 L 500 mL = 2500 mL. Mỗi chai nhỏ có: 2500 : 5 = 500 (mL).',
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'volume_beaker',
        title: 'Chia đều 2500 mL vào 5 chai',
        primaryReading: 'Tổng: 2 L 500 mL = 2500 mL',
        secondaryReading: 'Mỗi chai: 2500 : 5 = 500 mL',
        conversionRule: '1 L = 1 000 mL'
      }
    },
    {
      id: 'nov-exam-a10',
      part: 'A',
      points: 5,
      skillDomain: 'bar_model',
      relatedDayNumbers: [5, 6],
      prompt: 'Có 56 viên pin năng lượng chia đều vào 7 hộp. Hỏi 5 hộp như thế có tất cả bao nhiêu viên pin?',
      options: ['35 viên pin', '40 viên pin', '42 viên pin', '45 viên pin'],
      correctAnswer: '40 viên pin',
      explanation: 'Mỗi hộp có: 56 : 7 = 8 (viên pin). 5 hộp có: 8 × 5 = 40 (viên pin).',
      visualModel: {
        type: 'bar_model',
        title: 'Bài toán Rút về đơn vị',
        bars: [
          { label: '7 hộp', valueLabel: '56 viên (1 hộp = 8)', units: 7, color: '#0284C7' },
          { label: '5 hộp', valueLabel: '8 × 5 = 40 viên', units: 5, color: '#10B981' }
        ]
      }
    },

    // PART B: TƯ DUY OLYMPIC (10 câu · 5 điểm/câu = 50 điểm)
    {
      id: 'nov-exam-b1',
      part: 'B',
      points: 5,
      skillDomain: 'bar_model',
      relatedDayNumbers: [6, 7],
      prompt: '[Olympic Sơ đồ thanh] Hai kho chứa tổng cộng 96 tấn lương thực. Nếu chuyển 8 tấn từ Kho A sang Kho B thì lúc này Kho A có số lương thực gấp đôi Kho B. Hỏi LÚC ĐẦU Kho A có bao nhiêu tấn lương thực?',
      options: ['64 tấn', '72 tấn', '56 tấn', '68 tấn'],
      correctAnswer: '72 tấn',
      explanation: 'Tổng không đổi = 96 tấn. Lúc sau Kho A (2 phần) + Kho B (1 phần) = 3 phần ➔ Kho A lúc sau = (96 : 3) × 2 = 64 tấn. Lúc đầu Kho A có: 64 + 8 = 72 (tấn).',
      visualModel: {
        type: 'bar_model',
        title: 'Bất biến Tổng (96 tấn) & Tính ngược Trước - Sau',
        bars: [
          { label: 'Kho B (Sau)', valueLabel: '32 tấn (1 phần)', units: 1, color: '#0284C7' },
          { label: 'Kho A (Sau)', valueLabel: '64 tấn (2 phần)', units: 2, color: '#7C3AED', highlightNote: 'Lúc đầu +8 tấn' }
        ],
        totalBracketLabel: 'Tổng không đổi = 96 tấn'
      }
    },
    {
      id: 'nov-exam-b2',
      part: 'B',
      points: 5,
      skillDomain: 'bar_model',
      relatedDayNumbers: [4, 7],
      prompt: '[Olympic Hiệu - Tỉ] Số bi của Minh gấp 4 lần số bi của Nam. Nếu Minh cho Nam 12 viên bi thì hai bạn có số bi bằng nhau. Hỏi lúc đầu Nam có bao nhiêu viên bi?',
      options: ['6 viên bi', '8 viên bi', '10 viên bi', '12 viên bi'],
      correctAnswer: '8 viên bi',
      explanation: 'Vì Minh cho Nam 12 viên thì bằng nhau nên lúc đầu Minh hơn Nam: 12 × 2 = 24 (viên). Hiệu số phần là 4 - 1 = 3 phần. Vậy số bi của Nam (1 phần) là: 24 : 3 = 8 (viên).',
      visualModel: {
        type: 'bar_model',
        title: 'Minh cho Nam 12 viên thì bằng nhau ➔ Hiệu = 24 viên',
        bars: [
          { label: 'Bạn Nam', valueLabel: '1 phần', units: 1, color: '#10B981' },
          { label: 'Bạn Minh', valueLabel: '4 phần (Hơn 3 phần = 24)', units: 4, color: '#F59E0B' }
        ],
        differenceBracketLabel: 'Hiệu = 12 × 2 = 24 viên (3 phần)'
      }
    },
    {
      id: 'nov-exam-b3',
      part: 'B',
      points: 5,
      skillDomain: 'remainder',
      relatedDayNumbers: [12, 13],
      prompt: '[Olympic Số dư] Trong một phép chia có số chia là 9, thương là 12 và số dư là số dư lớn nhất có thể có. Nếu đem số bị chia đó chia cho 5 thì số dư là bao nhiêu?',
      options: ['Dư 1', 'Dư 2', 'Dư 3', 'Dư 4'],
      correctAnswer: 'Dư 1',
      explanation: 'Số dư lớn nhất khi chia cho 9 là 8. Số bị chia là: 12 × 9 + 8 = 116. Lấy 116 : 5 = 23 (dư 1).',
      visualModel: {
        type: 'remainder_groups',
        title: 'Tìm số bị chia (12 × 9 + 8 = 116) rồi chia cho 5',
        dividend: 116,
        divisor: 9,
        quotient: 12,
        remainder: 8,
        itemIcon: '🔮',
        groupLabel: 'Nhóm'
      }
    },
    {
      id: 'nov-exam-b4',
      part: 'B',
      points: 5,
      skillDomain: 'remainder',
      relatedDayNumbers: [13, 14],
      prompt: '[Olympic Chu kỳ] Một chuỗi 50 ngôi sao được xếp theo quy luật lặp lại 5 màu: Đỏ, Cam, Vàng, Lục, Lam. Nếu đếm từ đầu đến ngôi sao thứ 47 thì có tất cả bao nhiêu ngôi sao màu Đỏ và màu Cam?',
      options: ['18 ngôi sao', '19 ngôi sao', '20 ngôi sao', '21 ngôi sao'],
      correctAnswer: '20 ngôi sao',
      explanation: 'Ta có 47 : 5 = 9 nhóm (dư 2 ngôi sao). Mỗi nhóm có 2 ngôi sao (Đỏ, Cam), và 2 ngôi sao dư cuối cùng cũng chính là Đỏ và Cam! Tổng cộng: 9 × 2 + 2 = 20 ngôi sao.',
      visualModel: {
        type: 'remainder_groups',
        title: '47 ngôi sao : 5 = 9 chu kỳ (dư 2: Đỏ, Cam)',
        dividend: 47,
        divisor: 5,
        quotient: 9,
        remainder: 2,
        itemIcon: '🌟',
        groupLabel: 'Chu kỳ 5'
      }
    },
    {
      id: 'nov-exam-b5',
      part: 'B',
      points: 5,
      skillDomain: 'interval',
      relatedDayNumbers: [17, 20],
      prompt: '[Olympic Cầu thang] Nhà An ở Tầng 3, nhà Bình ở Tầng 7 của cùng một tòa chung cư. Biết số bậc cầu thang giữa các tầng đều bằng nhau. Đi từ Tầng 1 lên nhà An (Tầng 3) phải bước 36 bậc thang. Hỏi đi từ Tầng 1 lên nhà Bình (Tầng 7) phải bước bao nhiêu bậc thang?',
      options: ['84 bậc thang', '90 bậc thang', '108 bậc thang', '126 bậc thang'],
      correctAnswer: '108 bậc thang',
      explanation: 'Từ Tầng 1 lên Tầng 3 có 3 - 1 = 2 khoảng tầng, nên 1 khoảng tầng có 36 : 2 = 18 bậc. Từ Tầng 1 lên Tầng 7 có 7 - 1 = 6 khoảng tầng, vậy có 18 × 6 = 108 bậc thang!',
      visualModel: {
        type: 'interval_model',
        title: 'Tầng 1 ➔ Tầng 3 (2 khoảng = 36 bậc) · Tầng 1 ➔ Tầng 7 (6 khoảng)',
        intervalSubtype: 'stairs',
        totalLength: 108,
        stepLength: 18,
        intervalsCount: 6,
        objectsCount: 7,
        objectIcon: '🏢',
        unitLabel: 'bậc'
      }
    },
    {
      id: 'nov-exam-b6',
      part: 'B',
      points: 5,
      skillDomain: 'interval',
      relatedDayNumbers: [16, 21],
      prompt: '[Olympic Trồng cây 2 bên đường] Dọc theo HAI BÊN một đoạn đường dài 60 m, người ta trồng các cây thông cách đều nhau 5 m (cả hai đầu đường đều trồng cây). Cứ giữa 2 cây thông liên tiếp trên cùng một bên đường lại đặt 1 ghế đá. Hỏi cả hai bên đường có tất cả bao nhiêu ghế đá?',
      options: ['12 ghế đá', '24 ghế đá', '26 ghế đá', '22 ghế đá'],
      correctAnswer: '24 ghế đá',
      explanation: 'Số khoảng cách giữa các cây ở MỘT bên đường là: 60 : 5 = 12 (khoảng), ứng với 12 ghế đá. Vậy cả HAI bên đường có: 12 × 2 = 24 (ghế đá).',
      visualModel: {
        type: 'interval_model',
        title: 'Mỗi bên có 60 : 5 = 12 khoảng (12 ghế đá) × 2 bên đường',
        intervalSubtype: 'both_ends',
        totalLength: 60,
        stepLength: 5,
        intervalsCount: 12,
        objectsCount: 13,
        objectIcon: '🌲',
        unitLabel: 'm'
      }
    },
    {
      id: 'nov-exam-b7',
      part: 'B',
      points: 5,
      skillDomain: 'interval',
      relatedDayNumbers: [18, 21],
      prompt: '[Olympic Khép kín] Xung quanh một sân vận động hình chữ nhật có chiều dài 50 m và chiều rộng 30 m, người ta cắm các cột cờ cách đều nhau 4 m. Hỏi quanh sân có tất cả bao nhiêu cột cờ?',
      options: ['38 cột cờ', '40 cột cờ', '42 cột cờ', '44 cột cờ'],
      correctAnswer: '40 cột cờ',
      explanation: 'Chu vi sân hình chữ nhật (đường khép kín) là: (50 + 30) × 2 = 160 (m). Trên đường khép kín, số cột cờ = số khoảng = 160 : 4 = 40 (cột cờ).',
      visualModel: {
        type: 'interval_model',
        title: 'Chu vi khép kín = 160 m ➔ Số cột cờ = 160 : 4 = 40',
        intervalSubtype: 'closed_loop',
        totalLength: 160,
        stepLength: 4,
        intervalsCount: 40,
        objectsCount: 40,
        objectIcon: '🚩',
        unitLabel: 'm'
      }
    },
    {
      id: 'nov-exam-b8',
      part: 'B',
      points: 5,
      skillDomain: 'measurement',
      relatedDayNumbers: [25, 28],
      prompt: '[Olympic Khối lượng Cả vỏ & Ruột] Một thùng sắt đựng đầy dầu hỏa cân nặng 22 kg. Sau khi rót ra một nửa lượng dầu hỏa trong thùng thì thùng dầu còn lại cân nặng 12 kg. Hỏi riêng vỏ thùng sắt rỗng nặng bao nhiêu ki-lô-gam?',
      options: ['1 kg', '2 kg', '3 kg', '4 kg'],
      correctAnswer: '2 kg',
      explanation: 'Một nửa lượng dầu hỏa nặng là: 22 - 12 = 10 (kg). Vậy vỏ thùng sắt rỗng nặng là: 12 - 10 = 2 (kg).',
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: 'Nửa lượng dầu = 22 kg - 12 kg = 10 kg',
        primaryReading: 'Đầy thùng: 22 kg',
        secondaryReading: 'Nửa thùng: 12 kg',
        conversionRule: 'Vỏ thùng = Cân nửa thùng (12 kg) - Nửa lượng dầu (10 kg)'
      }
    },
    {
      id: 'nov-exam-b9',
      part: 'B',
      points: 5,
      skillDomain: 'measurement',
      relatedDayNumbers: [26, 28],
      prompt: '[Olympic Ghép thước] Ba thanh gỗ mỗi thanh dài 60 cm được đóng nối tiếp nhau thành một thanh dài. Biết ở mỗi chỗ nối, hai thanh gỗ chồng khít lên nhau một đoạn dài 8 cm. Hỏi thanh gỗ ghép từ 3 thanh đó dài bao nhiêu xăng-ti-mét?',
      options: ['172 cm', '164 cm', '156 cm', '168 cm'],
      correctAnswer: '164 cm',
      explanation: 'Tổng độ dài 3 thanh là: 60 × 3 = 180 (cm). Ghép 3 thanh nối tiếp nhau có 3 - 1 = 2 mối nối chồng lên nhau. Độ dài thanh ghép là: 180 - (8 × 2) = 180 - 16 = 164 (cm).',
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_scale',
        title: 'Ghép 3 thanh gỗ (60 cm) có 2 mối nối chồng 8 cm',
        primaryReading: 'Tổng 3 thanh: 180 cm',
        secondaryReading: '2 mối nối: 2 × 8 = 16 cm',
        conversionRule: 'Ghép N thanh nối tiếp có (N - 1) mối nối chồng lấn'
      }
    },
    {
      id: 'nov-exam-b10',
      part: 'B',
      points: 5,
      skillDomain: 'measurement',
      relatedDayNumbers: [27, 29, 30],
      prompt: '[Olympic Đo lường & Sơ đồ] Ba bình A, B, C chứa tổng cộng 2 L 400 mL nước. Biết bình A chứa nhiều hơn bình B 200 mL, và bình C chứa gấp đôi tổng lượng nước của bình A và bình B. Hỏi bình A chứa bao nhiêu mi-li-lít nước?',
      options: ['400 mL', '500 mL', '600 mL', '450 mL'],
      correctAnswer: '500 mL',
      explanation: 'Đổi 2 L 400 mL = 2400 mL. Tổng (A + B) là 1 phần, C là 2 phần (tổng 3 phần) ➔ A + B = 2400 : 3 = 800 mL. Vì A hơn B 200 mL nên bình A có: (800 + 200) : 2 = 500 (mL).',
      visualModel: {
        type: 'bar_model',
        title: 'Tổng = 2400 mL · (A+B) = 800 mL · Hiệu (A-B) = 200 mL',
        bars: [
          { label: 'Bình B', valueLabel: '300 mL', units: 1, color: '#0284C7' },
          { label: 'Bình A', valueLabel: '300 + 200 = 500 mL', units: 2, color: '#10B981', highlightNote: '+200 mL' },
          { label: 'Bình C', valueLabel: '1600 mL (Gấp đôi A+B)', units: 4, color: '#7C3AED' }
        ],
        totalBracketLabel: 'Tổng 3 bình = 2 L 400 mL (2400 mL)'
      }
    }
  ]
};
