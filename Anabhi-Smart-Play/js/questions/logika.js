// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Logika & Pola
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████════  BANK SOAL — LOGIKA & POLA (PG)  ══████████
// ══════════════════════════════════════════════════════════
// 1. Lanjutkan pola emoji
const LOGIKA_POLA=[
  {seq:['🔴','🔵','🔴','🔵','🔴'],ans:'🔵',wrong:['🟡','🟢','🟣']},
  {seq:['⭐','🌙','⭐','🌙','⭐'],ans:'🌙',wrong:['☀️','🌟','💫']},
  {seq:['🐱','🐶','🐱','🐶','🐱'],ans:'🐶',wrong:['🐸','🐰','🐻']},
  {seq:['🍎','🍌','🍎','🍌','🍎'],ans:'🍌',wrong:['🍊','🍇','🍓']},
  {seq:['🔺','🔷','🔺','🔷','🔺'],ans:'🔷',wrong:['⭐','🔴','🟡']},
  {seq:['🌸','🌻','🌸','🌻','🌸'],ans:'🌻',wrong:['🌹','🌼','🌺']},
  {seq:['🚗','✈️','🚗','✈️','🚗'],ans:'✈️',wrong:['🚂','🚲','🛸']},
  {seq:['☀️','🌧️','☀️','🌧️','☀️'],ans:'🌧️',wrong:['⛄','🌈','🌪️']},
  {seq:['🔴','🔴','🔵','🔴','🔴'],ans:'🔵',wrong:['🟡','🟢','🟣']},
  {seq:['🐸','🐸','🐸','🦊','🐸'],ans:'🦊',wrong:['🐶','🐱','🐻']},
  {seq:['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣'],ans:'6️⃣',wrong:['7️⃣','8️⃣','9️⃣']},
  {seq:['🌕','🌖','🌗','🌘','🌑'],ans:'🌒',wrong:['🌙','⭐','☀️']},
  {seq:['🟥','🟧','🟨','🟩','🟦'],ans:'🟪',wrong:['⬜','⬛','🔲']}, // dulu jawabannya 🟣 (bulat) padahal deretnya kotak
  {seq:['🐣','🐥','🐔','🐣','🐥'],ans:'🐔',wrong:['🦆','🦅','🐧']},
  {seq:['❄️','🔥','❄️','🔥','❄️'],ans:'🔥',wrong:['💧','🌊','🌪️']},
];
// 2. Mana yang lebih banyak (counting visual)
const LOGIKA_BANYAK=[
  {a:'🍎🍎🍎',b:'🍎🍎',q:'Mana yang lebih banyak?',ans:'A (kiri)',opts:['A (kiri)','B (kanan)','Sama banyak']},
  {a:'⭐⭐',b:'⭐⭐⭐⭐',q:'Mana yang lebih sedikit?',ans:'A (kiri)',opts:['A (kiri)','B (kanan)','Sama banyak']},
  {a:'🐱🐱🐱🐱',b:'🐱🐱🐱🐱',q:'Apakah jumlahnya sama?',ans:'Ya, sama',opts:['Ya, sama','A lebih banyak','B lebih banyak','Berbeda']},
  {a:'🌸🌸🌸',b:'🌸🌸🌸🌸🌸',q:'Mana yang lebih banyak?',ans:'B (kanan)',opts:['A (kiri)','B (kanan)','Sama banyak']},
  {a:'🍌🍌',b:'🍌🍌',q:'Apakah jumlahnya sama?',ans:'Ya, sama',opts:['Ya, sama','A lebih banyak','B lebih banyak','Berbeda']},
  {a:'🔵🔵🔵🔵🔵',b:'🔵🔵🔵',q:'Mana yang lebih banyak?',ans:'A (kiri)',opts:['A (kiri)','B (kanan)','Sama banyak']},
  {a:'🌟🌟',b:'🌟🌟🌟🌟🌟',q:'Mana yang lebih banyak?',ans:'B (kanan)',opts:['A (kiri)','B (kanan)','Sama banyak']},
  {a:'🍊🍊🍊',b:'🍊🍊🍊',q:'Apakah jumlahnya sama?',ans:'Ya, sama',opts:['Ya, sama','A lebih banyak','B lebih banyak','Berbeda']},
  {a:'🐶🐶🐶🐶',b:'🐶🐶',q:'Mana yang lebih sedikit?',ans:'B (kanan)',opts:['A (kiri)','B (kanan)','Sama banyak']},
  {a:'🎈',b:'🎈🎈🎈🎈',q:'Mana yang lebih sedikit?',ans:'A (kiri)',opts:['A (kiri)','B (kanan)','Sama banyak']},
];
// 3. Klasifikasi — mana yang tidak masuk kelompok (pola logis)
const LOGIKA_KLASIF=[
  {q:'Mana yang BUKAN angka genap?',o:['2','4','5','8'],ans:'5'},
  {q:'Mana yang BUKAN angka ganjil?',o:['1','3','6','9'],ans:'6'},
  {q:'Mana yang BUKAN hari dalam seminggu?',o:['Senin','Rabu','Januari','Jumat'],ans:'Januari'},
  {q:'Mana yang BUKAN bulan dalam setahun?',o:['Januari','Minggu','Maret','Juli'],ans:'Minggu'},
  {q:'Mana yang BUKAN warna pelangi?',o:['Merah','Kuning','Coklat','Hijau'],ans:'Coklat'},
  {q:'Mana yang BUKAN anggota tubuh?',o:['Tangan','Kaki','Kursi','Hidung'],ans:'Kursi'},
  {q:'Mana yang BUKAN alat tulis?',o:['Pensil','Penggaris','Sendok','Penghapus'],ans:'Sendok'},
  {q:'Mana yang BUKAN hewan?',o:['Kucing','Pisang','Anjing','Ikan'],ans:'Pisang'},
  {q:'Mana yang BUKAN buah?',o:['Apel','Mangga','Wortel','Jeruk'],ans:'Wortel'},
  {q:'Mana yang BUKAN kendaraan?',o:['Mobil','Motor','Meja','Sepeda'],ans:'Meja'},
  {q:'3, 6, 9, 12 ... angka berikutnya?',o:['13','14','15','16'],ans:'15'},
  {q:'2, 4, 6, 8 ... angka berikutnya?',o:['9','10','11','12'],ans:'10'},
  {q:'5, 10, 15, 20 ... angka berikutnya?',o:['21','22','23','25'],ans:'25'},
  {q:'1, 3, 5, 7 ... angka berikutnya?',o:['8','9','10','11'],ans:'9'},
];
function genLogikaBank(){
  const r=[];
  // Pola emoji
  LOGIKA_POLA.forEach(p=>{
    const wrong=p.wrong.sort(()=>Math.random()-.5).slice(0,3);
    const opts=[p.ans,...wrong].sort(()=>Math.random()-.5);
    const seqStr=p.seq.join(' ') + ' ❓';
    r.push({t:'logika',q:`Apa yang melanjutkan pola ini?\n${seqStr}`,o:opts,a:opts.indexOf(p.ans)});
  });
  // Lebih banyak/sedikit
  LOGIKA_BANYAK.forEach(x=>{
    const baseOpts=x.opts;
    const opts=[...baseOpts].sort(()=>Math.random()-.5);
    r.push({t:'logika',q:`${x.q}\nA: ${x.a}   B: ${x.b}`,o:opts,a:opts.indexOf(x.ans)});
  });
  // Klasifikasi
  LOGIKA_KLASIF.forEach(x=>{
    const opts=[...x.o].sort(()=>Math.random()-.5);
    r.push({t:'logika',q:x.q,o:opts,a:opts.indexOf(x.ans)});
  });
  // Random fill sampai 100 — gabungkan semua 3 kelompok
  const allFill=[...LOGIKA_POLA,...LOGIKA_KLASIF,...LOGIKA_BANYAK];
  while(r.length<100){
    const src=allFill[Math.floor(Math.random()*allFill.length)];
    if(src.seq){
      // LOGIKA_POLA
      const wrong=src.wrong.slice().sort(()=>Math.random()-.5).slice(0,3);
      const opts=[src.ans,...wrong].sort(()=>Math.random()-.5);
      r.push({t:'logika',q:`Apa yang melanjutkan pola ini?\n${src.seq.join(' ')} ❓`,o:opts,a:opts.indexOf(src.ans)});
    } else if(src.opts){
      // LOGIKA_BANYAK
      const opts=[...src.opts].sort(()=>Math.random()-.5);
      const a=opts.indexOf(src.ans);
      r.push({t:'logika',q:`${src.q}\nA: ${src.a}   B: ${src.b}`,o:opts,a});
    } else {
      // LOGIKA_KLASIF
      const opts=[...src.o].sort(()=>Math.random()-.5);
      r.push({t:'logika',q:src.q,o:opts,a:opts.indexOf(src.ans)});
    }
  }
  return r.sort(()=>Math.random()-.5);
}
function buildLogikaBank(n){return genLogikaBank().slice(0,n);}
