// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Fun Games
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████████  BANK SOAL — FUN GAMES  ██████████
// ══════════════════════════════════════════════════════════

// ── 1. COCOKKAN BENTUK & WARNA ──
const SHAPES_DATA=[
  {shape:'circle',  name:'Lingkaran', color:'#FF6B6B',cname:'Merah',    svg:`<circle cx="50" cy="50" r="42" fill="#FF6B6B" stroke="white" stroke-width="3"/>`},
  {shape:'circle',  name:'Lingkaran', color:'#4ECDC4',cname:'Hijau Muda',svg:`<circle cx="50" cy="50" r="42" fill="#4ECDC4" stroke="white" stroke-width="3"/>`},
  {shape:'circle',  name:'Lingkaran', color:'#FFE66D',cname:'Kuning',   svg:`<circle cx="50" cy="50" r="42" fill="#FFE66D" stroke="white" stroke-width="3"/>`},
  {shape:'circle',  name:'Lingkaran', color:'#7C3AED',cname:'Ungu',     svg:`<circle cx="50" cy="50" r="42" fill="#7C3AED" stroke="white" stroke-width="3"/>`},
  {shape:'square',  name:'Kotak',     color:'#FF6B6B',cname:'Merah',    svg:`<rect x="8" y="8" width="84" height="84" rx="8" fill="#FF6B6B" stroke="white" stroke-width="3"/>`},
  {shape:'square',  name:'Kotak',     color:'#4ECDC4',cname:'Hijau Muda',svg:`<rect x="8" y="8" width="84" height="84" rx="8" fill="#4ECDC4" stroke="white" stroke-width="3"/>`},
  {shape:'square',  name:'Kotak',     color:'#FFE66D',cname:'Kuning',   svg:`<rect x="8" y="8" width="84" height="84" rx="8" fill="#FFE66D" stroke="white" stroke-width="3"/>`},
  {shape:'square',  name:'Kotak',     color:'#7C3AED',cname:'Ungu',     svg:`<rect x="8" y="8" width="84" height="84" rx="8" fill="#7C3AED" stroke="white" stroke-width="3"/>`},
  {shape:'triangle',name:'Segitiga',  color:'#FF6B6B',cname:'Merah',    svg:`<polygon points="50,8 92,92 8,92" fill="#FF6B6B" stroke="white" stroke-width="3"/>`},
  {shape:'triangle',name:'Segitiga',  color:'#4ECDC4',cname:'Hijau Muda',svg:`<polygon points="50,8 92,92 8,92" fill="#4ECDC4" stroke="white" stroke-width="3"/>`},
  {shape:'triangle',name:'Segitiga',  color:'#FFE66D',cname:'Kuning',   svg:`<polygon points="50,8 92,92 8,92" fill="#FFE66D" stroke="white" stroke-width="3"/>`},
  {shape:'triangle',name:'Segitiga',  color:'#7C3AED',cname:'Ungu',     svg:`<polygon points="50,8 92,92 8,92" fill="#7C3AED" stroke="white" stroke-width="3"/>`},
  {shape:'star',    name:'Bintang',   color:'#FF6B6B',cname:'Merah',    svg:`<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#FF6B6B" stroke="white" stroke-width="3"/>`},
  {shape:'star',    name:'Bintang',   color:'#FFE66D',cname:'Kuning',   svg:`<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#FFE66D" stroke="white" stroke-width="3"/>`},
  {shape:'star',    name:'Bintang',   color:'#4ECDC4',cname:'Hijau Muda',svg:`<polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill="#4ECDC4" stroke="white" stroke-width="3"/>`},
  {shape:'heart',   name:'Hati',      color:'#FF6B6B',cname:'Merah',    svg:`<path d="M50,85 C10,55 5,20 25,12 C35,8 45,15 50,25 C55,15 65,8 75,12 C95,20 90,55 50,85Z" fill="#FF6B6B" stroke="white" stroke-width="3"/>`},
  {shape:'heart',   name:'Hati',      color:'#EC4899',cname:'Pink',     svg:`<path d="M50,85 C10,55 5,20 25,12 C35,8 45,15 50,25 C55,15 65,8 75,12 C95,20 90,55 50,85Z" fill="#EC4899" stroke="white" stroke-width="3"/>`},
];

