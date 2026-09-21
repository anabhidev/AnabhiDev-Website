// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Math Toolbox Master Component (14 Strategy Families)
// Development · Anabhi Dev
// Version   : 2.1 (Full 14 Visual Strategy Parity · SOP v2.4 & Standar Coding v2.0)
// Generated : 21 September 2026, 18:45:00
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
    this.activeStrategy = 'makeHundred';
  }

  render() {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const solved = MathEngine.solve(this.numA, this.numB, lang);

    const strategies = [
      { id: 'makeHundred', name: isEn ? 'Strategy 1: Make 100 (Round Up)' : 'Jurus 1: Make 100 (Jadikan Ratusan)', icon: '💯', badge: 'Flagship Blueprint' },
      { id: 'decomposition', name: isEn ? 'Strategy 2: Place Value Split' : 'Jurus 2: Pecah Nilai Tempat', icon: '🧩', badge: 'Place Value' },
      { id: 'compensation', name: isEn ? 'Strategy 3: Compensation' : 'Jurus 3: Kompensasi (Pinjam & Kembalikan)', icon: '⚖️', badge: 'Rounding' },
      { id: 'numberLine', name: isEn ? 'Strategy 4: Number Line' : 'Jurus 4: Garis Bilangan (Lompat Angka)', icon: '📏', badge: 'Visual Jump' },
      { id: 'baseTen', name: isEn ? 'Strategy 5: Base-Ten Blocks' : 'Jurus 5: Balok Basis Sepuluh', icon: '🧱', badge: 'Block Model' },
      { id: 'barModel', name: isEn ? 'Strategy 6: Bar / Tape Model' : 'Jurus 6: Model Batang (Bar / Tape Model)', icon: '📦', badge: 'Singapore Math' },
      { id: 'mentalMath', name: isEn ? 'Strategy 7: Mental Math' : 'Jurus 7: Hitung Cepat Otak (Mental Math)', icon: '🧠', badge: 'Speed Trick' },
      { id: 'soroban', name: isEn ? 'Strategy 8: Japanese Soroban' : 'Jurus 8: Sempoa Soroban Jepang', icon: '🧮', badge: 'Abacus' },
      { id: 'tensFrame', name: isEn ? 'Strategy 9: Ten-Frames (Make 10)' : 'Jurus 9: Kotak Sepuluh (Tens Frame)', icon: '🔲', badge: 'Early Math' },
      { id: 'rekenrek', name: isEn ? 'Strategy 10: Dutch Rekenrek' : 'Jurus 10: Manik-Manik Rekenrek', icon: '🔴', badge: 'Beads Count' },
      { id: 'jarimatika', name: isEn ? 'Strategy 11: Finger Math (1–99)' : 'Jurus 11: Jarimatika Tangan Ceria', icon: '🖐️', badge: 'Finger Math' },
      { id: 'numberPyramid', name: isEn ? 'Strategy 12: Number Pyramid' : 'Jurus 12: Piramida Bilangan (Balok)', icon: '🔺', badge: 'Cambridge Math' },
      { id: 'dotArray', name: isEn ? 'Strategy 13: Dot Pattern Array' : 'Jurus 13: Larik Titik Pola (Montessori)', icon: '🟣', badge: 'Pattern Array' },
      { id: 'numberBonds', name: isEn ? 'Strategy 14: Number Bonds' : 'Jurus 14: Ikatan Angka (Number Bonds)', icon: '🔗', badge: 'Part-Whole' }
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
            <div class="eyebrow"><span class="no">🧮</span><span class="lbl">MATH TOOLBOX — 14 JURUS BERHITUNG</span></div>
            <h1 style="margin:0 0 6px; font-size:24px; font-weight:850; color:var(--ink);">
              ${isEn ? 'Interactive Math Toolbox — 14 Calculation Jurus' : 'Math Toolbox — 14 Jurus Berhitung Visual Cepat'}
            </h1>
            <p style="margin:0; font-size:13.5px; color:var(--muted); max-width:620px; line-height:1.55;">
              ${isEn
                ? 'Deterministic arithmetic strategies. See how any addition problem is solved through 14 intuitive visual lenses!'
                : 'Aritmatika deterministik: Satu soal, banyak cara! Lihat bagaimana angka dipecahkan lewat 14 sudut pandang visual yang cerdas!'}
            </p>
          </div>

          <!-- Quick Preset Buttons -->
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <button class="btn btn-preset" data-a="67" data-b="59" type="button" style="font-weight:800; font-size:12.5px; background:var(--teal); color:#fff;">
              ⭐ 67 + 59 (Flagship)
            </button>
            <button class="btn btn-preset" data-a="68" data-b="32" type="button" style="font-weight:800; font-size:12.5px;">
              68 + 32 (Pas 100)
            </button>
            <button class="btn btn-preset" data-a="7" data-b="5" type="button" style="font-weight:800; font-size:12.5px;">
              7 + 5 (Kawan 10)
            </button>
            <button class="btn btn-preset" data-a="125" data-b="75" type="button" style="font-weight:800; font-size:12.5px;">
              125 + 75
            </button>
            <button class="btn btn-preset" data-a="48" data-b="35" type="button" style="font-weight:800; font-size:12.5px;">
              48 + 35
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
              🔊 ${isEn ? 'Listen Explanation' : 'Bunyikan Penjelasan'}
            </button>

            <a href="#subject/matematika" class="btn" style="padding:10px 16px; font-size:13px; font-weight:700; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
              📚 ${isEn ? 'Grade 1 Math Units ➔' : 'Unit Pelajaran SD 1 ➔'}
            </a>
          </div>
        </div>

        <!-- Strategy Tabs Grid (14 Jurus) -->
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
                <strong style="font-size:12.5px; line-height:1.3; display:block;">${strat.name}</strong>
              </button>
            `;
          }).join('')}
        </div>

        <!-- Strategy Breakdown & Visual Stage Box -->
        <div class="quiz-box" style="background:var(--card); border:1.5px solid var(--teal); border-radius:20px; padding:24px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:8px;">
            <h3 style="margin:0; font-size:19px; font-weight:850; color:var(--ink);">
              ${currentStratData.title || (isEn ? 'Strategy Solution Steps' : 'Langkah Pemecahan Jurus')}
            </h3>
            <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); font-weight:800;">
              ${currentStratData.badge || (isEn ? 'Step-by-Step' : 'Langkah Berhitung')}
            </span>
          </div>

          <!-- Step Breakdown / Explanation Cards -->
          <div style="font-size:15px; color:var(--ink); line-height:1.8; margin-bottom:18px;">
            ${this.renderStepsContent(this.activeStrategy, currentStratData, solved, isEn)}
          </div>

          <!-- Visual Manipulative Representation Stage -->
          <div class="visual-manipulative-stage" style="margin-top:16px; padding:18px; background:var(--paper); border-radius:14px;">
            ${this.renderVisualContent(this.activeStrategy, solved, isEn)}
          </div>
        </div>
      </div>
    `;

    this.attachEvents(solved);
    if (window.app && typeof window.app.ensureFooter === 'function') {
      window.app.ensureFooter(lang);
    }
  }

  renderStepsContent(stratId, data, solved, isEn) {
    let html = '';

    // Standard numbered steps
    if (data.step1) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--teal);">📌 <strong>${isEn ? 'Step 1:' : 'Langkah 1:'}</strong> ${data.step1}</div>`;
    }
    if (data.step2) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--teal);">📌 <strong>${isEn ? 'Step 2:' : 'Langkah 2:'}</strong> ${data.step2}</div>`;
    }
    if (data.step3) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--teal);">📌 <strong>${isEn ? 'Step 3:' : 'Langkah 3:'}</strong> ${data.step3}</div>`;
    }
    if (data.step4) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--teal);">📌 <strong>${isEn ? 'Step 4:' : 'Langkah 4:'}</strong> ${data.step4}</div>`;
    }

    // Special rich explanations for visual strategies
    if (data.summary && !data.step1) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid #ffb21b;">💡 <strong>${isEn ? 'Key Logic:' : 'Pola Berpikir:'}</strong> ${data.summary}</div>`;
    }
    if (data.principle) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--teal);">🎯 <strong>${isEn ? 'Core Principle:' : 'Kaidah Utama:'}</strong> ${data.principle}</div>`;
    }
    if (data.explanation && !data.step1) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--green);">✨ <strong>${isEn ? 'Walkthrough:' : 'Panduan Langkah:'}</strong> ${data.explanation}</div>`;
    }
    if (data.concept) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid var(--teal);">📦 <strong>${isEn ? 'Concept:' : 'Konsep:'}</strong> ${data.concept}</div>`;
    }
    if (data.regroupMessage) {
      html += `<div style="margin-bottom:8px; padding:10px 14px; background:var(--paper); border-radius:10px; border-left:4px solid #f59e0b;">🧱 <strong>${isEn ? 'Regrouping:' : 'Konsep Menyimpan:'}</strong> ${data.regroupMessage}</div>`;
    }

    // Final result banner
    const finalResultText = data.stepFinal || `${this.numA} + ${this.numB} = ${solved.sum}`;
    html += `<div style="margin-top:12px; padding:12px 16px; background:var(--teal-soft); border-radius:12px; font-weight:850; color:var(--teal-soft-ink); font-size:16px;">🎯 <strong>${isEn ? 'Final Result:' : 'Hasil Akhir:'}</strong> ${finalResultText} 🎉</div>`;

    return html;
  }

  renderVisualContent(stratId, solved, isEn) {
    const a = this.numA;
    const b = this.numB;
    const sum = solved.sum;

    switch (stratId) {
      // 1. Make 100
      case 'makeHundred': {
        const mh = solved.makeHundred;
        return `
          <div class="pathway-diagram" style="display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap; padding:16px 0;">
            <div class="pathway-node" style="background:var(--navy); color:#fff; padding:10px 18px; border-radius:12px; font-size:20px; font-weight:900;">${a}</div>
            <div class="pathway-arrow" style="font-weight:900; color:var(--teal);">+${mh.need || 1} ➔</div>
            <div class="pathway-node" style="background:#ffb21b; color:#1a202c; padding:10px 18px; border-radius:12px; font-size:20px; font-weight:900;">${mh.target || 100}</div>
            <div class="pathway-arrow" style="font-weight:900; color:var(--teal);">+${mh.remainingB || 0} ➔</div>
            <div class="pathway-node" style="background:var(--green); color:#fff; padding:10px 18px; border-radius:12px; font-size:20px; font-weight:900;">${sum} 🎉</div>
          </div>
        `;
      }

      // 2. Decomposition
      case 'decomposition': {
        const dc = solved.decomposition;
        return `
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px; text-align:center;">
            <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:14px;">
              <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? 'Tens Group' : 'Kelompok Puluhan'}</div>
              <div style="font-size:18px; font-weight:900; color:var(--teal); margin-top:4px;">${dc.tSum}</div>
            </div>
            <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:14px;">
              <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? 'Ones Group' : 'Kelompok Satuan'}</div>
              <div style="font-size:18px; font-weight:900; color:var(--teal); margin-top:4px;">${dc.uSum}</div>
            </div>
            <div style="background:var(--teal-soft); border:1px solid var(--teal); border-radius:12px; padding:14px;">
              <div style="font-size:11px; font-weight:800; color:var(--teal-soft-ink); text-transform:uppercase;">${isEn ? 'Combined Total' : 'Total Gabungan'}</div>
              <div style="font-size:18px; font-weight:900; color:var(--teal-soft-ink); margin-top:4px;">${sum}</div>
            </div>
          </div>
        `;
      }

      // 3. Compensation
      case 'compensation': {
        const comp = solved.compensation;
        return `
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; text-align:center;">
            <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:14px;">
              <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">1. ${isEn ? 'Round Up' : 'Bulatkan Dulu'}</div>
              <div style="font-size:18px; font-weight:900; color:#e67e22; margin-top:4px;">${comp.roundedNum} ➔ ${comp.roundValue}</div>
              <div style="font-size:11.5px; color:var(--muted);">(+${comp.diff})</div>
            </div>
            <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:14px;">
              <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">2. ${isEn ? 'Easy Sum' : 'Hitung Enteng'}</div>
              <div style="font-size:18px; font-weight:900; color:var(--teal); margin-top:4px;">${comp.baseNum} + ${comp.roundValue} = ${comp.intermediateSum}</div>
            </div>
            <div style="background:var(--card); border:1.5px solid var(--green); border-radius:12px; padding:14px;">
              <div style="font-size:11px; font-weight:800; color:var(--green); text-transform:uppercase;">3. ${isEn ? 'Subtract Extra' : 'Balikin Kelebihan'}</div>
              <div style="font-size:18px; font-weight:900; color:var(--green); margin-top:4px;">${comp.intermediateSum} - ${comp.diff} = ${sum}</div>
            </div>
          </div>
        `;
      }

      // 4. Number Line
      case 'numberLine': {
        const nl = solved.numberLine;
        return `
          <div class="number-line-container" style="overflow-x:auto; padding:10px 0;">
            <svg viewBox="0 0 560 120" style="width:100%; min-width:480px; max-width:560px; display:block; margin:0 auto;">
              <line x1="30" y1="90" x2="520" y2="90" stroke="var(--ink)" stroke-width="3" />
              <polygon points="520,85 535,90 520,95" fill="var(--ink)" />
              <circle cx="60" cy="90" r="8" fill="var(--teal)" />
              <text x="60" y="116" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${nl.start}</text>
              <g transform="translate(60, 58)">
                <text x="0" y="0" font-size="26" text-anchor="middle">🐸</text>
              </g>
              ${nl.jumps[0] ? `
                <path d="M 60,90 Q 185,14 300,90" fill="none" stroke="#ffb21b" stroke-width="3.5" stroke-dasharray="6,4" />
                <text x="185" y="38" text-anchor="middle" font-weight="900" font-size="13" fill="#ffb21b">Lompat ${nl.jumps[0].amount}</text>
                <circle cx="300" cy="90" r="7" fill="#ffb21b" />
                <text x="300" y="116" text-anchor="middle" font-weight="800" font-size="13" fill="var(--ink)">${nl.jumps[0].to}</text>
              ` : ''}
              ${nl.jumps[1] ? `
                <path d="M 300,90 Q 395,30 480,90" fill="none" stroke="var(--teal)" stroke-width="3.5" />
                <text x="395" y="52" text-anchor="middle" font-weight="900" font-size="13" fill="var(--teal)">Lompat ${nl.jumps[1].amount}</text>
              ` : ''}
              <circle cx="480" cy="90" r="9" fill="var(--green)" />
              <text x="480" y="80" font-size="16" text-anchor="middle">🎯</text>
              <text x="480" y="116" text-anchor="middle" font-weight="900" font-size="15" fill="var(--green)">${sum} 🎉</text>
            </svg>
          </div>
        `;
      }

      // 5. Base-Ten Blocks
      case 'baseTen': {
        const bt = solved.baseTen;
        return `
          <div class="blocks-stage" style="padding:10px; text-align:center;">
            <div style="font-size:13px; font-weight:800; margin-bottom:10px; color:var(--ink);">
              ${isEn ? `Representation for ${a} and ${b}:` : `Visualisasi Batang Puluhan & Kubus Satuan (${a} + ${b}):`}
            </div>
            <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; align-items:center;">
              <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px 18px;">
                <div style="font-size:12px; font-weight:800; color:var(--muted);">${a}</div>
                <div style="font-size:14px; font-weight:900; color:var(--teal); margin-top:4px;">${bt.rodsA} Batang Puluhan + ${bt.cubesA} Kubus</div>
              </div>
              <div style="font-size:20px; font-weight:900; color:var(--teal);">+</div>
              <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px 18px;">
                <div style="font-size:12px; font-weight:800; color:var(--muted);">${b}</div>
                <div style="font-size:14px; font-weight:900; color:var(--teal); margin-top:4px;">${bt.rodsB} Batang Puluhan + ${bt.cubesB} Kubus</div>
              </div>
            </div>
            <div style="margin-top:14px; padding:12px; background:var(--teal-soft); border-radius:12px; font-weight:800; color:var(--teal-soft-ink);">
              🎯 Total: ${bt.totalFlats > 0 ? `${bt.totalFlats} Ratusan + ` : ''}${bt.remainingRods} Puluhan + ${bt.remainingCubes} Satuan = ${sum}!
            </div>
          </div>
        `;
      }

      // 6. Bar / Tape Model
      case 'barModel': {
        const bm = solved.barModel;
        return `
          <div class="bar-model-wrap" style="max-width:540px; margin:0 auto; text-align:center;">
            <div style="font-size:14px; font-weight:800; color:var(--teal); margin-bottom:8px;">${bm.whole?.label || `Total = ${sum}`}</div>
            <div style="display:flex; height:44px; border-radius:10px; overflow:hidden; border:2px solid var(--line);">
              <div style="width:${bm.partA?.percent || 50}%; background:#3498db; color:#fff; display:grid; place-items:center; font-weight:900; font-size:13px;">
                ${a} (${bm.partA?.percent || 50}%)
              </div>
              <div style="width:${bm.partB?.percent || 50}%; background:#e67e22; color:#fff; display:grid; place-items:center; font-weight:900; font-size:13px;">
                ${b} (${bm.partB?.percent || 50}%)
              </div>
            </div>
            <div style="font-size:14px; font-weight:850; color:var(--ink); margin-top:12px;">${bm.equation || `${a} + ${b} = ${sum}`}</div>
          </div>
        `;
      }

      // 7. Mental Math
      case 'mentalMath': {
        const mm = solved.mentalMath;
        return `
          <div style="background:linear-gradient(135deg, #0e2e48, #173752); color:#fff; border-radius:14px; padding:20px; text-align:center; max-width:500px; margin:0 auto;">
            <div style="font-size:11px; letter-spacing:1px; text-transform:uppercase; color:#ffb21b; font-weight:800;">🧠 Papan Imajinasi Pikiran</div>
            <div style="font-size:22px; font-weight:900; margin:10px 0;">${mm.thoughtBubble || `${a} + ${b}`}</div>
            <div style="display:flex; justify-content:center; gap:10px; font-size:18px; font-weight:900;">
              <span style="background:rgba(255,255,255,0.15); padding:6px 14px; border-radius:8px;">${a}</span>
              <span style="color:#ffb21b;">+</span>
              <span style="background:rgba(91,224,223,0.3); color:#5be0df; padding:6px 14px; border-radius:8px;">${b}</span>
              <span style="color:#ffb21b;">=</span>
              <span style="background:#2ed573; color:#fff; padding:6px 14px; border-radius:8px;">${sum}</span>
            </div>
          </div>
        `;
      }

      // 8. Soroban
      case 'soroban': {
        const sb = solved.soroban;
        return `
          <div style="background:#2b1d0c; border:4px solid #8b5a2b; border-radius:14px; padding:18px; max-width:420px; margin:0 auto; color:#fff; text-align:center;">
            <div style="font-size:12px; font-weight:800; color:#ffc44d; text-transform:uppercase; margin-bottom:12px;">🧮 Sempoa Soroban Jepang (Manik Atas = 5, Bawah = 1)</div>
            <div style="display:flex; justify-content:center; gap:24px;">
              <div>
                <div style="font-size:11px; color:#faedcd;">Ratusan</div>
                <div style="font-size:22px; font-weight:900; color:#ffc44d;">${sb.abacusTotal?.hundreds?.val || Math.floor(sum / 100)}</div>
              </div>
              <div>
                <div style="font-size:11px; color:#faedcd;">Puluhan</div>
                <div style="font-size:22px; font-weight:900; color:#ffc44d;">${sb.abacusTotal?.tens?.val || Math.floor((sum % 100) / 10)}</div>
              </div>
              <div>
                <div style="font-size:11px; color:#faedcd;">Satuan</div>
                <div style="font-size:22px; font-weight:900; color:#ffc44d;">${sb.abacusTotal?.units?.val || sum % 10}</div>
              </div>
            </div>
            <div style="margin-top:12px; font-size:14px; font-weight:850; color:#faedcd;">Formasi Manik: ${sum} ✨</div>
          </div>
        `;
      }

      // 9. Tens-Frame
      case 'tensFrame': {
        const tf = solved.tensFrame;
        return `
          <div style="text-align:center;">
            <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:8px;">Kotak Sepuluh (Make 10 Manipulatives):</div>
            <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap; align-items:center;">
              <div style="background:var(--card); border:2px solid var(--line); border-radius:12px; padding:12px; min-width:140px;">
                <div style="font-size:12px; font-weight:800;">Kotak 1</div>
                <div style="font-size:20px; font-weight:900; color:var(--teal); margin:4px 0;">${tf.canMake10 ? '🔟 10 Penuh' : `${tf.uA}/10`}</div>
              </div>
              <div style="font-size:22px; font-weight:900; color:var(--teal);">+</div>
              <div style="background:var(--card); border:2px solid var(--line); border-radius:12px; padding:12px; min-width:140px;">
                <div style="font-size:12px; font-weight:800;">Kotak 2 (Sisa)</div>
                <div style="font-size:20px; font-weight:900; color:#e67e22; margin:4px 0;">${tf.finalUnits} Satuan</div>
              </div>
              <div style="font-size:22px; font-weight:900; color:var(--teal);">=</div>
              <div style="background:var(--teal-soft); border:2px solid var(--teal); border-radius:12px; padding:12px; min-width:140px;">
                <div style="font-size:12px; font-weight:800; color:var(--teal-soft-ink);">Total</div>
                <div style="font-size:20px; font-weight:900; color:var(--teal-soft-ink); margin:4px 0;">${sum}</div>
              </div>
            </div>
          </div>
        `;
      }

      // 10. Rekenrek
      case 'rekenrek': {
        const rek = solved.rekenrek;
        return `
          <div style="text-align:center; max-width:480px; margin:0 auto;">
            <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:12px;">Sempoa 2-Warna Belanda (5 Merah + 5 Putih):</div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
              <div style="background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.3); border-radius:10px; padding:10px;">
                <div style="font-size:11px; font-weight:800; color:#ef4444;">🔴 Manik Merah</div>
                <div style="font-size:16px; font-weight:900; margin-top:2px;">${rek.combinedRed}</div>
              </div>
              <div style="background:var(--card); border:1px solid var(--line); border-radius:10px; padding:10px;">
                <div style="font-size:11px; font-weight:800; color:var(--muted);">⚪ Manik Putih</div>
                <div style="font-size:16px; font-weight:900; margin-top:2px;">${rek.combinedWhite}</div>
              </div>
              <div style="background:var(--teal-soft); border:1px solid var(--teal); border-radius:10px; padding:10px;">
                <div style="font-size:11px; font-weight:800; color:var(--teal-soft-ink);">🎯 Grand Total</div>
                <div style="font-size:16px; font-weight:900; color:var(--teal-soft-ink); margin-top:2px;">${sum}</div>
              </div>
            </div>
          </div>
        `;
      }

      // 11. Jarimatika
      case 'jarimatika': {
        const jari = solved.jarimatika;
        return `
          <div style="text-align:center;">
            <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:12px;">Formasi Jari Tangan Ajaib (Kiri: Puluhan, Kanan: Satuan):</div>
            <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
              <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px 18px;">
                <div style="font-size:11px; font-weight:800; color:var(--muted);">👈 Tangan Kiri (Puluhan)</div>
                <div style="font-size:18px; font-weight:900; color:var(--teal); margin-top:4px;">${jari.handSum?.left?.val || Math.floor((sum % 100) / 10) * 10}</div>
              </div>
              <div style="background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px 18px;">
                <div style="font-size:11px; font-weight:800; color:var(--muted);">👉 Tangan Kanan (Satuan)</div>
                <div style="font-size:18px; font-weight:900; color:var(--teal); margin-top:4px;">${jari.handSum?.right?.val || sum % 10}</div>
              </div>
              <div style="background:var(--teal-soft); border:1px solid var(--teal); border-radius:12px; padding:12px 18px;">
                <div style="font-size:11px; font-weight:800; color:var(--teal-soft-ink);">🎉 Total Terbaca</div>
                <div style="font-size:18px; font-weight:900; color:var(--teal-soft-ink); margin-top:4px;">${sum}</div>
              </div>
            </div>
          </div>
        `;
      }

      // 12. Number Pyramid
      case 'numberPyramid': {
        const pyr = solved.numberPyramid;
        return `
          <div style="text-align:center; max-width:440px; margin:0 auto;">
            <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:12px;">Dinding Balok Piramida Bilangan:</div>
            <div style="background:var(--teal-soft); border:2px solid var(--teal); border-radius:12px; padding:12px; margin-bottom:8px; font-weight:900; font-size:20px; color:var(--teal-soft-ink);">
              🔺 Puncak: ${pyr.peak || sum}
            </div>
            <div style="display:flex; justify-content:center; gap:8px; margin-bottom:8px;">
              <div style="flex:1; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:8px; font-weight:800;">
                Puluhan: ${pyr.tensCombined}
              </div>
              <div style="flex:1; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:8px; font-weight:800;">
                Satuan: ${pyr.onesCombined}
              </div>
            </div>
            <div style="display:flex; justify-content:center; gap:6px;">
              <div style="flex:1; background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px; font-size:12px; font-weight:700;">${pyr.tA}</div>
              <div style="flex:1; background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px; font-size:12px; font-weight:700;">${pyr.uA}</div>
              <div style="flex:1; background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px; font-size:12px; font-weight:700;">${pyr.tB}</div>
              <div style="flex:1; background:var(--paper); border:1px solid var(--line); border-radius:8px; padding:6px; font-size:12px; font-weight:700;">${pyr.uB}</div>
            </div>
          </div>
        `;
      }

      // 13. Dot Array
      case 'dotArray': {
        const da = solved.dotArray;
        return `
          <div style="text-align:center;">
            <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:10px;">Larik Titik Pola Montessori (Baris per 10):</div>
            <div style="display:flex; justify-content:center; gap:16px; flex-wrap:wrap;">
              <div style="background:var(--card); border:1px solid var(--line); border-radius:10px; padding:10px 16px;">
                <div style="font-size:11px; font-weight:800; color:var(--muted);">Puluhan Penuh</div>
                <div style="font-size:16px; font-weight:900; color:var(--teal);">${da.totalFullTens} Baris 🔟</div>
              </div>
              <div style="background:var(--card); border:1px solid var(--line); border-radius:10px; padding:10px 16px;">
                <div style="font-size:11px; font-weight:800; color:var(--muted);">Sisa Titik Satuan</div>
                <div style="font-size:16px; font-weight:900; color:#e67e22;">${da.finalLeftover} Titik 🟣</div>
              </div>
              <div style="background:var(--teal-soft); border:1px solid var(--teal); border-radius:10px; padding:10px 16px;">
                <div style="font-size:11px; font-weight:800; color:var(--teal-soft-ink);">Total Titik</div>
                <div style="font-size:16px; font-weight:900; color:var(--teal-soft-ink);">${sum}</div>
              </div>
            </div>
          </div>
        `;
      }

      // 14. Number Bonds
      case 'numberBonds':
      default: {
        return `
          <div style="text-align:center;">
            <div style="font-size:13px; font-weight:800; color:var(--ink); margin-bottom:12px;">Ikatan Angka Ramah (Number Bonds):</div>
            <div style="display:flex; justify-content:center; gap:20px; align-items:center; flex-wrap:wrap;">
              <div style="background:var(--card); border:1.5px solid var(--teal); border-radius:12px; padding:12px 20px; font-size:18px; font-weight:900; color:var(--teal);">
                ${a}
              </div>
              <div style="font-size:24px; font-weight:900; color:var(--teal);">+</div>
              <div style="background:var(--card); border:1.5px solid var(--teal); border-radius:12px; padding:12px 20px; font-size:18px; font-weight:900; color:var(--teal);">
                ${b}
              </div>
              <div style="font-size:24px; font-weight:900; color:var(--teal);">=</div>
              <div style="background:var(--teal-soft); border:2px solid var(--teal); border-radius:14px; padding:14px 24px; font-size:22px; font-weight:900; color:var(--teal-soft-ink);">
                ${sum} 🎉
              </div>
            </div>
          </div>
        `;
      }
    }
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
      const text = `${this.numA} ditambah ${this.numB} sama dengan ${solved.sum}. Mari kita hitung bersama dengan jurus ini!`;
      TtsEngine.speak(text, 'id', 0.85);
    });
  }
}
