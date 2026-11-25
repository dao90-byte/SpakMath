import type {
  SingaporeCPASpec,
  CPAConcreteGroup,
  PerimeterPictorialSpec,
  MeasurementPictorialSpec,
  BarModelPictorialSpec,
} from '../types/singaporeCPA';
import { makeBarSpec } from '../utils/singaporeCPABuilder';
import type {
  InMonthDayPlan,
  InMonthQuestion,
  InMonthFinalExam,
  InMonthExamQuestion,
  InMonthSkillDomain,
  InMonthVisualModelConfig,
} from './inMonthNovemberData';

// ============================================================================
// CHƯƠNG TRÌNH IN MONTH THÁNG 12 (LỚP 3 · HỌC KỲ 2)
// CHUẨN TOÁN TƯ DUY SINGAPORE CPA (CONCRETE - PICTORIAL - ABSTRACT)
// 30 NGÀY × 11 CÂU = 330 CÂU HỎI + ĐỀ THI CUỐI THÁNG 20 CÂU
// ============================================================================
// Mapping 4 trụ cột năng lực Tháng 12 trên InMonthSkillDomain:
// - 'interval'    -> Tuần 1: Chu Vi Cơ Bản & Toán Ngược (Hình Vuông & Hình Chữ Nhật)
// - 'bar_model'   -> Tuần 2: Chu Vi Hình Ghép & Kỹ Thuật Dời Cạnh (Chữ L, Bậc Thang, Chữ U, Ghép Hình)
// - 'remainder'   -> Tuần 3: Đo Lường Khối Lượng (Gam – Ki-lô-gam, Trừ Bì & Cân Thăng Bằng)
// - 'measurement' -> Tuần 4: Đo Lường Thể Tích (Lít – Mi-li-lít, San Bình & Toán Rót Nước)
// ============================================================================

