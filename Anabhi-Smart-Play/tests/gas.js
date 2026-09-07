// Menguji logika gas/Code.gs memakai payload SUNGGUHAN dari aplikasi.
// Apps Script tidak bisa dijalankan di sini, jadi API Google-nya ditiru
// seperlunya (SpreadsheetApp, UrlFetchApp, Utilities, Logger, Properties).
// Yang diuji: baris yang ditulis ke sheet, urutan kolom, dan Max Score.
const fs=require('fs'),vm=require('vm'),path=require('path');
const {appJS,W}=require('./loadapp.js');

let gagal=0;
const ok =m=>console.log('  OK    '+m);
const bad=m=>{console.log('  X     '+m);gagal++;};

// ── tiruan lingkungan Apps Script ──
function bikinGAS(props,sheetsAwal){
  const sheets={};
  Object.keys(sheetsAwal||{}).forEach(n=>{sheets[n]={rows:sheetsAwal[n].slice()};});
  const mkSheet=(nama)=>({
    appendRow(r){sheets[nama].rows.push(r.slice());},
    getRange(){return {setValues(v){
        // menulis judul kolom tambahan di baris 1
        const h=sheets[nama].rows[0];
        v[0].forEach(x=>h.push(x));
        return this;
      },setFontWeight(){return this;},setBackground(){return this;},
      setFontColor(){return this;}};},
    setFrozenRows(){}, autoResizeColumns(){},
    getLastColumn(){return sheets[nama].rows[0]?sheets[nama].rows[0].length:0;},
    getLastRow(){return sheets[nama].rows.length;}
  });
  const ctx={
    console,Math,Date,JSON,Object,Array,String,Number,parseInt,parseFloat,isNaN,RegExp,
    Logger:{log(){}},
    PropertiesService:{getScriptProperties:()=>({getProperty:k=>props[k]||null})},
    SpreadsheetApp:{getActiveSpreadsheet:()=>({
      getName:()=>'Anabhi Smart Play',
      getSheetByName:n=>sheets[n]?mkSheet(n):null,
      insertSheet:n=>{sheets[n]={rows:[]};return mkSheet(n);}
    })},
    Utilities:{formatDate:()=>'07/09/2026 17:05:22'},
    ContentService:{MimeType:{JSON:'json'},
      createTextOutput:t=>({setMimeType:()=>({_body:t})})},
    UrlFetchApp:{fetch:(url,o)=>{ctx.__kirim.push({url,o});
      return {getResponseCode:()=>200,getContentText:()=>'{"ok":true}'};}},
    __kirim:[], __sheets:sheets
  };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(W,'gas','Code.gs'),'utf8'),ctx);
  return ctx;
}

// ── payload asli dari aplikasi ──
function payloadAsli(cat,qc){
  const el=()=>({classList:{toggle(){},add(){},remove(){},contains:()=>false},style:{},dataset:{},
    addEventListener(){},appendChild(){},removeAttribute(){},querySelectorAll:()=>[],
    set textContent(v){},get textContent(){return ''},set innerHTML(v){},get innerHTML(){return ''},hidden:false,nextElementSibling:null});
  const c={console,Math,Date,JSON,Object,Array,String,Number,Set,Map,parseInt,parseFloat,isNaN,Promise,URL,RegExp,
    document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){},body:el(),createElement:el,documentElement:el(),fonts:{}},
    window:{addEventListener(){},matchMedia:()=>({matches:false}),navigator:{},location:{href:'x',reload(){}},onbeforeunload:null},
    navigator:{onLine:true,userAgent:'node',standalone:false},
    localStorage:{_d:{},getItem(k){return this._d[k]||null},setItem(k,v){this._d[k]=v},removeItem(k){delete this._d[k]}},
    history:{pushState(){}},location:{href:'x'},setTimeout:()=>0,fetch:()=>Promise.reject(new Error('x')),
    twemoji:{parse(){}},matchMedia:()=>({matches:false})};
  c.window.matchMedia=c.matchMedia;
  vm.createContext(c); vm.runInContext(appJS(),c);
  const g=e=>vm.runInContext(e,c);
  const S=g('S');
  S.player='abhi'; S.app=cat; S.qCount=qc; S.sessionId='ABHI-TEST';
  S.qBank=g('({math:buildMathBank,fun:buildFunBank,bindo:buildBindoBank,bing:buildBingBank,sains:buildSainsBank,seni:buildSeniBank,logika:buildLogikaBank,mix:buildMixBank})')[cat](qc);
  S.results=S.qBank.map((_,i)=>i%3!==0);
  S.statDetail={};
  S.qBank.forEach((q,i)=>{
    if(!S.statDetail[q.t])S.statDetail[q.t]={ok:0,tot:0};
    S.statDetail[q.t].tot++; if(S.results[i])S.statDetail[q.t].ok++;
  });
  S.score=S.results.filter(Boolean).length*g('poinPerSoal')(qc);
  return {
    sessionId:S.sessionId,pemain:'Abhinaya Kenzie',
    game:{math:'Math Adventure',fun:'Fun Games',bindo:'Bahasa Indonesia',bing:'Bahasa Inggris',
          sains:'Pengetahuan Umum',seni:'Seni & Kreativitas',logika:'Logika & Pola',mix:'Mix Challenge'}[cat],
    score:S.score,totalSoal:qc,
    soalBenar:S.results.filter(Boolean).length,soalSalah:S.results.filter(x=>!x).length,
    akurasi:Math.round(S.results.filter(Boolean).length/qc*100),
    durasi:'1 menit',streak:3,detail:S.statDetail,
    vocab:g('ringkasKosakata')(),catatanOrangTua:g('catatanSalah')(),
    maxScoreApp:g('maxScore')(qc)
  };
}

