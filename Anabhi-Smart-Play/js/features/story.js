// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Layar Cerita Seru & kuis pemahaman (Master 2 §12)
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 7 September 2026, 23:12:40
// ================================================================
//
// Alur: baca halaman demi halaman -> kuis 3 soal -> hasil -> penguasaan.
//
// 🔴 Seperti Smart Cards, layar ini TIDAK mengirim laporan ke Telegram.
// Bentuk datanya berbeda dari sesi permainan (tidak ada "jumlah soal" pilihan
// anak, tidak ada poin per soal), jadi kalau dipaksa masuk ke sheet yang sama
// kolom-kolomnya jadi tidak berarti. Hasilnya tetap dicatat ke penguasaan,
// sehingga tetap muncul di Smart Card & antrean ulangan.
//
// 🔴 Semua API browser dibungkus penjaga — layar ini tidak boleh mematikan
// gameplay kalau IndexedDB tidak ada (aturan 9).

// bahasa: 'id' (Bahasa Indonesia) atau 'en' (English) — dipilih anak sebelum kuis.
var STORY = { data:null, hal:0, fase:'baca', qIdx:0, benar:0, jawaban:[], bahasa:'id' };

function bukaCerita(){
  if(!S.player){
    var n = document.getElementById('cardNote');
    if(n){ n.hidden=false; n.textContent='Pilih Ana atau Abhi dulu ya 😊'; }
    return;
  }
  document.body.className = 'th-story';
  buildParticles(['📖','⭐','✨','🌈','📚','💫','🌟','🦋']);
  showScr('s-story');
  var b = document.getElementById('storyBody');
  if(b) b.innerHTML = '<div class="card-load">Menyiapkan cerita… 📖</div>';

  // Pilih cerita berdasarkan kata yang perlu diulang — kalau database tidak
  // ada, kataPerluDiulang() mengembalikan [] dan cerita pertama yang dipakai.
  var ambil;
  try{ ambil = kataPerluDiulang(30, S.player); }
  catch(e){ ambil = Promise.resolve([]); }

  ambil.then(function(perlu){ gambarPilihCerita(perlu); })
       .catch(function(){ gambarPilihCerita([]); });
}

// ══════════════════════════════════════
// FASE 0 — PILIH CERITA (5 acak)
// ══════════════════════════════════════
// Banknya 12 cerita, tapi yang ditawarkan hanya 5 dan diacak tiap kali.
// Anak jadi punya pilihan tanpa harus memilah daftar panjang, dan cerita yang
// memuat kata jatuh tempo tetap didahulukan diam-diam.
function gambarPilihCerita(perlu){
  var body = document.getElementById('storyBody');
  var prog = document.getElementById('storyProg');
  if(!body) return;

  var dibaca = bacaRiwayatCerita();
  var daftar = pilihLimaCerita(dibaca, perlu);
  STORY.fase = 'pilih';
  if(prog) prog.textContent = 'Pilih cerita';

  body.innerHTML =
    '<div class="st-bahasa-tanya">Mau baca cerita apa? 📖</div>' +
    '<div class="st-daftar">' +
      daftar.map(function(x){
        return '<button class="st-kartu" data-id="'+x.st.id+'">' +
          (x.perluDiulang ? '<span class="st-tanda-ulang">Latihan kata</span>' : '') +
          '<span class="st-kartu-em">'+x.st.emoji+'</span>' +
          '<span class="st-kartu-judul">'+x.st.judul+'</span>' +
          '<span class="st-kartu-id">'+x.st.judulId+'</span>' +
          (x.sudahDibaca ? '<span class="st-kartu-sudah">sudah dibaca</span>' : '') +
        '</button>';
      }).join('') +
    '</div>';

  body.querySelectorAll('.st-kartu').forEach(function(b){
    b.addEventListener('click', function(){ mulaiCerita(b.dataset.id); });
  });
}

function mulaiCerita(id){
  var st = ceritaBerId(id);
  if(!st) return;
  STORY.data = siapkanCerita(st);
  STORY.hal = 0; STORY.fase = 'baca';
  STORY.qIdx = 0; STORY.benar = 0; STORY.jawaban = [];
  gambarCerita();
}

// Riwayat cerita disimpan di localStorage, bukan IndexedDB: isinya cuma
// "cerita mana yang pernah dibaca" — kecil, dan tidak apa-apa hilang.
function bacaRiwayatCerita(){
  try{
    var k = 'asp_cerita_' + (S.player||'x');
    return JSON.parse(localStorage.getItem(k) || '{}') || {};
  }catch(e){ return {}; }
}
function tandaiCeritaDibaca(id){
  try{
    var k = 'asp_cerita_' + (S.player||'x');
    var d = bacaRiwayatCerita();
    d[id] = Date.now();
    localStorage.setItem(k, JSON.stringify(d));
  }catch(e){}
}

