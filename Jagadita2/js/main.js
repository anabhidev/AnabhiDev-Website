/* ============================================================
   JAGADITA.COM — main.js
   1. Navbar scroll shadow
   2. Mobile menu toggle + Escape close
   3. Stagger reveal (IntersectionObserver, per-item delay)
   4. Stats counter (easeOutQuart)
   5. Accordion (Why Choose Us)
   6. Footer year
   ============================================================ */
(function(){
  'use strict';

  /* ── 1. NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  if(navbar){
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();
  }

  /* ── 2. MOBILE MENU ── */
  const toggle  = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(toggle && navMenu){
    const close = () => {
      navMenu.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      toggle.setAttribute('aria-label','Open navigation menu');
      document.body.style.overflow = '';
    };
    toggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    navMenu.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', close));
    document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });
  }

  /* ── 3. STAGGER REVEAL ── */
  // Each [data-reveal] element gets its own delay based on its
  // position among siblings within the same parent container.
  // This gives per-item stagger, not per-section stagger.
  const STAGGER_MS = 110; // delay between each sibling item

  function assignDelays(root){
    // Group reveal items by their direct parent
    const items = Array.from(root.querySelectorAll('[data-reveal]'));
    const groups = new Map();
    items.forEach(el => {
      const parent = el.parentElement;
      if(!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    groups.forEach(children => {
      children.forEach((el, i) => {
        el.style.setProperty('--reveal-delay', (i * STAGGER_MS) + 'ms');
      });
    });
  }
  assignDelays(document);

  if('IntersectionObserver' in window){
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          revealObs.unobserve(entry.target);
        }
      });
    }, {rootMargin:'-60px 0px -60px 0px', threshold:0});

    document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));
  } else {
    // Fallback: reveal everything immediately
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('revealed'));
  }

  /* ── 4. STATS COUNTER ── */
  const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

  function runCounter(el, target, duration){
    const start = performance.now();
    const tick  = now => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(easeOutQuart(p) * target);
      if(p < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  }

  const counters = document.querySelectorAll('.counter[data-target]');
  if(counters.length && 'IntersectionObserver' in window){
    const cObs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          runCounter(entry.target, parseInt(entry.target.dataset.target, 10), 1800);
          cObs.unobserve(entry.target);
        }
      });
    }, {rootMargin:'-60px 0px -60px 0px', threshold:0});
    counters.forEach(el => cObs.observe(el));
  } else {
    counters.forEach(el => { el.textContent = el.dataset.target; });
  }

  /* ── 5. ACCORDION ── */
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.accordion-item');
      const body   = item.querySelector('.accordion-body');
      const isOpen = btn.classList.contains('active');

      // Close all
      document.querySelectorAll('.accordion-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-expanded','false');
        const sibling = b.closest('.accordion-item').querySelector('.accordion-body');
        sibling.classList.remove('open');
      });

      // Open clicked (if it was closed)
      if(!isOpen){
        btn.classList.add('active');
        btn.setAttribute('aria-expanded','true');
        body.classList.add('open');
      }
    });
    btn.setAttribute('aria-expanded','false');
  });
  // Open first accordion by default
  const firstBtn = document.querySelector('.accordion-btn');
  if(firstBtn) firstBtn.click();

  /* ── 6. FOOTER YEAR ── */
  const yr = document.getElementById('year');
  if(yr) yr.textContent = new Date().getFullYear();

})();
