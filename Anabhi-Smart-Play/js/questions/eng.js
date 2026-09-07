// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — English Adventure (Master 2)
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 7 September 2026, 19:20:11
// ================================================================
//
// Tiga mekanik dari Master 2, semuanya menumpang VOCAB yang sudah ada:
//   shadow  §9  Shadow Guess  — tebak siluet
//   spell   §10 Spelling Bee  — susun huruf
//   build   §13 Word Builder  — susun kalimat
//
// 🔴 Ini kartu game BARU (`eng`), BUKAN mengubah game "Bahasa Inggris" (`bing`)
// yang sudah biasa dimainkan Ana & Abhi. Menambah mekanik ke game lama berarti
// mengubah permainan yang sudah mereka kenal tanpa diminta; sebagai kartu baru,
// risiko regresinya nol dan yang lama tetap utuh.

// ══════════════════════════════════════════════════════════
// SHADOW GUESS (§9)
// ══════════════════════════════════════════════════════════
//
// 🔴 Topik 'colors' WAJIB dikecualikan. Siluet 🔴🔵🟡 semuanya jadi bentuk
// yang identik, sehingga soal MUSTAHIL dijawab — varian bug B2 (lebih dari
// satu jawaban terlihat benar / tidak ada yang bisa dibedakan).
var SHADOW_TOPIK_DILARANG = { colors: 1 };

function genShadowBank(){
  var pool = VOCAB.filter(function(v){ return !SHADOW_TOPIK_DILARANG[v.topic]; });
  var r = [];
  for(var i=0;i<60;i++){
    var item = pool[Math.floor(Math.random()*pool.length)];
    // Pengecoh diambil dari TOPIK YANG SAMA supaya soalnya bermakna
    // (menebak antara Cat dan Apple terlalu mudah, tidak melatih apa pun).
    var sekelas = pool.filter(function(v){
      return v.topic===item.topic && v.word!==item.word; });
    var salah = {};
    var batas = 0;
    while(Object.keys(salah).length<3 && batas<200){
      batas++;
      var w = sekelas[Math.floor(Math.random()*sekelas.length)];
      if(w) salah[w.word]=1;
    }
    var opts = [item.word].concat(Object.keys(salah));
    if(opts.length<4) continue;                 // topik terlalu kecil — lewati
    opts = opts.sort(function(){ return Math.random()-.5; });
    r.push({ t:'shadow', emoji:item.emoji, word:item.word, cat:item.topic,
             arti:item.arti, o:opts, a:opts.indexOf(item.word) });
  }
  return r;
}

// ══════════════════════════════════════════════════════════
// SPELLING BEE (§10)
// ══════════════════════════════════════════════════════════
//
// Kelas 1 SD: kata panjang seperti "Watermelon" (10 huruf) terlalu berat dan
// bikin patah semangat. Dibatasi maksimal 6 huruf, dan hanya satu kata
// (tanpa spasi) supaya ubinnya tidak membingungkan.
var SPELL_MAKS_HURUF = 6;

function genSpellBank(){
  var pool = VOCAB.filter(function(v){
    return v.word.length<=SPELL_MAKS_HURUF && v.word.indexOf(' ')===-1;
  });
  var r = [];
  for(var i=0;i<60;i++){
    var item = pool[Math.floor(Math.random()*pool.length)];
    var huruf = item.word.toUpperCase().split('');
    // Ubin diacak. Kalau kebetulan hasil acakannya sama persis dengan kata
    // aslinya, soalnya jadi tidak melatih apa-apa — jadi diacak ulang.
    var ubin, coba = 0;
    do{
      ubin = huruf.slice().sort(function(){ return Math.random()-.5; });
      coba++;
    }while(coba<12 && ubin.join('')===huruf.join('') && huruf.length>1);
    r.push({ t:'spell', emoji:item.emoji, word:item.word, cat:item.topic,
             arti:item.arti, huruf:huruf, ubin:ubin });
  }
  return r;
}

// ══════════════════════════════════════════════════════════
// WORD BUILDER (§13)
// ══════════════════════════════════════════════════════════
//
// Kalimat diambil dari VOCAB.contoh ("This is a cat.") — bukan daftar kalimat
// terpisah, supaya menambah kosakata otomatis menambah kalimat juga.
function genBuildBank(){
  var r = [];
  for(var i=0;i<60;i++){
    var item = VOCAB[Math.floor(Math.random()*VOCAB.length)];
    var kata = item.contoh.replace(/\.$/,'').split(/\s+/);
    if(kata.length<3) continue;
    var ubin, coba = 0;
    do{
      ubin = kata.slice().sort(function(){ return Math.random()-.5; });
      coba++;
    }while(coba<12 && ubin.join(' ')===kata.join(' '));
    r.push({ t:'build', emoji:item.emoji, word:item.word, cat:item.topic,
             arti:item.arti, kalimat:kata, ubin:ubin });
  }
  return r;
}

// ══════════════════════════════════════════════════════════
// BUILDER
// ══════════════════════════════════════════════════════════
// Campuran seimbang. Sama seperti buildBingBank, kata yang sama tidak boleh
// muncul dua kali dalam satu sesi (B8) — kalau berulang, penguasaan kata itu
// terhitung dua kali dan skornya melonjak palsu.
function buildEngBank(n){
  var semua = []
    .concat(genShadowBank().slice(0, Math.ceil(n*0.4)))
    .concat(genSpellBank().slice(0,  Math.ceil(n*0.3)))
    .concat(genBuildBank().slice(0,  Math.ceil(n*0.3)))
    .sort(function(){ return Math.random()-.5; });

  var out = [], dipakai = {};
  for(var i=0;i<semua.length && out.length<n;i++){
    var k = semua[i].t + ':' + semua[i].word;
    if(dipakai[k]) continue;
    dipakai[k] = 1; out.push(semua[i]);
  }
  // Cadangan: jumlah soal TIDAK PERNAH boleh kurang dari yang diminta.
  for(var j=0;j<semua.length && out.length<n;j++) out.push(semua[j]);
  return out;
}

// Label tipe untuk layar hasil & laporan
var ENG_LABEL = { shadow:'🌑 Tebak Siluet', spell:'🔤 Susun Huruf', build:'📝 Susun Kalimat' };
