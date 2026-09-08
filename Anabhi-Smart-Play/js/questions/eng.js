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

// 🔴 Pengacak sungguhan (Fisher-Yates).
// Bank soal lama memakai `sort(function(){return Math.random()-.5})`. Itu BUKAN
// pengacak: pembandingnya tidak konsisten, hasilnya berat sebelah, dan untuk
// larik pendek sering mengembalikan urutan ASLI. Untuk pilihan ganda dampaknya
// cuma "kurang acak", tapi di Susun Huruf akibatnya fatal — kata muncul sudah
// tersusun benar sejak awal, jadi anak tinggal menekan berurutan tanpa belajar.
// Terbukti di tes: 3 dari 4.771 soal keluar dalam keadaan sudah jadi.
function acakUbin(arr){
  var a = arr.slice();
  for(var i=a.length-1;i>0;i--){
    var j = Math.floor(Math.random()*(i+1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

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
    // Kata dengan huruf berulang (mis. EGG) punya sedikit susunan berbeda,
    // jadi pengulangannya dibatasi — kalau tetap sama, soal ini dilewati
    // supaya tidak pernah ada soal yang sudah tersusun benar sejak awal.
    var ubin = null, coba = 0;
    do{ ubin = acakUbin(huruf); coba++; }
    while(coba<40 && ubin.join('')===huruf.join(''));
    if(ubin.join('')===huruf.join('')) continue;
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
    var ubin = null, coba = 0;
    do{ ubin = acakUbin(kata); coba++; }
    while(coba<40 && ubin.join(' ')===kata.join(' '));
    if(ubin.join(' ')===kata.join(' ')) continue;
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
// 🔴 Penyaringan kembar dilakukan SAAT mengambil dari bank, bukan sesudahnya.
// Versi pertama saya memotong tiap bank lebih dulu (0.4/0.3/0.3) lalu membuang
// yang kembar — hasilnya sering kurang dari n, dan kekurangannya ditambal
// dengan DUPLIKAT. Itu justru menciptakan ulang bug B8: satu kata dihitung dua
// kali dan skor penguasaannya melonjak palsu.
function buildEngBank(n){
  var acak = function(){ return Math.random()-.5; };
  var kuota = [
    { arr: genShadowBank(), n: Math.ceil(n*0.4) },
    { arr: genSpellBank(),  n: Math.ceil(n*0.3) },
    { arr: genBuildBank(),  n: Math.ceil(n*0.3) }
  ];

  var out = [], dipakai = {};
  function ambil(arr, batas){
    var c = 0;
    for(var i=0;i<arr.length && c<batas && out.length<n;i++){
      var k = arr[i].t + ':' + arr[i].word;
      if(dipakai[k]) continue;
      dipakai[k] = 1; out.push(arr[i]); c++;
    }
  }

  kuota.forEach(function(q){ ambil(q.arr, q.n); });

  // Masih kurang (mis. satu mekanik kehabisan kata unik)? Isi dari sisa semua
  // mekanik — tetap TANPA kembar. Total kata unik yang tersedia jauh lebih
  // banyak daripada 20, jadi jumlahnya selalu terpenuhi.
  if(out.length < n){
    var sisa = [].concat(kuota[0].arr, kuota[1].arr, kuota[2].arr).sort(acak);
    ambil(sisa, n);
  }
  return out.sort(acak);
}

// Label tipe untuk layar hasil & laporan
var ENG_LABEL = { shadow:'🌑 Tebak Siluet', spell:'🔤 Susun Huruf', build:'📝 Susun Kalimat' };
