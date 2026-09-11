// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Geography Master Dataset & Bali Module
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 10 September 2026, 09:45:00
// ================================================================

export const GEO_DATA = {
  id: 'geografi',
  title: 'Geografi — Jelajah Bumi & Nusantara',
  titleEn: 'Geography — Discover Earth & Indonesia',
  subtitle: 'Yuk keliling Bumi yang bulat, kenali 38 provinsi Indonesia, cari kota-kota seru, dan jelajahi pulau dewata Bali! 🌍',
  subtitleEn: 'Explore the spherical Earth, learn 38 Indonesian provinces, find famous cities, and explore Bali! 🌍',

  // Metadata Sumber Data Resmi (Sesuai Syarat Mandatori)
  metadata: {
    source: 'Kementerian Dalam Negeri Republik Indonesia & Badan Pusat Statistik (BPS) 2026',
    reviewedAt: '2026-09-10',
    curator: 'Development · Anabhi Dev',
    scope: 'Daftar Negara-Negara di Dunia (6 Benua Lengkap), 38 Provinsi Resmi Indonesia, 38 Ibu Kota, Kota Terkenal Non-Ibu Kota Terpilih, dan 8 Kabupaten + 1 Kota Provinsi Bali.'
  },

  // 3 Slot Video YouTube Geografi (Otomatis tersembunyi bila url kosong)
  videoSlots: [
    {
      id: 'geo-yt-1',
      title: '1. Mengenal Bumi & Globe yang Berputar',
      description: 'Kenapa Bumi tampak bulat seperti bola biru dari luar angkasa? Yuk tonton penjelasannya!',
      url: '',
      ageFit: 'Kelas 1 SD'
    },
    {
      id: 'geo-yt-2',
      title: '2. Keliling Dunia & Benua Sahabat',
      description: 'Mengenal benua Asia, Afrika, Eropa, Amerika, dan Australia dengan seru.',
      url: '',
      ageFit: 'Kelas 1 SD'
    },
    {
      id: 'geo-yt-3',
      title: '3. Indonesia yang Luas: 38 Provinsi Indah',
      description: 'Jelajah nusantara dari Sabang sampai Merauke, dari Miangas hingga Pulau Rote.',
      url: '',
      ageFit: 'Kelas 1 SD'
    }
  ],

  // 1. Pengenalan Bumi & Fakta Bentuk Bola
  earthIntro: {
    heading: 'Bumi Kita: Rumah Berbentuk Bola yang Indah',
    headingEn: 'Our Earth: A Beautiful Spherical Home',
    funFactBadge: '🌍 Fakta Keren Antariksa',
    funFactBadgeEn: '🌍 Space Wonder Fact',
    explanation: 'Tahukah kamu? Bumi tempat kita tinggal berbentuk hampir bulat sempurna seperti bola! Para astronaut di luar angkasa melihat Bumi seperti kelereng biru berkilau yang berputar anggun. Walaupun di kutubnya sedikit pepat (istilah ilmiahnya geoid / oblate spheroid), dari luar Bumi tampak bulat bola bundar!',
    explanationEn: 'Did you know? The Earth we live on is almost a perfect sphere! Astronauts in outer space see Earth as a shining blue marble gracefully spinning. Although slightly flattened at the poles (scientifically an oblate spheroid), from space Earth appears beautifully spherical and round!',
    highlights: [
      { icon: '🌐', title: 'Hampir Bulat Seperti Bola', titleEn: 'Spherical Like a Globe', desc: 'Bukan datar seperti piring, melainkan bola 3D raksasa yang berputar siang dan malam.', descEn: 'Not flat like a disc, but a massive 3D sphere spinning day and night.' },
      { icon: '🌊', title: '70% Tertutup Air', titleEn: '70% Covered by Water', desc: 'Lautan luas membuat Bumi berwarna biru cerah dipandang dari antariksa.', descEn: 'Vast oceans make Earth look brilliantly blue from outer space.' },
      { icon: '🔄', title: 'Bumi Terus Berputar (Rotasi)', titleEn: 'Earth Continuously Rotates', desc: 'Perputaran Bumi pada porosnya membuat ada waktu pagi ceria dan malam berbintang.', descEn: 'Rotation on its axis brings bright sunny mornings and starry nights.' },
      { icon: '🇮🇩', title: 'Indonesia di Garis Khatulistiwa', titleEn: 'Indonesia on the Equator', desc: 'Negara kita berada tepat di tengah Bumi, jadi hangat dan mendapat sinar matahari sepanjang tahun!', descEn: 'Our archipelago sits right on the Equator, enjoying warm sunshine all year round!' }
    ]
  },

  // 1.5. Daftar Negara-Negara di Dunia (6 Benua Lengkap)
  countries: [
    {
        "id": "indonesia",
        "name": "Indonesia",
        "nameEn": "Indonesia",
        "capital": "Jakarta / IKN Nusantara",
        "continent": "Asia",
        "flag": "🇮🇩",
        "currency": "Rupiah (IDR)",
        "landmark": "Monas, Candi Borobudur, & Danau Toba",
        "language": "Bahasa Indonesia",
        "funFact": "Negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau eksotis.",
        "coords": [
            106.8,
            -6.2
        ]
    },
    {
        "id": "malaysia",
        "name": "Malaysia",
        "nameEn": "Malaysia",
        "capital": "Kuala Lumpur",
        "continent": "Asia",
        "flag": "🇲🇾",
        "currency": "Ringgit (MYR)",
        "landmark": "Menara Kembar Petronas & Batu Caves",
        "language": "Bahasa Melayu",
        "funFact": "Punya menara kembar tertinggi di dunia yang dihubungkan jembatan udara megah.",
        "coords": [
            101.7,
            3.1
        ]
    },
    {
        "id": "singapura",
        "name": "Singapura",
        "nameEn": "Singapore",
        "capital": "Singapura",
        "continent": "Asia",
        "flag": "🇸🇬",
        "currency": "Dolar Singapura (SGD)",
        "landmark": "Patung Merlion & Gardens by the Bay",
        "language": "Inggris, Melayu, Mandarin, Tamil",
        "funFact": "Negara pulau terbersih dan paling hijau dengan pohon-pohon buatan raksasa bercahaya.",
        "coords": [
            103.8,
            1.35
        ]
    },
    {
        "id": "brunei",
        "name": "Brunei Darussalam",
        "nameEn": "Brunei",
        "capital": "Bandar Seri Begawan",
        "continent": "Asia",
        "flag": "🇧🇳",
        "currency": "Dolar Brunei (BND)",
        "landmark": "Masjid Sultan Omar Ali Saifuddien",
        "language": "Bahasa Melayu",
        "funFact": "Kubah masjid megahnya terbuat dari emas murni 24 karat yang berkilau indah.",
        "coords": [
            114.9,
            4.9
        ]
    },
    {
        "id": "thailand",
        "name": "Thailand",
        "nameEn": "Thailand",
        "capital": "Bangkok",
        "continent": "Asia",
        "flag": "🇹🇭",
        "currency": "Baht (THB)",
        "landmark": "Grand Palace & Kuil Fajar Wat Arun",
        "language": "Bahasa Thai",
        "funFact": "Dijuluki Negeri Gajah Putih dan Negeri Senyuman (Land of Smiles).",
        "coords": [
            100.5,
            13.75
        ]
    },
    {
        "id": "filipina",
        "name": "Filipina",
        "nameEn": "Philippines",
        "capital": "Manila",
        "continent": "Asia",
        "flag": "🇵🇭",
        "currency": "Peso Filipina (PHP)",
        "landmark": "Bukit Cokelat Bohol & Kota Bersejarah Intramuros",
        "language": "Filipino / Tagalog & Inggris",
        "funFact": "Punya bukit-bukit kapur unik yang berubah warna kecokelatan saat musim kemarau.",
        "coords": [
            121,
            14.6
        ]
    },
    {
        "id": "vietnam",
        "name": "Vietnam",
        "nameEn": "Vietnam",
        "capital": "Hanoi",
        "continent": "Asia",
        "flag": "🇻🇳",
        "currency": "Dong (VND)",
        "landmark": "Teluk Ha Long & Jembatan Emas Da Nang",
        "language": "Bahasa Vietnam",
        "funFact": "Teluk Ha Long punya ribuan pulau batu karang yang menjulang tinggi di atas zamrud laut.",
        "coords": [
            105.8,
            21
        ]
    },
    {
        "id": "jepang",
        "name": "Jepang",
        "nameEn": "Japan",
        "capital": "Tokyo",
        "continent": "Asia",
        "flag": "🇯🇵",
        "currency": "Yen (JPY)",
        "landmark": "Gunung Fuji & Menara Tokyo",
        "language": "Bahasa Jepang",
        "funFact": "Negara matahari terbit dengan kereta cepat Shinkansen yang super tepat waktu.",
        "coords": [
            139.7,
            35.7
        ]
    },
    {
        "id": "korea-selatan",
        "name": "Korea Selatan",
        "nameEn": "South Korea",
        "capital": "Seoul",
        "continent": "Asia",
        "flag": "🇰🇷",
        "currency": "Won (KRW)",
        "landmark": "Istana Gyeongbokgung & Menara N Seoul",
        "language": "Bahasa Korea (Hangeul)",
        "funFact": "Negara ginseng asal musik K-Pop dan serial animasi ramah anak seperti Pororo & Tayo.",
        "coords": [
            126.98,
            37.56
        ]
    },
    {
        "id": "tiongkok",
        "name": "Tiongkok",
        "nameEn": "China",
        "capital": "Beijing",
        "continent": "Asia",
        "flag": "🇨🇳",
        "currency": "Yuan / Renminbi (CNY)",
        "landmark": "Tembok Besar Tiongkok & Kota Terlarang",
        "language": "Mandarin",
        "funFact": "Tembok besarnya membentang ribuan kilometer melintasi pegunungan gagah.",
        "coords": [
            116.4,
            39.9
        ]
    },
    {
        "id": "india",
        "name": "India",
        "nameEn": "India",
        "capital": "New Delhi",
        "continent": "Asia",
        "flag": "🇮🇳",
        "currency": "Rupee India (INR)",
        "landmark": "Taj Mahal & Gerbang India (India Gate)",
        "language": "Hindi & Inggris",
        "funFact": "Taj Mahal dari marmer putih dibangun sebagai lambang cinta yang megah.",
        "coords": [
            77.2,
            28.6
        ]
    },
    {
        "id": "arab-saudi",
        "name": "Arab Saudi",
        "nameEn": "Saudi Arabia",
        "capital": "Riyadh",
        "continent": "Asia",
        "flag": "🇸🇦",
        "currency": "Riyal (SAR)",
        "landmark": "Ka'bah di Makkah & Masjid Nabawi Madinah",
        "language": "Bahasa Arab",
        "funFact": "Tempat dua kota suci umat Islam yang dikunjungi jutaan orang dari seluruh penjuru dunia.",
        "coords": [
            46.7,
            24.7
        ]
    },
    {
        "id": "uea",
        "name": "Uni Emirat Arab",
        "nameEn": "United Arab Emirates",
        "capital": "Abu Dhabi",
        "continent": "Asia",
        "flag": "🇦🇪",
        "currency": "Dirham (AED)",
        "landmark": "Burj Khalifa Dubai & Masjid Agung Sheikh Zayed",
        "language": "Bahasa Arab",
        "funFact": "Punya Burj Khalifa, gedung tertinggi di dunia yang menembus awan setinggi 828 meter!",
        "coords": [
            54.4,
            24.5
        ]
    },
    {
        "id": "turki",
        "name": "Turki",
        "nameEn": "Turkey",
        "capital": "Ankara",
        "continent": "Asia",
        "flag": "🇹🇷",
        "currency": "Lira Turki (TRY)",
        "landmark": "Hagia Sophia & Balon Udara Cappadocia",
        "language": "Bahasa Turki",
        "funFact": "Negara unik yang berada di dua benua sekaligus: sebagian di Asia dan sebagian di Eropa!",
        "coords": [
            32.85,
            39.93
        ]
    },
    {
        "id": "palestina",
        "name": "Palestina",
        "nameEn": "Palestine",
        "capital": "Yerusalem Timur",
        "continent": "Asia",
        "flag": "🇵🇸",
        "currency": "Shekel & Dinar",
        "landmark": "Masjid Al-Aqsa & Kubah As-Sakhrah",
        "language": "Bahasa Arab",
        "funFact": "Tanah bersejarah para nabi dengan pohon zaitun tertua di dunia yang berbuah lebat.",
        "coords": [
            35.2,
            31.8
        ]
    },
    {
        "id": "qatar",
        "name": "Qatar",
        "nameEn": "Qatar",
        "capital": "Doha",
        "continent": "Asia",
        "flag": "🇶🇦",
        "currency": "Riyal Qatar (QAR)",
        "landmark": "Museum Seni Islam & Pulau The Pearl",
        "language": "Bahasa Arab",
        "funFact": "Negara modern yang pernah sukses menjadi tuan rumah Piala Dunia sepak bola.",
        "coords": [
            51.5,
            25.3
        ]
    },
    {
        "id": "iran",
        "name": "Iran",
        "nameEn": "Iran",
        "capital": "Teheran",
        "continent": "Asia",
        "flag": "🇮🇷",
        "currency": "Rial Iran (IRR)",
        "landmark": "Menara Azadi & Reruntuhan Kuno Persepolis",
        "language": "Bahasa Persia (Farsi)",
        "funFact": "Pusat peradaban Persia kuno yang terkenal dengan karpet anyaman tangan bernilai tinggi.",
        "coords": [
            51.4,
            35.7
        ]
    },
    {
        "id": "pakistan",
        "name": "Pakistan",
        "nameEn": "Pakistan",
        "capital": "Islamabad",
        "continent": "Asia",
        "flag": "🇵🇰",
        "currency": "Rupee Pakistan (PKR)",
        "landmark": "Masjid Faisal & Puncak Gunung K2",
        "language": "Urdu & Inggris",
        "funFact": "Punya puncak gunung K2, gunung tertinggi kedua di dunia yang diselimuti salju abadi.",
        "coords": [
            73,
            33.7
        ]
    },
    {
        "id": "timor-leste",
        "name": "Timor Leste",
        "nameEn": "Timor-Leste",
        "capital": "Dili",
        "continent": "Asia",
        "flag": "🇹🇱",
        "currency": "Dolar AS (USD)",
        "landmark": "Patung Cristo Rei Dili & Pantai Areia Branca",
        "language": "Tetum & Portugis",
        "funFact": "Tetangga timur pulau Timor dengan terumbu karang pulau Atauro yang sangat kaya hayati.",
        "coords": [
            125.6,
            -8.55
        ]
    },
    {
        "id": "kamboja",
        "name": "Kamboja",
        "nameEn": "Cambodia",
        "capital": "Phnom Penh",
        "continent": "Asia",
        "flag": "🇰🇭",
        "currency": "Riel (KHR)",
        "landmark": "Kompleks Candi Angkor Wat",
        "language": "Bahasa Khmer",
        "funFact": "Angkor Wat adalah monumen keagamaan terbesar di dunia yang dibangun ribuan tahun lalu.",
        "coords": [
            104.9,
            11.55
        ]
    },
    {
        "id": "inggris",
        "name": "Inggris (Britania Raya)",
        "nameEn": "United Kingdom",
        "capital": "London",
        "continent": "Eropa",
        "flag": "🇬🇧",
        "currency": "Poundsterling (GBP)",
        "landmark": "Menara Jam Big Ben, London Eye, & Tower Bridge",
        "language": "Bahasa Inggris",
        "funFact": "Asal mula bahasa Inggris internasional dan bus tingkat merah ikonik yang lucu.",
        "coords": [
            -0.12,
            51.5
        ]
    },
    {
        "id": "prancis",
        "name": "Prancis",
        "nameEn": "France",
        "capital": "Paris",
        "continent": "Eropa",
        "flag": "🇫🇷",
        "currency": "Euro (EUR)",
        "landmark": "Menara Eiffel & Museum Seni Louvre",
        "language": "Bahasa Prancis",
        "funFact": "Menara Eiffel terbuat dari besi tempa dan bisa bertambah tinggi 15 cm saat musim panas!",
        "coords": [
            2.35,
            48.85
        ]
    },
    {
        "id": "jerman",
        "name": "Jerman",
        "nameEn": "Germany",
        "capital": "Berlin",
        "continent": "Eropa",
        "flag": "🇩🇪",
        "currency": "Euro (EUR)",
        "landmark": "Gerbang Brandenburg & Kastil Neuschwanstein",
        "language": "Bahasa Jerman",
        "funFact": "Kastil Neuschwanstein di Jerman menjadi inspirasi kastil dongeng Cinderella di Disney!",
        "coords": [
            13.4,
            52.5
        ]
    },
    {
        "id": "italia",
        "name": "Italia",
        "nameEn": "Italy",
        "capital": "Roma",
        "continent": "Eropa",
        "flag": "🇮🇹",
        "currency": "Euro (EUR)",
        "landmark": "Colosseum Roma & Menara Miring Pisa",
        "language": "Bahasa Italia",
        "funFact": "Negara asal pizza dan pasta lezat! Menara Pisa miring karena tanahnya lunak saat dibangun.",
        "coords": [
            12.5,
            41.9
        ]
    },
    {
        "id": "belanda",
        "name": "Belanda",
        "nameEn": "Netherlands",
        "capital": "Amsterdam",
        "continent": "Eropa",
        "flag": "🇳🇱",
        "currency": "Euro (EUR)",
        "landmark": "Kincir Angin Zaanse Schans & Kebun Tulip Keukenhof",
        "language": "Bahasa Belanda",
        "funFact": "Negara kincir angin dan bunga tulip yang memiliki lebih banyak sepeda daripada penduduknya!",
        "coords": [
            4.9,
            52.37
        ]
    },
    {
        "id": "spanyol",
        "name": "Spanyol",
        "nameEn": "Spain",
        "capital": "Madrid",
        "continent": "Eropa",
        "flag": "🇪🇸",
        "currency": "Euro (EUR)",
        "landmark": "Katedral Sagrada Familia Barcelona & Istana Alhambra",
        "language": "Bahasa Spanyol",
        "funFact": "Katedral megah Sagrada Familia karya arsitek Gaudi sudah dibangun lebih dari 140 tahun.",
        "coords": [
            -3.7,
            40.4
        ]
    },
    {
        "id": "swiss",
        "name": "Swiss",
        "nameEn": "Switzerland",
        "capital": "Bern",
        "continent": "Eropa",
        "flag": "🇨🇭",
        "currency": "Franc Swiss (CHF)",
        "landmark": "Pegunungan Alpen & Puncak Matterhorn",
        "language": "Jerman, Prancis, Italia, Romansh",
        "funFact": "Terkenal dengan cokelat lezat, jam tangan presisi, dan desa pegunungan yang sangat bersih.",
        "coords": [
            7.45,
            46.95
        ]
    },
    {
        "id": "rusia",
        "name": "Rusia",
        "nameEn": "Russia",
        "capital": "Moskow",
        "continent": "Eropa",
        "flag": "🇷🇺",
        "currency": "Rubel Rusia (RUB)",
        "landmark": "Lapangan Merah & Katedral Santo Basil",
        "language": "Bahasa Rusia",
        "funFact": "Negara dengan wilayah terluas di dunia, mencakup 11 zona waktu yang berbeda!",
        "coords": [
            37.6,
            55.75
        ]
    },
    {
        "id": "norwegia",
        "name": "Norwegia",
        "nameEn": "Norway",
        "capital": "Oslo",
        "continent": "Eropa",
        "flag": "🇳🇴",
        "currency": "Krone Norwegia (NOK)",
        "landmark": "Fjord Geiranger & Fenomena Cahaya Aurora Borealis",
        "language": "Bahasa Norwegia",
        "funFact": "Di bagian utaranya matahari tidak pernah terbenam di musim panas (Midnight Sun)!",
        "coords": [
            10.75,
            59.9
        ]
    },
    {
        "id": "yunani",
        "name": "Yunani",
        "nameEn": "Greece",
        "capital": "Athena",
        "continent": "Eropa",
        "flag": "🇬🇷",
        "currency": "Euro (EUR)",
        "landmark": "Kuil Parthenon di Bukit Akropolis & Pulau Santorini",
        "language": "Bahasa Yunani",
        "funFact": "Tempat lahirnya pesta olahraga Olimpiade dunia pada ribuan tahun yang lalu.",
        "coords": [
            23.7,
            38
        ]
    },
    {
        "id": "portugal",
        "name": "Portugal",
        "nameEn": "Portugal",
        "capital": "Lisabon",
        "continent": "Eropa",
        "flag": "🇵🇹",
        "currency": "Euro (EUR)",
        "landmark": "Menara Belém & Trem Kuning Nomor 28",
        "language": "Bahasa Portugis",
        "funFact": "Punya kue tart telur custard manis Pastel de Nata yang terkenal di seluruh dunia.",
        "coords": [
            -9.14,
            38.72
        ]
    },
    {
        "id": "vatikan",
        "name": "Vatikan",
        "nameEn": "Vatican City",
        "capital": "Kota Vatikan",
        "continent": "Eropa",
        "flag": "🇻🇦",
        "currency": "Euro (EUR)",
        "landmark": "Basilika Santo Petrus & Kapel Sistina",
        "language": "Latin & Italia",
        "funFact": "Negara berdaulat terkecil di dunia, seluruh wilayahnya berada di dalam kota Roma.",
        "coords": [
            12.45,
            41.9
        ]
    },
    {
        "id": "swedia",
        "name": "Swedia",
        "nameEn": "Sweden",
        "capital": "Stockholm",
        "continent": "Eropa",
        "flag": "🇸🇪",
        "currency": "Krona Swedia (SEK)",
        "landmark": "Museum Kapal Laut Kuno Vasa & Kota Tua Gamla Stan",
        "language": "Bahasa Swedia",
        "funFact": "Tempat pemberian Penghargaan Nobel bergengsi bagi tokoh ilmuwan dan perdamaian dunia.",
        "coords": [
            18.06,
            59.33
        ]
    },
    {
        "id": "austria",
        "name": "Austria",
        "nameEn": "Austria",
        "capital": "Wina",
        "continent": "Eropa",
        "flag": "🇦🇹",
        "currency": "Euro (EUR)",
        "landmark": "Istana Schönbrunn & Gedung Opera Wina",
        "language": "Bahasa Jerman",
        "funFact": "Kota musik klasik dunia, rumah bagi komponis Mozart dan Beethoven berkarya.",
        "coords": [
            16.37,
            48.2
        ]
    },
    {
        "id": "belgia",
        "name": "Belgia",
        "nameEn": "Belgium",
        "capital": "Brussel",
        "continent": "Eropa",
        "flag": "🇧🇪",
        "currency": "Euro (EUR)",
        "landmark": "Monumen Atomium & Alun-alun Grand Place",
        "language": "Belanda, Prancis, Jerman",
        "funFact": "Terkenal dengan wafel renyah manis dan cokelat praline berbentuk kerang laut.",
        "coords": [
            4.35,
            50.85
        ]
    },
    {
        "id": "mesir",
        "name": "Mesir",
        "nameEn": "Egypt",
        "capital": "Kairo",
        "continent": "Afrika",
        "flag": "🇪🇬",
        "currency": "Pound Mesir (EGP)",
        "landmark": "Piramida Agung Giza & Patung Sphinx Raksasa",
        "language": "Bahasa Arab",
        "funFact": "Piramida Giza dibangun batu demi batu ribuan tahun lalu dan menjadi keajaiban dunia!",
        "coords": [
            31.23,
            30.04
        ]
    },
    {
        "id": "afrika-selatan",
        "name": "Afrika Selatan",
        "nameEn": "South Africa",
        "capital": "Pretoria / Cape Town",
        "continent": "Afrika",
        "flag": "🇿🇦",
        "currency": "Rand (ZAR)",
        "landmark": "Gunung Meja (Table Mountain) & Safari Kruger",
        "language": "11 Bahasa Resmi (Zulu, Xhosa, Afrikaans, dll)",
        "funFact": "Punya pantai Boulders tempat ribuan penguin liar berenang dan bermain di pantai.",
        "coords": [
            28.2,
            -25.75
        ]
    },
    {
        "id": "maroko",
        "name": "Maroko",
        "nameEn": "Morocco",
        "capital": "Rabat",
        "continent": "Afrika",
        "flag": "🇲🇦",
        "currency": "Dirham Maroko (MAD)",
        "landmark": "Masjid Hassan II Casablanca & Kota Biru Chefchaouen",
        "language": "Arab & Berber",
        "funFact": "Kota Chefchaouen dicat serba biru langit yang memesona di kaki pegunungan Rif.",
        "coords": [
            -6.85,
            34.02
        ]
    },
    {
        "id": "kenya",
        "name": "Kenya",
        "nameEn": "Kenya",
        "capital": "Nairobi",
        "continent": "Afrika",
        "flag": "🇰🇪",
        "currency": "Shilling Kenya (KES)",
        "landmark": "Cagar Alam Liar Maasai Mara & Gunung Kenya",
        "language": "Swahili & Inggris",
        "funFact": "Tempat melihat migrasi besar jutaan zebra dan rusa wildebeest menyeberangi sungai.",
        "coords": [
            36.8,
            -1.29
        ]
    },
    {
        "id": "madagaskar",
        "name": "Madagaskar",
        "nameEn": "Madagascar",
        "capital": "Antananarivo",
        "continent": "Afrika",
        "flag": "🇲🇬",
        "currency": "Ariary (MGA)",
        "landmark": "Jalan Pohon Baobab Raksasa (Avenue of the Baobabs)",
        "language": "Malagasi & Prancis",
        "funFact": "Pulau unik rumah bagi hewan lemur bermata bulat yang tidak ditemukan di alam lain.",
        "coords": [
            47.5,
            -18.88
        ]
    },
    {
        "id": "nigeria",
        "name": "Nigeria",
        "nameEn": "Nigeria",
        "capital": "Abuja",
        "continent": "Afrika",
        "flag": "🇳🇬",
        "currency": "Naira (NGN)",
        "landmark": "Batu Raksasa Zuma Rock & Taman Nasional Yankari",
        "language": "Bahasa Inggris",
        "funFact": "Negara dengan jumlah penduduk terbanyak di benua Afrika dan industri film Nollywood.",
        "coords": [
            7.5,
            9.07
        ]
    },
    {
        "id": "ghana",
        "name": "Ghana",
        "nameEn": "Ghana",
        "capital": "Accra",
        "continent": "Afrika",
        "flag": "🇬🇭",
        "currency": "Cedi (GHS)",
        "landmark": "Kastil Pesisir Elmina & Danau Volta Buatan",
        "language": "Bahasa Inggris",
        "funFact": "Salah satu produsen biji kakao terbaik di dunia untuk membuat cokelat lezat.",
        "coords": [
            -0.19,
            5.6
        ]
    },
    {
        "id": "aljazair",
        "name": "Aljazair",
        "nameEn": "Algeria",
        "capital": "Aljir",
        "continent": "Afrika",
        "flag": "🇩🇿",
        "currency": "Dinar Aljazair (DZD)",
        "landmark": "Monumen Martir & Gurun Pasir Sahara Tassili",
        "language": "Bahasa Arab",
        "funFact": "Negara dengan wilayah terluas di seluruh benua Afrika, sebagian besar gurun Sahara.",
        "coords": [
            3.06,
            36.75
        ]
    },
    {
        "id": "ethiopia",
        "name": "Ethiopia",
        "nameEn": "Ethiopia",
        "capital": "Addis Ababa",
        "continent": "Afrika",
        "flag": "🇪🇹",
        "currency": "Birr Ethiopia (ETB)",
        "landmark": "Gereja Batu Utuh Lalibela & Pegunungan Simien",
        "language": "Bahasa Amharik",
        "funFact": "Tempat asal mula ditemukannya tanaman kopi pertama kali di dunia oleh penggembala kambing!",
        "coords": [
            38.75,
            9.03
        ]
    },
    {
        "id": "tanzania",
        "name": "Tanzania",
        "nameEn": "Tanzania",
        "capital": "Dodoma",
        "continent": "Afrika",
        "flag": "🇹🇿",
        "currency": "Shilling Tanzania (TZS)",
        "landmark": "Gunung Salju Kilimanjaro & Kawah Ngorongoro",
        "language": "Swahili & Inggris",
        "funFact": "Gunung Kilimanjaro adalah puncak tertinggi di benua Afrika yang memiliki salju di khatulistiwa!",
        "coords": [
            35.75,
            -6.17
        ]
    },
    {
        "id": "amerika-serikat",
        "name": "Amerika Serikat",
        "nameEn": "United States",
        "capital": "Washington, D.C.",
        "continent": "Amerika Utara",
        "flag": "🇺🇸",
        "currency": "Dolar AS (USD)",
        "landmark": "Patung Liberty New York & Ngarai Grand Canyon",
        "language": "Bahasa Inggris",
        "funFact": "Patung Liberty adalah hadiah persahabatan dari rakyat Prancis kepada Amerika Serikat.",
        "coords": [
            -77.04,
            38.9
        ]
    },
    {
        "id": "kanada",
        "name": "Kanada",
        "nameEn": "Canada",
        "capital": "Ottawa",
        "continent": "Amerika Utara",
        "flag": "🇨🇦",
        "currency": "Dolar Kanada (CAD)",
        "landmark": "Menara CN Toronto, Danau Louise, & Air Terjun Niagara",
        "language": "Inggris & Prancis",
        "funFact": "Negara dengan garis pantai terpanjang di dunia dan terkenal dengan sirup maple manis.",
        "coords": [
            -75.7,
            45.42
        ]
    },
    {
        "id": "meksiko",
        "name": "Meksiko",
        "nameEn": "Mexico",
        "capital": "Mexico City",
        "continent": "Amerika Utara",
        "flag": "🇲🇽",
        "currency": "Peso Meksiko (MXN)",
        "landmark": "Piramida Maya Chichen Itza & Katedral Metropolitan",
        "language": "Bahasa Spanyol",
        "funFact": "Asal mula makanan lezat taco dan tradisi festival ceria Hari Orang Mati (Dia de Muertos).",
        "coords": [
            -99.13,
            19.43
        ]
    },
    {
        "id": "kuba",
        "name": "Kuba",
        "nameEn": "Cuba",
        "capital": "Havana",
        "continent": "Amerika Utara",
        "flag": "🇨🇺",
        "currency": "Peso Kuba (CUP)",
        "landmark": "Kawasan Kota Tua Havana & Mobil Klasik Warna-Warni",
        "language": "Bahasa Spanyol",
        "funFact": "Di jalanan kotanya masih beroperasi ribuan mobil klasik antik era tahun 1950-an!",
        "coords": [
            -82.36,
            23.11
        ]
    },
    {
        "id": "kosta-rika",
        "name": "Kosta Rika",
        "nameEn": "Costa Rica",
        "capital": "San Jose",
        "continent": "Amerika Utara",
        "flag": "🇨🇷",
        "currency": "Colon (CRC)",
        "landmark": "Hutan Hujan Tropis Monteverde & Gunung Api Arenal",
        "language": "Bahasa Spanyol",
        "funFact": "Negara paling ramah lingkungan dengan keanekaragaman burung tukan dan kungkang (sloth).",
        "coords": [
            -84.08,
            9.93
        ]
    },
    {
        "id": "panama",
        "name": "Panama",
        "nameEn": "Panama",
        "capital": "Panama City",
        "continent": "Amerika Utara",
        "flag": "🇵🇦",
        "currency": "Balboa & USD",
        "landmark": "Terusan Kanal Panama",
        "language": "Bahasa Spanyol",
        "funFact": "Terusan Panama adalah kanal buatan manusia yang memotong benua dan menghubungkan dua samudra!",
        "coords": [
            -79.52,
            8.98
        ]
    },
    {
        "id": "brasil",
        "name": "Brasil",
        "nameEn": "Brazil",
        "capital": "Brasilia",
        "continent": "Amerika Selatan",
        "flag": "🇧🇷",
        "currency": "Real Brasil (BRL)",
        "landmark": "Patung Kristus Penebus Rio & Hutan Hujan Amazon",
        "language": "Bahasa Portugis",
        "funFact": "Hutan Amazon menghasilkan banyak oksigen dunia dan sungai Amazon adalah sungai terpanjang.",
        "coords": [
            -47.88,
            -15.79
        ]
    },
    {
        "id": "argentina",
        "name": "Argentina",
        "nameEn": "Argentina",
        "capital": "Buenos Aires",
        "continent": "Amerika Selatan",
        "flag": "🇦🇷",
        "currency": "Peso Argentina (ARS)",
        "landmark": "Air Terjun Raksasa Iguazu & Gletser Perito Moreno",
        "language": "Bahasa Spanyol",
        "funFact": "Negara tari Tango dan juara dunia sepak bola dengan gletser es biru yang spektakuler.",
        "coords": [
            -58.38,
            -34.6
        ]
    },
    {
        "id": "kolombia",
        "name": "Kolombia",
        "nameEn": "Colombia",
        "capital": "Bogota",
        "continent": "Amerika Selatan",
        "flag": "🇨🇴",
        "currency": "Peso Kolombia (COP)",
        "landmark": "Lembah Palem Raksasa Cocora & Kota Bersejarah Cartagena",
        "language": "Bahasa Spanyol",
        "funFact": "Punya pohon palem lilin Quindio yang bisa tumbuh tinggi menjulang hingga 60 meter!",
        "coords": [
            -74.07,
            4.71
        ]
    },
    {
        "id": "chili",
        "name": "Chili",
        "nameEn": "Chile",
        "capital": "Santiago",
        "continent": "Amerika Selatan",
        "flag": "🇨🇱",
        "currency": "Peso Chili (CLP)",
        "landmark": "Gurun Terkering Atacama & Patung Moai Pulau Paskah",
        "language": "Bahasa Spanyol",
        "funFact": "Bentuk negaranya sangat panjang dan ramping seperti cabai, membentang 4.300 km!",
        "coords": [
            -70.67,
            -33.45
        ]
    },
    {
        "id": "peru",
        "name": "Peru",
        "nameEn": "Peru",
        "capital": "Lima",
        "continent": "Amerika Selatan",
        "flag": "🇵🇪",
        "currency": "Sol Peru (PEN)",
        "landmark": "Kota Kuno di Atas Awan Machu Picchu & Gunung Pelangi",
        "language": "Spanyol & Quechua",
        "funFact": "Machu Picchu adalah benteng kota batu bangsa Inca kuno yang tersembunyi di puncak gunung.",
        "coords": [
            -77.04,
            -12.05
        ]
    },
    {
        "id": "uruguay",
        "name": "Uruguay",
        "nameEn": "Uruguay",
        "capital": "Montevideo",
        "continent": "Amerika Selatan",
        "flag": "🇺🇾",
        "currency": "Peso Uruguay (UYU)",
        "landmark": "Monumen Jari Pasir La Mano & Pantai Punta del Este",
        "language": "Bahasa Spanyol",
        "funFact": "Tuan rumah Piala Dunia sepak bola pertama di dunia pada tahun 1930 dan menjadi juara pertama!",
        "coords": [
            -56.16,
            -34.9
        ]
    },
    {
        "id": "venezuela",
        "name": "Venezuela",
        "nameEn": "Venezuela",
        "capital": "Caracas",
        "continent": "Amerika Selatan",
        "flag": "🇻🇪",
        "currency": "Bolivar (VES)",
        "landmark": "Air Terjun Angel Falls (Tertinggi di Dunia)",
        "language": "Bahasa Spanyol",
        "funFact": "Air Terjun Angel Falls menjatuhkan airnya dari tebing gunung setinggi hampir 1 kilometer!",
        "coords": [
            -66.9,
            10.48
        ]
    },
    {
        "id": "ekuador",
        "name": "Ekuador",
        "nameEn": "Ecuador",
        "capital": "Quito",
        "continent": "Amerika Selatan",
        "flag": "🇪🇨",
        "currency": "Dolar AS (USD)",
        "landmark": "Monumen Garis Khatulistiwa (Mitad del Mundo) & Kepulauan Galapagos",
        "language": "Bahasa Spanyol",
        "funFact": "Nama Ekuador diambil dari kata \"Khatulistiwa\", tempat kura-kura raksasa Galapagos hidup.",
        "coords": [
            -78.47,
            -0.18
        ]
    },
    {
        "id": "australia",
        "name": "Australia",
        "nameEn": "Australia",
        "capital": "Canberra",
        "continent": "Oseania",
        "flag": "🇦🇺",
        "currency": "Dolar Australia (AUD)",
        "landmark": "Gedung Opera Sydney & Karang Penghalang Besar (Great Barrier Reef)",
        "language": "Bahasa Inggris",
        "funFact": "Satu-satunya benua yang dihuni hewan berkantung unik seperti kanguru dan koala!",
        "coords": [
            149.13,
            -35.28
        ]
    },
    {
        "id": "selandia-baru",
        "name": "Selandia Baru",
        "nameEn": "New Zealand",
        "capital": "Wellington",
        "continent": "Oseania",
        "flag": "🇳🇿",
        "currency": "Dolar Selandia Baru (NZD)",
        "landmark": "Pedesaan Dongeng Hobbiton & Fjord Milford Sound",
        "language": "Inggris & Maori",
        "funFact": "Rumah bagi burung Kiwi yang tidak bisa terbang dan pemandangan alam magis film Lord of the Rings.",
        "coords": [
            174.78,
            -41.29
        ]
    },
    {
        "id": "fiji",
        "name": "Fiji",
        "nameEn": "Fiji",
        "capital": "Suva",
        "continent": "Oseania",
        "flag": "🇫🇯",
        "currency": "Dolar Fiji (FJD)",
        "landmark": "Kepulauan Terumbu Karang Mamanuca & Sungai Navua",
        "language": "Fiji, Hindi, Inggris",
        "funFact": "Kepulauan tropis yang terkenal dengan sambutan hangat ramah dan terumbu karang warna-warni.",
        "coords": [
            178.44,
            -18.14
        ]
    },
    {
        "id": "papua-nugini",
        "name": "Papua Nugini",
        "nameEn": "Papua New Guinea",
        "capital": "Port Moresby",
        "continent": "Oseania",
        "flag": "🇵🇬",
        "currency": "Kina (PGK)",
        "landmark": "Pegunungan Dataran Tinggi & Habitat Burung Cenderawasih",
        "language": "Tok Pisin, Hiri Motu, Inggris",
        "funFact": "Negara dengan keragaman bahasa terbanyak di dunia, memiliki lebih dari 800 bahasa daerah!",
        "coords": [
            147.18,
            -9.44
        ]
    },
    {
        "id": "samoa",
        "name": "Samoa",
        "nameEn": "Samoa",
        "capital": "Apia",
        "continent": "Oseania",
        "flag": "🇼🇸",
        "currency": "Tala Samoa (WST)",
        "landmark": "Kolam Laut To Sua Ocean Trench & Pantai Lalomanu",
        "language": "Samoa & Inggris",
        "funFact": "Kolam laut To Sua adalah lubang alami raksasa di tengah hutan hijau yang berisi air laut jernih.",
        "coords": [
            -171.76,
            -13.83
        ]
    }
],

  // 2. Seluruh 38 Provinsi Indonesia + 38 Ibu Kota Lengkap
  provinces: [
    // --- SUMATRA (10) ---
    { id: 'aceh', name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', icon: '🕌', funFact: 'Dikenal sebagai Serambi Mekkah dengan Masjid Raya Baiturrahman yang megah.' },
    { id: 'sumut', name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatra', icon: '🏞️', funFact: 'Punya Danau Toba yang merupakan danau vulkanik terbesar di dunia.' },
    { id: 'sumbar', name: 'Sumatera Barat', capital: 'Padang', island: 'Sumatra', icon: '🏠', funFact: 'Terkenal dengan Rumah Gadang dan masakan rendang yang sedap.' },
    { id: 'riau', name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', icon: '🌴', funFact: 'Kaya akan sungai besar dan kebudayaan Melayu yang kental.' },
    { id: 'kepri', name: 'Kepulauan Riau', capital: 'Tanjungpinang', island: 'Sumatra', icon: '⛵', funFact: 'Terdiri dari ribuan pulau cantik di dekat Selat Malaka.' },
    { id: 'jambi', name: 'Jambi', capital: 'Jambi', island: 'Sumatra', icon: '🏛️', funFact: 'Punya Kompleks Candi Muaro Jambi yang amat luas dan bersejarah.' },
    { id: 'bengkulu', name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', icon: '🌺', funFact: 'Habitat asli bunga raksasa langka di dunia, Rafflesia arnoldii.' },
    { id: 'sumsel', name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatra', icon: '🌉', funFact: 'Ikon Jembatan Ampera yang gagah melintasi Sungai Musi.' },
    { id: 'babel', name: 'Kepulauan Bangka Belitung', capital: 'Pangkalpinang', island: 'Sumatra', icon: '🏖️', funFact: 'Pantai berpasir putih dengan batu-batu granit raksasa yang eksotis.' },
    { id: 'lampung', name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', icon: '🐘', funFact: 'Pintu gerbang pulau Sumatra dan rumah konservasi gajah di Way Kambas.' },

    // --- JAWA (6) ---
    { id: 'banten', name: 'Banten', capital: 'Serang', island: 'Jawa', icon: '🦏', funFact: 'Habitat badak bercula satu di Taman Nasional Ujung Kulon.' },
    { id: 'dki', name: 'DKI Jakarta', capital: 'Jakarta', island: 'Jawa', icon: '🏙️', funFact: 'Ibu kota negara dengan monumen Monas berpuncak emas yang berkilau.' },
    { id: 'jabar', name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa', icon: '⛰️', funFact: 'Kota kembang berhawa sejuk, alat musik tradisional angklung dari bambu.' },
    { id: 'jateng', name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa', icon: '🛕', funFact: 'Memiliki Candi Borobudur yang megah dan pusat batik nusantara.' },
    { id: 'diy', name: 'DI Yogyakarta', capital: 'Yogyakarta', island: 'Jawa', icon: '👑', funFact: 'Kota istimewa budaya dengan Keraton dan Jalan Malioboro yang ramah.' },
    { id: 'jatim', name: 'Jawa Timur', capital: 'Surabaya', island: 'Jawa', icon: '🌋', funFact: 'Kota Pahlawan dan pesona pemandangan Gunung Bromo yang memukau.' },

    // --- BALI & NUSA TENGGARA (3) ---
    { id: 'bali', name: 'Bali', capital: 'Denpasar', island: 'Bali & Nusa Tenggara', icon: '🌺', funFact: 'Pulau Dewata yang termasyhur di dunia dengan tari, gamelan, dan pura indah.' },
    { id: 'ntb', name: 'Nusa Tenggara Barat', capital: 'Mataram', island: 'Bali & Nusa Tenggara', icon: '🏔️', funFact: 'Gunung Rinjani yang menjulang tinggi dan keindahan pantai pulau Lombok.' },
    { id: 'ntt', name: 'Nusa Tenggara Timur', capital: 'Kupang', island: 'Bali & Nusa Tenggara', icon: '🦎', funFact: 'Habitat asli hewan purba komodo di Pulau Komodo dan Labuan Bajo.' },

    // --- KALIMANTAN (5) ---
    { id: 'kalbar', name: 'Kalimantan Barat', capital: 'Pontianak', island: 'Kalimantan', icon: '🧭', funFact: 'Dilintasi garis khatulistiwa dengan Tugu Khatulistiwa di Pontianak.' },
    { id: 'kalteng', name: 'Kalimantan Tengah', capital: 'Palangka Raya', island: 'Kalimantan', icon: '🦧', funFact: 'Hutan tropis lebat yang menjadi rumah orangutan di Tanjung Puting.' },
    { id: 'kalsel', name: 'Kalimantan Selatan', capital: 'Banjarmasin', island: 'Kalimantan', icon: '🛶', funFact: 'Kota Seribu Sungai dengan pasar terapung Lok Baintan yang unik.' },
    { id: 'kaltim', name: 'Kalimantan Timur', capital: 'Samarinda', island: 'Kalimantan', icon: '🌳', funFact: 'Daerah pesisir dan sungai Mahakam yang luas serta kawasan IKN.' },
    { id: 'kaltara', name: 'Kalimantan Utara', capital: 'Tanjung Selor', island: 'Kalimantan', icon: '🌿', funFact: 'Provinsi termuda di pulau Kalimantan dengan alam yang asri.' },

    // --- SULAWESI (6) ---
    { id: 'sulut', name: 'Sulawesi Utara', capital: 'Manado', island: 'Sulawesi', icon: '🤿', funFact: 'Taman Laut Bunaken yang terkenal dengan terumbu karang warna-warni.' },
    { id: 'gorontalo', name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', icon: '🌽', funFact: 'Dikenal sebagai lumbung jagung dan pesona laut Teluk Tomini.' },
    { id: 'sulteng', name: 'Sulawesi Tengah', capital: 'Palu', island: 'Sulawesi', icon: '🐦', funFact: 'Rumah burung langka Maleo dan patung megalitik Lembah Bada.' },
    { id: 'sulbar', name: 'Sulawesi Barat', capital: 'Mamuju', island: 'Sulawesi', icon: '⛵', funFact: 'Pelaut ulung Mandar dengan perahu tradisional Sandeq yang gesit.' },
    { id: 'sulsel', name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', icon: '🏰', funFact: 'Benteng Rotterdam bersejarah, budaya Toraja, dan pantai Losari.' },
    { id: 'sultra', name: 'Sulawesi Tenggara', capital: 'Kendari', island: 'Sulawesi', icon: '🐠', funFact: 'Kepulauan Wakatobi yang merupakan surga penyelam dunia.' },

    // --- MALUKU (2) ---
    { id: 'maluku', name: 'Maluku', capital: 'Ambon', island: 'Kepulauan Maluku', icon: '🎶', funFact: 'Ambon Manise yang dijuluki Kota Musik Dunia oleh UNESCO.' },
    { id: 'malut', name: 'Maluku Utara', capital: 'Sofifi', island: 'Kepulauan Maluku', icon: '🌰', funFact: 'Kepulauan rempah cengkih dan pala yang dicari penjelajah dunia tempo dulu.' },

    // --- PAPUA (6) ---
    { id: 'papua-barat', name: 'Papua Barat', capital: 'Manokwari', island: 'Papua', icon: '🦜', funFact: 'Kota bersejarah Manokwari dan alam pegunungan Arfak yang menakjubkan.' },
    { id: 'papua-barat-daya', name: 'Papua Barat Daya', capital: 'Sorong', island: 'Papua', icon: '🏝️', funFact: 'Pintu gerbang menuju keajaiban pulau karang Raja Ampat.' },
    { id: 'papua', name: 'Papua', capital: 'Jayapura', island: 'Papua', icon: '🏞️', funFact: 'Danau Sentani yang indah dan burung Cenderawasih yang elok.' },
    { id: 'papua-selatan', name: 'Papua Selatan', capital: 'Merauke', island: 'Papua', icon: '🌅', funFact: 'Ujung paling timur Indonesia tempat matahari terbit lebih awal.' },
    { id: 'papua-tengah', name: 'Papua Tengah', capital: 'Nabire', island: 'Papua', icon: '🦈', funFact: 'Taman Nasional Teluk Cenderawasih dengan hiu paus yang ramah.' },
    { id: 'papua-pegunungan', name: 'Papua Pegunungan', capital: 'Wamena', island: 'Papua', icon: '⛰️', funFact: 'Satu-satunya provinsi tanpa laut di Indonesia, di Lembah Baliem yang sejuk.' }
  ],

  // 3. Kota-kota Terkenal di Indonesia yang BUKAN Ibu Kota Provinsi
  // Catatan: Wajib ada Malang -> Jawa Timur, non-eksklusif, dan tidak memuat ibu kota provinsi!
  famousNonCapitalCities: [
    {
      name: 'Malang',
      province: 'Jawa Timur',
      island: 'Jawa',
      icon: '🍎',
      desc: 'Kota sejuk penghasil apel malang yang manis, dekat dengan Gunung Bromo, dan kota pendidikan favorit.',
      isCapital: false
    },
    {
      name: 'Surakarta (Solo)',
      province: 'Jawa Tengah',
      island: 'Jawa',
      icon: '🏛️',
      desc: 'Kota budaya batik halus dengan Keraton Kasunanan dan pasar Klewer yang terkenal.',
      isCapital: false
    },
    {
      name: 'Bukittinggi',
      province: 'Sumatera Barat',
      island: 'Sumatra',
      icon: '🕰️',
      desc: 'Kota berhawa sejuk dengan menara Jam Gadang dan Ngarai Sianok yang memukau.',
      isCapital: false
    },
    {
      name: 'Cirebon',
      province: 'Jawa Barat',
      island: 'Jawa',
      icon: '🦐',
      desc: 'Kota Udang di pesisir utara Jawa Barat dengan batik mega mendung khas keraton.',
      isCapital: false
    },
    {
      name: 'Bogor',
      province: 'Jawa Barat',
      island: 'Jawa',
      icon: '🌧️',
      desc: 'Dikenal sebagai Kota Hujan dengan Kebun Raya Bogor tertua di Asia Tenggara.',
      isCapital: false
    },
    {
      name: 'Banyuwangi',
      province: 'Jawa Timur',
      island: 'Jawa',
      icon: '🔥',
      desc: 'The Sunrise of Java di ujung timur pulau Jawa, terkenal dengan Kawah Ijen api biru.',
      isCapital: false
    },
    {
      name: 'Singaraja',
      province: 'Bali',
      island: 'Bali & Nusa Tenggara',
      icon: '🐬',
      desc: 'Kota pendidikan di pesisir utara Bali (Buleleng), dekat dengan pantai Lovina lumba-lumba.',
      isCapital: false
    },
    {
      name: 'Labuan Bajo',
      province: 'Nusa Tenggara Timur',
      island: 'Bali & Nusa Tenggara',
      icon: '⛵',
      desc: 'Kota pelabuhan eksotis pintu masuk menuju habitat hewan langka Komodo.',
      isCapital: false
    },
    {
      name: 'Balikpapan',
      province: 'Kalimantan Timur',
      island: 'Kalimantan',
      icon: '⛽',
      desc: 'Kota Minyak yang bersih, modern, dan tertata rapi di pesisir Selat Makassar.',
      isCapital: false
    },
    {
      name: 'Magelang',
      province: 'Jawa Tengah',
      island: 'Jawa',
      icon: '🛕',
      desc: 'Kota lembah di antara pegunungan, tempat berdirinya Candi Borobudur nan agung.',
      isCapital: false
    }
  ],

  // 4. Modul Khusus: Jelajah Provinsi Bali (8 Kabupaten + 1 Kota)
  // Wajib mencakup seluruh nama kabupaten/kota dan ibu kota / pusat pemerintahan masing-masing!
  baliModule: {
    title: 'Jelajah Pulau Dewata: 8 Kabupaten & 1 Kota',
    titleEn: 'Discover the Island of Gods: 8 Regencies & 1 City',
    description: 'Provinsi Bali memiliki 8 Kabupaten dan 1 Kota. Masing-masing memiliki pusat pemerintahan dan pesona kebudayaan tersendiri.',
    descriptionEn: 'Bali Province comprises 8 Regencies and 1 City, each with its own administrative center and rich cultural charm.',
    regions: [
      {
        name: 'Kabupaten Jembrana',
        capital: 'Negara',
        type: 'Kabupaten',
        icon: '🐃',
        highlight: 'Tradisi balapan kerbau Makepung dan pelabuhan Gilimanuk pintu barat Bali.'
      },
      {
        name: 'Kabupaten Tabanan',
        capital: 'Tabanan',
        type: 'Kabupaten',
        icon: '🌾',
        highlight: 'Lumbung beras Bali dengan sawah bertingkat Jatiluwih dan Pura Tanah Lot.'
      },
      {
        name: 'Kabupaten Badung',
        capital: 'Mangupura',
        type: 'Kabupaten',
        icon: '🏄',
        highlight: 'Pusat pariwisata internasional dengan pantai Kuta, Seminyak, dan Pura Uluwatu.'
      },
      {
        name: 'Kabupaten Gianyar',
        capital: 'Gianyar',
        type: 'Kabupaten',
        icon: '🎨',
        highlight: 'Pusat seni, patung, dan tari di Ubud, serta kebun binatang ramah anak.'
      },
      {
        name: 'Kabupaten Klungkung',
        capital: 'Semarapura',
        type: 'Kabupaten',
        icon: '🏛️',
        highlight: 'Kerthi Gosa lukisan wayang Kamasan dan gugusan pulau Nusa Penida.'
      },
      {
        name: 'Kabupaten Bangli',
        capital: 'Bangli',
        type: 'Kabupaten',
        icon: '🌋',
        highlight: 'Satu-satunya kabupaten tanpa pantai di Bali, punya Danau Batur dan desa terbersih Penglipuran.'
      },
      {
        name: 'Kabupaten Karangasem',
        capital: 'Amlapura',
        type: 'Kabupaten',
        icon: '⛰️',
        highlight: 'Gunung Agung yang sakral, Istana Air Tirta Gangga, dan Pura Besakih.'
      },
      {
        name: 'Kabupaten Buleleng',
        capital: 'Singaraja',
        type: 'Kabupaten',
        icon: '🐬',
        highlight: 'Wilayah Bali Utara yang luas, pantai Lovina tempat bermain lumba-lumba, dan air terjun Gitgit.'
      },
      {
        name: 'Kota Denpasar',
        capital: 'Denpasar',
        type: 'Kota',
        icon: '🏙️',
        highlight: 'Pusat pemerintahan dan ekonomi provinsi Bali dengan Lapangan Renon dan Pasar Badung.'
      }
    ]
  },

  // 5. Kuis Geografi Interaktif
  quizzes: [
    {
        "id": "quiz-world-capitals",
        "title": "Kuis 4: Tebak Ibu Kota Negara di Dunia",
        "desc": "Jelajahi dunia! Seberapa hebat kamu mengingat ibu kota negara-negara sahabat?",
        "questions": [
            {
                "q": "Apa ibu kota negara Jepang?",
                "options": [
                    "Tokyo",
                    "Kyoto",
                    "Osaka",
                    "Sapporo"
                ],
                "answer": "Tokyo",
                "hint": "Kota metropolitan terbesar dengan Menara Tokyo yang terkenal."
            },
            {
                "q": "Apa ibu kota negara Arab Saudi?",
                "options": [
                    "Riyadh",
                    "Jeddah",
                    "Makkah",
                    "Madinah"
                ],
                "answer": "Riyadh",
                "hint": "Pusat pemerintahan dan ekonomi kerajaan di tengah gurun Nejd."
            },
            {
                "q": "Apa ibu kota negara Inggris (Britania Raya)?",
                "options": [
                    "London",
                    "Manchester",
                    "Liverpool",
                    "Edinburgh"
                ],
                "answer": "London",
                "hint": "Kota bersejarah tempat Menara Big Ben dan jam raksasanya berdentang."
            },
            {
                "q": "Apa ibu kota negara Mesir di Afrika?",
                "options": [
                    "Kairo",
                    "Iskandariyah",
                    "Giza",
                    "Luxor"
                ],
                "answer": "Kairo",
                "hint": "Kota di tepi Sungai Nil dekat dengan piramida megah."
            },
            {
                "q": "Apa ibu kota negara Australia?",
                "options": [
                    "Canberra",
                    "Sydney",
                    "Melbourne",
                    "Brisbane"
                ],
                "answer": "Canberra",
                "hint": "Bukan Sydney atau Melbourne, melainkan kota terencana yang indah di pedalaman!"
            }
        ]
    },
    {
      id: 'quiz-prov-capital',
      title: 'Kuis 1: Tebak Ibu Kota Provinsi',
      desc: 'Uji hafalanmu tentang ibu kota dari 38 provinsi di Indonesia!',
      questions: [
        { q: 'Apa ibu kota Provinsi Jawa Timur?', options: ['Surabaya', 'Malang', 'Bandung', 'Semarang'], answer: 'Surabaya', hint: 'Kota Pahlawan yang terkenal dengan Tugu Pahlawan!' },
        { q: 'Apa ibu kota Provinsi Bali?', options: ['Singaraja', 'Denpasar', 'Gianyar', 'Mangupura'], answer: 'Denpasar', hint: 'Kota di tengah Bali yang memiliki Monumen Bajra Sandhi.' },
        { q: 'Apa ibu kota Provinsi Sumatera Barat?', options: ['Bukittinggi', 'Padang', 'Medan', 'Pekanbaru'], answer: 'Padang', hint: 'Kota asal kuliner rendang yang mendunia!' },
        { q: 'Apa ibu kota Provinsi Papua Pegunungan?', options: ['Jayapura', 'Wamena', 'Merauke', 'Nabire'], answer: 'Wamena', hint: 'Kota sejuk di Lembah Baliem.' },
        { q: 'Apa ibu kota Provinsi Kalimantan Timur?', options: ['Balikpapan', 'Samarinda', 'Pontianak', 'Banjarmasin'], answer: 'Samarinda', hint: 'Kota di tepi Sungai Mahakam.' }
      ]
    },
    {
      id: 'quiz-city-province',
      title: 'Kuis 2: Tebak Asal Provinsi Kota Terkenal',
      desc: 'Kota-kota ini sangat terkenal, tapi bukan ibu kota provinsi! Di mana ya lokasinya?',
      questions: [
        { q: 'Kota Malang yang sejuk dan terkenal dengan buah apel berada di provinsi mana?', options: ['Jawa Timur', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta'], answer: 'Jawa Timur', hint: 'Kota ini dekat dengan Gunung Bromo dan berhawa sejuk.' },
        { q: 'Kota Surakarta (Solo) yang terkenal dengan keraton dan batiknya berada di provinsi mana?', options: ['Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'Banten'], answer: 'Jawa Tengah', hint: 'Berada di dekat Yogyakarta, terkenal dengan lagu Bengawan Solo.' },
        { q: 'Kota Bukittinggi dengan ikon Jam Gadang berada di provinsi mana?', options: ['Sumatera Barat', 'Riau', 'Sumatera Utara', 'Jambi'], answer: 'Sumatera Barat', hint: 'Kawasan Minangkabau berhawa sejuk di pegunungan Bukit Barisan.' },
        { q: 'Kota Singaraja yang terkenal di Bali Utara berada di kabupaten apa?', options: ['Buleleng', 'Badung', 'Tabanan', 'Jembrana'], answer: 'Buleleng', hint: 'Daerah pesisir utara tempat pantai Lovina lumba-lumba berada.' },
        { q: 'Kota Labuan Bajo gerbang menuju pulau Komodo berada di provinsi mana?', options: ['Nusa Tenggara Timur', 'Nusa Tenggara Barat', 'Bali', 'Maluku'], answer: 'Nusa Tenggara Timur', hint: 'Singkatannya NTT, terkenal dengan tenun ikatnya.' }
      ]
    },
    {
      id: 'quiz-bali-regions',
      title: 'Kuis 3: Jelajah Bali 8 Kabupaten & 1 Kota',
      desc: 'Cocokkan nama kabupaten di Bali dengan pusat pemerintahannya!',
      questions: [
        { q: 'Ibu kota / pusat pemerintahan Kabupaten Badung adalah...', options: ['Mangupura', 'Kuta', 'Denpasar', 'Gianyar'], answer: 'Mangupura', hint: 'Pusat pemerintahannya bernama Mangupura di Sempidi.' },
        { q: 'Ibu kota / pusat pemerintahan Kabupaten Buleleng adalah...', options: ['Singaraja', 'Lovina', 'Seririt', 'Tabanan'], answer: 'Singaraja', hint: 'Pernah menjadi ibu kota Sunda Kecil pada masa lampau.' },
        { q: 'Ibu kota / pusat pemerintahan Kabupaten Jembrana adalah...', options: ['Negara', 'Gilimanuk', 'Tabanan', 'Amlapura'], answer: 'Negara', hint: 'Kota Negara yang terkenal dengan tradisi Makepung.' },
        { q: 'Ibu kota / pusat pemerintahan Kabupaten Karangasem adalah...', options: ['Amlapura', 'Candidasa', 'Klungkung', 'Bangli'], answer: 'Amlapura', hint: 'Pusat pemerintahan di timur Bali di bawah kaki Gunung Agung.' },
        { q: 'Satu-satunya kabupaten di Bali yang TIDAK memiliki wilayah pantai adalah...', options: ['Bangli', 'Gianyar', 'Tabanan', 'Klungkung'], answer: 'Bangli', hint: 'Kabupaten di dataran tinggi yang memiliki Danau Batur.' }
      ]
    }
  ]
};

