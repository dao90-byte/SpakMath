import {
  InMonthDayPlan,
  InMonthQuestion,
  InMonthFinalExam,
  InMonthExamQuestion,
  InMonthSkillDomain,
  NOVEMBER_IN_MONTH_DAYS,
  NOVEMBER_FINAL_EXAM,
} from './inMonthNovemberData';

export interface InMonthWeekMeta {
  weekNumber: 1 | 2 | 3 | 4 | 5;
  title: string;
  shortLabel: string;
  daysRange: [number, number];
  skillDomain: InMonthSkillDomain;
  color: string;
  description: string;
}

export interface InMonthMonthProgram {
  id: string;
  grade: 3;
  monthNumber: number; // 1..12 (Academic order: 6,7,8,9,10,11,12,1,2,3,4,5)
  semester: 1 | 2;
  label: string; // "Tháng 11"
  shortLabel: string; // "T11"
  title: string;
  heroTitle: string;
  topics: string[];
  accentGradient: string;
  days: InMonthDayPlan[];
  finalExam: InMonthFinalExam;
  weeksMeta: InMonthWeekMeta[];
}

function makeOptions(correct: string, distractors: string[]): string[] {
  const set = new Set<string>([correct]);
  for (const d of distractors) {
    if (d && d.trim() !== '') set.add(d);
    if (set.size === 4) break;
  }
  let step = 1;
  while (set.size < 4) {
    const match = correct.match(/(\d+)/);
    if (match) {
      const n = parseInt(match[1], 10);
      set.add(correct.replace(match[1], String(n + step * 5)));
    } else {
      set.add(`${correct} (${step})`);
    }
    step++;
  }
  const unique = Array.from(set).slice(0, 4);
  const seed = correct.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const shift = seed % unique.length;
  return [...unique.slice(shift), ...unique.slice(0, shift)];
}

interface MonthBlueprint {
  monthNumber: number;
  semester: 1 | 2;
  label: string;
  shortLabel: string;
  title: string;
  heroTitle: string;
  topics: string[];
  accentGradient: string;
  weekNames: [string, string, string, string, string];
  dayFocusList: [string, string, string, string, string];
  domainOrder: [InMonthSkillDomain, InMonthSkillDomain, InMonthSkillDomain, InMonthSkillDomain];
}

