import {
  SingaporeCPASpec,
  BarModelBarSpec,
  BarModelUnitBlock,
  BarModelPictorialSpec,
  CPAConcreteGroup,
} from '../types/singaporeCPA';
import type {
  InMonthVisualModelConfig,
  InMonthQuestion,
  InMonthExamQuestion,
} from '../data/inMonthNovemberData';

/**
 * Helper to create uniform unit blocks for a bar, plus an optional offset block.
 */
export function createBarBlocks(
  units: number,
  unitValue: number,
  options?: {
    offsetValue?: number;
    isUnknownBar?: boolean;
    unitLabelPrefix?: string;
    deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
  }
): BarModelUnitBlock[] {
  const blocks: BarModelUnitBlock[] = [];
  const offset = options?.offsetValue ?? 0;

  if (offset >= 0) {
    for (let i = 0; i < units; i++) {
      blocks.push({
        index: i,
        label: options?.isUnknownBar ? '?' : `${unitValue}`,
        numericValue: unitValue,
        isUnknown: options?.isUnknownBar,
      });
    }
    if (offset > 0) {
      blocks.push({
        index: units,
        label: `+${offset}`,
        numericValue: offset,
        isDelta: true,
        deltaType: options?.deltaType || 'added',
      });
    }
  } else {
    // Negative offset: reduce the last block so sum of blocks === units * unitValue + offset
    for (let i = 0; i < units - 1; i++) {
      blocks.push({
        index: i,
        label: `${unitValue}`,
        numericValue: unitValue,
      });
    }
    const lastVal = unitValue + offset; // offset is negative
    blocks.push({
      index: units - 1,
      label: `${ unitValue } - ${ Math.abs(offset) }`,
      numericValue: lastVal,
      isDelta: true,
      deltaType: options?.deltaType || 'removed',
    });
  }

  return blocks;
}

/**
 * Helper to build a single BarModelBarSpec with guaranteed block-sum invariant.
 */
export function makeBarSpec(params: {
  id: string;
  label: string;
  units: number;
  unitValue: number;
  offsetValue?: number;
  displayValue: string;
  isUnknown?: boolean;
  color: string;
  highlightNote?: string;
  deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
}): BarModelBarSpec {
  const offset = params.offsetValue ?? 0;
  const numericValue = params.units * params.unitValue + offset;
  return {
    id: params.id,
    label: params.label,
    units: params.units,
    unitValue: params.unitValue,
    offsetValue: offset !== 0 ? offset : undefined,
    numericValue,
    displayValue: params.displayValue,
    isUnknown: params.isUnknown,
    color: params.color,
    highlightNote: params.highlightNote,
    blocks: createBarBlocks(params.units, params.unitValue, {
      offsetValue: offset,
      isUnknownBar: params.isUnknown,
      deltaType: params.deltaType,
    }),
  };
}

/**
 * Extracts the first integer from a string (e.g. "72 vệ tinh" -> 72).
 */
export function extractPrimaryNumber(text: string): number {
  const matches = text.match(/\d+/g);
  if (!matches || matches.length === 0) return 0;
  return parseInt(matches[0], 10);
}

/**
 * Builds an exact, mathematically verified SingaporeCPASpec for any Week 1 (Day 1..7) question.
 */
