// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Calistung Engine (Daily Drill 5/10/15 Min)
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:38:00
// ================================================================

import { CONTENT_REGISTRY } from '../data/content-registry.js';
import { InteractiveEngine } from '../engine/interactive-engine.js';
import { AudioFx } from '../engine/audio-fx.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { store } from '../store.js';
import { appState } from '../state.js';

export class CalistungEngineComponent {
  constructor(container) {
    this.container = container;
    this.activeMode = '5min'; // 5min, 10min, 15min
    this.activePillar = 'reading'; // reading, writing, counting
    this.currentTaskIdx = 0;
  }

  render() {
    const data = CONTENT_REGISTRY.calistung;
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const currentPillarData = data.pillars.find(p => p.id === this.activePillar) || data.pillars[0];
    const tasks = currentPillarData.tasks || [];
    const currentTask = tasks[this.currentTaskIdx] || tasks[0];

    this.container.innerHTML = `
      <div class="calistung-engine-wrap">
        <!-- Hero Banner Calistung -->
        <div class="book-hero-banner" style="
          background: linear-gradient(135deg, rgba(234, 88, 12, 0.08), rgba(245, 158, 11, 0.12));
          border: 1.5px solid rgba(234, 88, 12, 0.35);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        ">
          <div class="book-cover-frame" style="position:relative; flex-shrink:0;">
            <img src="assets/img/covers/05_Cali_Stung.png" alt="Cover Buku Calistung Permata" width="120" height="168" loading="lazy" decoding="async" style="
              width: 120px;
              height: 168px;
              object-fit: cover;
              border-radius: 12px;
              box-shadow: 0 10px 24px rgba(234, 88, 12, 0.28);
              border: 2px solid #fff;
            ">
            <span style="position:absolute; bottom:-8px; right:-6px; background:#c2410c; color:#fff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:6px;">
              SRC-05
            </span>
          </div>

          <div style="flex:1; min-width:260px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="subject-badge" style="background:#c2410c; color:#fff; border:none; font-weight:800;">
                ⚡ Daily Drill Engine
              </span>
              <span class="subject-badge" style="background:rgba(194,65,12,0.12); color:#c2410c; border-color:rgba(194,65,12,0.3); font-weight:700;">
                Permata · Membaca, Menulis, Berhitung
              </span>
            </div>
            <h1 style="margin:0 0 6px; font-size:24px; font-weight:850; color:var(--ink);">
              ${isEn ? 'Calistung Daily Practice — 5, 10, or 15 Minutes' : 'Calistung — Latihan Cepat 5, 10, atau 15 Menit'}
            </h1>
            <p style="margin:0 0 12px; font-size:13.5px; color:var(--muted); line-height:1.55;">
              ${isEn
                ? 'Daily literacy and numeracy routine: 5 min Reading + 5 min Writing + 5 min Math.'
                : 'Latihan rutin harian penguatan fondasi: Membaca fonik, Menulis ejaan, dan Berhitung ceria.'}
            </p>

            <!-- Mode Selector: 5 min, 10 min, 15 min -->
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              ${data.modes.map(m => `
                <button class="btn btn-cali-mode ${this.activeMode === m.id ? 'primary' : ''}" data-mode="${m.id}" type="button" style="font-size:12.5px; font-weight:800; padding:8px 16px; border-radius:10px;">
                  ${m.badge} (${m.durationMin} Menit)
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- 3 Pilar Calistung Tabs -->
        <div style="display:flex; gap:10px; margin-bottom:20px; flex-wrap:wrap;">
          ${data.pillars.map(pil => `
            <button class="btn btn-cali-pillar ${this.activePillar === pil.id ? 'primary' : ''}" data-pillar="${pil.id}" type="button" style="
              font-size:14px;
              font-weight:800;
              padding:10px 20px;
              border-radius:12px;
              display:inline-flex;
              align-items:center;
              gap:8px;
            ">
              <span>${pil.icon}</span>
              <span>${isEn ? pil.titleEn : pil.title}</span>
            </button>
          `).join('')}
        </div>

        <!-- Task Card Interaktif -->
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line); border-left:4px solid ${currentPillarData.color};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="font-size:13px; font-weight:800; color:${currentPillarData.color};">
              Soal ${this.currentTaskIdx + 1} dari ${tasks.length} · ${currentPillarData.title}
            </div>
            <button class="btn btn-tts" id="btnSpeakCalistungTask" type="button" style="font-size:12px; padding:6px 12px;">
              🔊 Bacakan Soal
            </button>
          </div>

