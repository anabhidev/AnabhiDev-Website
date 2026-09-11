// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · AI Tutor Modal Component
// Development · Anabhi Dev
// Version   : 2.3 (Gemini 1.5 Flash Cloudflare & Local Key Support)
// ================================================================

import { appState } from '../state.js';
import { t } from '../data/i18n.js';

export class AiTutorModalComponent {
  constructor() {
    this.modalEl = null;
    this.messages = [];
    this.isLoading = false;
    this.initModal();
  }

  initModal() {
    let el = document.getElementById('aiTutorModal');
    if (!el) {
      el = document.createElement('div');
      el.id = 'aiTutorModal';
      el.className = 'video-modal-overlay';
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
  }

  open(initialPrompt = '') {
    this.render();
    this.modalEl.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    if (initialPrompt && initialPrompt.trim()) {
      this.sendQuestion(initialPrompt.trim());
    }
  }

  close() {
    this.modalEl.style.display = 'none';
    document.body.style.overflow = '';
  }

  getApiKey() {
    return localStorage.getItem('anabhi_gemini_api_key') || '';
  }

  setApiKey(key) {
    if (key && key.trim()) {
      localStorage.setItem('anabhi_gemini_api_key', key.trim());
    } else {
      localStorage.removeItem('anabhi_gemini_api_key');
    }
  }

  async sendQuestion(questionText) {
    if (!questionText || this.isLoading) return;

    const state = appState.get();
    const currentSub = state.currentSubjectId || 'Umum';

    this.messages.push({ role: 'user', text: questionText });
    this.isLoading = true;
    this.render();

    try {
      let reply = '';
      const localKey = this.getApiKey();

      // Coba panggil Cloudflare Pages Function /api/ai-tutor bila ada atau bila tanpa local key
      if (!localKey && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
        try {
          const cfResp = await fetch('/api/ai-tutor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              prompt: questionText,
              subject: currentSub,
              studentGrade: 'Kelas 1 SD'
            })
          });
          if (cfResp.ok) {
            const data = await cfResp.json();
            reply = data.reply;
          }
        } catch (e) {
          // Cloudflare endpoint not available or local testing
        }
      }

