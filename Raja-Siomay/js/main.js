// ================================================================
// AnabhiDev-RS — Raja Siomay Website
// HTML5 · CSS3 · Vanilla JS
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 30 August 2026, 01:12:00
// ----------------------------------------------------------------
// main.js — perilaku yang dipakai di semua halaman: tema, navbar,
// drawer mobile, animasi masuk, count-up statistik, tombol ke atas,
// tahun footer, dan validasi form kontak.
//
// Catatan: skrip anti-FOUC (pembaca tema sebelum <body> dirender)
// sengaja ditaruh inline di <head> tiap halaman — file eksternal
// harus menunggu network, sehingga kilatan tema salah tetap terjadi.
// ================================================================

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ------------------------------------------------------------
  // SAKLAR MODE GELAP
  // Dimatikan atas permintaan klien (30 Agustus 2026). Seluruh kode
  // tema di bawah SENGAJA TIDAK DIHAPUS. Untuk menghidupkan kembali:
  //   1. ubah nilai ini jadi true
  //   2. ubah DARK_MODE jadi true di skrip inline <head> KELIMA halaman
  // Tombol .theme-toggle akan muncul sendiri begitu keduanya true.
  // ------------------------------------------------------------
  var DARK_MODE_ENABLED = false;

  // --------------------------------------------------------------
  // 1. TEMA — localStorage menimpa prefers-color-scheme
  // --------------------------------------------------------------
  var THEME_COLOR = { dark: '#0B0A08', light: '#FBF8F2' };

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', THEME_COLOR[theme]);
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap');
      btn.setAttribute('aria-pressed', String(theme === 'dark'));
    });
  }

  if (!DARK_MODE_ENABLED) {
    // Kunci ke mode terang dan sembunyikan tombolnya. Tombol tetap ada di
    // markup (beratribut hidden) supaya tinggal dilepas saat diaktifkan lagi.
    document.documentElement.setAttribute('data-theme', 'light');
    document.querySelectorAll('.theme-toggle').forEach(function (btn) { btn.hidden = true; });
  } else {
    document.querySelectorAll('.theme-toggle').forEach(function (btn) { btn.hidden = false; });
    applyTheme(currentTheme());
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!DARK_MODE_ENABLED) return;
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('rs-theme', next); } catch (e) { /* mode privat: abaikan */ }
    });
  });

  // Ikut berubah kalau pengguna belum pernah memilih manual
  var mq = window.matchMedia('(prefers-color-scheme: light)');
  var onScheme = function (e) {
    if (!DARK_MODE_ENABLED) return;
    var saved = null;
    try { saved = localStorage.getItem('rs-theme'); } catch (err) { /* abaikan */ }
    if (!saved) applyTheme(e.matches ? 'light' : 'dark');
  };
  if (mq.addEventListener) mq.addEventListener('change', onScheme);
  else if (mq.addListener) mq.addListener(onScheme);

  // --------------------------------------------------------------
  // 2. NAVBAR — status scrolled, di-throttle lewat requestAnimationFrame
  //    supaya tidak menumpuk long task (INP)
  // --------------------------------------------------------------
  var nav = document.querySelector('.nav');
  var toTop = document.querySelector('.to-top');
  var ticking = false;

  function onScrollFrame() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('is-scrolled', y > 40);
    if (toTop) toTop.classList.toggle('is-shown', y > 600);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(onScrollFrame);
  }, { passive: true });
  onScrollFrame();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  // --------------------------------------------------------------
  // 3. DRAWER MOBILE
  //    Hamburger di kanan, drawer masuk dari kanan — logo di kiri
  //    tidak pernah tertutup (SOP kategori 14).
  // --------------------------------------------------------------
  var burger = document.querySelector('.nav__burger');
  var drawer = document.getElementById('drawer');
  var scrim = document.querySelector('.drawer-scrim');
  var lastFocus = null;

  function openDrawer() {
    if (!drawer) return;
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    if (scrim) scrim.classList.add('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Drawer tertutup memakai visibility:hidden, dan elemen di dalamnya belum
    // bisa menerima fokus sampai gaya di-recalculate. Tanpa rAF, .focus() ini
    // diam-diam gagal dan fokus tertinggal di <body> — terbukti lewat uji.
    window.requestAnimationFrame(function () {
      var first = drawer.querySelector('.drawer__nav a');
      if (first) first.focus();
    });
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (scrim) scrim.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // SOP kategori 14: fokus WAJIB kembali ke tombol hamburger, bukan sekadar
    // ke elemen terakhir. Kalau drawer dibuka lewat skrip, lastFocus bisa saja
    // <body> yang tidak fokusabel — fokus lalu hilang begitu saja.
    if (burger) burger.focus();
    else if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  function drawerIsOpen() { return !!drawer && drawer.classList.contains('is-open'); }

  if (burger) burger.addEventListener('click', function () {
    drawerIsOpen() ? closeDrawer() : openDrawer();
  });
  if (scrim) scrim.addEventListener('click', closeDrawer);
  var drawerClose = document.querySelector('.drawer__close');
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (drawer) {
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeDrawer);
    });
  }

  // Esc menutup lightbox lebih dulu (kalau terbuka), baru drawer
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var lb = document.getElementById('lightbox');
    if (lb && lb.classList.contains('is-open')) return;   // ditangani js/gallery.js
    if (drawerIsOpen()) closeDrawer();
  });

  // Fokus tidak boleh lolos ke belakang drawer saat drawer terbuka
  document.addEventListener('focusin', function (e) {
    if (!drawerIsOpen()) return;
    if (drawer.contains(e.target) || (burger && burger.contains(e.target))) return;
    var first = drawer.querySelector('.drawer__nav a');
    if (first) first.focus();
  });

  // Kembali ke desktop saat drawer masih terbuka — tutup (debounce resize)
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 1000 && drawerIsOpen()) closeDrawer();
    }, 160);
  }, { passive: true });

  // --------------------------------------------------------------
  // 4. ANIMASI MASUK
  // --------------------------------------------------------------
  var reveals = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var revealObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        revealObs.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { revealObs.observe(el); });
  }

  // --------------------------------------------------------------
  // 5. COUNT-UP STATISTIK
  //    Angka final SUDAH tertulis di HTML supaya terbaca crawler &
  //    LLM; JS yang me-reset ke 0 lalu menaikkannya kembali.
  // --------------------------------------------------------------
  var counters = document.querySelectorAll('[data-count]');
  if (counters.length && !reduceMotion && 'IntersectionObserver' in window) {
    var countObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        countObs.unobserve(el);

        var target = parseInt(el.getAttribute('data-count'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        if (isNaN(target)) return;

        var duration = 1500;
        var start = null;
        el.textContent = '0' + suffix;

        var step = function (ts) {
          if (start === null) start = ts;
          var p = Math.min((ts - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased).toLocaleString('id-ID') + suffix;
          if (p < 1) window.requestAnimationFrame(step);
        };
        window.requestAnimationFrame(step);
      });
    }, { threshold: 0.45 });
    counters.forEach(function (el) { countObs.observe(el); });
  }

  // --------------------------------------------------------------
  // 6. TAHUN FOOTER
  // --------------------------------------------------------------
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  // --------------------------------------------------------------
  // 7. FORM KONTAK — validasi sisi klien untuk UX instan.
  //    Pesan diteruskan ke WhatsApp; tidak ada data yang dikirim
  //    ke server mana pun dari halaman ini.
  // --------------------------------------------------------------
  var form = document.getElementById('form-pesan');
  if (form) {
    var WA_NUMBER = form.getAttribute('data-wa') || '';

    var showError = function (field, message) {
      var wrap = field.closest('.field');
      if (!wrap) return;
      wrap.classList.toggle('is-invalid', !!message);
      var slot = wrap.querySelector('.field__error');
      if (slot) slot.textContent = message || '';
      field.setAttribute('aria-invalid', message ? 'true' : 'false');
    };

    var validate = function (field) {
      var v = field.value.trim();
      var label = field.getAttribute('data-label') || 'Kolom ini';
      if (field.required && !v) return label + ' belum diisi.';
      if (field.type === 'tel' && v && !/^[0-9+\-\s()]{8,20}$/.test(v)) {
        return 'Nomor WhatsApp hanya boleh angka, minimal 8 digit.';
      }
      if (field.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
        return 'Format email belum benar — contoh: nama@email.com';
      }
      return '';
    };

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('blur', function () { showError(field, validate(field)); });
      field.addEventListener('input', function () {
        if (field.closest('.field').classList.contains('is-invalid')) {
          showError(field, validate(field));
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
      var firstBad = null;

      fields.forEach(function (field) {
        var msg = validate(field);
        showError(field, msg);
        if (msg && !firstBad) firstBad = field;
      });

      if (firstBad) { firstBad.focus(); return; }

      var get = function (name) {
        var el = form.elements[name];
        return el ? el.value.trim() : '';
      };

      var lines = [
        'Halo Raja Siomay, saya ingin memesan.',
        '',
        'Nama    : ' + get('nama'),
        'WhatsApp: ' + get('telepon'),
        'Cabang  : ' + get('cabang'),
        'Pesanan : ' + get('pesanan')
      ];

      window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');

      var done = form.querySelector('.form-status');
      if (done) done.textContent = 'WhatsApp dibuka di tab baru. Kalau tidak terbuka, hubungi kami langsung di nomor cabang di samping.';
    });
  }
})();
