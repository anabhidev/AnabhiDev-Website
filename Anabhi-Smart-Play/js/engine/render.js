// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Render soal & tangani jawaban
// Development · Anabhi Dev
// Version   : 1.2
// Generated : 8 September 2026, 06:05:12
// ================================================================

function renderQ(q){
  const area=document.getElementById('qArea');
  const pd=PDATA[S.player];

  let pillText='', qText='', bodyHtml='', optsHtml='', gridClass='opts-grid';

  if(q.t==='seq'){
    pillText='🔢 Urutan Angka';
    qText='Angka berapa yang hilang? 🤔';
    // Tampilkan SELURUH deret — kotak kosong dijamin ikut terlihat
    const seqHtml=q.seq.map((n,i)=>
      i===q.blankIdx
        ?`<div class="seq-box blank"></div>`
        :`<div class="seq-box">${n}</div>`
    ).join('');
    bodyHtml=`<div class="seq-disp">${seqHtml}</div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-num">${x}</span></button>`).join('');
  }
  else if(q.t==='cmp'){
    pillText='⚖️ Besar / Kecil';
    qText=`Pilih tanda yang tepat!`;
    bodyHtml=`<div class="cmp-disp">
      <div class="cmp-num">${q.a.toLocaleString('id')}</div>
      <div class="cmp-slot">?</div>
      <div class="cmp-num">${q.b.toLocaleString('id')}</div>
    </div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-sym">${x}</span></button>`).join('');
    gridClass='opts-grid opts-grid-3';
  }
  else if(q.t==='addvis'){
    pillText='➕ Penjumlahan';
    qText=`Ada berapa ${q.em} semuanya?`;
    bodyHtml=`<div class="visual-disp">${q.em.repeat(q.a)} <span style="font-size:1.4rem;opacity:.7">+</span> ${q.em.repeat(q.b)}</div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-num">${x}</span></button>`).join('');
  }
  else if(q.t==='subvis'){
    pillText='➖ Pengurangan';
    qText=`Ada ${q.total} ${q.em}, dimakan ${q.sub}. Sisa berapa?`;
    const remaining=q.em.repeat(q.ans);
    const removed=`<span style="opacity:.25;text-decoration:line-through">${q.em.repeat(q.sub)}</span>`;
    bodyHtml=`<div class="visual-disp">${remaining}${removed}</div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-num">${x}</span></button>`).join('');
  }
  else if(q.t==='ops'){
    const icon=q.op==='+'?'➕':q.op==='-'?'➖':'✖️';
    pillText=`${icon} Berhitung`;
    qText=q.q;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-num">${x}</span></button>`).join('');
  }
  else if(q.t==='shape'){
    pillText='🔷 Bentuk & Warna';
    qText=q.q;
    // Show target shape as hint if color question
    const hintSvg=q.qType==='color'
      ?`<div style="margin-bottom:12px;opacity:.6;font-size:.8rem">Cari warna: <span style="font-weight:800;color:${q.target.color}">${q.target.cname}</span></div>`
      :'';
    bodyHtml=hintSvg;
    optsHtml=q.items.map((item,i)=>`
      <button class="opt-btn" data-i="${i}">
        <svg class="shape-svg" viewBox="0 0 100 100">${item.svg}</svg>
        <span class="opt-label">${item.name} ${item.cname}</span>
      </button>`).join('');
    gridClass='opts-grid opts-grid-4-shape';
  }
  else if(q.t==='letter'){
    pillText='🔤 Tebak Huruf';
    qText=`Huruf pertama dari gambar ini?`;
    bodyHtml=`<div style="font-size:clamp(4rem,15vw,7rem);margin-bottom:12px;line-height:1;">${q.emoji}</div>
              <div style="font-size:.95rem;opacity:.6;margin-bottom:16px;">${q.word}</div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-sym" style="font-size:2.2rem;">${x}</span></button>`).join('');
  }
  else if(q.t==='odd'){
    pillText='🧩 Odd One Out';
    qText=q.q;
    optsHtml=q.items.map((item,i)=>`
      <button class="opt-btn" data-i="${i}">
        <span class="opt-emoji">${item.e}</span>
        <span class="opt-label">${item.l.length>12?item.l.slice(0,12)+'…':item.l}</span>
      </button>`).join('');
  }
  else if(q.t==='ketik'){
    pillText='✍️ Menyalin Kalimat';
    qText='Salin kalimat ini dengan mengetik! ⌨️';
    bodyHtml=`<div class="copy-disp">${q.sentence}</div>
      <input class="type-input" id="typeInput" type="text" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" placeholder="Ketik di sini...">
      <br><button class="check-btn" id="checkBtn">✅ Cek Jawaban</button>`;
    optsHtml=''; // tanpa pilihan ganda
  }
  else if(q.t==='bing'){
    pillText=`🦉 English — ${BING_CAT_LABEL[q.cat]}`;
    qText='What is this in English?';
    bodyHtml=`<div style="font-size:clamp(4rem,15vw,7rem);margin-bottom:16px;line-height:1;">${q.emoji}</div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-time">${x}</span></button>`).join('');
  }
  else if(q.t==='shadow'){
    pillText=`🌑 Tebak Siluet — ${BING_CAT_LABEL[q.cat]}`;
    qText='Bayangan apa ini? 🤔';
    // Siluet dibuat dengan filter CSS, BUKAN gambar terpisah — jadi tidak ada
    // satu pun berkas tambahan yang perlu di-precache untuk offline.
    bodyHtml=`<div class="shadow-disp"><span class="shadow-em">${q.emoji}</span></div>`;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-time">${x}</span></button>`).join('');
  }
  else if(q.t==='spell'){
    pillText=`🔤 Susun Huruf — ${BING_CAT_LABEL[q.cat]}`;
    qText=`Susun huruf jadi kata yang benar!`;
    bodyHtml=`
      <div style="font-size:clamp(3.4rem,12vw,5.5rem);line-height:1;margin-bottom:6px">${q.emoji}</div>
      <div class="tile-arti">${q.arti||''}</div>
      <div class="slot-row" id="slotRow">${
        q.huruf.map(()=>`<span class="slot"></span>`).join('')}</div>
      <div class="tile-row" id="tileRow">${
        q.ubin.map((h,i)=>`<button class="tile" data-t="${i}">${h}</button>`).join('')}</div>
      <button class="tile-undo" id="tileUndo">⌫ Hapus</button>`;
    optsHtml='';
  }
  else if(q.t==='build'){
    pillText=`📝 Susun Kalimat`;
    qText=`Susun jadi kalimat yang benar!`;
    bodyHtml=`
      <div style="font-size:clamp(3rem,10vw,4.6rem);line-height:1;margin-bottom:6px">${q.emoji}</div>
      <div class="slot-row slot-row-w" id="slotRow">${
        q.kalimat.map(()=>`<span class="slot slot-w"></span>`).join('')}</div>
      <div class="tile-row" id="tileRow">${
        q.ubin.map((w,i)=>`<button class="tile tile-w" data-t="${i}">${w}</button>`).join('')}</div>
      <button class="tile-undo" id="tileUndo">⌫ Hapus</button>`;
    optsHtml='';
  }
  else if(q.t==='sains'){
    pillText='🔬 Pengetahuan Umum';
    qText=q.q;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-time">${x}</span></button>`).join('');
    if(q.o.length===2)gridClass='opts-grid opts-grid-2';
    else if(q.o.length===3)gridClass='opts-grid opts-grid-3';
    // 4 opsi: default opts-grid (2 kolom) sudah center
  }
  else if(q.t==='seni'){
    pillText='🎨 Seni & Kreativitas';
    qText=q.q;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-time">${x}</span></button>`).join('');
    if(q.o.length===2)gridClass='opts-grid opts-grid-2';
    else if(q.o.length===3)gridClass='opts-grid opts-grid-3';
  }
  else if(q.t==='logika'){
    pillText='🧩 Logika & Pola';
    qText=q.q;
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-time">${x}</span></button>`).join('');
    if(q.o.length===2)gridClass='opts-grid opts-grid-2';
    else if(q.o.length===3)gridClass='opts-grid opts-grid-3';
  }
  else if(q.t==='clock'){
    pillText='🕐 Baca Jam';
    qText=`Jam berapa ini?`;
    if(q.displayType==='digital'){
      bodyHtml=`<div class="clock-disp"><div class="digital-clock">${String(q.h).padStart(2,'0')}:${String(q.m).padStart(2,'0')}</div></div>`;
    } else {
      bodyHtml=`<div class="clock-disp">${makeAnalogClock(q.h,q.m)}</div>`;
    }
    optsHtml=q.o.map((x,i)=>`<button class="opt-btn" data-i="${i}"><span class="opt-time">${x}</span></button>`).join('');
  }

  // Correct answer index for this question type
  const answerIdx = q.t==='cmp' ? q.ans
    : q.t==='ops' ? q.a
    : q.t==='seq' ? q.a
    : q.t==='addvis' ? q.idx
    : q.t==='subvis' ? q.idx
    : q.t==='shape' ? q.a
    : q.t==='letter' ? q.a
    : q.t==='odd' ? q.a
    : q.t==='bing' ? q.a
    : q.t==='shadow' ? q.a
    : q.t==='sains' ? q.a
    : q.t==='seni' ? q.a
    : q.t==='logika' ? q.a
    : q.t==='clock' ? q.a : 0;

  area.innerHTML=`
    <div class="q-card">
      <div class="who-banner ${pd.wbCls}">
        <img class="pp" src="${pd.photo}" alt="" onerror="this.outerHTML='${pd.tag}'">
        ${pd.banner}
      </div>
      <div class="q-pill">${pillText}</div>
      <div class="q-text">${qText}</div>
      ${bodyHtml}
      <div class="${gridClass}" id="optsWrap">${optsHtml}</div>
      <div class="hint-wrap" id="hintWrap">
        <button class="hint-btn" id="hintBtn">💡 Bantuan</button>
        <div class="hint-txt" id="hintTxt" hidden></div>
      </div>
      <div id="fb"></div>
    </div>`;

  pasangHint(q);

  area.querySelectorAll('.opt-btn').forEach(b=>{
    b.addEventListener('click',()=>handleAns(q,parseInt(b.dataset.i),answerIdx));
  });

  // Soal susun ubin (English Adventure): huruf atau kata
  if(q.t==='spell'||q.t==='build') pasangUbin(q);

  // Soal ketik (Bahasa Indonesia)
  if(q.t==='ketik'){
    const inp=document.getElementById('typeInput');
    const btn=document.getElementById('checkBtn');
    const submit=()=>{
      if(inp.value.trim()==='')return; // jangan proses jawaban kosong
      handleTypedAns(q,inp,btn);
    };
    btn.addEventListener('click',submit);
    inp.addEventListener('keydown',e=>{if(e.key==='Enter')submit();});
    setTimeout(()=>inp.focus(),250);
  }
}

