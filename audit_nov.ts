import { NOVEMBER_IN_MONTH_DAYS, NOVEMBER_FINAL_EXAM } from './src/data/inMonthNovemberData';
import { NOVEMBER_WEEKLY_TESTS, evaluateWeeklyReasoningText } from './src/data/inMonthWeeklyTestsData';
import { getInMonthQuestionInputSpec, isInMonthAnswerCorrect } from './src/utils/inMonthAnswerUtils';
import { attachCPAToQuestion } from './src/utils/singaporeCPABuilder';

interface AuditIssue {
  id: string;
  source: string;
  severity: 'ERROR' | 'WARN';
  message: string;
  detail?: string;
}

const issues: AuditIssue[] = [];

function checkTextArtifacts(id: string, source: string, q: any) {
  const fields: Array<[string, string | undefined]> = [
    ['prompt', q.prompt],
    ['hint', q.hint],
    ['explanation', q.explanation],
    ['stepByStepExplanation', Array.isArray(q.stepByStepExplanation) ? q.stepByStepExplanation.join('\n') : undefined],
    ['reasoningPrompt', q.reasoningPrompt],
    ['reasoningSampleAnswer', q.reasoningSampleAnswer],
  ];

  for (const [fname, val] of fields) {
    if (!val) continue;
    if (val.includes('$') && !val.includes('giá') && !val.includes('đô')) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `Unrendered '$' in ${fname}`,
        detail: val,
      });
    }
    if (/\\frac|\\times|\\div|\\text/.test(val)) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `Raw LaTeX command in ${fname}`,
        detail: val,
      });
    }
    if (val.includes('undefined') || val.includes('NaN')) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `Contains undefined/NaN in ${fname}`,
        detail: val,
      });
    }
  }

  if (q.prompt) {
    const qMarks = (q.prompt.match(/\?/g) || []).length;
    if (qMarks > 1 && !id.includes('-w')) {
      issues.push({
        id,
        source,
        severity: 'WARN',
        message: `Multiple '?' marks (${qMarks}) in prompt (only 1 input box exists)`,
        detail: `${q.prompt} => Answer: ${q.correctAnswer}`,
      });
    }
  }
}

function checkAnswerSpec(id: string, source: string, correctAnswer: string, prompt: string) {
  if (!correctAnswer || correctAnswer.trim() === '') {
    issues.push({ id, source, severity: 'ERROR', message: 'Empty correctAnswer' });
    return;
  }

  if (/\d\.\d{3}/.test(correctAnswer)) {
    issues.push({
      id,
      source,
      severity: 'ERROR',
      message: `Thousand dot in correctAnswer breaks regex \\d+ parser`,
      detail: correctAnswer,
    });
  }

  const spec = getInMonthQuestionInputSpec(correctAnswer);
  if (!isInMonthAnswerCorrect(correctAnswer, correctAnswer)) {
    issues.push({
      id,
      source,
      severity: 'ERROR',
      message: `Exact correctAnswer fails isInMonthAnswerCorrect`,
      detail: correctAnswer,
    });
  }

  if (spec.mode === 'text_number') {
    if (spec.expectedNumber === null) {
      issues.push({
        id,
        source,
        severity: 'WARN',
        message: `text_number has null expectedNumber (plain text compare)`,
        detail: correctAnswer,
      });
    } else {
      if (!isInMonthAnswerCorrect(String(spec.expectedNumber), correctAnswer)) {
        issues.push({
          id,
          source,
          severity: 'ERROR',
          message: `Typing expectedNumber '${spec.expectedNumber}' fails grading`,
          detail: correctAnswer,
        });
      }
      const allNums = correctAnswer.match(/\d+/g) || [];
      if (allNums.length > 1) {
        issues.push({
          id,
          source,
          severity: 'ERROR',
          message: `Multiple numbers in correctAnswer not parsed as division_remainder`,
          detail: `${correctAnswer} (spec: ${JSON.stringify(spec)})`,
        });
      }
      if (
        spec.prefixLabel &&
        spec.prefixLabel.length > 0 &&
        !['Dư', 'Thứ', 'Còn', 'Số dư lớn nhất là', 'Cần thêm', 'Ít nhất'].some((p) =>
          spec.prefixLabel.includes(p)
        )
      ) {
        issues.push({
          id,
          source,
          severity: 'WARN',
          message: `prefixLabel '${spec.prefixLabel}' not displayed in UI`,
          detail: `${correctAnswer} | Prompt: ${prompt}`,
        });
      }
    }
  } else if (spec.mode === 'division_remainder') {
    if (!spec.expectedQuotient || spec.expectedRemainder === null) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `Invalid division_remainder parse`,
        detail: `${correctAnswer} => ${JSON.stringify(spec)}`,
      });
    }
    const testVal = `Thương ${spec.expectedQuotient} dư ${spec.expectedRemainder}`;
    if (!isInMonthAnswerCorrect(testVal, correctAnswer)) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `division_remainder testVal fails grading`,
        detail: `${testVal} vs ${correctAnswer}`,
      });
    }
  }
}

