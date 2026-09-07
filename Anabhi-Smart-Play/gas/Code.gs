// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// Google Apps Script · Spreadsheet per anak + Telegram + endpoint AI Gemini
// Development · Anabhi Dev
// Version   : 3.1
// Generated : 7 September 2026, 17:05:22
// ================================================================
//
// 🔴 BERKAS INI TIDAK DI-UPLOAD KE WEB HOSTING.
// Isinya disalin ke editor Google Apps Script (script.google.com).
// Disimpan di sini supaya kodenya ikut terversi bersama aplikasi.
//
// Ini GABUNGAN kode .gs kakak yang sudah jalan sejak Juni 2026 dengan
// kebutuhan baru. Yang DIPERTAHANKAN dari kode lama:
//   · sheet terpisah per anak (Ana / Abhi) + pembuatan otomatis
//   · header tebal, warna gelap, baris pertama dibekukan
//   · timestamp WITA (Asia/Makassar)
//   · buildTgMsg() sebagai cadangan kalau halaman tidak mengirim tgMsg
//   · testKirim() untuk uji manual
//   · URUTAN 21 KOLOM LAMA — tidak digeser sedikit pun
//
// ── PENGATURAN SEKALI JALAN ──────────────────────────────────────
// Project Settings → Script Properties:
//
//   TELEGRAM_BOT_TOKEN   123456:ABC-DEF...      (WAJIB)
//   TELEGRAM_CHAT_ID     -1001234567890         (WAJIB)
//   GEMINI_API_KEY       AIza...                (opsional — 1 kunci saja cukup)
//
// SHEET_ID TIDAK diperlukan: skrip ini terikat pada Spreadsheet tempat ia
// dipasang (getActiveSpreadsheet), persis seperti kode lama kakak.
//
// 🔴 JANGAN menulis token langsung di kode ini.

var P = PropertiesService.getScriptProperties();

var CONFIG = {
  TIMEZONE  : 'Asia/Makassar',
  SHEET_ANA : 'Ana',
  SHEET_ABHI: 'Abhi',

  // ── HEADER ──
  // 21 kolom PERTAMA persis sama dengan sheet lama, urutannya TIDAK BOLEH
  // diubah — kalau digeser, baris lama sejak Juni 2026 jadi tidak sejajar
  // dengan baris baru dan seluruh riwayat Ana & Abhi kacau.
  // Kolom baru HANYA ditambahkan DI BELAKANG.
  HEADERS: [
    'Timestamp',
    'Session ID',
    'Nama',
    'Game',
    'Jumlah Soal',
    'Score',
    'Max Score',
    'Soal Benar',
    'Soal Salah',
    'Akurasi (%)',
    'Durasi',
    'Streak (hari)',
    // Detail per tipe soal (9 kolom lama)
    'Urutan Angka (benar/total)',
    'Besar-Kecil (benar/total)',
    'Jumlah Visual (benar/total)',
    'Kurang Visual (benar/total)',
    'Operasi Hitung (benar/total)',
    'Bentuk & Warna (benar/total)',
    'Tebak Huruf (benar/total)',
    'Odd One Out (benar/total)',
    'Baca Jam (benar/total)',
    // ── KOLOM BARU (v3.1) ──
    // 5 tipe soal ini SUDAH ADA di aplikasi tapi belum pernah tercatat di
    // sheet, jadi hasilnya hilang diam-diam sejak game-nya ditambahkan.
    'Menyalin (benar/total)',
    'B.Inggris (benar/total)',
    'Sains (benar/total)',
    'Seni (benar/total)',
    'Logika (benar/total)',
    // Kosakata Inggris & catatan untuk orang tua
    'Kata Perlu Diulang',
    'Saran Latihan'
  ]
};

// Model dipatok konstanta, TIDAK diambil dari permintaan (Standar §7.1).
// Kalau model boleh dikirim halaman, siapa pun yang menemukan URL ini bisa
// memaksa memakai model termahal atas tagihan kakak.
var GEMINI_MODEL = 'gemini-3.5-flash-lite';

