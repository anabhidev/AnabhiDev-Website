// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Daily Challenge & Integrated Reinforcement Component
// Development · Anabhi Dev
// Version   : 2.0 (Cali Stung 5-Menit, MAXXI Challenge, & Source Books Registry)
// ================================================================

import { store } from '../store.js';
import { appState } from '../state.js';
import { t } from '../data/i18n.js';
import { CALI_STUNG_DATA, MAXXI_CHALLENGE_DATA } from '../data/integrated-challenges.js';
import { QuizRunner } from './quiz-runner.js';
import { AudioFx } from '../engine/audio-fx.js';

export class ChallengeViewComponent {
  constructor(container, lksModal = null) {
    this.container = container;
    this.lksModal = lksModal || (typeof window !== 'undefined' ? window.lksModal : null);
    this.activeSpecialQuiz = null; // null | 'cali-stung' | 'maxxi'
  }

  render() {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';

    if (this.activeSpecialQuiz === 'cali-stung') {
      this.renderSpecialQuiz(CALI_STUNG_DATA, lang, isEn);
      return;
    }

    if (this.activeSpecialQuiz === 'maxxi') {
      this.renderSpecialQuiz(MAXXI_CHALLENGE_DATA, lang, isEn);
      return;
    }

    const dc = store.data.dailyChallenge || { completedCount: 0, targetCount: 3, claimed: false };
    const pct = Math.min(100, Math.round((dc.completedCount / dc.targetCount) * 100));

    const challengeTasks = [
      {
        id: 'c1',
        icon: '🧮',
        title: isEn ? 'Quick Calculation Practice' : 'Latihan Hitung Cepat',
        desc: isEn ? 'Try one addition trick in the Mathematics module.' : 'Coba satu jurus penjumlahan di modul Matematika.',
        done: dc.completedCount >= 1,
        actionLabel: isEn ? 'Open Math' : 'Buka Matematika',
        route: 'subject',
        subjectId: 'matematika'
      },
      {
        id: 'c2',
        icon: '🌍',
        title: isEn ? 'Explore 1 Indonesian Province' : 'Jelajah 1 Provinsi Indonesia',
        desc: isEn ? 'Find out the capital of your favorite province.' : 'Cari tahu ibu kota salah satu provinsi favoritmu.',
        done: dc.completedCount >= 2,
        actionLabel: isEn ? 'Open Geography' : 'Buka Geografi',
        route: 'subject',
        subjectId: 'geografi'
      },
      {
        id: 'c3',
        icon: '📖',
        title: isEn ? 'Cheerful Greeting of the Day' : 'Sapaan Ceria Hari Ini',
        desc: isEn ? 'Learn a greeting in English or Balinese.' : 'Pelajari salam dalam bahasa Inggris atau bahasa Bali.',
        done: dc.completedCount >= 3,
        actionLabel: isEn ? 'Open English' : 'Buka B. Inggris',
        route: 'subject',
        subjectId: 'bahasa-inggris'
      }
    ];

    this.container.innerHTML = `
      <div class="section-header">
        <div class="math-hero-badge" style="background:#fff6e0; color:#946808; border-color:#ffb21b;">
          ${t('challengeBadge', lang)}
        </div>
        <h2 class="section-title">${t('challengeTitle', lang)}</h2>
        <p class="section-sub">${t('challengeSub', lang)}</p>
      </div>

      <!-- Kartu Progress Tantangan Harian -->
      <div class="quiz-box" style="background:linear-gradient(135deg, var(--card), var(--paper));">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <strong style="font-size:16px;">${t('todayTargetPrefix', lang)} ${dc.completedCount} ${t('of', lang)} ${dc.targetCount} ${t('doneCountLabel', lang)}</strong>
          <span style="font-weight:900; font-size:18px; color:var(--teal);">${pct}%</span>
        </div>

        <div style="height:14px; background:var(--line); border-radius:999px; overflow:hidden; margin-bottom:18px;">
          <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, #ffb21b, #1e7b45); border-radius:999px; transition:width 0.4s ease;"></div>
        </div>

        ${pct === 100 ? `
          <div class="feedback-banner success show" style="display:flex; margin-top:0;">
            ${t('challengeSuccessMsg', lang)}
          </div>
        ` : `
          <div style="font-size:13px; color:var(--muted);">
            ${t('challengePrompt', lang)}
          </div>
        `}
      </div>

      <!-- Daftar 3 Tugas Tantangan Harian -->
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px; margin-top:24px;">
        ${challengeTasks.map(task => `
          <div class="quiz-box" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between; ${task.done ? 'border-color:var(--green); background:var(--green-soft);' : ''}">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-size:28px;">${task.icon}</span>
                <span class="subject-badge" style="${task.done ? 'background:var(--green); color:#fff;' : ''}">
                  ${task.done ? t('statusDone', lang) : t('statusPending', lang)}
                </span>
              </div>
              <h4 style="margin:0 0 6px; font-size:16px; font-weight:800;">${task.title}</h4>
              <p style="margin:0; font-size:12.5px; color:var(--muted); line-height:1.5;">${task.desc}</p>
            </div>
            <div style="margin-top:16px;">
              <button class="btn ${task.done ? '' : 'primary'} btn-start-task" data-route="${task.route}" data-subject="${task.subjectId}" type="button" style="width:100%;">
                ${task.done ? t('repeatLessonBtn', lang) : task.actionLabel + ' ➔'}
              </button>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Bagian Modul Penguatan Integratif (SRC-05 Cali Stung & SRC-10 MAXXI) -->
      <div class="section" style="margin-top:40px;">
        <div class="eyebrow"><span class="no">⚡</span><span class="lbl">${isEn ? 'INTEGRATED REINFORCEMENT' : 'PENGUATAN TEMATIK TERPADU'}</span></div>
        <h3 style="font-size:20px; font-weight:800; margin:0 0 16px;">
          ${isEn ? 'Class 1 Core Literacy & Thematic Modules' : 'Pelatihan Khusus & Penguatan Fondasi Belajar'}
        </h3>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(320px, 1fr)); gap:20px;">
          <!-- Kartu Cali Stung 5-Menit -->
          <div class="quiz-box" style="margin-bottom:0; background:var(--card); border:1px solid var(--border); border-left:4px solid #b24a1b; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-size:32px;">⚡</span>
                <span class="subject-badge" style="background:#fdf1eb; color:#b24a1b; border-color:#f89a6b;">
                  SRC-05 · Cali Stung
                </span>
              </div>
              <h4 style="margin:0 0 8px; font-size:17px; font-weight:800; color:var(--ink);">
                ${isEn ? CALI_STUNG_DATA.titleEn : CALI_STUNG_DATA.title}
              </h4>
              <p style="margin:0 0 12px; font-size:13px; color:var(--muted); line-height:1.5;">
                ${isEn ? CALI_STUNG_DATA.subtitleEn : CALI_STUNG_DATA.subtitle}
              </p>
              <div style="font-size:12px; color:var(--ink); background:var(--paper); border-radius:8px; padding:8px 10px;">
                ✓ 5 Membaca Fonik & Kata · ✓ 5 Menulis & Ejaan · ✓ 5 Berhitung Ceria
              </div>
            </div>
            <div style="margin-top:16px;">
              <button class="btn primary" id="btnStartCaliStung" type="button" style="width:100%; font-size:13.5px; font-weight:800;">
                🚀 ${isEn ? 'Start 5-Minute Drill' : 'Mulai Latihan 5 Menit'}
              </button>
            </div>
          </div>