// ══════════════════════════════════════
// TOMBOL BANTUAN (tangga hint 1-4)
// ══════════════════════════════════════
//
// Mesin hint-nya sudah ada sejak v5.2 (js/services/hint.js) tapi belum pernah
// punya tombol. Sekarang dipakai.
//
// 🔴 Hanya LOKAL — tidak menunggu jaringan sama sekali, jadi tetap jalan
// offline dan tidak pernah membuat anak menunggu.
// 🔴 Maksimal tingkat 4. Tingkat 5 khusus orang tua dan sudah dikunci di
// dalam hintUntukAnak(); di sini tidak ada jalur untuk mencapainya.
// Tingkat 1-3 tidak menyebut jawaban — anak tetap harus berpikir.
function pasangHint(q){
  var btn = document.getElementById('hintBtn');
  var txt = document.getElementById('hintTxt');
  if(!btn||!txt) return;
  if(typeof hintUntukAnak!=='function'){ btn.hidden=true; return; }

  var tingkat = 0;
  btn.addEventListener('click', function(){
    if(tingkat>=4) return;
    tingkat++;
    var t = '';
    try{ t = hintUntukAnak(q, tingkat); }catch(e){ t = ''; }
    if(!t){ btn.hidden = true; return; }     // tidak ada hint = sembunyikan saja
    txt.hidden = false;
    txt.textContent = t;
    // Berapa kali anak minta bantuan ikut tercatat, supaya laporan orang tua
    // bisa membedakan "bisa sendiri" dari "bisa setelah dibantu".
    S.hintDipakai = (S.hintDipakai||0) + 1;
    btn.textContent = tingkat>=4 ? '💡 Sudah semua' : '💡 Bantuan lagi ('+tingkat+'/4)';
    if(tingkat>=4) btn.disabled = true;
  });
}

