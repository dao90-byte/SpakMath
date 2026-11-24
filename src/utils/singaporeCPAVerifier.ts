import {
  SingaporeCPASpec,
  BarModelPictorialSpec,
  RemainderPictorialSpec,
  IntervalPictorialSpec,
  MeasurementPictorialSpec,
  PerimeterPictorialSpec,
  PlaceValuePictorialSpec,
  SequencePatternPictorialSpec,
  AreaGridPictorialSpec,
} from '../types/singaporeCPA';

export interface MathVerificationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Verifies mathematical invariants for a Singapore Bar Model (Part-Whole, Comparison, Before-After).
 */
export function verifyBarModelPictorial(spec: BarModelPictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (spec.unitReferenceValue <= 0) {
    errors.push(`unitReferenceValue must be > 0, got ${spec.unitReferenceValue}`);
  }

  if (!spec.bars || spec.bars.length === 0) {
    errors.push('BarModelPictorialSpec must contain at least 1 bar.');
    return { valid: false, errors };
  }

  // Verify each bar's internal arithmetic: numericValue === units * unitValue + offsetValue
  const checkBarConsistency = (barList: typeof spec.bars, contextLabel: string) => {
    for (const bar of barList) {
      if (bar.units <= 0) {
        errors.push(`[${contextLabel}] Bar "${bar.id}" must have units > 0, got ${bar.units}`);
      }
      const offset = bar.offsetValue ?? 0;
      const expectedNumeric = bar.units * bar.unitValue + offset;
      if (Math.abs(bar.numericValue - expectedNumeric) > 1e-6) {
        errors.push(
          `[${contextLabel}] Bar "${bar.id}" (${bar.label}) numericValue=${bar.numericValue} does not match units(${bar.units}) * unitValue(${bar.unitValue}) + offset(${offset}) = ${expectedNumeric}`
        );
      }
      if (!bar.blocks || bar.blocks.length === 0) {
        errors.push(`[${contextLabel}] Bar "${bar.id}" must have at least 1 block segment.`);
      } else {
        const blocksSum = bar.blocks.reduce((acc, b) => acc + b.numericValue, 0);
        if (Math.abs(blocksSum - bar.numericValue) > 1e-6) {
          errors.push(
            `[${contextLabel}] Bar "${bar.id}" blocks sum (${blocksSum}) !== bar.numericValue (${bar.numericValue})`
          );
        }
      }
    }
  };

  checkBarConsistency(spec.bars, 'bars');

  // 1. Part-Whole Invariant: Total bracket must equal sum of target bars
  if (spec.family === 'part_whole') {
    if (!spec.totalBracket) {
      errors.push('part_whole Bar Model must define a totalBracket.');
    } else {
      const targetBars = spec.bars.filter((b) =>
        spec.totalBracket!.targetBarIds.includes(b.id)
      );
      const sumParts = targetBars.reduce((sum, b) => sum + b.numericValue, 0);
      if (Math.abs(sumParts - spec.totalBracket.numericValue) > 1e-6) {
        errors.push(
          `part_whole invariant failed: sum of target bars (${sumParts}) !== totalBracket.numericValue (${spec.totalBracket.numericValue})`
        );
      }
    }
  }

  // 2. Comparison Invariant: Difference bracket and/or Total bracket must match exact bar values
  if (spec.family === 'comparison') {
    if (spec.differenceBracket) {
      const longer = spec.bars.find((b) => b.id === spec.differenceBracket!.longerBarId);
      const shorter = spec.bars.find((b) => b.id === spec.differenceBracket!.shorterBarId);
      if (!longer || !shorter) {
        errors.push(
          `comparison differenceBracket references missing bar IDs: longer="${spec.differenceBracket.longerBarId}", shorter="${spec.differenceBracket.shorterBarId}"`
        );
      } else {
        const actualDiff = longer.numericValue - shorter.numericValue;
        if (actualDiff < 0) {
          errors.push(
            `comparison differenceBracket longerBar (${longer.numericValue}) is smaller than shorterBar (${shorter.numericValue})`
          );
        }
        if (Math.abs(actualDiff - spec.differenceBracket.numericValue) > 1e-6) {
          errors.push(
            `comparison invariant failed: (${longer.numericValue} - ${shorter.numericValue} = ${actualDiff}) !== differenceBracket.numericValue (${spec.differenceBracket.numericValue})`
          );
        }
      }
    }

    if (spec.totalBracket) {
      const targetBars = spec.bars.filter((b) =>
        spec.totalBracket!.targetBarIds.includes(b.id)
      );
      const sumBars = targetBars.reduce((sum, b) => sum + b.numericValue, 0);
      if (Math.abs(sumBars - spec.totalBracket.numericValue) > 1e-6) {
        errors.push(
          `comparison totalBracket invariant failed: sum (${sumBars}) !== totalBracket.numericValue (${spec.totalBracket.numericValue})`
        );
      }
    }
  }

  // 3. Before-After Invariant: Conservation of total or exact transfer delta
  if (spec.family === 'before_after') {
    if (!spec.beforeBars || !spec.afterBars || !spec.transferSpec) {
      errors.push('before_after Bar Model must define beforeBars, afterBars, and transferSpec.');
    } else {
      checkBarConsistency(spec.beforeBars, 'beforeBars');
      checkBarConsistency(spec.afterBars, 'afterBars');

      const sumBefore = spec.beforeBars.reduce((s, b) => s + b.numericValue, 0);
      const sumAfter = spec.afterBars.reduce((s, b) => s + b.numericValue, 0);

      if (spec.transferSpec.conservationRule === 'constant_total') {
        if (Math.abs(sumBefore - sumAfter) > 1e-6) {
          errors.push(
            `before_after constant_total invariant failed: sumBefore (${sumBefore}) !== sumAfter (${sumAfter})`
          );
        }
        if (spec.transferSpec.fromBarId && spec.transferSpec.toBarId) {
          const fromBefore = spec.beforeBars.find((b) => b.id === spec.transferSpec!.fromBarId);
          const fromAfter = spec.afterBars.find((b) => b.id === spec.transferSpec!.fromBarId);
          const toBefore = spec.beforeBars.find((b) => b.id === spec.transferSpec!.toBarId);
          const toAfter = spec.afterBars.find((b) => b.id === spec.transferSpec!.toBarId);

          if (fromBefore && fromAfter) {
            const expectedFromAfter = fromBefore.numericValue - spec.transferSpec.deltaValue;
            if (Math.abs(fromAfter.numericValue - expectedFromAfter) > 1e-6) {
              errors.push(
                `before_after transfer out failed: ${fromBefore.numericValue} - ${spec.transferSpec.deltaValue} !== ${fromAfter.numericValue}`
              );
            }
          }
          if (toBefore && toAfter) {
            const expectedToAfter = toBefore.numericValue + spec.transferSpec.deltaValue;
            if (Math.abs(toAfter.numericValue - expectedToAfter) > 1e-6) {
              errors.push(
                `before_after transfer in failed: ${toBefore.numericValue} + ${spec.transferSpec.deltaValue} !== ${toAfter.numericValue}`
              );
            }
          }
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Euclidean division with remainder invariants: D = d * q + r, 0 <= r < d.
 */
export function verifyRemainderPictorial(spec: RemainderPictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (spec.divisor <= 0) {
    errors.push(`divisor must be > 0, got ${spec.divisor}`);
  }
  if (spec.remainder < 0 || spec.remainder >= spec.divisor) {
    errors.push(
      `Euclidean remainder invariant violated: remainder (${spec.remainder}) must satisfy 0 <= r < divisor (${spec.divisor})`
    );
  }
  const expectedDividend = spec.divisor * spec.quotient + spec.remainder;
  if (spec.dividend !== expectedDividend) {
    errors.push(
      `Euclidean division identity failed: dividend (${spec.dividend}) !== divisor (${spec.divisor}) * quotient (${spec.quotient}) + remainder (${spec.remainder}) = ${expectedDividend}`
    );
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Singapore Interval Model (tree planting, wood cutting, stairs, closed loop) invariants.
 */
export function verifyIntervalPictorial(spec: IntervalPictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (spec.intervalsCount <= 0 || spec.stepLength <= 0) {
    errors.push(
      `intervalsCount (${spec.intervalsCount}) and stepLength (${spec.stepLength}) must be > 0`
    );
  }

  const expectedTotalLength = spec.intervalsCount * spec.stepLength;
  if (Math.abs(spec.totalLength - expectedTotalLength) > 1e-6) {
    errors.push(
      `Interval totalLength (${spec.totalLength}) !== intervalsCount (${spec.intervalsCount}) * stepLength (${spec.stepLength}) = ${expectedTotalLength}`
    );
  }

  switch (spec.subtype) {
    case 'both_ends':
    case 'stairs':
      if (spec.objectsCount !== spec.intervalsCount + 1) {
        errors.push(
          `Interval subtype "${spec.subtype}" requires objectsCount (${spec.objectsCount}) === intervalsCount + 1 (${spec.intervalsCount + 1})`
        );
      }
      break;
    case 'one_end':
    case 'closed_loop':
      if (spec.objectsCount !== spec.intervalsCount) {
        errors.push(
          `Interval subtype "${spec.subtype}" requires objectsCount (${spec.objectsCount}) === intervalsCount (${spec.intervalsCount})`
        );
      }
      break;
    case 'neither_end':
    case 'wood_cuts':
      if (spec.objectsCount !== spec.intervalsCount - 1) {
        errors.push(
          `Interval subtype "${spec.subtype}" requires objectsCount (${spec.objectsCount}) === intervalsCount - 1 (${spec.intervalsCount - 1})`
        );
      }
      break;
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Measurement & Chart CPA invariants.
 */
export function verifyMeasurementPictorial(spec: MeasurementPictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (!Number.isFinite(spec.expectedNumericResult) || spec.expectedNumericResult <= 0) {
    errors.push(`expectedNumericResult must be a positive finite number, got ${spec.expectedNumericResult}`);
  }

  if (spec.subtype === 'length_chart') {
    if (!spec.chartItems || spec.chartItems.length < 2) {
      errors.push('length_chart must contain at least 2 chartItems.');
    } else {
      const vals = spec.chartItems.map((c) => c.value);
      const maxV = Math.max(...vals);
      const minV = Math.min(...vals);
      if (spec.operation === 'chart_extremes_diff' && maxV - minV !== spec.expectedNumericResult) {
        errors.push(
          `chart_extremes_diff expected ${maxV} - ${minV} = ${maxV - minV}, got ${spec.expectedNumericResult}`
        );
      } else if (
        spec.operation === 'chart_target_value' &&
        !vals.includes(spec.expectedNumericResult)
      ) {
        errors.push(
          `chart_target_value expected one of [${vals.join(', ')}], got ${spec.expectedNumericResult}`
        );
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Singapore Math Perimeter & Composite Shape (Side-Shifting) invariants.
 */
export function verifyPerimeterPictorial(spec: PerimeterPictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (spec.outerWidth <= 0 || spec.outerHeight <= 0) {
    errors.push(
      `outerWidth (${spec.outerWidth}) and outerHeight (${spec.outerHeight}) must be > 0`
    );
  }

  let computedPerimeter = 0;
  switch (spec.shapeKind) {
    case 'square': {
      if (spec.outerWidth !== spec.outerHeight) {
        errors.push(
          `square requires outerWidth (${spec.outerWidth}) === outerHeight (${spec.outerHeight})`
        );
      }
      computedPerimeter = spec.outerWidth * 4;
      break;
    }
    case 'rectangle':
    case 'l_shape':
    case 'staircase': {
      if (spec.shapeKind === 'l_shape' || spec.shapeKind === 'staircase') {
        if (
          spec.cutWidth !== undefined &&
          (spec.cutWidth <= 0 || spec.cutWidth >= spec.outerWidth)
        ) {
          errors.push(
            `${spec.shapeKind} cutWidth (${spec.cutWidth}) must satisfy 0 < cutWidth < outerWidth (${spec.outerWidth})`
          );
        }
        if (
          spec.cutHeight !== undefined &&
          (spec.cutHeight <= 0 || spec.cutHeight >= spec.outerHeight)
        ) {
          errors.push(
            `${spec.shapeKind} cutHeight (${spec.cutHeight}) must satisfy 0 < cutHeight < outerHeight (${spec.outerHeight})`
          );
        }
      }
      computedPerimeter = 2 * (spec.outerWidth + spec.outerHeight);
      break;
    }
    case 'u_shape':
    case 't_shape': {
      const recess = spec.recessDepth ?? 0;
      if (recess <= 0 || recess >= spec.outerHeight) {
        errors.push(
          `${spec.shapeKind} recessDepth (${recess}) must satisfy 0 < recessDepth < outerHeight (${spec.outerHeight})`
        );
      }
      computedPerimeter = 2 * (spec.outerWidth + spec.outerHeight) + 2 * recess;
      break;
    }
    case 'joined_squares': {
      const side = spec.squareSide ?? 0;
      const cols = spec.gridCols ?? 1;
      const rows = spec.gridRows ?? 1;
      if (side <= 0 || cols <= 0 || rows <= 0) {
        errors.push(
          `joined_squares requires positive squareSide (${side}), gridCols (${cols}), gridRows (${rows})`
        );
      }
      if (spec.outerWidth !== side * cols || spec.outerHeight !== side * rows) {
        errors.push(
          `joined_squares outer dimensions (${spec.outerWidth}×${spec.outerHeight}) must match (${side * cols}×${side * rows})`
        );
      }
      computedPerimeter = 2 * (spec.outerWidth + spec.outerHeight);
      break;
    }
  }

  if (Math.abs(spec.expectedPerimeter - computedPerimeter) > 1e-6) {
    errors.push(
      `perimeter_shape (${spec.shapeKind}) expectedPerimeter (${spec.expectedPerimeter}) !== computed (${computedPerimeter})`
    );
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Singapore Place Value (4-digit up to 10,000) CPA invariants.
 */
export function verifyPlaceValuePictorial(spec: PlaceValuePictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (!Number.isInteger(spec.primaryNumber) || spec.primaryNumber < 0 || spec.primaryNumber > 10000) {
    errors.push(`primaryNumber (${spec.primaryNumber}) must be an integer in [0, 10000]`);
  }
  if (!Number.isFinite(spec.expectedResult) || spec.expectedResult < 0) {
    errors.push(`expectedResult (${spec.expectedResult}) must be a non-negative finite number`);
  }

  if (spec.mode === 'add_sub') {
    if (spec.secondaryNumber === undefined || !spec.operation) {
      errors.push('add_sub mode requires secondaryNumber and operation');
    } else {
      const computed =
        spec.operation === 'add'
          ? spec.primaryNumber + spec.secondaryNumber
          : spec.primaryNumber - spec.secondaryNumber;
      if (computed !== spec.expectedResult) {
        errors.push(
          `place_value add_sub invariant failed: ${spec.primaryNumber} ${spec.operation} ${spec.secondaryNumber} = ${computed}, expectedResult = ${spec.expectedResult}`
        );
      }
    }
  }

  if (spec.mode === 'number_line_round') {
    if (!spec.roundTo || spec.roundLow === undefined || spec.roundHigh === undefined) {
      errors.push('number_line_round mode requires roundTo, roundLow, and roundHigh');
    } else {
      if (spec.roundHigh - spec.roundLow !== spec.roundTo) {
        errors.push(
          `number_line_round interval (${spec.roundHigh} - ${spec.roundLow}) !== roundTo (${spec.roundTo})`
        );
      }
      if (spec.primaryNumber < spec.roundLow || spec.primaryNumber > spec.roundHigh) {
        errors.push(
          `primaryNumber (${spec.primaryNumber}) is outside [${spec.roundLow}, ${spec.roundHigh}]`
        );
      }
      const computedRounded = Math.round(spec.primaryNumber / spec.roundTo) * spec.roundTo;
      if (computedRounded !== spec.expectedResult) {
        errors.push(
          `number_line_round invariant failed: round(${spec.primaryNumber}, ${spec.roundTo}) = ${computedRounded}, got ${spec.expectedResult}`
        );
      }
    }
  }

  if (spec.mode === 'compare' && spec.secondaryNumber !== undefined) {
    if (spec.secondaryNumber < 0 || spec.secondaryNumber > 10000) {
      errors.push(`secondaryNumber (${spec.secondaryNumber}) must be in [0, 10000]`);
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Number Sequence Pattern CPA invariants.
 */
export function verifySequencePatternPictorial(
  spec: SequencePatternPictorialSpec
): MathVerificationResult {
  const errors: string[] = [];

  if (!spec.terms || spec.terms.length < 4) {
    errors.push('sequence_pattern must contain at least 4 terms');
    return { valid: false, errors };
  }
  if (spec.missingIndex < 0 || spec.missingIndex >= spec.terms.length) {
    errors.push(`missingIndex (${spec.missingIndex}) out of bounds for length ${spec.terms.length}`);
    return { valid: false, errors };
  }
  if (spec.terms[spec.missingIndex] !== spec.expectedValue) {
    errors.push(
      `sequence_pattern terms[${spec.missingIndex}] (${spec.terms[spec.missingIndex]}) !== expectedValue (${spec.expectedValue})`
    );
  }

  if (spec.patternKind === 'arithmetic') {
    const diff = spec.terms[1] - spec.terms[0];
    for (let i = 2; i < spec.terms.length; i++) {
      if (spec.terms[i] - spec.terms[i - 1] !== diff) {
        errors.push(
          `arithmetic sequence invariant failed at index ${i}: ${spec.terms[i]} - ${spec.terms[i - 1]} !== ${diff}`
        );
      }
    }
  } else if (spec.patternKind === 'increasing_diff') {
    const d0 = spec.terms[1] - spec.terms[0];
    const d1 = spec.terms[2] - spec.terms[1];
    const step2 = d1 - d0;
    for (let i = 3; i < spec.terms.length; i++) {
      const di = spec.terms[i] - spec.terms[i - 1];
      const prevD = spec.terms[i - 1] - spec.terms[i - 2];
      if (di - prevD !== step2) {
        errors.push(
          `increasing_diff second-order difference failed at index ${i}: (${di} - ${prevD}) !== ${step2}`
        );
      }
    }
  } else if (spec.patternKind === 'fibonacci_sum') {
    for (let i = 2; i < spec.terms.length; i++) {
      if (spec.terms[i] !== spec.terms[i - 1] + spec.terms[i - 2]) {
        errors.push(
          `fibonacci_sum failed at index ${i}: ${spec.terms[i]} !== ${spec.terms[i - 1]} + ${spec.terms[i - 2]}`
        );
      }
    }
  } else if (spec.patternKind === 'multiplicative') {
    if (spec.terms[0] > 0 && spec.terms[1] > spec.terms[0]) {
      const ratio = spec.terms[1] / spec.terms[0];
      for (let i = 2; i < spec.terms.length; i++) {
        if (Math.abs(spec.terms[i] - spec.terms[i - 1] * ratio) > 1e-6) {
          errors.push(`multiplicative (×${ratio}) failed at index ${i}`);
        }
      }
    } else if (spec.terms[1] > 0 && spec.terms[0] > spec.terms[1]) {
      const divRatio = spec.terms[0] / spec.terms[1];
      for (let i = 2; i < spec.terms.length; i++) {
        if (Math.abs(spec.terms[i] * divRatio - spec.terms[i - 1]) > 1e-6) {
          errors.push(`multiplicative (÷${divRatio}) failed at index ${i}`);
        }
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Verifies Area Grid & Area-Perimeter Link CPA invariants.
 */
export function verifyAreaGridPictorial(spec: AreaGridPictorialSpec): MathVerificationResult {
  const errors: string[] = [];

  if (spec.outerWidth <= 0 || spec.outerHeight <= 0) {
    errors.push(`outerWidth (${spec.outerWidth}) and outerHeight (${spec.outerHeight}) must be > 0`);
  }

  let computedArea = 0;
  switch (spec.shapeKind) {
    case 'unit_grid': {
      const full = spec.fullUnitTiles ?? spec.outerWidth * spec.outerHeight;
      const halves = spec.halfUnitTiles ?? 0;
      if (halves % 2 !== 0) {
        errors.push(`unit_grid halfUnitTiles (${halves}) must be even to form whole square units`);
      }
      computedArea = full + halves / 2;
      break;
    }
    case 'square_area': {
      if (spec.outerWidth !== spec.outerHeight) {
        errors.push(
          `square_area requires outerWidth (${spec.outerWidth}) === outerHeight (${spec.outerHeight})`
        );
      }
      computedArea = spec.outerWidth * spec.outerWidth;
      break;
    }
    case 'rect_area':
    case 'area_perim_link': {
      computedArea = spec.outerWidth * spec.outerHeight;
      break;
    }
    case 'l_shape_area': {
      const cw = spec.cutWidth ?? 0;
      const ch = spec.cutHeight ?? 0;
      if (cw <= 0 || cw >= spec.outerWidth || ch <= 0 || ch >= spec.outerHeight) {
        errors.push(
          `l_shape_area cutout (${cw}×${ch}) must fit strictly inside (${spec.outerWidth}×${spec.outerHeight})`
        );
      }
      computedArea = spec.outerWidth * spec.outerHeight - cw * ch;
      break;
    }
    case 'frame_border': {
      const iw = spec.innerWidth ?? 0;
      const ih = spec.innerHeight ?? 0;
      if (iw <= 0 || iw >= spec.outerWidth || ih <= 0 || ih >= spec.outerHeight) {
        errors.push(
          `frame_border inner (${iw}×${ih}) must fit strictly inside (${spec.outerWidth}×${spec.outerHeight})`
        );
      }
      computedArea = spec.outerWidth * spec.outerHeight - iw * ih;
      break;
    }
  }

  if (Math.abs(spec.expectedArea - computedArea) > 1e-6) {
    errors.push(
      `area_grid (${spec.shapeKind}) expectedArea (${spec.expectedArea}) !== computed (${computedArea})`
    );
  }

  if (spec.expectedPerimeter !== undefined) {
    const computedPerim = 2 * (spec.outerWidth + spec.outerHeight);
    if (Math.abs(spec.expectedPerimeter - computedPerim) > 1e-6) {
      errors.push(
        `area_grid expectedPerimeter (${spec.expectedPerimeter}) !== 2*(${spec.outerWidth}+${spec.outerHeight}) = ${computedPerim}`
      );
    }
  }

  if (!Number.isFinite(spec.expectedNumericResult) || spec.expectedNumericResult <= 0) {
    errors.push(`area_grid expectedNumericResult (${spec.expectedNumericResult}) must be > 0`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Master verifier for a complete SingaporeCPASpec object and its parent question.
 */
export function verifySingaporeCPASpec(
  cpaSpec: SingaporeCPASpec,
  correctAnswer: string,
  options: string[]
): MathVerificationResult {
  const errors: string[] = [];

  // 1. Concrete layer checks
  if (!cpaSpec.concrete || !cpaSpec.concrete.groups || cpaSpec.concrete.groups.length === 0) {
    errors.push('Concrete layer must have at least one group.');
  } else {
    for (const g of cpaSpec.concrete.groups) {
      if (g.count <= 0 || g.unitValue <= 0) {
        errors.push(`Concrete group "${g.id}" has non-positive count (${g.count}) or unitValue (${g.unitValue})`);
      }
      if (Math.abs(g.count * g.unitValue - g.totalValue) > 1e-6) {
        errors.push(
          `Concrete group "${g.id}" count(${g.count}) * unitValue(${g.unitValue}) !== totalValue(${g.totalValue})`
        );
      }
    }
  }

  // 2. Pictorial layer checks
  const pic = cpaSpec.pictorial;
  let picResult: MathVerificationResult = { valid: true, errors: [] };
  if (pic.kind === 'bar_model') {
    picResult = verifyBarModelPictorial(pic);
  } else if (pic.kind === 'remainder_groups') {
    picResult = verifyRemainderPictorial(pic);
  } else if (pic.kind === 'interval_model') {
    picResult = verifyIntervalPictorial(pic);
  } else if (pic.kind === 'measurement_lab') {
    picResult = verifyMeasurementPictorial(pic);
  } else if (pic.kind === 'perimeter_shape') {
    picResult = verifyPerimeterPictorial(pic);
  } else if (pic.kind === 'place_value_chart') {
    picResult = verifyPlaceValuePictorial(pic);
  } else if (pic.kind === 'sequence_pattern') {
    picResult = verifySequencePatternPictorial(pic);
  } else if (pic.kind === 'area_grid') {
    picResult = verifyAreaGridPictorial(pic);
  }
  errors.push(...picResult.errors);

  // 3. Abstract layer checks
  if (!cpaSpec.abstract.guidedLatexSteps || cpaSpec.abstract.guidedLatexSteps.length === 0) {
    errors.push('Abstract layer must provide guidedLatexSteps.');
  }
  if (!cpaSpec.abstract.fullLatexSteps || cpaSpec.abstract.fullLatexSteps.length === 0) {
    errors.push('Abstract layer must provide fullLatexSteps.');
  }
  if (!cpaSpec.abstract.finalAnswerLatex) {
    errors.push('Abstract layer must provide finalAnswerLatex.');
  }

  // 4. Verify correctAnswer is included in options and matches finalNumericValue
  if (!options.includes(correctAnswer)) {
    errors.push(`correctAnswer "${correctAnswer}" is not present in options [${options.join(', ')}]`);
  }

  const numericMatches = correctAnswer.match(/\d+/g);
  if (numericMatches && numericMatches.length > 0) {
    const nums = numericMatches.map((n) => parseInt(n, 10));
    if (!nums.includes(cpaSpec.abstract.finalNumericValue)) {
      errors.push(
        `correctAnswer "${correctAnswer}" numeric tokens [${nums.join(', ')}] do not include abstract.finalNumericValue (${cpaSpec.abstract.finalNumericValue})`
      );
    }
  }

  return { valid: errors.length === 0, errors };
}
