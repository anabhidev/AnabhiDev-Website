// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · AI Tutor Modal Component
// Development · Anabhi Dev
// Version   : 2.5 (Gemini 3.5 Flash-Lite & Pop-Up Interactive Dialog)
// ================================================================

import { appState } from '../state.js';
import { t } from '../data/i18n.js';

export var GEMINI_CONFIG = {
  MODEL    : 'gemini-3.5-flash-lite',
  ENDPOINT : 'https://generativelanguage.googleapis.com/v1beta/models/'
};

if (typeof window !== 'undefined') {
  window.GEMINI_CONFIG = window.GEMINI_CONFIG || GEMINI_CONFIG;
}

export class AiTutorModalComponent {
  constructor() {
    this.modalEl = null;
    this.messages = [];
    this.isLoading = false;
    this.showSettings = false;
    this.statusMessage = null;
    this.initModal();
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
    // Trigger reflow for smooth transition
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
    this.modalEl.classList.remove('active');
    setTimeout(() => {
      if (!this.modalEl.classList.contains('active')) {
        this.modalEl.style.display = 'none';
      }
    }, 220);
    document.body.style.overflow = '';
  }

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

  async testConnection() {
    const key = this.getApiKey();
    if (!key) {
      this.statusMessage = { type: 'error', text: 'Kunci API belum diisi. Masukkan API Key terlebih dahulu!' };
      this.render();
      return;
    }

    const endpoint = this.getEndpoint().replace(/\/?$/, '/');
    const model = this.getModel();
    const url = `${endpoint}${model}:generateContent?key=${key}`;

    this.statusMessage = { type: 'info', text: `Menghubungkan ke ${model}...` };
    this.render();

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: 'Jawab satu kata saja: "Aktif!"' }] }],
          generationConfig: { maxOutputTokens: 20 }
        })
      });

      if (resp.ok) {
        this.statusMessage = { type: 'success', text: `✅ Berhasil! Model "${model}" aktif dan siap digunakan.` };
      } else {
        const errJson = await resp.json().catch(() => ({}));
        const msg = errJson.error?.message || `HTTP ${resp.status}`;
        this.statusMessage = { type: 'error', text: `❌ Gagal: ${msg}` };
      }
    } catch (e) {
      this.statusMessage = { type: 'error', text: `❌ Kendala Jaringan: ${e.message}` };
    }
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
      const localKey = this.getApiKey();

      // 1. Coba Cloudflare Function /api/ai-tutor jika di-host di Cloudflare Pages dan tanpa key lokal
      if (!localKey && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
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
        } catch (e) {
          // Cloudflare function fallback
        }
      }

      // 2. Jika ada localKey, panggil langsung Google Gemini API menggunakan GEMINI_CONFIG
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
          throw new Error(`Google Gemini API (${gResp.status}): ${errText}`);
        }
      }

      if (!reply) {
        reply = `Halo Sahabat Juara! 🌟 Untuk mengaktifkan Kakak Belajar AI:

1. Klik tombol **🔑 Masukkan API Key** di atas chat ini.
2. Tempelkan Google Gemini API Key milik Kakak (bisa didapatkan gratis di [Google AI Studio](https://aistudio.google.com)).
3. Model default yang digunakan adalah **${this.getModel()}**.

Setelah tersimpan, Kakak siap menjawab dan menemani belajar kapan saja!`;
      }

      this.messages.push({ role: 'ai', text: reply });
    } catch (err) {
      this.messages.push({
        role: 'ai',
        text: `Wah, terjadi kendala saat menghubungi Kakak AI: ${err.message}. Silakan periksa koneksi internet atau Gemini API Key milikmu.`
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
    const apiKey = this.getApiKey();
    const currentModel = this.getModel();
    const currentEndpoint = this.getEndpoint();
    const hasKey = Boolean(apiKey);

    this.modalEl.innerHTML = `
      <div class="ai-modal-dialog">
        <!-- Modal Header Mewah & Status Model -->
        <div class="ai-modal-header">
          <div class="ai-header-info">
            <span class="ai-avatar-badge">🤖</span>
            <div class="ai-header-titles">
              <h3 class="ai-header-title">
                ${isEn ? 'Smart AI Tutor — Study Companion' : 'Kakak Belajar Pintar — Tanya AI'}
                <span class="ai-model-pill">${currentModel}</span>
              </h3>
              <div class="ai-header-subtitle">
                ${hasKey ? '🟢 Siap Membimbing · Powered by Google Gemini' : '🟡 Masukkan API Key untuk Mengaktifkan'}
              </div>
            </div>
          </div>

          <div class="ai-header-actions">
            <button class="ai-btn-header" id="btnAiToggleSettings" type="button" title="Pengaturan Kunci API & Model">
              ⚙️ <span>${hasKey ? 'Pengaturan' : 'Input Key'}</span>
            </button>
            <button class="ai-btn-close" id="btnAiCloseModal" type="button" aria-label="Tutup Dialog">✕</button>
          </div>
        </div>

        <!-- Panel Pengaturan API Key & Model (Collapsible) -->
        <div class="ai-settings-drawer" id="aiSettingsDrawer" style="display: ${this.showSettings ? 'flex' : 'none'};">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h4 class="ai-settings-title">🔑 Konfigurasi Google Gemini API</h4>
            ${hasKey ? `<button class="btn" id="btnClearKey" type="button" style="padding:4px 10px; font-size:11px; background:#ef4444; color:#fff; border:none; border-radius:8px;">Hapus Kunci</button>` : ''}
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

          <div class="ai-settings-grid">
            <div>
              <label class="ai-field-label" for="inputApiKey">Gemini API Key (AIzaSy...):</label>
              <div class="ai-input-with-action">
                <input class="ai-input" id="inputApiKey" type="password" placeholder="Tempel API Key di sini..." value="${apiKey}">
                <button class="btn" id="btnToggleKeyVisibility" type="button" style="padding:6px 10px; font-size:12px;" title="Lihat/Sembunyikan">👁️</button>
              </div>
            </div>

            <div>
              <label class="ai-field-label" for="selectModel">Pilihan Model Gemini:</label>
              <select class="ai-input" id="selectModel" style="cursor:pointer;">
                <option value="gemini-3.5-flash-lite" ${currentModel === 'gemini-3.5-flash-lite' ? 'selected' : ''}>gemini-3.5-flash-lite (Rekomendasi Utama Cepat &amp; Hemat)</option>
                <option value="gemini-2.5-flash-lite" ${currentModel === 'gemini-2.5-flash-lite' ? 'selected' : ''}>gemini-2.5-flash-lite (Sangat Cepat)</option>
                <option value="gemini-2.0-flash" ${currentModel === 'gemini-2.0-flash' ? 'selected' : ''}>gemini-2.0-flash (Multimodal Serbaguna)</option>
                <option value="gemini-1.5-flash" ${currentModel === 'gemini-1.5-flash' ? 'selected' : ''}>gemini-1.5-flash (Versi Sebelumnya)</option>
              </select>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:4px;">
            <div style="font-size:11.5px; color:var(--muted);">
              Belum punya API key? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color:var(--teal); font-weight:700; text-decoration:underline;">Dapatkan gratis di Google AI Studio ↗</a>
            </div>
            <div style="display:flex; gap:8px;">
              <button class="btn" id="btnTestConnection" type="button" style="padding:6px 12px; font-size:12px;">🧪 Tes Koneksi</button>
              <button class="btn primary" id="btnSaveConfig" type="button" style="padding:6px 16px; font-size:12px; font-weight:800;">Simpan Pengaturan</button>
            </div>
          </div>
        </div>

        <!-- Chat History Area -->
        <div class="ai-chat-history" id="aiChatHistory">
          <!-- Setup Banner jika Belum Ada API Key -->
          ${!hasKey ? `
            <div class="ai-setup-card">
              <h4 class="ai-setup-title">
                <span>🔑</span> ${isEn ? 'Enter Gemini API Key to Start' : 'Masukkan Google Gemini API Key'}
              </h4>
              <p class="ai-setup-desc">
                ${isEn 
                  ? 'To activate the interactive AI Tutor with <strong>gemini-3.5-flash-lite</strong>, enter your Gemini API Key below. The key is securely stored in your local browser.' 
                  : 'Untuk mengaktifkan Kakak Belajar Pintar menggunakan model <strong>gemini-3.5-flash-lite</strong>, masukkan API Key Anda di bawah ini. Kunci tersimpan secara lokal dan aman di browser Kakak.'}
              </p>
              <div class="ai-setup-input-wrap">
                <input class="ai-input" id="inputSetupKey" type="password" placeholder="Tempel AIzaSy... API Key di sini">
                <button class="btn primary" id="btnSaveSetupKey" type="button" style="padding:8px 18px; font-weight:800; font-size:12.5px;">
                  Simpan &amp; Aktifkan 🚀
                </button>
              </div>
              <div style="font-size:11.5px; color:var(--muted);">
                Gratis dan cepat! Dapatkan kunci di <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style="color:var(--teal); font-weight:700; text-decoration:underline;">Google AI Studio (aistudio.google.com) ↗</a>
              </div>
            </div>
          ` : ''}

          <!-- Empty State & Pertanyaan Pembuka -->
          ${this.messages.length === 0 ? `
            <div class="ai-empty-state">
              <span class="ai-empty-star">🌟</span>
              <strong class="ai-empty-title">
                ${isEn ? 'Hello Champion! What do you want to explore today?' : 'Halo Sahabat Juara! Mau tanya apa hari ini?'}
              </strong>
              <p class="ai-empty-desc">
                ${isEn
                  ? 'Ask about quick math methods ("One Problem, Many Ways"), geography facts, science wonders, or Indonesian language!'
                  : 'Kakak AI siap membimbingmu memahami trik cepat berhitung 14 jurus ("Satu Soal Banyak Cara"), peta nusantara, bumi dan antariksa, hingga cerita rakyat!'}
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
          ${this.messages.map(m => `
            <div class="ai-msg-row ${m.role}">
              ${m.role === 'ai' ? '<span class="ai-msg-avatar">🤖</span>' : ''}
              <div class="ai-bubble ${m.role}">
                ${m.role === 'ai' ? this.formatMarkdown(m.text) : m.text}
              </div>
              ${m.role === 'user' ? '<span class="ai-msg-avatar">🧒</span>' : ''}
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
          <input class="ai-input" id="aiUserInput" type="text" placeholder="${isEn ? 'Ask a question about your lesson...' : 'Ketik pertanyaan belajarmu di sini...'}" autocomplete="off">
          <button class="btn primary ai-btn-send" id="btnAiSend" type="button">
            ${isEn ? 'Send 🚀' : 'Kirim 🚀'}
          </button>
          ${this.messages.length > 0 ? `
            <button class="iconbtn" id="btnClearChat" type="button" title="Bersihkan Percakapan" style="height:42px; min-width:42px; border-radius:12px; font-size:14px;">🗑️</button>
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

    // Simpan Konfigurasi dari Drawer
    const btnSaveConfig = this.modalEl.querySelector('#btnSaveConfig');
    const selectModel = this.modalEl.querySelector('#selectModel');
    if (btnSaveConfig) {
      btnSaveConfig.addEventListener('click', () => {
        if (inputApiKey) this.setApiKey(inputApiKey.value);
        if (selectModel) this.setModel(selectModel.value);
        this.statusMessage = { type: 'success', text: `✅ Pengaturan berhasil disimpan! Model: ${this.getModel()}` };
        setTimeout(() => {
          this.showSettings = false;
          this.statusMessage = null;
          this.render();
        }, 1200);
        this.render();
      });
    }

    // Tes Koneksi API
    const btnTest = this.modalEl.querySelector('#btnTestConnection');
    if (btnTest) {
      btnTest.addEventListener('click', () => {
        if (inputApiKey && inputApiKey.value.trim()) {
          this.setApiKey(inputApiKey.value.trim());
        }
        if (selectModel) this.setModel(selectModel.value);
        this.testConnection();
      });
    }

    // Hapus API Key
    const btnClearKey = this.modalEl.querySelector('#btnClearKey');
    if (btnClearKey) {
      btnClearKey.addEventListener('click', () => {
        if (confirm('Apakah Kakak yakin ingin menghapus API Key yang tersimpan?')) {
          this.setApiKey('');
          this.statusMessage = { type: 'info', text: 'Kunci API telah dihapus.' };
          this.render();
        }
      });
    }

    // Simpan dari Setup Card Utama
    const btnSaveSetup = this.modalEl.querySelector('#btnSaveSetupKey');
    const inputSetupKey = this.modalEl.querySelector('#inputSetupKey');
    if (btnSaveSetup && inputSetupKey) {
      btnSaveSetup.addEventListener('click', () => {
        const val = inputSetupKey.value.trim();
        if (!val) {
          alert('Silakan masukkan atau tempel Gemini API Key terlebih dahulu!');
          return;
        }
        this.setApiKey(val);
        this.render();
      });
      inputSetupKey.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') btnSaveSetup.click();
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
