// ============================================================================
// VIETNAM GRADE 3 MATH (TOÁN 3 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG)
// CHỦ ĐỀ 4: PHÉP NHÂN, PHÉP CHIA TRONG PHẠM VI 100 (BÀI 23 -> BÀI 29)
// Triết lý sư phạm: Khám phá bản chất thông qua phương pháp đàm thoại Socratic
// ============================================================================

export interface SocraticPrompt {
  question: string;
  levelBadge?: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

export interface SocraticCard {
  id: string;
  stepNumber: number;
  totalSteps: number;
  stageTitle: string; // e.g. "Bước 1: Hiện tượng thực tế", "Bước 2: Bản chất sâu xa"
  questionText: string;
  subText?: string;
  visualType: 
    | 'multiplication_groups' 
    | 'multiplication_carry' 
    | 'scale_up_comparison' 
    | 'division_exact_vs_remainder' 
    | 'division_steps' 
    | 'scale_down_comparison' 
    | 'two_step_bar_model' 
    | 'practical_farm';
  visualData: Record<string, any>;
  socraticPrompt: SocraticPrompt;
  followUpPrompt?: SocraticPrompt;
  keyTakeaway: string;
}

export interface VietnamGrade3Exercise {
  id: string;
  order: number;
  title: string;
  prompt: string;
  contextSnippet?: string;
  cognitiveLevel: 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';
  type: 'single_choice' | 'fill_in' | 'step_by_step' | 'comparison_judge';
  visualAid?: {
    type: 'bars' | 'groups' | 'equation_steps' | 'remainders';
    data: Record<string, any>;
  };
  options?: {
    id: string;
    label: string;
    isCorrect: boolean;
  }[];
  correctAnswer: string | number;
  hint: string;
  solutionSteps: string[];
}

export interface VietnamGrade3Lesson {
  id: string;
  sgkLessonNumber: number;
  sgkPages: string;
  title: string;
  subtitle: string;
  coreQuestion: string; // Câu hỏi Socratic cốt lõi của bài học (e.g. "Tại sao phép nhân giúp ta đếm nhanh gấp 10 lần?")
  topicId: string;
  topicTitle: string;
  estimatedMinutes: number;
  socraticDiscovery: SocraticCard[];
  exercises: VietnamGrade3Exercise[];
  pedagogicalNotes: {
    whyTeachThis: string;
    commonMisconceptions: string[];
    teacherAdvice: string;
  };
}

export interface AssessmentQuestion {
  id: string;
  cognitiveLevel: 'nhan_biet' | 'thong_hieu' | 'van_dung' | 'van_dung_cao';
  topicAspect: string;
  prompt: string;
  context?: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
  }[];
  correctAnswer: string;
  explanation: string;
}

export interface VietnamGrade3TopicAssessment {
  id: string;
  title: string;
  topicTitle: string;
  totalQuestions: number;
  timeLimitMinutes: number;
  passingScore: number;
  description: string;
  competencyMatrix: {
    nhan_biet: number;
    thong_hieu: number;
    van_dung: number;
    van_dung_cao: number;
  };
  questions: AssessmentQuestion[];
}

// ============================================================================
// DỮ LIỆU CHI TIẾT BÀI HỌC CHỦ ĐỀ 4
// ============================================================================

