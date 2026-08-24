// ================================================================
// AnabhiDev-DELLAWEB — Della Spa Production Website
// Vanilla JavaScript · IntersectionObserver · requestAnimationFrame · GA4 gtag.js
// Development · Anabhi Dev
// Version   : 1.7
// Generated : 24 August 2026, 06:59:56
// ----------------------------------------------------------------
// Satu file untuk 10 halaman. Setiap modul mengecek dulu apakah
// elemennya ada, jadi aman dipanggil di halaman mana pun.
// ================================================================

(function () {
  'use strict';

  var CONFIG = {
    WA_NUMBER   : '6281236109511',
    WA_GREETING : 'Halo Della Spa 👋 Saya ingin booking treatment.',
    GA4_ID      : 'G-XXXXXXXXXX',   // PLACEHOLDER — ganti sebelum launch
    FADE_DELAY  : 1200,             // jeda setelah window.load sebelum ambil gambar 2 & 3
    FADE_EVERY  : 6500,
    WA_SHOW_AT  : 400,
    MAP_MARGIN  : '300px'           // peta dimuat saat tinggal 300px lagi masuk layar
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }


  // ==============================================================
  // 1. NAV — tandai halaman aktif.
  // Markup nav 100% identik di 10 file supaya sync-nav aman;
  // status aktif ditentukan di sini, bukan di-hardcode per halaman.
  // ==============================================================
  function markActiveNav() {
    var here = location.pathname.split('/').pop() || 'index.html';
    $$('[data-nav] a').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop();
      if (href && href === here) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }


  // ==============================================================
  // 2. DRAWER MOBILE
  // ==============================================================
  function initDrawer() {
    var burger = $('[data-burger]'), drawer = $('[data-drawer]'), overlay = $('[data-overlay]');
    if (!burger || !drawer || !overlay) return;

    function open() {
      drawer.classList.add('is-open');
      overlay.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var first = $('a, button', drawer);
      if (first) first.focus();
    }

    function close() {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      burger.focus();                      // fokus dikembalikan, tidak hilang
    }

    burger.addEventListener('click', function () {
      burger.getAttribute('aria-expanded') === 'true' ? close() : open();
    });
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });

    // Fokus tidak boleh lolos keluar drawer
    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var items = $$('a, button', drawer).filter(function (el) { return el.offsetParent !== null; });
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    $$('a', drawer).forEach(function (a) { a.addEventListener('click', close); });
  }


  // ==============================================================
  // 3. TABS
  // ==============================================================
  function initTabs() {
    $$('[role="tablist"]').forEach(function (list) {
      var tabs = $$('[role="tab"]', list);

      function select(tab) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', on ? 'true' : 'false');
          t.setAttribute('tabindex', on ? '0' : '-1');
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
      }

      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
          if (e.key === 'ArrowLeft')  next = tabs[(i - 1 + tabs.length) % tabs.length];
          if (e.key === 'Home')       next = tabs[0];
          if (e.key === 'End')        next = tabs[tabs.length - 1];
          if (next) { e.preventDefault(); select(next); next.focus(); }
        });
      });
    });
  }


  // ==============================================================
  // 4. SCROLL REVEAL — sekali jalan lalu unobserve
  // ==============================================================
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      // Tidak menambah kelas reveal-on sama sekali → CSS default
      // berlaku (terlihat). Ini juga jalur aman kalau JS berhenti
      // di tengah eksekusi sebelum baris ini tercapai.
      return;
    }

    document.documentElement.classList.add('reveal-on');

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = Math.min(parseInt(el.dataset.revealIndex || 0, 10), 5) * 70;
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }


  // ==============================================================
  // 5. HERO CROSS-FADE TERTUNDA
  // Gambar 1 = elemen LCP. Gambar 2 & 3 baru diambil setelah
  // window.load + jeda, jadi tidak ikut menghitung LCP.
  // ==============================================================
  function initHeroFade() {
    var media = $('[data-hero-media]');
    if (!media) return;

    var slides = $$('img', media);
    if (slides.length) slides[0].classList.add('is-active');
    if (slides.length < 2 || reduceMotion) return;

    window.addEventListener('load', function () {
      setTimeout(function () {
        slides.slice(1).forEach(function (img) {
          if (img.dataset.src && !img.src) img.src = img.dataset.src;
        });

        var i = 0, timer = null;

        function step() {
          if (document.hidden) return;
          slides[i].classList.remove('is-active');
          i = (i + 1) % slides.length;
          slides[i].classList.add('is-active');
        }
        function start() { if (!timer) timer = setInterval(step, CONFIG.FADE_EVERY); }
        function stop()  { clearInterval(timer); timer = null; }

        start();
        document.addEventListener('visibilitychange', function () {
          document.hidden ? stop() : start();     // hemat baterai & INP
        });
      }, CONFIG.FADE_DELAY);
    });
  }


  // ==============================================================
  // 6. TOMBOL WHATSAPP MENGAMBANG — scroll di-throttle pakai rAF
  // ==============================================================
  function initWaFloat() {
    var wa = $('[data-wa-float]');
    if (!wa) return;
    var ticking = false;

    function update() {
      wa.classList.toggle('is-visible', window.scrollY > CONFIG.WA_SHOW_AT);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }


  // ==============================================================
  // 7. PENYUSUN PESAN WHATSAPP
  // Tidak ada form, tidak ada data yang disimpan di mana pun.
  // ==============================================================
  function buildWaLink(fields) {
    var lines = [CONFIG.WA_GREETING];
    Object.keys(fields).forEach(function (k) {
      if (fields[k]) lines.push(k + ': ' + fields[k]);
    });
    return 'https://wa.me/' + CONFIG.WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function initWaLinks() {
    $$('[data-wa]').forEach(function (el) {
      el.setAttribute('href', buildWaLink({
        'Treatment': el.dataset.treatment || '',
        'Harga'    : el.dataset.price || ''
      }));
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener');
    });
  }


  // ==============================================================
  // 8. PETA — dimuat otomatis saat mendekati layar.
  // Bagi pengunjung terasa selalu ada; biayanya nol untuk orang
  // yang tidak pernah scroll sampai bawah.
  // ==============================================================
  function initMap() {
    var facade = $('[data-map-facade]');
    if (!facade) return;

    var loaded = false;
    function load() {
      if (loaded) return;
      loaded = true;
      var src = facade.dataset.mapSrc;
      if (!src) return;
      var frame = document.createElement('iframe');
      frame.src = src;
      frame.loading = 'lazy';
      frame.title = 'Peta lokasi Della Spa, Jl. Karma Kandara No.41, Ungasan, Bali';
      frame.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      frame.setAttribute('allowfullscreen', '');
      facade.innerHTML = '';
      facade.appendChild(frame);
      track('map_load', {});
    }

    var btn = $('button', facade);
    if (btn) btn.addEventListener('click', load);   // fallback kalau JS observer gagal

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { load(); io.disconnect(); }
      }, { rootMargin: CONFIG.MAP_MARGIN });
      io.observe(facade);
    }
  }


  // ==============================================================
  // 9. COOKIE CONSENT
  // GA4 berbasis cookie, jadi gtag baru menyala setelah disetujui.
  // Pilihan disimpan di localStorage — bukan cookie, bukan data pribadi.
  // ==============================================================
  function initConsent() {
    var bar = $('[data-consent]');
    if (!bar) return;

    var KEY = 'della-consent';
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}

    if (saved === 'granted') { loadGA(); return; }
    if (saved === 'denied') return;

    setTimeout(function () { bar.classList.add('is-open'); }, 900);

    $$('[data-consent-action]', bar).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ok = btn.dataset.consentAction === 'accept';
        try { localStorage.setItem(KEY, ok ? 'granted' : 'denied'); } catch (e) {}
        bar.classList.remove('is-open');
        if (ok) loadGA();
      });
    });
  }

  function loadGA() {
    if (CONFIG.GA4_ID.indexOf('XXXX') > -1) return;   // placeholder: jangan muat
    if (window.gtag) return;

    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', CONFIG.GA4_ID, { anonymize_ip: true });
  }


  // ==============================================================
  // 10. EVENT TRACKING — aman dipanggil meski gtag tidak ada
  // ==============================================================
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  function initTracking() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      var where = a.dataset.loc || 'unknown';

      if (href.indexOf('wa.me') > -1) {
        track('wa_click', { location: where, treatment: a.dataset.treatment || '' });
      } else if (href.indexOf('tel:') === 0) {
        track('call_click', { location: where });
      } else if (href.indexOf('google.com/maps') > -1 || href.indexOf('maps.app') > -1) {
        track('map_click', { location: where });
      }
    });

    $$('[role="tab"]').forEach(function (t) {
      t.addEventListener('click', function () {
        track('price_tab', { category: t.textContent.trim() });
      });
    });
  }


  // ==============================================================
  // 11. TOGGLE BAHASA EN/ID
  // Default EN (keputusan klien: mayoritas turis asing). Pilihan
  // disimpan di localStorage supaya konsisten antar halaman saat
  // pengunjung berpindah — bukan reset ke EN tiap ganti halaman.
  //
  // <title> dan meta description/OG tidak bisa disembunyikan lewat
  // atribut `hidden` (bukan elemen visual berpasangan) — nilainya
  // dibaca dari data-title-en/data-title-id dkk yang ditulis di
  // <html>, satu sumber per halaman, dekat root supaya gampang
  // ditemukan saat audit.
  // ==============================================================
  function applyLang(lang) {
    var html = document.documentElement;
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);

    $$('[data-lang-en]').forEach(function (el) { el.hidden = (lang !== 'en'); });
    $$('[data-lang-id]').forEach(function (el) { el.hidden = (lang !== 'id'); });

    // Placeholder <input> tidak bisa disembunyikan lewat `hidden`
    // (bukan elemen visual berpasangan) — di-swap langsung via atribut.
    var phKey = 'placeholder' + (lang === 'id' ? 'Id' : 'En');
    $$('[data-placeholder-en]').forEach(function (el) {
      if (el.dataset[phKey]) el.setAttribute('placeholder', el.dataset[phKey]);
    });

    var titleKey = 'title' + (lang === 'id' ? 'Id' : 'En');
    var descKey  = 'desc'  + (lang === 'id' ? 'Id' : 'En');
    if (html.dataset[titleKey]) document.title = html.dataset[titleKey];
    if (html.dataset[descKey]) {
      var descTag = $('meta[name="description"]');
      if (descTag) descTag.setAttribute('content', html.dataset[descKey]);
    }

    $$('[data-lang-toggle] button').forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
  }

  function initLangToggle() {
    var toggles = $$('[data-lang-toggle]');
    if (!toggles.length) return;

    var KEY = 'della-lang';
    var saved = null;
    try { saved = localStorage.getItem(KEY); } catch (e) {}
    var lang = (saved === 'id' || saved === 'en') ? saved : 'en';   // default EN

    applyLang(lang);

    toggles.forEach(function (group) {
      $$('button', group).forEach(function (btn) {
        btn.addEventListener('click', function () {
          var next = btn.dataset.lang;
          try { localStorage.setItem(KEY, next); } catch (e) {}
          applyLang(next);
          track('lang_switch', { language: next });
        });
      });
    });
  }


  // ==============================================================
  // STATUS PILL — "Open now / Closed", dihitung dari jam WITA
  // (Asia/Makassar), BUKAN jam device pengunjung. Turis dari
  // Australia/Eropa device-nya beda zona waktu — kalau pakai jam
  // lokal browser, status bisa salah total.
  //
  // FALLBACK WAJIB: elemen [data-status-pill] sudah punya teks jam
  // buka biasa (bukan klaim Open/Closed) tertulis statis di HTML
  // lewat [data-status-fallback]. Kalau Intl.DateTimeFormat gagal
  // (browser sangat lawas) atau terjadi error apa pun, fungsi ini
  // berhenti tanpa mengubah apa pun — teks fallback tetap tampil
  // apa adanya. Tidak pernah menampilkan status yang salah.
  function initStatusPill() {
    var pills = $$('[data-status-pill]');
    if (!pills.length) return;

    var hourWITA;
    try {
      var fmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Makassar', hour: 'numeric', hour12: false
      });
      hourWITA = parseInt(fmt.format(new Date()), 10);
    } catch (e) {
      return; // gagal hitung jam WITA — biarkan fallback HTML apa adanya
    }
    if (isNaN(hourWITA)) return;

    var isOpen = hourWITA >= 10 && hourWITA < 21;
    var stateClass = isOpen ? 'status-pill--open' : 'status-pill--closed';
    var textEn = isOpen ? 'Open now' : 'Closed now';
    var textId = isOpen ? 'Buka sekarang' : 'Tutup sekarang';

    pills.forEach(function (pill) {
      pill.classList.remove('status-pill--open', 'status-pill--closed');
      pill.classList.add(stateClass);
      pill.innerHTML =
        '<span data-lang-en>' + textEn + '</span>' +
        '<span data-lang-id hidden>' + textId + '</span>';
      pill.removeAttribute('data-status-fallback');
    });

    // Elemen baru dari innerHTML di atas butuh sinkronisasi ulang
    // dengan toggle bahasa aktif saat ini (kalau pengunjung sudah
    // pernah pilih ID sebelum halaman ini reload/dimuat).
    var currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    applyLang(currentLang);
  }


  // ==============================================================
  // GALLERY — filter kategori + lightbox (gallery.html saja, fungsi
  // ini no-op otomatis di halaman lain karena elemen tidak ada).
  function initGalleryFilter() {
    var mosaic = $('[data-gal-mosaic]');
    var btns = $$('[data-gal-filter]');
    if (!mosaic || !btns.length) return;

    var items = $$('.gal-item', mosaic);

    function applyFilter(cat) {
      items.forEach(function (item) {
        var show = (cat === 'all') || (item.dataset.galCat === cat);
        item.style.display = show ? '' : 'none';
      });
      btns.forEach(function (b) {
        b.setAttribute('aria-pressed', b.dataset.galFilter === cat ? 'true' : 'false');
      });
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        applyFilter(b.dataset.galFilter);
        track('gallery_filter', { category: b.dataset.galFilter });
      });
    });
  }

  function initGalleryLightbox() {
    var dialog = $('[data-gal-lightbox]');
    var mosaic = $('[data-gal-mosaic]');
    if (!dialog || !mosaic) return;

    var imgEl = $('[data-gal-lightbox-img]', dialog);
    var closeBtn = $('[data-gal-lightbox-close]', dialog);
    var tiles = $$('.gal-item', mosaic);
    var current = -1;

    function openAt(i) {
      if (i < 0 || i >= tiles.length) return;
      current = i;
      var srcImg = $('img', tiles[i]);
      if (!srcImg) return;
      // Resolusi lebih besar untuk lightbox — ganti param w= saja,
      // bukan hardcode URL baru, supaya tetap sinkron dengan foto tile.
      imgEl.src = srcImg.src.replace(/w=\d+/, 'w=1600').replace(/q=\d+/, 'q=82');
      imgEl.alt = srcImg.alt;
      if (typeof dialog.showModal === 'function') dialog.showModal();
      track('gallery_lightbox_open', { index: i });
    }

    tiles.forEach(function (tile, i) {
      tile.style.cursor = 'zoom-in';
      tile.setAttribute('tabindex', '0');
      tile.setAttribute('role', 'button');
      tile.addEventListener('click', function () { openAt(i); });
      tile.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openAt(i); }
      });
    });

    function close() { if (dialog.open) dialog.close(); }
    if (closeBtn) closeBtn.addEventListener('click', close);

    // Klik di area backdrop (di luar <img>) menutup dialog.
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) close();
    });

    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') return; // <dialog> native sudah menangani Esc
      var visible = tiles.filter(function (t) { return t.style.display !== 'none'; });
      var idx = visible.indexOf(tiles[current]);
      if (e.key === 'ArrowRight' && idx > -1) {
        var next = visible[(idx + 1) % visible.length];
        openAt(tiles.indexOf(next));
      } else if (e.key === 'ArrowLeft' && idx > -1) {
        var prev = visible[(idx - 1 + visible.length) % visible.length];
        openAt(tiles.indexOf(prev));
      }
    });
  }


  // ==============================================================
  function init() {
    markActiveNav();
    initDrawer();
    initTabs();
    initReveal();
    initHeroFade();
    initWaFloat();
    initWaLinks();
    initMap();
    initConsent();
    initTracking();
    initLangToggle();
    initStatusPill();
    initGalleryFilter();
    initGalleryLightbox();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.DellaWA = { build: buildWaLink, number: CONFIG.WA_NUMBER };

})();
