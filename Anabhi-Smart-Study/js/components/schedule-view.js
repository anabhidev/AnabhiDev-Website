// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Schedule View Component (Jadwal Kelas 1B)
// Development · Anabhi Dev
// Version   : 2.0 (SOP v2.4 & Standar Coding v2.0 Aligned)
// Generated : 21 September 2026, 11:20:00 WITA
// ================================================================

import { SCHEDULE_DATA, getScheduleByDayIndex, getGroupedDailySchedule } from '../data/schedule-data.js';
import { appState } from '../state.js';
import { t } from '../data/i18n.js';

export class ScheduleViewComponent {
  constructor(containerEl) {
    this.container = containerEl;
    // Default tab aktif: cek hari saat ini
    const todayIndex = new Date().getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
    if (todayIndex >= 1 && todayIndex <= 5) {
      this.activeTab = 'today';
    } else {
      this.activeTab = 'senin'; // Akhir pekan default ke Senin
    }
  }

  render() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const todayIndex = new Date().getDay();
    const todayData = getScheduleByDayIndex(todayIndex);

    // Tentukan hari yang dirender
    let activeDayKey = 'senin';
    if (this.activeTab === 'today') {
      activeDayKey = todayData.isWeekend ? 'senin' : todayData.key;
    } else if (['senin', 'selasa', 'rabu', 'kamis', 'jumat'].includes(this.activeTab)) {
      activeDayKey = this.activeTab;
    }

