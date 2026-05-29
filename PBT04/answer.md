## PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

### Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
| :--- | :--- | :--- | :--- | :--- |
| `static` | **Có** | Luồng mặc định của tài liệu (Document flow) | **Có** | Layout mặc định, hiển thị nội dung thông thường |
| `relative` | **Có** (giữ nguyên khoảng trống cũ) | Vị trí gốc của chính nó trước khi dịch chuyển | **Có** | Dịch chuyển nhẹ phần tử; Làm gốc tọa độ (container) cho phần tử con `absolute` |
| `absolute` | **Không** (bị rút khỏi flow) | "Nearest positioned ancestor" (Phần tử cha gần nhất có position khác static) | **Có** (trôi theo phần tử cha) | Nút close, Badge "HOT", Tooltip, Dropdown menu |
| `fixed` | **Không** | Viewport (Khung nhìn của trình duyệt) | **Không** (Đứng im khi cuộn) | Fixed Header/Navbar, Nút "Cuộn lên đầu trang", Nút chat |
| `sticky` | **Có** | Giao thoa giữa flow mặc định và Viewport | **Có**, cho đến khi đạt ngưỡng (top/bottom) thì ghim lại | Sidebar trượt theo màn hình, Table header đứng im khi cuộn |

**Trả lời câu hỏi thêm:**

* **Khi nào `absolute` tham chiếu `body`?** Khi nó đi ngược lên cây DOM mà không tìm thấy bất kỳ phần tử cha nào có thuộc tính `position` khác `static`. Lúc này nó sẽ lấy gốc của trang web (document/body) làm hệ tọa độ.
* **Khi nào tham chiếu parent?** Khi phần tử cha trực tiếp (hoặc cha gián tiếp) được thiết lập một trong các giá trị: `relative`, `absolute`, `fixed`, hoặc `sticky`. (Thực tế phổ biến nhất là dùng `position: relative` ở thẻ cha để làm mỏ neo).
* **Giải thích khái niệm "nearest positioned ancestor":** Nghĩa là "Tổ tiên được định vị gần nhất". Trình duyệt sẽ xét từ phần tử `absolute` hiện tại, đi ngược lên thẻ cha bao bọc nó, rồi thẻ ông, thẻ cụ... Thẻ đầu tiên trên đường đi có `position` khác `static` sẽ được chọn làm mốc tọa độ (0,0) cho phần tử đó.

---

### Câu A2 (10đ) — Flexbox vs Grid

**Trường hợp 1:**
* **Dự đoán:** Bố cục 1 hàng ngang, 4 cột bằng nhau. Cả 4 item chia đều không gian container (mỗi item chiếm 25% chiều rộng).
* **Sơ đồ:**
```text
┌──────────────────────────────────────────────────┐
│ [  Item 1  ] [  Item 2  ] [  Item 3  ] [  Item 4 ] │
└──────────────────────────────────────────────────┘
```

**Trường hợp 2:**
* **Dự đoán:** Bố cục lưới 3 hàng, 2 cột. Mỗi item chiếm 45% width + 5% margin tổng (trái/phải) = 50%. Mỗi hàng chứa tối đa 2 items. Các items 3, 4, 5, 6 sẽ tự động wrap xuống hàng dưới.
* **Sơ đồ:**
```text
┌────────────────────────────────────────┐
│  [       Item 1       ] [       Item 2       ]  │
│  [       Item 3       ] [       Item 4       ]  │
│  [       Item 5       ] [       Item 6       ]  │
└────────────────────────────────────────┘
```

**Trường hợp 3:**
* **Dự đoán:** Bố cục 1 hàng ngang (thường dùng làm Navbar). Item 1 dính sát lề trái, Item 3 dính sát lề phải, Item 2 nằm chính giữa. Cả 3 items được căn giữa hoàn hảo theo trục dọc.
* **Sơ đồ:**
```text
┌──────────────────────────────────────────────────┐
│ [Item 1]                [Item 2]                [Item 3] │
└──────────────────────────────────────────────────┘
```

**Trường hợp 4:**
* **Dự đoán:** Bố cục 1 hàng, 3 cột. Cột 1 và 3 rộng cố định 200px. Cột 2 (`1fr`) co giãn chiếm toàn bộ khoảng trống còn lại ở giữa. Có khoảng cách 20px giữa các cột.
* **Sơ đồ:**
```text
┌─────────┬────────────────────────────┬─────────┐
│ [ 200px ]  gap  [        1fr (co giãn)       ]  gap  [ 200px ] │
└─────────┴────────────────────────────┴─────────┘
```

