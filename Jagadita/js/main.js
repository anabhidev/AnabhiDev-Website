/* ============================================================
   JAGADITA CONSULTING — main.js
   Shared JS for all pages
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL STATE ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── MOBILE NAV TOGGLE ──
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.fade-up, .fade-in, .fade-left, .fade-right');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px 0px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ── NUMBER COUNTER ──
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => countObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1800;
    const startTime = performance.now();

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

  // ── CIRCULAR PROGRESS (Empowering section) ──
  const circles = document.querySelectorAll('[data-circle]');
  if (circles.length) {
    const circleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCircle(entry.target);
          circleObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    circles.forEach(el => circleObserver.observe(el));
  }

  function animateCircle(el) {
    const pct    = parseInt(el.getAttribute('data-circle'), 10);
    const circle = el.querySelector('.circle-progress');
    const label  = el.querySelector('.circle-pct');
    if (!circle) return;

    const radius = circle.r.baseVal.value;
    const circ   = 2 * Math.PI * radius;
    circle.style.strokeDasharray  = circ;
    circle.style.strokeDashoffset = circ;

    const duration  = 1600;
    const startTime = performance.now();

    const easeInOut = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const tick = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeInOut(progress);
      const offset   = circ - (eased * pct / 100) * circ;
      circle.style.strokeDashoffset = offset;
      if (label) label.textContent = Math.round(eased * pct) + '%';
      if (progress < 1) requestAnimationFrame(tick);
      else if (label) label.textContent = pct + '%';
    };
    requestAnimationFrame(tick);
  }

  // ── PORTFOLIO FILTER ──
  const filterBtns = document.querySelectorAll('[data-filter]');
  const portfolioItems = document.querySelectorAll('[data-category]');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        portfolioItems.forEach(item => {
          const cats = item.getAttribute('data-category').split(' ');
          const show = filter === 'all' || cats.includes(filter);
          item.style.opacity    = show ? '1' : '0';
          item.style.transform  = show ? 'scale(1)' : 'scale(0.92)';
          item.style.pointerEvents = show ? '' : 'none';
          setTimeout(() => {
            item.style.display = show ? '' : 'none';
          }, show ? 0 : 300);
        });
      });
    });
  }

  // ── ACTIVE NAV LINK ──
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index';
  document.querySelectorAll('.nav-link, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href')?.replace(/\/$/, '') || '';
    if (href && currentPath.endsWith(href)) a.classList.add('active');
  });

});