const MONTH_BLUEPRINTS: MonthBlueprint[] = [
  {
    monthNumber: 6,
    semester: 1,
    label: 'Tháng 6',
    shortLabel: 'T6',
    title: 'Tìm Chữ Số Thiếu & Bảng Nhân Chia 2, 5, 10',
    heroTitle: 'Làm Chủ Phép Cộng Trừ 3 Chữ Số & Gia Đình Số Nhân Chia',
    topics: [
      'Tìm chữ số ẩn trong phép cộng trừ 3 chữ số',
      'Bảng cửu chương 2, 5 và 10 chuẩn phản xạ',
      'Gia đình số (Fact Families) trong nhân chia',
    ],
    accentGradient: 'from-cyan-500 to-blue-600',
    weekNames: [
      'Tuần 1 · Cộng Trừ Ẩn Số',
      'Tuần 2 · Bảng Nhân 2, 5, 10',
      'Tuần 3 · Bảng Chia & Gia Đình Số',
      'Tuần 4 · Toán Đố 2 Bước',
      'Tuần 5 · Tổng Ôn Tháng 6',
    ],
    dayFocusList: [
      'Tìm chữ số còn thiếu trong phép cộng trừ 3 chữ số',
      'Thành thạo bảng nhân 2, 5 và 10 qua mô hình nhóm',
      'Liên hệ gia đình số giữa phép nhân và phép chia',
      'Giải toán đố cộng trừ có nhớ & nhân chia cơ bản',
      'Tổng ôn chiến lược kiến thức trọng tâm Tháng 6',
    ],
    domainOrder: ['bar_model', 'remainder', 'interval', 'measurement'],
  },
  {
    monthNumber: 7,
    semester: 1,
    label: 'Tháng 7',
    shortLabel: 'T7',
    title: 'Bảng Cửu Chương 3, 4 & Mẹo Tính Nhẩm Tròn Trăm',
    heroTitle: 'Tính Nhẩm Siêu Tốc, Bảng Nhân Chia 3–4 & Chuỗi Quy Luật',
    topics: [
      'Bảng cửu chương 3 và 4 kết hợp toán đố',
      'Mẹo cộng trừ nhanh tạo số tròn trăm',
      'Giải chuỗi hình & dãy số quy luật tăng dần',
    ],
    accentGradient: 'from-emerald-500 to-teal-600',
    weekNames: [
      'Tuần 1 · Mẹo Tròn Trăm',
      'Tuần 2 · Bảng Nhân Chia 3, 4',
      'Tuần 3 · Quy Luật Tăng Dần',
      'Tuần 4 · Toán Đố 2–3 Bước',
      'Tuần 5 · Tổng Ôn Tháng 7',
    ],
    dayFocusList: [
      'Kỹ thuật ghép cặp tạo số tròn trăm tính nhẩm nhanh',
      'Vận dụng bảng nhân và bảng chia 3, 4 vào bài toán thực tế',
      'Khám phá quy luật tăng dần của chuỗi hình và dãy số',
      'Giải toán đố cộng trừ 2–3 bước kết hợp nhân chia',
      'Tổng hợp phản xạ tính nhẩm & tư duy Tháng 7',
    ],
    domainOrder: ['measurement', 'remainder', 'interval', 'bar_model'],
  },
  {
    monthNumber: 8,
    semester: 1,
    label: 'Tháng 8',
    shortLabel: 'T8',
    title: 'Bảng Cửu Chương 6–9 & Toán Thực Tế Về Tiền Tệ',
    heroTitle: 'Chinh Phục Bảng Nhân 6, 7, 8, 9 & Đổi Tiền Thông Minh',
    topics: [
      'Bảng cửu chương 6, 7, 8 và 9',
      'Đếm tiền, đổi tiền và so sánh giá trị',
      'Tính tiền thừa trong bài toán mua sắm 2 bước',
    ],
    accentGradient: 'from-amber-500 to-orange-600',
    weekNames: [
      'Tuần 1 · Bảng Nhân 6–7',
      'Tuần 2 · Bảng Nhân 8–9',
      'Tuần 3 · Đếm & Đổi Tiền',
      'Tuần 4 · Tiền Thừa & Mua Sắm',
      'Tuần 5 · Tổng Ôn Tháng 8',
    ],
    dayFocusList: [
      'Thành thạo bảng cửu chương 6 và 7 qua mô hình trực quan',
      'Làm chủ bảng cửu chương 8 và 9 với bài toán ứng dụng',
      'Quy đổi mệnh giá tiền và so sánh tổng số tiền',
      'Tính tiền thừa và giải toán đố mua sắm nhiều bước',
      'Tổng duyệt bảng nhân 6–9 & bài toán tiền tệ Tháng 8',
    ],
    domainOrder: ['remainder', 'bar_model', 'measurement', 'bar_model'],
  },
  {
    monthNumber: 9,
    semester: 1,
    label: 'Tháng 9',
    shortLabel: 'T9',
    title: 'Bảng Chia 6–9, Hình Học 2D/3D & Toán Gấp Nhiều Lần',
    heroTitle: 'Thành Thạo Bảng Chia 6–9, Phân Loại Hình 2D/3D & Gấp Lần',
    topics: [
      'Bảng chia 6, 7, 8 và 9 chính xác tuyệt đối',
      'Nhận biết & phân loại hình học 2D, 3D',
      'Toán đố gấp nhiều lần & mở rộng tiền tệ',
    ],
    accentGradient: 'from-violet-500 to-purple-600',
    weekNames: [
      'Tuần 1 · Bảng Chia 6–7',
      'Tuần 2 · Bảng Chia 8–9',
      'Tuần 3 · Hình Học 2D & 3D',
      'Tuần 4 · Gấp Lần & Tiền Tệ',
      'Tuần 5 · Tổng Ôn Tháng 9',
    ],
    dayFocusList: [
      'Thực hành bảng chia 6, 7 và tìm thành phần chưa biết',
      'Làm chủ bảng chia 8, 9 trong bài toán chia đều',
      'Phân tích số cạnh, đỉnh, mặt của hình 2D và khối 3D',
      'Giải toán gấp một số lên nhiều lần kết hợp tiền tệ',
      'Tổng ôn hình học, bảng chia 6–9 & sơ đồ Tháng 9',
    ],
    domainOrder: ['remainder', 'remainder', 'interval', 'bar_model'],
  },
  {
    monthNumber: 10,
    semester: 1,
    label: 'Tháng 10',
    shortLabel: 'T10',
    title: 'Nhân Chia Số 2–3 Chữ Số Với 1 Chữ Số & Đếm Hình Khối',
    heroTitle: 'Bứt Phá Nhân Chia Số Nhiều Chữ Số & Tư Duy Không Gian 3D',
    topics: [
      'Phép nhân số 2–3 chữ số với số có 1 chữ số',
      'Phép chia số 2–3 chữ số cho số có 1 chữ số',
      'Kỹ thuật đếm hình khối lập phương xếp tầng',
    ],
    accentGradient: 'from-sky-500 to-indigo-600',
    weekNames: [
      'Tuần 1 · Nhân 2–3 Chữ Số',
      'Tuần 2 · Chia 2–3 Chữ Số',
      'Tuần 3 · Đếm Hình Khối 3D',
      'Tuần 4 · Toán Đố Tổng Hợp',
      'Tuần 5 · Tổng Ôn Tháng 10',
    ],
    dayFocusList: [
      'Đặt tính và tính nhẩm nhân số 2–3 chữ số với 1 chữ số',
      'Chia hết số 2–3 chữ số cho số 1 chữ số từng bước',
      'Đếm khối lập phương theo từng tầng không bỏ sót khối ẩn',
      'Vận dụng nhân chia nhiều chữ số giải toán lời văn',
      'Tổng ôn phép tính nhiều chữ số & hình khối Tháng 10',
    ],
    domainOrder: ['bar_model', 'remainder', 'interval', 'measurement'],
  },
  // Month 11 uses existing NOVEMBER_IN_MONTH_DAYS & NOVEMBER_FINAL_EXAM
  {
    monthNumber: 12,
    semester: 2,
    label: 'Tháng 12',
    shortLabel: 'T12',
    title: 'Chu Vi Hình Vuông, Chữ Nhật, Hình Ghép & Đổi Gam–Lít',
    heroTitle: 'Khám Phá Chu Vi Hình Ghép & Phòng Thí Nghiệm Khối Lượng–Thể Tích',
    topics: [
      'Chu vi hình vuông, hình chữ nhật & hình ghép',
      'Giải toán đố ngược tìm cạnh khi biết chu vi',
      'Đổi đơn vị gam – ki-lô-gam & lít – mi-li-lít',
    ],
    accentGradient: 'from-rose-500 to-pink-600',
    weekNames: [
      'Tuần 1 · Chu Vi Cơ Bản',
      'Tuần 2 · Chu Vi Hình Ghép',
      'Tuần 3 · Đổi Gam & Ki-lô-gam',
      'Tuần 4 · Đổi Lít & Mi-li-lít',
      'Tuần 5 · Tổng Ôn Tháng 12',
    ],
    dayFocusList: [
      'Tính chu vi hình vuông và hình chữ nhật qua kích thước cạnh',
      'Kỹ thuật dời cạnh tìm chu vi hình ghép chữ L, chữ U',
      'Đọc cân đồng hồ, so sánh và đổi đơn vị kg – g',
      'Đổi đơn vị lít (L) – mi-li-lít (mL) và bài toán san bình',
      'Tổng ôn chu vi hình học & đo lường chuẩn Tháng 12',
    ],
    domainOrder: ['interval', 'bar_model', 'measurement', 'measurement'],
  },
  {
    monthNumber: 1,
    semester: 2,
    label: 'Tháng 1',
    shortLabel: 'T1',
    title: 'Số Phạm Vi 10 000, Chuỗi Quy Luật & Diện Tích Hình Ghép',
    heroTitle: 'Mở Rộng Số Đến 10 000 & Liên Kết Diện Tích Với Chu Vi',
    topics: [
      'Cấu tạo, so sánh & cộng trừ số phạm vi 10 000',
      'Giải mã chuỗi số theo quy luật tăng giảm',
      'Tính diện tích đếm ô vuông & hình ghép chữ nhật',
    ],
    accentGradient: 'from-indigo-500 to-blue-600',
    weekNames: [
      'Tuần 1 · Số Phạm Vi 10 000',
      'Tuần 2 · Cộng Trừ & Quy Luật',
      'Tuần 3 · Diện Tích Ô Vuông',
      'Tuần 4 · Liên Kết Diện Tích & Chu Vi',
      'Tuần 5 · Tổng Ôn Tháng 1',
    ],
    dayFocusList: [
      'Phân tích hàng nghìn, trăm, chục, đơn vị trong phạm vi 10 000',
      'Cộng trừ trong phạm vi 10 000 và tìm số tiếp theo trong chuỗi',
      'Tính diện tích hình chữ nhật, hình vuông và hình ghép ô vuông',
      'Giải toán liên kết giữa chu vi và diện tích',
      'Tổng ôn số 10 000 & hình học diện tích Tháng 1',
    ],
    domainOrder: ['measurement', 'interval', 'bar_model', 'interval'],
  },
  {
    monthNumber: 2,
    semester: 2,
    label: 'Tháng 2',
    shortLabel: 'T2',
    title: 'Số Phạm Vi 100 000 & Tuyệt Chiêu Tính Nhanh Nhân–Cộng–Trừ',
    heroTitle: 'Chinh Phục Hàng Chục Nghìn (100 000) & Mẹo Tính Nhanh Đỉnh Cao',
    topics: [
      'Đọc, viết & giá trị các hàng đến 100 000',
      'Mẹo tính nhanh cộng trừ bằng bù trừ hợp lý',
      'Mẹo nhân nhanh tách thừa số & phân phối',
    ],
    accentGradient: 'from-fuchsia-500 to-purple-600',
    weekNames: [
      'Tuần 1 · Số Đến 100 000',
      'Tuần 2 · Mẹo Cộng Trừ Nhanh',
      'Tuần 3 · Mẹo Nhân Nhẩm Nhanh',
      'Tuần 4 · Toán Đố Số Lớn',
      'Tuần 5 · Tổng Ôn Tháng 2',
    ],
    dayFocusList: [
      'Xác định giá trị chữ số hàng chục nghìn và so sánh số đến 100 000',
      'Tính nhanh phép cộng, phép trừ bằng nhóm số tròn nghìn',
      'Áp dụng tính chất kết hợp và nhân với 5, 25, 9, 11',
      'Giải bài toán có lời văn với số liệu trong phạm vi 100 000',
      'Tổng ôn số 100 000 & kỹ thuật tính nhanh Tháng 2',
    ],
    domainOrder: ['measurement', 'bar_model', 'remainder', 'bar_model'],
  },
  {
    monthNumber: 3,
    semester: 2,
    label: 'Tháng 3',
    shortLabel: 'T3',
    title: 'Thời Gian 12h–24h, Sơ Đồ Phần–Tổng & Toán Ngược Mũi Tên',
    heroTitle: 'Làm Chủ Giờ 24h, Sơ Đồ Phần–Tổng & Suy Luận Ngược Mũi Tên',
    topics: [
      'Chuyển đổi giờ 12h/24h, giờ kém & khoảng thời gian',
      'Sơ đồ Phần – Tổng cho nhiều đại lượng',
      'Toán ngược tìm số lượng ban đầu bằng sơ đồ mũi tên',
    ],
    accentGradient: 'from-teal-500 to-emerald-600',
    weekNames: [
      'Tuần 1 · Thời Gian & Đồng Hồ',
      'Tuần 2 · Sơ Đồ Phần - Tổng',
      'Tuần 3 · Toán Ngược Mũi Tên',
      'Tuần 4 · Ứng Dụng Tổng Hợp',
      'Tuần 5 · Tổng Ôn Tháng 3',
    ],
    dayFocusList: [
      'Chuyển đổi định dạng 12 giờ – 24 giờ và tính khoảng thời gian',
      'Tìm tổng hoặc hiệu nhiều đại lượng bằng sơ đồ Phần - Tổng',
      'Truy ngược từng bước trên sơ đồ mũi tên tìm giá trị ban đầu',
      'Kết hợp bài toán thời gian và sơ đồ thanh giải toán đố',
      'Tổng ôn thời gian, sơ đồ thanh & toán ngược Tháng 3',
    ],
    domainOrder: ['interval', 'bar_model', 'bar_model', 'measurement'],
  },
  {
    monthNumber: 4,
    semester: 2,
    label: 'Tháng 4',
    shortLabel: 'T4',
    title: 'Biểu Đồ Hình Ảnh–Cột & Toán Ngược 2 Bước Với Sơ Đồ Thanh',
    heroTitle: 'Phân Tích Đa Biểu Đồ & Thành Thạo Toán Ngược 2 Bước',
    topics: [
      'Đọc, chuyển đổi giữa biểu đồ hình ảnh, dấu chấm & cột',
      'Lập bảng và giải toán số liệu từ biểu đồ',
      'Làm toán ngược 2 bước trên sơ đồ thanh Singapore',
    ],
    accentGradient: 'from-orange-500 to-amber-600',
    weekNames: [
      'Tuần 1 · Biểu Đồ Hình Ảnh & Cột',
      'Tuần 2 · Chuyển Đổi Bảng Số Liệu',
      'Tuần 3 · Toán Ngược 1–2 Bước',
      'Tuần 4 · Sơ Đồ Thanh Nâng Cao',
      'Tuần 5 · Tổng Ôn Tháng 4',
    ],
    dayFocusList: [
      'Đọc biểu đồ cột và biểu đồ tranh theo tỉ lệ mỗi biểu tượng',
      'Chuyển đổi dữ liệu giữa bảng thống kê và biểu đồ trực quan',
      'Giải bài toán ngược 2 bước bằng phương pháp vẽ sơ đồ thanh',
      'Phân tích dữ liệu biểu đồ giải bài toán tìm trung bình & hiệu',
      'Tổng ôn phân tích biểu đồ & toán ngược 2 bước Tháng 4',
    ],
    domainOrder: ['measurement', 'measurement', 'bar_model', 'bar_model'],
  },
  {
    monthNumber: 5,
    semester: 2,
    label: 'Tháng 5',
    shortLabel: 'T5',
    title: 'Quy Luật Chuỗi Hình Nâng Cao & Phương Pháp Thay Thế Nhóm',
    heroTitle: 'Tư Duy Olympic: Chuỗi Quy Luật Đa Tầng & Phương Pháp Thế Nhóm',
    topics: [
      'Chuỗi quy luật vị trí, hướng quay, hình dạng & số lượng',
      'Phương pháp thay thế một hoặc nhiều nhóm ẩn',
      'Tổng kết năng lực Toán Tư Duy Singapore Lớp 3',
    ],
    accentGradient: 'from-purple-500 to-pink-600',
    weekNames: [
      'Tuần 1 · Chuỗi Quy Luật Hình',
      'Tuần 2 · Thế 1 Nhóm Ẩn',
      'Tuần 3 · Thế Nhiều Nhóm Ẩn',
      'Tuần 4 · Olympic Tư Duy Tổng Hợp',
      'Tuần 5 · Tổng Duyệt Cuối Năm',
    ],
    dayFocusList: [
      'Xác định quy luật vị trí, số lượng và chu kỳ trong chuỗi hình',
      'Dùng phương pháp thay thế 1 nhóm giải hệ 2 đại lượng',
      'Khử và thế nhiều nhóm tìm giá trị từng biểu tượng',
      'Giải toán tư duy kết hợp quy luật và thay thế Olympic',
      'Tổng duyệt toàn diện chương trình Toán Tư Duy Lớp 3',
    ],
    domainOrder: ['remainder', 'bar_model', 'bar_model', 'interval'],
  },
];

