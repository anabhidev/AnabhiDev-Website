// Tes memori belajar: aturan penguasaan (fungsi murni) + ketahanan saat
// IndexedDB TIDAK ADA. Yang paling penting: tidak adanya IndexedDB tidak boleh
// mematikan permainan sama sekali.
const vm=require('vm');
const {appJS}=require('./loadapp.js');

function run(adaIDB){
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
  if(adaIDB)ctx.indexedDB={open(){const r={};setTimeout(()=>r.onerror&&r.onerror());return r;}};
  ctx.window.matchMedia=ctx.matchMedia;
  vm.createContext(ctx); vm.runInContext(appJS(),ctx);
  return ctx;
}
const ctx=run(false);
const g=e=>vm.runInContext(e,ctx);
let gagal=0;
const ok =m=>console.log('  OK    '+m);
const bad=m=>{console.log('  X     '+m);gagal++;};

const awal=g('masteryAwal'), hitung=g('masteryHitung'), perlu=g('perluDiulang');
const HARI=86400000, T0=1757000000000;

console.log('── 1. Tahapan naik sesuai jawaban benar berturut-turut ──');
{
  let m=awal('kata:animals:cat');
  m.tahap==='baru' ? ok('awal: baru') : bad('awal: '+m.tahap);
  const urut=[];
  for(let i=1;i<=5;i++){ m=hitung(m,true,T0+i*HARI); urut.push(m.tahap); }
  const harus=['dilihat','akrab','akrab','dikuasai','dikuasai'];
  JSON.stringify(urut)===JSON.stringify(harus)
    ? ok('1..5 benar → '+urut.join(' → '))
    : bad('dapat '+urut.join(',')+' seharusnya '+harus.join(','));
  m.benar===5&&m.salah===0&&m.beruntun===5 ? ok('hitungan: 5 benar, 0 salah, beruntun 5') : bad('hitungan salah');
}

console.log('── 2. 🔴 Lupa: salah setelah dikuasai → masuk antrean ulang ──');
{
  let m=awal('kata:food:apple');
  for(let i=0;i<4;i++) m=hitung(m,true,T0);
  m.tahap==='dikuasai' ? ok('4 benar → dikuasai') : bad('bukan dikuasai: '+m.tahap);
  m=hitung(m,false,T0+10*HARI);
  m.tahap==='ulang' ? ok('lalu salah → ulang (inti Memory Bank)') : bad('setelah salah: '+m.tahap);
  m.beruntun===0 ? ok('beruntun kembali 0') : bad('beruntun '+m.beruntun);
  perlu(m,T0+10*HARI) ? ok('langsung perlu diulang') : bad('tidak masuk antrean ulang');
}

console.log('── 3. Salah saat masih baru TIDAK dianggap lupa ──');
{
  let m=hitung(awal('kata:x:y'),false,T0);
  m.tahap==='berlatih' ? ok('salah di awal → berlatih (bukan "ulang")') : bad('dapat '+m.tahap);
}

console.log('── 4. Jeda ulangan melebar sesuai tahap ──');
{
  const jeda=g('MASTERY_ATURAN').jeda;
  let m=awal('k'); const dapat={};
  m=hitung(m,true,T0); dapat.dilihat=(m.ulangPada-T0)/HARI;
  m=hitung(m,true,T0); dapat.akrab=(m.ulangPada-T0)/HARI;
  m=hitung(m,true,T0); m=hitung(m,true,T0); dapat.dikuasai=(m.ulangPada-T0)/HARI;
  dapat.dilihat===jeda.dilihat&&dapat.akrab===jeda.akrab&&dapat.dikuasai===jeda.dikuasai
    ? ok(`jeda: dilihat ${dapat.dilihat}h, akrab ${dapat.akrab}h, dikuasai ${dapat.dikuasai}h`)
    : bad('jeda tidak sesuai: '+JSON.stringify(dapat));
  perlu(m,T0+1*HARI)===false ? ok('dikuasai: belum perlu diulang esok hari') : bad('terlalu cepat diulang');
  perlu(m,T0+8*HARI)===true  ? ok('dikuasai: perlu diulang setelah 8 hari')  : bad('tidak pernah jatuh tempo');
}

