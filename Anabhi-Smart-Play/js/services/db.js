// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Memori belajar — IndexedDB + mesin penguasaan
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 7 September 2026, 18:05:44
// ================================================================
//
// Menyimpan riwayat sesi, riwayat jawaban, dan PENGUASAAN per konsep/kata
// (PRD §10.8 · Master 2 §5 & §11).
//
// 🔴 DUA BAGIAN YANG SENGAJA DIPISAH:
//   1. ATURAN penguasaan  -> fungsi MURNI, tanpa menyentuh database sama sekali
//   2. PENYIMPANAN        -> pembungkus tipis IndexedDB
// Alasannya: aturan yang murni bisa diuji ribuan kali tanpa browser, sedangkan
// kalau logika dan penyimpanan menyatu, satu-satunya cara mengujinya adalah
// membuka browser sungguhan — dan itu berarti tidak pernah benar-benar diuji.
//
// 🔴 IndexedDB TIDAK BOLEH mematikan gameplay (aturan 9 CLAUDE.md).
// Semua fungsi penyimpanan dibungkus penjaga dan SELALU resolve. Kalau
// IndexedDB tidak ada (mode penyamaran, kuota penuh, browser lama), aplikasi
// tetap jalan penuh — hanya riwayatnya saja yang tidak tercatat.
//
// 🔴 Antrean laporan (outbox) SENGAJA DIBIARKAN di localStorage.
// Antrean itu sudah terbukti jalan dan diuji offline. Memindahkannya sekarang
// berisiko menghilangkan laporan yang belum terkirim — untung kecil, rugi besar.

// ══════════════════════════════════════
// 1. ATURAN PENGUASAAN  (fungsi murni)
// ══════════════════════════════════════
//
// Tahapan (Master 2 §11): BARU -> DILIHAT -> BERLATIH -> AKRAB -> DIKUASAI -> ULANG
//
// Ambang batas dikumpulkan di satu tempat supaya bisa disetel tanpa membongkar
// logika (Master 2 §19: "thresholds must be configurable and validated").
var MASTERY_ATURAN = {
  akrab    : 2,    // benar berturut-turut minimal -> AKRAB
  dikuasai : 4,    // benar berturut-turut minimal -> DIKUASAI
  // Jarak ulangan dalam HARI, per tahap. Angka kecil dulu lalu melebar —
  // kata yang sudah dikuasai tidak perlu sering ditanya lagi.
  jeda     : { baru:0, dilihat:1, berlatih:1, akrab:3, dikuasai:7, ulang:0 }
};

var HARI_MS = 86400000;

function masteryAwal(id){
  return { id:id, benar:0, salah:0, beruntun:0,
           tahap:'baru', terakhirLihat:0, terakhirBenar:0, ulangPada:0 };
}

// Menghitung keadaan BARU dari keadaan lama + satu jawaban.
// Murni: input sama -> output sama, tidak menyentuh apa pun di luar.
function masteryHitung(lama, benar, waktu){
  var m = lama ? JSON.parse(JSON.stringify(lama)) : masteryAwal('');
  var t = waktu || Date.now();
  var tahapLama = m.tahap;

  m.terakhirLihat = t;
  if(benar){
    m.benar++; m.beruntun++; m.terakhirBenar = t;
  }else{
    m.salah++; m.beruntun = 0;
  }

  if(!benar){
    // Salah setelah pernah AKRAB/DIKUASAI berarti mulai lupa -> masuk antrean ulang.
    // Ini inti "Memory Bank" (Master 2 §20): lupa itu sinyal, bukan kegagalan.
    m.tahap = (tahapLama==='akrab'||tahapLama==='dikuasai'||tahapLama==='ulang')
      ? 'ulang' : 'berlatih';
  } else if(m.beruntun >= MASTERY_ATURAN.dikuasai){
    m.tahap = 'dikuasai';
  } else if(m.beruntun >= MASTERY_ATURAN.akrab){
    m.tahap = 'akrab';
  } else if(m.benar + m.salah <= 1){
    m.tahap = 'dilihat';
  } else {
    m.tahap = 'berlatih';
  }

  var jeda = MASTERY_ATURAN.jeda[m.tahap];
  if(typeof jeda !== 'number') jeda = 1;
  m.ulangPada = t + jeda*HARI_MS;
  return m;
}

