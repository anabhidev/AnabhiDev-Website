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
}
const APP_IDS=['math','fun','bindo','bing','sains','seni','logika','mix'];
function selectApp(a){
  S.app=a;
  APP_IDS.forEach(id=>document.getElementById('acard-'+id).classList.toggle('sel',a===id));
  checkReady();
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
  Object.assign(S,{score:0,qIdx:0,results:[],statDetail:{},startTime:Date.now(),active:true,tgSent:false,_payload:null});
  const BANK_BUILDERS={math:buildMathBank,fun:buildFunBank,bindo:buildBindoBank,bing:buildBingBank,sains:buildSainsBank,seni:buildSeniBank,logika:buildLogikaBank,mix:buildMixBank};
  S.qBank = BANK_BUILDERS[S.app](S.qCount);

  // Theme & partikel per app
  const THEMES={
    math: {cls:'th-space', part:['⭐','🌟','💫','✨','🌙','☄️','🚀','🪐']},
    fun:  {cls:'th-candy', part:['🌟','✨','💫','🎀','🍭','🌈','💜','⭐']},
    bindo:{cls:'th-bindo', part:['📖','✏️','📝','🔤','⭐','✨','📕','🖍️']},
    bing: {cls:'th-bing',  part:['🦉','📘','⭐','✨','🔤','💙','🌟','📖']},
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
  document.getElementById('appBadge').textContent={math:'🚀',fun:'🎨',bindo:'✍️',bing:'🦉',sains:'🔬',seni:'🎨',logika:'🧩',mix:'🌀'}[S.app];
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
