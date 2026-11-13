import {
  NOVEMBER_IN_MONTH_DAYS,
  NOVEMBER_FINAL_EXAM,
} from '../src/data/inMonthNovemberData';

let errors = 0;

if (NOVEMBER_IN_MONTH_DAYS.length !== 30) {
  console.error(`Expected 30 days, found ${NOVEMBER_IN_MONTH_DAYS.length}`);
  errors++;
}

const seenDayIds = new Set<string>();
const seenQuestionIds = new Set<string>();

NOVEMBER_IN_MONTH_DAYS.forEach((dayPlan, idx) => {
  if (dayPlan.dayNumber !== idx + 1) {
    console.error(`Day index mismatch at ${idx}: expected ${idx + 1}, got ${dayPlan.dayNumber}`);
    errors++;
  }
  if (seenDayIds.has(dayPlan.id)) {
    console.error(`Duplicate day id: ${dayPlan.id}`);
    errors++;
  }
  seenDayIds.add(dayPlan.id);

  if (dayPlan.questions.length !== 11) {
    console.error(`Day ${dayPlan.dayNumber} has ${dayPlan.questions.length} questions (expected 11)`);
    errors++;
  }

  dayPlan.questions.forEach((q) => {
    if (seenQuestionIds.has(q.id)) {
      console.error(`Duplicate question id: ${q.id}`);
      errors++;
    }
    seenQuestionIds.add(q.id);

    if (!q.options.includes(q.correctAnswer)) {
      console.error(
        `Question ${q.id} correctAnswer "${q.correctAnswer}" not in options [${q.options.join(', ')}]`
      );
      errors++;
    }
    const uniqueOpts = new Set(q.options);
    if (uniqueOpts.size !== 4) {
      console.error(
        `Question ${q.id} does not have 4 unique options: [${q.options.join(', ')}]`
      );
      errors++;
    }
    if (!q.hint || q.stepByStepExplanation.length === 0) {
      console.error(`Question ${q.id} missing hint or stepByStepExplanation`);
      errors++;
    }
  });
});

const examQuestions = NOVEMBER_FINAL_EXAM.questions;
if (examQuestions.length !== 20) {
  console.error(`Expected 20 exam questions, found ${examQuestions.length}`);
  errors++;
}

const basicCount = examQuestions.filter((q) => q.part === 'A').length;
const olympiadCount = examQuestions.filter((q) => q.part === 'B').length;

if (basicCount !== 10 || olympiadCount !== 10) {
  console.error(`Exam parts mismatch: basic=${basicCount}, olympiad=${olympiadCount}`);
  errors++;
}

examQuestions.forEach((eq) => {
  if (!eq.options.includes(eq.correctAnswer)) {
    console.error(
      `Exam question ${eq.id} correctAnswer "${eq.correctAnswer}" not in options [${eq.options.join(', ')}]`
    );
    errors++;
  }
  if (new Set(eq.options).size !== 4) {
    console.error(
      `Exam question ${eq.id} does not have 4 unique options: [${eq.options.join(', ')}]`
    );
    errors++;
  }
});

if (errors > 0) {
  console.error(`Verification failed with ${errors} errors.`);
  process.exit(1);
} else {
  console.log(
    `✅ Verification passed: 30 days (${seenQuestionIds.size} daily questions) + ${examQuestions.length} final exam questions verified with 0 errors!`
  );
}