// Apakah kata/konsep ini perlu diulang sekarang?
function perluDiulang(m, waktu){
  if(!m) return true;                       // belum pernah dilihat = perlu
  if(m.tahap==='ulang') return true;        // sedang dilupakan
  return (waktu||Date.now()) >= (m.ulangPada||0);
}

// Urutan prioritas untuk antrean ulangan: yang paling dilupakan lebih dulu.
function urutkanUlangan(daftar, waktu){
  var t = waktu||Date.now();
  var bobot = { ulang:0, berlatih:1, dilihat:2, akrab:3, dikuasai:4, baru:5 };
  return daftar.slice().sort(function(a,b){
    var ba=bobot[a.tahap], bb=bobot[b.tahap];
    if(ba!==bb) return ba-bb;
    return (a.ulangPada||0)-(b.ulangPada||0);   // yang paling lama jatuh tempo
  }).filter(function(m){ return perluDiulang(m,t); });
}

var MASTERY_LABEL = { baru:'Baru', dilihat:'Dilihat', berlatih:'Berlatih',
                      akrab:'Akrab', dikuasai:'Dikuasai', ulang:'Perlu diulang' };
function masteryLabel(tahap){ return MASTERY_LABEL[tahap] || tahap; }

// Kunci penguasaan. Kata Inggris dan konsep matematika hidup di SATU tabel
// supaya mesinnya cuma satu (Master 2 §26) — dibedakan lewat awalannya.
// 🔴 Kunci WAJIB memuat pemain. Versi pertama saya menulis 'kata:animals:cat'
// tanpa nama anak, sehingga kemajuan Ana dan Abhi TERCAMPUR jadi satu: kata
// yang sudah dikuasai Abhi ikut terhitung dikuasai oleh Ana, dan antrean
// ulangan Ana ikut terhapus saat Abhi menjawab benar. Bagi mesin penguasaan,
// itu artinya seluruh datanya tidak bisa dipercaya.
// Diperbaiki sekarang, selagi yang tersimpan baru data uji.
function kunciKata(pemain, wordId){ return 'kata:'+(pemain||'?')+':'+wordId; }
function kunciKonsep(pemain, tipe){ return 'konsep:'+(pemain||'?')+':'+tipe; }

// Awalan untuk menyaring milik satu anak saja.
function awalanKata(pemain){ return 'kata:'+(pemain||'?')+':'; }

// ══════════════════════════════════════
// 2. PENYIMPANAN  (IndexedDB, semua dibungkus penjaga)
// ══════════════════════════════════════
var DB_NAMA = 'anabhi_smart_play';
var DB_VERSI = 1;
var _db = null, _dbGagal = false;

function dbBuka(){
  if(_db) return Promise.resolve(_db);
  if(_dbGagal) return Promise.resolve(null);
  return new Promise(function(resolve){
    try{
      if(typeof indexedDB === 'undefined' || !indexedDB){ _dbGagal=true; return resolve(null); }
      var req = indexedDB.open(DB_NAMA, DB_VERSI);
      req.onupgradeneeded = function(e){
        var db = e.target.result;
        if(!db.objectStoreNames.contains('sesi'))
          db.createObjectStore('sesi',{keyPath:'sessionId'});
        if(!db.objectStoreNames.contains('jawaban'))
          db.createObjectStore('jawaban',{keyPath:'id',autoIncrement:true});
        if(!db.objectStoreNames.contains('mastery'))
          db.createObjectStore('mastery',{keyPath:'id'});
      };
      req.onsuccess = function(){ _db = req.result; resolve(_db); };
      req.onerror   = function(){ _dbGagal=true; resolve(null); };
      // Kalau permintaan diblokir tab lain, jangan menggantung selamanya.
      req.onblocked = function(){ _dbGagal=true; resolve(null); };
    }catch(e){ _dbGagal=true; resolve(null); }
  });
}

