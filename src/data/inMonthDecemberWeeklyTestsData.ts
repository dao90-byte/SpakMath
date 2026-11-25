import { InMonthWeeklyTest } from './inMonthWeeklyTestsData';
import {
  BarModelBarSpec,
  CPAConcreteGroup,
  MeasurementOperation,
  MeasurementVisualParams,
  PerimeterPictorialSpec,
  PerimeterShapeKind,
  SingaporeCPASpec,
} from '../types/singaporeCPA';
import { makeBarSpec } from '../utils/singaporeCPABuilder';

interface SimpleGroupInput {
  id: string;
  label: string;
  icon: string;
  count: number;
  unitValue: number;
  color: string;
  isUnknown?: boolean;
  hideCountBeforeSolve?: boolean;
  showUnitValueBeforeSolve?: boolean;
  beforeSolveBadge?: string;
  displayMode?: CPAConcreteGroup['displayMode'];
}

function toConcreteGroups(items: SimpleGroupInput[]): CPAConcreteGroup[] {
  return items.map((g) => ({
    id: g.id,
    label: g.label,
    icon: g.icon,
    count: g.count,
    unitValue: g.unitValue,
    totalValue: g.count * g.unitValue,
    color: g.color,
    isUnknown: g.isUnknown,
    hideCountBeforeSolve: g.hideCountBeforeSolve,
    showUnitValueBeforeSolve: g.showUnitValueBeforeSolve,
    beforeSolveBadge: g.beforeSolveBadge,
    displayMode: g.displayMode ?? 'measurement',
  }));
}

function computeExpectedPerimeter(opts: {
  shapeKind: PerimeterShapeKind;
  outerWidth: number;
  outerHeight: number;
  recessDepth?: number;
}): number {
  const base = (opts.outerWidth + opts.outerHeight) * 2;
  if (opts.shapeKind === 'u_shape' || opts.shapeKind === 't_shape') {
    return base + 2 * (opts.recessDepth ?? 0);
  }
  return base;
}

function buildPerimeterWeeklyCPA(opts: {
  shapeKind: PerimeterShapeKind;
  concreteTitle: string;
  concreteScenario: string;
  groups: SimpleGroupInput[];
  unitLabel: string;
  outerWidth: number;
  outerHeight: number;
  widthLabel?: string;
  heightLabel?: string;
  sideLength?: number;
  cutWidth?: number;
  cutHeight?: number;
  recessWidth?: number;
  recessDepth?: number;
  joinedCount?: number;
  gateWidth?: number;
  gateLabel?: string;
  stepCount?: number;
  hidePerimeterBeforeSolve?: boolean;
  unknownTarget: PerimeterPictorialSpec['unknownTarget'];
  perimeterFormulaHint: string;
  sideShiftNote?: string;
  guidedLatexSteps: string[];
  fullLatexSteps: string[];
  finalAnswerLatex: string;
  finalNumericValue: number;
}): SingaporeCPASpec {
  const expectedPerimeter = computeExpectedPerimeter({
    shapeKind: opts.shapeKind,
    outerWidth: opts.outerWidth,
    outerHeight: opts.outerHeight,
    recessDepth: opts.recessDepth,
  });

  const pictorial: PerimeterPictorialSpec = {
    kind: 'perimeter_shape',
    shapeKind: opts.shapeKind,
    outerWidth: opts.outerWidth,
    outerHeight: opts.outerHeight,
    widthLabel: opts.widthLabel,
    heightLabel: opts.heightLabel,
    cutWidth: opts.cutWidth,
    cutHeight: opts.cutHeight,
    recessWidth: opts.recessWidth,
    recessDepth: opts.recessDepth,
    squareSide: opts.shapeKind === 'joined_squares' ? opts.sideLength : undefined,
    gridCols: opts.shapeKind === 'joined_squares' ? opts.joinedCount : undefined,
    gridRows: opts.shapeKind === 'joined_squares' ? 1 : undefined,
    unitLabel: opts.unitLabel,
    unknownTarget: opts.unknownTarget,
    gateWidth: opts.gateWidth,
    gateLabel: opts.gateLabel,
    stepCount: opts.stepCount,
    hidePerimeterBeforeSolve: opts.hidePerimeterBeforeSolve,
    expectedPerimeter,
    sideShiftHint: opts.sideShiftNote ?? opts.perimeterFormulaHint,
    showInteractiveShift:
      opts.shapeKind === 'l_shape' ||
      opts.shapeKind === 'staircase' ||
      opts.shapeKind === 'u_shape' ||
      opts.shapeKind === 'rectangle',
  };

  return {
    version: '1.0',
    domain: 'perimeter_shape',
    concrete: {
      itemName: opts.concreteTitle,
      unitLabel: opts.unitLabel,
      actionPrompt: opts.concreteScenario,
      interactiveRule: opts.perimeterFormulaHint,
      groups: toConcreteGroups(opts.groups),
    },
    pictorial,
    abstract: {
      unknownSymbol: '?',
      guidedLatexSteps: opts.guidedLatexSteps,
      fullLatexSteps: opts.fullLatexSteps,
      finalAnswerLatex: opts.finalAnswerLatex,
      finalNumericValue: opts.finalNumericValue,
    },
  };
}

function buildMeasurementWeeklyCPA(opts: {
  subtype: 'weight_balance' | 'volume_beaker';
  operation: MeasurementOperation;
  operands: number[];
  concreteTitle: string;
  concreteScenario: string;
  groups: SimpleGroupInput[];
  unitLabel: string;
  primaryReading: string;
  secondaryReading: string;
  conversionRule: string;
  visualParams: MeasurementVisualParams;
  guidedLatexSteps: string[];
  fullLatexSteps: string[];
  finalAnswerLatex: string;
  finalNumericValue: number;
}): SingaporeCPASpec {
  return {
    version: '1.0',
    domain: 'measurement_lab',
    concrete: {
      itemName: opts.concreteTitle,
      unitLabel: opts.unitLabel,
      actionPrompt: opts.concreteScenario,
      interactiveRule: opts.conversionRule,
      groups: toConcreteGroups(opts.groups),
    },
    pictorial: {
      kind: 'measurement_lab',
      subtype: opts.subtype,
      operation: opts.operation,
      operands: opts.operands,
      expectedNumericResult: opts.finalNumericValue,
      resultUnit: opts.unitLabel,
      primaryReading: opts.primaryReading,
      secondaryReading: opts.secondaryReading,
      conversionRule: opts.conversionRule,
      visualParams: opts.visualParams,
    },
    abstract: {
      unknownSymbol: '?',
      guidedLatexSteps: opts.guidedLatexSteps,
      fullLatexSteps: opts.fullLatexSteps,
      finalAnswerLatex: opts.finalAnswerLatex,
      finalNumericValue: opts.finalNumericValue,
    },
  };
}

function buildBarWeeklyCPA(opts: {
  family: 'part_whole' | 'comparison' | 'before_after';
  concreteTitle: string;
  concreteScenario: string;
  interactiveRule: string;
  groups: SimpleGroupInput[];
  unitLabel: string;
  unitReferenceValue: number;
  bars: BarModelBarSpec[];
  beforeBars?: BarModelBarSpec[];
  afterBars?: BarModelBarSpec[];
  transferSpec?: {
    fromBarId: string;
    toBarId: string;
    deltaValue: number;
    conservationRule: 'constant_total' | 'constant_difference' | 'working_backwards';
    description: string;
  };
  totalBracket?: {
    targetBarIds: string[];
    numericValue: number;
    displayLabel: string;
    isUnknown?: boolean;
  };
  differenceBracket?: {
    longerBarId: string;
    shorterBarId: string;
    numericValue: number;
    displayLabel: string;
    isUnknown?: boolean;
  };
  guidedLatexSteps: string[];
  fullLatexSteps: string[];
  finalAnswerLatex: string;
  finalNumericValue: number;
}): SingaporeCPASpec {
  return {
    version: '1.0',
    domain: 'bar_model',
    concrete: {
      itemName: opts.concreteTitle,
      unitLabel: opts.unitLabel,
      actionPrompt: opts.concreteScenario,
      interactiveRule: opts.interactiveRule,
      groups: toConcreteGroups(opts.groups),
    },
    pictorial: {
      kind: 'bar_model',
      family: opts.family,
      unitReferenceValue: opts.unitReferenceValue,
      unitName: opts.unitLabel,
      bars: opts.bars,
      beforeBars: opts.beforeBars,
      afterBars: opts.afterBars,
      transferSpec: opts.transferSpec,
      totalBracket: opts.totalBracket,
      differenceBracket: opts.differenceBracket,
    },
    abstract: {
      unknownSymbol: '?',
      guidedLatexSteps: opts.guidedLatexSteps,
      fullLatexSteps: opts.fullLatexSteps,
      finalAnswerLatex: opts.finalAnswerLatex,
      finalNumericValue: opts.finalNumericValue,
    },
  };
}

// ============================================================================
// BỘ 5 ĐỀ KIỂM TRA 15 PHÚT CUỐI TUẦN — THÁNG 12 (50 CÂU CHUẨN SINGAPORE CPA)
// Cấu trúc mỗi đề: 6 câu Tính toán (60đ) + 4 câu Nghị luận Tư duy (40đ)
// ============================================================================

