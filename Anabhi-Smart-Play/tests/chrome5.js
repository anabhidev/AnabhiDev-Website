const puppeteer=require('puppeteer-core');
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe';
const URL='http://localhost:5501/Anabhi-Smart-Play/';
let fail=0;const ok=(c,m)=>{if(!c){console.log('  ❌ '+m);fail++;}else console.log('  ✅ '+m);};
async function play(p,pl,cat,qc){
  await p.evaluate((a,b,c)=>{selectPlayer(a);selectApp(b);selectQ(c);startGame();},pl,cat,qc);
  for(let i=0;i<qc;i++){
    await p.evaluate(()=>{const q=S.qBank[S.qIdx];
      if(q.t==='ketik'){const inp=document.getElementById('typeInput');inp.value=q.sentence;document.getElementById('checkBtn').click();return;}
      const a=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a;
      document.querySelectorAll('.opt-btn')[a].click();});
    await new Promise(r=>setTimeout(r,2400));
  }
  await new Promise(r=>setTimeout(r,700));
}
(async()=>{
  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
  const p=await b.newPage(); await p.setViewport({width:1280,height:900});
  let GAS='ok';
  await p.setRequestInterception(true);
  p.on('request',r=>r.url().includes('script.google.com')
    ? (GAS==='ok'?r.respond({status:200,body:'ok'}):r.abort('failed')) : r.continue());
  const bad=[],warn=[];
  p.on('requestfailed',r=>{if(!r.url().includes('script.google.com'))bad.push(r.failure().errorText+' '+r.url());});
  p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url());});
  p.on('console',m=>{const t=m.text(); if((m.type()==='error'||m.type()==='warning') && !/ERR_FAILED|ERR_INTERNET_DISCONNECTED|ERR_ABORTED/.test(t)) warn.push(m.type()+': '+t);});
  p.on('pageerror',e=>warn.push('PAGEERROR: '+e.message));

  // Versi dibaca dari index.html, tidak dipatok mati — kalau dipatok, setiap
  // kenaikan versi bikin tes merah padahal aplikasinya benar.
  const VER=(require('fs').readFileSync(require('./loadapp.js').W+'index.html','utf8')
             .match(/Version\s*:\s*(\d+\.\d+)/)||[])[1];
  console.log('── v'+VER+' MODULAR di Chrome asli ──');
  await p.goto(URL,{waitUntil:'networkidle2'});
  const verTampil=await p.evaluate(()=>document.querySelector('.version').textContent.trim());
  ok(verTampil.indexOf('v'+VER)===0,'versi: '+verTampil+' (header: '+VER+')');
  const cnt=await p.evaluate(()=>({css:document.styleSheets.length,
    fn:['startGame','renderQ','handleAns','finishGame','buildMathBank','outboxFlush','initSW','setPhoto'].filter(f=>typeof window[f]==='function').length}));
  ok(cnt.css===4,`${cnt.css} stylesheet termuat (harus 4)`);
  ok(cnt.fn===8,`${cnt.fn}/8 fungsi kunci tersedia di scope global`);
  ok((await p.evaluate(()=>document.fonts.size))===2,'2 font self-host termuat');
  ok(await p.evaluate(()=>getComputedStyle(document.querySelector('.q-card')||document.body)!==null),'CSS ter-parse');
  ok(await p.evaluate(()=>{const c=getComputedStyle(document.querySelector('.pcard'));return c.borderRadius==='28px';}),
     'CSS komponen benar-benar berlaku (.pcard border-radius 28px)');

  console.log('── Main 3 kategori ──');
  for(const [pl,cat,qc] of [['ana','math',10],['abhi','fun',15],['ana','mix',20]]){
    await play(p,pl,cat,qc);
    const r=await p.evaluate(()=>({s:S.score,m:maxScore(S.qCount),foto:document.getElementById('rcPhoto').naturalWidth,
      acc:document.getElementById('rcAcc').textContent}));
    ok(r.s===r.m,`${cat}/${qc}: skor ${r.s}/${r.m}`);
    ok(r.foto>0,`${cat}: foto anak tampil`);
    ok(/100%/.test(r.acc),`${cat}: akurasi 100%`);
    await p.evaluate(()=>playAgain()); await new Promise(r=>setTimeout(r,400));
  }

  console.log('── Offline ──');
  await p.evaluate(()=>navigator.serviceWorker.ready);
  await new Promise(r=>setTimeout(r,3000));
  const ck=await p.evaluate(async()=>{const n=await caches.keys();const c=await caches.open(n[0]);return{n:n[0],k:(await c.keys()).length};});
  ok(ck.k>=55,`cache "${ck.n}" berisi ${ck.k} berkas (termasuk 21 modul baru)`);
  await p.setOfflineMode(true);
  await p.reload({waitUntil:'domcontentloaded'});
  await new Promise(r=>setTimeout(r,900));
  ok(await p.evaluate(()=>typeof startGame==='function'),'SELURUH modul termuat dari cache saat offline');
  ok((await p.evaluate(()=>document.styleSheets.length))===4,'4 CSS termuat offline');
  ok((await p.evaluate(()=>document.fonts.size))===2,'font tetap dari cache');
  GAS='fail';
  await play(p,'ana','logika',10);
  const off=await p.evaluate(()=>({s:S.score,antre:JSON.parse(localStorage.getItem('asp_outbox_v1')||'[]').length,
    txt:document.getElementById('tgStatus').textContent}));
  ok(off.s===100,`main penuh offline, skor ${off.s}`);
  ok(off.antre>=1,`laporan diantre (${off.antre})`);
  ok(/Belum terkirim/.test(off.txt),'status jujur');

  console.log('── Online lagi ──');
  await p.setOfflineMode(false); GAS='ok';
  await p.evaluate(()=>window.dispatchEvent(new Event('online')));
  await new Promise(r=>setTimeout(r,3000));
  ok((await p.evaluate(()=>JSON.parse(localStorage.getItem('asp_outbox_v1')||'[]').length))===0,'antrean tersinkron');

  console.log('── Bersih dari error ──');
  ok(bad.length===0, bad.length?'GAGAL:\n     '+bad.join('\n     '):'nol resource gagal');
  ok(warn.length===0, warn.length?'ada:\n     '+warn.join('\n     '):'nol warning & error');
  await p.evaluate(()=>playAgain()); await new Promise(r=>setTimeout(r,500));
  await p.screenshot({path:'shot-v50.png'});
  await b.close();
  console.log('\n'+(fail===0?'✅ v'+VER+' MODULAR LOLOS SEMUA DI CHROME ASLI':'❌ '+fail+' GAGAL'));
  process.exit(fail?1:0);
})();
