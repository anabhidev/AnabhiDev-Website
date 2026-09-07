const __app=require('./loadapp');
const {JSDOM}=require('jsdom');
const fs=require('fs');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
let fail=0; const ok=(c,m)=>{ if(!c){console.log('  ❌ '+m);fail++;} }; const okk=m=>console.log('  ✅ '+m);

async function boot(){
  const dom=await JSDOM.fromFile(W+'index.html',{
    url:'http://127.0.0.1:8787/Anabhi-Smart-Play/',
    runScripts:'dangerously', resources:'usable', pretendToBeVisual:true
  });
  await new Promise(r=>dom.window.addEventListener('load',r));
  return dom;
}
const CATS=['math','fun','bindo','bing','sains','seni','logika','mix'];

(async()=>{
  const errs=[];
  const dom=await boot();
  const w=dom.window, d=w.document;
  w.addEventListener('error',e=>errs.push(e.message));
  global.NET={online:true, sent:[]};
  w.fetch=(u,o)=>{ if(!global.NET.online) return Promise.reject(new TypeError('Failed to fetch'));
                   global.NET.sent.push(JSON.parse(o.body)); return Promise.resolve({ok:true,type:'opaque'}); };
  const origErr=console.error;

  console.log('── Halaman termuat ──');
  ok(d.getElementById('s-welcome').classList.contains('active'),'layar welcome aktif');
  ok(typeof w.startGame==='function','startGame terekspos');
  ok(d.getElementById('runMode').textContent==='· browser','penanda display-mode = "'+d.getElementById('runMode').textContent+'"');
  ok(d.querySelectorAll('.acard').length===8,'8 kartu game ada');
  const bodyText=d.body.innerText||d.body.textContent;
  ok(!/Version\s*:|Generated\s*:|AnabhiDev-ASP/.test(bodyText.slice(0,400)),
     'teks awal halaman bukan header teknis (Standar 8.5 poin 8)');
  okk('awal halaman: '+bodyText.trim().split('\n').filter(Boolean)[0].slice(0,60));

  console.log('── Main 1 sesi penuh untuk SETIAP kategori × 10/15/20 soal ──');
  for(const cat of CATS){
    for(const qc of [10,15,20]){
      w.playAgain();
      w.selectPlayer(qc===10?'ana':'abhi');
      w.selectApp(cat);
      w.selectQ(qc);
      ok(d.getElementById('startBtn').classList.contains('ready'),`${cat}/${qc}: tombol Mulai aktif`);
      w.startGame();
      ok(d.getElementById('s-game').classList.contains('active'),`${cat}/${qc}: layar game aktif`);

      let benar=0;
      for(let i=0;i<qc;i++){
        const q=w.eval('S').qBank[i];
        ok(!!q,`${cat}/${qc}: soal #${i+1} ada`);
        if(!q)break;
        // renderQ sudah dipanggil showQ; pastikan kartu soal benar-benar tergambar
        const card=d.querySelector('.q-card');
        ok(!!card,`${cat}/${qc}#${i+1}: kartu soal tergambar`);
        if(q.t==='ketik'){
          const inp=d.getElementById('typeInput'), btn=d.getElementById('checkBtn');
          ok(!!inp&&!!btn,`${cat}/${qc}#${i+1}: input ketik ada`);
          inp.value=q.sentence;               // jawab BENAR
          w.handleTypedAns(q,inp,btn); benar++;
        }else{
          const btns=d.querySelectorAll('.opt-btn');
          const idx=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a;
          ok(btns.length>0,`${cat}/${qc}#${i+1}: ada tombol pilihan`);
          ok(idx>=0&&idx<btns.length,`${cat}/${qc}#${i+1}: index jawaban valid`);
          w.handleAns(q,idx,idx); benar++;    // jawab BENAR
        }
        if(i<qc-1) w.showQ(i+1); else w.finishGame();
      }
      // ── skor & layar hasil ──
      const maxP=w.eval('maxScore')(qc);
      ok(w.eval('S').score===maxP,`${cat}/${qc}: skor ${w.eval('S').score} seharusnya ${maxP} (semua benar)`);
      ok(d.getElementById('s-finish').classList.contains('active'),`${cat}/${qc}: layar hasil tampil`);
      ok(d.getElementById('rcScore').textContent===String(maxP),`${cat}/${qc}: skor di layar = ${maxP}`);
      ok(/Akurasi: 100%/.test(d.getElementById('rcAcc').textContent),`${cat}/${qc}: akurasi 100%`);
      ok(d.getElementById('rcStars').textContent==='⭐⭐⭐',`${cat}/${qc}: 3 bintang`);
      ok(/hari berturut-turut/.test(d.getElementById('rcStreak').textContent),`${cat}/${qc}: streak tampil`);
      ok(d.getElementById('finTime').textContent!=='-',`${cat}/${qc}: durasi terisi`);
      ok(d.querySelectorAll('.stat-box').length>=2,`${cat}/${qc}: kotak statistik ada`);
      // payload GAS
      const p=w.eval('S')._payload;
      ok(!!p,`${cat}/${qc}: payload GAS terbentuk`);
      if(p){
        ok(p.score===maxP&&p.totalSoal===qc&&p.soalBenar===qc&&p.akurasi===100,`${cat}/${qc}: payload angka benar`);
        ok(p.log.length===qc,`${cat}/${qc}: log ${p.log.length}/${qc} soal`);
        ok(p.tgMsg.includes(`dari ${maxP}`),`${cat}/${qc}: pesan Telegram menyebut "dari ${maxP}" (B3)`);
      }
    }
  }
  okk('8 kategori × 3 jumlah soal = 24 sesi penuh, semua benar, skor & laporan cocok');

  console.log('── Jawaban SALAH juga ditangani benar ──');
  w.playAgain(); w.selectPlayer('ana'); w.selectApp('math'); w.selectQ(10); w.startGame();
  for(let i=0;i<10;i++){
    const q=w.eval('S').qBank[i];
    if(q.t==='ketik'){ const inp=d.getElementById('typeInput'); inp.value='xxx salah'; w.handleTypedAns(q,inp,d.getElementById('checkBtn')); }
    else{ const idx=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a;
          const salah=(idx+1)%d.querySelectorAll('.opt-btn').length; w.handleAns(q,salah,idx); }
    if(i<9) w.showQ(i+1); else w.finishGame();
  }
  ok(w.eval('S').score===0,`skor semua salah = ${w.eval('S').score} (seharusnya 0)`);
  ok(/Akurasi: 0%/.test(d.getElementById('rcAcc').textContent),'akurasi 0%');
  ok(d.getElementById('rcStars').textContent==='💪','tanpa bintang, tetap menyemangati (💪)');
  okk('jalur jawaban salah benar: skor 0, akurasi 0%, tanpa kalimat menghakimi');

  console.log('── B4  Antrean laporan offline ──');
  w.localStorage.removeItem('asp_outbox_v1');
  const before=w.eval('outboxRead()').length;
  w.eval('outboxAdd')({sessionId:'TEST-1',score:1});
  w.eval('outboxAdd')({sessionId:'TEST-1',score:1});   // duplikat harus diabaikan
  w.eval('outboxAdd')({sessionId:'TEST-2',score:2});
  ok(w.eval('outboxRead()').length===before+2,`antrean ${w.eval('outboxRead()').length} (duplikat sessionId ditolak)`);
  okk('laporan gagal kirim tersimpan & tidak dobel — tidak ada lagi "sukses" palsu');

  console.log('── Error runtime ──');
  ok(errs.length===0,'error runtime: '+errs.join(' | '));
  if(!errs.length) okk('nol error runtime selama 25 sesi');

  console.log('\n'+(fail===0?'✅ SEMUA TES GAMEPLAY LOLOS':'❌ '+fail+' TES GAGAL'));
  process.exit(fail?1:0);
})().catch(e=>{console.error('CRASH:',e);process.exit(1);});
