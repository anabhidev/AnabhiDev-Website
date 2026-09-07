const __app=require('./loadapp');
const fs=require('fs'),vm=require('vm');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
const html=fs.readFileSync(W+'index.html','utf8');
const __cssAll=__app.appCSS();
let fail=0; const ok=(c,m)=>{console.log((c?'  OK  ':'  FAIL')+'  '+m); if(!c)fail++;};

console.log('── 1. SYNTAX ──');
// semua blok <script> inline
const scripts=[__app.appJS()];
console.log('  blok <script> inline:',scripts.length);
scripts.forEach((s,i)=>{
  try{ new vm.Script(s); ok(true,`script #${i+1} parse bersih (${s.split('\n').length} baris)`); }
  catch(e){ ok(false,`script #${i+1}: ${e.message}`); }
});
try{ new vm.Script(fs.readFileSync(W+'sw.js','utf8')); ok(true,'sw.js parse bersih'); }catch(e){ ok(false,'sw.js: '+e.message); }
try{ JSON.parse(fs.readFileSync(W+'manifest.json','utf8')); ok(true,'manifest.json JSON valid'); }catch(e){ ok(false,'manifest.json: '+e.message); }

console.log('── 2. KOMENTAR HTML SEIMBANG (Standar 8.6) ──');
ok((html.match(/<!--/g)||[]).length===(html.match(/-->/g)||[]).length,
   `<!-- = ${(html.match(/<!--/g)||[]).length}, --> = ${(html.match(/-->/g)||[]).length}`);
ok((html.match(/^\s*Version\s*:/gm)||[]).length===1,'hanya 1 baris "Version :" (tak ada sisa header lama)');
ok((html.match(/^\s*Generated\s*:/gm)||[]).length===1,'hanya 1 baris "Generated :"');