      // Jika belum terjawab dan ada localKey, panggil langsung Google Gemini API
      if (!reply && localKey) {
        const sysMsg = 'Kamu adalah Kakak Belajar Pintar dari Anabhi Dev Smart Study untuk siswa SD. Berikan penjelasan yang ramah, santun, ceria, edukatif dengan analogi sederhana. JANGAN langsung membocorkan jawaban soal ujian, melainkan pandu langkah berpikirnya. Mata pelajaran: ' + currentSub;
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${localKey}`;
        
        const gResp = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              { role: 'user', parts: [{ text: `${sysMsg}\n\nPertanyaan Anak: "${questionText}"` }] }
            ],
            generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
          })
        });

        if (gResp.ok) {
          const gData = await gResp.json();
          reply = gData.candidates?.[0]?.content?.parts?.[0]?.text;
        } else {
          const errText = await gResp.text();
          throw new Error('Gemini API Error: ' + errText);
        }
      }

      if (!reply) {
        reply = `Halo Sahabat Juara! 🌟 Untuk mengaktifkan Kakak Belajar AI:
1. **Di Cloudflare Pages**: Tambahkan Environment Variable 'GEMINI_API_KEY' di Cloudflare Dashboard (Settings ➔ Environment variables).
2. **Di Komputer Lokal**: Klik tombol ⚙️ Pengaturan di pojok atas dialog ini dan masukkan Gemini API Key milikmu.

Kakak siap membantu menjelaskan materi pelajaran apa saja!`;
      }

      this.messages.push({ role: 'ai', text: reply });
    } catch (err) {
      this.messages.push({
        role: 'ai',
        text: 'Wah, terjadi kendala saat menghubungi AI: ' + err.message + '. Silakan periksa koneksi internet atau Gemini API Key.'
      });
    } finally {
      this.isLoading = false;
      this.render();
      const chatBox = this.modalEl.querySelector('#aiChatHistory');
      if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
    }
  }

  render() {
    const state = appState.get();
    const lang = state.lang || 'id';
    const isEn = lang === 'en';
    const apiKey = this.getApiKey();

    this.modalEl.innerHTML = `
      <div class="video-modal-dialog" style="max-width:680px; width:92%; max-height:88vh; display:flex; flex-direction:column; padding:0; overflow:hidden; border-radius:24px; border:2px solid var(--teal);">
        <!-- Modal Header -->
        <div style="background:var(--navy); color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:26px;">🤖</span>
            <div>
              <h3 style="margin:0; font-size:17px; font-weight:850; color:#fff;">
                ${isEn ? 'Smart AI Tutor — Ask Anything!' : 'Kakak Belajar Pintar — Tanya Seputar Pelajaran'}
              </h3>
              <span style="font-size:11.5px; opacity:0.85;">Powered by Google Gemini · Anabhi Dev Smart Study</span>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="iconbtn" id="btnAiSettingsToggle" type="button" title="Pengaturan API Key" style="background:rgba(255,255,255,0.15); color:#fff; border-radius:10px; width:34px; height:34px;">⚙️</button>
            <button class="btn-close-modal" id="btnAiClose" type="button" aria-label="Tutup" style="color:#fff; font-size:22px; width:34px; height:34px; border:none; background:transparent; cursor:pointer;">✕</button>
          </div>
        </div>

        <!-- Panel Pengaturan API Key (Tersembunyi secara default) -->
        <div id="aiSettingsPanel" style="display:none; background:var(--surface); border-bottom:1px solid var(--line); padding:16px 24px;">
          <h4 style="margin:0 0 6px; font-size:13px; font-weight:800; color:var(--ink);">🔑 Pengaturan Gemini API Key</h4>
          <p style="margin:0 0 10px; font-size:12px; color:var(--muted); line-height:1.5;">
            Di Cloudflare Pages, kunci aman disimpan di <strong>Environment Variables (GEMINI_API_KEY)</strong>. Untuk testing di komputer lokal, Kakak bisa memasukkan API Key di bawah:
          </p>
          <div style="display:flex; gap:8px;">
            <input type="password" id="inputLocalGeminiKey" placeholder="Tempel AIzaSy... API Key di sini" value="${apiKey}" style="flex:1; padding:8px 12px; border-radius:10px; border:1px solid var(--line); font-size:12.5px; background:var(--card); color:var(--ink);">
            <button class="btn primary" id="btnSaveLocalKey" type="button" style="padding:6px 14px; font-size:12px;">Simpan Kunci</button>
          </div>
        </div>

        <!-- Chat History -->
        <div id="aiChatHistory" style="flex:1; overflow-y:auto; padding:20px 24px; display:flex; flex-direction:column; gap:16px; min-height:240px; max-height:420px; background:var(--card);">
          ${this.messages.length === 0 ? `
            <div style="text-align:center; padding:30px 10px; color:var(--muted);">
              <span style="font-size:42px; display:block; margin-bottom:12px;">🌟</span>
              <strong style="display:block; font-size:16px; color:var(--ink); margin-bottom:6px;">
                ${isEn ? 'Hello! What do you want to learn today?' : 'Halo Sobat Juara! Mau tanya apa hari ini?'}
              </strong>
              <p style="font-size:13px; margin:0 0 16px; line-height:1.6;">
                ${isEn ? 'I can explain math tricks, nature wonders, history, or help guide your homework step by step!' : 'Kakak AI siap membimbingmu memahami cara cepat berhitung, mengenal rahasia alam bumi, cerita rakyat, dan konsep pelajaran!'}
              </p>

              <!-- Quick starter chips -->
              <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px;">
                <button class="region-chip starter-q-chip" data-q="Jelasin dong kak trik berhitung cepat 67 + 59!" type="button" style="font-size:12px;">
                  🧮 Trik 67 + 59
                </button>
                <button class="region-chip starter-q-chip" data-q="Kenapa bumi berbentuk bola dan tampak biru dari luar angkasa?" type="button" style="font-size:12px;">
                  🌍 Kenapa Bumi Bulat?
                </button>
                <button class="region-chip starter-q-chip" data-q="Apa saja tradisi unik dan tempat terkenal di Pulau Bali?" type="button" style="font-size:12px;">
                  🏝️ Budaya Pulau Bali
                </button>
                <button class="region-chip starter-q-chip" data-q="Bagaimana cara menyusun kalimat S-P-O yang benar?" type="button" style="font-size:12px;">
                  📖 Pola Kalimat S-P-O
                </button>
              </div>
            </div>
          ` : ''}

          ${this.messages.map(m => `
            <div style="display:flex; gap:10px; align-items:flex-start; ${m.role === 'user' ? 'justify-content:flex-end;' : 'justify-content:flex-start;'}">
              ${m.role === 'ai' ? '<span style="font-size:24px;">🤖</span>' : ''}
              <div style="max-width:82%; padding:12px 16px; border-radius:18px; font-size:13.5px; line-height:1.65; ${
                m.role === 'user' 
                  ? 'background:var(--teal); color:#071a2b; font-weight:600; border-bottom-right-radius:4px;' 
                  : 'background:var(--surface); color:var(--ink); border:1px solid var(--line); border-bottom-left-radius:4px; white-space:pre-wrap;'
              }">
                ${m.text}
              </div>
              ${m.role === 'user' ? '<span style="font-size:24px;">🧒</span>' : ''}
            </div>
          `).join('')}

          ${this.isLoading ? `
            <div style="display:flex; gap:10px; align-items:center;">
              <span style="font-size:24px;">🤖</span>
              <div style="background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:10px 18px; font-size:13px; color:var(--muted);">
                ✨ Kakak AI sedang merangkai penjelasan ceria...
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Chat Input Bar -->
        <div style="padding:14px 20px; background:var(--surface); border-top:1px solid var(--line); display:flex; gap:10px; align-items:center;">
          <input type="text" id="aiUserInput" placeholder="${isEn ? 'Ask a question about your lesson...' : 'Ketik pertanyaan belajarmu di sini...'}" style="flex:1; padding:10px 16px; border-radius:14px; border:1px solid var(--line); font-size:13.5px; background:var(--card); color:var(--ink);">
          <button class="btn primary" id="btnAiSend" type="button" style="padding:10px 18px; font-weight:800; font-size:13px;">
            ${isEn ? 'Send 🚀' : 'Kirim 🚀'}
          </button>
        </div>
      </div>
    `;

    this.attachEvents();
  }

  attachEvents() {
    const btnClose = this.modalEl.querySelector('#btnAiClose');
    if (btnClose) btnClose.addEventListener('click', () => this.close());

    const btnSettings = this.modalEl.querySelector('#btnAiSettingsToggle');
    const settingsPanel = this.modalEl.querySelector('#aiSettingsPanel');
    if (btnSettings && settingsPanel) {
      btnSettings.addEventListener('click', () => {
        settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
      });
    }

    const btnSaveKey = this.modalEl.querySelector('#btnSaveLocalKey');
    const inputKey = this.modalEl.querySelector('#inputLocalGeminiKey');
    if (btnSaveKey && inputKey) {
      btnSaveKey.addEventListener('click', () => {
        this.setApiKey(inputKey.value);
        alert('Kunci Gemini API berhasil disimpan!');
        settingsPanel.style.display = 'none';
      });
    }

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

    const starterChips = this.modalEl.querySelectorAll('.starter-q-chip');
    starterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const q = chip.getAttribute('data-q');
        this.sendQuestion(q);
      });
    });
  }
}
