const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];
function getInStock(products) {
    return products.filter(p => p.stock > 0);
}
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(p => 
        p.category === category && 
        p.price >= minPrice && 
        p.price <= maxPrice
    );
}

function sortByPrice(products, order = "asc") {
    return [...products].sort((a, b) => {
        return order === "asc" ? a.price - b.price : b.price - a.price;
    });
}

function cheapestByCategory(products) {
    return products.reduce((acc, p) => {
        if (!acc[p.category] || p.price < acc[p.category].price) {
            acc[p.category] = p;
        }
        return acc;
    }, {});
}
function totalInventoryValue(products) {
    return products.reduce((sum, p) => sum + (p.price * p.stock), 0);
}

function formatProductList(products) {
    return products.map(p => ({
        name: p.name,
        formattedPrice: p.price.toLocaleString("vi-VN") + "đ"
    }));
}
function averageRating(products) {
    if (products.length === 0) return 0;
    const totalRating = products.reduce((sum, p) => sum + p.rating, 0);
    return Number((totalRating / products.length).toFixed(1));
}

function searchProducts(products, keyword) {
    const lowerKey = keyword.toLowerCase();
    return products.filter(p => p.name.toLowerCase().includes(lowerKey));
}

function findFirstProductByKeyword(products, keyword) {
    const lowerKey = keyword.toLowerCase();
    return products.find(p => p.name.toLowerCase().includes(lowerKey));
}



console.log("=== IN-STOCK PRODUCTS ===");
console.log(getInStock(products));

console.log("\n=== PHONES 15-25 TRIỆU ===");
console.log(filterProducts(products, "phone", 15000000, 25000000));

console.log("\n=== CHEAPEST BY CATEGORY ===");
console.log(cheapestByCategory(products));

console.log("\n=== TOTAL INVENTORY VALUE ===");
console.log(totalInventoryValue(products).toLocaleString("vi-VN") + "đ");

console.log("\n=== TÌM KIẾM KEYWORD 'pro' ===");
console.log(searchProducts(products, "pro"));

console.log("\n=== DÙNG 'FIND' TÌM SẢN PHẨM ===");
console.log(findFirstProductByKeyword(products, "XPS"));