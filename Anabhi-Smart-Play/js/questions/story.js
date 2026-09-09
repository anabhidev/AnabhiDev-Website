// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Cerita pendek & kuis pemahaman (Master 2 §12)
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 7 September 2026, 23:12:40
// ================================================================
//
// Alur (Master 2 §12):  CERITA -> KOSAKATA -> KUIS -> ULANGAN
//
// 🔴 Cerita HANYA memakai kata yang sudah ada di VOCAB. Alasannya bukan
// kemalasan: kalau cerita memperkenalkan kata di luar bank kosakata, kata itu
// tidak punya wordId, tidak bisa dicatat penguasaannya, dan tidak akan pernah
// muncul di Smart Card maupun antrean ulangan. Ceritanya jadi hiburan sekali
// pakai — persis yang dilarang Master 2 §12 ("bukan konten sekali buang").
//
// Kalimatnya sengaja pendek dan berulang. Untuk kelas 1 SD, pengulangan pola
// ("This is a…", "I like…") justru yang membuat pola bahasanya menempel.

var STORIES = [
  {
    id: 'kucing-lapar',
    judul: 'The Hungry Cat',
    judulId: 'Kucing yang Lapar',
    emoji: '🐱',
    halaman: [
      { em:'🐱', en:'This is a cat.',        id:'Ini seekor kucing.' },
      { em:'🐟', en:'The cat is hungry.',    id:'Kucing itu lapar.' },
      { em:'🥛', en:'Mother gives milk.',    id:'Ibu memberi susu.' },
      { em:'🐟', en:'The cat eats a fish.',  id:'Kucing itu makan ikan.' },
      { em:'😺', en:'Now the cat is happy!', id:'Sekarang kucingnya senang!' }
    ],
    kata: ['animals:cat','animals:fish','food:milk'],
    soal: [
      { en:{q:'What animal is in the story?',o:['Cat','Dog','Cow','Duck'],benar:'Cat'},
        id:{q:'Hewan apa yang ada di cerita?',o:['Kucing','Anjing','Sapi','Bebek'],benar:'Kucing'} },
      { en:{q:'What does the cat eat?',o:['Fish','Cake','Bread','Corn'],benar:'Fish'},
        id:{q:'Apa yang dimakan kucing?',o:['Ikan','Kue','Roti','Jagung'],benar:'Ikan'} },
      { en:{q:'What is "susu" in English?',o:['Milk','Bread','Egg','Rice'],benar:'Milk'},
        id:{q:'Apa arti "milk"?',o:['Susu','Roti','Telur','Nasi'],benar:'Susu'} }
    ]
  },
  {
    id: 'tas-sekolah',
    judul: 'My School Bag',
    judulId: 'Tas Sekolahku',
    emoji: '🎒',
    halaman: [
      { em:'🎒', en:'This is my bag.',        id:'Ini tasku.' },
      { em:'📚', en:'I have a book.',         id:'Aku punya buku.' },
      { em:'✏️', en:'I have a pencil.',       id:'Aku punya pensil.' },
      { em:'📏', en:'I have a ruler too.',    id:'Aku juga punya penggaris.' },
      { em:'🏫', en:'I go to school. Bye!',   id:'Aku pergi ke sekolah. Dah!' }
    ],
    kata: ['school:bag','school:book','school:pencil','school:ruler'],
    soal: [
      { en:{q:'What is in the bag?',o:['Book','Fish','Milk','Frog'],benar:'Book'},
        id:{q:'Apa yang ada di dalam tas?',o:['Buku','Ikan','Susu','Katak'],benar:'Buku'} },
      { en:{q:'What is "pensil" in English?',o:['Pencil','Ruler','Book','Bag'],benar:'Pencil'},
        id:{q:'Apa arti "pencil"?',o:['Pensil','Penggaris','Buku','Tas'],benar:'Pensil'} },
      { en:{q:'Where does the child go?',o:['School','Home','Zoo','Farm'],benar:'School'},
        id:{q:'Anak itu pergi ke mana?',o:['Sekolah','Rumah','Kebun binatang','Peternakan'],benar:'Sekolah'} }
    ]
  },
  {
    id: 'di-peternakan',
    judul: 'At the Farm',
    judulId: 'Di Peternakan',
    emoji: '🐮',
    halaman: [
      { em:'🐮', en:'I see a cow.',            id:'Aku melihat sapi.' },
      { em:'🐴', en:'I see a horse.',          id:'Aku melihat kuda.' },
      { em:'🦆', en:'A duck says quack!',      id:'Bebek berkata kwek!' },
      { em:'🐐', en:'A goat eats grass.',      id:'Kambing makan rumput.' },
      { em:'🌞', en:'The farm is fun!',        id:'Peternakannya seru!' }
    ],
    kata: ['animals:cow','animals:horse','animals:duck','animals:goat'],
    soal: [
      { en:{q:'Which animal says quack?',o:['Duck','Cow','Goat','Horse'],benar:'Duck'},
        id:{q:'Hewan apa yang berkata kwek?',o:['Bebek','Sapi','Kambing','Kuda'],benar:'Bebek'} },
      { en:{q:'What is "kuda" in English?',o:['Horse','Cow','Goat','Duck'],benar:'Horse'},
        id:{q:'Apa arti "horse"?',o:['Kuda','Sapi','Kambing','Bebek'],benar:'Kuda'} },
      { en:{q:'What does the goat eat?',o:['Grass','Cake','Fish','Rice'],benar:'Grass'},
        id:{q:'Apa yang dimakan kambing?',o:['Rumput','Kue','Ikan','Nasi'],benar:'Rumput'} }
    ]
  },
  {
    id: 'keranjang-buah',
    judul: 'The Fruit Basket',
    judulId: 'Keranjang Buah',
    emoji: '🍎',
    halaman: [
      { em:'🍎', en:'I like an apple.',        id:'Aku suka apel.' },
      { em:'🍌', en:'I like a banana.',        id:'Aku suka pisang.' },
      { em:'🍊', en:'My sister likes orange.', id:'Adikku suka jeruk.' },
      { em:'🍉', en:'We share watermelon.',    id:'Kami berbagi semangka.' },
      { em:'😋', en:'Fruit is sweet!',         id:'Buah itu manis!' }
    ],
    kata: ['food:apple','food:banana','food:orange','food:watermelon'],
    soal: [
      { en:{q:'What does my sister like?',o:['Orange','Apple','Bread','Milk'],benar:'Orange'},
        id:{q:'Adik suka buah apa?',o:['Jeruk','Apel','Roti','Susu'],benar:'Jeruk'} },
      { en:{q:'What is "semangka" in English?',o:['Watermelon','Banana','Apple','Orange'],benar:'Watermelon'},
        id:{q:'Apa arti "watermelon"?',o:['Semangka','Pisang','Apel','Jeruk'],benar:'Semangka'} },
      { en:{q:'How is the fruit?',o:['Sweet','Big','Cold','Red'],benar:'Sweet'},
        id:{q:'Bagaimana rasa buahnya?',o:['Manis','Besar','Dingin','Merah'],benar:'Manis'} }
    ]
  },
  {
    id: 'tubuhku',
    judul: 'My Body',
    judulId: 'Tubuhku',
    emoji: '👁️',
    halaman: [
      { em:'👁️', en:'I see with my eyes.',    id:'Aku melihat dengan mataku.' },
      { em:'👂', en:'I hear with my ears.',    id:'Aku mendengar dengan telingaku.' },
      { em:'👃', en:'I smell with my nose.',   id:'Aku mencium dengan hidungku.' },
      { em:'✋', en:'I clap with my hands.',   id:'Aku bertepuk dengan tanganku.' },
      { em:'🤗', en:'My body is amazing!',     id:'Tubuhku hebat!' }
    ],
    kata: ['body:eye','body:ear','body:nose','body:hand'],
    soal: [
      { en:{q:'What do I see with?',o:['Eyes','Ears','Nose','Hands'],benar:'Eyes'},
        id:{q:'Aku melihat dengan apa?',o:['Mata','Telinga','Hidung','Tangan'],benar:'Mata'} },
      { en:{q:'What is "telinga" in English?',o:['Ear','Eye','Nose','Hand'],benar:'Ear'},
        id:{q:'Apa arti "ear"?',o:['Telinga','Mata','Hidung','Tangan'],benar:'Telinga'} },
      { en:{q:'What do I clap with?',o:['Hands','Nose','Eyes','Ears'],benar:'Hands'},
        id:{q:'Aku bertepuk dengan apa?',o:['Tangan','Hidung','Mata','Telinga'],benar:'Tangan'} }
    ]
  },
  {
    id: 'warna-warni',
    judul: 'Colors Everywhere',
    judulId: 'Warna di Mana-mana',
    emoji: '🌈',
    halaman: [
      { em:'🔴', en:'The apple is red.',     id:'Apelnya merah.' },
      { em:'🟡', en:'The banana is yellow.', id:'Pisangnya kuning.' },
      { em:'🟢', en:'The leaf is green.',    id:'Daunnya hijau.' },
      { em:'🔵', en:'The sky is blue.',      id:'Langitnya biru.' },
      { em:'🌈', en:'I love colors!',        id:'Aku suka warna!' }
    ],
    kata: ['colors:red','colors:yellow','colors:green','colors:blue'],
    soal: [
      { en:{q:'What color is the banana?',o:['Yellow','Red','Blue','Green'],benar:'Yellow'},
        id:{q:'Pisangnya berwarna apa?',o:['Kuning','Merah','Biru','Hijau'],benar:'Kuning'} },
      { en:{q:'What is "biru" in English?',o:['Blue','Red','Green','Yellow'],benar:'Blue'},
        id:{q:'Apa arti "blue"?',o:['Biru','Merah','Hijau','Kuning'],benar:'Biru'} },
      { en:{q:'What is green?',o:['Leaf','Apple','Sky','Banana'],benar:'Leaf'},
        id:{q:'Apa yang berwarna hijau?',o:['Daun','Apel','Langit','Pisang'],benar:'Daun'} }
    ]
  },
  {
    id: 'kelinci-kecil',
    judul: 'The Little Rabbit',
    judulId: 'Kelinci Kecil',
    emoji: '🐰',
    halaman: [
      { em:'🐰', en:'This is a rabbit.',       id:'Ini seekor kelinci.' },
      { em:'🥕', en:'The rabbit likes carrot.', id:'Kelinci suka wortel.' },
      { em:'🐦', en:'A bird sings a song.',     id:'Burung menyanyikan lagu.' },
      { em:'🌸', en:'They play in the garden.', id:'Mereka bermain di taman.' },
      { em:'😊', en:'What a happy day!',        id:'Hari yang menyenangkan!' }
    ],
    kata: ['animals:rabbit','food:carrot','animals:bird'],
    soal: [
      { en:{q:'What does the rabbit like?',o:['Carrot','Cake','Bread','Rice'],benar:'Carrot'},
        id:{q:'Kelinci suka apa?',o:['Wortel','Kue','Roti','Nasi'],benar:'Wortel'} },
      { en:{q:'What is "burung" in English?',o:['Bird','Rabbit','Fish','Frog'],benar:'Bird'},
        id:{q:'Apa arti "bird"?',o:['Burung','Kelinci','Ikan','Katak'],benar:'Burung'} },
      { en:{q:'Where do they play?',o:['Garden','School','Home','Farm'],benar:'Garden'},
        id:{q:'Mereka bermain di mana?',o:['Taman','Sekolah','Rumah','Peternakan'],benar:'Taman'} }
    ]
  },
  {
    id: 'sarapan',
    judul: 'My Breakfast',
    judulId: 'Sarapanku',
    emoji: '🍞',
    halaman: [
      { em:'🍞', en:'I eat bread.',           id:'Aku makan roti.' },
      { em:'🥚', en:'I eat an egg.',          id:'Aku makan telur.' },
      { em:'🍚', en:'Father eats rice.',      id:'Ayah makan nasi.' },
      { em:'🍊', en:'We drink orange juice.', id:'Kami minum jus jeruk.' },
      { em:'😋', en:'Breakfast is ready!',    id:'Sarapan sudah siap!' }
    ],
    kata: ['food:bread','food:egg','food:rice','food:orange'],
    soal: [
      { en:{q:'What does Father eat?',o:['Rice','Bread','Cake','Egg'],benar:'Rice'},
        id:{q:'Ayah makan apa?',o:['Nasi','Roti','Kue','Telur'],benar:'Nasi'} },
      { en:{q:'What is "telur" in English?',o:['Egg','Bread','Rice','Milk'],benar:'Egg'},
        id:{q:'Apa arti "egg"?',o:['Telur','Roti','Nasi','Susu'],benar:'Telur'} },
      { en:{q:'What do we drink?',o:['Orange juice','Milk','Water','Tea'],benar:'Orange juice'},
        id:{q:'Kami minum apa?',o:['Jus jeruk','Susu','Air','Teh'],benar:'Jus jeruk'} }
    ]
  },
  {
    id: 'di-hutan',
    judul: 'In the Jungle',
    judulId: 'Di Hutan',
    emoji: '🦁',
    halaman: [
      { em:'🦁', en:'The lion is big.',        id:'Singa itu besar.' },
      { em:'🐘', en:'The elephant is bigger.', id:'Gajah lebih besar.' },
      { em:'🐵', en:'A monkey climbs a tree.', id:'Monyet memanjat pohon.' },
      { em:'🐦', en:'A bird flies high.',      id:'Burung terbang tinggi.' },
      { em:'🌳', en:'The jungle is alive!',    id:'Hutannya ramai!' }
    ],
    kata: ['animals:lion','animals:elephant','animals:monkey','animals:bird'],
    soal: [
      { en:{q:'Which animal is bigger?',o:['Elephant','Lion','Monkey','Bird'],benar:'Elephant'},
        id:{q:'Hewan mana yang lebih besar?',o:['Gajah','Singa','Monyet','Burung'],benar:'Gajah'} },
      { en:{q:'What is "monyet" in English?',o:['Monkey','Lion','Elephant','Bird'],benar:'Monkey'},
        id:{q:'Apa arti "monkey"?',o:['Monyet','Singa','Gajah','Burung'],benar:'Monyet'} },
      { en:{q:'What does the monkey climb?',o:['Tree','Rock','House','Car'],benar:'Tree'},
        id:{q:'Monyet memanjat apa?',o:['Pohon','Batu','Rumah','Mobil'],benar:'Pohon'} }
    ]
  },
  {
    id: 'waktu-menggambar',
    judul: 'Drawing Time',
    judulId: 'Waktunya Menggambar',
    emoji: '🖍️',
    halaman: [
      { em:'🖍️', en:'I take my crayon.',   id:'Aku mengambil krayon.' },
      { em:'📖', en:'I open my notebook.',  id:'Aku membuka buku tulis.' },
      { em:'🌈', en:'I draw a rainbow.',    id:'Aku menggambar pelangi.' },
      { em:'🧽', en:'I use an eraser.',     id:'Aku memakai penghapus.' },
      { em:'🎨', en:'My drawing is done!',  id:'Gambarku selesai!' }
    ],
    kata: ['school:crayon','school:notebook','school:eraser'],
    soal: [
      { en:{q:'What do I draw?',o:['Rainbow','House','Cat','Tree'],benar:'Rainbow'},
        id:{q:'Aku menggambar apa?',o:['Pelangi','Rumah','Kucing','Pohon'],benar:'Pelangi'} },
      { en:{q:'What is "penghapus" in English?',o:['Eraser','Crayon','Ruler','Book'],benar:'Eraser'},
        id:{q:'Apa arti "eraser"?',o:['Penghapus','Krayon','Penggaris','Buku'],benar:'Penghapus'} },
      { en:{q:'What do I open?',o:['Notebook','Door','Bag','Box'],benar:'Notebook'},
        id:{q:'Aku membuka apa?',o:['Buku tulis','Pintu','Tas','Kotak'],benar:'Buku tulis'} }
    ]
  },
  {
    id: 'camilan-manis',
    judul: 'Sweet Snacks',
    judulId: 'Camilan Manis',
    emoji: '🍰',
    halaman: [
      { em:'🍰', en:'Mother makes a cake.',       id:'Ibu membuat kue.' },
      { em:'🍓', en:'I put strawberry on top.',   id:'Aku menaruh stroberi di atas.' },
      { em:'🍦', en:'My sister wants ice cream.', id:'Adik mau es krim.' },
      { em:'🍇', en:'We share grapes too.',       id:'Kami juga berbagi anggur.' },
      { em:'😋', en:'Everything is sweet!',       id:'Semuanya manis!' }
    ],
    kata: ['food:cake','food:strawberry','food:ice-cream','food:grapes'],
    soal: [
      { en:{q:'Who makes the cake?',o:['Mother','Father','Sister','Brother'],benar:'Mother'},
        id:{q:'Siapa yang membuat kue?',o:['Ibu','Ayah','Adik','Kakak'],benar:'Ibu'} },
      { en:{q:'What is "es krim" in English?',o:['Ice cream','Cake','Grapes','Milk'],benar:'Ice cream'},
        id:{q:'Apa arti "ice cream"?',o:['Es krim','Kue','Anggur','Susu'],benar:'Es krim'} },
      { en:{q:'What is on top of the cake?',o:['Strawberry','Grapes','Egg','Rice'],benar:'Strawberry'},
        id:{q:'Apa yang ada di atas kue?',o:['Stroberi','Anggur','Telur','Nasi'],benar:'Stroberi'} }
    ]
  },
  {
    id: 'sikat-gigi',
    judul: 'Brush Your Teeth',
    judulId: 'Sikat Gigi',
    emoji: '🦷',
    halaman: [
      { em:'🦷', en:'I brush my tooth.',      id:'Aku menyikat gigi.' },
      { em:'👄', en:'I open my mouth wide.',  id:'Aku membuka mulut lebar.' },
      { em:'💇', en:'Then I comb my hair.',   id:'Lalu aku menyisir rambut.' },
      { em:'🦶', en:'I wash my foot too.',    id:'Aku juga mencuci kaki.' },
      { em:'✨', en:'Now I am clean!',        id:'Sekarang aku bersih!' }
    ],
    kata: ['body:tooth','body:mouth','body:hair','body:foot'],
    soal: [
      { en:{q:'What do I brush?',o:['Tooth','Hair','Foot','Hand'],benar:'Tooth'},
        id:{q:'Aku menyikat apa?',o:['Gigi','Rambut','Kaki','Tangan'],benar:'Gigi'} },
      { en:{q:'What is "rambut" in English?',o:['Hair','Tooth','Mouth','Foot'],benar:'Hair'},
        id:{q:'Apa arti "hair"?',o:['Rambut','Gigi','Mulut','Kaki'],benar:'Rambut'} },
      { en:{q:'What do I wash?',o:['Foot','Tooth','Hair','Mouth'],benar:'Foot'},
        id:{q:'Aku mencuci apa?',o:['Kaki','Gigi','Rambut','Mulut'],benar:'Kaki'} }
    ]
  }
];

