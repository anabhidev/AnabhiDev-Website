// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Service Worker & banner versi baru
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 8 September 2026, 04:40:55
// ================================================================

let swReloaded=false, pendingUpdate=false, updateDitutup=false;
function applyUpdate(){ if(!swReloaded){ swReloaded=true; window.location.reload(); } }

// Banner "Versi baru siap!" — APA GUNANYA:
// Service Worker sudah menyimpan versi baru di perangkat, tapi halaman yang
// sedang terbuka MASIH menjalankan kode lama. Tombol "Perbarui" hanya memuat
// ulang halaman supaya kode barunya dipakai. Tidak ada yang diunduh lagi,
// tidak ada data yang hilang.
// Sengaja TIDAK auto-reload: kalau halaman dimuat ulang sendiri saat anak
// sedang mengerjakan soal, jawabannya hilang (PRD §40).
function offerUpdate(){
  if(updateDitutup)return;          // sudah ditutup anak/orang tua — hormati itu
  const bar=document.getElementById('updateBar');
  if(!bar)return;
  bar.hidden=false;
  // Dorong isi halaman turun supaya banner tidak menutupi foto anak.
  try{ document.body.classList.add('ada-update'); }catch(e){}
}
function dismissUpdate(){
  const bar=document.getElementById('updateBar');
  if(bar)bar.hidden=true;
  try{ document.body.classList.remove('ada-update'); }catch(e){}
  pendingUpdate=false;
  // Ditutup = jangan ditawarkan lagi sampai halaman dimuat ulang. Tanpa ini,
  // banner muncul lagi tiap kali sesi selesai dan terasa seperti mengganggu.
  updateDitutup=true;
}
function initSW(){
  if(!('serviceWorker' in navigator))return;

  // 🔴 Bedakan PEMASANGAN PERTAMA dari UPDATE SUNGGUHAN.
  // Saat Service Worker pertama kali terpasang, ia tetap mengambil alih halaman
  // (skipWaiting + clients.claim) sehingga 'controllerchange' ikut menyala —
  // padahal tidak ada versi baru apa pun. Tanpa penjaga ini, banner
  // "Versi baru siap!" muncul di kunjungan pertama dan membingungkan.
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
    if(!sudahDikendalikan)return;          // pemasangan pertama — bukan update
    // PRD §40: JANGAN paksa refresh saat anak sedang main.
    // Tunggu sesi selesai, lalu tawarkan tombol "Perbarui".
    if(S.active){ pendingUpdate=true; return; }
    offerUpdate();
  });

  const btn=document.getElementById('updateBtn');
  if(btn)btn.addEventListener('click',applyUpdate);
  const x=document.getElementById('updateClose');
  if(x)x.addEventListener('click',dismissUpdate);
}

// ── INIT ──
