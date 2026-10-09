// ================================================================
// SERVICE WORKER — BINTANG JUARA STS 1 SD (UTS GANJIL 2026)
// Anabhi Dev · Target: Tablet iPad & Android Offline Learning
// Version : 2.3 (8 Subjects · 3,000 Questions Edition)
// ================================================================

const CACHE_NAME = 'sts-uts-2026-v2.3';
const STATIC_ASSETS = [
  './UTS-Ganjil-2026.html',
  './sts-matematika-kelas-1-sd.html',
  './sts-manifest.json',
  './assets/icon-sts-192.png',
  './assets/icon-sts-512.png',
  './assets/icon-sts-maskable.png',
  './assets/img/og-uts-ganjil-2026.jpg',
  './assets/img/og-uts-ganjil-2026.png',
  './assets/img/og-sts-matematika.jpg',
  './assets/img/og-sts-matematika.png',
  './assets/img/Ana.webp',
  './assets/img/Abhi.webp'
];

// Install Event — Cache Core Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching STS UTS 2026 PWA static assets');
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event — Clean Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME && (key.startsWith('sts-matematika-') || key.startsWith('sts-uts-'))) {
            console.log('[SW] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event — Cache-First for static assets, Network-First for HTML navigation with Cache Fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Ignore non-GET requests
  if (req.method !== 'GET') return;

  // For HTML documents: Stale-While-Revalidate or Network-First with Cache Fallback
  if (req.mode === 'navigate' || req.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((networkRes) => {
          if (networkRes.status === 200) {
            const resClone = networkRes.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          }
          return networkRes;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('./sts-matematika-kelas-1-sd.html')))
    );
    return;
  }

  // For assets (images, icons, manifest): Cache-First
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((networkRes) => {
        if (networkRes && networkRes.status === 200) {
          const resClone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        }
        return networkRes;
      }).catch(() => {
        // Fallback placeholder if offline
        return cached;
      });
    })
  );
});
