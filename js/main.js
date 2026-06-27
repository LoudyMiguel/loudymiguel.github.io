/* =============================================================
   Loudy Miguel Torrejas — Portfolio · main.js
   ============================================================= */

/* -------------------------------------------------------------
   1) EMAILJS CONFIG  ⬇️  FILL IN THE TWO MISSING VALUES
   -------------------------------------------------------------
   serviceID   ✅ already provided
   templateID  ⛔ get it from EmailJS → Email Templates → (your template) → "Template ID"
   publicKey   ⛔ get it from EmailJS → Account → General → "Public Key"
   See EMAILJS_SETUP.md for the 2-minute walkthrough.
------------------------------------------------------------- */
const EMAILJS_CONFIG = {
  serviceID:  "service_twi2jbn",
  templateID: "template_d8ygoam",
  publicKey:  "G7r2weAS0iPNn8nvj",
};

/* -------------------------------------------------------------
   2) CERTIFICATIONS DATA
   file  = exact filename inside assets/certificates/
   issuer class: issuer-cisco | issuer-scholarhat | issuer-sololearn
------------------------------------------------------------- */
const CERTS = [
  { title: "Introduction to Modern AI",       issuer: "Cisco Networking Academy", cls: "issuer-cisco",     file: "Introduction to Modern AI.jpeg" },
  { title: "Introduction to Cybersecurity",   issuer: "Cisco Networking Academy", cls: "issuer-cisco",     file: "Introduction to Cybersecurity.jpeg" },
  { title: "SQL Server Foundation Course",    issuer: "ScholarHat",               cls: "issuer-scholarhat", file: "SQL Server Foundation Course.jpeg" },
  { title: "Java Intermediate",               issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Java Intermediate.jpeg" },
  { title: "Introduction to Java",            issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Intoduction to Java.jpeg" },
  { title: "Introduction to JavaScript",      issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Introduction to JavaScript.jpeg" },
  { title: "Introduction to CSS",             issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Introduction to CSS.jpeg" },
  { title: "Web Development",                 issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Web Development.jpeg" },
  { title: "Prompt Engineering",             issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Prompt Engineering.jpeg" },
  { title: "Vibe Coding",                     issuer: "SoloLearn",                cls: "issuer-sololearn",  file: "Vibe Coding.jpeg" },
];

/* -------------------------------------------------------------
   3) RENDER CERTIFICATE CARDS
------------------------------------------------------------- */
(function renderCerts() {
  const grid = document.getElementById("certGrid");
  if (!grid) return;
  const expandIco = `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#c6f84a" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>`;

  CERTS.forEach((c, i) => {
    const src = "assets/certificates/" + encodeURIComponent(c.file);
    const card = document.createElement("div");
    card.className = `cert-card glass reveal ${c.cls}`;
    card.setAttribute("data-d", String((i % 3) + 1));
    card.innerHTML = `
      <div class="cert-expand">${expandIco}</div>
      <div class="cert-thumb"><img src="${src}" alt="${c.title} — ${c.issuer}" loading="lazy" /></div>
      <div class="cert-info">
        <h4>${c.title}</h4>
        <span class="cert-issuer"><span class="issuer-dot"></span>${c.issuer}</span>
      </div>`;
    card.addEventListener("click", () => openLightbox(src, `${c.title} · ${c.issuer}`));
    grid.appendChild(card);
  });
})();

/* -------------------------------------------------------------
   4) LIGHTBOX
------------------------------------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCap = document.getElementById("lightboxCap");

function openLightbox(src, cap) {
  lightboxImg.src = src;
  lightboxCap.textContent = cap;
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

/* -------------------------------------------------------------
   5) NAVBAR — scroll state + mobile menu
------------------------------------------------------------- */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

function toggleMenu(force) {
  const open = force !== undefined ? force : !mobileMenu.classList.contains("open");
  mobileMenu.classList.toggle("open", open);
  navToggle.classList.toggle("open", open);
  document.body.style.overflow = open ? "hidden" : "";
}
navToggle.addEventListener("click", () => toggleMenu());
mobileMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggleMenu(false)));

/* -------------------------------------------------------------
   6) PROJECT FILTER
------------------------------------------------------------- */
const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".proj-card");
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    filters.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const f = btn.dataset.filter;
    cards.forEach((card) => {
      const show = f === "all" || card.dataset.cat.includes(f);
      card.classList.toggle("hide", !show);
    });
  });
});

/* -------------------------------------------------------------
   7) SCROLL REVEAL  →  handled in the MOTION LAYER (section 11)
   (GSAP when available, IntersectionObserver fallback otherwise)
------------------------------------------------------------- */