function checkCPAAndVisual(id: string, source: string, q: any, isReasoningTest = false) {
  const vm = q.visualModel;
  if (!vm) {
    issues.push({ id, source, severity: 'WARN', message: 'Missing visualModel' });
    return;
  }

  const enriched = vm.cpaSpec ? q : attachCPAToQuestion(q);
  const cpa = enriched.visualModel?.cpaSpec;
  if (!cpa) {
    issues.push({ id, source, severity: 'WARN', message: 'Missing cpaSpec after attachCPAToQuestion' });
    return;
  }

  const spec = getInMonthQuestionInputSpec(q.correctAnswer || '');
  const ansNum = spec.expectedNumber;

  // 1. Check Bar Model pictorial & SVG
  if (cpa.pictorial.kind === 'bar_model') {
    const pic = cpa.pictorial;
    const allBars = [...pic.bars, ...(pic.beforeBars || []), ...(pic.afterBars || [])];
    for (const bar of allBars) {
      const expected = bar.units * bar.unitValue + (bar.offsetValue || 0);
      if (bar.numericValue !== expected) {
        issues.push({
          id,
          source,
          severity: 'ERROR',
          message: `Bar '${bar.label}' numericValue (${bar.numericValue}) != units(${bar.units})*unitValue(${bar.unitValue})+offset(${bar.offsetValue || 0})=${expected}`,
        });
      }
      if (bar.numericValue <= 0 || bar.unitValue <= 0) {
        issues.push({
          id,
          source,
          severity: 'ERROR',
          message: `Bar '${bar.label}' has non-positive numericValue(${bar.numericValue}) or unitValue(${bar.unitValue})`,
        });
      }
      if ((bar.offsetValue || 0) < 0) {
        issues.push({
          id,
          source,
          severity: 'WARN',
          message: `Bar '${bar.label}' has negative offsetValue (${bar.offsetValue})`,
        });
      }
      if (!bar.isUnknown) {
        if (/=/.test(bar.displayValue)) {
          issues.push({
            id,
            source,
            severity: 'ERROR',
            message: `SPOILER/COMPUTATION: Non-unknown bar '${bar.label}' displayValue shows '=': '${bar.displayValue}' (ans=${q.correctAnswer})`,
          });
        }
        if (ansNum !== null && ansNum >= 2 && (bar.displayValue === String(ansNum) || bar.displayValue.includes(`${ansNum} `) || bar.unitValue === ansNum)) {
          issues.push({
            id,
            source,
            severity: 'WARN',
            message: `Potential bar leak: non-unknown bar '${bar.label}' has unitValue=${bar.unitValue}, displayValue='${bar.displayValue}' while ans=${q.correctAnswer}`,
          });
        }
      }
      if (bar.label.length > 18) {
        issues.push({
          id,
          source,
          severity: 'WARN',
          message: `Long bar label (${bar.label.length} chars) may overflow 136px SVG label box: '${bar.label}'`,
        });
      }
    }

    if (pic.totalBracket && !pic.totalBracket.isUnknown && ansNum !== null && pic.totalBracket.numericValue === ansNum) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `SPOILER: totalBracket '${pic.totalBracket.displayLabel}' numericValue=${pic.totalBracket.numericValue} is not marked isUnknown while ans=${q.correctAnswer}`,
      });
    }
    if (pic.differenceBracket && !pic.differenceBracket.isUnknown && ansNum !== null && pic.differenceBracket.numericValue === ansNum) {
      issues.push({
        id,
        source,
        severity: 'WARN',
        message: `Check differenceBracket '${pic.differenceBracket.displayLabel}' (numericValue=${pic.differenceBracket.numericValue}) vs ans=${q.correctAnswer}`,
      });
    }
  }

  // 2. Check Remainder Groups
  if (cpa.pictorial.kind === 'remainder_groups') {
    const pic = cpa.pictorial;
    if (pic.quotient * pic.divisor + pic.remainder !== pic.dividend || pic.remainder < 0 || pic.remainder >= pic.divisor) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `Remainder math mismatch: dividend=${pic.dividend}, div=${pic.divisor}, quo=${pic.quotient}, rem=${pic.remainder}`,
      });
    }
    if (pic.unknownTarget === 'dividend' && q.correctAnswer && !q.prompt.includes('số bị chia') && !q.prompt.includes('tất cả') && !q.prompt.includes('chia cho')) {
      issues.push({
        id,
        source,
        severity: 'WARN',
        message: `Remainder unknownTarget is dividend (${pic.dividend}) — verify matches prompt`,
      });
    }
  }

  // 3. Check Interval Model
  if (cpa.pictorial.kind === 'interval_model') {
    const pic = cpa.pictorial;
    if (pic.stepLength > 0 && pic.intervalsCount > 0 && pic.intervalsCount * pic.stepLength !== pic.totalLength) {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `Interval length mismatch: iv(${pic.intervalsCount})*step(${pic.stepLength})=${pic.intervalsCount * pic.stepLength} != totalLength(${pic.totalLength})`,
      });
    }
    // Check if totalLength equals answer but unknownTarget !== 'total_length'!
    if (ansNum !== null && pic.totalLength === ansNum && pic.unknownTarget !== 'total_length') {
      issues.push({
        id,
        source,
        severity: 'ERROR',
        message: `SPOILER in CPASvgIntervalDiagram: totalLength=${pic.totalLength} equals ans=${q.correctAnswer} but unknownTarget='${pic.unknownTarget}' (must be 'total_length' so SVG hides summary!)`,
      });
    }
  }

  // 4. Check Measurement Lab
  if (cpa.pictorial.kind === 'measurement_lab') {
    const pic = cpa.pictorial;
    if (pic.chartItems && ansNum !== null) {
      const askedExplicitItem = pic.chartItems.find(
        (ci: any) => ci.value === ansNum && q.prompt.toLowerCase().includes(ci.label.toLowerCase())
      );
      if (askedExplicitItem) {
        issues.push({
          id,
          source,
          severity: 'ERROR',
          message: `SPOILER in bar chart: item '${askedExplicitItem.label}' literally displays '${askedExplicitItem.value} ${askedExplicitItem.unit}' which is the exact answer '${q.correctAnswer}'!`,
        });
      }
    }
    if (pic.secondaryReading && ansNum !== null && ansNum >= 10) {
      // Simulate getDisplaySecondaryReading
      const r = pic.secondaryReading;
      const safePrefixPattern = /^(Rót ra:|Cắt đi:|Bình B:|Nửa hũ:|Phần chồng =|Lấy ra:|Nửa thùng:)/;
      let shown = r;
      if (!r.includes('?') && !safePrefixPattern.test(r)) {
        const eqIdx = r.indexOf('=');
        const colonIdx = r.indexOf(':');
        if (eqIdx > 0 && !/[+\-:×]/.test(r.slice(0, eqIdx))) {
          shown = `${r.slice(0, eqIdx).trim()} = ?`;
        } else if (colonIdx > 0) {
          shown = `${r.slice(0, colonIdx).trim()} = ?`;
        } else if (r.trim().startsWith('=')) {
          shown = '= ?';
        } else {
          shown = 'Cần quy đổi & tính toán = ?';
        }
      }
      if (new RegExp(`(?<!\\d)${ansNum}(?!\\d)`).test(shown) && !new RegExp(`(?<!\\d)${ansNum}(?!\\d)`).test(q.prompt)) {
        issues.push({
          id,
          source,
          severity: 'ERROR',
          message: `SPOILER in secondaryReading shown before answering: '${shown}' reveals '${ansNum}'`,
        });
      }
    }
  }

  // 5. Check Concrete Groups spoilers
  for (const g of cpa.concrete.groups) {
    if (!g.isUnknown && ansNum !== null && ansNum >= 10) {
      if (g.totalValue === ansNum || g.unitValue === ansNum) {
        if (!isReasoningTest && !new RegExp(`(?<!\\d)${ansNum}(?!\\d)`).test(q.prompt)) {
          issues.push({
            id,
            source,
            severity: 'WARN',
            message: `Concrete group '${g.label}' (!isUnknown) exposes totalValue=${g.totalValue}/unitValue=${g.unitValue} matching ans=${q.correctAnswer}`,
          });
        }
      }
    }
  }

  // 6. Check Guided LaTeX Steps for leaked answer number (when that number isn't in the prompt!)
  if (ansNum !== null && ansNum >= 2) {
    const numStr = String(ansNum);
    const inPrompt = new RegExp(`(?<!\\d)${numStr}(?!\\d)`).test(q.prompt || '');
    if (!inPrompt) {
      for (const step of cpa.abstract.guidedLatexSteps) {
        if (new RegExp(`(?<!\\d)${numStr}(?!\\d)`).test(step)) {
          issues.push({
            id,
            source,
            severity: 'ERROR',
            message: `SPOILER in guidedLatexSteps (ans '${numStr}' not in prompt!): '${step}'`,
          });
        }
      }
    }
  }
}

