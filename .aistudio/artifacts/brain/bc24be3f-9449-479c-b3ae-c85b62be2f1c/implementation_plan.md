# Kế Hoạch & Báo Cáo Kiểm Tra Hệ Thống Spark Math

> **Quy tắc bắt buộc xuyên suốt toàn bộ dự án:**
> 1. Thiết kế logic xuyên suốt, độ khó tăng dần, chính xác 100%.
> 2. Kiểm tra lần lượt từng bài tập, phát hiện lỗi và sửa triệt để trước khi chuyển bài.
> 3. Vòng lặp thực thi và nghiệm thu luôn là **3 VÒNG LẶP (3-Loop Verification)** khép kín.

---

## 1. Cơ Chế Tự Động Xuất Hiện Bài Kiểm Tra Định Kỳ (Periodic Assessments)

### 1.1. Hiện Trạng & Nguyên Nhân Gốc Rễ Đã Sửa
- **Lỗi 1 (Sai lệch ID Tiên quyết):** Các ID tiên quyết trong `periodicAssessmentsData.ts` từng bị lệch so với `ALL_LESSONS` khiến bài kiểm tra bị khóa vĩnh viễn. Đã chuẩn hóa 100% ID tiên quyết theo đúng mã thực tế (`pic-4-2`, `pic-8-2`, `vol-compare-5-2`, `sud-killer-4-2`, `log-circle-6-2`).
- **Lỗi 2 (Thiếu trigger tự động kích hoạt):** Đã tích hợp hàm tự động kiểm tra và bung `Auto-Appearing Milestone Modal` ngay khi học sinh hoàn thành bài học chốt hạ của mô hình tư duy.
- **Lỗi 3 (Giao diện Runner đa năng):** Đã nâng cấp `PeriodicAssessmentRunnerModal.tsx` với 6 bộ đồ họa SVG trực quan động và 5 giai đoạn tư duy chuẩn hóa phương pháp luận Spark Math.

---

## 2. Thiết Kế 60 Bài Tập Mở Rộng Ở Cả 6 Trạm (10 Bài/Trạm, Cấp Độ Khó Dần)

Tổng số lượng bài học toàn hệ thống được mở rộng từ **161 bài lên 221 bài học**:

### 🎯 Trạm 1: Biểu Đồ Tranh & Đoạn Thẳng (`pictograph`)
- **Phạm vi mới (10 bài):** `pic-23` đến `pic-32` (Tổng: 39 bài)
- **Cấp độ khó dần:**
  - `pic-23`: Biểu đồ tranh 3 đại lượng tỉ lệ nhân kép (Học sinh 1⭐=3, Sách 1⭐=6, Vở 1⭐=9).
  - `pic-24`: Sơ đồ đoạn thẳng hiệu - tỉ nâng cao (Số lớn hơn số bé 18 đơn vị, số lớn gấp 4 lần số bé).
  - `pic-25`: Biểu đồ tranh cột đôi phân tích xu hướng tuần hoàn.
  - `pic-26`: Mô hình 3 đoạn thẳng liên hoàn A + B + C = 60, quan hệ bắc cầu.
  - `pic-27`: Biểu đồ phân số trực quan (1/2, 1/4, 3/4) dạng tranh.
  - `pic-28`: Bài toán chuyển dịch cân bằng 2 kho thóc (Hiệu ban đầu 16, chuyển 8 để bằng nhau).
  - `pic-29`: Biểu đồ tranh 4 đối tượng kết hợp tỉ lệ nghịch nhẹ nhàng trực quan.
  - `pic-30`: Mô hình đoạn thẳng tổng - hiệu có 3 điều kiện ràng buộc liên tiếp.
  - `pic-31`: Biểu đồ tranh phân tích dữ liệu khuyết thiếu (Reverse Deductive Pictograph).
  - `pic-32`: **ĐẠI THỬ THÁCH TRẠM 1** - Ma trận biểu đồ tổng hợp 5 loài sinh vật biển đại dương.