// ══════════════════════════════════════
// FASE 1 — BACA
// ══════════════════════════════════════
function gambarCerita(){
  var body = document.getElementById('storyBody');
  var prog = document.getElementById('storyProg');
  if(!body || !STORY.data) return;

  var d = STORY.data;
  var h = d.halaman[STORY.hal];
  var akhir = STORY.hal >= d.halaman.length - 1;

  if(prog) prog.textContent = 'Halaman ' + (STORY.hal+1) + '/' + d.halaman.length;

  body.innerHTML =
    '<div class="st-judul">' + d.emoji + ' ' + d.judul + '</div>' +
    '<div class="st-judul-id">' + d.judulId + '</div>' +
    '<div class="st-hal">' +
      '<div class="st-em">' + h.em + '</div>' +
      '<div class="st-en">' + h.en + '</div>' +
      '<div class="st-id">' + h.id + '</div>' +
    '</div>' +
    '<div class="st-nav">' +
      (STORY.hal>0 ? '<button class="st-prev" id="stPrev">← Kembali</button>' : '') +
      '<button class="st-next" id="stNext">' +
        (akhir ? '📝 Jawab Soal!' : 'Lanjut →') + '</button>' +
    '</div>';

  var next = document.getElementById('stNext');
  if(next) next.addEventListener('click', function(){
    if(akhir){ STORY.fase='bahasa'; gambarPilihBahasa(); }
    else { STORY.hal++; gambarCerita(); }
  });
  var prev = document.getElementById('stPrev');
  if(prev) prev.addEventListener('click', function(){
    if(STORY.hal>0){ STORY.hal--; gambarCerita(); }
  });
}

// ══════════════════════════════════════
// FASE 2 — PILIH BAHASA SOAL
// ══════════════════════════════════════
//
// Ceritanya selalu dua bahasa, tapi SOALNYA dipilih. Anak yang belum lancar
// membaca Inggris tetap bisa membuktikan ia paham isi ceritanya lewat soal
// Bahasa Indonesia — kalau soalnya dipaksa Inggris, yang terukur jadi
// "bisa membaca Inggris", bukan "paham ceritanya". Dua hal yang berbeda.
//
// Pilihan terakhir diingat per anak, dan dipakai sebagai pilihan yang menyala
// duluan — supaya yang sudah nyaman dengan satu bahasa tidak memilih ulang
// setiap kali, tapi tetap bebas berpindah.
function bacaBahasaTerakhir(){
  try{
    var v = localStorage.getItem('asp_bahasa_soal_' + (S.player||'x'));
    return (v==='en'||v==='id') ? v : 'id';
  }catch(e){ return 'id'; }
}
function simpanBahasaTerakhir(b){
  try{ localStorage.setItem('asp_bahasa_soal_' + (S.player||'x'), b); }catch(e){}
}

function gambarPilihBahasa(){
  var body = document.getElementById('storyBody');
  var prog = document.getElementById('storyProg');
  var d = STORY.data;
  if(!body || !d) return;

  var pilihan = bacaBahasaTerakhir();
  if(prog) prog.textContent = 'Pilih bahasa';

  body.innerHTML =
    '<div class="st-judul-kecil">' + d.emoji + ' ' + d.judul + '</div>' +
    '<div class="st-bahasa-tanya">Soal pakai bahasa apa? 🤔</div>' +
    '<div class="st-bahasa">' +
      // Sengaja BUKAN emoji bendera (🇮🇩/🇬🇧): di Windows bendera tidak
      // digambar sama sekali, hanya muncul sebagai huruf "ID"/"GB". Buku
      // berwarna tampil sama di semua perangkat, dan warnanya sendiri sudah
      // jadi pembeda yang bisa dikenali anak yang belum lancar membaca.
      '<button class="st-bhs' + (pilihan==='id'?' terakhir':'') + '" data-b="id">' +
        '<span class="bhs-ikon">📗</span>' +
        '<span class="bhs-nama">Bahasa Indonesia</span>' +
        '<span class="bhs-ket">Lebih mudah dipahami</span>' +
      '</button>' +
      '<button class="st-bhs' + (pilihan==='en'?' terakhir':'') + '" data-b="en">' +
        '<span class="bhs-ikon">📘</span>' +
        '<span class="bhs-nama">English</span>' +
        '<span class="bhs-ket">Lebih menantang</span>' +
      '</button>' +
    '</div>' +
    '<div class="st-nav">' +
      '<button class="st-prev" id="stKembaliBaca">← Baca lagi</button>' +
    '</div>';

  body.querySelectorAll('.st-bhs').forEach(function(b){
    b.addEventListener('click', function(){
      STORY.bahasa = b.dataset.b;
      simpanBahasaTerakhir(STORY.bahasa);
      STORY.fase='kuis'; STORY.qIdx=0; STORY.benar=0; STORY.jawaban=[];
      gambarKuis();
    });
  });
  var kb = document.getElementById('stKembaliBaca');
  if(kb) kb.addEventListener('click', function(){
    STORY.fase='baca'; STORY.hal=0; gambarCerita();
  });
}

