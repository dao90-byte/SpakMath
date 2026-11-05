import { LessonQuestion, CASEY, MAYLE, topicName } from './lessonTypes';

export const EXTENDED_SUDOKU_LESSONS: LessonQuestion[] = [
  {
    id: 'sud-25',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku Jigsaw 4x4: Khối Chữ T Đan Xen',
    badgeTitle: 'Bài 25 · Độ khó Cấp 10',
    instruction: 'Điền các chữ số từ 1 đến 4 vào lưới sao cho: Mỗi hàng, mỗi cột và mỗi khối màu chữ T kỳ diệu đều chứa đủ các số 1, 2, 3, 4 không trùng lặp.',
    hint: 'Khối màu chữ T hoạt động giống như một khối vuông 2x2: không được có 2 số giống nhau trong cùng một màu!',
    mascot: { ...CASEY, message: 'Các khối màu zic-zac đòi hỏi em phải quan sát cả hình dạng khối nữa nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [1, null, null, 3],
        [null, 2, 1, null],
        [null, 3, 4, null],
        [4, null, null, 2]
      ],
      solution: [
        [1, 4, 2, 3],
        [3, 2, 1, 4],
        [2, 3, 4, 1],
        [4, 1, 3, 2]
      ],
      colorBlocks: [
        ['#dbeafe', '#dbeafe', '#fef3c7', '#fef3c7'],
        ['#dbeafe', '#dbeafe', '#fef3c7', '#fef3c7'],
        ['#dcfce7', '#dcfce7', '#fee2e2', '#fee2e2'],
        ['#dcfce7', '#dcfce7', '#fee2e2', '#fee2e2']
      ]
    }
  },
  {
    id: 'sud-26',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku 4x4: Khung Tổng Liên Hoàn Nâng Cao',
    badgeTitle: 'Bài 26 · Độ khó Cấp 11',
    instruction: 'Điền các số 1 đến 4. Số nhỏ ở góc trên bên trái mỗi chuồng biểu thị tổng của các số trong chuồng đó.',
    hint: 'Chuồng 2 ô có tổng bằng 3 chỉ có thể là {1, 2}. Chuồng 2 ô có tổng bằng 7 chỉ có thể là {3, 4}.',
    mascot: { ...CASEY, message: 'Kết hợp phép cộng và quy tắc loại trừ Sudoku để tìm ra con số duy nhất!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, null, null, null],
        [null, 4, null, null],
        [null, null, 3, null],
        [null, null, null, null]
      ],
      solution: [
        [2, 1, 4, 3],
        [3, 4, 2, 1],
        [1, 2, 3, 4],
        [4, 3, 1, 2]
      ],
      sumLabels: [
        [3, null, 7, null],
        [7, null, 3, null],
        [3, null, 7, null],
        [7, null, 3, null]
      ],
      colorBlocks: [
        ['#e0f2fe', '#e0f2fe', '#fef08a', '#fef08a'],
        ['#fed7aa', '#fed7aa', '#bbf7d0', '#bbf7d0'],
        ['#fce7f3', '#fce7f3', '#e0e7ff', '#e0e7ff'],
        ['#fef3c7', '#fef3c7', '#ccfbf1', '#ccfbf1']
      ]
    }
  },
  {
    id: 'sud-27',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Magic Square 3x3: Bội Số Của 4 (Tổng = 36)',
    badgeTitle: 'Bài 27 · Độ khó Cấp 12',
    instruction: 'Điền các số vào ô vuông ma thuật 3x3 sao cho tổng của mỗi hàng, mỗi cột và mỗi đường chéo đều bằng 36. Ô chính giữa bắt buộc là 12!',
    hint: 'Quy tắc ma phương 3x3: Ô trung tâm = Tổng mục tiêu : 3 = 36 : 3 = 12.',
    mascot: { ...MAYLE, message: 'Số ở ô trung tâm chính là chìa khóa mở khóa toàn bộ ma trận số học!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Phương Bội Số 4 (Tổng = 36)',
      subtitle: 'Tổng mỗi hàng, cột và đường chéo = 36',
      targetSum: 36,
      allowedNumbers: [4, 6, 8, 10, 12, 14, 16, 18, 20],
      initialGrid: [
        [14, null, 18],
        [null, 12, null],
        [6, null, 10]
      ],
      solution: [
        [14, 4, 18],
        [16, 12, 8],
        [6, 20, 10]
      ],
      hintFormula: 'Hàng 1: 14 + ? + 18 = 36 ➡️ ? = 4. Hàng 3: 6 + ? + 10 = 36 ➡️ ? = 20.'
    }
  },
  {
    id: 'sud-28',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku Biểu Tượng 4x4: Bốn Nguyên Tố Cổ Đại',
    badgeTitle: 'Bài 28 · Độ khó Cấp 13',
    instruction: 'Điền 4 nguyên tố: Lửa 🔥, Nước 💧, Đất 🌿, Gió 🌪️ vào lưới sao cho mỗi hàng, cột và khối 2x2 đều chứa đủ 4 nguyên tố không trùng lặp.',
    hint: 'Tìm hàng hoặc cột đã có sẵn 3 nguyên tố để điền nguyên tố còn thiếu trước tiên.',
    mascot: { ...CASEY, message: 'Bốn nguyên tố tự nhiên hòa quyện trên bàn cờ Sudoku tuyệt đẹp!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'fire', icon: '🔥', name: 'Lửa' },
        { id: 'water', icon: '💧', name: 'Nước' },
        { id: 'earth', icon: '🌿', name: 'Đất' },
        { id: 'wind', icon: '🌪️', name: 'Gió' }
      ],
      initialGrid: [
        ['fire', null, null, 'wind'],
        [null, 'wind', 'fire', null],
        [null, 'fire', 'wind', null],
        ['wind', null, null, 'fire']
      ],
      solution: [
        ['fire', 'water', 'earth', 'wind'],
        ['earth', 'wind', 'fire', 'water'],
        ['water', 'fire', 'wind', 'earth'],
        ['wind', 'earth', 'water', 'fire']
      ],
      colorBlocks: [
        ['#fef2f2', '#fef2f2', '#eff6ff', '#eff6ff'],
        ['#fef2f2', '#fef2f2', '#eff6ff', '#eff6ff'],
        ['#f0fdf4', '#f0fdf4', '#faf5ff', '#faf5ff'],
        ['#f0fdf4', '#f0fdf4', '#faf5ff', '#faf5ff']
      ]
    }
  },
  {
    id: 'sud-29',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku Jigsaw 4x4: Khối Đa Giác Chữ Z Bất Đối Xứng',
    badgeTitle: 'Bài 29 · Độ khó Cấp 14',
    instruction: 'Ma trận Sudoku với các khối màu đa giác uốn lượn. Hãy đảm bảo mỗi hàng, mỗi cột và mỗi khối màu đều có đủ các chữ số từ 1 đến 4.',
    hint: 'Kiểm tra kỹ khối màu hồng và khối màu xanh lam để không bị trùng số.',
    mascot: { ...CASEY, message: 'Càng uốn lượn thì càng thú vị! Hãy dùng phương pháp loại trừ nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, 2, 3, null],
        [1, null, null, 2],
        [2, null, null, 3],
        [null, 1, 2, null]
      ],
      solution: [
        [4, 2, 3, 1],
        [1, 3, 4, 2],
        [2, 4, 1, 3],
        [3, 1, 2, 4]
      ],
      colorBlocks: [
        ['#fce7f3', '#fce7f3', '#e0e7ff', '#e0e7ff'],
        ['#fce7f3', '#fce7f3', '#e0e7ff', '#e0e7ff'],
        ['#ccfbf1', '#ccfbf1', '#fed7aa', '#fed7aa'],
        ['#ccfbf1', '#ccfbf1', '#fed7aa', '#fed7aa']
      ]
    }
  },
  {
    id: 'sud-30',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku 4x4: Khung Tổng Đối Xứng Bậc Thầy',
    badgeTitle: 'Bài 30 · Độ khó Cấp 15',
    instruction: 'Giải mã bảng Killer Sudoku đối xứng: Điền các số 1 đến 4 sao cho tổng các số trong mỗi chuồng nét đứt khớp đúng với nhãn tổng ghi ở góc.',
    hint: 'Chuồng 2 ô có tổng 7 chỉ có thể là {3, 4}. Chuồng 2 ô có tổng 3 chỉ có thể là {1, 2}.',
    mascot: { ...MAYLE, message: 'Sự kết hợp giữa số học và logic tư duy đỉnh cao!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, 3, null, null],
        [null, null, 4, null],
        [null, 1, null, null],
        [null, null, null, 2]
      ],
      solution: [
        [4, 3, 2, 1],
        [1, 2, 4, 3],
        [2, 1, 3, 4],
        [3, 4, 1, 2]
      ],
      sumLabels: [
        [7, null, 3, null],
        [3, null, 7, null],
        [3, null, 7, null],
        [7, null, 3, null]
      ],
      colorBlocks: [
        ['#fef9c3', '#fef9c3', '#dbeafe', '#dbeafe'],
        ['#fed7aa', '#fed7aa', '#bbf7d0', '#bbf7d0'],
        ['#dcfce7', '#dcfce7', '#fee2e2', '#fee2e2'],
        ['#fce7f3', '#fce7f3', '#e0e7ff', '#e0e7ff']
      ]
    }
  },
  {
    id: 'sud-31',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Magic Square 3x3: Bội Số Của 5 (Tổng = 45)',
    badgeTitle: 'Bài 31 · Độ khó Cấp 16',
    instruction: 'Điền các số vào ma phương 3x3 sao cho mỗi hàng, mỗi cột và mỗi đường chéo đều có tổng bằng đúng 45. Ô chính giữa là 15!',
    hint: 'Hàng 1: 21 + ? + 17 = 45 ➡️ ? = 7. Hàng 2: ? + 15 + 19 = 45 ➡️ ? = 11.',
    mascot: { ...MAYLE, message: 'Một kỳ quan toán học cổ xưa! Tổng 45 với ô trung tâm 15 tuyệt đẹp!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Phương Đẳng Cấp (Tổng = 45)',
      subtitle: 'Tổng mỗi hàng, cột và đường chéo = 45',
      targetSum: 45,
      allowedNumbers: [7, 9, 11, 13, 15, 17, 19, 21, 23],
      initialGrid: [
        [21, null, 17],
        [null, 15, null],
        [13, null, 9]
      ],
      solution: [
        [21, 7, 17],
        [11, 15, 19],
        [13, 23, 9]
      ],
      hintFormula: 'Cột 1: 21 + 11 + 13 = 45. Cột 2: 7 + 15 + 23 = 45. Cột 3: 17 + 19 + 9 = 45.'
    }
  },
  {
    id: 'sud-32',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku 4x4 Suy Luận Tối Giản: 4 Manh Mối Khởi Đầu',
    badgeTitle: 'Bài 32 · Độ khó Cấp 17',
    instruction: 'Thử thách độ khó cao: Bảng Sudoku 4x4 chỉ cho trước 4 con số gợi ý. Em phải suy luận giao điểm hàng và cột để mở đường giải mã.',
    hint: 'Tìm hàng hoặc cột có 2 số trước, dùng phương pháp loại trừ để điền các ô tiếp theo.',
    mascot: { ...CASEY, message: 'Ít manh mối ban đầu là lúc khả năng suy luận tỏa sáng nhất!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, 1, null, null],
        [null, null, 2, null],
        [null, 4, null, null],
        [null, null, null, 4]
      ],
      solution: [
        [2, 1, 4, 3],
        [4, 3, 2, 1],
        [1, 4, 3, 2],
        [3, 2, 1, 4]
      ],
      colorBlocks: [
        ['#f0fdf4', '#f0fdf4', '#fefce8', '#fefce8'],
        ['#f0fdf4', '#f0fdf4', '#fefce8', '#fefce8'],
        ['#eff6ff', '#eff6ff', '#fdf2f8', '#fdf2f8'],
        ['#eff6ff', '#eff6ff', '#fdf2f8', '#fdf2f8']
      ]
    }
  },
  {
    id: 'sud-33',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku 4x4 Cực Hạn: Chuồng Đôi Thử Thách',
    badgeTitle: 'Bài 33 · Độ khó Cấp 18',
    instruction: 'Bảng Killer Sudoku cấp độ Thạc Sĩ: Các chuồng tổng 4, 6 liên hoàn thử thách khả năng tính nhẩm kết hợp loại trừ vị trí.',
    hint: 'Chuồng tổng bằng 4 của 2 ô chỉ có thể là {1, 3}. Chuồng tổng bằng 6 của 2 ô chỉ có thể là {2, 4}.',
    mascot: { ...CASEY, message: 'Nhận diện ngay các cặp số duy nhất để điền chính xác 100%!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [1, null, null, null],
        [null, null, 1, null],
        [null, 4, null, null],
        [null, null, null, 2]
      ],
      solution: [
        [1, 3, 2, 4],
        [4, 2, 1, 3],
        [2, 4, 3, 1],
        [3, 1, 4, 2]
      ],
      sumLabels: [
        [4, null, 6, null],
        [6, null, 4, null],
        [6, null, 4, null],
        [4, null, 6, null]
      ],
      colorBlocks: [
        ['#e0f2fe', '#e0f2fe', '#fef08a', '#fef08a'],
        ['#fed7aa', '#fed7aa', '#bbf7d0', '#bbf7d0'],
        ['#dcfce7', '#dcfce7', '#fee2e2', '#fee2e2'],
        ['#fef9c3', '#fef9c3', '#e0e7ff', '#e0e7ff']
      ]
    }
  },
  {
    id: 'sud-34',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'ĐẠI THỬ THÁCH TRẠM 3: Ma Phương Kỳ Ảo 3x3 (Tổng = 60)',
    badgeTitle: 'Bài 34 · Đại Thử Thách Trạm 3 Mở Rộng',
    instruction: 'Đỉnh cao ma trận số học: Hoàn thành ma phương 3x3 có tổng mỗi hàng, mỗi cột và mỗi đường chéo đều bằng đúng 60! Ô chính giữa là 20.',
    hint: 'Hàng 1: 29 + ? + 23 = 60 ➡️ ? = 8. Cột 1: 29 + ? + 17 = 60 ➡️ ? = 14.',
    mascot: { ...MAYLE, message: 'Chúc mừng em đã chinh phục đỉnh cao trí tuệ Ma Trận Số Học của Trạm 3!' },
    activity: {
      type: 'numberMatrix',
      title: 'Đại Thử Thách Ma Phương (Tổng = 60)',
      subtitle: 'Mỗi hàng, cột và đường chéo = 60',
      targetSum: 60,
      allowedNumbers: [8, 11, 14, 17, 20, 23, 26, 29, 32],
      initialGrid: [
        [29, null, 23],
        [null, 20, null],
        [17, null, 11]
      ],
      solution: [
        [29, 8, 23],
        [14, 20, 26],
        [17, 32, 11]
      ],
      hintFormula: 'Đường chéo 1: 29 + 20 + 11 = 60. Đường chéo 2: 23 + 20 + 17 = 60.'
    }
  }
];
