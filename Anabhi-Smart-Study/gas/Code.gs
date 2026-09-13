// ================================================================
// AnabhiDev-SMARTSTUDY — Anabhi Dev Smart Study Web Interactive
// Google Apps Script (GAS) · AI Tutor Backend, Sheets & Telegram
// Development · Anabhi Dev
// Version   : 2.0 (Gemini 3.5 Flash-Lite + Auto Sheets + Telegram)
// Generated : 13 September 2026
// ================================================================
//
// 📌 PENGATURAN SEKALI JALAN (Project Settings ➔ Script Properties):
//
// 1. GEMINI_API_KEY       : AIzaSy...            (WAJIB untuk fitur Tanya AI)
// 2. SHEET_ID             : 1abcXYZ...           (WAJIB jika standalone script, ambil dari URL Sheets)
// 3. TELEGRAM_BOT_TOKEN   : 123456:ABC-DEF...    (OPSIONAL untuk notifikasi rapor orang tua)
// 4. TELEGRAM_CHAT_ID     : -1001234567890       (OPSIONAL untuk notifikasi rapor orang tua)
//
// 📊 SPREADSHEET (OTOMATIS & TIDAK PERLU BIKIN KOLOM MANUAL):
// Skrip ini OTOMATIS membuat tab 'Ana', 'Abhi', atau 'Laporan Belajar',
// otomatis membuatkan judul kolom tebal berwarna gelap & emas (#0f172a & #fcd34d),
// serta membekukan baris pertama (frozen row) secara otomatis!
//
// 🚀 DEPLOYMENT WEB APP:
// - Deploy ➔ New deployment ➔ Web App (atau Manage Deployments ➔ Edit ➔ New Version)
// - Execute as : Me (email Anda)
// - Who has access : Anyone (Siapa saja)  <-- WAJIB
// ================================================================

var P = PropertiesService.getScriptProperties();

// Konfigurasi Standar Anabhi Dev
var GEMINI_MODEL = 'gemini-3.5-flash-lite';
var GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/';
var TIMEZONE = 'Asia/Makassar'; // WITA

// ══════════════════════════════════════
//  📡  ENTRY POINT: POST REQUEST
// ══════════════════════════════════════
function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);
    var action = data.action || 'ask_ai';

    // 1. Ping / Test
    if (action === 'ping') {
      return jsonOut({
        ok: true,
        message: 'pong',
        model: GEMINI_MODEL,
        hasGeminiKey: Boolean(P.getProperty('GEMINI_API_KEY')),
        hasTelegram: Boolean(P.getProperty('TELEGRAM_BOT_TOKEN') && P.getProperty('TELEGRAM_CHAT_ID'))
      });
    }

    // 2. Tanya Kakak Belajar AI (Gemini 3.5 Flash-Lite)
    if (action === 'ask_ai') {
      return handleAskAi(data);
    }

    // 3. Simpan Skor Kuis / Tantangan ke Google Sheets & Kirim Telegram
    if (action === 'save_score' || action === 'report') {
      return handleSaveScore(data);
    }

    return jsonOut({ ok: false, error: 'Aksi tidak dikenali: ' + action });

  } catch (err) {
    Logger.log('doPost ERROR: ' + err.message);
    return jsonOut({ ok: false, error: 'Server Error: ' + err.message });
  }
}

// ══════════════════════════════════════
//  🌐  ENTRY POINT: GET REQUEST (Status Cek)
// ══════════════════════════════════════
function doGet(e) {
  return jsonOut({
    ok: true,
    service: 'Anabhi Dev Smart Study — Backend Engine',
    version: '2.0',
    model: GEMINI_MODEL,
    timezone: TIMEZONE,
    hasGeminiKey: Boolean(P.getProperty('GEMINI_API_KEY')),
    hasTelegram: Boolean(P.getProperty('TELEGRAM_BOT_TOKEN') && P.getProperty('TELEGRAM_CHAT_ID')),
    status: 'Ready & Running'
  });
}

