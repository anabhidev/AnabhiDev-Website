// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Laporan GAS/Telegram & antrean offline
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 7 September 2026, 15:58:10
// ================================================================

// ══════════════════════════════════════
// RINGKASAN UNTUK ORANG TUA
// ══════════════════════════════════════
// Kosakata Inggris yang muncul di sesi ini beserta hasilnya. Dipakai laporan
// dan nanti jadi bahan penguasaan kata. Semua ANGKA dihitung di sini
// (deterministik) — AI tidak pernah menghitung apa pun (PRD §7).
function ringkasKosakata(){
  try{
    if(typeof vocabIdOfQuestion!=='function')return [];
    var out=[];
    for(var i=0;i<S.qBank.length&&i<S.results.length;i++){
      var id=vocabIdOfQuestion(S.qBank[i]);
      if(!id)continue;
      out.push({wordId:id,word:S.qBank[i].word,benar:!!S.results[i]});
    }
    return out;
  }catch(e){ return []; }   // laporan tidak boleh gagal gara-gara ini
}

// Penjelasan tingkat 5 (khusus orang tua) untuk soal yang dijawab SALAH.
// Dibatasi 5 entri supaya pesan Telegram tidak membengkak.
function catatanSalah(){
  try{
    if(typeof hintUntukOrangTua!=='function')return [];
    var out=[];
    for(var i=0;i<S.qBank.length&&i<S.results.length;i++){
      if(S.results[i])continue;
      var t=hintUntukOrangTua(S.qBank[i]);
      if(t&&out.indexOf(t)===-1)out.push(t);
      if(out.length>=5)break;
    }
    return out;
  }catch(e){ return []; }
}

// ══════════════════════════════════════
// SEND TELEGRAM (GAS)
// ══════════════════════════════════════
function sendGAS(dur,streak,acc,correct,wrong,retry){
  const el=document.getElementById('tgStatus');
  if(S.tgSent){el.textContent='✅ Laporan sudah terkirim!';return;}
  if(!GAS_URL||GAS_URL.includes('PASTE_URL')){
    el.textContent='⚠️ URL GAS belum diisi di kode.';el.style.color='#FFE082';return;
  }
  el.textContent='📤 Mengirim laporan ke Telegram...';el.style.color='#7EDDD8';

  const pd=PDATA[S.player];
  const appName={math:'Math Adventure',fun:'Fun Games',bindo:'Bahasa Indonesia',bing:'Bahasa Inggris',sains:'Pengetahuan Umum',seni:'Seni & Kreativitas',logika:'Logika & Pola',mix:'Mix Challenge'}[S.app];
  const poinIcon=acc>=90?'🏆':acc>=70?'🌟':acc>=50?'⭐':'💪';
  const stars=acc>=90?'⭐⭐⭐':acc>=70?'⭐⭐':acc>=50?'⭐':'';
  const motivasi=
    acc>=90?['🎉 Hebat! Mama/Papa bangga!','🚀 Luar biasa! Kamu jagoan!','🌟 Sempurna sekali hari ini!'][Math.floor(Math.random()*3)]:
    acc>=70?['😄 Bagus! Tinggal sedikit lagi!','👍 Hampir sempurna, terus semangat!','💪 Keren! Besok pasti lebih baik!'][Math.floor(Math.random()*3)]:
    acc>=50?['😊 Sudah bagus, semangat belajar lagi!','🌈 Terus berlatih ya, pasti bisa!','✨ Setiap hari semakin pintar!'][Math.floor(Math.random()*3)]:
            ['❤️ Mama/Papa sayang apapun hasilnya','🤗 Tidak apa-apa, yuk main lagi besok!','💫 Yang penting sudah berusaha!'][Math.floor(Math.random()*3)];

  const now=new Date().toLocaleString('id-ID',{timeZone:'Asia/Jakarta'});
  const detailLines=Object.entries(S.statDetail).map(([k,v])=>`${typeName(k)}: ${v.ok} / ${v.tot}`).join('\n');

  // Saran latihan (tingkat 5) — hanya muncul kalau memang ada yang salah.
  const saran=catatanSalah();
  const saranBlok=saran.length
    ? `\n💡 *Saran latihan di rumah:*\n${saran.map(s=>'• '+s).join('\n')}\n`
    : '';

  // Kosakata Inggris yang belum dikuasai sesi ini.
  const vk=ringkasKosakata().filter(v=>!v.benar).map(v=>v.word);
  const vocabBlok=vk.length
    ? `\n🦉 *Kata yang perlu diulang:* ${vk.join(', ')}\n`
    : '';

  const tgMsg=
    `🎮 *LAPORAN ANABHI SMART PLAY*\n`+
    `━━━━━━━━━━━━━━━━━━━━\n`+
    `📅 ${now}\n`+
    `🎯 Game: *${appName}*\n\n`+
    `👤 *Pemain*\n`+
    `${S.player==='ana'?'🌸':'⚡'} Nama  : *${pd.name}*\n`+
    `${poinIcon} Score : *${S.score} poin* (dari ${maxScore(S.qCount)})\n\n`+
    `📝 *HASIL*\n`+
    `━━━━━━━━━━━━━━━━━━━━\n`+
    `✅ Benar  : ${correct} / ${S.qCount}\n`+
    `❌ Salah  : ${wrong}\n`+
    `🎯 Akurasi: *${acc}%* ${stars}\n`+
    `⏱️ Durasi : ${dur}\n\n`+
    `📊 *Detail per Tipe:*\n`+
    `${detailLines}\n\n`+
    `🔥 Streak: Main *${streak} hari* berturut-turut\n`+
    vocabBlok+
    saranBlok+
    `\n📌 Session: ${S.sessionId}\n`+
    `━━━━━━━━━━━━━━━━━━━━\n`+
    `${motivasi}`;

  if(!S._payload){
    S._payload={
      sessionId:S.sessionId,tanggal:now,
      pemain:pd.name,game:appName,
      score:S.score,totalSoal:S.qCount,
      soalBenar:correct,soalSalah:wrong,akurasi:acc,
      durasi:dur,streak,tgMsg,
      detail:S.statDetail,
      log:S.results.map((ok,i)=>({soal:i+1,tipe:S.qBank[i].t,benar:ok})),
      // Kosakata yang muncul di sesi ini + benar/salahnya (Master 2 §5, §22).
      // Field BARU — GAS lama yang belum mengenalnya cukup mengabaikannya,
      // jadi aplikasi ini tetap bisa dipakai sebelum .gs diperbarui.
      vocab:ringkasKosakata(),
      // Penjelasan tingkat 5 KHUSUS ORANG TUA untuk soal yang dijawab salah.
      // Tidak pernah ditampilkan ke anak.
      catatanOrangTua:catatanSalah()
    };
  }

  // Dengan mode:'no-cors', fetch RESOLVE kalau permintaan benar-benar sampai ke
  // jaringan, dan REJECT kalau jaringannya sendiri gagal (offline). Jadi cabang
  // .catch() BUKAN "mungkin sukses" — itu benar-benar gagal kirim.
  // Sebelumnya kedua cabang sama-sama menulis "terkirim", sehingga saat tablet
  // offline orang tua diberi tahu laporan terkirim padahal hilang selamanya.
  postGAS(S._payload).then(()=>{
    S.tgSent=true;
    el.style.color='#7EDDD8';
    el.textContent='✅ Laporan terkirim ke Telegram & Spreadsheet!';
  }).catch(()=>{
    outboxAdd(S._payload);
    el.style.color='#FFE082';
    el.textContent='📴 Belum terkirim — tersimpan, otomatis dikirim saat online.';
  });
}