function buildMonthlyQuestionsForDay(
  bp: MonthBlueprint,
  day: number
): InMonthQuestion[] {
  const m = bp.monthNumber;
  const seed = m * 31 + day;
  const a = 12 + (day % 9) * 3 + (m % 5) * 2;
  const mult = (day % 4) + 2; // 2..5
  const b = 15 + day * 2 + m;

  // Deterministic curriculum-matched problems tailored per month blueprint
  // Every calculation answer yields a clean integer (or quotient/remainder) verified mathematically.
  if (m === 6) {
    // Missing digit, fact families (2, 5, 10), 2-step addition/subtraction
    const missingUnit = (day + 2) % 8 + 1;
    const addA = 120 + day * 10 + missingUnit;
    const addB = 230 + (day % 5) * 10 + 4;
    const addSum = addA + addB;
    const mult2 = 2 * (4 + (day % 6));
    const mult5 = 5 * (3 + (day % 7));
    const mult10 = 10 * (2 + (day % 8));
    const subA = 540 + day * 5;
    const subB = 180 + day * 3;
    const subDiff = subA - subB;

    return [
      {
        id: `m6-d${day}-q1`,
        stage: 'warmup',
        skillDomain: 'bar_model',
        prompt: `Tìm chữ số còn thiếu ở hàng đơn vị ($*$) trong phép cộng: ${Math.floor(addA / 10)}* + ${addB} = ${addSum}.`,
        options: makeOptions(`${missingUnit}`, [`${(missingUnit + 2) % 9 + 1}`, `${(missingUnit + 4) % 9 + 1}`, `${(missingUnit + 6) % 9 + 1}`]),
        correctAnswer: `${missingUnit}`,
        hint: `Xét cột hàng đơn vị: * + 4 có tận cùng là ${addSum % 10}.`,
        stepByStepExplanation: [`${addSum} - ${addB} = ${addA}, suy ra chữ số hàng đơn vị * là ${missingUnit}.`],
        visualModel: {
          type: 'bar_model',
          title: 'Sơ đồ Phần - Tổng phép cộng 3 chữ số',
          bars: [
            { label: 'Số hạng 1', valueLabel: `${Math.floor(addA / 10)}*`, units: 2, color: '#0284C7' },
            { label: 'Số hạng 2', valueLabel: `${addB}`, units: 3, color: '#7C3AED' },
          ],
          totalBracketLabel: `Tổng = ${addSum}`,
        },
      },
      {
        id: `m6-d${day}-q2`,
        stage: 'warmup',
        skillDomain: 'remainder',
        prompt: `Mỗi túi có 5 viên bi năng lượng. Hỏi ${3 + (day % 7)} túi như thế có tất cả bao nhiêu viên bi?`,
        options: makeOptions(`${mult5} viên bi`, [`${mult5 + 5} viên bi`, `${mult5 - 5} viên bi`, `${mult5 + 10} viên bi`]),
        correctAnswer: `${mult5} viên bi`,
        hint: `Áp dụng bảng nhân 5: lấy 5 × ${3 + (day % 7)}.`,
        stepByStepExplanation: [`Số viên bi có tất cả là: 5 × ${3 + (day % 7)} = ${mult5} (viên bi).`],
        visualModel: {
          type: 'remainder_groups',
          title: `Mô hình bảng nhân 5 (${3 + (day % 7)} túi)`,
          dividend: mult5,
          divisor: 5,
          quotient: 3 + (day % 7),
          remainder: 0,
          itemIcon: '🔮',
          groupLabel: 'Túi',
        },
      },
      {
        id: `m6-d${day}-q3`,
        stage: 'visualModel',
        skillDomain: 'remainder',
        prompt: `Gia đình số nhân chia: Có ${mult2} ngôi sao xếp đều vào 2 hộp. Hỏi mỗi hộp có bao nhiêu ngôi sao?`,
        options: makeOptions(`${mult2 / 2} ngôi sao`, [`${mult2 / 2 + 2} ngôi sao`, `${mult2 / 2 - 1} ngôi sao`, `${mult2} ngôi sao`]),
        correctAnswer: `${mult2 / 2} ngôi sao`,
        hint: `Dựa vào phép nhân 2 × ? = ${mult2}, lấy ${mult2} : 2.`,
        stepByStepExplanation: [`Số ngôi sao trong mỗi hộp là: ${mult2} : 2 = ${mult2 / 2} (ngôi sao).`],
        visualModel: {
          type: 'remainder_groups',
          title: `Chia đều ${mult2} ngôi sao vào 2 hộp`,
          dividend: mult2,
          divisor: 2,
          quotient: mult2 / 2,
          remainder: 0,
          itemIcon: '⭐',
          groupLabel: 'Hộp',
        },
      },
      {
        id: `m6-d${day}-q4`,
        stage: 'visualModel',
        skillDomain: 'bar_model',
        prompt: `Thực hiện phép trừ: ${subA} - ${subB} bằng bao nhiêu?`,
        options: makeOptions(`${subDiff}`, [`${subDiff + 10}`, `${subDiff - 10}`, `${subDiff + 100}`]),
        correctAnswer: `${subDiff}`,
        hint: `Trừ lần lượt từ hàng đơn vị đến hàng chục, hàng trăm (nhớ nếu có).`,
        stepByStepExplanation: [`${subA} - ${subB} = ${subDiff}.`],
        visualModel: {
          type: 'bar_model',
          title: 'Sơ đồ So sánh Hiệu hai số 3 chữ số',
          bars: [
            { label: 'Số bị trừ', valueLabel: `${subA}`, units: 4, color: '#0284C7' },
            { label: 'Số trừ', valueLabel: `${subB}`, units: 2, color: '#10B981' },
          ],
          differenceBracketLabel: 'Hiệu cần tìm = ?',
        },
      },
      {
        id: `m6-d${day}-q5`,
        stage: 'visualModel',
        skillDomain: 'remainder',
        prompt: `Một khay đựng được 10 chiếc bánh vũ trụ. Có ${mult10} chiếc bánh thì xếp đầy được bao nhiêu khay?`,
        options: makeOptions(`${mult10 / 10} khay`, [`${mult10 / 10 + 1} khay`, `${mult10 / 10 + 2} khay`, `${mult10 / 10 - 1} khay`]),
        correctAnswer: `${mult10 / 10} khay`,
        hint: `Lấy tổng số bánh chia cho 10.`,
        stepByStepExplanation: [`Số khay xếp đầy là: ${mult10} : 10 = ${mult10 / 10} (khay).`],
        visualModel: {
          type: 'remainder_groups',
          title: `Bảng chia 10: ${mult10} : 10`,
          dividend: mult10,
          divisor: 10,
          quotient: mult10 / 10,
          remainder: 0,
          itemIcon: '🧁',
          groupLabel: 'Khay',
        },
      },
      {
        id: `m6-d${day}-q6`,
        stage: 'practice',
        skillDomain: 'bar_model',
        prompt: `Tìm số $X$ biết: $X + ${addB} = ${addSum}$.`,
        options: makeOptions(`${addA}`, [`${addA + 10}`, `${addA - 10}`, `${addSum + addB}`]),
        correctAnswer: `${addA}`,
        hint: `Muốn tìm số hạng chưa biết, lấy Tổng (${addSum}) trừ đi số hạng đã biết (${addB}).`,
        stepByStepExplanation: [`X = ${addSum} - ${addB} = ${addA}.`],
        visualModel: {
          type: 'bar_model',
          title: 'Tìm số hạng chưa biết trên sơ đồ thanh',
          bars: [
            { label: 'Số X', valueLabel: '?', units: 2, color: '#F59E0B' },
            { label: 'Số đã biết', valueLabel: `${addB}`, units: 3, color: '#0284C7' },
          ],
          totalBracketLabel: `Tổng = ${addSum}`,
        },
      },
      {
        id: `m6-d${day}-q7`,
        stage: 'practice',
        skillDomain: 'remainder',
        prompt: `Tìm giá trị của $Y$ trong gia đình số: $Y : 5 = ${4 + (day % 6)}$.`,
        options: makeOptions(`${5 * (4 + (day % 6))}`, [`${5 * (4 + (day % 6)) + 5}`, `${5 * (4 + (day % 6)) - 5}`, `${9 + (day % 6)}`]),
        correctAnswer: `${5 * (4 + (day % 6))}`,
        hint: `Số bị chia = Thương × Số chia.`,
        stepByStepExplanation: [`Y = ${4 + (day % 6)} × 5 = ${5 * (4 + (day % 6))}.`],
        visualModel: {
          type: 'remainder_groups',
          title: 'Gia đình số: Phép chia ↔ Phép nhân',
          dividend: 5 * (4 + (day % 6)),
          divisor: 5,
          quotient: 4 + (day % 6),
          remainder: 0,
          itemIcon: '💎',
          groupLabel: 'Nhóm',
        },
      },
      {
        id: `m6-d${day}-q8`,
        stage: 'practice',
        skillDomain: 'bar_model',
        prompt: `Thư viện tàu vũ trụ có ${addA} cuốn sách khoa học và ${addB} cuốn sách thiên văn. Hỏi thư viện có tất cả bao nhiêu cuốn sách?`,
        options: makeOptions(`${addSum} cuốn sách`, [`${addSum + 10} cuốn sách`, `${addSum - 10} cuốn sách`, `${addB - addA} cuốn sách`]),
        correctAnswer: `${addSum} cuốn sách`,
        hint: `Cộng số sách khoa học và số sách thiên văn.`,
        stepByStepExplanation: [`Tổng số sách là: ${addA} + ${addB} = ${addSum} (cuốn sách).`],
        visualModel: {
          type: 'bar_model',
          title: 'Sơ đồ Phần - Tổng số sách',
          bars: [
            { label: 'Khoa học', valueLabel: `${addA}`, units: 2, color: '#0284C7' },
            { label: 'Thiên văn', valueLabel: `${addB}`, units: 3, color: '#10B981' },
          ],
          totalBracketLabel: 'Tổng cộng = ? cuốn sách',
        },
      },
      {
        id: `m6-d${day}-q9`,
        stage: 'practice',
        skillDomain: 'measurement',
        prompt: `Một sợi dây dài ${mult10} cm được chia thành 10 đoạn bằng nhau. Sau đó lấy đi 3 đoạn, hỏi 3 đoạn đó dài tất cả bao nhiêu xăng-ti-mét?`,
        options: makeOptions(`${(mult10 / 10) * 3} cm`, [`${(mult10 / 10) * 2} cm`, `${(mult10 / 10) * 4} cm`, `${mult10 - 3} cm`]),
        correctAnswer: `${(mult10 / 10) * 3} cm`,
        hint: `Tìm độ dài 1 đoạn (${mult10} : 10), rồi nhân với 3.`,
        stepByStepExplanation: [`1 đoạn dài: ${mult10} : 10 = ${mult10 / 10} cm. 3 đoạn dài: ${mult10 / 10} × 3 = ${(mult10 / 10) * 3} cm.`],
        visualModel: {
          type: 'measurement_lab',
          measurementSubtype: 'length_scale',
          title: 'Chia đoạn dây thành 10 phần bằng nhau',
          primaryReading: `10 đoạn = ${mult10} cm`,
          secondaryReading: `Cần tìm: 3 đoạn`,
          conversionRule: 'Tìm 1 đoạn rồi nhân với 3',
        },
      },
      {
        id: `m6-d${day}-q10`,
        stage: 'challenge',
        skillDomain: 'bar_model',
        prompt: `Thử thách Tìm chữ số ẩn: Nếu viết thêm chữ số 0 vào bên phải số ${a} thì được số mới lớn hơn số ${a} bao nhiêu đơn vị?`,
        options: makeOptions(`${a * 9}`, [`${a * 10}`, `${a * 8}`, `${a * 11}`]),
        correctAnswer: `${a * 9}`,
        hint: `Viết thêm chữ số 0 vào bên phải số ${a} ta được số ${a * 10}. Lấy ${a * 10} - ${a}.`,
        stepByStepExplanation: [`Số mới là ${a * 10}. Hiệu là: ${a * 10} - ${a} = ${a * 9}.`],
        visualModel: {
          type: 'bar_model',
          title: 'Gấp 10 lần và tìm phần hơn',
          bars: [
            { label: 'Số ban đầu', valueLabel: `${a}`, units: 1, color: '#0284C7' },
            { label: 'Số mới (×10)', valueLabel: `${a * 10}`, units: 5, color: '#7C3AED' },
          ],
          differenceBracketLabel: 'Lớn hơn = ? đơn vị',
        },
      },
      {
        id: `m6-d${day}-q11`,
        stage: 'challenge',
        skillDomain: 'remainder',
        prompt: `Thử thách Gia đình số: Biết tổng của một số nhân với 5 và một số khác nhân với 2 là ${mult5 + mult2}. Nếu số nhân với 5 là ${3 + (day % 7)}, thì số nhân với 2 là bao nhiêu?`,
        options: makeOptions(`${mult2 / 2}`, [`${mult2 / 2 + 1}`, `${mult2 / 2 + 2}`, `${mult2}`]),
        correctAnswer: `${mult2 / 2}`,
        hint: `Tính tích thứ nhất: 5 × ${3 + (day % 7)} = ${mult5}. Lấy tổng trừ đi ${mult5} rồi chia cho 2.`,
        stepByStepExplanation: [`Phần còn lại là: ${mult5 + mult2} - ${mult5} = ${mult2}. Số cần tìm là: ${mult2} : 2 = ${mult2 / 2}.`],
        visualModel: {
          type: 'remainder_groups',
          title: 'Tách nhóm 5 và nhóm 2',
          dividend: mult2,
          divisor: 2,
          quotient: mult2 / 2,
          remainder: 0,
          itemIcon: '🌟',
          groupLabel: 'Cặp',
        },
      },
    ];
  }

  // Generic rich curriculum-aligned generator for Months 7, 8, 9, 10, 12, 1, 2, 3, 4, 5
  const isGeometryOrArea = m === 9 || m === 10 || m === 12 || m === 1;
  const isTimeMonth = m === 3;
  const isMoneyMonth = m === 8;
  const isMentalOrLargeNum = m === 7 || m === 2;
  const isChartOrSubst = m === 4 || m === 5;

  const multA = isMoneyMonth ? 6 + (day % 4) : isGeometryOrArea ? 4 + (day % 5) : 3 + (day % 6);
  const unitB = 4 + ((day + m) % 6);
  const prodAB = multA * unitB;
  const largeBase = m === 2 ? 12000 + day * 1000 : m === 1 ? 2400 + day * 100 : 120 + day * 10;
  const largeAdd = m === 2 ? 8000 - day * 100 : m === 1 ? 1600 + day * 50 : 80 + day * 5;
  const largeSum = largeBase + largeAdd;
  const rectW = 6 + (day % 6);
  const rectL = rectW + 3 + (day % 4);
  const rectPerim = (rectL + rectW) * 2;
  const rectArea = rectL * rectW;
  const roundPrice = 5000 * (2 + (day % 5));
  const itemCost = 3000 + (day % 4) * 1000;
  const changeMoney = roundPrice - itemCost;
  const startHour12 = 1 + (day % 8);
  const hour24 = startHour12 + 12;
  const cubeCols = 4 + (day % 5);
  const cubeTotal = cubeCols * 2 + 3;
  const subOne = 4 + (day % 5);
  const subTwo = subOne * 2 + 3;
  const stepSeq = 3 + (day % 5);
  const seqFirst = 5 + day;

  const q1Prompt = isMoneyMonth
    ? `Mỗi quyển sổ phi hành gia giá ${multA} nghìn đồng. Hỏi mua ${unitB} quyển sổ như thế hết bao nhiêu nghìn đồng?`
    : isTimeMonth
    ? `Chuyển đổi sang định dạng 24 giờ: ${startHour12} giờ chiều tương ứng với mấy giờ trong hệ 24 giờ?`
    : isGeometryOrArea && (m === 12 || m === 1)
    ? `Một sân đỗ hình chữ nhật có chiều dài ${rectL} m và chiều rộng ${rectW} m. Tính chu vi sân đỗ đó (đơn vị mét).`
    : isMentalOrLargeNum
    ? `Tính nhẩm nhanh tổng sau: ${largeBase} + ${largeAdd} = ?`
    : `Mỗi hộp có ${multA} mô hình tên lửa. Hỏi ${unitB} hộp như thế có tất cả bao nhiêu mô hình tên lửa?`;

  const q1Ans = isMoneyMonth
    ? `${prodAB} nghìn đồng`
    : isTimeMonth
    ? `${hour24} giờ`
    : isGeometryOrArea && (m === 12 || m === 1)
    ? `${rectPerim} m`
    : isMentalOrLargeNum
    ? `${largeSum}`
    : `${prodAB} mô hình`;

  const q2Prompt = isMoneyMonth
    ? `Bạn Minh đưa cô bán hàng ${roundPrice} đồng để mua chiếc bút giá ${itemCost} đồng. Hỏi cô bán hàng cần trả lại Minh bao nhiêu đồng tiền thừa?`
    : isGeometryOrArea && m === 1
    ? `Tính diện tích hình chữ nhật có chiều dài ${rectL} cm và chiều rộng ${rectW} cm.`
    : isGeometryOrArea && m === 12
    ? `Một mảnh ghép hình vuông có cạnh dài ${rectW} cm. Tính chu vi hình vuông đó.`
    : isChartOrSubst && m === 5
    ? `Dãy số quy luật tăng dần: ${seqFirst}; ${seqFirst + stepSeq}; ${seqFirst + stepSeq * 2}; ${seqFirst + stepSeq * 3}; ... Số tiếp theo là bao nhiêu?`
    : `Phép tính chia đều: Có ${prodAB} ngôi sao chia đều cho ${multA} đội. Hỏi mỗi đội nhận được bao nhiêu ngôi sao?`;

  const q2Ans = isMoneyMonth
    ? `${changeMoney} đồng`
    : isGeometryOrArea && m === 1
    ? `${rectArea} cm²`
    : isGeometryOrArea && m === 12
    ? `${rectW * 4} cm`
    : isChartOrSubst && m === 5
    ? `${seqFirst + stepSeq * 4}`
    : `${unitB} ngôi sao`;

  const kgAmt = 2 + (day % 4);
  const gAmt = 250 + (day % 5) * 100;
  const totalG = kgAmt * 1000 + gAmt;

  const q3Ans = `${totalG} g`;
  const q4Ans = `${a * (mult + 1)} quả`;
  const q5Ans = `${a * (mult - 1)} viên`;
  const q6Ans = `${cubeTotal} khối`;
  const q7Colors = ['Đỏ', 'Vàng', 'Xanh', 'Tím'];
  const q7Pos = 17 + day;
  const q7Color = q7Colors[(q7Pos % 4 === 0 ? 4 : q7Pos % 4) - 1];
  const q7Ans = `Màu ${q7Color}`;
  const q8BackStart = 20 + day * 2;
  const q8Ans = `${q8BackStart}`;
  const q9Ans = `${prodAB + b} điểm`;
  const q10Ans = `${subTwo} đơn vị`;
  const q11Ans = `${seqFirst + stepSeq * 5}`;

  return [
    {
      id: `m${m}-d${day}-q1`,
      stage: 'warmup',
      skillDomain: bp.domainOrder[0],
      prompt: q1Prompt,
      options: makeOptions(q1Ans, [`${prodAB + 4}`, `${largeSum + 100}`, `${rectPerim + 2}`]),
      correctAnswer: q1Ans,
      hint: `Kiểm tra kỹ phép tính và đơn vị đo trước khi trả lời.`,
      stepByStepExplanation: [`Kết quả chính xác là: ${q1Ans}.`],
      visualModel: {
        type: 'bar_model',
        title: `Trọng tâm ${bp.label}: ${bp.weekNames[0]}`,
        bars: [
          { label: 'Đại lượng 1', valueLabel: `${isMentalOrLargeNum ? largeBase : multA}`, units: 2, color: '#0284C7' },
          { label: 'Đại lượng 2', valueLabel: `${isMentalOrLargeNum ? largeAdd : unitB}`, units: 3, color: '#7C3AED' },
        ],
      },
    },
    {
      id: `m${m}-d${day}-q2`,
      stage: 'warmup',
      skillDomain: bp.domainOrder[1],
      prompt: q2Prompt,
      options: makeOptions(q2Ans, [`${unitB + 2} ngôi sao`, `${changeMoney + 1000} đồng`, `${rectArea + 4} cm²`]),
      correctAnswer: q2Ans,
      hint: `Thực hiện cẩn thận phép tính theo yêu cầu bài toán.`,
      stepByStepExplanation: [`Đáp án đúng là: ${q2Ans}.`],
      visualModel: {
        type: 'remainder_groups',
        title: 'Mô hình nhóm trực quan',
        dividend: prodAB,
        divisor: multA,
        quotient: unitB,
        remainder: 0,
        itemIcon: '⭐',
        groupLabel: 'Nhóm',
      },
    },
    {
      id: `m${m}-d${day}-q3`,
      stage: 'visualModel',
      skillDomain: 'measurement',
      prompt: `Đổi đơn vị khối lượng: ${kgAmt} kg ${gAmt} g đổi sang đơn vị gam (g) bằng bao nhiêu?`,
      options: makeOptions(q3Ans, [`${kgAmt * 100 + gAmt} g`, `${totalG + 100} g`, `${totalG - 100} g`]),
      correctAnswer: q3Ans,
      hint: `Nhớ quy tắc: 1 kg = 1 000 g.`,
      stepByStepExplanation: [`${kgAmt} kg = ${kgAmt * 1000} g, cộng thêm ${gAmt} g bằng ${totalG} g.`],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'weight_balance',
        title: 'Quy đổi Ki-lô-gam sang Gam',
        primaryReading: `${kgAmt} kg ${gAmt} g`,
        secondaryReading: `= ? gam`,
        conversionRule: '1 kg = 1 000 g',
      },
    },
    {
      id: `m${m}-d${day}-q4`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Sơ đồ Phần - Tổng: Giỏ 1 có ${a} quả táo. Giỏ 2 có số táo gấp ${mult} lần Giỏ 1. Hỏi CẢ HAI giỏ có tất cả bao nhiêu quả táo?`,
      options: makeOptions(q4Ans, [`${a * mult} quả`, `${a * (mult + 2)} quả`, `${a + mult} quả`]),
      correctAnswer: q4Ans,
      hint: `Tổng số phần bằng nhau là 1 + ${mult} = ${mult + 1} phần.`,
      stepByStepExplanation: [`Giỏ 2 có ${a * mult} quả. Tổng 2 giỏ là: ${a} + ${a * mult} = ${a * (mult + 1)} quả.`],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ Phần - Tổng',
        bars: [
          { label: 'Giỏ 1', valueLabel: `${a}`, units: 1, color: '#0284C7' },
          { label: 'Giỏ 2', valueLabel: `${mult} phần`, units: mult, color: '#F59E0B' },
        ],
        totalBracketLabel: `Tổng cả 2 giỏ = ? (${mult + 1} phần)`,
      },
    },
    {
      id: `m${m}-d${day}-q5`,
      stage: 'visualModel',
      skillDomain: 'bar_model',
      prompt: `Sơ đồ So sánh: Đội A có ${a} viên năng lượng. Đội B có gấp ${mult} lần Đội A. Hỏi Đội B nhiều hơn Đội A bao nhiêu viên?`,
      options: makeOptions(q5Ans, [`${a * mult} viên`, `${a * (mult + 1)} viên`, `${a} viên`]),
      correctAnswer: q5Ans,
      hint: `Hiệu số phần là ${mult} - 1 = ${mult - 1} phần.`,
      stepByStepExplanation: [`Đội B nhiều hơn Đội A: ${a} × (${mult} - 1) = ${a * (mult - 1)} viên.`],
      visualModel: {
        type: 'bar_model',
        title: 'Sơ đồ So sánh Hơn - Kém',
        bars: [
          { label: 'Đội A', valueLabel: `${a}`, units: 1, color: '#10B981' },
          { label: 'Đội B', valueLabel: `${mult} phần`, units: mult, color: '#7C3AED' },
        ],
        differenceBracketLabel: `Chênh lệch = ? (${mult - 1} phần)`,
      },
    },
    {
      id: `m${m}-d${day}-q6`,
      stage: 'practice',
      skillDomain: 'interval',
      prompt: `Đếm hình khối 3D: Một mô hình gồm 2 tầng, tầng dưới có ${cubeCols + 3} khối lập phương và tầng trên xếp ${cubeCols} khối lập phương. Hỏi mô hình có tất cả bao nhiêu khối lập phương?`,
      options: makeOptions(q6Ans, [`${cubeTotal + 2} khối`, `${cubeTotal - 1} khối`, `${cubeCols * 2} khối`]),
      correctAnswer: q6Ans,
      hint: `Cộng số khối ở tầng dưới và số khối ở tầng trên.`,
      stepByStepExplanation: [`Tổng số khối lập phương là: ${cubeCols + 3} + ${cubeCols} = ${cubeTotal} khối.`],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_chart',
        title: 'Đếm hình khối theo từng tầng',
        chartItems: [
          { label: 'Tầng dưới', value: cubeCols + 3, unit: 'khối', color: '#0284C7' },
          { label: 'Tầng trên', value: cubeCols, unit: 'khối', color: '#7C3AED' },
        ],
      },
    },
    {
      id: `m${m}-d${day}-q7`,
      stage: 'practice',
      skillDomain: 'remainder',
      prompt: `Quy luật chu kỳ 4 màu lặp lại theo thứ tự: Đỏ ➔ Vàng ➔ Xanh ➔ Tím. Hỏi phần tử thứ ${q7Pos} có màu gì?`,
      options: makeOptions(q7Ans, ['Màu Đỏ', 'Màu Vàng', 'Màu Xanh', 'Màu Tím']),
      correctAnswer: q7Ans,
      hint: `Lấy ${q7Pos} chia cho 4 rồi xem số dư (Dư 1: Đỏ, 2: Vàng, 3: Xanh, 0: Tím).`,
      stepByStepExplanation: [`${q7Pos} : 4 = ${Math.floor(q7Pos / 4)} dư ${q7Pos % 4}, ứng với ${q7Ans}.`],
      visualModel: {
        type: 'remainder_groups',
        title: `Chu kỳ 4 màu (${q7Pos} : 4)`,
        dividend: q7Pos,
        divisor: 4,
        quotient: Math.floor(q7Pos / 4),
        remainder: q7Pos % 4,
        itemIcon: '💡',
        groupLabel: 'Chu kỳ',
      },
    },
    {
      id: `m${m}-d${day}-q8`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Làm toán ngược bằng sơ đồ mũi tên: Một số ban đầu cộng thêm ${b} rồi trừ đi 5 thì được ${q8BackStart + b - 5}. Tìm số ban đầu.`,
      options: makeOptions(q8Ans, [`${q8BackStart + 5}`, `${q8BackStart - 5}`, `${q8BackStart + b}`]),
      correctAnswer: q8Ans,
      hint: `Làm ngược từ cuối về đầu: lấy ${q8BackStart + b - 5} cộng lại 5 rồi trừ đi ${b}.`,
      stepByStepExplanation: [`(${q8BackStart + b - 5} + 5) - ${b} = ${q8BackStart}.`],
      visualModel: {
        type: 'interval_model',
        title: 'Sơ đồ mũi tên làm toán ngược',
        intervalSubtype: 'both_ends',
        totalLength: q8BackStart + b,
        stepLength: 5,
        intervalsCount: 3,
        objectsCount: 4,
        objectIcon: '➡️',
        unitLabel: 'bước',
      },
    },
    {
      id: `m${m}-d${day}-q9`,
      stage: 'practice',
      skillDomain: 'bar_model',
      prompt: `Giải bài toán 2 bước: Trạm 1 ghi được ${prodAB} điểm. Trạm 2 ghi được nhiều hơn Trạm 1 là ${b} điểm. Hỏi Trạm 2 ghi được bao nhiêu điểm?`,
      options: makeOptions(q9Ans, [`${prodAB - b} điểm`, `${prodAB + b + 10} điểm`, `${prodAB} điểm`]),
      correctAnswer: q9Ans,
      hint: `Lấy số điểm Trạm 1 cộng thêm phần hơn là ${b}.`,
      stepByStepExplanation: [`Số điểm Trạm 2 ghi được là: ${prodAB} + ${b} = ${prodAB + b} điểm.`],
      visualModel: {
        type: 'measurement_lab',
        measurementSubtype: 'length_chart',
        title: 'So sánh điểm trên biểu đồ cột',
        chartItems: [
          { label: 'Trạm 1', value: prodAB, unit: 'điểm', color: '#0284C7' },
          { label: 'Trạm 2', value: prodAB + b, unit: 'điểm', color: '#10B981' },
        ],
      },
    },
    {
      id: `m${m}-d${day}-q10`,
      stage: 'challenge',
      skillDomain: 'bar_model',
      prompt: `Thử thách Phương pháp Thế: Biết 1 Ngôi sao = ${subOne} đơn vị, và 1 Mặt trăng bằng 2 Ngôi sao cộng thêm 3 đơn vị. Hỏi 1 Mặt trăng bằng bao nhiêu đơn vị?`,
      options: makeOptions(q10Ans, [`${subTwo + 2} đơn vị`, `${subTwo - 3} đơn vị`, `${subOne * 2} đơn vị`]),
      correctAnswer: q10Ans,
      hint: `Thay 1 Ngôi sao = ${subOne} vào biểu thức của Mặt trăng: 2 × ${subOne} + 3.`,
      stepByStepExplanation: [`1 Mặt trăng = 2 × ${subOne} + 3 = ${subTwo} đơn vị.`],
      visualModel: {
        type: 'bar_model',
        title: 'Phương pháp thay thế nhóm',
        bars: [
          { label: 'Ngôi sao', valueLabel: `${subOne}`, units: 1, color: '#F59E0B' },
          { label: 'Mặt trăng', valueLabel: `2 sao + 3`, units: 2, color: '#7C3AED' },
        ],
      },
    },
    {
      id: `m${m}-d${day}-q11`,
      stage: 'challenge',
      skillDomain: 'interval',
      prompt: `Thử thách Dãy số quy luật: Cho dãy số ${seqFirst}; ${seqFirst + stepSeq}; ${seqFirst + stepSeq * 2}; ${seqFirst + stepSeq * 3}; ${seqFirst + stepSeq * 4}; ... Hỏi số hạng thứ 6 của dãy là bao nhiêu?`,
      options: makeOptions(q11Ans, [`${seqFirst + stepSeq * 4}`, `${seqFirst + stepSeq * 6}`, `${seqFirst + stepSeq * 5 + 2}`]),
      correctAnswer: q11Ans,
      hint: `Tìm hiệu giữa hai số liên tiếp (${stepSeq}), rồi cộng tiếp vào số hạng thứ 5.`,
      stepByStepExplanation: [`Quy luật cộng thêm ${stepSeq}. Số hạng thứ 6 là: ${seqFirst + stepSeq * 4} + ${stepSeq} = ${q11Ans}.`],
      visualModel: {
        type: 'interval_model',
        title: `Khoảng cách giữa các số hạng = +${stepSeq}`,
        intervalSubtype: 'both_ends',
        totalLength: stepSeq * 5,
        stepLength: stepSeq,
        intervalsCount: 5,
        objectsCount: 6,
        objectIcon: '🔢',
        unitLabel: 'đv',
      },
    },
  ];
}

