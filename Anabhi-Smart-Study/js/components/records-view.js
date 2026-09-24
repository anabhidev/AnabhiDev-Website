// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Records & Statistics Encyclopedia Component
// Serba TER- di Indonesia & Serba TER- di Dunia
// Development · Anabhi Dev
// Version   : 1.0 (SOP v2.4 & Standar Coding v2.0 Aligned)
// ================================================================

import { RECORDS_DATA, RECORD_QUIZZES } from '../data/records-data.js';
import { appState } from '../state.js';
import { store } from '../store.js';
import { t } from '../data/i18n.js';
import { TtsEngine } from '../engine/tts-engine.js';
import { AudioFx } from '../engine/audio-fx.js';

export class RecordsViewComponent {
  constructor(containerEl) {
    this.container = containerEl;
    this.activeTab = 'encyclopedia'; // 'encyclopedia' | 'comparison' | 'quiz'
    this.activeScope = 'all';        // 'all' | 'indonesia' | 'world'
    this.activeCategory = 'all';     // 'all' | 'teknologi' | 'alam' | 'hewan' | 'bangunan'
    this.searchQuery = '';
    this.scaleType = 'speed';        // 'speed' | 'height'
    this.quizAnswers = {};
  }

  render() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const currentStudent = (store && typeof store.getStudent === 'function') ? store.getStudent() : 'Ana';

    // Filter data ensiklopedia
    let filteredRecords = RECORDS_DATA.filter(item => {
      if (this.activeScope !== 'all' && item.scope !== this.activeScope) return false;
      if (this.activeCategory !== 'all' && item.category !== this.activeCategory) return false;
      if (this.searchQuery.trim()) {
        const q = this.searchQuery.toLowerCase().trim();
        const title = (isEn ? item.titleEn : item.title).toLowerCase();
        const holder = item.holder.toLowerCase();
        const desc = (isEn ? item.descriptionEn : item.description).toLowerCase();
        const fact = (isEn ? item.funFactEn : item.funFact).toLowerCase();
        return title.includes(q) || holder.includes(q) || desc.includes(q) || fact.includes(q);
      }
      return true;
    });

    this.container.innerHTML = `
      <!-- 1. Header Hero Banner Ensiklopedia & Statistika -->
      <section class="schedule-hero-banner" style="background:linear-gradient(135deg, var(--card), var(--surface)); border:1.5px solid var(--line); border-radius:24px; padding:28px; margin-bottom:28px; box-shadow:var(--shadow);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
          <div>
            <div class="pill" style="margin-bottom:10px; background:rgba(255, 178, 27, 0.15); border-color:rgba(255, 178, 27, 0.4); color:var(--ink);">
              <span class="dot" style="background:#ffb21b;"></span> 🏆 ${isEn ? 'STATISTICS & WORLD RECORDS ENCYCLOPEDIA' : 'STATISTIKA & ENSIKLOPEDIA REKOR TER-'} · ${currentStudent}
            </div>
            <h1 style="margin:0 0 8px; font-size:26px; font-weight:850; color:var(--ink); display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              ${isEn ? 'The "MOST & EXTREME" Records in Indonesia & The World' : 'Serba TER- di Indonesia & Dunia 🇮🇩🌍'}
              <span style="font-size:12px; font-weight:800; background:var(--teal-soft); color:var(--teal-soft-ink); border:1px solid var(--teal); padding:3px 10px; border-radius:999px;">
                ${isEn ? 'Explorer Edition' : 'Edisi Penjelajah Cilik'}
              </span>
            </h1>
            <p style="margin:0; font-size:14px; color:var(--muted); max-width:680px; line-height:1.6;">
              ${isEn
                ? 'Discover the fastest hypercars, deepest ocean trenches, highest mountain peaks, and largest animals in Indonesia and across the globe with visual illustrations and scale comparisons!'
                : 'Temukan mobil tercepat, palung terdalam, gunung tertinggi, dan hewan terbesar di Indonesia maupun seluruh planet Bumi dengan ilustrasi visual dan perbandingan skala yang seru!'}
            </p>
          </div>

          <!-- Tab Navigation Buttons -->
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <button class="btn ${this.activeTab === 'encyclopedia' ? 'primary' : ''} btn-record-tab" data-tab="encyclopedia" type="button" aria-label="Buka Ensiklopedia Rekor" style="font-weight:800; font-size:13px; padding:9px 16px;">
              📖 ${isEn ? 'Record Cards' : 'Daftar Rekor'}
            </button>
            <button class="btn ${this.activeTab === 'comparison' ? 'primary' : ''} btn-record-tab" data-tab="comparison" type="button" aria-label="Buka Perbandingan Skala" style="font-weight:800; font-size:13px; padding:9px 16px;">
              ⚖️ ${isEn ? 'Scale Comparison' : 'Bandingkan Skala'}
            </button>
            <button class="btn ${this.activeTab === 'quiz' ? 'primary' : ''} btn-record-tab" data-tab="quiz" type="button" aria-label="Buka Kuis Tebak Rekor" style="font-weight:800; font-size:13px; padding:9px 16px;">
              🎯 ${isEn ? 'Guess Quiz (+⭐)' : 'Kuis Tebak Rekor (+⭐)'}
            </button>
          </div>
        </div>
      </section>

      <!-- 2. Konten Sesuai Tab Aktif -->
      ${this.activeTab === 'encyclopedia' ? this.renderEncyclopediaTab(filteredRecords, lang, isEn) : ''}
      ${this.activeTab === 'comparison' ? this.renderComparisonTab(lang, isEn) : ''}
      ${this.activeTab === 'quiz' ? this.renderQuizTab(lang, isEn) : ''}
    `;

