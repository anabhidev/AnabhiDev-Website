// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · AI Tutor Modal Component
// Development · Anabhi Dev
// Version   : 2.6 (GAS Script Properties & Gemini 3.5 Flash-Lite)
// ================================================================

import { appState } from '../state.js';
import { store } from '../store.js';
import { t } from '../data/i18n.js';
import { TtsEngine } from '../engine/tts-engine.js';

export var GEMINI_CONFIG = {
  MODEL    : 'gemini-3.5-flash-lite',
  ENDPOINT : 'https://generativelanguage.googleapis.com/v1beta/models/',
  GAS_URL  : 'https://script.google.com/macros/s/AKfycbxZdDF2Olp0HR6ypNd1EuktmE3sv3cohSBbA7b0IOrbtPVg4Bwqx6pZnIXoLKTcbQI8/exec' // Diisi URL Web App GAS (script.google.com/macros/s/.../exec)
};

if (typeof window !== 'undefined') {
  window.GEMINI_CONFIG = window.GEMINI_CONFIG || GEMINI_CONFIG;
}

export class AiTutorModalComponent {
  constructor() {
    this.modalEl = null;
    this.messages = [];
    this.isLoading = false;
    this.isListening = false;
    this.recognition = null;
    this.showSettings = false;
    this.statusMessage = null;
    this.initModal();
    this.initSpeech();
  }

