// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · LKS (Lembar Kerja Siswa / LKPD) Printable PDF Component
// Development · Anabhi Dev
// Version   : 1.0 (A4 Print-Ready, Full Workbook & Topic Worksheets)
// ================================================================

import { SUBJECTS, getSubjectName } from '../data/subjects.js';
import { BAHASA_INDONESIA_DATA } from '../data/bahasa-indonesia.js';
import { ENGLISH_DATA } from '../data/bahasa-inggris.js';
import { PANCASILA_DATA } from '../data/pancasila.js';
import { BAHASA_BALI_DATA } from '../data/bahasa-bali.js';
import { SENI_RUPA_DATA } from '../data/seni-rupa.js';
import { PJOK_DATA } from '../data/pjok.js';
import { AGAMA_DATA } from '../data/agama.js';
import { KOKURIKULER_DATA } from '../data/kokurikuler.js';
import { GEO_DATA } from '../data/geo-data.js';
import { MATH_DATA } from '../data/math-data.js';
import { REAL_INDONESIA_PATHS, REAL_BALI_PATHS } from '../data/map-vector-data.js';
import { SOURCE_BOOKS_REGISTRY, CURRICULUM_LEGAL_DISCLAIMER } from '../data/source-registry.js';
import { appState } from '../state.js';

export class LksModalComponent {
  constructor() {
    this.modalEl = null;
    this.fontSizeMode = 'normal'; // 'normal' | 'large'
    this.initModal();
  }

  initModal() {
    let el = document.getElementById('lksModal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'lksModal';
      el.className = 'video-modal-overlay lks-modal-overlay';
      el.style.display = 'none';
      document.body.appendChild(el);
    }
    this.modalEl = el;
    this.attachOverlayClose();
  }

