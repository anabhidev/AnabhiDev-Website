// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Writing Lab Component (Canvas & Trace)
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:48:00
// ================================================================

import { AudioFx } from '../engine/audio-fx.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { store } from '../store.js';
import { appState } from '../state.js';

export class WritingLabComponent {
  constructor(container) {
    this.container = container;
    this.activeTaskIndex = 0;
    this.currentColor = '#056268';
    this.tasks = [
      { id: 'w1', title: 'Tebalkan Garis Lurus Tegak & Datar', sample: '│ ─ ┼', desc: 'Tarik garis tegak dari atas ke bawah dan garis mendatar dari kiri ke kanan.' },
      { id: 'w2', title: 'Tebalkan Huruf Vokal A, I, U, E, O', sample: 'A a  I i  U u  E e  O o', desc: 'Tirukan bentuk huruf vokal kapital dan huruf kecil.' },
      { id: 'w3', title: 'Menulis Suku Kata: B-A, M-A, S-A', sample: 'BA  MA  SA  TA', desc: 'Salin suku kata vokal A dengan rapi.' },
      { id: 'w4', title: 'Menulis Kata: BUKU & BOLA', sample: 'BUKU   BOLA', desc: 'Tuliskan kata benda yang kita pelajari hari ini.' },
      { id: 'w5', title: 'Menulis Angka 1 sampai 10', sample: '1  2  3  4  5  6  7  8  9  10', desc: 'Latih tulisan angka agar rapi dan jelas.' }
    ];
  }

  render() {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const task = this.tasks[this.activeTaskIndex];

    this.container.innerHTML = `
      <div class="writing-lab-wrap">
        <!-- Banner Header Writing Lab -->
        <div class="section-header" style="margin-bottom:20px;">
          <div class="eyebrow"><span class="no">✍️</span><span class="lbl">WRITING LAB & LETTER TRACING</span></div>
          <h2 class="section-title">${isEn ? 'Writing Lab — Motoric & Handwriting Practice' : 'Writing Lab — Latihan Menulis Huruf & Kata'}</h2>
          <p class="section-sub">${isEn ? 'Trace lines, letters, words, and numbers on the child-friendly digital canvas.' : 'Latih motorik halus dengan menebalkan garis, huruf, kata, dan angka di atas kanvas interaktif.'}</p>
        </div>

        <!-- Task Selector Tabs -->
        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px; margin-bottom:20px;">
          ${this.tasks.map((t, idx) => {
            const isSelected = idx === this.activeTaskIndex;
            return `
              <button class="btn btn-task-tab ${isSelected ? 'primary' : ''}" data-idx="${idx}" type="button" style="
                flex: 0 0 auto;
                font-size: 13px;
                font-weight: 800;
                padding: 8px 16px;
                border-radius: 12px;
              ">
                ${t.title}
              </button>
            `;
          }).join('')}
        </div>

        <!-- Canvas Card -->
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line); border-radius:20px; padding:22px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="margin:0 0 4px; font-size:18px; font-weight:800; color:var(--ink);">${task.title}</h3>
              <p style="margin:0; font-size:13px; color:var(--muted);">${task.desc}</p>
            </div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <button class="btn btn-tts" id="btnSpeakWritingDesc" type="button" style="font-size:12px; padding:6px 12px;">
                🔊 ${isEn ? 'Listen' : 'Dengarkan'}
              </button>
              <button class="btn" id="btnDemoTrace" type="button" style="font-size:12px; padding:6px 12px;">
                ✨ ${isEn ? 'Show Motion' : 'Contoh Gerakan'}
              </button>
              <button class="btn" id="btnClearCanvas" type="button" style="font-size:12px; padding:6px 14px;">
                🧹 ${isEn ? 'Clear Canvas' : 'Bersihkan'}
              </button>
            </div>
          </div>

          <!-- Panduan Tulisan Contoh (Tracing Watermark Background) -->
          <div style="position:relative; background:#fff; border:2px dashed var(--line); border-radius:16px; overflow:hidden; touch-action:none; box-shadow:inset 0 2px 8px rgba(0,0,0,0.04);">
            <div style="
              position:absolute;
              top:0; left:0; right:0; bottom:0;
              display:grid;
              place-items:center;
              pointer-events:none;
              font-family:'Courier New', monospace;
              font-size: clamp(36px, 8vw, 68px);
              font-weight:900;
              color: rgba(200, 215, 230, 0.45);
              user-select:none;
              letter-spacing: 12px;
            ">
              ${task.sample}
            </div>

            <canvas id="writingCanvas" width="800" height="340" style="width:100%; height:340px; display:block; cursor:crosshair;"></canvas>
          </div>

          <!-- Kotak Umpan Balik Apresiasi Belajar Menulis -->
          <div id="writingFeedbackBox" style="display:none; margin-top:14px; padding:12px 18px; border-radius:14px; font-size:13.5px; font-weight:750; text-align:center; transition:all 0.3s ease;"></div>

          <!-- Color Palette & Tools -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; gap:10px; align-items:center;">
              <span style="font-size:12px; font-weight:700; color:var(--muted);">${isEn ? 'Pen Color:' : 'Warna Spidol:'}</span>
              <button class="btn-color-dot" data-color="#056268" aria-label="Warna Teal" style="width:44px; height:44px; min-width:44px; min-height:44px; border-radius:50%; background:#056268; border:2.5px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.25); cursor:pointer;"></button>
              <button class="btn-color-dot" data-color="#b24a1b" aria-label="Warna Oranye" style="width:44px; height:44px; min-width:44px; min-height:44px; border-radius:50%; background:#b24a1b; border:2.5px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.25); cursor:pointer;"></button>
              <button class="btn-color-dot" data-color="#2b5ea8" aria-label="Warna Biru" style="width:44px; height:44px; min-width:44px; min-height:44px; border-radius:50%; background:#2b5ea8; border:2.5px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.25); cursor:pointer;"></button>
              <button class="btn-color-dot" data-color="#1e7b45" aria-label="Warna Hijau" style="width:44px; height:44px; min-width:44px; min-height:44px; border-radius:50%; background:#1e7b45; border:2.5px solid #fff; box-shadow:0 2px 8px rgba(0,0,0,0.25); cursor:pointer;"></button>
            </div>

            <button class="btn primary" id="btnSaveWriting" type="button" style="font-size:13px; font-weight:800; padding:10px 22px; border-radius:12px;">
              ⭐ ${isEn ? 'Finish & Collect Star!' : 'Selesai & Dapatkan Bintang!'}
            </button>
          </div>
        </div>
      </div>
    `;

    this.initCanvas();
    this.attachEvents(task);
    if (window.app && typeof window.app.ensureFooter === 'function') {
      window.app.ensureFooter(lang);
    }
  }

