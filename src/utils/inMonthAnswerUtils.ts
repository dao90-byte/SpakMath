export type InMonthInputSpec =
  | {
      mode: 'division_remainder';
      expectedQuotient: number;
      expectedRemainder: number;
    }
  | {
      mode: 'text_number';
      expectedNumber: number;
      prefixLabel: string;
      unitLabel: string;
    }
  | {
      mode: 'choice';
    };

export function getInMonthQuestionInputSpec(correctAnswer: string): InMonthInputSpec {
  const trimmed = correctAnswer.trim();

  // Case 1: Division with remainder ("Thương 6, dư 1")
  const divRemMatch = trimmed.match(/^Thương\s+(\d+)\s*,\s*dư\s+(\d+)$/i);
  if (divRemMatch) {
    return {
      mode: 'division_remainder',
      expectedQuotient: parseInt(divRemMatch[1], 10),
      expectedRemainder: parseInt(divRemMatch[2], 10),
    };
  }

  // Case 2: Any answer containing digits -> calculation / numerical free-response
  // Matches e.g. "60 ngôi sao", "43", "Số dư lớn nhất là 4", "Dư 2 quả", "Cần thêm 3 viên", "Dư 1"
  const numMatch = trimmed.match(/^(.*?)(\d+)(?:\s*(.*))?$/);
  if (numMatch && /\d/.test(trimmed)) {
    const prefixLabel = (numMatch[1] || '').trim();
    const expectedNumber = parseInt(numMatch[2], 10);
    const unitLabel = (numMatch[3] || '').trim();
    return {
      mode: 'text_number',
      expectedNumber,
      prefixLabel,
      unitLabel,
    };
  }

  // Case 3: Purely verbal/conceptual choices (e.g. "Màu Đỏ", "Thứ Hai")
  return { mode: 'choice' };
}

function normalizeThousands(raw: string): string {
  // Collapse spaced/dotted thousand groups like "2 150" or "2.150" into "2150"
  return raw.replace(/\b(\d{1,3})(?:[\s.](\d{3}))+\b/g, (full) =>
    full.replace(/[\s.]/g, '')
  );
}

export function isInMonthAnswerCorrect(
  userInput: string,
  correctAnswer: string
): boolean {
  const trimmedInput = userInput.trim();
  const trimmedCorrect = correctAnswer.trim();
  if (!trimmedInput) return false;

  if (trimmedInput.toLowerCase() === trimmedCorrect.toLowerCase()) {
    return true;
  }

  const spec = getInMonthQuestionInputSpec(trimmedCorrect);

  if (spec.mode === 'choice') {
    const u = trimmedInput.toLowerCase().replace(/\s+/g, ' ');
    const c = trimmedCorrect.toLowerCase().replace(/\s+/g, ' ');
    if (u === c) return true;
    // Allow omitting "màu " prefix (e.g. "đỏ" matches "màu đỏ", "lục" matches "màu lục")
    const cNoColorPrefix = c.replace(/^màu\s+/i, '');
    const uNoColorPrefix = u.replace(/^màu\s+/i, '');
    if (cNoColorPrefix && uNoColorPrefix === cNoColorPrefix) return true;
    // Allow numeric weekday formats ("thứ 2" <-> "thứ hai", ..., "thứ 7" <-> "thứ bảy", "cn" <-> "chủ nhật")
    const weekdayMap: Record<string, string[]> = {
      'thứ hai': ['thứ 2', 't2'],
      'thứ ba': ['thứ 3', 't3'],
      'thứ tư': ['thứ 4', 't4'],
      'thứ năm': ['thứ 5', 't5'],
      'thứ sáu': ['thứ 6', 't6'],
      'thứ bảy': ['thứ 7', 't7'],
      'chủ nhật': ['cn'],
    };
    const aliases = weekdayMap[c];
    if (aliases && aliases.includes(u)) return true;
    return false;
  }

  if (spec.mode === 'division_remainder') {
    const nums = trimmedInput.match(/\d+/g);
    if (!nums || nums.length !== 2) return false;
    return (
      parseInt(nums[0], 10) === spec.expectedQuotient &&
      parseInt(nums[1], 10) === spec.expectedRemainder
    );
  }

  // text_number
  const cleaned = normalizeThousands(trimmedInput).toLowerCase().replace(/\s+/g, ' ').trim();
  const expectedStr = String(spec.expectedNumber);

  // Pure number match ("60" for "60 ngôi sao" or "4" for "Số dư lớn nhất là 4")
  if (cleaned === expectedStr) {
    return true;
  }

  // Number + unit match ("60m" or "60 m")
  if (spec.unitLabel) {
    const unitLower = spec.unitLabel.toLowerCase();
    const compactInput = cleaned.replace(/\s+/g, '');
    const compactExpected = `${expectedStr}${unitLower}`.replace(/\s+/g, '');
    if (compactInput === compactExpected) {
      return true;
    }
  }

  // Prefix + number (+ optional unit), e.g., "dư 1", "cần thêm 3", "dư 2 quả"
  const numAndTail = cleaned.match(/^(?:[^\d]*?)(\d+)\s*(.*)$/);
  if (numAndTail) {
    const typedNum = parseInt(numAndTail[1], 10);
    const typedTail = (numAndTail[2] || '').trim();
    if (typedNum !== spec.expectedNumber) return false;
    if (!typedTail) return true;
    if (
      spec.unitLabel &&
      typedTail.replace(/\s+/g, '') === spec.unitLabel.toLowerCase().replace(/\s+/g, '')
    ) {
      return true;
    }
  }

  return false;
}

export function parseDivisionRemainderAnswer(stored: string): {
  quotient: string;
  remainder: string;
} {
  const m = stored.match(/Thương\s*(\d*)\s*,\s*dư\s*(\d*)/i);
  if (m) {
    return { quotient: m[1] || '', remainder: m[2] || '' };
  }
  const nums = stored.match(/\d+/g);
  if (nums && nums.length >= 2) {
    return { quotient: nums[0], remainder: nums[1] };
  }
  if (nums && nums.length === 1) {
    return { quotient: nums[0], remainder: '' };
  }
  return { quotient: '', remainder: '' };
}
