// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Service Worker & banner versi baru
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

let swReloaded=false, pendingUpdate=false;
function applyUpdate(){ if(!swReloaded){ swReloaded=true; window.location.reload(); } }
function offerUpdate(){
  const bar=document.getElementById('updateBar');
  if(bar)bar.hidden=false;
}
function dismissUpdate(){
  const bar=document.getElementById('updateBar');
  if(bar)bar.hidden=true;
  pendingUpdate=false;
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