// ══════════════════════════════════════
//  🤖  HANDLE TANYA AI (Gemini 3.5 Flash-Lite)
// ══════════════════════════════════════
function handleAskAi(data) {
  var key = P.getProperty('GEMINI_API_KEY');
  if (!key) {
    return jsonOut({
      ok: false,
      error: 'GEMINI_API_KEY belum diisi di Script Properties! Buka Project Settings ⚙️ ➔ Script Properties ➔ GEMINI_API_KEY.'
    });
  }

  var question = data.prompt || data.question || '';
  if (!question.trim()) {
    return jsonOut({ ok: false, error: 'Pertanyaan tidak boleh kosong.' });
  }

  var subject = data.subject || 'Umum';
  var model = data.model || GEMINI_MODEL;

  var sysMsg = [
    'Kamu adalah "Kakak Belajar Pintar" dari Anabhi Dev Smart Study, tutor pembelajaran yang ramah, santun, ceria, dan penuh inspirasi untuk anak-anak SD (Kelas 1 sampai Kelas 3).',
    'Mata pelajaran saat ini: ' + subject + '.',
    'Pedoman Menjawab:',
    '1. Gunakan bahasa Indonesia yang hangat, bersahabat, penuh pujian dan dorongan semangat belajar!',
    '2. Jelaskan materi dengan analogi benda konkret sehari-hari atau cerita singkat yang mudah dipahami anak-anak SD.',
    '3. JANGAN langsung membocorkan jawaban final soal latihan/ujian secara instan; berikan petunjuk (clue) logis dan ajak anak memikirkan langkah pengerjaannya ("Satu Soal Banyak Cara").',
    '4. Format jawaban dengan rapi: gunakan baris baru, poin-poin sederhana, dan emoji ceria yang menyenangkan.'
  ].join('\n');

  var url = GEMINI_ENDPOINT + model + ':generateContent?key=' + encodeURIComponent(key);

  var payload = {
    contents: [
      {
        role: 'user',
        parts: [{ text: sysMsg + '\n\nPertanyaan Siswa:\n"' + question + '"' }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 800
    }
  };

  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var resp = UrlFetchApp.fetch(url, options);
  var statusCode = resp.getResponseCode();
  var respText = resp.getContentText();

  if (statusCode !== 200) {
    Logger.log('Gemini API Error ' + statusCode + ': ' + respText);
    return jsonOut({
      ok: false,
      error: 'Google Gemini API (' + statusCode + '): ' + respText
    });
  }

  var result = JSON.parse(respText);
  var reply = (((result.candidates || [])[0] || {}).content || {}).parts;
  var replyText = reply && reply[0] ? String(reply[0].text) : '';

  return jsonOut({
    ok: true,
    reply: replyText,
    text: replyText,
    model: model
  });
}

// ══════════════════════════════════════
//  📊  HANDLE SIMPAN SKOR KE SPREADSHEET & NOTIF TELEGRAM
// ══════════════════════════════════════
function handleSaveScore(data) {
  try {
    saveToSheetAuto(data);
    kirimNotifTelegram(data);
    return jsonOut({ ok: true, status: 'saved' });
  } catch (err) {
    Logger.log('handleSaveScore ERROR: ' + err.message);
    return jsonOut({ ok: false, error: err.message });
  }
}

// Helper: Dapatkan Spreadsheet baik via SHEET_ID (Script Properties) maupun ActiveSpreadsheet
function getSpreadsheet() {
  var sheetId = P.getProperty('SHEET_ID');
  if (sheetId && sheetId.trim()) {
    try {
      return SpreadsheetApp.openById(sheetId.trim());
    } catch (e) {
      Logger.log('Gagal membuka spreadsheet via SHEET_ID (' + sheetId + '): ' + e.message);
    }
  }
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (_) {}
  return null;
}

// Otomatis membuat tab & header tanpa perlu bikin kolom manual!
function saveToSheetAuto(data) {
  var ss = getSpreadsheet();

  if (!ss) {
    Logger.log('Spreadsheet tidak terhubung. Pastikan SHEET_ID sudah diisi di Script Properties!');
    return;
  }

  var nama = data.nama || data.studentName || 'Ana';
  var namaLower = nama.toLowerCase();
  var tabName = (namaLower.indexOf('ana') !== -1 || namaLower.indexOf('anjali') !== -1) ? 'Ana' :
                (namaLower.indexOf('abhi') !== -1) ? 'Abhi' : 'Laporan Belajar';

  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
  }

  // JIKA SHEET BARU / KOSONG: BIKIN HEADER OTOMATIS DENGAN GAYA MEWAH
  if (sheet.getLastRow() === 0) {
    var headers = [
      'Timestamp (WITA)',
      'Nama Siswa',
      'Mata Pelajaran',
      'Aktivitas / Modul / Kuis',
      'Skor Diperoleh',
      'Total Soal',
      'Akurasi (%)',
      'Durasi',
      'Bintang',
      'Catatan'
    ];
    sheet.appendRow(headers);

    // Format Header: Tebal, Background Gelap Navy, Teks Emas, Bekukan Baris 1
    var hRange = sheet.getRange(1, 1, 1, headers.length);
    hRange.setFontWeight('bold');
    hRange.setBackground('#0f172a');
    hRange.setFontColor('#fcd34d');
    hRange.setHorizontalAlignment('center');
    sheet.setFrozenRows(1);
  }

  var now = Utilities.formatDate(new Date(), TIMEZONE, 'dd/MM/yyyy HH:mm:ss');
  var skor = Number(data.score) || 0;
  var total = Number(data.totalQuestions || data.totalSoal) || 0;
  var akurasi = Number(data.accuracy || data.akurasi) || (total > 0 ? Math.round((skor / total) * 100) : 0);
  var bintang = akurasi >= 90 ? '⭐⭐⭐' : akurasi >= 70 ? '⭐⭐' : akurasi >= 50 ? '⭐' : '💪';

  var row = [
    now,
    nama,
    data.subject || data.mataPelajaran || '-',
    data.quizTitle || data.unitTitle || data.activity || '-',
    skor,
    total,
    akurasi + '%',
    data.duration || data.durasi || '-',
    bintang,
    data.note || data.catatan || 'Selesai mandiri'
  ];

  sheet.appendRow(row);
  try { sheet.autoResizeColumns(1, 10); } catch (_) {}
}

// ══════════════════════════════════════
//  📨  TELEGRAM NOTIFIKASI KE ORANG TUA
// ══════════════════════════════════════
function sendTelegram(msg) {
  var token = P.getProperty('TELEGRAM_BOT_TOKEN');
  var chat  = P.getProperty('TELEGRAM_CHAT_ID');

  if (!token || !chat) {
    // Lewati tanpa error jika bot belum diisi
    return;
  }

  var options = {
    method      : 'post',
    contentType : 'application/json',
    payload     : JSON.stringify({ chat_id: chat, text: msg, parse_mode: 'Markdown' }),
    muteHttpExceptions: true
  };

  try {
    UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', options);
  } catch (err) {
    Logger.log('Telegram ERROR: ' + err.message);
  }
}

function kirimNotifTelegram(data) {
  var token = P.getProperty('TELEGRAM_BOT_TOKEN');
  var chat  = P.getProperty('TELEGRAM_CHAT_ID');
  if (!token || !chat) return;

  var now = Utilities.formatDate(new Date(), TIMEZONE, 'dd/MM/yyyy HH:mm');
  var nama = data.nama || data.studentName || 'Anak Hebat';
  var skor = Number(data.score) || 0;
  var total = Number(data.totalQuestions || data.totalSoal) || 0;
  var akurasi = Number(data.accuracy || data.akurasi) || (total > 0 ? Math.round((skor / total) * 100) : 0);
  var bintang = akurasi >= 90 ? '⭐⭐⭐' : akurasi >= 70 ? '⭐⭐' : akurasi >= 50 ? '⭐' : '💪';

  var isAna = (nama.toLowerCase().indexOf('ana') !== -1 || nama.toLowerCase().indexOf('anjali') !== -1);
  var iconNama = isAna ? '🌸' : '⚡';

  var msg = [
    '🎓 *LAPORAN BELAJAR ANABHI SMART STUDY*',
    '━━━━━━━━━━━━━━━━━━━━',
    '📅 ' + now + ' WITA',
    iconNama + ' Siswa  : *' + nama + '*',
    '📚 Mapel  : *' + (data.subject || data.mataPelajaran || '-') + '*',
    '🎯 Materi : *' + (data.quizTitle || data.unitTitle || data.activity || '-') + '*',
    '',
    '📝 *HASIL BELAJAR*',
    '━━━━━━━━━━━━━━━━━━━━',
    '🏆 Skor   : *' + skor + ' poin* ' + bintang,
    '🎯 Akurasi: *' + akurasi + '%* (' + (data.correctCount || skor) + ' / ' + total + ' benar)',
    '⏱️ Waktu  : ' + (data.duration || data.durasi || '-'),
    '━━━━━━━━━━━━━━━━━━━━',
    '✨ _Terus belajar dan raih cita-citamu bersama Anabhi Dev!_'
  ].join('\n');

  sendTelegram(msg);
}

// ══════════════════════════════════════
//  📦  HELPER: JSON OUTPUT DENGAN CORS
// ══════════════════════════════════════
function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════
//  🧪  UJI SETUP — Jalankan langsung dari editor GAS
// ══════════════════════════════════════
function ujiPengaturan() {
  var logs = [];
  logs.push('=== UJI PENGATURAN ANABHI DEV SMART STUDY ===');
  
  var geminiKey = P.getProperty('GEMINI_API_KEY');
  logs.push((geminiKey ? '✅' : '❌ BELUM ADA') + ' GEMINI_API_KEY: ' + (geminiKey ? geminiKey.substring(0, 8) + '...' : '-'));

  var sheetId = P.getProperty('SHEET_ID');
  logs.push((sheetId ? '✅' : '❌ BELUM ADA') + ' SHEET_ID: ' + (sheetId ? sheetId.substring(0, 8) + '...' : '-'));

  var tgToken = P.getProperty('TELEGRAM_BOT_TOKEN');
  logs.push((tgToken ? '✅' : '➖ BELUM ADA (OPSIONAL)') + ' TELEGRAM_BOT_TOKEN');

  var tgChat = P.getProperty('TELEGRAM_CHAT_ID');
  logs.push((tgChat ? '✅' : '➖ BELUM ADA (OPSIONAL)') + ' TELEGRAM_CHAT_ID');

  var ss = getSpreadsheet();
  if (ss) {
    logs.push('✅ Terhubung ke Spreadsheet: "' + ss.getName() + '"');
  } else {
    logs.push('❌ Belum terhubung ke Spreadsheet! Pastikan SHEET_ID di Script Properties sudah benar.');
  }

  var res = logs.join('\n');
  Logger.log(res);
  return res;
}

function testKirimDummy() {
  var dummy = {
    nama: 'Anjali Kirana',
    subject: 'Matematika SD Kelas 1',
    quizTitle: 'Unit 1: Bilangan sampai 10 (Jurus Kompensasi)',
    score: 100,
    totalQuestions: 10,
    accuracy: 100,
    duration: '2 menit 15 detik',
    note: 'Latihan Mandiri 10 Soal Selesai'
  };

  handleSaveScore(dummy);
  Logger.log('Test kirim berhasil! Silakan periksa tab "Ana" di Google Sheets & Telegram Anda.');
}
