# Exercise 1.1 — Header + Hero Section

## 🎬 Opening Scenario

*Bạn nhận được task đầu tiên: xây dựng phần header và hero cho portfolio cá nhân. Designer đã gửi mockup, nhưng bạn cần tự convert sang code HTML/CSS.*

---

## 📋 Requirements

### 1. Header (Navigation)

```html
<!-- Phần header cần có -->
<header>
    <div class="logo">YourName</div>
    <nav>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#portfolio">Portfolio</a>
        <a href="#contact">Contact</a>
    </nav>
</header>
```

**Yêu cầu:**
- Sticky header (fixed at top when scrolling)
- Logo bên trái, nav links bên phải
- Nav links có hover effect (underline hoặc color change)
- Mobile: Hamburger menu toggle (dùng checkbox hack hoặc :hover)

### 2. Hero Section

```html
<section class="hero">
    <h1>Hi, I'm [Your Name]</h1>
    <p>Full-Stack Developer | UI Designer | Problem Solver</p>
    <a href="#portfolio" class="cta-button">View My Work</a>
</section>
```

**Yêu cầu:**
- Full viewport height (`100vh`)
- Background gradient hoặc hình ảnh
- Center content vertically và horizontally
- CTA button với hover effect (scale + shadow)

---

## 🎨 Design Specs

### Colors (CSS Variables)
```css
:root {
    --color-primary: #6366f1;    /* Indigo */
    --color-secondary: #8b5cf6;  /* Purple */
    --color-dark: #1e293b;       /* Slate dark */
    --color-light: #f8fafc;      /* Slate light */
    --color-text: #334155;       /* Slate text */
    --font-main: 'Segoe UI', sans-serif;
}
```

### Typography
- Hero title: 3.5rem (desktop), 2.5rem (mobile)
- Hero subtitle: 1.25rem
- Nav links: 1rem

### Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

---

## 🐛 Hints

### Sticky Header
```css
header {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: var(--color-light);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
```

### Hero Centering
```css
.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}
```

### Mobile Menu (CSS-only)
```css
/* Dùng checkbox hack */
.menu-toggle { display: none; }
.menu-toggle:checked ~ nav { display: flex; }
```

---

## ✅ Success Criteria

- [ ] Header sticky và responsive
- [ ] Nav links hover effect hoạt động
- [ ] Hero full viewport height
- [ ] CTA button có hover animation
- [ ] Mobile menu toggle hoạt động
- [ ] Git commit message đúng convention

---

## 📝 Commit Messages Expected

```
[SETUP] Initialize project structure
[STYLE] Add base CSS variables and reset
[FEATURE] Implement header navigation
[FEATURE] Complete hero section with CTA
```

---

**← [ Quay lại Session 1](../README.md)**