/* ═══════════════════════════════════════════
   JAGADITA — main.js
═══════════════════════════════════════════ */

/* ── NAVBAR: sticky shadow + hamburger ── */
(function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

/* ── FADE-IN per element (IntersectionObserver) ── */
(function () {
  const targets = document.querySelectorAll('.fade-up');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // trigger sekali saja
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -30px 0px'
  });

  targets.forEach(el => observer.observe(el));
})();

/* ── FAQ ACCORDION ── */
(function () {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // tutup semua + reset aria
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        const q = i.querySelector('.faq-question');
        if (q) q.setAttribute('aria-expanded', 'false');
      });

      // buka yg diklik (kalau belum open)
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ── CREDIBILITY BAR: acak urutan tampil setiap load ──
   HTML aslinya statis dan berurutan (penting untuk SEO/crawler —
   semua nama tetap terbaca apa adanya). Shuffle ini murni visual,
   dijalankan di client setelah DOM siap. */
(function () {
  const flow = document.getElementById('credFlow');
  if (!flow) return;

  const nodes = Array.from(flow.children);
  const groups = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].classList.contains('cred-item')) {
      const group = [nodes[i]];
      if (nodes[i + 1] && nodes[i + 1].classList.contains('cred-sep')) {
        group.push(nodes[i + 1]);
        i++;
      }
      groups.push(group);
    }
  }

  for (let i = groups.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [groups[i], groups[j]] = [groups[j], groups[i]];
  }

  const frag = document.createDocumentFragment();
  groups.forEach(g => g.forEach(el => frag.appendChild(el)));
  flow.innerHTML = '';
  flow.appendChild(frag);

  const last = flow.lastElementChild;
  if (last && last.classList.contains('cred-sep')) last.remove();
})();

/* ── COUNTER ANIMATION ── */
(function () {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    el.textContent = '0'; // reset visual ke 0 — HTML aslinya sudah berisi angka final untuk crawler/AI
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(easeOut(progress) * target);
      el.textContent = current.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
})();

/* ── TESTIMONIAL SLIDER ── */
(function () {
  const slides = document.querySelectorAll('.t-slide');
  const dots = document.querySelectorAll('.t-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(n) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startAuto();
    });
  });

  // init
  goTo(0);
  startAuto();
})();
