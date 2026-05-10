# Exercise 1.3 — Portfolio Grid Gallery

## 🎬 Opening Scenario

*Designer muốn portfolio gallery với grid layout, hover effects, và lightbox xem ảnh lớn — tất cả chỉ dùng HTML/CSS (không JavaScript).*

---

## 📋 Requirements

### 1. Portfolio Grid

```html
<section id="portfolio" class="portfolio-section">
    <div class="container">
        <h2>My Portfolio</h2>
        <div class="portfolio-filters">
            <button class="filter-btn active">All</button>
            <button class="filter-btn">Web</button>
            <button class="filter-btn">Mobile</button>
            <button class="filter-btn">Design</button>
        </div>
        <div class="portfolio-grid">
            <div class="portfolio-item" data-category="web">
                <img src="https://via.placeholder.com/400x300" alt="Project 1">
                <div class="portfolio-overlay">
                    <h3>E-Commerce Website</h3>
                    <p>React + Node.js</p>
                </div>
            </div>
            <!-- Thêm 5 items khác -->
        </div>
    </div>
</section>
```

**Yêu cầu:**
- Grid: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- 6 portfolio items (3 web, 2 mobile, 1 design)
- Hover: image zoom + overlay với text

### 2. CSS-Only Lightbox

**Yêu cầu:**
- Click vào image → hiển thị fullscreen overlay
- Dùng CSS `:target` selector (không JavaScript)
- Close button để đóng lightbox

```html
<!-- Lightbox structure -->
<a href="#lightbox-1" class="lightbox-link">
    <img src="..." alt="...">
</a>

<div id="lightbox-1" class="lightbox">
    <img src="..." alt="...">
    <a href="#" class="lightbox-close">&times;</a>
</div>
```

---

## 🎨 Design Specs

### Grid Layout
```css
.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}
```

### Hover Effect
```css
.portfolio-item {
    position: relative;
    overflow: hidden;
    border-radius: 12px;
}

.portfolio-item img {
    width: 100%;
    aspect-ratio: 4/3;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.portfolio-item:hover img {
    transform: scale(1.1);
}

.portfolio-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.portfolio-item:hover .portfolio-overlay {
    opacity: 1;
}
```

### CSS Lightbox
```css
.lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.95);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 2000;
}

/* Show when targeted */
.lightbox:target {
    opacity: 1;
    visibility: visible;
}

.lightbox-close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 2rem;
    color: white;
    text-decoration: none;
}
```

---

## 🐛 Hints

### Image Aspect Ratio
```css
.portfolio-item img {
    aspect-ratio: 4/3;
    width: 100%;
    object-fit: cover;
}
```

### Overlay Gradient
```css
.portfolio-overlay {
    background: linear-gradient(
        to top,
        rgba(30, 41, 59, 0.95) 0%,
        rgba(30, 41, 59, 0.6) 50%,
        transparent 100%
    );
}
```

### Filter Buttons (CSS-only hover)
```css
.filter-btn {
    background: transparent;
    border: 2px solid var(--color-primary);
    padding: 0.5rem 1.5rem;
    border-radius: 25px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-btn:hover,
.filter-btn.active {
    background: var(--color-primary);
    color: white;
}
```

---

## ✅ Success Criteria

- [ ] Grid responsive (3/2/1 columns)
- [ ] Hover zoom effect hoạt động
- [ ] Overlay hiện khi hover
- [ ] CSS lightbox mở khi click
- [ ] Lightbox đóng khi click close
- [ ] 6 portfolio items với categories

---

## 📝 Commit Messages Expected

```
[FEATURE] Build portfolio grid layout
[FEATURE] Add hover zoom effects
[FEATURE] Implement CSS-only lightbox
```

---

**← [ Quay lại Session 1](../README.md)**