# PHẦN A — KIỂM TRA ĐỌC HIỂU

## Câu A1 — 3 Cách nhúng CSS

**1. Inline CSS (Nhúng trực tiếp vào thẻ HTML)**
- **Ví dụ code:** `<h1 style="color: blue; font-size: 24px;">ShopTLU</h1>`
- **Ưu điểm:** Áp dụng nhanh, specificity (độ ưu tiên) cực cao.
- **Nhược điểm:** Khó bảo trì, code HTML bị rối, không thể tái sử dụng.
- **Khi nào nên dùng:** Khi cần test nhanh style hoặc khi thao tác bằng JavaScript để thay đổi style động.

**2. Internal CSS (Nhúng trong thẻ `<style>` ở `<head>`)**
- **Ví dụ code:** 
  `<style> h1 { color: blue; } </style>`
- **Ưu điểm:** Quản lý style của một trang ở cùng một file, không tốn thêm HTTP request.
- **Nhược điểm:** Không thể chia sẻ style cho các file HTML khác, làm tăng dung lượng file HTML.
- **Khi nào nên dùng:** Cho các landing page đơn giản hoặc các trang web chỉ có 1 trang.

**3. External CSS (Nhúng qua file `.css` tách biệt)**
- **Ví dụ code:** `<link rel="stylesheet" href="style.css">`
- **Ưu điểm:** Tách biệt cấu trúc và giao diện, tái sử dụng được cho nhiều trang, trình duyệt cache file CSS giúp web tải nhanh hơn.
- **Nhược điểm:** Tốn thêm 1 HTTP request để tải file CSS.
- **Khi nào nên dùng:** Là tiêu chuẩn bắt buộc cho hầu hết mọi dự án thực tế.

**Câu hỏi thêm:** 
Nếu cùng 1 element có cả 3 cách CSS đồng thời áp dụng, **Inline CSS sẽ "thắng"**. 
Giải thích: Theo quy tắc Specificity (Độ ưu tiên) của CSS, Inline style có điểm số cao nhất (tương đương 1,0,0,0), đè lên toàn bộ các selector thông thường được viết ở Internal hay External CSS.

---

## Câu A2 — CSS Selectors — Dự đoán kết quả

1. `h1` → Chọn: ShopTLU
2. `.price` → Chọn: 25.990.000đ và 45.990.000đ
3. `#app header` → Chọn: Toàn bộ nội dung text bên trong header (ShopTLU, Home, Products, About)
4. `nav a:first-child` → Chọn: Home
5. `.product.featured h2` → Chọn: MacBook Pro
6. `article > p` → Chọn: 25.990.000đ, Mô tả sản phẩm..., 45.990.000đ, Mô tả sản phẩm...
7. `a[href="/"]` → Chọn: Home
8. `.top-bar.dark h1` → Chọn: ShopTLU

---

## Câu A3 — Box Model — Tính toán kích thước

**Trường hợp 1: content-box (mặc định)**
- Chiều rộng hiển thị = Width (400) + Padding L/R (40) + Border L/R (10) = **450px**
- Không gian chiếm trên trang = Hiển thị (450) + Margin L/R (20) = **470px**

**Trường hợp 2: border-box**
- Chiều rộng hiển thị = **400px** (padding và border đã gộp vào width)
- Kích thước content thực tế = Width (400) - Padding L/R (40) - Border L/R (10) = **350px**
- Không gian chiếm trên trang = Hiển thị (400) + Margin L/R (20) = **420px**

**Trường hợp 3: Margin collapse**
- Khoảng cách giữa box-a và box-b = **40px**
- Giải thích: Khi 2 block elements nằm dọc kề nhau, margin của chúng sụp đổ (collapse) và hợp nhất thành giá trị lớn nhất (giữa 25px và 40px chọn 40px), chứ không cộng dồn thành 65px.

**Nâng cao:** 
Khoảng cách = 40 + (-10) = **30px** (Margin dương và margin âm sẽ được cộng lại về mặt toán học).

---

## Câu A4 — Specificity (Độ ưu tiên)

**1. Tính specificity score**
- Rule A (`p`): 0, 0, 1
- Rule B (`.price`): 0, 1, 0
- Rule C (`#main-price`): 1, 0, 0
- Rule D (`p.price`): 0, 1, 1

**2. Element có màu gì?**
Màu **đỏ (red)**. Giải thích: Rule C (ID) có specificity cao nhất (1, 0, 0).

**3. Thêm style inline**
Màu **cam (orange)**. Giải thích: Inline style ưu tiên cao hơn ID.

**4. Thêm !important vào Rule A**
Màu **đen (black)**. Giải thích: `!important` phá vỡ mọi quy tắc specificity, đưa thuộc tính lên mức ưu tiên cao nhất.

---

# PHẦN C — DEBUG & SUY LUẬN

## Câu C1 — Debug CSS Layout

**1. Tính chiều rộng thực tế (content-box)**
- Sidebar: Width (300) + Padding L/R (40) + Border L/R (2) = **342px**
- Content: Width (660) + Padding L/R (60) + Border L/R (2) = **722px**

