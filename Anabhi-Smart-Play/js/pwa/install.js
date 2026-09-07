// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Tombol install & penanda display-mode
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════
// PWA — INSTALL, DISPLAY MODE, UPDATE
// ══════════════════════════════════════
let deferredPrompt=null, appInstalled=false;

// Dibungkus try/catch: matchMedia tidak ada di sebagian WebView/browser lama.
// Tanpa pengaman ini, satu API yang hilang mematikan playAgain() —
// tombol "Main Lagi" ikut berhenti bekerja. Fitur PWA boleh absen,
// gameplay TIDAK BOLEH ikut mati.
function isStandalone(){
  try{
    if(window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
  }catch(e){}
  return window.navigator.standalone===true;
}
// Penanda display-mode (SOP 18.7, MANDATORY) — bukti definitif aplikasi vs pintasan
function setRunMode(){
  const el=document.getElementById('runMode');
  if(el)el.textContent=isStandalone()?'· aplikasi':'· browser';
}
function showNote(html){
  const n=document.getElementById('pwaNote');
  if(!n)return;
  n.dataset.pwaMsg='1'; n.hidden=false; n.innerHTML=html;
}
function petunjukManual(){
  const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||
            (navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  showNote(ios
    ? 'Di iPhone/iPad: buka lewat <b>Safari</b> → tombol Bagikan ⬆️ → <b>Add to Home Screen</b> → <b>Add</b>.<br>(Chrome di iOS tidak bisa memasang aplikasi.)'
    : 'Kalau tombol belum bekerja: menu <b>⋮</b> Chrome → <b>Install app</b> / <i>Install and create shortcut</i> → pilih <b>Install</b> (bukan <i>Create shortcut</i>).');
}
function peringatanPintasan(){
  showNote('⚠️ Sepertinya yang terpasang <b>pintasan</b>, bukan aplikasi.<br>Hapus ikonnya (pilih <b>Uninstall</b>), lalu Chrome → Settings → Site settings → situs ini → <b>Delete</b>, tutup Chrome dari recent apps, buka lagi dan pasang ulang.');
}

// 🔴 TANPA e.preventDefault() — memanggilnya membuat pop-up install bawaan
// Chrome TIDAK PERNAH muncul dan pengguna terpaksa lewat menu titik tiga (SOP 18.6)
window.addEventListener('beforeinstallprompt',e=>{
  deferredPrompt=e;
  const b=document.getElementById('installBtn');
  if(b&&!isStandalone())b.hidden=false;
});
window.addEventListener('appinstalled',()=>{
  appInstalled=true;
  const b=document.getElementById('installBtn');
  if(b)b.hidden=true;
  showNote('✅ Anabhi Smart Play berhasil dipasang! Buka dari ikon di layar utama ya.');
});

function initInstallUI(){
  const btn=document.getElementById('installBtn');
  if(!btn)return;
  if(isStandalone()){btn.hidden=true;return;}

  // Chrome menahan prompt (Site Engagement Score belum cukup) -> tetap tampilkan
  // tombol berisi petunjuk manual setelah ~3 detik
  setTimeout(()=>{ if(!deferredPrompt&&!isStandalone())btn.hidden=false; },3000);

  btn.addEventListener('click',()=>{
    if(deferredPrompt){
      // Kalau banner Chrome sudah memakai event ini lebih dulu, prompt()
      // melempar InvalidStateError -> tanpa try/catch tombol mati diam-diam
      try{ deferredPrompt.prompt(); }
      catch(err){ deferredPrompt=null; petunjukManual(); return; }
      deferredPrompt.userChoice.then(res=>{
        deferredPrompt=null;
        if(res.outcome!=='accepted')return;
        // Kalau 'appinstalled' tidak menyala dalam ~9 detik, besar kemungkinan
        // yang terbentuk pintasan, bukan aplikasi
        setTimeout(()=>{ if(!appInstalled&&!isStandalone())peringatanPintasan(); },9000);
      });
      return;
    }
    petunjukManual();
  });
}

// ── SERVICE WORKER ──
