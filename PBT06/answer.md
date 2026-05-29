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