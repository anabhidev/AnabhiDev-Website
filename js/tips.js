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
    var navEl = document.querySelector('.sticky-nav, .topnav');
    var navHeight = navEl ? navEl.offsetHeight + 12 : 88;
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

  // 5. Code & Command Copy Interactions (Editorial Luxury Experience)
  function copyTextToClipboard(text, onSuccess) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(onSuccess).catch(function () {
        fallbackCopy(text, onSuccess);
      });
    } else {
      fallbackCopy(text, onSuccess);
    }
  }

  function fallbackCopy(text, onSuccess) {
    var textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.warn('Copy failed:', err);
    }
    document.body.removeChild(textArea);
  }

  // Inject sleek copy buttons to .code-block and .handoff-box
  var copyableBlocks = document.querySelectorAll('.code-block, .handoff-box');
  copyableBlocks.forEach(function (block) {
    if (block.querySelector('.code-copy-btn')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy-btn';
    btn.setAttribute('aria-label', 'Salin teks ke clipboard');
    btn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Salin</span>';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var targetText = '';
      var pre = block.querySelector('pre');
      var handoffBody = block.querySelector('.handoff-body');
      if (pre) {
        targetText = pre.innerText || pre.textContent;
      } else if (handoffBody) {
        targetText = handoffBody.innerText || handoffBody.textContent;
      } else {
        targetText = block.innerText || block.textContent;
      }

      copyTextToClipboard(targetText.trim(), function () {
        btn.classList.add('copied');
        btn.innerHTML = '<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg><span>Tersalin!</span>';
        setTimeout(function () {
          btn.classList.remove('copied');
          btn.innerHTML = '<svg viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg><span>Salin</span>';
        }, 2000);
      });
    });

    block.appendChild(btn);
  });

  // Click to copy for .cmd-code snippets
  var cmdCodes = document.querySelectorAll('.cmd-code');
  cmdCodes.forEach(function (cmd) {
    cmd.title = 'Klik untuk menyalin command';
    cmd.addEventListener('click', function () {
      var text = (cmd.innerText || cmd.textContent || '').trim();
      copyTextToClipboard(text, function () {
        cmd.classList.add('copied');
        setTimeout(function () {
          cmd.classList.remove('copied');
        }, 2000);
      });
    });
  });
});
