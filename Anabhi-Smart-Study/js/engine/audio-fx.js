// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Child Educational Sound Effects & Confetti
// Development · Anabhi Dev
// Version   : 1.0 (Web Audio API Synthesizer, 100% Offline & Lightweight)
// ================================================================

export const AudioFx = {
  ctx: null,

  getContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  },

  // Nada ceria sukses (Ting-Ting!)
  playSuccess() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      // Nada 1: C5 (523.25 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.25);

      // Nada 2: G5 (783.99 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(783.99, now + 0.12);
      gain2.gain.setValueAtTime(0.2, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.45);
    } catch (e) {}
  },

  // Nada lembut mencoba lagi (Bumb-boing bersahabat tanpa mengecewakan anak)
  playGentleWrong() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(349.23, now); // F4
      osc.frequency.exponentialRampToValueAtTime(220.00, now + 0.28); // A3
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.28);
    } catch (e) {}
  },

  // Fanfare juara saat menyelesaikan kuis/topik
  playFanfare() {
    const ctx = this.getContext();
    if (!ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const now = ctx.currentTime;
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + (idx * 0.1);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.35);
      });
    } catch (e) {}
  },

  // Efek visual konfeti ceria di layar
  triggerConfetti(containerEl = document.body) {
    if (typeof document === 'undefined') return;
    const emojis = ['⭐', '🌟', '✨', '🎉', '🎈', '🏆', '💯', '🌸'];
    const count = 22;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'edu-confetti-particle';
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      const left = Math.random() * 92 + 4; // 4% - 96%
      const duration = (Math.random() * 1.2 + 1.2).toFixed(2); // 1.2s - 2.4s
      const delay = (Math.random() * 0.3).toFixed(2);
      const size = Math.floor(Math.random() * 14 + 18); // 18px - 32px

      el.style.cssText = `
        position: fixed;
        left: ${left}vw;
        bottom: -20px;
        font-size: ${size}px;
        pointer-events: none;
        z-index: 9999;
        animation: confettiFloatUp ${duration}s ease-out ${delay}s forwards;
      `;
      fragment.appendChild(el);

      setTimeout(() => {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, (parseFloat(duration) + parseFloat(delay) + 0.3) * 1000);
    }

    containerEl.appendChild(fragment);
  }
};

