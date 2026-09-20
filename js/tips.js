// ================================================================
// AnabhiDev-TIPS — Master Interactive Script for Tips
// Navigation Controller · Smooth Scroll · Mobile Tabs · Token Visualizer
// Development · Anabhi Dev
// Version   : 2.0
// Generated : 20 September 2026, 19:53:00 WITA
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
    target.scrollIntoView({ behavior: 'smooth' });
  }
  document.querySelectorAll('.mobile-bottom-item').forEach(function(i) {
    i.classList.remove('active');
  });
  if (el) el.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
  // Update active nav on scroll
  var sections = ['intro', 'devices', 'model', 'prompt', 'newchat', 'projects', 'disclaimer'];
  
  window.addEventListener('scroll', function () {
    var current = 'intro';
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 90) {
        current = id;
      }
    });

    document.querySelectorAll('.mobile-bottom-item').forEach(function (item, i) {
      if (sections[i]) {
        item.classList.toggle('active', sections[i] === current);
      }
    });

    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  });

  // Animate token bars
  document.querySelectorAll('.token-bar-fill').forEach(function (bar) {
    var originalWidth = bar.style.width;
    bar.style.width = '0%';
    setTimeout(function () {
      bar.style.width = originalWidth;
    }, 300);
  });
});