function genShapeBank(){
  const r=[];
  const shuffled=[...SHAPES_DATA].sort(()=>Math.random()-.5);
  shuffled.forEach((target,i)=>{
    // Tentukan jenis pertanyaan DULU, baru pilih pengecoh.
    // Sebelumnya pengecoh hanya disaring "beda bentuk ATAU beda warna", sehingga
    // untuk "Mana yang berbentuk Lingkaran?" bisa muncul 2 lingkaran sekaligus
    // (dan untuk soal warna, 2 benda berwarna sama) — soal jadi punya lebih dari
    // satu jawaban benar. Sekarang pengecoh dijamin TIDAK memenuhi pertanyaan.
    const qType=i%2===0?'shape':'color';
    const wrong=SHAPES_DATA.filter(s=> qType==='shape'
      ? s.shape!==target.shape
      : s.color!==target.color);
    const picked=wrong.sort(()=>Math.random()-.5).slice(0,3);
    const all=[target,...picked].sort(()=>Math.random()-.5);
    const ansIdx=all.indexOf(target);
    const qText=qType==='shape'
      ?`Mana yang berbentuk ${target.name}? ${target.name==='Lingkaran'?'⭕':target.name==='Kotak'?'⬛':target.name==='Segitiga'?'🔺':target.name==='Bintang'?'⭐':'❤️'}`
      :`Mana yang berwarna ${target.cname}?`;
    r.push({t:'shape',q:qText,items:all,a:ansIdx,target,qType});
  });
  return r;
}

// ── 2. TEBAK HURUF (huruf pertama dari gambar) ──
const LETTER_BANK=[
  {emoji:'🍎',word:'Apel',letter:'A'},
  {emoji:'🐶',word:'Anjing',letter:'A'}, // dulu keliru memakai 🐘 untuk kata "Anjing"
  {emoji:'🐘',word:'Gajah',letter:'G'},
  {emoji:'🍌',word:'Pisang',letter:'P'},
  {emoji:'🦁',word:'Singa',letter:'S'},
  {emoji:'🐬',word:'Lumba-lumba',letter:'L'},
  {emoji:'🌸',word:'Bunga',letter:'B'},
  {emoji:'🚀',word:'Roket',letter:'R'},
  {emoji:'🌙',word:'Bulan',letter:'B'},
  {emoji:'⭐',word:'Bintang',letter:'B'},
  {emoji:'🐸',word:'Katak',letter:'K'},
  {emoji:'🍕',word:'Pizza',letter:'P'},
  {emoji:'🎈',word:'Balon',letter:'B'},
  {emoji:'🦋',word:'Kupu-kupu',letter:'K'},
  {emoji:'🐧',word:'Pinguin',letter:'P'},
  {emoji:'🍓',word:'Stroberi',letter:'S'},
  {emoji:'🏠',word:'Rumah',letter:'R'},
  {emoji:'🎂',word:'Kue',letter:'K'},
  {emoji:'🚗',word:'Mobil',letter:'M'},
  {emoji:'✏️',word:'Pensil',letter:'P'},
  {emoji:'🌊',word:'Ombak',letter:'O'},
  {emoji:'🦜',word:'Burung Beo',letter:'B'},
  {emoji:'🍦',word:'Es Krim',letter:'E'},
  {emoji:'🏀',word:'Bola',letter:'B'},
  {emoji:'🌈',word:'Pelangi',letter:'P'},
  {emoji:'🐝',word:'Lebah',letter:'L'},
  {emoji:'🧁',word:'Cupcake',letter:'C'},
  {emoji:'🦊',word:'Rubah',letter:'R'},
  {emoji:'🎵',word:'Musik',letter:'M'},
  {emoji:'🌻',word:'Bunga Matahari',letter:'B'},
];
function genLetterBank(){
  const r=[];
  const shuffled=[...LETTER_BANK].sort(()=>Math.random()-.5);
  shuffled.forEach(item=>{
    const allLetters='ABCDEFGHIJKLMNOPRSTMKBL'.split('');
    const wrong=new Set();
    while(wrong.size<3){
      const l=allLetters[Math.floor(Math.random()*allLetters.length)];
      if(l!==item.letter)wrong.add(l);
    }
    const opts=[item.letter,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'letter',emoji:item.emoji,word:item.word,letter:item.letter,o:opts,a:opts.indexOf(item.letter)});
  });
  return r;
}

