const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200x200?text=iPhone+16", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro M3", price: 45990000, category: "laptop", image: "https://placehold.co/200x200?text=MacBook+Pro", rating: 4.8, inStock: true },
    { id: 3, name: "AirPods Pro 2", price: 6990000, category: "accessory", image: "https://placehold.co/200x200?text=AirPods+Pro", rating: 4.3, inStock: true },
    { id: 4, name: "iPad Air 5", price: 16990000, category: "tablet", image: "https://placehold.co/200x200?text=iPad+Air", rating: 4.6, inStock: false },
    { id: 5, name: "Samsung S24 Ultra", price: 31990000, category: "phone", image: "https://placehold.co/200x200?text=Samsung+S24", rating: 4.7, inStock: true },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200x200?text=Dell+XPS", rating: 4.5, inStock: true },
    { id: 7, name: "Galaxy Buds 2", price: 2490000, category: "accessory", image: "https://placehold.co/200x200?text=Galaxy+Buds", rating: 4.1, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/200x200?text=Xiaomi+Pad", rating: 4.2, inStock: true },
    { id: 9, name: "Pixel 8 Pro", price: 21990000, category: "phone", image: "https://placehold.co/200x200?text=Pixel+8", rating: 4.4, inStock: true },
    { id: 10, name: "ThinkPad X1", price: 38990000, category: "laptop", image: "https://placehold.co/200x200?text=ThinkPad", rating: 4.6, inStock: false },
    { id: 11, name: "Apple Pencil 2", price: 2990000, category: "accessory", image: "https://placehold.co/200x200?text=Apple+Pencil", rating: 4.8, inStock: true },
    { id: 12, name: "Surface Pro 9", price: 25990000, category: "tablet", image: "https://placehold.co/200x200?text=Surface+Pro", rating: 4.3, inStock: true }
];
let currentProducts = [...products];
let cartCount = 0;
const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");
const sortSelect = document.getElementById("sortSelect");
const cartBadge = document.getElementById("cartBadge");
const darkModeToggle = document.getElementById("darkModeToggle");
const modal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");


function renderProducts(productsToRender) {
    productGrid.innerHTML = "";
    
    if (productsToRender.length === 0) {
        productGrid.innerHTML = "<p>Không tìm thấy sản phẩm nào.</p>";
        return;
    }

    const fragment = document.createDocumentFragment();

    productsToRender.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.addEventListener("click", () => showModal(product));
        const img = document.createElement("img");
        img.src = product.image;
        img.alt = product.name;
        const title = document.createElement("h3");
        title.textContent = product.name;
        const price = document.createElement("p");
        price.className = "price";
        const rating = document.createElement("p");
        rating.textContent = `⭐ ${product.rating} / 5.0`;
        const stock = document.createElement("p");
        stock.textContent = product.inStock ? "✅ Còn hàng" : "❌ Hết hàng";
        stock.style.color = product.inStock ? "green" : "red";
        const addBtn = document.createElement("button");
        addBtn.className = "add-to-cart";
        addBtn.textContent = "Thêm vào giỏ";
        addBtn.disabled = !product.inStock;
        if (!product.inStock) addBtn.style.backgroundColor = "#ccc";
        addBtn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            addToCart();
        });
        card.append(img, title, price, rating, stock, addBtn);
        fragment.appendChild(card);
    });

    productGrid.appendChild(fragment);
}
function searchProducts() {
    const keyword = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector("#filterButtons .active").dataset.category;
    
    currentProducts = products.filter(p => {
        const matchName = p.name.toLowerCase().includes(keyword);
        const matchCategory = activeCategory === "all" || p.category === activeCategory;
        return matchName && matchCategory;
    });
    
    sortProducts(); 
}

function filterByCategory(e) {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#filterButtons button").forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    searchProducts(); 
}

function sortProducts() {
    const sortType = sortSelect.value;
    
    switch (sortType) {
        case "priceAsc":
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case "priceDesc":
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case "nameAsc":
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case "ratingDesc":
            currentProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            currentProducts.sort((a, b) => a.id - b.id);
            break;
    }
    
    renderProducts(currentProducts);
}

function showModal(product) {
    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <img src="${product.image}" style="width: 100%; max-width: 300px; border-radius: 8px; margin: 10px 0;">
        <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
        <p>Danh mục: ${product.category.toUpperCase()}</p>
        <p>Đánh giá: ⭐ ${product.rating}</p>
        <p>${product.inStock ? "Sản phẩm hiện đang có sẵn trong kho." : "Rất tiếc, sản phẩm tạm thời hết hàng."}</p>
    `;
    modal.classList.remove("hidden");
}

function closeModalHandler() {
    modal.classList.add("hidden");
}

function addToCart() {
    cartCount++;
    cartBadge.textContent = cartCount;
    cartBadge.style.transform = "scale(1.5)";
    setTimeout(() => cartBadge.style.transform = "scale(1)", 200);
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

searchInput.addEventListener("input", searchProducts); 
filterButtons.addEventListener("click", filterByCategory);
sortSelect.addEventListener("change", sortProducts);
closeModal.addEventListener("click", closeModalHandler);
darkModeToggle.addEventListener("click", toggleDarkMode);

modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalHandler();
});

renderProducts(currentProducts);