### 🧪 Trạm 2: Cảm Quan Thể Tích & San Sẻ Nước (`volume`)
- **Phạm vi mới (10 bài):** `vol-22` đến `vol-31` (Tổng: 39 bài)
- **Cấp độ khó dần:**
  - `vol-22`: San sẻ nước 3 bình liên hoàn (14L, 10L, 6L ➡️ Cân bằng 10L mỗi bình).
  - `vol-23`: Cân đo đòn bẩy thể tích 3 cấp (1 Bình lớn = 2 Bình vừa = 6 Cốc nhỏ).
  - `vol-24`: Thí nghiệm Archimedes nâng cao (Thả 3 viên bi sắt các kích thước khác nhau).
  - `vol-25`: Bài toán rót nước đong thể tích 3L bằng 2 bình rỗng 5L và 2L.
  - `vol-26`: So sánh bình đa giác bậc thang (Đáy rộng ngọn thon vs Hình trụ thẳng đứng).
  - `vol-27`: San sẻ nước có dung tích tối đa (Tránh tràn bình khi chuyển dịch chất lỏng).
  - `vol-28`: Hệ thống bình thông nhau 3 nhánh trực quan cơ học chất lỏng.
  - `vol-29`: Thử nghiệm thả vật thể chìm lơ lửng và vật thể nổi.
  - `vol-30`: Bài toán đong 4L bằng bình 7L và bình 3L kinh điển.
  - `vol-31`: **ĐẠI THỬ THÁCH TRẠM 2** - Mạng lưới 4 hồ chứa nước thủy điện cân bằng lưu lượng.

### 🧩 Trạm 3: Sudoku Logic & Ma Phương (`sudoku`)
- **Phạm vi mới (10 bài):** `sud-25` đến `sud-34` (Tổng: 34 bài)
- **Cấp độ khó dần:**
  - `sud-25`: Sudoku Jigsaw 4x4 khối màu zic-zac hình chữ T.
  - `sud-26`: Killer Sudoku 4x4 khung tổng liên hoàn 3, 7.
  - `sud-27`: Ma Phương Magic Square 3x3 bội số của 4 (Tổng mỗi hàng/cột/chéo = 36).
  - `sud-28`: Sudoku Biểu tượng 4x4 Tứ Đại Nguyên Tố (Lửa, Nước, Đất, Gió).
  - `sud-29`: Sudoku Jigsaw 4x4 khối đa giác chữ Z bất đối xứng.
  - `sud-30`: Killer Sudoku 4x4 khung tổng đối xứng bậc thầy (Tổng 3 và 7).
  - `sud-31`: Ma Phương Magic Square 3x3 bội số của 5 (Tổng mỗi hàng/cột/chéo = 45).
  - `sud-32`: Sudoku 4x4 suy luận tối giản chỉ với 4 gợi ý ban đầu.
  - `sud-33`: Killer Sudoku 4x4 cực hạn chuồng đôi thử thách (Tổng 4 và 6).
  - `sud-34`: **ĐẠI THỬ THÁCH TRẠM 3** - Ma Phương Kỳ Ảo 3x3 (Tổng mỗi hàng/cột/chéo = 60).

### 🔍 Trạm 4: Tư Duy Quy Luật & Mê Cung (`pattern`)
- **Phạm vi mới (10 bài):** `pat-24` đến `pat-33` (Tổng: 33 bài)
- **Cấp độ khó dần:**
  - `pat-24`: Dãy số quy luật gia tốc tăng cấp (1, 3, 6, 10, 15, ? -> 21).
  - `pat-25`: Mê cung hoa đa hướng chu kỳ 5 búp sen tuần hoàn.
  - `pat-26`: Ma trận biến đổi 2x2 quy luật đối xứng trục chéo.
  - `pat-27`: Chuỗi quân cờ Domino nhân tỉ lệ kép (Nửa dưới = Nửa trên x 2).
  - `pat-28`: Mạng lưới số hình tam giác Pascal thu nhỏ (Số trên bằng tổng 2 số dưới).
  - `pat-29`: Dãy hình học xoay 90 độ kim đồng hồ kết hợp đổi màu âm bản.
  - `pat-30`: Quy luật hình đa giác tăng số cạnh (Tam giác 3, Tứ giác 4, Ngũ giác 5, Lục giác 6).
  - `pat-31`: Chuỗi hạt ngọc vòng xuyến 4 hạt lặp (1 Đỏ, 2 Xanh, 1 Vàng).
  - `pat-32`: Mê cung tinh tú xoay chiều chu kỳ 4 chòm sao vũ trụ.
  - `pat-33`: **ĐẠI THỬ THÁCH TRẠM 4** - Kim tự tháp thần bí 5 tầng & dãy số đa tầng cực hạn.