function makeOptions(correct: string, distractors: string[]): string[] {
  const set = new Set<string>([correct]);
  for (const d of distractors) {
    if (d && d.trim() !== '' && d !== correct) {
      set.add(d);
    }
    if (set.size === 4) break;
  }
  let bump = 2;
  while (set.size < 4) {
    const match = correct.match(/(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      set.add(correct.replace(match[1], String(n + bump)));
    } else {
      set.add(`${correct} (${bump})`);
    }
    bump += 3;
  }
  const arr = Array.from(set).slice(0, 4);
  const seed = correct.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shift = seed % arr.length;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
}

function buildPerimeterVisual(
  title: string,
  concrete: SingaporeCPASpec['concrete'],
  pictorial: PerimeterPictorialSpec,
  abstract: SingaporeCPASpec['abstract']
): InMonthVisualModelConfig {
  return {
    type: 'perimeter_shape',
    title,
    cpaSpec: {
      version: '1.0',
      domain: 'perimeter_shape',
      concrete,
      pictorial,
      abstract,
    },
  };
}

function buildMeasurementVisual(
  title: string,
  concrete: SingaporeCPASpec['concrete'],
  pictorial: MeasurementPictorialSpec,
  abstract: SingaporeCPASpec['abstract']
): InMonthVisualModelConfig {
  return {
    type: 'measurement_lab',
    title,
    measurementSubtype: pictorial.subtype,
    primaryReading: pictorial.primaryReading,
    secondaryReading: pictorial.secondaryReading,
    conversionRule: pictorial.conversionRule,
    chartItems: pictorial.chartItems,
    cpaSpec: {
      version: '1.0',
      domain: 'measurement_lab',
      concrete,
      pictorial,
      abstract,
    },
  };
}

function buildBarVisual(
  title: string,
  concrete: SingaporeCPASpec['concrete'],
  pictorial: BarModelPictorialSpec,
  abstract: SingaporeCPASpec['abstract']
): InMonthVisualModelConfig {
  return {
    type: 'bar_model',
    title,
    cpaSpec: {
      version: '1.0',
      domain: 'bar_model',
      concrete,
      pictorial,
      abstract,
    },
  };
}

// ============================================================================
// TUẦN 1 (NGÀY 1 – 7): CHU VI HÌNH VUÔNG, HÌNH CHỮ NHẬT & TOÁN NGƯỢC
// ============================================================================

const WEEK1_THEMES = [
  {
    title: 'Ngày 1: Khái niệm Chu vi & Chu vi Hình vuông',
    topicTag: 'Chu vi hình vuông',
    goals: [
      'Hiểu bản chất chu vi là tổng độ dài toàn bộ đường viền khép kín',
      'Tính nhanh chu vi hình vuông và tìm cạnh hình vuông khi biết chu vi',
    ],
  },
  {
    title: 'Ngày 2: Chu vi Hình chữ nhật & Bí kíp Nửa chu vi',
    topicTag: 'Chu vi hình chữ nhật',
    goals: [
      'Vận dụng công thức Chu vi hình chữ nhật = (Dài + Rộng) × 2',
      'Tách cặp (1 Dài + 1 Rộng) để làm chủ khái niệm Nửa chu vi',
    ],
  },
  {
    title: 'Ngày 3: Toán ngược tìm Chiều dài – Chiều rộng từ Chu vi',
    topicTag: 'Toán ngược chu vi',
    goals: [
      'Tìm Nửa chu vi trước bằng cách lấy Chu vi chia cho 2',
      'Suy ngược ra Chiều dài hoặc Chiều rộng khi biết cạnh còn lại',
    ],
  },
  {
    title: 'Ngày 4: Đổi đơn vị đo (m – dm – cm) trước khi tính Chu vi',
    topicTag: 'Đổi đơn vị chu vi',
    goals: [
      'Phát hiện bẫy khác đơn vị đo giữa chiều dài và chiều rộng',
      'Đổi thống nhất về cùng một đơn vị (cm hoặc dm) rồi mới cộng nhân',
    ],
  },
  {
    title: 'Ngày 5: Chu vi kết hợp Sơ đồ thanh (Gấp lần & Hơn kém)',
    topicTag: 'Chu vi & Sơ đồ thanh',
    goals: [
      'Kết hợp Sơ đồ thanh Singapore với công thức chu vi hình chữ nhật',
      'Giải bài toán chiều dài gấp 2, 3 lần chiều rộng hoặc hơn chiều rộng d đơn vị',
    ],
  },
  {
    title: 'Ngày 6: Rào vườn chừa cổng & Uốn dây bảo toàn Chu vi',
    topicTag: 'Rào vườn & Uốn dây',
    goals: [
      'Tính độ dài hàng rào thực tế khi có chừa khoảng trống cổng ra vào',
      'Áp dụng định luật bảo toàn độ dài khi uốn cùng một sợi dây thành hình mới',
    ],
  },
  {
    title: 'Ngày 7: Tổng ôn Tuần 1 — Chinh phục Chu vi cơ bản & Toán ngược',
    topicTag: 'Tổng ôn Tuần 1',
    goals: [
      'Tổng hợp phản xạ tính chu vi hình vuông, hình chữ nhật và toán ngược',
      'Sẵn sàng vượt qua Bài Kiểm Tra 15 Phút Cuối Tuần 1',
    ],
  },
];

function buildWeek1Questions(day: number): InMonthQuestion[] {
  // Clean calibrated dimensions per day (day 1..7)
  const sqSide = 7 + day * 2; // 9, 11, 13, 15, 17, 19, 21
  const sqPerim = sqSide * 4;

  const rectW = 6 + day; // 7..13
  const rectL = rectW + 5 + (day % 3) * 2; // 14, 15, 14, 17, 18, 17, 20
  const halfP = rectL + rectW;
  const rectP = halfP * 2;

  const revSqSide = 8 + day * 3; // 11, 14, 17, 20, 23, 26, 29
  const revSqPerim = revSqSide * 4;

  const revRectW = 9 + day; // 10..16
  const revRectL = revRectW + 6 + (day % 2) * 2; // 18, 17, 20, 19, 22, 21, 24
  const revRectP = (revRectL + revRectW) * 2;

  // Unit conversion: L in dm, W in cm (safeDmL >= 3 so safeCmL is always strictly > safeCmW)
  const safeDmL = 3 + (day % 4); // 4, 5, 6, 3, 4, 5, 6 dm -> 30..60 cm
  const safeCmL = safeDmL * 10;
  const safeCmW = 10 + day * 2; // 12..24 cm (strictly < 30..60)
  const convP = (safeCmL + safeCmW) * 2;

  // Ratio rectangle: L = mult * W
  const ratioW = 6 + day; // 7..13
  const ratioMult = day % 2 === 0 ? 3 : 2;
  const ratioL = ratioW * ratioMult;
  const ratioP = (ratioL + ratioW) * 2;

  // Reverse find Width given P & L
  const findW_L = 18 + day * 2; // 20..32
  const findW_W = 8 + day; // 9..15
  const findW_P = (findW_L + findW_W) * 2;

  // Fence with gate
  const gardenL = 16 + day * 2; // 18..30 m
  const gardenW = 10 + day; // 11..17 m
  const gate = 2 + (day % 3); // 3, 4, 2, 3, 4, 2, 3 m
  const gardenP = (gardenL + gardenW) * 2;
  const fenceLen = gardenP - gate;

  // Wire bending: Square -> Rectangle (conserved perimeter)
  const wireSqSide = 10 + day * 2; // 12, 14, 16, 18, 20, 22, 24 cm
  const wireP = wireSqSide * 4; // 48, 56, 64, 72, 80, 88, 96 cm
  const wireHalf = wireP / 2; // 24, 28, 32, 36, 40, 44, 48 cm
  const wireRectW = wireSqSide - 4; // 8, 10, 12, 14, 16, 18, 20 cm
  const wireRectL = wireHalf - wireRectW; // 16, 18, 20, 22, 24, 26, 28 cm

  // Challenge Q11: Reverse Sum-Ratio from Perimeter (P known, L = 2*W or 3*W, find W or L)
  const chMult = day % 2 === 1 ? 2 : 3;
  const chW = 6 + day; // 7..13 cm
  const chL = chW * chMult;
  const chHalf = chW + chL; // (chMult + 1) * chW
  const chP = chHalf * 2;

  return [
    // Q1 (Warmup): Square Perimeter
    {
      id: `dec-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'interval',
      prompt: `Một tấm pin mặt trời hình vuông có độ dài mỗi cạnh là ${sqSide} cm. Tính chu vi của tấm pin mặt trời đó.`,
      options: makeOptions(`${sqPerim} cm`, [
        `${sqSide * 2} cm`,
        `${sqPerim + 4} cm`,
        `${sqPerim - 4} cm`,
      ]),
      correctAnswer: `${sqPerim} cm`,
      hint: `Hình vuông có 4 cạnh bằng nhau. Chu vi hình vuông = độ dài 1 cạnh × 4.`,
      stepByStepExplanation: [
        `Hình vuông gồm 4 cạnh đều dài ${sqSide} cm.`,
        `Chu vi tấm pin là: ${sqSide} × 4 = ${sqPerim} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Chu vi hình vuông cạnh ${sqSide} cm`,
        {
          itemName: 'cạnh hình vuông',
          unitLabel: 'cm',
          actionPrompt: 'Đếm đủ 4 cạnh bằng nhau chạy dọc đường viền hình vuông',
          interactiveRule: `Mỗi cạnh dài ${sqSide} cm, có tất cả 4 cạnh bằng nhau.`,
          groups: [
            {
              id: 'g_sq',
              label: '4 cạnh bằng nhau',
              icon: '⬜',
              count: 4,
              unitValue: sqSide,
              totalValue: sqPerim,
              color: '#38BDF8',
              isUnknown: true,
              showUnitValueBeforeSolve: true,
              displayMode: 'measurement',
            },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'square',
          outerWidth: sqSide,
          outerHeight: sqSide,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: sqPerim,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Độ dài 1 cạnh hình vuông} = ${sqSide}\\text{ cm}`,
            `\\text{Chu vi hình vuông} = ${sqSide} \\;?\\; 4 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Độ dài 1 cạnh hình vuông} = ${sqSide}\\text{ cm}`,
            `\\text{Chu vi hình vuông} = ${sqSide} \\times 4 = ${sqPerim}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${sqPerim}\\text{ cm}`,
          finalNumericValue: sqPerim,
        }
      ),
    },

    // Q2 (Warmup): Rectangle Half-Perimeter
    {
      id: `dec-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'interval',
      prompt: `Một bảng điều khiển hình chữ nhật có chiều dài ${rectL} cm và chiều rộng ${rectW} cm. Hỏi NỬA CHU VI của bảng điều khiển đó là bao nhiêu xăng-ti-mét?`,
      options: makeOptions(`${halfP} cm`, [
        `${rectP} cm`,
        `${rectL - rectW} cm`,
        `${halfP + 2} cm`,
      ]),
      correctAnswer: `${halfP} cm`,
      hint: `Nửa chu vi hình chữ nhật là tổng của 1 chiều dài và 1 chiều rộng.`,
      stepByStepExplanation: [
        `Nửa chu vi gồm 1 cạnh dài và 1 cạnh rộng.`,
        `Nửa chu vi bảng điều khiển là: ${rectL} + ${rectW} = ${halfP} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Tách Nửa chu vi (1 Chiều dài + 1 Chiều rộng)`,
        {
          itemName: 'đoạn viền',
          unitLabel: 'cm',
          actionPrompt: 'Bấm nút "Tách Nửa Chu Vi" trên hình để quan sát 1 cạnh dài ghép với 1 cạnh rộng',
          interactiveRule: `Nửa chu vi gồm 1 chiều dài (${rectL} cm) và 1 chiều rộng (${rectW} cm).`,
          groups: [
            { id: 'g_l', label: '1 chiều dài', icon: '📏', count: 1, unitValue: rectL, totalValue: rectL, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_w', label: '1 chiều rộng', icon: '📐', count: 1, unitValue: rectW, totalValue: rectW, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: rectL,
          outerHeight: rectW,
          unitLabel: 'cm',
          unknownTarget: 'half_perimeter',
          expectedPerimeter: rectP,
          sideShiftHint: 'Bấm nút bên phải để tô sáng 1 Dài + 1 Rộng (Nửa chu vi)',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${rectL} \\;?\\; ${rectW} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi hình chữ nhật} = ${rectL} + ${rectW} = ${halfP}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${halfP}\\text{ cm}`,
          finalNumericValue: halfP,
        }
      ),
    },

    // Q3 (VisualModel): Full Rectangle Perimeter
    {
      id: `dec-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Một sân đáp tàu hình chữ nhật có chiều dài ${rectL} m và chiều rộng ${rectW} m. Tính chu vi của sân đáp đó.`,
      options: makeOptions(`${rectP} m`, [
        `${halfP} m`,
        `${rectP + 4} m`,
        `${rectL * 2 + rectW} m`,
      ]),
      correctAnswer: `${rectP} m`,
      hint: `Chu vi hình chữ nhật bằng tổng chiều dài và chiều rộng (cùng đơn vị đo) rồi nhân với 2.`,
      stepByStepExplanation: [
        `Nửa chu vi sân đáp là: ${rectL} + ${rectW} = ${halfP} (m).`,
        `Chu vi sân đáp là: ${halfP} × 2 = ${rectP} (m).`,
      ],
      visualModel: buildPerimeterVisual(
        `Chu vi hình chữ nhật ${rectL} m × ${rectW} m`,
        {
          itemName: 'cặp cạnh',
          unitLabel: 'm',
          actionPrompt: 'Nhóm thành 2 cặp (1 Dài + 1 Rộng) để tính chu vi nhanh gọn',
          interactiveRule: `Chiều dài = ${rectL} m, chiều rộng = ${rectW} m. Hình có 2 cặp như thế.`,
          groups: [
            { id: 'g_l', label: '2 cạnh dài', icon: '🟦', count: 2, unitValue: rectL, totalValue: rectL * 2, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `2 × ${rectL} m` },
            { id: 'g_w', label: '2 cạnh rộng', icon: '🟨', count: 2, unitValue: rectW, totalValue: rectW * 2, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: `2 × ${rectW} m` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: rectL,
          outerHeight: rectW,
          unitLabel: 'm',
          unknownTarget: 'perimeter',
          expectedPerimeter: rectP,
          sideShiftHint: 'Gộp (Dài + Rộng) thành 1 cặp Nửa chu vi rồi gấp đôi',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${rectL} \\;?\\; ${rectW} = ?`,
            `\\text{Chu vi hình chữ nhật} = (\\text{Nửa chu vi}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi} = ${rectL} + ${rectW} = ${halfP}\\text{ (m)}`,
            `\\text{Chu vi sân đáp} = ${halfP} \\times 2 = ${rectP}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${rectP}\\text{ m}`,
          finalNumericValue: rectP,
        }
      ),
    },

    // Q4 (VisualModel): Reverse Square — Find Side given Perimeter
    {
      id: `dec-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Một khung ảnh thiên văn hình vuông có chu vi bằng ${revSqPerim} cm. Hỏi mỗi cạnh của khung ảnh hình vuông đó dài bao nhiêu xăng-ti-mét?`,
      options: makeOptions(`${revSqSide} cm`, [
        `${revSqSide * 2} cm`,
        `${revSqSide + 2} cm`,
        `${revSqSide - 2} cm`,
      ]),
      correctAnswer: `${revSqSide} cm`,
      hint: `Vì 4 cạnh hình vuông bằng nhau nên muốn tìm 1 cạnh, ta lấy Chu vi chia cho 4.`,
      stepByStepExplanation: [
        `Hình vuông có 4 cạnh bằng nhau với tổng độ dài là ${revSqPerim} cm.`,
        `Độ dài 1 cạnh hình vuông là: ${revSqPerim} : 4 = ${revSqSide} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Toán ngược hình vuông: Chu vi = ${revSqPerim} cm`,
        {
          itemName: 'cạnh bằng nhau',
          unitLabel: 'cm',
          actionPrompt: `Chia đều tổng đường viền ${revSqPerim} cm thành 4 cạnh bằng nhau`,
          interactiveRule: `4 cạnh bằng nhau có tổng độ dài là ${revSqPerim} cm.`,
          groups: [
            {
              id: 'g_rev_sq',
              label: `Tổng 4 cạnh = ${revSqPerim} cm`,
              icon: '⬜',
              count: 4,
              unitValue: revSqSide,
              totalValue: revSqPerim,
              color: '#34D399',
              isUnknown: true,
              displayMode: 'measurement',
            },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'square',
          outerWidth: revSqSide,
          outerHeight: revSqSide,
          unitLabel: 'cm',
          unknownTarget: 'side',
          expectedPerimeter: revSqPerim,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tổng 4 cạnh (Chu vi)} = ${revSqPerim}\\text{ cm}`,
            `\\text{Độ dài 1 cạnh} = ${revSqPerim} \\;?\\; 4 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Độ dài 1 cạnh hình vuông} = ${revSqPerim} \\div 4 = ${revSqSide}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${revSqSide}\\text{ cm}`,
          finalNumericValue: revSqSide,
        }
      ),
    },

    // Q5 (VisualModel): Reverse Rectangle — Find Length given Perimeter and Width
    {
      id: `dec-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Một khu vườn hình chữ nhật có chu vi là ${revRectP} m và chiều rộng là ${revRectW} m. Tính chiều dài của khu vườn đó.`,
      options: makeOptions(`${revRectL} m`, [
        `${revRectP - revRectW} m`,
        `${revRectL + 2} m`,
        `${revRectL - 2} m`,
      ]),
      correctAnswer: `${revRectL} m`,
      hint: `Bước 1: Tìm Nửa chu vi (Chu vi : 2). Bước 2: Lấy Nửa chu vi trừ đi Chiều rộng.`,
      stepByStepExplanation: [
        `Nửa chu vi khu vườn là: ${revRectP} : 2 = ${revRectL + revRectW} (m).`,
        `Chiều dài khu vườn là: ${revRectL + revRectW} - ${revRectW} = ${revRectL} (m).`,
      ],
      visualModel: buildPerimeterVisual(
        `Tìm Chiều dài khi biết Chu vi = ${revRectP} m`,
        {
          itemName: 'nửa chu vi',
          unitLabel: 'm',
          actionPrompt: 'Bấm "Tách Nửa Chu Vi" để thấy Chu vi chia đôi gồm 1 Chiều dài + 1 Chiều rộng',
          interactiveRule: `Chu vi = ${revRectP} m, chiều rộng = ${revRectW} m.`,
          groups: [
            { id: 'g_w', label: 'Chiều rộng đã biết', icon: '📐', count: 1, unitValue: revRectW, totalValue: revRectW, color: '#F59E0B', displayMode: 'measurement' },
            { id: 'g_l', label: 'Chiều dài cần tìm', icon: '📏', count: 1, unitValue: revRectL, totalValue: revRectL, color: '#38BDF8', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: revRectL,
          outerHeight: revRectW,
          unitLabel: 'm',
          unknownTarget: 'length',
          expectedPerimeter: revRectP,
          sideShiftHint: 'Nhớ tìm Nửa chu vi (Chu vi ÷ 2) trước khi trừ chiều rộng!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${revRectP} \\;?\\; 2 = ?`,
            `\\text{Chiều dài} = (\\text{Nửa chu vi}) \\;?\\; ${revRectW} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi khu vườn} = ${revRectP} \\div 2 = ${revRectL + revRectW}\\text{ (m)}`,
            `\\text{Chiều dài khu vườn} = ${revRectL + revRectW} - ${revRectW} = ${revRectL}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${revRectL}\\text{ m}`,
          finalNumericValue: revRectL,
        }
      ),
    },

    // Q6 (Practice): Unit Conversion before Rectangle Perimeter
    {
      id: `dec-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Một tấm bản đồ hình chữ nhật có chiều dài ${safeDmL} dm và chiều rộng ${safeCmW} cm. Tính chu vi tấm bản đồ theo đơn vị xăng-ti-mét (cm).`,
      options: makeOptions(`${convP} cm`, [
        `${(safeDmL + safeCmW) * 2} cm`,
        `${safeCmL + safeCmW} cm`,
        `${convP + 10} cm`,
      ]),
      correctAnswer: `${convP} cm`,
      hint: `Đổi ${safeDmL} dm sang cm trước (1 dm = 10 cm), sau đó áp dụng công thức chu vi hình chữ nhật.`,
      stepByStepExplanation: [
        `Đổi chiều dài: ${safeDmL} dm = ${safeCmL} cm.`,
        `Chu vi tấm bản đồ là: (${safeCmL} + ${safeCmW}) × 2 = ${convP} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Đổi đơn vị (${safeDmL} dm → cm) trước khi tính chu vi`,
        {
          itemName: 'kích thước',
          unitLabel: 'cm',
          actionPrompt: `Quy đổi ${safeDmL} dm về đơn vị cm (1 dm = 10 cm) rồi tính chu vi`,
          interactiveRule: `Dài = ${safeDmL} dm, Rộng = ${safeCmW} cm. Phải cùng đơn vị cm trước khi cộng!`,
          groups: [
            { id: 'g_dl', label: `Chiều dài (${safeDmL} dm)`, icon: '📏', count: safeDmL, unitValue: 10, totalValue: safeCmL, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${safeDmL} dm` },
            { id: 'g_cw', label: 'Chiều rộng', icon: '📐', count: 1, unitValue: safeCmW, totalValue: safeCmW, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: safeCmL,
          outerHeight: safeCmW,
          widthLabel: `${safeDmL} dm`,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: convP,
          sideShiftHint: 'Quy đổi cùng đơn vị cm trước khi tính (Dài + Rộng) × 2',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${safeDmL}\\text{ dm} = ${safeDmL} \\;?\\; 10 = ?\\text{ (cm)}`,
            `\\text{Chu vi} = (\\text{Dài cm} \\;?\\; ${safeCmW}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${safeDmL}\\text{ dm} = ${safeCmL}\\text{ cm}`,
            `\\text{Chu vi tấm bản đồ} = (${safeCmL} + ${safeCmW}) \\times 2 = ${convP}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${convP}\\text{ cm}`,
          finalNumericValue: convP,
        }
      ),
    },

    // Q7 (Practice): Rectangle where Length = mult * Width
    {
      id: `dec-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Một mảnh đất hình chữ nhật có chiều rộng ${ratioW} m và chiều dài gấp ${ratioMult} lần chiều rộng. Tính chu vi mảnh đất đó.`,
      options: makeOptions(`${ratioP} m`, [
        `${ratioL + ratioW} m`,
        `${ratioL} m`,
        `${ratioP + ratioW} m`,
      ]),
      correctAnswer: `${ratioP} m`,
      hint: `Bước 1: Tính chiều dài = chiều rộng × ${ratioMult}. Bước 2: Tính chu vi = (Dài + Rộng) × 2.`,
      stepByStepExplanation: [
        `Chiều dài mảnh đất là: ${ratioW} × ${ratioMult} = ${ratioL} (m).`,
        `Chu vi mảnh đất là: (${ratioL} + ${ratioW}) × 2 = ${ratioP} (m).`,
      ],
      visualModel: buildPerimeterVisual(
        `Chiều dài gấp ${ratioMult} lần Chiều rộng (${ratioW} m)`,
        {
          itemName: 'phần cạnh',
          unitLabel: 'm',
          actionPrompt: `Tính chiều dài (${ratioMult} phần) trước, rồi tính chu vi hình chữ nhật`,
          interactiveRule: `Chiều rộng = ${ratioW} m (1 phần), Chiều dài = ${ratioMult} phần.`,
          groups: [
            { id: 'g_rw', label: 'Chiều rộng (1 phần)', icon: '📐', count: 1, unitValue: ratioW, totalValue: ratioW, color: '#34D399', displayMode: 'measurement' },
            { id: 'g_rl', label: `Chiều dài (${ratioMult} phần)`, icon: '📏', count: ratioMult, unitValue: ratioW, totalValue: ratioL, color: '#38BDF8', isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: ratioL,
          outerHeight: ratioW,
          widthLabel: `Gấp ${ratioMult} lần rộng`,
          unitLabel: 'm',
          unknownTarget: 'perimeter',
          expectedPerimeter: ratioP,
          sideShiftHint: 'Tìm chiều dài rồi cộng chiều rộng, sau đó nhân 2',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chiều dài} = ${ratioW} \\;?\\; ${ratioMult} = ?`,
            `\\text{Chu vi} = (\\text{Chiều dài} \\;?\\; ${ratioW}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chiều dài mảnh đất} = ${ratioW} \\times ${ratioMult} = ${ratioL}\\text{ (m)}`,
            `\\text{Chu vi mảnh đất} = (${ratioL} + ${ratioW}) \\times 2 = ${ratioP}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${ratioP}\\text{ m}`,
          finalNumericValue: ratioP,
        }
      ),
    },

    // Q8 (Practice): Reverse Rectangle — Find Width given Perimeter and Length
    {
      id: `dec-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Một sân bóng mini hình chữ nhật có chu vi ${findW_P} m và chiều dài ${findW_L} m. Hỏi chiều rộng của sân bóng là bao nhiêu mét?`,
      options: makeOptions(`${findW_W} m`, [
        `${findW_P - findW_L} m`,
        `${findW_W + 3} m`,
        `${findW_W - 2} m`,
      ]),
      correctAnswer: `${findW_W} m`,
      hint: `Tìm Nửa chu vi bằng cách chia chu vi cho 2, sau đó trừ đi chiều dài.`,
      stepByStepExplanation: [
        `Nửa chu vi sân bóng là: ${findW_P} : 2 = ${findW_L + findW_W} (m).`,
        `Chiều rộng sân bóng là: ${findW_L + findW_W} - ${findW_L} = ${findW_W} (m).`,
      ],
      visualModel: buildPerimeterVisual(
        `Tìm Chiều rộng khi biết Chu vi = ${findW_P} m`,
        {
          itemName: 'nửa chu vi',
          unitLabel: 'm',
          actionPrompt: 'Chia đôi chu vi để tìm tổng (Dài + Rộng), rồi bớt đi chiều dài đã biết',
          interactiveRule: `Chu vi = ${findW_P} m, chiều dài = ${findW_L} m.`,
          groups: [
            { id: 'g_fl', label: 'Chiều dài đã biết', icon: '📏', count: 1, unitValue: findW_L, totalValue: findW_L, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_fw', label: 'Chiều rộng cần tìm', icon: '📐', count: 1, unitValue: findW_W, totalValue: findW_W, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: findW_L,
          outerHeight: findW_W,
          unitLabel: 'm',
          unknownTarget: 'width',
          expectedPerimeter: findW_P,
          sideShiftHint: 'Bấm "Tách Nửa Chu Vi" để quan sát 1 Dài + 1 Rộng = Chu vi ÷ 2',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${findW_P} \\;?\\; 2 = ?`,
            `\\text{Chiều rộng} = (\\text{Nửa chu vi}) \\;?\\; ${findW_L} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi sân bóng} = ${findW_P} \\div 2 = ${findW_L + findW_W}\\text{ (m)}`,
            `\\text{Chiều rộng sân bóng} = ${findW_L + findW_W} - ${findW_L} = ${findW_W}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${findW_W}\\text{ m}`,
          finalNumericValue: findW_W,
        }
      ),
    },

    // Q9 (Practice): Fence with Gate opening
    {
      id: `dec-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Bác kỹ sư muốn làm hàng rào bao quanh một khu vườn hình chữ nhật dài ${gardenL} m, rộng ${gardenW} m. Ở một cạnh có chừa lối cổng ra vào rộng ${gate} m (không làm rào). Hỏi hàng rào cần làm dài bao nhiêu mét?`,
      options: makeOptions(`${fenceLen} m`, [
        `${gardenP} m`,
        `${gardenP + gate} m`,
        `${gardenL + gardenW - gate} m`,
      ]),
      correctAnswer: `${fenceLen} m`,
      hint: `Tính toàn bộ chu vi khu vườn trước, rồi trừ đi độ rộng của cổng ra vào (${gate} m).`,
      stepByStepExplanation: [
        `Chu vi toàn bộ khu vườn là: (${gardenL} + ${gardenW}) × 2 = ${gardenP} (m).`,
        `Độ dài hàng rào cần làm (trừ cổng ${gate} m) là: ${gardenP} - ${gate} = ${fenceLen} (m).`,
      ],
      visualModel: buildPerimeterVisual(
        `Rào vườn ${gardenL} m × ${gardenW} m (chừa cổng ${gate} m)`,
        {
          itemName: 'hàng rào',
          unitLabel: 'm',
          actionPrompt: 'Tính chu vi cả 4 mặt vườn rồi trừ đi phần lối cổng không cần rào',
          interactiveRule: `Chiều dài = ${gardenL} m, chiều rộng = ${gardenW} m, cổng mở = ${gate} m.`,
          groups: [
            { id: 'g_gl', label: '2 cạnh dài', icon: '🌿', count: 2, unitValue: gardenL, totalValue: gardenL * 2, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: `2 × ${gardenL} m` },
            { id: 'g_gw', label: '2 cạnh rộng', icon: '🌱', count: 2, unitValue: gardenW, totalValue: gardenW * 2, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `2 × ${gardenW} m` },
            { id: 'g_gate', label: 'Chừa lối cổng', icon: '🚪', count: 1, unitValue: gate, totalValue: gate, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: gardenL,
          outerHeight: gardenW,
          unitLabel: 'm',
          unknownTarget: 'fence_with_gate',
          gateWidth: gate,
          expectedPerimeter: gardenP,
          sideShiftHint: 'Hàng rào thực tế = Chu vi hình chữ nhật − Chiều rộng cổng',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chu vi khu vườn} = (${gardenL} \\;?\\; ${gardenW}) \\;?\\; 2 = ?`,
            `\\text{Độ dài hàng rào} = (\\text{Chu vi}) \\;?\\; ${gate} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chu vi khu vườn} = (${gardenL} + ${gardenW}) \\times 2 = ${gardenP}\\text{ (m)}`,
            `\\text{Độ dài hàng rào thực tế} = ${gardenP} - ${gate} = ${fenceLen}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${fenceLen}\\text{ m}`,
          finalNumericValue: fenceLen,
        }
      ),
    },

    // Q10 (Challenge): Conserved Wire Perimeter (Square -> Rectangle)
    {
      id: `dec-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Bảo toàn Chu vi: Một sợi dây thép được uốn thành hình vuông cạnh ${wireSqSide} cm. Sau đó người ta duỗi thẳng sợi dây và uốn lại thành một hình chữ nhật có chiều rộng ${wireRectW} cm. Tính chiều dài của hình chữ nhật mới uốn được.`,
      options: makeOptions(`${wireRectL} cm`, [
        `${wireP - wireRectW} cm`,
        `${wireSqSide} cm`,
        `${wireRectL + 4} cm`,
      ]),
      correctAnswer: `${wireRectL} cm`,
      hint: `Cùng một sợi dây nên Chu vi hình chữ nhật = Chu vi hình vuông. Tìm chu vi sợi dây trước, chia 2 ra Nửa chu vi, rồi trừ đi chiều rộng ${wireRectW} cm.`,
      stepByStepExplanation: [
        `Độ dài sợi dây (chu vi không đổi) là: ${wireSqSide} × 4 = ${wireP} (cm).`,
        `Nửa chu vi hình chữ nhật là: ${wireP} : 2 = ${wireHalf} (cm).`,
        `Chiều dài hình chữ nhật là: ${wireHalf} - ${wireRectW} = ${wireRectL} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Uốn dây thép: Hình vuông cạnh ${wireSqSide} cm ➔ Hình chữ nhật rộng ${wireRectW} cm`,
        {
          itemName: 'sợi dây thép',
          unitLabel: 'cm',
          actionPrompt: 'Sợi dây không đổi độ dài nên Chu vi hai hình bằng nhau!',
          interactiveRule: `Chu vi hình chữ nhật = Chu vi hình vuông cạnh ${wireSqSide} cm.`,
          groups: [
            { id: 'g_wire', label: `Hình vuông (4 × ${wireSqSide} cm)`, icon: '➰', count: 4, unitValue: wireSqSide, totalValue: wireP, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `4 × ${wireSqSide} cm` },
            { id: 'g_rw', label: 'Chiều rộng mới', icon: '📐', count: 1, unitValue: wireRectW, totalValue: wireRectW, color: '#F59E0B', displayMode: 'measurement' },
            { id: 'g_rl', label: 'Chiều dài mới', icon: '📏', count: 1, unitValue: wireRectL, totalValue: wireRectL, color: '#34D399', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'rectangle',
          outerWidth: wireRectL,
          outerHeight: wireRectW,
          unitLabel: 'cm',
          unknownTarget: 'length',
          expectedPerimeter: wireP,
          hidePerimeterBeforeSolve: true,
          sideShiftHint: 'Cùng 1 sợi dây ➔ Chu vi bảo toàn. Chia đôi chu vi để tìm (Dài + Rộng)!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Độ dài sợi dây (Chu vi)} = ${wireSqSide} \\;?\\; 4 = ?`,
            `\\text{Nửa chu vi hình chữ nhật} = (\\text{Chu vi}) \\;?\\; 2 = ?`,
            `\\text{Chiều dài} = (\\text{Nửa chu vi}) \\;?\\; ${wireRectW} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chu vi sợi dây} = ${wireSqSide} \\times 4 = ${wireP}\\text{ (cm)}`,
            `\\text{Nửa chu vi hình chữ nhật} = ${wireP} \\div 2 = ${wireHalf}\\text{ (cm)}`,
            `\\text{Chiều dài hình chữ nhật} = ${wireHalf} - ${wireRectW} = ${wireRectL}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${wireRectL}\\text{ cm}`,
          finalNumericValue: wireRectL,
        }
      ),
    },

    // Q11 (Challenge): Perimeter + Bar Model Sum-Ratio
    {
      id: `dec-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Sơ đồ thanh & Chu vi: Một bảng hiệu hình chữ nhật có chu vi ${chP} cm. Biết chiều dài gấp ${chMult} lần chiều rộng. Tính chiều rộng của bảng hiệu đó.`,
      options: makeOptions(`${chW} cm`, [
        `${chL} cm`,
        `${chW * 2} cm`,
        `${chW + 3} cm`,
      ]),
      correctAnswer: `${chW} cm`,
      hint: `Bước 1: Tìm Nửa chu vi = ${chP} : 2. Bước 2: Chiều rộng 1 phần, chiều dài ${chMult} phần ➔ Nửa chu vi gồm 1 + ${chMult} phần bằng nhau!`,
      stepByStepExplanation: [
        `Nửa chu vi (tổng chiều dài và chiều rộng) là: ${chP} : 2 = ${chHalf} (cm).`,
        `Tổng số phần bằng nhau trong nửa chu vi là: 1 + ${chMult} = ${chMult + 1} (phần).`,
        `Chiều rộng (1 phần) là: ${chHalf} : ${chMult + 1} = ${chW} (cm).`,
      ],
      visualModel: buildBarVisual(
        `Nửa chu vi = Chiều rộng (1 phần) + Chiều dài (${chMult} phần)`,
        {
          itemName: 'phần cạnh',
          unitLabel: 'cm',
          actionPrompt: 'Tìm Nửa chu vi trước, rồi chia đều theo tổng số phần bằng nhau của Dài và Rộng',
          interactiveRule: `Chu vi = ${chP} cm. Trong nửa chu vi, Chiều rộng = 1 phần, Chiều dài = ${chMult} phần.`,
          groups: [
            { id: 'g_cw', label: 'Chiều rộng (1 phần)', icon: '📐', count: 1, unitValue: chW, totalValue: chW, color: '#34D399', isUnknown: true },
            { id: 'g_cl', label: `Chiều dài (${chMult} phần)`, icon: '📏', count: chMult, unitValue: chW, totalValue: chL, color: '#38BDF8', isUnknown: true },
          ],
        },
        {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: chW,
          unitName: 'cm',
          bars: [
            makeBarSpec({
              id: 'bar_w',
              label: 'Chiều rộng',
              units: 1,
              unitValue: chW,
              displayValue: '? cm (1 phần)',
              isUnknown: true,
              color: '#34D399',
            }),
            makeBarSpec({
              id: 'bar_l',
              label: 'Chiều dài',
              units: chMult,
              unitValue: chW,
              displayValue: `? cm (${chMult} phần)`,
              isUnknown: true,
              color: '#38BDF8',
            }),
          ],
          totalBracket: {
            targetBarIds: ['bar_w', 'bar_l'],
            numericValue: chHalf,
            displayLabel: 'Nửa chu vi = ?',
            isUnknown: true,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${chP} \\;?\\; 2 = ?`,
            `\\text{Tổng số phần} = 1 \\;?\\; ${chMult} = ?`,
            `\\text{Chiều rộng (1 phần)} = (\\text{Nửa chu vi}) \\;?\\; (\\text{Tổng số phần}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi} = ${chP} \\div 2 = ${chHalf}\\text{ (cm)}`,
            `\\text{Tổng số phần bằng nhau} = 1 + ${chMult} = ${chMult + 1}\\text{ (phần)}`,
            `\\text{Chiều rộng} = ${chHalf} \\div ${chMult + 1} = ${chW}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${chW}\\text{ cm}`,
          finalNumericValue: chW,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 2 (NGÀY 8 – 14): CHU VI HÌNH GHÉP & KỸ THUẬT DỜI CẠNH (SIDE-SHIFTING)
// ============================================================================

const WEEK2_THEMES = [
  {
    title: 'Ngày 8: Ghép 2, 3, 4 Hình vuông thành Hình chữ nhật',
    topicTag: 'Ghép hình vuông',
    goals: [
      'Nhận diện các cạnh chung bị giấu bên trong không được tính vào chu vi',
      'Tính nhanh chu vi hình chữ nhật ghép từ N hình vuông giống hệt nhau',
    ],
  },
  {
    title: 'Ngày 9: Ghép lưới ô vuông (2×2, 2×3) & Cắt hình chữ nhật',
    topicTag: 'Ghép & cắt hình',
    goals: [
      'Tính chu vi khi ghép nhiều hình vuông thành lưới chữ nhật nhiều hàng',
      'So sánh tổng chu vi trước và sau khi cắt 1 hình chữ nhật thành 2 hình',
    ],
  },
  {
    title: 'Ngày 10: Kỹ thuật Dời Cạnh (Side-Shifting) cho Hình Chữ L',
    topicTag: 'Dời cạnh chữ L',
    goals: [
      'Hiểu bản chất dời cạnh ngang và cạnh dọc ra khung hình chữ nhật bao ngoài',
      'Khám phá bí mật: Cắt một góc hình chữ nhật KHÔNG làm thay đổi chu vi!',
    ],
  },
  {
    title: 'Ngày 11: Chu vi Hình Bậc Thang nhiều bậc bằng Dời Cạnh',
    topicTag: 'Hình bậc thang',
    goals: [
      'Dời đồng thời nhiều bậc ngang và bậc dọc về khung bao ngoài',
      'Tính chu vi hình bậc thang phức tạp chỉ trong 1 phép tính gọn gàng',
    ],
  },
  {
    title: 'Ngày 12: Hình Chữ U — Bẫy kinh điển "2 Cạnh Lõm Thừa (+2×d)"',
    topicTag: 'Hình chữ U lõm',
    goals: [
      'Phân biệt cắt ở góc (chu vi không đổi) với cắt lõm ở giữa cạnh (tăng thêm 2 đoạn)',
      'Tính chính xác chu vi hình chữ U bằng công thức: Khung ngoài + 2 × độ sâu lõm',
    ],
  },
  {
    title: 'Ngày 13: Toán ngược Hình ghép & Hình Chữ T / Khuyết nhiều góc',
    topicTag: 'Toán ngược hình ghép',
    goals: [
      'Tìm chiều cao hoặc độ sâu lõm khi biết tổng chu vi hình chữ L / chữ U',
      'Vận dụng linh hoạt kỹ thuật dời cạnh cho hình khuyết 2 góc đối diện',
    ],
  },
  {
    title: 'Ngày 14: Tổng ôn Tuần 2 — Tư duy Olympic Chu vi Hình ghép',
    topicTag: 'Tổng ôn Tuần 2',
    goals: [
      'Làm chủ hoàn toàn kỹ thuật dời cạnh và đếm cạnh ngoài khi ghép hình',
      'Sẵn sàng chinh phục Bài Kiểm Tra 15 Phút Cuối Tuần 2',
    ],
  },
];

function buildWeek2Questions(day: number): InMonthQuestion[] {
  const offset = day - 7; // 1..7

  // Q1: 2 squares joined in a row (1×2)
  const sq1 = 4 + offset; // 5..11 cm
  const pJoin2 = 2 * (sq1 * 2 + sq1); // 6 * sq1

  // Q2: 3 squares joined in a row (1×3)
  const sq2 = 3 + offset; // 4..10 cm
  const pJoin3 = 2 * (sq2 * 3 + sq2); // 8 * sq2

  // Q3: L-shape basic (cut corner from rectangle)
  const lW = 14 + offset * 2; // 16..28 cm
  const lH = 10 + offset; // 11..17 cm
  const lCutW = 4 + (offset % 3); // 5, 6, 4...
  const lCutH = 3 + (offset % 3); // 4, 5, 3...
  const pL = 2 * (lW + lH);

  // Q4: Staircase 3-step (same as bounding rectangle!)
  const stW = 18 + offset * 2; // 20..32 cm
  const stH = 12 + offset; // 13..19 cm
  const pStair = 2 * (stW + stH);

  // Q5: U-shape (recessed notch adds + 2 * depth!)
  const uW = 16 + offset * 2; // 18..30 cm
  const uH = 10 + offset; // 11..17 cm
  const uDepth = 3 + (offset % 4); // 4, 5, 6, 3, 4, 5, 6 cm
  const uNotchW = 6;
  const pU = 2 * (uW + uH) + 2 * uDepth;

  // Q6: 2×3 grid of joined squares (6 identical squares)
  const gridSq = 3 + offset; // 4..10 cm
  const gridCols = 3;
  const gridRows = 2;
  const pGrid = 2 * (gridSq * gridCols + gridSq * gridRows); // 10 * gridSq

  // Q7: Cut rectangle (2×1 squares) into 2 squares -> find perimeter of 1 square
  const cutSqSide = 6 + offset; // 7..13 cm
  const origRectL = cutSqSide * 2;
  const origRectW = cutSqSide;
  const origRectP = 2 * (origRectL + origRectW); // 6 * cutSqSide
  const oneSqP = cutSqSide * 4;

  // Q8: 4 squares joined in a row -> reverse find side of 1 square given rectangle perimeter
  const row4Side = 4 + offset; // 5..11 cm
  const row4P = 2 * (row4Side * 4 + row4Side); // 10 * row4Side

  // Q9: L-shape reverse: given outer width and perimeter -> find outer height!
  const revLW = 15 + offset * 2; // 17..29 m
  const revLH = 9 + offset; // 10..16 m
  const revLP = 2 * (revLW + revLH);

  // Q10 (Challenge): U-shape reverse -> find recess depth given outer W, H and total perimeter!
  const chUW = 18 + offset * 2; // 20..32 cm
  const chUH = 12 + offset; // 13..19 cm
  const chUDepth = 4 + (offset % 4); // 5, 6, 7, 4, 5, 6, 7 cm
  const chURectP = 2 * (chUW + chUH);
  const chUP = chURectP + 2 * chUDepth;

  // Q11 (Challenge): Cut a small corner square from a larger square -> perimeter stays unchanged!
  const bigSq = 12 + offset * 2; // 14..26 cm
  const smallCut = 3 + (offset % 4); // 4, 5, 6, 3...
  const bigSqP = bigSq * 4;

  return [
    // Q1 (Warmup): Join 2 squares
    {
      id: `dec-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Ghép sát 2 hình vuông bằng nhau cạnh ${sq1} cm thành một hình chữ nhật. Tính chu vi của hình chữ nhật mới ghép được.`,
      options: makeOptions(`${pJoin2} cm`, [
        `${sq1 * 8} cm`,
        `${sq1 * 4} cm`,
        `${pJoin2 + sq1} cm`,
      ]),
      correctAnswer: `${pJoin2} cm`,
      hint: `Hình chữ nhật mới có chiều dài bằng 2 cạnh hình vuông (${sq1} × 2) và chiều rộng bằng ${sq1} cm. Lưu ý: cạnh chung ở giữa KHÔNG tính vào chu vi!`,
      stepByStepExplanation: [
        `Chiều dài hình chữ nhật ghép được là: ${sq1} × 2 = ${sq1 * 2} (cm); chiều rộng là ${sq1} cm.`,
        `Chu vi hình chữ nhật là: (${sq1 * 2} + ${sq1}) × 2 = ${pJoin2} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Ghép 2 hình vuông cạnh ${sq1} cm thành hình chữ nhật`,
        {
          itemName: 'đoạn viền ngoài',
          unitLabel: 'cm',
          actionPrompt: 'Đếm các đoạn viền xanh bên ngoài (bỏ qua đường nét đứt chung ở giữa)',
          interactiveRule: `Mỗi hình vuông có cạnh ${sq1} cm. Khi ghép 2 hình vuông có 6 đoạn cạnh nằm ở viền ngoài.`,
          groups: [
            { id: 'g_top', label: 'Viền trên + dưới (4 đoạn)', icon: '🟦', count: 4, unitValue: sq1, totalValue: sq1 * 4, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `4 × ${sq1} cm` },
            { id: 'g_side', label: 'Viền trái + phải (2 đoạn)', icon: '🟩', count: 2, unitValue: sq1, totalValue: sq1 * 2, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: `2 × ${sq1} cm` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'joined_squares',
          outerWidth: sq1 * 2,
          outerHeight: sq1,
          squareSide: sq1,
          gridCols: 2,
          gridRows: 1,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: pJoin2,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chiều dài hình mới} = ${sq1} \\;?\\; 2 = ?`,
            `\\text{Chu vi hình chữ nhật} = (\\text{Chiều dài} \\;?\\; ${sq1}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chiều dài hình chữ nhật mới} = ${sq1} \\times 2 = ${sq1 * 2}\\text{ (cm)}`,
            `\\text{Chu vi hình chữ nhật} = (${sq1 * 2} + ${sq1}) \\times 2 = ${pJoin2}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${pJoin2}\\text{ cm}`,
          finalNumericValue: pJoin2,
        }
      ),
    },

    // Q2 (Warmup): Join 3 squares in a row
    {
      id: `dec-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Xếp liền nhau 3 viên gạch hình vuông cạnh ${sq2} cm thành một hàng ngang. Tính chu vi của hình chữ nhật tạo bởi 3 viên gạch đó.`,
      options: makeOptions(`${pJoin3} cm`, [
        `${sq2 * 12} cm`,
        `${pJoin3 - sq2 * 2} cm`,
        `${pJoin3 + sq2 * 2} cm`,
      ]),
      correctAnswer: `${pJoin3} cm`,
      hint: `Chiều dài hàng gạch bằng ${sq2} × 3, chiều rộng bằng ${sq2} cm.`,
      stepByStepExplanation: [
        `Chiều dài hình chữ nhật là: ${sq2} × 3 = ${sq2 * 3} (cm), chiều rộng là ${sq2} cm.`,
        `Chu vi hình chữ nhật là: (${sq2 * 3} + ${sq2}) × 2 = ${pJoin3} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Ghép 3 hình vuông cạnh ${sq2} cm thành 1 hàng`,
        {
          itemName: 'đoạn cạnh ngoài',
          unitLabel: 'cm',
          actionPrompt: 'Quan sát 2 cạnh chung bị ẩn bên trong, chỉ cộng đường viền bao ngoài',
          interactiveRule: `3 viên gạch cạnh ${sq2} cm ghép thành 1 hàng ngang.`,
          groups: [
            { id: 'g_h', label: 'Trên + Dưới (6 đoạn)', icon: '🧱', count: 6, unitValue: sq2, totalValue: sq2 * 6, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `6 × ${sq2} cm` },
            { id: 'g_v', label: 'Trái + Phải (2 đoạn)', icon: '🧱', count: 2, unitValue: sq2, totalValue: sq2 * 2, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: `2 × ${sq2} cm` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'joined_squares',
          outerWidth: sq2 * 3,
          outerHeight: sq2,
          squareSide: sq2,
          gridCols: 3,
          gridRows: 1,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: pJoin3,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chiều dài 3 viên gạch} = ${sq2} \\;?\\; 3 = ?`,
            `\\text{Chu vi hình chữ nhật} = (\\text{Chiều dài} \\;?\\; ${sq2}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chiều dài} = ${sq2} \\times 3 = ${sq2 * 3}\\text{ (cm)}`,
            `\\text{Chu vi} = (${sq2 * 3} + ${sq2}) \\times 2 = ${pJoin3}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${pJoin3}\\text{ cm}`,
          finalNumericValue: pJoin3,
        }
      ),
    },

    // Q3 (VisualModel): L-Shape Side-Shifting
    {
      id: `dec-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Một mảnh sàn hình chữ L có chiều ngang lớn nhất ${lW} cm và chiều cao lớn nhất ${lH} cm (được tạo ra bằng cách cắt đi một hình chữ nhật nhỏ ở góc trên bên phải). Áp dụng kỹ thuật Dời cạnh, tính chu vi hình chữ L đó.`,
      options: makeOptions(`${pL} cm`, [
        `${lW + lH} cm`,
        `${pL - lCutW * 2} cm`,
        `${pL + lCutH * 2} cm`,
      ]),
      correctAnswer: `${pL} cm`,
      hint: `Bấm nút "Dời cạnh" trên hình: khi đẩy 2 cạnh góc khuyết ra ngoài, ta được đúng hình chữ nhật kích thước ${lW} cm × ${lH} cm!`,
      stepByStepExplanation: [
        `Dời cạnh ngang và cạnh dọc ở góc khuyết ra ngoài, chu vi hình chữ L bằng đúng chu vi hình chữ nhật bao ngoài (${lW} cm × ${lH} cm).`,
        `Chu vi hình chữ L là: (${lW} + ${lH}) × 2 = ${pL} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Kỹ thuật Dời cạnh (Side-Shifting) hình chữ L`,
        {
          itemName: 'khung bao ngoài',
          unitLabel: 'cm',
          actionPrompt: 'Bấm nút "Dời cạnh tạo Hình chữ nhật" ở Bước 2 để chứng minh chu vi không hề giảm đi!',
          interactiveRule: `Khung hình chữ nhật bao ngoài có chiều ngang ${lW} cm và chiều cao ${lH} cm.`,
          groups: [
            { id: 'g_lw', label: 'Chiều ngang bao ngoài', icon: '↔️', count: 2, unitValue: lW, totalValue: lW * 2, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `2 × ${lW} cm` },
            { id: 'g_lh', label: 'Chiều cao bao ngoài', icon: '↕️', count: 2, unitValue: lH, totalValue: lH * 2, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: `2 × ${lH} cm` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'l_shape',
          outerWidth: lW,
          outerHeight: lH,
          cutWidth: lCutW,
          cutHeight: lCutH,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: pL,
          sideShiftHint: 'Đẩy 2 đoạn góc lõm ra ngoài ➔ khít đúng hình chữ nhật bao ngoài!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Dời cạnh về khung chữ nhật: } ${lW}\\text{ cm} \\text{ và } ${lH}\\text{ cm}`,
            `\\text{Chu vi hình chữ L} = (${lW} \\;?\\; ${lH}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Dời 2 cạnh góc khuyết ra khung ngoài} \\Rightarrow \\text{Hình chữ nhật } ${lW}\\text{ cm} \\times ${lH}\\text{ cm}`,
            `\\text{Chu vi hình chữ L} = (${lW} + ${lH}) \\times 2 = ${pL}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${pL}\\text{ cm}`,
          finalNumericValue: pL,
        }
      ),
    },

    // Q4 (VisualModel): Staircase Side-Shifting
    {
      id: `dec-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Một khối cầu thang nhiều bậc có đáy ngang dài ${stW} cm và thành đứng bên trái cao ${stH} cm (các bậc đều vuông góc với nhau). Tính chu vi toàn bộ hình bậc thang đó.`,
      options: makeOptions(`${pStair} cm`, [
        `${stW + stH} cm`,
        `${pStair + 6} cm`,
        `${pStair - 6} cm`,
      ]),
      correctAnswer: `${pStair} cm`,
      hint: `Tổng tất cả mặt bậc ngang bằng đúng đáy ${stW} cm; tổng tất cả thành bậc đứng bằng đúng chiều cao ${stH} cm.`,
      stepByStepExplanation: [
        `Khi dời toàn bộ các bậc ngang lên trên và các bậc đứng sang phải, ta ghép khít thành hình chữ nhật ${stW} cm × ${stH} cm.`,
        `Chu vi hình bậc thang là: (${stW} + ${stH}) × 2 = ${pStair} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Dời cạnh Hình bậc thang nhiều bậc`,
        {
          itemName: 'bậc thang',
          unitLabel: 'cm',
          actionPrompt: 'Bấm nút Dời cạnh để thấy tổng mọi bậc ngang = đáy, tổng mọi bậc đứng = chiều cao',
          interactiveRule: `Đáy ngang = ${stW} cm, Chiều cao = ${stH} cm.`,
          groups: [
            { id: 'g_stw', label: 'Đáy + Tổng bậc ngang', icon: '🪜', count: 2, unitValue: stW, totalValue: stW * 2, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `2 × ${stW} cm` },
            { id: 'g_sth', label: 'Cạnh trái + Tổng bậc đứng', icon: '📐', count: 2, unitValue: stH, totalValue: stH * 2, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: `2 × ${stH} cm` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'staircase',
          outerWidth: stW,
          outerHeight: stH,
          cutWidth: Math.round(stW * 0.4),
          cutHeight: Math.round(stH * 0.4),
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: pStair,
          sideShiftHint: 'Dời toàn bộ mặt bậc lên trên & sang phải ➔ tạo thành hình chữ nhật hoàn chỉnh!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tổng các đoạn ngang} = ${stW} \\;?\\; 2 = ?`,
            `\\text{Chu vi bậc thang} = (${stW} \\;?\\; ${stH}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Dời tất cả bậc ngang và đứng ra khung ngoài } (${stW}\\text{ cm} \\times ${stH}\\text{ cm})`,
            `\\text{Chu vi hình bậc thang} = (${stW} + ${stH}) \\times 2 = ${pStair}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${pStair}\\text{ cm}`,
          finalNumericValue: pStair,
        }
      ),
    },

    // Q5 (VisualModel): U-Shape with 2 Extra Recessed Walls!
    {
      id: `dec-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Một trạm đón tàu hình chữ U có khung bao ngoài ngang ${uW} cm, cao ${uH} cm. Ở giữa cạnh trên bị khoét lõm xuống một rãnh sâu ${uDepth} cm. Tính chu vi của hình chữ U đó.`,
      options: makeOptions(`${pU} cm`, [
        `${2 * (uW + uH)} cm`,
        `${2 * (uW + uH) + uDepth} cm`,
        `${2 * (uW + uH) - 2 * uDepth} cm`,
      ]),
      correctAnswer: `${pU} cm`,
      hint: `Cẩn thận bẫy hình chữ U! Đẩy đáy rãnh lên trên ta được khung chữ nhật (${uW} + ${uH}) × 2, NHƯNG vẫn còn thừa 2 thành đứng sâu ${uDepth} cm bên trong cần cộng thêm!`,
      stepByStepExplanation: [
        `Chu vi khung chữ nhật bao ngoài là: (${uW} + ${uH}) × 2 = ${2 * (uW + uH)} (cm).`,
        `Phần rãnh lõm ở giữa sinh thêm 2 cạnh đứng (mỗi cạnh ${uDepth} cm): ${uDepth} × 2 = ${2 * uDepth} (cm).`,
        `Chu vi hình chữ U là: ${2 * (uW + uH)} + ${2 * uDepth} = ${pU} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Hình chữ U: Khung ngoài + 2 cạnh lõm màu vàng`,
        {
          itemName: 'đường viền chữ U',
          unitLabel: 'cm',
          actionPrompt: 'Bấm "Dời cạnh & Soi 2 cạnh lõm" để không bỏ sót 2 thành đứng màu vàng!',
          interactiveRule: `Khung ngoài ${uW} cm × ${uH} cm, cộng thêm 2 thành lõm sâu ${uDepth} cm.`,
          groups: [
            { id: 'g_ubox', label: `Khung ngoài (${uW}×${uH})`, icon: '⬜', count: 2, unitValue: uW + uH, totalValue: 2 * (uW + uH), color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `Khung ${uW}×${uH} cm` },
            { id: 'g_urec', label: `2 cạnh lõm thừa`, icon: '⚡', count: 2, unitValue: uDepth, totalValue: 2 * uDepth, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: `2 × ${uDepth} cm` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'u_shape',
          outerWidth: uW,
          outerHeight: uH,
          recessDepth: uDepth,
          recessWidth: uNotchW,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: pU,
          sideShiftHint: 'Đẩy đáy rãnh lên lấp khung ngoài, rồi CỘNG THÊM 2 thành lõm màu vàng!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chu vi khung bao ngoài} = (${uW} \\;?\\; ${uH}) \\;?\\; 2 = ?`,
            `\\text{Tổng 2 cạnh lõm thừa} = ${uDepth} \\;?\\; 2 = ?`,
            `\\text{Chu vi hình chữ U} = (\\text{Khung ngoài}) \\;?\\; (\\text{2 cạnh lõm}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chu vi khung chữ nhật ngoài} = (${uW} + ${uH}) \\times 2 = ${2 * (uW + uH)}\\text{ (cm)}`,
            `\\text{Thêm 2 thành lõm} = ${uDepth} \\times 2 = ${2 * uDepth}\\text{ (cm)}`,
            `\\text{Chu vi hình chữ U} = ${2 * (uW + uH)} + ${2 * uDepth} = ${pU}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${pU}\\text{ cm}`,
          finalNumericValue: pU,
        }
      ),
    },

    // Q6 (Practice): 2×3 Grid of 6 squares
    {
      id: `dec-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Ghép 6 hình vuông nhỏ cạnh ${gridSq} cm thành một hình chữ nhật gồm 2 hàng, mỗi hàng 3 hình vuông. Tính chu vi của hình chữ nhật lớn tạo thành.`,
      options: makeOptions(`${pGrid} cm`, [
        `${gridSq * 24} cm`,
        `${gridSq * 8} cm`,
        `${pGrid + gridSq * 2} cm`,
      ]),
      correctAnswer: `${pGrid} cm`,
      hint: `Chiều dài hình lớn gồm 3 cạnh (${gridSq} × 3), chiều rộng gồm 2 cạnh (${gridSq} × 2).`,
      stepByStepExplanation: [
        `Chiều dài hình chữ nhật lớn là: ${gridSq} × 3 = ${gridSq * 3} (cm).`,
        `Chiều rộng hình chữ nhật lớn là: ${gridSq} × 2 = ${gridSq * 2} (cm).`,
        `Chu vi hình chữ nhật lớn là: (${gridSq * 3} + ${gridSq * 2}) × 2 = ${pGrid} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Ghép lưới 2 hàng × 3 cột (mỗi ô cạnh ${gridSq} cm)`,
        {
          itemName: 'cạnh ô vuông',
          unitLabel: 'cm',
          actionPrompt: 'Xác định chiều dài (3 ô) và chiều rộng (2 ô) của hình chữ nhật lớn',
          interactiveRule: `Mỗi ô vuông nhỏ có cạnh ${gridSq} cm.`,
          groups: [
            { id: 'g_gl', label: 'Chiều dài (3 ô)', icon: '🟦', count: 3, unitValue: gridSq, totalValue: gridSq * 3, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `3 × ${gridSq} cm` },
            { id: 'g_gw', label: 'Chiều rộng (2 ô)', icon: '🟩', count: 2, unitValue: gridSq, totalValue: gridSq * 2, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: `2 × ${gridSq} cm` },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'joined_squares',
          outerWidth: gridSq * 3,
          outerHeight: gridSq * 2,
          squareSide: gridSq,
          gridCols: 3,
          gridRows: 2,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: pGrid,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chiều dài (3 ô)} = ${gridSq} \\;?\\; 3 = ? \\quad ; \\quad \\text{Chiều rộng (2 ô)} = ${gridSq} \\;?\\; 2 = ?`,
            `\\text{Chu vi hình lớn} = (\\text{Dài} \\;?\\; \\text{Rộng}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chiều dài} = ${gridSq} \\times 3 = ${gridSq * 3}\\text{ cm}, \\quad \\text{Chiều rộng} = ${gridSq} \\times 2 = ${gridSq * 2}\\text{ cm}`,
            `\\text{Chu vi hình chữ nhật} = (${gridSq * 3} + ${gridSq * 2}) \\times 2 = ${pGrid}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${pGrid}\\text{ cm}`,
          finalNumericValue: pGrid,
        }
      ),
    },

    // Q7 (Practice): Cut Rectangle (2×1) into 2 Equal Squares -> Find Perimeter of 1 Square
    {
      id: `dec-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Một tờ giấy hình chữ nhật có chiều dài ${origRectL} cm và chiều rộng ${origRectW} cm được cắt đôi thành 2 hình vuông bằng nhau. Tính chu vi của MỖI hình vuông nhỏ đó.`,
      options: makeOptions(`${oneSqP} cm`, [
        `${origRectP / 2} cm`,
        `${origRectP} cm`,
        `${oneSqP + cutSqSide} cm`,
      ]),
      correctAnswer: `${oneSqP} cm`,
      hint: `Cẩn thận! Chu vi mỗi hình vuông KHÔNG phải là chu vi hình chữ nhật chia đôi. Mỗi hình vuông có cạnh bằng đúng chiều rộng ${origRectW} cm!`,
      stepByStepExplanation: [
        `Khi cắt đôi hình chữ nhật (${origRectL} cm × ${origRectW} cm), ta được 2 hình vuông có cạnh bằng ${cutSqSide} cm.`,
        `Chu vi của mỗi hình vuông là: ${cutSqSide} × 4 = ${oneSqP} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Cắt hình chữ nhật ${origRectL} cm × ${origRectW} cm thành 2 hình vuông`,
        {
          itemName: 'cạnh hình vuông',
          unitLabel: 'cm',
          actionPrompt: 'Chú ý: nhát cắt ở giữa tạo ra cạnh mới cho mỗi hình vuông có cạnh bằng chiều rộng!',
          interactiveRule: `Mỗi hình vuông sau khi cắt có 4 cạnh đều bằng ${cutSqSide} cm.`,
          groups: [
            { id: 'g_sq1', label: '1 hình vuông (4 cạnh)', icon: '✂️', count: 4, unitValue: cutSqSide, totalValue: oneSqP, color: '#38BDF8', isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'square',
          outerWidth: cutSqSide,
          outerHeight: cutSqSide,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: oneSqP,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Cạnh mỗi hình vuông} = ${origRectW}\\text{ cm}`,
            `\\text{Chu vi 1 hình vuông} = ${cutSqSide} \\;?\\; 4 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Cạnh của mỗi hình vuông} = ${origRectL} \\div 2 = ${cutSqSide}\\text{ (cm)}`,
            `\\text{Chu vi mỗi hình vuông} = ${cutSqSide} \\times 4 = ${oneSqP}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${oneSqP}\\text{ cm}`,
          finalNumericValue: oneSqP,
        }
      ),
    },

    // Q8 (Practice): Reverse Joined Squares — 4 Squares in a Row -> Find Side
    {
      id: `dec-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Ghép 4 hình vuông bằng nhau thành một hình chữ nhật dài (1 hàng 4 ô) có chu vi là ${row4P} cm. Tính độ dài cạnh của mỗi hình vuông nhỏ.`,
      options: makeOptions(`${row4Side} cm`, [
        `${row4Side * 2} cm`,
        `${row4Side + 2} cm`,
        `${row4Side - 1} cm`,
      ]),
      correctAnswer: `${row4Side} cm`,
      hint: `Đếm xem xung quanh viền ngoài hình chữ nhật (1×4) có tất cả bao nhiêu đoạn cạnh hình vuông: trên 4, dưới 4, trái 1, phải 1 ➔ 10 đoạn bằng nhau!`,
      stepByStepExplanation: [
        `Viền ngoài hình chữ nhật gồm 4 + 4 + 1 + 1 = 10 cạnh hình vuông nhỏ bằng nhau.`,
        `Độ dài 1 cạnh hình vuông là: ${row4P} : 10 = ${row4Side} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Tìm cạnh 1 ô vuông khi ghép 4 ô có chu vi ${row4P} cm`,
        {
          itemName: 'đoạn cạnh viền ngoài',
          unitLabel: 'cm',
          actionPrompt: 'Đếm tổng số đoạn cạnh hình vuông chạy xung quanh đường viền ngoài của hình ghép',
          interactiveRule: `Đếm tổng số đoạn cạnh hình vuông bao quanh viền ngoài của hàng 4 ô.`,
          groups: [
            { id: 'g_10seg', label: `Các đoạn viền ngoài = ${row4P} cm`, icon: '🧩', count: 10, unitValue: row4Side, totalValue: row4P, color: '#34D399', isUnknown: true, hideCountBeforeSolve: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'joined_squares',
          outerWidth: row4Side * 4,
          outerHeight: row4Side,
          squareSide: row4Side,
          gridCols: 4,
          gridRows: 1,
          unitLabel: 'cm',
          unknownTarget: 'side',
          expectedPerimeter: row4P,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Số đoạn cạnh ở viền ngoài} = (4 \\;?\\; 1) \\;?\\; 2 = ?`,
            `\\text{Độ dài 1 cạnh ô vuông} = ${row4P} \\;?\\; (\\text{Số đoạn viền}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Số đoạn cạnh ở viền ngoài} = (4 + 1) \\times 2 = 10\\text{ (đoạn)}`,
            `\\text{Độ dài 1 cạnh hình vuông} = ${row4P} \\div 10 = ${row4Side}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${row4Side}\\text{ cm}`,
          finalNumericValue: row4Side,
        }
      ),
    },

    // Q9 (Practice): Reverse L-Shape — Find Outer Height given Outer Width & Perimeter
    {
      id: `dec-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Một sân chơi hình chữ L có tổng chu vi là ${revLP} m và chiều ngang lớn nhất là ${revLW} m. Hỏi chiều cao lớn nhất của sân chơi hình chữ L đó là bao nhiêu mét?`,
      options: makeOptions(`${revLH} m`, [
        `${revLP - revLW} m`,
        `${revLH + 3} m`,
        `${revLH - 2} m`,
      ]),
      correctAnswer: `${revLH} m`,
      hint: `Dời cạnh chữ L thành hình chữ nhật bao ngoài: Nửa chu vi = ${revLP} : 2, sau đó trừ đi chiều ngang ${revLW} m.`,
      stepByStepExplanation: [
        `Nhờ kỹ thuật dời cạnh, chu vi hình chữ L bằng chu vi hình chữ nhật bao ngoài (${revLP} m).`,
        `Nửa chu vi là: ${revLP} : 2 = ${revLW + revLH} (m).`,
        `Chiều cao lớn nhất là: ${revLW + revLH} - ${revLW} = ${revLH} (m).`,
      ],
      visualModel: buildPerimeterVisual(
        `Toán ngược hình chữ L: Chu vi = ${revLP} m, Ngang = ${revLW} m`,
        {
          itemName: 'kích thước ngoài',
          unitLabel: 'm',
          actionPrompt: 'Dời cạnh thành hình chữ nhật rồi tìm Nửa chu vi để suy ngược chiều cao',
          interactiveRule: `Chu vi chữ L = ${revLP} m, Chiều ngang ngoài = ${revLW} m.`,
          groups: [
            { id: 'g_rlw', label: 'Chiều ngang ngoài', icon: '↔️', count: 1, unitValue: revLW, totalValue: revLW, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_rlh', label: 'Chiều cao cần tìm', icon: '↕️', count: 1, unitValue: revLH, totalValue: revLH, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'l_shape',
          outerWidth: revLW,
          outerHeight: revLH,
          cutWidth: 5,
          cutHeight: 4,
          unitLabel: 'm',
          unknownTarget: 'width',
          expectedPerimeter: revLP,
          sideShiftHint: 'Dời cạnh về hình chữ nhật ➔ Nửa chu vi = Ngang + Cao',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi khung ngoài} = ${revLP} \\;?\\; 2 = ?`,
            `\\text{Chiều cao lớn nhất} = (\\text{Nửa chu vi}) \\;?\\; ${revLW} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi khung bao ngoài} = ${revLP} \\div 2 = ${revLW + revLH}\\text{ (m)}`,
            `\\text{Chiều cao lớn nhất} = ${revLW + revLH} - ${revLW} = ${revLH}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${revLH}\\text{ m}`,
          finalNumericValue: revLH,
        }
      ),
    },

    // Q10 (Challenge): Reverse U-Shape — Find Recess Depth!
    {
      id: `dec-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách Hình chữ U ngược: Một tấm kim loại hình chữ U có khung bao ngoài ngang ${chUW} cm, cao ${chUH} cm và có tổng chu vi là ${chUP} cm. Hỏi rãnh lõm ở giữa sâu bao nhiêu xăng-ti-mét?`,
      options: makeOptions(`${chUDepth} cm`, [
        `${chUDepth * 2} cm`,
        `${chUDepth + 2} cm`,
        `${chUDepth - 1} cm`,
      ]),
      correctAnswer: `${chUDepth} cm`,
      hint: `Bước 1: Tính chu vi khung chữ nhật ngoài = (${chUW} + ${chUH}) × 2. Bước 2: Phần dư ra chính là TỔNG CỦA 2 CẠNH LÕM — nhớ chia cho 2 để ra độ sâu 1 cạnh!`,
      stepByStepExplanation: [
        `Chu vi khung hình chữ nhật bao ngoài là: (${chUW} + ${chUH}) × 2 = ${chURectP} (cm).`,
        `Tổng độ dài 2 cạnh lõm thừa là: ${chUP} - ${chURectP} = ${chUDepth * 2} (cm).`,
        `Độ sâu của rãnh lõm là: ${chUDepth * 2} : 2 = ${chUDepth} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Tìm độ sâu rãnh lõm chữ U (Tổng chu vi = ${chUP} cm)`,
        {
          itemName: 'cạnh lõm',
          unitLabel: 'cm',
          actionPrompt: 'So sánh chu vi chữ U với khung ngoài để tìm tổng 2 cạnh lõm, rồi chia đôi!',
          interactiveRule: `Chu vi chữ U = ${chUP} cm. Khung ngoài có kích thước ${chUW} cm × ${chUH} cm.`,
          groups: [
            { id: 'g_out', label: `Khung ngoài (${chUW}×${chUH})`, icon: '⬜', count: 2, unitValue: chUW + chUH, totalValue: chURectP, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `Khung ${chUW}×${chUH} cm` },
            { id: 'g_in2', label: '2 cạnh lõm bằng nhau', icon: '⚡', count: 2, unitValue: chUDepth, totalValue: chUDepth * 2, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'u_shape',
          outerWidth: chUW,
          outerHeight: chUH,
          recessDepth: chUDepth,
          recessWidth: 6,
          unitLabel: 'cm',
          unknownTarget: 'recess_depth',
          expectedPerimeter: chUP,
          sideShiftHint: 'Phần chu vi tăng thêm so với khung ngoài = 2 lần độ sâu rãnh lõm!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Chu vi khung ngoài} = (${chUW} \\;?\\; ${chUH}) \\;?\\; 2 = ?`,
            `\\text{Tổng 2 cạnh lõm} = ${chUP} \\;?\\; (\\text{Khung ngoài}) = ?`,
            `\\text{Độ sâu rãnh lõm} = (\\text{Tổng 2 cạnh lõm}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Chu vi khung ngoài} = (${chUW} + ${chUH}) \\times 2 = ${chURectP}\\text{ (cm)}`,
            `\\text{Tổng 2 cạnh lõm} = ${chUP} - ${chURectP} = ${chUDepth * 2}\\text{ (cm)}`,
            `\\text{Độ sâu rãnh lõm} = ${chUDepth * 2} \\div 2 = ${chUDepth}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${chUDepth}\\text{ cm}`,
          finalNumericValue: chUDepth,
        }
      ),
    },

    // Q11 (Challenge): Cut a Corner Square from a Big Square — Invariant Perimeter!
    {
      id: `dec-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách Tư duy Singapore: Từ một tấm bìa hình vuông cạnh ${bigSq} cm, bạn An cắt bỏ một hình vuông nhỏ cạnh ${smallCut} cm ở góc trên bên phải. Hỏi chu vi phần bìa còn lại là bao nhiêu xăng-ti-mét?`,
      options: makeOptions(`${bigSqP} cm`, [
        `${bigSqP - smallCut * 4} cm`,
        `${bigSqP - smallCut * 2} cm`,
        `${bigSqP + smallCut * 2} cm`,
      ]),
      correctAnswer: `${bigSqP} cm`,
      hint: `Khi cắt bỏ một hình vuông ở GÓC, 2 cạnh cũ bị cắt đi được thay thế bởi đúng 2 cạnh mới ở góc lõm bên trong! Dời 2 cạnh đó ra ngoài, chu vi hoàn toàn KHÔNG ĐỔI.`,
      stepByStepExplanation: [
        `Dời 2 cạnh ở góc vừa cắt ra bên ngoài, ta khôi phục đúng hình vuông ban đầu cạnh ${bigSq} cm.`,
        `Chu vi phần bìa còn lại không đổi và bằng: ${bigSq} × 4 = ${bigSqP} (cm).`,
      ],
      visualModel: buildPerimeterVisual(
        `Cắt góc hình vuông cạnh ${bigSq} cm (góc cắt ${smallCut} cm)`,
        {
          itemName: 'cạnh hình vuông ban đầu',
          unitLabel: 'cm',
          actionPrompt: 'Bấm "Dời cạnh" để chứng kiến điều kỳ diệu: Cắt ở góc KHÔNG làm giảm chu vi!',
          interactiveRule: `Hình vuông ban đầu có cạnh ${bigSq} cm, cắt góc nhỏ ${smallCut} cm.`,
          groups: [
            { id: 'g_bsq', label: '4 cạnh khung ngoài', icon: '✨', count: 4, unitValue: bigSq, totalValue: bigSqP, color: '#38BDF8', isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'perimeter_shape',
          shapeKind: 'l_shape',
          outerWidth: bigSq,
          outerHeight: bigSq,
          cutWidth: smallCut,
          cutHeight: smallCut,
          unitLabel: 'cm',
          unknownTarget: 'perimeter',
          expectedPerimeter: bigSqP,
          sideShiftHint: '2 cạnh bị cắt ở góc được thay bằng đúng 2 cạnh mới dài y hệt!',
          showInteractiveShift: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Dời 2 cạnh góc cắt ra ngoài} \\Rightarrow \\text{Hình vuông cạnh } ${bigSq}\\text{ cm}`,
            `\\text{Chu vi phần còn lại} = ${bigSq} \\;?\\; 4 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Dời cạnh góc khuyết ra ngoài, chu vi không đổi bằng hình vuông cạnh } ${bigSq}\\text{ cm}`,
            `\\text{Chu vi phần bìa còn lại} = ${bigSq} \\times 4 = ${bigSqP}\\text{ (cm)}`,
          ],
          finalAnswerLatex: `${bigSqP}\\text{ cm}`,
          finalNumericValue: bigSqP,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 3 (NGÀY 15 – 21): PHÒNG THÍ NGHIỆM KHỐI LƯỢNG (GAM – KI-LÔ-GAM)
// ============================================================================

const WEEK3_THEMES = [
  {
    title: 'Ngày 15: Đổi đơn vị Gam – Ki-lô-gam (1 kg = 1 000 g)',
    topicTag: 'Đổi đơn vị kg – g',
    goals: [
      'Ghi nhớ quy tắc chuẩn 1 kg = 1 000 g và đổi thành thạo số đo hỗn hợp',
      'So sánh khối lượng giữa hai đơn vị kg và g chính xác tuyệt đối',
    ],
  },
  {
    title: 'Ngày 16: Cộng trừ khối lượng & Bài toán nhiều túi hàng',
    topicTag: 'Cộng trừ khối lượng',
    goals: [
      'Quy đổi cùng đơn vị gam trước khi cộng hoặc trừ khối lượng',
      'Tính tổng khối lượng của nhiều gói hàng giống nhau',
    ],
  },
  {
    title: 'Ngày 17: Bài toán Trừ Bì (Vỏ hộp / Giỏ & Vật bên trong)',
    topicTag: 'Bài toán trừ bì',
    goals: [
      'Phân biệt Khối lượng cả bì (gồm vỏ) và Khối lượng tịnh (chỉ phần ruột)',
      'Tính chính xác cân nặng vỏ hộp hoặc hàng bên trong',
    ],
  },
  {
    title: 'Ngày 18: Thử thách Cả thùng & Nửa thùng — Tìm khối lượng vỏ',
    topicTag: 'Cả thùng & Nửa thùng',
    goals: [
      'Dùng hiệu giữa "cả thùng đầy" và "nửa thùng" để tách riêng 1 nửa ruột hàng',
      'Nhân đôi 1 nửa ruột hoặc trừ ngược để tìm chính xác khối lượng vỏ rỗng',
    ],
  },
  {
    title: 'Ngày 19: Cân thăng bằng suy luận (Đẳng thức khối lượng)',
    topicTag: 'Cân thăng bằng',
    goals: [
      'Đọc và lập đẳng thức từ hai đĩa cân đang giữ thăng bằng',
      'Tìm khối lượng 1 vật chưa biết bằng phép chia hoặc khử vật giống nhau hai bên',
    ],
  },
  {
    title: 'Ngày 20: Chia đều theo Gam & San khối lượng hai giỏ',
    topicTag: 'Chia đều & San giỏ',
    goals: [
      'Chia khối lượng lớn (kg đổi ra g) vào các túi nhỏ đều nhau',
      'Tìm lượng hàng cần chuyển từ giỏ nặng sang giỏ nhẹ để hai giỏ bằng nhau',
    ],
  },
  {
    title: 'Ngày 21: Tổng ôn Tuần 3 — Làm chủ Khối lượng kg – g',
    topicTag: 'Tổng ôn Tuần 3',
    goals: [
      'Tổng hợp mọi kỹ năng đổi đơn vị, trừ bì, nửa thùng và cân thăng bằng',
      'Sẵn sàng chinh phục Bài Kiểm Tra 15 Phút Cuối Tuần 3',
    ],
  },
];

function buildWeek3Questions(day: number): InMonthQuestion[] {
  const offset = day - 14; // 1..7

  // Q1: Convert X kg Y g -> g
  const kg1 = 1 + (offset % 4); // 2, 3, 4, 1, 2, 3, 4
  const g1 = 150 + offset * 50; // 200..500
  const totalG1 = kg1 * 1000 + g1;

  // Q2: Complement to make 1 kg (1000 g)
  const usedG = 250 + offset * 50; // 300..600 g
  const remTo1Kg = 1000 - usedG;

  // Q3: Add mixed weights in grams
  const bag1Kg = 1;
  const bag1G = 200 + offset * 50; // 250..550
  const bag2G = 450 + offset * 50; // 500..800
  const sumBagsG = bag1Kg * 1000 + bag1G + bag2G;

  // Q4: Multiply identical packs (g)
  const packG = 150 + (offset % 3) * 50; // 200, 250, 150...
  const packCount = 3 + (offset % 4); // 4, 5, 6, 3...
  const totalPackG = packG * packCount;

  // Q5: Tare weight (gross - net = box OR gross - box = net)
  const grossKg = 2;
  const grossG = 200 + offset * 50; // 250..550 -> total 2250..2550 g
  const grossTotal = grossKg * 1000 + grossG;
  const boxG = 150 + offset * 50; // 200..500 g
  const netG = grossTotal - boxG;

  // Q6: Balance scale 1 melon + small weight = N apples -> find 1 apple or 1 melon
  const appleG = 120 + offset * 20; // 140..260 g
  const appleCount = 3 + (offset % 3); // 4, 5, 3...
  const melonG = appleG * appleCount;

  // Q7: Divide total kg into small bags of 200g or 250g or 500g
  const divKg = 2 + (offset % 3); // 3, 4, 2, 3, 4, 2, 3 kg
  const bagSizeG = offset % 2 === 1 ? 500 : 250;
  const numBags = (divKg * 1000) / bagSizeG;

  // Q8: Subtract weights with unit conversion (kg - g)
  const bigKg = 3 + (offset % 3); // 4, 5, 3... kg
  const takeG = 600 + offset * 100; // 700..1300 g
  const leftG = bigKg * 1000 - takeG;

  // Q9: Balance scale with extra weight: 1 box + 200g = 1kg + extra -> find box
  const rightKg = 1;
  const rightExtraG = 300 + offset * 50; // 350..650 g -> right = 1350..1650 g
  const leftWeightG = 200 + (offset % 3) * 50; // 250, 300, 200...
  const mysteryBoxG = rightKg * 1000 + rightExtraG - leftWeightG;

  // Q10 (Challenge): Full basket & Half basket -> Find EMPTY basket weight!
  const halfFruitG = 600 + offset * 100; // 700..1300 g
  const emptyBasketG = 200 + offset * 50; // 250..550 g
  const halfTotalG = halfFruitG + emptyBasketG;
  const fullTotalG = halfFruitG * 2 + emptyBasketG;

  // Q11 (Challenge): Equalize two baskets (transfer (A - B) / 2)
  const heavyG = 2000 + offset * 200; // 2200..3400 g
  const lightG = 1200 + offset * 100; // 1300..1900 g -> diff is even? Wait: offset*200 - offset*100 = offset*100, always even!
  const diffBaskets = heavyG - lightG;
  const transferG = diffBaskets / 2;

  return [
    // Q1 (Warmup): Convert kg & g -> g
    {
      id: `dec-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'remainder',
      prompt: `Một kiện mẫu thiên thạch cân nặng ${kg1} kg ${g1} g. Hỏi kiện mẫu đó cân nặng tất cả bao nhiêu gam (g)?`,
      options: makeOptions(`${totalG1} g`, [
        `${kg1 * 100 + g1} g`,
        `${totalG1 + 100} g`,
        `${totalG1 - 100} g`,
      ]),
      correctAnswer: `${totalG1} g`,
      hint: `Nhớ quy tắc chuẩn: 1 kg = 1 000 g. Đổi ${kg1} kg sang gam rồi cộng thêm ${g1} g.`,
      stepByStepExplanation: [
        `Đổi: ${kg1} kg = ${kg1 * 1000} g.`,
        `Tổng khối lượng là: ${kg1 * 1000} + ${g1} = ${totalG1} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Đổi ${kg1} kg ${g1} g sang đơn vị gam`,
        {
          itemName: 'khối lượng',
          unitLabel: 'g',
          actionPrompt: `Quy đổi từng 1 kg = 1 000 g rồi gộp với ${g1} g lẻ`,
          interactiveRule: `1 kg = 1 000 g.`,
          groups: [
            { id: 'g_kg', label: `Phần ki-lô-gam (${kg1} kg)`, icon: '⚖️', count: kg1, unitValue: 1000, totalValue: kg1 * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${kg1} kg` },
            { id: 'g_rem', label: 'Phần gam lẻ', icon: '🪨', count: 1, unitValue: g1, totalValue: g1, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'unit_convert',
          operands: [kg1, g1],
          expectedNumericResult: totalG1,
          resultUnit: 'g',
          primaryReading: `${kg1} kg ${g1} g`,
          secondaryReading: '= ? g',
          conversionRule: '1 kg = 1 000 g',
          visualParams: {
            mode: 'convert',
            givenA: kg1,
            givenB: g1,
            unitA: 'kg',
            unitB: 'g',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `${kg1}\\text{ kg} = ${kg1} \\;?\\; 1000 = ?\\text{ (g)}`,
            `\\text{Tổng khối lượng} = (\\text{g từ kg}) \\;?\\; ${g1} = ?`,
          ],
          fullLatexSteps: [
            `${kg1}\\text{ kg} = ${kg1} \\times 1000 = ${kg1 * 1000}\\text{ (g)}`,
            `\\text{Tổng khối lượng} = ${kg1 * 1000} + ${g1} = ${totalG1}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${totalG1}\\text{ g}`,
          finalNumericValue: totalG1,
        }
      ),
    },

    // Q2 (Warmup): Complement to 1 kg
    {
      id: `dec-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'remainder',
      prompt: `Trên đĩa cân đã đặt một túi đường nặng ${usedG} g. Hỏi cần đặt thêm bao nhiêu gam đường nữa để trên đĩa cân có đúng 1 kg đường?`,
      options: makeOptions(`${remTo1Kg} g`, [
        `${1000 + usedG} g`,
        `${remTo1Kg + 100} g`,
        `${remTo1Kg - 50} g`,
      ]),
      correctAnswer: `${remTo1Kg} g`,
      hint: `Đổi 1 kg = 1 000 g, rồi lấy 1 000 g trừ đi ${usedG} g.`,
      stepByStepExplanation: [
        `Đổi: 1 kg = 1 000 g.`,
        `Số gam đường cần đặt thêm là: 1 000 - ${usedG} = ${remTo1Kg} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Bù cho đủ 1 kg (đã có ${usedG} g)`,
        {
          itemName: 'đường',
          unitLabel: 'g',
          actionPrompt: 'Đổi mục tiêu 1 kg sang gam rồi tìm phần còn thiếu',
          interactiveRule: `Mục tiêu = 1 kg (1 000 g). Đã có = ${usedG} g.`,
          groups: [
            { id: 'g_has', label: 'Đã đặt trên cân', icon: '🧂', count: 1, unitValue: usedG, totalValue: usedG, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_need', label: 'Cần thêm cho đủ 1 kg', icon: '➕', count: 1, unitValue: remTo1Kg, totalValue: remTo1Kg, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'unit_subtract',
          operands: [1000, usedG],
          expectedNumericResult: remTo1Kg,
          resultUnit: 'g',
          primaryReading: `Mục tiêu: 1 kg`,
          secondaryReading: `Đã có: ${usedG} g`,
          conversionRule: '1 kg = 1 000 g',
          visualParams: {
            mode: 'subtract',
            givenA: 1000,
            givenB: usedG,
            unitA: 'g',
            labelA: 'Mục tiêu: 1 kg',
            labelB: `Đã có: ${usedG} g`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } 1\\text{ kg} = 1000\\text{ g}`,
            `\\text{Cần đặt thêm} = 1000 \\;?\\; ${usedG} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } 1\\text{ kg} = 1000\\text{ g}`,
            `\\text{Cần đặt thêm} = 1000 - ${usedG} = ${remTo1Kg}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${remTo1Kg}\\text{ g}`,
          finalNumericValue: remTo1Kg,
        }
      ),
    },

    // Q3 (VisualModel): Sum mixed kg+g and g
    {
      id: `dec-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Giỏ thứ nhất đựng ${bag1Kg} kg ${bag1G} g cam, giỏ thứ hai đựng ${bag2G} g cam. Hỏi cả hai giỏ đựng tất cả bao nhiêu gam cam?`,
      options: makeOptions(`${sumBagsG} g`, [
        `${sumBagsG - 100} g`,
        `${sumBagsG + 100} g`,
        `${bag1G + bag2G} g`,
      ]),
      correctAnswer: `${sumBagsG} g`,
      hint: `Đổi giỏ thứ nhất sang gam (${bag1Kg} kg ${bag1G} g = ${bag1Kg * 1000 + bag1G} g), sau đó cộng với giỏ thứ hai.`,
      stepByStepExplanation: [
        `Đổi giỏ thứ nhất: ${bag1Kg} kg ${bag1G} g = ${bag1Kg * 1000 + bag1G} g.`,
        `Tổng khối lượng hai giỏ là: ${bag1Kg * 1000 + bag1G} + ${bag2G} = ${sumBagsG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Gộp khối lượng hai giỏ cam về đơn vị gam`,
        {
          itemName: 'cam',
          unitLabel: 'g',
          actionPrompt: 'Quy đổi giỏ 1 sang gam trước khi cộng với giỏ 2',
          interactiveRule: `Giỏ 1 = ${bag1Kg} kg ${bag1G} g, Giỏ 2 = ${bag2G} g.`,
          groups: [
            { id: 'g_b1', label: `Giỏ 1 (${bag1Kg} kg ${bag1G} g)`, icon: '🍊', count: 1, unitValue: bag1Kg * 1000 + bag1G, totalValue: bag1Kg * 1000 + bag1G, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: `${bag1Kg} kg ${bag1G} g` },
            { id: 'g_b2', label: 'Giỏ 2', icon: '🍊', count: 1, unitValue: bag2G, totalValue: bag2G, color: '#34D399', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'unit_add',
          operands: [bag1Kg * 1000 + bag1G, bag2G],
          expectedNumericResult: sumBagsG,
          resultUnit: 'g',
          primaryReading: `Giỏ 1: ${bag1Kg} kg ${bag1G} g`,
          secondaryReading: `Giỏ 2: ${bag2G} g`,
          conversionRule: 'Đổi cùng đơn vị gam rồi cộng',
          visualParams: {
            mode: 'sum',
            givenA: bag1Kg * 1000 + bag1G,
            givenB: bag2G,
            unitA: 'g',
            labelA: `Giỏ 1: ${bag1Kg} kg ${bag1G} g`,
            labelB: `Giỏ 2: ${bag2G} g`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi Giỏ 1} = 1000 \\;?\\; ${bag1G} = ?\\text{ (g)}`,
            `\\text{Tổng cả hai giỏ} = (\\text{Giỏ 1}) \\;?\\; ${bag2G} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Giỏ 1} = 1000 + ${bag1G} = ${bag1Kg * 1000 + bag1G}\\text{ (g)}`,
            `\\text{Tổng khối lượng} = ${bag1Kg * 1000 + bag1G} + ${bag2G} = ${sumBagsG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${sumBagsG}\\text{ g}`,
          finalNumericValue: sumBagsG,
        }
      ),
    },

    // Q4 (VisualModel): Multiply identical packs
    {
      id: `dec-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Mỗi gói bánh lương khô vũ trụ nặng ${packG} g. Hỏi ${packCount} gói bánh như thế cân nặng tất cả bao nhiêu gam?`,
      options: makeOptions(`${totalPackG} g`, [
        `${totalPackG + packG} g`,
        `${totalPackG - packG} g`,
        `${packG + packCount} g`,
      ]),
      correctAnswer: `${totalPackG} g`,
      hint: `Lấy cân nặng 1 gói nhân với số gói (${packCount}).`,
      stepByStepExplanation: [
        `Tổng cân nặng ${packCount} gói bánh là: ${packG} × ${packCount} = ${totalPackG} (g).`,
      ],
      visualModel: buildBarVisual(
        `Tính tổng khối lượng ${packCount} gói bánh (${packG} g/gói)`,
        {
          itemName: 'gói bánh',
          unitLabel: 'g',
          actionPrompt: `Gấp khối lượng 1 gói (${packG} g) lên ${packCount} lần`,
          interactiveRule: `1 gói = ${packG} g, có ${packCount} gói giống hệt nhau.`,
          groups: [
            { id: 'g_pk', label: `${packCount} gói bánh`, icon: '🍪', count: packCount, unitValue: packG, totalValue: totalPackG, color: '#F59E0B', isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'groups' },
          ],
        },
        {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: packG,
          unitName: 'g',
          bars: [
            makeBarSpec({
              id: 'bar_packs',
              label: `${packCount} gói bánh`,
              units: packCount,
              unitValue: packG,
              displayValue: `? g`,
              isUnknown: true,
              showKnownUnitValue: true,
              color: '#F59E0B',
            }),
          ],
          totalBracket: {
            targetBarIds: ['bar_packs'],
            numericValue: totalPackG,
            displayLabel: 'Tổng = ? g',
            isUnknown: true,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tổng cân nặng} = ${packG} \\;?\\; ${packCount} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Tổng cân nặng } ${packCount}\\text{ gói} = ${packG} \\times ${packCount} = ${totalPackG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${totalPackG}\\text{ g}`,
          finalNumericValue: totalPackG,
        }
      ),
    },

    // Q5 (VisualModel): Tare Weight (Gross - Box = Net)
    {
      id: `dec-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Một hộp kẹo (tính cả vỏ hộp) cân nặng ${grossKg} kg ${grossG} g. Biết riêng chiếc vỏ hộp rỗng nặng ${boxG} g. Hỏi số kẹo bên trong hộp cân nặng bao nhiêu gam?`,
      options: makeOptions(`${netG} g`, [
        `${grossTotal + boxG} g`,
        `${netG - 100} g`,
        `${grossTotal} g`,
      ]),
      correctAnswer: `${netG} g`,
      hint: `Đổi khối lượng cả hộp sang gam (${grossTotal} g), rồi trừ đi khối lượng vỏ hộp (${boxG} g).`,
      stepByStepExplanation: [
        `Đổi cả hộp: ${grossKg} kg ${grossG} g = ${grossTotal} g.`,
        `Khối lượng kẹo bên trong là: ${grossTotal} - ${boxG} = ${netG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Bài toán Trừ bì: Cả hộp (${grossKg} kg ${grossG} g) − Vỏ (${boxG} g)`,
        {
          itemName: 'khối lượng',
          unitLabel: 'g',
          actionPrompt: 'Tách riêng khối lượng vỏ hộp ra khỏi tổng khối lượng cả hộp',
          interactiveRule: `Khối lượng kẹo = Khối lượng cả hộp − Khối lượng vỏ hộp.`,
          groups: [
            { id: 'g_gross', label: `Cả hộp (${grossKg} kg ${grossG} g)`, icon: '🎁', count: 1, unitValue: grossTotal, totalValue: grossTotal, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${grossKg} kg ${grossG} g` },
            { id: 'g_box', label: 'Vỏ hộp rỗng', icon: '📦', count: 1, unitValue: boxG, totalValue: boxG, color: '#F59E0B', displayMode: 'measurement' },
            { id: 'g_net', label: 'Phần kẹo bên trong', icon: '🍬', count: 1, unitValue: netG, totalValue: netG, color: '#34D399', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'tare_weight',
          operands: [grossTotal, boxG],
          expectedNumericResult: netG,
          resultUnit: 'g',
          primaryReading: `Cả hộp: ${grossKg} kg ${grossG} g`,
          secondaryReading: `Vỏ hộp: ${boxG} g`,
          conversionRule: 'Ruột = Cả hộp − Vỏ hộp',
          visualParams: {
            mode: 'subtract',
            givenA: grossTotal,
            givenB: boxG,
            unitA: 'g',
            labelA: `Cả hộp: ${grossKg} kg ${grossG} g`,
            labelB: `Vỏ hộp: ${boxG} g`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi cả hộp} = ${grossKg} \\;?\\; 1000 \\;?\\; ${grossG} = ?\\text{ (g)}`,
            `\\text{Khối lượng kẹo} = (\\text{Cả hộp}) \\;?\\; ${boxG} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${grossKg}\\text{ kg } ${grossG}\\text{ g} = ${grossTotal}\\text{ g}`,
            `\\text{Khối lượng kẹo bên trong} = ${grossTotal} - ${boxG} = ${netG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${netG}\\text{ g}`,
          finalNumericValue: netG,
        }
      ),
    },

    // Q6 (Practice): Balance Scale Ratio (1 melon = N apples)
    {
      id: `dec-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Trên cân thăng bằng, 1 quả dưa hấu đặt bên đĩa trái cân bằng đúng với ${appleCount} quả táo giống hệt nhau đặt bên đĩa phải. Biết quả dưa hấu nặng ${melonG} g. Hỏi mỗi quả táo nặng bao nhiêu gam?`,
      options: makeOptions(`${appleG} g`, [
        `${appleG + 20} g`,
        `${appleG - 20} g`,
        `${melonG - appleCount} g`,
      ]),
      correctAnswer: `${appleG} g`,
      hint: `Hai đĩa cân thăng bằng nên tổng cân nặng ${appleCount} quả táo bằng ${melonG} g. Chia cho ${appleCount} để tìm 1 quả táo!`,
      stepByStepExplanation: [
        `Cân thăng bằng suy ra ${appleCount} quả táo nặng đúng ${melonG} g.`,
        `Mỗi quả táo nặng là: ${melonG} : ${appleCount} = ${appleG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Cân thăng bằng: 1 quả dưa (${melonG} g) = ${appleCount} quả táo`,
        {
          itemName: 'quả táo',
          unitLabel: 'g',
          actionPrompt: `Chia đều khối lượng quả dưa (${melonG} g) cho ${appleCount} quả táo`,
          interactiveRule: `Đĩa trái = Đĩa phải (${melonG} g = ${appleCount} quả táo).`,
          groups: [
            { id: 'g_mel', label: 'Đĩa trái: 1 quả dưa', icon: '🍉', count: 1, unitValue: melonG, totalValue: melonG, color: '#34D399', displayMode: 'measurement' },
            { id: 'g_app', label: `Đĩa phải: ${appleCount} quả táo`, icon: '🍎', count: appleCount, unitValue: appleG, totalValue: melonG, color: '#F59E0B', isUnknown: true, displayMode: 'groups' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'balance_eq',
          operands: [melonG, appleCount],
          expectedNumericResult: appleG,
          resultUnit: 'g',
          primaryReading: `Đĩa trái: ${melonG} g`,
          secondaryReading: `Đĩa phải: ${appleCount} quả táo`,
          conversionRule: 'Đĩa trái = Đĩa phải',
          visualParams: {
            mode: 'balance_eq',
            givenA: melonG,
            givenCount: appleCount,
            unitA: 'g',
            labelA: `1 quả dưa (${melonG} g)`,
            labelB: `${appleCount} quả táo`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Cân nặng } ${appleCount}\\text{ quả táo} = ${melonG}\\text{ g}`,
            `\\text{Cân nặng 1 quả táo} = ${melonG} \\;?\\; ${appleCount} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Cân nặng 1 quả táo} = ${melonG} \\div ${appleCount} = ${appleG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${appleG}\\text{ g}`,
          finalNumericValue: appleG,
        }
      ),
    },

    // Q7 (Practice): Pack kg into equal gram bags
    {
      id: `dec-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Cô đầu bếp có ${divKg} kg bột mì và muốn chia đều vào các túi nhỏ, mỗi túi đựng đúng ${bagSizeG} g. Hỏi cô chia được tất cả bao nhiêu túi bột mì?`,
      options: makeOptions(`${numBags} túi`, [
        `${numBags + 2} túi`,
        `${numBags - 2} túi`,
        `${divKg * 2} túi`,
      ]),
      correctAnswer: `${numBags} túi`,
      hint: `Đổi ${divKg} kg = ${divKg * 1000} g, sau đó chia cho ${bagSizeG} g mỗi túi.`,
      stepByStepExplanation: [
        `Đổi: ${divKg} kg = ${divKg * 1000} g.`,
        `Số túi bột mì chia được là: ${divKg * 1000} : ${bagSizeG} = ${numBags} (túi).`,
      ],
      visualModel: buildMeasurementVisual(
        `Chia đều ${divKg} kg bột vào các túi ${bagSizeG} g`,
        {
          itemName: 'túi bột mì',
          unitLabel: 'g',
          actionPrompt: `Đổi ${divKg} kg ra gam rồi chia theo sức chứa ${bagSizeG} g mỗi túi`,
          interactiveRule: `1 kg = 1 000 g. Mỗi túi chứa ${bagSizeG} g.`,
          groups: [
            { id: 'g_flour', label: `Tổng bột (${divKg} kg)`, icon: '🌾', count: divKg, unitValue: 1000, totalValue: divKg * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${divKg} kg` },
            { id: 'g_bags', label: `Các túi ${bagSizeG} g`, icon: '🛍️', count: numBags, unitValue: bagSizeG, totalValue: divKg * 1000, color: '#34D399', isUnknown: true, hideCountBeforeSolve: true, showUnitValueBeforeSolve: true, displayMode: 'groups' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'unit_divide',
          operands: [divKg * 1000, bagSizeG],
          expectedNumericResult: numBags,
          resultUnit: 'túi',
          primaryReading: `Tổng bột: ${divKg} kg`,
          secondaryReading: `Mỗi túi: ${bagSizeG} g`,
          conversionRule: 'Đổi kg ➔ g rồi chia cho sức chứa 1 túi',
          visualParams: {
            mode: 'divide_equal',
            givenA: divKg * 1000,
            givenB: bagSizeG,
            unitA: 'g',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${divKg}\\text{ kg} = ${divKg} \\;?\\; 1000 = ?\\text{ (g)}`,
            `\\text{Số túi chia được} = (\\text{Tổng gam}) \\;?\\; ${bagSizeG} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${divKg}\\text{ kg} = ${divKg * 1000}\\text{ g}`,
            `\\text{Số túi bột mì} = ${divKg * 1000} \\div ${bagSizeG} = ${numBags}\\text{ (túi)}`,
          ],
          finalAnswerLatex: `${numBags}\\text{ túi}`,
          finalNumericValue: numBags,
        }
      ),
    },

    // Q8 (Practice): Subtract grams from kg
    {
      id: `dec-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Một bao gạo cân nặng ${bigKg} kg. Người ta lấy ra ${takeG} g gạo để nấu bữa trưa. Hỏi trong bao còn lại bao nhiêu gam gạo?`,
      options: makeOptions(`${leftG} g`, [
        `${bigKg * 1000 + takeG} g`,
        `${leftG + 100} g`,
        `${leftG - 100} g`,
      ]),
      correctAnswer: `${leftG} g`,
      hint: `Đổi ${bigKg} kg sang gam (${bigKg * 1000} g), rồi trừ đi ${takeG} g đã lấy ra.`,
      stepByStepExplanation: [
        `Đổi: ${bigKg} kg = ${bigKg * 1000} g.`,
        `Số gam gạo còn lại trong bao là: ${bigKg * 1000} - ${takeG} = ${leftG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Lấy ${takeG} g từ bao gạo ${bigKg} kg`,
        {
          itemName: 'gạo',
          unitLabel: 'g',
          actionPrompt: 'Đổi số ki-lô-gam ban đầu sang gam trước khi thực hiện phép trừ',
          interactiveRule: `Ban đầu = ${bigKg} kg, đã lấy ra = ${takeG} g.`,
          groups: [
            { id: 'g_init', label: `Bao gạo (${bigKg} kg)`, icon: '🍚', count: bigKg, unitValue: 1000, totalValue: bigKg * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${bigKg} kg` },
            { id: 'g_take', label: 'Đã lấy ra', icon: '🥣', count: 1, unitValue: takeG, totalValue: takeG, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'unit_subtract',
          operands: [bigKg * 1000, takeG],
          expectedNumericResult: leftG,
          resultUnit: 'g',
          primaryReading: `Ban đầu: ${bigKg} kg`,
          secondaryReading: `Lấy ra: ${takeG} g`,
          conversionRule: '1 kg = 1 000 g',
          visualParams: {
            mode: 'subtract',
            givenA: bigKg * 1000,
            givenB: takeG,
            unitA: 'g',
            labelA: `Bao gạo: ${bigKg} kg`,
            labelB: `Lấy ra: ${takeG} g`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${bigKg}\\text{ kg} = ${bigKg} \\;?\\; 1000 = ?\\text{ (g)}`,
            `\\text{Gạo còn lại} = (\\text{Ban đầu}) \\;?\\; ${takeG} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${bigKg}\\text{ kg} = ${bigKg * 1000}\\text{ g}`,
            `\\text{Số gạo còn lại} = ${bigKg * 1000} - ${takeG} = ${leftG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${leftG}\\text{ g}`,
          finalNumericValue: leftG,
        }
      ),
    },

    // Q9 (Practice): Balance scale with extra known weight
    {
      id: `dec-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Trên cân thăng bằng: Đĩa trái đặt 1 hộp dụng cụ và quả cân ${leftWeightG} g; đĩa phải đặt quả cân ${rightKg} kg và quả cân ${rightExtraG} g. Hỏi hộp dụng cụ cân nặng bao nhiêu gam?`,
      options: makeOptions(`${mysteryBoxG} g`, [
        `${rightKg * 1000 + rightExtraG} g`,
        `${mysteryBoxG + leftWeightG * 2} g`,
        `${mysteryBoxG - 50} g`,
      ]),
      correctAnswer: `${mysteryBoxG} g`,
      hint: `Tính tổng khối lượng đĩa phải theo gam (${rightKg * 1000 + rightExtraG} g), rồi bớt đi quả cân ${leftWeightG} g ở đĩa trái.`,
      stepByStepExplanation: [
        `Tổng khối lượng ở đĩa phải là: 1 000 + ${rightExtraG} = ${rightKg * 1000 + rightExtraG} (g).`,
        `Khối lượng hộp dụng cụ là: ${rightKg * 1000 + rightExtraG} - ${leftWeightG} = ${mysteryBoxG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Cân thăng bằng: Hộp + ${leftWeightG} g = ${rightKg} kg ${rightExtraG} g`,
        {
          itemName: 'quả cân',
          unitLabel: 'g',
          actionPrompt: 'Bỏ cùng một lượng quả cân như nhau ở cả hai đĩa để cô lập hộp dụng cụ',
          interactiveRule: `Hộp + ${leftWeightG} g = ${rightKg} kg + ${rightExtraG} g.`,
          groups: [
            { id: 'g_r', label: `Đĩa phải (${rightKg} kg + ${rightExtraG} g)`, icon: '⚖️', count: 1, unitValue: rightKg * 1000 + rightExtraG, totalValue: rightKg * 1000 + rightExtraG, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${rightKg} kg + ${rightExtraG} g` },
            { id: 'g_lw', label: 'Quả cân đĩa trái', icon: '🏋️', count: 1, unitValue: leftWeightG, totalValue: leftWeightG, color: '#F59E0B', displayMode: 'measurement' },
            { id: 'g_mb', label: 'Hộp dụng cụ', icon: '🧰', count: 1, unitValue: mysteryBoxG, totalValue: mysteryBoxG, color: '#34D399', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'balance_eq',
          operands: [rightKg * 1000 + rightExtraG, leftWeightG],
          expectedNumericResult: mysteryBoxG,
          resultUnit: 'g',
          primaryReading: `Đĩa trái: Hộp + ${leftWeightG} g`,
          secondaryReading: `Đĩa phải: ${rightKg} kg ${rightExtraG} g`,
          conversionRule: 'Hộp = Đĩa phải − Quả cân đĩa trái',
          visualParams: {
            mode: 'balance_eq',
            givenA: rightKg * 1000 + rightExtraG,
            givenB: leftWeightG,
            unitA: 'g',
            labelA: `Hộp + ${leftWeightG} g`,
            labelB: `${rightKg} kg + ${rightExtraG} g`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tổng đĩa phải} = 1000 \\;?\\; ${rightExtraG} = ?\\text{ (g)}`,
            `\\text{Hộp dụng cụ} = (\\text{Tổng đĩa phải}) \\;?\\; ${leftWeightG} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Tổng đĩa phải} = 1000 + ${rightExtraG} = ${rightKg * 1000 + rightExtraG}\\text{ (g)}`,
            `\\text{Hộp dụng cụ} = ${rightKg * 1000 + rightExtraG} - ${leftWeightG} = ${mysteryBoxG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${mysteryBoxG}\\text{ g}`,
          finalNumericValue: mysteryBoxG,
        }
      ),
    },

    // Q10 (Challenge): Full Basket & Half Basket -> Empty Basket Weight!
    {
      id: `dec-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'remainder',
      prompt: `Thử thách Thùng Đầy – Nửa Thùng: Một giỏ đựng đầy táo cân nặng ${fullTotalG} g. Sau khi bán đi ĐÚNG MỘT NỬA số táo thì giỏ táo còn lại cân nặng ${halfTotalG} g. Hỏi riêng chiếc giỏ rỗng cân nặng bao nhiêu gam?`,
      options: makeOptions(`${emptyBasketG} g`, [
        `${halfFruitG} g`,
        `${emptyBasketG + 100} g`,
        `${emptyBasketG * 2} g`,
      ]),
      correctAnswer: `${emptyBasketG} g`,
      hint: `Bước 1: Hiệu giữa hai lần cân (${fullTotalG} - ${halfTotalG}) chính là cân nặng của MỘT NỬA số táo (không dính vỏ giỏ!). Bước 2: Lấy cân nặng giỏ còn một nửa táo trừ đi một nửa số táo đó!`,
      stepByStepExplanation: [
        `Cân nặng của một nửa số táo là: ${fullTotalG} - ${halfTotalG} = ${halfFruitG} (g).`,
        `Chiếc giỏ rỗng cân nặng là: ${halfTotalG} - ${halfFruitG} = ${emptyBasketG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Giỏ đầy (${fullTotalG} g) & Giỏ nửa táo (${halfTotalG} g)`,
        {
          itemName: 'nửa số táo và vỏ giỏ',
          unitLabel: 'g',
          actionPrompt: 'So sánh 2 lần cân: phần chênh lệch chính là 1 nửa lượng táo!',
          interactiveRule: `Giỏ đầy = 2 nửa táo + vỏ (${fullTotalG} g); Giỏ nửa = 1 nửa táo + vỏ (${halfTotalG} g).`,
          groups: [
            { id: 'g_full', label: 'Giỏ đầy táo', icon: '🧺', count: 1, unitValue: fullTotalG, totalValue: fullTotalG, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_half', label: 'Giỏ còn nửa táo', icon: '🍏', count: 1, unitValue: halfTotalG, totalValue: halfTotalG, color: '#34D399', displayMode: 'measurement' },
            { id: 'g_tare', label: 'Riêng vỏ giỏ rỗng', icon: '📦', count: 1, unitValue: emptyBasketG, totalValue: emptyBasketG, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'tare_weight',
          operands: [fullTotalG, halfTotalG],
          expectedNumericResult: emptyBasketG,
          resultUnit: 'g',
          primaryReading: `Giỏ đầy: ${fullTotalG} g`,
          secondaryReading: `Giỏ nửa táo: ${halfTotalG} g`,
          conversionRule: 'Hiệu hai lần cân = 1 nửa số táo',
          visualParams: {
            mode: 'tare_half',
            givenA: fullTotalG,
            givenB: halfTotalG,
            unitA: 'g',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Cân nặng một nửa số táo} = ${fullTotalG} \\;?\\; ${halfTotalG} = ?`,
            `\\text{Cân nặng vỏ giỏ rỗng} = ${halfTotalG} \\;?\\; (\\text{Một nửa số táo}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Cân nặng một nửa số táo} = ${fullTotalG} - ${halfTotalG} = ${halfFruitG}\\text{ (g)}`,
            `\\text{Cân nặng vỏ giỏ rỗng} = ${halfTotalG} - ${halfFruitG} = ${emptyBasketG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${emptyBasketG}\\text{ g}`,
          finalNumericValue: emptyBasketG,
        }
      ),
    },

    // Q11 (Challenge): Equalize two baskets
    {
      id: `dec-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'remainder',
      prompt: `Thử thách San khối lượng: Thùng A nặng ${heavyG} g, thùng B nặng ${lightG} g. Hỏi phải chuyển bao nhiêu gam hàng từ thùng A sang thùng B để hai thùng có khối lượng bằng nhau?`,
      options: makeOptions(`${transferG} g`, [
        `${diffBaskets} g`,
        `${transferG + 100} g`,
        `${transferG - 50} g`,
      ]),
      correctAnswer: `${transferG} g`,
      hint: `Tìm phần hơn giữa thùng A và thùng B trước, rồi CHIA ĐÔI phần hơn đó để chuyển sang thùng B!`,
      stepByStepExplanation: [
        `Thùng A nặng hơn thùng B là: ${heavyG} - ${lightG} = ${diffBaskets} (g).`,
        `Lượng hàng cần chuyển sang thùng B là: ${diffBaskets} : 2 = ${transferG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `San đều hai thùng: Thùng A (${heavyG} g) ➔ Thùng B (${lightG} g)`,
        {
          itemName: 'hàng cần chuyển',
          unitLabel: 'g',
          actionPrompt: 'Chỉ chuyển ĐÚNG MỘT NỬA phần chênh lệch từ thùng nặng sang thùng nhẹ!',
          interactiveRule: `Thùng A = ${heavyG} g, Thùng B = ${lightG} g.`,
          groups: [
            { id: 'g_ha', label: 'Thùng A', icon: '📦', count: 1, unitValue: heavyG, totalValue: heavyG, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_lb', label: 'Thùng B', icon: '📦', count: 1, unitValue: lightG, totalValue: lightG, color: '#34D399', displayMode: 'measurement' },
            { id: 'g_tr', label: 'Phần chuyển đi', icon: '➡️', count: 1, unitValue: transferG, totalValue: transferG, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'equalize_transfer',
          operands: [heavyG, lightG],
          expectedNumericResult: transferG,
          resultUnit: 'g',
          primaryReading: `Thùng A: ${heavyG} g`,
          secondaryReading: `Thùng B: ${lightG} g`,
          conversionRule: 'Lượng chuyển = Phần hơn ÷ 2',
          visualParams: {
            mode: 'equalize_pour',
            givenA: heavyG,
            givenB: lightG,
            unitA: 'g',
            labelA: 'Thùng A',
            labelB: 'Thùng B',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Thùng A nặng hơn Thùng B} = ${heavyG} \\;?\\; ${lightG} = ?`,
            `\\text{Lượng cần chuyển} = (\\text{Phần hơn}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Hiệu khối lượng} = ${heavyG} - ${lightG} = ${diffBaskets}\\text{ (g)}`,
            `\\text{Lượng cần chuyển sang B} = ${diffBaskets} \\div 2 = ${transferG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${transferG}\\text{ g}`,
          finalNumericValue: transferG,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 4 (NGÀY 22 – 28): PHÒNG THÍ NGHIỆM THỂ TÍCH (LÍT – MI-LI-LÍT)
// ============================================================================

const WEEK4_THEMES = [
  {
    title: 'Ngày 22: Đổi đơn vị Lít – Mi-li-lít (1 L = 1 000 mL)',
    topicTag: 'Đổi đơn vị L – mL',
    goals: [
      'Ghi nhớ quy tắc 1 L = 1 000 mL và đổi số đo dung tích hỗn hợp thành thạo',
      'Bù dung tích cho tròn 1 lít hoặc 2 lít',
    ],
  },
  {
    title: 'Ngày 23: Cộng trừ thể tích hỗn hợp & Rót nhiều cốc bằng nhau',
    topicTag: 'Cộng trừ thể tích',
    goals: [
      'Đổi cùng đơn vị mL trước khi cộng trừ dung tích hai bình nước',
      'Tính tổng lượng nước khi rót vào nhiều cốc/chai giống nhau',
    ],
  },
  {
    title: 'Ngày 24: Chia đều thể tích vào cốc/chai & Tính lượng nước còn lại',
    topicTag: 'Chia đều thể tích',
    goals: [
      'Tính số chai/cốc rót đầy từ một bình lớn (đổi L sang mL)',
      'Tính phần dung tích còn dư trong bình sau khi rót ra nhiều cốc',
    ],
  },
  {
    title: 'Ngày 25: Bài toán San Bình — Rót qua lại để hai bình bằng nhau',
    topicTag: 'Bài toán san bình',
    goals: [
      'Hiểu bản chất san bình: lượng rót = (Bình nhiều − Bình ít) : 2',
      'Tránh bẫy nhầm lấy cả hiệu thay vì chia đôi hiệu',
    ],
  },
  {
    title: 'Ngày 26: Bình đầy – Nửa bình nước & Tìm vỏ bình',
    topicTag: 'Bình đầy – Nửa bình',
    goals: [
      'Tách riêng khối lượng 1 nửa phần nước từ hiệu hai lần cân',
      'Tính chính xác cân nặng vỏ bình hoặc dung tích ban đầu',
    ],
  },
  {
    title: 'Ngày 27: Toán đong nước nhiều bước & Sơ đồ thanh L – mL',
    topicTag: 'Toán đong nước',
    goals: [
      'Kết hợp sơ đồ thanh gấp lần / hơn kém với đơn vị L và mL',
      'Giải bài toán tìm lượng nước ban đầu bằng suy luận ngược',
    ],
  },
  {
    title: 'Ngày 28: Tổng ôn Tuần 4 — Làm chủ Thể tích L – mL',
    topicTag: 'Tổng ôn Tuần 4',
    goals: [
      'Hoàn thiện phản xạ đổi đơn vị L – mL, san bình và rót nước 2 bước',
      'Sẵn sàng chinh phục Bài Kiểm Tra 15 Phút Cuối Tuần 4',
    ],
  },
];

function buildWeek4Questions(day: number): InMonthQuestion[] {
  const offset = day - 21; // 1..7

  // Q1: Convert X L Y mL -> mL
  const l1 = 1 + (offset % 4); // 2, 3, 4, 1, 2, 3, 4
  const ml1 = 150 + offset * 50; // 200..500
  const totalMl1 = l1 * 1000 + ml1;

  // Q2: Complement to 1 L (1000 mL)
  const pouredMl = 200 + offset * 50; // 250..550 mL
  const remTo1L = 1000 - pouredMl;

  // Q3: Add two beakers (1 L + mlA) + mlB
  const b1Ml = 150 + offset * 50; // 200..500
  const b2Ml = 350 + offset * 50; // 400..700
  const sumBeakers = 1000 + b1Ml + b2Ml;

  // Q4: Pour into N equal cups -> remaining water in 2L pitcher
  const cupMl = 200 + (offset % 2) * 50; // 250, 200, 250...
  const cupCount = 3 + (offset % 3); // 4, 5, 3, 4, 5, 3, 4 -> max 5*250 = 1250 < 2000
  const usedWater = cupMl * cupCount;
  const pitcherL = 2;
  const leftWater = pitcherL * 1000 - usedWater;

  // Q5: Divide L into equal bottles (250 mL or 500 mL)
  const tankL = 2 + (offset % 3); // 3, 4, 2... L
  const bottleMl = offset % 2 === 1 ? 250 : 500;
  const numBottles = (tankL * 1000) / bottleMl;

  // Q6: Equalize two water tanks (pour from A to B; ensure tankA - tankB_even is always even)
  const tankA = 1800 + offset * 200; // 2000..3200 mL
  const tankB_even = 1000 + offset * 100 + (offset % 2 === 1 ? 100 : 0); // diff always even: 800, 1000, 1000, 1200, 1200, 1400, 1400
  const diffTank = tankA - tankB_even;
  const pourAmt = diffTank / 2;

  // Q7: Bar model volume: Bottle B has k times Bottle A -> total mL
  const volA = 200 + offset * 50; // 250..550 mL
  const volMult = offset % 2 === 1 ? 3 : 2;
  const volB = volA * volMult;
  const totalVolAB = volA + volB;

  // Q8: Subtract L - mL
  const jugL = 3 + (offset % 3); // 4, 5, 3... L
  const drinkMl = 650 + offset * 100; // 750..1350 mL
  const remainJug = jugL * 1000 - drinkMl;

  // Q9: How many cups of 200 mL fill X L Y mL?
  const exactL = 1;
  const exactExtraMl = 200 * (1 + (offset % 4)); // 400, 600, 800, 200...
  const exactTotalMl = exactL * 1000 + exactExtraMl;
  const exactCups = exactTotalMl / 200;

  // Q10 (Challenge): Full bottle & Half bottle water -> Empty bottle weight (g)
  const halfWaterG = 400 + offset * 50; // 450..750 g
  const emptyBotG = 150 + offset * 25; // 175..325 g
  const halfBotTotal = halfWaterG + emptyBotG;
  const fullBotTotal = halfWaterG * 2 + emptyBotG;

  // Q11 (Challenge): Working backwards with water pouring
  const finalWater = 600 + offset * 100; // 700..1300 mL
  const addedWater = 250 + offset * 50; // 300..600 mL
  const pouredOutWater = 400 + offset * 50; // 450..750 mL
  // start - pouredOut + added = final -> start = final - added + pouredOut
  const startWater = finalWater - addedWater + pouredOutWater;

  return [
    // Q1 (Warmup): Convert L & mL -> mL
    {
      id: `dec-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Một bình nước khoáng có dung tích ${l1} L ${ml1} mL. Đổi dung tích bình nước đó sang đơn vị mi-li-lít (mL).`,
      options: makeOptions(`${totalMl1} mL`, [
        `${l1 * 100 + ml1} mL`,
        `${totalMl1 + 100} mL`,
        `${totalMl1 - 100} mL`,
      ]),
      correctAnswer: `${totalMl1} mL`,
      hint: `Nhớ quy tắc chuẩn: 1 L = 1 000 mL.`,
      stepByStepExplanation: [
        `Đổi: ${l1} L = ${l1 * 1000} mL.`,
        `Tổng dung tích bình nước là: ${l1 * 1000} + ${ml1} = ${totalMl1} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Đổi ${l1} L ${ml1} mL sang mi-li-lít`,
        {
          itemName: 'dung tích',
          unitLabel: 'mL',
          actionPrompt: `Quy đổi từng 1 L = 1 000 mL rồi cộng thêm ${ml1} mL`,
          interactiveRule: `1 L = 1 000 mL.`,
          groups: [
            { id: 'g_l', label: `Phần lít (${l1} L)`, icon: '🧪', count: l1, unitValue: 1000, totalValue: l1 * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${l1} L` },
            { id: 'g_ml', label: 'Phần mi-li-lít lẻ', icon: '💧', count: 1, unitValue: ml1, totalValue: ml1, color: '#34D399', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_convert',
          operands: [l1, ml1],
          expectedNumericResult: totalMl1,
          resultUnit: 'mL',
          primaryReading: `${l1} L ${ml1} mL`,
          secondaryReading: '= ? mL',
          conversionRule: '1 L = 1 000 mL',
          visualParams: {
            mode: 'convert',
            givenA: l1,
            givenB: ml1,
            unitA: 'L',
            unitB: 'mL',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `${l1}\\text{ L} = ${l1} \\;?\\; 1000 = ?\\text{ (mL)}`,
            `\\text{Tổng dung tích} = (\\text{mL từ L}) \\;?\\; ${ml1} = ?`,
          ],
          fullLatexSteps: [
            `${l1}\\text{ L} = ${l1} \\times 1000 = ${l1 * 1000}\\text{ (mL)}`,
            `\\text{Tổng dung tích} = ${l1 * 1000} + ${ml1} = ${totalMl1}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${totalMl1}\\text{ mL}`,
          finalNumericValue: totalMl1,
        }
      ),
    },

    // Q2 (Warmup): Complement to 1 L
    {
      id: `dec-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Trong ca đong loại 1 L hiện đang có ${pouredMl} mL nước cam. Hỏi cần rót thêm bao nhiêu mi-li-lít nước cam nữa để đầy đúng vạch 1 L?`,
      options: makeOptions(`${remTo1L} mL`, [
        `${1000 + pouredMl} mL`,
        `${remTo1L + 100} mL`,
        `${remTo1L - 50} mL`,
      ]),
      correctAnswer: `${remTo1L} mL`,
      hint: `Đổi 1 L = 1 000 mL rồi lấy 1 000 mL trừ đi ${pouredMl} mL.`,
      stepByStepExplanation: [
        `Đổi: 1 L = 1 000 mL.`,
        `Lượng nước cam cần rót thêm là: 1 000 - ${pouredMl} = ${remTo1L} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Rót thêm nước cho đầy vạch 1 L (đã có ${pouredMl} mL)`,
        {
          itemName: 'nước cam',
          unitLabel: 'mL',
          actionPrompt: 'Đổi vạch đầy 1 L = 1 000 mL rồi tìm khoảng trống cần rót thêm',
          interactiveRule: `Đầy ca = 1 L (1 000 mL), hiện có = ${pouredMl} mL.`,
          groups: [
            { id: 'g_has', label: 'Nước hiện có', icon: '🧃', count: 1, unitValue: pouredMl, totalValue: pouredMl, color: '#F59E0B', displayMode: 'measurement' },
            { id: 'g_add', label: 'Cần rót thêm', icon: '💧', count: 1, unitValue: remTo1L, totalValue: remTo1L, color: '#38BDF8', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_subtract',
          operands: [1000, pouredMl],
          expectedNumericResult: remTo1L,
          resultUnit: 'mL',
          primaryReading: 'Vạch đầy: 1 L',
          secondaryReading: `Hiện có: ${pouredMl} mL`,
          conversionRule: '1 L = 1 000 mL',
          visualParams: {
            mode: 'subtract',
            givenA: 1000,
            givenB: pouredMl,
            unitA: 'mL',
            labelA: '1 L',
            labelB: 'Hiện có',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } 1\\text{ L} = 1000\\text{ mL}`,
            `\\text{Cần rót thêm} = 1000 \\;?\\; ${pouredMl} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } 1\\text{ L} = 1000\\text{ mL}`,
            `\\text{Lượng cần rót thêm} = 1000 - ${pouredMl} = ${remTo1L}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${remTo1L}\\text{ mL}`,
          finalNumericValue: remTo1L,
        }
      ),
    },

    // Q3 (VisualModel): Sum two beakers
    {
      id: `dec-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Bình A chứa 1 L ${b1Ml} mL dung dịch xanh, bình B chứa ${b2Ml} mL dung dịch xanh. Nếu đổ cả hai bình vào một bể chứa thì trong bể có tất cả bao nhiêu mi-li-lít dung dịch?`,
      options: makeOptions(`${sumBeakers} mL`, [
        `${sumBeakers - 100} mL`,
        `${sumBeakers + 100} mL`,
        `${b1Ml + b2Ml} mL`,
      ]),
      correctAnswer: `${sumBeakers} mL`,
      hint: `Đổi bình A sang mL (1 L ${b1Ml} mL = ${1000 + b1Ml} mL) rồi cộng với bình B.`,
      stepByStepExplanation: [
        `Đổi bình A: 1 L ${b1Ml} mL = ${1000 + b1Ml} mL.`,
        `Tổng lượng dung dịch là: ${1000 + b1Ml} + ${b2Ml} = ${sumBeakers} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Gộp hai bình dung dịch về đơn vị mL`,
        {
          itemName: 'dung dịch',
          unitLabel: 'mL',
          actionPrompt: 'Đổi Bình A sang mi-li-lít trước khi gộp cùng Bình B',
          interactiveRule: `Bình A = 1 L ${b1Ml} mL, Bình B = ${b2Ml} mL.`,
          groups: [
            { id: 'g_ba', label: `Bình A (1 L ${b1Ml} mL)`, icon: '🧪', count: 1, unitValue: 1000 + b1Ml, totalValue: 1000 + b1Ml, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `1 L ${b1Ml} mL` },
            { id: 'g_bb', label: 'Bình B', icon: '🧫', count: 1, unitValue: b2Ml, totalValue: b2Ml, color: '#34D399', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_add',
          operands: [1000 + b1Ml, b2Ml],
          expectedNumericResult: sumBeakers,
          resultUnit: 'mL',
          primaryReading: `Bình A: 1 L ${b1Ml} mL`,
          secondaryReading: `Bình B: ${b2Ml} mL`,
          conversionRule: 'Đổi cùng đơn vị mL rồi cộng',
          visualParams: {
            mode: 'sum',
            givenA: 1000 + b1Ml,
            givenB: b2Ml,
            unitA: 'mL',
            labelA: `Bình A: 1 L ${b1Ml} mL`,
            labelB: `Bình B: ${b2Ml} mL`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi Bình A} = 1000 \\;?\\; ${b1Ml} = ?\\text{ (mL)}`,
            `\\text{Tổng dung dịch} = (\\text{Bình A}) \\;?\\; ${b2Ml} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bình A} = 1000 + ${b1Ml} = ${1000 + b1Ml}\\text{ (mL)}`,
            `\\text{Tổng dung dịch} = ${1000 + b1Ml} + ${b2Ml} = ${sumBeakers}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${sumBeakers}\\text{ mL}`,
          finalNumericValue: sumBeakers,
        }
      ),
    },

    // Q4 (VisualModel): Pour N cups from 2 L pitcher -> remaining mL
    {
      id: `dec-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Một bình nước ép có ${pitcherL} L nước. Bạn Minh rót đều ra ${cupCount} cốc, mỗi cốc chứa ${cupMl} mL. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước ép?`,
      options: makeOptions(`${leftWater} mL`, [
        `${usedWater} mL`,
        `${leftWater + cupMl} mL`,
        `${leftWater - 100} mL`,
      ]),
      correctAnswer: `${leftWater} mL`,
      hint: `Bước 1: Đổi ${pitcherL} L = ${pitcherL * 1000} mL. Bước 2: Tính lượng nước đã rót ra ${cupCount} cốc (${cupMl} × ${cupCount}), rồi trừ đi.`,
      stepByStepExplanation: [
        `Đổi: ${pitcherL} L = ${pitcherL * 1000} mL.`,
        `Lượng nước đã rót ra ${cupCount} cốc là: ${cupMl} × ${cupCount} = ${usedWater} (mL).`,
        `Lượng nước còn lại trong bình là: ${pitcherL * 1000} - ${usedWater} = ${leftWater} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Rót ${cupCount} cốc (${cupMl} mL/cốc) từ bình ${pitcherL} L`,
        {
          itemName: 'nước ép',
          unitLabel: 'mL',
          actionPrompt: `Đổi ${pitcherL} L sang mL, tính tổng ${cupCount} cốc đã rót rồi tìm phần còn lại`,
          interactiveRule: `Bình ban đầu = ${pitcherL} L, rót ra ${cupCount} cốc × ${cupMl} mL.`,
          groups: [
            { id: 'g_p', label: `Bình ban đầu (${pitcherL} L)`, icon: '🫗', count: 1, unitValue: pitcherL * 1000, totalValue: pitcherL * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${pitcherL} L` },
            { id: 'g_u', label: `Đã rót (${cupCount} cốc × ${cupMl} mL)`, icon: '🥤', count: cupCount, unitValue: cupMl, totalValue: usedWater, color: '#F59E0B', isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'groups' },
            { id: 'g_l', label: 'Còn lại trong bình', icon: '💧', count: 1, unitValue: leftWater, totalValue: leftWater, color: '#34D399', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_subtract',
          operands: [pitcherL * 1000, usedWater],
          expectedNumericResult: leftWater,
          resultUnit: 'mL',
          primaryReading: `Bình: ${pitcherL} L`,
          secondaryReading: `Rót ra: ${cupCount} cốc × ${cupMl} mL`,
          conversionRule: 'Còn lại = Bình ban đầu − Tổng các cốc',
          visualParams: {
            mode: 'subtract',
            givenA: pitcherL * 1000,
            givenB: usedWater,
            unitA: 'mL',
            labelA: `Bình: ${pitcherL} L`,
            labelB: `Rót ${cupCount} cốc × ${cupMl} mL`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${pitcherL}\\text{ L} = ${pitcherL} \\;?\\; 1000 = ?\\text{ (mL)}`,
            `\\text{Lượng nước đã rót} = ${cupMl} \\;?\\; ${cupCount} = ?\\text{ (mL)}`,
            `\\text{Còn lại trong bình} = (\\text{Bình ban đầu}) \\;?\\; (\\text{Đã rót}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${pitcherL}\\text{ L} = ${pitcherL * 1000}\\text{ mL} \\quad ; \\quad \\text{Đã rót} = ${cupMl} \\times ${cupCount} = ${usedWater}\\text{ (mL)}`,
            `\\text{Còn lại} = ${pitcherL * 1000} - ${usedWater} = ${leftWater}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${leftWater}\\text{ mL}`,
          finalNumericValue: leftWater,
        }
      ),
    },

    // Q5 (VisualModel): Divide L into equal bottles
    {
      id: `dec-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Một can đựng ${tankL} L sữa tươi được rót đều vào các chai nhỏ loại ${bottleMl} mL. Hỏi rót đầy được tất cả bao nhiêu chai sữa?`,
      options: makeOptions(`${numBottles} chai`, [
        `${numBottles + 2} chai`,
        `${numBottles - 2} chai`,
        `${tankL * 2} chai`,
      ]),
      correctAnswer: `${numBottles} chai`,
      hint: `Đổi ${tankL} L = ${tankL * 1000} mL rồi chia cho dung tích mỗi chai (${bottleMl} mL).`,
      stepByStepExplanation: [
        `Đổi: ${tankL} L = ${tankL * 1000} mL.`,
        `Số chai sữa rót đầy là: ${tankL * 1000} : ${bottleMl} = ${numBottles} (chai).`,
      ],
      visualModel: buildMeasurementVisual(
        `Chia đều ${tankL} L sữa vào chai ${bottleMl} mL`,
        {
          itemName: 'chai sữa',
          unitLabel: 'mL',
          actionPrompt: `Đổi ${tankL} L sang mL rồi chia đều cho mỗi chai ${bottleMl} mL`,
          interactiveRule: `1 L = 1 000 mL. Mỗi chai đựng ${bottleMl} mL.`,
          groups: [
            { id: 'g_milk', label: `Can sữa (${tankL} L)`, icon: '🥛', count: tankL, unitValue: 1000, totalValue: tankL * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${tankL} L` },
            { id: 'g_bot', label: `Các chai ${bottleMl} mL`, icon: '🍼', count: numBottles, unitValue: bottleMl, totalValue: tankL * 1000, color: '#34D399', isUnknown: true, hideCountBeforeSolve: true, showUnitValueBeforeSolve: true, displayMode: 'groups' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_divide',
          operands: [tankL * 1000, bottleMl],
          expectedNumericResult: numBottles,
          resultUnit: 'chai',
          primaryReading: `Can sữa: ${tankL} L`,
          secondaryReading: `Mỗi chai: ${bottleMl} mL`,
          conversionRule: 'Đổi L ➔ mL rồi chia cho dung tích 1 chai',
          visualParams: {
            mode: 'divide_equal',
            givenA: tankL * 1000,
            givenB: bottleMl,
            unitA: 'mL',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${tankL}\\text{ L} = ${tankL} \\;?\\; 1000 = ?\\text{ (mL)}`,
            `\\text{Số chai sữa} = (\\text{Tổng mL}) \\;?\\; ${bottleMl} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${tankL}\\text{ L} = ${tankL * 1000}\\text{ mL}`,
            `\\text{Số chai sữa rót được} = ${tankL * 1000} \\div ${bottleMl} = ${numBottles}\\text{ (chai)}`,
          ],
          finalAnswerLatex: `${numBottles}\\text{ chai}`,
          finalNumericValue: numBottles,
        }
      ),
    },

    // Q6 (Practice): Equalize Transfer (San Bình)
    {
      id: `dec-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Bình A có ${tankA} mL nước, bình B có ${tankB_even} mL nước. Hỏi phải rót bao nhiêu mi-li-lít nước từ bình A sang bình B để lượng nước ở hai bình bằng nhau?`,
      options: makeOptions(`${pourAmt} mL`, [
        `${diffTank} mL`,
        `${pourAmt + 100} mL`,
        `${pourAmt - 50} mL`,
      ]),
      correctAnswer: `${pourAmt} mL`,
      hint: `Tìm hiệu lượng nước giữa bình A và bình B, rồi CHIA ĐÔI hiệu đó! (Nếu rót hết cả phần hơn thì bình B sẽ lại nhiều hơn bình A!).`,
      stepByStepExplanation: [
        `Bình A nhiều hơn bình B là: ${tankA} - ${tankB_even} = ${diffTank} (mL).`,
        `Lượng nước cần rót từ bình A sang bình B là: ${diffTank} : 2 = ${pourAmt} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Bài toán San bình: Bình A (${tankA} mL) ➔ Bình B (${tankB_even} mL)`,
        {
          itemName: 'nước cần rót',
          unitLabel: 'mL',
          actionPrompt: 'Cắt đôi phần nước cao hơn ở Bình A để rót sang cho Bình B!',
          interactiveRule: `Lượng rót để bằng nhau = (Bình nhiều − Bình ít) ÷ 2.`,
          groups: [
            { id: 'g_ta', label: 'Bình A', icon: '🧪', count: 1, unitValue: tankA, totalValue: tankA, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_tb', label: 'Bình B', icon: '🧪', count: 1, unitValue: tankB_even, totalValue: tankB_even, color: '#34D399', displayMode: 'measurement' },
            { id: 'g_pr', label: 'Lượng nước rót sang', icon: '💧', count: 1, unitValue: pourAmt, totalValue: pourAmt, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'equalize_transfer',
          operands: [tankA, tankB_even],
          expectedNumericResult: pourAmt,
          resultUnit: 'mL',
          primaryReading: `Bình A: ${tankA} mL`,
          secondaryReading: `Bình B: ${tankB_even} mL`,
          conversionRule: 'Lượng rót = Phần chênh lệch ÷ 2',
          visualParams: {
            mode: 'equalize_pour',
            givenA: tankA,
            givenB: tankB_even,
            unitA: 'mL',
            labelA: 'Bình A',
            labelB: 'Bình B',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Bình A nhiều hơn Bình B} = ${tankA} \\;?\\; ${tankB_even} = ?`,
            `\\text{Lượng cần rót} = (\\text{Phần hơn}) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bình A nhiều hơn Bình B} = ${tankA} - ${tankB_even} = ${diffTank}\\text{ (mL)}`,
            `\\text{Lượng nước cần rót} = ${diffTank} \\div 2 = ${pourAmt}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${pourAmt}\\text{ mL}`,
          finalNumericValue: pourAmt,
        }
      ),
    },

    // Q7 (Practice): Volume Bar Model Ratio (Part-Whole)
    {
      id: `dec-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Bình nhỏ chứa ${volA} mL si-rô. Bình lớn chứa lượng si-rô gấp ${volMult} lần bình nhỏ. Hỏi cả hai bình chứa tất cả bao nhiêu mi-li-lít si-rô?`,
      options: makeOptions(`${totalVolAB} mL`, [
        `${volB} mL`,
        `${totalVolAB + volA} mL`,
        `${totalVolAB - volA} mL`,
      ]),
      correctAnswer: `${totalVolAB} mL`,
      hint: `Bình nhỏ có 1 phần, bình lớn có ${volMult} phần ➔ Cả hai bình có 1 + ${volMult} phần bằng nhau!`,
      stepByStepExplanation: [
        `Bình lớn chứa: ${volA} × ${volMult} = ${volB} (mL).`,
        `Cả hai bình chứa: ${volA} + ${volB} = ${totalVolAB} (mL).`,
      ],
      visualModel: buildBarVisual(
        `Sơ đồ Phần - Tổng thể tích hai bình si-rô`,
        {
          itemName: 'phần si-rô',
          unitLabel: 'mL',
          actionPrompt: `Gộp 1 phần của bình nhỏ với ${volMult} phần của bình lớn`,
          interactiveRule: `Bình nhỏ = ${volA} mL (1 phần), Bình lớn = ${volMult} phần.`,
          groups: [
            { id: 'g_va', label: 'Bình nhỏ (1 phần)', icon: '🍯', count: 1, unitValue: volA, totalValue: volA, color: '#38BDF8' },
            { id: 'g_vb', label: `Bình lớn (${volMult} phần)`, icon: '🍯', count: volMult, unitValue: volA, totalValue: volB, color: '#F59E0B', isUnknown: true },
          ],
        },
        {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: volA,
          unitName: 'mL',
          bars: [
            makeBarSpec({
              id: 'bar_va',
              label: 'Bình nhỏ',
              units: 1,
              unitValue: volA,
              displayValue: `${volA} mL`,
              color: '#38BDF8',
            }),
            makeBarSpec({
              id: 'bar_vb',
              label: 'Bình lớn',
              units: volMult,
              unitValue: volA,
              displayValue: `? mL (${volMult} phần)`,
              isUnknown: true,
              color: '#F59E0B',
            }),
          ],
          totalBracket: {
            targetBarIds: ['bar_va', 'bar_vb'],
            numericValue: totalVolAB,
            displayLabel: 'Tổng cả 2 bình = ? mL',
            isUnknown: true,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Bình lớn} = ${volA} \\;?\\; ${volMult} = ?`,
            `\\text{Tổng cả hai bình} = ${volA} \\;?\\; (\\text{Bình lớn}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bình lớn chứa} = ${volA} \\times ${volMult} = ${volB}\\text{ (mL)}`,
            `\\text{Tổng cả hai bình} = ${volA} + ${volB} = ${totalVolAB}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${totalVolAB}\\text{ mL}`,
          finalNumericValue: totalVolAB,
        }
      ),
    },

    // Q8 (Practice): Subtract mL from L
    {
      id: `dec-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Bình nước lọc trên trạm có ${jugL} L nước. Các bạn phi hành gia đã uống hết ${drinkMl} mL. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước?`,
      options: makeOptions(`${remainJug} mL`, [
        `${jugL * 1000 + drinkMl} mL`,
        `${remainJug + 100} mL`,
        `${remainJug - 100} mL`,
      ]),
      correctAnswer: `${remainJug} mL`,
      hint: `Đổi ${jugL} L = ${jugL * 1000} mL rồi trừ đi ${drinkMl} mL.`,
      stepByStepExplanation: [
        `Đổi: ${jugL} L = ${jugL * 1000} mL.`,
        `Lượng nước còn lại là: ${jugL * 1000} - ${drinkMl} = ${remainJug} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Tính lượng nước còn lại sau khi uống ${drinkMl} mL`,
        {
          itemName: 'nước lọc',
          unitLabel: 'mL',
          actionPrompt: 'Đổi lít sang mi-li-lít trước khi thực hiện phép trừ',
          interactiveRule: `Ban đầu = ${jugL} L, đã uống = ${drinkMl} mL.`,
          groups: [
            { id: 'g_jug', label: `Ban đầu (${jugL} L)`, icon: '🚰', count: jugL, unitValue: 1000, totalValue: jugL * 1000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${jugL} L` },
            { id: 'g_dr', label: 'Đã uống', icon: '🥤', count: 1, unitValue: drinkMl, totalValue: drinkMl, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_subtract',
          operands: [jugL * 1000, drinkMl],
          expectedNumericResult: remainJug,
          resultUnit: 'mL',
          primaryReading: `Ban đầu: ${jugL} L`,
          secondaryReading: `Đã uống: ${drinkMl} mL`,
          conversionRule: '1 L = 1 000 mL',
          visualParams: {
            mode: 'subtract',
            givenA: jugL * 1000,
            givenB: drinkMl,
            unitA: 'mL',
            labelA: `Ban đầu: ${jugL} L`,
            labelB: `Đã uống: ${drinkMl} mL`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${jugL}\\text{ L} = ${jugL} \\;?\\; 1000 = ?\\text{ (mL)}`,
            `\\text{Nước còn lại} = (\\text{Ban đầu}) \\;?\\; ${drinkMl} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${jugL}\\text{ L} = ${jugL * 1000}\\text{ mL}`,
            `\\text{Lượng nước còn lại} = ${jugL * 1000} - ${drinkMl} = ${remainJug}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${remainJug}\\text{ mL}`,
          finalNumericValue: remainJug,
        }
      ),
    },

    // Q9 (Practice): Exact cups of 200 mL from mixed L + mL
    {
      id: `dec-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Một ấm trà chứa ${exactL} L ${exactExtraMl} mL trà hoa cúc. Nếu rót đầy vào các tách loại 200 mL thì rót được tất cả bao nhiêu tách trà?`,
      options: makeOptions(`${exactCups} tách`, [
        `${exactCups + 1} tách`,
        `${exactCups - 1} tách`,
        `${exactCups + 2} tách`,
      ]),
      correctAnswer: `${exactCups} tách`,
      hint: `Đổi ${exactL} L ${exactExtraMl} mL = ${exactTotalMl} mL, sau đó chia cho 200 mL mỗi tách.`,
      stepByStepExplanation: [
        `Đổi: ${exactL} L ${exactExtraMl} mL = ${exactTotalMl} mL.`,
        `Số tách trà rót được là: ${exactTotalMl} : 200 = ${exactCups} (tách).`,
      ],
      visualModel: buildMeasurementVisual(
        `Chia ${exactL} L ${exactExtraMl} mL trà vào các tách 200 mL`,
        {
          itemName: 'tách trà',
          unitLabel: 'mL',
          actionPrompt: 'Đổi hỗn hợp L và mL về mL rồi chia đều cho 200 mL',
          interactiveRule: `Mỗi tách chứa 200 mL. Tổng lượng trà là ${exactL} L ${exactExtraMl} mL.`,
          groups: [
            { id: 'g_tea', label: `Ấm trà (${exactL} L ${exactExtraMl} mL)`, icon: '🫖', count: 1, unitValue: exactTotalMl, totalValue: exactTotalMl, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: `${exactL} L ${exactExtraMl} mL` },
            { id: 'g_cups', label: 'Số tách 200 mL', icon: '🍵', count: exactCups, unitValue: 200, totalValue: exactTotalMl, color: '#34D399', isUnknown: true, hideCountBeforeSolve: true, showUnitValueBeforeSolve: true, displayMode: 'groups' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_divide',
          operands: [exactTotalMl, 200],
          expectedNumericResult: exactCups,
          resultUnit: 'tách',
          primaryReading: `Ấm trà: ${exactL} L ${exactExtraMl} mL`,
          secondaryReading: 'Mỗi tách: 200 mL',
          conversionRule: 'Đổi sang mL rồi chia cho 200',
          visualParams: {
            mode: 'divide_equal',
            givenA: exactTotalMl,
            givenB: 200,
            unitA: 'mL',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${exactL}\\text{ L } ${exactExtraMl}\\text{ mL} = 1000 \\;?\\; ${exactExtraMl} = ?\\text{ (mL)}`,
            `\\text{Số tách trà} = (\\text{Tổng mL}) \\;?\\; 200 = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đổi } ${exactL}\\text{ L } ${exactExtraMl}\\text{ mL} = ${exactTotalMl}\\text{ mL}`,
            `\\text{Số tách trà} = ${exactTotalMl} \\div 200 = ${exactCups}\\text{ (tách)}`,
          ],
          finalAnswerLatex: `${exactCups}\\text{ tách}`,
          finalNumericValue: exactCups,
        }
      ),
    },

    // Q10 (Challenge): Full Bottle & Half Bottle -> Empty Bottle Weight
    {
      id: `dec-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'measurement',
      prompt: `Thử thách Bình Đầy – Nửa Bình: Một chai chứa đầy mật ong cân nặng ${fullBotTotal} g. Khi rót ra đúng một nửa lượng mật ong thì chai mật ong còn lại cân nặng ${halfBotTotal} g. Hỏi riêng chiếc vỏ chai rỗng cân nặng bao nhiêu gam?`,
      options: makeOptions(`${emptyBotG} g`, [
        `${halfWaterG} g`,
        `${emptyBotG + 50} g`,
        `${emptyBotG * 2} g`,
      ]),
      correctAnswer: `${emptyBotG} g`,
      hint: `Lấy cân nặng chai đầy trừ chai nửa sẽ ra ĐÚNG MỘT NỬA lượng mật ong. Sau đó lấy chai nửa trừ đi một nửa lượng mật ong đó để tìm vỏ chai!`,
      stepByStepExplanation: [
        `Một nửa lượng mật ong nặng là: ${fullBotTotal} - ${halfBotTotal} = ${halfWaterG} (g).`,
        `Chiếc vỏ chai rỗng nặng là: ${halfBotTotal} - ${halfWaterG} = ${emptyBotG} (g).`,
      ],
      visualModel: buildMeasurementVisual(
        `Chai đầy (${fullBotTotal} g) & Chai nửa (${halfBotTotal} g)`,
        {
          itemName: 'mật ong & vỏ chai',
          unitLabel: 'g',
          actionPrompt: 'Hiệu hai lần cân tách riêng 1 nửa mật ong không dính vỏ chai',
          interactiveRule: `Chai đầy = ${fullBotTotal} g, Chai nửa = ${halfBotTotal} g.`,
          groups: [
            { id: 'g_fb', label: 'Chai đầy mật ong', icon: '🍯', count: 1, unitValue: fullBotTotal, totalValue: fullBotTotal, color: '#F59E0B', displayMode: 'measurement' },
            { id: 'g_hb', label: 'Chai còn nửa mật', icon: '🫙', count: 1, unitValue: halfBotTotal, totalValue: halfBotTotal, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_eb', label: 'Vỏ chai rỗng', icon: '🍾', count: 1, unitValue: emptyBotG, totalValue: emptyBotG, color: '#34D399', isUnknown: true, displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'weight_balance',
          operation: 'tare_weight',
          operands: [fullBotTotal, halfBotTotal],
          expectedNumericResult: emptyBotG,
          resultUnit: 'g',
          primaryReading: `Chai đầy: ${fullBotTotal} g`,
          secondaryReading: `Chai nửa: ${halfBotTotal} g`,
          conversionRule: 'Hiệu hai lần cân = 1 nửa lượng mật',
          visualParams: {
            mode: 'tare_half',
            givenA: fullBotTotal,
            givenB: halfBotTotal,
            unitA: 'g',
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Một nửa lượng mật ong} = ${fullBotTotal} \\;?\\; ${halfBotTotal} = ?`,
            `\\text{Vỏ chai rỗng} = ${halfBotTotal} \\;?\\; (\\text{Nửa lượng mật}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Một nửa lượng mật ong} = ${fullBotTotal} - ${halfBotTotal} = ${halfWaterG}\\text{ (g)}`,
            `\\text{Vỏ chai rỗng} = ${halfBotTotal} - ${halfWaterG} = ${emptyBotG}\\text{ (g)}`,
          ],
          finalAnswerLatex: `${emptyBotG}\\text{ g}`,
          finalNumericValue: emptyBotG,
        }
      ),
    },

    // Q11 (Challenge): Working Backwards Volume
    {
      id: `dec-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'measurement',
      prompt: `Thử thách Suy luận ngược: Một thùng nước ban đầu có một lượng nước chưa biết. Sau khi múc ra ${pouredOutWater} mL rồi đổ thêm vào ${addedWater} mL thì trong thùng có đúng ${finalWater} mL nước. Hỏi lúc đầu trong thùng có bao nhiêu mi-li-lít nước?`,
      options: makeOptions(`${startWater} mL`, [
        `${finalWater + addedWater - pouredOutWater} mL`,
        `${startWater + 100} mL`,
        `${startWater - 100} mL`,
      ]),
      correctAnswer: `${startWater} mL`,
      hint: `Đi ngược từng bước từ kết quả ${finalWater} mL: vừa đổ thêm ${addedWater} mL thì trừ lại ${addedWater}; trước đó múc ra ${pouredOutWater} mL thì cộng trả lại ${pouredOutWater}!`,
      stepByStepExplanation: [
        `Trước khi đổ thêm ${addedWater} mL, trong thùng có: ${finalWater} - ${addedWater} = ${finalWater - addedWater} (mL).`,
        `Lúc đầu (trước khi múc ra ${pouredOutWater} mL) trong thùng có: ${finalWater - addedWater} + ${pouredOutWater} = ${startWater} (mL).`,
      ],
      visualModel: buildMeasurementVisual(
        `Suy luận ngược tìm lượng nước ban đầu (Kết quả: ${finalWater} mL)`,
        {
          itemName: 'nước trong thùng',
          unitLabel: 'mL',
          actionPrompt: 'Đảo ngược phép tính từ cuối về đầu: đổ thêm ➔ trừ lại, múc ra ➔ cộng lại',
          interactiveRule: `Ban đầu ➔ múc ${pouredOutWater} mL ➔ thêm ${addedWater} mL ➔ còn ${finalWater} mL.`,
          groups: [
            { id: 'g_fin', label: 'Lúc sau cùng', icon: '🪣', count: 1, unitValue: finalWater, totalValue: finalWater, color: '#38BDF8', displayMode: 'measurement' },
            { id: 'g_add', label: 'Đã đổ thêm', icon: '➕', count: 1, unitValue: addedWater, totalValue: addedWater, color: '#34D399', displayMode: 'measurement' },
            { id: 'g_out', label: 'Đã múc ra', icon: '➖', count: 1, unitValue: pouredOutWater, totalValue: pouredOutWater, color: '#F59E0B', displayMode: 'measurement' },
          ],
        },
        {
          kind: 'measurement_lab',
          subtype: 'volume_beaker',
          operation: 'unit_add',
          operands: [finalWater - addedWater, pouredOutWater],
          expectedNumericResult: startWater,
          resultUnit: 'mL',
          primaryReading: `Cuối cùng: ${finalWater} mL`,
          secondaryReading: `Múc ${pouredOutWater} mL · Thêm ${addedWater} mL`,
          conversionRule: 'Làm ngược: Trừ phần thêm, cộng trả phần múc',
          visualParams: {
            mode: 'sum',
            givenA: finalWater - addedWater,
            givenB: pouredOutWater,
            unitA: 'mL',
            labelA: `Cuối cùng: ${finalWater} mL`,
            labelB: `Múc ${pouredOutWater} mL · Thêm ${addedWater} mL`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Trước khi đổ thêm } ${addedWater}\\text{ mL} = ${finalWater} \\;?\\; ${addedWater} = ?`,
            `\\text{Lượng nước lúc đầu} = (\\text{Trước khi thêm}) \\;?\\; ${pouredOutWater} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Trước khi đổ thêm} = ${finalWater} - ${addedWater} = ${finalWater - addedWater}\\text{ (mL)}`,
            `\\text{Lượng nước lúc đầu} = ${finalWater - addedWater} + ${pouredOutWater} = ${startWater}\\text{ (mL)}`,
          ],
          finalAnswerLatex: `${startWater}\\text{ mL}`,
          finalNumericValue: startWater,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 5 (NGÀY 29 – 30): TỔNG ÔN CHIẾN LƯỢC TOÀN DIỆN THÁNG 12
// ============================================================================

function buildWeek5ReviewQuestions(day: 29 | 30): InMonthQuestion[] {
  // Day 29 mixes Week 1 & Week 2 heavily + preview of Week 3 & 4; Day 30 mixes all 4 pillars for Final Exam prep
  const w1 = buildWeek1Questions(day === 29 ? 5 : 7);
  const w2 = buildWeek2Questions(day === 29 ? 12 : 14);
  const w3 = buildWeek3Questions(day === 29 ? 19 : 21);
  const w4 = buildWeek4Questions(day === 29 ? 26 : 28);

  const selected: InMonthQuestion[] =
    day === 29
      ? [
          { ...w1[0], id: 'dec-d29-q1', stage: 'warmup' },
          { ...w2[0], id: 'dec-d29-q2', stage: 'warmup' },
          { ...w1[4], id: 'dec-d29-q3', stage: 'visualModel' },
          { ...w2[2], id: 'dec-d29-q4', stage: 'visualModel' },
          { ...w2[4], id: 'dec-d29-q5', stage: 'visualModel' },
          { ...w1[5], id: 'dec-d29-q6', stage: 'practice' },
          { ...w2[5], id: 'dec-d29-q7', stage: 'practice' },
          { ...w3[4], id: 'dec-d29-q8', stage: 'practice' },
          { ...w4[5], id: 'dec-d29-q9', stage: 'practice' },
          { ...w1[9], id: 'dec-d29-q10', stage: 'challenge' },
          { ...w2[9], id: 'dec-d29-q11', stage: 'challenge' },
        ]
      : [
          { ...w3[0], id: 'dec-d30-q1', stage: 'warmup' },
          { ...w4[0], id: 'dec-d30-q2', stage: 'warmup' },
          { ...w1[8], id: 'dec-d30-q3', stage: 'visualModel' },
          { ...w2[3], id: 'dec-d30-q4', stage: 'visualModel' },
          { ...w3[5], id: 'dec-d30-q5', stage: 'visualModel' },
          { ...w4[3], id: 'dec-d30-q6', stage: 'practice' },
          { ...w2[7], id: 'dec-d30-q7', stage: 'practice' },
          { ...w3[8], id: 'dec-d30-q8', stage: 'practice' },
          { ...w4[6], id: 'dec-d30-q9', stage: 'practice' },
          { ...w3[9], id: 'dec-d30-q10', stage: 'challenge' },
          { ...w4[9], id: 'dec-d30-q11', stage: 'challenge' },
        ];

  return selected;
}

// ============================================================================
// TỔNG HỢP 30 NGÀY HỌC THÁNG 12 (330 CÂU HỎI CHUẨN CPA)
// ============================================================================

export const DECEMBER_IN_MONTH_DAYS: InMonthDayPlan[] = [
  // Tuần 1 (Ngày 1..7)
  ...WEEK1_THEMES.map((t, i): InMonthDayPlan => {
    const day = i + 1;
    return {
      id: `dec-day-${day}`,
      dayNumber: day,
      weekNumber: 1,
      weekTitle: 'Tuần 1 · Chu Vi Cơ Bản',
      title: t.title,
      subtitle: 'Chu vi Hình vuông, Hình chữ nhật & Toán ngược tìm cạnh',
      topicTag: t.topicTag,
      skillDomain: 'interval',
      estimatedMinutes: 30,
      planetIcon: '📐',
      accentColor: '#0284C7',
      learningGoals: t.goals,
      questions: buildWeek1Questions(day),
    };
  }),
  // Tuần 2 (Ngày 8..14)
  ...WEEK2_THEMES.map((t, i): InMonthDayPlan => {
    const day = i + 8;
    return {
      id: `dec-day-${day}`,
      dayNumber: day,
      weekNumber: 2,
      weekTitle: 'Tuần 2 · Chu Vi Hình Ghép',
      title: t.title,
      subtitle: 'Kỹ thuật Dời cạnh (Side-Shifting) cho Chữ L, Bậc thang & Chữ U',
      topicTag: t.topicTag,
      skillDomain: 'bar_model',
      estimatedMinutes: 30,
      planetIcon: '🧩',
      accentColor: '#0D9488',
      learningGoals: t.goals,
      questions: buildWeek2Questions(day),
    };
  }),
  // Tuần 3 (Ngày 15..21)
  ...WEEK3_THEMES.map((t, i): InMonthDayPlan => {
    const day = i + 15;
    return {
      id: `dec-day-${day}`,
      dayNumber: day,
      weekNumber: 3,
      weekTitle: 'Tuần 3 · Đổi Gam & Ki-lô-gam',
      title: t.title,
      subtitle: 'Phòng thí nghiệm Khối lượng kg – g, Trừ bì & Cân thăng bằng',
      topicTag: t.topicTag,
      skillDomain: 'remainder',
      estimatedMinutes: 30,
      planetIcon: '⚖️',
      accentColor: '#EA580C',
      learningGoals: t.goals,
      questions: buildWeek3Questions(day),
    };
  }),
  // Tuần 4 (Ngày 22..28)
  ...WEEK4_THEMES.map((t, i): InMonthDayPlan => {
    const day = i + 22;
    return {
      id: `dec-day-${day}`,
      dayNumber: day,
      weekNumber: 4,
      weekTitle: 'Tuần 4 · Đổi Lít & Mi-li-lít',
      title: t.title,
      subtitle: 'Phòng thí nghiệm Thể tích L – mL, San bình & Toán rót nước',
      topicTag: t.topicTag,
      skillDomain: 'measurement',
      estimatedMinutes: 30,
      planetIcon: '🧪',
      accentColor: '#0EA5E9',
      learningGoals: t.goals,
      questions: buildWeek4Questions(day),
    };
  }),
  // Tuần 5 (Ngày 29..30)
  {
    id: 'dec-day-29',
    dayNumber: 29,
    weekNumber: 5,
    weekTitle: 'Tuần 5 · Tổng Ôn Tháng 12',
    title: 'Ngày 29: Tổng ôn Chu vi Hình học & Kỹ thuật Dời cạnh',
    subtitle: 'Tổng duyệt Hình vuông, Hình chữ nhật, Ghép hình, Chữ L & Chữ U',
    topicTag: 'Tổng ôn Chu vi',
    skillDomain: 'bar_model',
    estimatedMinutes: 30,
    planetIcon: '🚀',
    accentColor: '#E11D48',
    learningGoals: [
      'Tổng hợp phản xạ tính chu vi cơ bản, toán ngược và bảo toàn dây uốn',
      'Thành thạo kỹ thuật dời cạnh và xử lý 2 cạnh lõm hình chữ U',
    ],
    questions: buildWeek5ReviewQuestions(29),
  },
  {
    id: 'dec-day-30',
    dayNumber: 30,
    weekNumber: 5,
    weekTitle: 'Tuần 5 · Tổng Ôn Tháng 12',
    title: 'Ngày 30: Tổng duyệt Đo lường Gam–Lít & Đấu trường Olympic Tháng 12',
    subtitle: 'Chốt hạ kiến thức kg–g, L–mL, Thùng đầy–Nửa thùng & San bình',
    topicTag: 'Tổng duyệt Tháng 12',
    skillDomain: 'measurement',
    estimatedMinutes: 30,
    planetIcon: '🏆',
    accentColor: '#E11D48',
    learningGoals: [
      'Làm chủ quy đổi kg–g và L–mL không mắc bẫy đơn vị',
      'Sẵn sàng đạt điểm tối đa ở Bài Kiểm Tra 15 Phút Tuần 5 và Đề Cuối Tháng 12',
    ],
    questions: buildWeek5ReviewQuestions(30),
  },
];

// ============================================================================
// ĐỀ KIỂM TRA ĐÁNH GIÁ CUỐI THÁNG 12 (20 CÂU: 10 CƠ BẢN + 10 OLYMPIC)
// ============================================================================

const DECEMBER_EXAM_QUESTIONS: InMonthExamQuestion[] = [
  // --- PHẦN A: CƠ BẢN (10 CÂU × 5 ĐIỂM = 50 ĐIỂM) ---
  {
    id: 'dec-exam-a1',
    part: 'A',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [1, 7],
    prompt: 'Một sân bay trực thăng hình vuông có cạnh dài 18 m. Tính chu vi của sân bay đó.',
    options: ['72 m', '36 m', '64 m', '76 m'],
    correctAnswer: '72 m',
    explanation: 'Chu vi hình vuông bằng cạnh nhân 4: 18 × 4 = 72 (m).',
    visualModel: buildPerimeterVisual(
      'Chu vi hình vuông cạnh 18 m',
      {
        itemName: 'cạnh hình vuông',
        unitLabel: 'm',
        actionPrompt: 'Gấp độ dài 1 cạnh lên 4 lần',
        interactiveRule: '4 cạnh bằng nhau, mỗi cạnh dài 18 m.',
        groups: [{ id: 'ea1', label: '4 cạnh bằng nhau', icon: '⬜', count: 4, unitValue: 18, totalValue: 72, color: '#38BDF8', isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'measurement' }],
      },
      { kind: 'perimeter_shape', shapeKind: 'square', outerWidth: 18, outerHeight: 18, unitLabel: 'm', unknownTarget: 'perimeter', expectedPerimeter: 72 },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chu vi hình vuông} = 18 \\;?\\; 4 = ?`], fullLatexSteps: [`\\text{Chu vi hình vuông} = 18 \\times 4 = 72\\text{ (m)}`], finalAnswerLatex: `72\\text{ m}`, finalNumericValue: 72 }
    ),
  },
  {
    id: 'dec-exam-a2',
    part: 'A',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [2, 4],
    prompt: 'Một bảng điện tử hình chữ nhật có chiều dài 4 dm và chiều rộng 25 cm. Tính chu vi bảng điện tử đó (đơn vị cm).',
    options: ['130 cm', '58 cm', '65 cm', '120 cm'],
    correctAnswer: '130 cm',
    explanation: 'Đổi 4 dm = 40 cm. Chu vi là: (40 + 25) × 2 = 130 (cm).',
    visualModel: buildPerimeterVisual(
      'Đổi đơn vị trước khi tính chu vi hình chữ nhật',
      {
        itemName: 'kích thước bảng',
        unitLabel: 'cm',
        actionPrompt: 'Đổi 4 dm sang cm trước khi cộng với 25 cm',
        interactiveRule: 'Dài = 4 dm, Rộng = 25 cm.',
        groups: [
          { id: 'ea2l', label: 'Chiều dài (4 dm)', icon: '📏', count: 4, unitValue: 10, totalValue: 40, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '4 dm' },
          { id: 'ea2w', label: 'Chiều rộng', icon: '📐', count: 1, unitValue: 25, totalValue: 25, color: '#F59E0B', displayMode: 'measurement' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'rectangle', outerWidth: 40, outerHeight: 25, widthLabel: '4 dm', unitLabel: 'cm', unknownTarget: 'perimeter', expectedPerimeter: 130, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi } 4\\text{ dm} = 4 \\;?\\; 10 = ?\\text{ (cm)}`, `\\text{Chu vi} = (\\text{Dài} \\;?\\; 25) \\;?\\; 2 = ?`], fullLatexSteps: [`4\\text{ dm} = 40\\text{ cm}`, `\\text{Chu vi} = (40 + 25) \\times 2 = 130\\text{ (cm)}`], finalAnswerLatex: `130\\text{ cm}`, finalNumericValue: 130 }
    ),
  },
  {
    id: 'dec-exam-a3',
    part: 'A',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [3, 7],
    prompt: 'Một tấm thảm hình chữ nhật có chu vi 96 cm và chiều rộng 18 cm. Tính chiều dài của tấm thảm đó.',
    options: ['30 cm', '78 cm', '48 cm', '28 cm'],
    correctAnswer: '30 cm',
    explanation: 'Nửa chu vi là 96 : 2 = 48 (cm). Chiều dài là: 48 - 18 = 30 (cm).',
    visualModel: buildPerimeterVisual(
      'Tìm chiều dài khi biết Chu vi = 96 cm',
      {
        itemName: 'nửa chu vi',
        unitLabel: 'cm',
        actionPrompt: 'Chia đôi chu vi tìm Nửa chu vi rồi trừ chiều rộng',
        interactiveRule: 'Chu vi = 96 cm, Rộng = 18 cm.',
        groups: [
          { id: 'ea3w', label: 'Chiều rộng', icon: '📐', count: 1, unitValue: 18, totalValue: 18, color: '#F59E0B', displayMode: 'measurement' },
          { id: 'ea3l', label: 'Chiều dài cần tìm', icon: '📏', count: 1, unitValue: 30, totalValue: 30, color: '#38BDF8', isUnknown: true, displayMode: 'measurement' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'rectangle', outerWidth: 30, outerHeight: 18, unitLabel: 'cm', unknownTarget: 'length', expectedPerimeter: 96, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Nửa chu vi} = 96 \\;?\\; 2 = ?`, `\\text{Chiều dài} = (\\text{Nửa chu vi}) \\;?\\; 18 = ?`], fullLatexSteps: [`\\text{Nửa chu vi} = 96 \\div 2 = 48\\text{ (cm)}`, `\\text{Chiều dài} = 48 - 18 = 30\\text{ (cm)}`], finalAnswerLatex: `30\\text{ cm}`, finalNumericValue: 30 }
    ),
  },
  {
    id: 'dec-exam-a4',
    part: 'A',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [8, 9],
    prompt: 'Ghép 3 hình vuông bằng nhau cạnh 7 cm thành một hình chữ nhật dài (1 hàng 3 ô). Tính chu vi hình chữ nhật mới ghép được.',
    options: ['56 cm', '84 cm', '28 cm', '42 cm'],
    correctAnswer: '56 cm',
    explanation: 'Chiều dài là 7 × 3 = 21 (cm), chiều rộng 7 cm. Chu vi là: (21 + 7) × 2 = 56 (cm).',
    visualModel: buildPerimeterVisual(
      'Ghép 3 hình vuông cạnh 7 cm',
      {
        itemName: 'đoạn cạnh ngoài',
        unitLabel: 'cm',
        actionPrompt: 'Không cộng 2 cạnh chung ở bên trong',
        interactiveRule: '3 hình vuông cạnh 7 cm xếp 1 hàng ngang.',
        groups: [
          { id: 'ea4h', label: 'Trên + Dưới (6 đoạn)', icon: '🟦', count: 6, unitValue: 7, totalValue: 42, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '6 × 7 cm' },
          { id: 'ea4v', label: 'Trái + Phải (2 đoạn)', icon: '🟩', count: 2, unitValue: 7, totalValue: 14, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: '2 × 7 cm' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'joined_squares', outerWidth: 21, outerHeight: 7, squareSide: 7, gridCols: 3, gridRows: 1, unitLabel: 'cm', unknownTarget: 'perimeter', expectedPerimeter: 56 },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chiều dài} = 7 \\;?\\; 3 = ?`, `\\text{Chu vi} = (\\text{Dài} \\;?\\; 7) \\;?\\; 2 = ?`], fullLatexSteps: [`\\text{Chiều dài} = 7 \\times 3 = 21\\text{ (cm)}`, `\\text{Chu vi} = (21 + 7) \\times 2 = 56\\text{ (cm)}`], finalAnswerLatex: `56\\text{ cm}`, finalNumericValue: 56 }
    ),
  },
  {
    id: 'dec-exam-a5',
    part: 'A',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [10, 11],
    prompt: 'Một mảnh vườn hình chữ L có chiều ngang lớn nhất 22 m và chiều cao lớn nhất 14 m (khuyết một góc hình chữ nhật nhỏ). Tính chu vi mảnh vườn đó.',
    options: ['72 m', '36 m', '68 m', '76 m'],
    correctAnswer: '72 m',
    explanation: 'Dời 2 cạnh ở góc khuyết ra khung ngoài được hình chữ nhật 22 m × 14 m. Chu vi là: (22 + 14) × 2 = 72 (m).',
    visualModel: buildPerimeterVisual(
      'Dời cạnh tính chu vi hình chữ L (22 m × 14 m)',
      {
        itemName: 'khung bao ngoài',
        unitLabel: 'm',
        actionPrompt: 'Bấm Dời cạnh để đưa góc khuyết về khung chữ nhật',
        interactiveRule: 'Chiều ngang ngoài = 22 m, Chiều cao ngoài = 14 m.',
        groups: [
          { id: 'ea5w', label: '2 cạnh ngang', icon: '↔️', count: 2, unitValue: 22, totalValue: 44, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '2 × 22 m' },
          { id: 'ea5h', label: '2 cạnh cao', icon: '↕️', count: 2, unitValue: 14, totalValue: 28, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: '2 × 14 m' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'l_shape', outerWidth: 22, outerHeight: 14, cutWidth: 8, cutHeight: 5, unitLabel: 'm', unknownTarget: 'perimeter', expectedPerimeter: 72, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chu vi hình chữ L} = (22 \\;?\\; 14) \\;?\\; 2 = ?`], fullLatexSteps: [`\\text{Dời cạnh về hình chữ nhật } 22\\text{ m} \\times 14\\text{ m}`, `\\text{Chu vi} = (22 + 14) \\times 2 = 72\\text{ (m)}`], finalAnswerLatex: `72\\text{ m}`, finalNumericValue: 72 }
    ),
  },
  {
    id: 'dec-exam-a6',
    part: 'A',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [15, 16],
    prompt: 'Đổi đơn vị khối lượng: 3 kg 450 g bằng bao nhiêu gam (g)?',
    options: ['3450 g', '750 g', '3045 g', '3405 g'],
    correctAnswer: '3450 g',
    explanation: '3 kg = 3 000 g. Cộng thêm 450 g ta được 3 450 g.',
    visualModel: buildMeasurementVisual(
      'Quy đổi 3 kg 450 g sang gam',
      {
        itemName: 'khối lượng',
        unitLabel: 'g',
        actionPrompt: 'Nhân số kg với 1 000 rồi cộng phần gam lẻ',
        interactiveRule: '1 kg = 1 000 g.',
        groups: [
          { id: 'ea6k', label: '3 kg', icon: '⚖️', count: 3, unitValue: 1000, totalValue: 3000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '3 kg' },
          { id: 'ea6g', label: '450 g', icon: '🪨', count: 1, unitValue: 450, totalValue: 450, color: '#F59E0B', displayMode: 'measurement' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'weight_balance', operation: 'unit_convert', operands: [3, 450], expectedNumericResult: 3450, resultUnit: 'g', primaryReading: '3 kg 450 g', secondaryReading: '= ? g', conversionRule: '1 kg = 1 000 g', visualParams: { mode: 'convert', givenA: 3, givenB: 450, unitA: 'kg', unitB: 'g' } },
      { unknownSymbol: '?', guidedLatexSteps: [`3\\text{ kg} = 3 \\;?\\; 1000 = ?\\text{ (g)}`, `\\text{Tổng} = (\\text{g từ kg}) \\;?\\; 450 = ?`], fullLatexSteps: [`3\\text{ kg} = 3000\\text{ g}`, `3000 + 450 = 3450\\text{ (g)}`], finalAnswerLatex: `3450\\text{ g}`, finalNumericValue: 3450 }
    ),
  },
  {
    id: 'dec-exam-a7',
    part: 'A',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [17, 20],
    prompt: 'Một hộp mứt cả vỏ nặng 2 kg 150 g. Biết riêng vỏ hộp nặng 350 g. Hỏi số mứt bên trong hộp cân nặng bao nhiêu gam?',
    options: ['1800 g', '2500 g', '1750 g', '1850 g'],
    correctAnswer: '1800 g',
    explanation: 'Đổi 2 kg 150 g = 2 150 g. Số mứt bên trong nặng: 2 150 - 350 = 1 800 (g).',
    visualModel: buildMeasurementVisual(
      'Trừ bì: Cả hộp 2 kg 150 g − Vỏ 350 g',
      {
        itemName: 'mứt & vỏ hộp',
        unitLabel: 'g',
        actionPrompt: 'Đổi cả hộp sang gam rồi trừ đi khối lượng vỏ',
        interactiveRule: 'Ruột = Cả hộp − Vỏ hộp.',
        groups: [
          { id: 'ea7a', label: 'Cả hộp (2 kg 150 g)', icon: '🎁', count: 1, unitValue: 2150, totalValue: 2150, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '2 kg 150 g' },
          { id: 'ea7b', label: 'Vỏ hộp', icon: '📦', count: 1, unitValue: 350, totalValue: 350, color: '#F59E0B', displayMode: 'measurement' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'weight_balance', operation: 'tare_weight', operands: [2150, 350], expectedNumericResult: 1800, resultUnit: 'g', primaryReading: 'Cả hộp: 2 kg 150 g', secondaryReading: 'Vỏ hộp: 350 g', conversionRule: 'Ruột = Cả hộp − Vỏ', visualParams: { mode: 'subtract', givenA: 2150, givenB: 350, unitA: 'g', labelA: 'Cả hộp: 2 kg 150 g', labelB: 'Vỏ hộp: 350 g' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi cả hộp} = 2 \\;?\\; 1000 \\;?\\; 150 = ?`, `\\text{Khối lượng mứt} = (\\text{Cả hộp}) \\;?\\; 350 = ?`], fullLatexSteps: [`2\\text{ kg } 150\\text{ g} = 2150\\text{ g}`, `2150 - 350 = 1800\\text{ (g)}`], finalAnswerLatex: `1800\\text{ g}`, finalNumericValue: 1800 }
    ),
  },
  {
    id: 'dec-exam-a8',
    part: 'A',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [22, 23],
    prompt: 'Trong bình đang có 350 mL nước. Cần rót thêm bao nhiêu mi-li-lít nước nữa để có đúng 1 L nước?',
    options: ['650 mL', '750 mL', '550 mL', '1350 mL'],
    correctAnswer: '650 mL',
    explanation: 'Đổi 1 L = 1 000 mL. Cần rót thêm: 1 000 - 350 = 650 (mL).',
    visualModel: buildMeasurementVisual(
      'Rót thêm cho đầy vạch 1 L (hiện có 350 mL)',
      {
        itemName: 'nước',
        unitLabel: 'mL',
        actionPrompt: 'Đổi 1 L = 1 000 mL rồi tìm phần còn thiếu',
        interactiveRule: '1 L = 1 000 mL.',
        groups: [
          { id: 'ea8a', label: 'Hiện có', icon: '💧', count: 1, unitValue: 350, totalValue: 350, color: '#38BDF8', displayMode: 'measurement' },
          { id: 'ea8b', label: 'Cần rót thêm', icon: '➕', count: 1, unitValue: 650, totalValue: 650, color: '#34D399', isUnknown: true, displayMode: 'measurement' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'volume_beaker', operation: 'unit_subtract', operands: [1000, 350], expectedNumericResult: 650, resultUnit: 'mL', primaryReading: 'Mục tiêu: 1 L', secondaryReading: 'Hiện có: 350 mL', conversionRule: '1 L = 1 000 mL', visualParams: { mode: 'subtract', givenA: 1000, givenB: 350, unitA: 'mL', labelA: '1 L', labelB: 'Hiện có' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi } 1\\text{ L} = 1000\\text{ mL}`, `\\text{Cần rót thêm} = 1000 \\;?\\; 350 = ?`], fullLatexSteps: [`1\\text{ L} = 1000\\text{ mL}`, `1000 - 350 = 650\\text{ (mL)}`], finalAnswerLatex: `650\\text{ mL}`, finalNumericValue: 650 }
    ),
  },
  {
    id: 'dec-exam-a9',
    part: 'A',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [24, 28],
    prompt: 'Một can chứa 3 L nước ép táo được chia đều vào các chai loại 250 mL. Hỏi chia được tất cả bao nhiêu chai?',
    options: ['12 chai', '10 chai', '15 chai', '8 chai'],
    correctAnswer: '12 chai',
    explanation: 'Đổi 3 L = 3 000 mL. Số chai là: 3 000 : 250 = 12 (chai).',
    visualModel: buildMeasurementVisual(
      'Chia đều 3 L nước ép vào các chai 250 mL',
      {
        itemName: 'chai nước ép',
        unitLabel: 'mL',
        actionPrompt: 'Đổi 3 L sang mL rồi chia cho 250 mL mỗi chai',
        interactiveRule: '1 L = 1 000 mL.',
        groups: [
          { id: 'ea9a', label: 'Can nước ép (3 L)', icon: '🍎', count: 3, unitValue: 1000, totalValue: 3000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '3 L' },
          { id: 'ea9b', label: 'Các chai 250 mL', icon: '🍼', count: 12, unitValue: 250, totalValue: 3000, color: '#34D399', isUnknown: true, hideCountBeforeSolve: true, showUnitValueBeforeSolve: true, displayMode: 'groups' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'volume_beaker', operation: 'unit_divide', operands: [3000, 250], expectedNumericResult: 12, resultUnit: 'chai', primaryReading: 'Can: 3 L', secondaryReading: 'Mỗi chai: 250 mL', conversionRule: 'Đổi L ➔ mL rồi chia 250', visualParams: { mode: 'divide_equal', givenA: 3000, givenB: 250, unitA: 'mL' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi } 3\\text{ L} = 3 \\;?\\; 1000 = ?\\text{ (mL)}`, `\\text{Số chai} = (\\text{Tổng mL}) \\;?\\; 250 = ?`], fullLatexSteps: [`3\\text{ L} = 3000\\text{ mL}`, `3000 \\div 250 = 12\\text{ (chai)}`], finalAnswerLatex: `12\\text{ chai}`, finalNumericValue: 12 }
    ),
  },
  {
    id: 'dec-exam-a10',
    part: 'A',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [19, 21],
    prompt: 'Trên cân thăng bằng, 1 quả bí đỏ cân nặng 1 kg 200 g nặng bằng đúng 6 quả lê bằng nhau. Hỏi mỗi quả lê cân nặng bao nhiêu gam?',
    options: ['200 g', '250 g', '150 g', '300 g'],
    correctAnswer: '200 g',
    explanation: 'Đổi 1 kg 200 g = 1 200 g. Mỗi quả lê nặng: 1 200 : 6 = 200 (g).',
    visualModel: buildMeasurementVisual(
      'Cân thăng bằng: 1 quả bí (1 kg 200 g) = 6 quả lê',
      {
        itemName: 'quả lê',
        unitLabel: 'g',
        actionPrompt: 'Đổi 1 kg 200 g sang gam rồi chia đều cho 6 quả lê',
        interactiveRule: 'Đĩa trái = Đĩa phải.',
        groups: [
          { id: 'ea10a', label: '1 quả bí (1 kg 200 g)', icon: '🎃', count: 1, unitValue: 1200, totalValue: 1200, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: '1 kg 200 g' },
          { id: 'ea10b', label: '6 quả lê bằng nhau', icon: '🍐', count: 6, unitValue: 200, totalValue: 1200, color: '#34D399', isUnknown: true, displayMode: 'groups' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'weight_balance', operation: 'balance_eq', operands: [1200, 6], expectedNumericResult: 200, resultUnit: 'g', primaryReading: 'Đĩa trái: 1 kg 200 g', secondaryReading: 'Đĩa phải: 6 quả lê', conversionRule: 'Đổi sang gam rồi chia 6', visualParams: { mode: 'balance_eq', givenA: 1200, givenCount: 6, unitA: 'g', labelA: '1 quả bí (1 kg 200 g)', labelB: '6 quả lê' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi } 1\\text{ kg } 200\\text{ g} = 1000 \\;?\\; 200 = ?`, `\\text{1 quả lê} = (\\text{Tổng gam}) \\;?\\; 6 = ?`], fullLatexSteps: [`1\\text{ kg } 200\\text{ g} = 1200\\text{ g}`, `1200 \\div 6 = 200\\text{ (g)}`], finalAnswerLatex: `200\\text{ g}`, finalNumericValue: 200 }
    ),
  },

  // --- PHẦN B: TƯ DUY OLYMPIC (10 CÂU × 5 ĐIỂM = 50 ĐIỂM) ---
  {
    id: 'dec-exam-b1',
    part: 'B',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [6, 7],
    prompt: 'Một sợi dây đồng được uốn thành hình vuông cạnh 15 cm. Nếu duỗi sợi dây đó ra và uốn lại thành hình chữ nhật có chiều rộng 11 cm thì chiều dài hình chữ nhật là bao nhiêu xăng-ti-mét?',
    options: ['19 cm', '49 cm', '30 cm', '21 cm'],
    correctAnswer: '19 cm',
    explanation: 'Độ dài sợi dây là 15 × 4 = 60 (cm). Nửa chu vi là 60 : 2 = 30 (cm). Chiều dài là: 30 - 11 = 19 (cm).',
    visualModel: buildPerimeterVisual(
      'Bảo toàn độ dài dây: Vuông cạnh 15 cm ➔ Chữ nhật rộng 11 cm',
      {
        itemName: 'sợi dây',
        unitLabel: 'cm',
        actionPrompt: 'Chu vi hình chữ nhật mới bằng đúng chu vi hình vuông ban đầu',
        interactiveRule: 'Chu vi hình chữ nhật = Chu vi hình vuông cạnh 15 cm, chiều rộng mới = 11 cm.',
        groups: [
          { id: 'eb1a', label: 'Hình vuông (4 × 15 cm)', icon: '➰', count: 4, unitValue: 15, totalValue: 60, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '4 × 15 cm' },
          { id: 'eb1w', label: 'Chiều rộng mới', icon: '📐', count: 1, unitValue: 11, totalValue: 11, color: '#F59E0B', displayMode: 'measurement' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'rectangle', outerWidth: 19, outerHeight: 11, unitLabel: 'cm', unknownTarget: 'length', expectedPerimeter: 60, hidePerimeterBeforeSolve: true, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chu vi sợi dây} = 15 \\;?\\; 4 = ?`, `\\text{Nửa chu vi} = (\\text{Chu vi}) \\;?\\; 2 = ?`, `\\text{Chiều dài} = (\\text{Nửa chu vi}) \\;?\\; 11 = ?`], fullLatexSteps: [`\\text{Chu vi} = 15 \\times 4 = 60\\text{ (cm)}`, `\\text{Nửa chu vi} = 60 \\div 2 = 30\\text{ (cm)}`, `\\text{Chiều dài} = 30 - 11 = 19\\text{ (cm)}`], finalAnswerLatex: `19\\text{ cm}`, finalNumericValue: 19 }
    ),
  },
  {
    id: 'dec-exam-b2',
    part: 'B',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [5, 7],
    prompt: 'Một khu vườn hình chữ nhật có chu vi 96 m, biết chiều dài gấp 3 lần chiều rộng. Tính chiều rộng của khu vườn đó.',
    options: ['12 m', '24 m', '36 m', '16 m'],
    correctAnswer: '12 m',
    explanation: 'Nửa chu vi là 96 : 2 = 48 (m). Tổng số phần là 3 + 1 = 4 (phần). Chiều rộng là: 48 : 4 = 12 (m).',
    visualModel: buildBarVisual(
      'Nửa chu vi = Chiều rộng (1 phần) + Chiều dài (3 phần)',
      {
        itemName: 'phần cạnh',
        unitLabel: 'm',
        actionPrompt: 'Tìm nửa chu vi trước rồi chia theo tổng số phần bằng nhau',
        interactiveRule: 'Chu vi = 96 m, Dài gấp 3 lần Rộng.',
        groups: [
          { id: 'eb2w', label: 'Chiều rộng (1 phần)', icon: '📐', count: 1, unitValue: 12, totalValue: 12, color: '#34D399', isUnknown: true },
          { id: 'eb2l', label: 'Chiều dài (3 phần)', icon: '📏', count: 3, unitValue: 12, totalValue: 36, color: '#38BDF8', isUnknown: true },
        ],
      },
      {
        kind: 'bar_model',
        family: 'part_whole',
        unitReferenceValue: 12,
        unitName: 'm',
        bars: [
          makeBarSpec({ id: 'bw', label: 'Chiều rộng', units: 1, unitValue: 12, displayValue: '? m', isUnknown: true, color: '#34D399' }),
          makeBarSpec({ id: 'bl', label: 'Chiều dài', units: 3, unitValue: 12, displayValue: '? m (3 phần)', isUnknown: true, color: '#38BDF8' }),
        ],
        totalBracket: { targetBarIds: ['bw', 'bl'], numericValue: 48, displayLabel: 'Nửa chu vi = ?', isUnknown: true },
      },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Nửa chu vi} = 96 \\;?\\; 2 = ?`, `\\text{Tổng số phần} = 3 \\;?\\; 1 = ?`, `\\text{Chiều rộng} = (\\text{Nửa chu vi}) \\;?\\; (\\text{Tổng phần}) = ?`], fullLatexSteps: [`\\text{Nửa chu vi} = 96 \\div 2 = 48\\text{ (m)}`, `\\text{Tổng số phần} = 3 + 1 = 4\\text{ (phần)}`, `\\text{Chiều rộng} = 48 \\div 4 = 12\\text{ (m)}`], finalAnswerLatex: `12\\text{ m}`, finalNumericValue: 12 }
    ),
  },
  {
    id: 'dec-exam-b3',
    part: 'B',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [12, 14],
    prompt: 'Một tấm bảng hình chữ U có chiều ngang bao ngoài 24 cm, chiều cao bao ngoài 15 cm và có một rãnh lõm sâu 6 cm ở giữa cạnh trên. Tính chu vi của tấm bảng hình chữ U đó.',
    options: ['90 cm', '78 cm', '84 cm', '96 cm'],
    correctAnswer: '90 cm',
    explanation: 'Chu vi khung chữ nhật bao ngoài là: (24 + 15) × 2 = 78 (cm). Cộng thêm 2 cạnh lõm sâu 6 cm: 78 + 6 × 2 = 90 (cm).',
    visualModel: buildPerimeterVisual(
      'Hình chữ U: Khung 24 cm × 15 cm + 2 cạnh lõm sâu 6 cm',
      {
        itemName: 'đường viền chữ U',
        unitLabel: 'cm',
        actionPrompt: 'Bấm "Dời cạnh & Soi 2 cạnh lõm" để không quên cộng 2 × 6 cm!',
        interactiveRule: 'Khung ngoài 24 × 15 cm, rãnh lõm sâu 6 cm.',
        groups: [
          { id: 'eb3a', label: 'Khung ngoài (24×15)', icon: '⬜', count: 2, unitValue: 39, totalValue: 78, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: 'Khung 24×15 cm' },
          { id: 'eb3b', label: '2 cạnh lõm màu vàng cam', icon: '⚡', count: 2, unitValue: 6, totalValue: 12, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: '2 × 6 cm' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'u_shape', outerWidth: 24, outerHeight: 15, recessDepth: 6, recessWidth: 8, unitLabel: 'cm', unknownTarget: 'perimeter', expectedPerimeter: 90, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chu vi khung ngoài} = (24 \\;?\\; 15) \\;?\\; 2 = ?`, `\\text{Chu vi chữ U} = (\\text{Khung ngoài}) \\;?\\; (6 \\;?\\; 2) = ?`], fullLatexSteps: [`\\text{Chu vi khung ngoài} = (24 + 15) \\times 2 = 78\\text{ (cm)}`, `\\text{Chu vi hình chữ U} = 78 + 6 \\times 2 = 90\\text{ (cm)}`], finalAnswerLatex: `90\\text{ cm}`, finalNumericValue: 90 }
    ),
  },
  {
    id: 'dec-exam-b4',
    part: 'B',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [13, 14],
    prompt: 'Một sân khấu hình chữ U có khung bao ngoài ngang 30 m, cao 16 m và tổng chu vi đo được là 106 m. Hỏi phần rãnh lõm ở giữa sâu bao nhiêu mét?',
    options: ['7 m', '14 m', '6 m', '8 m'],
    correctAnswer: '7 m',
    explanation: 'Chu vi khung ngoài là (30 + 16) × 2 = 92 (m). Tổng 2 cạnh lõm là 106 - 92 = 14 (m). Độ sâu rãnh lõm là: 14 : 2 = 7 (m).',
    visualModel: buildPerimeterVisual(
      'Tìm độ sâu rãnh lõm chữ U (Tổng chu vi = 106 m)',
      {
        itemName: 'cạnh lõm',
        unitLabel: 'm',
        actionPrompt: 'Lấy tổng chu vi trừ khung ngoài sẽ ra TỔNG 2 CẠNH LÕM, nhớ chia đôi!',
        interactiveRule: 'Tổng chu vi = 106 m, Khung ngoài = 30 m × 16 m.',
        groups: [
          { id: 'eb4a', label: 'Khung ngoài (30×16)', icon: '⬜', count: 2, unitValue: 46, totalValue: 92, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: 'Khung 30×16 m' },
          { id: 'eb4b', label: '2 cạnh lõm bằng nhau', icon: '⚡', count: 2, unitValue: 7, totalValue: 14, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'u_shape', outerWidth: 30, outerHeight: 16, recessDepth: 7, recessWidth: 10, unitLabel: 'm', unknownTarget: 'recess_depth', expectedPerimeter: 106, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chu vi khung ngoài} = (30 \\;?\\; 16) \\;?\\; 2 = ?`, `\\text{Tổng 2 cạnh lõm} = 106 \\;?\\; (\\text{Khung ngoài}) = ?`, `\\text{Độ sâu 1 cạnh lõm} = (\\text{Tổng 2 cạnh}) \\;?\\; 2 = ?`], fullLatexSteps: [`\\text{Chu vi khung ngoài} = (30 + 16) \\times 2 = 92\\text{ (m)}`, `\\text{Tổng 2 cạnh lõm} = 106 - 92 = 14\\text{ (m)}`, `\\text{Độ sâu rãnh lõm} = 14 \\div 2 = 7\\text{ (m)}`], finalAnswerLatex: `7\\text{ m}`, finalNumericValue: 7 }
    ),
  },
  {
    id: 'dec-exam-b5',
    part: 'B',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [9, 14],
    prompt: 'Ghép 6 hình vuông nhỏ giống hệt nhau thành 1 hình chữ nhật gồm 2 hàng, mỗi hàng 3 ô. Biết chu vi hình chữ nhật lớn là 80 cm. Hỏi cạnh mỗi hình vuông nhỏ dài bao nhiêu xăng-ti-mét?',
    options: ['8 cm', '10 cm', '6 cm', '12 cm'],
    correctAnswer: '8 cm',
    explanation: 'Viền ngoài hình chữ nhật 2×3 gồm (3 + 2) × 2 = 10 đoạn cạnh ô vuông. Cạnh 1 ô vuông là: 80 : 10 = 8 (cm).',
    visualModel: buildPerimeterVisual(
      'Lưới 2×3 ô vuông có tổng chu vi 80 cm',
      {
        itemName: 'đoạn cạnh viền ngoài',
        unitLabel: 'cm',
        actionPrompt: 'Đếm tổng số đoạn cạnh ô vuông nằm trên viền ngoài của lưới 2×3',
        interactiveRule: 'Đếm số đoạn cạnh ô vuông chạy dọc viền ngoài của lưới 2×3.',
        groups: [
          { id: 'eb5', label: 'Các đoạn viền ngoài = 80 cm', icon: '🧩', count: 10, unitValue: 8, totalValue: 80, color: '#34D399', isUnknown: true, hideCountBeforeSolve: true, displayMode: 'measurement' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'joined_squares', outerWidth: 24, outerHeight: 16, squareSide: 8, gridCols: 3, gridRows: 2, unitLabel: 'cm', unknownTarget: 'side', expectedPerimeter: 80 },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Số đoạn cạnh ở viền ngoài} = (3 \\;?\\; 2) \\;?\\; 2 = ?`, `\\text{Cạnh 1 ô vuông} = 80 \\;?\\; (\\text{Số đoạn}) = ?`], fullLatexSteps: [`\\text{Số đoạn cạnh ngoài} = (3 + 2) \\times 2 = 10\\text{ (đoạn)}`, `\\text{Cạnh 1 ô vuông} = 80 \\div 10 = 8\\text{ (cm)}`], finalAnswerLatex: `8\\text{ cm}`, finalNumericValue: 8 }
    ),
  },
  {
    id: 'dec-exam-b6',
    part: 'B',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [6, 7],
    prompt: 'Người ta rào xung quanh mảnh đất hình chữ nhật dài 26 m, rộng 14 m và chừa ra hai lối cổng, mỗi cổng rộng 2 m (không rào). Hỏi tổng độ dài hàng rào cần xây là bao nhiêu mét?',
    options: ['76 m', '80 m', '78 m', '72 m'],
    correctAnswer: '76 m',
    explanation: 'Chu vi mảnh đất là (26 + 14) × 2 = 80 (m). Hai lối cổng rộng 2 × 2 = 4 (m). Hàng rào dài: 80 - 4 = 76 (m).',
    visualModel: buildPerimeterVisual(
      'Rào mảnh đất 26 m × 14 m (chừa 2 cổng mỗi cổng 2 m)',
      {
        itemName: 'hàng rào',
        unitLabel: 'm',
        actionPrompt: 'Tính chu vi cả 4 mặt đất rồi trừ đi tổng độ rộng của 2 cổng',
        interactiveRule: 'Dài = 26 m, Rộng = 14 m, 2 cổng × 2 m.',
        groups: [
          { id: 'eb6p', label: 'Chu vi mảnh đất', icon: '🌿', count: 2, unitValue: 40, totalValue: 80, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: 'Khung 26×14 m' },
          { id: 'eb6g', label: '2 lối cổng', icon: '🚪', count: 2, unitValue: 2, totalValue: 4, color: '#F59E0B', displayMode: 'measurement', beforeSolveBadge: '2 × 2 m' },
        ],
      },
      { kind: 'perimeter_shape', shapeKind: 'rectangle', outerWidth: 26, outerHeight: 14, unitLabel: 'm', unknownTarget: 'fence_with_gate', gateWidth: 4, gateLabel: '2 lối cổng (mỗi cổng 2 m) — không rào', expectedPerimeter: 80, showInteractiveShift: true },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Chu vi mảnh đất} = (26 \\;?\\; 14) \\;?\\; 2 = ?`, `\\text{Tổng độ rộng 2 cổng} = 2 \\;?\\; 2 = ?`, `\\text{Độ dài hàng rào} = (\\text{Chu vi}) \\;?\\; (\\text{2 cổng}) = ?`], fullLatexSteps: [`\\text{Chu vi} = (26 + 14) \\times 2 = 80\\text{ (m)}`, `\\text{Tổng 2 cổng} = 2 \\times 2 = 4\\text{ (m)}`, `\\text{Hàng rào} = 80 - 4 = 76\\text{ (m)}`], finalAnswerLatex: `76\\text{ m}`, finalNumericValue: 76 }
    ),
  },
  {
    id: 'dec-exam-b7',
    part: 'B',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [18, 21],
    prompt: 'Một thùng đựng đầy nho cân nặng 2 450 g. Khi bán đi đúng một nửa số nho thì thùng còn lại cân nặng 1 400 g. Hỏi riêng chiếc thùng rỗng cân nặng bao nhiêu gam?',
    options: ['350 g', '1050 g', '400 g', '700 g'],
    correctAnswer: '350 g',
    explanation: 'Một nửa số nho nặng: 2 450 - 1 400 = 1 050 (g). Chiếc thùng rỗng nặng: 1 400 - 1 050 = 350 (g).',
    visualModel: buildMeasurementVisual(
      'Thùng đầy nho (2 450 g) & Thùng nửa nho (1 400 g)',
      {
        itemName: 'nho & vỏ thùng',
        unitLabel: 'g',
        actionPrompt: 'Hiệu hai lần cân cho biết cân nặng 1 nửa số nho',
        interactiveRule: 'Thùng đầy = 2 450 g, Thùng nửa = 1 400 g.',
        groups: [
          { id: 'eb7a', label: 'Thùng đầy', icon: '🍇', count: 1, unitValue: 2450, totalValue: 2450, color: '#38BDF8', displayMode: 'measurement' },
          { id: 'eb7b', label: 'Thùng nửa', icon: '🧺', count: 1, unitValue: 1400, totalValue: 1400, color: '#34D399', displayMode: 'measurement' },
          { id: 'eb7c', label: 'Vỏ thùng rỗng', icon: '📦', count: 1, unitValue: 350, totalValue: 350, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'weight_balance', operation: 'tare_weight', operands: [2450, 1400], expectedNumericResult: 350, resultUnit: 'g', primaryReading: 'Thùng đầy: 2 450 g', secondaryReading: 'Thùng nửa: 1 400 g', conversionRule: 'Hiệu hai lần cân = 1 nửa số nho', visualParams: { mode: 'tare_half', givenA: 2450, givenB: 1400, unitA: 'g' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Một nửa số nho} = 2450 \\;?\\; 1400 = ?`, `\\text{Vỏ thùng rỗng} = 1400 \\;?\\; (\\text{Nửa số nho}) = ?`], fullLatexSteps: [`\\text{Một nửa số nho} = 2450 - 1400 = 1050\\text{ (g)}`, `\\text{Vỏ thùng rỗng} = 1400 - 1050 = 350\\text{ (g)}`], finalAnswerLatex: `350\\text{ g}`, finalNumericValue: 350 }
    ),
  },
  {
    id: 'dec-exam-b8',
    part: 'B',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [19, 21],
    prompt: 'Trên cân thăng bằng: 1 quả dưa lưới và 1 quả cân 250 g nặng bằng đúng 2 kg. Hỏi 2 quả dưa lưới như thế cân nặng tất cả bao nhiêu gam?',
    options: ['3500 g', '1750 g', '3750 g', '4000 g'],
    correctAnswer: '3500 g',
    explanation: 'Đổi 2 kg = 2 000 g. 1 quả dưa lưới nặng: 2 000 - 250 = 1 750 (g). 2 quả dưa lưới nặng: 1 750 × 2 = 3 500 (g).',
    visualModel: buildMeasurementVisual(
      'Cân thăng bằng 2 bước: 1 dưa + 250 g = 2 kg ➔ tìm 2 quả dưa',
      {
        itemName: 'quả dưa lưới',
        unitLabel: 'g',
        actionPrompt: 'Tìm cân nặng 1 quả dưa trước, rồi nhân đôi để tìm 2 quả dưa',
        interactiveRule: '1 quả dưa + 250 g = 2 kg.',
        groups: [
          { id: 'eb8a', label: 'Đĩa phải (2 kg)', icon: '⚖️', count: 2, unitValue: 1000, totalValue: 2000, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '2 kg' },
          { id: 'eb8b', label: 'Quả cân đĩa trái', icon: '🏋️', count: 1, unitValue: 250, totalValue: 250, color: '#F59E0B', displayMode: 'measurement' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'weight_balance', operation: 'balance_eq', operands: [2000, 250], expectedNumericResult: 3500, resultUnit: 'g', primaryReading: 'Đĩa trái: 1 quả dưa + 250 g', secondaryReading: 'Đĩa phải: 2 kg', conversionRule: 'Bước 1: Tìm 1 quả dưa trên cân thăng bằng · Bước 2: Nhân 2', visualParams: { mode: 'balance_eq', givenA: 2000, givenB: 250, unitA: 'g', labelA: '1 quả dưa + 250 g', labelB: '2 kg' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi } 2\\text{ kg} = 2 \\;?\\; 1000 = ?\\text{ (g)}`, `\\text{1 quả dưa lưới} = (\\text{Đĩa phải}) \\;?\\; 250 = ?`, `\\text{2 quả dưa lưới} = (\\text{1 quả dưa}) \\;?\\; 2 = ?`], fullLatexSteps: [`2\\text{ kg} = 2000\\text{ g}`, `\\text{1 quả dưa lưới} = 2000 - 250 = 1750\\text{ (g)}`, `\\text{2 quả dưa lưới} = 1750 \\times 2 = 3500\\text{ (g)}`], finalAnswerLatex: `3500\\text{ g}`, finalNumericValue: 3500 }
    ),
  },
  {
    id: 'dec-exam-b9',
    part: 'B',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [25, 28],
    prompt: 'Bình A có 2 L 600 mL nước, bình B có 1 L 400 mL nước. Hỏi phải rót bao nhiêu mi-li-lít nước từ bình A sang bình B để lượng nước hai bình bằng nhau?',
    options: ['600 mL', '1200 mL', '500 mL', '700 mL'],
    correctAnswer: '600 mL',
    explanation: 'Đổi: Bình A = 2 600 mL, Bình B = 1 400 mL. Phần hơn là 2 600 - 1 400 = 1 200 (mL). Cần rót sang: 1 200 : 2 = 600 (mL).',
    visualModel: buildMeasurementVisual(
      'San bình: Bình A (2 L 600 mL) ➔ Bình B (1 L 400 mL)',
      {
        itemName: 'nước cần rót',
        unitLabel: 'mL',
        actionPrompt: 'Đổi cả hai bình sang mL, tìm hiệu rồi CHIA ĐÔI',
        interactiveRule: 'Bình A = 2 L 600 mL, Bình B = 1 L 400 mL.',
        groups: [
          { id: 'eb9a', label: 'Bình A (2 L 600 mL)', icon: '🧪', count: 1, unitValue: 2600, totalValue: 2600, color: '#38BDF8', displayMode: 'measurement', beforeSolveBadge: '2 L 600 mL' },
          { id: 'eb9b', label: 'Bình B (1 L 400 mL)', icon: '🧪', count: 1, unitValue: 1400, totalValue: 1400, color: '#34D399', displayMode: 'measurement', beforeSolveBadge: '1 L 400 mL' },
          { id: 'eb9c', label: 'Lượng rót sang', icon: '💧', count: 1, unitValue: 600, totalValue: 600, color: '#F59E0B', isUnknown: true, displayMode: 'measurement' },
        ],
      },
      { kind: 'measurement_lab', subtype: 'volume_beaker', operation: 'equalize_transfer', operands: [2600, 1400], expectedNumericResult: 600, resultUnit: 'mL', primaryReading: 'Bình A: 2 L 600 mL', secondaryReading: 'Bình B: 1 L 400 mL', conversionRule: 'Lượng rót = Phần hơn ÷ 2', visualParams: { mode: 'equalize_pour', givenA: 2600, givenB: 1400, unitA: 'mL', labelA: 'Bình A', labelB: 'Bình B' } },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi Bình A} = 2 \\;?\\; 1000 \\;?\\; 600 = ?`, `\\text{Phần hơn} = (\\text{Bình A}) \\;?\\; (\\text{Bình B}) = ?`, `\\text{Lượng cần rót} = (\\text{Phần hơn}) \\;?\\; 2 = ?`], fullLatexSteps: [`\\text{Bình A} = 2600\\text{ mL}, \\quad \\text{Bình B} = 1400\\text{ mL}`, `\\text{Hiệu hai bình} = 2600 - 1400 = 1200\\text{ (mL)}`, `\\text{Lượng cần rót} = 1200 \\div 2 = 600\\text{ (mL)}`], finalAnswerLatex: `600\\text{ mL}`, finalNumericValue: 600 }
    ),
  },
  {
    id: 'dec-exam-b10',
    part: 'B',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [26, 27],
    prompt: 'Bình X chứa nhiều hơn bình Y đúng 1 L 200 mL nước. Biết lượng nước ở bình X gấp 3 lần bình Y. Hỏi bình Y chứa bao nhiêu mi-li-lít nước?',
    options: ['600 mL', '400 mL', '1800 mL', '800 mL'],
    correctAnswer: '600 mL',
    explanation: 'Đổi 1 L 200 mL = 1 200 mL. Hiệu số phần là 3 - 1 = 2 (phần). Bình Y (1 phần) chứa: 1 200 : 2 = 600 (mL).',
    visualModel: buildBarVisual(
      'Sơ đồ So sánh thể tích: Bình X (3 phần) hơn Bình Y (1 phần) là 1 L 200 mL',
      {
        itemName: 'phần nước',
        unitLabel: 'mL',
        actionPrompt: 'Đổi phần hơn sang mL rồi chia cho hiệu số phần (3 − 1)',
        interactiveRule: 'Bình X = 3 phần, Bình Y = 1 phần, hiệu = 1 L 200 mL.',
        groups: [
          { id: 'eb10y', label: 'Bình Y (1 phần)', icon: '🧪', count: 1, unitValue: 600, totalValue: 600, color: '#34D399', isUnknown: true },
          { id: 'eb10x', label: 'Bình X (3 phần)', icon: '🧪', count: 3, unitValue: 600, totalValue: 1800, color: '#38BDF8', isUnknown: true },
        ],
      },
      {
        kind: 'bar_model',
        family: 'comparison',
        unitReferenceValue: 600,
        unitName: 'mL',
        bars: [
          makeBarSpec({ id: 'by', label: 'Bình Y', units: 1, unitValue: 600, displayValue: '? mL (1 phần)', isUnknown: true, color: '#34D399' }),
          makeBarSpec({ id: 'bx', label: 'Bình X', units: 3, unitValue: 600, displayValue: '? mL (3 phần)', isUnknown: true, color: '#38BDF8' }),
        ],
        differenceBracket: { longerBarId: 'bx', shorterBarId: 'by', diffUnits: 2, numericValue: 1200, displayLabel: 'Hơn 1 L 200 mL (2 phần)' },
      },
      { unknownSymbol: '?', guidedLatexSteps: [`\\text{Đổi } 1\\text{ L } 200\\text{ mL} = 1000 \\;?\\; 200 = ?\\text{ (mL)}`, `\\text{Hiệu số phần} = 3 \\;?\\; 1 = ?`, `\\text{Bình Y (1 phần)} = (\\text{Hiệu mL}) \\;?\\; (\\text{Hiệu số phần}) = ?`], fullLatexSteps: [`\\text{Đổi } 1\\text{ L } 200\\text{ mL} = 1200\\text{ mL}`, `\\text{Hiệu số phần} = 3 - 1 = 2\\text{ (phần)}`, `\\text{Bình Y} = 1200 \\div 2 = 600\\text{ (mL)}`], finalAnswerLatex: `600\\text{ mL}`, finalNumericValue: 600 }
    ),
  },
];

export const DECEMBER_FINAL_EXAM: InMonthFinalExam = {
  id: 'inmonth-g3-m12-exam',
  monthLabel: 'Tháng 12',
  title: 'Kiểm Tra Đánh Giá Năng Lực Tháng 12 — Lớp 3',
  subtitle: 'Phần A: Cơ Bản (50đ) & Phần B: Tư Duy Olympic (50đ)',
  durationMinutes: 35,
  passingScore: 70,
  excellenceScore: 90,
  questions: DECEMBER_EXAM_QUESTIONS,
};
