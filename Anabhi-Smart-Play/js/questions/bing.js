// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Bahasa Inggris
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 7 September 2026, 11:20:05
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████████  BANK SOAL — BAHASA INGGRIS (PG)  ██████████
// ══════════════════════════════════════════════════════════
//
// EN_ITEMS adalah SUMBER KEBENARAN kosakata. Bentuknya [emoji, kata] dan
// SENGAJA tidak diubah — snapshot.js merekam EN_ITEMS apa adanya sebagai bagian
// dari sidik jari perilaku, dan genBingBank() membacanya lewat indeks [0]/[1].
// Mengubahnya jadi objek = seluruh sidik jari berubah dan soal lama ikut bergeser.
//
// Master 2 §5 meminta setiap kata punya identitas tetap (wordId) supaya
// penguasaan kata bisa dicatat lintas sesi. Itu DITURUNKAN dari EN_ITEMS di
// bawah (VOCAB), bukan menggantikannya.
const EN_ITEMS={
  animals:[['🐱','Cat'],['🐶','Dog'],['🐘','Elephant'],['🦁','Lion'],['🐟','Fish'],['🐦','Bird'],['🐰','Rabbit'],['🐵','Monkey'],['🐮','Cow'],['🐔','Chicken'],['🐸','Frog'],['🐢','Turtle'],['🦆','Duck'],['🐴','Horse'],['🐐','Goat']],
  food:[['🍎','Apple'],['🍌','Banana'],['🍊','Orange'],['🍇','Grapes'],['🍉','Watermelon'],['🍚','Rice'],['🍞','Bread'],['🥚','Egg'],['🥛','Milk'],['🍦','Ice cream'],['🍰','Cake'],['🍓','Strawberry'],['🥕','Carrot'],['🌽','Corn'],['🍍','Pineapple']],
  colors:[['🔴','Red'],['🔵','Blue'],['🟡','Yellow'],['🟢','Green'],['⚫','Black'],['⚪','White'],['🟣','Purple'],['🟠','Orange'],['🟤','Brown'],['🩷','Pink']],
  school:[['📚','Book'],['✏️','Pencil'],['🎒','Bag'],['📏','Ruler'],['✂️','Scissors'],['🪑','Chair'],['🚪','Door'],['🖍️','Crayon'],['📖','Notebook'],['🧽','Eraser']],
  body:[['👁️','Eye'],['👂','Ear'],['👃','Nose'],['👄','Mouth'],['✋','Hand'],['🦶','Foot'],['🦷','Tooth'],['💇','Hair'],['🫀','Heart'],['🧠','Brain']],
};
function genBingBank(){
  const r=[];
  const cats=Object.keys(EN_ITEMS);
  for(let i=0;i<100;i++){
    const cat=cats[i%cats.length];
    const pool=EN_ITEMS[cat];
    const item=pool[Math.floor(Math.random()*pool.length)];
    const wrong=new Set();
    while(wrong.size<3){
      const w=pool[Math.floor(Math.random()*pool.length)];
      if(w[1]!==item[1])wrong.add(w[1]);
    }
    const opts=[item[1],...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'bing',emoji:item[0],word:item[1],cat,o:opts,a:opts.indexOf(item[1])});
  }
  return r.sort(()=>Math.random()-.5);
}
const BING_CAT_LABEL={animals:'Hewan',food:'Makanan & Buah',colors:'Warna',school:'Benda Sekolah',body:'Anggota Tubuh'};

// ══════════════════════════════════════════════════════════
// ██████████  VOCABULARY BANK (Master 2 §5)  ██████████
// ══════════════════════════════════════════════════════════
//
// Diturunkan dari EN_ITEMS — BUKAN salinan yang diketik ulang. Kalau EN_ITEMS
// bertambah, VOCAB ikut bertambah sendiri. Dua daftar terpisah yang harus
// disamakan manual adalah sumber bug klasik; di sini itu mustahil terjadi.
//
// wordId dibuat dari topik + kata (bukan nomor urut). Alasannya: nomor urut
// bergeser setiap kali ada kata disisipkan di tengah, dan seluruh riwayat
// penguasaan anak ikut salah tempel. 'animals:cat' tetap 'animals:cat' selamanya.
function vocabId(topic,word){ return topic+':'+word.toLowerCase().replace(/\s+/g,'-'); }

