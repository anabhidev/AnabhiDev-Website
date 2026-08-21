// ================================================================
// MFB-IT — Miss Fish IT Daily Activity System
// Service Worker · PWA offline & update mechanism
// IT Department · Miss Fish Bali
// Version   : 1.0
// Generated : 21 August 2026, 21:14:44
// ================================================================
//
// NAMA FILE DI PROJECT CLOUDFLARE : sw.js (taruh di /itm-daily/sw.js)
//
// STRATEGI CACHE (PENTING — ini yang mencegah "kamu stuck di versi
// lama tanpa sadar", masalah paling umum di semua aplikasi PWA):
//
//   1. index.html   -> NETWORK-FIRST. Selalu coba ambil versi
//      TERBARU dari server dulu. Cache cuma dipakai kalau benar-
//      benar tidak ada koneksi sama sekali (offline).
//   2. Aset statis (ikon, manifest) -> CACHE-FIRST. Jarang berubah,
//      aman diambil dari cache biar cepat.
//
// CARA KERJA VERSI (SW_VERSION di bawah):
//   Setiap kali Wibawa dapat sw.js versi baru dari saya, SW_VERSION
//   di sini akan naik (v1 -> v2 -> dst). Browser mendeteksi file
//   sw.js berubah, men-download Service Worker baru, dan menyimpan
//   cache dengan nama BERBEDA (CACHE_NAME pakai SW_VERSION).
//   SW lama otomatis dibuang saat SW baru aktif (lihat 'activate').
//
// APA YANG WIBAWA PERLU LAKUKAN SETIAP UPDATE:
//   Kalau saya kasih sw.js versi baru, upload seperti biasa
//   (menimpa sw.js lama). Tidak perlu langkah tambahan — browser
//   otomatis mendeteksi dan menawarkan reload lewat banner yang
//   sudah dipasang di index.html.
// ================================================================

const SW_VERSION = 'v1';
const CACHE_NAME = 'mfbit-cache-' + SW_VERSION;

// Aset yang di-cache-first. HTML SENGAJA TIDAK dimasukkan di sini
// karena HTML pakai strategi network-first (lihat fetch handler).
const STATIC_ASSETS = [
  'manifest.json',
  'icons/icon-any-192.png',
  'icons/icon-any-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon-180.png',
  'icons/favicon-32.png',
  'icons/favicon-16.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // addAll akan gagal semua kalau salah SATU aset gagal di-fetch;
      // pakai Promise.allSettled supaya 1 ikon gagal tidak menggagalkan
      // instalasi SW secara keseluruhan.
      return Promise.allSettled(
        STATIC_ASSETS.map((url) => cache.add(url))
      );
    })
  );
  // Jangan langsung self.skipWaiting() di sini -- biarkan SW baru
  // menunggu dulu sampai user menekan tombol "Muat ulang" di banner,
  // supaya tab yang sedang aktif tidak tiba-tiba berubah tanpa user sadar.
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names
          .filter((name) => name.startsWith('mfbit-cache-') && name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => self.clients.claim())
  );
});

// Pesan dari halaman (index.html) untuk memaksa SW baru langsung aktif
// begitu user menekan tombol "Muat ulang" di banner update.
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Hanya tangani request GET untuk origin sendiri. Panggilan ke
  // Supabase Edge Function (domain lain) TIDAK disentuh SW ini —
  // biar selalu langsung ke jaringan, tidak pernah di-cache (data
  // task harus selalu real-time, bukan basi dari cache).
  if (req.method !== 'GET' || url.origin !== self.location.origin) {
    return;
  }

  const isHtmlRequest = req.mode === 'navigate' || url.pathname.endsWith('.html') || url.pathname.endsWith('/itm-daily/');

  if (isHtmlRequest) {
    // NETWORK-FIRST untuk HTML.
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // CACHE-FIRST untuk aset statis lain.
  event.respondWith(
    caches.match(req).then((cached) => cached || fetch(req))
  );
});
