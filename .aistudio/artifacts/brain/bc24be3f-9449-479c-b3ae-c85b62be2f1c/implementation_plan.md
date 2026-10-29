# Kế Hoạch Triển Khai: Hệ Thống Bài Kiểm Tra Định Kỳ & Chốt Chặn Mô Hình Tư Duy

Tài liệu này xác định phương án triển khai nâng cấp toàn diện cho ứng dụng Toán Tư Duy Lớp 3 (Spark Math), bao gồm: đổi tên thành **Bài Kiểm Tra Định Kỳ**, xây dựng thanh kiểm tra chuyên biệt và bài kiểm tra quy mô lớn, chèn chốt chặn bắt buộc sau các cụm bài cùng mô hình tư duy, cơ chế khóa bài với mật khẩu mở khóa giáo viên `7979`, cùng việc loại bỏ hoàn toàn các gợi ý lộ đáp án và chuẩn hóa logic - chính tả.

---

## 1. Mục Tiêu & Yêu Cầu Cốt Lõi

1. **Chuẩn hóa danh xưng & Giao diện tập trung**:
   - Chuyển đổi toàn bộ thuật ngữ *"Kiểm tra phương pháp luận"* thành **"Bài Kiểm Tra Định Kỳ"** trên Navbar, Bản đồ, Sổ ôn tập, và các thông báo.
   - Bổ sung một **Thanh / Tab điều hướng riêng biệt: "Bài Kiểm Tra Định Kỳ"** trên Navbar chính để học sinh và giáo viên có thể tra cứu, làm bài hoặc xem chứng nhận bất kỳ lúc nào.

2. **Chốt chặn bắt buộc theo Cụm Mô hình Tư duy**:
   - Khi học sinh hoàn thành một cụm bài tập chia sẻ chung một mô hình tư duy / phương pháp giải, hệ thống sẽ hiển thị một **Chốt chặn Kiểm Tra Định Kỳ**.
   - Khi bấm vào chốt chặn này, ứng dụng sẽ chuyển hướng mượt mà đến bài kiểm tra định kỳ tương ứng trong Tab Kiểm Tra Định Kỳ.

3. **Cơ chế Khóa bài & Cổng mở khóa Giáo viên (Mật khẩu: `7979`)**:
   - Các bài tập tiếp theo sau chốt chặn sẽ ở trạng thái **Khóa (Locked)** cho đến khi học sinh vượt qua bài kiểm tra định kỳ của mô hình đó.
   - Tích hợp modal / nút mở khóa nhanh dành riêng cho giáo viên: khi nhập đúng mật mã `7979`, toàn bộ bài tập và bài kiểm tra sẽ được mở khóa ngay lập tức để phục vụ giảng dạy, trình chiếu và kiểm tra giáo án.

4. **Hệ thống Bài Kiểm Tra Định Kỳ Đa Dạng & Quy Mô Lớn**:
   - **Bài 1**: Mô hình Đọc Biểu Đồ Hình Ảnh & Tỷ Lệ Nhân (Trạm 1).
   - **Bài 2**: Mô hình So Sánh Hơn - Kém, Sơ Đồ Thanh & Phép Trừ Bản Chất (Trạm 1 & 2).
   - **Bài 3**: Mô hình Thể Tích (Lít), Dòng Chảy & San Sẻ Nước Đều (Trạm 2).
   - **Bài 4**: Mô hình Ma Trận Logic, Sudoku & Loại Trừ Khả Dĩ (Trạm 3 & 4).
   - **Bài 5**: Mô hình Hàng Ngũ, Vị Trí Giao & Bù Trừ Điểm Trùng (Trạm 5).
   - **Bài Kiểm Tra Tổng Hợp Quy Mô Lớn**: Đấu trường đánh giá năng lực tư duy liên chuyên đề (Grand Periodic Exam) gồm các vòng thử thách tích hợp toàn diện.

5. **Rà soát Logic, Chính tả & Cải cách Gợi ý (Anti-Spoiler)**:
   - Loại bỏ 100% các câu gợi ý mớm đáp số (ví dụ: "hãy nghĩ đến số 6", "nhập số lớn", "tính 18 - 12 = 6").
   - Thay thế bằng **câu hỏi phản tư kích thích tư duy độc lập**: gợi mở mối liên hệ giữa các đại lượng, đặt câu hỏi về hiện tượng dôi ra / thiếu hụt mà không nhắc đến bất kỳ con số kết quả nào.
   - Sửa toàn bộ lỗi chính tả, dấu thanh tiếng Việt và thống nhất thuật ngữ sư phạm chuẩn.

---

## 2. Thiết Kế Kiến Trúc & Luồng Trải Nghiệm (UX Flow)

```
[Học sinh học Cụm Bài (Ví dụ: So sánh 1..4)]
                  │
                  ▼
   [Đụng Chốt Chặn Kiểm Tra Định Kỳ] ────► [Bài tiếp theo bị KHÓA 🔒]
                  │                                  │
                  ▼                                  ▼
      [Bấm Vào Chốt Chặn]                 [Cổng Giáo Viên '7979']
                  │                                  │
                  ▼                                  ▼
  [Chuyển hướng sang Tab Kiểm Tra]         [Mở khóa tức thì toàn bộ]
                  │
                  ▼
 [Vượt qua bài kiểm tra (Đạt chuẩn)] ──► [Mở khóa cụm bài tiếp theo 🔓]
```

