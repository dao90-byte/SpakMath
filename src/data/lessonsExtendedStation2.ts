import { LessonQuestion, ABBY, BENNY, CASEY, MAYLE, topicName } from './lessonTypes';

export const EXTENDED_VOLUME_LESSONS: LessonQuestion[] = [
  {
    id: 'vol-22',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'San Sẻ 3 Bình Nước: Đưa Về Cân Bằng Đồng Loạt',
    badgeTitle: 'Bài 22 · Độ khó Cấp 10',
    instruction: 'Có 3 bình nước A, B, C chứa lần lượt 24L, 18L và 12L. Hãy phân tích sơ đồ đoạn thẳng để tìm lượng nước cần chuyển nhằm đưa cả 3 bình về mức bằng nhau.',
    hint: 'Tổng lượng nước: 24 + 18 + 12 = 54L. Chia đều cho 3 bình: 54 : 3 = 18L.',
    mascot: { ...ABBY, message: 'Bình B đã có sẵn 18L rồi kìa! Chỉ cần chuyển nước từ Bình A sang Bình C thôi!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bình A (24L)', lengthVal: 24, display: '24 Lít', color: '#0284c7' },
        { label: 'Bình B (18L)', lengthVal: 18, display: '18 Lít', color: '#0d9488' },
        { label: 'Bình C (12L)', lengthVal: 12, display: '12 Lít', color: '#ea580c' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng lượng nước của cả 3 bình A, B, C là bao nhiêu lít?',
          options: ['48 lít', '50 lít', '54 lít', '60 lít'],
          correctAnswer: '54 lít'
        },
        {
          id: 'q2',
          prompt: 'Khi chia đều để cả 3 bình bằng nhau, mỗi bình sẽ có bao nhiêu lít nước?',
          options: ['16 lít', '18 lít', '20 lít', '22 lít'],
          correctAnswer: '18 lít'
        },
        {
          id: 'q3',
          prompt: 'Cần rót bao nhiêu lít nước từ Bình A sang Bình C để cả 3 bình bằng nhau?',
          options: ['4 lít', '5 lít', '6 lít', '8 lít'],
          correctAnswer: '6 lít'
        }
      ]
    }
  },
  {
    id: 'vol-23',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thí Nghiệm Archimedes Bậc Cao: Hai Khối Kim Loại Chìm',
    badgeTitle: 'Bài 23 · Độ khó Cấp 11',
    instruction: 'Quan sát mực nước dâng lên trong bình đo khi lần lượt thả khối đồng hình cầu và khối sắt hình lập phương vào bình.',
    hint: 'Khối đồng làm nước dâng từ 4L lên 6L (dâng 2L). Khối sắt làm nước dâng từ 6L lên 9L (dâng 3L).',
    mascot: { ...ABBY, message: 'Thể tích nước dâng lên bằng đúng thể tích vật chìm chiếm chỗ!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'b1', label: 'Nước Ban Đầu', levelPercent: 40, color: '#38bdf8', subLabel: '4 Lít' },
        { id: 'b2', label: 'Thả Khối Đồng', levelPercent: 60, color: '#f59e0b', subLabel: '6 Lít (+Đồng)' },
        { id: 'b3', label: 'Thả Thêm Khối Sắt', levelPercent: 90, color: '#64748b', subLabel: '9 Lít (+Sắt)' },
        { id: 'b4', label: 'Dung Tích Ca', levelPercent: 100, color: '#e2e8f0', subLabel: '10 Lít (Đầy)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thể tích của khối đồng hình cầu là bao nhiêu lít?',
          options: ['1 lít', '2 lít', '3 lít', '4 lít'],
          correctAnswer: '2 lít'
        },
        {
          id: 'q2',
          prompt: 'Thể tích của khối sắt hình lập phương là bao nhiêu lít?',
          options: ['2 lít', '3 lít', '4 lít', '5 lít'],
          correctAnswer: '3 lít'
        },
        {
          id: 'q3',
          prompt: 'Cả hai khối kim loại chiếm chỗ tổng cộng bao nhiêu lít nước?',
          options: ['4 lít', '5 lít', '6 lít', '7 lít'],
          correctAnswer: '5 lít'
        }
      ]
    }
  },
  {
    id: 'vol-24',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bài Toán Vòi Chảy Ngược Chiều: Bơm Vào Và Thoát Nước',
    badgeTitle: 'Bài 24 · Độ khó Cấp 12',
    instruction: 'Một bể nước dung tích 60L có vòi bơm vào 8L mỗi phút, đồng thời đáy bể có van xả thoát 3L mỗi phút. Tính thời gian để bể đầy.',
    hint: 'Lưu lượng thực tăng mỗi phút: 8 - 3 = 5L/phút. Thời gian đầy bể: 60 : 5 = 12 phút.',
    mascot: { ...MAYLE, message: 'Bài toán lưu lượng ròng rất quan trọng trong đời sống thực tế đấy em!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Vòi Bơm Vào (1 phút)', lengthVal: 8, display: '+8 Lít/phút', color: '#0284c7' },
        { label: 'Lỗ Thoát Nước (1 phút)', lengthVal: 3, display: '-3 Lít/phút', color: '#ef4444' },
        { label: 'Lưu Lượng Thực Tăng', lengthVal: 5, display: '5 Lít/phút', color: '#10b981' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Sau mỗi 1 phút mở đồng thời cả hai vòi, lượng nước trong bể tăng thêm bao nhiêu lít?',
          options: ['3 lít', '4 lít', '5 lít', '6 lít'],
          correctAnswer: '5 lít'
        },
        {
          id: 'q2',
          prompt: 'Bể có dung tích 60 lít. Cần bao nhiêu phút để bể từ rỗng trở nên đầy tràn?',
          options: ['10 phút', '12 phút', '15 phút', '20 phút'],
          correctAnswer: '12 phút'
        },
        {
          id: 'q3',
          prompt: 'Sau 7 phút mở cả hai vòi, trong bể tích lũy được bao nhiêu lít nước?',
          options: ['30 lít', '35 lít', '40 lít', '45 lít'],
          correctAnswer: '35 lít'
        }
      ]
    }
  },
  {
    id: 'vol-25',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Đoạn Thẳng Tổng - Hiệu: Hai Thùng Nước Cỡ Đại',
    badgeTitle: 'Bài 25 · Độ khó Cấp 13',
    instruction: 'Hai thùng nước chứa tổng cộng 48 lít. Thùng lớn chứa nhiều hơn thùng bé 14 lít. Vận dụng phương pháp Tổng - Hiệu để tìm dung tích mỗi thùng.',
    hint: 'Số bé = (Tổng - Hiệu) : 2 = (48 - 14) : 2 = 17L. Số lớn = 17 + 14 = 31L.',
    mascot: { ...ABBY, message: 'Nhớ bí kíp: Cắt bỏ phần chênh lệch thì hai phần sẽ bằng nhau!' },
    activity: {
      type: 'barModel',
      bars: [
        {
          label: 'Thùng Lớn (31L)',
          lengthVal: 31,
          display: '31 Lít',
          parts: [
            { val: 17, label: 'Phần Bằng Thùng Bé (17L)' },
            { val: 14, label: 'Phần Hơn (14L)' }
          ],
          color: '#3b82f6'
        },
        { label: 'Thùng Bé (17L)', lengthVal: 17, display: '17 Lít', color: '#06b6d4' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thùng bé chứa được bao nhiêu lít nước?',
          options: ['15 lít', '16 lít', '17 lít', '18 lít'],
          correctAnswer: '17 lít'
        },
        {
          id: 'q2',
          prompt: 'Thùng lớn chứa được bao nhiêu lít nước?',
          options: ['29 lít', '31 lít', '33 lít', '35 lít'],
          correctAnswer: '31 lít'
        },
        {
          id: 'q3',
          prompt: 'Muốn hai thùng bằng nhau thì phải múc từ thùng lớn sang thùng bé mấy lít?',
          options: ['5 lít', '6 lít', '7 lít', '8 lít'],
          correctAnswer: '7 lít'
        }
      ]
    }
  },
  {
    id: 'vol-26',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bài Toán Rót Sang Rồi Rót Lại: Bảo Toàn Dung Tích Đảo Chiều',
    badgeTitle: 'Bài 26 · Độ khó Cấp 14',
    instruction: 'Can 1 có 20L, Can 2 có 15L. Lần 1: Rót 5L từ Can 1 sang Can 2. Lần 2: Rót 3L từ Can 2 ngược lại Can 1. Tính lượng nước cuối cùng.',
    hint: 'Tổng luôn không đổi = 20 + 15 = 35L. Lần 1: Can 1 còn 15L, Can 2 có 20L. Lần 2: Can 1 có 18L, Can 2 có 17L.',
    mascot: { ...MAYLE, message: 'Dù rót qua rót lại bao nhiêu lần, tổng thể tích chất lỏng vẫn được bảo toàn nguyên vẹn!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Can 1 Ban Đầu', lengthVal: 20, display: '20 Lít', color: '#0284c7' },
        { label: 'Can 2 Ban Đầu', lengthVal: 15, display: '15 Lít', color: '#f59e0b' },
        { label: 'Can 1 Sau 2 Lần Rót', lengthVal: 18, display: '18 Lít', color: '#0d9488' },
        { label: 'Can 2 Sau 2 Lần Rót', lengthVal: 17, display: '17 Lít', color: '#d97706' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Sau Lần 1 (rót 5L từ Can 1 sang Can 2), Can 2 có bao nhiêu lít nước?',
          options: ['18 lít', '19 lít', '20 lít', '22 lít'],
          correctAnswer: '20 lít'
        },
        {
          id: 'q2',
          prompt: 'Sau Lần 2 (rót 3L từ Can 2 ngược về Can 1), Can 1 có bao nhiêu lít nước?',
          options: ['16 lít', '17 lít', '18 lít', '19 lít'],
          correctAnswer: '18 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng lượng nước của cả hai can sau cả hai lần rót là bao nhiêu lít?',
          options: ['32 lít', '34 lít', '35 lít', '36 lít'],
          correctAnswer: '35 lít'
        }
      ]
    }
  },
  {
    id: 'vol-27',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bể Nước Hình Bậc Thang: Thể Tích Đa Khoang',
    badgeTitle: 'Bài 27 · Độ khó Cấp 15',
    instruction: 'Một hệ thống bể nước gồm 4 khoang bậc thang chứa lần lượt 15L, 25L, 35L và 45L. Tìm quy luật tăng dần và tổng dung tích.',
    hint: 'Khoảng cách giữa các khoang: 25 - 15 = 10L. Tổng: 15 + 25 + 35 + 45 = 120L.',
    mascot: { ...ABBY, message: 'Dãy số cách đều 10L giúp việc tính tổng cực kỳ nhanh chóng!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'step1', label: 'Khoang Bậc 1', levelPercent: 30, color: '#38bdf8', subLabel: '15 Lít' },
        { id: 'step2', label: 'Khoang Bậc 2', levelPercent: 50, color: '#0ea5e9', subLabel: '25 Lít' },
        { id: 'step3', label: 'Khoang Bậc 3', levelPercent: 70, color: '#0284c7', subLabel: '35 Lít' },
        { id: 'step4', label: 'Khoang Bậc 4', levelPercent: 90, color: '#0369a1', subLabel: '45 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Mỗi khoang bậc thang kế tiếp chứa nhiều hơn khoang trước đó bao nhiêu lít nước?',
          options: ['8 lít', '10 lít', '12 lít', '15 lít'],
          correctAnswer: '10 lít'
        },
        {
          id: 'q2',
          prompt: 'Hai khoang cao nhất (Khoang 3 và 4) chứa tổng cộng bao nhiêu lít nước?',
          options: ['70 lít', '75 lít', '80 lít', '85 lít'],
          correctAnswer: '80 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng lượng nước của cả 4 khoang bậc thang là bao nhiêu lít?',
          options: ['110 lít', '115 lít', '120 lít', '130 lít'],
          correctAnswer: '120 lít'
        }
      ]
    }
  },
  {
    id: 'vol-28',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Đoạn Thẳng Tổng - Tỉ: Bình Nước Gấp 3 Lần',
    badgeTitle: 'Bài 28 · Độ khó Cấp 16',
    instruction: 'Bể A và Bể B chứa tổng cộng 36 lít nước. Lượng nước ở Bể A gấp 3 lần lượng nước ở Bể B. Dùng sơ đồ đoạn thẳng để tìm lượng nước mỗi bể.',
    hint: 'Bể B là 1 phần, Bể A là 3 phần. Tổng: 1 + 3 = 4 phần. 1 phần = 36 : 4 = 9L. Bể A = 9 × 3 = 27L.',
    mascot: { ...MAYLE, message: 'Dạng toán Tổng - Tỉ: Hãy vẽ đoạn thẳng biểu diễn số phần bằng nhau nhé!' },
    activity: {
      type: 'barModel',
      bars: [
        {
          label: 'Bể A (Gấp 3 lần Bể B)',
          lengthVal: 27,
          display: '27 Lít (3 Phần)',
          parts: [
            { val: 9, label: 'Phần 1 (9L)' },
            { val: 9, label: 'Phần 2 (9L)' },
            { val: 9, label: 'Phần 3 (9L)' }
          ],
          color: '#8b5cf6'
        },
        { label: 'Bể B (1 Phần)', lengthVal: 9, display: '9 Lít (1 Phần)', color: '#ec4899' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng số phần bằng nhau của cả hai bể là bao nhiêu phần?',
          options: ['2 phần', '3 phần', '4 phần', '5 phần'],
          correctAnswer: '4 phần'
        },
        {
          id: 'q2',
          prompt: 'Lượng nước chứa trong Bể B là bao nhiêu lít?',
          options: ['8 lít', '9 lít', '10 lít', '12 lít'],
          correctAnswer: '9 lít'
        },
        {
          id: 'q3',
          prompt: 'Lượng nước chứa trong Bể A là bao nhiêu lít?',
          options: ['24 lít', '25 lít', '27 lít', '30 lít'],
          correctAnswer: '27 lít'
        }
      ]
    }
  },
  {
    id: 'vol-29',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Hệ Thống Ba Vòi Nước Hiệp Đồng: Thời Gian Đổ Đầy Bể 90L',
    badgeTitle: 'Bài 29 · Độ khó Cấp 17',
    instruction: 'Ba vòi nước cùng chảy vào một bể rỗng dung tích 90 lít. Vòi 1 chảy 6L/phút, Vòi 2 chảy 5L/phút, Vòi 3 chảy 4L/phút.',
    hint: 'Cả 3 vòi chảy 1 phút: 6 + 5 + 4 = 15L. Thời gian đầy bể: 90 : 15 = 6 phút.',
    mascot: { ...ABBY, message: 'Hiệp đồng sức mạnh 3 vòi nước sẽ giúp bể đầy trong chớp mắt!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Vòi 1 (6L/phút)', lengthVal: 6, display: '6 Lít/phút', color: '#0ea5e9' },
        { label: 'Vòi 2 (5L/phút)', lengthVal: 5, display: '5 Lít/phút', color: '#38bdf8' },
        { label: 'Vòi 3 (4L/phút)', lengthVal: 4, display: '4 Lít/phút', color: '#7dd3fc' },
        { label: 'Tổng 3 Vòi (15L/phút)', lengthVal: 15, display: '15 Lít/phút', color: '#10b981' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Trong 1 phút, cả 3 vòi cùng chảy được bao nhiêu lít nước vào bể?',
          options: ['12 lít', '14 lít', '15 lít', '16 lít'],
          correctAnswer: '15 lít'
        },
        {
          id: 'q2',
          prompt: 'Cần bao nhiêu phút để cả 3 vòi cùng chảy đầy bể nước 90 lít?',
          options: ['5 phút', '6 phút', '7 phút', '8 phút'],
          correctAnswer: '6 phút'
        },
        {
          id: 'q3',
          prompt: 'Sau 4 phút cùng chảy, trong bể còn thiếu bao nhiêu lít nữa thì đầy 90 lít?',
          options: ['20 lít', '25 lít', '30 lít', '35 lít'],
          correctAnswer: '30 lít'
        }
      ]
    }
  },
  {
    id: 'vol-30',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đo Thể Tích Vật Thể Kép: Hai Viên Bi Thép Cùng Kích Thước',
    badgeTitle: 'Bài 30 · Độ khó Cấp 18',
    instruction: 'Bình đo có sẵn 12L nước. Khi thả 1 viên bi thép, nước dâng lên 16L. Thả tiếp viên bi thứ hai giống hệt, rồi thả khối đồng 6L.',
    hint: '1 viên bi = 16 - 12 = 4L. Hai viên bi = 8L. Khối đồng = 6L. Mực nước cuối cùng = 12 + 8 + 6 = 26L.',
    mascot: { ...MAYLE, message: 'Phép đo gián tiếp qua mực nước dâng là nguyên lý vàng của các nhà khoa học!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'step0', label: 'Ban Đầu (12L)', levelPercent: 40, color: '#38bdf8', subLabel: '12 Lít' },
        { id: 'step1', label: '+ 1 Viên Bi (16L)', levelPercent: 55, color: '#64748b', subLabel: '16 Lít (+4L)' },
        { id: 'step2', label: '+ 2 Viên Bi (20L)', levelPercent: 70, color: '#475569', subLabel: '20 Lít (+8L)' },
        { id: 'step3', label: '+ Khối Đồng (26L)', levelPercent: 90, color: '#f59e0b', subLabel: '26 Lít (+14L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thể tích của MỘT viên bi thép là bao nhiêu lít?',
          options: ['3 lít', '4 lít', '5 lít', '6 lít'],
          correctAnswer: '4 lít'
        },
        {
          id: 'q2',
          prompt: 'Thể tích của khối đồng thả sau cùng là bao nhiêu lít?',
          options: ['5 lít', '6 lít', '7 lít', '8 lít'],
          correctAnswer: '6 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng thể tích của cả 2 viên bi thép và khối đồng chiếm chỗ là bao nhiêu lít?',
          options: ['12 lít', '14 lít', '15 lít', '16 lít'],
          correctAnswer: '14 lít'
        }
      ]
    }
  },
  {
    id: 'vol-31',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'ĐẠI THỬ THÁCH TỐI THƯỢNG TRẠM 2: Tháp Nước Hoàng Gia 4 Tầng',
    badgeTitle: 'Bài 31 · Thử Thách Tối Thượng Mở Rộng',
    instruction: 'Bốn bể nước A, B, C, D trên tháp nước hoàng gia có lượng nước là 34L, 28L, 22L và 16L. Tính lượng nước cân bằng khi mở van liên thông.',
    hint: 'Tổng nước: 34 + 28 + 22 + 16 = 100L. Chia đều cho 4 bể: 100 : 4 = 25L.',
    mascot: { ...ABBY, message: 'Thử thách đỉnh cao của Trạm Nước! Hãy tính toán cẩn thận để đạt trạng thái cân bằng tuyệt đối!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể A (34L)', lengthVal: 34, display: '34 Lít', color: '#0284c7' },
        { label: 'Bể B (28L)', lengthVal: 28, display: '28 Lít', color: '#0ea5e9' },
        { label: 'Bể C (22L)', lengthVal: 22, display: '22 Lít', color: '#38bdf8' },
        { label: 'Bể D (16L)', lengthVal: 16, display: '16 Lít', color: '#7dd3fc' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng lượng nước của cả 4 bể trong hệ thống tháp nước là bao nhiêu lít?',
          options: ['90 lít', '95 lít', '100 lít', '105 lít'],
          correctAnswer: '100 lít'
        },
        {
          id: 'q2',
          prompt: 'Khi mở van liên thông để 4 bể đạt trạng thái cân bằng hoàn hảo, mỗi bể có bao nhiêu lít nước?',
          options: ['20 lít', '22 lít', '25 lít', '26 lít'],
          correctAnswer: '25 lít'
        },
        {
          id: 'q3',
          prompt: 'Bể A (đang có 34L) cần san sẻ bao nhiêu lít nước sang các bể khác để về mức 25L?',
          options: ['7 lít', '8 lít', '9 lít', '10 lít'],
          correctAnswer: '9 lít'
        }
      ]
    }
  },
  {
    id: 'vol-32',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đo Thể Tích Ba Viên Đá Thạch Anh Dâng Nước Liên Tiếp',
    badgeTitle: 'Bài 32 · Độ khó Cấp 19',
    instruction: 'Ống đong thí nghiệm có sẵn 15L nước. Thả viên đá 1 nước dâng lên 20L. Thả tiếp viên đá 2 nước dâng lên 28L. Thả tiếp viên đá 3 nước dâng lên 40L.',
    hint: 'Viên 1: 20 - 15 = 5L. Viên 2: 28 - 20 = 8L. Viên 3: 40 - 28 = 12L. Tổng thể tích 3 viên: 5 + 8 + 12 = 25L.',
    mascot: { ...MAYLE, message: 'Quan sát từng mức nước dâng để tìm chính xác thể tích từng viên đá nhé!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'v0', label: 'Ban Đầu (15L)', levelPercent: 35, color: '#38bdf8', subLabel: '15 Lít' },
        { id: 'v1', label: '+ Đá Thạch Anh 1', levelPercent: 48, color: '#0ea5e9', subLabel: '20 Lít (+5L)' },
        { id: 'v2', label: '+ Đá Thạch Anh 2', levelPercent: 68, color: '#6366f1', subLabel: '28 Lít (+8L)' },
        { id: 'v3', label: '+ Đá Thạch Anh 3', levelPercent: 95, color: '#a855f7', subLabel: '40 Lít (+12L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thể tích của viên đá thạch anh thứ hai là bao nhiêu lít?',
          options: ['6 lít', '7 lít', '8 lít', '9 lít'],
          correctAnswer: '8 lít'
        },
        {
          id: 'q2',
          prompt: 'Viên đá thứ ba lớn hơn viên đá thứ nhất bao nhiêu lít?',
          options: ['5 lít', '7 lít', '8 lít', '10 lít'],
          correctAnswer: '7 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng thể tích của cả 3 viên đá thạch anh chiếm chỗ là bao nhiêu lít?',
          options: ['20 lít', '23 lít', '25 lít', '28 lít'],
          correctAnswer: '25 lít'
        }
      ]
    }
  },
  {
    id: 'vol-33',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Thanh: Ba Thùng Dầu Máy Nông Trường',
    badgeTitle: 'Bài 33 · Độ khó Cấp 20',
    instruction: 'Nông trường có 3 thùng dầu máy: Thùng B chứa 15L. Thùng A gấp 3 lần thùng B. Thùng C nhiều hơn thùng B 8L.',
    hint: 'Thùng B = 15L. Thùng A = 15 x 3 = 45L. Thùng C = 15 + 8 = 23L. Tổng cả 3 thùng = 15 + 45 + 23 = 83L.',
    mascot: { ...ABBY, message: 'Dùng sơ đồ thanh để nhìn rõ gấp lần và nhiều hơn đơn vị nhé!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Thùng B (Số Nhỏ)', lengthVal: 15, display: '15 Lít', color: '#10b981' },
        { label: 'Thùng A (Gấp 3 Lần B)', lengthVal: 45, display: '45 Lít', color: '#059669' },
        { label: 'Thùng C (B + 8 Lít)', lengthVal: 23, display: '23 Lít', color: '#34d399' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thùng A chứa được bao nhiêu lít dầu máy?',
          options: ['30 lít', '40 lít', '45 lít', '50 lít'],
          correctAnswer: '45 lít'
        },
        {
          id: 'q2',
          prompt: 'Thùng C chứa được bao nhiêu lít dầu máy?',
          options: ['21 lít', '23 lít', '25 lít', '28 lít'],
          correctAnswer: '23 lít'
        },
        {
          id: 'q3',
          prompt: 'Cả ba thùng dầu máy có tất cả bao nhiêu lít dầu?',
          options: ['78 lít', '80 lít', '83 lít', '85 lít'],
          correctAnswer: '83 lít'
        }
      ]
    }
  },
  {
    id: 'vol-34',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'San Sẻ 4 Bể Nước Cân Bằng Hoàn Hảo (Tổng 120L)',
    badgeTitle: 'Bài 34 · Độ khó Cấp 21',
    instruction: 'Hệ thống 4 bể nước đang chứa: Bể A (42L), Bể B (34L), Bể C (26L), Bể D (18L). Tính mức nước khi mở van liên thông.',
    hint: 'Tổng lượng nước = 42 + 34 + 26 + 18 = 120L. Chia đều cho 4 bể: 120 : 4 = 30L mỗi bể.',
    mascot: { ...MAYLE, message: 'Nguyên lý bình thông nhau: Mực nước luôn tự tìm đến mức trung bình cân bằng!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể A (42L)', lengthVal: 42, display: '42 Lít', color: '#0369a1' },
        { label: 'Bể B (34L)', lengthVal: 34, display: '34 Lít', color: '#0284c7' },
        { label: 'Bể C (26L)', lengthVal: 26, display: '26 Lít', color: '#38bdf8' },
        { label: 'Bể D (18L)', lengthVal: 18, display: '18 Lít', color: '#93c5fd' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng thể tích nước trong cả 4 bể là bao nhiêu lít?',
          options: ['110 lít', '115 lít', '120 lít', '125 lít'],
          correctAnswer: '120 lít'
        },
        {
          id: 'q2',
          prompt: 'Khi van mở để nước cân bằng đều nhau, mỗi bể có bao nhiêu lít nước?',
          options: ['25 lít', '28 lít', '30 lít', '32 lít'],
          correctAnswer: '30 lít'
        },
        {
          id: 'q3',
          prompt: 'Bể A phải chuyển đi bao nhiêu lít nước để về mức cân bằng 30L?',
          options: ['10 lít', '12 lít', '14 lít', '16 lít'],
          correctAnswer: '12 lít'
        }
      ]
    }
  },
  {
    id: 'vol-35',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Đo Thể Tích Khối Kim Loại Đúc Đặc & Rỗng',
    badgeTitle: 'Bài 35 · Độ khó Cấp 22',
    instruction: 'Thùng đo có sẵn 20L nước. Thả khối cầu chì đặc, nước dâng lên 32L. Thả tiếp khối trụ đồng đặc, nước dâng lên 47L.',
    hint: 'Khối cầu chì: 32 - 20 = 12L. Khối trụ đồng: 47 - 32 = 15L. Tổng 2 khối: 12 + 15 = 27L.',
    mascot: { ...BENNY, message: 'Kim loại nặng chìm hoàn toàn trong nước, thể tích chiếm chỗ bằng độ dâng!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'w0', label: 'Mức Ban Đầu', levelPercent: 30, color: '#38bdf8', subLabel: '20 Lít' },
        { id: 'w1', label: '+ Quả Cầu Chì', levelPercent: 55, color: '#475569', subLabel: '32 Lít (+12L)' },
        { id: 'w2', label: '+ Khối Trụ Đồng', levelPercent: 85, color: '#d97706', subLabel: '47 Lít (+15L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thể tích của quả cầu chì là bao nhiêu lít?',
          options: ['10 lít', '12 lít', '14 lít', '16 lít'],
          correctAnswer: '12 lít'
        },
        {
          id: 'q2',
          prompt: 'Thể tích của khối trụ đồng là bao nhiêu lít?',
          options: ['13 lít', '15 lít', '17 lít', '19 lít'],
          correctAnswer: '15 lít'
        },
        {
          id: 'q3',
          prompt: 'Cả hai khối kim loại có tổng thể tích chiếm chỗ là bao nhiêu lít?',
          options: ['25 lít', '27 lít', '29 lít', '31 lít'],
          correctAnswer: '27 lít'
        }
      ]
    }
  },
  {
    id: 'vol-36',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Thanh Tỉ Lệ: Ba Bồn Cung Cấp Nước Sạch',
    badgeTitle: 'Bài 36 · Độ khó Cấp 23',
    instruction: 'Trạm cấp nước có 3 bồn: Bồn 1 chứa 20L. Bồn 2 gấp 2 lần bồn 1. Bồn 3 gấp 3 lần bồn 1. Tính tổng và chênh lệch.',
    hint: 'Bồn 1 = 20L. Bồn 2 = 20 x 2 = 40L. Bồn 3 = 20 x 3 = 60L. Tổng = 20 + 40 + 60 = 120L.',
    mascot: { ...ABBY, message: 'Mối quan hệ tỉ lệ 1 phần : 2 phần : 3 phần thật trực quan!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bồn 1 (1 phần)', lengthVal: 20, display: '20 Lít', color: '#06b6d4' },
        { label: 'Bồn 2 (2 phần)', lengthVal: 40, display: '40 Lít', color: '#0891b2' },
        { label: 'Bồn 3 (3 phần)', lengthVal: 60, display: '60 Lít', color: '#0e7490' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Bồn 2 chứa được bao nhiêu lít nước sạch?',
          options: ['30 lít', '35 lít', '40 lít', '45 lít'],
          correctAnswer: '40 lít'
        },
        {
          id: 'q2',
          prompt: 'Bồn 3 nhiều hơn Bồn 1 bao nhiêu lít nước?',
          options: ['30 lít', '35 lít', '40 lít', '45 lít'],
          correctAnswer: '40 lít'
        },
        {
          id: 'q3',
          prompt: 'Cả 3 bồn chứa tổng cộng bao nhiêu lít nước sạch?',
          options: ['100 lít', '110 lít', '120 lít', '130 lít'],
          correctAnswer: '120 lít'
        }
      ]
    }
  },
  {
    id: 'vol-37',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thí Nghiệm Archimedes: Bốn Viên Bi Sắt Đồng Nhất',
    badgeTitle: 'Bài 37 · Độ khó Cấp 24',
    instruction: 'Bình đo có sẵn 18L nước. Người ta thả lần lượt 4 viên bi sắt giống hệt nhau vào bình, mực nước dâng đều lên mức 34L.',
    hint: 'Tổng thể tích 4 viên bi sắt = 34 - 18 = 16L. Thể tích mỗi viên bi = 16 : 4 = 4L.',
    mascot: { ...MAYLE, message: 'Các vật giống hệt nhau sẽ làm nước dâng lên các khoảng bằng nhau!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'b0', label: 'Nước Ban Đầu (18L)', levelPercent: 35, color: '#38bdf8', subLabel: '18 Lít' },
        { id: 'b2', label: '+ 2 Viên Bi (26L)', levelPercent: 55, color: '#64748b', subLabel: '26 Lít (+8L)' },
        { id: 'b4', label: '+ 4 Viên Bi (34L)', levelPercent: 75, color: '#334155', subLabel: '34 Lít (+16L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng thể tích của cả 4 viên bi sắt chiếm chỗ là bao nhiêu lít?',
          options: ['12 lít', '14 lít', '16 lít', '18 lít'],
          correctAnswer: '16 lít'
        },
        {
          id: 'q2',
          prompt: 'Thể tích của MỘT viên bi sắt là bao nhiêu lít?',
          options: ['3 lít', '4 lít', '5 lít', '6 lít'],
          correctAnswer: '4 lít'
        },
        {
          id: 'q3',
          prompt: 'Nếu chỉ thả 3 viên bi sắt thì mực nước trong bình sẽ dâng lên mức bao nhiêu lít?',
          options: ['28 lít', '30 lít', '32 lít', '33 lít'],
          correctAnswer: '30 lít'
        }
      ]
    }
  },
  {
    id: 'vol-38',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Thanh Cấp Số Cộng 4 Thùng Nước Sinh Hoạt',
    badgeTitle: 'Bài 38 · Độ khó Cấp 25',
    instruction: 'Bốn thùng nước có lượng nước tăng đều theo khoảng cách 6L: Thùng 1 (12L), Thùng 2 (18L), Thùng 3 (24L), Thùng 4 (30L).',
    hint: 'Khoảng cách đều là 6L. Tổng 4 thùng: 12 + 18 + 24 + 30 = 84L. Trung bình = 84 : 4 = 21L.',
    mascot: { ...CASEY, message: 'Chuỗi số tăng đều tạo nên vẻ đẹp cân xứng tuyệt vời!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Thùng 1 (12L)', lengthVal: 12, display: '12 Lít', color: '#818cf8' },
        { label: 'Thùng 2 (18L)', lengthVal: 18, display: '18 Lít', color: '#6366f1' },
        { label: 'Thùng 3 (24L)', lengthVal: 24, display: '24 Lít', color: '#4f46e5' },
        { label: 'Thùng 4 (30L)', lengthVal: 30, display: '30 Lít', color: '#4338ca' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thùng 4 nhiều hơn Thùng 1 bao nhiêu lít nước?',
          options: ['12 lít', '16 lít', '18 lít', '20 lít'],
          correctAnswer: '18 lít'
        },
        {
          id: 'q2',
          prompt: 'Tổng lượng nước của cả 4 thùng là bao nhiêu lít?',
          options: ['78 lít', '82 lít', '84 lít', '88 lít'],
          correctAnswer: '84 lít'
        },
        {
          id: 'q3',
          prompt: 'Nếu san đều nước vào 4 thùng thì mỗi thùng có bao nhiêu lít?',
          options: ['20 lít', '21 lít', '22 lít', '23 lít'],
          correctAnswer: '21 lít'
        }
      ]
    }
  },
  {
    id: 'vol-39',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thử Thách Đong Nước Bằng Hai Can 9 Lít Và 4 Lít',
    badgeTitle: 'Bài 39 · Độ khó Cấp 26',
    instruction: 'Có một bể nước lớn và 2 can không có vạch chia dung tích là 9 lít và 4 lít. Hãy tính các lượng nước có thể đong chính xác.',
    hint: 'Đong đầy can 9L rồi rót sang can 4L: Can 9L còn lại: 9 - 4 = 5L. Rót tiếp sang can 4L lần nữa: còn lại 5 - 4 = 1L.',
    mascot: { ...MAYLE, message: 'Bài toán kinh điển của các nhà toán học cổ đại! Tư duy đong trừ linh hoạt!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'can9', label: 'Can Lớn (9L Đầy)', levelPercent: 90, color: '#0284c7', subLabel: '9 Lít' },
        { id: 'can4', label: 'Can Nhỏ (4L)', levelPercent: 40, color: '#38bdf8', subLabel: '4 Lít' },
        { id: 'left1', label: 'Sau Lần Rót 1', levelPercent: 50, color: '#f59e0b', subLabel: 'Còn 5 Lít' },
        { id: 'left2', label: 'Sau Lần Rót 2', levelPercent: 15, color: '#ef4444', subLabel: 'Còn 1 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Sau khi đong đầy can 9L rồi rót đầy can 4L, trong can lớn còn lại bao nhiêu lít nước?',
          options: ['4 lít', '5 lít', '6 lít', '7 lít'],
          correctAnswer: '5 lít'
        },
        {
          id: 'q2',
          prompt: 'Nếu tiếp tục đổ hết nước can 4L đi rồi rót tiếp từ can lớn sang cho đầy can 4L, thì can lớn còn lại bao nhiêu lít?',
          options: ['1 lít', '2 lít', '3 lít', '4 lít'],
          correctAnswer: '1 lít'
        },
        {
          id: 'q3',
          prompt: 'Để lấy được đúng 8 lít nước, ta cần đong đầy can 4 lít mấy lần?',
          options: ['1 lần', '2 lần', '3 lần', '4 lần'],
          correctAnswer: '2 lần'
        }
      ]
    }
  },
  {
    id: 'vol-40',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Tháp Lọc Nước Tinh Khiết 5 Tầng Hoàng Gia',
    badgeTitle: 'Bài 40 · Độ khó Cấp 27',
    instruction: 'Năm bể chứa A, B, C, D, E trên tháp lọc nước có dung tích: 50L, 40L, 30L, 20L, 10L. Tính tổng và mức cân bằng khi liên thông.',
    hint: 'Tổng lượng nước = 50 + 40 + 30 + 20 + 10 = 150L. San đều cho 5 bể: 150 : 5 = 30L mỗi bể.',
    mascot: { ...ABBY, message: 'Hệ thống lọc nước 5 tầng đồ sộ! Cùng Abby kiểm tra các chỉ số nhé!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể A (Tầng 5)', lengthVal: 50, display: '50 Lít', color: '#0369a1' },
        { label: 'Bể B (Tầng 4)', lengthVal: 40, display: '40 Lít', color: '#0284c7' },
        { label: 'Bể C (Tầng 3)', lengthVal: 30, display: '30 Lít', color: '#0ea5e9' },
        { label: 'Bể D (Tầng 2)', lengthVal: 20, display: '20 Lít', color: '#38bdf8' },
        { label: 'Bể E (Tầng 1)', lengthVal: 10, display: '10 Lít', color: '#7dd3fc' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng thể tích nước lọc trong cả 5 tầng tháp là bao nhiêu lít?',
          options: ['130 lít', '140 lít', '150 lít', '160 lít'],
          correctAnswer: '150 lít'
        },
        {
          id: 'q2',
          prompt: 'Khi mở van liên thông cả 5 bể, mỗi bể đạt trạng thái cân bằng ở mức bao nhiêu lít?',
          options: ['25 lít', '28 lít', '30 lít', '32 lít'],
          correctAnswer: '30 lít'
        },
        {
          id: 'q3',
          prompt: 'Bể A (đang có 50L) cần chuyển bớt bao nhiêu lít nước sang các bể khác?',
          options: ['15 lít', '20 lít', '25 lít', '30 lít'],
          correctAnswer: '20 lít'
        }
      ]
    }
  },
  {
    id: 'vol-41',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'SIÊU THỬ THÁCH THỦY ĐIỆN HOÀNG GIA TRẠM 2: Hệ Thống Hồ Chứa Cân Bằng Tuyệt Đối',
    badgeTitle: 'Bài 41 · Đỉnh Cao Trạm 2 Tuyệt Đối',
    instruction: 'Đại công trình thủy điện có 5 hồ chứa: Hồ 1 (55L), Hồ 2 (45L), Hồ 3 (35L), Hồ 4 (25L), Hồ 5 (15L). Tính toán dòng chảy điều tiết.',
    hint: 'Tổng dung tích: 55 + 45 + 35 + 25 + 15 = 175L. Chia đều cho 5 hồ: 175 : 5 = 35L mỗi hồ. Hồ 1 và Hồ 2 xả nước sang Hồ 4 và Hồ 5.',
    mascot: { ...MAYLE, message: 'Đỉnh cao điều tiết thủy văn của Trạm 2! Em chính thức đạt danh hiệu Kỹ Sư Trưởng Thủy Lực!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Hồ 1 (Đầu Nguồn)', lengthVal: 55, display: '55 Lít', color: '#1e3a8a' },
        { label: 'Hồ 2 (Bậc 2)', lengthVal: 45, display: '45 Lít', color: '#1d4ed8' },
        { label: 'Hồ 3 (Trung Tâm)', lengthVal: 35, display: '35 Lít', color: '#2563eb' },
        { label: 'Hồ 4 (Bậc 4)', lengthVal: 25, display: '25 Lít', color: '#3b82f6' },
        { label: 'Hồ 5 (Hạ Lưu)', lengthVal: 15, display: '15 Lít', color: '#60a5fa' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng thể tích nước trong cả 5 hồ chứa thủy điện là bao nhiêu lít?',
          options: ['165 lít', '170 lít', '175 lít', '180 lít'],
          correctAnswer: '175 lít'
        },
        {
          id: 'q2',
          prompt: 'Khi mở đập điều hòa để 5 hồ đạt mức nước cân bằng lý tưởng, mỗi hồ có bao nhiêu lít nước?',
          options: ['30 lít', '35 lít', '40 lít', '45 lít'],
          correctAnswer: '35 lít'
        },
        {
          id: 'q3',
          prompt: 'Hồ 1 (55L) cần xả về hạ lưu bao nhiêu lít nước để đạt mức an toàn 35L?',
          options: ['15 lít', '18 lít', '20 lít', '25 lít'],
          correctAnswer: '20 lít'
        }
      ]
    }
  },
  {
    id: 'vol-42',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thí Nghiệm Đo Thể Tích 3 Khối Khoáng Thạch Vũ Trụ',
    badgeTitle: 'Bài 42 · Độ khó Cấp 28',
    instruction: 'Bình đo thí nghiệm chứa sẵn 24L dung dịch. Thả Khối A mực nước dâng lên 32L. Thả tiếp Khối B dâng lên 45L. Thả tiếp Khối C dâng lên 60L.',
    hint: 'Khối A: 32 - 24 = 8L. Khối B: 45 - 32 = 13L. Khối C: 60 - 45 = 15L. Tổng 3 khối = 60 - 24 = 36L.',
    mascot: { ...MAYLE, message: 'Theo dõi từng bậc nước dâng để bóc tách chính xác thể tích mỗi khối khoáng thạch!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'm0', label: 'Ban Đầu (24L)', levelPercent: 35, color: '#38bdf8', subLabel: '24 Lít' },
        { id: 'm1', label: '+ Khối A (32L)', levelPercent: 50, color: '#0284c7', subLabel: '32 Lít (+8L)' },
        { id: 'm2', label: '+ Khối B (45L)', levelPercent: 72, color: '#6366f1', subLabel: '45 Lít (+13L)' },
        { id: 'm3', label: '+ Khối C (60L)', levelPercent: 95, color: '#9333ea', subLabel: '60 Lít (+15L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thể tích của Khối khoáng thạch B là bao nhiêu lít?',
          options: ['11 lít', '12 lít', '13 lít', '14 lít'],
          correctAnswer: '13 lít'
        },
        {
          id: 'q2',
          prompt: 'Khối C lớn hơn Khối A bao nhiêu lít?',
          options: ['5 lít', '6 lít', '7 lít', '8 lít'],
          correctAnswer: '7 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng thể tích cả 3 khối khoáng thạch A, B và C chiếm chỗ là bao nhiêu lít?',
          options: ['34 lít', '36 lít', '38 lít', '40 lít'],
          correctAnswer: '36 lít'
        }
      ]
    }
  },
  {
    id: 'vol-43',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Thanh 4 Bể Nhiên Liệu Tên Lửa Kết Hợp Gấp Lần & Cộng Thêm',
    badgeTitle: 'Bài 43 · Độ khó Cấp 29',
    instruction: 'Hệ thống phóng có 4 bể nhiên liệu: Bể 1 chứa 18L. Bể 2 gấp 2 lần Bể 1. Bể 3 nhiều hơn Bể 2 là 14L. Bể 4 gấp 3 lần Bể 1.',
    hint: 'Bể 1 = 18L. Bể 2 = 18 x 2 = 36L. Bể 3 = 36 + 14 = 50L. Bể 4 = 18 x 3 = 54L. Tổng = 18 + 36 + 50 + 54 = 158L.',
    mascot: { ...ABBY, message: 'Kết hợp phép nhân gấp lần và phép cộng hơn đơn vị trên sơ đồ thanh!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể 1 (Gốc)', lengthVal: 18, display: '18 Lít', color: '#0284c7' },
        { label: 'Bể 2 (Gấp 2 Bể 1)', lengthVal: 36, display: '36 Lít', color: '#0ea5e9' },
        { label: 'Bể 3 (Bể 2 + 14L)', lengthVal: 50, display: '50 Lít', color: '#f59e0b' },
        { label: 'Bể 4 (Gấp 3 Bể 1)', lengthVal: 54, display: '54 Lít', color: '#10b981' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Bể 3 chứa được bao nhiêu lít nhiên liệu?',
          options: ['46 lít', '48 lít', '50 lít', '52 lít'],
          correctAnswer: '50 lít'
        },
        {
          id: 'q2',
          prompt: 'Bể 4 chứa nhiều hơn Bể 1 bao nhiêu lít nhiên liệu?',
          options: ['32 lít', '34 lít', '36 lít', '38 lít'],
          correctAnswer: '36 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng lượng nhiên liệu trong cả 4 bể là bao nhiêu lít?',
          options: ['148 lít', '154 lít', '158 lít', '162 lít'],
          correctAnswer: '158 lít'
        }
      ]
    }
  },
  {
    id: 'vol-44',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'San Sẻ 5 Bình Nước Lớn Về Trạng Thái Cân Bằng 46 Lít',
    badgeTitle: 'Bài 44 · Độ khó Cấp 30',
    instruction: 'Năm bình nước có dung tích giảm đều nhau 12L: Bình 1 (70L), Bình 2 (58L), Bình 3 (46L), Bình 4 (34L), Bình 5 (22L). Tính mức cân bằng.',
    hint: 'Tổng thể tích = 70 + 58 + 46 + 34 + 22 = 230L. Chia đều cho 5 bình = 46L mỗi bình (đúng bằng Bình 3 ở giữa!).',
    mascot: { ...MAYLE, message: 'Mẹo toán tư duy: Với dãy số cách đều có 5 số, trung bình cộng chính là số ở chính giữa!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bình 1 (70L)', lengthVal: 70, display: '70 Lít', color: '#1d4ed8' },
        { label: 'Bình 2 (58L)', lengthVal: 58, display: '58 Lít', color: '#2563eb' },
        { label: 'Bình 3 (46L)', lengthVal: 46, display: '46 Lít', color: '#3b82f6' },
        { label: 'Bình 4 (34L)', lengthVal: 34, display: '34 Lít', color: '#60a5fa' },
        { label: 'Bình 5 (22L)', lengthVal: 22, display: '22 Lít', color: '#93c5fd' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng lượng nước chứa trong cả 5 bình là bao nhiêu lít?',
          options: ['210 lít', '220 lít', '230 lít', '240 lít'],
          correctAnswer: '230 lít'
        },
        {
          id: 'q2',
          prompt: 'Sau khi san đều cho cả 5 bình bằng nhau, mỗi bình có bao nhiêu lít nước?',
          options: ['44 lít', '46 lít', '48 lít', '50 lít'],
          correctAnswer: '46 lít'
        },
        {
          id: 'q3',
          prompt: 'Bình 1 (70L) phải chuyển đi bao nhiêu lít nước để bằng mức trung bình 46L?',
          options: ['20 lít', '22 lít', '24 lít', '26 lít'],
          correctAnswer: '24 lít'
        }
      ]
    }
  },
  {
    id: 'vol-45',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Thí Nghiệm Năm Khối Cầu Hợp Kim Đồng Nhất',
    badgeTitle: 'Bài 45 · Độ khó Cấp 31',
    instruction: 'Bình thí nghiệm ban đầu chứa 25L nước. Khi thả 5 khối cầu hợp kim giống hệt nhau vào, mực nước dâng lên đúng mức 65L.',
    hint: 'Tổng thể tích 5 khối cầu = 65 - 25 = 40L. Mỗi khối cầu = 40 : 5 = 8L. Nếu chỉ thả 3 khối cầu thì nước dâng thêm 3 x 8 = 24L.',
    mascot: { ...BENNY, message: 'Tìm thể tích 1 khối cầu trước, sau đó dễ dàng suy ra mực nước với bất kỳ số lượng nào!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'c0', label: 'Ban Đầu (25L)', levelPercent: 35, color: '#38bdf8', subLabel: '25 Lít' },
        { id: 'c3', label: '+ 3 Khối Cầu', levelPercent: 70, color: '#64748b', subLabel: '49 Lít (+24L)' },
        { id: 'c5', label: '+ 5 Khối Cầu (65L)', levelPercent: 95, color: '#334155', subLabel: '65 Lít (+40L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng thể tích của cả 5 khối cầu hợp kim là bao nhiêu lít?',
          options: ['35 lít', '40 lít', '45 lít', '50 lít'],
          correctAnswer: '40 lít'
        },
        {
          id: 'q2',
          prompt: 'Thể tích của MỘT khối cầu hợp kim là bao nhiêu lít?',
          options: ['6 lít', '7 lít', '8 lít', '9 lít'],
          correctAnswer: '8 lít'
        },
        {
          id: 'q3',
          prompt: 'Nếu chỉ thả 3 khối cầu hợp kim vào bình 25L ban đầu thì nước dâng lên mức bao nhiêu lít?',
          options: ['47 lít', '49 lít', '51 lít', '53 lít'],
          correctAnswer: '49 lít'
        }
      ]
    }
  },
  {
    id: 'vol-46',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Bài Toán Tính Ngược: San Sẻ Ba Bể Nước Có Tổng 150 Lít',
    badgeTitle: 'Bài 46 · Độ khó Cấp 32',
    instruction: 'Có 3 bể A, B, C chứa tổng cộng 150L nước. Nếu rót từ bể A sang bể B 12L và rót từ bể A sang bể C 8L thì cả 3 bể đều bằng nhau.',
    hint: 'Khi bằng nhau mỗi bể có: 150 : 3 = 50L. Trước khi nhận 12L, bể B có: 50 - 12 = 38L. Lúc đầu bể A cho đi 12 + 8 = 20L nên ban đầu A có 50 + 20 = 70L.',
    mascot: { ...MAYLE, message: 'Tư duy tính ngược từ trạng thái cân bằng cuối cùng trở về lúc ban đầu!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bể A (Lúc đầu)', lengthVal: 70, display: '70 Lít', color: '#0284c7' },
        { label: 'Bể B (Lúc đầu)', lengthVal: 38, display: '38 Lít', color: '#10b981' },
        { label: 'Bể C (Lúc đầu)', lengthVal: 42, display: '42 Lít', color: '#f59e0b' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Sau khi rót chuyển xong và 3 bể bằng nhau, mỗi bể chứa bao nhiêu lít nước?',
          options: ['45 lít', '50 lít', '55 lít', '60 lít'],
          correctAnswer: '50 lít'
        },
        {
          id: 'q2',
          prompt: 'Lúc đầu trước khi nhận thêm 12L, bể B có bao nhiêu lít nước?',
          options: ['36 lít', '38 lít', '40 lít', '42 lít'],
          correctAnswer: '38 lít'
        },
        {
          id: 'q3',
          prompt: 'Lúc đầu trước khi rót cho hai bể kia, bể A có bao nhiêu lít nước?',
          options: ['62 lít', '68 lít', '70 lít', '72 lít'],
          correctAnswer: '70 lít'
        }
      ]
    }
  },
  {
    id: 'vol-47',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Nghệ Thuật Đong Nước Bằng Hai Can 11 Lít Và 5 Lít',
    badgeTitle: 'Bài 47 · Độ khó Cấp 33',
    instruction: 'Với hai chiếc can rỗng dung tích 11 lít và 5 lít cùng nguồn nước dồi dào, hãy thực hiện các bước đong trừ để lấy lượng nước chính xác.',
    hint: 'Đong đầy can 11L rót sang can 5L -> can 11L còn 6L. Đổ bỏ can 5L rồi rót tiếp từ 6L sang can 5L -> còn lại đúng 1L!',
    mascot: { ...CASEY, message: 'Kết hợp phép trừ lặp liên tiếp để tạo ra đúng số lít mong muốn!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'd11', label: 'Can Lớn (11L)', levelPercent: 95, color: '#0284c7', subLabel: '11 Lít' },
        { id: 'd5', label: 'Can Nhỏ (5L)', levelPercent: 45, color: '#38bdf8', subLabel: '5 Lít' },
        { id: 'r1', label: 'Sau Rót Lần 1', levelPercent: 55, color: '#f59e0b', subLabel: 'Còn 6 Lít' },
        { id: 'r2', label: 'Sau Rót Lần 2', levelPercent: 12, color: '#ef4444', subLabel: 'Còn 1 Lít' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Đong đầy can 11L rồi rót đầy can 5L, trong can 11L còn lại bao nhiêu lít?',
          options: ['5 lít', '6 lít', '7 lít', '8 lít'],
          correctAnswer: '6 lít'
        },
        {
          id: 'q2',
          prompt: 'Đổ hết nước trong can 5L đi, sau đó rót tiếp từ 6L trong can lớn sang cho đầy can 5L thì can lớn còn mấy lít?',
          options: ['1 lít', '2 lít', '3 lít', '4 lít'],
          correctAnswer: '1 lít'
        },
        {
          id: 'q3',
          prompt: 'Để lấy được đúng 10 lít nước nhanh nhất, ta cần đong đầy can 5 lít mấy lần?',
          options: ['1 lần', '2 lần', '3 lần', '4 lần'],
          correctAnswer: '2 lần'
        }
      ]
    }
  },
  {
    id: 'vol-48',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Hệ Thống 5 Bồn Nước Tưới Tiêu Tăng Đều Công Sai 9 Lít',
    badgeTitle: 'Bài 48 · Độ khó Cấp 34',
    instruction: 'Năm bồn tưới cây tự động có lượng nước lần lượt: 16L, 25L, 34L, 43L và 52L. Hãy phân tích sơ đồ để điều phối.',
    hint: 'Mỗi bồn kế tiếp nhiều hơn bồn trước 9L. Tổng 5 bồn = 16 + 25 + 34 + 43 + 52 = 170L. Trung bình = 170 : 5 = 34L.',
    mascot: { ...ABBY, message: 'Khoảng cách giữa Bồn 5 và Bồn 1 bằng 4 lần bước nhảy 9L đấy!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Bồn 1 (16L)', lengthVal: 16, display: '16 Lít', color: '#10b981' },
        { label: 'Bồn 2 (25L)', lengthVal: 25, display: '25 Lít', color: '#059669' },
        { label: 'Bồn 3 (34L)', lengthVal: 34, display: '34 Lít', color: '#0d9488' },
        { label: 'Bồn 4 (43L)', lengthVal: 43, display: '43 Lít', color: '#0f766e' },
        { label: 'Bồn 5 (52L)', lengthVal: 52, display: '52 Lít', color: '#115e59' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Bồn 5 chứa nhiều hơn Bồn 1 bao nhiêu lít nước?',
          options: ['27 lít', '32 lít', '36 lít', '40 lít'],
          correctAnswer: '36 lít'
        },
        {
          id: 'q2',
          prompt: 'Tổng thể tích nước trong cả 5 bồn tưới tiêu là bao nhiêu lít?',
          options: ['160 lít', '165 lít', '170 lít', '175 lít'],
          correctAnswer: '170 lít'
        },
        {
          id: 'q3',
          prompt: 'Nếu san đều lượng nước cho cả 5 bồn, mỗi bồn chứa bao nhiêu lít?',
          options: ['32 lít', '34 lít', '36 lít', '38 lít'],
          correctAnswer: '34 lít'
        }
      ]
    }
  },
  {
    id: 'vol-49',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'So Sánh Kép Hai Bình Thí Nghiệm: Bi Thép & Khối Đồng',
    badgeTitle: 'Bài 49 · Độ khó Cấp 35',
    instruction: 'Bình X ban đầu có 30L nước, thả 3 viên bi thép giống nhau thì nước dâng lên 48L. Bình Y ban đầu có 24L nước, thả 2 viên bi thép và 1 khối đồng thì nước dâng lên 50L.',
    hint: 'Từ Bình X: 3 bi thép = 48 - 30 = 18L ➡️ 1 bi thép = 6L. Từ Bình Y: 2 bi thép = 12L ➡️ 1 khối đồng = 50 - 24 - 12 = 14L!',
    mascot: { ...MAYLE, message: 'Dùng kết quả tìm được ở Bình X để giải mã bí ẩn ở Bình Y!' },
    activity: {
      type: 'volumeComparison',
      bottles: [
        { id: 'bx0', label: 'Bình X Ban Đầu', levelPercent: 50, color: '#38bdf8', subLabel: '30 Lít' },
        { id: 'bx1', label: 'Bình X + 3 Bi', levelPercent: 80, color: '#475569', subLabel: '48 Lít (+18L)' },
        { id: 'by0', label: 'Bình Y Ban Đầu', levelPercent: 40, color: '#0ea5e9', subLabel: '24 Lít' },
        { id: 'by1', label: 'Bình Y + 2 Bi + Đồng', levelPercent: 88, color: '#d97706', subLabel: '50 Lít (+26L)' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Thể tích của MỘT viên bi thép là bao nhiêu lít?',
          options: ['5 lít', '6 lít', '7 lít', '8 lít'],
          correctAnswer: '6 lít'
        },
        {
          id: 'q2',
          prompt: 'Thể tích của khối đồng trong Bình Y là bao nhiêu lít?',
          options: ['12 lít', '14 lít', '16 lít', '18 lít'],
          correctAnswer: '14 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng thể tích của 3 viên bi thép và 1 khối đồng là bao nhiêu lít?',
          options: ['28 lít', '30 lít', '32 lít', '34 lít'],
          correctAnswer: '32 lít'
        }
      ]
    }
  },
  {
    id: 'vol-50',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'Sơ Đồ Thanh 4 Khoang Tàu Ngầm Thám Hiểm Đáy Biển',
    badgeTitle: 'Bài 50 · Độ khó Cấp 36',
    instruction: 'Bốn khoang chứa nước dằn của tàu ngầm: Khoang A chứa 30L. Khoang B gấp 3 lần Khoang A. Khoang C bằng một nửa tổng A và B. Khoang D chứa 40L.',
    hint: 'A = 30L. B = 30 x 3 = 90L. C = (30 + 90) : 2 = 60L. D = 40L. Tổng = 30 + 90 + 60 + 40 = 220L. Cân bằng = 220 : 4 = 55L.',
    mascot: { ...BENNY, message: 'Tàu ngầm lặn xuống rãnh đại dương sâu thẳm! Hãy tính thật chuẩn xác các khoang nước dằn!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Khoang A (30L)', lengthVal: 30, display: '30 Lít', color: '#0ea5e9' },
        { label: 'Khoang B (Gấp 3 A)', lengthVal: 90, display: '90 Lít', color: '#0369a1' },
        { label: 'Khoang C (Nửa A+B)', lengthVal: 60, display: '60 Lít', color: '#0284c7' },
        { label: 'Khoang D (40L)', lengthVal: 40, display: '40 Lít', color: '#38bdf8' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Khoang C chứa bao nhiêu lít nước dằn?',
          options: ['45 lít', '50 lít', '60 lít', '70 lít'],
          correctAnswer: '60 lít'
        },
        {
          id: 'q2',
          prompt: 'Tổng lượng nước ở cả 4 khoang tàu ngầm là bao nhiêu lít?',
          options: ['200 lít', '210 lít', '220 lít', '240 lít'],
          correctAnswer: '220 lít'
        },
        {
          id: 'q3',
          prompt: 'Nếu mở van chia đều nước cho 4 khoang để giữ thăng bằng, mỗi khoang có bao nhiêu lít?',
          options: ['50 lít', '55 lít', '60 lít', '65 lít'],
          correctAnswer: '55 lít'
        }
      ]
    }
  },
  {
    id: 'vol-51',
    topicId: 'volume',
    topicName: topicName('volume'),
    title: 'ĐẠI THỬ THÁCH ĐẠI THỦY LỢI QUỐC GIA TRẠM 2: Điều Tiết 5 Hồ Chứa 275 Lít',
    badgeTitle: 'Bài 51 · Đỉnh Cao Vũ Trụ Trạm 2',
    instruction: 'Hệ thống đại thủy lợi 5 bậc có lượng nước: Hồ 1 (85L), Hồ 2 (70L), Hồ 3 (55L), Hồ 4 (40L), Hồ 5 (25L). Phân tích lưu lượng xả lũ cân bằng.',
    hint: 'Tổng = 85 + 70 + 55 + 40 + 25 = 275L. Cân bằng = 275 : 5 = 55L. Hồ 1 cần xả 85 - 55 = 30L; Hồ 2 cần xả 70 - 55 = 15L.',
    mascot: { ...MAYLE, message: 'Thử thách thủy lợi tối thượng của Trạm 2! Hoàn thành bài này em là Tổng Chỉ Huy Thủy Văn!' },
    activity: {
      type: 'barModel',
      bars: [
        { label: 'Hồ 1 (85L)', lengthVal: 85, display: '85 Lít', color: '#1e3a8a' },
        { label: 'Hồ 2 (70L)', lengthVal: 70, display: '70 Lít', color: '#1d4ed8' },
        { label: 'Hồ 3 (55L)', lengthVal: 55, display: '55 Lít', color: '#2563eb' },
        { label: 'Hồ 4 (40L)', lengthVal: 40, display: '40 Lít', color: '#3b82f6' },
        { label: 'Hồ 5 (25L)', lengthVal: 25, display: '25 Lít', color: '#60a5fa' }
      ],
      questions: [
        {
          id: 'q1',
          prompt: 'Tổng thể tích nước tích trữ ở cả 5 hồ đại thủy lợi là bao nhiêu lít?',
          options: ['255 lít', '265 lít', '275 lít', '285 lít'],
          correctAnswer: '275 lít'
        },
        {
          id: 'q2',
          prompt: 'Khi điều tiết để 5 hồ đạt mực nước cân bằng hoàn hảo, mỗi hồ có bao nhiêu lít nước?',
          options: ['50 lít', '55 lít', '60 lít', '65 lít'],
          correctAnswer: '55 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng lượng nước mà Hồ 1 và Hồ 2 phải xả bớt đi để cả hai cùng về mức 55L là bao nhiêu lít?',
          options: ['35 lít', '40 lít', '45 lít', '50 lít'],
          correctAnswer: '45 lít'
        }
      ]
    }
  }
];