    this.attachEvents();
    if (window.app && typeof window.app.ensureFooter === 'function') {
      window.app.ensureFooter(lang);
    }
  }

  // ============================================================
  // TAB 1: ENSIKLOPEDIA REKOR (FILTER & KARTU INTERAKTIF)
  // ============================================================
  renderEncyclopediaTab(records, lang, isEn) {
    return `
      <!-- Bilah Filter Scope & Kategori -->
      <div style="background:var(--card); border:1px solid var(--line); border-radius:18px; padding:18px 20px; margin-bottom:24px; box-shadow:var(--shadow);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <!-- Filter Scope (Semua / Indo / Dunia) -->
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
            <span style="font-size:13px; font-weight:800; color:var(--muted); margin-right:4px;">
              ${isEn ? 'Region:' : 'Wilayah:'}
            </span>
            <button class="btn ${this.activeScope === 'all' ? 'primary' : ''} btn-scope-filter" data-scope="all" type="button" aria-label="Tampilkan semua rekor" style="font-size:12.5px; font-weight:750; padding:6px 14px; border-radius:999px;">
              ⭐ ${isEn ? 'All (20+)' : 'Semua Rekor (20+)'}
            </button>
            <button class="btn ${this.activeScope === 'indonesia' ? 'primary' : ''} btn-scope-filter" data-scope="indonesia" type="button" aria-label="Rekor di Indonesia" style="font-size:12.5px; font-weight:750; padding:6px 14px; border-radius:999px;">
              🇮🇩 ${isEn ? 'Indonesia Records' : 'Serba TER- di Indonesia'}
            </button>
            <button class="btn ${this.activeScope === 'world' ? 'primary' : ''} btn-scope-filter" data-scope="world" type="button" aria-label="Rekor di Dunia" style="font-size:12.5px; font-weight:750; padding:6px 14px; border-radius:999px;">
              🌍 ${isEn ? 'World Records' : 'Serba TER- di Dunia'}
            </button>
          </div>

          <!-- Search Input Box -->
          <div style="position:relative; flex:1 1 240px; max-width:340px;">
            <label for="recordsSearchInput" class="sr-only">${isEn ? 'Search records' : 'Cari rekor'}</label>
            <input 
              type="text" 
              id="recordsSearchInput" 
              class="form-control" 
              placeholder="${isEn ? 'Search: car, trench, mountain...' : 'Cari: mobil, laut, danau, tertinggi...'}" 
              value="${this.searchQuery}"
              aria-label="${isEn ? 'Search records by keyword' : 'Cari rekor dengan kata kunci'}"
              style="width:100%; padding:8px 36px 8px 14px; border-radius:12px; border:1px solid var(--line); font-size:13px; background:var(--paper); color:var(--ink);"
            >
            ${this.searchQuery ? `
              <button id="btnClearRecordSearch" type="button" aria-label="Hapus pencarian" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--muted); font-size:14px; cursor:pointer;">✕</button>
            ` : ''}
          </div>
        </div>

        <!-- Filter Kategori Chips -->
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-top:14px; padding-top:14px; border-top:1px solid var(--line);">
          <span style="font-size:13px; font-weight:800; color:var(--muted); margin-right:4px;">
            ${isEn ? 'Category:' : 'Kategori:'}
          </span>
          <button class="btn ${this.activeCategory === 'all' ? 'primary' : ''} btn-cat-filter" data-cat="all" type="button" aria-label="Semua kategori" style="font-size:12px; font-weight:700; padding:4px 12px; border-radius:8px;">
            Semua
          </button>
          <button class="btn ${this.activeCategory === 'teknologi' ? 'primary' : ''} btn-cat-filter" data-cat="teknologi" type="button" aria-label="Kategori Kendaraan & Mesin" style="font-size:12px; font-weight:700; padding:4px 12px; border-radius:8px;">
            🚀 ${isEn ? 'Vehicles & Machines' : 'Kendaraan & Mesin'}
          </button>
          <button class="btn ${this.activeCategory === 'alam' ? 'primary' : ''} btn-cat-filter" data-cat="alam" type="button" aria-label="Kategori Alam & Geografi" style="font-size:12px; font-weight:700; padding:4px 12px; border-radius:8px;">
            ⛰️ ${isEn ? 'Nature & Geography' : 'Alam & Geografi'}
          </button>
          <button class="btn ${this.activeCategory === 'hewan' ? 'primary' : ''} btn-cat-filter" data-cat="hewan" type="button" aria-label="Kategori Hewan & Hayati" style="font-size:12px; font-weight:700; padding:4px 12px; border-radius:8px;">
            🐾 ${isEn ? 'Animals & Living Beings' : 'Hewan & Hayati'}
          </button>
          <button class="btn ${this.activeCategory === 'bangunan' ? 'primary' : ''} btn-cat-filter" data-cat="bangunan" type="button" aria-label="Kategori Bangunan & Arsitektur" style="font-size:12px; font-weight:700; padding:4px 12px; border-radius:8px;">
            🏛️ ${isEn ? 'Architecture & Wonders' : 'Bangunan & Arsitektur'}
          </button>
        </div>
      </div>

      <!-- Hasil Kartu Rekor Grid -->
      ${records.length > 0 ? `
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px;">
          ${records.map(r => this.renderRecordCard(r, isEn)).join('')}
        </div>
      ` : `
        <div class="quiz-box" style="text-align:center; padding:40px 20px; background:var(--card);">
          <div style="font-size:42px; margin-bottom:10px;">🔍</div>
          <h3 style="font-size:18px; font-weight:800; margin:0 0 6px;">${isEn ? 'No records found' : 'Tidak ada rekor yang sesuai kata kunci'}</h3>
          <p style="font-size:13px; color:var(--muted); margin:0;">${isEn ? 'Try adjusting your search query or changing the filter above.' : 'Coba ubah kata kunci atau ganti pilihan filter di atas.'}</p>
        </div>
      `}
    `;
  }

  renderRecordCard(r, isEn) {
    const badgeText = isEn ? (r.badgeEn || r.badge) : r.badge;
    const titleText = isEn ? r.titleEn : r.title;
    const descText = isEn ? r.descriptionEn : r.description;
    const compText = isEn ? r.comparisonEn : r.comparison;
    const factText = isEn ? r.funFactEn : r.funFact;
    const isIndo = r.scope === 'indonesia';

    const speechText = `${titleText}. Pemegang rekor: ${r.holder}. Angka statistik: ${r.statValue}. Perbandingan: ${compText}. Tahukah kamu? ${factText}`;

    return `
      <div class="quiz-box record-card" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between; background:var(--card); border:1px solid var(--line); border-radius:20px; padding:20px; box-shadow:var(--shadow); transition:transform 0.2s ease, box-shadow 0.2s ease;">
        <div>
          <!-- Header Bar: Scope Flag + Badge + TTS Audio Button -->
          <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:14px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="subject-badge" style="${isIndo ? 'background:#fef2f2; color:#b91c1c; border-color:#fca5a5;' : 'background:#f0f9ff; color:#0369a1; border-color:#7dd3fc;'} font-weight:800; font-size:11px;">
                ${isIndo ? '🇮🇩 INDONESIA' : '🌍 DUNIA'}
              </span>
              <span class="subject-badge" style="background:rgba(255, 178, 27, 0.15); color:#b45309; border-color:rgba(255, 178, 27, 0.4); font-weight:800; font-size:11px;">
                ${badgeText}
              </span>
            </div>

            <!-- Tombol TTS Audio Bacakan -->
            <button 
              class="btn btn-read-record" 
              type="button" 
              data-text="${encodeURIComponent(speechText)}"
              aria-label="${isEn ? 'Listen to record narration' : 'Dengarkan suara fakta rekor'}" 
              title="${isEn ? 'Listen' : 'Dengarkan'}"
              style="padding:5px 10px; font-size:12px; font-weight:700; border-radius:8px; background:var(--teal-soft); color:var(--teal-soft-ink); border-color:var(--teal); display:inline-flex; align-items:center; gap:4px;"
            >
              🔊 <span style="font-size:11px;">${isEn ? 'Listen' : 'Dengar'}</span>
            </button>
          </div>

          <!-- Visual Illustration & Title Section -->
          <div style="display:flex; gap:16px; align-items:center; margin-bottom:14px;">
            <div style="width:78px; height:78px; flex:0 0 78px; border-radius:16px; overflow:hidden; border:1px solid var(--line); box-shadow:0 4px 12px rgba(0,0,0,0.06); display:flex; align-items:center; justify-content:center; background:var(--surface);">
              ${r.svgIcon}
            </div>
            <div style="min-width:0; flex:1 1 auto;">
              <h3 style="margin:0 0 4px; font-size:16px; font-weight:850; color:var(--ink); line-height:1.35;">
                ${titleText}
              </h3>
              <div style="font-size:12.5px; font-weight:800; color:var(--teal);">
                ${r.holder}
              </div>
            </div>
          </div>

          <!-- Giant Stat Highlight Banner -->
          <div style="background:linear-gradient(135deg, var(--teal-soft), rgba(255, 178, 27, 0.12)); border:1.5px solid var(--teal); border-radius:14px; padding:10px 14px; margin-bottom:14px; display:flex; align-items:center; justify-content:space-between; gap:8px;">
            <span style="font-size:12px; font-weight:800; color:var(--ink); text-transform:uppercase; letter-spacing:0.3px;">
              📊 ${isEn ? 'STAT RECORD:' : 'ANGKA REKOR:'}
            </span>
            <span style="font-size:18px; font-weight:900; color:var(--teal-soft-ink); font-family:monospace, sans-serif;">
              ${r.statValue}
            </span>
          </div>

          <!-- Description -->
          <p style="margin:0 0 12px; font-size:13px; color:var(--muted); line-height:1.55;">
            ${descText}
          </p>

          <!-- Fun Comparison Box -->
          <div style="background:var(--paper); border-left:3.5px solid #f59e0b; border-radius:8px; padding:10px 12px; margin-bottom:12px; font-size:12.5px; color:var(--ink); line-height:1.5;">
            <strong style="color:#b45309; display:block; margin-bottom:2px; font-size:11.5px; text-transform:uppercase;">
              ⚡ ${isEn ? 'Fun Scale Comparison:' : 'Perbandingan Skala Seru:'}
            </strong>
            ${compText}
          </div>

          <!-- Fun Fact Box -->
          <div style="background:rgba(92, 227, 222, 0.08); border:1px dashed var(--teal); border-radius:10px; padding:10px 12px; font-size:12.5px; color:var(--ink); line-height:1.5;">
            <strong style="color:var(--teal); display:block; margin-bottom:2px; font-size:11.5px;">
              💡 ${isEn ? 'Did You Know?' : 'Tahukah Kamu?'}
            </strong>
            ${factText}
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // TAB 2: BANDINGKAN SKALA UKURAN & KECEPATAN (COMPARISON)
  // ============================================================
  renderComparisonTab(lang, isEn) {
    const isSpeed = this.scaleType === 'speed';

    // Data komparasi kecepatan (km/jam)
    const speedItems = [
      { name: 'Jalan Santai Anak', stat: '4 km/jam', pct: 2, icon: '🚶' },
      { name: 'Sepeda Ceria', stat: '15 km/jam', pct: 5, icon: '🚲' },
      { name: 'Mobil di Jalan Tol', stat: '100 km/jam', pct: 15, icon: '🚗' },
      { name: 'Cheetah Berlari Kencang', stat: '120 km/jam', pct: 18, icon: '🐆', badge: 'HEWAN DARAT TERCEPAT' },
      { name: 'Kereta Cepat Whoosh Indonesia', stat: '350 km/jam', pct: 40, icon: '🚅', badge: 'KERETA TERCEPAT SE-ASEAN' },
      { name: 'Elang Peregrine Falcon Menukik', stat: '389 km/jam', pct: 45, icon: '🦅', badge: 'HEWAN TERCEPAT DI UDARA' },
      { name: 'Koenigsegg Jesko / Bugatti Bolide', stat: '508 km/jam', pct: 58, icon: '🏎️', badge: 'MOBIL TERCEPAT DI DUNIA' },
      { name: 'Pesawat Jet Penumpang', stat: '900 km/jam', pct: 72, icon: '✈️' },
      { name: 'Pesawat Supersonik SR-71 Blackbird', stat: '3.529 km/jam (Mach 3.3)', pct: 100, icon: '🚀', badge: 'PESAWAT JET TERCEPAT' }
    ];

    // Data komparasi ketinggian & kedalaman (meter)
    const heightItems = [
      { name: 'Pohon Kelapa Pantai', stat: '15 meter', pct: 2, icon: '🌴' },
      { name: 'Pohon Raksasa Hyperion (California)', stat: '116 meter', pct: 6, icon: '🌲', badge: 'POHON TERTINGGI' },
      { name: 'Patung GWK (Garuda Wisnu Kencana) Bali', stat: '121 meter', pct: 7, icon: '🦅' },
      { name: 'Monas (Monumen Nasional) Jakarta', stat: '132 meter', pct: 8, icon: '🗼' },
      { name: 'Menara Eiffel Paris', stat: '330 meter', pct: 14, icon: '🗼' },
      { name: 'Gua Vertikal Hatusaka Maluku', stat: '388 meter (ke bawah)', pct: 16, icon: '🕳️', badge: 'GUA TERDALAM INDONESIA' },
      { name: 'Danau Matano Sulawesi Selatan', stat: '590 meter (ke bawah)', pct: 22, icon: '🌊', badge: 'DANAU TERDALAM INDONESIA' },
      { name: 'Gedung Burj Khalifa Dubai', stat: '828 meter', pct: 30, icon: '🏢', badge: 'GEDUNG TERTINGGI DI DUNIA' },
      { name: 'Puncak Jaya (Carstensz) Papua', stat: '4.884 meter', pct: 60, icon: '🏔️', badge: 'GUNUNG TERTINGGI INDONESIA' },
      { name: 'Laut Banda (Palung Weber) Maluku', stat: '7.440 meter (ke bawah)', pct: 78, icon: '🌊', badge: 'LAUT TERDALAM INDONESIA' },
      { name: 'Gunung Everest Himalaya', stat: '8.848 meter', pct: 88, icon: '🏔️', badge: 'GUNUNG TERTINGGI DI DUNIA' },
      { name: 'Palung Mariana (Challenger Deep)', stat: '10.994 meter (ke bawah)', pct: 100, icon: '🌊', badge: 'PALUNG TERDALAM DI BUMI' }
    ];

    const currentItems = isSpeed ? speedItems : heightItems;

    return `
      <div style="background:var(--card); border:1px solid var(--line); border-radius:20px; padding:24px; box-shadow:var(--shadow);">
        <!-- Sub-Tabs Switcher -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; margin-bottom:24px;">
          <div>
            <h2 style="font-size:20px; font-weight:850; margin:0 0 6px; color:var(--ink);">
              ${isSpeed 
                ? (isEn ? '⚡ Speed Scale Comparison' : '⚡ Visualisasi Perbandingan Kecepatan')
                : (isEn ? '🏔️ Height & Depth Scale Comparison' : '🏔️ Visualisasi Ketinggian & Kedalaman')}
            </h2>
            <p style="margin:0; font-size:13px; color:var(--muted);">
              ${isEn 
                ? 'See how fast or massive these record breakers are compared to everyday objects!' 
                : 'Bandingkan langsung seberapa cepat dan tinggi rekor-rekor ini dibandingkan dengan benda di sekitar kita!'}
            </p>
          </div>

          <div style="display:flex; gap:8px;">
            <button class="btn ${isSpeed ? 'primary' : ''} btn-scale-type" data-scale="speed" type="button" aria-label="Lihat perbandingan kecepatan" style="font-size:13px; font-weight:800; padding:8px 16px;">
              🏎️ ${isEn ? 'Speed Scale' : 'Skala Kecepatan'}
            </button>
            <button class="btn ${!isSpeed ? 'primary' : ''} btn-scale-type" data-scale="height" type="button" aria-label="Lihat perbandingan tinggi dan kedalaman" style="font-size:13px; font-weight:800; padding:8px 16px;">
              🏔️ ${isEn ? 'Height & Depth' : 'Tinggi & Kedalaman'}
            </button>
          </div>
        </div>

        <!-- Scale Bars List -->
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${currentItems.map(item => `
            <div style="background:var(--paper); border:1px solid var(--line); border-radius:14px; padding:14px 16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span style="font-size:22px;">${item.icon}</span>
                  <strong style="font-size:14.5px; color:var(--ink);">${item.name}</strong>
                  ${item.badge ? `
                    <span style="font-size:10px; font-weight:800; background:rgba(255, 178, 27, 0.2); color:#b45309; border:1px solid #f59e0b; padding:2px 8px; border-radius:999px;">
                      ${item.badge}
                    </span>
                  ` : ''}
                </div>
                <span style="font-size:14px; font-weight:900; color:var(--teal); font-family:monospace, sans-serif;">
                  ${item.stat}
                </span>
              </div>

              <!-- Meter Progress Bar -->
              <div style="height:12px; background:var(--line); border-radius:999px; overflow:hidden;">
                <div style="width:${item.pct}%; height:100%; background:linear-gradient(90deg, #0d9488, #f59e0b); border-radius:999px; transition:width 0.6s cubic-bezier(0.4, 0, 0.2, 1);"></div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ============================================================
  // TAB 3: KUIS TEBAK REKOR INTERAKTIF (+ BINTANG ⭐)
  // ============================================================
  renderQuizTab(lang, isEn) {
    return `
      <div style="background:var(--card); border:1px solid var(--line); border-radius:20px; padding:24px; box-shadow:var(--shadow);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
          <div>
            <div class="pill" style="margin-bottom:6px; background:rgba(255, 178, 27, 0.15); border-color:#f59e0b; color:#b45309;">
              🎯 ${isEn ? 'KIDS RECORD CHALLENGE' : 'ASAH OTAK REKOR TER-'}
            </div>
            <h2 style="font-size:20px; font-weight:850; margin:0 0 4px; color:var(--ink);">
              ${isEn ? 'Guess the "MOST" Record Breaker!' : 'Tebak Siapa yang Paling TER-! 🏆'}
            </h2>
            <p style="margin:0; font-size:13px; color:var(--muted);">
              ${isEn 
                ? 'Answer these 5 exciting questions correctly to earn Gold Stars for your trophy collection!' 
                : 'Jawab 5 pertanyaan seru ini dengan tepat untuk mengumpulkan Bintang Emas ke koleksimu!'}
            </p>
          </div>
          <div style="font-size:14px; font-weight:800; color:var(--teal); background:var(--teal-soft); padding:6px 14px; border-radius:999px; border:1px solid var(--teal);">
            ⭐ +1 Bintang per Jawaban Tepat
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:20px;">
          ${RECORD_QUIZZES.map((q, idx) => {
            const answeredState = this.quizAnswers[q.id];
            const isAnswered = !!answeredState;
            const isCorrect = answeredState?.correct;

            return `
              <div class="quiz-box" style="margin-bottom:0; background:var(--paper); border:1.5px solid ${isAnswered ? (isCorrect ? 'var(--green)' : 'var(--red)') : 'var(--line)'}; border-radius:16px; padding:18px;">
                <div style="display:flex; align-items:flex-start; gap:10px; margin-bottom:12px;">
                  <span style="background:var(--teal); color:#fff; font-size:12px; font-weight:900; width:26px; height:26px; border-radius:999px; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;">
                    ${idx + 1}
                  </span>
                  <strong style="font-size:15px; color:var(--ink); line-height:1.4;">
                    ${isEn ? q.questionEn : q.question}
                  </strong>
                </div>

                <!-- Opsi Jawaban -->
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:10px; margin-top:12px;">
                  ${q.options.map((opt, optIdx) => {
                    let btnStyle = 'background:var(--card); color:var(--ink); border:1.5px solid var(--line);';
                    if (isAnswered) {
                      if (opt.correct) {
                        btnStyle = 'background:#dcfce7; color:#166534; border:2px solid #22c55e; font-weight:800;';
                      } else if (answeredState.chosenIndex === optIdx) {
                        btnStyle = 'background:#fee2e2; color:#991b1b; border:2px solid #ef4444;';
                      }
                    }

                    return `
                      <button 
                        class="btn btn-record-quiz-opt" 
                        type="button" 
                        data-qid="${q.id}" 
                        data-optidx="${optIdx}"
                        data-correct="${opt.correct}"
                        aria-label="${opt.text}"
                        ${isAnswered ? 'disabled' : ''}
                        style="text-align:left; justify-content:flex-start; padding:10px 14px; font-size:13px; font-weight:700; border-radius:12px; line-height:1.35; ${btnStyle}"
                      >
                        ${opt.correct && isAnswered ? '✓ ' : ''}${opt.text}
                      </button>
                    `;
                  }).join('')}
                </div>

                <!-- Feedback & Penjelasan -->
                ${isAnswered ? `
                  <div style="margin-top:14px; padding:10px 14px; border-radius:10px; font-size:13px; line-height:1.5; ${isCorrect ? 'background:#ecfdf5; color:#15803d; border:1px solid #86efac;' : 'background:#fff1f2; color:#be123c; border:1px solid #fecdd3;'}">
                    <strong>${isCorrect ? '🎉 HEBAT! ' : '💡 BELUM TEPAT! '}</strong>
                    ${isEn ? q.explanationEn : q.explanation}
                  </div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ============================================================
  // EVENT LISTENERS & INTERAKSI
  // ============================================================
  attachEvents() {
    // 1. Tab Switcher
    const tabBtns = this.container.querySelectorAll('.btn-record-tab');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        AudioFx.playTap();
        this.activeTab = btn.getAttribute('data-tab');
        this.render();
      });
    });

    // 2. Scope Filter (Semua / Indo / Dunia)
    const scopeBtns = this.container.querySelectorAll('.btn-scope-filter');
    scopeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        AudioFx.playTap();
        this.activeScope = btn.getAttribute('data-scope');
        this.render();
      });
    });

    // 3. Category Filter
    const catBtns = this.container.querySelectorAll('.btn-cat-filter');
    catBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        AudioFx.playTap();
        this.activeCategory = btn.getAttribute('data-cat');
        this.render();
      });
    });

    // 4. Search Input
    const searchInput = this.container.querySelector('#recordsSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        const grid = this.container.querySelector('div[style*="grid-template-columns:repeat(auto-fill, minmax(320px"]');
        // Re-render whole tab for instant filter updates
        const state = appState.get();
        const isEn = (state.lang || 'id') === 'en';
        let filtered = RECORDS_DATA.filter(item => {
          if (this.activeScope !== 'all' && item.scope !== this.activeScope) return false;
          if (this.activeCategory !== 'all' && item.category !== this.activeCategory) return false;
          if (this.searchQuery.trim()) {
            const q = this.searchQuery.toLowerCase().trim();
            const title = (isEn ? item.titleEn : item.title).toLowerCase();
            const holder = item.holder.toLowerCase();
            const desc = (isEn ? item.descriptionEn : item.description).toLowerCase();
            const fact = (isEn ? item.funFactEn : item.funFact).toLowerCase();
            return title.includes(q) || holder.includes(q) || desc.includes(q) || fact.includes(q);
          }
          return true;
        });
        const wrap = this.container.querySelector('.records-grid-wrap') || this.container.querySelector('div[style*="grid-template-columns"]');
        if (wrap) {
          wrap.innerHTML = filtered.map(r => this.renderRecordCard(r, isEn)).join('');
          this.attachAudioEvents();
        }
      });
    }

    const btnClearSearch = this.container.querySelector('#btnClearRecordSearch');
    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        this.searchQuery = '';
        this.render();
      });
    }

    // 5. Scale Type Switcher (Speed vs Height)
    const scaleBtns = this.container.querySelectorAll('.btn-scale-type');
    scaleBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        AudioFx.playTap();
        this.scaleType = btn.getAttribute('data-scale');
        this.render();
      });
    });

    // 6. Audio TTS Events
    this.attachAudioEvents();

    // 7. Quiz Option Clicks
    const quizOpts = this.container.querySelectorAll('.btn-record-quiz-opt');
    quizOpts.forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.getAttribute('data-qid');
        const optidx = parseInt(btn.getAttribute('data-optidx'), 10);
        const isCorrect = btn.getAttribute('data-correct') === 'true';

        this.quizAnswers[qid] = {
          chosenIndex: optidx,
          correct: isCorrect
        };

        if (isCorrect) {
          store.addStar(1);
          if (AudioFx && typeof AudioFx.playStarSparkle === 'function') {
            AudioFx.playStarSparkle();
          }
          if (AudioFx && typeof AudioFx.triggerConfetti === 'function') {
            AudioFx.triggerConfetti(this.container);
          }
        } else {
          if (AudioFx && typeof AudioFx.playError === 'function') {
            AudioFx.playError();
          }
        }

        this.render();
      });
    });
  }

  attachAudioEvents() {
    const audioBtns = this.container.querySelectorAll('.btn-read-record');
    audioBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent(btn.getAttribute('data-text') || '');
        const state = appState.get();
        const lang = state.lang || 'id';
        TtsEngine.speak(text, lang, btn);
      });
    });
  }
}