          <!-- Kartu MAXXI Tematik Terpadu -->
          <div class="quiz-box" style="margin-bottom:0; background:var(--card); border:1px solid var(--border); border-left:4px solid #1d7198; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <span style="font-size:32px;">🏆</span>
                <span class="subject-badge" style="background:#e8f4fa; color:#1d7198; border-color:#5ce3de;">
                  SRC-10 · MAXXI SD 1
                </span>
              </div>
              <h4 style="margin:0 0 8px; font-size:17px; font-weight:800; color:var(--ink);">
                ${isEn ? MAXXI_CHALLENGE_DATA.titleEn : MAXXI_CHALLENGE_DATA.title}
              </h4>
              <p style="margin:0 0 12px; font-size:13px; color:var(--muted); line-height:1.5;">
                ${isEn ? MAXXI_CHALLENGE_DATA.subtitleEn : MAXXI_CHALLENGE_DATA.subtitle}
              </p>
              <div style="font-size:12px; color:var(--ink); background:var(--paper); border-radius:8px; padding:8px 10px;">
                ✓ 10 Soal Skenario Tematik (Matematika + Literasi + Pancasila + PJOK + Seni)
              </div>
            </div>
            <div style="margin-top:16px;">
              <button class="btn primary" id="btnStartMaxxi" type="button" style="width:100%; font-size:13.5px; font-weight:800; background:#1d7198; border-color:#1d7198;">
                ⭐ ${isEn ? 'Start MAXXI Challenge' : 'Mulai Tantangan MAXXI'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Banner Register 12 Buku Sumber & Modul Kurikulum (SRC-01 s/d SRC-12) -->
      <div class="quiz-box" style="margin-top:28px; background:var(--teal-soft); border:1px solid var(--teal); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; border-radius:14px;">
        <div style="display:flex; align-items:center; gap:14px;">
          <span style="font-size:32px;">📚</span>
          <div>
            <strong style="font-size:15px; color:var(--teal-soft-ink); display:block;">
              ${isEn ? '12 Reference Curriculum Source Books (SRC-01 to SRC-12)' : '12 Buku Modul Sumber & Penyelarasan Kurikulum Merdeka'}
            </strong>
            <span style="font-size:12.5px; color:var(--ink);">
              ${isEn ? 'Explore publisher info, curriculum scope, and official alignment policy.' : 'Lihat daftar buku fisik murid, penerbit resmi, dan cakupan materi Fase A.'}
            </span>
          </div>
        </div>
        <button class="btn" id="btnOpenSourceRegistry" type="button" style="font-size:13px; font-weight:800; background:#fff; color:var(--teal); border-color:var(--teal); padding:8px 16px;">
          📖 ${isEn ? 'View Source Registry' : 'Buka Daftar Buku Sumber'}
        </button>
      </div>
    `;

    this.attachEvents();
  }

  renderSpecialQuiz(quizData, lang, isEn) {
    this.container.innerHTML = `
      <div style="margin-bottom:16px;">
        <button class="btn" id="btnBackToChallengeMenu" type="button" style="font-size:13px; font-weight:700; padding:6px 14px; display:inline-flex; align-items:center; gap:6px;">
          ← ${isEn ? 'Back to Challenges Menu' : 'Kembali ke Menu Tantangan'}
        </button>
      </div>

      <div class="section-header" style="margin-bottom:20px;">
        <div class="math-hero-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); border-color:var(--teal);">
          ${quizData.sourceId || 'SPECIAL'} · ${isEn ? 'Interactive Challenge' : 'Tantangan Interaktif'}
        </div>
        <h2 class="section-title">${isEn && quizData.titleEn ? quizData.titleEn : quizData.title}</h2>
        <p class="section-sub">${isEn && quizData.subtitleEn ? quizData.subtitleEn : quizData.subtitle}</p>
      </div>

      <div id="specialQuizContainer"></div>
    `;

    const wrap = this.container.querySelector('#specialQuizContainer');
    if (wrap) {
      new QuizRunner(wrap, quizData, () => {
        store.incrementDailyChallenge();
        AudioFx.playSuccess();
        AudioFx.triggerConfetti(this.container);
      });
    }

    const backBtn = this.container.querySelector('#btnBackToChallengeMenu');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        this.activeSpecialQuiz = null;
        this.render();
      });
    }
  }

  attachEvents() {
    const taskBtns = this.container.querySelectorAll('.btn-start-task');
    taskBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const route = btn.getAttribute('data-route');
        const subject = btn.getAttribute('data-subject');
        appState.navigate(route, subject);
      });
    });

    const btnCali = this.container.querySelector('#btnStartCaliStung');
    if (btnCali) {
      btnCali.addEventListener('click', () => {
        this.activeSpecialQuiz = 'cali-stung';
        this.render();
        window.scrollTo({ top: 100, behavior: 'smooth' });
      });
    }

    const btnMaxxi = this.container.querySelector('#btnStartMaxxi');
    if (btnMaxxi) {
      btnMaxxi.addEventListener('click', () => {
        this.activeSpecialQuiz = 'maxxi';
        this.render();
        window.scrollTo({ top: 100, behavior: 'smooth' });
      });
    }

    const btnSources = this.container.querySelector('#btnOpenSourceRegistry');
    if (btnSources) {
      btnSources.addEventListener('click', () => {
        (this.lksModal || window.lksModal)?.openSourceRegistry();
      });
    }
  }
}
