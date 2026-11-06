# Kế Hoạch Chuyển Đổi Giao Diện Toán SGK Lớp 3: Phong Cách Vũ Trụ Viễn Tưởng & Bản Đồ Hành Tinh

Chuyển đổi toàn diện phân hệ **Toán SGK Lớp 3 (Kết Nối Tri Thức)** sang giao diện **Vũ Trụ Viễn Tưởng Công Nghệ Cao (High-Tech Sci-Fi Cosmic)** với hiệu ứng Neon phát sáng tinh tế, hệ thống biểu tượng Hệ Mặt Trời & Chòm Sao Dẫn Đường, Bản đồ Hành tinh Chinh phục tương tác, và cơ chế tự động lưu nhớ tiến trình bài học vào LocalStorage.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> Toàn bộ các định hướng đã được xác nhận trực tiếp từ người dùng trong Phase 1:

- **Sắc Thái Giao Diện Vũ Trụ**: Phong cách **Vũ trụ viễn tưởng công nghệ cao (High-Tech Sci-Fi Cosmic)** với tông nền không gian sâu thẳm sang trọng (`#0B0F19` / `#0D1117`), kết hợp dải ánh sáng neon phát sáng xanh điện quang (Electric Cyan `#00F0FF`), tím tinh vân (Cosmic Violet `#818CF8`), và vàng mặt trời (Solar Gold `#FBBF24`). Thiết kế bảo đảm tính thẩm mỹ, độ tương phản cao, dễ nhận diện, kích thích tư duy tích cực mà không gây rối rắm.
- **Tiến Trình Học Tập & Lưu Trữ (Progress Persistence)**: Tự động lưu tiến trình vào `localStorage` (`grade3_math_cosmic_progress`). Khi học sinh hoàn thành các bước khám phá Socratic hoặc bài tập, hệ thống lưu lại và cập nhật trực quan trên **Bản Đồ Hành Tinh Chinh Phục (Planetary Conquest Map)**.
- **Hệ Thống Biểu Tượng & Khái Niệm**: Hình tượng **Hệ Mặt Trời & Các Chòm Sao Dẫn Đường**. Mỗi bài học là một hành tinh tri thức quay quanh Mặt Trời Toán Học. Các câu hỏi suy ngẫm là những trạm kích hoạt năng lượng chòm sao.
- **Áp Dụng Thiết Kế Cho Phần Tử Focus**: Container câu hỏi suy ngẫm tầng 2 (`div:nth-of-type(4)` trong `SocraticDiscoveryCard`) được thiết kế dạng Trạm Kích Hoạt Năng Lượng Chòm Sao với viền neon Cyan/Violet mềm mại, hiệu ứng phát sáng nhẹ, câu hỏi nổi bật và các nút lựa chọn tương tác phong cách buồng lái vũ trụ trực quan.

---

## 1. Tổng Quan & Trải Nghiệm Cốt Lõi (Core Concept)

- **Trải nghiệm**: Học sinh hóa thân thành "Nhà Du Hành Toán Học Trẻ Tuổi", điều khiển phi thuyền thám hiểm Hệ Mặt Trời Tri Thức, ghé thăm từng hành tinh (Bài 23: Hành tinh Nhân Nhóm, Bài 24: Hành tinh Gấp Bội, Bài 25: Hành tinh Chia & Số Dư bí ẩn, v.v.).
- **Giá trị cốt lõi**:
  - Biến các bài học sách giáo khoa trừu tượng thành cuộc phiêu lưu khai phá vũ trụ kỳ thú.
  - Vẫn giữ nguyên 100% tính chuẩn xác logic toán học và phương pháp đàm thoại Socratic đã kiểm chứng qua 3 vòng lặp.
  - Tạo động lực bền vững: Tiến trình thám hiểm được lưu lại vĩnh viễn trong trình duyệt, trẻ có thể nhìn thấy từng hành tinh bừng sáng khi mình chinh phục thành công.

---

## 2. Thiết Kế Trực Quan & Trải Nghiệm Người Dùng (Visual Design & UX)