  attachOverlayClose() {
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalEl.style.display === 'flex') {
        this.close();
      }
    });
  }

  close() {
    this.modalEl.style.display = 'none';
    document.body.style.overflow = '';
  }

  getSubjectData(subjectId) {
    if (subjectId === 'bahasa-indonesia') return BAHASA_INDONESIA_DATA;
    if (subjectId === 'bahasa-inggris') return ENGLISH_DATA;
    if (subjectId === 'pancasila') return PANCASILA_DATA;
    if (subjectId === 'bahasa-bali') return BAHASA_BALI_DATA;
    if (subjectId === 'seni-rupa') return SENI_RUPA_DATA;
    if (subjectId === 'pjok') return PJOK_DATA;
    if (subjectId === 'agama') return AGAMA_DATA;
    if (subjectId === 'kokurikuler') return KOKURIKULER_DATA;
    if (subjectId === 'geografi') return GEO_DATA;
    if (subjectId === 'matematika') return MATH_DATA;
    return null;
  }

  // Buka LKS untuk 1 topik spesifik
  openTopic(subjectId, topicIndex = 0) {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const meta = SUBJECTS.find(s => s.id === subjectId) || { name: subjectId, icon: '📚' };
    const subjectData = this.getSubjectData(subjectId);
    if (!subjectData || !subjectData.topics || !subjectData.topics[topicIndex]) return;

    const topic = subjectData.topics[topicIndex];
    const htmlContent = this.generateSingleTopicLksHtml(subjectId, meta, topic, topicIndex, isEn);

    this.renderModal(htmlContent, `${meta.icon} LKPD ${getSubjectName(meta, lang)} - Topik ${topicIndex + 1}`);
  }

  // Buka LKS untuk seluruh topik dalam 1 mapel (Workbook Lengkap)
  openFullSubject(subjectId) {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const meta = SUBJECTS.find(s => s.id === subjectId) || { name: subjectId, icon: '📚' };
    const subjectData = this.getSubjectData(subjectId);
    if (!subjectData || !subjectData.topics) return;

    const sheetsHtml = subjectData.topics.map((topic, idx) => {
      return this.generateSingleTopicLksHtml(subjectId, meta, topic, idx, isEn, true);
    }).join('<div class="lks-page-break"></div>');

    this.renderModal(sheetsHtml, `📑 BUKU KERJA LKPD LENGKAP: ${getSubjectName(meta, lang)} (10 Topik)`);
  }

  // Buka LKS Mewarnai Peta Geografi (Indonesia / Bali)
  openGeographyMapLks(mapType = 'indonesia') {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    let htmlContent = '';
    let title = '';

    if (mapType === 'indonesia') {
      title = 'Peta Mewarnai & Mengenal 34 Provinsi Indonesia';
      htmlContent = this.generateIndonesiaMapLksHtml(isEn);
    } else {
      title = 'Peta Mewarnai & Mengenal Kabupaten Pulau Bali';
      htmlContent = this.generateBaliMapLksHtml(isEn);
    }

    this.renderModal(htmlContent, `🗺️ ${title}`);
  }

  // Buka LKS Matematika Kelas 1 SD (Kotak 10 & Garis Bilangan)
  openMathLks() {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const htmlContent = this.generateMathLksHtml(isEn);
    this.renderModal(htmlContent, '🧮 LKPD Matematika Ceria: Kotak 10 Frame & Garis Bilangan');
  }

  // Buka Dialog Register 12 Buku Sumber & Penyelarasan Kurikulum Merdeka
  openSourceRegistry() {
    const lang = appState.get().lang || 'id';
    const isEn = lang === 'en';
    const disclaimer = isEn ? CURRICULUM_LEGAL_DISCLAIMER.en : CURRICULUM_LEGAL_DISCLAIMER.id;

    const htmlContent = `
      <div style="padding:16px 20px;">
        <div style="background:var(--teal-soft); border:1px solid var(--teal); border-radius:12px; padding:16px; margin-bottom:20px;">
          <strong style="color:var(--teal-soft-ink); font-size:14px; display:flex; align-items:center; gap:8px;">
            <span>ℹ️</span> ${isEn ? 'Curriculum Alignment & Legal Attribution Statement' : 'Pernyataan Penyelarasan Kurikulum & Hak Cipta'}
          </strong>
          <p style="margin:8px 0 0; font-size:13px; color:var(--ink); line-height:1.6;">
            "${disclaimer}"
          </p>
        </div>

        <h3 style="font-size:17px; font-weight:800; margin:0 0 14px; color:var(--ink);">
          ${isEn ? '12 Class 1 Semester 1 Reference Books (SRC-01 to SRC-12)' : '12 Buku Modul Pendamping Belajar Siswa (SRC-01 s/d SRC-12)'}
        </h3>

        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:16px;">
          ${SOURCE_BOOKS_REGISTRY.map(src => `
            <div class="quiz-box" style="margin-bottom:0; background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px; display:flex; flex-direction:column; justify-content:space-between;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span class="no" style="background:var(--navy); color:#fff; font-size:11px; font-weight:800; border-radius:6px; padding:2px 6px;">
                    ${src.id}
                  </span>
                  <span class="subject-badge" style="font-size:10.5px;">
                    ${src.publisher}
                  </span>
                </div>
                <div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:10px;">
                  ${src.photoCover ? `
                    <img src="assets/img/covers/${src.photoCover}" alt="${src.title}" width="52" height="74" loading="lazy" decoding="async" style="width:52px; height:74px; object-fit:cover; border-radius:6px; box-shadow:0 3px 8px rgba(0,0,0,0.18); border:1px solid var(--border); flex-shrink:0;">
                  ` : `
                    <div style="width:52px; height:74px; background:var(--surface); border-radius:6px; display:grid; place-items:center; font-size:22px; border:1px solid var(--border); flex-shrink:0;">📚</div>
                  `}
                  <div style="flex:1; min-width:0;">
                    <h4 style="margin:0 0 4px; font-size:14px; font-weight:800; color:var(--ink); line-height:1.35;">${src.title}</h4>
                    <div style="font-size:11.5px; color:var(--muted);">
                      <span>Kelas ${src.grade} · Sem ${src.semester}</span> · <span style="font-weight:600;">${src.series}</span>
                    </div>
                  </div>
                </div>
                <p style="font-size:12px; color:var(--ink); line-height:1.5; margin:0; background:var(--paper); padding:8px 10px; border-radius:8px;">
                  <strong>Cakupan:</strong> ${src.scope}
                </p>
              </div>
              <div style="margin-top:12px; font-size:11px; color:var(--teal); font-weight:700;">
                ✓ Terintegrasi dalam Materi Pembelajaran
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    this.renderModal(htmlContent, isEn ? '📚 Class 1 Semester 1 Reference Curriculum Registry' : '📚 Register Buku Sumber & Kurikulum Merdeka Kelas 1');
  }

  renderModal(contentHtml, titleText) {
    this.modalEl.innerHTML = `
      <div class="lks-modal-dialog" role="dialog" aria-modal="true">
        <!-- Sticky Action Header Toolbar -->
        <div class="lks-modal-toolbar">
          <div class="lks-toolbar-left">
            <span class="lks-toolbar-icon">📄</span>
            <div>
              <strong class="lks-toolbar-title">${titleText}</strong>
              <div class="lks-toolbar-sub">Standar Kurikulum Merdeka Fase A · Kelas 1 SD · Siap Cetak A4</div>
            </div>
          </div>
          <div class="lks-toolbar-actions">
            <button class="btn btn-lks-size" id="btnLksToggleSize" type="button" title="Ganti ukuran teks">
              🔤 ${this.fontSizeMode === 'large' ? 'Teks Normal' : 'Teks Besar'}
            </button>
            <button class="btn primary btn-lks-print" id="btnLksPrint" type="button">
              🖨️ Cetak / Simpan PDF
            </button>
            <button class="iconbtn btn-lks-close" id="btnLksClose" type="button" aria-label="Tutup">
              ✕
            </button>
          </div>
        </div>

        <!-- Scrollable Printable Paper Container -->
        <div class="lks-modal-body" id="lksModalBody">
          <div class="lks-sheet-container ${this.fontSizeMode === 'large' ? 'font-large' : ''}">
            ${contentHtml}
          </div>
        </div>
      </div>
    `;

    this.modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Event Handlers
    const closeBtn = this.modalEl.querySelector('#btnLksClose');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const printBtn = this.modalEl.querySelector('#btnLksPrint');
    if (printBtn) {
      printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    const sizeBtn = this.modalEl.querySelector('#btnLksToggleSize');
    if (sizeBtn) {
      sizeBtn.addEventListener('click', () => {
        this.fontSizeMode = (this.fontSizeMode === 'normal') ? 'large' : 'normal';
        const container = this.modalEl.querySelector('.lks-sheet-container');
        if (container) {
          container.classList.toggle('font-large', this.fontSizeMode === 'large');
        }
        sizeBtn.innerHTML = `🔤 ${this.fontSizeMode === 'large' ? 'Teks Normal' : 'Teks Besar'}`;
      });
    }
  }

  // Template HTML Resmi 1 Topik LKPD
  generateSingleTopicLksHtml(subjectId, meta, topic, topicIndex, isEn, isWorkbook = false) {
    const subjectTitle = (isEn && meta.nameEn) ? meta.nameEn : meta.name;
    const topTitle = (isEn && topic.titleEn) ? topic.titleEn : topic.title;
    const topDesc = (isEn && topic.descEn) ? topic.descEn : topic.desc;
    const checklist = (isEn && topic.checklistEn) ? topic.checklistEn : topic.checklist;
    // Pengecualian bahasa-inggris
    const activities = (isEn && topic.activitiesEn) ? topic.activitiesEn : topic.activities;

    return `
      <div class="lks-paper-sheet">
        <!-- KOP RESMI LEMBAR KERJA PESERTA DIDIK -->
        <div class="lks-kop">
          <div class="lks-kop-logo">
            <span style="font-size:38px;">🎓</span>
          </div>
          <div class="lks-kop-center">
            <h2 class="lks-kop-instansi">SEKOLAH DASAR (SD) · KURIKULUM MERDEKA</h2>
            <h1 class="lks-kop-title">LEMBAR KERJA PESERTA DIDIK (LKPD)</h1>
            <div class="lks-kop-sub">Media Belajar Ceria Anabhi Dev Smart Study — Fase A (Kelas 1 SD)</div>
          </div>
          <div class="lks-kop-logo">
            <span style="font-size:38px;">🇮🇩</span>
          </div>
        </div>
        <div class="lks-kop-divider"></div>

        <!-- TABEL IDENTITAS PESERTA DIDIK -->
        <table class="lks-identity-table">
          <tr>
            <td style="width:16%;"><strong>Nama Siswa</strong></td>
            <td style="width:40%;">: ................................................................</td>
            <td style="width:18%;"><strong>Hari / Tanggal</strong></td>
            <td style="width:26%;">: ....................................</td>
          </tr>
          <tr>
            <td><strong>Kelas / Fase</strong></td>
            <td>: 1 (Satu) SD / Fase A</td>
            <td><strong>Mata Pelajaran</strong></td>
            <td>: ${meta.icon} ${subjectTitle}</td>
          </tr>
          <tr>
            <td><strong>Topik / Materi</strong></td>
            <td colspan="3">: <strong>Topik ${topicIndex + 1}: ${topTitle}</strong></td>
          </tr>
          <tr>
            <td><strong>Capaian</strong></td>
            <td>: Mandiri, Bernalar Kritis, & Berbudi Pekerti</td>
            <td><strong>Nilai & Paraf</strong></td>
            <td>: ⭐⭐⭐⭐⭐ &nbsp; [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</td>
          </tr>
        </table>

        <!-- BAGIAN A: RANGKUMAN MATERI CERIA -->
        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN A · PANDUAN & RANGKUMAN KONSEP</div>
          <p class="lks-summary-text">
            ${topDesc}
          </p>
          ${topic.keyPoints && topic.keyPoints.length > 0 ? `
            <div style="margin-top:10px; background:#f0fdf4; border-left:3px solid #16a34a; padding:8px 12px; border-radius:4px; font-size:12px; color:#14532d;">
              <strong>📌 ${isEn ? 'Key Concepts to Remember:' : 'Poin Kunci yang Harus Diingat:'}</strong>
              <ul style="margin:4px 0 0; padding-left:18px;">
                ${topic.keyPoints.map(kp => `<li>${kp}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          ${topic.funFact ? `
            <div style="margin-top:8px; background:#eff6ff; border-left:3px solid #2563eb; padding:8px 12px; border-radius:4px; font-size:12px; color:#1e3a8a;">
              <strong>💡 ${isEn ? 'Did You Know?' : 'Tahukah Kamu?'}</strong> ${topic.funFact}
            </div>
          ` : ''}
        </div>

        <!-- BAGIAN B: LEMBAR MISI MANDIRI (CHECKLIST & TULIS PENSIL) -->
        ${checklist && checklist.length > 0 ? `
          <div class="lks-section">
            <div class="lks-section-badge">BAGIAN B · MISI MANDIRI SISWA (LKS)</div>
            <div class="lks-instruction">
              <em>Petunjuk: Bacalah setiap misi dengan teliti. Beri tanda centang (✔) pada kotak jika telah selesai, lalu tuliskan pengalamanmu di garis titik-titik!</em>
            </div>
            <div class="lks-checklist-group">
              ${checklist.map((item, idx) => `
                <div class="lks-checklist-item">
                  <div class="lks-checkbox-box">[ &nbsp; ]</div>
                  <div class="lks-checklist-content">
                    <strong>Misi ${idx + 1}:</strong> ${item}
                    <div class="lks-writing-lines">
                      <div class="lks-line">........................................................................................................................................................</div>
                      <div class="lks-line">........................................................................................................................................................</div>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- BAGIAN C: LEMBAR TANTANGAN KUIS & EVALUASI CERIA -->
        ${activities && activities.length > 0 ? `
          <div class="lks-section">
            <div class="lks-section-badge">BAGIAN C · TANTANGAN CERIA & LATIHAN PEMAHAMAN</div>
            <div class="lks-instruction">
              <em>Petunjuk: Pilihlah jawaban yang paling benar dengan memberi tanda silang (X) pada huruf pilihan, atau tulislah jawabanmu dengan rapi!</em>
            </div>
            <div class="lks-quiz-group">
              ${activities.map((act, qIdx) => `
                <div class="lks-quiz-item">
                  <div class="lks-quiz-question">
                    <strong>${qIdx + 1}.</strong> ${act.q}
                  </div>
                  <div class="lks-quiz-options">
                    ${act.options ? act.options.map((opt, optIdx) => {
                      const letter = ['A', 'B', 'C', 'D'][optIdx] || '-';
                      return `
                        <div class="lks-option-row">
                          <span class="lks-opt-circle">( ${letter} )</span>
                          <span class="lks-opt-text">${opt}</span>
                        </div>
                      `;
                    }).join('') : ''}
                  </div>
                  <div class="lks-answer-box">
                    <span>Jawaban Siswa: [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ]</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- BAGIAN D: RUANG GAMBAR / KREASI MANDIRI SISWA -->
        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN D · RUANG KREASI, MENGGAMBAR, & MEWARNAI</div>
          <div class="lks-instruction">
            <em>Petunjuk: Gambarlah objek, benda, hewan, atau kegiatan yang berhubungan dengan materi ini, lalu beri warna yang indah!</em>
          </div>
          <div class="lks-drawing-canvas-box">
            <span class="lks-drawing-hint">✏️ Ruang Gambar & Coretan Pensil Warna Ceria</span>
          </div>
        </div>

        <!-- BAGIAN E: PARAF DAN APRESIASI ORANG TUA / GURU -->
        <div class="lks-footer-sign-table">
          <div class="lks-sign-box">
            <div>Mengetahui,</div>
            <div class="lks-sign-role">Orang Tua / Wali Siswa</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
          <div class="lks-sign-center">
            <div class="lks-motto-box">
              🌟 "Pintar, Berani, Jujur, dan Gembira Belajar!"
            </div>
          </div>
          <div class="lks-sign-box">
            <div>Diverifikasi oleh,</div>
            <div class="lks-sign-role">Guru Kelas 1 SD</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
        </div>
      </div>
    `;
  }

  // Template LKS Mewarnai Peta Indonesia
  generateIndonesiaMapLksHtml(isEn) {
    return `
      <div class="lks-paper-sheet">
        <div class="lks-kop">
          <div class="lks-kop-logo"><span style="font-size:38px;">🗺️</span></div>
          <div class="lks-kop-center">
            <h2 class="lks-kop-instansi">SEKOLAH DASAR · MODUL GEOGRAFI NUSANTARA</h2>
            <h1 class="lks-kop-title">LEMBAR KERJA: MENGENAL & MEWARNAI PETA INDONESIA</h1>
            <div class="lks-kop-sub">Pendidikan Geografi & Wawasan Kebangsaan — Fase A (Kelas 1 SD)</div>
          </div>
          <div class="lks-kop-logo"><span style="font-size:38px;">🇮🇩</span></div>
        </div>
        <div class="lks-kop-divider"></div>

        <table class="lks-identity-table">
          <tr>
            <td style="width:16%;"><strong>Nama Siswa</strong></td>
            <td style="width:40%;">: ................................................................</td>
            <td style="width:18%;"><strong>Hari / Tanggal</strong></td>
            <td style="width:26%;">: ....................................</td>
          </tr>
          <tr>
            <td><strong>Kelas / Fase</strong></td>
            <td>: 1 (Satu) SD / Fase A</td>
            <td><strong>Materi</strong></td>
            <td>: 5 Pulau Besar & Garis Khatulistiwa</td>
          </tr>
        </table>

        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN A · PETA VEKTOR RESMI INDONESIA (34 PROVINSI)</div>
          <div class="lks-instruction">
            <em>Petunjuk: Warnai 5 pulau besar dengan warna krayon yang berbeda: Sumatera (Hijau), Jawa (Kuning), Kalimantan (Oranye), Sulawesi (Merah Muda), Papua (Biru). Tebalkan Garis Khatulistiwa dengan pensil warna merah!</em>
          </div>
          
          <div class="lks-map-outline-container">
            <svg class="svg-map-frame" viewBox="0 0 700 234" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #1e293b; border-radius:8px;">
              <!-- Garis Khatulistiwa tebal untuk ditiru siswa -->
              <line x1="0" y1="82" x2="700" y2="82" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="6,4"/>
              <text x="350" y="76" font-size="10" font-weight="800" fill="#b91c1c" text-anchor="middle">--- GARIS KHATULISTIWA (EKUATOR 0°) ---</text>

              <!-- Mawar Kompas Utara -->
              <g transform="translate(660, 40)">
                <circle cx="0" cy="0" r="14" fill="#f8fafc" stroke="#334155" stroke-width="1.2"/>
                <polygon points="0,-12 3,0 -3,0" fill="#0f172a"/>
                <polygon points="0,12 3,0 -3,0" fill="#94a3b8"/>
                <text x="0" y="-14" font-size="9" font-weight="900" fill="#0f172a" text-anchor="middle">U</text>
              </g>

              <!-- 34 Official Boundaries (Outlines for Coloring) -->
              ${REAL_INDONESIA_PATHS.map(p => `
                <path d="${p.d}" fill="#ffffff" stroke="#1e293b" stroke-width="1.1"/>
              `).join('')}
            </svg>
          </div>
        </div>

        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN B · TANTANGAN MENGENAL IBU KOTA & KEPULAUAN</div>
          <div class="lks-quiz-group">
            <div class="lks-quiz-item">
              <div class="lks-quiz-question">1. Sebutkan nama pulau tempat kamu dan keluargamu tinggal!</div>
              <div class="lks-line">Jawaban: ............................................................................................................................</div>
            </div>
            <div class="lks-quiz-item">
              <div class="lks-quiz-question">2. Hubungkan nama pulau besar dengan julukan/ikon faunanya:</div>
              <div style="font-size:12px; margin-left:14px; line-height:1.8;">
                • Pulau Sumatera &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ &nbsp; [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] &nbsp; Burung Cendrawasih Emas<br>
                • Pulau Kalimantan &nbsp;&nbsp;&nbsp;➔ &nbsp; [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] &nbsp; Badak Bercula Satu & Harimau Loreng<br>
                • Pulau Papua &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;➔ &nbsp; [ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ] &nbsp; Orangutan Hutan Hujan Tropis
              </div>
            </div>
          </div>
        </div>

        <div class="lks-footer-sign-table">
          <div class="lks-sign-box">
            <div>Paraf Orang Tua</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
          <div class="lks-sign-center">
            <div class="lks-motto-box">🇮🇩 Aku Cinta Tanah Air Indonesia!</div>
          </div>
          <div class="lks-sign-box">
            <div>Nilai & Paraf Guru</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
        </div>
      </div>
    `;
  }

  // Template LKS Mewarnai Peta Bali
  generateBaliMapLksHtml(isEn) {
    return `
      <div class="lks-paper-sheet">
        <div class="lks-kop">
          <div class="lks-kop-logo"><span style="font-size:38px;">🏝️</span></div>
          <div class="lks-kop-center">
            <h2 class="lks-kop-instansi">SEKOLAH DASAR · MUATAN LOKAL PULAU BALI</h2>
            <h1 class="lks-kop-title">LEMBAR KERJA: PETA KABUPATEN & LANDMARK BALI</h1>
            <div class="lks-kop-sub">Media Pembelajaran Budaya & Geografi Daerah — Kelas 1 SD</div>
          </div>
          <div class="lks-kop-logo"><span style="font-size:38px;">🌺</span></div>
        </div>
        <div class="lks-kop-divider"></div>

        <table class="lks-identity-table">
          <tr>
            <td style="width:16%;"><strong>Nama Siswa</strong></td>
            <td style="width:40%;">: ................................................................</td>
            <td style="width:18%;"><strong>Hari / Tanggal</strong></td>
            <td style="width:26%;">: ....................................</td>
          </tr>
          <tr>
            <td><strong>Kelas / Fase</strong></td>
            <td>: 1 (Satu) SD / Fase A</td>
            <td><strong>Materi</strong></td>
            <td>: 8 Kabupaten & 1 Kota Denpasar</td>
          </tr>
        </table>

        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN A · PETA OUTLINE 9 WILAYAH ADMINISTRATIF BALI</div>
          <div class="lks-instruction">
            <em>Petunjuk: Warnai kabupaten di Pulau Bali dengan krayon warna-warni! Beri tanda bintang (★) di daerah tempat tinggalmu, dan beri tanda titik merah pada letak Pura Besakih dan Pura Tanah Lot!</em>
          </div>

          <div class="lks-map-outline-container">
            <svg class="svg-map-frame" viewBox="0 0 760 480" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #1e293b; border-radius:8px;">
              ${REAL_BALI_PATHS.map(r => `
                <path d="${r.d}" fill="#ffffff" stroke="#0f172a" stroke-width="1.3"/>
                <text x="${r.cx}" y="${r.cy}" font-size="11" font-weight="800" fill="#334155" text-anchor="middle">${r.name}</text>
              `).join('')}
            </svg>
          </div>
        </div>

        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN B · TANYA JAWAB BUDAYA BALI</div>
          <div class="lks-quiz-group">
            <div class="lks-quiz-item">
              <div class="lks-quiz-question">1. Apa nama ibu kota Provinsi Bali?</div>
              <div class="lks-line">Jawaban: ............................................................................................................................</div>
            </div>
            <div class="lks-quiz-item">
              <div class="lks-quiz-question">2. Sistem pengairan sawah gotong royong warisan leluhur Bali yang diakui dunia adalah:</div>
              <div class="lks-line">Jawaban: ............................................................................................................................</div>
            </div>
          </div>
        </div>

        <div class="lks-footer-sign-table">
          <div class="lks-sign-box">
            <div>Paraf Orang Tua</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
          <div class="lks-sign-center">
            <div class="lks-motto-box">🌺 Tri Hita Karana: Harmonis & Rukun</div>
          </div>
          <div class="lks-sign-box">
            <div>Nilai & Paraf Guru</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
        </div>
      </div>
    `;
  }

  // Template LKS Matematika Kelas 1 SD
  generateMathLksHtml(isEn) {
    return `
      <div class="lks-paper-sheet">
        <div class="lks-kop">
          <div class="lks-kop-logo"><span style="font-size:38px;">🧮</span></div>
          <div class="lks-kop-center">
            <h2 class="lks-kop-instansi">SEKOLAH DASAR · KURIKULUM MERDEKA MATEMATIKA</h2>
            <h1 class="lks-kop-title">LEMBAR KERJA: KOTAK 10 FRAME & GARIS BILANGAN</h1>
            <div class="lks-kop-sub">Strategi Visual Penjumlahan Ceria — Fase A (Kelas 1 SD)</div>
          </div>
          <div class="lks-kop-logo"><span style="font-size:38px;">✨</span></div>
        </div>
        <div class="lks-kop-divider"></div>

        <table class="lks-identity-table">
          <tr>
            <td style="width:16%;"><strong>Nama Siswa</strong></td>
            <td style="width:40%;">: ................................................................</td>
            <td style="width:18%;"><strong>Hari / Tanggal</strong></td>
            <td style="width:26%;">: ....................................</td>
          </tr>
          <tr>
            <td><strong>Kelas / Fase</strong></td>
            <td>: 1 (Satu) SD / Fase A</td>
            <td><strong>Materi</strong></td>
            <td>: Penjumlahan Dasar Menuju 10</td>
          </tr>
        </table>

        <!-- Latihan Kotak 10 Frame -->
        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN A · LATIHAN KOTAK 10 FRAME (TEN-FRAMES)</div>
          <div class="lks-instruction">
            <em>Petunjuk: Gambarlah lingkaran hitam (●) sebanyak angka pertama di Kotak 1, lalu lengkapi dengan lingkaran silang (⊗) dari angka kedua sampai Kotak 1 PENUH jadi 10!</em>
          </div>

          <div class="lks-math-problem-box">
            <strong>Soal 1: &nbsp; 7 + 5 = .......</strong>
            <div style="display:flex; gap:20px; align-items:center; margin-top:8px;">
              <div>
                <div style="font-size:11px; margin-bottom:3px;">Kotak 1 (Isi 7 lingkaran):</div>
                <table class="lks-ten-frame-grid">
                  <tr><td>●</td><td>●</td><td>●</td><td>●</td><td>●</td></tr>
                  <tr><td>●</td><td>●</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
              </div>
              <div style="font-size:24px; font-weight:800;">+</div>
              <div>
                <div style="font-size:11px; margin-bottom:3px;">Kotak 2 (Sisa setelah genapkan 10):</div>
                <table class="lks-ten-frame-grid">
                  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
              </div>
            </div>
            <div style="margin-top:10px; font-size:13px;">
              Jadi, 7 + 5 diubah menjadi: <strong>10 + ....... = .......</strong>
            </div>
          </div>

          <div class="lks-math-problem-box" style="margin-top:14px;">
            <strong>Soal 2: &nbsp; 8 + 6 = .......</strong>
            <div style="display:flex; gap:20px; align-items:center; margin-top:8px;">
              <div>
                <div style="font-size:11px; margin-bottom:3px;">Kotak 1:</div>
                <table class="lks-ten-frame-grid">
                  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
              </div>
              <div style="font-size:24px; font-weight:800;">+</div>
              <div>
                <div style="font-size:11px; margin-bottom:3px;">Kotak 2:</div>
                <table class="lks-ten-frame-grid">
                  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                  <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
                </table>
              </div>
            </div>
            <div style="margin-top:10px; font-size:13px;">
              Jadi, 8 + 6 diubah menjadi: <strong>10 + ....... = .......</strong>
            </div>
          </div>
        </div>

        <!-- Latihan Garis Bilangan Lompat Kodok -->
        <div class="lks-section">
          <div class="lks-section-badge">BAGIAN B · GARIS BILANGAN LOMPAT KODOK CERIA (🐸)</div>
          <div class="lks-instruction">
            <em>Petunjuk: Mulailah dari angka pertama, lalu gambar busur lompatan kodok ke kanan sebanyak angka kedua!</em>
          </div>

          <div class="lks-math-problem-box">
            <strong>Soal 3: &nbsp; 6 + 4 = .......</strong>
            <div class="lks-numberline-canvas">
              <svg viewBox="0 0 600 70" width="100%" height="70" xmlns="http://www.w3.org/2000/svg">
                <line x1="20" y1="45" x2="580" y2="45" stroke="#0f172a" stroke-width="2"/>
                <polygon points="585,45 575,40 575,50" fill="#0f172a"/>
                ${[0,1,2,3,4,5,6,7,8,9,10,11,12].map(n => {
                  const x = 30 + n * 44;
                  return `
                    <line x1="${x}" y1="40" x2="${x}" y2="50" stroke="#0f172a" stroke-width="1.8"/>
                    <text x="${x}" y="64" font-size="11" font-weight="700" fill="#0f172a" text-anchor="middle">${n}</text>
                  `;
                }).join('')}
              </svg>
            </div>
            <div style="margin-top:6px; font-size:12.5px;">Kodok melompat dari 6 sejauh 4 langkah mendarat di angka: <strong>.......</strong></div>
          </div>
        </div>

        <div class="lks-footer-sign-table">
          <div class="lks-sign-box">
            <div>Paraf Orang Tua</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
          <div class="lks-sign-center">
            <div class="lks-motto-box">⭐ Aku Jago Berhitung Matematika!</div>
          </div>
          <div class="lks-sign-box">
            <div>Nilai & Paraf Guru</div>
            <div class="lks-sign-line">( ............................................ )</div>
          </div>
        </div>
      </div>
    `;
  }

  // 🎴 Lembar Kartu Pintar Edukasi (Flashcards A6 Siap Gunting A4)
  openFlashcardsWorksheet() {
    const cards = [
      { tag: '🧮 KAWAN 10', title: '7 + 3 = 10', sub: 'Ten-Frame Pasangan 10', emoji: '🔟', back: '7 di kepala, 3 di jari ➔ Jadi 10 bulat!' },
      { tag: '🧮 KAWAN 10', title: '6 + 4 = 10', sub: 'Number Bonds Ceria', emoji: '🔗', back: '6 balok + 4 balok ➔ Tepat 10!' },
      { tag: '📖 FONIK', title: 'BA - JU ➔ BAJU', sub: 'Suku Kata Utuh', emoji: '👕', back: 'Aku memakai baju seragam sekolah yang bersih.' },
      { tag: '📖 FONIK', title: 'BO - LA ➔ BOLA', sub: 'Suku Kata Utuh', emoji: '⚽', back: 'Ayo oper bola dan cetak gol ceria!' },
      { tag: '🌟 ENGLISH', title: 'SUN ☀️ MATAHARI', sub: 'Everyday Words', emoji: '☀️', back: 'The sun shines bright in the morning sky.' },
      { tag: '🌟 BALI', title: 'SEKAR 🌸 BUNGA', sub: 'Kruna Basa Bali', emoji: '🌺', back: 'Sekar cempaka miik ngalub ring natah.' },
      { tag: '🏆 PRESTASI', title: 'JAGOAN KELAS 1', sub: 'Bintang Mandiri', emoji: '⭐', back: 'Pantang menyerah dan terus belajar setiap hari!' },
      { tag: '🧠 LOGIKA', title: '10 + 5 = 15', sub: 'Place Value Dasar', emoji: '🧱', back: '1 batang puluhan dan 5 kubus satuan.' }
    ];

    const htmlContent = `
      <div class="lks-page-sheet" style="max-width:820px; margin:0 auto; background:#fff; color:#0f172a; padding:24px; border-radius:12px;">
        <div class="lks-kop-container" style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #0f172a; padding-bottom:12px; margin-bottom:16px;">
          <div>
            <div style="font-size:11px; font-weight:800; color:#0e7490; text-transform:uppercase;">ANABHIDEV SMART STUDY · KURIKULUM MERDEKA</div>
            <h2 style="margin:2px 0 0; font-size:20px; font-weight:900;">🎴 LEMBAR KARTU PINTAR EDUKASI (FLASHCARDS A6 SIAP GUNTING)</h2>
          </div>
          <div style="text-align:right; font-size:11.5px; font-weight:700;">
            <div>Format Cetak: A4 Landscape / Portrait</div>
            <div style="color:#059669;">✂️ 8 Kartu Belajar Mandiri</div>
          </div>
        </div>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px 14px; font-size:12px; margin-bottom:18px; display:flex; align-items:center; gap:8px;">
          <span style="font-size:16px;">✂️</span>
          <span><strong>Petunjuk Guru / Orang Tua:</strong> Cetak lembar ini pada kertas tebal / karton A4, lalu gunting mengikuti garis putus-putus. Kartu dapat digunakan untuk kuis tebak cepat harian!</span>
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px;">
          ${cards.map((c, idx) => `
            <div style="
              border: 2px dashed #94a3b8;
              border-radius: 14px;
              padding: 16px;
              background: #ffffff;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              min-height: 170px;
              position: relative;
            ">
              <span style="position:absolute; top:-10px; right:14px; background:#f1f5f9; color:#475569; font-size:10px; font-weight:800; padding:1px 8px; border-radius:4px; border:1px solid #cbd5e1;">
                KARTU #${idx + 1}
              </span>

              <div>
                <span style="display:inline-block; font-size:10.5px; font-weight:800; color:#0e7490; background:#e0f2fe; padding:2px 8px; border-radius:6px; margin-bottom:6px;">
                  ${c.tag}
                </span>
                <div style="font-size:28px; float:right;">${c.emoji}</div>
                <h3 style="margin:4px 0 2px; font-size:17px; font-weight:900; color:#0f172a;">${c.title}</h3>
                <div style="font-size:11.5px; color:#64748b; font-weight:700;">${c.sub}</div>
              </div>

              <div style="margin-top:12px; padding-top:10px; border-top:1px solid #e2e8f0; font-size:12px; color:#334155; line-height:1.4;">
                <strong>💡 Catatan Pintar:</strong> ${c.back}
              </div>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:20px; text-align:center; font-size:11px; color:#94a3b8;">
          AnabhiDev Smart Study Flashcards · https://anabhidev.com/Anabhi-Smart-Study/ · Bebas Digunakan untuk Pendidikan Dasar
        </div>
      </div>
    `;

    this.renderModal(htmlContent, '🎴 Lembar Kartu Pintar (Flashcards A6 Siap Gunting)');
  }

  // 🏆 Sertifikat Apresiasi Prestasi Siswa (PDF A4)
  openCertificateModal(studentName = 'Ana', stars = 0, streak = 1, badgesCount = 0) {
    const htmlContent = `
      <div class="lks-page-sheet" style="max-width:820px; margin:0 auto; background:#ffffff; color:#0f172a; padding:36px 32px; border:8px double #0d9488; border-radius:20px; text-align:center; position:relative; box-shadow:0 10px 30px rgba(0,0,0,0.06);">
        <!-- Hiasan Sudut Ornamen -->
        <div style="font-size:13px; font-weight:900; letter-spacing:2px; text-transform:uppercase; color:#0d9488; margin-bottom:6px;">
          ★ ANABHIDEV SMART STUDY · KURIKULUM MERDEKA FASE A ★
        </div>
        <h1 style="margin:0 0 10px; font-size:30px; font-weight:900; color:#042f2e; text-transform:uppercase; letter-spacing:1px;">
          SERTIFIKAT PENGHARGAAN BELAJAR
        </h1>
        <div style="width:120px; height:4px; background:#0d9488; margin:0 auto 20px; border-radius:2px;"></div>

        <p style="font-size:15px; color:#475569; margin:0 0 16px; font-style:italic;">
          Sertifikat ini dianugerahkan dengan penuh rasa bangga dan apresiasi kepada:
        </p>

        <div style="background:linear-gradient(135deg, rgba(13, 148, 136, 0.08), rgba(20, 184, 166, 0.12)); border:2px dashed #0d9488; border-radius:14px; padding:16px; margin:0 auto 20px; max-width:540px;">
          <h2 style="margin:0; font-size:32px; font-weight:950; color:#0f766e; text-transform:capitalize;">
            ${studentName === 'Abhi' ? '⚡ ' : '🌸 '}${studentName}
          </h2>
          <div style="font-size:13px; font-weight:800; color:#042f2e; margin-top:4px;">
            Siswa Hebat Kelas 1B SD Kurikulum Merdeka
          </div>
        </div>

        <p style="font-size:14px; color:#334155; line-height:1.6; max-width:620px; margin:0 auto 24px;">
          Atas ketekunan belajar mandiri, semangat membaca tanpa dieja, keberanian memecahkan 14 jurus visual matematika, penjelajahan geografi 38 provinsi, dan pencapaian luar biasa:
        </p>

        <!-- Prestasi Badges -->
        <div style="display:flex; justify-content:center; gap:20px; flex-wrap:wrap; margin-bottom:30px;">
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:10px 18px; min-width:130px;">
            <div style="font-size:24px;">⭐</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${stars}</div>
            <div style="font-size:11px; font-weight:700; color:#64748b;">Bintang Emas</div>
          </div>

          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:10px 18px; min-width:130px;">
            <div style="font-size:24px;">🔥</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${streak} Hari</div>
            <div style="font-size:11px; font-weight:700; color:#64748b;">Streak Harian</div>
          </div>

          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:10px 18px; min-width:130px;">
            <div style="font-size:24px;">🎖️</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${badgesCount}</div>
            <div style="font-size:11px; font-weight:700; color:#64748b;">Lencana Dimenangkan</div>
          </div>
        </div>

        <!-- Tanda Tangan Resmi -->
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:36px; padding:0 30px;">
          <div style="text-align:center; min-width:180px;">
            <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:56px;">
              Mengetahui,<br>Orang Tua / Wali Murid
            </div>
            <div style="font-weight:800; font-size:14px; border-bottom:1.5px solid #0f172a; padding-bottom:4px;">
              ( .................................................... )
            </div>
          </div>

          <div style="text-align:center;">
            <div style="font-size:42px;">🏆</div>
            <div style="font-size:11px; font-weight:800; color:#0d9488; text-transform:uppercase;">SEAL OF EXCELLENCE</div>
          </div>

          <div style="text-align:center; min-width:180px;">
            <div style="font-size:13px; font-weight:700; color:#475569; margin-bottom:56px;">
              Denpasar, 23 September 2026<br>Guru Pendamping Belajar
            </div>
            <div style="font-weight:800; font-size:14px; border-bottom:1.5px solid #0f172a; padding-bottom:4px;">
              <strong>Anabhi Dev Academy</strong>
            </div>
          </div>
        </div>
      </div>
    `;

    this.renderModal(htmlContent, `🏆 Sertifikat Prestasi Belajar (${studentName})`);
  }
}