function dbTulis(namaStore, nilai){
  return dbBuka().then(function(db){
    if(!db) return false;
    return new Promise(function(resolve){
      try{
        var tx = db.transaction(namaStore,'readwrite');
        tx.objectStore(namaStore).put(nilai);
        tx.oncomplete = function(){ resolve(true); };
        tx.onerror    = function(){ resolve(false); };
        tx.onabort    = function(){ resolve(false); };
      }catch(e){ resolve(false); }
    });
  }).catch(function(){ return false; });
}

function dbBaca(namaStore, kunci){
  return dbBuka().then(function(db){
    if(!db) return null;
    return new Promise(function(resolve){
      try{
        var req = db.transaction(namaStore,'readonly').objectStore(namaStore).get(kunci);
        req.onsuccess = function(){ resolve(req.result||null); };
        req.onerror   = function(){ resolve(null); };
      }catch(e){ resolve(null); }
    });
  }).catch(function(){ return null; });
}

function dbSemua(namaStore){
  return dbBuka().then(function(db){
    if(!db) return [];
    return new Promise(function(resolve){
      try{
        var req = db.transaction(namaStore,'readonly').objectStore(namaStore).getAll();
        req.onsuccess = function(){ resolve(req.result||[]); };
        req.onerror   = function(){ resolve([]); };
      }catch(e){ resolve([]); }
    });
  }).catch(function(){ return []; });
}

// ══════════════════════════════════════
// 3. PENCATATAN SESI
// ══════════════════════════════════════
//
// Dipanggil SEKALI di akhir sesi, bukan tiap soal dijawab. Alasannya: jalur
// menjawab soal adalah bagian paling sensitif terhadap jeda — menyisipkan
// tulisan database di sana berisiko membuat tombol terasa lambat bagi anak.
// 🔴 Mengembalikan true HANYA kalau datanya benar-benar tersimpan.
// Sebelumnya fungsi ini selalu menjawab true walau tidak ada satu pun tulisan
// yang berhasil — persis jenis kebohongan yang dulu bikin orang tua diberi tahu
// "laporan terkirim" padahal hilang (bug B4). Laporan palsu lebih berbahaya
// daripada kegagalan yang diakui.
function catatSesi(ringkas){
  try{
    return dbBuka().then(function(db){
      if(!db) return false;                 // tidak ada database = tidak tersimpan

      var t = Date.now();
      var perubahan = [];
      for(var i=0;i<S.qBank.length && i<S.results.length;i++){
        var q = S.qBank[i];
        var kunci = null;
        if(typeof vocabIdOfQuestion==='function'){
          var wid = vocabIdOfQuestion(q);
          if(wid) kunci = kunciKata(S.player, wid);
        }
        if(!kunci) kunci = kunciKonsep(S.player, q.t);
        perubahan.push({kunci:kunci, benar:!!S.results[i], tipe:q.t});
      }

      var tugas = [];
      tugas.push(dbTulis('sesi',{
        sessionId : S.sessionId,
        waktu     : t,
        pemain    : S.player,
        game      : S.app,
        jumlahSoal: S.qCount,
        score     : S.score,
        benar     : S.results.filter(Boolean).length,
        akurasi   : ringkas && ringkas.akurasi
      }));

      perubahan.forEach(function(p,j){
        tugas.push(dbTulis('jawaban',{
          sessionId:S.sessionId, waktu:t, pemain:S.player,
          urutan:j+1, kunci:p.kunci, tipe:p.tipe, benar:p.benar
        }));
      });

      tugas.push(perbaruiMastery(perubahan, t));

      return Promise.all(tugas).then(function(hasil){
        return hasil.length>0 && hasil.every(Boolean);
      });
    }).catch(function(){ return false; });
  }catch(e){
    return Promise.resolve(false);   // riwayat gagal != permainan gagal
  }
}

// Menggabungkan beberapa jawaban untuk kunci yang SAMA dalam satu sesi supaya
// urutannya tidak saling menimpa (mis. Mix Challenge: 3 soal 'konsep:ops').
function perbaruiMastery(perubahan, waktu){
  var per = {};
  perubahan.forEach(function(p){
    (per[p.kunci] = per[p.kunci] || []).push(p.benar);
  });
  var kunci = Object.keys(per);
  return Promise.all(kunci.map(function(k){
    return dbBaca('mastery',k).then(function(lama){
      var m = lama || masteryAwal(k);
      per[k].forEach(function(benar){ m = masteryHitung(m,benar,waktu); m.id=k; });
      return dbTulis('mastery',m);
    });
  })).then(function(hasil){
    // Jujur: true hanya kalau SEMUA penguasaan benar-benar tertulis.
    return hasil.length>0 && hasil.every(Boolean);
  }).catch(function(){ return false; });
}

