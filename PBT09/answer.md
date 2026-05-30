# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

## Câu A1 (5đ) — DOM Tree

**1. Sơ đồ cây (DOM Tree) cho HTML:**

```text
div#app
 ├── header
 │    ├── h1
 │    │    └── "Todo App" (Text node)
 │    └── nav
 │         ├── a.active
 │         │    └── "All" (Text node)
 │         ├── a
 │         │    └── "Active" (Text node)
 │         └── a
 │              └── "Completed" (Text node)
 └── main
      ├── form#todoForm
      │    ├── input#todoInput (type="text")
      │    └── button (type="submit")
      │         └── "Add" (Text node)
      └── ul#todoList
           ├── li.todo-item
           │    └── "Learn HTML" (Text node)
           └── li.todo-item.completed
                └── "Learn CSS" (Text node)
```

**2. Viết querySelector:**

* Chọn thẻ `<h1>`: 
    `document.querySelector("h1");`
* Chọn input trong form: 
    `document.querySelector("#todoInput");` *(hoặc `document.querySelector("#todoForm input");`)*
* Chọn tất cả `.todo-item`: 
    `document.querySelectorAll(".todo-item");`
* Chọn link đang active: 
    `document.querySelector("nav a.active");`
* Chọn `<li>` đầu tiên trong `#todoList`: 
    `document.querySelector("#todoList li");` *(hoặc `document.querySelector("#todoList li:first-child");`)*
* Chọn tất cả `<a>` bên trong `<nav>`: 
    `document.querySelectorAll("nav a");`

---

## Câu A2 (5đ) — innerHTML vs textContent

**1. Sự khác nhau và Khi nào sử dụng:**
* **`innerHTML`**: Đọc và biên dịch chuỗi truyền vào thành các thẻ HTML thực sự trên giao diện.
    * *Khi nào dùng:* Dùng khi bạn thực sự muốn render một cấu trúc HTML được tạo sẵn từ Javascript (Ví dụ: in ra một đoạn văn có chữ in đậm `<b>Hello</b>`).
* **`textContent`**: Chỉ xử lý chuỗi truyền vào dưới dạng văn bản thô (raw text). Các thẻ HTML sẽ bị hiển thị dưới dạng text bình thường chứ không được trình duyệt biên dịch.
    * *Khi nào dùng:* Dùng khi muốn cập nhật nội dung văn bản đơn thuần, đặc biệt là khi hiển thị dữ liệu do **người dùng nhập vào** để đảm bảo an toàn.

**2. Câu hỏi bảo mật (Lỗi XSS):**
`innerHTML` có thể gây lỗ hổng **XSS (Cross-Site Scripting)** vì nó biên dịch mọi chuỗi thành mã thực thi của trình duyệt. Nếu kẻ gian cố tình nhập mã độc (như thẻ `<script>` hay thẻ `<img>` kèm sự kiện `onerror` như đề bài), trình duyệt sẽ chạy ngay mã độc đó, dẫn đến việc bị đánh cắp cookie, token, hoặc bị điều hướng trang.

**Cách sửa lỗi Code minh họa:** Thay vì dùng `innerHTML`, ta ép trình duyệt hiểu input của user chỉ là văn bản thô bằng `textContent`:
```javascript
const userInput = document.querySelector("#search").value;
// Sửa thành textContent để chống XSS
document.querySelector("#result").textContent = userInput; 
```

---

## Câu A3 (5đ) — Event Bubbling

**1. Dự đoán output khi chưa comment (Event Bubbling hoạt động):**
Khi click vào button, sự kiện sẽ lan truyền từ phần tử con (nằm trong cùng) nổi bọt lên các phần tử cha chứa nó.
*Output:*
```text
BUTTON
INNER
OUTER
```

**2. Dự đoán output nếu uncomment `e.stopPropagation()`:**
Hàm `stopPropagation()` sẽ chặn đứng quá trình "nổi bọt" ngay tại phần tử hiện tại. Sự kiện không thể lan truyền lên các thẻ `div` cha nữa.
*Output:*
```text
BUTTON
```