import { LessonQuestion, ABBY, BENNY, CASEY, MAYLE, topicName } from './lessonTypes';

export const EXTENDED_PATTERN_LESSONS: LessonQuestion[] = [
  {
    id: 'pat-24',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Tam Giác (Triangular Numbers): Bước Nhảy Cộng Dồn Tự Nhiên',
    badgeTitle: 'Bài 24 · Độ khó Cấp 10',
    instruction: 'Tìm số tiếp theo trong dãy số tam giác nổi tiếng: 1, 3, 6, 10, 15, [?]. Nhận diện quy luật bước nhảy cộng dồn (+2, +3, +4, +5, +6).',
    hint: 'Khoảng cách giữa các số tăng dần: 1 (+2) = 3; 3 (+3) = 6; 6 (+4) = 10; 10 (+5) = 15; 15 (+6) = ?',
    mascot: { ...ABBY, message: 'Dãy số tam giác là một trong những viên ngọc quý nhất của toán học cổ điển!' },
    activity: {
      type: 'sequencePattern',
      title: 'Dãy Số Tam Giác Tự Nhiên',
      ruleExplanation: 'Mỗi bước nhảy cộng thêm 1 đơn vị so với bước trước: +2, +3, +4, +5, +6...',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1', subLabel: '+2' },
        { id: 2, label: '3', subLabel: '+3' },
        { id: 3, label: '6', subLabel: '+4' },
        { id: 4, label: '10', subLabel: '+5' },
        { id: 5, label: '15', subLabel: '+6' },
        { id: 6, label: '?', isMissing: true }
      ],
      choices: [
        { id: 'c1', label: '18', subLabel: '15 + 3' },
        { id: 'c2', label: '20', subLabel: '15 + 5' },
        { id: 'c3', label: '21', subLabel: '15 + 6 = 21' },
        { id: 'c4', label: '25', subLabel: '15 + 10' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Quy luật bước nhảy: +2, +3, +4, +5, tiếp theo phải cộng 6: 15 + 6 = 21!'
    }
  },
  {
    id: 'pat-25',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Hoa Đa Hướng: Chu Kỳ 5 Búp Sen Màu',
    badgeTitle: 'Bài 25 · Độ khó Cấp 11',
    instruction: 'Tìm đường đi trong mê cung tuân thủ chu kỳ 5 loài hoa tuần hoàn: Hoa Anh Đào 🌸 ➡️ Dâm Bụt 🌺 ➡️ Hướng Dương 🌻 ➡️ Hoa Sen 🪷 ➡️ Hoa Hồng 🌹.',
    hint: 'Sau Hoa Sen 🪷 bắt buộc phải là Hoa Hồng 🌹, rồi quay lại 🌸!',
    mascot: { ...ABBY, message: 'Chuỗi 5 bông hoa lặp đi lặp lại không ngừng, hãy đi đúng từng bước nhé!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🌸', '🌺', '🌻', '🪷', '🌹'],
      ruleTitle: 'Chu kỳ 5 hoa: 🌸 ➡️ 🌺 ➡️ 🌻 ➡️ 🪷 ➡️ 🌹',
      startPos: [0, 0],
      goalPos: [3, 4],
      startIcon: '🌸',
      startLabel: 'Cổng Mê Cung',
      goalIcon: '🏆',
      goalLabel: 'Đích Đến',
      grid: [
        ['🌸', '🌺', '🌻', '🪷', '🌹'],
        ['🌹', '🌸', '🌺', '🌻', '🌸'],
        ['🪷', '🌹', '🌸', '🌺', '🌺'],
        ['🌻', '🪷', '🌹', '🌸', '🌻']
      ],
      targetPath: [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 4], [2, 4], [3, 4]
      ],
      successMessage: 'Bé đã vượt qua Mê Cung Hoa 5 Chu Kỳ xuất sắc!'
    }
  },
  {
    id: 'pat-26',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Ma Trận Biến Đổi 2x2: Quy Luật Đối Xứng Trục Chéo',
    badgeTitle: 'Bài 26 · Độ khó Cấp 12',
    instruction: 'Quan sát ma trận 2x2 xoay đối xứng qua trục đường chéo chính: Các số ở góc đối diện đổi chỗ cho nhau.',
    hint: 'Ô góc trên-phải đổi chỗ cho ô góc dưới-trái, hai ô trên đường chéo chính giữ nguyên vị trí.',
    mascot: { ...CASEY, message: 'Phép biến hình trục gương đường chéo! Quan sát thật tinh mắt nào!' },
    activity: {
      type: 'matrix2x2',
      title: 'Biến Đổi Đối Xứng Trục Chéo',
      ruleExplanation: 'Các phần tử nằm ngoài đường chéo chính hoán đổi vị trí cho nhau đối xứng qua đường chéo.',
      sampleGrids: [
        {
          stepNum: 1,
          grid: [
            ['1', '2'],
            ['3', '4']
          ]
        },
        {
          stepNum: 2,
          grid: [
            ['1', '3'],
            ['2', '4']
          ]
        }
      ],
      choices: [
        {
          id: 'c1',
          label: 'Hình A',
          grid: [
            ['1', '3'],
            ['2', '4']
          ]
        },
        {
          id: 'c2',
          label: 'Hình B',
          grid: [
            ['4', '2'],
            ['3', '1']
          ]
        },
        {
          id: 'c3',
          label: 'Hình C',
          grid: [
            ['2', '1'],
            ['4', '3']
          ]
        }
      ],
      correctChoiceId: 'c1'
    }
  },
  {
    id: 'pat-27',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Chuỗi Quân Cờ Domino: Nhân Tỉ Lệ Kép Nửa Trên & Nửa Dưới',
    badgeTitle: 'Bài 27 · Độ khó Cấp 13',
    instruction: 'Tìm quân cờ Domino tiếp theo: Nửa trên tăng dần 1, 2, 3, 4, [?]. Nửa dưới luôn bằng nửa trên NHÂN ĐÔI (×2)!',
    hint: 'Nửa trên tiếp theo là 5. Nửa dưới = 5 × 2 = 10!',
    mascot: { ...ABBY, message: 'Hai nửa quân cờ có mối quan hệ số học nhân đôi gắn bó khăng khít!' },
    activity: {
      type: 'sequencePattern',
      title: 'Chuỗi Domino Nhân Đôi (×2)',
      ruleExplanation: 'Nửa trên tăng dần +1, nửa dưới bằng nửa trên nhân 2.',
      sequenceType: 'domino',
      items: [
        { id: 1, label: '1 / 2', subLabel: '1 × 2 = 2' },
        { id: 2, label: '2 / 4', subLabel: '2 × 2 = 4' },
        { id: 3, label: '3 / 6', subLabel: '3 × 2 = 6' },
        { id: 4, label: '4 / 8', subLabel: '4 × 2 = 8' },
        { id: 5, label: '?', isMissing: true }
      ],
      choices: [
        { id: 'd1', label: '5 / 9', subLabel: 'Sai quy luật' },
        { id: 'd2', label: '5 / 10', subLabel: '5 và 5 × 2 = 10' },
        { id: 'd3', label: '6 / 12', subLabel: 'Nhảy cóc số 5' },
        { id: 'd4', label: '5 / 8', subLabel: 'Không nhân đôi' }
      ],
      correctChoiceId: 'd2',
      correctExplanation: 'Nửa trên tiếp theo là 5, nửa dưới = 5 × 2 = 10. Quân cờ là [5 / 10]!'
    }
  },
  {
    id: 'pat-28',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Lũy Tiến Tăng Tốc: Nhân 3 Rồi Trừ 1',
    badgeTitle: 'Bài 28 · Độ khó Cấp 14',
    instruction: 'Tìm số tiếp theo trong dãy số tăng tốc kỳ ảo: 2, 5, 14, 41, [?]. Nhận diện quy tắc: Lấy số trước nhân 3 rồi trừ đi 1.',
    hint: '2 × 3 - 1 = 5; 5 × 3 - 1 = 14; 14 × 3 - 1 = 41; 41 × 3 - 1 = ?',
    mascot: { ...MAYLE, message: 'Dãy số kết hợp cả phép nhân và phép trừ! Hãy tính nhẩm 41 × 3 trước nhé!' },
    activity: {
      type: 'sequencePattern',
      title: 'Quy Luật: (Số trước × 3) － 1',
      ruleExplanation: 'Mỗi số bằng số liền trước nhân 3 rồi bớt đi 1 đơn vị.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '2', subLabel: 'Khởi đầu' },
        { id: 2, label: '5', subLabel: '2×3 - 1' },
        { id: 3, label: '14', subLabel: '5×3 - 1' },
        { id: 4, label: '41', subLabel: '14×3 - 1' },
        { id: 5, label: '?', isMissing: true }
      ],
      choices: [
        { id: 'num1', label: '118', subLabel: 'Sai phép tính' },
        { id: 'num2', label: '122', subLabel: '41 × 3 - 1 = 122' },
        { id: 'num3', label: '123', subLabel: 'Chưa trừ 1' },
        { id: 'num4', label: '125', subLabel: 'Cộng thêm' }
      ],
      correctChoiceId: 'num2',
      correctExplanation: '41 × 3 = 123. Lấy 123 - 1 = 122! Số tiếp theo là 122!'
    }
  },
  {
    id: 'pat-29',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Kim Tự Tháp Số Đảo Ngược: Hiệu Hai Số Liền Kề',
    badgeTitle: 'Bài 29 · Độ khó Cấp 15',
    instruction: 'Tìm số ở đỉnh kim tự tháp đảo ngược: Mỗi số ở tầng dưới bằng HIỆU của hai số đứng ngay phía trên nó.',
    hint: 'Tầng 1: 50, 30, 18. Tầng 2: (50 - 30 = 20), (30 - 18 = 12). Đỉnh chóp: 20 - 12 = ?',
    mascot: { ...CASEY, message: 'Kim tự tháp phép trừ! Lấy số lớn trừ số bé ở tầng trên nhé!' },
    activity: {
      type: 'sequencePattern',
      title: 'Kim Tự Tháp Hiệu Hai Số',
      ruleExplanation: 'Số ở ô bên dưới bằng hiệu hai số liền kề ngay bên trên.',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '50', subLabel: 'Tầng 1' },
        { id: 2, label: '30', subLabel: 'Tầng 1' },
        { id: 3, label: '18', subLabel: 'Tầng 1' },
        { id: 4, label: '20', subLabel: '50 - 30' },
        { id: 5, label: '12', subLabel: '30 - 18' },
        { id: 6, label: '?', isMissing: true, subLabel: '20 - 12' }
      ],
      choices: [
        { id: 'p1', label: '6', subLabel: 'Sai hiệu' },
        { id: 'p2', label: '8', subLabel: '20 - 12 = 8' },
        { id: 'p3', label: '10', subLabel: 'Sai phép tính' },
        { id: 'p4', label: '14', subLabel: 'Cộng dồn' }
      ],
      correctChoiceId: 'p2',
      correctExplanation: 'Tầng 2 có 20 và 12. Số ở đỉnh tháp = 20 - 12 = 8!'
    }
  },
  {
    id: 'pat-30',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Ma Trận Hình Học: Biến Đổi Số Cạnh Đa Giác Tuần Hoàn',
    badgeTitle: 'Bài 30 · Độ khó Cấp 16',
    instruction: 'Quy luật ma trận đa giác: Số cạnh tăng dần theo hàng và theo cột. Hàng 1: 3 cạnh ➡️ 4 cạnh ➡️ 5 cạnh. Hàng 3: 5 cạnh ➡️ 6 cạnh ➡️ [?].',
    hint: 'Số cạnh tăng đều: Tam giác (3), Tứ giác (4), Ngũ giác (5), Lục giác (6), tiếp theo là Thất giác (7 cạnh)!',
    mascot: { ...ABBY, message: 'Đếm số cạnh của các hình đa giác để nhận ra quy luật cộng 1 cạnh nhé!' },
    activity: {
      type: 'patternMatrix',
      ruleDescription: 'Mỗi bước sang phải tăng 1 cạnh, mỗi bước xuống dưới tăng 1 cạnh.',
      steps: [
        { stepNum: 1, content: 'Tam Giác (3 cạnh)', note: 'Hàng 1, Cột 1' },
        { stepNum: 2, content: 'Tứ Giác (4 cạnh)', note: 'Hàng 1, Cột 2' },
        { stepNum: 3, content: 'Ngũ Giác (5 cạnh)', note: 'Hàng 1, Cột 3' },
        { stepNum: 4, content: 'Lục Giác (6 cạnh)', note: 'Hàng 2, Cột 3' }
      ],
      choices: [
        { id: 'poly1', label: 'Hình A', content: 'Thất Giác (7 cạnh)' },
        { id: 'poly2', label: 'Hình B', content: 'Bát Giác (8 cạnh)' },
        { id: 'poly3', label: 'Hình C', content: 'Tam Giác (3 cạnh)' }
      ],
      correctChoiceId: 'poly1'
    }
  },
  {
    id: 'pat-31',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Chuỗi Hạt Ngọc Vòng Xuyến: Quy Luật Chu Kỳ Lồng Chu Kỳ',
    badgeTitle: 'Bài 31 · Độ khó Cấp 17',
    instruction: 'Tìm viên ngọc còn thiếu trong chuỗi ngọc hoàng gia: 🔴 🔵 🔵 🟡 🔴 🔵 🔵 [?].',
    hint: 'Chu kỳ gồm 4 hạt lặp lại: 1 Đỏ, 2 Xanh Dương, 1 Vàng. Sau hai hạt Xanh Dương phải là hạt Vàng 🟡!',
    mascot: { ...ABBY, message: 'Chuỗi ngọc lấp lánh có quy luật 1 Đỏ - 2 Xanh - 1 Vàng!' },
    activity: {
      type: 'sequencePattern',
      title: 'Chuỗi Ngọc Vòng Xuyến 4 Hạt',
      ruleExplanation: 'Chu kỳ lặp: Đỏ 🔴 ➡️ Xanh 🔵 ➡️ Xanh 🔵 ➡️ Vàng 🟡.',
      sequenceType: 'beads',
      items: [
        { id: 1, icon: '🔴', label: 'Đỏ' },
        { id: 2, icon: '🔵', label: 'Xanh' },
        { id: 3, icon: '🔵', label: 'Xanh' },
        { id: 4, icon: '🟡', label: 'Vàng' },
        { id: 5, icon: '🔴', label: 'Đỏ' },
        { id: 6, icon: '🔵', label: 'Xanh' },
        { id: 7, icon: '🔵', label: 'Xanh' },
        { id: 8, icon: '❓', label: '?', isMissing: true }
      ],
      choices: [
        { id: 'b1', icon: '🔴', label: 'Ngọc Đỏ' },
        { id: 'b2', icon: '🔵', label: 'Ngọc Xanh Dương' },
        { id: 'b3', icon: '🟡', label: 'Ngọc Vàng' },
        { id: 'b4', icon: '🟢', label: 'Ngọc Xanh Lá' }
      ],
      correctChoiceId: 'b3',
      correctExplanation: 'Theo chu kỳ (Đỏ, Xanh, Xanh, Vàng), vị trí số 8 bắt buộc là viên Ngọc Vàng 🟡!'
    }
  },
  {
    id: 'pat-32',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Tinh Tú Xoay Chiều: Bước Nhảy Tọa Độ Ma Trận',
    badgeTitle: 'Bài 32 · Độ khó Cấp 18',
    instruction: 'Dẫn đường phi thuyền qua mê cung vũ trụ theo chu kỳ 4 chòm sao: Ngôi Sao ⭐ ➡️ Mặt Trăng 🌙 ➡️ Mặt Trời ☀️ ➡️ Sao Thổ 🪐.',
    hint: 'Đi theo thứ tự: ⭐ ➡️ 🌙 ➡️ ☀️ ➡️ 🪐 ➡️ ⭐ lặp lại liên tục.',
    mascot: { ...MAYLE, message: 'Hành trình giữa các vì sao tuân theo trật tự thiên văn kỳ diệu!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['⭐', '🌙', '☀️', '🪐'],
      ruleTitle: 'Chu kỳ tinh tú: ⭐ ➡️ 🌙 ➡️ ☀️ ➡️ 🪐',
      startPos: [0, 0],
      goalPos: [3, 3],
      startIcon: '🚀',
      startLabel: 'Trạm Vũ Trụ',
      goalIcon: '🌌',
      goalLabel: 'Thiên Hà Mới',
      grid: [
        ['⭐', '🌙', '☀️', '🪐'],
        ['🪐', '⭐', '🌙', '⭐'],
        ['☀️', '🪐', '⭐', '🌙'],
        ['🌙', '☀️', '🪐', '☀️']
      ],
      targetPath: [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 3], [2, 3], [3, 3]
      ],
      successMessage: 'Phi thuyền đã cập bến Thiên Hà Mới an toàn!'
    }
  },
  {
    id: 'pat-33',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'ĐẠI THỬ THÁCH TRẠM 4: Kim Tự Tháp Thần Bí 5 Tầng & Dãy Số Đa Tầng Cực Hạn',
    badgeTitle: 'Bài 33 · Đại Thử Thách Trạm 4 Mở Rộng',
    instruction: 'Đỉnh cao tư duy quy luật: Tìm số ở đỉnh kim tự tháp 5 tầng. Mỗi số ở tầng trên bằng tổng hai số liền kề ngay bên dưới nó.',
    hint: 'Tầng 1 đáy tháp: 2, 3, 4, 5. Tầng 2: (2+3=5), (3+4=7), (4+5=9). Tầng 3: (5+7=12), (7+9=16). Đỉnh tháp: 12 + 16 = ?',
    mascot: { ...ABBY, message: 'Vượt qua bài tập này, em chính thức trở thành Phù Thủy Quy Luật của Spark Math!' },
    activity: {
      type: 'sequencePattern',
      title: 'Kim Tự Tháp Cộng Dồn 4 Tầng Lên Đỉnh',
      ruleExplanation: 'Mỗi tầng bằng tổng hai số bên dưới: Tầng 3 là 12 và 16. Đỉnh tháp = 12 + 16 = 28.',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '2', subLabel: 'Đáy' },
        { id: 2, label: '3', subLabel: 'Đáy' },
        { id: 3, label: '4', subLabel: 'Đáy' },
        { id: 4, label: '5', subLabel: 'Đáy' },
        { id: 5, label: '5', subLabel: '2+3' },
        { id: 6, label: '7', subLabel: '3+4' },
        { id: 7, label: '9', subLabel: '4+5' },
        { id: 8, label: '12', subLabel: '5+7' },
        { id: 9, label: '16', subLabel: '7+9' },
        { id: 10, label: '?', isMissing: true, subLabel: '12+16' }
      ],
      choices: [
        { id: 'top1', label: '26', subLabel: 'Sai phép cộng' },
        { id: 'top2', label: '28', subLabel: '12 + 16 = 28' },
        { id: 'top3', label: '30', subLabel: 'Cộng nhầm' },
        { id: 'top4', label: '32', subLabel: '16 × 2' }
      ],
      correctChoiceId: 'top2',
      correctExplanation: 'Hai số tầng 3 là 12 và 16. Đỉnh kim tự tháp = 12 + 16 = 28!'
    }
  },
  {
    id: 'pat-34',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Fibonacci Tự Nhiên: Mỗi Số Bằng Tổng Hai Số Đứng Trước',
    badgeTitle: 'Bài 34 · Độ khó Cấp 19',
    instruction: 'Tìm số tiếp theo trong dãy số nổi tiếng: 1, 2, 3, 5, 8, 13, 21, [?].',
    hint: 'Quy luật Fibonacci: 1 + 2 = 3; 2 + 3 = 5; 3 + 5 = 8; 5 + 8 = 13; 8 + 13 = 21; 13 + 21 = ?',
    mascot: { ...ABBY, message: 'Dãy số Fibonacci xuất hiện khắp nơi trong tự nhiên: từ cánh hoa đến vỏ ốc!' },
    activity: {
      type: 'sequencePattern',
      title: 'Dãy Số Fibonacci Kỳ Diệu',
      ruleExplanation: 'Mỗi số bằng tổng của hai số liền trước: 13 + 21 = 34.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1', subLabel: 'Gốc' },
        { id: 2, label: '2', subLabel: 'Gốc' },
        { id: 3, label: '3', subLabel: '1+2' },
        { id: 4, label: '5', subLabel: '2+3' },
        { id: 5, label: '8', subLabel: '3+5' },
        { id: 6, label: '13', subLabel: '5+8' },
        { id: 7, label: '21', subLabel: '8+13' },
        { id: 8, label: '?', isMissing: true, subLabel: '13+21' }
      ],
      choices: [
        { id: 'c1', label: '32', subLabel: 'Cộng nhầm' },
        { id: 'c2', label: '34', subLabel: '13 + 21 = 34' },
        { id: 'c3', label: '35', subLabel: 'Thừa 1' },
        { id: 'c4', label: '36', subLabel: 'Thừa 2' }
      ],
      correctChoiceId: 'c2',
      correctExplanation: 'Quy tắc Fibonacci: 13 + 21 = 34!'
    }
  },
  {
    id: 'pat-35',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Tinh Vân Thiên Hà: Chu Kỳ 4 Chòm Sao',
    badgeTitle: 'Bài 35 · Độ khó Cấp 20',
    instruction: 'Dẫn đường phi thuyền qua mê cung tinh vân theo đúng chu kỳ: ⭐ ➡️ 🌙 ➡️ ☀️ ➡️ 🪐 lặp lại tuần hoàn.',
    hint: 'Xuất phát ở [0,0] là ⭐, tiếp theo phải đi vào ô 🌙, rồi ☀️, rồi 🪐.',
    mascot: { ...BENNY, message: 'Bay đúng lộ trình chòm sao để không bị hút vào lỗ đen nhé!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['⭐', '🌙', '☀️', '🪐'],
      ruleTitle: 'Chu kỳ chòm sao: ⭐ ➡️ 🌙 ➡️ ☀️ ➡️ 🪐',
      startPos: [0, 0],
      goalPos: [3, 3],
      startIcon: '🚀',
      startLabel: 'Trạm Khởi Hành',
      goalIcon: '🌌',
      goalLabel: 'Thiên Hà Rực Rỡ',
      grid: [
        ['⭐', '🌙', '☀️', '🪐'],
        ['🪐', '☀️', '🌙', '⭐'],
        ['☀️', '🪐', '⭐', '🌙'],
        ['🌙', '⭐', '🪐', '☀️']
      ],
      targetPath: [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 3], [2, 3], [3, 3]
      ],
      successMessage: 'Tuyệt vời! Phi thuyền đã vượt qua mê cung tinh vân an toàn!'
    }
  },
  {
    id: 'pat-36',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Cấp Số Nhân: Bước Nhảy Gấp Đôi Liên Tiếp',
    badgeTitle: 'Bài 36 · Độ khó Cấp 21',
    instruction: 'Tìm số tiếp theo trong chuỗi nhân đôi: 2, 4, 8, 16, 32, [?].',
    hint: 'Mỗi số gấp 2 lần số trước: 2 x 2 = 4; 4 x 2 = 8; 8 x 2 = 16; 16 x 2 = 32; 32 x 2 = ?',
    mascot: { ...CASEY, message: 'Nhân đôi liên tục làm các con số lớn lên với tốc độ tên lửa!' },
    activity: {
      type: 'sequencePattern',
      title: 'Chuỗi Nhân Đôi Gấp Bội',
      ruleExplanation: 'Mỗi số bằng số trước nhân với 2: 32 x 2 = 64.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '2', subLabel: 'x2' },
        { id: 2, label: '4', subLabel: 'x2' },
        { id: 3, label: '8', subLabel: 'x2' },
        { id: 4, label: '16', subLabel: 'x2' },
        { id: 5, label: '32', subLabel: 'x2' },
        { id: 6, label: '?', isMissing: true, subLabel: '32x2' }
      ],
      choices: [
        { id: 'c1', label: '60', subLabel: 'Thiếu 4' },
        { id: 'c2', label: '64', subLabel: '32 x 2 = 64' },
        { id: 'c3', label: '68', subLabel: 'Thừa 4' },
        { id: 'c4', label: '72', subLabel: 'Nhân nhầm' }
      ],
      correctChoiceId: 'c2',
      correctExplanation: 'Quy luật nhân đôi: 32 × 2 = 64!'
    }
  },
  {
    id: 'pat-37',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Năng Lượng Tự Nhiên: Chu Kỳ Bốn Nguyên Tố',
    badgeTitle: 'Bài 37 · Độ khó Cấp 22',
    instruction: 'Đi theo con đường năng lượng tuần hoàn: Cỏ bốn lá 🍀 ➡️ Giọt nước 💧 ➡️ Mặt trời ☀️ ➡️ Sấm sét ⚡.',
    hint: 'Lần lượt: 🍀 ➡️ 💧 ➡️ ☀️ ➡️ ⚡ ➡️ 🍀...',
    mascot: { ...ABBY, message: 'Năng lượng thiên nhiên hội tụ giúp mở khóa cánh cổng bí mật!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🍀', '💧', '☀️', '⚡'],
      ruleTitle: 'Bốn nguyên tố: 🍀 ➡️ 💧 ➡️ ☀️ ➡️ ⚡',
      startPos: [0, 0],
      goalPos: [3, 3],
      startIcon: '🌱',
      startLabel: 'Hạt Mầm',
      goalIcon: '🌳',
      goalLabel: 'Cây Cổ Thụ',
      grid: [
        ['🍀', '💧', '☀️', '⚡'],
        ['⚡', '☀️', '💧', '🍀'],
        ['☀️', '⚡', '🍀', '💧'],
        ['💧', '🍀', '⚡', '☀️']
      ],
      targetPath: [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 3], [2, 3], [3, 3]
      ],
      successMessage: 'Hạt mầm đã tiếp đủ năng lượng và phát triển thành cây đại thụ!'
    }
  },
  {
    id: 'pat-38',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Hai Luồng Xen Kẽ: Tăng Và Giảm Đồng Thời',
    badgeTitle: 'Bài 38 · Độ khó Cấp 23',
    instruction: 'Tìm số tiếp theo trong chuỗi xen kẽ: 3, 30, 6, 25, 9, 20, 12, [?].',
    hint: 'Tách làm hai luồng: Luồng vị trí lẻ (tăng 3): 3, 6, 9, 12. Luồng vị trí chẵn (giảm 5): 30, 25, 20, ?',
    mascot: { ...MAYLE, message: 'Tư duy đa luồng: Quan sát sự chuyển động độc lập của các vị trí chẵn và lẻ!' },
    activity: {
      type: 'sequencePattern',
      title: 'Chuỗi Số Song Luồng Đan Xen',
      ruleExplanation: 'Vị trí lẻ tăng 3: 3, 6, 9, 12. Vị trí chẵn giảm 5: 30, 25, 20, 15.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '3', subLabel: 'Lẻ (+3)' },
        { id: 2, label: '30', subLabel: 'Chẵn (-5)' },
        { id: 3, label: '6', subLabel: 'Lẻ (+3)' },
        { id: 4, label: '25', subLabel: 'Chẵn (-5)' },
        { id: 5, label: '9', subLabel: 'Lẻ (+3)' },
        { id: 6, label: '20', subLabel: 'Chẵn (-5)' },
        { id: 7, label: '12', subLabel: 'Lẻ (+3)' },
        { id: 8, label: '?', isMissing: true, subLabel: 'Chẵn (-5)' }
      ],
      choices: [
        { id: 'c1', label: '14', subLabel: 'Sai quy luật' },
        { id: 'c2', label: '15', subLabel: '20 - 5 = 15' },
        { id: 'c3', label: '16', subLabel: 'Tính nhầm' },
        { id: 'c4', label: '18', subLabel: 'Nhầm luồng lẻ' }
      ],
      correctChoiceId: 'c2',
      correctExplanation: 'Luồng chẵn đang giảm 5 đơn vị mỗi bước: 20 - 5 = 15!'
    }
  },
  {
    id: 'pat-39',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Kim Tự Tháp Số Cộng Dồn 4 Tầng Lên Đỉnh (Đáy 3, 4, 5, 6)',
    badgeTitle: 'Bài 39 · Độ khó Cấp 24',
    instruction: 'Tìm số trên đỉnh kim tự tháp: Tầng đáy gồm 3, 4, 5, 6. Mỗi số tầng trên bằng tổng hai số bên dưới.',
    hint: 'Tầng 2: (3+4=7), (4+5=9), (5+6=11). Tầng 3: (7+9=16), (9+11=20). Đỉnh: 16 + 20 = ?',
    mascot: { ...CASEY, message: 'Cộng dồn từng tầng kiên nhẫn như xây từng viên gạch kim tự tháp!' },
    activity: {
      type: 'sequencePattern',
      title: 'Kim Tự Tháp Đáy 3, 4, 5, 6',
      ruleExplanation: 'Tầng 3 gồm 16 và 20. Đỉnh kim tự tháp = 16 + 20 = 36.',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '3', subLabel: 'Đáy' },
        { id: 2, label: '4', subLabel: 'Đáy' },
        { id: 3, label: '5', subLabel: 'Đáy' },
        { id: 4, label: '6', subLabel: 'Đáy' },
        { id: 5, label: '7', subLabel: '3+4' },
        { id: 6, label: '9', subLabel: '4+5' },
        { id: 7, label: '11', subLabel: '5+6' },
        { id: 8, label: '16', subLabel: '7+9' },
        { id: 9, label: '20', subLabel: '9+11' },
        { id: 10, label: '?', isMissing: true, subLabel: '16+20' }
      ],
      choices: [
        { id: 'top1', label: '34', subLabel: 'Thiếu 2' },
        { id: 'top2', label: '36', subLabel: '16 + 20 = 36' },
        { id: 'top3', label: '38', subLabel: 'Thừa 2' },
        { id: 'top4', label: '40', subLabel: 'Cộng nhầm' }
      ],
      correctChoiceId: 'top2',
      correctExplanation: 'Đỉnh kim tự tháp = 16 + 20 = 36!'
    }
  },
  {
    id: 'pat-40',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Vũ Trụ 4 Biểu Tượng Công Nghệ Cao',
    badgeTitle: 'Bài 40 · Độ khó Cấp 25',
    instruction: 'Vượt qua mê cung không gian theo chu kỳ: Tên lửa 🚀 ➡️ Đĩa bay 🛸 ➡️ Vệ tinh 🛰️ ➡️ Thiên hà 🌌.',
    hint: 'Tìm chuỗi lặp: 🚀 ➡️ 🛸 ➡️ 🛰️ ➡️ 🌌 ➡️ 🚀...',
    mascot: { ...MAYLE, message: 'Kiểm soát lộ trình thám hiểm vũ trụ không bao giờ bị lạc lối!' },
    activity: {
      type: 'flowerMaze',
      pattern: ['🚀', '🛸', '🛰️', '🌌'],
      ruleTitle: 'Hạm đội vũ trụ: 🚀 ➡️ 🛸 ➡️ 🛰️ ➡️ 🌌',
      startPos: [0, 0],
      goalPos: [3, 3],
      startIcon: '👨‍🚀',
      startLabel: 'Phi Hành Gia',
      goalIcon: '🏆',
      goalLabel: 'Cúp Không Gian',
      grid: [
        ['🚀', '🛸', '🛰️', '🌌'],
        ['🌌', '🛰️', '🛸', '🚀'],
        ['🛰️', '🌌', '🚀', '🛸'],
        ['🛸', '🚀', '🌌', '🛰️']
      ],
      targetPath: [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 3], [2, 3], [3, 3]
      ],
      successMessage: 'Phi hành gia đã đến được bục trao cúp vinh quang!'
    }
  },
  {
    id: 'pat-41',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Cấp Số Cộng Bước Nhảy 7: Lũy Tiến Bền Vững',
    badgeTitle: 'Bài 41 · Độ khó Cấp 26',
    instruction: 'Tìm số tiếp theo trong dãy số: 12, 19, 26, 33, 40, [?].',
    hint: 'Khoảng cách giữa các số liên tiếp là +7: 12 (+7) = 19; 19 (+7) = 26; 26 (+7) = 33; 33 (+7) = 40; 40 (+7) = ?',
    mascot: { ...BENNY, message: 'Mỗi bước nhảy đều đặn thêm đúng 7 đơn vị!' },
    activity: {
      type: 'sequencePattern',
      title: 'Dãy Số Bước Nhảy +7',
      ruleExplanation: 'Cộng thêm 7 vào số đứng trước: 40 + 7 = 47.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '12', subLabel: '+7' },
        { id: 2, label: '19', subLabel: '+7' },
        { id: 3, label: '26', subLabel: '+7' },
        { id: 4, label: '33', subLabel: '+7' },
        { id: 5, label: '40', subLabel: '+7' },
        { id: 6, label: '?', isMissing: true, subLabel: '40+7' }
      ],
      choices: [
        { id: 'c1', label: '45', subLabel: 'Cộng 5' },
        { id: 'c2', label: '46', subLabel: 'Cộng 6' },
        { id: 'c3', label: '47', subLabel: '40 + 7 = 47' },
        { id: 'c4', label: '48', subLabel: 'Cộng 8' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Quy luật: Số tiếp theo = 40 + 7 = 47!'
    }
  },
  {
    id: 'pat-42',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Nhân Đôi Rồi Cộng Một: Tăng Tốc Nhảy Vọt',
    badgeTitle: 'Bài 42 · Độ khó Cấp 27',
    instruction: 'Tìm số tiếp theo trong chuỗi số đặc biệt: 1, 3, 7, 15, 31, [?].',
    hint: 'Quy luật: Mỗi số bằng số trước nhân đôi rồi cộng 1. (1x2+1=3), (3x2+1=7), (7x2+1=15), (15x2+1=31), (31x2+1=?).',
    mascot: { ...MAYLE, message: 'Quy luật kết hợp cả phép nhân và phép cộng: x2 rồi +1!' },
    activity: {
      type: 'sequencePattern',
      title: 'Chuỗi Biến Đổi x2 + 1',
      ruleExplanation: 'Mỗi số bằng số trước nhân 2 rồi cộng 1: 31 x 2 + 1 = 62 + 1 = 63.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1', subLabel: 'x2+1' },
        { id: 2, label: '3', subLabel: 'x2+1' },
        { id: 3, label: '7', subLabel: 'x2+1' },
        { id: 4, label: '15', subLabel: 'x2+1' },
        { id: 5, label: '31', subLabel: 'x2+1' },
        { id: 6, label: '?', isMissing: true, subLabel: '31x2+1' }
      ],
      choices: [
        { id: 'c1', label: '61', subLabel: 'Chưa cộng 1' },
        { id: 'c2', label: '62', subLabel: 'Chỉ nhân 2' },
        { id: 'c3', label: '63', subLabel: '31 x 2 + 1 = 63' },
        { id: 'c4', label: '65', subLabel: 'Cộng thừa' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Số tiếp theo = 31 × 2 + 1 = 62 + 1 = 63!'
    }
  },
  {
    id: 'pat-43',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'SIÊU THỬ THÁCH QUY LUẬT OLYMPIC TRẠM 4: Kim Tự Tháp 5 Tầng Cực Hạn',
    badgeTitle: 'Bài 43 · Đỉnh Cao Trạm 4 Tuyệt Đối',
    instruction: 'Đại thử thách quy luật tối hậu: Tìm số trên đỉnh kim tự tháp 5 tầng với đáy là 1, 2, 3, 4, 5. Mỗi số ở tầng trên bằng tổng hai số kề nhau ngay dưới nó.',
    hint: 'Tầng 2: 3, 5, 7, 9. Tầng 3: 8, 12, 16. Tầng 4: 20, 28. Đỉnh tháp: 20 + 28 = ?',
    mascot: { ...MAYLE, message: 'Đỉnh cao trí tuệ quy luật toán học! Em chính thức bước lên ngai vàng Phù Thủy Quy Luật!' },
    activity: {
      type: 'sequencePattern',
      title: 'Kim Tự Tháp Ngũ Tầng Đỉnh Cao',
      ruleExplanation: 'Tầng 4 gồm hai số 20 và 28. Đỉnh kim tự tháp = 20 + 28 = 48.',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '1', subLabel: 'Đáy' },
        { id: 2, label: '2', subLabel: 'Đáy' },
        { id: 3, label: '3', subLabel: 'Đáy' },
        { id: 4, label: '4', subLabel: 'Đáy' },
        { id: 5, label: '5', subLabel: 'Đáy' },
        { id: 6, label: '3', subLabel: '1+2' },
        { id: 7, label: '5', subLabel: '2+3' },
        { id: 8, label: '7', subLabel: '3+4' },
        { id: 9, label: '9', subLabel: '4+5' },
        { id: 10, label: '8', subLabel: '3+5' },
        { id: 11, label: '12', subLabel: '5+7' },
        { id: 12, label: '16', subLabel: '7+9' },
        { id: 13, label: '20', subLabel: '8+12' },
        { id: 14, label: '28', subLabel: '12+16' },
        { id: 15, label: '?', isMissing: true, subLabel: '20+28' }
      ],
      choices: [
        { id: 'top1', label: '44', subLabel: 'Thiếu 4' },
        { id: 'top2', label: '46', subLabel: 'Thiếu 2' },
        { id: 'top3', label: '48', subLabel: '20 + 28 = 48' },
        { id: 'top4', label: '50', subLabel: 'Cộng nhầm' }
      ],
      correctChoiceId: 'top3',
      correctExplanation: 'Hai số tầng 4 là 20 và 28. Đỉnh kim tự tháp = 20 + 28 = 48!'
    }
  },
  {
    id: 'pat-44',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Bình Phương Thiên Hà: Quy Luật Nhân Chính Mình',
    badgeTitle: 'Bài 44 · Độ khó Cấp 29',
    instruction: 'Khám phá quy luật dãy số chính phương: 1, 4, 9, 16, 25, 36, [?]. Tìm số thích hợp thay cho dấu [?].',
    hint: 'Mỗi số bằng vị trí của nó nhân với chính nó: 1×1=1, 2×2=4, 3×3=9, 4×4=16, 5×5=25, 6×6=36, 7×7=?',
    mascot: { ...MAYLE, message: 'Khi một số tự nhân với chính nó, ta gọi là số chính phương!' },
    activity: {
      type: 'sequencePattern',
      title: 'Chuỗi Số Chính Phương (n × n)',
      ruleExplanation: 'Số thứ 7 trong dãy bằng 7 × 7 = 49.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1', subLabel: '1×1' },
        { id: 2, label: '4', subLabel: '2×2' },
        { id: 3, label: '9', subLabel: '3×3' },
        { id: 4, label: '16', subLabel: '4×4' },
        { id: 5, label: '25', subLabel: '5×5' },
        { id: 6, label: '36', subLabel: '6×6' },
        { id: 7, label: '?', isMissing: true, subLabel: '7×7' }
      ],
      choices: [
        { id: 'c1', label: '45', subLabel: '36 + 9' },
        { id: 'c2', label: '48', subLabel: 'Thiếu 1' },
        { id: 'c3', label: '49', subLabel: '7 × 7 = 49' },
        { id: 'c4', label: '52', subLabel: 'Vượt quá' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Số hạng thứ 7 là 7 × 7 = 49 (cũng chính là +3, +5, +7, +9, +11, +13)!'
    }
  },
  {
    id: 'pat-45',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Pha Lê 4 Chu Kỳ: Đường Hầm Không Gian',
    badgeTitle: 'Bài 45 · Độ khó Cấp 30',
    instruction: 'Dẫn đường phi hành gia đi từ Kim Cương 💎 góc trên trái tới Đích 💎 góc dưới phải theo đúng chu kỳ 4 bước lặp lại: 💎 ➔ 🪐 ➔ 🌟 ➔ ☄️.',
    hint: 'Từ ô (1,1) 💎 đi sang phải qua 🪐 ➔ 🌟, xuống dưới gặp ☄️ ➔ 💎, tiếp tục bậc thang theo đúng 💎 ➔ 🪐 ➔ 🌟 ➔ ☄️!',
    mascot: { ...ABBY, message: 'Chu kỳ 4 biểu tượng đòi hỏi sự tập trung cực cao, hãy kiểm tra từng bước chân!' },
    activity: {
      type: 'flowerMaze',
      ruleTitle: 'Chu kỳ 4 biểu tượng: 💎 ➔ 🪐 ➔ 🌟 ➔ ☄️',
      pattern: ['💎', '🪐', '🌟', '☄️'],
      patternDisplay: [
        { icon: '💎', name: 'Pha lê' },
        { icon: '🪐', name: 'Thổ tinh' },
        { icon: '🌟', name: 'Sao sáng' },
        { icon: '☄️', name: 'Sao chổi' }
      ],
      startPos: [0, 0],
      goalPos: [6, 6],
      startIcon: '👩‍🚀',
      startLabel: 'Xuất phát',
      goalIcon: '🛸',
      goalLabel: 'Trạm Đích',
      successMessage: '🎉 Tuyệt vời! Em đã chinh phục mê cung chu kỳ 4 bước chuẩn xác tuyệt đối!',
      grid: [
        ['💎', '🪐', '🌟', '💎', '☄️', '🌟', '🪐'],
        ['☄️', '🌟', '☄️', '🪐', '💎', '☄️', '🌟'],
        ['🌟', '🪐', '💎', '🪐', '🌟', '💎', '☄️'],
        ['💎', '☄️', '🌟', '🌟', '☄️', '🪐', '💎'],
        ['🪐', '🌟', '☄️', '💎', '💎', '🪐', '🌟'],
        ['☄️', '💎', '🪐', '🌟', '☄️', '🌟', '☄️'],
        ['🌟', '☄️', '💎', '🪐', '🌟', '💎', '💎']
      ],
      targetPath: [
        [0, 0], [0, 1], [0, 2], [1, 2], [2, 2], [2, 3], [3, 3],
        [3, 4], [4, 4], [4, 5], [5, 5], [5, 6], [6, 6]
      ]
    }
  },
  {
    id: 'pat-46',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Nhân Đôi Cộng Hai: Vượt Tốc Độ Ánh Sáng',
    badgeTitle: 'Bài 46 · Độ khó Cấp 31',
    instruction: 'Tìm số tiếp theo trong dãy số tăng tốc: 2, 6, 14, 30, 62, [?].',
    hint: 'Mỗi số bằng số đứng trước nhân 2 rồi cộng thêm 2: (2×2+2=6), (6×2+2=14), (14×2+2=30), (30×2+2=62), (62×2+2=?).',
    mascot: { ...BENNY, message: 'Công thức bí mật là ×2 rồi +2! Hãy tính thật cẩn thận nhé!' },
    activity: {
      type: 'sequencePattern',
      title: 'Quy Luật Biến Đổi ×2 + 2',
      ruleExplanation: 'Mỗi số bằng số liền trước nhân 2 cộng 2: 62 × 2 + 2 = 124 + 2 = 126.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '2', subLabel: '×2+2' },
        { id: 2, label: '6', subLabel: '×2+2' },
        { id: 3, label: '14', subLabel: '×2+2' },
        { id: 4, label: '30', subLabel: '×2+2' },
        { id: 5, label: '62', subLabel: '×2+2' },
        { id: 6, label: '?', isMissing: true, subLabel: '62×2+2' }
      ],
      choices: [
        { id: 'c1', label: '124', subLabel: 'Quên cộng 2' },
        { id: 'c2', label: '126', subLabel: '62 × 2 + 2 = 126' },
        { id: 'c3', label: '128', subLabel: 'Cộng 4' },
        { id: 'c4', label: '130', subLabel: 'Cộng 6' }
      ],
      correctChoiceId: 'c2',
      correctExplanation: '62 × 2 + 2 = 124 + 2 = 126!'
    }
  },
  {
    id: 'pat-47',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Bước Nhảy Chẵn Tăng Dần: Thang Số Thần Kỳ',
    badgeTitle: 'Bài 47 · Độ khó Cấp 32',
    instruction: 'Tìm số còn thiếu trong dãy số: 5, 9, 15, 23, 33, [?].',
    hint: 'Tìm hiệu hai số kề nhau: 9-5=4, 15-9=6, 23-15=8, 33-23=10. Bước nhảy tiếp theo là +12!',
    mascot: { ...CASEY, message: 'Khoảng cách giữa các số cũng tự tạo thành một quy luật tăng thêm 2 đơn vị!' },
    activity: {
      type: 'sequencePattern',
      title: 'Dãy Số Hiệu Tăng Dần (+4, +6, +8, +10, +12)',
      ruleExplanation: 'Khoảng cách tăng dần theo số chẵn: 33 + 12 = 45.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '5', subLabel: '+4' },
        { id: 2, label: '9', subLabel: '+6' },
        { id: 3, label: '15', subLabel: '+8' },
        { id: 4, label: '23', subLabel: '+10' },
        { id: 5, label: '33', subLabel: '+12' },
        { id: 6, label: '?', isMissing: true, subLabel: '33+12' }
      ],
      choices: [
        { id: 'c1', label: '43', subLabel: '+10' },
        { id: 'c2', label: '44', subLabel: '+11' },
        { id: 'c3', label: '45', subLabel: '33 + 12 = 45' },
        { id: 'c4', label: '47', subLabel: '+14' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Bước nhảy kế tiếp là +12 nên số cần tìm là 33 + 12 = 45!'
    }
  },
  {
    id: 'pat-48',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Ma Trận 2x2 Xoay Ngược Chiều Kim Đồng Hồ',
    badgeTitle: 'Bài 48 · Độ khó Cấp 33',
    instruction: 'Quan sát cách 4 con số 12, 24, 36, 48 di chuyển từ Ô 1 ➔ Ô 2 ➔ Ô 3 rồi tự điền các số vào Ô 4.',
    hint: 'Số 12 đi từ góc trên trái ➔ dưới trái ➔ dưới phải ➔ vậy ở Ô 4 số 12 nằm ở góc trên phải! Cả 4 số xoay ngược chiều kim đồng hồ 1 góc.',
    mascot: { ...MAYLE, message: 'Lần này vòng xoay đi ngược chiều kim đồng hồ! Em hãy bám theo từng số một nhé!' },
    activity: {
      type: 'matrix2x2',
      title: 'Ma Trận 2x2 Xoay Ngược Chiều Kim Đồng Hồ',
      ruleExplanation: 'Qua mỗi bước, cả 4 số xoay ngược chiều kim đồng hồ 90 độ.',
      sampleGrids: [
        {
          stepNum: 1,
          grid: [
            ['12', '24'],
            ['48', '36']
          ]
        },
        {
          stepNum: 2,
          grid: [
            ['24', '36'],
            ['12', '48']
          ]
        },
        {
          stepNum: 3,
          grid: [
            ['36', '48'],
            ['24', '12']
          ]
        }
      ],
      choices: [
        {
          id: 'opt1',
          label: 'Chuẩn xoay ngược chiều kim đồng hồ',
          grid: [
            ['48', '12'],
            ['36', '24']
          ]
        }
      ],
      correctChoiceId: 'opt1'
    }
  },
  {
    id: 'pat-49',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Tribonacci: Tổng Ba Số Liền Trước',
    badgeTitle: 'Bài 49 · Độ khó Cấp 34',
    instruction: 'Tìm số tiếp theo trong dãy Tribonacci kỳ diệu: 1, 1, 2, 4, 7, 13, 24, [?].',
    hint: 'Mỗi số kể từ số thứ 4 bằng tổng của BA số ngay trước nó: 1+1+2=4, 1+2+4=7, 2+4+7=13, 4+7+13=24, vậy 7+13+24=?',
    mascot: { ...MAYLE, message: 'Không chỉ cộng 2 số như Fibonacci, dãy Tribonacci cộng hẳn 3 số liền trước!' },
    activity: {
      type: 'sequencePattern',
      title: 'Dãy Tribonacci (Tổng 3 Số Trước)',
      ruleExplanation: 'Số tiếp theo bằng tổng 3 số đứng ngay trước nó: 7 + 13 + 24 = 44.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '1', subLabel: 'Khởi đầu' },
        { id: 2, label: '1', subLabel: 'Khởi đầu' },
        { id: 3, label: '2', subLabel: 'Khởi đầu' },
        { id: 4, label: '4', subLabel: '1+1+2' },
        { id: 5, label: '7', subLabel: '1+2+4' },
        { id: 6, label: '13', subLabel: '2+4+7' },
        { id: 7, label: '24', subLabel: '4+7+13' },
        { id: 8, label: '?', isMissing: true, subLabel: '7+13+24' }
      ],
      choices: [
        { id: 'c1', label: '41', subLabel: 'Cộng thiếu' },
        { id: 'c2', label: '43', subLabel: 'Sai hàng đơn vị' },
        { id: 'c3', label: '44', subLabel: '7 + 13 + 24 = 44' },
        { id: 'c4', label: '46', subLabel: 'Cộng thừa' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: '7 + 13 + 24 = 44!'
    }
  },
  {
    id: 'pat-50',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Mê Cung Đại Dương Thần Bí: Đường Chéo Ngược',
    badgeTitle: 'Bài 50 · Độ khó Cấp 35',
    instruction: 'Đi từ Bạch Tuộc 🐙 góc DƯỚI TRÁI lên Đích 🐙 góc TRÊN PHẢI theo đúng vòng lặp 4 loài vật biển: 🐙 ➔ 🐳 ➔ 🐠 ➔ 🦀.',
    hint: 'Bắt đầu từ góc dưới cùng bên trái (hàng 7, cột 1) đi bậc thang lên trên và sang phải: 🐙 ➔ 🐳 ➔ 🐠 ➔ 🦀!',
    mascot: { ...ABBY, message: 'Lần này hành trình đi ngược từ dưới lên trên! Quan sát hướng đi cẩn thận nhé!' },
    activity: {
      type: 'flowerMaze',
      ruleTitle: 'Chu kỳ 4 sinh vật biển: 🐙 ➔ 🐳 ➔ 🐠 ➔ 🦀',
      pattern: ['🐙', '🐳', '🐠', '🦀'],
      patternDisplay: [
        { icon: '🐙', name: 'Bạch tuộc' },
        { icon: '🐳', name: 'Cá voi' },
        { icon: '🐠', name: 'Cá nhiệt đới' },
        { icon: '🦀', name: 'Cua biển' }
      ],
      startPos: [6, 0],
      goalPos: [0, 6],
      startIcon: '🤿',
      startLabel: 'Thợ lặn',
      goalIcon: '🏝️',
      goalLabel: 'Đảo Ngọc',
      successMessage: '🎉 Xuất sắc! Em đã đưa thợ lặn lên Đảo Ngọc theo đúng chu kỳ đại dương!',
      grid: [
        ['🦀', '🐳', '🐠', '🐙', '🐳', '🦀', '🐙'],
        ['🐠', '🐙', '🦀', '🐠', '🐳', '🐠', '🐳'],
        ['🐳', '🦀', '🐙', '🦀', '🐙', '🦀', '🐠'],
        ['🐙', '🐠', '🐳', '🐠', '🐳', '🐙', '🦀'],
        ['🦀', '🦀', '🐙', '🐳', '🐠', '🦀', '🐳'],
        ['🐳', '🐠', '🐳', '🐙', '🦀', '🐠', '🐙'],
        ['🐙', '🦀', '🐠', '🐳', '🐙', '🐳', '🦀']
      ],
      targetPath: [
        [6, 0], [5, 0], [5, 1], [4, 1], [4, 2], [3, 2], [3, 3],
        [2, 3], [2, 4], [1, 4], [1, 5], [0, 5], [0, 6]
      ]
    }
  },
  {
    id: 'pat-51',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Dãy Số Song Song Hai Luồng: Nhân Đôi & Giảm Đều',
    badgeTitle: 'Bài 51 · Độ khó Cấp 36',
    instruction: 'Tìm số còn thiếu ở vị trí thứ 10 của dãy số kép: 2, 100, 4, 90, 8, 80, 16, 70, 32, [?].',
    hint: 'Tách thành 2 dãy xen kẽ: Dãy lẻ (2, 4, 8, 16, 32) nhân đôi. Dãy chẵn (100, 90, 80, 70, ?) trừ đi 10!',
    mascot: { ...BENNY, message: 'Tuyệt chiêu tách đôi dãy số: vị trí lẻ đi một đường, vị trí chẵn đi một đường!' },
    activity: {
      type: 'sequencePattern',
      title: 'Dãy Số Kép Đan Xen Hai Quy Luật',
      ruleExplanation: 'Các vị trí chẵn tạo thành dãy giảm 10: 100, 90, 80, 70, 60.',
      sequenceType: 'numbers',
      items: [
        { id: 1, label: '2', subLabel: 'Lẻ 1' },
        { id: 2, label: '100', subLabel: 'Chẵn 1' },
        { id: 3, label: '4', subLabel: 'Lẻ 2' },
        { id: 4, label: '90', subLabel: 'Chẵn 2' },
        { id: 5, label: '8', subLabel: 'Lẻ 3' },
        { id: 6, label: '80', subLabel: 'Chẵn 3' },
        { id: 7, label: '16', subLabel: 'Lẻ 4' },
        { id: 8, label: '70', subLabel: 'Chẵn 4' },
        { id: 9, label: '32', subLabel: 'Lẻ 5' },
        { id: 10, label: '?', isMissing: true, subLabel: 'Chẵn 5' }
      ],
      choices: [
        { id: 'c1', label: '50', subLabel: 'Giảm 20' },
        { id: 'c2', label: '60', subLabel: '70 - 10 = 60' },
        { id: 'c3', label: '64', subLabel: 'Nhầm sang dãy lẻ' },
        { id: 'c4', label: '65', subLabel: 'Giảm 5' }
      ],
      correctChoiceId: 'c2',
      correctExplanation: 'Vị trí thứ 10 thuộc dãy chẵn giảm dần 10 đơn vị: 70 - 10 = 60!'
    }
  },
  {
    id: 'pat-52',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'Kim Tự Tháp 5 Tầng Số Chẵn: Bội Số Khổng Lồ',
    badgeTitle: 'Bài 52 · Độ khó Cấp 37',
    instruction: 'Tìm số trên đỉnh kim tự tháp 5 tầng với đáy gồm 5 số chẵn: 2, 4, 6, 8, 10 (mỗi ô trên bằng tổng 2 ô kề ngay dưới).',
    hint: 'Tầng 2: 6, 10, 14, 18. Tầng 3: 16, 24, 32. Tầng 4: 40, 56. Vậy đỉnh tháp là 40 + 56 = ?',
    mascot: { ...CASEY, message: 'Mẹo nhanh: đáy gấp đôi bài Kim Tự Tháp 1-2-3-4-5, nên đỉnh cũng gấp đôi 48 đó!' },
    activity: {
      type: 'sequencePattern',
      title: 'Kim Tự Tháp 5 Tầng Số Chẵn',
      ruleExplanation: 'Tầng 4 gồm 40 và 56. Đỉnh kim tự tháp = 40 + 56 = 96.',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '2', subLabel: 'Đáy' },
        { id: 2, label: '4', subLabel: 'Đáy' },
        { id: 3, label: '6', subLabel: 'Đáy' },
        { id: 4, label: '8', subLabel: 'Đáy' },
        { id: 5, label: '10', subLabel: 'Đáy' },
        { id: 6, label: '6', subLabel: '2+4' },
        { id: 7, label: '10', subLabel: '4+6' },
        { id: 8, label: '14', subLabel: '6+8' },
        { id: 9, label: '18', subLabel: '8+10' },
        { id: 10, label: '16', subLabel: '6+10' },
        { id: 11, label: '24', subLabel: '10+14' },
        { id: 12, label: '32', subLabel: '14+18' },
        { id: 13, label: '40', subLabel: '16+24' },
        { id: 14, label: '56', subLabel: '24+32' },
        { id: 15, label: '?', isMissing: true, subLabel: '40+56' }
      ],
      choices: [
        { id: 'c1', label: '88', subLabel: 'Cộng thiếu' },
        { id: 'c2', label: '92', subLabel: 'Thiếu 4' },
        { id: 'c3', label: '96', subLabel: '40 + 56 = 96' },
        { id: 'c4', label: '98', subLabel: 'Cộng thừa' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Hai số tầng 4 là 40 và 56. Đỉnh kim tự tháp = 40 + 56 = 96!'
    }
  },
  {
    id: 'pat-53',
    topicId: 'pattern',
    topicName: topicName('pattern'),
    title: 'SIÊU ĐỈNH CAO QUY LUẬT VŨ TRỤ TRẠM 4: Kim Tự Tháp Bất Đối Xứng 5 Tầng',
    badgeTitle: 'Bài 53 · Huyền Thoại Quy Luật Trạm 4',
    instruction: 'Thử thách tối thượng: Tìm số trên đỉnh kim tự tháp 5 tầng bất đối xứng với hàng đáy: 3, 5, 8, 6, 4.',
    hint: 'Tính từng tầng cẩn thận: Tầng 2: 8, 13, 14, 10. Tầng 3: 21, 27, 24. Tầng 4: 48, 51. Đỉnh: 48 + 51 = ?',
    mascot: { ...MAYLE, message: 'Chinh phục tháp số bất đối xứng này, em chính là Huyền Thoại Quy Luật của Trạm 4!' },
    activity: {
      type: 'sequencePattern',
      title: 'Kim Tự Tháp Bất Đối Xứng 5 Tầng',
      ruleExplanation: 'Tầng 4 gồm 48 và 51. Đỉnh tháp = 48 + 51 = 99.',
      sequenceType: 'pyramid',
      items: [
        { id: 1, label: '3', subLabel: 'Đáy' },
        { id: 2, label: '5', subLabel: 'Đáy' },
        { id: 3, label: '8', subLabel: 'Đáy' },
        { id: 4, label: '6', subLabel: 'Đáy' },
        { id: 5, label: '4', subLabel: 'Đáy' },
        { id: 6, label: '8', subLabel: '3+5' },
        { id: 7, label: '13', subLabel: '5+8' },
        { id: 8, label: '14', subLabel: '8+6' },
        { id: 9, label: '10', subLabel: '6+4' },
        { id: 10, label: '21', subLabel: '8+13' },
        { id: 11, label: '27', subLabel: '13+14' },
        { id: 12, label: '24', subLabel: '14+10' },
        { id: 13, label: '48', subLabel: '21+27' },
        { id: 14, label: '51', subLabel: '27+24' },
        { id: 15, label: '?', isMissing: true, subLabel: '48+51' }
      ],
      choices: [
        { id: 'c1', label: '95', subLabel: 'Thiếu 4' },
        { id: 'c2', label: '97', subLabel: 'Thiếu 2' },
        { id: 'c3', label: '99', subLabel: '48 + 51 = 99' },
        { id: 'c4', label: '101', subLabel: 'Cộng thừa' }
      ],
      correctChoiceId: 'c3',
      correctExplanation: 'Đỉnh kim tự tháp bất đối xứng = 48 + 51 = 99!'
    }
  }
];


