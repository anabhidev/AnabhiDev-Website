// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Subject View Coordinator
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 10:35:00
// ================================================================

import { SUBJECTS, getSubjectName, getSubjectBadge, getSubjectDesc } from '../data/subjects.js';
import { GEO_DATA } from '../data/geo-data.js';
import { BAHASA_INDONESIA_DATA } from '../data/bahasa-indonesia.js';
import { ENGLISH_DATA } from '../data/bahasa-inggris.js';
import { PANCASILA_DATA } from '../data/pancasila.js';
import { BAHASA_BALI_DATA } from '../data/bahasa-bali.js';
import { SENI_RUPA_DATA } from '../data/seni-rupa.js';
import { PJOK_DATA } from '../data/pjok.js';
import { AGAMA_DATA } from '../data/agama.js';
import { KOKURIKULER_DATA } from '../data/kokurikuler.js';
import { GeoEngine, GlobeVisualizer } from '../engine/geo-engine.js';
import { MathLessonView } from './lesson-view.js';
import { QuizRunner } from './quiz-runner.js';
import { appState } from '../state.js';
import { store } from '../store.js';
import { t } from '../data/i18n.js';

export class SubjectViewComponent {
  constructor(container, videoModal) {
    this.container = container;
    this.videoModal = videoModal;
    this.globeVis = null;
    this.selectedContinent = 'Semua';
    this.searchCountryQuery = '';
    this.selectedIsland = 'Semua';
    this.searchCityQuery = '';
    this.activeQuizIndex = 0;
  }

  render(subjectId) {
    if (this.globeVis) {
      this.globeVis.stopLoop();
      this.globeVis = null;
    }

    if (subjectId === 'matematika') {
      const mathView = new MathLessonView(this.container, this.videoModal);
      mathView.render();
      return;
    }

    if (subjectId === 'geografi') {
      this.renderGeography();
      return;
    }

    // Render 8 mata pelajaran lainnya secara konsisten dan terstruktur
    this.renderGenericSubject(subjectId);
  }

  // ==========================================================
  // MODUL GEOGRAFI MANDATORI LENGKAP
  // ==========================================================
  renderGeography() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const activeTab = state.activeGeoTab || 'earth';
    const availableVideos = GEO_DATA.videoSlots.filter(v => v.url && v.url.trim().length > 0);

