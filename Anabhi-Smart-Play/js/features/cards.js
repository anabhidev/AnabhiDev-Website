// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Smart Cards & Memory Bank (Master 2 §6, §20)
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 7 September 2026, 21:40:33
// ================================================================
//
// Kartu kosakata bolak-balik. Depan: gambar + kata. Belakang: arti + contoh.
// Anak menilai sendiri "sudah bisa" / "ulangi lagi", dan penilaian itu masuk
// ke mesin penguasaan yang sama dengan yang dipakai permainan.
//
// 🔴 Ini BUKAN kuis — tidak ada skor, tidak ada benar/salah, tidak ada laporan
// ke Telegram. Tujuannya belajar tanpa tekanan (Master 2 §6). Menambahkan skor
// di sini akan mengubahnya jadi ujian, dan anak berhenti jujur menilai dirinya.
//
// 🔴 TANPA IndexedDB pun layar ini tetap jalan — hanya tidak mengingat apa pun.

var CARD = { daftar:[], idx:0, terbuka:false, aktif:false, hasil:{bisa:0,ulang:0} };
var CARD_JUMLAH = 10;

function bukaKartu(){
  if(!S.player){
    // Kartu perlu tahu ini Ana atau Abhi — penguasaan dicatat per anak.
    var n = document.getElementById('cardNote');
    if(n){ n.hidden=false; n.textContent='Pilih Ana atau Abhi dulu ya 😊'; }
    return;
  }
  CARD.aktif = true;
  CARD.hasil = {bisa:0, ulang:0};
  document.body.className = 'th-eng';
  buildParticles(['📚','🔤','⭐','✨','🌍','💙','🌟','📝']);
  showScr('s-cards');
  gambarKartuMemuat();

  kartuUntukBelajar(CARD_JUMLAH, S.player).then(function(d){
    CARD.daftar = d || [];
    CARD.idx = 0; CARD.terbuka = false;
    gambarKartu();
  }).catch(function(){
    CARD.daftar = []; gambarKartu();
  });
}

function gambarKartuMemuat(){
  var b = document.getElementById('cardBody');
  if(b) b.innerHTML = '<div class="card-load">Menyiapkan kartu… 📚</div>';
}

function gambarKartu(){
  var body = document.getElementById('cardBody');
  var prog = document.getElementById('cardProg');
  if(!body) return;

  if(!CARD.daftar.length){
    body.innerHTML = '<div class="card-load">Belum ada kata untuk dipelajari 🎉</div>';
    if(prog) prog.textContent = '';
    return;
  }

  if(CARD.idx >= CARD.daftar.length){ gambarKartuSelesai(); return; }

  var it = CARD.daftar[CARD.idx];
  var v  = it.v;
  if(prog) prog.textContent = 'Kartu ' + (CARD.idx+1) + '/' + CARD.daftar.length;

  body.innerHTML =
    '<div class="flip' + (CARD.terbuka?' dibalik':'') + '" id="flipCard">' +
      '<div class="flip-in">' +
        '<div class="flip-face flip-depan">' +
          '<span class="fc-tahap fc-' + it.tahap + '">' + it.label + '</span>' +
          '<div class="fc-emoji">' + v.emoji + '</div>' +
          '<div class="fc-kata">' + v.word + '</div>' +
          '<div class="fc-petunjuk">Ketuk untuk melihat artinya 👆</div>' +
        '</div>' +
        '<div class="flip-face flip-belakang">' +
          '<div class="fc-arti">' + (v.arti||'—') + '</div>' +
          '<div class="fc-contoh">' + v.contoh + '</div>' +
          '<div class="fc-topik">' + v.topicLabel + '</div>' +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="card-aksi" id="cardAksi"' + (CARD.terbuka?'':' hidden') + '>' +
      '<button class="ca-ulang" id="caUlang">🔁 Ulangi lagi</button>' +
      '<button class="ca-bisa"  id="caBisa">✅ Sudah bisa</button>' +
    '</div>';

  var kartu = document.getElementById('flipCard');
  kartu.addEventListener('click', function(){
    if(CARD.terbuka) return;                 // sudah terbuka: biar tombol yang bekerja
    CARD.terbuka = true;
    kartu.classList.add('dibalik');
    var aksi = document.getElementById('cardAksi');
    if(aksi) aksi.hidden = false;
  });

  var b1 = document.getElementById('caBisa');
  var b2 = document.getElementById('caUlang');
  if(b1) b1.addEventListener('click', function(){ nilaiKartu(true); });
  if(b2) b2.addEventListener('click', function(){ nilaiKartu(false); });

  // 🔴 SENGAJA TIDAK memanggil parseEmoji() di sini.
  // Kalau dipanggil, seluruh emoji kosakata (🐱🍎…) ikut jadi <img> dan butuh
  // 60 berkas SVG tambahan untuk offline. Lebih penting lagi: soal di dalam
  // permainan sudah menampilkan emoji sistem, jadi kalau kartu memakai Twemoji,
  // kata yang sama tampil BERBEDA di dua tempat. Konsisten lebih baik.
}

