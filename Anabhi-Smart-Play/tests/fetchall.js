const __app=require('./loadapp');
const fs=require('fs'),vm=require('vm');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
const B='http://127.0.0.1:8787';
const html=fs.readFileSync(W+'index.html','utf8');
// resource yang browser minta saat memuat halaman
const urls=new Set(['/Anabhi-Smart-Play/','/Anabhi-Smart-Play/sw.js']);
for(const m of html.matchAll(/(?:href|src)="((?!https?:|data:|#|\$)[^"]+)"/g)) urls.add('/Anabhi-Smart-Play/'+m[1]);
for(const m of html.matchAll(/url\('([^']+)'\)/g)) urls.add('/Anabhi-Smart-Play/'+m[1]);
// + seluruh PRECACHE sw.js
const sw=fs.readFileSync(W+'sw.js','utf8');
const c={self:{addEventListener(){},location:{origin:'',href:'https://anabhidev.com/Anabhi-Smart-Play/sw.js'},skipWaiting(){},clients:{claim(){}}},caches:{},URL,Request,fetch(){},Promise};
vm.createContext(c); vm.runInContext(sw.replace(/self\.addEventListener[\s\S]*$/,''),c);
c.PRECACHE.forEach(u=>urls.add(u));
(async()=>{
  let bad=[],okc=0,bytes=0;
  for(const u of [...urls].sort()){
    try{
      const r=await fetch(B+u);
      if(!r.ok){bad.push(`${r.status} ${u}`);continue;}
      const b=await r.arrayBuffer(); bytes+=b.byteLength; okc++;
    }catch(e){ bad.push(`ERR_FAILED ${u} (${e.message})`); }
  }
  console.log(`resource diminta : ${urls.size}`);
  console.log(`HTTP 200         : ${okc}`);
  console.log(`GAGAL            : ${bad.length}`);
  if(bad.length) bad.forEach(x=>console.log('   ❌ '+x));
  console.log(`total payload    : ${(bytes/1024).toFixed(0)} KB`);
  console.log(bad.length?'\n❌ MASIH ADA RESOURCE GAGAL':'\n✅ NOL RESOURCE GAGAL (setara DevTools > Network bersih)');
  process.exit(bad.length?1:0);
})();
