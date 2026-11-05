import { LessonQuestion, ABBY, CASEY, MAYLE, topicName } from './lessonTypes';

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
  }
];