// ══════════════════════════════════════
//  📡  ENTRY POINT
// ══════════════════════════════════════
function doPost(e) {
  try {
    var raw  = e.postData ? e.postData.contents : '{}';
    var data = JSON.parse(raw);

    // Payload laporan LAMA tidak punya field "action". Cabang ini wajib
    // dipertahankan supaya tablet yang masih memakai aplikasi versi lama
    // tetap bisa melapor — jangan pernah membuat "action" jadi wajib.
    if (data.action === 'hint')    return handleHint(data);
    if (data.action === 'insight') return handleInsight(data);

    saveToSheet(data);
    sendTelegram(data.tgMsg || buildTgMsg(data));

    return jsonOut({ status: 'ok' });

  } catch (err) {
    Logger.log('doPost ERROR: ' + err.message);
    sendTelegram('⚠️ GAS Error: ' + err.message);
    return jsonOut({ status: 'error', msg: err.message });
  }
}

function doGet() {
  return jsonOut({ status: 'ok', service: 'Anabhi Smart Play', version: '3.1' });
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════
//  💯  SKOR MAKSIMUM — satu sumber kebenaran
// ══════════════════════════════════════
// 🔴 PERBAIKAN BUG. Kode lama memakai `totalSoal * 5`, padahal poin per soal
// berbeda menurut jumlah soal: 10 soal = 10 poin, 15 soal = 7, 20 soal = 5.
// Akibatnya kolom "Max Score" salah untuk sesi 10 & 15 soal — terlihat jelas
// di sheet: Score 100 tapi Max Score tertulis 50. Rumus di sini WAJIB sama
// dengan poinPerSoal() di js/config.js.
function poinPerSoal(qc) { return qc === 10 ? 10 : qc === 15 ? 7 : 5; }
function maxScore(qc)    { return (qc || 0) * poinPerSoal(qc); }

// ══════════════════════════════════════
//  📊  SIMPAN KE SPREADSHEET
// ══════════════════════════════════════
function saveToSheet(data) {
  var ss        = SpreadsheetApp.getActiveSpreadsheet();
  var pemain    = (data.pemain || '').toLowerCase();
  var sheetName = pemain.indexOf('abhi') !== -1 ? CONFIG.SHEET_ABHI : CONFIG.SHEET_ANA;

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(CONFIG.HEADERS);
    sheet.getRange(1, 1, 1, CONFIG.HEADERS.length)
         .setFontWeight('bold')
         .setBackground('#1a1a2e')
         .setFontColor('#FFE66D');
    sheet.setFrozenRows(1);
  } else {
    lengkapiHeader(sheet);   // sheet lama: tambahkan kolom baru di belakang
  }

  var det = data.detail || {};
  var fmt = function (key) { return det[key] ? det[key].ok + '/' + det[key].tot : '-'; };

  var ts = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'dd/MM/yyyy HH:mm:ss');

  // Kata Inggris yang dijawab salah (dikirim aplikasi v5.2+; versi lama tidak
  // mengirim field ini, dan itu tidak apa-apa — kolomnya cukup diisi '-').
  var kataUlang = '-';
  if (Array.isArray(data.vocab)) {
    var salah = data.vocab.filter(function (v) { return v && !v.benar; })
                          .map(function (v) { return v.word; });
    if (salah.length) kataUlang = salah.join(', ');
  }
  var saran = Array.isArray(data.catatanOrangTua) && data.catatanOrangTua.length
    ? data.catatanOrangTua.join(' | ') : '-';

  var row = [
    ts,
    data.sessionId || '-',
    data.pemain    || '-',
    data.game      || '-',
    data.totalSoal || 0,
    data.score     || 0,
    maxScore(data.totalSoal),      // ← diperbaiki, dulu totalSoal * 5
    data.soalBenar || 0,
    data.soalSalah || 0,
    data.akurasi   || 0,
    data.durasi    || '-',
    data.streak    || 0,
    fmt('seq'), fmt('cmp'), fmt('addvis'), fmt('subvis'), fmt('ops'),
    fmt('shape'), fmt('letter'), fmt('odd'), fmt('clock'),
    // kolom baru
    fmt('ketik'), fmt('bing'), fmt('sains'), fmt('seni'), fmt('logika'),
    kataUlang,
    saran
  ];

  sheet.appendRow(row);
  try { sheet.autoResizeColumns(1, CONFIG.HEADERS.length); } catch (_) {}
}

