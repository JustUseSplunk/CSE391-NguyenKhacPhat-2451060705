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
## PHẦN C — SUY LUẬN (20 điểm)

### Câu C1 (10đ) — Debug JavaScript

Đoạn code trên chứa khá nhiều "mìn" cơ bản của JS. Dưới đây là 6 lỗi và cách khắc phục:

1. **Lỗi logic so sánh (Nghiêm trọng):** - *Code lỗi:* `if (giaSauGiam = 0)`
   - *Giải thích:* Dấu `=` là phép gán, không phải phép so sánh. Lệnh này sẽ ép biến `giaSauGiam` thành `0` (Falsy), khiến khối lệnh `if` không bao giờ chạy, đồng thời làm sai lệch luôn kết quả trả về (hàm luôn trả về 0).
   - *Sửa:* Đổi thành `if (giaSauGiam === 0)`
2. **Lỗi Closure với `var` trong vòng lặp bất đồng bộ (Lỗi ẩn):**
   - *Code lỗi:* `for (var i = 0; i < 5; i++) { setTimeout(...) }`
   - *Giải thích:* Biến `var` có phạm vi function-scope (hoặc global). Vòng lặp `for` chạy rất nhanh và kết thúc khiến `i` đạt giá trị 5. Lúc này, 5 hàm `setTimeout` (bị delay 1s) mới bắt đầu chạy và cùng trỏ về vùng nhớ của biến `i` duy nhất đó, dẫn đến việc in ra "Item 5" liên tục 5 lần.
   - *Sửa:* Đổi `var i` thành `let i`. Biến `let` có block-scope, ở mỗi vòng lặp nó sẽ tạo ra một vùng nhớ `i` hoàn toàn mới và độc lập, giúp `setTimeout` ghi nhớ đúng giá trị của từng vòng (0, 1, 2, 3, 4).
3. **Lỗi truyền sai kiểu dữ liệu:**
   - *Code lỗi:* `tinhGiaGiamGia("100000", 20)`
   - *Giải thích:* Truyền chuỗi `"100000"` vào tham số toán học. Dù JS có cơ chế ép kiểu ngầm định (Type Coercion) giúp phép nhân/trừ vẫn chạy được, nhưng đây là một thói quen code rất xấu và dễ gây bug (nếu dùng phép `+` nó sẽ biến thành nối chuỗi).
   - *Sửa:* Truyền dạng số thực: `tinhGiaGiamGia(100000, 20)`.
4. **Lạm dụng từ khóa khai báo biến:**
   - *Code lỗi:* `var giamGia` và `let giaSauGiam`
   - *Giải thích:* JS hiện đại không khuyến khích dùng `var`. Ngoài ra, cả `giamGia` và `giaSauGiam` đều không bị gán lại giá trị ở bất cứ đâu sau khi khởi tạo.
   - *Sửa:* Nên dùng `const` cho cả hai biến này để đảm bảo tính bất biến (immutable).
5. **Thiếu kiểm tra tính hợp lệ của tham số `giaBan`:**
   - *Giải thích:* Hàm chỉ kiểm tra `phanTramGiam` mà quên kiểm tra `giaBan`. Nếu user truyền số âm (`-500`) hoặc truyền chữ (`"abc"`), hàm sẽ tính toán ra NaN hoặc số âm vô lý.
   - *Sửa:* Thêm logic kiểm tra: `if (typeof giaBan !== 'number' || giaBan < 0) return "Giá bán không hợp lệ";`
6. **Không đồng nhất kiểu dữ liệu trả về (Inconsistent Return Type):**
   - *Giải thích:* Nếu lỗi, hàm return về một Chuỗi (`String`). Nếu đúng, hàm return về một Số (`Number`). Điều này làm khó người gọi hàm vì họ không biết phải xử lý kiểu dữ liệu nào.
   - *Sửa:* Nên `throw new Error("...")` khi có lỗi, hoặc return `null`/`-1`.

**Code hoàn thiện sau khi sửa:**
```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (typeof giaBan !== 'number' || giaBan < 0) throw new Error("Giá bán không hợp lệ");
    if (typeof phanTramGiam !== 'number' || phanTramGiam < 0 || phanTramGiam > 100) throw new Error("Phần trăm giảm không hợp lệ");
    
    const giamGia = (giaBan * phanTramGiam) / 100;
    const giaSauGiam = giaBan - giamGia;
    
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    return giaSauGiam;
}

// Test vòng lặp bất đồng bộ
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}
```