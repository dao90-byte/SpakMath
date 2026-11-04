// Periodic Assessments Data & Thinking Model Checkpoints
// Digitized & structured for Spark Math Grade 3 Curriculum

export interface PeriodicAssessmentStage {
  id: string;
  stageNumber: number;
  title: string;
  focusQuestion: string;
  instructionText: string;
  metacognitiveGuidance: string; // Anti-spoiler thinking prompt
  conceptType: 'visual_model' | 'definition' | 'operation_reasoning' | 'practical_case' | 'mindmap_summary';
}

export interface AssessmentStageQuestion {
  questionId: string;
  prompt: string;
  type: 'text' | 'choice' | 'number';
  placeholder?: string;
  options?: { id: string; text: string; isCorrect: boolean }[];
  correctKeywords?: string[]; // Lowercase normalized keywords
  correctNumeric?: number | string;
  unit?: string;
  hint: string;
  explanation: string;
}

export interface PeriodicAssessment {
  id: string;
  code: string; // e.g. "ĐK-01"
  title: string;
  subtitle: string;
  thinkingModelName: string; // Tên mô hình tư duy
  stationId: string;
  stationName: string;
  icon: string;
  badgeColor: string;
  prerequisiteLessonIds: string[]; // Cụm bài tập cần hoàn thành trước khi mở khóa
  totalStages: number;
  description: string;
  keyRuleSummary: string[];
  isComprehensive?: boolean; // Bài kiểm tra quy mô lớn
  // Structured stage definitions for interactive runner
  stagesConfig?: {
    stage1Title: string;
    stage1Desc: string;
    stage1Questions: AssessmentStageQuestion[];
    stage2Title: string;
    stage2Desc: string;
    stage2Questions: AssessmentStageQuestion[];
    stage3Title: string;
    stage3Desc: string;
    stage3Questions: AssessmentStageQuestion[];
    stage4Title: string;
    stage4Desc: string;
    stage4Questions: AssessmentStageQuestion[];
  };
}

