const __app=require('./loadapp');
const {JSDOM}=require('jsdom');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
let fail=0; const ok=(c,m)=>{ if(!c){console.log('  ❌ '+m);fail++;} }; const okk=m=>console.log('  ✅ '+m);

(async()=>{
  const dom=await JSDOM.fromFile(W+'index.html',{url:'http://127.0.0.1:8787/Anabhi-Smart-Play/',
    runScripts:'dangerously',resources:'usable',pretendToBeVisual:true});
  await new Promise(r=>dom.window.addEventListener('load',r));
  const w=dom.window,d=w.document;
  const NET={online:false,sent:[]};
  w.fetch=(u,o)=>{ if(!NET.online) return Promise.reject(new TypeError('Failed to fetch'));
                   NET.sent.push(JSON.parse(o.body)); return Promise.resolve({ok:true}); };
  w.localStorage.removeItem('asp_outbox_v1');

  console.log('── Skenario: tablet OFFLINE, anak main 2 sesi ──');
  for(const [cat,qc] of [['math',10],['logika',15]]){
    w.playAgain(); w.selectPlayer('ana'); w.selectApp(cat); w.selectQ(qc); w.startGame();
    for(let i=0;i<qc;i++){
      const q=w.eval('S').qBank[i];
      if(q.t==='ketik'){const inp=d.getElementById('typeInput');inp.value=q.sentence;
        w.handleTypedAns(q,inp,d.getElementById('checkBtn'));}
      else{const idx=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a; w.handleAns(q,idx,idx);}
      if(i<qc-1) w.showQ(i+1); else w.finishGame();
    }
    await new Promise(r=>setTimeout(r,30));
    ok(d.getElementById('s-finish').classList.contains('active'),`${cat}: sesi selesai walau offline`);
    ok(w.eval('S').score===w.eval('maxScore')(qc),`${cat}: skor tetap benar offline`);
  }
  const tgTxt=d.getElementById('tgStatus').textContent;
  ok(/Belum terkirim/.test(tgTxt),`status jujur saat offline, bukan "terkirim" palsu — tertulis: "${tgTxt}"`);
  ok(w.eval('outboxRead()').length===2,`2 laporan masuk antrean (${w.eval('outboxRead()').length})`);
  ok(NET.sent.length===0,'nol laporan terkirim saat offline');
  okk('gameplay penuh jalan offline, laporan diantre, status ditulis jujur');

  console.log('── Internet kembali ──');
  NET.online=true;
  w.dispatchEvent(new w.Event('online'));
  await new Promise(r=>setTimeout(r,80));
  ok(NET.sent.length===2,`${NET.sent.length}/2 laporan tertunda terkirim otomatis`);
  ok(w.eval('outboxRead()').length===0,`antrean kosong setelah sync (${w.eval('outboxRead()').length})`);
  const s=NET.sent.map(p=>`${p.game} ${p.score}/${p.totalSoal}`).join(' · ');
  okk('sync otomatis: '+s);

  console.log('── Perilaku update tidak mengganggu anak (PRD §40) ──');
  w.playAgain(); w.selectPlayer('abhi'); w.selectApp('fun'); w.selectQ(10); w.startGame();
  ok(w.eval('S').active===true,'sesi sedang berjalan');
  ok(d.getElementById('updateBar').hidden===true,'banner update belum muncul');
  // simulasikan SW versi baru mengambil alih di tengah sesi
  w.eval('pendingUpdate=true');
  ok(d.getElementById('updateBar').hidden===true,'saat anak main: TIDAK ada reload paksa & banner tetap tersembunyi');
  for(let i=0;i<10;i++){ const q=w.eval('S').qBank[i];
    const idx=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a;
    if(q.t==='ketik'){const inp=d.getElementById('typeInput');inp.value=q.sentence;w.handleTypedAns(q,inp,d.getElementById('checkBtn'));}
    else w.handleAns(q,idx,idx);
    if(i<9) w.showQ(i+1); else w.finishGame(); }
  ok(d.getElementById('updateBar').hidden===false,'setelah sesi selesai: banner "Versi baru siap" baru ditawarkan');
  okk('update ditahan sampai sesi selesai — anak tidak pernah ke-reload di tengah soal');

  console.log('\n'+(fail===0?'✅ SEMUA TES OFFLINE & UPDATE LOLOS':'❌ '+fail+' GAGAL'));
  process.exit(fail?1:0);
})().catch(e=>{console.error('CRASH:',e);process.exit(1);});
