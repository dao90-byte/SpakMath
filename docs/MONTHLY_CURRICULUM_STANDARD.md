# Khung Chuẩn Thiết Kế Chương Trình Theo Tháng — SpakMath (IN MONTH)

> **Quy chuẩn bắt buộc** áp dụng từ **Tháng 12** trở đi cho mọi tháng được thiết kế mới trong chương trình `IN MONTH` của SpakMath.
> *(Các tháng đã hoàn thiện trước đó như Tháng 11 và Tháng 1 được giữ nguyên cấu trúc cũ 30 ngày trừ khi có yêu cầu chuyển đổi riêng.)*

---

## 1. Cấu trúc tổng thể của 1 tháng học (20 buổi)

Mỗi tháng chuẩn gồm **20 buổi học**, chia thành **4 tuần × 5 buổi/tuần**, kèm **4 bài kiểm tra 15 phút** và **1 bài kiểm tra cuối kỳ (45–60 phút)** sau khi hoàn thành tháng:

| Thành phần | Quy mô chuẩn | Thời lượng | Điều kiện / Mốc kích hoạt |
| :--- | :--- | :--- | :--- |
| **Bài học chính khóa** | **20 buổi** (4 tuần × 5 buổi/tuần) · mỗi buổi **11 câu** theo 4 chặng CPA | ~30 phút / buổi | Nhãn đơn vị trên UI: `unitLabel: 'Buổi'` (`Buổi 1/20` … `Buổi 20/20`) |
| **Kiểm tra 15 phút (4 bài)** | **4 đề** (**4 câu** / đề = **100 điểm**):<br>• **3 câu Tính toán** × 20đ = **60đ** (~2,5–3 phút/câu)<br>• **1 câu Nghị luận Tư duy** × 40đ = **40đ** (**20đ** chọn lập luận đúng + **20đ** tự viết lời giải ngắn, ~5–6 phút) | **15 phút** / bài (có đồng hồ đếm ngược, mốc đạt `≥ 70/100đ`) | Đặt sau **mỗi 5 buổi học**:<br>• Tuần 1: sau **Buổi 5** → mở khóa từ Buổi 6<br>• Tuần 2: sau **Buổi 10** → mở khóa từ Buổi 11<br>• Tuần 3: sau **Buổi 15** → mở khóa từ Buổi 16<br>• Tuần 4: sau **Buổi 20** → hoàn tất 4 tuần, sẵn sàng thi cuối tháng |
| **Kiểm tra cuối kỳ (Cuối tháng)** | **10 câu** (= **100 điểm**):<br>• **Phần A — Cơ bản**: **5 câu** × 10đ = **50đ**<br>• **Phần B — Tư duy Olympic**: **3 câu** × 10đ = **30đ**<br>• **Phần C — Nghị luận Tư duy**: **2 câu** × 10đ = **20đ** (mỗi câu: 5đ chọn lập luận + 5đ tự viết lời giải) | **45–60 phút**<br>(mặc định `durationMinutes: 50`, `durationRangeLabel: '45–60 phút'`, có đồng hồ đếm ngược) | Thực hiện sau khi hoàn thành tháng học (phủ đủ 4 trụ cột năng lực của tháng) |

**Tổng khối lượng chuẩn mỗi tháng**: `20 × 11 = 220` câu bài học + `4 × 4 = 16` câu kiểm tra 15 phút + `10` câu kiểm tra cuối kỳ = **246 câu hỏi chuẩn Singapore CPA**.

---

## 2. Phân bổ 4 tuần × 5 buổi học (`weeksMeta`)

Mỗi tuần tương ứng với **1 trụ cột năng lực** (`InMonthSkillDomain`: `'bar_model' | 'remainder' | 'interval' | 'measurement'`):

- **Tuần 1**: `daysRange: [1, 5]` (`Buổi 1` – `Buổi 5`) → Kiểm tra 15p Tuần 1 (`triggerAfterDayNumber: 5`, `unlocksDayNumber: 6`, `unlocksWeekNumber: 2`)
- **Tuần 2**: `daysRange: [6, 10]` (`Buổi 6` – `Buổi 10`) → Kiểm tra 15p Tuần 2 (`triggerAfterDayNumber: 10`, `unlocksDayNumber: 11`, `unlocksWeekNumber: 3`)
- **Tuần 3**: `daysRange: [11, 15]` (`Buổi 11` – `Buổi 15`) → Kiểm tra 15p Tuần 3 (`triggerAfterDayNumber: 15`, `unlocksDayNumber: 16`, `unlocksWeekNumber: 4`)
- **Tuần 4**: `daysRange: [16, 20]` (`Buổi 16` – `Buổi 20`) → Kiểm tra 15p Tuần 4 (`triggerAfterDayNumber: 20`, không đặt `unlocksDayNumber` để dẫn sang Kỳ Thi Cuối Tháng)