// ══════════════════════════════════════
// ANTREAN LAPORAN OFFLINE (outbox)
// ══════════════════════════════════════
// Phase 1 memakai localStorage supaya perubahannya kecil dan aman.
// Rencananya pindah ke IndexedDB di Phase 2 bersama riwayat sesi & mastery.
const OUTBOX_KEY='asp_outbox_v1';
const OUTBOX_MAX=40;

function postGAS(payload){
  return fetch(GAS_URL,{method:'POST',mode:'no-cors',body:JSON.stringify(payload)});
}
function outboxRead(){
  try{ const a=JSON.parse(localStorage.getItem(OUTBOX_KEY)||'[]'); return Array.isArray(a)?a:[]; }
  catch(e){ return []; }
}
function outboxWrite(arr){
  try{ localStorage.setItem(OUTBOX_KEY,JSON.stringify(arr.slice(-OUTBOX_MAX))); }catch(e){}
}
function outboxAdd(payload){
  const a=outboxRead();
  if(a.some(x=>x&&x.sessionId===payload.sessionId))return; // jangan dobel
  a.push(payload); outboxWrite(a); updateOutboxNote();
}
let outboxBusy=false;
function outboxFlush(){
  if(outboxBusy)return Promise.resolve();          // cegah dua flush tumpang tindih
  const a=outboxRead();
  if(!a.length)return Promise.resolve();
  if(navigator.onLine===false)return Promise.resolve();
  outboxBusy=true;
  const sukses=[];
  return Promise.all(a.map(p=>postGAS(p).then(()=>{sukses.push(p.sessionId);}).catch(()=>{})))
    .then(()=>{
      // 🔴 Baca ULANG sebelum menulis. Sesi baru bisa masuk antrean selama
      // pengiriman berlangsung; kalau kita menulis hasil snapshot lama, laporan
      // yang baru masuk itu ikut terhapus (bug nyata: sesi ke-2 saat offline hilang).
      // Jadi yang dibuang HANYA yang benar-benar terkirim.
      const now=outboxRead().filter(x=>x&&sukses.indexOf(x.sessionId)===-1);
      outboxWrite(now);
      outboxBusy=false;
      const terkirim=sukses.length;
      if(terkirim>0){
        const el=document.getElementById('tgStatus');
        if(el&&document.getElementById('s-finish').classList.contains('active')&&S.tgSent!==true){
          el.style.color='#7EDDD8';
          el.textContent=`✅ ${terkirim} laporan tertunda berhasil dikirim!`;
        }
      }
      updateOutboxNote();
    })
    .catch(()=>{ outboxBusy=false; });   // jangan sampai terkunci selamanya
}
// Tampilkan sisa antrean di layar awal supaya tidak ada laporan yang hilang diam-diam
function updateOutboxNote(){
  const n=outboxRead().length;
  const note=document.getElementById('pwaNote');
  if(!note)return;
  if(n>0&&!note.dataset.pwaMsg){
    note.hidden=false;
    note.innerHTML=`📴 <b>${n} laporan</b> menunggu dikirim. Akan terkirim otomatis saat ada internet.`;
    note.dataset.outbox='1';
  }else if(n===0&&note.dataset.outbox==='1'){
    note.hidden=true; note.removeAttribute('data-outbox'); note.innerHTML='';
  }
}
window.addEventListener('online',outboxFlush);
