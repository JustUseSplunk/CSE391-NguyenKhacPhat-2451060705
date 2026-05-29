## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

**1. Thẻ `<meta viewport>` chuẩn và giải thích:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
* `width=device-width`: Báo cho trình duyệt biết chiều rộng của trang web phải bằng chính chiều rộng vật lý của màn hình thiết bị đang hiển thị.
* `initial-scale=1.0`: Thiết lập mức độ zoom ban đầu là 100% (không phóng to hay thu nhỏ) khi trang vừa được tải.

**2. Nếu THIẾU thẻ này trên iPhone:**
Trình duyệt di động sẽ giả định đây là một trang web cũ thiết kế cho máy tính. Nó sẽ render trang ở kích thước mặc định của desktop (thường rộng khoảng 980px), sau đó tự động thu nhỏ (zoom out) toàn bộ trang lại để nhét vừa vào màn hình điện thoại. Kết quả là chữ và hình ảnh sẽ bé tí hon, người dùng phải zoom bằng tay (pinch-to-zoom) mới đọc được.

**3. Mobile-First vs Desktop-First:**
* **Mobile-First (Ưu tiên di động):** Code CSS mặc định cho màn hình nhỏ gọn trước, sau đó dùng breakpoint `@media (min-width)` để scale up, đè layout cho màn hình lớn dần.
* **Desktop-First (Ưu tiên máy tính):** Code CSS mặc định cho màn hình to trước, sau đó dùng breakpoint `@media (max-width)` để bóp nhỏ, thiết kế lại cho thiết bị di động.

*Ví dụ CSS:*
```css
/* Mobile-First */
.card { width: 100%; } /* Mặc định cho mobile */
@media (min-width: 768px) { 
    .card { width: 50%; } /* Lên tablet/desktop chia 2 cột */
}

/* Desktop-First */
.card { width: 50%; } /* Mặc định cho desktop */
@media (max-width: 767px) { 
    .card { width: 100%; } /* Xuống mobile ép thành 1 cột */
}
```
*Tại sao Mobile-First được khuyên dùng?*
Vì nó tối ưu hiệu suất tải trang cho thiết bị di động (thiết bị yếu hơn, mạng có thể chậm hơn sẽ không phải tải khối lượng CSS rườm rà của desktop rồi mới ghi đè). Đồng thời, nó giúp tư duy thiết kế tập trung vào nội dung cốt lõi nhất trước khi dàn trải ra các tính năng phụ trên màn hình lớn.

---

### Câu A2 (5đ) — Breakpoints

Dựa theo chuẩn phổ biến (như Bootstrap 5):

| Breakpoint | Kích thước Pixel | Thiết bị đại diện | Ví dụ: Lưới sản phẩm |
| :--- | :--- | :--- | :--- |
| **xs (X-Small)** | `< 576px` | Điện thoại dọc (iPhone SE, iPhone 13...) | 1 cột (100% width) |
| **sm (Small)** | `≥ 576px` | Điện thoại ngang / Phablet | 2 cột (50% width) |
| **md (Medium)** | `≥ 768px` | Tablet (iPad, máy tính bảng) | 2 hoặc 3 cột |
| **lg (Large)** | `≥ 992px` | Laptop nhỏ / Desktop tiêu chuẩn | 3 hoặc 4 cột |
| **xl / xxl** | `≥ 1200px` | Màn hình Desktop lớn / TV | 4 hoặc 5 cột |

---

### Câu A3 (5đ) — Media Queries

| Chiều rộng màn hình | `.container` width | Giải thích cơ chế |
|---------------------|--------------------|-------------------|
| 375px (iPhone SE)   | **100%** | Chưa đạt ngưỡng 576px, nhận CSS gốc ban đầu (`width: 100%`). |
| 600px               | **540px** | Lớn hơn 576px nhưng nhỏ hơn 768px. |
| 800px               | **720px** | Lớn hơn 768px nhưng nhỏ hơn 992px. |
| 1000px              | **960px** | Lớn hơn 992px nhưng nhỏ hơn 1200px. |
| 1400px              | **1140px** | Lớn hơn 1200px, nhận giá trị lớn nhất trong code. |

---

### Câu A4 (5đ) — SCSS Basics

**1. 4 Tính năng chính của SCSS:**

* **Variables (Biến):** Cho phép lưu trữ màu sắc, font chữ, kích thước vào một biến để tái sử dụng, giúp dễ dàng đổi theme toàn trang web.
```scss
$primary-color: #e74c3c;
.btn { background-color: $primary-color; }
```
* **Nesting (CSS lồng nhau):** Viết bộ chọn CSS lồng nhau theo đúng cấu trúc phân cấp của HTML, giúp code trực quan và gọn gàng.
```scss
.navbar {
    background: black;
    a { color: white; } /* Biên dịch thành: .navbar a { ... } */
}
```
* **Mixins:** Đóng gói một nhóm các thuộc tính CSS lại thành một cấu trúc có thể gọi lại nhiều nơi, có thể truyền tham số linh hoạt.
```scss
@mixin flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}
.box { @include flex-center; }
```
* **@extend / Inheritance (Kế thừa):** Cho phép một class chia sẻ tập hợp các thuộc tính với một class khác, giúp code không bị lặp lại.
```scss
.message { border: 1px solid #ccc; padding: 10px; }
.success-message {
    @extend .message;
    border-color: green;
}
```

**2. Tại sao trình duyệt KHÔNG đọc được file `.scss`? Cần bước gì để chuyển SCSS → CSS?**
* Trình duyệt web được thiết kế để chỉ hiểu engine của CSS chuẩn (standard CSS). SCSS thực chất là một ngôn ngữ tiền xử lý (preprocessor).
* **Bước cần thiết:** Phải sử dụng công cụ biên dịch (Compiler) như Node Sass, Dart Sass, hoặc extension Live Sass Compiler trên VSCode để **dịch (compile) file `.scss` thành file `.css` thuần** thì trình duyệt mới có thể đọc và hiển thị giao diện được.