export const VIETNAM_GRADE_3_LESSONS: VietnamGrade3Lesson[] = [
  // --------------------------------------------------------------------------
  // BÀI 1: BÀI 23 - NHÂN SỐ CÓ HAI CHỮ SỐ VỚI SỐ CÓ MỘT CHỮ SỐ (TRANG 67-69)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l23',
    sgkLessonNumber: 23,
    sgkPages: 'Trang 67 – 69 (SGK Tập 1)',
    title: 'Nhân số có hai chữ số với số có một chữ số',
    subtitle: 'Bản chất phép nhân: Gộp các nhóm bằng nhau & Kỹ thuật nhớ hàng chục',
    coreQuestion: 'Phép nhân là gì? Tại sao ta không dùng phép cộng liên tiếp mà lại phát minh ra phép nhân?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 20,
    pedagogicalNotes: {
      whyTeachThis: 'Giúp học sinh hiểu sâu bản chất phép nhân là viết gọn của phép cộng các số hạng bằng nhau. Đặt tính rồi tính từ phải sang trái (đơn vị trước, chục sau), nắm vững bản chất "nhớ 1 chục" khi nhân hàng đơn vị vượt quá 10.',
      commonMisconceptions: [
        'Học sinh hay quên cộng số nhớ vào kết quả nhân hàng chục.',
        'Nhầm lẫn giữa nhân từ trái sang phải với chia từ trái sang phải.',
        'Cộng số nhớ vào thừa số trước khi nhân (ví dụ: lấy 3 x (2 + 1) thay vì (3 x 2) + 1).'
      ],
      teacherAdvice: 'Hãy cho trẻ đếm khay bánh thực tế: 3 khay, mỗi khay 12 cái. Thấy rằng 12 + 12 + 12 = 36 rất mất thì giờ nếu có 10 khay, từ đó phép nhân 12 x 3 xuất hiện như một công cụ kỳ diệu!'
    },
    socraticDiscovery: [
      {
        id: 'socr-23-1',
        stepNumber: 1,
        totalSteps: 4,
        stageTitle: 'Bước 1: Hiện tượng thực tế',
        questionText: 'Trong bếp có 3 khay bánh ngọt thơm lừng. Mỗi khay đựng đúng 12 chiếc bánh. Làm thế nào để biết có tất cả bao nhiêu chiếc bánh?',
        subText: 'Quan sát hình ảnh 3 khay bánh, mỗi khay xếp ngay ngắn 12 chiếc.',
        visualType: 'multiplication_groups',
        visualData: {
          groupCount: 3,
          itemsPerGroup: 12,
          itemIcon: '🧁',
          groupLabels: ['Khay 1 (12 cái)', 'Khay 2 (12 cái)', 'Khay 3 (12 cái)']
        },
        socraticPrompt: {
          question: 'Nếu ta dùng phép cộng, ta sẽ tính tổng số bánh ở cả 3 khay như thế nào?',
          options: [
            {
              id: 'opt1',
              label: 'Ta lấy 12 + 3 = 15 chiếc bánh',
              isCorrect: false,
              feedback: 'Em quan sát kỹ nhé: mỗi khay có 12 cái bánh và có tận 3 khay như vậy. Phép tính 12 + 3 chỉ là 1 khay thêm 3 cái bánh thôi!'
            },
            {
              id: 'opt2',
              label: 'Ta cộng số bánh của cả 3 khay: 12 + 12 + 12 = 36 chiếc bánh',
              isCorrect: true,
              feedback: 'Chính xác tuyệt vời! Vì có 3 khay, mỗi khay 12 cái bánh nên ta lấy 12 cộng với chính nó 3 lần: 12 + 12 + 12 = 36 chiếc bánh.'
            },
            {
              id: 'opt3',
              label: 'Ta đếm từng chiếc bánh từ 1 đến 36',
              isCorrect: false,
              feedback: 'Đếm từng chiếc một cũng ra 36, nhưng nếu có 10 hay 20 khay bánh thì đếm rất lâu và dễ đếm sót. Ta cùng tìm phép tính nhanh hơn nhé!'
            }
          ]
        },
        followUpPrompt: {
          question: 'Trong phép cộng 12 + 12 + 12 = 36, số 12 được lấy lặp lại mấy lần? Và mối liên hệ với phép nhân là gì?',
          levelBadge: 'Cầu nối Phép Cộng ⇄ Phép Nhân',
          options: [
            {
              id: 'fup1',
              label: 'Số 12 được lấy lặp lại 3 lần, nên ta viết gọn thành phép nhân: 12 × 3 = 36',
              isCorrect: true,
              feedback: 'Tuyệt đỉnh tư duy! "Lấy 3 lần số 12" chính là ý nghĩa nguyên bản của phép nhân 12 × 3 = 36. Dấu nhân (×) ra đời để thay thế cho phép cộng các số giống nhau lặp đi lặp lại!'
            },
            {
              id: 'fup2',
              label: 'Số 12 chỉ được lấy 1 lần, rồi ta cộng thêm số 3',
              isCorrect: false,
              feedback: 'Em hãy nhìn lại phép tính 12 + 12 + 12 xem: có bao nhiêu số 12 đang đứng cạnh nhau và cộng lại với nhau nào?'
            },
            {
              id: 'fup3',
              label: 'Đây là phép chia chứ không có liên hệ gì với phép nhân',
              isCorrect: false,
              feedback: 'Ở đây ta đang gộp các khay bánh lại để tìm tổng số bánh, chưa chia phần cho ai cả. Em thử quan sát kỹ lại nhé!'
            }
          ]
        },
        keyTakeaway: 'Bản chất cốt lõi: Phép nhân là cách viết siêu gọn của phép cộng các số giống hệt nhau. Khi số 12 được lấy 3 lần (12 + 12 + 12), ta viết thành 12 × 3 = 36.'
      },
      {
        id: 'socr-23-2',
        stepNumber: 2,
        totalSteps: 4,
        stageTitle: 'Bước 2: Bế tắc của phép cộng lặp lại',
        questionText: 'Nếu bây giờ tiệm bánh mở rộng, có tới 8 khay bánh hoặc 20 khay bánh, mỗi khay vẫn có 12 cái. Điều gì sẽ xảy ra nếu ta vẫn dùng phép cộng?',
        subText: 'Thử hình dung một dãy tính dài dằng dặc: 12 + 12 + 12 + 12 + 12 + 12 + 12 + 12...',
        visualType: 'multiplication_groups',
        visualData: {
          groupCount: 8,
          itemsPerGroup: 12,
          itemIcon: '🧁',
          expressionLong: '12 + 12 + 12 + 12 + 12 + 12 + 12 + 12 = ?'
        },
        socraticPrompt: {
          question: 'Tại sao các nhà toán học lại nghĩ ra phép nhân thay vì tiếp tục dùng phép cộng?',
          options: [
            {
              id: 'opt1',
              label: 'Vì phép cộng lặp lại quá dài dòng, dễ nhầm lẫn và tốn thời gian tính toán',
              isCorrect: true,
              feedback: 'Đúng như vậy! Phép nhân ra đời để viết gọn và tính siêu tốc phép cộng của các số hạng giống hệt nhau.'
            },
            {
              id: 'opt2',
              label: 'Vì phép nhân sẽ luôn cho ra kết quả lớn hơn phép cộng',
              isCorrect: false,
              feedback: 'Không phải! Kết quả của 12 x 3 hoàn toàn bằng kết quả của 12 + 12 + 12. Phép nhân giúp tính nhanh và gọn gàng hơn.'
            }
          ]
        },
        keyTakeaway: 'Phép nhân chính là "phép cộng thông minh": thay vì viết 12 + 12 + 12, ta viết gọn thành 12 x 3!'
      },
      {
        id: 'socr-23-3',
        stepNumber: 3,
        totalSteps: 4,
        stageTitle: 'Bước 3: Bí mật đặt tính từ phải sang trái',
        questionText: 'Để tính 12 x 3 trên giấy, ta đặt tính thẳng cột. Ta phải nhân hàng nào trước: Hàng đơn vị hay hàng chục?',
        subText: '12 gồm 1 chục và 2 đơn vị. Khi nhân 3: 3 x 2 đơn vị = 6 đơn vị; 3 x 1 chục = 3 chục.',
        visualType: 'multiplication_carry',
        visualData: {
          factorA: 12,
          factorB: 3,
          unitsStep: '3 x 2 = 6 (viết 6)',
          tensStep: '3 x 1 = 3 (viết 3)',
          result: 36,
          hasCarry: false
        },
        socraticPrompt: {
          question: 'Vì sao ta luôn nhân hàng đơn vị trước rồi mới nhân đến hàng chục?',
          options: [
            {
              id: 'opt1',
              label: 'Thích nhân bên nào trước cũng được, không có lý do gì',
              isCorrect: false,
              feedback: 'Không đúng! Nếu nhân hàng chục trước, khi hàng đơn vị nhân ra số lớn hơn 10 thì sẽ không biết nhớ số dư vào đâu!'
            },
            {
              id: 'opt2',
              label: 'Để nếu hàng đơn vị vượt quá 10 (có nhớ), ta sẽ dễ dàng chuyển phần chục sang cộng vào hàng chục tiếp theo',
              isCorrect: true,
              feedback: 'Chính xác 100%! Đây là quy luật gom 10 đơn vị thành 1 chục trong hệ đếm thập phân của loài người.'
            }
          ]
        },
        keyTakeaway: 'Luôn nhân từ phải sang trái: Nhân chữ số hàng đơn vị trước, sau đó nhân chữ số hàng chục.'
      },
      {
        id: 'socr-23-4',
        stepNumber: 4,
        totalSteps: 4,
        stageTitle: 'Bước 4: Đột phá - Phép nhân có nhớ (26 x 3)',
        questionText: 'Thử thách lớn: Mỗi cuộn vải dài 26 m. Có 3 cuộn như thế. Ta tính 26 x 3 như thế nào khi 3 x 6 = 18?',
        subText: '18 đơn vị = 1 chục và 8 đơn vị. Ta giữ lại 8 đơn vị ở hàng đơn vị, còn 1 chục thì mang đi đâu?',
        visualType: 'multiplication_carry',
        visualData: {
          factorA: 26,
          factorB: 3,
          step1: '3 x 6 = 18. Viết 8 ở hàng đơn vị, NHỚ 1 CHỤC sang hàng chục.',
          step2: '3 x 2 chục = 6 chục. Thêm 1 chục đã nhớ: 6 + 1 = 7 chục. Viết 7.',
          result: 78,
          hasCarry: true
        },
        socraticPrompt: {
          question: 'Sau khi tính 3 x 2 = 6 ở hàng chục, bước tiếp theo bắt buộc là gì?',
          options: [
            {
              id: 'opt1',
              label: 'Viết ngay số 6 vào kết quả hàng chục (kết quả 68)',
              isCorrect: false,
              feedback: 'Rất tiếc! Bạn đã quên mất 1 chục mà hàng đơn vị vừa gửi sang nhờ giữ hộ rồi!'
            },
            {
              id: 'opt2',
              label: 'Cộng thêm 1 chục đã nhớ vào 6: 6 + 1 = 7, viết 7 (kết quả 78)',
              isCorrect: true,
              feedback: 'Đỉnh cao tư duy! 3 x 2 = 6, thêm 1 bằng 7, viết 7. Kết quả đúng là 78 mét vải.'
            }
          ]
        },
        followUpPrompt: {
          question: 'Nếu ta làm tính 17 x 4: Lấy 4 x 7 = 28 (viết 8 nhớ 2). Vậy số 2 nhớ này là 2 đơn vị hay 2 chục?',
          levelBadge: 'Bản chất số nhớ',
          options: [
            {
              id: 'fup1',
              label: 'Số 2 đó chính là 2 chục (vì 28 gồm 2 chục và 8 đơn vị)',
              isCorrect: true,
              feedback: 'Rất thông minh! 2 chục đó gửi sang hàng chục, lát nữa lấy 4 x 1 chục = 4 chục rồi cộng thêm 2 chục thành 6 chục (kết quả 68).'
            },
            {
              id: 'fup2',
              label: 'Số 2 đó là 2 đơn vị lẻ',
              isCorrect: false,
              feedback: '28 là 2 chục và 8 đơn vị mà. Hàng đơn vị chỉ giữ lại 8, còn 2 chục phải chuyển sang hàng chục!'
            }
          ]
        },
        keyTakeaway: 'Ghi nhớ câu thần chú: "Nhân hàng đơn vị -> Nhớ chục sang hàng chục -> Nhân hàng chục rồi CỘNG THÊM số nhớ!"'
      }
    ],
    exercises: [
      {
        id: 'ex-23-1',
        order: 1,
        title: 'Thực hành đặt tính không nhớ',
        prompt: 'Tính: 34 x 2 = ?',
        cognitiveLevel: 'nhan_biet',
        type: 'step_by_step',
        options: [
          { id: 'optA', label: '68', isCorrect: true },
          { id: 'optB', label: '64', isCorrect: false },
          { id: 'optC', label: '78', isCorrect: false },
          { id: 'optD', label: '58', isCorrect: false }
        ],
        correctAnswer: '68',
        hint: 'Nhân hàng đơn vị: 2 x 4 = 8. Nhân hàng chục: 2 x 3 = 6.',
        solutionSteps: [
          'Bước 1: 2 nhân 4 bằng 8, viết 8 ở hàng đơn vị.',
          'Bước 2: 2 nhân 3 bằng 6, viết 6 ở hàng chục.',
          'Kết luận: 34 x 2 = 68.'
        ]
      },
      {
        id: 'ex-23-2',
        order: 2,
        title: 'Thực hành nhân có nhớ một lần',
        prompt: 'Mỗi túi có 18 viên bi. Hỏi 4 túi như thế có tất cả bao nhiêu viên bi?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '48 viên bi', isCorrect: false },
          { id: 'optB', label: '72 viên bi', isCorrect: true },
          { id: 'optC', label: '62 viên bi', isCorrect: false },
          { id: 'optD', label: '82 viên bi', isCorrect: false }
        ],
        correctAnswer: '72 viên bi',
        hint: '4 x 8 = 32, viết 2 nhớ 3. Sau đó lấy 4 x 1 = 4, thêm 3 bằng mấy?',
        solutionSteps: [
          'Phép tính: 18 x 4.',
          '4 x 8 = 32, viết 2 nhớ 3.',
          '4 x 1 = 4, thêm 3 bằng 7, viết 7.',
          'Đáp số: 72 viên bi.'
        ]
      },
      {
        id: 'ex-23-3',
        order: 3,
        title: 'Vận dụng: Phát hiện lỗi sai',
        prompt: 'Bạn Robot đặt tính: 15 x 3 = 35. Bạn Robot đã mắc phải sai lầm gì?',
        cognitiveLevel: 'van_dung',
        type: 'single_choice',
        options: [
          { id: 'optA', label: 'Robot tính sai phép nhân 3 x 5', isCorrect: false },
          { id: 'optB', label: 'Robot đã quên không cộng 1 chục được nhớ vào hàng chục (lẽ ra là 3 x 1 = 3, thêm 1 bằng 4 -> 45)', isCorrect: true },
          { id: 'optC', label: 'Robot đã làm phép chia thay vì nhân', isCorrect: false },
          { id: 'optD', label: 'Robot tính đúng rồi, không có lỗi gì cả', isCorrect: false }
        ],
        correctAnswer: 'Robot đã quên không cộng 1 chục được nhớ vào hàng chục (lẽ ra là 3 x 1 = 3, thêm 1 bằng 4 -> 45)',
        hint: '3 x 5 = 15, viết 5 nhớ 1. Ở hàng chục: 3 x 1 = 3, nhưng nếu không cộng 1 nhớ thì sẽ ra 3!',
        solutionSteps: [
          '3 x 5 = 15 (viết 5 nhớ 1 chục).',
          '3 x 1 = 3 chục. Phải cộng 1 chục nhớ: 3 + 1 = 4 chục.',
          'Kết quả đúng phải là 45. Robot ghi 35 nghĩa là bạn đã "bỏ quên số nhớ"!'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BÀI 2: BÀI 24 - GẤP MỘT SỐ LÊN MỘT SỐ LẦN (TRANG 70-72)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l24',
    sgkLessonNumber: 24,
    sgkPages: 'Trang 70 – 72 (SGK Tập 1)',
    title: 'Gấp một số lên một số lần',
    subtitle: 'Phân biệt cốt lõi: Gấp lên k lần (x k) khác hoàn toàn Thêm k đơn vị (+ k)',
    coreQuestion: 'Từ "Gấp" trong toán học nghĩa là gì? Làm sao không bị nhầm lẫn giữa "gấp 3 lần" và "nhiều hơn 3 đơn vị"?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 20,
    pedagogicalNotes: {
      whyTeachThis: 'Đây là mốc ranh giới chuyển đổi tư duy giữa tư duy cộng tính (additive thinking) và tư duy nhân tính (multiplicative thinking). Học sinh cần trực quan hóa bằng đoạn thẳng.',
      commonMisconceptions: [
        'Nghe thấy chữ "gấp" nhưng lại lấy số đó cộng với số lần.',
        'Nhầm bài toán "Nhiều hơn 4" thành "Nhân với 4".'
      ],
      teacherAdvice: 'Hãy cho trẻ kéo dãn một sợi dây thun hoặc xếp các thanh lego: 1 đoạn mẫu 2cm, gấp 3 lần nghĩa là xếp 3 đoạn 2cm nối tiếp nhau thành 6cm!'
    },
    socraticDiscovery: [
      {
        id: 'socr-24-1',
        stepNumber: 1,
        totalSteps: 3,
        stageTitle: 'Bước 1: Trực quan hóa bằng đoạn thẳng',
        questionText: 'Đoạn thẳng AB dài 2 cm. Đoạn thẳng CD dài GẤP 3 LẦN đoạn thẳng AB. Đoạn thẳng CD dài bao nhiêu cm?',
        subText: 'Gấp 3 lần nghĩa là đoạn thẳng CD bằng 3 đoạn thẳng AB ghép lại với nhau.',
        visualType: 'scale_up_comparison',
        visualData: {
          originalLength: 2,
          unitName: 'cm',
          scaleFactor: 3,
          barA: { label: 'Đoạn AB', value: 2, segments: 1 },
          barB: { label: 'Đoạn CD (gấp 3 lần)', value: 6, segments: 3 }
        },
        socraticPrompt: {
          question: 'Phép tính nào thể hiện đúng độ dài của đoạn thẳng CD?',
          options: [
            {
              id: 'opt1',
              label: '2 + 3 = 5 cm',
              isCorrect: false,
              feedback: 'Sai rồi! 2 + 3 chỉ là kéo dài thêm 3 cm thôi, chưa phải gấp 3 lần.'
            },
            {
              id: 'opt2',
              label: '2 x 3 = 6 cm',
              isCorrect: true,
              feedback: 'Tuyệt vời! Gấp 3 lần đoạn 2 cm nghĩa là ta lấy 2 nhân với 3, bằng 6 cm.'
            }
          ]
        },
        keyTakeaway: 'Quy tắc: Muốn gấp một số lên một số lần, ta lấy số đó NHÂN với số lần.'
      },
      {
        id: 'socr-24-2',
        stepNumber: 2,
        totalSteps: 3,
        stageTitle: 'Bước 2: Cuộc đụng độ kinh điển - "Gấp 4 lần" vs "Thêm 4 đơn vị"',
        questionText: 'Mai có 5 chiếc kẹp tóc. Bạn Nam có số kẹp tóc GẤP 4 LẦN Mai. Bạn Lan có số kẹp tóc NHIỀU HƠN Mai 4 chiếc. Ai có nhiều kẹp tóc hơn?',
        subText: 'Hãy phân tích cẩn thận hai cụm từ ngữ toán học này!',
        visualType: 'scale_up_comparison',
        visualData: {
          maiCount: 5,
          namMultiplied: '5 x 4 = 20 chiếc kẹp',
          lanAdded: '5 + 4 = 9 chiếc kẹp',
          comparisonDiff: '20 chiếc > 9 chiếc (Nam nhiều hơn hẳn Lan)'
        },
        socraticPrompt: {
          question: 'Sự khác biệt bản chất giữa "Gấp 4 lần" và "Nhiều hơn 4 cái" là gì?',
          options: [
            {
              id: 'opt1',
              label: '"Gấp 4 lần" là nhân với 4 (phép nhân), còn "Nhiều hơn 4" là cộng thêm 4 (phép cộng)',
              isCorrect: true,
              feedback: 'Quá chuẩn xác! Gấp k lần là tăng theo bội số bằng phép NHÂN. Nhiều hơn k là tăng thêm bằng phép CỘNG.'
            },
            {
              id: 'opt2',
              label: 'Cả hai đều cùng là một ý nghĩa, chỉ là cách gọi khác nhau',
              isCorrect: false,
              feedback: 'Sai hoàn toàn! Kết quả 20 khác rất xa số 9. Phép nhân làm tăng số lượng với tốc độ khủng khiếp hơn nhiều so với phép cộng.'
            }
          ]
        },
        followUpPrompt: {
          question: 'Nếu gấp số 7 lên 3 lần rồi cộng thêm 3 đơn vị, ta được kết quả là bao nhiêu?',
          levelBadge: 'Kết hợp tư duy',
          options: [
            {
              id: 'fup1',
              label: '7 x 3 = 21, rồi 21 + 3 = 24',
              isCorrect: true,
              feedback: 'Tuyệt vời! Gấp 3 lần là 7 x 3 = 21, thêm 3 đơn vị nữa là 21 + 3 = 24!'
            },
            {
              id: 'fup2',
              label: '7 + 3 + 3 = 13',
              isCorrect: false,
              feedback: 'Sai rồi! Gấp 3 lần phải dùng phép nhân 7 x 3 = 21 chứ không phải phép cộng 7 + 3!'
            }
          ]
        },
        keyTakeaway: 'Luôn đọc kỹ từ ngữ: "GẤP LẦN" -> Dùng PHÉP NHÂN (x). "NHIỀU HƠN / THÊM" -> Dùng PHÉP CỘNG (+).'
      },
      {
        id: 'socr-24-3',
        stepNumber: 3,
        totalSteps: 3,
        stageTitle: 'Bước 3: Vận dụng thực tế với số có hai chữ số',
        questionText: 'Một bao gạo nặng 15 kg. Một bao ngô nặng GẤP 3 LẦN bao gạo. Bao ngô nặng bao nhiêu ki-lô-gam?',
        subText: 'Áp dụng bài học trước: Lấy 15 nhân 3 (nhớ 1 sang hàng chục).',
        visualType: 'scale_up_comparison',
        visualData: {
          riceKg: 15,
          cornMultiplier: 3,
          calculation: '15 x 3 = 45 kg'
        },
        socraticPrompt: {
          question: 'Nếu ta giải: "15 + 3 = 18 kg" thì lỗi sai nằm ở đâu?',
          options: [
            {
              id: 'opt1',
              label: 'Đã nhầm lẫn giữa gấp 3 lần thành cộng thêm 3 kg',
              isCorrect: true,
              feedback: 'Rất chính xác! Bao ngô gấp 3 lần bao gạo, phải là 15 x 3 = 45 kg mới đúng.'
            },
            {
              id: 'opt2',
              label: 'Không có lỗi sai nào cả',
              isCorrect: false,
              feedback: 'Sai rồi, 15 + 3 = 18 chỉ là nặng hơn 3 kg thôi!'
            }
          ]
        },
        keyTakeaway: 'Khi thấy từ "GẤP ... LẦN", lập tức liên tưởng đến phép nhân (x) ngay trong đầu!'
      }
    ],
    exercises: [
      {
        id: 'ex-24-1',
        order: 1,
        title: 'Nhận biết: Gấp một số lên nhiều lần',
        prompt: 'Gấp số 6 lên 5 lần ta được số nào?',
        cognitiveLevel: 'nhan_biet',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '11', isCorrect: false },
          { id: 'optB', label: '30', isCorrect: true },
          { id: 'optC', label: '25', isCorrect: false },
          { id: 'optD', label: '35', isCorrect: false }
        ],
        correctAnswer: '30',
        hint: 'Muốn gấp 6 lên 5 lần, ta lấy 6 x 5.',
        solutionSteps: [
          'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần.',
          '6 x 5 = 30.',
          'Đáp số: 30.'
        ]
      },
      {
        id: 'ex-24-2',
        order: 2,
        title: 'Thông hiểu: So sánh hai tình huống',
        prompt: 'Năm nay em 7 tuổi. Tuổi của mẹ GẤP 5 LẦN tuổi của em. Hỏi năm nay mẹ bao nhiêu tuổi?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '12 tuổi', isCorrect: false },
          { id: 'optB', label: '35 tuổi', isCorrect: true },
          { id: 'optC', label: '40 tuổi', isCorrect: false },
          { id: 'optD', label: '28 tuổi', isCorrect: false }
        ],
        correctAnswer: '35 tuổi',
        hint: 'Tuổi mẹ gấp 5 lần tuổi em, lấy 7 nhân với 5.',
        solutionSteps: [
          'Tuổi mẹ là: 7 x 5 = 35 (tuổi).',
          'Nếu lấy 7 + 5 = 12 tuổi là sai vì đó chỉ là nhiều hơn 5 tuổi.',
          'Đáp số: 35 tuổi.'
        ]
      },
      {
        id: 'ex-24-3',
        order: 3,
        title: 'Vận dụng cao: Bài toán thử thách hai đối tượng',
        prompt: 'Thùng A chứa 12 lít dầu. Thùng B chứa lượng dầu GẤP 4 LẦN thùng A. Hỏi thùng B nhiều hơn thùng A bao nhiêu lít dầu?',
        cognitiveLevel: 'van_dung_cao',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '48 lít', isCorrect: false },
          { id: 'optB', label: '36 lít', isCorrect: true },
          { id: 'optC', label: '24 lít', isCorrect: false },
          { id: 'optD', label: '60 lít', isCorrect: false }
        ],
        correctAnswer: '36 lít',
        hint: 'Bước 1: Tính số lít dầu thùng B (12 x 4). Bước 2: Lấy số dầu thùng B trừ đi thùng A.',
        solutionSteps: [
          'Bước 1: Số lít dầu ở thùng B là: 12 x 4 = 48 (lít).',
          'Bước 2: Thùng B nhiều hơn thùng A số lít dầu là: 48 - 12 = 36 (lít).',
          'Cách 2 siêu việt: Thùng B gấp 4 lần thùng A, nghĩa là nhiều hơn 3 phần bằng nhau. 12 x 3 = 36 (lít)!'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BÀI 3: BÀI 25 - PHÉP CHIA HẾT VÀ PHÉP CHIA CÓ DƯ (TRANG 72-74)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l25',
    sgkLessonNumber: 25,
    sgkPages: 'Trang 72 – 74 (SGK Tập 1)',
    title: 'Phép chia hết và phép chia có dư',
    subtitle: 'Bản chất chia đều, số dư và quy tắc thép: "Số dư luôn bé hơn số chia"',
    coreQuestion: 'Phép chia là gì? Tại sao có những lúc chia đều được, nhưng có lúc lại bị "dư"? Số dư có thể lớn hơn số chia không?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 25,
    pedagogicalNotes: {
      whyTeachThis: 'Khái niệm "chia có dư" là bước ngoặt trừu tượng lớn. Học sinh cần thấy rằng phép chia thực chất là hành động chia đều liên tiếp cho đến khi phần còn lại không thể chia đều thêm một lượt nào nữa.',
      commonMisconceptions: [
        'Học sinh cho phép số dư bằng hoặc lớn hơn số chia (ví dụ: 14 : 3 = 3 dư 5).',
        'Quên viết số dư vào kết quả phép tính.'
      ],
      teacherAdvice: 'Cho trẻ lấy 7 quả dâu thật hoặc 7 chiếc kẹo chia cho 2 bạn. Mỗi bạn 3 cái, còn thừa đúng 1 cái trên bàn không thể bẻ đôi. Đó chính là số DƯ!'
    },
    socraticDiscovery: [
      {
        id: 'socr-25-1',
        stepNumber: 1,
        totalSteps: 4,
        stageTitle: 'Bước 1: Chia hết - Chia đều không còn chiếc nào sót lại',
        questionText: 'Có 6 quả dâu tây chín mọng chia đều cho 2 bạn Thỏ và Gấu. Mỗi bạn nhận được bao nhiêu quả dâu?',
        subText: 'Quan sát: Chia lần lượt từng đợt cho đến khi hết sạch 6 quả dâu trên đĩa.',
        visualType: 'division_exact_vs_remainder',
        visualData: {
          totalItems: 6,
          friendsCount: 2,
          eachGets: 3,
          leftover: 0,
          itemIcon: '🍓'
        },
        socraticPrompt: {
          question: 'Sau khi chia xong, trên đĩa còn lại mấy quả dâu tây?',
          options: [
            {
              id: 'opt1',
              label: 'Còn lại 0 quả dâu. Ta gọi phép chia 6 : 2 = 3 là phép chia hết',
              isCorrect: true,
              feedback: 'Chính xác! Khi không còn thừa quả nào (dư bằng 0), phép chia đó gọi là phép chia hết.'
            },
            {
              id: 'opt2',
              label: 'Còn lại 1 quả dâu',
              isCorrect: false,
              feedback: 'Đếm lại xem: 3 + 3 = 6 quả dâu, vừa vặn không thừa quả nào!'
            }
          ]
        },
        keyTakeaway: 'Phép chia hết là phép chia mà phần còn lại bằng 0 (không có phần thừa).'
      },
      {
        id: 'socr-25-2',
        stepNumber: 2,
        totalSteps: 4,
        stageTitle: 'Bước 2: Xuất hiện điều kỳ lạ - Phép chia có dư',
        questionText: 'Nếu bây giờ mẹ hái thêm 1 quả, có tất cả 7 quả dâu tây vẫn chia đều cho 2 bạn Thỏ và Gấu. Chuyện gì sẽ xảy ra?',
        subText: 'Mỗi bạn lấy 1 quả... lấy 2 quả... lấy 3 quả... Ô kìa! Còn lại đúng 1 quả trên đĩa!',
        visualType: 'division_exact_vs_remainder',
        visualData: {
          totalItems: 7,
          friendsCount: 2,
          eachGets: 3,
          leftover: 1,
          formula: '7 : 2 = 3 (dư 1)'
        },
        socraticPrompt: {
          question: 'Vì sao ta không chia nốt quả dâu còn lại trên đĩa cho Thỏ hoặc Gấu?',
          options: [
            {
              id: 'opt1',
              label: 'Vì nếu cho Thỏ thì Thỏ được 4 quả, Gấu chỉ được 3 quả, như vậy sẽ không còn là "chia đều" nữa!',
              isCorrect: true,
              feedback: 'Tư duy công bằng tuyệt đối! Phép chia bắt buộc phải chia đều nhau. Quả thừa ra không chia đều được gọi là SỐ DƯ.'
            },
            {
              id: 'opt2',
              label: 'Vì quả dâu đó bị sâu nên không ai ăn',
              isCorrect: false,
              feedback: 'Không phải! Quả dâu rất ngon, nhưng vì muốn công bằng cho cả 2 bạn nên phải để lại!'
            }
          ]
        },
        keyTakeaway: 'Ta viết: 7 : 2 = 3 (dư 1). Đọc là: 7 chia 2 bằng 3, dư 1.'
      },
      {
        id: 'socr-25-3',
        stepNumber: 3,
        totalSteps: 4,
        stageTitle: 'Bước 3: Tên gọi các thành phần trong phép chia có dư',
        questionText: 'Trong phép chia: 19 : 4 = 4 (dư 3). Hãy chỉ ra danh tính của từng con số!',
        subText: '19 là gì? 4 là gì? 4 là gì? 3 là gì?',
        visualType: 'division_exact_vs_remainder',
        visualData: {
          dividend: 19,
          divisor: 4,
          quotient: 4,
          remainder: 3,
          checkFormula: '19 = 4 x 4 + 3'
        },
        socraticPrompt: {
          question: 'Cặp ghép nào dưới đây là hoàn toàn chính xác?',
          options: [
            {
              id: 'opt1',
              label: '19 là Số bị chia, 4 đầu là Số chia, 4 sau là Thương, 3 là Số dư',
              isCorrect: true,
              feedback: 'Xuất sắc! Số bị chia = Thương x Số chia + Số dư (19 = 4 x 4 + 3).'
            },
            {
              id: 'opt2',
              label: '19 là Tổng, 4 là Thừa số, 3 là Hiệu',
              isCorrect: false,
              feedback: 'Nhầm lẫn tên gọi của các phép toán khác rồi! Trong phép chia có: Số bị chia, Số chia, Thương và Số dư.'
            }
          ]
        },
        keyTakeaway: 'Công thức kiểm tra phép chia: SỐ BỊ CHIA = THƯƠNG x SỐ CHIA + SỐ DƯ.'
      },
      {
        id: 'socr-25-4',
        stepNumber: 4,
        totalSteps: 4,
        stageTitle: 'Bước 4: Quy luật thép bất biến - Số dư luôn bé hơn số chia',
        questionText: 'Một bạn học sinh làm tính: "17 chia 3 bằng 4 dư 5". Bạn ấy bảo: 3 x 4 + 5 = 17, chuẩn rồi thầy ơi! Bạn ấy đúng hay sai?',
        subText: 'Hãy nhìn vào số dư: Số dư là 5, trong khi số chia chỉ là 3!',
        visualType: 'division_exact_vs_remainder',
        visualData: {
          statement: '17 : 3 = 4 (dư 5) -> SAI LẦM NGHIÊM TRỌNG!',
          reason: 'Số dư 5 vẫn còn lớn hơn số chia 3. 5 quả dâu thừa ra vẫn có thể chia đều thêm cho 3 bạn mỗi bạn 1 quả nữa!',
          correctCalc: '17 : 3 = 5 (dư 2). Lúc này số dư 2 < số chia 3.'
        },
        socraticPrompt: {
          question: 'Vì sao trong toán học: SỐ DƯ BẮT BUỘC PHẢI BÉ HƠN SỐ CHIA?',
          options: [
            {
              id: 'opt1',
              label: 'Vì nếu số dư bằng hoặc lớn hơn số chia, ta vẫn có thể chia thêm một lượt nữa, nghĩa là việc chia chưa kết thúc!',
              isCorrect: true,
              feedback: 'Bạn là một thiên tài toán học nhí! Đúng vậy, còn 5 cái bánh mà chia cho 3 người thì mỗi người được thêm 1 cái nữa, thương phải là 5 và chỉ dư 2.'
            },
            {
              id: 'opt2',
              label: 'Chỉ là quy ước người lớn đặt ra bắt trẻ em phải nhớ',
              isCorrect: false,
              feedback: 'Không phải quy ước vô lý, đó là bản chất của việc chia cho tới khi không thể chia đều thêm được nữa!'
            }
          ]
        },
        followUpPrompt: {
          question: 'Nếu ta chia cho 6, thì số dư lớn nhất có thể xuất hiện là số mấy?',
          levelBadge: 'Quy luật số dư',
          options: [
            {
              id: 'fup1',
              label: 'Số dư lớn nhất là 5 (vì số dư luôn phải bé hơn 6)',
              isCorrect: true,
              feedback: 'Tuyệt vời! Nếu dư 6 thì đã chia thêm được một lượt nữa rồi. Số dư chỉ có thể là 0, 1, 2, 3, 4 hoặc 5.'
            },
            {
              id: 'fup2',
              label: 'Số dư lớn nhất là 6',
              isCorrect: false,
              feedback: 'Sai rồi! Số dư không bao giờ được bằng số chia. 6 : 6 = 1, chia tiếp được ngay!'
            }
          ]
        },
        keyTakeaway: 'QUY TẮC BẤT DI BẤT DỊCH: Số dư LUÔN LUÔN BÉ HƠN số chia (Số dư < Số chia).'
      }
    ],
    exercises: [
      {
        id: 'ex-25-1',
        order: 1,
        title: 'Nhận biết: Tìm thương và số dư',
        prompt: 'Thực hiện phép chia: 23 : 4 = ?',
        cognitiveLevel: 'nhan_biet',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '5 (dư 3)', isCorrect: true },
          { id: 'optB', label: '5 (dư 4)', isCorrect: false },
          { id: 'optC', label: '4 (dư 7)', isCorrect: false },
          { id: 'optD', label: '6 (dư 1)', isCorrect: false }
        ],
        correctAnswer: '5 (dư 3)',
        hint: 'Nhẩm bảng nhân 4: 4 x 5 = 20, 23 - 20 = 3.',
        solutionSteps: [
          '4 x 5 = 20; 4 x 6 = 24 (lớn hơn 23 nên không lấy 6).',
          'Vậy thương là 5.',
          'Số dư: 23 - 20 = 3 (3 < 4, số dư hợp lệ).',
          'Kết quả: 23 : 4 = 5 (dư 3).'
        ]
      },
      {
        id: 'ex-25-2',
        order: 2,
        title: 'Thông hiểu: Thử thách số dư lớn nhất có thể',
        prompt: 'Trong phép chia có số chia là 6, số dư lớn nhất có thể có trong phép chia này là bao nhiêu?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '6', isCorrect: false },
          { id: 'optB', label: '5', isCorrect: true },
          { id: 'optC', label: '7', isCorrect: false },
          { id: 'optD', label: '1', isCorrect: false }
        ],
        correctAnswer: '5',
        hint: 'Số dư luôn bé hơn số chia. Số bé hơn 6 và lớn nhất là số mấy?',
        solutionSteps: [
          'Vì số chia là 6, nên các số dư có thể xảy ra là: 0, 1, 2, 3, 4, 5.',
          'Số dư lớn nhất trong các số đó là 5.',
          'Nếu số dư là 6 thì đã chia thêm được 1 lần nữa!'
        ]
      },
      {
        id: 'ex-25-3',
        order: 3,
        title: 'Vận dụng thực tế: Xếp bàn học sinh',
        prompt: 'Một lớp học có 35 học sinh. Mỗi bàn học ngồi được nhiều nhất 2 học sinh. Hỏi cần ít nhất bao nhiêu bàn học để tất cả học sinh đều có chỗ ngồi?',
        cognitiveLevel: 'van_dung_cao',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '17 bàn', isCorrect: false },
          { id: 'optB', label: '18 bàn', isCorrect: true },
          { id: 'optC', label: '16 bàn', isCorrect: false },
          { id: 'optD', label: '35 bàn', isCorrect: false }
        ],
        correctAnswer: '18 bàn',
        hint: '35 : 2 = 17 (dư 1). Học sinh còn dư 1 bạn này có cần thêm 1 cái bàn riêng không?',
        solutionSteps: [
          'Thực hiện phép chia: 35 : 2 = 17 (dư 1).',
          '17 bàn học thì chỉ ngồi được 17 x 2 = 34 bạn.',
          'Còn dư 1 bạn học sinh bắt buộc phải có thêm 1 chiếc bàn nữa.',
          'Số bàn học ít nhất cần có là: 17 + 1 = 18 (bàn học).'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BÀI 4: BÀI 26 - CHIA SỐ CÓ HAI CHỮ SỐ CHO SỐ CÓ MỘT CHỮ SỐ (TRANG 75-78)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l26',
    sgkLessonNumber: 26,
    sgkPages: 'Trang 75 – 78 (SGK Tập 1)',
    title: 'Chia số có hai chữ số cho số có một chữ số',
    subtitle: 'Kỹ thuật chia từng lượt từ trái sang phải: Chia hết & Chia có dư từng bước',
    coreQuestion: 'Tại sao phép nhân tính từ phải sang trái, còn phép chia lại bắt buộc tính từ trái sang phải (hàng chục trước, hạ hàng đơn vị sau)?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 25,
    pedagogicalNotes: {
      whyTeachThis: 'Đây là thuật toán chia chuẩn (long division) đầu tiên học sinh lớp 3 tiếp xúc. Phải làm chủ 3 bước nhẩm lặp lại trong mỗi lượt chia: CHIA -> NHÂN LẠI -> TRỪ LẤY DƯ -> HẠ CHỮ SỐ TIẾP THEO.',
      commonMisconceptions: [
        'Hạ hàng đơn vị xuống nhưng quên không chia tiếp.',
        'Trừ nhầm số dư lớn hơn số chia ở lượt chia hàng chục.',
        'Viết kết quả thương đảo ngược hàng chục và hàng đơn vị.'
      ],
      teacherAdvice: 'Nhắc học sinh câu thần chú 4 bước cho mỗi lượt: "Chia - Nhân - Trừ - Hạ". Thực hành nhuần nhuyễn trên nháp trước khi viết vào bài.'
    },
    socraticDiscovery: [
      {
        id: 'socr-26-1',
        stepNumber: 1,
        totalSteps: 3,
        stageTitle: 'Bước 1: Chia từ hàng chục sang hàng đơn vị (Chia hết: 48 : 2)',
        questionText: 'Có 48 cái kẹo chia đều cho 2 bạn. 48 gồm 4 chục và 8 đơn vị. Ta chia như thế nào?',
        subText: 'Lượt 1: Chia 4 chục trước. Lượt 2: Chia 8 đơn vị sau.',
        visualType: 'division_steps',
        visualData: {
          dividend: 48,
          divisor: 2,
          step1: '4 chia 2 được 2, viết 2. 2 x 2 = 4, 4 - 4 = 0.',
          step2: 'Hạ 8; 8 chia 2 được 4, viết 4. 4 x 2 = 8, 8 - 8 = 0.',
          result: 24
        },
        socraticPrompt: {
          question: 'Vì sao phép chia bắt đầu từ hàng lớn nhất (hàng chục) chứ không phải hàng đơn vị?',
          options: [
            {
              id: 'opt1',
              label: 'Vì nếu chia hàng chục còn dư, ta có thể đổi phần chục dư đó thành đơn vị rồi gộp vào hàng đơn vị để chia tiếp',
              isCorrect: true,
              feedback: 'Tư duy cực kỳ thông minh! Nếu chia từ hàng chục, phần chục dư sẽ ghép với hàng đơn vị (ví dụ 1 chục dư ghép với 2 đơn vị thành 12) để chia tiếp một cách hoàn hảo.'
            },
            {
              id: 'opt2',
              label: 'Chia từ đâu cũng được kết quả như nhau cả',
              isCorrect: false,
              feedback: 'Không đâu! Nếu chia từ hàng đơn vị, khi hàng chục chia có dư bạn sẽ không biết ghép vào đâu nữa!'
            }
          ]
        },
        keyTakeaway: 'Phép chia BẮT BUỘC thực hiện từ TRÁI SANG PHẢI (từ hàng cao nhất xuống hàng thấp nhất).'
      },
      {
        id: 'socr-26-2',
        stepNumber: 2,
        totalSteps: 3,
        stageTitle: 'Bước 2: Nghệ thuật ghép số dư trung gian (Ví dụ: 72 : 3)',
        questionText: 'Tính 72 : 3. Ở lượt đầu tiên: 7 chia 3 được 2, 2 x 3 = 6, 7 - 6 = 1. Con số 1 chục dư này sẽ đi về đâu?',
        subText: '1 chục dư và hạ 2 đơn vị xuống cạnh nhau... Ta được số mấy?',
        visualType: 'division_steps',
        visualData: {
          dividend: 72,
          divisor: 3,
          stepTens: '7 : 3 = 2 (dư 1)',
          stepCombine: 'Hạ 2 được 12',
          stepUnits: '12 : 3 = 4, 4 x 3 = 12, 12 - 12 = 0',
          result: 24
        },
        socraticPrompt: {
          question: 'Khi hạ 2 xuống cạnh 1 chục dư, ta được số 12. Số 12 này đến từ đâu?',
          options: [
            {
              id: 'opt1',
              label: '1 chục = 10 đơn vị, cộng với 2 đơn vị hạ xuống là 10 + 2 = 12 đơn vị',
              isCorrect: true,
              feedback: 'Chính xác đến từng milimet! 1 chục còn thừa đổi ra 10 đơn vị, gặp 2 đơn vị nữa thành 12 đơn vị để chia tiếp cho 3.'
            },
            {
              id: 'opt2',
              label: 'Chỉ là viết hai số cạnh nhau thôi, không có ý nghĩa gì',
              isCorrect: false,
              feedback: 'Trong hệ thập phân, chữ số hàng chục đứng trước chữ số hàng đơn vị chính là 1 chục và 2 đơn vị (tức 12).'
            }
          ]
        },
        followUpPrompt: {
          question: 'Nếu ở lượt chia hàng chục có số dư là 2, khi hạ chữ số 4 ở hàng đơn vị xuống, ta sẽ được số mới là bao nhiêu để chia tiếp?',
          levelBadge: 'Kỹ thuật ghép số',
          options: [
            {
              id: 'fup1',
              label: 'Số mới là 24 (gồm 2 chục dư đổi thành 20 đơn vị cộng với 4 đơn vị hạ xuống)',
              isCorrect: true,
              feedback: 'Chính xác 100%! 2 chục và 4 đơn vị ghép lại thành 24 đơn vị để tiếp tục chia.'
            },
            {
              id: 'fup2',
              label: 'Số mới là 6 (lấy 2 + 4 = 6)',
              isCorrect: false,
              feedback: 'Sai rồi! Số 2 ở hàng chục có giá trị là 20 cơ mà, không được cộng gộp 2 + 4 thành 6!'
            }
          ]
        },
        keyTakeaway: 'Quy trình chuẩn: Hạ chữ số tiếp theo xuống cạnh số dư để tạo thành số mới rồi tiếp tục chia.'
      },
      {
        id: 'socr-26-3',
        stepNumber: 3,
        totalSteps: 3,
        stageTitle: 'Bước 3: Chia có dư ở lượt cuối cùng (Ví dụ: 57 : 4)',
        questionText: 'Tính 57 : 4. Sau khi chia hàng chục và hạ 7 xuống chia, ta còn lại số dư cuối cùng là bao nhiêu?',
        subText: '5 : 4 = 1 dư 1. Hạ 7 được 17. 17 : 4 = 4 dư 1.',
        visualType: 'division_steps',
        visualData: {
          dividend: 57,
          divisor: 4,
          firstTurn: '5 : 4 = 1, dư 1',
          secondTurn: 'Hạ 7 được 17. 17 : 4 = 4, 4 x 4 = 16, 17 - 16 = 1',
          finalAnswer: '57 : 4 = 14 (dư 1)'
        },
        socraticPrompt: {
          question: 'Để chắc chắn 57 : 4 = 14 (dư 1) là đúng, ta thử lại như thế nào?',
          options: [
            {
              id: 'opt1',
              label: 'Lấy Thương nhân với Số chia rồi cộng Số dư: 14 x 4 + 1 = 56 + 1 = 57',
              isCorrect: true,
              feedback: 'Thần đồng toán học! Nếu kết quả thử lại đúng bằng Số bị chia ban đầu (57) và số dư 1 < 4, bạn đã làm đúng 100%!'
            },
            {
              id: 'opt2',
              label: 'Lấy 57 - 14 = 43',
              isCorrect: false,
              feedback: 'Phép trừ không phải là cách thử lại phép chia có dư!'
            }
          ]
        },
        keyTakeaway: 'Luôn thử lại: Thương x Số chia + Số dư = Số bị chia!'
      }
    ],
    exercises: [
      {
        id: 'ex-26-1',
        order: 1,
        title: 'Thực hành chia hết hai chữ số',
        prompt: 'Kết quả của phép tính 84 : 4 là bao nhiêu?',
        cognitiveLevel: 'nhan_biet',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '21', isCorrect: true },
          { id: 'optB', label: '22', isCorrect: false },
          { id: 'optC', label: '12', isCorrect: false },
          { id: 'optD', label: '24', isCorrect: false }
        ],
        correctAnswer: '21',
        hint: '8 chia 4 được 2. Hạ 4, 4 chia 4 được 1.',
        solutionSteps: [
          'Lượt 1: 8 : 4 = 2, viết 2.',
          'Lượt 2: Hạ 4; 4 : 4 = 1, viết 1.',
          'Kết quả: 84 : 4 = 21.'
        ]
      },
      {
        id: 'ex-26-2',
        order: 2,
        title: 'Thực hành chia có dư ở lượt cuối',
        prompt: 'Thực hiện phép tính: 65 : 3 = ?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '21 (dư 2)', isCorrect: true },
          { id: 'optB', label: '21 (dư 1)', isCorrect: false },
          { id: 'optC', label: '22 (dư 1)', isCorrect: false },
          { id: 'optD', label: '20 (dư 5)', isCorrect: false }
        ],
        correctAnswer: '21 (dư 2)',
        hint: '6 : 3 = 2. Hạ 5; 5 : 3 = 1 dư 2.',
        solutionSteps: [
          '6 : 3 = 2, 2 x 3 = 6, 6 - 6 = 0.',
          'Hạ 5; 5 : 3 = 1, 1 x 3 = 3, 5 - 3 = 2.',
          'Kết quả: 65 : 3 = 21 (dư 2).'
        ]
      },
      {
        id: 'ex-26-3',
        order: 3,
        title: 'Vận dụng: Đóng gói trái cây xuất khẩu',
        prompt: 'Một trang trại thu hoạch được 95 quả dưa lưới. Người ta đóng vào các thùng, mỗi thùng chứa đúng 4 quả dưa. Hỏi đóng được nhiều nhất bao nhiêu thùng và còn thừa mấy quả dưa?',
        cognitiveLevel: 'van_dung',
        type: 'single_choice',
        options: [
          { id: 'optA', label: 'Đóng được 23 thùng và thừa 3 quả dưa', isCorrect: true },
          { id: 'optB', label: 'Đóng được 24 thùng và thừa 1 quả dưa', isCorrect: false },
          { id: 'optC', label: 'Đóng được 23 thùng và thừa 2 quả dưa', isCorrect: false },
          { id: 'optD', label: 'Đóng được 22 thùng và thừa 7 quả dưa', isCorrect: false }
        ],
        correctAnswer: 'Đóng được 23 thùng và thừa 3 quả dưa',
        hint: 'Thực hiện phép chia: 95 : 4. Thương là số thùng đóng được, số dư là số quả thừa.',
        solutionSteps: [
          'Thực hiện phép chia: 95 : 4.',
          '9 : 4 = 2, dư 1. Hạ 5 được 15. 15 : 4 = 3, dư 3.',
          'Vậy 95 : 4 = 23 (dư 3).',
          'Đáp số: Đóng được nhiều nhất 23 thùng và còn thừa 3 quả dưa.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BÀI 5: BÀI 27 - GIẢM MỘT SỐ ĐI MỘT SỐ LẦN (TRANG 79-80)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l27',
    sgkLessonNumber: 27,
    sgkPages: 'Trang 79 – 80 (SGK Tập 1)',
    title: 'Giảm một số đi một số lần',
    subtitle: 'Đối xứng với gấp: Giảm k lần (: k) khác hoàn toàn Bớt k đơn vị (- k)',
    coreQuestion: 'Từ "Giảm một số đi một số lần" nghĩa là gì? Tại sao lại dùng phép chia? Phân biệt thế nào với "Bớt đi đơn vị"?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 20,
    pedagogicalNotes: {
      whyTeachThis: 'Củng cố cặp phạm trù đảo ngược: Nhân (gấp lên) đối xứng với Chia (giảm đi). Rèn luyện tư duy phân tích ngôn ngữ toán học chặt chẽ.',
      commonMisconceptions: [
        'Nghe thấy "giảm 3 lần" lại lấy số đó trừ đi 3.',
        'Nhầm "bớt đi 5 lít" thành chia cho 5.'
      ],
      teacherAdvice: 'Cho học sinh thấy 1 đoạn dây 12cm cắt đều làm 3 phần bằng nhau. Mỗi phần chỉ còn 4cm (12 : 3 = 4). Đó là giảm đi 3 lần!'
    },
    socraticDiscovery: [
      {
        id: 'socr-27-1',
        stepNumber: 1,
        totalSteps: 3,
        stageTitle: 'Bước 1: Cắt nhỏ đoạn thẳng để cảm nhận "Giảm đi một số lần"',
        questionText: 'Đoạn thẳng CD dài 6 cm. Cắt đều đoạn thẳng CD thành 3 đoạn bằng nhau thì được đoạn thẳng AB. Đoạn thẳng AB dài mấy cm?',
        subText: 'Đoạn AB chính là độ dài của đoạn CD sau khi đã GIẢM ĐI 3 LẦN.',
        visualType: 'scale_down_comparison',
        visualData: {
          originalLength: 6,
          divisor: 3,
          barCD: { label: 'Đoạn CD ban đầu (6 cm)', parts: 3 },
          barAB: { label: 'Đoạn AB (bằng 1 phần: 6 : 3 = 2 cm)', parts: 1 }
        },
        socraticPrompt: {
          question: 'Phép tính nào đúng để tìm độ dài đoạn thẳng AB?',
          options: [
            {
              id: 'opt1',
              label: '6 - 3 = 3 cm',
              isCorrect: false,
              feedback: 'Sai rồi! 6 - 3 chỉ là cắt bớt đi 3 cm thôi, chưa phải chia làm 3 phần đều nhau.'
            },
            {
              id: 'opt2',
              label: '6 : 3 = 2 cm',
              isCorrect: true,
              feedback: 'Rất chính xác! Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần.'
            }
          ]
        },
        keyTakeaway: 'QUY TẮC: Muốn giảm một số đi một số lần, ta lấy số đó CHIA cho số lần.'
      },
      {
        id: 'socr-27-2',
        stepNumber: 2,
        totalSteps: 3,
        stageTitle: 'Bước 2: Phân biệt rõ rệt "Giảm 3 lần" và "Bớt đi 3 đơn vị"',
        questionText: 'Bác An có 24 con gà. Bác bán bớt đi một số gà. Trường hợp 1: Số gà giảm đi 3 lần. Trường hợp 2: Số gà bớt đi 3 con. Số gà còn lại ở trường hợp nào ít hơn?',
        subText: 'Trường hợp 1: 24 : 3 = 8 con gà. Trường hợp 2: 24 - 3 = 21 con gà.',
        visualType: 'scale_down_comparison',
        visualData: {
          initial: 24,
          case1: 'Giảm 3 lần: 24 : 3 = 8 con',
          case2: 'Bớt 3 con: 24 - 3 = 21 con',
          conclusion: '8 con ít hơn rất nhiều so với 21 con!'
        },
        socraticPrompt: {
          question: 'Tại sao giảm đi 3 lần lại làm số lượng sụt giảm mạnh hơn bớt đi 3 đơn vị?',
          options: [
            {
              id: 'opt1',
              label: 'Vì giảm 3 lần là chia thành 3 phần bằng nhau và chỉ giữ lại đúng 1 phần',
              isCorrect: true,
              feedback: 'Tư duy cực kỳ sâu sắc! Chia thành 3 phần bằng nhau thì đã mất đi tận 2 phần (16 con), nên còn lại 8 con ít hơn hẳn.'
            },
            {
              id: 'opt2',
              label: 'Vì phép trừ luôn luôn giữ lại ít hơn phép chia',
              isCorrect: false,
              feedback: 'Không đúng! Bạn thấy rõ ràng 24 - 3 = 21 lớn hơn nhiều so với 24 : 3 = 8 mà.'
            }
          ]
        },
        followUpPrompt: {
          question: 'Nếu số 30 giảm đi 5 lần thì được số mấy, và số 30 bớt đi 5 đơn vị thì được số mấy?',
          levelBadge: 'So sánh phản xạ',
          options: [
            {
              id: 'fup1',
              label: 'Giảm 5 lần: 30 : 5 = 6; Bớt 5 đơn vị: 30 - 5 = 25',
              isCorrect: true,
              feedback: 'Tuyệt đỉnh! Giảm lần dùng phép chia (được 6), bớt đơn vị dùng phép trừ (được 25).'
            },
            {
              id: 'fup2',
              label: 'Cả hai phép tính đều cho ra kết quả là 6',
              isCorrect: false,
              feedback: 'Sai rồi! 30 - 5 = 25 cơ mà, phép chia và phép trừ có kết quả hoàn toàn khác nhau!'
            }
          ]
        },
        keyTakeaway: 'CẨN THẬN TỪ NGỮ: "GIẢM ... LẦN" -> Dùng PHÉP CHIA (:). "BỚT ... ĐƠN VỊ" -> Dùng PHÉP TRỪ (-).'
      },
      {
        id: 'socr-27-3',
        stepNumber: 3,
        totalSteps: 3,
        stageTitle: 'Bước 3: Vòng tròn hoàn hảo: Gấp lên rồi lại Giảm đi',
        questionText: 'Nếu ta lấy số 8, GẤP lên 4 lần rồi lại GIẢM kết quả đó đi 4 lần, ta sẽ nhận được số nào?',
        subText: '8 x 4 = 32. Sau đó lấy 32 : 4 = ?',
        visualType: 'scale_down_comparison',
        visualData: {
          start: 8,
          stepA: '8 x 4 = 32',
          stepB: '32 : 4 = 8',
          cycle: 'Quay trở lại đúng số 8 ban đầu!'
        },
        socraticPrompt: {
          question: 'Mối quan hệ kỳ diệu giữa "Gấp k lần" và "Giảm k lần" là gì?',
          options: [
            {
              id: 'opt1',
              label: 'Chúng là hai phép toán ngược nhau, giống như bước lên 4 bước rồi lại lùi về 4 bước',
              isCorrect: true,
              feedback: 'Kỳ diệu của toán học! Phép nhân và phép chia là hai phép toán ngược nhau hoàn toàn.'
            },
            {
              id: 'opt2',
              label: 'Không có liên hệ gì với nhau',
              isCorrect: false,
              feedback: 'Nhìn lại xem: Nhân 4 rồi lại chia 4 đã đưa ta quay về đúng vạch xuất phát!'
            }
          ]
        },
        keyTakeaway: 'Nhân (Gấp lên) và Chia (Giảm đi) là hai người anh em song sinh đảo ngược nhau.'
      }
    ],
    exercises: [
      {
        id: 'ex-27-1',
        order: 1,
        title: 'Nhận biết: Giảm một số đi một số lần',
        prompt: 'Giảm số 42 đi 6 lần ta được số nào?',
        cognitiveLevel: 'nhan_biet',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '7', isCorrect: true },
          { id: 'optB', label: '36', isCorrect: false },
          { id: 'optC', label: '8', isCorrect: false },
          { id: 'optD', label: '6', isCorrect: false }
        ],
        correctAnswer: '7',
        hint: 'Muốn giảm 42 đi 6 lần, ta lấy 42 chia cho 6.',
        solutionSteps: [
          'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần.',
          '42 : 6 = 7.',
          'Đáp số: 7.'
        ]
      },
      {
        id: 'ex-27-2',
        order: 2,
        title: 'Thông hiểu: So sánh hai phép tính',
        prompt: 'Một cửa hàng có 36 kg bột mì. Buổi sáng bán đi 4 kg bột mì. Buổi chiều số bột mì còn lại lại giảm đi 4 lần. Buổi nào làm số bột mì hao hụt nhiều hơn?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: 'Buổi chiều hao hụt nhiều hơn (vì giảm 4 lần là mất đi tới 24 kg)', isCorrect: true },
          { id: 'optB', label: 'Buổi sáng hao hụt nhiều hơn', isCorrect: false },
          { id: 'optC', label: 'Hai buổi hao hụt như nhau', isCorrect: false },
          { id: 'optD', label: 'Không thể tính được', isCorrect: false }
        ],
        correctAnswer: 'Buổi chiều hao hụt nhiều hơn (vì giảm 4 lần là mất đi tới 24 kg)',
        hint: 'Buổi sáng mất 4 kg (còn 32 kg). Buổi chiều giảm 4 lần: 32 : 4 = 8 kg (đã mất đi 32 - 8 = 24 kg).',
        solutionSteps: [
          'Buổi sáng bán 4 kg -> còn 36 - 4 = 32 kg.',
          'Buổi chiều giảm 4 lần: 32 : 4 = 8 kg -> số bột mì hao hụt buổi chiều là 32 - 8 = 24 kg.',
          '24 kg > 4 kg, vậy buổi chiều hao hụt nhiều hơn hẳn.'
        ]
      },
      {
        id: 'ex-27-3',
        order: 3,
        title: 'Vận dụng cao: Bài toán tìm số',
        prompt: 'Nếu lấy một số đem giảm đi 5 lần thì được 9. Hỏi nếu lấy số đó bớt đi 5 đơn vị thì được kết quả là bao nhiêu?',
        cognitiveLevel: 'van_dung_cao',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '40', isCorrect: true },
          { id: 'optB', label: '45', isCorrect: false },
          { id: 'optC', label: '35', isCorrect: false },
          { id: 'optD', label: '50', isCorrect: false }
        ],
        correctAnswer: '40',
        hint: 'Bước 1: Tìm số ban đầu (lấy 9 nhân ngược lại với 5). Bước 2: Lấy số đó trừ đi 5.',
        solutionSteps: [
          'Bước 1: Số giảm đi 5 lần được 9, vậy số ban đầu là: 9 x 5 = 45.',
          'Bước 2: Lấy số đó bớt đi 5 đơn vị: 45 - 5 = 40.',
          'Đáp số: 40.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BÀI 6: BÀI 28 - BÀI TOÁN GIẢI BẰNG HAI BƯỚC TÍNH (TRANG 81-82)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l28',
    sgkLessonNumber: 28,
    sgkPages: 'Trang 81 – 82 (SGK Tập 1)',
    title: 'Bài toán giải bằng hai bước tính',
    subtitle: 'Nghệ thuật nhận diện "Cầu nối trung gian chưa biết" trước khi về đích',
    coreQuestion: 'Tại sao có những bài toán không thể làm 1 phép tính ra ngay đáp số? Làm sao để tìm ra bước ẩn giấu ở giữa?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 25,
    pedagogicalNotes: {
      whyTeachThis: 'Chuyển từ tư duy đơn bước sang tư duy chiến lược đa bước. Học sinh phải biết phân tích: "Đề bài hỏi gì? Để trả lời câu hỏi đó cần biết những gì? Cái gì đã biết, cái gì chưa biết?"',
      commonMisconceptions: [
        'Lấy ngay các con số có trong đề bài ghép vào 1 phép tính duy nhất rồi ghi đáp số.',
        'Tính xong bước 1 đã tưởng xong bài và lấy luôn kết quả đó làm đáp số.'
      ],
      teacherAdvice: 'Dạy học sinh phương pháp vẽ sơ đồ đoạn thẳng: đoạn nào biết rồi thì ghi rõ số, đoạn nào có dấu hỏi chấm (?) thì bắt buộc phải giải trước!'
    },
    socraticDiscovery: [
      {
        id: 'socr-28-1',
        stepNumber: 1,
        totalSteps: 3,
        stageTitle: 'Bước 1: Phát hiện "Cái bẫy" của bài toán hai bước',
        questionText: 'Hàng trên có 3 bông hoa. Hàng dưới có NHIỀU HƠN hàng trên 2 bông hoa. Hỏi CẢ HAI HÀNG có tất cả bao nhiêu bông hoa?',
        subText: 'Nhiều bạn nhanh nhảu lấy 3 + 2 = 5 bông hoa rồi kết luận luôn. Đó có phải là số hoa của cả hai hàng không?',
        visualType: 'two_step_bar_model',
        visualData: {
          row1: 3,
          row2Label: 'Hàng dưới (chưa biết, nhiều hơn 2)',
          totalQuestion: 'Cả hai hàng = ?',
          step1Result: '3 + 2 = 5 bông hoa (MỚI CHỈ LÀ HÀNG DƯỚI!)',
          step2Result: '3 + 5 = 8 bông hoa (CẢ HAI HÀNG)'
        },
        socraticPrompt: {
          question: 'Phép tính 3 + 2 = 5 mới chỉ cho ta biết điều gì?',
          options: [
            {
              id: 'opt1',
              label: 'Mới chỉ cho ta biết số bông hoa ở hàng dưới mà thôi!',
              isCorrect: true,
              feedback: 'Chính xác! Đề bài hỏi cả hai hàng cơ mà! Muốn tìm cả hai hàng, ta phải lấy hàng trên CỘNG VỚI hàng dưới.'
            },
            {
              id: 'opt2',
              label: 'Đã cho biết số hoa của cả hai hàng rồi',
              isCorrect: false,
              feedback: 'Sai rồi! Hàng dưới nhiều hơn hàng trên 2 bông, nghĩa là hàng dưới có 5 bông. Còn hàng trên có 3 bông nữa cơ mà!'
            }
          ]
        },
        followUpPrompt: {
          question: 'Sau khi tính được hàng dưới có 5 bông hoa, phép tính cuối cùng để tìm cả hai hàng là gì?',
          levelBadge: 'Về đích bài toán',
          options: [
            {
              id: 'fup1',
              label: '3 + 5 = 8 bông hoa (lấy hàng trên cộng với hàng dưới)',
              isCorrect: true,
              feedback: 'Tuyệt đỉnh! 3 bông hàng trên cộng 5 bông hàng dưới vừa tìm được, tổng cộng là 8 bông hoa.'
            },
            {
              id: 'fup2',
              label: '3 x 5 = 15 bông hoa',
              isCorrect: false,
              feedback: 'Sai rồi! Tìm tổng số hoa của hai hàng phải dùng phép cộng chứ không dùng phép nhân!'
            }
          ]
        },
        keyTakeaway: 'Để tìm tổng cả hai hàng, ta bắt buộc phải tìm số hoa của hàng dưới trước (đây là bước trung gian).'
      },
      {
        id: 'socr-28-2',
        stepNumber: 2,
        totalSteps: 3,
        stageTitle: 'Bước 2: Cấu trúc kim tự tháp giải bài toán 2 bước',
        questionText: 'Bể thứ nhất có 8 con cá. Bể thứ hai có số cá GẤP 3 LẦN bể thứ nhất. Hỏi cả hai bể có bao nhiêu con cá?',
        subText: 'Bước 1: Tìm bể thứ hai (8 x 3 = 24). Bước 2: Tìm cả hai bể (8 + 24 = 32).',
        visualType: 'two_step_bar_model',
        visualData: {
          tank1: 8,
          tank2Calculation: '8 x 3 = 24 con cá',
          totalCalculation: '8 + 24 = 32 con cá'
        },
        socraticPrompt: {
          question: 'Nếu một bạn viết lời giải: "Cả hai bể có số cá là: 8 x 3 = 24 con" thì bạn ấy bị nhầm chỗ nào?',
          options: [
            {
              id: 'opt1',
              label: 'Bạn ấy đã nhầm số cá của bể thứ hai thành số cá của cả hai bể',
              isCorrect: true,
              feedback: 'Rất tinh mắt! 24 con mới chỉ là bể thứ hai thôi. Bạn ấy đã quên không cộng thêm 8 con ở bể thứ nhất vào!'
            },
            {
              id: 'opt2',
              label: 'Bạn ấy làm phép nhân sai',
              isCorrect: false,
              feedback: '8 x 3 = 24 là nhân đúng, nhưng 24 chỉ là của bể thứ hai thôi!'
            }
          ]
        },
        keyTakeaway: 'Hãy luôn tự hỏi: "Con số mình vừa tính ra là của đối tượng nào? Đã phải là đáp án cuối cùng đề bài hỏi chưa?"'
      },
      {
        id: 'socr-28-3',
        stepNumber: 3,
        totalSteps: 3,
        stageTitle: 'Bước 3: Dấu hiệu nhận biết bài toán hai bước tính',
        questionText: 'Làm thế nào để biết ngay một bài toán cần giải bằng 2 bước tính?',
        subText: 'Bí quyết nằm ở việc lập sơ đồ phân tích từ câu hỏi ngược về dữ kiện.',
        visualType: 'two_step_bar_model',
        visualData: {
          analysis: [
            '1. Đề bài yêu cầu tìm CẢ HAI hoặc SỐ CÒN LẠI.',
            '2. Trong hai đại lượng cấu thành, mới chỉ biết 1 đại lượng.',
            '3. Đại lượng thứ hai còn đang bị ẩn giấu qua quan hệ "hơn/kém" hoặc "gấp/giảm".'
          ]
        },
        socraticPrompt: {
          question: 'Chiến thuật thông minh nhất khi gặp bài toán dạng này là gì?',
          options: [
            {
              id: 'opt1',
              label: 'Vẽ sơ đồ đoạn thẳng để nhìn rõ đại lượng nào chưa biết, tìm đại lượng đó trước rồi mới trả lời câu hỏi chính',
              isCorrect: true,
              feedback: 'Chiến thuật của nhà toán học bậc thầy! Sơ đồ đoạn thẳng biến các câu chữ rối rắm thành hình ảnh rõ như ban ngày.'
            },
            {
              id: 'opt2',
              label: 'Lấy bừa các con số trong đề bài nhân chia với nhau',
              isCorrect: false,
              feedback: 'Làm bừa như vậy chắc chắn sẽ bị sập bẫy đề thi!'
            }
          ]
        },
        keyTakeaway: 'Sơ đồ tư duy 2 bước: [Tìm đại lượng ẩn giấu] -> [Trả lời câu hỏi chính của đề bài].'
      }
    ],
    exercises: [
      {
        id: 'ex-28-1',
        order: 1,
        title: 'Nhận diện bước tính trung gian',
        prompt: 'Đội Một trồng được 15 cây xanh. Đội Hai trồng được nhiều hơn đội Một 5 cây. Hỏi cả hai đội trồng được bao nhiêu cây xanh?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '35 cây', isCorrect: true },
          { id: 'optB', label: '20 cây', isCorrect: false },
          { id: 'optC', label: '25 cây', isCorrect: false },
          { id: 'optD', label: '30 cây', isCorrect: false }
        ],
        correctAnswer: '35 cây',
        hint: 'Bước 1: Tính số cây đội Hai (15 + 5). Bước 2: Lấy số cây đội Một cộng đội Hai.',
        solutionSteps: [
          'Bước 1: Đội Hai trồng được số cây là: 15 + 5 = 20 (cây).',
          'Bước 2: Cả hai đội trồng được số cây là: 15 + 20 = 35 (cây).',
          'Đáp số: 35 cây.'
        ]
      },
      {
        id: 'ex-28-2',
        order: 2,
        title: 'Bài toán kết hợp gấp số lần và tính tổng',
        prompt: 'Một cửa hàng buổi sáng bán được 12 chiếc xe đạp. Buổi chiều bán được số xe gấp 2 lần buổi sáng. Hỏi cả ngày cửa hàng đó bán được bao nhiêu chiếc xe đạp?',
        cognitiveLevel: 'van_dung',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '36 chiếc xe', isCorrect: true },
          { id: 'optB', label: '24 chiếc xe', isCorrect: false },
          { id: 'optC', label: '14 chiếc xe', isCorrect: false },
          { id: 'optD', label: '48 chiếc xe', isCorrect: false }
        ],
        correctAnswer: '36 chiếc xe',
        hint: 'Bước 1: Buổi chiều bán được 12 x 2. Bước 2: Cả ngày = Buổi sáng + Buổi chiều.',
        solutionSteps: [
          'Bước 1: Số xe đạp bán trong buổi chiều là: 12 x 2 = 24 (chiếc).',
          'Bước 2: Cả ngày bán được số xe đạp là: 12 + 24 = 36 (chiếc).',
          'Đáp số: 36 chiếc xe đạp.'
        ]
      },
      {
        id: 'ex-28-3',
        order: 3,
        title: 'Vận dụng cao: Bài toán giảm số lần và tìm phần còn lại',
        prompt: 'Mẹ có 40 quả cam. Mẹ đem biếu bà một số cam bằng số cam ban đầu giảm đi 4 lần. Hỏi mẹ còn lại bao nhiêu quả cam?',
        cognitiveLevel: 'van_dung_cao',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '30 quả cam', isCorrect: true },
          { id: 'optB', label: '10 quả cam', isCorrect: false },
          { id: 'optC', label: '36 quả cam', isCorrect: false },
          { id: 'optD', label: '25 quả cam', isCorrect: false }
        ],
        correctAnswer: '30 quả cam',
        hint: 'Bước 1: Tính số cam biếu bà (40 : 4). Bước 2: Tính số cam còn lại (40 trừ đi số biếu bà).',
        solutionSteps: [
          'Bước 1: Số quả cam mẹ biếu bà là: 40 : 4 = 10 (quả cam).',
          'Bước 2: Mẹ còn lại số quả cam là: 40 - 10 = 30 (quả cam).',
          'Đáp số: 30 quả cam.'
        ]
      }
    ]
  },

  // --------------------------------------------------------------------------
  // BÀI 7: BÀI 29 - LUYỆN TẬP CHUNG & ỨNG DỤNG THỰC TIỄN (TRANG 83-84)
  // --------------------------------------------------------------------------
  {
    id: 'vn3-c4-l29',
    sgkLessonNumber: 29,
    sgkPages: 'Trang 83 – 84 (SGK Tập 1)',
    title: 'Luyện tập chung & Ứng dụng thực tế',
    subtitle: 'Tổng hợp sức mạnh nhân chia: Giải quyết bài toán nông trại & siêu thị mini',
    coreQuestion: 'Làm thế nào để phối hợp nhuần nhuyễn cả 4 phép tính (+, -, x, :) để giải quyết các vấn đề trong cuộc sống hàng ngày?',
    topicId: 'chu-de-4',
    topicTitle: 'Chủ đề 4: Phép nhân, phép chia trong phạm vi 100',
    estimatedMinutes: 25,
    pedagogicalNotes: {
      whyTeachThis: 'Bài tổng kết giúp học sinh hệ thống hóa lại toàn bộ kiến thức của Chủ đề 4 trước khi bước vào kỳ kiểm tra định kỳ. Rèn luyện phản xạ chọn đúng phép toán dựa trên ngữ cảnh thực tế.',
      commonMisconceptions: [
        'Nhầm lẫn giữa các phép tính khi bài toán có nhiều thông tin số liệu thực tế.',
        'Không kiểm tra lại tính hợp lý của kết quả với thực tế.'
      ],
      teacherAdvice: 'Tạo bối cảnh một chuyến đi nông trại dã ngoại, nơi các em là người quản lý nông sản: thu hoạch dưa hấu, chia hạt giống, tính sản lượng!'
    },
    socraticDiscovery: [
      {
        id: 'socr-29-1',
        stepNumber: 1,
        totalSteps: 2,
        stageTitle: 'Bước 1: Bản đồ tư duy 4 trạm toán học Chủ đề 4',
        questionText: 'Hãy cùng nhìn lại hành trình chúng ta đã vượt qua trong Chủ đề 4: Ta đã thu hoạch được những công cụ tư duy kỳ diệu nào?',
        subText: '1. Nhân 2 chữ số với 1 chữ số -> 2. Gấp lên k lần (x) -> 3. Chia có dư (Số dư < Số chia) -> 4. Bài toán 2 bước.',
        visualType: 'practical_farm',
        visualData: {
          pillars: [
            'Trạm 1: Nhân nhẩm & đặt tính có nhớ hàng chục',
            'Trạm 2: Gấp lần (nhân) đối xứng với Giảm lần (chia)',
            'Trạm 3: Chia hết và Chia có dư (Thử lại: Sbc = Thương x Sc + Dư)',
            'Trạm 4: Bài toán 2 bước (Tìm cầu nối trung gian)'
          ]
        },
        socraticPrompt: {
          question: 'Khi gặp một tình huống thực tế, câu hỏi đầu tiên ta nên tự vấn là gì?',
          options: [
            {
              id: 'opt1',
              label: 'Số lượng này đang gộp các nhóm bằng nhau (nhân), chia đều (chia), hay tăng giảm theo đơn vị (+, -)?',
              isCorrect: true,
              feedback: 'Chính xác! Phân loại bản chất hành động thực tế là chìa khóa để chọn đúng 100% phép toán.'
            },
            {
              id: 'opt2',
              label: 'Cứ lấy số to chia số nhỏ cho tiện',
              isCorrect: false,
              feedback: 'Đừng đoán mò! Mỗi phép toán đều có ý nghĩa thực tế riêng biệt.'
            }
          ]
        },
        keyTakeaway: 'Toán học không phải là những con số vô hồn, toán học là ngôn ngữ mô tả thế giới xung quanh!'
      },
      {
        id: 'socr-29-2',
        stepNumber: 2,
        totalSteps: 2,
        stageTitle: 'Bước 2: Trở thành nhà quản lý nông trại thông thái',
        questionText: 'Nông trại thu hoạch được 80 bắp ngô. Bác nông dân để lại 8 bắp ngô làm giống, số ngô còn lại chia đều vào 8 rổ. Hỏi mỗi rổ có bao nhiêu bắp ngô?',
        subText: 'Phân tích: Để lại làm giống là bớt đi (phép trừ). Chia đều vào các rổ là phép chia.',
        visualType: 'practical_farm',
        visualData: {
          totalCorn: 80,
          keptForSeeds: 8,
          remainingCalculation: '80 - 8 = 72 bắp ngô',
          baskets: 8,
          perBasket: '72 : 8 = 9 bắp ngô'
        },
        socraticPrompt: {
          question: 'Phép tính thứ nhất cần làm là gì?',
          options: [
            {
              id: 'opt1',
              label: '80 - 8 = 72 (tìm số bắp ngô đem chia vào rổ)',
              isCorrect: true,
              feedback: 'Hoàn hảo! Phải trừ 8 bắp ngô làm giống ra trước, còn lại 72 bắp mới đem chia cho 8 rổ.'
            },
            {
              id: 'opt2',
              label: '80 : 8 = 10',
              isCorrect: false,
              feedback: 'Sai rồi! Bác đã giữ lại 8 bắp làm giống cơ mà, đâu có đem cả 80 bắp đi chia!'
            }
          ]
        },
        followUpPrompt: {
          question: 'Sau khi có 72 bắp ngô chia vào 8 rổ, mỗi rổ có 9 bắp ngô (72 : 8 = 9). Phép thử lại chuẩn xác là gì?',
          levelBadge: 'Thử lại kết quả',
          options: [
            {
              id: 'fup1',
              label: '9 x 8 = 72 bắp ngô (Lấy số ngô mỗi rổ nhân với số rổ)',
              isCorrect: true,
              feedback: 'Tuyệt vời! Lấy 9 bắp x 8 rổ = 72 bắp ngô, đúng bằng số ngô đem chia.'
            },
            {
              id: 'fup2',
              label: '72 - 8 = 64',
              isCorrect: false,
              feedback: 'Phép trừ không phải là cách thử lại phép chia!'
            }
          ]
        },
        keyTakeaway: 'Bài toán thực tế luôn đòi hỏi ta phải đọc kỹ từng điều kiện và làm đúng thứ tự thời gian.'
      }
    ],
    exercises: [
      {
        id: 'ex-29-1',
        order: 1,
        title: 'Tính giá trị biểu thức',
        prompt: 'Tính giá trị của biểu thức: 14 x 3 + 28 = ?',
        cognitiveLevel: 'thong_hieu',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '70', isCorrect: true },
          { id: 'optB', label: '60', isCorrect: false },
          { id: 'optC', label: '82', isCorrect: false },
          { id: 'optD', label: '62', isCorrect: false }
        ],
        correctAnswer: '70',
        hint: 'Nhân chia trước, cộng trừ sau. Tính 14 x 3 trước rồi cộng với 28.',
        solutionSteps: [
          'Quy tắc ưu tiên: Thực hiện phép nhân trước, phép cộng sau.',
          '14 x 3 = 42.',
          '42 + 28 = 70.',
          'Đáp số: 70.'
        ]
      },
      {
        id: 'ex-29-2',
        order: 2,
        title: 'Vận dụng: Thu hoạch mật ong rừng',
        prompt: 'Có 3 can mật ong, mỗi can chứa 15 lít mật ong. Người ta rót toàn bộ số mật ong đó đều vào các chai, mỗi chai 5 lít. Hỏi rót được tất cả bao nhiêu chai mật ong?',
        cognitiveLevel: 'van_dung',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '9 chai', isCorrect: true },
          { id: 'optB', label: '8 chai', isCorrect: false },
          { id: 'optC', label: '10 chai', isCorrect: false },
          { id: 'optD', label: '7 chai', isCorrect: false }
        ],
        correctAnswer: '9 chai',
        hint: 'Bước 1: Tính tổng số lít mật ong ở cả 3 can (15 x 3). Bước 2: Chia cho 5 lít mỗi chai.',
        solutionSteps: [
          'Bước 1: Cả 3 can có tất cả số lít mật ong là: 15 x 3 = 45 (lít).',
          'Bước 2: Rót được số chai mật ong là: 45 : 5 = 9 (chai).',
          'Đáp số: 9 chai mật ong.'
        ]
      },
      {
        id: 'ex-29-3',
        order: 3,
        title: 'Vận dụng cao: Bài toán tìm ẩn số trong phép chia có dư',
        prompt: 'Một số chia cho 7 được thương là 11 và số dư là số dư lớn nhất có thể có. Tìm số đó?',
        cognitiveLevel: 'van_dung_cao',
        type: 'single_choice',
        options: [
          { id: 'optA', label: '83', isCorrect: true },
          { id: 'optB', label: '77', isCorrect: false },
          { id: 'optC', label: '84', isCorrect: false },
          { id: 'optD', label: '82', isCorrect: false }
        ],
        correctAnswer: '83',
        hint: 'Số chia là 7, nên số dư lớn nhất là 6. Số bị chia = Thương x Số chia + Số dư.',
        solutionSteps: [
          'Vì số chia là 7, nên số dư lớn nhất có thể là: 7 - 1 = 6.',
          'Áp dụng công thức: Số bị chia = Thương x Số chia + Số dư.',
          'Số cần tìm là: 11 x 7 + 6 = 77 + 6 = 83.',
          'Đáp số: 83.'
        ]
      }
    ]
  }
];

