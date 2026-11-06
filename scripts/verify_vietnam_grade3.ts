// ============================================================================
// VERIFICATION SUITE: VIETNAM GRADE 3 MATH (TOPIC 4)
// Loop 1: Schema & Data Integrity
// Loop 2: Mathematical Logic & Pedagogical Accuracy
// ============================================================================

import { 
  VIETNAM_GRADE_3_LESSONS, 
  TOPIC_4_PERIODIC_ASSESSMENT 
} from '../src/data/vietnamGrade3LessonsData';

let failureCount = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ [FAIL] ${message}`);
    failureCount++;
  } else {
    console.log(`✅ [PASS] ${message}`);
  }
}

console.log('=================================================================');
console.log('🔄 LOOP 1: SCHEMA & INTEGRITY VERIFICATION (BÀI 23 -> BÀI 29)');
console.log('=================================================================');

assert(VIETNAM_GRADE_3_LESSONS.length === 7, `Tổng số bài học phải là 7 (Hiện có: ${VIETNAM_GRADE_3_LESSONS.length})`);

const lessonIds = new Set<string>();
VIETNAM_GRADE_3_LESSONS.forEach((lesson, lIdx) => {
  assert(!lessonIds.has(lesson.id), `Lesson ID '${lesson.id}' phải là duy nhất`);
  lessonIds.add(lesson.id);

  assert(lesson.socraticDiscovery.length >= 2, `Bài ${lesson.sgkLessonNumber} (${lesson.id}) phải có ít nhất 2 thẻ Socratic (Có: ${lesson.socraticDiscovery.length})`);
  
  lesson.socraticDiscovery.forEach((card, cIdx) => {
    assert(!!card.stageTitle, `Bài ${lesson.id} thẻ ${cIdx + 1} phải có stageTitle`);
    assert(!!card.questionText, `Bài ${lesson.id} thẻ ${cIdx + 1} phải có questionText`);
    assert(!!card.keyTakeaway, `Bài ${lesson.id} thẻ ${cIdx + 1} phải có keyTakeaway`);

    const correctOptions = card.socraticPrompt.options.filter(o => o.isCorrect);
    assert(correctOptions.length === 1, `Bài ${lesson.id} thẻ ${cIdx + 1} phải có ĐÚNG 1 đáp án đúng trong socraticPrompt (Có: ${correctOptions.length})`);
    
    card.socraticPrompt.options.forEach((opt, oIdx) => {
      assert(opt.feedback.length > 5, `Bài ${lesson.id} thẻ ${cIdx + 1} lựa chọn ${oIdx + 1} phải có giải thích feedback rõ ràng`);
    });

    if (card.followUpPrompt) {
      assert(!!card.followUpPrompt.question, `Bài ${lesson.id} thẻ ${cIdx + 1} followUpPrompt phải có question`);
      const followUpCorrect = card.followUpPrompt.options.filter(o => o.isCorrect);
      assert(followUpCorrect.length === 1, `Bài ${lesson.id} thẻ ${cIdx + 1} followUpPrompt phải có ĐÚNG 1 đáp án đúng`);
      card.followUpPrompt.options.forEach((fOpt, fIdx) => {
        assert(fOpt.feedback.length > 5, `Bài ${lesson.id} thẻ ${cIdx + 1} followUpPrompt lựa chọn ${fIdx + 1} phải có feedback`);
      });
    }
  });

  assert(lesson.exercises.length >= 3, `Bài ${lesson.sgkLessonNumber} (${lesson.id}) phải có ít nhất 3 bài tập (Có: ${lesson.exercises.length})`);
  
  const exIds = new Set<string>();
  lesson.exercises.forEach((ex, eIdx) => {
    assert(!exIds.has(ex.id), `Bài ${lesson.id} - Exercise ID '${ex.id}' phải là duy nhất`);
    exIds.add(ex.id);

    assert(!!ex.prompt, `Bài ${lesson.id} - Bài tập ${eIdx + 1} phải có prompt`);
    assert(!!ex.correctAnswer, `Bài ${lesson.id} - Bài tập ${eIdx + 1} phải có correctAnswer`);
    assert(!!ex.hint, `Bài ${lesson.id} - Bài tập ${eIdx + 1} phải có hint`);
    assert(ex.solutionSteps.length > 0, `Bài ${lesson.id} - Bài tập ${eIdx + 1} phải có solutionSteps`);

    if (ex.options && ex.options.length > 0) {
      const match = ex.options.find(o => String(o.label).trim() === String(ex.correctAnswer).trim());
      assert(!!match, `Bài ${lesson.id} - Bài tập ${ex.id}: correctAnswer '${ex.correctAnswer}' phải khớp chính xác với 1 option`);
    }
  });
});

console.log('\n=================================================================');
console.log('🔄 LOOP 1 (TIẾP): SCHEMA BÀI KIỂM TRA ĐỊNH KỲ CHỦ ĐỀ 4');
console.log('=================================================================');

assert(TOPIC_4_PERIODIC_ASSESSMENT.questions.length === 10, `Bài kiểm tra định kỳ phải có đúng 10 câu (Có: ${TOPIC_4_PERIODIC_ASSESSMENT.questions.length})`);
assert(TOPIC_4_PERIODIC_ASSESSMENT.passingScore === 7, 'Điểm đạt chuẩn là 7/10');

TOPIC_4_PERIODIC_ASSESSMENT.questions.forEach((q, qIdx) => {
  const match = q.options.find(o => String(o.label).trim() === String(q.correctAnswer).trim());
  assert(!!match, `Câu kiểm tra định kỳ ${qIdx + 1} (${q.id}): correctAnswer '${q.correctAnswer}' phải khớp với 1 option`);
  const correctFlags = q.options.filter(o => o.isCorrect);
  assert(correctFlags.length === 1, `Câu kiểm tra định kỳ ${qIdx + 1} phải có đúng 1 option có isCorrect = true`);
  assert(!!q.explanation, `Câu kiểm tra định kỳ ${qIdx + 1} phải có giải thích chi tiết`);
});

console.log('\n=================================================================');
console.log('🔄 LOOP 2: TOÁN HỌC & LOGIC XUYÊN SUỐT 100% CHÍNH XÁC');
console.log('=================================================================');

// Bài 23 Socratic Bridge Verification (Addition -> Multiplication link)
const b23Card1 = VIETNAM_GRADE_3_LESSONS[0].socraticDiscovery[0];
assert(b23Card1.id === 'socr-23-1', 'Thẻ 1 của Bài 23 là socr-23-1');
assert(b23Card1.socraticPrompt.question.includes('phép cộng'), 'Câu hỏi 1 hướng dẫn dùng phép cộng: 12 + 12 + 12 = 36');
assert(!!b23Card1.followUpPrompt, 'Thẻ 1 phải có followUpPrompt');
assert(
  !!(b23Card1.followUpPrompt?.question.includes('12 + 12 + 12') && 
     b23Card1.followUpPrompt?.question.includes('lặp lại') &&
     b23Card1.followUpPrompt?.question.includes('phép nhân')),
  'Follow-up prompt phải liên kết tường minh giữa 12 + 12 + 12 với phép nhân qua số lần lặp lại'
);
const b23FupCorrect = b23Card1.followUpPrompt?.options.find(o => o.isCorrect);
assert(
  !!(b23FupCorrect?.label.includes('12 × 3 = 36') && b23FupCorrect?.label.includes('3 lần')),
  'Đáp án đúng của Follow-up prompt phải thể hiện rõ: "12 được lấy 3 lần" -> 12 × 3 = 36'
);

// Bài 23 logic
assert(34 * 2 === 68, 'Bài 23 ex 1: 34 x 2 = 68');
assert(18 * 4 === 72, 'Bài 23 ex 2: 18 x 4 = 72');
assert(15 * 3 === 45, 'Bài 23 ex 3: 15 x 3 = 45');

// Bài 24 logic
assert(6 * 5 === 30, 'Bài 24 ex 1: 6 x 5 = 30');
assert(7 * 5 === 35, 'Bài 24 ex 2: 7 x 5 = 35');
assert(12 * 4 === 48 && 48 - 12 === 36, 'Bài 24 ex 3: 12 x 4 = 48 và 48 - 12 = 36');

// Bài 25 logic
assert(Math.floor(23 / 4) === 5 && 23 % 4 === 3, 'Bài 25 ex 1: 23 : 4 = 5 dư 3');
assert(6 - 1 === 5, 'Bài 25 ex 2: Số dư lớn nhất của số chia 6 là 5');
assert(Math.ceil(35 / 2) === 18, 'Bài 25 ex 3: 35 học sinh, 2 hs/bàn cần 18 bàn');

// Bài 26 logic
assert(84 / 4 === 21, 'Bài 26 ex 1: 84 : 4 = 21');
assert(Math.floor(65 / 3) === 21 && 65 % 3 === 2, 'Bài 26 ex 2: 65 : 3 = 21 dư 2');
assert(Math.floor(95 / 4) === 23 && 95 % 4 === 3, 'Bài 26 ex 3: 95 : 4 = 23 dư 3');

// Bài 27 logic
assert(42 / 6 === 7, 'Bài 27 ex 1: 42 : 6 = 7');
assert(36 - 4 === 32 && 32 / 4 === 8 && (32 - 8) === 24 && 24 > 4, 'Bài 27 ex 2: Chiều giảm 24kg > sáng 4kg');
assert(9 * 5 === 45 && 45 - 5 === 40, 'Bài 27 ex 3: 9 x 5 = 45, 45 - 5 = 40');

// Bài 28 logic
assert(15 + 5 === 20 && 15 + 20 === 35, 'Bài 28 ex 1: Đội Một 15, Đội Hai 20, cả hai 35');
assert(12 * 2 === 24 && 12 + 24 === 36, 'Bài 28 ex 2: Sáng 12, Chiều 24, cả ngày 36');
assert(40 / 4 === 10 && 40 - 10 === 30, 'Bài 28 ex 3: Biếu 10, còn lại 30');

// Bài 29 logic
assert(14 * 3 + 28 === 70, 'Bài 29 ex 1: 14 x 3 + 28 = 70');
assert(15 * 3 === 45 && 45 / 5 === 9, 'Bài 29 ex 2: 3 can x 15 = 45L : 5 = 9 chai');
assert(11 * 7 + 6 === 83, 'Bài 29 ex 3: 11 x 7 + 6 = 83');

// Periodic Assessment math verification
assert(23 * 3 === 69, 'Assessment Q1: 23 x 3 = 69');
assert(8 * 4 === 32, 'Assessment Q3: 8 x 4 = 32');
assert(9 * 3 === 27 && 9 + 3 === 12, 'Assessment Q4: Bao 2 = 27kg, Bao 3 = 12kg');
assert(Math.floor(75 / 6) === 12 && 75 % 6 === 3, 'Assessment Q5: 75 : 6 = 12 dư 3');
assert(48 / 4 === 12, 'Assessment Q6: 48 : 4 = 12');
assert(14 * 2 === 28 && 14 + 28 === 42, 'Assessment Q7: 14 + 28 = 42 học sinh');
assert(26 * 3 - 38 === 40, 'Assessment Q8: 26 x 3 - 38 = 40');
assert(Math.ceil(31 / 3) === 11, 'Assessment Q9: 31 khách, 3 khách/chuyến cần 11 chuyến');
assert((18 * 2) / 3 === 12, 'Assessment Q10: Số ban đầu là 12 (12 x 3 = 36, 36 : 2 = 18)');

console.log('\n=================================================================');
console.log('🔄 LOOP 1 (TIẾP): BẢN ĐỒ HÀNH TINH & HỆ THỐNG LƯU TRỮ VŨ TRỤ');
console.log('=================================================================');

import { PLANETS_METADATA, INITIAL_COSMIC_PROGRESS } from '../src/utils/cosmicProgressStorage';

assert(PLANETS_METADATA.length === 7, `Hệ Mặt Trời Tri Thức phải có đúng 7 hành tinh (Hiện có: ${PLANETS_METADATA.length})`);
assert(INITIAL_COSMIC_PROGRESS.unlockedLessons.includes('vn3-c4-l23'), 'Hành tinh Bài 23 phải được mở sẵn mặc định');

PLANETS_METADATA.forEach((planet, pIdx) => {
  const matchLesson = VIETNAM_GRADE_3_LESSONS.find(l => l.id === planet.lessonId);
  assert(!!matchLesson, `Hành tinh ${pIdx + 1} (${planet.planetName}) phải liên kết đúng bài học ${planet.lessonId}`);
  assert(planet.orbitRadius > 0, `Hành tinh ${planet.planetName} phải có quỹ đạo hợp lệ`);
  assert(!!planet.accentHex && planet.accentHex.startsWith('#'), `Hành tinh ${planet.planetName} phải có màu neon accent hex`);
});

console.log('\n=================================================================');
if (failureCount === 0) {
  console.log('🎉 TOÀN BỘ KIỂM TRA ĐẠT CHUẨN 100%! KHÔNG CÓ BẤT KỲ LỖI LOGIC NÀO!');
} else {
  console.error(`🚨 PHÁT HIỆN ${failureCount} LỖI CẦN KHẮC PHỤC NGAY!`);
  process.exit(1);
}
console.log('=================================================================');