function buildMonthProgram(bp: MonthBlueprint): InMonthMonthProgram {
  const daysRange: [number, number][] = [
    [1, 7],
    [8, 14],
    [15, 21],
    [22, 28],
    [29, 30],
  ];
  const weekColors = ['#0284C7', '#0D9488', '#7C3AED', '#EA580C', '#E11D48'];

  const weeksMeta: InMonthWeekMeta[] = bp.weekNames.map((name, idx) => ({
    weekNumber: (idx + 1) as 1 | 2 | 3 | 4 | 5,
    title: name,
    shortLabel: name,
    daysRange: daysRange[idx],
    skillDomain: bp.domainOrder[idx % 4],
    color: weekColors[idx],
    description: bp.dayFocusList[idx],
  }));

  const days: InMonthDayPlan[] = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const weekNumber = (day <= 7 ? 1 : day <= 14 ? 2 : day <= 21 ? 3 : day <= 28 ? 4 : 5) as 1 | 2 | 3 | 4 | 5;
    const focusIdx = weekNumber - 1;
    const dayTitle = `${bp.dayFocusList[focusIdx]} (Chặng ${((day - 1) % 7) + 1})`;

    return {
      id: `m${bp.monthNumber}-day-${day}`,
      dayNumber: day,
      weekNumber,
      weekTitle: weeksMeta[focusIdx].title,
      title: dayTitle,
      subtitle: bp.title,
      topicTag: bp.weekNames[focusIdx].replace(/^Tuần \d+ · /, ''),
      skillDomain: bp.domainOrder[focusIdx % 4],
      estimatedMinutes: 30,
      planetIcon: '🪐',
      accentColor: weekColors[focusIdx],
      learningGoals: bp.topics,
      questions: buildMonthlyQuestionsForDay(bp, day),
    };
  });

  // Build 20-question Final Exam for this month (10 Part A + 10 Part B)
  const sampleQsDay7 = days[6].questions;
  const sampleQsDay20 = days[19].questions;
  const examPool = [...sampleQsDay7.slice(0, 10), ...sampleQsDay20.slice(0, 10)];

  const examQuestions: InMonthExamQuestion[] = examPool.map((q, idx) => ({
    id: `m${bp.monthNumber}-exam-${idx + 1}`,
    part: idx < 10 ? 'A' : 'B',
    points: 5,
    skillDomain: q.skillDomain,
    relatedDayNumbers: [idx < 10 ? (idx % 14) + 1 : 15 + (idx % 15)],
    prompt: idx >= 10 ? `[Tư duy Olympic ${bp.label}] ${q.prompt}` : q.prompt,
    options: q.options,
    correctAnswer: q.correctAnswer,
    explanation: q.stepByStepExplanation.join(' '),
    visualModel: q.visualModel,
  }));

  return {
    id: `inmonth-g3-m${bp.monthNumber}`,
    grade: 3,
    monthNumber: bp.monthNumber,
    semester: bp.semester,
    label: bp.label,
    shortLabel: bp.shortLabel,
    title: bp.title,
    heroTitle: bp.heroTitle,
    topics: bp.topics,
    accentGradient: bp.accentGradient,
    days,
    weeksMeta,
    finalExam: {
      id: `inmonth-g3-m${bp.monthNumber}-exam`,
      monthLabel: bp.label,
      title: `Kiểm Tra Đánh Giá Năng Lực ${bp.label} — Lớp 3`,
      subtitle: `Phần A: Cơ Bản (50đ) & Phần B: Tư Duy Olympic (50đ)`,
      durationMinutes: 35,
      passingScore: 70,
      excellenceScore: 90,
      questions: examQuestions,
    },
  };
}

