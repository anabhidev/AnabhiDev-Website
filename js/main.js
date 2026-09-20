// ================================================================
// AnabhiDev-WEB — Master Interactive JavaScript
// Bilingual Engine · Mobile Navigation · Scroll Observer · Active Link
// Development · Anabhi Dev
// Version   : 2.0
// Generated : 20 September 2026, 19:53:00 WITA
// ================================================================

(function () {
  'use strict';

  var doc = document.documentElement;

  /* ── 1. Bilingual Language Switcher (EN / ID) ── */
  function setLanguage(lang) {
    try {
      localStorage.setItem('anabhidev_lang', lang);
    } catch (e) {}

    doc.lang = lang;

    // Update text content
    var nodes = document.querySelectorAll('[data-' + lang + ']');
    for (var i = 0; i < nodes.length; i++) {
      var content = nodes[i].getAttribute('data-' + lang);
      if (content !== null) {
        nodes[i].innerHTML = content;
      }
    }

    // Update accessible labels
    var labeledNodes = document.querySelectorAll('[data-' + lang + '-label]');
    for (var k = 0; k < labeledNodes.length; k++) {
      var label = labeledNodes[k].getAttribute('data-' + lang + '-label');
      if (label) {
        labeledNodes[k].setAttribute('aria-label', label);
      }
    }

    // Update toggle buttons state
    var btns = document.querySelectorAll('.lang button');
    for (var j = 0; j < btns.length; j++) {
      var btnLang = btns[j].getAttribute('data-lang');
      btns[j].setAttribute('aria-pressed', String(btnLang === lang));
    }
  }

  // Initialize saved or browser language
  var savedLang = null;
  try {
    savedLang = localStorage.getItem('anabhidev_lang');
  } catch (e) {}

  if (!savedLang) {
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    savedLang = browserLang.startsWith('id') ? 'id' : 'en';
  }
  if (savedLang === 'id' || savedLang === 'en') {
    setLanguage(savedLang);
  }

  var langBox = document.querySelector('.lang');
  if (langBox) {
    langBox.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-lang]');
      if (btn) {
        setLanguage(btn.getAttribute('data-lang'));
      }
    });
  }

  /* ── 2. Mobile Drawer Navigation ── */
  var burger = document.getElementById('burger');
  var mob = document.getElementById('mobmenu');

  if (burger && mob) {
    burger.addEventListener('click', function () {
      var isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      mob.classList.toggle('open', !isOpen);
    });

    mob.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        burger.setAttribute('aria-expanded', 'false');
        mob.classList.remove('open');
      }
    });
  }

  /* ── 3. Reveal on Scroll (Intersection Observer) ── */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    doc.classList.add('reveal-on');
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var revealItems = document.querySelectorAll('.reveal');
    for (var r = 0; r < revealItems.length; r++) {
      revealObserver.observe(revealItems[r]);
    }
  }

  /* ── 4. Active Anchor Nav Tracking ── */
  var hashLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  var navTargets = [];
  for (var m = 0; m < hashLinks.length; m++) {
    var targetEl = document.querySelector(hashLinks[m].getAttribute('href'));
    if (targetEl) {
      navTargets.push({ link: hashLinks[m], el: targetEl });
    }
  }

  if (navTargets.length && 'IntersectionObserver' in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          for (var n = 0; n < navTargets.length; n++) {
            navTargets[n].link.classList.toggle('on', navTargets[n].el === entry.target);
          }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    for (var p = 0; p < navTargets.length; p++) {
      navObserver.observe(navTargets[p].el);
    }
  }
})();

