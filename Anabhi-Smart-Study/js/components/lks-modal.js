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
}