// Bantuan ditutup begitu anak menjawab — supaya tidak dipakai untuk mengintip
// setelah jawabannya terlihat.
function kunciHint(){
  var w = document.getElementById('hintWrap');
  if(w) w.hidden = true;
}

// ══════════════════════════════════════
// SUSUN UBIN — Spelling Bee & Word Builder
// ══════════════════════════════════════
//
// Satu fungsi untuk dua permainan. Bedanya cuma isi ubinnya: huruf atau kata.
// Sengaja TANPA papan ketik (Master 2 §13) — anak kelas 1 belum lancar mengetik,
// dan keyboard di tablet menutupi separuh layar.
function pasangUbin(q){
  var target = q.t==='spell' ? q.huruf : q.kalimat;
  var slotRow = document.getElementById('slotRow');
  var tileRow = document.getElementById('tileRow');
  var undoBtn = document.getElementById('tileUndo');
  if(!slotRow||!tileRow) return;

  var slots  = slotRow.querySelectorAll('.slot');
  var terisi = [];        // indeks ubin yang sudah dipakai, urut

  function gambar(){
    for(var i=0;i<slots.length;i++){
      var idx = terisi[i];
      slots[i].textContent = (idx===undefined) ? '' : q.ubin[idx];
      slots[i].classList.toggle('isi', idx!==undefined);
    }
    tileRow.querySelectorAll('.tile').forEach(function(b){
      b.classList.toggle('dipakai', terisi.indexOf(parseInt(b.dataset.t))!==-1);
    });
    if(undoBtn) undoBtn.disabled = terisi.length===0;
  }

  tileRow.querySelectorAll('.tile').forEach(function(b){
    b.addEventListener('click',function(){
      var i = parseInt(b.dataset.t);
      if(terisi.indexOf(i)!==-1) return;          // ubin ini sudah dipakai
      if(terisi.length>=slots.length) return;     // slot sudah penuh
      terisi.push(i); gambar();
      if(terisi.length===slots.length) selesaiUbin(q,target,terisi,slotRow,tileRow,undoBtn);
    });
  });

  if(undoBtn) undoBtn.addEventListener('click',function(){ terisi.pop(); gambar(); });
  gambar();
}

