## TRACK A — BOOTSTRAP 5

### PHẦN A — ĐỌC HIỂU (20 điểm)

#### Câu A1 (10đ) — Grid System

**1. Bảng dự đoán Layout:**

| Kích thước | < 768px (xs, sm) | 768px - 991px (md) | ≥ 992px (lg, xl, xxl) |
|------------|---------|---------------|---------|
| **Số cột (trên 1 hàng)** | 1 cột | 2 cột | 4 cột |
| **Box layout** | Xếp chồng lên nhau (4 hàng dọc) | Lưới 2x2 (2 hàng, mỗi hàng 2 box) | Lưới 1x4 (1 hàng ngang nằm cạnh nhau) |

**2. Trả lời câu hỏi thêm:**
* **`col-md-6` nghĩa là gì?** Nó có nghĩa là bắt đầu từ breakpoint `md` (màn hình rộng ≥ 768px) trở lên, phần tử này sẽ chiếm 6/12 phần không gian của lưới (tương đương 50% chiều rộng container).
* **Tại sao không cần viết `col-sm-12`?** Bởi vì Bootstrap áp dụng tư duy **Mobile-First**. Class `col-12` (không có tiền tố) sẽ được áp dụng cho màn hình nhỏ nhất (xs) và tự động kế thừa (dội ngược lên) tất cả các màn hình lớn hơn cho đến khi gặp một breakpoint mới chặn nó lại. Kích thước `sm` (≥ 576px) nằm trong khoảng trước khi tới `md`, nên nó mặc định kế thừa giá trị 12 cột từ `col-12`. Việc viết thêm `col-sm-12` là thừa thãi.

---

#### Câu A2 (10đ) — Utilities & Components

**1. Giải thích class `d-none d-md-block`:**
* **`d-none`**: Ẩn phần tử (`display: none`) mặc định trên tất cả các thiết bị bắt đầu từ Mobile.
* **`d-md-block`**: Kích hoạt lại việc hiển thị phần tử dưới dạng khối (`display: block`) khi màn hình đạt kích thước từ `md` (≥ 768px) trở lên.
* **Tóm lại**: Element này sẽ bị ẨN trên điện thoại (< 768px) và HIỆN trên máy tính bảng/máy tính (≥ 768px).

**2. 5 Spacing utilities (margin/padding):**
Bootstrap quy ước: `m` = margin, `p` = padding. Các hướng: `t` (top), `b` (bottom), `s` (start/left), `e` (end/right), `x` (trái+phải), `y` (trên+dưới).
* `mt-3`: `margin-top` ở mức 3 (thường là 1rem ~ 16px).
* `px-4`: `padding` hai bên trái/phải (trục X) ở mức 4 (thường là 1.5rem ~ 24px).
* `mb-auto`: `margin-bottom: auto` (giúp đẩy các phần tử khác ra xa nhất có thể trong flexbox).
* `py-2`: `padding` trên/dưới (trục Y) ở mức 2 (thường là 0.5rem ~ 8px).
* `me-5`: `margin-end` (margin bên phải) ở mức 5 (thường là 3rem ~ 48px).

**3. Sự khác nhau giữa 3 loại Container:**
* **`.container`**: Là container cố định chiều rộng theo từng điểm dừng (responsive fixed-width). Mỗi khi kéo qua một breakpoint (sm, md, lg...), chiều rộng tối đa (max-width) của nó sẽ giật và thay đổi theo một con số cố định, tạo ra lề (margin) 2 bên.
* **`.container-fluid`**: Chiếm 100% chiều rộng của viewport (màn hình) ở mọi kích thước thiết bị. Không bao giờ có khoảng trống lề thừa 2 bên (ngoại trừ padding mặc định của lưới).
* **`.container-md`**: Là sự lai tạp. Nó sẽ hoạt động giống 100% chiều rộng (`container-fluid`) trên các màn hình nhỏ (xs, sm). Nhưng bắt đầu từ điểm dừng `md` (≥ 768px) trở lên, nó sẽ hoạt động giống một `.container` bình thường có max-width cố định.
### PHẦN C — PHÂN TÍCH (20 điểm)

#### Câu C1 (10đ) — Tùy biến Bootstrap