Tiêu đề từng buổi theo mẫu: `'Buổi <N>: <Chủ đề trọng tâm>'` (`N = 1..20`).

---

## 3. Quy chuẩn cấu hình dữ liệu & UI (`InMonthMonthProgram`)

1. **`src/data/inMonthGrade3Catalog.ts`**:
   - Khai báo `unitLabel: 'Buổi'` trên `InMonthMonthProgram`.
   - Khai báo đúng 4 phần tử trong `weeksMeta` với `daysRange` lần lượt `[1, 5]`, `[6, 10]`, `[11, 15]`, `[16, 20]`.
2. **`InMonthWeeklyTest` (Kiểm tra 15 phút)**:
   - `durationMinutes: 15`, `passingScore: 70`.
   - `questions`: đúng **4 câu** gồm **3 câu `section: 'calculation'` (`points: 20` mỗi câu = 60đ)** và **1 câu `section: 'reasoning'` (`points: 40`: tự động chia 20đ chọn lập luận + 20đ tự trình bày lời giải ngắn quy đổi theo `evaluateWeeklyReasoningText`)**.
   - Các câu hỏi trong mỗi đề tuần phải bao phủ trọn vẹn trọng tâm 5 buổi của tuần đó (`relatedDayNumbers` nằm trong phạm vi tuần và `1..20`).
   - UI (`InMonthWeeklyTestModal`, `InMonthCalendarHub`, `InMonthDailyRunner`) đọc số câu và thang điểm động từ `weeklyTest.questions` để tương thích ngược hoàn toàn với các tháng cũ (`6 + 4`).
3. **`InMonthFinalExam` (Kiểm tra cuối kỳ 45–60 phút)**:
   - `durationMinutes`: trong khoảng `45`–`60` (khuyến nghị `50`).
   - `durationRangeLabel`: `'45–60 phút'`.
   - `questions`: đúng **10 câu** gồm `part: 'A'` (5 câu × 10đ), `part: 'B'` (3 câu × 10đ), `part: 'C'` (2 câu × 10đ kèm `reasoningPrompt`, `reasoningPlaceholder`, `reasoningKeywords`, `reasoningSampleAnswer`).
   - Phủ đủ cả 4 trụ cột năng lực (`skillDomain`) của tháng.
   - Mọi `relatedDayNumbers` trong đề tuần 15p, đề cuối kỳ và `reviewDays` trong `InMonthFinalExamModal.tsx` đều phải nằm trong `1..20`.

---

## 4. Checklist chất lượng Toán Singapore CPA (Bắt buộc)

- **Toàn vẹn CPA**: 100% câu hỏi (cả **246 câu**) phải có `cpaSpec` hợp lệ, vượt qua `verifySingaporeCPASpec` và render KaTeX không lỗi.
- **Chống rò rỉ đáp án & dữ kiện trung gian trước khi giải**:
  - `guidedLatexSteps` luôn ẩn dấu phép tính (`\;?\;`) và kết quả chưa giải (`= ?`).
  - Dùng `isUnknown`, `showKnownUnitValue`, `hideCountBeforeSolve`, `beforeSolveBadge`, `hidePerimeterBeforeSolve`, `hideOffsetBeforeSolve` đúng ngữ cảnh.
  - `reasoningPrompt` và `reasoningPlaceholder` tuyệt đối không lộ đáp án hay phép tính đã giải.
- **Kiểm thử tự động**:
  - Tạo file test Vitest trong `src/tests/<month>CPAMath.test.ts` kiểm chứng đủ 20 buổi, 4 đề 15p (sau buổi 5, 10, 15, 20; mỗi đề 3 Tính toán 60đ + 1 Nghị luận 40đ), đề cuối kỳ 45–60p (5 Cơ bản, 3 Olympic, 2 Nghị luận), chấm điểm tự luận mẫu 5/5đ, chống rò rỉ, và toàn bộ bất biến CPA.
  - Chạy qua `npm run lint`, `npm test`, và `npm run build` mà không ảnh hưởng các tháng khác.

---

## 5. Quy trình duy trì & cập nhật tài liệu chuẩn

- Tài liệu này là **chuẩn sống (living standard)** cho toàn bộ chương trình `IN MONTH` của SpakMath.
- Bất cứ khi nào có thay đổi mới về khung bài học, số lượng câu hỏi, thời lượng, thang điểm, cơ chế đánh giá, hoặc quy chuẩn Toán Singapore CPA:
  - **Chủ động cập nhật ngay** vào `docs/MONTHLY_CURRICULUM_STANDARD.md` (và đồng bộ vào skill `spakmath-monthly-curriculum`) nếu thay đổi đã rõ ràng, đã được thống nhất, hoặc có lợi ích chuẩn hóa rõ rệt.
  - **Hỏi xác nhận người dùng trước** nếu thay đổi mang tính thử nghiệm, ảnh hưởng lớn đến lộ trình các tháng khác, hoặc còn nhiều phương án lựa chọn.
