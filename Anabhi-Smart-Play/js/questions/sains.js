// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Pengetahuan Umum
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 7 September 2026, 11:20:05
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████████  BANK SOAL — PENGETAHUAN UMUM / SAINS (PG)  ██████████
// ══════════════════════════════════════════════════════════
// 1. Habitat hewan
const SAINS_HABITAT=[
  {e:'🐟',n:'Ikan',h:'Air'},{e:'🐬',n:'Lumba-lumba',h:'Air'},{e:'🦈',n:'Hiu',h:'Air'},{e:'🐙',n:'Gurita',h:'Air'},{e:'🦀',n:'Kepiting',h:'Air'},
  {e:'🦁',n:'Singa',h:'Darat'},{e:'🐘',n:'Gajah',h:'Darat'},{e:'🐱',n:'Kucing',h:'Darat'},{e:'🐴',n:'Kuda',h:'Darat'},{e:'🐐',n:'Kambing',h:'Darat'},
  {e:'🦅',n:'Elang',h:'Udara'},{e:'🦋',n:'Kupu-kupu',h:'Udara'},{e:'🐝',n:'Lebah',h:'Udara'},{e:'🦜',n:'Burung Beo',h:'Udara'},
];
// 2. Panca indera
const SAINS_INDERA=[
  {q:'Kita melihat menggunakan?',ans:'Mata',opts:['Mata','Telinga','Hidung','Tangan']},
  {q:'Kita mendengar menggunakan?',ans:'Telinga',opts:['Telinga','Mata','Kaki','Mulut']},
  {q:'Kita mencium bau menggunakan?',ans:'Hidung',opts:['Hidung','Telinga','Mata','Rambut']},
  {q:'Kita merasakan makanan menggunakan?',ans:'Lidah',opts:['Lidah','Hidung','Mata','Telinga']},
  {q:'Kita meraba benda menggunakan?',ans:'Kulit',opts:['Kulit','Mata','Telinga','Gigi']},
  {q:'Kita berjalan menggunakan?',ans:'Kaki',opts:['Kaki','Tangan','Kepala','Telinga']},
  {q:'Kita menulis menggunakan?',ans:'Tangan',opts:['Tangan','Kaki','Hidung','Telinga']},
  {q:'Kita mengunyah makanan menggunakan?',ans:'Gigi',opts:['Gigi','Rambut','Kuku','Telinga']},
];
// 3. Benda hidup vs mati
const SAINS_HIDUP=[
  {e:'🐱',n:'Kucing',hidup:true},{e:'🌸',n:'Bunga',hidup:true},{e:'🌳',n:'Pohon',hidup:true},{e:'🐟',n:'Ikan',hidup:true},{e:'🐦',n:'Burung',hidup:true},{e:'🍄',n:'Jamur',hidup:true},
  {e:'🪨',n:'Batu',hidup:false},{e:'🚗',n:'Mobil',hidup:false},{e:'🪑',n:'Kursi',hidup:false},{e:'📚',n:'Buku',hidup:false},{e:'⚽',n:'Bola',hidup:false},{e:'🏠',n:'Rumah',hidup:false},
];
// 4. Makanan sehat vs tidak
const SAINS_SEHAT=[
  {e:'🥦',n:'Brokoli',sehat:true},{e:'🍎',n:'Apel',sehat:true},{e:'🥕',n:'Wortel',sehat:true},{e:'🥛',n:'Susu',sehat:true},{e:'🍌',n:'Pisang',sehat:true},{e:'🐟',n:'Ikan',sehat:true},
  {e:'🍭',n:'Permen',sehat:false},{e:'🍟',n:'Kentang Goreng',sehat:false},{e:'🍩',n:'Donat',sehat:false},{e:'🥤',n:'Soda',sehat:false},
];
function genSainsBank(){
  const r=[];
  // Habitat (butuh terus di-loop sampai kuota)
  const mk=[];
  SAINS_HABITAT.forEach(a=>{
    mk.push({t:'sains',q:`${a.e} ${a.n} hidup di mana?`,o:['Darat','Air','Udara'],a:['Darat','Air','Udara'].indexOf(a.h),grid3:true});
  });
  SAINS_INDERA.forEach(x=>{
    const opts=[...x.opts].sort(()=>Math.random()-.5);
    mk.push({t:'sains',q:`🧒 ${x.q}`,o:opts,a:opts.indexOf(x.ans)});
  });
  SAINS_HIDUP.forEach(x=>{
    mk.push({t:'sains',q:`${x.e} ${x.n} termasuk benda apa?`,o:['Makhluk Hidup','Benda Mati'],a:x.hidup?0:1,grid3:true});
  });
  SAINS_SEHAT.forEach(x=>{
    mk.push({t:'sains',q:`${x.e} ${x.n} termasuk makanan apa?`,o:['Sehat','Kurang Sehat'],a:x.sehat?0:1,grid3:true});
  });
  // Duplikasi acak hingga 100 (variasi urutan opsi tetap random tiap sesi)
  while(r.length<100){
    const src=mk[Math.floor(Math.random()*mk.length)];
    r.push({...src});
  }
  return r;
}

function buildBindoBank(n){return genBindoBank().sort(()=>Math.random()-.5).slice(0,n);}
// B8 — soal Bahasa Inggris tidak boleh mengulang KATA yang sama dalam satu sesi.
// genBingBank() mengambil kata secara acak DENGAN pengembalian, jadi 100 entri
// yang dihasilkannya wajar mengandung kata kembar. Selama ini akibatnya cuma
// sesi terasa membosankan; begitu penguasaan kata dicatat, satu kata yang muncul
// dua kali dihitung dua kali dan skor penguasaannya melonjak palsu.
// Penyaringan dilakukan DI SINI (batas sesi), bukan di dalam genBingBank(),
// supaya generatornya sendiri tidak berubah perilakunya.
function buildBingBank(n){
  const pool=genBingBank();
  const out=[],dipakai={};
  for(let i=0;i<pool.length&&out.length<n;i++){
    const w=pool[i].word;
    if(dipakai[w])continue;
    dipakai[w]=1; out.push(pool[i]);
  }
  // Cadangan: kalau kata unik lebih sedikit dari n (mis. 60 kata, minta 100),
  // sisanya diisi apa adanya supaya jumlah soal TIDAK PERNAH kurang dari n.
  for(let i=0;i<pool.length&&out.length<n;i++)out.push(pool[i]);
  return out;
}
function buildSainsBank(n){return genSainsBank().sort(()=>Math.random()-.5).slice(0,n);}
