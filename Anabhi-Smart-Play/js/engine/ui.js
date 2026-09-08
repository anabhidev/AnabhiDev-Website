// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Utilitas layar, partikel & leave-guard
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════
// UTILS
// ══════════════════════════════════════
function playAgain(){
  S.player=null;S.app=null;S.qCount=0;S.tgSent=false;S._payload=null;
  document.getElementById('pcard-ana').classList.remove('selected');
  document.getElementById('pcard-abhi').classList.remove('selected');
  APP_IDS.forEach(id=>document.getElementById('acard-'+id).classList.remove('sel'));
  document.querySelectorAll('.qcbtn').forEach(b=>b.classList.remove('sel'));
  document.getElementById('startBtn').classList.remove('ready');
  document.body.className='th-space';
  buildParticles(['⭐','🌟','💫','✨','🌙','☄️']);
  showScr('s-welcome');
  setRunMode();
  updateOutboxNote();
  outboxFlush();
  // Pemain direset di atas, jadi ringkasan per anak ikut disembunyikan.
  try{ if(typeof segarkanRingkasan==='function') segarkanRingkasan(); }catch(e){}
  // Kembali ke layar awal = saat paling aman memasang versi baru yang tertunda.
  // Memuat ulang di sini tidak terlihat: layar awal muncul lagi sama persis.
  try{ if(typeof cobaPerbarui==='function') cobaPerbarui(); }catch(e){}
}
function showScr(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── PARTICLES ──
function buildParticles(items){
  const el=document.getElementById('bgPart');el.innerHTML='';
  for(let i=0;i<22;i++){
    const p=document.createElement('div');p.className='fp';
    p.style.cssText=`left:${Math.random()*100}%;font-size:${.85+Math.random()*1.2}rem;animation-duration:${7+Math.random()*10}s;animation-delay:${Math.random()*9}s;`;
    p.textContent=items[i%items.length];
    el.appendChild(p);
  }
}

// ── LEAVE GUARD ──
let guardOn=false,pendingCb=null;
function setGuard(on){
  guardOn=on;
  window.onbeforeunload=on?(e=>{e.preventDefault();e.returnValue='';return'';}) :null;
}
history.pushState(null,'',location.href);
window.addEventListener('popstate',()=>{
  if(guardOn&&S.active){history.pushState(null,'',location.href);showConfirm(null);}
});
let tsY=0;
document.addEventListener('touchstart',e=>{tsY=e.touches[0].clientY;},{passive:true});
document.addEventListener('touchmove',e=>{
  if(!guardOn||!S.active)return;
  if(window.scrollY===0&&e.touches[0].clientY-tsY>60){e.preventDefault();showConfirm(null);}
},{passive:false});
function showConfirm(cb){pendingCb=cb;document.getElementById('confirmOv').classList.add('show');}
function hideConfirm(){document.getElementById('confirmOv').classList.remove('show');pendingCb=null;}
document.getElementById('btnStay').onclick=hideConfirm;
document.getElementById('btnLeave').onclick=()=>{
  hideConfirm();setGuard(false);
  if(pendingCb)pendingCb();else{S.active=false;showScr('s-welcome');}
};

// Twemoji kini SELF-HOST: base+folder+'/'+codepoint+ext -> assets/twemoji/svg/1f34e.svg
// Path ini harus persis sama dengan yang ada di PRECACHE sw.js, kalau tidak
// cache tidak pernah kena dan emoji hilang saat offline.
function parseEmoji(el){
  try{ twemoji.parse(el||document.body,{folder:'svg',ext:'.svg',base:CONFIG.TWEMOJI_BASE}); }
  catch(e){ /* kalau twemoji gagal, emoji sistem tetap tampil — jangan mematikan app */ }
}
