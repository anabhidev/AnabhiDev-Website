// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Pendidikan Agama & Budi Pekerti Data
// Development · Anabhi Dev
// Version   : 2.0 (Comprehensive LKS & Nilai Universal Kebaikan)
// ================================================================

export const AGAMA_DATA = {
  id: 'agama',
  title: 'Pendidikan Agama — Budi Pekerti & Kasih Sayang Semesta',
  titleEn: 'Religious Education — Universal Ethics & Compassion',
  subtitle: 'Mari bersyukur atas ciptaan Tuhan, berbakti kepada orang tua, menyayangi satwa, dan rukun antarumat beragama! 🙏',
  subtitleEn: 'Cultivate gratitude for divine creation, honor parents, show empathy to animals, and foster interfaith harmony! 🙏',
  topics: [
    {
      id: 'ag-bersyukur',
      title: 'Bersyukur Atas Ciptaan Tuhan Yang Maha Esa',
      titleEn: 'Gratitude for the Wonders of Creation',
      desc: 'Tuhan Yang Maha Esa menciptakan alam semesta yang indah: matahari yang menghangatkan bumi, udara bersih untuk bernapas, air jernih untuk minum, serta tubuh yang sehat dan sempurna. Rasa syukur diwujudkan dengan menjaga kesehatan, beribadah rajin, dan memelihara alam sekitar!',
      descEn: 'God created the majestic cosmos: warming sunlight, fresh air to breathe, crystalline water, and healthy human bodies. We honor creation through heartfelt prayers, joyful gratitude, and caring for nature!',
      checklist: [
        'Misi 1: Ucapkan doa syukur saat bangun di pagi hari atas nafas dan hari baru yang cerah.',
        'Misi 2: Sebutkan 3 ciptaan Tuhan yang paling kamu kagumi saat melihat pemandangan alam (misal: gunung, laut, burung).',
        'Misi 3: Matikan keran air setelah digunakan agar tidak membuang-buang berkah air bersih.'
      ],
      checklistEn: [
        'Mission 1: Say a morning prayer of gratitude for a fresh healthy day upon waking.',
        'Mission 2: Name 3 creations of nature that inspire your awe (e.g. mountains, ocean, colorful birds).',
        'Mission 3: Turn off the water tap tightly after use to conserve precious natural water.'
      ],
      activities: [
        { q: 'Cara terbaik menunjukkan rasa syukur atas nikmat tubuh yang sehat adalah...', options: ['Menjaga kesehatan dengan makan teratur dan berolahraga', 'Malas mandi dan makan sembarangan', 'Begadang main game sampai larut', 'Mengeluh setiap hari'], answer: 'Menjaga kesehatan dengan makan teratur dan berolahraga', hint: 'Merawat tubuh adalah amanah dan ungkapan terima kasih kepada Tuhan.' },
        { q: 'Matahari terbit di timur memberikan kehangatan dan vitamin D. Matahari adalah ciptaan...', options: ['Tuhan Yang Maha Kuasa', 'Pabrik manusia', 'Robot antariksa', 'Komputer canggih'], answer: 'Tuhan Yang Maha Kuasa', hint: 'Seluruh tata surya dan benda langit diciptakan oleh Tuhan Yang Maha Esa ☀️' }
      ],
      activitiesEn: [
        { q: 'What is the most sincere way to show gratitude for a healthy body?', options: ['Caring for physical health with nutritious meals and active exercise', 'Neglecting hygiene and skipping meals', 'Staying up all night gaming', 'Complaining constantly'], answer: 'Caring for physical health with nutritious meals and active exercise', hint: 'Treating your body kindly honors divine creation.' }
      ]
    },
    {
      id: 'ag-budi-pekerti',
      title: 'Budi Pekerti: Kasih Sayang Kepada Orang Tua & Guru',
      titleEn: 'Noble Character: Devotion to Parents & Teachers',
      desc: 'Ayah dan ibu telah merawat kita dengan penuh kasih sayang sejak bayi. Guru mendidik dan mengajarkan kita ilmu pengetahuan dengan sabar. Berbakti kepada orang tua dan guru dilakukan dengan bertutur kata santun, mendengarkan nasehat baik, dan tidak membantah dengan kasar!',
      descEn: 'Parents nurture us with unconditional love from infancy. Teachers patiently illuminate our minds with wisdom. We honor them through polite words, heedful obedience to wholesome advice, and respectful helpfulness!',
      checklist: [
        'Misi 1: Ucapkan terima kasih dan peluk ayah atau ibumu hari ini dengan tulus.',
        'Misi 2: Dengarkan nasehat guru di kelas tanpa memotong pembicaraan dengan gaduh.',
        'Misi 3: Cium tangan orang tua dengan takzim saat berpamitan berangkat ke sekolah.'
      ],
      checklistEn: [
        'Mission 1: Hug and say a sincere "Thank you, Mom and Dad" for their ceaseless love.',
        'Mission 2: Listen attentively to teacher instructions without disruptive talking.',
        'Mission 3: Show customary warm respect when bidding farewell before departing for school.'
      ],
      activities: [
        { q: 'Saat orang tua atau guru sedang menasehati kita demi kebaikan, sikap yang santun adalah...', options: ['Mendengarkan dengan tenang dan penuh rasa hormat', 'Membantah sambil berteriak', 'Menutup telinga dan lari', 'Mengejek nasehatnya'], answer: 'Mendengarkan dengan tenang dan penuh rasa hormat', hint: 'Mendengarkan dengan hormat adalah tanda anak berbakti dan berbudi luhur.' },
        { q: 'Bagaimana cara berbakti kepada orang tua saat di rumah?', options: ['Membantu merapikan rumah dan berbicara dengan nada lembut', 'Meminta uang jajan berlebihan', 'Membuat rumah berantakan', 'Malas belajar'], answer: 'Membantu merapikan rumah dan berbicara dengan nada lembut', hint: 'Membantu meringankan beban orang tua mendatangkan keberkahan.' }
      ],
      activitiesEn: [
        { q: 'When parents or teachers provide thoughtful advice, how should a well-mannered student respond?', options: ['Listen respectfully and calmly', 'Shout back angrily', 'Plug ears and storm out', 'Mock the guidance'], answer: 'Listen respectfully and calmly', hint: 'Respectful listening embodies noble character.' }
      ]
    },
    {
      id: 'ag-sayang-makhluk',
      title: 'Menyayangi Makhluk Hidup & Menjaga Lingkungan',
      titleEn: 'Compassion for Living Beings & Animal Welfare',
      desc: 'Hewan dan tumbuhan adalah sesama makhluk ciptaan Tuhan. Kucing, burung, ikan, dan pohon berhak hidup nyaman di bumi. Tidak boleh menyiksa hewan, tidak memetik bunga sembarangan, memberi makan hewan peliharaan, dan menyiram tanaman adalah wujud kasih sayang universal!',
      descEn: 'Animals and plants are our fellow earthly cohabitants created by God. Pets and wildlife deserve kindness. Refraining from harming animals, watering potted plants, and preserving green foliage manifests universal empathy!',
      checklist: [
        'Misi 1: Beri makan atau minum hewan peliharaanmu (atau kucing liar sekitar rumah) dengan ramah.',
        'Misi 2: Siram tanaman di pot atau halaman rumahmu di sore hari yang sejuk.',
        'Misi 3: Jangan menginjak rumput taman atau merusak ranting pohon yang sedang bersemi.'
      ],
      checklistEn: [
        'Mission 1: Feed or provide fresh clean water to a pet or a gentle neighborhood stray.',
        'Mission 2: Water potted flowers or garden plants in the soothing cool afternoon.',
        'Mission 3: Avoid trampling fresh grass beds or breaking budding flowering branches.'
      ],
      activities: [
        { q: 'Jika melihat anak kucing yang kelaparan di pinggir jalan, tindakan mulia yang patut dilakukan adalah...', options: ['Memberinya sedikit makanan atau susu dan memperlakukannya lembut', 'Menendang atau melemparinya batu', 'Menakut-nakutinya dengan suara keras', 'Membiarkannya kehujanan'], answer: 'Memberinya sedikit makanan atau susu dan memperlakukannya lembut', hint: 'Menyayangi hewan adalah perbuatan terpuji yang dicintai Tuhan 🐱' },
        { q: 'Mengapa kita perlu menyiram tanaman di sekitar pekarangan rumah kita?', options: ['Agar tanaman tumbuh subur dan menghasilkan udara segar oksigen', 'Agar tanaman cepat mati', 'Agar halaman becek berlumpur', 'Hanya membuang waktu'], answer: 'Agar tanaman tumbuh subur dan menghasilkan udara segar oksigen', hint: 'Tanaman yang subur memberi kesejukan dan keindahan lingkungan.' }
      ],
      activitiesEn: [
        { q: 'If you encounter a hungry little kitten, what is the compassionate action?', options: ['Offer a bowl of clean water or food gently', 'Kick pebbles at it', 'Shout to terrorize it', 'Trap it in the cold rain'], answer: 'Offer a bowl of clean water or food gently', hint: 'Gentleness to animals reflects pure kindness 🐱' }
      ]
    },
    {
      id: 'ag-enam-agama',
      title: '6 Agama Resmi di Indonesia & Tempat Ibadahnya',
      titleEn: '6 Recognized Religions & Sacred Places of Worship',
      desc: 'Indonesia mengakui 6 agama resmi yang hidup rukun berdampingan: Islam (Masjid), Kristen Protestan (Gereja), Katolik (Gereja), Hindu (Pura), Buddha (Vihara), dan Konghucu (Klenteng/Litang). Semua agama mengajarkan kebaikan, kejujuran, dan persaudaraan sejati!',
      descEn: 'Indonesia officially recognizes 6 faiths coexisting in harmony: Islam (Mosque), Protestantism (Church), Catholicism (Church), Hinduism (Pura), Buddhism (Vihara), and Confucianism (Klenteng). All religions advocate truth, peace, and love!',
      checklist: [
        'Misi 1: Sebutkan nama tempat ibadah untuk agamamu sendiri dan letaknya di kotamu.',
        'Misi 2: Pasangkan 3 agama dengan tempat ibadahnya (Islam-Masjid, Hindu-Pura, Kristen-Gereja).',
        'Misi 3: Ucapkan salam perdamaian kepada teman yang berbeda agama dengan senyum persahabatan.'
      ],
      checklistEn: [
        'Mission 1: Name the place of worship for your family\'s faith community.',
        'Mission 2: Match 3 religions to their houses of worship (Islam-Mosque, Hindu-Pura, Christian-Church).',
        'Mission 3: Extend a peaceful, friendly greeting to peers of different faiths.'
      ],
      activities: [
        { q: 'Tempat ibadah suci bagi umat Hindu di Bali dan nusantara disebut...', options: ['Pura', 'Masjid', 'Gereja', 'Vihara'], answer: 'Pura', hint: 'Pura dengan candi bentar yang anggun nan asri 🛕' },
        { q: 'Umat Islam melaksanakan ibadah sholat berjamaah di...', options: ['Masjid', 'Pura', 'Klenteng', 'Candi'], answer: 'Masjid', hint: 'Masjid dengan kubah megah dan menara azan 🕌' },
        { q: 'Vihara adalah tempat ibadah suci bagi pemeluk agama...', options: ['Buddha', 'Konghucu', 'Katolik', 'Islam'], answer: 'Buddha', hint: 'Pemeluk agama Buddha beribadah di Vihara.' }
      ],
      activitiesEn: [
        { q: 'The sacred place of worship for Hindu communities in Bali and Indonesia is...', options: ['Pura', 'Mosque', 'Church', 'Vihara'], answer: 'Pura', hint: 'Pura shrines featuring ornate split gates 🛕' }
      ]
    },
    {
      id: 'ag-toleransi',
      title: 'Sikap Toleransi & Menghargai Perbedaan',
      titleEn: 'Interfaith Tolerance & Respecting Differences',
      desc: 'Toleransi adalah sikap saling menghormati dan menghargai keyakinan orang lain tanpa membeda-bedakan. Saat teman sedang berpuasa atau beribadah, kita tidak boleh mengganggunya. Kita saling mengucapkan selamat hari raya dan tetap bermain bersama dengan ceria!',
      descEn: 'Tolerance means deeply respecting others\' spiritual beliefs without prejudice. When friends observe fasting or prayers, we offer quiet respect. We exchange heartfelt festive greetings and remain great buddies!',
      checklist: [
        'Misi 1: Jaga ketenangan saat temanmu yang berbeda agama sedang khusyuk berdoa.',
        'Misi 2: Berikan ucapan selamat hari raya (Idul Fitri, Natal, Nyepi, Waisak, Imlek) kepada temanmu saat perayaannya.',
        'Misi 3: Duduk dan makan bersama teman di sekolah tanpa pernah membeda-bedakan agamanya.'
      ],
      checklistEn: [
        'Mission 1: Maintain serene silence when a classmate of another faith offers prayer.',
        'Mission 2: Wish warm holiday greetings (Eid, Christmas, Nyepi, Vesak, Lunar New Year) to celebrants.',
        'Mission 3: Sit and share lunch with schoolmates warmly regardless of faith traditions.'
      ],
      activities: [
        { q: 'Ketika tetangga atau temanmu sedang melaksanakan ibadah di rumahnya, sikap toleransi yang tepat adalah...', options: ['Menjaga ketenangan dan tidak menyetel musik keras-keras', 'Berteriak di depan pintu rumahnya', 'Mengajak main bola di depan jendelanya', 'Membunyikan klakson kencang'], answer: 'Menjaga ketenangan dan tidak menyetel musik keras-keras', hint: 'Menghargai waktu ibadah orang lain menciptakan lingkungan yang damai dan rukun.' },
        { q: 'Bolehkah kita memilih-milih teman bermain hanya berdasarkan agamanya saja?', options: ['Tidak boleh, kita harus berteman rukun dengan semua anak tanpa membeda-bedakan', 'Boleh saja sesuka hati', 'Hanya bermain dengan tetangga sebelah', 'Harus memusuhi teman yang berbeda'], answer: 'Tidak boleh, kita harus berteman rukun dengan semua anak tanpa membeda-bedakan', hint: 'Semua anak Indonesia adalah sahabat yang sederajat.' }
      ],
      activitiesEn: [
        { q: 'When a neighbor is observing peaceful prayers at home, what is the right civic attitude?', options: ['Keep quiet and refrain from blasting loud music', 'Shout outside their doorway', 'Play soccer right at their window', 'Honk horns repeatedly'], answer: 'Keep quiet and refrain from blasting loud music', hint: 'Respecting worship hours creates community peace.' }
      ]
    },
    {
      id: 'ag-kejujuran-amal',
      title: 'Kejujuran, Doa, & Gemar Berbuat Kebaikan',
      titleEn: 'Honesty, Prayerful Reflection, & Daily Kindness',
      desc: 'Kejujuran adalah mutiara hati: berkata benar apa adanya, mengakui kesalahan bila berbuat salah, dan mengembalikan barang temuan kepada pemiliknya. Berbuat baik tidak harus menunggu kaya; tersenyum ramah, menyapa santun, dan menolong teman adalah sedekah / amal kebajikan yang mulia!',
      descEn: 'Honesty is the pearl of the heart: speaking the truth, owning up to mistakes, and returning lost items. Kindness requires no wealth; a warm smile, gentle words, and helping hands are priceless treasures of virtue!',
      checklist: [
        'Misi 1: Katakan hal yang sebenarnya dengan jujur kepada orang tua tanpa rasa takut.',
        'Misi 2: Jika menemukan pensil atau penghapus jatuh di kelas, serahkan kepada guru agar kembali ke pemiliknya.',
        'Misi 3: Sisihkan sedikit uang sakumu ke dalam kotak amal atau celengan kebaikan.'
      ],
      checklistEn: [
        'Mission 1: Speak the transparent truth to your parents courageously.',
        'Mission 2: Hand over any lost pencil found on the floor to the teacher for safekeeping.',
        'Mission 3: Set aside a small portion of allowance into a charity coin box.'
      ],
      activities: [
        { q: 'Ketika kamu tidak sengaja menjatuhkan penggaris teman hingga patah, sikap jujur yang benar adalah...', options: ['Meminta maaf dan berterus terang dengan jujur', 'Menuduh teman lain yang merusaknya', 'Menyembunyikannya di bawah lemari', 'Pura-pura tidak tahu dan tertawa'], answer: 'Meminta maaf dan berterus terang dengan jujur', hint: 'Anak pemberani berani berkata jujur dan bertanggung jawab.' },
        { q: 'Perbuatan suka menolong orang lain tanpa mengharapkan pamrih pujian disebut perbuatan...', options: ['Ikhlas dan beramal kebajikan', 'Sombong', 'Pamer di media sosial', 'Terpaksa'], answer: 'Ikhlas dan beramal kebajikan', hint: 'Ikhlas artinya berbuat baik tulus karena cinta kepada Tuhan dan sesama.' }
      ],
      activitiesEn: [
        { q: 'If you accidentally drop a friend\'s ruler and break it, what is the honest integrity reaction?', options: ['Apologize sincerely and admit the mishap truthfully', 'Blame someone else falsely', 'Hide the pieces under the carpet', 'Pretend nothing happened'], answer: 'Apologize sincerely and admit the mishap truthfully', hint: 'Integrity means taking honest responsibility.' }
      ]
    }
,
    {
      id: 'ag-kebersihan-ibadah',
      title: 'Menjaga Kesucian Diri & Kebersihan Tempat Ibadah',
      titleEn: 'Purity of Self & Cleanliness of Worship Sanctuaries',
      desc: 'Kebersihan adalah bagian dari keimanan. Sebelum menghadap Tuhan Yang Maha Esa untuk beribadah, kita membersihkan diri: berwudu / cuci tangan dan kaki, mengenakan pakaian yang rapi dan suci, serta menjaga keheningan tempat ibadah (Masjid, Pura, Gereja, Vihara, Klenteng) agar semua orang beribadah dengan damai.',
      descEn: 'Cleanliness is an essential facet of devotion. Before offering heartfelt prayers, we cleanse our body, put on neat attire, and lovingly maintain the tranquility of worship sanctuaries so everyone experiences divine peace.',
      checklist: [
        "Misi 1: Cuci tangan, wajah, dan kaki hingga bersih sebelum memulai ibadah dan doa bersama.",
        "Misi 2: Susun sandal dan sepatumu secara rapi di rak pintu masuk tempat ibadah.",
        "Misi 3: Tidak berbicara keras atau berlarian saat berada di dalam rumah ibadah yang hening."
],
      checklistEn: [
        "Mission 1: Cleanse hands, face, and feet with fresh water before commencing sacred prayer.",
        "Mission 2: Neatly align your sandals or shoes on the designated sanctuary entryway rack.",
        "Mission 3: Maintain respectful silence and composure inside places of worship."
],
      activities: [
        {
                "q": "Sebelum masuk ke tempat ibadah untuk bersembahyang, pakaian yang kita kenakan harus...",
                "options": [
                        "Bersih, rapi, dan sopan",
                        "Kotor penuh lumpur",
                        "Pakaian tidur robek",
                        "Pakaian basah kuyup"
                ],
                "answer": "Bersih, rapi, dan sopan",
                "hint": "Sebagai wujud penghormatan dan rasa syukur kepada Tuhan."
        },
        {
                "q": "Sikap kita ketika berada di dalam rumah ibadah adalah...",
                "options": [
                        "Khusyuk, tenang, dan tertib",
                        "Bermain bola di dalam ruangan",
                        "Berteriak-teriak memanggil teman",
                        "Makan permen karet"
                ],
                "answer": "Khusyuk, tenang, dan tertib",
                "hint": "Tempat ibadah digunakan untuk berdoa dengan penuh ketulusan."
        },
        {
                "q": "Menjaga kebersihan tempat ibadah adalah kewajiban dari...",
                "options": [
                        "Seluruh jemaah / umat yang beribadah",
                        "Hanya pengurus saja",
                        "Tidak ada yang wajib",
                        "Orang lain"
                ],
                "answer": "Seluruh jemaah / umat yang beribadah",
                "hint": "Rumah ibadah adalah milik bersama untuk mendekatkan diri kepada Tuhan."
        }
],
      activitiesEn: [
        {
                "q": "Attire worn during sacred moments of prayer should always be...",
                "options": [
                        "Clean, neat, and reverent",
                        "Muddy and torn",
                        "Sleepwear",
                        "Dirty"
                ],
                "answer": "Clean, neat, and reverent",
                "hint": "Expressing heartfelt respect before God."
        }
]
    },
    {
      id: 'ag-amanah-janji',
      title: 'Menepati Janji & Menjaga Amanah (Dapat Dipercaya)',
      titleEn: 'Keeping Promises & Honoring Trusts (Being Faithful)',
      desc: 'Anak yang bertakwa dan berakhlak mulia selalu menepati janji yang diucapkan. Bila meminjam barang teman, barang itu dijaga baik-baik dan dikembalikan tepat waktu. Kejujuran dan sifat dapat dipercaya (amanah) membuat kita disayangi oleh Tuhan, disukai guru, dan memiliki banyak sahabat setia!',
      descEn: 'Children with pure upright hearts treasure their promises. When borrowing a friend’s pencil or book, they handle it gently and return it promptly. Trustworthiness earns divine blessings, teacher appreciation, and enduring lifelong friendships!',
      checklist: [
        "Misi 1: Kembalikan buku atau mainan yang kamu pinjam dari teman sambil mengucapkan terima kasih.",
        "Misi 2: Tepati janji membantumu merapikan mainan sendiri setelah selesai bermain di rumah.",
        "Misi 3: Jangan membuka rahasia atau pesan titipan yang diamanahkan orang tua kepadamu."
],
      checklistEn: [
        "Mission 1: Return borrowed books or pencils to your classmates with a cheerful smile.",
        "Mission 2: Fulfill your commitment to tidy up playthings after playtime at home.",
        "Mission 3: Honor the trusted tasks and words entrusted to you by your elders."
],
      activities: [
        {
                "q": "Bila kita berjanji kepada teman untuk belajar bersama jam 4 sore, maka kita harus...",
                "options": [
                        "Datang tepat waktu sesuai janji",
                        "Lupa dan pergi tidur",
                        "Sengaja membatalkan tanpa kabar",
                        "Marah-marah"
                ],
                "answer": "Datang tepat waktu sesuai janji",
                "hint": "Menepati janji adalah ciri anak hebat yang dapat dipercaya."
        },
        {
                "q": "Ketika meminjam penghapus milik teman, sikap yang benar adalah...",
                "options": [
                        "Menggunakan dengan hati-hati lalu mengembalikan",
                        "Menyembunyikan di tas kita",
                        "Merobeknya menjadi dua",
                        "Membuang ke kolam"
                ],
                "answer": "Menggunakan dengan hati-hati lalu mengembalikan",
                "hint": "Barang titipan atau pinjaman harus dijaga dengan penuh tanggung jawab."
        },
        {
                "q": "Sikap orang yang jujur dan dapat dipercaya disebut...",
                "options": [
                        "Amanah",
                        "Pembohong",
                        "Penakut",
                        "Kasar"
                ],
                "answer": "Amanah",
                "hint": "Sifat terpuji yang dicintai Tuhan dan sesama manusia."
        }
],
      activitiesEn: [
        {
                "q": "When we promise a friend to study together at 4 PM, we should...",
                "options": [
                        "Arrive punctually as committed",
                        "Sleep and forget deliberately",
                        "Ghost them without notice",
                        "Complain loudly"
                ],
                "answer": "Arrive punctually as committed",
                "hint": "Honoring commitments reflects personal integrity."
        }
]
    },
    {
      "id": "agama-sikap-berdoa",
    "title": "Tata Tertib Berdoa & Sikap Khidmat Beribadah",
    "titleEn": "Reverence in Prayer & Respectful Worship Manner",
    "desc": "Berdoa adalah saat kita berkomunikasi secara tulus dengan Tuhan Yang Maha Esa. Saat berdoa, kita harus menunjukkan rasa hormat: menenangkan hati, duduk dengan sikap tegak atau bersimpuh rapi, tidak bercanda atau bermain-main, dan memanjatkan doa dengan tulus!",
    "descEn": "Prayer is an intimate communion with the Almighty Creator. Reverence requires calming our minds, maintaining respectful posture, ceasing playful chattering, and petitioning heartfelt gratitude humbly!",
    "checklist": [
      "Misi 1: Berdoa dengan khidmat sebelum mulai belajar di sekolah dan sebelum makan.",
      "Misi 2: Menjaga ketenangan dan tidak mengganggu saudara/teman yang sedang beribadah.",
      "Misi 3: Mengucapkan syukur atas berkah kesehatan dan keluarga bahagia setiap bangun pagi."
    ],
    "checklistEn": [
      "Mission 1: Pray attentively before commencing school lessons and prior to meals.",
      "Mission 2: Maintain peaceful silence without disturbing family/friends during worship.",
      "Mission 3: Offer daily gratitude for health and family blessings each morning."
    ],
    "activities": [
      {
        "q": "Sikap tubuh yang benar dan terpuji saat sedang berdoa kepada Tuhan adalah...",
        "options": [
          "Khidmat, tenang, menunduk sopan, dan tidak bercanda",
          "Sambil berlari ke sana kemari",
          "Sambil mengobrol dengan teman",
          "Bermain lempar kertas"
        ],
        "answer": "Khidmat, tenang, menunduk sopan, dan tidak bercanda",
        "hint": "Menghormati keagungan Tuhan Yang Maha Esa dengan segenap hati."
      },
      {
        "q": "Sebelum kita menyantap makanan yang disediakan Ibu, kewajiban kita adalah...",
        "options": [
          "Mencuci tangan bersih dan berdoa bersyukur",
          "Langsung makan terburu-buru",
          "Mencela makanannya",
          "Membongkar piring"
        ],
        "answer": "Mencuci tangan bersih dan berdoa bersyukur",
        "hint": "Mensyukuri rezeki berkah makanan bergizi yang disiapkan orang tua."
      }
    ],
    "activitiesEn": [
      {
        "q": "Proper, respectful posture during prayer to the Creator:",
        "options": [
          "Reverent, peaceful, bowed respectfully without chattering",
          "Running around loudly",
          "Gossiping with friends",
          "Throwing toys"
        ],
        "answer": "Reverent, peaceful, bowed respectfully without chattering",
        "hint": "Honoring God with a humble, grateful heart."
      }
    ]
  },
  {
    "id": "agama-tolong-menolong",
    "title": "Menolong Sesama Tanpa Pamrih & Menyayangi Teman",
    "titleEn": "Helping Others Selflessly & Caring for Friends",
    "desc": "Tuhan mengajarkan kita untuk saling tolong-menolong dalam kebaikan. Ketika melihat teman yang terjatuh di halaman sekolah, teman yang lupa membawa pensil, atau adik yang kesulitan mengikat tali sepatu, bantulah dengan senyuman tulus tanpa meminta imbalan!",
    "descEn": "All spiritual teachings urge selfless charity and kindness. When a classmate trips, lacks a pencil, or a sibling struggles with shoelaces, reach out warmly without asking anything in return!",
    "checklist": [
      "Misi 1: Membantu membangkitkan teman yang tersandung di lapangan dan menghiburnya.",
      "Misi 2: Meminjamkan alat tulis kepada kawan sebangku yang membutuhkan dengan ikhlas.",
      "Misi 3: Membantu orang tua merapikan mainan atau menyapu lantai rumah secara sukarela."
    ],
    "checklistEn": [
      "Mission 1: Help up a friend who tripped in the playground and offer comforting words.",
      "Mission 2: Share and lend pencils kindly to a seatmate in need.",
      "Mission 3: Help parents gather toys or sweep room floors enthusiastically at home."
    ],
    "activities": [
      {
        "q": "Jika melihat teman terjatuh di halaman sekolah hingga lututnya tergores, kita sebaiknya...",
        "options": [
          "Segera menolongnya berdiri dan mengantarnya ke ruang UKS",
          "Menertawakannya beramai-ramai",
          "Membiarkannya menangis sendirian",
          "Memotretnya"
        ],
        "answer": "Segera menolongnya berdiri dan mengantarnya ke ruang UKS",
        "hint": "Tolong-menolong adalah budi pekerti mulia yang diajarkan semua agama."
      },
      {
        "q": "Membantu orang lain dengan \"ikhlas tanpa pamrih\" artinya...",
        "options": [
          "Membantu tulus dari hati tanpa meminta uang atau pujian",
          "Membantu hanya jika dibayar",
          "Membantu sambil marah-marah",
          "Membantu hanya di depan kamera"
        ],
        "answer": "Membantu tulus dari hati tanpa meminta uang atau pujian",
        "hint": "Kebaikan sejati bersumber dari cinta kasih murni dalam sanubari."
      }
    ],
    "activitiesEn": [
      {
        "q": "When a friend trips in the yard, what is the virtuous action?",
        "options": [
          "Help them stand up gently and guide them to medical room",
          "Laugh at them loudly",
          "Walk away ignoring",
          "Tease them"
        ],
        "answer": "Help them stand up gently and guide them to medical room",
        "hint": "Caring for companions reflects moral beauty."
      }
    ]
  }
  ]
};
