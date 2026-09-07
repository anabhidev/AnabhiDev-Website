// Tes lapisan kosakata (Master 2 §5) + B8 tidak ada kata kembar dalam satu sesi.
const vm=require('vm');
const {appJS}=require('./loadapp.js');

function run(js){
  const el=()=>({classList:{toggle(){},add(){},remove(){},contains:()=>false},style:{},dataset:{},
    addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
    set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false,
    nextElementSibling:null});
  const ctx={console,Math,Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,URL,RegExp,
    document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){},body:el(),createElement:el,documentElement:el(),fonts:{}},
    window:{addEventListener(){},matchMedia:()=>({matches:false}),navigator:{},location:{href:'x',reload(){}},onbeforeunload:null},
    navigator:{onLine:true,userAgent:'node',standalone:false},
    localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v},removeItem(k){delete this._d[k]}},
    history:{pushState(){}},location:{href:'x'},setTimeout:()=>0,fetch:()=>Promise.resolve(),
    twemoji:{parse(){}},matchMedia:()=>({matches:false})};
  ctx.window.matchMedia=ctx.matchMedia;
  vm.createContext(ctx); vm.runInContext(js,ctx);
  return ctx;
}

const ctx=run(appJS());
const g=e=>vm.runInContext(e,ctx);
let gagal=0;
const ok =(m)=>console.log('  OK    '+m);
const bad=(m)=>{console.log('  X     '+m);gagal++;};

console.log('── 1. VOCAB diturunkan dari EN_ITEMS ──');
const EN=g('EN_ITEMS'), VOCAB=g('VOCAB');
const jmlEN=Object.keys(EN).reduce((a,k)=>a+EN[k].length,0);
VOCAB.length===jmlEN ? ok('VOCAB '+VOCAB.length+' kata = total EN_ITEMS '+jmlEN)
                     : bad('VOCAB '+VOCAB.length+' ≠ EN_ITEMS '+jmlEN);

console.log('── 2. wordId unik & stabil ──');
const ids=VOCAB.map(v=>v.wordId);
new Set(ids).size===ids.length ? ok('semua '+ids.length+' wordId unik')
                               : bad('ada wordId kembar');
g('vocabId')('animals','Ice cream')==='animals:ice-cream'
  ? ok('wordId dinormalkan: "Ice cream" -> animals:ice-cream')
  : bad('normalisasi wordId salah');

console.log('── 3. Tiap kata punya emoji, topik, kalimat contoh ──');
let kurang=0,tanpaArti=[];
VOCAB.forEach(v=>{
  if(!v.emoji||!v.topic||!v.topicLabel||!v.contoh)kurang++;
  if(!v.arti)tanpaArti.push(v.word);
});
kurang===0 ? ok('60 kata lengkap emoji/topik/label/contoh') : bad(kurang+' kata tidak lengkap');
tanpaArti.length===0 ? ok('semua kata punya terjemahan Indonesia')
                     : bad('tanpa terjemahan: '+tanpaArti.join(', '));

console.log('── 4. Artikel a/an benar ──');
const cek={Apple:'an',Egg:'an',Eraser:'an',Cat:'a',Dog:'a',Book:'a'};
Object.keys(cek).forEach(w=>{
  const v=VOCAB.find(x=>x.word===w);
  const harus='This is '+cek[w]+' '+w.toLowerCase()+'.';
  if(v.topic==='colors'||v.topic==='body')return;
  v.contoh===harus ? ok(w+' → "'+v.contoh+'"') : bad(w+' → "'+v.contoh+'" seharusnya "'+harus+'"');
});
const merah=VOCAB.find(x=>x.word==='Red');
merah.contoh==='This is red.' ? ok('warna tanpa artikel: "'+merah.contoh+'"') : bad('warna: '+merah.contoh);
const mata=VOCAB.find(x=>x.word==='Eye');
mata.contoh==='This is my eye.' ? ok('tubuh pakai my: "'+mata.contoh+'"') : bad('tubuh: '+mata.contoh);

console.log('── 5. B8 — nol kata kembar dalam satu sesi ──');
const build=g('buildBingBank');
let sesiCacat=0,jumlahSalah=0;
for(let i=0;i<3000;i++){
  const n=[10,15,20][i%3];
  const bank=build(n);
  if(bank.length!==n)jumlahSalah++;
  const kata=bank.map(q=>q.word);
  if(new Set(kata).size!==kata.length)sesiCacat++;
}
sesiCacat===0 ? ok('3.000 sesi — nol kata kembar') : bad(sesiCacat+' sesi masih punya kata kembar');
jumlahSalah===0 ? ok('3.000 sesi — jumlah soal selalu tepat') : bad(jumlahSalah+' sesi jumlah soalnya salah');

console.log('── 6. Soal bing tetap valid & terhubung ke VOCAB ──');
const byId=g('VOCAB_BY_ID'), qid=g('vocabIdOfQuestion');
let putus=0,kunciSalah=0;
for(let i=0;i<2000;i++){
  build(20).forEach(q=>{
    if(q.o[q.a]!==q.word)kunciSalah++;
    if(q.o.length!==4)kunciSalah++;
    const id=qid(q);
    if(!id||!byId[id])putus++;
  });
}
kunciSalah===0 ? ok('40.000 soal — kunci jawaban & 4 opsi benar') : bad(kunciSalah+' soal cacat');
putus===0 ? ok('40.000 soal — semua tersambung ke entri VOCAB') : bad(putus+' soal tidak ketemu di VOCAB');

console.log(gagal?'\n❌ GAGAL: '+gagal:'\n✅ SEMUA LOLOS');
process.exit(gagal?1:0);
