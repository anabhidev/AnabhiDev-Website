// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Service Worker · Cache API
// Development · Anabhi Dev
// Version   : 3.1
// Generated : 9 September 2026, 08:55:40
// ================================================================
//
// Strategi (SOP Checklist Standar Website v1.9, kategori 18.5):
//   HTML  -> network-first  (selalu coba versi terbaru, cache hanya saat offline)
//   Aset  -> cache-first    (font, ikon, foto, emoji SVG)
// CACHE_VERSION WAJIB dinaikkan setiap kali berkas ini atau isi PRECACHE berubah.
// Lupa menaikkan = pengguna terkunci di versi lama dan tidak bisa diperbaiki
// dari jarak jauh selain meminta mereka membersihkan data aplikasi satu per satu.

var CACHE_VERSION = 'anabhi-smart-play-v5-10';  // header Version : 3.1

// BASE diturunkan dari lokasi sw.js itu sendiri, TIDAK dipatok mati.
// Produksi  -> /Anabhi-Smart-Play/
// Lokal     -> / (atau path mana pun tempat berkas ditaruh)
// Kalau dipatok mati, di lokal SELURUH precache 404 dan gagal DIAM-DIAM:
// aplikasi tetap terlihat jalan selama online, tapi offline-nya kosong.
var BASE = new URL('./', self.location.href).pathname;

// Emoji Twemoji yang benar-benar berubah jadi <img>.
//
// Catatan penting hasil audit: twemoji.parse() HANYA dipanggil saat load, tidak
// pernah dipanggil ulang sesudah renderQ(). Jadi emoji ISI SOAL (buah, bentuk,
// hewan, pola) selama ini tampil sebagai emoji bawaan sistem, BUKAN Twemoji —
// perilaku itu sengaja dipertahankan apa adanya di Phase 1.
// Yang perlu ikut offline hanyalah 25 emoji di markup statis <body>.
// Daftar ini diekstrak memakai library twemoji itu sendiri, setelah HTML entity
// di-decode (judul memakai &#x1F430; / &#x1F9AB; — kalau entity tidak di-decode,
// 🐰 dan 🦫 lolos dari daftar dan jadi gambar rusak saat offline).
// Termasuk 4 emoji PARTIKEL latar (1f4ab 💫, 1f319 🌙, 2604 ☄️, 1fa90 🪐):
// buildParticles() dipanggil SEBELUM parseEmoji() di DOMContentLoaded, jadi
// partikel awal ikut berubah jadi <img>. Sebelumnya keempatnya terlewat karena
// letaknya di dalam <script>, bukan di markup — akibatnya 4 request 404 tiap
// halaman dibuka (tersamarkan karena twemoji memasang alt = emoji aslinya).
// 1f30d 🌍 ditambahkan di v5.4 — ikon kartu "English Adventure". Sempat lolos
// dan jadi 404 di Chrome karena pemeriksaan emoji dulu membaca berkas simpanan
// yang basi, bukan mengekstrak ulang dari markup. Sekarang check.js mengekstrak
// langsung dari index.html + main.js, jadi kelalaian yang sama tidak terulang.
// v5.5 menambah 1f30d 🌍 (kartu English Adventure) dan 1f4da 📚 (tombol
// Belajar Kata). Keduanya ada di MARKUP, jadi ikut diubah parseEmoji() saat
// halaman dimuat. Layar Smart Card sengaja TIDAK di-parse (lihat cards.js),
// jadi emoji kosakata tidak butuh berkas SVG.
// check.js mengekstrak daftar ini ulang dari markup + berkas JS yang memanggil
// parseEmoji(), dengan komentar dibuang lebih dulu.
var EMOJI =
  "1f300 1f30d 1f319 1f31f 1f338 1f380 1f389 1f38a 1f3a8 1f3ae 1f3c6 1f430 1f4ab "+
  "1f4d6 1f4da 1f4e4 1f4f1 1f504 1f525 1f52c 1f680 1f989 1f9ab 1f9e9 1fa90 23f1 "+
  "2604 26a0 26a1 270d 2728 2b50 ";

