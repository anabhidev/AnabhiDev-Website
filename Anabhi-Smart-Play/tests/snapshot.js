// Merekam perilaku aplikasi dengan Math.random YANG DIPATOK (seed tetap).
// Hasilnya jadi "sidik jari" — setelah modularisasi, sidik jari harus IDENTIK.
const fs=require('fs'),vm=require('vm'),crypto=require('crypto');

function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

function runFile(file){
  const html=fs.readFileSync(file,'utf8');
  const js=[...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).join('\n');
  return runJS(js);
}
function runJS(js){
  const el=()=>({classList:{toggle(){},add(){},remove(){},contains:()=>false},style:{},dataset:{},
    addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
    set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false,
    nextElementSibling:null});
  const ctx={console,Math:Object.create(Math),Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,URL,
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
function fingerprint(ctx){
  const get=e=>vm.runInContext(e,ctx);
  const out=[];
  const cats=['math','fun','bindo','bing','sains','seni','logika','mix'];
  for(const cat of cats){
    for(const qc of [10,15,20]){
      for(let seed=1;seed<=6;seed++){
        ctx.Math.random=mulberry32(seed*7919+cat.length*31+qc);
        const bank=get(`({math:buildMathBank,fun:buildFunBank,bindo:buildBindoBank,bing:buildBingBank,sains:buildSainsBank,seni:buildSeniBank,logika:buildLogikaBank,mix:buildMixBank})['${cat}']`)(qc);
        out.push(cat+'|'+qc+'|'+seed+'|'+JSON.stringify(bank));
      }
    }
  }
  // fungsi skor
  for(const qc of [10,15,20]) out.push('score|'+qc+'|'+get('poinPerSoal')(qc)+'|'+get('maxScore')(qc));
  // bank konten statis
  for(const n of ['PDATA','FRUITS','SHAPES_DATA','LETTER_BANK','ODD_GROUPS','BI_SUBJECTS','BI_ACTIONS',
                  'EN_ITEMS','SAINS_HABITAT','SAINS_INDERA','SAINS_HIDUP','SAINS_SEHAT',
                  'SENI_WARNA','SENI_MUSIK','SENI_JENIS','LOGIKA_POLA','LOGIKA_BANYAK','LOGIKA_KLASIF',
                  'APP_IDS','BING_CAT_LABEL','CONFIG']){
    try{ out.push(n+'='+JSON.stringify(get(n))); }catch(e){ out.push(n+'=<TIDAK ADA>'); }
  }
  // normalizeBI
  const nb=get('normalizeBI');
  for(const s of ['Saya makan nasi.','  SAYA   MAKAN  NASI  ','Adik minum susu']) out.push('nbi|'+s+'|'+nb(s));
  return out;
}
const ctx = process.argv[2].endsWith('.txt') ? runJS(fs.readFileSync(process.argv[2],'utf8')) : runFile(process.argv[2]);
const fp=fingerprint(ctx);
fs.writeFileSync(process.argv[3], fp.join('\n'));
console.log('entri sidik jari :', fp.length);
console.log('SHA-256          :', crypto.createHash('sha256').update(fp.join('\n')).digest('hex'));
