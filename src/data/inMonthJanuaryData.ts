import type {
  SingaporeCPASpec,
  CPAConcreteGroup,
  PlaceValuePictorialSpec,
  SequencePatternPictorialSpec,
  AreaGridPictorialSpec,
  BarModelPictorialSpec,
} from '../types/singaporeCPA';
import { makeBarSpec as makeBarSpecObj } from '../utils/singaporeCPABuilder';
import type { BarModelBarSpec } from '../types/singaporeCPA';

function makeBarSpec(
  id: string,
  label: string,
  units: number,
  unitValue: number,
  offsetValue: number,
  color: string,
  displayValue: string,
  extra?: {
    isUnknown?: boolean;
    hideOffsetBeforeSolve?: boolean;
    highlightNote?: string;
    deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
  }
): BarModelBarSpec {
  return makeBarSpecObj({
    id,
    label,
    units,
    unitValue,
    offsetValue,
    color,
    displayValue,
    ...extra,
  });
}
import type {
  InMonthDayPlan,
  InMonthQuestion,
  InMonthFinalExam,
  InMonthExamQuestion,
  InMonthSkillDomain,
  InMonthVisualModelConfig,
} from './inMonthNovemberData';

// ============================================================================
// CHƯƠNG TRÌNH IN MONTH THÁNG 1 (LỚP 3 · HỌC KỲ 2)
// CHUẨN TOÁN TƯ DUY SINGAPORE CPA (CONCRETE - PICTORIAL - ABSTRACT)
// 30 NGÀY × 11 CÂU = 330 CÂU HỎI + ĐỀ THI CUỐI THÁNG 20 CÂU
// ============================================================================
// Mapping 4 trụ cột năng lực Tháng 1 trên InMonthSkillDomain:
// - 'measurement' -> Tuần 1: Số Phạm Vi 10 000 (Cấu Tạo Hàng, So Sánh, Ghép Số & Làm Tròn)
// - 'interval'    -> Tuần 2: Cộng Trừ Có Nhớ 10 000 & Chuỗi Số Quy Luật
// - 'bar_model'   -> Tuần 3: Diện Tích Ô Vuông, Hình Vuông, Hình Chữ Nhật, Chữ L & Khung Viền
// - 'remainder'   -> Tuần 4: Liên Kết Diện Tích & Chu Vi (Tư Duy Singapore Nâng Cao)
// ============================================================================