// Run audits
for (const day of NOVEMBER_IN_MONTH_DAYS) {
  for (const q of day.questions) {
    checkTextArtifacts(q.id, `Day ${day.dayNumber}`, q);
    checkAnswerSpec(q.id, `Day ${day.dayNumber}`, q.correctAnswer, q.prompt);
    checkCPAAndVisual(q.id, `Day ${day.dayNumber}`, q);
  }
}

for (const wt of NOVEMBER_WEEKLY_TESTS) {
  for (const q of wt.questions) {
    checkTextArtifacts(q.id, `Weekly ${wt.weekNumber}`, q);
    if (q.section !== 'reasoning') {
      checkAnswerSpec(q.id, `Weekly ${wt.weekNumber}`, q.correctAnswer, q.prompt);
    } else {
      const evalRes = evaluateWeeklyReasoningText(q.reasoningSampleAnswer, q.reasoningKeywords);
      if (!evalRes.isComplete || evalRes.points < 5) {
        issues.push({ id: q.id, source: `Weekly ${wt.weekNumber}`, severity: 'ERROR', message: 'Sample answer fails evaluator' });
      }
    }
    checkCPAAndVisual(q.id, `Weekly ${wt.weekNumber}`, q, q.section === 'reasoning');
  }
}

for (const q of NOVEMBER_FINAL_EXAM.questions) {
  checkTextArtifacts(q.id, 'Final Exam', q);
  checkAnswerSpec(q.id, 'Final Exam', q.correctAnswer, q.prompt);
  checkCPAAndVisual(q.id, 'Final Exam', q);
}

const errors = issues.filter((i) => i.severity === 'ERROR');
const warns = issues.filter((i) => i.severity === 'WARN');
console.log(`Errors: ${errors.length}, Warnings: ${warns.length}`);
console.log('\n--- ERRORS ---');
for (const e of errors) {
  console.log(`[ERROR] ${e.source} (${e.id}): ${e.message}${e.detail ? `\n    -> ${e.detail}` : ''}`);
}
console.log('\n--- WARNINGS ---');
for (const w of warns) {
  console.log(`[WARN] ${w.source} (${w.id}): ${w.message}${w.detail ? `\n    -> ${w.detail}` : ''}`);
}
