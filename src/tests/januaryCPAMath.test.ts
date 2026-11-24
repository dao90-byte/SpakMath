import { describe, expect, it } from 'vitest';
import katex from 'katex';
import {
  JANUARY_FINAL_EXAM,
  JANUARY_IN_MONTH_DAYS,
} from '../data/inMonthJanuaryData';
import { JANUARY_WEEKLY_TESTS } from '../data/inMonthJanuaryWeeklyTestsData';
import { GRADE_3_IN_MONTH_PROGRAMS } from '../data/inMonthGrade3Catalog';
import {
  verifyAreaGridPictorial,
  verifyBarModelPictorial,
  verifyPlaceValuePictorial,
  verifySequencePatternPictorial,
  verifySingaporeCPASpec,
} from '../utils/singaporeCPAVerifier';
import { isInMonthAnswerCorrect } from '../utils/inMonthAnswerUtils';

describe('Tháng 1 — Kiểm chứng Toán học & Cấu trúc Singapore CPA (Toàn bộ 400 câu: 30 Ngày + 5 Đề Tuần 15p + Đề Cuối Tháng)', () => {
  const allDailyQuestions = JANUARY_IN_MONTH_DAYS.flatMap((d) => d.questions);
  const allWeeklyQuestions = JANUARY_WEEKLY_TESTS.flatMap((w) => w.questions);
  const allExamQuestions = JANUARY_FINAL_EXAM.questions;
  const all400Questions = [
    ...allDailyQuestions,
    ...allWeeklyQuestions,
    ...allExamQuestions,
  ];

  it('Có đủ 30 ngày học (330 câu), 5 đề kiểm tra 15p (50 câu: 6 Tính toán + 4 Nghị luận mỗi đề) và 20 câu thi cuối tháng (5 câu mỗi trụ cột) = đúng 400 câu Tháng 1', () => {
    expect(JANUARY_IN_MONTH_DAYS.length).toBe(30);
    expect(allDailyQuestions.length).toBe(330);
    expect(JANUARY_WEEKLY_TESTS.length).toBe(5);
    expect(allWeeklyQuestions.length).toBe(50);
    expect(allExamQuestions.length).toBe(20);
    expect(all400Questions.length).toBe(400);

    // Check 4 pillars have 5 questions each in Final Exam
    const pillarCounts: Record<string, number> = {};
    for (const q of allExamQuestions) {
      pillarCounts[q.skillDomain] = (pillarCounts[q.skillDomain] || 0) + 1;
    }
    expect(pillarCounts.measurement).toBe(5);
    expect(pillarCounts.interval).toBe(5);
    expect(pillarCounts.bar_model).toBe(5);
    expect(pillarCounts.remainder).toBe(5);

    for (const wt of JANUARY_WEEKLY_TESTS) {
      expect(wt.monthNumber).toBe(1);
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

  it('Tháng 1 được gắn chuẩn xác trong danh mục Lớp 3 (GRADE_3_IN_MONTH_PROGRAMS) ngay sau Tháng 12 cùng đầy đủ 5 đề kiểm tra 15 phút', () => {
    const janIndex = GRADE_3_IN_MONTH_PROGRAMS.findIndex((p) => p.monthNumber === 1);
    const decIndex = GRADE_3_IN_MONTH_PROGRAMS.findIndex((p) => p.monthNumber === 12);
    expect(janIndex).toBe(decIndex + 1);

    const janProgram = GRADE_3_IN_MONTH_PROGRAMS[janIndex];
    expect(janProgram).toBeDefined();
    expect(janProgram.semester).toBe(2);
    expect(janProgram.days.length).toBe(30);
    expect(janProgram.weeklyTests?.length).toBe(5);
    expect(janProgram.finalExam.questions.length).toBe(20);
  });

  it('Chuẩn hóa đơn vị diện tích chấp nhận cả dạng ASCII (cm2, dm2, m2) và chỉ số trên (cm², dm², m²)', () => {
    expect(isInMonthAnswerCorrect('64 cm2', '64 cm²')).toBe(true);
    expect(isInMonthAnswerCorrect('64cm2', '64 cm²')).toBe(true);
    expect(isInMonthAnswerCorrect('64', '64 cm²')).toBe(true);
    expect(isInMonthAnswerCorrect('120 m2', '120 m²')).toBe(true);
    expect(isInMonthAnswerCorrect('45 dm2', '45 dm²')).toBe(true);
  });

  it('Toàn bộ 400 câu hỏi Tháng 1 đều có cpaSpec hợp lệ và vượt qua bộ kiểm chứng bất biến Toán học', () => {
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

  it('Kiểm chứng chuyên sâu Thẻ Giá Trị Vị Trí 10 000 (Place Value Discs): decompose, build_number, compare, number_line_round, add_sub', () => {
    const pvQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'place_value_chart'
    );
    expect(pvQs.length).toBeGreaterThanOrEqual(80);

    const modeCounts: Record<string, number> = {};
    for (const q of pvQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'place_value_chart') {
        const res = verifyPlaceValuePictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        modeCounts[pic.mode] = (modeCounts[pic.mode] || 0) + 1;
      }
    }

    expect(modeCounts.decompose).toBeGreaterThan(10);
    expect(modeCounts.build_number).toBeGreaterThan(10);
    expect(modeCounts.compare).toBeGreaterThan(5);
    expect(modeCounts.number_line_round).toBeGreaterThan(5);
    expect(modeCounts.add_sub).toBeGreaterThan(15);
  });

  it('Kiểm chứng chuyên sâu Chuỗi Số Quy Luật (Sequence Pattern): arithmetic, increasing_diff, fibonacci_sum, multiplicative, alternating', () => {
    const seqQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'sequence_pattern'
    );
    expect(seqQs.length).toBeGreaterThanOrEqual(45);

    const ruleCounts: Record<string, number> = {};
    for (const q of seqQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'sequence_pattern') {
        const res = verifySequencePatternPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        ruleCounts[pic.patternKind] = (ruleCounts[pic.patternKind] || 0) + 1;
      }
    }

    expect(ruleCounts.arithmetic).toBeGreaterThan(5);
    expect(ruleCounts.increasing_diff).toBeGreaterThan(5);
    expect(ruleCounts.fibonacci_sum).toBeGreaterThan(3);
    expect(ruleCounts.multiplicative).toBeGreaterThan(3);
    expect(ruleCounts.alternating).toBeGreaterThan(3);
  });

  it('Kiểm chứng chuyên sâu Diện Tích & Liên Kết Chu Vi (Area Grid): unit_grid, square_area, rect_area, l_shape_area, frame_border, area_perim_link', () => {
    const areaQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'area_grid'
    );
    expect(areaQs.length).toBeGreaterThanOrEqual(160);

    const kindCounts: Record<string, number> = {};
    for (const q of areaQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'area_grid') {
        const res = verifyAreaGridPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
        kindCounts[pic.shapeKind] = (kindCounts[pic.shapeKind] || 0) + 1;
      }
    }

    expect(kindCounts.unit_grid).toBeGreaterThanOrEqual(10);
    expect(kindCounts.square_area).toBeGreaterThanOrEqual(10);
    expect(kindCounts.rect_area).toBeGreaterThan(30);
    expect(kindCounts.l_shape_area).toBeGreaterThan(10);
    expect(kindCounts.frame_border).toBeGreaterThan(10);
    expect(kindCounts.area_perim_link).toBeGreaterThan(30);
  });

  it('Kiểm chứng toàn bộ sơ đồ thanh Bar Model xuất hiện trong Tháng 1', () => {
    const barQs = all400Questions.filter(
      (q) => q.visualModel.cpaSpec?.pictorial.kind === 'bar_model'
    );
    expect(barQs.length).toBeGreaterThan(10);

    for (const q of barQs) {
      const pic = q.visualModel.cpaSpec!.pictorial;
      if (pic.kind === 'bar_model') {
        const res = verifyBarModelPictorial(pic);
        expect(res.errors).toEqual([]);
        expect(res.valid).toBe(true);
      }
    }
  });

  it('Toàn bộ biểu thức LaTeX trong bước Abstract của 400 câu hỏi Tháng 1 đều render KaTeX chính xác 100%', () => {
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

  it('Tất cả 400 câu hỏi Tháng 1 đều ẩn phép tính (\\;?\\;) và kết quả chưa giải (= ?) trong guidedLatexSteps', () => {
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

  it('Không có bất kỳ rò rỉ đáp án nào trong tiêu đề mô hình, nhóm Concrete, hoặc thanh offset trước khi giải trên cả 400 câu Tháng 1', () => {
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