export const PERIODIC_ASSESSMENTS: PeriodicAssessment[] = [
  {
    id: 'periodic-comparison-bar-model',
    code: 'ĐK-01',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình So Sánh Hơn - Kém',
    subtitle: 'Khảo sát bản chất đoạn thẳng, khoảng chênh lệch dôi ra và cơ chế phép trừ',
    thinkingModelName: 'Mô hình So Sánh Đoạn Thẳng (Comparison Bar Model)',
    stationId: 'pictograph',
    stationName: 'Trạm 1: Biểu Đồ & Sơ Đồ So Sánh',
    icon: '📊',
    badgeColor: 'from-amber-500 to-orange-500',
    prerequisiteLessonIds: ['pic-1', 'pic-2', 'pic-3-1', 'pic-3-2', 'pic-4-1', 'pic-4-2'],
    totalStages: 5,
    description: 'Kiểm tra xem học sinh có thực sự hiểu: Ít hơn là gì? Nhiều hơn là gì? Tại sao phải dùng phép trừ để tìm phần hơn kém? Và bài toán san sẻ đều.',
    keyRuleSummary: [
      'Đoạn dài biểu diễn Số Lớn; đoạn ngắn biểu diễn Số Bé.',
      'Nhiều hơn là phần dôi ra vượt mức số bé; Ít hơn là khoảng còn thiếu để bằng số lớn.',
      'Phép trừ cắt bỏ phần bằng nhau của hai đại lượng, chỉ để lại duy nhất phần chênh lệch.',
      'Muốn san sẻ để bằng nhau: Rót sang một nửa phần chênh lệch (Chênh lệch : 2).'
    ],
    stagesConfig: {
      stage1Title: 'Bản Chất Trực Quan Của Sơ Đồ Đoạn Thẳng',
      stage1Desc: 'Để giải quyết chính xác các bài toán so sánh, trước hết em hãy quan sát kỹ độ dài của các thanh và nhận diện bản chất đại lượng mà mỗi thanh đại diện.',
      stage1Questions: [
        {
          questionId: 'q1_1',
          prompt: 'Trong mô hình so sánh, đoạn thẳng Dài Hơn đại diện cho đại lượng nào?',
          type: 'text',
          placeholder: 'Nhập câu trả lời (ví dụ: Số Lớn, đại lượng nhiều hơn)...',
          correctKeywords: ['lon', 'nhieu', 'dai', 'cao'],
          hint: 'Khi hai đoạn đặt cạnh nhau cùng vạch xuất phát, đoạn dài hơn chứa giá trị lớn hơn hay bé hơn?',
          explanation: 'Chính xác! Đoạn dài hơn luôn trực quan hóa cho Số Lớn.'
        },
        {
          questionId: 'q1_2',
          prompt: 'Đoạn thẳng Ngắn Hơn đại diện cho đại lượng nào?',
          type: 'text',
          placeholder: 'Nhập câu trả lời (ví dụ: Số Bé, đại lượng ít hơn)...',
          correctKeywords: ['be', 'nho', 'it', 'ngan', 'thap'],
          hint: 'Đoạn ngắn hơn tương ứng với số lượng như thế nào?',
          explanation: 'Chính xác! Đoạn ngắn hơn luôn trực quan hóa cho Số Bé.'
        }
      ],
      stage2Title: 'Khái Niệm Bản Chất - "Ít hơn là gì?" và "Nhiều hơn là gì?"',
      stage2Desc: 'Em hãy tự diễn đạt cách hiểu của mình về hiện tượng một đại lượng dôi ra hoặc còn thiếu so với đại lượng còn lại.',
      stage2Questions: [
        {
          questionId: 'q2_1',
          prompt: 'Theo suy ngẫm của em, "Nhiều hơn" thể hiện điều gì giữa hai đại lượng?',
          type: 'text',
          placeholder: 'Nhập diễn giải (ví dụ: phần vượt trội, phần dôi ra)...',
          correctKeywords: ['doi', 'vuot', 'them', 'thua', 'hon', 'chenh', 'du'],
          hint: 'Phần màu cam vượt ra ngoài vạch dóng thể hiện điều gì?',
          explanation: 'Nhiều hơn chính là phần dôi ra vượt qua mức của số bé.'
        },
        {
          questionId: 'q2_2',
          prompt: 'Theo suy ngẫm của em, "Ít hơn" thể hiện điều gì về đại lượng bé?',
          type: 'text',
          placeholder: 'Nhập diễn giải (ví dụ: khoảng còn thiếu, phần hụt)...',
          correctKeywords: ['thieu', 'hut', 'can', 'chua du', 'kem'],
          hint: 'Khoảng nét đứt cần bù thêm để số bé dài bằng số lớn gọi là gì?',
          explanation: 'Ít hơn chính là khoảng còn thiếu để số bé bằng được số lớn.'
        },
        {
          questionId: 'q2_3',
          prompt: 'Quy luật đối xứng: Nếu Bình A có nhiều hơn Bình B là 6 lít, thì Bình B ít hơn Bình A mấy lít?',
          type: 'number',
          placeholder: 'Nhập số lít...',
          correctNumeric: '6',
          unit: 'lít',
          hint: 'Khoảng cách giữa hai bình khi nhìn từ A sang B hay từ B sang A có thay đổi không?',
          explanation: 'Đúng vậy! Khoảng chênh lệch mang tính đối xứng tuyệt đối: 6 lít.'
        }
      ],
      stage3Title: 'Cơ Chế Phép Toán - Vì Sao Lại Dùng Phép Trừ?',
      stage3Desc: 'Khám phá bí mật toán học: Tại sao muốn tìm phần hơn kém ta bắt buộc phải dùng phép trừ chứ không phải phép cộng hay nhân?',
      stage3Questions: [
        {
          questionId: 'q3_formula',
          prompt: 'Công thức toán học tổng quát để tìm phần chênh lệch (hơn kém) là:',
          type: 'choice',
          options: [
            { id: 'f1', text: 'Số Lớn － Số Bé ＝ Phần Chênh Lệch', isCorrect: true },
            { id: 'f2', text: 'Số Lớn ＋ Số Bé ＝ Phần Chênh Lệch', isCorrect: false },
            { id: 'f3', text: 'Số Bé － Số Lớn ＝ Phần Chênh Lệch', isCorrect: false }
          ],
          hint: 'Lấy toàn bộ đoạn dài trừ đi đoạn bằng số bé sẽ còn lại phần nào?',
          explanation: 'Chính xác! Lấy Số Lớn trừ Số Bé sẽ ra khoảng chênh lệch.'
        },
        {
          questionId: 'q3_why',
          prompt: 'Bản chất sâu xa: Vì sao lại dùng phép trừ?',
          type: 'choice',
          options: [
            { id: 'cut_equal_part', text: 'Phép trừ giúp "cắt bỏ" phần bằng nhau giữa hai đoạn, chỉ giữ lại duy nhất phần dôi ra chênh lệch!', isCorrect: true },
            { id: 'random', text: 'Vì cô giáo bảo làm phép trừ thì mới ra số nhỏ hơn.', isCorrect: false },
            { id: 'add_diff', text: 'Vì phép trừ làm tăng tổng số lượng của cả hai đại lượng.', isCorrect: false }
          ],
          hint: 'Đường dóng thẳng đứng màu đỏ trong hình vẽ đã làm điều gì với phần bằng nhau?',
          explanation: 'Tuyệt vời! Phép trừ triệt tiêu phần trùng khớp, cô lập chính xác phần chênh lệch.'
        }
      ],
      stage4Title: 'Thực Chiến & Bài Toán San Sẻ Cân Bằng (18L & 12L)',
      stage4Desc: 'Vận dụng mô hình vào bài toán thực tế: Bình A có 18 lít nước, Bình B có 12 lít nước. Cần rót bao nhiêu lít từ Bình A sang Bình B để hai bình có lượng nước bằng nhau?',
      stage4Questions: [
        {
          questionId: 'q4_diff',
          prompt: 'Bước 1: Tính khoảng chênh lệch ban đầu giữa Bình A và Bình B (18 - 12):',
          type: 'number',
          placeholder: 'Nhập kết quả...',
          correctNumeric: '6',
          unit: 'lít',
          hint: 'Lấy 18L trừ 12L.',
          explanation: 'Bình A ban đầu nhiều hơn Bình B đúng 6 lít.'
        },
        {
          questionId: 'q4_transfer',
          prompt: 'Bước 2: Cần rót bao nhiêu lít từ Bình A sang Bình B để hai bình bằng nhau?',
          type: 'number',
          placeholder: 'Nhập số lít cần rót...',
          correctNumeric: '3',
          unit: 'lít',
          hint: 'Nếu rót cả 6L thì Bình B lại thành 18L và Bình A còn 12L (bị đảo ngược!). Phải chia phần chênh lệch ra làm mấy phần?',
          explanation: 'Chính xác! Rót 3 lít (6 : 2 = 3L). Khi đó cả 2 bình đều có đúng 15 lít!'
        },
        {
          questionId: 'q4_why_halve',
          prompt: 'Bước 3: Vì sao lại lấy khoảng chênh lệch chia cho 2 (Chênh lệch : 2)?',
          type: 'choice',
          options: [
            { id: 'split_excess', text: 'Vì khi rót đi, Bình A giảm xuống đồng thời Bình B tăng lên một lượng tương đương, nên chỉ cần chia đôi phần dôi ra!', isCorrect: true },
            { id: 'random_guess', text: 'Vì số 6 chia cho số nào cũng được nên chọn số 2.', isCorrect: false },
            { id: 'half_tank', text: 'Vì mỗi bình chỉ được chứa một nửa dung tích.', isCorrect: false }
          ],
          hint: 'Khi Bình A cho đi 1 lít thì khoảng cách giữa 2 bình co lại mấy lít?',
          explanation: 'Xuất sắc! Hiện tượng "cho 1 được 1" làm khoảng cách thu hẹp gấp đôi, nên chỉ cần chuyển một nửa phần dôi ra.'
        }
      ]
    }
  },
  {
    id: 'periodic-pictograph-ratio',
    code: 'ĐK-02',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Đọc Tỷ Lệ Nhân Biểu Đồ',
    subtitle: 'Khảo sát bản chất quy ước biểu tượng, nhân tỷ lệ và đọc dữ liệu phân tích',
    thinkingModelName: 'Mô hình Quy Ước Biểu Tượng & Bội Số (Pictograph Scaling)',
    stationId: 'pictograph',
    stationName: 'Trạm 1: Biểu Đồ Hình Ảnh',
    icon: '📈',
    badgeColor: 'from-emerald-500 to-teal-600',
    prerequisiteLessonIds: ['pic-5-1', 'pic-5-2', 'pic-6-1', 'pic-6-2', 'pic-7-1', 'pic-7-2', 'pic-8-1', 'pic-8-2'],
    totalStages: 5,
    description: 'Đánh giá năng lực giải mã biểu tượng: Một hình ảnh đại diện cho nhiều đơn vị thực tế, tư duy nhân bội số và so sánh giữa các nhóm.',
    keyRuleSummary: [
      'Một biểu tượng quy ước mang giá trị của một nhóm đơn vị cố định.',
      'Tổng số lượng thực tế = Số lượng biểu tượng × Giá trị quy ước của 1 biểu tượng.',
      'Khi so sánh giữa hai cột: Có thể so sánh số biểu tượng chênh lệch trước khi nhân.',
      'Tỉ lệ nhân giúp biểu diễn số liệu lớn một cách trực quan, khoa học trên trang giấy nhỏ.'
    ],
    stagesConfig: {
      stage1Title: 'Bản Chất Quy Ước Biểu Tượng',
      stage1Desc: 'Trong biểu đồ tranh, mỗi biểu tượng thường đại diện cho một nhóm nhiều đối tượng thực tế.',
      stage1Questions: [
        {
          questionId: 'q1_scale',
          prompt: 'Nếu quy ước 1 Ngôi sao ⭐ đại diện cho 4 quyển sách, thì 5 Ngôi sao ⭐⭐⭐⭐⭐ đại diện cho bao nhiêu quyển sách?',
          type: 'number',
          placeholder: 'Nhập số sách...',
          correctNumeric: '20',
          unit: 'quyển sách',
          hint: 'Lấy số ngôi sao nhân với giá trị của mỗi ngôi sao: 5 × 4 = ?',
          explanation: 'Chính xác! 5 × 4 = 20 quyển sách.'
        },
        {
          questionId: 'q1_why_scale',
          prompt: 'Tại sao người ta không vẽ 20 quyển sách thật mà lại dùng 5 ngôi sao?',
          type: 'choice',
          options: [
            { id: 'opt_compact', text: 'Để biểu đồ gọn gàng, trực quan và dễ quan sát khi số liệu lớn!', isCorrect: true },
            { id: 'opt_lazy', text: 'Vì người vẽ biểu đồ lười không muốn vẽ nhiều.', isCorrect: false },
            { id: 'opt_hide', text: 'Để giấu số liệu thật không cho người khác biết.', isCorrect: false }
          ],
          hint: 'Vẽ 1000 quyển sách trên một trang giấy có khả thi và dễ nhìn không?',
          explanation: 'Đúng vậy! Quy ước tỉ lệ giúp biểu đồ súc tích và dễ đọc.'
        }
      ],
      stage2Title: 'Cơ Chế Phép Toán Trong Biểu Đồ Quy Ước',
      stage2Desc: 'Phân tích bản chất các phép tính nhân và chia khi giải mã dữ liệu biểu đồ.',
      stage2Questions: [
        {
          questionId: 'q2_mult_why',
          prompt: 'Muốn tìm số lượng thực tế từ số biểu tượng, ta dùng phép tính nào?',
          type: 'choice',
          options: [
            { id: 'mult', text: 'Phép Nhân: Số biểu tượng × Giá trị 1 biểu tượng', isCorrect: true },
            { id: 'add', text: 'Phép Cộng: Số biểu tượng ＋ Giá trị 1 biểu tượng', isCorrect: false },
            { id: 'div', text: 'Phép Trừ: Số biểu tượng － Giá trị 1 biểu tượng', isCorrect: false }
          ],
          hint: 'Mỗi biểu tượng là một nhóm bằng nhau, nhiều nhóm bằng nhau ta dùng phép gì?',
          explanation: 'Xuất sắc! Bản chất của phép nhân là cộng các nhóm có số lượng bằng nhau.'
        },
        {
          questionId: 'q2_reverse',
          prompt: 'Ngược lại: Biết thực tế có 28 bạn học sinh, mỗi biểu tượng 👤 đại diện cho 4 bạn. Cần vẽ mấy biểu tượng 👤?',
          type: 'number',
          placeholder: 'Nhập số biểu tượng...',
          correctNumeric: '7',
          unit: 'biểu tượng',
          hint: 'Lấy tổng số học sinh chia cho giá trị 1 biểu tượng: 28 : 4 = ?',
          explanation: 'Chính xác! 28 : 4 = 7 biểu tượng.'
        }
      ],
      stage3Title: 'Tư Duy So Sánh Nhanh - Phương Pháp Trừ Biểu Tượng',
      stage3Desc: 'Phương pháp tư duy thông minh: So sánh độ chênh lệch biểu tượng trước khi tính toán giá trị thực tế.',
      stage3Questions: [
        {
          questionId: 'q3_smart_diff',
          prompt: 'Tổ 1 có 6 biểu tượng (mỗi biểu tượng = 5 điểm). Tổ 2 có 4 biểu tượng. Tổ 1 hơn Tổ 2 bao nhiêu biểu tượng?',
          type: 'number',
          placeholder: 'Nhập số biểu tượng hơn...',
          correctNumeric: '2',
          unit: 'biểu tượng',
          hint: '6 - 4 = ?',
          explanation: 'Tổ 1 hơn Tổ 2 là 2 biểu tượng.'
        },
        {
          questionId: 'q3_smart_points',
          prompt: 'Vậy Tổ 1 nhiều hơn Tổ 2 bao nhiêu điểm thực tế?',
          type: 'number',
          placeholder: 'Nhập số điểm...',
          correctNumeric: '10',
          unit: 'điểm',
          hint: 'Lấy số biểu tượng chênh lệch (2) nhân với giá trị mỗi biểu tượng (5): 2 × 5 = ?',
          explanation: 'Tuyệt đỉnh! Thay vì tính 6×5=30 rồi 4×5=20 rồi 30-20=10, ta lấy luôn (6 - 4) × 5 = 10 điểm!'
        }
      ],
      stage4Title: 'Thực Chiến Đọc Báo Cáo Thống Kê',
      stage4Desc: 'Vận dụng tổng hợp kỹ năng giải mã biểu đồ vào tình huống thực tế.',
      stage4Questions: [
        {
          questionId: 'q4_total_calc',
          prompt: 'Khảo sát hoa quả: Táo có 4 🍎, Cam có 3 🍊, Chuối có 5 🍌. Biết mỗi biểu tượng = 6 quả. Cả 3 loại có tổng cộng bao nhiêu quả?',
          type: 'number',
          placeholder: 'Nhập tổng số quả...',
          correctNumeric: '72',
          unit: 'quả',
          hint: 'Tổng số biểu tượng = 4 + 3 + 5 = 12. Mỗi biểu tượng là 6 quả: 12 × 6 = ?',
          explanation: 'Tuyệt vời! Tổng cộng có 12 biểu tượng × 6 quả = 72 quả hoa quả!'
        }
      ]
    }
  },
  {
    id: 'periodic-volume-fluid-sharing',
    code: 'ĐK-03',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Thể Tích & Dòng Chảy San Sẻ',
    subtitle: 'Khảo sát dung tích bình, mức nước dâng, vật chìm và bảo toàn thể tích',
    thinkingModelName: 'Mô hình Thể Tích Khối Nước & San Sẻ Cân Bằng (Fluid Volume & Equilibrium)',
    stationId: 'volume',
    stationName: 'Trạm 2: Thể Tích & Đơn Vị Lít',
    icon: '💧',
    badgeColor: 'from-sky-500 to-blue-600',
    prerequisiteLessonIds: ['vol-fill', 'vol-compare-2-1', 'vol-preserve-2-2', 'vol-scale-3-1', 'vol-compare-3-2', 'vol-compare-4-1', 'vol-depth-4-2', 'vol-cups-5-1', 'vol-compare-5-2'],
    totalStages: 5,
    description: 'Kiểm tra tư duy về dung tích thực tế: San sẻ giữa các bình để đạt cân bằng, tính lượng nước dâng khi thả vật chìm, và công thức bảo toàn thể tích.',
    keyRuleSummary: [
      'Thể tích nước không đổi khi rót qua lại giữa các bình (Định luật bảo toàn thể tích).',
      'Khoảng trống còn lại trong bình = Dung tích tối đa － Lượng nước hiện có.',
      'Khi thả vật chìm: Thể tích nước dâng lên đúng bằng thể tích của vật chìm chiếm chỗ.',
      'Cân bằng hai bình: Lượng cần rót = (Lượng bình nhiều － Lượng bình ít) : 2.'
    ],
    stagesConfig: {
      stage1Title: 'Bản Chất Bảo Toàn Thể Tích',
      stage1Desc: 'Nước là chất lỏng có thể thay đổi hình dạng theo đồ chứa nhưng thể tích thực tế không bao giờ thay đổi.',
      stage1Questions: [
        {
          questionId: 'q1_preserve',
          prompt: 'Rót toàn bộ 5 lít nước từ một bình cao thon sang một chậu to đáy bẹt. Thể tích nước trong chậu là bao nhiêu?',
          type: 'choice',
          options: [
            { id: 'same', text: 'Vẫn đúng bằng 5 lít (Thể tích được bảo toàn)', isCorrect: true },
            { id: 'more', text: 'Nhiều hơn 5 lít vì chậu to hơn', isCorrect: false },
            { id: 'less', text: 'Ít hơn 5 lít vì mực nước thấp xuống', isCorrect: false }
          ],
          hint: 'Nước có bị mất đi giọt nào hay tự sinh thêm giọt nào không?',
          explanation: 'Chính xác! Thể tích chất lỏng được bảo toàn tuyệt đối dù hình dạng chứa có thay đổi thế nào.'
        }
      ],
      stage2Title: 'Thực Nghiệm Archimedes - Vật Thể Chiếm Chỗ',
      stage2Desc: 'Khi thả vật thể vào bình nước, hiện tượng nước dâng lên nói cho ta biết điều gì?',
      stage2Questions: [
        {
          questionId: 'q2_archimedes',
          prompt: 'Một ca nước đang ở vạch 7 lít. Sau khi thả chìm một hòn đá, mực nước dâng lên vạch 10 lít. Thể tích hòn đá là bao nhiêu?',
          type: 'number',
          placeholder: 'Nhập số lít...',
          correctNumeric: '3',
          unit: 'lít',
          hint: 'Lượng nước dâng thêm = Mực nước mới － Mực nước ban đầu: 10 - 7 = ?',
          explanation: 'Rất chuẩn! Thể tích vật chìm đúng bằng thể tích nước bị chiếm chỗ dâng lên: 3 lít.'
        }
      ],
      stage3Title: 'Dung Tích Bình & Khoảng Trống Chứa Nước',
      stage3Desc: 'Phân biệt giữa Dung tích tối đa của bình và Lượng nước hiện có bên trong.',
      stage3Questions: [
        {
          questionId: 'q3_capacity',
          prompt: 'Bình nước có dung tích 20 lít, hiện đang có 14 lít nước. Cần đổ thêm bao nhiêu lít nước để bình đầy tràn mép?',
          type: 'number',
          placeholder: 'Nhập số lít cần thêm...',
          correctNumeric: '6',
          unit: 'lít',
          hint: 'Khoảng trống còn lại = Dung tích tối đa － Lượng nước hiện có: 20 - 14 = ?',
          explanation: 'Đúng rồi! Cần thêm đúng 6 lít nước.'
        }
      ],
      stage4Title: 'Thực Chiến San Sẻ Cân Bằng Dung Tích',
      stage4Desc: 'Vận dụng định luật bảo toàn thể tích vào bài toán đưa hai bình về trạng thái cân bằng hoàn hảo.',
      stage4Questions: [
        {
          questionId: 'q4_sharing',
          prompt: 'Thùng A có 16 lít nước, Thùng B có 10 lít nước. Cần rót bao nhiêu lít từ Thùng A sang Thùng B để hai thùng bằng nhau?',
          type: 'number',
          placeholder: 'Nhập số lít cần rót...',
          correctNumeric: '3',
          unit: 'lít',
          hint: 'Chênh lệch là 16 - 10 = 6L. Cần chia đôi phần chênh lệch: 6 : 2 = ?',
          explanation: 'Tuyệt đỉnh! Rót 3 lít. Khi đó cả hai thùng đều có 13 lít nước!'
        }
      ]
    }
  },
  {
    id: 'periodic-logic-deduction-sudoku',
    code: 'ĐK-04',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Ma Trận Loại Trừ Suy Luận',
    subtitle: 'Khảo sát quy tắc không trùng lặp, khối zic-zac và suy luận khả dĩ duy nhất',
    thinkingModelName: 'Mô hình Ma Trận Loại Trừ Logic (Sudoku & Elimination Matrix)',
    stationId: 'sudoku',
    stationName: 'Trạm 3: Sudoku & Ma Trận Số',
    icon: '🧩',
    badgeColor: 'from-amber-600 to-yellow-600',
    prerequisiteLessonIds: ['sud-warmup-1', 'sud-warmup-2', 'sud-shape-1', 'sud-shape-2', 'sud-num-2-1', 'sud-num-2-2', 'sud-jigsaw-3-1', 'sud-jigsaw-3-2', 'sud-killer-4-1', 'sud-killer-4-2'],
    totalStages: 5,
    description: 'Đánh giá khả năng tư duy loại trừ: Xác định ô có điều kiện ràng buộc ngặt nghèo nhất, tư duy quét hàng/cột/khối để tìm vị trí duy nhất.',
    keyRuleSummary: [
      'Mỗi hàng, mỗi cột và mỗi khối màu chỉ chứa mỗi phần tử đúng 1 lần duy nhất.',
      'Luôn ưu tiên điền ô thuộc hàng hoặc cột chỉ còn thiếu 1 phần tử duy nhất.',
      'Phương pháp loại trừ: Nếu một hàng đã có các số A, B, C thì ô còn lại bắt buộc là D.',
      'Tư duy quét giao điểm: Kết hợp đồng thời ràng buộc hàng, cột và khối để tìm đáp án độc nhất.'
    ],
    stagesConfig: {
      stage1Title: 'Ba Ràng Buộc Bất Biến Của Sudoku',
      stage1Desc: 'Nhận diện quy tắc nền tảng giữ cho toàn bộ ma trận số học luôn logic và không bị mâu thuẫn.',
      stage1Questions: [
        {
          questionId: 'q1_rules',
          prompt: 'Trong bảng Sudoku 4x4, mỗi chữ số từ 1 đến 4 xuất hiện bao nhiêu lần trên mỗi hàng?',
          type: 'choice',
          options: [
            { id: 'once', text: 'Đúng 1 lần duy nhất (Không được trùng lặp)', isCorrect: true },
            { id: 'twice', text: 'Có thể lặp lại 2 lần nếu khác màu', isCorrect: false },
            { id: 'any', text: 'Bao nhiêu lần cũng được tùy ý', isCorrect: false }
          ],
          hint: 'Quy tắc vàng của Sudoku là không có hai số nào giống nhau trên cùng một hàng!',
          explanation: 'Chính xác! Mỗi phần tử xuất hiện đúng 1 lần duy nhất trên mỗi hàng, mỗi cột và mỗi khối.'
        }
      ],
      stage2Title: 'Bản Chất Của Phương Pháp Loại Trừ',
      stage2Desc: 'Tại sao khi biết 3 số trên hàng 4 ô, ta có thể khẳng định chắc chắn 100% số ở ô còn lại mà không cần đoán mò?',
      stage2Questions: [
        {
          questionId: 'q2_elimination',
          prompt: 'Một hàng trong Sudoku 4x4 đã có các số 1, 2 và 4. Ô trống cuối cùng bắt buộc phải là số mấy?',
          type: 'number',
          placeholder: 'Nhập chữ số...',
          correctNumeric: '3',
          hint: 'Tập hợp các số là {1, 2, 3, 4}. Số nào còn thiếu?',
          explanation: 'Chính xác! Số 3 là ứng viên duy nhất còn lại. Đây là phương pháp loại trừ tất yếu.'
        }
      ],
      stage3Title: 'Chiến Thuật Ưu Tiên Khi Bắt Đầu Giải Ma Trận',
      stage3Desc: 'Người thông minh không điền bừa, mà luôn tìm kiếm điểm tựa vững chắc nhất để mở màn.',
      stage3Questions: [
        {
          questionId: 'q3_strategy',
          prompt: 'Khi nhìn vào một bảng Sudoku mới, em nên ưu tiên điền ô nào đầu tiên?',
          type: 'choice',
          options: [
            { id: 'least_unknown', text: 'Hàng, cột hoặc khối chỉ còn thiếu 1 ô trống duy nhất!', isCorrect: true },
            { id: 'empty_row', text: 'Hàng trống trơn chưa có số nào.', isCorrect: false },
            { id: 'corner', text: 'Bốn góc của bảng bất kể có số hay không.', isCorrect: false }
          ],
          hint: 'Ô nào có nhiều manh mối nhất và ít khả năng xảy ra nhất sẽ chắc chắn nhất?',
          explanation: 'Xuất sắc! Hàng/cột chỉ thiếu 1 ô có độ tin cậy 100%, không bao giờ phải suy đoán.'
        }
      ],
      stage4Title: 'Thực Chiến Suy Luận Đa Chiều (Giao Điểm Hàng & Cột)',
      stage4Desc: 'Vận dụng kết hợp đồng thời ràng buộc hàng và cột để giải mã ô trung tâm.',
      stage4Questions: [
        {
          questionId: 'q4_cross_deduce',
          prompt: 'Ô ? nằm trên Hàng đã có số 1 và 2, đồng thời nằm trên Cột đã có số 4. Vậy ô ? chắc chắn là số mấy?',
          type: 'number',
          placeholder: 'Nhập số...',
          correctNumeric: '3',
          hint: 'Ô ? không thể là 1, 2 (do hàng cấm) và không thể là 4 (do cột cấm). Các số là 1, 2, 3, 4.',
          explanation: 'Tuyệt đỉnh giác ngộ! Loại bỏ 1, 2, 4, ô ? chỉ còn khả năng duy nhất là 3!'
        }
      ]
    }
  },
  {
    id: 'periodic-queue-intersection-counter',
    code: 'ĐK-05',
    title: 'Bài Kiểm Tra Định Kỳ: Mô Hình Hàng Ngũ & Điểm Giao Bù Trừ',
    subtitle: 'Khảo sát nguyên lý đếm bù trừ, bài toán vị trí trùng và giao điểm hai hàng',
    thinkingModelName: 'Mô hình Bù Trừ Điểm Trùng Hàng Ngũ (Inclusion-Exclusion Queue Model)',
    stationId: 'logic',
    stationName: 'Trạm 5: Vị Trí Hàng Ngũ & Logic',
    icon: '🚶',
    badgeColor: 'from-rose-500 to-pink-600',
    prerequisiteLessonIds: ['log-queue-1', 'log-queue-2', 'log-queue-between-2b', 'log-l-shape', 'log-t-shape-4', 'log-t-shape-5', 'log-cross-6-1', 'log-circle-6-2'],
    totalStages: 5,
    description: 'Kiểm tra bản chất hiện tượng đếm lặp: Tại sao khi cộng thứ tự từ đầu hàng và cuối hàng ta phải trừ đi 1? Tại sao ở điểm giao chữ L và chữ thập ta phải trừ đi người đứng ở vị trí giao?',
    keyRuleSummary: [
      'Khi một người được đếm cả từ trước ra sau và từ sau ra trước: người đó bị đếm 2 lần!',
      'Tổng số người trong hàng = Thứ tự từ trước ＋ Thứ tự từ sau － 1.',
      'Tại điểm giao của hai hàng (chữ L hoặc chữ thập): Người ở ngã tư thuộc cả hai hàng, nên phải trừ 1 khi tính tổng.',
      'Nguyên lý bù trừ giúp tránh việc đếm trùng người hoặc vật thể tại vị trí giao thoa.'
    ],
    stagesConfig: {
      stage1Title: 'Bản Chất Đếm Lặp Trong Hàng Ngũ',
      stage1Desc: 'Nhận diện nghịch lý quang học khi tính tổng số người trong một hàng dọc.',
      stage1Questions: [
        {
          questionId: 'q1_why_minus_one',
          prompt: 'Benny đứng thứ 5 từ đầu hàng, và đứng thứ 4 từ cuối hàng lên. Nếu lấy 5 + 4 = 9 thì số 9 này đã phạm sai lầm gì?',
          type: 'choice',
          options: [
            { id: 'counted_twice', text: 'Benny đã bị đếm tới 2 lần (1 lần từ trước, 1 lần từ sau)!', isCorrect: true },
            { id: 'forgot_benny', text: 'Benny bị quên không đếm.', isCorrect: false },
            { id: 'wrong_order', text: 'Đếm sai số người phía sau.', isCorrect: false }
          ],
          hint: 'Trong lượt đếm từ trước có Benny không? Trong lượt đếm từ sau có Benny không?',
          explanation: 'Chính xác! Benny xuất hiện trong cả hai lượt đếm, dẫn đến bị tính 2 lần.'
        },
        {
          questionId: 'q1_calc_total',
          prompt: 'Vậy thực sự trong hàng có tất cả bao nhiêu bạn? (5 + 4 - 1 = ?)',
          type: 'number',
          placeholder: 'Nhập số bạn...',
          correctNumeric: '8',
          unit: 'bạn',
          hint: 'Lấy 9 trừ đi 1 lần đếm trùng của Benny: 9 - 1 = ?',
          explanation: 'Chính xác! Cả hàng có đúng 8 bạn.'
        }
      ],
      stage2Title: 'Điểm Giao Hàng Chữ L và Chữ Thập (+)',
      stage2Desc: 'Phân tích nguyên lý bù trừ tại nút giao của hai hàng người đan chéo nhau.',
      stage2Questions: [
        {
          questionId: 'q2_cross_point',
          prompt: 'Hàng dọc có 6 bạn, hàng ngang có 5 bạn. Hai hàng giao nhau tại bạn Nam (Nam đứng ở vị trí góc chữ L). Cả hai hàng có tất cả bao nhiêu bạn?',
          type: 'number',
          placeholder: 'Nhập số bạn...',
          correctNumeric: '10',
          unit: 'bạn',
          hint: 'Tổng số = Hàng dọc (6) + Hàng ngang (5) - Bạn Nam đứng ở góc (1): 6 + 5 - 1 = ?',
          explanation: 'Xuất sắc! Nam thuộc cả hai hàng nên khi cộng 6 + 5 thì Nam bị đếm 2 lần. Cần trừ 1: 10 bạn!'
        }
      ],
      stage3Title: 'Tìm Thứ Tự Ngược Lại Khi Biết Tổng Số',
      stage3Desc: 'Luyện tập tư duy đảo chiều: Từ tổng số người suy ra thứ tự đếm từ hướng đối diện.',
      stage3Questions: [
        {
          questionId: 'q3_reverse_rank',
          prompt: 'Một hàng có 12 bạn. Mai đứng thứ 4 từ đầu hàng. Hỏi Mai đứng thứ mấy tính từ cuối hàng lên?',
          type: 'number',
          placeholder: 'Nhập thứ tự...',
          correctNumeric: '9',
          unit: 'thứ',
          hint: 'Số bạn đứng sau Mai = 12 - 4 = 8 bạn. Vậy Mai đứng thứ mấy từ dưới lên? 8 + 1 = ?',
          explanation: 'Chuẩn xác! 12 - 4 + 1 = thứ 9 từ cuối hàng lên.'
        }
      ],
      stage4Title: 'Thực Chiến Hàng Ngũ Vòng Tròn Khép Kín',
      stage4Desc: 'Vận dụng tư duy bù trừ vào không gian tròn không có điểm đầu điểm cuối cố định.',
      stage4Questions: [
        {
          questionId: 'q4_circle_opposite',
          prompt: 'Có 10 bạn đứng thành vòng tròn cách đều nhau. Đánh số từ 1 đến 10 theo chiều kim đồng hồ. Bạn đứng đối diện trực diện với bạn số 1 là bạn số mấy?',
          type: 'number',
          placeholder: 'Nhập số hiệu...',
          correctNumeric: '6',
          hint: 'Vòng tròn 10 bạn thì nửa vòng tròn là 10 : 2 = 5 bước. Đi 5 bước từ số 1: 1 + 5 = ?',
          explanation: 'Tuyệt đỉnh! Trong vòng tròn 10 bạn, vị trí đối diện cách đúng 5 bạn: 1 + 5 = số 6!'
        }
      ]
    }
  },
  {
    id: 'periodic-grand-comprehensive-arena',
    code: 'ĐK-TỔNG HỢP',
    title: 'BÀI KIỂM TRA ĐỊNH KỲ TỔNG HỢP (QUY MÔ LỚN)',
    subtitle: 'Đấu trường kiểm tra năng lực tư duy liên môn toàn diện Spark Math Lớp 3',
    thinkingModelName: 'Đại Khảo Sát Năng Lực Toán Tư Duy Tổng Thể (Comprehensive Cognitive Arena)',
    stationId: 'challenge',
    stationName: 'Đấu Trường Toàn Năng',
    icon: '🏆',
    badgeColor: 'from-red-600 via-amber-600 to-rose-600',
    prerequisiteLessonIds: ['pic-4-2', 'pic-8-2', 'vol-compare-5-2', 'sud-killer-4-2', 'log-circle-6-2'],
    totalStages: 5,
    description: 'Bài kiểm tra quy mô lớn tích hợp cả 5 mô hình tư duy cốt lõi: So sánh hơn kém, Tỷ lệ nhân biểu đồ, Cân bằng dung tích, Loại trừ ma trận và Bù trừ hàng ngũ.',
    keyRuleSummary: [
      'Làm chủ toàn bộ 5 mô hình tư duy toán học nền tảng lớp 3.',
      'Khả năng tự vấn, giải thích nguyên nhân và lựa chọn phép toán chính xác.',
      'Được cấp Chứng Chỉ Tinh Hoa Toán Tư Duy Spark Math sau khi hoàn thành.',
      'Tự tin giải quyết mọi dạng toán thi đấu và tư duy nâng cao.'
    ],
    stagesConfig: {
      stage1Title: 'Trụ Cột 1: So Sánh Hơn Kém & Đoạn Thẳng',
      stage1Desc: 'Đoạn thẳng A dài 24cm, đoạn thẳng B dài 16cm. Cần chuyển bao nhiêu cm từ A sang B để hai đoạn bằng nhau?',
      stage1Questions: [
        {
          questionId: 'qc_stage1',
          prompt: 'Lượng cần chuyển để cân bằng hai đoạn (24 - 16) : 2 = ?',
          type: 'number',
          placeholder: 'Nhập số cm...',
          correctNumeric: '4',
          unit: 'cm',
          hint: 'Chênh lệch là 24 - 16 = 8cm. Chia đôi phần chênh lệch: 8 : 2 = ?',
          explanation: 'Đúng! Chuyển 4cm, khi đó cả hai đoạn đều dài 20cm.'
        }
      ],
      stage2Title: 'Trụ Cột 2: Tỉ Lệ Nhân Biểu Đồ & Thống Kê',
      stage2Desc: 'Biểu đồ có 7 biểu tượng ngôi sao, mỗi ngôi sao đại diện cho 5 điểm thi đua.',
      stage2Questions: [
        {
          questionId: 'qc_stage2',
          prompt: 'Tổng số điểm thi đua là bao nhiêu? (7 × 5 = ?)',
          type: 'number',
          placeholder: 'Nhập số điểm...',
          correctNumeric: '35',
          unit: 'điểm',
          hint: 'Lấy số ngôi sao nhân với giá trị mỗi ngôi sao: 7 × 5 = ?',
          explanation: 'Chính xác! 7 × 5 = 35 điểm.'
        }
      ],
      stage3Title: 'Trụ Cột 3: Bảo Toàn Thể Tích & Archimedes',
      stage3Desc: 'Bình nước 15 lít, thả chìm một khối kim loại làm nước dâng lên 19 lít.',
      stage3Questions: [
        {
          questionId: 'qc_stage3',
          prompt: 'Thể tích khối kim loại chiếm chỗ là bao nhiêu? (19 - 15 = ?)',
          type: 'number',
          placeholder: 'Nhập số lít...',
          correctNumeric: '4',
          unit: 'lít',
          hint: 'Thể tích vật chìm = Nước sau khi thả - Nước ban đầu: 19 - 15 = ?',
          explanation: 'Chính xác! Khối kim loại chiếm chỗ đúng 4 lít.'
        }
      ],
      stage4Title: 'Trụ Cột 4: Suy Luận Loại Trừ & Hàng Ngũ',
      stage4Desc: 'Hàng dọc có 8 bạn, hàng ngang có 7 bạn, giao nhau tại bạn Lan ở ngã tư chữ thập.',
      stage4Questions: [
        {
          questionId: 'qc_stage4',
          prompt: 'Tổng số bạn có trong cả hai hàng là bao nhiêu? (8 + 7 - 1 = ?)',
          type: 'number',
          placeholder: 'Nhập số bạn...',
          correctNumeric: '14',
          unit: 'bạn',
          hint: 'Trừ đi bạn Lan đứng ở vị trí giao điểm bị đếm 2 lần: 8 + 7 - 1 = ?',
          explanation: 'Xuất sắc! Có tất cả 14 bạn.'
        }
      ]
    }
  }
];

