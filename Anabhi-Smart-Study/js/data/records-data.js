// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Records & Statistics Encyclopedia Data
// Serba TER- di Indonesia & Serba TER- di Dunia
// Development · Anabhi Dev
// Version   : 1.0 (Bilingual, Kid-Friendly, Visual SVG Illustrations)
// ================================================================

export const RECORDS_DATA = [
  // ============================================================
  // SERBA TER- DI INDONESIA (12 REKOR HEBAT)
  // ============================================================
  {
    id: 'id-kereta-tercepat',
    scope: 'indonesia',
    category: 'teknologi',
    badge: 'TERCEPAT ⚡',
    badgeEn: 'FASTEST ⚡',
    title: 'Kereta Api Tercepat di Indonesia & Asia Tenggara',
    titleEn: 'Fastest Train in Indonesia & Southeast Asia',
    holder: 'Kereta Cepat Whoosh (KCIC)',
    statValue: '350 km/jam',
    statNumber: 350,
    statUnit: 'km/jam',
    comparison: 'Dalam 1 detik melesat 97 meter! Jakarta ke Bandung cuma butuh waktu 45 menit!',
    comparisonEn: 'Travels 97 meters per second! Jakarta to Bandung takes only 45 minutes!',
    description: 'Whoosh adalah kereta cepat komersial pertama di Indonesia dan Asia Tenggara yang menggunakan tenaga listrik ramah lingkungan dan teknologi bantalan magnetik serta rel presisi tinggi.',
    descriptionEn: 'Whoosh is the first high-speed bullet train in Southeast Asia, connecting Jakarta and Bandung with top operating speed of 350 km/h.',
    funFact: 'Nama WHOOSH adalah singkatan dari Waktu Hemat, Operasi Optimal, Sistem Hebat! Kereta ini sangat tenang sehingga koin logam bisa berdiri tegak di jendela saat melaju kencang.',
    funFactEn: 'WHOOSH stands for Time Saving, Optimal Operation, Great System! The ride is so smooth that a coin can stand upright on its window ledge at full speed.',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="trainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ef4444"/>
          <stop offset="50%" stop-color="#b91c1c"/>
          <stop offset="100%" stop-color="#7f1d1d"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="#fef2f2"/>
      <!-- Track lines -->
      <path d="M10 95 L110 95" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round"/>
      <path d="M15 102 L105 102" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 4"/>
      <!-- Bullet Train Nose -->
      <path d="M20 78 C25 65 45 42 75 42 L105 42 C108 42 110 45 110 50 L110 78 C110 82 106 85 102 85 L35 85 C26 85 20 82 20 78 Z" fill="url(#trainGrad)"/>
      <path d="M60 48 L98 48 C102 48 104 50 104 54 L104 60 L50 60 C53 54 56 48 60 48 Z" fill="#38bdf8"/>
      <path d="M22 75 C30 76 50 78 80 78 L108 78" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Speed streaks -->
      <path d="M6 55 L22 55" stroke="#f87171" stroke-width="3" stroke-linecap="round"/>
      <path d="M12 45 L32 45" stroke="#fca5a5" stroke-width="2" stroke-linecap="round"/>
      <path d="M8 65 L18 65" stroke="#f87171" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Wheels / Skirt -->
      <circle cx="45" cy="85" r="5" fill="#334155"/>
      <circle cx="75" cy="85" r="5" fill="#334155"/>
      <circle cx="95" cy="85" r="5" fill="#334155"/>
    </svg>`
  },
  {
    id: 'id-gunung-tertinggi',
    scope: 'indonesia',
    category: 'alam',
    badge: 'TERTINGGI 🏔️',
    badgeEn: 'HIGHEST 🏔️',
    title: 'Gunung & Puncak Tertinggi di Indonesia',
    titleEn: 'Highest Mountain & Peak in Indonesia',
    holder: 'Puncak Jaya (Carstensz Pyramid), Papua',
    statValue: '4.884 mdpl',
    statNumber: 4884,
    statUnit: 'mdpl (meter)',
    comparison: 'Setara dengan 37 Monumen Nasional (Monas) ditumpuk ke atas langit!',
    comparisonEn: 'Equivalent to 37 National Monuments (Monas) stacked straight up into the clouds!',
    description: 'Puncak Jaya adalah gunung tertinggi di kawasan Oseania/Indonesia dan menjadi salah satu dari Tujuh Puncak Dunia (Seven Summits) yang diimpikan para pendaki dunia.',
    descriptionEn: 'Puncak Jaya (Carstensz Pyramid) in Papua is the highest peak in Indonesia and Oceania, standing tall at 4,884 meters above sea level.',
    funFact: 'Puncak Jaya adalah fenomena langka di dunia: tempat dengan salju dan gletser es abadi yang terletak tepat di daerah khatulistiwa beriklim tropis!',
    funFactEn: 'It is a rare global wonder: an equatorial tropical peak covered with ancient glacial ice and snow!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="mntGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="#f0f9ff"/>
      <!-- Sun -->
      <circle cx="95" cy="28" r="12" fill="#fbbf24"/>
      <!-- Back Mountain -->
      <polygon points="15,95 55,35 90,95" fill="#94a3b8"/>
      <polygon points="45,50 55,35 65,50 58,47 52,51" fill="#ffffff"/>
      <!-- Front Mountain Puncak Jaya -->
      <polygon points="35,100 80,22 115,100" fill="#475569"/>
      <!-- Snow cap -->
      <polygon points="70,40 80,22 92,40 85,36 78,41 73,37" fill="#ffffff"/>
      <polygon points="68,43 80,22 94,43" fill="#e0f2fe" opacity="0.6"/>
      <!-- Clouds -->
      <ellipse cx="30" cy="40" rx="14" ry="7" fill="#ffffff" opacity="0.9"/>
      <ellipse cx="40" cy="38" rx="10" ry="8" fill="#ffffff" opacity="0.9"/>
    </svg>`
  },
  {
    id: 'id-laut-terdalam',
    scope: 'indonesia',
    category: 'alam',
    badge: 'TERDALAM 🌊',
    badgeEn: 'DEEPEST 🌊',
    title: 'Laut & Palung Terdalam di Indonesia',
    titleEn: 'Deepest Sea & Trench in Indonesia',
    holder: 'Laut Banda (Palung Weber), Maluku',
    statValue: '7.440 meter',
    statNumber: 7440,
    statUnit: 'meter',
    comparison: 'Sedalam 25 kali tinggi Menara Eiffel di Paris bila ditenggelamkan ke dalam laut!',
    comparisonEn: 'Deep as 25 Eiffel Towers stacked on top of each other under the ocean!',
    description: 'Laut Banda di Kepulauan Maluku memiliki cekungan Palung Weber sedalam 7.440 meter. Di kedalaman ini, tekanan airnya sangat luar biasa dahsyat dan suhunya mendekati titik beku.',
    descriptionEn: 'The Banda Sea hosts the Weber Deep at 7,440 meters depth, making it the deepest marine abyss in Indonesia.',
    funFact: 'Sinar matahari hanya bisa menembus laut hingga kedalaman 200 meter. Lebih dari 7.000 meter di bawah Laut Banda, suasananya gelap gulita dan dihuni ikan-ikan bercahaya (bioluminesensi)!',
    funFactEn: 'Sunlight only reaches 200m down. Over 7,000m deep in the Banda Sea is pitch black and inhabited by glowing deep-sea creatures!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="seaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="50%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="url(#seaGrad)"/>
      <!-- Ocean surface waves -->
      <path d="M0 25 Q30 20 60 25 T120 25 L120 0 L0 0 Z" fill="#38bdf8" opacity="0.4"/>
      <!-- Submarine -->
      <rect x="35" y="45" width="46" height="18" rx="9" fill="#f59e0b"/>
      <rect x="52" y="38" width="12" height="9" rx="3" fill="#d97706"/>
      <circle cx="48" cy="54" r="3" fill="#38bdf8"/>
      <circle cx="60" cy="54" r="3" fill="#38bdf8"/>
      <path d="M81 54 L88 50 L88 58 Z" fill="#b45309"/>
      <!-- Light beam into abyss -->
      <polygon points="35,54 5,85 18,92 37,56" fill="#fef08a" opacity="0.35"/>
      <!-- Glowing deep fish -->
      <ellipse cx="28" cy="98" rx="8" ry="4" fill="#10b981"/>
      <polygon points="36,98 42,94 42,102" fill="#10b981"/>
      <circle cx="24" cy="97" r="1.5" fill="#fef08a"/>
      <!-- Depth bubbles -->
      <circle cx="50" cy="75" r="2" fill="#bae6fd" opacity="0.6"/>
      <circle cx="68" cy="88" r="1.5" fill="#bae6fd" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'id-danau-terbesar',
    scope: 'indonesia',
    category: 'alam',
    badge: 'TERBESAR 🌋',
    badgeEn: 'LARGEST 🌋',
    title: 'Danau Vulkanik Terbesar di Dunia (ada di Indonesia!)',
    titleEn: 'Largest Volcanic Lake in the World',
    holder: 'Danau Toba, Sumatera Utara',
    statValue: '1.130 km²',
    statNumber: 1130,
    statUnit: 'km² (panjang 100 km)',
    comparison: 'Panjangnya 100 km dan di tengahnya ada Pulau Samosir yang luasnya hampir sama dengan negara Singapura!',
    comparisonEn: '100 km long with Samosir Island in the middle, nearly the size of the entire country of Singapore!',
    description: 'Danau Toba adalah danau vulkanik terbesar di planet Bumi dan danau terbesar di Asia Tenggara. Terbentuk dari letusan supervolcano mahadahsyat sekitar 74.000 tahun yang lalu.',
    descriptionEn: 'Lake Toba in North Sumatra is the largest volcanic lake on Earth, created by a monumental supervolcanic eruption 74,000 years ago.',
    funFact: 'Letusan purba Danau Toba dulunya menutupi atmosfer Bumi dengan abu selama bertahun-tahun dan menyebabkan zaman es mini di seluruh dunia!',
    funFactEn: 'The prehistoric Toba super-eruption spread ash worldwide and plunged Earth into a mini ice age!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#ecfdf5"/>
      <!-- Caldera Mountain Rim -->
      <path d="M0 65 Q30 40 60 55 Q90 38 120 60 L120 120 L0 120 Z" fill="#047857"/>
      <!-- Lake Water -->
      <ellipse cx="60" cy="85" rx="55" ry="25" fill="#0284c7"/>
      <ellipse cx="60" cy="85" rx="50" ry="22" fill="#0369a1"/>
      <!-- Samosir Island in center -->
      <ellipse cx="60" cy="83" rx="20" ry="9" fill="#15803d"/>
      <ellipse cx="62" cy="81" rx="14" ry="6" fill="#16a34a"/>
      <!-- Traditional Batak Roof silhouette -->
      <path d="M55 76 Q60 72 65 76 L66 79 L54 79 Z" fill="#991b1b"/>
      <!-- Sun -->
      <circle cx="28" cy="30" r="10" fill="#f59e0b"/>
    </svg>`
  },
  {
    id: 'id-danau-terdalam',
    scope: 'indonesia',
    category: 'alam',
    badge: 'TERDALAM 🏊',
    badgeEn: 'DEEPEST 🏊',
    title: 'Danau Terdalam di Indonesia & Asia Tenggara',
    titleEn: 'Deepest Lake in Indonesia & Southeast Asia',
    holder: 'Danau Matano, Sulawesi Selatan',
    statValue: '590 meter',
    statNumber: 590,
    statUnit: 'meter',
    comparison: 'Dasar danaunya berada 208 meter di bawah permukaan laut (fenomena Kriptodepresi)!',
    comparisonEn: 'The lake bottom sits 208 meters below sea level (cryptodepression)!',
    description: 'Danau Matano di Luwu Timur, Sulawesi Selatan adalah danau purba tektonik berusia jutaan tahun dan danau nomor 10 terdalam di seluruh dunia.',
    descriptionEn: 'Lake Matano in South Sulawesi is the deepest lake in Southeast Asia and the 10th deepest in the world at 590 meters.',
    funFact: 'Air Danau Matano sangat jernih dan tenang bagaikan cermin raksasa, serta menjadi rumah bagi ikan-ikan endemik langka yang tidak ada di belahan dunia lain!',
    funFactEn: 'Its crystal-clear waters harbor unique endemic fish found nowhere else on the planet!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#f0fdf4"/>
      <!-- Canyon Walls -->
      <path d="M0 45 L35 70 L35 120 L0 120 Z" fill="#1e293b"/>
      <path d="M120 45 L85 70 L85 120 L120 120 Z" fill="#334155"/>
      <!-- Deep Water Column -->
      <rect x="35" y="60" width="50" height="60" fill="#0369a1"/>
      <rect x="35" y="85" width="50" height="35" fill="#0f172a"/>
      <!-- Crystal surface -->
      <ellipse cx="60" cy="60" rx="25" ry="6" fill="#38bdf8"/>
      <!-- Endemic Little Fish -->
      <ellipse cx="56" cy="74" rx="4" ry="2" fill="#fbbf24"/>
      <polygon points="60,74 63,72 63,76" fill="#fbbf24"/>
      <!-- Depth Arrow Meter -->
      <line x1="75" y1="65" x2="75" y2="110" stroke="#f43f5e" stroke-width="2" stroke-dasharray="3 2"/>
      <polygon points="75,114 72,108 78,108" fill="#f43f5e"/>
    </svg>`
  },
  {
    id: 'id-reptil-terbesar',
    scope: 'indonesia',
    category: 'hewan',
    badge: 'TERBESAR 🦎',
    badgeEn: 'LARGEST 🦎',
    title: 'Kadal & Reptil Terbesar di Dunia (Asli Indonesia!)',
    titleEn: 'Largest Lizard in the World (Endemic to Indonesia)',
    holder: 'Komodo (Varanus komodoensis), NTT',
    statValue: 'Panjang 3 Meter · Berat 135 kg',
    statNumber: 3,
    statUnit: 'meter panjang',
    comparison: 'Panjangnya lebih panjang dari kasur tempat tidurmu dan beratnya sama dengan 2 orang dewasa digabung!',
    comparisonEn: 'Longer than a full-size bed and heavy as two full-grown adults combined!',
    description: 'Komodo adalah satwa purba legendaris yang hanya hidup di Kepulauan Komodo, Nusa Tenggara Timur. Mereka dijuluki sebagai "Naga Terakhir di Muka Bumi".',
    descriptionEn: 'The Komodo Dragon is the largest living species of lizard, found exclusively in the Komodo National Park, Indonesia.',
    funFact: 'Komodo memiliki indra penciuman luar biasa melalui lidah bercabangnya yang kuning. Komodo bisa mencium bau mangsa dari jarak 9,5 kilometer!',
    funFactEn: 'With its forked yellow tongue, a Komodo dragon can detect scents from up to 9.5 kilometers away!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#fefce8"/>
      <!-- Savannah Hill -->
      <ellipse cx="60" cy="115" rx="55" ry="25" fill="#ca8a04"/>
      <!-- Komodo Body -->
      <ellipse cx="60" cy="72" rx="34" ry="14" fill="#65a30d"/>
      <!-- Tail -->
      <path d="M26 72 Q12 68 8 82 Q6 90 12 92" stroke="#4d7c0f" stroke-width="8" stroke-linecap="round" fill="none"/>
      <!-- Head -->
      <path d="M88 68 C96 66 106 68 108 75 C108 80 98 82 86 78 Z" fill="#65a30d"/>
      <circle cx="98" cy="71" r="2" fill="#1e293b"/>
      <!-- Forked Tongue -->
      <path d="M108 76 L116 76 L119 73 M116 76 L119 79" stroke="#facc15" stroke-width="2" stroke-linecap="round"/>
      <!-- Legs -->
      <rect x="42" y="80" width="8" height="14" rx="4" fill="#4d7c0f"/>
      <rect x="74" y="80" width="8" height="14" rx="4" fill="#4d7c0f"/>
    </svg>`
  },
  {
    id: 'id-bunga-terbesar',
    scope: 'indonesia',
    category: 'hewan',
    badge: 'TERBESAR 🌸',
    badgeEn: 'LARGEST 🌸',
    title: 'Bunga Tunggal Terbesar di Dunia (Asli Indonesia!)',
    titleEn: 'Largest Individual Flower in the World',
    holder: 'Rafflesia arnoldii, Bengkulu & Sumatera',
    statValue: 'Diameter 110 cm · Berat 11 kg',
    statNumber: 110,
    statUnit: 'cm diameter',
    comparison: 'Lebar bunganya lebih besar dari ban mobil dan beratnya sama dengan 11 kantong beras!',
    comparisonEn: 'Wider than a giant car wheel and weighs as much as eleven bags of rice!',
    description: 'Rafflesia arnoldii adalah bunga raksasa parasit langka tanpa daun, batang, atau akar sejati. Bunga ini mekar megah di lantai hutan hujan tropis Sumatera dan Kalimantan.',
    descriptionEn: 'Rafflesia arnoldii produces the largest individual flower on Earth, growing up to over 1 meter across in Indonesian rainforests.',
    funFact: 'Bunga ini hanya mekar selama 5 hingga 7 hari sebelum layu. Saat mekar, ia mengeluarkan aroma khas untuk memanggil lalat membantu penyerbukan.',
    funFactEn: 'It blooms for only 5 to 7 days, releasing a distinct aroma to attract pollinating flies!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#fff1f2"/>
      <!-- Rainforest Ground -->
      <rect x="0" y="90" width="120" height="30" fill="#14532d"/>
      <!-- Big Red Petals -->
      <circle cx="60" cy="60" r="18" fill="#991b1b"/>
      <!-- 5 Giant Petals -->
      <circle cx="60" cy="32" r="16" fill="#e11d48"/>
      <circle cx="86" cy="50" r="16" fill="#e11d48"/>
      <circle cx="76" cy="82" r="16" fill="#e11d48"/>
      <circle cx="44" cy="82" r="16" fill="#e11d48"/>
      <circle cx="34" cy="50" r="16" fill="#e11d48"/>
      <!-- White warts on petals -->
      <circle cx="60" cy="30" r="3" fill="#fef2f2"/>
      <circle cx="85" cy="48" r="3" fill="#fef2f2"/>
      <circle cx="74" cy="80" r="3" fill="#fef2f2"/>
      <circle cx="45" cy="80" r="3" fill="#fef2f2"/>
      <circle cx="35" cy="48" r="3" fill="#fef2f2"/>
      <!-- Center cup -->
      <circle cx="60" cy="60" r="14" fill="#881337"/>
      <circle cx="60" cy="60" r="8" fill="#4c0519"/>
      <!-- Spikes in center -->
      <circle cx="58" cy="58" r="1.5" fill="#facc15"/>
      <circle cx="62" cy="58" r="1.5" fill="#facc15"/>
      <circle cx="60" cy="62" r="1.5" fill="#facc15"/>
    </svg>`
  },
  {
    id: 'id-sungai-terpanjang',
    scope: 'indonesia',
    category: 'alam',
    badge: 'TERPANJANG 🏞️',
    badgeEn: 'LONGEST 🏞️',
    title: 'Sungai Terpanjang di Indonesia',
    titleEn: 'Longest River in Indonesia',
    holder: 'Sungai Kapuas, Kalimantan Barat',
    statValue: '1.143 km',
    statNumber: 1143,
    statUnit: 'kilometer',
    comparison: 'Lebih panjang dari jarak perjalanan darat dari Jakarta sampai Banyuwangi di ujung Pulau Jawa!',
    comparisonEn: 'Longer than a road trip traversing the entire length of Java island!',
    description: 'Sungai Kapuas bermata air di Pegunungan Muller dan mengalir membelah Kalimantan Barat hingga bermuara di Selat Karimata. Menjadi urat nadi transportasi masyarakat pedalaman.',
    descriptionEn: 'Kapuas River in West Kalimantan is Indonesia’s longest river, flowing 1,143 km from the central mountains to the sea.',
    funFact: 'Sungai Kapuas dihuni lebih dari 300 jenis ikan air tawar, termasuk Ikan Arwana Super Red yang sangat anggun dan berharga tinggi!',
    funFactEn: 'It is home to over 300 freshwater fish species, including the legendary Super Red Asian Arowana!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#ecfeff"/>
      <!-- Jungle riverbanks -->
      <path d="M0 0 L120 0 L120 120 L0 120 Z" fill="#15803d"/>
      <!-- Winding River -->
      <path d="M20 0 C40 30 10 50 40 75 C70 95 60 110 80 120 L105 120 C85 105 95 85 65 65 C35 45 65 25 45 0 Z" fill="#0284c7"/>
      <!-- Traditional boat -->
      <ellipse cx="50" cy="68" rx="6" ry="2" fill="#ca8a04"/>
      <!-- Fish jumping -->
      <path d="M68 85 Q72 78 76 84" stroke="#f59e0b" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'id-candi-terbesar',
    scope: 'indonesia',
    category: 'bangunan',
    badge: 'TERBESAR 🏛️',
    badgeEn: 'LARGEST 🏛️',
    title: 'Candi Buddha Terbesar di Dunia (ada di Indonesia!)',
    titleEn: 'Largest Buddhist Temple in the World',
    holder: 'Candi Borobudur, Magelang, Jawa Tengah',
    statValue: '2.500 m² · 504 Patung Buddha',
    statNumber: 2500,
    statUnit: 'm² luas',
    comparison: 'Tersusun dari 2 juta balok batu vulkanik yang saling mengunci kokoh tanpa menggunakan semen sedikit pun!',
    comparisonEn: 'Constructed from 2 million interlocking volcanic stone blocks without using any mortar!',
    description: 'Candi Borobudur dibangun pada abad ke-8 oleh Wangsa Syailendra. Bangunan megah berbentuk piramida berundak ini diakui dunia sebagai Situs Warisan Budaya UNESCO.',
    descriptionEn: 'Borobudur in Central Java is the world’s largest Buddhist temple, recognized globally as a UNESCO World Heritage treasure.',
    funFact: 'Borobudur memiliki 72 stupa terawang berlubang dan 2.672 panel relief cerita yang jika dibentangkan panjangnya mencapai 3 kilometer!',
    funFactEn: 'It features 72 openwork stupas and 2,672 narrative bas-relief panels stretching over 3 kilometers long!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#fafaf9"/>
      <!-- Blue Sky & Hills -->
      <path d="M0 60 Q60 45 120 60 L120 120 L0 120 Z" fill="#065f46"/>
      <!-- Borobudur Tiered Structure -->
      <polygon points="15,105 105,105 95,90 25,90" fill="#78716c"/>
      <polygon points="28,90 92,90 85,78 35,78" fill="#57534e"/>
      <polygon points="38,78 82,78 76,68 44,68" fill="#44403c"/>
      <!-- Main Central Stupa -->
      <path d="M52 68 C52 56 60 50 60 44 C60 50 68 56 68 68 Z" fill="#a8a29e"/>
      <line x1="60" y1="44" x2="60" y2="36" stroke="#a8a29e" stroke-width="3" stroke-linecap="round"/>
      <!-- Side Stupas -->
      <circle cx="46" cy="66" r="3.5" fill="#a8a29e"/>
      <circle cx="74" cy="66" r="3.5" fill="#a8a29e"/>
    </svg>`
  },
  {
    id: 'id-jembatan-terpanjang',
    scope: 'indonesia',
    category: 'bangunan',
    badge: 'TERPANJANG 🌉',
    badgeEn: 'LONGEST 🌉',
    title: 'Jembatan Bentang Laut Terpanjang di Indonesia',
    titleEn: 'Longest Sea Bridge in Indonesia',
    holder: 'Jembatan Suramadu (Surabaya - Madura)',
    statValue: '5.438 meter (5,4 km)',
    statNumber: 5438,
    statUnit: 'meter',
    comparison: 'Panjangnya setara dengan berjalan kaki mengelilingi 14 lapangan sepak bola berturut-turut!',
    comparisonEn: 'Length equivalent to walking around 14 football fields back-to-back!',
    description: 'Jembatan Nasional Suramadu melintasi Selat Madura untuk menghubungkan Kota Surabaya di Pulau Jawa dengan Kabupaten Bangkalan di Pulau Madura.',
    descriptionEn: 'The Suramadu Bridge spans 5.4 kilometers across the Madura Strait, connecting Java and Madura islands.',
    funFact: 'Jembatan ini dirancang khusus dengan tiang kabel pancang (cable-stayed) yang sangat kuat agar kapal kargo besar tetap bisa lewat bebas di bawahnya!',
    funFactEn: 'Its cable-stayed main span provides high clearance so huge cargo ships can safely sail underneath!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#eff6ff"/>
      <!-- Sea -->
      <rect x="0" y="80" width="120" height="40" fill="#0284c7"/>
      <!-- Bridge deck -->
      <rect x="0" y="76" width="120" height="6" fill="#475569"/>
      <!-- Main Towers -->
      <polygon points="42,85 45,35 49,35 52,85" fill="#e2e8f0"/>
      <polygon points="68,85 71,35 75,35 78,85" fill="#e2e8f0"/>
      <!-- Stay Cables -->
      <line x1="47" y1="42" x2="15" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="47" y1="50" x2="25" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="47" y1="42" x2="60" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="73" y1="42" x2="60" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="73" y1="42" x2="105" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
      <line x1="73" y1="50" x2="95" y2="76" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Little cars -->
      <rect x="25" y="72" width="6" height="3" fill="#ef4444"/>
      <rect x="85" y="72" width="6" height="3" fill="#3b82f6"/>
    </svg>`
  },

  // ============================================================
  // SERBA TER- DI DUNIA (12 REKOR MENAKJUBKAN)
  // ============================================================
  {
    id: 'world-mobil-tercepat',
    scope: 'world',
    category: 'teknologi',
    badge: 'TERCEPAT 🏎️',
    badgeEn: 'FASTEST 🏎️',
    title: 'Mobil Tercepat di Dunia',
    titleEn: 'Fastest Production Car in the World',
    holder: 'Koenigsegg Jesko Absolut & Bugatti Bolide',
    statValue: '508+ km/jam',
    statNumber: 508,
    statUnit: 'km/jam',
    comparison: '5 kali lebih cepat dari batas maksimal kecepatan mobil di jalan tol Indonesia! Dalam 1 detik menempuh 141 meter!',
    comparisonEn: '5 times faster than highway speed limits! Covers 141 meters in a single second!',
    description: 'Koenigsegg Jesko Absolut dirancang dengan aerodinamika ekstrem seperti jet tempur darat untuk menembus kecepatan 500 km/jam dengan mesin twin-turbo V8 1.600 tenaga kuda.',
    descriptionEn: 'Engineered with hyper-aerodynamics and a 1,600 hp twin-turbo V8 engine designed to surpass 500 km/h.',
    funFact: 'Pada kecepatan 500 km/jam, ban mobil berputar sangat cepat hingga mengalami gaya gravitasi ribuan kali lipat dan membutuhkan karet serat khusus tahan panas!',
    funFactEn: 'At 500 km/h, the tires experience extreme centrifugal forces requiring aerospace-grade heat-resistant rubber!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="carGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="60%" stop-color="#06b6d4"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="#f8fafc"/>
      <!-- Asphalt Road -->
      <rect x="0" y="85" width="120" height="35" fill="#1e293b"/>
      <line x1="10" y1="102" x2="110" y2="102" stroke="#facc15" stroke-width="2" stroke-dasharray="8 6"/>
      <!-- Hypercar Profile -->
      <path d="M12 78 C15 72 28 66 40 65 L60 55 C70 54 85 58 96 68 L108 72 C114 74 114 78 112 80 L15 80 Z" fill="url(#carGrad)"/>
      <!-- Windshield -->
      <path d="M48 64 L62 57 C68 56 78 58 84 64 Z" fill="#0f172a"/>
      <!-- Rear wing spoiler -->
      <path d="M14 62 L24 64 L22 68 L12 66 Z" fill="#0f172a"/>
      <line x1="16" y1="66" x2="16" y2="76" stroke="#0f172a" stroke-width="2"/>
      <!-- Wheels -->
      <circle cx="34" cy="80" r="9" fill="#0f172a"/>
      <circle cx="34" cy="80" r="5" fill="#94a3b8"/>
      <circle cx="92" cy="80" r="9" fill="#0f172a"/>
      <circle cx="92" cy="80" r="5" fill="#94a3b8"/>
      <!-- Motion flames -->
      <polygon points="10,75 2,72 8,76 0,78 10,79" fill="#f97316"/>
    </svg>`
  },
  {
    id: 'world-palung-terdalam',
    scope: 'world',
    category: 'alam',
    badge: 'TERDALAM 🌊',
    badgeEn: 'DEEPEST 🌊',
    title: 'Titik Terdalam di Bumi',
    titleEn: 'Deepest Point on Earth',
    holder: 'Palung Mariana (Challenger Deep)',
    statValue: '10.994 meter (~11 km)',
    statNumber: 10994,
    statUnit: 'meter di bawah laut',
    comparison: 'Bila Gunung Everest dicelupkan ke dasarnya, puncak Everest masih tenggelam lebih dari 2 kilometer di bawah air!',
    comparisonEn: 'If Mount Everest were placed at the bottom, its peak would still be submerged over 2 kilometers under water!',
    description: 'Challenger Deep di Palung Mariana, Samudra Pasifik adalah titik terdalam di muka planet kita. Tekanan air di dasarnya mencapai lebih dari 1.000 kali tekanan di daratan biasa.',
    descriptionEn: 'Challenger Deep in the Mariana Trench is the absolute deepest point of Earth’s seabed, plunging nearly 11 kilometers deep.',
    funFact: 'Meskipun tekanannya mampu meremukkan mobil biasa dalam sekejap, para ilmuwan menemukan hewan-hewan tangguh seperti amphipoda raksasa dan ubur-ubur transparan hidup di sana!',
    funFactEn: 'Despite crushing pressure equivalent to 50 jumbo jets resting on a person, transparent jellyfish and specialized amphipods thrive there!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="marianaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0369a1"/>
          <stop offset="40%" stop-color="#082f49"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="url(#marianaGrad)"/>
      <!-- V-shaped Trench Walls -->
      <polygon points="0,30 45,115 0,115" fill="#0f172a"/>
      <polygon points="120,30 75,115 120,115" fill="#0f172a"/>
      <!-- Deep Sea Research Capsule (Trieste / Limiting Factor) -->
      <circle cx="60" cy="98" r="9" fill="#facc15"/>
      <circle cx="60" cy="98" r="4" fill="#0284c7"/>
      <!-- Searchlights -->
      <polygon points="56,104 42,118 78,118 64,104" fill="#fef08a" opacity="0.35"/>
      <!-- Inverted Everest silhouette for scale -->
      <polygon points="60,35 48,65 72,65" fill="#ffffff" opacity="0.25"/>
      <text x="60" y="55" font-size="8" fill="#bae6fd" text-anchor="middle" font-weight="bold">Everest</text>
    </svg>`
  },
  {
    id: 'world-hewan-terbesar',
    scope: 'world',
    category: 'hewan',
    badge: 'TERBESAR 🐋',
    badgeEn: 'LARGEST 🐋',
    title: 'Hewan Terbesar di Bumi Sepanjang Sejarah',
    titleEn: 'Largest Animal in Earth History',
    holder: 'Paus Biru (Blue Whale)',
    statValue: 'Panjang 30 Meter · Berat 180 Ton',
    statNumber: 180,
    statUnit: 'ton berat',
    comparison: 'Panjangnya setara 3 bus sekolah berjejer dan beratnya sama dengan 33 ekor gajah Afrika dewasa!',
    comparisonEn: 'Long as 3 school buses lined up and heavy as 33 adult African elephants combined!',
    description: 'Paus Biru adalah hewan terbesar yang pernah hidup di Bumi, bahkan lebih besar dan berat daripada dinosaurus raksasa mana pun yang pernah ada.',
    descriptionEn: 'The Blue Whale is the largest animal ever known to have lived on Earth, even surpassing the largest prehistoric dinosaurs.',
    funFact: 'Lidah paus biru saja beratnya sama dengan 1 ekor gajah (4 ton), dan ukuran jantungnya sebesar mobil city car dengan denyut yang bisa terdengar dari jarak 3 km!',
    funFactEn: 'A blue whale’s tongue alone weighs as much as an entire elephant, and its heart is the size of a compact car!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#e0f2fe"/>
      <!-- Ocean water -->
      <rect x="0" y="45" width="120" height="75" fill="#0284c7" opacity="0.2"/>
      <!-- Giant Blue Whale Body -->
      <path d="M12 68 C20 54 48 50 85 52 C104 53 112 60 114 66 C112 76 95 82 75 80 C50 82 25 80 12 68 Z" fill="#0284c7"/>
      <!-- Underbelly ridges -->
      <path d="M35 72 C50 78 75 78 85 74" stroke="#e0f2fe" stroke-width="2.5" fill="none"/>
      <!-- Tail fin -->
      <path d="M14 68 L4 58 C6 66 6 70 4 78 Z" fill="#0369a1"/>
      <!-- Eye & Smile -->
      <circle cx="102" cy="62" r="2" fill="#0f172a"/>
      <path d="M96 68 Q102 70 108 67" stroke="#0f172a" stroke-width="1.5" fill="none"/>
      <!-- Water Spout -->
      <path d="M85 52 Q82 32 78 24 M85 52 Q88 32 94 26" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" fill="none"/>
    </svg>`
  },
  {
    id: 'world-gedung-tertinggi',
    scope: 'world',
    category: 'bangunan',
    badge: 'TERTINGGI 🏢',
    badgeEn: 'TALLEST 🏢',
    title: 'Gedung / Struktur Tertinggi di Dunia',
    titleEn: 'Tallest Building in the World',
    holder: 'Burj Khalifa, Dubai, Uni Emirat Arab',
    statValue: '828 Meter (163 Lantai)',
    statNumber: 828,
    statUnit: 'meter tinggi',
    comparison: 'Tingginya 6 kali Monas Jakarta! Puncaknya bisa terlihat jelas dari jarak 95 kilometer!',
    comparisonEn: '6 times taller than Monas! Its tip can be seen from 95 kilometers away!',
    description: 'Burj Khalifa adalah pencakar langit megah di Dubai yang memecahkan rekor sebagai struktur buatan manusia tertinggi yang pernah dibangun di muka Bumi.',
    descriptionEn: 'Burj Khalifa in Dubai reigns as the tallest skyscraper and human-made structure ever constructed on Earth.',
    funFact: 'Saking tingginya gedung ini, orang di lantai teratas melihat matahari terbenam 3 menit lebih lambat daripada orang yang berdiri di lantai dasar!',
    funFactEn: 'Because of its immense height, people on the top floors witness sunset about 3 minutes later than those on the ground!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="skyTowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#f8fafc"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="url(#skyTowerGrad)"/>
      <!-- Clouds passing around middle -->
      <ellipse cx="30" cy="50" rx="18" ry="6" fill="#ffffff" opacity="0.8"/>
      <ellipse cx="90" cy="65" rx="20" ry="7" fill="#ffffff" opacity="0.8"/>
      <!-- Tower Spire & Stepped tiers -->
      <polygon points="59,10 61,10 62,30 58,30" fill="#cbd5e1"/>
      <polygon points="57,30 63,30 65,55 55,55" fill="#94a3b8"/>
      <polygon points="53,55 67,55 70,80 50,80" fill="#64748b"/>
      <polygon points="46,80 74,80 78,115 42,115" fill="#475569"/>
      <!-- Spire beacon light -->
      <circle cx="60" cy="8" r="2.5" fill="#ef4444"/>
    </svg>`
  },
  {
    id: 'world-hewan-tercepat',
    scope: 'world',
    category: 'hewan',
    badge: 'TERCEPAT 🐆',
    badgeEn: 'FASTEST 🐆',
    title: 'Hewan Darat Tercepat di Dunia',
    titleEn: 'Fastest Land Animal in the World',
    holder: 'Cheetah (Acinonyx jubatus)',
    statValue: '120 km/jam',
    statNumber: 120,
    statUnit: 'km/jam',
    comparison: 'Bisa melesat dari 0 ke 100 km/jam hanya dalam 3 detik, lebih cepat dari akselerasi mobil sport mewah!',
    comparisonEn: 'Accelerates from 0 to 100 km/h in just 3 seconds, faster than most sports cars!',
    description: 'Cheetah adalah predator anggun di savana Afrika dengan tubuh aerodinamis super ramping, cakar anti-selip, dan tulang belakang fleksibel seperti pegas.',
    descriptionEn: 'The cheetah is nature’s ultimate sprinter, designed with extreme agility, non-retractable claws, and a spring-like spine.',
    funFact: 'Saat berlari dengan kecepatan penuh, langkah kaki cheetah bisa mencapai jarak 7 meter dan tubuhnya melayang di udara separuh dari waktu berlarinya!',
    funFactEn: 'At top sprint, a cheetah’s stride covers up to 7 meters and it spends more than half its stride time airborne!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#fffbeb"/>
      <!-- Savanna ground -->
      <rect x="0" y="88" width="120" height="32" fill="#ca8a04"/>
      <!-- Running Cheetah Body -->
      <path d="M25 65 C40 55 68 55 85 62 C92 65 98 62 102 58 C104 62 100 68 95 70 C75 75 45 74 25 65 Z" fill="#eab308"/>
      <!-- Tail for balance -->
      <path d="M25 65 Q10 60 8 72" stroke="#ca8a04" stroke-width="4" stroke-linecap="round" fill="none"/>
      <!-- Spots -->
      <circle cx="45" cy="62" r="1.5" fill="#451a03"/>
      <circle cx="55" cy="60" r="1.5" fill="#451a03"/>
      <circle cx="68" cy="62" r="1.5" fill="#451a03"/>
      <circle cx="78" cy="64" r="1.5" fill="#451a03"/>
      <!-- Extended legs -->
      <line x1="88" y1="68" x2="105" y2="82" stroke="#ca8a04" stroke-width="3.5" stroke-linecap="round"/>
      <line x1="38" y1="68" x2="18" y2="84" stroke="#ca8a04" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Speed dust -->
      <circle cx="15" cy="85" r="3" fill="#fde047" opacity="0.6"/>
      <circle cx="8" cy="88" r="2" fill="#fde047" opacity="0.4"/>
    </svg>`
  },
  {
    id: 'world-burung-tercepat',
    scope: 'world',
    category: 'hewan',
    badge: 'TERCEPAT 🦅',
    badgeEn: 'FASTEST 🦅',
    title: 'Hewan / Makhluk Hidup Tercepat di Udara',
    titleEn: 'Fastest Bird & Animal in Flight',
    holder: 'Elang Alap-alap Kawah (Peregrine Falcon)',
    statValue: '389 km/jam',
    statNumber: 389,
    statUnit: 'km/jam saat menukik',
    comparison: 'Lebih cepat dari mobil balap Formula 1 dan kereta peluru saat menukik dari langit!',
    comparisonEn: 'Faster than a Formula 1 racing car when diving from the sky!',
    description: 'Elang Peregrine Falcon adalah raja kecepatan udara. Saat melihat mangsa dari ketinggian, burung ini melipat sayapnya dan menukik deras menembus angin.',
    descriptionEn: 'The Peregrine Falcon is the fastest animal on the planet, reaching breathtaking dive speeds exceeding 380 km/h.',
    funFact: 'Hidung elang ini memiliki kerucut kecil khusus yang mengatur aliran udara berkecepatan tinggi agar paru-parunya tidak meledak saat bernapas di kecepatan 380 km/jam!',
    funFactEn: 'Its nostrils feature specialized baffles that regulate air intake so it can breathe normally at 380 km/h!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#f0fdfa"/>
      <!-- Clouds -->
      <ellipse cx="25" cy="30" rx="14" ry="6" fill="#ccfbf1"/>
      <ellipse cx="95" cy="45" rx="16" ry="6" fill="#ccfbf1"/>
      <!-- Falcon in Aero Dive -->
      <!-- Wings swept back -->
      <path d="M60 40 L30 75 L55 65 Z" fill="#334155"/>
      <path d="M60 40 L90 75 L65 65 Z" fill="#334155"/>
      <!-- Sleek Body -->
      <ellipse cx="60" cy="55" rx="8" ry="18" fill="#475569"/>
      <!-- Sharp Beak -->
      <polygon points="58,36 62,36 60,30" fill="#f59e0b"/>
      <!-- Eyes -->
      <circle cx="57" cy="38" r="1.5" fill="#0f172a"/>
      <circle cx="63" cy="38" r="1.5" fill="#0f172a"/>
      <!-- Tail -->
      <polygon points="56,73 64,73 60,82" fill="#1e293b"/>
      <!-- Speed Wind Streaks -->
      <line x1="40" y1="20" x2="40" y2="45" stroke="#0d9488" stroke-width="2" stroke-linecap="round"/>
      <line x1="80" y1="25" x2="80" y2="50" stroke="#0d9488" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'world-samudra-terluas',
    scope: 'world',
    category: 'alam',
    badge: 'TERLUAS 🌊',
    badgeEn: 'LARGEST 🌊',
    title: 'Samudra / Laut Terluas di Dunia',
    titleEn: 'Largest Ocean in the World',
    holder: 'Samudra Pasifik (Pacific Ocean)',
    statValue: '165,2 Juta km²',
    statNumber: 165,
    statUnit: 'juta km²',
    comparison: 'Lebih luas dari seluruh gabungan seluruh daratan 7 benua di planet Bumi!',
    comparisonEn: 'Larger than all the landmasses on Earth combined!',
    description: 'Samudra Pasifik membentang luas dari pesisir benua Asia dan Australia hingga ke benua Amerika, mencakup sekitar 32% dari seluruh luas permukaan Bumi.',
    descriptionEn: 'The Pacific Ocean covers over 30% of Earth’s surface, holding over half of the world’s open water.',
    funFact: 'Nama "Pasifik" diberikan oleh penjelajah Ferdinand Magellan yang berarti "damai dan tenang" karena airnya yang begitu tenang saat pertama kali ia lewati.',
    funFactEn: 'Named by explorer Ferdinand Magellan, "Pacific" translates to peaceful due to its calm waters when he first crossed it.',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#e0f2fe"/>
      <!-- Globe Globe Circle -->
      <circle cx="60" cy="60" r="42" fill="#0284c7"/>
      <!-- Continents Rim (Asia on left, Americas on right) -->
      <path d="M22 45 Q30 55 24 75 Q18 80 20 90 A42 42 0 0 1 20 40 Z" fill="#15803d"/>
      <path d="M100 40 Q94 60 98 80 Q104 85 102 92 A42 42 0 0 0 100 40 Z" fill="#15803d"/>
      <!-- Pacific Waves in Center -->
      <path d="M38 52 Q50 48 62 52 T86 52" stroke="#bae6fd" stroke-width="2.5" fill="none"/>
      <path d="M34 68 Q46 64 58 68 T82 68" stroke="#bae6fd" stroke-width="2.5" fill="none"/>
      <!-- Compass Star -->
      <polygon points="60,28 62,34 68,36 62,38 60,44 58,38 52,36 58,34" fill="#facc15"/>
    </svg>`
  },
  {
    id: 'world-gunung-tertinggi',
    scope: 'world',
    category: 'alam',
    badge: 'TERTINGGI 🏔️',
    badgeEn: 'HIGHEST 🏔️',
    title: 'Gunung Tertinggi di Dunia',
    titleEn: 'Highest Mountain in the World',
    holder: 'Gunung Everest (Sagarmatha / Chomolungma)',
    statValue: '8.848,86 mdpl',
    statNumber: 8848,
    statUnit: 'mdpl (meter)',
    comparison: 'Tingginya hampir 9 kilometer! Setara dengan ketinggian pesawat jet komersial saat terbang melintasi benua!',
    comparisonEn: 'Nearly 9 km tall! Same altitude where commercial jetliners cruise through the stratosphere!',
    description: 'Gunung Everest di Pegunungan Himalaya (perbatasan Nepal dan Tibet) adalah titik elevasi tertinggi di permukaan Bumi di atas permukaan laut.',
    descriptionEn: 'Mount Everest in the Himalayas is Earth’s highest mountain above sea level, reaching 8,848.86 meters.',
    funFact: 'Karena pergerakan lempeng benua India yang terus mendorong lempeng Asia, Gunung Everest terus bertambah tinggi sekitar 4 milimeter setiap tahunnya!',
    funFactEn: 'Due to tectonic plate collision, Mount Everest grows about 4 millimeters taller every single year!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <defs>
        <linearGradient id="evGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="24" fill="url(#evGrad)"/>
      <!-- Sun behind peak -->
      <circle cx="60" cy="30" r="14" fill="#fbbf24"/>
      <!-- Giant Everest Peak -->
      <polygon points="10,110 60,26 110,110" fill="#334155"/>
      <polygon points="60,26 110,110 80,110 60,60" fill="#1e293b"/>
      <!-- Snow Glacier Summit -->
      <polygon points="46,55 60,26 74,55 66,50 60,56 54,49" fill="#ffffff"/>
      <polygon points="50,70 60,26 70,70 60,60" fill="#f8fafc" opacity="0.6"/>
      <!-- Flying Prayer Flags -->
      <path d="M35 85 Q60 88 85 85" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 4" fill="none"/>
    </svg>`
  },
  {
    id: 'world-pesawat-tercepat',
    scope: 'world',
    category: 'teknologi',
    badge: 'TERCEPAT ✈️',
    badgeEn: 'FASTEST ✈️',
    title: 'Pesawat Jet Berawak Tercepat di Dunia',
    titleEn: 'Fastest Manned Jet Airplane in the World',
    holder: 'Lockheed SR-71 Blackbird',
    statValue: '3.529 km/jam (Mach 3.3)',
    statNumber: 3529,
    statUnit: 'km/jam',
    comparison: 'Lebih cepat dari kecepatan peluru senapan! Bisa terbang dari Jakarta ke Surabaya hanya dalam 12 menit!',
    comparisonEn: 'Faster than a rifle bullet! Could fly from Jakarta to Surabaya in only 12 minutes!',
    description: 'SR-71 Blackbird adalah mahakarya penerbangan supersonik yang mampu terbang di ketinggian 25.000 meter di batas atmosfer luar dengan kecepatan lebih dari 3 kali kecepatan suara.',
    descriptionEn: 'The SR-71 Blackbird holds the official world record for the fastest air-breathing manned aircraft at Mach 3.3.',
    funFact: 'Saking cepatnya, gesekan udara membuat badan pesawat menjadi sangat panas hingga 300°C sehingga seluruh bodinya dibuat dari logam titanium khusus!',
    funFactEn: 'Atmospheric friction heated its outer skin to over 300°C, requiring an airframe built entirely of specialized titanium!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#0f172a"/>
      <!-- Stars in space boundary -->
      <circle cx="20" cy="20" r="1.5" fill="#ffffff"/>
      <circle cx="100" cy="25" r="1.5" fill="#ffffff"/>
      <circle cx="85" cy="15" r="1" fill="#ffffff"/>
      <!-- SR-71 Blackbird Silhouette -->
      <path d="M60 20 L66 45 L95 75 L75 80 L66 70 L60 85 L54 70 L45 80 L25 75 L54 45 Z" fill="#334155"/>
      <ellipse cx="60" cy="40" rx="3" ry="12" fill="#020617"/>
      <!-- Twin Jet Afterburners -->
      <circle cx="48" cy="74" r="3" fill="#f97316"/>
      <polygon points="46,76 50,76 48,88" fill="#facc15"/>
      <circle cx="72" cy="74" r="3" fill="#f97316"/>
      <polygon points="70,76 74,76 72,88" fill="#facc15"/>
      <!-- Supersonic Mach Shockwaves -->
      <path d="M40 35 L15 65" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M80 35 L105 65" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: 'world-gurun-terluas',
    scope: 'world',
    category: 'alam',
    badge: 'TERLUAS 🏜️',
    badgeEn: 'LARGEST 🏜️',
    title: 'Gurun Pasir Panas Terluas di Dunia',
    titleEn: 'Largest Hot Desert in the World',
    holder: 'Gurun Sahara, Benua Afrika',
    statValue: '9,2 Juta km²',
    statNumber: 92,
    statUnit: 'juta km²',
    comparison: 'Hampir sebesar seluruh negara Amerika Serikat dan hampir 5 kali luas seluruh daratan Indonesia!',
    comparisonEn: 'Almost as large as the entire United States and 5 times the land area of Indonesia!',
    description: 'Gurun Sahara membentang melintasi 11 negara di Afrika Utara dengan bukit pasir raksasa yang tingginya bisa mencapai 180 meter.',
    descriptionEn: 'The Sahara Desert spans across 11 countries in North Africa, featuring towering sand dunes up to 180 meters tall.',
    funFact: 'Ribuan tahun yang lalu, Gurun Sahara dulunya adalah padang rumput hijau yang subur dengan danau-danau besar dan dihoni gajah serta jerapah!',
    funFactEn: 'Thousands of years ago, the Sahara was a lush green savannah with huge lakes, elephants, and giraffes!',
    svgIcon: `<svg viewBox="0 0 120 120" class="record-svg" aria-hidden="true">
      <rect width="120" height="120" rx="24" fill="#fffbeb"/>
      <!-- Blazing Sun -->
      <circle cx="85" cy="30" r="14" fill="#f59e0b"/>
      <!-- Rolling Sand Dunes -->
      <path d="M0 65 Q40 45 80 70 Q105 60 120 75 L120 120 L0 120 Z" fill="#d97706"/>
      <path d="M0 80 Q35 65 70 85 Q100 75 120 90 L120 120 L0 120 Z" fill="#b45309"/>
      <!-- Camel Silhouette -->
      <ellipse cx="42" cy="72" rx="6" ry="4" fill="#78350f"/>
      <ellipse cx="40" cy="67" rx="3" ry="4" fill="#78350f"/>
      <path d="M46 72 Q50 68 50 63" stroke="#78350f" stroke-width="2" fill="none"/>
      <!-- Legs -->
      <line x1="39" y1="75" x2="38" y2="84" stroke="#78350f" stroke-width="1.5"/>
      <line x1="45" y1="75" x2="46" y2="84" stroke="#78350f" stroke-width="1.5"/>
    </svg>`
  }
];

// ============================================================
// DATA KUIS TEBAK REKOR INTERAKTIF (5 SOAL SERU BERHADIAH BINTANG ⭐)
// ============================================================
export const RECORD_QUIZZES = [
  {
    id: 'quiz-rekor-1',
    question: 'Kendaraan manakah yang saat ini memegang rekor sebagai MOBIL TERCEPAT di dunia dengan kecepatan lebih dari 500 km/jam?',
    questionEn: 'Which vehicle holds the world record as the FASTEST CAR in the world at over 500 km/h?',
    options: [
      { text: 'Koenigsegg Jesko Absolut / Bugatti Bolide', correct: true },
      { text: 'Mobil Sedan Listrik Keluarga', correct: false },
      { text: 'Bus Sekolah Wisata', correct: false }
    ],
    explanation: 'Hebat sekali! Koenigsegg Jesko Absolut dan Bugatti Bolide dirancang khusus dengan tenaga lebih dari 1.600 HP untuk menembus kecepatan 500 km/jam!',
    explanationEn: 'Spot on! Koenigsegg Jesko Absolut and Bugatti Bolide are engineered with over 1,600 HP to breach 500 km/h!'
  },
  {
    id: 'quiz-rekor-2',
    question: 'Di antara danau-danau di Indonesia, danau manakah yang dinobatkan sebagai danau PALING DALAM hingga mencapai 590 meter?',
    questionEn: 'Among all lakes in Indonesia, which one is crowned the DEEPEST LAKE reaching 590 meters deep?',
    options: [
      { text: 'Danau Toba (Sumatera Utara)', correct: false },
      { text: 'Danau Matano (Sulawesi Selatan)', correct: true },
      { text: 'Danau Bedugul (Bali)', correct: false }
    ],
    explanation: 'Tepat sekali! Danau Matano di Sulawesi Selatan adalah danau terdalam di Indonesia dan Asia Tenggara (590 meter), sedangkan Danau Toba adalah danau terluas!',
    explanationEn: 'Correct! Lake Matano in South Sulawesi is the deepest lake in Southeast Asia (590m), while Lake Toba is the largest!'
  },
  {
    id: 'quiz-rekor-3',
    question: 'Hewan apakah yang dinobatkan sebagai makhluk hidup PALING BESAR di Bumi sepanjang sejarah, bahkan mengalahkan dinosaurus?',
    questionEn: 'Which animal is crowned the LARGEST LIVING CREATURE in Earth history, surpassing even all dinosaurs?',
    options: [
      { text: 'Gajah Afrika Raksasa', correct: false },
      { text: 'Paus Biru (Blue Whale)', correct: true },
      { text: 'Hiu Paus Pemakan Plankton', correct: false }
    ],
    explanation: 'Luar biasa! Paus Biru memiliki panjang hingga 30 meter dan berat 180 ton, menjadikannya hewan terbesar sepanjang masa di planet Bumi!',
    explanationEn: 'Brilliant! The Blue Whale reaches 30 meters long and 180 tons, making it the largest creature ever on Earth!'
  },
  {
    id: 'quiz-rekor-4',
    question: 'Titik manakah di planet Bumi yang dinobatkan sebagai PALUNG LAUT TERDALAM hingga kedalaman hampir 11.000 meter?',
    questionEn: 'Which trench on Earth is crowned the DEEPEST SEABED POINT, plunging nearly 11,000 meters deep?',
    options: [
      { text: 'Palung Mariana (Challenger Deep)', correct: true },
      { text: 'Palung Selat Sunda', correct: false },
      { text: 'Palung Laut Jawa', correct: false }
    ],
    explanation: 'Benar sekali! Palung Mariana di Samudra Pasifik sedalam 10.994 meter. Andaikan Gunung Everest dicelupkan ke dasarnya, puncaknya masih tertutup air 2 km!',
    explanationEn: 'Correct! The Mariana Trench is 10,994m deep. Even Mount Everest would be submerged under 2 kilometers of water!'
  },
  {
    id: 'quiz-rekor-5',
    question: 'Kereta api cepat komersial pertama di Indonesia dan Asia Tenggara yang mampu melaju hingga 350 km/jam adalah?',
    questionEn: 'What is the first commercial bullet train in Indonesia and Southeast Asia reaching 350 km/h?',
    options: [
      { text: 'Kereta Cepat Whoosh', correct: true },
      { text: 'Kereta Uap Wisata', correct: false },
      { text: 'Kereta Rel Listrik Komuter', correct: false }
    ],
    explanation: 'Hebat! Kereta Cepat Whoosh mampu melesat 350 km/jam dan memangkas waktu tempuh Jakarta-Bandung menjadi hanya 45 menit!',
    explanationEn: 'Awesome! Whoosh speeds at 350 km/h, cutting the journey between Jakarta and Bandung to just 45 minutes!'
  }
];