function nilaiKartu(bisa){
  var it = CARD.daftar[CARD.idx];
  if(!it) return;
  if(bisa) CARD.hasil.bisa++; else CARD.hasil.ulang++;

  // Ditulis tanpa ditunggu — anak tidak boleh menunggu database.
  try{ catatKartu(it.v.wordId, bisa, S.player); }catch(e){}

  // Kata yang belum bisa dimunculkan lagi di akhir tumpukan (Master 2 §20).
  if(!bisa && CARD.daftar.length < CARD_JUMLAH*2) CARD.daftar.push(it);

  CARD.idx++; CARD.terbuka = false;
  gambarKartu();
}

function gambarKartuSelesai(){
  var body = document.getElementById('cardBody');
  var prog = document.getElementById('cardProg');
  if(prog) prog.textContent = 'Selesai!';
  body.innerHTML =
    '<div class="card-selesai">' +
      '<div class="cs-emoji">🎉</div>' +
      '<div class="cs-judul">Hebat, selesai belajar!</div>' +
      '<div class="cs-angka"><b>' + CARD.hasil.bisa + '</b> kata sudah bisa</div>' +
      (CARD.hasil.ulang ? '<div class="cs-angka cs-ulang"><b>' + CARD.hasil.ulang +
        '</b> kata akan diulang lagi nanti</div>' : '') +
      '<button class="ca-bisa" id="caLagi">📚 Belajar lagi</button>' +
    '</div>';
  var lagi = document.getElementById('caLagi');
  if(lagi) lagi.addEventListener('click', bukaKartu);
}

function tutupKartu(){
  CARD.aktif = false;
  document.body.className = 'th-space';
  buildParticles(['⭐','🌟','💫','✨','🌙','☄️']);
  showScr('s-welcome');
  setRunMode();
  updateOutboxNote();
  segarkanRingkasan();
}

// ══════════════════════════════════════
// RINGKASAN DI LAYAR AWAL (Memory Bank)
// ══════════════════════════════════════
// Menampilkan berapa kata yang sudah dikuasai & berapa yang perlu diulang.
// Hanya muncul kalau memang ada datanya — layar awal anak jangan dipenuhi
// angka yang semuanya nol.
// 🔴 Penyegaran ringkasan bisa dipanggil beruntun (pilih Ana, lalu Abhi, lalu
// keluar dari kartu). Pembacaan database itu asinkron, jadi permintaan LAMA
// bisa selesai BELAKANGAN dan menimpa hasil yang baru — angka Abhi tampil di
// bawah nama Ana. Nomor urut di bawah ini membuang hasil yang sudah basi.
// (Bug yang sama pernah terjadi pada antrean laporan — lihat outboxFlush.)
var _ringkasanUrut = 0;

function segarkanRingkasan(){
  var el = document.getElementById('cardStat');
  if(!el) return;
  var urut = ++_ringkasanUrut;
  var pemain = S.player;
  if(!pemain){ el.hidden = true; return; }
  try{
    ringkasanBelajar(pemain).then(function(r){
      if(urut !== _ringkasanUrut) return;      // sudah ada permintaan lebih baru
      if(pemain !== S.player)     return;      // pemainnya keburu berganti
      if(!r || !r.total){ el.hidden = true; return; }
      var perlu = (r.tahap.ulang||0);
      var bagian = [];
      // "0 kata dikuasai" bukan kabar yang berguna untuk anak yang baru mulai —
      // yang jujur DAN menyemangati adalah berapa kata yang sedang dipelajari.
      if(r.kataDikuasai) bagian.push('<b>' + r.kataDikuasai + '</b> kata dikuasai');
      else bagian.push('sedang belajar <b>' + r.total + '</b> kata');
      if(perlu) bagian.push('<b>' + perlu + '</b> perlu diulang');
      el.hidden = false;
      el.innerHTML = '🦉 ' + bagian.join(' · ');
    }).catch(function(){
      if(urut === _ringkasanUrut) el.hidden = true;
    });
  }catch(e){ el.hidden = true; }
}
