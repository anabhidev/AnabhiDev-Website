// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Reading Lab Component (Reading Acceleration Engine)
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:35:00
// ================================================================

import { CONTENT_REGISTRY } from '../data/content-registry.js';
import { InteractiveEngine } from '../engine/interactive-engine.js';
import { AudioFx } from '../engine/audio-fx.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { store } from '../store.js';
import { appState } from '../state.js';

export class ReadingLabComponent {
  constructor(container) {
    this.container = container;
    this.activeLevelId = 'read-lvl-1'; // Default ke Level 1 (Vokal A)
    this.currentStep = 'SEE'; // SEE, LISTEN, SAY, MATCH, READ, WRITE, QUIZ
    this.levels = CONTENT_REGISTRY.reading || [];
  }

  render(levelId = null) {
    if (levelId) this.activeLevelId = levelId;
    const currentLevel = this.levels.find(lvl => lvl.id === this.activeLevelId) || this.levels[1];
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';

    this.container.innerHTML = `
      <div class="reading-lab-wrap">
        <!-- Header Banner Reading Lab -->
        <div class="book-hero-banner" style="
          background: linear-gradient(135deg, rgba(14, 116, 144, 0.08), rgba(6, 182, 212, 0.12));
          border: 1.5px solid rgba(6, 182, 212, 0.35);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        ">
          <div class="book-cover-frame" style="position:relative; flex-shrink:0;">
            <img src="assets/img/covers/14_60Jam_PintarBaca.png" onerror="this.src='assets/img/covers/05_Cali_Stung.png'" alt="Cover 60 Jam Pintar Baca Tanpa Dieja" style="
              width: 120px;
              height: 168px;
              object-fit: cover;
              border-radius: 12px;
              box-shadow: 0 10px 24px rgba(6, 182, 212, 0.28);
              border: 2px solid #fff;
            ">
            <span style="position:absolute; bottom:-8px; right:-6px; background:#0e7490; color:#fff; font-size:10px; font-weight:900; padding:2px 8px; border-radius:6px;">
              SRC-14
            </span>
          </div>

          <div style="flex:1; min-width:260px;">
            <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:8px;">
              <span class="subject-badge" style="background:#0e7490; color:#fff; border:none; font-weight:800;">
                📖 Reading Acceleration Engine
              </span>
              <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); border-color:rgba(5,98,104,0.3); font-weight:700;">
                Metode 60 Jam Baca Tanpa Dieja · 10 Menit Setiap Belajar
              </span>
            </div>
            <h1 style="margin:0 0 6px; font-size:24px; font-weight:850; color:var(--ink);">
              ${isEn ? 'Reading Lab — Learn to Read Without Spelling' : 'Reading Lab — Pintar Membaca Tanpa Mengeja'}
            </h1>
            <p style="margin:0 0 12px; font-size:13.5px; color:var(--muted); line-height:1.55;">
              ${isEn
                ? 'Target: recognize whole word sound units directly (IBU, not I-B-U). Structured across 12 levels.'
                : 'Prinsip: Mengenali unit bunyi suku kata & kata secara langsung (I-BU, bukan I-B-U). Disusun bertahap dalam 12 level percepatan membaca.'}
            </p>
            <div style="display:inline-flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:6px 14px; font-size:12px; font-weight:700;">
              <span>🎯 Level Aktif:</span>
              <strong style="color:var(--teal);">Level ${currentLevel.level} — ${currentLevel.title}</strong>
            </div>
          </div>
        </div>

        <!-- Peta 12 Level Progression (Horizontal Scroll Bar) -->
        <div style="margin-bottom:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <span style="font-size:13px; font-weight:800; color:var(--ink); text-transform:uppercase; letter-spacing:0.5px;">
              🗺️ Peta 12 Level Membaca Cepat
            </span>
            <span style="font-size:12px; color:var(--muted);">Geser untuk memilih level ➔</span>
          </div>
          <div class="custom-scroll" style="display:flex; gap:10px; overflow-x:auto; padding-bottom:10px;">
            ${this.levels.map(lvl => {
              const isSelected = lvl.id === currentLevel.id;
              return `
                <button class="btn-select-level" data-level-id="${lvl.id}" type="button" style="
                  flex: 0 0 auto;
                  min-width: 140px;
                  background: ${isSelected ? 'var(--teal)' : 'var(--card)'};
                  color: ${isSelected ? '#ffffff' : 'var(--ink)'};
                  border: 1.5px solid ${isSelected ? 'var(--teal)' : 'var(--line)'};
                  border-radius: 14px;
                  padding: 10px 14px;
                  text-align: left;
                  cursor: pointer;
                  box-shadow: ${isSelected ? '0 6px 16px rgba(5,98,104,0.3)' : '0 2px 6px rgba(0,0,0,0.03)'};
                  transition: all 0.2s ease;
                ">
                  <div style="font-size:11px; font-weight:800; opacity:${isSelected ? '0.9' : '0.6'}; margin-bottom:2px;">
                    LEVEL ${lvl.level}
                  </div>
                  <div style="font-size:13px; font-weight:800; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    ${lvl.title}
                  </div>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <!-- 8-Step Pedagogical Learning Flow Pill Bar -->
        <div style="background:var(--card); border:1px solid var(--line); border-radius:16px; padding:14px; margin-bottom:24px;">
          <div style="font-size:12px; font-weight:800; color:var(--muted); margin-bottom:8px; text-transform:uppercase;">
            Alur Pedagogis: SEE ➔ LISTEN ➔ SAY ➔ MATCH ➔ READ ➔ WRITE ➔ QUIZ ➔ MASTERED
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn ${this.currentStep === 'SEE' ? 'primary' : ''} btn-step" data-step="SEE" type="button" style="font-size:12px; padding:6px 14px;">
              👁️ 1. Lihat (SEE)
            </button>
            <button class="btn ${this.currentStep === 'LISTEN' ? 'primary' : ''} btn-step" data-step="LISTEN" type="button" style="font-size:12px; padding:6px 14px;">
              🔊 2. Dengar (LISTEN)
            </button>
            <button class="btn ${this.currentStep === 'WORD_BUILD' ? 'primary' : ''} btn-step" data-step="WORD_BUILD" type="button" style="font-size:12px; padding:6px 14px;">
              🧩 3. Rakit Kata (MATCH)
            </button>
            <button class="btn ${this.currentStep === 'QUIZ' ? 'primary' : ''} btn-step" data-step="QUIZ" type="button" style="font-size:12px; padding:6px 14px;">
              ⭐ 4. Kuis Latihan
            </button>
          </div>
        </div>

        <!-- Konten Interaktif Sesuai Step Aktif -->
        <div id="readingStepContainer" style="margin-bottom:30px;"></div>
      </div>
    `;

    this.attachEvents(currentLevel);
    this.renderCurrentStep(currentLevel);
  }

  attachEvents(currentLevel) {
    // Navigasi Level
    const levelBtns = this.container.querySelectorAll('.btn-select-level');
    levelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-level-id');
        if (id) {
          AudioFx.playTap();
          this.activeLevelId = id;
          this.currentStep = 'SEE';
          this.render();
        }
      });
    });

    // Navigasi Step
    const stepBtns = this.container.querySelectorAll('.btn-step');
    stepBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const step = btn.getAttribute('data-step');
        if (step) {
          AudioFx.playTap();
          this.currentStep = step;
          this.render();
        }
      });
    });
  }

  renderCurrentStep(level) {
    const wrap = this.container.querySelector('#readingStepContainer');
    if (!wrap) return;

    if (this.currentStep === 'SEE' || this.currentStep === 'LISTEN') {
      // Step 1 & 2: Kartu Suku Kata Bersuara
      wrap.innerHTML = `
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="margin:0; font-size:18px; font-weight:800; color:var(--ink);">
              ${this.currentStep === 'SEE' ? '👁️ Kenali & Perhatikan Bunyi Suku Kata' : '🔊 Dengarkan Pelafalan Fonik'}
            </h3>
            <button class="btn btn-tts" id="btnPlayAllPhonics" type="button" style="font-size:12px; padding:6px 12px;">
              🔊 Bunyikan Semua
            </button>
          </div>
          <p style="font-size:13.5px; color:var(--muted); line-height:1.5; margin:0 0 16px;">
            Klik kartu suku kata di bawah ini untuk mendengarkan bunyinya langsung tanpa mengeja huruf satu per satu:
          </p>

          <div id="syllablesGrid"></div>

          ${level.sampleWords ? `
            <div style="margin-top:24px; padding-top:20px; border-top:1px solid var(--line);">
              <h4 style="margin:0 0 12px; font-size:15px; font-weight:800; color:var(--ink);">
                Contoh Kata Bermakna:
              </h4>
              <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr)); gap:12px;">
                ${level.sampleWords.map(w => `
                  <div class="word-card-clickable" data-word="${w.word}" style="
                    background:var(--paper);
                    border:1.5px solid var(--line);
                    border-radius:14px;
                    padding:12px;
                    text-align:center;
                    cursor:pointer;
                    transition:all 0.2s ease;
                  ">
                    <div style="font-size:32px; margin-bottom:4px;">${w.emoji || '🌟'}</div>
                    <strong style="display:block; font-size:16px; color:var(--ink);">${w.word}</strong>
                    <span style="font-size:11px; color:var(--muted);">${w.hint || ''}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="margin-top:24px; display:flex; justify-content:flex-end;">
            <button class="btn primary" id="btnGoToWordBuilder" type="button" style="font-size:13.5px; font-weight:800; padding:10px 20px;">
              Lanjut ke Rakit Kata (MATCH) ➔
            </button>
          </div>
        </div>
      `;

      const sylContainer = wrap.querySelector('#syllablesGrid');
      const syllablesToRender = level.syllables || level.vocabulary || ['ba', 'ca', 'da', 'ma', 'sa', 'ta'];
      InteractiveEngine.renderSyllableCards(sylContainer, syllablesToRender);

      // Klik contoh kata untuk bersuara
      const wordCards = wrap.querySelectorAll('.word-card-clickable');
      wordCards.forEach(c => {
        c.addEventListener('click', () => {
          const w = c.getAttribute('data-word');
          if (w) {
            AudioFx.playTap();
            TtsEngine.speak(w, 'id', 0.85);
          }
        });
      });

      const playAllBtn = wrap.querySelector('#btnPlayAllPhonics');
      if (playAllBtn) {
        playAllBtn.addEventListener('click', () => {
          const text = syllablesToRender.join(', ');
          TtsEngine.speak(text, 'id', 0.8);
        });
      }

      const nextBtn = wrap.querySelector('#btnGoToWordBuilder');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          this.currentStep = 'WORD_BUILD';
          this.render();
        });
      }
    } else if (this.currentStep === 'WORD_BUILD') {
      // Step 3: Interactive Word Builder
      const sample = (level.sampleWords && level.sampleWords[0]) || { word: 'MATA', parts: ['ma', 'ta'], emoji: '👀' };
      wrap.innerHTML = `
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="margin:0; font-size:18px; font-weight:800; color:var(--ink);">
              🧩 Word Builder — Rakit Suku Kata Menjadi Kata
            </h3>
            <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink);">
              Metode Kata Utuh
            </span>
          </div>
          <p style="font-size:13.5px; color:var(--muted); line-height:1.5; margin:0 0 16px;">
            Pilih potongan suku kata secara berurutan untuk merangkai kata yang tepat:
          </p>

          <div id="wordBuilderTarget"></div>

          <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn" id="btnBackToSee" type="button">← Kembali ke Kartu</button>
            <button class="btn primary" id="btnGoToQuiz" type="button" style="font-weight:800;">
              Lanjut ke Kuis Latihan ⭐ ➔
            </button>
          </div>
        </div>
      `;

      const builderTarget = wrap.querySelector('#wordBuilderTarget');
      InteractiveEngine.renderWordBuilder(builderTarget, sample.word, sample.parts, sample.emoji, () => {
        store.incrementDailyChallenge();
      });

      wrap.querySelector('#btnBackToSee')?.addEventListener('click', () => {
        this.currentStep = 'SEE';
        this.render();
      });
      wrap.querySelector('#btnGoToQuiz')?.addEventListener('click', () => {
        this.currentStep = 'QUIZ';
        this.render();
      });
    } else if (this.currentStep === 'QUIZ') {
      // Step 4: Mini Quiz Level Ini
      wrap.innerHTML = `
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h3 style="margin:0; font-size:18px; font-weight:800; color:var(--ink);">
              ⭐ Kuis Cepat: ${level.title}
            </h3>
            <span class="subject-badge" style="background:#fef3c7; color:#b45309;">
              3 Latihan Interaktif
            </span>
          </div>

          <div id="readingQuizContainer">
            <div class="reading-question-card" style="margin-bottom:20px;">
              <p style="font-size:16px; font-weight:800; color:var(--ink); margin-bottom:12px;">
                1. Manakah kata yang dibentuk dari suku kata "MA" + "TA"?
              </p>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:10px;">
                <button class="btn quiz-opt" data-ans="correct" type="button" style="padding:12px; font-size:16px; font-weight:800;">
                  👀 MATA
                </button>
                <button class="btn quiz-opt" data-ans="wrong" type="button" style="padding:12px; font-size:16px; font-weight:800;">
                  🧱 BATA
                </button>
                <button class="btn quiz-opt" data-ans="wrong" type="button" style="padding:12px; font-size:16px; font-weight:800;">
                  🧢 TOPI
                </button>
              </div>
            </div>

            <div class="feedback-banner" id="quizFeedback" style="display:none; margin-top:16px;"></div>
          </div>

          <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn" id="btnBackToBuilder" type="button">← Kembali ke Builder</button>
            <button class="btn primary" id="btnCompleteLevel" type="button" style="background:var(--green); border-color:var(--green); font-weight:800;">
              🎉 Selesaikan Level & Klaim Bintang!
            </button>
          </div>
        </div>
      `;

      const opts = wrap.querySelectorAll('.quiz-opt');
      const feedback = wrap.querySelector('#quizFeedback');

      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          const isCorrect = opt.getAttribute('data-ans') === 'correct';
          if (feedback) {
            feedback.style.display = 'flex';
            if (isCorrect) {
              feedback.className = 'feedback-banner success show';
              feedback.innerHTML = `<strong>${InteractiveEngine.getFeedbackMessage(true)}</strong> Pilihanmu tepat sekali!`;
              AudioFx.playCorrect();
              opt.style.background = 'var(--green)';
              opt.style.color = '#fff';
            } else {
              feedback.className = 'feedback-banner error show';
              feedback.innerHTML = `<strong>${InteractiveEngine.getFeedbackMessage(false)}</strong> Coba baca sekali lagi ya.`;
              AudioFx.playError();
            }
          }
        });
      });

      wrap.querySelector('#btnBackToBuilder')?.addEventListener('click', () => {
        this.currentStep = 'WORD_BUILD';
        this.render();
      });

      wrap.querySelector('#btnCompleteLevel')?.addEventListener('click', () => {
        AudioFx.playCelebration();
        store.addStar(5);
        store.incrementDailyChallenge();
        alert('Selamat! Kamu berhasil menuntaskan level ini dan mendapatkan 5 Bintang Juara! ⭐⭐⭐⭐⭐');
      });
    }
  }
}