function selesaiUbin(q,target,terisi,slotRow,tileRow,undoBtn){
  // Kunci semua kendali supaya tidak bisa diubah setelah dinilai
  tileRow.querySelectorAll('.tile').forEach(function(b){ b.disabled=true; });
  if(undoBtn) undoBtn.disabled=true;
  kunciHint();

  var jawab = terisi.map(function(i){ return q.ubin[i]; });
  var ok = jawab.join(q.t==='spell'?'':' ') === target.join(q.t==='spell'?'':' ');

  S.results.push(ok);
  if(ok) S.score += poinPerSoal(S.qCount);

  if(!S.statDetail[q.t]) S.statDetail[q.t]={ok:0,tot:0};
  S.statDetail[q.t].tot++;
  if(ok) S.statDetail[q.t].ok++;

  slotRow.querySelectorAll('.slot').forEach(function(s){
    s.classList.add(ok?'slot-ok':'slot-err');
  });

  var fb=document.getElementById('fb');
  if(ok){
    fb.className='fb-msg ok';
    var m=['✅ Betul! Hebat! 🎉','✅ Benar! Kamu pintar! 🌟','✅ Yes! Luar biasa! 🚀'];
    fb.textContent=m[Math.floor(Math.random()*m.length)];
  }else{
    fb.className='fb-msg err';
    // Tampilkan jawaban benar — anak perlu melihat bentuk yang betul,
    // bukan sekadar diberi tahu bahwa dia salah.
    fb.innerHTML='❌ Belum tepat. Yang benar:<br><b>'+
      target.join(q.t==='spell'?'':' ')+'</b> 💪';
  }

  var nextIdx=S.qIdx+1;
  setTimeout(function(){
    if(nextIdx>=S.qCount)finishGame();
    else showQ(nextIdx);
  }, ok?900:2400);
}

