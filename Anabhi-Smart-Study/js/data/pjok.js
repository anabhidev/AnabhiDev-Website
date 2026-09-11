// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · PJOK Subject Data
// Development · Anabhi Dev
// Version   : 2.0 (Comprehensive LKS & Kebugaran Jasmani Anak)
// ================================================================

export const PJOK_DATA = {
  id: 'pjok',
  title: 'PJOK — Tubuh Bugar, Jiwa Sehat, & Gerak Ceria',
  titleEn: 'Physical Education — Active Fitness & Vital Health',
  subtitle: 'Ayo bergerak lincah! Latih gerak lokomotor, senam irama, cuci tangan 6 langkah, dan gizi seimbang Isi Piringku! ⚽',
  subtitleEn: 'Stay vibrant and energetic! Master locomotor drills, rhythmic gymnastics, clean hygiene, and balanced nutrition! ⚽',
  topics: [
    {
      id: 'pjok-lokomotor',
      title: 'Gerak Dasar Lokomotor (Berpindah Tempat)',
      titleEn: 'Locomotor Skills (Traveling Movements)',
      desc: 'Gerak LOKOMOTOR adalah gerakan tubuh yang menyebabkan berpindah tempat dari satu titik ke titik lain. Contoh utamanya: BERJALAN santai, BERLARI kencang, MELOMPAT dengan tolakan dua kaki, dan MENCONGKANG (gallop) lincah seperti kuda berlari!',
      descEn: 'LOCOMOTOR movements transport your body across space from one spot to another. Core fundamentals include WALKING upright, RUNNING swiftly, JUMPING off two feet, and GALLOPING like a playful pony!',
      checklist: [
        'Misi 1: Praktikkan berjalan lurus di atas satu garis lantai sepanjang 5 meter dengan pandangan ke depan.',
        'Misi 2: Lakukan lari pelan (jogging) di tempat selama 30 detik untuk pemanasan.',
        'Misi 3: Lakukan 5 kali lompatan katak dengan mendarat mengeper menggunakan kedua lutut lentur.'
      ],
      checklistEn: [
        'Mission 1: Walk along a straight floor tape line for 5 meters keeping balanced posture.',
        'Mission 2: Jog gently in place for 30 seconds as a light aerobic warm-up.',
        'Mission 3: Perform 5 frog jumps landing softly with cushioned, bent knees.'
      ],
      activities: [
        { q: 'Gerakan tubuh yang membuat kita berpindah tempat disebut gerak...', options: ['Lokomotor', 'Non-lokomotor', 'Manipulatif', 'Statik'], answer: 'Lokomotor', hint: 'Lokomotor berarti bergerak berpindah posisi (contoh: berjalan dan berlari).' },
        { q: 'Saat berlari cepat, ayunan kedua tangan yang benar adalah...', options: ['Mengayun teratur ke depan dan ke belakang berlawanan arah langkah kaki', 'Diam di samping pinggang', 'Diangkat lurus ke atas kepala', 'Dimasukkan ke dalam saku celana'], answer: 'Mengayun teratur ke depan dan ke belakang berlawanan arah langkah kaki', hint: 'Ayunan lengan seirama membantu keseimbangan dan menambah dorongan lari.' }
      ],
      activitiesEn: [
        { q: 'Body movements that transport you across from one location to another are called...', options: ['Locomotor', 'Non-locomotor', 'Manipulative', 'Static'], answer: 'Locomotor', hint: 'Walking and running travel through space.' }
      ]
    },
    {
      id: 'pjok-non-lokomotor',
      title: 'Gerak Dasar Non-Lokomotor (Tanpa Berpindah)',
      titleEn: 'Non-Locomotor Skills (Stationary Movements)',
      desc: 'Gerak NON-LOKOMOTOR adalah gerakan tubuh yang dilakukan di tempat tanpa berpindah posisi. Contoh: MEMBUNGKUK menyentuh ujung sepatu, MELIUKKAN badan ke kanan dan kiri, MEMUTAR pinggang, serta MENGAYUN lengan untuk peregangan otot agar lentur dan terhindar dari cedera!',
      descEn: 'NON-LOCOMOTOR movements are performed right in place without moving from your base. Core examples include BENDING down to toes, SWAYING side to side, TWISTING the torso, and STRETCHING limbs to prevent cramps!',
      checklist: [
        'Misi 1: Berdiri tegak, bungkukkan badan perlahan dan sentuh ujung jari kaki tanpa menekuk lutut selama 8 hitungan.',
        'Misi 2: Rentangkan kedua tangan ke samping dan liukkan badan ke kiri dan kanan seperti pohon tertiup angin.',
        'Misi 3: Putar kedua pergelangan tangan dan bahu ke arah depan dan belakang sebanyak 8 putaran.'
      ],
      checklistEn: [
        'Mission 1: Stand tall, hinge forward slowly to touch toes without bending knees for 8 counts.',
        'Mission 2: Stretch arms wide and sway torso side to side like a palm tree in gentle breeze.',
        'Mission 3: Roll wrists and shoulders forward and backward smoothly for 8 rotations.'
      ],
      activities: [
        { q: 'Manakah di bawah ini yang merupakan contoh gerak non-lokomotor?', options: ['Meliukkan badan ke samping di tempat', 'Berlari mengelilingi lapangan', 'Melompat melewati rintangan kardus', 'Berenang menyeberangi kolam'], answer: 'Meliukkan badan ke samping di tempat', hint: 'Non-lokomotor dilakukan diam di tempat tanpa melangkah berpindah.' },
        { q: 'Apa manfaat melakukan gerakan peregangan otot sebelum berolahraga?', options: ['Mencegah cedera otot dan membuat tubuh lebih lentur', 'Membuat tubuh cepat lelah', 'Menurunkan detak jantung mendadak', 'Agar bisa tidur saat olahraga'], answer: 'Mencegah cedera otot dan membuat tubuh lebih lentur', hint: 'Peregangan menyiapkan otot dan sendi agar siap bergerak aktif.' }
      ],
      activitiesEn: [
        { q: 'Which of the following is an example of stationary non-locomotor movement?', options: ['Swaying torso sideways in place', 'Sprinting across field', 'Jumping hurdles', 'Swimming across pool'], answer: 'Swaying torso sideways in place', hint: 'Non-locomotor stays rooted in one place.' }
      ]
    },
    {
      id: 'pjok-manipulatif',
      title: 'Gerak Dasar Manipulatif (Menggunakan Alat)',
      titleEn: 'Manipulative Skills (Ball & Object Control)',
      desc: 'Gerak MANIPULATIF melibatkan penguasaan anggota tubuh terhadap suatu benda atau alat olahraga (seperti bola atau raket). Keterampilan dasarnya: MELEMPAR bola ke sasaran, MENANGKAP bola dengan kedua tangan lentur, MENENDANG bola ke gawang, dan MENGGIRING bola!',
      descEn: 'MANIPULATIVE movements develop coordination when interacting with equipment like balls and racquets. Fundamental drills include THROWING accurately, CATCHING with soft hands, KICKING toward targets, and DRIBBLING smoothly!',
      checklist: [
        'Misi 1: Lempar bola plastik kecil ke atas dan tangkap kembali dengan kedua tangan sebanyak 5 kali tanpa jatuh.',
        'Misi 2: Tendang bola pelan ke arah sasaran botol plastik dari jarak 3 meter.',
        'Misi 3: Giring bola dengan kaki bagian dalam melewati 3 rintangan kerucut/botol.'
      ],
      checklistEn: [
        'Mission 1: Toss a small ball upwards and catch it with both hands 5 times without dropping.',
        'Mission 2: Kick a ball gently towards a plastic bottle target from a 3-meter distance.',
        'Mission 3: Dribble a soccer ball using the inside of your foot around 3 cones.'
      ],
      activities: [
        { q: 'Menendang, melempar, dan menangkap bola termasuk ke dalam kelompok gerak...', options: ['Manipulatif', 'Lokomotor', 'Non-lokomotor', 'Non-aktif'], answer: 'Manipulatif', hint: 'Manipulatif menggunakan benda atau objek luar sebagai alat olahraga 🎾' },
        { q: 'Saat hendak menangkap bola lemparan dari teman, posisi kedua telapak tangan yang benar adalah...', options: ['Terbuka membentuk mangkuk menghadap ke arah datangnya bola', 'Mengepal kaku ke bawah', 'Disilangkan di belakang punggung', 'Menutup kedua mata'], answer: 'Terbuka membentuk mangkuk menghadap ke arah datangnya bola', hint: 'Jari-jari lentur siap meredam benturan bola.' }
      ],
      activitiesEn: [
        { q: 'Kicking, tossing, and catching a ball belong to which category of movement skills?', options: ['Manipulative', 'Locomotor', 'Non-locomotor', 'Static'], answer: 'Manipulative', hint: 'Involves handling external sport gear or balls 🎾' }
      ]
    },
    {
      id: 'pjok-senam-irama',
      title: 'Aktivitas Senam Irama / Ritmik Ceria',
      titleEn: 'Rhythmic Gymnastics & Musical Movement',
      desc: 'Senam Irama memadukan gerakan langkah kaki dan ayunan lengan yang selaras mengikuti irama ketukan musik atau hitungan ceria. Senam ini melatih koordinasi otak kiri dan kanan, kelenturan tubuh, rasa percaya diri, serta memupuk keceriaan bersama kawan!',
      descEn: 'Rhythmic gymnastics blends footwork and sweeping arm gestures synchronized to upbeat musical tempos. It builds bilateral brain coordination, cardiovascular endurance, and social joy!',
      checklist: [
        'Misi 1: Langkah kaki ke samping kanan dan kiri secara bergantian mengikuti ketukan musik 1-2-3-4.',
        'Misi 2: Ayunkan kedua lengan ke atas dan ke bawah seirama dengan langkah kakimu.',
        'Misi 3: Ajak saudaramu senam bersama di pagi hari selama 5 menit di teras rumah.'
      ],
      checklistEn: [
        'Mission 1: Step sideways right and left alternately matching a cheerful 1-2-3-4 music tempo.',
        'Mission 2: Swing both arms overhead and down in cadence with your footwork.',
        'Mission 3: Lead your family in a 5-minute sunny morning rhythmic exercise routine.'
      ],
      activities: [
        { q: 'Unsur terpenting yang memandu gerakan pada senam irama adalah...', options: ['Ketukan irama musik atau tempo hitungan', 'Berat beban alat', 'Kecepatan lari kencang', 'Ketinggian lompatan'], answer: 'Ketukan irama musik atau tempo hitungan', hint: 'Gerakan harus selaras dan kompak dengan ritme musik 🎶' },
        { q: 'Senam irama yang dilakukan bersama teman-teman sekelas melatih rasa...', options: ['Kekompakan dan kebersamaan', 'Egois ingin menang sendiri', 'Rasa malas bergerak', 'Kecurigaan'], answer: 'Kekompakan dan kebersamaan', hint: 'Senam bersama menumbuhkan harmoni dan persahabatan.' }
      ],
      activitiesEn: [
        { q: 'What is the most crucial pacing element in rhythmic aerobic exercise?', options: ['Musical rhythm and count tempo', 'Heavy barbell weight', 'Max sprint speed', 'Jump height'], answer: 'Musical rhythm and count tempo', hint: 'Movement syncs with the musical beat 🎶' }
      ]
    },
    {
      id: 'pjok-kebersihan-diri',
      title: 'Menjaga Kebersihan Diri & Cuci Tangan 6 Langkah',
      titleEn: 'Personal Hygiene & 6-Step Handwashing',
      desc: 'Tubuh yang sehat berawal dari kebersihan diri: Mandi 2 kali sehari memakai sabun, sikat gigi pagi setelah sarapan dan malam sebelum tidur, serta memotong kuku kotor. Cuci tangan 6 langkah memakai sabun dan air mengalir selama 20 detik membasmi kuman dan virus penyakit!',
      descEn: 'Vibrant health blooms from clean hygiene habits: Showering twice daily, brushing teeth morning and night, and clipping fingernails. Proper 6-step handwashing with soap for 20 seconds eliminates germs!',
      checklist: [
        'Misi 1: Praktikkan 6 langkah cuci tangan pakai sabun (telapak, punggung tangan, sela jari, kunci jari, putar ibu jari, dan ujung kuku).',
        'Misi 2: Sikat gigimu secara menyeluruh dengan pasta gigi berfluoride sebelum tidur malam ini.',
        'Misi 3: Periksa kuku jari tanganmu; jika sudah panjang dan hitam, mintalah bantuan orang tua untuk memotongnya rapi.'
      ],
      checklistEn: [
        'Mission 1: Demonstrate the 6 handwashing steps using soap under flowing water for 20 seconds.',
        'Mission 2: Brush your teeth thoroughly with circular strokes before bedtime tonight.',
        'Mission 3: Check fingernails; trim them clean with parental assistance if overgrown.'
      ],
      activities: [
        { q: 'Berapa durasi waktu minimal yang disarankan dokter saat mencuci tangan pakai sabun?', options: ['20 detik', '2 detik', '1 menit tanpa henti', 'Hanya celup air saja'], answer: '20 detik', hint: 'Cukup untuk menyanyikan lagu "Selamat Ulang Tahun" 2 kali 🧼' },
        { q: 'Kapan waktu yang paling tepat untuk menyikat gigi agar terhindar dari gigi berlubang?', options: ['Pagi setelah sarapan dan malam sebelum tidur', 'Hanya seminggu sekali', 'Hanya saat sakit gigi', 'Tengah malam saat tidur'], answer: 'Pagi setelah sarapan dan malam sebelum tidur', hint: 'Membersihkan sisa makanan agar kuman tidak merusak lapisan gigi.' }
      ],
      activitiesEn: [
        { q: 'What is the recommended minimum duration for effective handwashing with soap?', options: ['20 seconds', '2 seconds', '10 minutes', 'Just a quick splash'], answer: '20 seconds', hint: 'Equal to singing the "Happy Birthday" song twice 🧼' }
      ]
    },
    {
      id: 'pjok-gizi-seimbang',
      title: 'Gizi Seimbang: Isi Piringku & Istirahat Cukup',
      titleEn: 'Balanced Nutrition (Isi Piringku) & Quality Sleep',
      desc: 'Prinsip "Isi Piringku" mengajarkan porsi gizi seimbang dalam satu piring makan: 1/3 Makanan Pokok (nasi/kentang/ubi), 1/3 Sayuran segar, 1/6 Lauk-pauk berprotein (ikan/telur/tahu), dan 1/6 Buah-buahan manis alami. Minum air putih 8 gelas sehari dan tidur 8-9 jam agar tubuh tumbuh optimal!',
      descEn: 'The "Isi Piringku" guide balances every plate: 1/3 Staple carbs (rice/potatoes), 1/3 Fresh greens & veggies, 1/6 Healthy protein (fish/eggs/tofu), and 1/6 Fresh fruit! Hydrate with 8 glasses of water and rest 8-9 hours every night!',
      checklist: [
        'Misi 1: Amati piring makan siangmu dan sebutkan mana sayuran serta lauk proteinnya.',
        'Misi 2: Minum minimal 6-8 gelas air putih bersih sepanjang hari hari ini.',
        'Misi 3: Tidur tepat waktu pukul 20.30 malam dan hindari menatap layar gadget sebelum tidur.'
      ],
      checklistEn: [
        'Mission 1: Examine your lunch plate and identify the vegetable and protein portions.',
        'Mission 2: Drink at least 6 to 8 cups of fresh pure water throughout the day.',
        'Mission 3: Go to sleep on schedule by 8:30 PM, putting aside screens for restful sleep.'
      ],
      activities: [
        { q: 'Dalam pedoman gizi seimbang "Isi Piringku", sumber energi makanan pokok contohnya adalah...', options: ['Nasi, jagung, dan ubi', 'Permen manis dan lolipop', 'Keripik asin pedas', 'Minuman soda bersoda'], answer: 'Nasi, jagung, dan ubi', hint: 'Karbohidrat kompleks yang memberikan tenaga belajar dan bermain 🍚' },
        { q: 'Berapa jam waktu tidur malam yang dianjurkan untuk anak usia sekolah dasar agar tumbuh tinggi dan cerdas?', options: ['8 sampai 9 jam', 'Hanya 2 jam', '15 jam seharian', 'Tidak perlu tidur'], answer: '8 sampai 9 jam', hint: 'Tidur cukup memulihkan stamina dan memicu hormon pertumbuhan.' }
      ],
      activitiesEn: [
        { q: 'In the balanced nutrition plate guide, which food serves as a healthy staple carbohydrate?', options: ['Steamed rice, corn, and sweet potato', 'Cotton candy and lollipops', 'Processed spicy crisps', 'Fizzy soda drinks'], answer: 'Steamed rice, corn, and sweet potato', hint: 'Wholesome carbohydrates fuel active play and study 🍚' }
      ]
    }
,
    {
      id: 'pjok-keseimbangan',
      title: 'Latihan Keseimbangan Tubuh: Sikap Bangau & Jinjit',
      titleEn: 'Body Balance Training: Crane Stand & Tip-Toe Walking',
      desc: 'Keseimbangan tubuh yang kuat mencegah kita mudah terjatuh saat berlari atau bermain. Ada keseimbangan diam (statis) seperti berdiri satu kaki meniru burung bangau dengan kedua tangan direntangkan. Ada pula keseimbangan bergerak (dinamis) seperti berjalan jinjit di atas garis lurus tanpa oleng!',
      descEn: 'A resilient sense of balance prevents falls during joyful games. Static balance involves holding poses like the graceful Crane Stand on one foot with arms outstretched. Dynamic balance involves walking tip-toe along a chalk line with poised composure!',
      checklist: [
        "Misi 1: Praktikkan sikap berdiri burung bangau (satu kaki ditekuk) selama 10 hitungan tanpa bergoyang.",
        "Misi 2: Berjalan jinjit di atas lantai lurus sejauh 3 meter dengan kedua tangan direntangkan ke samping.",
        "Misi 3: Lakukan gerakan menarik napas panjang dan hembuskan perlahan untuk mendinginkan tubuh."
],
      checklistEn: [
        "Mission 1: Hold the Crane Stand pose on one foot for 10 calm seconds without wobbling.",
        "Mission 2: Walk tip-toe along a straight floor tile seam for 3 meters with arms spread wide.",
        "Mission 3: Take deep relaxing breaths to cool down after balance exercises."
],
      activities: [
        {
                "q": "Berdiri dengan satu kaki ditekuk dan kedua tangan direntangkan ke samping meniru gerakan...",
                "options": [
                        "Burung Bangau",
                        "Katak melompat",
                        "Kuda berlari",
                        "Ikan berenang"
                ],
                "answer": "Burung Bangau",
                "hint": "Burung anggun berkaki panjang yang sering berdiri tenang di tepi sawah."
        },
        {
                "q": "Tujuan utama dari merentangkan kedua tangan saat berjalan di titian atau garis lurus adalah...",
                "options": [
                        "Menjaga keseimbangan tubuh agar tidak oleng/jatuh",
                        "Mengejar layang-layang",
                        "Mendinginkan ketiak",
                        "Terbang ke awan"
                ],
                "answer": "Menjaga keseimbangan tubuh agar tidak oleng/jatuh",
                "hint": "Tangan bertindak sebagai penyeimbang beban kiri dan kanan."
        },
        {
                "q": "Latihan keseimbangan dilakukan di tempat yang...",
                "options": [
                        "Aman, rata, dan tidak licin",
                        "Tangga yang curam",
                        "Lantai basah berlumut",
                        "Jalan raya ramai kendaraan"
                ],
                "answer": "Aman, rata, dan tidak licin",
                "hint": "Keselamatan adalah hal paling utama saat berolahraga."
        }
],
      activitiesEn: [
        {
                "q": "Standing poised on one foot with arms outstretched mimics the posture of a...",
                "options": [
                        "Graceful Crane",
                        "Jumping frog",
                        "Galloping horse",
                        "Swimming fish"
                ],
                "answer": "Graceful Crane",
                "hint": "A tall marsh bird known for steady balance."
        }
]
    },
    {
      id: 'pjok-makanan-sehat',
      title: 'Piring Makanku Sehat: Gizi Seimbang & Air Putih',
      titleEn: 'My Healthy Plate: Balanced Nutrition & Fresh Water',
      desc: 'Agar tubuh anak Kelas 1 SD tumbuh tinggi, cerdas, dan jarang sakit, kita perlu menyantap makanan bergizi seimbang! Panduan "Isi Piringku": sepertiga makanan pokok (nasi/kentang), sepertiga sayuran segar (bayam/wortel), dan sepertiganya lauk pauk (telur/ikan/tempe) plus buah manis, serta minum 6-8 gelas air putih setiap hari!',
      descEn: 'To grow energetic, clever, and robust, 1st graders enjoy balanced nutritious plates! The "Healthy Plate" guide: 1/3 whole grains, 1/3 crisp greens, and 1/3 protein (eggs/fish/tempeh) topped with juicy fruits and 6-8 glasses of fresh water daily!',
      checklist: [
        "Misi 1: Habiskan porsi sayur hijau (bayam, brokoli, atau wortel) saat makan siang hari ini.",
        "Misi 2: Bawa botol minum air putih ke sekolah dan minum secara teratur setelah berolahraga.",
        "Misi 3: Cuci tangan dengan sabun di air mengalir sebelum memegang makanan."
],
      checklistEn: [
        "Mission 1: Enjoy your portion of colorful vegetables with your lunch today.",
        "Mission 2: Carry a reusable water bottle to school and hydrate regularly during exercise.",
        "Mission 3: Wash hands thoroughly with soap under running water before every meal."
],
      activities: [
        {
                "q": "Makanan yang kaya akan vitamin dan serat untuk kesehatan mata dan pencernaan adalah...",
                "options": [
                        "Sayuran hijau dan buah-buahan segar",
                        "Permen manis dan chiki",
                        "Minuman soda bersoda",
                        "Gorengan minyak jelantah"
                ],
                "answer": "Sayuran hijau dan buah-buahan segar",
                "hint": "Wortel, bayam, apel, dan pepaya menyehatkan tubuh."
        },
        {
                "q": "Berapa gelas air putih yang disarankan diminum oleh anak setiap hari?",
                "options": [
                        "6 sampai 8 gelas air putih",
                        "Hanya 1 sendok",
                        "100 gelas",
                        "Tidak perlu minum sama sekali"
                ],
                "answer": "6 sampai 8 gelas air putih",
                "hint": "Tubuh kita membutuhkan air agar tidak lemas dan dehidrasi."
        },
        {
                "q": "Sebelum makan, kita wajib mencuci tangan menggunakan...",
                "options": [
                        "Sabun dan air bersih yang mengalir",
                        "Cukup dilap ke celana",
                        "Tisu kotor",
                        "Air kopi"
                ],
                "answer": "Sabun dan air bersih yang mengalir",
                "hint": "Kuman dan bakteri di tangan mati oleh sabun."
        }
],
      activitiesEn: [
        {
                "q": "Foods rich in vital vitamins and dietary fiber for strong health are...",
                "options": [
                        "Fresh vegetables and juicy fruits",
                        "Sugary candies and soda",
                        "Greasy deep-fried chips",
                        "Ice pops only"
                ],
                "answer": "Fresh vegetables and juicy fruits",
                "hint": "Natural garden produce nourishes our organs."
        }
]
    }
  ]
};
