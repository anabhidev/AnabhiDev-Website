// Membandingkan dua sidik jari dan melaporkan BARIS MANA yang berubah.
// Dipakai untuk membuktikan perubahan hanya menyentuh yang memang diniatkan.
//   node diff.js sebelum.txt sesudah.txt
const fs=require('fs');
const a=fs.readFileSync(process.argv[2],'utf8').split('\n');
const b=fs.readFileSync(process.argv[3],'utf8').split('\n');

const kunci=s=>s.split('|').slice(0,3).join('|');
const mapA={},mapB={};
a.forEach(l=>mapA[kunci(l)]=l);
b.forEach(l=>mapB[kunci(l)]=l);

const semua=new Set([...Object.keys(mapA),...Object.keys(mapB)]);
const berubah=[],hilang=[],baru=[];
semua.forEach(k=>{
  if(!(k in mapB))hilang.push(k);
  else if(!(k in mapA))baru.push(k);
  else if(mapA[k]!==mapB[k])berubah.push(k);
});

const kategori={};
berubah.forEach(k=>{const c=k.split('|')[0];kategori[c]=(kategori[c]||0)+1;});

console.log('total entri     :',a.length,'->',b.length);
console.log('entri identik   :',semua.size-berubah.length-hilang.length-baru.length);
console.log('entri BERUBAH   :',berubah.length);
console.log('entri HILANG    :',hilang.length,hilang.length?hilang.join(', '):'');
console.log('entri BARU      :',baru.length,baru.length?baru.join(', '):'');
console.log('\nberubah per kategori:');
Object.keys(kategori).sort().forEach(c=>console.log('  '+c.padEnd(16)+kategori[c]));
