// ================================================================
// AnabhiDev-BPC — Nature Private Chef & Culinary Consulting Website
// HTML5 · Vanilla CSS · Vanilla JavaScript
// Development · Anabhi Dev
// Version   : 1.3
// Generated : 30 August 2026, 13:54:30
// ----------------------------------------------------------------
// Interaksi global: header sticky, drawer mobile, reveal on scroll,
// scrollspy, lightbox galeri, dan pengisian kontak dari CONFIG.
// Butuh config.js di-load lebih dulu.
// ================================================================

(function () {
  'use strict';

  var doc = document;

  /* ==============================================================
     0. LUXURY FEATURES (Magnetic Buttons)
     ============================================================== */
  // Magnetic Buttons (Desktop Only)
  if (window.matchMedia('(min-width: 981px)').matches) {
    var magnetBtns = doc.querySelectorAll('.btn--primary, .btn--ghost, .btn--outline-dark');
    magnetBtns.forEach(function(btn) {
      btn.addEventListener('mousemove', function(e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });
      btn.addEventListener('mouseleave', function() {
        btn.style.transform = '';
      });
    });
  }

  /* ==============================================================
     1. HEADER STICKY
     Scroll di-throttle pakai requestAnimationFrame. Handler scroll
     yang menulis style tiap event adalah penyumbang INP terbesar.
     ============================================================== */
  var hdr = doc.getElementById('hdr');
  if (hdr) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        hdr.classList.toggle('is-stuck', window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  /* ==============================================================
     2. DRAWER MOBILE
     ============================================================== */
  var burger = doc.getElementById('burger');
  var nav    = doc.getElementById('nav');
  var scrim  = doc.getElementById('scrim');

  function drawerIsOpen() {
    return !!nav && nav.classList.contains('is-open');
  }

  function openDrawer() {
    if (!nav || !burger) return;
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    if (scrim) { scrim.hidden = false; window.requestAnimationFrame(function () { scrim.classList.add('is-on'); }); }
    doc.body.style.overflow = 'hidden';
    // Fokus langsung masuk ke item pertama drawer, bukan menunggu Tab.
    var first = nav.querySelector('a');
    if (first) first.focus();
  }

  function closeDrawer(returnFocus) {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    if (scrim) {
      scrim.classList.remove('is-on');
      window.setTimeout(function () { if (!drawerIsOpen()) scrim.hidden = true; }, 380);
    }
    doc.body.style.overflow = '';
    if (returnFocus) burger.focus();
  }

  if (burger) {
    burger.addEventListener('click', function () {
      if (drawerIsOpen()) closeDrawer(true); else openDrawer();
    });
  }
  if (scrim) scrim.addEventListener('click', function () { closeDrawer(true); });

  // Klik salah satu link di drawer menutup drawer.
  if (nav) {
    nav.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (a && drawerIsOpen()) closeDrawer(false);
    });
  }

  // Drawer kembali ke keadaan desktop kalau layar dilebarkan
  // saat drawer sedang terbuka.
  var mq = window.matchMedia('(min-width: 981px)');
  var onMq = function (e) { if (e.matches && drawerIsOpen()) closeDrawer(false); };
  if (mq.addEventListener) mq.addEventListener('change', onMq);
  else if (mq.addListener) mq.addListener(onMq);


  /* ==============================================================
     3. REVEAL ON SCROLL
     ============================================================== */
  var reveals = doc.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        revealObs.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    Array.prototype.forEach.call(reveals, function (el) { revealObs.observe(el); });
  } else {
    // Tanpa IntersectionObserver, tampilkan semuanya. Konten tidak
    // boleh hilang hanya karena browser lama.
    Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
  }


  /* ==============================================================
     4. SCROLLSPY
     IntersectionObserver, bukan scroll event + offsetTop — lebih
     akurat untuk section dengan tinggi tidak seragam dan tidak
     membebani main thread.
     ============================================================== */
  var spyLinks = doc.querySelectorAll('.hdr__list a[href^="#"]');
  if (spyLinks.length && 'IntersectionObserver' in window) {
    var targets = [];
    Array.prototype.forEach.call(spyLinks, function (a) {
      var el = doc.querySelector(a.getAttribute('href'));
      if (el) targets.push(el);
    });

    if (targets.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          Array.prototype.forEach.call(spyLinks, function (a) {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + en.target.id);
          });
        });
      }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });

      targets.forEach(function (t) { spy.observe(t); });
    }
  }


  /* ==============================================================
     5. LIGHTBOX GALERI
     ============================================================== */
  var galleryGrid = doc.getElementById('galleryGrid');
  var lb = null, lbImg = null, lbCap = null, lastTrigger = null;

  function buildLightbox() {
    lb = doc.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Gallery image');
    lb.hidden = true;

    lb.innerHTML =
      '<button type="button" class="lightbox__close" aria-label="Close image">&times;</button>' +
      '<figure class="lightbox__fig">' +
        '<img class="lightbox__img" src="" alt="">' +
        '<figcaption class="lightbox__cap"></figcaption>' +
      '</figure>';

    doc.body.appendChild(lb);
    lbImg = lb.querySelector('.lightbox__img');
    lbCap = lb.querySelector('.lightbox__cap');

    lb.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
    lb.addEventListener('click', function (e) {
      // Klik di latar (bukan di gambar) menutup lightbox.
      if (e.target === lb) closeLightbox();
    });
  }

  function lightboxIsOpen() { return !!lb && !lb.hidden; }

  function openLightbox(btn) {
    if (!lb) buildLightbox();
    lastTrigger = btn;

    var img = btn.querySelector('img');
    lbImg.src = btn.getAttribute('data-full') || (img ? img.src : '');
    lbImg.alt = img ? img.alt : '';
    lbCap.textContent = btn.getAttribute('data-caption') || '';

    lb.hidden = false;
    doc.body.style.overflow = 'hidden';
    lb.querySelector('.lightbox__close').focus();
  }

  function closeLightbox() {
    if (!lightboxIsOpen()) return;
    lb.hidden = true;
    lbImg.src = '';
    doc.body.style.overflow = drawerIsOpen() ? 'hidden' : '';
    if (lastTrigger) { lastTrigger.focus(); lastTrigger = null; }
  }

  if (galleryGrid) {
    galleryGrid.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('.gallery__btn') : null;
      if (btn) openLightbox(btn);
    });
  }


  /* ==============================================================
     6. ESC — urutan prioritas
     Lightbox ditutup lebih dulu kalau keduanya terbuka bersamaan.
     ============================================================== */
  /* Focus trap. Tanpa ini, `aria-modal="true"` pada lightbox adalah
     klaim palsu: Tab tetap bisa keluar ke konten di belakang, dan
     pengguna keyboard/pembaca layar tersesat di halaman yang tidak
     terlihat. Berlaku untuk lightbox dan drawer mobile. */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), ' +
                  'select:not([disabled]), textarea:not([disabled]), ' +
                  '[tabindex]:not([tabindex="-1"])';

  function trapTab(container, e) {
    var all = container.querySelectorAll(FOCUSABLE);
    var list = [];
    Array.prototype.forEach.call(all, function (el) {
      // lewati yang tersembunyi; offsetParent null berarti tidak dirender
      if (el.offsetParent !== null || el === doc.activeElement) list.push(el);
    });
    if (!list.length) return;

    var first = list[0];
    var last  = list[list.length - 1];

    if (e.shiftKey && doc.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && doc.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  doc.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      if (lightboxIsOpen()) { closeLightbox(); return; }
      if (drawerIsOpen())   { closeDrawer(true); }
      return;
    }
    if (e.key !== 'Tab') return;
    // Lightbox lebih prioritas: kalau keduanya terbuka, ia yang mengurung.
    if (lightboxIsOpen()) { trapTab(lb, e); return; }
    if (drawerIsOpen() && nav) { trapTab(nav, e); }
  });


  /* ==============================================================
     6b. BACK TO TOP
     Muncul setelah satu layar penuh terlewati. Scroll-nya menghormati
     prefers-reduced-motion: mulus untuk yang tidak keberatan gerak,
     langsung lompat untuk yang keberatan.
     ============================================================== */
  var toTop = doc.getElementById('toTop');
  if (toTop) {
    var topTicking = false;
    var onTopScroll = function () {
      if (topTicking) return;
      topTicking = true;
      window.requestAnimationFrame(function () {
        toTop.classList.toggle('is-on', window.scrollY > window.innerHeight * 0.9);
        topTicking = false;
      });
    };
    window.addEventListener('scroll', onTopScroll, { passive: true });
    onTopScroll();

    toTop.addEventListener('click', function () {
      var reduce = window.matchMedia &&
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      // Kembalikan fokus ke awal halaman, bukan dibiarkan di tombol —
      // kalau tidak, pengguna keyboard masih "berada" di bawah.
      var skip = doc.querySelector('.skip-link');
      if (skip) skip.focus();
    });
  }


  /* ==============================================================
     7. TAHUN BERJALAN
     Mockup menulis "© 2024" secara permanen. Angka di HTML sudah
     berisi tahun yang benar saat file dibuat (crawler & LLM membaca
     HTML mentah), JS hanya menjaganya tetap terbarui.
     ============================================================== */
  var year = doc.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());


  /* ==============================================================
     8. LINK WHATSAPP
     Dipakai juga oleh booking.js (yang di-load setelah file ini).
     ============================================================== */
  window.buildWaLink = function (message) {
    if (typeof CONFIG === 'undefined' || typeof isPlaceholder !== 'function') return null;
    if (isPlaceholder(CONFIG.WA_NUMBER)) return null;

    var digits = String(CONFIG.WA_NUMBER).replace(/[^0-9]/g, '');
    if (!digits) return null;

    return 'https://wa.me/' + digits +
           (message ? '?text=' + encodeURIComponent(message) : '');
  };


  /* ==============================================================
     9. KONTAK DARI CONFIG
     Elemen kontak default-nya hidden. Hanya yang datanya sudah asli
     yang ditampilkan — lebih baik tidak ada tombol daripada tombol
     yang mengarah ke nomor yang tidak pernah ada.
     ============================================================== */
  function show(key) {
    Array.prototype.forEach.call(
      doc.querySelectorAll('[data-contact="' + key + '"]'),
      function (el) { el.hidden = false; }
    );
  }

  function setLink(id, href, text) {
    var el = doc.getElementById(id);
    if (!el) return;
    if (href) el.setAttribute('href', href);
    if (text) el.textContent = text;
  }

  function fillContacts() {
    if (typeof CONFIG === 'undefined' || typeof isPlaceholder !== 'function') return;

    var wa = window.buildWaLink('Hello, I would like to ask about a private chef booking in Bali.');
    if (wa) {
      show('wa');
      setLink('cWa', wa, isPlaceholder(CONFIG.WA_DISPLAY) ? 'Chat on WhatsApp' : CONFIG.WA_DISPLAY);
      setLink('fWa', wa, 'WhatsApp Me');

      var float = doc.getElementById('waFloat');
      if (float) { float.setAttribute('href', wa); float.hidden = false; }
    }

    if (!isPlaceholder(CONFIG.EMAIL)) {
      show('email');
      setLink('cEmail',  'mailto:' + CONFIG.EMAIL, CONFIG.EMAIL);
      setLink('fEmail2', 'mailto:' + CONFIG.EMAIL, 'Email');
    }

    if (!isPlaceholder(CONFIG.INSTAGRAM)) {
      var ig = String(CONFIG.INSTAGRAM).replace(/^@/, '');
      show('ig');
      setLink('cIg', 'https://instagram.com/' + ig, '@' + ig);
      setLink('fIg', 'https://instagram.com/' + ig, 'Instagram');
    }

    // TikTok & Facebook — sama polanya dengan Instagram: hanya tampil
    // kalau handle-nya sudah diisi di config.js.
    if (!isPlaceholder(CONFIG.TIKTOK)) {
      var tt = String(CONFIG.TIKTOK).replace(/^@/, '');
      show('tt');
      setLink('fTt', 'https://www.tiktok.com/@' + tt, 'TikTok');
    }

    if (!isPlaceholder(CONFIG.FACEBOOK)) {
      var fb = String(CONFIG.FACEBOOK).replace(/^@/, '');
      show('fb');
      setLink('fFb', 'https://www.facebook.com/' + fb, 'Facebook');
    }

    if (!isPlaceholder(CONFIG.SERVICE_AREA)) {
      show('area');
      var cArea = doc.getElementById('cArea');
      var fArea = doc.getElementById('fArea');
      if (cArea) cArea.textContent = CONFIG.SERVICE_AREA;
      if (fArea) fArea.textContent = CONFIG.SERVICE_AREA;
    }
  }

  fillContacts();

})();
