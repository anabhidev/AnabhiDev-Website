const http=require('http'),fs=require('fs'),path=require('path');
const ROOT='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play';
const T={'.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/manifest+json',
 '.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon'};
http.createServer((q,r)=>{
  let u=decodeURIComponent(q.url.split('?')[0]); if(u==='/')u='/index.html';
  const f=path.join(ROOT,u);
  fs.readFile(f,(e,d)=>e?r.writeHead(404).end('404'):r.writeHead(200,{'content-type':T[path.extname(f)]||'application/octet-stream'}).end(d));
}).listen(8788,()=>console.log('ROOT-READY'));
