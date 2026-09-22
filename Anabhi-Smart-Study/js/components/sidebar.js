// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Collapsible Sidebar & Mobile Drawer
// Development · Anabhi Dev
// Version   : 1.8 (SOP v2.2 & Standar Coding v1.8 Aligned)
// Generated : 14 September 2026, 23:52:00
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
    const isEn = lang === 'en';

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
          <img src="https://anabhidev.com/logo.webp" alt="Anabhi Dev" width="512" height="180" loading="eager" decoding="async">
        </a>
        <button class="btn-collapse-toggle" id="sidebarCollapseBtn" type="button" aria-label="Ciutkan atau perlebar sidebar" title="${state.sidebarCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}">
          ${state.sidebarCollapsed ? '»' : '«'}
        </button>
        <button class="btn-drawer-close" id="sidebarCloseBtn" type="button" aria-label="${isEn ? 'Close navigation drawer' : 'Tutup menu navigasi'}" title="${isEn ? 'Close menu' : 'Tutup menu'}">
          ✕
        </button>
      </div>

      <!-- Menu Utama -->
      <div class="kicker">${t('mainNav', lang)}</div>
      <nav class="nav" aria-label="Navigasi Utama">
        <button class="nav-item ${state.currentRoute === 'home' ? 'active' : ''}" data-route="home" data-tooltip="${t('home', lang)}" aria-label="${t('home', lang)}">
          <span class="icon">🏠</span>
          <span class="label">${t('home', lang)}</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'jadwal' ? 'active' : ''}" data-route="jadwal" data-tooltip="${isEn ? 'Class 1B Schedule' : 'Jadwal Pelajaran 1B'}" aria-label="${isEn ? 'Class 1B Schedule' : 'Jadwal Pelajaran 1B'}">
          <span class="icon">🗓️</span>
          <span class="label">${isEn ? 'Class 1B Schedule' : 'Jadwal Pelajaran 1B'}</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'all-subjects' ? 'active' : ''}" data-route="all-subjects" data-tooltip="${t('allSubjects', lang)}" aria-label="${t('allSubjects', lang)}">
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
            <button class="nav-item ${isActive ? 'active' : ''}" data-route="subject" data-subject-id="${sub.id}" data-tooltip="${displayName}" aria-label="${displayName}">
              <span class="icon">${sub.icon}</span>
              <span class="label">${displayName}</span>
            </button>
          `;
        }).join('')}
      </nav>

      <!-- Learning Labs (Reading Lab, Writing Lab, Calistung, 60 Menit, MAXXI, Math Toolbox) -->
      <div class="kicker">${isEn ? 'LEARNING LABS & DRILLS' : 'LEARNING LABS & BUKU PENDAMPING'}</div>
      <nav class="nav" aria-label="Learning Labs">
        <button class="nav-item ${state.currentRoute === 'reading' ? 'active' : ''}" data-route="reading" data-tooltip="${isEn ? 'Reading Lab (60 Jam Tanpa Dieja)' : 'Reading Lab (60 Jam Tanpa Dieja)'}" aria-label="${isEn ? 'Reading Lab (60 Hours Method)' : 'Reading Lab (Metode 60 Jam Tanpa Dieja)'}">
          <span class="icon">📖</span>
          <span class="label">Reading Lab (60 Jam)</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'calistung' || state.currentRoute === 'cali-stung' ? 'active' : ''}" data-route="calistung" data-tooltip="${isEn ? 'Calistung Daily Drill' : 'Buku Calistung (Drill 5-15 Menit)'}" aria-label="${isEn ? 'Calistung Daily Drill' : 'Buku Calistung (Drill 5-15 Menit)'}">
          <span class="icon">⚡</span>
          <span class="label">Calistung (Drill 5-15m)</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'sixty-min' ? 'active' : ''}" data-route="sixty-min" data-tooltip="${isEn ? '60-Minute 4-Pillar Starter' : 'Buku 60 Menit (4 Pilar)'}" aria-label="${isEn ? '60-Minute 4-Pillar Starter' : 'Buku 60 Menit (4 Pilar)'}">
          <span class="icon">🕒</span>
          <span class="label">60 Menit (4 Pilar)</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'maxxi' ? 'active' : ''}" data-route="maxxi" data-tooltip="${isEn ? 'MAXXI School Reinforcement' : 'Buku MAXXI (Tematik Sekolah)'}" aria-label="${isEn ? 'MAXXI Thematic School Book' : 'Buku MAXXI (Tematik Sekolah)'}">
          <span class="icon">🏆</span>
          <span class="label">Buku MAXXI (Tematik)</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'math-toolbox' ? 'active' : ''}" data-route="math-toolbox" data-tooltip="${isEn ? 'Math Toolbox (14 Strategies)' : 'Math Toolbox (14 Jurus Berhitung)'}" aria-label="${isEn ? 'Math Toolbox (14 Strategies)' : 'Math Toolbox (14 Jurus Berhitung)'}">
          <span class="icon">🧮</span>
          <span class="label">Math Toolbox (14 Jurus)</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'writing' ? 'active' : ''}" data-route="writing" data-tooltip="${isEn ? 'Writing Lab & Tracing' : 'Writing Lab (Latihan Menulis)'}" aria-label="${isEn ? 'Writing Lab & Tracing' : 'Writing Lab (Latihan Menulis)'}">
          <span class="icon">✍️</span>
          <span class="label">Writing Lab</span>
        </button>
      </nav>

      <!-- Fitur Tambahan: Tantangan & Progress -->
      <div class="kicker">${t('activitiesKicker', lang)}</div>
      <nav class="nav" aria-label="Aktivitas">
        <button class="nav-item ${state.currentRoute === 'tantangan' ? 'active' : ''}" data-route="tantangan" data-tooltip="${t('dailyChallenge', lang)}" aria-label="${t('dailyChallenge', lang)}">
          <span class="icon">🎯</span>
          <span class="label">${t('dailyChallenge', lang)}</span>
        </button>
        <button class="nav-item ${state.currentRoute === 'progress' ? 'active' : ''}" data-route="progress" data-tooltip="${t('progress', lang)}" aria-label="${t('progress', lang)}">
          <span class="icon">📈</span>
          <span class="label">${t('progress', lang)}</span>
        </button>
        <button class="nav-item" id="sidebarAiTutorBtn" type="button" data-tooltip="${lang === 'en' ? 'Ask AI Tutor (Gemini)' : 'Tanya Kakak AI (Gemini)'}" aria-label="${lang === 'en' ? 'Ask AI Tutor (Gemini)' : 'Tanya Kakak AI (Gemini)'}">
          <span class="icon">🤖</span>
          <span class="label">${lang === 'en' ? 'Ask AI Tutor' : 'Tanya Kakak AI'}</span>
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

    const closeBtn = this.sidebar.querySelector('#sidebarCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        appState.toggleDrawer(false);
      });
    }

    const sidebarAiBtn = this.sidebar.querySelector('#sidebarAiTutorBtn');
    if (sidebarAiBtn) {
      sidebarAiBtn.addEventListener('click', () => {
        if (appState.get().drawerOpen) {
          appState.toggleDrawer(false);
        }
        if (window.aiTutorModal) {
          window.aiTutorModal.open();
        }
      });
    }

    const navItems = this.sidebar.querySelectorAll('.nav-item[data-route]');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const route = item.getAttribute('data-route');
        const subjectId = item.getAttribute('data-subject-id');
        if (route) {
          appState.navigate(route, subjectId);
        }
      });
    });
  }
}
