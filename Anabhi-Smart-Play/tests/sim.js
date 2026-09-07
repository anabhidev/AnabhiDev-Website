const __app=require('./loadapp');
const fs=require('fs'),vm=require('vm');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
const html=fs.readFileSync(W+'index.html','utf8');
const js=__app.appJS();

// DOM tiruan seadanya — cukup supaya berkas bisa dieksekusi
const el=()=>({classList:{toggle(){},add(){},remove(){},contains(){return false}},style:{},dataset:{},
  addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
  set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false});
const ctx={console,Math,Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,
  document:{getElementById:el,querySelectorAll:()=>[],addEventListener(){},body:el(),createElement:el,
            documentElement:el()},
  window:{addEventListener(){},matchMedia:()=>({matches:false}),navigator:{},location:{href:'x',reload(){}},onbeforeunload:null},
  navigator:{onLine:true,serviceWorker:undefined,userAgent:'node',standalone:false},
  localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v}},
  history:{pushState(){}},location:{href:'x'},setTimeout:()=>0,fetch:()=>Promise.resolve(),
  twemoji:{parse(){}},matchMedia:()=>({matches:false})};
ctx.window.matchMedia=ctx.matchMedia; ctx.globalThis=ctx;
vm.createContext(ctx);
vm.runInContext(js,ctx);

let fail=0;
const ok=(c,m)=>{ if(!c){console.log('  ❌ '+m);fail++;} };
const okk=(m)=>console.log('  ✅ '+m);

// ── B1: soal urutan angka ──
console.log('── B1  Urutan angka: kotak kosong SELALU terlihat ──');
{
  let n=0,bad=0,badAns=0;
  for(let r=0;r<400;r++){
    for(const q of ctx.genSeqBank()){
      n++;
      if(!(q.blankIdx>=1 && q.blankIdx<q.seq.length)) bad++;          // blank di luar tampilan
      if(String(q.seq[q.blankIdx])!==q.o[q.a]) badAns++;              // kunci jawaban salah
    }
  }
  ok(bad===0,`blank di luar deret yang ditampilkan: ${bad}/${n}`);
  ok(badAns===0,`kunci jawaban tidak cocok: ${badAns}/${n}`);
  if(!bad&&!badAns) okk(`${n.toLocaleString()} soal urutan — semua punya kotak kosong terlihat & kunci benar`);
}

// ── B2: bentuk & warna ──
console.log('── B2  Bentuk/warna: TEPAT SATU jawaban benar ──');
{
  let n=0,ambigu=0,contoh=null;
  for(let r=0;r<500;r++){
    for(const q of ctx.genShapeBank()){
      n++;
      const cocok=q.items.filter(it=> q.qType==='shape'
        ? it.shape===q.target.shape
        : it.color===q.target.color).length;
      if(cocok!==1){ ambigu++; if(!contoh) contoh=`${q.q} -> ${cocok} opsi memenuhi`; }
      if(q.items[q.a]!==q.target) ambigu++;
    }
  }
  ok(ambigu===0,`soal berjawaban ganda: ${ambigu}/${n} ${contoh?'| contoh: '+contoh:''}`);
  if(!ambigu) okk(`${n.toLocaleString()} soal bentuk/warna — semuanya tepat satu jawaban benar`);
}

// ── Semua bank: integritas opsi ──
console.log('── Integritas seluruh bank soal ──');
{
  const builders={math:ctx.buildMathBank,fun:ctx.buildFunBank,bindo:ctx.buildBindoBank,
    bing:ctx.buildBingBank,sains:ctx.buildSainsBank,seni:ctx.buildSeniBank,
    logika:ctx.buildLogikaBank,mix:ctx.buildMixBank};
  const idxOf=q=>q.t==='cmp'?q.ans:q.t==='addvis'||q.t==='subvis'?q.idx:q.a;
  let tot=0,badLen=0,badIdx=0,dupOpt=0;
  for(const [name,b] of Object.entries(builders)){
    for(const qc of [10,15,20]){
      for(let r=0;r<120;r++){
        const bank=b(qc);
        if(bank.length!==qc) badLen++;
        for(const q of bank){
          tot++;
          if(q.t==='ketik'){ if(!q.sentence) badIdx++; continue; }
          const opts=q.o||q.items;
          if(!opts||!opts.length){ badIdx++; continue; }
          const a=idxOf(q);
          if(!(Number.isInteger(a)&&a>=0&&a<opts.length)) badIdx++;
          if(q.o){ if(new Set(q.o.map(String)).size!==q.o.length) dupOpt++; }
        }
      }
    }
  }
  ok(badLen===0,`bank dengan jumlah soal salah: ${badLen}`);
  ok(badIdx===0,`index jawaban tidak valid: ${badIdx}/${tot}`);
  ok(dupOpt===0,`soal dengan opsi duplikat: ${dupOpt}/${tot}`);
  if(!badLen&&!badIdx&&!dupOpt) okk(`${tot.toLocaleString()} soal dari 8 kategori × 3 jumlah — semua valid`);
}

// ── B3: skor maksimum ──
console.log('── B3  Skor maksimum konsisten ──');
{
  const exp={10:100,15:105,20:100};
  let bad=0;
  for(const qc of [10,15,20]){
    if(ctx.maxScore(qc)!==exp[qc]){bad++;console.log(`     qc=${qc}: maxScore=${ctx.maxScore(qc)} seharusnya ${exp[qc]}`);}
    if(ctx.poinPerSoal(qc)*qc!==exp[qc])bad++;
  }
  ok(bad===0,'maxScore salah');
  if(!bad) okk('10 soal→100, 15 soal→105, 20 soal→100 (dulu Telegram melaporkan 50 / 75 / 100)');
}

// (cek "fungsi hilang" dipindah ke sim2.js — di sana modul dibaca dengan benar)

console.log('\n'+(fail===0?'✅ SEMUA SIMULASI LOLOS':'❌ '+fail+' SIMULASI GAGAL'));
process.exit(fail?1:0);