### 2.1. Bản Đồ Hành Tinh Chinh Phục (Planetary Conquest Map)
- Nằm ở đầu trang hoặc tab chuyển đổi trong trung tâm học tập Toán 3:
  - **Mặt Trời Tri Thức Trung Tâm**: Đại diện cho Chủ đề 4 (Phép nhân & Phép chia trong phạm vi 100).
  - **7 Quỹ Đạo & Hành Tinh (Bài 23 ➡️ Bài 29)**:
    - *Hành tinh Sao Thủy (Bài 23)*: Nhân số hai chữ số (Ánh sáng Lam ngọc).
    - *Hành tinh Sao Kim (Bài 24)*: Gấp một số lên nhiều lần (Ánh sáng Vàng kim).
    - *Hành tinh Trái Đất (Bài 25)*: Phép chia hết & Phép chia có dư (Ánh sáng Lục bảo).
    - *Hành tinh Sao Hỏa (Bài 26)*: Chia số có hai chữ số (Ánh sáng Đỏ thắm Neon).
    - *Hành tinh Sao Mộc (Bài 27)*: Giảm đi một số lần (Ánh sáng Cam vũ trụ).
    - *Hành tinh Sao Thổ (Bài 28)*: Bài toán giải bằng hai bước (Ánh sáng Vàng vành đai).
    - *Hành tinh Sao Hải Vương (Bài 29)*: Luyện tập chung & Trạm kiểm định Topic 4 (Ánh sáng Xanh biển sâu).
  - **Trạng thái hành tinh**:
    - *Chưa khám phá*: Hành tinh mờ ảo trong sương mù không gian kèm biểu tượng ổ khóa năng lượng.
    - *Đang khám phá*: Vành đai quỹ đạo phát sáng nhấp nháy êm dịu, hiển thị tiến độ % bước Socratic.
    - *Đã chinh phục hoàn toàn*: Hành tinh bừng sáng toàn bộ với vương miện sao chổi và dấu ấn hoàn thành rực rỡ.

### 2.2. Thẻ Khám Phá Bản Chất Socratic Vũ Trụ (Socratic Discovery Card)
- **Khung chứa chính**: Nền gradient đêm vũ trụ sâu thẳm (`#0B0F19` phối với xanh đen `#0D1117`), viền vi mô ánh neon Cyan (`#00F0FF/30`), điểm xuyết các hạt sao li ti tinh tế.
- **Khối Câu hỏi triết lý**: Tựa như thông điệp truyền tín hiệu từ trung tâm vũ trụ, chữ to, rõ nét, font Nunito êm dịu với độ tương phản tuyệt hảo.
- **Mô hình trực quan trực quan**: Khay bánh, thanh so sánh, que chia quả dâu được tạo hình cách điệu bằng các tinh thể năng lượng và khoang vận chuyển phi thuyền sáng tạo nhưng cực kỳ chân thực về mặt toán học.
- **Khối Câu hỏi suy ngẫm 2 (Phần tử Focus: `div:nth-of-type(4)`)**:
  - Hộp viền neon Cyan & Violet với góc bo tròn hiện đại, biểu tượng Chòm Sao Dẫn Đường (`✨ Chòm Sao Suy Ngẫm 2`).
  - Lựa chọn phương án phong cách trạm điều khiển: Khi bấm sai, chỉ báo viền đỏ sao băng nhẹ kèm lời khuyên Socratic (không để lộ đáp án đúng). Khi bấm đúng, bừng sáng màu xanh ngọc bích neon và kích hoạt phát sáng chìa khóa tri thức.
- **Hộp Đúc Kết Bản Chất (Key Takeaway)**: Thiết kế như "Lõi Năng Lượng Vũ Trụ" (Cosmic Energy Core). Khi mở khóa, tỏa hào quang vàng kim rực rỡ mang câu đúc kết toán học chân lý.

### 2.3. Trình Làm Bài Tập & Kiểm Tra (Cosmic Runner & Assessment)
- Bài tập biến thành "Thử Thách Khởi Động Động Cơ Vận Tốc Ánh Sáng".
- Thanh tiến trình dạng vạch năng lượng lượng tử với các chặng trạm dừng chân.
- Âm thanh và hiệu ứng chiến thắng thiên hà khi hoàn thành 100%.

---

## 3. Kiến Trúc Kỹ Thuật & Quản Lý Trạng Thái (Technical & State Strategy)