function makeOptions(correct: string, distractors: string[]): string[] {
  const set = new Set<string>([correct]);
  for (const d of distractors) {
    if (d && d.trim() !== '' && d !== correct) {
      set.add(d);
    }
    if (set.size === 4) break;
  }
  let bump = 3;
  while (set.size < 4) {
    const match = correct.match(/(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      set.add(correct.replace(match[1], String(n + bump)));
    } else {
      set.add(`${correct} (${bump})`);
    }
    bump += 5;
  }
  const arr = Array.from(set).slice(0, 4);
  const seed = correct.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shift = seed % arr.length;
  return [...arr.slice(shift), ...arr.slice(0, shift)];
}

function buildPlaceValueVisual(
  title: string,
  concrete: SingaporeCPASpec['concrete'],
  pictorial: PlaceValuePictorialSpec,
  abstract: SingaporeCPASpec['abstract']
): InMonthVisualModelConfig {
  return {
    type: 'place_value_chart',
    title,
    cpaSpec: {
      version: '1.0',
      domain: 'place_value_chart',
      concrete,
      pictorial,
      abstract,
    },
  };
}

function buildSequenceVisual(
  title: string,
  concrete: SingaporeCPASpec['concrete'],
  pictorial: SequencePatternPictorialSpec,
  abstract: SingaporeCPASpec['abstract']
): InMonthVisualModelConfig {
  return {
    type: 'sequence_pattern',
    title,
    cpaSpec: {
      version: '1.0',
      domain: 'sequence_pattern',
      concrete,
      pictorial,
      abstract,
    },
  };
}

function buildAreaGridVisual(
  title: string,
  concrete: SingaporeCPASpec['concrete'],
  pictorial: AreaGridPictorialSpec,
  abstract: SingaporeCPASpec['abstract']
): InMonthVisualModelConfig {
  return {
    type: 'area_grid',
    title,
    cpaSpec: {
      version: '1.0',
      domain: 'area_grid',
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

function cg(
  id: string,
  label: string,
  icon: string,
  count: number,
  unitValue: number,
  color: string,
  isUnknown = false,
  displayMode: CPAConcreteGroup['displayMode'] = 'measurement'
): CPAConcreteGroup {
  return {
    id,
    label,
    icon,
    count,
    unitValue,
    totalValue: count * unitValue,
    color,
    isUnknown,
    displayMode,
  };
}

// ============================================================================
// TUẦN 1 (NGÀY 1 – 7): SỐ PHẠM VI 10 000 (CẤU TẠO HÀNG, SO SÁNH, GHÉP SỐ, LÀM TRÒN)
// ============================================================================

const WEEK1_THEMES = [
  {
    title: 'Ngày 1: Cấu tạo số 4 chữ số & Bảng Đĩa số Nghìn–Trăm–Chục–Đơn vị',
    topicTag: 'Cấu tạo số 10 000',
    goals: [
      'Đọc, viết chính xác số có 4 chữ số từ đĩa số hàng Nghìn, Trăm, Chục, Đơn vị',
      'Không bỏ sót chữ số 0 giữ chỗ ở hàng trăm hoặc hàng chục',
    ],
  },
  {
    title: 'Ngày 2: Giá trị chữ số theo hàng & Phân tích số thành tổng',
    topicTag: 'Giá trị chữ số',
    goals: [
      'Phân biệt rõ chữ số và giá trị của chữ số tại hàng nghìn, hàng trăm, hàng chục',
      'Viết số 4 chữ số dưới dạng tổng các nghìn, trăm, chục, đơn vị và tìm thành phần khuyết',
    ],
  },
  {
    title: 'Ngày 3: So sánh, xếp thứ tự & Số liền trước – liền sau đến 10 000',
    topicTag: 'So sánh số 10 000',
    goals: [
      'So sánh số 4 chữ số từng hàng từ trái sang phải (Nghìn → Trăm → Chục → Đơn vị)',
      'Tìm nhanh số liền trước, số liền sau khi vượt mốc tròn trăm, tròn nghìn',
    ],
  },
  {
    title: 'Ngày 4: Ghép số Lớn nhất – Nhỏ nhất & Chẵn – Lẻ từ 4 thẻ chữ số',
    topicTag: 'Ghép số 4 chữ số',
    goals: [
      'Ghép số 4 chữ số lớn nhất theo thứ tự giảm dần và nhỏ nhất theo thứ tự tăng dần',
      'Nắm quy tắc vàng: chữ số 0 KHÔNG được đứng ở hàng nghìn',
    ],
  },
  {
    title: 'Ngày 5: Làm tròn số đến hàng Chục, hàng Trăm, hàng Nghìn trên Tia số',
    topicTag: 'Làm tròn tia số',
    goals: [
      'Xác định đúng mốc giữa (5, 50, 500) trên tia số Singapore',
      'Áp dụng quy tắc làm tròn lên (≥ mốc giữa) và làm tròn xuống (< mốc giữa)',
    ],
  },
  {
    title: 'Ngày 6: Suy luận chữ số ẩn & Toán đố cấu tạo số phạm vi 10 000',
    topicTag: 'Suy luận cấu tạo số',
    goals: [
      'Giải bài toán tổng các chữ số và quan hệ gấp lần giữa các hàng',
      'Tính hiệu giữa số lớn nhất và số nhỏ nhất lập từ cùng bộ thẻ chữ số',
    ],
  },
  {
    title: 'Ngày 7: Tổng ôn Tuần 1 — Làm chủ Số phạm vi 10 000',
    topicTag: 'Tổng ôn Tuần 1',
    goals: [
      'Tổng hợp thành thạo cấu tạo số, giá trị chữ số, ghép số và làm tròn đến 10 000',
      'Sẵn sàng chinh phục Bài Kiểm Tra 15 Phút Cuối Tuần 1',
    ],
  },
];

function buildWeek1Questions(day: number): InMonthQuestion[] {
  const k = day; // 1..7

  // Q1 (warmup): Compose 4-digit number from thousands, hundreds, tens, ones
  const th1 = 2 + (k % 6); // 3..8
  const hu1 = (k * 2) % 9; // 2,4,6,8,1,3,5
  const te1 = (k + 3) % 9; // 4..8,0,1
  const on1 = 1 + (k % 8); // 2..8
  const num1 = th1 * 1000 + hu1 * 100 + te1 * 10 + on1;

  // Q2 (warmup): Place value of hundreds digit in a 4-digit number
  const th2 = 1 + ((k + 2) % 7);
  const hu2 = 2 + ((k + 1) % 7); // 3..8
  const te2 = (k + 4) % 9;
  const on2 = 1 + ((k + 3) % 8);
  const num2 = th2 * 1000 + hu2 * 100 + te2 * 10 + on2;
  const valHu2 = hu2 * 100;

  // Q3 (visualModel): Compose number with a ZERO placeholder (tránh quên số 0!)
  const th3 = 3 + (k % 6);
  const te3 = 2 + (k % 7);
  const on3 = 1 + ((k + 4) % 8);
  const num3 = th3 * 1000 + te3 * 10 + on3; // hundreds = 0

  // Q4 (visualModel): Expanded form missing term (find the missing hundreds/thousands value)
  const th4 = 2 + ((k + 1) % 7);
  const hu4 = 3 + (k % 6);
  const te4 = 4 + (k % 5);
  const on4 = 2 + (k % 7);
  const num4 = th4 * 1000 + hu4 * 100 + te4 * 10 + on4;
  const missingVal4 = hu4 * 100;

  // Q5 (visualModel): Rounding to nearest 100 on Number Line
  const baseH5 = (14 + k * 5) * 100; // 1900, 2400, 2900, 3400, 3900, 4400, 4900
  const tail5 = k % 2 === 1 ? 64 + k * 3 : 28 + k * 2; // odd -> round UP, even -> round DOWN
  const num5 = baseH5 + tail5;
  const rounded5 = Math.round(num5 / 100) * 100;

  // Q6 (practice): Rounding to nearest 1000 on Number Line
  const baseT6 = (2 + (k % 6)) * 1000;
  const tail6 = k % 2 === 0 ? 580 + k * 25 : 320 + k * 20; // even -> round UP, odd -> round DOWN
  const num6 = baseT6 + tail6;
  const rounded6 = Math.round(num6 / 1000) * 1000;

  // Q7 (practice): Predecessor across a thousand/hundred boundary
  const boundary7 = (2 + k) * 1000; // 3000..9000
  const prev7 = boundary7 - 1;

  // Q8 (practice): Largest 4-digit number from 4 distinct digits including 0
  const dSets8: [number, number, number, number][] = [
    [0, 3, 7, 5],
    [4, 0, 8, 2],
    [6, 1, 0, 9],
    [2, 7, 0, 5],
    [8, 0, 3, 6],
    [5, 9, 0, 1],
    [7, 2, 4, 0],
  ];
  const cards8 = dSets8[k - 1];
  const sortedDesc8 = [...cards8].sort((a, b) => b - a);
  const largest8 =
    sortedDesc8[0] * 1000 + sortedDesc8[1] * 100 + sortedDesc8[2] * 10 + sortedDesc8[3];

  // Q9 (practice): Smallest 4-digit number from 4 distinct digits INCLUDING 0 (Trap: 0 cannot be first!)
  const sortedAsc9 = [...cards8].sort((a, b) => a - b); // sortedAsc9[0] === 0
  const smallest9 =
    sortedAsc9[1] * 1000 + sortedAsc9[0] * 100 + sortedAsc9[2] * 10 + sortedAsc9[3];

  // Q10 (challenge): Compare difference between value of thousands digit and tens digit (or two numbers)
  const th10 = 4 + (k % 5); // 5..8
  const hu10 = 2 + (k % 6);
  const te10 = 3 + ((k + 2) % 6);
  const on10 = 1 + (k % 7);
  const num10 = th10 * 1000 + hu10 * 100 + te10 * 10 + on10;
  const diffVal10 = th10 * 1000 - hu10 * 100;

  // Q11 (challenge): Logic puzzle — smallest 4-digit number with distinct digits & given digit sum or condition
  // Build a clean deterministic deduction puzzle:
  // Thousands digit = a, hundreds = a + 2, tens = 0, ones = 9 -> find the number, or even better:
  // "Tìm số lớn nhất có 4 chữ số khác nhau có chữ số hàng nghìn là th11 và tổng 4 chữ số bằng S"
  // Or clean: Largest EVEN 4-digit number from cards8!
  const evenDigits11 = sortedDesc8.filter((d) => d % 2 === 0);
  const smallestEven11 = Math.min(...evenDigits11); // put smallest even digit at ones place to maximize front!
  const remaining11 = [...sortedDesc8];
  remaining11.splice(remaining11.indexOf(smallestEven11), 1);
  const largestEven11 =
    remaining11[0] * 1000 + remaining11[1] * 100 + remaining11[2] * 10 + smallestEven11;

  return [
    {
      id: `jan-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Một số gồm ${th1} nghìn, ${hu1} trăm, ${te1} chục và ${on1} đơn vị. Hỏi số đó là số nào?`,
      options: makeOptions(`${num1}`, [
        `${th1 * 1000 + te1 * 100 + hu1 * 10 + on1}`,
        `${num1 + 100}`,
        `${num1 - 10}`,
      ]),
      correctAnswer: `${num1}`,
      hint: `Xếp lần lượt số đĩa từ trái sang phải: Nghìn (${th1}) → Trăm (${hu1}) → Chục (${te1}) → Đơn vị (${on1}).`,
      stepByStepExplanation: [
        `${th1} nghìn = ${th1 * 1000}, ${hu1} trăm = ${hu1 * 100}, ${te1} chục = ${te1 * 10}, ${on1} đơn vị = ${on1}.`,
        `Ghép lại ta được số: ${th1 * 1000} + ${hu1 * 100} + ${te1 * 10} + ${on1} = ${num1}.`,
      ],
      visualModel: buildPlaceValueVisual(
        'Ghép số 4 chữ số từ bảng đĩa số Singapore',
        {
          itemName: 'đĩa số hàng',
          unitLabel: 'đĩa',
          actionPrompt: 'Đếm số đĩa ở 4 cột Nghìn – Trăm – Chục – Đơn vị rồi ghép thành số có 4 chữ số.',
          interactiveRule: 'Mỗi cột giữ đúng 1 vị trí chữ số từ trái sang phải',
          groups: [
            cg('g_th', 'Hàng Nghìn', '🔵', th1, 1000, '#0284C7', false, 'groups'),
            cg('g_hu', 'Hàng Trăm', '🟢', Math.max(1, hu1), 100, '#0D9488', hu1 === 0, 'groups'),
            cg('g_te', 'Hàng Chục', '🟣', Math.max(1, te1), 10, '#7C3AED', te1 === 0, 'groups'),
            cg('g_on', 'Hàng Đơn vị', '🟠', on1, 1, '#D97706', false, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'decompose',
          primaryNumber: num1,
          expectedResult: num1,
          chartHint: 'Đếm số đĩa ở mỗi cột để lập số có 4 chữ số',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Giá trị số} = ${th1 * 1000} \\;?\\; ${hu1 * 100} \\;?\\; ${te1 * 10} \\;?\\; ${on1} = ?`,
          ],
          fullLatexSteps: [
            `${th1 * 1000} + ${hu1 * 100} + ${te1 * 10} + ${on1} = ${num1}`,
          ],
          finalAnswerLatex: `${num1}`,
          finalNumericValue: num1,
        }
      ),
    },
    {
      id: `jan-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'measurement',
      prompt: `Trong số ${num2}, chữ số ${hu2} ở hàng trăm có giá trị là bao nhiêu?`,
      options: makeOptions(`${valHu2}`, [`${hu2}`, `${hu2 * 10}`, `${hu2 * 1000}`]),
      correctAnswer: `${valHu2}`,
      hint: `Chữ số đứng ở hàng trăm thì giá trị bằng chữ số đó nhân với 100.`,
      stepByStepExplanation: [
        `Trong số ${num2}, chữ số ${hu2} đứng ở vị trí hàng trăm (cột thứ 2 từ trái sang phải).`,
        `Giá trị của chữ số ${hu2} là: ${hu2} × 100 = ${valHu2}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `Xác định giá trị chữ số hàng trăm trong số ${num2}`,
        {
          itemName: 'đĩa trăm',
          unitLabel: 'đĩa',
          actionPrompt: 'Quan sát cột Hàng Trăm được tô sáng màu vàng để tìm tổng giá trị của các đĩa 100.',
          interactiveRule: 'Mỗi đĩa hàng trăm có giá trị bằng 100 đơn vị',
          groups: [
            cg('g_hu2', 'Số đĩa hàng Trăm', '🟢', hu2, 100, '#0D9488', true, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'decompose',
          primaryNumber: num2,
          highlightPlace: 'hundreds',
          expectedResult: valHu2,
          chartHint: `Quan sát cột Hàng Trăm của số ${num2}`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Giá trị chữ số hàng trăm} = ${hu2} \\;?\\; 100 = ?`,
          ],
          fullLatexSteps: [`${hu2} \\times 100 = ${valHu2}`],
          finalAnswerLatex: `${valHu2}`,
          finalNumericValue: valHu2,
        }
      ),
    },
    {
      id: `jan-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Cẩn thận hàng khuyết: Viết số gồm ${th3} nghìn, ${te3} chục và ${on3} đơn vị (không có hàng trăm).`,
      options: makeOptions(`${num3}`, [
        `${th3 * 100 + te3 * 10 + on3}`,
        `${th3 * 1000 + te3 * 100 + on3}`,
        `${th3 * 1000 + on3 * 10 + te3}`,
      ]),
      correctAnswer: `${num3}`,
      hint: `Hàng trăm không có đĩa nào nên phải viết chữ số 0 giữ chỗ ở hàng trăm!`,
      stepByStepExplanation: [
        `Hàng nghìn là ${th3}, hàng trăm không có (viết 0), hàng chục là ${te3}, hàng đơn vị là ${on3}.`,
        `Số cần tìm là: ${th3 * 1000} + 0 + ${te3 * 10} + ${on3} = ${num3}.`,
      ],
      visualModel: buildPlaceValueVisual(
        'Viết số 4 chữ số khi khuyết hàng trăm (giữ chỗ bằng 0)',
        {
          itemName: 'đĩa số',
          unitLabel: 'đĩa',
          actionPrompt: 'Chú ý cột Hàng Trăm đang trống (0 đĩa) — ta phải ghi chữ số 0 giữ chỗ.',
          interactiveRule: 'Hàng nào không có đĩa thì viết chữ số 0',
          groups: [
            cg('g_th3', 'Hàng Nghìn', '🔵', th3, 1000, '#0284C7', false, 'groups'),
            cg('g_te3', 'Hàng Chục', '🟣', te3, 10, '#7C3AED', false, 'groups'),
            cg('g_on3', 'Hàng Đơn vị', '🟠', on3, 1, '#D97706', false, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'decompose',
          primaryNumber: num3,
          highlightPlace: 'hundreds',
          expectedResult: num3,
          chartHint: 'Cột Hàng Trăm có 0 đĩa — nhớ ghi chữ số 0 giữ chỗ!',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Số cần viết} = ${th3 * 1000} \\;?\\; 0 \\;?\\; ${te3 * 10} \\;?\\; ${on3} = ?`,
          ],
          fullLatexSteps: [
            `${th3 * 1000} + 0 + ${te3 * 10} + ${on3} = ${num3}`,
          ],
          finalAnswerLatex: `${num3}`,
          finalNumericValue: num3,
        }
      ),
    },
    {
      id: `jan-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Tìm số thích hợp điền vào dấu ? trong phân tích tổng: ${num4} = ${th4 * 1000} + ? + ${te4 * 10} + ${on4}.`,
      options: makeOptions(`${missingVal4}`, [`${hu4}`, `${hu4 * 10}`, `${hu4 * 1000}`]),
      correctAnswer: `${missingVal4}`,
      hint: `Quan sát vị trí bị che trong bảng hàng: đó chính là giá trị của hàng trăm.`,
      stepByStepExplanation: [
        `Phân tích số ${num4} theo các hàng: ${th4 * 1000} + ${missingVal4} + ${te4 * 10} + ${on4}.`,
        `Vậy số cần điền vào dấu ? là ${missingVal4}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `Tìm thành phần hàng trăm còn thiếu của số ${num4}`,
        {
          itemName: 'thành phần tổng',
          unitLabel: 'phần',
          actionPrompt: 'Đối chiếu số gốc với các phần đã biết để tìm giá trị cột Hàng Trăm bị che.',
          interactiveRule: 'Tổng 4 hàng bằng đúng số 4 chữ số ban đầu',
          groups: [
            cg('g_k1', 'Hàng Nghìn', '🔵', th4, 1000, '#0284C7', false, 'groups'),
            cg('g_k2', 'Hàng Trăm (Cần tìm)', '🟡', hu4, 100, '#F59E0B', true, 'groups'),
            cg('g_k3', 'Chục & Đơn vị', '🟣', 1, te4 * 10 + on4, '#7C3AED', false, 'measurement'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'decompose',
          primaryNumber: num4,
          highlightPlace: 'hundreds',
          hideResultBeforeSolve: true,
          expectedResult: missingVal4,
          chartHint: `Hàng trăm của số ${num4} có giá trị bao nhiêu?`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `${num4} = ${th4 * 1000} \\;?\\; ? \\;?\\; ${te4 * 10} \\;?\\; ${on4}`,
          ],
          fullLatexSteps: [
            `${num4} = ${th4 * 1000} + ${missingVal4} + ${te4 * 10} + ${on4}`,
            `? = ${missingVal4}`,
          ],
          finalAnswerLatex: `${missingVal4}`,
          finalNumericValue: missingVal4,
        }
      ),
    },
    {
      id: `jan-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Dùng tia số làm tròn số ${num5} đến hàng trăm gần nhất.`,
      options: makeOptions(`${rounded5}`, [
        `${rounded5 === baseH5 ? baseH5 + 100 : baseH5}`,
        `${baseH5 + 50}`,
        `${rounded5 + 100}`,
      ]),
      correctAnswer: `${rounded5}`,
      hint: `Số ${num5} nằm giữa ${baseH5} và ${baseH5 + 100}, mốc giữa là ${baseH5 + 50}. Hãy so sánh ${num5} với mốc giữa!`,
      stepByStepExplanation: [
        `Số ${num5} nằm giữa ${baseH5} và ${baseH5 + 100} (mốc giữa là ${baseH5 + 50}).`,
        `Vì ${num5} ${num5 >= baseH5 + 50 ? '≥' : '<'} ${baseH5 + 50} nên làm tròn đến hàng trăm gần nhất được ${rounded5}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `Làm tròn số ${num5} đến hàng trăm trên tia số`,
        {
          itemName: 'mốc tròn trăm',
          unitLabel: 'mốc',
          actionPrompt: 'Quan sát vị trí điểm xanh so với Mốc giữa màu vàng trên tia số.',
          interactiveRule: 'Lớn hơn hoặc bằng mốc giữa → làm tròn LÊN; nhỏ hơn → làm tròn XUỐNG',
          groups: [
            cg('g_num5', 'Số cần làm tròn', '📍', 1, num5, '#10B981', false, 'measurement'),
            cg('g_mid5', 'Mốc giữa', '⭐', 1, baseH5 + 50, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'number_line_round',
          primaryNumber: num5,
          roundTo: 100,
          roundLow: baseH5,
          roundHigh: baseH5 + 100,
          expectedResult: rounded5,
          chartHint: `Xác định số ${num5} gần ${baseH5} hay ${baseH5 + 100} hơn`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{So sánh } ${num5} \\text{ với mốc giữa } ${baseH5 + 50} \\Rightarrow \\text{Làm tròn} = ?`,
          ],
          fullLatexSteps: [
            `${num5} \\;${num5 >= baseH5 + 50 ? '\\ge' : '<'}\\; ${baseH5 + 50}`,
            `\\text{Làm tròn đến hàng trăm: } ${num5} \\approx ${rounded5}`,
          ],
          finalAnswerLatex: `${rounded5}`,
          finalNumericValue: rounded5,
        }
      ),
    },
    {
      id: `jan-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Một sân vận động có ${num6} khán giả. Làm tròn số khán giả đến hàng nghìn gần nhất.`,
      options: makeOptions(`${rounded6}`, [
        `${rounded6 === baseT6 ? baseT6 + 1000 : baseT6}`,
        `${baseT6 + 500}`,
        `${rounded6 + 1000}`,
      ]),
      correctAnswer: `${rounded6}`,
      hint: `Số ${num6} nằm giữa ${baseT6} và ${baseT6 + 1000}, mốc giữa là ${baseT6 + 500}.`,
      stepByStepExplanation: [
        `Số ${num6} nằm giữa ${baseT6} và ${baseT6 + 1000} (mốc giữa là ${baseT6 + 500}).`,
        `Vì ${num6} ${num6 >= baseT6 + 500 ? '≥' : '<'} ${baseT6 + 500} nên làm tròn đến hàng nghìn được ${rounded6}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `Làm tròn số ${num6} đến hàng nghìn gần nhất`,
        {
          itemName: 'khán giả',
          unitLabel: 'người',
          actionPrompt: 'Xác định chữ số hàng trăm (so với mốc giữa 500) để quyết định làm tròn lên hay xuống.',
          interactiveRule: 'Chữ số hàng trăm từ 5 trở lên → làm tròn lên nghìn kế tiếp',
          groups: [
            cg('g_num6', 'Số khán giả', '🏟️', 1, num6, '#0284C7', false, 'measurement'),
            cg('g_mid6', 'Mốc giữa', '⭐', 1, baseT6 + 500, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'number_line_round',
          primaryNumber: num6,
          roundTo: 1000,
          roundLow: baseT6,
          roundHigh: baseT6 + 1000,
          expectedResult: rounded6,
          chartHint: `Tia số làm tròn ${num6} đến hàng nghìn`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{So sánh } ${num6} \\text{ với mốc giữa } ${baseT6 + 500} \\Rightarrow \\text{Làm tròn} = ?`,
          ],
          fullLatexSteps: [
            `${num6} \\;${num6 >= baseT6 + 500 ? '\\ge' : '<'}\\; ${baseT6 + 500}`,
            `\\text{Làm tròn đến hàng nghìn: } ${num6} \\approx ${rounded6}`,
          ],
          finalAnswerLatex: `${rounded6}`,
          finalNumericValue: rounded6,
        }
      ),
    },
    {
      id: `jan-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Tìm số liền trước của số tròn nghìn ${boundary7}.`,
      options: makeOptions(`${prev7}`, [`${boundary7 + 1}`, `${boundary7 - 10}`, `${boundary7 - 100}`]),
      correctAnswer: `${prev7}`,
      hint: `Muốn tìm số liền trước, ta bớt đi 1 đơn vị từ ${boundary7} (đổi 1 nghìn thành 9 trăm 9 chục 10 đơn vị).`,
      stepByStepExplanation: [
        `Số liền trước của ${boundary7} bé hơn ${boundary7} đúng 1 đơn vị.`,
        `${boundary7} - 1 = ${prev7}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `Tìm số liền trước của số tròn nghìn ${boundary7}`,
        {
          itemName: 'đơn vị',
          unitLabel: 'đơn vị',
          actionPrompt: 'Bớt 1 đơn vị khỏi số tròn nghìn — quan sát cả 4 hàng thay đổi như thế nào.',
          interactiveRule: 'Số liền trước kém số đã cho đúng 1 đơn vị',
          groups: [
            cg('g_b7', 'Số đã cho', '🔢', 1, boundary7, '#0284C7', false, 'measurement'),
            cg('g_step7', 'Bớt đi', '⬅️', 1, 1, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'add_sub',
          primaryNumber: boundary7,
          secondaryNumber: 1,
          operation: 'subtract',
          expectedResult: prev7,
          chartHint: `Đặt tính trừ 1 đơn vị khỏi số tròn nghìn ${boundary7}`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Số liền trước} = ${boundary7} \\;?\\; 1 = ?`],
          fullLatexSteps: [`${boundary7} - 1 = ${prev7}`],
          finalAnswerLatex: `${prev7}`,
          finalNumericValue: prev7,
        }
      ),
    },
    {
      id: `jan-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Từ bốn thẻ chữ số ${cards8.join(', ')}, hãy ghép thành số LỚN NHẤT có 4 chữ số khác nhau.`,
      options: makeOptions(`${largest8}`, [
        `${smallest9}`,
        `${sortedDesc8[0] * 1000 + sortedDesc8[2] * 100 + sortedDesc8[1] * 10 + sortedDesc8[3]}`,
        `${sortedDesc8[1] * 1000 + sortedDesc8[0] * 100 + sortedDesc8[2] * 10 + sortedDesc8[3]}`,
      ]),
      correctAnswer: `${largest8}`,
      hint: `Để số lớn nhất, xếp các thẻ chữ số theo thứ tự GIẢM DẦN từ hàng nghìn đến hàng đơn vị.`,
      stepByStepExplanation: [
        `Xếp 4 chữ số theo thứ tự từ lớn đến bé: ${sortedDesc8.join(' > ')}.`,
        `Số lớn nhất ghép được là: ${largest8}.`,
      ],
      visualModel: buildPlaceValueVisual(
        'Ghép số 4 chữ số lớn nhất từ 4 thẻ số',
        {
          itemName: 'thẻ chữ số',
          unitLabel: 'thẻ',
          actionPrompt: 'Chọn chữ số lớn nhất đặt vào cột Hàng Nghìn, rồi tiếp tục giảm dần sang phải.',
          interactiveRule: 'Số lớn nhất ⇔ xếp chữ số giảm dần từ trái sang phải',
          groups: [
            cg('g_c8', 'Bộ 4 thẻ chữ số', '🃏', 4, 1, '#0284C7', false, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'build_number',
          primaryNumber: largest8,
          digitCards: cards8,
          expectedResult: largest8,
          hideResultBeforeSolve: true,
          chartHint: 'Xếp 4 thẻ chữ số vào đúng cột để tạo số LỚN NHẤT',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Xếp giảm dần: } \\text{Nghìn} > \\text{Trăm} > \\text{Chục} > \\text{Đơn vị} \\Rightarrow ?`,
          ],
          fullLatexSteps: [
            `\\text{Thứ tự giảm dần: } ${sortedDesc8.join(' > ')}`,
            `\\text{Số lớn nhất} = ${largest8}`,
          ],
          finalAnswerLatex: `${largest8}`,
          finalNumericValue: largest8,
        }
      ),
    },
    {
      id: `jan-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'measurement',
      prompt: `Bẫy chữ số 0: Từ bốn thẻ chữ số ${cards8.join(', ')}, hãy ghép thành số NHỎ NHẤT có 4 chữ số khác nhau.`,
      options: makeOptions(`${smallest9}`, [
        `${sortedAsc9[1] * 1000 + sortedAsc9[2] * 100 + sortedAsc9[0] * 10 + sortedAsc9[3]}`,
        `${sortedAsc9[1] * 100 + sortedAsc9[2] * 10 + sortedAsc9[3]}`,
        `${largest8}`,
      ]),
      correctAnswer: `${smallest9}`,
      hint: `Chữ số 0 KHÔNG được đứng đầu ở hàng nghìn! Đặt chữ số nhỏ nhất KHÁC 0 vào hàng nghìn, rồi đặt 0 vào hàng trăm.`,
      stepByStepExplanation: [
        `Xếp tăng dần: ${sortedAsc9.join(' < ')}. Vì 0 không thể đứng ở hàng nghìn nên chọn ${sortedAsc9[1]} làm chữ số hàng nghìn.`,
        `Sau đó đặt 0 ở hàng trăm, rồi ${sortedAsc9[2]} ở hàng chục, ${sortedAsc9[3]} ở hàng đơn vị → số ${smallest9}.`,
      ],
      visualModel: buildPlaceValueVisual(
        'Ghép số 4 chữ số nhỏ nhất (Quy tắc tránh số 0 đứng đầu)',
        {
          itemName: 'thẻ chữ số',
          unitLabel: 'thẻ',
          actionPrompt: 'Nhớ quy tắc vàng: Hàng Nghìn phải khác 0, sau đó mới đặt thẻ 0 vào Hàng Trăm!',
          interactiveRule: 'Hàng Nghìn = chữ số nhỏ nhất khác 0; Hàng Trăm = 0',
          groups: [
            cg('g_c9', 'Bộ 4 thẻ có số 0', '🃏', 4, 1, '#0D9488', false, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'build_number',
          primaryNumber: smallest9,
          digitCards: cards8,
          expectedResult: smallest9,
          hideResultBeforeSolve: true,
          chartHint: 'Chú ý: Hàng Nghìn KHÔNG ĐƯỢC là 0!',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Hàng nghìn} \\neq 0 \\Rightarrow \\text{Đặt } ${sortedAsc9[1]} \\text{ đầu tiên, tiếp theo } 0 \\Rightarrow ?`,
          ],
          fullLatexSteps: [
            `\\text{Nghìn} = ${sortedAsc9[1]},\\; \\text{Trăm} = 0,\\; \\text{Chục} = ${sortedAsc9[2]},\\; \\text{Đơn vị} = ${sortedAsc9[3]}`,
            `\\text{Số nhỏ nhất} = ${smallest9}`,
          ],
          finalAnswerLatex: `${smallest9}`,
          finalNumericValue: smallest9,
        }
      ),
    },
    {
      id: `jan-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'measurement',
      prompt: `Thử thách Giá trị hàng: Trong số ${num10}, giá trị của chữ số hàng nghìn lớn hơn giá trị của chữ số hàng trăm bao nhiêu đơn vị?`,
      options: makeOptions(`${diffVal10}`, [
        `${th10 - hu10}`,
        `${diffVal10 + 100}`,
        `${th10 * 1000 + hu10 * 100}`,
      ]),
      correctAnswer: `${diffVal10}`,
      hint: `Tìm giá trị chữ số hàng nghìn (${th10} nghìn) và giá trị chữ số hàng trăm (${hu10} trăm), rồi tìm hiệu của chúng.`,
      stepByStepExplanation: [
        `Giá trị chữ số hàng nghìn (${th10}) là ${th10 * 1000}.`,
        `Giá trị chữ số hàng trăm (${hu10}) là ${hu10 * 100}.`,
        `Hiệu cần tìm là: ${th10 * 1000} - ${hu10 * 100} = ${diffVal10}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `So sánh giá trị hàng nghìn và hàng trăm trong số ${num10}`,
        {
          itemName: 'giá trị hàng',
          unitLabel: 'đơn vị',
          actionPrompt: 'Đổi cả hai cột Nghìn và Trăm ra giá trị đơn vị rồi tìm phần hơn kém.',
          interactiveRule: 'Giá trị = Chữ số × Bậc hàng (1000 hoặc 100)',
          groups: [
            cg('g_th10', 'Giá trị hàng Nghìn', '🔵', th10, 1000, '#0284C7', false, 'groups'),
            cg('g_hu10', 'Giá trị hàng Trăm', '🟢', hu10, 100, '#0D9488', false, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'compare',
          primaryNumber: th10 * 1000,
          secondaryNumber: hu10 * 100,
          expectedResult: diffVal10,
          chartHint: `So sánh giá trị hàng Nghìn và hàng Trăm của số ${num10}`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Hiệu giá trị} = ${th10 * 1000} \\;?\\; ${hu10 * 100} = ?`,
          ],
          fullLatexSteps: [
            `${th10 * 1000} - ${hu10 * 100} = ${diffVal10}`,
          ],
          finalAnswerLatex: `${diffVal10}`,
          finalNumericValue: diffVal10,
        }
      ),
    },
    {
      id: `jan-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'measurement',
      prompt: `Thử thách Tư duy Ghép số Chẵn: Từ bốn thẻ chữ số ${cards8.join(', ')}, ghép thành số CHẴN LỚN NHẤT có 4 chữ số khác nhau.`,
      options: makeOptions(`${largestEven11}`, [
        `${largest8}`,
        `${smallest9}`,
        `${remaining11[0] * 1000 + remaining11[2] * 100 + remaining11[1] * 10 + smallestEven11}`,
      ]),
      correctAnswer: `${largestEven11}`,
      hint: `Để là số CHẴN, chữ số hàng đơn vị phải là số chẵn. Hãy chọn chữ số chẵn NHỎ NHẤT đặt ở hàng đơn vị để 3 chữ số lớn hơn còn lại đứng phía trước!`,
      stepByStepExplanation: [
        `Để số vừa CHẴN vừa LỚN NHẤT, ta đặt chữ số chẵn nhỏ nhất (${smallestEven11}) vào hàng đơn vị.`,
        `Ba chữ số còn lại (${remaining11.join(', ')}) xếp giảm dần vào 3 hàng đầu → số ${largestEven11}.`,
      ],
      visualModel: buildPlaceValueVisual(
        'Ghép số Chẵn lớn nhất có 4 chữ số khác nhau',
        {
          itemName: 'thẻ chữ số',
          unitLabel: 'thẻ',
          actionPrompt: 'Khoá hàng Đơn vị bằng chữ số chẵn nhỏ nhất trước, rồi xếp 3 thẻ còn lại giảm dần.',
          interactiveRule: 'Số chẵn tận cùng bằng 0, 2, 4, 6 hoặc 8',
          groups: [
            cg('g_ev11', 'Bộ 4 thẻ chữ số', '🃏', 4, 1, '#7C3AED', false, 'groups'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'build_number',
          primaryNumber: largestEven11,
          digitCards: cards8,
          expectedResult: largestEven11,
          hideResultBeforeSolve: true,
          chartHint: 'Khóa hàng Đơn vị bằng số chẵn nhỏ nhất trước!',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Hàng đơn vị chẵn nhỏ nhất} = ${smallestEven11} \\Rightarrow \\text{Số chẵn lớn nhất} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Đơn vị} = ${smallestEven11},\\; \\text{ba hàng đầu giảm dần: } ${remaining11.join(', ')}`,
            `\\text{Số chẵn lớn nhất} = ${largestEven11}`,
          ],
          finalAnswerLatex: `${largestEven11}`,
          finalNumericValue: largestEven11,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 2 (NGÀY 8 – 14): CỘNG TRỪ CÓ NHỚ 10 000 & CHUỖI SỐ QUY LUẬT
// ============================================================================

const WEEK2_THEMES = [
  {
    title: 'Ngày 8: Phép cộng có nhớ phạm vi 10 000 (Quy đổi 10 đĩa)',
    topicTag: 'Cộng có nhớ 10 000',
    goals: [
      'Thực hiện phép cộng số 4 chữ số có nhớ liên tiếp bằng mô hình đổi 10 đĩa hàng nhỏ',
      'Vận dụng chiến lược tính nhẩm tròn trăm, tròn nghìn',
    ],
  },
  {
    title: 'Ngày 9: Phép trừ có nhớ phạm vi 10 000 (Mượn xuyên chữ số 0)',
    topicTag: 'Trừ có nhớ 10 000',
    goals: [
      'Đặt tính trừ có nhớ chính xác, đặc biệt dạng trừ từ số tròn nghìn (VD: 5000 − 1248)',
      'Biết cách kiểm tra lại kết quả phép trừ bằng phép cộng ngược',
    ],
  },
  {
    title: 'Ngày 10: Toán đố 2 bước phạm vi 10 000 kết hợp Sơ đồ thanh',
    topicTag: 'Toán đố 10 000',
    goals: [
      'Dùng sơ đồ thanh Singapore giải bài toán nhiều hơn, ít hơn và tổng 2 kho/trạm đến 10 000',
      'Tìm thành phần chưa biết trong phép cộng, phép trừ phạm vi 10 000',
    ],
  },
  {
    title: 'Ngày 11: Chuỗi số cách đều tăng – giảm (Cấp số cộng)',
    topicTag: 'Chuỗi cách đều',
    goals: [
      'Tìm khoảng nhảy hằng số (+d hoặc −d) giữa hai số hạng liền kề',
      'Tìm số hạng tiếp theo hoặc số hạng bị khuyết ở giữa dãy số',
    ],
  },
  {
    title: 'Ngày 12: Chuỗi số có hiệu tăng dần / giảm dần đều (Hiệu bậc 2)',
    topicTag: 'Hiệu tăng dần đều',
    goals: [
      'Phát hiện quy luật bước nhảy thay đổi đều (+2, +4, +6, +8... hoặc +3, +6, +9...)',
      'Dự đoán bước nhảy tiếp theo để tính chính xác số hạng bị ẩn',
    ],
  },
  {
    title: 'Ngày 13: Chuỗi quy luật nâng cao — Xen kẽ 2 nhánh, Fibonacci & Nhân chia',
    topicTag: 'Quy luật nâng cao',
    goals: [
      'Tách dãy xen kẽ thành nhánh vị trí lẻ và nhánh vị trí chẵn',
      'Nhận diện dãy Fibonacci (cộng 2 số trước) và dãy gấp lần (×2, ×3)',
    ],
  },
  {
    title: 'Ngày 14: Tổng ôn Tuần 2 — Cộng trừ 10 000 & Giải mã Chuỗi quy luật',
    topicTag: 'Tổng ôn Tuần 2',
    goals: [
      'Tổng hợp kỹ năng cộng trừ có nhớ 10 000 và giải mã mọi dạng chuỗi quy luật',
      'Sẵn sàng hoàn thành Bài Kiểm Tra 15 Phút Cuối Tuần 2',
    ],
  },
];

function buildWeek2Questions(day: number): InMonthQuestion[] {
  const k = day - 7; // 1..7

  // Q1 (warmup): Addition with regrouping within 10 000
  const addA1 = 2365 + k * 418;
  const addB1 = 1478 + k * 235;
  const sum1 = addA1 + addB1;

  // Q2 (warmup): Subtraction with regrouping from round thousand (mượn xuyên số 0!)
  const minuend2 = (2 + k) * 1000;
  const subB2 = 1235 + k * 142;
  const diff2 = minuend2 - subB2;

  // Q3 (visualModel): Arithmetic increasing sequence (constant step)
  const start3 = 120 + k * 35;
  const step3 = 15 + k * 5; // 20, 25, 30, 35, 40, 45, 50
  const seq3 = [0, 1, 2, 3, 4].map((i) => start3 + i * step3);
  const ans3 = seq3[4];

  // Q4 (visualModel): Arithmetic decreasing sequence (constant negative step)
  const step4 = 25 + k * 5;
  const start4 = 650 + k * 80;
  const seq4 = [0, 1, 2, 3, 4].map((i) => start4 - i * step4);
  const ans4 = seq4[4];

  // Q5 (visualModel): Second-order increasing diff sequence (+d, +2d, +3d, +4d...)
  const base5 = 4 + k * 2;
  const d0_5 = 2 + (k % 3); // 3, 4, 2, ...
  const inc5 = 2; // +d0, +(d0+2), +(d0+4), +(d0+6), +(d0+8)
  const seq5: number[] = [base5];
  for (let i = 0; i < 5; i++) {
    seq5.push(seq5[seq5.length - 1] + d0_5 + i * inc5);
  }
  const ans5 = seq5[5];

  // Q6 (practice): Find missing middle term in arithmetic sequence
  const start6 = 1050 + k * 200;
  const step6 = 125 + k * 25;
  const seq6 = [0, 1, 2, 3, 4].map((i) => start6 + i * step6);
  const ans6 = seq6[3]; // index 3 is missing (4th term), index 4 is shown as verification!

  // Q7 (practice): Two-step Bar Model word problem in 10 000 range (Comparison -> Total)
  const depotA7 = 1650 + k * 210;
  const extraB7 = 480 + k * 45;
  const depotB7 = depotA7 + extraB7;
  const total7 = depotA7 + depotB7;

  // Q8 (practice): Working backwards / Find unknown addend in 10 000 range
  const targetSum8 = 6400 + k * 350;
  const knownPart8 = 2685 + k * 175;
  const unknownPart8 = targetSum8 - knownPart8;

  // Q9 (practice): Fibonacci-sum sequence (each term = sum of previous two)
  const f0 = 2 + k;
  const f1 = 3 + k;
  const seq9 = [f0, f1, f0 + f1, f0 + 2 * f1, 2 * f0 + 3 * f1, 3 * f0 + 5 * f1];
  const ans9 = seq9[5];

  // Q10 (challenge): Multiplicative sequence (×2)
  const m0 = 2 + (k % 4); // 3, 4, 5, 2, 3, 4, 5
  const seq10 = [m0, m0 * 2, m0 * 4, m0 * 8, m0 * 16, m0 * 32];
  const ans10 = seq10[5];

  // Q11 (challenge): Alternating dual-branch sequence (Odd positions +a, Even positions -b or +b)
  const oddStart11 = 10 + k * 3;
  const oddStep11 = 4 + (k % 3);
  const evenStart11 = 60 + k * 5;
  const evenStep11 = 5;
  // Indices: 0(odd1), 1(even1), 2(odd2), 3(even2), 4(odd3), 5(even3), 6(odd4 = ?)
  const seq11 = [
    oddStart11,
    evenStart11,
    oddStart11 + oddStep11,
    evenStart11 - evenStep11,
    oddStart11 + 2 * oddStep11,
    evenStart11 - 2 * evenStep11,
    oddStart11 + 3 * oddStep11,
  ];
  const ans11 = seq11[6];

  return [
    {
      id: `jan-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'interval',
      prompt: `Đặt tính rồi tính phép cộng có nhớ: ${addA1} + ${addB1} = ?`,
      options: makeOptions(`${sum1}`, [`${sum1 - 10}`, `${sum1 + 100}`, `${sum1 - 100}`]),
      correctAnswer: `${sum1}`,
      hint: `Cộng từ hàng đơn vị sang hàng nghìn; cứ đủ 10 đĩa ở một hàng thì đổi sang 1 đĩa ở hàng liền trước.`,
      stepByStepExplanation: [
        `Đặt tính thẳng cột theo 4 hàng: Nghìn – Trăm – Chục – Đơn vị.`,
        `${addA1} + ${addB1} = ${sum1}.`,
      ],
      visualModel: buildPlaceValueVisual(
        `Phép cộng có nhớ: ${addA1} + ${addB1}`,
        {
          itemName: 'đơn vị',
          unitLabel: 'đơn vị',
          actionPrompt: 'Gộp từng cột từ phải sang trái và nhớ 1 sang hàng lớn hơn khi tổng từ 10 trở lên.',
          interactiveRule: '10 đĩa hàng nhỏ = 1 đĩa hàng liền trước',
          groups: [
            cg('g_a1', 'Số hạng thứ nhất', '🔵', 1, addA1, '#0284C7', false, 'measurement'),
            cg('g_b1', 'Số hạng thứ hai', '🟣', 1, addB1, '#7C3AED', false, 'measurement'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'add_sub',
          primaryNumber: addA1,
          secondaryNumber: addB1,
          operation: 'add',
          expectedResult: sum1,
          chartHint: 'Cộng từng cột từ phải sang trái (nhớ khi tổng ≥ 10)',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Tổng} = ${addA1} \\;?\\; ${addB1} = ?`],
          fullLatexSteps: [`${addA1} + ${addB1} = ${sum1}`],
          finalAnswerLatex: `${sum1}`,
          finalNumericValue: sum1,
        }
      ),
    },
    {
      id: `jan-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'interval',
      prompt: `Trừ có nhớ xuyên số 0: Tính hiệu ${minuend2} - ${subB2} = ?`,
      options: makeOptions(`${diff2}`, [`${diff2 + 100}`, `${diff2 - 100}`, `${diff2 + 10}`]),
      correctAnswer: `${diff2}`,
      hint: `Mượn 1 nghìn đổi thành 9 trăm, 9 chục và 10 đơn vị rồi trừ lần lượt từng cột.`,
      stepByStepExplanation: [
        `Đặt tính thẳng cột và thực hiện trừ có nhớ từ phải sang trái.`,
        `${minuend2} - ${subB2} = ${diff2} (Thử lại: ${diff2} + ${subB2} = ${minuend2}).`,
      ],
      visualModel: buildPlaceValueVisual(
        `Phép trừ xuyên số 0: ${minuend2} − ${subB2}`,
        {
          itemName: 'đơn vị',
          unitLabel: 'đơn vị',
          actionPrompt: 'Quan sát kỹ khi số bị trừ có nhiều chữ số 0: luôn trả nhớ đúng ở cột kế tiếp!',
          interactiveRule: 'Kiểm tra lại: Hiệu + Số trừ = Số bị trừ',
          groups: [
            cg('g_m2', 'Số bị trừ', '🔵', 1, minuend2, '#0284C7', false, 'measurement'),
            cg('g_s2', 'Số trừ', '🟠', 1, subB2, '#D97706', false, 'measurement'),
          ],
        },
        {
          kind: 'place_value_chart',
          mode: 'add_sub',
          primaryNumber: minuend2,
          secondaryNumber: subB2,
          operation: 'subtract',
          expectedResult: diff2,
          chartHint: 'Trừ có nhớ từ phải sang trái và thử lại bằng phép cộng',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Hiệu} = ${minuend2} \\;?\\; ${subB2} = ?`],
          fullLatexSteps: [`${minuend2} - ${subB2} = ${diff2}`],
          finalAnswerLatex: `${diff2}`,
          finalNumericValue: diff2,
        }
      ),
    },
    {
      id: `jan-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Tìm số tiếp theo trong dãy số quy luật tăng đều: ${seq3.slice(0, 4).join('; ')}; ?`,
      options: makeOptions(`${ans3}`, [`${ans3 + step3}`, `${ans3 - 10}`, `${ans3 + 5}`]),
      correctAnswer: `${ans3}`,
      hint: `Tìm hiệu giữa hai số đứng liền nhau rồi cộng tiếp bước nhảy đó vào số thứ 4 (${seq3[3]}).`,
      stepByStepExplanation: [
        `Bước nhảy giữa hai số liên tiếp là: ${seq3[1]} - ${seq3[0]} = ${step3}.`,
        `Số thứ 5 cần tìm là: ${seq3[3]} + ${step3} = ${ans3}.`,
      ],
      visualModel: buildSequenceVisual(
        'Giải mã chuỗi số cách đều tăng dần',
        {
          itemName: 'số hạng',
          unitLabel: 'số',
          actionPrompt: 'Tìm khoảng cách giữa hai ô liền kề để xác định bước nhảy không đổi.',
          interactiveRule: 'Mỗi bước nhảy tăng thêm cùng một lượng không đổi',
          groups: [
            cg('g_sq3a', 'Số đứng trước dấu ?', '🔢', 1, seq3[3], '#0284C7', false, 'measurement'),
            cg('g_sq3b', 'Bước nhảy đều', '➡️', 1, step3, '#10B981', false, 'interval'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'arithmetic',
          terms: seq3,
          missingIndex: 4,
          stepLabels: [`+${step3}`, `+${step3}`, `+${step3}`, `+${step3}`],
          ruleHint: `Quy luật cấp số cộng: mỗi số sau lớn hơn số trước ${step3} đơn vị.`,
          expectedValue: ans3,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Bước nhảy} = ${seq3[1]} \\;?\\; ${seq3[0]}`,
            `\\text{Số thứ 5} = ${seq3[3]} \\;?\\; \\text{Bước nhảy} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bước nhảy} = ${seq3[1]} - ${seq3[0]} = ${step3}`,
            `${seq3[3]} + ${step3} = ${ans3}`,
          ],
          finalAnswerLatex: `${ans3}`,
          finalNumericValue: ans3,
        }
      ),
    },
    {
      id: `jan-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Tìm số tiếp theo trong dãy số giảm đều: ${seq4.slice(0, 4).join('; ')}; ?`,
      options: makeOptions(`${ans4}`, [`${ans4 - step4}`, `${ans4 + step4}`, `${ans4 + 10}`]),
      correctAnswer: `${ans4}`,
      hint: `Dãy số đang giảm đều! Hãy lấy số trước trừ đi số sau để tìm bước giảm mỗi chặng.`,
      stepByStepExplanation: [
        `Mỗi lần dãy giảm đi: ${seq4[0]} - ${seq4[1]} = ${step4} đơn vị.`,
        `Số thứ 5 cần tìm là: ${seq4[3]} - ${step4} = ${ans4}.`,
      ],
      visualModel: buildSequenceVisual(
        'Giải mã chuỗi số cách đều giảm dần',
        {
          itemName: 'số hạng',
          unitLabel: 'số',
          actionPrompt: 'Quan sát chiều mũi tên giảm đều để tính bước trừ ở mỗi chặng.',
          interactiveRule: 'Số liền sau bằng số liền trước bớt đi cùng một lượng',
          groups: [
            cg('g_sq4a', 'Số đứng trước dấu ?', '🔢', 1, seq4[3], '#0284C7', false, 'measurement'),
            cg('g_sq4b', 'Mức giảm mỗi bước', '⬅️', 1, step4, '#F59E0B', false, 'interval'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'arithmetic',
          terms: seq4,
          missingIndex: 4,
          stepLabels: [`-${step4}`, `-${step4}`, `-${step4}`, `-${step4}`],
          ruleHint: `Quy luật giảm đều: mỗi số sau kém số trước ${step4} đơn vị.`,
          expectedValue: ans4,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Mức giảm} = ${seq4[0]} \\;?\\; ${seq4[1]}`,
            `\\text{Số thứ 5} = ${seq4[3]} \\;?\\; \\text{Mức giảm} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Mức giảm} = ${seq4[0]} - ${seq4[1]} = ${step4}`,
            `${seq4[3]} - ${step4} = ${ans4}`,
          ],
          finalAnswerLatex: `${ans4}`,
          finalNumericValue: ans4,
        }
      ),
    },
    {
      id: `jan-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'interval',
      prompt: `Quy luật hiệu tăng dần đều: Tìm số hạng thứ 6 của dãy ${seq5.slice(0, 5).join('; ')}; ?`,
      options: makeOptions(`${ans5}`, [`${ans5 - 2}`, `${ans5 + 2}`, `${ans5 + 4}`]),
      correctAnswer: `${ans5}`,
      hint: `Ghi các bước nhảy liên tiếp: +${d0_5}, +${d0_5 + 2}, +${d0_5 + 4}, +${d0_5 + 6}. Bước nhảy tiếp theo là bao nhiêu?`,
      stepByStepExplanation: [
        `Các bước nhảy tăng thêm 2 sau mỗi chặng: +${d0_5}, +${d0_5 + 2}, +${d0_5 + 4}, +${d0_5 + 6} → bước tiếp theo là +${d0_5 + 8}.`,
        `Số thứ 6 là: ${seq5[4]} + ${d0_5 + 8} = ${ans5}.`,
      ],
      visualModel: buildSequenceVisual(
        'Chuỗi số có bước nhảy tăng thêm 2 mỗi chặng',
        {
          itemName: 'bước nhảy',
          unitLabel: 'chặng',
          actionPrompt: 'Bấm "Hiện gợi ý bước nhảy" để nhìn thấy dãy bước nhảy đang tăng thêm 2 mỗi lần!',
          interactiveRule: 'Hiệu hai số liên tiếp lập thành dãy tăng thêm 2',
          groups: [
            cg('g_sq5a', 'Số thứ 5', '🔢', 1, seq5[4], '#0284C7', false, 'measurement'),
            cg('g_sq5b', 'Bước nhảy kế tiếp', '🚀', 1, d0_5 + 8, '#10B981', true, 'interval'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'increasing_diff',
          terms: seq5,
          missingIndex: 5,
          stepLabels: [
            `+${d0_5}`,
            `+${d0_5 + 2}`,
            `+${d0_5 + 4}`,
            `+${d0_5 + 6}`,
            `+${d0_5 + 8}`,
          ],
          ruleHint: 'Mỗi bước nhảy sau lớn hơn bước nhảy ngay trước nó 2 đơn vị!',
          expectedValue: ans5,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Bước nhảy mới} = ${d0_5 + 6} \\;?\\; 2`,
            `\\text{Số thứ 6} = ${seq5[4]} \\;?\\; \\text{Bước nhảy mới} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bước nhảy thứ 5} = ${d0_5 + 6} + 2 = ${d0_5 + 8}`,
            `${seq5[4]} + ${d0_5 + 8} = ${ans5}`,
          ],
          finalAnswerLatex: `${ans5}`,
          finalNumericValue: ans5,
        }
      ),
    },
    {
      id: `jan-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Tìm số còn thiếu ở giữa dãy số cách đều: ${seq6[0]}; ${seq6[1]}; ${seq6[2]}; ?; ${seq6[4]}.`,
      options: makeOptions(`${ans6}`, [`${ans6 + step6}`, `${ans6 - 25}`, `${ans6 + 50}`]),
      correctAnswer: `${ans6}`,
      hint: `Tìm khoảng cách từ ${seq6[0]} đến ${seq6[1]}, cộng vào ${seq6[2]} rồi kiểm tra lại với ${seq6[4]}.`,
      stepByStepExplanation: [
        `Bước nhảy của dãy là: ${seq6[1]} - ${seq6[0]} = ${step6}.`,
        `Số còn thiếu là: ${seq6[2]} + ${step6} = ${ans6} (Kiểm tra: ${ans6} + ${step6} = ${seq6[4]}).`,
      ],
      visualModel: buildSequenceVisual(
        'Tìm số hạng bị khuyết giữa chuỗi số cách đều',
        {
          itemName: 'số hạng',
          unitLabel: 'ô',
          actionPrompt: 'Tìm bước nhảy đều từ các ô đầu rồi kiểm chứng xem cộng tiếp có khớp ô cuối không.',
          interactiveRule: 'Số khuyết đứng đúng giữa hai số liền kề cách đều nhau',
          groups: [
            cg('g_sq6a', 'Số thứ 3', '🔢', 1, seq6[2], '#0284C7', false, 'measurement'),
            cg('g_sq6b', 'Bước nhảy đều', '➡️', 1, step6, '#7C3AED', false, 'interval'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'arithmetic',
          terms: seq6,
          missingIndex: 3,
          stepLabels: [`+${step6}`, `+${step6}`, `+${step6}`, `+${step6}`],
          ruleHint: `Mỗi chặng cộng thêm ${step6} và kiểm tra khớp với ô cuối ${seq6[4]}.`,
          expectedValue: ans6,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Bước nhảy} = ${seq6[1]} \\;?\\; ${seq6[0]}`,
            `\\text{Số thứ 4} = ${seq6[2]} \\;?\\; \\text{Bước nhảy} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bước nhảy} = ${seq6[1]} - ${seq6[0]} = ${step6}`,
            `${seq6[2]} + ${step6} = ${ans6}`,
          ],
          finalAnswerLatex: `${ans6}`,
          finalNumericValue: ans6,
        }
      ),
    },
    {
      id: `jan-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Toán đố 2 bước phạm vi 10 000: Kho A có ${depotA7} kg gạo. Kho B có nhiều hơn Kho A là ${extraB7} kg gạo. Hỏi CẢ HAI kho có tất cả bao nhiêu ki-lô-gam gạo?`,
      options: makeOptions(`${total7} kg`, [
        `${depotB7} kg`,
        `${total7 - extraB7} kg`,
        `${total7 + 100} kg`,
      ]),
      correctAnswer: `${total7} kg`,
      hint: `Bước 1: Tìm số gạo ở Kho B (${depotA7} + ${extraB7}). Bước 2: Cộng cả Kho A và Kho B.`,
      stepByStepExplanation: [
        `Số gạo ở Kho B là: ${depotA7} + ${extraB7} = ${depotB7} (kg).`,
        `Tổng số gạo ở cả hai kho là: ${depotA7} + ${depotB7} = ${total7} (kg).`,
      ],
      visualModel: buildBarVisual(
        'Sơ đồ thanh So sánh & Phần–Tổng phạm vi 10 000',
        {
          itemName: 'kg gạo',
          unitLabel: 'kg',
          actionPrompt: 'Kho B gồm phần bằng Kho A cộng thêm phần hơn; sau đó gộp cả hai kho.',
          interactiveRule: 'Tính Kho B trước, rồi cộng Kho A và Kho B',
          groups: [
            cg('g_da7', 'Kho A', '🌾', 1, depotA7, '#0284C7', false, 'measurement'),
            cg('g_ex7', 'Phần Kho B nhiều hơn', '➕', 1, extraB7, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: depotA7,
          unitName: 'kg',
          bars: [
            makeBarSpec('bar_a7', 'Kho A', 1, depotA7, 0, '#0284C7', `${depotA7} kg`),
            makeBarSpec('bar_b7', 'Kho B', 1, depotA7, extraB7, '#10B981', '? kg', {
              isUnknown: true,
              highlightNote: `+${extraB7} kg`,
            }),
          ],
          differenceBracket: {
            longerBarId: 'bar_b7',
            shorterBarId: 'bar_a7',
            numericValue: extraB7,
            displayLabel: `Nhiều hơn ${extraB7} kg`,
          },
          totalBracket: {
            targetBarIds: ['bar_a7', 'bar_b7'],
            numericValue: total7,
            displayLabel: 'Tổng cả 2 kho = ? kg',
            isUnknown: true,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Kho B} = ${depotA7} \\;?\\; ${extraB7}`,
            `\\text{Tổng cả 2 kho} = ${depotA7} \\;?\\; \\text{Kho B} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Kho B} = ${depotA7} + ${extraB7} = ${depotB7}\\;\\text{kg}`,
            `\\text{Tổng 2 kho} = ${depotA7} + ${depotB7} = ${total7}\\;\\text{kg}`,
          ],
          finalAnswerLatex: `${total7}\\;\\text{kg}`,
          finalNumericValue: total7,
        }
      ),
    },
    {
      id: `jan-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Tìm số hạng chưa biết X trong phạm vi 10 000: X + ${knownPart8} = ${targetSum8}.`,
      options: makeOptions(`${unknownPart8}`, [
        `${unknownPart8 + 100}`,
        `${unknownPart8 - 100}`,
        `${targetSum8 + knownPart8}`,
      ]),
      correctAnswer: `${unknownPart8}`,
      hint: `Dùng sơ đồ Phần – Tổng: muốn tìm một phần chưa biết, lấy Tổng trừ đi phần đã biết.`,
      stepByStepExplanation: [
        `Muốn tìm số hạng chưa biết X, ta lấy tổng trừ đi số hạng đã biết.`,
        `X = ${targetSum8} - ${knownPart8} = ${unknownPart8}.`,
      ],
      visualModel: buildBarVisual(
        'Tìm số hạng chưa biết bằng Sơ đồ Phần – Tổng',
        {
          itemName: 'đơn vị',
          unitLabel: 'đơn vị',
          actionPrompt: 'Tổng bằng hai thanh ghép lại; lấy Tổng trừ phần đã biết để tìm thanh X.',
          interactiveRule: 'Số hạng chưa biết = Tổng − Số hạng đã biết',
          groups: [
            cg('g_sum8', 'Tổng', '📦', 1, targetSum8, '#0284C7', false, 'measurement'),
            cg('g_kn8', 'Phần đã biết', '🧩', 1, knownPart8, '#7C3AED', false, 'measurement'),
          ],
        },
        {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: 1,
          unitName: 'đơn vị',
          bars: [
            makeBarSpec('bar_x8', 'Số X', 1, unknownPart8, 0, '#F59E0B', '?', {
              isUnknown: true,
            }),
            makeBarSpec('bar_k8', 'Số đã biết', 1, knownPart8, 0, '#0284C7', `${knownPart8}`),
          ],
          totalBracket: {
            targetBarIds: ['bar_x8', 'bar_k8'],
            numericValue: targetSum8,
            displayLabel: `Tổng = ${targetSum8}`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`X = ${targetSum8} \\;?\\; ${knownPart8} = ?`],
          fullLatexSteps: [`X = ${targetSum8} - ${knownPart8} = ${unknownPart8}`],
          finalAnswerLatex: `${unknownPart8}`,
          finalNumericValue: unknownPart8,
        }
      ),
    },
    {
      id: `jan-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Dãy quy luật Fibonacci (cộng hai số đứng ngay trước): Tìm số hạng thứ 6 của dãy ${seq9.slice(0, 5).join('; ')}; ?`,
      options: makeOptions(`${ans9}`, [
        `${ans9 + seq9[3]}`,
        `${seq9[4] * 2}`,
        `${ans9 - seq9[2]}`,
      ]),
      correctAnswer: `${ans9}`,
      hint: `Kiểm tra: ${seq9[0]} + ${seq9[1]} = ${seq9[2]}; ${seq9[1]} + ${seq9[2]} = ${seq9[3]}. Vậy số thứ 6 bằng tổng hai số nào?`,
      stepByStepExplanation: [
        `Quy luật Fibonacci: kể từ số thứ 3, mỗi số bằng tổng hai số đứng liền trước nó.`,
        `Số thứ 6 = ${seq9[3]} + ${seq9[4]} = ${ans9}.`,
      ],
      visualModel: buildSequenceVisual(
        'Giải mã chuỗi Fibonacci — Cộng hai số liền trước',
        {
          itemName: 'số hạng',
          unitLabel: 'số',
          actionPrompt: 'Cộng 2 ô đứng liền trước để tạo ra ô đứng ngay sau chúng.',
          interactiveRule: 'Số mới = Số trước đó + Số ngay trước nữa',
          groups: [
            cg('g_f9a', 'Số thứ 4', '🔵', 1, seq9[3], '#0284C7', false, 'measurement'),
            cg('g_f9b', 'Số thứ 5', '🟢', 1, seq9[4], '#10B981', false, 'measurement'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'fibonacci_sum',
          terms: seq9,
          missingIndex: 5,
          stepLabels: ['+', '+', '+', '+', '+'],
          ruleHint: 'Quy luật Fibonacci: mỗi số kể từ ô thứ 3 bằng tổng 2 số đứng ngay trước nó!',
          expectedValue: ans9,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Số thứ 6} = ${seq9[3]} \\;?\\; ${seq9[4]} = ?`],
          fullLatexSteps: [`${seq9[3]} + ${seq9[4]} = ${ans9}`],
          finalAnswerLatex: `${ans9}`,
          finalNumericValue: ans9,
        }
      ),
    },
    {
      id: `jan-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Chuỗi gấp lần: Tìm số hạng thứ 6 của dãy quy luật ${seq10.slice(0, 5).join('; ')}; ?`,
      options: makeOptions(`${ans10}`, [`${seq10[4] + m0 * 8}`, `${ans10 + m0}`, `${ans10 - 4}`]),
      correctAnswer: `${ans10}`,
      hint: `So sánh mỗi số với số đứng trước nó: ${seq10[1]} gấp mấy lần ${seq10[0]}?`,
      stepByStepExplanation: [
        `Quy luật gấp đôi: mỗi số đứng sau gấp 2 lần số đứng ngay trước nó (× 2).`,
        `Số thứ 6 là: ${seq10[4]} × 2 = ${ans10}.`,
      ],
      visualModel: buildSequenceVisual(
        'Chuỗi quy luật nhân gấp đôi (×2)',
        {
          itemName: 'số hạng',
          unitLabel: 'lần',
          actionPrompt: 'Kiểm tra tỉ số giữa hai ô liên tiếp để nhận ra quy luật nhân đều.',
          interactiveRule: 'Mỗi bước nhảy nhân lên cùng một số lần',
          groups: [
            cg('g_m10a', 'Số thứ 5', '⚡', 1, seq10[4], '#7C3AED', false, 'measurement'),
            cg('g_m10b', 'Hệ số gấp lần', '✖️', 1, 2, '#F59E0B', false, 'interval'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'multiplicative',
          terms: seq10,
          missingIndex: 5,
          stepLabels: ['×2', '×2', '×2', '×2', '×2'],
          ruleHint: 'Mỗi số hạng kế tiếp đều gấp đôi (×2) số hạng liền trước!',
          expectedValue: ans10,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Số thứ 6} = ${seq10[4]} \\;?\\; 2 = ?`],
          fullLatexSteps: [`${seq10[4]} \\times 2 = ${ans10}`],
          finalAnswerLatex: `${ans10}`,
          finalNumericValue: ans10,
        }
      ),
    },
    {
      id: `jan-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Olympic Dãy xen kẽ 2 nhánh: Tìm số hạng thứ 7 của dãy ${seq11.slice(0, 6).join('; ')}; ?`,
      options: makeOptions(`${ans11}`, [
        `${evenStart11 - 3 * evenStep11}`,
        `${ans11 + oddStep11}`,
        `${ans11 - 2}`,
      ]),
      correctAnswer: `${ans11}`,
      hint: `Dãy bị trộn 2 nhánh xen kẽ! Hãy tách riêng các số ở vị trí LẺ (Số 1, Số 3, Số 5, Số 7): ${seq11[0]}; ${seq11[2]}; ${seq11[4]}; ?`,
      stepByStepExplanation: [
        `Nhánh vị trí lẻ (Số 1, 3, 5, 7): ${seq11[0]}; ${seq11[2]}; ${seq11[4]} → mỗi lần tăng thêm ${oddStep11}.`,
        `Nhánh vị trí chẵn (Số 2, 4, 6): ${seq11[1]}; ${seq11[3]}; ${seq11[5]} → mỗi lần giảm ${evenStep11}.`,
        `Vì dấu ? nằm ở vị trí thứ 7 (vị trí lẻ) nên giá trị là: ${seq11[4]} + ${oddStep11} = ${ans11}.`,
      ],
      visualModel: buildSequenceVisual(
        'Giải mã dãy số xen kẽ hai nhánh (Vị trí lẻ ↔ Vị trí chẵn)',
        {
          itemName: 'nhánh lẻ',
          unitLabel: 'ô',
          actionPrompt: 'Bỏ qua các ô chẵn, chỉ theo dõi nhánh vị trí lẻ: Ô 1 → Ô 3 → Ô 5 → Ô 7.',
          interactiveRule: 'Tách dãy xen kẽ thành 2 dãy độc lập theo vị trí lẻ và chẵn',
          groups: [
            cg('g_alt1', 'Số vị trí thứ 5 (nhánh lẻ)', '🔵', 1, seq11[4], '#0284C7', false, 'measurement'),
            cg('g_alt2', 'Bước tăng nhánh lẻ', '↗️', 1, oddStep11, '#10B981', false, 'interval'),
          ],
        },
        {
          kind: 'sequence_pattern',
          patternKind: 'alternating',
          terms: seq11,
          missingIndex: 6,
          stepLabels: ['Nhánh', 'Nhánh', 'Nhánh', 'Nhánh', 'Nhánh', '?'],
          ruleHint: `Tách riêng vị trí lẻ (1, 3, 5, 7): ${seq11[0]} → ${seq11[2]} → ${seq11[4]} → ? (tăng đều ${oddStep11}).`,
          expectedValue: ans11,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nhánh lẻ: } ${seq11[0]},\\; ${seq11[2]},\\; ${seq11[4]},\\; ?`,
            `\\text{Số thứ 7} = ${seq11[4]} \\;?\\; ${oddStep11} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Quy luật nhánh lẻ: } +${oddStep11}`,
            `${seq11[4]} + ${oddStep11} = ${ans11}`,
          ],
          finalAnswerLatex: `${ans11}`,
          finalNumericValue: ans11,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 3 (NGÀY 15 – 21): DIỆN TÍCH Ô VUÔNG, HÌNH VUÔNG, CHỮ NHẬT, CHỮ L & KHUNG VIỀN
// ============================================================================

const WEEK3_THEMES = [
  {
    title: 'Ngày 15: Khái niệm Diện tích (cm², m²) & Đếm ô vuông đơn vị',
    topicTag: 'Đếm ô vuông diện tích',
    goals: [
      'Hiểu bản chất Diện tích là độ lớn bề mặt bên trong hình (đơn vị cm², m²)',
      'Biết ghép 2 nửa ô tam giác thành 1 ô vuông nguyên khi đếm diện tích',
    ],
  },
  {
    title: 'Ngày 16: Diện tích Hình chữ nhật (Dài × Rộng) & Toán ngược tìm cạnh',
    topicTag: 'Diện tích chữ nhật',
    goals: [
      'Vận dụng công thức S = Dài × Rộng từ lưới hàng × cột ô vuông',
      'Giải bài toán ngược tìm Chiều dài hoặc Chiều rộng khi biết Diện tích và 1 cạnh',
    ],
  },
  {
    title: 'Ngày 17: Diện tích Hình vuông (Cạnh × Cạnh) & Tìm cạnh từ Diện tích',
    topicTag: 'Diện tích hình vuông',
    goals: [
      'Tính diện tích hình vuông S = Cạnh × Cạnh (tránh nhầm với Chu vi = Cạnh × 4!)',
      'Suy ngược độ dài cạnh hình vuông từ diện tích (VD: 49 cm² → cạnh 7 cm)',
    ],
  },
  {
    title: 'Ngày 18: Đổi đơn vị chiều dài (m–dm–cm) trước khi tính Diện tích',
    topicTag: 'Đổi đơn vị diện tích',
    goals: [
      'Phát hiện bẫy hai cạnh khác đơn vị đo trước khi nhân tính diện tích',
      'So sánh diện tích hai mảnh vườn / hai tấm bìa chính xác',
    ],
  },
  {
    title: 'Ngày 19: Diện tích Hình ghép chữ L — Chiến lược Cắt cộng & Trừ bù',
    topicTag: 'Diện tích hình chữ L',
    goals: [
      'Làm chủ 2 chiến lược Singapore: Cắt thành 2 hình chữ nhật (A + B) và Trừ bù (Khung − Khuyết)',
      'Kiểm chứng hai cách làm luôn cho cùng một diện tích chính xác',
    ],
  },
  {
    title: 'Ngày 20: Diện tích Khung viền, Lối đi quanh vườn & Lát gạch nền nhà',
    topicTag: 'Khung viền & Lát gạch',
    goals: [
      'Tính diện tích phần lối đi / viền khung tranh bằng S_ngoài − S_trong',
      'Giải bài toán đếm số viên gạch hình vuông cần lát kín nền phòng',
    ],
  },
  {
    title: 'Ngày 21: Tổng ôn Tuần 3 — Chinh phục Diện tích Hình phẳng & Hình ghép',
    topicTag: 'Tổng ôn Tuần 3',
    goals: [
      'Thành thạo mọi dạng tính diện tích hình cơ bản, hình ghép chữ L và khung viền',
      'Sẵn sàng vượt qua Bài Kiểm Tra 15 Phút Cuối Tuần 3',
    ],
  },
];

function buildWeek3Questions(day: number): InMonthQuestion[] {
  const k = day - 14; // 1..7

  // Q1 (warmup): Count full unit squares + half-unit triangles (2 halves = 1 full)
  const fullTiles1 = 8 + k * 2; // 10..22
  const halfTiles1 = 4 + (k % 3) * 2; // 6, 8, 4, 6, 8, 4, 6 (always even!)
  const area1 = fullTiles1 + halfTiles1 / 2;

  // Q2 (warmup): Rectangle area (same unit cm)
  const rectL2 = 7 + k; // 8..14
  const rectW2 = 4 + (k % 4); // 5, 6, 7, 4, 5, 6, 7
  const area2 = rectL2 * rectW2;

  // Q3 (visualModel): Square area (side × side)
  const sqSide3 = 4 + k; // 5..11
  const area3 = sqSide3 * sqSide3;

  // Q4 (visualModel): Reverse rectangle — given Area and Width, find Length
  const revW4 = 4 + (k % 5); // 5..8, 4, 5, 6
  const revL4 = revW4 + 3 + (k % 4); // always > revW4
  const revArea4 = revL4 * revW4;

  // Q5 (visualModel): Reverse square — given Area, find Side
  const revSqSide5 = 3 + k; // 4..10
  const revSqArea5 = revSqSide5 * revSqSide5;

  // Q6 (practice): Unit conversion trap before calculating rectangle area (dm & cm -> cm²)
  const dmL6 = 1 + (k % 3); // 2, 3, 1, 2, 3, 1, 2 dm => 20, 30, 10 cm
  const cmL6 = dmL6 * 10;
  const cmW6 = 4 + (k % 5); // 5..8, 4, 5, 6 cm
  const area6 = cmL6 * cmW6;

  // Q7 (practice): L-shape area (Outer - Cutout)
  const lOutW7 = 9 + k; // 10..16
  const lOutH7 = 7 + (k % 4); // 8, 9, 10, 7, 8, 9, 10
  const lCutW7 = 3 + (k % 3); // 4, 5, 3, ...
  const lCutH7 = 3 + (k % 2); // 4, 3, ...
  const lArea7 = lOutW7 * lOutH7 - lCutW7 * lCutH7;

  // Q8 (practice): Frame border / Walkway area around garden (S_outer - S_inner)
  const inW8 = 6 + k; // 7..13
  const inH8 = 4 + (k % 4); // 5..7, 4..7
  const outW8 = inW8 + 2;
  const outH8 = inH8 + 2;
  const borderArea8 = outW8 * outH8 - inW8 * inH8;

  // Q9 (practice): Tiling a rectangular floor with square tiles (2x2 m² or 4 m² per tile -> clean integer!)
  const tileSide9 = 2; // 2 dm x 2 dm = 4 dm²
  const floorCols9 = 4 + (k % 5); // 5..8, 4..6 tiles along length
  const floorRows9 = 3 + (k % 4); // 4..6, 3..6 tiles along width
  const floorL9 = floorCols9 * tileSide9;
  const floorW9 = floorRows9 * tileSide9;
  const floorArea9 = floorL9 * floorW9;
  const tileCount9 = floorCols9 * floorRows9;

  // Q10 (challenge): Compare area difference between a rectangle and a square
  const cmpL10 = 10 + k; // 11..17
  const cmpW10 = 6 + (k % 3); // 7, 8, 6...
  const cmpSq10 = 7 + (k % 3); // 8, 9, 7...
  const bigL10 = Math.max(cmpL10, cmpSq10 + 3);
  const bigArea10 = bigL10 * cmpW10;
  const smallSq10 = cmpW10; // square side = cmpW10 -> bigArea10 - smallSq10^2 = (bigL10 - cmpW10) * cmpW10 > 0 ALWAYS!
  const smallSqArea10 = smallSq10 * smallSq10;
  const diffArea10 = bigArea10 - smallSqArea10;

  // Q11 (challenge): Garden with uniform walkway of width 1 m all around — students MUST remember +2 on BOTH length and width!
  const gardenL11 = 8 + k; // 9..15 m
  const gardenW11 = 5 + (k % 4); // 6, 7, 8, 5, 6, 7, 8 m
  const totalL11 = gardenL11 + 2;
  const totalW11 = gardenW11 + 2;
  const walkwayArea11 = totalL11 * totalW11 - gardenL11 * gardenW11;

  return [
    {
      id: `jan-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Trên lưới ô vuông (mỗi ô vuông nhỏ có diện tích 1 cm²), một hình đa giác phủ kín ${fullTiles1} ô vuông nguyên và ${halfTiles1} nửa ô tam giác. Tính diện tích hình đó.`,
      options: makeOptions(`${area1} cm²`, [
        `${fullTiles1 + halfTiles1} cm²`,
        `${area1 + 2} cm²`,
        `${area1 - 1} cm²`,
      ]),
      correctAnswer: `${area1} cm²`,
      hint: `Ghép 2 nửa ô tam giác thành 1 ô vuông nguyên (${halfTiles1} : 2), rồi cộng với ${fullTiles1} ô vuông nguyên.`,
      stepByStepExplanation: [
        `Số ô vuông nguyên ghép được từ ${halfTiles1} nửa ô tam giác là: ${halfTiles1} : 2 = ${halfTiles1 / 2} (ô vuông).`,
        `Tổng diện tích hình là: ${fullTiles1} + ${halfTiles1 / 2} = ${area1} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Đếm ô vuông đơn vị & ghép 2 nửa ô tam giác = 1 cm²',
        {
          itemName: 'ô vuông 1 cm²',
          unitLabel: 'ô',
          actionPrompt: 'Đếm các ô màu xanh (1 cm²) và ghép từng cặp 2 tam giác vàng thành 1 ô vuông nguyên.',
          interactiveRule: '2 nửa ô tam giác = 1 ô vuông nguyên (1 cm²)',
          groups: [
            cg('g_ft1', 'Ô vuông nguyên', '🟦', fullTiles1, 1, '#0284C7', false, 'units'),
            cg('g_ht1', 'Nửa ô tam giác', '🔺', halfTiles1, 1, '#F59E0B', false, 'units'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'unit_grid',
          outerWidth: 8,
          outerHeight: 4,
          fullUnitTiles: fullTiles1,
          halfUnitTiles: halfTiles1,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: area1,
          expectedNumericResult: area1,
          visualHint: 'Ghép 2 nửa ô tam giác màu vàng thành 1 ô vuông 1 cm²',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Ghép nửa ô} = ${halfTiles1} \\;?\\; 2`,
            `S = ${fullTiles1} \\;?\\; \\text{Số ô ghép} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `${halfTiles1} \\div 2 = ${halfTiles1 / 2}\\;\\text{cm}^2`,
            `S = ${fullTiles1} + ${halfTiles1 / 2} = ${area1}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${area1}\\;\\text{cm}^2`,
          finalNumericValue: area1,
        }
      ),
    },
    {
      id: `jan-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'bar_model',
      prompt: `Một tấm pin năng lượng mặt trời hình chữ nhật có chiều dài ${rectL2} cm và chiều rộng ${rectW2} cm. Tính diện tích tấm pin đó.`,
      options: makeOptions(`${area2} cm²`, [
        `${(rectL2 + rectW2) * 2} cm²`,
        `${area2 + rectL2} cm²`,
        `${area2 - rectW2} cm²`,
      ]),
      correctAnswer: `${area2} cm²`,
      hint: `Diện tích hình chữ nhật bằng Chiều dài nhân Chiều rộng (cùng đơn vị đo).`,
      stepByStepExplanation: [
        `Tấm pin gồm ${rectW2} hàng, mỗi hàng có ${rectL2} ô vuông 1 cm².`,
        `Diện tích tấm pin là: ${rectL2} × ${rectW2} = ${area2} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        `Tính diện tích hình chữ nhật (${rectL2} cm × ${rectW2} cm)`,
        {
          itemName: 'ô vuông 1 cm²',
          unitLabel: 'cm',
          actionPrompt: 'Quan sát lưới ô vuông bên trong: có bao nhiêu hàng và mỗi hàng có bao nhiêu ô?',
          interactiveRule: 'Diện tích hình chữ nhật = Chiều dài × Chiều rộng',
          groups: [
            cg('g_l2', 'Chiều dài', '📏', 1, rectL2, '#0284C7', false, 'measurement'),
            cg('g_w2', 'Chiều rộng', '📐', 1, rectW2, '#10B981', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'rect_area',
          outerWidth: rectL2,
          outerHeight: rectW2,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: area2,
          expectedNumericResult: area2,
          showInteractiveToggle: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`S = ${rectL2} \\;?\\; ${rectW2} = ?\\;\\text{cm}^2`],
          fullLatexSteps: [`S = ${rectL2} \\times ${rectW2} = ${area2}\\;\\text{cm}^2`],
          finalAnswerLatex: `${area2}\\;\\text{cm}^2`,
          finalNumericValue: area2,
        }
      ),
    },
    {
      id: `jan-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Một viên gạch lát sàn hình vuông có cạnh dài ${sqSide3} cm. Tính diện tích viên gạch đó.`,
      options: makeOptions(`${area3} cm²`, [
        `${sqSide3 * 4} cm²`,
        `${area3 + sqSide3} cm²`,
        `${area3 - sqSide3} cm²`,
      ]),
      correctAnswer: `${area3} cm²`,
      hint: `Cẩn thận đừng nhầm với Chu vi (cạnh × 4)! Diện tích hình vuông = Cạnh × Cạnh.`,
      stepByStepExplanation: [
        `Diện tích hình vuông bằng độ dài một cạnh nhân với chính nó.`,
        `Diện tích viên gạch là: ${sqSide3} × ${sqSide3} = ${area3} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        `Diện tích hình vuông cạnh ${sqSide3} cm`,
        {
          itemName: 'ô vuông 1 cm²',
          unitLabel: 'cm',
          actionPrompt: 'Hình vuông có số hàng và số cột ô vuông bằng nhau đều bằng độ dài cạnh.',
          interactiveRule: 'Diện tích hình vuông = Cạnh × Cạnh (khác với Chu vi = Cạnh × 4)',
          groups: [
            cg('g_s3', 'Cạnh hình vuông', '🟦', 1, sqSide3, '#0284C7', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'square_area',
          outerWidth: sqSide3,
          outerHeight: sqSide3,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: area3,
          expectedNumericResult: area3,
          showInteractiveToggle: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`S = ${sqSide3} \\;?\\; ${sqSide3} = ?\\;\\text{cm}^2`],
          fullLatexSteps: [`S = ${sqSide3} \\times ${sqSide3} = ${area3}\\;\\text{cm}^2`],
          finalAnswerLatex: `${area3}\\;\\text{cm}^2`,
          finalNumericValue: area3,
        }
      ),
    },
    {
      id: `jan-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Toán ngược Diện tích: Một mảnh đất hình chữ nhật có diện tích ${revArea4} m² và chiều rộng ${revW4} m. Tính chiều dài mảnh đất đó.`,
      options: makeOptions(`${revL4} m`, [
        `${revL4 + 2} m`,
        `${revL4 - 1} m`,
        `${revArea4 - revW4} m`,
      ]),
      correctAnswer: `${revL4} m`,
      hint: `Vì Dài × Rộng = Diện tích, nên muốn tìm Chiều dài ta lấy Diện tích chia cho Chiều rộng.`,
      stepByStepExplanation: [
        `Chiều dài mảnh đất bằng Diện tích chia cho Chiều rộng.`,
        `Chiều dài là: ${revArea4} : ${revW4} = ${revL4} (m).`,
      ],
      visualModel: buildAreaGridVisual(
        `Tìm chiều dài hình chữ nhật biết diện tích ${revArea4} m²`,
        {
          itemName: 'mét',
          unitLabel: 'm',
          actionPrompt: 'Chia tổng diện tích thành các dải theo chiều rộng để tìm ra chiều dài.',
          interactiveRule: 'Chiều dài = Diện tích : Chiều rộng',
          groups: [
            cg('g_ar4', 'Diện tích', '🟩', 1, revArea4, '#10B981', false, 'measurement'),
            cg('g_rw4', 'Chiều rộng', '📐', 1, revW4, '#0284C7', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'rect_area',
          outerWidth: revL4,
          outerHeight: revW4,
          lengthUnit: 'm',
          areaUnit: 'm²',
          unknownTarget: 'length',
          expectedArea: revArea4,
          expectedNumericResult: revL4,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Chiều dài} = ${revArea4} \\;?\\; ${revW4} = ?\\;\\text{m}`],
          fullLatexSteps: [`\\text{Chiều dài} = ${revArea4} \\div ${revW4} = ${revL4}\\;\\text{m}`],
          finalAnswerLatex: `${revL4}\\;\\text{m}`,
          finalNumericValue: revL4,
        }
      ),
    },
    {
      id: `jan-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Tìm ngược cạnh Hình vuông: Một khung ảnh hình vuông có diện tích ${revSqArea5} cm². Hỏi cạnh của khung ảnh dài bao nhiêu xăng-ti-mét?`,
      options: makeOptions(`${revSqSide5} cm`, [
        `${revSqSide5 + 1} cm`,
        `${revSqSide5 + 2} cm`,
        `${Math.max(2, revSqSide5 - 1)} cm`,
      ]),
      correctAnswer: `${revSqSide5} cm`,
      hint: `Hãy nhẩm xem số nào nhân với chính nó bằng ${revSqArea5}? (? × ? = ${revSqArea5})`,
      stepByStepExplanation: [
        `Ta có: ${revSqSide5} × ${revSqSide5} = ${revSqArea5}.`,
        `Vậy độ dài cạnh của khung ảnh hình vuông là ${revSqSide5} cm.`,
      ],
      visualModel: buildAreaGridVisual(
        `Suy ngược cạnh hình vuông có diện tích ${revSqArea5} cm²`,
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Tìm số tự nhiên nhân với chính nó bằng đúng số ô vuông diện tích.',
          interactiveRule: 'Cạnh × Cạnh = Diện tích hình vuông',
          groups: [
            cg('g_sa5', 'Diện tích hình vuông', '🟦', 1, revSqArea5, '#7C3AED', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'square_area',
          outerWidth: revSqSide5,
          outerHeight: revSqSide5,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'side',
          expectedArea: revSqArea5,
          expectedNumericResult: revSqSide5,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`? \\;?\\; ? = ${revSqArea5}\\;\\text{cm}^2`],
          fullLatexSteps: [
            `${revSqSide5} \\times ${revSqSide5} = ${revSqArea5}`,
            `\\text{Cạnh hình vuông} = ${revSqSide5}\\;\\text{cm}`,
          ],
          finalAnswerLatex: `${revSqSide5}\\;\\text{cm}`,
          finalNumericValue: revSqSide5,
        }
      ),
    },
    {
      id: `jan-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Bẫy đổi đơn vị: Một tấm bảng chữ nhật có chiều dài ${dmL6} dm và chiều rộng ${cmW6} cm. Tính diện tích tấm bảng theo đơn vị cm².`,
      options: makeOptions(`${area6} cm²`, [
        `${dmL6 * cmW6} cm²`,
        `${(cmL6 + cmW6) * 2} cm²`,
        `${area6 + 10} cm²`,
      ]),
      correctAnswer: `${area6} cm²`,
      hint: `Phải đổi ${dmL6} dm sang cm trước (1 dm = 10 cm), rồi mới nhân với ${cmW6} cm!`,
      stepByStepExplanation: [
        `Đổi chiều dài: ${dmL6} dm = ${cmL6} cm.`,
        `Diện tích tấm bảng là: ${cmL6} × ${cmW6} = ${area6} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        `Đổi đơn vị (${dmL6} dm → cm) trước khi tính diện tích`,
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Thống nhất cả hai cạnh về cùng đơn vị cm trước khi tính diện tích cm².',
          interactiveRule: '1 dm = 10 cm → luôn đổi cùng đơn vị trước khi nhân',
          groups: [
            cg('g_dm6', 'Chiều dài (đã đổi)', '📏', dmL6, 10, '#0284C7', false, 'groups'),
            cg('g_cm6', 'Chiều rộng', '📐', 1, cmW6, '#10B981', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'rect_area',
          outerWidth: cmL6,
          outerHeight: cmW6,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: area6,
          expectedNumericResult: area6,
          visualHint: `Nhớ đổi ${dmL6} dm = ${cmL6} cm trước khi nhân!`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Đổi } ${dmL6}\\;\\text{dm} = ${cmL6}\\;\\text{cm}`,
            `S = ${cmL6} \\;?\\; ${cmW6} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `${dmL6}\\;\\text{dm} = ${cmL6}\\;\\text{cm}`,
            `S = ${cmL6} \\times ${cmW6} = ${area6}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${area6}\\;\\text{cm}^2`,
          finalNumericValue: area6,
        }
      ),
    },
    {
      id: `jan-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Hình ghép chữ L: Một tấm bìa hình chữ nhật kích thước ${lOutW7} cm × ${lOutH7} cm bị cắt bỏ ở góc trên bên phải một hình chữ nhật nhỏ kích thước ${lCutW7} cm × ${lCutH7} cm. Tính diện tích phần bìa hình chữ L còn lại.`,
      options: makeOptions(`${lArea7} cm²`, [
        `${lOutW7 * lOutH7} cm²`,
        `${lOutW7 * lOutH7 + lCutW7 * lCutH7} cm²`,
        `${lArea7 + lCutW7} cm²`,
      ]),
      correctAnswer: `${lArea7} cm²`,
      hint: `Dùng chiến lược Trừ bù Singapore: Tính diện tích hình chữ nhật bao ngoài (${lOutW7} × ${lOutH7}) rồi trừ diện tích góc khuyết (${lCutW7} × ${lCutH7}).`,
      stepByStepExplanation: [
        `Diện tích hình chữ nhật lớn bao ngoài: ${lOutW7} × ${lOutH7} = ${lOutW7 * lOutH7} (cm²).`,
        `Diện tích góc khuyết bị cắt: ${lCutW7} × ${lCutH7} = ${lCutW7 * lCutH7} (cm²).`,
        `Diện tích hình chữ L còn lại: ${lOutW7 * lOutH7} - ${lCutW7 * lCutH7} = ${lArea7} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Diện tích hình chữ L — Chiến lược Cắt cộng ↔ Trừ bù',
        {
          itemName: 'cm²',
          unitLabel: 'cm',
          actionPrompt: 'Bấm nút chuyển đổi để so sánh 2 cách giải Singapore: Cắt thành Phần A + B hoặc Khung ngoài − Khuyết.',
          interactiveRule: 'S_chữ L = S_bao ngoài − S_góc khuyết = S_A + S_B',
          groups: [
            cg('g_lo7', 'Khung bao ngoài', '🟦', lOutW7, lOutH7, '#0284C7', false, 'measurement'),
            cg('g_lc7', 'Góc khuyết cắt đi', '🟥', lCutW7, lCutH7, '#E11D48', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'l_shape_area',
          outerWidth: lOutW7,
          outerHeight: lOutH7,
          cutWidth: lCutW7,
          cutHeight: lCutH7,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: lArea7,
          expectedNumericResult: lArea7,
          showInteractiveToggle: true,
          visualHint: 'Thử bấm nút chuyển giữa Cắt cộng (A + B) và Trừ bù (Khung − Khuyết)!',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `S_{\\text{ngoài}} = ${lOutW7} \\;?\\; ${lOutH7},\\quad S_{\\text{khuyết}} = ${lCutW7} \\;?\\; ${lCutH7}`,
            `S_{\\text{chữ L}} = S_{\\text{ngoài}} \\;?\\; S_{\\text{khuyết}} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `S_{\\text{ngoài}} = ${lOutW7} \\times ${lOutH7} = ${lOutW7 * lOutH7}\\;\\text{cm}^2`,
            `S_{\\text{khuyết}} = ${lCutW7} \\times ${lCutH7} = ${lCutW7 * lCutH7}\\;\\text{cm}^2`,
            `S_{\\text{chữ L}} = ${lOutW7 * lOutH7} - ${lCutW7 * lCutH7} = ${lArea7}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${lArea7}\\;\\text{cm}^2`,
          finalNumericValue: lArea7,
        }
      ),
    },
    {
      id: `jan-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Khung tranh vũ trụ: Một khung tranh hình chữ nhật có kích thước ngoài là ${outW8} cm × ${outH8} cm. Bức ảnh bên trong có kích thước ${inW8} cm × ${inH8} cm. Tính diện tích phần viền khung gỗ bao quanh bức ảnh.`,
      options: makeOptions(`${borderArea8} cm²`, [
        `${outW8 * outH8} cm²`,
        `${inW8 * inH8} cm²`,
        `${borderArea8 + 4} cm²`,
      ]),
      correctAnswer: `${borderArea8} cm²`,
      hint: `Diện tích phần viền khung = Diện tích khung ngoài trừ đi Diện tích bức ảnh bên trong.`,
      stepByStepExplanation: [
        `Diện tích khung ngoài: ${outW8} × ${outH8} = ${outW8 * outH8} (cm²).`,
        `Diện tích bức ảnh bên trong: ${inW8} × ${inH8} = ${inW8 * inH8} (cm²).`,
        `Diện tích phần viền khung là: ${outW8 * outH8} - ${inW8 * inH8} = ${borderArea8} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Tính diện tích phần viền khung tranh (S_ngoài − S_trong)',
        {
          itemName: 'cm²',
          unitLabel: 'cm',
          actionPrompt: 'Lấy toàn bộ diện tích khung lớn trừ đi phần bức ảnh lõi ở giữa.',
          interactiveRule: 'S_viền = S_khung ngoài − S_lõi trong',
          groups: [
            cg('g_fo8', 'Khung ngoài', '🟨', outW8, outH8, '#F59E0B', false, 'measurement'),
            cg('g_fi8', 'Ảnh bên trong', '🟦', inW8, inH8, '#0284C7', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'frame_border',
          outerWidth: outW8,
          outerHeight: outH8,
          innerWidth: inW8,
          innerHeight: inH8,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: borderArea8,
          expectedNumericResult: borderArea8,
          visualHint: 'Phần viền tô vàng chính là hiệu diện tích hình lớn và hình nhỏ bên trong',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `S_{\\text{ngoài}} = ${outW8} \\;?\\; ${outH8},\\quad S_{\\text{trong}} = ${inW8} \\;?\\; ${inH8}`,
            `S_{\\text{viền}} = S_{\\text{ngoài}} \\;?\\; S_{\\text{trong}} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `S_{\\text{ngoài}} = ${outW8} \\times ${outH8} = ${outW8 * outH8}\\;\\text{cm}^2`,
            `S_{\\text{trong}} = ${inW8} \\times ${inH8} = ${inW8 * inH8}\\;\\text{cm}^2`,
            `S_{\\text{viền}} = ${outW8 * outH8} - ${inW8 * inH8} = ${borderArea8}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${borderArea8}\\;\\text{cm}^2`,
          finalNumericValue: borderArea8,
        }
      ),
    },
    {
      id: `jan-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Bài toán Lát gạch: Một sàn phòng hình chữ nhật dài ${floorL9} dm, rộng ${floorW9} dm. Người ta lát kín sàn bằng các viên gạch hình vuông cạnh ${tileSide9} dm. Hỏi cần dùng bao nhiêu viên gạch?`,
      options: makeOptions(`${tileCount9} viên`, [
        `${floorArea9} viên`,
        `${tileCount9 * 2} viên`,
        `${tileCount9 + 4} viên`,
      ]),
      correctAnswer: `${tileCount9} viên`,
      hint: `Bước 1: Tính diện tích sàn (${floorL9} × ${floorW9}) và diện tích 1 viên gạch (${tileSide9} × ${tileSide9}). Bước 2: Lấy diện tích sàn chia cho diện tích 1 viên gạch!`,
      stepByStepExplanation: [
        `Diện tích sàn phòng: ${floorL9} × ${floorW9} = ${floorArea9} (dm²).`,
        `Diện tích 1 viên gạch vuông: ${tileSide9} × ${tileSide9} = ${tileSide9 * tileSide9} (dm²).`,
        `Số viên gạch cần dùng: ${floorArea9} : ${tileSide9 * tileSide9} = ${tileCount9} (viên).`,
      ],
      visualModel: buildAreaGridVisual(
        `Lát sàn ${floorL9} dm × ${floorW9} dm bằng gạch vuông cạnh ${tileSide9} dm`,
        {
          itemName: 'viên gạch',
          unitLabel: 'dm',
          actionPrompt: 'Tính diện tích sàn và diện tích 1 viên gạch vuông (cạnh × cạnh), rồi chia đều.',
          interactiveRule: 'Số viên gạch = Diện tích sàn : Diện tích 1 viên gạch',
          groups: [
            cg('g_fl9', 'Diện tích sàn (dm²)', '🟦', floorL9, floorW9, '#0284C7', false, 'measurement'),
            cg('g_tl9', 'Diện tích 1 gạch (dm²)', '🟨', tileSide9, tileSide9, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'rect_area',
          outerWidth: floorL9,
          outerHeight: floorW9,
          lengthUnit: 'dm',
          areaUnit: 'dm²',
          unknownTarget: 'tile_count',
          expectedArea: floorArea9,
          expectedNumericResult: tileCount9,
          visualHint: `Mỗi viên gạch vuông cạnh ${tileSide9} dm chiếm ${tileSide9 * tileSide9} dm²`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `S_{\\text{sàn}} = ${floorL9} \\;?\\; ${floorW9},\\quad S_{\\text{gạch}} = ${tileSide9} \\;?\\; ${tileSide9}`,
            `\\text{Số viên gạch} = S_{\\text{sàn}} \\;?\\; S_{\\text{gạch}} = ?`,
          ],
          fullLatexSteps: [
            `S_{\\text{sàn}} = ${floorL9} \\times ${floorW9} = ${floorArea9}\\;\\text{dm}^2`,
            `S_{\\text{gạch}} = ${tileSide9} \\times ${tileSide9} = ${tileSide9 * tileSide9}\\;\\text{dm}^2`,
            `\\text{Số gạch} = ${floorArea9} \\div ${tileSide9 * tileSide9} = ${tileCount9}\\;\\text{viên}`,
          ],
          finalAnswerLatex: `${tileCount9}\\;\\text{viên}`,
          finalNumericValue: tileCount9,
        }
      ),
    },
    {
      id: `jan-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách Cắt hình vuông lớn nhất: Từ một tờ giấy hình chữ nhật dài ${bigL10} cm, rộng ${cmpW10} cm, bạn An cắt ra một hình vuông LỚN NHẤT có thể. Tính diện tích phần giấy hình chữ nhật còn lại.`,
      options: makeOptions(`${diffArea10} cm²`, [
        `${smallSqArea10} cm²`,
        `${bigArea10} cm²`,
        `${diffArea10 + cmpW10} cm²`,
      ]),
      correctAnswer: `${diffArea10} cm²`,
      hint: `Hình vuông lớn nhất cắt ra có cạnh đúng bằng chiều rộng (${cmpW10} cm). Phần còn lại có chiều dài còn lại là (${bigL10} - ${cmpW10}) cm!`,
      stepByStepExplanation: [
        `Hình vuông lớn nhất cắt ra có cạnh bằng chiều rộng tờ giấy là ${smallSq10} cm (diện tích = ${smallSq10} × ${smallSq10} = ${smallSqArea10} cm²).`,
        `Diện tích tờ giấy ban đầu: ${bigL10} × ${cmpW10} = ${bigArea10} (cm²).`,
        `Diện tích phần giấy còn lại: ${bigArea10} - ${smallSqArea10} = ${diffArea10} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Cắt hình vuông lớn nhất từ tờ giấy hình chữ nhật',
        {
          itemName: 'cm²',
          unitLabel: 'cm',
          actionPrompt: 'Cạnh hình vuông lớn nhất luôn bằng CHIỀU RỘNG của hình chữ nhật ban đầu.',
          interactiveRule: 'S_còn lại = S_ban đầu − S_hình vuông (cạnh = chiều rộng)',
          groups: [
            cg('g_b10', 'Tờ giấy ban đầu', '🟦', bigL10, cmpW10, '#0284C7', false, 'measurement'),
            cg('g_sq10', 'Cạnh hình vuông cắt đi (= chiều rộng)', '🟨', 1, smallSq10, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'rect_area',
          outerWidth: bigL10,
          outerHeight: cmpW10,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area_diff',
          expectedArea: bigArea10,
          expectedNumericResult: diffArea10,
          visualHint: `Cắt bỏ hình vuông cạnh ${smallSq10} cm khỏi tờ giấy ${bigL10} cm × ${cmpW10} cm`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `S_{\\text{giấy}} = ${bigL10} \\;?\\; ${cmpW10},\\quad S_{\\text{vuông}} = ${smallSq10} \\;?\\; ${smallSq10}`,
            `S_{\\text{còn lại}} = S_{\\text{giấy}} \\;?\\; S_{\\text{vuông}} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `S_{\\text{giấy}} = ${bigL10} \\times ${cmpW10} = ${bigArea10}\\;\\text{cm}^2`,
            `S_{\\text{vuông}} = ${smallSq10} \\times ${smallSq10} = ${smallSqArea10}\\;\\text{cm}^2`,
            `S_{\\text{còn lại}} = ${bigArea10} - ${smallSqArea10} = ${diffArea10}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${diffArea10}\\;\\text{cm}^2`,
          finalNumericValue: diffArea10,
        }
      ),
    },
    {
      id: `jan-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách Olympic Lối đi quanh vườn: Một vườn hoa hình chữ nhật dài ${gardenL11} m, rộng ${gardenW11} m. Người ta làm một lối đi rộng 1 m bao bọc XUNG QUANH bên ngoài vườn hoa. Tính diện tích lối đi đó.`,
      options: makeOptions(`${walkwayArea11} m²`, [
        `${(gardenL11 + 1) * (gardenW11 + 1) - gardenL11 * gardenW11} m²`,
        `${totalL11 * totalW11} m²`,
        `${walkwayArea11 - 4} m²`,
      ]),
      correctAnswer: `${walkwayArea11} m²`,
      hint: `Cẩn thận bẫy 2 bên! Lối đi rộng 1 m ở CẢ HAI PHÍA nên chiều dài mới tăng thêm 2 m (${gardenL11} + 2) và chiều rộng mới cũng tăng thêm 2 m (${gardenW11} + 2)!`,
      stepByStepExplanation: [
        `Chiều dài khung ngoài (gồm cả lối đi 2 bên): ${gardenL11} + 1 + 1 = ${totalL11} (m).`,
        `Chiều rộng khung ngoài (gồm cả lối đi 2 bên): ${gardenW11} + 1 + 1 = ${totalW11} (m).`,
        `Diện tích lối đi = (${totalL11} × ${totalW11}) - (${gardenL11} × ${gardenW11}) = ${totalL11 * totalW11} - ${gardenL11 * gardenW11} = ${walkwayArea11} (m²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Tính diện tích lối đi rộng 1 m bao quanh vườn hoa',
        {
          itemName: 'm²',
          unitLabel: 'm',
          actionPrompt: 'Nhớ cộng 1 m ở CẢ HAI ĐẦU cho chiều dài và CẢ HAI ĐẦU cho chiều rộng trước khi nhân!',
          interactiveRule: 'Mỗi chiều đều tăng thêm 2 × bề rộng lối đi',
          groups: [
            cg('g_gd11', 'Vườn hoa bên trong', '🌸', gardenL11, gardenW11, '#10B981', false, 'measurement'),
            cg('g_out11', 'Khung ngoài (đã +2m mỗi chiều)', '🟨', totalL11, totalW11, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'frame_border',
          outerWidth: totalL11,
          outerHeight: totalW11,
          innerWidth: gardenL11,
          innerHeight: gardenW11,
          lengthUnit: 'm',
          areaUnit: 'm²',
          unknownTarget: 'area',
          expectedArea: walkwayArea11,
          expectedNumericResult: walkwayArea11,
          visualHint: `Lối đi 1 m ở hai bên → Khung ngoài là ${totalL11} m × ${totalW11} m`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Dài ngoài} = ${gardenL11} \\;?\\; 2,\\quad \\text{Rộng ngoài} = ${gardenW11} \\;?\\; 2`,
            `S_{\\text{lối đi}} = S_{\\text{ngoài}} \\;?\\; S_{\\text{vườn}} = ?\\;\\text{m}^2`,
          ],
          fullLatexSteps: [
            `S_{\\text{ngoài}} = ${totalL11} \\times ${totalW11} = ${totalL11 * totalW11}\\;\\text{m}^2`,
            `S_{\\text{vườn}} = ${gardenL11} \\times ${gardenW11} = ${gardenL11 * gardenW11}\\;\\text{m}^2`,
            `S_{\\text{lối đi}} = ${totalL11 * totalW11} - ${gardenL11 * gardenW11} = ${walkwayArea11}\\;\\text{m}^2`,
          ],
          finalAnswerLatex: `${walkwayArea11}\\;\\text{m}^2`,
          finalNumericValue: walkwayArea11,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 4 (NGÀY 22 – 28): LIÊN KẾT DIỆN TÍCH & CHU VI (TƯ DUY SINGAPORE NÂNG CAO)
// ============================================================================

const WEEK4_THEMES = [
  {
    title: 'Ngày 22: Chuyển đổi hai chiều Chu vi ↔ Diện tích ở Hình vuông',
    topicTag: 'Chu vi ↔ Diện tích vuông',
    goals: [
      'Biết Chu vi hình vuông → tìm Cạnh (chia 4) → tính Diện tích (cạnh × cạnh)',
      'Biết Diện tích hình vuông → suy ngược Cạnh → tính Chu vi (cạnh × 4)',
    ],
  },
  {
    title: 'Ngày 23: Biết Chu vi & 1 cạnh Hình chữ nhật → Tìm Diện tích',
    topicTag: 'Chu vi → Diện tích HCN',
    goals: [
      'Đi đúng 3 bước vàng: Nửa chu vi (= P : 2) → Cạnh còn lại → Diện tích',
      'Tránh sai lầm kinh điển lấy thẳng Chu vi trừ đi chiều rộng!',
    ],
  },
  {
    title: 'Ngày 24: Liên kết Chu vi – Sơ đồ thanh (Gấp lần / Hơn kém) → Diện tích',
    topicTag: 'Sơ đồ thanh & Diện tích',
    goals: [
      'Biểu diễn Nửa chu vi (Dài + Rộng) bằng Sơ đồ thanh Singapore',
      'Tìm đúng Dài và Rộng khi biết tỉ số hoặc hiệu hai cạnh, sau đó tính Diện tích',
    ],
  },
  {
    title: 'Ngày 25: Biết Diện tích & 1 cạnh Hình chữ nhật → Tìm Chu vi',
    topicTag: 'Diện tích → Chu vi HCN',
    goals: [
      'Đi ngược chuẩn xác: Cạnh còn lại (= S : cạnh biết) → Chu vi = (Dài + Rộng) × 2',
      'Phân biệt đơn vị cm (Chu vi) với cm² (Diện tích)',
    ],
  },
  {
    title: 'Ngày 26: Cùng Chu vi nhưng Diện tích khác nhau (Định lý Tối ưu hoá)',
    topicTag: 'Cùng chu vi khác diện tích',
    goals: [
      'So sánh diện tích các hình chữ nhật có cùng một sợi dây chu vi',
      'Khám phá quy luật: Cùng chu vi, HÌNH VUÔNG luôn có diện tích LỚN NHẤT',
    ],
  },
  {
    title: 'Ngày 27: Ghép hình vuông & Mở rộng cạnh — Diện tích thay đổi thế nào?',
    topicTag: 'Biến đổi diện tích',
    goals: [
      'Tính diện tích và chu vi khi ghép 2, 3, 4 hình vuông bằng nhau',
      'Giải bài toán tăng chiều dài thêm k cm thì diện tích tăng thêm bao nhiêu cm²',
    ],
  },
  {
    title: 'Ngày 28: Tổng ôn Tuần 4 — Bậc thầy Liên kết Diện tích & Chu vi',
    topicTag: 'Tổng ôn Tuần 4',
    goals: [
      'Tích hợp linh hoạt chuyển đổi hai chiều giữa Chu vi và Diện tích',
      'Sẵn sàng vượt qua Bài Kiểm Tra 15 Phút Cuối Tuần 4',
    ],
  },
];

function buildWeek4Questions(day: number): InMonthQuestion[] {
  const k = day - 21; // 1..7

  // Q1 (warmup): Square Perimeter -> Side -> Area
  const sqSide1 = 4 + k; // 5..11
  const sqPerim1 = sqSide1 * 4;
  const sqArea1 = sqSide1 * sqSide1;

  // Q2 (warmup): Square Area -> Side -> Perimeter
  const sqSide2 = 3 + k; // 4..10
  const sqArea2 = sqSide2 * sqSide2;
  const sqPerim2 = sqSide2 * 4;

  // Q3 (visualModel): Rectangle Perimeter + Width -> Half-P -> Length -> Area
  const w3 = 4 + (k % 4); // 5, 6, 7, 4, 5, 6, 7
  const l3 = w3 + 3 + (k % 4);
  const perim3 = (l3 + w3) * 2;
  const area3 = l3 * w3;

  // Q4 (visualModel): Rectangle Area + Width -> Length -> Perimeter
  const w4 = 4 + (k % 5); // 5, 6, 7, 8, 4, 5, 6
  const l4 = w4 + 4 + (k % 3);
  const area4 = l4 * w4;
  const perim4 = (l4 + w4) * 2;

  // Q5 (visualModel): Same perimeter comparison — Square vs Rectangle
  // Half-perimeter = 2 * s5 => Square side = s5, Rect = (s5+2) x (s5-2) => Area diff = 4 ALWAYS? Let's vary delta d5!
  const s5 = 6 + (k % 5); // 7, 8, 9, 10, 6, 7, 8
  const d5 = 2 + (k % 3); // 3, 4, 2, 3, 4, 2, 3 (always < s5)
  const rL5 = s5 + d5;
  const rW5 = s5 - d5;
  const sqArea5 = s5 * s5;
  const rArea5 = rL5 * rW5;
  const diff5 = sqArea5 - rArea5; // equals d5^2!
  const sharedPerim5 = s5 * 4;

  // Q6 (practice): Perimeter + Ratio (Length = 2 × Width) -> Find Area (Bar Model + Area)
  const w6 = 3 + (k % 5); // 4, 5, 6, 7, 3, 4, 5
  const l6 = w6 * 2;
  const perim6 = (l6 + w6) * 2; // 6 * w6
  const area6 = l6 * w6;

  // Q7 (practice): Perimeter + Difference (Length = Width + diff) -> Find Area
  const w7 = 4 + (k % 5); // 5..8, 4..6
  const diffLW7 = 2 + (k % 3) * 2; // 4, 6, 2, 4, 6, 2, 4 (even so clean!)
  const l7 = w7 + diffLW7;
  const perim7 = (l7 + w7) * 2;
  const area7 = l7 * w7;

  // Q8 (practice): Extend Length by +ext8 -> Area increases by addedArea8 -> Find original Width
  const origW8 = 5 + (k % 5); // 6, 7, 8, 9, 5, 6, 7
  const ext8 = 3 + (k % 3); // 4, 5, 3...
  const addedArea8 = origW8 * ext8;

  // Q9 (practice): Join 3 identical squares side by side -> Given total perimeter, find total area!
  // 3 squares of side s9 -> rectangle (3*s9) x s9 -> perimeter = 8 * s9, area = 3 * s9^2
  const s9 = 2 + (k % 5); // 3, 4, 5, 6, 2, 3, 4
  const joinPerim9 = 8 * s9;
  const joinArea9 = 3 * s9 * s9;

  // Q10 (challenge): Re-bend a wire from a Rectangle into a Square -> Find Square Area!
  // Make (l10 + w10) even so square side = (l10 + w10) / 2 is integer!
  const sqSide10 = 6 + k; // 7..13
  const rL10 = sqSide10 + 3;
  const rW10 = sqSide10 - 3;
  const sqArea10 = sqSide10 * sqSide10;

  // Q11 (challenge): Extend Length by +ext11, original Length = 2 × Width -> given addedArea11, find ORIGINAL Area!
  const w11 = 4 + (k % 5); // 5, 6, 7, 8, 4, 5, 6
  const l11 = w11 * 2;
  const ext11 = 3 + (k % 3); // 4, 5, 3...
  const addedArea11 = ext11 * w11;
  const origArea11 = l11 * w11;

  return [
    {
      id: `jan-d${day}-q1`,
      stage: 'warmup',
      skillDomain: 'remainder',
      prompt: `Một sân chơi hình vuông có chu vi ${sqPerim1} m. Tính diện tích sân chơi đó.`,
      options: makeOptions(`${sqArea1} m²`, [
        `${sqSide1} m²`,
        `${sqPerim1} m²`,
        `${sqArea1 + sqSide1} m²`,
      ]),
      correctAnswer: `${sqArea1} m²`,
      hint: `Bước 1: Tìm cạnh hình vuông = Chu vi : 4. Bước 2: Tính Diện tích = Cạnh × Cạnh.`,
      stepByStepExplanation: [
        `Độ dài một cạnh hình vuông là: ${sqPerim1} : 4 = ${sqSide1} (m).`,
        `Diện tích sân chơi là: ${sqSide1} × ${sqSide1} = ${sqArea1} (m²).`,
      ],
      visualModel: buildAreaGridVisual(
        `Chuyển từ Chu vi (${sqPerim1} m) → Cạnh → Diện tích hình vuông`,
        {
          itemName: 'm²',
          unitLabel: 'm',
          actionPrompt: 'Bấm nút đổi nổi bật để phân biệt Viền Chu vi (vàng) và Mặt Diện tích (xanh).',
          interactiveRule: 'Chu vi : 4 = Cạnh → Cạnh × Cạnh = Diện tích',
          groups: [
            cg('g_p1', 'Chu vi hình vuông (4 cạnh)', '🟡', 4, sqSide1, '#F59E0B', false, 'groups'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: sqSide1,
          outerHeight: sqSide1,
          lengthUnit: 'm',
          areaUnit: 'm²',
          unknownTarget: 'area',
          expectedArea: sqArea1,
          expectedPerimeter: sqPerim1,
          expectedNumericResult: sqArea1,
          showInteractiveToggle: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Cạnh} = ${sqPerim1} \\;?\\; 4`,
            `S = \\text{Cạnh} \\;?\\; \\text{Cạnh} = ?\\;\\text{m}^2`,
          ],
          fullLatexSteps: [
            `\\text{Cạnh} = ${sqPerim1} \\div 4 = ${sqSide1}\\;\\text{m}`,
            `S = ${sqSide1} \\times ${sqSide1} = ${sqArea1}\\;\\text{m}^2`,
          ],
          finalAnswerLatex: `${sqArea1}\\;\\text{m}^2`,
          finalNumericValue: sqArea1,
        }
      ),
    },
    {
      id: `jan-d${day}-q2`,
      stage: 'warmup',
      skillDomain: 'remainder',
      prompt: `Một tấm thảm hình vuông có diện tích ${sqArea2} dm². Tính chu vi tấm thảm đó.`,
      options: makeOptions(`${sqPerim2} dm`, [
        `${sqSide2} dm`,
        `${sqArea2} dm`,
        `${sqPerim2 + 4} dm`,
      ]),
      correctAnswer: `${sqPerim2} dm`,
      hint: `Bước 1: Tìm cạnh hình vuông từ diện tích (? × ? = ${sqArea2}). Bước 2: Chu vi = Cạnh × 4.`,
      stepByStepExplanation: [
        `Vì ${sqSide2} × ${sqSide2} = ${sqArea2} nên cạnh tấm thảm hình vuông dài ${sqSide2} dm.`,
        `Chu vi tấm thảm là: ${sqSide2} × 4 = ${sqPerim2} (dm).`,
      ],
      visualModel: buildAreaGridVisual(
        `Chuyển từ Diện tích (${sqArea2} dm²) → Cạnh → Chu vi hình vuông`,
        {
          itemName: 'dm',
          unitLabel: 'dm',
          actionPrompt: 'Tìm cạnh từ lưới ô vuông diện tích rồi nhân 4 cạnh viền để ra chu vi.',
          interactiveRule: 'S = Cạnh × Cạnh → Chu vi = Cạnh × 4',
          groups: [
            cg('g_a2', 'Diện tích hình vuông', '🟦', 1, sqArea2, '#0284C7', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: sqSide2,
          outerHeight: sqSide2,
          lengthUnit: 'dm',
          areaUnit: 'dm²',
          unknownTarget: 'perimeter',
          expectedArea: sqArea2,
          expectedPerimeter: sqPerim2,
          expectedNumericResult: sqPerim2,
          showInteractiveToggle: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Diện tích } S = \\text{Cạnh} \\;?\\; \\text{Cạnh} \\Rightarrow \\text{Cạnh} = ?`,
            `P = \\text{Cạnh} \\;?\\; 4 = ?\\;\\text{dm}`,
          ],
          fullLatexSteps: [
            `${sqSide2} \\times ${sqSide2} = ${sqArea2} \\Rightarrow \\text{Cạnh} = ${sqSide2}\\;\\text{dm}`,
            `P = ${sqSide2} \\times 4 = ${sqPerim2}\\;\\text{dm}`,
          ],
          finalAnswerLatex: `${sqPerim2}\\;\\text{dm}`,
          finalNumericValue: sqPerim2,
        }
      ),
    },
    {
      id: `jan-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Một hình chữ nhật có chu vi ${perim3} cm và chiều rộng ${w3} cm. Tính diện tích hình chữ nhật đó.`,
      options: makeOptions(`${area3} cm²`, [
        `${(perim3 - w3) * w3} cm²`,
        `${area3 + w3} cm²`,
        `${area3 - w3} cm²`,
      ]),
      correctAnswer: `${area3} cm²`,
      hint: `Cẩn thận đừng lấy Chu vi trừ Chiều rộng! Phải tìm Nửa chu vi (= ${perim3} : 2) trước, rồi tìm Chiều dài, cuối cùng mới nhân để tính Diện tích.`,
      stepByStepExplanation: [
        `Nửa chu vi hình chữ nhật là: ${perim3} : 2 = ${l3 + w3} (cm).`,
        `Chiều dài hình chữ nhật là: ${l3 + w3} - ${w3} = ${l3} (cm).`,
        `Diện tích hình chữ nhật là: ${l3} × ${w3} = ${area3} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        `3 bước vàng: Chu vi (${perim3} cm) → Nửa chu vi → Dài → Diện tích`,
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Đi đúng lộ trình 3 bước: chia 2 tìm Nửa chu vi → trừ chiều rộng → nhân tìm Diện tích.',
          interactiveRule: 'Nửa chu vi = Dài + Rộng = Chu vi : 2',
          groups: [
            cg('g_p3', 'Chu vi HCN', '🟡', 1, perim3, '#F59E0B', false, 'measurement'),
            cg('g_w3', 'Chiều rộng', '📐', 1, w3, '#0284C7', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: l3,
          outerHeight: w3,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: area3,
          expectedPerimeter: perim3,
          expectedNumericResult: area3,
          showInteractiveToggle: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${perim3} \\;?\\; 2`,
            `\\text{Dài} = \\text{Nửa chu vi} \\;?\\; ${w3}`,
            `S = \\text{Dài} \\;?\\; ${w3} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi} = ${perim3} \\div 2 = ${l3 + w3}\\;\\text{cm}`,
            `\\text{Dài} = ${l3 + w3} - ${w3} = ${l3}\\;\\text{cm}`,
            `S = ${l3} \\times ${w3} = ${area3}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${area3}\\;\\text{cm}^2`,
          finalNumericValue: area3,
        }
      ),
    },
    {
      id: `jan-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Một hình chữ nhật có diện tích ${area4} cm² và chiều rộng ${w4} cm. Tính chu vi hình chữ nhật đó.`,
      options: makeOptions(`${perim4} cm`, [
        `${l4 + w4} cm`,
        `${l4} cm`,
        `${perim4 + 4} cm`,
      ]),
      correctAnswer: `${perim4} cm`,
      hint: `Bước 1: Tìm chiều dài = Diện tích : Chiều rộng. Bước 2: Chu vi = (Dài + Rộng) × 2.`,
      stepByStepExplanation: [
        `Chiều dài hình chữ nhật là: ${area4} : ${w4} = ${l4} (cm).`,
        `Chu vi hình chữ nhật là: (${l4} + ${w4}) × 2 = ${perim4} (cm).`,
      ],
      visualModel: buildAreaGridVisual(
        `Từ Diện tích (${area4} cm²) & Rộng (${w4} cm) → Tính Chu vi`,
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Tìm chiều dài bằng phép chia trước, rồi mới cộng dài và rộng nhân 2.',
          interactiveRule: 'Dài = S : Rộng → Chu vi = (Dài + Rộng) × 2',
          groups: [
            cg('g_ar4w', 'Diện tích', '🟦', 1, area4, '#0284C7', false, 'measurement'),
            cg('g_w4w', 'Chiều rộng', '📐', 1, w4, '#10B981', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: l4,
          outerHeight: w4,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'perimeter',
          expectedArea: area4,
          expectedPerimeter: perim4,
          expectedNumericResult: perim4,
          showInteractiveToggle: true,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Dài} = ${area4} \\;?\\; ${w4}`,
            `P = (\\text{Dài} \\;?\\; ${w4}) \\;?\\; 2 = ?\\;\\text{cm}`,
          ],
          fullLatexSteps: [
            `\\text{Dài} = ${area4} \\div ${w4} = ${l4}\\;\\text{cm}`,
            `P = (${l4} + ${w4}) \\times 2 = ${perim4}\\;\\text{cm}`,
          ],
          finalAnswerLatex: `${perim4}\\;\\text{cm}`,
          finalNumericValue: perim4,
        }
      ),
    },
    {
      id: `jan-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'remainder',
      prompt: `Cùng Chu vi, khác Diện tích: Một hình chữ nhật (${rL5} cm × ${rW5} cm) và một hình vuông cạnh ${s5} cm có cùng chu vi ${sharedPerim5} cm. Hỏi diện tích hình vuông lớn hơn diện tích hình chữ nhật bao nhiêu cm²?`,
      options: makeOptions(`${diff5} cm²`, [
        `${d5} cm²`,
        `${diff5 + 2} cm²`,
        `${d5 * 2} cm²`,
      ]),
      correctAnswer: `${diff5} cm²`,
      hint: `Tính riêng diện tích hình vuông (${s5} × ${s5}) và diện tích hình chữ nhật (${rL5} × ${rW5}), rồi lấy hiệu.`,
      stepByStepExplanation: [
        `Diện tích hình vuông là: ${s5} × ${s5} = ${sqArea5} (cm²).`,
        `Diện tích hình chữ nhật là: ${rL5} × ${rW5} = ${rArea5} (cm²).`,
        `Diện tích hình vuông lớn hơn: ${sqArea5} - ${rArea5} = ${diff5} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        `So sánh hai hình cùng chu vi ${sharedPerim5} cm`,
        {
          itemName: 'cm²',
          unitLabel: 'cm',
          actionPrompt: 'Quan sát hai hình có chung độ dài đường viền vàng nhưng số ô vuông bên trong khác nhau!',
          interactiveRule: 'Cùng chu vi, hình vuông luôn có diện tích lớn nhất',
          groups: [
            cg('g_r5', 'HCN (Dài × Rộng)', '🟦', rL5, rW5, '#0284C7', false, 'measurement'),
            cg('g_s5', 'Hình vuông (Cạnh × Cạnh)', '🟩', s5, s5, '#10B981', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: rL5,
          outerHeight: rW5,
          compareWidth: s5,
          compareHeight: s5,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area_diff',
          expectedArea: rArea5,
          expectedPerimeter: sharedPerim5,
          expectedNumericResult: diff5,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `S_{\\text{vuông}} = ${s5} \\;?\\; ${s5},\\quad S_{\\text{HCN}} = ${rL5} \\;?\\; ${rW5}`,
            `\\text{Hiệu diện tích} = S_{\\text{vuông}} \\;?\\; S_{\\text{HCN}} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `S_{\\text{vuông}} = ${s5} \\times ${s5} = ${sqArea5}\\;\\text{cm}^2`,
            `S_{\\text{HCN}} = ${rL5} \\times ${rW5} = ${rArea5}\\;\\text{cm}^2`,
            `${sqArea5} - ${rArea5} = ${diff5}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${diff5}\\;\\text{cm}^2`,
          finalNumericValue: diff5,
        }
      ),
    },
    {
      id: `jan-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Sơ đồ thanh + Diện tích: Một mảnh vườn hình chữ nhật có chu vi ${perim6} m và chiều dài gấp đôi chiều rộng. Tính diện tích mảnh vườn đó.`,
      options: makeOptions(`${area6} m²`, [
        `${area6 * 2} m²`,
        `${l6 + w6} m²`,
        `${area6 - w6} m²`,
      ]),
      correctAnswer: `${area6} m²`,
      hint: `Nửa chu vi = ${perim6} : 2 = ${l6 + w6} m tương ứng 1 + 2 = 3 phần bằng nhau! Tìm 1 phần (Chiều rộng) rồi suy ra Chiều dài và Diện tích.`,
      stepByStepExplanation: [
        `Nửa chu vi mảnh vườn là: ${perim6} : 2 = ${l6 + w6} (m).`,
        `Chiều rộng (1 phần) là: ${l6 + w6} : (1 + 2) = ${w6} (m). Chiều dài là: ${w6} × 2 = ${l6} (m).`,
        `Diện tích mảnh vườn là: ${l6} × ${w6} = ${area6} (m²).`,
      ],
      visualModel: buildBarVisual(
        `Sơ đồ thanh Nửa chu vi (${l6 + w6} m) — Dài gấp 2 lần Rộng`,
        {
          itemName: 'phần mét',
          unitLabel: 'phần',
          actionPrompt: 'Chia Nửa chu vi thành 3 phần bằng nhau (1 phần Rộng + 2 phần Dài) để tìm 2 cạnh.',
          interactiveRule: 'Nửa chu vi = 3 phần bằng nhau',
          groups: [
            cg('g_w6', 'Chiều rộng (1 phần)', '🟦', 1, w6, '#0284C7', true, 'units'),
            cg('g_l6', 'Chiều dài (2 phần)', '🟩', 2, w6, '#10B981', true, 'units'),
          ],
        },
        {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: w6,
          unitName: 'm',
          bars: [
            makeBarSpec('bar_w6', 'Chiều rộng', 1, w6, 0, '#0284C7', '? m', { isUnknown: true }),
            makeBarSpec('bar_l6', 'Chiều dài', 2, w6, 0, '#10B981', '? m', { isUnknown: true }),
          ],
          totalBracket: {
            targetBarIds: ['bar_w6', 'bar_l6'],
            numericValue: l6 + w6,
            displayLabel: `Nửa chu vi = ${l6 + w6} m (3 phần)`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${perim6} \\;?\\; 2`,
            `\\text{Rộng} = \\text{Nửa chu vi} \\;?\\; 3,\\quad \\text{Dài} = \\text{Rộng} \\;?\\; 2`,
            `S = \\text{Dài} \\;?\\; \\text{Rộng} = ?\\;\\text{m}^2`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi} = ${perim6} \\div 2 = ${l6 + w6}\\;\\text{m}`,
            `\\text{Rộng} = ${l6 + w6} \\div 3 = ${w6}\\;\\text{m},\\quad \\text{Dài} = ${w6} \\times 2 = ${l6}\\;\\text{m}`,
            `S = ${l6} \\times ${w6} = ${area6}\\;\\text{m}^2`,
          ],
          finalAnswerLatex: `${area6}\\;\\text{m}^2`,
          finalNumericValue: area6,
        }
      ),
    },
    {
      id: `jan-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Sơ đồ Tổng – Hiệu & Diện tích: Một bảng hiệu hình chữ nhật có chu vi ${perim7} cm, biết chiều dài hơn chiều rộng ${diffLW7} cm. Tính diện tích bảng hiệu đó.`,
      options: makeOptions(`${area7} cm²`, [
        `${area7 + diffLW7} cm²`,
        `${area7 - diffLW7} cm²`,
        `${(l7 + w7) * 2} cm²`,
      ]),
      correctAnswer: `${area7} cm²`,
      hint: `Nửa chu vi = ${perim7} : 2 = ${l7 + w7} cm (Tổng của Dài và Rộng). Bớt phần hơn ${diffLW7} cm rồi chia 2 để tìm chiều rộng!`,
      stepByStepExplanation: [
        `Nửa chu vi (Tổng Dài + Rộng) là: ${perim7} : 2 = ${l7 + w7} (cm).`,
        `Chiều rộng là: (${l7 + w7} - ${diffLW7}) : 2 = ${w7} (cm). Chiều dài là: ${w7} + ${diffLW7} = ${l7} (cm).`,
        `Diện tích bảng hiệu là: ${l7} × ${w7} = ${area7} (cm²).`,
      ],
      visualModel: buildBarVisual(
        `Sơ đồ Tổng (${l7 + w7} cm) – Hiệu (${diffLW7} cm) tìm Dài và Rộng`,
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Bớt phần hơn trên thanh Chiều dài để còn lại 2 phần bằng đúng Chiều rộng.',
          interactiveRule: 'Chiều rộng = (Nửa chu vi − Hiệu) : 2',
          groups: [
            cg('g_np7', 'Nửa chu vi (Tổng)', '🟡', 1, l7 + w7, '#F59E0B', false, 'measurement'),
            cg('g_df7', 'Phần Dài hơn Rộng', '📏', 1, diffLW7, '#7C3AED', false, 'measurement'),
          ],
        },
        {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: w7,
          unitName: 'cm',
          bars: [
            makeBarSpec('bar_w7', 'Chiều rộng', 1, w7, 0, '#0284C7', '? cm', { isUnknown: true }),
            makeBarSpec('bar_l7', 'Chiều dài', 1, w7, diffLW7, '#10B981', '? cm', {
              isUnknown: true,
              highlightNote: `+${diffLW7} cm`,
            }),
          ],
          differenceBracket: {
            longerBarId: 'bar_l7',
            shorterBarId: 'bar_w7',
            numericValue: diffLW7,
            displayLabel: `Hơn ${diffLW7} cm`,
          },
          totalBracket: {
            targetBarIds: ['bar_w7', 'bar_l7'],
            numericValue: l7 + w7,
            displayLabel: `Nửa chu vi = ${l7 + w7} cm`,
          },
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Nửa chu vi} = ${perim7} \\;?\\; 2`,
            `\\text{Rộng} = (\\text{Nửa chu vi} \\;?\\; ${diffLW7}) \\;?\\; 2`,
            `S = \\text{Dài} \\;?\\; \\text{Rộng} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `\\text{Nửa chu vi} = ${perim7} \\div 2 = ${l7 + w7}\\;\\text{cm}`,
            `\\text{Rộng} = (${l7 + w7} - ${diffLW7}) \\div 2 = ${w7}\\;\\text{cm},\\quad \\text{Dài} = ${w7} + ${diffLW7} = ${l7}\\;\\text{cm}`,
            `S = ${l7} \\times ${w7} = ${area7}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${area7}\\;\\text{cm}^2`,
          finalNumericValue: area7,
        }
      ),
    },
    {
      id: `jan-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Mở rộng cạnh: Nếu kéo dài chiều dài của một hình chữ nhật thêm ${ext8} cm (giữ nguyên chiều rộng) thì diện tích tăng thêm ${addedArea8} cm². Hỏi chiều rộng hình chữ nhật đó dài bao nhiêu cm?`,
      options: makeOptions(`${origW8} cm`, [
        `${origW8 + 2} cm`,
        `${origW8 - 1} cm`,
        `${addedArea8 - ext8} cm`,
      ]),
      correctAnswer: `${origW8} cm`,
      hint: `Phần diện tích tăng thêm là một hình chữ nhật nhỏ có một cạnh bằng ${ext8} cm và cạnh kia chính là CHIỀU RỘNG ban đầu!`,
      stepByStepExplanation: [
        `Phần tăng thêm là hình chữ nhật có diện tích ${addedArea8} cm² và một cạnh bằng ${ext8} cm.`,
        `Chiều rộng ban đầu là: ${addedArea8} : ${ext8} = ${origW8} (cm).`,
      ],
      visualModel: buildAreaGridVisual(
        `Phần diện tích tăng thêm (${addedArea8} cm²) khi kéo dài thêm ${ext8} cm`,
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Chia phần diện tích tăng thêm cho độ dài đoạn kéo thêm để tìm đúng chiều rộng.',
          interactiveRule: 'Chiều rộng = Phần diện tích tăng thêm : Đoạn kéo dài',
          groups: [
            cg('g_ad8', 'Diện tích tăng thêm', '🟩', 1, addedArea8, '#10B981', false, 'measurement'),
            cg('g_ex8', 'Đoạn kéo dài thêm', '📏', 1, ext8, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'rect_area',
          outerWidth: ext8,
          outerHeight: origW8,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'width',
          expectedArea: addedArea8,
          expectedNumericResult: origW8,
          visualHint: `Miếng diện tích tăng thêm có diện tích ${addedArea8} cm² và ngang ${ext8} cm`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [`\\text{Chiều rộng} = ${addedArea8} \\;?\\; ${ext8} = ?\\;\\text{cm}`],
          fullLatexSteps: [`\\text{Chiều rộng} = ${addedArea8} \\div ${ext8} = ${origW8}\\;\\text{cm}`],
          finalAnswerLatex: `${origW8}\\;\\text{cm}`,
          finalNumericValue: origW8,
        }
      ),
    },
    {
      id: `jan-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Ghép 3 hình vuông bằng nhau thẳng hàng thành một hình chữ nhật có chu vi ${joinPerim9} cm. Tính diện tích hình chữ nhật ghép được.`,
      options: makeOptions(`${joinArea9} cm²`, [
        `${s9 * s9} cm²`,
        `${joinArea9 + s9} cm²`,
        `${joinPerim9} cm²`,
      ]),
      correctAnswer: `${joinArea9} cm²`,
      hint: `Hình chữ nhật gồm 3 hình vuông thẳng hàng có đường viền ngoài gồm 3 + 3 + 1 + 1 = 8 cạnh hình vuông! Tìm 1 cạnh vuông rồi tính diện tích 3 hình vuông.`,
      stepByStepExplanation: [
        `Đường viền ngoài của 3 hình vuông ghép thẳng hàng gồm 8 cạnh hình vuông nhỏ.`,
        `Cạnh mỗi hình vuông nhỏ là: ${joinPerim9} : 8 = ${s9} (cm).`,
        `Diện tích hình chữ nhật ghép (3 ô vuông) là: 3 × (${s9} × ${s9}) = ${joinArea9} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        `Ghép 3 hình vuông thẳng hàng (Chu vi = ${joinPerim9} cm) → Tính Diện tích`,
        {
          itemName: 'cạnh viền ngoài',
          unitLabel: 'cạnh',
          actionPrompt: 'Đếm số cạnh ngoài trên hình chữ nhật 3×1 (có đúng 8 đoạn bằng nhau) để tìm 1 cạnh hình vuông.',
          interactiveRule: 'Chu vi 3 vuông thẳng hàng = 8 × cạnh → S = 3 × cạnh × cạnh',
          groups: [
            cg('g_j9', '8 cạnh viền ngoài', '🟡', 8, s9, '#F59E0B', true, 'groups'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: 3 * s9,
          outerHeight: s9,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: joinArea9,
          expectedPerimeter: joinPerim9,
          expectedNumericResult: joinArea9,
          showInteractiveToggle: true,
          visualHint: '3 hình vuông ghép thẳng hàng có tổng cộng 8 cạnh ở viền ngoài!',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Cạnh 1 vuông} = ${joinPerim9} \\;?\\; 8`,
            `S = 3 \\;?\\; (\\text{Cạnh} \\;?\\; \\text{Cạnh}) = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `\\text{Cạnh 1 vuông} = ${joinPerim9} \\div 8 = ${s9}\\;\\text{cm}`,
            `S = 3 \\times (${s9} \\times ${s9}) = ${joinArea9}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${joinArea9}\\;\\text{cm}^2`,
          finalNumericValue: joinArea9,
        }
      ),
    },
    {
      id: `jan-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'remainder',
      prompt: `Thử thách Uốn dây Bảo toàn Chu vi: Một sợi dây uốn thành hình chữ nhật dài ${rL10} cm, rộng ${rW10} cm. Sau đó tháo sợi dây đó ra và uốn lại thành một hình vuông. Tính diện tích hình vuông vừa uốn.`,
      options: makeOptions(`${sqArea10} cm²`, [
        `${rL10 * rW10} cm²`,
        `${sqSide10 * 4} cm²`,
        `${sqArea10 - 9} cm²`,
      ]),
      correctAnswer: `${sqArea10} cm²`,
      hint: `Cùng một sợi dây nên Chu vi hình vuông = Chu vi hình chữ nhật! Tính Chu vi → chia 4 ra cạnh vuông → tính Diện tích.`,
      stepByStepExplanation: [
        `Độ dài sợi dây (Chu vi) là: (${rL10} + ${rW10}) × 2 = ${sqSide10 * 4} (cm).`,
        `Cạnh hình vuông uốn được là: ${sqSide10 * 4} : 4 = ${sqSide10} (cm).`,
        `Diện tích hình vuông là: ${sqSide10} × ${sqSide10} = ${sqArea10} (cm²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Uốn cùng 1 sợi dây từ Hình chữ nhật sang Hình vuông',
        {
          itemName: 'cm',
          unitLabel: 'cm',
          actionPrompt: 'Bảo toàn chu vi: Độ dài dây không đổi khi đổi từ hình chữ nhật sang hình vuông.',
          interactiveRule: 'Chu vi hình vuông = Chu vi hình chữ nhật',
          groups: [
            cg('g_rl10', 'Chiều dài HCN cũ', '📏', 1, rL10, '#0284C7', false, 'measurement'),
            cg('g_rw10', 'Chiều rộng HCN cũ', '📐', 1, rW10, '#10B981', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: rL10,
          outerHeight: rW10,
          compareWidth: sqSide10,
          compareHeight: sqSide10,
          lengthUnit: 'cm',
          areaUnit: 'cm²',
          unknownTarget: 'area',
          expectedArea: rL10 * rW10,
          expectedPerimeter: sqSide10 * 4,
          expectedNumericResult: sqArea10,
          visualHint: 'Chu vi không đổi → Tìm cạnh hình vuông trước khi tính diện tích!',
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `P = (${rL10} \\;?\\; ${rW10}) \\;?\\; 2`,
            `\\text{Cạnh vuông} = P \\;?\\; 4 \\Rightarrow S_{\\text{vuông}} = ?\\;\\text{cm}^2`,
          ],
          fullLatexSteps: [
            `P = (${rL10} + ${rW10}) \\times 2 = ${sqSide10 * 4}\\;\\text{cm}`,
            `\\text{Cạnh vuông} = ${sqSide10 * 4} \\div 4 = ${sqSide10}\\;\\text{cm}`,
            `S_{\\text{vuông}} = ${sqSide10} \\times ${sqSide10} = ${sqArea10}\\;\\text{cm}^2`,
          ],
          finalAnswerLatex: `${sqArea10}\\;\\text{cm}^2`,
          finalNumericValue: sqArea10,
        }
      ),
    },
    {
      id: `jan-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'remainder',
      prompt: `Thử thách Olympic Mở rộng Hình chữ nhật: Một mảnh vườn hình chữ nhật có chiều dài gấp đôi chiều rộng. Nếu mở rộng chiều dài thêm ${ext11} m thì diện tích tăng thêm ${addedArea11} m². Tính diện tích mảnh vườn BAN ĐẦU.`,
      options: makeOptions(`${origArea11} m²`, [
        `${origArea11 + addedArea11} m²`,
        `${w11 * w11} m²`,
        `${origArea11 - addedArea11} m²`,
      ]),
      correctAnswer: `${origArea11} m²`,
      hint: `Bước 1: Tìm chiều rộng = ${addedArea11} : ${ext11}. Bước 2: Tìm chiều dài ban đầu (gấp đôi chiều rộng). Bước 3: Tính diện tích ban đầu.`,
      stepByStepExplanation: [
        `Chiều rộng mảnh vườn là: ${addedArea11} : ${ext11} = ${w11} (m).`,
        `Chiều dài ban đầu (gấp đôi chiều rộng) là: ${w11} × 2 = ${l11} (m).`,
        `Diện tích mảnh vườn ban đầu là: ${l11} × ${w11} = ${origArea11} (m²).`,
      ],
      visualModel: buildAreaGridVisual(
        'Suy ngược từ phần diện tích tăng thêm về diện tích ban đầu',
        {
          itemName: 'm²',
          unitLabel: 'm',
          actionPrompt: 'Dùng phần diện tích tăng thêm để giải khóa chiều rộng, rồi nhân đôi tìm chiều dài ban đầu.',
          interactiveRule: 'Rộng = S_tăng : Đoạn tăng → Dài = 2 × Rộng → S_đầu = Dài × Rộng',
          groups: [
            cg('g_ad11', 'Diện tích tăng thêm', '🟩', 1, addedArea11, '#10B981', false, 'measurement'),
            cg('g_ex11', 'Đoạn mở rộng thêm', '📏', 1, ext11, '#F59E0B', false, 'measurement'),
          ],
        },
        {
          kind: 'area_grid',
          shapeKind: 'area_perim_link',
          outerWidth: l11,
          outerHeight: w11,
          lengthUnit: 'm',
          areaUnit: 'm²',
          unknownTarget: 'area',
          expectedArea: origArea11,
          expectedNumericResult: origArea11,
          showInteractiveToggle: true,
          visualHint: `Dài gấp 2 lần Rộng; mở rộng ${ext11} m làm tăng ${addedArea11} m²`,
        },
        {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Rộng} = ${addedArea11} \\;?\\; ${ext11}`,
            `\\text{Dài} = \\text{Rộng} \\;?\\; 2`,
            `S_{\\text{ban đầu}} = \\text{Dài} \\;?\\; \\text{Rộng} = ?\\;\\text{m}^2`,
          ],
          fullLatexSteps: [
            `\\text{Rộng} = ${addedArea11} \\div ${ext11} = ${w11}\\;\\text{m}`,
            `\\text{Dài} = ${w11} \\times 2 = ${l11}\\;\\text{m}`,
            `S_{\\text{ban đầu}} = ${l11} \\times ${w11} = ${origArea11}\\;\\text{m}^2`,
          ],
          finalAnswerLatex: `${origArea11}\\;\\text{m}^2`,
          finalNumericValue: origArea11,
        }
      ),
    },
  ];
}

// ============================================================================
// TUẦN 5 (NGÀY 29 – 30): TỔNG ÔN CHIẾN LƯỢC CẢ 4 CHUYÊN ĐỀ THÁNG 1
// ============================================================================

function buildWeek5Questions(day: number): InMonthQuestion[] {
  const isDay29 = day === 29;
  const w1 = buildWeek1Questions(isDay29 ? 6 : 7);
  const w2 = buildWeek2Questions(isDay29 ? 13 : 14);
  const w3 = buildWeek3Questions(isDay29 ? 20 : 21);
  const w4 = buildWeek4Questions(isDay29 ? 27 : 28);

  // Carefully curated 11-question comprehensive review mixing all 4 pillars (2 warmup, 3 visualModel, 4 practice, 2 challenge)
  const picked: Array<{ src: InMonthQuestion; stage: InMonthQuestion['stage'] }> = isDay29
    ? [
        { src: w1[2], stage: 'warmup' }, // zero-placeholder 4-digit
        { src: w2[1], stage: 'warmup' }, // subtraction across 0
        { src: w1[4], stage: 'visualModel' }, // rounding to 100
        { src: w2[4], stage: 'visualModel' }, // increasing diff sequence
        { src: w3[2], stage: 'visualModel' }, // square area
        { src: w1[8], stage: 'practice' }, // smallest 4-digit with 0 trap
        { src: w2[6], stage: 'practice' }, // 10000 bar model word problem
        { src: w3[6], stage: 'practice' }, // L-shape area
        { src: w4[2], stage: 'practice' }, // Perimeter -> Area
        { src: w2[10], stage: 'challenge' }, // Alternating sequence
        { src: w4[9], stage: 'challenge' }, // Re-bend wire rectangle -> square area
      ]
    : [
        { src: w3[0], stage: 'warmup' }, // Unit grid + half triangles
        { src: w4[0], stage: 'warmup' }, // Square P -> S
        { src: w1[5], stage: 'visualModel' }, // rounding to 1000
        { src: w3[3], stage: 'visualModel' }, // reverse rectangle length
        { src: w4[3], stage: 'visualModel' }, // Area -> Perimeter
        { src: w2[8], stage: 'practice' }, // Fibonacci sequence
        { src: w3[7], stage: 'practice' }, // Frame border
        { src: w4[5], stage: 'practice' }, // Ratio Bar Model + Area
        { src: w4[8], stage: 'practice' }, // 3 joined squares P -> S
        { src: w3[10], stage: 'challenge' }, // Garden walkway 1m all around
        { src: w4[10], stage: 'challenge' }, // Extend length -> original area
      ];

  return picked.map((item, idx) => ({
    ...item.src,
    id: `jan-d${day}-q${idx + 1}`,
    stage: item.stage,
  }));
}

// ============================================================================
// BUILD 30 DAILY LESSONS (330 QUESTIONS)
// ============================================================================

export const JANUARY_IN_MONTH_DAYS: InMonthDayPlan[] = Array.from({ length: 30 }, (_, idx) => {
  const day = idx + 1;
  if (day <= 7) {
    const theme = WEEK1_THEMES[day - 1];
    return {
      id: `jan-day-${day}`,
      dayNumber: day,
      weekNumber: 1,
      weekTitle: 'Tuần 1 · Số Phạm Vi 10 000',
      title: theme.title,
      subtitle: 'Cấu tạo hàng, giá trị chữ số, so sánh, ghép số & làm tròn đến 10 000',
      topicTag: theme.topicTag,
      skillDomain: 'measurement',
      estimatedMinutes: 30,
      planetIcon: '🪐',
      accentColor: '#0284C7',
      learningGoals: theme.goals,
      questions: buildWeek1Questions(day),
    };
  }
  if (day <= 14) {
    const theme = WEEK2_THEMES[day - 8];
    return {
      id: `jan-day-${day}`,
      dayNumber: day,
      weekNumber: 2,
      weekTitle: 'Tuần 2 · Cộng Trừ & Quy Luật',
      title: theme.title,
      subtitle: 'Cộng trừ có nhớ 10 000 & giải mã chuỗi số quy luật Singapore',
      topicTag: theme.topicTag,
      skillDomain: 'interval',
      estimatedMinutes: 30,
      planetIcon: '☄️',
      accentColor: '#0D9488',
      learningGoals: theme.goals,
      questions: buildWeek2Questions(day),
    };
  }
  if (day <= 21) {
    const theme = WEEK3_THEMES[day - 15];
    return {
      id: `jan-day-${day}`,
      dayNumber: day,
      weekNumber: 3,
      weekTitle: 'Tuần 3 · Diện Tích Hình Ghép',
      title: theme.title,
      subtitle: 'Đếm ô vuông, diện tích hình vuông, hình chữ nhật, chữ L & khung viền',
      topicTag: theme.topicTag,
      skillDomain: 'bar_model',
      estimatedMinutes: 30,
      planetIcon: '🌌',
      accentColor: '#7C3AED',
      learningGoals: theme.goals,
      questions: buildWeek3Questions(day),
    };
  }
  if (day <= 28) {
    const theme = WEEK4_THEMES[day - 22];
    return {
      id: `jan-day-${day}`,
      dayNumber: day,
      weekNumber: 4,
      weekTitle: 'Tuần 4 · Diện Tích & Chu Vi',
      title: theme.title,
      subtitle: 'Liên kết hai chiều Chu vi – Diện tích, tối ưu hóa & mở rộng cạnh',
      topicTag: theme.topicTag,
      skillDomain: 'remainder',
      estimatedMinutes: 30,
      planetIcon: '🛸',
      accentColor: '#EA580C',
      learningGoals: theme.goals,
      questions: buildWeek4Questions(day),
    };
  }
  return {
    id: `jan-day-${day}`,
    dayNumber: day,
    weekNumber: 5,
    weekTitle: 'Tuần 5 · Tổng Ôn Tháng 1',
    title:
      day === 29
        ? 'Ngày 29: Tổng ôn Chặng 1 — Số 10 000, Cộng trừ có nhớ & Chuỗi quy luật'
        : 'Ngày 30: Tổng duyệt Chặng 2 — Diện tích hình ghép & Liên kết Diện tích – Chu vi',
    subtitle: 'Tích hợp toàn diện 4 trụ cột năng lực Tháng 1 trước bài thi cuối tháng',
    topicTag: day === 29 ? 'Tổng ôn Chặng 1' : 'Tổng duyệt Tháng 1',
    skillDomain: day === 29 ? 'measurement' : 'remainder',
    estimatedMinutes: 30,
    planetIcon: '🌟',
    accentColor: '#E11D48',
    learningGoals:
      day === 29
        ? [
            'Hệ thống lại số 4 chữ số, làm tròn tia số, cộng trừ xuyên 0 và chuỗi quy luật',
            'Tăng tốc độ phản xạ kết hợp độ chính xác cao',
          ]
        : [
            'Làm chủ diện tích hình ghép chữ L, khung viền và liên kết Chu vi – Diện tích',
            'Sẵn sàng đạt điểm Xuất sắc trong Đề Kiểm Tra Đánh Giá Năng Lực Cuối Tháng 1',
          ],
    questions: buildWeek5Questions(day),
  };
});

// ============================================================================
// ĐỀ THI ĐÁNH GIÁ NĂNG LỰC CUỐI THÁNG 1 (20 CÂU: 10 CƠ BẢN + 10 OLYMPIAD)
// Phân bổ chính xác: 5 câu / trụ cột (measurement, interval, bar_model, remainder)
// ============================================================================

const JANUARY_FINAL_EXAM_QUESTIONS: InMonthExamQuestion[] = [
  // ================= PHẦN A: CƠ BẢN (10 CÂU — 50 ĐIỂM) =================
  {
    id: 'jan-exam-1',
    part: 'A',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [1, 2],
    prompt: 'Viết số có 4 chữ số gồm 6 nghìn, 0 trăm, 8 chục và 5 đơn vị.',
    options: makeOptions('6085', ['685', '6805', '6058']),
    correctAnswer: '6085',
    explanation: '6 nghìn = 6000, 0 trăm giữ chỗ bằng chữ số 0, 8 chục = 80, 5 đơn vị = 5 → số 6085.',
    visualModel: buildPlaceValueVisual(
      'Cấu tạo số 4 chữ số có chữ số 0 giữ chỗ',
      {
        itemName: 'đĩa số',
        unitLabel: 'đĩa',
        actionPrompt: 'Đếm số đĩa ở từng hàng và chú ý cột Hàng Trăm trống.',
        interactiveRule: 'Hàng trăm không có đĩa → viết 0 giữ chỗ',
        groups: [
          cg('je1_1', 'Hàng Nghìn', '🔵', 6, 1000, '#0284C7', false, 'groups'),
          cg('je1_2', 'Hàng Chục', '🟣', 8, 10, '#7C3AED', false, 'groups'),
          cg('je1_3', 'Hàng Đơn vị', '🟠', 5, 1, '#D97706', false, 'groups'),
        ],
      },
      {
        kind: 'place_value_chart',
        mode: 'decompose',
        primaryNumber: 6085,
        highlightPlace: 'hundreds',
        expectedResult: 6085,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Số cần viết} = 6000 \\;?\\; 0 \\;?\\; 80 \\;?\\; 5 = ?`],
        fullLatexSteps: [`6000 + 0 + 80 + 5 = 6085`],
        finalAnswerLatex: `6085`,
        finalNumericValue: 6085,
      }
    ),
  },
  {
    id: 'jan-exam-2',
    part: 'A',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [5],
    prompt: 'Làm tròn số 4670 đến hàng nghìn gần nhất.',
    options: makeOptions('5000', ['4000', '4700', '4600']),
    correctAnswer: '5000',
    explanation: 'Số 4670 lớn hơn mốc giữa 4500 nên khi làm tròn đến hàng nghìn ta làm tròn lên thành 5000.',
    visualModel: buildPlaceValueVisual(
      'Làm tròn số 4670 đến hàng nghìn trên tia số',
      {
        itemName: 'đơn vị',
        unitLabel: 'đơn vị',
        actionPrompt: 'So sánh vị trí số 4670 với mốc giữa 4500 trên tia số.',
        interactiveRule: 'Lớn hơn hoặc bằng mốc giữa → làm tròn LÊN',
        groups: [
          cg('je2_1', 'Số cần làm tròn', '📍', 1, 4670, '#10B981', false, 'measurement'),
          cg('je2_2', 'Mốc giữa', '⭐', 1, 4500, '#F59E0B', false, 'measurement'),
        ],
      },
      {
        kind: 'place_value_chart',
        mode: 'number_line_round',
        primaryNumber: 4670,
        roundTo: 1000,
        roundLow: 4000,
        roundHigh: 5000,
        expectedResult: 5000,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{So sánh } 4670 \\text{ với } 4500 \\Rightarrow \\text{Làm tròn} = ?`],
        fullLatexSteps: [`4670 \\ge 4500 \\Rightarrow 4670 \\approx 5000`],
        finalAnswerLatex: `5000`,
        finalNumericValue: 5000,
      }
    ),
  },
  {
    id: 'jan-exam-3',
    part: 'A',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [4],
    prompt: 'Từ bốn thẻ chữ số 0, 4, 9, 2, hãy ghép thành số NHỎ NHẤT có 4 chữ số khác nhau.',
    options: makeOptions('2049', ['2409', '4029', '9420']),
    correctAnswer: '2049',
    explanation: 'Chữ số 0 không được đứng ở hàng nghìn nên chọn 2 ở hàng nghìn, tiếp theo là 0, 4, 9 → số 2049.',
    visualModel: buildPlaceValueVisual(
      'Ghép số 4 chữ số nhỏ nhất tránh số 0 ở hàng nghìn',
      {
        itemName: 'thẻ chữ số',
        unitLabel: 'thẻ',
        actionPrompt: 'Chọn chữ số nhỏ nhất khác 0 cho Hàng Nghìn, rồi đặt 0 ở Hàng Trăm.',
        interactiveRule: 'Hàng Nghìn ≠ 0',
        groups: [cg('je3_1', '4 thẻ chữ số', '🃏', 4, 1, '#0D9488', false, 'groups')],
      },
      {
        kind: 'place_value_chart',
        mode: 'build_number',
        primaryNumber: 2049,
        digitCards: [0, 4, 9, 2],
        expectedResult: 2049,
        hideResultBeforeSolve: true,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Hàng nghìn} \\neq 0 \\Rightarrow \\text{Số nhỏ nhất} = ?`],
        fullLatexSteps: [`\\text{Nghìn}=2,\\;\\text{Trăm}=0,\\;\\text{Chục}=4,\\;\\text{Đơn vị}=9 \\Rightarrow 2049`],
        finalAnswerLatex: `2049`,
        finalNumericValue: 2049,
      }
    ),
  },
  {
    id: 'jan-exam-4',
    part: 'A',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [9],
    prompt: 'Đặt tính rồi tính phép trừ có nhớ xuyên số 0: 7000 - 2468 = ?',
    options: makeOptions('4532', ['4632', '5532', '4542']),
    correctAnswer: '4532',
    explanation: '7000 - 2468 = 4532 (Thử lại: 4532 + 2468 = 7000).',
    visualModel: buildPlaceValueVisual(
      'Trừ có nhớ xuyên ba chữ số 0: 7000 − 2468',
      {
        itemName: 'đơn vị',
        unitLabel: 'đơn vị',
        actionPrompt: 'Trừ từng cột từ phải sang trái và kiểm tra ngược lại bằng phép cộng.',
        interactiveRule: 'Hiệu + Số trừ = Số bị trừ',
        groups: [
          cg('je4_1', 'Số bị trừ', '🔵', 1, 7000, '#0284C7', false, 'measurement'),
          cg('je4_2', 'Số trừ', '🟠', 1, 2468, '#D97706', false, 'measurement'),
        ],
      },
      {
        kind: 'place_value_chart',
        mode: 'add_sub',
        primaryNumber: 7000,
        secondaryNumber: 2468,
        operation: 'subtract',
        expectedResult: 4532,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Hiệu} = 7000 \\;?\\; 2468 = ?`],
        fullLatexSteps: [`7000 - 2468 = 4532`],
        finalAnswerLatex: `4532`,
        finalNumericValue: 4532,
      }
    ),
  },
  {
    id: 'jan-exam-5',
    part: 'A',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [11],
    prompt: 'Tìm số hạng tiếp theo trong chuỗi quy luật cách đều: 135; 170; 205; 240; ?',
    options: makeOptions('275', ['265', '285', '310']),
    correctAnswer: '275',
    explanation: 'Quy luật cộng thêm 35 (170 - 135 = 35). Số thứ 5 là: 240 + 35 = 275.',
    visualModel: buildSequenceVisual(
      'Tìm số hạng tiếp theo trong chuỗi cấp số cộng',
      {
        itemName: 'số hạng',
        unitLabel: 'số',
        actionPrompt: 'Tìm khoảng cách đều giữa hai số liền kề rồi cộng vào số thứ 4.',
        interactiveRule: 'Mỗi bước nhảy tăng thêm cùng một số đơn vị',
        groups: [
          cg('je5_1', 'Số thứ 4', '🔢', 1, 240, '#0284C7', false, 'measurement'),
          cg('je5_2', 'Bước nhảy đều', '➡️', 1, 35, '#10B981', false, 'interval'),
        ],
      },
      {
        kind: 'sequence_pattern',
        patternKind: 'arithmetic',
        terms: [135, 170, 205, 240, 275],
        missingIndex: 4,
        stepLabels: ['+35', '+35', '+35', '+35'],
        ruleHint: 'Mỗi số hạng kế tiếp tăng thêm đúng 35 đơn vị.',
        expectedValue: 275,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Số thứ 5} = 240 \\;?\\; 35 = ?`],
        fullLatexSteps: [`240 + 35 = 275`],
        finalAnswerLatex: `275`,
        finalNumericValue: 275,
      }
    ),
  },
  {
    id: 'jan-exam-6',
    part: 'A',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [15],
    prompt: 'Một hình vẽ trên lưới ô vuông 1 cm² gồm 14 ô vuông nguyên và 6 nửa ô tam giác. Tính diện tích hình đó.',
    options: makeOptions('17 cm²', ['20 cm²', '16 cm²', '18 cm²']),
    correctAnswer: '17 cm²',
    explanation: '6 nửa ô tam giác ghép được 6 : 2 = 3 ô vuông nguyên. Tổng diện tích = 14 + 3 = 17 (cm²).',
    visualModel: buildAreaGridVisual(
      'Đếm diện tích từ ô vuông nguyên và nửa ô tam giác',
      {
        itemName: 'ô vuông',
        unitLabel: 'ô',
        actionPrompt: 'Ghép 2 nửa ô tam giác thành 1 ô vuông nguyên trước khi cộng.',
        interactiveRule: '2 nửa ô = 1 ô vuông nguyên',
        groups: [
          cg('je6_1', 'Ô vuông nguyên', '🟦', 14, 1, '#0284C7', false, 'units'),
          cg('je6_2', 'Nửa ô tam giác', '🔺', 6, 1, '#F59E0B', false, 'units'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'unit_grid',
        outerWidth: 8,
        outerHeight: 3,
        fullUnitTiles: 14,
        halfUnitTiles: 6,
        lengthUnit: 'cm',
        areaUnit: 'cm²',
        unknownTarget: 'area',
        expectedArea: 17,
        expectedNumericResult: 17,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`S = 14 \\;?\\; (6 \\;?\\; 2) = ?\\;\\text{cm}^2`],
        fullLatexSteps: [`6 \\div 2 = 3,\\quad 14 + 3 = 17\\;\\text{cm}^2`],
        finalAnswerLatex: `17\\;\\text{cm}^2`,
        finalNumericValue: 17,
      }
    ),
  },
  {
    id: 'jan-exam-7',
    part: 'A',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [16, 18],
    prompt: 'Một bảng tin hình chữ nhật có chiều dài 2 dm và chiều rộng 7 cm. Tính diện tích bảng tin đó theo đơn vị cm².',
    options: makeOptions('140 cm²', ['14 cm²', '54 cm²', '120 cm²']),
    correctAnswer: '140 cm²',
    explanation: 'Đổi 2 dm = 20 cm. Diện tích bảng tin là: 20 × 7 = 140 (cm²).',
    visualModel: buildAreaGridVisual(
      'Đổi đơn vị (2 dm = 20 cm) trước khi tính diện tích',
      {
        itemName: 'cm',
        unitLabel: 'cm',
        actionPrompt: 'Đổi chiều dài về cm trước khi nhân với chiều rộng.',
        interactiveRule: '1 dm = 10 cm',
        groups: [
          cg('je7_1', 'Chiều dài (cm)', '📏', 2, 10, '#0284C7', false, 'groups'),
          cg('je7_2', 'Chiều rộng (cm)', '📐', 1, 7, '#10B981', false, 'measurement'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'rect_area',
        outerWidth: 20,
        outerHeight: 7,
        lengthUnit: 'cm',
        areaUnit: 'cm²',
        unknownTarget: 'area',
        expectedArea: 140,
        expectedNumericResult: 140,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Đổi } 2\\;\\text{dm} = 20\\;\\text{cm}`,
          `S = 20 \\;?\\; 7 = ?\\;\\text{cm}^2`,
        ],
        fullLatexSteps: [`2\\;\\text{dm} = 20\\;\\text{cm}`, `S = 20 \\times 7 = 140\\;\\text{cm}^2`],
        finalAnswerLatex: `140\\;\\text{cm}^2`,
        finalNumericValue: 140,
      }
    ),
  },
  {
    id: 'jan-exam-8',
    part: 'A',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [17],
    prompt: 'Một tấm gương hình vuông có diện tích 64 cm². Hỏi cạnh của tấm gương dài bao nhiêu cm?',
    options: makeOptions('8 cm', ['16 cm', '7 cm', '9 cm']),
    correctAnswer: '8 cm',
    explanation: 'Vì 8 × 8 = 64 nên độ dài cạnh tấm gương hình vuông là 8 cm.',
    visualModel: buildAreaGridVisual(
      'Tìm cạnh hình vuông khi biết diện tích 64 cm²',
      {
        itemName: 'cm²',
        unitLabel: 'cm',
        actionPrompt: 'Tìm số nhân với chính nó bằng 64.',
        interactiveRule: 'Cạnh × Cạnh = 64',
        groups: [cg('je8_1', 'Diện tích gương', '🟦', 1, 64, '#7C3AED', false, 'measurement')],
      },
      {
        kind: 'area_grid',
        shapeKind: 'square_area',
        outerWidth: 8,
        outerHeight: 8,
        lengthUnit: 'cm',
        areaUnit: 'cm²',
        unknownTarget: 'side',
        expectedArea: 64,
        expectedNumericResult: 8,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`? \\;?\\; ? = 64\\;\\text{cm}^2`],
        fullLatexSteps: [`8 \\times 8 = 64 \\Rightarrow \\text{Cạnh} = 8\\;\\text{cm}`],
        finalAnswerLatex: `8\\;\\text{cm}`,
        finalNumericValue: 8,
      }
    ),
  },
  {
    id: 'jan-exam-9',
    part: 'A',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [22],
    prompt: 'Một sân hình vuông có chu vi 36 m. Tính diện tích sân đó.',
    options: makeOptions('81 m²', ['36 m²', '72 m²', '64 m²']),
    correctAnswer: '81 m²',
    explanation: 'Cạnh hình vuông = 36 : 4 = 9 (m). Diện tích = 9 × 9 = 81 (m²).',
    visualModel: buildAreaGridVisual(
      'Chuyển từ Chu vi (36 m) sang Diện tích hình vuông',
      {
        itemName: 'm',
        unitLabel: 'm',
        actionPrompt: 'Chia chu vi cho 4 để tìm 1 cạnh, rồi lấy cạnh nhân cạnh.',
        interactiveRule: 'Chu vi : 4 = Cạnh → S = Cạnh × Cạnh',
        groups: [cg('je9_1', '4 cạnh hình vuông', '🟡', 4, 9, '#F59E0B', true, 'groups')],
      },
      {
        kind: 'area_grid',
        shapeKind: 'area_perim_link',
        outerWidth: 9,
        outerHeight: 9,
        lengthUnit: 'm',
        areaUnit: 'm²',
        unknownTarget: 'area',
        expectedArea: 81,
        expectedPerimeter: 36,
        expectedNumericResult: 81,
        showInteractiveToggle: true,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Cạnh} = 36 \\;?\\; 4`,
          `S = \\text{Cạnh} \\;?\\; \\text{Cạnh} = ?\\;\\text{m}^2`,
        ],
        fullLatexSteps: [`\\text{Cạnh} = 36 \\div 4 = 9\\;\\text{m}`, `S = 9 \\times 9 = 81\\;\\text{m}^2`],
        finalAnswerLatex: `81\\;\\text{m}^2`,
        finalNumericValue: 81,
      }
    ),
  },
  {
    id: 'jan-exam-10',
    part: 'A',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [23],
    prompt: 'Một mảnh vườn hình chữ nhật có chu vi 42 m và chiều rộng 8 m. Tính diện tích mảnh vườn đó.',
    options: makeOptions('104 m²', ['112 m²', '96 m²', '272 m²']),
    correctAnswer: '104 m²',
    explanation: 'Nửa chu vi = 42 : 2 = 21 (m). Chiều dài = 21 - 8 = 13 (m). Diện tích = 13 × 8 = 104 (m²).',
    visualModel: buildAreaGridVisual(
      'Biết Chu vi 42 m & Rộng 8 m → Tìm Diện tích',
      {
        itemName: 'm',
        unitLabel: 'm',
        actionPrompt: 'Tìm Nửa chu vi trước khi trừ chiều rộng để tìm chiều dài.',
        interactiveRule: 'Nửa chu vi = Chu vi : 2 = Dài + Rộng',
        groups: [
          cg('je10_1', 'Chu vi', '🟡', 1, 42, '#F59E0B', false, 'measurement'),
          cg('je10_2', 'Chiều rộng', '📐', 1, 8, '#0284C7', false, 'measurement'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'area_perim_link',
        outerWidth: 13,
        outerHeight: 8,
        lengthUnit: 'm',
        areaUnit: 'm²',
        unknownTarget: 'area',
        expectedArea: 104,
        expectedPerimeter: 42,
        expectedNumericResult: 104,
        showInteractiveToggle: true,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Nửa chu vi} = 42 \\;?\\; 2`,
          `\\text{Dài} = \\text{Nửa chu vi} \\;?\\; 8 \\Rightarrow S = ?\\;\\text{m}^2`,
        ],
        fullLatexSteps: [
          `\\text{Nửa chu vi} = 42 \\div 2 = 21\\;\\text{m}`,
          `\\text{Dài} = 21 - 8 = 13\\;\\text{m}`,
          `S = 13 \\times 8 = 104\\;\\text{m}^2`,
        ],
        finalAnswerLatex: `104\\;\\text{m}^2`,
        finalNumericValue: 104,
      }
    ),
  },

  // ================= PHẦN B: TƯ DUY OLYMPIC (10 CÂU — 50 ĐIỂM) =================
  {
    id: 'jan-exam-11',
    part: 'B',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [4, 6],
    prompt: '[Tư duy Olympic] Từ bốn thẻ chữ số 0, 5, 8, 3, hãy ghép thành số CHẴN LỚN NHẤT có 4 chữ số khác nhau.',
    options: makeOptions('8530', ['8503', '8350', '5308']),
    correctAnswer: '8530',
    explanation: 'Để số chẵn lớn nhất, đặt chữ số chẵn nhỏ nhất (0) ở hàng đơn vị, còn lại 8, 5, 3 xếp giảm dần → 8530.',
    visualModel: buildPlaceValueVisual(
      'Olympic Ghép số Chẵn lớn nhất từ 4 thẻ số',
      {
        itemName: 'thẻ chữ số',
        unitLabel: 'thẻ',
        actionPrompt: 'Giữ lại chữ số chẵn nhỏ nhất đặt vào hàng đơn vị để 3 chữ số lớn nhất đứng phía trước.',
        interactiveRule: 'Số chẵn lớn nhất ⇔ hàng đơn vị là số chẵn nhỏ nhất có thể',
        groups: [cg('je11_1', 'Bộ 4 thẻ số', '🃏', 4, 1, '#7C3AED', false, 'groups')],
      },
      {
        kind: 'place_value_chart',
        mode: 'build_number',
        primaryNumber: 8530,
        digitCards: [0, 5, 8, 3],
        expectedResult: 8530,
        hideResultBeforeSolve: true,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Hàng đơn vị} = 0,\\; \\text{xếp giảm dần } 8, 5, 3 \\Rightarrow ?`],
        fullLatexSteps: [`\\text{Số chẵn lớn nhất} = 8530`],
        finalAnswerLatex: `8530`,
        finalNumericValue: 8530,
      }
    ),
  },
  {
    id: 'jan-exam-12',
    part: 'B',
    points: 5,
    skillDomain: 'measurement',
    relatedDayNumbers: [2, 6],
    prompt: '[Tư duy Olympic] Trong số 9472, giá trị của chữ số hàng nghìn lớn hơn giá trị của chữ số hàng trăm bao nhiêu đơn vị?',
    options: makeOptions('8600', ['5', '8500', '9400']),
    correctAnswer: '8600',
    explanation: 'Giá trị hàng nghìn = 9000; giá trị hàng trăm = 400. Hiệu = 9000 - 400 = 8600.',
    visualModel: buildPlaceValueVisual(
      'So sánh giá trị chữ số hàng nghìn và hàng trăm trong số 9472',
      {
        itemName: 'giá trị hàng',
        unitLabel: 'đơn vị',
        actionPrompt: 'Chuyển cả 2 chữ số sang giá trị thực tế (9000 và 400) rồi tính hiệu.',
        interactiveRule: 'Giá trị = Chữ số × Bậc hàng',
        groups: [
          cg('je12_1', 'Giá trị hàng Nghìn', '🔵', 9, 1000, '#0284C7', false, 'groups'),
          cg('je12_2', 'Giá trị hàng Trăm', '🟢', 4, 100, '#0D9488', false, 'groups'),
        ],
      },
      {
        kind: 'place_value_chart',
        mode: 'add_sub',
        primaryNumber: 9000,
        secondaryNumber: 400,
        operation: 'subtract',
        expectedResult: 8600,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Hiệu giá trị} = 9000 \\;?\\; 400 = ?`],
        fullLatexSteps: [`9000 - 400 = 8600`],
        finalAnswerLatex: `8600`,
        finalNumericValue: 8600,
      }
    ),
  },
  {
    id: 'jan-exam-13',
    part: 'B',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [12],
    prompt: '[Tư duy Olympic] Giải mã dãy hiệu tăng dần đều: Tìm số hạng thứ 6 của dãy 5; 8; 13; 20; 29; ?',
    options: makeOptions('40', ['38', '41', '42']),
    correctAnswer: '40',
    explanation: 'Các bước nhảy là +3, +5, +7, +9 → bước nhảy tiếp theo là +11. Số thứ 6 = 29 + 11 = 40.',
    visualModel: buildSequenceVisual(
      'Chuỗi số có bước nhảy tăng thêm 2 mỗi chặng',
      {
        itemName: 'bước nhảy',
        unitLabel: 'đơn vị',
        actionPrompt: 'Viết ra dãy các hiệu liên tiếp (+3, +5, +7, +9) để tìm bước nhảy tiếp theo.',
        interactiveRule: 'Hiệu liên tiếp là dãy số lẻ tăng dần',
        groups: [
          cg('je13_1', 'Số thứ 5', '🔢', 1, 29, '#0284C7', false, 'measurement'),
          cg('je13_2', 'Bước nhảy thứ 5', '🚀', 1, 11, '#10B981', true, 'interval'),
        ],
      },
      {
        kind: 'sequence_pattern',
        patternKind: 'increasing_diff',
        terms: [5, 8, 13, 20, 29, 40],
        missingIndex: 5,
        stepLabels: ['+3', '+5', '+7', '+9', '+11'],
        ruleHint: 'Bước nhảy tăng thêm 2 sau mỗi chặng: +3, +5, +7, +9, ...',
        expectedValue: 40,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Bước nhảy mới} = 9 \\;?\\; 2`,
          `\\text{Số thứ 6} = 29 \\;?\\; \\text{Bước nhảy mới} = ?`,
        ],
        fullLatexSteps: [`9 + 2 = 11`, `29 + 11 = 40`],
        finalAnswerLatex: `40`,
        finalNumericValue: 40,
      }
    ),
  },
  {
    id: 'jan-exam-14',
    part: 'B',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [13],
    prompt: '[Tư duy Olympic] Dãy xen kẽ 2 nhánh: Tìm số hạng thứ 7 của dãy 12; 50; 19; 45; 26; 40; ?',
    options: makeOptions('33', ['35', '31', '34']),
    correctAnswer: '33',
    explanation: 'Nhánh lẻ (vị trí 1, 3, 5, 7): 12; 19; 26 → tăng đều +7. Vậy số thứ 7 = 26 + 7 = 33.',
    visualModel: buildSequenceVisual(
      'Olympic Dãy số xen kẽ hai nhánh (Vị trí lẻ ↔ Vị trí chẵn)',
      {
        itemName: 'số hạng',
        unitLabel: 'ô',
        actionPrompt: 'Tách riêng nhánh vị trí lẻ: 12 → 19 → 26 → ?.',
        interactiveRule: 'Vị trí lẻ và vị trí chẵn tuân theo 2 quy luật độc lập',
        groups: [
          cg('je14_1', 'Số thứ 5 (nhánh lẻ)', '🔵', 1, 26, '#0284C7', false, 'measurement'),
          cg('je14_2', 'Bước nhảy nhánh lẻ', '↗️', 1, 7, '#10B981', false, 'interval'),
        ],
      },
      {
        kind: 'sequence_pattern',
        patternKind: 'alternating',
        terms: [12, 50, 19, 45, 26, 40, 33],
        missingIndex: 6,
        stepLabels: ['Nhánh', 'Nhánh', 'Nhánh', 'Nhánh', 'Nhánh', '?'],
        ruleHint: 'Nhánh vị trí lẻ (1, 3, 5, 7): 12 → 19 → 26 → ? (tăng đều 7).',
        expectedValue: 33,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [`\\text{Số thứ 7 (nhánh lẻ)} = 26 \\;?\\; 7 = ?`],
        fullLatexSteps: [`26 + 7 = 33`],
        finalAnswerLatex: `33`,
        finalNumericValue: 33,
      }
    ),
  },
  {
    id: 'jan-exam-15',
    part: 'B',
    points: 5,
    skillDomain: 'interval',
    relatedDayNumbers: [10],
    prompt: '[Tư duy Olympic] Toán đố 2 bước phạm vi 10 000: Thư viện A có 3250 cuốn sách. Thư viện B có nhiều hơn Thư viện A là 680 cuốn sách. Hỏi cả hai thư viện có tất cả bao nhiêu cuốn sách?',
    options: makeOptions('7180 cuốn', ['3930 cuốn', '7080 cuốn', '6500 cuốn']),
    correctAnswer: '7180 cuốn',
    explanation: 'Thư viện B có: 3250 + 680 = 3930 (cuốn). Cả hai thư viện có: 3250 + 3930 = 7180 (cuốn).',
    visualModel: buildBarVisual(
      'Sơ đồ thanh 2 bước: Tìm tổng số sách 2 thư viện',
      {
        itemName: 'cuốn sách',
        unitLabel: 'cuốn',
        actionPrompt: 'Tìm số sách Thư viện B trước, sau đó gộp cả hai thanh.',
        interactiveRule: 'Tổng 2 thư viện = A + (A + phần hơn)',
        groups: [
          cg('je15_1', 'Thư viện A', '📚', 1, 3250, '#0284C7', false, 'measurement'),
          cg('je15_2', 'Phần B nhiều hơn', '➕', 1, 680, '#F59E0B', false, 'measurement'),
        ],
      },
      {
        kind: 'bar_model',
        family: 'comparison',
        unitReferenceValue: 3250,
        unitName: 'cuốn',
        bars: [
          makeBarSpec('je15_a', 'Thư viện A', 1, 3250, 0, '#0284C7', '3250 cuốn'),
          makeBarSpec('je15_b', 'Thư viện B', 1, 3250, 680, '#10B981', '? cuốn', {
            isUnknown: true,
            highlightNote: '+680 cuốn',
          }),
        ],
        differenceBracket: {
          longerBarId: 'je15_b',
          shorterBarId: 'je15_a',
          numericValue: 680,
          displayLabel: 'Nhiều hơn 680 cuốn',
        },
        totalBracket: {
          targetBarIds: ['je15_a', 'je15_b'],
          numericValue: 7180,
          displayLabel: 'Tổng cả 2 thư viện = ? cuốn',
          isUnknown: true,
        },
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Thư viện B} = 3250 \\;?\\; 680`,
          `\\text{Tổng 2 thư viện} = 3250 \\;?\\; \\text{Thư viện B} = ?`,
        ],
        fullLatexSteps: [
          `\\text{Thư viện B} = 3250 + 680 = 3930\\;\\text{cuốn}`,
          `\\text{Tổng} = 3250 + 3930 = 7180\\;\\text{cuốn}`,
        ],
        finalAnswerLatex: `7180\\;\\text{cuốn}`,
        finalNumericValue: 7180,
      }
    ),
  },
  {
    id: 'jan-exam-16',
    part: 'B',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [19],
    prompt: '[Tư duy Olympic] Một tấm bìa hình chữ nhật kích thước 14 cm × 9 cm bị cắt ở góc trên bên phải một hình chữ nhật nhỏ kích thước 5 cm × 4 cm. Tính diện tích phần bìa hình chữ L còn lại.',
    options: makeOptions('106 cm²', ['126 cm²', '146 cm²', '96 cm²']),
    correctAnswer: '106 cm²',
    explanation: 'S_ngoài = 14 × 9 = 126 (cm²); S_khuyết = 5 × 4 = 20 (cm²). S_chữ L = 126 - 20 = 106 (cm²).',
    visualModel: buildAreaGridVisual(
      'Diện tích hình chữ L — Chiến lược Cắt cộng ↔ Trừ bù',
      {
        itemName: 'cm²',
        unitLabel: 'cm',
        actionPrompt: 'Dùng chiến lược Trừ bù (Khung bao ngoài − Góc khuyết) hoặc Cắt cộng (A + B).',
        interactiveRule: 'S_chữ L = S_ngoài − S_khuyết',
        groups: [
          cg('je16_1', 'Khung ngoài', '🟦', 14, 9, '#0284C7', false, 'measurement'),
          cg('je16_2', 'Góc khuyết', '🟥', 5, 4, '#E11D48', false, 'measurement'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'l_shape_area',
        outerWidth: 14,
        outerHeight: 9,
        cutWidth: 5,
        cutHeight: 4,
        lengthUnit: 'cm',
        areaUnit: 'cm²',
        unknownTarget: 'area',
        expectedArea: 106,
        expectedNumericResult: 106,
        showInteractiveToggle: true,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `S_{\\text{ngoài}} = 14 \\;?\\; 9,\\quad S_{\\text{khuyết}} = 5 \\;?\\; 4`,
          `S_{\\text{chữ L}} = S_{\\text{ngoài}} \\;?\\; S_{\\text{khuyết}} = ?\\;\\text{cm}^2`,
        ],
        fullLatexSteps: [
          `S_{\\text{ngoài}} = 14 \\times 9 = 126\\;\\text{cm}^2,\\quad S_{\\text{khuyết}} = 5 \\times 4 = 20\\;\\text{cm}^2`,
          `S_{\\text{chữ L}} = 126 - 20 = 106\\;\\text{cm}^2`,
        ],
        finalAnswerLatex: `106\\;\\text{cm}^2`,
        finalNumericValue: 106,
      }
    ),
  },
  {
    id: 'jan-exam-17',
    part: 'B',
    points: 5,
    skillDomain: 'bar_model',
    relatedDayNumbers: [20],
    prompt: '[Tư duy Olympic] Một vườn hoa hình chữ nhật dài 12 m, rộng 7 m. Người ta làm một lối đi rộng 1 m bao quanh bên ngoài vườn hoa. Tính diện tích lối đi đó.',
    options: makeOptions('42 m²', ['20 m²', '38 m²', '126 m²']),
    correctAnswer: '42 m²',
    explanation: 'Khung ngoài dài 12 + 2 = 14 m, rộng 7 + 2 = 9 m. S_lối đi = 14 × 9 - 12 × 7 = 126 - 84 = 42 (m²).',
    visualModel: buildAreaGridVisual(
      'Olympic Lối đi rộng 1 m bao quanh vườn hoa 12 m × 7 m',
      {
        itemName: 'm²',
        unitLabel: 'm',
        actionPrompt: 'Cộng 1 m ở cả hai đầu mỗi chiều → khung ngoài là 14 m × 9 m.',
        interactiveRule: 'S_lối đi = S_ngoài − S_vườn',
        groups: [
          cg('je17_1', 'Khung ngoài (14×9)', '🟨', 14, 9, '#F59E0B', false, 'measurement'),
          cg('je17_2', 'Vườn hoa (12×7)', '🌸', 12, 7, '#10B981', false, 'measurement'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'frame_border',
        outerWidth: 14,
        outerHeight: 9,
        innerWidth: 12,
        innerHeight: 7,
        lengthUnit: 'm',
        areaUnit: 'm²',
        unknownTarget: 'area',
        expectedArea: 42,
        expectedNumericResult: 42,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Dài ngoài} = 12 \\;?\\; 2,\\quad \\text{Rộng ngoài} = 7 \\;?\\; 2`,
          `S_{\\text{lối đi}} = S_{\\text{ngoài}} \\;?\\; S_{\\text{vườn}} = ?\\;\\text{m}^2`,
        ],
        fullLatexSteps: [
          `S_{\\text{ngoài}} = 14 \\times 9 = 126\\;\\text{m}^2,\\quad S_{\\text{vườn}} = 12 \\times 7 = 84\\;\\text{m}^2`,
          `S_{\\text{lối đi}} = 126 - 84 = 42\\;\\text{m}^2`,
        ],
        finalAnswerLatex: `42\\;\\text{m}^2`,
        finalNumericValue: 42,
      }
    ),
  },
  {
    id: 'jan-exam-18',
    part: 'B',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [24],
    prompt: '[Tư duy Olympic] Một mảnh đất hình chữ nhật có chu vi 48 m và chiều dài gấp đôi chiều rộng. Tính diện tích mảnh đất đó.',
    options: makeOptions('128 m²', ['256 m²', '96 m²', '144 m²']),
    correctAnswer: '128 m²',
    explanation: 'Nửa chu vi = 48 : 2 = 24 (m) gồm 3 phần. Rộng = 24 : 3 = 8 (m), Dài = 16 (m). Diện tích = 16 × 8 = 128 (m²).',
    visualModel: buildBarVisual(
      'Olympic Sơ đồ thanh Nửa chu vi (24 m) — Dài gấp 2 lần Rộng',
      {
        itemName: 'phần mét',
        unitLabel: 'phần',
        actionPrompt: 'Chia Nửa chu vi thành 3 phần bằng nhau để tìm Rộng và Dài.',
        interactiveRule: 'Nửa chu vi = 3 phần bằng nhau',
        groups: [
          cg('je18_1', 'Chiều rộng (1 phần)', '🟦', 1, 8, '#0284C7', true, 'units'),
          cg('je18_2', 'Chiều dài (2 phần)', '🟩', 2, 8, '#10B981', true, 'units'),
        ],
      },
      {
        kind: 'bar_model',
        family: 'part_whole',
        unitReferenceValue: 8,
        unitName: 'm',
        bars: [
          makeBarSpec('je18_w', 'Chiều rộng', 1, 8, 0, '#0284C7', '? m', { isUnknown: true }),
          makeBarSpec('je18_l', 'Chiều dài', 2, 8, 0, '#10B981', '? m', { isUnknown: true }),
        ],
        totalBracket: {
          targetBarIds: ['je18_w', 'je18_l'],
          numericValue: 24,
          displayLabel: 'Nửa chu vi = 24 m (3 phần)',
        },
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Nửa chu vi} = 48 \\;?\\; 2`,
          `\\text{Rộng} = \\text{Nửa chu vi} \\;?\\; 3 \\Rightarrow S = ?\\;\\text{m}^2`,
        ],
        fullLatexSteps: [
          `\\text{Nửa chu vi} = 48 \\div 2 = 24\\;\\text{m}`,
          `\\text{Rộng} = 24 \\div 3 = 8\\;\\text{m},\\quad \\text{Dài} = 8 \\times 2 = 16\\;\\text{m}`,
          `S = 16 \\times 8 = 128\\;\\text{m}^2`,
        ],
        finalAnswerLatex: `128\\;\\text{m}^2`,
        finalNumericValue: 128,
      }
    ),
  },
  {
    id: 'jan-exam-19',
    part: 'B',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [26, 27],
    prompt: '[Tư duy Olympic] Uốn một sợi dây thành hình chữ nhật dài 13 cm, rộng 5 cm. Tháo ra uốn lại thành một hình vuông. Tính diện tích hình vuông vừa uốn.',
    options: makeOptions('81 cm²', ['65 cm²', '36 cm²', '100 cm²']),
    correctAnswer: '81 cm²',
    explanation: 'Chu vi = (13 + 5) × 2 = 36 (cm). Cạnh hình vuông = 36 : 4 = 9 (cm). Diện tích = 9 × 9 = 81 (cm²).',
    visualModel: buildAreaGridVisual(
      'Uốn dây bảo toàn chu vi từ HCN (13×5) sang Hình vuông',
      {
        itemName: 'cm',
        unitLabel: 'cm',
        actionPrompt: 'Tính độ dài sợi dây (Chu vi HCN), chia 4 tìm cạnh vuông rồi tính diện tích.',
        interactiveRule: 'Chu vi không đổi khi uốn lại cùng một sợi dây',
        groups: [
          cg('je19_1', 'Chiều dài HCN', '📏', 1, 13, '#0284C7', false, 'measurement'),
          cg('je19_2', 'Chiều rộng HCN', '📐', 1, 5, '#10B981', false, 'measurement'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'area_perim_link',
        outerWidth: 13,
        outerHeight: 5,
        compareWidth: 9,
        compareHeight: 9,
        lengthUnit: 'cm',
        areaUnit: 'cm²',
        unknownTarget: 'area',
        expectedArea: 65,
        expectedPerimeter: 36,
        expectedNumericResult: 81,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `P = (13 \\;?\\; 5) \\;?\\; 2`,
          `\\text{Cạnh vuông} = P \\;?\\; 4 \\Rightarrow S_{\\text{vuông}} = ?\\;\\text{cm}^2`,
        ],
        fullLatexSteps: [
          `P = (13 + 5) \\times 2 = 36\\;\\text{cm}`,
          `\\text{Cạnh vuông} = 36 \\div 4 = 9\\;\\text{cm}`,
          `S_{\\text{vuông}} = 9 \\times 9 = 81\\;\\text{cm}^2`,
        ],
        finalAnswerLatex: `81\\;\\text{cm}^2`,
        finalNumericValue: 81,
      }
    ),
  },
  {
    id: 'jan-exam-20',
    part: 'B',
    points: 5,
    skillDomain: 'remainder',
    relatedDayNumbers: [27, 28],
    prompt: '[Tư duy Olympic] Một mảnh vườn hình chữ nhật có chiều dài gấp đôi chiều rộng. Nếu tăng chiều dài thêm 4 m (giữ nguyên chiều rộng) thì diện tích tăng thêm 28 m². Tính diện tích mảnh vườn BAN ĐẦU.',
    options: makeOptions('98 m²', ['126 m²', '49 m²', '112 m²']),
    correctAnswer: '98 m²',
    explanation: 'Chiều rộng = 28 : 4 = 7 (m). Chiều dài ban đầu = 7 × 2 = 14 (m). Diện tích ban đầu = 14 × 7 = 98 (m²).',
    visualModel: buildAreaGridVisual(
      'Olympic Mở rộng cạnh: Suy ngược về diện tích ban đầu',
      {
        itemName: 'm²',
        unitLabel: 'm',
        actionPrompt: 'Dùng phần diện tích tăng thêm (28 m²) chia cho đoạn kéo dài (4 m) để tìm chiều rộng.',
        interactiveRule: 'Rộng = S_tăng : Đoạn tăng → Dài = 2 × Rộng → S_đầu = Dài × Rộng',
        groups: [
          cg('je20_1', 'Diện tích tăng thêm', '🟩', 1, 28, '#10B981', false, 'measurement'),
          cg('je20_2', 'Đoạn tăng chiều dài', '📏', 1, 4, '#F59E0B', false, 'measurement'),
        ],
      },
      {
        kind: 'area_grid',
        shapeKind: 'area_perim_link',
        outerWidth: 14,
        outerHeight: 7,
        lengthUnit: 'm',
        areaUnit: 'm²',
        unknownTarget: 'area',
        expectedArea: 98,
        expectedNumericResult: 98,
        showInteractiveToggle: true,
      },
      {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Rộng} = 28 \\;?\\; 4,\\quad \\text{Dài} = \\text{Rộng} \\;?\\; 2`,
          `S_{\\text{ban đầu}} = \\text{Dài} \\;?\\; \\text{Rộng} = ?\\;\\text{m}^2`,
        ],
        fullLatexSteps: [
          `\\text{Rộng} = 28 \\div 4 = 7\\;\\text{m}`,
          `\\text{Dài} = 7 \\times 2 = 14\\;\\text{m}`,
          `S_{\\text{ban đầu}} = 14 \\times 7 = 98\\;\\text{m}^2`,
        ],
        finalAnswerLatex: `98\\;\\text{m}^2`,
        finalNumericValue: 98,
      }
    ),
  },
];

export const JANUARY_FINAL_EXAM: InMonthFinalExam = {
  id: 'inmonth-g3-m1-exam',
  monthLabel: 'Tháng 1',
  title: 'Kiểm Tra Đánh Giá Năng Lực Tháng 1 — Lớp 3 (Chuẩn Singapore CPA)',
  subtitle: 'Phần A: Cơ Bản (50đ) & Phần B: Tư Duy Olympic (50đ) · Số 10 000, Chuỗi Quy Luật & Diện Tích',
  durationMinutes: 35,
  passingScore: 70,
  excellenceScore: 90,
  questions: JANUARY_FINAL_EXAM_QUESTIONS,
};
