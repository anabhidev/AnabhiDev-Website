// Menuliskan seluruh modul JS aplikasi jadi SATU berkas .txt, supaya bisa
// diberikan ke snapshot.js (yang memang membaca satu berkas).
//   node dump.js gabungan.txt
const fs=require('fs');
const {appJS}=require('./loadapp.js');
fs.writeFileSync(process.argv[2], appJS());
console.log('ditulis:', process.argv[2]);
