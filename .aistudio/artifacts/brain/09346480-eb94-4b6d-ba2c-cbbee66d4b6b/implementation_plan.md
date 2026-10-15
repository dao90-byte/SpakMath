# Vương Quốc Toán Tư Duy Lớp 3 (Spark Math Adventure)

Ứng dụng web học toán tư duy tương tác sinh động, trực quan dành riêng cho học sinh 9 tuổi (lớp 3 - 4), chuyển đổi toàn bộ giáo trình sách bài tập Toán Tư Duy Spark Math thành chuyến phiêu lưu kỳ thú cùng 3 bạn nhỏ: Khỉ Benny, Thỏ Abby và Chuột Casey.

***

## User Review & Critical Decisions

> [!IMPORTANT]
> Dựa trên phản hồi khảo sát của bạn, toàn bộ hệ sinh thái của sách bài tập gốc sẽ được tích hợp đầy đủ theo mô hình **Bản đồ Phiêu lưu Vương quốc Toán học**, đi kèm hệ thống **âm thanh vui nhộn (Web Audio Synthesis)** và cơ chế tích lũy sao / mở khóa huân chương.

- **Chuyên đề triển khai**: Đầy đủ 5 khu vực học tập cốt lõi chuẩn giáo trình gốc (Biểu đồ hình ảnh, Thể tích & Đơn vị Lít, Sudoku & Quy luật lặp lại, Vị trí hàng ngũ & Phân tích logic, Đấu trường siêu thử thách Pixidoku & Star Battle).
- **Trải nghiệm tương tác**: Thao tác kéo thả, bấm chọn trực quan, mô phỏng chất lỏng thể tích thật, bảng vẽ nháp tích hợp sẵn trên màn hình, hỗ trợ cả chuột lẫn cảm ứng màn hình (touch-friendly).
- **Âm thanh & Hiệu ứng**: Bộ âm thanh tổng hợp đa âm sắc (tiếng chuông đúng keng-keng, pháo hoa nổ chúc mừng, tiếng rót nước róc rách, tiếng boing nảy vui nhộn) với nút bật/tắt tiện lợi.

***

## 1. Tổng quan & Ý tưởng cốt lõi

- **Mục tiêu**: Biến các bài tập toán khô khan trên trang giấy thành trò chơi tương tác giáo dục (gamified learning), giúp trẻ 9 tuổi rèn luyện trực quan tư duy logic, tiếp thu bài học tự nhiên mà không cảm thấy áp lực.
- **Đối tượng**: Học sinh lớp 3 (8 - 10 tuổi) cùng phụ huynh, giáo viên muốn theo dõi quá trình tiến bộ của trẻ.
- **Giá trị đem lại**:
  - Trực quan hóa toán học: Bé thấy rõ "1 biểu tượng = 3 cuốn sách" qua mô hình đồ họa tương tác; hiểu rõ "chiều dài hàng = trước + sau - 1" nhờ hoạt ảnh bạn thỏ Abby bị đếm 2 lần.
  - Tự tin tự học: Có gợi ý sư phạm từng bước (step-by-step hint) và lời giải trực quan từ trang đáp án của sách.

***

## 2. Trải nghiệm người dùng & Thiết kế giao diện (UX & Visual Design)

### A. Bản đồ Vương quốc Toán học (Adventure Map Flow)
1. **Trạm 1: Đảo Biểu Đồ Tranh (Pictograph Island)**
   - Đọc và phân tích biểu đồ tranh thức ăn trưa, đồ chơi, hoa trong vườn, nhân vật yêu thích.
   - Nâng cao: Đọc biểu đồ có hệ số tỉ lệ (mỗi ký hiệu = 3 hoặc 4 hoặc 5 đơn vị).
   - Tự tay tạo biểu đồ: Bé kéo thả các khối biểu tượng để dựng biểu đồ thời tiết 24 người của bạn Casey.
2. **Trạm 2: Vịnh Thể Tích & Nước (Liquid & Capacity Bay)**
   - Rót nước tương tác: Tô màu mực nước trong chai A và B, so sánh thể tích lớn hơn / nhỏ hơn / bằng nhau.
   - Thí nghiệm đong cốc: Đong bình nước bằng cốc đo chuẩn; so sánh bể nước có tiết diện đáy khác nhau.
   - Sơ đồ đoạn thẳng (Bar Modeling): Kéo các thanh đại lượng để giải toán đố nhiều hơn / ít hơn (bài toán nước ép táo của Benny & Abby).
3. **Trạm 3: Thung Lũng Quy Luật & Sudoku (Pattern & Sudoku Valley)**
   - Sudoku 4x4 hình khối rực rỡ (tam giác, tròn, vuông, trái tim) và Sudoku số 1-4.
   - Sudoku khối zic-zac (Jigsaw Sudoku) và Sudoku tính tổng nhỏ (Killer Sudoku mini).
   - Quy luật lặp lại: Hoàn thành chuỗi động vật diễu hành, tìm đường hoa cho Thỏ Abby gặp Chuột Casey.