          <h3 style="margin:0 0 16px; font-size:18px; font-weight:800; color:var(--ink); line-height:1.5;">
            ${currentTask.q}
          </h3>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin-bottom:20px;">
            ${currentTask.options.map(opt => `
              <button class="btn btn-cali-opt" data-opt="${opt}" type="button" style="
                padding: 14px 18px;
                font-size: 15px;
                font-weight: 800;
                text-align: left;
                border-radius: 12px;
                border: 1.5px solid var(--line);
                background: var(--paper);
                color: var(--ink);
                transition: all 0.18s ease;
              ">
                ${opt}
              </button>
            `).join('')}
          </div>

          <div class="feedback-banner" id="caliFeedback" style="display:none; margin-bottom:18px;"></div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:var(--muted);">
              💡 Petunjuk: ${currentTask.hint || 'Pikirkan baik-baik ya!'}
            </span>
            <button class="btn primary" id="btnNextCaliTask" type="button" style="font-weight:800; padding:8px 18px;">
              ${this.currentTaskIdx < tasks.length - 1 ? 'Soal Berikutnya ➔' : 'Selesai & Buka Pilar Lain ➔'}
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(currentTask, tasks);
    if (window.app && typeof window.app.ensureFooter === 'function') {
      window.app.ensureFooter(lang);
    }
  }

  attachEvents(currentTask, tasks) {
    // Mode switcher
    const modeBtns = this.container.querySelectorAll('.btn-cali-mode');
    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeMode = btn.getAttribute('data-mode') || '5min';
        AudioFx.playTap();
        this.render();
      });
    });

    // Pillar switcher
    const pillarBtns = this.container.querySelectorAll('.btn-cali-pillar');
    pillarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activePillar = btn.getAttribute('data-pillar') || 'reading';
        this.currentTaskIdx = 0;
        AudioFx.playTap();
        this.render();
      });
    });

    // TTS speak question
    this.container.querySelector('#btnSpeakCalistungTask')?.addEventListener('click', () => {
      TtsEngine.speak(currentTask.q, 'id', 0.85);
    });

    // Option click
    const optBtns = this.container.querySelectorAll('.btn-cali-opt');
    const feedback = this.container.querySelector('#caliFeedback');

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-opt');
        const isCorrect = selected === currentTask.answer;

        if (feedback) {
          feedback.style.display = 'flex';
          if (isCorrect) {
            feedback.className = 'feedback-banner success show';
            feedback.innerHTML = `<strong>${InteractiveEngine.getFeedbackMessage(true)}</strong> Jawabanmu tepat!`;
            AudioFx.playCorrect();
            btn.style.background = 'var(--green)';
            btn.style.color = '#fff';
            store.addStar();
          } else {
            feedback.className = 'feedback-banner error show';
            feedback.innerHTML = `<strong>${InteractiveEngine.getFeedbackMessage(false)}</strong> Jawaban yang tepat adalah: <strong>${currentTask.answer}</strong>`;
            AudioFx.playError();
          }
        }
      });
    });

    // Next task
    this.container.querySelector('#btnNextCaliTask')?.addEventListener('click', () => {
      AudioFx.playTap();
      if (this.currentTaskIdx < tasks.length - 1) {
        this.currentTaskIdx++;
        this.render();
      } else {
        AudioFx.playCelebration();
        store.incrementDailyChallenge();
        alert('🎉 Hebat! Kamu sudah menyelesaikan semua latihan pilar ini!');
        // Pindah otomatis ke pilar berikutnya
        if (this.activePillar === 'reading') this.activePillar = 'writing';
        else if (this.activePillar === 'writing') this.activePillar = 'counting';
        else this.activePillar = 'reading';
        this.currentTaskIdx = 0;
        this.render();
      }
    });
  }
}

