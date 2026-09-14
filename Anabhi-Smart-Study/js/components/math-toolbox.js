// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Math Toolbox Master Component (10 Strategy Families)
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:50:00
// ================================================================

import { MathEngine } from '../engine/math-engine.js';
import { AudioFx } from '../engine/audio-fx.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { appState } from '../state.js';

export class MathToolboxComponent {
  constructor(container) {
    this.container = container;
    this.numA = 67;
    this.numB = 59;
    this.activeStrategy = 'makeHundred'; // decomposition, makeHundred, compensation, numberLine, baseTen, mentalMath, tensFrame, rekenrek, jarimatika, numberBonds
  }

  render() {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const solved = MathEngine.solve(this.numA, this.numB, lang);

    const strategies = [
      { id: 'makeHundred', name: 'Jurus 1: Make 100 (Jadikan Ratusan)', icon: '💯', badge: 'Flagship Blueprint' },
      { id: 'decomposition', name: 'Jurus 2: Pecah Nilai Tempat', icon: '🧩', badge: 'Place Value' },
      { id: 'compensation', name: 'Jurus 3: Kompensasi (Pinjam & Kembalikan)', icon: '⚖️', badge: 'Rounding' },
      { id: 'numberLine', name: 'Jurus 4: Garis Bilangan (Lompat Angka)', icon: '📏', badge: 'Visual Jump' },
      { id: 'baseTen', name: 'Jurus 5: Balok Basis Sepuluh', icon: '🧱', badge: 'Block Model' },
      { id: 'mentalMath', name: 'Jurus 6: Hitung Cepat Otak (Mental Math)', icon: '🧠', badge: 'Speed Trick' },
      { id: 'tensFrame', name: 'Jurus 7: Kotak Sepuluh (Tens Frame)', icon: '🔲', badge: 'Early Math' },
      { id: 'rekenrek', name: 'Jurus 8: Manik-Manik Rekenrek', icon: '🔴', badge: 'Beads Count' },
      { id: 'jarimatika', name: 'Jurus 9: Jarimatika Tangan Ceria', icon: '✋', badge: 'Finger Math' },
      { id: 'numberBonds', name: 'Jurus 10: Ikatan Angka (Number Bonds)', icon: '🔗', badge: 'Singapore Math' }
    ];

    const currentStratData = solved[this.activeStrategy] || solved.makeHundred;

    this.container.innerHTML = `
      <div class="math-toolbox-wrap">
        <!-- Header Banner Math Toolbox -->
        <div class="book-hero-banner" style="
          background: linear-gradient(135deg, rgba(5, 98, 104, 0.08), rgba(91, 224, 223, 0.12));
          border: 1.5px solid rgba(91, 224, 223, 0.4);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        ">
          <div>
            <div class="eyebrow"><span class="no">🧮</span><span class="lbl">MATH TOOLBOX — 10 JURUS BERHITUNG</span></div>
            <h1 style="margin:0 0 6px; font-size:24px; font-weight:850; color:var(--ink);">
              ${isEn ? 'Interactive Math Toolbox — 10 Calculation Jurus' : 'Math Toolbox — 10 Jurus Berhitung Visual Cepat'}
            </h1>
            <p style="margin:0; font-size:13.5px; color:var(--muted); max-width:620px; line-height:1.55;">
              ${isEn
                ? 'Deterministic arithmetic strategies. See how 67 + 59 = 126 is solved through 10 intuitive visual lenses!'
                : 'Aritmatika deterministik tanpa kalkulator biasa. Lihat bagaimana 67 + 59 = 126 dipecahkan lewat 10 sudut pandang cerdas!'}
            </p>
          </div>

          <!-- Quick Preset Buttons -->
          <div style="display:flex; gap:8px; align-items:center;">
            <button class="btn btn-preset" data-a="67" data-b="59" type="button" style="font-weight:800; font-size:13px; background:var(--teal); color:#fff;">
              ⭐ 67 + 59 (Flagship)
            </button>
            <button class="btn btn-preset" data-a="48" data-b="35" type="button" style="font-weight:800; font-size:13px;">
              48 + 35
            </button>
            <button class="btn btn-preset" data-a="25" data-b="18" type="button" style="font-weight:800; font-size:13px;">
              25 + 18
            </button>
          </div>
        </div>

        <!-- Input Bar Penjumlahan Deterministik -->
        <div class="quiz-box" style="background:var(--card); border:1px solid var(--line); border-radius:18px; padding:20px; margin-bottom:24px;">
          <div style="display:flex; align-items:center; justify-content:center; gap:16px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:8px;">
              <label for="inputNumA" style="font-size:13px; font-weight:700; color:var(--muted);">Angka 1:</label>
              <input type="number" id="inputNumA" value="${this.numA}" min="1" max="999" style="
                width: 90px;
                padding: 8px 12px;
                font-size: 20px;
                font-weight: 800;
                text-align: center;
                border: 2px solid var(--line);
                border-radius: 12px;
                background: var(--paper);
                color: var(--ink);
              ">
            </div>

            <span style="font-size:24px; font-weight:900; color:var(--teal);">+</span>

            <div style="display:flex; align-items:center; gap:8px;">
              <label for="inputNumB" style="font-size:13px; font-weight:700; color:var(--muted);">Angka 2:</label>
              <input type="number" id="inputNumB" value="${this.numB}" min="1" max="999" style="
                width: 90px;
                padding: 8px 12px;
                font-size: 20px;
                font-weight: 800;
                text-align: center;
                border: 2px solid var(--line);
                border-radius: 12px;
                background: var(--paper);
                color: var(--ink);
              ">
            </div>

            <span style="font-size:24px; font-weight:900; color:var(--muted);">=</span>

            <div style="
              background: var(--teal-soft);
              border: 2px solid var(--teal);
              color: var(--teal-soft-ink);
              border-radius: 12px;
              padding: 8px 20px;
              font-size: 24px;
              font-weight: 900;
              min-width: 90px;
              text-align: center;
            ">
              ${solved.sum}
            </div>

            <button class="btn btn-tts" id="btnSpeakMathSolve" type="button" style="padding:10px 16px; font-size:13px; font-weight:700;">
              🔊 Bunyikan Penjelasan
            </button>
          </div>
        </div>

        <!-- Strategy Tabs Grid -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px; margin-bottom:24px;">
          ${strategies.map(strat => {
            const isSelected = strat.id === this.activeStrategy;
            return `
              <button class="btn btn-strat-tab" data-strat="${strat.id}" type="button" style="
                background: ${isSelected ? 'var(--teal)' : 'var(--card)'};
                color: ${isSelected ? '#ffffff' : 'var(--ink)'};
                border: 1.5px solid ${isSelected ? 'var(--teal)' : 'var(--line)'};
                border-radius: 12px;
                padding: 12px 14px;
                text-align: left;
                cursor: pointer;
                box-shadow: ${isSelected ? '0 6px 16px rgba(5,98,104,0.25)' : '0 2px 6px rgba(0,0,0,0.03)'};
                transition: all 0.18s ease;
              ">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                  <span style="font-size:18px;">${strat.icon}</span>
                  <span style="font-size:10px; opacity:${isSelected ? '0.9' : '0.6'}; font-weight:700;">${strat.badge}</span>
                </div>
                <strong style="font-size:13px; line-height:1.3; display:block;">${strat.name}</strong>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Strategy Step Breakdown Box -->
        <div class="quiz-box" style="background:var(--card); border:1.5px solid var(--teal); border-radius:20px; padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <h3 style="margin:0; font-size:19px; font-weight:850; color:var(--ink);">
              ${currentStratData.title || 'Langkah Pemecahan Jurus'}
            </h3>
            <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); font-weight:800;">
              ${currentStratData.badge || 'Langkah Berhitung'}
            </span>
          </div>

