// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// Node.js · Server Pengembangan Lokal
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 6 September 2026, 22:31:40
// ================================================================
//
// JANGAN DI-UPLOAD. Berkas ini hanya untuk menjalankan aplikasi di komputer.
//
// CARA PAKAI — buka terminal di folder ini, lalu:
//
//     node dev-server.js
//
// lalu buka:  http://localhost:5500/Anabhi-Smart-Play/
//
// Kenapa perlu berkas ini, bukan sekadar Live Server?
// Aplikasi ini di-host di SUBFOLDER (anabhidev.com/Anabhi-Smart-Play/), dan
// `manifest.json` memakai path absolut /Anabhi-Smart-Play/assets/... sesuai
// SOP v1.9 kategori 18.2. Kalau dijalankan di root (http://localhost:5500/),
// ikon manifest 404 dan TOMBOL INSTALL TIDAK AKAN MUNCUL — bukan karena
// kodenya salah, tapi karena path-nya tidak sama dengan produksi.
// Server ini memasang folder di /Anabhi-Smart-Play/ supaya lokal = produksi.

var http = require('http');
var fs   = require('fs');
var path = require('path');

var ROOT  = __dirname;
var MOUNT = '/Anabhi-Smart-Play';
var PORT  = Number(process.env.PORT) || 5500;

// 🔴 .css WAJIB ada di daftar ini. Kalau Content-Type-nya bukan text/css,
// Chrome MENOLAK stylesheet-nya dalam diam: berkas HTTP 200, tidak ada pesan
// error, tapi jumlah aturan CSS = 0 dan seluruh halaman jadi tanpa gaya.
var TYPES = {
  '.html':'text/html; charset=utf-8',
  '.css' :'text/css; charset=utf-8',
  '.js'  :'text/javascript; charset=utf-8',
  '.json':'application/manifest+json; charset=utf-8',
  '.png' :'image/png',
  '.webp':'image/webp',
  '.jpg' :'image/jpeg',
  '.jpeg':'image/jpeg',
  '.svg' :'image/svg+xml',
  '.woff2':'font/woff2',
  '.ico' :'image/x-icon',
  '.md'  :'text/markdown; charset=utf-8'
};

http.createServer(function (req, res) {
  var url = decodeURIComponent(req.url.split('?')[0]);

  if (url === '/' || url === MOUNT) {
    res.writeHead(302, { Location: MOUNT + '/' });
    return res.end();
  }
  if (url.indexOf(MOUNT + '/') !== 0) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Buka di ' + MOUNT + '/ ya');
  }

  var rel = url.slice(MOUNT.length);
  if (rel === '/' || rel === '') rel = '/index.html';

  var file = path.join(ROOT, rel);
  // jangan biarkan keluar dari folder kerja
  if (file.indexOf(path.resolve(ROOT)) !== 0) {
    res.writeHead(403);
    return res.end();
  }

  fs.readFile(file, function (err, data) {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 ' + rel);
    }
    var head = { 'Content-Type': TYPES[path.extname(file).toLowerCase()] || 'application/octet-stream' };
    // Meniru _headers produksi: sw.js & manifest.json tidak boleh ter-cache
    if (rel === '/sw.js' || rel === '/manifest.json' || rel === '/index.html') {
      head['Cache-Control'] = 'public, max-age=0, must-revalidate';
    }
    res.writeHead(200, head);
    res.end(data);
  });
}).listen(PORT, function () {
  console.log('');
  console.log('  Anabhi Smart Play — server lokal siap');
  console.log('  Buka:  http://localhost:' + PORT + MOUNT + '/');
  console.log('');
  console.log('  Berhenti: tekan Ctrl+C');
  console.log('');
});