// Menambahkan kolom baru ke sheet yang SUDAH ADA tanpa menyentuh data lama.
// Hanya menulis judul yang belum ada, di sebelah kanan. Baris lama dibiarkan
// kosong pada kolom baru — itu jujur: datanya memang tidak pernah tercatat.
function lengkapiHeader(sheet) {
  try {
    var lebar = sheet.getLastColumn();
    if (lebar >= CONFIG.HEADERS.length) return;
    var kurang = CONFIG.HEADERS.slice(lebar);
    sheet.getRange(1, lebar + 1, 1, kurang.length)
         .setValues([kurang])
         .setFontWeight('bold')
         .setBackground('#1a1a2e')
         .setFontColor('#FFE66D');
  } catch (err) {
    Logger.log('lengkapiHeader: ' + err.message);
  }
}

// ══════════════════════════════════════
//  📨  TELEGRAM
// ══════════════════════════════════════
function sendTelegram(msg) {
  var token = P.getProperty('TELEGRAM_BOT_TOKEN');
  var chat  = P.getProperty('TELEGRAM_CHAT_ID');

  if (!token) { Logger.log('TELEGRAM_BOT_TOKEN belum diisi di Script Properties!'); return; }
  if (!chat)  { Logger.log('TELEGRAM_CHAT_ID belum diisi di Script Properties!');  return; }

  var options = {
    method      : 'post',
    contentType : 'application/json',
    payload     : JSON.stringify({ chat_id: chat, text: msg, parse_mode: 'Markdown' }),
    muteHttpExceptions: true
  };

  try {
    var resp = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', options);
    Logger.log('Telegram response: ' + resp.getContentText());
  } catch (err) {
    Logger.log('Telegram ERROR: ' + err.message);
  }
}

// ══════════════════════════════════════
//  🔧  PESAN TELEGRAM CADANGAN
// ══════════════════════════════════════
// Dipakai kalau halaman tidak mengirim tgMsg. Sejak v5.2 halaman selalu
// mengirimnya, jadi ini jaring pengaman — termasuk untuk testKirim().
function buildTgMsg(data) {
  var det = data.detail || {};
  var fmt = function (key, label) {
    return det[key] ? label + ': ' + det[key].ok + ' / ' + det[key].tot : '';
  };
  var acc    = data.akurasi || 0;
  var stars  = acc >= 90 ? '⭐⭐⭐' : acc >= 70 ? '⭐⭐' : acc >= 50 ? '⭐' : '💪';
  var pIcon  = acc >= 90 ? '🏆' : acc >= 70 ? '🌟' : acc >= 50 ? '⭐' : '💪';
  var isAna  = (data.pemain || '').toLowerCase().indexOf('anj') !== -1;
  var pEmoji = isAna ? '🌸' : '⚡';
  var now    = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'dd/MM/yyyy HH:mm');

  var detailLines = [
    fmt('seq',    '🔢 Urutan Angka'),
    fmt('cmp',    '⚖️ Besar-Kecil'),
    fmt('addvis', '➕ Jumlah Visual'),
    fmt('subvis', '➖ Kurang Visual'),
    fmt('ops',    '🔢 Operasi Hitung'),
    fmt('shape',  '🔷 Bentuk & Warna'),
    fmt('letter', '🔤 Tebak Huruf'),
    fmt('odd',    '🧩 Odd One Out'),
    fmt('clock',  '🕐 Baca Jam'),
    fmt('ketik',  '✍️ Menyalin'),
    fmt('bing',   '🦉 B.Inggris'),
    fmt('sains',  '🔬 Sains'),
    fmt('seni',   '🎨 Seni'),
    fmt('logika', '🧩 Logika')
  ].filter(Boolean).join('\n');

  return (
    '🎮 *LAPORAN ANABHI SMART PLAY*\n' +
    '━━━━━━━━━━━━━━━━━━━━\n' +
    '📅 ' + now + ' WITA\n' +
    '🎯 Game: *' + (data.game || '-') + '*\n\n' +
    '👤 *Pemain*\n' +
    pEmoji + ' Nama   : *' + (data.pemain || '-') + '*\n' +
    pIcon + ' Score  : *' + (data.score || 0) + ' poin* (dari ' + maxScore(data.totalSoal) + ')\n\n' +
    '📝 *HASIL*\n' +
    '━━━━━━━━━━━━━━━━━━━━\n' +
    '✅ Benar   : ' + (data.soalBenar || 0) + ' / ' + (data.totalSoal || 0) + '\n' +
    '❌ Salah   : ' + (data.soalSalah || 0) + '\n' +
    '🎯 Akurasi : *' + acc + '%* ' + stars + '\n' +
    '⏱️ Durasi  : ' + (data.durasi || '-') + '\n\n' +
    (detailLines ? '📊 *Detail per Tipe:*\n' + detailLines + '\n\n' : '') +
    '🔥 Streak  : Main *' + (data.streak || 0) + ' hari* berturut-turut\n\n' +
    '📌 Session : `' + (data.sessionId || '-') + '`\n' +
    '━━━━━━━━━━━━━━━━━━━━'
  );
}

