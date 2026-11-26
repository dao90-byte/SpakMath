import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  DECEMBER_FINAL_EXAM,
  DECEMBER_IN_MONTH_DAYS,
} from '../data/inMonthDecemberData';
import { DECEMBER_WEEKLY_TESTS } from '../data/inMonthDecemberWeeklyTestsData';
import { evaluateWeeklyReasoningText } from '../data/inMonthWeeklyTestsData';
import { GRADE_3_IN_MONTH_PROGRAMS } from '../data/inMonthGrade3Catalog';
import {
  getInMonthQuestionInputSpec,
  isInMonthAnswerCorrect,
} from '../utils/inMonthAnswerUtils';
import {
  verifyBarModelPictorial,
  verifyMeasurementPictorial,
  verifyPerimeterPictorial,
  verifySingaporeCPASpec,
} from '../utils/singaporeCPAVerifier';
import {
  ALL_COSMIC_LESSON_IDS,
  INITIAL_COSMIC_PROGRESS,
} from '../utils/cosmicProgressStorage';

describe('Tháng 12 — Kiểm chứng Toán học & Khung Chuẩn 20 Buổi Singapore CPA (246 câu: 20 Buổi + 4 Đề 15p + Đề Cuối Kỳ 45–60p)', () => {
  const allDailyQuestions = DECEMBER_IN_MONTH_DAYS.flatMap((d) => d.questions);
  const allWeeklyQuestions = DECEMBER_WEEKLY_TESTS.flatMap((w) => w.questions);
  const allExamQuestions = DECEMBER_FINAL_EXAM.questions;
  const allQuestions = [
    ...allDailyQuestions,
    ...allWeeklyQuestions,
    ...allExamQuestions,
  ];

  it('Đạt đúng khung chuẩn 20 buổi (4 tuần × 5 buổi = 220 câu), 4 đề 15p sau Buổi 5–10–15–20 (mỗi đề 3 Tính toán + 1 Nghị luận = 16 câu), và Đề Cuối Kỳ 45–60p gồm 5 Cơ bản + 3 Olympic + 2 Nghị luận (10 câu) = 246 câu', () => {
    expect(DECEMBER_IN_MONTH_DAYS.length).toBe(20);
    expect(allDailyQuestions.length).toBe(220);
    expect(DECEMBER_WEEKLY_TESTS.length).toBe(4);
    expect(allWeeklyQuestions.length).toBe(16);
    expect(allExamQuestions.length).toBe(10);
    expect(allQuestions.length).toBe(246);

    // Kiểm tra phân bổ 4 tuần × 5 buổi liên tiếp 1..20
    DECEMBER_IN_MONTH_DAYS.forEach((session, idx) => {
      const expectedNum = idx + 1;
      const expectedWeek = Math.floor(idx / 5) + 1;
      expect(session.dayNumber).toBe(expectedNum);
      expect(session.weekNumber).toBe(expectedWeek);
      expect(session.title).toMatch(new RegExp(`^Buổi ${expectedNum}:`));
      expect(session.questions.length).toBe(11);
    });

    // Kiểm tra 4 đề 15p đặt sau buổi 5, 10, 15, 20
    expect(DECEMBER_WEEKLY_TESTS.map((w) => w.weekNumber)).toEqual([1, 2, 3, 4]);
    expect(DECEMBER_WEEKLY_TESTS.map((w) => w.triggerAfterDayNumber)).toEqual([5, 10, 15, 20]);
    expect(DECEMBER_WEEKLY_TESTS.map((w) => w.unlocksDayNumber)).toEqual([6, 11, 16, undefined]);

    for (const wt of DECEMBER_WEEKLY_TESTS) {
      expect(wt.monthNumber).toBe(12);
      expect(wt.monthLabel).toBe('Tháng 12');
      expect(wt.durationMinutes).toBe(15);
      expect(wt.questions.length).toBe(4);
      expect(wt.subtitle.toLowerCase()).not.toContain('mở khóa');
      const calcQs = wt.questions.filter((q) => q.section === 'calculation');
      const reasonQs = wt.questions.filter((q) => q.section === 'reasoning');
      expect(calcQs.length).toBe(3);
      expect(reasonQs.length).toBe(1);
      expect(calcQs.reduce((s, q) => s + q.points, 0)).toBe(60);
      expect(reasonQs.reduce((s, q) => s + q.points, 0)).toBe(40);
      const totalPts = wt.questions.reduce((s, q) => s + q.points, 0);
      expect(totalPts).toBe(100);
      for (const q of wt.questions) {
        expect(q.relatedDayNumbers.length).toBeGreaterThan(0);
        for (const dNum of q.relatedDayNumbers) {
          expect(dNum).toBeGreaterThanOrEqual(1);
          expect(dNum).toBeLessThanOrEqual(20);
        }
      }
      for (const rq of reasonQs) {
        expect(rq.reasoningPrompt && rq.reasoningPrompt.length > 10).toBe(true);
        expect(rq.reasoningKeywords && rq.reasoningKeywords.length >= 3).toBe(true);
        expect(rq.reasoningSampleAnswer && rq.reasoningSampleAnswer.length > 10).toBe(true);
      }
    }

    // Kiểm tra Đề Cuối Kỳ 45–60p: 5 Cơ bản (50đ) + 3 Olympic (30đ) + 2 Nghị luận (20đ) = 100đ
    expect(DECEMBER_FINAL_EXAM.durationMinutes).toBeGreaterThanOrEqual(45);
    expect(DECEMBER_FINAL_EXAM.durationMinutes).toBeLessThanOrEqual(60);
    expect(DECEMBER_FINAL_EXAM.durationRangeLabel).toBe('45–60 phút');
    const partA = allExamQuestions.filter((q) => q.part === 'A');
    const partB = allExamQuestions.filter((q) => q.part === 'B');
    const partC = allExamQuestions.filter((q) => q.part === 'C');
    expect(partA.length).toBe(5);
    expect(partB.length).toBe(3);
    expect(partC.length).toBe(2);
    expect(partA.reduce((s, q) => s + q.points, 0)).toBe(50);
    expect(partB.reduce((s, q) => s + q.points, 0)).toBe(30);
    expect(partC.reduce((s, q) => s + q.points, 0)).toBe(20);
    expect(allExamQuestions.reduce((s, q) => s + q.points, 0)).toBe(100);

    // Đề cuối kỳ phủ đủ 4 trụ cột năng lực và mọi relatedDayNumbers nằm trong 1..20
    const examPillars = new Set(allExamQuestions.map((q) => q.skillDomain));
    expect(examPillars).toEqual(new Set(['interval', 'bar_model', 'remainder', 'measurement']));
    for (const q of allExamQuestions) {
      for (const dNum of q.relatedDayNumbers) {
        expect(dNum).toBeGreaterThanOrEqual(1);
        expect(dNum).toBeLessThanOrEqual(20);
      }
    }
    for (const cq of partC) {
      expect(cq.reasoningPrompt && cq.reasoningPrompt.length > 10).toBe(true);
      expect(cq.reasoningKeywords && cq.reasoningKeywords.length >= 3).toBe(true);
      expect(cq.reasoningSampleAnswer && cq.reasoningSampleAnswer.length > 10).toBe(true);
    }
  });

  it('Tháng 12 được gắn chuẩn xác trong danh mục Lớp 3 (GRADE_3_IN_MONTH_PROGRAMS) theo khung 20 buổi (4 tuần × 5 buổi)', () => {
    const decProgram = GRADE_3_IN_MONTH_PROGRAMS.find((p) => p.monthNumber === 12);
    expect(decProgram).toBeDefined();
    expect(decProgram?.unitLabel).toBe('Buổi');
    expect(decProgram?.days.length).toBe(20);
    expect(decProgram?.weeksMeta.length).toBe(4);
    expect(decProgram?.weeksMeta.map((w) => w.daysRange)).toEqual([
      [1, 5],
      [6, 10],
      [11, 15],
      [16, 20],
    ]);
    expect(decProgram?.weeklyTests?.length).toBe(4);
    expect(decProgram?.finalExam.questions.length).toBe(10);
  });

  it('Mặc định mở khóa toàn bộ 7 bài học SGK Lớp 3 trong INITIAL_COSMIC_PROGRESS', () => {
    expect(INITIAL_COSMIC_PROGRESS.unlockedLessons.length).toBe(ALL_COSMIC_LESSON_IDS.length);
    for (const id of ALL_COSMIC_LESSON_IDS) {
      expect(INITIAL_COSMIC_PROGRESS.unlockedLessons).toContain(id);
    }
  });

  it('Toàn bộ 246 câu hỏi Tháng 12 đều có cpaSpec hợp lệ và vượt qua bộ kiểm chứng bất biến Toán học', () => {
    const failures: string[] = [];

    for (const q of allQuestions) {
      const cpa = q.visualModel.cpaSpec;
      if (!cpa) {
        failures.push(`[${q.id}] Thiếu cpaSpec`);
        continue;
      }
      const report = verifySingaporeCPASpec(cpa, q.correctAnswer, q.options);
      if (!report.valid) {
        failures.push(`[${q.id}] ${report.errors.join(' | ')}`);
      }
    }

    expect(failures).toEqual([]);
  });

  it('Kiểm chứng chuyên sâu Hình học Chu vi & Kỹ thuật Dời cạnh (Tuần 1, Tuần 2 & Đề tuần): Square, Rectangle, Joined Squares, L-shape, Staircase, U-shape', () => {
    const perimQs = allQuestions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'perimeter_shape'
    );
    expect(perimQs.length).toBeGreaterThanOrEqual(95);

    const shapeCounts: Record<string, number> = {};
    for (const q of perimQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'perimeter_shape') {
        const res = verifyPerimeterPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        shapeCounts[pic.shapeKind] = (shapeCounts[pic.shapeKind] || 0) + 1;
      }
    }

    expect(shapeCounts.square).toBeGreaterThanOrEqual(10);
    expect(shapeCounts.rectangle).toBeGreaterThanOrEqual(20);
    expect(shapeCounts.joined_squares).toBeGreaterThanOrEqual(10);
    expect(shapeCounts.l_shape).toBeGreaterThanOrEqual(8);
    expect(shapeCounts.staircase).toBeGreaterThanOrEqual(5);
    expect(shapeCounts.u_shape).toBeGreaterThanOrEqual(8);
  });

  it('Kiểm chứng chuyên sâu Đo lường Khối lượng (kg–g) & Thể tích (L–mL) trên toàn bộ bài tập và đề kiểm tra Tháng 12', () => {
    const measQs = allQuestions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'measurement_lab'
    );
    expect(measQs.length).toBeGreaterThanOrEqual(80);

    for (const q of measQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'measurement_lab') {
        const res = verifyMeasurementPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        if (pic.subtype !== 'length_chart') {
          expect(pic.visualParams?.mode).toBeTruthy();
        }
        // Top-level visualModel readings must stay synchronized with cpaSpec.pictorial
        if (q.visualModel.primaryReading && pic.primaryReading) {
          expect(q.visualModel.primaryReading, `[${q.id}] lệch primaryReading`).toBe(pic.primaryReading);
        }
        if (q.visualModel.secondaryReading && pic.secondaryReading) {
          expect(q.visualModel.secondaryReading, `[${q.id}] lệch secondaryReading`).toBe(pic.secondaryReading);
        }
        // Subtraction mode on weight_balance must satisfy operands[0] - operands[1] === expectedNumericResult
        if (pic.subtype === 'weight_balance' && pic.visualParams?.mode === 'subtract') {
          expect(
            pic.operands[0] - pic.operands[1],
            `[${q.id}] phép trừ khối lượng không khớp expectedNumericResult`
          ).toBe(pic.expectedNumericResult);
        }
        // Balance scale must never place "Đĩa phải" on the left pan
        if (pic.subtype === 'weight_balance' && pic.visualParams?.mode === 'balance_eq') {
          expect(pic.visualParams.labelA || '', `[${q.id}] đảo đĩa cân`).not.toMatch(/Đĩa phải/i);
        }
      }
    }
  });

  it('Kiểm chứng toàn bộ sơ đồ thanh Bar Model xuất hiện trong Tháng 12 (San giỏ, San bình, Toán ngược)', () => {
    const barQs = allQuestions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'bar_model'
    );
    expect(barQs.length).toBeGreaterThan(0);

    const invalidBlocks: string[] = [];
    for (const q of barQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'bar_model') {
        const res = verifyBarModelPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);

        const allBars = [
          ...pic.bars,
          ...(pic.beforeBars || []),
          ...(pic.afterBars || []),
        ];
        for (const bar of allBars) {
          // Never leave isUnknown=false when displayValue contains '?' (would render solved numericValue before solving)
          expect(
            !bar.isUnknown && bar.displayValue.includes('?'),
            `[${q.id}] bar "${bar.id}" lộ số đã giải trước khi làm bài`
          ).toBe(false);
          for (const blk of bar.blocks) {
            if (blk.numericValue <= 0) {
              invalidBlocks.push(`[${q.id}] Bar "${bar.id}" block có numericValue <= 0 (${blk.numericValue})`);
            }
          }
        }

        // Before-after transfer bar IDs must exist in both beforeBars and afterBars so transfer invariant actually runs
        if (pic.family === 'before_after' && pic.beforeBars && pic.afterBars && pic.transferSpec) {
          expect(pic.beforeBars.some((b) => b.id === pic.transferSpec!.fromBarId)).toBe(true);
          expect(pic.afterBars.some((b) => b.id === pic.transferSpec!.fromBarId)).toBe(true);
          expect(pic.beforeBars.some((b) => b.id === pic.transferSpec!.toBarId)).toBe(true);
          expect(pic.afterBars.some((b) => b.id === pic.transferSpec!.toBarId)).toBe(true);
        }
      }
    }

    expect(invalidBlocks).toEqual([]);
  });

  it('Toàn bộ biểu thức LaTeX trong bước Abstract của 246 câu hỏi Tháng 12 đều render KaTeX chính xác 100%', () => {
    const latexErrors: string[] = [];

    for (const q of allQuestions) {
      const cpa = q.visualModel.cpaSpec!;
      const allFormulas = [
        ...cpa.abstract.guidedLatexSteps,
        ...cpa.abstract.fullLatexSteps,
        cpa.abstract.finalAnswerLatex,
      ];

      for (const formula of allFormulas) {
        try {
          const html = katex.renderToString(formula, {
            throwOnError: true,
            displayMode: false,
            strict: false,
          });
          if (!html || !html.includes('katex')) {
            latexErrors.push(`[${q.id}] KaTeX output rỗng cho công thức: ${formula}`);
          }
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          latexErrors.push(`[${q.id}] Lỗi cú pháp LaTeX (${formula}): ${msg}`);
        }
      }
    }

    expect(latexErrors).toEqual([]);
  });

  it('Tất cả 246 câu hỏi Tháng 12 đều ẩn phép tính (\\;?\\;) và kết quả chưa giải (= ?) trong guidedLatexSteps', () => {
    const leaks: string[] = [];

    for (const q of allQuestions) {
      const cpa = q.visualModel.cpaSpec!;
      const guided = cpa.abstract.guidedLatexSteps;

      if (!guided || guided.length === 0) {
        leaks.push(`[${q.id}] guidedLatexSteps rỗng`);
        continue;
      }

      const hasQuestionMark = guided.some((step) => step.includes('?'));
      if (!hasQuestionMark) {
        leaks.push(`[${q.id}] guidedLatexSteps thiếu dấu ? ẩn phép tính/đáp án`);
      }

      for (const step of guided) {
        const mathOnly = step.replace(/\\text\{[^}]*\}/g, ' ').trim();

        if (/\\times|\\div|[+\-]/.test(mathOnly)) {
          leaks.push(`[${q.id}] Lộ dấu phép tính trong hướng dẫn: ${step}`);
        }
        if (step.includes('?') && /=\s*\d+(?:\s*$|\s*\))/.test(mathOnly)) {
          leaks.push(`[${q.id}] Lộ kết quả số đã giải ở bước tính: ${step}`);
        }
        if (
          cpa.abstract.finalNumericValue > 0 &&
          new RegExp(`=\\s*${cpa.abstract.finalNumericValue}(?:\\s*$|\\s*\\))`).test(mathOnly)
        ) {
          leaks.push(`[${q.id}] Lộ đáp án cuối (${cpa.abstract.finalNumericValue}): ${step}`);
        }
      }
    }

    expect(leaks).toEqual([]);
  });

  it('Tất cả 246 câu hỏi Tháng 12 đều có 4 phương án duy nhất, không chứa đại lượng âm, khớp bộ chấm điểm nhập đáp án & chấm nghị luận', () => {
    const issues: string[] = [];

    for (const q of allQuestions) {
      if (q.options.length !== 4) {
        issues.push(`[${q.id}] Số phương án phải là 4, thực tế: ${q.options.length}`);
      }
      const unique = new Set(q.options.map((o) => o.trim()));
      if (unique.size !== q.options.length) {
        issues.push(`[${q.id}] Có phương án trùng lặp: ${JSON.stringify(q.options)}`);
      }
      if (!q.options.includes(q.correctAnswer)) {
        issues.push(`[${q.id}] correctAnswer "${q.correctAnswer}" không nằm trong options`);
      }
      for (const opt of q.options) {
        if (
          /^\s*-\d+/.test(opt) ||
          /(?:^|\s)-\d+\s*(?:cm|dm|m|km|g|kg|mL|L|túi|chai|cốc|tách|quả|hộp)/i.test(opt)
        ) {
          issues.push(`[${q.id}] Phương án chứa đại lượng âm phi logic: "${opt}"`);
        }
      }

      const isReasoning =
        ('section' in q && q.section === 'reasoning') ||
        ('part' in q && q.part === 'C');
      const ansNum = q.visualModel.cpaSpec!.abstract.finalNumericValue;

      if (!isReasoning) {
        const spec = getInMonthQuestionInputSpec(q.correctAnswer);
        if (spec.mode !== 'text_number') {
          issues.push(`[${q.id}] inputSpec không khớp mode: mode=${spec.mode}`);
        } else if (spec.expectedNumber !== ansNum) {
          issues.push(`[${q.id}] inputSpec không khớp số: expected=${spec.expectedNumber}, ansNum=${ansNum}`);
        }
        if (!isInMonthAnswerCorrect(q.correctAnswer, q.correctAnswer)) {
          issues.push(`[${q.id}] isInMonthAnswerCorrect từ chối đúng correctAnswer`);
        }
        if (!isInMonthAnswerCorrect(String(ansNum), q.correctAnswer)) {
          issues.push(`[${q.id}] isInMonthAnswerCorrect từ chối số nguyên ${ansNum}`);
        }
        for (const opt of q.options) {
          if (opt !== q.correctAnswer && isInMonthAnswerCorrect(opt, q.correctAnswer)) {
            issues.push(`[${q.id}] Phương án nhiễu "${opt}" bị chấm nhầm là đúng`);
          }
        }
      } else {
        const rq = q as {
          id: string;
          options: string[];
          correctAnswer: string;
          reasoningSampleAnswer?: string;
          reasoningKeywords?: string[];
        };
        for (const opt of rq.options) {
          if (opt !== rq.correctAnswer && isInMonthAnswerCorrect(opt, rq.correctAnswer)) {
            issues.push(`[${q.id}] Phương án nhiễu nghị luận "${opt}" bị chấm nhầm là đúng`);
          }
        }
        const evalRes = evaluateWeeklyReasoningText(rq.reasoningSampleAnswer, rq.reasoningKeywords);
        if (evalRes.points !== 5 || evalRes.matchedKeywords.length < 2) {
          issues.push(
            `[${q.id}] Đáp án mẫu nghị luận chỉ đạt ${evalRes.points}/5đ (${evalRes.matchedKeywords.length} từ khóa)`
          );
        }
      }
    }

    expect(issues).toEqual([]);
  });

  it('Không có bất kỳ rò rỉ đáp án nào trong tiêu đề mô hình, nhóm Concrete, thanh offset, hoặc gợi ý nghị luận trên cả 246 câu Tháng 12', () => {
    const leaks: string[] = [];

    for (const q of allQuestions) {
      const cpa = q.visualModel.cpaSpec!;
      const ansNum = cpa.abstract.finalNumericValue;
      const normPrompt = q.prompt.replace(/\b(\d{1,3})\s(\d{3})\b/g, '$1$2');
      const ansInPrompt =
        ansNum > 0 && new RegExp(`(?<!\\d)${ansNum}(?!\\d)`).test(normPrompt);

      if (ansNum >= 2 && !ansInPrompt) {
        const regex = new RegExp(`(?<!\\d)${ansNum}(?!\\d)`);
        const fields: Array<[string, string | undefined]> = [
          ['title', q.visualModel.title],
          ['primaryReading', q.visualModel.primaryReading],
          ['secondaryReading', q.visualModel.secondaryReading],
          ['conversionRule', q.visualModel.conversionRule],
        ];
        for (const [fieldName, text] of fields) {
          if (text && regex.test(text.replace(/\b(\d{1,3})\s(\d{3})\b/g, '$1$2'))) {
            leaks.push(`[${q.id}] Lộ đáp án (${ansNum}) trong visualModel.${fieldName}: "${text}"`);
          }
        }
      }

      if (ansNum >= 2 && !ansInPrompt) {
        for (const g of cpa.concrete.groups) {
          if (!g.isUnknown && !g.beforeSolveBadge && (g.totalValue === ansNum || g.unitValue === ansNum)) {
            leaks.push(`[${q.id}] Lộ giá trị trong concrete.groups (${g.id}): total=${g.totalValue}, unit=${g.unitValue}`);
          }
          if (g.displayMode === 'groups' && g.count === ansNum && !g.hideCountBeforeSolve) {
            leaks.push(`[${q.id}] Lộ số lượng đáp án (count=${g.count}) trong concrete.groups (${g.id}) vì thiếu hideCountBeforeSolve`);
          }
        }
      }

      if (cpa.pictorial.kind === 'bar_model' && ansNum >= 2 && !ansInPrompt) {
        const allBars = [
          ...cpa.pictorial.bars,
          ...(cpa.pictorial.beforeBars || []),
        ];
        for (const b of allBars) {
          if (
            b.offsetValue &&
            Math.abs(b.offsetValue) === ansNum &&
            !b.hideOffsetBeforeSolve
          ) {
            leaks.push(`[${q.id}] Lộ offsetValue (${b.offsetValue}) trên thanh "${b.id}" trước khi giải`);
          }
        }
      }

      const isReasoning =
        ('section' in q && q.section === 'reasoning') ||
        ('part' in q && q.part === 'C');
      if (isReasoning && ansNum >= 2 && !ansInPrompt) {
        const rq = q as {
          reasoningPrompt?: string;
          reasoningPlaceholder?: string;
        };
        const regex = new RegExp(`(?<!\\d)${ansNum}(?!\\d)`);
        if (rq.reasoningPrompt && regex.test(rq.reasoningPrompt)) {
          leaks.push(`[${q.id}] Lộ đáp án (${ansNum}) trong reasoningPrompt: "${rq.reasoningPrompt}"`);
        }
        const placeholderWithoutStepNums = (rq.reasoningPlaceholder || '').replace(/Bước\s+\d+/gi, '');
        if (placeholderWithoutStepNums && regex.test(placeholderWithoutStepNums)) {
          leaks.push(`[${q.id}] Lộ đáp án (${ansNum}) trong reasoningPlaceholder: "${rq.reasoningPlaceholder}"`);
        }
      }
    }

    expect(leaks).toEqual([]);
  });

  it('Kiểm chứng các lỗi toán học, logic trực quan và cờ chống rò rỉ CPA đã được khắc phục triệt để trong Tháng 12 (20 buổi)', () => {
    const findQ = (id: string) => {
      const found = allQuestions.find((q) => q.id === id);
      expect(found, `Không tìm thấy câu hỏi ${id}`).toBeDefined();
      return found!;
    };

    // 1. dec-exam-b3 (cân thăng bằng 2 bước) dùng đúng balance_eq
    const examB3Pic = findQ('dec-exam-b3').visualModel.cpaSpec!.pictorial;
    expect(examB3Pic.kind).toBe('measurement_lab');
    if (examB3Pic.kind === 'measurement_lab') {
      expect(examB3Pic.visualParams?.mode).toBe('balance_eq');
      expect(examB3Pic.visualParams?.labelA).toBe('1 quả dưa + 250 g');
      expect(examB3Pic.visualParams?.labelB).toBe('2 kg');
    }

    // 2. Các bài cân đĩa thăng bằng đặt đúng đĩa trái / đĩa phải (Tuần 3: Buổi 11..15 & Đề Tuần 3)
    for (const id of ['dec-d11-q9', 'dec-d15-q9', 'dec-w3-q2']) {
      const pic = findQ(id).visualModel.cpaSpec!.pictorial;
      expect(pic.kind).toBe('measurement_lab');
      if (pic.kind === 'measurement_lab') {
        expect(pic.visualParams?.mode).toBe('balance_eq');
        expect(pic.visualParams?.labelA).not.toMatch(/Đĩa phải/i);
      }
    }

    // 3. Tuần 3 Q4 (Buổi 11..15): thanh bar_packs ẩn tổng trước khi giải và hiển thị đơn vị mỗi gói
    for (let day = 11; day <= 15; day++) {
      const pic = findQ(`dec-d${day}-q4`).visualModel.cpaSpec!.pictorial;
      expect(pic.kind).toBe('bar_model');
      if (pic.kind === 'bar_model') {
        expect(pic.bars[0].isUnknown).toBe(true);
        expect(pic.bars[0].showKnownUnitValue).toBe(true);
      }
    }

    // 4. Uốn dây bảo toàn chu vi ẩn chu vi chưa tính trước khi giải
    for (const id of ['dec-d1-q10', 'dec-d5-q10', 'dec-exam-b1']) {
      const pic = findQ(id).visualModel.cpaSpec!.pictorial;
      expect(pic.kind).toBe('perimeter_shape');
      if (pic.kind === 'perimeter_shape') {
        expect(pic.hidePerimeterBeforeSolve).toBe(true);
      }
    }

    // 5. Tổng nửa chu vi trong Bar Model (Tuần 1 Q11) ẩn kết quả chia 2 trước khi giải
    for (const id of ['dec-d1-q11', 'dec-d5-q11']) {
      const pic = findQ(id).visualModel.cpaSpec!.pictorial;
      expect(pic.kind).toBe('bar_model');
      if (pic.kind === 'bar_model') {
        expect(pic.totalBracket?.isUnknown).toBe(true);
      }
    }

    // 6. dec-w1-q3 dùng widthLabel để không lộ chiều dài 24 cm trước khi giải
    const w1q3Pic = findQ('dec-w1-q3').visualModel.cpaSpec!.pictorial;
    expect(w1q3Pic.kind).toBe('perimeter_shape');
    if (w1q3Pic.kind === 'perimeter_shape') {
      expect(w1q3Pic.widthLabel).toBe('Gấp 2 lần rộng');
    }

    // 7. dec-w2-q4 hình bậc thang 4 bậc hiển thị đúng 4 bậc
    const w2q4Pic = findQ('dec-w2-q4').visualModel.cpaSpec!.pictorial;
    expect(w2q4Pic.kind).toBe('perimeter_shape');
    if (w2q4Pic.kind === 'perimeter_shape') {
      expect(w2q4Pic.stepCount).toBe(4);
    }

    // 8. dec-w4-q4 ẩn tổng phần hiệu bị giảm (2 × 150 = ? mL) và hiện giá trị đơn vị trước khi giải
    const w4q4Pic = findQ('dec-w4-q4').visualModel.cpaSpec!.pictorial;
    expect(w4q4Pic.kind).toBe('bar_model');
    if (w4q4Pic.kind === 'bar_model') {
      const b1 = w4q4Pic.bars.find((b) => b.id === 'b1');
      expect(b1?.isUnknown).toBe(true);
      expect(b1?.showKnownUnitValue).toBe(true);
    }

    // 9. Không còn bất kỳ câu hình chữ U nào mô tả sai màu "đỏ" (SVG vẽ màu vàng cam #F59E0B)
    for (const q of allQuestions) {
      const cpa = q.visualModel.cpaSpec!;
      if (cpa.pictorial.kind === 'perimeter_shape' && cpa.pictorial.shapeKind === 'u_shape') {
        const text = [
          cpa.pictorial.sideShiftHint || '',
          cpa.concrete.actionPrompt || '',
          cpa.concrete.interactiveRule || '',
        ].join(' ');
        expect(text, `[${q.id}] mô tả sai màu chữ U`).not.toMatch(/màu đỏ|vách đỏ/i);
      }
    }

    // 10. Kiểm tra 2 câu Phần C Nghị luận Đề Cuối Kỳ Tháng 12 đạt tối đa 5/5 điểm bài mẫu
    for (const id of ['dec-exam-c1', 'dec-exam-c2']) {
      const q = findQ(id) as (typeof DECEMBER_FINAL_EXAM.questions)[number];
      expect(q.part).toBe('C');
      const evalRes = evaluateWeeklyReasoningText(q.reasoningSampleAnswer, q.reasoningKeywords);
      expect(evalRes.points).toBe(5);
      expect(evalRes.matchedKeywords.length).toBeGreaterThanOrEqual(2);
    }
  });
});