// Month 11 uses the full hand-crafted NOVEMBER_IN_MONTH_DAYS & NOVEMBER_FINAL_EXAM
const NOVEMBER_WEEKS_META: InMonthWeekMeta[] = [
  {
    weekNumber: 1,
    title: 'Tuần 1 · Sơ Đồ Thanh',
    shortLabel: 'Tuần 1 · Sơ Đồ Thanh',
    daysRange: [1, 7],
    skillDomain: 'bar_model',
    color: '#0284C7',
    description: 'Toán đố nhân chia & Sơ đồ thanh Singapore',
  },
  {
    weekNumber: 2,
    title: 'Tuần 2 · Chia Có Dư',
    shortLabel: 'Tuần 2 · Chia Có Dư',
    daysRange: [8, 14],
    skillDomain: 'remainder',
    color: '#0D9488',
    description: 'Phép chia có dư & quy luật chu kỳ',
  },
  {
    weekNumber: 3,
    title: 'Tuần 3 · Khoảng Cách',
    shortLabel: 'Tuần 3 · Khoảng Cách',
    daysRange: [15, 21],
    skillDomain: 'interval',
    color: '#7C3AED',
    description: 'Trồng cây, cưa gỗ, cầu thang & tiếng chuông',
  },
  {
    weekNumber: 4,
    title: 'Tuần 4 · Đo Lường',
    shortLabel: 'Tuần 4 · Đo Lường',
    daysRange: [22, 28],
    skillDomain: 'measurement',
    color: '#EA580C',
    description: 'Độ dài km-m-cm, cân kg-g, thể tích L-mL & biểu đồ',
  },
  {
    weekNumber: 5,
    title: 'Tuần 5 · Tổng Ôn',
    shortLabel: 'Tuần 5 · Tổng Ôn',
    daysRange: [29, 30],
    skillDomain: 'bar_model',
    color: '#E11D48',
    description: 'Tổng ôn chiến lược 4 chuyên đề Tháng 11',
  },
];