// ══════════════════════════════════════
//  🤖  HINT AI  (PRD §16 · Master 2 §17)
// ══════════════════════════════════════
// Tangga 0-5. Level 5 KHUSUS ORANG TUA, tidak pernah ditampilkan ke anak.
// AI hanya menulis KALIMAT PETUNJUK. Kunci jawaban, skor, dan penguasaan
// tetap dihitung aplikasi — Gemini tidak pernah jadi sumber kebenaran (PRD §7).
function handleHint(d) {
  var level = Math.max(0, Math.min(5, Number(d.hintLevel) || 1));
  if (level === 0) return jsonOut({ ok: true, type: 'hint', text: '', nextHintAvailable: true });

  var key = P.getProperty('GEMINI_API_KEY');
  // Tanpa kunci BUKAN error: aplikasi wajib tetap jalan dengan hint lokal.
  if (!key) return jsonOut({ ok: true, type: 'hint', text: '', fallback: true });

  var teks = panggilGemini(key, bangunPromptHint(d, level), 0.4, 120);
  if (!teks) return jsonOut({ ok: true, type: 'hint', text: '', fallback: true });

  return jsonOut({
    ok: true, type: 'hint', text: teks,
    hintLevel: level, nextHintAvailable: level < 5
  });
}

function bangunPromptHint(d, level) {
  var tangga = {
    1: 'Beri SATU petunjuk kecil. Jangan sebut jawabannya.',
    2: 'Uraikan soalnya secara visual/konkret. Jangan sebut jawabannya.',
    3: 'Tuntun satu langkah pengerjaan. Jangan sebut jawabannya.',
    4: 'Jelaskan cara mengerjakannya sampai selesai, boleh sebut jawabannya.',
    5: 'Tulis penjelasan untuk ORANG TUA: apa yang belum dikuasai anak dan cara melatihnya di rumah.'
  };
  return [
    'Kamu tutor anak kelas 1 SD di Indonesia. Bahasa Indonesia yang sangat sederhana.',
    'Aturan: kalimat pendek, ramah, menyemangati, MAKSIMAL 2 kalimat.',
    'Jangan pernah merendahkan anak. Jangan bertanya lebih dari satu hal.',
    'Jangan meminta data pribadi apa pun.',
    '',
    'Soal   : ' + (d.soal || '-'),
    'Pilihan: ' + (Array.isArray(d.opsi) ? d.opsi.join(', ') : '-'),
    'Jawaban benar (RAHASIA, untuk konteksmu saja): ' + (d.jawaban || '-'),
    'Jawaban anak: ' + (d.jawabanAnak || '-'),
    '',
    'Tugasmu (tingkat ' + level + '): ' + tangga[level]
  ].join('\n');
}