// Terjemahan Indonesia. Kata yang belum ada terjemahannya TIDAK dibuang —
// dibiarkan kosong, supaya kartu tetap bisa tampil dan tidak ada kata hilang diam-diam.
const VOCAB_ID_LABEL={
  Cat:'Kucing',Dog:'Anjing',Elephant:'Gajah',Lion:'Singa',Fish:'Ikan',Bird:'Burung',
  Rabbit:'Kelinci',Monkey:'Monyet',Cow:'Sapi',Chicken:'Ayam',Frog:'Katak',Turtle:'Kura-kura',
  Duck:'Bebek',Horse:'Kuda',Goat:'Kambing',
  Apple:'Apel',Banana:'Pisang',Orange:'Jeruk',Grapes:'Anggur',Watermelon:'Semangka',
  Rice:'Nasi',Bread:'Roti',Egg:'Telur',Milk:'Susu','Ice cream':'Es krim',Cake:'Kue',
  Strawberry:'Stroberi',Carrot:'Wortel',Corn:'Jagung',Pineapple:'Nanas',
  Red:'Merah',Blue:'Biru',Yellow:'Kuning',Green:'Hijau',Black:'Hitam',White:'Putih',
  Purple:'Ungu',Brown:'Cokelat',Pink:'Merah muda',
  Book:'Buku',Pencil:'Pensil',Bag:'Tas',Ruler:'Penggaris',Scissors:'Gunting',
  Chair:'Kursi',Door:'Pintu',Crayon:'Krayon',Notebook:'Buku tulis',Eraser:'Penghapus',
  Eye:'Mata',Ear:'Telinga',Nose:'Hidung',Mouth:'Mulut',Hand:'Tangan',Foot:'Kaki',
  Tooth:'Gigi',Hair:'Rambut',Heart:'Jantung',Brain:'Otak'
};

// Kalimat contoh dibangkitkan dari pola, bukan ditulis 60 kali. Artikel a/an
// mengikuti bunyi awal kata — "an apple", "an egg", "an eraser".
function vocabArticle(w){ return /^[aeiou]/i.test(w) ? 'an' : 'a'; }
function vocabSentence(topic,word){
  const w=word.toLowerCase();
  if(topic==='colors')  return 'This is '+w+'.';
  if(topic==='body')    return 'This is my '+w+'.';
  if(topic==='animals') return 'This is '+vocabArticle(word)+' '+w+'.';
  return 'This is '+vocabArticle(word)+' '+w+'.';
}

// VOCAB — satu entri per kata, dibangun sekali saat berkas dimuat.
const VOCAB=(function(){
  const out=[];
  Object.keys(EN_ITEMS).forEach(function(topic){
    EN_ITEMS[topic].forEach(function(it){
      out.push({
        wordId  : vocabId(topic,it[1]),
        word    : it[1],
        emoji   : it[0],
        topic   : topic,
        topicLabel: BING_CAT_LABEL[topic],
        arti    : VOCAB_ID_LABEL[it[1]] || '',
        contoh  : vocabSentence(topic,it[1])
      });
    });
  });
  return out;
})();

// Pencarian cepat berdasarkan wordId — dipakai mesin penguasaan kata nanti.
const VOCAB_BY_ID=(function(){
  const m={};
  VOCAB.forEach(function(v){ m[v.wordId]=v; });
  return m;
})();

// Dipakai saat mencatat jawaban: dari soal 'bing' -> wordId.
function vocabIdOfQuestion(q){
  if(!q||q.t!=='bing'||!q.cat||!q.word)return null;
  return vocabId(q.cat,q.word);
}
