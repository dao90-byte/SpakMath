# Kế hoạch Kiểm Toán Logic Trạm 1 & Nâng Cấp 10 Bài Tập Nâng Cao Trạm 2 (Thể Tích & Lít)

Kế hoạch này tổng kết kết quả kiểm toán tính logic của toàn bộ 22 bài tập tại Trạm 1 (Biểu đồ hình ảnh), đồng thời thiết lập lộ trình thiết kế 10 bài tập mới với độ khó tăng dần đều tại Trạm 2 (Thể tích & Đơn vị Lít), bao gồm các dạng toán tư duy: san sẻ nước cân bằng, sơ đồ thanh Bar Model nâng cao, bài toán vật chìm Archimedes, và bài toán dòng chảy vòi nước.

---

## User Review & Critical Decisions

> [!IMPORTANT] 
> Các quyết định then chốt đã được người dùng xác nhận thông qua vòng phỏng vấn:
> - **Phạm vi triển khai**: Xem báo cáo kiểm toán Trạm 1 và tiến hành nâng cấp ngay 10 bài tập mới cho Trạm 2.
> - **Hệ thống dạng toán Trạm 2**: Kết hợp đa dạng 4 trụ cột tư duy (San sẻ nước cân bằng, Sơ đồ thanh Bar Model tỉ số, Vật chìm đo thể tích Archimedes, Dòng chảy & thời gian đổ đầy).
> - **Giao diện chỉ dẫn (Instruction)**: Giữ nguyên bố cục hiện tại đã tối ưu, đảm bảo độ trong trẻo và thân thiện cho học sinh lớp 3.

- **Quyết định 1 (Đã duyệt)**: Giữ nguyên vẹn 111 bài tập đã có, bổ sung 10 bài tập liên tục từ `vol-12` đến `vol-21` vào Trạm 2.
- **Quyết định 2 (Đã duyệt)**: Mỗi bài tập mới đều có đủ dữ liệu tương tác trực quan (bình nước có vạch chia, thanh đo Bar Model, hình ảnh đại diện vật thể chìm), lời giải thích sư phạm rõ ràng và bộ câu hỏi trắc nghiệm kiểm tra logic chặt chẽ.

---

## 1. Overview & Core Concept

- **Mục tiêu**: Nâng cấp độ khó một cách mượt mà và logic cho Trạm 2 (Thể tích & Lít), tiếp nối từ bài toán `vol-bar-11` (bài cuối cùng hiện tại của Trạm 2).
- **Đối tượng**: Học sinh lớp 3 rèn luyện toán tư duy theo phương pháp Singapore Math / Spark Math.
- **Giá trị cốt lõi**:
  - Trực quan hóa các khái niệm thể tích trừu tượng bằng mô hình bình nước thực nghiệm, vạch chia mililít/lít động và thanh đoạn thẳng đa phần.
  - Xây dựng tư duy phân tích từng bước: Quan sát trạng thái ban đầu $\to$ Xác định lượng biến thiên $\to$ Lập phương trình số học $\to$ Kiểm tra kết quả logic.

---

## 2. User Experience & Visual Design

Tuân thủ nghiêm ngặt cẩm nang thiết kế sư phạm & mô phỏng tương tác (*Education & Interactive Simulations*):

### A. Bố cục Mô Phỏng Trực Quan
- **Khu vực hiển thị trực quan (Visual Stage)**:
  - Các bình nước/bể chứa có tỉ lệ vạch chia rõ ràng, màu nước phân biệt sinh động (Lam ngọc `#0284c7`, Cam mật ong `#f59e0b`, Tím thạch anh `#8b5cf6`).
  - Thanh Bar Model hiển thị các đoạn phần bằng nhau, nhãn giá trị rõ ràng, chữ số có chân dạng bảng (`tabular-nums font-mono`).
- **Khu vực tương tác & câu hỏi (Interactive Deck)**:
  - Lời thoại linh vật hướng dẫn phương pháp giải (Mayle, Benny, Abby, Casey).
  - Thẻ câu hỏi trắc nghiệm tương tác với phản hồi âm thanh tức thì khi chọn đúng/sai.

### B. Bảng Màu 60-30-10 & Kiểu Chữ
- **60% Nền & Thẻ chứa**: Nền sáng trắng/slate dịu mắt (`bg-slate-50`), thẻ bo tròn 24px (`rounded-3xl`) với viền hairline thanh mảnh (`border-slate-100`).
- **30% Khối phân cấp**: Bảng thông tin, bình nước thủy tinh, cột bar model với viền tương phản nhẹ.
- **10% Điểm nhấn hành động**: Màu xanh ngọc lục bảo (`#059669`) báo hiệu thành công, cam ấm (`#d97706`) cho dữ kiện cần tìm.
- **Typography**: Không dùng font mặc định đơn điệu; sử dụng font sans-serif thân thiện, cỡ chữ 15-16px dễ đọc, cân bằng dòng và không ngắt chữ côi cút.