// ══════════════════════════════════════
// HANDLE TYPED ANSWER (B. Indonesia)
// ══════════════════════════════════════
function handleTypedAns(q,inp,btn){
  inp.disabled=true;btn.disabled=true;
  kunciHint();

  const ok = normalizeBI(inp.value)===normalizeBI(q.sentence);
  S.results.push(ok);
  if(ok) S.score += poinPerSoal(S.qCount);

  if(!S.statDetail['ketik'])S.statDetail['ketik']={ok:0,tot:0};
  S.statDetail['ketik'].tot++;
  if(ok)S.statDetail['ketik'].ok++;

  inp.classList.add(ok?'inp-ok':'inp-err');

  const fb=document.getElementById('fb');
  if(ok){
    fb.className='fb-msg ok';
    const msgs=['✅ Betul! Salinannya rapi! 🎉','✅ Benar! Kamu pintar mengetik! 🌟','✅ Yes! Sempurna! 🚀'];
    fb.textContent=msgs[Math.floor(Math.random()*msgs.length)];
  } else {
    fb.className='fb-msg err';
    fb.innerHTML=`❌ Belum tepat. Yang benar:<br><b>${q.sentence}</b> 💪`;
  }

  // Auto advance — sedikit lebih lama dari PG supaya sempat baca koreksi
  const nextIdx=S.qIdx+1;
  setTimeout(()=>{
    if(nextIdx>=S.qCount)finishGame();
    else showQ(nextIdx);
  },ok?888:2200);
}

// Analog clock SVG
function makeAnalogClock(h,m){
  const r=90;
  const cx=100,cy=100;
  // Angles
  const mDeg=(m/60)*360-90;
  const hDeg=((h%12)/12)*360+(m/60)*30-90;
  const mRad=mDeg*Math.PI/180;
  const hRad=hDeg*Math.PI/180;
  const mX=cx+Math.cos(mRad)*70,mY=cy+Math.sin(mRad)*70;
  const hX=cx+Math.cos(hRad)*50,hY=cy+Math.sin(hRad)*50;
  // Hour markers
  let markers='';
  for(let i=0;i<12;i++){
    const a=(i/12)*2*Math.PI-Math.PI/2;
    const x1=cx+Math.cos(a)*78,y1=cy+Math.sin(a)*78;
    const x2=cx+Math.cos(a)*88,y2=cy+Math.sin(a)*88;
    markers+=`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(255,255,255,0.5)" stroke-width="${i%3===0?3:1.5}"/>`;
  }
  return `<div class="analog-clock-wrap">
    <svg width="160" height="160" viewBox="0 0 200 200">
      <circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1a3e" stroke="rgba(255,255,255,0.3)" stroke-width="4"/>
      ${markers}
      <line x1="${cx}" y1="${cy}" x2="${hX.toFixed(1)}" y2="${hY.toFixed(1)}" stroke="white" stroke-width="6" stroke-linecap="round"/>
      <line x1="${cx}" y1="${cy}" x2="${mX.toFixed(1)}" y2="${mY.toFixed(1)}" stroke="#4ECDC4" stroke-width="4" stroke-linecap="round"/>
      <circle cx="${cx}" cy="${cy}" r="5" fill="#FFE66D"/>
    </svg>
  </div>`;
}