**1. Quy trình đổi màu `$primary` từ xanh sang `#E63946`:**
* **Công cụ cần thiết:** Một SASS Compiler (như Extension *Live Sass Compiler* trên VSCode hoặc gói lệnh `sass` qua Node.js).
* **Quy trình thực hiện:**
    1. Tải source code SASS của Bootstrap về máy (qua npm hoặc tải file zip).
    2. Tạo một file SASS của riêng bạn, ví dụ: `custom.scss`.
    3. Trong file `custom.scss`, khai báo đè biến `$primary` **TRƯỚC KHI** import Bootstrap:
       ```scss
       // Đặt lại màu primary theo ý muốn
       $primary: #E63946;
       
       // Sau đó mới import toàn bộ (hoặc các phần cần thiết) của Bootstrap
       @import "node_modules/bootstrap/scss/bootstrap";
       ```
    4. Chạy compiler để biên dịch file `custom.scss` này ra thành `custom.css`.
    5. Link file `custom.css` vừa tạo vào HTML thay cho link CDN mặc định của Bootstrap.

**2. Tại sao KHÔNG nên override trực tiếp `.btn-primary { background: red; }`?**
* **Tính nhất quán (Consistency):** Trong Bootstrap, biến `$primary` không chỉ dùng cho mỗi nút bấm. Nó còn được dùng để tính toán màu cho hàng loạt component khác như `badge`, `alert`, `text-primary`, `bg-primary`, viền input khi focus, v.v. Nếu chỉ override class `.btn-primary` bằng CSS thường, bạn sẽ phải lóc cóc đi tìm và viết CSS đè cho tất cả các component khác nếu muốn đổi theme, rất dễ bị sót.
* **Các trạng thái tương tác:** Khi dùng SASS variable, Bootstrap tự động dùng các hàm toán học (như `darken`, `lighten`) để tạo ra màu khi hover, active, hoặc viền shadow khi focus. Nếu ghi đè CSS cứng bằng `background: red`, bạn sẽ mất hết các hiệu ứng hover này, hoặc lại phải hì hục viết thêm đống CSS đè cho `:hover`, `:active`.

---

#### Câu C2 (10đ) — So sánh Bootstrap vs CSS Thuần

**So sánh chi tiết (Navbar Responsive & Product Card):**

| Tiêu chí | CSS Thuần (Vanilla CSS) | Bootstrap 5 |
| :--- | :--- | :--- |
| **Số dòng CSS cần viết** | Rất nhiều (có thể lên tới hàng trăm dòng, phải tự viết Flexbox, Media Queries, Animation và JS cho nút Hamburger). | **0 dòng CSS**. Hoàn toàn dùng các class có sẵn (`navbar`, `navbar-expand-lg`, `card`, `col-md-4`...) thẳng trong HTML. |
| **Thời gian phát triển** | Chậm (mất vài giờ để code, test responsive trên nhiều màn hình và fix lỗi). | Cực kỳ nhanh (chỉ 5-10 phút lắp ghép các class là có ngay giao diện chuẩn). |
| **Khả năng tùy biến** | **Cao / Vô hạn**. Làm chủ 100% giao diện, muốn pixel nào ở đâu là được ở đó. | **Trung bình - Khó**. Nếu dùng mặc định sẽ bị hội chứng "trang nào trông cũng giống nhau". Muốn custom sâu phải rành SASS. |

**Kết luận sử dụng:**

* **NÊN dùng Bootstrap khi:** * Làm các dự án cần tốc độ nhanh (MVP, Prototype, đồ án môn học cần chạy cho kịp deadline).
    * Thiết kế các hệ thống nội bộ (Admin Dashboard, CMS) không yêu cầu UI quá phá cách.
    * Đội ngũ phát triển thiên về Backend (ít kinh nghiệm CSS).
* **KHÔNG NÊN dùng Bootstrap khi:**
    * Dự án có bản thiết kế UI/UX độc quyền, phức tạp, khác biệt hoàn toàn với chuẩn lưới của Bootstrap.
    * Các dự án yêu cầu tối ưu hóa tốc độ tải trang (Performance) ở mức tối đa (không muốn bắt user tải nguyên cục CSS hàng trăm KB của Bootstrap mà chỉ dùng vài ba class).