# PHẦN A — KIỂM TRA ĐỌC HIỂU (20 điểm)

## Câu A1 (5đ) — Function Declaration vs Expression vs Arrow

**1. Viết hàm theo 3 cách:**

```javascript
// 1. Function Declaration
function tinhThueBaoHiemDecl(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
}

// 2. Function Expression
const tinhThueBaoHiemExpr = function(luong) {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};

// 3. Arrow Function
const tinhThueBaoHiemArrow = (luong) => {
    const thue = luong > 11000000 ? luong * 0.1 : 0;
    return { thue, thuc_nhan: luong - thue };
};
```

**2. Giải thích sự khác nhau về Hoisting:**
Sự khác biệt lớn nhất nằm ở cách Javascript đưa các khai báo này lên đầu phạm vi (Hoisting).

- **Function Declaration:** Được hoisting toàn bộ cả tên hàm và nội dung. Bạn có thể gọi hàm trước khi khai báo nó.
- **Function Expression & Arrow Function (dùng `let` hoặc `const`):** Chỉ hoisting phần tên biến, nhưng nằm trong "vùng chết tạm thời" (Temporal Dead Zone) cho đến khi được gán giá trị. Nếu gọi trước khi khai báo sẽ văng lỗi `ReferenceError`.

**Ví dụ Code chứng minh:**
```javascript
// ✅ Chạy bình thường
console.log(demoDeclaration()); 
function demoDeclaration() { return "Hello"; }

// ❌ Lỗi: ReferenceError: Cannot access 'demoArrow' before initialization
console.log(demoArrow()); 
const demoArrow = () => "Hello";
```

---

## Câu A2 (5đ) — Scope & Closure

**1. Dự đoán output Đoạn 1:**
```javascript
console.log(c.increment());  // 1
console.log(c.increment());  // 2
console.log(c.increment());  // 3
console.log(c.decrement());  // 2
console.log(c.getCount());   // 2
```

**2. Dự đoán output Đoạn 2 (sau 200ms):**
```javascript
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2
```

**3. Giải thích chi tiết sự khác biệt giữa `var` và `let`:**
- **Đối với `var`:** Từ khóa `var` có phạm vi function (function scope), không có phạm vi block (block scope). Do đó, chỉ có một biến `i` duy nhất tồn tại trong bộ nhớ. Khi vòng lặp chạy xong rất nhanh, `i` đã tăng lên giá trị `3`. Khi các hàm `setTimeout` (được đưa vào Web API và đợi chạy sau) thực thi, chúng đều tham chiếu đến cùng một biến `i` hiện tại đang mang giá trị `3`.
- **Đối với `let`:** Từ khóa `let` có phạm vi block (block scope). Cứ mỗi lần lặp, một môi trường (lexical environment) hoàn toàn mới được tạo ra cho biến `j`. Các hàm callback trong `setTimeout` lúc này "đóng gói" (closure) chính xác biến `j` riêng biệt của từng vòng lặp đó (0, 1, 2) và in ra kết quả tương ứng.

---

## Câu A3 (5đ) — Array Methods

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 1. Lấy các số chẵn
const evens = nums.filter(n => n % 2 === 0);

// 2. Nhân mỗi số với 3
const multiplied = nums.map(n => n * 3);

// 3. Tính tổng tất cả
const sum = nums.reduce((acc, curr) => acc + curr, 0);

// 4. Tìm số đầu tiên > 7
const firstOver7 = nums.find(n => n > 7);

// 5. Kiểm tra CÓ số > 10 không
const hasOver10 = nums.some(n => n > 10);

// 6. Kiểm tra TẤT CẢ đều > 0
const allPositive = nums.every(n => n > 0);

// 7. Tạo mảng "Số X là [chẵn/lẻ]"
const parityStrings = nums.map(n => `Số ${n} là ${n % 2 === 0 ? 'chẵn' : 'lẻ'}`);

// 8. Đảo ngược mảng (không mutate gốc)
const reversed = [...nums].reverse();
```

---

## Câu A4 (5đ) — Object Destructuring & Spread

**Dự đoán output:**

```javascript
// --- Destructuring ---
console.log(name, price, ram, color);  
// Output: iPhone 16 25990000 8 Titan

