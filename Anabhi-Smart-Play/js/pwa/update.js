// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Service Worker & pemasangan versi baru (diam-diam)
// Development · Anabhi Dev
// Version   : 2.0
// Generated : 8 September 2026, 17:10:22
// ================================================================
//
// 🔴 TIDAK ADA BANNER. Dihapus di v5.9 atas permintaan orang tua — banner
// "Versi baru siap!" muncul di atas layar awal dan mengganggu.
//
// Kenapa aman dihapus: Service Worker sudah memakai skipWaiting() +
// clients.claim(), jadi versi baru SUDAH aktif di perangkat begitu selesai
// diunduh. Yang tersisa hanyalah halaman yang sedang terbuka masih memakai
// kode lama. Jadi banner itu sebenarnya cuma "tombol muat ulang" — dan
// memuat ulang bisa dilakukan sendiri oleh aplikasi pada saat yang aman.
//
// KAPAN dianggap aman:
//   1. anak TIDAK sedang mengerjakan soal  (S.active === false)  — PRD §40
//   2. sedang berada di LAYAR AWAL
// Di layar awal, memuat ulang tidak terlihat sama sekali: layar awal hilang
// lalu muncul lagi dalam keadaan sama persis. Tidak ada yang perlu ditekan,
// tidak ada jawaban yang hilang.
//
// Kalau syaratnya belum terpenuhi, permintaan ditahan (pendingUpdate) dan
// dicoba lagi setiap kali anak kembali ke layar awal (playAgain / tutupKartu /
// tutupCerita). Kalau aplikasi keburu ditutup, versi baru tetap terpakai
// pada pembukaan berikutnya — jadi tidak ada jalan buntu.

let swReloaded=false, pendingUpdate=false;

function applyUpdate(){
  if(swReloaded)return;
  swReloaded=true;
  window.location.reload();
}

// Apakah sekarang saat yang aman untuk memasang versi baru?
function amanUntukPerbarui(){
  try{
    if(S.active)return false;                       // anak sedang main
    const w=document.getElementById('s-welcome');
    return !!(w&&w.classList.contains('active'));   // hanya di layar awal
  }catch(e){ return false; }
}

// Dipanggil saat versi baru siap, DAN setiap kali kembali ke layar awal.
function cobaPerbarui(){
  if(!pendingUpdate)return;
  if(!amanUntukPerbarui())return;
  applyUpdate();
}

function initSW(){
  if(!('serviceWorker' in navigator))return;

  // 🔴 Bedakan PEMASANGAN PERTAMA dari UPDATE SUNGGUHAN.
  // Saat Service Worker pertama kali terpasang, ia tetap mengambil alih halaman
  // (skipWaiting + clients.claim) sehingga 'controllerchange' ikut menyala —
  // padahal tidak ada versi baru apa pun. Tanpa penjaga ini, halaman akan
  // memuat ulang tanpa alasan di kunjungan pertama.
  const sudahDikendalikan = !!navigator.serviceWorker.controller;

  navigator.serviceWorker.register('sw.js').then(reg=>{
    reg.addEventListener('updatefound',()=>{
      const nw=reg.installing;
      if(!nw)return;
      nw.addEventListener('statechange',()=>{
        if(nw.state==='installed'&&navigator.serviceWorker.controller){
          nw.postMessage({type:'SKIP_WAITING'});
        }
      });
    });
  }).catch(()=>{});

  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(swReloaded)return;
    if(!sudahDikendalikan)return;      // pemasangan pertama — bukan update
    pendingUpdate=true;
    cobaPerbarui();                    // pasang sekarang kalau memang aman
  });
}
