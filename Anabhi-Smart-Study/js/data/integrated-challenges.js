// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Integrated Reinforcement Data
// Development · Anabhi Dev
// Version   : 1.0 (Calistung 5-Menit & MAXXI Mixed Challenge)
// Aligned with Source Books: SRC-05 (Calistung) & SRC-10 (MAXXI)
// ================================================================

export const CALI_STUNG_DATA = {
  id: 'cali-stung-5min',
  title: 'Latihan Cepat 5 Menit — Calistung',
  titleEn: '5-Minute Rapid Drill — Calistung (Literacy & Numeracy)',
  subtitle: 'Latihan kilat penguatan fondasi: 5 soal membaca + 5 soal menulis + 5 soal berhitung!',
  subtitleEn: 'Quick foundational boost: 5 reading + 5 writing + 5 math questions!',
  sourceId: 'SRC-05',
  questions: [
    // --- 5 Soal Membaca (Reading) ---
    {
      q: '[Membaca 1] Manakah huruf vokal pada kata "BOLA"?',
      options: ['O dan A', 'B dan L', 'B, O, L, A', 'Hanya O'],
      answer: 'O dan A',
      hint: 'Huruf vokal adalah huruf bernyanyi A, I, U, E, O ⚽',
      category: 'membaca'
    },
    {
      q: '[Membaca 2] Gabungan suku kata BA + JU jika dirangkai dibaca...',
      options: ['BAJU', 'JUBA', 'BAJI', 'BUTA'],
      answer: 'BAJU',
      hint: 'Pakaian yang kita pakai sehari-hari 👕',
      category: 'membaca'
    },
    {
      q: '[Membaca 3] Kata "SEKOLAH" tempat kita belajar terdiri dari ... suku kata.',
      options: ['3 suku kata (SE - KO - LAH)', '2 suku kata', '4 suku kata', '1 suku kata'],
      answer: '3 suku kata (SE - KO - LAH)',
      hint: 'Tepuk tangan saat mengeja: SE... KO... LAH! 🏫',
      category: 'membaca'
    },
    {
      q: '[Membaca 4] Huruf awal dari nama hewan berbelalai panjang "GAJAH" adalah...',
      options: ['G', 'J', 'A', 'H'],
      answer: 'G',
      hint: 'G - A - J - A - H diawali huruf G 🐘',
      category: 'membaca'
    },
    {
      q: '[Membaca 5] Lawan kata dari kata "BERSIH" adalah...',
      options: ['KOTOR', 'WANGI', 'INDAH', 'RAPI'],
      answer: 'KOTOR',
      hint: 'Jika tidak dibersihkan, lantai akan menjadi kotor.',
      category: 'membaca'
    },

    // --- 5 Soal Menulis (Writing) ---
    {
      q: '[Menulis 1] Lengkapi huruf yang hilang agar menjadi alat tulis: P - E - N - ... - I - L',
      options: ['S (menjadi PENSIL)', 'K', 'T', 'B'],
      answer: 'S (menjadi PENSIL)',
      hint: 'Alat tulis berujung grafit untuk menggambar dan menulis ✏️',
      category: 'menulis'
    },
    {
      q: '[Menulis 2] Lengkapi suku kata agar menjadi nama hewan berbulu lucu: KU - ...',
      options: ['CING (menjadi KUCING)', 'KU', 'DA', 'DE'],
      answer: 'CING (menjadi KUCING)',
      hint: 'Hewan peliharaan yang bersuara "meong-meong" 🐱',
      category: 'menulis'
    },
    {
      q: '[Menulis 3] Susun huruf acak berikut [U - K - B - U] menjadi kata bermakna...',
      options: ['BUKU', 'KUBU', 'UBUK', 'BKKU'],
      answer: 'BUKU',
      hint: 'Lembaran kertas bacaan yang menjadi jendela ilmu 📖',
      category: 'menulis'
    },
    {
      q: '[Menulis 4] Tanda baca yang wajib diletakkan di akhir kalimat berita "Rani membaca buku" adalah...',
      options: ['Tanda titik (.)', 'Tanda tanya (?)', 'Tanda seru (!)', 'Tanda koma (,)'],
      answer: 'Tanda titik (.)',
      hint: 'Titik mengakhiri kalimat pernyataan dengan tenang.',
      category: 'menulis'
    },
    {
      q: '[Menulis 5] Penulisan nama orang yang benar menggunakan huruf kapital di awal adalah...',
      options: ['Budi', 'budi', 'bUdi', 'budI'],
      answer: 'Budi',
      hint: 'Nama orang selalu diawali huruf besar/kapital.',
      category: 'menulis'
    },

    // --- 5 Soal Berhitung (Numeracy) ---
    {
      q: '[Berhitung 1] Ada 6 apel merah ditambah 4 apel hijau di keranjang. Total apel seluruhnya ada...',
      type: 'number-input',
      answer: '10',
      options: ['10', '9', '11', '8'],
      hint: '6 + 4 adalah pasangan emas sahabat sepuluh! 🍎',
      category: 'berhitung'
    },
    {
      q: '[Berhitung 2] Bilangan yang terletak tepat SETELAH angka 17 adalah...',
      type: 'number-input',
      answer: '18',
      options: ['18', '16', '19', '20'],
      hint: 'Hitung maju satu langkah dari 17: 18!',
      category: 'berhitung'
    },
    {
      q: '[Berhitung 3] 1 puluhan + 5 satuan sama dengan bilangan...',
      type: 'number-input',
      answer: '15',
      options: ['15', '51', '10', '25'],
      hint: '10 ditambah 5 menghasilkan 15 🧱',
      category: 'berhitung'
    },
    {
      q: '[Berhitung 4] Ibu punya 9 butir telur, pecah 3 butir saat memasak. Telur yang utuh tersisa...',
      type: 'number-input',
      answer: '6',
      options: ['6', '7', '5', '12'],
      hint: 'Hitung mundur 3 langkah dari 9: 8, 7, 6! 🥚',
      category: 'berhitung'
    },
    {
      q: '[Berhitung 5] Lanjutkan pola bilangan loncat dua berikut: 2, 4, 6, ...',
      type: 'number-input',
      answer: '8',
      options: ['8', '7', '9', '10'],
      hint: 'Setiap langkah bertambah 2: 6 + 2 = 8!',
      category: 'berhitung'
    }
  ]
};

