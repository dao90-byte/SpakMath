# Kế Hoạch & Báo Cáo Kiểm Tra: Cơ Chế Tự Động Xuất Hiện Bài Kiểm Tra Định Kỳ (Periodic Assessments)

> **Quy tắc bắt buộc:** Kiểm tra lần lượt từng trạm/mô hình tư duy, phát hiện và sửa toàn bộ lỗi, thực hiện chu trình kiểm tra 3 vòng lặp (3-Loop Verification) khép kín. Áp dụng chuẩn chỉ cho toàn bộ dự án từ nay về sau.

---

## 1. Hiện Trạng Trước Khi Sửa & Các Lỗi Đã Phát Hiện

Trước khi thực hiện kiểm tra, khi trẻ học xong các bài tập của một mô hình tư duy, **Bài kiểm tra định kỳ HOÀN TOÀN KHÔNG TỰ XUẤT HIỆN**. Các nguyên nhân cốt lõi:

1. **Lỗi Sai Lệch Mã Định Danh Bài Học Tiên Quyết (Prerequisite Lesson IDs Mismatch):**
   - Trong `src/data/periodicAssessmentsData.ts`, các bài kiểm tra định kỳ được khai báo danh sách bài học tiên quyết với các ID không tồn tại trong `ALL_LESSONS`:
     - `periodic-comparison-bar-model` (ĐK-01): khai báo `['pic-1', 'pic-2', 'pic-3', 'pic-4']` ➡️ Trong `lessonsData.ts` không có bài `pic-3`, `pic-4` (thực tế là `pic-3-1`, `pic-3-2`, `pic-4-1`, `pic-4-2`).
     - `periodic-pictograph-ratio` (ĐK-02): khai báo `['pic-5', 'pic-6', 'pic-7', 'pic-8']` ➡️ Không tồn tại bài nào có ID này (thực tế là `pic-5-1`, `pic-5-2`, ..., `pic-8-2`).
     - `periodic-volume-fluid-sharing` (ĐK-03): khai báo `['vol-1', 'vol-2', 'vol-3', 'vol-4', 'vol-5']` ➡️ Không tồn tại bài nào có ID này (thực tế là `vol-fill`, `vol-compare-2-1`, ..., `vol-compare-5-2`).
     - `periodic-logic-deduction-sudoku` (ĐK-04): khai báo `['sud-1', 'sud-2', 'sud-3', 'sud-4']` ➡️ Không tồn tại bài nào có ID này (thực tế là `sud-warmup-1`, ..., `sud-killer-4-2`).
     - `periodic-queue-intersection-counter` (ĐK-05): khai báo `['log-1', 'log-2', 'log-3', 'log-4']` ➡️ Không tồn tại bài nào có ID này (thực tế là `log-queue-1`, ..., `log-circle-6-2`).
     - `periodic-grand-comprehensive-arena` (ĐK-TỔNG HỢP): khai báo `['pic-1', 'vol-1', 'sud-1', 'pat-1', 'log-1']` ➡️ Hầu hết không tồn tại.
   - **Hậu quả:** Điều kiện kiểm tra `prerequisiteLessonIds.every(id => completedLessonIds.includes(id))` không bao giờ thỏa mãn, khiến bài kiểm tra bị khóa vĩnh viễn và không bao giờ nhận diện được thời điểm mở khóa!

2. **Lỗi Thiếu Logic Tự Động Kích Hoạt (Auto-Popup Trigger) trong `LessonContainer`:**
   - Trong `LessonContainer.tsx`, hàm `handleCompleted()` chỉ lưu trạng thái hoàn thành và bắn pháo hoa, hoàn toàn không gọi mở hoặc hiển thị thông báo popup mời học sinh vào Bài kiểm tra định kỳ.
   - Cửa sổ bài kiểm tra chỉ xuất hiện thụ động nếu người dùng bấm nút "Bài tiếp theo" (và do lỗi ID ở trên, logic này cũng bị vô hiệu hóa).

