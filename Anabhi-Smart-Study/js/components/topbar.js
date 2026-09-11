// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Topbar & Install Prompt Handler
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 11:05:00
// ================================================================

import { appState } from '../state.js';
import { store } from '../store.js';
import { t } from '../data/i18n.js';

export class TopbarComponent {
  constructor(container) {
    this.container = container;
    this.deferredPrompt = null;
    this.isStandalone = false;

    this.checkStandalone();
    this.initInstallPromptListener();
  }

  checkStandalone() {
    this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                        window.navigator.standalone === true;
  }

  initInstallPromptListener() {
    // SOP 1.9 Kategori 18.6: DILARANG preventDefault() agar native Chrome pop-up tetap aktif!
    window.addEventListener('beforeinstallprompt', (e) => {
      this.deferredPrompt = e;
      this.render(); // Render ulang agar tombol Install di UI terlihat
    });

    window.addEventListener('appinstalled', () => {
      this.deferredPrompt = null;
      this.isStandalone = true;
      this.render();
      console.log('[PWA] Aplikasi Smart Study berhasil diinstall!');
    });
  }

  render() {
    const s = store.data;
    const state = appState.get();
    const lang = state.lang || 'id';
    const currentTheme = state.theme || 'light';
    const showInstallBtn = !this.isStandalone && this.deferredPrompt !== null;

    this.container.innerHTML = `
      <div class="topbar-left">
        <button class="iconbtn" id="menuBtn" type="button" aria-label="Buka menu navigasi drawer" aria-expanded="false" aria-controls="sidebar">
          ☰
        </button>
        <div class="hdr-title" id="topbarBrandBtn" title="Kembali ke Beranda" style="cursor:pointer;">
          <span class="app-name">Smart Study</span>
          <span class="grade-badge">${t('gradeBadge', lang)}</span>
          <span id="runMode" class="run-mode-badge" style="font-size:11px; opacity:0.75; font-weight:600; margin-left:4px;">${this.isStandalone ? '· aplikasi' : '· browser'}</span>
        </div>
      </div>

      <div class="topbar-right">
        <!-- Bintang Belajar -->
        <div class="stat-pill" title="${t('starsTitle', lang)}">
          <span class="icon">⭐</span>
          <span id="starCount">${s.stars || 0}</span>
        </div>

        <!-- Streak Harian -->
        <div class="stat-pill" title="${t('streakTitle', lang)}">
          <span class="icon">🔥</span>
          <span id="streakCount">${s.streakDays || 1} ${t('days', lang)}</span>
        </div>

        <!-- Tombol Ganti Bahasa ID / EN (Default: ID) -->
        <button class="iconbtn" id="langToggleBtn" type="button" aria-label="${t('langSwitch', lang)}" title="${t('langSwitch', lang)}" style="font-size:12px; font-weight:800; padding:0 10px; width:auto; min-width:44px;">
          ${lang === 'id' ? '🌐 ID' : '🌐 EN'}
        </button>

        <!-- Toggle Tema Terang/Gelap (Default: Light) -->
        <button class="iconbtn" id="themeToggleBtn" type="button" aria-label="${currentTheme === 'dark' ? t('themeLight', lang) : t('themeDark', lang)}" title="${currentTheme === 'dark' ? t('themeLight', lang) : t('themeDark', lang)}">
          ${currentTheme === 'dark' ? '☀️' : '🌙'}
        </button>

        <!-- Tombol Install PWA (SOP 1.9 Kategori 18) -->
        ${showInstallBtn ? `
          <button class="btn-pwa-install" id="pwaInstallBtn" type="button" title="${t('installTitle', lang)}">
            <span>📲</span> ${t('installApp', lang)}
          </button>
        ` : ''}
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const brandBtn = this.container.querySelector('#topbarBrandBtn');
    if (brandBtn) {
      brandBtn.addEventListener('click', () => {
        appState.navigate('home');
      });
    }

    const menuBtn = this.container.querySelector('#menuBtn');
    if (menuBtn) {
      menuBtn.addEventListener('click', () => {
        appState.toggleDrawer();
      });
    }

    const themeBtn = this.container.querySelector('#themeToggleBtn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        appState.toggleTheme();
      });
    }

    const langBtn = this.container.querySelector('#langToggleBtn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        appState.toggleLang();
      });
    }

    const installBtn = this.container.querySelector('#pwaInstallBtn');
    if (installBtn && this.deferredPrompt) {
      installBtn.addEventListener('click', async () => {
        try {
          await this.deferredPrompt.prompt();
          const { outcome } = await this.deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            this.deferredPrompt = null;
            this.render();
          }
        } catch (err) {
          console.warn('[PWA] Prompt install mungkin sudah digunakan oleh native banner:', err);
        }
      });
    }
  }
}