// Local storage keys
export const STORAGE_KEY_TEACHER_UNLOCKED = 'spark_math_teacher_unlocked_mode';
export const STORAGE_KEY_COMPLETED_PERIODIC = 'spark_math_completed_periodic_assessments';

export function isTeacherUnlocked(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY_TEACHER_UNLOCKED) === 'true';
  } catch {
    return false;
  }
}

export function setTeacherUnlocked(unlocked: boolean): void {
  try {
    if (unlocked) {
      localStorage.setItem(STORAGE_KEY_TEACHER_UNLOCKED, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEY_TEACHER_UNLOCKED);
    }
    window.dispatchEvent(new Event('spark_math_teacher_unlock_updated'));
  } catch {
    // Ignore
  }
}

export function getCompletedPeriodicIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLETED_PERIODIC);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markPeriodicAssessmentCompleted(id: string): void {
  try {
    const list = getCompletedPeriodicIds();
    if (!list.includes(id)) {
      list.push(id);
      localStorage.setItem(STORAGE_KEY_COMPLETED_PERIODIC, JSON.stringify(list));
      window.dispatchEvent(new Event('spark_math_periodic_updated'));
    }
  } catch {
    // Ignore
  }
}

/**
 * Checks if completing a lesson triggers the unlocking / prompt of a Periodic Assessment.
 * Returns the matching PeriodicAssessment if all prerequisite lessons are satisfied.
 */
export function checkPeriodicTrigger(
  completedLessonId: string,
  completedLessonIds: string[]
): PeriodicAssessment | null {
  const allCompleted = new Set([...completedLessonIds, completedLessonId]);
  const completedAssessments = getCompletedPeriodicIds();

  // Find any assessment where completedLessonId is the final prerequisite
  // AND all prerequisites of that assessment are now in allCompleted
  for (const assessment of PERIODIC_ASSESSMENTS) {
    if (completedAssessments.includes(assessment.id)) {
      continue; // Already finished by student
    }

    const lastPrereqId = assessment.prerequisiteLessonIds[assessment.prerequisiteLessonIds.length - 1];
    if (lastPrereqId === completedLessonId) {
      const allPrereqsMet = assessment.prerequisiteLessonIds.every((id) => allCompleted.has(id));
      if (allPrereqsMet) {
        return assessment;
      }
    }
  }

  return null;
}