const NOVEMBER_PROGRAM: InMonthMonthProgram = {
  id: 'inmonth-g3-m11',
  grade: 3,
  monthNumber: 11,
  semester: 1,
  label: 'Tháng 11',
  shortLabel: 'T11',
  title: 'Toán Đố Sơ Đồ Thanh, Chia Có Dư, Khoảng Cách & Đo Lường',
  heroTitle: 'Hành Trình Vũ Trụ 30 Ngày Chinh Phục Toán Tư Duy Singapore',
  topics: [
    'Toán đố kết hợp nhân chia & sơ đồ thanh CPA',
    'Phép chia có dư, tìm thương–số dư & chu kỳ',
    'Toán khoảng cách, đo lường km–m–cm, kg–g & L–mL',
  ],
  accentGradient: 'from-amber-400 via-orange-500 to-pink-500',
  days: NOVEMBER_IN_MONTH_DAYS,
  finalExam: NOVEMBER_FINAL_EXAM,
  weeksMeta: NOVEMBER_WEEKS_META,
};

// Academic order of Grade 3 Spark Math F3: Tháng 6..12 (Year 1) then Tháng 1..5 (Year 2)
export const GRADE_3_IN_MONTH_PROGRAMS: InMonthMonthProgram[] = [
  ...MONTH_BLUEPRINTS.slice(0, 5).map(buildMonthProgram),
  NOVEMBER_PROGRAM,
  ...MONTH_BLUEPRINTS.slice(5).map(buildMonthProgram),
];

export function getMonthStorageKeys(monthNumber: number) {
  if (monthNumber === 11) {
    // Preserve existing Tháng 11 user progress keys
    return {
      completedDaysKey: 'spark_math_inmonth_nov_completed_days',
      examResultKey: 'spark_math_inmonth_nov_exam_result',
      examDraftKey: 'spark_math_inmonth_nov_exam_draft',
      dayProgressKey: (day: number) => `spark_math_inmonth_nov_day_progress_${day}`,
    };
  }
  return {
    completedDaysKey: `spark_math_inmonth_g3_m${monthNumber}_completed_days`,
    examResultKey: `spark_math_inmonth_g3_m${monthNumber}_exam_result`,
    examDraftKey: `spark_math_inmonth_g3_m${monthNumber}_exam_draft`,
    dayProgressKey: (day: number) => `spark_math_inmonth_g3_m${monthNumber}_day_progress_${day}`,
  };
}
