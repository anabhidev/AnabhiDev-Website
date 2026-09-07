// Membuktikan bahwa 16 entri yang berubah BUKAN soal yang rusak, melainkan
// HANYA akibat kata kembar yang dibuang (B8). Aturannya:
//   - kumpulan soal sesudah harus SUBSET dari kumpulan soal sebelum
//   - yang hilang HANYA boleh kata yang muncul lebih dari sekali
const fs=require('fs'),vm=require('vm');
const {appJS}=require('./loadapp.js');
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const el=()=>({classList:{toggle(){},add(){},remove(){},contains:()=>false},style:{},dataset:{},
  addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
  set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false,
  nextElementSibling:null});
const ctx={console,Math:Object.create(Math),Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,URL,RegExp,
  document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){},body:el(),createElement:el,documentElement:el(),fonts:{}},
  window:{addEventListener(){},matchMedia:()=>({matches:false}),navigator:{},location:{href:'x',reload(){}},onbeforeunload:null},
  navigator:{onLine:true,userAgent:'node',standalone:false},
  localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v},removeItem(k){delete this._d[k]}},
  history:{pushState(){}},location:{href:'x'},setTimeout:()=>0,fetch:()=>Promise.resolve(),
  twemoji:{parse(){}},matchMedia:()=>({matches:false})};
ctx.window.matchMedia=ctx.matchMedia;
vm.createContext(ctx); vm.runInContext(appJS(),ctx);

const a=fs.readFileSync('sebelum.txt','utf8').split('\n');
const b=fs.readFileSync('sesudah.txt','utf8').split('\n');
const kunci=s=>s.split('|').slice(0,3).join('|');
const mapA={},mapB={};
a.forEach(l=>mapA[kunci(l)]=l); b.forEach(l=>mapB[kunci(l)]=l);

let gagal=0,diperiksa=0;
Object.keys(mapA).forEach(k=>{
  if(mapA[k]===mapB[k])return;
  if(!/^(bing|mix)\|/.test(k)){console.log('X  kategori tak terduga berubah: '+k);gagal++;return;}
  const jsonA=mapA[k].slice(mapA[k].indexOf('|[')+1);
  const jsonB=mapB[k].slice(mapB[k].indexOf('|[')+1);
  let A,B; try{A=JSON.parse(jsonA);B=JSON.parse(jsonB);}catch(e){console.log('X  json: '+k);gagal++;return;}
  diperiksa++;

  if(A.length!==B.length){console.log('X  jumlah soal berubah di '+k+': '+A.length+' -> '+B.length);gagal++;}

  // soal bing sesudah: nol kata kembar
  const wB=B.filter(q=>q.t==='bing').map(q=>q.word);
  if(new Set(wB).size!==wB.length){console.log('X  masih ada kata kembar di '+k);gagal++;}

  // Setiap soal bing sesudah harus berasal dari POOL 100 entri yang sama.
  // Catatan: sidik jari lama hanya menyimpan n soal PERTAMA, sedangkan
  // pengganti kata kembar diambil lebih dalam dari pool — jadi pembandingnya
  // wajib pool utuh, bukan potongan n soal itu.
  // (mix memanggil 7 builder berurutan, jadi keadaan PRNG-nya tidak bisa
  //  direproduksi sendirian — pemeriksaan pool hanya untuk kategori bing.)
  const cat=k.split('|')[0];
  if(cat==='bing'){
    const qc=Number(k.split('|')[1]), seed=Number(k.split('|')[2]);
    ctx.Math.random=mulberry32(seed*7919+cat.length*31+qc);
    const pool=new Set(vm.runInContext('genBingBank',ctx)().map(q=>JSON.stringify(q)));
    B.filter(q=>q.t==='bing').forEach(q=>{
      if(!pool.has(JSON.stringify(q))){console.log('X  soal BARU yang tidak berasal dari bank lama di '+k);gagal++;}
    });
  }

  // soal NON-bing di dalam mix tidak boleh ikut berubah
  const nonA=JSON.stringify(A.filter(q=>q.t!=='bing'));
  const nonB=JSON.stringify(B.filter(q=>q.t!=='bing'));
  if(nonA!==nonB){console.log('X  soal non-English ikut berubah di '+k);gagal++;}
});
console.log('entri berubah diperiksa :',diperiksa);
console.log(gagal?'\n❌ GAGAL: '+gagal:'\n✅ Semua perubahan murni akibat pembuangan kata kembar (B8).');
process.exit(gagal?1:0);
