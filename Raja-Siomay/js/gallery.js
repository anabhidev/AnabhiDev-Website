// ================================================================
// AnabhiDev-RS — Raja Siomay Website
// HTML5 · CSS3 · Vanilla JS
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 29 August 2026, 23:50:00
// ----------------------------------------------------------------
// gallery.js — lightbox galeri. Hanya dimuat di halaman yang punya
// blok .gallery (beranda & tentang), bukan di semua halaman.
// ================================================================

(function () {
  'use strict';

  var box = document.getElementById('lightbox');
  var shots = Array.prototype.slice.call(document.querySelectorAll('.shot'));
  if (!box || !shots.length) return;

  var imgEl = box.querySelector('.lightbox__img');
  var capEl = box.querySelector('.lightbox__cap');
  var btnClose = box.querySelector('.lightbox__close');
  var btnPrev = box.querySelector('.lightbox__prev');
  var btnNext = box.querySelector('.lightbox__next');

  var index = 0;
  var lastFocus = null;

  // Unsplash melayani ukuran lewat parameter w= — naikkan untuk tampilan besar
  function bigSrc(src) { return src.replace(/([?&]w=)\d+/, '$11500'); }

  function show(i) {
    index = (i + shots.length) % shots.length;
    var shot = shots[index];
    var img = shot.querySelector('img');
    var cap = shot.querySelector('figcaption');
    imgEl.src = bigSrc(img.getAttribute('src'));
    imgEl.alt = img.getAttribute('alt') || '';
    capEl.textContent = cap ? cap.textContent : (img.getAttribute('alt') || '');
  }

  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.classList.add('is-open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    imgEl.removeAttribute('src');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  shots.forEach(function (shot, i) {
    shot.setAttribute('tabindex', '0');
    shot.setAttribute('role', 'button');
    var alt = shot.querySelector('img').getAttribute('alt') || 'foto';
    shot.setAttribute('aria-label', 'Perbesar foto: ' + alt);
    shot.addEventListener('click', function () { open(i); });
    shot.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
    });
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', function () { show(index - 1); });
  btnNext.addEventListener('click', function () { show(index + 1); });
  box.addEventListener('click', function (e) { if (e.target === box) close(); });

  document.addEventListener('keydown', function (e) {
    if (!box.classList.contains('is-open')) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'Tab') {
      // Fokus dikunci di dalam lightbox selama terbuka
      var focusables = [btnClose, btnPrev, btnNext];
      var pos = focusables.indexOf(document.activeElement);
      e.preventDefault();
      var next = e.shiftKey ? pos - 1 : pos + 1;
      focusables[(next + focusables.length) % focusables.length].focus();
    }
  });
})();