4. **Trạm 4: Rừng Rậm Logic & Hàng Ngũ (Queue & Logic Grove)**
   - Bài toán xếp hàng đếm thứ tự: Vị trí từ trước ra sau, từ trái qua phải, hàng chữ L và hàng chữ T.
   - Suy luận so sánh: Đoán bạn cao nhất / thấp nhất, sắp xếp chiều dài que ruy băng A, B, C, D.
   - Trò chơi thám tử logic: Sắp xếp 5 bạn (Bác Ram, Bác sĩ Mayle, Abby, Benny, Casey) vào 5 chiếc ghế dựa trên manh mối.
5. **Trạm 5: Đền Thờ Siêu Thử Thách (Master Challenge Arena)**
   - Pixidoku 5x5 động vật rừng xanh (Gấu, Khỉ, Sói, Bò, Kỳ lân).
   - Star Battle 8x8: Thử thách đặt ngôi sao may mắn theo hàng, cột và vùng khối không trùng nhau.
   - Mê cung tròn xoay và hàng rào nông trại Slitherlink bảo vệ đàn bò.
6. **Sổ Tay Tiến Độ & Tự Đánh Giá (Learning Passport & Self-Assessment)**
   - Theo dõi số bài đã hoàn thành, số sao tích lũy.
   - Bảng đánh giá theo chuẩn trang 41 của sách ("Em hiểu bài", "Em nhớ kiến thức", "Em áp dụng vào cuộc sống").
   - Bảng vẽ tự do (Drawing Canvas) cho bé vẽ lại điều mình thích trong bài học hôm nay.

### B. Phong cách thị giác & Tương tác
- **Bảng màu tươi sáng, thân thiện**: Xanh lá cây thảo nguyên (`#16A34A`), Cam nắng ấm áp (`#EA580C`), Vàng sao (`#FBBF24`), Xanh da trời pastel (`#38BDF8`), Nền dịu mắt chống mỏi (`#F8FAFC`).
- **Typography**: Phông chữ tròn trịa, hiện đại, dễ đọc cho trẻ em (`Outfit` / `Plus Jakarta Sans`), cỡ chữ lớn, chữ số định dạng `tabular-nums`.
- **Thao tác cực dễ**: Các nút bấm có kích thước tối thiểu $\ge 48\text{px}$, hiệu ứng nhún nhảy (scale bounce), kéo thả nhạy trên cả iPad / tablet và máy tính.
- **Bảng nháp nổi (Scratchpad)**: Bút vẽ mực và tẩy giúp bé tính nháp ngay trên màn hình bài tập mà không cần giấy bút ngoài.

***

## 3. Quyết định kỹ thuật & Kiến trúc dữ liệu

### A. Sơ đồ kiến trúc ứng dụng (ASCII Diagram)

```
┌────────────────────────────────────────────────────────────────────────┐
│                   VƯƠNG QUỐC TOÁN TƯ DUY LỚP 3                         │
│  Top Bar: [Logo Spark Math] ── [Bản đồ / Luyện tập / Bảng sao] ── [Âm thanh] │
└────────────────────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌───────────────────────────────┐           ┌───────────────────────────────┐
│       ADVENTURE MAP VIEW      │           │     INTERACTIVE LESSON VIEW   │
│ - Trạm 1: Biểu đồ hình ảnh   │           │ - Khung bài tập tương tác     │
│ - Trạm 2: Thể tích (Lít)      │           │ - Công cụ: Đổ nước / Kéo thả  │
│ - Trạm 3: Sudoku & Quy luật   │ ────────> │ - Bảng vẽ nháp (Scratchpad)   │
│ - Trạm 4: Hàng ngũ & Logic    │           │ - Hướng dẫn từ Thỏ Abby / Khỉ │
│ - Trạm 5: Siêu thử thách      │           │ - Nộp bài & Chấm điểm tức thì │
└───────────────────────────────┘           └───────────────────────────────┘
          │                                                   │
          ▼                                                   ▼
┌───────────────────────────────┐           ┌───────────────────────────────┐
│     SOUND & FX ENGINE         │           │   PROGRESS & STATE STORE      │
│ - Web Audio Synthesizer       │           │ - localStorage Persistence    │
│ - Ding, Fanfare, Boing, Water │           │ - Star Count & Level Unlock   │
│ - Confetti Canvas Animation   │           │ - Self-Assessment Checklist   │
└───────────────────────────────┘           └───────────────────────────────┘
```

