// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Laporan mingguan orang tua (PRD §26 · Master 2 §22)
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 9 September 2026, 11:20:14
// ================================================================
//
// Ringkasan 7 hari terakhir untuk SATU anak, dihitung dari riwayat di
// IndexedDB. Menampilkan kedua anak berdampingan supaya orang tua tidak perlu
// berganti-ganti pemain hanya untuk melihat.
//
// 🔴 SEMUA ANGKA deterministik — dihitung laporanMingguan() di db.js, bukan
// dikarang AI (PRD §7). Tidak ada permintaan jaringan sama sekali di layar ini.
//
// 🔴 Layar ini untuk ORANG TUA, bukan anak. Karena itu tidak ada skor, bintang,
// atau lencana; yang ditampilkan justru hal yang tidak enak dilihat anak —
// mana yang paling lemah. Anak tidak perlu tahu dirinya sedang "dinilai".

var LAPOR = { hari:7 };

function bukaLaporan(){
  document.body.className = 'th-report';
  buildParticles(['📊','⭐','✨','📈','💡','🌟','📋','💫']);
  showScr('s-report');
  var b = document.getElementById('reportBody');
  if(b) b.innerHTML = '<div class="card-load">Menghitung laporan… 📊</div>';
  gambarLaporan();
}

function tutupLaporan(){
  document.body.className = 'th-space';
  buildParticles(['⭐','🌟','💫','✨','🌙','☄️']);
  showScr('s-welcome');
  setRunMode();
  updateOutboxNote();
  segarkanRingkasan();
  try{ if(typeof cobaPerbarui==='function') cobaPerbarui(); }catch(e){}
}

function gambarLaporan(){
  var body = document.getElementById('reportBody');
  var prog = document.getElementById('reportProg');
  if(!body) return;
  if(prog) prog.textContent = LAPOR.hari + ' hari terakhir';

  var minta;
  try{
    minta = Promise.all([ laporanMingguan('ana', LAPOR.hari),
                          laporanMingguan('abhi', LAPOR.hari) ]);
  }catch(e){ minta = Promise.resolve([null,null]); }

  minta.then(function(r){
    body.innerHTML =
      '<div class="rp-ganti">' +
        [7,30].map(function(h){
          return '<button class="rp-hari'+(LAPOR.hari===h?' aktif':'')+'" data-h="'+h+'">'+
                 h+' hari</button>';
        }).join('') +
      '</div>' +
      '<div class="rp-anak">' + kartuLaporan(r[0],'ana') + kartuLaporan(r[1],'abhi') + '</div>' +
      '<div class="rp-catatan">Semua angka dihitung dari riwayat di perangkat ini. ' +
        'Tidak ada yang dikarang.</div>';

    body.querySelectorAll('.rp-hari').forEach(function(b2){
      b2.addEventListener('click', function(){
        LAPOR.hari = parseInt(b2.dataset.h,10) || 7;
        gambarLaporan();
      });
    });
  }).catch(function(){
    body.innerHTML = '<div class="card-load">Belum ada riwayat untuk ditampilkan.</div>';
  });
}

function kartuLaporan(r, kunci){
  var pd = PDATA[kunci] || {name:kunci, tag:''};
  if(!r || !r.jumlahSoal){
    return '<div class="rp-kartu">' +
      '<div class="rp-nama">' + pd.tag + ' ' + pd.name + '</div>' +
      '<div class="rp-kosong">Belum ada sesi dalam ' + LAPOR.hari + ' hari terakhir.</div>' +
    '</div>';
  }

  // Nada kalimatnya sengaja datar & faktual. Laporan orang tua bukan tempat
  // memuji atau menyalahkan — itu tugas layar hasil anak.
  var baris = [
    ['Hari aktif',    r.hariAktif + ' dari ' + r.hari + ' hari'],
    ['Sesi bermain',  r.jumlahSesi + ' sesi'],
    ['Soal dikerjakan', r.jumlahSoal + ' soal'],
    ['Jawaban benar', r.soalBenar + ' (' + r.akurasi + '%)'],
    ['Kata dipelajari', r.kataDipelajari + ' kata'],
    ['Kata dikuasai', r.kataDikuasai + ' kata']
  ];
  if(r.perluDiulang) baris.push(['Perlu diulang', r.perluDiulang + ' kata']);

  var kuat = r.terkuat
    ? '<div class="rp-sorot rp-kuat">💪 Paling kuat: <b>' + typeName(r.terkuat.tipe) +
      '</b> ' + r.terkuat.ok + '/' + r.terkuat.tot + '</div>' : '';
  // Hanya ditampilkan kalau BEDA dari yang terkuat — kalau semua jenis soal
  // sama baiknya, menyebut "terlemah" cuma menciptakan masalah yang tidak ada.
  var lemah = (r.terlemah && r.terkuat && r.terlemah.tipe!==r.terkuat.tipe)
    ? '<div class="rp-sorot rp-lemah">🎯 Perlu latihan: <b>' + typeName(r.terlemah.tipe) +
      '</b> ' + r.terlemah.ok + '/' + r.terlemah.tot + '</div>' : '';

  return '<div class="rp-kartu">' +
    '<div class="rp-nama">' + pd.tag + ' ' + pd.name + '</div>' +
    '<div class="rp-akurasi">' + r.akurasi + '<span>%</span></div>' +
    '<div class="rp-akurasi-ket">akurasi ' + LAPOR.hari + ' hari terakhir</div>' +
    '<div class="rp-baris">' +
      baris.map(function(b){
        return '<div class="rp-item"><span>' + b[0] + '</span><b>' + b[1] + '</b></div>';
      }).join('') +
    '</div>' + kuat + lemah +
  '</div>';
}