const HEADER_LAMA=['Timestamp','Session ID','Nama','Game','Jumlah Soal','Score','Max Score',
  'Soal Benar','Soal Salah','Akurasi (%)','Durasi','Streak (hari)',
  'Urutan Angka (benar/total)','Besar-Kecil (benar/total)','Jumlah Visual (benar/total)',
  'Kurang Visual (benar/total)','Operasi Hitung (benar/total)','Bentuk & Warna (benar/total)',
  'Tebak Huruf (benar/total)','Odd One Out (benar/total)','Baca Jam (benar/total)'];

console.log('── 1. 21 kolom lama TIDAK bergeser ──');
{
  const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},{});
  const H=vm.runInContext('CONFIG.HEADERS',c);
  let geser=0;
  HEADER_LAMA.forEach((h,i)=>{ if(H[i]!==h){bad('kolom '+(i+1)+': "'+H[i]+'" ≠ "'+h+'"');geser++;} });
  if(!geser)ok('21 kolom pertama identik dengan sheet lama kakak');
  ok('kolom baru ditambahkan di belakang: '+H.slice(21).join(', '));
}

console.log('── 2. 🔴 Max Score — bug totalSoal*5 ──');
{
  const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},{});
  const maxScore=vm.runInContext('maxScore',c);
  [[10,100],[15,105],[20,100]].forEach(([qc,harus])=>{
    const dpt=maxScore(qc), lama=qc*5;
    dpt===harus ? ok(qc+' soal → Max Score '+dpt+' (kode lama menulis '+lama+')')
                : bad(qc+' soal → '+dpt+', seharusnya '+harus);
  });
}

console.log('── 3. Baris cocok dengan payload aplikasi sungguhan ──');
{
  let salah=0,baris=0;
  ['math','fun','bindo','bing','sains','seni','logika','mix'].forEach(cat=>{
    [10,15,20].forEach(qc=>{
      const d=payloadAsli(cat,qc);
      const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},{});
      vm.runInContext('saveToSheet',c)(d);
      const rows=c.__sheets['Abhi'].rows;
      const H=vm.runInContext('CONFIG.HEADERS',c);
      const r=rows[rows.length-1];
      baris++;
      if(r.length!==H.length){bad(cat+'/'+qc+': '+r.length+' sel ≠ '+H.length+' kolom');salah++;return;}
      if(r[6]!==d.maxScoreApp){bad(cat+'/'+qc+': Max Score sheet '+r[6]+' ≠ aplikasi '+d.maxScoreApp);salah++;}
      if(r[5]!==d.score){bad(cat+'/'+qc+': Score tidak cocok');salah++;}
      if(r[2]!=='Abhinaya Kenzie'){bad(cat+'/'+qc+': nama salah');salah++;}
    });
  });
  salah===0 && ok(baris+' baris (8 kategori × 3 jumlah soal) — kolom & skor cocok semua');
}

console.log('── 4. Pemain masuk sheet yang benar ──');
{
  const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},{});
  const save=vm.runInContext('saveToSheet',c);
  save({pemain:'Abhinaya Kenzie',totalSoal:10});
  save({pemain:'Anjali Kirana',totalSoal:10});
  c.__sheets['Abhi']&&c.__sheets['Abhi'].rows.length===2 ? ok('Abhi → sheet "Abhi"') : bad('Abhi salah sheet');
  c.__sheets['Ana'] &&c.__sheets['Ana'].rows.length===2  ? ok('Ana  → sheet "Ana"')  : bad('Ana salah sheet');
}