console.log('── 3. NOL CDN PIHAK KETIGA (SOP 18.12 / 9.7) ──');
const cdn=[...html.matchAll(/https?:\/\/[^"'\s)]+/g)].map(m=>m[0])
  .filter(u=>!u.includes('script.google.com')&&!u.includes('www.w3.org'));
ok(cdn.length===0, cdn.length? 'MASIH ADA: '+cdn.join(' , ') : 'tidak ada URL eksternal selain GAS');
ok(!/i\.ibb\.co/.test(html),'nol referensi i.ibb.co');
ok(!/fonts\.(googleapis|gstatic)/.test(html),'nol Google Fonts');
ok(!/cdn\.jsdelivr/.test(html),'nol jsdelivr');

console.log('── 4. ATURAN PWA ──');
ok(!/beforeinstallprompt[\s\S]{0,400}?preventDefault/.test(html),'TIDAK ada preventDefault() pada beforeinstallprompt (SOP 18.6)');
ok(/deferredPrompt\.prompt\(\)/.test(__app.appJS())&&/catch\s*\(\s*err\s*\)/.test(__app.appJS()),'prompt() dibungkus try/catch');
ok(/display-mode: standalone/.test(__app.appJS()),'penanda display-mode terpasang (SOP 18.7)');
ok(!/user-scalable\s*=\s*no/.test(html),'user-scalable=no sudah dihapus');
const mf=JSON.parse(fs.readFileSync(W+'manifest.json','utf8'));
ok(!('id' in mf),'manifest TANPA field id');
ok(mf.icons.every(i=>!i.src.includes('?')),'nol "?v=" pada URL ikon');
ok(mf.icons.every(i=>i.src.startsWith('/')),'path ikon absolut');
ok(mf.start_url.startsWith(mf.scope),'start_url berada di dalam scope');
ok(mf.icons.some(i=>i.purpose==='maskable'),'ada ikon maskable');
const sw=fs.readFileSync(W+'sw.js','utf8');
ok(/addEventListener\('fetch'/.test(sw),'sw.js punya fetch handler');
// Dulu string versinya dipatok mati di sini, jadi setiap kenaikan versi bikin
// tes ini merah tanpa ada yang salah. Sekarang yang diperiksa ATURANNYA:
// nama cache wajib mengikuti versi aplikasi, dan ?v= wajib sama di index & sw.
const mVer=html.match(/Version\s*:\s*(\d+)\.(\d+)/);
const mCache=sw.match(/CACHE_VERSION\s*=\s*'([^']+)'/);
ok(!!mCache,'CACHE_VERSION ada');
ok(mCache && mCache[1]==='anabhi-smart-play-v'+mVer[1]+'-'+mVer[2],
   'CACHE_VERSION ikut versi index.html ('+(mCache?mCache[1]:'-')+')');
const vHtml=(html.match(/\?v=([0-9a-z]+)/)||[])[1];
const vSw  =(sw.match(/var V\s*=\s*'\?v=([0-9a-z]+)'/)||[])[1];
ok(vHtml&&vHtml===vSw,'cache-buster ?v= sama di index.html & sw.js ('+vHtml+')');
const badge=(html.match(/class="version">v([0-9.]+)/)||[])[1];
ok(badge===mVer[1]+'.'+mVer[2],'penanda v'+badge+' di layar cocok dengan header');
ok(/SKIP_WAITING/.test(sw)&&/clients\.claim/.test(sw),'SKIP_WAITING + clients.claim ada');

console.log('── 5. SEMUA BERKAS YANG DIRUJUK BENAR-BENAR ADA ──');
const refs=new Set();
for(const m of html.matchAll(/(?:href|src)="((?!https?:|data:|#|\$)[^"]+)"/g)) refs.add(m[1]);
for(const m of html.matchAll(/url\('([^']+)'\)/g)) refs.add(m[1]);
[...refs].sort().forEach(r=>{const f=r.split('?')[0];ok(fs.existsSync(W+f), 'ada: '+f);});

console.log('── 6. PRECACHE sw.js COCOK DENGAN BERKAS NYATA ──');
const BASE='/Anabhi-Smart-Play/';
const ctx={self:{addEventListener(){},location:{origin:'https://anabhidev.com',href:'https://anabhidev.com/Anabhi-Smart-Play/sw.js'},skipWaiting(){},clients:{claim(){}}},caches:{open(){},keys(){},match(){},delete(){}},URL,Request,fetch(){},Promise};
vm.createContext(ctx); vm.runInContext(sw.replace(/self\.addEventListener[\s\S]*$/,''),ctx);
const pre=ctx.PRECACHE;
let miss=[];
pre.forEach(u=>{ const rel=u.slice(BASE.length).split('?')[0]; if(rel==='') return; if(!fs.existsSync(W+rel)) miss.push(u); });
ok(miss.length===0, miss.length? 'HILANG: '+miss.join(' , ') : `${pre.length} entri precache, semua berkasnya ada`);

// emoji di markup statis harus 100% tercakup precache
const preEmoji=new Set(pre.filter(u=>u.includes('/twemoji/svg/')).map(u=>u.split('/').pop().replace('.svg','')));
const needed=fs.readFileSync('emoji-used.txt','utf8').trim().split('\n');
const notPre=needed.filter(c=>!preEmoji.has(c));
ok(notPre.length===0, notPre.length? 'emoji tak diprecache: '+notPre.join(' ') : `${needed.length} emoji markup statis semuanya diprecache`);
const onDisk=fs.readdirSync(W+'assets/twemoji/svg').map(f=>f.replace('.svg',''));
ok(onDisk.length===preEmoji.size,`berkas SVG di disk (${onDisk.length}) = entri precache (${preEmoji.size}) — nol berkas mubazir`);

console.log('\n'+(fail===0?'✅ SEMUA PEMERIKSAAN LOLOS':'❌ '+fail+' PEMERIKSAAN GAGAL'));
process.exit(fail?1:0);