### 3.1. Sơ Đồ Hệ Thống & Luồng Dữ Liệu
```
┌─────────────────────────────────────────────────────────────────┐
│                      NAVBAR MODE SWITCH                         │
│       [ Toán Tư Duy & Sudoku ]  ⇄  [ Toán SGK 3 Vũ Trụ ]        │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│              VIETNAM GRADE 3 COSMIC HUB & RUNNER                │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │   PLANETARY CONQUEST MAP (Bản đồ Hệ Mặt Trời Tri Thức)    │  │
│  │   - Hiển thị 7 hành tinh bài học + Trạm Kiểm định Topic 4 │  │
│  │   - Đọc & Đồng bộ tự động với LocalStorage                │  │
│  └─────────────────────────────┬─────────────────────────────┘  │
│                                │                                │
│       ┌────────────────────────┴───────────────────────┐        │
│       ▼                                                ▼        │
│ ┌───────────────────────────┐            ┌───────────────────┐  │
│ │   SOCRATIC DISCOVERY      │            │  COSMIC EXERCISES │  │
│ │   - Trạm đàm thoại        │            │  - Vạch năng lượng│  │
│ │   - Tinh thể trực quan    │            │  - Luyện tập 1-10 │  │
│ │   - Focus: Chòm sao 2     │            │  - Gợi ý tư duy   │  │
│ │   - Mở khóa Lõi tri thức  │            │  - Lưu điểm số    │  │
│ └─────────────┬─────────────┘            └─────────┬─────────┘  │
│               │                                    │            │
│               └─────────────────┬──────────────────┘            │
│                                 ▼                               │
│              ┌─────────────────────────────────────┐            │
│              │    LOCALSTORAGE PERSISTENCE STORE   │            │
│              │    "grade3_math_cosmic_progress"    │            │
│              │    - Unlocked Lessons & Cards       │            │
│              │    - Completed Exercise Scores      │            │
│              │    - Conquered Planet Badges        │            │
│              └─────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2. Cấu Trúc Dữ Liệu Lưu Trữ (LocalStorage Model)
```typescript
interface CosmicProgressData {
  unlockedLessons: string[]; // ['vn3-c4-l23', 'vn3-c4-l24', ...]
  completedLessons: string[]; // Các bài đã làm xong toàn bộ bài tập
  socraticCompletedCards: Record<string, boolean>; // id thẻ -> true
  exerciseScores: Record<string, { completedCount: number; totalCount: number; passed: boolean }>;
  assessmentResult?: { score: number; maxScore: number; passed: boolean; date: string };
  lastActiveLessonId: string;
}
```

### 3.3. Các Tệp Sẽ Triển Khai
1. `src/utils/cosmicProgressStorage.ts`: Module chuyên trách đọc/ghi tiến trình LocalStorage, tự động khởi tạo dữ liệu mặc định, cung cấp các hàm `markSocraticCompleted`, `markExerciseCompleted`, `getCosmicProgress`, `resetCosmicProgress`.
2. `src/components/vietnam_grade3/CosmicPlanetaryMap.tsx`: Component tương tác hiển thị Hệ Mặt Trời với 7 hành tinh tri thức và các quỹ đạo neon phát sáng, cho phép click để bay thẳng tới bài học.
3. `src/components/vietnam_grade3/SocraticDiscoveryCard.tsx`: Tái hiện giao diện theo phong cách Vũ Trụ Công Nghệ Cao (Sci-Fi Cosmic), tối ưu phần tử focus `div:nth-of-type(4)`, kết nối lưu tiến trình ngay khi mở khóa Lõi tri thức.
4. `src/components/vietnam_grade3/VietnamGrade3Hub.tsx`: Nhúng Bản đồ Hành tinh lên đầu, chuyển đổi giao diện toàn trang sang phong cách trạm không gian thân thiện cho trẻ em.
5. `src/components/vietnam_grade3/VietnamGrade3LessonRunner.tsx`: Cập nhật bảng luyện tập vũ trụ, hiển thị thanh tiến độ năng lượng và nút quay về Bản đồ Quỹ đạo.
6. `scripts/verify_vietnam_grade3.ts`: Bổ sung kiểm thử tự động cho module lưu trữ và đồng bộ tiến trình vũ trụ.

---

## 4. Quy Trình Kiểm Thử 3 Vòng Lặp Bắt Buộc (3-Loop Verification)

- **Vòng 1 (Toàn vẹn Dữ liệu & Lưu trữ LocalStorage)**: Kiểm tra module lưu trữ, đảm bảo tiến trình lưu đúng khóa, không mất dữ liệu khi chuyển bài hoặc tải lại trang.
- **Vòng 2 (Tính Logic Toán Học & Hiển Thị Vũ Trụ Chuẩn Xác)**: Đảm bảo 100% nội dung toán SGK 3 giữ nguyên sự chuẩn xác, mô hình trực quan vũ trụ thể hiện đúng tỷ lệ toán học.
- **Vòng 3 (Kiểm tra Biên dịch & Lint song song)**: Co-execute `compile_applet` và `lint_applet` với 0 lỗi TypeScript, 0 cảnh báo linter.