/* -------------------------------------------------------------
   8) FOOTER YEAR
------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* -------------------------------------------------------------
   9) TOAST
------------------------------------------------------------- */
const toast = document.getElementById("toast");
let toastTimer;
function showToast(msg, type) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.className = `toast show ${type}`;
  toastTimer = setTimeout(() => toast.classList.remove("show"), 4200);
}

/* -------------------------------------------------------------
   10) CONTACT FORM — EmailJS
------------------------------------------------------------- */
const form = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const isConfigured =
  EMAILJS_CONFIG.publicKey !== "YOUR_PUBLIC_KEY_HERE" &&
  EMAILJS_CONFIG.templateID !== "YOUR_TEMPLATE_ID_HERE";

if (window.emailjs && isConfigured) {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
}

/* --- Anti-abuse settings --- */
const RL = {
  COOLDOWN_MS: 45 * 1000,        // min gap between sends
  MAX_PER_WINDOW: 5,             // max sends...
  WINDOW_MS: 60 * 60 * 1000,     // ...per rolling hour
  MIN_FILL_MS: 3 * 1000,         // submitting faster than this = bot
  STORE_KEY: "cf_sends_v1",
};
const formReadyAt = Date.now();

/* localStorage-backed send log (best-effort; pairs with EmailJS server limits) */
function getSendLog() {
  try {
    const arr = JSON.parse(localStorage.getItem(RL.STORE_KEY) || "[]");
    const now = Date.now();
    return Array.isArray(arr) ? arr.filter((t) => now - t < RL.WINDOW_MS) : [];
  } catch { return []; }
}
function recordSend() {
  try {
    const log = getSendLog();
    log.push(Date.now());
    localStorage.setItem(RL.STORE_KEY, JSON.stringify(log));
  } catch { /* private mode / disabled storage — ignore */ }
}
function rateLimitBlock() {
  const log = getSendLog();
  const now = Date.now();
  if (log.length) {
    const sinceLast = now - log[log.length - 1];
    if (sinceLast < RL.COOLDOWN_MS) {
      return `Please wait ${Math.ceil((RL.COOLDOWN_MS - sinceLast) / 1000)}s before sending again.`;
    }
  }
  if (log.length >= RL.MAX_PER_WINDOW) {
    const wait = Math.ceil((RL.WINDOW_MS - (now - log[0])) / 60000);
    return `Hourly message limit reached. Try again in ~${wait} min, or email me directly.`;
  }
  return null;
}

/* Validation */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validate(f) {
  const name = f.from_name.value.trim();
  const email = f.reply_to.value.trim();
  const subject = f.subject.value.trim();
  const message = f.message.value.trim();
  if (name.length < 2 || name.length > 80) return "Please enter your name.";
  if (!EMAIL_RE.test(email) || email.length > 120) return "Please enter a valid email address.";
  if (subject.length < 2 || subject.length > 120) return "Please add a short subject.";
  if (message.length < 10) return "Your message is a bit short — add a little more detail.";
  if (message.length > 2000) return "Your message is too long (2000 char max).";
  return null;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!isConfigured) {
    showToast("⚠ Contact form not configured yet — see EMAILJS_SETUP.md", "err");
    return;
  }

  // 1) Honeypot — bots fill the hidden field; humans never see it
  if (form.hp_company && form.hp_company.value.trim() !== "") {
    showToast("✓ Message sent — thanks for reaching out!", "ok"); // silent decoy
    form.reset();
    return;
  }

  // 2) Time-trap — instant submits are bots
  if (Date.now() - formReadyAt < RL.MIN_FILL_MS) {
    showToast("Hold on a moment, then send.", "err");
    return;
  }

  // 3) Validation
  const vErr = validate(form);
  if (vErr) { showToast("✕ " + vErr, "err"); return; }

  // 4) Rate limit
  const rlErr = rateLimitBlock();
  if (rlErr) { showToast("⚠ " + rlErr, "err"); return; }

  // Passed all checks — send
  submitBtn.disabled = true;
  const original = submitBtn.innerHTML;
  submitBtn.textContent = "Sending...";
  recordSend(); // count this attempt against the limit

  emailjs
    .sendForm(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, form)
    .then(() => {
      showToast("✓ Message sent — thanks for reaching out!", "ok");
      form.reset();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      showToast("✕ Something went wrong. Please email me directly.", "err");
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = original;
    });
});

/* =============================================================
   11) MOTION LAYER  —  GSAP-driven, with graceful fallback
   ============================================================= */
// Animations stay ON regardless of the OS "reduce motion" setting (by request).
// `prefersReduced` is kept only for logging; set ENABLE_MOTION = false to honor the OS again.
const ENABLE_MOTION = true;
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const reduceMotion = ENABLE_MOTION ? false : prefersReduced;
// Require BOTH gsap and ScrollTrigger — otherwise scroll reveals play instantly.
const hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";
console.info(`[portfolio] motion engine → ${reduceMotion ? "reduced-motion" : hasGSAP ? "GSAP + ScrollTrigger" : "IntersectionObserver fallback"}${prefersReduced ? "  (OS reduce-motion detected but overridden)" : ""}`);