    this.container.innerHTML = `
      <div class="section-header">
        <div class="math-hero-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); border-color:var(--teal);">
          ${t('geoBadge', lang)}
        </div>
        <h2 class="section-title">${(lang === 'en' && GEO_DATA.titleEn) ? GEO_DATA.titleEn : GEO_DATA.title}</h2>
        <p class="section-sub">${(lang === 'en' && GEO_DATA.subtitleEn) ? GEO_DATA.subtitleEn : GEO_DATA.subtitle}</p>
      </div>

      <!-- Tab Sub-Navigasi Geografi (Hierarki: Dunia -> Negara -> Provinsi -> Kota -> Bali -> Kuis) -->
      <div class="geo-nav-tabs" role="tablist">
        <button class="geo-tab-btn ${activeTab === 'earth' ? 'active' : ''}" data-geo-tab="earth" type="button">
          <span>🌐</span> ${t('tabEarth', lang)}
        </button>
        <button class="geo-tab-btn ${activeTab === 'countries' ? 'active' : ''}" data-geo-tab="countries" type="button">
          <span>🗺️</span> ${t('tabCountries', lang)}
        </button>
        <button class="geo-tab-btn ${activeTab === 'provinces' ? 'active' : ''}" data-geo-tab="provinces" type="button">
          <span>🇮🇩</span> ${t('tabProvinces', lang)}
        </button>
        <button class="geo-tab-btn ${activeTab === 'cities' ? 'active' : ''}" data-geo-tab="cities" type="button">
          <span>🏙️</span> ${t('tabCities', lang)}
        </button>
        <button class="geo-tab-btn ${activeTab === 'bali' ? 'active' : ''}" data-geo-tab="bali" type="button">
          <span>🌴</span> ${t('tabBali', lang)}
        </button>
        <button class="geo-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}" data-geo-tab="quizzes" type="button">
          <span>🎯</span> ${t('tabQuizzes', lang)}
        </button>
      </div>

      <!-- Area Konten Tab -->
      <div id="geoTabContent">
        ${this.getGeoTabHtml(activeTab, lang)}
      </div>

      <!-- 3 Slot Video YouTube Geografi (Otomatis sembunyi jika kosong) -->
      ${availableVideos.length > 0 ? `
        <div class="section" style="margin-top:40px;">
          <div class="eyebrow"><span class="no">▶</span><span class="lbl">${t('videosHeaderEyebrow', lang)}</span></div>
          <h3 style="font-size:20px; font-weight:800; margin:0 0 12px;">${lang === 'en' ? 'Visual Explorations' : 'Eksplorasi Visual'}</h3>
          <div class="video-grid">
            ${availableVideos.map(v => `
              <div class="video-card">
                <div>
                  <span class="subject-badge">${v.ageFit}</span>
                  <h4 style="margin:8px 0 4px; font-size:15px; font-weight:800;">${v.title}</h4>
                  <p style="margin:0; font-size:12px; color:var(--muted);">${v.description}</p>
                </div>
                <button class="btn primary btn-play-video" data-title="${v.title}" data-url="${v.url}" type="button">
                  ${t('playVideo', lang)}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Metadata Box Sumber Resmi -->
      <div class="metadata-source-box">
        <strong>${t('geoSourceTitle', lang)}</strong> ${GEO_DATA.metadata.source}<br>
        <strong>${t('curationStatus', lang)}</strong> ${lang === 'en' ? 'Verified as of' : 'Diverifikasi per'} ${GEO_DATA.metadata.reviewedAt} ${lang === 'en' ? 'by' : 'oleh'} ${GEO_DATA.metadata.curator}.<br>
        <strong>${t('scopeLabel', lang)}</strong> ${GEO_DATA.metadata.scope}
      </div>
    `;

    this.attachGeoEvents();

    if (activeTab === 'earth') {
      const canvas = this.container.querySelector('#globeCanvas');
      const overlay = this.container.querySelector('#globeOverlay');
      if (canvas) {
        this.globeVis = new GlobeVisualizer(canvas, overlay);
        this.globeVis.startLoop();
      }
    } else if (activeTab === 'quizzes') {
      this.renderSelectedQuiz();
    }
  }

  getGeoTabHtml(tab, lang = 'id') {
    switch (tab) {
      case 'earth':
        return `
          <div class="globe-stage-card">
            <div class="globe-canvas-wrap">
              <div class="globe-canvas-stack">
                <canvas id="globeCanvas" width="640" height="640"></canvas>
                <canvas id="globeOverlay" width="640" height="640"></canvas>
              </div>
              <div class="globe-controls">
                <button class="btn" id="btnGlobeRotateLeft" type="button">${t('rotateLeft', lang)}</button>
                <button class="btn" id="btnGlobeAutoRotate" type="button">${t('autoRotate', lang)}</button>
                <button class="btn" id="btnGlobeRotateRight" type="button">${t('rotateRight', lang)}</button>
                <button class="btn primary" id="btnGlobeFocusIndonesia" type="button">${t('focusIndonesia', lang)}</button>
                <div class="globe-zoom-group">
                  <button class="iconbtn" id="btnGlobeZoomIn" type="button" aria-label="${t('zoomIn', lang)}" title="${t('zoomIn', lang)}">➕</button>
                  <button class="iconbtn" id="btnGlobeZoomOut" type="button" aria-label="${t('zoomOut', lang)}" title="${t('zoomOut', lang)}">➖</button>
                </div>
              </div>
              <div class="globe-touch-tip">
                ${t('globeTouchTip', lang)}
              </div>
            </div>

            <div class="globe-info-copy">
              <span class="globe-shape-badge">
                <span>🪐</span> ${t('earthShapeBadge', lang)}
              </span>
              <h3>${(lang === 'en' && GEO_DATA.earthIntro.headingEn) ? GEO_DATA.earthIntro.headingEn : GEO_DATA.earthIntro.heading}</h3>
              <p style="font-size:14px; color:var(--muted); line-height:1.65;">
                ${(lang === 'en' && GEO_DATA.earthIntro.explanationEn) ? GEO_DATA.earthIntro.explanationEn : GEO_DATA.earthIntro.explanation}
              </p>

              <div class="globe-highlight-list">
                ${GEO_DATA.earthIntro.highlights.map(h => `
                  <div class="globe-highlight-item">
                    <span class="icon">${h.icon}</span>
                    <div>
                      <strong>${(lang === 'en' && h.titleEn) ? h.titleEn : h.title}</strong>
                      <p>${(lang === 'en' && h.descEn) ? h.descEn : h.desc}</p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;


      case 'countries': {
        let list = GeoEngine.getCountriesByContinent(this.selectedContinent);
        if (this.searchCountryQuery) {
          const q = this.searchCountryQuery.trim().toLowerCase();
          list = list.filter(c =>
            c.name.toLowerCase().includes(q) ||
            c.nameEn.toLowerCase().includes(q) ||
            c.capital.toLowerCase().includes(q) ||
            c.continent.toLowerCase().includes(q) ||
            c.currency.toLowerCase().includes(q) ||
            c.landmark.toLowerCase().includes(q)
          );
        }
        const continents = ['Semua', 'Asia', 'Eropa', 'Afrika', 'Amerika Utara', 'Amerika Selatan', 'Oseania'];

        return `
          <div class="filter-bar" style="flex-direction:column; align-items:stretch; gap:16px;">
            <div class="search-input-box" style="width:100%;">
              <span class="search-icon">🔍</span>
              <input type="text" id="countrySearchInput" placeholder="${t('searchCountryPlaceholder', lang)}" value="${this.searchCountryQuery}">
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div class="island-chips">
                ${continents.map(c => `
                  <button class="chip-btn ${this.selectedContinent === c ? 'active' : ''}" data-continent="${c}" type="button">
                    ${c === 'Semua' ? t('continentAll', lang) :
                      c === 'Asia' ? t('continentAsia', lang) :
                      c === 'Eropa' ? t('continentEurope', lang) :
                      c === 'Afrika' ? t('continentAfrica', lang) :
                      c === 'Amerika Utara' ? t('continentNorthAmerica', lang) :
                      c === 'Amerika Selatan' ? t('continentSouthAmerica', lang) :
                      t('continentOceania', lang)}
                  </button>
                `).join('')}
              </div>
              <div style="font-weight:800; font-size:13px; color:var(--teal);">
                ${t('foundCountriesPrefix', lang)} ${list.length} ${t('countriesCountSuffix', lang)}
              </div>
            </div>
          </div>

          <div class="country-grid">
            ${list.map(c => `
              <div class="country-card">
                <div>
                  <div class="country-card-header">
                    <span class="country-flag-icon">${c.flag}</span>
                    <span class="subject-badge">${c.continent}</span>
                  </div>
                  <h4 class="country-name">${c.name} <span class="country-en-sub">(${c.nameEn})</span></h4>
                  
                  <div class="country-info-row">
                    <span>🏛️ ${t('capitalLabel', lang)}</span>
                    <strong>${c.capital}</strong>
                  </div>
                  <div class="country-info-row">
                    <span>💰 ${t('currencyLabel', lang)}</span>
                    <strong>${c.currency}</strong>
                  </div>
                  <div class="country-info-row">
                    <span>🗣️ ${t('languageLabel', lang)}</span>
                    <span>${c.language}</span>
                  </div>
                  <div class="country-landmark-box">
                    <span class="landmark-tag">📍 ${t('landmarkLabel', lang)}</span>
                    <p class="landmark-text">${c.landmark}</p>
                  </div>
                  <div class="country-fun-fact">
                    <span class="fact-badge">${t('countryFunFactBadge', lang)}</span>
                    <p>${c.funFact}</p>
                  </div>
                </div>
                <button class="btn primary btn-focus-country-globe" data-lon="${c.coords[0]}" data-lat="${c.coords[1]}" data-name="${c.name} ${c.flag}" type="button">
                  ${t('focusOnGlobeBtn', lang)}
                </button>
              </div>
            `).join('')}
          </div>
        `;
      }

      case 'provinces':
        const provinces = GeoEngine.getProvincesByIsland(this.selectedIsland);
        const islands = ['Semua', 'Sumatra', 'Jawa', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Kepulauan Maluku', 'Papua'];

        return `
          <div class="filter-bar">
            <div class="island-chips">
              ${islands.map(isl => `
                <button class="chip-btn ${this.selectedIsland === isl ? 'active' : ''}" data-island="${isl}" type="button">
                  ${isl}
                </button>
              `).join('')}
            </div>
            <div style="font-weight:800; font-size:13px; color:var(--teal);">
              ${t('showingProvincesPrefix', lang)} ${provinces.length} ${t('provincesCountSuffix', lang)}
            </div>
          </div>

          <div class="provinces-grid">
            ${provinces.map(p => `
              <div class="province-card">
                <div>
                  <div class="province-header">
                    <span style="font-size:24px;">${p.icon}</span>
                    <span class="subject-badge">${p.island}</span>
                  </div>
                  <h4 class="province-name">${p.name}</h4>
                  <div class="capital-row">
                    <span>🏛️ ${t('capitalLabel', lang)}</span>
                    <strong>${p.capital}</strong>
                  </div>
                  <p class="province-fact">💡 ${p.funFact}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'cities':
        const cities = GeoEngine.getNonCapitalCities(this.searchCityQuery);

        return `
          <div style="background:var(--accent-soft); border:1px solid var(--accent); border-radius:14px; padding:14px 18px; margin-bottom:20px; font-size:13px; color:var(--accent-ink); line-height:1.6;">
            ${t('cityDisclaimer', lang)}
          </div>

          <div class="filter-bar">
            <div class="search-input-box">
              <span class="search-icon">🔍</span>
              <input type="text" id="citySearchInput" placeholder="${t('searchCityPlaceholder', lang)}" value="${this.searchCityQuery}">
            </div>
            <div style="font-size:13px; font-weight:800; color:var(--teal);">
              ${t('foundCitiesPrefix', lang)} ${cities.length} ${t('citiesSuffix', lang)}
            </div>
          </div>

          <div class="provinces-grid">
            ${cities.map(c => `
              <div class="province-card" style="${c.name === 'Malang' ? 'border: 2px solid var(--teal); background: var(--teal-soft);' : ''}">
                <div>
                  <div class="province-header">
                    <span style="font-size:24px;">${c.icon}</span>
                    <span class="subject-badge" style="background:#ffb21b; color:#0e2e48;">${t('nonCapitalBadge', lang)}</span>
                  </div>
                  <h4 class="province-name" style="color:${c.name === 'Malang' ? 'var(--teal-soft-ink)' : 'inherit'};">
                    ${c.name} ${c.name === 'Malang' ? t('mandatoryExampleBadge', lang) : ''}
                  </h4>
                  <div class="capital-row">
                    <span>📍 ${t('partOfProvince', lang)}</span>
                    <strong>${c.province} (${c.island})</strong>
                  </div>
                  <p class="province-fact">✨ ${c.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      case 'bali':
        const bali = GEO_DATA.baliModule;

        return `
          <div class="bali-header-banner">
            <span class="pill" style="background:rgba(255,255,255,0.2); margin-bottom:10px;">
              ${t('specialBaliPill', lang)}
            </span>
            <h3 style="font-size:24px; font-weight:850; margin:6px 0 8px;">${(lang === 'en' && bali.titleEn) ? bali.titleEn : bali.title}</h3>
            <p style="font-size:14px; margin:0; opacity:0.95; line-height:1.6;">${(lang === 'en' && bali.descriptionEn) ? bali.descriptionEn : bali.description}</p>
          </div>

          <div class="bali-grid">
            ${bali.regions.map(r => `
              <div class="bali-region-card">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <span class="region-type">${r.type}</span>
                  <span style="font-size:22px;">${r.icon}</span>
                </div>
                <h4>${r.name}</h4>
                <div class="bali-gov-center">
                  🏛️ ${t('govCenterLabel', lang)} <strong>${r.capital}</strong>
                </div>
                <p style="margin:8px 0 0; font-size:12.5px; color:var(--muted); line-height:1.55;">
                  ${r.highlight}
                </p>
              </div>
            `).join('')}
          </div>
        `;

      case 'quizzes':
        return `
          <div style="display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
            ${GEO_DATA.quizzes.map((qz, idx) => `
              <button class="btn ${this.activeQuizIndex === idx ? 'primary' : ''} btn-select-quiz" data-idx="${idx}" type="button">
                ${qz.title}
              </button>
            `).join('')}
          </div>
          <div id="quizContainer"></div>
        `;

      default:
        return '';
    }
  }

  bindFocusCountryButtons() {
    const focusBtns = this.container.querySelectorAll('.btn-focus-country-globe');
    focusBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const lon = parseFloat(btn.getAttribute('data-lon'));
        const lat = parseFloat(btn.getAttribute('data-lat'));
        const name = btn.getAttribute('data-name');
        appState.set({ activeGeoTab: 'earth' });
        this.renderGeography();
        if (this.globeVis) {
          this.globeVis.focusCoordinates(lon, lat, name);
        }
      });
    });
  }

  attachGeoEvents() {
    // Nav tabs switcher
    const tabBtns = this.container.querySelectorAll('.geo-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-geo-tab');
        appState.set({ activeGeoTab: tab });
        this.renderGeography();
      });
    });

    // Continent filters
    const continentChips = this.container.querySelectorAll('.chip-btn[data-continent]');
    continentChips.forEach(c => {
      c.addEventListener('click', () => {
        this.selectedContinent = c.getAttribute('data-continent');
        this.renderGeography();
      });
    });

    // Country search input
    const countryInput = this.container.querySelector('#countrySearchInput');
    if (countryInput) {
      countryInput.addEventListener('input', (e) => {
        this.searchCountryQuery = e.target.value;
        const grid = this.container.querySelector('.country-grid');
        if (grid) {
          let list = GeoEngine.getCountriesByContinent(this.selectedContinent);
          const q = this.searchCountryQuery.trim().toLowerCase();
          if (q) {
            list = list.filter(c =>
              c.name.toLowerCase().includes(q) ||
              c.nameEn.toLowerCase().includes(q) ||
              c.capital.toLowerCase().includes(q) ||
              c.continent.toLowerCase().includes(q) ||
              c.currency.toLowerCase().includes(q) ||
              c.landmark.toLowerCase().includes(q)
            );
          }
          grid.innerHTML = list.map(c => `
            <div class="country-card">
              <div>
                <div class="country-card-header">
                  <span class="country-flag-icon">${c.flag}</span>
                  <span class="subject-badge">${c.continent}</span>
                </div>
                <h4 class="country-name">${c.name} <span class="country-en-sub">(${c.nameEn})</span></h4>
                
                <div class="country-info-row">
                  <span>🏛️ ${t('capitalLabel', appState.get().lang || 'id')}</span>
                  <strong>${c.capital}</strong>
                </div>
                <div class="country-info-row">
                  <span>💰 ${t('currencyLabel', appState.get().lang || 'id')}</span>
                  <strong>${c.currency}</strong>
                </div>
                <div class="country-info-row">
                  <span>🗣️ ${t('languageLabel', appState.get().lang || 'id')}</span>
                  <span>${c.language}</span>
                </div>
                <div class="country-landmark-box">
                  <span class="landmark-tag">📍 ${t('landmarkLabel', appState.get().lang || 'id')}</span>
                  <p class="landmark-text">${c.landmark}</p>
                </div>
                <div class="country-fun-fact">
                  <span class="fact-badge">${t('countryFunFactBadge', appState.get().lang || 'id')}</span>
                  <p>${c.funFact}</p>
                </div>
              </div>
              <button class="btn primary btn-focus-country-globe" data-lon="${c.coords[0]}" data-lat="${c.coords[1]}" data-name="${c.name} ${c.flag}" type="button">
                ${t('focusOnGlobeBtn', appState.get().lang || 'id')}
              </button>
            </div>
          `).join('');

          // Re-bind focus buttons in new grid
          this.bindFocusCountryButtons();
        }
      });
    }

    // Bind focus country buttons
    this.bindFocusCountryButtons();

    // Island filters
    const chipBtns = this.container.querySelectorAll('.chip-btn[data-island]');
    chipBtns.forEach(c => {
      c.addEventListener('click', () => {
        this.selectedIsland = c.getAttribute('data-island');
        this.renderGeography();
      });
    });

    // City search input
    const cityInput = this.container.querySelector('#citySearchInput');
    if (cityInput) {
      cityInput.addEventListener('input', (e) => {
        this.searchCityQuery = e.target.value;
        const grid = this.container.querySelector('.provinces-grid');
        if (grid) {
          const cities = GeoEngine.getNonCapitalCities(this.searchCityQuery);
          grid.innerHTML = cities.map(c => `
            <div class="province-card" style="${c.name === 'Malang' ? 'border: 2px solid var(--teal); background: var(--teal-soft);' : ''}">
              <div>
                <div class="province-header">
                  <span style="font-size:24px;">${c.icon}</span>
                  <span class="subject-badge" style="background:#ffb21b; color:#0e2e48;">Bukan Ibu Kota</span>
                </div>
                <h4 class="province-name" style="color:${c.name === 'Malang' ? 'var(--teal-soft-ink)' : 'inherit'};">
                  ${c.name} ${c.name === 'Malang' ? '⭐ (Contoh Wajib)' : ''}
                </h4>
                <div class="capital-row">
                  <span>📍 Bagian dari Provinsi:</span>
                  <strong>${c.province} (${c.island})</strong>
                </div>
                <p class="province-fact">✨ ${c.desc}</p>
              </div>
            </div>
          `).join('');
        }
      });
    }

    // Globe controls
    const btnRotateLeft = this.container.querySelector('#btnGlobeRotateLeft');
    const btnRotateRight = this.container.querySelector('#btnGlobeRotateRight');
    const btnAutoRotate = this.container.querySelector('#btnGlobeAutoRotate');
    const btnFocusId = this.container.querySelector('#btnGlobeFocusIndonesia');
    const btnZoomIn = this.container.querySelector('#btnGlobeZoomIn');
    const btnZoomOut = this.container.querySelector('#btnGlobeZoomOut');

    if (btnRotateLeft) {
      btnRotateLeft.addEventListener('click', () => {
        if (this.globeVis) this.globeVis.rotateBy(-25);
      });
    }
    if (btnRotateRight) {
      btnRotateRight.addEventListener('click', () => {
        if (this.globeVis) this.globeVis.rotateBy(25);
      });
    }
    if (btnAutoRotate) {
      btnAutoRotate.addEventListener('click', () => {
        if (this.globeVis) {
          const isSpinning = this.globeVis.toggleAutoRotate();
          btnAutoRotate.textContent = isSpinning ? '⏸ Berhenti' : '▶ Putar';
        }
      });
    }
    if (btnFocusId) {
      btnFocusId.addEventListener('click', () => {
        if (this.globeVis) {
          this.globeVis.focusIndonesia();
        }
      });
    }
    if (btnZoomIn) {
      btnZoomIn.addEventListener('click', () => {
        if (this.globeVis) {
          this.globeVis.zoomBy(0.25);
        }
      });
    }
    if (btnZoomOut) {
      btnZoomOut.addEventListener('click', () => {
        if (this.globeVis) {
          this.globeVis.zoomBy(-0.25);
        }
      });
    }

    // Quiz tabs
    const quizSelectBtns = this.container.querySelectorAll('.btn-select-quiz');
    quizSelectBtns.forEach(qb => {
      qb.addEventListener('click', () => {
        this.activeQuizIndex = parseInt(qb.getAttribute('data-idx'), 10);
        this.renderGeography();
      });
    });

    const quizWrap = this.container.querySelector('#quizContainer');
    if (quizWrap) {
      const qz = GEO_DATA.quizzes[this.activeQuizIndex];
      new QuizRunner(quizWrap, qz, () => {
        appState.navigate('progress');
      });
    }

    // Video play
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

  // ==========================================================
  // 8 MATA PELAJARAN LAINNYA
  // ==========================================================
  renderGenericSubject(subjectId) {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const meta = SUBJECTS.find(s => s.id === subjectId);
    if (!meta) return;

    let subjectData = null;
    if (subjectId === 'bahasa-indonesia') subjectData = BAHASA_INDONESIA_DATA;
    else if (subjectId === 'bahasa-inggris') subjectData = ENGLISH_DATA;
    else if (subjectId === 'pancasila') subjectData = PANCASILA_DATA;
    else if (subjectId === 'bahasa-bali') subjectData = BAHASA_BALI_DATA;
    else if (subjectId === 'seni-rupa') subjectData = SENI_RUPA_DATA;
    else if (subjectId === 'pjok') subjectData = PJOK_DATA;
    else if (subjectId === 'agama') subjectData = AGAMA_DATA;
    else if (subjectId === 'kokurikuler') subjectData = KOKURIKULER_DATA;

    if (!subjectData) {
      this.container.innerHTML = `<p>${isEn ? 'Content is being prepared.' : 'Materi sedang dipersiapkan.'}</p>`;
      return;
    }

    const title = (isEn && subjectData.titleEn) ? subjectData.titleEn : subjectData.title;
    const subtitle = (isEn && subjectData.subtitleEn) ? subjectData.subtitleEn : subjectData.subtitle;
    const badge = getSubjectBadge(meta, lang);

    this.container.innerHTML = `
      <div class="section-header">
        <div class="math-hero-badge" style="background:${meta.accentLight}; color:${meta.accentColor}; border-color:${meta.accentBorder};">
          ${meta.icon} ${badge}
        </div>
        <h2 class="section-title">${title}</h2>
        <p class="section-sub">${subtitle}</p>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        ${subjectData.topics.map((top, idx) => {
          const topTitle = (isEn && top.titleEn) ? top.titleEn : top.title;
          const topDesc = (isEn && top.descEn) ? top.descEn : top.desc;
          const checklist = (isEn && top.checklistEn) ? top.checklistEn : top.checklist;

          return `
            <div class="quiz-box">
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                <span class="no" style="background:var(--navy); color:#fff; border-radius:6px; padding:2px 8px; font-size:11px; font-weight:800;">
                  ${isEn ? 'Topic' : 'Topik'} ${idx + 1}
                </span>
                <h3 style="margin:0; font-size:18px; font-weight:800;">${topTitle}</h3>
              </div>
              <p style="margin:0 0 16px; font-size:13.5px; color:var(--muted); line-height:1.6;">
                ${topDesc}
              </p>

              ${checklist ? `
                <div style="background:var(--paper); border-radius:12px; padding:14px; margin-bottom:16px;">
                  <strong style="font-size:13px; display:block; margin-bottom:8px;">${isEn ? 'Independent Mission:' : 'Misi Mandiri:'}</strong>
                  <ul style="margin:0; padding-left:20px; font-size:13px; color:var(--ink);">
                    ${checklist.map(item => `<li>${item}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}

              <!-- Mini Quiz / Interaktivitas Topik -->
              ${top.activities ? `
                <div class="topic-activity-wrap" id="act_${top.id}"></div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;

    // Render kuis di tiap topik
    subjectData.topics.forEach(top => {
      // Untuk bahasa-inggris, gunakan top.activities aslinya sesuai user request ("kecuali pelajaran bahasa inggris")
      const activities = (isEn && top.activitiesEn) ? top.activitiesEn : top.activities;
      if (activities) {
        const wrap = this.container.querySelector(`#act_${top.id}`);
        if (wrap) {
          const fakeQuiz = {
            id: top.id,
            title: (isEn && top.titleEn) ? top.titleEn : top.title,
            questions: activities
          };
          new QuizRunner(wrap, fakeQuiz, () => {
            store.completeLesson(`${subjectId}:${top.id}`);
          });
        }
      }
    });
  }
}

