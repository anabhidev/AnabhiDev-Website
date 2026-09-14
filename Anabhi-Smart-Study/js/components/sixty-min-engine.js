// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · 60 Menit Engine (4-Pillar Multi-Skill Starter)
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:42:00
// ================================================================

import { CONTENT_REGISTRY } from '../data/content-registry.js';
import { InteractiveEngine } from '../engine/interactive-engine.js';
import { AudioFx } from '../engine/audio-fx.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { store } from '../store.js';
import { appState } from '../state.js';

export class SixtyMinEngineComponent {
  constructor(container) {
    this.container = container;
    this.activePillarId = 'read'; // read, write, count, english
    this.currentDrillIdx = 0;
  }

  render() {
    const data = CONTENT_REGISTRY.sixtyMin;
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const currentPillar = data.pillars.find(p => p.id === this.activePillarId) || data.pillars[0];
    const drills = currentPillar.drills || [];
    const currentDrill = drills[this.currentDrillIdx] || drills[0];

    this.container.innerHTML = `
      <div class="sixty-min-wrap">
        <!-- Hero Banner 60 Menit -->
        <div class="book-hero-banner" style="
          background: linear-gradient(135deg, rgba(22, 163, 74, 0.08), rgba(37, 99, 235, 0.1));
          border: 1.5px solid rgba(22, 163, 74, 0.35);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        ">
          <div class="book-cover-frame" style="position:relative; flex-shrink:0;">
            <img src="assets/img/covers/13_60Menit_Lancar.png" onerror="this.src='assets/img/covers/05_Cali_Stung.png'" alt="Cover 60 Menit Lancar Membaca Menulis Berhitung dan BHS Inggris" style="
              width: 120px;
              height: 168px;
              object-fit: cover;
              border-radius: 12px;
              box-shadow: 0 10px 24px rgba(22, 163, 74, 0.28);
              border: 2px solid #fff;
            ">
            <span style="position:absolute; bottom:-8px; right:-6px; background:#16a34a; color:#fff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:6px;">
              SRC-13
            </span>
          </div>

          <div style="flex:1; min-width:260px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="subject-badge" style="background:#16a34a; color:#fff; border:none; font-weight:800;">
                🕒 Multi-Skill Starter Engine
              </span>
              <span class="subject-badge" style="background:rgba(22,163,74,0.12); color:#16a34a; border-color:rgba(22,163,74,0.3); font-weight:700;">
                Integral Media · Ilham Arifin
              </span>
            </div>
            <h1 style="margin:0 0 6px; font-size:24px; font-weight:850; color:var(--ink);">
              ${isEn ? '60-Minute Rapid Multi-Skill Starter' : '60 Menit Lancar — 4 Pilar Mandiri'}
            </h1>
            <p style="margin:0 0 12px; font-size:13.5px; color:var(--muted); line-height:1.55;">
              ${isEn
                ? 'Comprehensive workbook starter: Reading Faster, Writing Easier, Clever Math 123, and Fluent English ABC!'
                : 'Belajar cepat, mudah, dan menyenangkan: Membaca lebih cepat, Menulis lebih mudah, Berhitung lebih pintar, dan Bahasa Inggris lebih lancar.'}
            </p>
            <div style="display:inline-flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:6px 14px; font-size:12px; font-weight:700;">
              <span>🎯 Pilar Aktif:</span>
              <strong style="color:${currentPillar.color};">${currentPillar.icon} ${isEn ? currentPillar.nameEn : currentPillar.name}</strong>
            </div>
          </div>
        </div>

        <!-- 4 Pilar Cards Selector -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:24px;">
          ${data.pillars.map(p => {
            const isSelected = p.id === this.activePillarId;
            return `
              <button class="btn btn-pillar-select" data-pillar="${p.id}" type="button" style="
                background: ${isSelected ? p.color : 'var(--card)'};
                color: ${isSelected ? '#ffffff' : 'var(--ink)'};
                border: 1.5px solid ${isSelected ? p.color : 'var(--line)'};
                border-radius: 14px;
                padding: 14px 18px;
                text-align: left;
                cursor: pointer;
                box-shadow: ${isSelected ? '0 8px 20px rgba(0,0,0,0.12)' : '0 2px 6px rgba(0,0,0,0.03)'};
                transition: all 0.2s ease;
              ">
                <div style="font-size:28px; margin-bottom:6px;">${p.icon}</div>
                <strong style="display:block; font-size:15px; margin-bottom:4px;">${isEn ? p.nameEn : p.name}</strong>
                <span style="font-size:11px; opacity:${isSelected ? '0.9' : '0.6'};">
                  ${p.drills.length} Latihan Interaktif
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Drill Task Container -->
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line); border-left:4px solid ${currentPillar.color};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="font-size:13px; font-weight:800; color:${currentPillar.color};">
              Latihan ${this.currentDrillIdx + 1} dari ${drills.length} · ${currentPillar.name}
            </div>
            <button class="btn btn-tts" id="btnSpeakSixtyTask" type="button" style="font-size:12px; padding:6px 12px;">
              🔊 Bacakan Pertanyaan
            </button>
          </div>

