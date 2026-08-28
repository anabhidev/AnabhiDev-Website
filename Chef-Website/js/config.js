// ================================================================
// AnabhiDev-BPC — Bali Private Chef & Culinary Consulting Website
// HTML5 · Vanilla CSS · Vanilla JavaScript
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 28 August 2026, 01:09:30
// ----------------------------------------------------------------
// SATU-SATUNYA tempat data klien disimpan.
//
// 🔴 Semua nilai bertanda PLACEHOLDER_ belum dikonfirmasi klien.
//    DILARANG mengarang isinya. Begitu data asli masuk, ganti di
//    file ini saja — tidak ada satu pun nomor/email/nama yang
//    ditulis langsung di file HTML.
//
// Daftar lengkap yang masih ditunggu ada di STATUS.md bagian 4.
// ================================================================

var CONFIG = {

  // ---- Identitas brand ------------------------------------------
  // Nama di mockup chef. Belum dikonfirmasi sebagai nama final.
  BRAND_NAME  : 'Bali Private Chef',
  BRAND_TAG   : 'Culinary Experience',
  CHEF_NAME   : 'PLACEHOLDER_NAMA_CHEF',

  // ---- Kontak ---------------------------------------------------
  // Format nomor: kode negara tanpa "+" dan tanpa spasi (dipakai wa.me).
  // Nomor di mockup (+62 812-3456-7890) adalah nomor contoh, BUKAN
  // nomor asli — jangan dipakai.
  WA_NUMBER   : 'PLACEHOLDER_WA',          // contoh isi benar: '628123456789'
  WA_DISPLAY  : 'PLACEHOLDER_WA_TAMPIL',   // contoh isi benar: '+62 812-3456-789'
  EMAIL       : 'PLACEHOLDER_EMAIL',
  INSTAGRAM   : 'PLACEHOLDER_IG',          // tanpa "@"
  SERVICE_AREA: 'PLACEHOLDER_AREA',        // mis. 'Seminyak · Canggu · Uluwatu'

  // ---- Website --------------------------------------------------
  // Dipakai untuk canonical, og:url, dan sitemap.xml.
  // Selama masih placeholder, canonical belum boleh dianggap final.
  SITE_URL    : 'PLACEHOLDER_DOMAIN',      // mis. 'https://baliprivatechef.com'

  // ---- Bukti sosial ---------------------------------------------
  // null = belum ada / belum dikonfirmasi = section-nya TIDAK dirender.
  // Mockup memasang badge TripAdvisor dengan rating, padahal belum
  // tentu profilnya ada. PRD bagian 23.3: bukti hanya kalau terverifikasi.
  TRIPADVISOR_URL: null,
  GOOGLE_MAPS_URL: null,
  TESTIMONIALS   : [],   // kosong = section testimoni tidak ditampilkan

  // ---- Layanan --------------------------------------------------
  // Diambil dari mockup chef. Wajib dikonfirmasi ke chef mana yang
  // benar-benar ditawarkan sebelum live — PRD bagian 11 & 25.
  SERVICES: [
    { id: 'villa-dining',   label: 'On Villa Dining'  },
    { id: 'private-bbq',    label: 'Private BBQ'      },
    { id: 'catering',       label: 'Catering'         },
    { id: 'cooking-class',  label: 'Cooking Class'    },
    { id: 'special-events', label: 'Special Events'   },
    { id: 'consulting',     label: 'Culinary Consulting' },
    { id: 'other',          label: 'Other'            }
  ]
};


// ================================================================
// Penanda placeholder
// ----------------------------------------------------------------
// Dipakai komponen lain untuk memutuskan: tampilkan tombol, atau
// diam saja. Lebih baik tombol WhatsApp tidak muncul daripada
// muncul tapi mengarah ke nomor yang tidak ada.
// ================================================================

/**
 * Apakah sebuah nilai config masih placeholder / kosong.
 * @param   {*} value
 * @returns {boolean}
 */
function isPlaceholder(value) {
  if (value === null || value === undefined || value === '') return true;
  return typeof value === 'string' && value.indexOf('PLACEHOLDER_') === 0;
}

/**
 * Nilai config kalau sudah diisi, atau fallback kalau masih placeholder.
 * @param   {*} value
 * @param   {*} fallback
 * @returns {*}
 */
function configOr(value, fallback) {
  return isPlaceholder(value) ? fallback : value;
}


// Peringatan saat development. Hanya jalan di localhost/file://,
// jadi tidak pernah muncul di console pengunjung asli.
(function warnPlaceholders() {
  var host    = window.location.hostname;
  var isLocal = host === '' || host === 'localhost' || host === '127.0.0.1';
  if (!isLocal) return;

  var pending = [];
  for (var key in CONFIG) {
    if (!Object.prototype.hasOwnProperty.call(CONFIG, key)) continue;
    if (isPlaceholder(CONFIG[key])) pending.push(key);
  }
  if (pending.length) {
    console.warn(
      '[AnabhiDev-BPC] ' + pending.length + ' data klien masih placeholder:\n  ' +
      pending.join(', ') +
      '\n  Isi di js/config.js sebelum deploy. Lihat STATUS.md bagian 4.'
    );
  }
})();
