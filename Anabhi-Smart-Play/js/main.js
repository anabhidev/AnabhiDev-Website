// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Titik masuk aplikasi
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

document.addEventListener('DOMContentLoaded',()=>{
  buildParticles(['⭐','🌟','💫','✨','🌙','☄️','🚀','🪐']);
  parseEmoji();
  setRunMode();
  initInstallUI();
  updateOutboxNote();
});
window.addEventListener('load',()=>{
  parseEmoji();
  initSW();
  outboxFlush();
});
