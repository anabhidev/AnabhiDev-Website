// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · MAXXI Engine (School Reinforcement Engine)
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:45:00
// ================================================================

import { CONTENT_REGISTRY } from '../data/content-registry.js';
import { InteractiveEngine } from '../engine/interactive-engine.js';
import { AudioFx } from '../engine/audio-fx.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { store } from '../store.js';
import { appState } from '../state.js';

export class MaxxiEngineComponent {
  constructor(container) {
    this.container = container;
    this.activeUnitId = 'unit-1-diriku';
    this.currentSubjectIdx = 0;
  }

  render() {
    const data = CONTENT_REGISTRY.maxxi;
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const currentUnit = data.units.find(u => u.id === this.activeUnitId) || data.units[0];
    const subjects = currentUnit.subjects || [];
    const currentQuestion = subjects[this.currentSubjectIdx] || subjects[0];

    this.container.innerHTML = `
      <div class="maxxi-engine-wrap">
        <!-- Hero Banner MAXXI -->
        <div class="book-hero-banner" style="
          background: linear-gradient(135deg, rgba(2, 132, 199, 0.08), rgba(14, 165, 233, 0.12));
          border: 1.5px solid rgba(2, 132, 199, 0.35);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        ">
          <div class="book-cover-frame" style="position:relative; flex-shrink:0;">
            <img src="assets/img/covers/10_Maxxi.png" alt="Cover Buku MAXXI Tematik SD Kelas 1" style="
              width: 120px;
              height: 168px;
              object-fit: cover;
              border-radius: 12px;
              box-shadow: 0 10px 24px rgba(2, 132, 199, 0.28);
              border: 2px solid #fff;
            ">
            <span style="position:absolute; bottom:-8px; right:-6px; background:#0369a1; color:#fff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:6px;">
              SRC-10
            </span>
          </div>

          <div style="flex:1; min-width:260px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="subject-badge" style="background:#0369a1; color:#fff; border:none; font-weight:800;">
                🏆 School Reinforcement Engine
              </span>
              <span class="subject-badge" style="background:rgba(3,105,161,0.12); color:#0369a1; border-color:rgba(3,105,161,0.3); font-weight:700;">
                MAXXI Tematik Terpadu SD Kelas 1 Semester 1
              </span>
            </div>
            <h1 style="margin:0 0 6px; font-size:24px; font-weight:850; color:var(--ink);">
              ${isEn ? 'MAXXI — Integrated School Reinforcement' : 'MAXXI — Penguatan Tematik Sekolah Terpadu'}
            </h1>
            <p style="margin:0 0 12px; font-size:13.5px; color:var(--muted); line-height:1.55;">
              ${isEn
                ? 'Contextual scenario challenges across Indonesian, Math, Civics, Arts, and Physical Education.'
                : 'Tantangan skenario kontekstual terpadu lintas 5 mata pelajaran sekolah: B. Indonesia, Matematika, Pancasila, Seni Rupa, dan PJOK.'}
            </p>
            <div style="display:inline-flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:6px 14px; font-size:12px; font-weight:700;">
              <span>🎯 Unit Aktif:</span>
              <strong style="color:${currentUnit.color};">${currentUnit.icon} ${isEn ? currentUnit.nameEn : currentUnit.name}</strong>
            </div>
          </div>
        </div>

        <!-- 4 Thematic Units Selector -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:24px;">
          ${data.units.map(u => {
            const isSelected = u.id === this.activeUnitId;
            return `
              <button class="btn btn-unit-select" data-unit="${u.id}" type="button" style="
                background: ${isSelected ? u.color : 'var(--card)'};
                color: ${isSelected ? '#ffffff' : 'var(--ink)'};
                border: 1.5px solid ${isSelected ? u.color : 'var(--line)'};
                border-radius: 14px;
                padding: 14px 18px;
                text-align: left;
                cursor: pointer;
                box-shadow: ${isSelected ? '0 8px 20px rgba(0,0,0,0.12)' : '0 2px 6px rgba(0,0,0,0.03)'};
                transition: all 0.2s ease;
              ">
                <div style="font-size:28px; margin-bottom:6px;">${u.icon}</div>
                <strong style="display:block; font-size:15px; margin-bottom:4px;">${isEn ? u.nameEn : u.name}</strong>
                <span style="font-size:11px; opacity:${isSelected ? '0.9' : '0.6'}; line-height:1.3; display:block;">
                  ${u.theme}
                </span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Question Card -->
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line); border-left:4px solid ${currentUnit.color};">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); font-weight:800;">
                ${currentQuestion.icon} ${currentQuestion.subject}
              </span>
              <span style="font-size:12px; color:var(--muted); font-weight:700;">
                Tantangan ${this.currentSubjectIdx + 1} dari ${subjects.length}
              </span>
            </div>
            <button class="btn btn-tts" id="btnSpeakMaxxiTask" type="button" style="font-size:12px; padding:6px 12px;">
              🔊 Bacakan Pertanyaan
            </button>
          </div>