console.log('── 5. Fungsi MURNI — tidak mengubah masukan ──');
{
  const asli=awal('kata:z'); const salin=JSON.parse(JSON.stringify(asli));
  hitung(asli,true,T0); hitung(asli,false,T0);
  JSON.stringify(asli)===JSON.stringify(salin)
    ? ok('objek lama tidak ikut berubah (tidak ada efek samping)')
    : bad('masukan ikut termutasi!');
  const a=hitung(salin,true,T0), b=hitung(salin,true,T0);
  JSON.stringify(a)===JSON.stringify(b) ? ok('masukan sama → hasil selalu sama') : bad('hasil tidak deterministik');
}

console.log('── 6. Antrean ulangan: yang paling dilupakan didahulukan ──');
{
  const urutkan=g('urutkanUlangan');
  const bikin=(id,tahap,ulangPada)=>({id,tahap,ulangPada});
  const daftar=[
    bikin('kata:a','dikuasai',T0+30*HARI),
    bikin('kata:b','ulang',T0),
    bikin('kata:c','berlatih',T0-HARI),
    bikin('kata:d','akrab',T0-2*HARI)
  ];
  const hasil=urutkan(daftar,T0).map(m=>m.id);
  hasil[0]==='kata:b' ? ok('"ulang" paling depan') : bad('urutan: '+hasil.join(','));
  hasil.indexOf('kata:a')===-1 ? ok('yang belum jatuh tempo tidak ikut diantrekan') : bad('dikuasai ikut masuk antrean');
  ok('antrean: '+hasil.join(' → '));
}

console.log('── 7. Kunci kata & konsep dipisah tapi satu tabel ──');
{
  g('kunciKata')('animals:cat')==='kata:animals:cat' ? ok('kunci kata benar') : bad('kunci kata salah');
  g('kunciKonsep')('seq')==='konsep:seq' ? ok('kunci konsep benar') : bad('kunci konsep salah');
}

console.log('── 8. 🔴 TANPA IndexedDB: permainan tetap jalan penuh ──');
{
  typeof ctx.indexedDB==='undefined' ? ok('lingkungan ini memang tanpa indexedDB') : bad('indexedDB masih ada');
  const S=g('S');
  const bank=g('buildBingBank')(10);
  S.qBank=bank; S.results=bank.map((_,i)=>i%2===0); S.qCount=10;
  S.sessionId='UJI-1'; S.player='ana'; S.app='bing'; S.score=50;
  let lempar=null;
  let hasil;
  try{ hasil=g('catatSesi')({akurasi:50}); }catch(e){ lempar=e; }
  lempar===null ? ok('catatSesi() tidak melempar error') : bad('melempar: '+lempar.message);
  hasil&&typeof hasil.then==='function' ? ok('mengembalikan Promise') : bad('bukan Promise');
  Promise.all([hasil,g('kataPerluDiulang')(5),g('ringkasanBelajar')()]).then(([a,b,c])=>{
    a===false ? ok('catatSesi resolve false (jujur: tidak tersimpan)') : bad('catatSesi: '+a);
    Array.isArray(b)&&b.length===0 ? ok('kataPerluDiulang → [] tanpa error') : bad('kataPerluDiulang: '+JSON.stringify(b));
    c&&c.total===0 ? ok('ringkasanBelajar → total 0 tanpa error') : bad('ringkasan: '+JSON.stringify(c));

    console.log('── 9. IndexedDB ADA tapi GAGAL dibuka ──');
    const c2=run(true);
    const g2=e=>vm.runInContext(e,c2);
    const S2=g2('S');
    const b2=g2('buildMathBank')(10);
    S2.qBank=b2; S2.results=b2.map(()=>true); S2.qCount=10;
    S2.sessionId='UJI-2'; S2.player='abhi'; S2.app='math'; S2.score=100;
    g2('catatSesi')({akurasi:100}).then(r=>{
      r===false ? ok('open() error → resolve false, tidak menggantung') : bad('hasil: '+r);
      console.log(gagal?'\n❌ GAGAL: '+gagal:'\n✅ SEMUA LOLOS');
      process.exit(gagal?1:0);
    }).catch(e=>{ bad('malah reject: '+e.message); process.exit(1); });
  }).catch(e=>{ bad('rantai Promise reject: '+e.message); process.exit(1); });
}
