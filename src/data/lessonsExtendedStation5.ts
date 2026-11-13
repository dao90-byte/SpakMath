import { LessonQuestion, ABBY, BENNY, CASEY, MAYLE, topicName } from './lessonTypes';

export const EXTENDED_LOGIC_LESSONS: LessonQuestion[] = [
  {
    id: 'log-27',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm Hàng Khung Hình Chữ Nhật Rỗng: 4 Bạn Đứng Tại 4 Góc',
    badgeTitle: 'Bài 27 · Độ khó Cấp 10',
    instruction: 'Các bạn học sinh đứng thành khung hình chữ nhật rỗng: Chiều dài có 7 bạn, chiều rộng có 5 bạn. Bốn bạn ở 4 góc đều thuộc cả hai cạnh. Có tất cả bao nhiêu bạn?',
    hint: 'Tổng 4 cạnh = (7 + 7 + 5 + 5) = 24. Nhưng 4 bạn ở 4 góc bị đếm trùng 2 lần, phải trừ đi 4: 24 - 4 = 20 bạn!',
    mascot: { ...BENNY, message: 'Nhớ nguyên lý bù trừ: Cứ góc nào bị đếm 2 lần thì phải trừ đi 1 lần đếm thừa nhé!' },
    activity: {
      type: 'cornerCross',
      shape: 'L',
      verticalCount: 7,
      horizontalCount: 5,
      intersectionPerson: 'Bạn ở góc',
      options: ['18 bạn', '19 bạn', '20 bạn', '24 bạn'],
      correctAnswer: '20 bạn'
    }
  },
  {
    id: 'log-28',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Cân Thăng Bằng Bắc Cầu 3 Bước: Dưa Hấu, Bưởi, Xoài & Dâu Tây',
    badgeTitle: 'Bài 28 · Độ khó Cấp 11',
    instruction: 'Biết: 1 Dưa Hấu = 2 Bưởi; 1 Bưởi = 3 Xoài; 1 Xoài = 4 Dâu Tây. Hỏi: 1 Quả Dưa Hấu nặng bằng bao nhiêu quả Dâu Tây?',
    hint: 'Bắc cầu nhân dồn: 1 Dưa = 2 Bưởi = 2 × 3 Xoài = 6 Xoài = 6 × 4 Dâu Tây = 24 quả Dâu!',
    mascot: { ...MAYLE, message: 'Quy tắc dây chuyền bắc cầu: Nhân các tỉ số liên tiếp với nhau nhé!' },
    activity: {
      type: 'balanceScale',
      title: 'Cân Thăng Bằng Dây Chuyền 3 Chặng',
      ruleExplanation: '1 Dưa = 2 Bưởi; 1 Bưởi = 3 Xoài; 1 Xoài = 4 Dâu Tây. Suy ra 1 Dưa = 2 × 3 × 4 = 24 Dâu Tây.',
      scales: [
        {
          leftIcons: ['🍉'],
          leftLabel: '1 Quả Dưa Hấu',
          rightIcons: ['🍈', '🍈'],
          rightLabel: '2 Quả Bưởi'
        },
        {
          leftIcons: ['🍈'],
          leftLabel: '1 Quả Bưởi',
          rightIcons: ['🥭', '🥭', '🥭'],
          rightLabel: '3 Quả Xoài'
        },
        {
          leftIcons: ['🥭'],
          leftLabel: '1 Quả Xoài',
          rightIcons: ['🍓', '🍓', '🍓', '🍓'],
          rightLabel: '4 Quả Dâu Tây'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🍉'],
        targetLeftLabel: '1 Quả Dưa Hấu',
        options: [
          { id: 'opt1', count: 18, icon: '🍓', label: '18 Quả Dâu Tây' },
          { id: 'opt2', count: 20, icon: '🍓', label: '20 Quả Dâu Tây' },
          { id: 'opt3', count: 24, icon: '🍓', label: '24 Quả Dâu Tây' },
          { id: 'opt4', count: 28, icon: '🍓', label: '28 Quả Dâu Tây' }
        ],
        correctOptionId: 'opt3',
        explanation: '1 Dưa = 2 Bưởi = 6 Xoài = 6 × 4 = 24 quả Dâu Tây!'
      }
    }
  },
  {
    id: 'log-29',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Xếp Chỗ Ngồi Bàn Tiệc 6 Vị Khách: Suy Luận Ràng Buộc Kép',
    badgeTitle: 'Bài 29 · Độ khó Cấp 12',
    instruction: 'Xếp 6 bạn vào 6 ghế đánh số từ 1 đến 6 từ trái sang phải: Benny ngồi ghế 1. Abby ngồi ghế 6. Casey ngồi giữa Benny và Mayle. Ram ngồi cạnh Abby. Luna ngồi ghế 4.',
    hint: 'Ghế 1: Benny. Ghế 6: Abby. Ghế 5 (cạnh Abby): Ram. Ghế 4: Luna. Ghế 2: Casey. Ghế 3: Mayle.',
    mascot: { ...BENNY, message: 'Điền các vị trí cố định trước: Ghế 1, Ghế 6, Ghế 4 rồi suy luận các bạn còn lại!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 6,
      allowedCharacters: ['Khỉ Benny', 'Chuột Casey', 'Thầy Mayle', 'Bạn Luna', 'Bác Ram', 'Thỏ Abby'],
      correctOrder: ['Khỉ Benny', 'Chuột Casey', 'Thầy Mayle', 'Bạn Luna', 'Bác Ram', 'Thỏ Abby']
    }
  },
  {
    id: 'log-30',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm Hàng Hai Đầu Có Khoảng Cách: Nam Đứng Cách Lan 3 Bạn',
    badgeTitle: 'Bài 30 · Độ khó Cấp 13',
    instruction: 'Trong một hàng dọc, Nam đứng thứ 4 tính từ đầu hàng. Lan đứng thứ 5 tính từ cuối hàng lên. Giữa Nam và Lan có đúng 3 bạn khác. Hỏi hàng có tất cả bao nhiêu bạn?',
    hint: 'Hàng chia làm 3 đoạn: Từ đầu đến Nam (4 bạn) + Đoạn ở giữa (3 bạn) + Từ Lan đến cuối (5 bạn) = 4 + 3 + 5 = 12 bạn!',
    mascot: { ...MAYLE, message: 'Ba đoạn không hề bị đếm trùng lặp, hãy cộng trực tiếp 3 đoạn lại với nhau!' },
    activity: {
      type: 'queueCounter',
      mode: 'between',
      fromFront: 4,
      fromBack: 5,
      personA: { name: 'Bạn Nam', avatar: '👦', pos: 4 },
      personB: { name: 'Bạn Lan', avatar: '👧', pos: 8 },
      correctTotal: 12,
      formula: '4 (đầu đến Nam) + 3 (ở giữa) + 5 (Lan đến cuối) = 12 bạn',
      options: [10, 11, 12, 13]
    }
  },
  {
    id: 'log-31',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp Xếp Thứ Tự Thời Gian Nộp Bài Cuộc Thi Khoa Học',
    badgeTitle: 'Bài 31 · Độ khó Cấp 14',
    instruction: 'Năm bạn An, Bình, Cường, Dũng, Én nộp bài: An nộp sớm nhất. Én nộp muộn hơn An nhưng sớm hơn Bình. Dũng nộp muộn nhất. Cường nộp ngay trước Dũng.',
    hint: 'Sớm nhất ➡️ Muộn nhất: 1. An ➡️ 2. Én ➡️ 3. Bình ➡️ 4. Cường ➡️ 5. Dũng.',
    mascot: { ...BENNY, message: 'Đọc kỹ từ khóa "sớm hơn", "muộn hơn" và "ngay trước" để xếp đúng thứ tự thời gian nhé!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự thời gian nộp bài từ SỚM NHẤT đến MUỘN NHẤT:',
      directionLabel: 'Từ Sớm Nhất ➡️ Muộn Nhất',
      items: [
        { id: 'an', label: 'Bạn An', description: 'Nộp bài sớm nhất cuộc thi', icon: '🥇' },
        { id: 'en', label: 'Bạn Én', description: 'Nộp sau An nhưng trước Bình', icon: '🥈' },
        { id: 'binh', label: 'Bạn Bình', description: 'Nộp sau Én và trước Cường', icon: '🥉' },
        { id: 'cuong', label: 'Bạn Cường', description: 'Nộp ngay trước bạn Dũng', icon: '📝' },
        { id: 'dung', label: 'Bạn Dũng', description: 'Nộp bài muộn nhất cuộc thi', icon: '⏳' }
      ],
      correctOrder: ['an', 'en', 'binh', 'cuong', 'dung']
    }
  },
  {
    id: 'log-32',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng Chữ Thập (+) Đan Xen: Đếm Bù Trừ Nút Giao Trung Tâm',
    badgeTitle: 'Bài 32 · Độ khó Cấp 15',
    instruction: 'Hàng dọc có 8 bạn, hàng ngang có 7 bạn. Hai hàng giao nhau tại bạn Minh (Minh đứng ở chính giữa ngã tư chữ thập). Hỏi cả hai hàng có tất cả bao nhiêu bạn?',
    hint: 'Tổng = Hàng dọc (8) + Hàng ngang (7) - Bạn Minh ở nút giao (1) = 8 + 7 - 1 = 14 bạn!',
    mascot: { ...MAYLE, message: 'Bạn Minh vừa thuộc hàng dọc vừa thuộc hàng ngang nên bị đếm 2 lần, cần trừ đi 1!' },
    activity: {
      type: 'cornerCross',
      shape: '+',
      verticalCount: 8,
      horizontalCount: 7,
      intersectionPerson: 'Bạn Minh',
      options: ['13 bạn', '14 bạn', '15 bạn', '16 bạn'],
      correctAnswer: '14 bạn'
    }
  },
  {
    id: 'log-33',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Cân Thăng Bằng Tổng - Tỉ: Tìm Trọng Lượng Quả Dưa Thần',
    badgeTitle: 'Bài 33 · Độ khó Cấp 16',
    instruction: 'Biết 1 quả Dưa Thần nặng bằng đúng 3 quả Bưởi. Cả 1 Dưa Thần và 1 Bưởi đặt chung lên đĩa cân thì nặng 16 kg. Hỏi 1 Quả Dưa Thần nặng bao nhiêu kg?',
    hint: '1 Dưa = 3 Bưởi. Vậy 1 Dưa + 1 Bưởi = 3 Bưởi + 1 Bưởi = 4 Bưởi = 16 kg. 1 Bưởi = 16 : 4 = 4 kg. 1 Dưa = 4 × 3 = 12 kg!',
    mascot: { ...MAYLE, message: 'Thay thế quả dưa bằng 3 quả bưởi để đưa về bài toán chia đều đơn giản!' },
    activity: {
      type: 'balanceScale',
      title: 'Cân Thăng Bằng Tổng - Tỉ Trọng Lượng',
      ruleExplanation: '1 Dưa = 3 Bưởi ➡️ 1 Dưa + 1 Bưởi = 4 Bưởi = 16 kg ➡️ 1 Bưởi = 4 kg, 1 Dưa = 12 kg.',
      scales: [
        {
          leftIcons: ['🍈', '🍈', '🍈'],
          leftLabel: '3 Quả Bưởi',
          rightIcons: ['🍉'],
          rightLabel: '1 Quả Dưa Thần'
        },
        {
          leftIcons: ['🍉', '🍈'],
          leftLabel: '1 Dưa Thần + 1 Bưởi',
          rightIcons: ['⚖️'],
          rightLabel: 'Tổng Cân Nặng: 16 kg'
        }
      ],
      targetQuestion: {
        targetLeftIcons: ['🍉'],
        targetLeftLabel: '1 Quả Dưa Thần',
        options: [
          { id: 'opt1', count: 10, icon: '⚖️', label: 'Nặng 10 kg' },
          { id: 'opt2', count: 12, icon: '⚖️', label: 'Nặng 12 kg' },
          { id: 'opt3', count: 14, icon: '⚖️', label: 'Nặng 14 kg' },
          { id: 'opt4', count: 15, icon: '⚖️', label: 'Nặng 15 kg' }
        ],
        correctOptionId: 'opt2',
        explanation: '1 Bưởi = 16 : 4 = 4 kg. Vậy 1 Quả Dưa Thần nặng: 4 × 3 = 12 kg!'
      }
    }
  },
  {
    id: 'log-34',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm Hàng Vòng Tròn 24 Bạn: Tìm Vị Trí Đối Diện',
    badgeTitle: 'Bài 34 · Độ khó Cấp 17',
    instruction: 'Có 24 bạn đứng thành vòng tròn cách đều nhau và đánh số từ 1 đến 24 theo chiều kim đồng hồ. Hỏi bạn đứng đối diện trực diện với bạn số 5 là bạn số mấy?',
    hint: 'Vòng tròn 24 bạn thì nửa vòng tròn bằng 24 : 2 = 12 bước. Bạn đối diện bạn số 5 là: 5 + 12 = 17!',
    mascot: { ...BENNY, message: 'Trong vòng tròn, khoảng cách đối diện luôn bằng đúng một nửa tổng số người!' },
    activity: {
      type: 'queueCounter',
      mode: 'circle',
      totalInQueue: 24,
      correctTotal: 17,
      formula: 'Vị trí đối diện = 5 + (24 : 2) = 5 + 12 = 17',
      options: [15, 16, 17, 18],
      promptTitle: 'Bạn đứng đối diện bạn số 5 là bạn mang số:'
    }
  },
  {
    id: 'log-35',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp Xếp Chỗ Ngồi Bàn Tròn 5 Nhà Thám Hiểm',
    badgeTitle: 'Bài 35 · Độ khó Cấp 18',
    instruction: 'Xếp 5 bạn vào 5 ghế quanh bàn tròn theo chiều kim đồng hồ từ ghế 1 đến 5: Benny ngồi ghế 1. Abby ngồi cạnh Benny ở ghế 2. Mayle ngồi đối diện Abby ở ghế 4. Casey ngồi ghế 3. Ram ngồi ghế 5.',
    hint: 'Thứ tự từ ghế 1 đến 5: Benny ➡️ Abby ➡️ Casey ➡️ Mayle ➡️ Ram.',
    mascot: { ...BENNY, message: 'Bàn tròn ấm cúng của biệt đội thám hiểm! Hãy xếp đúng vị trí 5 bạn nhé!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 5,
      allowedCharacters: ['Khỉ Benny', 'Thỏ Abby', 'Chuột Casey', 'Thầy Mayle', 'Bác Ram'],
      correctOrder: ['Khỉ Benny', 'Thỏ Abby', 'Chuột Casey', 'Thầy Mayle', 'Bác Ram']
    }
  },
  {
    id: 'log-36',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'ĐẠI THỬ THÁCH TRẠM 5: Đại Mê Trận Suy Luận Logic 6 Vị Trí',
    badgeTitle: 'Bài 36 · Đại Thử Thách Trạm 5 Mở Rộng',
    instruction: 'Thử thách logic thám tử: Sắp xếp 5 loài động vật theo tốc độ chạy từ NHANH NHẤT đến CHẬM NHẤT dựa trên các manh mối đo đạc.',
    hint: 'Báo Đốm nhanh nhất ➡️ Sư Tử ➡️ Ngựa Vằn ➡️ Hươu Cao Cổ ➡️ Rùa Vàng chậm nhất.',
    mascot: { ...MAYLE, message: 'Đỉnh cao của tư duy suy luận logic! Chúc mừng em đã làm chủ hoàn toàn Trạm 5!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp tốc độ chạy từ NHANH NHẤT ➡️ CHẬM NHẤT:',
      directionLabel: 'Tốc độ: Nhanh Nhất ➡️ Chậm Nhất',
      items: [
        { id: 'cheetah', label: 'Báo Đốm', description: 'Chạy nhanh nhất thảo nguyên xanh', icon: '🐆' },
        { id: 'lion', label: 'Sư Tử', description: 'Chạy chậm hơn Báo nhưng nhanh hơn Ngựa Vằn', icon: '🦁' },
        { id: 'zebra', label: 'Ngựa Vằn', description: 'Chạy ở vị trí chính giữa đàn', icon: '🦓' },
        { id: 'giraffe', label: 'Hươu Cao Cổ', description: 'Chạy chậm hơn Ngựa Vằn nhưng nhanh hơn Rùa', icon: '🦒' },
        { id: 'turtle', label: 'Rùa Vàng', description: 'Về đích chậm nhất cuộc đua', icon: '🐢' }
      ],
      correctOrder: ['cheetah', 'lion', 'zebra', 'giraffe', 'turtle']
    }
  },
  {
    id: 'log-37',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm Hàng Chữ Thập Giao Nhau: Một Bạn Tại Tâm Giao Điểm',
    badgeTitle: 'Bài 37 · Độ khó Cấp 19',
    instruction: 'Hai hàng học sinh đứng giao nhau hình chữ Thập (+): Hàng ngang có 9 bạn, hàng dọc có 9 bạn. Bạn Nam đứng đúng ở tâm giao điểm. Hỏi có tất cả bao nhiêu bạn?',
    hint: 'Tổng số bạn = 9 (hàng dọc) + 9 (hàng ngang) - 1 (bạn Nam bị tính 2 lần) = 17 bạn!',
    mascot: { ...BENNY, message: 'Nhớ nguyên lý bù trừ: Bạn Nam ở tâm thuộc cả hai hàng nên chỉ được tính 1 lần thôi!' },
    activity: {
      type: 'cornerCross',
      shape: '+',
      verticalCount: 9,
      horizontalCount: 9,
      intersectionPerson: 'Bạn Nam ở tâm',
      options: ['16 bạn', '17 bạn', '18 bạn', '19 bạn'],
      correctAnswer: '17 bạn'
    }
  },
  {
    id: 'log-38',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Suy Luận Bắc Cầu Chiều Cao: Sắp Xếp 5 Bạn Nhỏ',
    badgeTitle: 'Bài 38 · Độ khó Cấp 20',
    instruction: 'Dựa vào các manh mối: Nam cao hơn An. An cao hơn Bình. Bình cao hơn Cúc. Cúc cao hơn Dũng. Hãy sắp xếp từ CAO NHẤT đến THẤP NHẤT.',
    hint: 'Thứ tự từ cao nhất đến thấp nhất: Nam ➡️ An ➡️ Bình ➡️ Cúc ➡️ Dũng.',
    mascot: { ...MAYLE, message: 'Tính chất bắc cầu: A > B và B > C suy ra A > C!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp chiều cao từ CAO NHẤT ➡️ THẤP NHẤT:',
      directionLabel: 'Chiều cao: Cao Nhất ➡️ Thấp Nhất',
      items: [
        { id: 'nam', label: 'Bạn Nam', description: 'Cao hơn bạn An', icon: '👦' },
        { id: 'an', label: 'Bạn An', description: 'Cao hơn Bình nhưng thấp hơn Nam', icon: '🧒' },
        { id: 'binh', label: 'Bạn Bình', description: 'Đứng ở vị trí chính giữa', icon: '👦' },
        { id: 'cuc', label: 'Bạn Cúc', description: 'Cao hơn Dũng nhưng thấp hơn Bình', icon: '👧' },
        { id: 'dung', label: 'Bạn Dũng', description: 'Thấp nhất trong nhóm 5 bạn', icon: '👶' }
      ],
      correctOrder: ['nam', 'an', 'binh', 'cuc', 'dung']
    }
  },
  {
    id: 'log-39',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp Xếp Chỗ Ngồi Bàn Tròn 6 Bạn Theo Manh Mối',
    badgeTitle: 'Bài 39 · Độ khó Cấp 21',
    instruction: 'Xếp 6 bạn vào 6 ghế quanh bàn tròn theo chiều kim đồng hồ từ ghế 1 đến 6: Khỉ Benny ngồi ghế 1, Thỏ Abby ngồi cạnh Benny ở ghế 2, Chuột Casey ghế 3, Thầy Mayle ghế 4, Bác Ram ghế 5, Bé Lisa ghế 6.',
    hint: 'Thứ tự ghế 1 đến 6: Khỉ Benny ➡️ Thỏ Abby ➡️ Chuột Casey ➡️ Thầy Mayle ➡️ Bác Ram ➡️ Bé Lisa.',
    mascot: { ...CASEY, message: 'Bàn tròn 6 vị trí quanh ánh nến lung linh!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 6,
      allowedCharacters: ['Khỉ Benny', 'Thỏ Abby', 'Chuột Casey', 'Thầy Mayle', 'Bác Ram', 'Bé Lisa'],
      correctOrder: ['Khỉ Benny', 'Thỏ Abby', 'Chuột Casey', 'Thầy Mayle', 'Bác Ram', 'Bé Lisa']
    }
  },
  {
    id: 'log-40',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Vòng Tròn 30 Học Sinh: Vị Trí Đối Diện Trực Diện',
    badgeTitle: 'Bài 40 · Độ khó Cấp 22',
    instruction: 'Có 30 bạn đứng thành vòng tròn cách đều nhau đánh số từ 1 đến 30 theo chiều kim đồng hồ. Hỏi bạn đứng đối diện trực diện với bạn số 7 là bạn số mấy?',
    hint: 'Vòng tròn 30 bạn thì nửa vòng tròn bằng 30 : 2 = 15 bước. Vị trí đối diện bạn số 7 là: 7 + 15 = 22!',
    mascot: { ...MAYLE, message: 'Khoảng cách đối diện trực tiếp luôn bằng đúng N : 2 (nửa chu vi vòng tròn)!' },
    activity: {
      type: 'queueCounter',
      mode: 'circle',
      totalInQueue: 30,
      correctTotal: 22,
      formula: 'Vị trí đối diện = 7 + (30 : 2) = 7 + 15 = 22',
      options: [20, 21, 22, 23],
      promptTitle: 'Bạn đứng đối diện bạn số 7 là bạn mang số:'
    }
  },
  {
    id: 'log-41',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp Xếp 5 Phương Tiện Giao Thông Theo Khối Lượng',
    badgeTitle: 'Bài 41 · Độ khó Cấp 23',
    instruction: 'Dựa vào thực tế và các manh mối đo đạc, sắp xếp 5 phương tiện theo khối lượng từ NẶNG NHẤT đến NHẸ NHẤT.',
    hint: 'Máy bay phản lực ✈️ nặng nhất ➡️ Xe buýt 🚌 ➡️ Xe tải 🚚 ➡️ Xe con 🚗 ➡️ Xe máy 🛵 nhẹ nhất.',
    mascot: { ...BENNY, message: 'Tư duy vật lý trực quan kết hợp logic sắp xếp!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp khối lượng từ NẶNG NHẤT ➡️ NHẸ NHẤT:',
      directionLabel: 'Khối lượng: Nặng Nhất ➡️ Nhẹ Nhất',
      items: [
        { id: 'plane', label: 'Máy Bay Phản Lực', description: 'Trọng tải hàng chục tấn, nặng nhất', icon: '✈️' },
        { id: 'bus', label: 'Xe Buýt 45 Chỗ', description: 'Nặng hơn xe tải chở hàng nhẹ', icon: '🚌' },
        { id: 'truck', label: 'Xe Tải Giao Hàng', description: 'Nặng hơn xe con gia đình', icon: '🚚' },
        { id: 'car', label: 'Xe Con 4 Chỗ', description: 'Nặng hơn xe máy hai bánh', icon: '🚗' },
        { id: 'motorbike', label: 'Xe Máy Tay Ga', description: 'Nhẹ nhất trong các phương tiện', icon: '🛵' }
      ],
      correctOrder: ['plane', 'bus', 'truck', 'car', 'motorbike']
    }
  },
  {
    id: 'log-42',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Bàn Tròn Họp Đội Tàu Không Gian 6 Thành Viên',
    badgeTitle: 'Bài 42 · Độ khó Cấp 24',
    instruction: 'Sắp xếp 6 phi hành gia vào 6 ghế quanh bàn điều khiển: Thầy Mayle ghế 1, Khỉ Benny ghế 2, Thỏ Abby ghế 3, Chuột Casey ghế 4, Bác Ram ghế 5, Bé Lisa ghế 6.',
    hint: 'Theo chiều kim đồng hồ từ ghế 1 đến 6: Thầy Mayle ➡️ Khỉ Benny ➡️ Thỏ Abby ➡️ Chuột Casey ➡️ Bác Ram ➡️ Bé Lisa.',
    mascot: { ...ABBY, message: 'Bàn điều khiển trung tâm sẵn sàng phóng phi thuyền!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 6,
      allowedCharacters: ['Thầy Mayle', 'Khỉ Benny', 'Thỏ Abby', 'Chuột Casey', 'Bác Ram', 'Bé Lisa'],
      correctOrder: ['Thầy Mayle', 'Khỉ Benny', 'Thỏ Abby', 'Chuột Casey', 'Bác Ram', 'Bé Lisa']
    }
  },
  {
    id: 'log-43',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng Dọc Xếp Hàng: Khoảng Cách Giữa Hai Bạn Đặc Biệt',
    badgeTitle: 'Bài 43 · Độ khó Cấp 25',
    instruction: 'Trong một hàng dọc: Bạn Nam đứng thứ 6 tính từ đầu hàng. Bạn Bắc đứng thứ 7 tính từ cuối hàng. Giữa Nam và Bắc có đúng 3 bạn. Hỏi hàng dọc có tất cả bao nhiêu bạn?',
    hint: 'Tổng số bạn = 6 (từ đầu đến Nam) + 3 (ở giữa) + 7 (từ Bắc đến cuối) = 16 bạn!',
    mascot: { ...MAYLE, message: 'Cộng 3 đoạn rời rạc không giao nhau: Đầu hàng + Đoạn giữa + Cuối hàng!' },
    activity: {
      type: 'queueCounter',
      mode: 'between',
      totalInQueue: 16,
      correctTotal: 16,
      formula: 'Tổng số bạn = 6 + 3 + 7 = 16 bạn',
      options: [14, 15, 16, 17],
      promptTitle: 'Tổng số bạn học sinh trong hàng dọc là:'
    }
  },
  {
    id: 'log-44',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Sắp Xếp 5 Hành Tinh Theo Khoảng Cách Đến Mặt Trời',
    badgeTitle: 'Bài 44 · Độ khó Cấp 26',
    instruction: 'Dựa vào kiến thức thiên văn học, sắp xếp 5 hành tinh theo khoảng cách từ GẦN NHẤT đến XA NHẤT so với Mặt Trời.',
    hint: 'Sao Thủy gần nhất ➡️ Sao Kim ➡️ Trái Đất thân yêu ➡️ Sao Hỏa đỏ ➡️ Sao Mộc khổng lồ xa nhất.',
    mascot: { ...MAYLE, message: 'Hệ Mặt Trời tuyệt mỹ của chúng ta! Ghi nhớ thứ tự các hành tinh nhé!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp khoảng cách đến Mặt Trời từ GẦN NHẤT ➡️ XA NHẤT:',
      directionLabel: 'Khoảng cách: Gần Nhất ➡️ Xa Nhất',
      items: [
        { id: 'mercury', label: 'Sao Thủy', description: 'Hành tinh gần Mặt Trời nhất', icon: '🪐' },
        { id: 'venus', label: 'Sao Kim', description: 'Hành tinh thứ hai, nóng nhất', icon: '🌕' },
        { id: 'earth', label: 'Trái Đất', description: 'Hành tinh xanh sự sống, thứ ba', icon: '🌍' },
        { id: 'mars', label: 'Sao Hỏa', description: 'Hành tinh đỏ huyền bí, thứ tư', icon: '🔴' },
        { id: 'jupiter', label: 'Sao Mộc', description: 'Hành tinh khí khổng lồ, thứ năm', icon: '🪐' }
      ],
      correctOrder: ['mercury', 'venus', 'earth', 'mars', 'jupiter']
    }
  },
  {
    id: 'log-45',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Bàn Tròn Đại Yến Hội: 6 Vị Trí Vinh Danh',
    badgeTitle: 'Bài 45 · Độ khó Cấp 27',
    instruction: 'Sắp xếp 6 bạn danh dự vào 6 ghế quanh bàn tiệc: Bác Ram ghế 1, Thầy Mayle ghế 2, Bé Lisa ghế 3, Khỉ Benny ghế 4, Thỏ Abby ghế 5, Chuột Casey ghế 6.',
    hint: 'Theo đúng thứ tự: Bác Ram ➡️ Thầy Mayle ➡️ Bé Lisa ➡️ Khỉ Benny ➡️ Thỏ Abby ➡️ Chuột Casey.',
    mascot: { ...CASEY, message: 'Bàn đại yến mừng công hoàn thành xuất sắc nhiệm vụ!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 6,
      allowedCharacters: ['Bác Ram', 'Thầy Mayle', 'Bé Lisa', 'Khỉ Benny', 'Thỏ Abby', 'Chuột Casey'],
      correctOrder: ['Bác Ram', 'Thầy Mayle', 'Bé Lisa', 'Khỉ Benny', 'Thỏ Abby', 'Chuột Casey']
    }
  },
  {
    id: 'log-46',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'SIÊU THỬ THÁCH SUY LUẬN LOGIC OLYMPIC TRẠM 5: Năm Loài Mãnh Thú Đua Tốc Độ',
    badgeTitle: 'Bài 46 · Đỉnh Cao Trạm 5 Tuyệt Đối',
    instruction: 'Đại thử thách Olympic suy luận: Sắp xếp 5 loài vật siêu đẳng theo thứ tự về đích từ HẠNG 1 (Nhanh nhất) đến HẠNG 5 (Chậm nhất).',
    hint: 'Đại bàng 🦅 bay nhanh nhất về Hạng 1 ➡️ Báo hoa mai 🐆 Hạng 2 ➡️ Ngựa chiến 🐎 Hạng 3 ➡️ Sói tuyết 🐺 Hạng 4 ➡️ Thỏ rừng 🐇 Hạng 5.',
    mascot: { ...MAYLE, message: 'Đỉnh cao tư duy suy luận logic! Em xứng danh là Bậc Thầy Trinh Thám Toán Học!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp thứ tự về đích từ HẠNG 1 (Nhanh Nhất) ➡️ HẠNG 5:',
      directionLabel: 'Về đích: Hạng 1 ➡️ Hạng 5',
      items: [
        { id: 'eagle', label: 'Đại Bàng Vàng', description: 'Sải cánh chao liệng trên không, về đích đầu tiên (Hạng 1)', icon: '🦅' },
        { id: 'leopard', label: 'Báo Hoa Mai', description: 'Về đích ngay sau Đại Bàng (Hạng 2)', icon: '🐆' },
        { id: 'horse', label: 'Ngựa Chiến Phi Nước Đại', description: 'Cán đích ở vị trí chính giữa (Hạng 3)', icon: '🐎' },
        { id: 'wolf', label: 'Sói Tuyết Dẻo Dai', description: 'Về đích sau Ngựa nhưng trước Thỏ (Hạng 4)', icon: '🐺' },
        { id: 'rabbit', label: 'Thỏ Rừng Tinh Nghịch', description: 'Về đích ở vị trí cuối cùng (Hạng 5)', icon: '🐇' }
      ],
      correctOrder: ['eagle', 'leopard', 'horse', 'wolf', 'rabbit']
    }
  },
  {
    id: 'log-47',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đội Hình Chữ Thập (+): Đếm Bù Trừ Giao Điểm Lớn',
    badgeTitle: 'Bài 47 · Độ khó Cấp 29',
    instruction: 'Đội robot xếp thành hình chữ thập (+). Hàng dọc có 11 bạn, hàng ngang có 8 bạn. Khỉ Benny đứng đúng tại ô giao nhau của hai hàng. Hỏi cả đội có bao nhiêu bạn?',
    hint: 'Khỉ Benny ở giao điểm bị đếm 2 lần (1 lần ở hàng dọc, 1 lần ở hàng ngang). Vậy tổng số bạn = 11 + 8 - 1 = ?',
    mascot: { ...BENNY, message: 'Đừng quên trừ đi 1 bạn ở chính giữa giao điểm bị đếm trùng 2 lần nhé!' },
    activity: {
      type: 'cornerCross',
      shape: '+',
      verticalCount: 11,
      horizontalCount: 8,
      intersectionPerson: 'Khỉ Benny',
      options: ['17 bạn', '18 bạn', '19 bạn', '20 bạn'],
      correctAnswer: '18 bạn'
    }
  },
  {
    id: 'log-48',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đếm Người Ở Giữa Hai Đầu Hàng Trong Đoàn 22 Bạn',
    badgeTitle: 'Bài 48 · Độ khó Cấp 30',
    instruction: 'Một đoàn có tất cả 22 bạn. Khỉ Benny đứng thứ 7 tính từ đầu hàng, Thỏ Abby đứng thứ 6 tính từ cuối hàng. Hỏi ở giữa Benny và Abby có bao nhiêu bạn?',
    hint: 'Lấy tổng số 22 bạn trừ đi 7 bạn (từ đầu đến Benny) và trừ tiếp 6 bạn (từ Abby đến cuối): 22 - 7 - 6 = ?',
    mascot: { ...MAYLE, message: 'Bài toán ngược cực hay: biết tổng cả hàng, tìm số bạn đứng ở khoảng giữa!' },
    activity: {
      type: 'queueCounter',
      mode: 'between',
      totalInQueue: 22,
      personA: { name: 'Benny', avatar: '🐵', pos: 7 },
      personB: { name: 'Abby', avatar: '🐰', pos: 6 },
      correctTotal: 9,
      formula: '22 - 7 - 6',
      options: [8, 9, 10, 11],
      promptTitle: 'Số bạn đứng ở giữa Benny và Abby là:'
    }
  },
  {
    id: 'log-49',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Suy Luận 6 Ghế Chỉ Huy Tàu Vũ Trụ Từ Manh Mối Rời',
    badgeTitle: 'Bài 49 · Độ khó Cấp 31',
    instruction: 'Xếp 6 thành viên vào ghế 1 đến 6 dựa vào manh mối: (1) Bác Ram ngồi ghế 1; (2) Bé Lisa ngồi ghế 6; (3) Thầy Mayle ngồi ngay bên phải Bác Ram; (4) Chuột Casey ngồi ghế 4; (5) Thỏ Abby ngồi giữa Thầy Mayle và Chuột Casey; (6) Khỉ Benny ngồi ghế còn lại.',
    hint: 'Ghế 1: Bác Ram ➔ Ghế 2: Thầy Mayle ➔ Ghế 3: Thỏ Abby ➔ Ghế 4: Chuột Casey ➔ Ghế 5: Khỉ Benny ➔ Ghế 6: Bé Lisa.',
    mascot: { ...ABBY, message: 'Đọc từng manh mối chắc chắn trước rồi điền dần các ghế còn trống nhé!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 6,
      allowedCharacters: ['Bác Ram', 'Thầy Mayle', 'Thỏ Abby', 'Chuột Casey', 'Khỉ Benny', 'Bé Lisa'],
      correctOrder: ['Bác Ram', 'Thầy Mayle', 'Thỏ Abby', 'Chuột Casey', 'Khỉ Benny', 'Bé Lisa']
    }
  },
  {
    id: 'log-50',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Bảng Vàng Olympic Toán Vũ Trụ: Xếp Hạng 6 Thí Sinh',
    badgeTitle: 'Bài 50 · Độ khó Cấp 32',
    instruction: 'Sắp xếp 6 thí sinh theo số điểm từ CAO NHẤT đến THẤP NHẤT dựa vào gợi ý điểm số ở mỗi thẻ.',
    hint: 'Minh (98) ➔ Lan (94) ➔ Hùng (91) ➔ Tuấn (89) ➔ Vy (85) ➔ An (80).',
    mascot: { ...MAYLE, message: 'Dùng phép tính trừ và tính chất bắc cầu để sắp xếp thứ tự chính xác nhé!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp 6 thí sinh theo điểm số từ CAO NHẤT ➡️ THẤP NHẤT:',
      directionLabel: 'Điểm số: Cao Nhất ➡️ Thấp Nhất',
      items: [
        { id: 'minh', label: 'Bạn Minh', description: 'Đạt số điểm cao nhất (98 điểm)', icon: '🥇' },
        { id: 'lan', label: 'Bạn Lan', description: 'Kém Minh đúng 4 điểm', icon: '🥈' },
        { id: 'hung', label: 'Bạn Hùng', description: 'Kém Lan 3 điểm, hơn Tuấn 2 điểm', icon: '🥉' },
        { id: 'tuan', label: 'Bạn Tuấn', description: 'Đạt 89 điểm, cao hơn Vy 4 điểm', icon: '🌟' },
        { id: 'vy', label: 'Bạn Vy', description: 'Cao hơn An 5 điểm', icon: '📘' },
        { id: 'an', label: 'Bạn An', description: 'Đạt 80 điểm (thấp nhất đội)', icon: '🌱' }
      ],
      correctOrder: ['minh', 'lan', 'hung', 'tuan', 'vy', 'an']
    }
  },
  {
    id: 'log-51',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Hàng Lên Phi Thuyền Lớn: Đếm Hai Đầu Chống Trùng',
    badgeTitle: 'Bài 51 · Độ khó Cấp 33',
    instruction: 'Trong hàng chờ lên tàu vũ trụ, Thỏ Abby đứng thứ 14 tính từ đầu hàng và đứng thứ 19 tính từ cuối hàng. Hỏi cả hàng có tất cả bao nhiêu bạn?',
    hint: 'Thỏ Abby được đếm 2 lần trong phép cộng 14 + 19. Vậy số bạn thực tế = 14 + 19 - 1 = ?',
    mascot: { ...ABBY, message: 'Hàng dài hơn 30 bạn luôn! Công thức 14 + 19 - 1 giúp em tính cực nhanh!' },
    activity: {
      type: 'queueCounter',
      mode: 'twoEnds',
      fromFront: 14,
      fromBack: 19,
      correctTotal: 32,
      formula: '14 + 19 - 1',
      options: [31, 32, 33, 34],
      promptTitle: 'Cả hàng chờ lên tàu có tất cả bao nhiêu bạn?'
    }
  },
  {
    id: 'log-52',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đội Hình Robot Chữ T Cỡ Lớn Trên Boong Tàu',
    badgeTitle: 'Bài 52 · Độ khó Cấp 34',
    instruction: 'Đội robot xếp hình chữ T trên sân bay: hàng ngang phía trên có 13 robot, hàng dọc từ giữa xuống có 9 robot (Thỏ Abby đứng tại điểm giao chữ T). Hỏi có tất cả bao nhiêu robot?',
    hint: 'Tổng số robot = 13 (hàng ngang) + 9 (hàng dọc) - 1 (điểm giao Abby) = ?',
    mascot: { ...CASEY, message: 'Nhớ trừ đi 1 ở đỉnh giao chữ T vì vị trí đó thuộc cả hai hàng!' },
    activity: {
      type: 'cornerCross',
      shape: 'T',
      verticalCount: 9,
      horizontalCount: 13,
      intersectionPerson: 'Thỏ Abby',
      options: ['20 bạn', '21 bạn', '22 bạn', '23 bạn'],
      correctAnswer: '21 bạn'
    }
  },
  {
    id: 'log-53',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Thư Viện Thiên Hà: Sắp Xếp 6 Cuốn Sổ Tay Theo Độ Dày',
    badgeTitle: 'Bài 53 · Độ khó Cấp 35',
    instruction: 'Đọc mô tả số trang của 6 cuốn sách và sắp xếp theo thứ tự từ DÀY NHẤT (nhiều trang nhất) đến MỎNG NHẤT.',
    hint: 'Atlas Thiên Văn (420) ➔ Vật Lý (350) ➔ Toán Tư Duy (320) ➔ Sinh Học ➔ Hóa Học (210) ➔ Vẽ Phác Thảo.',
    mascot: { ...MAYLE, message: 'So sánh từng cặp manh mối để đặt cuốn sách về đúng kệ thư viện nhé!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp 6 cuốn sách theo số trang từ DÀY NHẤT ➡️ MỎNG NHẤT:',
      directionLabel: 'Số trang: Dày Nhất ➡️ Mỏng Nhất',
      items: [
        { id: 'atlas', label: 'Atlas Thiên Văn', description: 'Cuốn dày nhất với 420 trang', icon: '🌌' },
        { id: 'physics', label: 'Sổ Tay Vật Lý', description: 'Dày hơn sách Toán 30 trang, mỏng hơn Atlas', icon: '⚡' },
        { id: 'math', label: 'Tuyển Tập Toán Tư Duy', description: 'Có đúng 320 trang', icon: '📐' },
        { id: 'bio', label: 'Cẩm Nang Sinh Học', description: 'Mỏng hơn Toán nhưng dày hơn Hóa Học', icon: '🧬' },
        { id: 'chem', label: 'Sổ Tay Hóa Học', description: 'Có 210 trang', icon: '🧪' },
        { id: 'art', label: 'Tập Vẽ Phác Thảo', description: 'Mỏng nhất, ít trang hơn Hóa Học', icon: '🎨' }
      ],
      correctOrder: ['atlas', 'physics', 'math', 'bio', 'chem', 'art']
    }
  },
  {
    id: 'log-54',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Mật Thám Rạp Chiếu Phim 6 Ghế: Không Cho Vị Trí Đầu Cuối',
    badgeTitle: 'Bài 54 · Độ khó Cấp 36',
    instruction: 'Xếp 6 bạn vào 6 ghế dựa trên 5 manh mối: (1) Bác Ram ngồi ghế 2; (2) Bé Lisa ngồi ngay bên trái Bác Ram; (3) Thỏ Abby ngồi ghế cuối cùng (ghế 6); (4) Khỉ Benny ngồi ngay bên trái Thỏ Abby; (5) Chuột Casey ngồi ngay bên phải Bác Ram; (6) Thầy Mayle ngồi ghế còn lại.',
    hint: 'Ghế 1: Bé Lisa ➔ Ghế 2: Bác Ram ➔ Ghế 3: Chuột Casey ➔ Ghế 4: Thầy Mayle ➔ Ghế 5: Khỉ Benny ➔ Ghế 6: Thỏ Abby.',
    mascot: { ...CASEY, message: 'Khóa chặt các cặp ngồi cạnh nhau rồi ghép nối thành hàng ghế hoàn chỉnh!' },
    activity: {
      type: 'logicSeatOrder',
      seatsCount: 6,
      allowedCharacters: ['Bé Lisa', 'Bác Ram', 'Chuột Casey', 'Thầy Mayle', 'Khỉ Benny', 'Thỏ Abby'],
      correctOrder: ['Bé Lisa', 'Bác Ram', 'Chuột Casey', 'Thầy Mayle', 'Khỉ Benny', 'Thỏ Abby']
    }
  },
  {
    id: 'log-55',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'Đoàn Tàu 28 Phi Hành Gia: Tính Khoảng Cách Giữa Hai Đội Trưởng',
    badgeTitle: 'Bài 55 · Độ khó Cấp 37',
    instruction: 'Đoàn kiểm tra sức khỏe gồm 28 phi hành gia xếp thành 1 hàng dọc. Khỉ Benny đứng thứ 9 từ đầu hàng, Chuột Casey đứng thứ 8 từ cuối hàng. Hỏi giữa Benny và Casey có bao nhiêu bạn?',
    hint: 'Số bạn ở giữa = Tổng cả hàng (28) - 9 (từ đầu đến Benny) - 8 (từ Casey đến cuối) = ?',
    mascot: { ...BENNY, message: 'Hãy cẩn thận tính 28 - 9 - 8 để không bỏ sót hay đếm thừa bạn nào nhé!' },
    activity: {
      type: 'queueCounter',
      mode: 'between',
      totalInQueue: 28,
      personA: { name: 'Benny', avatar: '🐵', pos: 9 },
      personB: { name: 'Casey', avatar: '🐹', pos: 8 },
      correctTotal: 11,
      formula: '28 - 9 - 8',
      options: [10, 11, 12, 13],
      promptTitle: 'Số phi hành gia đứng giữa Benny và Casey là:'
    }
  },
  {
    id: 'log-56',
    topicId: 'logic',
    topicName: topicName('logic'),
    title: 'SIÊU ĐỈNH CAO SUY LUẬN VŨ TRỤ TRẠM 5: Sáu Vệ Tinh Quỹ Đạo',
    badgeTitle: 'Bài 56 · Huyền Thoại Suy Luận Trạm 5',
    instruction: 'Thử thách Olympic tối hậu của Trạm 5: Dùng suy luận bắc cầu sắp xếp 6 vệ tinh nhân tạo theo độ cao quỹ đạo từ CAO NHẤT đến THẤP NHẤT.',
    hint: 'Omega (36.000 km) ➔ Alpha ➔ Beta ➔ Delta ➔ Gamma ➔ Sigma (400 km).',
    mascot: { ...MAYLE, message: 'Hoàn thành bài toán 6 vệ tinh này, em chính thức đạt danh hiệu Huyền Thoại Logic Trạm 5!' },
    activity: {
      type: 'itemOrdering',
      promptText: 'Sắp xếp 6 vệ tinh theo độ cao quỹ đạo từ CAO NHẤT ➡️ THẤP NHẤT:',
      directionLabel: 'Quỹ đạo: Cao Nhất ➡️ Thấp Nhất',
      items: [
        { id: 'sat-omega', label: 'Vệ tinh Omega', description: 'Bay cao nhất ở quỹ đạo địa tĩnh (36.000 km)', icon: '🛰️' },
        { id: 'sat-alpha', label: 'Vệ tinh Alpha', description: 'Thấp hơn Omega, nhưng cao hơn Beta 5.000 km', icon: '📡' },
        { id: 'sat-beta', label: 'Vệ tinh Beta', description: 'Thấp hơn Alpha nhưng cao hơn hẳn Delta', icon: '🔭' },
        { id: 'sat-delta', label: 'Vệ tinh Delta', description: 'Cao hơn Gamma 4.000 km, thấp hơn Beta', icon: '🪐' },
        { id: 'sat-gamma', label: 'Vệ tinh Gamma', description: 'Thấp hơn Delta nhưng vẫn bay cao hơn Sigma', icon: '☄️' },
        { id: 'sat-sigma', label: 'Vệ tinh Sigma', description: 'Bay ở quỹ đạo tầm thấp nhất (400 km)', icon: '🚀' }
      ],
      correctOrder: ['sat-omega', 'sat-alpha', 'sat-beta', 'sat-delta', 'sat-gamma', 'sat-sigma']
    }
  }
];