console.log(specs);                      
// Output: ReferenceError: specs is not defined
// (Vì specs chỉ đóng vai trò là đường dẫn để bóc tách ram và color ở cấp sâu hơn, nó không được khởi tạo thành một biến riêng biệt)

// --- Spread ---
console.log(updated.price);            
// Output: 23990000 (Đã bị ghi đè thuộc tính price)

console.log(updated.sale);             
// Output: true (Thuộc tính mới được thêm vào)

console.log(product.price);            
// Output: 25990000 (Object gốc không bị ảnh hưởng bởi phép gán của updated)

// --- Spread gotcha ---
console.log(product.specs.ram);        
// Output: 16
// Giải thích: Toán tử spread (...) chỉ thực hiện sao chép nông (Shallow Copy). Thuộc tính `specs` mang giá trị là một object (tham chiếu). Khi copy, `copy.specs` và `product.specs` cùng trỏ chung đến một vùng nhớ. Do đó, việc thay đổi dữ liệu bên trong `copy.specs` sẽ làm biến đổi luôn cả `product.specs` ở object gốc.
```
# PHẦN C — SUY LUẬN (20 điểm)

## Câu C1 (10đ) — Refactor Code

Đoạn code ban đầu sử dụng vòng lặp `for` lồng nhau, khai báo biến bằng `var` và thực hiện thuật toán sắp xếp nổi bọt (bubble sort) thủ công, khiến code dài dòng và khó đọc. 

Dưới đây là bản refactor (dưới 10 dòng) sử dụng Array methods, Arrow functions và Destructuring:

```javascript
const processOrders = (orders) => orders
    .filter(({ status, total }) => status === "completed" && total > 100000)
    .map(({ id, customer, total }) => {
        const discount = total * 0.1;
        return { id, customer, total, discount, finalTotal: total - discount };
    })
    .sort((a, b) => b.finalTotal - a.finalTotal);
```

**Giải thích:**
1. **`.filter()`**: Dùng destructuring để lấy trực tiếp `status` và `total` từ mỗi order, lọc ra các đơn "completed" và có giá trị > 100000.
2. **`.map()`**: Biến đổi mảng đã lọc thành mảng object mới chứa các thuộc tính cần thiết, tính toán `discount` và `finalTotal`.
3. **`.sort()`**: Sắp xếp mảng giảm dần dựa trên thuộc tính `finalTotal` (b - a).

---

## Câu C2 (10đ) — Thiết kế API

Để tự mô phỏng lại các hàm `map`, `filter`, `reduce`, chúng ta sẽ sử dụng vòng lặp `for` cơ bản để duyệt qua mảng và gọi hàm callback (`fn`) mà người dùng truyền vào.

```javascript
const miniArray = {
    map(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Đẩy kết quả của hàm callback vào mảng mới
            result.push(fn(arr[i], i, arr));
        }
        return result;
    },
    
    filter(arr, fn) {
        const result = [];
        for (let i = 0; i < arr.length; i++) {
            // Nếu callback trả về true (truthy), giữ lại phần tử đó
            if (fn(arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    },
    
    reduce(arr, fn, initialValue) {
        // Nếu không có initialValue, lấy phần tử đầu tiên làm giá trị khởi tạo
        let accumulator = initialValue !== undefined ? initialValue : arr[0];
        // Nếu có initialValue thì lặp từ index 0, nếu không thì lặp từ index 1
        let startIndex = initialValue !== undefined ? 0 : 1;
        
        for (let i = startIndex; i < arr.length; i++) {
            // Cập nhật accumulator sau mỗi lần gọi callback
            accumulator = fn(accumulator, arr[i], i, arr);
        }
        return accumulator;
    }
};

// === KIỂM TRA LẠI VỚI TEST CASE ĐỀ BÀI ===
console.log(miniArray.map([1, 2, 3], x => x * 2));          
// Kết quả: [2, 4, 6]

console.log(miniArray.filter([1, 2, 3, 4], x => x > 2));    
// Kết quả: [3, 4]

console.log(miniArray.reduce([1, 2, 3, 4], (a, b) => a + b, 0)); 
// Kết quả: 10
```