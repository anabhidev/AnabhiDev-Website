// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Collapsible Sidebar & Mobile Drawer
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 11:08:00
// ================================================================

import { SUBJECTS, getSubjectName } from '../data/subjects.js';
import { appState } from '../state.js';
import { t } from '../data/i18n.js';

export class SidebarComponent {
  constructor(sidebarElement, scrimElement, shellElement) {
    this.sidebar = sidebarElement;
    this.scrim = scrimElement;
    this.shell = shellElement;

    this.initKeyboardEvents();
  }

  initKeyboardEvents() {
    window.addEventListener('keydown', (e) => {
      // Tombol Esc menutup mobile drawer (SOP Kategori 14)
      if (e.key === 'Escape' && appState.get().drawerOpen) {
        appState.toggleDrawer(false);
      }
    });

    if (this.scrim) {
      this.scrim.addEventListener('click', () => {
        appState.toggleDrawer(false);
      });
    }
  }

  render() {
    const state = appState.get();
    const lang = state.lang || 'id';

    // Sinkronisasi kelas collapsed pada .shell
    if (state.sidebarCollapsed) {
      this.shell.classList.add('collapsed');
    } else {
      this.shell.classList.remove('collapsed');
    }

    // Sinkronisasi status drawer mobile
    if (state.drawerOpen) {
      this.sidebar.classList.add('open');
      if (this.scrim) this.scrim.classList.add('show');
    } else {
      this.sidebar.classList.remove('open');
      if (this.scrim) this.scrim.classList.remove('show');
    }

    this.sidebar.innerHTML = `
      <!-- Logo Anabhi Dev Saja di Atas Sidebar: Besar, Seukuran Sidebar, Tanpa Title Web (SOP 2.0) -->
      <div class="sidebar-top-branding">
        <a class="logo-box" href="https://anabhidev.com" target="_blank" rel="noopener noreferrer" aria-label="Kunjungi anabhidev.com">
          <img src="https://anabhidev.com/logo.webp" alt="Anabhi Dev" width="512" height="180" loading="eager">
        </a>
        <button class="btn-collapse-toggle" id="sidebarCollapseBtn" type="button" aria-label="Ciutkan atau perlebar sidebar" title="${state.sidebarCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}">
          ${state.sidebarCollapsed ? '»' : '«'}
        </button>
      </div>

      <!-- Menu Utama -->
      <div class="kicker">${t('mainNav', lang)}</div>
      <nav class="nav" aria-label="Navigasi Utama">
        <button class="nav-item ${state.currentRoute === 'home' ? 'active' : ''}" data-route="home" data-tooltip="${t('home', lang)}">
          <span class="icon">🏠</span>
          <span class="label">${t('home', lang)}</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'all-subjects' ? 'active' : ''}" data-route="all-subjects" data-tooltip="${t('allSubjects', lang)}">
          <span class="icon">📚</span>
          <span class="label">${t('allSubjects', lang)}</span>
        </button>
      </nav>

      <!-- 10 Mata Pelajaran Lengkap -->
      <div class="kicker">${t('subjectsKicker', lang)}</div>
      <nav class="nav" aria-label="Mata Pelajaran">
        ${SUBJECTS.map(sub => {
          const isActive = state.currentRoute === 'subject' && state.currentSubjectId === sub.id;
          const displayName = getSubjectName(sub, lang);

          return `
            <button class="nav-item ${isActive ? 'active' : ''}" data-route="subject" data-subject-id="${sub.id}" data-tooltip="${displayName}">
              <span class="icon">${sub.icon}</span>
              <span class="label">${displayName}</span>
            </button>
          `;
        }).join('')}
      </nav>

      <!-- Fitur Tambahan: Tantangan & Progress -->
      <div class="kicker">${t('activitiesKicker', lang)}</div>
      <nav class="nav" aria-label="Aktivitas">
        <button class="nav-item ${state.currentRoute === 'tantangan' ? 'active' : ''}" data-route="tantangan" data-tooltip="${t('dailyChallenge', lang)}">
          <span class="icon">🎯</span>
          <span class="label">${t('dailyChallenge', lang)}</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'progress' ? 'active' : ''}" data-route="progress" data-tooltip="${t('progress', lang)}">
          <span class="icon">📈</span>
          <span class="label">${t('progress', lang)}</span>
        </button>
      </nav>

      <!-- Footer Kredit Resmi (Standar Coding 1.5 Bagian 6) -->
      <div class="sidebar-foot">
        <strong>ANABHIDEV SMART STUDY</strong>
        ${t('footerTagline', lang)}
        <br>
        ${t('developmentCredit', lang)}
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const collapseBtn = this.sidebar.querySelector('#sidebarCollapseBtn');
    if (collapseBtn) {
      collapseBtn.addEventListener('click', () => {
        appState.toggleSidebar();
      });
    }

    const navItems = this.sidebar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const route = item.getAttribute('data-route');
        const subjectId = item.getAttribute('data-subject-id');
        appState.navigate(route, subjectId);
      });
    });
  }
}
