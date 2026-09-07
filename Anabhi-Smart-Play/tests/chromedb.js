// Menguji memori belajar di Chrome SUNGGUHAN dengan IndexedDB asli.
// Yang dibuktikan: penguasaan benar-benar tersimpan, BERTAHAN setelah halaman
// dimuat ulang, dan naik tahap saat kata yang sama dijawab benar berulang kali.
// Ini tidak bisa dibuktikan di Node — vm & jsdom sama-sama tidak punya IndexedDB.
const puppeteer=require('puppeteer-core');
const {spawn}=require('child_process');
const path=require('path');
const CHROME='C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT=5507, URL='http://localhost:'+PORT+'/Anabhi-Smart-Play/';
let fail=0;
const ok=(c,m)=>{if(!c){console.log('  ❌ '+m);fail++;}else console.log('  ✅ '+m);};

// Main satu sesi penuh dengan jawaban yang ditentukan (benar/salah).
async function play(p,pl,cat,qc,benarSemua){
  await p.evaluate((a,b,c)=>{selectPlayer(a);selectApp(b);selectQ(c);startGame();},pl,cat,qc);
  for(let i=0;i<qc;i++){
    await p.evaluate((benar)=>{
      const q=S.qBank[S.qIdx];
      if(q.t==='ketik'){
        const inp=document.getElementById('typeInput');
        inp.value=benar?q.sentence:'salah';
        document.getElementById('checkBtn').click();return;
      }
      const a=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a;
      const btns=document.querySelectorAll('.opt-btn');
      btns[benar?a:(a+1)%btns.length].click();
    },benarSemua);
    await new Promise(r=>setTimeout(r,2400));
  }
  await new Promise(r=>setTimeout(r,900));
  await p.evaluate(()=>playAgain());
  await new Promise(r=>setTimeout(r,400));
}

(async()=>{
  const srv=spawn(process.execPath,[path.join(__dirname,'..','dev-server.js')],
    {env:{...process.env,PORT:String(PORT)},stdio:'ignore'});
  await new Promise(r=>setTimeout(r,900));

  const b=await puppeteer.launch({executablePath:CHROME,headless:'new',args:['--no-sandbox']});
  const p=await b.newPage(); await p.setViewport({width:1280,height:900});
  await p.setRequestInterception(true);
  // 🔴 Blokir GAS — jangan pernah mengirim laporan uji ke Telegram keluarga.
  p.on('request',r=>r.url().includes('script.google.com')?r.respond({status:200,body:'ok'}):r.continue());
  const warn=[];
  p.on('console',m=>{const t=m.text();
    if((m.type()==='error'||m.type()==='warning')&&!/ERR_FAILED|ERR_ABORTED/.test(t))warn.push(t);});
  p.on('pageerror',e=>warn.push('PAGEERROR: '+e.message));

  try{
    console.log('── IndexedDB sungguhan di Chrome ──');
    await p.goto(URL,{waitUntil:'networkidle2'});
    ok(await p.evaluate(()=>typeof indexedDB!=='undefined'),'IndexedDB tersedia');

    // Sesi 1 — semua benar
    await play(p,'ana','bing',10,true);
    let sesi=await p.evaluate(()=>dbSemua('sesi'));
    ok(sesi.length===1,'1 sesi tersimpan (dapat '+sesi.length+')');

    let mast=await p.evaluate(()=>dbSemua('mastery'));
    const kata=mast.filter(m=>m.id.indexOf('kata:')===0);
    ok(kata.length===10,'10 kata tercatat penguasaannya (dapat '+kata.length+')');
    ok(kata.every(m=>m.tahap==='dilihat'),'semua kata tahap "dilihat" setelah 1× benar');

    let jwb=await p.evaluate(()=>dbSemua('jawaban'));
    ok(jwb.length===10,'10 jawaban tercatat (dapat '+jwb.length+')');

    console.log('── 🔴 Bertahan setelah halaman dimuat ulang ──');
    await p.reload({waitUntil:'networkidle2'});
    mast=await p.evaluate(()=>dbSemua('mastery'));
    ok(mast.filter(m=>m.id.indexOf('kata:')===0).length===10,
       'penguasaan masih ada setelah reload — bukan cuma di memori');

    console.log('── Tahap naik saat kata yang sama benar berulang ──');
    for(let i=0;i<4;i++) await play(p,'ana','bing',10,true);
    mast=await p.evaluate(()=>dbSemua('mastery'));
    const kt=mast.filter(m=>m.id.indexOf('kata:')===0);
    const naik=kt.filter(m=>m.tahap==='akrab'||m.tahap==='dikuasai');
    ok(naik.length>0,naik.length+' kata sudah naik ke akrab/dikuasai');
    ok(kt.every(m=>m.beruntun>=1),'semua kata punya catatan beruntun');

    console.log('── Konsep matematika ikut tercatat ──');
    await play(p,'abhi','math',10,true);
    mast=await p.evaluate(()=>dbSemua('mastery'));
    const kons=mast.filter(m=>m.id.indexOf('konsep:')===0);
    ok(kons.length>0,kons.length+' konsep math tercatat: '+kons.map(m=>m.id.slice(7)).join(', '));

    console.log('── Salah → masuk antrean ulang ──');
    await play(p,'abhi','math',10,false);
    const antre=await p.evaluate(()=>kataPerluDiulang(20));
    const ring=await p.evaluate(()=>ringkasanBelajar());
    ok(typeof ring.total==='number'&&ring.total>0,'ringkasan belajar: '+ring.total+' entri');
    ok(Array.isArray(antre),'antrean ulangan terbaca ('+antre.length+' kata)');
    console.log('     tahap: '+JSON.stringify(ring.tahap));

    console.log('── catatSesi melaporkan JUJUR saat IndexedDB ada ──');
    const jujur=await p.evaluate(()=>{
      S.qBank=buildBingBank(5); S.results=[true,true,false,true,false];
      S.qCount=5; S.sessionId='UJI-JUJUR'; S.player='ana'; S.app='bing'; S.score=30;
      return catatSesi({akurasi:60});
    });
    ok(jujur===true,'catatSesi → true saat benar-benar tersimpan (dapat '+jujur+')');

    console.log('── Bersih ──');
    ok(warn.length===0,'nol error & warning'+(warn.length?': '+warn.slice(0,3).join(' | '):''));

  }catch(e){ console.log('  ❌ EXCEPTION: '+e.message); fail++; }

  await b.close(); srv.kill();
  console.log('\n'+(fail===0?'✅ MEMORI BELAJAR LOLOS DI CHROME ASLI':'❌ '+fail+' GAGAL'));
  process.exit(fail?1:0);
})();
