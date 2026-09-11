// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Daily Challenge Component
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 10:40:00
// ================================================================

import { store } from '../store.js';
import { appState } from '../state.js';
import { t } from '../data/i18n.js';

export class ChallengeViewComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    const lang = appState.get().lang || 'id';
    const dc = store.data.dailyChallenge || { completedCount: 0, targetCount: 3, claimed: false };
    const pct = Math.min(100, Math.round((dc.completedCount / dc.targetCount) * 100));

    const challengeTasks = [
      {
        id: 'c1',
        icon: '🧮',
        title: lang === 'en' ? 'Quick Calculation Practice' : 'Latihan Hitung Cepat',
        desc: lang === 'en' ? 'Try one addition trick in the Mathematics module.' : 'Coba satu jurus penjumlahan di modul Matematika.',
        done: dc.completedCount >= 1,
        actionLabel: lang === 'en' ? 'Open Math' : 'Buka Matematika',
        route: 'subject',
        subjectId: 'matematika'
      },
      {
        id: 'c2',
        icon: '🌍',
        title: lang === 'en' ? 'Explore 1 Indonesian Province' : 'Jelajah 1 Provinsi Indonesia',
        desc: lang === 'en' ? 'Find out the capital of your favorite province.' : 'Cari tahu ibu kota salah satu provinsi favoritmu.',
        done: dc.completedCount >= 2,
        actionLabel: lang === 'en' ? 'Open Geography' : 'Buka Geografi',
        route: 'subject',
        subjectId: 'geografi'
      },
      {
        id: 'c3',
        icon: '📖',
        title: lang === 'en' ? 'Cheerful Greeting of the Day' : 'Sapaan Ceria Hari Ini',
        desc: lang === 'en' ? 'Learn a greeting in English or Balinese.' : 'Pelajari salam dalam bahasa Inggris atau bahasa Bali.',
        done: dc.completedCount >= 3,
        actionLabel: lang === 'en' ? 'Open English' : 'Buka B. Inggris',
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

      <!-- Kartu Progress Tantangan -->
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

      <!-- Daftar 3 Tugas Tantangan -->
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
    `;

    this.attachEvents();
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
  }
}

