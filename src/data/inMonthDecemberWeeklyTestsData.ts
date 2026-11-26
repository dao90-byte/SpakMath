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
// BỘ 4 ĐỀ KIỂM TRA 15 PHÚT CUỐI TUẦN — THÁNG 12 (16 CÂU CHUẨN SINGAPORE CPA)
// Khung chuẩn 20 buổi (4 tuần × 5 buổi): đặt sau Buổi 5, Buổi 10, Buổi 15 và Buổi 20
// Cấu trúc mỗi đề (15 phút · 100đ): 3 câu Tính toán (3 × 20đ = 60đ) + 1 câu Nghị luận Tư duy (40đ: 20đ lập luận + 20đ lời giải)
// ============================================================================

export const DECEMBER_WEEKLY_TESTS: InMonthWeeklyTest[] = [
  // ==========================================================================
  // TUẦN 1 (SAU BUỔI 5): CHU VI HÌNH VUÔNG, HÌNH CHỮ NHẬT & TOÁN NGƯỢC TÌM CẠNH
  // ==========================================================================
  {
    id: 'dec-weekly-test-w1',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 1,
    weekTitle: 'Tuần 1 · Chu Vi Cơ Bản & Toán Ngược',
    triggerAfterDayNumber: 5,
    unlocksWeekNumber: 2,
    unlocksDayNumber: 6,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 1: Chu Vi Hình Vuông, Hình Chữ Nhật & Toán Ngược',
    subtitle: '3 câu Tính toán (60đ) + 1 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (3 CÂU × 20 ĐIỂM = 60 ĐIỂM) ---
      {
        id: 'dec-w1-q1',
        section: 'calculation',
        points: 20,
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
        points: 20,
        skillDomain: 'interval',
        relatedDayNumbers: [3, 4, 5],
        prompt:
          '[Tính toán 2] Một mảnh vườn hình chữ nhật có chu vi 84 m và chiều dài 27 m. Tính chiều rộng mảnh vườn đó.',
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
        id: 'dec-w1-q3',
        section: 'calculation',
        points: 20,
        skillDomain: 'interval',
        relatedDayNumbers: [2, 5],
        prompt:
          '[Tính toán 3] Một tấm thảm hình chữ nhật có chiều rộng 12 cm và chiều dài gấp 2 lần chiều rộng. Tính chu vi tấm thảm đó.',
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

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (1 CÂU × 40 ĐIỂM = 40 ĐIỂM: 20đ LẬP LUẬN + 20đ LỜI GIẢI) ---
      {
        id: 'dec-w1-q4',
        section: 'reasoning',
        points: 40,
        skillDomain: 'interval',
        relatedDayNumbers: [3, 4, 5],
        prompt:
          '[Nghị luận 1] Một tấm biển hình chữ nhật có chu vi 60 cm và chiều dài 18 cm. Vì sao muốn tìm chiều rộng ta phải lấy 60 : 2 trước rồi mới trừ đi 18?',
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
    ],
  },

  // ==========================================================================
  // TUẦN 2 (SAU BUỔI 10): CHU VI HÌNH GHÉP & KỸ THUẬT DỜI CẠNH (SIDE-SHIFTING)
  // ==========================================================================
  {
    id: 'dec-weekly-test-w2',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 2,
    weekTitle: 'Tuần 2 · Chu Vi Hình Ghép & Dời Cạnh',
    triggerAfterDayNumber: 10,
    unlocksWeekNumber: 3,
    unlocksDayNumber: 11,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 2: Hình Ghép & Kỹ Thuật Dời Cạnh Singapore',
    subtitle: '3 câu Tính toán (60đ) + 1 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (3 CÂU × 20 ĐIỂM = 60 ĐIỂM) ---
      {
        id: 'dec-w2-q1',
        section: 'calculation',
        points: 20,
        skillDomain: 'bar_model',
        relatedDayNumbers: [6],
        prompt:
          '[Tính toán 1] Xếp 3 viên gạch hình vuông cạnh 7 cm thành một hàng ngang liền kề nhau. Tính chu vi hình chữ nhật tạo thành.',
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
        id: 'dec-w2-q2',
        section: 'calculation',
        points: 20,
        skillDomain: 'bar_model',
        relatedDayNumbers: [7, 8],
        prompt:
          '[Tính toán 2] Một tấm kim loại hình chữ L có khung bao bên ngoài rộng 18 cm, cao 14 cm (được cắt khuyết một góc chữ nhật). Áp dụng kỹ thuật dời cạnh, tính chu vi hình chữ L đó.',
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
        id: 'dec-w2-q3',
        section: 'calculation',
        points: 20,
        skillDomain: 'bar_model',
        relatedDayNumbers: [10],
        prompt:
          '[Tính toán 3] Một tấm ván hình chữ U có chiều rộng khung bao 22 cm, chiều cao 16 cm và phần khe lõm ở giữa sâu 6 cm. Tính chu vi tấm ván hình chữ U đó.',
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

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (1 CÂU × 40 ĐIỂM = 40 ĐIỂM: 20đ LẬP LUẬN + 20đ LỜI GIẢI) ---
      {
        id: 'dec-w2-q4',
        section: 'reasoning',
        points: 40,
        skillDomain: 'bar_model',
        relatedDayNumbers: [8, 9],
        prompt:
          '[Nghị luận 1] Cho hình bậc thang 4 bậc biết cạnh đáy dài 15 cm và cạnh đứng bên trái cao 10 cm, nhưng đề KHÔNG cho biết độ dài từng bậc nhỏ. Em có tính được chu vi hình bậc thang không?',
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
  // TUẦN 3 (SAU BUỔI 15): ĐO LƯỜNG KHỐI LƯỢNG (kg – g) & CÂN THĂNG BẰNG
  // ==========================================================================
  {
    id: 'dec-weekly-test-w3',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 3,
    weekTitle: 'Tuần 3 · Khối Lượng kg – g',
    triggerAfterDayNumber: 15,
    unlocksWeekNumber: 4,
    unlocksDayNumber: 16,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 3: Đo Lường Khối Lượng (kg – g) & Cân Thăng Bằng',
    subtitle: '3 câu Tính toán (60đ) + 1 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (3 CÂU × 20 ĐIỂM = 60 ĐIỂM) ---
      {
        id: 'dec-w3-q1',
        section: 'calculation',
        points: 20,
        skillDomain: 'remainder',
        relatedDayNumbers: [11, 12],
        prompt:
          '[Tính toán 1] Một bao gạo cân nặng 4 kg. Mẹ lấy ra 1250 g gạo để nấu ăn. Hỏi trong bao còn lại bao nhiêu gam gạo?',
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
        id: 'dec-w3-q2',
        section: 'calculation',
        points: 20,
        skillDomain: 'remainder',
        relatedDayNumbers: [13, 14],
        prompt:
          '[Tính toán 2] Trên cân đĩa đang thăng bằng: Đĩa bên trái có 1 quả dưa và 1 quả cân 250 g; đĩa bên phải có 1 quả cân 1 kg và 1 quả cân 500 g. Hỏi quả dưa cân nặng bao nhiêu gam?',
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
        id: 'dec-w3-q3',
        section: 'calculation',
        points: 20,
        skillDomain: 'remainder',
        relatedDayNumbers: [14, 15],
        prompt:
          '[Tính toán 3] Một thùng đựng đầy táo cân nặng 16 kg. Sau khi bán đi một nửa số táo, cả thùng và số táo còn lại cân nặng 9 kg. Hỏi riêng vỏ thùng rỗng nặng bao nhiêu ki-lô-gam?',
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

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (1 CÂU × 40 ĐIỂM = 40 ĐIỂM: 20đ LẬP LUẬN + 20đ LỜI GIẢI) ---
      {
        id: 'dec-w3-q4',
        section: 'reasoning',
        points: 40,
        skillDomain: 'remainder',
        relatedDayNumbers: [11],
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
    ],
  },

  // ==========================================================================
  // TUẦN 4 (SAU BUỔI 20): ĐO LƯỜNG THỂ TÍCH (L – mL) & BÀI TOÁN SAN BÌNH
  // ==========================================================================
  {
    id: 'dec-weekly-test-w4',
    monthNumber: 12,
    monthLabel: 'Tháng 12',
    weekNumber: 4,
    weekTitle: 'Tuần 4 · Thể Tích L – mL',
    triggerAfterDayNumber: 20,
    title: 'Kiểm Tra 15 Phút Cuối Tuần 4: Đo Lường Thể Tích (L – mL) & Bài Toán San Bình',
    subtitle: '3 câu Tính toán (60đ) + 1 câu Nghị luận Tư duy (40đ) · Chuẩn Toán Singapore CPA',
    durationMinutes: 15,
    passingScore: 70,
    questions: [
      // --- PHẦN 1: TÍNH TOÁN (3 CÂU × 20 ĐIỂM = 60 ĐIỂM) ---
      {
        id: 'dec-w4-q1',
        section: 'calculation',
        points: 20,
        skillDomain: 'measurement',
        relatedDayNumbers: [16, 17, 18],
        prompt:
          '[Tính toán 1] Có 1 L 800 mL sữa tươi rót đều vào 6 chai bằng nhau. Hỏi mỗi chai chứa bao nhiêu mi-li-lít sữa tươi?',
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
        id: 'dec-w4-q2',
        section: 'calculation',
        points: 20,
        skillDomain: 'measurement',
        relatedDayNumbers: [17, 18],
        prompt:
          '[Tính toán 2] Mỗi cốc đựng được 250 mL nước cam. Hỏi để rót đầy 5 cốc như thế cần tất cả bao nhiêu mi-li-lít nước cam?',
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
        id: 'dec-w4-q3',
        section: 'calculation',
        points: 20,
        skillDomain: 'measurement',
        relatedDayNumbers: [19, 20],
        prompt:
          '[Tính toán 3] Can 1 có 34 L nước, Can 2 có 18 L nước. Hỏi phải rót từ Can 1 sang Can 2 bao nhiêu lít nước để lượng nước ở hai can bằng nhau?',
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

      // --- PHẦN 2: NGHỊ LUẬN TƯ DUY (1 CÂU × 40 ĐIỂM = 40 ĐIỂM: 20đ LẬP LUẬN + 20đ LỜI GIẢI) ---
      {
        id: 'dec-w4-q4',
        section: 'reasoning',
        points: 40,
        skillDomain: 'measurement',
        relatedDayNumbers: [19, 20],
        prompt:
          '[Nghị luận 1] Bình A đang có nhiều hơn Bình B là 400 mL nước. Nếu rót 150 mL từ Bình A sang Bình B thì lúc này Bình A còn nhiều hơn Bình B bao nhiêu mi-li-lít?',
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
    ],
  },
];
