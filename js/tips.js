// ================================================================
// AnabhiDev-TIPS — Master Interactive Script for Tips
// Reading Progress · Dynamic Scroll Spy · Smooth Nav · Token Visualizer
// Development · Anabhi Dev
// Version   : 2.1
// Generated : 21 September 2026, 07:45:00 WITA
// ================================================================

function setActive(el) {
  document.querySelectorAll('.nav-link').forEach(function(l) {
    l.classList.remove('active');
  });
  if (el) el.classList.add('active');
}

function scrollToSection(id, el) {
  var target = document.getElementById(id);
  if (target) {
    var navHeight = 64;
    var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: targetPos, behavior: 'smooth' });
  }
  document.querySelectorAll('.mobile-bottom-item').forEach(function(i) {
    i.classList.remove('active');
  });
  if (el) el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
  // 1. Create reading progress bar if not exists
  var progressEl = document.getElementById('readingProgress');
  if (!progressEl) {
    progressEl = document.createElement('div');
    progressEl.id = 'readingProgress';
    document.body.prepend(progressEl);
  }

  // 2. Discover all section targets dynamically from nav links
  var navLinks = Array.from(document.querySelectorAll('.nav-link[href^="#"]'));
  var sectionIds = navLinks.map(function (a) {
    return a.getAttribute('href').substring(1);
  }).filter(Boolean);

  // Fallback default list if no nav links
  if (sectionIds.length === 0) {
    sectionIds = ['intro', 'devices', 'model', 'prompt', 'newchat', 'projects', 'disclaimer'];
  }

  // 3. Scroll Handler for Progress & Dynamic Active Spy
  function onScroll() {
    var winScroll = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    if (progressEl) {
      progressEl.style.width = scrolled + '%';
    }

    // Active Section Spy
    var current = sectionIds[0] || 'intro';
    sectionIds.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && winScroll >= el.offsetTop - 100) {
        current = id;
      }
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      var targetId = link.getAttribute('href').substring(1);
      link.classList.toggle('active', targetId === current);
    });

    document.querySelectorAll('.mobile-bottom-item').forEach(function (item) {
      var onclickAttr = item.getAttribute('onclick') || '';
      var match = onclickAttr.match(/scrollToSection\(['"]([^'"]+)['"]/);
      if (match && match[1]) {
        item.classList.toggle('active', match[1] === current);
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 4. Token Bars & Visual Meter Animation
  var barFills = document.querySelectorAll('.token-bar-fill, .bar-fill, .model-bar-fill');
  if (window.IntersectionObserver) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var bar = entry.target;
          var w = bar.getAttribute('data-width') || bar.style.width;
          bar.setAttribute('data-width', w);
          bar.style.width = '0%';
          requestAnimationFrame(function () {
            setTimeout(function () {
              bar.style.width = w;
            }, 100);
          });
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.2 });

    barFills.forEach(function (bar) {
      observer.observe(bar);
    });
  }
});
