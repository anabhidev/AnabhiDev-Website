// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Math Adventure
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████████  BANK SOAL — MATH ADVENTURE  ██████████
// ══════════════════════════════════════════════════════════

// ── 1. URUTAN ANGKA (isi yang hilang) ──
function genSeqBank(){
  const r=[];
  for(let i=0;i<40;i++){
    const step=Math.floor(Math.random()*3)+1; // step 1, 2, atau 3
    const start=Math.floor(Math.random()*20)+1;
    // 5 angka, dan KELIMANYA ditampilkan. Sebelumnya dibuat 6 angka tapi
    // renderQ hanya menampilkan 5 (slice(0,5)) — kalau blank jatuh di indeks 5,
    // kotak kosongnya tidak pernah muncul dan anak harus menebak angka yang
    // tidak terlihat sama sekali (±20% soal urutan).
    const len=5; // contoh: 2,4,6,8,10
    const seq=Array.from({length:len},(_,k)=>start+k*step);
    // blank di posisi 1-4 (bukan angka pertama), selalu dalam jangkauan tampilan
    const blankIdx=Math.floor(Math.random()*(len-1))+1;
    const ans=seq[blankIdx];
    // wrong options pakai kelipatan step agar masuk akal tapi salah
    const wrong=new Set();
    const deltas=[-step*2,-step,step,step*2,step*3,-step*3];
    let di=0;
    while(wrong.size<3){
      const v=ans+deltas[di%deltas.length];
      di++;
      if(v>0&&v!==ans)wrong.add(v);
    }
    const opts=[ans,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'seq',seq,blankIdx,o:opts.map(String),a:opts.indexOf(ans),step});
  }
  return r;
}

// ── 2. LEBIH BESAR / KECIL (80% ratusan, 20% ribuan, distribusi merata) ──
function genCmpBank(){
  const r=[];
  const makeNum=()=>Math.random()<0.8
    ? Math.floor(Math.random()*900)+100    // 100–999 ratusan
    : Math.floor(Math.random()*9000)+1000; // 1000–9999 ribuan

  // 14 soal < : ambil 2 angka, sort ascending, pastikan beda
  for(let i=0;i<14;i++){
    let a=makeNum(), b=makeNum();
    while(a===b) b=makeNum();
    if(a>b){const t=a;a=b;b=t;} // a pasti < b
    r.push({t:'cmp',a,b,correct:'<',o:['<','>','='],ans:0});
  }
  // 14 soal > : ambil 2 angka, sort descending, pastikan beda
  for(let i=0;i<14;i++){
    let a=makeNum(), b=makeNum();
    while(a===b) b=makeNum();
    if(a<b){const t=a;a=b;b=t;} // a pasti > b
    r.push({t:'cmp',a,b,correct:'>',o:['<','>','='],ans:1});
  }
  // 14 soal = : a dan b sama persis
  for(let i=0;i<14;i++){
    const a=makeNum();
    r.push({t:'cmp',a,b:a,correct:'=',o:['<','>','='],ans:2});
  }
  return r.sort(()=>Math.random()-.5);
}

// ── 3. PENJUMLAHAN VISUAL (buah + buah) ──
const FRUITS=[
  ['🍎','apel'],['🍌','pisang'],['🍇','anggur'],['🍓','stroberi'],
  ['🍊','jeruk'],['🍋','lemon'],['🍑','persik'],['🥭','mangga'],
  ['🍍','nanas'],['🍒','ceri'],['🫐','bluberi'],['🥝','kiwi'],
  ['🍉','semangka'],['🍈','melon'],['🍐','pir'],
];
function genAddVisBank(){
  const r=[];
  for(let i=0;i<30;i++){
    const [em,lbl]=FRUITS[Math.floor(Math.random()*FRUITS.length)];
    const a=Math.floor(Math.random()*10)+1;
    const b=Math.floor(Math.random()*10)+1;
    const ans=a+b;
    const wrong=new Set();
    while(wrong.size<3){const v=ans+Math.floor(Math.random()*7)-3;if(v>0&&v!==ans)wrong.add(v);}
    const opts=[ans,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'addvis',em,lbl,a,b,ans,o:opts.map(String),idx:opts.indexOf(ans)});
  }
  return r;
}

// ── 4. PENGURANGAN VISUAL (buah - buah) ──
function genSubVisBank(){
  const r=[];
  for(let i=0;i<30;i++){
    const [em,lbl]=FRUITS[Math.floor(Math.random()*FRUITS.length)];
    const total=Math.floor(Math.random()*10)+2;
    const sub=Math.floor(Math.random()*(total-1))+1;
    const ans=total-sub;
    const wrong=new Set();
    while(wrong.size<3){const v=ans+Math.floor(Math.random()*6)-3;if(v>=0&&v!==ans)wrong.add(v);}
    const opts=[ans,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'subvis',em,lbl,total,sub,ans,o:opts.map(String),idx:opts.indexOf(ans)});
  }
  return r;
}

// ── 5. OPERASI + - × (max 100+100, max 10×10) ──
function genMathOpsBank(){
  const r=[];
  // Penjumlahan max 100+100
  for(let i=0;i<20;i++){
    const a=Math.floor(Math.random()*100)+1,b=Math.floor(Math.random()*100)+1,ans=a+b;
    const wrong=new Set();while(wrong.size<3){const v=ans+Math.floor(Math.random()*12)-6;if(v>0&&v!==ans)wrong.add(v);}
    const opts=[ans,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'ops',op:'+',q:`${a} + ${b} = ?`,ans,o:opts.map(String),a:opts.indexOf(ans)});
  }
  // Pengurangan max 100
  for(let i=0;i<20;i++){
    const a=Math.floor(Math.random()*100)+2,b=Math.floor(Math.random()*(a-1))+1,ans=a-b;
    const wrong=new Set();while(wrong.size<3){const v=ans+Math.floor(Math.random()*12)-6;if(v>=0&&v!==ans)wrong.add(v);}
    const opts=[ans,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'ops',op:'-',q:`${a} - ${b} = ?`,ans,o:opts.map(String),a:opts.indexOf(ans)});
  }
  // Perkalian max 10×10
  for(let i=0;i<20;i++){
    const a=Math.floor(Math.random()*10)+1,b=Math.floor(Math.random()*10)+1,ans=a*b;
    const wrong=new Set();while(wrong.size<3){const v=ans+Math.floor(Math.random()*11)-5;if(v>0&&v!==ans)wrong.add(v);}
    const opts=[ans,...[...wrong]].sort(()=>Math.random()-.5);
    r.push({t:'ops',op:'×',q:`${a} × ${b} = ?`,ans,o:opts.map(String),a:opts.indexOf(ans)});
  }
  return r.sort(()=>Math.random()-.5);
}

function buildMathBank(n){
  const seq  = genSeqBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.2));
  const cmp  = genCmpBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.2));
  const addv = genAddVisBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.2));
  const subv = genSubVisBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.15));
  const ops  = genMathOpsBank().sort(()=>Math.random()-.5).slice(0,Math.ceil(n*0.25));
  const all  = [...seq,...cmp,...addv,...subv,...ops].sort(()=>Math.random()-.5);
  return all.slice(0,n);
}
