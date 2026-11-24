import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  DECEMBER_FINAL_EXAM,
  DECEMBER_IN_MONTH_DAYS,
} from '../data/inMonthDecemberData';
import { DECEMBER_WEEKLY_TESTS } from '../data/inMonthDecemberWeeklyTestsData';
import { GRADE_3_IN_MONTH_PROGRAMS } from '../data/inMonthGrade3Catalog';
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

describe('Tháng 12 — Kiểm chứng Toán học & Cấu trúc Singapore CPA (Toàn bộ 400 câu: 30 Ngày + 5 Đề Tuần 15p + Đề Cuối Tháng)', () => {
  const allDailyQuestions = DECEMBER_IN_MONTH_DAYS.flatMap((d) => d.questions);
  const allWeeklyQuestions = DECEMBER_WEEKLY_TESTS.flatMap((w) => w.questions);
  const allExamQuestions = DECEMBER_FINAL_EXAM.questions;
  const all400Questions = [
    ...allDailyQuestions,
    ...allWeeklyQuestions,
    ...allExamQuestions,
  ];

  it('Có đủ 30 ngày học (330 câu), 5 đề kiểm tra 15p (50 câu: 6 Tính toán + 4 Nghị luận mỗi đề) và 20 câu thi cuối tháng = đúng 400 câu Tháng 12', () => {
    expect(DECEMBER_IN_MONTH_DAYS.length).toBe(30);
    expect(allDailyQuestions.length).toBe(330);
    expect(DECEMBER_WEEKLY_TESTS.length).toBe(5);
    expect(allWeeklyQuestions.length).toBe(50);
    expect(allExamQuestions.length).toBe(20);
    expect(all400Questions.length).toBe(400);

    for (const wt of DECEMBER_WEEKLY_TESTS) {
      expect(wt.monthNumber).toBe(12);
      expect(wt.durationMinutes).toBe(15);
      expect(wt.questions.length).toBe(10);
      const calcCount = wt.questions.filter((q) => q.section === 'calculation').length;
      const reasonCount = wt.questions.filter((q) => q.section === 'reasoning').length;
      expect(calcCount).toBe(6);
      expect(reasonCount).toBe(4);
      const totalPts = wt.questions.reduce((s, q) => s + q.points, 0);
      expect(totalPts).toBe(100);
      for (const rq of wt.questions.filter((q) => q.section === 'reasoning')) {
        expect(rq.reasoningPrompt && rq.reasoningPrompt.length > 10).toBe(true);
        expect(rq.reasoningKeywords && rq.reasoningKeywords.length >= 3).toBe(true);
        expect(rq.reasoningSampleAnswer && rq.reasoningSampleAnswer.length > 10).toBe(true);
      }
    }
  });

  it('Tháng 12 được gắn chuẩn xác trong danh mục Lớp 3 (GRADE_3_IN_MONTH_PROGRAMS) cùng đầy đủ 5 đề kiểm tra 15 phút', () => {
    const decProgram = GRADE_3_IN_MONTH_PROGRAMS.find((p) => p.monthNumber === 12);
    expect(decProgram).toBeDefined();
    expect(decProgram?.days.length).toBe(30);
    expect(decProgram?.weeklyTests?.length).toBe(5);
    expect(decProgram?.finalExam.questions.length).toBe(20);
  });

  it('Mặc định mở khóa toàn bộ 7 bài học SGK Lớp 3 trong INITIAL_COSMIC_PROGRESS', () => {
    expect(INITIAL_COSMIC_PROGRESS.unlockedLessons.length).toBe(ALL_COSMIC_LESSON_IDS.length);
    for (const id of ALL_COSMIC_LESSON_IDS) {
      expect(INITIAL_COSMIC_PROGRESS.unlockedLessons).toContain(id);
    }
  });

  it('Toàn bộ 400 câu hỏi Tháng 12 đều có cpaSpec hợp lệ và vượt qua bộ kiểm chứng bất biến Toán học', () => {
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

  it('Kiểm chứng chuyên sâu Hình học Chu vi & Kỹ thuật Dời cạnh (Tuần 1, Tuần 2 & Đề tuần): Square, Rectangle, Joined Squares, L-shape, Staircase, U-shape', () => {
    const perimQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'perimeter_shape'
    );
    expect(perimQs.length).toBeGreaterThanOrEqual(160);

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

    expect(shapeCounts.square).toBeGreaterThan(10);
    expect(shapeCounts.rectangle).toBeGreaterThan(20);
    expect(shapeCounts.joined_squares).toBeGreaterThan(10);
    expect(shapeCounts.l_shape).toBeGreaterThan(10);
    expect(shapeCounts.staircase).toBeGreaterThan(5);
    expect(shapeCounts.u_shape).toBeGreaterThan(10);
  });

  it('Kiểm chứng chuyên sâu Đo lường Khối lượng (kg–g) & Thể tích (L–mL) trên toàn bộ bài tập và đề kiểm tra Tháng 12', () => {
    const measQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'measurement_lab'
    );
    expect(measQs.length).toBeGreaterThanOrEqual(130);

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

  it('Kiểm chứng toàn bộ sơ đồ thanh Bar Model xuất hiện trong Tháng 12 (San giỏ, San bình, Toán ngược)', () => {
    const barQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'bar_model'
    );
    expect(barQs.length).toBeGreaterThan(0);

    for (const q of barQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'bar_model') {
        const res = verifyBarModelPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
      }
    }
  });

  it('Toàn bộ biểu thức LaTeX trong bước Abstract của 400 câu hỏi Tháng 12 đều render KaTeX chính xác 100%', () => {
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

  it('Tất cả 400 câu hỏi Tháng 12 đều ẩn phép tính (\\;?\\;) và kết quả chưa giải (= ?) trong guidedLatexSteps', () => {
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

  it('Không có bất kỳ rò rỉ đáp án nào trong tiêu đề mô hình, nhóm Concrete, hoặc thanh offset trước khi giải trên cả 400 câu Tháng 12', () => {
    const leaks: string[] = [];

    for (const q of all400Questions) {
      const cpa = q.visualModel.cpaSpec!;
      const ansNum = cpa.abstract.finalNumericValue;
      const ansInPrompt =
        ansNum > 0 && new RegExp(`(?<!\\d)${ansNum}(?!\\d)`).test(q.prompt);

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

      if (ansNum >= 2 && !ansInPrompt) {
        for (const g of cpa.concrete.groups) {
          if (!g.isUnknown && (g.totalValue === ansNum || g.unitValue === ansNum)) {
            leaks.push(`[${q.id}] Lộ giá trị trong concrete.groups (${g.id}): total=${g.totalValue}, unit=${g.unitValue}`);
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
    }

    expect(leaks).toEqual([]);
  });
});
