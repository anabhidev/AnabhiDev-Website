/* ═══════════════════════════════════════════
   JAGADITA — tabs.js
   Dipakai hanya di our-approach.html.
   Dipisah dari HTML agar Content-Security-Policy
   bisa dipasang tanpa 'unsafe-inline' untuk script.
═══════════════════════════════════════════ */

(function () {
  const btns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  if (!btns.length || !panels.length) return;

  function activate(btn) {
    btns.forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
      b.setAttribute('tabindex', '-1');
    });
    panels.forEach(function (p) { p.classList.remove('active'); });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    btn.setAttribute('tabindex', '0');

    const target = document.getElementById(btn.getAttribute('aria-controls'));
    if (target) target.classList.add('active');
  }

  btns.forEach(function (btn, i) {
    btn.setAttribute('tabindex', btn.classList.contains('active') ? '0' : '-1');

    btn.addEventListener('click', function () { activate(btn); });

    // Navigasi keyboard panah kiri/kanan sesuai pola ARIA tabs
    btn.addEventListener('keydown', function (e) {
      let next = null;
      if (e.key === 'ArrowRight') next = btns[(i + 1) % btns.length];
      else if (e.key === 'ArrowLeft') next = btns[(i - 1 + btns.length) % btns.length];
      else if (e.key === 'Home') next = btns[0];
      else if (e.key === 'End') next = btns[btns.length - 1];
      if (next) {
        e.preventDefault();
        activate(next);
        next.focus();
      }
    });
  });
})();
