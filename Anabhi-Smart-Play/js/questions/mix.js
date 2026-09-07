// ================================================================
// AnabhiDev-ASP — Anabhi Smart Play
// JavaScript · Bank soal — Mix Challenge
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 7 September 2026, 10:02:44
// ================================================================

// ══════════════════════════════════════════════════════════
// ██████════  BANK SOAL — MIX CHALLENGE  ══█████████████
// Gabungkan dari semua 7 builder, proporsi merata
// ══════════════════════════════════════════════════════════
function buildMixBank(n){
  const each=Math.ceil(n/7);
  const all=[
    ...buildMathBank(each),
    ...buildFunBank(each),
    ...buildBindoBank(each),
    ...buildBingBank(each),
    ...buildSainsBank(each),
    ...buildSeniBank(each),
    ...buildLogikaBank(each),
  ].sort(()=>Math.random()-.5);
  return all.slice(0,n);
}
