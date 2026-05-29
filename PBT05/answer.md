## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (5đ) — Viewport & Mobile-First

**1. Thẻ `<meta viewport>` chuẩn và giải thích:**
```
html
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
.card { width: 100%; } 
@media (min-width: 768px) { 
    .card { width: 50%; } 
}
.card { width: 50%; } 
@media (max-width: 767px) { 
    .card { width: 100%; } 
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
    a { color: white; } 
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
## PHẦN C — PHÂN TÍCH (20 điểm)

### Câu C1 (10đ) — Phân tích trang web thực (Ví dụ: Shopee)

**1. Hình ảnh Screenshot:**
* *(Ghi chú cho sinh viên: Bạn hãy mở F12 -> Toggle Device Toolbar và tự chụp 3 ảnh màn hình dán vào đây)*
* [Chèn ảnh Shopee Mobile - 375px]
* [Chèn ảnh Shopee Tablet - 768px]
* [Chèn ảnh Shopee Desktop - 1440px]

**2. Phân tích UI/UX:**
* **Navigation thay đổi thế nào?**
  * **Mobile:** Menu ngang biến mất hoàn toàn. Thanh tìm kiếm bị thu ngắn lại, nhường chỗ cho icon Giỏ hàng và nút Back/Chat. Các danh mục (categories) chuyển thành dạng vuốt ngang (horizontal scroll) hoặc icon lưới nhỏ.
  * **Tablet:** Thanh tìm kiếm rộng hơn, có thể xuất hiện thêm một số icon tiện ích nhưng vẫn chưa có menu text đầy đủ.
  * **Desktop:** Header hiển thị full thanh điều hướng phụ ở trên cùng (Kênh người bán, Tải ứng dụng, Kết nối, Ngôn ngữ). Thanh tìm kiếm rất dài kèm theo các từ khóa gợi ý ngay bên dưới.
* **Lưới content (Product Grid) thay đổi mấy cột?**
  * Mobile: 2 cột (hoặc 1 cột nếu là banner to).
  * Tablet: 3 - 4 cột.
  * Desktop: 6 cột (tận dụng tối đa chiều rộng màn hình).
* **Elements nào bị ẩn trên mobile?**
  * Banner quảng cáo dọc hai bên (Ads bar) bị ẩn hoàn toàn.
  * Sidebar bộ lọc chi tiết (Filter) bên trái bị ẩn, thay vào đó là nút "Lọc" mở ra một modal/popup từ dưới lên.
  * Footer: Các cột thông tin chi tiết (Về Shopee, Thanh toán, Vận chuyển) bị ẩn hoặc gộp thành dạng Accordion (nhấn vào dấu `+` mới xổ ra).
* **Font size có thay đổi không?**
  * Có. Kích thước chữ tiêu đề và tên sản phẩm trên Mobile được thu nhỏ lại (thường khoảng 12px - 14px) so với Desktop (14px - 16px) để tránh bị rớt dòng quá nhiều, tối ưu không gian hiển thị.

**3. Media Queries (CSS soi từ DevTools):**
* *(Ghi chú cho sinh viên: Chụp 2 đoạn code CSS chứa @media trong tab Elements -> Styles và dán vào đây)*
* **Ví dụ tìm thấy:**
  1. `@media (max-width: 767px) { .shopee-header { height: 50px; } }` (Dùng để thu nhỏ header trên mobile).
  2. `@media (min-width: 1200px) { .container { width: 1200px; margin: 0 auto; } }` (Dùng để giới hạn chiều rộng nội dung và căn giữa trên màn hình to).

---

### Câu C2 (10đ) — Thiết kế Responsive Strategy (Nhà hàng)

**1. Wireframe / Sơ đồ bố cục (Mô tả Layout)**

* **Mobile (< 768px) - Layout 1 cột:**
  * **Header:** Chứa Logo bên trái và nút Hamburger ☰ bên phải (giấu số điện thoại và menu).
  * **Hero:** Ảnh nền 100% chiều rộng, chữ căn giữa.
  * **Grid món ăn:** 1 cột (từng ảnh xếp chồng lên nhau từ trên xuống dưới).
  * **Form & Map:** Stacked (xếp chồng). Form đặt bàn nằm trên, bản đồ Google Maps nằm ngay dưới.
  * **Footer:** Các thông tin liên hệ xếp dọc 1 cột.

* **Tablet (768px - 1023px) - Layout chuyển tiếp:**
  * **Header:** Logo bên trái, Số điện thoại bên phải (có thể vẫn giữ hamburger menu cho các link phụ).
  * **Grid món ăn:** Chia 2 cột (3 hàng).
  * **Form & Map:** Vẫn xếp chồng, nhưng form được chia thành 2 cột nhỏ bên trong (ví dụ: Ngày và Giờ nằm ngang nhau). Bản đồ chiếm full width ở dưới.

* **Desktop (≥ 1024px) - Layout đa cột:**
  * **Header:** Trải ngang đầy đủ (Logo - Menu Điều hướng - Số điện thoại Đặt bàn).
  * **Grid món ăn:** Chia 3 cột (2 hàng) gọn gàng.
  * **Form & Map:** Layout Side-by-side (Nằm ngang). Form đặt bàn chiếm 40% (bên trái), Bản đồ chiếm 60% (bên phải).

**2. CSS Skeleton (Grid + Mobile-First)**

```css

.restaurant-layout {
    display: flex;
    flex-direction: column;
}
.menu-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
}
.booking-section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 24px;
}
@media (min-width: 768px) {
    .menu-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .booking-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    .booking-form .full-width {
        grid-column: span 2;
    }
}
@media (min-width: 1024px) {
    .menu-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
    }
    .booking-section {
        grid-template-columns: 4fr 6fr; 
        align-items: start;
    }
}
```