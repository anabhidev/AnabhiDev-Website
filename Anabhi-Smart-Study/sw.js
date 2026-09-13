// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// Progressive Web App · Service Worker · Cache & Offline Engine
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 09:37:00
// ================================================================

var CACHE_VERSION = 'anabhidev-smart-study-v2-8';

var PRECACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/base.css',
  './css/components.css',
  './css/math.css',
  './css/geography.css',
  './css/responsive.css',
  './js/bundle.js',
  './js/app.js',
  './js/state.js',
  './js/store.js',
  './js/data/i18n.js',
  './js/engine/math-engine.js',
  './js/engine/geo-engine.js',
  './js/engine/tts-engine.js',
  './js/engine/audio-fx.js',
  './js/components/lks-modal.js',
  './js/components/sidebar.js',
  './js/components/topbar.js',
  './js/components/subject-view.js',
  './js/components/lesson-view.js',
  './js/components/challenge-view.js',
  './js/components/progress-view.js',
  './js/components/quiz-runner.js',
  './js/components/video-modal.js',
  './js/data/subjects.js',
  './js/data/math-data.js',
  './js/data/geo-data.js',
  './js/data/bahasa-indonesia.js',
  './js/data/bahasa-inggris.js',
  './js/data/pancasila.js',
  './js/data/bahasa-bali.js',
  './js/data/seni-rupa.js',
  './js/data/pjok.js',
  './js/data/agama.js',
  './js/data/kokurikuler.js',
  './js/data/globe-paths.js',
  './js/data/map-vector-data.js',
  './assets/favicon.svg',
  './assets/icon-192-2.png',
  './assets/icon-512-2.png',
  './assets/icon-512-maskable-2.png',
  './assets/img/earth_daymap.jpg',
  './assets/img/earth_political.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (c) {
      return Promise.all(
        PRECACHE.map(function (u) {
          return c.add(new Request(u, { cache: 'reload' })).catch(function (err) {
            console.warn('[SW] Precache item failed:', u, err);
          });
        })
      );
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (k) {
          if (k !== CACHE_VERSION) {
            return caches.delete(k);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  var isDoc = req.mode === 'navigate' ||
              (req.headers.get('accept') || '').indexOf('text/html') !== -1;

  if (isDoc) {
    // Dokumen HTML: Network-first, cache fallback saat offline
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) {
          c.put(req, copy);
        });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match('./index.html') || caches.match('/');
        });
      })
    );
    return;
  }

  // Aset statis & scripts: Cache-first
  e.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) {
            c.put(req, copy);
          });
        }
        return res;
      }).catch(function () {
        // Safe fallback jika offline dan resource belum di-cache
        return null;
      });
    })
  );
});
