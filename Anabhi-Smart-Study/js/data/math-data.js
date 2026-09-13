// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Mathematics Flagship Data & Math Toolbox
// Development · Anabhi Dev
// Version   : 2.0 (Math Toolbox Master Blueprint)
// Generated : 10 September 2026, 12:00:00
// ================================================================

export const MATH_DATA = {
  id: 'matematika',
  title: 'Math Toolbox — Satu Soal, Banyak Cara!',
  titleEn: 'Math Toolbox — One Problem, Many Ways!',
  subtitle: 'Matematika bukan cuma berhitung satu per satu. Temukan pola, pilih alat berpikirmu, dan gunakan cara yang paling kamu suka!',
  subtitleEn: "Math isn't just counting one by one. Spot patterns, choose your thinking tool, and use the way you love most!",
  signaturePrompt: 'Satu soal. Banyak cara. Kamu pilih cara yang paling kamu suka. 😎',
  signaturePromptEn: 'One problem. Many ways. You choose the way that fits you best. 😎',

  // Soal Flagship & Signature Sesuai Blueprint v1.0
  flagship: {
    a: 67,
    b: 59,
    answer: 126,
    recommended: ['compensation', 'make-hundred', 'decomposition', 'number-line'],
    reason: 'Angka 59 hampir 60! Coba jurus Kompensasi atau Bikin 100.',
    reasonEn: 'Number 59 is almost 60! Try Compensation or Make 100.'
  },
  secondSignature: {
    a: 68,
    b: 32,
    answer: 100,
    recommended: ['make-hundred', 'decomposition'],
    reason: 'Wih! 68 dan 32 pasangan serasi yang langsung pas jadi 100!',
    reasonEn: '68 and 32 are a perfect pair that instantly makes 100!'
  },
  thirdSignature: {
    a: 125,
    b: 75,
    answer: 200,
    recommended: ['make-hundred', 'number-bonds', 'number-line'],
    reason: '25 + 75 = 100! Digabung 100 pertama langsung melesat jadi 200!',
    reasonEn: '25 + 75 = 100! Combined with the first 100, it leaps to 200!'
  },

  // 4 Slot Video YouTube Matematika & Penjumlahan Terkurasi
  videoSlots: [
    {
      id: 'math-yt-1',
      title: '1. Berhitung Cepat Jari Tanpa Sempoa (TK & SD)',
      description: 'Jurus kilat menghitung penjumlahan hanya dengan formasi jari tangan tanpa alat bantu.',
      url: 'https://www.youtube.com/watch?v=bdx64w2lG_Y',
      channel: 'MA Kids Fun House',
      ageFit: 'Kelas 1–6 SD'
    },
    {
      id: 'math-yt-2',
      title: '2. Jarimatika Jurus Zero: Trik Penjumlahan Jari',
      description: 'Trik ceria berhitung penjumlahan dengan gerakan jari tangan ala Jarimatika super asyik.',
      url: 'https://www.youtube.com/watch?v=3DrTPVa6yVQ',
      channel: 'Ayo Cerdas Indonesia',
      ageFit: 'Kelas 1–6 SD'
    },
    {
      id: 'math-yt-3',
      title: '3. Kuis Matematika Dasar: Asah Otak Penjumlahan',
      description: 'Kuis interaktif melatih kecepatan dan ketepatan berhitung jumlah-jumlahan dasar dengan riang.',
      url: 'https://www.youtube.com/watch?v=DQYkGL0X-yA',
      channel: 'Quiz QUPU',
      ageFit: 'Kelas 1–6 SD'
    },
    {
      id: 'math-yt-4',
      title: '4. Cara Menghitung Penjumlahan Bersusun (Nilai Tempat)',
      description: 'Panduan langkah demi langkah menghitung penjumlahan susun panjang & pendek dengan mudah dan jelas.',
      url: 'https://www.youtube.com/watch?v=uY1Wndy5N0o',
      channel: 'Bu Retno - Belajar Matematika',
      ageFit: 'Kelas 1–6 SD'
    }
  ],

  // 9 Strategi Berpikir (Strategy Library)
  methods: [
    {
      id: 'decomposition',
      name: 'Pecah Angka',
      nameEn: 'Split Numbers',
      badge: 'Nilai Tempat',
      badgeEn: 'Place Value',
      icon: '🧩',
      summary: 'Pisahkan puluhan dan satuan, jumlahkan masing-masing kelompok, lalu satukan kembali hasilnya!',
      summaryEn: 'Separate tens and ones, add each group, then combine them back together!',
      whyGood: 'Sangat mudah karena otak kita terbiasa menghitung puluhan dan satuan secara terpisah.',
      whyGoodEn: 'Super intuitive because our brain naturally groups tens and ones separately.'
    },
    {
      id: 'number-bonds',
      name: 'Number Bonds',
      nameEn: 'Number Bonds',
      badge: 'Bongkar Pasang',
      badgeEn: 'Deconstruct & Bond',
      icon: '🔗',
      summary: 'Bongkar angka menjadi cabang-cabang bagian yang ramah, lalu hubungkan kembali membentuk total.',
      summaryEn: 'Break numbers into friendly branches, then reconnect them to find the total.',
      whyGood: 'Membantu melihat bahwa angka bisa dibongkar pasang seperti balok lego.',
      whyGoodEn: 'Helps you see that numbers can be disassembled and rebuilt like Lego blocks.'
    },
    {
      id: 'make-hundred',
      name: 'Bikin 100',
      nameEn: 'Make 100',
      badge: 'Make Ten / Hundred',
      badgeEn: 'Round to 100',
      icon: '🔟',
      summary: 'Pinjam sedikit dari angka sebelah untuk menggenapkan angka utama menjadi 100 bulat yang nyaman!',
      summaryEn: 'Borrow a little from the other number to round up to a friendly, solid 100!',
      whyGood: 'Menghitung dari 100 itu super enteng dan bebas pusing.',
      whyGoodEn: 'Adding from 100 is effortless and stress-free.'
    },
    {
      id: 'compensation',
      name: 'Kompensasi',
      nameEn: 'Compensation',
      badge: 'Hampir Bulat',
      badgeEn: 'Near Round',
      icon: '⚖️',
      summary: 'Jika angka hampir bulat (seperti 59 → 60), genapkan dulu! Nanti di akhir tinggal kembalikan kelebihannya.',
      summaryEn: 'If a number is nearly round (like 59 → 60), round up first! Then subtract the extra at the end.',
      whyGood: 'Jurus favorit para jagoan mental math untuk angka yang berakhiran 8 atau 9.',
      whyGoodEn: 'Favorite strategy of mental math champions for numbers ending in 8 or 9.'
    },
    {
      id: 'number-line',
      name: 'Garis Bilangan',
      nameEn: 'Number Line',
      badge: 'Lompatan Chunk',
      badgeEn: 'Chunk Jumps',
      icon: '📏',
      summary: 'Melompat di garis bilangan dengan langkah-langkah besar (+50, lalu +9) tanpa perlu melompat satu-satu.',
      summaryEn: 'Hop along the number line with big chunk jumps (+50, then +9) instead of counting by ones.',
      whyGood: 'Mata bisa langsung melihat perjalanan jarak dari titik awal ke titik akhir.',
      whyGoodEn: 'Your eyes clearly see the journey from starting point to the destination.'
    },
    {
      id: 'base-ten',
      name: 'Balok Nilai Tempat',
      nameEn: 'Base-Ten Blocks',
      badge: 'Base-Ten Blocks',
      badgeEn: 'Manipulatives',
      icon: '🧱',
      summary: 'Gunakan batang puluhan (rods) dan kubus satuan (cubes). Bila ada 10 kubus, tukar menjadi 1 batang baru!',
      summaryEn: 'Use 10-rods and 1-cubes. Whenever you have 10 cubes, trade them for 1 new rod (regrouping)!',
      whyGood: 'Wujud fisik nyata dari konsep menyimpan (regrouping / carrying).',
      whyGoodEn: 'The real physical foundation of carrying and regrouping.'
    },
    {
      id: 'bar-model',
      name: 'Bar / Tape Model',
      nameEn: 'Bar / Tape Model',
      badge: 'Model Batang',
      badgeEn: 'Tape Diagram',
      icon: '📦',
      summary: 'Gunakan batang proporsional untuk membandingkan ukuran bagian pertama, bagian kedua, dan total gabungannya.',
      summaryEn: 'Use proportional bars to visualize part-whole relationships and the combined total.',
      whyGood: 'Jembatan terbaik untuk memahami soal cerita dan relasi bagian-ke-keseluruhan.',
      whyGoodEn: 'The best bridge for understanding word problems and part-whole logic.'
    },
    {
      id: 'mental-math',
      name: 'Mental Math',
      nameEn: 'Mental Math',
      badge: 'Angka Ramah',
      badgeEn: 'Friendly Numbers',
      icon: '🧠',
      summary: 'Atur angka di pikiran menjadi bentuk yang paling enak diajak kerja sama sebelum dieksekusi.',
      summaryEn: 'Rearrange numbers in your mind into the friendliest shapes before calculating.',
      whyGood: 'Melatih kelenturan berpikir (number sense) di kepala.',
      whyGoodEn: 'Builds mental flexibility and strong numerical intuition.'
    },
    {
      id: 'soroban',
      name: 'Soroban Abacus',
      nameEn: 'Soroban Abacus',
      badge: 'Sempoa Jepang',
      badgeEn: 'Japanese Abacus',
      icon: '🧮',
      summary: 'Pendekatan sempoa visual: manik atas bernilai 5 (surga) dan manik bawah bernilai 1 (bumi).',
      summaryEn: 'Visual bead abacus: upper bead equals 5 (heaven) and lower beads equal 1 (earth).',
      whyGood: 'Dasar visual berhitung cepat yang melatih fokus dan bayangan mental.',
      whyGoodEn: 'Visual foundation for high-speed calculation and vivid mental math imaging.'
    },
    {
      id: 'tens-frame',
      name: 'Kotak 10 Frame',
      nameEn: 'Ten-Frames',
      badge: 'Kelas 1 SD',
      badgeEn: 'Grade 1 Math',
      icon: '🔴',
      summary: 'Alat peraga visual Kotak 10 (Ten-Frame) standar Kelas 1 SD untuk melihat pengelompokan Kawan 10 dan sisa satuannya secara nyata!',
      summaryEn: 'Visual Ten-Frame manipulatives designed for 1st graders to intuitively spot Make-10 pairs and leftover units!',
      whyGood: 'Sangat cocok untuk anak Kelas 1 SD karena dapat menghitung benda nyata dan melihat kapan kotak terisi penuh 10.',
      whyGoodEn: 'Perfect for 1st graders to count concrete objects and visualize when a frame reaches a full ten.'
    },
    {
      id: 'rekenrek',
      name: 'Rekenrek Belanda',
      nameEn: 'Rekenrek Rack',
      badge: 'Sempoa 2-Warna',
      badgeEn: 'Dutch 2-Color Rack',
      icon: '🔴⚪',
      summary: 'Sempoa 2-warna (5 Merah & 5 Putih) dari Belanda. Latih mata melihat Kawan 5 dan 10 seketika tanpa menghitung satu per satu!',
      summaryEn: 'Dutch 2-color counting rack (5 Red & 5 White beads). Subitize groups of 5 and 10 instantly without one-by-one counting!',
      whyGood: 'Standar kurikulum Belanda & Singapura yang melatih kecepatan visualisasi kuantitas 5 dan 10 di kepala anak.',
      whyGoodEn: 'Dutch & Singapore curriculum gold standard training children to instantly visualize quantities of 5 and 10.'
    },
    {
      id: 'jarimatika',
      name: 'Jarimatika Ajaib',
      nameEn: 'Finger Math',
      badge: 'Jari Tangan 1–99',
      badgeEn: 'Fingers 1–99',
      icon: '🖐️',
      summary: 'Berhitung super cepat dengan 10 jari ajaib: Tangan kiri bernilai Puluhan (Jempol=50, 4 jari=10) dan Tangan kanan Satuan (Jempol=5, 4 jari=1)!',
      summaryEn: 'Super fast math with 10 magic fingers: Left hand represents Tens (Thumb=50, fingers=10) & Right hand Ones (Thumb=5, fingers=1)!',
      whyGood: 'Alat peraga alami yang selalu dibawa ke mana pun anak pergi tanpa perlu alat tulis.',
      whyGoodEn: 'A natural, portable manipulative that children always carry with them everywhere without needing paper.'
    },
    {
      id: 'number-pyramid',
      name: 'Piramida Bilangan',
      nameEn: 'Number Pyramid',
      badge: 'Dinding Balok',
      badgeEn: 'Brick Wall Math',
      icon: '🔺',
      summary: 'Dinding balok susun piramida Cambridge: Setiap balok di atas adalah hasil penjumlahan dari dua balok tepat di bawahnya!',
      summaryEn: 'Cambridge brick wall pyramid: Each brick above is the exact sum of the two bricks directly supporting it below!',
      whyGood: 'Mengasah logika spasial, relasi bagian-ke-keseluruhan (part-whole), dan pemecahan masalah bertahap.',
      whyGoodEn: 'Sharpens spatial logic, part-to-whole relationships, and structured multi-step problem solving.'
    },
    {
      id: 'dot-array',
      name: 'Larik Titik Pola',
      nameEn: 'Dot Array Grid',
      badge: 'Montessori & Pola',
      badgeEn: 'Pattern Array',
      icon: '🟣',
      summary: 'Susunan titik terstruktur per baris 10 (dibagi 5+5). Memperlihatkan pola genap/ganjil, puluhan penuh, dan jembatan ke perkalian!',
      summaryEn: 'Structured dot array in rows of 10 (grouped 5+5). Clearly shows even/odd patterns, full tens, and bridges to multiplication!',
      whyGood: 'Sangat disukai anak tipe visual karena angka terlihat sebagai formasi keteraturan geometri yang rapi.',
      whyGoodEn: 'Loved by visual learners because numbers appear as neat, geometric regular formations.'
    }
  ],

  // Preset Pilihan Cepat Soal Flagship & Variasi (Termasuk Level Khusus Kelas 1 SD)
  presetExamples: [
    // --- Level 1: Sahabat 10 (Kelas 1 SD) ---
    { a: 6, b: 4, level: 'sd1', label: '6 + 4 (Pas 10 Sempurna)', labelEn: '6 + 4 (Make 10 Perfect)' },
    { a: 7, b: 5, level: 'sd1', label: '7 + 5 (Kawan 10 Dasar)', labelEn: '7 + 5 (Make 10 Basic)', highlight: true },
    { a: 8, b: 6, level: 'sd1', label: '8 + 6 (Bikin 10 Ceria)', labelEn: '8 + 6 (Make 10 Fun)' },
    { a: 9, b: 4, level: 'sd1', label: '9 + 4 (Hampir 10)', labelEn: '9 + 4 (Near 10)' },
    { a: 8, b: 7, level: 'sd1', label: '8 + 7 (Dobel + 1)', labelEn: '8 + 7 (Doubles + 1)' },
    { a: 9, b: 5, level: 'sd1', label: '9 + 5 (Lompat 10)', labelEn: '9 + 5 (Jump 10)' },
    // --- Level 2: Menembus Puluhan (Kelas 1 SD) ---
    { a: 12, b: 6, level: 'sd1', label: '12 + 6 (Satuan Sahabat)', labelEn: '12 + 6 (Friendly Units)' },
    { a: 15, b: 8, level: 'sd1', label: '15 + 8 (Lompat Puluhan)', labelEn: '15 + 8 (Jump Tens)' },
    { a: 24, b: 13, level: 'sd1', label: '24 + 13 (Puluhan Bersahabat)', labelEn: '24 + 13 (Friendly Tens)' },
    { a: 36, b: 19, level: 'sd1', label: '36 + 19 (Dekat 20)', labelEn: '36 + 19 (Near 20)' },
    { a: 25, b: 25, level: 'sd1', label: '25 + 25 (Pas Setengah Ratus)', labelEn: '25 + 25 (Double 25)' },
    // --- Level 3: Mahir Ratusan & Flagship Soal ---
    { a: 67, b: 59, level: 'master', label: '67 + 59 (Flagship Master)', labelEn: '67 + 59 (Flagship Master)', highlight: true },
    { a: 68, b: 32, level: 'master', label: '68 + 32 (Pas 100 Bulat)', labelEn: '68 + 32 (Make 100)' },
    { a: 125, b: 75, level: 'master', label: '125 + 75 (Ratusan)', labelEn: '125 + 75 (Hundreds)' }
  ],

  // Bank Soal Latihan Multi-Strategi
  practiceProblems: [
    {
      id: 'p1',
      a: 67,
      b: 59,
      answer: 126,
      question: '67 + 59 = ?',
      story: 'Kadek mengumpulkan 67 kerang di pantai Sanur, lalu Wayan memberinya 59 kerang lagi. Berapa total kerang mereka sekarang?',
      storyEn: 'Kadek collected 67 seashells at Sanur Beach, then Wayan gave him 59 more. How many seashells do they have in total?',
      recommended: ['compensation', 'make-hundred', 'decomposition'],
      hints: [
        '💡 Petunjuk 1: Coba perhatikan angka 59. Angka ini hampir jadi angka berapa yang bulat ya?',
        '💡 Petunjuk 2: 59 hampir jadi 60! Coba bayangkan 67 + 60 dulu. Berapa hasilnya?',
        '💡 Petunjuk 3: 67 + 60 = 127. Karena tadi kita melebihkan 1, sekarang kurangi 1: 127 - 1 = 126! 🎉'
      ],
      hintsEn: [
        '💡 Hint 1: Look closely at 59. What round number is it almost close to?',
        '💡 Hint 2: 59 is almost 60! First imagine 67 + 60. What do you get?',
        '💡 Hint 3: 67 + 60 = 127. Since we added 1 too many, subtract 1 now: 127 - 1 = 126! 🎉'
      ],
      explanation: '59 → 60. Maka 67 + 60 = 127. Lalu kembalikan 1: 127 - 1 = 126!',
      explanationEn: '59 → 60. Then 67 + 60 = 127. Subtract 1: 127 - 1 = 126!'
    },
    {
      id: 'p2',
      a: 68,
      b: 32,
      answer: 100,
      question: '68 + 32 = ?',
      story: 'Ibu membeli 68 kue lapis dan 32 lemper untuk perayaan sekolah. Berapa jumlah kue semuanya?',
      storyEn: 'Mom bought 68 layer cakes and 32 sticky rice snacks for the school festival. How many cakes are there altogether?',
      recommended: ['make-hundred', 'decomposition'],
      hints: [
        '💡 Petunjuk 1: Coba lihat satuannya: 8 + 2. Pas banget menghasilkan berapa?',
        '💡 Petunjuk 2: 8 + 2 = 10. Sekarang puluhan: 60 + 30 = 90.',
        '💡 Petunjuk 3: 90 + 10 = 100 bulat sempurna! Keren banget kan?'
      ],
      hintsEn: [
        '💡 Hint 1: Check the ones digits: 8 + 2. What perfect number do they make?',
        '💡 Hint 2: 8 + 2 = 10. Now add the tens: 60 + 30 = 90.',
        '💡 Hint 3: 90 + 10 = 100 perfectly! Awesome, right?'
      ],
      explanation: '68 butuh 32 untuk menjadi 100. Pasangan sempurna langsung menghasilkan 100!',
      explanationEn: '68 needs 32 to become 100. Perfect partners instantly make 100!'
    },
    {
      id: 'p3',
      a: 125,
      b: 75,
      answer: 200,
      question: '125 + 75 = ?',
      story: 'Di perpustakaan ada 125 buku dongeng dan 75 buku ensiklopedia. Berapa jumlah buku seluruhnya?',
      storyEn: 'In the library there are 125 storybooks and 75 encyclopedias. How many books are there in total?',
      recommended: ['make-hundred', 'number-line'],
      hints: [
        '💡 Petunjuk 1: Fokus ke ekornya: 25 + 75 itu pasangan istimewa loh!',
        '💡 Petunjuk 2: 25 + 75 = 100. Sekarang satukan dengan 100 yang ada di depan 125.',
        '💡 Petunjuk 3: 100 + 100 = 200! Tepat sekali!'
      ],
      hintsEn: [
        '💡 Hint 1: Look at the endings: 25 + 75 is a famous pair!',
        '💡 Hint 2: 25 + 75 = 100. Now combine with the 100 in front of 125.',
        '💡 Hint 3: 100 + 100 = 200! Exactly right!'
      ],
      explanation: '125 + 75 = 100 + (25 + 75) = 100 + 100 = 200!',
      explanationEn: '125 + 75 = 100 + (25 + 75) = 100 + 100 = 200!'
    },
    {
      id: 'p4',
      a: 49,
      b: 51,
      answer: 100,
      question: '49 + 51 = ?',
      story: 'Budi punya 49 kelereng biru dan 51 kelereng merah. Berapa kelereng Budi semuanya?',
      storyEn: 'Budi has 49 blue marbles and 51 red marbles. How many marbles does Budi have in total?',
      recommended: ['compensation', 'make-hundred'],
      hints: [
        '💡 Petunjuk 1: Pindahkan 1 kelereng dari 51 ke 49.',
        '💡 Petunjuk 2: Sekarang kedua kelompok sama-sama menjadi 50 dan 50!',
        '💡 Petunjuk 3: 50 + 50 = 100! Seimbang dan sangat cepat!'
      ],
      hintsEn: [
        '💡 Hint 1: Move 1 marble from 51 to 49.',
        '💡 Hint 2: Now both piles become 50 and 50!',
        '💡 Hint 3: 50 + 50 = 100! Balanced and super quick!'
      ],
      explanation: 'Pindahkan 1 dari 51 ke 49 → menjadi 50 + 50 = 100!',
      explanationEn: 'Shift 1 from 51 to 49 → becomes 50 + 50 = 100!'
    },
    {
      id: 'p5',
      a: 58,
      b: 29,
      answer: 87,
      question: '58 + 29 = ?',
      story: 'Ada 58 burung di pohon beringin dan datang lagi 29 burung. Berapa burung semuanya?',
      storyEn: 'There are 58 birds on the banyan tree and 29 more join in. How many birds are there altogether?',
      recommended: ['compensation', 'number-line'],
      hints: [
        '💡 Petunjuk 1: 29 hampir jadi 30 (cuma kurang 1).',
        '💡 Petunjuk 2: Hitung 58 + 30 = 88.',
        '💡 Petunjuk 3: Kurangi 1 karena tadi kebanyakan: 88 - 1 = 87!'
      ],
      hintsEn: [
        '💡 Hint 1: 29 is almost 30 (just 1 away).',
        '💡 Hint 2: Add 58 + 30 = 88.',
        '💡 Hint 3: Subtract 1 because we added 1 too many: 88 - 1 = 87!'
      ],
      explanation: '58 + 30 = 88. Lalu 88 - 1 = 87!',
      explanationEn: '58 + 30 = 88. Then 88 - 1 = 87!'
    },
    {
      id: 'p6',
      a: 6,
      b: 4,
      answer: 10,
      question: '6 + 4 = ?',
      story: 'Siti memetik 6 apel merah manis, lalu adik memetik 4 apel hijau segar. Berapa buah apel mereka seluruhnya?',
      storyEn: 'Siti picked 6 sweet red apples, and little brother picked 4 fresh green apples. How many apples do they have altogether?',
      recommended: ['tens-frames', 'number-bonds'],
      hints: [
        '💡 Petunjuk 1: Coba isi Kotak 10 dengan 6 apel merah terlebih dahulu.',
        '💡 Petunjuk 2: Masih ada 4 slot kosong di kotak tersebut. Masukkan 4 apel hijau!',
        '💡 Petunjuk 3: Kotak 10 langsung terisi penuh! Jadi 6 + 4 = 10 bulat sempurna! 🎉'
      ],
      hintsEn: [
        '💡 Hint 1: Fill the Ten-Frame with 6 red apples first.',
        '💡 Hint 2: There are 4 empty slots left. Place the 4 green apples in!',
        '💡 Hint 3: The Ten-Frame is completely full! So 6 + 4 = 10 perfectly! 🎉'
      ],
      explanation: '6 dan 4 adalah pasangan Kawan 10 yang langsung menggenapkan 10 penuh!',
      explanationEn: '6 and 4 are Friends of 10 partners that instantly fill a ten!'
    },
    {
      id: 'p7',
      a: 9,
      b: 5,
      answer: 14,
      question: '9 + 5 = ?',
      story: 'Rani memiliki 9 pensil warna di meja belajarnya, lalu Ibu memberinya hadiah 5 pensil warna baru. Berapa pensil warna Rani sekarang?',
      storyEn: 'Rani has 9 colored pencils on her desk, then Mom gifts her 5 new colored pencils. How many colored pencils does Rani have now?',
      recommended: ['tens-frames', 'compensation', 'number-line'],
      hints: [
        '💡 Petunjuk 1: Angka 9 cuma butuh 1 kawan lagi untuk genap jadi 10.',
        '💡 Petunjuk 2: Pinjam 1 dari 5, sehingga 9 menjadi 10 penuh! Angka 5 tersisa 4.',
        '💡 Petunjuk 3: 10 ditambah sisa 4 hasilnya adalah 14!'
      ],
      hintsEn: [
        '💡 Hint 1: Number 9 only needs 1 friend to become a full 10.',
        '💡 Hint 2: Borrow 1 from 5, so 9 becomes 10! 5 has 4 left.',
        '💡 Hint 3: 10 plus remaining 4 equals 14!'
      ],
      explanation: '9 + 1 = 10. Sisa 4. Maka 10 + 4 = 14!',
      explanationEn: '9 + 1 = 10. Remaining 4. Thus 10 + 4 = 14!'
    },
    {
      id: 'p8',
      a: 8,
      b: 7,
      answer: 15,
      question: '8 + 7 = ?',
      story: 'Di taman bunga ada 8 kupu-kupu kuning dan 7 kupu-kupu biru yang sedang terbang ceria. Berapa kupu-kupu yang ada di taman?',
      storyEn: 'In the flower garden there are 8 yellow butterflies and 7 blue butterflies fluttering merrily. How many butterflies are in the garden?',
      recommended: ['doubles', 'tens-frames', 'number-line'],
      hints: [
        '💡 Petunjuk 1: Coba gunakan jurus Kembar! Kita tahu 7 + 7 = 14.',
        '💡 Petunjuk 2: Karena 8 itu 7 + 1, tambahkan 1 pada hasil kembar: 14 + 1.',
        '💡 Petunjuk 3: Hasilnya adalah 15! Sangat cerdas dan cepat!'
      ],
      hintsEn: [
        '💡 Hint 1: Try the Doubles trick! We know 7 + 7 = 14.',
        '💡 Hint 2: Since 8 is 7 + 1, add 1 to the doubles total: 14 + 1.',
        '💡 Hint 3: The result is 15! Super smart and quick!'
      ],
      explanation: 'Jurus Dobel + 1: 7 + 7 = 14, lalu 14 + 1 = 15!',
      explanationEn: 'Doubles + 1 trick: 7 + 7 = 14, then 14 + 1 = 15!'
    },
    {
      id: 'p9',
      a: 14,
      b: 6,
      answer: 20,
      question: '14 + 6 = ?',
      story: 'Budi sudah mengumpulkan 14 stiker pahlawan nusantara, lalu ia mendapat 6 stiker lagi dari Ayah. Berapa stiker Budi sekarang?',
      storyEn: 'Budi collected 14 national hero stickers, then received 6 more stickers from Dad. How many stickers does Budi have now?',
      recommended: ['number-bonds', 'tens-frames'],
      hints: [
        '💡 Petunjuk 1: Lihat satuannya: 4 dan 6 adalah pasangan serasi Kawan 10.',
        '💡 Petunjuk 2: 4 + 6 = 10 bulat.',
        '💡 Petunjuk 3: Gabungkan 10 yang baru dengan 10 di depan angka 14: 10 + 10 = 20! 🌟'
      ],
      hintsEn: [
        '💡 Hint 1: Check the units: 4 and 6 are perfect Friends of 10.',
        '💡 Hint 2: 4 + 6 = 10 round.',
        '💡 Hint 3: Combine with the 10 from 14: 10 + 10 = 20! 🌟'
      ],
      explanation: '14 + 6 = 10 + (4 + 6) = 10 + 10 = 20!',
      explanationEn: '14 + 6 = 10 + (4 + 6) = 10 + 10 = 20!'
    },
    {
      id: 'p10',
      a: 19,
      b: 12,
      answer: 31,
      question: '19 + 12 = ?',
      story: 'Di dalam toples ada 19 permen stroberi manis dan 12 permen jeruk segar. Berapa jumlah semua permen di dalam toples?',
      storyEn: 'Inside the jar there are 19 sweet strawberry candies and 12 fresh orange candies. How many candies are there in total?',
      recommended: ['compensation', 'decomposition', 'number-line'],
      hints: [
        '💡 Petunjuk 1: 19 hampir jadi 20 (cuma butuh 1 lagi).',
        '💡 Petunjuk 2: Pindahkan 1 permen dari 12 ke 19, sehingga menjadi 20 + 11.',
        '💡 Petunjuk 3: 20 + 11 = 31! Cepat dan mudah dihitung di kepala!'
      ],
      hintsEn: [
        '💡 Hint 1: 19 is almost 20 (needs just 1).',
        '💡 Hint 2: Shift 1 candy from 12 to 19, becoming 20 + 11.',
        '💡 Hint 3: 20 + 11 = 31! Fast and effortless in mental math!'
      ],
      explanation: 'Kompensasi: 19 + 1 = 20. Lalu 20 + 11 = 31!',
      explanationEn: 'Compensation: 19 + 1 = 20. Then 20 + 11 = 31!'
    },
    {
      id: 'p11',
      a: 25,
      b: 15,
      answer: 40,
      question: '25 + 15 = ?',
      story: 'Made menabung 25 koin di celengan ayamnya, kemudian Kakek memberinya 15 koin tambahan. Berapa koin di celengan Made sekarang?',
      storyEn: 'Made saved 25 coins in his piggy bank, then Grandpa gave him 15 more coins. How many coins are in Made’s piggy bank now?',
      recommended: ['number-bonds', 'decomposition'],
      hints: [
        '💡 Petunjuk 1: Gabungkan satuannya dulu: 5 + 5 = 10.',
        '💡 Petunjuk 2: Jumlahkan puluhannya: 20 + 10 = 30.',
        '💡 Petunjuk 3: Satukan keduanya: 30 + 10 = 40! Bulat sempurna!'
      ],
      hintsEn: [
        '💡 Hint 1: Add the units first: 5 + 5 = 10.',
        '💡 Hint 2: Add the tens: 20 + 10 = 30.',
        '💡 Hint 3: Put them together: 30 + 10 = 40! Perfectly round!'
      ],
      explanation: '(20 + 10) + (5 + 5) = 30 + 10 = 40!',
      explanationEn: '(20 + 10) + (5 + 5) = 30 + 10 = 40!'
    },
    {
      id: 'p12',
      a: 38,
      b: 9,
      answer: 47,
      question: '38 + 9 = ?',
      story: 'Di rak buku kelas ada 38 buku cerita, lalu Bu Guru membawa 9 buku ensiklopedia baru. Berapa buku di rak sekarang?',
      storyEn: 'On the classroom bookshelf there are 38 storybooks, then Teacher brings 9 new encyclopedias. How many books are on the shelf now?',
      recommended: ['compensation', 'number-line'],
      hints: [
        '💡 Petunjuk 1: 9 hampir jadi 10! Hitung 38 + 10 dulu.',
        '💡 Petunjuk 2: 38 + 10 = 48.',
        '💡 Petunjuk 3: Karena tadi melebihkan 1, sekarang kurangi 1: 48 - 1 = 47!'
      ],
      hintsEn: [
        '💡 Hint 1: 9 is almost 10! Add 38 + 10 first.',
        '💡 Hint 2: 38 + 10 = 48.',
        '💡 Hint 3: Since we added 1 extra, subtract 1: 48 - 1 = 47!'
      ],
      explanation: '38 + 10 = 48. Lalu 48 - 1 = 47!',
      explanationEn: '38 + 10 = 48. Then 48 - 1 = 47!'
    },
    {
      id: 'p13',
      a: 45,
      b: 25,
      answer: 70,
      question: '45 + 25 = ?',
      story: 'Paman memanen 45 buah mangga harum manis dan 25 buah jeruk bali dari kebun buah. Berapa total buah panen paman?',
      storyEn: 'Uncle harvested 45 sweet mangoes and 25 pomelos from the orchard. What is the total fruit harvest?',
      recommended: ['decomposition', 'number-bonds'],
      hints: [
        '💡 Petunjuk 1: Pasangan 5 + 5 selalu menghasilkan 10.',
        '💡 Petunjuk 2: Puluhannya adalah 40 + 20 = 60.',
        '💡 Petunjuk 3: 60 + 10 = 70! Berhasil!'
      ],
      hintsEn: [
        '💡 Hint 1: Pair 5 + 5 always makes 10.',
        '💡 Hint 2: Tens are 40 + 20 = 60.',
        '💡 Hint 3: 60 + 10 = 70! Success!'
      ],
      explanation: '45 + 25 = (40 + 20) + (5 + 5) = 60 + 10 = 70!',
      explanationEn: '45 + 25 = (40 + 20) + (5 + 5) = 60 + 10 = 70!'
    },
    {
      id: 'p14',
      a: 33,
      b: 27,
      answer: 60,
      question: '33 + 27 = ?',
      story: 'Di arena bermain ada 33 balok susun warna biru dan 27 balok warna kuning. Berapa balok susun semuanya?',
      storyEn: 'In the play area there are 33 blue building blocks and 27 yellow blocks. How many building blocks are there altogether?',
      recommended: ['number-bonds', 'make-hundred', 'decomposition'],
      hints: [
        '💡 Petunjuk 1: Lihat satuannya: 3 + 7 = 10 pas!',
        '💡 Petunjuk 2: Puluhannya: 30 + 20 = 50.',
        '💡 Petunjuk 3: 50 + 10 = 60 pas tanpa sisa!'
      ],
      hintsEn: [
        '💡 Hint 1: Check units: 3 + 7 = 10 exactly!',
        '💡 Hint 2: Tens: 30 + 20 = 50.',
        '💡 Hint 3: 50 + 10 = 60 without remainder!'
      ],
      explanation: '33 + 27 = (30 + 20) + (3 + 7) = 50 + 10 = 60!',
      explanationEn: '33 + 27 = (30 + 20) + (3 + 7) = 50 + 10 = 60!'
    },
    {
      id: 'p15',
      a: 75,
      b: 25,
      answer: 100,
      question: '75 + 25 = ?',
      story: 'Lani memiliki 75 butir kelereng kaca kristal, lalu Kakak menghadiahkan 25 butir lagi. Berapa jumlah kelereng Lani seluruhnya?',
      storyEn: 'Lani has 75 crystal glass marbles, then big sister gifts her 25 more. How many marbles does Lani have in total?',
      recommended: ['make-hundred', 'number-bonds'],
      hints: [
        '💡 Petunjuk 1: 75 dan 25 adalah pasangan emas menuju 100.',
        '💡 Petunjuk 2: Bayangkan uang koin 75 sen ditambah 25 sen.',
        '💡 Petunjuk 3: Tepat menjadi 100 bulat sempurna! 💯'
      ],
      hintsEn: [
        '💡 Hint 1: 75 and 25 are the golden pair making 100.',
        '💡 Hint 2: Imagine coins 75 cents plus 25 cents.',
        '💡 Hint 3: Exactly makes a perfect 100! 💯'
      ],
      explanation: '75 + 25 = 100 bulat sempurna! Pasangan kawan seratus.',
      explanationEn: '75 + 25 = 100 perfectly! Friends of 100 pair.'
    }
  ],

  // Pertanyaan Metakognisi Setelah Berhasil
  metacognition: {
    question: 'Kenapa kamu memilih cara ini?',
    questionEn: 'Why did you choose this strategy?',
    options: [
      { id: 'opt1', text: '🧩 Angkanya gampang dipecah puluhan & satuan', textEn: '🧩 Numbers easily split into tens & ones' },
      { id: 'opt2', text: '🔟 Bisa langsung dibikin pas 100', textEn: '🔟 Can quickly round up to 100' },
      { id: 'opt3', text: '⚖️ Enak dibulatkan lalu dikembalikan lebihnya', textEn: '⚖️ Easy to round up then adjust the difference' },
      { id: 'opt4', text: '📏 Paling jelas dan kelihatan di garis bilangan', textEn: '📏 Clearest and easiest to see on number line' },
      { id: 'opt5', text: '⚡ Cara ini terasa paling santai di kepalaku', textEn: '⚡ Feels most effortless in my head' }
    ]
  },

  // Lencana Penghargaan Eksplorasi (Reward Mindset)
  badges: [
    { id: 'badge-decomp', name: 'Number Builder', icon: '🧩', desc: 'Mencoba jurus Pecah Angka', descEn: 'Tried Split Numbers strategy' },
    { id: 'badge-make100', name: 'Hundred Maker', icon: '🔟', desc: 'Menggenapkan angka ke 100', descEn: 'Rounded numbers up to 100' },
    { id: 'badge-line', name: 'Number Line Rider', icon: '📏', desc: 'Melompat chunk di Garis Bilangan', descEn: 'Made chunk jumps on Number Line' },
    { id: 'badge-blocks', name: 'Block Master', icon: '🧱', desc: 'Menata balok dan regrouping', descEn: 'Regrouped Base-Ten blocks' },
    { id: 'badge-comp', name: 'Balance Wizard', icon: '⚖️', desc: 'Menguasai jurus Kompensasi', descEn: 'Mastered Compensation trick' },
    { id: 'badge-abacus', name: 'Abacus Explorer', icon: '🧮', desc: 'Menjelajahi sempoa Soroban', descEn: 'Explored Soroban abacus beads' },
    { id: 'badge-rekenrek', name: 'Rekenrek Champion', icon: '🔴⚪', desc: 'Menghitung dengan Sempoa Belanda 2-warna', descEn: 'Counted with Dutch 2-color Rekenrek' },
    { id: 'badge-jarimatika', name: 'Master Jarimatika', icon: '🖐️', desc: 'Berhitung cepat dengan 10 jari tangan ajaib', descEn: 'Fast finger math with magic 10 fingers' },
    { id: 'badge-pyramid', name: 'Pyramid Architect', icon: '🔺', desc: 'Menyusun piramida dinding bilangan', descEn: 'Built number wall pyramid bricks' },
    { id: 'badge-dotarray', name: 'Pattern Spotter', icon: '🟣', desc: 'Melihat pola terstruktur larik titik', descEn: 'Spotted structured patterns in dot array' }
  ]
};
