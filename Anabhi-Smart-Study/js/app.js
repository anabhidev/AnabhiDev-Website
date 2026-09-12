// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Main Application Router & Bootstrap
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 11:10:00
// ================================================================

import { SUBJECTS, getSubjectName, getSubjectBadge, getSubjectDesc } from './data/subjects.js';
import { appState } from './state.js';
import { store } from './store.js';
import { t } from './data/i18n.js';
import { TopbarComponent } from './components/topbar.js';
import { SidebarComponent } from './components/sidebar.js';
import { VideoModalComponent } from './components/video-modal.js';
import { SubjectViewComponent } from './components/subject-view.js';
import { ChallengeViewComponent } from './components/challenge-view.js';
import { ProgressViewComponent } from './components/progress-view.js';
import { AiTutorModalComponent } from './components/ai-modal.js';
import { LksModalComponent } from './components/lks-modal.js';

class App {
  constructor() {
    this.topbarEl = document.getElementById('topbar');
    this.sidebarEl = document.getElementById('sidebar');
    this.scrimEl = document.getElementById('scrim');
    this.shellEl = document.getElementById('shell');
    this.mainEl = document.getElementById('main');
    this.videoModalEl = document.getElementById('videoModal');

    // Komponen UI
    this.lksModal = new LksModalComponent();
    window.lksModal = this.lksModal;
    this.aiModal = new AiTutorModalComponent();
    window.aiTutorModal = this.aiModal;
    this.topbar = new TopbarComponent(this.topbarEl);
    this.sidebar = new SidebarComponent(this.sidebarEl, this.scrimEl, this.shellEl);
    this.videoModal = new VideoModalComponent(this.videoModalEl);
    this.subjectView = new SubjectViewComponent(this.mainEl, this.videoModal, this.lksModal);
    this.challengeView = new ChallengeViewComponent(this.mainEl);
    this.progressView = new ProgressViewComponent(this.mainEl);

    this.initPWA();
    this.initRouting();
    this.bindState();
  }

