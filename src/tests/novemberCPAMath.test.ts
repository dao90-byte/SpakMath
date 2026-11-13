import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  NOVEMBER_FINAL_EXAM,
  NOVEMBER_IN_MONTH_DAYS,
} from '../data/inMonthNovemberData';
import {
  verifyBarModelPictorial,
  verifyIntervalPictorial,
  verifyRemainderPictorial,
  verifySingaporeCPASpec,
} from '../utils/singaporeCPAVerifier';

describe('Tháng 11 — Kiểm chứng Toán học & Cấu trúc JSON Singapore CPA (30 Ngày + Đề Thi Cuối Tháng)', () => {
  it('Có đúng 30 ngày học (330 câu hỏi) và 20 câu hỏi kỳ thi cuối tháng 11', () => {
    expect(NOVEMBER_IN_MONTH_DAYS.length).toBe(30);
    const totalDailyQuestions = NOVEMBER_IN_MONTH_DAYS.reduce(
      (sum, d) => sum + d.questions.length,
      0
    );
    expect(totalDailyQuestions).toBe(330);
    expect(NOVEMBER_FINAL_EXAM.questions.length).toBe(20);
  });

  it('Toàn bộ 330 câu hỏi trong 30 ngày Tháng 11 đều có cpaSpec hợp lệ và vượt qua bộ kiểm chứng bất biến Toán học', () => {
    const failures: string[] = [];

    for (const dayPlan of NOVEMBER_IN_MONTH_DAYS) {
      for (const q of dayPlan.questions) {
        const cpa = q.visualModel.cpaSpec;
        if (!cpa) {
          failures.push(`[Day ${dayPlan.dayNumber} - ${q.id}] Thiếu cpaSpec`);
          continue;
        }
        const report = verifySingaporeCPASpec(cpa, q.correctAnswer, q.options);
        if (!report.valid) {
          failures.push(
            `[Day ${dayPlan.dayNumber} - ${q.id}] ${report.errors.join(' | ')}`
          );
        }
      }
    }

    expect(failures).toEqual([]);
  });

  it('Toàn bộ 20 câu hỏi Đề thi Cuối Tháng 11 (Phần A Cơ bản & Phần B Olympic) đều vượt qua kiểm chứng bất biến Toán học', () => {
    const failures: string[] = [];

    for (const q of NOVEMBER_FINAL_EXAM.questions) {
      const cpa = q.visualModel.cpaSpec;
      if (!cpa) {
        failures.push(`[Exam - ${q.id}] Thiếu cpaSpec`);
        continue;
      }
      const report = verifySingaporeCPASpec(cpa, q.correctAnswer, q.options);
      if (!report.valid) {
        failures.push(`[Exam - ${q.id}] ${report.errors.join(' | ')}`);
      }
    }

    expect(failures).toEqual([]);
  });

  it('Kiểm chứng chuyên sâu Tuần 1 (Ngày 1..7 - 77 câu): Sơ đồ đoạn thẳng Bar Model (Part-Whole, Comparison, Before-After)', () => {
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

    // Đảm bảo cả 3 họ Bar Model (Part-Whole, Comparison, Before-After) đều xuất hiện đầy đủ
    expect(countPartWhole).toBeGreaterThan(0);
    expect(countComparison).toBeGreaterThan(0);
    expect(countBeforeAfter).toBeGreaterThan(0);
    expect(countPartWhole + countComparison + countBeforeAfter).toBe(77);
  });

  it('Kiểm chứng chuyên sâu Tuần 2 (Ngày 8..14 - 77 câu): Phép chia có dư Euclid (D = d × q + r, 0 <= r < d)', () => {
    const week2Days = NOVEMBER_IN_MONTH_DAYS.slice(7, 14);

    for (const dayPlan of week2Days) {
      for (const q of dayPlan.questions) {
        const cpa = q.visualModel.cpaSpec!;
        expect(cpa.pictorial.kind).toBe('remainder_groups');
        if (cpa.pictorial.kind === 'remainder_groups') {
          const res = verifyRemainderPictorial(cpa.pictorial);
          expect(res.errors).toEqual([]);
          expect(res.valid).toBe(true);
          expect(cpa.pictorial.dividend).toBe(
            cpa.pictorial.divisor * cpa.pictorial.quotient + cpa.pictorial.remainder
          );
          expect(cpa.pictorial.remainder).toBeGreaterThanOrEqual(0);
          expect(cpa.pictorial.remainder).toBeLessThan(cpa.pictorial.divisor);
        }
      }
    }
  });

  it('Kiểm chứng chuyên sâu Tuần 3 (Ngày 15..21 - 77 câu): Toán trồng cây & Khoảng cách (Intervals & Fencepost Topology)', () => {
    const week3Days = NOVEMBER_IN_MONTH_DAYS.slice(14, 21);

    for (const dayPlan of week3Days) {
      for (const q of dayPlan.questions) {
        const cpa = q.visualModel.cpaSpec!;
        expect(cpa.pictorial.kind).toBe('interval_model');
        if (cpa.pictorial.kind === 'interval_model') {
          const res = verifyIntervalPictorial(cpa.pictorial);
          expect(res.errors).toEqual([]);
          expect(res.valid).toBe(true);
          expect(cpa.pictorial.totalLength).toBe(
            cpa.pictorial.intervalsCount * cpa.pictorial.stepLength
          );
        }
      }
    }
  });

  it('Toàn bộ biểu thức LaTeX trong bước Abstract (guidedLatexSteps, fullLatexSteps, finalAnswerLatex) của 350 câu hỏi đều render KaTeX chính xác 100%', () => {
    const latexErrors: string[] = [];

    const allQuestions = [
      ...NOVEMBER_IN_MONTH_DAYS.flatMap((d) => d.questions),
      ...NOVEMBER_FINAL_EXAM.questions,
    ];

    expect(allQuestions.length).toBe(350);

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

  it('Tất cả 350 câu hỏi đều ẩn phép tính (\\;?\\;) và kết quả chưa giải (= ?) trong guidedLatexSteps để học sinh tự tư duy 100%', () => {
    const leaks: string[] = [];

    const allQuestions = [
      ...NOVEMBER_IN_MONTH_DAYS.flatMap((d) => d.questions),
      ...NOVEMBER_FINAL_EXAM.questions,
    ];

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
        // Strip descriptive \text{...} blocks to inspect purely mathematical operators & RHS values
        const mathOnly = step.replace(/\\text\{[^}]*\}/g, ' ').trim();

        if (/\\times|\\div|[+\-]/.test(mathOnly)) {
          leaks.push(`[${q.id}] Lộ dấu phép tính trong hướng dẫn: ${step}`);
        }
        // Any step with a computation placeholder (\;? \;) must hide its RHS behind '?'
        if (step.includes('?') && /=\s*\d+(?:\s*$|\s*\))/.test(mathOnly)) {
          leaks.push(`[${q.id}] Lộ kết quả số đã giải ở bước tính: ${step}`);
        }
        // No guided step may ever reveal the final numeric answer on the RHS
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
});
