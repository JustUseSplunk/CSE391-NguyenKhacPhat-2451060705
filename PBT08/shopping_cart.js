function createCart() {
    let items = [];
    let currentDiscountCode = null;

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        updateQuantity(productId, newQuantity) {
            const item = items.find(i => i.id === productId);
            if (item) {
                if (newQuantity > 0) {
                    item.quantity = newQuantity;
                } else {
                    this.removeItem(productId);
                }
            }
        },
        getTotal() {
            return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        },
        applyDiscount(code) {
            const validCodes = ["SALE10", "SALE20", "FREESHIP"];
            if (validCodes.includes(code)) {
                currentDiscountCode = code;
            } else {
                console.log("Mã giảm giá không hợp lệ!");
            }
        },
        getFinalTotal() {
            const total = this.getTotal();
            if (currentDiscountCode === "SALE10") return total * 0.9;
            if (currentDiscountCode === "SALE20") return total * 0.8;
            if (currentDiscountCode === "FREESHIP") return total > 30000 ? total - 30000 : 0;
            return total;
        },
        printCart() {
            if (items.length === 0) {
                console.log("Giỏ hàng đang trống!");
                return;
            }

            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            
            items.forEach((item, index) => {
                const stt = (index + 1).toString().padEnd(1);
                const name = item.name.padEnd(13);
                const qty = item.quantity.toString().padStart(2);
                const price = item.price.toLocaleString("vi-VN").padStart(11);
                const total = (item.price * item.quantity).toLocaleString("vi-VN").padStart(11);
                
                console.log(`│ ${stt} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });
            
            console.log("├──────────────────────────────────────────────┤");
            
            const rawTotal = this.getTotal();
            const finalTotal = this.getFinalTotal();
            let footerText = "";

            if (currentDiscountCode && rawTotal !== finalTotal) {
                const discountNote = currentDiscountCode === "SALE10" ? "giảm 10%" :
                                     currentDiscountCode === "SALE20" ? "giảm 20%" : "trừ 30k ship";
                footerText = `Tổng: ${finalTotal.toLocaleString("vi-VN")}đ (${discountNote})`;
            } else {
                footerText = `Tổng cộng: ${rawTotal.toLocaleString("vi-VN")}đ`;
            }
            console.log(`│ ${footerText.padStart(44)} │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        clearCart() {
            items = [];
            currentDiscountCode = null;
        }
    };
}
const cart = createCart();

cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); 

cart.printCart();

console.log("\n--- ÁP DỤNG MÃ GIẢM GIÁ ---");
cart.applyDiscount("SALE10");
cart.printCart();

console.log("\nSố SP:", cart.getItemCount()); 
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); 