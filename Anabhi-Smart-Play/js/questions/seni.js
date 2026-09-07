// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Seni & Kreativitas
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████████  BANK SOAL — SENI & KREATIVITAS (PG)  ██████████
// ══════════════════════════════════════════════════════════
// 1. Warna campuran
const SENI_WARNA=[
  {q:'🔴 Merah + 🟡 Kuning = ?',ans:'Oranye',opts:['Oranye','Hijau','Ungu','Coklat']},
  {q:'🔵 Biru + 🟡 Kuning = ?',ans:'Hijau',opts:['Hijau','Oranye','Merah Muda','Abu-abu']},
  {q:'🔴 Merah + 🔵 Biru = ?',ans:'Ungu',opts:['Ungu','Oranye','Coklat','Hijau']},
  {q:'⚪ Putih + ⚫ Hitam = ?',ans:'Abu-abu',opts:['Abu-abu','Coklat','Ungu','Biru']},
  {q:'🔴 Merah + ⚪ Putih = ?',ans:'Merah Muda',opts:['Merah Muda','Oranye','Ungu','Kuning']},
  {q:'🟠 Oranye + 🔴 Merah = ?',ans:'Merah Oranye',opts:['Merah Oranye','Ungu','Hijau','Coklat']},
  {q:'🔵 Biru + ⚫ Hitam = ?',ans:'Biru Tua',opts:['Biru Tua','Ungu','Hijau Tua','Abu-abu']},
  {q:'🟡 Kuning + ⚪ Putih = ?',ans:'Krem',opts:['Krem','Oranye','Hijau Muda','Abu-abu']},
  {q:'🔴 Merah + 🟠 Oranye + 🟡 Kuning = warna apa?',ans:'Warna Hangat',opts:['Warna Hangat','Warna Dingin','Warna Gelap','Warna Netral']},
  {q:'🔵 Biru + 🟢 Hijau + 🟣 Ungu = warna apa?',ans:'Warna Dingin',opts:['Warna Dingin','Warna Hangat','Warna Cerah','Warna Netral']},
];
// 2. Instrumen musik
const SENI_MUSIK=[
  {e:'🎸',q:'Alat musik ini dimainkan dengan cara?',ans:'Dipetik',opts:['Dipetik','Ditiup','Dipukul','Digesek']},
  {e:'🥁',q:'Alat musik ini dimainkan dengan cara?',ans:'Dipukul',opts:['Dipukul','Dipetik','Ditiup','Digesek']},
  {e:'🎺',q:'Alat musik ini dimainkan dengan cara?',ans:'Ditiup',opts:['Ditiup','Dipukul','Dipetik','Digesek']},
  {e:'🎹',q:'Alat musik ini dimainkan dengan cara?',ans:'Ditekan',opts:['Ditekan','Ditiup','Dipukul','Dipetik']},
  {e:'🎻',q:'Alat musik ini dimainkan dengan cara?',ans:'Digesek',opts:['Digesek','Dipetik','Ditiup','Dipukul']},
  {e:'🎷',q:'Alat musik ini dimainkan dengan cara?',ans:'Ditiup',opts:['Ditiup','Dipukul','Dipetik','Digesek']},
  {e:'🪘',q:'Alat musik ini termasuk kelompok?',ans:'Perkusi',opts:['Perkusi','Petik','Tiup','Gesek']},
  {e:'🎸',q:'Gitar termasuk kelompok alat musik?',ans:'Petik',opts:['Petik','Tiup','Perkusi','Gesek']},
  {e:'🎺',q:'Terompet termasuk kelompok alat musik?',ans:'Tiup',opts:['Tiup','Petik','Perkusi','Gesek']},
  {e:'🎻',q:'Biola termasuk kelompok alat musik?',ans:'Gesek',opts:['Gesek','Petik','Tiup','Perkusi']},
];
// 3. Jenis seni
const SENI_JENIS=[
  {q:'🖼️ Membuat gambar di kanvas disebut?',ans:'Melukis',opts:['Melukis','Menari','Memahat','Bernyanyi']},
  {q:'🗿 Membuat karya dari tanah liat disebut?',ans:'Memahat / Membentuk',opts:['Memahat / Membentuk','Melukis','Menari','Bernyanyi']},
  {q:'💃 Menggerakkan tubuh mengikuti irama disebut?',ans:'Menari',opts:['Menari','Melukis','Memahat','Bermain musik']},
  {q:'🎭 Seni yang memperagakan cerita di atas panggung disebut?',ans:'Teater',opts:['Teater','Melukis','Menari','Patung']},
  {q:'✏️ Membuat gambar dengan pensil atau pena disebut?',ans:'Menggambar',opts:['Menggambar','Melukis','Menari','Memahat']},
  {q:'📸 Mengambil gambar dengan kamera disebut?',ans:'Fotografi',opts:['Fotografi','Melukis','Menari','Teater']},
  {q:'🎶 Seni yang menggunakan suara dan nada disebut?',ans:'Musik',opts:['Musik','Tari','Lukis','Patung']},
  {q:'🖌️ Alat yang digunakan untuk melukis adalah?',ans:'Kuas',opts:['Kuas','Pensil','Gunting','Penggaris']},
  {q:'🎨 Warna primer (dasar) yang TIDAK bisa dibuat dari warna lain?',ans:'Merah, Biru, Kuning',opts:['Merah, Biru, Kuning','Hijau, Oranye, Ungu','Merah, Hijau, Biru','Kuning, Ungu, Oranye']},
  {q:'🖼️ Seni membuat gambar indah di atas kertas atau kanvas disebut?',ans:'Seni Rupa',opts:['Seni Rupa','Seni Musik','Seni Tari','Seni Teater']},
];
function genSeniBank(){
  const r=[];
  const sources=[...SENI_WARNA,...SENI_MUSIK,...SENI_JENIS];
  // Pastikan semua terwakili minimal sekali, lalu random fill sampai 100
  sources.forEach(x=>{
    const opts=[...x.opts].sort(()=>Math.random()-.5);
    const a=opts.indexOf(x.ans);
    const q=x.e?`${x.e} ${x.q}`:x.q;
    r.push({t:'seni',q,o:opts,a});
  });
  while(r.length<100){
    const src=sources[Math.floor(Math.random()*sources.length)];
    const opts=[...src.opts].sort(()=>Math.random()-.5);
    const a=opts.indexOf(src.ans);
    const q=src.e?`${src.e} ${src.q}`:src.q;
    r.push({t:'seni',q,o:opts,a});
  }
  return r.sort(()=>Math.random()-.5);
}
function buildSeniBank(n){return genSeniBank().slice(0,n);}
