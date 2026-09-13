// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Kokurikuler / Proyek P5 Subject Data
// Development · Anabhi Dev
// Version   : 2.1 (Comprehensive LKS, 100 Flagship Questions & Proyek Pelajar Pancasila)
// ================================================================

export const KOKURIKULER_DATA = {
  id: 'kokurikuler',
  title: 'Kokurikuler & Proyek P5 — Kreasi Cilik Berdampak Nyata',
  titleEn: 'Co-Curricular & P5 Projects — Hands-on Discovery & Innovation',
  subtitle: 'Belajar kontekstual dan aksi nyata: pilah sampah ramah bumi, permainan tradisional, eksperimen sains, dan kebun sekolah! 🌱',
  subtitleEn: 'Contextual project-based learning: waste segregation, traditional games, science experiments, and eco school gardening! 🌱',
  topics: [
    {
      id: 'p5-sampah-lestari',
      title: 'P5 Gaya Hidup Berkelanjutan: Pilah Sampah Mandiri',
      titleEn: 'P5 Sustainable Lifestyle: Waste Segregation Mission',
      desc: 'Bumi kita membutuhkan bantuan kita untuk tetap bersih dan hijau! Sampah ORGANIK (sisa makanan, kulit buah, daun) bisa diolah menjadi pupuk kompos penyubur tanaman. Sampah ANORGANIK (botol plastik, kaleng, kardus) dapat didaur ulang menjadi pot bunga atau tempat pensil kreatif!',
      descEn: 'Our home planet needs our mindful care! ORGANIC waste (food peels, fallen leaves) turns into nutrient-rich compost. INORGANIC recyclables (plastic bottles, tin cans, cardboard) can be upcycled into cheerful pencil holders and planters!',
      funFact: 'Satu botol plastik membutuhkan waktu hingga 450 tahun untuk terurai di alam! Dengan mendaur ulangnya menjadi pot bunga, kita telah menyelamatkan bumi!',
      keyPoints: [
        'Sampah organik berasal dari makhluk hidup (daun, sisa buah) dan mudah membusuk jadi kompos.',
        'Sampah anorganik (plastik, kaleng, kaca) sulit membusuk dan harus didaur ulang (recycle).',
        'Prinsip 3R: Reduce (mengurangi), Reuse (menggunakan kembali), Recycle (mendaur ulang).'
      ],
      checklist: [
        'Misi 1: Sediakan 2 kantong/tempat sampah berbeda di rumah: Hijau untuk organik dan Kuning untuk plastik.',
        'Misi 2: Kumpulkan 1 botol plastik bekas minuman, bersihkan, dan hias menjadi pot tanaman mini.',
        'Misi 3: Lakukan operasi semut selama 5 menit: kumpulkan sampah kering di sekitarmu dan buang ke tempatnya.'
      ],
      checklistEn: [
        'Mission 1: Set up 2 separate bins at home: Green for organic peels and Yellow for recyclable plastics.',
        'Mission 2: Clean and decorate 1 recycled plastic bottle into a tabletop succulent planter.',
        'Mission 3: Complete a 5-minute litter sweep around your yard and dispose of trash responsibly.'
      ],
      activities: [
        { q: 'Sisa kulit pisang dan dedaunan kering yang berguguran termasuk ke dalam kelompok sampah...', options: ['Organik (dapat membusuk alami)', 'Anorganik (plastik)', 'Limbah B3 beracun', 'Batu mulia'], answer: 'Organik (dapat membusuk alami)', hint: 'Organik berasal dari makhluk hidup dan dapat diolah jadi kompos 🍂' },
        { q: 'Apa tindakan terbaik untuk memanfaatkan botol plastik air mineral bekas yang masih bersih?', options: ['Mendaur ulang menjadi pot tanaman gantung atau tempat pensil', 'Membakarnya di pekarangan hingga berasap tebal', 'Membuangnya ke selokan atau sungai', 'Menimbunnya di dalam tanah'], answer: 'Mendaur ulang menjadi pot tanaman gantung atau tempat pensil', hint: 'Daur ulang (Upcycling) mengurangi timbunan sampah plastik di bumi.' },
        { q: 'Warna tempat sampah yang lazim digunakan untuk menampung sampah organik (daun dan sisa makanan) adalah...', options: ['Warna Hijau', 'Warna Kuning', 'Warna Merah menyala', 'Warna Hitam gelap'], answer: 'Warna Hijau', hint: 'Warna hijau melambangkan dedaunan alami dan sisa hasil bumi yang dapat terurai.' },
        { q: 'Contoh sampah yang termasuk kategori ANORGANIK adalah...', options: ['Gelas plastik, kaleng soda, dan styrofoam', 'Kulit jeruk manis', 'Nasi sisa kemarin', 'Daun mangga kering'], answer: 'Gelas plastik, kaleng soda, dan styrofoam', hint: 'Sampah anorganik dibuat dari bahan sintetis atau tambang pabrik.' },
        { q: 'Istilah "Reuse" dalam prinsip peduli lingkungan 3R berarti...', options: ['Menggunakan kembali barang bekas untuk keperluan yang bermanfaat', 'Membeli barang baru sebanyak-banyaknya', 'Membakar sampah di malam hari', 'Membuang barang yang masih bagus'], answer: 'Menggunakan kembali barang bekas untuk keperluan yang bermanfaat', hint: 'Misalnya menggunakan botol sirup bekas sebagai wadah air minum di rumah.' },
        { q: 'Mengapa kita dilarang membakar sampah plastik di halaman rumah?', options: ['Asap bakaran plastik menghasilkan racun dioksin yang merusak paru-paru', 'Karena apinya berwarna ungu', 'Supaya sampah tidak habis', 'Karena plastik bisa berubah jadi emas'], answer: 'Asap bakaran plastik menghasilkan racun dioksin yang merusak paru-paru', hint: 'Asap pembakaran plastik sangat berbahaya bagi pernapasan dan mencemari udara.' },
        { q: 'Pengolahan sisa sayuran dan daun kering menjadi pupuk penyubur tanaman disebut pembuatan...', options: ['Kompos organik', 'Plastik sintetis', 'Bahan bakar solar', 'Cat tembok'], answer: 'Kompos organik', hint: 'Mikroba tanah mengurai sisa organik menjadi humus hitam yang kaya hara.' },
        { q: 'Membawa tas belanja kain sendiri dari rumah saat berbelanja bersama ibu adalah contoh tindakan...', options: ['Reduce (mengurangi pemakaian kantong kresek plastik)', 'Boros uang belanja', 'Membuat repot', 'Merusak lingkungan'], answer: 'Reduce (mengurangi pemakaian kantong kresek plastik)', hint: 'Mengurangi sampah plastik sekali pakai langsung dari sumbernya.' },
        { q: 'Kegiatan gotong royong membersihkan sampah berserakan di halaman sekolah secara serentak disebut...', options: ['Operasi Semut bersih lingkungan', 'Upacara bendera', 'Lomba lari cepat', 'Tidur bersama'], answer: 'Operasi Semut bersih lingkungan', hint: 'Bekerja bersama-sama laksana semut membuat halaman bersih dalam sekejap.' },
        { q: 'Tempat sampah bertanda B3 (Bahan Berbahaya dan Beracun) biasanya digunakan untuk membuang...', options: ['Baterai bekas, pecahan kaca, dan botol obat nyamuk', 'Kulit apel', 'Kertas origami', 'Daun pisang'], answer: 'Baterai bekas, pecahan kaca, dan botol obat nyamuk', hint: 'Limbah kimia beracun dan benda tajam membutuhkan penanganan khusus yang aman.' }
      ],
      activitiesEn: [
        { q: 'Fallen dry leaves and fruit peels belong to which waste category?', options: ['Organic (naturally compostable)', 'Inorganic (plastic)', 'Hazardous chemical', 'Mineral'], answer: 'Organic (naturally compostable)', hint: 'Organic waste decomposes into rich soil fertilizer 🍂' },
        { q: 'What does "Reuse" mean in the 3R eco-friendly lifestyle?', options: ['Repurposing used items into useful household objects', 'Buying 100 new plastic bottles', 'Burning trash in the yard', 'Throwing away good items'], answer: 'Repurposing used items into useful household objects', hint: 'Reusing extends an object’s useful lifecycle.' }
      ]
    },
    {
      id: 'p5-kearifan-lokal',
      title: 'P5 Kearifan Lokal: Melestarikan Permainan Tradisional',
      titleEn: 'P5 Local Wisdom: Reviving Heritage Games',
      desc: 'Sebelum ada ponsel pintar, anak-anak Indonesia bermain permainan tradisional yang menyehatkan fisik dan mempererat persahabatan: Engklek (melompat dengan satu kaki di petak kotak), Egrang batok kelapa (keseimbangan kaki), Gobak Sodor (ketangkasan dan strategi tim), serta Congklak (berhitung biji kerang)!',
      descEn: 'Traditional Indonesian games build agile physical stamina and authentic social bonds: Engklek (hopscotch jumping), Coconut-shell Stilts (balance mastery), Gobak Sodor (tactical teamwork), and Congklak (mathematical shell counting)!',
      funFact: 'Permainan tradisional Congklak telah dimainkan di Nusantara sejak ratusan tahun lalu! Lubang-lubang papan congklak melambangkan lumbung padi dan perputaran hari dalam seminggu!',
      keyPoints: [
        'Permainan tradisional menyehatkan tubuh, melatih kecerdasan strategi, dan memupuk kerja sama.',
        'Contoh: Engklek (keseimbangan kaki), Gobak Sodor (kelincahan tim), Congklak (matematika ceria).',
        'Menjunjung tinggi sportivitas: menghargai kemenangan lawan dan bermain dengan jujur tanpa curang.'
      ],
      checklist: [
        'Misi 1: Gambar petak Engklek di lantai halaman dengan kapur tulis dan mainkan bersama teman.',
        'Misi 2: Buat sepasang egrang batok kelapa sederhana bersama ayah menggunakan tali tambang.',
        'Misi 3: Praktikkan sikap sportif: bersalaman dan memberi selamat kepada tim lawan saat menang atau kalah.'
      ],
      checklistEn: [
        'Mission 1: Chalk an Engklek hopscotch grid on the yard pavement and hop through the tiles.',
        'Mission 2: Craft coconut shell stilts with sturdy rope alongside your family.',
        'Mission 3: Practice good sportsmanship by congratulating opponents regardless of the score.'
      ],
      activities: [
        { q: 'Permainan tradisional melompat dengan satu kaki melintasi kotak-kotak berurutan yang digambar di tanah adalah...', options: ['Engklek / Sunda Manda', 'Bermain game online di HP', 'Menonton bioskop', 'Catur papan'], answer: 'Engklek / Sunda Manda', hint: 'Melatih keseimbangan kaki dan ketepatan melompat.' },
        { q: 'Nilai karakter luhur yang kita pelajari dari permainan tradisional beregu (seperti Gobak Sodor) adalah...', options: ['Kekompakan, strategi tim, dan sikap sportif jujur', 'Boleh curang asal menang', 'Menangis jika kalah', 'Mengejek teman yang jatuh'], answer: 'Kekompakan, strategi tim, dan sikap sportif jujur', hint: 'Sportivitas dan kerja sama adalah kunci permainan yang membahagiakan.' },
        { q: 'Alat alami dari alam yang digunakan dalam permainan tradisional Egrang batok adalah...', options: ['Dua belahan tempurung kelapa tua yang dilubangi dan diberi tali tambang', 'Sepatu roda besi', 'Roda sepeda motor', 'Balok es batu'], answer: 'Dua belahan tempurung kelapa tua yang dilubangi dan diberi tali tambang', hint: 'Jari kaki menjepit tali tambang sambil menginjak tempurung kelapa yang kokoh.' },
        { q: 'Permainan tradisional berhitung dengan mengisi 16 lubang kayu menggunakan biji sawo atau kerang kecil disebut...', options: ['Congklak (Dakon)', 'Gasing bambu', 'Layang-layang', 'Bakiak tandem'], answer: 'Congklak (Dakon)', hint: 'Congklak melatih keterampilan berhitung cepat dan ketelitian membagi biji.' },
        { q: 'Pecahan genteng atau lempengan batu pipih yang dilemparkan ke dalam kotak engklek disebut...', options: ['Gacuk', 'Gundu', 'Kelereng', 'Kok'], answer: 'Gacuk', hint: 'Gacuk dilempar tepat ke petak tanpa mengenai garis batas.' },
        { q: 'Permainan tradisional Gobak Sodor atau Galasin melatih ketangkasan dalam...', options: ['Berlari lincah menghindari sergapan penjaga garis', 'Berenang gaya dada', 'Mengetik cepat di komputer', 'Memasak sayur'], answer: 'Berlari lincah menghindari sergapan penjaga garis', hint: 'Pemain harus menerobos benteng garis tanpa tersentuh oleh penjaga lawan.' },
        { q: 'Benda yang diputar menggunakan tali benang lalu dilepas berputar di atas tanah dengan bunyi mendengung adalah...', options: ['Gasing kayu / bambu', 'Kelereng kaca', 'Engklek', 'Petak umpet'], answer: 'Gasing kayu / bambu', hint: 'Gasing berputar pada ujung paku kecilnya dengan gaya sentrifugal.' },
        { q: 'Manfaat bermain permainan tradisional bersama teman di halaman terbuka dibanding bermain gawai seharian adalah...', options: ['Tubuh aktif berkeringat sehat, mata segar, dan persahabatan semakin erat', 'Bisa menghabiskan kuota internet', 'Mata menjadi merah dan perih', 'Tubuh menjadi kaku lemas'], answer: 'Tubuh aktif berkeringat sehat, mata segar, dan persahabatan semakin erat', hint: 'Permainan luar ruang mengasah motorik dan interaksi sosial yang nyata.' },
        { q: 'Sikap kita saat tim kita mengalami kekalahan dalam pertandingan permainan tradisional adalah...', options: ['Menerima dengan lapang dada dan menyalami tim pemenang secara sportif', 'Merusak lapangan permainan', 'Menangis guling-guling di tanah', 'Menuduh wasit curang tanpa bukti'], answer: 'Menerima dengan lapang dada dan menyalami tim pemenang secara sportif', hint: 'Kekalahan adalah pengalaman berharga untuk berlatih lebih kompak lagi.' },
        { q: 'Permainan tradisional berjalan bersama 3 orang menggunakan sepasang papan kayu panjang berpijakan tali disebut...', options: ['Bakiak / Terompah panjang', 'Engklek', 'Kelereng', 'Bentengan'], answer: 'Bakiak / Terompah panjang', hint: 'Membutuhkan aba-aba serempak "Kanan-Kiri!" agar langkah kaki kompak seirama.' }
      ],
      activitiesEn: [
        { q: 'The classic one-legged hopping game jumping through chalked grid boxes is...', options: ['Engklek (Hopscotch)', 'Mobile video gaming', 'Watching movies', 'Chess tournament'], answer: 'Engklek (Hopscotch)', hint: 'Trains leg strength and single-foot balancing balance.' },
        { q: 'What moral virtue is nurtured by traditional group games?', options: ['Teamwork, strategy, and honest sportsmanship', 'Cheating quietly', 'Crying when defeated', 'Teasing fallen peers'], answer: 'Teamwork, strategy, and honest sportsmanship', hint: 'Fair play and cooperation build great character.' }
      ]
    },
    {
      id: 'p5-celengan-mandiri',
      title: 'P5 Kewirausahaan Cilik: Celengan Mandiri & Nilai Berhemat',
      titleEn: 'P5 Junior Entrepreneurship: Smart Savings & Budgeting',
      desc: 'Menjadi anak mandiri dimulai dari bijak mengatur uang saku. Kita belajar membedakan KEBUTUHAN (hal penting seperti buku tulis, makanan sehat, dan pensil) dengan KEINGINAN (mainan mewah atau jajan berlebihan). Menabung uang logam sisa jajan di celengan membuat kita siap menghadapi masa depan!',
      descEn: 'Independence starts with financial literacy. We distinguish between NEEDS (essential textbooks, wholesome food) and WANTS (fancy trinkets, sugary snacks). Saving daily change in a piggy bank prepares us for future success!',
      funFact: 'Di zaman kerajaan Majapahit abad ke-14 di Trowulan, masyarakat sudah membuat celengan berbentuk babi hutan dari tanah liat (terakota) untuk menyimpan koin gobog!',
      keyPoints: [
        'Kebutuhan adalah hal pokok yang harus dipenuhi (makanan bergizi, alat tulis belajar).',
        'Keinginan adalah hal tambahan yang bisa ditunda (mainan mahal, permen berlebih).',
        'Menabung sedikit demi sedikit secara konsisten ("sedikit-sedikit, lama-lama menjadi bukit").'
      ],
      checklist: [
        'Misi 1: Buat celengan buatanmu sendiri dari kaleng biskuit bekas atau kotak kardus sepatu.',
        'Misi 2: Sisihkan uang koin Rp1.000 atau Rp2.000 dari sisa uang sakumu ke dalam celengan setiap hari.',
        'Misi 3: Tuliskan 1 barang impian yang ingin kamu beli sendiri dari hasil menabung selama 3 bulan.'
      ],
      checklistEn: [
        'Mission 1: Upcycle a clean tin can or shoebox into a personalized savings bank.',
        'Mission 2: Deposit small spare change into your coin bank every single afternoon.',
        'Mission 3: Write down 1 meaningful goal you wish to achieve from 3 months of savings.'
      ],
      activities: [
        { q: 'Manakah di bawah ini yang merupakan contoh KEBUTUHAN utama seorang siswa sekolah?', options: ['Buku tulis dan pensil untuk belajar', 'Mainan robot mahal keluaran terbaru', 'Baju pesta yang mewah', 'Pulsa game online'], answer: 'Buku tulis dan pensil untuk belajar', hint: 'Kebutuhan adalah barang pokok yang sangat diperlukan untuk menuntut ilmu ✏️' },
        { q: 'Pepatah bijak nusantara mengatakan "Hemat pangkal kaya, rajin pangkal..."', options: ['Pandai', 'Malas', 'Bosan', 'Lapar'], answer: 'Pandai', hint: 'Rajin belajar membuat kita pintar dan berwawasan luas.' },
        { q: 'Barang yang tergolong KEINGINAN yang sebaiknya ditunda jika uang saku terbatas adalah...', options: ['Mainan mobil remote kontrol mahal', 'Buku pelajaran sekolah', 'Sarapan pagi bernutrisi', 'Ongkos angkutan ke sekolah'], answer: 'Mainan mobil remote kontrol mahal', hint: 'Keinginan bersifat hiburan tambahan yang tidak mendesak.' },
        { q: 'Tindakan terpuji yang kita lakukan terhadap uang koin sisa jajan di sekolah adalah...', options: ['Memasukkannya ke dalam celengan untuk ditabung', 'Membuangnya ke lantai karena berat', 'Menghabiskannya untuk membeli permen terus', 'Menyobek bungkusnya'], answer: 'Memasukkannya ke dalam celengan untuk ditabung', hint: 'Koin kecil yang dikumpulkan bertahun-tahun akan bernilai besar 💰' },
        { q: 'Makna dari peribahasa "Sedikit demi sedikit, lama-lama menjadi bukit" adalah...', options: ['Tabungan kecil yang dikumpulkan rutin lama-kelamaan menjadi sangat banyak', 'Bukit pasir mudah tertiup angin', 'Bekerja sedikit saja', 'Menumpuk sampah di gunung'], answer: 'Tabungan kecil yang dikumpulkan rutin lama-kelamaan menjadi sangat banyak', hint: 'Konsistensi dan kesabaran menabung membuahkan hasil luar biasa.' },
        { q: 'Membuat celengan sendiri dari botol bekas atau kaleng susu bekas merupakan perpaduan tema...', options: ['Kewirausahaan cilik dan daur ulang ramah lingkungan', 'Olahraga maraton', 'Belajar musik vokal', 'Tata boga memasak'], answer: 'Kewirausahaan cilik dan daur ulang ramah lingkungan', hint: 'Kreativitas memanfaatkan barang bekas menjadi celengan cantik bernilai guna.' },
        { q: 'Jika kita ingin membeli kotak pensil baru dengan uang sendiri, cara terbaik adalah...', options: ['Menyisihkan uang jajan setiap hari secara tekun hingga cukup', 'Menangis merengek kepada orang tua di toko', 'Mengambil uang teman tanpa izin', 'Meminjam uang rentenir'], answer: 'Menyisihkan uang jajan setiap hari secara tekun hingga cukup', hint: 'Membeli barang dari hasil tabungan sendiri melatih kemandirian dan rasa bangga.' },
        { q: 'Manfaat membiasakan pola hidup hemat sejak usia sekolah dasar adalah...', options: ['Memiliki dana cadangan untuk keperluan mendadak dan masa depan', 'Dicap anak pelit', 'Tidak punya teman bermain', 'Badan menjadi kurus'], answer: 'Memiliki dana cadangan untuk keperluan mendadak dan masa depan', hint: 'Orang yang hemat siap menghadapi kebutuhan tak terduga dengan tenang.' },
        { q: 'Sebelum membeli suatu barang di toko, pertanyaan cerdas yang harus kita tanyakan pada diri sendiri adalah...', options: ['"Apakah aku benar-benar membutuhkannya saat ini?"', '"Apakah harganya paling mahal di toko?"', '"Berapa banyak yang bisa kubeli sampai uang habis?"', '"Apakah warnanya menyala?"'], answer: '"Apakah aku benar-benar membutuhkannya saat ini?"', hint: 'Berpikir kritis sebelum berbelanja mencegah perilaku konsumtif berlebihan.' },
        { q: 'Sikap menghabiskan uang saku sekaligus dalam sekali jajan tanpa memikirkan hari esok disebut perilaku...', options: ['Boros', 'Hemat', 'Bijaksana', 'Mandiri'], answer: 'Boros', hint: 'Boros adalah kebiasaan buruk yang merugikan diri sendiri.' }
      ],
      activitiesEn: [
        { q: 'Which of the following represents an essential NEED for an elementary student?', options: ['Notebooks and pencils for class', 'Expensive luxury video game gadgets', 'Designer party costumes', 'Online gaming credits'], answer: 'Notebooks and pencils for class', hint: 'Needs are essential tools for learning ✏️' },
        { q: 'What wisdom is taught by the proverb "A penny saved is a penny earned"?', options: ['Small regular savings accumulate into significant fortune over time', 'Spend all your money fast', 'Bury coins in dirt', 'Never spend anything at all'], answer: 'Small regular savings accumulate into significant fortune over time', hint: 'Consistency builds solid financial security.' }
      ]
    },
    {
      id: 'p5-eksperimen-sains',
      title: 'P5 Rekayasa Sains: Eksperimen Pelangi & Erupsi Soda',
      titleEn: 'P5 STEM Discovery: Rainbow Density & Fizzy Eruption',
      desc: 'Sains itu seru dan menakjubkan! Kita bisa membuat simulasi "Gunung Berapi Meletus" menggunakan soda kue dapur dicampur cuka dan pewarna merah (reaksi asam-basa menghasilkan gas karbon dioksida berbusa!), atau eksperimen "Massa Jenis Pelangi" dari larutan air gula berbagai warna!',
      descEn: 'Science is thrilling discovery! Create a foaming "Volcanic Eruption" mixing baking soda, vinegar, and red dye (an acid-base reaction producing fizzy CO2 bubbles), or demonstrate "Rainbow Density Columns" with tiered sugar-water solutions!',
      funFact: 'Gelembung busa mendesis pada erupsi gunung buatan terjadi karena jutaan molekul gas Karbon Dioksida (CO2) berebut keluar dari larutan asam cuka dan soda kue!',
      keyPoints: [
        'Eksperimen sains sederhana membuktikan hukum alam dengan bahan aman di sekitar kita.',
        'Reaksi cuka (asam) + soda kue (basa) menghasilkan gelembung gas karbon dioksida (CO2).',
        'Massa jenis zat cair: cairan yang lebih rapat (air gula pekat) akan berada di lapisan paling bawah.'
      ],
      checklist: [
        'Misi 1: Siapkan 1 sendok soda kue, tuangkan sedikit cuka dapur, dan amati busa gas yang mendesis meletup.',
        'Misi 2: Celupkan batang seledri atau bunga putih ke dalam air berwarna merah semalaman; amati kapilaritas batang air.',
        'Misi 3: Tuliskan hasil pengamatan eksperimenmu di tabel lembar observasi sains.'
      ],
      checklistEn: [
        'Mission 1: Mix a spoonful of baking soda with vinegar in a cup; observe bubbling carbon dioxide foam.',
        'Mission 2: Place a white carnation stem in red dyed water overnight; observe capillary water conduction.',
        'Mission 3: Record your scientific observations neatly in your STEM lab notebook.'
      ],
      activities: [
        { q: 'Ketika bubuk soda kue dicampur dengan tetesan cuka dapur, muncul busa gas. Gas apakah itu?', options: ['Gas Karbon Dioksida (CO2)', 'Gas Racun', 'Gas Oksigen murni', 'Uap air dingin'], answer: 'Gas Karbon Dioksida (CO2)', hint: 'Reaksi kimia asam cuka dan basa soda menghasilkan gelembung CO2 yang mendesis.' },
        { q: 'Mengapa minyak goreng selalu mengapung di atas permukaan air saat dituangkan ke dalam gelas?', options: ['Karena massa jenis minyak lebih ringan daripada air', 'Karena minyak membeku', 'Karena air mengandung garam', 'Karena minyak takut air'], answer: 'Karena massa jenis minyak lebih ringan daripada air', hint: 'Benda dengan kerapatan massa jenis lebih kecil akan selalu terapung di atas cairan yang lebih padat.' },
        { q: 'Bila tangkai bunga mawar putih direndam dalam air yang diberi pewarna makanan biru, maka kelopak bunga akan...', options: ['Berubah warna menjadi kebiruan karena air diserap batang (kapilaritas)', 'Langsung rontok menjadi abu', 'Berubah menjadi emas', 'Tidak terjadi perubahan apa-apa'], answer: 'Berubah warna menjadi kebiruan karena air diserap batang (kapilaritas)', hint: 'Pembuluh xilem pada batang menyalurkan air berwarna ke helai kelopak mahkota bunga.' },
        { q: 'Eksperimen bayangan menunjukkan bahwa bayangan tubuh kita di tanah terbentuk karena...', options: ['Cahaya merambat lurus dan terhalang oleh tubuh kita', 'Cahaya berbelok melingkari tubuh', 'Tubuh kita memancarkan sinar hitam', 'Tanah menyerap udara'], answer: 'Cahaya merambat lurus dan terhalang oleh tubuh kita', hint: 'Benda gelap yang menghalangi berkas cahaya lurus akan menghasilkan bayangan di belakangnya.' },
        { q: 'Benda yang dapat ditarik kuat oleh magnet pada percobaan gaya magnet adalah...', options: ['Paku besi dan klip kertas logam', 'Penggaris plastik', 'Buku kertas', 'Daun kering'], answer: 'Paku besi dan klip kertas logam', hint: 'Magnet menarik benda-benda feromagnetik yang mengandung unsur besi/baja 🧲' },
        { q: 'Pada percobaan pelangi buatan dengan cermin datar dan mangkuk air, cahaya matahari diuraikan menjadi...', options: ['7 warna pelangi (Me-Ji-Ku-Hi-Bi-Ni-U)', 'Hanya 1 warna abu-abu', 'Warna hitam legam', 'Warna putih perak'], answer: '7 warna pelangi (Me-Ji-Ku-Hi-Bi-Ni-U)', hint: 'Pembiasan cahaya putih (polikromatik) menguraikan spektrum warna pelangi.' },
        { q: 'Ketika es batu dimasukkan ke dalam gelas berisi air teh hangat, es batu akan mencair karena...', options: ['Menyerap energi panas (kalor) dari air teh', 'Kehilangan berat badan', 'Ketakutan dengan warna teh', 'Tertidur di dasar gelas'], answer: 'Menyerap energi panas (kalor) dari air teh', hint: 'Perubahan wujud padat menjadi cair dipicu oleh penyerapan kalor panas.' },
        { q: 'Eksperimen meniup balon di atas mulut botol yang direndam dalam mangkuk air panas membuktikan bahwa...', options: ['Udara di dalam botol memuai saat dipanaskan sehingga mengisi balon', 'Botol mengecil', 'Air panas masuk ke balon', 'Balon mencair'], answer: 'Udara di dalam botol memuai saat dipanaskan sehingga mengisi balon', hint: 'Gas dan udara mengalami pemuaian volume saat suhunya dinaikkan.' },
        { q: 'Alat pengaman yang sebaiknya dipakai saat melakukan percobaan sains sederhana di sekolah adalah...', options: ['Kacamata pelindung (goggles) dan celemek lab', 'Topi jerami pantai', 'Kacamata hitam pesta', 'Jaket wol tebal'], answer: 'Kacamata pelindung (goggles) dan celemek lab', hint: 'Melindungi mata dan seragam dari percikan zat kimia atau cairan pewarna.' },
        { q: 'Sikap ilmiah seorang peneliti cilik saat melakukan eksperimen adalah...', options: ['Jujur mencatat hasil sesuai pengamatan dan tidak mengarang data palsu', 'Mengubah data agar terlihat hebat', 'Menyalahkan teman jika gagal', 'Menolak mencoba lagi'], answer: 'Jujur mencatat hasil sesuai pengamatan dan tidak mengarang data palsu', hint: 'Kejujuran dan ketelitian observasi adalah mahkota integritas sains.' }
      ],
      activitiesEn: [
        { q: 'When baking soda reacts with vinegar, what gas creates the energetic bubbling foam?', options: ['Carbon Dioxide (CO2)', 'Toxic gas', 'Pure Oxygen', 'Ice vapor'], answer: 'Carbon Dioxide (CO2)', hint: 'An acid-base reaction releases bubbly carbon dioxide.' },
        { q: 'Why does cooking oil float on top of water in a transparent beaker?', options: ['Oil has lower density than water', 'Oil freezes into ice', 'Water hates oil', 'Oil is heavier than water'], answer: 'Oil has lower density than water', hint: 'Less dense liquids float above denser liquids.' }
      ]
    },
    {
      id: 'p5-anti-bullying',
      title: 'P5 Bangunlah Jiwa Raganya: Sahabat Hebat Anti-Bullying',
      titleEn: 'P5 Wellbeing: Kind Friends Against Bullying',
      desc: 'Setiap anak berhak belajar dan bermain di sekolah dengan rasa aman dan gembira. Tolak perundungan (bullying): STOP mengejek nama orang tua, STOP memanggil julukan buruk, STOP mengucilkan kawan, dan STOP bermain kasar! Jadilah pembela kebaikan (upstander) yang melindungi teman!',
      descEn: 'Every child has the absolute right to learn and thrive in an emotionally and physically safe classroom. STOP name-calling, STOP mocking appearance, STOP excluding peers, and STOP physical aggression! Be a brave, compassionate upstander!',
      funFact: 'Kata-kata pujian dan senyuman ramah mengaktifkan pusat penghargaan di otak kawanmu, menaikkan rasa percaya dirinya hingga 40% untuk berani tampil di kelas!',
      keyPoints: [
        'Perundungan (bullying) adalah tindakan menyakiti teman secara sengaja, berulang, baik lisan maupun fisik.',
        'Katakan TIDAK pada ejekan, julukan buruk, mengucilkan kawan, atau mendorong teman.',
        'Jadilah "Upstander": segera tolong kawan yang disakiti dan laporkan kepada bapak/ibu guru.'
      ],
      checklist: [
        'Misi 1: Tulis ikrar di selembar kertas: "Aku Pelajar Hebat, Suka Menolong & Menolak Mengejek Teman".',
        'Misi 2: Ajak teman yang sedang duduk sendirian di pojok kelas untuk bergabung bermain bersama regumu.',
        'Misi 3: Segera lapor kepada guru jika melihat ada teman yang diganggu atau disakiti orang lain.'
      ],
      checklistEn: [
        'Mission 1: Pen a personal pledge: "I am a Kindhearted Scholar; I Uplift and Never Tease Friends".',
        'Mission 2: Invite a lonely student sitting alone at recess to join your group games.',
        'Mission 3: Promptly inform a trusted teacher whenever you witness unfair bullying behavior.'
      ],
      activities: [
        { q: 'Jika kamu melihat seorang teman baru diejek atau disoraki oleh anak lain, sikap terbaikmu adalah...', options: ['Membelanya, mengajaknya menjauh, dan melaporkan kejadian kepada guru', 'Ikut-ikutan mengejek agar dianggap hebat', 'Merekamnya sambil tertawa', 'Menyuruh teman tersebut menangis'], answer: 'Membelanya, mengajaknya menjauh, dan melaporkan kejadian kepada guru', hint: 'Jadilah upstander pemberani yang membela teman yang tertindas.' },
        { q: 'Manakah ucapan yang mencerminkan tutur kata sahabat sejati?', options: ['"Ayo kita bermain dan belajar bersama!"', '"Kamu tidak boleh ikut main bersama kami!"', '"Lihat bajumu jelek sekali!"', '"Namamu aneh!"'], answer: '"Ayo kita bermain dan belajar bersama!"', hint: 'Kata-kata yang hangat menumbuhkan kebahagiaan bersama.' },
        { q: 'Tindakan yang BUKAN merupakan bullying (perundungan) adalah...', options: ['Mengajak teman bermain bersama secara ramah', 'Mengejek nama orang tua teman', 'Mendorong teman sampai menangis', 'Menyembunyikan sepatu teman'], answer: 'Mengajak teman bermain bersama secara ramah', hint: 'Sahabat sejati selalu merangkul dan membuat teman merasa aman dan gembira 🤝' },
        { q: 'Jika melihat teman yang dipojokkan atau diejek anak lain, sikap kita adalah...', options: ['Membela dan melaporkan kepada bapak/ibu guru', 'Ikut menonton dan menertawakan', 'Merekam di ponsel', 'Membiarkannya saja'], answer: 'Membela dan melaporkan kepada bapak/ibu guru', hint: 'Menjadi pembela kebaikan (Upstander) menghentikan aksi perundungan.' },
        { q: 'Contoh perundungan verbal (dengan kata-kata) yang sangat dilarang di sekolah adalah...', options: ['Memanggil teman dengan julukan hinaan fisik atau nama hewan', 'Memuji gambar kawan yang rapi', 'Menyapa selamat pagi', 'Mengucapkan terima kasih'], answer: 'Memanggil teman dengan julukan hinaan fisik atau nama hewan', hint: 'Kata-kata kasar dan ejekan melukai perasaan dan menghancurkan percaya diri.' },
        { q: 'Jika ada anak yang mengancam atau memalak uang sakumu di sekolah, langkah aman pertama adalah...', options: ['Segera laporkan kepada guru kelas atau satpam sekolah', 'Takut dan merahasiakannya', 'Memberikan uang terus setiap hari', 'Menyerang balik dengan benda tajam'], answer: 'Segera laporkan kepada guru kelas atau satpam sekolah', hint: 'Bapak dan ibu guru akan segera melindungi dan menindak pelaku pemalakan.' },
        { q: 'Anak yang dijauhi atau dikucilkan oleh teman sekelasnya akan merasakan...', options: ['Sedih, kesepian, dan takut datang ke sekolah', 'Sangat bahagia', 'Makin bersemangat sekolah', 'Kenyang'], answer: 'Sedih, kesepian, dan takut datang ke sekolah', hint: 'Pengucilan sosial (social exclusion) adalah bentuk perundungan yang menyakitkan.' },
        { q: 'Istilah "Upstander" dalam gerakan anti-perundungan berarti...', options: ['Orang yang berani bertindak membela korban dan menghentikan perundungan', 'Penonton yang hanya diam melihat', 'Pelaku utama yang suka mengejek', 'Orang yang kabur sembunyi'], answer: 'Orang yang berani bertindak membela korban dan menghentikan perundungan', hint: 'Upstander berani bersuara untuk menegakkan keadilan dan persaudaraan.' },
        { q: 'Manfaat menciptakan suasana sekolah yang bebas dari bullying adalah...', options: ['Semua murid merasa aman, gembira, dan bersemangat mengukir prestasi', 'Sekolah menjadi sepi', 'Semua anak jadi penakut', 'Guru tidak perlu mengajar lagi'], answer: 'Semua murid merasa aman, gembira, dan bersemangat mengukir prestasi', hint: 'Lingkungan yang ramah anak memicu potensi belajar optimal bagi setiap anak.' },
        { q: 'Bila kita tidak sengaja menyenggol kawan hingga buku tulisnya jatuh, kalimat santun yang harus kita ucapkan adalah...', options: ['"Maafkan aku ya, biar kubantu ambil bukumu."', '"Makanya jangan berdiri di situ!"', '"Itu salah bukumu yang licin!"', '"Biar saja di lantai!"'], answer: '"Maafkan aku ya, biar kubantu ambil bukumu."', hint: 'Permintaan maaf yang cepat dan bantuan memulihkan keramahan seketika.' }
      ],
      activitiesEn: [
        { q: 'If you witness a classmate being teased or excluded, what is the upstander action?', options: ['Stand by their side, invite them over, and notify a teacher', 'Join in the cruel laughter', 'Record it for amusement', 'Tell them it is their fault'], answer: 'Stand by their side, invite them over, and notify a teacher', hint: 'An upstander protects and seeks supportive adult help.' },
        { q: 'Which verbal phrase expresses genuine friendly kindness?', options: ['"Come and join our game; let’s play together!"', '"You can never sit with us!"', '"Your backpack looks silly!"', '"Go away!"'], answer: '"Come and join our game; let’s play together!"', hint: 'Inclusive words make school feel welcoming for everyone.' }
      ]
    },
    {
      id: 'p5-kebun-sekolah',
      title: 'P5 Rekayasa & Lingkungan: Proyek Berkebun Hidroponik / Sayur',
      titleEn: 'P5 Urban Agriculture: School Gardening & Hydroponics',
      desc: 'Menanam tanaman adalah petualangan sains yang mengasyikkan! Dari sebutir biji kacang hijau kecil di atas kapas basah, ia akan berkecambah mengeluarkan akar putih, batang lentur, hingga helai daun hijau yang menyerap sinar matahari melalui fotosintesis. Kita belajar merawat kehidupan dengan sabar!',
      descEn: 'Planting seeds is a living science journey! Watch a mung bean sprout from moist cotton, developing roots, stems, and sun-seeking green leaves via photosynthesis. Nurturing plants teaches patience, ecology, and stewardship!',
      funFact: 'Sistem hidroponik memungkinkan sayuran kangkung atau pakcoy tumbuh subur di dalam pipa air berlubang tanpa menggunakan tanah sama sekali!',
      keyPoints: [
        'Tanaman membutuhkan air, cahaya matahari, udara (karbon dioksida), dan nutrisi hara.',
        'Berkebun melatih kesabaran, kedisiplinan menyiram rutin, dan rasa cinta pada alam.',
        'Sayuran hijau segar hasil panen kebun sendiri lebih sehat, bebas pestisida, dan lezat.'
      ],
      checklist: [
        'Misi 1: Siapkan wadah gelas plastik bekas, beri kapas basah, dan taburkan 5 butir biji kacang hijau.',
        'Misi 2: Letakkan di tempat yang terkena sinar matahari pagi dan basahi kapas setiap pagi.',
        'Misi 3: Catat tinggi pertumbuhan batang kecambah setiap hari selama 7 hari di tabel jurnal tanaman.'
      ],
      checklistEn: [
        'Mission 1: Line a clear plastic cup with damp cotton balls and scatter 5 mung bean seeds.',
        'Mission 2: Place by a sunny windowsill and mist the cotton moist daily.',
        'Mission 3: Measure and graph the stem growth height in centimeters over 7 consecutive days.'
      ],
      activities: [
        { q: 'Tiga hal utama yang dibutuhkan oleh biji tanaman untuk berkecambah dan tumbuh subur adalah...', options: ['Air, udara (oksigen), dan sinar matahari yang cukup', 'Minyak goreng, susu, dan garam', 'Ruangan gelap gulita tanpa udara', 'Plastik pembungkus yang kedap udara'], answer: 'Air, udara (oksigen), dan sinar matahari yang cukup', hint: 'Air memicu perkecambahan biji dan sinar matahari memberi energi fotosintesis 🌱' },
        { q: 'Bagian tanaman yang tumbuh ke bawah masuk ke dalam tanah untuk menyerap air dan mineral adalah...', options: ['Akar', 'Daun', 'Bunga', 'Buah'], answer: 'Akar', hint: 'Akar menopang tanaman kokoh dan menyerap air tanah.' },
        { q: 'Metode menanam tanaman sayur menggunakan media air yang diberi larutan nutrisi tanpa memakai tanah disebut...', options: ['Hidroponik', 'Aeromodeling', 'Robotik', 'Fotografi'], answer: 'Hidroponik', hint: 'Hidroponik memanfaatkan pipa air berlubang dan rockwool sebagai penyangga akar 🥬' },
        { q: 'Zat hijau daun pada tanaman yang berfungsi menyerap energi sinar matahari untuk fotosintesis adalah...', options: ['Klorofil', 'Oksigen', 'Kalsium', 'Karbon'], answer: 'Klorofil', hint: 'Klorofil memberi warna hijau segar pada daun tanaman.' },
        { q: 'Waktu terbaik untuk menyiram tanaman di kebun sekolah agar tidak mudah layu terbakar terik adalah...', options: ['Pagi hari sebelum terik dan sore hari menjelang sejuk', 'Tepat pukul 12.00 siang saat matahari membakar', 'Tengah malam saat gelap', 'Seminggu sekali saja'], answer: 'Pagi hari sebelum terik dan sore hari menjelang sejuk', hint: 'Penyiraman pagi dan sore memberi kelembapan optimal bagi akar menyerap air.' },
        { q: 'Bila tanaman ditaruh di dalam kardus tertutup tanpa cahaya matahari selama satu minggu, akibatnya adalah...', options: ['Daun menjadi pucat kekuningan, batang memanjang lemah (etiolasi), dan bisa mati', 'Tumbuh buah yang sangat manis', 'Batang bertambah kokoh seperti pohon beringin', 'Berbunga emas'], answer: 'Daun menjadi pucat kekuningan, batang memanjang lemah (etiolasi), dan bisa mati', hint: 'Tanpa sinar matahari, tanaman tidak dapat memasak makanan melalui fotosintesis.' },
        { q: 'Contoh sayuran daun cepat panen yang sangat cocok ditanam di kebun sekolah adalah...', options: ['Kangkung, bayam, dan sawi pakcoy', 'Pohon durian', 'Pohon kelapa sawit', 'Pohon jati raksasa'], answer: 'Kangkung, bayam, dan sawi pakcoy', hint: 'Sayuran kangkung dan bayam dapat dipanen segar hanya dalam waktu 20-30 hari.' },
        { q: 'Hewan kecil penggembur tanah yang sangat membantu menyuburkan tanah kebun sekolah adalah...', options: ['Cacing tanah', 'Nyamuk demam berdarah', 'Kecoak', 'Lalat hijau'], answer: 'Cacing tanah', hint: 'Lorong-lorong yang dibuat cacing melancarkan aerasi udara dan sirkulasi air tanah.' },
        { q: 'Tindakan mencabuti rumput liar (gulma) di sekitar tanaman sayur bertujuan agar...', options: ['Zat hara dan air pupuk tidak direbut oleh tanaman liar pengganggu', 'Halaman menjadi becek berlumpur', 'Tanaman sayur cepat kering', 'Hanya membuang waktu'], answer: 'Zat hara dan air pupuk tidak direbut oleh tanaman liar pengganggu', hint: 'Menyiangi rumput liar memastikan nutrisi tanah diserap utuh oleh tanaman sayur kita.' },
        { q: 'Manfaat mengonsumsi sayuran segar hasil panen kebun sekolah sendiri adalah...', options: ['Kaya vitamin alami, higienis, bebas pestisida kimia berbahaya, dan menyehatkan', 'Membuat gigi berwarna hijau', 'Membuat ngantuk', 'Menyebabkan batuk'], answer: 'Kaya vitamin alami, higienis, bebas pestisida kimia berbahaya, dan menyehatkan', hint: 'Sayuran organik segar dari kebun sendiri menyehatkan pencernaan dan daya tahan tubuh.' }
      ],
      activitiesEn: [
        { q: 'What primary elements do sprouting seeds need to flourish into vibrant seedlings?', options: ['Water, air (oxygen), and adequate sunlight', 'Cooking oil, milk, and salt', 'Pitch darkness without ventilation', 'Airtight plastic wrap'], answer: 'Water, air (oxygen), and adequate sunlight', hint: 'Moisture triggers germination and sunlight powers photosynthesis 🌱' },
        { q: 'What is the modern soil-less planting technique using nutrient-enriched circulating water called?', options: ['Hydroponics', 'Aerospace engineering', 'Robotics', 'Carpentry'], answer: 'Hydroponics', hint: 'Hydroponics cultivates lush greens directly in clean water channels 🥬' }
      ]
    },
    {
      id: 'p5-suara-demokrasi',
      title: 'Suara Demokrasi Cilik: Musyawarah Regu Piket Kelas',
      titleEn: 'Junior Democracy: Classroom Chores Team Deliberation',
      desc: 'Dalam Projek Profil Pelajar Pancasila tema "Suara Demokrasi", anak Kelas 1 SD diajak bermusyawarah secara nyata: menentukan giliran regu piket kelas, menyepakati aturan bermain saat istirahat, dan memilih ketua kelompok belajar dengan cara angkat tangan yang adil dan transparan.',
      descEn: 'In the P5 theme "Voice of Democracy", 1st grade learners experience real democratic participation: organizing classroom cleaning teams, setting fair playground rules, and electing team coordinators through honest hand-raising ballots.',
      funFact: 'Prinsip musyawarah mufakat di Indonesia sudah ada sejak ratusan tahun lalu di balai desa adat, di mana semua warga duduk melingkar sederajat!',
      keyPoints: [
        'Musyawarah adalah berdiskusi bersama untuk mencapai kata sepakat (mufakat) yang adil.',
        'Setiap anak berhak menyampaikan pendapat dengan sopan dan menghargai usulan teman lain.',
        'Keputusan musyawarah wajib dilaksanakan bersama dengan penuh rasa tanggung jawab.'
      ],
      checklist: [
        'Misi 1: Usulkan satu ide permainan tradisional seru untuk dimainkan bersama saat jam istirahat.',
        'Misi 2: Ikuti pemungutan suara pemilihan ketua kelompok dengan mengangkat tangan secara tertib.',
        'Misi 3: Laksanakan tugas piket membersihkan papan tulis sesuai hari regu piketmu dengan riang gembira.'
      ],
      checklistEn: [
        'Mission 1: Propose a fun playground game idea during classroom morning meeting.',
        'Mission 2: Participate in team coordinator election by raising hands orderly.',
        'Mission 3: Fulfill your chalkboard cleaning chore on your designated duty day enthusiastically.'
      ],
      activities: [
        { q: 'Cara demokratis yang paling adil untuk memilih ketua kelompok belajar adalah...', options: ['Pemungutan suara (voting) bersama seluruh anggota', 'Ditentukan sendiri oleh yang paling galak', 'Melempar koin ke lantai', 'Berkelahi'], answer: 'Pemungutan suara (voting) bersama seluruh anggota', hint: 'Setiap anak memiliki hak suara yang sama dan setara.' },
        { q: 'Bila usulan kita tidak terpilih dalam musyawarah kelas, sikap Pelajar Pancasila adalah...', options: ['Menerima dengan lapang dada dan mendukung yang terpilih', 'Menangis di pojokan', 'Merusak papan tulis', 'Tidak mau masuk sekolah'], answer: 'Menerima dengan lapang dada dan mendukung yang terpilih', hint: 'Jiwa besar dan sportivitas adalah kunci kerukunan bersama.' },
        { q: 'Tujuan utama pembagian regu piket kelas adalah...', options: ['Menjaga kebersihan kelas secara gotong royong dan adil', 'Menghukum anak yang nakal', 'Membuat anak capek', 'Supaya tidak perlu belajar'], answer: 'Menjaga kebersihan kelas secara gotong royong dan adil', hint: 'Pekerjaan berat menjadi ringan jika dibagi bersama.' },
        { q: 'Saat teman sedang mengemukakan pendapatnya dalam rapat kelas, sikap kita adalah...', options: ['Mendengarkan dengan tenang sampai teman selesai berbicara', 'Memotong pembicaraannya sambil berteriak', 'Mengejek idenya bodoh', 'Membunyikan peluit'], answer: 'Mendengarkan dengan tenang sampai teman selesai berbicara', hint: 'Menghormati hak bicara teman adalah cerminan budaya demokrasi beradab.' },
        { q: 'Bila ingin menyampaikan usulan dalam musyawarah kelas, cara yang sopan adalah...', options: ['Mengangkat tangan kanan terlebih dahulu dan menunggu dipersilakan guru', 'Langsung berteriak sekencang-kencangnya', 'Menggebrak meja guru', 'Melempar penghapus'], answer: 'Mengangkat tangan kanan terlebih dahulu dan menunggu dipersilakan guru', hint: 'Mengangkat tangan secara tertib menjaga jalannya diskusi tetap tenang dan teratur 🙋‍♂️' },
        { q: 'Musyawarah untuk mufakat merupakan pengamalan sila Pancasila ke-...', options: ['Sila ke-4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan...)', 'Sila ke-1', 'Sila ke-2', 'Sila ke-3'], answer: 'Sila ke-4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan...)', hint: 'Lambang Kepala Banteng melambangkan budaya berkumpul dan bermusyawarah.' },
        { q: 'Kesepakatan bersama yang telah diputuskan dalam musyawarah kelas harus...', options: ['Dilaksanakan dengan ikhlas dan penuh tanggung jawab oleh seluruh siswa', 'Diabaikan jika kita tidak suka', 'Diubah diam-diam', 'Dirobek catatannya'], answer: 'Dilaksanakan dengan ikhlas dan penuh tanggung jawab oleh seluruh siswa', hint: 'Komitmen bersama menumbuhkan disiplin dan ketertiban kelas.' },
        { q: 'Manfaat menyusun aturan kelas (kesepakatan kelas) bersama-sama adalah...', options: ['Kelas menjadi tertib, nyaman, dan semua murid tahu batasan sopan santun', 'Membuat murid merasa terkekang', 'Supaya guru tidak perlu masuk kelas', 'Supaya ada yang dihukum'], answer: 'Kelas menjadi tertib, nyaman, dan semua murid tahu batasan sopan santun', hint: 'Kesepakatan kelas yang dibuat bersama ditaati dengan kesadaran hati.' },
        { q: 'Dalam pemilihan ketua kelas, asas "Luber" salah satunya mengandung arti "Bebas", maksudnya adalah...', options: ['Setiap siswa bebas memilih calon sesuai hati nuraninya tanpa paksaan orang lain', 'Bebas memukul teman yang berbeda pilihan', 'Bebas tidak masuk sekolah', 'Bebas merusak bilik suara'], answer: 'Setiap siswa bebas memilih calon sesuai hati nuraninya tanpa paksaan orang lain', hint: 'Tidak boleh ada paksaan atau ancaman dalam menentukan pilihan.' },
        { q: 'Ketika dua kelompok belajar memiliki pendapat yang berbeda, cara terbaik menyelesaikan perbedaan adalah...', options: ['Duduk bersama mencari jalan tengah yang menguntungkan semua pihak', 'Adu panco menentukan siapa yang paling kuat', 'Memusuhi kelompok lawan selamanya', 'Membubarkan kelas'], answer: 'Duduk bersama mencari jalan tengah yang menguntungkan semua pihak', hint: 'Musyawarah mencari solusi terbaik yang membahagiakan semua orang.' }
      ],
      activitiesEn: [
        { q: 'The fairest democratic method to select a study group leader is...', options: ['A shared vote where every member casts a voice', 'Letting the loudest kid decide alone', 'Flipping a random coin', 'Quarreling'], answer: 'A shared vote where every member casts a voice', hint: 'Every learner has equal voice.' },
        { q: 'When a peer is sharing their viewpoint in a class meeting, our respectful etiquette is...', options: ['Listen calmly until they conclude speaking', 'Interrupt rudely with loud yells', 'Mock their ideas', 'Walk out'], answer: 'Listen calmly until they conclude speaking', hint: 'Respectful listening underpins genuine democracy.' }
      ]
    },
    {
      id: 'p5-sayang-bumi',
      title: 'Aku Sayang Bumi: Menanam Biji Kacang Hijau di Pot Daur Ulang',
      titleEn: 'I Love Mother Earth: Sprouting Mung Beans in Recycled Pots',
      desc: 'Projek sains cilik yang penuh keajaiban! Kita memanfaatkan gelas plastik bekas air mineral sebagai pot mini ramah lingkungan. Diberi kapas basah dan 5 butir biji kacang hijau. Dalam 3 hari, biji bertunas kecil, mengeluarkan akar putih halus, dan tumbuh daun hijau mungil menghadap sinar matahari!',
      descEn: 'A magical junior botanical adventure! Children repurpose clean used beverage cups as eco-friendly mini pots. Lined with moist cotton and 5 mung bean seeds, within 3 days delicate white roots emerge and bright green sprouts reach upward for sunlight!',
      funFact: 'Kecambah kacang hijau (tauge) mengandung vitamin C dan antioksidan yang jauh lebih tinggi daripada biji keringnya karena proses perkecambahan melepaskan nutrisi aktif!',
      keyPoints: [
        'Daur ulang wadah plastik bekas menjadi pot mengurangi timbulan sampah di lingkungan.',
        'Tahap pertumbuhan tanaman: biji -> berkecambah -> berakar -> berbatang -> berdaun.',
        'Mencatat jurnal pertumbuhan melatih keterampilan observasi ilmiah dan ketelitian berhitung.'
      ],
      checklist: [
        'Misi 1: Siapkan 1 gelas plastik bekas yang sudah dicuci bersih dan letakkan kapas basah di dasarnya.',
        'Misi 2: Taburkan 5 biji kacang hijau di atas kapas basah, lalu letakkan di tempat yang terkena cahaya matahari.',
        'Misi 3: Catat dan amati tinggi tunas kacang hijau setiap pagi di buku jurnal sains cilikmu.'
      ],
      checklistEn: [
        'Mission 1: Prepare one clean recycled plastic cup and place moist cotton at the base.',
        'Mission 2: Scatter 5 green mung bean seeds onto the cotton and set near natural window sunlight.',
        'Mission 3: Measure and record the sprout growth height each morning in your science journal.'
      ],
      activities: [
        { q: 'Dua hal penting yang dibutuhkan biji kacang hijau agar bertunas subur adalah...', options: ['Air (kelembapan) dan cahaya matahari', 'Minyak goreng dan es batu', 'Pasir panas tanpa air', 'Gula pasir manis'], answer: 'Air (kelembapan) dan cahaya matahari', hint: 'Air memicu perkecambahan biji dan sinar matahari memberi energi tumbuh.' },
        { q: 'Memanfaatkan gelas plastik bekas air mineral untuk pot tanaman adalah contoh aksi...', options: ['Daur ulang (Recycle) dan cinta lingkungan', 'Membuang sampah sembarangan', 'Merusak alam', 'Membuang uang'], answer: 'Daur ulang (Recycle) dan cinta lingkungan', hint: 'Mengurangi sampah plastik dengan menjadikannya barang bermanfaat 🌱' },
        { q: 'Bagian tumbuhan yang pertama kali muncul dari biji menembus ke bawah adalah...', options: ['Akar halus untuk menyerap air', 'Buah lebat', 'Bunga mawar', 'Batang raksasa'], answer: 'Akar halus untuk menyerap air', hint: 'Akar berfungsi mencengkeram dan mencari air di dalam kapas.' },
        { q: 'Daun pertama yang muncul dari kecambah kacang hijau disebut daun...', options: ['Kotiledon (daun lembaga)', 'Kaktus berduri', 'Pelepah pisang', 'Mahkota bunga'], answer: 'Kotiledon (daun lembaga)', hint: 'Kotiledon menyimpan cadangan makanan awal bagi kecambah mungil.' },
        { q: 'Agar air siraman di dalam gelas plastik bekas tidak menggenang dan membuat akar busuk, yang perlu kita buat di dasar gelas adalah...', options: ['Lubang-lubang kecil pembuangan air (lubang drainase)', 'Menutupnya rapat dengan lakban', 'Mengisinya dengan semen keras', 'Mengecatnya dengan warna merah'], answer: 'Lubang-lubang kecil pembuangan air (lubang drainase)', hint: 'Drainase menjaga agar akar tidak kekurangan oksigen akibat terendam air berlebih.' },
        { q: 'Arah pertumbuhan batang kecambah selalu membengkok ke arah datangnya...', options: ['Cahaya sinar matahari (fototropisme)', 'Suara musik keras', 'Lantai tanah', 'Angin kipas'], answer: 'Cahaya sinar matahari (fototropisme)', hint: 'Hormon auksin membuat batang tanaman berbelok mencari sinar matahari.' },
        { q: 'Alat ukur yang kita gunakan untuk mencatat tinggi pertumbuhan batang kecambah setiap pagi adalah...', options: ['Penggaris dengan satuan sentimeter (cm)', 'Timbangan kue', 'Termometer demam', 'Jam dinding'], answer: 'Penggaris dengan satuan sentimeter (cm)', hint: 'Penggaris mengukur panjang batang dari pangkal kapas hingga pucuk daun.' },
        { q: 'Jika kapas di dalam pot dibiarkan kering kerontang tanpa disiram selama beberapa hari, kecambah akan...', options: ['Layu, kering, dan mati kehausan', 'Berbuah mangga besar', 'Tumbuh semakin hijau segar', 'Menjadi pohon beringin'], answer: 'Layu, kering, dan mati kehausan', hint: 'Air sangat vital untuk menjaga tekanan turgor sel tumbuhan tetap tegak.' },
        { q: 'Menghias pot gelas plastik bekas dengan gambar bunga atau pita warna-warni melatih keterampilan...', options: ['Kreativitas seni dan estetika motorik halus', 'Berenang gaya bebas', 'Berhitung perkalian rumit', 'Bernyanyi nada tinggi'], answer: 'Kreativitas seni dan estetika motorik halus', hint: 'Sentuhan seni membuat karya pot daur ulang tampak memikat dan rapi.' },
        { q: 'Rasa bangga yang muncul saat melihat biji tanaman kita bertunas dan tumbuh tinggi adalah bentuk apresiasi terhadap...', options: ['Keajaiban kehidupan dan kerja keras merawat alam', 'Rasa malas belajar', 'Kemampuan merusak benda', 'Keinginan pamer saja'], answer: 'Keajaiban kehidupan dan kerja keras merawat alam', hint: 'Merawat tanaman menumbuhkan rasa syukur dan welas asih pada ciptaan Tuhan.' }
      ],
      activitiesEn: [
        { q: 'Two essential elements required for seeds to germinate into healthy sprouts are...', options: ['Moisture (water) and sunlight', 'Cooking oil and ice cubes', 'Dry hot sand without water', 'Sugar powder'], answer: 'Moisture (water) and sunlight', hint: 'Water unlocks germination and light fuels growth.' },
        { q: 'What is the botanical name of the embryonic first leaves that unfold from a sprouted seed?', options: ['Cotyledons (seed leaves)', 'Flower petals', 'Bark', 'Cactus needles'], answer: 'Cotyledons (seed leaves)', hint: 'Cotyledons nourish the baby seedling until mature foliage develops.' }
      ]
    },
    {
      id: 'p5-bazar-wirausaha',
      title: 'Kewirausahaan Cilik: Bazar Minuman Sehat Jeruk Peras',
      titleEn: 'Little Entrepreneurs: Fresh Orange Juice Stand',
      desc: 'Belajar berwirausaha melatih kreativitas, kerja sama tim, dan kejujuran berhitung. Siswa bersama kelompok menyiapkan buah jeruk segar, memeras dengan alat manual, menghitung modal belanja, melayani pembeli dengan 3S (Senyum, Salam, Sapa), dan mencatat hasil penjualan!',
      descEn: 'Early entrepreneurship builds teamwork, financial honesty, and customer courtesy. Students collaborate to squeeze fresh orange juice, compute ingredient costs, serve peers with warm smiles, and record earnings!',
      funFact: 'Satu gelas jeruk peras segar murni memenuhi 100% kebutuhan harian Vitamin C anak untuk memperkuat sistem imun tubuh melawan flu!',
      keyPoints: [
        'Wirausaha cilik melatih kreativitas, kerja sama tim, dan kejujuran dalam berdagang.',
        'Konsep keuangan dasar: Modal (biaya beli bahan) + Laba/Untung = Harga Jual.',
        'Budaya pelayanan santun 3S (Senyum, Salam, Sapa) dan ucapan terima kasih pada pembeli.'
      ],
      checklist: [
        'Misi 1: Hitung modal membeli 10 buah jeruk dan gelas kertas bersama kelompokmu.',
        'Misi 2: Praktikkan 3S (Senyum, Salam, Sapa) saat melayani teman yang membeli minuman.',
        'Misi 3: Hitung total uang hasil penjualan dan pisahkan modal dengan keuntungan bersih.'
      ],
      checklistEn: [
        'Mission 1: Calculate total ingredient expenses for 10 fresh oranges and paper cups.',
        'Mission 2: Practice warm hospitality (Smile, Greet, Thank) when serving peer customers.',
        'Mission 3: Tally final cash receipts and separate initial costs from net earnings.'
      ],
      activities: [
        { q: 'Sikap pedagang cilik yang jujur dan disenangi pembeli adalah...', options: ['Melayani dengan senyuman ramah dan mengembalikan kembalian tepat', 'Mengurangi takaran sembunyi-sembunyi', 'Marah jika pembeli bertanya', 'Memberi kembalian palsu'], answer: 'Melayani dengan senyuman ramah dan mengembalikan kembalian tepat', hint: 'Kejujuran adalah modal utama dalam berwirausaha yang sukses berkah.' },
        { q: 'Jika modal membeli bahan Rp 10.000 dan hasil penjualan terkumpul Rp 15.000, maka kita mendapat...', options: ['Keuntungan (laba) sebesar Rp 5.000', 'Rugi Rp 5.000', 'Habis modal', 'Tidak ada hasil'], answer: 'Keuntungan (laba) sebesar Rp 5.000', hint: 'Laba = Uang Hasil Penjualan dikurangi Modal Awal.' },
        { q: 'Saat seorang pembeli datang ke stan bazar kelompokmu, sapaan santun yang diucapkan adalah...', options: ['"Selamat pagi, silakan mampir! Mau mencoba jus jeruk segar kami?"', '"Ngapain berdiri di situ? Mau beli atau tidak?!"', '"Jangan pegang-pegang dagangan kami!"', '"Sana pergi ke stan lain!"'], answer: '"Selamat pagi, silakan mampir! Mau mencoba jus jeruk segar kami?"', hint: 'Ramah tamah dan senyuman membuat pembeli merasa dihargai dan nyaman berbelanja.' },
        { q: 'Kebersihan yang wajib dijaga oleh pedagang makanan dan minuman saat melayani pembeli adalah...', options: ['Mencuci tangan bersih dan menggunakan sarung tangan plastik/penjepit makanan', 'Menyentuh es batu dengan tangan berkeringat', 'Bersin di atas gelas dagangan', 'Memakai celemek yang penuh lumpur'], answer: 'Mencuci tangan bersih dan menggunakan sarung tangan plastik/penjepit makanan', hint: 'Higienitas produk menjaga makanan tetap steril dan mencegah penularan penyakit.' },
        { q: 'Bila seorang pembeli membayar minuman seharga Rp 3.000 dengan uang kertas Rp 5.000, uang kembalian yang harus diberikan adalah...', options: ['Rp 2.000', 'Rp 1.000', 'Rp 3.000', 'Tidak diberi kembalian'], answer: 'Rp 2.000', hint: '5.000 - 3.000 = 2.000 rupiah.' },
        { q: 'Media promosi sederhana yang dibuat dari kertas karton bergambar menarik untuk menarik pembeli disebut...', options: ['Poster stan / spanduk bazar', 'Surat kabar lama', 'Kertas contekan', 'Karcis parkir'], answer: 'Poster stan / spanduk bazar', hint: 'Poster warna-warni yang mencantumkan nama produk dan harga menarik minat pembeli.' },
        { q: 'Kerja sama tim dalam kelompok bazar wirausaha dilakukan dengan cara...', options: ['Membagi tugas secara adil: ada yang memeras jeruk, ada kasir, dan ada yang melayani', 'Semua anak hanya duduk diam menonton satu teman bekerja sendirian', 'Saling berebut uang penjualan', 'Meninggalkan stan bazar kosong'], answer: 'Membagi tugas secara adil: ada yang memeras jeruk, ada kasir, dan ada yang melayani', hint: 'Pembagian peran yang jelas membuat alur penjualan lancar dan cepat.' },
        { q: 'Keuntungan (laba) dari hasil bazar wirausaha kelas sebaiknya digunakan untuk...', options: ['Ditabung di celengan kelas atau kas kegiatan amal sekolah', 'Dibuang ke selokan', 'Dibelikan kembang api berbahaya', 'Dihabiskan untuk main game semalam'], answer: 'Ditabung di celengan kelas atau kas kegiatan amal sekolah', hint: 'Pemanfaatan laba secara bijak memberi manfaat jangka panjang bagi bersama.' },
        { q: 'Setelah bazar sekolah selesai ditutup sore hari, kewajiban seluruh anggota stan adalah...', options: ['Gotong royong membersihkan stan dan membuang sampah ke tempatnya', 'Langsung pulang meninggalkan stan yang kotor berantakan', 'Membiarkan sisa sampah berserakan di lapangan', 'Menyuruh guru membersihkannya'], answer: 'Gotong royong membersihkan stan dan membuang sampah ke tempatnya', hint: 'Tanggung jawab kebersihan pasca kegiatan menunjukkan kedewasaan karakter.' },
        { q: 'Nilai karakter utama yang dipelajari siswa dari kegiatan bazar kewirausahaan adalah...', options: ['Kemandirian, kejujuran, kerja sama tim, dan percaya diri', 'Sifat serakah ingin menipu', 'Rasa malu bertemu orang lain', 'Malas bekerja'], answer: 'Kemandirian, kejujuran, kerja sama tim, dan percaya diri', hint: 'Wirausaha menumbuhkan jiwa inovatif dan etos kerja yang tangguh sejak dini.' }
      ],
      activitiesEn: [
        { q: 'An honest young shopkeeper always...', options: ['Serves with cheerful smiles and provides exact change', 'Cheats on measurements', 'Scolds customers', 'Overcharges'], answer: 'Serves with cheerful smiles and provides exact change', hint: 'Integrity wins customer trust!' },
        { q: 'If total ingredients cost Rp 10,000 and total sales reach Rp 15,000, what is the net profit earned?', options: ['Profit of Rp 5,000', 'Loss of Rp 5,000', 'Zero balance', 'Negative earnings'], answer: 'Profit of Rp 5,000', hint: 'Profit = Total Revenue - Cost of Goods.' }
      ]
    },
    {
      id: 'p5-exhibition-day',
      title: 'Pameran Portofolio & Perayaan Hari Belajar (Exhibition Day)',
      titleEn: 'Learning Exhibition Day & Portfolio Celebration',
      desc: 'Perayaan Belajar (Exhibition Day) adalah puncak apresiasi Projek P5 di akhir semester. Siswa mendekorasi stan pameran kelas, memajang karya kolase alam, tanaman pot daur ulang, celengan kreatif, dan mempresentasikan hasil belajarnya kepada orang tua yang hadir!',
      descEn: 'Exhibition Day is the joyful culmination of P5 projects. Students decorate classroom display booths, exhibit nature collages, recycled planters, and handmade piggy banks, explaining their creations to visiting parents!',
      funFact: 'Saat anak mempresentasikan karyanya sendiri di hadapan orang tua dan guru, rasa percaya diri (self-efficacy) dan kemampuan berbicara di depan publik melonjak drastis!',
      keyPoints: [
        'Perayaan Belajar adalah puncak unjuk hasil karya dan proses belajar proyek anak.',
        'Siswa belajar mengkurasi portofolio terbaik dan menata meja pameran secara estetik.',
        'Mempresentasikan cerita di balik karya dengan percaya diri, santun, dan komunikatif.'
      ],
      checklist: [
        'Misi 1: Pilih 3 karya portofolio paling membanggakan selama belajar semester ini.',
        'Misi 2: Hias stan pameran mejamu dengan taplak rapi dan papan nama karya bertulisan indah.',
        'Misi 3: Sambut orang tua dan guru dengan presentasi ceria: "Selamat datang di stanku!"'
      ],
      checklistEn: [
        'Mission 1: Curate your 3 proudest creative artifacts accomplished this school semester.',
        'Mission 2: Decorate your display desk with neat runners and artistic label cards.',
        'Mission 3: Welcome visiting parents and teachers with enthusiastic presentations!'
      ],
      activities: [
        { q: 'Tujuan utama diadakannya Perayaan Hari Belajar (Exhibition Day) adalah...', options: ['Mengapresiasi proses belajar siswa dan berbagi kebahagiaan karya', 'Mencari juara 1 dan menjatuhkan yang lain', 'Menjual barang mahal', 'Hanya piknik'], answer: 'Mengapresiasi proses belajar siswa dan berbagi kebahagiaan karya', hint: 'P5 menekankan penguatan karakter dan kebanggaan atas karya sendiri.' },
        { q: 'Saat orang tua berkunjung ke meja pameranmu, sikap yang tepat adalah...', options: ['Menjelaskan cerita di balik karyamu dengan bangga dan santun', 'Kabur sembunyi di bawah meja', 'Meminta pulang cepat', 'Menangis tersedu-sedu'], answer: 'Menjelaskan cerita di balik karyamu dengan bangga dan santun', hint: 'Orang tua sangat senang dan bangga mendengar celoteh cerdas putranya!' },
        { q: 'Kumpulan hasil karya terbaik siswa yang didokumentasikan rapi selama satu semester disebut...', options: ['Portofolio belajar', 'Buku bon belanjaan', 'Koran bekas', 'Kamus tebal'], answer: 'Portofolio belajar', hint: 'Portofolio memperlihatkan rekam jejak kemajuan dan pertumbuhan keterampilan siswa.' },
        { q: 'Kartu kecil yang diletakkan di samping hasil karya berisi nama pembuat, judul karya, dan bahan disebut...', options: ['Label keterangan karya (caption)', 'Kartu remi', 'Kupon undian', 'Uang mainan'], answer: 'Label keterangan karya (caption)', hint: 'Label membantu pengunjung memahami maksud dan media yang digunakan dalam karya.' },
        { q: 'Kalimat pembuka yang ramah saat menyambut pengunjung stan pameran kita adalah...', options: ['"Selamat datang di stan saya! Mari saya ceritakan proses pembuatan tanaman daur ulang ini."', '"Jangan mendekat, nanti rusak!"', '"Bayar dulu baru boleh lihat!"', '"Saya sedang lelah, jangan tanya-tanya!"'], answer: '"Selamat datang di stan saya! Mari saya ceritakan proses pembuatan tanaman daur ulang ini."', hint: 'Salam pembuka yang ceria membuat pengunjung antusias mendengarkan presentasi.' },
        { q: 'Jika pengunjung memberikan pujian "Karyamu bagus sekali!", respon santun yang kita berikan adalah...', options: ['"Terima kasih banyak atas apresiasinya, ini berkat bimbingan guru dan kerja keras saya."', '"Memang saya anak terhebat di dunia!"', '"Karya orang lain jelek semua!"', '"Biasa saja, tidak usah berlebihan!"'], answer: '"Terima kasih banyak atas apresiasinya, ini berkat bimbingan guru dan kerja keras saya."', hint: 'Menerima pujian dengan kerendahan hati dan ucapan syukur.' },
        { q: 'Buku yang disediakan di atas meja pameran untuk menuliskan komentar dan kesan dari para pengunjung disebut...', options: ['Buku tamu dan buku pesan/kesan', 'Buku tabungan bank', 'Buku resep kue', 'Buku telepon'], answer: 'Buku tamu dan buku pesan/kesan', hint: 'Catatan kesan dan saran pengunjung menjadi motivasi berharga bagi siswa.' },
        { q: 'Dekorasi stan pameran sebaiknya ditata secara...', options: ['Rapi, menarik, bersih, dan memudahkan pengunjung melihat karya', 'Berantakan dengan sampah berserakan di bawah meja', 'Gelap gulita tanpa penerangan', 'Ditutupi kain hitam pekat'], answer: 'Rapi, menarik, bersih, dan memudahkan pengunjung melihat karya', hint: 'Penataan yang estetis menambah nilai keindahan presentasi pameran.' },
        { q: 'Nilai utama yang dirayakan pada Hari Perayaan Belajar (Exhibition Day) adalah apresiasi terhadap...', options: ['Proses usaha keras, ketekunan, dan pertumbuhan karakter siswa', 'Hanya hasil akhir yang sempurna tanpa cela', 'Berapa banyak uang yang dihabiskan', 'Pakaian paling mewah'], answer: 'Proses usaha keras, ketekunan, dan pertumbuhan karakter siswa', hint: 'Setiap langkah belajar dan jatuh-bangun proses berkarya layak dirayakan bersama.' },
        { q: 'Setelah acara pameran berakhir, sikap Pelajar Pancasila terhadap stan kelas adalah...', options: ['Merapikan kembali meja, mengemas karya dengan aman, dan membersihkan ruangan bersama', 'Langsung kabur meninggalkan sampah di lantai', 'Merusak karya teman', 'Membiarkan lampu menyala semalaman'], answer: 'Merapikan kembali meja, mengemas karya dengan aman, dan membersihkan ruangan bersama', hint: 'Bertanggung jawab dari awal persiapan hingga tuntas pembersihan akhir.' }
      ],
      activitiesEn: [
        { q: 'Primary goal of the P5 Learning Exhibition Day:', options: ['Celebrate student learning journeys and appreciate creative efforts', 'Compete aggressively', 'Sell expensive trinkets', 'Skip classes'], answer: 'Celebrate student learning journeys and appreciate creative efforts', hint: 'Affirming character, collaboration, and joyful growth.' },
        { q: 'When parents and visitors stop by your exhibition desk, how should you greet them?', options: ['Warmly introduce your project artifacts and explain your learning experience', 'Hide under the desk', 'Demand cash immediately', 'Complain about assignments'], answer: 'Warmly introduce your project artifacts and explain your learning experience', hint: 'Enthusiastic presentations share pride in student work.' }
      ]
    }
  ]
};
