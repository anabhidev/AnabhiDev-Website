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
    this.currentStep = 'SEE'; // SEE, LISTEN, SAY, MATCH, QUIZ
    this.currentSayIndex = 0;
    this.isListening = false;
    this.echoAudioUrl = null;
    this.isRecordingEcho = false;
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
            <img src="assets/img/covers/14_60Jam_PintarBaca.png" onerror="this.src='assets/img/covers/05_Cali_Stung.png'" alt="Cover 60 Jam Pintar Baca Tanpa Dieja" width="120" height="168" loading="lazy" decoding="async" style="
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
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:4px;">
              <div style="display:inline-flex; align-items:center; gap:8px; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:6px 14px; font-size:12px; font-weight:700;">
                <span>🎯 Level Aktif:</span>
                <strong style="color:var(--teal);">Level ${currentLevel.level} — ${currentLevel.title}</strong>
              </div>
              <button class="btn" id="btnOpenReadingFlashcards" type="button" aria-label="Cetak Lembar Kartu Pintar Fonik A6" style="font-size:12px; font-weight:800; padding:7px 14px; background:#fff; color:#0e7490; border:1.5px solid #0e7490; border-radius:10px; box-shadow:0 2px 6px rgba(14,116,144,0.12);">
                🎴 Cetak Kartu Pintar (Flashcard A6)
              </button>
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
                <button class="btn-select-level" data-level-id="${lvl.id}" type="button" aria-label="Pilih Level ${lvl.level}: ${lvl.title}" style="
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
            Alur Pedagogis: SEE ➔ LISTEN ➔ SAY ➔ MATCH ➔ QUIZ ➔ MASTERED
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button class="btn ${this.currentStep === 'SEE' ? 'primary' : ''} btn-step" data-step="SEE" type="button" aria-label="Langkah 1: Lihat Huruf dan Suku Kata" style="font-size:12px; padding:6px 14px;">
              👁️ 1. Lihat (SEE)
            </button>
            <button class="btn ${this.currentStep === 'LISTEN' ? 'primary' : ''} btn-step" data-step="LISTEN" type="button" aria-label="Langkah 2: Dengar Pelafalan Fonik" style="font-size:12px; padding:6px 14px;">
              🔊 2. Dengar (LISTEN)
            </button>
            <button class="btn ${this.currentStep === 'SAY' ? 'primary' : ''} btn-step" data-step="SAY" type="button" aria-label="Langkah 3: Ucapkan dan Cek Suara" style="font-size:12px; padding:6px 14px;">
              🎙️ 3. Ucapkan (SAY)
            </button>
            <button class="btn ${this.currentStep === 'WORD_BUILD' ? 'primary' : ''} btn-step" data-step="WORD_BUILD" type="button" aria-label="Langkah 4: Rakit Potongan Kata" style="font-size:12px; padding:6px 14px;">
              🧩 4. Rakit Kata (MATCH)
            </button>
            <button class="btn ${this.currentStep === 'QUIZ' ? 'primary' : ''} btn-step" data-step="QUIZ" type="button" aria-label="Langkah 5: Kuis Latihan Pemahaman" style="font-size:12px; padding:6px 14px;">
              ⭐ 5. Kuis Latihan
            </button>
          </div>
        </div>

        <!-- Konten Interaktif Sesuai Step Aktif -->
        <div id="readingStepContainer" style="margin-bottom:30px;"></div>
      </div>
    `;

    this.attachEvents(currentLevel);
    this.renderCurrentStep(currentLevel);
    if (window.app && typeof window.app.ensureFooter === 'function') {
      window.app.ensureFooter(lang);
    }
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

    // Buka Lembar Cetak Kartu Pintar Fonik A6
    const flashcardsBtn = this.container.querySelector('#btnOpenReadingFlashcards');
    if (flashcardsBtn) {
      flashcardsBtn.addEventListener('click', () => {
        AudioFx.playTap();
        (window.lksModal || this.lksModal)?.openFlashcardsWorksheet();
      });
    }
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
            <button class="btn primary" id="btnGoToSay" type="button" aria-label="Lanjut ke Ucapkan Fonik" style="font-size:13.5px; font-weight:800; padding:10px 20px;">
              Lanjut ke Ucapkan (SAY) 🎙️ ➔
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

      const goToSayBtn = wrap.querySelector('#btnGoToSay');
      if (goToSayBtn) {
        goToSayBtn.addEventListener('click', () => {
          AudioFx.playTap();
          this.currentStep = 'SAY';
          this.render();
        });
      }
    } else if (this.currentStep === 'SAY') {
      // Step 3: Interactive Speech Recognition & Phonics Assessment
      const sayItems = (level.sampleWords && level.sampleWords.length > 0)
        ? level.sampleWords
        : (level.syllables || ['ba', 'ca', 'da']).map(s => ({ word: s.toUpperCase(), hint: `Suku kata ${s}`, emoji: '🗣️' }));
      const currentItem = sayItems[this.currentSayIndex % sayItems.length];

      wrap.innerHTML = `
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line); text-align:center;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="margin:0; font-size:18px; font-weight:800; color:var(--ink);">
              🎙️ Ucapkan &amp; Cek Fonik (Voice Recognition)
            </h3>
            <span class="subject-badge" style="background:#edfbf2; color:#1e7b45; font-weight:800;">
              Latihan Mandiri #${(this.currentSayIndex % sayItems.length) + 1} / ${sayItems.length}
            </span>
          </div>

          <p style="font-size:13.5px; color:var(--muted); line-height:1.5; margin:0 0 20px;">
            Ayo ucapkan kata di bawah ini dengan jelas! Klik tombol mikrofon, lalu bicaralah dengan percaya diri:
          </p>

          <!-- Kartu Kata Target Besar -->
          <div style="background:linear-gradient(135deg, rgba(14, 116, 144, 0.05), rgba(6, 182, 212, 0.08)); border:2px dashed var(--teal); border-radius:20px; padding:28px 20px; margin:0 auto 20px; max-width:440px;">
            <div style="font-size:42px; margin-bottom:6px;">${currentItem.emoji || '🗣️'}</div>
            <div style="font-size:52px; font-weight:950; color:var(--teal); letter-spacing:2px; line-height:1.1;">
              ${currentItem.word}
            </div>
            <div style="font-size:13.5px; font-weight:700; color:var(--muted); margin-top:8px;">
              ${currentItem.hint || 'Bacalah langsung tanpa dieja'}
            </div>
          </div>

          <!-- Tombol Aksi Suara -->
          <div style="display:flex; justify-content:center; align-items:center; gap:12px; flex-wrap:wrap; margin-bottom:16px;">
            <button class="btn primary" id="btnTriggerSpeech" type="button" aria-label="Mulai bicara lewat mikrofon" style="font-size:15px; font-weight:850; padding:12px 28px; border-radius:14px; display:inline-flex; align-items:center; gap:8px;">
              <span id="speechMicIcon">🎙️</span> <span id="speechMicLabel">Mulai Bicara</span>
            </button>
            <button class="btn" id="btnHearSampleVoice" type="button" aria-label="Dengarkan contoh pelafalan" style="font-size:13px; font-weight:750; padding:11px 18px;">
              🔊 Dengarkan Contoh
            </button>
            <button class="btn" id="btnEchoVoice" type="button" aria-label="Rekam dan dengarkan suaraku" style="font-size:13px; font-weight:750; padding:11px 18px; border-radius:14px; display:inline-flex; align-items:center; gap:6px;">
              <span id="echoIcon">${this.echoAudioUrl ? '▶️' : '⏺️'}</span> <span id="echoLabel">${this.echoAudioUrl ? 'Putar Suaraku 🎧' : 'Rekam Suaraku'}</span>
            </button>
          </div>

          <!-- Kotak Umpan Balik Hasil Pengucapan -->
          <div id="speechFeedbackBox" style="min-height:48px; padding:10px 16px; border-radius:12px; background:var(--paper); border:1px solid var(--line); font-size:13.5px; font-weight:700; color:var(--muted); max-width:500px; margin:0 auto 20px; display:flex; align-items:center; justify-content:center;">
            Klik "Mulai Bicara" dan ucapkan kata di atas! 🌟
          </div>

          <!-- Navigasi Kata -->
          <div style="display:flex; justify-content:center; gap:10px; margin-bottom:24px;">
            <button class="btn" id="btnPrevSayItem" type="button" aria-label="Kata Sebelumnya">← Kata Sebelumnya</button>
            <button class="btn" id="btnNextSayItem" type="button" aria-label="Kata Berikutnya">Kata Berikutnya ➔</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--line); padding-top:16px;">
            <button class="btn" id="btnBackToListen" type="button">← Kembali ke Dengar (LISTEN)</button>
            <button class="btn primary" id="btnGoToWordBuilderFromSay" type="button" style="font-weight:800;">
              Lanjut ke Rakit Kata (MATCH) ➔
            </button>
          </div>
        </div>
      `;

      // Event Listeners SAY
      wrap.querySelector('#btnHearSampleVoice')?.addEventListener('click', () => {
        AudioFx.playTap();
        TtsEngine.speak(currentItem.word, 'id', 0.85);
      });

      wrap.querySelector('#btnPrevSayItem')?.addEventListener('click', () => {
        AudioFx.playTap();
        this.currentSayIndex = (this.currentSayIndex - 1 + sayItems.length) % sayItems.length;
        this.render();
      });

      wrap.querySelector('#btnNextSayItem')?.addEventListener('click', () => {
        AudioFx.playTap();
        this.currentSayIndex = (this.currentSayIndex + 1) % sayItems.length;
        this.render();
      });

      wrap.querySelector('#btnBackToListen')?.addEventListener('click', () => {
        AudioFx.playTap();
        this.currentStep = 'LISTEN';
        this.render();
      });

      wrap.querySelector('#btnGoToWordBuilderFromSay')?.addEventListener('click', () => {
        AudioFx.playTap();
        this.currentStep = 'WORD_BUILD';
        this.render();
      });

      // Voice recognition
      const speechBtn = wrap.querySelector('#btnTriggerSpeech');
      const feedbackBox = wrap.querySelector('#speechFeedbackBox');
      const micIcon = wrap.querySelector('#speechMicIcon');
      const micLabel = wrap.querySelector('#speechMicLabel');

      if (speechBtn) {
        speechBtn.addEventListener('click', () => {
          const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
          if (!SpeechRec) {
            alert('Fitur input suara mikrofon didukung penuh di Google Chrome, Edge, Safari, dan Android!');
            return;
          }

          try {
            const rec = new SpeechRec();
            rec.lang = 'id-ID';
            rec.continuous = false;
            rec.interimResults = false;

            rec.onstart = () => {
              if (micIcon) micIcon.textContent = '🔴';
              if (micLabel) micLabel.textContent = 'Mendengarkan... Silakan bicara!';
              if (feedbackBox) {
                feedbackBox.style.background = '#fef3c7';
                feedbackBox.style.color = '#b45309';
                feedbackBox.style.borderColor = '#fde68a';
                feedbackBox.innerHTML = '🎤 Sedang mendengarkan... Ucapkan sekarang!';
              }
            };

            rec.onresult = (e) => {
              const transcript = (e.results[0][0].transcript || '').trim();
              const cleanSpoken = transcript.toLowerCase().replace(/[^a-z0-9]/g, '');
              const cleanTarget = currentItem.word.toLowerCase().replace(/[^a-z0-9]/g, '');

              const isMatch = cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken);

              if (isMatch) {
                AudioFx.playStarSparkle();
                AudioFx.playSuccess();
                AudioFx.triggerConfetti();
                store.addStars(1);
                if (feedbackBox) {
                  feedbackBox.style.background = '#edfbf2';
                  feedbackBox.style.color = '#15803d';
                  feedbackBox.style.borderColor = '#86efac';
                  feedbackBox.innerHTML = `🎉 <strong>Luar Biasa!</strong> Pengucapanmu tepat: "<em>${transcript}</em>" (+1 ⭐)`;
                }
              } else {
                AudioFx.playGentleWrong();
                if (feedbackBox) {
                  feedbackBox.style.background = '#fef2f2';
                  feedbackBox.style.color = '#b91c1c';
                  feedbackBox.style.borderColor = '#fecaca';
                  feedbackBox.innerHTML = `Terdengar: "<em>${transcript}</em>". Ayo coba lagi ucapkan: "<strong>${currentItem.word}</strong>"!`;
                }
              }
            };

            rec.onerror = (err) => {
              if (feedbackBox) {
                feedbackBox.style.background = 'var(--paper)';
                feedbackBox.style.color = 'var(--muted)';
                feedbackBox.textContent = 'Belum terdengar jelas. Coba klik lagi dan bicara lebih dekat ke mikrofon! 🎙️';
              }
            };

            rec.onend = () => {
              if (micIcon) micIcon.textContent = '🎙️';
              if (micLabel) micLabel.textContent = 'Mulai Bicara';
            };

            rec.start();
          } catch (err) {
            console.warn('[SpeechRec] Error starting:', err);
          }
        });
      }

      // Voice Echo Studio (Rekam & Dengarkan Suaramu Sendiri)
      const echoBtn = wrap.querySelector('#btnEchoVoice');
      const echoIcon = wrap.querySelector('#echoIcon');
      const echoLabel = wrap.querySelector('#echoLabel');

      if (echoBtn) {
        echoBtn.addEventListener('click', async () => {
          if (this.echoAudioUrl && !this.isRecordingEcho) {
            AudioFx.playTap();
            try {
              const audio = new Audio(this.echoAudioUrl);
              audio.play();
              if (feedbackBox) {
                feedbackBox.style.background = '#edfbf2';
                feedbackBox.style.color = '#15803d';
                feedbackBox.innerHTML = '🎧 <em>Memutar rekaman suaramu... Suaramu jelas & hebat!</em>';
              }
            } catch (e) {
              console.warn('[Echo] Gagal memutar audio:', e);
            }
            return;
          }

          if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('Fitur perekaman suara memerlukan browser modern dengan mikrofon.');
            return;
          }

          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            const chunks = [];

            mediaRecorder.ondataavailable = (e) => {
              if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
              const blob = new Blob(chunks, { type: 'audio/webm' });
              if (this.echoAudioUrl) URL.revokeObjectURL(this.echoAudioUrl);
              this.echoAudioUrl = URL.createObjectURL(blob);
              this.isRecordingEcho = false;
              if (echoIcon) echoIcon.textContent = '▶️';
              if (echoLabel) echoLabel.textContent = 'Putar Suaraku 🎧';
              if (feedbackBox) {
                feedbackBox.style.background = '#edfbf2';
                feedbackBox.style.color = '#15803d';
                feedbackBox.style.borderColor = '#86efac';
                feedbackBox.innerHTML = '✨ <strong>Suaramu Berhasil Direkam!</strong> Klik tombol <strong>"Putar Suaraku 🎧"</strong> untuk mendengarkan!';
              }
              AudioFx.playStarSparkle();
              store.addStars(1);
            };

            mediaRecorder.start();
            this.isRecordingEcho = true;
            if (echoIcon) echoIcon.textContent = '⏹️';
            if (echoLabel) echoLabel.textContent = 'Merekam... (3 detik)';
            if (feedbackBox) {
              feedbackBox.style.background = '#fef3c7';
              feedbackBox.style.color = '#b45309';
              feedbackBox.style.borderColor = '#fde68a';
              feedbackBox.innerHTML = `🔴 <strong>Sedang Merekam Suaramu...</strong> Ucapkan: "<em>${currentItem.word}</em>" sekarang!`;
            }

            setTimeout(() => {
              if (mediaRecorder.state === 'recording') {
                mediaRecorder.stop();
                stream.getTracks().forEach(t => t.stop());
              }
            }, 3200);

          } catch (err) {
            console.warn('[Echo] Akses mic tidak tersedia:', err);
            if (feedbackBox) {
              feedbackBox.textContent = 'Mohon izinkan akses mikrofon di browser untuk merekam suara.';
            }
          }
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