  initCanvas() {
    const canvas = this.container.querySelector('#writingCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Sesuaikan resolusi fisik canvas dengan clientWidth
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 340;

    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = this.currentColor;

    function getPos(e) {
      const r = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - r.left,
        y: clientY - r.top
      };
    }

    const startDraw = (e) => {
      if (e.touches) e.preventDefault();
      isDrawing = true;
      const pos = getPos(e);
      lastX = pos.x;
      lastY = pos.y;
    };

    const draw = (e) => {
      if (!isDrawing) return;
      e.preventDefault();
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastX = pos.x;
      lastY = pos.y;
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDraw);
    canvas.addEventListener('mouseleave', stopDraw);

    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', stopDraw);

    const handleResize = () => {
      const r = canvas.getBoundingClientRect();
      if (r.width > 0 && r.width !== canvas.width) {
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(canvas, 0, 0);

        canvas.width = r.width;
        canvas.height = 340;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 6;
        ctx.strokeStyle = this.currentColor;
        ctx.drawImage(tempCanvas, 0, 0);
      }
    };
    window.addEventListener('resize', handleResize);

    // Bersihkan canvas
    this.container.querySelector('#btnClearCanvas')?.addEventListener('click', () => {
      AudioFx.playTap();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Pilihan warna
    const colorDots = this.container.querySelectorAll('.btn-color-dot');
    colorDots.forEach(dot => {
      dot.addEventListener('click', () => {
        this.currentColor = dot.getAttribute('data-color') || '#056268';
        ctx.strokeStyle = this.currentColor;
        AudioFx.playTap();
      });
    });
  }

  showToast(message, type = 'success') {
    const box = this.container.querySelector('#writingFeedbackBox');
    if (!box) return;
    box.style.display = 'block';
    if (type === 'success') {
      box.style.background = '#edfbf2';
      box.style.color = '#15803d';
      box.style.border = '1.5px solid #86efac';
    } else {
      box.style.background = '#fef3c7';
      box.style.color = '#b45309';
      box.style.border = '1.5px solid #fde68a';
    }
    box.innerHTML = message;
  }

  attachEvents(task) {
    // Switch task
    const tabBtns = this.container.querySelectorAll('.btn-task-tab');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeTaskIndex = parseInt(btn.getAttribute('data-idx'), 10) || 0;
        AudioFx.playTap();
        this.render();
      });
    });

    // TTS
    this.container.querySelector('#btnSpeakWritingDesc')?.addEventListener('click', () => {
      TtsEngine.speak(`${task.title}. ${task.desc}`, 'id', 0.85);
    });

    // Demo Animasi Goresan Panduan
    this.container.querySelector('#btnDemoTrace')?.addEventListener('click', () => {
      AudioFx.playTap();
      const canvas = this.container.querySelector('#writingCanvas');
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const startX = 40;
      const endX = canvas.width - 40;
      const midY = canvas.height / 2;
      let currentX = startX;

      const animId = setInterval(() => {
        if (currentX >= endX) {
          clearInterval(animId);
          return;
        }
        ctx.beginPath();
        ctx.arc(currentX, midY + Math.sin(currentX * 0.04) * 25, 7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 178, 27, 0.45)';
        ctx.fill();
        currentX += 14;
      }, 25);
    });

    // Simpan tulisan & validasi
    this.container.querySelector('#btnSaveWriting')?.addEventListener('click', () => {
      const canvas = this.container.querySelector('#writingCanvas');
      let drawnPixels = 0;
      if (canvas) {
        try {
          const ctx = canvas.getContext('2d');
          const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imgData.data;
          for (let i = 3; i < data.length; i += 16) {
            if (data[i] > 20) drawnPixels++;
          }
        } catch (_) {}
      }

      if (drawnPixels < 25) {
        AudioFx.playGentleWrong();
        this.showToast('✍️ Ayo goreskan spidolmu di atas pola tulisan terlebih dahulu ya! 🎨', 'warn');
        return;
      }

      AudioFx.playStarSparkle();
      AudioFx.playCelebration(this.container);
      store.addStars(3);
      store.incrementDailyChallenge();
      this.showToast('🎉 <strong>Luar Biasa!</strong> Tulisanmu sangat rapi & tekun! Kamu mendapatkan <strong>+3 Bintang Emas</strong>! ⭐⭐⭐', 'success');
      
      const starEl = document.getElementById('starCount');
      if (starEl && store.data.stars) {
        starEl.textContent = store.data.stars;
      }
    });
  }
}