export const MAXXI_CHALLENGE_DATA = {
  id: 'maxxi-tematik-terpadu',
  title: 'Tantangan Tematik Terpadu MAXXI',
  titleEn: 'MAXXI Integrated Thematic Challenge',
  subtitle: 'Uji ketangkasan belajar lintas mata pelajaran: Matematika, Bahasa, Pancasila, PJOK, Seni, & Geografi!',
  subtitleEn: 'Cross-subject mastery: Math, Literacy, Civics, Physical Ed, Arts, & Geography!',
  sourceId: 'SRC-10',
  questions: [
    {
      q: 'Rani membawa 5 buah jeruk ke sekolah. Di waktu istirahat, Rani membagikan 2 buah jeruk secara adil kepada temannya yang lupa bekal. Berapa sisa jeruk Rani sekarang?',
      scenario: '🍎 Nilai Kebaikan: Berbagi bekal mencerminkan kepedulian sosial, sekaligus melatih kemampuan berhitung pengurangan.',
      options: ['3 buah jeruk (5 - 2 = 3)', '7 buah jeruk', '2 buah jeruk', '0 jeruk'],
      answer: '3 buah jeruk (5 - 2 = 3)',
      hint: 'Berbagi bekal adalah sikap mulia (Sila ke-5), dan 5 dikurangi 2 menghasilkan 3 🍊'
    },
    {
      q: 'Lengkapilah kalimat berikut dengan suku kata yang tepat: "Pohon rindang di taman menghasilkan udara yang se-..."',
      scenario: '🌳 Literasi & Lingkungan: Pepohonan hijau menyerap polusi udara dan menghasilkan oksigen segar bagi manusia.',
      options: ['se-gar', 'se-dih', 'se-mpit', 'se-ring'],
      answer: 'se-gar',
      hint: 'Udara segar membuat pernapasan dan tubuh kita bugar!'
    },
    {
      q: 'Made melakukan gerak lokomotor melompat sejauh 4 meter, lalu melompat lagi 3 meter ke depan. Berapa meter total lompatan Made?',
      scenario: '🏃 PJOK & Berhitung: Mengukur jarak gerakan melompat menggunakan penjumlahan dasar.',
      options: ['7 meter (4 + 3 = 7)', '8 meter', '1 meter', '12 meter'],
      answer: '7 meter (4 + 3 = 7)',
      hint: '4 meter digabung 3 meter menghasilkan 7 meter 🐸'
    },
    {
      q: 'Warna apakah yang kita gunakan pada peta atlas untuk melukiskan birunya lautan nusantara yang luas?',
      scenario: '🗺️ Seni Rupa & Geografi: Peta menggunakan warna simbolik konvensional untuk daratan dan perairan.',
      options: ['Warna Biru', 'Warna Kuning', 'Warna Cokelat', 'Warna Hitam'],
      answer: 'Warna Biru',
      hint: 'Air laut memantulkan warna biru langit yang indah 🌊'
    },
    {
      q: 'Regu piket kelas terdiri dari 4 murid. Mereka membagi tugas secara adil: 2 murid menyapu lantai dan 2 murid merapikan meja guru. Sikap ini mencerminkan pengamalan sila ke-...',
      scenario: '🦅 Pendidikan Pancasila: Bekerja sama dan berbagi tugas piket secara merata.',
      options: ['Kelima (Keadilan Sosial & Gotong Royong)', 'Pertama', 'Kedua', 'Ketiga'],
      answer: 'Kelima (Keadilan Sosial & Gotong Royong)',
      hint: 'Membagi tugas secara adil dan bekerja sama untuk kebersihan kelas ✨'
    },
    {
      q: 'How much is "three" plus "four" in English?',
      scenario: '🇬🇧 Bahasa Inggris & Matematika: Menghitung penjumlahan dalam kosakata bahasa Inggris internasional.',
      options: ['Seven (7)', 'Six (6)', 'Eight (8)', 'Five (5)'],
      answer: 'Seven (7)',
      hint: 'Three (3) + Four (4) = Seven (7)!'
    },
    {
      q: 'Kain tradisional khas Bali yang bermotif kotak-kotak catur hitam dan putih yang melambangkan keseimbangan alam disebut kain...',
      scenario: '🌴 Muatan Lokal Bahasa Bali & Seni Budaya: Mengenal warisan luhur budaya nusantara.',
      options: ['Kain Poleng', 'Kain Sutra', 'Kain Batik Solo', 'Kain Songket'],
      answer: 'Kain Poleng',
      hint: 'Kain poleng melambangkan konsep keseimbangan hidup Rwa Bhineda 🏁'
    },
    {
      q: 'Perhatikan pola hiasan mading kelas: ⭐ Bintang - 🌙 Bulan - ⭐ Bintang - 🌙 Bulan - ... Hiasan berikutnya adalah...',
      scenario: '🎨 Pola Kreatif & Bentuk: Mengenal urutan berulang secara teratur.',
      options: ['⭐ Bintang', '🌙 Bulan', '☀️ Matahari', '☁️ Awan'],
      answer: '⭐ Bintang',
      hint: 'Pola bergantian bintang dan bulan, setelah bulan kembali ke bintang!'
    },
    {
      q: 'Budi mencuci tangan memakai sabun dan air mengalir selama 20 detik sebelum makan siang pada pukul 12.00. Mengapa kita wajib cuci tangan dengan sabun?',
      scenario: '🧼 Kesehatan Jasmani: Pola hidup bersih dan sehat (PHBS) mencegah penyakit masuk ke tubuh.',
      options: ['Agar kuman dan bakteri mati bersih', 'Supaya tangan licin saja', 'Hanya bermain air', 'Biar wangi sebentar'],
      answer: 'Agar kuman dan bakteri mati bersih',
      hint: 'Sabun membasmi kuman dan virus berbahaya sebelum kita menyentuh makanan.'
    },
    {
      q: 'Dalam dongeng fabel, Kura-kura menang lomba lari melawan Kelinci karena ia tekun dan pantang menyerah. Pesan moral yang patut kita teladani adalah...',
      scenario: '📖 Membaca Pemahaman & Karakter: Fabel mengajarkan nilai budi pekerti luhur bagi anak.',
      options: ['Tetap gigih berusaha dan tidak boleh sombong', 'Menyerah jika saingan cepat', 'Mengejek teman lain', 'Tidur di tengah jalan'],
      answer: 'Tetap gigih berusaha dan tidak sombong',
      hint: 'Ketekunan dan kerendahan hati selalu mengalahkan kesombongan 🐢'
    }
  ]
};