3. **Lỗi Runner Chỉ Hỗ Trợ Đơn Lẻ 1 Bài Kiểm Tra:**
   - `PeriodicAssessmentRunnerModal.tsx` trước đây chỉ có giao diện cứng cho ĐK-01 (Mô hình đoạn thẳng), khi mở các bài kiểm tra Sudoku, Hàng ngũ hay Biểu đồ thì nội dung hiển thị không tương thích.

---

## 2. Giải Pháp Toàn Diện Đã Thực Thi

### 2.1. Chuẩn Hóa 100% ID Tiên Quyết Trong `periodicAssessmentsData.ts`
- **ĐK-01 (Mô hình Đoạn thẳng Hơn - Kém):** `['pic-1', 'pic-2', 'pic-3-1', 'pic-3-2', 'pic-4-1', 'pic-4-2']` (Mốc chốt: `pic-4-2`).
- **ĐK-02 (Mô hình Tỉ Lệ Nhân Biểu Đồ):** `['pic-5-1', 'pic-5-2', 'pic-6-1', 'pic-6-2', 'pic-7-1', 'pic-7-2', 'pic-8-1', 'pic-8-2']` (Mốc chốt: `pic-8-2`).
- **ĐK-03 (Mô hình Thể Tích & San Sẻ Nước):** `['vol-fill', 'vol-compare-2-1', 'vol-preserve-2-2', 'vol-scale-3-1', 'vol-compare-3-2', 'vol-compare-4-1', 'vol-depth-4-2', 'vol-cups-5-1', 'vol-compare-5-2']` (Mốc chốt: `vol-compare-5-2`).
- **ĐK-04 (Mô hình Ma Trận Sudoku & Loại Trừ):** `['sud-warmup-1', 'sud-warmup-2', 'sud-shape-1', 'sud-shape-2', 'sud-num-2-1', 'sud-num-2-2', 'sud-jigsaw-3-1', 'sud-jigsaw-3-2', 'sud-killer-4-1', 'sud-killer-4-2']` (Mốc chốt: `sud-killer-4-2`).
- **ĐK-05 (Mô hình Bù Trừ Hàng Ngũ):** `['log-queue-1', 'log-queue-2', 'log-queue-between-2b', 'log-l-shape', 'log-t-shape-4', 'log-t-shape-5', 'log-cross-6-1', 'log-circle-6-2']` (Mốc chốt: `log-circle-6-2`).
- **ĐK-TỔNG HỢP (Đại Khảo Sát Toàn Năng):** `['pic-4-2', 'pic-8-2', 'vol-compare-5-2', 'sud-killer-4-2', 'log-circle-6-2']`.

### 2.2. Xây Dựng Cơ Chế Tự Động Xuất Hiện Modal (Auto-Appearing Milestone Modal)
- Khi học sinh giải xong bài học chốt chốt hạ của bất kỳ mô hình tư duy nào trong `LessonContainer`:
  1. Kích hoạt hiệu ứng âm thanh chiến thắng `sound.playVictory()`.
  2. Bắn pháo hoa rực rỡ `confetti`.
  3. **Tự động hiện ngay Modal Chúc Mừng Hoàn Thành Mô Hình Tư Duy:**
     - Huy hiệu & Tên mô hình tư duy (ví dụ: *Mô hình Ma Trận Loại Trừ Logic Sudoku*).
     - Giới thiệu mục đích khảo sát phương pháp luận chuẩn hóa.
     - Nút nổi bật: **"🚀 Bắt Đầu Bài Kiểm Tra Định Kỳ Ngay"** ➡️ Mở trực tiếp bài kiểm tra tương ứng.
     - Nút phụ: **"Để sau, em tiếp tục xem lại bài"** (vẫn ghim nút mở khóa định kỳ ở thanh dock dưới chân trang).

