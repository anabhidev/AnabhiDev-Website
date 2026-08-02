/* ============================================================
   JAGADITA.COM — main.js
   - Navbar scroll behaviour
   - Mobile menu toggle
   - Scroll reveal (IntersectionObserver)
   - Stats counter animation (easeOutQuart)
   - Donut chart animation
   - Footer year
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. NAVBAR — add .scrolled class on scroll ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
  }

  /* ── 2. MOBILE MENU TOGGLE ── */
  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
      });
    });

    // Close menu on Escape
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  }

  /* ── 3. SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '-60px 0px -60px 0px', threshold: 0 }
    );
    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show everything if IntersectionObserver not available
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── 4. STATS COUNTER ── */
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el, target, duration) {
    const start = performance.now();
    const update = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.floor(easeOutQuart(progress) * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    };
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el     = entry.target;
            const target = parseInt(el.dataset.target, 10);
            animateCounter(el, target, 1800);
            counterObserver.unobserve(el);
          }
        });
      },
      { rootMargin: '-60px 0px -60px 0px', threshold: 0 }
    );
    counters.forEach(el => counterObserver.observe(el));
  } else {
    // Fallback: set final values immediately
    counters.forEach(el => {
      el.textContent = el.dataset.target;
    });
  }

  /* ── 5. DONUT CHART ANIMATION ── */
  // circumference = 2 * π * r = 2 * π * 65 ≈ 408.4
  const CIRCUMFERENCE = 2 * Math.PI * 65;

  const donuts = document.querySelectorAll('.donut__fg[data-pct]');
  if (donuts.length && 'IntersectionObserver' in window) {
    const donutObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const el  = entry.target;
            const pct = parseFloat(el.dataset.pct) / 100;
            const offset = CIRCUMFERENCE * (1 - pct);
            el.style.strokeDashoffset = offset;
            donutObserver.unobserve(el);
          }
        });
      },
      { rootMargin: '-60px 0px -60px 0px', threshold: 0 }
    );
    donuts.forEach(el => donutObserver.observe(el));
  } else {
    // Fallback
    donuts.forEach(el => {
      const pct = parseFloat(el.dataset.pct) / 100;
      el.style.strokeDashoffset = CIRCUMFERENCE * (1 - pct);
    });
  }

  /* ── 6. FOOTER YEAR ── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