  initModal() {
    let el = document.getElementById('aiTutorModal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'aiTutorModal';
      document.body.appendChild(el);
    }
    el.className = 'ai-modal-overlay';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-label', 'Kakak Belajar Pintar');
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
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });
  }

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains('active');
  }

  open(initialPrompt = '') {
    this.render();
    this.modalEl.style.display = 'flex';
    // Trigger reflow for smooth animation
    void this.modalEl.offsetHeight;
    this.modalEl.classList.add('active');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      const input = this.modalEl.querySelector('#aiUserInput');
      if (input) input.focus();
    }, 150);

    if (initialPrompt && initialPrompt.trim()) {
      this.sendQuestion(initialPrompt.trim());
    }
  }

  close() {
    if (!this.modalEl) return;
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch (_) {}
      this.isListening = false;
    }
    if (typeof window !== 'undefined' && window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    this.modalEl.classList.remove('active');
    setTimeout(() => {
      if (!this.modalEl.classList.contains('active')) {
        this.modalEl.style.display = 'none';
      }
    }, 220);
    document.body.style.overflow = '';
  }

  // 🎙️ Inisialisasi Web Speech Recognition (Bawaan Browser, 100% Gratis & Ringan)
  initSpeech() {
    if (typeof window === 'undefined') return;
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const rec = new SpeechRec();
        rec.lang = 'id-ID';
        rec.continuous = false;
        rec.interimResults = true;

        rec.onstart = () => {
          this.isListening = true;
          this.updateMicUi(true);
        };

        rec.onresult = (event) => {
          let transcript = '';
          for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          const input = this.modalEl ? this.modalEl.querySelector('#aiUserInput') : null;
          if (input && transcript) {
            input.value = transcript;
          }
        };

        rec.onerror = (event) => {
          console.warn('[SpeechRec] Error:', event.error);
          this.isListening = false;
          this.updateMicUi(false);
        };

        rec.onend = () => {
          this.isListening = false;
          this.updateMicUi(false);
          const input = this.modalEl ? this.modalEl.querySelector('#aiUserInput') : null;
          if (input) input.focus();
        };

        this.recognition = rec;
      } catch (e) {
        console.warn('[SpeechRec] Tidak dapat menginisialisasi suara:', e);
      }
    }
  }

  toggleVoice() {
    if (!this.recognition) {
      alert('Fitur suara mikrofon didukung di peramban Google Chrome, Edge, Safari, dan Android!');
      return;
    }
    if (this.isListening) {
      this.recognition.stop();
    } else {
      try {
        const input = this.modalEl ? this.modalEl.querySelector('#aiUserInput') : null;
        if (input) input.placeholder = 'Sedang mendengarkan... Silakan bicara!';
        this.recognition.start();
      } catch (e) {
        try { this.recognition.stop(); } catch (_) {}
        this.isListening = false;
        this.updateMicUi(false);
      }
    }
  }

  updateMicUi(listening) {
    const micBtn = this.modalEl ? this.modalEl.querySelector('#btnAiVoiceMic') : null;
    if (!micBtn) return;
    if (listening) {
      micBtn.classList.add('listening');
      micBtn.innerHTML = '🔴';
      micBtn.title = 'Mendengarkan... Silakan bicara!';
    } else {
      micBtn.classList.remove('listening');
      micBtn.innerHTML = '🎙️';
      micBtn.title = 'Bicara lewat suara (Mikrofon)';
      const input = this.modalEl ? this.modalEl.querySelector('#aiUserInput') : null;
      if (input) input.placeholder = 'Ketik pertanyaan atau klik mic 🎙️...';
    }
  }

  // Google Apps Script (GAS) URL
  getGasUrl() {
    return localStorage.getItem('anabhi_gas_url') ||
           (typeof window !== 'undefined' && window.GEMINI_CONFIG && window.GEMINI_CONFIG.GAS_URL) ||
           GEMINI_CONFIG.GAS_URL || '';
  }

  setGasUrl(url) {
    if (url && url.trim()) {
      const u = url.trim();
      localStorage.setItem('anabhi_gas_url', u);
      if (typeof window !== 'undefined' && window.GEMINI_CONFIG) {
        window.GEMINI_CONFIG.GAS_URL = u;
      }
    } else {
      localStorage.removeItem('anabhi_gas_url');
      if (typeof window !== 'undefined' && window.GEMINI_CONFIG) {
        window.GEMINI_CONFIG.GAS_URL = '';
      }
    }
  }

  // Direct Local API Key (Cadangan bila tidak memakai GAS)
  getApiKey() {
    if (typeof window !== 'undefined' && window.GEMINI_API_KEY) {
      return window.GEMINI_API_KEY;
    }
    return localStorage.getItem('anabhi_gemini_api_key') || '';
  }

  setApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem('anabhi_gemini_api_key', key.trim());
      if (typeof window !== 'undefined') {
        window.GEMINI_API_KEY = key.trim();
      }
    } else {
      localStorage.removeItem('anabhi_gemini_api_key');
      if (typeof window !== 'undefined') {
        delete window.GEMINI_API_KEY;
      }
    }
  }

  getModel() {
    const saved = localStorage.getItem('anabhi_gemini_model');
    if (saved) return saved;
    const globalConfig = typeof window !== 'undefined' ? window.GEMINI_CONFIG : null;
    return (globalConfig && globalConfig.MODEL) || GEMINI_CONFIG.MODEL;
  }

  setModel(modelName) {
    if (modelName && modelName.trim()) {
      const m = modelName.trim();
      localStorage.setItem('anabhi_gemini_model', m);
      if (typeof window !== 'undefined' && window.GEMINI_CONFIG) {
        window.GEMINI_CONFIG.MODEL = m;
      }
    }
  }

  getEndpoint() {
    const saved = localStorage.getItem('anabhi_gemini_endpoint');
    if (saved) return saved;
    const globalConfig = typeof window !== 'undefined' ? window.GEMINI_CONFIG : null;
    return (globalConfig && globalConfig.ENDPOINT) || GEMINI_CONFIG.ENDPOINT;
  }

  setEndpoint(url) {
    if (url && url.trim()) {
      const u = url.trim();
      localStorage.setItem('anabhi_gemini_endpoint', u);
      if (typeof window !== 'undefined' && window.GEMINI_CONFIG) {
        window.GEMINI_CONFIG.ENDPOINT = u;
      }
    }
  }

  // Status backend aktif: GAS vs Direct Key vs Cloudflare
  getBackendStatus() {
    const gasUrl = this.getGasUrl();
    if (gasUrl && gasUrl.includes('/exec')) {
      return { mode: 'gas', label: '🟢 GAS Backend Aktif (Script Properties)', desc: 'Kunci API tersimpan aman di Google Apps Script' };
    }
    const directKey = this.getApiKey();
    if (directKey) {
      return { mode: 'direct', label: '🟢 Direct API Key Aktif', desc: 'Menggunakan API Key lokal' };
    }
    return { mode: 'none', label: '🟡 Perlu Pengaturan Backend', desc: 'Masukkan URL Web App GAS atau API Key di pengaturan' };
  }

  async testConnection() {
    const gasUrl = this.getGasUrl();
    const localKey = this.getApiKey();

    this.statusMessage = { type: 'info', text: 'Menguji koneksi ke AI backend...' };
    this.render();

    // 1. Uji GAS jika URL ada
    if (gasUrl && gasUrl.includes('/exec')) {
      try {
        const resp = await fetch(gasUrl, {
          method: 'POST',
          body: JSON.stringify({
            action: 'ask_ai',
            prompt: 'Tes koneksi satu kata: Aktif!',
            subject: 'Umum',
            model: this.getModel()
          })
        });
        if (resp.ok) {
          const resJson = await resp.json();
          if (resJson.ok) {
            this.statusMessage = { type: 'success', text: `✅ Berhasil! Google Apps Script (${this.getModel()}) merespons dengan lancar!` };
          } else {
            this.statusMessage = { type: 'error', text: `❌ Pesan dari GAS: ${resJson.error || 'Gagal'}` };
          }
        } else {
          this.statusMessage = { type: 'error', text: `❌ HTTP ${resp.status} saat menghubungi URL Web App GAS.` };
        }
      } catch (e) {
        this.statusMessage = { type: 'error', text: `❌ Gagal menghubungi GAS: ${e.message}` };
      }
      this.render();
      return;
    }

    // 2. Uji Direct API Key jika ada
    if (localKey) {
      const endpoint = this.getEndpoint().replace(/\/?$/, '/');
      const model = this.getModel();
      const url = `${endpoint}${model}:generateContent?key=${localKey}`;

      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Tes koneksi satu kata: Aktif!' }] }],
            generationConfig: { maxOutputTokens: 20 }
          })
        });

        if (resp.ok) {
          this.statusMessage = { type: 'success', text: `✅ Berhasil! Model direct "${model}" aktif.` };
        } else {
          const errJson = await resp.json().catch(() => ({}));
          this.statusMessage = { type: 'error', text: `❌ Gagal: ${errJson.error?.message || `HTTP ${resp.status}`}` };
        }
      } catch (e) {
        this.statusMessage = { type: 'error', text: `❌ Kendala Jaringan: ${e.message}` };
      }
      this.render();
      return;
    }

    this.statusMessage = { type: 'error', text: 'Masukkan Web App URL GAS atau API Key terlebih dahulu!' };
    this.render();
  }

  formatMarkdown(text) {
    if (!text) return '';
    let safe = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Bold **text**
    safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic *text*
    safe = safe.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // List and paragraphs
    const lines = safe.split('\n');
    let inList = false;
    let html = '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${trimmed.replace(/^[-*•]\s*/, '')}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        if (trimmed.length > 0) {
          html += `<p>${trimmed}</p>`;
        }
      }
    }
    if (inList) html += '</ul>';
    return html || safe;
  }

  async sendQuestion(questionText) {
    if (!questionText || this.isLoading) return;

    const state = appState.get();
    const currentSub = state.currentSubjectId || 'Umum';

    this.messages.push({ role: 'user', text: questionText });
    this.isLoading = true;
    this.render();
    this.scrollToBottom();

    try {
      let reply = '';
      const gasUrl = this.getGasUrl();
      const localKey = this.getApiKey();

      // ── METODE 1: Google Apps Script (GAS) Backend — [Rekomendasi Utama Anabhi Dev] ──
      // Kunci GEMINI_API_KEY tersimpan aman di Script Properties script.google.com!
      if (gasUrl && gasUrl.includes('/exec')) {
        try {
          const resp = await fetch(gasUrl, {
            method: 'POST',
            body: JSON.stringify({
              action: 'ask_ai',
              prompt: questionText,
              subject: currentSub,
              model: this.getModel()
            })
          });

          if (resp.ok) {
            const data = await resp.json();
            if (data.ok) {
              reply = data.reply || data.text || '';
            } else if (data.error) {
              throw new Error(data.error);
            }
          } else {
            throw new Error(`GAS HTTP ${resp.status}`);
          }
        } catch (gasErr) {
          Logger_warn('GAS error, trying fallback:', gasErr);
          // Jika GAS gagal dan ada direct localKey, lanjutkan ke fallback
          if (!localKey) throw gasErr;
        }
      }

      // ── METODE 2: Direct Google Gemini API (Cadangan / Testing Lokal) ──
      if (!reply && localKey) {
        const endpoint = this.getEndpoint().replace(/\/?$/, '/');
        const model = this.getModel();
        const geminiUrl = `${endpoint}${model}:generateContent?key=${localKey}`;

        const sysMsg = `Kamu adalah "Kakak Belajar Pintar" dari Anabhi Dev Smart Study, tutor interaktif yang ramah, santun, ceria, dan edukatif untuk siswa SD (Sekolah Dasar Kelas 1 sampai Kelas 3).
Mata Pelajaran Saat Ini: ${currentSub}.
Panduan Menjawab:
1. Gunakan bahasa Indonesia yang hangat, bersahabat, penuh pujian dan dorongan semangat belajar!
2. Jelaskan materi dengan analogi benda sehari-hari atau cerita singkat yang mudah dibayangkan anak-anak.
3. JANGAN langsung membocorkan jawaban soal ujian secara instan; berikan petunjuk (clue) logis dan ajak anak berpikir langkah demi langkah ("Satu Soal Banyak Cara").
4. Susun respon dengan rapi, gunakan baris baru, poin-poin sederhana, dan emoji yang ceria.`;

        const gResp = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${sysMsg}\n\nPertanyaan Siswa:\n"${questionText}"` }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        });

        if (gResp.ok) {
          const gData = await gResp.json();
          reply = gData.candidates?.[0]?.content?.parts?.[0]?.text || '';
        } else {
          const errText = await gResp.text();
          throw new Error(`Gemini API (${gResp.status}): ${errText}`);
        }
      }

      // ── METODE 3: Cloudflare Pages Function /api/ai-tutor (Jika di-host di Cloudflare) ──
      if (!reply && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
        try {
          const cfResp = await fetch('/api/ai-tutor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: questionText,
              subject: currentSub,
              studentGrade: 'Kelas 1–3 SD'
            })
          });
          if (cfResp.ok) {
            const data = await cfResp.json();
            reply = data.reply;
          }
        } catch (e) {}
      }

      if (!reply) {
        reply = `Halo Sahabat Juara! 🌟 Untuk mengaktifkan Kakak Belajar AI:

1. **Cara Resmi (Google Apps Script / GAS)**:
   - Pasang berkas \`gas/Code.gs\` di [script.google.com](https://script.google.com).
   - Masukkan \`GEMINI_API_KEY\` di **Project Settings ➔ Script Properties**.
   - Deploy sebagai Web App ("Anyone"), lalu masukkan URL-nya di menu **⚙️ Pengaturan** pojok atas dialog ini.
   - *Kunci aman 100% dan anak tidak perlu memasukkan API key apa pun!*

2. **Cara Cepat (Direct Key)**:
   - Buka menu **⚙️ Pengaturan** di atas dan masukkan API Key Gemini Anda secara langsung.

Kakak AI siap membimbing belajar materi apa saja!`;
      }

      this.messages.push({ role: 'ai', text: reply });
    } catch (err) {
      this.messages.push({
        role: 'ai',
        text: `Wah, terjadi kendala saat menghubungi Kakak AI: ${err.message}. Silakan periksa koneksi internet atau pengaturan backend di tombol ⚙️ Pengaturan.`
      });
    } finally {
      this.isLoading = false;
      this.render();
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatBox = this.modalEl.querySelector('#aiChatHistory');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }, 50);
  }

  render() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const currentStudent = (store && typeof store.getStudent === 'function') ? store.getStudent() : 'Ana';
    const gasUrl = this.getGasUrl();
    const apiKey = this.getApiKey();
    const currentModel = this.getModel();
    const status = this.getBackendStatus();

    this.modalEl.innerHTML = `
      <div class="ai-modal-dialog">
        <!-- Modal Header Mewah -->
        <div class="ai-modal-header">
          <div class="ai-header-info">
            <span class="ai-avatar-badge">🤖</span>
            <div class="ai-header-titles">
              <h3 class="ai-header-title">
                ${isEn ? 'Smart AI Tutor — Study Companion' : 'Kakak Belajar Pintar — Tanya AI'}
                <span class="ai-model-pill">${currentModel}</span>
              </h3>
              <div class="ai-header-subtitle">
                ${status.label}
              </div>
            </div>
          </div>

          <div class="ai-header-actions">
            <button class="ai-btn-header" id="btnAiToggleSettings" type="button" title="Pengaturan GAS &amp; API Key">
              ⚙️ <span>Pengaturan</span>
            </button>
            <button class="ai-btn-close" id="btnAiCloseModal" type="button" aria-label="Tutup Dialog">✕</button>
          </div>
        </div>

        <!-- Panel Pengaturan Backend: Google Apps Script & Direct Key (Collapsible) -->
        <div class="ai-settings-drawer" id="aiSettingsDrawer" style="display: ${this.showSettings ? 'flex' : 'none'};">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 class="ai-settings-title">⚙️ Konfigurasi Backend &amp; Gemini AI</h4>
            <span style="font-size:11.5px; color:var(--muted);">${status.desc}</span>
          </div>

          ${this.statusMessage ? `
            <div style="padding:8px 12px; border-radius:10px; font-size:12px; font-weight:600; ${
              this.statusMessage.type === 'success' ? 'background:#ecfdf5; color:#065f46; border:1px solid #a7f3d0;' :
              this.statusMessage.type === 'error' ? 'background:#fef2f2; color:#991b1b; border:1px solid #fecaca;' :
              'background:#f0f9ff; color:#0369a1; border:1px solid #bae6fd;'
            }">
              ${this.statusMessage.text}
            </div>
          ` : ''}

          <!-- Pilihan 1: Google Apps Script (Rekomendasi Utama) -->
          <div style="background:var(--card); border:1px solid var(--line); border-radius:14px; padding:12px 14px;">
            <label class="ai-field-label" for="inputGasUrl">
              🚀 <strong>Metode 1: Google Apps Script (GAS) Web App URL [Rekomendasi Aman]</strong>
            </label>
            <div style="font-size:11.5px; color:var(--muted); margin-bottom:8px; line-height:1.5;">
              Kunci <code>GEMINI_API_KEY</code> disimpan di <strong>Script Properties</strong> (script.google.com). Pengunjung web tidak perlu memasukkan API key!
            </div>
            <div class="ai-input-with-action">
              <input class="ai-input" id="inputGasUrl" type="url" placeholder="https://script.google.com/macros/s/.../exec" value="${gasUrl}">
              ${gasUrl ? `<button class="btn" id="btnClearGas" type="button" style="padding:6px 10px; font-size:11.5px;">Hapus</button>` : ''}
            </div>
          </div>

          <!-- Pilihan 2: Direct Local Key (Cadangan) -->
          <div style="background:var(--card); border:1px solid var(--line); border-radius:14px; padding:12px 14px;">
            <label class="ai-field-label" for="inputApiKey">
              🔑 <strong>Metode 2: Direct API Key (Khusus Testing Komputer Lokal)</strong>
            </label>
            <div style="font-size:11.5px; color:var(--muted); margin-bottom:8px;">
              Jika belum deploy GAS, masukkan kunci langsung dari Google AI Studio (AIzaSy...).
            </div>
            <div class="ai-input-with-action">
              <input class="ai-input" id="inputApiKey" type="password" placeholder="Tempel AIzaSy... API Key di sini" value="${apiKey}">
              <button class="btn" id="btnToggleKeyVisibility" type="button" style="padding:6px 10px; font-size:12px;" title="Lihat/Sembunyikan">👁️</button>
              ${apiKey ? `<button class="btn" id="btnClearKey" type="button" style="padding:6px 10px; font-size:11.5px;">Hapus</button>` : ''}
            </div>
          </div>

          <!-- Model & Action Bar -->
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-top:2px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:12px; font-weight:750; color:var(--muted);">Model:</span>
              <select class="ai-input" id="selectModel" aria-label="${isEn ? 'Select AI Model' : 'Pilih Model AI'}" style="padding:6px 10px; font-size:12px; width:auto; cursor:pointer;">
                <option value="gemini-3.5-flash-lite" ${currentModel === 'gemini-3.5-flash-lite' ? 'selected' : ''}>gemini-3.5-flash-lite (Default)</option>
                <option value="gemini-2.5-flash-lite" ${currentModel === 'gemini-2.5-flash-lite' ? 'selected' : ''}>gemini-2.5-flash-lite</option>
                <option value="gemini-2.0-flash" ${currentModel === 'gemini-2.0-flash' ? 'selected' : ''}>gemini-2.0-flash</option>
              </select>
            </div>

            <div style="display:flex; gap:8px;">
              <button class="btn" id="btnTestConnection" type="button" style="padding:7px 14px; font-size:12px;">🧪 Tes Koneksi</button>
              <button class="btn primary" id="btnSaveConfig" type="button" style="padding:7px 18px; font-size:12px; font-weight:800;">Simpan</button>
            </div>
          </div>
        </div>

        <!-- Chat History Area -->
        <div class="ai-chat-history" id="aiChatHistory">
          <!-- Empty State & Pertanyaan Pembuka (Bersih & Ramah Anak) -->
          ${this.messages.length === 0 ? `
            <div class="ai-empty-state">
              <span class="ai-empty-star">${currentStudent === 'Abhi' ? '⚡' : '🌸'}</span>
              <strong class="ai-empty-title">
                ${isEn 
                  ? `Hello Champion ${currentStudent}! What do you want to explore today?`
                  : (currentStudent === 'Abhi' ? 'Halo Jagoan Abhi! ⚡ Mau tanya apa hari ini?' : 'Halo Sobat Hebat Ana! 🌸 Mau tanya apa hari ini?')}
              </strong>
              <p class="ai-empty-desc">
                ${isEn
                  ? 'Ask by typing or tapping the mic 🎙️! Learn 14 math calculation methods, geography maps, science wonders, or Balinese culture!'
                  : 'Kakak AI siap membimbingmu! Ketik pertanyaanmu atau klik mic 🎙️ untuk bertanya tentang trik cepat 14 jurus berhitung, peta 38 provinsi, hingga budaya Bali!'}
              </p>

              <!-- Quick starter chips -->
              <div class="ai-starters-grid">
                <button class="region-chip starter-q-chip" data-q="Jelaskan cara cepat berhitung 67 + 59 dengan jurus Kompensasi Belanda!" type="button">
                  🧮 Trik 67 + 59
                </button>
                <button class="region-chip starter-q-chip" data-q="Kenapa bumi berbentuk bulat pepat dan tampak biru dari luar angkasa?" type="button">
                  🌍 Kenapa Bumi Bulat?
                </button>
                <button class="region-chip starter-q-chip" data-q="Apa saja tradisi unik dan tempat terkenal di Pulau Bali?" type="button">
                  🏝️ Budaya Pulau Bali
                </button>
                <button class="region-chip starter-q-chip" data-q="Bagaimana cara menyusun kalimat S-P-O (Subjek - Predikat - Objek) yang benar?" type="button">
                  📖 Pola Kalimat S-P-O
                </button>
              </div>
            </div>
          ` : ''}

          <!-- Daftar Pesan Percakapan -->
          ${this.messages.map((m, idx) => `
            <div class="ai-msg-row ${m.role}">
              ${m.role === 'ai' ? '<span class="ai-msg-avatar">🤖</span>' : ''}
              <div class="ai-bubble ${m.role}">
                ${m.role === 'ai' ? this.formatMarkdown(m.text) : m.text}
                ${m.role === 'ai' ? `
                  <div class="ai-bubble-footer" style="margin-top:8px; display:flex; justify-content:flex-end;">
                    <button class="btn-bubble-tts" data-tts-idx="${idx}" type="button" title="Dengarkan jawaban ini bersuara" style="background:rgba(0,0,0,0.06); border:none; border-radius:8px; padding:3px 8px; font-size:11.5px; font-weight:700; cursor:pointer; color:var(--ink); display:inline-flex; align-items:center; gap:4px;">
                      🔊 <span>Dengarkan</span>
                    </button>
                  </div>
                ` : ''}
              </div>
              ${m.role === 'user' ? '<span class="ai-msg-avatar">' + (currentStudent === 'Abhi' ? '⚡' : '🌸') + '</span>' : ''}
            </div>
          `).join('')}

          <!-- Loading Indicator -->
          ${this.isLoading ? `
            <div class="ai-loading-box">
              <span class="ai-msg-avatar">🤖</span>
              <div class="ai-loading-bubble">
                <span>Kakak AI sedang merangkai penjelasan ceria</span>
                <div class="ai-loading-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Chat Input Bar -->
        <div class="ai-input-bar">
          <button class="ai-btn-mic ${this.isListening ? 'listening' : ''}" id="btnAiVoiceMic" type="button" aria-label="${this.isListening ? 'Sedang mendengarkan... Silakan bicara' : (isEn ? 'Voice input via microphone' : 'Bicara lewat suara (Mikrofon)')}" title="${this.isListening ? 'Sedang mendengarkan... Silakan bicara!' : (isEn ? 'Voice input (Microphone)' : 'Bicara lewat suara (Mikrofon)')}">
            ${this.isListening ? '🔴' : '🎙️'}
          </button>
          <input class="ai-input" id="aiUserInput" type="text" aria-label="${isEn ? 'Question for AI Tutor' : 'Kotak pertanyaan untuk Kakak AI'}" placeholder="${isEn ? 'Ask a question or tap mic 🎙️...' : 'Ketik pertanyaan atau klik mic 🎙️...'}" autocomplete="off">
          <button class="btn primary ai-btn-send" id="btnAiSend" type="button" aria-label="${isEn ? 'Send question' : 'Kirim pertanyaan'}">
            ${isEn ? 'Send 🚀' : 'Kirim 🚀'}
          </button>
          ${this.messages.length > 0 ? `
            <button class="iconbtn" id="btnClearChat" type="button" aria-label="${isEn ? 'Clear chat history' : 'Bersihkan riwayat percakapan'}" title="${isEn ? 'Clear chat history' : 'Bersihkan Percakapan'}" style="height:42px; min-width:42px; border-radius:12px; font-size:14px;">🗑️</button>
          ` : ''}
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    // Tombol Tutup Dialog
    const btnClose = this.modalEl.querySelector('#btnAiCloseModal');
    if (btnClose) btnClose.addEventListener('click', () => this.close());

    // Toggle Settings Drawer
    const btnToggleSettings = this.modalEl.querySelector('#btnAiToggleSettings');
    if (btnToggleSettings) {
      btnToggleSettings.addEventListener('click', () => {
        this.showSettings = !this.showSettings;
        this.statusMessage = null;
        this.render();
      });
    }

    // Toggle Password Visibility
    const btnToggleVis = this.modalEl.querySelector('#btnToggleKeyVisibility');
    const inputApiKey = this.modalEl.querySelector('#inputApiKey');
    if (btnToggleVis && inputApiKey) {
      btnToggleVis.addEventListener('click', () => {
        inputApiKey.type = inputApiKey.type === 'password' ? 'text' : 'password';
      });
    }

    // Simpan Konfigurasi (GAS URL + Direct Key + Model)
    const btnSaveConfig = this.modalEl.querySelector('#btnSaveConfig');
    const inputGasUrl = this.modalEl.querySelector('#inputGasUrl');
    const selectModel = this.modalEl.querySelector('#selectModel');
    if (btnSaveConfig) {
      btnSaveConfig.addEventListener('click', () => {
        if (inputGasUrl) this.setGasUrl(inputGasUrl.value);
        if (inputApiKey) this.setApiKey(inputApiKey.value);
        if (selectModel) this.setModel(selectModel.value);
        this.statusMessage = { type: 'success', text: `✅ Pengaturan tersimpan! Backend: ${this.getBackendStatus().label}` };
        setTimeout(() => {
          this.showSettings = false;
          this.statusMessage = null;
          this.render();
        }, 1200);
        this.render();
      });
    }

    // Tes Koneksi
    const btnTest = this.modalEl.querySelector('#btnTestConnection');
    if (btnTest) {
      btnTest.addEventListener('click', () => {
        if (inputGasUrl && inputGasUrl.value.trim()) this.setGasUrl(inputGasUrl.value.trim());
        if (inputApiKey && inputApiKey.value.trim()) this.setApiKey(inputApiKey.value.trim());
        if (selectModel) this.setModel(selectModel.value);
        this.testConnection();
      });
    }

    // Hapus GAS URL
    const btnClearGas = this.modalEl.querySelector('#btnClearGas');
    if (btnClearGas) {
      btnClearGas.addEventListener('click', () => {
        this.setGasUrl('');
        this.statusMessage = { type: 'info', text: 'URL Web App GAS dihapus.' };
        this.render();
      });
    }

    // Hapus API Key
    const btnClearKey = this.modalEl.querySelector('#btnClearKey');
    if (btnClearKey) {
      btnClearKey.addEventListener('click', () => {
        this.setApiKey('');
        this.statusMessage = { type: 'info', text: 'API Key lokal dihapus.' };
        this.render();
      });
    }

    // Kirim Pesan
    const btnSend = this.modalEl.querySelector('#btnAiSend');
    const inputUser = this.modalEl.querySelector('#aiUserInput');
    const doSend = () => {
      if (inputUser && inputUser.value.trim()) {
        const q = inputUser.value.trim();
        inputUser.value = '';
        this.sendQuestion(q);
      }
    };

    if (btnSend) btnSend.addEventListener('click', doSend);
    if (inputUser) {
      inputUser.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSend();
      });
    }

    // Quick Starter Chips
    const starterChips = this.modalEl.querySelectorAll('.starter-q-chip');
    starterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        this.sendQuestion(q);
      });
    });

    // Tombol Mic Input Suara
    const btnMic = this.modalEl.querySelector('#btnAiVoiceMic');
    if (btnMic) {
      btnMic.addEventListener('click', () => {
        this.toggleVoice();
      });
    }

    // Tombol Read-Aloud TTS pada Balon Jawaban AI
    const ttsBtns = this.modalEl.querySelectorAll('.btn-bubble-tts');
    ttsBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-tts-idx'), 10);
        const m = this.messages[idx];
        if (m && m.text) {
          TtsEngine.speak(m.text, 'id', btn);
        }
      });
    });

    // Bersihkan Chat
    const btnClearChat = this.modalEl.querySelector('#btnClearChat');
    if (btnClearChat) {
      btnClearChat.addEventListener('click', () => {
        if (confirm('Bersihkan percakapan ini dan mulai dari awal?')) {
          this.messages = [];
          this.render();
        }
      });
    }
  }
}

function Logger_warn(...args) {
  if (typeof console !== 'undefined' && console.warn) {
    console.warn(...args);
  }
}