// ============================================================================
// BÀI ĐÁNH GIÁ ĐỊNH KỲ NĂNG LỰC HỌC PHẦN CHỦ ĐỀ 4
// 10 câu hỏi bao quát 4 mức độ nhận thức (GDPT 2018)
// ============================================================================

export const TOPIC_4_PERIODIC_ASSESSMENT: VietnamGrade3TopicAssessment = {
  id: 'vn3-assessment-topic-4',
  title: 'Bài Kiểm Tra Định Kỳ Học Phần: Chủ Đề 4',
  topicTitle: 'Phép nhân, phép chia trong phạm vi 100',
  totalQuestions: 10,
  timeLimitMinutes: 25,
  passingScore: 7, // 7/10 điểm là đạt chuẩn năng lực
  description: 'Khảo sát năng lực toàn diện: Bản chất phép nhân, kỹ thuật nhớ, phân biệt gấp/giảm số lần với thêm/bớt đơn vị, quy tắc số dư và kỹ năng giải bài toán 2 bước.',
  competencyMatrix: {
    nhan_biet: 3,     // 30%
    thong_hieu: 3,    // 30%
    van_dung: 2,      // 20%
    van_dung_cao: 2   // 20%
  },
  questions: [
    // 1. Nhận biết - Phép nhân không nhớ
    {
      id: 'as-t4-q1',
      cognitiveLevel: 'nhan_biet',
      topicAspect: 'Nhân số có hai chữ số với số có một chữ số',
      prompt: 'Kết quả của phép tính 23 x 3 là:',
      options: [
        { id: 'a', label: '69', isCorrect: true },
        { id: 'b', label: '66', isCorrect: false },
        { id: 'c', label: '59', isCorrect: false },
        { id: 'd', label: '79', isCorrect: false }
      ],
      correctAnswer: '69',
      explanation: 'Thực hiện nhân từ phải sang trái: 3 x 3 = 9 viết 9, 3 x 2 = 6 viết 6. Kết quả là 69.'
    },

    // 2. Nhận biết - Quy tắc số dư
    {
      id: 'as-t4-q2',
      cognitiveLevel: 'nhan_biet',
      topicAspect: 'Bản chất phép chia có dư',
      prompt: 'Trong một phép chia có số chia là 5, số dư có thể nhận những giá trị nào?',
      options: [
        { id: 'a', label: 'Chỉ có thể là 0, 1, 2, 3 hoặc 4 (vì số dư luôn nhỏ hơn số chia)', isCorrect: true },
        { id: 'b', label: 'Có thể là 5 hoặc 6', isCorrect: false },
        { id: 'c', label: 'Bất kỳ số nào lớn hơn 5', isCorrect: false },
        { id: 'd', label: 'Chỉ có thể là 1', isCorrect: false }
      ],
      correctAnswer: 'Chỉ có thể là 0, 1, 2, 3 hoặc 4 (vì số dư luôn nhỏ hơn số chia)',
      explanation: 'Quy tắc thép của phép chia: Số dư bắt buộc phải luôn luôn bé hơn số chia. Vì số chia là 5 nên số dư chỉ có thể là 0, 1, 2, 3, 4.'
    },

    // 3. Nhận biết - Gấp một số lên một số lần
    {
      id: 'as-t4-q3',
      cognitiveLevel: 'nhan_biet',
      topicAspect: 'Gấp một số lên nhiều lần',
      prompt: 'Muốn gấp số 8 lên 4 lần, ta thực hiện phép tính nào?',
      options: [
        { id: 'a', label: '8 x 4 = 32', isCorrect: true },
        { id: 'b', label: '8 + 4 = 12', isCorrect: false },
        { id: 'c', label: '8 : 4 = 2', isCorrect: false },
        { id: 'd', label: '8 - 4 = 4', isCorrect: false }
      ],
      correctAnswer: '8 x 4 = 32',
      explanation: 'Muốn gấp một số lên một số lần, ta lấy số đó nhân với số lần: 8 x 4 = 32.'
    },

    // 4. Thông hiểu - Phân biệt Gấp lần vs Thêm đơn vị
    {
      id: 'as-t4-q4',
      cognitiveLevel: 'thong_hieu',
      topicAspect: 'Phân biệt tư duy nhân và tư duy cộng',
      prompt: 'Bao gạo thứ nhất nặng 9 kg. Bao gạo thứ hai nặng GẤP 3 LẦN bao thứ nhất. Bao gạo thứ ba NẶNG HƠN bao thứ nhất 3 kg. Phát biểu nào sau đây đúng?',
      options: [
        { id: 'a', label: 'Bao thứ hai nặng 27 kg, bao thứ ba nặng 12 kg (Bao 2 nặng hơn bao 3)', isCorrect: true },
        { id: 'b', label: 'Bao thứ hai và bao thứ ba nặng bằng nhau (cùng 27 kg)', isCorrect: false },
        { id: 'c', label: 'Bao thứ hai nặng 12 kg, bao thứ ba nặng 27 kg', isCorrect: false },
        { id: 'd', label: 'Cả hai bao đều nặng 12 kg', isCorrect: false }
      ],
      correctAnswer: 'Bao thứ hai nặng 27 kg, bao thứ ba nặng 12 kg (Bao 2 nặng hơn bao 3)',
      explanation: 'Bao thứ hai gấp 3 lần: 9 x 3 = 27 kg. Bao thứ ba nặng hơn 3 kg: 9 + 3 = 12 kg. Vậy bao 2 nặng 27 kg, bao 3 nặng 12 kg.'
    },

    // 5. Thông hiểu - Phép chia có dư 2 chữ số
    {
      id: 'as-t4-q5',
      cognitiveLevel: 'thong_hieu',
      topicAspect: 'Kỹ thuật chia số có 2 chữ số',
      prompt: 'Thực hiện phép tính 75 : 6 được thương và số dư là:',
      options: [
        { id: 'a', label: 'Thương là 12, dư 3', isCorrect: true },
        { id: 'b', label: 'Thương là 11, dư 9', isCorrect: false },
        { id: 'c', label: 'Thương là 12, dư 5', isCorrect: false },
        { id: 'd', label: 'Thương là 13, dư 1', isCorrect: false }
      ],
      correctAnswer: 'Thương là 12, dư 3',
      explanation: '7 : 6 = 1, dư 1. Hạ 5 được 15. 15 : 6 = 2, 2 x 6 = 12, 15 - 12 = 3. Kết quả: 12 dư 3 (thử lại: 12 x 6 + 3 = 72 + 3 = 75).'
    },

    // 6. Thông hiểu - Phân biệt Giảm lần vs Bớt đơn vị
    {
      id: 'as-t4-q6',
      cognitiveLevel: 'thong_hieu',
      topicAspect: 'Giảm một số đi một số lần',
      prompt: 'Một sợi dây dài 48 cm. Nếu giảm độ dài sợi dây đi 4 lần thì được sợi dây mới dài bao nhiêu?',
      options: [
        { id: 'a', label: '12 cm', isCorrect: true },
        { id: 'b', label: '44 cm', isCorrect: false },
        { id: 'c', label: '16 cm', isCorrect: false },
        { id: 'd', label: '8 cm', isCorrect: false }
      ],
      correctAnswer: '12 cm',
      explanation: 'Muốn giảm một số đi một số lần, ta lấy số đó chia cho số lần: 48 : 4 = 12 cm.'
    },

    // 7. Vận dụng - Bài toán 2 bước tính (Cộng và Nhân)
    {
      id: 'as-t4-q7',
      cognitiveLevel: 'van_dung',
      topicAspect: 'Bài toán giải bằng 2 bước tính',
      prompt: 'Lớp 3A có 14 bạn nữ. Số bạn nam GẤP 2 LẦN số bạn nữ. Hỏi lớp 3A có tất cả bao nhiêu học sinh?',
      options: [
        { id: 'a', label: '42 học sinh', isCorrect: true },
        { id: 'b', label: '28 học sinh', isCorrect: false },
        { id: 'c', label: '38 học sinh', isCorrect: false },
        { id: 'd', label: '56 học sinh', isCorrect: false }
      ],
      correctAnswer: '42 học sinh',
      explanation: 'Bước 1: Số bạn nam là 14 x 2 = 28 (bạn). Bước 2: Cả lớp có số bạn là 14 + 28 = 42 (học sinh).'
    },

    // 8. Vận dụng - Nhân có nhớ và tính giá trị biểu thức
    {
      id: 'as-t4-q8',
      cognitiveLevel: 'van_dung',
      topicAspect: 'Biểu thức kết hợp phép nhân và phép trừ',
      prompt: 'Giá trị của biểu thức 26 x 3 - 38 là:',
      options: [
        { id: 'a', label: '40', isCorrect: true },
        { id: 'b', label: '30', isCorrect: false },
        { id: 'c', label: '50', isCorrect: false },
        { id: 'd', label: '48', isCorrect: false }
      ],
      correctAnswer: '40',
      explanation: 'Bước 1: 26 x 3 = 78 (3 x 6 = 18 viết 8 nhớ 1; 3 x 2 = 6 thêm 1 = 7). Bước 2: 78 - 38 = 40.'
    },

    // 9. Vận dụng cao - Bài toán xếp thuyền chia có dư thực tế
    {
      id: 'as-t4-q9',
      cognitiveLevel: 'van_dung_cao',
      topicAspect: 'Ứng dụng số dư vào bài toán thực tế',
      prompt: 'Một đoàn khách du lịch có 31 người muốn qua sông. Mỗi chuyến thuyền chỉ chở được nhiều nhất 4 người (kể cả người lái thuyền). Hỏi cần ít nhất bao nhiêu chuyến thuyền để chở hết đoàn khách qua sông?',
      options: [
        { id: 'a', label: '11 chuyến thuyền', isCorrect: true },
        { id: 'b', label: '8 chuyến thuyền', isCorrect: false },
        { id: 'c', label: '10 chuyến thuyền', isCorrect: false },
        { id: 'd', label: '7 chuyến thuyền', isCorrect: false }
      ],
      correctAnswer: '11 chuyến thuyền',
      explanation: 'Cực kỳ tinh ý: Mỗi chuyến chở nhiều nhất 4 người (kể cả lái thuyền), vậy mỗi chuyến chỉ chở được 4 - 1 = 3 khách du lịch! Ta có: 31 : 3 = 10 (dư 1 khách). 1 khách còn lại vẫn cần 1 chuyến thuyền nữa. Vậy cần ít nhất: 10 + 1 = 11 chuyến thuyền!'
    },

    // 10. Vận dụng cao - Tìm số ban đầu từ dữ kiện đảo ngược
    {
      id: 'as-t4-q10',
      cognitiveLevel: 'van_dung_cao',
      topicAspect: 'Tư duy đại số sơ cấp và tính ngược',
      prompt: 'Bác Ba nghĩ ra một số. Bác lấy số đó GẤP lên 3 lần, rồi lại GIẢM kết quả đi 2 lần thì được 18. Hỏi số bác Ba nghĩ ra ban đầu là số nào?',
      options: [
        { id: 'a', label: '12', isCorrect: true },
        { id: 'b', label: '16', isCorrect: false },
        { id: 'c', label: '9', isCorrect: false },
        { id: 'd', label: '24', isCorrect: false }
      ],
      correctAnswer: '12',
      explanation: 'Tư duy tính ngược từ cuối lên: Trước khi giảm 2 lần được 18 thì số đó là: 18 x 2 = 36. Trước khi gấp 3 lần được 36 thì số ban đầu bác Ba nghĩ ra là: 36 : 3 = 12. Thử lại: 12 x 3 = 36; 36 : 2 = 18 (chuẩn xác 100%)!'
    }
  ]
};