  initPWA() {
    const isLocalOrHttps = window.location.protocol === 'https:' ||
                           window.location.hostname === 'localhost' ||
                           window.location.hostname === '127.0.0.1';
    if ('serviceWorker' in navigator && isLocalOrHttps) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            console.log('[PWA] Service Worker aktif terdaftar:', reg.scope);
            reg.addEventListener('updatefound', () => {
              const nw = reg.installing;
              if (!nw) return;
              nw.addEventListener('statechange', () => {
                if (nw.state === 'installed' && navigator.serviceWorker.controller) {
                  nw.postMessage({ type: 'SKIP_WAITING' });
                }
              });
            });
          })
          .catch((err) => {
            console.warn('[PWA] Pendaftaran Service Worker dilewati:', err);
          });
      });
    }
  }

  initRouting() {
    const handleHash = () => {
      const hash = window.location.hash || '#home';
      if (hash.startsWith('#subject/')) {
        const subjectId = hash.replace('#subject/', '');
        appState.set({ currentRoute: 'subject', currentSubjectId: subjectId, drawerOpen: false });
      } else if (hash === '#tantangan') {
        appState.set({ currentRoute: 'tantangan', drawerOpen: false });
      } else if (hash === '#progress') {
        appState.set({ currentRoute: 'progress', drawerOpen: false });
      } else if (hash === '#semua-pelajaran') {
        appState.set({ currentRoute: 'all-subjects', drawerOpen: false });
      } else {
        appState.set({ currentRoute: 'home', currentSubjectId: null, drawerOpen: false });
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
  }

  bindState() {
    appState.subscribe((state) => {
      this.topbar.render();
      this.sidebar.render();
      this.renderMain(state);
    });

    // Initial render
    this.topbar.render();
    this.sidebar.render();
    this.renderMain(appState.get());
  }

  renderMain(state) {
    switch (state.currentRoute) {
      case 'home':
        this.renderHome();
        break;
      case 'subject':
        this.subjectView.render(state.currentSubjectId);
        break;
      case 'tantangan':
        this.challengeView.render();
        break;
      case 'progress':
        this.progressView.render();
        break;
      case 'all-subjects':
        this.renderAllSubjects();
        break;
      default:
        this.renderHome();
    }
  }

  renderHome() {
    try {
      const state = appState.get();
      const lang = state.lang || 'id';
      const isEn = lang === 'en';
      const progress = (store && typeof store.getProgress === 'function')
        ? store.getProgress()
        : (store && store.data ? store.data : {});

      this.mainEl.innerHTML = `
      <!-- 1. Dashboard Pelajar Ceria (Greeting, Streak, & Bintang) -->
      <section class="dashboard-greeting-card" style="background:linear-gradient(135deg, var(--card), var(--surface)); border:1px solid var(--line); border-radius:24px; padding:28px; margin-bottom:28px; box-shadow:var(--shadow);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
          <div>
            <div class="pill" style="margin-bottom:10px;"><span class="dot"></span> ${isEn ? 'Student Learning Dashboard' : 'Dashboard Pelajar Cerdas'}</div>
            <h1 style="margin:0 0 8px; font-size:26px; font-weight:850; color:var(--ink);">
              ${isEn ? 'Welcome Back, Champion! 🌟' : 'Halo Sobat Juara! Semangat Belajar Hari Ini 🌟'}
            </h1>
            <p style="margin:0; font-size:14px; color:var(--muted); max-width:600px; line-height:1.6;">
              ${isEn ? 'Every day is a fresh adventure to collect stars, master new skills, and explore the universe!' : 'Setiap hari adalah petualangan seru untuk menambah ilmu, melatih nalar, dan mengumpulkan bintang prestasi!'}
            </p>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <div style="background:var(--card); border:1px solid var(--line); border-radius:16px; padding:12px 18px; text-align:center; min-width:110px;">
              <span style="font-size:22px;">🔥</span>
              <strong style="display:block; font-size:18px; color:var(--ink);">${progress.streakDays || 1} ${isEn ? 'Days' : 'Hari'}</strong>
              <span style="font-size:11px; color:var(--muted);">${isEn ? 'Learning Streak' : 'Streak Semangat'}</span>
            </div>
            <div style="background:var(--card); border:1px solid var(--line); border-radius:16px; padding:12px 18px; text-align:center; min-width:110px;">
              <span style="font-size:22px;">⭐</span>
              <strong style="display:block; font-size:18px; color:var(--ink);">${progress.stars || 15}</strong>
              <span style="font-size:11px; color:var(--muted);">${isEn ? 'Stars Collected' : 'Bintang Juara'}</span>
            </div>
          </div>
        </div>

        <!-- Bar Lanjutkan Belajar Terakhir -->
        <div style="margin-top:24px; padding-top:20px; border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:24px; background:var(--teal-soft); border-radius:12px; padding:6px 10px;">🧮</span>
            <div>
              <span style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase;">${isEn ? 'Continue Where You Left Off:' : 'Lanjutkan Belajar Terakhir:'}</span>
              <strong style="display:block; font-size:14.5px; color:var(--ink);">${isEn ? 'Mathematics — Math Toolbox (Decomposition & Number Line)' : 'Matematika — Math Toolbox (Pecah Angka & Garis Bilangan)'}</strong>
            </div>
          </div>
          <button class="btn primary" id="btnResumeLearning" type="button">
            ${isEn ? 'Resume Learning ➔' : 'Lanjutkan Belajar ➔'}
          </button>
        </div>
      </section>

      <!-- 2. Tantangan Hari Ini & Misi Ceria -->
      <section style="margin-bottom:32px;">
        <div style="background:linear-gradient(135deg, rgba(91,224,223,0.12), rgba(255,178,27,0.12)); border:1px solid var(--teal); border-radius:20px; padding:22px 26px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span style="font-size:20px;">🎯</span>
              <h3 style="margin:0; font-size:17px; font-weight:850; color:var(--ink);">${isEn ? 'Daily Quest Ready!' : 'Misi Tantangan Hari Ini Siap!'}</h3>
            </div>
            <p style="margin:0; font-size:13px; color:var(--muted);">
              ${isEn ? 'Complete 3 interactive mini quizzes to earn bonus achievement points and unlock new avatars.' : 'Selesaikan 3 kuis interaktif hari ini untuk mendapatkan bonus poin bintang dan lencana pahlawan cilik.'}
            </p>
          </div>
          <button class="btn secondary" id="btnGoToChallenge" type="button" style="background:var(--card); font-weight:750;">
            ${isEn ? 'Open Daily Challenge 🚀' : 'Buka Tantangan Harian 🚀'}
          </button>
        </div>
      </section>

      <!-- 3. Dua Modul Flagship Unggulan -->
      <section style="margin-bottom:36px;">
        <div class="section-header" style="margin-bottom:18px;">
          <div class="eyebrow"><span class="no">⭐</span><span class="lbl">${isEn ? 'Featured Interactive Modules' : 'Modul Pembelajaran Unggulan'}</span></div>
          <h2 class="section-title">${isEn ? 'Master Key Subjects Interactively' : 'Pelajari Modul Unggulan Interaktif'}</h2>
          <p class="section-sub">${isEn ? 'Explore deep conceptual visualizers for Mathematics and Geography' : 'Dilengkapi visualizer konsep mendalam untuk Matematika dan Geografi'}</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
          <!-- Card Matematika -->
          <div class="subject-card" data-subject-id="matematika" style="cursor:pointer; border:2px solid var(--teal); background:var(--card); padding:24px;">
            <div class="subject-card-top" style="margin-bottom:14px;">
              <div class="subject-icon" style="background:var(--teal-soft); color:var(--teal-soft-ink); font-size:28px;">🧮</div>
              <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink);">Flagship v2.0</span>
            </div>
            <h3 style="font-size:20px; font-weight:850; margin:0 0 8px;">${isEn ? 'Math Toolbox — One Problem, Many Ways!' : 'Math Toolbox — Satu Soal, Banyak Cara!'}</h3>
            <p style="font-size:13.5px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
              ${isEn ? 'Master multi-strategy thinking: Number Bonds, Compensation, Number Line, Base-Ten Blocks, and Soroban Abacus!' : 'Kuasai 9 jurus berpikir fleksibel: Pecah Angka, Number Bonds, Bikin 100, Kompensasi, Garis Bilangan, Balok Satuan, hingga Sempoa Soroban!'}
            </p>
            <div class="subject-card-footer" style="padding-top:12px; border-top:1px solid var(--line);">
              <span style="font-weight:700; color:var(--teal);">${isEn ? '9 Thinking Strategies' : '9 Jurus Berpikir'}</span>
              <span style="font-weight:800; color:var(--ink);">${isEn ? 'Explore Math ➔' : 'Eksplorasi Matematika ➔'}</span>
            </div>
          </div>

          <!-- Card Geografi -->
          <div class="subject-card" data-subject-id="geografi" style="cursor:pointer; border:2px solid #2192cf; background:var(--card); padding:24px;">
            <div class="subject-card-top" style="margin-bottom:14px;">
              <div class="subject-icon" style="background:rgba(33,146,207,0.15); color:#2192cf; font-size:28px;">🌍</div>
              <span class="subject-badge" style="background:rgba(33,146,207,0.15); color:#2192cf;">Globe 3D & Peta 2D</span>
            </div>
            <h3 style="font-size:20px; font-weight:850; margin:0 0 8px;">${isEn ? 'Geography — Earth & 2D Indonesian Map' : 'Geografi — Bumi Bulat & Peta 2D Indonesia'}</h3>
            <p style="font-size:13.5px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
              ${isEn ? 'Turn the enlarged 3D Globe, inspect the interactive 2D Map of Indonesia with 38 provinces, and discover the 9 regencies of Bali!' : 'Putar Globe 3D meja sekolah, jelajahi Peta 2D Interaktif Indonesia 38 provinsi, dan kenali 8 kabupaten + 1 kota di Pulau Bali!'}
            </p>
            <div class="subject-card-footer" style="padding-top:12px; border-top:1px solid var(--line);">
              <span style="font-weight:700; color:#2192cf;">38 Prov & 177 Negara</span>
              <span style="font-weight:800; color:var(--ink);">${isEn ? 'Explore Geography ➔' : 'Jelajah Geografi ➔'}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Tombol Akses Cepat ke Katalog Lengkap -->
      <section style="text-align:center; padding:24px; background:var(--surface); border:1px dashed var(--line); border-radius:18px; margin-bottom:36px;">
        <h4 style="margin:0 0 6px; font-size:16px; font-weight:800; color:var(--ink);">${isEn ? 'Looking for Other Subjects?' : 'Ingin Belajar Mata Pelajaran Lainnya?'}</h4>
        <p style="margin:0 0 14px; font-size:13px; color:var(--muted);">
          ${isEn ? 'Check out all 10 subjects including English, Indonesian, Civics, Balinese, Arts, PE, and P5 Projects.' : 'Buka katalog 10 mata pelajaran lengkap: Bahasa Indonesia, Bahasa Inggris, Pancasila, Bahasa Bali, Seni Rupa, PJOK, Agama, dan Proyek P5.'}
        </p>
        <button class="btn primary" id="btnOpenAllSubjects" type="button">
          ${isEn ? 'View All 10 Subjects Catalog 📚' : 'Buka Katalog 10 Mata Pelajaran 📚'}
        </button>
      </section>

      <!-- 5. Kutipan Motivasi Pelajar -->
      <blockquote style="margin:0 0 32px; padding:18px 24px; background:var(--card); border-left:4px solid var(--teal); border-radius:12px; font-style:italic; font-size:13.5px; color:var(--muted); line-height:1.6;">
        ${isEn ? '“One problem has many ways. Never be afraid to make mistakes, because every step is a beginning of real learning!” — Anabhi Dev Smart Study' : '“Satu soal memiliki banyak cara. Jangan pernah takut salah, karena dari situlah pemikiran kreatif dan rasa ingin tahu kita berkembang!” — Anabhi Dev Smart Study'}
      </blockquote>

      <!-- Footer Aplikasi -->
      <footer class="app-footer">
        <strong>AnabhiDev Smart Study</strong> — ${(typeof t === 'function') ? t('pill', lang) : 'Media Belajar Interaktif SD Kelas 1'}<br>
        ${(typeof t === 'function') ? t('developmentCredit', lang) : 'Development · Anabhi Dev'} · 2026
      </footer>
    `;

    // Event listeners di dashboard beranda
    const btnResume = this.mainEl.querySelector('#btnResumeLearning');
    if (btnResume) {
      btnResume.addEventListener('click', () => {
        appState.navigate('subject', 'matematika');
      });
    }

    const btnChallenge = this.mainEl.querySelector('#btnGoToChallenge');
    if (btnChallenge) {
      btnChallenge.addEventListener('click', () => {
        appState.navigate('tantangan');
      });
    }

    const btnAll = this.mainEl.querySelector('#btnOpenAllSubjects');
    if (btnAll) {
      btnAll.addEventListener('click', () => {
        appState.navigate('all-subjects');
      });
    }

    const subjectCards = this.mainEl.querySelectorAll('.subject-card[data-subject-id]');
    subjectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-subject-id');
        appState.navigate('subject', id);
      });
    });
    } catch (err) {
      console.error('[App] Error in renderHome:', err);
    }
  }

  renderAllSubjects() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';

    let activeCategory = 'all';
    let searchQuery = '';

    const renderCatalogGrid = () => {
      let filtered = SUBJECTS;
      if (activeCategory === 'core') {
        filtered = filtered.filter(s => ['matematika', 'geografi', 'bahasa-indonesia', 'bahasa-inggris'].includes(s.id));
      } else if (activeCategory === 'character') {
        filtered = filtered.filter(s => ['pancasila', 'agama'].includes(s.id));
      } else if (activeCategory === 'skills') {
        filtered = filtered.filter(s => ['seni-rupa', 'pjok'].includes(s.id));
      } else if (activeCategory === 'local') {
        filtered = filtered.filter(s => ['bahasa-bali', 'kokurikuler'].includes(s.id));
      }

      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        filtered = filtered.filter(s => {
          const name = getSubjectName(s, lang).toLowerCase();
          const desc = getSubjectDesc(s, lang).toLowerCase();
          return name.includes(q) || desc.includes(q);
        });
      }

      const gridEl = this.mainEl.querySelector('#catalogGrid');
      const countEl = this.mainEl.querySelector('#catalogCount');
      if (countEl) {
        countEl.textContent = `${filtered.length} ${isEn ? 'subjects found' : 'mata pelajaran ditemukan'}`;
      }

      if (gridEl) {
        gridEl.innerHTML = filtered.map(sub => {
          const displayName = getSubjectName(sub, lang);
          const badge = getSubjectBadge(sub, lang);
          const desc = getSubjectDesc(sub, lang);

          return `
            <div class="subject-card" data-subject-id="${sub.id}" style="cursor:pointer;">
              <div>
                <div class="subject-card-top">
                  <div class="subject-icon" style="background:${sub.accentLight}; color:${sub.accentColor};">${sub.icon}</div>
                  <span class="subject-badge" style="background:${sub.accentLight}; color:${sub.accentColor};">${badge}</span>
                </div>
                <h3>${displayName}</h3>
                <p>${desc}</p>
              </div>
              <div class="subject-card-footer">
                <span>${sub.topicsCount} ${t('topicsCountLabel', lang)} • 6 LKS</span>
                <span>${t('openSubject', lang)} ➔</span>
              </div>
            </div>
          `;
        }).join('');

        gridEl.querySelectorAll('.subject-card[data-subject-id]').forEach(card => {
          card.addEventListener('click', () => {
            const id = card.getAttribute('data-subject-id');
            appState.navigate('subject', id);
          });
        });
      }
    };

    this.mainEl.innerHTML = `
      <!-- Header Katalog Semua Pelajaran -->
      <section class="section-header" style="margin-bottom:24px;">
        <div class="eyebrow"><span class="no">📚</span><span class="lbl">${isEn ? 'Curriculum Directory · Elementary Grades' : 'Direktori Kurikulum Lengkap · SD Fase A & B'}</span></div>
        <h2 class="section-title">${isEn ? 'All 10 Subjects Catalog' : 'Katalog 10 Mata Pelajaran Lengkap'}</h2>
        <p class="section-sub">
          ${isEn ? 'Browse through the complete curriculum. Each subject contains detailed concepts, student worksheets (LKS), and interactive quizzes.' : 'Jelajahi seluruh mata pelajaran sekolah. Setiap pelajaran dilengkapi ringkasan konsep, lembar kerja siswa (LKS), dan kuis interaktif.'}
        </p>
      </section>

      <!-- Bar Pencarian & Filter Kategori -->
      <div class="filter-bar" style="flex-direction:column; align-items:stretch; gap:14px; margin-bottom:28px;">
        <div class="search-input-box" style="width:100%;">
          <span class="search-icon">🔍</span>
          <input type="text" id="allSubjectsSearchInput" placeholder="${isEn ? 'Search subjects, topics, or keywords...' : 'Cari nama pelajaran, topik, atau kata kunci...'}">
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div class="island-chips" id="catalogCategoryChips">
            <button class="chip-btn active" data-cat="all" type="button">
              ${isEn ? 'All Subjects (10)' : 'Semua Pelajaran (10)'}
            </button>
            <button class="chip-btn" data-cat="core" type="button">
              ${isEn ? 'Core Subjects (4)' : 'Pelajaran Utama (4)'}
            </button>
            <button class="chip-btn" data-cat="character" type="button">
              ${isEn ? 'Character & Civics (2)' : 'Karakter & Nilai (2)'}
            </button>
            <button class="chip-btn" data-cat="skills" type="button">
              ${isEn ? 'Arts & PE (2)' : 'Seni & Raga (2)'}
            </button>
            <button class="chip-btn" data-cat="local" type="button">
              ${isEn ? 'Local & P5 Project (2)' : 'Muatan Lokal & P5 (2)'}
            </button>
          </div>
          <div id="catalogCount" style="font-weight:750; font-size:13px; color:var(--teal);">
            10 ${isEn ? 'subjects found' : 'mata pelajaran'}
          </div>
        </div>
      </div>

      <!-- Grid Daftar Mata Pelajaran -->
      <div class="subject-grid" id="catalogGrid"></div>

      <!-- Footer Aplikasi -->
      <footer class="app-footer" style="margin-top:40px;">
        <strong>AnabhiDev Smart Study</strong> — ${(typeof t === 'function') ? t('pill', lang) : 'Media Belajar Interaktif SD Kelas 1'}<br>
        ${(typeof t === 'function') ? t('developmentCredit', lang) : 'Development · Anabhi Dev'} · 2026
      </footer>
    `;

    // Pasang listener input pencarian
    const searchInput = this.mainEl.querySelector('#allSubjectsSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderCatalogGrid();
      });
    }

    // Pasang listener chip kategori
    const catChips = this.mainEl.querySelectorAll('#catalogCategoryChips .chip-btn');
    catChips.forEach(btn => {
      btn.addEventListener('click', () => {
        catChips.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = btn.getAttribute('data-cat');
        renderCatalogGrid();
      });
    });

    renderCatalogGrid();
  }
}

// Bootstrap saat DOM siap
if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', () => {
    new App();
  });
} else {
  new App();
}
