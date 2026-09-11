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

class App {
  constructor() {
    this.topbarEl = document.getElementById('topbar');
    this.sidebarEl = document.getElementById('sidebar');
    this.scrimEl = document.getElementById('scrim');
    this.shellEl = document.getElementById('shell');
    this.mainEl = document.getElementById('main');
    this.videoModalEl = document.getElementById('videoModal');

    // Komponen UI
    this.topbar = new TopbarComponent(this.topbarEl);
    this.sidebar = new SidebarComponent(this.sidebarEl, this.scrimEl, this.shellEl);
    this.videoModal = new VideoModalComponent(this.videoModalEl);
    this.subjectView = new SubjectViewComponent(this.mainEl, this.videoModal);
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
    const state = appState.get();
    const lang = state.lang || 'id';

    this.mainEl.innerHTML = `
      <!-- Hero Banner Ceria -->
      <section class="hero" id="heroSection">
        <div class="hero-copy">
          <div class="pill"><span class="dot"></span> ${t('pill', lang)}</div>
          <span class="product-mark">SMART STUDY</span>
          <h1>${t('heroTitlePrefix', lang)}<span>${t('heroTitleAccent', lang)}</span></h1>
          <h2>${t('heroSubtitle', lang)}</h2>
          <p class="lead">
            ${t('heroLead', lang)}
          </p>
          <div class="hero-actions">
            <button class="btn primary" id="heroBtnMath" type="button">
              ${t('heroBtnMath', lang)}
            </button>
            <button class="btn" id="heroBtnGeo" type="button">
              ${t('heroBtnGeo', lang)}
            </button>
          </div>
        </div>

        <div class="hero-art">
          <div class="hero-card-visual">
            <div class="hero-feature-item">
              <span class="icon">🧮</span>
              <div>
                <strong>${t('featureMathTitle', lang)}</strong>
                <span>${t('featureMathDesc', lang)}</span>
              </div>
            </div>
            <div class="hero-feature-item">
              <span class="icon">🌍</span>
              <div>
                <strong>${t('featureGeoTitle', lang)}</strong>
                <span>${t('featureGeoDesc', lang)}</span>
              </div>
            </div>
            <div class="hero-feature-item">
              <span class="icon">⭐</span>
              <div>
                <strong>${t('featureBadgeTitle', lang)}</strong>
                <span>${t('featureBadgeDesc', lang)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: 10 Mata Pelajaran Lengkap -->
      <section class="section" id="subjectsSection">
        <div class="section-header">
          <div class="eyebrow"><span class="no">${t('tenSubjectsEyebrow', lang)}</span><span class="lbl">${t('tenSubjectsBadge', lang)}</span></div>
          <h2 class="section-title">${t('whatToLearnTitle', lang)}</h2>
          <p class="section-sub">${t('whatToLearnSub', lang)}</p>
        </div>

        <div class="subject-grid">
          ${SUBJECTS.map(sub => {
            const displayName = getSubjectName(sub, lang);
            const badge = getSubjectBadge(sub, lang);
            const desc = getSubjectDesc(sub, lang);

            return `
              <div class="subject-card" data-subject-id="${sub.id}">
                <div>
                  <div class="subject-card-top">
                    <div class="subject-icon" style="background:${sub.accentLight}; color:${sub.accentColor};">${sub.icon}</div>
                    <span class="subject-badge" style="background:${sub.accentLight}; color:${sub.accentColor};">${badge}</span>
                  </div>
                  <h3>${displayName}</h3>
                  <p>${desc}</p>
                </div>
                <div class="subject-card-footer">
                  <span>${sub.topicsCount} ${t('topicsCountLabel', lang)}</span>
                  <span>${t('openSubject', lang)}</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- Footer Aplikasi -->
      <footer class="app-footer">
        <strong>AnabhiDev Smart Study</strong> — ${t('pill', lang)}<br>
        ${t('developmentCredit', lang)} · 2026
      </footer>
    `;

    // Pasang event listener untuk card dan tombol hero
    const heroBtnMath = this.mainEl.querySelector('#heroBtnMath');
    if (heroBtnMath) {
      heroBtnMath.addEventListener('click', () => {
        appState.navigate('subject', 'matematika');
      });
    }

    const heroBtnGeo = this.mainEl.querySelector('#heroBtnGeo');
    if (heroBtnGeo) {
      heroBtnGeo.addEventListener('click', () => {
        appState.navigate('subject', 'geografi');
      });
    }

    const subjectCards = this.mainEl.querySelectorAll('.subject-card');
    subjectCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-subject-id');
        appState.navigate('subject', id);
      });
    });
  }

  renderAllSubjects() {
    this.renderHome();
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
