// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Mathematics Flagship Lesson View & Math Toolbox
// Development · Anabhi Dev
// Version   : 2.0 (Math Toolbox Master Blueprint)
// Generated : 10 September 2026, 13:30:00
// ================================================================

import { MATH_DATA } from '../data/math-data.js';
import { MathEngine } from '../engine/math-engine.js';
import { appState } from '../state.js';
import { store } from '../store.js';
import { t } from '../data/i18n.js';

export class MathLessonView {
  constructor(container, videoModal) {
    this.container = container;
    this.videoModal = videoModal;
    this.currentPracticeIndex = 0;
    this.practiceHintLevel = 0;
    this.practiceAnswered = false;
    this.viewMode = 'visual'; // 'visual' | 'compare'
    this.userMetacognition = null;
  }

  render() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const a = state.mathA !== undefined ? state.mathA : 67;
    const b = state.mathB !== undefined ? state.mathB : 59;
    const activeMethod = state.activeMathMethod || 'compensation';
    const solution = MathEngine.solve(a, b, lang);

    // Filter slot video YouTube yang memiliki url
    const availableVideos = MATH_DATA.videoSlots.filter(v => v.url && v.url.trim().length > 0);
    const progress = MathEngine.getProgress();

    this.container.innerHTML = `
      <!-- Header Matematika Flagship / Math Toolbox -->
      <div class="section-header">
        <div class="math-hero-badge">🧰 ${t('mathFlagshipBadge', lang)}</div>
        <h2 class="section-title">${isEn && MATH_DATA.titleEn ? MATH_DATA.titleEn : MATH_DATA.title}</h2>
        <p class="section-sub">${isEn && MATH_DATA.subtitleEn ? MATH_DATA.subtitleEn : MATH_DATA.subtitle}</p>
      </div>

      <!-- Kotak Kontrol Bilangan & Preset Soal Flagship -->
      <div class="math-control-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
          <div style="font-size:12px; font-weight:800; color:var(--muted); text-transform:uppercase;">
            ${t('presetLabel', lang)}
          </div>
          <button class="btn" id="btnRandomMathProblem" type="button" style="padding:4px 12px; font-size:12px;">
            ${t('randomProblem', lang)}
          </button>
        </div>

        <div class="math-presets">
          ${MATH_DATA.presetExamples.map(ex => `
            <button class="preset-chip ${ex.a === a && ex.b === b ? 'active' : ''}" data-a="${ex.a}" data-b="${ex.b}" type="button">
              ${isEn && ex.labelEn ? ex.labelEn : ex.label}
            </button>
          `).join('')}
        </div>

        <!-- Input Angka Interaktif -->
        <div class="math-input-row">
          <div class="math-num-box">
            <label for="inputMathA">${t('num1Label', lang)}</label>
            <input type="number" class="math-num-input" id="inputMathA" value="${a}" min="0" max="999">
          </div>
          <span class="math-operator">+</span>
          <div class="math-num-box">
            <label for="inputMathB">${t('num2Label', lang)}</label>
            <input type="number" class="math-num-input" id="inputMathB" value="${b}" min="0" max="999">
          </div>
          <span class="math-operator">=</span>
          <div class="math-num-box">
            <label>${t('resultLabel', lang)}</label>
            <div class="math-num-input" style="background:var(--teal-soft); color:var(--teal-soft-ink); display:grid; place-items:center;">
              ${solution.sum}
            </div>
          </div>
        </div>

        <!-- Smart Recommendation Banner -->
        ${this.renderSmartRecommendation(a, b, solution, lang)}
      </div>

      <!-- Mode Switcher & Strategy Navigation -->
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
        <div style="font-size:14px; font-weight:800; color:var(--ink);">
          ${t('chooseThinkingTool', lang)}
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn ${this.viewMode === 'visual' ? 'primary' : ''}" id="btnModeVisual" type="button" style="font-size:12px; padding:6px 14px;">
            ${t('modeVisual', lang)}
          </button>
          <button class="btn ${this.viewMode === 'compare' ? 'primary' : ''}" id="btnModeCompare" type="button" style="font-size:12px; padding:6px 14px;">
            ${t('modeCompare', lang)}
          </button>
        </div>
      </div>

      <!-- Tab Switcher 9 Metode Berpikir -->
      <div class="method-tabs" role="tablist">
        ${MATH_DATA.methods.map(m => `
          <button class="method-tab-btn ${activeMethod === m.id && this.viewMode === 'visual' ? 'active' : ''}" data-method="${m.id}" role="tab" type="button">
            <span>${m.icon}</span>
            <span>${isEn && m.nameEn ? m.nameEn : m.name}</span>
          </button>
        `).join('')}
      </div>

      <!-- Panel Konten Utama (Visual atau Compare) -->
      <div class="method-content-panel">
        ${this.viewMode === 'compare' ? this.renderCompareContent(a, b, solution, lang) : this.renderMethodContent(activeMethod, solution, lang)}
      </div>

      <!-- Mode Latihan Interaktif (Practice Mode) -->
      ${this.renderPracticeSection()}

      <!-- Progress & Badges Showcase -->
      ${this.renderProgressBadges(progress, lang)}

      <!-- 4 Slot Video YouTube Matematika -->
      ${availableVideos.length > 0 ? `
        <div class="section" style="margin-top:44px;">
          <div class="eyebrow"><span class="no">▶</span><span class="lbl">${t('videosHeaderEyebrow', lang) || 'VIDEO PENGAYAAN'}</span></div>
          <h3 style="font-size:20px; font-weight:800; margin:0 0 12px;">${t('videosHeaderTitle', lang) || 'Trik Berhitung Asyik di YouTube'}</h3>
          <div class="video-grid">
            ${availableVideos.map(v => `
              <div class="video-card">
                <div>
                  <span class="subject-badge">${v.ageFit}</span>
                  <h4 style="margin:8px 0 4px; font-size:15px; font-weight:800;">${v.title}</h4>
                  <p style="margin:0; font-size:12px; color:var(--muted);">${v.description}</p>
                </div>
                <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;">
                  <button class="btn primary btn-play-video" data-title="${v.title}" data-url="${v.url}" type="button" style="flex:1;">
                    ${t('playVideo', lang) || 'Putar Video'}
                  </button>
                  <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="btn" style="text-decoration:none; padding:8px 12px; font-size:12px;" title="Tonton langsung di YouTube">
                    ↗
                  </a>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    this.attachEvents();
  }

  renderSmartRecommendation(a, b, sol, lang = 'id') {
    const isEn = lang === 'en';
    let recText = isEn
      ? 'Exciting numbers! Try different strategies to find the one you love best.'
      : 'Angka ini seru! Coba berbagai strategi untuk menemukan cara paling nyaman.';
    let jumpMethod = sol.recommended[0] || 'decomposition';

    if (b === 59 || a === 59 || b % 10 === 9 || a % 10 === 9) {
      recText = isEn
        ? '💡 <strong>Smart Tip:</strong> An operand ends in 9 (almost round)! Perfect for <strong>Compensation</strong> or <strong>Make 100</strong>!'
        : '💡 <strong>Trik Cerdas:</strong> Ada angka yang berakhiran 9 (hampir bulat)! Sangat cocok pakai jurus <strong>Kompensasi</strong> atau <strong>Bikin 100</strong>!';
      jumpMethod = 'compensation';
    } else if (a + b === 100 || (a + b) % 100 === 0) {
      recText = isEn
        ? `💡 <strong>Smart Tip:</strong> Perfect pair! ${a} and ${b} instantly make ${a + b}! Try <strong>Make 100</strong>!`
        : `💡 <strong>Trik Cerdas:</strong> Pasangan serasi! ${a} dan ${b} langsung pas membentuk ${a + b}! Coba jurus <strong>Bikin 100</strong>!`;
      jumpMethod = 'make-hundred';
    }

    return `
      <div class="math-smart-recommendation">
        <div class="rec-text">${recText}</div>
        <button class="btn" id="btnJumpRecommended" data-method="${jumpMethod}" type="button" style="padding:4px 12px; font-size:12px; border-color:var(--teal); color:var(--teal);">
          ${t('tryThisWay', lang)}
        </button>
      </div>
    `;
  }

  renderMethodContent(methodId, sol, lang = 'id') {
    const isEn = lang === 'en';

    switch (methodId) {
      // 1. Decomposition (Pecah Puluhan & Satuan)
      case 'decomposition':
      case 'place-value':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>🧩</span> ${sol.decomposition.title}</h3>
            <span class="subject-badge">${sol.decomposition.badge}</span>
          </div>
          <p style="font-size:14px; color:var(--muted); margin:0 0 18px;">
            ${isEn ? 'Separate numbers into groups of <strong>tens</strong> and <strong>ones</strong>. Add each group, then combine the totals!' : 'Pisahkan bilangan menjadi kelompok <strong>puluhan</strong> dan <strong>satuan</strong>. Hitung masing-masing kelompok, lalu satukan hasilnya!'}
          </p>
          <div class="place-value-grid">
            <div class="pv-tile">
              <div class="tile-title">${isEn ? '1. Decompose' : '1. Urai Bilangan'}</div>
              <div class="tile-equation" style="font-size:17px;">${sol.decomposition.breakdownA}</div>
              <div class="tile-equation" style="font-size:17px; margin-top:6px;">${sol.decomposition.breakdownB}</div>
            </div>
            <div class="pv-tile">
              <div class="tile-title">${isEn ? '2. Add Tens' : '2. Jumlahkan Puluhan'}</div>
              <div class="tile-equation">${sol.decomposition.step2}</div>
            </div>
            <div class="pv-tile">
              <div class="tile-title">${isEn ? '3. Add Ones' : '3. Jumlahkan Satuan'}</div>
              <div class="tile-equation">${sol.decomposition.step3}</div>
            </div>
            <div class="pv-tile" style="border-color:var(--teal); background:var(--teal-soft);">
              <div class="tile-title" style="color:var(--teal-soft-ink);">${isEn ? '4. Final Result' : '4. Hasil Akhir'}</div>
              <div class="tile-equation" style="color:var(--teal-soft-ink);">${sol.decomposition.stepFinal}</div>
            </div>
          </div>
        `;

      // 2. Number Bonds (Ikatan Bilangan)
      case 'number-bonds':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>🔗</span> ${sol.numberBonds.title}</h3>
            <span class="subject-badge">${sol.numberBonds.badge}</span>
          </div>
          <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
            ${sol.numberBonds.summary}
          </p>
          <div class="nb-tree-box">
            <svg class="nb-svg" viewBox="0 0 540 220">
              <!-- Pohon Cabang Angka A -->
              <circle cx="120" cy="40" r="26" fill="var(--teal)" />
              <text x="120" y="47" text-anchor="middle" font-weight="900" font-size="16" fill="#ffffff">${sol.a}</text>
              <line x1="120" y1="66" x2="70" y2="120" stroke="var(--line)" stroke-width="3" />
              <line x1="120" y1="66" x2="170" y2="120" stroke="var(--line)" stroke-width="3" />
              <circle cx="70" cy="130" r="22" fill="var(--paper)" stroke="var(--teal)" stroke-width="2" />
              <text x="70" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeA.branchLeft}</text>
              <circle cx="170" cy="130" r="22" fill="var(--paper)" stroke="var(--teal)" stroke-width="2" />
              <text x="170" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeA.branchRight}</text>

