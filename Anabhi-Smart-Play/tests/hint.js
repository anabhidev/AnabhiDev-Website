// Tes mesin hint lokal (PRD §16) + payload orang tua.
// Yang paling penting diuji: hint WAJIB selalu jalan tanpa jaringan, dan
// level 5 TIDAK PERNAH bocor ke anak.
const vm=require('vm');
const {appJS}=require('./loadapp.js');

function run(){
  const el=()=>({classList:{toggle(){},add(){},remove(){},contains:()=>false},style:{},dataset:{},
    addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
    set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false,
    nextElementSibling:null});
  const ctx={console,Math,Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,URL,RegExp,
    document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){},body:el(),createElement:el,documentElement:el(),fonts:{}},
    window:{addEventListener(){},matchMedia:()=>({matches:false}),navigator:{},location:{href:'x',reload(){}},onbeforeunload:null},
    navigator:{onLine:true,userAgent:'node',standalone:false},
    localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v},removeItem(k){delete this._d[k]}},
    history:{pushState(){}},location:{href:'x'},setTimeout:(f)=>{f&&f();return 0;},
    fetch:()=>Promise.reject(new Error('offline')),
    twemoji:{parse(){}},matchMedia:()=>({matches:false})};
  ctx.window.matchMedia=ctx.matchMedia;
  vm.createContext(ctx); vm.runInContext(appJS(),ctx);
  return ctx;
}
const ctx=run();
const g=e=>vm.runInContext(e,ctx);
let gagal=0;
const ok =m=>console.log('  OK    '+m);
const bad=m=>{console.log('  X     '+m);gagal++;};

console.log('── 1. Setiap tipe soal punya hint di SEMUA level 1-5 ──');
const builders=g('({math:buildMathBank,fun:buildFunBank,bindo:buildBindoBank,bing:buildBingBank,sains:buildSainsBank,seni:buildSeniBank,logika:buildLogikaBank,mix:buildMixBank})');
const hintLokal=g('hintLokal');
const tipeTerlihat={};
let kosong=0,total=0;
Object.keys(builders).forEach(cat=>{
  for(let r=0;r<40;r++){
    builders[cat](20).forEach(q=>{
      tipeTerlihat[q.t]=(tipeTerlihat[q.t]||0)+1;
      for(let lv=1;lv<=5;lv++){
        total++;
        const t=hintLokal(q,lv);
        if(!t||typeof t!=='string'||!t.trim())kosong++;
      }
    });
  }
});
kosong===0 ? ok(total.toLocaleString('id')+' hint dibuat, nol yang kosong')
           : bad(kosong+' hint kosong dari '+total);
ok('tipe soal tercakup: '+Object.keys(tipeTerlihat).sort().join(', '));

console.log('── 2. Level 0 = tanpa hint, level di luar 1-5 = kosong ──');
const contoh=builders.math(10)[0];
hintLokal(contoh,0)===''  ? ok('level 0 kosong')      : bad('level 0 harus kosong');
hintLokal(contoh,6)===''  ? ok('level 6 ditolak')     : bad('level 6 harus kosong');
hintLokal(contoh,-1)==='' ? ok('level -1 ditolak')    : bad('level -1 harus kosong');
hintLokal(null,1)===''    ? ok('soal null aman')      : bad('soal null harus kosong');

console.log('── 3. 🔴 Level 5 TIDAK PERNAH sampai ke anak ──');
const anak=g('hintUntukAnak'), ortu=g('hintUntukOrangTua');
let bocor=0;
Object.keys(builders).forEach(cat=>{
  builders[cat](20).forEach(q=>{
    const lv5=hintLokal(q,5);
    for(const minta of [5,6,99,'5']){
      if(anak(q,minta)===lv5)bocor++;
    }
  });
});
bocor===0 ? ok('meminta level 5 lewat jalur anak selalu dibatasi ke level 4')
          : bad(bocor+' kali teks level 5 bocor ke anak');
ortu(contoh)===hintLokal(contoh,5) ? ok('jalur orang tua memang memberi level 5')
                                   : bad('jalur orang tua tidak memberi level 5');

console.log('── 4. Hint level 1-3 TIDAK menyebut jawaban ──');
// Level 4 memang boleh menyebut jawaban, level 1-3 tidak.
let sebut=0,dicek=0;
Object.keys(builders).forEach(cat=>{
  for(let r=0;r<25;r++){
    builders[cat](20).forEach(q=>{
      if(!q.o||typeof q.a!=='number')return;
      const jwb=String(q.o[q.a]);
      if(jwb.length<2)return;            // angka 1 digit terlalu sering muncul wajar
      dicek++;
      for(let lv=1;lv<=3;lv++){
        if(hintLokal(q,lv).indexOf(jwb)!==-1)sebut++;
      }
    });
  }
});
sebut===0 ? ok(dicek.toLocaleString('id')+' soal diperiksa — level 1-3 tidak membocorkan jawaban')
          : bad(sebut+' hint level 1-3 menyebut jawaban');

console.log('── 5. hintAI SELALU resolve, tidak pernah reject (offline) ──');
const hintAI=g('hintAI');
Promise.all([hintAI(contoh,1),hintAI(contoh,4)]).then(r=>{
  const semuaTeks=r.every(x=>typeof x==='string'&&x.trim());
  semuaTeks ? ok('fetch gagal -> tetap dapat hint lokal, bukan error')
            : bad('hintAI mengembalikan kosong saat offline');

  console.log('── 6. Payload orang tua ──');
  const S=g('S');
  S.qBank=builders.bing(10); S.results=S.qBank.map((_,i)=>i%2===0);
  S.qCount=10;
  const vocab=g('ringkasKosakata')(), catatan=g('catatanSalah')();
  vocab.length===10 ? ok('10 kata terekam dengan hasil benar/salah') : bad('kosakata: '+vocab.length);
  vocab.every(v=>v.wordId&&v.word&&typeof v.benar==='boolean')
    ? ok('tiap entri punya wordId, word, benar') : bad('entri kosakata tidak lengkap');
  catatan.length>0&&catatan.length<=5
    ? ok(catatan.length+' catatan orang tua (dibatasi maks 5)') : bad('catatan: '+catatan.length);

  // Soal non-Inggris tidak boleh menghasilkan entri kosakata
  S.qBank=builders.math(10); S.results=S.qBank.map(()=>false);
  g('ringkasKosakata')().length===0 ? ok('soal math tidak menghasilkan entri kosakata')
                                    : bad('soal math bocor ke daftar kosakata');

  console.log(gagal?'\n❌ GAGAL: '+gagal:'\n✅ SEMUA LOLOS');
  process.exit(gagal?1:0);
});
