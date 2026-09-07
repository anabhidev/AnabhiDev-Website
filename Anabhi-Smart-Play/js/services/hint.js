// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Mesin hint lokal (deterministik) + hint AI opsional
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 7 September 2026, 15:58:10
// ================================================================
//
// Tangga hint 0-5 (PRD §16 · Master 2 §17):
//   0 tanpa hint · 1 petunjuk kecil · 2 uraian visual · 3 tuntunan langkah
//   4 penjelasan lengkap · 5 penjelasan untuk ORANG TUA
//
// 🔴 Level 5 TIDAK PERNAH ditampilkan ke anak — hanya ikut di laporan orang tua.
//
// 🔴 Mesin ini DETERMINISTIK dan bekerja 100% offline. Gemini hanya boleh
// MEMPERHALUS kalimat, tidak pernah menjadi sumbernya (PRD §7 baris 610:
// "If Gemini fails, the application MUST fall back to local hints").
// Karena itu urutannya: hint lokal dibuat DULU, baru AI diminta kalau ada
// internet. Bukan sebaliknya — kalau AI ditaruh di depan, anak menunggu
// jaringan hanya untuk mendapat petunjuk yang sebetulnya sudah ada di tablet.

var HINT_MAX_LEVEL = 5;

// ══════════════════════════════════════
// HINT LOKAL PER TIPE SOAL
// ══════════════════════════════════════
// Setiap fungsi mengembalikan array 6 kalimat (indeks = level 0-5).
// Indeks 0 selalu string kosong: "tanpa hint".
var HINT_LOKAL = {

  ops: function (q) {
    var t = q.q || '';
    var op = q.op;
    var nama = op === '+' ? 'menjumlah' : op === '-' ? 'mengurang' : 'mengali';
    return ['',
      'Coba baca lagi pelan-pelan: kita sedang ' + nama + '. 😊',
      'Pakai jari atau benda di sekitarmu untuk menghitung ya.',
      op === '+' ? 'Mulai dari angka pertama, lalu maju sebanyak angka kedua.'
                 : op === '-' ? 'Mulai dari angka pertama, lalu mundur sebanyak angka kedua.'
                 : 'Ingat, mengali itu menjumlah berulang.',
      'Soalnya ' + t + ' Jawabannya ' + q.o[q.a] + '.',
      'Anak masih perlu latihan ' + nama + '. Latih dengan benda nyata di rumah (kelereng, sendok) sebelum ke angka.'
    ];
  },

  seq: function (q) {
    return ['',
      'Lihat pola angkanya — naik berapa setiap langkah? 🤔',
      'Bandingkan dua angka yang bersebelahan, selisihnya sama.',
      'Tambahkan selisih itu ke angka sebelum kotak kosong.',
      'Angka yang hilang adalah ' + q.o[q.a] + '.',
      'Anak belum melihat pola bilangan. Latih berhitung loncat (2,4,6) sambil bertepuk.'
    ];
  },

  cmp: function (q) {
    return ['',
      'Mana yang lebih banyak? 😊',
      'Bayangkan dua tumpukan benda, mana yang lebih tinggi.',
      'Tanda ">" untuk lebih besar, "<" untuk lebih kecil.',
      'Jawabannya ' + q.o[q.ans] + '.',
      'Anak masih tertukar tanda > dan <. Ingatkan mulut buaya selalu makan yang lebih banyak.'
    ];
  },

  addvis: function (q) {
    return ['',
      'Hitung gambarnya satu per satu ya. 😊',
      'Hitung kelompok pertama dulu, baru kelompok kedua.',
      'Setelah itu gabungkan kedua kelompok.',
      'Semuanya ada ' + q.o[q.idx] + '.',
      'Anak perlu latihan menghitung gabungan. Pakai benda nyata dulu, jangan langsung angka.'
    ];
  },

  subvis: function (q) {
    return ['',
      'Yang dicoret berarti sudah hilang ya. 😊',
      'Hitung dulu semuanya, lalu hitung yang dicoret.',
      'Kurangi jumlah semula dengan yang dicoret.',
      'Sisanya ' + q.o[q.idx] + '.',
      'Anak perlu latihan pengurangan. Peragakan dengan mengambil benda dari tumpukan.'
    ];
  },

  bing: function (q) {
    var v = (typeof VOCAB_BY_ID !== 'undefined') ? VOCAB_BY_ID[vocabId(q.cat, q.word)] : null;
    return ['',
      'Lihat gambarnya baik-baik. Benda apa itu? 😊',
      v && v.arti ? 'Dalam bahasa Indonesia namanya "' + v.arti + '".' : 'Sebutkan dulu namanya dalam bahasa Indonesia.',
      'Kata Inggrisnya diawali huruf "' + q.word.charAt(0).toUpperCase() + '".',
      'Jawabannya "' + q.word + '"' + (v && v.arti ? ' yang artinya ' + v.arti : '') + '.',
      'Kosakata "' + q.word + '" belum dikuasai. Ulangi lewat Smart Card beberapa hari ke depan.'
    ];
  },

  letter: function (q) {
    return ['',
      'Sebutkan nama gambarnya dengan suara keras. 😊',
      'Dengarkan bunyi PERTAMA saat kamu menyebutnya.',
      'Bunyi awal itu hurufnya.',
      'Kata "' + q.word + '" diawali huruf ' + q.o[q.a] + '.',
      'Anak belum lancar mengenali bunyi awal kata. Latih dengan permainan tebak huruf awal benda di rumah.'
    ];
  },

  shape: function (q) {
    return ['',
      'Baca lagi soalnya, yang dicari bentuk atau warna? 🤔',
      'Perhatikan satu per satu pilihannya.',
      'Cocokkan dengan yang diminta soal.',
      'Jawabannya pilihan ke-' + (q.a + 1) + '.',
      'Anak masih tertukar antara ciri bentuk dan ciri warna. Latih memilah benda berdasarkan satu ciri saja dulu.'
    ];
  },

  clock: function (q) {
    return ['',
      'Lihat jarum pendeknya dulu ya. 😊',
      'Jarum pendek menunjukkan JAM, jarum panjang menunjukkan MENIT.',
      'Jarum panjang di angka 12 berarti tepat, di angka 6 berarti lewat 30 menit.',
      'Jamnya menunjukkan ' + q.o[q.a] + '.',
      'Anak belum lancar membaca jam analog. Pakai jam dinding sungguhan sambil menyebutkan waktunya.'
    ];
  }
};