---

## 3. Hệ Thống 10 Bài Tập Nâng Cao Mới Cho Trạm 2 (Độ Khó Tăng Dần)

Độ khó được thiết kế tăng dần đều theo thang tư duy 10 cấp độ:

```
[vol-bar-11: 3 Thùng Nước]
       │
       ▼ (Cấp 1)
[vol-12: San Sẻ Cân Bằng 2 Bình]
       │
       ▼ (Cấp 2)
[vol-13: Bar Model Tổng & Tỉ Số (Gấp 3 Lần)]
       │
       ▼ (Cấp 3)
[vol-14: Vật Chìm Đơn Lẻ Archimedes (Đá phong thủy)]
       │
       ▼ (Cấp 4)
[vol-15: Vật Chìm Đa Vật Thể Đồng Kích Thước (3 Viên Bi Sắt)]
       │
       ▼ (Cấp 5)
[vol-16: Bar Model Hiệu & Tỉ Số (Gấp 4 Lần)]
       │
       ▼ (Cấp 6)
[vol-17: San Sẻ Cân Bằng 3 Bình Liên Hoàn]
       │
       ▼ (Cấp 7)
[vol-18: Vòi Bơm Đơn & Thời Gian Đổ Đầy Bể]
       │
       ▼ (Cấp 8)
[vol-19: Hai Vòi Chảy Đồng Thời Đổ Đầy Bể]
       │
       ▼ (Cấp 9)
[vol-20: Vòi Bơm Cùng Lỗ Rò Thoát Nước (Lưu lượng ròng)]
       │
       ▼ (Cấp 10)
[vol-21: Đại Thử Thách Trạm Nước Thần (Hệ thống liên hoàn đa bước)]
```

### Chi tiết đặc tả toán học của 10 bài mới:

1. **`vol-12` (Cấp 1) - San Sẻ Cân Bằng 2 Bình**:
   - Bình A: 28L, Bình B: 16L. Tổng = 44L.
   - Trạng thái cân bằng: Mỗi bình $44 : 2 = 22\text{L}$.
   - Số lít rót từ A sang B: $28 - 22 = 6\text{L}$ (hoặc $(28 - 16) : 2 = 6\text{L}$).
2. **`vol-13` (Cấp 2) - Bar Model Tổng & Tỉ Số**:
   - Tổng nước cam và nước chanh là 36L. Nước cam gấp 3 lần nước chanh.
   - Sơ đồ 4 phần bằng nhau ($1 + 3 = 4$). Giá trị 1 phần: $36 : 4 = 9\text{L}$.
   - Nước chanh: 9L, Nước cam: $9 \times 3 = 27\text{L}$.
3. **`vol-14` (Cấp 3) - Đo Thể Tích Vật Chìm Đơn Lẻ**:
   - Mực nước ban đầu: 300 mL. Khi thả viên đá thạch anh chìm hoàn toàn: 480 mL.
   - Thể tích viên đá = Nước dâng lên: $480 - 300 = 180\text{ mL}$.
4. **`vol-15` (Cấp 4) - Đo Thể Tích Đa Vật Thể (3 Bi Sắt)**:
   - Bình nước có 500 mL. Thả 3 viên bi sắt cùng cỡ, mực nước dâng lên 680 mL.
   - Tổng thể tích 3 bi: $680 - 500 = 180\text{ mL}$. Mỗi viên bi: $180 : 3 = 60\text{ mL}$.
5. **`vol-16` (Cấp 5) - Bar Model Hiệu & Tỉ Số**:
   - Bể Benny nhiều hơn bể Rory 45L. Bể Benny gấp 4 lần bể Rory.
   - Hiệu số phần: $4 - 1 = 3$ phần. Giá trị 1 phần: $45 : 3 = 15\text{L}$.
   - Bể Rory: 15L, Bể Benny: $15 \times 4 = 60\text{L}$. Tổng 2 bể: $15 + 60 = 75\text{L}$.
6. **`vol-17` (Cấp 6) - San Sẻ Nước 3 Bình Liên Hoàn**:
   - Bình A: 14L, Bình B: 24L, Bình C: 34L. Tổng 3 bình = 72L.
   - Mỗi bình sau khi cân bằng: $72 : 3 = 24\text{L}$.
   - Bình B giữ nguyên, Bình C chuyển sang Bình A chính xác: $34 - 24 = 10\text{L}$.
