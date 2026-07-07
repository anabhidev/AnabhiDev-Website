/* ═══════════════════════════════════════
   ANABHI STUDIO — COMPRO TEMPLATE
   main.js — Shared across all pages
   Version: 1.0
═══════════════════════════════════════ */

// ── Navbar HTML (injected into every page) ──
const navbarHTML = `
<div id="scroll-progress"></div>
<nav id="navbar" role="navigation" aria-label="Main navigation">
  <a href="index.html" class="nav-logo" aria-label="Anabhi Studio — Home">Anabhi <em>Dev</em><span class="studio-badge">Studio</span></a>
  <ul class="nav-links" role="list">
    <li><a href="index.html"     class="nav-link">Home</a></li>
    <li><a href="about.html"     class="nav-link">About</a></li>
    <li><a href="services.html"  class="nav-link">Services</a></li>
    <li><a href="portfolio.html" class="nav-link">Portfolio</a></li>
    <li><a href="contact.html"   class="nav-link">Contact</a></li>
  </ul>
  <div class="nav-right">
    <div class="lang-toggle" role="group" aria-label="Language selector">
      <button class="lang-btn active" id="btn-en" onclick="setLang('en')" aria-label="Switch to English" aria-pressed="true">EN</button>
      <button class="lang-btn"        id="btn-id" onclick="setLang('id')"  aria-label="Ganti ke Bahasa Indonesia" aria-pressed="false">ID</button>
    </div>
    <a href="contact.html" class="nav-cta">
      <span data-en>Get in Touch</span>
      <span data-id>Hubungi Kami</span>
    </a>
  </div>
  <button class="hamburger" id="hamburger" aria-label="Toggle mobile menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu" role="navigation" aria-label="Mobile navigation">
  <div class="mob-lang">
    <button class="mob-lang-btn active" id="mob-btn-en" onclick="setLang('en');closeMenu()" aria-label="English">EN</button>
    <button class="mob-lang-btn"        id="mob-btn-id" onclick="setLang('id');closeMenu()" aria-label="Indonesia">ID</button>
  </div>
  <a href="index.html"     onclick="closeMenu()">Home</a>
  <a href="about.html"     onclick="closeMenu()">About</a>
  <a href="services.html"  onclick="closeMenu()">Services</a>
  <a href="portfolio.html" onclick="closeMenu()">Portfolio</a>
  <a href="contact.html"   onclick="closeMenu()" class="mob-cta">
    <span data-en>Get in Touch</span>
    <span data-id>Hubungi Kami</span>
  </a>
</div>
`;

// ── Footer HTML (injected into every page) ──
const footerHTML = `
<footer id="footer" role="contentinfo">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <div class="foot-brand-name">Anabhi <em>Dev</em></div>
        <div class="foot-brand-sub">Studio</div>
        <p class="foot-tag">
          <span data-en>"Smart Websites for Real Businesses."</span>
          <span data-id>"Website Cerdas untuk Bisnis Nyata."</span>
        </p>
        <div class="socials">
          <a href="https://wa.me/6282267672828" class="soc" title="WhatsApp" aria-label="WhatsApp">💬</a>
          <a href="https://linkedin.com/in/aguswibawa" class="soc" title="LinkedIn" aria-label="LinkedIn">💼</a>
          <a href="mailto:hello@anabhidev.com" class="soc" title="Email" aria-label="Email">✉️</a>
        </div>
      </div>
      <div class="foot-col">
        <h4><span data-en>Navigate</span><span data-id>Navigasi</span></h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html"><span data-en>About</span><span data-id>Tentang</span></a></li>
          <li><a href="services.html"><span data-en>Services</span><span data-id>Layanan</span></a></li>
          <li><a href="portfolio.html">Portfolio</a></li>
          <li><a href="contact.html"><span data-en>Contact</span><span data-id>Kontak</span></a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4><span data-en>Also Visit</span><span data-id>Kunjungi Juga</span></h4>
        <ul>
          <li><a href="https://anabhidev.com" target="_blank" rel="noopener">anabhidev.com</a></li>
          <li><a href="https://studio.anabhidev.com" target="_blank" rel="noopener">
            <span data-en>Studio</span><span data-id>Studio</span>
          </a></li>
        </ul>
      </div>
      <div class="foot-col">
        <h4><span data-en>Contact</span><span data-id>Kontak</span></h4>
        <div class="ct-row">💬 <a href="https://wa.me/6282267672828">wa.me/6282267672828</a></div>
        <div class="ct-row">✉️ <a href="mailto:hello@anabhidev.com">hello@anabhidev.com</a></div>
        <div class="ct-row">💼 <a href="https://linkedin.com/in/aguswibawa" target="_blank" rel="noopener">linkedin.com/in/aguswibawa</a></div>
      </div>
    </div>
    <div class="foot-bot">
      <div class="copy">© 2025 <em>Anabhi Dev Studio</em>.
        <span data-en>All rights reserved.</span>
        <span data-id>Semua hak dilindungi.</span>
      </div>
      <div class="foot-badge">Smart Websites for Real Businesses. ✦</div>
    </div>
  </div>
</footer>
`;

