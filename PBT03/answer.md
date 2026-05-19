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