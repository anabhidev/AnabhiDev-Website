const fs = require('fs'), path = require('path');
const W = 'D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';

function walk(d, out = []) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) {
      if (!/node_modules|arsip|\.remember|twemoji/.test(f.name)) walk(p, out);
    } else if (/\.(css|js)$/.test(f.name) && !/twemoji\.min/.test(f.name)) out.push(p);
  }
  return out;
}

const files = walk(W);
let masalah = 0, dicek = 0;
console.log('Path aset di berkas CSS/JS:\n');
for (const f of files) {
  const rel = path.relative(W, f).split(path.sep).join('/');
  const depth = rel.split('/').length - 1;          // berapa folder dalam
  // Buang komentar dulu — contoh path di dalam penjelasan bukan path sungguhan
  const src = fs.readFileSync(f, 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .split('\n').map(l => l.replace(/^\s*\/\/.*$/, '')).join('\n');
  const hits = [...src.matchAll(/['"]((?:\.\.\/)*assets\/[^'"]+)['"]/g)].map(m => m[1]);
  if (!hits.length) continue;
  for (const h of hits) {
    dicek++;
    const naik = (h.match(/\.\.\//g) || []).length;
    // CSS: url() relatif terhadap BERKAS CSS  -> butuh naik sebanyak depth
    // JS : string dipakai sebagai src <img>, relatif terhadap HALAMAN -> 0
    const perlu = rel.endsWith('.css') ? depth : 0;
    const ok = naik === perlu;
    if (!ok) masalah++;
    console.log('  ' + (ok ? 'OK  ' : 'X   ') + rel.padEnd(26) + h +
      (ok ? '' : '   -> butuh ' + perlu + 'x "../", ada ' + naik));
  }
}
console.log('\n' + (masalah ? 'GAGAL: ' + masalah + ' path salah dari ' + dicek
                            : 'OK: semua ' + dicek + ' path aset benar'));
process.exit(masalah ? 1 : 0);
