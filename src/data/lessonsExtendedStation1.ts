import { LessonQuestion, BENNY, CASEY, MAYLE, topicName } from './lessonTypes';

export const EXTENDED_PICTOGRAPH_LESSONS: LessonQuestion[] = [
  {
    id: 'pic-23',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Phân Tích Đa Chiều: Trạm Khí Tượng Rừng Xanh',
    badgeTitle: 'Bài 23 · Độ khó Cấp 10',
    instruction: 'Quan sát biểu đồ đo lượng mưa của trạm khí tượng qua 4 mùa. Chú ý: Mỗi biểu tượng đám mây mưa 🌧️ đại diện cho 15 mm lượng mưa thực tế.',
    hint: 'Nhân số đám mây với 15 mm, hoặc lấy hiệu số đám mây nhân với 15 khi so sánh.',
    mascot: { ...BENNY, message: 'Lượng mưa thay đổi theo mùa đấy các bạn nhỏ! Hãy nhân thật chuẩn bội số 15 nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🌧️ = 15 mm lượng mưa',
      multiplier: 15,
      items: [
        { id: 'spring', label: 'Mùa Xuân', icon: '🌧️', count: 4, actualValue: 60, unit: 'mm' },
        { id: 'summer', label: 'Mùa Hạ', icon: '🌧️', count: 6, actualValue: 90, unit: 'mm' },
        { id: 'autumn', label: 'Mùa Thu', icon: '🌧️', count: 5, actualValue: 75, unit: 'mm' },
        { id: 'winter', label: 'Mùa Đông', icon: '🌧️', count: 3, actualValue: 45, unit: 'mm' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Lượng mưa thực tế đo được vào Mùa Hạ là bao nhiêu mm?',
          options: ['75 mm', '85 mm', '90 mm', '105 mm'],
          correctAnswer: '90 mm'
        },
        {
          id: 'q2',
          prompt: 'Mùa Hạ có lượng mưa nhiều hơn Mùa Đông bao nhiêu mm?',
          options: ['30 mm', '45 mm', '50 mm', '60 mm'],
          correctAnswer: '45 mm'
        },
        {
          id: 'q3',
          prompt: 'Tổng lượng mưa tích lũy của cả 4 mùa trong năm là bao nhiêu mm?',
          options: ['240 mm', '255 mm', '270 mm', '285 mm'],
          correctAnswer: '270 mm'
        }
      ]
    }
  },
  {
    id: 'pic-24',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thiết Kế Dữ Liệu: Nhà Máy Năng Lượng Xanh',
    badgeTitle: 'Bài 24 · Độ khó Cấp 11',
    instruction: 'Em hãy giúp Kỹ sư Benny vẽ biểu đồ sản lượng điện: Mỗi tia sét ⚡ đại diện cho 8 MWh điện. Tổng sản lượng cần đạt là 120 MWh (tương ứng 15 tia sét).',
    hint: 'Chia sản lượng mỗi loại cho 8: 40:8=5, 32:8=4, 24:8=3.',
    mascot: { ...BENNY, message: 'Bấm dấu ＋ để thêm tia sét và dấu － để bớt nhé bạn thân yêu!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 8,
      totalPeople: 120,
      categories: [
        { id: 'wind', label: 'Điện Gió (40 MWh)', targetSymbols: 5, symbolColor: 'bg-emerald-500' },
        { id: 'solar', label: 'Điện Mặt Trời (32 MWh)', targetSymbols: 4, symbolColor: 'bg-amber-500' },
        { id: 'hydro', label: 'Thủy Điện (24 MWh)', targetSymbols: 3, symbolColor: 'bg-sky-500' },
        { id: 'biomass', label: 'Năng Lượng Sinh Khối (24 MWh)', targetSymbols: 3, symbolColor: 'bg-lime-500' }
      ]
    }
  },
  {
    id: 'pic-25',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Bài Toán Tỉ Số Kép: Chuyến Tàu Xuyên Lục Địa',
    badgeTitle: 'Bài 25 · Độ khó Cấp 12',
    instruction: 'Đọc dữ liệu hành khách đón tại 4 ga của đoàn tàu siêu tốc. Quy ước: Mỗi biểu tượng toa tàu 🚃 đại diện cho 20 hành khách.',
    hint: 'Mỗi 🚃 = 20 khách. Ga Rừng Thông có 7 toa = 140 khách.',
    mascot: { ...CASEY, message: 'Đoàn tàu dài chở thật nhiều hành khách! Hãy tính toán từng chặng ga nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🚃 = 20 hành khách',
      multiplier: 20,
      items: [
        { id: 'station-dawn', label: 'Ga Bình Minh', icon: '🚃', count: 5, actualValue: 100, unit: 'khách' },
        { id: 'station-meadow', label: 'Ga Thảo Nguyên', icon: '🚃', count: 4, actualValue: 80, unit: 'khách' },
        { id: 'station-pine', label: 'Ga Rừng Thông', icon: '🚃', count: 7, actualValue: 140, unit: 'khách' },
        { id: 'station-north', label: 'Ga Cực Bắc', icon: '🚃', count: 6, actualValue: 120, unit: 'khách' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Ga Rừng Thông có bao nhiêu hành khách lên tàu?',
          options: ['120 khách', '130 khách', '140 khách', '160 khách'],
          correctAnswer: '140 khách'
        },
        {
          id: 'q2',
          prompt: 'Ga Rừng Thông đón nhiều hơn Ga Thảo Nguyên bao nhiêu hành khách?',
          options: ['40 khách', '50 khách', '60 khách', '70 khách'],
          correctAnswer: '60 khách'
        },
        {
          id: 'q3',
          prompt: 'Tổng cộng có bao nhiêu hành khách được đón tại cả 4 ga?',
          options: ['400 khách', '420 khách', '440 khách', '460 khách'],
          correctAnswer: '440 khách'
        }
      ]
    }
  },
  {
    id: 'pic-26',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Biểu Đồ Hai Tầng Đơn Vị: Nông Trại Mật Ong Rừng',
    badgeTitle: 'Bài 26 · Độ khó Cấp 13',
    instruction: 'Khảo sát sản lượng mật ong của 4 đội nuôi ong. Quy ước: Mỗi hũ mật 🍯 đại diện cho 25 lít mật ong nguyên chất.',
    hint: 'Bội số 25: 1 hũ = 25L, 2 hũ = 50L, 3 hũ = 75L, 4 hũ = 100L...',
    mascot: { ...BENNY, message: 'Mật ong ngọt ngào chứa đựng bài toán giá trị hấp dẫn!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🍯 = 25 lít mật ong',
      multiplier: 25,
      items: [
        { id: 'team1', label: 'Tổ Hoa Tràm', icon: '🍯', count: 3, actualValue: 75, unit: 'lít' },
        { id: 'team2', label: 'Tổ Hoa Nhãn', icon: '🍯', count: 5, actualValue: 125, unit: 'lít' },
        { id: 'team3', label: 'Tổ Hoa Cà Phê', icon: '🍯', count: 4, actualValue: 100, unit: 'lít' },
        { id: 'team4', label: 'Tổ Hoa Bạc Hà', icon: '🍯', count: 6, actualValue: 150, unit: 'lít' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Tổ Hoa Bạc Hà thu hoạch được bao nhiêu lít mật ong?',
          options: ['125 lít', '140 lít', '150 lít', '175 lít'],
          correctAnswer: '150 lít'
        },
        {
          id: 'q2',
          prompt: 'Nếu mỗi lít mật ong bán được 4 đô la, thì Tổ Hoa Tràm thu về bao nhiêu tiền?',
          options: ['250 đô la', '280 đô la', '300 đô la', '320 đô la'],
          correctAnswer: '300 đô la'
        },
        {
          id: 'q3',
          prompt: 'Tổng sản lượng mật ong của cả 4 tổ là bao nhiêu lít?',
          options: ['400 lít', '425 lít', '450 lít', '475 lít'],
          correctAnswer: '450 lít'
        }
      ]
    }
  },
  {
    id: 'pic-27',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Xây Dựng Biểu Đồ Thống Kê: Dự Án Phủ Xanh Đồi Trọc',
    badgeTitle: 'Bài 27 · Độ khó Cấp 14',
    instruction: 'Thiết kế biểu đồ số cây xanh trồng được. Quy ước: Mỗi biểu tượng cây 🌲 đại diện cho 12 cây. Tổng số cây là 144 cây (tương ứng 12 biểu tượng).',
    hint: 'Chia từng loại: Cây Thông: 48:12=4, Cây Keo: 36:12=3, Cây Bạch Đàn: 24:12=2, Cây Xà Cừ: 36:12=3.',
    mascot: { ...MAYLE, message: 'Hãy trồng thật nhiều cây xanh cho đất nước em nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 12,
      totalPeople: 144,
      categories: [
        { id: 'pine', label: 'Cây Thông (48 cây)', targetSymbols: 4, symbolColor: 'bg-emerald-600' },
        { id: 'acacia', label: 'Cây Keo (36 cây)', targetSymbols: 3, symbolColor: 'bg-green-500' },
        { id: 'eucalyptus', label: 'Cây Bạch Đàn (24 cây)', targetSymbols: 2, symbolColor: 'bg-teal-500' },
        { id: 'mahogany', label: 'Cây Xà Cừ (36 cây)', targetSymbols: 3, symbolColor: 'bg-lime-600' }
      ]
    }
  },
  {
    id: 'pic-28',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thám Tử Tìm Ẩn Số: Kho Lương Thực Mùa Đông Của Sóc Con',
    badgeTitle: 'Bài 28 · Độ khó Cấp 15',
    instruction: 'Khảo sát số hạt dẻ cất trữ trong 4 kho bí mật. Quy ước: Mỗi biểu tượng hạt dẻ 🌰 đại diện cho 30 hạt.',
    hint: 'Bội số 30: 4 hạt = 120, 5 hạt = 150, 3 hạt = 90, 6 hạt = 180.',
    mascot: { ...CASEY, message: 'Sóc con gom góp hạt dẻ rất chăm chỉ! Em hãy giải mã phép chia đều nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🌰 = 30 hạt dẻ',
      multiplier: 30,
      items: [
        { id: 'oak-tree', label: 'Kho Gốc Cây Sồi', icon: '🌰', count: 4, actualValue: 120, unit: 'hạt' },
        { id: 'rock-cave', label: 'Kho Hốc Đá', icon: '🌰', count: 5, actualValue: 150, unit: 'hạt' },
        { id: 'earth-tunnel', label: 'Kho Hang Đất', icon: '🌰', count: 3, actualValue: 90, unit: 'hạt' },
        { id: 'secret-canopy', label: 'Kho Tán Lá Bí Mật', icon: '🌰', count: 6, actualValue: 180, unit: 'hạt' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Hai kho lớn nhất (Kho Hốc Đá và Kho Tán Lá) có tổng cộng bao nhiêu hạt dẻ?',
          options: ['310 hạt', '320 hạt', '330 hạt', '350 hạt'],
          correctAnswer: '330 hạt'
        },
        {
          id: 'q2',
          prompt: 'Kho Tán Lá Bí Mật nhiều hơn Kho Hang Đất bao nhiêu hạt dẻ?',
          options: ['60 hạt', '80 hạt', '90 hạt', '100 hạt'],
          correctAnswer: '90 hạt'
        },
        {
          id: 'q3',
          prompt: 'Nếu sóc đem chia đều toàn bộ số hạt của cả 4 kho cho 9 chú sóc con, mỗi chú sóc được mấy hạt?',
          options: ['50 hạt', '55 hạt', '60 hạt', '65 hạt'],
          correctAnswer: '60 hạt'
        }
      ]
    }
  },
  {
    id: 'pic-29',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Tỷ Lệ So Sánh Đối Kháng: Cuộc Đua Thuyền Rồng Bốn Đội',
    badgeTitle: 'Bài 29 · Độ khó Cấp 16',
    instruction: 'Bảng xếp hạng điểm tích lũy của 4 đội đua thuyền rồng. Quy ước: Mỗi lá cờ chiến thắng 🚩 đại diện cho 16 điểm.',
    hint: 'Bạch Hổ có 8 cờ = 128 điểm. Phượng Hoàng có 5 cờ = 80 điểm.',
    mascot: { ...BENNY, message: 'Đường đua kịch tính! Hãy so sánh số cờ trước khi nhân để tính thật nhanh!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🚩 = 16 điểm thi đấu',
      multiplier: 16,
      items: [
        { id: 'dragon', label: 'Đội Rồng Vàng', icon: '🚩', count: 7, actualValue: 112, unit: 'điểm' },
        { id: 'phoenix', label: 'Đội Phượng Hoàng', icon: '🚩', count: 5, actualValue: 80, unit: 'điểm' },
        { id: 'unicorn', label: 'Đội Kỳ Lân', icon: '🚩', count: 6, actualValue: 96, unit: 'điểm' },
        { id: 'tiger', label: 'Đội Bạch Hổ', icon: '🚩', count: 8, actualValue: 128, unit: 'điểm' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Đội Bạch Hổ giành được tổng cộng bao nhiêu điểm thi đấu?',
          options: ['116 điểm', '120 điểm', '128 điểm', '132 điểm'],
          correctAnswer: '128 điểm'
        },
        {
          id: 'q2',
          prompt: 'Khoảng cách điểm số giữa đội về Nhất (Bạch Hổ) và đội về Chót (Phượng Hoàng) là bao nhiêu?',
          options: ['32 điểm', '40 điểm', '48 điểm', '56 điểm'],
          correctAnswer: '48 điểm'
        },
        {
          id: 'q3',
          prompt: 'Tổng điểm của hai đội dẫn đầu (Bạch Hổ và Rồng Vàng) là bao nhiêu điểm?',
          options: ['220 điểm', '232 điểm', '240 điểm', '248 điểm'],
          correctAnswer: '240 điểm'
        }
      ]
    }
  },
  {
    id: 'pic-30',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Biểu Đồ Thống Kê Hội Chợ Sách Quốc Tế: Bội Số Lớn 50',
    badgeTitle: 'Bài 30 · Độ khó Cấp 17',
    instruction: 'Đọc số lượng sách trưng bày tại 4 gian hàng hội chợ. Quy ước: Mỗi biểu tượng tập sách 📚 đại diện cho 50 cuốn sách.',
    hint: 'Mỗi 📚 = 50 cuốn. Đếm số biểu tượng rồi nhân với 50.',
    mascot: { ...MAYLE, message: 'Số liệu lớn hơn đòi hỏi sự tập trung cao độ, hãy bình tĩnh tính toán nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '📚 = 50 cuốn sách',
      multiplier: 50,
      items: [
        { id: 'comic', label: 'Gian Hàng Truyện Tranh', icon: '📚', count: 6, actualValue: 300, unit: 'cuốn' },
        { id: 'science', label: 'Gian Hàng Khoa Học', icon: '📚', count: 5, actualValue: 250, unit: 'cuốn' },
        { id: 'history', label: 'Gian Hàng Lịch Sử', icon: '📚', count: 4, actualValue: 200, unit: 'cuốn' },
        { id: 'literature', label: 'Gian Hàng Văn Học', icon: '📚', count: 7, actualValue: 350, unit: 'cuốn' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Gian Hàng Văn Học trưng bày bao nhiêu cuốn sách?',
          options: ['300 cuốn', '325 cuốn', '350 cuốn', '400 cuốn'],
          correctAnswer: '350 cuốn'
        },
        {
          id: 'q2',
          prompt: 'Hai gian hàng Truyện Tranh và Khoa Học có tổng cộng bao nhiêu cuốn sách?',
          options: ['500 cuốn', '550 cuốn', '600 cuốn', '650 cuốn'],
          correctAnswer: '550 cuốn'
        },
        {
          id: 'q3',
          prompt: 'Toàn bộ số sách của cả 4 gian hàng được đóng vào các thùng, mỗi thùng 100 cuốn. Cần bao nhiêu thùng?',
          options: ['10 thùng', '11 thùng', '12 thùng', '14 thùng'],
          correctAnswer: '11 thùng'
        }
      ]
    }
  },
  {
    id: 'pic-31',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Xây Dựng Biểu Đồ Cấp Cao: Hạm Đội Thám Hiểm Ngân Hà',
    badgeTitle: 'Bài 31 · Độ khó Cấp 18',
    instruction: 'Lắp ráp biểu đồ hạm đội tàu vũ trụ: Mỗi phi thuyền 🚀 đại diện cho 25 tàu chiến không gian. Tổng cộng hạm đội có 300 tàu (tương ứng 12 biểu tượng).',
    hint: 'Sao Hỏa: 100:25=4 tàu; Sao Kim: 75:25=3 tàu; Sao Mộc: 75:25=3 tàu; Sao Thổ: 50:25=2 tàu.',
    mascot: { ...BENNY, message: 'Bay vào không gian cùng hạm đội Spark Math! Đặt đúng số lượng phi thuyền nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 25,
      totalPeople: 300,
      categories: [
        { id: 'mars', label: 'Chiến Hạm Sao Hỏa (100 tàu)', targetSymbols: 4, symbolColor: 'bg-red-500' },
        { id: 'venus', label: 'Tàu Thám Hiểm Sao Kim (75 tàu)', targetSymbols: 3, symbolColor: 'bg-amber-400' },
        { id: 'jupiter', label: 'Tuần Dương Hạm Sao Mộc (75 tàu)', targetSymbols: 3, symbolColor: 'bg-orange-500' },
        { id: 'saturn', label: 'Trinh Sát Hạm Sao Thổ (50 tàu)', targetSymbols: 2, symbolColor: 'bg-purple-500' }
      ]
    }
  },
  {
    id: 'pic-32',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'ĐẠI THỬ THÁCH TRẠM 1: Đỉnh Cao Bậc Thầy Biểu Đồ Tranh',
    badgeTitle: 'Bài 32 · Đỉnh Cao Trạm 1 Mở Rộng',
    instruction: 'Đại khảo sát kho báu kim cương ma thuật trải dài trên 5 vùng lãnh thổ. Quy ước: Mỗi viên kim cương 💎 đại diện cho 40 viên thực tế.',
    hint: 'Tổng số biểu tượng: 5 + 7 + 4 + 8 + 6 = 30 biểu tượng. Tổng kim cương: 30 × 40 = 1200 viên.',
    mascot: { ...MAYLE, message: 'Thử thách tối hậu của Trạm 1! Vượt qua bài này em sẽ được phong danh hiệu Đại Kiện Tướng Thống Kê!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '💎 = 40 viên kim cương',
      multiplier: 40,
      items: [
        { id: 'crystal-sea', label: 'Vùng Biển Pha Lê', icon: '💎', count: 5, actualValue: 200, unit: 'viên' },
        { id: 'sun-forest', label: 'Vùng Rừng Ánh Dương', icon: '💎', count: 7, actualValue: 280, unit: 'viên' },
        { id: 'ice-mountain', label: 'Vùng Núi Băng Tuyết', icon: '💎', count: 4, actualValue: 160, unit: 'viên' },
        { id: 'royal-castle', label: 'Vùng Lâu Đài Trung Tâm', icon: '💎', count: 8, actualValue: 320, unit: 'viên' },
        { id: 'oasis-desert', label: 'Vùng Ốc Đảo Sa Mạc', icon: '💎', count: 6, actualValue: 240, unit: 'viên' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Vùng lãnh thổ nào sở hữu nhiều kim cương nhất và cụ thể là bao nhiêu viên?',
          options: ['Vùng Rừng Ánh Dương: 280 viên', 'Vùng Lâu Đài Trung Tâm: 320 viên', 'Vùng Biển Pha Lê: 200 viên', 'Vùng Ốc Đảo Sa Mạc: 240 viên'],
          correctAnswer: 'Vùng Lâu Đài Trung Tâm: 320 viên'
        },
        {
          id: 'q2',
          prompt: 'Hiệu số kim cương giữa vùng giàu nhất (Lâu Đài) và vùng ít nhất (Núi Băng Tuyết) là bao nhiêu?',
          options: ['120 viên', '140 viên', '160 viên', '180 viên'],
          correctAnswer: '160 viên'
        },
        {
          id: 'q3',
          prompt: 'Tổng toàn bộ số kim cương được phát hiện tại cả 5 vùng lãnh thổ là bao nhiêu viên?',
          options: ['1080 viên', '1160 viên', '1200 viên', '1240 viên'],
          correctAnswer: '1200 viên'
        }
      ]
    }
  },
  {
    id: 'pic-33',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Vận Tải Đường Biển Quốc Tế: Đội Tàu Hàng Xanh',
    badgeTitle: 'Bài 33 · Độ khó Cấp 19',
    instruction: 'Đội tàu biển vận chuyển 4 loại hàng hóa quan trọng giữa các lục địa. Quy ước: Mỗi biểu tượng container 🚢 đại diện cho 50 tấn hàng hóa.',
    hint: 'Nhân số biểu tượng với 50 tấn: Ngũ cốc 6 tàu = 300 tấn, Thiết bị 4 tàu = 200 tấn, Nông sản 5 tàu = 250 tấn, Nhiên liệu sạch 3 tàu = 150 tấn.',
    mascot: { ...BENNY, message: 'Đại dương bao la đón đoàn tàu hàng! Hãy nhân thật nhanh bội số 50 nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🚢 = 50 tấn hàng hóa',
      multiplier: 50,
      items: [
        { id: 'grain', label: 'Ngũ Cốc Lương Thực', icon: '🚢', count: 6, actualValue: 300, unit: 'tấn' },
        { id: 'equipment', label: 'Thiết Bị Điện Tử', icon: '🚢', count: 4, actualValue: 200, unit: 'tấn' },
        { id: 'farm', label: 'Nông Sản Xuất Khẩu', icon: '🚢', count: 5, actualValue: 250, unit: 'tấn' },
        { id: 'fuel', label: 'Nhiên Liệu Xanh', icon: '🚢', count: 3, actualValue: 150, unit: 'tấn' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Khối lượng ngũ cốc lương thực được vận chuyển là bao nhiêu tấn?',
          options: ['250 tấn', '300 tấn', '350 tấn', '400 tấn'],
          correctAnswer: '300 tấn'
        },
        {
          id: 'q2',
          prompt: 'Ngũ cốc nhiều hơn nhiên liệu xanh bao nhiêu tấn hàng?',
          options: ['100 tấn', '150 tấn', '200 tấn', '250 tấn'],
          correctAnswer: '150 tấn'
        },
        {
          id: 'q3',
          prompt: 'Tổng khối lượng hàng hóa của cả 4 chuyến tàu vận tải là bao nhiêu tấn?',
          options: ['800 tấn', '850 tấn', '900 tấn', '950 tấn'],
          correctAnswer: '900 tấn'
        }
      ]
    }
  },
  {
    id: 'pic-34',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thiết Kế Biểu Đồ Công Viên Sinh Thái Xanh',
    badgeTitle: 'Bài 34 · Độ khó Cấp 20',
    instruction: 'Em hãy giúp Kỹ sư Benny thiết kế biểu đồ trồng cây: Mỗi cây xanh 🌳 đại diện cho 15 cây thực tế. Tổng số cây cần trồng là 225 cây (tương ứng 15 biểu tượng).',
    hint: 'Cây bóng mát: 75 : 15 = 5 cây. Cây ăn quả: 60 : 15 = 4 cây. Cây hoa: 45 : 15 = 3 cây. Cây dược liệu: 45 : 15 = 3 cây.',
    mascot: { ...BENNY, message: 'Công viên sinh thái ngát hương! Bấm ＋ để trồng cây và － để chỉnh sửa nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 15,
      totalPeople: 225,
      categories: [
        { id: 'shade', label: 'Cây Bóng Mát (75 cây)', targetSymbols: 5, symbolColor: 'bg-emerald-600' },
        { id: 'fruit', label: 'Cây Ăn Quả (60 cây)', targetSymbols: 4, symbolColor: 'bg-lime-500' },
        { id: 'flower', label: 'Cây Hoa Cảnh (45 cây)', targetSymbols: 3, symbolColor: 'bg-pink-500' },
        { id: 'herbs', label: 'Cây Dược Liệu (45 cây)', targetSymbols: 3, symbolColor: 'bg-teal-500' }
      ]
    }
  },
  {
    id: 'pic-35',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thời Gian Nghiên Cứu Thiên Văn 4 Trạm Quan Sát',
    badgeTitle: 'Bài 35 · Độ khó Cấp 21',
    instruction: 'Bốn trạm quan sát bầu trời ghi nhận số giờ ngắm sao trong tháng. Mỗi kính thiên văn 🔭 đại diện cho 25 giờ nghiên cứu.',
    hint: 'Nhân số biểu tượng với 25: Trạm Bắc 6 = 150h, Trạm Nam 8 = 200h, Trạm Đông 5 = 125h, Trạm Tây 7 = 175h.',
    mascot: { ...CASEY, message: 'Kính thiên văn đưa chúng ta chạm vào ngàn vì sao xa xôi!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🔭 = 25 giờ quan sát',
      multiplier: 25,
      items: [
        { id: 'north', label: 'Trạm Cực Bắc', icon: '🔭', count: 6, actualValue: 150, unit: 'giờ' },
        { id: 'south', label: 'Trạm Cực Nam', icon: '🔭', count: 8, actualValue: 200, unit: 'giờ' },
        { id: 'east', label: 'Trạm Phía Đông', icon: '🔭', count: 5, actualValue: 125, unit: 'giờ' },
        { id: 'west', label: 'Trạm Phía Tây', icon: '🔭', count: 7, actualValue: 175, unit: 'giờ' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Trạm Cực Nam đã thực hiện bao nhiêu giờ quan sát?',
          options: ['175 giờ', '180 giờ', '200 giờ', '225 giờ'],
          correctAnswer: '200 giờ'
        },
        {
          id: 'q2',
          prompt: 'Trạm Cực Nam nhiều hơn Trạm Phía Đông bao nhiêu giờ?',
          options: ['50 giờ', '75 giờ', '80 giờ', '100 giờ'],
          correctAnswer: '75 giờ'
        },
        {
          id: 'q3',
          prompt: 'Tổng thời gian nghiên cứu của cả 4 trạm là bao nhiêu giờ?',
          options: ['600 giờ', '625 giờ', '650 giờ', '675 giờ'],
          correctAnswer: '650 giờ'
        }
      ]
    }
  },
  {
    id: 'pic-36',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Năng Lượng Tua-bin Gió Qua 4 Mùa',
    badgeTitle: 'Bài 36 · Độ khó Cấp 22',
    instruction: 'Trang trại năng lượng gió ghi nhận công suất phát điện theo quý. Quy ước: Mỗi cánh quạt gió 🌀 đại diện cho 30 Megawatt (MW).',
    hint: 'Quý 1: 5 x 30 = 150 MW. Quý 2: 7 x 30 = 210 MW. Quý 3: 4 x 30 = 120 MW. Quý 4: 8 x 30 = 240 MW.',
    mascot: { ...MAYLE, message: 'Năng lượng sạch bảo vệ môi trường Trái Đất thân yêu!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🌀 = 30 MW điện sạch',
      multiplier: 30,
      items: [
        { id: 'q1-season', label: 'Quý 1 (Mùa Xuân)', icon: '🌀', count: 5, actualValue: 150, unit: 'MW' },
        { id: 'q2-season', label: 'Quý 2 (Mùa Hạ)', icon: '🌀', count: 7, actualValue: 210, unit: 'MW' },
        { id: 'q3-season', label: 'Quý 3 (Mùa Thu)', icon: '🌀', count: 4, actualValue: 120, unit: 'MW' },
        { id: 'q4-season', label: 'Quý 4 (Mùa Đông)', icon: '🌀', count: 8, actualValue: 240, unit: 'MW' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Quý 4 (Mùa Đông) phát được bao nhiêu Megawatt điện?',
          options: ['210 MW', '240 MW', '270 MW', '300 MW'],
          correctAnswer: '240 MW'
        },
        {
          id: 'q2',
          prompt: 'Hiệu số công suất giữa Quý cao nhất (Quý 4) và Quý thấp nhất (Quý 3) là bao nhiêu MW?',
          options: ['90 MW', '100 MW', '120 MW', '150 MW'],
          correctAnswer: '120 MW'
        },
        {
          id: 'q3',
          prompt: 'Tổng sản lượng điện sạch phát ra trong cả năm là bao nhiêu MW?',
          options: ['680 MW', '720 MW', '750 MW', '780 MW'],
          correctAnswer: '720 MW'
        }
      ]
    }
  },
  {
    id: 'pic-37',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thiết Kế Trạm Phóng Tàu Không Gian 4 Đội Tàu',
    badgeTitle: 'Bài 37 · Độ khó Cấp 23',
    instruction: 'Giúp Chỉ huy Abby sắp xếp 300 phi thuyền vào 4 phân khu. Quy ước: Mỗi biểu tượng phi thuyền 🚀 đại diện cho 20 tàu vũ trụ (tổng cộng 15 biểu tượng).',
    hint: 'Phân khu Alpha: 100 : 20 = 5 tàu. Beta: 80 : 20 = 4 tàu. Gamma: 60 : 20 = 3 tàu. Delta: 60 : 20 = 3 tàu.',
    mascot: { ...BENNY, message: 'Sẵn sàng khởi động bệ phóng tên lửa vào không gian!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 20,
      totalPeople: 300,
      categories: [
        { id: 'alpha', label: 'Đội Tàu Alpha (100 tàu)', targetSymbols: 5, symbolColor: 'bg-cyan-500' },
        { id: 'beta', label: 'Đội Tàu Beta (80 tàu)', targetSymbols: 4, symbolColor: 'bg-indigo-500' },
        { id: 'gamma', label: 'Đội Tàu Gamma (60 tàu)', targetSymbols: 3, symbolColor: 'bg-amber-500' },
        { id: 'delta', label: 'Đội Tàu Delta (60 tàu)', targetSymbols: 3, symbolColor: 'bg-rose-500' }
      ]
    }
  },
  {
    id: 'pic-38',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Khảo Sát Tảng Băng Bắc Cực & Lưu Vực Sông Băng',
    badgeTitle: 'Bài 38 · Độ khó Cấp 24',
    instruction: 'Nhóm nghiên cứu địa chất đo lường trữ lượng nước ngọt tại 4 sông băng. Quy ước: Mỗi khối băng 🧊 đại diện cho 35 triệu mét khối nước.',
    hint: 'Sông băng A: 4 x 35 = 140. Sông băng B: 6 x 35 = 210. Sông băng C: 5 x 35 = 175. Sông băng D: 3 x 35 = 105.',
    mascot: { ...MAYLE, message: 'Bảo tồn nguồn nước ngọt quý giá cho tương lai hành tinh!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🧊 = 35 triệu m³ nước ngọt',
      multiplier: 35,
      items: [
        { id: 'glacier-a', label: 'Sông Băng Aurora', icon: '🧊', count: 4, actualValue: 140, unit: 'triệu m³' },
        { id: 'glacier-b', label: 'Sông Băng Boreal', icon: '🧊', count: 6, actualValue: 210, unit: 'triệu m³' },
        { id: 'glacier-c', label: 'Sông Băng Crystal', icon: '🧊', count: 5, actualValue: 175, unit: 'triệu m³' },
        { id: 'glacier-d', label: 'Sông Băng Diamond', icon: '🧊', count: 3, actualValue: 105, unit: 'triệu m³' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Sông băng Boreal có trữ lượng nước ngọt là bao nhiêu triệu m³?',
          options: ['175 triệu m³', '210 triệu m³', '245 triệu m³', '280 triệu m³'],
          correctAnswer: '210 triệu m³'
        },
        {
          id: 'q2',
          prompt: 'Sông băng Boreal nhiều hơn Sông băng Diamond bao nhiêu triệu m³?',
          options: ['70 triệu m³', '105 triệu m³', '140 triệu m³', '175 triệu m³'],
          correctAnswer: '105 triệu m³'
        },
        {
          id: 'q3',
          prompt: 'Tổng trữ lượng nước ngọt của cả 4 sông băng là bao nhiêu triệu m³?',
          options: ['595 triệu m³', '630 triệu m³', '665 triệu m³', '700 triệu m³'],
          correctAnswer: '630 triệu m³'
        }
      ]
    }
  },
  {
    id: 'pic-39',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Hội Thao Toán Học & Khoa Học Toàn Quốc',
    badgeTitle: 'Bài 39 · Độ khó Cấp 25',
    instruction: 'Số lượng thí sinh tham gia 4 môn thi đấu trí tuệ. Quy ước: Mỗi huy chương 🏅 đại diện cho 45 thí sinh xuất sắc.',
    hint: 'Nhân số huy chương với 45: Toán tư duy 7 x 45 = 315; Cờ vua 5 x 45 = 225; Lập trình 6 x 45 = 270; Thiên văn 4 x 45 = 180.',
    mascot: { ...BENNY, message: 'Đấu trí đỉnh cao tại hội thao trí tuệ toàn quốc!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🏅 = 45 thí sinh tài năng',
      multiplier: 45,
      items: [
        { id: 'math', label: 'Toán Tư Duy Sáng Tạo', icon: '🏅', count: 7, actualValue: 315, unit: 'thí sinh' },
        { id: 'chess', label: 'Cờ Vua Trí Tuệ', icon: '🏅', count: 5, actualValue: 225, unit: 'thí sinh' },
        { id: 'coding', label: 'Lập Trình Robot Nhí', icon: '🏅', count: 6, actualValue: 270, unit: 'thí sinh' },
        { id: 'astro', label: 'Khám Phá Thiên Văn', icon: '🏅', count: 4, actualValue: 180, unit: 'thí sinh' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Môn Toán Tư Duy có bao nhiêu thí sinh tham gia tranh tài?',
          options: ['270 thí sinh', '300 thí sinh', '315 thí sinh', '360 thí sinh'],
          correctAnswer: '315 thí sinh'
        },
        {
          id: 'q2',
          prompt: 'Số thí sinh môn Toán nhiều hơn môn Thiên Văn là bao nhiêu bạn?',
          options: ['90 thí sinh', '115 thí sinh', '135 thí sinh', '150 thí sinh'],
          correctAnswer: '135 thí sinh'
        },
        {
          id: 'q3',
          prompt: 'Tổng số thí sinh của cả 4 môn thi đấu là bao nhiêu bạn?',
          options: ['945 thí sinh', '990 thí sinh', '1020 thí sinh', '1080 thí sinh'],
          correctAnswer: '990 thí sinh'
        }
      ]
    }
  },
  {
    id: 'pic-40',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thiết Kế Mạng Lưới Tiếp Tế Trạm Không Gian',
    badgeTitle: 'Bài 40 · Độ khó Cấp 26',
    instruction: 'Em hãy giúp Đội Trưởng Casey phân bổ 240 kiện hàng vào 4 khoang tiếp tế. Quy ước: Mỗi kiện hàng 📦 đại diện cho 16 kiện thực tế (tổng 15 biểu tượng).',
    hint: 'Khoang Oxy: 80 : 16 = 5. Khoang Lương thực: 64 : 16 = 4. Khoang Nước: 48 : 16 = 3. Khoang Thuốc men: 48 : 16 = 3.',
    mascot: { ...CASEY, message: 'Kiểm tra kỹ lưỡng từng kiện hàng trước khi phóng nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 16,
      totalPeople: 240,
      categories: [
        { id: 'oxygen', label: 'Khoang Bình Oxy (80 kiện)', targetSymbols: 5, symbolColor: 'bg-sky-500' },
        { id: 'food', label: 'Khoang Lương Thực Khô (64 kiện)', targetSymbols: 4, symbolColor: 'bg-amber-600' },
        { id: 'water', label: 'Khoang Nước Tinh Khiết (48 kiện)', targetSymbols: 3, symbolColor: 'bg-blue-600' },
        { id: 'meds', label: 'Khoang Thuốc Y Tế (48 kiện)', targetSymbols: 3, symbolColor: 'bg-red-500' }
      ]
    }
  },
  {
    id: 'pic-41',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Đường Đua Phi Thuyền Công Nghệ Cao Siêu Tốc',
    badgeTitle: 'Bài 41 · Độ khó Cấp 27',
    instruction: 'Đo quãng đường bay thử nghiệm của 4 dòng động cơ phản lực mới. Quy ước: Mỗi tia chớp ⚡ đại diện cho 60 hải lý không gian.',
    hint: 'Động cơ Plasma: 6 x 60 = 360; Động cơ Ion: 8 x 60 = 480; Động cơ Photon: 5 x 60 = 300; Động cơ Lượng tử: 7 x 60 = 420.',
    mascot: { ...MAYLE, message: 'Vận tốc vượt thời không! Tính toán chuẩn xác từng hải lý!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '⚡ = 60 hải lý không gian',
      multiplier: 60,
      items: [
        { id: 'plasma', label: 'Động Cơ Plasma', icon: '⚡', count: 6, actualValue: 360, unit: 'hải lý' },
        { id: 'ion', label: 'Động Cơ Ion Siêu Dẫn', icon: '⚡', count: 8, actualValue: 480, unit: 'hải lý' },
        { id: 'photon', label: 'Động Cơ Ánh Sáng Photon', icon: '⚡', count: 5, actualValue: 300, unit: 'hải lý' },
        { id: 'quantum', label: 'Động Cơ Lượng Tử Mới', icon: '⚡', count: 7, actualValue: 420, unit: 'hải lý' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Động cơ Ion Siêu Dẫn đã bay được quãng đường thử nghiệm là bao nhiêu hải lý?',
          options: ['420 hải lý', '460 hải lý', '480 hải lý', '540 hải lý'],
          correctAnswer: '480 hải lý'
        },
        {
          id: 'q2',
          prompt: 'Động cơ Ion bay xa hơn Động cơ Photon bao nhiêu hải lý?',
          options: ['120 hải lý', '160 hải lý', '180 hải lý', '200 hải lý'],
          correctAnswer: '180 hải lý'
        },
        {
          id: 'q3',
          prompt: 'Tổng quãng đường bay thử nghiệm của cả 4 động cơ là bao nhiêu hải lý?',
          options: ['1440 hải lý', '1500 hải lý', '1560 hải lý', '1620 hải lý'],
          correctAnswer: '1560 hải lý'
        }
      ]
    }
  },
  {
    id: 'pic-42',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'SIÊU THỬ THÁCH OLYMPIC TRẠM 1: Đại Khảo Sát Tinh Vân Toàn Vũ Trụ',
    badgeTitle: 'Bài 42 · Đỉnh Cao Trạm 1 Tuyệt Đối',
    instruction: 'Đại khảo sát 5 tinh vân rực rỡ nhất dải ngân hà. Quy ước: Mỗi ngôi sao tinh vân ⭐ đại diện cho 50 năm ánh sáng đường kính.',
    hint: 'Sao tinh vân: 8 + 6 + 9 + 5 + 7 = 35 ngôi sao. Tổng đường kính: 35 × 50 = 1750 năm ánh sáng.',
    mascot: { ...MAYLE, message: 'Đỉnh cao tối thượng của Trạm 1! Vượt qua bài này em được vinh danh là Huyền Thoại Biểu Đồ Tranh!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '⭐ = 50 năm ánh sáng',
      multiplier: 50,
      items: [
        { id: 'nebula-orion', label: 'Tinh Vân Thợ Săn', icon: '⭐', count: 8, actualValue: 400, unit: 'năm ánh sáng' },
        { id: 'nebula-eagle', label: 'Tinh Vân Đại Bàng', icon: '⭐', count: 6, actualValue: 300, unit: 'năm ánh sáng' },
        { id: 'nebula-carina', label: 'Tinh Vân Thuyền Viễn Xứ', icon: '⭐', count: 9, actualValue: 450, unit: 'năm ánh sáng' },
        { id: 'nebula-crab', label: 'Tinh Vân Con Cua', icon: '⭐', count: 5, actualValue: 250, unit: 'năm ánh sáng' },
        { id: 'nebula-helix', label: 'Tinh Vân Mắt Thần', icon: '⭐', count: 7, actualValue: 350, unit: 'năm ánh sáng' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Tinh vân nào có kích thước đường kính lớn nhất và cụ thể là bao nhiêu năm ánh sáng?',
          options: ['Tinh Vân Thợ Săn: 400 năm ánh sáng', 'Tinh Vân Thuyền Viễn Xứ: 450 năm ánh sáng', 'Tinh Vân Mắt Thần: 350 năm ánh sáng', 'Tinh Vân Đại Bàng: 300 năm ánh sáng'],
          correctAnswer: 'Tinh Vân Thuyền Viễn Xứ: 450 năm ánh sáng'
        },
        {
          id: 'q2',
          prompt: 'Đường kính Tinh Vân Thuyền Viễn Xứ lớn hơn Tinh Vân Con Cua bao nhiêu năm ánh sáng?',
          options: ['150 năm ánh sáng', '200 năm ánh sáng', '250 năm ánh sáng', '300 năm ánh sáng'],
          correctAnswer: '200 năm ánh sáng'
        },
        {
          id: 'q3',
          prompt: 'Tổng đường kính của cả 5 đại tinh vân cộng lại là bao nhiêu năm ánh sáng?',
          options: ['1650 năm ánh sáng', '1700 năm ánh sáng', '1750 năm ánh sáng', '1800 năm ánh sáng'],
          correctAnswer: '1750 năm ánh sáng'
        }
      ]
    }
  },
  {
    id: 'pic-43',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Kho Dự Trữ Lương Thực Liên Hành Tinh: Bội Số 75 Tấn',
    badgeTitle: 'Bài 43 · Độ khó Cấp 28',
    instruction: 'Bốn trạm không gian dự trữ lương thực sạch cho các chuyến bay dài ngày. Quy ước: Mỗi bông lúa vàng 🌾 đại diện cho 75 tấn lương thực.',
    hint: 'Lúa mì: 6 x 75 = 450 tấn. Gạo thơm: 4 x 75 = 300 tấn. Đậu dinh dưỡng: 5 x 75 = 375 tấn. Ngô ngọt: 3 x 75 = 225 tấn.',
    mascot: { ...BENNY, message: 'Tính nhanh bội số 75 bằng cách lấy số biểu tượng nhân 75 nhé!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🌾 = 75 tấn lương thực',
      multiplier: 75,
      items: [
        { id: 'wheat', label: 'Kho Lúa Mì', icon: '🌾', count: 6, actualValue: 450, unit: 'tấn' },
        { id: 'rice', label: 'Kho Gạo Thơm', icon: '🌾', count: 4, actualValue: 300, unit: 'tấn' },
        { id: 'beans', label: 'Kho Đậu Dinh Dưỡng', icon: '🌾', count: 5, actualValue: 375, unit: 'tấn' },
        { id: 'corn', label: 'Kho Ngô Ngọt', icon: '🌾', count: 3, actualValue: 225, unit: 'tấn' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Kho Lúa Mì đang dự trữ bao nhiêu tấn lương thực?',
          options: ['400 tấn', '425 tấn', '450 tấn', '475 tấn'],
          correctAnswer: '450 tấn'
        },
        {
          id: 'q2',
          prompt: 'Kho Lúa Mì nhiều hơn Kho Ngô Ngọt bao nhiêu tấn?',
          options: ['150 tấn', '200 tấn', '225 tấn', '250 tấn'],
          correctAnswer: '225 tấn'
        },
        {
          id: 'q3',
          prompt: 'Tổng lượng lương thực dự trữ ở cả 4 kho là bao nhiêu tấn?',
          options: ['1250 tấn', '1300 tấn', '1350 tấn', '1425 tấn'],
          correctAnswer: '1350 tấn'
        }
      ]
    }
  },
  {
    id: 'pic-44',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thiết Kế Mạng Lưới Vệ Tinh Viễn Thông Toàn Cầu',
    badgeTitle: 'Bài 44 · Độ khó Cấp 29',
    instruction: 'Giúp Kỹ sư Benny xây dựng biểu đồ 480 trạm phát sóng vệ tinh: Mỗi ăng-ten 📡 đại diện cho 30 trạm (tổng 16 biểu tượng).',
    hint: 'Khu Á: 150 : 30 = 5. Khu Âu: 120 : 30 = 4. Khu Mỹ: 120 : 30 = 4. Khu Phi: 90 : 30 = 3.',
    mascot: { ...BENNY, message: 'Chia số trạm thực tế cho 30 để biết số ăng-ten cần đặt nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 30,
      totalPeople: 480,
      categories: [
        { id: 'asia', label: 'Vành Đai Châu Á (150 trạm)', targetSymbols: 5, symbolColor: 'bg-cyan-500' },
        { id: 'europe', label: 'Vành Đai Châu Âu (120 trạm)', targetSymbols: 4, symbolColor: 'bg-indigo-500' },
        { id: 'america', label: 'Vành Đai Châu Mỹ (120 trạm)', targetSymbols: 4, symbolColor: 'bg-amber-500' },
        { id: 'africa', label: 'Vành Đai Châu Phi (90 trạm)', targetSymbols: 3, symbolColor: 'bg-emerald-500' }
      ]
    }
  },
  {
    id: 'pic-45',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Điện Mặt Trời Quỹ Đạo: Phân Tích 5 Trạm Thu Năng Lượng',
    badgeTitle: 'Bài 45 · Độ khó Cấp 30',
    instruction: 'Năm trạm vệ tinh thu năng lượng Mặt Trời hoạt động suốt 24 giờ. Quy ước: Mỗi mặt trời ☀️ đại diện cho 80 kWh điện.',
    hint: 'Tổng số biểu tượng của cả 5 trạm: 6 + 8 + 5 + 7 + 4 = 30 biểu tượng. Tổng điện năng = 30 x 80 = 2400 kWh.',
    mascot: { ...CASEY, message: 'So sánh gộp hai trạm bằng cách cộng số biểu tượng trước rồi nhân với 80!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '☀️ = 80 kWh điện sạch',
      multiplier: 80,
      items: [
        { id: 'solar-a', label: 'Trạm Helios A', icon: '☀️', count: 6, actualValue: 480, unit: 'kWh' },
        { id: 'solar-b', label: 'Trạm Helios B', icon: '☀️', count: 8, actualValue: 640, unit: 'kWh' },
        { id: 'solar-c', label: 'Trạm Helios C', icon: '☀️', count: 5, actualValue: 400, unit: 'kWh' },
        { id: 'solar-d', label: 'Trạm Helios D', icon: '☀️', count: 7, actualValue: 560, unit: 'kWh' },
        { id: 'solar-e', label: 'Trạm Helios E', icon: '☀️', count: 4, actualValue: 320, unit: 'kWh' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Tổng sản lượng điện của Trạm B và Trạm E gộp lại là bao nhiêu kWh?',
          options: ['880 kWh', '960 kWh', '1040 kWh', '1120 kWh'],
          correctAnswer: '960 kWh'
        },
        {
          id: 'q2',
          prompt: 'Trạm B sản xuất nhiều hơn Trạm E bao nhiêu kWh điện?',
          options: ['240 kWh', '300 kWh', '320 kWh', '400 kWh'],
          correctAnswer: '320 kWh'
        },
        {
          id: 'q3',
          prompt: 'Tổng năng lượng thu được của cả 5 trạm là bao nhiêu kWh?',
          options: ['2240 kWh', '2320 kWh', '2400 kWh', '2480 kWh'],
          correctAnswer: '2400 kWh'
        }
      ]
    }
  },
  {
    id: 'pic-46',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Hệ Thống Thư Viện Tri Thức Số: Bội Số 120 Quyển Sách',
    badgeTitle: 'Bài 46 · Độ khó Cấp 31',
    instruction: 'Thống kê số sách khoa học tại 5 thư viện hiện đại. Quy ước: Mỗi chồng sách 📚 đại diện cho 120 quyển sách.',
    hint: 'Tổng số chồng sách: 5 + 7 + 4 + 8 + 6 = 30. Tổng sách = 30 x 120 = 3600 quyển.',
    mascot: { ...MAYLE, message: 'Đọc sách mỗi ngày giúp trí tuệ bay cao như tên lửa!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '📚 = 120 quyển sách',
      multiplier: 120,
      items: [
        { id: 'lib-1', label: 'Thư Viện Sao Mai', icon: '📚', count: 5, actualValue: 600, unit: 'quyển' },
        { id: 'lib-2', label: 'Thư Viện Bình Minh', icon: '📚', count: 7, actualValue: 840, unit: 'quyển' },
        { id: 'lib-3', label: 'Thư Viện Sóng Xanh', icon: '📚', count: 4, actualValue: 480, unit: 'quyển' },
        { id: 'lib-4', label: 'Thư Viện Trung Tâm', icon: '📚', count: 8, actualValue: 960, unit: 'quyển' },
        { id: 'lib-5', label: 'Thư Viện Rạng Đông', icon: '📚', count: 6, actualValue: 720, unit: 'quyển' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Thư Viện Trung Tâm đang lưu giữ bao nhiêu quyển sách?',
          options: ['840 quyển', '920 quyển', '960 quyển', '1080 quyển'],
          correctAnswer: '960 quyển'
        },
        {
          id: 'q2',
          prompt: 'Thư Viện Trung Tâm nhiều hơn Thư Viện Sóng Xanh bao nhiêu quyển sách?',
          options: ['360 quyển', '420 quyển', '480 quyển', '540 quyển'],
          correctAnswer: '480 quyển'
        },
        {
          id: 'q3',
          prompt: 'Tổng số sách khoa học ở cả 5 thư viện là bao nhiêu quyển?',
          options: ['3360 quyển', '3480 quyển', '3600 quyển', '3720 quyển'],
          correctAnswer: '3600 quyển'
        }
      ]
    }
  },
  {
    id: 'pic-47',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Điều Phối 640 Robot Thám Hiểm Hành Tinh Đỏ',
    badgeTitle: 'Bài 47 · Độ khó Cấp 32',
    instruction: 'Sắp xếp 640 robot tự hành đến 4 miệng núi lửa trên Sao Hỏa. Quy ước: Mỗi chú robot 🤖 đại diện cho 40 robot thực tế (tổng 16 biểu tượng).',
    hint: 'Vùng Olympus: 200 : 40 = 5. Vùng Marineris: 160 : 40 = 4. Vùng Gale: 160 : 40 = 4. Vùng Jezero: 120 : 40 = 3.',
    mascot: { ...BENNY, message: 'Phân bổ chính xác từng đội hình robot để thám hiểm Sao Hỏa!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 40,
      totalPeople: 640,
      categories: [
        { id: 'olympus', label: 'Đỉnh Olympus (200 robot)', targetSymbols: 5, symbolColor: 'bg-red-500' },
        { id: 'marineris', label: 'Hẻm Marineris (160 robot)', targetSymbols: 4, symbolColor: 'bg-orange-500' },
        { id: 'gale', label: 'Miệng Hố Gale (160 robot)', targetSymbols: 4, symbolColor: 'bg-amber-500' },
        { id: 'jezero', label: 'Hồ Cổ Jezero (120 robot)', targetSymbols: 3, symbolColor: 'bg-rose-500' }
      ]
    }
  },
  {
    id: 'pic-48',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Đường Sắt Đệm Từ Siêu Tốc: Bội Số 150 km',
    badgeTitle: 'Bài 48 · Độ khó Cấp 33',
    instruction: 'Ghi nhận chiều dài 5 tuyến đường sắt đệm từ hiện đại. Quy ước: Mỗi đầu tàu 🚄 đại diện cho 150 km đường ray.',
    hint: 'Tuyến D: 8 x 150 = 1200 km; Tuyến A: 4 x 150 = 600 km. Tổng 5 tuyến = (4+7+5+8+6) x 150 = 30 x 150 = 4500 km.',
    mascot: { ...CASEY, message: 'Chuyến tàu xuyên lục địa lướt đi êm ái với tốc độ siêu thanh!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🚄 = 150 km đường ray',
      multiplier: 150,
      items: [
        { id: 'line-a', label: 'Tuyến Phía Bắc', icon: '🚄', count: 4, actualValue: 600, unit: 'km' },
        { id: 'line-b', label: 'Tuyến Duyên Hải', icon: '🚄', count: 7, actualValue: 1050, unit: 'km' },
        { id: 'line-c', label: 'Tuyến Cao Nguyên', icon: '🚄', count: 5, actualValue: 750, unit: 'km' },
        { id: 'line-d', label: 'Tuyến Xuyên Tâm', icon: '🚄', count: 8, actualValue: 1200, unit: 'km' },
        { id: 'line-e', label: 'Tuyến Đảo Ngọc', icon: '🚄', count: 6, actualValue: 900, unit: 'km' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Tuyến Xuyên Tâm có chiều dài thực tế là bao nhiêu km?',
          options: ['1050 km', '1150 km', '1200 km', '1350 km'],
          correctAnswer: '1200 km'
        },
        {
          id: 'q2',
          prompt: 'Tuyến Xuyên Tâm dài hơn Tuyến Phía Bắc bao nhiêu km?',
          options: ['450 km', '550 km', '600 km', '750 km'],
          correctAnswer: '600 km'
        },
        {
          id: 'q3',
          prompt: 'Tổng chiều dài của cả 5 tuyến đường sắt đệm từ là bao nhiêu km?',
          options: ['4200 km', '4350 km', '4500 km', '4650 km'],
          correctAnswer: '4500 km'
        }
      ]
    }
  },
  {
    id: 'pic-49',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Nhà Máy Lọc Nước Đại Dương: Bội Số 200 Lít',
    badgeTitle: 'Bài 49 · Độ khó Cấp 34',
    instruction: 'Công suất lọc nước biển thành nước ngọt mỗi giờ tại 5 nhà máy. Quy ước: Mỗi giọt nước 💧 đại diện cho 200 lít nước tinh khiết.',
    hint: 'Tổng số giọt nước: 5 + 8 + 6 + 9 + 4 = 32 giọt. Tổng lượng nước = 32 x 200 = 6400 lít.',
    mascot: { ...MAYLE, message: 'Nhân với 200 rất dễ: Nhân với 2 rồi viết thêm hai chữ số 0!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '💧 = 200 lít nước tinh khiết',
      multiplier: 200,
      items: [
        { id: 'plant-1', label: 'Nhà Máy Biển Đông', icon: '💧', count: 5, actualValue: 1000, unit: 'lít' },
        { id: 'plant-2', label: 'Nhà Máy San Hô', icon: '💧', count: 8, actualValue: 1600, unit: 'lít' },
        { id: 'plant-3', label: 'Nhà Máy Hải Âu', icon: '💧', count: 6, actualValue: 1200, unit: 'lít' },
        { id: 'plant-4', label: 'Nhà Máy Thái Bình', icon: '💧', count: 9, actualValue: 1800, unit: 'lít' },
        { id: 'plant-5', label: 'Nhà Máy Trường Sa', icon: '💧', count: 4, actualValue: 800, unit: 'lít' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Nhà Máy Thái Bình lọc được bao nhiêu lít nước tinh khiết mỗi giờ?',
          options: ['1600 lít', '1800 lít', '2000 lít', '2200 lít'],
          correctAnswer: '1800 lít'
        },
        {
          id: 'q2',
          prompt: 'Tổng lượng nước của Nhà Máy San Hô và Nhà Máy Trường Sa gộp lại là bao nhiêu lít?',
          options: ['2200 lít', '2400 lít', '2600 lít', '2800 lít'],
          correctAnswer: '2400 lít'
        },
        {
          id: 'q3',
          prompt: 'Tổng công suất của cả 5 nhà máy cộng lại đạt bao nhiêu lít mỗi giờ?',
          options: ['6000 lít', '6200 lít', '6400 lít', '6800 lít'],
          correctAnswer: '6400 lít'
        }
      ]
    }
  },
  {
    id: 'pic-50',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Thiết Kế Kho Năng Lượng Siêu Cấp 850 Pin Lượng Tử',
    badgeTitle: 'Bài 50 · Độ khó Cấp 35',
    instruction: 'Giúp Đội Trưởng Benny nạp 850 pin năng lượng vào 4 khoang chiến hạm. Quy ước: Mỗi viên pin 🔋 đại diện cho 50 viên thực tế (tổng 17 biểu tượng).',
    hint: 'Khoang Chính: 300 : 50 = 6. Khoang Lá Chắn: 200 : 50 = 4. Khoang Động Cơ: 200 : 50 = 4. Khoang Dự Phòng: 150 : 50 = 3.',
    mascot: { ...BENNY, message: 'Nạp đầy 17 biểu tượng pin năng lượng để chiến hạm xuất phát nhé!' },
    activity: {
      type: 'pictographBuilder',
      multiplier: 50,
      totalPeople: 850,
      categories: [
        { id: 'core', label: 'Khoang Lõi Chính (300 viên)', targetSymbols: 6, symbolColor: 'bg-emerald-500' },
        { id: 'shield', label: 'Khoang Lá Chắn (200 viên)', targetSymbols: 4, symbolColor: 'bg-sky-500' },
        { id: 'engine', label: 'Khoang Động Cơ (200 viên)', targetSymbols: 4, symbolColor: 'bg-amber-500' },
        { id: 'backup', label: 'Khoang Dự Phòng (150 viên)', targetSymbols: 3, symbolColor: 'bg-purple-500' }
      ]
    }
  },
  {
    id: 'pic-51',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'Đại Hội Olympic Các Học Viện Thiên Tài: Bội Số 250 Điểm',
    badgeTitle: 'Bài 51 · Độ khó Cấp 36',
    instruction: 'Bảng điểm tổng kết 5 Học Viện tham gia Đại hội Toán học Quốc tế. Quy ước: Mỗi chiếc cúp 🏆 đại diện cho 250 điểm danh vọng.',
    hint: 'Số cúp: A=7, B=5, C=9, D=6, E=8. Tổng số cúp = 35 cúp. Tổng điểm = 35 x 250 = 8750 điểm.',
    mascot: { ...MAYLE, message: 'Tính toán chuẩn xác với tỷ lệ lớn 250 điểm cho mỗi chiếc cúp!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🏆 = 250 điểm danh vọng',
      multiplier: 250,
      items: [
        { id: 'acad-a', label: 'Học Viện Ánh Sáng', icon: '🏆', count: 7, actualValue: 1750, unit: 'điểm' },
        { id: 'acad-b', label: 'Học Viện Sao Băng', icon: '🏆', count: 5, actualValue: 1250, unit: 'điểm' },
        { id: 'acad-c', label: 'Học Viện Kim Cương', icon: '🏆', count: 9, actualValue: 2250, unit: 'điểm' },
        { id: 'acad-d', label: 'Học Viện Sóng Âm', icon: '🏆', count: 6, actualValue: 1500, unit: 'điểm' },
        { id: 'acad-e', label: 'Học Viện Thiên Hà', icon: '🏆', count: 8, actualValue: 2000, unit: 'điểm' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Học Viện Kim Cương (nhiều nhất) hơn Học Viện Sao Băng (ít nhất) bao nhiêu điểm?',
          options: ['750 điểm', '1000 điểm', '1250 điểm', '1500 điểm'],
          correctAnswer: '1000 điểm'
        },
        {
          id: 'q2',
          prompt: 'Tổng điểm của hai học viện dẫn đầu (Kim Cương và Thiên Hà) là bao nhiêu điểm?',
          options: ['4000 điểm', '4250 điểm', '4500 điểm', '4750 điểm'],
          correctAnswer: '4250 điểm'
        },
        {
          id: 'q3',
          prompt: 'Tổng số điểm danh vọng của cả 5 học viện đạt được là bao nhiêu?',
          options: ['8250 điểm', '8500 điểm', '8750 điểm', '9000 điểm'],
          correctAnswer: '8750 điểm'
        }
      ]
    }
  },
  {
    id: 'pic-52',
    topicId: 'pictograph',
    topicName: topicName('pictograph'),
    title: 'ĐẠI THỬ THÁCH THIÊN HÀ TỐI THƯỢNG TRẠM 1: Cụm Siêu Thiên Hà (1 Biểu Tượng = 300 Năm Ánh Sáng)',
    badgeTitle: 'Bài 52 · Đỉnh Cao Vũ Trụ Trạm 1',
    instruction: 'Cuộc khảo sát vĩ đại nhất Trạm 1: Đo kích thước 5 cụm siêu thiên hà xa xôi. Quy ước: Mỗi dải ngân hà 🌌 đại diện cho 300 năm ánh sáng.',
    hint: 'Tổng biểu tượng = 7 + 9 + 6 + 10 + 8 = 40 biểu tượng. Tổng kích thước = 40 x 300 = 12 000 năm ánh sáng!',
    mascot: { ...MAYLE, message: 'Vượt qua thử thách 12 000 năm ánh sáng này, em chính thức đạt danh hiệu Thống Soái Dữ Liệu Vũ Trụ!' },
    activity: {
      type: 'pictographViewer',
      keyNotice: '🌌 = 300 năm ánh sáng',
      multiplier: 300,
      items: [
        { id: 'cluster-1', label: 'Cụm Virgo', icon: '🌌', count: 7, actualValue: 2100, unit: 'năm ánh sáng' },
        { id: 'cluster-2', label: 'Cụm Coma', icon: '🌌', count: 9, actualValue: 2700, unit: 'năm ánh sáng' },
        { id: 'cluster-3', label: 'Cụm Perseus', icon: '🌌', count: 6, actualValue: 1800, unit: 'năm ánh sáng' },
        { id: 'cluster-4', label: 'Cụm Laniakea', icon: '🌌', count: 10, actualValue: 3000, unit: 'năm ánh sáng' },
        { id: 'cluster-5', label: 'Cụm Hercules', icon: '🌌', count: 8, actualValue: 2400, unit: 'năm ánh sáng' }
      ],
      subQuestions: [
        {
          id: 'q1',
          prompt: 'Cụm siêu thiên hà nào rộng lớn nhất và có kích thước bao nhiêu năm ánh sáng?',
          options: ['Cụm Coma: 2700 năm ánh sáng', 'Cụm Laniakea: 3000 năm ánh sáng', 'Cụm Hercules: 2400 năm ánh sáng', 'Cụm Virgo: 2100 năm ánh sáng'],
          correctAnswer: 'Cụm Laniakea: 3000 năm ánh sáng'
        },
        {
          id: 'q2',
          prompt: 'Cụm Laniakea lớn hơn Cụm Perseus bao nhiêu năm ánh sáng?',
          options: ['900 năm ánh sáng', '1200 năm ánh sáng', '1500 năm ánh sáng', '1800 năm ánh sáng'],
          correctAnswer: '1200 năm ánh sáng'
        },
        {
          id: 'q3',
          prompt: 'Tổng kích thước của cả 5 cụm siêu thiên hà cộng lại là bao nhiêu năm ánh sáng?',
          options: ['11 400 năm ánh sáng', '11 700 năm ánh sáng', '12 000 năm ánh sáng', '12 300 năm ánh sáng'],
          correctAnswer: '12 000 năm ánh sáng'
        }
      ]
    }
  }
];


