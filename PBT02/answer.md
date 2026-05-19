# TRẢ LỜI PHIẾU BÀI TẬP 02
**Họ và tên:** [Nguyễn Khắc Phát]
**Mã SV:** [2451060705]

---

## PHẦN A — KIỂM TRA ĐỌC HIỂU
### Câu A1 - Input Types
**Trả lời:**
1. type="email" → Ô nhập văn bản, tự động kiểm tra xem có chứa ký tự @ và đúng định dạng email không. → Dùng cho trường nhập email đăng nhập/đăng ký.

2. type="password" → Ô nhập văn bản bị che khuất (dấu chấm hoặc sao), không có validation tự động. → Dùng cho ô nhập mật khẩu bảo mật.

3. type="number" → Ô nhập có nút tăng/giảm (spinner), tự động giới hạn chỉ cho phép nhập số (có thể kết hợp min/max/step). → Dùng để chọn số lượng sản phẩm muốn mua trong giỏ hàng.

4. type="tel" → Ô nhập văn bản thông thường (mở bàn phím số trên thiết bị di động), không tự động validate định dạng (do số điện thoại các quốc gia khác nhau). → Dùng cho ô nhập số điện thoại giao hàng.

5. type="date" → Mở công cụ chọn lịch (Date picker), tự động kiểm tra ngày hợp lệ. → Dùng để người dùng chọn ngày giao hàng hoặc ngày sinh.

6. type="search" → Ô nhập văn bản thường có thêm nút "X" để xóa nhanh nội dung (tùy trình duyệt). → Dùng cho thanh tìm kiếm sản phẩm trên web.