### 🧠 Trạm 5: Logic Hàng Ngũ & Điểm Giao (`logic`)
- **Phạm vi mới (10 bài):** `log-27` đến `log-36` (Tổng: 36 bài)
- **Cấp độ khó dần:**
  - `log-27`: Xếp hàng vòng tròn 12 bạn có hướng nhìn vào tâm đối xứng.
  - `log-28`: Ngã tư giao lộ chữ thập 2 hàng có 2 bạn đứng ở vị trí giao lộ.
  - `log-29`: Hàng ngũ chữ U ba đoạn gấp khúc tính tổng số người không trùng lặp góc.
  - `log-30`: Bài toán logic gán nhãn 4 hộp kẹo dán sai nhãn toàn bộ.
  - `log-31`: Xếp hàng theo chiều cao từ thấp đến cao kết hợp manh mối vị trí tương đối.
  - `log-32`: Lưới giao điểm ma trận 3x3 tính tổng số điểm giao nhau.
  - `log-33`: Vòng tròn nhảy cóc quy luật bước nhảy +3 vị trí.
  - `log-34`: Đội hình diễu hành hình chữ nhật rỗng chu vi tính người ở 4 góc.
  - `log-35`: Câu đố logic suy luận 4 bạn đua xe đạp và thứ hạng về đích.
  - `log-36`: **ĐẠI THỬ THÁCH TRẠM 5** - Ma trận giao lộ 5 điểm và bài toán quy nạp hàng ngũ tổng thể.

### 🏆 Trạm 6: Đấu Trường Thử Thách Tinh Hoa (`challenge`)
- **Phạm vi mới (10 bài):** `chal-31` đến `chal-40` (Tổng: 40 bài)
- **Cấp độ khó dần:**
  - `chal-31`: Pixidoku 5x5 Vương triều Ai Cập cổ đại (Latin Square 5x5 hoàn hảo).
  - `chal-32`: Giải mã két sắt kim cương 4 chữ số bí ẩn với 3 manh mối logic.
  - `chal-33`: Đếm khối lập phương 3D tòa thành 4 tầng cực hạn có góc khuất bên trong.
  - `chal-34`: Cân thăng bằng 3 đòn bẩy đa vật thể suy ra tỉ lệ tương đương.
  - `chal-35`: Mê cung số nguyên tố tìm đường thoát hiểm.
  - `chal-36`: Pixidoku 5x5 Thần thoại thiên hà vũ trụ.
  - `chal-37`: Star Battle 6x6 bậc thầy (1 ngôi sao/hàng, cột, vùng không chạm nhau).
  - `chal-38`: Đếm khối lập phương 3D tháp xoắn ốc 4 tầng.
  - `chal-39`: Mật mã hòm kho báu cướp biển 4 bước suy luận logic phân tích điều kiện.
  - `chal-40`: **ĐẠI THỬ THÁCH TOÀN NĂNG TRẠM 6** - Thử thách vinh quang tổng hợp 5 mô hình tư duy Spark Math.

---

## 3. Báo Cáo Chu Trình Kiểm Tra 3 Vòng Lặp (3-Loop Verification)

| Vòng Lặp | Nội Dung Kiểm Tra | Kết Quả Thực Thi |
| :--- | :--- | :--- |
| **Vòng 1 (Loop 1)** | **Kiểm tra Toàn vẹn Cấu trúc & Định dạng:**<br>- Chạy `verify_extensions_loop1.ts`<br>- Kiểm tra 60/60 ID mới, tính duy nhất trong `ALL_LESSONS` (221 bài).<br>- Kiểm tra schema, topicId, mascots, badges, câu hỏi trắc nghiệm, options và correctChoiceId. | **100% ĐẠT** (0 lỗi cấu trúc). |
| **Vòng 2 (Loop 2)** | **Kiểm tra Tính Chuẩn Xác Logic & Toán Học:**<br>- Chạy `verify_extensions_loop2.ts`<br>- Kiểm tra hàng, cột, khối 2x2 của Sudoku 4x4.<br>- Kiểm tra chuồng và tổng số của Killer Sudoku.<br>- Kiểm tra Ma Phương Magic Squares 3x3 (tổng hàng, cột, đường chéo = targetSum, tâm = targetSum/3).<br>- Kiểm tra Pixidoku 5x5 Latin Squares (5 biểu tượng duy nhất mỗi hàng và cột).<br>- Kiểm tra Star Battle 6x6 (không chạm nhau, đủ mỗi hàng/cột/vùng).<br>- Kiểm tra tính liên tục và khớp chu kỳ của Mê Cung hoa và tinh tú. | **100% ĐẠT** (Sau khi phát hiện và sửa các điểm sai lệch ma trận ở các bản thảo, re-run đạt kết quả hoàn hảo 0 lỗi). |
| **Vòng 3 (Loop 3)** | **Kiểm tra Biên Dịch & Linting Toàn Diện:**<br>- Thực thi song song `compile_applet` và `lint_applet` theo chuẩn.<br>- Kiểm tra TypeScript strict typing, không có biến undefined, không có circular dependency. | **100% ĐẠT** (`compile_applet` succeeded, `tsc --noEmit` hoàn thành không có bất kỳ lỗi nào). |