### B. Cấu trúc dữ liệu bài tập (Structured Data Model)
Mỗi bài tập được chuẩn hóa theo định dạng TypeScript chặt chẽ:
- `id`: Mã định danh bài (ví dụ `graph-1`, `volume-2`, `sudoku-1`).
- `topicId`: Phân loại theo 5 trạm học tập.
- `title`, `instruction`: Tiêu đề và yêu cầu bài toán bằng tiếng Việt chuẩn sách giáo khoa.
- `characterGuide`: Lời dặn dò, gợi ý từ Benny, Abby hoặc Casey.
- `questionType`: 
  - `pictograph_read`: Đọc đếm và so sánh biểu đồ tranh.
  - `pictograph_build`: Kéo thả biểu tượng để hoàn thiện biểu đồ theo số liệu cho trước.
  - `liquid_compare`: Đong nước, so sánh dung tích chai và cốc.
  - `bar_model`: Sơ đồ đoạn thẳng giải toán có lời văn về thể tích.
  - `sudoku_grid`: Lưới giải Sudoku 4x4 (hình khối / số / zic-zac).
  - `pattern_match`: Hoàn thiện chuỗi quy luật logic.
  - `queue_logic`: Xếp hàng, tìm điểm giao nhau hàng L / hàng T.
  - `seat_logic`: Sắp xếp chỗ ngồi theo manh mối logic.
  - `pixidoku_5x5`: Thử thách Sudoku động vật 5x5.
- `data`: Tham số chuyên biệt của từng bài (danh sách món ăn, số biểu tượng, tỷ lệ quy đổi 1 biểu tượng = X đơn vị...).
- `correctAnswers`: Đáp án chuẩn xác tuyệt đối đối chiếu với trang Đáp Án (trang 19, 20, 37, 38, 39, 40, 81-84 trong sách).
- `explanation`: Lời giải thích dễ hiểu, trực quan kèm hình vẽ minh họa.

### C. Âm thanh Web Audio API (Zero External Dependency)
- Dùng bộ tổng hợp âm sắc Web Audio Native để phát nhạc hiệu nhẹ nhàng, tiếng chuông "Ting!" ngọt ngào khi chọn đúng, tiếng "Boing" vui tươi khi cần làm lại, tiếng "Róc rách" khi rót nước và tràng pháo hoa kèm "Fanfare" mừng chiến thắng.
- Hoàn toàn độc lập, không sợ lỗi mạng hay file âm thanh bị chặn.

***

## 4. Kế hoạch triển khai chi tiết

1. **Khởi tạo tài nguyên & dữ liệu giáo trình (`src/data/lessonsData.ts`)**:
   - Trích xuất toàn bộ dữ liệu câu hỏi, dữ liệu bảng biểu đồ, bài toán thể tích, Sudoku và đáp án chuẩn từ 91 trang của tài liệu đính kèm.
2. **Xây dựng Audio Engine (`src/utils/soundEffects.ts`)**:
   - Cài đặt hệ thống Web Audio tổng hợp âm thanh tương tác vui nhộn cho trẻ nhỏ.
3. **Phát triển các Engine tương tác chuyên biệt (`src/components/activities/`)**:
   - `PictographInteractive`: Hiển thị biểu đồ hình ảnh sống động, hỗ trợ bấm đếm và chế độ kéo thả dựng biểu đồ.
   - `VolumeInteractive`: Mô phỏng bình nước hoạt họa có vạch đo lít, thanh trượt đổ nước, so sánh thể tích.
   - `BarModelInteractive`: Mô hình thanh đại lượng Singapore giải toán có lời văn.
   - `SudokuInteractive`: Bảng Sudoku 4x4 & 5x5 Pixidoku với giao diện chọn số / con thú lớn, dễ ấn.
   - `PatternInteractive`: Chuỗi quy luật hình học và mê cung đường hoa thỏ Abby.
   - `QueueLogicInteractive`: Trực quan hóa hàng người và phân tích logic chỗ ngồi.
4. **Phát triển Bảng nháp & Công cụ hỗ trợ (`src/components/Scratchpad.tsx`)**:
   - Cho phép bé vẽ nháp, khoanh tròn, ghi chú trực tiếp lên màn hình bài tập.
5. **Giao diện chính & Bản đồ Phiêu lưu (`src/components/AdventureMap.tsx` & `src/App.tsx`)**:
   - Màn hình bản đồ thế giới sinh động với các trạm dừng chân, mở khóa từng bài và thu thập huy hiệu.
   - Khu vực tự đánh giá bản thân (Self-assessment & Drawing book).
6. **Kiểm thử & Tối ưu hóa**:
   - Chạy `compile_applet` xác nhận không có lỗi TypeScript hoặc đóng gói.
   - Đảm bảo hiển thị hoàn hảo trên cả máy tính để bàn, laptop và máy tính bảng.