          <h3 style="margin:0 0 16px; font-size:18px; font-weight:800; color:var(--ink); line-height:1.5;">
            ${currentDrill.q}
          </h3>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin-bottom:20px;">
            ${currentDrill.options.map(opt => `
              <button class="btn btn-sixty-opt" data-opt="${opt}" type="button" style="
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

          <div class="feedback-banner" id="sixtyFeedback" style="display:none; margin-bottom:18px;"></div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:var(--muted);">
              💡 Petunjuk: ${currentDrill.hint || 'Pilih jawaban yang paling benar!'}
            </span>
            <button class="btn primary" id="btnNextSixtyDrill" type="button" style="font-weight:800; padding:8px 18px;">
              ${this.currentDrillIdx < drills.length - 1 ? 'Latihan Berikutnya ➔' : 'Selesai Pilar Ini ➔'}
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(currentDrill, drills);
  }

  attachEvents(currentDrill, drills) {
    // Switch pillar
    const pillarBtns = this.container.querySelectorAll('.btn-pillar-select');
    pillarBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activePillarId = btn.getAttribute('data-pillar') || 'read';
        this.currentDrillIdx = 0;
        AudioFx.playTap();
        this.render();
      });
    });

    // Speak TTS
    this.container.querySelector('#btnSpeakSixtyTask')?.addEventListener('click', () => {
      TtsEngine.speak(currentDrill.q, 'id', 0.85);
    });

    // Check option
    const optBtns = this.container.querySelectorAll('.btn-sixty-opt');
    const feedback = this.container.querySelector('#sixtyFeedback');

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-opt');
        const isCorrect = selected === currentDrill.answer;

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
            feedback.innerHTML = `<strong>${InteractiveEngine.getFeedbackMessage(false)}</strong> Jawaban yang benar: <strong>${currentDrill.answer}</strong>`;
            AudioFx.playError();
          }
        }
      });
    });

    // Next drill
    this.container.querySelector('#btnNextSixtyDrill')?.addEventListener('click', () => {
      AudioFx.playTap();
      if (this.currentDrillIdx < drills.length - 1) {
        this.currentDrillIdx++;
        this.render();
      } else {
        AudioFx.playCelebration();
        store.incrementDailyChallenge();
        alert('🎉 Hebat! Kamu telah menuntaskan seluruh latihan di pilar ini!');
        // Rotasi ke pilar berikutnya
        const order = ['read', 'write', 'count', 'english'];
        const nextIdx = (order.indexOf(this.activePillarId) + 1) % order.length;
        this.activePillarId = order[nextIdx];
        this.currentDrillIdx = 0;
        this.render();
      }
    });
  }
}
