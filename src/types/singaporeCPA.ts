export type BarModelFamily = 'part_whole' | 'comparison' | 'before_after';

export type CPAModelDomain =
  | 'bar_model'
  | 'remainder_groups'
  | 'interval_model'
  | 'measurement_lab';

export interface CPAConcreteGroup {
  id: string;
  label: string;
  icon: string;
  count: number;
  unitValue: number;
  totalValue: number;
  color: string;
  note?: string;
  isUnknown?: boolean;
}

export interface CPAConcreteLayer {
  itemName: string;
  unitLabel: string;
  actionPrompt: string;
  groups: CPAConcreteGroup[];
  interactiveRule: string;
}

export interface BarModelUnitBlock {
  index: number;
  label: string;
  numericValue: number;
  isUnknown?: boolean;
  isDelta?: boolean;
  deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
}

export interface BarModelBarSpec {
  id: string;
  label: string;
  units: number;
  unitValue: number;
  offsetValue?: number; // e.g. +10 or -12 beyond integer units
  numericValue: number; // exact mathematical value = units * unitValue + (offsetValue ?? 0)
  displayValue: string;
  isUnknown?: boolean;
  color: string;
  highlightNote?: string;
  deltaType?: 'added' | 'removed' | 'transferred_in' | 'transferred_out';
  blocks: BarModelUnitBlock[];
}

export interface BarModelTotalBracket {
  targetBarIds: string[];
  numericValue: number;
  displayLabel: string;
  isUnknown?: boolean;
}

export interface BarModelDifferenceBracket {
  longerBarId: string;
  shorterBarId: string;
  diffUnits?: number;
  numericValue: number;
  displayLabel: string;
  isUnknown?: boolean;
}

export interface BeforeAfterTransferSpec {
  conservationRule: 'constant_total' | 'external_change' | 'constant_difference';
  fromBarId?: string;
  toBarId?: string;
  deltaValue: number;
  description: string;
}

export interface BarModelPictorialSpec {
  kind: 'bar_model';
  family: BarModelFamily;
  unitReferenceValue: number;
  unitName: string;
  // Used for part_whole and comparison (and initial state of before_after)
  bars: BarModelBarSpec[];
  // Used specifically when family === 'before_after'
  beforeBars?: BarModelBarSpec[];
  afterBars?: BarModelBarSpec[];
  transferSpec?: BeforeAfterTransferSpec;
  totalBracket?: BarModelTotalBracket;
  differenceBracket?: BarModelDifferenceBracket;
}

export interface RemainderPictorialSpec {
  kind: 'remainder_groups';
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
  itemIcon: string;
  groupLabel: string;
  contextMode: 'standard_division' | 'round_up_containers' | 'round_down_full' | 'cyclic_pattern' | 'max_remainder' | 'reconstruct_dividend' | 'complement_to_full';
  unknownTarget?: 'quotient_and_remainder' | 'dividend' | 'quotient' | 'remainder';
  targetValue: number;
}

export interface IntervalPictorialSpec {
  kind: 'interval_model';
  subtype: 'both_ends' | 'one_end' | 'neither_end' | 'closed_loop' | 'wood_cuts' | 'stairs';
  totalLength: number;
  stepLength: number;
  intervalsCount: number;
  objectsCount: number;
  multiplierSides?: number; // e.g., 2 for planting on both sides of the road
  secondaryValuePerInterval?: number; // e.g., minutes per cut or flowers per gap
  unknownTarget?: 'intervals' | 'objects' | 'total_length' | 'step_length';
  targetResultValue: number;
  objectIcon: string;
  unitLabel: string;
}

export interface MeasurementPictorialSpec {
  kind: 'measurement_lab';
  subtype: 'length_scale' | 'weight_balance' | 'volume_beaker' | 'length_chart';
  operation:
    | 'unit_convert'
    | 'subtract_units'
    | 'add_units_convert'
    | 'equal_division'
    | 'equalize_transfer'
    | 'container_tare'
    | 'overlap_join'
    | 'chart_extremes_diff';
  conversionFactor?: number;
  operands: number[];
  expectedNumericResult: number;
  resultUnit: string;
  primaryReading?: string;
  secondaryReading?: string;
  conversionRule?: string;
  chartItems?: { label: string; value: number; unit: string; color: string; masked?: boolean }[];
}

export type CPAPictorialLayer =
  | BarModelPictorialSpec
  | RemainderPictorialSpec
  | IntervalPictorialSpec
  | MeasurementPictorialSpec;

export interface CPAAbstractLayer {
  unknownSymbol: string;
  /** Shown before solving: hides final numeric answer behind '?' */
  guidedLatexSteps: string[];
  /** Shown after solving or when checking steps: full equations */
  fullLatexSteps: string[];
  finalAnswerLatex: string;
  finalNumericValue: number;
}

export interface SingaporeCPASpec {
  version: '1.0';
  domain: CPAModelDomain;
  concrete: CPAConcreteLayer;
  pictorial: CPAPictorialLayer;
  abstract: CPAAbstractLayer;
}