// ══════════════════════════════════════
//  📈  INSIGHT ORANG TUA
// ══════════════════════════════════════
// 🔴 SEMUA ANGKA datang dari aplikasi. Gemini HANYA merangkai kalimat.
function handleInsight(d) {
  var key = P.getProperty('GEMINI_API_KEY');
  if (!key) return jsonOut({ ok: true, type: 'insight', text: '', fallback: true });

  var prompt = [
    'Kamu menulis ringkasan singkat untuk ORANG TUA anak kelas 1 SD.',
    'Bahasa Indonesia, hangat, maksimal 3 kalimat. Tanpa istilah teknis.',
    'Jangan memberi label psikologis atau diagnosis apa pun.',
    'JANGAN mengubah angka yang diberikan. Pakai apa adanya.',
    '',
    'Nama    : ' + (d.pemain || '-'),
    'Game    : ' + (d.game || '-'),
    'Skor    : ' + (d.score || 0) + ' dari ' + (d.maxScore || 0),
    'Akurasi : ' + (d.akurasi || 0) + '%',
    'Kuat    : ' + (d.kuat || '-'),
    'Perlu latihan: ' + (d.lemah || '-')
  ].join('\n');

  var teks = panggilGemini(key, prompt, 0.5, 200);
  return jsonOut({ ok: true, type: 'insight', text: teks || '', fallback: !teks });
}

// Satu jalur ke Gemini untuk hint & insight. Mengembalikan '' kalau gagal —
// TIDAK pernah melempar error, supaya aplikasi anak tidak pernah terganggu.
function panggilGemini(key, prompt, suhu, maxToken) {
  try {
    var res = UrlFetchApp.fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' +
      GEMINI_MODEL + ':generateContent?key=' + encodeURIComponent(key), {
        method: 'post', contentType: 'application/json', muteHttpExceptions: true,
        payload: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: suhu, maxOutputTokens: maxToken }
        })
      });
    if (res.getResponseCode() !== 200) {
      Logger.log('Gemini HTTP ' + res.getResponseCode() + ': ' + res.getContentText());
      return '';
    }
    var j = JSON.parse(res.getContentText());
    var parts = (((j.candidates || [])[0] || {}).content || {}).parts;
    var teks = parts && parts[0] ? String(parts[0].text) : '';
    return bersihkan(teks);
  } catch (err) {
    Logger.log('Gemini ERROR: ' + err.message);
    return '';
  }
}

// Buang markdown & baris berlebih supaya aman ditaruh dengan textContent.
function bersihkan(s) {
  return String(s).replace(/[*_`#>]/g, '').replace(/\s*\n\s*/g, ' ').trim().slice(0, 300);
}

// ══════════════════════════════════════
//  🧪  UJI MANUAL — jalankan dari editor
// ══════════════════════════════════════
function ujiPengaturan() {
  var pesan = [];
  ['TELEGRAM_BOT_TOKEN', 'TELEGRAM_CHAT_ID'].forEach(function (k) {
    pesan.push((P.getProperty(k) ? '✅' : '❌ BELUM DIISI') + '  ' + k);
  });
  pesan.push((P.getProperty('GEMINI_API_KEY') ? '✅' : '➖ kosong (opsional)') + '  GEMINI_API_KEY');
  pesan.push('');
  pesan.push('Spreadsheet: ' + SpreadsheetApp.getActiveSpreadsheet().getName());
  var out = pesan.join('\n');
  Logger.log(out);
  return out;
}

function testKirim() {
  var dummy = {
    sessionId : 'ANA-MATH-20260907-143000',
    pemain    : 'Anjali Kirana',
    game      : 'Math Adventure',
    totalSoal : 10,
    score     : 80,
    soalBenar : 8,
    soalSalah : 2,
    akurasi   : 80,
    durasi    : '3 menit 15 detik',
    streak    : 3,
    detail    : {
      seq: { ok: 2, tot: 2 }, cmp: { ok: 2, tot: 2 }, addvis: { ok: 2, tot: 2 },
      subvis: { ok: 1, tot: 2 }, ops: { ok: 1, tot: 2 }
    },
    vocab : [{ wordId: 'animals:cat', word: 'Cat', benar: false }],
    catatanOrangTua : ['Anak masih perlu latihan mengurang. Latih dengan benda nyata di rumah.']
  };
  dummy.tgMsg = buildTgMsg(dummy);
  saveToSheet(dummy);
  sendTelegram(dummy.tgMsg);
  Logger.log('Test selesai! Cek Spreadsheet & Telegram.');
}