### 2.3. Nâng Cấp Toàn Diện `PeriodicAssessmentRunnerModal` Cho Cả 6 Bài Kiểm Tra
- Đồ họa SVG trực quan động chuyên biệt cho từng mô hình:
  - ĐK-01: Đoạn thẳng A (18L) & B (12L), vạch dóng ranh giới, san sẻ 3L.
  - ĐK-02: Quy ước biểu tượng 1 ⭐ = 4 sách, so sánh hiệu số sao trước khi nhân.
  - ĐK-03: Bình 16L & 10L, thí nghiệm Archimedes thả đá nước dâng 3L, san sẻ về 13L.
  - ĐK-04: Ma trận 4x4, quy tắc không trùng lặp, ô [?] trong hàng {1, 2, ?, 4} bắt buộc là 3.
  - ĐK-05: Sơ đồ đếm hàng, Benny đứng thứ 5 từ trước và thứ 4 từ sau (5 + 4 - 1 = 8 bạn), điểm giao chữ thập.
  - ĐK-TỔNG HỢP: 5 Trụ cột Toán Tư Duy Lớp 3 & Cúp Vàng Toàn Năng.
- 5 Giai đoạn khảo sát định kỳ hoàn chỉnh cho từng bài:
  - Giai đoạn 1: Bản chất trực quan
  - Giai đoạn 2: Khái niệm cốt lõi ("Ít hơn là gì?", "Nhiều hơn là gì?",...)
  - Giai đoạn 3: Cơ chế phép toán (Vì sao dùng phép trừ? Vì sao dùng phép nhân? Vì sao trừ 1?)
  - Giai đoạn 4: Thực chiến tính toán & San sẻ cân bằng
  - Giai đoạn 5: Sơ đồ tư duy tóm tắt, lưu vào Sổ Ôn Tập & Cấp Chứng Nhận Tinh Hoa Toán Học

### 2.4. Hiển Thị Động Thẻ Chốt Chặn Trên Bản Đồ Phiêu Lưu (`AdventureMap.tsx`)
- Trên bản đồ từng trạm, hệ thống tự động lọc và hiển thị thẻ Bài kiểm tra định kỳ của trạm đó với 3 trạng thái:
  - 🔒 Chưa mở khóa (nêu rõ các bài cần hoàn thành)
  - 🚀 Đã mở khóa / Sẵn sàng làm bài
  - 🏆 Đã hoàn thành đạt chuẩn (cho phép ôn luyện lại bất cứ lúc nào)

---

## 3. Kết Quả Chu Trình Kiểm Tra 3 Vòng Lặp (3-Loop Verification)

| Vòng Lặp | Nội Dung Kiểm Tra | Kết Quả Thực Thi |
| :--- | :--- | :--- |
| **Vòng 1 (Loop 1)** | Kiểm tra tính chuẩn xác tĩnh: Mọi ID tiên quyết của 6 bài kiểm tra đều tồn tại trong `ALL_LESSONS`, khớp trạm, cấu hình câu hỏi đầy đủ. | **100% ĐẠT** (6/6 bài kiểm tra chuẩn xác, 34 câu hỏi định kỳ 4 giai đoạn hợp lệ). |
| **Vòng 2 (Loop 2)** | Mô phỏng logic tự động kích hoạt: Giả lập học sinh hoàn thành tuần tự các bài tập, kiểm tra thời điểm kích hoạt tự động, ràng buộc khóa bài tiếp theo và mở khóa sau khi nộp bài. | **100% ĐẠT** (Không kích hoạt sớm, tự động kích hoạt chuẩn xác tại bài chốt hạ, mở khóa mượt mà). |
| **Vòng 3 (Loop 3)** | Kiểm tra tích hợp End-to-End: Biên dịch toàn diện `compile_applet`, kiểm tra `tsc --noEmit` và Vite production bundle. | **100% ĐẠT** (Build succeeded, 0 lỗi TypeScript, 0 lỗi cú pháp). |