    this.container.innerHTML = `
      <!-- 1. Header Hero Jadwal Pelajaran -->
      <section class="schedule-hero-banner" style="background:linear-gradient(135deg, var(--card), var(--surface)); border:1.5px solid var(--line); border-radius:24px; padding:28px; margin-bottom:28px; box-shadow:var(--shadow);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
          <div>
            <div class="pill" style="margin-bottom:10px; background:rgba(255, 178, 27, 0.15); border-color:rgba(255, 178, 27, 0.4); color:var(--ink);">
              <span class="dot" style="background:#ffb21b;"></span> 🗓️ ${SCHEDULE_DATA.grade} · ${SCHEDULE_DATA.academicYear}
            </div>
            <h1 style="margin:0 0 8px; font-size:26px; font-weight:850; color:var(--ink); display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              ${isEn ? SCHEDULE_DATA.titleEn : SCHEDULE_DATA.title}
              <span style="font-size:12px; font-weight:800; background:var(--teal-soft); color:var(--teal-soft-ink); border:1px solid var(--teal); padding:3px 10px; border-radius:999px;">
                Kurikulum Merdeka
              </span>
            </h1>
            <p style="margin:0; font-size:14px; color:var(--muted); max-width:680px; line-height:1.6;">
              ${isEn ? 'Official weekly learning schedule for Grade 1B (07.30 – 12.30 WITA). Select a day below to explore class periods or view the full interactive grid.' : 'Jadwal resmi pembelajaran mingguan SD Kelas 1B (07.30 – 12.30 WITA). Pilih hari untuk melihat alur jam belajar atau buka tabel utuh dan poster resminya.'}
            </p>
          </div>

          <!-- Quick Action Buttons -->
          <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
            <button class="btn secondary" id="btnPrintSchedule" type="button" title="Cetak Jadwal Pelajaran" style="font-size:12.5px;">
              🖨️ ${isEn ? 'Print Schedule' : 'Cetak Jadwal'}
            </button>
            <button class="btn primary" id="btnViewOriginalPoster" type="button" title="Lihat Poster Asli Berwarna" style="font-size:12.5px;">
              🖼️ ${isEn ? 'Original Poster' : 'Poster Asli'}
            </button>
          </div>
        </div>

        <!-- Banner Hari Ini (Jika Hari Sekolah Aktif) -->
        <div style="margin-top:20px; padding:12px 18px; border-radius:14px; background:rgba(91, 224, 223, 0.12); border:1px solid var(--teal); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:22px;">⏰</span>
            <div>
              <strong style="font-size:13.5px; color:var(--ink);">
                ${todayData.isWeekend ? `Akhir Pekan (${todayData.weekendName}) — Waktunya Istirahat!` : `Hari Ini: ${todayData.name}, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`}
              </strong>
              <div style="font-size:12px; color:var(--muted);">
                ${todayData.isWeekend ? 'Persiapan materi seru untuk hari Senin esok!' : 'Jam Pembelajaran: 07.30 – 12.30 WITA'}
              </div>
            </div>
          </div>
          ${!todayData.isWeekend ? `
            <button class="btn secondary" id="btnJumpToToday" type="button" style="padding:6px 14px; font-size:12px; font-weight:800;">
              Lihat Hari Ini ➔
            </button>
          ` : ''}
        </div>
      </section>

      <!-- 2. Tab Navigasi Hari & Pilihan Tampilan -->
      <nav class="schedule-tabs-nav" aria-label="Pilihan Hari Jadwal" style="margin-bottom:24px; display:flex; gap:8px; flex-wrap:wrap;">
        <button class="schedule-tab-btn ${this.activeTab === 'today' ? 'active' : ''}" data-tab="today" type="button">
          🌟 ${isEn ? 'Today' : 'Hari Ini'}
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'senin' ? 'active' : ''}" data-tab="senin" type="button">
          🟢 Senin
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'selasa' ? 'active' : ''}" data-tab="selasa" type="button">
          🟣 Selasa
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'rabu' ? 'active' : ''}" data-tab="rabu" type="button">
          🔵 Rabu
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'kamis' ? 'active' : ''}" data-tab="kamis" type="button">
          🔴 Kamis
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'jumat' ? 'active' : ''}" data-tab="jumat" type="button">
          🟢 Jumat
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'table' ? 'active' : ''}" data-tab="table" type="button" style="margin-left:auto;">
          📊 ${isEn ? 'Full Table (5 Days)' : 'Tabel Lengkap (5 Hari)'}
        </button>
        <button class="schedule-tab-btn ${this.activeTab === 'poster' ? 'active' : ''}" data-tab="poster" type="button">
          🖼️ ${isEn ? 'Poster View' : 'Poster Asli'}
        </button>
      </nav>

      <!-- 3. Area Konten Berdasarkan Tab Aktif -->
      <div id="scheduleTabContent">
        ${this.activeTab === 'table'
          ? this.renderFullTableView(isEn)
          : (this.activeTab === 'poster'
            ? this.renderPosterView(isEn)
            : this.renderDayTimeline(activeDayKey, isEn))}
      </div>

      <!-- 4. Dialog Modal Poster Layar Penuh -->
      <div class="schedule-poster-modal" id="schedulePosterModal" style="display:none;" aria-modal="true" role="dialog" aria-label="Poster Jadwal Pelajaran Kelas 1B">
        <div class="schedule-poster-backdrop" id="posterBackdrop"></div>
        <div class="schedule-poster-dialog">
          <div class="schedule-poster-header">
            <div style="font-weight:800; font-size:15px; color:#ffffff;">
              🗓️ Poster Resmi Jadwal Pelajaran Kelas 1B (2026/2027)
            </div>
            <button class="iconbtn" id="btnClosePosterModal" type="button" aria-label="Tutup Poster" style="color:#ffffff;">✕</button>
          </div>
          <div class="schedule-poster-body">
            <img src="${SCHEDULE_DATA.posterImage}" alt="Poster Resmi Jadwal Pelajaran Kelas 1B Tahun Pelajaran 2026/2027" style="width:100%; height:auto; border-radius:12px; display:block;" loading="lazy">
          </div>
          <div class="schedule-poster-footer" style="padding:14px; display:flex; justify-content:space-between; align-items:center; background:var(--navy-deep); border-top:1px solid rgba(255,255,255,0.12);">
            <div style="font-size:12px; color:rgba(255,255,255,0.75);">
              SD Kelas 1B · Tema Ornamen Khas Bali Ceria
            </div>
            <a href="${SCHEDULE_DATA.posterImage}" download="Jadwal_Pelajaran_Kelas_1B_2026_2027.jpg" class="btn primary" style="font-size:12px; padding:6px 14px;">
              ⬇️ Unduh Gambar HD
            </a>
          </div>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  /**
   * Render Tampilan Timeline Harian (Grouped Subject Blocks + Rincian Jam)
   */
  renderDayTimeline(dayKey, isEn) {
    const day = SCHEDULE_DATA.days[dayKey];
    if (!day) return '';

    const groupedBlocks = getGroupedDailySchedule(dayKey);

    return `
      <div class="schedule-day-container">
        <!-- Header Hari Terpilih -->
        <div class="schedule-day-header" style="background:${day.badgeBg}; border:1.5px solid ${day.badgeColor}; border-radius:18px; padding:18px 22px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:${day.badgeColor};"></span>
              <h2 style="margin:0; font-size:22px; font-weight:850; color:var(--ink);">
                Hari ${day.name} ${isEn ? `(${day.nameEn})` : ''}
              </h2>
            </div>
            <p style="margin:4px 0 0; font-size:13.5px; color:var(--muted);">
              ${day.tagline}
            </p>
          </div>
          <div style="font-size:12px; font-weight:800; color:var(--ink); background:var(--card); border:1px solid var(--line); border-radius:999px; padding:6px 14px;">
            ⏰ 07.30 – 12.30 WITA
          </div>
        </div>