### A. Cấu trúc Tab "Bài Kiểm Tra Định Kỳ"
- Nằm trên thanh Navbar cạnh *Bản đồ*, *Sách bài tập*, *Sổ ôn tập*.
- Hiển thị danh sách các chuyên đề kiểm tra định kỳ với trạng thái:
  - `Đã mở khóa (Sẵn sàng làm bài)`
  - `Đã hoàn thành xuất sắc (Có huy hiệu)`
  - `Chưa mở khóa (Yêu cầu hoàn thành cụm bài tập tương ứng hoặc nhập mã giáo viên 7979)`
- Thẻ đặc biệt ở đầu danh sách: **Bài Kiểm Tra Định Kỳ Tổng Hợp (Quy mô lớn)** kiểm tra năng lực tư duy liên môn lớp 3.

### B. Cải cách câu hỏi phản tư (Metacognitive Prompts)
| Dạng bài | Gợi ý cũ (Bị loại bỏ vì lộ bài) | Gợi ý phản tư mới (Kích thích suy nghĩ) |
| :--- | :--- | :--- |
| **So sánh Hơn - Kém** | "Em hãy lấy 18 - 12 = 6 lít" | "Khi hai vật có độ dài khác nhau, em hãy quan sát xem phần nào của hai vật trùng khớp nhau và phần nào bị nhô ra ngoài?" |
| **Bản chất phép trừ** | "Cứ thấy hơn kém thì bấm dấu trừ" | "Để chỉ giữ lại duy nhất đoạn chênh lệch dôi ra, ta cần làm gì với phần bằng nhau của hai đại lượng?" |
| **San sẻ nước đều** | "Lấy 6 chia 2 = 3 lít nhé" | "Nếu một bên bớt đi bao nhiêu thì bên kia sẽ nhận thêm bấy nhiêu. Làm sao để sự thay đổi của cả hai bên gặp nhau ở chính giữa?" |
| **Hàng ngũ bù trừ** | "Lấy đầu cộng đuôi trừ 1" | "Bạn đứng ở vị trí đặc biệt có bị hai nhóm bạn phía trước và phía sau cùng gọi tên không?" |

---

## 3. Kế Hoạch Thay Đổi Tệp Mã Nguồn

1. **`src/data/periodicAssessmentsData.ts` (Mới)**:
   - Lưu trữ dữ liệu cấu trúc các Bài Kiểm Tra Định Kỳ (chuyên đề 1 đến 5 + bài kiểm tra tổng hợp quy mô lớn).
   - Định nghĩa điều kiện tiên quyết (Prerequisite lesson IDs) cho từng bài kiểm tra.

2. **`src/components/PeriodicAssessmentView.tsx` (Mới / Nâng cấp từ MethodologyAssessmentModal)**:
   - Giao diện làm bài kiểm tra định kỳ chuẩn hóa, tương tác đồ họa SVG không dùng nút trắc nghiệm đoán mò.
   - Câu hỏi phản tư mở rộng, loại bỏ gợi ý lộ đáp án.
   - Bảng tổng kết năng lực và cấp chứng nhận định kỳ.

3. **`src/components/TeacherUnlockModal.tsx` (Mới)**:
   - Hộp thoại nhập mật mã giáo viên `7979`.
   - Lưu trạng thái mở khóa vào `localStorage` (`spark_math_teacher_unlocked = 'true'`) với nút khóa lại linh hoạt.

4. **`src/components/Navbar.tsx`**:
   - Thêm Tab chính **"Kiểm Tra Định Kỳ"** trên thanh điều hướng.
   - Thêm nút / icon chìa khóa **"Dành cho giáo viên"** mở modal mã `7979`.

5. **`src/components/LessonContainer.tsx` & `src/components/AdventureMap.tsx`**:
   - Chèn thẻ Chốt Chặn Kiểm Tra Định Kỳ ngay sau bài cuối của cụm mô hình tư duy.
   - Ẩn/khóa nút "Bài tiếp theo" nếu bài kiểm tra tương ứng chưa hoàn thành (trừ khi giáo viên đã nhập mã `7979`).
   - Nút chốt chặn có hiệu ứng chuyển hướng sang Tab Kiểm Tra Định Kỳ.

6. **`src/components/MistakeNotebookModal.tsx` & `src/App.tsx`**:
   - Đổi tên toàn bộ "Phương pháp luận" -> "Bài Kiểm Tra Định Kỳ".
   - Kết nối định tuyến và trạng thái mở khóa xuyên suốt.

---

## 4. Kế Hoạch Kiểm Thử & Xác Minh

1. **Kiểm thử Luồng Khóa & Mở khóa**:
   - Xác minh: Khi chưa làm bài kiểm tra định kỳ của Cụm 1, các bài của Cụm 2 hiển thị biểu tượng ổ khóa và không thể nhảy bài tự do.
   - Xác minh: Bấm vào Chốt Chặn -> chuyển hướng chính xác đến Bài Kiểm Tra Định Kỳ tương ứng.
   - Xác minh: Nhập mã `7979` -> Toàn bộ bài tập và bài kiểm tra mở khóa ngay lập tức, có thông báo "Chế độ Giáo Viên kích hoạt".
2. **Kiểm thử Nội dung & Chống lộ đáp án**:
   - Rà soát từng câu hỏi gợi ý: đảm bảo 100% là câu hỏi định hướng tư duy, không chứa kết quả hay mách nước số liệu.
   - Kiểm tra chính tả tiếng Việt trên tất cả các tiêu đề và hướng dẫn.
3. **Kiểm tra Biên dịch & Linter**:
   - Chạy `lint_applet` (`tsc --noEmit`) đạt 0 lỗi.
   - Chạy `compile_applet` xác nhận bản build sẵn sàng.