// ══════════════════════════════════════
// FASE 3 — KUIS
// ══════════════════════════════════════
function gambarKuis(){
  var body = document.getElementById('storyBody');
  var prog = document.getElementById('storyProg');
  var d = STORY.data;
  if(!body || !d) return;

  if(STORY.qIdx >= d.soal.length){ gambarHasilCerita(); return; }

  // Ambil versi soal sesuai bahasa yang dipilih anak.
  var s = d.soal[STORY.qIdx][STORY.bahasa] || d.soal[STORY.qIdx].id;
  if(prog) prog.textContent = 'Soal ' + (STORY.qIdx+1) + '/' + d.soal.length;

  body.innerHTML =
    '<div class="st-judul-kecil">' + d.emoji + ' ' + d.judul +
      ' <span class="st-bhs-tanda">' +
        (STORY.bahasa==='en' ? '📘 English' : '📗 Indonesia') + '</span></div>' +
    '<div class="q-text st-tanya">' + s.q + '</div>' +
    '<div class="opts-grid" id="stOpts">' +
      s.o.map(function(x,i){
        return '<button class="opt-btn" data-i="'+i+'"><span class="opt-time">'+x+'</span></button>';
      }).join('') +
    '</div>' +
    '<div id="stFb"></div>';

  var btns = body.querySelectorAll('.opt-btn');
  btns.forEach(function(b){
    b.addEventListener('click', function(){
      jawabKuis(parseInt(b.dataset.i), s, btns);
    });
  });
}

function jawabKuis(pilih, s, btns){
  btns.forEach(function(b){ b.disabled = true; });
  var ok = pilih === s.a;
  STORY.jawaban.push(ok);
  if(ok) STORY.benar++;

  btns[pilih].classList.add(ok ? 'is-correct' : 'is-wrong');
  if(!ok && btns[s.a]) btns[s.a].classList.add('show-ans');

  var fb = document.getElementById('stFb');
  if(fb){
    if(ok){
      fb.className = 'fb-msg ok';
      var m = ['✅ Betul! Hebat! 🎉','✅ Benar! Kamu paham ceritanya! 🌟','✅ Yes! Pintar! 🚀'];
      fb.textContent = m[Math.floor(Math.random()*m.length)];
    }else{
      fb.className = 'fb-msg err';
      fb.innerHTML = '❌ Belum tepat. Yang benar:<br><b>' + s.benar + '</b> 💪';
    }
  }

  STORY.qIdx++;
  // Jawaban salah diberi waktu lebih lama supaya koreksinya sempat dibaca —
  // sama seperti soal ketik & susun ubin.
  setTimeout(function(){ gambarKuis(); }, ok ? 950 : 2400);
}

// ══════════════════════════════════════
// FASE 3 — HASIL
// ══════════════════════════════════════
function gambarHasilCerita(){
  var body = document.getElementById('storyBody');
  var prog = document.getElementById('storyProg');
  var d = STORY.data;
  if(prog) prog.textContent = 'Selesai!';

  var total = d.soal.length;
  var semua = STORY.benar === total;

  // Kata dalam cerita dicatat ke penguasaan. Dianggap "bisa" hanya kalau
  // kuisnya benar semua — membaca saja belum tentu paham.
  try{
    if(typeof catatKartu === 'function'){
      d.kata.forEach(function(w){ catatKartu(w, semua, S.player); });
    }
  }catch(e){}
  tandaiCeritaDibaca(d.id);

  var daftarKata = d.kata.map(function(w){
    var v = (typeof VOCAB_BY_ID!=='undefined') ? VOCAB_BY_ID[w] : null;
    return v ? '<span class="st-kata">' + v.emoji + ' <b>' + v.word + '</b> ' +
               (v.arti||'') + '</span>' : '';
  }).join('');

  body.innerHTML =
    '<div class="card-selesai">' +
      '<div class="cs-emoji">' + (semua ? '🏆' : '💪') + '</div>' +
      '<div class="cs-judul">' + (semua ? 'Hebat, semua benar!' : 'Bagus, terus berlatih!') + '</div>' +
      '<div class="cs-angka"><b>' + STORY.benar + '</b> dari ' + total + ' soal benar</div>' +
      '<div class="st-kata-judul">Kata dari cerita ini:</div>' +
      '<div class="st-kata-wrap">' + daftarKata + '</div>' +
      '<div class="st-tombol">' +
        '<button class="ca-ulang" id="stUlang">📖 Baca lagi</button>' +
        '<button class="ca-bisa"  id="stLain">✨ Cerita lain</button>' +
      '</div>' +
    '</div>';

  var u = document.getElementById('stUlang');
  if(u) u.addEventListener('click', function(){ mulaiCerita(d.id); });
  var l = document.getElementById('stLain');
  if(l) l.addEventListener('click', bukaCerita);
}

function tutupCerita(){
  document.body.className = 'th-space';
  buildParticles(['⭐','🌟','💫','✨','🌙','☄️']);
  showScr('s-welcome');
  setRunMode();
  updateOutboxNote();
  segarkanRingkasan();
  try{ if(typeof cobaPerbarui==='function') cobaPerbarui(); }catch(e){}
}
