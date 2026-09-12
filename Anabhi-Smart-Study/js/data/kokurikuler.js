// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Kokurikuler / Proyek P5 Subject Data
// Development · Anabhi Dev
// Version   : 2.0 (Comprehensive LKS & Proyek Pelajar Pancasila)
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
        { q: 'Apa tindakan terbaik untuk memanfaatkan botol plastik air mineral bekas yang masih bersih?', options: ['Mendaur ulang menjadi pot tanaman gantung atau tempat pensil', 'Membakarnya di pekarangan hingga berasap tebal', 'Membuangnya ke selokan atau sungai', 'Menimbunnya di dalam tanah'], answer: 'Mendaur ulang menjadi pot tanaman gantung atau tempat pensil', hint: 'Daur ulang (Upcycling) mengurangi timbunan sampah plastik di bumi.' }
      ],
      activitiesEn: [
        { q: 'Fallen dry leaves and fruit peels belong to which waste category?', options: ['Organic (naturally compostable)', 'Inorganic (plastic)', 'Hazardous chemical', 'Mineral'], answer: 'Organic (naturally compostable)', hint: 'Organic waste decomposes into rich soil fertilizer 🍂' }
      ]
    },
    {
      id: 'p5-kearifan-lokal',
      title: 'P5 Kearifan Lokal: Melestarikan Permainan Tradisional',
      titleEn: 'P5 Local Wisdom: Reviving Heritage Games',
      desc: 'Sebelum ada ponsel pintar, anak-anak Indonesia bermain permainan tradisional yang menyehatkan fisik dan mempererat persahabatan: Engklek (melompat dengan satu kaki di petak kotak), Egrang batok kelapa (keseimbangan kaki), Gobak Sodor (ketangkasan dan strategi tim), serta Congklak (berhitung biji kerang)!',
      descEn: 'Traditional Indonesian games build agile physical stamina and authentic social bonds: Engklek (hopscotch jumping), Coconut-shell Stilts (balance mastery), Gobak Sodor (tactical teamwork), and Congklak (mathematical shell counting)!',
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
        { q: 'Nilai karakter luhur yang kita pelajari dari permainan tradisional beregu (seperti Gobak Sodor) adalah...', options: ['Kekompakan, strategi tim, dan sikap sportif jujur', 'Boleh curang asal menang', 'Menangis jika kalah', 'Mengejek teman yang jatuh'], answer: 'Kekompakan, strategi tim, dan sikap sportif jujur', hint: 'Sportivitas dan kerja sama adalah kunci permainan yang membahagiakan.' }
      ],
      activitiesEn: [
        { q: 'The classic one-legged hopping game jumping through chalked grid boxes is...', options: ['Engklek (Hopscotch)', 'Mobile video gaming', 'Watching movies', 'Chess tournament'], answer: 'Engklek (Hopscotch)', hint: 'Trains leg strength and single-foot balancing balance.' }
      ]
    },
    {
      id: 'p5-celengan-mandiri',
      title: 'P5 Kewirausahaan Cilik: Celengan Mandiri & Nilai Berhemat',
      titleEn: 'P5 Junior Entrepreneurship: Smart Savings & Budgeting',
      desc: 'Menjadi anak mandiri dimulai dari bijak mengatur uang saku. Kita belajar membedakan KEBUTUHAN (hal penting seperti buku tulis, makanan sehat, dan pensil) dengan KEINGINAN (mainan mewah atau jajan berlebihan). Menabung uang logam sisa jajan di celengan membuat kita siap menghadapi masa depan!',
      descEn: 'Independence starts with financial literacy. We distinguish between NEEDS (essential textbooks, wholesome food) and WANTS (fancy trinkets, sugary snacks). Saving daily change in a piggy bank prepares us for future success!',
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
        { q: 'Pepatah bijak nusantara mengatakan "Hemat pangkal kaya, rajin pangkal..."', options: ['Pandai', 'Malas', 'Bosan', 'Lapar'], answer: 'Pandai', hint: 'Rajin belajar membuat kita pintar dan berwawasan luas.' }
      ],
      activitiesEn: [
        { q: 'Which of the following represents an essential NEED for an elementary student?', options: ['Notebooks and pencils for class', 'Expensive luxury video game gadgets', 'Designer party costumes', 'Online gaming credits'], answer: 'Notebooks and pencils for class', hint: 'Needs are essential tools for learning ✏️' }
      ]
    },
    {
      id: 'p5-eksperimen-sains',
      title: 'P5 Rekayasa Sains: Eksperimen Pelangi & Erupsi Soda',
      titleEn: 'P5 STEM Discovery: Rainbow Density & Fizzy Eruption',
      desc: 'Sains itu seru dan menakjubkan! Kita bisa membuat simulasi "Gunung Berapi Meletus" menggunakan soda kue dapur dicampur cuka dan pewarna merah (reaksi asam-basa menghasilkan gas karbon dioksida berbusa!), atau eksperimen "Massa Jenis Pelangi" dari larutan air gula berbagai warna!',
      descEn: 'Science is thrilling discovery! Create a foaming "Volcanic Eruption" mixing baking soda, vinegar, and red dye (an acid-base reaction producing fizzy CO2 bubbles), or demonstrate "Rainbow Density Columns" with tiered sugar-water solutions!',
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
        { q: 'Mengapa minyak goreng selalu mengapung di atas permukaan air saat dituangkan ke dalam gelas?', options: ['Karena massa jenis minyak lebih ringan daripada air', 'Karena minyak membeku', 'Karena air mengandung garam', 'Karena minyak takut air'], answer: 'Karena massa jenis minyak lebih ringan daripada air', hint: 'Benda dengan kerapatan massa jenis lebih kecil akan selalu terapung di atas cairan yang lebih padat.' }
      ],
      activitiesEn: [
        { q: 'When baking soda reacts with vinegar, what gas creates the energetic bubbling foam?', options: ['Carbon Dioxide (CO2)', 'Toxic gas', 'Pure Oxygen', 'Ice vapor'], answer: 'Carbon Dioxide (CO2)', hint: 'An acid-base reaction releases bubbly carbon dioxide.' }
      ]
    },
    {
      id: 'p5-anti-bullying'
      title: 'P5 Bangunlah Jiwa Raganya: Sahabat Hebat Anti-Bullying',
      titleEn: 'P5 Wellbeing: Kind Friends Against Bullying',
      desc: 'Setiap anak berhak belajar dan bermain di sekolah dengan rasa aman dan gembira. Tolak perundungan (bullying): STOP mengejek nama orang tua, STOP memanggil julukan buruk, STOP mengucilkan kawan, dan STOP bermain kasar! Jadilah pembela kebaikan (upstander) yang melindungi teman!',
      descEn: 'Every child has the absolute right to learn and thrive in an emotionally and physically safe classroom. STOP name-calling, STOP mocking appearance, STOP excluding peers, and STOP physical aggression! Be a brave, compassionate upstander!',
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
        { q: "Tindakan yang BUKAN merupakan bullying (perundungan) adalah...", options: ["Mengajak teman bermain bersama secara ramah","Mengejek nama orang tua teman","Mendorong teman sampai menangis","Menyembunyikan sepatu teman"], answer: "Mengajak teman bermain bersama secara ramah", hint: "Sahabat sejati selalu merangkul dan membuat teman merasa aman dan gembira 🤝" },
        { q: "Jika melihat teman yang dipojokkan atau diejek anak lain, sikap kita adalah...", options: ["Membela dan melaporkan kepada bapak/ibu guru","Ikut menonton dan menertawakan","Merekam di ponsel","Membiarkannya saja"], answer: "Membela dan melaporkan kepada bapak/ibu guru", hint: "Menjadi pembela kebaikan (Upstander) menghentikan aksi perundungan." }
      ],
      activitiesEn: [
        { q: 'If you witness a classmate being teased or excluded, what is the upstander action?', options: ['Stand by their side, invite them over, and notify a teacher', 'Join in the cruel laughter', 'Record it for amusement', 'Tell them it is their fault'], answer: 'Stand by their side, invite them over, and notify a teacher', hint: 'An upstander protects and seeks supportive adult help.' }
      ]
    },
    {
      id: 'p5-kebun-sekolah',
      title: 'P5 Rekayasa & Lingkungan: Proyek Berkebun Hidroponik / Sayur',
      titleEn: 'P5 Urban Agriculture: School Gardening & Hydroponics',
      desc: 'Menanam tanaman adalah petualangan sains yang mengasyikkan! Dari sebutir biji kacang hijau kecil di atas kapas basah, ia akan berkecambah mengeluarkan akar putih, batang lentur, hingga helai daun hijau yang menyerap sinar matahari melalui fotosintesis. Kita belajar merawat kehidupan dengan sabar!',
      descEn: 'Planting seeds is a living science journey! Watch a mung bean sprout from moist cotton, developing roots, stems, and sun-seeking green leaves via photosynthesis. Nurturing plants teaches patience, ecology, and stewardship!',
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
        { q: 'Bagian tanaman yang tumbuh ke bawah masuk ke dalam tanah untuk menyerap air dan mineral adalah...', options: ['Akar', 'Daun', 'Bunga', 'Buah'], answer: 'Akar', hint: 'Akar menopang tanaman kokoh dan menyerap air tanah.' }
      ],
      activitiesEn: [
        { q: 'What primary elements do sprouting seeds need to flourish into vibrant seedlings?', options: ['Water, air (oxygen), and adequate sunlight', 'Cooking oil, milk, and salt', 'Pitch darkness without ventilation', 'Airtight plastic wrap'], answer: 'Water, air (oxygen), and adequate sunlight', hint: 'Moisture triggers germination and sunlight powers photosynthesis 🌱' }
      ]
    }
