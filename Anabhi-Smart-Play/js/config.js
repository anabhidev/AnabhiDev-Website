// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Konfigurasi, data pemain & state
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 7 September 2026, 11:20:05
// ================================================================

// ╔══════════════════════════════════════╗
// ║  KONFIGURASI — GANTI DI SINI        ║
// ╚══════════════════════════════════════╝
const CONFIG = {
  APP_TITLE   : 'Anabhi Smart Play',
  APP_VERSION : '5.10',
  // Semua aset kini SELF-HOST (SOP 18.12) — jangan dikembalikan ke CDN/image host
  // pihak ketiga: gagal senyap di balik CSP dan tidak jalan offline.
  TWEMOJI_BASE: 'assets/twemoji/',
  ANA_PHOTO   : 'assets/Ana.webp',
  ABHI_PHOTO  : 'assets/Abhi.webp',
};
const GAS_URL    = 'https://script.google.com/macros/s/AKfycbzfE1IBy8YUhXm6ioauzZySjlCbwb65Q-5WbO1Yqtr4NH4We8MfSYgFkMxSpxoE8PsUfA/exec';
const ANA_PHOTO  = CONFIG.ANA_PHOTO;
const ABHI_PHOTO = CONFIG.ABHI_PHOTO;

// Poin per soal — SATU sumber kebenaran. Sebelumnya rumus ini disalin di 3
// tempat dan satu salinan di laporan Telegram memakai angka 5 yang dipatok
// mati, sehingga sesi 10 & 15 soal melaporkan skor maksimum yang salah.
function poinPerSoal(qc){ return qc === 10 ? 10 : qc === 15 ? 7 : 5; }
function maxScore(qc){ return qc * poinPerSoal(qc); }

// ══════════════════════════════════════
// PLAYER DATA
// ══════════════════════════════════════
const PDATA = {
  ana:  {name:'Anjali Kirana',  photo:ANA_PHOTO,  photo2:'assets/Ana.jpg',  tag:'🌸', wbCls:'wb-ana',  banner:'Soal untuk Ana! 🌸', pawn:'🎀'},
  abhi: {name:'Abhinaya Kenzie',photo:ABHI_PHOTO, photo2:'assets/Abhi.jpg', tag:'⚡', wbCls:'wb-abhi', banner:'Soal untuk Abhi! ⚡', pawn:'⚡'}
};

// Foto pemain berlapis: WebP -> JPEG -> emoji.
// Sebelumnya onerror hanya menyembunyikan gambar (display:none), sehingga kalau
// WebP gagal dimuat (server lokal tanpa MIME webp, dsb) kartu hasil tampil
// KOSONG tanpa foto sama sekali. Sekarang selalu ada yang tampil.
function setPhoto(img,pd){
  if(!img)return;
  img.style.display='';
  img.onerror=function(){
    if(img.dataset.fb!=='1'){ img.dataset.fb='1'; img.src=pd.photo2; return; }
    img.style.display='none';
    const badge=img.nextElementSibling;
    if(badge&&badge.classList.contains('photo-fb')){
      badge.style.display='flex';
      badge.textContent=pd.tag;
    }
  };
  img.dataset.fb='';
  img.src=pd.photo;
}

// ══════════════════════════════════════
// STATE
// ══════════════════════════════════════
const S = {
  player:null, app:null, qCount:0,
  score:0, qIdx:0, qBank:[], results:[],
  statDetail:{}, startTime:null, sessionId:'',
  active:false, tgSent:false, _payload:null
};