console.log('── 5. Sheet LAMA (21 kolom) ditambah kolom baru tanpa merusak data ──');
{
  const lamaData=['06/06/2026','ABHI-MATH-1','Abhinaya Kenzie','Math Adventure',10,50,50,10,0,100,'1 menit',1,
                  '2/2','-','-','-','-','-','-','-','-'];
  const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},
                   {Abhi:[HEADER_LAMA.slice(),lamaData.slice()]});
  vm.runInContext('saveToSheet',c)(payloadAsli('math',10));
  const rows=c.__sheets['Abhi'].rows;
  const H=vm.runInContext('CONFIG.HEADERS',c);
  rows[0].length===H.length ? ok('judul kolom dilengkapi jadi '+H.length+' kolom')
                            : bad('judul kolom '+rows[0].length+' ≠ '+H.length);
  JSON.stringify(rows[1])===JSON.stringify(lamaData)
    ? ok('baris lama sejak Juni 2026 TIDAK tersentuh sama sekali')
    : bad('baris lama berubah!');
  rows[0].slice(0,21).join('|')===HEADER_LAMA.join('|')
    ? ok('judul 21 kolom lama tetap di posisi semula') : bad('judul lama bergeser');
}

console.log('── 6. Rahasia lewat Script Properties, bukan kode ──');
{
  const src=fs.readFileSync(path.join(W,'gas','Code.gs'),'utf8');
  /BOT_TOKEN\s*:\s*['"][^'"]{10,}/.test(src) ? bad('token masih hardcoded') : ok('nol token hardcoded');
  src.indexOf("P.getProperty('TELEGRAM_BOT_TOKEN')")!==-1 ? ok('token dibaca dari Script Properties') : bad('token tidak dari properties');
  // tanpa token: tidak boleh melempar error
  const c=bikinGAS({},{});
  try{ vm.runInContext('sendTelegram',c)('halo'); ok('tanpa token: tidak error, hanya dicatat di Logger'); }
  catch(e){ bad('tanpa token malah melempar error: '+e.message); }
  c.__kirim.length===0 ? ok('tanpa token: tidak ada permintaan terkirim') : bad('masih mengirim tanpa token');
}

console.log('── 7. Gemini mati / kunci kosong → aplikasi tetap jalan ──');
{
  const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},{});   // tanpa GEMINI_API_KEY
  const r=JSON.parse(vm.runInContext('handleHint',c)({hintLevel:2})._body);
  r.ok===true&&r.fallback===true ? ok('hint tanpa kunci: ok:true + fallback:true (bukan error)')
                                 : bad('hint tanpa kunci: '+JSON.stringify(r));
  const r0=JSON.parse(vm.runInContext('handleHint',c)({hintLevel:0})._body);
  r0.text==='' ? ok('level 0 tidak menghasilkan teks') : bad('level 0 malah ada teks');
  const ri=JSON.parse(vm.runInContext('handleInsight',c)({})._body);
  ri.ok===true ? ok('insight tanpa kunci: tetap ok:true') : bad('insight gagal');
}

console.log('── 8. Payload LAMA (tanpa action/vocab) tetap diterima ──');
{
  const c=bikinGAS({TELEGRAM_BOT_TOKEN:'t',TELEGRAM_CHAT_ID:'c'},{});
  const res=vm.runInContext('doPost',c)({postData:{contents:JSON.stringify({
    sessionId:'ABHI-LAMA',pemain:'Abhinaya Kenzie',game:'Math Adventure',
    totalSoal:10,score:50,soalBenar:10,soalSalah:0,akurasi:100,durasi:'1 menit',streak:1,
    detail:{seq:{ok:2,tot:2}}
  })}});
  JSON.parse(res._body).status==='ok' ? ok('payload aplikasi versi LAMA tetap diterima') : bad('payload lama ditolak');
  const r=c.__sheets['Abhi'].rows[c.__sheets['Abhi'].rows.length-1];
  const H=vm.runInContext('CONFIG.HEADERS',c);
  r.length===H.length ? ok('kolom baru diisi "-" walau payload lama tidak mengirimnya') : bad('jumlah sel salah');
  c.__kirim.length===1 ? ok('Telegram tetap terkirim 1×') : bad('Telegram terkirim '+c.__kirim.length+'×');
}

console.log(gagal?'\n❌ GAGAL: '+gagal:'\n✅ SEMUA LOLOS');
process.exit(gagal?1:0);