,
    {
      id: 'p5-suara-demokrasi',
      title: 'Suara Demokrasi Cilik: Musyawarah Regu Piket Kelas',
      titleEn: 'Junior Democracy: Classroom Chores Team Deliberation',
      desc: 'Dalam Projek Profil Pelajar Pancasila tema "Suara Demokrasi", anak Kelas 1 SD diajak bermusyawarah secara nyata: menentukan giliran regu piket kelas, menyepakati aturan bermain saat istirahat, dan memilih ketua kelompok belajar dengan cara angkat tangan yang adil dan transparan.',
      descEn: 'In the P5 theme "Voice of Democracy", 1st grade learners experience real democratic participation: organizing classroom cleaning teams, setting fair playground rules, and electing team coordinators through honest hand-raising ballots.',
      checklist: [
        "Misi 1: Usulkan satu ide permainan tradisional seru untuk dimainkan bersama saat jam istirahat.",
        "Misi 2: Ikuti pemungutan suara pemilihan ketua kelompok dengan mengangkat tangan secara tertib.",
        "Misi 3: Laksanakan tugas piket membersihkan papan tulis sesuai hari regu piketmu dengan riang gembira."
],
      checklistEn: [
        "Mission 1: Propose a fun playground game idea during classroom morning meeting.",
        "Mission 2: Participate in team coordinator election by raising hands orderly.",
        "Mission 3: Fulfill your chalkboard cleaning chore on your designated duty day enthusiastically."
],
      activities: [
        {
                "q": "Cara demokratis yang paling adil untuk memilih ketua kelompok belajar adalah...",
                "options": [
                        "Pemungutan suara (voting) bersama seluruh anggota",
                        "Ditentukan sendiri oleh yang paling galak",
                        "Melempar koin ke lantai",
                        "Berkelahi"
                ],
                "answer": "Pemungutan suara (voting) bersama seluruh anggota",
                "hint": "Setiap anak memiliki hak suara yang sama dan setara."
        },
        {
                "q": "Bila usulan kita tidak terpilih dalam musyawarah kelas, sikap Pelajar Pancasila adalah...",
                "options": [
                        "Menerima dengan lapang dada dan mendukung yang terpilih",
                        "Menangis di pojokan",
                        "Merusak papan tulis",
                        "Tidak mau masuk sekolah"
                ],
                "answer": "Menerima dengan lapang dada dan mendukung yang terpilih",
                "hint": "Jiwa besar dan sportivitas adalah kunci kerukunan bersama."
        },
        {
                "q": "Tujuan utama pembagian regu piket kelas adalah...",
                "options": [
                        "Menjaga kebersihan kelas secara gotong royong dan adil",
                        "Menghukum anak yang nakal",
                        "Membuat anak capek",
                        "Supaya tidak perlu belajar"
                ],
                "answer": "Menjaga kebersihan kelas secara gotong royong dan adil",
                "hint": "Pekerjaan berat menjadi ringan jika dibagi bersama."
        }
],
      activitiesEn: [
        {
                "q": "The fairest democratic method to select a study group leader is...",
                "options": [
                        "A shared vote where every member casts a voice",
                        "Letting the loudest kid decide alone",
                        "Flipping a random coin",
                        "Quarreling"
                ],
                "answer": "A shared vote where every member casts a voice",
                "hint": "Every learner has equal voice."
        }
]
    },
    {
      id: 'p5-sayang-bumi',
      title: 'Aku Sayang Bumi: Menanam Biji Kacang Hijau di Pot Daur Ulang',
      titleEn: 'I Love Mother Earth: Sprouting Mung Beans in Recycled Pots',
      desc: 'Projek sains cilik yang penuh keajaiban! Kita memanfaatkan gelas plastik bekas air mineral sebagai pot mini ramah lingkungan. Diberi kapas basah dan 5 butir biji kacang hijau. Dalam 3 hari, biji bertunas kecil, mengeluarkan akar putih halus, dan tumbuh daun hijau mungil menghadap sinar matahari!',
      descEn: 'A magical junior botanical adventure! Children repurpose clean used beverage cups as eco-friendly mini pots. Lined with moist cotton and 5 mung bean seeds, within 3 days delicate white roots emerge and bright green sprouts reach upward for sunlight!',
      checklist: [
        "Misi 1: Siapkan 1 gelas plastik bekas yang sudah dicuci bersih dan letakkan kapas basah di dasarnya.",
        "Misi 2: Taburkan 5 biji kacang hijau di atas kapas basah, lalu letakkan di tempat yang terkena cahaya matahari.",
        "Misi 3: Catat dan amati tinggi tunas kacang hijau setiap pagi di buku jurnal sains cilikmu."
],
      checklistEn: [
        "Mission 1: Prepare one clean recycled plastic cup and place moist cotton at the base.",
        "Mission 2: Scatter 5 green mung bean seeds onto the cotton and set near natural window sunlight.",
        "Mission 3: Measure and record the sprout growth height each morning in your science journal."
],
      activities: [
        {
                "q": "Dua hal penting yang dibutuhkan biji kacang hijau agar bertunas subur adalah...",
                "options": [
                        "Air (kelembapan) dan cahaya matahari",
                        "Minyak goreng dan es batu",
                        "Pasir panas tanpa air",
                        "Gula pasir manis"
                ],
                "answer": "Air (kelembapan) dan cahaya matahari",
                "hint": "Air memicu perkecambahan biji dan sinar matahari memberi energi tumbuh."
        },
        {
                "q": "Memanfaatkan gelas plastik bekas air mineral untuk pot tanaman adalah contoh aksi...",
                "options": [
                        "Daur ulang (Recycle) dan cinta lingkungan",
                        "Membuang sampah sembarangan",
                        "Merusak alam",
                        "Membuang uang"
                ],
                "answer": "Daur ulang (Recycle) dan cinta lingkungan",
                "hint": "Mengurangi sampah plastik dengan menjadikannya barang bermanfaat 🌱"
        },
        {
                "q": "Bagian tumbuhan yang pertama kali muncul dari biji menembus ke bawah adalah...",
                "options": [
                        "Akar halus untuk menyerap air",
                        "Buah lebat",
                        "Bunga mawar",
                        "Batang raksasa"
                ],
                "answer": "Akar halus untuk menyerap air",
                "hint": "Akar berfungsi mencengkeram dan mencari air di dalam kapas."
        }
],
      activitiesEn: [
        {
                "q": "Two essential elements required for seeds to germinate into healthy sprouts are...",
                "options": [
                        "Moisture (water) and sunlight",
                        "Cooking oil and ice cubes",
                        "Dry hot sand without water",
                        "Sugar powder"
                ],
                "answer": "Moisture (water) and sunlight",
                "hint": "Water unlocks germination and light fuels growth."
        }
]
    },
    {
      "id": "p5-bazar-wirausaha",
    "title": "Kewirausahaan Cilik: Bazar Minuman Sehat Jeruk Peras",
    "titleEn": "Little Entrepreneurs: Fresh Orange Juice Stand",
    "desc": "Belajar berwirausaha melatih kreativitas, kerja sama tim, dan kejujuran berhitung. Siswa bersama kelompok menyiapkan buah jeruk segar, memeras dengan alat manual, menghitung modal belanja, melayani pembeli dengan 3S (Senyum, Salam, Sapa), dan mencatat hasil penjualan!",
    "descEn": "Early entrepreneurship builds teamwork, financial honesty, and customer courtesy. Students collaborate to squeeze fresh orange juice, compute ingredient costs, serve peers with warm smiles, and record earnings!",
    "checklist": [
      "Misi 1: Hitung modal membeli 10 buah jeruk dan gelas kertas bersama kelompokmu.",
      "Misi 2: Praktikkan 3S (Senyum, Salam, Sapa) saat melayani teman yang membeli minuman.",
      "Misi 3: Hitung total uang hasil penjualan dan pisahkan modal dengan keuntungan bersih."
    ],
    "checklistEn": [
      "Mission 1: Calculate total ingredient expenses for 10 fresh oranges and paper cups.",
      "Mission 2: Practice warm hospitality (Smile, Greet, Thank) when serving peer customers.",
      "Mission 3: Tally final cash receipts and separate initial costs from net earnings."
    ],
    "activities": [
      {
        "q": "Sikap pedagang cilik yang jujur dan disenangi pembeli adalah...",
        "options": [
          "Melayani dengan senyuman ramah dan mengembalikan kembalian tepat",
          "Mengurangi takaran sembunyi-sembunyi",
          "Marah jika pembeli bertanya",
          "Memberi kembalian palsu"
        ],
        "answer": "Melayani dengan senyuman ramah dan mengembalikan kembalian tepat",
        "hint": "Kejujuran adalah modal utama dalam berwirausaha yang sukses berkah."
      },
      {
        "q": "Jika modal membeli bahan Rp 10.000 dan hasil penjualan terkumpul Rp 15.000, maka kita mendapat...",
        "options": [
          "Keuntungan (laba) sebesar Rp 5.000",
          "Rugi Rp 5.000",
          "Habis modal",
          "Tidak ada hasil"
        ],
        "answer": "Keuntungan (laba) sebesar Rp 5.000",
        "hint": "Laba = Uang Hasil Penjualan dikurangi Modal Awal."
      }
    ],
    "activitiesEn": [
      {
        "q": "An honest young shopkeeper always...",
        "options": [
          "Serves with cheerful smiles and provides exact change",
          "Cheats on measurements",
          "Scolds customers",
          "Overcharges"
        ],
        "answer": "Serves with cheerful smiles and provides exact change",
        "hint": "Integrity wins customer trust!"
      }
    ]
  },
  {
    "id": "p5-exhibition-day",
    "title": "Pameran Portofolio & Perayaan Hari Belajar (Exhibition Day)",
    "titleEn": "Learning Exhibition Day & Portfolio Celebration",
    "desc": "Perayaan Belajar (Exhibition Day) adalah puncak apresiasi Projek P5 di akhir semester. Siswa mendekorasi stan pameran kelas, memajang karya kolase alam, tanaman pot daur ulang, celengan kreatif, dan mempresentasikan hasil belajarnya kepada orang tua yang hadir!",
    "descEn": "Exhibition Day is the joyful culmination of P5 projects. Students decorate classroom display booths, exhibit nature collages, recycled planters, and handmade piggy banks, explaining their creations to visiting parents!",
    "checklist": [
      "Misi 1: Pilih 3 karya portofolio paling membanggakan selama belajar semester ini.",
      "Misi 2: Hias stan pameran mejamu dengan taplak rapi dan papan nama karya bertulisan indah.",
      "Misi 3: Sambut orang tua dan guru dengan presentasi ceria: \"Selamat datang di stanku!\""
    ],
    "checklistEn": [
      "Mission 1: Curate your 3 proudest creative artifacts accomplished this school semester.",
      "Mission 2: Decorate your display desk with neat runners and artistic label cards.",
      "Mission 3: Welcome visiting parents and teachers with enthusiastic presentations!"
    ],
    "activities": [
      {
        "q": "Tujuan utama diadakannya Perayaan Hari Belajar (Exhibition Day) adalah...",
        "options": [
          "Mengapresiasi proses belajar siswa dan berbagi kebahagiaan karya",
          "Mencari juara 1 dan menjatuhkan yang lain",
          "Menjual barang mahal",
          "Hanya piknik"
        ],
        "answer": "Mengapresiasi proses belajar siswa dan berbagi kebahagiaan karya",
        "hint": "P5 menekankan penguatan karakter dan kebanggaan atas karya sendiri."
      },
      {
        "q": "Saat orang tua berkunjung ke meja pameranmu, sikap yang tepat adalah...",
        "options": [
          "Menjelaskan cerita di balik karyamu dengan bangga dan santun",
          "Kabur sembunyi di bawah meja",
          "Meminta pulang cepat",
          "Menangis tersedu-sedu"
        ],
        "answer": "Menjelaskan cerita di balik karyamu dengan bangga dan santun",
        "hint": "Orang tua sangat senang dan bangga mendengar celoteh cerdas putranya!"
      }
    ],
    "activitiesEn": [
      {
        "q": "Primary goal of the P5 Learning Exhibition Day:",
        "options": [
          "Celebrate student learning journeys and appreciate creative efforts",
          "Compete aggressively",
          "Sell expensive trinkets",
          "Skip classes"
        ],
        "answer": "Celebrate student learning journeys and appreciate creative efforts",
        "hint": "Affirming character, collaboration, and joyful growth."
      }
    ]
  }
  ]
};
