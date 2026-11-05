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
  }
];