// ── Inject Navbar & Footer ──
document.addEventListener('DOMContentLoaded', () => {
  // Inject navbar at top of body
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // Inject footer before closing body
  document.body.insertAdjacentHTML('beforeend', footerHTML);

  // Init all features after injection
  initLang();
  initScrollProgress();
  initNavbarScroll();
  initActiveNavLink();
  initHamburger();
  initFadeUp();
  applyLangToInjected();
});

// ── Language Toggle ──
function setLang(lang) {
  document.body.className = document.body.className
    .replace(/lang-\w+/g, '').trim() + ' lang-' + lang;

  ['btn-en','btn-id'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('active', id === 'btn-' + lang);
      el.setAttribute('aria-pressed', id === 'btn-' + lang);
    }
  });
  ['mob-btn-en','mob-btn-id'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('active', id === 'mob-btn-' + lang);
  });

  localStorage.setItem('compro-lang', lang);
}

function initLang() {
  const saved = localStorage.getItem('compro-lang') || 'en';
  document.body.classList.add('lang-' + saved);
  // Buttons will be synced once navbar is injected
  requestAnimationFrame(() => {
    ['btn-en','btn-id'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const isActive = id === 'btn-' + saved;
      el.classList.toggle('active', isActive);
      el.setAttribute('aria-pressed', isActive);
    });
    ['mob-btn-en','mob-btn-id'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.classList.toggle('active', id === 'mob-btn-' + saved);
    });
  });
}

function applyLangToInjected() {
  // Already handled by CSS [data-en]/[data-id] rules
  // This ensures dynamically injected elements respect current lang
  const saved = localStorage.getItem('compro-lang') || 'en';
  setLang(saved);
}

// ── Scroll Progress Bar ──
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

// ── Navbar Scroll Effect ──
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// ── Active Nav Link (by current page filename) ──
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === path);
  });
}

// ── Hamburger ──
function initHamburger() {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if (!ham || !mob) return;
  ham.addEventListener('click', () => {
    const isOpen = mob.classList.toggle('open');
    ham.classList.toggle('open', isOpen);
    ham.setAttribute('aria-expanded', isOpen);
  });
}
function closeMenu() {
  const ham = document.getElementById('hamburger');
  const mob = document.getElementById('mobileMenu');
  if (ham) { ham.classList.remove('open'); ham.setAttribute('aria-expanded', 'false'); }
  if (mob) mob.classList.remove('open');
}

// ── Fade Up on Scroll ──
function initFadeUp() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
}

// ── Counter Animation (used by index.html) ──
function animateCounter(el, target, duration, suffix) {
  if (!el) return;
  let start = 0;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.innerHTML = Math.floor(ease * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ── Stagger Grid Cards ──
function initStaggerGrid(selector) {
  const grids = document.querySelectorAll(selector);
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.card-navy, .card-white, .sc, .pc, .tc').forEach((card, i) => {
          setTimeout(() => card.classList.add('visible'), i * 90);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });
  grids.forEach(g => obs.observe(g));
}
