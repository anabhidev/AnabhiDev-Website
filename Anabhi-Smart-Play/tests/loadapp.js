const fs=require('fs');
const W='D:/Wibawa/Anabhi Dev/Anabhi-Smart-Play/Smart-Play/';
exports.W=W;
exports.appJS=function(){
  const html=fs.readFileSync(W+'index.html','utf8');
  const srcs=[...html.matchAll(/<script src="([^"?]+)[^"]*"><\/script>/g)].map(m=>m[1])
              .filter(f=>f!=='js/twemoji.min.js');
  return srcs.map(f=>fs.readFileSync(W+f,'utf8')).join('\n');
};
exports.appCSS=function(){
  const html=fs.readFileSync(W+'index.html','utf8');
  const hrefs=[...html.matchAll(/<link rel="stylesheet" href="([^"?]+)[^"]*">/g)].map(m=>m[1]);
  return hrefs.map(f=>fs.readFileSync(W+f,'utf8')).join('\n');
};