// Cadangan untuk tipe yang belum punya hint khusus (sains, seni, logika, odd, ketik).
// Sengaja TIDAK menyebut jawaban di level 1-3 supaya polanya konsisten.
function hintUmum(q) {
  var jawab = (q.o && typeof q.a === 'number') ? q.o[q.a] : null;
  return ['',
    'Baca lagi soalnya pelan-pelan ya. 😊',
    'Buang dulu pilihan yang jelas tidak mungkin.',
    'Pikirkan mana yang paling masuk akal dari sisa pilihannya.',
    jawab ? 'Jawabannya "' + jawab + '".' : 'Coba periksa lagi jawabanmu.',
    'Anak perlu latihan pada jenis soal ini. Bahas ulang bersama sambil bertanya alasannya memilih.'
  ];
}

// ══════════════════════════════════════
// API UTAMA
// ══════════════════════════════════════
// Mengembalikan teks hint untuk satu level. SELALU berhasil, tanpa jaringan.
function hintLokal(q, level) {
  if (!q) return '';
  var lv = Number(level);
  if (!(lv >= 1 && lv <= HINT_MAX_LEVEL)) return '';
  var f = HINT_LOKAL[q.t];
  var arr;
  try { arr = f ? f(q) : hintUmum(q); }
  catch (e) { arr = hintUmum(q); }        // hint tidak boleh mematikan gameplay
  return arr[lv] || '';
}

// Hint untuk ANAK — level 5 diblokir di sini, bukan di UI, supaya tidak ada
// jalur lain yang tidak sengaja menampilkannya.
function hintUntukAnak(q, level) {
  var lv = Math.max(1, Math.min(4, Number(level) || 1));
  return hintLokal(q, lv);
}

// Hint untuk ORANG TUA (level 5) — dipakai laporan, tidak pernah di layar anak.
function hintUntukOrangTua(q) {
  return hintLokal(q, 5);
}

// ══════════════════════════════════════
// PENGHALUSAN AI (opsional, boleh gagal)
// ══════════════════════════════════════
// Mengembalikan Promise yang SELALU resolve dengan sebuah teks:
// teks AI kalau berhasil, teks lokal kalau tidak. Tidak pernah reject —
// pemanggilnya tidak perlu menulis penanganan error sama sekali.
function hintAI(q, level) {
  var lokal = hintUntukAnak(q, level);
  try {
    if (navigator.onLine === false) return Promise.resolve(lokal);
    if (!GAS_URL || GAS_URL.indexOf('PASTE_URL') !== -1) return Promise.resolve(lokal);

    // no-cors tidak bisa membaca balasan, jadi hint AI memakai permintaan biasa.
    // Kalau CORS-nya ditolak, .catch() di bawah mengembalikan hint lokal.
    return fetch(GAS_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'hint', hintLevel: level,
        soal: q.q || q.word || '', opsi: q.o || [],
        jawaban: (q.o && typeof q.a === 'number') ? q.o[q.a] : ''
      })
    })
      .then(function (r) { return r.json(); })
      .then(function (j) { return (j && j.text) ? j.text : lokal; })
      .catch(function () { return lokal; });
  } catch (e) {
    return Promise.resolve(lokal);
  }
}
