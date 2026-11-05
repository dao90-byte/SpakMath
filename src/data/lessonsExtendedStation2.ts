import { LessonQuestion, ABBY, MAYLE, topicName } from './lessonTypes';

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
  }
];
