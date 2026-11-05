import { LessonQuestion, MAYLE, topicName } from './lessonTypes';

export const EXTENDED_CHALLENGE_LESSONS: LessonQuestion[] = [
  {
    id: 'chal-31',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 16.1 · Pixidoku 5x5: Vương Triều Kim Tự Tháp',
    badgeTitle: 'Thử Thách 16.1 · Trang 90+',
    instruction: 'Điền 5 bảo vật Ai Cập cổ đại vào lưới 5x5: Mắt Horus 👁️, Thập Tự Ankh ☥, Bọ Cánh Cứng 🪲, Kim Tự Tháp 🔺, Vương Miện 👑 sao cho không biểu tượng nào bị lặp lại trên cùng hàng hoặc cột.',
    hint: 'Tìm hàng và cột có 4 biểu tượng để điền biểu tượng còn lại trước tiên.',
    mascot: { ...MAYLE, message: 'Bảo vật vương triều cổ đại thử thách tư duy loại trừ Latin Square 5x5!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'horus', icon: '👁️', name: 'Mắt Horus' },
        { id: 'ankh', icon: '☥', name: 'Thập Tự Ankh' },
        { id: 'scarab', icon: '🪲', name: 'Bọ Cánh Cứng' },
        { id: 'pyramid', icon: '🔺', name: 'Kim Tự Tháp' },
        { id: 'crown', icon: '👑', name: 'Vương Miện' }
      ],
      initialGrid: [
        ['horus', null, 'scarab', null, 'ankh'],
        [null, 'horus', null, 'scarab', null],
        ['pyramid', null, 'horus', null, 'scarab'],
        [null, 'pyramid', null, 'horus', null],
        ['crown', null, 'pyramid', null, 'horus']
      ],
      solution: [
        ['horus', 'crown', 'scarab', 'pyramid', 'ankh'],
        ['ankh', 'horus', 'crown', 'scarab', 'pyramid'],
        ['pyramid', 'ankh', 'horus', 'crown', 'scarab'],
        ['scarab', 'pyramid', 'ankh', 'horus', 'crown'],
        ['crown', 'scarab', 'pyramid', 'ankh', 'horus']
      ]
    }
  },
  {
    id: 'chal-32',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 16.2 · Giải Mã Két Sắt Kim Cương: 4 Chữ Số Bí Ẩn',
    badgeTitle: 'Thử Thách 16.2 · Trang 90+',
    instruction: 'Két sắt ngân hàng hoàng gia được khóa bằng mã 4 chữ số. Sử dụng 3 manh mối logic để tìm ra mật mã chính xác.',
    hint: 'Manh mối 3 cho biết 3 chữ số đúng và 2 vị trí đúng. Hãy đối chiếu với manh mối 1 và 2!',
    mascot: { ...MAYLE, message: 'Mật mã két sắt đòi hỏi tư duy phân tích giả thiết và loại trừ từng trường hợp!' },
    activity: {
      type: 'treasureVault',
      title: 'Két Sắt Kim Cương Hoàng Gia',
      codeLength: 4,
      solutionCode: [7, 3, 9, 2],
      clues: [
        {
          attempt: [1, 3, 5, 8],
          correctDigits: 1,
          correctPositions: 1,
          description: 'Có 1 chữ số đúng và đúng vị trí (số 3)'
        },
        {
          attempt: [7, 4, 2, 6],
          correctDigits: 2,
          correctPositions: 1,
          description: 'Có 2 chữ số đúng nhưng chỉ 1 chữ số đúng vị trí (số 7)'
        },
        {
          attempt: [9, 3, 8, 2],
          correctDigits: 3,
          correctPositions: 2,
          description: 'Có 3 chữ số đúng và 2 chữ số đúng vị trí (số 3 và số 2)'
        }
      ]
    }
  },
  {
    id: 'chal-33',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 17.1 · Đếm Khối Lập Phương 3D: Tòa Thành 4 Tầng Cực Hạn',
    badgeTitle: 'Thử Thách 17.1 · Trang 90+',
    instruction: 'Đếm tổng số khối lập phương tạo nên tòa thành 4 tầng có các góc khuất và hành lang chữ U bên trong.',
    hint: 'Tầng 1 (đáy): 16 khối. Tầng 2: 10 khối. Tầng 3: 6 khối. Tầng 4: 2 khối tháp đỉnh. Tổng = 16 + 10 + 6 + 2 = 34 khối!',
    mascot: { ...MAYLE, message: 'Cộng lần lượt từng tầng từ dưới lên trên để không bao giờ bị bỏ sót khối khuất!' },
    activity: {
      type: 'cubeCounter',
      title: 'Tòa Thành 4 Tầng Cực Hạn',
      instructionText: 'Tính tổng số khối lập phương cấu tạo nên công trình:',
      gridHeights: [
        [4, 3, 3, 4],
        [2, 1, 1, 2],
        [2, 1, 1, 2],
        [3, 2, 2, 3]
      ],
      layers: [
        { layerName: 'Tầng 1 (Toàn bộ mặt đáy)', count: 16 },
        { layerName: 'Tầng 2 (Khung tường bao quanh)', count: 10 },
        { layerName: 'Tầng 3 (Các cột tháp)', count: 6 },
        { layerName: 'Tầng 4 (2 đỉnh tháp canh)', count: 2 }
      ],
      totalCubes: 34,
      options: [30, 32, 34, 36],
      explanation: 'Tổng số khối lập phương là: 16 + 10 + 6 + 2 = 34 khối!'
    }
  },
  {
    id: 'chal-34',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 17.2 · Slitherlink 5x5: Vòng Khép Kín Hoàng Gia',
    badgeTitle: 'Thử Thách 17.2 · Trang 90+',
    instruction: 'Nối các chấm tạo thành một đường khép kín duy nhất, không cắt nhau, sao cho số lượng cạnh bao quanh mỗi ô bằng đúng con số ghi trong ô đó.',
    hint: 'Ô số 3 cần đúng 3 cạnh. Ô số 0 không có cạnh nào đi qua.',
    mascot: { ...MAYLE, message: 'Slitherlink là trò chơi rèn luyện tư duy không gian và suy luận đường đi tuyệt hảo!' },
    activity: {
      type: 'slitherlink',
      rows: 4,
      cols: 4,
      clues: [
        [3, 2, 2, 3],
        [2, null, null, 2],
        [2, null, null, 2],
        [3, 2, 2, 3]
      ],
      solutionEdges: {
        h: [
          [true, true, true, true],
          [false, false, false, false],
          [false, false, false, false],
          [false, false, false, false],
          [true, true, true, true]
        ],
        v: [
          [true, false, false, false, true],
          [true, false, false, false, true],
          [true, false, false, false, true],
          [true, false, false, false, true]
        ]
      }
    }
  },
  {
    id: 'chal-35',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 18.1 · Cân Thăng Bằng Tứ Trụ: Voi, Gấu, Hổ & Sói',
    badgeTitle: 'Thử Thách 18.1 · Trang 90+',
    instruction: 'Biết: 1 Voi = 2 Gấu; 1 Gấu = 3 Hổ; 1 Hổ = 2 Sói. Hỏi: 1 Chú Voi dũng mãnh nặng bằng bao nhiêu chú Sói xám?',
    hint: '1 Voi = 2 Gấu = 2 × 3 Hổ = 6 Hổ = 6 × 2 Sói = 12 Sói!',
    mascot: { ...MAYLE, message: 'Dây chuyền cân bằng 4 loài thần thú! Nhân liên hoàn từng bước nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'Đấu Trường Cân Thăng Bằng Tứ Trụ',
      ruleExplanation: '1 Voi = 2 Gấu; 1 Gấu = 3 Hổ; 1 Hổ = 2 Sói ➡️ 1 Voi = 2 × 3 × 2 = 12 Sói.',
      scales: [
        {
          leftIcons: ['🐘'],
          leftLabel: '1 Chú Voi',
          rightIcons: ['🐻', '🐻'],
          rightLabel: '2 Chú Gấu'
        },
        {
          leftIcons: ['🐻'],
          leftLabel: '1 Chú Gấu',
          rightIcons: ['🐯', '🐯', '🐯'],
          rightLabel: '3 Chú Hổ'
        },
        {
          leftIcons: ['🐯'],
          leftLabel: '1 Chú Hổ',
          rightIcons: ['🐺', '🐺'],
          rightLabel: '2 Chú Sói'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🐘'],
        targetLeftLabel: '1 Chú Voi',
        options: [
          { id: 'opt1', count: 8, icon: '🐺', label: '8 Chú Sói' },
          { id: 'opt2', count: 10, icon: '🐺', label: '10 Chú Sói' },
          { id: 'opt3', count: 12, icon: '🐺', label: '12 Chú Sói' },
          { id: 'opt4', count: 14, icon: '🐺', label: '14 Chú Sói' }
        ],
        correctOptionId: 'opt3',
        explanation: '1 Voi = 2 Gấu = 6 Hổ = 12 Sói!'
      }
    }
  },
  {
    id: 'chal-36',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 18.2 · Pixidoku 5x5: Thần Thoại Thiên Hà',
    badgeTitle: 'Thử Thách 18.2 · Trang 90+',
    instruction: 'Điền 5 biểu tượng vũ trụ: Phi thuyền 🚀, Đĩa bay 🛸, Sao thổ 🪐, Sao chổi ☄️, Vệ tinh 🛰️ vào lưới 5x5 sao cho không biểu tượng nào trùng lặp trên cùng hàng hoặc cột.',
    hint: 'Mỗi hàng và mỗi cột phải có đủ đúng 5 biểu tượng độc nhất.',
    mascot: { ...MAYLE, message: 'Pixidoku 5x5 vũ trụ huyền ảo! Tư duy quét hàng và cột thật nhanh nào!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'rocket', icon: '🚀', name: 'Phi Thuyền' },
        { id: 'ufo', icon: '🛸', name: 'Đĩa Bay' },
        { id: 'saturn', icon: '🪐', name: 'Sao Thổ' },
        { id: 'comet', icon: '☄️', name: 'Sao Chổi' },
        { id: 'satellite', icon: '🛰️', name: 'Vệ Tinh' }
      ],
      initialGrid: [
        ['rocket', null, 'saturn', null, 'satellite'],
        [null, 'rocket', null, 'saturn', null],
        ['comet', null, 'rocket', null, 'saturn'],
        [null, 'comet', null, 'rocket', null],
        ['ufo', null, 'comet', null, 'rocket']
      ],
      solution: [
        ['rocket', 'ufo', 'saturn', 'comet', 'satellite'],
        ['satellite', 'rocket', 'ufo', 'saturn', 'comet'],
        ['comet', 'satellite', 'rocket', 'ufo', 'saturn'],
        ['saturn', 'comet', 'satellite', 'rocket', 'ufo'],
        ['ufo', 'saturn', 'comet', 'satellite', 'rocket']
      ]
    }
  },
  {
    id: 'chal-37',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 19.1 · Star Battle 6x6 Bậc Thầy: Săn Sao May Mắn',
    badgeTitle: 'Thử Thách 19.1 · Trang 90+',
    instruction: 'Đặt 1 ngôi sao ⭐ vào mỗi hàng, mỗi cột và mỗi vùng hình màu trong bảng 6x6 sao cho không có 2 ngôi sao nào chạm nhau (kể cả chạm góc chéo).',
    hint: 'Khi đã đặt 1 ngôi sao, 8 ô xung quanh ngôi sao đó đều không được đặt sao nữa!',
    mascot: { ...MAYLE, message: 'Trò chơi logic Star Battle rèn luyện tư duy không gian đa chiều cực tốt!' },
    activity: {
      type: 'starBattle',
      size: 6,
      targetStarCount: 1,
      regions: [
        [0, 0, 0, 1, 1, 1],
        [0, 0, 0, 1, 1, 1],
        [2, 2, 2, 3, 3, 3],
        [2, 2, 2, 3, 3, 3],
        [5, 5, 5, 4, 4, 4],
        [5, 5, 5, 4, 4, 4]
      ],
      starsSolution: [
        [0, 1],
        [1, 4],
        [2, 0],
        [3, 3],
        [4, 5],
        [5, 2]
      ]
    }
  },
  {
    id: 'chal-38',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 19.2 · Đếm Khối Lập Phương 3D Tháp Xoắn Ốc',
    badgeTitle: 'Thử Thách 19.2 · Trang 90+',
    instruction: 'Tính tổng số khối lập phương của tháp xoắn ốc 4 tầng. Chú ý tính cả các khối nằm ở lõi trung tâm chịu lực bên dưới.',
    hint: 'Tầng 1 (đáy): 14 khối. Tầng 2: 9 khối. Tầng 3: 5 khối. Tầng 4: 1 khối. Tổng = 14 + 9 + 5 + 1 = 29 khối!',
    mascot: { ...MAYLE, message: 'Tư duy hình học không gian 3 chiều: Mỗi cột có chiều cao bao nhiêu thì có bấy nhiêu khối xếp chồng!' },
    activity: {
      type: 'cubeCounter',
      title: 'Tháp Lập Phương Xoắn Ốc',
      instructionText: 'Tính tổng số khối lập phương cấu tạo nên tháp:',
      gridHeights: [
        [4, 3, 2, 1],
        [3, 2, 1, 0],
        [2, 1, 0, 0],
        [1, 0, 0, 0]
      ],
      layers: [
        { layerName: 'Tầng 1 (Toàn bộ mặt đáy)', count: 10 },
        { layerName: 'Tầng 2 (Tầng xoắn thứ hai)', count: 6 },
        { layerName: 'Tầng 3 (Tầng xoắn thứ ba)', count: 3 },
        { layerName: 'Tầng 4 (Khối đỉnh tháp)', count: 1 }
      ],
      totalCubes: 20,
      options: [18, 19, 20, 22],
      explanation: 'Tổng số khối lập phương là: (4+3+2+1) + (3+2+1) + (2+1) + 1 = 10 + 6 + 3 + 1 = 20 khối!'
    }
  },
  {
    id: 'chal-39',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách 20.1 · Giải Mã Két Sắt Lượng Tử: 4 Chữ Số',
    badgeTitle: 'Thử Thách 20.1 · Trang 90+',
    instruction: 'Két sắt bảo mật tối cao của học viện có mã 4 chữ số. Phân tích 3 lượt đoán để tìm ra mã mở két.',
    hint: 'Manh mối 3 cho biết 3 chữ số đúng và 2 vị trí đúng: [5, 8, 2, 6]!',
    mascot: { ...MAYLE, message: 'Chỉ còn một bước nữa là chạm tay vào Vương Miện Toàn Năng rồi! Cố lên em!' },
    activity: {
      type: 'treasureVault',
      title: 'Két Sắt Mật Mã Lượng Tử',
      codeLength: 4,
      solutionCode: [5, 8, 2, 6],
      clues: [
        {
          attempt: [1, 8, 4, 9],
          correctDigits: 1,
          correctPositions: 1,
          description: 'Có 1 chữ số đúng và đúng vị trí (số 8)'
        },
        {
          attempt: [5, 2, 7, 0],
          correctDigits: 2,
          correctPositions: 1,
          description: 'Có 2 chữ số đúng nhưng chỉ 1 đúng vị trí (số 5)'
        },
        {
          attempt: [5, 8, 6, 2],
          correctDigits: 4,
          correctPositions: 2,
          description: 'Cả 4 số đều đúng nhưng có 2 số bị đảo vị trí (số 6 và số 2)'
        }
      ]
    }
  },
  {
    id: 'chal-40',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'ĐẠI CHUNG KẾT TỐI THƯỢNG - KIM CƯƠNG VÔ ĐỊCH TOÁN TƯ DUY QUỐC TẾ',
    badgeTitle: 'ĐẠI CHUNG KẾT · KIM CƯƠNG TOÀN NĂNG',
    instruction: 'Vượt qua 3 câu hỏi tích hợp tư duy đỉnh cao để nhận CÚP KIM CƯƠNG VÔ ĐỊCH TOÁN TƯ DUY TOÀN QUỐC SPARK MATH!',
    hint: 'Bình tĩnh giải quyết từng câu: Biểu đồ tỉ lệ nhân, bảo toàn thể tích và ma phương số học!',
    mascot: { ...MAYLE, message: 'Em là ngôi sao sáng nhất của Học Viện Spark Math! Bước lên bục vinh quang nào!' },
    activity: {
      type: 'grandFinale',
      title: 'Đại Chung Kết Kim Cương Vô Địch Toán Tư Duy',
      roundQuestions: [
        {
          id: 'diamond-q1',
          category: 'Biểu Đồ Hình Ảnh & Phân Tích Dữ Liệu Bậc Cao',
          question: 'Biểu đồ tranh có 4 cột A, B, C, D lần lượt có 5, 8, 4, 7 biểu tượng ngôi sao 🌟. Biết mỗi ngôi sao thể hiện cho 15 điểm thi đấu. Hỏi Cột B nhiều hơn Cột C bao nhiêu điểm?',
          options: [
            { id: 'dq1-a', text: '45 điểm', isCorrect: false },
            { id: 'dq1-b', text: '60 điểm', isCorrect: true },
            { id: 'dq1-c', text: '75 điểm', isCorrect: false },
            { id: 'dq1-d', text: '90 điểm', isCorrect: false }
          ],
          explanation: 'Cột B có 8 sao, Cột C có 4 sao. Hiệu số sao: 8 - 4 = 4 sao. Điểm hơn: 4 × 15 = 60 điểm!'
        },
        {
          id: 'diamond-q2',
          category: 'Thể Tích & San Sẻ Nước Cân Bằng 3 Bình',
          question: 'Có 3 bình nước A, B, C chứa tổng cộng 45 lít nước. Nếu rót từ bình A sang bình B 3 lít, rồi rót từ bình A sang bình C 2 lít thì cả 3 bình bằng nhau. Hỏi lúc đầu bình A có bao nhiêu lít nước?',
          options: [
            { id: 'dq2-a', text: '15 lít', isCorrect: false },
            { id: 'dq2-b', text: '18 lít', isCorrect: false },
            { id: 'dq2-c', text: '20 lít', isCorrect: true },
            { id: 'dq2-d', text: '22 lít', isCorrect: false }
          ],
          explanation: 'Khi bằng nhau, mỗi bình có: 45 : 3 = 15 lít. Bình A đã cho đi tổng cộng: 3 + 2 = 5 lít. Lúc đầu bình A có: 15 + 5 = 20 lít nước!'
        },
        {
          id: 'diamond-q3',
          category: 'Sudoku & Ma Phương Trung Tâm',
          question: 'Một ô vuông ma thuật 3x3 có tổng các hàng, cột và đường chéo đều bằng 48. Con số nằm ở Ô CHÍNH GIỮA ma trận là số bao nhiêu?',
          options: [
            { id: 'dq3-a', text: '14', isCorrect: false },
            { id: 'dq3-b', text: '15', isCorrect: false },
            { id: 'dq3-c', text: '16', isCorrect: true },
            { id: 'dq3-d', text: '18', isCorrect: false }
          ],
          explanation: 'Theo định luật ma phương 3x3, số ở ô trung tâm bằng Tổng mục tiêu chia cho 3: 48 : 3 = 16!'
        }
      ]
    }
  }
];
