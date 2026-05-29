
const orderItems = [
    { name: "Phở bò", qty: 2, price: 65000 },
    { name: "Trà đá", qty: 3, price: 5000 },
    { name: "Bún chả", qty: 1, price: 55000 }
];

function generateBill(items, hasTip = true) {
    const subTotal = items.reduce((sum, item) => sum + (item.price * item.qty), 0);  
    let discountPercent = 0;
    if (subTotal > 1000000) {
        discountPercent = 15;
    } else if (subTotal > 500000) {
        discountPercent = 10;
    }
    
    const today = new Date().getDay();
    if (today === 3) {
        discountPercent += 5; 
    }
    
    
    const discountAmount = subTotal * (discountPercent / 100);
    const afterDiscount = subTotal - discountAmount;
    
    const vatAmount = afterDiscount * 0.08; 
    const tipAmount = hasTip ? (afterDiscount * 0.05) : 0; 
    
    const totalToPay = afterDiscount + vatAmount + tipAmount;

    const formatK = (num) => (num / 1000) + 'k';
    const formatVND = (num) => Math.round(num).toLocaleString('vi-VN') + 'đ';
    console.log("╔══════════════════════════════════════╗");
    console.log("║         HÓA ĐƠN NHÀ HÀNG             ║");
    console.log("╠══════════════════════════════════════╣");
    
    items.forEach((item, index) => {
        const stt = `${index + 1}. ${item.name}`.padEnd(16, ' ');
        const qty = `x${item.qty}`.padEnd(6, ' ');
        const price = `@${formatK(item.price)}`.padEnd(6, ' ');
        const total = `= ${formatK(item.price * item.qty)}`.padStart(6, ' ');
        
        console.log(`║ ${stt} ${qty} ${price} ${total}  ║`);
    });

    console.log("╠══════════════════════════════════════╣");
    console.log(`║ Tổng cộng:              ${formatVND(subTotal).padStart(12, ' ')} ║`);
    console.log(`║ Giảm giá (${discountPercent}%):           ${formatVND(discountAmount).padStart(12, ' ')} ║`);
    console.log(`║ VAT (8%):               ${formatVND(vatAmount).padStart(12, ' ')} ║`);
    console.log(`║ Tip (5%):               ${formatVND(tipAmount).padStart(12, ' ')} ║`);
    console.log("╠══════════════════════════════════════╣");
    console.log(`║ THANH TOÁN:             ${formatVND(totalToPay).padStart(12, ' ')} ║`);
    console.log("╚══════════════════════════════════════╝");
}
generateBill(orderItems, true);