7. type="url" → Ô nhập văn bản, tự động kiểm tra xem có đúng định dạng URL tuyệt đối (bắt đầu bằng http:// hoặc https://) hay không. → Dùng cho ô nhập link website hoặc link mạng xã hội của nhà bán hàng.

8. type="color" → Mở bảng chọn màu sắc, tự động validate theo mã màu Hex. → Dùng để người mua chọn màu sắc tùy chỉnh cho sản phẩm (ví dụ: in áo thun theo màu yêu cầu).

9. type="checkbox" → Ô đánh dấu chọn/hủy chọn, tự kiểm tra xem đã được tích hay chưa (nếu dùng thuộc tính required). → Dùng cho mục "Đồng ý với điều khoản sử dụng".

10. type="radio" → Nút tròn chọn 1 trong nhiều lựa chọn, validate bắt buộc chọn 1 nhóm (nếu có required). → Dùng để chọn phương thức thanh toán (COD, thẻ tín dụng, ví điện tử).
### Câu A2 - Validation Attributes
**Trả lời:**
Trường hợp 1: (required để trống): Form bị chặn lại. Trình duyệt sẽ hiện thông báo dạng "Please fill out this field" (Vui lòng điền vào trường này) vì thuộc tính required bắt buộc input phải có dữ liệu.

Trường hợp 2: (email nhập "abc"): Form bị chặn lại. Trình duyệt thông báo "Please include an '@' in the email address" vì dữ liệu không đúng chuẩn định dạng email của HTML5.

Trường hợp 3: (number nhập 15, max 10): Form bị chặn lại. Trình duyệt thông báo "Value must be less than or equal to 10" vì giá trị 15 vượt quá giới hạn thuộc tính max="10".

Trường hợp 4: (pattern="[0-9]{10}" nhập "abc123"): Form bị chặn lại. Trình duyệt thông báo "Please match the requested format". Pattern yêu cầu chuỗi phải chứa chính xác 10 chữ số, nhưng user nhập chuỗi 6 ký tự và có chứa chữ cái.

Trường hợp 5: (minlength="8" nhập "123"): Form bị chặn lại. Trình duyệt thông báo dạng "Please lengthen this text to 8 characters or more". Do chuỗi "123" chỉ có 3 ký tự, không đạt đủ độ dài tối thiểu là 8.
### Câu A3 - Accecssibility
**Trả lời:**
1. Thuộc tính for liên kết nhãn với id của input. Khi input được người khiếm thị focus, trình đọc màn hình (screen reader) sẽ đọc to nội dung của <label>, giúp họ biết chính xác ô này cần nhập gì. Ngoài ra, nó còn mở rộng vùng click chuột.
2. Được sử dụng khi cần nhóm nhiều input liên quan lại với nhau về mặt logic trong một form.
Ví dụ: Form thanh toán có nhóm "Thông tin thẻ tín dụng" chứa Số thẻ, Tên in trên thẻ, Ngày hết hạn. Các ô này nên được bọc trong <fieldset> và <legend>Thông tin thẻ tín dụng</legend>.
3. Dùng aria-label cho những phần tử tương tác (như nút bấm) nhưng lại không có text hiển thị trên màn hình. Ví dụ: Một nút "Tìm kiếm" chỉ hiển thị icon cái kính lúp.

KHÔNG nên dùng khi đã có <label> hợp lệ vì nó gây ra sự dư thừa. Đôi khi aria-label sẽ ghi đè nội dung của <label> gốc, làm hệ thống screen reader đọc sai hoặc đọc trùng lặp gây khó chịu cho người dùng.
### Câu A4 - Media
**Trả lời:**
1. Cải thiện: Trì hoãn việc tải hình ảnh (hoặc iframe) cho đến khi người dùng cuộn chuột gần đến vị trí của nó. Giúp trang web tải ban đầu nhanh hơn và tiết kiệm băng thông.

Khi không nên dùng: KHÔNG dùng cho những hình ảnh nằm "above the fold" (những ảnh hiển thị ngay trên màn hình đầu tiên khi vừa vào web, ví dụ: banner chính, logo) vì nó sẽ làm ảnh đó hiển thị chậm lại một nhịp.
2. Nên cung cấp nhiều source vì mỗi trình duyệt (Chrome, Safari, Firefox) hỗ trợ giải mã các định dạng video khác nhau. Trình duyệt sẽ đọc từ trên xuống dưới và phát định dạng đầu tiên nó hỗ trợ.

3 format phổ biến: MP4 (H.264), WebM, Ogg.
3. Cung cấp văn bản thay thế nếu hình ảnh bị lỗi không tải được, đồng thời giúp công cụ tìm kiếm (SEO) và trình đọc màn hình hiểu nội dung ảnh.

Ảnh sản phẩm iPhone 16: alt="Điện thoại Apple iPhone 16 Pro màu xám titan"

Ảnh trang trí: alt="" (Để chuỗi rỗng để trình đọc màn hình bỏ qua nó).

Ảnh biểu đồ: alt="Biểu đồ cột biểu diễn doanh thu quý 1 năm 2026 tăng trưởng 15%"
### Câu A5 - So sánh <figure> và <img>
**Trả lời:**
Cách 1 (<img>): Dùng khi hình ảnh đóng vai trò phụ trợ, nằm xen kẽ trực tiếp trong luồng nội dung và không cần một chú thích đi kèm nào.

Ví dụ 1: Biểu tượng icon mạng xã hội ở phần footer.

Ví dụ 2: Hình ảnh avatar của người dùng ở góc phải màn hình.

Cách 2 (<figure>): Dùng khi hình ảnh (hoặc biểu đồ, đoạn code) tạo thành một khối thông tin độc lập, có giá trị giải nghĩa cao và thường đi kèm với chú thích (<figcaption>).

Ví dụ 1: Một ảnh sản phẩm e-commerce kèm theo tên sản phẩm và giá bán nằm dưới dưới dạng chú thích.

Ví dụ 2: Một biểu đồ kỹ thuật minh họa cho bài viết phân tích, có caption ghi "Hình 1: Biểu đồ kiến trúc mạng".
## PHẦN C - PHÂN TÍCH SUY LUẬN
### Câu C1 - Debug Form
**Trả lời:**
Lỗi 1: Dòng "Tên: <input type="text">" — Input không có <label for="...">, thiếu thuộc tính id và name, vi phạm accessibility và không gửi được dữ liệu.
Sửa: <label for="name">Tên:</label> <input type="text" id="name" name="name">

Lỗi 2: Dòng "<input type="email" placeholder="Email của bạn">" — Sử dụng placeholder thay cho <label> là sai chuẩn accessibility. Thiếu id và name.
Sửa: <label for="email">Email của bạn:</label> <input type="email" id="email" name="email" placeholder="Nhập email">

Lỗi 3: Dòng "<input type="password" placeholder="Mật khẩu">" — Thiếu <label>, thiếu id và name.
Sửa: <label for="pwd">Mật khẩu:</label> <input type="password" id="pwd" name="pwd">

Lỗi 4: Dòng "<input type="password" placeholder="Nhập lại mật khẩu">" — Tương tự, thiếu <label>, thiếu id và name.
Sửa: <label for="confirm_pwd">Nhập lại mật khẩu:</label> <input type="password" id="confirm_pwd" name="confirm_pwd">

Lỗi 5: Dòng "Phone: <input type="text" value="0901234567">" — Số điện thoại đang dùng type="text" thay vì type="tel". Thiếu <label>, id, name.
Sửa: <label for="phone">Phone:</label> <input type="tel" id="phone" name="phone" value="0901234567">

Lỗi 6: Dòng "<select>" — Thẻ select đang bị bỏ lơ, không có <label> đi kèm và thiếu thuộc tính id, name.
Sửa: <label for="city">Thành phố:</label> <select id="city" name="city">...</select>

Lỗi 7: Dòng "<option>Hà Nội</option>..." — Các thẻ option không có thuộc tính value. Khi submit, máy chủ sẽ không nhận được dữ liệu chuẩn hóa.
Sửa: <option value="HN">Hà Nội</option> <option value="HCM">TP.HCM</option>

Lỗi 8: Dòng "<label>Tôi đồng ý điều khoản</label>" — Thẻ label đang bao bọc text nhưng lại không chứa hoặc không tham chiếu tới một input type="checkbox" nào cả. Nút submit bên dưới cũng đang dùng thẻ <input> (không tối ưu bằng <button>).
Sửa: <label><input type="checkbox" name="terms" required> Tôi đồng ý điều khoản</label>
### Câu C2 - Thiết kế chiến lược Validation
**Trả lời:**
1. Pattern Regex:

CMND/CCCD (đúng 12 chữ số): pattern="[0-9]{12}"
Số tài khoản (10-15 chữ số): pattern="[0-9]{10,15}"
2. HTML5 validation đủ an toàn cho ứng dụng ngân hàng chưa? Tại sao?
KHÔNG đủ an toàn. HTML5 validation chỉ là kiểm tra ở phía Frontend (Client-side) nhằm mục đích nâng cao trải nghiệm người dùng (UX), giúp họ sửa lỗi ngay lập tức. Kẻ xấu có thể dễ dàng vô hiệu hóa hoặc vượt qua validation này bằng cách chỉnh sửa mã nguồn DOM qua DevTools, hoặc gửi trực tiếp HTTP request (dùng Postman, cURL) thẳng lên máy chủ mà không qua trình duyệt.
3. 3 loại validation mà HTML5 KHÔNG THỂ làm được (phải dùng JS/Backend):

So sánh 2 trường dữ liệu: Ví dụ như kiểm tra xem ô "Xác nhận mật khẩu" có khớp chính xác với ô "Mật khẩu" không.

Kiểm tra tính duy nhất (Logic phía hệ thống): Kiểm tra xem Email, Số CMND, hoặc Username này đã được người khác đăng ký trong cơ sở dữ liệu trước đó hay chưa.

Xác thực điều kiện phức tạp (Cross-field validation): Ví dụ: Nếu chọn phương thức thanh toán là "Thẻ tín dụng" thì mới hiển thị và bắt buộc nhập "Số thẻ", nếu chọn COD thì ô số thẻ không bị bắt buộc.
4. 2 rủi ro bảo mật nếu chỉ validate Frontend mà không validate Backend:

Bị tấn công Injection: Kẻ gian bypass frontend và đẩy các đoạn mã độc hại (SQL Injection, Cross-Site Scripting - XSS) trực tiếp vào Database, gây đánh cắp hoặc mất mát dữ liệu toàn bộ hệ thống.

Lưu trữ dữ liệu rác/sai logic: Kẻ tấn công cố tình gửi lên tuổi âm, số dư ngân hàng âm, hoặc sai định dạng. Server không kiểm tra và lưu thẳng vào hệ thống, dẫn đến lỗi crash app diện rộng khi các chức năng khác cố gắng xử lý đống dữ liệu sai lệch này.
### PHẦN B - THỰC HÀNH CODE
### Câu B1
**Trả lời:**
Tại sao HTML không thể validate "Confirm Password"?

HTML5 validation (required, pattern, minlength,...) chỉ hoạt động trên từng trường dữ liệu độc lập. Nó kiểm tra xem giá trị của ô đó có khớp với một quy tắc tĩnh (Regex hoặc độ dài) hay không.

Việc xác nhận mật khẩu yêu cầu so sánh giá trị của hai trường khác nhau (password vs confirm_password). Đây là logic "so sánh chéo" (Cross-field validation), mà HTML thuần không có thuộc tính nào để tham chiếu giá trị của ô này sang ô kia. Để thực hiện việc này, chúng ta bắt buộc phải dùng JavaScript (sử dụng hàm setCustomValidity()) hoặc kiểm tra ở phía Server-side.