              <!-- Operator Tambah -->
              <text x="225" y="135" text-anchor="middle" font-weight="900" font-size="24" fill="var(--muted)">+</text>

              <!-- Pohon Cabang Angka B -->
              <circle cx="330" cy="40" r="26" fill="#e67e22" />
              <text x="330" y="47" text-anchor="middle" font-weight="900" font-size="16" fill="#ffffff">${sol.b}</text>
              <line x1="330" y1="66" x2="280" y2="120" stroke="var(--line)" stroke-width="3" />
              <line x1="330" y1="66" x2="380" y2="120" stroke="var(--line)" stroke-width="3" />
              <circle cx="280" cy="130" r="22" fill="var(--paper)" stroke="#e67e22" stroke-width="2" />
              <text x="280" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeB.branchLeft}</text>
              <circle cx="380" cy="130" r="22" fill="var(--paper)" stroke="#e67e22" stroke-width="2" />
              <text x="380" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeB.branchRight}</text>

              <!-- Gabungan Akhir -->
              <path d="M 70,152 Q 225,210 460,130" fill="none" stroke="var(--green)" stroke-width="2.5" stroke-dasharray="4,4" />
              <circle cx="470" cy="130" r="30" fill="var(--green)" />
              <text x="470" y="137" text-anchor="middle" font-weight="900" font-size="17" fill="#ffffff">${sol.sum}</text>
              <text x="470" y="176" text-anchor="middle" font-weight="800" font-size="12" fill="var(--green)">TOTAL</text>
            </svg>
            <div style="font-size:14px; font-weight:800; color:var(--ink); margin-top:8px;">
              ${isEn ? 'Tens' : 'Puluhan'} (${sol.numberBonds.combinedBranches[0].calc} = ${sol.numberBonds.combinedBranches[0].result}) + ${isEn ? 'Ones' : 'Satuan'} (${sol.numberBonds.combinedBranches[1].calc} = ${sol.numberBonds.combinedBranches[1].result}) = ${sol.sum}!
            </div>
          </div>
        `;

      // 3. Make Ten / Make Hundred
      case 'make-hundred':
      case 'make-round':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>🔟</span> ${sol.makeHundred.title}</h3>
            <span class="subject-badge">${sol.makeHundred.badge}</span>
          </div>
          <div class="round-strategy-banner">
            🎯 <strong>${isEn ? 'Smart Route:' : 'Rute Pintar:'}</strong> ${sol.makeHundred.step1}
          </div>
          <div class="pathway-flow">
            <div class="pathway-node">${sol.a}</div>
            <div class="pathway-arrow">
              <span>+${sol.makeHundred.need}</span>
              <span style="font-size:16px;">➔</span>
            </div>
            <div class="pathway-node" style="background:#ffb21b; color:#1a202c;">${sol.makeHundred.target}</div>
            <div class="pathway-arrow">
              <span>+${sol.makeHundred.remainingB}</span>
              <span style="font-size:16px;">➔</span>
            </div>
            <div class="pathway-node" style="background:var(--green);">${sol.sum} 🎉</div>
          </div>
          <div class="round-step-box">
            <div style="font-size:15px; font-weight:750; margin-bottom:8px;">${isEn ? 'Step-by-step Explanation:' : 'Langkah Penjelasan:'}</div>
            <div style="display:flex; flex-direction:column; gap:8px; font-size:14px;">
              <div>👉 <strong>${isEn ? 'Step 1:' : 'Langkah 1:'}</strong> ${sol.makeHundred.step1}</div>
              <div>👉 <strong>${isEn ? 'Step 2:' : 'Langkah 2:'}</strong> ${sol.makeHundred.step2}</div>
              <div>👉 <strong>${isEn ? 'Step 3:' : 'Langkah 3:'}</strong> ${sol.makeHundred.step3}</div>
              <div style="color:var(--teal); font-weight:800;">👉 <strong>${isEn ? 'Step 4:' : 'Langkah 4:'}</strong> ${sol.makeHundred.step4}</div>
            </div>
          </div>
        `;

      // 4. Compensation (Kompensasi / Hampir Bulat)
      case 'compensation':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>⚖️</span> ${sol.compensation.title}</h3>
            <span class="subject-badge">${sol.compensation.badge}</span>
          </div>
          <div class="comp-quote">
            ${sol.compensation.friendlyQuote}
          </div>
          <div class="comp-card-box">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px; margin-bottom:18px;">
              <div style="background:var(--card); padding:16px; border-radius:12px; border:1px solid var(--line); text-align:center;">
                <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? '1. Round Up First' : '1. Bulatkan Dulu'}</div>
                <div style="font-size:20px; font-weight:900; color:#e67e22; margin-top:4px;">
                  ${sol.compensation.roundedNum} ➔ ${sol.compensation.roundValue}
                </div>
                <div style="font-size:12px; color:var(--muted); margin-top:4px;">(${isEn ? 'Added ' : 'Ditambah '}${sol.compensation.diff})</div>
              </div>
              <div style="background:var(--card); padding:16px; border-radius:12px; border:1px solid var(--line); text-align:center;">
                <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? '2. Easy Calculation' : '2. Hitung Enteng'}</div>
                <div style="font-size:20px; font-weight:900; color:var(--teal); margin-top:4px;">
                  ${sol.compensation.baseNum} + ${sol.compensation.roundValue} = ${sol.compensation.intermediateSum}
                </div>
                <div style="font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Super easy in your head!' : 'Sangat gampang di kepala!'}</div>
              </div>
              <div style="background:var(--card); padding:16px; border-radius:12px; border:1px solid var(--green); text-align:center;">
                <div style="font-size:11px; font-weight:800; color:var(--green); text-transform:uppercase;">${isEn ? '3. Subtract Extra' : '3. Balikin Kelebihannya'}</div>
                <div style="font-size:20px; font-weight:900; color:var(--green); margin-top:4px;">
                  ${sol.compensation.intermediateSum} - ${sol.compensation.diff} = ${sol.sum}
                </div>
                <div style="font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Fast and exact answer!' : 'Jawaban tepat dan kilat!'}</div>
              </div>
            </div>
            <div style="font-size:14px; color:var(--ink);">
              👉 ${sol.compensation.step3}
            </div>
          </div>
        `;

      // 5. Number Line (Garis Bilangan)
      case 'number-line':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>📏</span> ${sol.numberLine.title}</h3>
            <span class="subject-badge">${sol.numberLine.badge}</span>
          </div>
          <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
            ${sol.numberLine.summary}
          </p>
          <div class="number-line-container">
            <svg class="number-line-svg" viewBox="0 0 560 120">
              <!-- Garis Dasar -->
              <line x1="30" y1="90" x2="520" y2="90" stroke="var(--ink)" stroke-width="3" />
              <polygon points="520,85 535,90 520,95" fill="var(--ink)" />

              <!-- Titik Awal -->
              <circle cx="60" cy="90" r="7" fill="var(--teal)" />
              <text x="60" y="114" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberLine.start}</text>

              <!-- Busur Lompatan 1 (Puluhan) -->
              ${sol.numberLine.jumps[0] ? `
                <path d="M 60,90 Q 180,15 300,90" fill="none" stroke="#ffb21b" stroke-width="3" stroke-dasharray="6,4" />
                <text x="180" y="40" text-anchor="middle" font-weight="900" font-size="14" fill="#ffb21b">${sol.numberLine.jumps[0].amount}</text>
                <circle cx="300" cy="90" r="6" fill="#ffb21b" />
                <text x="300" y="114" text-anchor="middle" font-weight="800" font-size="13" fill="var(--ink)">${sol.numberLine.jumps[0].to}</text>
              ` : ''}

              <!-- Busur Lompatan 2 (Satuan) -->
              ${sol.numberLine.jumps[1] ? `
                <path d="M 300,90 Q 390,35 480,90" fill="none" stroke="var(--teal)" stroke-width="3" />
                <text x="390" y="55" text-anchor="middle" font-weight="900" font-size="14" fill="var(--teal)">${sol.numberLine.jumps[1].amount}</text>
              ` : ''}

              <!-- Titik Target Akhir -->
              <circle cx="480" cy="90" r="8" fill="var(--green)" />
              <text x="480" y="114" text-anchor="middle" font-weight="900" font-size="15" fill="var(--green)">${sol.sum} 🎯</text>
            </svg>
          </div>
        `;

      // 6. Base-Ten Blocks (Balok Nilai Tempat)
      case 'base-ten':
      case 'visual-blocks':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>🧱</span> ${sol.baseTen.title}</h3>
            <span class="subject-badge">${sol.baseTen.badge}</span>
          </div>
          <div class="round-strategy-banner" style="background:rgba(0,206,201,0.1); border-color:var(--teal); color:var(--ink);">
            💡 <strong>${isEn ? 'Regrouping Concept:' : 'Konsep Regrouping:'}</strong> ${sol.baseTen.regroupMessage}
          </div>
          <div class="blocks-stage">
            <div style="font-weight:750; font-size:13px; margin-bottom:8px;">${isEn ? `Number ${sol.a} (${sol.baseTen.rodsA} Ten-Rods & ${sol.baseTen.cubesA} Unit-Cubes):` : `Angka ${sol.a} (${sol.baseTen.rodsA} Batang Puluhan & ${sol.baseTen.cubesA} Kubus Satuan):`}</div>
            <div class="blocks-group">
              <div class="rod-stack">
                ${Array(Math.min(10, sol.baseTen.rodsA)).fill(0).map(() => `<div class="rod" title="${isEn ? '1 Rod = 10' : '1 Batang = 10'}"></div>`).join('')}
              </div>
              <div class="cube-stack">
                ${Array(sol.baseTen.cubesA).fill(0).map(() => `<div class="cube" title="${isEn ? '1 Cube = 1' : '1 Kubus = 1'}"></div>`).join('')}
              </div>
            </div>

            <div style="font-weight:750; font-size:13px; margin:18px 0 8px;">${isEn ? `Number ${sol.b} (${sol.baseTen.rodsB} Ten-Rods & ${sol.baseTen.cubesB} Unit-Cubes):` : `Angka ${sol.b} (${sol.baseTen.rodsB} Batang Puluhan & ${sol.baseTen.cubesB} Kubus Satuan):`}</div>
            <div class="blocks-group">
              <div class="rod-stack">
                ${Array(Math.min(10, sol.baseTen.rodsB)).fill(0).map(() => `<div class="rod" title="${isEn ? '1 Rod = 10' : '1 Batang = 10'}"></div>`).join('')}
              </div>
              <div class="cube-stack">
                ${Array(sol.baseTen.cubesB).fill(0).map(() => `<div class="cube" title="${isEn ? '1 Cube = 1' : '1 Kubus = 1'}"></div>`).join('')}
              </div>
            </div>

            <div style="border-top:2px dashed var(--line); margin:18px 0; padding-top:14px;">
              <div style="font-weight:800; font-size:14px; margin-bottom:8px; color:var(--teal);">${isEn ? 'Combined Blocks:' : 'Hasil Penggabungan Seluruh Balok:'}</div>
              <div class="blocks-group">
                ${sol.baseTen.totalFlats > 0 ? `
                  <div class="flat-block">
                    100 (${isEn ? 'Flat' : 'Ratusan'})
                  </div>
                ` : ''}
                <div class="rod-stack">
                  ${Array(sol.baseTen.remainingRods).fill(0).map(() => `<div class="rod" style="background:#10ac84;" title="${isEn ? 'Ten-Rod' : 'Batang Puluhan'}"></div>`).join('')}
                </div>
                <div class="cube-stack">
                  ${Array(sol.baseTen.remainingCubes).fill(0).map(() => `<div class="cube" style="background:#2ed573;" title="${isEn ? 'Unit Cube' : 'Kubus Satuan'}"></div>`).join('')}
                </div>
              </div>
              <p style="margin:12px 0 0; font-size:13px; color:var(--muted);">${sol.baseTen.explanation}</p>
            </div>
          </div>
        `;

      // 7. Bar / Tape Model
      case 'bar-model':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>📦</span> ${sol.barModel.title}</h3>
            <span class="subject-badge">${sol.barModel.badge}</span>
          </div>
          <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
            ${sol.barModel.concept}
          </p>
          <div class="bar-model-wrap">
            <div style="font-size:14px; font-weight:800; text-align:center; color:var(--teal); margin-bottom:10px;">
              ${sol.barModel.whole.label}
            </div>
            <div class="bar-tape">
              <div class="bar-part" style="width:${sol.barModel.partA.percent}%; background:#3498db;">
                ${sol.barModel.partA.label}
              </div>
              <div class="bar-part" style="width:${sol.barModel.partB.percent}%; background:#e67e22;">
                ${sol.barModel.partB.label}
              </div>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:12.5px; color:var(--muted); margin-top:8px;">
              <span>◀── ${sol.barModel.partA.percent}% ──▶</span>
              <span>◀── ${sol.barModel.partB.percent}% ──▶</span>
            </div>
            <div style="text-align:center; font-size:16px; font-weight:850; color:var(--ink); margin-top:16px;">
              ${sol.barModel.equation}
            </div>
          </div>
        `;

      // 8. Mental Math (Angka Ramah)
      case 'mental-math':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>🧠</span> ${sol.mentalMath.title}</h3>
            <span class="subject-badge">${sol.mentalMath.badge}</span>
          </div>
          <div class="anzan-mind-board">
            <div style="font-size:12.5px; letter-spacing:1px; text-transform:uppercase; color:#ffb21b; font-weight:800;">
              ${isEn ? 'Mental Journey' : 'Papan Imajinasi Pikiran'}
            </div>
            <div style="font-size:24px; font-weight:900; margin:12px 0;">
              ${sol.mentalMath.thoughtBubble}
            </div>
            <div class="anzan-bead-row">
              <div class="anzan-bead">${sol.a}</div>
              <div style="font-size:24px; font-weight:900; display:grid; place-items:center;">+</div>
              <div class="anzan-bead" style="background:#5be0df; color:#0e2e48;">${sol.b}</div>
              <div style="font-size:24px; font-weight:900; display:grid; place-items:center;">=</div>
              <div class="anzan-bead" style="background:#2ed573; color:#ffffff;">${sol.sum}</div>
            </div>
            <div style="font-size:13.5px; color:rgba(255,255,255,0.85); max-width:440px; margin:0 auto; line-height:1.6;">
              ${sol.mentalMath.step1Text}<br>${sol.mentalMath.step2Text}
            </div>
          </div>
        `;

      // 9. Soroban (Sempoa Jepang)
      case 'soroban':
        return `
          <div class="method-header">
            <h3 class="method-title"><span>🧮</span> ${sol.soroban.title}</h3>
            <span class="subject-badge">${sol.soroban.badge}</span>
          </div>
          <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
            ${sol.soroban.principle}
          </p>
          <div class="soroban-frame">
            <div class="soroban-cols">
              <!-- Kolom Ratusan -->
              <div class="soroban-col">
                <div class="soroban-rod"></div>
                <div class="soroban-bead-item ${sol.soroban.abacusTotal.hundreds.upperActive ? 'active' : ''}" title="${isEn ? 'Upper Bead (Value 5)' : 'Manik Atas (Nilai 5)'}"></div>
                <div class="soroban-beam"></div>
                ${[1, 2, 3, 4].map(idx => `
                  <div class="soroban-bead-item ${idx <= sol.soroban.abacusTotal.hundreds.lowerCount ? 'active' : ''}" title="${isEn ? 'Lower Bead (Value 1)' : 'Manik Bawah (Nilai 1)'}"></div>
                `).join('')}
                <div style="margin-top:8px; font-size:14px; font-weight:900; color:#faedcd;">${sol.soroban.abacusTotal.hundreds.val}</div>
              </div>

              <!-- Kolom Puluhan -->
              <div class="soroban-col">
                <div class="soroban-rod"></div>
                <div class="soroban-bead-item ${sol.soroban.abacusTotal.tens.upperActive ? 'active' : ''}" title="${isEn ? 'Upper Bead (Value 5)' : 'Manik Atas (Nilai 5)'}"></div>
                <div class="soroban-beam"></div>
                ${[1, 2, 3, 4].map(idx => `
                  <div class="soroban-bead-item ${idx <= sol.soroban.abacusTotal.tens.lowerCount ? 'active' : ''}" title="${isEn ? 'Lower Bead (Value 1)' : 'Manik Bawah (Nilai 1)'}"></div>
                `).join('')}
                <div style="margin-top:8px; font-size:14px; font-weight:900; color:#faedcd;">${sol.soroban.abacusTotal.tens.val}</div>
              </div>

              <!-- Kolom Satuan -->
              <div class="soroban-col">
                <div class="soroban-rod"></div>
                <div class="soroban-bead-item ${sol.soroban.abacusTotal.units.upperActive ? 'active' : ''}" title="${isEn ? 'Upper Bead (Value 5)' : 'Manik Atas (Nilai 5)'}"></div>
                <div class="soroban-beam"></div>
                ${[1, 2, 3, 4].map(idx => `
                  <div class="soroban-bead-item ${idx <= sol.soroban.abacusTotal.units.lowerCount ? 'active' : ''}" title="${isEn ? 'Lower Bead (Value 1)' : 'Manik Bawah (Nilai 1)'}"></div>
                `).join('')}
                <div style="margin-top:8px; font-size:14px; font-weight:900; color:#faedcd;">${sol.soroban.abacusTotal.units.val}</div>
              </div>
            </div>
            <div style="text-align:center; color:#faedcd; font-size:15px; font-weight:900; margin-top:14px;">
              ${isEn ? `Bead Formation: ${sol.sum} ✨` : `Formasi Manik Terbaca: ${sol.sum} ✨`}
            </div>
          </div>
        `;

      default:
        return '';
    }
  }

  renderCompareContent(a, b, sol, lang = 'id') {
    const isEn = lang === 'en';

    return `
      <div class="method-header">
        <h3 class="method-title"><span>⚖️</span> ${isEn ? 'Compare Strategies Mode' : 'Mode Bandingkan Cara (Compare)'}</h3>
        <span class="subject-badge">${isEn ? 'One Problem, Three Angles' : 'Satu Soal Tiga Sudut Pandang'}</span>
      </div>
      <p style="font-size:14px; color:var(--muted); margin:0 0 16px;">
        ${isEn ? `See how three different thinking tools solve <strong>${a} + ${b} = ${sol.sum}</strong> in their own way:` : `Lihat bagaimana tiga alat berpikir berbeda menyelesaikan <strong>${a} + ${b} = ${sol.sum}</strong> dengan caranya masing-masing:`}
      </p>
      <div class="compare-grid">
        <!-- 1. Pecah Angka -->
        <div class="compare-card">
          <div style="font-size:16px; font-weight:800; color:var(--teal); margin-bottom:8px;">
            ${isEn ? '🧩 Split Numbers' : '🧩 Pecah Angka'}
          </div>
          <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">${isEn ? 'Place Value (Tens & Ones)' : 'Nilai Tempat (Puluhan & Satuan)'}</div>
          <div style="font-size:14px; line-height:1.6;">
            <div>• ${isEn ? 'Tens: ' : 'Puluhan: '} ${Math.floor(a/10)*10} + ${Math.floor(b/10)*10} = ${Math.floor(a/10)*10 + Math.floor(b/10)*10}</div>
            <div>• ${isEn ? 'Ones: ' : 'Satuan: '} ${a%10} + ${b%10} = ${(a%10)+(b%10)}</div>
            <div style="font-weight:800; color:var(--teal); margin-top:6px;">
              Total = ${sol.sum}
            </div>
          </div>
        </div>

        <!-- 2. Bikin 100 -->
        <div class="compare-card">
          <div style="font-size:16px; font-weight:800; color:#e67e22; margin-bottom:8px;">
            ${isEn ? ('🔟 Make ' + sol.makeHundred.target) : '🔟 Bikin 100'}
          </div>
          <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">${isEn ? 'Round to Hundred' : 'Genapkan Angka Bulat'}</div>
          <div style="font-size:14px; line-height:1.6;">
            <div>• ${isEn ? `${a} needs ${sol.makeHundred.need} to reach ${sol.makeHundred.target}` : `${a} butuh ${sol.makeHundred.need} menuju ${sol.makeHundred.target}`}</div>
            <div>• ${isEn ? `Remaining from partner: ${sol.makeHundred.remainingB}` : `Sisa teman: ${sol.makeHundred.remainingB}`}</div>
            <div style="font-weight:800; color:#e67e22; margin-top:6px;">
              ${sol.makeHundred.target} + ${sol.makeHundred.remainingB} = ${sol.sum}
            </div>
          </div>
        </div>

        <!-- 3. Kompensasi -->
        <div class="compare-card">
          <div style="font-size:16px; font-weight:800; color:var(--green); margin-bottom:8px;">
            ${isEn ? '⚖️ Compensation' : '⚖️ Kompensasi'}
          </div>
          <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">${isEn ? 'Round & Give Back' : 'Bulatkan & Kembalikan'}</div>
          <div style="font-size:14px; line-height:1.6;">
            <div>• ${isEn ? `${sol.compensation.roundedNum} rounded to ${sol.compensation.roundValue}` : `${sol.compensation.roundedNum} dijadikan ${sol.compensation.roundValue}`}</div>
            <div>• ${sol.compensation.baseNum} + ${sol.compensation.roundValue} = ${sol.compensation.intermediateSum}</div>
            <div style="font-weight:800; color:var(--green); margin-top:6px;">
              ${sol.compensation.intermediateSum} - ${sol.compensation.diff} = ${sol.sum}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderPracticeSection() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const p = MATH_DATA.practiceProblems[this.currentPracticeIndex];

    const currentStory = (isEn && p.storyEn) ? p.storyEn : p.story;
    const currentHints = (isEn && p.hintsEn) ? p.hintsEn : p.hints;

    return `
      <div class="section" style="margin-top:40px;">
        <div class="eyebrow"><span class="no">⚡</span><span class="lbl">${t('practiceTurboBadge', lang)}</span></div>
        <h3 style="font-size:22px; font-weight:850; margin:0 0 16px;">${t('practiceHeader', lang)}</h3>

        <div class="quiz-box">
          <div style="font-size:12px; color:var(--muted); margin-bottom:6px;">
            ${t('practiceQuestionPrefix', lang)} ${this.currentPracticeIndex + 1} ${t('of', lang)} ${MATH_DATA.practiceProblems.length}
          </div>
          <div class="quiz-question">${currentStory}</div>
          <div style="font-size:28px; font-weight:900; color:var(--teal); margin-bottom:18px;">
            ${p.question}
          </div>

          <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
            <input type="number" id="practiceAnswerInput" class="math-num-input" style="width:140px; height:52px;" placeholder="${t('answerPlaceholder', lang)}" ${this.practiceAnswered ? 'disabled' : ''}>
            <button class="btn primary" id="btnSubmitPractice" type="button" ${this.practiceAnswered ? 'disabled' : ''}>
              ${t('checkAnswer', lang)}
            </button>
            <button class="btn" id="btnMathHint" type="button">
              ${t('hintLabel', lang)} (${this.practiceHintLevel}/3)
            </button>
          </div>

          <!-- Numeric Keypad Ramah Anak di Tablet -->
          <div class="num-keypad">
            ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map(k => `
              <button class="keypad-btn" data-key="${k}" type="button">${k}</button>
            `).join('')}
          </div>

          <!-- Panel Petunjuk Progresif 3 Tingkat -->
          <div class="hint-panel ${this.practiceHintLevel > 0 ? 'show' : ''}" id="mathHintPanel">
            ${currentHints.slice(0, this.practiceHintLevel).join('<br><br>')}
          </div>

          <!-- Feedback Ramah Anak -->
          <div class="feedback-banner" id="mathFeedbackBanner"></div>

          <!-- "Mau Lihat Cara Lain?" Callout setelah berhasil -->
          <div class="show-another-way-banner" id="showAnotherWayBanner" style="display:${this.practiceAnswered ? 'block' : 'none'};">
            <h4 style="margin:0 0 6px; font-size:16px; font-weight:850; color:var(--teal);">${t('showAnotherWaySuccess', lang)}</h4>
            <p style="margin:0 0 14px; font-size:13.5px; color:var(--ink);">
              ${t('showAnotherWayPrompt', lang)}
            </p>
            <button class="btn primary" id="btnShowAnotherWay" type="button" style="padding:8px 20px;">
              ${t('showAnotherWayBtn', lang)}
            </button>
          </div>

          <!-- Refleksi Metakognisi: "Kenapa kamu pilih cara ini?" -->
          ${this.practiceAnswered ? `
            <div class="metacognition-box">
              <div style="font-size:14px; font-weight:800; color:var(--ink);">
                💭 ${isEn ? MATH_DATA.metacognition.questionEn : MATH_DATA.metacognition.question}
              </div>
              <div class="meta-options-grid">
                ${MATH_DATA.metacognition.options.map(opt => `
                  <button class="meta-chip ${this.userMetacognition === opt.id ? 'selected' : ''}" data-meta="${opt.id}" type="button">
                    ${isEn ? opt.textEn : opt.text}
                  </button>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center;">
            <button class="btn" id="btnPrevPractice" type="button" ${this.currentPracticeIndex === 0 ? 'disabled' : ''}>
              ${t('prevQuestion', lang)}
            </button>
            <button class="btn primary" id="btnNextPractice" type="button" ${this.currentPracticeIndex === MATH_DATA.practiceProblems.length - 1 ? 'disabled' : ''}>
              ${t('nextQuestion', lang)}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderProgressBadges(progress, lang = 'id') {
    const isEn = lang === 'en';

    return `
      <div class="section" style="margin-top:36px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
          <div>
            <h4 style="margin:0; font-size:17px; font-weight:850;">${t('badgesSectionTitle', lang)}</h4>
            <p style="margin:2px 0 0; font-size:12.5px; color:var(--muted);">${t('badgesSectionSub', lang)}</p>
          </div>
          <span class="subject-badge">${progress.problemsSolved} ${t('problemsSolvedBadge', lang)}</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px;">
          ${MATH_DATA.badges.map(b => `
            <div style="background:var(--card); border:1px solid var(--line); border-radius:14px; padding:14px; text-align:center;">
              <div style="font-size:28px;">${b.icon}</div>
              <div style="font-size:13px; font-weight:800; margin-top:6px;">${b.name}</div>
              <div style="font-size:11px; color:var(--muted); margin-top:2px;">${isEn && b.descEn ? b.descEn : b.desc}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Preset Chip clicks
    const chips = this.container.querySelectorAll('.preset-chip');
    chips.forEach(c => {
      c.addEventListener('click', () => {
        const a = parseInt(c.getAttribute('data-a'), 10);
        const b = parseInt(c.getAttribute('data-b'), 10);
        appState.set({ mathA: a, mathB: b });
        this.render();
      });
    });

    // Random problem generator button
    const btnRandom = this.container.querySelector('#btnRandomMathProblem');
    if (btnRandom) {
      btnRandom.addEventListener('click', () => {
        const pGen = MathEngine.generateAdditionProblem({ level: Math.floor(Math.random() * 3) + 2 });
        appState.set({ mathA: pGen.a, mathB: pGen.b });
        this.render();
      });
    }

    // Smart recommendation quick jump
    const btnJump = this.container.querySelector('#btnJumpRecommended');
    if (btnJump) {
      btnJump.addEventListener('click', () => {
        const method = btnJump.getAttribute('data-method');
        this.viewMode = 'visual';
        appState.set({ activeMathMethod: method });
        MathEngine.recordStrategyExplored(method);
        this.render();
      });
    }

    // Mode Switcher buttons
    const btnModeVisual = this.container.querySelector('#btnModeVisual');
    const btnModeCompare = this.container.querySelector('#btnModeCompare');
    if (btnModeVisual && btnModeCompare) {
      btnModeVisual.addEventListener('click', () => {
        this.viewMode = 'visual';
        this.render();
      });
      btnModeCompare.addEventListener('click', () => {
        this.viewMode = 'compare';
        this.render();
      });
    }

    // Number Inputs
    const inputA = this.container.querySelector('#inputMathA');
    const inputB = this.container.querySelector('#inputMathB');
    if (inputA && inputB) {
      const updateInputs = () => {
        const a = parseInt(inputA.value, 10) || 0;
        const b = parseInt(inputB.value, 10) || 0;
        appState.set({ mathA: a, mathB: b });
        this.render();
      };
      inputA.addEventListener('change', updateInputs);
      inputB.addEventListener('change', updateInputs);
    }

    // Strategy Tabs
    const tabBtns = this.container.querySelectorAll('.method-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const method = btn.getAttribute('data-method');
        this.viewMode = 'visual';
        appState.set({ activeMathMethod: method });
        MathEngine.recordStrategyExplored(method);
        this.render();
      });
    });

    // Practice submit & hints
    const p = MATH_DATA.practiceProblems[this.currentPracticeIndex];
    const answerInput = this.container.querySelector('#practiceAnswerInput');
    const submitBtn = this.container.querySelector('#btnSubmitPractice');
    const hintBtn = this.container.querySelector('#btnMathHint');
    const feedbackBanner = this.container.querySelector('#mathFeedbackBanner');

    if (hintBtn) {
      hintBtn.addEventListener('click', () => {
        if (this.practiceHintLevel < 3) {
          this.practiceHintLevel++;
        } else {
          this.practiceHintLevel = 1;
        }
        this.render();
      });
    }

    if (submitBtn && answerInput) {
      submitBtn.addEventListener('click', () => {
        const userAns = parseInt(answerInput.value, 10);
        if (isNaN(userAns)) return;

        if (userAns === p.answer) {
          this.practiceAnswered = true;
          store.completeLesson('matematika:' + p.id);
          MathEngine.recordProblemSolved(p.a, p.b, p.recommended ? p.recommended[0] : 'general');
          feedbackBanner.className = 'feedback-banner success show';
          feedbackBanner.innerHTML = `🎉 <strong>Yesss! ${p.answer}! Tepat Sekali!</strong> Kamu hebat!`;
          this.render();
        } else {
          feedbackBanner.className = 'feedback-banner warning show';
          const diff = Math.abs(userAns - p.answer);
          if (diff <= 3) {
            feedbackBanner.innerHTML = 'Hampir banget! 😄 Coba cek langkah terakhir atau lihat petunjuk!';
          } else {
            feedbackBanner.innerHTML = 'Belum pas 😄 Coba cek kembali bagian puluhan atau satuannya ya!';
          }
        }
      });
    }

    // "Show Another Way" Button
    const btnAnotherWay = this.container.querySelector('#btnShowAnotherWay');
    if (btnAnotherWay) {
      btnAnotherWay.addEventListener('click', () => {
        // Set state to flagship or current problem and switch to compare mode
        this.viewMode = 'compare';
        appState.set({ mathA: p.a, mathB: p.b });
        this.render();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    }

    // Metacognition chip clicks
    const metaChips = this.container.querySelectorAll('.meta-chip');
    metaChips.forEach(mc => {
      mc.addEventListener('click', () => {
        this.userMetacognition = mc.getAttribute('data-meta');
        this.render();
      });
    });

    // Keypad Clicks
    const keypadBtns = this.container.querySelectorAll('.keypad-btn');
    keypadBtns.forEach(kb => {
      kb.addEventListener('click', () => {
        if (!answerInput || this.practiceAnswered) return;
        const key = kb.getAttribute('data-key');
        if (key === 'C') {
          answerInput.value = '';
        } else if (key === '⌫') {
          answerInput.value = answerInput.value.slice(0, -1);
        } else {
          answerInput.value += key;
        }
      });
    });

    // Practice Prev/Next
    const prevBtn = this.container.querySelector('#btnPrevPractice');
    const nextBtn = this.container.querySelector('#btnNextPractice');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentPracticeIndex > 0) {
          this.currentPracticeIndex--;
          this.practiceHintLevel = 0;
          this.practiceAnswered = false;
          this.userMetacognition = null;
          this.render();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentPracticeIndex < MATH_DATA.practiceProblems.length - 1) {
          this.currentPracticeIndex++;
          this.practiceHintLevel = 0;
          this.practiceAnswered = false;
          this.userMetacognition = null;
          this.render();
        }
      });
    }

    // Video Play Buttons (Safe modal + Error 153 resilience)
    const playBtns = this.container.querySelectorAll('.btn-play-video');
    playBtns.forEach(pb => {
      pb.addEventListener('click', () => {
        const title = pb.getAttribute('data-title');
        const url = pb.getAttribute('data-url');
        if (this.videoModal) {
          this.videoModal.open(title, url);
        }
      });
    });
  }
}
