import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  NOVEMBER_FINAL_EXAM,
  NOVEMBER_IN_MONTH_DAYS,
} from '../data/inMonthNovemberData';
import { NOVEMBER_WEEKLY_TESTS } from '../data/inMonthWeeklyTestsData';
import {
  verifyBarModelPictorial,
  verifyIntervalPictorial,
  verifyMeasurementPictorial,
  verifyRemainderPictorial,
  verifySingaporeCPASpec,
} from '../utils/singaporeCPAVerifier';

describe('Tháng 11 — Kiểm chứng Toán học & Cấu trúc Singapore CPA (Toàn bộ 400 câu: 30 Ngày + 5 Đề Tuần + Đề Cuối Tháng)', () => {
  const allDailyQuestions = NOVEMBER_IN_MONTH_DAYS.flatMap((d) => d.questions);
  const allWeeklyQuestions = NOVEMBER_WEEKLY_TESTS.flatMap((w) => w.questions);
  const allExamQuestions = NOVEMBER_FINAL_EXAM.questions;
  const all400Questions = [
    ...allDailyQuestions,
    ...allWeeklyQuestions,
    ...allExamQuestions,
  ];

  it('Có đủ 30 ngày học (330 câu), 5 đề kiểm tra tuần (50 câu) và 20 câu thi cuối tháng = đúng 400 câu Tháng 11', () => {
    expect(NOVEMBER_IN_MONTH_DAYS.length).toBe(30);
    expect(allDailyQuestions.length).toBe(330);
    expect(NOVEMBER_WEEKLY_TESTS.length).toBe(5);
    expect(allWeeklyQuestions.length).toBe(50);
    expect(allExamQuestions.length).toBe(20);
    expect(all400Questions.length).toBe(400);
  });

  it('Toàn bộ 400 câu hỏi Tháng 11 đều có cpaSpec hợp lệ và vượt qua bộ kiểm chứng bất biến Toán học', () => {
    const failures: string[] = [];

    for (const q of all400Questions) {
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

  it('Kiểm chứng chuyên sâu Tuần 1 (Ngày 1..7 - 77 câu): Sơ đồ thanh Bar Model (Part-Whole, Comparison, Before-After)', () => {
    const week1Days = NOVEMBER_IN_MONTH_DAYS.slice(0, 7);
    let countPartWhole = 0;
    let countComparison = 0;
    let countBeforeAfter = 0;

    for (const dayPlan of week1Days) {
      for (const q of dayPlan.questions) {
        const cpa = q.visualModel.cpaSpec!;
        expect(cpa.pictorial.kind).toBe('bar_model');
        if (cpa.pictorial.kind === 'bar_model') {
          const res = verifyBarModelPictorial(cpa.pictorial);
          expect(res.errors).toEqual([]);
          expect(res.valid).toBe(true);

          if (cpa.pictorial.family === 'part_whole') countPartWhole++;
          if (cpa.pictorial.family === 'comparison') countComparison++;
          if (cpa.pictorial.family === 'before_after') countBeforeAfter++;
        }
      }
    }

    expect(countPartWhole).toBeGreaterThan(0);
    expect(countComparison).toBeGreaterThan(0);
    expect(countBeforeAfter).toBeGreaterThan(0);
    expect(countPartWhole + countComparison + countBeforeAfter).toBe(77);
  });

  it('Kiểm chứng chuyên sâu Tuần 2 (Ngày 8..14 - 77 câu) & Đề tuần 2: Phép chia Euclid & ngữ cảnh xử lý số dư', () => {
    const remainderQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'remainder_groups'
    );
    expect(remainderQs.length).toBeGreaterThanOrEqual(90);

    for (const q of remainderQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'remainder_groups') {
        const res = verifyRemainderPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        expect(pic.dividend).toBe(pic.divisor * pic.quotient + pic.remainder);
        expect(pic.remainder).toBeGreaterThanOrEqual(0);
        expect(pic.remainder).toBeLessThan(pic.divisor);
        expect(pic.contextActionHint && pic.contextActionHint.length > 5).toBe(true);
      }
    }
  });

  it('Kiểm chứng chuyên sâu Tuần 3 (Ngày 15..21 - 77 câu) & Đề tuần 3: Khoảng cách, Đường khép kín, Cưa gỗ, Cầu thang & 2 bên đường', () => {
    const intervalQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'interval_model'
    );
    expect(intervalQs.length).toBeGreaterThanOrEqual(90);

    let twoSidedCount = 0;
    let woodCutTimedCount = 0;

    for (const q of intervalQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'interval_model') {
        const res = verifyIntervalPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        expect(pic.totalLength).toBe(pic.intervalsCount * pic.stepLength);
        if (pic.sidesMultiplier === 2) twoSidedCount++;
        if (pic.subtype === 'wood_cuts' && pic.timePerCut && pic.timePerCut > 0) {
          woodCutTimedCount++;
        }
      }
    }

    expect(twoSidedCount).toBeGreaterThanOrEqual(11);
    expect(woodCutTimedCount).toBeGreaterThanOrEqual(10);
  });

  it('Kiểm chứng chuyên sâu Tuần 4 & Đề tuần 4: Phòng thí nghiệm Đo lường & Biểu đồ', () => {
    const measQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'measurement_lab'
    );
    expect(measQs.length).toBeGreaterThanOrEqual(90);

    for (const q of measQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'measurement_lab') {
        const res = verifyMeasurementPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        if (pic.subtype !== 'length_chart') {
          expect(pic.visualParams?.mode).toBeTruthy();
        }
      }
    }
  });

  it('Toàn bộ biểu thức LaTeX trong bước Abstract của 400 câu hỏi đều render KaTeX chính xác 100%', () => {
    const latexErrors: string[] = [];

    for (const q of all400Questions) {
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

  it('Tất cả 400 câu hỏi đều ẩn phép tính (\\;?\\;) và kết quả chưa giải (= ?) trong guidedLatexSteps để học sinh tự tư duy 100%', () => {
    const leaks: string[] = [];

    for (const q of all400Questions) {
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

  it('Không có bất kỳ rò rỉ đáp án nào trong tiêu đề mô hình, nhóm Concrete, hoặc thanh offset trước khi giải trên cả 400 câu', () => {
    const leaks: string[] = [];

    for (const q of all400Questions) {
      const cpa = q.visualModel.cpaSpec!;
      const ansNum = cpa.abstract.finalNumericValue;
      const ansInPrompt =
        ansNum > 0 && new RegExp(`(?<!\\d)${ansNum}(?!\\d)`).test(q.prompt);

      // Check visualModel title / readings when final answer is NOT already a given number in the prompt
      if (ansNum >= 2 && !ansInPrompt) {
        const regex = new RegExp(`(?<!\\d)${ansNum}(?!\\d)`);
        const fields: Array<[string, string | undefined]> = [
          ['title', q.visualModel.title],
          ['primaryReading', q.visualModel.primaryReading],
          ['secondaryReading', q.visualModel.secondaryReading],
          ['conversionRule', q.visualModel.conversionRule],
        ];
        for (const [fieldName, text] of fields) {
          if (text && regex.test(text)) {
            leaks.push(`[${q.id}] Lộ đáp án (${ansNum}) trong visualModel.${fieldName}: "${text}"`);
          }
        }
      }

      // Check Concrete groups: no unmasked group should expose a secret unitValue/totalValue equal to ansNum
      if (ansNum >= 2 && !ansInPrompt) {
        for (const g of cpa.concrete.groups) {
          if (!g.isUnknown && (g.totalValue === ansNum || g.unitValue === ansNum)) {
            leaks.push(`[${q.id}] Lộ giá trị trong concrete.groups (${g.id}): total=${g.totalValue}, unit=${g.unitValue}`);
          }
        }
      }

      // Check BarModel offsetValue: if offsetValue equals ansNum (and not in prompt), hideOffsetBeforeSolve must be true
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
    }

    expect(leaks).toEqual([]);
  });

  it('Tất cả 400 câu hỏi Tháng 11 đều có 4 phương án duy nhất, không chứa đại lượng âm và đáp án đúng nằm trong options', () => {
    const issues: string[] = [];

    for (const q of all400Questions) {
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
          /(?:^|\s)-\d+\s*(?:cm|m|km|g|kg|mL|L|cây|viên|thùng|bình|quyển|điểm|giây|phút|bậc)/i.test(opt)
        ) {
          issues.push(`[${q.id}] Phương án chứa đại lượng âm phi logic: "${opt}"`);
        }
      }
    }

    expect(issues).toEqual([]);
  });

  it('Tất cả các ô (blocks) trong Bar Model (bars, beforeBars, afterBars) đều có numericValue > 0', () => {
    const invalidBlocks: string[] = [];

    for (const q of all400Questions) {
      const pic = q.visualModel.cpaSpec?.pictorial;
      if (pic?.kind !== 'bar_model') continue;

      const allBars = [
        ...pic.bars,
        ...(pic.beforeBars || []),
        ...(pic.afterBars || []),
      ];
      for (const bar of allBars) {
        for (const blk of bar.blocks) {
          if (blk.numericValue <= 0) {
            invalidBlocks.push(
              `[${q.id}] Bar "${bar.id}" block "${blk.label}" có numericValue <= 0 (${blk.numericValue})`
            );
          }
        }
      }
    }

    expect(invalidBlocks).toEqual([]);
  });

  it('Kiểm chứng các lỗi diễn đạt, logic toán học và cờ hiển thị CPA đã được khắc phục triệt để trong Tháng 11', () => {
    const findQ = (id: string) => {
      const found = all400Questions.find((q) => q.id === id);
      expect(found, `Không tìm thấy câu hỏi ${id}`).toBeDefined();
      return found!;
    };

    // 1. Không còn mô tả "mở khóa" lỗi thời trên 5 đề tuần
    for (const test of NOVEMBER_WEEKLY_TESTS) {
      expect(test.subtitle.toLowerCase()).not.toContain('mở khóa');
    }

    // 2. Không còn các câu diễn đạt/toán học sai đã phát hiện
    const forbiddenSnippets = [
      '7/3',
      '100 : (4 - 1) = 3',
      '5 - 7.',
      'do 7 : 4 = 2',
      'Từ bài toán chia',
      'trồng thẳng hàng ở cả hai đầu đường',
    ];
    for (const q of all400Questions) {
      const combined = [
        q.prompt,
        'explanation' in q && typeof q.explanation === 'string' ? q.explanation : '',
        ...q.options,
        ...('stepByStepExplanation' in q && Array.isArray(q.stepByStepExplanation)
          ? q.stepByStepExplanation
          : []),
      ].join(' | ');
      for (const snippet of forbiddenSnippets) {
        expect(combined, `[${q.id}] vẫn chứa cụm từ lỗi "${snippet}"`).not.toContain(snippet);
      }
    }

    // 3. Tuần 1 Q11 thống nhất đơn vị "viên năng lượng"
    for (let day = 1; day <= 7; day++) {
      const q11 = findQ(`nov-d${day}-q11`);
      expect(q11.prompt).toContain('viên năng lượng');
      for (const opt of q11.options) {
        expect(opt).toContain('viên năng lượng');
      }
    }

    // 4. Cờ chống rò rỉ CPA trên các bài toán đặc thù
    const w2q6 = findQ('nov-w2-q6').visualModel.cpaSpec!.pictorial;
    expect(w2q6.kind).toBe('remainder_groups');
    if (w2q6.kind === 'remainder_groups') {
      expect(w2q6.hideDividendBeforeSolve).toBe(true);
    }

    for (const id of ['nov-d15-q10', 'nov-exam-b5', 'nov-w3-q9', 'nov-w5-q9']) {
      const pic = findQ(id).visualModel.cpaSpec!.pictorial;
      expect(pic.kind).toBe('interval_model');
      if (pic.kind === 'interval_model') {
        expect(pic.hideStepBeforeSolve).toBe(true);
      }
    }

    for (const id of ['nov-d29-q8', 'nov-d30-q8']) {
      const pic = findQ(id).visualModel.cpaSpec!.pictorial;
      expect(pic.kind).toBe('interval_model');
      if (pic.kind === 'interval_model') {
        expect(pic.timeUnit).toBe('giây');
      }
    }

    const w1q10Pic = findQ('nov-w1-q10').visualModel.cpaSpec!.pictorial;
    expect(w1q10Pic.kind).toBe('bar_model');
    if (w1q10Pic.kind === 'bar_model') {
      expect(w1q10Pic.bars.every((b) => b.isSymbolicOnly === true)).toBe(true);
    }

    const w5q9Pic = findQ('nov-w5-q9').visualModel.cpaSpec!.pictorial;
    expect(w5q9Pic.kind).toBe('interval_model');
    if (w5q9Pic.kind === 'interval_model') {
      expect(w5q9Pic.unitLabel).toBe('bậc');
    }

    // 5. Concrete groups ở các bài có offset thanh khớp tổng giá trị của thanh đối chiếu
    for (const id of ['nov-d29-q6', 'nov-exam-a2', 'nov-exam-b10', 'nov-w1-q5', 'nov-w1-q9']) {
      const cpa = findQ(id).visualModel.cpaSpec!;
      expect(cpa.pictorial.kind).toBe('bar_model');
      if (cpa.pictorial.kind === 'bar_model') {
        const barTotalSum = cpa.pictorial.bars.reduce((s, b) => s + b.numericValue, 0);
        const concreteSum = cpa.concrete.groups.reduce((s, g) => s + g.totalValue, 0);
        expect(concreteSum, `[${id}] Concrete sum (${concreteSum}) phải khớp tổng Bar Model (${barTotalSum})`).toBe(
          barTotalSum
        );
      }
    }
  });
});

