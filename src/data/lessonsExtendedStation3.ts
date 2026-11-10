import { LessonQuestion, ABBY, BENNY, CASEY, MAYLE, topicName } from './lessonTypes';

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
  },
  {
    id: 'sud-35',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku 4x4: Bốn Vùng Đổi Xứng Kỳ Thú',
    badgeTitle: 'Bài 35 · Độ khó Cấp 19',
    instruction: 'Điền các chữ số từ 1 đến 4 vào ô trống sao cho: Mỗi hàng, mỗi cột và mỗi khối vuông 2x2 đều chứa đủ các số 1, 2, 3, 4.',
    hint: 'Xét hàng 1 đã có 1, 4. Cột 2 đã có 3. Ô (1,2) chỉ có thể là 2!',
    mascot: { ...CASEY, message: 'Tập trung vào hàng hoặc cột chỉ còn thiếu đúng 1 chữ số trước nhé!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [1, null, null, 4],
        [null, 3, 2, null],
        [null, 2, 3, null],
        [4, null, null, 1]
      ],
      solution: [
        [1, 2, 4, 3],
        [4, 3, 2, 1],
        [2, 4, 3, 2],
        [3, 1, 1, 4]
      ]
    }
  },
  {
    id: 'sud-36',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Kỳ Ảo 3x3: Tổng Các Hàng & Cột Bằng 45',
    badgeTitle: 'Bài 36 · Độ khó Cấp 20',
    instruction: 'Điền các số thích hợp vào ô trống ma phương 3x3 sao cho tổng mỗi hàng, mỗi cột và mỗi đường chéo đều bằng 45. Ô chính giữa là 15.',
    hint: 'Số ở ô chính giữa = 45 : 3 = 15. Hàng 1: 24 + 3 + 18 = 45. Cột 1: 24 + 9 + 12 = 45.',
    mascot: { ...MAYLE, message: 'Ma phương toán học: Ô trung tâm luôn bằng một phần ba tổng hàng!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Phương Học Thuật (Tổng = 45)',
      subtitle: 'Mỗi hàng, cột, đường chéo = 45',
      targetSum: 45,
      allowedNumbers: [3, 6, 9, 12, 15, 18, 21, 24, 27],
      initialGrid: [
        [24, null, 18],
        [null, 15, null],
        [12, null, 6]
      ],
      solution: [
        [24, 3, 18],
        [9, 15, 21],
        [12, 27, 6]
      ],
      hintFormula: 'Đường chéo 1: 24 + 15 + 6 = 45. Đường chéo 2: 18 + 15 + 12 = 45.'
    }
  },
  {
    id: 'sud-37',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku 4x4: Lồng Tổng Đa Sắc',
    badgeTitle: 'Bài 37 · Độ khó Cấp 21',
    instruction: 'Điền các chữ số 1 đến 4 sao cho thỏa mãn luật Sudoku 4x4 và tổng các số trong mỗi lồng màu bằng đúng số góc trên bên trái.',
    hint: 'Lồng tổng 3 gồm 2 ô chỉ có thể là 1 + 2. Lồng tổng 7 gồm 2 ô chỉ có thể là 3 + 4.',
    mascot: { ...CASEY, message: 'Kết hợp tư duy Sudoku và tính tổng nhanh là bí quyết chiến thắng!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null],
        [null, null, null, null]
      ],
      solution: [
        [1, 2, 3, 4],
        [3, 4, 1, 2],
        [2, 1, 4, 3],
        [4, 3, 2, 1]
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
        ['#dcfce7', '#dcfce7', '#fee2e2', '#fee2e2'],
        ['#fef9c3', '#fef9c3', '#e0e7ff', '#e0e7ff']
      ]
    }
  },
  {
    id: 'sud-38',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Bội Số 5: Tổng Kỳ Ảo 75',
    badgeTitle: 'Bài 38 · Độ khó Cấp 22',
    instruction: 'Hoàn thành ma phương 3x3 có tổng mỗi hàng, cột và đường chéo bằng 75. Ô chính giữa là 25.',
    hint: 'Hàng 1: 40 + ? + 30 = 75 ➡️ ? = 5. Cột 1: 40 + ? + 20 = 75 ➡️ ? = 15.',
    mascot: { ...MAYLE, message: 'Các số trong ma phương này đều là bội số của 5 đấy!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Phương Bội Số 5 (Tổng = 75)',
      subtitle: 'Mỗi hàng, cột, đường chéo = 75',
      targetSum: 75,
      allowedNumbers: [5, 10, 15, 20, 25, 30, 35, 40, 45],
      initialGrid: [
        [40, null, 30],
        [null, 25, null],
        [20, null, 10]
      ],
      solution: [
        [40, 5, 30],
        [15, 25, 35],
        [20, 45, 10]
      ],
      hintFormula: 'Đường chéo 1: 40 + 25 + 10 = 75. Đường chéo 2: 30 + 25 + 20 = 75.'
    }
  },
  {
    id: 'sud-39',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku Vũ Trụ 4x4: Bốn Biểu Tượng Thiên Hà',
    badgeTitle: 'Bài 39 · Độ khó Cấp 23',
    instruction: 'Sắp xếp 4 biểu tượng vũ trụ: Phi thuyền 🚀, Đĩa bay 🛸, Vệ tinh 🛰️, Ngôi sao ⭐ vào lưới sao cho không biểu tượng nào trùng lặp trên cùng hàng, cột hay khối 2x2.',
    hint: 'Quan sát hàng có 3 biểu tượng trước, biểu tượng còn lại chính là đáp án ô trống!',
    mascot: { ...BENNY, message: 'Không gian vũ trụ rực rỡ! Đưa các biểu tượng vào đúng quỹ đạo nào!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'shape',
      symbols: [
        { id: 'rocket', icon: '🚀', name: 'Phi thuyền' },
        { id: 'ufo', icon: '🛸', name: 'Đĩa bay' },
        { id: 'satellite', icon: '🛰️', name: 'Vệ tinh' },
        { id: 'star', icon: '⭐', name: 'Ngôi sao' }
      ],
      initialGrid: [
        ['rocket', null, null, 'star'],
        [null, 'satellite', 'ufo', null],
        [null, 'ufo', 'satellite', null],
        ['star', null, null, 'rocket']
      ],
      solution: [
        ['rocket', 'ufo', 'satellite', 'star'],
        ['star', 'satellite', 'ufo', 'rocket'],
        ['ufo', 'rocket', 'star', 'satellite'],
        ['satellite', 'star', 'rocket', 'ufo']
      ]
    }
  },
  {
    id: 'sud-40',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Bội Số 6: Tổng Kỳ Ảo 90',
    badgeTitle: 'Bài 40 · Độ khó Cấp 24',
    instruction: 'Hoàn thành ma phương 3x3 có tổng mỗi hàng, cột và đường chéo bằng 90. Ô chính giữa là 30.',
    hint: 'Hàng 1: 48 + ? + 36 = 90 ➡️ ? = 6. Cột 1: 48 + ? + 24 = 90 ➡️ ? = 18.',
    mascot: { ...MAYLE, message: 'Số trung tâm bằng 90 : 3 = 30. Một quy luật bất biến tuyệt đẹp!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Phương Bội Số 6 (Tổng = 90)',
      subtitle: 'Mỗi hàng, cột, đường chéo = 90',
      targetSum: 90,
      allowedNumbers: [6, 12, 18, 24, 30, 36, 42, 48, 54],
      initialGrid: [
        [48, null, 36],
        [null, 30, null],
        [24, null, 12]
      ],
      solution: [
        [48, 6, 36],
        [18, 30, 42],
        [24, 54, 12]
      ],
      hintFormula: 'Đường chéo 1: 48 + 30 + 12 = 90. Đường chéo 2: 36 + 30 + 24 = 90.'
    }
  },
  {
    id: 'sud-41',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Killer Sudoku 4x4: Lồng Lớn Bốn Ô Đối Xứng',
    badgeTitle: 'Bài 41 · Độ khó Cấp 25',
    instruction: 'Điền các chữ số 1 đến 4 vào lưới Sudoku Killer. Mỗi lồng màu có tổng được chỉ định chính xác.',
    hint: 'Lồng 4 ô ở trung tâm có tổng bằng 1 + 2 + 3 + 4 = 10!',
    mascot: { ...CASEY, message: 'Quan sát các lồng có tổng lớn trước để thu hẹp phạm vi suy luận!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [2, null, null, 3],
        [null, 1, 4, null],
        [null, 4, 1, null],
        [3, null, null, 2]
      ],
      solution: [
        [2, 4, 3, 1],
        [3, 1, 4, 2],
        [4, 2, 1, 3],
        [1, 3, 2, 4]
      ],
      sumLabels: [
        [6, null, 4, null],
        [null, 5, null, null],
        [null, null, 5, null],
        [4, null, 6, null]
      ]
    }
  },
  {
    id: 'sud-42',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Ma Phương Bội Số 7: Tổng Kỳ Ảo 105',
    badgeTitle: 'Bài 42 · Độ khó Cấp 26',
    instruction: 'Hoàn thiện ma phương 3x3 có tổng mỗi hàng, cột và đường chéo bằng 105. Ô chính giữa là 35.',
    hint: 'Hàng 1: 56 + ? + 42 = 105 ➡️ ? = 7. Cột 1: 56 + ? + 28 = 105 ➡️ ? = 21.',
    mascot: { ...MAYLE, message: 'Càng lên cao, các con số càng lớn nhưng quy luật cốt lõi vẫn luôn vẹn nguyên!' },
    activity: {
      type: 'numberMatrix',
      title: 'Ma Phương Bội Số 7 (Tổng = 105)',
      subtitle: 'Mỗi hàng, cột, đường chéo = 105',
      targetSum: 105,
      allowedNumbers: [7, 14, 21, 28, 35, 42, 49, 56, 63],
      initialGrid: [
        [56, null, 42],
        [null, 35, null],
        [28, null, 14]
      ],
      solution: [
        [56, 7, 42],
        [21, 35, 49],
        [28, 63, 14]
      ],
      hintFormula: 'Đường chéo 1: 56 + 35 + 14 = 105. Đường chéo 2: 42 + 35 + 28 = 105.'
    }
  },
  {
    id: 'sud-43',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'Sudoku Jigsaw 4x4: Khối Chữ L Đa Sắc Đan Xen',
    badgeTitle: 'Bài 43 · Độ khó Cấp 27',
    instruction: 'Điền các chữ số 1 đến 4 vào 4 khối hình chữ L zic-zac sao cho không chữ số nào bị trùng lặp trên hàng, cột và khối màu.',
    hint: 'Nhìn vào khối chữ L màu xanh dương: 3 ô đã có số, ô còn lại chính là chữ số còn thiếu duy nhất!',
    mascot: { ...CASEY, message: 'Khối chữ L đòi hỏi óc quan sát không gian cực kỳ nhạy bén!' },
    activity: {
      type: 'sudoku',
      sudokuType: 'number',
      initialGrid: [
        [null, 1, 2, null],
        [3, null, null, 4],
        [2, null, null, 1],
        [null, 4, 3, null]
      ],
      solution: [
        [4, 1, 2, 3],
        [3, 2, 1, 4],
        [2, 3, 4, 1],
        [1, 4, 3, 2]
      ],
      colorBlocks: [
        ['#fed7aa', '#fed7aa', '#fed7aa', '#bbf7d0'],
        ['#fed7aa', '#bbf7d0', '#bbf7d0', '#bbf7d0'],
        ['#e0f2fe', '#e0f2fe', '#e0f2fe', '#fef08a'],
        ['#e0f2fe', '#fef08a', '#fef08a', '#fef08a']
      ]
    }
  },
  {
    id: 'sud-44',
    topicId: 'sudoku',
    topicName: topicName('sudoku'),
    title: 'SIÊU THỬ THÁCH MA PHƯƠNG OLYMPIC TRẠM 3: Ma Trận Bội Số 8 (Tổng = 120)',
    badgeTitle: 'Bài 44 · Đỉnh Cao Trạm 3 Tuyệt Đối',
    instruction: 'Đại thử thách ma trận số học tối thượng: Hoàn thành ma phương 3x3 có tổng mỗi hàng, mỗi cột và mỗi đường chéo đều bằng đúng 120! Ô chính giữa là 40.',
    hint: 'Hàng 1: 64 + ? + 48 = 120 ➡️ ? = 8. Cột 1: 64 + ? + 32 = 120 ➡️ ? = 24. Đường chéo: 64 + 40 + 16 = 120.',
    mascot: { ...MAYLE, message: 'Đỉnh cao trí tuệ Ma Trận Số Học! Chúc mừng em đã trở thành Đại Kiện Tướng Sudoku & Ma Trận Số!' },
    activity: {
      type: 'numberMatrix',
      title: 'Đại Thử Thách Ma Phương (Tổng = 120)',
      subtitle: 'Mỗi hàng, cột, đường chéo = 120',
      targetSum: 120,
      allowedNumbers: [8, 16, 24, 32, 40, 48, 56, 64, 72],
      initialGrid: [
        [64, null, 48],
        [null, 40, null],
        [32, null, 16]
      ],
      solution: [
        [64, 8, 48],
        [24, 40, 56],
        [32, 72, 16]
      ],
      hintFormula: 'Đường chéo 1: 64 + 40 + 16 = 120. Đường chéo 2: 48 + 40 + 32 = 120.'
    }
  }
];

