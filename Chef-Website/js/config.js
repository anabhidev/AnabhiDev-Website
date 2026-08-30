// ================================================================
// AnabhiDev-BPC — Nature Private Chef Website
// HTML5 · Vanilla CSS · Vanilla JavaScript
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 30 August 2026, 13:54:30
// ----------------------------------------------------------------
// SATU-SATUNYA tempat data klien disimpan.
//
// Data di bawah ini sudah DIKONFIRMASI dari kartu nama Chef Galung
// dan katalog menu (flipbook), diserahkan user 30-08-2026.
// Yang masih bertanda PLACEHOLDER_ belum ada datanya.
//
// Daftar lengkap yang masih ditunggu ada di STATUS.md bagian 4.
// ================================================================

var CONFIG = {

  // ---- Identitas brand ------------------------------------------
  BRAND_NAME  : 'Nature Private Chef',
  BRAND_TAG   : 'Private Chef · Bali',
  CHEF_NAME   : 'Chef Galung',
  TAGLINE     : 'Taste the Difference, Experience the Care.',

  // ---- Kontak ---------------------------------------------------
  // Format nomor: kode negara tanpa "+" dan tanpa spasi (dipakai wa.me).
  WA_NUMBER   : '6281236321113',
  WA_DISPLAY  : '+62 812-3632-1113',
  EMAIL       : 'naturesprivatechef@gmail.com',
  INSTAGRAM   : 'natures_privatechef',   // tanpa "@"
  TIKTOK      : 'natures_privatechef',   // tanpa "@"
  FACEBOOK    : 'natures_privatechef',
  SERVICE_AREA: 'Uluwatu · Bali',

  // ---- Website --------------------------------------------------
  // Dipakai untuk canonical, og:url, dan sitemap.xml.
  // Domain belum dibeli — lihat STATUS.md bagian 3.
  SITE_URL    : 'PLACEHOLDER_DOMAIN',

  // ---- Bukti sosial ---------------------------------------------
  // null / kosong = section-nya TIDAK dirender.
  TRIPADVISOR_URL: null,
  GOOGLE_MAPS_URL: null,
  TESTIMONIALS   : [],

  // ---- Layanan --------------------------------------------------
  // Diselaraskan dengan kartu nama Chef Galung 30-08-2026:
  // "We serve: Breakfast · Lunch · Dinner · Cooking Class · BBQ Party".
  // Floating Breakfast dipisah karena punya paket & harga sendiri.
  SERVICES: [
    { id: 'floating-breakfast', label: 'Floating Breakfast' },
    { id: 'breakfast',          label: 'Breakfast'          },
    { id: 'lunch',              label: 'Lunch'              },
    { id: 'dinner',             label: 'Dinner'             },
    { id: 'cooking-class',      label: 'Cooking Class'      },
    { id: 'bbq-party',          label: 'BBQ Party'          },
    { id: 'other',              label: 'Other'              }
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
