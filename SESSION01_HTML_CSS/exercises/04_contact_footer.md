# Exercise 1.4 — Contact Form + Footer

## 🎬 Opening Scenario

*Task cuối của Session 1: xây dựng contact form với validation UI feedback và responsive footer với social links.*

---

## 📋 Requirements

### 1. Contact Section

```html
<section id="contact" class="contact-section">
    <div class="container">
        <h2>Get In Touch</h2>
        <div class="contact-wrapper">
            <div class="contact-info">
                <h3>Contact Information</h3>
                <p>Feel free to reach out. I'm always open to discussing new projects.</p>
                <div class="info-item">
                    <span class="icon">📧</span>
                    <span>your.email@example.com</span>
                </div>
                <div class="info-item">
                    <span class="icon">📍</span>
                    <span>Hanoi, Vietnam</span>
                </div>
            </div>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="submit-btn">Send Message</button>
            </form>
        </div>
    </div>
</section>
```

**Yêu cầu:**
- 2-column layout: info + form (desktop), stacked (mobile)
- Form validation UI: border color change khi focus/error
- Labels always visible (không placeholder only)
- Submit button với hover effect

### 2. Footer

```html
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-logo">YourName</div>
            <p class="footer-tagline">Building digital experiences</p>
            <div class="social-links">
                <a href="#" class="social-link" aria-label="GitHub">
                    <svg><!-- GitHub icon --></svg>
                </a>
                <a href="#" class="social-link" aria-label="LinkedIn">
                    <svg><!-- LinkedIn icon --></svg>
                </a>
                <a href="#" class="social-link" aria-label="Email">
                    <svg><!-- Email icon --></svg>
                </a>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 YourName. All rights reserved.</p>
        </div>
    </div>
</footer>
```

**Yêu cầu:**
- 3-column layout (logo, tagline, social) trên desktop
- Single column trên mobile
- Social icons có hover effect (scale + color)
- Copyright text

---

## 🎨 Design Specs

### Form Styling
```css
.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.875rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
```

### Footer Colors
```css
.footer {
    background: var(--color-dark);
    color: white;
    padding: 3rem 0 1.5rem;
}

.social-link {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    transition: all 0.3s ease;
}

.social-link:hover {
    background: var(--color-primary);
    transform: translateY(-3px);
}
```

---

## 🐛 Hints

### Input Focus Animation
```css
input:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
}
```

### Textarea Resize
```css
textarea {
    resize: vertical;
    min-height: 120px;
}
```

### Footer Grid
```css
.footer-content {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    text-align: center;
}

@media (max-width: 768px) {
    .footer-content { grid-template-columns: 1fr; }
}
```

### SVG Icons (inline)
```html
<!-- GitHub -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
</svg>
```

---

## ✅ Success Criteria

- [ ] Contact form responsive (2 col → 1 col)
- [ ] Form inputs có focus effect
- [ ] Labels visible (not placeholder-only)
- [ ] Footer 3-column layout
- [ ] Social icons có hover effect
- [ ] Mobile responsive footer

---

## 📝 Commit Messages Expected

```
[FEATURE] Style contact form inputs
[FEATURE] Add responsive footer
[REFACTOR] Final responsive adjustments
```

---

**← [ Quay lại Session 1](../README.md) | Kết thúc Session 1 →**