// ══════════════════════════════════════
// HANDLE ANSWER
// ══════════════════════════════════════
function handleAns(q,chosen,correctIdx){
  const btns=document.querySelectorAll('.opt-btn');
  btns.forEach(b=>b.disabled=true);
  kunciHint();

  const ok=chosen===correctIdx;
  S.results.push(ok);
  // Poin per soal: 10 soal=10/soal, 15 soal=7/soal (105), 20 soal=5/soal
  if(ok) S.score += poinPerSoal(S.qCount);

  // Track by type
  const typeKey=q.t;
  if(!S.statDetail[typeKey])S.statDetail[typeKey]={ok:0,tot:0};
  S.statDetail[typeKey].tot++;
  if(ok)S.statDetail[typeKey].ok++;

  if(ok){
    btns[chosen].classList.add('is-correct');
  } else {
    btns[chosen].classList.add('is-wrong');
    if(btns[correctIdx])btns[correctIdx].classList.add('show-ans');
  }

  const fb=document.getElementById('fb');
  if(ok){
    fb.className='fb-msg ok';
    const msgs=['✅ Betul! Hebat! 🎉','✅ Benar! Kamu pintar! 🌟','✅ Yes! Luar biasa! 🚀','✅ Correct! Amazing! ⭐'];
    fb.textContent=msgs[Math.floor(Math.random()*msgs.length)];
  } else {
    fb.className='fb-msg err';
    const msgs=['❌ Hampir! Tetap semangat! 💪','❌ Yuk coba lagi besok! 🌈','❌ Belum tepat, semangat! ⚡'];
    // 🔴 B12 — `reason` sudah lama ikut disimpan di tiap soal Odd One Out tapi
    // TIDAK PERNAH ditampilkan di mana pun. Daripada dihapus, dipakai: saat
    // jawabannya salah, anak diberi tahu ALASANNYA. Tahu "kenapa" jauh lebih
    // berguna daripada sekadar tahu "salah" (PRD §17 — kesalahan itu sinyal
    // belajar, bukan vonis). Hanya muncul saat salah, jadi tidak membocorkan
    // jawaban pada soal berikutnya.
    if(q.t==='odd'&&q.reason&&btns[correctIdx]){
      const bnr=q.items[correctIdx];
      fb.innerHTML=msgs[Math.floor(Math.random()*msgs.length)]+
        `<br><span class="fb-alasan">${bnr.e} <b>${bnr.l}</b> ${q.reason}</span>`;
    } else {
      fb.textContent=msgs[Math.floor(Math.random()*msgs.length)];
    }
  }

  // Betul: lanjut cepat (888ms) — anak sudah tahu jawabannya, jangan dibuat menunggu.
  // Salah: TAHAN lebih lama. Dengan 888ms, kotak jawaban yang benar baru saja
  // menyala lalu langsung hilang — anak tidak sempat melihat mana yang betul,
  // apalagi membaca alasannya. Soal ketik & susun ubin sudah memakai ~2,2 detik;
  // sekarang pilihan ganda ikut, supaya seluruh permainan terasa sama.
  const nextIdx=S.qIdx+1;
  setTimeout(()=>{
    if(nextIdx>=S.qCount)finishGame();
    else showQ(nextIdx);
  }, ok?888:2200);
}