export const DECEMBER_WEEKLY_TESTS: InMonthWeeklyTest[] = [
  // ==========================================================================
  // TUẦN 1 (SAU NGÀY 7): CHU VI HÌNH VUÔNG, HÌNH CHỮ NHẬT & TOÁN NGƯỢC TÌM CẠNH
  // ==========================================================================
  {
    id: 'dec-weekly-test-w1',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 1,
    weekTitle: 'Tuần 1 · Chu Vi Cơ Bản & Toán Ngược',
    triggerAfterDayNumber: 7,
    unlocksWeekNumber: 2,
    unlocksDayNumber: 8,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 1: Chu Vi Hình Vuông, Hình Chữ Nhật & Toán Ngược',
    subtitle: '6 câu Tính toán (60đ) + 4 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dec-w1-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [1, 2],
        prompt:
          '[Tính toán 1] Một tấm bảng điều khiển hình vuông có độ dài mỗi cạnh là 18 cm. Tính chu vi tấm bảng hình vuông đó.',
        options: ['72 cm', '36 cm', '64 cm', '80 cm'],
        correctAnswer: '72 cm',
        explanation:
          'Hình vuông có 4 cạnh bằng nhau, nên chu vi là: 18 × 4 = 72 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Chu vi hình vuông cạnh 18 cm',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'square',
            concreteTitle: 'cạnh hình vuông',
            concreteScenario: 'Mỗi cạnh dài 18 cm, ghép đủ 4 cạnh quanh tấm bảng.',
            groups: [
              { id: 's1', label: '4 cạnh hình vuông', icon: '🟦', count: 4, unitValue: 18, isUnknown: true, showUnitValueBeforeSolve: true, color: '#38BDF8' },
            ],
            unitLabel: 'cm',
            outerWidth: 18,
            outerHeight: 18,
            sideLength: 18,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi = Độ dài 1 cạnh × 4',
            guidedLatexSteps: ['\\text{Chu vi} = 18 \\;?\\; 4 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi} = 18 \\times 4 = 72\\text{ (cm)}'],
            finalAnswerLatex: '72\\text{ cm}',
            finalNumericValue: 72,
          }),
        },
      },
      {
        id: 'dec-w1-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [2, 3],
        prompt:
          '[Tính toán 2] Một sân đáp tàu vũ trụ hình chữ nhật có chiều dài 26 m và chiều rộng 14 m. Tính chu vi sân đáp đó.',
        options: ['80 m', '40 m', '76 m', '84 m'],
        correctAnswer: '80 m',
        explanation:
          'Nửa chu vi sân đáp là: 26 + 14 = 40 (m). Chu vi sân đáp là: 40 × 2 = 80 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Chu vi hình chữ nhật 26 m × 14 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'cạnh viền sân đáp',
            concreteScenario: 'Gồm 2 chiều dài 26 m và 2 chiều rộng 14 m.',
            groups: [
              { id: 'l', label: 'Chiều dài', icon: '📏', count: 2, unitValue: 26, color: '#38BDF8', beforeSolveBadge: '2 × 26 m' },
              { id: 'w', label: 'Chiều rộng', icon: '📐', count: 2, unitValue: 14, color: '#F59E0B', beforeSolveBadge: '2 × 14 m' },
            ],
            unitLabel: 'm',
            outerWidth: 26,
            outerHeight: 14,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi = (Chiều dài + Chiều rộng) × 2',
            guidedLatexSteps: [
              '\\text{Nửa chu vi} = 26 \\;?\\; 14 = ?\\text{ (m)}',
              '\\text{Chu vi} = ? \\;?\\; 2 = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa chu vi} = 26 + 14 = 40\\text{ (m)}',
              '\\text{Chu vi} = 40 \\times 2 = 80\\text{ (m)}',
            ],
            finalAnswerLatex: '80\\text{ m}',
            finalNumericValue: 80,
          }),
        },
      },
      {
        id: 'dec-w1-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [4, 5],
        prompt:
          '[Tính toán 3] Một khung ảnh hình vuông có chu vi đo được là 96 cm. Hỏi độ dài mỗi cạnh của khung ảnh đó là bao nhiêu xăng-ti-mét?',
        options: ['24 cm', '22 cm', '26 cm', '48 cm'],
        correctAnswer: '24 cm',
        explanation:
          'Vì chu vi hình vuông bằng 4 cạnh cộng lại nên độ dài 1 cạnh là: 96 : 4 = 24 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Toán ngược: Biết chu vi 96 cm, tìm cạnh hình vuông',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'square',
            concreteTitle: '1 cạnh khung ảnh',
            concreteScenario: 'Tổng 4 cạnh bằng 96 cm, chia đều tìm 1 cạnh.',
            groups: [
              { id: 'c', label: '1 cạnh hình vuông', icon: '🟦', count: 1, unitValue: 24, isUnknown: true, color: '#F59E0B' },
            ],
            unitLabel: 'cm',
            outerWidth: 24,
            outerHeight: 24,
            sideLength: 24,
            unknownTarget: 'side',
            perimeterFormulaHint: 'Cạnh hình vuông = Chu vi ÷ 4',
            guidedLatexSteps: ['\\text{Độ dài 1 cạnh} = 96 \\;?\\; 4 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Độ dài 1 cạnh} = 96 \\div 4 = 24\\text{ (cm)}'],
            finalAnswerLatex: '24\\text{ cm}',
            finalNumericValue: 24,
          }),
        },
      },
      {
        id: 'dec-w1-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [5, 6],
        prompt:
          '[Tính toán 4] Một mảnh vườn hình chữ nhật có chu vi 84 m và chiều dài 27 m. Tính chiều rộng mảnh vườn đó.',
        options: ['15 m', '57 m', '17 m', '21 m'],
        correctAnswer: '15 m',
        explanation:
          'Nửa chu vi mảnh vườn là: 84 : 2 = 42 (m). Chiều rộng mảnh vườn là: 42 - 27 = 15 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Toán ngược hình chữ nhật: P = 84 m, dài = 27 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'chiều rộng mảnh vườn',
            concreteScenario: 'Bước 1 tìm Nửa chu vi, Bước 2 trừ chiều dài 27 m.',
            groups: [
              { id: 'l', label: 'Chiều dài', icon: '📏', count: 1, unitValue: 27, color: '#38BDF8' },
              { id: 'w', label: 'Chiều rộng', icon: '❓', count: 1, unitValue: 15, isUnknown: true, color: '#F59E0B' },
            ],
            unitLabel: 'm',
            outerWidth: 27,
            outerHeight: 15,
            unknownTarget: 'width',
            perimeterFormulaHint: 'Nửa chu vi = Chu vi ÷ 2; Rộng = Nửa chu vi − Dài',
            guidedLatexSteps: [
              '\\text{Nửa chu vi} = 84 \\;?\\; 2 = ?\\text{ (m)}',
              '\\text{Chiều rộng} = ? \\;?\\; 27 = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa chu vi} = 84 \\div 2 = 42\\text{ (m)}',
              '\\text{Chiều rộng} = 42 - 27 = 15\\text{ (m)}',
            ],
            finalAnswerLatex: '15\\text{ m}',
            finalNumericValue: 15,
          }),
        },
      },
      {
        id: 'dec-w1-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [6, 7],
        prompt:
          '[Tính toán 5] Người ta rào lưới xung quanh một khu vườn hình chữ nhật dài 25 m, rộng 15 m và chừa lại một lối cổng rộng 4 m không rào. Hỏi cần bao nhiêu mét lưới rào?',
        options: ['76 m', '80 m', '84 m', '72 m'],
        correctAnswer: '76 m',
        explanation:
          'Chu vi khu vườn là: (25 + 15) × 2 = 80 (m). Độ dài lưới rào cần dùng là: 80 - 4 = 76 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Rào vườn 25 m × 15 m, chừa cổng 4 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'mét lưới rào',
            concreteScenario: 'Tính chu vi cả vòng rồi trừ đoạn cổng 4 m.',
            groups: [
              { id: 'd', label: 'Chiều dài', icon: '📏', count: 2, unitValue: 25, color: '#38BDF8', beforeSolveBadge: '2 × 25 m' },
              { id: 'r', label: 'Chiều rộng', icon: '📐', count: 2, unitValue: 15, color: '#10B981', beforeSolveBadge: '2 × 15 m' },
              { id: 'g', label: 'Cổng chừa lại', icon: '🚪', count: 1, unitValue: 4, color: '#F59E0B' },
            ],
            unitLabel: 'm',
            outerWidth: 25,
            outerHeight: 15,
            gateWidth: 4,
            unknownTarget: 'fence_with_gate',
            perimeterFormulaHint: 'Lưới rào = Chu vi hình chữ nhật − Chiều rộng cổng',
            guidedLatexSteps: [
              '\\text{Chu vi khu vườn} = (25 \\;?\\; 15) \\;?\\; 2 = ?\\text{ (m)}',
              '\\text{Chiều dài lưới rào} = ? \\;?\\; 4 = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Chu vi khu vườn} = (25 + 15) \\times 2 = 80\\text{ (m)}',
              '\\text{Chiều dài lưới rào} = 80 - 4 = 76\\text{ (m)}',
            ],
            finalAnswerLatex: '76\\text{ m}',
            finalNumericValue: 76,
          }),
        },
      },
      {
        id: 'dec-w1-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [3, 7],
        prompt:
          '[Tính toán 6] Một tấm thảm hình chữ nhật có chiều rộng 12 cm và chiều dài gấp 2 lần chiều rộng. Tính chu vi tấm thảm đó.',
        options: ['72 cm', '36 cm', '48 cm', '60 cm'],
        correctAnswer: '72 cm',
        explanation:
          'Chiều dài tấm thảm là: 12 × 2 = 24 (cm). Chu vi tấm thảm là: (24 + 12) × 2 = 72 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Hình chữ nhật có chiều rộng 12 cm, chiều dài gấp đôi',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'cạnh viền tấm thảm',
            concreteScenario: 'Bước 1 tìm chiều dài gấp 2 lần rộng, Bước 2 tính chu vi.',
            groups: [
              { id: 'w', label: 'Chiều rộng', icon: '📐', count: 1, unitValue: 12, color: '#F59E0B' },
              { id: 'l', label: 'Chiều dài (×2)', icon: '📏', count: 2, unitValue: 12, isUnknown: true, showUnitValueBeforeSolve: true, color: '#38BDF8' },
            ],
            unitLabel: 'cm',
            outerWidth: 24,
            outerHeight: 12,
            widthLabel: 'Gấp 2 lần rộng',
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Dài = Rộng × 2; Chu vi = (Dài + Rộng) × 2',
            guidedLatexSteps: [
              '\\text{Chiều dài} = 12 \\;?\\; 2 = ?\\text{ (cm)}',
              '\\text{Chu vi} = (? \\;?\\; 12) \\;?\\; 2 = ?\\text{ (cm)}',
            ],
            fullLatexSteps: [
              '\\text{Chiều dài} = 12 \\times 2 = 24\\text{ (cm)}',
              '\\text{Chu vi} = (24 + 12) \\times 2 = 72\\text{ (cm)}',
            ],
            finalAnswerLatex: '72\\text{ cm}',
            finalNumericValue: 72,
          }),
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'dec-w1-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [2, 3],
        prompt:
          '[Nghị luận 1] Một sân chơi hình chữ nhật dài 20 m, rộng 12 m. Bạn Nam lấy 20 + 12 = 32 m rồi kết luận chu vi sân là 32 m. Theo em, bạn Nam làm đúng hay sai và vì sao?',
        options: [
          'Sai, vì 20 + 12 = 32 m mới chỉ là nửa chu vi (1 dài + 1 rộng); phải nhân 2 để được chu vi là 64 m.',
          'Đúng, vì chu vi hình chữ nhật bằng chiều dài cộng chiều rộng.',
          'Sai, vì phải lấy 20 × 12 = 240 m.',
          'Sai, vì phải lấy 20 + 12 + 4 = 36 m.',
        ],
        correctAnswer:
          'Sai, vì 20 + 12 = 32 m mới chỉ là nửa chu vi (1 dài + 1 rộng); phải nhân 2 để được chu vi là 64 m.',
        reasoningPrompt:
          'Em hãy giải thích lỗi sai của bạn Nam và viết phép tính đúng tìm chu vi sân chơi:',
        reasoningPlaceholder:
          'Nêu lý do phép tính của bạn Nam mới ra nửa chu vi (1 dài + 1 rộng) và viết phép tính tìm chu vi đúng...',
        reasoningKeywords: ['nửa chu vi', '64', '32', 'nhân 2', '× 2'],
        reasoningSampleAnswer:
          'Bạn Nam sai vì 20 + 12 = 32 m mới tính 1 chiều dài và 1 chiều rộng (nửa chu vi). Chu vi đúng phải là (20 + 12) × 2 = 64 m.',
        explanation:
          'Hình chữ nhật có 4 cạnh (2 chiều dài và 2 chiều rộng). Tổng 1 chiều dài + 1 chiều rộng chỉ là nửa chu vi, cần nhân 2 mới ra chu vi 64 m.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Phân biệt Nửa chu vi và Chu vi hình chữ nhật 20 m × 12 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'cạnh sân chơi',
            concreteScenario: 'Một hình chữ nhật có 2 cặp (Dài + Rộng).',
            groups: [
              { id: 'd', label: 'Chiều dài', icon: '📏', count: 2, unitValue: 20, color: '#38BDF8', beforeSolveBadge: '2 × 20 m' },
              { id: 'r', label: 'Chiều rộng', icon: '📐', count: 2, unitValue: 12, color: '#F59E0B', beforeSolveBadge: '2 × 12 m' },
            ],
            unitLabel: 'm',
            outerWidth: 20,
            outerHeight: 12,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Nửa chu vi = Dài + Rộng; Chu vi = Nửa chu vi × 2',
            guidedLatexSteps: [
              '\\text{Nửa chu vi} = 20 \\;?\\; 12 = ?\\text{ (m)}',
              '\\text{Chu vi đúng} = ? \\;?\\; 2 = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa chu vi} = 20 + 12 = 32\\text{ (m)}',
              '\\text{Chu vi đúng} = 32 \\times 2 = 64\\text{ (m)}',
            ],
            finalAnswerLatex: '64\\text{ m}',
            finalNumericValue: 64,
          }),
        },
      },
      {
        id: 'dec-w1-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [5, 7],
        prompt:
          '[Nghị luận 2] Một tấm biển hình chữ nhật có chu vi 60 cm và chiều dài 18 cm. Vì sao muốn tìm chiều rộng ta phải lấy 60 : 2 trước rồi mới trừ đi 18?',
        options: [
          'Vì 60 : 2 = 30 cm là nửa chu vi (tổng của 1 chiều dài và 1 chiều rộng), từ đó trừ 18 cm sẽ ra chiều rộng là 12 cm.',
          'Vì 60 là số chẵn nên lúc nào cũng phải chia cho 2.',
          'Vì 60 cm chỉ bằng tổng của 1 chiều dài và 2 chiều rộng.',
          'Vì chiều rộng luôn bằng một nửa của 60 cm là 30 cm.',
        ],
        correctAnswer:
          'Vì 60 : 2 = 30 cm là nửa chu vi (tổng của 1 chiều dài và 1 chiều rộng), từ đó trừ 18 cm sẽ ra chiều rộng là 12 cm.',
        reasoningPrompt:
          'Em hãy trình bày ngắn gọn 2 bước tìm chiều rộng tấm biển hình chữ nhật:',
        reasoningPlaceholder:
          'Bước 1: Giải thích và tính nửa chu vi từ chu vi đã cho. Bước 2: Tìm chiều rộng bằng cách trừ chiều dài...',
        reasoningKeywords: ['30', '12', 'nửa chu vi', '60 : 2', 'trừ'],
        reasoningSampleAnswer:
          'Nửa chu vi tấm biển là: 60 : 2 = 30 (cm). Vì nửa chu vi gồm 1 chiều dài và 1 chiều rộng nên chiều rộng là: 30 - 18 = 12 (cm).',
        explanation:
          'Chu vi 60 cm gồm 2 chiều dài và 2 chiều rộng. Chia đôi được nửa chu vi 30 cm (1 dài + 1 rộng), trừ chiều dài 18 cm được chiều rộng 12 cm.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Tại sao cần bước Nửa chu vi khi tìm cạnh hình chữ nhật?',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'nửa vòng chu vi',
            concreteScenario: 'Mỗi nửa vòng gồm đúng 1 chiều dài 18 cm và 1 chiều rộng cần tìm.',
            groups: [
              { id: 'l', label: '1 chiều dài', icon: '📏', count: 1, unitValue: 18, color: '#38BDF8' },
              { id: 'w', label: '1 chiều rộng', icon: '❓', count: 1, unitValue: 12, isUnknown: true, color: '#F59E0B' },
            ],
            unitLabel: 'cm',
            outerWidth: 18,
            outerHeight: 12,
            unknownTarget: 'width',
            perimeterFormulaHint: 'Nửa chu vi = Chu vi ÷ 2; Rộng = Nửa chu vi − Dài',
            guidedLatexSteps: [
              '\\text{Nửa chu vi} = 60 \\;?\\; 2 = ?\\text{ (cm)}',
              '\\text{Chiều rộng} = ? \\;?\\; 18 = ?\\text{ (cm)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa chu vi} = 60 \\div 2 = 30\\text{ (cm)}',
              '\\text{Chiều rộng} = 30 - 18 = 12\\text{ (cm)}',
            ],
            finalAnswerLatex: '12\\text{ cm}',
            finalNumericValue: 12,
          }),
        },
      },
      {
        id: 'dec-w1-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [6, 7],
        prompt:
          '[Nghị luận 3] Bác nông dân rào quanh một khu vườn hình chữ nhật dài 16 m, rộng 10 m và chừa một cổng rộng 3 m. Em hãy lập luận cách tính số mét hàng rào cần xây.',
        options: [
          'Tính chu vi cả khu vườn là (16 + 10) × 2 = 52 m, sau đó trừ đi phần cổng 3 m không xây rào nên còn 49 m.',
          'Tính chu vi khu vườn là 52 m, rồi cộng thêm 3 m cổng thành 55 m.',
          'Lấy 16 + 10 - 3 = 23 m là độ dài hàng rào.',
          'Cổng không ảnh hưởng nên vẫn cần đúng 52 m hàng rào.',
        ],
        correctAnswer:
          'Tính chu vi cả khu vườn là (16 + 10) × 2 = 52 m, sau đó trừ đi phần cổng 3 m không xây rào nên còn 49 m.',
        reasoningPrompt:
          'Em hãy giải thích vì sao phải trừ 3 m và viết phép tính tìm độ dài hàng rào:',
        reasoningPlaceholder:
          'Bước 1: Tính chu vi toàn bộ khu vườn. Bước 2: Giải thích vì sao trừ đi độ rộng lối cổng để tìm chiều dài hàng rào...',
        reasoningKeywords: ['52', '49', 'cổng', 'trừ', '3'],
        reasoningSampleAnswer:
          'Chu vi cả khu vườn là: (16 + 10) × 2 = 52 (m). Do chừa cổng rộng 3 m không xây rào nên độ dài hàng rào là: 52 - 3 = 49 (m).',
        explanation:
          'Hàng rào bao quanh 4 cạnh vườn nhưng bỏ trống lối cổng 3 m, vì vậy lấy chu vi 52 m trừ 3 m bằng 49 m.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Lập luận bài toán rào vườn có cổng 3 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'hàng rào quanh vườn',
            concreteScenario: 'Khu vườn 16 m × 10 m mở cổng rộng 3 m không xây rào.',
            groups: [
              { id: 'd', label: 'Chiều dài', icon: '📏', count: 2, unitValue: 16, color: '#38BDF8', beforeSolveBadge: '2 × 16 m' },
              { id: 'r', label: 'Chiều rộng', icon: '📐', count: 2, unitValue: 10, color: '#10B981', beforeSolveBadge: '2 × 10 m' },
              { id: 'g', label: 'Cổng bỏ trống', icon: '🚪', count: 1, unitValue: 3, color: '#F59E0B' },
            ],
            unitLabel: 'm',
            outerWidth: 16,
            outerHeight: 10,
            gateWidth: 3,
            unknownTarget: 'fence_with_gate',
            perimeterFormulaHint: 'Hàng rào = Chu vi vườn − Độ rộng cổng',
            guidedLatexSteps: [
              '\\text{Chu vi vườn} = (16 \\;?\\; 10) \\;?\\; 2 = ?\\text{ (m)}',
              '\\text{Độ dài hàng rào} = ? \\;?\\; 3 = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Chu vi vườn} = (16 + 10) \\times 2 = 52\\text{ (m)}',
              '\\text{Độ dài hàng rào} = 52 - 3 = 49\\text{ (m)}',
            ],
            finalAnswerLatex: '49\\text{ m}',
            finalNumericValue: 49,
          }),
        },
      },
      {
        id: 'dec-w1-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [1, 7],
        prompt:
          '[Nghị luận 4] Nếu tăng mỗi cạnh của một hình vuông thêm 5 cm thì chu vi hình vuông đó tăng thêm bao nhiêu xăng-ti-mét? Giải thích vì sao.',
        options: [
          'Tăng thêm 20 cm, vì hình vuông có 4 cạnh bằng nhau nên cả 4 cạnh đều dài thêm 5 cm (5 × 4 = 20 cm).',
          'Chỉ tăng thêm 5 cm vì mỗi cạnh chỉ tăng 5 cm.',
          'Tăng thêm 10 cm vì chỉ tính 2 cạnh kề nhau.',
          'Tăng thêm 25 cm vì lấy 5 × 5 = 25 cm.',
        ],
        correctAnswer:
          'Tăng thêm 20 cm, vì hình vuông có 4 cạnh bằng nhau nên cả 4 cạnh đều dài thêm 5 cm (5 × 4 = 20 cm).',
        reasoningPrompt:
          'Em hãy giải thích quy luật thay đổi chu vi hình vuông khi mỗi cạnh tăng thêm 5 cm:',
        reasoningPlaceholder:
          'Giải thích hình vuông có mấy cạnh bằng nhau và tính tổng phần chu vi tăng thêm khi mỗi cạnh tăng thêm 5 cm...',
        reasoningKeywords: ['4 cạnh', '20', '5 × 4', '5 x 4', 'bằng nhau'],
        reasoningSampleAnswer:
          'Hình vuông có 4 cạnh bằng nhau. Khi mỗi cạnh tăng thêm 5 cm thì tổng độ dài 4 cạnh (chu vi) tăng thêm: 5 × 4 = 20 (cm).',
        explanation:
          'Mỗi cạnh trong 4 cạnh của hình vuông đều dài thêm 5 cm nên chu vi tăng thêm 4 lần phần tăng của 1 cạnh: 5 × 4 = 20 cm.',
        visualModel: {
          type: 'bar_model',
          title: 'Phần tăng thêm trên 4 cạnh hình vuông',
          cpaSpec: buildBarWeeklyCPA({
            family: 'part_whole',
            concreteTitle: 'phần tăng trên 4 cạnh',
            concreteScenario: 'Mỗi cạnh dài thêm 5 cm tạo thành 4 đoạn tăng bằng nhau.',
            interactiveRule: 'Chu vi tăng thêm = 4 × phần tăng mỗi cạnh',
            groups: [
              { id: 'inc', label: 'Phần tăng 4 cạnh', icon: '➕', count: 4, unitValue: 5, isUnknown: true, showUnitValueBeforeSolve: true, displayMode: 'groups', color: '#10B981' },
            ],
            unitLabel: 'cm',
            unitReferenceValue: 5,
            bars: [
              makeBarSpec({
                id: 'b-inc',
                label: '4 cạnh tăng thêm',
                units: 4,
                unitValue: 5,
                displayValue: '? cm',
                color: '#10B981',
                isUnknown: true,
                showKnownUnitValue: true,
              }),
            ],
            totalBracket: {
              targetBarIds: ['b-inc'],
              numericValue: 20,
              displayLabel: 'Tổng chu vi tăng thêm = ?',
              isUnknown: true,
            },
            guidedLatexSteps: ['\\text{Chu vi tăng thêm} = 5 \\;?\\; 4 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi tăng thêm} = 5 \\times 4 = 20\\text{ (cm)}'],
            finalAnswerLatex: '20\\text{ cm}',
            finalNumericValue: 20,
          }),
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 2 (SAU NGÀY 14): CHU VI HÌNH GHÉP & KỸ THUẬT DỜI CẠNH (SIDE-SHIFTING)
  // ==========================================================================
  {
    id: 'dec-weekly-test-w2',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 2,
    weekTitle: 'Tuần 2 · Chu Vi Hình Ghép & Dời Cạnh',
    triggerAfterDayNumber: 14,
    unlocksWeekNumber: 3,
    unlocksDayNumber: 15,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 2: Hình Ghép & Kỹ Thuật Dời Cạnh Singapore',
    subtitle: '6 câu Tính toán (60đ) + 4 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dec-w2-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [8, 9],
        prompt:
          '[Tính toán 1] Ghép 2 mảnh gạch hình vuông cạnh 9 cm sát nhau thành một hình chữ nhật mới. Tính chu vi hình chữ nhật mới đó.',
        options: ['54 cm', '72 cm', '36 cm', '45 cm'],
        correctAnswer: '54 cm',
        explanation:
          'Hình chữ nhật mới có chiều dài 9 × 2 = 18 cm, chiều rộng 9 cm. Chu vi là: (18 + 9) × 2 = 54 (cm) (hay 6 cạnh viền ngoài × 9 = 54 cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Ghép 2 hình vuông cạnh 9 cm thành hình chữ nhật',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'joined_squares',
            concreteTitle: 'mảnh gạch vuông',
            concreteScenario: 'Mối ghép ở giữa nằm bên trong không tính vào chu vi.',
            groups: [
              { id: 'sq', label: 'Hình vuông cạnh 9 cm', icon: '🟦', count: 2, unitValue: 9, color: '#38BDF8', beforeSolveBadge: '2 ô × 9 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 18,
            outerHeight: 9,
            sideLength: 9,
            joinedCount: 2,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Viền ngoài gồm 6 cạnh nhỏ = 6 × cạnh',
            sideShiftNote: 'Mối ghép nằm bên trong nên không được tính vào chu vi!',
            guidedLatexSteps: [
              '\\text{Chiều dài mới} = 9 \\;?\\; 2 = ?\\text{ (cm)}',
              '\\text{Chu vi mới} = (? \\;?\\; 9) \\;?\\; 2 = ?\\text{ (cm)}',
            ],
            fullLatexSteps: [
              '\\text{Chiều dài mới} = 9 \\times 2 = 18\\text{ (cm)}',
              '\\text{Chu vi mới} = (18 + 9) \\times 2 = 54\\text{ (cm)}',
            ],
            finalAnswerLatex: '54\\text{ cm}',
            finalNumericValue: 54,
          }),
        },
      },
      {
        id: 'dec-w2-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [8, 9],
        prompt:
          '[Tính toán 2] Xếp 3 viên gạch hình vuông cạnh 7 cm thành một hàng ngang liền kề nhau. Tính chu vi hình chữ nhật tạo thành.',
        options: ['56 cm', '84 cm', '42 cm', '63 cm'],
        correctAnswer: '56 cm',
        explanation:
          'Hình chữ nhật tạo thành có chiều dài 7 × 3 = 21 cm, chiều rộng 7 cm. Chu vi là: (21 + 7) × 2 = 56 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Ghép 3 hình vuông cạnh 7 cm thẳng hàng',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'joined_squares',
            concreteTitle: 'viên gạch vuông',
            concreteScenario: 'Đếm đường viền bao quanh bên ngoài của 3 viên gạch.',
            groups: [
              { id: 'sq', label: 'Viên gạch cạnh 7 cm', icon: '🟨', count: 3, unitValue: 7, color: '#F59E0B', beforeSolveBadge: '3 ô × 7 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 21,
            outerHeight: 7,
            sideLength: 7,
            joinedCount: 3,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Dài = 3 × cạnh; Chu vi = (Dài + Rộng) × 2',
            sideShiftNote: 'Hai đường nối bên trong không nằm trên đường viền ngoài.',
            guidedLatexSteps: [
              '\\text{Chiều dài mới} = 7 \\;?\\; 3 = ?\\text{ (cm)}',
              '\\text{Chu vi} = (? \\;?\\; 7) \\;?\\; 2 = ?\\text{ (cm)}',
            ],
            fullLatexSteps: [
              '\\text{Chiều dài mới} = 7 \\times 3 = 21\\text{ (cm)}',
              '\\text{Chu vi} = (21 + 7) \\times 2 = 56\\text{ (cm)}',
            ],
            finalAnswerLatex: '56\\text{ cm}',
            finalNumericValue: 56,
          }),
        },
      },
      {
        id: 'dec-w2-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [10, 11],
        prompt:
          '[Tính toán 3] Một tấm kim loại hình chữ L có khung bao bên ngoài rộng 18 cm, cao 14 cm (được cắt khuyết một góc chữ nhật). Áp dụng kỹ thuật dời cạnh, tính chu vi hình chữ L đó.',
        options: ['64 cm', '32 cm', '58 cm', '70 cm'],
        correctAnswer: '64 cm',
        explanation:
          'Dời 2 cạnh góc khuyết ra ngoài ta được hình chữ nhật đầy đủ 18 cm × 14 cm. Chu vi là: (18 + 14) × 2 = 64 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Dời cạnh hình chữ L khung bao 18 cm × 14 cm',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'l_shape',
            concreteTitle: 'cạnh khung bao chữ L',
            concreteScenario: 'Đẩy 2 cạnh lõm góc ra ngoài tạo hình chữ nhật 18 cm × 14 cm.',
            groups: [
              { id: 'w', label: 'Đáy khung bao', icon: '↔️', count: 2, unitValue: 18, color: '#38BDF8', beforeSolveBadge: '2 × 18 cm' },
              { id: 'h', label: 'Chiều cao khung bao', icon: '↕️', count: 2, unitValue: 14, color: '#10B981', beforeSolveBadge: '2 × 14 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 18,
            outerHeight: 14,
            cutWidth: 6,
            cutHeight: 5,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ L = Chu vi HCN khung bao = (Dài + Cao) × 2',
            sideShiftNote: 'Bấm mô phỏng Dời cạnh để thấy 2 cạnh khuyết khép kín thành hình chữ nhật!',
            guidedLatexSteps: ['\\text{Chu vi hình chữ L} = (18 \\;?\\; 14) \\;?\\; 2 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi hình chữ L} = (18 + 14) \\times 2 = 64\\text{ (cm)}'],
            finalAnswerLatex: '64\\text{ cm}',
            finalNumericValue: 64,
          }),
        },
      },
      {
        id: 'dec-w2-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [11, 12],
        prompt:
          '[Tính toán 4] Một bậc tam cấp hình bậc thang gồm 3 bậc có cạnh đáy dài 20 m và cạnh đứng cao 15 m. Tính chu vi của hình bậc thang đó.',
        options: ['70 m', '35 m', '65 m', '80 m'],
        correctAnswer: '70 m',
        explanation:
          'Dời toàn bộ các mặt ngang lên trên (= 20 m) và mặt đứng sang phải (= 15 m), chu vi hình bậc thang bằng chu vi HCN 20 × 15 m: (20 + 15) × 2 = 70 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Dời cạnh hình bậc thang 3 bậc (20 m × 15 m)',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'staircase',
            concreteTitle: 'cạnh bậc thang',
            concreteScenario: 'Chiếu các bậc ngang lên trên và bậc đứng sang phải.',
            groups: [
              { id: 'w', label: 'Tổng cạnh ngang', icon: '↔️', count: 2, unitValue: 20, color: '#38BDF8', beforeSolveBadge: '2 × 20 m' },
              { id: 'h', label: 'Tổng cạnh đứng', icon: '↕️', count: 2, unitValue: 15, color: '#10B981', beforeSolveBadge: '2 × 15 m' },
            ],
            unitLabel: 'm',
            outerWidth: 20,
            outerHeight: 15,
            cutWidth: 12,
            cutHeight: 10,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi bậc thang = (Đáy + Cao) × 2',
            sideShiftNote: 'Mọi bậc ngang chiếu lên đúng bằng đáy; mọi bậc đứng chiếu sang đúng bằng chiều cao.',
            guidedLatexSteps: ['\\text{Chu vi bậc thang} = (20 \\;?\\; 15) \\;?\\; 2 = ?\\text{ (m)}'],
            fullLatexSteps: ['\\text{Chu vi bậc thang} = (20 + 15) \\times 2 = 70\\text{ (m)}'],
            finalAnswerLatex: '70\\text{ m}',
            finalNumericValue: 70,
          }),
        },
      },
      {
        id: 'dec-w2-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [13, 14],
        prompt:
          '[Tính toán 5] Một tấm ván hình chữ U có chiều rộng khung bao 22 cm, chiều cao 16 cm và phần khe lõm ở giữa sâu 6 cm. Tính chu vi tấm ván hình chữ U đó.',
        options: ['88 cm', '76 cm', '82 cm', '94 cm'],
        correctAnswer: '88 cm',
        explanation:
          'Chu vi khung bao ngoài là: (22 + 16) × 2 = 76 (cm). Khi đẩy đáy khe lên miệng vẫn còn dư 2 thành đứng sâu 6 cm hai bên khe: 76 + 6 × 2 = 88 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Hình chữ U: Khung 22 × 16 cm, khe lõm sâu 6 cm',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'u_shape',
            concreteTitle: 'cạnh hình chữ U',
            concreteScenario: 'Khung ngoài 22 cm × 16 cm có rãnh lõm sâu 6 cm ở chính giữa.',
            groups: [
              { id: 'w', label: 'Chiều rộng khung', icon: '↔️', count: 2, unitValue: 22, color: '#38BDF8', beforeSolveBadge: '2 × 22 cm' },
              { id: 'h', label: 'Chiều cao khung', icon: '↕️', count: 2, unitValue: 16, color: '#10B981', beforeSolveBadge: '2 × 16 cm' },
              { id: 'd', label: '2 thành khe lõm', icon: '⚡', count: 2, unitValue: 6, color: '#F59E0B', beforeSolveBadge: '2 × 6 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 22,
            outerHeight: 16,
            recessWidth: 8,
            recessDepth: 6,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ U = Chu vi khung ngoài + 2 × Độ sâu khe',
            sideShiftNote: 'Đẩy đáy rãnh lên khép kín khung ngoài, đừng quên cộng thêm 2 thành đứng màu vàng cam!',
            guidedLatexSteps: [
              '\\text{Chu vi khung bao} = (22 \\;?\\; 16) \\;?\\; 2 = ?\\text{ (cm)}',
              '\\text{Chu vi chữ U} = ? \\;?\\; (6 \\;?\\; 2) = ?\\text{ (cm)}',
            ],
            fullLatexSteps: [
              '\\text{Chu vi khung bao} = (22 + 16) \\times 2 = 76\\text{ (cm)}',
              '\\text{Chu vi chữ U} = 76 + 6 \\times 2 = 88\\text{ (cm)}',
            ],
            finalAnswerLatex: '88\\text{ cm}',
            finalNumericValue: 88,
          }),
        },
      },
      {
        id: 'dec-w2-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [13, 14],
        prompt:
          '[Tính toán 6] Một sân ga hình chữ U có chiều ngang 30 m, chiều cao 20 m và rãnh đón tàu ở giữa lõm sâu vào 5 m. Tính tổng độ dài đường viền quanh sân ga đó.',
        options: ['110 m', '100 m', '105 m', '120 m'],
        correctAnswer: '110 m',
        explanation:
          'Chu vi khung bao là: (30 + 20) × 2 = 100 (m). Cộng thêm 2 thành đứng của rãnh lõm sâu 5 m: 100 + 5 × 2 = 110 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Sân ga chữ U: Khung 30 m × 20 m, rãnh sâu 5 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'u_shape',
            concreteTitle: 'đường viền sân ga',
            concreteScenario: 'Rãnh lõm ở giữa làm phát sinh thêm 2 đoạn tường đứng mỗi đoạn 5 m.',
            groups: [
              { id: 'w', label: 'Chiều ngang khung', icon: '↔️', count: 2, unitValue: 30, color: '#38BDF8', beforeSolveBadge: '2 × 30 m' },
              { id: 'h', label: 'Chiều cao khung', icon: '↕️', count: 2, unitValue: 20, color: '#10B981', beforeSolveBadge: '2 × 20 m' },
              { id: 'd', label: '2 thành rãnh lõm', icon: '⚡', count: 2, unitValue: 5, color: '#F59E0B', beforeSolveBadge: '2 × 5 m' },
            ],
            unitLabel: 'm',
            outerWidth: 30,
            outerHeight: 20,
            recessWidth: 10,
            recessDepth: 5,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi = Chu vi khung ngoài + 2 × Độ sâu rãnh',
            sideShiftNote: 'Khe lõm ở giữa tạo thêm 2 thành đứng màu vàng cam cần cộng vào chu vi!',
            guidedLatexSteps: [
              '\\text{Chu vi khung bao} = (30 \\;?\\; 20) \\;?\\; 2 = ?\\text{ (m)}',
              '\\text{Chu vi sân ga} = ? \\;?\\; (5 \\;?\\; 2) = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Chu vi khung bao} = (30 + 20) \\times 2 = 100\\text{ (m)}',
              '\\text{Chu vi sân ga} = 100 + 5 \\times 2 = 110\\text{ (m)}',
            ],
            finalAnswerLatex: '110\\text{ m}',
            finalNumericValue: 110,
          }),
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'dec-w2-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [8, 9],
        prompt:
          '[Nghị luận 1] Ghép 2 mảnh bìa hình vuông cạnh 6 cm thành 1 hình chữ nhật. Bạn An thấy mỗi hình vuông có chu vi 24 cm nên cộng lại 24 + 24 = 48 cm làm chu vi hình mới. Theo em bạn An đúng hay sai?',
        options: [
          'Sai, vì khi ghép sát nhau có 2 cạnh dài 6 cm bị giấu vào bên trong (mất 12 cm), nên chu vi hình mới chỉ còn 36 cm.',
          'Đúng, vì ghép 2 hình lại thì chu vi luôn bằng tổng chu vi 2 hình.',
          'Sai, vì chỉ bị mất 1 cạnh nên chu vi là 48 - 6 = 42 cm.',
          'Sai, vì chu vi hình mới là 24 cm.',
        ],
        correctAnswer:
          'Sai, vì khi ghép sát nhau có 2 cạnh dài 6 cm bị giấu vào bên trong (mất 12 cm), nên chu vi hình mới chỉ còn 36 cm.',
        reasoningPrompt:
          'Em hãy giải thích vì sao chu vi hình ghép nhỏ hơn tổng chu vi 2 hình vuông và tính kết quả đúng:',
        reasoningPlaceholder:
          'Chỉ ra các cạnh nằm ẩn bên trong tại mối ghép không được tính vào chu vi, sau đó viết phép tính chu vi mới...',
        reasoningKeywords: ['36', 'bên trong', '2 cạnh', '12', 'ghép'],
        reasoningSampleAnswer:
          'Bạn An sai vì tại mối ghép có 2 cạnh của 2 hình vuông nằm ẩn bên trong không thuộc đường viền ngoài (mất 6 × 2 = 12 cm). Chu vi thật là 48 - 12 = 36 (cm).',
        explanation:
          'Chu vi chỉ tính các cạnh nằm ở đường viền bên ngoài. 2 cạnh ghép sát nhau nằm ở giữa không được tính, nên chu vi là 6 × 6 = 36 cm.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Tại sao ghép 2 hình vuông cạnh 6 cm bị giảm 2 cạnh?',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'joined_squares',
            concreteTitle: 'mảnh vuông ghép liền',
            concreteScenario: 'Mỗi hình vuông góp 3 cạnh viền ngoài, 1 cạnh bị che ở giữa.',
            groups: [
              { id: 'sq', label: 'Hình vuông cạnh 6 cm', icon: '🟦', count: 2, unitValue: 6, color: '#38BDF8', beforeSolveBadge: '2 ô × 6 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 12,
            outerHeight: 6,
            sideLength: 6,
            joinedCount: 2,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi mới = Tổng 2 chu vi − 2 cạnh ghép bên trong',
            sideShiftNote: 'Mối ghép nét đứt ở giữa làm ẩn đi 2 cạnh (mỗi hình 1 cạnh).',
            guidedLatexSteps: ['\\text{Chu vi hình ghép} = 48 \\;?\\; (6 \\;?\\; 2) = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi hình ghép} = 48 - 6 \\times 2 = 36\\text{ (cm)}'],
            finalAnswerLatex: '36\\text{ cm}',
            finalNumericValue: 36,
          }),
        },
      },
      {
        id: 'dec-w2-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [10, 11],
        prompt:
          '[Nghị luận 2] Cắt bỏ một góc hình chữ nhật nhỏ ở đỉnh một tấm bìa hình chữ nhật 16 cm × 12 cm để tạo thành hình chữ L. Vì sao chu vi hình chữ L vẫn bằng đúng chu vi hình chữ nhật ban đầu (56 cm)?',
        options: [
          'Vì 2 cạnh mới tạo ra ở góc khuyết khi dời song song ra ngoài sẽ khít đúng bằng 2 đoạn cạnh bị cắt mất, nên chu vi không đổi là 56 cm.',
          'Vì góc cắt đi quá nhỏ nên bỏ qua được.',
          'Vì chu vi hình chữ L luôn nhỏ hơn 56 cm.',
          'Vì khi cắt góc thì diện tích không đổi nên chu vi không đổi.',
        ],
        correctAnswer:
          'Vì 2 cạnh mới tạo ra ở góc khuyết khi dời song song ra ngoài sẽ khít đúng bằng 2 đoạn cạnh bị cắt mất, nên chu vi không đổi là 56 cm.',
        reasoningPrompt:
          'Em hãy giải thích bằng kỹ thuật Dời cạnh vì sao cắt góc ở đỉnh không làm giảm chu vi:',
        reasoningPlaceholder:
          'Mô tả cách dời 2 cạnh góc khuyết ra ngoài để ghép khít lại thành khung hình chữ nhật ban đầu...',
        reasoningKeywords: ['dời', '56', 'không đổi', 'khung', 'cạnh'],
        reasoningSampleAnswer:
          'Khi cắt ở góc đỉnh, ta mất 1 đoạn ngang và 1 đoạn đứng ở ngoài nhưng lại xuất hiện đúng 1 đoạn ngang và 1 đoạn đứng tương ứng ở bên trong. Dời ra ngoài vừa khít HCN 16 × 12 cm nên chu vi vẫn là (16 + 12) × 2 = 56 cm.',
        explanation:
          'Cắt bỏ góc ở đỉnh làm giảm diện tích nhưng KHÔNG làm giảm chu vi vì 2 cạnh lõm bên trong bù đúng bằng 2 đoạn viền đã cắt.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Dời cạnh góc khuyết hình chữ L (16 cm × 12 cm)',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'l_shape',
            concreteTitle: 'cạnh góc khuyết chữ L',
            concreteScenario: 'Đẩy cạnh ngang lên trên và cạnh dọc sang phải.',
            groups: [
              { id: 'w', label: 'Chiều dài khung', icon: '↔️', count: 2, unitValue: 16, color: '#38BDF8', beforeSolveBadge: '2 × 16 cm' },
              { id: 'h', label: 'Chiều rộng khung', icon: '↕️', count: 2, unitValue: 12, color: '#10B981', beforeSolveBadge: '2 × 12 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 16,
            outerHeight: 12,
            cutWidth: 5,
            cutHeight: 4,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ L = Chu vi hình chữ nhật khung ngoài',
            sideShiftNote: 'Hai cạnh góc khuyết dịch chuyển thẳng ra khép kín góc bị mất.',
            guidedLatexSteps: ['\\text{Chu vi chữ L} = (16 \\;?\\; 12) \\;?\\; 2 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi chữ L} = (16 + 12) \\times 2 = 56\\text{ (cm)}'],
            finalAnswerLatex: '56\\text{ cm}',
            finalNumericValue: 56,
          }),
        },
      },
      {
        id: 'dec-w2-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [13, 14],
        prompt:
          '[Nghị luận 3] Một tấm bìa chữ U có khung bao 18 cm × 12 cm (chu vi khung là 60 cm) và một khe lõm ở giữa cạnh trên sâu 4 cm. Vì sao chu vi hình chữ U lại LỚN HƠN 60 cm và bằng bao nhiêu?',
        options: [
          'Vì khi đẩy đáy khe lên miệng đã đủ khung 60 cm, nhưng vẫn còn dư 2 thành đứng sâu 4 cm hai bên khe nên chu vi tăng thêm 8 cm thành 68 cm.',
          'Vì hình chữ U có chu vi nhỏ hơn khung bao nên là 60 - 8 = 52 cm.',
          'Vì chỉ cộng thêm 1 thành khe sâu 4 cm nên chu vi là 64 cm.',
          'Vì chu vi chữ U cũng bằng đúng khung bao 60 cm giống hình chữ L.',
        ],
        correctAnswer:
          'Vì khi đẩy đáy khe lên miệng đã đủ khung 60 cm, nhưng vẫn còn dư 2 thành đứng sâu 4 cm hai bên khe nên chu vi tăng thêm 8 cm thành 68 cm.',
        reasoningPrompt:
          'Em hãy giải thích sự khác nhau giữa khoét ở góc (chữ L) và khoét ở giữa cạnh (chữ U), rồi tính chu vi hình chữ U:',
        reasoningPlaceholder:
          'So sánh phần cạnh phát sinh khi khoét ở giữa cạnh (chữ U) so với khoét ở góc (chữ L), rồi viết phép tính chu vi...',
        reasoningKeywords: ['68', '2 thành', '8', '4 × 2', '60'],
        reasoningSampleAnswer:
          'Khi đẩy đáy khe lõm lên miệng ta khép kín hình chữ nhật khung ngoài có chu vi 60 cm. Tuy nhiên 2 thành đứng sâu 4 cm hai bên khe chưa được tính nên phải cộng thêm 4 × 2 = 8 cm. Chu vi là: 60 + 8 = 68 (cm).',
        explanation:
          'Khoét lõm ở giữa cạnh làm xuất hiện thêm 2 cạnh đứng dài bằng độ sâu khe, nên chu vi chữ U = 60 + 4 × 2 = 68 cm.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'So sánh khe lõm chữ U (18 × 12 cm, sâu 4 cm) với khung bao',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'u_shape',
            concreteTitle: 'cạnh hình chữ U',
            concreteScenario: 'Đẩy đáy khe lên trên, quan sát 2 vách đứng màu vàng cam còn dư.',
            groups: [
              { id: 'w', label: 'Chiều dài khung', icon: '↔️', count: 2, unitValue: 18, color: '#38BDF8', beforeSolveBadge: '2 × 18 cm' },
              { id: 'h', label: 'Chiều cao khung', icon: '↕️', count: 2, unitValue: 12, color: '#10B981', beforeSolveBadge: '2 × 12 cm' },
              { id: 'd', label: '2 vách khe lõm', icon: '⚡', count: 2, unitValue: 4, color: '#F59E0B', beforeSolveBadge: '2 × 4 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 18,
            outerHeight: 12,
            recessWidth: 6,
            recessDepth: 4,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ U = Chu vi khung ngoài + 2 × Độ sâu khe',
            sideShiftNote: '2 vách đứng màu vàng cam chính là phần làm tăng chu vi so với khung ngoài!',
            guidedLatexSteps: ['\\text{Chu vi chữ U} = 60 \\;?\\; (4 \\;?\\; 2) = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi chữ U} = 60 + 4 \\times 2 = 68\\text{ (cm)}'],
            finalAnswerLatex: '68\\text{ cm}',
            finalNumericValue: 68,
          }),
        },
      },
      {
        id: 'dec-w2-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [11, 12],
        prompt:
          '[Nghị luận 4] Cho hình bậc thang 4 bậc biết cạnh đáy dài 15 cm và cạnh đứng bên trái cao 10 cm, nhưng đề KHÔNG cho biết độ dài từng bậc nhỏ. Em có tính được chu vi hình bậc thang không?',
        options: [
          'Tính được, vì dời tất cả đoạn ngang lên trên luôn có tổng bằng 15 cm và các đoạn đứng sang phải có tổng bằng 10 cm, nên chu vi luôn là 50 cm.',
          'Không tính được vì thiếu số đo của từng bậc nhỏ.',
          'Tính được nhưng phải giả sử mỗi bậc rộng bằng nhau.',
          'Chu vi luôn bằng 15 + 10 = 25 cm.',
        ],
        correctAnswer:
          'Tính được, vì dời tất cả đoạn ngang lên trên luôn có tổng bằng 15 cm và các đoạn đứng sang phải có tổng bằng 10 cm, nên chu vi luôn là 50 cm.',
        reasoningPrompt:
          'Em hãy giải thích vì sao không cần biết độ dài từng bậc nhỏ mà vẫn tính được chính xác chu vi hình bậc thang:',
        reasoningPlaceholder:
          'Giải thích dựa trên tổng các đoạn bậc ngang khi dời lên trên và các đoạn bậc đứng khi dời sang phải, rồi tính chu vi...',
        reasoningKeywords: ['50', 'tổng', 'dời', '15', '10'],
        reasoningSampleAnswer:
          'Ta không cần biết từng bậc nhỏ vì khi dời toàn bộ mặt ngang lên trên thì tổng độ dài chúng luôn bằng cạnh đáy 15 cm, và tổng các mặt đứng luôn bằng cạnh cao 10 cm. Chu vi là: (15 + 10) × 2 = 50 (cm).',
        explanation:
          'Bất kể từng bậc to hay nhỏ không đều nhau, tổng hình chiếu ngang luôn bằng 15 cm và tổng hình chiếu đứng luôn bằng 10 cm → P = 50 cm.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Bậc thang 4 bậc: Đáy 15 cm, Cao 10 cm (không cần số đo từng bậc)',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'staircase',
            concreteTitle: 'hình chiếu các bậc thang',
            concreteScenario: 'Đáy 15 cm, chiều cao 10 cm, chiếu các bậc ra khung ngoài.',
            groups: [
              { id: 'w', label: 'Đáy và tổng mặt ngang', icon: '↔️', count: 2, unitValue: 15, color: '#38BDF8', beforeSolveBadge: '2 × 15 cm' },
              { id: 'h', label: 'Cạnh trái và tổng mặt đứng', icon: '↕️', count: 2, unitValue: 10, color: '#10B981', beforeSolveBadge: '2 × 10 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 15,
            outerHeight: 10,
            cutWidth: 9,
            cutHeight: 6,
            stepCount: 4,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi bậc thang = (Đáy + Cao) × 2',
            sideShiftNote: 'Dù bậc trên rộng hay hẹp, tổng các bậc ngang vẫn vừa khít đáy 15 cm!',
            guidedLatexSteps: ['\\text{Chu vi bậc thang} = (15 \\;?\\; 10) \\;?\\; 2 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi bậc thang} = (15 + 10) \\times 2 = 50\\text{ (cm)}'],
            finalAnswerLatex: '50\\text{ cm}',
            finalNumericValue: 50,
          }),
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 3 (SAU NGÀY 21): ĐO LƯỜNG KHỐI LƯỢNG (kg – g) & CÂN THĂNG BẰNG
  // ==========================================================================
  {
    id: 'dec-weekly-test-w3',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 3,
    weekTitle: 'Tuần 3 · Khối Lượng kg – g',
    triggerAfterDayNumber: 21,
    unlocksWeekNumber: 4,
    unlocksDayNumber: 22,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 3: Đo Lường Khối Lượng (kg – g) & Cân Thăng Bằng',
    subtitle: '6 câu Tính toán (60đ) + 4 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dec-w3-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [15, 16],
        prompt:
          '[Tính toán 1] Một túi khoai tây cân nặng 3 kg 450 g. Hỏi túi khoai tây đó cân nặng bao nhiêu gam?',
        options: ['3450 g', '345 g', '3045 g', '3540 g'],
        correctAnswer: '3450 g',
        explanation:
          'Đổi 3 kg = 3000 g. Vậy 3 kg 450 g = 3000 g + 450 g = 3450 g.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Quy đổi 3 kg 450 g sang gam',
          primaryReading: '3 kg 450 g',
          secondaryReading: '= ? g',
          conversionRule: '1 kg = 1 000 g',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'unit_convert',
            operands: [3000, 450],
            concreteTitle: 'túi khoai tây',
            concreteScenario: 'Đổi 3 quả cân 1 kg sang gam rồi cộng thêm 450 g.',
            groups: [
              { id: 'kg', label: '3 kg đổi sang g', icon: '⚖️', count: 3, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '3 kg' },
              { id: 'g', label: 'Phần gam lẻ', icon: '🥔', count: 1, unitValue: 450, color: '#F59E0B' },
            ],
            unitLabel: 'g',
            primaryReading: '3 kg 450 g',
            secondaryReading: '= ? g',
            conversionRule: '1 kg = 1 000 g',
            visualParams: {
              mode: 'convert',
              givenA: 3,
              givenB: 450,
              unitA: 'kg',
              unitB: 'g',
            },
            guidedLatexSteps: [
              '3\\text{ kg} = 3 \\;?\\; 1000 = ?\\text{ (g)}',
              '\\text{Khối lượng} = (\\text{g từ kg}) \\;?\\; 450 = ?\\text{ (g)}',
            ],
            fullLatexSteps: [
              '3\\text{ kg} = 3000\\text{ g}',
              '3\\text{ kg } 450\\text{ g} = 3000 + 450 = 3450\\text{ (g)}',
            ],
            finalAnswerLatex: '3450\\text{ g}',
            finalNumericValue: 3450,
          }),
        },
      },
      {
        id: 'dec-w3-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [16, 17],
        prompt:
          '[Tính toán 2] Một bao gạo cân nặng 4 kg. Mẹ lấy ra 1250 g gạo để nấu ăn. Hỏi trong bao còn lại bao nhiêu gam gạo?',
        options: ['2750 g', '2850 g', '3750 g', '2650 g'],
        correctAnswer: '2750 g',
        explanation:
          'Đổi 4 kg = 4000 g. Số gạo còn lại trong bao là: 4000 - 1250 = 2750 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Đổi cùng đơn vị gam trước khi trừ',
          primaryReading: 'Bao gạo: 4 kg',
          secondaryReading: 'Lấy ra: 1 250 g',
          conversionRule: '1 kg = 1 000 g · Đổi sang gam rồi trừ',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'unit_subtract',
            operands: [4000, 1250],
            concreteTitle: 'gạo trong bao',
            concreteScenario: 'Đưa cả hai số đo về đơn vị gam rồi tính phần còn lại.',
            groups: [
              { id: 'all', label: 'Ban đầu (4 kg)', icon: '🌾', count: 4, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '4 kg' },
              { id: 'out', label: 'Đã lấy ra', icon: '🥣', count: 1, unitValue: 1250, color: '#F43F5E' },
            ],
            unitLabel: 'g',
            primaryReading: 'Bao gạo: 4 kg',
            secondaryReading: 'Lấy ra: 1 250 g',
            conversionRule: '1 kg = 1 000 g · Đổi sang gam rồi trừ',
            visualParams: {
              mode: 'subtract',
              givenA: 4000,
              givenB: 1250,
              unitA: 'g',
              labelA: 'Bao gạo: 4 kg',
              labelB: 'Lấy ra: 1 250 g',
            },
            guidedLatexSteps: [
              '\\text{Đổi } 4\\text{ kg} = 4 \\;?\\; 1000 = ?\\text{ (g)}',
              '\\text{Gạo còn lại} = (\\text{Ban đầu}) \\;?\\; 1250 = ?\\text{ (g)}',
            ],
            fullLatexSteps: [
              '4\\text{ kg} = 4000\\text{ g}',
              '4000 - 1250 = 2750\\text{ (g)}',
            ],
            finalAnswerLatex: '2750\\text{ g}',
            finalNumericValue: 2750,
          }),
        },
      },
      {
        id: 'dec-w3-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [17, 18],
        prompt:
          '[Tính toán 3] Cả hộp bánh và vỏ hộp cân nặng 850 g. Biết riêng vỏ hộp nặng 130 g. Hỏi phần bánh bên trong hộp cân nặng bao nhiêu gam?',
        options: ['720 g', '980 g', '730 g', '620 g'],
        correctAnswer: '720 g',
        explanation:
          'Khối lượng riêng phần bánh là: 850 - 130 = 720 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Bài toán Trừ bì: Cả hộp 850 g, vỏ 130 g',
          primaryReading: 'Cả hộp: 850 g',
          secondaryReading: 'Vỏ hộp: 130 g',
          conversionRule: 'Ruột = Cả hộp − Vỏ hộp',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'tare_weight',
            operands: [850, 130],
            concreteTitle: 'ruột bánh trong hộp',
            concreteScenario: 'Cả hộp 850 g gồm vỏ hộp 130 g và phần bánh bên trong.',
            groups: [
              { id: 'box', label: 'Vỏ hộp', icon: '📦', count: 1, unitValue: 130, color: '#94A3B8' },
              { id: 'cake', label: 'Ruột bánh', icon: '🍪', count: 1, unitValue: 720, isUnknown: true, color: '#F59E0B' },
            ],
            unitLabel: 'g',
            primaryReading: 'Cả hộp: 850 g',
            secondaryReading: 'Vỏ hộp: 130 g',
            conversionRule: 'Ruột = Cả hộp − Vỏ hộp',
            visualParams: {
              mode: 'subtract',
              givenA: 850,
              givenB: 130,
              unitA: 'g',
              labelA: 'Cả hộp: 850 g',
              labelB: 'Vỏ hộp: 130 g',
            },
            guidedLatexSteps: ['\\text{Khối lượng bánh} = 850 \\;?\\; 130 = ?\\text{ (g)}'],
            fullLatexSteps: ['\\text{Khối lượng bánh} = 850 - 130 = 720\\text{ (g)}'],
            finalAnswerLatex: '720\\text{ g}',
            finalNumericValue: 720,
          }),
        },
      },
      {
        id: 'dec-w3-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [18, 19],
        prompt:
          '[Tính toán 4] Trên cân đĩa đang thăng bằng: Đĩa bên trái có 1 quả dưa và 1 quả cân 250 g; đĩa bên phải có 1 quả cân 1 kg và 1 quả cân 500 g. Hỏi quả dưa cân nặng bao nhiêu gam?',
        options: ['1250 g', '1500 g', '1750 g', '1150 g'],
        correctAnswer: '1250 g',
        explanation:
          'Đĩa phải nặng: 1000 g + 500 g = 1500 g. Vì cân thăng bằng nên quả dưa nặng: 1500 - 250 = 1250 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Cân đĩa thăng bằng: Tìm khối lượng quả dưa',
          primaryReading: 'Đĩa trái: 1 quả dưa + 250 g',
          secondaryReading: 'Đĩa phải: 1 kg + 500 g',
          conversionRule: '1 kg = 1 000 g · Đĩa trái = Đĩa phải',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'balance_eq',
            operands: [1500, 250],
            concreteTitle: 'quả dưa trên cân đĩa',
            concreteScenario: 'Đĩa trái: 1 quả dưa + 250 g. Đĩa phải: 1 kg + 500 g.',
            groups: [
              { id: 'r1', label: 'Đĩa phải', icon: '⚖️', count: 1, unitValue: 1500, color: '#38BDF8', beforeSolveBadge: '1 kg + 500 g' },
              { id: 'l2', label: 'Quả cân bên trái', icon: '🪨', count: 1, unitValue: 250, color: '#94A3B8' },
              { id: 'melon', label: 'Quả dưa', icon: '🍉', count: 1, unitValue: 1250, isUnknown: true, color: '#10B981' },
            ],
            unitLabel: 'g',
            primaryReading: 'Đĩa trái: 1 quả dưa + 250 g',
            secondaryReading: 'Đĩa phải: 1 kg + 500 g',
            conversionRule: '1 kg = 1 000 g · Đĩa trái = Đĩa phải',
            visualParams: {
              mode: 'balance_eq',
              givenA: 1500,
              givenB: 250,
              unitA: 'g',
              labelA: '1 quả dưa + 250 g',
              labelB: '1 kg + 500 g',
            },
            guidedLatexSteps: [
              '\\text{Đĩa phải} = 1000 \\;?\\; 500 = ?\\text{ (g)}',
              '\\text{Quả dưa} = ? \\;?\\; 250 = ?\\text{ (g)}',
            ],
            fullLatexSteps: [
              '\\text{Đĩa phải} = 1000 + 500 = 1500\\text{ (g)}',
              '\\text{Quả dưa} = 1500 - 250 = 1250\\text{ (g)}',
            ],
            finalAnswerLatex: '1250\\text{ g}',
            finalNumericValue: 1250,
          }),
        },
      },
      {
        id: 'dec-w3-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [19, 20],
        prompt:
          '[Tính toán 5] Một thùng đựng đầy táo cân nặng 16 kg. Sau khi bán đi một nửa số táo, cả thùng và số táo còn lại cân nặng 9 kg. Hỏi riêng vỏ thùng rỗng nặng bao nhiêu ki-lô-gam?',
        options: ['2 kg', '7 kg', '4 kg', '1 kg'],
        correctAnswer: '2 kg',
        explanation:
          'Một nửa số táo nặng: 16 - 9 = 7 (kg). Cả số táo ban đầu nặng: 7 × 2 = 14 (kg). Vỏ thùng rỗng nặng: 16 - 14 = 2 (kg).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Cả thùng đầy (16 kg) & Nửa thùng (9 kg)',
          primaryReading: 'Thùng đầy: 16 kg',
          secondaryReading: 'Còn nửa táo: 9 kg',
          conversionRule: 'Vỏ không đổi nên hiệu hai lần cân = Một nửa số táo',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'tare_weight',
            operands: [16, 9],
            concreteTitle: 'vỏ thùng táo rỗng',
            concreteScenario: 'Lúc đầy: Vỏ + cả táo = 16 kg. Lúc sau: Vỏ + nửa táo = 9 kg.',
            groups: [
              { id: 'full', label: 'Thùng đầy', icon: '🍎', count: 1, unitValue: 16, color: '#38BDF8' },
              { id: 'half', label: 'Thùng còn nửa táo', icon: '🧺', count: 1, unitValue: 9, color: '#F59E0B' },
              { id: 'shell', label: 'Vỏ thùng rỗng', icon: '📦', count: 1, unitValue: 2, isUnknown: true, color: '#94A3B8' },
            ],
            unitLabel: 'kg',
            primaryReading: 'Thùng đầy: 16 kg',
            secondaryReading: 'Còn nửa táo: 9 kg',
            conversionRule: 'Vỏ không đổi nên hiệu hai lần cân = Một nửa số táo',
            visualParams: {
              mode: 'tare_half',
              givenA: 16,
              givenB: 9,
              unitA: 'kg',
              labelA: 'Thùng đầy',
              labelB: 'Còn nửa táo',
            },
            guidedLatexSteps: [
              '\\text{Một nửa số táo} = 16 \\;?\\; 9 = ?\\text{ (kg)}',
              '\\text{Cả số táo} = ? \\;?\\; 2 = ?\\text{ (kg)}',
              '\\text{Vỏ thùng rỗng} = 16 \\;?\\; ? = ?\\text{ (kg)}',
            ],
            fullLatexSteps: [
              '\\text{Một nửa số táo} = 16 - 9 = 7\\text{ (kg)}',
              '\\text{Cả số táo} = 7 \\times 2 = 14\\text{ (kg)}',
              '\\text{Vỏ thùng rỗng} = 16 - 14 = 2\\text{ (kg)}',
            ],
            finalAnswerLatex: '2\\text{ kg}',
            finalNumericValue: 2,
          }),
        },
      },
      {
        id: 'dec-w3-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [20, 21],
        prompt:
          '[Tính toán 6] Giỏ A đựng 28 kg cam, Giỏ B đựng 16 kg cam. Hỏi cần chuyển bao nhiêu ki-lô-gam cam từ Giỏ A sang Giỏ B để hai giỏ nặng bằng nhau?',
        options: ['6 kg', '12 kg', '4 kg', '8 kg'],
        correctAnswer: '6 kg',
        explanation:
          'Giỏ A nặng hơn Giỏ B là: 28 - 16 = 12 (kg). Cần chuyển một nửa phần hơn từ Giỏ A sang Giỏ B: 12 : 2 = 6 (kg).',
        visualModel: {
          type: 'bar_model',
          title: 'San bằng 2 giỏ cam: Giỏ A (28 kg) & Giỏ B (16 kg)',
          cpaSpec: buildBarWeeklyCPA({
            family: 'comparison',
            concreteTitle: 'cam cần chuyển',
            concreteScenario: 'Chia đôi phần hơn giữa Giỏ A và Giỏ B để san bằng.',
            interactiveRule: 'Số cần chuyển = (Giỏ nhiều − Giỏ ít) ÷ 2',
            groups: [
              { id: 'ga', label: 'Giỏ A', icon: '🍊', count: 1, unitValue: 28, color: '#F59E0B' },
              { id: 'gb', label: 'Giỏ B', icon: '🧺', count: 1, unitValue: 16, color: '#38BDF8' },
            ],
            unitLabel: 'kg',
            unitReferenceValue: 4,
            bars: [
              makeBarSpec({ id: 'a', label: 'Giỏ A', units: 7, unitValue: 4, displayValue: '28 kg', color: '#F59E0B' }),
              makeBarSpec({ id: 'b', label: 'Giỏ B', units: 4, unitValue: 4, displayValue: '16 kg', color: '#38BDF8' }),
            ],
            differenceBracket: {
              longerBarId: 'a',
              shorterBarId: 'b',
              numericValue: 12,
              displayLabel: 'Phần hơn (chia đôi để chuyển)',
              isUnknown: true,
            },
            guidedLatexSteps: [
              '\\text{Giỏ A hơn Giỏ B} = 28 \\;?\\; 16 = ?\\text{ (kg)}',
              '\\text{Số cam cần chuyển} = ? \\;?\\; 2 = ?\\text{ (kg)}',
            ],
            fullLatexSteps: [
              '\\text{Giỏ A hơn Giỏ B} = 28 - 16 = 12\\text{ (kg)}',
              '\\text{Số cam cần chuyển} = 12 \\div 2 = 6\\text{ (kg)}',
            ],
            finalAnswerLatex: '6\\text{ kg}',
            finalNumericValue: 6,
          }),
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'dec-w3-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [15, 16],
        prompt:
          '[Nghị luận 1] Khi đổi 2 kg 50 g sang gam, bạn Hùng viết: 2 kg 50 g = 250 g. Theo em, bạn Hùng viết đúng hay sai và phải sửa lại như thế nào?',
        options: [
          'Sai, vì 1 kg = 1 000 g nên 2 kg = 2 000 g; cộng thêm 50 g phải bằng 2050 g (thiếu chữ số 0 ở hàng trăm).',
          'Đúng, vì ghép số 2 với số 50 ta được 250 g.',
          'Sai, vì 2 kg 50 g phải bằng 2500 g.',
          'Sai, vì 2 kg 50 g phải bằng 2005 g.',
        ],
        correctAnswer:
          'Sai, vì 1 kg = 1 000 g nên 2 kg = 2 000 g; cộng thêm 50 g phải bằng 2050 g (thiếu chữ số 0 ở hàng trăm).',
        reasoningPrompt:
          'Em hãy chỉ ra lỗi sai của bạn Hùng và viết phép đổi đúng từ 2 kg 50 g sang gam:',
        reasoningPlaceholder:
          'Nêu quy tắc đổi từ kg sang gam, chỉ ra chữ số bị thiếu ở hàng trăm và viết phép đổi đúng...',
        reasoningKeywords: ['2050', '1000', '2000', 'hàng trăm', '0'],
        reasoningSampleAnswer:
          'Bạn Hùng sai vì quên 1 kg = 1 000 g. Ta đổi 2 kg = 2 000 g, rồi cộng 50 g được 2 050 g (chữ số 0 ở hàng trăm).',
        explanation:
          'Vì 1 kg = 1000 g nên phần gam phải chiếm 3 chữ số (hàng trăm, chục, đơn vị). Số 50 g viết đủ 3 chữ số là 050 g → 2050 g.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Tránh bẫy thiếu chữ số 0 khi đổi 2 kg 50 g',
          primaryReading: '2 kg 50 g',
          secondaryReading: '= ? g',
          conversionRule: '1 kg = 1 000 g (3 chữ số phần gam)',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'unit_convert',
            operands: [2000, 50],
            concreteTitle: 'quy đổi 2 kg 50 g',
            concreteScenario: 'Áp dụng quy tắc 1 kg = 1 000 g rồi cộng phần gam lẻ, không ghép chữ số trực tiếp.',
            groups: [
              { id: 'kg', label: '2 kg', icon: '⚖️', count: 2, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '2 kg' },
              { id: 'g', label: '50 g', icon: '🍬', count: 1, unitValue: 50, color: '#F59E0B' },
            ],
            unitLabel: 'g',
            primaryReading: '2 kg 50 g',
            secondaryReading: '= ? g',
            conversionRule: '1 kg = 1 000 g (3 chữ số phần gam)',
            visualParams: {
              mode: 'convert',
              givenA: 2,
              givenB: 50,
              unitA: 'kg',
              unitB: 'g',
            },
            guidedLatexSteps: [
              '2\\text{ kg} = 2 \\;?\\; 1000 = ?\\text{ (g)}',
              '2\\text{ kg } 50\\text{ g} = (\\text{g từ kg}) \\;?\\; 50 = ?\\text{ (g)}',
            ],
            fullLatexSteps: [
              '2\\text{ kg} = 2000\\text{ g}',
              '2\\text{ kg } 50\\text{ g} = 2000 + 50 = 2050\\text{ (g)}',
            ],
            finalAnswerLatex: '2050\\text{ g}',
            finalNumericValue: 2050,
          }),
        },
      },
      {
        id: 'dec-w3-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [19, 20],
        prompt:
          '[Nghị luận 2] Cả giỏ và cam nặng 12 kg. Sau khi lấy ra một nửa số cam, cả giỏ và cam còn lại nặng 7 kg. Bạn Mai lấy 12 : 2 = 6 kg làm nửa số cam. Vì sao cách làm đó sai và vỏ giỏ nặng mấy kg?',
        options: [
          'Sai, vì 12 kg gồm cả vỏ giỏ; phần giảm đi 12 - 7 = 5 kg mới là nửa số cam, nên cả cam nặng 10 kg và vỏ giỏ nặng 2 kg.',
          'Đúng, vì lấy ra một nửa nên cứ chia đôi 12 kg là được 6 kg.',
          'Sai, vì vỏ giỏ nặng 12 - 7 = 5 kg.',
          'Sai, vì cả cam nặng 7 × 2 = 14 kg.',
        ],
        correctAnswer:
          'Sai, vì 12 kg gồm cả vỏ giỏ; phần giảm đi 12 - 7 = 5 kg mới là nửa số cam, nên cả cam nặng 10 kg và vỏ giỏ nặng 2 kg.',
        reasoningPrompt:
          'Em hãy giải thích vì sao không được lấy 12 : 2 và tính cân nặng vỏ giỏ:',
        reasoningPlaceholder:
          'Giải thích vì sao 12 kg gồm cả vỏ giỏ nên không chia đôi được, sau đó tính nửa số cam, cả số cam và vỏ giỏ...',
        reasoningKeywords: ['vỏ', '5', '10', '2', '12 - 7'],
        reasoningSampleAnswer:
          'Vì 12 kg gồm cả vỏ giỏ và cam, còn ta chỉ lấy bớt một nửa số cam (vỏ giỏ giữ nguyên). Vậy nửa số cam nặng 12 - 7 = 5 kg, cả cam nặng 10 kg, vỏ giỏ nặng 12 - 10 = 2 kg.',
        explanation:
          'Khi lấy đi nửa số cam thì cân nặng chỉ giảm đúng bằng nửa số cam (12 - 7 = 5 kg). Từ đó cả cam = 10 kg và vỏ giỏ = 2 kg.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Lập luận Cả giỏ đầy (12 kg) và Còn nửa cam (7 kg)',
          primaryReading: 'Giỏ đầy: 12 kg',
          secondaryReading: 'Còn nửa cam: 7 kg',
          conversionRule: 'Hiệu hai lần cân = Một nửa số cam',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'tare_weight',
            operands: [12, 7],
            concreteTitle: 'vỏ giỏ cam',
            concreteScenario: 'Lần đầu: Vỏ + cả cam = 12 kg. Lần sau: Vỏ + nửa cam = 7 kg.',
            groups: [
              { id: 'f', label: 'Cả giỏ và cam', icon: '🍊', count: 1, unitValue: 12, color: '#F59E0B' },
              { id: 'h', label: 'Giỏ và nửa cam', icon: '🧺', count: 1, unitValue: 7, color: '#38BDF8' },
              { id: 'v', label: 'Vỏ giỏ', icon: '📦', count: 1, unitValue: 2, isUnknown: true, color: '#94A3B8' },
            ],
            unitLabel: 'kg',
            primaryReading: 'Giỏ đầy: 12 kg',
            secondaryReading: 'Còn nửa cam: 7 kg',
            conversionRule: 'Hiệu hai lần cân = Một nửa số cam',
            visualParams: {
              mode: 'tare_half',
              givenA: 12,
              givenB: 7,
              unitA: 'kg',
              labelA: 'Giỏ đầy',
              labelB: 'Còn nửa cam',
            },
            guidedLatexSteps: [
              '\\text{Nửa số cam} = 12 \\;?\\; 7 = ?\\text{ (kg)}',
              '\\text{Vỏ giỏ} = 12 \\;?\\; (? \\;?\\; 2) = ?\\text{ (kg)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa số cam} = 12 - 7 = 5\\text{ (kg)}',
              '\\text{Vỏ giỏ} = 12 - 5 \\times 2 = 2\\text{ (kg)}',
            ],
            finalAnswerLatex: '2\\text{ kg}',
            finalNumericValue: 2,
          }),
        },
      },
      {
        id: 'dec-w3-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [18, 19],
        prompt:
          '[Nghị luận 3] Trên cân thăng bằng, đĩa trái có 1 túi đường và quả cân 200 g, đĩa phải có quả cân 1 kg. Vì sao để tìm cân nặng túi đường ta lấy 1000 - 200 = 800 g chứ không cộng thêm 200 g?',
        options: [
          'Vì cân thăng bằng nên đĩa trái cũng bằng 1000 g; túi đường cộng thêm 200 g mới bằng 1000 g nên túi đường phải nhỏ hơn 1000 g, bằng 1000 - 200 = 800 g.',
          'Vì trên cân luôn phải lấy số lớn trừ số bé.',
          'Vì quả cân 200 g đặt ở đĩa phải.',
          'Vì 1 kg bằng 100 g nên trừ không được.',
        ],
        correctAnswer:
          'Vì cân thăng bằng nên đĩa trái cũng bằng 1000 g; túi đường cộng thêm 200 g mới bằng 1000 g nên túi đường phải nhỏ hơn 1000 g, bằng 1000 - 200 = 800 g.',
        reasoningPrompt:
          'Em hãy giải thích nguyên lý giữ cân thăng bằng khi nhấc bớt quả cân 200 g và tính cân nặng túi đường:',
        reasoningPlaceholder:
          'Đổi 1 kg sang gam, nêu nguyên lý nhấc bớt cùng một lượng quả cân ở hai đĩa để tìm khối lượng túi đường...',
        reasoningKeywords: ['800', '1000', 'thăng bằng', '200', 'trừ'],
        reasoningSampleAnswer:
          'Đổi 1 kg = 1000 g. Vì cân thăng bằng nên (Túi đường + 200 g) = 1000 g. Muốn tìm túi đường ta nhấc bớt 200 g ở hai đĩa: 1000 - 200 = 800 (g).',
        explanation:
          'Tìm số hạng chưa biết trong phép cộng: Túi đường + 200 g = 1000 g → Túi đường = 1000 - 200 = 800 g.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Nguyên lý cân thăng bằng: Túi đường + 200 g = 1 kg',
          primaryReading: 'Đĩa trái: Túi đường + 200 g',
          secondaryReading: 'Đĩa phải: 1 kg',
          conversionRule: '1 kg = 1 000 g · Bớt cùng 200 g ở cả hai đĩa',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'balance_eq',
            operands: [1000, 200],
            concreteTitle: 'túi đường trên cân',
            concreteScenario: 'Đĩa trái có Túi đường và quả cân 200 g, cân bằng với 1 kg.',
            groups: [
              { id: 'r', label: 'Đĩa phải (1 kg)', icon: '⚖️', count: 1, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '1 kg' },
              { id: 'w', label: 'Quả cân bên trái', icon: '🪨', count: 1, unitValue: 200, color: '#94A3B8' },
              { id: 's', label: 'Túi đường', icon: '🍚', count: 1, unitValue: 800, isUnknown: true, color: '#10B981' },
            ],
            unitLabel: 'g',
            primaryReading: 'Đĩa trái: Túi đường + 200 g',
            secondaryReading: 'Đĩa phải: 1 kg',
            conversionRule: '1 kg = 1 000 g · Bớt cùng 200 g ở cả hai đĩa',
            visualParams: {
              mode: 'balance_eq',
              givenA: 1000,
              givenB: 200,
              unitA: 'g',
              labelA: 'Túi đường + 200 g',
              labelB: '1 kg',
            },
            guidedLatexSteps: ['\\text{Túi đường} = 1000 \\;?\\; 200 = ?\\text{ (g)}'],
            fullLatexSteps: ['\\text{Túi đường} = 1000 - 200 = 800\\text{ (g)}'],
            finalAnswerLatex: '800\\text{ g}',
            finalNumericValue: 800,
          }),
        },
      },
      {
        id: 'dec-w3-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [20, 21],
        prompt:
          '[Nghị luận 4] Khay 1 nặng 24 kg, Khay 2 nặng 14 kg (Khay 1 nặng hơn Khay 2 là 10 kg). Vì sao để hai khay nặng bằng nhau ta chỉ chuyển 5 kg sang Khay 2 chứ không chuyển cả 10 kg?',
        options: [
          'Vì khi chuyển 5 kg thì Khay 1 giảm 5 kg (còn 19 kg) đồng thời Khay 2 tăng 5 kg (lên 19 kg); nếu chuyển cả 10 kg thì Khay 2 lại nặng hơn Khay 1 là 10 kg.',
          'Vì 5 kg là số dễ tính hơn 10 kg.',
          'Vì Khay 2 không chứa đủ 10 kg.',
          'Vì chuyển 10 kg thì hai khay cùng bằng 24 kg.',
        ],
        correctAnswer:
          'Vì khi chuyển 5 kg thì Khay 1 giảm 5 kg (còn 19 kg) đồng thời Khay 2 tăng 5 kg (lên 19 kg); nếu chuyển cả 10 kg thì Khay 2 lại nặng hơn Khay 1 là 10 kg.',
        reasoningPrompt:
          'Em hãy giải thích quy tắc "chuyển một nửa hiệu" cho hai khay 24 kg và 14 kg:',
        reasoningPlaceholder:
          'Giải thích khi chuyển hàng từ khay nặng sang khay nhẹ thì mỗi khay tăng/giảm thế nào, rồi nêu lượng cần chuyển...',
        reasoningKeywords: ['5', '19', 'một nửa', '10 : 2', 'giảm'],
        reasoningSampleAnswer:
          'Hiệu giữa 2 khay là 24 - 14 = 10 (kg). Mỗi khi chuyển 1 kg từ khay nặng sang khay nhẹ, khoảng cách giảm đi 2 kg. Vậy chỉ cần chuyển 10 : 2 = 5 (kg) để cả hai khay cùng nặng 19 kg.',
        explanation:
          'Chuyển từ bên nhiều sang bên ít làm bên nhiều giảm đi và bên ít tăng lên cùng một lượng, nên hiệu thu hẹp gấp đôi số lượng chuyển.',
        visualModel: {
          type: 'bar_model',
          title: 'Quy tắc San bằng: Hiệu 10 kg → Chuyển một nửa',
          cpaSpec: buildBarWeeklyCPA({
            family: 'comparison',
            concreteTitle: 'khối lượng cần chuyển',
            concreteScenario: 'Khay 1 (24 kg) hơn Khay 2 (14 kg) đúng 10 kg.',
            interactiveRule: 'Số cần chuyển = Hiệu ÷ 2',
            groups: [
              { id: 'k1', label: 'Khay 1', icon: '📦', count: 1, unitValue: 24, color: '#38BDF8' },
              { id: 'k2', label: 'Khay 2', icon: '📦', count: 1, unitValue: 14, color: '#10B981' },
            ],
            unitLabel: 'kg',
            unitReferenceValue: 2,
            bars: [
              makeBarSpec({ id: 'b1', label: 'Khay 1', units: 12, unitValue: 2, displayValue: '24 kg', color: '#38BDF8' }),
              makeBarSpec({ id: 'b2', label: 'Khay 2', units: 7, unitValue: 2, displayValue: '14 kg', color: '#10B981' }),
            ],
            differenceBracket: {
              longerBarId: 'b1',
              shorterBarId: 'b2',
              numericValue: 10,
              displayLabel: 'Hiệu = 10 kg (chia đôi)',
            },
            guidedLatexSteps: ['\\text{Số kg cần chuyển} = 10 \\;?\\; 2 = ?\\text{ (kg)}'],
            fullLatexSteps: ['\\text{Số kg cần chuyển} = 10 \\div 2 = 5\\text{ (kg)}'],
            finalAnswerLatex: '5\\text{ kg}',
            finalNumericValue: 5,
          }),
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 4 (SAU NGÀY 28): ĐO LƯỜNG THỂ TÍCH (L – mL) & BÀI TOÁN SAN BÌNH
  // ==========================================================================
  {
    id: 'dec-weekly-test-w4',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 4,
    weekTitle: 'Tuần 4 · Thể Tích L – mL',
    triggerAfterDayNumber: 28,
    unlocksWeekNumber: 5,
    unlocksDayNumber: 29,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 4: Đo Lường Thể Tích (L – mL) & Bài Toán San Bình',
    subtitle: '6 câu Tính toán (60đ) + 4 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dec-w4-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [22, 23],
        prompt:
          '[Tính toán 1] Một bình lọc chứa 4 L 250 mL nước tinh khiết. Hỏi trong bình có bao nhiêu mi-li-lít nước?',
        options: ['4250 mL', '425 mL', '4025 mL', '4520 mL'],
        correctAnswer: '4250 mL',
        explanation:
          'Đổi 4 L = 4000 mL. Vậy 4 L 250 mL = 4000 + 250 = 4250 (mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Quy đổi 4 L 250 mL sang mi-li-lít',
          primaryReading: '4 L 250 mL',
          secondaryReading: '= ? mL',
          conversionRule: '1 L = 1 000 mL',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_convert',
            operands: [4000, 250],
            concreteTitle: 'nước tinh khiết',
            concreteScenario: 'Mỗi lít nước tương ứng 1 000 mL.',
            groups: [
              { id: 'l', label: '4 L đổi sang mL', icon: '💧', count: 4, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '4 L' },
              { id: 'ml', label: 'Phần mL lẻ', icon: '🧪', count: 1, unitValue: 250, color: '#10B981' },
            ],
            unitLabel: 'mL',
            primaryReading: '4 L 250 mL',
            secondaryReading: '= ? mL',
            conversionRule: '1 L = 1 000 mL',
            visualParams: {
              mode: 'convert',
              givenA: 4,
              givenB: 250,
              unitA: 'L',
              unitB: 'mL',
            },
            guidedLatexSteps: [
              '4\\text{ L} = 4 \\;?\\; 1000 = ?\\text{ (mL)}',
              '4\\text{ L } 250\\text{ mL} = (\\text{mL từ L}) \\;?\\; 250 = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '4\\text{ L} = 4000\\text{ mL}',
              '4\\text{ L } 250\\text{ mL} = 4000 + 250 = 4250\\text{ (mL)}',
            ],
            finalAnswerLatex: '4250\\text{ mL}',
            finalNumericValue: 4250,
          }),
        },
      },
      {
        id: 'dec-w4-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [23, 24],
        prompt:
          '[Tính toán 2] Một bình lớn có 2 L nước ép táo. Bạn Lan rót ra 650 mL mời cả nhà. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước ép?',
        options: ['1350 mL', '1450 mL', '1250 mL', '1650 mL'],
        correctAnswer: '1350 mL',
        explanation:
          'Đổi 2 L = 2000 mL. Lượng nước ép còn lại là: 2000 - 650 = 1350 (mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Bình 2 L nước ép, rót ra 650 mL',
          primaryReading: 'Ban đầu: 2 L',
          secondaryReading: 'Rót ra: 650 mL',
          conversionRule: '1 L = 1 000 mL · Đổi sang mL rồi trừ',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_subtract',
            operands: [2000, 650],
            concreteTitle: 'nước ép còn lại',
            concreteScenario: 'Đưa cả hai lượng nước về mL để tính phần còn lại.',
            groups: [
              { id: 'init', label: 'Ban đầu (2 L)', icon: '🧃', count: 2, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '2 L' },
              { id: 'pour', label: 'Đã rót ra', icon: '🥤', count: 1, unitValue: 650, color: '#F59E0B' },
            ],
            unitLabel: 'mL',
            primaryReading: 'Ban đầu: 2 L',
            secondaryReading: 'Rót ra: 650 mL',
            conversionRule: '1 L = 1 000 mL · Đổi sang mL rồi trừ',
            visualParams: {
              mode: 'subtract',
              givenA: 2000,
              givenB: 650,
              unitA: 'mL',
              labelA: 'Bình: 2 L',
              labelB: 'Rót ra: 650 mL',
            },
            guidedLatexSteps: [
              '\\text{Đổi } 2\\text{ L} = 2 \\;?\\; 1000 = ?\\text{ (mL)}',
              '\\text{Nước ép còn lại} = (\\text{Ban đầu}) \\;?\\; 650 = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '2\\text{ L} = 2000\\text{ mL}',
              '2000 - 650 = 1350\\text{ (mL)}',
            ],
            finalAnswerLatex: '1350\\text{ mL}',
            finalNumericValue: 1350,
          }),
        },
      },
      {
        id: 'dec-w4-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [24, 25],
        prompt:
          '[Tính toán 3] Có 1 L 800 mL sữa tươi rót đều vào 6 chai bằng nhau. Hỏi mỗi chai chứa bao nhiêu mi-li-lít sữa tươi?',
        options: ['300 mL', '250 mL', '350 mL', '200 mL'],
        correctAnswer: '300 mL',
        explanation:
          'Đổi 1 L 800 mL = 1800 mL. Lượng sữa trong mỗi chai là: 1800 : 6 = 300 (mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Rót đều 1 L 800 mL sữa vào 6 chai',
          primaryReading: 'Tổng: 1 L 800 mL',
          secondaryReading: 'Chia đều: 6 chai',
          conversionRule: '1 L = 1 000 mL · Đổi sang mL rồi chia 6',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_divide',
            operands: [1800, 6],
            concreteTitle: 'sữa trong mỗi chai',
            concreteScenario: 'Đổi 1 L 800 mL sang mL rồi chia đều vào 6 chai giống hệt nhau.',
            groups: [
              { id: 'c', label: '6 chai sữa đều nhau', icon: '🍼', count: 6, unitValue: 300, isUnknown: true, color: '#38BDF8', displayMode: 'groups' },
            ],
            unitLabel: 'mL',
            primaryReading: 'Tổng: 1 L 800 mL',
            secondaryReading: 'Chia đều: 6 chai',
            conversionRule: '1 L = 1 000 mL · Đổi sang mL rồi chia 6',
            visualParams: {
              mode: 'divide_equal',
              givenA: 1800,
              givenCount: 6,
              unitA: 'mL',
              labelA: 'Tổng: 1 L 800 mL',
            },
            guidedLatexSteps: [
              '\\text{Đổi } 1\\text{ L } 800\\text{ mL} = 1000 \\;?\\; 800 = ?\\text{ (mL)}',
              '\\text{Mỗi chai có} = (\\text{Tổng mL}) \\;?\\; 6 = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '1\\text{ L } 800\\text{ mL} = 1800\\text{ mL}',
              '1800 \\div 6 = 300\\text{ (mL)}',
            ],
            finalAnswerLatex: '300\\text{ mL}',
            finalNumericValue: 300,
          }),
        },
      },
      {
        id: 'dec-w4-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [24, 25],
        prompt:
          '[Tính toán 4] Mỗi cốc đựng được 250 mL nước cam. Hỏi để rót đầy 5 cốc như thế cần tất cả bao nhiêu mi-li-lít nước cam?',
        options: ['1250 mL', '1000 mL', '1200 mL', '1500 mL'],
        correctAnswer: '1250 mL',
        explanation:
          'Lượng nước cam cần dùng là: 250 × 5 = 1250 (mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: '5 cốc nước cam, mỗi cốc 250 mL',
          primaryReading: 'Mỗi cốc: 250 mL',
          secondaryReading: 'Rót đầy 5 cốc',
          conversionRule: 'Tổng lượng nước = 1 cốc × Số cốc',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_add',
            operands: [250, 250, 250, 250, 250],
            concreteTitle: 'nước cam rót vào 5 cốc',
            concreteScenario: 'Gộp 5 cốc nước cam giống nhau, mỗi cốc 250 mL.',
            groups: [
              { id: 'cup', label: '5 cốc nước cam', icon: '🍊', count: 5, unitValue: 250, isUnknown: true, showUnitValueBeforeSolve: true, color: '#F59E0B', displayMode: 'groups' },
            ],
            unitLabel: 'mL',
            primaryReading: 'Mỗi cốc: 250 mL',
            secondaryReading: 'Rót đầy 5 cốc',
            conversionRule: 'Tổng lượng nước = 1 cốc × Số cốc',
            visualParams: {
              mode: 'sum',
              givenA: 250,
              givenCount: 5,
              unitA: 'mL',
              labelA: 'Mỗi cốc: 250 mL',
              labelB: 'Rót đầy 5 cốc',
            },
            guidedLatexSteps: ['\\text{Tổng nước cam} = 250 \\;?\\; 5 = ?\\text{ (mL)}'],
            fullLatexSteps: ['250 \\times 5 = 1250\\text{ (mL)}'],
            finalAnswerLatex: '1250\\text{ mL}',
            finalNumericValue: 1250,
          }),
        },
      },
      {
        id: 'dec-w4-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26, 27],
        prompt:
          '[Tính toán 5] Một chai mật ong đầy cân nặng 950 g. Sau khi dùng hết một nửa lượng mật ong, cả chai và mật ong còn lại nặng 550 g. Hỏi vỏ chai rỗng nặng bao nhiêu gam?',
        options: ['150 g', '400 g', '200 g', '100 g'],
        correctAnswer: '150 g',
        explanation:
          'Một nửa lượng mật ong nặng: 950 - 550 = 400 (g). Cả lượng mật ong nặng: 400 × 2 = 800 (g). Vỏ chai rỗng nặng: 950 - 800 = 150 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Chai mật ong đầy (950 g) & Còn một nửa (550 g)',
          primaryReading: 'Chai đầy: 950 g',
          secondaryReading: 'Còn nửa mật: 550 g',
          conversionRule: 'Hiệu giữa hai lần cân = Một nửa lượng mật ong',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'tare_weight',
            operands: [950, 550],
            concreteTitle: 'vỏ chai mật ong rỗng',
            concreteScenario: 'Chai đầy 950 g, dùng hết nửa mật còn 550 g.',
            groups: [
              { id: 'f', label: 'Chai đầy', icon: '🍯', count: 1, unitValue: 950, color: '#F59E0B' },
              { id: 'h', label: 'Chai còn nửa mật', icon: '🫙', count: 1, unitValue: 550, color: '#38BDF8' },
              { id: 'v', label: 'Vỏ chai rỗng', icon: '🍾', count: 1, unitValue: 150, isUnknown: true, color: '#94A3B8' },
            ],
            unitLabel: 'g',
            primaryReading: 'Chai đầy: 950 g',
            secondaryReading: 'Còn nửa mật: 550 g',
            conversionRule: 'Hiệu giữa hai lần cân = Một nửa lượng mật ong',
            visualParams: {
              mode: 'tare_half',
              givenA: 950,
              givenB: 550,
              unitA: 'g',
              labelA: 'Chai đầy',
              labelB: 'Còn nửa mật',
            },
            guidedLatexSteps: [
              '\\text{Một nửa lượng mật} = 950 \\;?\\; 550 = ?\\text{ (g)}',
              '\\text{Cả lượng mật} = ? \\;?\\; 2 = ?\\text{ (g)}',
              '\\text{Vỏ chai rỗng} = 950 \\;?\\; ? = ?\\text{ (g)}',
            ],
            fullLatexSteps: [
              '\\text{Một nửa lượng mật} = 950 - 550 = 400\\text{ (g)}',
              '\\text{Cả lượng mật} = 400 \\times 2 = 800\\text{ (g)}',
              '\\text{Vỏ chai rỗng} = 950 - 800 = 150\\text{ (g)}',
            ],
            finalAnswerLatex: '150\\text{ g}',
            finalNumericValue: 150,
          }),
        },
      },
      {
        id: 'dec-w4-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26, 28],
        prompt:
          '[Tính toán 6] Can 1 có 34 L nước, Can 2 có 18 L nước. Hỏi phải rót từ Can 1 sang Can 2 bao nhiêu lít nước để lượng nước ở hai can bằng nhau?',
        options: ['8 L', '16 L', '6 L', '10 L'],
        correctAnswer: '8 L',
        explanation:
          'Can 1 nhiều hơn Can 2 là: 34 - 18 = 16 (L). Số nước cần rót sang để hai can bằng nhau là: 16 : 2 = 8 (L).',
        visualModel: {
          type: 'bar_model',
          title: 'San bằng 2 can nước: Can 1 (34 L) & Can 2 (18 L)',
          cpaSpec: buildBarWeeklyCPA({
            family: 'comparison',
            concreteTitle: 'nước cần rót sang',
            concreteScenario: 'Rót một nửa phần chênh lệch từ Can 1 sang Can 2.',
            interactiveRule: 'Lượng nước rót sang = (Can 1 − Can 2) ÷ 2',
            groups: [
              { id: 'c1', label: 'Can 1', icon: '🪣', count: 1, unitValue: 34, color: '#38BDF8' },
              { id: 'c2', label: 'Can 2', icon: '🪣', count: 1, unitValue: 18, color: '#10B981' },
            ],
            unitLabel: 'L',
            unitReferenceValue: 2,
            bars: [
              makeBarSpec({ id: 'b1', label: 'Can 1', units: 17, unitValue: 2, displayValue: '34 L', color: '#38BDF8' }),
              makeBarSpec({ id: 'b2', label: 'Can 2', units: 9, unitValue: 2, displayValue: '18 L', color: '#10B981' }),
            ],
            differenceBracket: {
              longerBarId: 'b1',
              shorterBarId: 'b2',
              numericValue: 16,
              displayLabel: 'Phần hơn (chia đôi để rót)',
              isUnknown: true,
            },
            guidedLatexSteps: [
              '\\text{Can 1 hơn Can 2} = 34 \\;?\\; 18 = ?\\text{ (L)}',
              '\\text{Cần rót sang} = ? \\;?\\; 2 = ?\\text{ (L)}',
            ],
            fullLatexSteps: [
              '\\text{Can 1 hơn Can 2} = 34 - 18 = 16\\text{ (L)}',
              '\\text{Cần rót sang} = 16 \\div 2 = 8\\text{ (L)}',
            ],
            finalAnswerLatex: '8\\text{ L}',
            finalNumericValue: 8,
          }),
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'dec-w4-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [22, 23],
        prompt:
          '[Nghị luận 1] Bạn Khoa đổi 3 L 80 mL thành 380 mL. Theo em bạn Khoa đổi đúng hay sai và phải giải thích sửa lại như thế nào?',
        options: [
          'Sai, vì 1 L = 1 000 mL nên 3 L = 3 000 mL; cộng thêm 80 mL phải bằng 3080 mL.',
          'Đúng, vì ghép số 3 với 80 sẽ ra 380 mL.',
          'Sai, vì 3 L 80 mL phải bằng 3800 mL.',
          'Sai, vì 3 L 80 mL phải bằng 3008 mL.',
        ],
        correctAnswer:
          'Sai, vì 1 L = 1 000 mL nên 3 L = 3 000 mL; cộng thêm 80 mL phải bằng 3080 mL.',
        reasoningPrompt:
          'Em hãy chỉ rõ lỗi sai của bạn Khoa và trình bày cách đổi đúng 3 L 80 mL sang mL:',
        reasoningPlaceholder:
          'Nêu quy tắc đổi từ L sang mL, chỉ ra chữ số bị thiếu ở hàng trăm và viết phép đổi đúng...',
        reasoningKeywords: ['3080', '1000', '3000', 'hàng trăm', '0'],
        reasoningSampleAnswer:
          'Bạn Khoa sai vì quên quy tắc 1 L = 1 000 mL. Đổi đúng: 3 L = 3 000 mL, cộng thêm 80 mL bằng 3 080 mL.',
        explanation:
          'Phần mi-li-lít có 3 chữ số (hàng trăm, chục, đơn vị). Vì 80 mL có 0 trăm nên 3 L 80 mL = 3080 mL.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Tránh sai sót hàng trăm khi đổi 3 L 80 mL',
          primaryReading: '3 L 80 mL',
          secondaryReading: '= ? mL',
          conversionRule: '1 L = 1 000 mL (3 chữ số phần mL)',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_convert',
            operands: [3000, 80],
            concreteTitle: 'quy đổi 3 L 80 mL',
            concreteScenario: 'Luôn chuyển phần Lít thành nghìn mL trước khi cộng.',
            groups: [
              { id: 'l', label: '3 L', icon: '💧', count: 3, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '3 L' },
              { id: 'ml', label: '80 mL', icon: '🧪', count: 1, unitValue: 80, color: '#10B981' },
            ],
            unitLabel: 'mL',
            primaryReading: '3 L 80 mL',
            secondaryReading: '= ? mL',
            conversionRule: '1 L = 1 000 mL (3 chữ số phần mL)',
            visualParams: {
              mode: 'convert',
              givenA: 3,
              givenB: 80,
              unitA: 'L',
              unitB: 'mL',
            },
            guidedLatexSteps: [
              '3\\text{ L} = 3 \\;?\\; 1000 = ?\\text{ (mL)}',
              '3\\text{ L } 80\\text{ mL} = (\\text{mL từ L}) \\;?\\; 80 = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '3\\text{ L} = 3000\\text{ mL}',
              '3\\text{ L } 80\\text{ mL} = 3000 + 80 = 3080\\text{ (mL)}',
            ],
            finalAnswerLatex: '3080\\text{ mL}',
            finalNumericValue: 3080,
          }),
        },
      },
      {
        id: 'dec-w4-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [24, 25],
        prompt:
          '[Nghị luận 2] Có 1 L 500 mL nước siro muốn rót đều vào các cốc, mỗi cốc chứa 300 mL. Em hãy nêu 2 bước lập luận để tìm xem rót được bao nhiêu cốc.',
        options: [
          'Bước 1 đổi 1 L 500 mL = 1 500 mL để cùng đơn vị với cốc; Bước 2 lấy 1 500 : 300 = 5 cốc.',
          'Bước 1 lấy 500 : 300; Bước 2 cộng thêm 1 L.',
          'Bước 1 lấy 150 : 300; Bước 2 nhân 2.',
          'Bước 1 đổi 1 L 500 mL = 150 mL; Bước 2 chia cho 30.',
        ],
        correctAnswer:
          'Bước 1 đổi 1 L 500 mL = 1 500 mL để cùng đơn vị với cốc; Bước 2 lấy 1 500 : 300 = 5 cốc.',
        reasoningPrompt:
          'Em hãy viết ngắn gọn 2 bước đổi đơn vị và chia tìm số cốc nước siro:',
        reasoningPlaceholder:
          'Bước 1: Đổi hỗn hợp L và mL về cùng đơn vị mL. Bước 2: Viết phép chia tìm số cốc rót được...',
        reasoningKeywords: ['1500', '5', '300', 'đổi', 'cốc'],
        reasoningSampleAnswer:
          'Bước 1: Đổi 1 L 500 mL = 1 500 mL. Bước 2: Số cốc rót được là 1 500 : 300 = 5 (cốc).',
        explanation:
          'Muốn chia hai lượng thể tích phải đổi chúng về cùng đơn vị mL: 1 500 mL : 300 mL = 5 cốc.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Đổi 1 L 500 mL rồi chia vào các cốc 300 mL',
          primaryReading: 'Tổng: 1 L 500 mL',
          secondaryReading: 'Mỗi cốc: 300 mL',
          conversionRule: '1 L = 1 000 mL · Đổi sang mL rồi chia 300',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_divide',
            operands: [1500, 300],
            concreteTitle: 'cốc nước siro',
            concreteScenario: 'Đổi 1 L 500 mL về đơn vị mL rồi chia cho 300 mL mỗi cốc.',
            groups: [
              { id: 'c', label: 'Số cốc 300 mL', icon: '🥤', count: 5, unitValue: 300, isUnknown: true, hideCountBeforeSolve: true, showUnitValueBeforeSolve: true, color: '#F59E0B', displayMode: 'groups' },
            ],
            unitLabel: 'cốc',
            primaryReading: 'Tổng: 1 L 500 mL',
            secondaryReading: 'Mỗi cốc: 300 mL',
            conversionRule: '1 L = 1 000 mL · Đổi sang mL rồi chia 300',
            visualParams: {
              mode: 'divide_equal',
              givenA: 1500,
              givenB: 300,
              unitA: 'mL',
              labelA: 'Tổng: 1 L 500 mL',
            },
            guidedLatexSteps: [
              '\\text{Đổi } 1\\text{ L } 500\\text{ mL} = 1000 \\;?\\; 500 = ?\\text{ (mL)}',
              '\\text{Số cốc} = (\\text{Tổng mL}) \\;?\\; 300 = ?\\text{ (cốc)}',
            ],
            fullLatexSteps: [
              '1\\text{ L } 500\\text{ mL} = 1500\\text{ mL}',
              '1500 \\div 300 = 5\\text{ (cốc)}',
            ],
            finalAnswerLatex: '5\\text{ cốc}',
            finalNumericValue: 5,
          }),
        },
      },
      {
        id: 'dec-w4-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26, 28],
        prompt:
          '[Nghị luận 3] Bình A đang có nhiều hơn Bình B là 400 mL nước. Nếu rót 150 mL từ Bình A sang Bình B thì lúc này Bình A còn nhiều hơn Bình B bao nhiêu mi-li-lít?',
        options: [
          'Còn nhiều hơn 100 mL, vì Bình A giảm 150 mL và Bình B tăng 150 mL nên khoảng cách thu hẹp đi 150 × 2 = 300 mL (400 - 300 = 100 mL).',
          'Còn nhiều hơn 250 mL vì lấy 400 - 150 = 250 mL.',
          'Hai bình bằng nhau vì 150 mL gần bằng nửa 400 mL.',
          'Còn nhiều hơn 550 mL vì lấy 400 + 150 = 550 mL.',
        ],
        correctAnswer:
          'Còn nhiều hơn 100 mL, vì Bình A giảm 150 mL và Bình B tăng 150 mL nên khoảng cách thu hẹp đi 150 × 2 = 300 mL (400 - 300 = 100 mL).',
        reasoningPrompt:
          'Em hãy giải thích vì sao khoảng cách giữa 2 bình giảm đi gấp đôi lượng rót và tìm hiệu còn lại:',
        reasoningPlaceholder:
          'Giải thích Bình A giảm bao nhiêu và Bình B tăng bao nhiêu khi rót 150 mL, từ đó tính khoảng cách còn lại...',
        reasoningKeywords: ['100', '300', '150 × 2', 'giảm', 'tăng'],
        reasoningSampleAnswer:
          'Khi rót 150 mL từ A sang B thì Bình A giảm 150 mL còn Bình B lại tăng thêm 150 mL. Do đó hiệu hai bình giảm đi 150 × 2 = 300 mL. Lúc này A còn hơn B là: 400 - 300 = 100 (mL).',
        explanation:
          'Mỗi mL rót từ bình nhiều sang bình ít làm hiệu giữa hai bình thu hẹp đi 2 mL. Rót 150 mL làm hiệu giảm 300 mL → còn 100 mL.',
        visualModel: {
          type: 'bar_model',
          title: 'Rót 150 mL từ Bình A sang Bình B khi ban đầu hơn 400 mL',
          cpaSpec: buildBarWeeklyCPA({
            family: 'comparison',
            concreteTitle: 'hiệu lượng nước còn lại',
            concreteScenario: 'Rót 150 mL từ bình nhiều sang bình ít làm hiệu giảm gấp đôi.',
            interactiveRule: 'Hiệu còn lại = Hiệu ban đầu − (2 × Lượng rót)',
            groups: [
              { id: 'd0', label: 'Hiệu ban đầu', icon: '📏', count: 1, unitValue: 400, color: '#38BDF8' },
              { id: 'ch', label: 'Khoảng thu hẹp (2×150)', icon: '🔄', count: 2, unitValue: 150, color: '#F59E0B', beforeSolveBadge: '2 × 150 mL' },
            ],
            unitLabel: 'mL',
            unitReferenceValue: 150,
            bars: [
              makeBarSpec({ id: 'b0', label: 'Hiệu ban đầu', units: 1, unitValue: 400, displayValue: '400 mL', color: '#38BDF8' }),
              makeBarSpec({ id: 'b1', label: 'Phần hiệu bị giảm', units: 2, unitValue: 150, displayValue: '2 × 150 = ? mL', isUnknown: true, showKnownUnitValue: true, color: '#F59E0B' }),
            ],
            differenceBracket: {
              longerBarId: 'b0',
              shorterBarId: 'b1',
              numericValue: 100,
              displayLabel: 'Hiệu còn lại = ? mL',
              isUnknown: true,
            },
            guidedLatexSteps: [
              '\\text{Hiệu giảm đi} = 150 \\;?\\; 2 = ?\\text{ (mL)}',
              '\\text{Hiệu còn lại} = 400 \\;?\\; ? = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '\\text{Hiệu giảm đi} = 150 \\times 2 = 300\\text{ (mL)}',
              '\\text{Hiệu còn lại} = 400 - 300 = 100\\text{ (mL)}',
            ],
            finalAnswerLatex: '100\\text{ mL}',
            finalNumericValue: 100,
          }),
        },
      },
      {
        id: 'dec-w4-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [27, 28],
        prompt:
          '[Nghị luận 4] Một can dầu sau khi rót đi một nửa, rồi rót tiếp 5 L nữa thì trong can còn lại 7 L. Em hãy lập luận ngược từ cuối về đầu để tìm lượng dầu ban đầu trong can.',
        options: [
          'Trước khi rót 5 L can có 7 + 5 = 12 L (đây chính là một nửa can), vậy ban đầu can có 12 × 2 = 24 L.',
          'Lấy 7 × 2 = 14 L, rồi cộng 5 L thành 19 L.',
          'Lấy 7 + 5 = 12 L là lượng dầu ban đầu.',
          'Lấy (7 - 5) × 2 = 4 L.',
        ],
        correctAnswer:
          'Trước khi rót 5 L can có 7 + 5 = 12 L (đây chính là một nửa can), vậy ban đầu can có 12 × 2 = 24 L.',
        reasoningPrompt:
          'Em hãy viết 2 bước suy luận ngược (làm ngược phép tính từ cuối về đầu) để tìm lượng dầu ban đầu:',
        reasoningPlaceholder:
          'Bước 1: Đảo ngược phép rót 5 L để tìm nửa can dầu. Bước 2: Đảo ngược phép rót một nửa để tìm lượng dầu ban đầu...',
        reasoningKeywords: ['12', '24', '7 + 5', '× 2', 'một nửa'],
        reasoningSampleAnswer:
          'Làm ngược từ cuối về đầu: trước khi rót 5 L thì trong can có 7 + 5 = 12 (L). Đây là một nửa can dầu nên ban đầu can có 12 × 2 = 24 (L).',
        explanation:
          'Sơ đồ xuôi: Ban đầu (÷2) → Nửa can (−5) → 7 L. Đi ngược lại: 7 (+5) → 12 (×2) → 24 L.',
        visualModel: {
          type: 'bar_model',
          title: 'Suy luận ngược: Còn 7 L ← Rót 5 L ← Rót một nửa',
          cpaSpec: buildBarWeeklyCPA({
            family: 'part_whole',
            concreteTitle: 'dầu ban đầu trong can',
            concreteScenario: 'Một nửa can gồm 5 L vừa rót và 7 L còn lại.',
            interactiveRule: 'Đi ngược từ 7 L cuối cùng: cộng trả phần rót sau rồi gấp đôi.',
            groups: [
              { id: 'h1', label: '2 nửa can dầu', icon: '🛢️', count: 2, unitValue: 12, isUnknown: true, color: '#38BDF8' },
            ],
            unitLabel: 'L',
            unitReferenceValue: 12,
            bars: [
              makeBarSpec({ id: 'b-all', label: 'Cả can ban đầu (2 nửa)', units: 2, unitValue: 12, displayValue: '? L', color: '#38BDF8', isUnknown: true }),
            ],
            totalBracket: {
              targetBarIds: ['b-all'],
              numericValue: 24,
              displayLabel: 'Lượng dầu ban đầu = ? L',
              isUnknown: true,
            },
            guidedLatexSteps: [
              '\\text{Một nửa can} = 7 \\;?\\; 5 = ?\\text{ (L)}',
              '\\text{Lượng dầu ban đầu} = ? \\;?\\; 2 = ?\\text{ (L)}',
            ],
            fullLatexSteps: [
              '\\text{Một nửa can} = 7 + 5 = 12\\text{ (L)}',
              '\\text{Lượng dầu ban đầu} = 12 \\times 2 = 24\\text{ (L)}',
            ],
            finalAnswerLatex: '24\\text{ L}',
            finalNumericValue: 24,
          }),
        },
      },
    ],
  },

  // ==========================================================================
  // TUẦN 5 (SAU NGÀY 30): TỔNG DUYỆT TOÀN DIỆN THÁNG 12
  // ==========================================================================
  {
    id: 'dec-weekly-test-w5',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 5,
    weekTitle: 'Tuần 5 · Tổng Ôn Toàn Diện Tháng 12',
    triggerAfterDayNumber: 30,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 5: Tổng Duyệt Chu Vi – Hình Ghép – Khối Lượng – Thể Tích',
    subtitle: '6 câu Tính toán (60đ) + 4 câu Nghị luận Tư duy (40đ) · Tổng kết 4 trụ cột Tháng 12',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      {
        id: 'dec-w5-q1',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [4, 29],
        prompt:
          '[Tính toán 1] Một sân thể thao hình vuông có chu vi là 120 m. Tính độ dài mỗi cạnh sân thể thao đó.',
        options: ['30 m', '60 m', '40 m', '25 m'],
        correctAnswer: '30 m',
        explanation:
          'Độ dài một cạnh hình vuông là: 120 : 4 = 30 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Tìm cạnh hình vuông khi biết chu vi 120 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'square',
            concreteTitle: 'cạnh sân thể thao',
            concreteScenario: '4 cạnh hình vuông bằng nhau cộng lại bằng 120 m.',
            groups: [
              { id: 'c', label: '1 cạnh sân', icon: '🟩', count: 1, unitValue: 30, isUnknown: true, color: '#10B981' },
            ],
            unitLabel: 'm',
            outerWidth: 30,
            outerHeight: 30,
            sideLength: 30,
            unknownTarget: 'side',
            perimeterFormulaHint: 'Cạnh = Chu vi ÷ 4',
            guidedLatexSteps: ['\\text{Cạnh sân} = 120 \\;?\\; 4 = ?\\text{ (m)}'],
            fullLatexSteps: ['\\text{Cạnh sân} = 120 \\div 4 = 30\\text{ (m)}'],
            finalAnswerLatex: '30\\text{ m}',
            finalNumericValue: 30,
          }),
        },
      },
      {
        id: 'dec-w5-q2',
        section: 'calculation',
        points: 10,
        skillDomain: 'interval',
        relatedDayNumbers: [5, 29],
        prompt:
          '[Tính toán 2] Một sân trường hình chữ nhật có chu vi 90 m và chiều rộng 17 m. Tính chiều dài của sân trường đó.',
        options: ['28 m', '73 m', '26 m', '32 m'],
        correctAnswer: '28 m',
        explanation:
          'Nửa chu vi sân trường là: 90 : 2 = 45 (m). Chiều dài sân trường là: 45 - 17 = 28 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Tìm chiều dài hình chữ nhật: P = 90 m, rộng = 17 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'rectangle',
            concreteTitle: 'chiều dài sân trường',
            concreteScenario: 'Chu vi 90 m, biết chiều rộng 17 m.',
            groups: [
              { id: 'w', label: 'Chiều rộng', icon: '📐', count: 1, unitValue: 17, color: '#F59E0B' },
              { id: 'l', label: 'Chiều dài', icon: '❓', count: 1, unitValue: 28, isUnknown: true, color: '#38BDF8' },
            ],
            unitLabel: 'm',
            outerWidth: 28,
            outerHeight: 17,
            unknownTarget: 'length',
            perimeterFormulaHint: 'Nửa chu vi = Chu vi ÷ 2; Dài = Nửa chu vi − Rộng',
            guidedLatexSteps: [
              '\\text{Nửa chu vi} = 90 \\;?\\; 2 = ?\\text{ (m)}',
              '\\text{Chiều dài} = ? \\;?\\; 17 = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa chu vi} = 90 \\div 2 = 45\\text{ (m)}',
              '\\text{Chiều dài} = 45 - 17 = 28\\text{ (m)}',
            ],
            finalAnswerLatex: '28\\text{ m}',
            finalNumericValue: 28,
          }),
        },
      },
      {
        id: 'dec-w5-q3',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [10, 29],
        prompt:
          '[Tính toán 3] Một mảnh đất hình chữ L có khung bao bên ngoài rộng 24 cm và cao 16 cm (bản vẽ mô hình). Tính chu vi hình chữ L trên bản vẽ.',
        options: ['80 cm', '40 cm', '72 cm', '88 cm'],
        correctAnswer: '80 cm',
        explanation:
          'Dời 2 cạnh góc khuyết ra ngoài thành hình chữ nhật 24 × 16 cm. Chu vi là: (24 + 16) × 2 = 80 (cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Hình chữ L khung bao 24 cm × 16 cm',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'l_shape',
            concreteTitle: 'cạnh khung bao chữ L',
            concreteScenario: 'Đẩy góc khuyết ra khép kín hình chữ nhật 24 cm × 16 cm.',
            groups: [
              { id: 'w', label: 'Chiều ngang khung', icon: '↔️', count: 2, unitValue: 24, color: '#38BDF8', beforeSolveBadge: '2 × 24 cm' },
              { id: 'h', label: 'Chiều cao khung', icon: '↕️', count: 2, unitValue: 16, color: '#10B981', beforeSolveBadge: '2 × 16 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 24,
            outerHeight: 16,
            cutWidth: 8,
            cutHeight: 6,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ L = Chu vi HCN khung bao = (Dài + Cao) × 2',
            sideShiftNote: 'Hai cạnh góc khuyết dời thẳng ra ngoài thành khung 24 × 16 cm.',
            guidedLatexSteps: ['\\text{Chu vi hình chữ L} = (24 \\;?\\; 16) \\;?\\; 2 = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi hình chữ L} = (24 + 16) \\times 2 = 80\\text{ (cm)}'],
            finalAnswerLatex: '80\\text{ cm}',
            finalNumericValue: 80,
          }),
        },
      },
      {
        id: 'dec-w5-q4',
        section: 'calculation',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [13, 30],
        prompt:
          '[Tính toán 4] Một mô hình hình chữ U có khung bao rộng 26 m, cao 18 m và rãnh lõm ở giữa sâu 7 m. Tính chu vi của hình chữ U đó.',
        options: ['102 m', '88 m', '95 m', '104 m'],
        correctAnswer: '102 m',
        explanation:
          'Chu vi khung bao là: (26 + 18) × 2 = 88 (m). Cộng thêm 2 thành đứng của rãnh sâu 7 m: 88 + 7 × 2 = 102 (m).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Hình chữ U khung 26 m × 18 m, rãnh sâu 7 m',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'u_shape',
            concreteTitle: 'cạnh mô hình chữ U',
            concreteScenario: 'Khung chữ nhật 26 m × 18 m có rãnh lõm sâu 7 m.',
            groups: [
              { id: 'w', label: 'Rộng khung', icon: '↔️', count: 2, unitValue: 26, color: '#38BDF8', beforeSolveBadge: '2 × 26 m' },
              { id: 'h', label: 'Cao khung', icon: '↕️', count: 2, unitValue: 18, color: '#10B981', beforeSolveBadge: '2 × 18 m' },
              { id: 'd', label: '2 thành rãnh', icon: '⚡', count: 2, unitValue: 7, color: '#F59E0B', beforeSolveBadge: '2 × 7 m' },
            ],
            unitLabel: 'm',
            outerWidth: 26,
            outerHeight: 18,
            recessWidth: 8,
            recessDepth: 7,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ U = Chu vi khung ngoài + 2 × Độ sâu rãnh',
            sideShiftNote: 'Cộng đủ 2 thành đứng màu vàng cam hai bên rãnh lõm!',
            guidedLatexSteps: [
              '\\text{Chu vi khung} = (26 \\;?\\; 18) \\;?\\; 2 = ?\\text{ (m)}',
              '\\text{Chu vi chữ U} = ? \\;?\\; (7 \\;?\\; 2) = ?\\text{ (m)}',
            ],
            fullLatexSteps: [
              '\\text{Chu vi khung} = (26 + 18) \\times 2 = 88\\text{ (m)}',
              '\\text{Chu vi chữ U} = 88 + 7 \\times 2 = 102\\text{ (m)}',
            ],
            finalAnswerLatex: '102\\text{ m}',
            finalNumericValue: 102,
          }),
        },
      },
      {
        id: 'dec-w5-q5',
        section: 'calculation',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [17, 29],
        prompt:
          '[Tính toán 5] Cả hũ mứt cân nặng 1 kg 200 g. Biết riêng vỏ hũ thủy tinh nặng 250 g. Hỏi lượng mứt bên trong cân nặng bao nhiêu gam?',
        options: ['950 g', '1050 g', '1450 g', '850 g'],
        correctAnswer: '950 g',
        explanation:
          'Đổi 1 kg 200 g = 1200 g. Khối lượng riêng phần mứt là: 1200 - 250 = 950 (g).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Đổi 1 kg 200 g và trừ vỏ hũ 250 g',
          primaryReading: 'Cả hũ: 1 kg 200 g',
          secondaryReading: 'Vỏ hũ: 250 g',
          conversionRule: '1 kg = 1 000 g · Ruột = Cả hũ − Vỏ hũ',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'tare_weight',
            operands: [1200, 250],
            concreteTitle: 'ruột mứt trong hũ',
            concreteScenario: 'Tách riêng khối lượng mứt khỏi vỏ hũ thủy tinh 250 g.',
            groups: [
              { id: 'box', label: 'Vỏ hũ thủy tinh', icon: '🫙', count: 1, unitValue: 250, color: '#94A3B8' },
              { id: 'jam', label: 'Ruột mứt', icon: '🍓', count: 1, unitValue: 950, isUnknown: true, color: '#F43F5E' },
            ],
            unitLabel: 'g',
            primaryReading: 'Cả hũ: 1 kg 200 g',
            secondaryReading: 'Vỏ hũ: 250 g',
            conversionRule: '1 kg = 1 000 g · Ruột = Cả hũ − Vỏ hũ',
            visualParams: {
              mode: 'subtract',
              givenA: 1200,
              givenB: 250,
              unitA: 'g',
              labelA: 'Cả hũ: 1 kg 200 g',
              labelB: 'Vỏ hũ: 250 g',
            },
            guidedLatexSteps: [
              '\\text{Đổi } 1\\text{ kg } 200\\text{ g} = 1000 \\;?\\; 200 = ?\\text{ (g)}',
              '\\text{Khối lượng mứt} = (\\text{Cả hũ}) \\;?\\; 250 = ?\\text{ (g)}',
            ],
            fullLatexSteps: [
              '1\\text{ kg } 200\\text{ g} = 1200\\text{ g}',
              '1200 - 250 = 950\\text{ (g)}',
            ],
            finalAnswerLatex: '950\\text{ g}',
            finalNumericValue: 950,
          }),
        },
      },
      {
        id: 'dec-w5-q6',
        section: 'calculation',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [25, 30],
        prompt:
          '[Tính toán 6] Một bình chứa 3 L nước. Bạn Minh đã rót đầy 7 cốc, mỗi cốc chứa 250 mL. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước?',
        options: ['1250 mL', '1750 mL', '1350 mL', '1150 mL'],
        correctAnswer: '1250 mL',
        explanation:
          'Đổi 3 L = 3000 mL. Lượng nước đã rót vào 7 cốc là: 250 × 7 = 1750 (mL). Trong bình còn lại: 3000 - 1750 = 1250 (mL).',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'volume_beaker',
          title: 'Bình 3 L nước rót ra 7 cốc (mỗi cốc 250 mL)',
          primaryReading: 'Bình: 3 L',
          secondaryReading: 'Rót 7 cốc × 250 mL',
          conversionRule: '1 L = 1 000 mL · Còn lại = Bình ban đầu − Lượng đã rót',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'volume_beaker',
            operation: 'unit_subtract',
            operands: [3000, 1750],
            concreteTitle: 'nước còn lại trong bình',
            concreteScenario: 'Đổi 3 L sang mL, tính tổng lượng nước trong 7 cốc rồi trừ đi.',
            groups: [
              { id: 'c', label: '7 cốc đã rót', icon: '🥤', count: 7, unitValue: 250, isUnknown: true, showUnitValueBeforeSolve: true, color: '#F59E0B', displayMode: 'groups' },
            ],
            unitLabel: 'mL',
            primaryReading: 'Bình: 3 L',
            secondaryReading: 'Rót 7 cốc × 250 mL',
            conversionRule: '1 L = 1 000 mL · Còn lại = Bình ban đầu − Lượng đã rót',
            visualParams: {
              mode: 'subtract',
              givenA: 3000,
              givenB: 1750,
              unitA: 'mL',
              labelA: 'Bình: 3 L',
              labelB: 'Rót 7 cốc × 250 mL',
            },
            guidedLatexSteps: [
              '\\text{Đổi } 3\\text{ L} = 3 \\;?\\; 1000 = ?\\text{ (mL)}',
              '\\text{Lượng nước đã rót} = 250 \\;?\\; 7 = ?\\text{ (mL)}',
              '\\text{Trong bình còn} = (\\text{Bình ban đầu}) \\;?\\; (\\text{Đã rót}) = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '3\\text{ L} = 3000\\text{ mL}',
              '\\text{Lượng nước đã rót} = 250 \\times 7 = 1750\\text{ (mL)}',
              '\\text{Trong bình còn} = 3000 - 1750 = 1250\\text{ (mL)}',
            ],
            finalAnswerLatex: '1250\\text{ mL}',
            finalNumericValue: 1250,
          }),
        },
      },

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (4 CÂU - 40 ĐIỂM) ---
      {
        id: 'dec-w5-q7',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [8, 29],
        prompt:
          '[Nghị luận 1] Ghép 3 hình vuông cạnh 5 cm (mỗi hình có chu vi 20 cm) thành một hàng ngang dài. Vì sao chu vi hình chữ nhật mới là 40 cm chứ không phải 20 × 3 = 60 cm?',
        options: [
          'Vì có 2 mối ghép bên trong làm ẩn đi 4 cạnh nhỏ (4 × 5 = 20 cm), nên chu vi còn lại là 60 - 20 = 40 cm.',
          'Vì chỉ mất 2 cạnh bên trong nên chu vi là 60 - 10 = 50 cm.',
          'Vì hình chữ nhật mới chỉ có 2 cạnh dài.',
          'Vì ghép 3 hình lại thì chu vi giảm một nửa thành 30 cm.',
        ],
        correctAnswer:
          'Vì có 2 mối ghép bên trong làm ẩn đi 4 cạnh nhỏ (4 × 5 = 20 cm), nên chu vi còn lại là 60 - 20 = 40 cm.',
        reasoningPrompt:
          'Em hãy giải thích số mối ghép và số cạnh bị ẩn bên trong khi ghép 3 hình vuông cạnh 5 cm:',
        reasoningPlaceholder:
          'Nêu số mối ghép nằm bên trong và số cạnh bị che khuất, sau đó viết phép tính tìm chu vi hình chữ nhật mới...',
        reasoningKeywords: ['40', '2 mối ghép', '4 cạnh', '20', 'bên trong'],
        reasoningSampleAnswer:
          'Ghép 3 hình vuông thẳng hàng tạo ra 2 mối ghép ở giữa. Mỗi mối ghép làm ẩn 2 cạnh nên mất tất cả 4 cạnh (4 × 5 = 20 cm). Chu vi thật là 60 - 20 = 40 (cm).',
        explanation:
          '3 hình vuông cạnh 5 cm xếp ngang có 8 cạnh nhỏ ở viền ngoài (8 × 5 = 40 cm), mất 4 cạnh (2 mối ghép) ở bên trong.',
        visualModel: {
          type: 'perimeter_shape',
          title: 'Phân tích 2 mối ghép (4 cạnh ẩn) của 3 hình vuông cạnh 5 cm',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'joined_squares',
            concreteTitle: 'mối ghép hình vuông',
            concreteScenario: 'Tổng 12 cạnh trừ 4 cạnh ẩn bên trong còn 8 cạnh ngoài.',
            groups: [
              { id: 'sq', label: 'Hình vuông cạnh 5 cm', icon: '🟦', count: 3, unitValue: 5, color: '#38BDF8', beforeSolveBadge: '3 ô × 5 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 15,
            outerHeight: 5,
            sideLength: 5,
            joinedCount: 3,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi mới = Tổng 3 chu vi − Các cạnh ghép bên trong',
            sideShiftNote: 'Mỗi mối ghép ẩn đi 2 cạnh của hai hình đứng kề nhau.',
            guidedLatexSteps: ['\\text{Chu vi mới} = 60 \\;?\\; (4 \\;?\\; 5) = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi mới} = 60 - 4 \\times 5 = 40\\text{ (cm)}'],
            finalAnswerLatex: '40\\text{ cm}',
            finalNumericValue: 40,
          }),
        },
      },
      {
        id: 'dec-w5-q8',
        section: 'reasoning',
        points: 10,
        skillDomain: 'bar_model',
        relatedDayNumbers: [13, 30],
        prompt:
          '[Nghị luận 2] Một hình chữ L và một hình chữ U có cùng khung bao ngoài 20 cm × 12 cm (chu vi khung 64 cm). Biết rãnh lõm của hình chữ U sâu 5 cm. Em hãy so sánh chu vi hai hình đó.',
        options: [
          'Chu vi chữ L bằng đúng khung bao 64 cm, còn chu vi chữ U lớn hơn chữ L đúng 2 × 5 = 10 cm nên bằng 74 cm.',
          'Hai hình có chu vi bằng nhau và cùng bằng 64 cm.',
          'Chu vi chữ U nhỏ hơn chữ L là 10 cm nên bằng 54 cm.',
          'Chu vi chữ U chỉ lớn hơn chữ L đúng 5 cm nên bằng 69 cm.',
        ],
        correctAnswer:
          'Chu vi chữ L bằng đúng khung bao 64 cm, còn chu vi chữ U lớn hơn chữ L đúng 2 × 5 = 10 cm nên bằng 74 cm.',
        reasoningPrompt:
          'Em hãy lập luận so sánh chu vi hình chữ L và hình chữ U cùng khung bao 20 × 12 cm:',
        reasoningPlaceholder:
          'So sánh chu vi hình chữ L với khung bao ngoài, rồi tính phần chu vi chữ U tăng thêm nhờ 2 thành đứng ở rãnh lõm...',
        reasoningKeywords: ['74', '64', '10', '2 thành', 'lớn hơn'],
        reasoningSampleAnswer:
          'Hình chữ L có chu vi bằng đúng khung bao (20 + 12) × 2 = 64 cm. Hình chữ U có thêm 2 thành đứng của khe sâu 5 cm nên chu vi lớn hơn chữ L là 5 × 2 = 10 cm, bằng 64 + 10 = 74 cm.',
        explanation:
          'Cùng khung 20 × 12 cm: Chữ L = 64 cm, Chữ U = 64 + 2 × 5 = 74 cm (lớn hơn 10 cm).',
        visualModel: {
          type: 'perimeter_shape',
          title: 'So sánh Chữ U (rãnh sâu 5 cm) với khung bao 20 × 12 cm',
          cpaSpec: buildPerimeterWeeklyCPA({
            shapeKind: 'u_shape',
            concreteTitle: 'cạnh hình chữ U',
            concreteScenario: 'Khung 20 × 12 cm có chu vi 64 cm; rãnh chữ U sâu 5 cm.',
            groups: [
              { id: 'w', label: 'Chiều dài khung', icon: '↔️', count: 2, unitValue: 20, color: '#38BDF8', beforeSolveBadge: '2 × 20 cm' },
              { id: 'h', label: 'Chiều cao khung', icon: '↕️', count: 2, unitValue: 12, color: '#10B981', beforeSolveBadge: '2 × 12 cm' },
              { id: 'd', label: '2 thành rãnh chữ U', icon: '⚡', count: 2, unitValue: 5, color: '#F59E0B', beforeSolveBadge: '2 × 5 cm' },
            ],
            unitLabel: 'cm',
            outerWidth: 20,
            outerHeight: 12,
            recessWidth: 6,
            recessDepth: 5,
            unknownTarget: 'perimeter',
            perimeterFormulaHint: 'Chu vi chữ U = Chu vi khung ngoài + 2 × Độ sâu rãnh',
            sideShiftNote: 'Chữ L bằng đúng khung ngoài; Chữ U thêm 2 vách đứng màu vàng cam!',
            guidedLatexSteps: ['\\text{Chu vi chữ U} = 64 \\;?\\; (5 \\;?\\; 2) = ?\\text{ (cm)}'],
            fullLatexSteps: ['\\text{Chu vi chữ U} = 64 + 5 \\times 2 = 74\\text{ (cm)}'],
            finalAnswerLatex: '74\\text{ cm}',
            finalNumericValue: 74,
          }),
        },
      },
      {
        id: 'dec-w5-q9',
        section: 'reasoning',
        points: 10,
        skillDomain: 'remainder',
        relatedDayNumbers: [19, 30],
        prompt:
          '[Nghị luận 3] Một thùng dầu đầy nặng 18 kg. Sau khi rót ra một nửa số dầu thì cả thùng và dầu còn lại nặng 10 kg. Em hãy trình bày chuỗi lập luận 3 bước để tìm cân nặng vỏ thùng rỗng.',
        options: [
          'Bước 1: Nửa số dầu nặng 18 - 10 = 8 kg; Bước 2: Cả số dầu nặng 8 × 2 = 16 kg; Bước 3: Vỏ thùng rỗng nặng 18 - 16 = 2 kg.',
          'Bước 1: Lấy 18 : 2 = 9 kg; Bước 2: Lấy 10 - 9 = 1 kg.',
          'Bước 1: Lấy 18 - 10 = 8 kg; Bước 2: Vỏ thùng nặng 8 kg.',
          'Bước 1: Lấy 10 × 2 = 20 kg; Bước 2: Lấy 20 - 18 = 2 kg là số dầu.',
        ],
        correctAnswer:
          'Bước 1: Nửa số dầu nặng 18 - 10 = 8 kg; Bước 2: Cả số dầu nặng 8 × 2 = 16 kg; Bước 3: Vỏ thùng rỗng nặng 18 - 16 = 2 kg.',
        reasoningPrompt:
          'Em hãy viết ngắn gọn 3 bước tìm nửa số dầu, cả số dầu và vỏ thùng rỗng:',
        reasoningPlaceholder:
          'Bước 1: Tính nửa lượng dầu từ hiệu hai lần cân. Bước 2: Tính cả lượng dầu. Bước 3: Trừ đi để tìm vỏ thùng rỗng...',
        reasoningKeywords: ['8', '16', '2', 'nửa', 'vỏ'],
        reasoningSampleAnswer:
          'Một nửa lượng dầu nặng: 18 - 10 = 8 (kg). Cả lượng dầu nặng: 8 × 2 = 16 (kg). Vậy vỏ thùng rỗng nặng: 18 - 16 = 2 (kg).',
        explanation:
          'Cách làm nhanh khác: Nửa thùng (10 kg) = Vỏ + Nửa dầu (8 kg) → Vỏ = 10 - 8 = 2 kg.',
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'weight_balance',
          title: 'Chuỗi lập luận 3 bước: Thùng dầu đầy (18 kg) & Nửa dầu (10 kg)',
          primaryReading: 'Thùng đầy: 18 kg',
          secondaryReading: 'Còn nửa dầu: 10 kg',
          conversionRule: 'Hiệu hai lần cân = Một nửa lượng dầu',
          cpaSpec: buildMeasurementWeeklyCPA({
            subtype: 'weight_balance',
            operation: 'tare_weight',
            operands: [18, 10],
            concreteTitle: 'vỏ thùng dầu rỗng',
            concreteScenario: 'Lượng dầu giảm một nửa nhưng vỏ thùng vẫn còn nguyên.',
            groups: [
              { id: 'f', label: 'Thùng đầy', icon: '🛢️', count: 1, unitValue: 18, color: '#38BDF8' },
              { id: 'h', label: 'Còn nửa dầu', icon: '🪣', count: 1, unitValue: 10, color: '#F59E0B' },
              { id: 'v', label: 'Vỏ thùng rỗng', icon: '📦', count: 1, unitValue: 2, isUnknown: true, color: '#94A3B8' },
            ],
            unitLabel: 'kg',
            primaryReading: 'Thùng đầy: 18 kg',
            secondaryReading: 'Còn nửa dầu: 10 kg',
            conversionRule: 'Hiệu hai lần cân = Một nửa lượng dầu',
            visualParams: {
              mode: 'tare_half',
              givenA: 18,
              givenB: 10,
              unitA: 'kg',
              labelA: 'Thùng đầy',
              labelB: 'Còn nửa dầu',
            },
            guidedLatexSteps: [
              '\\text{Nửa lượng dầu} = 18 \\;?\\; 10 = ?\\text{ (kg)}',
              '\\text{Cả lượng dầu} = ? \\;?\\; 2 = ?\\text{ (kg)}',
              '\\text{Vỏ thùng rỗng} = 18 \\;?\\; ? = ?\\text{ (kg)}',
            ],
            fullLatexSteps: [
              '\\text{Nửa lượng dầu} = 18 - 10 = 8\\text{ (kg)}',
              '\\text{Cả lượng dầu} = 8 \\times 2 = 16\\text{ (kg)}',
              '\\text{Vỏ thùng rỗng} = 18 - 16 = 2\\text{ (kg)}',
            ],
            finalAnswerLatex: '2\\text{ kg}',
            finalNumericValue: 2,
          }),
        },
      },
      {
        id: 'dec-w5-q10',
        section: 'reasoning',
        points: 10,
        skillDomain: 'measurement',
        relatedDayNumbers: [26, 30],
        prompt:
          '[Nghị luận 4] Hai bình A và B có tổng cộng 2 L nước. Nếu rót 200 mL từ Bình A sang Bình B thì hai bình có lượng nước bằng nhau. Em hãy lập luận tìm lượng nước ban đầu của Bình A.',
        options: [
          'Tổng không đổi là 2 000 mL; khi bằng nhau mỗi bình có 2 000 : 2 = 1 000 mL. Vì Bình A đã rót đi 200 mL nên ban đầu Bình A có 1 000 + 200 = 1200 mL.',
          'Khi bằng nhau mỗi bình có 1 000 mL, trừ đi 200 mL nên Bình A có 800 mL.',
          'Ban đầu Bình A có 1 000 + 400 = 1 400 mL.',
          'Vì rót từ A sang B nên tổng hai bình thay đổi còn 1 800 mL.',
        ],
        correctAnswer:
          'Tổng không đổi là 2 000 mL; khi bằng nhau mỗi bình có 2 000 : 2 = 1 000 mL. Vì Bình A đã rót đi 200 mL nên ban đầu Bình A có 1 000 + 200 = 1200 mL.',
        reasoningPrompt:
          'Em hãy trình bày cách đổi 2 L và suy luận ngược tìm lượng nước ban đầu của Bình A:',
        reasoningPlaceholder:
          'Bước 1: Đổi 2 L sang mL (tổng không đổi). Bước 2: Tìm lượng nước mỗi bình khi bằng nhau rồi suy ngược Bình A lúc đầu...',
        reasoningKeywords: ['1200', '1000', '2000', 'tổng không đổi', 'cộng'],
        reasoningSampleAnswer:
          'Đổi 2 L = 2 000 mL. Rót qua lại giữa hai bình thì tổng không đổi. Khi bằng nhau mỗi bình có 2 000 : 2 = 1 000 (mL). Vì Bình A đã rót đi 200 mL nên ban đầu Bình A có: 1 000 + 200 = 1 200 (mL).',
        explanation:
          'Rót nước từ A sang B giữ nguyên tổng 2 000 mL. Lúc sau mỗi bình có 1 000 mL → ban đầu A có 1 000 + 200 = 1 200 mL (B có 800 mL).',
        visualModel: {
          type: 'bar_model',
          title: 'Tổng không đổi 2 L: Rót 200 mL từ A sang B thì bằng nhau',
          cpaSpec: buildBarWeeklyCPA({
            family: 'before_after',
            concreteTitle: 'nước ban đầu của Bình A',
            concreteScenario: 'Rót 200 mL từ A sang B không làm thay đổi tổng 2 L nước.',
            interactiveRule: 'Đổi 2 L sang mL; khi bằng nhau mỗi bình nhận nửa tổng, rồi cộng trả 200 mL cho Bình A.',
            groups: [
              { id: 'eq', label: 'Tổng 2 bình (không đổi)', icon: '💧', count: 2, unitValue: 1000, color: '#38BDF8', beforeSolveBadge: '2 L' },
              { id: 'mv', label: 'Lượng đã rót đi', icon: '➡️', count: 1, unitValue: 200, color: '#F59E0B' },
            ],
            unitLabel: 'mL',
            unitReferenceValue: 200,
            beforeBars: [
              makeBarSpec({ id: 'bar_a', label: 'Bình A (lúc đầu)', units: 1, unitValue: 1000, offsetValue: 200, displayValue: '? mL', color: '#38BDF8', isUnknown: true, highlightNote: 'Rót đi 200 mL', deltaType: 'transferred_out' }),
              makeBarSpec({ id: 'bar_b', label: 'Bình B (lúc đầu)', units: 1, unitValue: 800, displayValue: '? mL', color: '#10B981', isUnknown: true }),
            ],
            afterBars: [
              makeBarSpec({ id: 'bar_a', label: 'Bình A (lúc sau)', units: 1, unitValue: 1000, displayValue: '? mL (= Bình B)', color: '#38BDF8', isUnknown: true }),
              makeBarSpec({ id: 'bar_b', label: 'Bình B (lúc sau)', units: 1, unitValue: 800, offsetValue: 200, displayValue: '? mL (= Bình A)', color: '#10B981', isUnknown: true, highlightNote: 'Nhận 200 mL', deltaType: 'transferred_in' }),
            ],
            bars: [
              makeBarSpec({ id: 'bar_a', label: 'Bình A (lúc sau)', units: 1, unitValue: 1000, displayValue: '? mL (= Bình B)', color: '#38BDF8', isUnknown: true }),
              makeBarSpec({ id: 'bar_b', label: 'Bình B (lúc sau)', units: 1, unitValue: 800, offsetValue: 200, displayValue: '? mL (= Bình A)', color: '#10B981', isUnknown: true, highlightNote: 'Nhận 200 mL', deltaType: 'transferred_in' }),
            ],
            transferSpec: {
              fromBarId: 'bar_a',
              toBarId: 'bar_b',
              deltaValue: 200,
              conservationRule: 'constant_total',
              description: 'Rót 200 mL từ Bình A sang Bình B — Tổng 2 L không đổi',
            },
            totalBracket: {
              targetBarIds: ['bar_a', 'bar_b'],
              numericValue: 2000,
              displayLabel: 'Tổng = 2 L',
              isUnknown: true,
            },
            guidedLatexSteps: [
              '\\text{Đổi } 2\\text{ L} = 2 \\;?\\; 1000 = ?\\text{ (mL)}',
              '\\text{Mỗi bình lúc sau} = (\\text{Tổng mL}) \\;?\\; 2 = ?\\text{ (mL)}',
              '\\text{Bình A lúc đầu} = (\\text{Lúc sau}) \\;?\\; 200 = ?\\text{ (mL)}',
            ],
            fullLatexSteps: [
              '2\\text{ L} = 2000\\text{ mL}',
              '\\text{Mỗi bình lúc sau} = 2000 \\div 2 = 1000\\text{ (mL)}',
              '\\text{Bình A lúc đầu} = 1000 + 200 = 1200\\text{ (mL)}',
            ],
            finalAnswerLatex: '1200\\text{ mL}',
            finalNumericValue: 1200,
          }),
        },
      },
    ],
  },
];