// ══════════════════════════════════════
// 4. BACAAN UNTUK LAPORAN & ULANGAN
// ══════════════════════════════════════
// Semua fungsi bacaan WAJIB menerima `pemain`. Tanpa itu, laporan Ana akan
// memuat kemajuan Abhi. Kalau pemain tidak diberikan, dipakai S.player.
function pemainAktif(pemain){
  if(pemain) return pemain;
  try{ return S.player || '?'; }catch(e){ return '?'; }
}

function masteryKata(pemain){
  var aw = awalanKata(pemainAktif(pemain));
  return dbSemua('mastery').then(function(a){
    return a.filter(function(m){ return m.id && m.id.indexOf(aw)===0; });
  }).catch(function(){ return []; });
}

// Daftar kata yang perlu diulang hari ini (Memory Bank, Master 2 §20).
function kataPerluDiulang(batas, pemain){
  var p  = pemainAktif(pemain);
  var aw = awalanKata(p);
  return masteryKata(p).then(function(a){
    var u = urutkanUlangan(a, Date.now());
    return u.slice(0, batas||10).map(function(m){
      var wid = m.id.slice(aw.length);          // buang 'kata:<pemain>:'
      var v = (typeof VOCAB_BY_ID!=='undefined') ? VOCAB_BY_ID[wid] : null;
      return { wordId:wid, word:v?v.word:wid, arti:v?v.arti:'',
               emoji:v?v.emoji:'', contoh:v?v.contoh:'',
               tahap:m.tahap, label:masteryLabel(m.tahap) };
    });
  }).catch(function(){ return []; });
}

// Kata untuk sesi Smart Card. Urutannya: yang jatuh tempo diulang lebih dulu,
// baru kata yang BELUM PERNAH dilihat sama sekali. Kata yang sudah dikuasai
// dan belum jatuh tempo tidak ditampilkan — mengulang yang sudah bisa itu
// membosankan dan memakan waktu yang seharusnya dipakai untuk kata baru.
function kartuUntukBelajar(batas, pemain){
  var p  = pemainAktif(pemain);
  var aw = awalanKata(p);
  var n  = batas || 10;
  return masteryKata(p).then(function(a){
    var sudah = {};
    a.forEach(function(m){ sudah[m.id.slice(aw.length)] = m; });

    var out = [];
    // 1. yang perlu diulang
    urutkanUlangan(a, Date.now()).forEach(function(m){
      if(out.length>=n) return;
      var wid = m.id.slice(aw.length);
      var v = VOCAB_BY_ID[wid];
      if(v) out.push({ v:v, tahap:m.tahap, label:masteryLabel(m.tahap) });
    });
    // 2. kata yang belum pernah muncul
    for(var i=0;i<VOCAB.length && out.length<n;i++){
      if(!sudah[VOCAB[i].wordId]) out.push({ v:VOCAB[i], tahap:'baru', label:'Baru' });
    }
    return out;
  }).catch(function(){
    // Tanpa database, Smart Card TETAP bisa dipakai — cuma tanpa ingatan.
    return VOCAB.slice(0, n).map(function(v){
      return { v:v, tahap:'baru', label:'Baru' }; });
  });
}

// Mencatat hasil satu kartu ("sudah bisa" / "ulangi lagi").
function catatKartu(wordId, bisa, pemain){
  var k = kunciKata(pemainAktif(pemain), wordId);
  return dbBuka().then(function(db){
    if(!db) return false;
    return dbBaca('mastery',k).then(function(lama){
      var m = masteryHitung(lama || masteryAwal(k), !!bisa, Date.now());
      m.id = k;
      return dbTulis('mastery', m);
    });
  }).catch(function(){ return false; });
}

