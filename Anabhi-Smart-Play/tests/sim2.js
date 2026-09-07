const __app=require('./loadapp');
const fs=require('fs'),vm=require('vm');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
const html=fs.readFileSync(W+'index.html','utf8');
const js=__app.appJS();
const el=()=>({classList:{toggle(){},add(){},remove(){},contains(){return false}},style:{},dataset:{},
  addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
  set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false});
const ctx={console,Math,Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,
  document:{getElementById:el,querySelectorAll:()=>[],addEventListener(){},body:el(),createElement:el,documentElement:el()},
  window:{addEventListener(){},matchMedia:()=>({matches:false}),navigator:{},location:{href:'x',reload(){}},onbeforeunload:null},
  navigator:{onLine:true,userAgent:'node',standalone:false},
  localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v}},
  history:{pushState(){}},location:{href:'x'},setTimeout:()=>0,fetch:()=>Promise.resolve(),
  twemoji:{parse(){}},matchMedia:()=>({matches:false})};
ctx.window.matchMedia=ctx.matchMedia;
vm.createContext(ctx); vm.runInContext(js,ctx);
const get=expr=>vm.runInContext(expr,ctx);   // const top-level hidup di lexical scope context

let fail=0; const ok=(c,m)=>{ if(!c){console.log('  ❌ '+m);fail++;} }; const okk=m=>console.log('  ✅ '+m);

console.log('── B5 / B6  Perbaikan konten ──');
{
  const lb=get('LETTER_BANK');
  const anjing=lb.find(x=>x.word==='Anjing');
  ok(anjing&&anjing.emoji==='🐶',`"Anjing" memakai emoji ${anjing&&anjing.emoji}`);
  const salah=lb.filter(x=>x.word[0].toUpperCase()!==x.letter);
  ok(salah.length===0,'huruf tidak cocok dengan kata: '+JSON.stringify(salah));
  const pola=get('LOGIKA_POLA').find(p=>p.seq.join('')==='🟥🟧🟨🟩🟦');
  ok(pola&&pola.ans==='🟪',`pola kotak pelangi dijawab ${pola&&pola.ans}`);
  const dupEmoji=lb.filter(x=>x.emoji==='🐘');
  ok(dupEmoji.length===1,'🐘 masih dipakai '+dupEmoji.length+'x');
  if(!fail) okk(`🐶 Anjing benar · ${lb.length} entri huruf semuanya konsisten · pola kotak dijawab 🟪`);
}

console.log('── Konsistensi kunci jawaban seluruh bank konten statis ──');
{
  let bad=0;
  for(const [nama,arr] of [['SENI_WARNA',get('SENI_WARNA')],['SENI_MUSIK',get('SENI_MUSIK')],
      ['SENI_JENIS',get('SENI_JENIS')],['SAINS_INDERA',get('SAINS_INDERA')],
      ['LOGIKA_BANYAK',get('LOGIKA_BANYAK')]]){
    arr.forEach((x,i)=>{ if(!x.opts.includes(x.ans)){bad++;console.log(`     ${nama}[${i}]: jawaban "${x.ans}" tidak ada di opsi`);} });
  }
  get('LOGIKA_KLASIF').forEach((x,i)=>{ if(!x.o.includes(x.ans)){bad++;console.log(`     LOGIKA_KLASIF[${i}]: "${x.ans}" tidak ada di opsi`);} });
  get('LOGIKA_POLA').forEach((x,i)=>{ if(x.wrong.includes(x.ans)){bad++;console.log(`     LOGIKA_POLA[${i}]: jawaban ikut jadi pengecoh`);} });
  ok(bad===0,`${bad} kunci jawaban tidak konsisten`);
  if(!bad) okk('semua kunci jawaban bank statis ada di dalam daftar opsinya');
}

console.log('── Standar 8.7: tidak ada fungsi/data yang hilang ──');
{
  const lama=fs.readFileSync(W+'arsip/Anabhi_MathFun_v4_0_baseline.html','utf8');
  const fn=s=>new Set([...s.matchAll(/function\s+([A-Za-z_$][\w$]*)\s*\(/g)].map(m=>m[1]));
  const a=fn(lama), b=fn(__app.appJS());
  const hilang=[...a].filter(x=>!b.has(x)), baru=[...b].filter(x=>!a.has(x));
  ok(hilang.length===0,'fungsi HILANG: '+hilang.join(', '));
  if(!hilang.length){
    okk(`${a.size} fungsi lama utuh semua`);
    console.log('     fungsi baru ('+baru.length+'): '+baru.join(', '));
  }
  // elemen id yang dirujuk JS harus ada di markup
  const ids=new Set([...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
  const dipakai=new Set([...html.matchAll(/getElementById\(\s*'([^']+)'\s*\)/g)].map(m=>m[1]));
  const tiada=[...dipakai].filter(i=>!ids.has(i));
  ok(tiada.length===0,'getElementById ke id yang tidak ada: '+tiada.join(', '));
  if(!tiada.length) okk(`${dipakai.size} id yang dirujuk JS semuanya ada di markup`);
  // id duplikat
  const arr=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
  const dup=arr.filter((v,i)=>arr.indexOf(v)!==i);
  ok(dup.length===0,'id duplikat: '+dup.join(', '));
  if(!dup.length) okk('nol id duplikat');
}

console.log('\n'+(fail===0?'✅ SEMUA LOLOS':'❌ '+fail+' GAGAL'));
process.exit(fail?1:0);
