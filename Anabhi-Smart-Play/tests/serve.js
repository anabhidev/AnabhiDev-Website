// Server statis meniru produksi: folder kerja di-mount di /Anabhi-Smart-Play/
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play';
const MOUNT='/Anabhi-Smart-Play';
const TYPES={'.css':'text/css; charset=utf-8','.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
 '.json':'application/manifest+json; charset=utf-8','.png':'image/png','.webp':'image/webp',
 '.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.ico':'image/x-icon'};
const srv=http.createServer((req,res)=>{
  let u=decodeURIComponent(req.url.split('?')[0]);
  if(!u.startsWith(MOUNT)){res.writeHead(404).end('outside mount');return;}
  let rel=u.slice(MOUNT.length)||'/';
  if(rel==='/'||rel==='')rel='/index.html';
  const f=path.join(ROOT,rel);
  if(!f.startsWith(path.resolve(ROOT))){res.writeHead(403).end();return;}
  fs.readFile(f,(e,d)=>{
    if(e){res.writeHead(404,{'content-type':'text/plain'}).end('404 '+rel);return;}
    res.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'}).end(d);
  });
});
srv.listen(8787,()=>console.log('READY'));
