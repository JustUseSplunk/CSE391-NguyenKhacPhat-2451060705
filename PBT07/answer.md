## PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

### Câu A1 (5đ) — var / let / const (Dự đoán)

1. **Đoạn 1 (`var`):** In ra `undefined`. 
   * *Giải thích:* Do cơ chế **Hoisting**, JS đưa phần khai báo (`var x`) lên đầu scope, nhưng giữ nguyên phần gán (`= 5`) ở vị trí cũ. Nên lúc `console.log`, biến `x` đã tồn tại nhưng chưa có giá trị.
2. **Đoạn 2 (`let`):** Lỗi `ReferenceError: Cannot access 'y' before initialization`. 
   * *Giải thích:* Biến `let` cũng bị hoisting, nhưng nó nằm trong **Temporal Dead Zone (TDZ)** — vùng an toàn cấm truy cập cho đến khi dòng gán giá trị được chạy.
3. **Đoạn 3 (`const`):** Lỗi `TypeError: Assignment to constant variable`. 
   * *Giải thích:* `const` là hằng số, không thể gán lại giá trị mới bằng toán tử `=`.
4. **Đoạn 4 (Mảng `const`):** In ra `[1, 2, 3, 4]`. 
   * *Giải thích (Bất ngờ):* `const` chỉ khóa việc "gán lại" (re-assignment) vùng nhớ, chứ không khóa "sự thay đổi bên trong" (mutation) của Object/Array. Gọi hàm `.push()` để sửa ruột mảng là hoàn toàn hợp lệ.
5. **Đoạn 5 (Block scope):** In ra `"Trong block: 2"`, sau đó in `"Ngoài block: 1"`.
   * *Giải thích:* `let` và `const` có tính chất **Block Scope** (phạm vi trong cặp ngoặc nhọn `{}`). Biến `a` bên trong là một biến hoàn toàn khác, không đè lên biến `a` bên ngoài.

---

### Câu A2 (5đ) — Data Types & Coercion

**1. Dự đoán kết quả:**
```javascript
console.log(typeof null);      // "object" (Đây là một lỗi lịch sử của JS)
console.log(typeof undefined); // "undefined"
console.log(typeof NaN);       // "number" (Kỳ lạ nhưng Not-a-Number lại mang kiểu số)
console.log("5" + 3);          // "53"
console.log("5" - 3);          // 2
console.log("5" * "3");        // 15
console.log(true + true);      // 2 (true bị ép thành 1)
console.log([] + []);          // "" (Mảng rỗng ép thành chuỗi rỗng "")
console.log([] + {});          // "[object Object]"
console.log({} + []);          // 0 hoặc "[object Object]" (Tùy ngữ cảnh chạy console, {} bị hiểu là block code rỗng)
```

**2. Giải thích `"5" + 3` và `"5" - 3`:**
* Khi dùng dấu cộng `+`: Nếu có **ít nhất một toán hạng là Chuỗi (String)**, JavaScript sẽ ưu tiên biến toán hạng còn lại thành chuỗi và thực hiện phép **nối chuỗi** (String Concatenation). Do đó `"5" + "3" = "53"`.
* Khi dùng các dấu `-`, `*`, `/`: Các phép toán này chỉ dành cho số học. JavaScript sẽ tự động **ép kiểu (Type Coercion)** chuỗi `"5"` thành số `5` rồi thực hiện phép tính bình thường.

---

### Câu A3 (5đ) — So sánh == vs ===

**1. Dự đoán:**
```javascript
console.log(5 == "5");            // true (Ép kiểu chuỗi thành số rồi so sánh)
console.log(5 === "5");           // false (Khác kiểu dữ liệu: number vs string)
console.log(null == undefined);   // true (Luật đặc biệt của JS)
console.log(null === undefined);  // false (Khác kiểu dữ liệu)
console.log(NaN == NaN);          // false (Luật: NaN KHÔNG BAO GIỜ bằng bất cứ thứ gì, kể cả chính nó)
console.log(0 == false);          // true (false bị ép thành 0)
console.log(0 === false);         // false
console.log("" == false);         // true ("" ép thành 0, false ép thành 0)
```

**2. Quy tắc:**
Từ giờ trở đi **LUÔN LUÔN dùng `===` (Strict Equality)**.
* *Tại sao?* Vì `==` (Loose Equality) tự động ép kiểu ngầm định, sinh ra những logic cực kỳ kỳ quặc (như `"" == false`) dễ dẫn đến bug tiềm ẩn, khó debug. `===` so sánh cả giá trị lẫn kiểu dữ liệu nên an toàn tuyệt đối.

---

### Câu A4 (5đ) — Truthy & Falsy

**1. 8 giá trị Falsy trong JS:**
1. `false`
2. `0`
3. `-0`
4. `0n` (BigInt zero)
5. `""` (Chuỗi rỗng)
6. `null`
7. `undefined`
8. `NaN`
*(Mọi giá trị khác ngoài 8 giá trị này đều là Truthy).*

**2. Dự đoán:**
```javascript
if ("0") console.log("A");       // In "A" ("0" là chuỗi khác rỗng -> Truthy)
if ("") console.log("B");        // KHÔNG in (Chuỗi rỗng -> Falsy)
if ([]) console.log("C");        // In "C" (Array rỗng vẫn là 1 Object -> Truthy)
if ({}) console.log("D");        // In "D" (Object rỗng -> Truthy)
if (null) console.log("E");      // KHÔNG in (Falsy)
if (0) console.log("F");         // KHÔNG in (Falsy)
if (-1) console.log("G");        // In "G" (Số khác 0 -> Truthy)
if (" ") console.log("H");       // In "H" (Chuỗi có chứa dấu cách không phải rỗng -> Truthy)
```

---

### Câu A5 (5đ) — Template Literals

**Viết lại bằng Backtick và nội suy biến:**

```javascript
// Cách 1:
var greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2:
var url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3: 
var html = `
    <div class="card">
        <h2>${title}</h2>
        <p>${description}</p>
        <span>Giá: ${price}đ</span>
    </div>
`;
```