// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Layar hasil, streak & tipe soal
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 7 September 2026, 18:05:44
// ================================================================

// ══════════════════════════════════════
// FINISH
// ══════════════════════════════════════
function finishGame(){
  S.active=false;setGuard(false);
  const elapsed=Math.floor((Date.now()-S.startTime)/1000);
  const dur=`${Math.floor(elapsed/60)} menit ${elapsed%60} detik`;
  const correct=S.results.filter(Boolean).length;
  const wrong=S.qCount-correct;
  const acc=Math.round(correct/S.qCount*100);
  const stars=acc>=90?'⭐⭐⭐':acc>=70?'⭐⭐':acc>=50?'⭐':'';
  const streak=getStreak(S.player);
  const pd=PDATA[S.player];
  const maxPoin=maxScore(S.qCount);

  setPhoto(document.getElementById('rcPhoto'),pd);
  document.getElementById('rcName').textContent=pd.name;
  document.getElementById('rcScore').textContent=S.score;
  document.getElementById('rcScore').style.color=S.player==='ana'?'var(--ana)':'var(--abhi)';
  document.getElementById('rcAcc').textContent=`🎯 Akurasi: ${acc}% (max ${maxPoin} poin)`;
  document.getElementById('rcStars').textContent=stars||'💪';
  document.getElementById('rcStreak').textContent=`🔥 ${streak} hari berturut-turut`;

  // Stat boxes
  const statRow=document.getElementById('statRow');
  statRow.innerHTML=`
    <div class="stat-box"><div class="sv" style="color:#6BCB77">${correct}</div><div class="sk">✅ Benar</div></div>
    <div class="stat-box"><div class="sv" style="color:#FF4444">${wrong}</div><div class="sk">❌ Salah</div></div>
    ${Object.entries(S.statDetail).map(([k,v])=>`
    <div class="stat-box"><div class="sv">${v.ok}/${v.tot}</div><div class="sk">${typeName(k)}</div></div>`).join('')}
  `;

  document.getElementById('progFill').style.width='100%';
  document.getElementById('finTime').textContent=dur;
  showScr('s-finish');

  // Riwayat & penguasaan (Phase 3). Sengaja dipanggil SETELAH layar hasil
  // tampil dan TANPA ditunggu — kalau IndexedDB lambat atau tidak ada, anak
  // tidak boleh ikut menunggu. Kegagalannya ditelan di dalam catatSesi().
  try{ if(typeof catatSesi==='function') catatSesi({akurasi:acc}); }catch(e){}

  sendGAS(dur,streak,acc,correct,wrong);
  // Versi baru SENGAJA tidak dipasang di sini. Layar hasil baru saja muncul —
  // memuat ulang sekarang akan menghapus skor yang belum sempat dilihat anak.
  // Ditunda sampai kembali ke layar awal (playAgain), tempat memuat ulang
  // tidak terlihat sama sekali.
}

function typeName(t){
  const m={seq:'🔢 Urutan',cmp:'⚖️ Banding',addvis:'➕ Jumlah',subvis:'➖ Kurang',ops:'🔢 Hitung',shape:'🔷 Bentuk',letter:'🔤 Huruf',odd:'🧩 Odd Out',clock:'🕐 Jam',ketik:'✍️ Menyalin',bing:'🦉 B.Inggris',shadow:'🌑 Siluet',spell:'🔤 Susun Huruf',build:'📝 Susun Kalimat',sains:'🔬 Sains',seni:'🎨 Seni',logika:'🧩 Logika'};
  return m[t]||t;
}

// ══════════════════════════════════════
// STREAK
// ══════════════════════════════════════
function getStreak(player){
  try{
    const key=`streak_anabhi2_${player}`;
    const data=JSON.parse(localStorage.getItem(key)||'{"lastDate":"","count":0}');
    const today=new Date().toISOString().slice(0,10);
    const yesterday=new Date(Date.now()-86400000).toISOString().slice(0,10);
    let count=1;
    if(data.lastDate===today){count=data.count;}
    else if(data.lastDate===yesterday){count=data.count+1;}
    localStorage.setItem(key,JSON.stringify({lastDate:today,count}));
    return count;
  }catch(e){return 1;}
}
