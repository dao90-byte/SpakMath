import { LessonQuestion, ABBY, BENNY, CASEY, MAYLE, topicName } from './lessonTypes';

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
    hint: 'Tầng 1 (đáy): 16 khối. Tầng 2: 12 khối. Tầng 3: 6 khối. Tầng 4: 2 khối tháp đỉnh. Tổng = 16 + 12 + 6 + 2 = 36 khối!',
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
        { layerName: 'Tầng 2 (Khung tường bao quanh)', count: 12 },
        { layerName: 'Tầng 3 (Các cột tháp)', count: 6 },
        { layerName: 'Tầng 4 (2 đỉnh tháp canh)', count: 2 }
      ],
      totalCubes: 36,
      options: [32, 34, 36, 38],
      explanation: 'Tổng số khối lập phương là: 16 + 12 + 6 + 2 = 36 khối!'
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
        [3, 1, null, 2],
        [3, null, 0, null],
        [2, null, 0, 1],
        [3, 3, 2, 2]
      ],
      solutionEdges: {
        h: [
          [true, true, true, true],
          [true, false, false, false],
          [true, false, false, false],
          [false, true, false, false],
          [true, false, true, true]
        ],
        v: [
          [true, false, false, false, true],
          [false, true, false, false, true],
          [true, false, false, false, true],
          [true, true, true, false, true]
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
      targetStarCount: 6,
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
  },
  {
    id: 'chal-41',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mật Mã Két Sắt Ngân Hàng Trung Ương 4 Chữ Số',
    badgeTitle: 'Thử Thách 17 · Trang 92',
    instruction: 'Tìm mật mã 4 chữ số bí mật để mở két sắt dựa trên 3 manh mối logic loại trừ vị trí.',
    hint: 'Mật mã bí mật gồm 4 chữ số: 6, 2, 8, 4.',
    mascot: { ...CASEY, message: 'Suy luận từng chữ số một cách chặt chẽ để mở khóa két sắt nhé!' },
    activity: {
      type: 'treasureVault',
      title: 'Mật Mã Két Sắt Ngân Hàng',
      codeLength: 4,
      solutionCode: [6, 2, 8, 4],
      clues: [
        {
          attempt: [1, 2, 9, 7],
          correctDigits: 1,
          correctPositions: 1,
          description: 'Có 1 chữ số đúng và đúng vị trí (số 2 ở hàng trăm)'
        },
        {
          attempt: [6, 0, 8, 5],
          correctDigits: 2,
          correctPositions: 2,
          description: 'Có 2 chữ số đúng và đúng vị trí (số 6 và số 8)'
        },
        {
          attempt: [4, 8, 2, 6],
          correctDigits: 4,
          correctPositions: 0,
          description: 'Cả 4 chữ số đều đúng nhưng sai toàn bộ vị trí!'
        }
      ]
    }
  },
  {
    id: 'chal-42',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Thử Thách Cân Đĩa Thăng Bằng: Ba Loại Đá Quý Hoàng Gia',
    badgeTitle: 'Thử Thách 18 · Trang 93',
    instruction: 'Quan sát hai trạng thái cân thăng bằng để tìm số lượng Ngọc Bích tương đương với 1 Viên Kim Cương.',
    hint: 'Cân 1: 1 Viên Kim Cương 💎 = 3 Viên Ngọc Bích 🟢.',
    mascot: { ...MAYLE, message: 'Nguyên lý bắc cầu và thế tương đương trên cân đĩa thăng bằng!' },
    activity: {
      type: 'balanceScale',
      title: 'Cân Đĩa Thăng Bằng Ba Loại Đá Quý',
      ruleExplanation: 'Cân 1: 1 Kim Cương = 3 Ngọc Bích. Cân 2: 2 Kim Cương = 6 Ngọc Bích.',
      scales: [
        {
          leftIcons: ['💎'],
          leftLabel: '1 Viên Kim Cương',
          rightIcons: ['🟢', '🟢', '🟢'],
          rightLabel: '3 Viên Ngọc Bích'
        },
        {
          leftIcons: ['🔴', '🔴'],
          leftLabel: '2 Viên Hồng Ngọc Ruby',
          rightIcons: ['🟢', '🟢', '🟢', '🟢'],
          rightLabel: '4 Viên Ngọc Bích'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['💎', '💎'],
        targetLeftLabel: '2 Viên Kim Cương 💎💎 cần bao nhiêu Viên Ngọc Bích 🟢 để thăng bằng?',
        options: [
          { id: 'opt1', count: 4, icon: '🟢', label: '4 Viên Ngọc Bích' },
          { id: 'opt2', count: 5, icon: '🟢', label: '5 Viên Ngọc Bích' },
          { id: 'opt3', count: 6, icon: '🟢', label: '6 Viên Ngọc Bích' },
          { id: 'opt4', count: 8, icon: '🟢', label: '8 Viên Ngọc Bích' }
        ],
        correctOptionId: 'opt3',
        explanation: 'Vì 1 Kim Cương = 3 Ngọc Bích, nên 2 Kim Cương = 3 × 2 = 6 Viên Ngọc Bích!'
      }
    }
  },
  {
    id: 'chal-43',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm Khối Lập Phương Kiến Trúc Tinh Vân 3D (Có Khối Ẩn)',
    badgeTitle: 'Thử Thách 19 · Trang 94',
    instruction: 'Đếm chính xác tổng số khối lập phương đơn vị tạo nên mô hình tháp 3D. Lưu ý các khối bị che khuất ở các tầng bên dưới!',
    hint: 'Đếm theo từng cột: Hàng 1 (3+2+1=6), Hàng 2 (2+3+2=7), Hàng 3 (1+2+3=6). Tổng = 6 + 7 + 6 = 19 khối.',
    mascot: { ...BENNY, message: 'Nhìn xuyên qua các tầng để không bỏ sót các khối lập phương ẩn bên dưới nhé!' },
    activity: {
      type: 'cubeCounter',
      title: 'Đếm Khối Kiến Trúc Tinh Vân 3D',
      instructionText: 'Đếm tổng số khối lập phương tạo nên tòa tháp 3D này:',
      gridHeights: [
        [3, 2, 1],
        [2, 3, 2],
        [1, 2, 3]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy tháp)', count: 9 },
        { layerName: 'Tầng 2 (Thân tháp)', count: 7 },
        { layerName: 'Tầng 3 (Đỉnh tháp)', count: 3 }
      ],
      totalCubes: 19,
      options: [17, 18, 19, 21],
      explanation: 'Tầng 1 có 9 khối (đủ 3x3), Tầng 2 có 7 khối, Tầng 3 có 3 khối. Tổng số khối = 9 + 7 + 3 = 19 khối lập phương!'
    }
  },
  {
    id: 'chal-44',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mê Cung Tròn Lượng Tử Đồng Tâm 4 Vòng Vượt Bẫy',
    badgeTitle: 'Thử Thách 20 · Trang 95',
    instruction: 'Xoay các vòng tròn đồng tâm để tạo đường thông suốt dẫn phi hành gia từ vòng ngoài vào tận lõi trung tâm năng lượng.',
    hint: 'Quan sát các khe hở và xoay các vòng theo đúng góc mở liên thông.',
    mascot: { ...ABBY, message: 'Mê cung tròn lượng tử thử thách tư duy hình học không gian xoay!' },
    activity: {
      type: 'circularMaze'
    }
  },
  {
    id: 'chal-45',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mật Mã Két Sắt Lượng Tử 4 Chữ Số: Trí Tuệ Siêu Cấp',
    badgeTitle: 'Thử Thách 21 · Trang 96',
    instruction: 'Giải mã mật mã két sắt lượng tử 4 chữ số từ các dữ kiện kiểm tra thử nghiệm.',
    hint: 'Mật mã lượng tử là: 9, 3, 5, 1.',
    mascot: { ...MAYLE, message: 'Tư duy logic loại trừ số học ở đẳng cấp cao nhất!' },
    activity: {
      type: 'treasureVault',
      title: 'Mật Mã Két Sắt Lượng Tử',
      codeLength: 4,
      solutionCode: [9, 3, 5, 1],
      clues: [
        {
          attempt: [9, 4, 8, 2],
          correctDigits: 1,
          correctPositions: 1,
          description: 'Có 1 chữ số đúng và đúng vị trí (số 9 ở hàng nghìn)'
        },
        {
          attempt: [7, 3, 5, 0],
          correctDigits: 2,
          correctPositions: 2,
          description: 'Có 2 chữ số đúng và đúng vị trí (số 3 và số 5)'
        },
        {
          attempt: [1, 5, 3, 9],
          correctDigits: 4,
          correctPositions: 0,
          description: 'Cả 4 chữ số đều chính xác nhưng bị đảo lộn vị trí!'
        }
      ]
    }
  },
  {
    id: 'chal-46',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Cân Đĩa Thăng Bằng: Ba Loại Quả Nông Trại Hữu Cơ',
    badgeTitle: 'Thử Thách 22 · Trang 97',
    instruction: 'Tìm số quả Táo đỏ 🍎 cần đặt lên đĩa cân để thăng bằng với 1 Quả Dưa Hấu 🍉.',
    hint: '1 Dưa Hấu = 2 Dưa Lưới. 1 Dưa Lưới = 3 Táo Đỏ. Vậy 1 Dưa Hấu = 2 x 3 = 6 Táo Đỏ.',
    mascot: { ...CASEY, message: 'Phương pháp thế đại số bằng hình ảnh vô cùng sinh động!' },
    activity: {
      type: 'balanceScale',
      title: 'Cân Thăng Bằng Hoa Quả',
      ruleExplanation: '1 Dưa Hấu = 2 Dưa Lưới; 1 Dưa Lưới = 3 Táo Đỏ. Suy ra 1 Dưa Hấu = 6 Táo Đỏ.',
      scales: [
        {
          leftIcons: ['🍉'],
          leftLabel: '1 Quả Dưa Hấu',
          rightIcons: ['🍈', '🍈'],
          rightLabel: '2 Quả Dưa Lưới'
        },
        {
          leftIcons: ['🍈'],
          leftLabel: '1 Quả Dưa Lưới',
          rightIcons: ['🍎', '🍎', '🍎'],
          rightLabel: '3 Quả Táo Đỏ'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🍉'],
        targetLeftLabel: '1 Quả Dưa Hấu 🍉 cần bao nhiêu Quả Táo Đỏ 🍎 để thăng bằng?',
        options: [
          { id: 'opt1', count: 4, icon: '🍎', label: '4 Quả Táo Đỏ' },
          { id: 'opt2', count: 5, icon: '🍎', label: '5 Quả Táo Đỏ' },
          { id: 'opt3', count: 6, icon: '🍎', label: '6 Quả Táo Đỏ' },
          { id: 'opt4', count: 8, icon: '🍎', label: '8 Quả Táo Đỏ' }
        ],
        correctOptionId: 'opt3',
        explanation: 'Thế 2 quả dưa lưới bằng 3 × 2 = 6 quả táo đỏ. Vậy 1 dưa hấu = 6 quả táo đỏ!'
      }
    }
  },
  {
    id: 'chal-47',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đếm Khối Kim Tự Tháp 3D Bậc Thang Tầng Cao',
    badgeTitle: 'Thử Thách 23 · Trang 98',
    instruction: 'Đếm tổng số khối lập phương của mô hình kim tự tháp bậc thang đa tầng.',
    hint: 'Tầng 1 (đáy): 16 khối. Tầng 2: 9 khối. Tầng 3: 4 khối. Tầng 4 (đỉnh): 1 khối. Tổng = 16 + 9 + 4 + 1 = 30 khối.',
    mascot: { ...BENNY, message: 'Các số chính phương: 1, 4, 9, 16 tạo nên các tầng tháp hoàn hảo!' },
    activity: {
      type: 'cubeCounter',
      title: 'Đếm Khối Kim Tự Tháp Bậc Thang',
      instructionText: 'Đếm tổng số khối lập phương tạo nên kim tự tháp bậc thang 4 tầng:',
      gridHeights: [
        [4, 3, 2],
        [3, 4, 3],
        [2, 3, 4]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy 3x3)', count: 9 },
        { layerName: 'Tầng 2 (Thân giữa)', count: 9 },
        { layerName: 'Tầng 3 (Cột cao)', count: 7 },
        { layerName: 'Tầng 4 (Đỉnh chóp)', count: 3 }
      ],
      totalCubes: 28,
      options: [26, 27, 28, 30],
      explanation: 'Tổng số khối lập phương = 9 + 9 + 7 + 3 = 28 khối lập phương!'
    }
  },
  {
    id: 'chal-48',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Hàng Rào Nông Trại Slitherlink Cấp Độ Thách Đấu',
    badgeTitle: 'Thử Thách 24 · Trang 99',
    instruction: 'Nối các chấm tạo thành một đường khép kín duy nhất bảo vệ nông trại sao cho số cạnh bao quanh mỗi ô bằng đúng con số ghi trong ô đó.',
    hint: 'Bắt đầu từ ô số 0 (không có cạnh nào) và ô số 3 (có đúng 3 cạnh bao quanh).',
    mascot: { ...ABBY, message: 'Trò chơi trí tuệ Slitherlink rèn luyện tư duy không gian tuyệt đỉnh!' },
    activity: {
      type: 'cattleFence'
    }
  },
  {
    id: 'chal-49',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mật Mã Hòm Kho Báu Không Gian 4 Chữ Số',
    badgeTitle: 'Thử Thách 25 · Trang 100',
    instruction: 'Tìm mật mã 4 chữ số mở khóa hòm kho báu vũ trụ chứa Đá Vô Cực.',
    hint: 'Mật mã bí mật là: 7, 4, 1, 9.',
    mascot: { ...CASEY, message: 'Chỉ còn một bước nữa là chạm tay vào kho báu vô giá!' },
    activity: {
      type: 'treasureVault',
      title: 'Mật Mã Hòm Kho Báu Không Gian',
      codeLength: 4,
      solutionCode: [7, 4, 1, 9],
      clues: [
        {
          attempt: [7, 2, 3, 5],
          correctDigits: 1,
          correctPositions: 1,
          description: 'Có 1 chữ số đúng và đúng vị trí (số 7)'
        },
        {
          attempt: [0, 4, 1, 8],
          correctDigits: 2,
          correctPositions: 2,
          description: 'Có 2 chữ số đúng và đúng vị trí (số 4 và số 1)'
        },
        {
          attempt: [9, 1, 4, 7],
          correctDigits: 4,
          correctPositions: 0,
          description: 'Cả 4 số đều đúng nhưng bị đảo lộn vị trí!'
        }
      ]
    }
  },
  {
    id: 'chal-50',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'ĐẠI ĐỈNH CAO THẦN ĐỒNG TOÁN TƯ DUY TOÀN VŨ TRỤ SPARK MATH',
    badgeTitle: 'ĐẠI CHUNG KẾT · THẦN ĐỒNG TOÁN TƯ DUY VÔ ĐỊCH',
    instruction: 'Vượt qua 4 câu hỏi tích hợp tư duy tối thượng của toàn bộ 6 Trạm để nhận CÚP VÔ ĐỊCH THẦN ĐỒNG TOÁN TƯ DUY TOÀN VŨ TRỤ SPARK MATH!',
    hint: 'Bình tĩnh giải quyết từng vòng: Biểu đồ tranh, Thể tích cân bằng, Ma phương số học và Suy luận logic bàn tròn!',
    mascot: { ...MAYLE, message: 'Em đã xuất sắc vượt qua mọi chông gai và trở thành Nhà Vô Địch Toán Tư Duy Toàn Vũ Trụ!' },
    activity: {
      type: 'grandFinale',
      title: 'Đại Chung Kết Thần Đồng Toán Tư Duy Toàn Vũ Trụ',
      roundQuestions: [
        {
          id: 'finale-q1',
          category: 'Biểu Đồ Hình Ảnh & Phân Tích Bội Số Bậc Cao',
          question: 'Biểu đồ tranh ghi nhận số sách của 4 thư viện: A có 6 biểu tượng 📚, B có 9 biểu tượng, C có 5 biểu tượng, D có 8 biểu tượng. Biết mỗi biểu tượng 📚 đại diện cho 25 quyển sách. Hỏi Thư viện B nhiều hơn Thư viện C bao nhiêu quyển sách?',
          options: [
            { id: 'fq1-a', text: '75 quyển sách', isCorrect: false },
            { id: 'fq1-b', text: '100 quyển sách', isCorrect: true },
            { id: 'fq1-c', text: '125 quyển sách', isCorrect: false },
            { id: 'fq1-d', text: '150 quyển sách', isCorrect: false }
          ],
          explanation: 'Thư viện B có 9 biểu tượng, Thư viện C có 5 biểu tượng. Hiệu số biểu tượng: 9 - 5 = 4 biểu tượng. Số sách hơn: 4 × 25 = 100 quyển sách!'
        },
        {
          id: 'finale-q2',
          category: 'Thể Tích & San Sẻ Nước Cân Bằng 4 Bể',
          question: 'Có 4 bể nước chứa lần lượt 38L, 32L, 26L và 24L. Nếu mở van liên thông để nước san đều cho cả 4 bể bằng nhau thì mỗi bể sẽ có bao nhiêu lít nước?',
          options: [
            { id: 'fq2-a', text: '28 lít', isCorrect: false },
            { id: 'fq2-b', text: '30 lít', isCorrect: true },
            { id: 'fq2-c', text: '32 lít', isCorrect: false },
            { id: 'fq2-d', text: '35 lít', isCorrect: false }
          ],
          explanation: 'Tổng thể tích nước cả 4 bể: 38 + 32 + 26 + 24 = 120 lít. Khi cân bằng đều nhau, mỗi bể có: 120 : 4 = 30 lít nước!'
        },
        {
          id: 'finale-q3',
          category: 'Sudoku & Ma Phương Trung Tâm',
          question: 'Một ô vuông ma thuật 3x3 có tổng mỗi hàng, cột và đường chéo đều bằng 72. Chữ số nằm ở Ô CHÍNH GIỮA ma trận là số bao nhiêu?',
          options: [
            { id: 'fq3-a', text: '20', isCorrect: false },
            { id: 'fq3-b', text: '22', isCorrect: false },
            { id: 'fq3-c', text: '24', isCorrect: true },
            { id: 'fq3-d', text: '26', isCorrect: false }
          ],
          explanation: 'Theo định lý ma phương 3x3, số ở ô trung tâm bằng Tổng mục tiêu chia cho 3: 72 : 3 = 24!'
        },
        {
          id: 'finale-q4',
          category: 'Vị Trí Hàng Ngũ & Suy Luận Vòng Tròn',
          question: 'Có 20 bạn học sinh đứng thành một vòng tròn cách đều nhau đánh số từ 1 đến 20 theo chiều kim đồng hồ. Hỏi bạn đứng đối diện trực diện với bạn số 4 là bạn mang số bao nhiêu?',
          options: [
            { id: 'fq4-a', text: 'Số 12', isCorrect: false },
            { id: 'fq4-b', text: 'Số 13', isCorrect: false },
            { id: 'fq4-c', text: 'Số 14', isCorrect: true },
            { id: 'fq4-d', text: 'Số 15', isCorrect: false }
          ],
          explanation: 'Trong vòng tròn 20 bạn, khoảng cách nửa vòng tròn là 20 : 2 = 10 bước. Vị trí bạn đối diện với bạn số 4 là: 4 + 10 = 14!'
        }
      ]
    }
  },
  {
    id: 'chal-51',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Cân Thăng Bằng Bậc Thang Vũ Trụ: Đổi Vương Miện Ra Ngôi Sao',
    badgeTitle: 'Thử Thách 27 · Cấp Tinh Vân',
    instruction: 'Quan sát hai chiếc cân mẫu để tính xem 2 Vương Miện 👑 và 1 Kim Cương 💎 nặng bằng bao nhiêu Ngôi Sao ⭐.',
    hint: '1 💎 = 2 ⭐, nên 1 👑 = 3 💎 = 6 ⭐. Vậy 2 👑 + 1 💎 = 6 + 6 + 2 = 14 ⭐!',
    mascot: { ...ABBY, message: 'Dùng phương pháp thế bắc cầu 2 tầng để quy đổi mọi vật về Ngôi Sao ⭐ nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'Cân Thăng Bằng Quy Đổi 2 Tầng',
      ruleExplanation: 'Biết 1 Vương Miện 👑 = 3 Kim Cương 💎 và 1 Kim Cương 💎 = 2 Ngôi Sao ⭐.',
      scales: [
        {
          leftIcons: ['👑'],
          leftLabel: '1 Vương Miện',
          rightIcons: ['💎', '💎', '💎'],
          rightLabel: '3 Kim Cương'
        },
        {
          leftIcons: ['💎'],
          leftLabel: '1 Kim Cương',
          rightIcons: ['⭐', '⭐'],
          rightLabel: '2 Ngôi Sao'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['👑', '👑', '💎'],
        targetLeftLabel: '2 Vương Miện + 1 Kim Cương',
        options: [
          { id: 'b12', count: 12, icon: '⭐', label: '12 Ngôi Sao' },
          { id: 'b14', count: 14, icon: '⭐', label: '14 Ngôi Sao' },
          { id: 'b16', count: 16, icon: '⭐', label: '16 Ngôi Sao' }
        ],
        correctOptionId: 'b14',
        explanation: '1 👑 = 3 💎 = 6 ⭐. Vậy 2 👑 + 1 💎 = 6×2 + 2 = 14 Ngôi Sao!'
      }
    }
  },
  {
    id: 'chal-52',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pixidoku 5x5 Thiên Hà Huyền Bí (Thử Thách Ít Gợi Ý)',
    badgeTitle: 'Thử Thách 28 · Cấp Sao Chổi',
    instruction: 'Điền 5 biểu tượng vũ trụ (☀️, 🌙, 🌍, 🪐, ☄️) vào bảng 5x5 sao cho mỗi hàng và mỗi cột có đủ cả 5 biểu tượng không trùng lặp.',
    hint: 'Đếm loại biểu tượng đã xuất hiện nhiều nhất (Mặt Trời ☀️ hoặc Trái Đất 🌍) để khoanh vùng ô duy nhất còn lại trong hàng/cột!',
    mascot: { ...CASEY, message: 'Bảng Pixidoku 5x5 siêu hóc búa chỉ có 11 ô gợi ý! Bé bình tĩnh suy luận từng ô nhé!' },
    activity: {
      type: 'pixidoku',
      size: 5,
      animals: [
        { id: 'sun', icon: '☀️', name: 'Mặt Trời' },
        { id: 'moon', icon: '🌙', name: 'Mặt Trăng' },
        { id: 'earth', icon: '🌍', name: 'Trái Đất' },
        { id: 'saturn', icon: '🪐', name: 'Sao Thổ' },
        { id: 'comet', icon: '☄️', name: 'Sao Chổi' }
      ],
      initialGrid: [
        ['sun', null, 'earth', null, 'comet'],
        ['earth', null, 'comet', 'sun', null],
        ['comet', 'sun', null, null, 'saturn'],
        [null, 'earth', null, null, 'sun'],
        ['saturn', 'comet', null, null, 'earth']
      ],
      solution: [
        ['sun', 'moon', 'earth', 'saturn', 'comet'],
        ['earth', 'saturn', 'comet', 'sun', 'moon'],
        ['comet', 'sun', 'moon', 'earth', 'saturn'],
        ['moon', 'earth', 'saturn', 'comet', 'sun'],
        ['saturn', 'comet', 'sun', 'moon', 'earth']
      ]
    }
  },
  {
    id: 'chal-53',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Kiến Trúc Sư Không Gian 3D: Đếm Khối Lập Phương 4 Tầng',
    badgeTitle: 'Thử Thách 29 · Cấp Hành Tinh',
    instruction: 'Quan sát khối kiến trúc bậc thang 3D cao tới 4 tầng. Hãy đếm kỹ kể cả những khối lập phương bị che khuất phía sau và bên dưới để tìm tổng số khối.',
    hint: 'Đếm theo từng tầng từ đáy lên đỉnh: Tầng 1 có 9 khối, Tầng 2 có 9 khối, Tầng 3 có 8 khối, Tầng 4 có 3 khối!',
    mascot: { ...MAYLE, message: 'Đừng quên các khối đỡ bên dưới cột màu hồng tầng 4 nhé!' },
    activity: {
      type: 'cubeCounter',
      title: 'Tháp Lập Phương Bậc Thang 4 Tầng',
      instructionText: 'Đếm chính xác tổng số khối lập phương tạo nên công trình 3D này (bao gồm các khối bị che khuất):',
      gridHeights: [
        [4, 4, 3],
        [4, 3, 3],
        [3, 3, 2]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy 3x3)', count: 9 },
        { layerName: 'Tầng 2 (Thân dưới)', count: 9 },
        { layerName: 'Tầng 3 (Thân trên)', count: 8 },
        { layerName: 'Tầng 4 (Đỉnh chóp)', count: 3 }
      ],
      totalCubes: 29,
      options: [27, 28, 29, 30],
      explanation: 'Tổng số khối lập phương = 9 + 9 + 8 + 3 = 29 khối!'
    }
  },
  {
    id: 'chal-54',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Giải Mã Két Sắt Lượng Tử 4 Chữ Số (Suy Luận Thuần Túy)',
    badgeTitle: 'Thử Thách 30 · Cấp Hố Đen',
    instruction: 'Đọc kỹ 4 manh mối thám tử để suy luận chính xác mật mã 4 chữ số mở khóa Két Sắt Lượng Tử.',
    hint: 'Manh mối 1 loại 1, 3, 4, 9. Manh mối 4 cho biết mật mã gồm đúng 4 chữ số 2, 5, 6, 8. Kết hợp manh mối 2 & 3 để đặt từng số đúng vị trí!',
    mascot: { ...CASEY, message: 'Không hề có gợi ý lộ đáp án đâu! Hãy dùng tư duy thám tử để khóa chặt từng vị trí!' },
    activity: {
      type: 'treasureVault',
      title: 'Két Sắt Lượng Tử Vũ Trụ',
      codeLength: 4,
      solutionCode: [5, 8, 2, 6],
      clues: [
        {
          attempt: [1, 3, 4, 9],
          correctDigits: 0,
          correctPositions: 0,
          description: 'Không có số nào đúng'
        },
        {
          attempt: [5, 0, 7, 2],
          correctDigits: 2,
          correctPositions: 1,
          description: 'Có 2 chữ số đúng: 1 số đúng vị trí, 1 số sai vị trí'
        },
        {
          attempt: [6, 8, 0, 7],
          correctDigits: 2,
          correctPositions: 1,
          description: 'Có 2 chữ số đúng: 1 số đúng vị trí, 1 số sai vị trí'
        },
        {
          attempt: [2, 6, 8, 5],
          correctDigits: 4,
          correctPositions: 0,
          description: 'Cả 4 chữ số đều đúng nhưng TẤT CẢ đều sai vị trí!'
        }
      ]
    }
  },
  {
    id: 'chal-55',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Đấu Trường Ngôi Sao Star Battle 6x6: Chòm Sao Bắc Đẩu',
    badgeTitle: 'Thử Thách 31 · Cấp Thiên Hà',
    instruction: 'Đặt 6 Ngôi Sao ⭐ vào bảng 6x6 sao cho mỗi hàng, mỗi cột và mỗi vùng màu có đúng 1 ngôi sao. Các ngôi sao KHÔNG được đứng cạnh nhau (kể cả đường chéo)!',
    hint: 'Hãy chú ý vùng màu nhỏ ở góc trên trái (4 ô) và quy tắc không chạm chéo giữa 2 ngôi sao gần nhau!',
    mascot: { ...ABBY, message: 'Bấm 2 lần để đánh dấu chấm • loại trừ các ô xung quanh ngôi sao vừa đặt!' },
    activity: {
      type: 'starBattle',
      size: 6,
      targetStarCount: 6,
      regions: [
        [0, 0, 1, 1, 1, 1],
        [0, 0, 2, 1, 1, 3],
        [2, 2, 2, 3, 3, 3],
        [2, 2, 4, 3, 3, 3],
        [5, 5, 4, 4, 4, 4],
        [5, 5, 5, 5, 4, 4]
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
    id: 'chal-56',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Ma Trận 2x2 Quy Luật Kép: Xoay 90° Rồi Cộng Thêm 10',
    badgeTitle: 'Thử Thách 32 · Cấp Siêu Tân Tinh',
    instruction: 'Phát hiện quy luật biến đổi kép qua Ô 1 ➔ Ô 2 ➔ Ô 3 để tự tay điền 4 con số vào Ô 4.',
    hint: 'Mỗi bước, 4 con số vừa xoay THEO chiều kim đồng hồ 1 góc, vừa tăng thêm đúng +10 đơn vị! Ví dụ: 2 ➔ 12 ➔ 22 ➔ 32.',
    mascot: { ...MAYLE, message: 'Quy luật kết hợp cả hình học (xoay) và số học (+10) cực kỳ đẳng cấp!' },
    activity: {
      type: 'matrix2x2',
      title: 'Ma Trận 2x2 Quy Luật Kép (Xoay + Cộng 10)',
      ruleExplanation: 'Mỗi bước cả 4 số xoay theo chiều kim đồng hồ 90 độ rồi cộng thêm 10.',
      sampleGrids: [
        {
          stepNum: 1,
          grid: [
            ['2', '5'],
            ['8', '3']
          ]
        },
        {
          stepNum: 2,
          grid: [
            ['18', '12'],
            ['13', '15']
          ]
        },
        {
          stepNum: 3,
          grid: [
            ['23', '28'],
            ['25', '22']
          ]
        }
      ],
      choices: [
        {
          id: 'opt1',
          label: 'Chuẩn xoay +10',
          grid: [
            ['35', '33'],
            ['32', '38']
          ]
        }
      ],
      correctChoiceId: 'opt1'
    }
  },
  {
    id: 'chal-57',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Mê Cung Hàng Rào Số Slitherlink 4x4: Vành Đai Ánh Sáng',
    badgeTitle: 'Thử Thách 33 · Cấp Chuẩn Tinh',
    instruction: 'Nối các điểm tạo thành MỘT vòng khép kín duy nhất sao cho số trong mỗi ô bằng đúng số cạnh có đường viền bao quanh ô đó.',
    hint: 'Bắt đầu loại bỏ toàn bộ 4 cạnh xung quanh các ô số 0 ở chính giữa, sau đó nối tiếp từ các ô số 2 ở các góc!',
    mascot: { ...BENNY, message: 'Mẹo Slitherlink: 3 ô số 0 ở giữa là chìa khóa mở ra toàn bộ đường bao xung quanh!' },
    activity: {
      type: 'slitherlink',
      rows: 4,
      cols: 4,
      clues: [
        [2, null, 2, 1],
        [null, 0, null, 2],
        [2, 0, 0, null],
        [2, 2, null, 2]
      ],
      solutionEdges: {
        h: [
          [true, true, false, false],
          [false, false, true, true],
          [false, false, false, false],
          [true, false, false, true],
          [false, true, true, false]
        ],
        v: [
          [true, false, true, false, false],
          [true, false, false, false, true],
          [true, false, false, false, true],
          [false, true, false, true, false]
        ]
      }
    }
  },
  {
    id: 'chal-58',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Cân Thăng Bằng 3 Chiếc Đĩa: Kho Báu Ba Tầng',
    badgeTitle: 'Thử Thách 34 · Cấp Ngân Hà',
    instruction: 'Từ 3 chiếc cân thăng bằng bên dưới, hãy quy đổi xem 2 Chiếc Cúp 🏆 nặng bằng bao nhiêu Ngôi Sao ⭐.',
    hint: '1 🎖️ = 3 ⭐ và 1 💎 = 4 ⭐. Thay vào cân #1: 1 🏆 = 2×3 + 4 = 10 ⭐. Vậy 2 🏆 = ?',
    mascot: { ...ABBY, message: 'Thay thế từng biểu tượng một rồi nhân đôi kết quả cho 2 Chiếc Cúp nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'Cân Thăng Bằng 3 Biến Số',
      ruleExplanation: 'Biết 1 Cúp 🏆 = 2 Huy Chương 🎖️ + 1 Kim Cương 💎; 1 Huy Chương = 3 Sao ⭐; 1 Kim Cương = 4 Sao ⭐.',
      scales: [
        {
          leftIcons: ['🏆'],
          leftLabel: '1 Cúp Vàng',
          rightIcons: ['🎖️', '🎖️', '💎'],
          rightLabel: '2 Huy Chương + 1 Kim Cương'
        },
        {
          leftIcons: ['🎖️'],
          leftLabel: '1 Huy Chương',
          rightIcons: ['⭐', '⭐', '⭐'],
          rightLabel: '3 Ngôi Sao'
        },
        {
          leftIcons: ['💎'],
          leftLabel: '1 Kim Cương',
          rightIcons: ['⭐', '⭐', '⭐', '⭐'],
          rightLabel: '4 Ngôi Sao'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🏆', '🏆'],
        targetLeftLabel: '2 Chiếc Cúp Vàng',
        options: [
          { id: 's18', count: 18, icon: '⭐', label: '18 Ngôi Sao' },
          { id: 's20', count: 20, icon: '⭐', label: '20 Ngôi Sao' },
          { id: 's22', count: 22, icon: '⭐', label: '22 Ngôi Sao' }
        ],
        correctOptionId: 's20',
        explanation: '1 🏆 = 2×3 + 4 = 10 ⭐. Vậy 2 🏆 = 2 × 10 = 20 Ngôi Sao!'
      }
    }
  },
  {
    id: 'chal-59',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'Pháo Đài Không Gian 3D 30 Khối Lập Phương',
    badgeTitle: 'Thử Thách 35 · Cấp Vũ Trụ',
    instruction: 'Đếm toàn bộ số khối lập phương tạo nên Pháo Đài 4 tầng cực đại bên dưới.',
    hint: 'Phân lớp cẩn thận: Tầng 1 (9 khối) + Tầng 2 (9 khối) + Tầng 3 (8 khối) + Tầng 4 (4 khối màu hồng) = ?',
    mascot: { ...MAYLE, message: 'Công trình đồ sộ nhất toàn khóa học! Quan sát kỹ cả 4 khối màu hồng tầng trên cùng!' },
    activity: {
      type: 'cubeCounter',
      title: 'Pháo Đài Không Gian 4 Tầng',
      instructionText: 'Tính tổng số khối lập phương của Pháo Đài 3D (bao gồm cả phần bị che khuất):',
      gridHeights: [
        [4, 4, 4],
        [4, 3, 3],
        [3, 3, 2]
      ],
      layers: [
        { layerName: 'Tầng 1 (Đáy 3x3)', count: 9 },
        { layerName: 'Tầng 2 (Thân dưới)', count: 9 },
        { layerName: 'Tầng 3 (Thân trên)', count: 8 },
        { layerName: 'Tầng 4 (Tháp đỉnh)', count: 4 }
      ],
      totalCubes: 30,
      options: [28, 29, 30, 32],
      explanation: 'Tổng số khối = 9 + 9 + 8 + 4 = 30 khối lập phương!'
    }
  },
  {
    id: 'chal-60',
    topicId: 'challenge',
    topicName: topicName('challenge'),
    title: 'SIÊU CHUNG KẾT LIÊN HÀNH TINH: TỐI THƯỢNG TOÁN TƯ DUY SPARK MATH',
    badgeTitle: 'SIÊU CHUNG KẾT · HUYỀN THOẠI LIÊN HÀNH TINH',
    instruction: 'Chinh phục 5 vòng thi tích hợp đỉnh cao cuối cùng về Biểu đồ, Thể tích, Ma phương, Dãy số và Suy luận vòng tròn để bước lên Ngôi Vương Toán Tư Duy!',
    hint: 'Vận dụng toàn bộ tuyệt chiêu đã học từ Trạm 1 đến Trạm 6 và sử dụng Bảng Vẽ Nháp khi cần tính nhẩm số lớn nhé!',
    mascot: { ...MAYLE, message: 'Khoảnh khắc lịch sử! Vượt qua 5 vòng siêu đỉnh này, em là Huyền Thoại Liên Hành Tinh bất khả chiến bại!' },
    activity: {
      type: 'grandFinale',
      title: 'Siêu Chung Kết Liên Hành Tinh Spark Math',
      roundQuestions: [
        {
          id: 'super-q1',
          category: 'Vòng 1 · Biểu Đồ Tỷ Lệ Thiên Văn',
          question: 'Trên bản đồ vũ trụ, khoảng cách tới Sao Hỏa được vẽ bằng 11 biểu tượng 🪐, tới Sao Mộc có 7 biểu tượng 🪐. Biết mỗi biểu tượng 🪐 đại diện cho 45 triệu km. Hỏi khoảng cách đầu lớn hơn khoảng cách sau bao nhiêu triệu km?',
          options: [
            { id: 'sq1-a', text: '135 triệu km', isCorrect: false },
            { id: 'sq1-b', text: '180 triệu km', isCorrect: true },
            { id: 'sq1-c', text: '225 triệu km', isCorrect: false },
            { id: 'sq1-d', text: '270 triệu km', isCorrect: false }
          ],
          explanation: 'Hiệu số biểu tượng: 11 - 7 = 4 biểu tượng. Khoảng cách chênh lệch: 4 × 45 = 180 triệu km!'
        },
        {
          id: 'super-q2',
          category: 'Vòng 2 · Cân Bằng Nhiên Liệu 5 Khoang Tàu',
          question: '5 khoang nhiên liệu chứa lần lượt 45L, 52L, 38L, 60L và 55L. Khi bơm san đều để cả 5 khoang có lượng nhiên liệu bằng nhau thì mỗi khoang chứa bao nhiêu lít?',
          options: [
            { id: 'sq2-a', text: '48 lít', isCorrect: false },
            { id: 'sq2-b', text: '50 lít', isCorrect: true },
            { id: 'sq2-c', text: '52 lít', isCorrect: false },
            { id: 'sq2-d', text: '55 lít', isCorrect: false }
          ],
          explanation: 'Tổng nhiên liệu: 45 + 52 + 38 + 60 + 55 = 250 lít. Chia đều 5 khoang: 250 : 5 = 50 lít!'
        },
        {
          id: 'super-q3',
          category: 'Vòng 3 · Giải Mã Ma Phương 3x3',
          question: 'Một ma phương 3x3 có tổng mỗi hàng, cột và đường chéo đều bằng 108. Biết ô góc trên bên trái là số 40. Hỏi số nằm ở ô góc dưới bên phải (trên cùng đường chéo chính) là bao nhiêu?',
          options: [
            { id: 'sq3-a', text: '28', isCorrect: false },
            { id: 'sq3-b', text: '32', isCorrect: true },
            { id: 'sq3-c', text: '36', isCorrect: false },
            { id: 'sq3-d', text: '40', isCorrect: false }
          ],
          explanation: 'Ô chính giữa ma phương bằng 108 : 3 = 36. Tổng đường chéo = 40 + 36 + Ô góc dưới phải = 108 ➔ Ô cần tìm = 108 - 76 = 32!'
        },
        {
          id: 'super-q4',
          category: 'Vòng 4 · Dãy Số Tăng Tốc',
          question: 'Tìm số tiếp theo trong dãy số quy luật kết hợp: 2, 5, 11, 23, 47, [?].',
          options: [
            { id: 'sq4-a', text: '93', isCorrect: false },
            { id: 'sq4-b', text: '94', isCorrect: false },
            { id: 'sq4-c', text: '95', isCorrect: true },
            { id: 'sq4-d', text: '96', isCorrect: false }
          ],
          explanation: 'Quy luật: mỗi số bằng số trước nhân 2 rồi cộng 1 (2×2+1=5, 5×2+1=11, ..., 47×2+1 = 95)!'
        },
        {
          id: 'super-q5',
          category: 'Vòng 5 · Suy Luận Vòng Tròn Đối Xứng',
          question: 'Có 32 phi hành gia đứng thành một vòng tròn cách đều nhau, đánh số từ 1 đến 32 theo chiều kim đồng hồ. Hỏi phi hành gia đứng đối diện trực diện với số 9 mang số bao nhiêu?',
          options: [
            { id: 'sq5-a', text: 'Số 23', isCorrect: false },
            { id: 'sq5-b', text: 'Số 24', isCorrect: false },
            { id: 'sq5-c', text: 'Số 25', isCorrect: true },
            { id: 'sq5-d', text: 'Số 26', isCorrect: false }
          ],
          explanation: 'Nửa vòng tròn có 32 : 2 = 16 bước. Người đối diện với số 9 là: 9 + 16 = 25!'
        }
      ]
    }
  }
];