/* Animated count-up for hero stats (shared) */
function countUp(el) {
  const raw = (el.dataset.val || el.textContent).trim();
  const target = parseInt(raw, 10) || 0;
  const pad = /^0\d/.test(raw);
  const plus = /\+$/.test(raw);
  const fmt = (v) => (pad ? String(v).padStart(2, "0") : String(v)) + (plus ? "+" : "");
  if (reduceMotion) { el.textContent = fmt(target); return; }
  const dur = 1200, start = performance.now();
  (function tick(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(Math.round(eased * target));
    if (p < 1) requestAnimationFrame(tick);
  })(performance.now());
}

/* ---------- Reveal + hero intro ---------- */
if (reduceMotion) {
  /* No animation: show everything immediately */
  document.body.classList.add("loaded");
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
  document.querySelectorAll(".stat .num").forEach(countUp);

} else if (hasGSAP) {
  /* ----- Preferred path: GSAP + ScrollTrigger ----- */
  document.documentElement.classList.add("gsap-ready");
  gsap.registerPlugin(ScrollTrigger);

  // Headline lines are visible by default; animate FROM a slide-up so they
  // always end visible (no clip-mask, no risk of being cut off).
  gsap.timeline({ defaults: { ease: "power3.out", duration: 0.9 } })
    .from(".hero-kicker", { y: 18, opacity: 0, duration: 0.55 })
    .from(".hero-title .line-i", { y: 40, opacity: 0, stagger: 0.1, duration: 0.9 }, "-=0.15")
    .from(".hero-tag", { y: 24, opacity: 0 }, "-=0.55")
    .from(".hero-meta", { y: 20, opacity: 0 }, "-=0.6")
    .from(".hero-cta > *", { y: 22, opacity: 0, stagger: 0.08 }, "-=0.55")
    .from(".hero-stats .stat", { y: 24, opacity: 0, stagger: 0.1 }, "-=0.5")
    .from(".hero-side", { y: 34, opacity: 0, duration: 1 }, "-=0.85");

  // Section reveals on scroll
  gsap.utils.toArray(".reveal").forEach((el) => {
    if (el.closest(".hero")) { el.classList.add("in"); return; } // hero handled above
    gsap.fromTo(el,
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
  });

  // Stat count-up when scrolled into view
  document.querySelectorAll(".stat .num").forEach((el) => {
    ScrollTrigger.create({ trigger: el, start: "top 85%", once: true, onEnter: () => countUp(el) });
  });

  // Recalculate after images/fonts settle
  window.addEventListener("load", () => ScrollTrigger.refresh());

} else {
  /* ----- Fallback: GSAP CDN unavailable → IntersectionObserver ----- */
  document.body.classList.add("loaded", "no-gsap");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const statObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); statObs.unobserve(e.target); } });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat .num").forEach((s) => statObs.observe(s));
}

/* ---------- Pointer-driven effects (independent of reveal engine) ---------- */

/* Scroll progress bar — always on */
const progress = document.getElementById("scrollProgress");
function updateProgress() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

if (!reduceMotion) {
  /* Cursor spotlight (fine pointers only) */
  if (window.matchMedia("(pointer: fine)").matches) {
    const glow = document.getElementById("cursorGlow");
    window.addEventListener("mousemove", (e) => {
      document.body.classList.add("has-cursor");
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    }, { passive: true });
  }

  /* 3D tilt + spotlight on cards (GSAP quickTo when available, else inline) */
  document.querySelectorAll(".proj-card, .cert-card").forEach((card) => {
    const setX = hasGSAP ? gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" }) : null;
    const setY = hasGSAP ? gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" }) : null;
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--mx", px * 100 + "%");
      card.style.setProperty("--my", py * 100 + "%");
      const rx = (py - 0.5) * -6, ry = (px - 0.5) * 6;
      if (hasGSAP) {
        gsap.set(card, { transformPerspective: 900, y: -6 });
        setX(ry); setY(rx);
      } else {
        card.style.transform = `translateY(-6px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      }
    });
    card.addEventListener("mouseleave", () => {
      if (hasGSAP) gsap.to(card, { rotationX: 0, rotationY: 0, y: 0, duration: 0.5, ease: "power3.out" });
      else card.style.transform = "";
    });
  });

  /* Subtle aurora parallax */
  const aurora = document.querySelector(".bg-aurora");
  window.addEventListener("scroll", () => {
    aurora.style.transform = `translateY(${window.scrollY * 0.12}px)`;
  }, { passive: true });
}