          <h3 style="margin:0 0 16px; font-size:18px; font-weight:800; color:var(--ink); line-height:1.5;">
            ${currentQuestion.q}
          </h3>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px; margin-bottom:20px;">
            ${currentQuestion.options.map(opt => `
              <button class="btn btn-maxxi-opt" data-opt="${opt}" type="button" style="
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

          <div class="feedback-banner" id="maxxiFeedback" style="display:none; margin-bottom:18px;"></div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:var(--muted);">
              💡 Petunjuk: ${currentQuestion.hint || 'Pikirkan solusi terbaik!'}
            </span>
            <button class="btn primary" id="btnNextMaxxiTask" type="button" style="font-weight:800; padding:8px 18px;">
              ${this.currentSubjectIdx < subjects.length - 1 ? 'Soal Berikutnya ➔' : 'Selesai Unit Ini ➔'}
            </button>
          </div>
        </div>
      </div>
    `;

    this.attachEvents(currentQuestion, subjects);
  }

  attachEvents(currentQuestion, subjects) {
    // Switch unit
    const unitBtns = this.container.querySelectorAll('.btn-unit-select');
    unitBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeUnitId = btn.getAttribute('data-unit') || 'unit-1-diriku';
        this.currentSubjectIdx = 0;
        AudioFx.playTap();
        this.render();
      });
    });

    // TTS
    this.container.querySelector('#btnSpeakMaxxiTask')?.addEventListener('click', () => {
      TtsEngine.speak(currentQuestion.q, 'id', 0.85);
    });

    // Check option
    const optBtns = this.container.querySelectorAll('.btn-maxxi-opt');
    const feedback = this.container.querySelector('#maxxiFeedback');

    optBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = btn.getAttribute('data-opt');
        const isCorrect = selected === currentQuestion.answer;

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
            feedback.innerHTML = `<strong>${InteractiveEngine.getFeedbackMessage(false)}</strong> Jawaban yang benar: <strong>${currentQuestion.answer}</strong>`;
            AudioFx.playError();
          }
        }
      });
    });

    // Next task
    this.container.querySelector('#btnNextMaxxiTask')?.addEventListener('click', () => {
      AudioFx.playTap();
      if (this.currentSubjectIdx < subjects.length - 1) {
        this.currentSubjectIdx++;
        this.render();
      } else {
        AudioFx.playCelebration();
        store.incrementDailyChallenge();
        alert('🎉 Luar biasa! Kamu telah menuntaskan seluruh tantangan tematik unit ini!');
        const order = ['unit-1-diriku', 'unit-2-kegemaranku', 'unit-3-kegiatanku', 'unit-4-keluargaku'];
        const nextIdx = (order.indexOf(this.activeUnitId) + 1) % order.length;
        this.activeUnitId = order[nextIdx];
        this.currentSubjectIdx = 0;
        this.render();
      }
    });
  }
}

