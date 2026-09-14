// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Interactive Question & Word Engine
// Development · Anabhi Dev
// Version   : 1.0 (Master Blueprint Implementation)
// Generated : 14 September 2026, 23:28:00
// ================================================================

import { AudioFx } from './audio-fx.js';
import { TtsEngine } from './tts-engine.js';
import { store } from '../store.js';

export class InteractiveEngine {
  /**
   * Render Syllable Cards (Kartu Suku Kata Bersuara)
   * Anak bisa klik kartu untuk mendengar pelafalan fonik langsung (Audio TTS).
   */
  static renderSyllableCards(container, syllables = [], onCardClick = null) {
    if (!container) return;

    container.innerHTML = `
      <div class="syllable-card-grid" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(80px, 1fr)); gap:12px; margin:16px 0;">
        ${syllables.map(syl => `
          <button class="syllable-card-btn" data-syllable="${syl}" type="button" style="
            background:var(--card);
            border:2px solid var(--line);
            border-radius:14px;
            padding:14px 8px;
            font-size:22px;
            font-weight:900;
            color:var(--ink);
            cursor:pointer;
            transition:all 0.18s ease;
            box-shadow:0 4px 10px rgba(0,0,0,0.04);
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:4px;
          ">
            <span>${syl.toUpperCase()}</span>
            <span style="font-size:10px; color:var(--muted); font-weight:700;">🔊 Dengar</span>
          </button>
        `).join('')}
      </div>
    `;

    const btns = container.querySelectorAll('.syllable-card-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const syl = btn.getAttribute('data-syllable');
        if (!syl) return;

        // Efek visual tekan
        btn.style.transform = 'scale(0.92)';
        btn.style.borderColor = 'var(--teal)';
        btn.style.background = 'var(--teal-soft)';
        setTimeout(() => {
          btn.style.transform = 'none';
        }, 180);

        // Suara pelafalan
        TtsEngine.speak(syl, 'id', 0.85);

        if (typeof onCardClick === 'function') {
          onCardClick(syl);
        }
      });
    });
  }

  /**
   * Render Word Builder (Penyusun Kata Suku Kata Interaktif)
   * Contoh: Anak memilih [MA] + [TA] -> MATA!
   */
  static renderWordBuilder(container, targetWord, parts = [], emoji = '🌟', onComplete = null) {
    if (!container) return;

    let selectedParts = [];
    // Acak suku kata agar anak memilih urutan yang benar
    const shuffledParts = [...parts].sort(() => Math.random() - 0.5);

    function updateView() {
      const isFull = selectedParts.length === parts.length;
      const assembledWord = selectedParts.join('').toUpperCase();
      const isCorrect = assembledWord === targetWord.toUpperCase();

      container.innerHTML = `
        <div class="word-builder-box" style="background:var(--card); border:2px dashed var(--line); border-radius:20px; padding:22px; text-align:center; margin:16px 0;">
          <div style="font-size:48px; margin-bottom:10px;">${emoji}</div>
          <div style="font-size:14px; font-weight:700; color:var(--muted); margin-bottom:14px;">
            Susun suku kata untuk membentuk kata: <strong style="color:var(--ink); font-size:18px;">${targetWord.toUpperCase()}</strong>
          </div>

          <!-- Slot Hasil Rakitan -->
          <div style="display:flex; justify-content:center; gap:10px; min-height:58px; margin-bottom:18px; align-items:center;">
            ${parts.map((p, idx) => {
              const currentVal = selectedParts[idx] || '';
              return `
                <div style="
                  min-width:64px;
                  height:52px;
                  border:2.5px solid ${currentVal ? 'var(--teal)' : 'var(--line)'};
                  background:${currentVal ? 'var(--teal-soft)' : 'var(--paper)'};
                  color:${currentVal ? 'var(--teal-soft-ink)' : 'transparent'};
                  border-radius:12px;
                  display:grid;
                  place-items:center;
                  font-size:22px;
                  font-weight:900;
                  transition:all 0.2s ease;
                ">
                  ${currentVal.toUpperCase()}
                </div>
              `;
            }).join('')}
          </div>

          <!-- Pilihan Suku Kata Tersedia -->
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:18px;">
            ${shuffledParts.map((syl, i) => {
              const alreadyUsed = selectedParts.includes(syl);
              return `
                <button class="btn-part-choice" data-syl="${syl}" type="button" ${alreadyUsed ? 'disabled' : ''} style="
                  font-size:20px;
                  font-weight:900;
                  padding:10px 22px;
                  border-radius:14px;
                  border:2px solid var(--line);
                  background:${alreadyUsed ? 'var(--line)' : 'var(--card)'};
                  color:${alreadyUsed ? 'var(--muted)' : 'var(--ink)'};
                  cursor:${alreadyUsed ? 'default' : 'pointer'};
                  box-shadow:${alreadyUsed ? 'none' : '0 4px 10px rgba(0,0,0,0.06)'};
                  transition:all 0.15s ease;
                ">
                  ${syl.toUpperCase()}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Umpan Balik / Tombol Reset -->
          <div style="min-height:36px; display:flex; justify-content:center; align-items:center; gap:12px;">
            ${isFull ? (
              isCorrect ? `
                <span style="font-size:16px; font-weight:800; color:var(--green);">
                  🎉 Mantap! Kata "${targetWord.toUpperCase()}" berhasil dirangkai!
                </span>
              ` : `
                <span style="font-size:14px; font-weight:700; color:var(--red);">
                  Belum pas 😊, yuk coba lagi!
                </span>
                <button class="btn btn-reset-builder" type="button" style="font-size:12px; padding:4px 12px;">Ulangi ↺</button>
              `
            ) : `
              <button class="btn btn-reset-builder" type="button" style="font-size:12px; padding:4px 12px; opacity:0.8;">Hapus Semua ↺</button>
            `}
          </div>
        </div>
      `;

      // Event listener tombol pilihan
      const partBtns = container.querySelectorAll('.btn-part-choice:not([disabled])');
      partBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const syl = btn.getAttribute('data-syl');
          if (syl && selectedParts.length < parts.length) {
            selectedParts.push(syl);
            AudioFx.playTap();
            TtsEngine.speak(syl, 'id', 0.85);
            updateView();

            if (selectedParts.length === parts.length) {
              const finalWord = selectedParts.join('').toUpperCase();
              if (finalWord === targetWord.toUpperCase()) {
                AudioFx.playCelebration();
                store.addStar();
                setTimeout(() => {
                  TtsEngine.speak(targetWord, 'id', 0.85);
                  if (typeof onComplete === 'function') onComplete(targetWord);
                }, 400);
              } else {
                AudioFx.playError();
              }
            }
          }
        });
      });

      // Tombol reset
      const resetBtn = container.querySelector('.btn-reset-builder');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          selectedParts = [];
          AudioFx.playTap();
          updateView();
        });
      }
    }

    updateView();
  }

  /**
   * Helper Umpan Balik Ceria Anak Indonesia
   */
  static getFeedbackMessage(isCorrect) {
    if (isCorrect) {
      const msgs = ['Mantap! 🎉', 'Yes! Benar!', 'Keren!', 'Hebat Sekali! ⭐', 'Pintar Banget! 🌟'];
      return msgs[Math.floor(Math.random() * msgs.length)];
    } else {
      const msgs = ['Belum pas 😊', 'Coba lihat lagi ya.', 'Hampir! Yuk coba sekali lagi.', 'Semangat! Bisa kok! 💪'];
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
}
