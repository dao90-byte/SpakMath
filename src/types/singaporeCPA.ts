/**
 * Standardized Singapore Math CPA (Concrete - Pictorial - Abstract) Specification
 * Ensures 100% mathematical consistency across all 30 days, weekly tests, and final exams.
 */

export type CPADomain =
  | 'bar_model'
  | 'remainder_groups'
  | 'interval_model'
  | 'measurement_lab';

export interface CPAConcreteGroup {
  id: string;
  label: string;
  icon: string;
  count: number; // Number of unit items / equal boxes / groups
  unitValue: number; // Value per item / unit
  totalValue: number; // Invariant: count * unitValue
  color: string;
  note?: string;
  isUnknown?: boolean;
  /** Optional display override for concrete chip summary (e.g. avoid nonsensical "1 phần × 12" on non-unit items) */
  displayMode?: 'units' | 'groups' | 'measurement' | 'interval';
}

export interface CPAConcreteSpec {
  itemName: string; // e.g., "ngôi sao", "lít", "cây", "hộp"
  unitLabel: string; // e.g., "phần", "nhóm", "khoảng", "đơn vị"
  actionPrompt: string; // Interactive concrete instruction for the child
  interactiveRule: string; // e.g., "Mỗi khối = 15 ngôi sao"
  groups: CPAConcreteGroup[];
}

export interface BarModelUnitBlock {
  index: number;
  numericValue: number;
  label: string;
  isUnknown?: boolean;
  isDelta?: boolean;
  deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
}

export interface BarModelBarSpec {
  id: string;
  label: string;
  units: number; // Number of equal base units (must be > 0)
  unitValue: number; // Numeric value of 1 base unit
  offsetValue?: number; // +bonus or -bonus adjustment
  numericValue: number; // Invariant: units * unitValue + (offsetValue ?? 0)
  displayValue: string; // e.g., "15 ngôi sao" or "?"
  isUnknown?: boolean;
  /** When true, masks the offset badge/label before solving (e.g. when the offset itself is the answer) */
  hideOffsetBeforeSolve?: boolean;
  color: string;
  highlightNote?: string;
  deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
  blocks: BarModelUnitBlock[];
}

export interface BarModelBracketSpec {
  targetBarIds: string[];
  numericValue: number; // Invariant: sum of target bar numericValues
  displayLabel: string;
  isUnknown?: boolean;
}

export interface BarModelDifferenceBracketSpec {
  longerBarId: string;
  shorterBarId: string;
  numericValue: number; // Invariant: longer.numericValue - shorter.numericValue
  diffUnits?: number;
  displayLabel: string;
  isUnknown?: boolean;
}

export interface BarModelTransferSpec {
  fromBarId: string;
  toBarId: string;
  deltaValue: number;
  conservationRule: 'constant_total' | 'constant_difference' | 'working_backwards';
  description: string;
}

export interface BarModelPictorialSpec {
  kind: 'bar_model';
  family: 'part_whole' | 'comparison' | 'before_after';
  unitReferenceValue: number; // Numeric value of 1 standard unit
  unitName: string;
  bars: BarModelBarSpec[];
  totalBracket?: BarModelBracketSpec;
  differenceBracket?: BarModelDifferenceBracketSpec;
  // For Before-After / Working Backwards problems
  beforeBars?: BarModelBarSpec[];
  afterBars?: BarModelBarSpec[];
  transferSpec?: BarModelTransferSpec;
}

export type RemainderContextMode =
  | 'standard_division'
  | 'round_up_containers'
  | 'round_down_full'
  | 'cyclic_pattern'
  | 'max_remainder'
  | 'find_dividend'
  | 'complement_to_full';

export interface RemainderPictorialSpec {
  kind: 'remainder_groups';
  dividend: number; // D
  divisor: number; // d
  quotient: number; // q
  remainder: number; // r (Invariant: 0 <= r < d and D === d * q + r)
  itemIcon: string;
  groupLabel: string;
  contextMode: RemainderContextMode;
  /** Pedagogical Singapore Math callout explaining how to interpret the remainder in context */
  contextActionHint?: string;
  unknownTarget: 'quotient_and_remainder' | 'dividend' | 'quotient' | 'remainder';
  targetValue?: number; // Final answer value (e.g. q + 1 for round_up, q for round_down)
}

export interface IntervalPictorialSpec {
  kind: 'interval_model';
  subtype: 'both_ends' | 'one_end' | 'neither_end' | 'closed_loop' | 'wood_cuts' | 'stairs';
  totalLength: number; // Invariant: intervalsCount * stepLength
  stepLength: number;
  intervalsCount: number;
  objectsCount: number; // Invariant depends strictly on subtype
  unknownTarget: 'intervals' | 'objects' | 'total_length' | 'step_length';
  targetResultValue?: number; // e.g. for 2-sided roads or time per wood cut
  objectIcon: string;
  unitLabel: string;
  /** 2 for two-sided road problems (both sides planted/lit) */
  sidesMultiplier?: 1 | 2;
  /** Minutes/seconds per saw cut for wood_cuts problems */
  timePerCut?: number;
  timeUnit?: string;
  /** Icon placed inside each gap (e.g. flower beds between trees) */
  itemInGapIcon?: string;
  /** Starting floor for stairs problems (default 1) */
  startFloor?: number;
}

export type MeasurementOperation =
  | 'unit_convert'
  | 'unit_add'
  | 'unit_subtract'
  | 'unit_divide'
  | 'balance_eq'
  | 'tare_weight'
  | 'equalize_transfer'
  | 'overlap_join'
  | 'chart_extremes_diff'
  | 'chart_target_value';

export interface MeasurementVisualParams {
  mode:
    | 'convert'
    | 'subtract'
    | 'sum'
    | 'divide_equal'
    | 'balance_eq'
    | 'tare_half'
    | 'equalize_pour'
    | 'overlap_join'
    | 'bridge_chain';
  /** Given numeric values from the prompt for accurate proportional SVG rendering */
  givenA?: number;
  givenB?: number;
  givenCount?: number;
  unitA?: string;
  unitB?: string;
  labelA?: string;
  labelB?: string;
}

export interface MeasurementPictorialSpec {
  kind: 'measurement_lab';
  subtype: 'length_scale' | 'weight_balance' | 'volume_beaker' | 'length_chart';
  operation: MeasurementOperation;
  operands: number[];
  expectedNumericResult: number;
  resultUnit: string;
  primaryReading?: string;
  secondaryReading?: string;
  conversionRule?: string;
  visualParams?: MeasurementVisualParams;
  chartItems?: { label: string; value: number; unit: string; color: string; masked?: boolean }[];
}

export type CPAPictorialSpec =
  | BarModelPictorialSpec
  | RemainderPictorialSpec
  | IntervalPictorialSpec
  | MeasurementPictorialSpec;

export interface CPAAbstractSpec {
  unknownSymbol: string; // Always "?"
  guidedLatexSteps: string[]; // Shown BEFORE solving (hides final answer using ?)
  fullLatexSteps: string[]; // Shown AFTER solving (complete mathematical proof)
  finalAnswerLatex: string; // Highlighted final answer in KaTeX
  finalNumericValue: number; // Primary numeric value for automated math verification
}

export interface SingaporeCPASpec {
  version: '1.0';
  domain: CPADomain;
  concrete: CPAConcreteSpec;
  pictorial: CPAPictorialSpec;
  abstract: CPAAbstractSpec;
}
