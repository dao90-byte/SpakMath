import {
  SingaporeCPASpec,
  BarModelPictorialSpec,
  RemainderPictorialSpec,
  IntervalPictorialSpec,
  MeasurementPictorialSpec,
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
      }
    }
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
