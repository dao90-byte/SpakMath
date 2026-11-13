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
  } else if (act.type === 'pictographBuilder') {
    const sumSymbols = act.categories.reduce((acc, c) => acc + c.targetSymbols, 0);
    if (act.totalPeople !== undefined && act.multiplier !== undefined) {
      if (sumSymbols * act.multiplier !== act.totalPeople) {
        console.error(`❌ pictographBuilder in ${lesson.id}: sumSymbols(${sumSymbols}) * multiplier(${act.multiplier}) != totalPeople(${act.totalPeople})`);
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
  } else if (act.type === 'sudoku') {
    const n = act.solution.length;
    for (let r = 0; r < n; r++) {
      if (new Set(act.solution[r]).size !== n) {
        console.error(`❌ sudoku in ${lesson.id}: duplicate in row ${r}`);
        errors++;
      }
      for (let c = 0; c < n; c++) {
        if (act.initialGrid[r][c] !== null && act.initialGrid[r][c] !== act.solution[r][c]) {
          console.error(`❌ sudoku in ${lesson.id}: initialGrid mismatch at (${r},${c})`);
          errors++;
        }
      }
    }
    for (let c = 0; c < n; c++) {
      const col = act.solution.map(row => row[c]);
      if (new Set(col).size !== n) {
        console.error(`❌ sudoku in ${lesson.id}: duplicate in col ${c}`);
        errors++;
      }
    }
  } else if (act.type === 'pixidoku') {
    const n = act.solution.length;
    for (let r = 0; r < n; r++) {
      if (new Set(act.solution[r]).size !== n) {
        console.error(`❌ pixidoku in ${lesson.id}: duplicate in row ${r}`);
        errors++;
      }
      for (let c = 0; c < n; c++) {
        if (act.initialGrid[r][c] !== null && act.initialGrid[r][c] !== act.solution[r][c]) {
          console.error(`❌ pixidoku in ${lesson.id}: initialGrid mismatch at (${r},${c})`);
          errors++;
        }
      }
    }
    for (let c = 0; c < n; c++) {
      const col = act.solution.map(row => row[c]);
      if (new Set(col).size !== n) {
        console.error(`❌ pixidoku in ${lesson.id}: duplicate in col ${c}`);
        errors++;
      }
    }
  } else if (act.type === 'numberMatrix') {
    const n = act.solution.length;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (act.initialGrid[r][c] !== null && act.initialGrid[r][c] !== act.solution[r][c]) {
          console.error(`❌ numberMatrix in ${lesson.id}: initialGrid mismatch at (${r},${c})`);
          errors++;
        }
      }
    }
    if (act.targetSum !== undefined) {
      for (let i = 0; i < n; i++) {
        const rowSum = act.solution[i].reduce((a, b) => a + b, 0);
        const colSum = act.solution.reduce((a, r) => a + r[i], 0);
        if (rowSum !== act.targetSum || colSum !== act.targetSum) {
          console.error(`❌ numberMatrix in ${lesson.id}: row/col ${i} sum != ${act.targetSum}`);
          errors++;
        }
      }
      if (n >= 3) {
        const d1 = act.solution.reduce((a, r, i) => a + r[i], 0);
        const d2 = act.solution.reduce((a, r, i) => a + r[n - 1 - i], 0);
        if (d1 !== act.targetSum || d2 !== act.targetSum) {
          console.error(`❌ numberMatrix in ${lesson.id}: diag sum != ${act.targetSum}`);
          errors++;
        }
      }
    }
  } else if (act.type === 'flowerMaze') {
    if (act.grid && act.targetPath) {
      for (let i = 0; i < act.targetPath.length; i++) {
        const [r, c] = act.targetPath[i];
        const expected = act.pattern[i % act.pattern.length];
        const actual = act.grid[r]?.[c];
        if (actual !== expected && i !== act.targetPath.length - 1) {
          console.error(`❌ flowerMaze in ${lesson.id} step ${i} (${r},${c}): expected ${expected}, got ${actual}`);
          errors++;
        }
      }
    }
  } else if (act.type === 'matrix2x2') {
    if (!act.choices.some(c => c.id === act.correctChoiceId)) {
      console.error(`❌ matrix2x2 in ${lesson.id}: correctChoiceId ${act.correctChoiceId} not found`);
      errors++;
    }
  } else if (act.type === 'sequencePattern') {
    const correctChoice = act.choices.find(c => c.id === act.correctChoiceId);
    if (!correctChoice) {
      console.error(`❌ sequencePattern in ${lesson.id}: correctChoiceId ${act.correctChoiceId} not found`);
      errors++;
    }
    if (act.sequenceType === 'pyramid' && correctChoice) {
      // Verify triangular pyramid addition or subtraction
      const total = act.items.length;
      let layers = 0;
      while ((layers * (layers + 1)) / 2 < total) layers++;
      if ((layers * (layers + 1)) / 2 === total) {
        const nums = act.items.map(it => it.isMissing ? Number(correctChoice.label) : Number(it.label));
        let offset = 0;
        const rows: number[][] = [];
        for (let len = layers; len >= 1; len--) {
          rows.push(nums.slice(offset, offset + len));
          offset += len;
        }
        for (let r = 0; r < rows.length - 1; r++) {
          for (let i = 0; i < rows[r + 1].length; i++) {
            const isAdd = rows[r][i] + rows[r][i + 1] === rows[r + 1][i];
            const isSub = Math.abs(rows[r][i] - rows[r][i + 1]) === rows[r + 1][i];
            if (!isAdd && !isSub) {
              console.error(`❌ pyramid in ${lesson.id}: layer ${r} (${rows[r][i]}, ${rows[r][i + 1]}) -> ${rows[r + 1][i]}`);
              errors++;
            }
          }
        }
      }
    }
  } else if (act.type === 'cubeCounter') {
    const gridSum = act.gridHeights.flat().reduce((a, b) => a + b, 0);
    const layerSum = act.layers.reduce((a, l) => a + l.count, 0);
    if (gridSum !== act.totalCubes || layerSum !== act.totalCubes) {
      console.error(`❌ cubeCounter in ${lesson.id}: gridSum=${gridSum}, layerSum=${layerSum}, totalCubes=${act.totalCubes}`);
      errors++;
    }
  } else if (act.type === 'treasureVault') {
    if (act.solutionCode.length !== act.codeLength) {
      console.error(`❌ treasureVault in ${lesson.id}: codeLength mismatch`);
      errors++;
    }
    for (let ci = 0; ci < act.clues.length; ci++) {
      const cl = act.clues[ci];
      let exact = 0;
      let present = 0;
      cl.attempt.forEach((d, idx) => {
        if (d === act.solutionCode[idx]) exact++;
        if (act.solutionCode.includes(d)) present++;
      });
      if (exact !== cl.correctPositions || present !== cl.correctDigits) {
        console.error(`❌ treasureVault in ${lesson.id} clue #${ci + 1}: expected (${cl.correctDigits}, ${cl.correctPositions}) got (${present}, ${exact})`);
        errors++;
      }
    }
  } else if (act.type === 'balanceScale') {
    if (!act.targetQuestion.options.some(o => o.id === act.targetQuestion.correctOptionId)) {
      console.error(`❌ balanceScale in ${lesson.id}: correctOptionId not found`);
      errors++;
    }
  } else if (act.type === 'cornerCross') {
    const expectedCross = act.verticalCount + act.horizontalCount - 1;
    const expectedRect = (act.verticalCount + act.horizontalCount) * 2 - 4;
    const ansNum = Number(act.correctAnswer.replace(/\D/g, ''));
    if (ansNum !== expectedCross && ansNum !== expectedRect) {
      console.error(`❌ cornerCross in ${lesson.id}: expected ${expectedCross} or ${expectedRect}, got ${ansNum}`);
      errors++;
    }
  } else if (act.type === 'queueCounter') {
    if (act.options && !act.options.includes(act.correctTotal)) {
      console.error(`❌ queueCounter in ${lesson.id}: correctTotal ${act.correctTotal} not in options`);
      errors++;
    }
  } else if (act.type === 'starBattle') {
    if (act.starsSolution.length !== act.targetStarCount) {
      console.error(`❌ starBattle in ${lesson.id}: star count mismatch`);
      errors++;
    }
    const rows = new Set<number>();
    const cols = new Set<number>();
    const regs = new Set<number>();
    for (let i = 0; i < act.starsSolution.length; i++) {
      const [r, c] = act.starsSolution[i];
      rows.add(r);
      cols.add(c);
      regs.add(act.regions[r][c]);
      for (let j = i + 1; j < act.starsSolution.length; j++) {
        const [r2, c2] = act.starsSolution[j];
        if (Math.abs(r - r2) <= 1 && Math.abs(c - c2) <= 1) {
          console.error(`❌ starBattle in ${lesson.id}: stars (${r},${c}) and (${r2},${c2}) touch`);
          errors++;
        }
      }
    }
    if (rows.size !== act.targetStarCount || cols.size !== act.targetStarCount || regs.size !== act.targetStarCount) {
      console.error(`❌ starBattle in ${lesson.id}: row/col/region uniqueness failed`);
      errors++;
    }
  } else if (act.type === 'slitherlink') {
    const rows = act.rows ?? act.clues.length;
    const cols = act.cols ?? act.clues[0].length;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const clue = act.clues[r][c];
        if (clue !== null) {
          let cnt = 0;
          if (act.solutionEdges.h[r][c]) cnt++;
          if (act.solutionEdges.h[r + 1][c]) cnt++;
          if (act.solutionEdges.v[r][c]) cnt++;
          if (act.solutionEdges.v[r][c + 1]) cnt++;
          if (cnt !== clue) {
            console.error(`❌ slitherlink in ${lesson.id} cell (${r},${c}): clue ${clue} != ${cnt}`);
            errors++;
          }
        }
      }
    }
  } else if (act.type === 'logicSeatOrder') {
    if (act.correctOrder.length !== act.seatsCount) {
      console.error(`❌ logicSeatOrder in ${lesson.id}: seatsCount ${act.seatsCount} != correctOrder.length ${act.correctOrder.length}`);
      errors++;
    }
    for (const ch of act.correctOrder) {
      if (!act.allowedCharacters.includes(ch)) {
        console.error(`❌ logicSeatOrder in ${lesson.id}: character "${ch}" not in allowedCharacters`);
        errors++;
      }
    }
  } else if (act.type === 'itemOrdering') {
    const itemIds = new Set(act.items.map(i => i.id));
    if (act.correctOrder.length !== act.items.length || act.correctOrder.some(id => !itemIds.has(id))) {
      console.error(`❌ itemOrdering in ${lesson.id}: correctOrder mismatch with items`);
      errors++;
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
