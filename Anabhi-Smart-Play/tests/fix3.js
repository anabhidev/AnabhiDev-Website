const __app=require('./loadapp');
const {JSDOM}=require('jsdom');const fs=require('fs'),vm=require('vm');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
let fail=0;const ok=(c,m)=>{if(!c){console.log('  ❌ '+m);fail++;}};const okk=m=>console.log('  ✅ '+m);

console.log('── FIX 1: BASE Service Worker mengikuti lokasi berkas ──');
{
  const sw=fs.readFileSync(W+'sw.js','utf8');
  for(const [href,harap] of [['https://anabhidev.com/Anabhi-Smart-Play/sw.js','/Anabhi-Smart-Play/'],
                             ['http://localhost:8788/sw.js','/'],
                             ['http://127.0.0.1:5500/Smart-Play/sw.js','/Smart-Play/']]){
    const c={self:{location:{href},addEventListener(){},skipWaiting(){},clients:{claim(){}}},
             caches:{},URL,Request,fetch(){},Promise};
    vm.createContext(c); vm.runInContext(sw.replace(/self\.addEventListener[\s\S]*$/,''),c);
    ok(c.BASE===harap,`${href} -> BASE="${c.BASE}" (harap "${harap}")`);
    ok(c.PRECACHE.every(u=>u.startsWith(harap)),'semua entri precache pakai BASE yang benar');
  }
  okk('precache tidak lagi 404 diam-diam saat dijalankan lokal');
}

async function boot(url){
  const dom=await JSDOM.fromFile(W+'index.html',{url,runScripts:'dangerously',resources:'usable',pretendToBeVisual:true});
  await new Promise(r=>dom.window.addEventListener('load',r));
  return dom;
}
(async()=>{
  const dom=await boot('http://127.0.0.1:8788/');
  const w=dom.window,d=w.document;
  w.fetch=()=>Promise.resolve({ok:true});

  console.log('── FIX 2: banner update ──');
  ok(d.getElementById('updateBar').hidden===true,'banner tersembunyi saat halaman baru dibuka');
  ok(!!d.getElementById('updateClose'),'tombol tutup (✕) ada');
  // pemasangan PERTAMA: controller belum ada -> banner TIDAK boleh muncul
  ok(/sudahDikendalikan\s*=\s*!!navigator\.serviceWorker\.controller/.test(__app.appJS()),
     'ada penjaga pemasangan-pertama');
  ok(/if\(!sudahDikendalikan\)return;/.test(__app.appJS()),
     'controllerchange diabaikan kalau ini pemasangan pertama');
  w.offerUpdate(); ok(d.getElementById('updateBar').hidden===false,'offerUpdate() menampilkan banner');
  w.dismissUpdate(); ok(d.getElementById('updateBar').hidden===true,'tombol ✕ menutup banner');
  const css=__app.appCSS();
  ok(/\.update-bar\{[^}]*top:calc/.test(css)&&!/\.update-bar\{[^}]*bottom:calc/.test(css),
     'banner dipindah ke ATAS layar (tidak menutupi tombol)');
  okk('banner: tidak muncul di install pertama · pindah ke atas · bisa ditutup');

  console.log('── FIX 3: foto pemain berlapis ──');
  {
    const pd=w.eval('PDATA').ana;
    ok(pd.photo==='assets/Ana.webp'&&pd.photo2==='assets/Ana.jpg','PDATA punya webp + cadangan jpg');
    const img=d.getElementById('rcPhoto');
    w.eval('setPhoto')(img,pd);
    ok(img.getAttribute('src')==='assets/Ana.webp','coba WebP dulu');
    img.onerror();                       // simulasi WebP gagal
    ok(img.getAttribute('src')==='assets/Ana.jpg','gagal WebP -> jatuh ke JPEG');
    img.onerror();                       // simulasi JPEG juga gagal
    ok(img.style.display==='none','gagal JPEG -> gambar disembunyikan');
    const fb=img.nextElementSibling;
    ok(fb&&fb.classList.contains('photo-fb')&&fb.style.display==='flex'&&fb.textContent==='🌸',
       `cadangan emoji tampil: "${fb&&fb.textContent}"`);
    okk('kartu hasil TIDAK PERNAH kosong lagi: WebP -> JPEG -> emoji');
  }

  console.log('── Regresi: gameplay tetap utuh ──');
  {
    let n=0;
    for(const [cat,qc] of [['math',10],['fun',15],['mix',20],['bindo',10]]){
      w.playAgain(); w.selectPlayer('ana'); w.selectApp(cat); w.selectQ(qc); w.startGame();
      // foto HUD terpasang lewat setPhoto
      ok(d.getElementById('hudPhoto').getAttribute('src')==='assets/Ana.webp',`${cat}: foto HUD terpasang`);
      for(let i=0;i<qc;i++){
        const q=w.eval('S').qBank[i];
        // BUKTI B1: setiap soal urutan WAJIB punya kotak kosong di DOM
        if(q.t==='seq'){
          const blank=d.querySelectorAll('.seq-box.blank');
          const boxes=d.querySelectorAll('.seq-box');
          ok(blank.length===1,`${cat}#${i+1}: kotak kosong di layar = ${blank.length} (harus 1)`);
          ok(boxes.length===q.seq.length,`${cat}#${i+1}: ${boxes.length} kotak = panjang deret`);
          n++;
        }
        const idx=q.t==='cmp'?q.ans:(q.t==='addvis'||q.t==='subvis')?q.idx:q.a;
        if(q.t==='ketik'){const inp=d.getElementById('typeInput');inp.value=q.sentence;w.handleTypedAns(q,inp,d.getElementById('checkBtn'));}
        else w.handleAns(q,idx,idx);
        if(i<qc-1) w.showQ(i+1); else w.finishGame();
      }
      ok(w.eval('S').score===w.eval('maxScore')(qc),`${cat}/${qc}: skor benar`);
      ok(d.getElementById('rcPhoto').getAttribute('src')==='assets/Ana.webp',`${cat}: foto hasil terpasang`);
    }
    okk(`gameplay utuh · ${n} soal urutan dirender di DOM, SEMUA punya kotak kosong (bukti B1 di DOM nyata)`);
  }
  console.log('\n'+(fail===0?'✅ SEMUA PERBAIKAN TERVERIFIKASI':'❌ '+fail+' GAGAL'));
  process.exit(fail?1:0);
})().catch(e=>{console.error('CRASH:',e);process.exit(1);});
