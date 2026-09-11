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
    this.activeRegion = 'indonesia';
    this.selectedMapIsland = 'Semua';
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
                <canvas id="globeCanvas" width="720" height="720"></canvas>
                <canvas id="globeOverlay" width="720" height="720"></canvas>
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

          <!-- PUSAT JELAJAH PETA & KAWASAN REGIONAL (Peta Indonesia, Bali, Benua Asia/Eropa/dll) -->
          <div class="geo-region-explorer-section" style="margin-top:32px;">
            <div class="interactive-map-header">
              <div>
                <div class="eyebrow"><span class="no">📍</span><span class="lbl">${lang === 'en' ? 'Interactive Regional Map Explorer' : 'Pusat Jelajah Peta & Kawasan Interaktif'}</span></div>
                <h3 class="interactive-map-title">${lang === 'en' ? 'Explore Indonesia, Bali, & Continents' : 'Jelajahi Peta Indonesia, Bali, & Benua Dunia'}</h3>
                <p style="font-size:13.5px; color:var(--muted); margin:4px 0 0;">
                  ${lang === 'en' ? 'Select a region below to inspect detailed maps, key landmarks, cultural facts, and orient the 3D globe.' : 'Pilih kawasan di bawah untuk melihat peta detail, landmark ikonik, fakta budaya, dan putar globe 3D langsung ke wilayah tersebut.'}
                </p>
              </div>
            </div>

            <div class="geo-region-filter-bar">
              <button class="region-chip ${(this.activeRegion || 'indonesia') === 'indonesia' ? 'active' : ''}" data-region="indonesia" type="button">
                🇮🇩 ${lang === 'en' ? 'Indonesia Map (38 Prov)' : 'Peta Indonesia (38 Prov)'}
              </button>
              <button class="region-chip ${this.activeRegion === 'bali' ? 'active' : ''}" data-region="bali" type="button">
                🏝️ ${lang === 'en' ? 'Bali Island Map' : 'Peta Pulau Bali'}
              </button>
              <button class="region-chip ${this.activeRegion === 'asia' ? 'active' : ''}" data-region="asia" type="button">
                🌏 ${lang === 'en' ? 'Asia Continent' : 'Benua Asia'}
              </button>
              <button class="region-chip ${this.activeRegion === 'europe' ? 'active' : ''}" data-region="europe" type="button">
                🏰 ${lang === 'en' ? 'Europe Continent' : 'Benua Eropa'}
              </button>
              <button class="region-chip ${this.activeRegion === 'africa' ? 'active' : ''}" data-region="africa" type="button">
                🦁 ${lang === 'en' ? 'Africa Continent' : 'Benua Afrika'}
              </button>
              <button class="region-chip ${this.activeRegion === 'americas' ? 'active' : ''}" data-region="americas" type="button">
                🗽 ${lang === 'en' ? 'Americas Continent' : 'Benua Amerika'}
              </button>
              <button class="region-chip ${this.activeRegion === 'oceania' ? 'active' : ''}" data-region="oceania" type="button">
                🦘 ${lang === 'en' ? 'Oceania Continent' : 'Benua Oseania'}
              </button>
              <button class="region-chip ${this.activeRegion === 'world' ? 'active' : ''}" data-region="world" type="button">
                🌍 ${lang === 'en' ? 'All Continents & Oceans' : 'Seluruh Benua & Samudra'}
              </button>
            </div>

            <div id="geoRegionContent" class="geo-region-content">
              ${this.getRegionContentHtml(this.activeRegion || 'indonesia', lang)}
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

  getRegionContentHtml(region, lang = 'id') {
    const isEn = lang === 'en';
    switch (region) {
      case 'indonesia': {
        const island = this.selectedMapIsland || 'Semua';
        const normIsland = island.toLowerCase().replace('sumatera', 'sumatra');
        let list = GEO_DATA.provinces || [];
        if (island !== 'Semua') {
          if (island === 'Maluku & Papua') {
            list = list.filter(p => p.island === 'Kepulauan Maluku' || p.island === 'Papua');
          } else {
            list = list.filter(p => p.island.toLowerCase().includes(normIsland));
          }
        }
        const islands = [
          { id: 'Semua', name: isEn ? 'All Archipelago (38)' : 'Semua Nusantara (38)', count: 38 },
          { id: 'Sumatra', name: 'Sumatera', count: 10 },
          { id: 'Jawa', name: 'Jawa', count: 6 },
          { id: 'Kalimantan', name: 'Kalimantan', count: 5 },
          { id: 'Sulawesi', name: 'Sulawesi', count: 6 },
          { id: 'Bali & Nusa Tenggara', name: 'Bali & Nusa Tenggara', count: 3 },
          { id: 'Maluku & Papua', name: 'Maluku & Papua', count: 8 }
        ];

        return `
          <div class="interactive-map-panel">
            <div class="interactive-map-header">
              <div>
                <h4 class="interactive-map-title">
                  🇮🇩 ${isEn ? 'Republic of Indonesia — 2D Interactive Map (38 Provinces)' : 'Peta 2D Interaktif Indonesia — 38 Provinsi & Kepulauan'}
                </h4>
                <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">
                  ${isEn ? 'Click on any island on the vector map or choose a button below to explore provinces and unique facts.' : 'Sentuh atau klik pulau pada peta vektor 2D di bawah ini untuk menjelajahi keunikan dan ibu kota provinsi.'}
                </p>
              </div>
              <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:var(--teal-soft); color:var(--teal-soft-ink); font-weight:700;">
                🗺️ ${isEn ? '2D Vector Atlas' : 'Peta Vektor 2D Interaktif'}
              </span>
            </div>

            <!-- Visual 2D SVG Map of Indonesia -->
            <div class="peta-2d-canvas-box" style="margin-bottom:16px;">
              <svg class="svg-map-frame" viewBox="0 0 940 380" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <!-- Lautan / Background perairan -->
                <rect width="940" height="380" rx="16" fill="currentColor" style="color:var(--surface); opacity:0.6;"/>
                <defs>
                  <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0284c7" stop-opacity="0.08"/>
                    <stop offset="100%" stop-color="#0369a1" stop-opacity="0.18"/>
                  </linearGradient>
                  <filter id="shadowIsland" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="1" dy="3" stdDeviation="3" flood-opacity="0.25"/>
                  </filter>
                </defs>
                <rect width="940" height="380" rx="16" fill="url(#oceanGrad)"/>

                <!-- Garis Khatulistiwa 0 Derajat -->
                <line x1="20" y1="138" x2="920" y2="138" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.65"/>
                <text x="30" y="132" fill="#ef4444" font-size="11" font-weight="700" letter-spacing="1">GARIS KHATULISTIWA (EQUATOR 0°)</text>

                <!-- Arah Mata Angin Kompas -->
                <g transform="translate(890, 42)" opacity="0.75">
                  <circle cx="0" cy="0" r="18" fill="var(--card)" stroke="var(--line)" stroke-width="1.5"/>
                  <path d="M 0 -12 L 4 0 L 0 3 L -4 0 Z" fill="#ef4444"/>
                  <path d="M 0 12 L 4 0 L 0 3 L -4 0 Z" fill="var(--muted)"/>
                  <text x="0" y="-14" text-anchor="middle" font-size="9.5" font-weight="900" fill="#ef4444">U</text>
                </g>

                <!-- Pulau Sumatra -->
                <g class="svg-island-interactive ${island === 'Sumatra' ? 'active' : ''}" data-island="Sumatra" filter="url(#shadowIsland)">
                  <path d="M 39.5 53.6 L 43.1 50.8 L 47.9 66.8 L 57.6 77.2 L 67.2 92.4 L 84.1 123.6 L 94.6 137.2 L 105.1 146.4 L 115.6 160.8 L 132.5 174.4 L 148.2 196.4 L 165.1 217.2 L 180.7 236 L 202.4 256.4 L 217.5 272.8 L 222.9 285.2 L 238 290.4 L 227.7 296 L 210.3 286.4 L 199.4 266.4 L 176.5 237.2 L 149.4 206.8 L 130.7 186.4 L 115.6 162.8 L 97.6 142.4 L 79.5 119.6 L 64.4 96.8 L 51.2 78 L 39.5 53.6 Z"
                        fill="#10b981" stroke="#047857" stroke-width="2"/>
                  <text x="110" y="165" font-size="13" font-weight="800" fill="#064e3b" text-anchor="middle" style="pointer-events:none;">SUMATERA</text>
                </g>

                <!-- Pulau Jawa -->
                <g class="svg-island-interactive ${island === 'Jawa' ? 'active' : ''}" data-island="Jawa" filter="url(#shadowIsland)">
                  <path d="M 226.5 289.6 L 260.8 288.4 L 297 290.8 L 334.3 293.6 L 372.3 295.2 L 410.2 300 L 444.6 304.8 L 478.9 308.8 L 515 311.2 L 536.7 312 L 547.6 312 L 545.2 316.8 L 521 318.4 L 484.9 319.2 L 442.2 319.2 L 401.8 318.4 L 360.8 317.6 L 320.5 315.2 L 278.9 313.6 L 253 310.4 L 230.1 306.4 L 224.1 298.4 Z"
                        fill="#f59e0b" stroke="#b45309" stroke-width="2"/>
                  <text x="380" y="312" font-size="13" font-weight="800" fill="#78350f" text-anchor="middle" style="pointer-events:none;">JAWA</text>
                </g>

                <!-- Pulau Kalimantan -->
                <g class="svg-island-interactive ${island === 'Kalimantan' ? 'active' : ''}" data-island="Kalimantan" filter="url(#shadowIsland)">
                  <path d="M 300.8 190.4 L 315.9 164.8 L 336.3 147.2 L 358 132 L 388.7 114.4 L 417.6 102 L 443.5 98 L 464 104.4 L 477.3 118.8 L 485.7 137.2 L 482.1 158.4 L 468.8 178 L 459.8 198 L 461 218 L 452.6 237.2 L 434.5 250 L 414 256.4 L 389.9 256.4 L 368.2 250 L 345.9 238 L 327.9 220 L 311 202 Z"
                        fill="#059669" stroke="#065f46" stroke-width="2"/>
                  <text x="395" y="180" font-size="13" font-weight="800" fill="#022c22" text-anchor="middle" style="pointer-events:none;">KALIMANTAN</text>
                </g>

                <!-- Pulau Sulawesi -->
                <g class="svg-island-interactive ${island === 'Sulawesi' ? 'active' : ''}" data-island="Sulawesi" filter="url(#shadowIsland)">
                  <path d="M 490 120 L 518 116 L 542 118 L 570 125 L 565 138 L 540 144 L 522 150 L 518 174 L 545 186 L 568 192 L 562 205 L 535 200 L 518 205 L 522 232 L 535 258 L 515 264 L 504 235 L 500 195 L 482 178 L 485 145 Z"
                        fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/>
                  <text x="548" y="172" font-size="12.5" font-weight="800" fill="#1e3a8a" text-anchor="middle" style="pointer-events:none;">SULAWESI</text>
                </g>

                <!-- Kepulauan Bali & Nusa Tenggara -->
                <g class="svg-island-interactive ${island === 'Bali & Nusa Tenggara' ? 'active' : ''}" data-island="Bali & Nusa Tenggara" filter="url(#shadowIsland)">
                  <!-- Bali -->
                  <path d="M 548 313 L 562 312 L 567 318 L 558 325 L 546 322 Z" fill="#ec4899" stroke="#be185d" stroke-width="1.8"/>
                  <text x="556" y="306" font-size="10" font-weight="800" fill="#9d174d" text-anchor="middle" style="pointer-events:none;">BALI</text>
                  <!-- Lombok & Sumbawa (NTB) -->
                  <path d="M 572 314 L 602 312 L 625 316 L 620 326 L 595 328 L 570 324 Z" fill="#f43f5e" stroke="#be123c" stroke-width="1.8"/>
                  <!-- Flores, Sumba & Timor (NTT) -->
                  <path d="M 632 315 L 685 314 L 690 324 L 635 326 Z" fill="#f43f5e" stroke="#be123c" stroke-width="1.8"/>
                  <path d="M 620 335 L 655 334 L 652 344 L 618 343 Z" fill="#f43f5e" stroke="#be123c" stroke-width="1.8"/>
                  <path d="M 700 328 L 740 325 L 745 335 L 705 342 Z" fill="#f43f5e" stroke="#be123c" stroke-width="1.8"/>
                  <text x="645" y="348" font-size="10.5" font-weight="800" fill="#881337" text-anchor="middle" style="pointer-events:none;">NUSA TENGGARA</text>
                </g>

                <!-- Kepulauan Maluku -->
                <g class="svg-island-interactive ${island === 'Maluku & Papua' ? 'active' : ''}" data-island="Maluku & Papua" filter="url(#shadowIsland)">
                  <!-- Halmahera -->
                  <path d="M 685 95 L 702 92 L 705 115 L 720 122 L 712 135 L 698 128 L 688 145 L 678 138 L 688 120 L 680 108 Z" fill="#06b6d4" stroke="#0e7490" stroke-width="1.8"/>
                  <!-- Buru, Seram, Ambon -->
                  <path d="M 662 188 L 682 186 L 680 200 L 660 198 Z" fill="#06b6d4" stroke="#0e7490" stroke-width="1.8"/>
                  <path d="M 692 188 L 742 186 L 740 198 L 690 198 Z" fill="#06b6d4" stroke="#0e7490" stroke-width="1.8"/>
                  <text x="696" y="174" font-size="11" font-weight="800" fill="#155e75" text-anchor="middle" style="pointer-events:none;">MALUKU</text>
                </g>

                <!-- Pulau Papua -->
                <g class="svg-island-interactive ${island === 'Maluku & Papua' ? 'active' : ''}" data-island="Maluku & Papua" filter="url(#shadowIsland)">
                  <path d="M 735 150 L 760 142 L 782 152 L 778 175 L 760 178 L 755 192 L 775 198 L 795 200 L 840 202 L 890 205 L 890 290 L 840 286 L 798 278 L 775 258 L 760 228 L 745 198 L 730 175 Z"
                        fill="#8b5cf6" stroke="#6d28d9" stroke-width="2"/>
                  <text x="825" y="240" font-size="14" font-weight="800" fill="#4c1d95" text-anchor="middle" style="pointer-events:none;">PAPUA</text>
                </g>
              </svg>

              <!-- Legend Bar di Bawah Peta 2D -->
              <div class="peta-2d-legend-bar">
                <span>💡 <strong>Tips:</strong> Klik pulau langsung pada gambar peta di atas atau pilih filter di bawah.</span>
                <span>✨ <strong>Wilayah:</strong> 38 Provinsi · 3 Zona Waktu (WIB, WITA, WIT) · > 17.500 Pulau</span>
              </div>
            </div>

            <!-- Filter Kepulauan Indonesia -->
            <div class="island-nav-grid">
              ${islands.map(isl => `
                <button class="island-card-btn ${island === isl.id ? 'active' : ''}" data-map-island="${isl.id}" type="button">
                  <strong>🏝️ ${isl.name}</strong>
                  <span>${isl.count} ${isEn ? 'Provinces' : 'Provinsi'}</span>
                </button>
              `).join('')}
            </div>

            <!-- Ringkasan Wilayah Terpilih -->
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
              <span style="font-size:13.5px; font-weight:700; color:var(--ink);">
                ${isEn ? 'Displaying' : 'Menampilkan'}: <span style="color:var(--teal); font-weight:800;">${island}</span> (${list.length} ${isEn ? 'provinces' : 'provinsi'})
              </span>
            </div>

            <!-- Grid Provinsi Indonesia (Bersih tanpa undefined & tanpa tombol link globe) -->
            <div class="provinces-grid">
              ${list.map((p, idx) => `
                <div class="province-card" id="provCard_${p.id}">
                  <div>
                    <div class="province-header">
                      <span class="province-no" style="font-size:22px; display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; background:var(--surface); border-radius:50%;">
                        ${p.icon || '🏛️'}
                      </span>
                      <span class="subject-badge">${p.island}</span>
                    </div>
                    <h4 class="province-name">${p.name}</h4>
                    <div class="capital-row">
                      <span>🏛️ ${isEn ? 'Capital City' : 'Ibu Kota'}:</span>
                      <strong>${p.capital}</strong>
                    </div>
                    <div class="country-landmark-box" style="margin-top:10px;">
                      <span class="landmark-tag">✨ ${isEn ? 'Unique Fact' : 'Fakta Unik & Ciri Khas'}</span>
                      <p class="landmark-text" style="font-size:12.5px; line-height:1.55; margin:4px 0 0;">${p.funFact}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      case 'bali': {
        const bali = GEO_DATA.baliModule;
        const landmarks = [
          { name: 'Pura Tanah Lot', reg: 'Tabanan', icon: '🌊', desc: isEn ? 'Ancient sea temple perched on an offshore rock formation with spectacular sunset views.' : 'Pura suci di atas batu karang lepas pantai dengan pemandangan matahari terbenam memukau.' },
          { name: 'Pura Luhur Uluwatu', reg: 'Badung', icon: '🌅', desc: isEn ? 'Cliffside temple 70 meters above the Indian Ocean, famous for evening Kecak fire dance.' : 'Pura megah di puncak tebing karang curam 70 meter di atas Samudra Hindia dengan Tari Kecak api.' },
          { name: 'Pura Agung Besakih', reg: 'Karangasem', icon: '⛰️', desc: isEn ? 'The Mother Temple of Bali nestled on the slopes of sacred Mount Agung (3,142m).' : 'Ibu dari seluruh Pura di Bali yang berdiri kokoh dan anggun di lereng Gunung Agung.' },
          { name: 'Danau & Pura Ulun Danu Beratan', reg: 'Tabanan (Bedugul)', icon: '🌸', desc: isEn ? 'Picturesque water temple located on the tranquil shores of Lake Beratan in cool Bedugul.' : 'Pura danau yang tampak terapung di Danau Beratan dengan udara pegunungan Bedugul yang sejuk.' },
          { name: 'Terasering Sawah Jatiluwih', reg: 'Tabanan', icon: '🌾', desc: isEn ? 'UNESCO World Heritage terraced rice fields preserved with the thousand-year Subak cooperative water system.' : 'Hamparan sawah berundak spektakuler Warisan Budaya Dunia UNESCO dengan sistem irigasi Subak.' },
          { name: 'Pura Tirta Empul', reg: 'Gianyar (Tampaksiring)', icon: '💧', desc: isEn ? 'Sacred water spring temple where worshippers take holy cleansing baths (Melukat).' : 'Pura mata air suci yang digunakan untuk ritual penyucian diri dan ketenangan jiwa (Melukat).' },
          { name: 'Mandala Suci Wenara Wana (Monkey Forest)', reg: 'Gianyar (Ubud)', icon: '🐒', desc: isEn ? 'Sacred monkey sanctuary in Ubud enveloped by dense tropical banyan forests and historic temples.' : 'Kawasan hutan suci di Ubud yang dihuni ratusan kera abu-abu ramah dan pohon beringin rimbun.' }
        ];

        return `
          <div class="interactive-map-panel">
            <div class="interactive-map-header">
              <div>
                <h4 class="interactive-map-title">
                  🏝️ ${isEn ? 'Island of Bali — 2D Interactive Map (8 Regencies & 1 City)' : 'Peta 2D Interaktif Pulau Bali — 8 Kabupaten & 1 Kota Madya'}
                </h4>
                <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">
                  ${isEn ? 'Explore the Island of Gods by clicking regencies or landmark pins directly on the 2D map below.' : 'Jelajahi Pulau Dewata dengan mengklik kabupaten atau pin landmark langsung pada peta 2D di bawah.'}
                </p>
              </div>
              <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:linear-gradient(135deg, #ffedd5, #fed7aa); color:#9a3412; font-weight:800;">
                🌺 Peta Vektor 2D Bali
              </span>
            </div>

            <!-- Visual 2D SVG Map of Bali -->
            <div class="peta-2d-canvas-box" style="margin-bottom:20px;">
              <svg class="svg-map-frame" viewBox="0 0 760 480" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                <!-- Lautan sekeliling Bali -->
                <rect width="760" height="480" rx="16" fill="currentColor" style="color:var(--surface); opacity:0.6;"/>
                <defs>
                  <linearGradient id="baliOceanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
                    <stop offset="100%" stop-color="#0369a1" stop-opacity="0.2"/>
                  </linearGradient>
                  <filter id="baliShadow" x="-5%" y="-5%" width="120%" height="120%">
                    <feDropShadow dx="1" dy="3" stdDeviation="3" flood-opacity="0.2"/>
                  </filter>
                </defs>
                <rect width="760" height="480" rx="16" fill="url(#baliOceanGrad)"/>

                <!-- Label Lautan & Selat -->
                <text x="380" y="45" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle" letter-spacing="2">LAUT BALI (UTARA)</text>
                <text x="50" y="240" font-size="11" font-weight="700" fill="var(--muted)" text-anchor="middle" transform="rotate(-90 50 240)" letter-spacing="1">SELAT BALI (BARAT)</text>
                <text x="720" y="240" font-size="11" font-weight="700" fill="var(--muted)" text-anchor="middle" transform="rotate(90 720 240)" letter-spacing="1">SELAT LOMBOK (TIMUR)</text>
                <text x="380" y="465" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle" letter-spacing="2">SAMUDRA HINDIA (SELATAN)</text>

                <!-- 1. Buleleng (Utara) -->
                <path class="svg-regency-interactive" data-regency="Buleleng" filter="url(#baliShadow)"
                      d="M 120 160 L 220 110 L 360 85 L 500 95 L 600 135 L 580 170 L 460 150 L 350 145 L 240 165 L 140 185 Z"
                      fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
                <text x="360" y="125" font-size="12" font-weight="800" fill="#075985" text-anchor="middle" style="pointer-events:none;">BULELENG (Singaraja)</text>

                <!-- 2. Jembrana (Barat) -->
                <path class="svg-regency-interactive" data-regency="Jembrana" filter="url(#baliShadow)"
                      d="M 60 210 L 140 185 L 240 165 L 230 220 L 180 255 L 80 245 Z"
                      fill="#34d399" stroke="#059669" stroke-width="2"/>
                <text x="140" y="225" font-size="11.5" font-weight="800" fill="#065f46" text-anchor="middle" style="pointer-events:none;">JEMBRANA (Negara)</text>

                <!-- 3. Tabanan (Barat Daya & Tengah) -->
                <path class="svg-regency-interactive" data-regency="Tabanan" filter="url(#baliShadow)"
                      d="M 240 165 L 350 145 L 340 230 L 300 295 L 220 285 L 180 255 L 230 220 Z"
                      fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
                <text x="265" y="235" font-size="11.5" font-weight="800" fill="#78350f" text-anchor="middle" style="pointer-events:none;">TABANAN</text>

                <!-- 4. Badung (Tengah Memanjang ke Selatan) -->
                <path class="svg-regency-interactive" data-regency="Badung" filter="url(#baliShadow)"
                      d="M 350 145 L 390 150 L 380 235 L 410 285 L 415 350 L 390 420 L 360 415 L 375 345 L 340 290 L 340 230 Z"
                      fill="#f87171" stroke="#dc2626" stroke-width="2"/>
                <text x="365" y="325" font-size="10.5" font-weight="800" fill="#7f1d1d" text-anchor="middle" style="pointer-events:none;">BADUNG</text>

                <!-- 5. Denpasar (Kota Madya Pesisir Tenggara) -->
                <path class="svg-regency-interactive" data-regency="Denpasar" filter="url(#baliShadow)"
                      d="M 410 285 L 455 290 L 460 335 L 415 350 Z"
                      fill="#ec4899" stroke="#be185d" stroke-width="2"/>
                <text x="435" y="320" font-size="10" font-weight="800" fill="#831843" text-anchor="middle" style="pointer-events:none;">DENPASAR</text>

                <!-- 6. Gianyar (Timur Tengah) -->
                <path class="svg-regency-interactive" data-regency="Gianyar" filter="url(#baliShadow)"
                      d="M 390 150 L 445 155 L 470 230 L 455 290 L 410 285 L 380 235 Z"
                      fill="#a78bfa" stroke="#7c3aed" stroke-width="2"/>
                <text x="425" y="225" font-size="11" font-weight="800" fill="#4c1d95" text-anchor="middle" style="pointer-events:none;">GIANYAR</text>

                <!-- 7. Bangli (Pegunungan Tengah) -->
                <path class="svg-regency-interactive" data-regency="Bangli" filter="url(#baliShadow)"
                      d="M 445 155 L 485 150 L 515 220 L 470 230 Z"
                      fill="#818cf8" stroke="#4f46e5" stroke-width="2"/>
                <text x="480" y="195" font-size="11" font-weight="800" fill="#312e81" text-anchor="middle" style="pointer-events:none;">BANGLI</text>

                <!-- 8. Karangasem (Ujung Timur / Gunung Agung) -->
                <path class="svg-regency-interactive" data-regency="Karangasem" filter="url(#baliShadow)"
                      d="M 500 115 L 600 135 L 670 190 L 640 255 L 545 245 L 515 220 L 530 145 Z"
                      fill="#fb923c" stroke="#ea580c" stroke-width="2"/>
                <text x="585" y="195" font-size="12" font-weight="800" fill="#7c2d12" text-anchor="middle" style="pointer-events:none;">KARANGASEM (Amlapura)</text>

                <!-- 9. Klungkung (Daratan + Nusa Penida) -->
                <g class="svg-regency-interactive" data-regency="Klungkung" filter="url(#baliShadow)">
                  <path d="M 470 230 L 545 245 L 525 285 L 460 275 Z" fill="#2dd4bf" stroke="#0d9488" stroke-width="2"/>
                  <path d="M 550 330 L 610 325 L 625 365 L 565 375 Z" fill="#2dd4bf" stroke="#0d9488" stroke-width="2"/>
                  <text x="495" y="260" font-size="10.5" font-weight="800" fill="#134e4a" text-anchor="middle" style="pointer-events:none;">KLUNGKUNG</text>
                  <text x="585" y="355" font-size="10" font-weight="800" fill="#134e4a" text-anchor="middle" style="pointer-events:none;">Nusa Penida</text>
                </g>

                <!-- Pin Landmark Ikonik Bali -->
                <!-- Pura Tanah Lot -->
                <g class="svg-landmark-pin" data-landmark="Pura Tanah Lot" transform="translate(260, 290)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">1</text>
                </g>
                <!-- Uluwatu -->
                <g class="svg-landmark-pin" data-landmark="Pura Luhur Uluwatu" transform="translate(365, 415)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">2</text>
                </g>
                <!-- Besakih -->
                <g class="svg-landmark-pin" data-landmark="Pura Agung Besakih" transform="translate(560, 168)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">3</text>
                </g>
                <!-- Danau Beratan -->
                <g class="svg-landmark-pin" data-landmark="Danau & Pura Ulun Danu Beratan" transform="translate(345, 142)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">4</text>
                </g>
                <!-- Jatiluwih -->
                <g class="svg-landmark-pin" data-landmark="Terasering Sawah Jatiluwih" transform="translate(295, 195)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">5</text>
                </g>
                <!-- Tirta Empul -->
                <g class="svg-landmark-pin" data-landmark="Pura Tirta Empul" transform="translate(435, 185)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">6</text>
                </g>
                <!-- Ubud Monkey Forest -->
                <g class="svg-landmark-pin" data-landmark="Mandala Suci Wenara Wana (Monkey Forest)" transform="translate(415, 245)">
                  <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#fff" stroke-width="2"/>
                  <text x="0" y="3.5" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">7</text>
                </g>
              </svg>

              <!-- Legend Bar Bali -->
              <div class="peta-2d-legend-bar">
                <span>📍 <strong>Pin Merah 1–7:</strong> Landmark Terkenal (1.Tanah Lot · 2.Uluwatu · 3.Besakih · 4.Bedugul · 5.Jatiluwih · 6.Tirta Empul · 7.Monkey Forest)</span>
                <span>🌺 <strong>Kearifan:</strong> Tri Hita Karana & Sistem Subak UNESCO</span>
              </div>
            </div>

            <!-- 8 Kabupaten + 1 Kota Grid (Bersih tanpa undefined) -->
            <div class="eyebrow" style="margin-top:16px;">
              <span class="no">🏛️</span>
              <span class="lbl">${isEn ? '8 Regencies & 1 Administrative City in Bali' : 'Daftar 8 Kabupaten & 1 Kota Madya di Bali'}</span>
            </div>
            <div class="bali-grid" style="margin-top:10px;">
              ${bali.regions.map(r => `
                <div class="bali-region-card" id="baliCard_${r.name.replace(/\s+/g, '_')}">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                    <span class="region-type">${r.type}</span>
                    <span style="font-size:24px;">${r.icon}</span>
                  </div>
                  <h4 style="margin:4px 0 6px;">${r.name}</h4>
                  <div class="bali-gov-center">
                    🏛️ ${t('govCenterLabel', lang)}: <strong>${r.capital}</strong>
                  </div>
                  <p style="margin:8px 0 0; font-size:12.5px; color:var(--muted); line-height:1.55;">
                    ${r.highlight}
                  </p>
                </div>
              `).join('')}
            </div>

            <!-- Landmark Ikonik Bali Explorer -->
            <div class="eyebrow" style="margin-top:28px;">
              <span class="no">📍</span>
              <span class="lbl">${isEn ? '7 Iconic Bali Landmarks & World Heritage' : '7 Destinasi Landmark Ikonik & Warisan Dunia di Bali'}</span>
            </div>
            <div class="bali-landmarks-grid">
              ${landmarks.map((lm, idx) => `
                <div class="bali-landmark-item" id="landmarkCard_${idx + 1}">
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                    <span style="font-size:22px;">${lm.icon}</span>
                    <h5 style="margin:0; font-size:14.5px; font-weight:800;">${lm.name}</h5>
                  </div>
                  <span class="subject-badge" style="font-size:11px; margin-bottom:8px; display:inline-block;">📍 ${lm.reg}</span>
                  <p style="margin:0; font-size:12.5px; color:var(--muted); line-height:1.5;">${lm.desc}</p>
                </div>
              `).join('')}
            </div>

            <!-- Budaya & Tradisi Luhur Bali -->
            <div class="continent-stats-banner" style="margin-top:24px; background:linear-gradient(135deg, rgba(230,81,0,0.08), rgba(255,178,27,0.12)); border:1px solid #ffb21b;">
              <h4 style="margin:0 0 10px; font-size:16px; font-weight:800; color:var(--ink);">🌺 ${isEn ? 'Balinese Wisdom & Living Traditions' : 'Kearifan Lokal & Seni Budaya Luhur Bali'}</h4>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; font-size:12.5px; color:var(--muted);">
                <div><strong>🌊 Subak:</strong> ${isEn ? 'Egalitarian community irrigation system recognized by UNESCO.' : 'Sistem irigasi sawah tradisional berbasis gotong royong yang diakui UNESCO.'}</div>
                <div><strong>🎭 Seni Tari:</strong> ${isEn ? 'Tari Kecak, Tari Barong, Tari Pendet & gamelan semar pegulingan.' : 'Tari Kecak, Tari Barong, Tari Pendet, Legong, dan gamelan Bali.'}</div>
                <div><strong>✨ Hari Raya Nyepi:</strong> ${isEn ? 'Balinese New Year of total silence, no lights, and meditation.' : 'Tahun Baru Saka yang hening dengan Catur Brata Penyepian tanpa polusi suara/cahaya.'}</div>
              </div>
            </div>
          </div>
        `;
      }

      case 'asia':
      case 'europe':
      case 'africa':
      case 'americas':
      case 'oceania': {
        const continentConfig = {
          asia: {
            title: isEn ? 'Asia Continent' : 'Benua Asia',
            icon: '🌏',
            filter: 'Asia',
            stats: [
              { label: isEn ? 'Area' : 'Luas Wilayah', val: '44,58 juta km² (Terbesar)' },
              { label: isEn ? 'Population' : 'Populasi', val: '> 4,7 Miliar (Terpadat)' },
              { label: isEn ? 'Highest Peak' : 'Puncak Tertinggi', val: 'Gunung Everest (8.848 m)' },
              { label: isEn ? 'Longest River' : 'Sungai Terpanjang', val: 'Sungai Yangtze (6.300 km)' }
            ],
            desc: isEn ? 'The largest continent on Earth, spanning from tropical Indonesia to the Himalayas and the Arctic tundra.' : 'Benua terluas di dunia dengan ragam kebudayaan tertua, membentang dari khatulistiwa nusantara hingga puncak Himalaya.'
          },
          europe: {
            title: isEn ? 'Europe Continent' : 'Benua Eropa',
            icon: '🏰',
            filter: 'Eropa',
            stats: [
              { label: isEn ? 'Area' : 'Luas Wilayah', val: '10,18 juta km²' },
              { label: isEn ? 'Population' : 'Populasi', val: '± 750 Juta' },
              { label: isEn ? 'Mountain Range' : 'Pegunungan', val: 'Pegunungan Alpen' },
              { label: isEn ? 'Longest River' : 'Sungai Terpanjang', val: 'Sungai Volga (3.530 km)' }
            ],
            desc: isEn ? 'Known as the Blue Continent with historic castles, advanced science, and classical art heritage.' : 'Dikenal sebagai Benua Biru dengan warisan arsitektur megah, kastil bersejarah, sains modern, dan seni rupa klasik.'
          },
          africa: {
            title: isEn ? 'Africa Continent' : 'Benua Afrika',
            icon: '🦁',
            filter: 'Afrika',
            stats: [
              { label: isEn ? 'Area' : 'Luas Wilayah', val: '30,37 juta km² (Ke-2 Terbesar)' },
              { label: isEn ? 'Population' : 'Populasi', val: '± 1,4 Miliar' },
              { label: isEn ? 'Longest River' : 'Sungai Terpanjang', val: 'Sungai Nil (6.650 km)' },
              { label: isEn ? 'Largest Desert' : 'Gurun Terluas', val: 'Gurun Sahara (9,2 juta km²)' }
            ],
            desc: isEn ? 'The cradle of ancient civilizations, home to incredible wildlife safaris and the immense Sahara Desert.' : 'Benua eksotis dengan sabana satwa liar terbesar, peradaban kuno Mesir piramida, dan Sungai Nil yang panjang.'
          },
          americas: {
            title: isEn ? 'Americas Continent' : 'Benua Amerika',
            icon: '🗽',
            filter: 'Amerika',
            stats: [
              { label: isEn ? 'Area' : 'Luas Wilayah', val: '42,55 juta km²' },
              { label: isEn ? 'Population' : 'Populasi', val: '± 1 Miliar' },
              { label: isEn ? 'Rainforest' : 'Hutan Terluas', val: 'Hutan Hujan Amazon' },
              { label: isEn ? 'Longest Range' : 'Pegunungan Terpanjang', val: 'Pegunungan Andes (7.000 km)' }
            ],
            desc: isEn ? 'Spanning both North and South hemispheres with Niagara Falls, Grand Canyon, and the Amazon lungs of Earth.' : 'Membentang dari kutub utara ke selatan, rumah bagi paru-paru dunia Hutan Amazon dan air terjun spektakuler.'
          },
          oceania: {
            title: isEn ? 'Oceania & Australia' : 'Benua Oseania & Australia',
            icon: '🦘',
            filter: 'Oseania',
            stats: [
              { label: isEn ? 'Area' : 'Luas Wilayah', val: '8,52 juta km² (Terkecil)' },
              { label: isEn ? 'Population' : 'Populasi', val: '± 45 Juta' },
              { label: isEn ? 'Coral Reef' : 'Karang Laut Terbesar', val: 'Great Barrier Reef' },
              { label: isEn ? 'Endemic Animals' : 'Satwa Khas', val: 'Kanguru, Koala, Platipus' }
            ],
            desc: isEn ? 'The island continent surrounded by the Pacific and Indian oceans, celebrated for marsupial wildlife and coral reefs.' : 'Benua kepulauan yang dikelilingi samudra luas, terkenal dengan hewan berkantung kanguru dan terumbu karang raksasa.'
          }
        };

        const cfg = continentConfig[region];
        const countries = (GEO_DATA.countries || []).filter(c => c.continent.toLowerCase().includes(cfg.filter.toLowerCase()));

        return `
          <div class="interactive-map-panel">
            <div class="interactive-map-header">
              <div>
                <h4 class="interactive-map-title">${cfg.icon} ${cfg.title}</h4>
                <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">${cfg.desc}</p>
              </div>
              <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:var(--surface); font-weight:700;">
                🌍 Atlas Regional 2D
              </span>
            </div>

            <!-- Banner Statistik Benua -->
            <div class="continent-stats-banner">
              ${cfg.stats.map(s => `
                <div class="stat-box">
                  <div class="stat-val">${s.val}</div>
                  <div class="stat-label">${s.label}</div>
                </div>
              `).join('')}
            </div>

            <div class="eyebrow" style="margin-top:20px;"><span class="no">🗺️</span><span class="lbl">${isEn ? 'Featured Countries in this Continent' : 'Daftar Negara Pilihan di Benua Ini'}</span></div>
            <div class="country-grid" style="margin-top:12px;">
              ${countries.map(c => `
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
                    <div class="country-landmark-box">
                      <span class="landmark-tag">📍 ${t('landmarkLabel', lang)}</span>
                      <p class="landmark-text">${c.landmark}</p>
                    </div>
                    <div class="country-fun-fact">
                      <span class="fact-badge">${t('countryFunFactBadge', lang)}</span>
                      <p>${c.funFact}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }

      case 'world':
      default: {
        return `
          <div class="interactive-map-panel">
            <div class="interactive-map-header">
              <div>
                <h4 class="interactive-map-title">🌍 ${isEn ? 'Planet Earth — 7 Continents & 5 Oceans' : 'Planet Bumi — 7 Benua & 5 Samudra Luas'}</h4>
                <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">
                  ${isEn ? 'Earth is our spherical blue home rotating in space. 70% of its surface is water.' : 'Bumi adalah bola raksasa rumah kita bersama di alam semesta. Sekitar 70% permukaannya tertutup perairan samudra.'}
                </p>
              </div>
              <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:var(--surface); font-weight:700;">
                🌐 Ringkasan Dunia 2D
              </span>
            </div>

            <!-- Ringkasan 7 Benua -->
            <div class="eyebrow" style="margin-top:16px;"><span class="no">🌍</span><span class="lbl">${isEn ? 'The 7 Continents on Earth' : '7 Benua Besar di Muka Bumi'}</span></div>
            <div class="island-nav-grid" style="margin-top:10px;">
              <div class="island-card-btn"><strong>🌏 Asia</strong><span>Terluas & terpadat</span></div>
              <div class="island-card-btn"><strong>🦁 Afrika</strong><span>Gurun Sahara & Nil</span></div>
              <div class="island-card-btn"><strong>🗽 Amerika Utara</strong><span>Kanada, AS, Meksiko</span></div>
              <div class="island-card-btn"><strong>🌴 Amerika Selatan</strong><span>Hutan Amazon & Andes</span></div>
              <div class="island-card-btn"><strong>❄️ Antartika</strong><span>Kutub Selatan es abadi</span></div>
              <div class="island-card-btn"><strong>🏰 Eropa</strong><span>Benua Biru bersejarah</span></div>
              <div class="island-card-btn"><strong>🦘 Oseania / Australia</strong><span>Kanguru & Karang Laut</span></div>
            </div>

            <!-- 5 Samudra Luas -->
            <div class="eyebrow" style="margin-top:24px;"><span class="no">🌊</span><span class="lbl">${isEn ? 'The 5 Great Oceans' : '5 Samudra Luas Dunia'}</span></div>
            <div class="bali-landmarks-grid" style="margin-top:10px;">
              <div class="bali-landmark-item">
                <h5>🌊 Samudra Pasifik</h5>
                <p>${isEn ? 'The largest ocean on Earth, covering more area than all land combined.' : 'Samudra terluas dan terdalam di dunia yang mencakup sepertiga permukaan Bumi.'}</p>
              </div>
              <div class="bali-landmark-item">
                <h5>🚢 Samudra Atlantik</h5>
                <p>${isEn ? 'The second largest ocean, separating the Americas from Europe and Africa.' : 'Samudra berbentuk huruf S yang memisahkan Benua Amerika dengan Eropa dan Afrika.'}</p>
              </div>
              <div class="bali-landmark-item">
                <h5>🏝️ Samudra Hindia</h5>
                <p>${isEn ? 'Warm tropical ocean washing the shores of Indonesia, India, and East Africa.' : 'Samudra tropis hangat yang mengelilingi perairan selatan nusantara dan benua Asia.'}</p>
              </div>
              <div class="bali-landmark-item">
                <h5>🧊 Samudra Arktik</h5>
                <p>${isEn ? 'The smallest and shallowest ocean, located around the frozen North Pole.' : 'Samudra paling utara di Kutub Utara yang sebagian besar permukaannya membeku tertutup es.'}</p>
              </div>
              <div class="bali-landmark-item">
                <h5>❄️ Samudra Selatan / Antarktika</h5>
                <p>${isEn ? 'Encircles the entire Antarctic continent with freezing currents and icebergs.' : 'Mengelilingi Benua Antartika dengan arus dingin dan gunung es terapung.'}</p>
              </div>
            </div>
          </div>
        `;
      }
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

    // Pasang listener Pusat Jelajah Peta Regional di bawah bola dunia
    this.attachRegionContentEvents();
  }

  attachRegionContentEvents() {
    const lang = appState.get().lang || 'id';

    // 1. Region chips (Tab Peta: Indonesia, Bali, Asia, Eropa, dll)
    const regionChips = this.container.querySelectorAll('.region-chip[data-region]');
    regionChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const targetRegion = chip.getAttribute('data-region');
        this.activeRegion = targetRegion;
        regionChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const contentEl = this.container.querySelector('#geoRegionContent');
        if (contentEl) {
          contentEl.innerHTML = this.getRegionContentHtml(this.activeRegion, lang);
          this.attachRegionContentEvents();
        }
      });
    });

    // 2. Island filter buttons in Indonesia Map
    const islandBtns = this.container.querySelectorAll('.island-card-btn[data-map-island]');
    islandBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedMapIsland = btn.getAttribute('data-map-island');
        const contentEl = this.container.querySelector('#geoRegionContent');
        if (contentEl) {
          contentEl.innerHTML = this.getRegionContentHtml('indonesia', lang);
          this.attachRegionContentEvents();
        }
      });
    });

    // 3. Interactive SVG Islands in Indonesia Map (Klik langsung pulau di peta 2D)
    const svgIslands = this.container.querySelectorAll('.svg-island-interactive[data-island]');
    svgIslands.forEach(el => {
      el.addEventListener('click', () => {
        const isl = el.getAttribute('data-island');
        this.selectedMapIsland = isl;
        const contentEl = this.container.querySelector('#geoRegionContent');
        if (contentEl) {
          contentEl.innerHTML = this.getRegionContentHtml('indonesia', lang);
          this.attachRegionContentEvents();
        }
      });
    });

    // 4. Interactive SVG Regencies in Bali Map (Klik langsung kabupaten di peta Bali)
    const svgRegencies = this.container.querySelectorAll('.svg-regency-interactive[data-regency]');
    svgRegencies.forEach(el => {
      el.addEventListener('click', () => {
        const reg = el.getAttribute('data-regency');
        svgRegencies.forEach(r => r.classList.remove('active'));
        el.classList.add('active');

        const targetCard = this.container.querySelector(`[id^="baliCard_"][id*="${reg}"]`);
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
          targetCard.style.boxShadow = '0 0 0 3px var(--teal)';
          setTimeout(() => { targetCard.style.boxShadow = ''; }, 1800);
        }
      });
    });

    // 5. Interactive Landmark Pins in Bali Map
    const landmarkPins = this.container.querySelectorAll('.svg-landmark-pin[data-landmark]');
    landmarkPins.forEach(pin => {
      pin.addEventListener('click', () => {
        const lmName = pin.getAttribute('data-landmark');
        const allLmCards = this.container.querySelectorAll('.bali-landmark-item');
        allLmCards.forEach(c => {
          if (c.textContent.includes(lmName)) {
            c.scrollIntoView({ behavior: 'smooth', block: 'center' });
            c.style.boxShadow = '0 0 0 3px #ef4444';
            setTimeout(() => { c.style.boxShadow = ''; }, 1800);
          }
        });
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