export function buildWeek1QuestionCPA(day: number, qIndex1Based: number, correctAnswer: string): SingaporeCPASpec {
  const baseA = 12 + day * 3;
  const mult = (day % 4) + 3;
  const bonus = 8 + day * 2;
  const bigVal = baseA * mult;
  const totalAB = baseA + bigVal;
  const diffAB = bigVal - baseA;
  const q7Unit = 7 + day;
  const q7Boxes = 4;
  const q7Total = q7Unit * q7Boxes;
  const q7TargetBoxes = 7;
  const q8Small = 14 + day * 2;
  const q9Unit = baseA + 5;
  const q9Total = q9Unit * 3;
  const q10Small = 10 + day * 2;
  const q10Mid = q10Small * 2;
  const q10Big = q10Mid + 15;
  const q11Transfer = 6 + day;
  const q11Equal = 40 + day * 5;

  switch (qIndex1Based) {
    case 1: {
      // Comparison: A = baseA (1 unit), B = baseA * mult (mult units)
      const barA = makeBarSpec({
        id: 'bar_a',
        label: 'Trạm A',
        units: 1,
        unitValue: baseA,
        displayValue: `${baseA} sao`,
        color: '#38BDF8',
      });
      const barB = makeBarSpec({
        id: 'bar_b',
        label: 'Trạm B',
        units: mult,
        unitValue: baseA,
        displayValue: `? (${mult} phần)`,
        isUnknown: true,
        color: '#A855F7',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'ngôi sao',
          unitLabel: 'ngôi sao',
          actionPrompt: 'Chạm vào từng cụm sao để đếm giá trị của 1 phần và gấp lên nhiều lần',
          interactiveRule: `1 cụm chuẩn = ${baseA} ngôi sao. Trạm B có ${mult} cụm như thế.`,
          groups: [
            { id: 'g_a', label: 'Trạm A (1 cụm)', icon: '⭐', count: 1, unitValue: baseA, totalValue: baseA, color: '#38BDF8' },
            { id: 'g_b', label: `Trạm B (${mult} cụm)`, icon: '🌟', count: mult, unitValue: baseA, totalValue: bigVal, color: '#A855F7', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: baseA,
          unitName: 'ngôi sao',
          bars: [barA, barB],
          differenceBracket: {
            longerBarId: 'bar_b',
            shorterBarId: 'bar_a',
            diffUnits: mult - 1,
            numericValue: diffAB,
            displayLabel: `Hơn ${mult - 1} phần`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Trạm A (1 phần)} = ${baseA}`,
            `\\text{Trạm B (${mult} phần)} = ${baseA} \\;?\\; ${mult} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Trạm A (1 phần)} = ${baseA}\\text{ ngôi sao}`,
            `\\text{Trạm B (${mult} phần)} = ${baseA} \\times ${mult} = ${bigVal}\\text{ ngôi sao}`,
          ],
          finalAnswerLatex: `${bigVal}\\text{ ngôi sao}`,
          finalNumericValue: bigVal,
        },
      };
    }

    case 2: {
      // Comparison: Large = bigVal (mult units), Small = ? (1 unit)
      const barLarge = makeBarSpec({
        id: 'bar_large',
        label: 'Khoang lớn',
        units: mult,
        unitValue: baseA,
        displayValue: `${bigVal} viên`,
        isUnknown: true, // hides single-unit block numbers so child divides bigVal by mult
        color: '#38BDF8',
      });
      const barSmall = makeBarSpec({
        id: 'bar_small',
        label: 'Khoang nhỏ',
        units: 1,
        unitValue: baseA,
        displayValue: '? viên (1 phần)',
        isUnknown: true,
        color: '#34D399',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'viên đá mặt trăng',
          unitLabel: 'viên đá',
          actionPrompt: `Chia đều ${bigVal} viên đá vào ${mult} phần bằng nhau để tìm 1 phần`,
          interactiveRule: `${mult} phần = ${bigVal} viên đá.`,
          groups: [
            { id: 'g_large', label: `Khoang lớn (${mult} phần)`, icon: '🪨', count: mult, unitValue: baseA, totalValue: bigVal, color: '#38BDF8' },
            { id: 'g_small', label: 'Khoang nhỏ (1 phần)', icon: '💎', count: 1, unitValue: baseA, totalValue: baseA, color: '#34D399', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: baseA,
          unitName: 'viên đá',
          bars: [barLarge, barSmall],
          differenceBracket: {
            longerBarId: 'bar_large',
            shorterBarId: 'bar_small',
            diffUnits: mult - 1,
            numericValue: diffAB,
            displayLabel: `Chênh lệch ${mult - 1} phần`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Khoang lớn (${mult} phần)} = ${bigVal}`,
            `\\text{Khoang nhỏ (1 phần)} = ${bigVal} \\;?\\; ${mult} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Khoang lớn (${mult} phần)} = ${bigVal}\\text{ viên đá}`,
            `\\text{Khoang nhỏ (1 phần)} = ${bigVal} \\div ${mult} = ${baseA}\\text{ viên đá}`,
          ],
          finalAnswerLatex: `${baseA}\\text{ viên đá}`,
          finalNumericValue: baseA,
        },
      };
    }

    case 3: {
      // Part-Whole: X (1 unit) + Y (mult units) = Total (mult + 1 units)
      const barX = makeBarSpec({
        id: 'bar_x',
        label: 'Bình X',
        units: 1,
        unitValue: baseA,
        displayValue: `${baseA} L`,
        color: '#38BDF8',
      });
      const barY = makeBarSpec({
        id: 'bar_y',
        label: 'Bình Y',
        units: mult,
        unitValue: baseA,
        displayValue: `? L (${mult} phần)`,
        isUnknown: true,
        color: '#F59E0B',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'bình nhiên liệu',
          unitLabel: 'lít',
          actionPrompt: 'Gộp số phần của Bình X và Bình Y để tính tổng toàn bộ nhiên liệu',
          interactiveRule: `Bình X có 1 phần, Bình Y có ${mult} phần.`,
          groups: [
            { id: 'g_x', label: 'Bình X (1 phần)', icon: '⛽', count: 1, unitValue: baseA, totalValue: baseA, color: '#38BDF8' },
            { id: 'g_y', label: `Bình Y (${mult} phần)`, icon: '🔋', count: mult, unitValue: baseA, totalValue: bigVal, color: '#F59E0B', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: baseA,
          unitName: 'lít',
          bars: [barX, barY],
          totalBracket: {
            targetBarIds: ['bar_x', 'bar_y'],
            numericValue: totalAB,
            displayLabel: `Tổng: ? lít`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Bình Y} = ${baseA} \\;?\\; ${mult} = ?`,
            `\\text{Tổng cả hai bình} = ${baseA} \\;?\\; \\text{Bình Y} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bình Y} = ${baseA} \\times ${mult} = ${bigVal}\\text{ (lít)}`,
            `\\text{Tổng cả hai bình} = ${baseA} + ${bigVal} = ${totalAB}\\text{ (lít)}`,
          ],
          finalAnswerLatex: `${totalAB}\\text{ lít}`,
          finalNumericValue: totalAB,
        },
      };
    }

    case 4: {
      // Comparison: Team 1 (1 unit) vs Team 2 (mult units), find Difference (mult - 1 units)
      const bar1 = makeBarSpec({
        id: 'bar_1',
        label: 'Đội 1',
        units: 1,
        unitValue: baseA,
        displayValue: `${baseA} thùng`,
        color: '#34D399',
      });
      const bar2 = makeBarSpec({
        id: 'bar_2',
        label: 'Đội 2',
        units: mult,
        unitValue: baseA,
        displayValue: `? thùng (${mult} phần)`,
        isUnknown: true,
        color: '#A855F7',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'thùng lương thực',
          unitLabel: 'thùng',
          actionPrompt: 'Đối chiếu 1 phần của Đội 1 với Đội 2 để tìm phần chênh lệch',
          interactiveRule: `Đội 1 có 1 phần, Đội 2 có ${mult} phần.`,
          groups: [
            { id: 'g_1', label: 'Đội 1 (1 phần)', icon: '📦', count: 1, unitValue: baseA, totalValue: baseA, color: '#34D399' },
            { id: 'g_2', label: `Đội 2 (${mult} phần)`, icon: '🏗️', count: mult, unitValue: baseA, totalValue: bigVal, color: '#A855F7', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: baseA,
          unitName: 'thùng',
          bars: [bar1, bar2],
          differenceBracket: {
            longerBarId: 'bar_2',
            shorterBarId: 'bar_1',
            diffUnits: mult - 1,
            numericValue: diffAB,
            displayLabel: `Nhiều hơn: ? thùng`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Hiệu số phần bằng nhau} = ${mult} \\;?\\; 1 = ?`,
            `\\text{Đội 2 nhiều hơn Đội 1} = ${baseA} \\;?\\; (\\text{Hiệu số phần}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Số thùng của Đội 2} = ${baseA} \\times ${mult} = ${bigVal}\\text{ (thùng)}`,
            `\\text{Đội 2 nhiều hơn Đội 1} = ${bigVal} - ${baseA} = ${diffAB}\\text{ (thùng)}`,
          ],
          finalAnswerLatex: `${diffAB}\\text{ thùng}`,
          finalNumericValue: diffAB,
        },
      };
    }

    case 5: {
      // Comparison with positive offset: A = baseA, B = baseA * mult + bonus
      const totalB = bigVal + bonus;
      const barA = makeBarSpec({
        id: 'bar_a',
        label: 'Khu A',
        units: 1,
        unitValue: baseA,
        displayValue: `${baseA} cây`,
        color: '#38BDF8',
      });
      const barB = makeBarSpec({
        id: 'bar_b',
        label: 'Khu B',
        units: mult,
        unitValue: baseA,
        offsetValue: bonus,
        displayValue: `? cây (${mult} phần + ${bonus})`,
        isUnknown: true,
        color: '#F59E0B',
        highlightNote: `+${bonus} cây`,
        deltaType: 'added',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'cây xanh',
          unitLabel: 'cây',
          actionPrompt: `Gấp ${mult} lần Khu A rồi cộng thêm phần mở rộng +${bonus} cây`,
          interactiveRule: `Khu B gồm ${mult} phần bằng Khu A và thêm ${bonus} cây.`,
          groups: [
            { id: 'g_a', label: 'Khu A (1 phần)', icon: '🌱', count: 1, unitValue: baseA, totalValue: baseA, color: '#38BDF8' },
            { id: 'g_b_main', label: `${mult} phần chuẩn`, icon: '🌳', count: mult, unitValue: baseA, totalValue: bigVal, color: '#F59E0B', isUnknown: true },
            { id: 'g_b_bonus', label: 'Trồng thêm', icon: '🌲', count: 1, unitValue: bonus, totalValue: bonus, color: '#34D399' },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: baseA,
          unitName: 'cây',
          bars: [barA, barB],
          differenceBracket: {
            longerBarId: 'bar_b',
            shorterBarId: 'bar_a',
            numericValue: totalB - baseA,
            displayLabel: `Hơn ? cây`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Giá trị ${mult} phần} = ${baseA} \\;?\\; ${mult} = ?`,
            `\\text{Số cây Khu B} = (\\text{${mult} phần}) \\;?\\; ${bonus} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Giá trị ${mult} phần của Khu B} = ${baseA} \\times ${mult} = ${bigVal}\\text{ (cây)}`,
            `\\text{Tổng số cây Khu B} = ${bigVal} + ${bonus} = ${totalB}\\text{ (cây)}`,
          ],
          finalAnswerLatex: `${totalB}\\text{ cây}`,
          finalNumericValue: totalB,
        },
      };
    }

    case 6: {
      // Comparison with negative offset: A = baseA, B = baseA * mult - bonus
      const totalB = bigVal - bonus;
      const barA = makeBarSpec({
        id: 'bar_a',
        label: 'Thiết bị',
        units: 1,
        unitValue: baseA,
        displayValue: `${baseA} kg`,
        color: '#38BDF8',
      });
      const barB = makeBarSpec({
        id: 'bar_b',
        label: 'Máy móc',
        units: mult,
        unitValue: baseA,
        offsetValue: -bonus,
        displayValue: `? kg (${mult} phần - ${bonus})`,
        isUnknown: true,
        color: '#F43F5E',
        highlightNote: `Bớt ${bonus} kg`,
        deltaType: 'removed',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'kiện hàng',
          unitLabel: 'kg',
          actionPrompt: `Xét ${mult} phần chuẩn và phần bớt đi ${bonus} kg`,
          interactiveRule: `Máy móc gồm ${mult} phần bằng Thiết bị nhưng ít hơn ${bonus} kg.`,
          groups: [
            { id: 'g_a', label: 'Thiết bị (1 phần)', icon: '⚙️', count: 1, unitValue: baseA, totalValue: baseA, color: '#38BDF8' },
            { id: 'g_b', label: `Máy móc (${mult} phần - ${bonus} kg)`, icon: '🛠️', count: 1, unitValue: totalB, totalValue: totalB, color: '#F43F5E', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: baseA,
          unitName: 'kg',
          bars: [barA, barB],
          differenceBracket: {
            longerBarId: 'bar_b',
            shorterBarId: 'bar_a',
            numericValue: totalB - baseA,
            displayLabel: `Chênh lệch ? kg`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Gấp ${mult} lần kiện thiết bị} = ${baseA} \\;?\\; ${mult} = ?`,
            `\\text{Kiện máy móc nặng} = (\\text{${mult} phần}) \\;?\\; ${bonus} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Gấp ${mult} lần kiện thiết bị} = ${baseA} \\times ${mult} = ${bigVal}\\text{ (kg)}`,
            `\\text{Kiện máy móc nặng} = ${bigVal} - ${bonus} = ${totalB}\\text{ (kg)}`,
          ],
          finalAnswerLatex: `${totalB}\\text{ kg}`,
          finalNumericValue: totalB,
        },
      };
    }

    case 7: {
      // Unitary Method Comparison: 4 boxes = q7Total -> 7 boxes = q7Unit * 7
      const targetVal = q7Unit * q7TargetBoxes;
      const barKnown = makeBarSpec({
        id: 'bar_known',
        label: `${q7Boxes} hộp đầu`,
        units: q7Boxes,
        unitValue: q7Unit,
        displayValue: `${q7Total} quyển`,
        isUnknown: true, // hide 1-unit label before solving
        color: '#38BDF8',
      });
      const barTarget = makeBarSpec({
        id: 'bar_target',
        label: `${q7TargetBoxes} hộp cần tìm`,
        units: q7TargetBoxes,
        unitValue: q7Unit,
        displayValue: `? quyển (${q7TargetBoxes} hộp)`,
        isUnknown: true,
        color: '#34D399',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'quyển cẩm nang',
          unitLabel: 'quyển',
          actionPrompt: 'Bước 1: Rút về đơn vị (1 hộp). Bước 2: Nhân lên số hộp cần tìm',
          interactiveRule: `${q7Boxes} hộp chứa ${q7Total} quyển.`,
          groups: [
            { id: 'g_known', label: `${q7Boxes} hộp đã biết`, icon: '📚', count: q7Boxes, unitValue: q7Unit, totalValue: q7Total, color: '#38BDF8' },
            { id: 'g_target', label: `${q7TargetBoxes} hộp cần tìm`, icon: '📘', count: q7TargetBoxes, unitValue: q7Unit, totalValue: targetVal, color: '#34D399', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: q7Unit,
          unitName: 'quyển',
          bars: [barKnown, barTarget],
          differenceBracket: {
            longerBarId: 'bar_target',
            shorterBarId: 'bar_known',
            diffUnits: q7TargetBoxes - q7Boxes,
            numericValue: targetVal - q7Total,
            displayLabel: `Thêm ${q7TargetBoxes - q7Boxes} hộp`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Số quyển trong 1 hộp} = ${q7Total} \\;?\\; ${q7Boxes} = ?`,
            `\\text{Số quyển trong ${q7TargetBoxes} hộp} = (\\text{1 hộp}) \\;?\\; ${q7TargetBoxes} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Bước 1 (Rút về 1 hộp)} = ${q7Total} \\div ${q7Boxes} = ${q7Unit}\\text{ (quyển)}`,
            `\\text{Bước 2 (${q7TargetBoxes} hộp)} = ${q7Unit} \\times ${q7TargetBoxes} = ${targetVal}\\text{ (quyển)}`,
          ],
          finalAnswerLatex: `${targetVal}\\text{ quyển}`,
          finalNumericValue: targetVal,
        },
      };
    }

    case 8: {
      // Part-Whole: Alpha (1 unit = q8Small) + Beta (mult units = q8Small * mult) = Total
      const betaVal = q8Small * mult;
      const totalPassengers = q8Small * (mult + 1);
      const barAlpha = makeBarSpec({
        id: 'bar_alpha',
        label: 'Tàu Alpha',
        units: 1,
        unitValue: q8Small,
        displayValue: `${q8Small} khách`,
        color: '#38BDF8',
      });
      const barBeta = makeBarSpec({
        id: 'bar_beta',
        label: 'Tàu Beta',
        units: mult,
        unitValue: q8Small,
        displayValue: `? khách (${mult} phần)`,
        isUnknown: true,
        color: '#A855F7',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'hành khách',
          unitLabel: 'hành khách',
          actionPrompt: 'Gộp số phần hành khách của Tàu Alpha và Tàu Beta',
          interactiveRule: `Tàu Alpha có 1 phần (${q8Small} khách), Tàu Beta có ${mult} phần.`,
          groups: [
            { id: 'g_alpha', label: 'Tàu Alpha (1 phần)', icon: '🚀', count: 1, unitValue: q8Small, totalValue: q8Small, color: '#38BDF8' },
            { id: 'g_beta', label: `Tàu Beta (${mult} phần)`, icon: '🛸', count: mult, unitValue: q8Small, totalValue: betaVal, color: '#A855F7', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: q8Small,
          unitName: 'hành khách',
          bars: [barAlpha, barBeta],
          totalBracket: {
            targetBarIds: ['bar_alpha', 'bar_beta'],
            numericValue: totalPassengers,
            displayLabel: `Tổng: ? hành khách`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tàu Beta (${mult} phần)} = ${q8Small} \\;?\\; ${mult} = ?`,
            `\\text{Tổng cả hai tàu} = ${q8Small} \\;?\\; \\text{Tàu Beta} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Tổng số phần} = 1 + ${mult} = ${mult + 1}\\text{ (phần)}`,
            `\\text{Tổng số hành khách} = ${q8Small} \\times ${mult + 1} = ${totalPassengers}\\text{ (hành khách)}`,
          ],
          finalAnswerLatex: `${totalPassengers}\\text{ hành khách}`,
          finalNumericValue: totalPassengers,
        },
      };
    }

    case 9: {
      // Part-Whole Sum-Ratio: Short (1 unit) + Long (2 units) = Total (3 units = q9Total)
      const barShort = makeBarSpec({
        id: 'bar_short',
        label: 'Đoạn ngắn',
        units: 1,
        unitValue: q9Unit,
        displayValue: '? m (1 phần)',
        isUnknown: true,
        color: '#34D399',
      });
      const barLong = makeBarSpec({
        id: 'bar_long',
        label: 'Đoạn dài',
        units: 2,
        unitValue: q9Unit,
        displayValue: `? m (2 phần)`,
        isUnknown: true,
        color: '#38BDF8',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'đoạn cáp quang',
          unitLabel: 'm',
          actionPrompt: 'Chia tổng chiều dài sợi cáp thành 3 phần bằng nhau (1 phần ngắn + 2 phần dài)',
          interactiveRule: `Tổng chiều dài sợi cáp là ${q9Total} m.`,
          groups: [
            { id: 'g_short', label: 'Đoạn ngắn (1 phần)', icon: '🔌', count: 1, unitValue: q9Unit, totalValue: q9Unit, color: '#34D399', isUnknown: true },
            { id: 'g_long', label: 'Đoạn dài (2 phần)', icon: '⚡', count: 2, unitValue: q9Unit, totalValue: q9Unit * 2, color: '#38BDF8', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: q9Unit,
          unitName: 'm',
          bars: [barShort, barLong],
          totalBracket: {
            targetBarIds: ['bar_short', 'bar_long'],
            numericValue: q9Total,
            displayLabel: `Tổng = ${q9Total} m`,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tổng số phần bằng nhau} = 1 \\;?\\; 2 = ?`,
            `\\text{Đoạn cáp ngắn (1 phần)} = ${q9Total} \\;?\\; (\\text{Tổng số phần}) = ?`,
          ],
          fullLatexSteps: [
            `\\text{Tổng số phần bằng nhau} = 1 + 2 = 3\\text{ (phần)}`,
            `\\text{Độ dài đoạn cáp ngắn} = ${q9Total} \\div 3 = ${q9Unit}\\text{ (m)}`,
          ],
          finalAnswerLatex: `${q9Unit}\\text{ m}`,
          finalNumericValue: q9Unit,
        },
      };
    }

    case 10: {
      // Part-Whole 3 quantities: An (q10Small), Bình (q10Mid), Chi (q10Big = q10Mid + 15)
      const totalScore = q10Small + q10Mid + q10Big;
      const barAn = makeBarSpec({
        id: 'bar_an',
        label: 'Bạn An',
        units: 1,
        unitValue: q10Small,
        displayValue: `${q10Small} điểm`,
        color: '#38BDF8',
      });
      const barBinh = makeBarSpec({
        id: 'bar_binh',
        label: 'Bạn Bình',
        units: 2,
        unitValue: q10Small,
        displayValue: `? điểm (2 phần)`,
        isUnknown: true,
        color: '#F59E0B',
      });
      const barChi = makeBarSpec({
        id: 'bar_chi',
        label: 'Bạn Chi',
        units: 2,
        unitValue: q10Small,
        offsetValue: 15,
        displayValue: `? điểm (Bình + 15)`,
        isUnknown: true,
        color: '#A855F7',
        highlightNote: '+15 điểm',
        deltaType: 'added',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'điểm thưởng',
          unitLabel: 'điểm',
          actionPrompt: 'So sánh số phần của An (1 phần), Bình (2 phần) và Chi (2 phần + 15 điểm)',
          interactiveRule: `An có ${q10Small} điểm, Bình gấp đôi An, Chi nhiều hơn Bình 15 điểm.`,
          groups: [
            { id: 'g_an', label: 'Bạn An (1 phần)', icon: '🏅', count: 1, unitValue: q10Small, totalValue: q10Small, color: '#38BDF8' },
            { id: 'g_binh', label: 'Bạn Bình (2 phần)', icon: '🥈', count: 2, unitValue: q10Small, totalValue: q10Mid, color: '#F59E0B', isUnknown: true },
            { id: 'g_chi', label: 'Bạn Chi (Bình + 15)', icon: '🏆', count: 1, unitValue: q10Big, totalValue: q10Big, color: '#A855F7', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: q10Small,
          unitName: 'điểm',
          bars: [barAn, barBinh, barChi],
          totalBracket: {
            targetBarIds: ['bar_an', 'bar_binh', 'bar_chi'],
            numericValue: totalScore,
            displayLabel: `Tổng cả 3 bạn = ? điểm`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Điểm của Bình} = ${q10Small} \\;?\\; 2 = ?`,
            `\\text{Điểm của Chi} = \\text{Bình} \\;?\\; 15 = ?`,
            `\\text{Tổng điểm 3 bạn} = ${q10Small} \\;?\\; \\text{Bình} \\;?\\; \\text{Chi} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Điểm của Bình} = ${q10Small} \\times 2 = ${q10Mid}\\text{ (điểm)}`,
            `\\text{Điểm của Chi} = ${q10Mid} + 15 = ${q10Big}\\text{ (điểm)}`,
            `\\text{Tổng điểm 3 bạn} = ${q10Small} + ${q10Mid} + ${q10Big} = ${totalScore}\\text{ (điểm)}`,
          ],
          finalAnswerLatex: `${totalScore}\\text{ điểm}`,
          finalNumericValue: totalScore,
        },
      };
    }

    default: {
      // Q11: Before-After (Working Backwards: X gives q11Transfer to Y -> both have q11Equal)
      const initialX = q11Equal + q11Transfer;
      const initialY = q11Equal - q11Transfer;

      const beforeX = makeBarSpec({
        id: 'bar_x',
        label: 'Trạm X (Lúc đầu)',
        units: 1,
        unitValue: q11Equal,
        offsetValue: q11Transfer,
        displayValue: `? viên`,
        isUnknown: true,
        color: '#34D399',
        highlightNote: `Chuyển đi ${q11Transfer}`,
        deltaType: 'transferred_out',
      });
      const beforeY = makeBarSpec({
        id: 'bar_y',
        label: 'Trạm Y (Lúc đầu)',
        units: 1,
        unitValue: initialY,
        displayValue: `? viên`,
        isUnknown: true,
        color: '#38BDF8',
      });

      const afterX = makeBarSpec({
        id: 'bar_x',
        label: 'Trạm X (Lúc sau)',
        units: 1,
        unitValue: q11Equal,
        displayValue: `${q11Equal} viên`,
        color: '#34D399',
      });
      const afterY = makeBarSpec({
        id: 'bar_y',
        label: 'Trạm Y (Lúc sau)',
        units: 1,
        unitValue: initialY,
        offsetValue: q11Transfer,
        displayValue: `${q11Equal} viên (Nhận +${q11Transfer})`,
        color: '#38BDF8',
        highlightNote: `Nhận +${q11Transfer}`,
        deltaType: 'transferred_in',
      });

      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'viên năng lượng',
          unitLabel: 'năng lượng',
          actionPrompt: 'Bấm chuyển đổi trạng thái TRƯỚC ⇄ SAU để quan sát phần năng lượng chuyển từ Trạm X sang Trạm Y',
          interactiveRule: `Sau khi chuyển ${q11Transfer} viên từ X sang Y thì cả hai trạm đều có ${q11Equal} viên.`,
          groups: [
            { id: 'g_x_after', label: 'Trạm X lúc sau', icon: '🔋', count: 1, unitValue: q11Equal, totalValue: q11Equal, color: '#34D399' },
            { id: 'g_transfer', label: 'Phần đã chuyển sang Y', icon: '⚡', count: 1, unitValue: q11Transfer, totalValue: q11Transfer, color: '#F59E0B' },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'before_after',
          unitReferenceValue: q11Equal,
          unitName: 'năng lượng',
          bars: [beforeX, beforeY],
          beforeBars: [beforeX, beforeY],
          afterBars: [afterX, afterY],
          transferSpec: {
            conservationRule: 'constant_total',
            fromBarId: 'bar_x',
            toBarId: 'bar_y',
            deltaValue: q11Transfer,
            description: `Chuyển ${q11Transfer} viên năng lượng từ Trạm X sang Trạm Y thì hai trạm bằng nhau (${q11Equal} viên).`,
          },
          totalBracket: {
            targetBarIds: ['bar_x', 'bar_y'],
            numericValue: q11Equal * 2,
            displayLabel: `Tổng không đổi = ?`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Trạm X lúc sau} = ${q11Equal}`,
            `\\text{Trạm X lúc đầu} = ${q11Equal} \\;?\\; ${q11Transfer} = ?`,
          ],
          fullLatexSteps: [
            `\\text{Sau khi chuyển đi } ${q11Transfer}\\text{ viên, Trạm X còn } ${q11Equal}\\text{ viên}`,
            `\\text{Trạm X lúc đầu} = ${q11Equal} + ${q11Transfer} = ${initialX}\\text{ (năng lượng)}`,
          ],
          finalAnswerLatex: `${initialX}\\text{ năng lượng}`,
          finalNumericValue: extractPrimaryNumber(correctAnswer),
        },
      };
    }
  }
}

export function formatToLatex(raw: string): string {
  if (!raw) return '\\text{}';
  if (raw.includes('\\text{') || raw.includes('\\div') || raw.includes('\\times') || raw.includes('\\quad')) {
    return raw;
  }
  const normalized = raw.replace(/(\d)\s*:\s*(\d)/g, '$1 ÷ $2');
  const mathTokenRegex = /[?]|(?:\d+(?:[.,]\d+)?)|[+=×÷<>]|➔|→|(?<=\d\s*)-(?=\s*\d)/g;
  let result = '';
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  const wrapText = (txt: string) => {
    if (!txt) return '';
    const escaped = txt.replace(/([%#&_])/g, '\\$1').replace(/[{}]/g, '');
    return `\\text{${escaped}}`;
  };

  while ((match = mathTokenRegex.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      result += wrapText(normalized.slice(lastIndex, match.index));
    }
    const tok = match[0];
    if (tok === '×') result += ' \\times ';
    else if (tok === '÷') result += ' \\div ';
    else if (tok === '➔' || tok === '→') result += ' \\Rightarrow ';
    else result += tok;
    lastIndex = mathTokenRegex.lastIndex;
  }
  if (lastIndex < normalized.length) {
    result += wrapText(normalized.slice(lastIndex));
  }
  return result || `\\text{${raw}}`;
}

/**
 * Synthesizes a mathematically verified SingaporeCPASpec from any question's visualModel,
 * prompt, stepByStepExplanation, and correctAnswer (covering Weeks 1..5 and Final Exam).
 */
export function buildCPASpecForQuestion(params: {
  id: string;
  dayNumber?: number;
  qIndex1Based?: number;
  prompt: string;
  correctAnswer: string;
  stepByStepExplanation: string[];
  visualModel: InMonthVisualModelConfig;
}): SingaporeCPASpec {
  const { id, dayNumber, qIndex1Based, correctAnswer, stepByStepExplanation, visualModel } = params;
  const primaryNum = extractPrimaryNumber(correctAnswer);

  // If this is a Week 1 (Day 1..7) question, use the dedicated canonical Week 1 Bar Model builder
  if (dayNumber && dayNumber >= 1 && dayNumber <= 7 && qIndex1Based) {
    return buildWeek1QuestionCPA(dayNumber, qIndex1Based, correctAnswer);
  }

  // Special handling for Review Days (Day 29, 30) Q11 & Exam B1/B2 Before-After / Olympic Bar Models
  if (id === 'nov-d29-q11' || id === 'nov-d30-q11') {
    const k = id === 'nov-d30-q11' ? 2 : 1;
    const totalBooks = 60 * k;
    const transfer = 5 * k;
    const afterTop = 40 * k;
    const afterBottom = 20 * k;
    const beforeTop = afterTop + transfer; // 45 * k
    const beforeBottom = afterBottom - transfer; // 15 * k

    const bTopBefore = makeBarSpec({
      id: 'bar_top',
      label: 'Ngăn trên (Đầu)',
      units: 2,
      unitValue: 20 * k,
      offsetValue: transfer,
      displayValue: `? quyển`,
      isUnknown: true,
      color: '#A855F7',
      highlightNote: `Chuyển đi ${transfer}`,
      deltaType: 'transferred_out',
    });
    const bBotBefore = makeBarSpec({
      id: 'bar_bot',
      label: 'Ngăn dưới (Đầu)',
      units: 1,
      unitValue: beforeBottom,
      displayValue: `? quyển`,
      isUnknown: true,
      color: '#38BDF8',
    });

    const bTopAfter = makeBarSpec({
      id: 'bar_top',
      label: 'Ngăn trên (Sau)',
      units: 2,
      unitValue: 20 * k,
      displayValue: `? quyển (2 phần)`,
      isUnknown: true,
      color: '#A855F7',
    });
    const bBotAfter = makeBarSpec({
      id: 'bar_bot',
      label: 'Ngăn dưới (Sau)',
      units: 1,
      unitValue: beforeBottom,
      offsetValue: transfer,
      displayValue: `? quyển (1 phần)`,
      isUnknown: true,
      color: '#38BDF8',
      highlightNote: `Nhận +${transfer}`,
      deltaType: 'transferred_in',
    });

    return {
      version: '1.0',
      domain: 'bar_model',
      concrete: {
        itemName: 'quyển sách',
        unitLabel: 'quyển',
        actionPrompt: 'Chuyển đổi trạng thái TRƯỚC ⇄ SAU để thấy tổng số sách 2 ngăn luôn bảo toàn',
        interactiveRule: `Tổng không đổi = ${totalBooks} quyển. Sau khi chuyển ${transfer} quyển, ngăn trên gấp 2 lần ngăn dưới.`,
        groups: [
          { id: 'g_top', label: 'Ngăn trên lúc sau (2 phần)', icon: '📚', count: 2, unitValue: 20 * k, totalValue: afterTop, color: '#A855F7', isUnknown: true },
          { id: 'g_transfer', label: 'Sách đã chuyển xuống', icon: '📖', count: 1, unitValue: transfer, totalValue: transfer, color: '#F59E0B' },
        ],
      },
      pictorial: {
        kind: 'bar_model',
        family: 'before_after',
        unitReferenceValue: 20 * k,
        unitName: 'quyển',
        bars: [bTopBefore, bBotBefore],
        beforeBars: [bTopBefore, bBotBefore],
        afterBars: [bTopAfter, bBotAfter],
        transferSpec: {
          conservationRule: 'constant_total',
          fromBarId: 'bar_top',
          toBarId: 'bar_bot',
          deltaValue: transfer,
          description: `Chuyển ${transfer} quyển từ ngăn trên xuống ngăn dưới thì ngăn trên gấp đôi ngăn dưới.`,
        },
        totalBracket: {
          targetBarIds: ['bar_top', 'bar_bot'],
          numericValue: totalBooks,
          displayLabel: `Tổng không đổi = ${totalBooks} quyển`,
        },
      },
      abstract: {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Tổng số phần lúc sau} = 2 \\;?\\; 1 = ?`,
          `\\text{Ngăn trên lúc sau (2 phần)} = (${totalBooks} \\;?\\; \\text{Tổng phần}) \\;?\\; 2 = ?`,
          `\\text{Ngăn trên lúc đầu} = (\\text{Ngăn trên lúc sau}) \\;?\\; ${transfer} = ?`,
        ],
        fullLatexSteps: [
          `\\text{Tổng số phần lúc sau} = 2 + 1 = 3\\text{ (phần)}`,
          `\\text{Ngăn trên lúc sau} = (${totalBooks} \\div 3) \\times 2 = ${afterTop}\\text{ (quyển)}`,
          `\\text{Ngăn trên lúc đầu} = ${afterTop} + ${transfer} = ${beforeTop}\\text{ (quyển)}`,
        ],
        finalAnswerLatex: `${beforeTop}\\text{ quyển}`,
        finalNumericValue: beforeTop,
      },
    };
  }

  if (id === 'nov-exam-b1') {
    const bABefore = makeBarSpec({
      id: 'bar_a',
      label: 'Kho A (Lúc đầu)',
      units: 2,
      unitValue: 32,
      offsetValue: 8,
      displayValue: '? tấn',
      isUnknown: true,
      color: '#A855F7',
      highlightNote: 'Chuyển đi 8 tấn',
      deltaType: 'transferred_out',
    });
    const bBBefore = makeBarSpec({
      id: 'bar_b',
      label: 'Kho B (Lúc đầu)',
      units: 1,
      unitValue: 24,
      displayValue: '? tấn',
      isUnknown: true,
      color: '#38BDF8',
    });
    const bAAfter = makeBarSpec({
      id: 'bar_a',
      label: 'Kho A (Lúc sau)',
      units: 2,
      unitValue: 32,
      displayValue: '? tấn (2 phần)',
      isUnknown: true,
      color: '#A855F7',
    });
    const bBAfter = makeBarSpec({
      id: 'bar_b',
      label: 'Kho B (Lúc sau)',
      units: 1,
      unitValue: 24,
      offsetValue: 8,
      displayValue: '? tấn (1 phần)',
      isUnknown: true,
      color: '#38BDF8',
      highlightNote: 'Nhận +8 tấn',
      deltaType: 'transferred_in',
    });
    return {
      version: '1.0',
      domain: 'bar_model',
      concrete: {
        itemName: 'tấn lương thực',
        unitLabel: 'tấn',
        actionPrompt: 'Chuyển đổi TRƯỚC ⇄ SAU để kiểm chứng bất biến Tổng = 96 tấn',
        interactiveRule: 'Tổng 2 kho luôn bằng 96 tấn.',
        groups: [
          { id: 'g_a', label: 'Kho A lúc sau (2 phần)', icon: '🏭', count: 2, unitValue: 32, totalValue: 64, color: '#A855F7', isUnknown: true },
          { id: 'g_tr', label: 'Lượng chuyển sang Kho B', icon: '🚚', count: 1, unitValue: 8, totalValue: 8, color: '#F59E0B' },
        ],
      },
      pictorial: {
        kind: 'bar_model',
        family: 'before_after',
        unitReferenceValue: 32,
        unitName: 'tấn',
        bars: [bABefore, bBBefore],
        beforeBars: [bABefore, bBBefore],
        afterBars: [bAAfter, bBAfter],
        transferSpec: {
          conservationRule: 'constant_total',
          fromBarId: 'bar_a',
          toBarId: 'bar_b',
          deltaValue: 8,
          description: 'Chuyển 8 tấn từ Kho A sang Kho B thì Kho A gấp đôi Kho B (Tổng không đổi = 96 tấn).',
        },
        totalBracket: {
          targetBarIds: ['bar_a', 'bar_b'],
          numericValue: 96,
          displayLabel: 'Tổng không đổi = 96 tấn',
        },
      },
      abstract: {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Tổng số phần lúc sau} = 2 \\;?\\; 1 = ?`,
          `\\text{Kho A lúc sau (2 phần)} = (96 \\;?\\; \\text{Tổng phần}) \\;?\\; 2 = ?`,
          `\\text{Kho A lúc đầu} = (\\text{Kho A lúc sau}) \\;?\\; 8 = ?`,
        ],
        fullLatexSteps: [
          `\\text{Tổng không đổi} = 96\\text{ tấn (3 phần bằng nhau lúc sau)}`,
          `\\text{Kho A lúc sau} = (96 \\div 3) \\times 2 = 64\\text{ (tấn)}`,
          `\\text{Kho A lúc đầu} = 64 + 8 = 72\\text{ (tấn)}`,
        ],
        finalAnswerLatex: `72\\text{ tấn}`,
        finalNumericValue: 72,
      },
    };
  }

  if (id === 'nov-exam-b2') {
    const bNamBefore = makeBarSpec({
      id: 'bar_nam',
      label: 'Bạn Nam (Đầu)',
      units: 1,
      unitValue: 8,
      displayValue: '? viên (1 phần)',
      isUnknown: true,
      color: '#34D399',
    });
    const bMinhBefore = makeBarSpec({
      id: 'bar_minh',
      label: 'Bạn Minh (Đầu)',
      units: 4,
      unitValue: 8,
      displayValue: '? viên (4 phần)',
      isUnknown: true,
      color: '#F59E0B',
      highlightNote: 'Cho Nam 12 viên',
      deltaType: 'transferred_out',
    });
    const bNamAfter = makeBarSpec({
      id: 'bar_nam',
      label: 'Bạn Nam (Sau)',
      units: 1,
      unitValue: 8,
      offsetValue: 12,
      displayValue: 'Bằng Minh (Nhận +12)',
      isUnknown: true,
      color: '#34D399',
      deltaType: 'transferred_in',
    });
    const bMinhAfter = makeBarSpec({
      id: 'bar_minh',
      label: 'Bạn Minh (Sau)',
      units: 4,
      unitValue: 8,
      offsetValue: -12,
      displayValue: 'Bằng Nam (Bớt 12)',
      isUnknown: true,
      color: '#F59E0B',
      deltaType: 'removed',
    });
    return {
      version: '1.0',
      domain: 'bar_model',
      concrete: {
        itemName: 'viên bi',
        unitLabel: 'viên bi',
        actionPrompt: 'Quan sát phép chuyển 12 viên bi từ Minh sang Nam làm hai thanh bằng nhau',
        interactiveRule: 'Minh cho Nam 12 viên thì hai bạn bằng nhau.',
        groups: [
          { id: 'g_nam', label: 'Nam lúc đầu (1 phần)', icon: '🟢', count: 1, unitValue: 8, totalValue: 8, color: '#34D399', isUnknown: true },
          { id: 'g_minh', label: 'Minh lúc đầu (4 phần)', icon: '🟠', count: 4, unitValue: 8, totalValue: 32, color: '#F59E0B', isUnknown: true },
        ],
      },
      pictorial: {
        kind: 'bar_model',
        family: 'before_after',
        unitReferenceValue: 8,
        unitName: 'viên bi',
        bars: [bNamBefore, bMinhBefore],
        beforeBars: [bNamBefore, bMinhBefore],
        afterBars: [bNamAfter, bMinhAfter],
        transferSpec: {
          conservationRule: 'constant_total',
          fromBarId: 'bar_minh',
          toBarId: 'bar_nam',
          deltaValue: 12,
          description: 'Minh chuyển cho Nam 12 viên bi thì hai bạn bằng nhau.',
        },
        differenceBracket: {
          longerBarId: 'bar_minh',
          shorterBarId: 'bar_nam',
          diffUnits: 3,
          numericValue: 24,
          displayLabel: 'Hiệu lúc đầu = ? viên (3 phần)',
          isUnknown: true,
        },
      },
      abstract: {
        unknownSymbol: '?',
        guidedLatexSteps: [
          `\\text{Hiệu số bi lúc đầu} = 12 \\;?\\; 2 = ?`,
          `\\text{Hiệu số phần bằng nhau} = 4 \\;?\\; 1 = ?`,
          `\\text{Số bi của Nam (1 phần)} = (\\text{Hiệu số bi}) \\;?\\; (\\text{Hiệu số phần}) = ?`,
        ],
        fullLatexSteps: [
          `\\text{Lúc đầu Minh hơn Nam} = 12 \\times 2 = 24\\text{ (viên bi)}`,
          `\\text{Hiệu số phần bằng nhau} = 4 - 1 = 3\\text{ (phần)}`,
          `\\text{Số bi của Nam lúc đầu} = 24 \\div 3 = 8\\text{ (viên bi)}`,
        ],
        finalAnswerLatex: `8\\text{ viên bi}`,
        finalNumericValue: 8,
      },
    };
  }

  // Generic Bar Model (Review Day Q1, Q6, Exam A1, A2, A10, B10)
  if (visualModel.type === 'bar_model') {
    const rawBars = visualModel.bars || [];
    // Determine unit reference value from the first 1-unit bar or fallback
    const firstBarNum = extractPrimaryNumber(rawBars[0]?.valueLabel || '') || 10;
    const firstBarUnits = Math.max(1, rawBars[0]?.units || 1);
    const unitRef = Math.max(1, Math.round(firstBarNum / firstBarUnits));

    // Special exact configurations for Review Day Q1/Q6 and Exam A1/A2/A10/B10
    if (id === 'nov-d29-q1' || id === 'nov-d30-q1' || id === 'nov-exam-a1') {
      const k = id === 'nov-d30-q1' ? 2 : 1;
      const aVal = id === 'nov-exam-a1' ? 24 : 18 * k;
      const bVal = aVal * 3;
      const totalVal = aVal + bVal;
      const unitTxt = id === 'nov-exam-a1' ? 'vệ tinh' : 'phi thuyền';
      const labelA = id === 'nov-exam-a1' ? 'Trạm A' : 'Đội Tiên Phong';
      const labelB = id === 'nov-exam-a1' ? 'Trạm B' : 'Đội Tinh Vân';

      const bA = makeBarSpec({
        id: 'bar_1',
        label: labelA,
        units: 1,
        unitValue: aVal,
        displayValue: `${aVal} ${unitTxt}`,
        color: '#38BDF8',
      });
      const bB = makeBarSpec({
        id: 'bar_2',
        label: labelB,
        units: 3,
        unitValue: aVal,
        displayValue: `? ${unitTxt} (3 phần)`,
        isUnknown: true,
        color: '#A855F7',
      });

      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: unitTxt,
          unitLabel: unitTxt,
          actionPrompt: `So sánh ${labelA} (1 phần) và ${labelB} (3 phần)`,
          interactiveRule: `${labelA} có ${aVal} ${unitTxt}, ${labelB} gấp 3 lần.`,
          groups: [
            { id: 'cg_bar_1', label: `${labelA} (1 phần)`, icon: '🚀', count: 1, unitValue: aVal, totalValue: aVal, color: '#38BDF8' },
            { id: 'cg_bar_2', label: `${labelB} (3 phần)`, icon: '🛸', count: 3, unitValue: aVal, totalValue: bVal, color: '#A855F7', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: aVal,
          unitName: unitTxt,
          bars: [bA, bB],
          totalBracket: {
            targetBarIds: ['bar_1', 'bar_2'],
            numericValue: totalVal,
            displayLabel: `Tổng = ? ${unitTxt}`,
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{${labelB}} = ${aVal} \\;?\\; 3 = ?`,
            `\\text{Cả hai} = ${aVal} \\;?\\; \\text{${labelB}} = ?`,
          ],
          fullLatexSteps: stepByStepExplanation.map(formatToLatex),
          finalAnswerLatex: formatToLatex(correctAnswer),
          finalNumericValue: totalVal,
        },
      };
    }

    if (id === 'nov-d29-q6' || id === 'nov-d30-q6') {
      const k = id === 'nov-d30-q6' ? 2 : 1;
      const valA = 25 * k;
      const valB = 50 * k + 10;
      const diffVal = valB - valA;

      const bA = makeBarSpec({
        id: 'bar_1',
        label: 'Kho A',
        units: 1,
        unitValue: valA,
        displayValue: `${valA} thùng`,
        color: '#38BDF8',
      });
      const bB = makeBarSpec({
        id: 'bar_2',
        label: 'Kho B',
        units: 2,
        unitValue: valA,
        offsetValue: 10,
        displayValue: `? thùng (2 phần + 10)`,
        isUnknown: true,
        color: '#F59E0B',
        highlightNote: '+10 thùng',
      });

      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'thùng hàng',
          unitLabel: 'thùng',
          actionPrompt: 'So sánh Kho B (2 phần + 10) với Kho A (1 phần)',
          interactiveRule: `Kho A có ${valA} thùng, Kho B gấp 2 lần và thêm 10 thùng.`,
          groups: [
            { id: 'cg_bar_1', label: 'Kho A (1 phần)', icon: '📦', count: 1, unitValue: valA, totalValue: valA, color: '#38BDF8' },
            { id: 'cg_bar_2', label: 'Kho B (2 phần + 10)', icon: '🏗️', count: 2, unitValue: valA, totalValue: 50 * k, color: '#F59E0B', note: '+10 thùng', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: valA,
          unitName: 'thùng',
          bars: [bA, bB],
          differenceBracket: {
            longerBarId: 'bar_2',
            shorterBarId: 'bar_1',
            numericValue: diffVal,
            displayLabel: 'Hơn = ? thùng',
            isUnknown: true,
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Số thùng Kho B} = (${valA} \\;?\\; 2) \\;?\\; 10 = ?`,
            `\\text{Kho B hơn Kho A} = \\text{Kho B} \\;?\\; ${valA} = ?`,
          ],
          fullLatexSteps: stepByStepExplanation.map(formatToLatex),
          finalAnswerLatex: formatToLatex(correctAnswer),
          finalNumericValue: diffVal,
        },
      };
    }

    if (id === 'nov-exam-a2') {
      const b1 = makeBarSpec({
        id: 'bar_1',
        label: 'Thùng 1',
        units: 1,
        unitValue: 18,
        displayValue: '18 L',
        color: '#38BDF8',
      });
      const b2 = makeBarSpec({
        id: 'bar_2',
        label: 'Thùng 2',
        units: 4,
        unitValue: 18,
        offsetValue: 6,
        displayValue: '? L (4 phần + 6 L)',
        isUnknown: true,
        color: '#F59E0B',
        highlightNote: '+6 L',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'lít nhiên liệu',
          unitLabel: 'lít',
          actionPrompt: 'Gấp 4 lần Thùng 1 rồi thêm 6 lít',
          interactiveRule: 'Thùng 1 chứa 18 L, Thùng 2 gấp 4 lần và thêm 6 L.',
          groups: [
            { id: 'cg_bar_1', label: 'Thùng 1 (1 phần)', icon: '⛽', count: 1, unitValue: 18, totalValue: 18, color: '#38BDF8' },
            { id: 'cg_bar_2', label: 'Thùng 2 (4 phần + 6)', icon: '🛢️', count: 4, unitValue: 18, totalValue: 72, color: '#F59E0B', note: '+6 L', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: 18,
          unitName: 'lít',
          bars: [b1, b2],
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{4 lần Thùng 1} = 18 \\;?\\; 4 = ?`,
            `\\text{Thùng 2} = (\\text{4 phần}) \\;?\\; 6 = ?`,
          ],
          fullLatexSteps: stepByStepExplanation.map(formatToLatex),
          finalAnswerLatex: formatToLatex(correctAnswer),
          finalNumericValue: 78,
        },
      };
    }

    if (id === 'nov-exam-a10') {
      const b7 = makeBarSpec({
        id: 'bar_1',
        label: '7 hộp',
        units: 7,
        unitValue: 8,
        displayValue: '56 viên',
        isUnknown: true,
        color: '#38BDF8',
      });
      const b5 = makeBarSpec({
        id: 'bar_2',
        label: '5 hộp',
        units: 5,
        unitValue: 8,
        displayValue: '? viên (5 phần)',
        isUnknown: true,
        color: '#34D399',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'viên pin',
          unitLabel: 'viên',
          actionPrompt: 'Rút về 1 hộp rồi tính cho 5 hộp',
          interactiveRule: '7 hộp có 56 viên pin.',
          groups: [
            { id: 'cg_bar_1', label: '7 hộp đã biết', icon: '🔋', count: 7, unitValue: 8, totalValue: 56, color: '#38BDF8' },
            { id: 'cg_bar_2', label: '5 hộp cần tìm', icon: '⚡', count: 5, unitValue: 8, totalValue: 40, color: '#34D399', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'comparison',
          unitReferenceValue: 8,
          unitName: 'viên',
          bars: [b7, b5],
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Số viên pin trong 1 hộp} = 56 \\;?\\; 7 = ?`,
            `\\text{Số viên pin trong 5 hộp} = (\\text{1 hộp}) \\;?\\; 5 = ?`,
          ],
          fullLatexSteps: stepByStepExplanation.map(formatToLatex),
          finalAnswerLatex: formatToLatex(correctAnswer),
          finalNumericValue: 40,
        },
      };
    }

    if (id === 'nov-exam-b10') {
      const barB = makeBarSpec({
        id: 'bar_b',
        label: 'Bình B',
        units: 1,
        unitValue: 300,
        displayValue: '? mL',
        isUnknown: true,
        color: '#38BDF8',
      });
      const barA = makeBarSpec({
        id: 'bar_a',
        label: 'Bình A',
        units: 1,
        unitValue: 300,
        offsetValue: 200,
        displayValue: '? mL (B + 200)',
        isUnknown: true,
        color: '#34D399',
        highlightNote: '+200 mL',
      });
      const barC = makeBarSpec({
        id: 'bar_c',
        label: 'Bình C',
        units: 2,
        unitValue: 800,
        displayValue: '? mL (Gấp đôi A+B)',
        isUnknown: true,
        color: '#A855F7',
      });
      return {
        version: '1.0',
        domain: 'bar_model',
        concrete: {
          itemName: 'nước',
          unitLabel: 'mL',
          actionPrompt: 'Tìm tổng (A + B) trước rồi giải bài toán Tổng – Hiệu',
          interactiveRule: 'Tổng 3 bình = 2 L 400 mL. C gấp đôi (A + B), A hơn B 200 mL.',
          groups: [
            { id: 'cg_bar_b', label: 'Bình B', icon: '🧪', count: 1, unitValue: 300, totalValue: 300, color: '#38BDF8', isUnknown: true },
            { id: 'cg_bar_a', label: 'Bình A (B + 200)', icon: '⚗️', count: 1, unitValue: 300, totalValue: 300, color: '#34D399', note: '+200 mL', isUnknown: true },
            { id: 'cg_bar_c', label: 'Bình C (2 × (A+B))', icon: '🫙', count: 2, unitValue: 800, totalValue: 1600, color: '#A855F7', isUnknown: true },
          ],
        },
        pictorial: {
          kind: 'bar_model',
          family: 'part_whole',
          unitReferenceValue: 300,
          unitName: 'mL',
          bars: [barB, barA, barC],
          totalBracket: {
            targetBarIds: ['bar_b', 'bar_a', 'bar_c'],
            numericValue: 2400,
            displayLabel: 'Tổng 3 bình = 2400 mL',
          },
        },
        abstract: {
          unknownSymbol: '?',
          guidedLatexSteps: [
            `\\text{Tổng số phần (A+B và C)} = 1 \\;?\\; 2 = ?`,
            `\\text{Tổng A + B} = 2400 \\;?\\; (\\text{Tổng số phần}) = ?`,
            `\\text{Lượng nước Bình A} = ((\\text{A + B}) \\;?\\; 200) \\;?\\; 2 = ?`,
          ],
          fullLatexSteps: stepByStepExplanation.map(formatToLatex),
          finalAnswerLatex: formatToLatex(correctAnswer),
          finalNumericValue: 500,
        },
      };
    }

    // Generic fallback Bar Model
    const barSpecs: BarModelBarSpec[] = rawBars.map((b, idx) => {
      const offsetMatch = b.highlightNote?.match(/([+-])\s*(\d+)/);
      const offsetVal = offsetMatch
        ? (offsetMatch[1] === '-' ? -1 : 1) * parseInt(offsetMatch[2], 10)
        : 0;
      const containsAnswer = primaryNum > 0 && b.valueLabel.includes(String(primaryNum));

      return makeBarSpec({
        id: `bar_${idx + 1}`,
        label: b.label,
        units: b.units,
        unitValue: unitRef,
        offsetValue: offsetVal,
        displayValue: containsAnswer ? `? (${b.units} phần)` : b.valueLabel,
        isUnknown: b.valueLabel.includes('?') || containsAnswer,
        color: b.color,
        highlightNote: b.highlightNote,
      });
    });

    const sumAllBars = barSpecs.reduce((s, b) => s + b.numericValue, 0);
    const hasTotal = !!visualModel.totalBracketLabel;
    const hasDiff = !!visualModel.differenceBracketLabel;
    const family = hasTotal ? 'part_whole' : 'comparison';

    const pictorial: BarModelPictorialSpec = {
      kind: 'bar_model',
      family,
      unitReferenceValue: unitRef,
      unitName: 'đơn vị',
      bars: barSpecs,
      totalBracket: hasTotal
        ? {
            targetBarIds: barSpecs.map((b) => b.id),
            numericValue: sumAllBars,
            displayLabel: visualModel.totalBracketLabel!,
            isUnknown: primaryNum > 0 && visualModel.totalBracketLabel!.includes(String(primaryNum)),
          }
        : undefined,
      differenceBracket:
        hasDiff && barSpecs.length >= 2
          ? {
              longerBarId: barSpecs[barSpecs.length - 1].id,
              shorterBarId: barSpecs[0].id,
              numericValue: Math.abs(
                barSpecs[barSpecs.length - 1].numericValue - barSpecs[0].numericValue
              ),
              displayLabel: visualModel.differenceBracketLabel!,
              isUnknown:
                primaryNum > 0 && visualModel.differenceBracketLabel!.includes(String(primaryNum)),
            }
          : undefined,
    };

    const concreteGroups: CPAConcreteGroup[] = barSpecs.map((b) => ({
      id: `cg_${b.id}`,
      label: b.label,
      icon: '📦',
      count: b.units,
      unitValue: b.unitValue,
      totalValue: b.units * b.unitValue,
      color: b.color,
      note: b.highlightNote,
      isUnknown: b.isUnknown,
    }));

    return {
      version: '1.0',
      domain: 'bar_model',
      concrete: {
        itemName: 'đơn vị',
        unitLabel: 'đơn vị',
        actionPrompt: 'Chạm vào từng nhóm để kiểm tra giá trị 1 phần và tổng/hiệu các phần',
        interactiveRule: visualModel.title,
        groups: concreteGroups,
      },
      pictorial,
      abstract: {
        unknownSymbol: '?',
        guidedLatexSteps:
          stepByStepExplanation.length > 0
            ? stepByStepExplanation.map((s) => maskExplanationToGuided(s, primaryNum))
            : [`\\text{Kết quả cần tìm} = ?`],
        fullLatexSteps:
          stepByStepExplanation.length > 0
            ? stepByStepExplanation.map(formatToLatex)
            : [formatToLatex(`Đáp án = ${correctAnswer}`)],
        finalAnswerLatex: formatToLatex(correctAnswer),
        finalNumericValue: primaryNum,
      },
    };
  }

  // Domain 2: Remainder Groups
  if (visualModel.type === 'remainder_groups') {
    const divisor = visualModel.divisor ?? 5;
    const quotient = visualModel.quotient ?? 4;
    const remainder = visualModel.remainder ?? 0;
    const dividend = visualModel.dividend ?? divisor * quotient + remainder;
    const icon = visualModel.itemIcon || '⭐';
    const groupLabel = visualModel.groupLabel || 'Nhóm';

    // Determine what is unknown & exact guided LaTeX steps
    let unknownTarget: 'quotient_and_remainder' | 'dividend' | 'quotient' | 'remainder' =
      'quotient_and_remainder';
    let guidedLatexSteps: string[] = [];

    if (dayNumber && dayNumber >= 8 && dayNumber <= 14 && qIndex1Based) {
      switch (qIndex1Based) {
        case 1:
          unknownTarget = 'quotient_and_remainder';
          guidedLatexSteps = [`${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`];
          break;
        case 2:
          unknownTarget = 'remainder';
          guidedLatexSteps = [`\\text{Số dư lớn nhất} = ${divisor} \\;?\\; 1 = ?`];
          break;
        case 3:
          unknownTarget = 'dividend';
          guidedLatexSteps = [`X = (${quotient} \\;?\\; ${divisor}) \\;?\\; ${remainder} = ?`];
          break;
        case 4:
          unknownTarget = 'quotient_and_remainder';
          guidedLatexSteps = [
            `\\text{Chia số nhóm} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`,
            `\\text{Số khoang tàu ít nhất} = (\\text{Thương}) \\;?\\; 1 = ?`,
          ];
          break;
        case 5:
          unknownTarget = 'quotient_and_remainder';
          guidedLatexSteps = [`\\text{Số hộp đầy} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`];
          break;
        case 6:
          unknownTarget = 'remainder';
          guidedLatexSteps = [`\\text{Số viên cần thêm} = ${divisor} \\;?\\; ${remainder} = ?`];
          break;
        case 7:
          unknownTarget = 'quotient_and_remainder';
          guidedLatexSteps = [`\\text{Vị trí trong chu kỳ} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`];
          break;
        case 8:
          unknownTarget = 'quotient_and_remainder';
          guidedLatexSteps = [`\\text{Số tuần và ngày lẻ} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`];
          break;
        case 9:
          unknownTarget = 'remainder';
          guidedLatexSteps = [`\\text{Chia đều vào giỏ} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`];
          break;
        case 10:
          unknownTarget = 'dividend';
          guidedLatexSteps = [
            `\\text{Số dư lớn nhất} = ${divisor} \\;?\\; 1 = ?`,
            `\\text{Số bị chia} = (${quotient} \\;?\\; ${divisor}) \\;?\\; (\\text{Số dư lớn nhất}) = ?`,
          ];
          break;
        default:
          unknownTarget = 'quotient_and_remainder';
          guidedLatexSteps = [
            `\\text{Số chu kỳ 4 hạt} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`,
            `\\text{Tổng hạt màu Đỏ} = (\\text{Số chu kỳ}) \\;?\\; (\\text{Hạt Đỏ dư}) = ?`,
          ];
          break;
      }
    } else if (id === 'nov-d29-q3' || id === 'nov-d30-q3' || id === 'nov-exam-a4') {
      unknownTarget = 'quotient_and_remainder';
      guidedLatexSteps = [
        `\\text{Chia số nhóm đầy} = ${dividend} \\;?\\; ${divisor} = ?\\text{ (dư } ?\\text{)}`,
        `\\text{Cần ít nhất} = (\\text{Thương}) \\;?\\; 1 = ?`,
      ];
    } else if (id === 'nov-d29-q7' || id === 'nov-d30-q7') {
      unknownTarget = 'dividend';
      guidedLatexSteps = [
        `\\text{Số dư lớn nhất} = ${divisor} \\;?\\; 1 = ?`,
        `\\text{Số bị chia lớn nhất} = (${quotient} \\;?\\; ${divisor}) \\;?\\; (\\text{Số dư lớn nhất}) = ?`,
      ];
    } else if (id === 'nov-exam-a3') {
      unknownTarget = 'dividend';
      guidedLatexSteps = [`\\text{Số bị chia} = (${quotient} \\;?\\; ${divisor}) \\;?\\; ${remainder} = ?`];
    } else if (id === 'nov-exam-b3') {
      unknownTarget = 'dividend';
      guidedLatexSteps = [
        `\\text{Số dư lớn nhất} = 9 \\;?\\; 1 = ?`,
        `\\text{Số bị chia} = (12 \\;?\\; 9) \\;?\\; (\\text{Số dư lớn nhất}) = ?`,
        `\\text{Đem chia cho 5} = (\\text{Số bị chia}) \\;?\\; 5 = ?\\text{ (dư } ?\\text{)}`,
      ];
    } else if (id === 'nov-exam-b4') {
      unknownTarget = 'quotient_and_remainder';
      guidedLatexSteps = [
        `\\text{Số chu kỳ 5 màu} = 47 \\;?\\; 5 = ?\\text{ (dư } ?\\text{)}`,
        `\\text{Số sao Đỏ và Cam} = (\\text{Số chu kỳ} \\;?\\; 2) \\;?\\; (\\text{Sao Đỏ, Cam dư}) = ?`,
      ];
    } else {
      guidedLatexSteps =
        stepByStepExplanation.length > 0
          ? stepByStepExplanation.map((s) => maskExplanationToGuided(s, primaryNum))
          : [`${dividend} \\;?\\; ${divisor} = ?`];
    }

    const isDividendUnknown = unknownTarget === 'dividend';
    const isQuotientOrRemUnknown = !isDividendUnknown;

    const groups: CPAConcreteGroup[] = [
      {
        id: 'cg_full_groups',
        label: isQuotientOrRemUnknown ? `? ${groupLabel} nguyên` : `${quotient} ${groupLabel} nguyên`,
        icon,
        count: quotient,
        unitValue: divisor,
        totalValue: quotient * divisor,
        color: '#38BDF8',
        isUnknown: true,
      },
    ];
    if (remainder > 0) {
      groups.push({
        id: 'cg_remainder',
        label: isQuotientOrRemUnknown && !isDividendUnknown ? 'Phần dư (?)' : 'Phần dư lẻ',
        icon,
        count: 1,
        unitValue: remainder,
        totalValue: remainder,
        color: '#F59E0B',
        isUnknown: !isDividendUnknown,
      });
    }

    return {
      version: '1.0',
      domain: 'remainder_groups',
      concrete: {
        itemName: 'vật phẩm',
        unitLabel: groupLabel,
        actionPrompt: `Xếp vật phẩm vào từng ${groupLabel} (${divisor} vật phẩm/nhóm) để quan sát phần dư`,
        interactiveRule: `${divisor} vật phẩm mỗi ${groupLabel.toLowerCase()}.`,
        groups,
      },
      pictorial: {
        kind: 'remainder_groups',
        dividend,
        divisor,
        quotient,
        remainder,
        itemIcon: icon,
        groupLabel,
        contextMode: 'standard_division',
        unknownTarget,
        targetValue: primaryNum,
      },
      abstract: {
        unknownSymbol: '?',
        guidedLatexSteps,
        fullLatexSteps: [
          `${dividend} = ${divisor} \\times ${quotient} + ${remainder}\\quad (0 \\le ${remainder} < ${divisor})`,
          ...stepByStepExplanation.map(formatToLatex),
        ],
        finalAnswerLatex: formatToLatex(correctAnswer),
        finalNumericValue: primaryNum,
      },
    };
  }

  // Domain 3: Interval Model
  if (visualModel.type === 'interval_model') {
    const subtype = visualModel.intervalSubtype || 'both_ends';
    const intervalsCount = visualModel.intervalsCount ?? 6;
    const stepLength = visualModel.stepLength ?? 5;
    const totalLength = visualModel.totalLength ?? intervalsCount * stepLength;
    const objectsCount =
      visualModel.objectsCount ??
      (subtype === 'both_ends' || subtype === 'stairs'
        ? intervalsCount + 1
        : subtype === 'one_end' || subtype === 'closed_loop'
        ? intervalsCount
        : intervalsCount - 1);
    const unitLabel = visualModel.unitLabel || 'm';
    const objectIcon = visualModel.objectIcon || '🌳';

    const ruleFormula =
      subtype === 'both_ends'
        ? `\\text{Số mốc} = \\text{Số khoảng} + 1 = ${intervalsCount} + 1 = ${objectsCount}`
        : subtype === 'one_end' || subtype === 'closed_loop'
        ? `\\text{Số mốc} = \\text{Số khoảng} = ${intervalsCount}`
        : subtype === 'wood_cuts'
        ? `\\text{Số lần cắt} = \\text{Số đoạn} - 1 = ${intervalsCount} - 1 = ${objectsCount}`
        : subtype === 'stairs'
        ? `\\text{Số khoảng tầng} = \\text{Tầng đến} - 1 = ${objectsCount} - 1 = ${intervalsCount}`
        : `\\text{Số mốc} = \\text{Số khoảng} - 1 = ${intervalsCount} - 1 = ${objectsCount}`;

    let unknownTarget: 'intervals' | 'objects' | 'total_length' | 'step_length' = 'objects';
    let guidedLatexSteps: string[] = [];

    if (dayNumber && dayNumber >= 15 && dayNumber <= 21 && qIndex1Based) {
      switch (qIndex1Based) {
        case 1:
          unknownTarget = 'intervals';
          guidedLatexSteps = [`\\text{Số khoảng cách} = ${totalLength} \\;?\\; ${stepLength} = ?`];
          break;
        case 2:
          unknownTarget = 'objects';
          guidedLatexSteps = [
            `\\text{Số khoảng cách} = ${totalLength} \\;?\\; ${stepLength} = ?`,
            `\\text{Số cây (cả 2 đầu)} = (\\text{Số khoảng}) \\;?\\; 1 = ?`,
          ];
          break;
        case 3:
          unknownTarget = 'objects';
          guidedLatexSteps = [
            `\\text{Số khoảng cách} = ${totalLength} \\;?\\; ${stepLength} = ?`,
            `\\text{Số cột đèn (1 đầu)} = ?`,
          ];
          break;
        case 4:
          unknownTarget = 'objects';
          guidedLatexSteps = [
            `\\text{Số khoảng cách} = ${totalLength} \\;?\\; ${stepLength} = ?`,
            `\\text{Số biển báo (2 đầu trống)} = (\\text{Số khoảng}) \\;?\\; 1 = ?`,
          ];
          break;
        case 5:
          unknownTarget = 'objects';
          guidedLatexSteps = [`\\text{Số cây (đường khép kín)} = ${totalLength} \\;?\\; ${stepLength} = ?`];
          break;
        case 6:
          unknownTarget = 'objects';
          guidedLatexSteps = [
            `\\text{Số lần cưa} = ${intervalsCount} \\;?\\; 1 = ?`,
            `\\text{Tổng thời gian} = (\\text{Số lần cưa}) \\;?\\; (\\text{Số phút/lần}) = ?`,
          ];
          break;
        case 7:
          unknownTarget = 'total_length';
          guidedLatexSteps = [
            `\\text{Số khoảng tầng} = ${objectsCount} \\;?\\; 1 = ?`,
            `\\text{Tổng số bậc thang} = (\\text{Số khoảng tầng}) \\;?\\; ${stepLength} = ?`,
          ];
          break;
        case 8:
          unknownTarget = 'total_length';
          guidedLatexSteps = [
            `\\text{Số khoảng cách} = ${objectsCount} \\;?\\; 1 = ?`,
            `\\text{Tổng độ dài} = (\\text{Số khoảng}) \\;?\\; ${stepLength} = ?`,
          ];
          break;
        case 9:
          unknownTarget = 'objects';
          guidedLatexSteps = [
            `\\text{Số khoảng 1 bên} = ${totalLength} \\;?\\; ${stepLength} = ?`,
            `\\text{Số cây 1 bên} = (\\text{Số khoảng}) \\;?\\; 1 = ?`,
            `\\text{Tổng cả 2 bên} = (\\text{1 bên}) \\;?\\; 2 = ?`,
          ];
          break;
        case 10:
          unknownTarget = 'total_length';
          guidedLatexSteps = [
            `\\text{Thời gian 1 khoảng nghỉ} = 6 \\;?\\; (4 \\;?\\; 1) = ?`,
            `\\text{Số khoảng khi gõ ${objectsCount} tiếng} = ${objectsCount} \\;?\\; 1 = ?`,
            `\\text{Tổng thời gian} = (\\text{Số khoảng}) \\;?\\; (\\text{1 khoảng}) = ?`,
          ];
          break;
        default:
          unknownTarget = 'total_length';
          guidedLatexSteps = [
            `\\text{Số khoảng trống} = ${objectsCount} \\;?\\; 1 = ?`,
            `\\text{Tổng số khóm hoa} = (\\text{Số khoảng}) \\;?\\; ${stepLength} = ?`,
          ];
          break;
      }
    } else if (id === 'nov-d29-q4' || id === 'nov-d30-q4' || id === 'nov-exam-a5') {
      unknownTarget = 'objects';
      guidedLatexSteps = [
        `\\text{Số khoảng cách} = ${totalLength} \\;?\\; ${stepLength} = ?`,
        `\\text{Số mốc (cả 2 đầu)} = (\\text{Số khoảng}) \\;?\\; 1 = ?`,
      ];
    } else if (id === 'nov-d29-q8' || id === 'nov-d30-q8' || id === 'nov-exam-a6') {
      unknownTarget = 'objects';
      guidedLatexSteps = [
        `\\text{Số lần cắt} = ${intervalsCount} \\;?\\; 1 = ?`,
        `\\text{Tổng thời gian} = (\\text{Số lần cắt}) \\;?\\; (\\text{Thời gian/lần}) = ?`,
      ];
    } else if (id === 'nov-d29-q10' || id === 'nov-d30-q10') {
      unknownTarget = 'objects';
      guidedLatexSteps = [
        `\\text{Số khoảng 1 bên cầu} = ${totalLength} \\;?\\; ${stepLength} = ?`,
        `\\text{Số đèn 1 bên cầu} = (\\text{Số khoảng}) \\;?\\; 1 = ?`,
        `\\text{Tổng đèn cả 2 bên} = (\\text{1 bên}) \\;?\\; 2 = ?`,
      ];
    } else if (id === 'nov-exam-b5') {
      unknownTarget = 'total_length';
      guidedLatexSteps = [
        `\\text{Số bậc 1 khoảng tầng} = 36 \\;?\\; (3 \\;?\\; 1) = ?`,
        `\\text{Từ Tầng 1 lên Tầng 7} = 7 \\;?\\; 1 = ?\\text{ (khoảng)}`,
        `\\text{Tổng số bậc thang} = (\\text{Số khoảng}) \\;?\\; (\\text{Bậc/tầng}) = ?`,
      ];
    } else if (id === 'nov-exam-b6') {
      unknownTarget = 'objects';
      guidedLatexSteps = [
        `\\text{Số khoảng 1 bên đường} = 60 \\;?\\; 5 = ?`,
        `\\text{Số ghế đá cả 2 bên} = (\\text{1 bên}) \\;?\\; 2 = ?`,
      ];
    } else if (id === 'nov-exam-b7') {
      unknownTarget = 'objects';
      guidedLatexSteps = [
        `\\text{Chu vi sân (khép kín)} = (50 \\;?\\; 30) \\;?\\; 2 = ?`,
        `\\text{Số cột cờ} = (\\text{Chu vi}) \\;?\\; 4 = ?`,
      ];
    } else {
      guidedLatexSteps =
        stepByStepExplanation.length > 0
          ? stepByStepExplanation.map((s) => maskExplanationToGuided(s, primaryNum))
          : [`\\text{Tổng độ dài} = (\\text{Số khoảng}) \\;?\\; ${stepLength} = ?`];
    }

    return {
      version: '1.0',
      domain: 'interval_model',
      concrete: {
        itemName: 'mốc khoảng cách',
        unitLabel,
        actionPrompt: 'Chạm vào các điểm mốc và khoảng cách giữa hai mốc liên tiếp để so sánh số mốc và số khoảng',
        interactiveRule: `Mỗi khoảng dài ${stepLength} ${unitLabel}.`,
        groups: [
          {
            id: 'cg_intervals',
            label: unknownTarget === 'intervals' ? '? khoảng cách' : 'Khoảng cách',
            icon: '📏',
            count: intervalsCount,
            unitValue: stepLength,
            totalValue: totalLength,
            color: '#34D399',
            isUnknown: true,
          },
          {
            id: 'cg_objects',
            label: unknownTarget === 'objects' ? '? điểm mốc' : 'Điểm mốc',
            icon: objectIcon,
            count: objectsCount,
            unitValue: 1,
            totalValue: objectsCount,
            color: '#38BDF8',
            isUnknown: true,
          },
        ],
      },
      pictorial: {
        kind: 'interval_model',
        subtype,
        totalLength,
        stepLength,
        intervalsCount,
        objectsCount,
        unknownTarget,
        targetResultValue: primaryNum,
        objectIcon,
        unitLabel,
      },
      abstract: {
        unknownSymbol: '?',
        guidedLatexSteps,
        fullLatexSteps: [
          `\\text{Số khoảng} = ${totalLength} \\div ${stepLength} = ${intervalsCount}\\text{ (khoảng)}`,
          ruleFormula,
          ...stepByStepExplanation.map(formatToLatex),
        ],
        finalAnswerLatex: formatToLatex(correctAnswer),
        finalNumericValue: primaryNum,
      },
    };
  }

  // Domain 4: Measurement Lab
  const subtype = visualModel.measurementSubtype || 'length_scale';
  const chartItems = visualModel.chartItems;
  const isChart = subtype === 'length_chart' && chartItems && chartItems.length >= 2;

  let measGuidedSteps: string[] = [];
  if (dayNumber && dayNumber >= 22 && dayNumber <= 28 && qIndex1Based) {
    const idx = dayNumber - 22;
    const kmVal = 2 + idx;
    const mExtra = 150 + idx * 50;
    const mVal = 3 + idx;
    const cmExtra = 25 + idx * 5;
    const kgVal = 1 + (idx % 3);
    const gExtra = 200 + idx * 100;
    const singleItemGrams = 300 + idx * 50;
    const totalScaleGrams = singleItemGrams * 3;
    const startLiters = 3 + (idx % 3);
    const pourOutMl = 600 + idx * 50;
    const lenB = 380 + idx * 30;
    const lenC = 190 + idx * 15;
    const ropeMeters = 4 + (idx % 3);
    const usedCm = 140 + idx * 10;
    const d1 = 1200 + idx * 100;
    const d2 = 1800 - idx * 100;
    const beakerA = 750 + idx * 20;
    const beakerB = 350 + idx * 20;
    const emptyBottleG = 150 + idx * 20;
    const halfHoneyG = 400 + idx * 50;
    const halfTotalG = emptyBottleG + halfHoneyG;
    const fullTotalG = emptyBottleG + halfHoneyG * 2;
    const boardLenCm = 80 + idx * 10;
    const overlapCm = 12 + idx;

    switch (qIndex1Based) {
      case 1:
        measGuidedSteps = [
          `\\text{Đổi } ${kmVal}\\text{ km} = ${kmVal} \\;?\\; 1000 = ?\\text{ (m)}`,
          `\\text{Tổng độ dài} = (\\text{Số m}) \\;?\\; ${mExtra} = ?\\text{ (m)}`,
        ];
        break;
      case 2:
        measGuidedSteps = [
          `\\text{Đổi } ${mVal}\\text{ m} = ${mVal} \\;?\\; 100 = ?\\text{ (cm)}`,
          `\\text{Tổng độ dài} = (\\text{Số cm}) \\;?\\; ${cmExtra} = ?\\text{ (cm)}`,
        ];
        break;
      case 3:
        measGuidedSteps = [
          `\\text{Đổi } ${kgVal}\\text{ kg} = ${kgVal} \\;?\\; 1000 = ?\\text{ (g)}`,
          `\\text{Tổng khối lượng} = (\\text{Số g}) \\;?\\; ${gExtra} = ?\\text{ (g)}`,
        ];
        break;
      case 4:
        measGuidedSteps = [`\\text{Mỗi hộp sữa} = ${totalScaleGrams} \\;?\\; 3 = ?\\text{ (g)}`];
        break;
      case 5:
        measGuidedSteps = [
          `\\text{Đổi } ${startLiters}\\text{ L} = ${startLiters} \\;?\\; 1000 = ?\\text{ (mL)}`,
          `\\text{Nước còn lại} = (\\text{Ban đầu}) \\;?\\; ${pourOutMl} = ?\\text{ (mL)}`,
        ];
        break;
      case 6:
        measGuidedSteps = [`\\text{Hiệu dài nhất và ngắn nhất} = ${lenB} \\;?\\; ${lenC} = ?\\text{ (cm)}`];
        break;
      case 7:
        measGuidedSteps = [
          `\\text{Đổi } ${ropeMeters}\\text{ m} = ${ropeMeters} \\;?\\; 100 = ?\\text{ (cm)}`,
          `\\text{Còn lại} = (\\text{Ban đầu}) \\;?\\; ${usedCm} = ?\\text{ (cm)}`,
        ];
        break;
      case 8:
        measGuidedSteps = [
          `\\text{Tổng quãng đường (m)} = ${d1} \\;?\\; ${d2} = ?\\text{ (m)}`,
          `\\text{Đổi sang km} = (\\text{Tổng m}) \\;?\\; 1000 = ?\\text{ (km)}`,
        ];
        break;
      case 9:
        measGuidedSteps = [
          `\\text{Chênh lệch hai bình} = ${beakerA} \\;?\\; ${beakerB} = ?\\text{ (mL)}`,
          `\\text{Cần rót sang} = (\\text{Chênh lệch}) \\;?\\; 2 = ?\\text{ (mL)}`,
        ];
        break;
      case 10:
        measGuidedSteps = [
          `\\text{Nửa lượng mật ong} = ${fullTotalG} \\;?\\; ${halfTotalG} = ?\\text{ (g)}`,
          `\\text{Vỏ hũ rỗng} = ${halfTotalG} \\;?\\; (\\text{Nửa mật ong}) = ?\\text{ (g)}`,
        ];
        break;
      default:
        measGuidedSteps = [
          `\\text{Tổng 2 thanh rời} = ${boardLenCm} \\;?\\; 2 = ?\\text{ (cm)}`,
          `\\text{Thanh ghép mới} = (\\text{Tổng 2 thanh}) \\;?\\; ${overlapCm} = ?\\text{ (cm)}`,
        ];
        break;
    }
  } else if (id === 'nov-d29-q2' || id === 'nov-d30-q2') {
    const k = id === 'nov-d30-q2' ? 2 : 1;
    measGuidedSteps = [
      `\\text{Đổi } ${3 + k}\\text{ km} = ${3 + k} \\;?\\; 1000 = ?\\text{ (m)}`,
      `\\text{Tổng độ dài} = (\\text{Số m}) \\;?\\; ${250 * k} = ?\\text{ (m)}`,
    ];
  } else if (id === 'nov-d29-q5' || id === 'nov-d30-q5') {
    const k = id === 'nov-d30-q5' ? 2 : 1;
    measGuidedSteps = [`\\text{Mỗi quả cầu} = ${1200 * k} \\;?\\; 4 = ?\\text{ (g)}`];
  } else if (id === 'nov-d29-q9' || id === 'nov-d30-q9') {
    const k = id === 'nov-d30-q9' ? 2 : 1;
    measGuidedSteps = [
      `\\text{Đổi } ${2 * k}\\text{ L} = ${2 * k} \\;?\\; 1000 = ?\\text{ (mL)}`,
      `\\text{Nước trong 3 cốc} = 400 \\;?\\; 3 = ?\\text{ (mL)}`,
      `\\text{Còn lại trong bình} = (\\text{Ban đầu}) \\;?\\; (\\text{3 cốc}) = ?\\text{ (mL)}`,
    ];
  } else if (id === 'nov-exam-a7') {
    measGuidedSteps = [
      `\\text{Đổi } 4\\text{ km} = 4 \\;?\\; 1000 = ?\\text{ (m)}`,
      `\\text{Tổng độ dài} = (\\text{Số m}) \\;?\\; 35 = ?\\text{ (m)}`,
    ];
  } else if (id === 'nov-exam-a8') {
    measGuidedSteps = [
      `\\text{Đổi } 3\\text{ kg } 450\\text{ g} = (3 \\;?\\; 1000) \\;?\\; 450 = ?\\text{ (g)}`,
      `\\text{Gạo còn lại} = (\\text{Ban đầu}) \\;?\\; 1250 = ?\\text{ (g)}`,
    ];
  } else if (id === 'nov-exam-a9') {
    measGuidedSteps = [
      `\\text{Đổi } 2\\text{ L } 500\\text{ mL} = (2 \\;?\\; 1000) \\;?\\; 500 = ?\\text{ (mL)}`,
      `\\text{Mỗi chai nhỏ} = (\\text{Tổng mL}) \\;?\\; 5 = ?\\text{ (mL)}`,
    ];
  } else if (id === 'nov-exam-b8') {
    measGuidedSteps = [
      `\\text{Nửa lượng dầu} = 22 \\;?\\; 12 = ?\\text{ (kg)}`,
      `\\text{Vỏ thùng rỗng} = 12 \\;?\\; (\\text{Nửa lượng dầu}) = ?\\text{ (kg)}`,
    ];
  } else if (id === 'nov-exam-b9') {
    measGuidedSteps = [
      `\\text{Tổng 3 thanh gỗ} = 60 \\;?\\; 3 = ?\\text{ (cm)}`,
      `\\text{2 mối nối chồng} = 8 \\;?\\; (3 \\;?\\; 1) = ?\\text{ (cm)}`,
      `\\text{Thanh ghép mới} = (\\text{3 thanh}) \\;?\\; (\\text{2 mối nối}) = ?\\text{ (cm)}`,
    ];
  } else {
    measGuidedSteps =
      stepByStepExplanation.length > 0
        ? stepByStepExplanation.map((s) => maskExplanationToGuided(s, primaryNum))
        : [`\\text{Quy đổi đơn vị} = ?`];
  }

  return {
    version: '1.0',
    domain: 'measurement_lab',
    concrete: {
      itemName: 'đại lượng đo',
      unitLabel: 'đơn vị',
      actionPrompt: 'Đưa các đại lượng về cùng đơn vị đo chuẩn trước khi so sánh hoặc tính toán',
      interactiveRule: visualModel.conversionRule || '1 km = 1000 m · 1 kg = 1000 g · 1 L = 1000 mL',
      groups: isChart
        ? chartItems.map((ci, idx) => ({
            id: `cg_chart_${idx}`,
            label: ci.label,
            icon: '📏',
            count: 1,
            unitValue: ci.value,
            totalValue: ci.value,
            color: ci.color,
          }))
        : [
            {
              id: 'cg_meas_1',
              label: visualModel.primaryReading || 'Đại lượng chuẩn',
              icon: subtype === 'weight_balance' ? '⚖️' : subtype === 'volume_beaker' ? '🧪' : '📏',
              count: 1,
              unitValue: Math.max(1, primaryNum),
              totalValue: Math.max(1, primaryNum),
              color: '#A855F7',
              isUnknown: true,
            },
          ],
    },
    pictorial: {
      kind: 'measurement_lab',
      subtype,
      operation: isChart ? 'chart_extremes_diff' : 'unit_convert',
      operands: [primaryNum],
      expectedNumericResult: Math.max(1, primaryNum),
      resultUnit: correctAnswer.replace(/[0-9\s]/g, '') || 'đơn vị',
      primaryReading: visualModel.primaryReading,
      secondaryReading: visualModel.secondaryReading,
      conversionRule: visualModel.conversionRule,
      chartItems: visualModel.chartItems,
    },
    abstract: {
      unknownSymbol: '?',
      guidedLatexSteps: measGuidedSteps,
      fullLatexSteps:
        stepByStepExplanation.length > 0
          ? stepByStepExplanation.map(formatToLatex)
          : [formatToLatex(`Kết quả = ${correctAnswer}`)],
      finalAnswerLatex: formatToLatex(correctAnswer),
      finalNumericValue: primaryNum,
    },
  };
}

/**
 * Helper to mask arithmetic operators and results in raw Vietnamese prose explanations for generic fallback specs.
 */
function maskExplanationToGuided(raw: string, primaryNum: number): string {
  let masked = raw
    .replace(/(\d)\s*:\s*(\d)/g, '$1 ? $2')
    .replace(/(\d)\s*×\s*(\d)/g, '$1 ? $2')
    .replace(/(\d)\s*\+\s*(\d)/g, '$1 ? $2')
    .replace(/(\d)\s*-\s*(\d)/g, '$1 ? $2');
  if (primaryNum > 0) {
    masked = masked.replace(new RegExp(`=\\s*${primaryNum}\\b`, 'g'), '= ?');
  }
  masked = masked.replace(/=\s*\d+(\s*\([^)]+\))?\.?$/g, '= ?');
  return formatToLatex(masked);
}

/**
 * Attaches `cpaSpec` to a question or exam question.
 */
export function attachCPAToQuestion<T extends InMonthQuestion | InMonthExamQuestion>(
  q: T,
  dayNumber?: number,
  qIndex1Based?: number
): T {
  const explanations =
    'stepByStepExplanation' in q && Array.isArray(q.stepByStepExplanation)
      ? q.stepByStepExplanation
      : 'explanation' in q && typeof q.explanation === 'string'
      ? [q.explanation]
      : [];

  const cpaSpec = buildCPASpecForQuestion({
    id: q.id,
    dayNumber,
    qIndex1Based,
    prompt: q.prompt,
    correctAnswer: q.correctAnswer,
    stepByStepExplanation: explanations,
    visualModel: q.visualModel,
  });

  return {
    ...q,
    visualModel: {
      ...q.visualModel,
      cpaSpec,
    },
  };
}
