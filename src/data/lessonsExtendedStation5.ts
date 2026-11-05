import { LessonQuestion, BENNY, MAYLE, topicName } from './lessonTypes';

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
  }
];
