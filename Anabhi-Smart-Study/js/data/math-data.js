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
    }
  ],

  // Preset Pilihan Cepat Soal Flagship & Variasi (Termasuk Level Khusus Kelas 1 SD)
  presetExamples: [
    // --- Level 1: Sahabat 10 (Kelas 1 SD) ---
    { a: 7, b: 5, level: 'sd1', label: '7 + 5 (Kawan 10 Dasar)', labelEn: '7 + 5 (Make 10 Basic)', highlight: true },
    { a: 8, b: 6, level: 'sd1', label: '8 + 6 (Bikin 10 Ceria)', labelEn: '8 + 6 (Make 10 Fun)' },
    { a: 9, b: 4, level: 'sd1', label: '9 + 4 (Hampir 10)', labelEn: '9 + 4 (Near 10)' },
    { a: 8, b: 7, level: 'sd1', label: '8 + 7 (Dobel + 1)', labelEn: '8 + 7 (Doubles + 1)' },
    // --- Level 2: Menembus Puluhan (Kelas 1 SD) ---
    { a: 15, b: 8, level: 'sd1', label: '15 + 8 (Lompat Puluhan)', labelEn: '15 + 8 (Jump Tens)' },
    { a: 24, b: 13, level: 'sd1', label: '24 + 13 (Puluhan Bersahabat)', labelEn: '24 + 13 (Friendly Tens)' },
    { a: 36, b: 19, level: 'sd1', label: '36 + 19 (Dekat 20)', labelEn: '36 + 19 (Near 20)' },
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
    { id: 'badge-abacus', name: 'Abacus Explorer', icon: '🧮', desc: 'Menjelajahi sempoa Soroban', descEn: 'Explored Soroban abacus beads' }
  ]
};
