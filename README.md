# Loudy Miguel Torrejas — Portfolio

A fast, fully responsive, single-page portfolio with a dark **"engineer's control
panel"** aesthetic — glassmorphism, an electric-lime signature accent, a blueprint-grid
backdrop, and staggered scroll animations. No build step; deploys straight to GitHub Pages.

**Live (after deploy):** https://loudymiguel.github.io

---

## ✨ Features
- Responsive across mobile / tablet / desktop (mobile-first, full-screen mobile menu)
- Sections: Home · About · Skills · Projects (filterable) · Certifications (lightbox) · Contact
- Working contact form via **EmailJS**
- SEO meta + Open Graph tags, accessible markup, reduced-motion support
- Zero dependencies to install — Tailwind, fonts, and EmailJS load via CDN

## 🗂 Structure
```
.
├── index.html              # all markup
├── css/style.css           # the full design system
├── js/main.js              # nav, filters, lightbox, reveal, EmailJS  ← put your keys here
├── assets/
│   ├── images/             # project images
│   └── certificates/       # certificate images (shown in lightbox)
├── EMAILJS_SETUP.md        # 2-min guide to finish the contact form
├── DEPLOY.md               # GitHub Pages deployment guide
└── README.md
```

## 🛠 Tech
Vanilla **HTML / CSS / JavaScript** · Tailwind (CDN, layout utilities) ·
**GSAP + ScrollTrigger** (animations, via CDN) · EmailJS ·
Google Fonts (Syne · Manrope · JetBrains Mono).

## ▶️ Run locally
It's static — just open `index.html` in a browser. For the contact form to work
during testing, serve it over http (some browsers block CDN/SDK on `file://`):

```bash
# Python
python -m http.server 5500
# then open http://localhost:5500
```

## ✅ Before you go live — checklist
- [ ] Finish EmailJS keys in `js/main.js` (see **EMAILJS_SETUP.md**)
- [ ] (Optional) Add résumé PDF at `assets/Loudy_Miguel_Torrejas_CV.pdf`
- [ ] (Optional) Swap the `LMT` monogram for a profile photo (see **DEPLOY.md**)
- [ ] Push to `loudymiguel.github.io` and enable Pages (see **DEPLOY.md**)

## 🧩 Editing content
- **Projects** → the `<article class="proj-card">` blocks in `index.html`.
- **Certifications** → the `CERTS` array at the top of `js/main.js` (filename must match
  the file in `assets/certificates/`).
- **Skills / bio / links** → directly in `index.html`.

---
© Loudy Miguel Torrejas — Bohol, Philippines.