// Menyiapkan satu cerita untuk dimainkan: opsi jawaban diacak supaya jawaban
// benar tidak selalu di posisi pertama (anak cepat sekali menghafal posisi).
// Memakai acakUbin() — Fisher-Yates dari eng.js, BUKAN sort(Math.random()-.5)
// yang untuk 4 elemen sering mengembalikan urutan asli.
//
// Sejak v5.10 tiap soal punya DUA versi: `id` (Bahasa Indonesia) dan `en`
// (English). Anak memilih bahasanya sebelum kuis dimulai. Keduanya disiapkan
// sekaligus supaya berpindah bahasa tidak perlu membuat ulang apa pun.
function siapkanSoal(s){
  var o = (typeof acakUbin==='function') ? acakUbin(s.o) : s.o.slice();
  return { q:s.q, o:o, a:o.indexOf(s.benar), benar:s.benar };
}
function siapkanCerita(st){
  return {
    id: st.id, judul: st.judul, judulId: st.judulId,
    emoji: st.emoji, halaman: st.halaman, kata: st.kata,
    soal: st.soal.map(function(s){
      return { id: siapkanSoal(s.id), en: siapkanSoal(s.en) };
    })
  };
}

// Label bahasa — dipakai layar pemilihan & penunjuk saat kuis berjalan.
var STORY_BAHASA = {
  id: { nama:'Bahasa Indonesia', pendek:'Indonesia', tanya:'Soal pakai bahasa apa?' },
  en: { nama:'English',          pendek:'English',   tanya:'Choose the question language' }
};

