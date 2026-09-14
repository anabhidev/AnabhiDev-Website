// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Content Registry & Master Syllabus
// Development · Anabhi Dev
// Version   : 1.0 (Master Blueprint 4-Buku Calistung Integration)
// Generated : 14 September 2026, 23:25:00
// ================================================================

/**
 * CONTENT REGISTRY
 * Single source of truth untuk seluruh kurikulum dan bank latihan:
 * 1. READING ENGINE (60 Jam Pintar Baca Tanpa Dieja — Yuliani Yusuf)
 * 2. CALISTUNG ENGINE (Permata 5/10/15 Menit Daily Practice)
 * 3. 60 MENIT ENGINE (Integral Media — 4 Pilar Multi-Skill)
 * 4. MAXXI ENGINE (Penguatan Tematik Sekolah SD Kelas 1 Sem. 1)
 * 5. WRITING LAB (Garis, Pola, Huruf, Kata, Kalimat)
 * 6. MATH TOOLBOX (10 Strategi Berhitung Cepat Deterministik)
 * 
 * Prinsip: Original, Data-Driven, Reusable, Child-Friendly, Zero-Copyright-Infringement.
 */

export const CONTENT_REGISTRY = {
  // ============================================================
  // 1. READING ENGINE — 60 JAM BACA TANPA DIEJA (12 Levels)
  // Progression: Huruf → Vokal A → Vokal I → E/O → 3 Huruf →
  // Gabungan Suku Kata → Dua Vokal → Awalan → Sengau → Kata → Kalimat → Pemahaman
  // ============================================================
  reading: [
    {
      id: 'read-lvl-0',
      level: 0,
      title: 'Mengenal Huruf Vokal Ceria',
      titleEn: 'Meet Cheerful Vowels',
      skill: 'vowels-intro',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Mengenal bentuk dan bunyi huruf vokal bernyanyi A, I, U, E, O',
      vocabulary: ['a', 'i', 'u', 'e', 'o'],
      phonics: [
        { char: 'A', sound: 'a', example: 'Apel 🍎', word: 'APEL' },
        { char: 'I', sound: 'i', example: 'Ikan 🐟', word: 'IKAN' },
        { char: 'U', sound: 'u', example: 'Udang 🦐', word: 'UDANG' },
        { char: 'E', sound: 'e', example: 'Ekor 🐒', word: 'EKOR' },
        { char: 'O', sound: 'o', example: 'Obat 💊', word: 'OBAT' }
      ],
      estimatedMinutes: 3,
      difficulty: 1
    },
    {
      id: 'read-lvl-1',
      level: 1,
      title: 'Suku Kata Bunyi A (Tanpa Dieja)',
      titleEn: 'Syllables with Sound A (No Spelling)',
      skill: 'vowel-a-syllables',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca suku kata vokal A secara langsung (ba, ca, da, fa, ga, ha, ja, ka, la, ma, na, pa, ra, sa, ta)',
      syllables: ['ba', 'ca', 'da', 'ga', 'ha', 'ja', 'ka', 'la', 'ma', 'na', 'pa', 'ra', 'sa', 'ta'],
      sampleWords: [
        { word: 'MATA', parts: ['ma', 'ta'], emoji: '👀', hint: 'Untuk melihat' },
        { word: 'BATA', parts: ['ba', 'ta'], emoji: '🧱', hint: 'Bahan tembok rumah' },
        { word: 'RASA', parts: ['ra', 'sa'], emoji: '👅', hint: 'Manis, asin, gurih' },
        { word: 'KACA', parts: ['ka', 'ca'], emoji: '🪞', hint: 'Bening untuk berkaca' }
      ],
      estimatedMinutes: 5,
      difficulty: 1
    },
    {
      id: 'read-lvl-2',
      level: 2,
      title: 'Suku Kata Bunyi I (Ceria & Nyaring)',
      titleEn: 'Syllables with Sound I',
      skill: 'vowel-i-syllables',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca suku kata berakhiran vokal I secara langsung tanpa dieja',
      syllables: ['bi', 'ci', 'di', 'gi', 'hi', 'ji', 'ki', 'li', 'mi', 'ni', 'pi', 'ri', 'si', 'ti'],
      sampleWords: [
        { word: 'PIPI', parts: ['pi', 'pi'], emoji: '😊', hint: 'Ada di wajah kita' },
        { word: 'GIGI', parts: ['gi', 'gi'], emoji: '🦷', hint: 'Putih dan bersih' },
        { word: 'KAMI', parts: ['ka', 'mi'], emoji: '🤝', hint: 'Saya dan teman-teman' },
        { word: 'TALI', parts: ['ta', 'li'], emoji: '🪢', hint: 'Untuk mengikat' }
      ],
      estimatedMinutes: 5,
      difficulty: 1
    },
    {
      id: 'read-lvl-3',
      level: 3,
      title: 'Suku Kata Bunyi U, E, dan O',
      titleEn: 'Syllables with U, E, and O',
      skill: 'vowel-ueo-syllables',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca suku kata dengan vokal bulat dan bibir terbuka U, E, O',
      syllables: ['bu', 'cu', 'du', 'ku', 'mu', 'su', 'be', 'ce', 'de', 'me', 'pe', 'se', 'bo', 'co', 'do', 'mo', 'po', 'so'],
      sampleWords: [
        { word: 'BUKU', parts: ['bu', 'ku'], emoji: '📖', hint: 'Sumber ilmu membaca' },
        { word: 'BOLA', parts: ['bo', 'la'], emoji: '⚽', hint: 'Bulat ditendang di lapangan' },
        { word: 'SUSU', parts: ['su', 'su'], emoji: '🥛', hint: 'Minuman sehat bergizi' },
        { word: 'MEJA', parts: ['me', 'ja'], emoji: '🪵', hint: 'Tempat menaruh buku' }
      ],
      estimatedMinutes: 5,
      difficulty: 2
    },
    {
      id: 'read-lvl-4',
      level: 4,
      title: 'Rangkaian 3 Huruf (Vokal di Depan)',
      titleEn: 'Three-Letter Words (Vowel Front)',
      skill: 'three-letter-words',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca kata 3 huruf dengan vokal awal seperti IBU, UBI, API, AKU, ADA',
      sampleWords: [
        { word: 'IBU', parts: ['i', 'bu'], emoji: '👩', hint: 'Mama tercinta' },
        { word: 'UBI', parts: ['u', 'bi'], emoji: '🍠', hint: 'Makanan umbi manis gurih' },
        { word: 'API', parts: ['a', 'pi'], emoji: '🔥', hint: 'Hangat dan menyala' },
        { word: 'AKU', parts: ['a', 'ku'], emoji: '🧒', hint: 'Diri saya sendiri' },
        { word: 'INI', parts: ['i', 'ni'], emoji: '👉', hint: 'Menunjuk benda dekat' }
      ],
      estimatedMinutes: 4,
      difficulty: 2
    },
    {
      id: 'read-lvl-5',
      level: 5,
      title: 'Gabungan 2 Suku Kata Bermakna',
      titleEn: 'Combining Two Syllables into Words',
      skill: 'two-syllable-words',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Merangkai dua suku kata terbuka menjadi kata benda dan kata kerja sehari-hari',
      sampleWords: [
        { word: 'BAJU', parts: ['ba', 'ju'], emoji: '👕', hint: 'Pakaian kita sehari-hari' },
        { word: 'KAKI', parts: ['ka', 'ki'], emoji: '🦶', hint: 'Untuk berjalan dan berlari' },
        { word: 'SAPI', parts: ['sa', 'pi'], emoji: '🐄', hint: 'Hewan penghasil susu' },
        { word: 'KUDA', parts: ['ku', 'da'], emoji: '🐎', hint: 'Hewan berlari kencang' },
        { word: 'ROTI', parts: ['ro', 'ti'], emoji: '🍞', hint: 'Sarapan lezat' },
        { word: 'TOPI', parts: ['to', 'pi'], emoji: '🧢', hint: 'Pelindung kepala dari panas' }
      ],
      estimatedMinutes: 5,
      difficulty: 2
    },
    {
      id: 'read-lvl-6',
      level: 6,
      title: 'Dua Huruf Vokal Berdampingan (Diftong)',
      titleEn: 'Adjacent Vowels & Diphthongs',
      skill: 'diphthongs',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca diftong dan dua vokal berurutan: AI, AU, IA, UA, OI',
      sampleWords: [
        { word: 'PANTAI', parts: ['pan', 'tai'], emoji: '🏖️', hint: 'Tepi laut pasir indah' },
        { word: 'PULAU', parts: ['pu', 'lau'], emoji: '🏝️', hint: 'Daratan di kelilingi laut' },
        { word: 'SANTAI', parts: ['san', 'tai'], emoji: '😎', hint: 'Istirahat tenang' },
        { word: 'TUPAI', parts: ['tu', 'pai'], emoji: '🐿️', hint: 'Hewan lincah pemanjat pohon' },
        { word: 'DANAU', parts: ['da', 'nau'], emoji: '🏞️', hint: 'Genangan air luas alami' }
      ],
      estimatedMinutes: 5,
      difficulty: 3
    },
    {
      id: 'read-lvl-7',
      level: 7,
      title: 'Awalan Kata Sederhana',
      titleEn: 'Simple Word Prefixes',
      skill: 'word-prefixes',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Mengenal pola awalan kata berulang ba-, bi-, bu-, ma-, mi-, mu-, sa-, si-, su-',
      sampleWords: [
        { word: 'BERMAIN', parts: ['ber', 'ma', 'in'], emoji: '⚽', hint: 'Aktivitas seru bersama teman' },
        { word: 'MELOMPAT', parts: ['me', 'lom', 'pat'], emoji: '🦘', hint: 'Meloncat tinggi di udara' },
        { word: 'SEPEDA', parts: ['se', 'pe', 'da'], emoji: '🚲', hint: 'Kendaraan roda dua kayuh' }
      ],
      estimatedMinutes: 5,
      difficulty: 3
    },
    {
      id: 'read-lvl-8',
      level: 8,
      title: 'Bunyi Sengau & Konsonan Khusus (NG & NY)',
      titleEn: 'Nasal Sounds: NG and NY',
      skill: 'nasal-consonants',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca kata dengan bunyi sengau ng, ny, dan akhiran konsonan tertutup',
      sampleWords: [
        { word: 'MAKAN', parts: ['ma', 'kan'], emoji: '🍽️', hint: 'Aktivitas santap lezat' },
        { word: 'BURUNG', parts: ['bu', 'rung'], emoji: '🐦', hint: 'Hewan terbang berbulu indah' },
        { word: 'NYANYI', parts: ['nya', 'nyi'], emoji: '🎵', hint: 'Melantunkan lagu ceria' },
        { word: 'BINTANG', parts: ['bin', 'tang'], emoji: '⭐', hint: 'Berkilau di langit malam' },
        { word: 'SENANG', parts: ['se', 'nang'], emoji: '😄', hint: 'Perasaan bahagia dan gembira' }
      ],
      estimatedMinutes: 5,
      difficulty: 3
    },
    {
      id: 'read-lvl-9',
      level: 9,
      title: 'Kata Tiga Suku Kata & Benda Sekitar',
      titleEn: 'Three-Syllable Daily Words',
      skill: 'three-syllable-words',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca lancar kata tiga suku kata konkret yang sering ditemui',
      sampleWords: [
        { word: 'KERETA', parts: ['ke', 're', 'ta'], emoji: '🚆', hint: 'Kendaraan panjang di atas rel' },
        { word: 'SEPATU', parts: ['se', 'pa', 'tu'], emoji: '👟', hint: 'Alas kaki untuk sekolah' },
        { word: 'KEMEJA', parts: ['ke', 'me', 'ja'], emoji: '👔', hint: 'Baju berkerah rapi' },
        { word: 'KELINCI', parts: ['ke', 'lin', 'ci'], emoji: '🐰', hint: 'Hewan telinga panjang suka wortel' },
        { word: 'MATAHARI', parts: ['ma', 'ta', 'ha', 'ri'], emoji: '☀️', hint: 'Penerang bumi di siang hari' }
      ],
      estimatedMinutes: 5,
      difficulty: 3
    },
    {
      id: 'read-lvl-10',
      level: 10,
      title: 'Membaca Rangkaian Kalimat Pendek',
      titleEn: 'Reading Short Sentences',
      skill: 'short-sentences',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca kalimat pendek 3–4 kata dengan intonasi yang pas dan benar',
      sentences: [
        { text: 'Ibu beli roti manis.', emoji: '🍞', speech: 'Ibu beli roti manis' },
        { text: 'Ana suka baca buku.', emoji: '📖', speech: 'Ana suka baca buku' },
        { text: 'Abhi main bola baru.', emoji: '⚽', speech: 'Abhi main bola baru' },
        { text: 'Sapi makan rumput hijau.', emoji: '🐄', speech: 'Sapi makan rumput hijau' },
        { text: 'Matahari terbit pagi hari.', emoji: '🌅', speech: 'Matahari terbit pagi hari' }
      ],
      estimatedMinutes: 6,
      difficulty: 4
    },
    {
      id: 'read-lvl-11',
      level: 11,
      title: 'Pemahaman Cerita Ceria Anak',
      titleEn: 'Reading Comprehension Stories',
      skill: 'reading-comprehension',
      sourceReference: '60JAM',
      sourceStatus: 'reference-informed',
      originalContent: true,
      objective: 'Membaca cerita mini lalu menjawab pertanyaan pemahaman isi cerita',
      story: {
        title: 'Kelinci Putih dan Wortel Oranye',
        text: 'Kiki adalah kelinci putih yang lincah. Kiki suka makan wortel segar berwarna oranye di kebun paman. Setelah makan, Kiki melompat gembira bersama temannya si Kucing Miko.',
        questions: [
          { q: 'Siapa nama kelinci putih di cerita?', options: ['Kiki', 'Miko', 'Paman'], answer: 'Kiki' },
          { q: 'Apa warna wortel yang dimakan Kiki?', options: ['Oranye', 'Merah', 'Biru'], answer: 'Oranye' },
          { q: 'Siapakah teman bermain Kiki si Kelinci?', options: ['Kucing Miko', 'Bebek Doni', 'Kambing Boni'], answer: 'Kucing Miko' }
        ]
      },
      estimatedMinutes: 6,
      difficulty: 4
    }
  ],

  // ============================================================
  // 2. CALISTUNG ENGINE — PERMATA DAILY DRILL (5/10/15 Menit)
  // READ (Membaca) + WRITE (Menulis) + COUNT (Berhitung)
  // ============================================================
  calistung: {
    modes: [
      { id: '5min', name: 'Drill Kilat 5 Menit', durationMin: 5, targetTasks: 5, badge: '⚡ Cepat Tanggap' },
      { id: '10min', name: 'Latihan Fokus 10 Menit', durationMin: 10, targetTasks: 10, badge: '🎯 Fokus Pintar' },
      { id: '15min', name: 'Komplit Juara 15 Menit', durationMin: 15, targetTasks: 15, badge: '🏆 Juara Teladan' }
    ],
    pillars: [
      {
        id: 'reading',
        title: 'Membaca (Fonik & Kata)',
        titleEn: 'Reading (Phonics & Words)',
        icon: '📖',
        color: '#b24a1b',
        tasks: [
          { q: 'Huruf vokal pada kata "SEPATU" adalah...', options: ['E, A, U', 'S, P, T', 'Hanya E dan U', 'S, E, P'], answer: 'E, A, U', hint: 'Huruf bernyanyi A, I, U, E, O' },
          { q: 'Gabungan suku kata "BO" + "LA" dibaca...', options: ['BOLA', 'LOBE', 'BALI', 'BUTA'], answer: 'BOLA', hint: 'Benda bulat di lapangan sepak bola' },
          { q: 'Manakah kata yang berakhiran suku kata "KU"?', options: ['BUKU', 'BOLA', 'MEJA', 'KACA'], answer: 'BUKU', hint: 'BU + KU = BUKU' },
          { q: 'Lengkapi kata rumpang berikut: M A _ A (alat untuk melihat)', options: ['T', 'B', 'K', 'S'], answer: 'T', hint: 'M - A - T - A' },
          { q: 'Manakah kata yang memiliki bunyi sengau "NY"?', options: ['NYANYI', 'MAKAN', 'KUDAP', 'RUMAH'], answer: 'NYANYI', hint: 'NYA - NYI' }
        ]
      },
      {
        id: 'writing',
        title: 'Menulis & Ejaan Kata',
        titleEn: 'Writing & Word Spelling',
        icon: '✏️',
        color: '#1d7198',
        tasks: [
          { q: 'Pilihlah susunan ejaan yang benar untuk gambar 🥛 (SUSU):', options: ['S-U-S-U', 'S-U-S-I', 'S-I-S-U', 'U-S-U-S'], answer: 'S-U-S-U', hint: 'Minuman putih menyehatkan' },
          { q: 'Kata "RUMAH" terdiri dari ... huruf:', options: ['5 huruf', '4 huruf', '6 huruf', '3 huruf'], answer: '5 huruf', hint: 'R - U - M - A - H = 5 huruf' },
          { q: 'Huruf kapital yang tepat untuk awal nama "ana" adalah...', options: ['Ana', 'ana', 'aNa', 'anA'], answer: 'Ana', hint: 'Nama orang diawali huruf besar (kapital)' },
          { q: 'Lengkapi ejaan kata berikut: B _ J U (pakaian):', options: ['A', 'E', 'O', 'I'], answer: 'A', hint: 'B - A - J - U' },
          { q: 'Tanda baca yang tepat di akhir kalimat tanya "Di mana bukumu" adalah...', options: ['?', '.', '!', ','], answer: '?', hint: 'Kalimat tanya diakhiri tanda tanya (?)' }
        ]
      },
      {
        id: 'counting',
        title: 'Berhitung & Logika Angka',
        titleEn: 'Math & Number Logic',
        icon: '🔢',
        color: '#056268',
        tasks: [
          { q: 'Berapakah hasil dari 7 + 5?', options: ['12', '11', '13', '14'], answer: '12', hint: '7 disimpan di kepala, buka 5 jari: 8, 9, 10, 11, 12!' },
          { q: 'Ibu membeli 9 apel, lalu dimakan 4 apel. Sisa apel ibu adalah...', options: ['5', '4', '6', '3'], answer: '5', hint: '9 dikurangi 4 = 5 apel' },
          { q: 'Angka berapakah yang berada tepat di antara 13 dan 15?', options: ['14', '12', '16', '15'], answer: '14', hint: 'Urutan: 13, 14, 15' },
          { q: 'Manakah jumlah yang LEBIH BANYAK?', options: ['8 permen', '5 permen', '6 permen', '3 permen'], answer: '8 permen', hint: '8 adalah angka paling besar' },
          { q: 'Berapakah 10 + 6?', options: ['16', '15', '17', '18'], answer: '16', hint: '1 puluhan dan 6 satuan = 16' }
        ]
      }
    ]
  },

  // ============================================================
  // 3. 60 MENIT ENGINE — MULTI-SKILL STARTER (Integral Media)
  // 4 Pilar: Read + Write + Count + English
  // ============================================================
  sixtyMin: {
    pillars: [
      {
        id: 'read',
        name: 'Membaca Lebih Cepat',
        nameEn: 'Fast Reading Mastery',
        icon: '📖',
        color: '#ea580c',
        bgSoft: '#fff7ed',
        drills: [
          { q: 'Bacalah kata ini: "B-U-K-U". Manakah gambar yang cocok?', options: ['📖 Buku', '🍎 Apel', '⚽ Bola', '🚗 Mobil'], answer: '📖 Buku' },
          { q: 'Bunyi suku kata depan pada kata "KUCING" adalah...', options: ['KU', 'CI', 'KA', 'KI'], answer: 'KU' },
          { q: 'Manakah rangkaian kata yang tepat untuk: "kuda lari kencang"?', options: ['kuda lari kencang', 'kuda jalan pelan', 'sapi makan rumput', 'burung terbang tinggi'], answer: 'kuda lari kencang' }
        ]
      },
      {
        id: 'write',
        name: 'Menulis Lebih Mudah',
        nameEn: 'Easy Writing Skills',
        icon: '✏️',
        color: '#2563eb',
        bgSoft: '#eff6ff',
        drills: [
          { q: 'Manakah penulisan huruf kecil yang tepat untuk huruf "B"?', options: ['b', 'd', 'p', 'q'], answer: 'b', hint: 'Perut huruf b ada di depan bawah' },
          { q: 'Susunlah huruf acak "O - B - L - A" menjadi nama benda bulat:', options: ['BOLA', 'LOBE', 'ALOB', 'BALO'], answer: 'BOLA' },
          { q: 'Salinlah kata dengan benar: huruf awal kata "Sekolah" adalah...', options: ['S', 'E', 'K', 'O'], answer: 'S' }
        ]
      },
      {
        id: 'count',
        name: '123 Berhitung Lebih Pintar',
        nameEn: 'Clever Number Math',
        icon: '🧮',
        color: '#16a34a',
        bgSoft: '#f0fdf4',
        drills: [
          { q: 'Hitunglah penjumlahan bintang: ⭐⭐⭐ + ⭐⭐⭐⭐ = ...', options: ['7', '6', '8', '9'], answer: '7', hint: '3 + 4 = 7 bintang' },
          { q: 'Urutkan angka dari yang paling KECIL: 9, 3, 6, 1', options: ['1, 3, 6, 9', '9, 6, 3, 1', '3, 1, 6, 9', '1, 6, 3, 9'], answer: '1, 3, 6, 9' },
          { q: 'Lompat 2 langkah ke depan dari angka 6 menjadi angka...', options: ['8', '7', '9', '10'], answer: '8', hint: '6 + 2 = 8' }
        ]
      },
      {
        id: 'english',
        name: 'ABC BHS Inggris Lebih Lancar',
        nameEn: 'Smooth English ABCs',
        icon: '🔤',
        color: '#7c3aed',
        bgSoft: '#f5f3ff',
        drills: [
          { q: 'Sapaan "Good Morning" dalam Bahasa Indonesia berarti...', options: ['Selamat Pagi', 'Selamat Malam', 'Selamat Tinggal', 'Terima Kasih'], answer: 'Selamat Pagi' },
          { q: 'Warna buah apel merah dalam Bahasa Inggris adalah...', options: ['Red', 'Blue', 'Green', 'Yellow'], answer: 'Red' },
          { q: 'Kata "Cat" dalam Bahasa Indonesia artinya...', options: ['Kucing 🐱', 'Anjing 🐶', 'Burung 🐦', 'Ikan 🐟'], answer: 'Kucing 🐱' },
          { q: 'Angka 5 dalam bahasa Inggris dibaca...', options: ['Five', 'Four', 'Six', 'Three'], answer: 'Five' }
        ]
      }
    ]
  },

  // ============================================================
  // 4. MAXXI ENGINE — SCHOOL REINFORCEMENT (Tematik Terpadu Kelas 1)
  // 4 Unit: Diriku, Kegemaranku, Kegiatanku, Keluargaku
  // ============================================================
  maxxi: {
    units: [
      {
        id: 'unit-1-diriku',
        name: 'Unit 1: Diriku',
        nameEn: 'Unit 1: About Myself',
        theme: 'Mengenal Identitas, Tubuh, Rasa Syukur, dan Teman Baru',
        icon: '🧒',
        color: '#0284c7',
        badge: 'Tema 1 · Kurikulum Merdeka',
        sourceStatus: 'reconstructed',
        subjects: [
          {
            subject: 'Bahasa Indonesia',
            icon: '📖',
            q: 'Saat berkenalan dengan teman baru di kelas, sikap yang baik adalah...',
            options: ['Tersenyum ramah dan menyebutkan nama', 'Menunduk dan tidak mau bicara', 'Berteriak keras di depan kelas', 'Pergi meninggalkan teman'],
            answer: 'Tersenyum ramah dan menyebutkan nama',
            hint: 'Sapa teman dengan senyum ceria! 😊'
          },
          {
            subject: 'Pendidikan Pancasila',
            icon: '🦅',
            q: 'Meskipun setiap teman di kelas memiliki perbedaan warna kulit dan hobi, kita harus...',
            options: ['Saling menghormati dan hidup rukun', 'Hanya bermain dengan teman yang sama', 'Mengejek perbedaannya', 'Memusuhi teman yang berbeda'],
            answer: 'Saling menghormati dan hidup rukun',
            hint: 'Semboyan bangsa kita: Bhinneka Tunggal Ika'
          },
          {
            subject: 'Matematika',
            icon: '🧮',
            q: 'Setiap anak memiliki 2 tangan. Berapakah jumlah seluruh jari pada kedua tanganmu?',
            options: ['10 jari', '5 jari', '8 jari', '12 jari'],
            answer: '10 jari',
            hint: '5 jari tangan kanan + 5 jari tangan kiri = 10 jari'
          },
          {
            subject: 'Seni Rupa',
            icon: '🎨',
            q: 'Bagian wajah yang berbentuk dua lingkaran bulat adalah...',
            options: ['Dua bola mata 👀', 'Bentuk hidung', 'Garis senyum bibir', 'Bentuk alis'],
            answer: 'Dua bola mata 👀',
            hint: 'Mata kita bulat untuk melihat'
          },
          {
            subject: 'PJOK',
            icon: '🏃',
            q: 'Gerakan berpindah tempat dengan melangkahkan kaki secara cepat bergantian disebut...',
            options: ['Berlari 🏃', 'Duduk manis', 'Tidur terlentang', 'Berdiri tegak'],
            answer: 'Berlari 🏃',
            hint: 'Langkah kaki lebih cepat dari jalan santai'
          }
        ]
      },
      {
        id: 'unit-2-kegemaranku',
        name: 'Unit 2: Kegemaranku',
        nameEn: 'Unit 2: My Hobbies & Passions',
        theme: 'Olahraga, Menggambar, Menari, Menyanyi, dan Gemar Membaca',
        icon: '🎨',
        color: '#16a34a',
        badge: 'Tema 2 · Kurikulum Merdeka',
        sourceStatus: 'reconstructed',
        subjects: [
          {
            subject: 'Bahasa Indonesia',
            icon: '📖',
            q: 'Siti gemar membaca buku cerita. Tempat di sekolah yang menyediakan banyak buku adalah...',
            options: ['Perpustakaan 📚', 'Kantin sekolah', 'Lapangan basket', 'Tempat parkir'],
            answer: 'Perpustakaan 📚',
            hint: 'Ruang membaca yang hening dan nyaman'
          },
          {
            subject: 'Matematika',
            icon: '🧮',
            q: 'Edo membawa 6 bola tenis, Udin membawa 4 bola tenis. Jumlah seluruh bola adalah...',
            options: ['10 bola', '9 bola', '11 bola', '8 bola'],
            answer: '10 bola',
            hint: '6 + 4 = 10'
          },
          {
            subject: 'Pancasila',
            icon: '🦅',
            q: 'Lani gemar menari Bali, sedangkan Dayu gemar menggambar. Sikap mereka seharusnya...',
            options: ['Saling mendukung dan menghargai kegemaran teman', 'Memaksa teman agar ikut hobinya', 'Merasa hobinya paling hebat', 'Tidak mau berteman'],
            answer: 'Saling mendukung dan menghargai kegemaran teman',
            hint: 'Menghargai keragaman bakat teman'
          },
          {
            subject: 'Seni Rupa',
            icon: '🎨',
            q: 'Campuran warna cat Kuning dan Biru akan menghasilkan warna baru yaitu...',
            options: ['Hijau 🟢', 'Ungu 🟣', 'Oranye 🟠', 'Cokelat 🟤'],
            answer: 'Hijau 🟢',
            hint: 'Warna daun pohon di taman'
          },
          {
            subject: 'PJOK',
            icon: '⚽',
            q: 'Sebelum memulai olahraga berlari atau bermain bola, kita wajib melakukan gerakan...',
            options: ['Pemanasan dan peregangan tubuh', 'Makan makanan yang banyak', 'Tidur di pinggir lapangan', 'Minum es manis berlebihan'],
            answer: 'Pemanasan dan peregangan tubuh',
            hint: 'Mencegah cedera otot'
          }
        ]
      },
      {
        id: 'unit-3-kegiatanku',
        name: 'Unit 3: Kegiatanku',
        nameEn: 'Unit 3: My Daily Activities',
        theme: 'Aktivitas Pagi Hari, Tertib di Sekolah, Sore Ceria, dan Malam Tenang',
        icon: '⏰',
        color: '#f59e0b',
        badge: 'Tema 3 · Kurikulum Merdeka',
        sourceStatus: 'reconstructed',
        subjects: [
          {
            subject: 'Bahasa Indonesia',
            icon: '📖',
            q: 'Benda langit yang terbit di ufuk timur dan menandakan datangnya pagi hari adalah...',
            options: ['Matahari ☀️', 'Bulan purnama 🌕', 'Bintang jatuh ⭐', 'Awan petir ⚡'],
            answer: 'Matahari ☀️',
            hint: 'Bersinar hangat di pagi hari'
          },
          {
            subject: 'Pendidikan Pancasila',
            icon: '🦅',
            q: 'Aturan yang baik setelah bangun tidur di pagi hari adalah...',
            options: ['Merapikan tempat tidur sendiri', 'Membiarkan selimut berserakan', 'Langsung bermain game di HP', 'Menangis berteriak'],
            answer: 'Merapikan tempat tidur sendiri',
            hint: 'Melatih hidup mandiri dan rapi'
          },
          {
            subject: 'Matematika',
            icon: '🧮',
            q: 'Jarum jam panjang menunjuk angka 12, jarum pendek menunjuk angka 7. Maka saat itu pukul...',
            options: ['Pukul 07.00', 'Pukul 12.00', 'Pukul 05.00', 'Pukul 01.00'],
            answer: 'Pukul 07.00',
            hint: 'Waktu bel masuk sekolah berbunyi'
          },
          {
            subject: 'PJOK',
            icon: '🚶',
            q: 'Saat berbaris upacara bendera di hari Senin, sikap tubuh yang benar adalah...',
            options: ['Berdiri tegak, pandangan lurus ke depan', 'Duduk santai di tanah', 'Berbincang dengan teman sebelah', 'Menggoyang-goyangkan tangan'],
            answer: 'Berdiri tegak, pandangan lurus ke depan',
            hint: 'Sikap siap sempurna dan khidmat'
          }
        ]
      },
      {
        id: 'unit-4-keluargaku',
        name: 'Unit 4: Keluargaku',
        nameEn: 'Unit 4: My Loving Family',
        theme: 'Keluarga Inti, Silsilah Kasih Sayang, Kerja Sama, dan Kebersamaan',
        icon: '👨‍👩‍👧‍👦',
        color: '#dc2626',
        badge: 'Tema 4 · Kurikulum Merdeka',
        sourceStatus: 'reconstructed',
        subjects: [
          {
            subject: 'Pendidikan Pancasila',
            icon: '🦅',
            q: 'Keluarga inti di rumah biasanya terdiri dari...',
            options: ['Ayah, Ibu, dan Anak', 'Guru dan Kepala Sekolah', 'Dokter dan Perawat', 'Sopir dan Penumpang'],
            answer: 'Ayah, Ibu, dan Anak',
            hint: 'Orang tua dan anak-anak tercinta'
          },
          {
            subject: 'Bahasa Indonesia',
            icon: '📖',
            q: 'Panggilan hormat untuk orang tua perempuan yang melahirkan dan merawat kita adalah...',
            options: ['Ibu atau Mama 👩', 'Kakak', 'Bibi', 'Adik'],
            answer: 'Ibu atau Mama 👩',
            hint: 'Sosok penuh kasih sayang'
          },
          {
            subject: 'Matematika',
            icon: '🧮',
            q: 'Di meja makan ada 4 piring untuk keluarga. Ibu menambah 2 piring untuk kakek dan nenek. Total piring sekarang adalah...',
            options: ['6 piring', '5 piring', '7 piring', '8 piring'],
            answer: '6 piring',
            hint: '4 + 2 = 6 piring'
          },
          {
            subject: 'Seni Rupa',
            icon: '🎨',
            q: 'Bingkai foto keluarga yang memiliki 4 sisi sama panjang berbentuk bangun...',
            options: ['Persegi (Kotak) ⏹️', 'Lingkaran ⏺️', 'Segitiga 🔺', 'Bintang ⭐'],
            answer: 'Persegi (Kotak) ⏹️',
            hint: 'Empat sudut siku-siku sama panjang'
          }
        ]
      }
    ]
  }
};
