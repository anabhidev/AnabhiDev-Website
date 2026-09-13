// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Child-Friendly Text-to-Speech (TTS) Engine
// Development · Anabhi Dev
// Version   : 1.0 (Web Speech API Native, Zero Quota, 100% Offline)
// ================================================================

export const TtsEngine = {
  speaking: false,
  currentBtn: null,
  speechRate: 0.85, // Default ramah anak kelas 1 SD (0.85x santai & artikulatif)

  isSupported() {
    return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined';
  },

  setRate(rate) {
    this.speechRate = Math.max(0.7, Math.min(1.2, rate));
  },

  getRate() {
    return this.speechRate || 0.85;
  },

  toggleRate() {
    this.speechRate = (this.speechRate <= 0.88) ? 1.0 : 0.85;
    return this.speechRate;
  },

  speak(text, lang = 'id', btnEl = null, customRate = null) {
    if (!this.isSupported()) {
      console.warn('[TTS] Web Speech API tidak didukung di peramban ini.');
      return;
    }

    // Jika sedang membaca dan tombol yang sama diklik lagi -> STOP
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      if (this.currentBtn) {
        this.resetBtn(this.currentBtn);
      }
      if (this.currentBtn === btnEl) {
        this.currentBtn = null;
        this.speaking = false;
        return;
      }
    }

    if (!text || !text.trim()) return;

    // Bersihkan teks dari markup HTML sederhana jika ada
    const cleanText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const utter = new SpeechSynthesisUtterance(cleanText);

    // Konfigurasi bahasa dan vokal ramah anak SD
    const isEn = (lang === 'en');
    utter.lang = isEn ? 'en-US' : 'id-ID';
    const baseRate = customRate || this.speechRate || 0.85;
    utter.rate = isEn ? baseRate * 1.03 : baseRate; // Kecepatan artikulatif terkontrol
    utter.pitch = 1.08;              // Nada sedikit ceria bersahabat

    // Pilih suara optimal jika tersedia di browser
    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const targetLang = isEn ? 'en' : 'id';
        const match = voices.find(v => v.lang && v.lang.toLowerCase().startsWith(targetLang));
        if (match) utter.voice = match;
      }
    } catch (e) {}

    if (btnEl) {
      this.currentBtn = btnEl;
      if (!btnEl.getAttribute('data-original-html')) {
        btnEl.setAttribute('data-original-html', btnEl.innerHTML);
      }
      btnEl.classList.add('tts-speaking');
      btnEl.setAttribute('aria-label', isEn ? 'Stop reading' : 'Berhenti membaca');
      btnEl.innerHTML = '⏹️';
    }

    utter.onend = () => {
      if (btnEl) this.resetBtn(btnEl);
      this.currentBtn = null;
      this.speaking = false;
    };

    utter.onerror = () => {
      if (btnEl) this.resetBtn(btnEl);
      this.currentBtn = null;
      this.speaking = false;
    };

    this.speaking = true;
    window.speechSynthesis.speak(utter);
  },

  resetBtn(btn) {
    btn.classList.remove('tts-speaking');
    const orig = btn.getAttribute('data-original-html');
    if (orig) btn.innerHTML = orig;
    btn.setAttribute('aria-label', 'Dengarkan suara');
  },

  stop() {
    if (this.isSupported()) {
      window.speechSynthesis.cancel();
    }
    if (this.currentBtn) {
      this.resetBtn(this.currentBtn);
      this.currentBtn = null;
    }
    this.speaking = false;
  },

  initVoices() {
    if (this.isSupported()) {
      try {
        window.speechSynthesis.getVoices();
        if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
          window.speechSynthesis.onvoiceschanged = () => {
            try { window.speechSynthesis.getVoices(); } catch (e) {}
          };
        }
      } catch (e) {}
    }
  }
};

TtsEngine.initVoices();


