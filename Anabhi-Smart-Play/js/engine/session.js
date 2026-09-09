// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Pilih pemain, mulai & akhiri sesi
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════
// WELCOME LOGIC
// ══════════════════════════════════════
function selectPlayer(p){
  S.player=p;
  document.getElementById('pcard-ana').classList.toggle('selected',p==='ana');
  document.getElementById('pcard-abhi').classList.toggle('selected',p==='abhi');
  checkReady();
  // Ringkasan penguasaan ditampilkan per anak — Ana dan Abhi punya catatan
  // sendiri, jadi angkanya wajib ikut berganti saat pemainnya berganti.
  try{ if(typeof segarkanRingkasan==='function') segarkanRingkasan(); }catch(e){}
  var cn=document.getElementById('cardNote'); if(cn) cn.hidden=true;
  // Kalau tadi sudah menekan Belajar Kata / Cerita Seru, langsung jalankan —
  // niatnya tidak perlu diulang.
  if(learnPending) jalankanLearn();
}
const APP_IDS=['math','fun','bindo','bing','eng','sains','seni','logika','mix'];

// Kartu "belajar santai". Sejak v5.12 keduanya ikut aturan pilih-memilih yang
// SAMA dengan kartu game: ditekan -> menyala + centang hijau, dan pilihannya
// TIDAK hilang saat nama anak dipilih setelahnya.
//
// 🔴 Masalah nyata yang diperbaiki: dulu menekan kartu ini tanpa memilih anak
// cuma memunculkan pesan "Pilih Ana atau Abhi dulu", lalu niatnya HILANG —
// setelah memilih nama, orang tua harus menekan kartunya lagi. Sekarang
// niatnya disimpan di learnPending dan dijalankan begitu namanya dipilih.
const LEARN_IDS=['belajar','cerita'];
let learnPending=null;

function bersihkanPilihanKartu(){
  APP_IDS.concat(LEARN_IDS).forEach(function(id){
    const el=document.getElementById('acard-'+id);
    if(el) el.classList.remove('sel');
  });
}

function selectApp(a){
  S.app=a;
  learnPending=null;                 // memilih game membatalkan niat belajar santai
  bersihkanPilihanKartu();
  const el=document.getElementById('acard-'+a);
  if(el) el.classList.add('sel');
  const cn=document.getElementById('cardNote'); if(cn) cn.hidden=true;
  checkReady();
}

// Memilih Belajar Kata / Cerita Seru.
function selectLearn(jenis){
  S.app=null;                        // bukan sesi permainan — tombol Mulai tetap mati
  learnPending=jenis;
  bersihkanPilihanKartu();
  const el=document.getElementById('acard-'+jenis);
  if(el) el.classList.add('sel');
  checkReady();

  const cn=document.getElementById('cardNote');
  if(S.player){
    if(cn) cn.hidden=true;
    jalankanLearn();
  }else{
    // Belum pilih anak: kartunya TETAP menyala, tinggal pilih nama.
    if(cn){ cn.hidden=false; cn.textContent='Pilih Ana atau Abhi dulu ya 😊'; }
  }
}

function jalankanLearn(){
  const j=learnPending;
  learnPending=null;                 // sekali jalan, jangan terpicu lagi
  if(j==='belajar')      bukaKartu();
  else if(j==='cerita')  bukaCerita();
}
function selectQ(n){
  S.qCount=n;
  document.querySelectorAll('.qcbtn').forEach(b=>b.classList.toggle('sel',parseInt(b.dataset.q)===n));
  checkReady();
}
function checkReady(){
  const ok=S.player&&S.app&&S.qCount>0;
  document.getElementById('startBtn').classList.toggle('ready',ok);
}

// ══════════════════════════════════════
// START GAME
// ══════════════════════════════════════
function startGame(){
  if(!S.player||!S.app||!S.qCount)return;
  const now=new Date();
  const pad=n=>String(n).padStart(2,'0');
  S.sessionId=`${S.player.toUpperCase()}-${S.app.toUpperCase()}-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  Object.assign(S,{score:0,qIdx:0,results:[],statDetail:{},startTime:Date.now(),active:true,tgSent:false,_payload:null,hintDipakai:0});
  const BANK_BUILDERS={math:buildMathBank,fun:buildFunBank,bindo:buildBindoBank,bing:buildBingBank,eng:buildEngBank,sains:buildSainsBank,seni:buildSeniBank,logika:buildLogikaBank,mix:buildMixBank};
  S.qBank = BANK_BUILDERS[S.app](S.qCount);

  // Theme & partikel per app
  const THEMES={
    math: {cls:'th-space', part:['⭐','🌟','💫','✨','🌙','☄️','🚀','🪐']},
    fun:  {cls:'th-candy', part:['🌟','✨','💫','🎀','🍭','🌈','💜','⭐']},
    bindo:{cls:'th-bindo', part:['📖','✏️','📝','🔤','⭐','✨','📕','🖍️']},
    bing: {cls:'th-bing',  part:['🦉','📘','⭐','✨','🔤','💙','🌟','📖']},
    eng:  {cls:'th-eng',   part:['🌍','🔤','⭐','✨','📝','🌊','🌟','🎧']},
    sains:{cls:'th-sains', part:['🌱','🔬','🍃','⭐','✨','🌿','🦋','💚']},
    seni: {cls:'th-seni',  part:['🎨','🖌️','🎭','🎵','✨','🌈','🖍️','⭐']},
    logika:{cls:'th-logika',part:['🧩','⚡','🔷','🔶','✨','💡','❓','⭐']},
    mix:  {cls:'th-mix',   part:['🌀','⭐','✨','💫','🎯','🔥','🌟','💥']},
  };
  document.body.className=THEMES[S.app].cls;
  buildParticles(THEMES[S.app].part);

  const pd=PDATA[S.player];
  setPhoto(document.getElementById('hudPhoto'),pd);
  document.getElementById('hudName').textContent=pd.name;
  document.getElementById('hudScore').textContent='0';
  document.getElementById('appBadge').textContent={math:'🚀',fun:'🎨',bindo:'✍️',bing:'🦉',eng:'🌍',sains:'🔬',seni:'🎨',logika:'🧩',mix:'🌀'}[S.app];
  document.getElementById('totQ').textContent=S.qCount;

  setGuard(true);
  showScr('s-game');
  showQ(0);
}

// ══════════════════════════════════════
// SHOW QUESTION
// ══════════════════════════════════════
function showQ(idx){
  if(idx>=S.qCount){finishGame();return;}
  S.qIdx=idx;
  // Update progress
  document.getElementById('curQ').textContent=idx+1;
  document.getElementById('progFill').style.width=`${(idx/S.qCount)*100}%`;
  document.getElementById('hudScore').textContent=S.score;
  renderQ(S.qBank[idx]);
}
