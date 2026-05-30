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
# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

## Câu C1 (8đ) — Debug DOM Code

Đoạn code ban đầu chứa rất nhiều lỗi ngớ ngẩn (và cả lỗi logic nguy hiểm). Dưới đây là danh sách **7 lỗi sai** và cách sửa:

1. **Lỗi sai tên Event (Dòng 19):**
   - *Sai:* `addEventListener("onclick", ...)`
   - *Sửa:* Trong `addEventListener`, tên sự kiện không có chữ "on". Phải sửa thành `addEventListener("click", ...)`
2. **Lỗi gán giá trị cho biến DOM (Dòng 25):**
   - *Sai:* `countDisplay = count;`
   - *Sửa:* `countDisplay` đang là một hằng số (`const`) trỏ tới một thẻ HTML, không thể gán bằng một con số. Cần sửa thành `countDisplay.textContent = count;`
3. **Lỗi gọi hàm thiếu ngoặc tròn (Dòng 36):**
   - *Sai:* `item.remove;`
   - *Sửa:* `remove` là một phương thức (method), phải có ngoặc tròn để thực thi: `item.remove();`
4. **Lỗi ép kiểu null khi clear HTML (Dòng 26):**
   - *Sai:* `historyList.innerHTML = null;`
   - *Sửa:* Trình duyệt sẽ ép kiểu `null` thành chuỗi `"null"` và in chữ đó ra màn hình. Để làm rỗng thẻ, phải dùng chuỗi rỗng: `historyList.innerHTML = "";`
5. **Lỗi kiểu dữ liệu khi lấy từ LocalStorage (Dòng 46):**
   - *Sai:* `count = localStorage.getItem("count");`
   - *Sửa:* Dữ liệu lấy từ localStorage **luôn luôn là chuỗi (String)**. Dù code hiện tại dùng `count++` thì JS vẫn ép kiểu ngầm được, nhưng nó là một *bad practice* cực kỳ nguy hiểm. Cần sửa thành: `count = parseInt(localStorage.getItem("count")) || 0;` (thêm `|| 0` để phòng trường hợp user vào web lần đầu, giá trị là `null`).
6. **Lỗi mất dữ liệu hiển thị khi load trang (Dòng 45-48):**
   - *Sai:* Trong sự kiện `load`, tác giả chỉ lấy lại biến `count` mà quên mất không khôi phục lại lịch sử.
   - *Sửa:* Bổ sung thêm dòng: `historyList.innerHTML = localStorage.getItem("history") || "";`
7. **Lỗi bảo mật XSS tiềm ẩn (Dòng 9 & 20):**
   - *Sai:* `countDisplay.innerHTML = count;` 
   - *Sửa:* Dù biến `count` ở đây là số, nhưng thói quen dùng `innerHTML` để in dữ liệu text là không tốt. Nên thay toàn bộ bằng `countDisplay.textContent = count;` để tối ưu hiệu suất và bảo mật.

**Code Refactor hoàn chỉnh:**
```javascript
const countDisplay = document.querySelector(".count");
const historyList = document.getElementById("history");

let count = 0;

document.querySelector("#incrementBtn").addEventListener("click", function() {
    count++;
    countDisplay.textContent = count;
    
    const li = document.createElement("li");
    li.textContent = "Count changed to " + count;
    li.addEventListener("click", function() {
        this.remove(); // Sửa hàm xóa cho gọn, không cần deleteHistory
    });
    historyList.append(li);
});

document.querySelector("#decrementBtn").addEventListener("click", function() { // Đã sửa "onclick"
    count--;
    countDisplay.textContent = count;
});

document.querySelector("#resetBtn").addEventListener("click", () => {
    count = 0;
    countDisplay.textContent = count; // Đã sửa lỗi gán hằng số
    historyList.innerHTML = "";       // Đã sửa null
});

document.querySelector("#clearHistory").addEventListener("click", () => {
    const items = historyList.querySelectorAll("li");
    items.forEach(item => {
        item.remove();                // Đã thêm ngoặc ()
    });
});

window.addEventListener("beforeunload", () => {
    localStorage.setItem("count", count);
    localStorage.setItem("history", historyList.innerHTML);
});

window.addEventListener("load", () => {
    count = parseInt(localStorage.getItem("count")) || 0; // Đã ép kiểu và check null
    countDisplay.textContent = count;
    historyList.innerHTML = localStorage.getItem("history") || ""; // Đã bổ sung khôi phục history
});
```

---

## Câu C2 (7đ) — Performance

**1. Giải thích về Event Binding và Event Delegation:**
* **Tại sao bind 1000 event riêng lẻ là BAD PRACTICE?** Mỗi lần gọi `addEventListener`, trình duyệt phải tạo ra một object lưu trữ trong bộ nhớ (RAM). Nếu tạo 1000 event cho 1000 nút, ứng dụng sẽ ngốn rất nhiều RAM, làm chậm trình duyệt, và cực kỳ dễ gây rò rỉ bộ nhớ (memory leak) nếu ta xóa các thẻ đó đi mà quên không gỡ event (removeEventListener).
* **Event Delegation giải quyết thế nào?** Thay vì gắn 1000 event cho 1000 thẻ con, ta chỉ gắn **MỘT event duy nhất** cho thẻ cha chứa chúng. Dựa vào cơ chế **Event Bubbling** (Sự kiện nổi bọt), khi user click vào một thẻ con bất kỳ, sự kiện sẽ nổi bọt lên thẻ cha. Tại sự kiện của thẻ cha, ta dùng `event.target` để xác định chính xác phần tử con nào vừa bị click và xử lý.

**2. Refactor Code giảm Reflow bằng DocumentFragment:**

```javascript
// Mã Refactor:
const fragment = document.createDocumentFragment(); // 1. Tạo "kho chứa" ảo trong bộ nhớ

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);                      // 2. Nhét dần 1000 thẻ vào kho ảo
}

document.body.appendChild(fragment);                // 3. Đổ 1000 thẻ từ kho ảo ra DOM (1 lần duy nhất)
```

**Giải thích tại sao nhanh hơn:**
* Ở code cũ: Vòng lặp chèn trực tiếp vào `document.body` 1000 lần. Mỗi lần chèn, trình duyệt phải tính toán lại bố cục (Reflow) và vẽ lại màn hình (Repaint). Phải làm việc này 1000 lần sẽ khiến trang web bị giật, lag (đơ giao diện).
* Với `DocumentFragment`: Nó là một vùng nhớ đệm (ảo) không nằm trong cây DOM hiện tại. Ta thoải mái chèn 1000 thẻ vào `fragment` mà trình duyệt không hề hay biết, do đó KHÔNG xảy ra Reflow. Chỉ khi vòng lặp kết thúc, ta mới bê nguyên khối `fragment` đó ụp vào `body` trong một thao tác duy nhất. Kết quả: Trình duyệt chỉ tốn đúng **1 lần Reflow/Repaint**, hiệu năng tăng lên đáng kể!