// ── 3. ODD ONE OUT ──
const ODD_GROUPS=[
  {group:'Hewan Laut',    members:['🐬','🐠','🦈','🐙'],odd:{e:'🦁',l:'Singa'},reason:'bukan hewan laut'},
  {group:'Buah',          members:['🍎','🍌','🍇','🍓'],odd:{e:'🥦',l:'Brokoli'},reason:'bukan buah'},
  {group:'Kendaraan',     members:['🚗','✈️','🚂','🚲'],odd:{e:'🍕',l:'Pizza'},reason:'bukan kendaraan'},
  {group:'Hewan Terbang', members:['🦅','🦋','🐝','🦜'],odd:{e:'🐸',l:'Katak'},reason:'tidak bisa terbang'},
  {group:'Warna Merah',   members:['🍎','🌹','❤️','🍓'],odd:{e:'🍌',l:'Pisang'},reason:'bukan merah'},
  {group:'Alat Tulis',    members:['✏️','🖊️','📏','📐'],odd:{e:'🎸',l:'Gitar'},reason:'bukan alat tulis'},
  {group:'Hewan Darat',   members:['🦁','🐘','🦒','🐯'],odd:{e:'🐬',l:'Lumba-lumba'},reason:'bukan hewan darat'},
  {group:'Langit Malam',  members:['🌙','⭐','🌟','☄️'],odd:{e:'🌻',l:'Bunga Matahari'},reason:'bukan di langit malam'},
  {group:'Sayuran',       members:['🥦','🥕','🧅','🌽'],odd:{e:'🍰',l:'Kue'},reason:'bukan sayuran'},
  {group:'Pakaian',       members:['👕','👖','🧢','👟'],odd:{e:'📚',l:'Buku'},reason:'bukan pakaian'},
  {group:'Alat Musik',    members:['🎸','🥁','🎹','🎺'],odd:{e:'🍕',l:'Pizza'},reason:'bukan alat musik'},
  {group:'Hewan Laut 2',  members:['🦀','🦑','🐡','🦞'],odd:{e:'🐺',l:'Serigala'},reason:'bukan hewan laut'},
  {group:'Bunga',         members:['🌸','🌺','🌼','🌻'],odd:{e:'🍎',l:'Apel'},reason:'bukan bunga'},
  {group:'Binatang Peliharaan',members:['🐱','🐶','🐹','🐰'],odd:{e:'🦁',l:'Singa'},reason:'bukan peliharaan biasa'},
  {group:'Makanan Manis', members:['🍭','🍰','🍩','🍫'],odd:{e:'🧅',l:'Bawang'},reason:'bukan makanan manis'},
  {group:'Olahraga Bola', members:['⚽','🏀','🎾','🏐'],odd:{e:'🎸',l:'Gitar'},reason:'bukan bola olahraga'},
  {group:'Benda Sekolah', members:['📚','✏️','📏','🎒'],odd:{e:'🏖️',l:'Pantai'},reason:'bukan benda sekolah'},
  {group:'Hewan Bertelur',members:['🐓','🐢','🦅','🐊'],odd:{e:'🐄',l:'Sapi'},reason:'tidak bertelur'},
  {group:'Biru/Laut',     members:['🌊','💧','🐟','🫧'],odd:{e:'🔥',l:'Api'},reason:'bukan berkaitan laut/biru'},
  {group:'Angkasa',       members:['🚀','🌙','⭐','🪐'],odd:{e:'🐸',l:'Katak'},reason:'bukan di angkasa'},
];
function genOddBank(){
  const r=[];
  ODD_GROUPS.sort(()=>Math.random()-.5).forEach(g=>{
    const members=g.members.sort(()=>Math.random()-.5).slice(0,3);
    const allItems=[
      ...members.map((e,i)=>({e,l:g.group+' '+(i+1)})),
      g.odd
    ].sort(()=>Math.random()-.5);
    const ansIdx=allItems.findIndex(x=>x.e===g.odd.e&&x.l===g.odd.l);
    r.push({t:'odd',group:g.group,items:allItems,a:ansIdx,reason:g.reason,q:`Mana yang TIDAK termasuk ${g.group}? 🤔`});
  });
  return r;
}

// ── 4. JAM (baca jam digital & analog) ──
function genClockBank(){
  const r=[];
  const hours=[1,2,3,4,5,6,7,8,9,10,11,12];
  const minutes=[0,15,30,45];
  for(let i=0;i<30;i++){
    const h=hours[Math.floor(Math.random()*hours.length)];
    const m=minutes[Math.floor(Math.random()*minutes.length)];
    const displayType=i%2===0?'digital':'analog';
    const hStr=String(h).padStart(2,'0');
    const mStr=String(m).padStart(2,'0');
    const correct=`${hStr}:${mStr}`;
    // Generate 3 wrong options
    const wrong=new Set();
    while(wrong.size<3){
      const wh=hours[Math.floor(Math.random()*hours.length)];
      const wm=minutes[Math.floor(Math.random()*minutes.length)];
      const ws=`${String(wh).padStart(2,'0')}:${String(wm).padStart(2,'0')}`;
      if(ws!==correct)wrong.add(ws);
    }
    const opts=[correct,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'clock',h,m,correct,o:opts,a:opts.indexOf(correct),displayType});
  }
  return r;
}

function buildFunBank(n){
  const shp  = genShapeBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.25));
  const let_ = genLetterBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.25));
  const odd  = genOddBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.25));
  const clk  = genClockBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.25));
  const all  = [...shp,...let_,...odd,...clk].sort(()=>Math.random()-.5);
  return all.slice(0,n);
}