**2. Giải thích tại sao layout bị vỡ**
Tổng chiều rộng thực tế của hai khối là: 342px + 722px = 1064px. Mức này vượt quá chiều rộng tối đa của container cha (960px). Vì không đủ không gian, khối content bị đẩy rớt xuống dòng dưới.

**3. Đưa ra 2 cách sửa**
- **Cách 1 (Dùng border-box):**
  Thêm `* { box-sizing: border-box; }` lên đầu file. Sau đó giảm width của `.content` xuống còn 660px để tổng width là 300px + 660px = 960px.
- **Cách 2 (Không dùng border-box):**
  Trừ thủ công padding và border ra khỏi thuộc tính width để giữ nguyên kích thước hiển thị.
  Sửa `.sidebar { width: 258px; }` (300 - 40 - 2)
  Sửa `.content { width: 598px; }` (660 - 60 - 2)

---

## Câu C2 — Cascade Puzzle

**1. "Sản phẩm A" (h2)**
- `font-size` = **20px** (Từ `.card .title`)
- `color` = **green** (Từ `.highlight` có chứa `!important` nên đè được cả ID)

**2. "Mô tả sản phẩm" (p trong card featured)**
- `color` = **blue** (Phần tử `p` trúng luật `.card p { color: inherit; }`, bắt buộc kế thừa màu từ cha là `.card` có màu xanh dương).

**3. "Sản phẩm B" (h2)**
- `font-size` = **20px** (Từ `.card .title`)
- `color` = **#333** (Kế thừa từ `body` vì không nằm trong `#featured` và không có luật màu trực tiếp).

**4. "Mô tả sản phẩm B" (p.highlight)**
- `color` = **green** (Trúng luật `.highlight` chứa `!important` nên đè luôn `inherit` của `.card p`).
# PHẦN B — THỰC HÀNH CODE (Ghi chú và Giải thích)

## Bài B1 — Style trang Profile
**5 loại selector khác nhau đã sử dụng trong file `style.css`:**
1. **Element Selector:** `body`, `table`, `th` (Chọn trực tiếp tên thẻ).
2. **Class Selector:** `.container`, `.active` (Chọn các phần tử có class tương ứng).
3. **ID Selector:** `#main-header` (Chọn phần tử duy nhất có id là main-header).
4. **Descendant Selector:** `nav a` (Chọn tất cả thẻ `a` nằm bên trong thẻ `nav`).
5. **Pseudo-class Selector:** `a:hover`, `tr:nth-child(even)` (Chọn trạng thái hover hoặc phần tử chẵn/lẻ).

---

## Bài B2 — Box Model Lab

**Phần 1 — Chứng minh content-box vs border-box:**
- Hộp 1 (content-box): chiều rộng thực tế = **350px** (đo từ DevTools: 300px width + 40px padding + 10px border).
- Hộp 2 (border-box): chiều rộng thực tế = **300px** (đo từ DevTools: kích thước 300px đã bao gồm cả padding và border).
- **Giải thích sự khác biệt:** `content-box` cộng dồn padding và border ra bên ngoài kích thước width đã khai báo. `border-box` ép padding và border vào bên trong, tự động thu nhỏ vùng content lại để giữ đúng kích thước tổng bằng thẻ width khai báo.

**Phần 2 — Layout 3 cột:**
Nếu KHÔNG dùng `border-box`, tổng chiều rộng thực tế của 3 cột là:
- Cột trái: 250 + (15 * 2) = 280px
- Cột giữa: 500 + (20 * 2) = 540px
- Cột phải: 250 + (15 * 2) = 280px
- **Tổng = 1100px**. Lớn hơn container (1000px) nên cột số 3 (Ads) bị đẩy rớt xuống dòng.

---

## Bài B3 — Specificity Battle

**1. Liệt kê 10 rules + specificity score (từ thấp đến cao)**
1. `p` (0,0,1)
2. `.text` (0,1,0)
3. `.highlight` (0,1,0)
4. `p.text` (0,1,1)
5. `.text.highlight` (0,2,0)
6. `p.text.highlight` (0,2,1)
7. `#demo` (1,0,0)
8. `p#demo` (1,0,1)
9. `#demo.text` (1,1,0)
10. `#demo.text.highlight` (1,2,0)

**2. Element cuối cùng hiển thị màu gì? Tại sao?**
Element hiển thị màu **xanh lá (green)**.
Tại sao: Vì rule số 10 (`#demo.text.highlight`) kết hợp 1 ID và 2 Class, cho ra điểm specificity cao nhất là (1,2,0), đánh bại tất cả các rules phía trên nó.

**4. Thay đổi thứ tự rules trong CSS file. Kết quả có đổi không? Giải thích.**
- **Nếu đổi chỗ rule 1 đến rule 10 lộn xộn:** Kết quả **KHÔNG ĐỔI**. Màu vẫn là xanh lá. Vì quy tắc tính điểm (Specificity) luôn được ưu tiên xử lý trước, không phụ thuộc vào vị trí dòng code.
- **Trường hợp ngoại lệ (Rule 2 và Rule 3):** Vì `.text` và `.highlight` có cùng số điểm (0,1,0). Nếu đổi chỗ hai rule này cho nhau, màu của phần tử (nếu loại bỏ các rule mạnh hơn) sẽ phụ thuộc vào rule nào được viết sau cùng (Cascade rule).