// Cache-busting aset internal (SOP kat. 1). Angkanya WAJIB sama persis dengan
// yang ada di <link>/<script> di index.html — kalau beda, berkas diambil dua
// kali dan versi cache tidak pernah kena.
var V = '?v=20260909a';

var CSS = ['tokens', 'themes', 'screens', 'components']
  .map(function (n) { return 'css/' + n + '.css'; });

// Urutan tidak penting untuk precache, tapi daftarnya wajib LENGKAP —
// satu berkas terlewat = aplikasi gagal total saat offline, bukan sekadar jelek.
var JS = [
  'js/config.js',
  'js/questions/math.js', 'js/questions/fun.js', 'js/questions/bindo.js',
  'js/questions/bing.js', 'js/questions/eng.js', 'js/questions/story.js',
  'js/questions/sains.js', 'js/questions/seni.js',
  'js/questions/logika.js', 'js/questions/mix.js',
  'js/engine/session.js', 'js/engine/render.js', 'js/engine/finish.js',
  'js/services/db.js', 'js/services/hint.js', 'js/services/gas.js', 'js/engine/ui.js',
  'js/features/cards.js', 'js/features/story.js',
  'js/pwa/install.js', 'js/pwa/update.js', 'js/main.js'
];

var PRECACHE = [
  BASE,
  BASE + 'index.html',
  BASE + 'manifest.json',
  BASE + 'js/twemoji.min.js'
].concat(
  CSS.concat(JS).map(function (f) { return BASE + f + V; })
).concat([
  // Font WAJIB masuk PRECACHE (SOP 18.12) — kalau tidak, halaman offline
  // diam-diam memakai font bawaan sistem tanpa pesan error apa pun.
  BASE + 'assets/fonts/nunito-latin-var.woff2',
  BASE + 'assets/fonts/fredoka-one-latin.woff2',
  BASE + 'assets/Ana.webp',
  BASE + 'assets/Abhi.webp',
  BASE + 'assets/icon-192-1.png',
  BASE + 'assets/apple-touch-icon.png',
  BASE + 'assets/favicon.ico'
]).concat(
  EMOJI.trim().split(/\s+/).map(function (cp) {
    return BASE + 'assets/twemoji/svg/' + cp + '.svg';
  })
);
// Sengaja TIDAK diprecache: icon-512*.png dan splash-*.png.
// Keduanya diambil sistem operasi saat install (selalu online), bukan oleh
// halaman — memasukkannya hanya menambah ~1 MB tanpa manfaat offline.

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_VERSION).then(function (c) {
      // per-item (c.add), bukan addAll — satu URL gagal tidak menggagalkan
      // seluruh instalasi Service Worker.
      return Promise.all(PRECACHE.map(function (u) {
        return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE_VERSION) return caches.delete(k);   // buang cache lama
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Halaman minta versi baru langsung mengambil alih
self.addEventListener('message', function (e) {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;

  // Laporan ke Google Apps Script tidak pernah disentuh Service Worker —
  // biarkan lewat apa adanya supaya antrean offline di halaman yang menanganinya.
  if (req.url.indexOf('script.google.com') !== -1) return;

  // Hanya tangani permintaan satu domain (setelah self-host, tidak ada lagi
  // aset lintas domain — lihat SOP 18.12).
  if (new URL(req.url).origin !== self.location.origin) return;

  var isDoc = req.mode === 'navigate' ||
              (req.headers.get('accept') || '').indexOf('text/html') !== -1;

  if (isDoc) {
    // HTML: network-first — selalu coba versi terbaru, cache hanya saat offline
    e.respondWith(
      fetch(req).then(function (res) {
        var copy = res.clone();
        caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (hit) {
          return hit || caches.match(BASE + 'index.html') || caches.match(BASE);
        });
      })
    );
    return;
  }

  // Aset: cache-first
  e.respondWith(
    caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (res) {
        if (res && (res.status === 200 || res.type === 'opaque')) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return hit; });
    })
  );
});
