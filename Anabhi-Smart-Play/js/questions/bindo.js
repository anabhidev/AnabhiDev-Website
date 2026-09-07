// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Bahasa Indonesia
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████████  BANK SOAL — BAHASA INDONESIA (KETIK)  ██████████
// Template + random substitusi. 100 kalimat unik per sesi.
// ══════════════════════════════════════════════════════════
const BI_SUBJECTS=['Saya','Adik','Kakak','Ibu','Ayah','Nenek','Kakek','Dia','Kami','Paman','Bibi'];
const BI_ACTIONS=[
  {v:'makan',    o:['nasi','roti','buah','kue','sayur','bubur']},
  {v:'minum',    o:['susu','air putih','teh','jus jeruk']},
  {v:'membaca',  o:['buku','majalah','koran','cerita']},
  {v:'menulis',  o:['surat','cerita','huruf','angka']},
  {v:'membeli',  o:['baju','sepatu','tas','buku','pensil']},
  {v:'menyapu',  o:['lantai','halaman','kamar','teras']},
  {v:'mencuci',  o:['piring','baju','tangan','sepatu']},
  {v:'belajar',  o:['membaca','menulis','berhitung','menggambar']},
  {v:'bermain',  o:['bola','layangan','boneka','sepeda']},
  {v:'menggambar',o:['rumah','bunga','gunung','mobil','kucing']},
  {v:'menyiram', o:['bunga','tanaman','pohon']},
  {v:'memberi makan',o:['kucing','ayam','ikan','burung']},
];
function genBindoBank(){
  const r=[];const used=new Set();
  let guard=0;
  while(r.length<100&&guard<2000){
    guard++;
    const s=BI_SUBJECTS[Math.floor(Math.random()*BI_SUBJECTS.length)];
    const act=BI_ACTIONS[Math.floor(Math.random()*BI_ACTIONS.length)];
    const o=act.o[Math.floor(Math.random()*act.o.length)];
    const sedang=Math.random()<0.35?'sedang ':'';
    const sentence=`${s} ${sedang}${act.v} ${o}.`;
    if(used.has(sentence))continue;
    used.add(sentence);
    r.push({t:'ketik',sentence});
  }
  return r;
}
// Validasi fleksibel: abaikan besar/kecil huruf, spasi berlebih, & tanda titik akhir
function normalizeBI(s){
  return s.toLowerCase().replace(/[.。]+\s*$/,'').replace(/\s+/g,' ').trim();
}
