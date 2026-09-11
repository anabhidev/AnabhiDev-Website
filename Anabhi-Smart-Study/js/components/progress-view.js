// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Progress & Parent Summary View
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 10:42:00
// ================================================================

import { store } from '../store.js';
import { SUBJECTS, getSubjectName } from '../data/subjects.js';
import { appState } from '../state.js';
import { t } from '../data/i18n.js';

export class ProgressViewComponent {
  constructor(container) {
    this.container = container;
  }

  render() {
    const s = store.data;
    const lang = appState.get().lang || 'id';
    const completedCount = (s.completedLessons || []).length;
    const totalEstimate = 25;
    const overallPct = Math.min(100, Math.round((completedCount / totalEstimate) * 100));

    this.container.innerHTML = `
      <div class="section-header">
        <div class="math-hero-badge" style="background:#edfbf2; color:#1e7b45; border-color:#5be08f;">
          ${t('reportBadge', lang)}
        </div>
        <h2 class="section-title">${t('reportTitle', lang)}</h2>
        <p class="section-sub">${t('reportSub', lang)}</p>
      </div>

      <!-- Ringkasan Statistik Utama -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:28px;">
        <div class="quiz-box" style="margin:0; text-align:center;">
          <div style="font-size:36px; margin-bottom:4px;">⭐</div>
          <div style="font-size:28px; font-weight:900; color:var(--ink);">${s.stars || 0}</div>
          <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('totalGoldStars', lang)}</div>
        </div>

        <div class="quiz-box" style="margin:0; text-align:center;">
          <div style="font-size:36px; margin-bottom:4px;">🔥</div>
          <div style="font-size:28px; font-weight:900; color:var(--ink);">${s.streakDays || 1} ${t('days', lang)}</div>
          <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('activeStreak', lang)}</div>
        </div>

        <div class="quiz-box" style="margin:0; text-align:center;">
          <div style="font-size:36px; margin-bottom:4px;">🏆</div>
          <div style="font-size:28px; font-weight:900; color:var(--ink);">${(s.badges || []).length}</div>
          <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('badgesWon', lang)}</div>
        </div>

        <div class="quiz-box" style="margin:0; text-align:center;">
          <div style="font-size:36px; margin-bottom:4px;">🚀</div>
          <div style="font-size:28px; font-weight:900; color:var(--teal);">${overallPct}%</div>
          <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('levelLabel', lang)}</div>
        </div>
      </div>

      <!-- Koleksi Lencana (Badges) -->
      <div class="section">
        <h3 style="font-size:19px; font-weight:800; margin:0 0 14px;">${t('kidBadgesTitle', lang)}</h3>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:14px;">
          ${(s.badges || []).map(b => `
            <div class="quiz-box" style="margin:0; display:flex; align-items:center; gap:14px; padding:16px;">
              <span style="font-size:32px;">${b.icon}</span>
              <div>
                <strong style="font-size:14px; display:block;">${(lang === 'en' && b.nameEn) ? b.nameEn : b.name}</strong>
                <span style="font-size:12px; color:var(--muted);">${(lang === 'en' && b.descEn) ? b.descEn : b.desc}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Panduan Khusus Orang Tua / Pendamping -->
      <div class="quiz-box" style="margin-top:30px; border-left:5px solid var(--teal);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
          <h3 style="font-size:17px; font-weight:800; margin:0;">${t('parentSummaryTitle', lang)}</h3>
          <span class="subject-badge">${t('parentPrivacyNotice', lang)}</span>
        </div>
        <p style="font-size:13px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
          ${t('parentSummaryDesc', lang)}
        </p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${SUBJECTS.slice(0, 5).map(sub => {
            const count = (s.completedLessons || []).filter(k => k.startsWith(sub.id)).length;
            const subPct = Math.min(100, count * 35);
            return `
              <div>
                <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:750; margin-bottom:4px;">
                  <span>${sub.icon} ${getSubjectName(sub, lang)}</span>
                  <span style="color:var(--teal);">${subPct}% ${t('completedLabel', lang)}</span>
                </div>
                <div style="height:8px; background:var(--paper); border-radius:999px; overflow:hidden;">
                  <div style="width:${subPct}%; height:100%; background:var(--teal); border-radius:999px;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div style="margin-top:24px; display:flex; justify-content:flex-end;">
          <button class="btn" id="btnResetProgress" type="button" style="color:var(--red); border-color:var(--red-soft);">
            ${t('resetProgressBtn', lang)}
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const resetBtn = this.container.querySelector('#btnResetProgress');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        const lang = appState.get().lang || 'id';
        if (confirm(t('resetConfirmPrompt', lang))) {
          store.resetProgress();
          alert(t('resetSuccessAlert', lang));
          this.render();
        }
      });
    }
  }
}