// Cerita yang paling berguna dibaca sekarang: yang paling banyak memuat kata
// jatuh tempo. Kalau tidak ada catatan sama sekali (anak baru mulai), ambil
// yang pertama belum pernah dibaca.
function pilihCerita(dibaca, kataPerlu){
  var perlu = {};
  (kataPerlu||[]).forEach(function(k){ perlu[k.wordId] = 1; });

  var terbaik = null, skorTerbaik = -1;
  for(var i=0;i<STORIES.length;i++){
    var st = STORIES[i];
    var skor = 0;
    st.kata.forEach(function(w){ if(perlu[w]) skor += 10; });
    if(!(dibaca||{})[st.id]) skor += 1;      // sedikit lebih disukai kalau belum dibaca
    if(skor > skorTerbaik){ skorTerbaik = skor; terbaik = st; }
  }
  return siapkanCerita(terbaik || STORIES[0]);
}

var STORY_JUMLAH = STORIES.length;

// Berapa cerita yang DITAWARKAN sekaligus. Banknya boleh terus bertambah,
// tapi yang tampil tetap 5 — layar penuh pilihan justru membuat anak lama
// memilih dan akhirnya tidak membaca apa pun.
var STORY_TAMPIL = 5;

// Memilih 5 cerita untuk ditawarkan.
// Diacak dulu (Fisher-Yates), BARU diurutkan menurut skor — jadi cerita yang
// memuat kata jatuh tempo tetap didahulukan, tapi di antara yang skornya sama
// urutannya benar-benar acak. Tanpa pengacakan awal, urutan bank yang tetap
// membuat cerita yang sama muncul terus.
function pilihLimaCerita(dibaca, kataPerlu, jumlah){
  var perlu = {};
  (kataPerlu||[]).forEach(function(k){ perlu[k.wordId] = 1; });

  var acak = (typeof acakUbin==='function') ? acakUbin(STORIES) : STORIES.slice();
  var berskor = acak.map(function(st){
    var skor = 0;
    st.kata.forEach(function(w){ if(perlu[w]) skor += 10; });
    if(!(dibaca||{})[st.id]) skor += 1;      // belum pernah dibaca sedikit didahulukan
    return { st:st, skor:skor };
  });
  berskor.sort(function(a,b){ return b.skor - a.skor; });

  return berskor.slice(0, jumlah || STORY_TAMPIL).map(function(x){
    return { st:x.st, perluDiulang:x.skor>=10, sudahDibaca:!!(dibaca||{})[x.st.id] };
  });
}

function ceritaBerId(id){
  for(var i=0;i<STORIES.length;i++) if(STORIES[i].id===id) return STORIES[i];
  return null;
}