        <!-- Alur Blok Pelajaran (Timeline Cards) -->
        <div class="schedule-blocks-grid" style="display:flex; flex-direction:column; gap:14px;">
          ${groupedBlocks.map((block, idx) => {
            if (block.isBreak) {
              return `
                <div class="schedule-break-card" style="background:linear-gradient(135deg, rgba(255, 178, 27, 0.14), rgba(255, 196, 77, 0.08)); border:1.5px dashed #ffb21b; border-radius:16px; padding:14px 20px; display:flex; align-items:center; gap:14px;">
                  <span style="font-size:28px;">🌼</span>
                  <div style="flex:1;">
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                      <strong style="font-size:15px; color:var(--ink);">${block.name}</strong>
                      <span style="font-size:11.5px; font-weight:800; background:#ffb21b; color:#0e2e48; padding:2px 8px; border-radius:999px;">
                        ${block.time} (15 Menit)
                      </span>
                    </div>
                    <p style="margin:3px 0 0; font-size:12.5px; color:var(--muted);">
                      ${block.note}
                    </p>
                  </div>
                </div>
              `;
            }

            if (block.type === 'free') {
              return `
                <div class="schedule-free-card" style="background:var(--card); border:1px solid var(--line); border-radius:16px; padding:14px 20px; display:flex; align-items:center; gap:14px;">
                  <span style="font-size:24px;">🎉</span>
                  <div>
                    <strong style="font-size:14px; color:var(--ink);">${block.name}</strong>
                    <div style="font-size:12px; color:var(--muted);">${block.note}</div>
                  </div>
                </div>
              `;
            }

            // Blok Mata Pelajaran
            return `
              <div class="schedule-subject-card" style="background:var(--card); border:1.5px solid var(--line); border-radius:18px; padding:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; box-shadow:var(--shadow-soft); transition:border-color 0.2s ease, transform 0.2s ease;">
                <div style="display:flex; align-items:center; gap:16px; min-width:240px; flex:1;">
                  <div style="width:54px; height:54px; border-radius:14px; background:var(--teal-soft); color:var(--teal-soft-ink); font-size:26px; display:grid; place-items:center; flex-shrink:0;">
                    ${block.icon}
                  </div>
                  <div>
                    <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:4px;">
                      <span style="font-size:11px; font-weight:800; background:var(--navy); color:#ffffff; padding:2px 8px; border-radius:6px;">
                        Jam ke-${block.periodStart}${block.periodEnd > block.periodStart ? `–${block.periodEnd}` : ''}
                      </span>
                      <span style="font-size:12px; font-weight:800; color:var(--muted);">
                        ⏰ ${block.timeStart} – ${block.timeEnd}
                      </span>
                      <span style="font-size:11px; font-weight:800; background:var(--teal-soft); color:var(--teal-soft-ink); padding:2px 7px; border-radius:6px;">
                        ${block.periodCount} Jam Pelajaran
                      </span>
                    </div>
                    <h3 style="margin:0 0 4px; font-size:17.5px; font-weight:850; color:var(--ink);">
                      ${isEn && block.nameEn ? block.nameEn : block.name}
                    </h3>
                    <p style="margin:0; font-size:12.5px; color:var(--muted); line-height:1.5;">
                      💡 ${block.tip}
                    </p>
                  </div>
                </div>

                <!-- Tombol Langsung Belajar -->
                <button class="btn primary btn-launch-subject" data-subject-id="${block.subjectId}" type="button" style="flex-shrink:0; font-size:13px; padding:10px 18px;">
                  Buka Pelajaran ➔
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Tabel Rincian Slot 1 s/d 10 (Accordion / Runtun) -->
        <details class="schedule-period-details" style="margin-top:28px; background:var(--surface); border:1px solid var(--line); border-radius:16px; padding:14px 18px;">
          <summary style="cursor:pointer; font-weight:800; font-size:13.5px; color:var(--ink); display:flex; align-items:center; gap:8px;">
            <span>⏱️</span> Lihat Rincian Jam Pelajaran ke-1 s/d ke-10 (Tabel Detail Hari ${day.name})
          </summary>
          <div style="margin-top:14px; overflow-x:auto;">
            <table style="width:100%; border-collapse:collapse; font-size:12.5px; text-align:left;">
              <thead>
                <tr style="border-bottom:2px solid var(--line); color:var(--muted);">
                  <th style="padding:8px 10px;">Jam Ke</th>
                  <th style="padding:8px 10px;">Waktu</th>
                  <th style="padding:8px 10px;">Mata Pelajaran</th>
                  <th style="padding:8px 10px;">Keterangan & Tips Belajar</th>
                  <th style="padding:8px 10px; text-align:right;">Aksi</th>
                </tr>
              </thead>
              <tbody>
                ${day.schedule.map(item => `
                  <tr style="border-bottom:1px solid var(--line); ${item.isBreak ? 'background:rgba(255,178,27,0.08);' : ''}">
                    <td style="padding:10px; font-weight:800;">
                      ${item.isBreak ? '🌼' : item.period}
                    </td>
                    <td style="padding:10px; white-space:nowrap; font-weight:600; color:var(--muted);">
                      ${item.time}
                    </td>
                    <td style="padding:10px; font-weight:800; color:var(--ink);">
                      ${item.isBreak ? `<span style="color:#b45309;">${item.name}</span>` : `${item.icon || '📚'} ${item.name}`}
                    </td>
                    <td style="padding:10px; color:var(--muted);">
                      ${item.note || item.tip || '-'}
                    </td>
                    <td style="padding:10px; text-align:right;">
                      ${item.subjectId ? `
                        <button class="btn secondary btn-launch-subject" data-subject-id="${item.subjectId}" type="button" style="padding:4px 10px; font-size:11px; min-height:30px;">
                          Buka ➔
                        </button>
                      ` : '-'}
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    `;
  }

  /**
   * Render Tampilan Tabel Lengkap 5 Hari (Grid 10 Baris x 5 Kolom Sesuai Poster)
   */
  renderFullTableView(isEn) {
    const periods = SCHEDULE_DATA.periods;
    const days = ['senin', 'selasa', 'rabu', 'kamis', 'jumat'];

    return `
      <div class="schedule-table-wrap" style="background:var(--card); border:1.5px solid var(--line); border-radius:20px; padding:22px; box-shadow:var(--shadow); overflow-x:auto;">
        <div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <h3 style="margin:0; font-size:18px; font-weight:850; color:var(--ink);">
              📊 Tabel Matriks Jadwal Pelajaran Kelas 1B (Senin – Jumat)
            </h3>
            <p style="margin:4px 0 0; font-size:12.5px; color:var(--muted);">
              Format matriks utuh sesuai poster resmi kelas 1B. Klik tombol mata pelajaran untuk langsung belajar!
            </p>
          </div>
          <div style="font-size:11.5px; color:var(--muted); font-weight:700;">
            1 Jam Pelajaran = 35 Menit · Istirahat = 15 Menit
          </div>
        </div>

        <table class="schedule-matrix-table" style="width:100%; border-collapse:collapse; min-width:760px; font-size:12.5px;">
          <thead>
            <tr style="color:#ffffff; text-align:center; font-weight:850;">
              <th style="background:#e11d48; padding:12px 8px; border:1px solid rgba(255,255,255,0.2); border-radius:8px 0 0 0; width:55px;">No.</th>
              <th style="background:#ea580c; padding:12px 10px; border:1px solid rgba(255,255,255,0.2); width:110px;">WAKTU</th>
              <th style="background:#16a34a; padding:12px 10px; border:1px solid rgba(255,255,255,0.2);">SENIN</th>
              <th style="background:#6366f1; padding:12px 10px; border:1px solid rgba(255,255,255,0.2);">SELASA</th>
              <th style="background:#0284c7; padding:12px 10px; border:1px solid rgba(255,255,255,0.2);">RABU</th>
              <th style="background:#db2777; padding:12px 10px; border:1px solid rgba(255,255,255,0.2);">KAMIS</th>
              <th style="background:#059669; padding:12px 10px; border:1px solid rgba(255,255,255,0.2); border-radius:0 8px 0 0;">JUMAT</th>
            </tr>
          </thead>
          <tbody>
            ${periods.map(period => {
              if (period.isBreak) {
                return `
                  <tr style="background:#fef3c7; color:#78350f; font-weight:850; text-align:center;">
                    <td style="padding:10px 8px; border:1px solid var(--line); font-size:13px; font-weight:900; background:#fde68a;">${period.no}.</td>
                    <td style="padding:10px; border:1px solid var(--line); font-size:11.5px; white-space:nowrap; background:#fde68a;">${period.time}</td>
                    <td colspan="5" style="padding:10px; border:1px solid var(--line); letter-spacing:1px; font-size:13.5px;">
                      🌼 ISTIRAHAT 🌼
                    </td>
                  </tr>
                `;
              }

              return `
                <tr style="border-bottom:1px solid var(--line); text-align:center;">
                  <td style="padding:10px 8px; border:1px solid var(--line); font-weight:850; color:var(--ink); background:var(--surface);">
                    <span style="display:inline-block; width:24px; height:24px; line-height:24px; border-radius:50%; background:${this.getPeriodColor(period.no)}; color:#fff; font-size:11px;">
                      ${period.no}
                    </span>
                  </td>
                  <td style="padding:10px; border:1px solid var(--line); font-weight:700; color:var(--muted); font-size:11.5px; white-space:nowrap;">
                    ${period.time}
                  </td>
                  ${days.map(dKey => {
                    const cell = SCHEDULE_DATA.days[dKey].schedule.find(s => s.period === period.no);
                    if (!cell || cell.isFree || cell.name === '-') {
                      return `<td style="padding:8px; border:1px solid var(--line); color:var(--muted); font-size:11px; background:rgba(0,0,0,0.02);">-</td>`;
                    }
                    return `
                      <td style="padding:8px 6px; border:1px solid var(--line);">
                        <button class="schedule-table-cell-btn btn-launch-subject" data-subject-id="${cell.subjectId}" type="button" title="Pelajari materi ${cell.name}" style="width:100%; border:none; background:transparent; cursor:pointer; padding:4px; border-radius:8px; transition:background 0.15s ease;">
                          <div style="font-size:14px; margin-bottom:2px;">${cell.icon || '📚'}</div>
                          <strong style="display:block; font-size:11.5px; color:var(--ink); line-height:1.3;">
                            ${cell.name}
                          </strong>
                        </button>
                      </td>
                    `;
                  }).join('')}
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /**
   * Render Tab Poster Asli
   */
  renderPosterView(isEn) {
    return `
      <div style="background:var(--card); border:1.5px solid var(--line); border-radius:20px; padding:22px; box-shadow:var(--shadow); text-align:center;">
        <div style="margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div style="text-align:left;">
            <h3 style="margin:0; font-size:18px; font-weight:850; color:var(--ink);">
              🖼️ Poster Jadwal Pelajaran Kelas 1B (2026/2027)
            </h3>
            <p style="margin:4px 0 0; font-size:13px; color:var(--muted);">
              Tampilan karya visual resmi dengan ornamen pura dan bunga Jepun khas Bali.
            </p>
          </div>
          <a href="${SCHEDULE_DATA.posterImage}" download="Jadwal_Pelajaran_Kelas_1B_2026_2027.jpg" class="btn primary" style="font-size:12.5px;">
            ⬇️ Unduh Gambar Asli (HD)
          </a>
        </div>

        <div style="max-width:960px; margin:0 auto; border-radius:16px; overflow:hidden; box-shadow:0 12px 35px rgba(0,0,0,0.15); border:1px solid var(--line);">
          <img src="${SCHEDULE_DATA.posterImage}" alt="Jadwal Pelajaran Kelas 1B Tahun Pelajaran 2026/2027" style="width:100%; height:auto; display:block;" loading="eager">
        </div>
      </div>
    `;
  }

  getPeriodColor(periodNo) {
    const colors = [
      '#e11d48', // 1: Merah
      '#ea580c', // 2: Oranye
      '#16a34a', // 3: Hijau
      '#f59e0b', // 4: Istirahat
      '#0284c7', // 5: Sky
      '#6366f1', // 6: Indigo
      '#10b981', // 7: Emerald
      '#f59e0b', // 8: Istirahat
      '#db2777', // 9: Pink
      '#8b5cf6'  // 10: Ungu
    ];
    return colors[periodNo - 1] || '#0e2e48';
  }

  attachEvents() {
    // Navigasi Tab Hari & Tampilan
    const tabBtns = this.container.querySelectorAll('.schedule-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        this.activeTab = tab;
        this.render();
      });
    });

    // Tombol Cetak Jadwal
    const printBtn = this.container.querySelector('#btnPrintSchedule');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Modal Poster Asli
    const viewPosterBtn = this.container.querySelector('#btnViewOriginalPoster');
    const posterModal = this.container.querySelector('#schedulePosterModal');
    const closePosterBtn = this.container.querySelector('#btnClosePosterModal');
    const posterBackdrop = this.container.querySelector('#posterBackdrop');

    if (viewPosterBtn && posterModal) {
      viewPosterBtn.addEventListener('click', () => {
        posterModal.style.display = 'grid';
      });
    }

    if (closePosterBtn && posterModal) {
      closePosterBtn.addEventListener('click', () => {
        posterModal.style.display = 'none';
      });
    }

    if (posterBackdrop && posterModal) {
      posterBackdrop.addEventListener('click', () => {
        posterModal.style.display = 'none';
      });
    }

    // Tombol Lompat ke Hari Ini
    const jumpBtn = this.container.querySelector('#btnJumpToToday');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        this.activeTab = 'today';
        this.render();
      });
    }

    // Tombol Langsung Masuk ke Mata Pelajaran
    const launchBtns = this.container.querySelectorAll('.btn-launch-subject');
    launchBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const subjectId = e.currentTarget.dataset.subjectId;
        if (subjectId) {
          appState.navigate('subject', subjectId);
        }
      });
    });
  }
}