**Trường hợp 5:**
* **Dự đoán:** Bố cục lưới 3 hàng, 3 cột đều nhau (`1fr` mỗi cột), khoảng cách 10px. Hàng 1 có 3 items, hàng 2 có 3 items. Item số 7 sẽ nằm ở ô đầu tiên (bên trái) của hàng thứ 3.
* **Sơ đồ:**
```text
┌────────────────────────────────────────────┐
│ [   Item 1   ] gap [   Item 2   ] gap [   Item 3   ] │
│ [   Item 4   ] gap [   Item 5   ] gap [   Item 6   ] │
│ [   Item 7   ] gap [   Trống    ] gap [   Trống    ] │
└────────────────────────────────────────────┘
```
## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Flexbox vs Grid: Khi nào dùng gì?

1. **Navigation bar ngang:** Dùng **Flexbox**. 
   * *Giải thích:* Đây là layout 1 chiều (1D) nằm ngang. Flexbox sinh ra để xử lý việc căn chỉnh, giãn cách các phần tử trên một hàng (hoặc cột) cực kỳ dễ dàng với `justify-content` và `align-items`.
2. **Lưới ảnh Instagram:** Dùng **Grid**.
   * *Giải thích:* Đây là layout 2 chiều (2D - cả hàng và cột). Grid giúp kiểm soát chính xác cấu trúc lưới, chia cột đều nhau (`repeat`) và tạo khoảng cách (`gap`) một cách đồng nhất, bất kể số lượng ảnh.
3. **Layout blog (main content + sidebar):** Dùng **Grid**.
   * *Giải thích:* Chia layout tổng thể của trang web là thế mạnh tuyệt đối của Grid. Dễ dàng chia tỷ lệ (ví dụ: `grid-template-columns: 1fr 300px;`) để content linh hoạt và sidebar giữ kích thước chuẩn.
4. **Footer với 4 cột thông tin:** Dùng **Grid** (hoặc kết hợp).
   * *Giải thích:* Dùng Grid để chia nhanh container thành 4 phần bằng nhau (`grid-template-columns: repeat(4, 1fr)`). Bên trong mỗi cột có thể dùng Flexbox (column) để xếp các link dọc xuống.
5. **Card sản phẩm (ảnh trên, text giữa, nút dưới):** Dùng **Flexbox**.
   * *Giải thích:* Cấu trúc thẻ là 1 trục dọc (`flex-direction: column`). Sử dụng Flexbox kết hợp trick `margin-top: auto` cho nút "Mua" là cách tối ưu nhất để ép nút luôn dính sát đáy card, bất chấp độ dài của text bên trên.

---
### Câu C2 (10đ) — Debug Flexbox

**Lỗi 1: Cards không đều chiều cao — nút "Mua" bị nhảy**
* **Nguyên nhân:** Flexbox container (`.card-container`) mặc định có `align-items: stretch` nên các `.card` sẽ cao bằng nhau. Tuy nhiên, nội dung *bên trong* `.card` (ảnh, h3, btn) không phải là flex-item nên không tự động giãn ra để lấp đầy khoảng trống, khiến nút "Mua" bị trôi nổi tự do theo chiều cao của text.
* **Code sửa:** Biến chính `.card` thành một flex-container theo trục dọc, sau đó đẩy nút xuống đáy.
```css
.card {
    width: 30%; margin: 1.5%;
    display: flex;
    flex-direction: column; 
}
.card img { width: 100%; }
.card h3 { font-size: 18px; }
.card .btn { 
    padding: 10px; 
    margin-top: auto; 
}
```

**Lỗi 2: Item dính góc trái trên trong Hero 100vh**
* **Nguyên nhân:** Có `display: flex` và chiều cao `100vh` rồi nhưng thiếu các thuộc tính căn chỉnh dọc và ngang của Flexbox trên container. `text-align: center` chỉ căn giữa chữ bên trong `.hero-content`, không căn giữa chính cái block `.hero-content` đó so với `.hero`.
* **Code sửa:** Thêm `justify-content` và `align-items` vào container.
```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center; 
    align-items: center;     
}
.hero-content {
    text-align: center;
}
```

**Lỗi 3: Sidebar bị co lại khi content quá dài**
* **Nguyên nhân:** Flexbox mặc định có thuộc tính `flex-shrink: 1` cho tất cả các flex-item. Nghĩa là khi container bị thiếu không gian (do content bên cạnh quá dài), các item sẽ bị ép co nhỏ lại so với `width` ban đầu.
* **Code sửa:** Tắt tính năng co giãn của sidebar bằng `flex-shrink: 0`.
```css
.layout { display: flex; }
.sidebar { 
    width: 250px; 
    flex-shrink: 0; 
}
.content { flex: 1; }
```