7. **`vol-18` (Cấp 7) - Vòi Bơm & Thời Gian Đổ Đầy Bể**:
   - Dung tích bể: 150L, hiện có sẵn 30L. Lượng nước cần bơm thêm: $150 - 30 = 120\text{L}$.
   - Vòi chảy: 20 Lít/phút. Thời gian để đầy bể: $120 : 20 = 6\text{ phút}$.
8. **`vol-19` (Cấp 8) - Hai Vòi Cùng Chảy Vào Bể**:
   - Bể rỗng dung tích 240L. Vòi 1: 18 Lít/phút, Vòi 2: 22 Lít/phút.
   - Tổng lưu lượng: $18 + 22 = 40\text{ Lít/phút}$.
   - Thời gian cả hai vòi cùng đổ đầy bể: $240 : 40 = 6\text{ phút}$.
9. **`vol-20` (Cấp 9) - Vòi Bơm Có Lỗ Thoát Nước (Lưu Lượng Ròng)**:
   - Bể dung tích 210L rỗng. Vòi bơm vào: 32 Lít/phút. Lỗ rò rỉ đáy: 8 Lít/phút.
   - Lượng nước thực tăng mỗi phút: $32 - 8 = 24\text{ Lít/phút}$ (để số đẹp: bơm 32, rò 7 -> ròng 25 L/phút; bể 200L -> 8 phút).
   - Thiết lập số tròn trịa: Dung tích bể 200L, bơm 30 L/phút, rò 5 L/phút $\to$ thực tế $25\text{ L/phút}$. Thời gian: $200 : 25 = 8\text{ phút}$.
10. **`vol-21` (Cấp 10) - Đại Thử Thách Trạm Nước Thần (4 Vòng Tích Hợp)**:
    - Bể chứa kết hợp: Đo thể tích khối kim loại chìm ($1000\text{ mL} \to 1450\text{ mL}$), tính lượng nước san sẻ giữa 2 bình và tính thời gian bơm đầy ngăn dự trữ. Bộ 4 câu hỏi tổng hợp tư duy toàn trạm.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                    lessonsData.ts (Station 2)               │
│                                                             │
│   vol-fill -> vol-10 -> vol-bar-11                          │
│                                                             │
│   [Mới] vol-12: volumeComparison (San sẻ cân bằng)          │
│   [Mới] vol-13: barModel (Tổng & tỉ số)                     │
│   [Mới] vol-14: volumeComparison (Archimedes 1 vật)         │
│   [Mới] vol-15: volumeComparison (Archimedes 3 vật)         │
│   [Mới] vol-16: barModel (Hiệu & tỉ số)                     │
│   [Mới] vol-17: volumeComparison (San sẻ 3 bình)            │
│   [Mới] vol-18: volumeComparison / flow (Thời gian 1 vòi)   │
│   [Mới] vol-19: volumeComparison / flow (2 vòi đồng thời)   │
│   [Mới] vol-20: volumeComparison / flow (Lưu lượng ròng)    │
│   [Mới] vol-21: volumeComparison (Đại thử thách 4 câu hỏi)  │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 Interactive Visual Components               │
│  - VolumeComparison.tsx (Hỗ trợ nhãn bình, vạch chia, mL/L) │
│  - BarModelViewer.tsx (Hỗ trợ tỉ lệ đoạn thẳng & parts)     │
└───────────────────────────────┬─────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────┐
│                 Automated Logic Audit Pipeline              │
│  - Verify all correctAnswers in options                     │
│  - Verify arithmetic consistency across hints & questions   │
│  - TypeScript compilation (0 errors) & Build pass           │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Kế Hoạch Kiểm Thử & Kiểm Toán Logic Toàn Diện

1. **Kiểm tra tính logic số học nội tại**:
   - Tất cả các phép toán trừ, chia tỉ số, phép tính Archimedes và lưu lượng dòng chảy đều chia hết, cho kết quả nguyên dương phù hợp với nhận thức của học sinh lớp 3.
   - Gợi ý (`hint`) giải thích từng bước mạch lạc, khớp tuyệt đối với đáp án đúng (`correctAnswer`).
2. **Kiểm tra tương tác UI**:
   - Nút lựa chọn hiển thị rõ ràng, không bị tràn dòng, không che khuất các phần tử khác.
   - Thanh điều hướng bài học cố định chân trang hoạt động trơn tru khi hoàn thành mỗi bài.
3. **Xác minh biên dịch**:
   - Chạy `npm run build` và kiểm tra toàn vẹn TypeScript trước khi bàn giao.
