// Script to verify all lessons in Toán Tư Duy
import { ALL_LESSONS, TOPICS } from '../src/data/lessonsData';

console.log('=== VERIFYING TOÁN TƯ DUY LESSONS ===');
console.log('Total lessons loaded:', ALL_LESSONS.length);

const seenIds = new Set<string>();
let errors = 0;

for (const lesson of ALL_LESSONS) {
  if (seenIds.has(lesson.id)) {
    console.error(`❌ Duplicate lesson ID: ${lesson.id}`);
    errors++;
  }
  seenIds.add(lesson.id);

  if (!lesson.title || !lesson.instruction || !lesson.activity) {
    console.error(`❌ Invalid lesson schema in ${lesson.id}`);
    errors++;
  }

  // Activity-specific checks
  const act = lesson.activity;
  if (act.type === 'pictographViewer') {
    for (const q of act.subQuestions) {
      if (!q.options.includes(q.correctAnswer)) {
        console.error(`❌ pictographViewer in ${lesson.id}: correctAnswer "${q.correctAnswer}" not in options [${q.options.join(', ')}]`);
        errors++;
      }
    }
  } else if (act.type === 'volumeComparison') {
    for (const q of act.questions) {
      if (!q.options.includes(q.correctAnswer)) {
        console.error(`❌ volumeComparison in ${lesson.id}: correctAnswer "${q.correctAnswer}" not in options [${q.options.join(', ')}]`);
        errors++;
      }
    }
  } else if (act.type === 'barModel') {
    for (const q of act.questions) {
      if (!q.options.includes(q.correctAnswer)) {
        console.error(`❌ barModel in ${lesson.id}: correctAnswer "${q.correctAnswer}" not in options [${q.options.join(', ')}]`);
        errors++;
      }
    }
  } else if (act.type === 'grandFinale') {
    for (const rq of act.roundQuestions) {
      const correctOpt = rq.options.find(o => o.isCorrect);
      if (!correctOpt) {
        console.error(`❌ grandFinale in ${lesson.id} question "${rq.id}": no option with isCorrect=true`);
        errors++;
      }
    }
  }
}

for (const t of TOPICS) {
  const count = ALL_LESSONS.filter(l => l.topicId === t.id).length;
  console.log(`Station "${t.title}" (${t.id}): ${count} lessons`);
}

if (errors === 0) {
  console.log('✅ ALL TOÁN TƯ DUY LESSONS VALID!');
} else {
  console.error(`❌ Found ${errors} errors!`);
  process.exit(1);
}
