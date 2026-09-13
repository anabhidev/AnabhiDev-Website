// ================================================================
// AnabhiDev-SMARTSTUDY — Anabhi Dev Smart Study Web Interactive
// Google Apps Script (GAS) · AI Tutor Backend & Gemini 3.5 Flash-Lite
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 13 September 2026
// ================================================================
//
// 📌 CARA PASANG DI GOOGLE APPS SCRIPT (SEKALI JALAN):
// 1. Buka https://script.google.com/home
// 2. Klik "New project", beri nama: "Anabhi Dev Smart Study - AI Backend"
// 3. Hapus kode bawaan, lalu salin-tempel SEMUA isi berkas ini ke Code.gs
// 4. Masuk ke menu "Project Settings" (ikon gerigi ⚙️ di bilah kiri)
// 5. Scroll ke bagian "Script Properties", lalu klik "Add script property":
//    - Property : GEMINI_API_KEY
//    - Value    : AIzaSy... (API Key Gemini Anda dari Google AI Studio)
// 6. Klik "Deploy" (pojok kanan atas) ➔ "New deployment"
//    - Select type  : Web App (ikon globe)
//    - Description  : "Anabhi Smart Study AI v1.0"
//    - Execute as   : Me (email akun Anda)
//    - Who has access: Anyone (Siapa saja)  <-- WAJIB pilih ini!
// 7. Klik "Deploy", izinkan akses (Authorize), lalu SALIN URL Web App:
//    Contoh: https://script.google.com/macros/s/AKfycb.../exec
// 8. Tempelkan URL tersebut ke aplikasi Smart Study di menu "⚙️ Pengaturan"
//    atau langsung di variabel GEMINI_CONFIG.GAS_URL.
//
// 🔒 KEUNGGULAN METODE INI:
// - API Key Gemini 100% AMAN di Script Properties Google Anda.
// - Kunci TIDAK PERNAH terekspos di browser, inspect element, maupun GitHub.
// - Anak / siswa tidak perlu memasukkan API key apa pun!
// ================================================================

var P = PropertiesService.getScriptProperties();

// Model default resmi untuk Anabhi Dev Smart Study
var GEMINI_MODEL = 'gemini-3.5-flash-lite';
var GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/';

// ══════════════════════════════════════
//  📡  ENTRY POINT: POST REQUEST
// ══════════════════════════════════════
function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) ? e.postData.contents : '{}';
    var data = JSON.parse(raw);
    var action = data.action || 'ask_ai';

    if (action === 'ping') {
      return jsonOut({ ok: true, message: 'pong', model: GEMINI_MODEL });
    }

    if (action === 'ask_ai') {
      return handleAskAi(data);
    }

    return jsonOut({ ok: false, error: 'Unknown action: ' + action });
  } catch (err) {
    Logger.log('doPost ERROR: ' + err.message);
    return jsonOut({ ok: false, error: 'Server Error: ' + err.message });
  }
}

// ══════════════════════════════════════
//  🌐  ENTRY POINT: GET REQUEST (Tes Ping)
// ══════════════════════════════════════
function doGet(e) {
  return jsonOut({
    ok: true,
    service: 'Anabhi Dev Smart Study - AI Tutor Backend',
    model: GEMINI_MODEL,
    hasKey: Boolean(P.getProperty('GEMINI_API_KEY')),
    status: 'Ready'
  });
}

// ══════════════════════════════════════
//  🤖  HANDLE TANYA AI
// ══════════════════════════════════════
function handleAskAi(data) {
  var key = P.getProperty('GEMINI_API_KEY');
  if (!key) {
    return jsonOut({
      ok: false,
      error: 'GEMINI_API_KEY belum diisi di Script Properties Google Apps Script! Silakan buka Project Settings ➔ Script Properties ➔ GEMINI_API_KEY.'
    });
  }

  var question = data.prompt || data.question || '';
  if (!question.trim()) {
    return jsonOut({ ok: false, error: 'Pertanyaan kosong.' });
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
//  📦  HELPER: JSON OUTPUT DENGAN CORS
// ══════════════════════════════════════
function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// ══════════════════════════════════════
//  🧪  UJI SETUP — Jalankan dari editor GAS
// ══════════════════════════════════════
function testSetup() {
  var key = P.getProperty('GEMINI_API_KEY');
  if (!key) {
    Logger.log('❌ GEMINI_API_KEY belum diisi di Script Properties!');
    return;
  }
  Logger.log('✅ GEMINI_API_KEY ditemukan: ' + key.substring(0, 8) + '...');
  var res = handleAskAi({ prompt: 'Halo Kakak AI, jelaskan kenapa pelangi warna-warni secara singkat!' });
  Logger.log('Hasil Test:\n' + res.getContent());
}