// ══════════════════════════════════════
// 5. LAPORAN MINGGUAN ORANG TUA (PRD §26)
// ══════════════════════════════════════
//
// 🔴 SEMUA ANGKA di sini dihitung dari data yang tersimpan — deterministik,
// tanpa AI sama sekali. AI hanya boleh merangkai kalimat, tidak pernah
// menghasilkan angkanya (PRD §7).
//
// Rentangnya 7 hari terakhir, bukan "minggu kalender": orang tua membuka
// laporan di hari mana pun, dan yang berguna adalah "seminggu terakhir".
function laporanMingguan(pemain, hariKe){
  var p = pemainAktif(pemain);
  var hari = hariKe || 7;
  var batas = Date.now() - hari*HARI_MS;

  return Promise.all([dbSemua('sesi'), dbSemua('jawaban'), masteryKata(p)])
    .then(function(hasil){
      var sesi = hasil[0].filter(function(s){ return s.pemain===p && s.waktu>=batas; });
      var jwb  = hasil[1].filter(function(j){ return j.pemain===p && j.waktu>=batas; });
      var kata = hasil[2];

      // Hari aktif = tanggal berbeda yang ada sesinya
      var tgl = {};
      sesi.forEach(function(s){ tgl[new Date(s.waktu).toDateString()] = 1; });

      var benar = jwb.filter(function(j){ return j.benar; }).length;

      // Kekuatan & kelemahan per jenis soal — hanya dihitung kalau datanya
      // cukup (minimal 3 soal), supaya 1 kali salah tidak langsung dicap lemah.
      var perTipe = {};
      jwb.forEach(function(j){
        var t = perTipe[j.tipe] || (perTipe[j.tipe] = {ok:0,tot:0});
        t.tot++; if(j.benar) t.ok++;
      });
      var daftarTipe = Object.keys(perTipe)
        .filter(function(t){ return perTipe[t].tot >= 3; })
        .map(function(t){
          return { tipe:t, ok:perTipe[t].ok, tot:perTipe[t].tot,
                   persen:Math.round(perTipe[t].ok/perTipe[t].tot*100) };
        })
        .sort(function(a,b){ return b.persen - a.persen; });

      var tahap = { baru:0, dilihat:0, berlatih:0, akrab:0, dikuasai:0, ulang:0 };
      kata.forEach(function(m){ if(tahap[m.tahap]!==undefined) tahap[m.tahap]++; });

      return {
        pemain      : p,
        hari        : hari,
        jumlahSesi  : sesi.length,
        hariAktif   : Object.keys(tgl).length,
        jumlahSoal  : jwb.length,
        soalBenar   : benar,
        akurasi     : jwb.length ? Math.round(benar/jwb.length*100) : 0,
        kataDikuasai: tahap.dikuasai,
        kataDipelajari: kata.length,
        perluDiulang: tahap.ulang,
        terkuat     : daftarTipe.length ? daftarTipe[0] : null,
        terlemah    : daftarTipe.length > 1 ? daftarTipe[daftarTipe.length-1] : null,
        perTipe     : daftarTipe
      };
    })
    .catch(function(){
      return { pemain:p, hari:hari, jumlahSesi:0, hariAktif:0, jumlahSoal:0,
               soalBenar:0, akurasi:0, kataDikuasai:0, kataDipelajari:0,
               perluDiulang:0, terkuat:null, terlemah:null, perTipe:[] };
    });
}

function ringkasanBelajar(pemain){
  var p  = pemainAktif(pemain);
  var aw = awalanKata(p);
  var ak = 'konsep:'+p+':';
  return dbSemua('mastery').then(function(semua){
    var a = semua.filter(function(m){
      return m.id && (m.id.indexOf(aw)===0 || m.id.indexOf(ak)===0); });
    var h = { baru:0, dilihat:0, berlatih:0, akrab:0, dikuasai:0, ulang:0 };
    a.forEach(function(m){ if(h[m.tahap]!==undefined) h[m.tahap]++; });
    return { pemain:p, total:a.length, tahap:h,
             kataDikuasai:a.filter(function(m){
               return m.id.indexOf(aw)===0 && m.tahap==='dikuasai'; }).length };
  }).catch(function(){ return {pemain:p,total:0,tahap:{},kataDikuasai:0}; });
}