          <div style="font-size:15px; color:var(--ink); line-height:1.8; margin-bottom:18px;">
            ${currentStratData.step1 ? `<div style="margin-bottom:8px; padding:8px 12px; background:var(--paper); border-radius:10px;">📌 <strong>Langkah 1:</strong> ${currentStratData.step1}</div>` : ''}
            ${currentStratData.step2 ? `<div style="margin-bottom:8px; padding:8px 12px; background:var(--paper); border-radius:10px;">📌 <strong>Langkah 2:</strong> ${currentStratData.step2}</div>` : ''}
            ${currentStratData.step3 ? `<div style="margin-bottom:8px; padding:8px 12px; background:var(--paper); border-radius:10px;">📌 <strong>Langkah 3:</strong> ${currentStratData.step3}</div>` : ''}
            ${currentStratData.stepFinal ? `<div style="margin-top:12px; padding:12px; background:var(--teal-soft); border-radius:12px; font-weight:800; color:var(--teal-soft-ink); font-size:16px;">🎯 <strong>Hasil Akhir:</strong> ${currentStratData.stepFinal}</div>` : ''}
          </div>

          ${currentStratData.visual ? `
            <div style="margin-top:16px; padding:16px; background:var(--paper); border-radius:14px; text-align:center;">
              ${currentStratData.visual}
            </div>
          ` : ''}
        </div>
      </div>
    `;

    this.attachEvents(solved);
  }

  attachEvents(solved) {
    // Preset buttons
    const presetBtns = this.container.querySelectorAll('.btn-preset');
    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.numA = parseInt(btn.getAttribute('data-a'), 10) || 67;
        this.numB = parseInt(btn.getAttribute('data-b'), 10) || 59;
        AudioFx.playTap();
        this.render();
      });
    });

    // Inputs
    const inputA = this.container.querySelector('#inputNumA');
    const inputB = this.container.querySelector('#inputNumB');

    const handleInput = () => {
      this.numA = parseInt(inputA.value, 10) || 0;
      this.numB = parseInt(inputB.value, 10) || 0;
      this.render();
    };

    inputA?.addEventListener('change', handleInput);
    inputB?.addEventListener('change', handleInput);

    // Strategy tabs
    const stratBtns = this.container.querySelectorAll('.btn-strat-tab');
    stratBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.activeStrategy = btn.getAttribute('data-strat') || 'makeHundred';
        AudioFx.playTap();
        this.render();
      });
    });

    // TTS
    this.container.querySelector('#btnSpeakMathSolve')?.addEventListener('click', () => {
      const text = `${this.numA} ditambah ${this.numB} sama dengan ${solved.sum}. Mari kita hitung bersama!`;
      TtsEngine.speak(text, 'id', 0.85);
    });
  }
}
