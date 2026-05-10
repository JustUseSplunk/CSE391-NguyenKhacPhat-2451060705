# Exercise 1.2 — About + Skills Section

## 🎬 Opening Scenario

*Sau khi hoàn thành hero section, bạn cần xây dựng phần giới thiệu bản thân (About) và hiển thị kỹ năng (Skills) với progress bars.*

---

## 📋 Requirements

### 1. About Section

```html
<section id="about" class="about-section">
    <div class="container">
        <div class="about-grid">
            <div class="about-image">
                <img src="https://via.placeholder.com/400x400" alt="Profile Photo">
            </div>
            <div class="about-content">
                <h2>About Me</h2>
                <p class="lead">I'm a passionate developer with 3+ years of experience building web applications.</p>
                <p>Specialized in Frontend development with React and Vue. Also experienced in Backend with Node.js and Python.</p>
            </div>
        </div>
    </div>
</section>
```

**Yêu cầu:**
- 2-column layout (image + text) trên desktop
- Single column (image trên, text dưới) trên mobile
- Avatar/image có border-radius (circle hoặc rounded)
- Text có hierarchy: heading, lead paragraph, body text

### 2. Skills Section

```html
<section id="skills" class="skills-section">
    <div class="container">
        <h2>My Skills</h2>
        <div class="skills-grid">
            <div class="skill-item">
                <span class="skill-name">HTML5</span>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: 95%"></div>
                </div>
            </div>
            <!-- Thêm CSS, JavaScript, React, Node.js -->
        </div>
    </div>
</section>
```

**Yêu cầu:**
- Skills grid: 2 columns (desktop), 1 column (mobile)
- Progress bars có animation khi scroll vào viewport
- Percentage hiển thị (hoặc label)

---

## 🎨 Design Specs

### About Section
- Avatar size: 300x300px (desktop), 200x200px (mobile)
- Gap between image và text: 3rem
- Lead text: 1.25rem, font-weight: 300

### Skills Section
- Skill bar height: 12px
- Skill bar background: #e2e8f0
- Progress fill: gradient (primary → secondary)
- Animation: width transition 1s ease-out

---

## 🐛 Hints

### CSS Grid for About
```css
.about-grid {
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 3rem;
    align-items: center;
}

@media (max-width: 768px) {
    .about-grid { grid-template-columns: 1fr; }
}
```

### Progress Bar Animation
```css
.skill-progress {
    background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
    height: 100%;
    width: 0; /* Start at 0 for animation */
    transition: width 1s ease-out;
}

/* Add class 'animate' via JS when in viewport */
.skill-progress.animate { width: 95%; }
```

### Skill Bar Structure
```css
.skill-bar {
    background: #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
}
```

---

## ✅ Success Criteria

- [ ] About section responsive (2 col → 1 col)
- [ ] Avatar circular và responsive
- [ ] Skills grid responsive
- [ ] Progress bars có animation khi scroll
- [ ] 4 skills: HTML, CSS, JavaScript, React

---

## 📝 Commit Messages Expected

```
[STYLE] Create about section layout
[FEATURE] Add skills progress bars
[REFACTOR] Optimize responsive breakpoints
```

---

**← [ Quay lại Session 1](../README.md)**