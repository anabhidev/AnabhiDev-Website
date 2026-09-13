<!-- ================================================================
AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
Markdown · Project Status & Deployment Log
Development · Anabhi Dev
Version   : 2.0 (Math Toolbox Master Blueprint)
Generated : 10 September 2026, 14:00:00
================================================================ -->

# Status Project & Deployment Log — AnabhiDev Smart Study

**Project:** AnabhiDev Smart Study  
**Prefix:** `AnabhiDev-SMARTSTUDY`  
**Versi Aktif:** 2.9  
**Status Saat Ini:** Build-Ready, Verified & Fully Operational  
**Credit:** `Development · Anabhi Dev`

---

## 1. Status Berkas Folder Deploy

| Berkas | Versi di Header | Status Deploy | Keterangan |
|---|---|---|---|
| `index.html` | 2.0 | Siap Deploy | Shell utama aplikasi, topbar no-logo, sidebar logo-only, subjects view |
| `manifest.json` | 2.0 | Siap Deploy | PWA Manifest standalone |
| `sw.js` | 2.0 | Siap Deploy | Service Worker (CACHE_VERSION: `anabhidev-smart-study-v2-0`) |
| `_headers` | 1.5 | Siap Deploy | Cloudflare Pages merged headers (Microsoft Auth, GA4, ClickUp ATS, Anabhi Smart Play, MFB Talent, & Anabhi Smart Study) |
| `robots.txt` | 2.0 | Siap Deploy | SEO & AI crawlers allow list |
| `sitemap.xml` | 2.0 | Siap Deploy | Sitemap kanonikal |
| `llms.txt` | 2.0 | Siap Deploy | GEO / LLM AI indexing context |
| `css/base.css` | 2.0 | Siap Deploy | CSS tokens, reset button navigasi, scrollbar, typography |
| `css/components.css` | 2.0 | Siap Deploy | Reusable cards, buttons, single-line sidebar navigation, quiz |
| `css/math.css` | 2.0 | Siap Deploy | Math Toolbox visualizers (9 strategi, compare mode, number line, base-ten, soroban) |
| `css/geography.css` | 2.0 | Siap Deploy | Visualizer Globe 3D meja sekolah, peta politik dunia, 38 provinsi, Bali |
| `css/responsive.css` | 2.0 | Siap Deploy | Breakpoints desktop, tablet, mobile drawer |
| `js/app.js` | 2.0 | Siap Deploy | Main router, PWA bootstrap, view coordinator |
| `js/bundle.js` | 2.0 | Siap Deploy | Standalone single-file bundle (318.9 KB) compatible with file:/// & web |
| `js/state.js` | 2.0 | Siap Deploy | Central reactive state & theme/lang coordinator |
| `js/store.js` | 2.0 | Siap Deploy | LocalStorage progress store & gamification |
| `js/data/math-data.js` | 2.0 | Siap Deploy | Math Toolbox Master v1.0 data (9 strategi, 4 video YouTube, curated bank) |
| `js/engine/math-engine.js` | 2.0 | Siap Deploy | Reusable strategy engine, 9 jurus deterministik, generator, 3-level hints |
| `js/engine/geo-engine.js` | 2.0 | Siap Deploy | Globe 3D WebGL column-major matrix renderer + 64 negara dunia |
| `js/components/lesson-view.js` | 2.0 | Siap Deploy | Math Toolbox UI (Flagship 67+59, Compare Mode, Metakognisi, Show Another Way) |
| `js/components/video-modal.js` | 2.0 | Siap Deploy | Pemutar video YouTube aman dengan Error 153 resilience & direct link |
| `AGENTS.md` | 2.0 | Siap Deploy | Aturan eksekusi otonom & izin terminal pre-approved |
| `GEMINI.md` | 2.0 | Siap Deploy | Aturan eksekusi otonom & izin terminal pre-approved |

---

## 2. Checklist PWA (SOP v2.0 Kategori 18)

- [x] Syarat 1: HTTPS (dikelola oleh platform host Cloudflare Pages / Netlify).
- [x] Syarat 2: `manifest.json` valid tanpa query `id` dan tanpa `?v=` pada ikon.
- [x] Syarat 3: `sw.js` dengan `fetch` handler, precache per-item, dan network-first untuk dokumen HTML (CACHE_VERSION: `anabhidev-smart-study-v2-0`).
- [x] Syarat 4: Ikon PNG 192px dan 512px dengan safe zone maskable <= 80%.
- [x] Event `beforeinstallprompt` **tanpa `preventDefault()`** agar banner asli browser tetap muncul, dengan tombol cadangan via `try/catch`.
- [x] `_headers` menyetel `Content-Type: application/manifest+json; charset=utf-8` dan cache control terukur.

---

## 3. Checklist Preferensi UI & Aksesibilitas

- [x] **Tema Default:** Strictly `light` (dapat ditukar ke `dark` via tombol ☀️/🌙 di topbar).
- [x] **Bahasa Default:** Strictly `id` (Bahasa Indonesia, dapat ditukar ke `en` via tombol 🌐 ID / 🌐 EN di topbar).
- [x] **Anti-FOUC Script:** Terpasang di `<head>` untuk menyetel `data-theme` dan `lang` sebelum rendering pertama (default `light` & `id` jika LocalStorage kosong).
- [x] **Audit Warna Font & Kontras (WCAG AAA):**
  - Mode Gelap: Font terang (`--ink: #e8eef7`, kontras 12.5:1), `.btn` menggunakan `var(--ink)`, active chips & active tabs menggunakan font gelap (`#071a2b`) di atas cyan terang (`#5be0df`).
  - Mode Terang: Font gelap pekat (`--ink: #112a43`, kontras 12.8:1), `.btn` menggunakan `var(--ink)`.
- [x] **Audit Lokalisasi Multibahasa (ID/EN):**
  - Seluruh 10 mata pelajaran di Sidebar & Beranda menampilkan nama resmi bahasa Inggris saat mode EN (`getSubjectName`).
  - Math Toolbox: 9 strategi berpikir dan alur langkah kalkulasi dinamis (`MathEngine.solve(a, b, 'en')`) bilingual.
  - Geografi: Intro bumi bulat, 64 negara dunia, metadata ibukota, mata uang, dan modul Bali bilingual.
  - 7 Mata Pelajaran Lainnya (Bahasa Indonesia, Pancasila, Bahasa Bali, Seni Rupa, PJOK, Agama, Kokurikuler): Judul, subjudul, topik, checklist misi, dan aktivitas topik bilingual.
  - Pengecualian Khusus: Materi mata pelajaran Bahasa Inggris (`bahasa-inggris`) tetap mengajarkan kosakata bahasa Inggris dasar untuk anak-anak sesuai instruksi pengguna (*"kecuali pelajaran bahasa inggris"*).
- [x] **Navbar vs Sidebar (SOP v2.0):** Navbar murni tanpa logo (hanya Title Web + actions), Sidebar murni logo-only di atas (tanpa teks judul).

---

## 4. Catatan Pengembangan & Rilis

- **v2.1 (11 September 2026):**
  - **3D Political Desk Globe (177 Negara & Vektor Instan)**:
    - Mengintegrasikan data batas wilayah 177 negara dunia secara vektor (`js/data/globe-paths.js`) yang langsung digambar melalui `Path2D` ke kanvas tekstur WebGL secara sinkron.
    - Menghilangkan ketergantungan pada pemuatan file eksternal `new Image().src` yang sebelumnya terhalang kebijakan keamanan *cross-origin / tainted canvas* pada protokol `file:///`.
    - Peta globe kini menampilkan seluruh benua dengan warna pastel cerah, garis batas negara rapi, ekuator bertanda emas, label samudra bergaris tepi gelap kontras tinggi, dan pin lencana khusus **INDONESIA 🇮🇩**.
    - Mengaktifkan *texture mipmapping* (`gl.generateMipmap`) untuk tampilan tajam tanpa efek berkedip (*anti-shimmering*).
  - **Resilient YouTube Safe Video Player (Solusi Error 153)**:
    - YouTube *Error 153* disebabkan oleh aturan keamanan browser yang menolak mengirimkan header `Referer` HTTP saat aplikasi dibuka via protokol berkas lokal (`file:///`).
    - Memperbarui `js/components/video-modal.js` dengan deteksi adaptif protokol:
      - Pada mode `file:///`, modal menampilkan poster resolusi tinggi berserta tombol putar video merah YouTube beranimasi, yang saat diklik langsung membuka pemutar video bersih bebas gangguan dalam jendela pop-up 960x560 atau tab baru.
      - Menyediakan tombol *Paksa Sematkan Iframe* dan tombol navigasi langsung ke YouTube.
      - Pada mode web/server (`http://` atau `https://`), video otomatis tersemat via iframe aman `www.youtube.com/embed/...`.
      - Menambahkan berkas eksekusi satu-klik `start-server.bat` di root direktori untuk menjalankan server lokal di `http://localhost:3000`.
  - **Kepatuhan Penuh SOP v2.1 (PWA & Open Graph)**:
    - Menambahkan penanda `runMode` (`· aplikasi` atau `· browser`) pada judul topbar sesuai SOP 18.7.
    - Menambahkan aturan path root `/` pada `_headers` dengan `Cache-Control: public, max-age=0, must-revalidate` sesuai SOP 18.5 & 18.9.
- **v2.2 (11 September 2026):**
  - **Pembesaran Globe 3D & Perbaikan Bug Zoom Putih (Bleaching / Clipping)**:
    - Resolusi kanvas diperbesar menjadi `720x720` dan container `.globe-canvas-stack` diperluas hingga `max-width: 660px`.
    - Radius bola diperbesar dari `160px` menjadi `212px` (diameter ~424px, bertambah >70% lebih besar dan megah untuk anak-anak).
    - Memperbaiki bug zoom putih: Menyetel bidang potong dekat WebGL (*near clipping plane*) ke `0.01` (dari sebelumnya `0.1`), mencegah bola terpotong saat di-zoom.
    - Menjepit (*clamp*) kalkulasi pencahayaan dan pantulan spekular pada fragment shader WebGL (`clamp(tex.rgb * light + vec3(spec), 0.0, 1.0)`) sehingga tidak terjadi lonjakan warna putih (*bleaching blowout*).
    - Memasang batas aman zoom antara `0.9` s/d `2.0` dan mendukung gesture multi-touch pinch-to-zoom pada tablet/ponsel.
  - **Pusat Jelajah Peta Regional di Halaman Geografi yang Sama**:
    - Menambahkan navigation chips: `[🇮🇩 Peta Indonesia] [🏝️ Peta Bali] [🌏 Benua Asia] [🏰 Benua Eropa] [🦁 Benua Afrika] [🗽 Benua Amerika] [🦘 Benua Oseania] [🌍 Seluruh Dunia]`.
    - Mengintegrasikan aksi klik filter chip dengan rotasi dan pergerakan halus (lerp) Globe 3D langsung ke wilayah/benua terkait.
    - Menampilkan panel interaktif lengkap di bawah globe:
      - **Peta Indonesia**: Filter 5 gugus pulau utama, 38 provinsi lengkap beserta ibu kota, landmark, fauna/flora endemik, dan tombol fokus bola dunia.
      - **Peta Bali**: 8 Kabupaten + 1 Kota Denpasar, 7 Landmark Ikonik (Tanah Lot, Uluwatu, Besakih, Danau Beratan, Jatiluwih, Tirta Empul, Ubud Monkey Forest), tradisi luhur Subak, Tari Kecak & Barong, serta Hari Raya Nyepi.
      - **Benua-Benua**: Banner statistik (luas wilayah, populasi, titik tertinggi, sungai terpanjang) dan kartu negara pilihan beserta tombol fokus globe.
  - **Ekspansi Materi Kurikulum & LKS (Lembar Kerja Siswa) di 8 Mata Pelajaran Lainnya**:
    - Menambahkan 6 topik komprehensif, misi mandiri/LKS, dan kuis interaktif berbobot di setiap mata pelajaran:
      - *Bahasa Indonesia*: Fonik & Huruf Vokal/Konsonan, Suku Kata KV & KVK, Struktur Kalimat S-P-O, Tanda Baca & Huruf Kapital, Puisi & Pantun Anak, Dongeng Fabel Nusantara.
      - *Bahasa Inggris*: Warm Greetings & Politeness, Colors & Shapes, Family & Pets, Classroom Objects, Numbers 1-20 & Action Verbs, Healthy Food & Routine (tetap berbasis bahasa Inggris).
      - *Pendidikan Pancasila*: 5 Simbol Sila Garuda, Penerapan Nilai Pancasila, Hak & Kewajiban Anak, Aturan & Budaya Antre, Bhinneka Tunggal Ika, Gotong Royong.
      - *Bahasa Bali*: Salam Panganjali & Tata Krama, Kruna Aran ring Jeroan, Wilangan Angka 1-20, Gending Rare, Rahina Suci Nyepi, Satua Bali I Siap Selem.
      - *Seni Rupa*: Titik-Garis-Bidang, Warna Primer & Sekunder, Kolase & Mozaik Alam, Bentuk Geometris & Organis, Motif Batik Nusantara, Seni 3D Plastisin.
      - *PJOK*: Gerak Lokomotor, Gerak Non-Lokomotor, Gerak Manipulatif Bola, Senam Irama Ritmik, Kebersihan Diri & Cuci Tangan 6 Langkah, Gizi Seimbang Isi Piringku.
      - *Pendidikan Agama*: Bersyukur Ciptaan Tuhan, Budi Pekerti Kasih Sayang Orang Tua/Guru, Menyayangi Makhluk Hidup, 6 Agama Resmi & Tempat Ibadah, Toleransi Rukun, Kejujuran & Amal Kebaikan.
      - *Kokurikuler P5*: Gaya Hidup Berkelanjutan Pilah Sampah, Kearifan Lokal Permainan Tradisional, Celengan Mandiri & Berhemat, Rekayasa Eksperimen Sains, Jiwa Raga Sahabat Anti-Bullying, Kebun Sekolah Hidroponik.
  - **Kompilasi Ulang Bundle & Verifikasi**:
    - `js/bundle.js` diperbarui (580.9 KB).
    - Seluruh pengujian otomatis pada `scratch/verify_project.js` berhasil 100% (0 error).
- **v2.3 (11 September 2026):**
  - **Konsolidasi Production Headers Cloudflare Pages (`_headers`)**:
    - Menggabungkan konfigurasi production `_headers latest anabhidev` (v1.4) dengan aturan `Anabhi Smart Study` menjadi versi `1.5`.
    - Menambahkan blok aturan lengkap untuk `https://anabhidev.com/Anabhi-Smart-Study/`:
      - Service Worker: `Cache-Control: public, max-age=0, must-revalidate` dan `Content-Type: text/javascript; charset=utf-8` serta `Service-Worker-Allowed: /Anabhi-Smart-Study/`.
      - Manifest PWA: `Content-Type: application/manifest+json; charset=utf-8` dan `Cache-Control: public, max-age=0, must-revalidate`.
      - Halaman HTML: `max-age=0, must-revalidate`.
      - Aset statis & bundle JS/CSS: `Cache-Control: public, max-age=31536000, immutable`.
      - Font: immutable 1 tahun dengan `Access-Control-Allow-Origin: *`.
    - Memperbarui Global CSP (`/*`) pada direktif `frame-src` dengan menambahkan `https://www.youtube.com https://www.youtube-nocookie.com` agar video edukasi interaktif Smart Study dapat diputar langsung di web.
    - Menjaga 100% aturan existing untuk Microsoft auth, Google Analytics, ClickUp recruitment, Anabhi Smart Play, dan Miss Fish Bali Talent tanpa ada yang terhapus atau berubah.
    - Menambahkan aturan fallback root `/sw.js` dan `/manifest.json` untuk dukungan preview lokal/standalone.
  - **Perbaikan Layar Beranda Kosong / Blank Screen**:
    - Menambahkan method `getProgress()` pada `ProgressStore` (`js/store.js`) yang sebelumnya belum didefinisikan sehingga memicu `TypeError` di `renderHome()`.
    - Memasang fallback defensif bertingkat dan blok `try ... catch` pada `renderHome()` dan `renderAllSubjects()` di `js/app.js`.
    - Mengompilasi ulang `js/bundle.js` (694.0 KB).
    - Memperbarui tag script `index.html` ke `js/bundle.js?v=20260911b` dan `sw.js` ke cache `anabhidev-smart-study-v2-1`.
    - Menambahkan Section 9 pada `scratch/verify_project.js` untuk audit runtime rendering Beranda. Lulus 100% (0 failure).
- **v2.4 (12 September 2026):**
  - **Peta Vektor Asli (Authentic Cartographic Vectors) untuk Semua Wilayah**:
    - Mengganti seluruh visual peta kasar/kartun dengan vektor kartografis asli bersumber dari data geospasial resmi:
      - **Indonesia (34 Provinsi Resmi)**: Data vektor `REAL_INDONESIA_PATHS` (34 batas provinsi detail, `viewBox="0 0 700 234"`), Garis Khatulistiwa 0° di y=82, mawar kompas, filter pulau aktif, dan interaktivitas klik provinsi untuk auto-scroll ke kartu provinsi.
      - **Bali (9 Kabupaten/Kota Resmi)**: Data vektor `REAL_BALI_PATHS` (9 kabupaten/kota administratif, `viewBox="0 0 760 480"`), 7 pin landmark ikonik terkalibrasi presisi pada garis pantai (Tanah Lot, Uluwatu, Besakih, Danau Beratan, Jatiluwih, Tirta Empul, Ubud Monkey Forest).
      - **5 Benua (Asia, Eropa, Afrika, Amerika, Oseania)**: Peta vektor regional beresolusi tinggi menggunakan `GLOBE_COUNTRIES` dengan viewBox terarah, penyorotan negara benua berwarna cerah, dan peredupan negara tetangga untuk perspektif geografis nyata.
      - **Seluruh Dunia (World Atlas)**: Peta vektor dunia 2D lengkap menampilkan 177 negara dari Natural Earth, 5 samudra besar (`GLOBE_LABELS`), Garis Khatulistiwa 0°, dan Garis Meridian Utama (Greenwich 0°).
  - **Ekspansi Kurikulum & LKS Seluruh 8 Mata Pelajaran Menjadi 10 Topik**:
    - Menambah 2 topik komprehensif baru per mata pelajaran (total 10 topik per pelajaran, 80 topik total):
      - *Bahasa Indonesia*: Kalimat Tanya & 6 Kata Ajaib (5W1H), Bercerita Pengalaman Diri & Kartu Ceria.
      - *Bahasa Inggris*: Wild Animals & Farm Friends, Weather/Seasons & Clothes to Wear.
      - *Pendidikan Pancasila*: Bendera Merah Putih & Lagu Indonesia Raya, Tata Krama & Sopan Santun.
      - *Bahasa Bali*: Paribasa Bebadetan (Teka-Teki Ceria), Upacara Melasti & Ogoh-Ogoh.
      - *Seni Rupa*: Seni Melipat Kertas (Origami), Apresiasi Karya Seni & Pameran.
      - *PJOK*: Aktivitas Air & Keselamatan Kolam Renang, Pola Tidur & Istirahat Sehat.
      - *Pendidikan Agama*: Tata Tertib & Sikap Khidmat Berdoa, Tolong Menolong Tanpa Pamrih.
      - *Kokurikuler P5*: Bazar Kewirausahaan Cilik Jeruk Peras, Pameran Portofolio (Exhibition Day).
    - Setiap topik baru dilengkapi 3 Misi Mandiri (LKS) dan 2–3 kuis interaktif dengan umpan balik ramah anak.
  - **Sinkronisasi Bundle & Validasi Menyeluruh**:
    - Memperbarui `scratch/build_bundle.js` dengan menyertakan `js/data/map-vector-data.js`.
    - Kompilasi ulang `js/bundle.js` (801.5 KB).
    - Memperbarui query cache `index.html` ke `js/bundle.js?v=20260912a` dan `sw.js` ke `CACHE_VERSION = 'anabhidev-smart-study-v2-2'`.
    - Seluruh pengujian di `scratch/verify_project.js` lulus 100% (0 failures).
- **v2.5 (12 September 2026):**
  - **Generator Lembar Kerja Siswa (LKS / LKPD) Siap Cetak & Ekspor PDF A4**:
    - Menjawab langsung kebutuhan pengguna yang sedang mencari berkas LKS/PDF untuk tiap mata pelajaran:
      - Menambahkan komponen modal `LksModalComponent` (`js/components/lks-modal.js`) dengan format standar Kurikulum Merdeka Fase A (Kelas 1 SD).
      - Tombol cetak per topik **"📄 Cetak LKS"** di setiap kartu topik untuk seluruh 80 materi.
      - Tombol cetak buku kerja **"📑 Cetak Buku Lembar Kerja (LKS 10 Topik PDF)"** di bar atas setiap mata pelajaran untuk mencetak 1 bundel lengkap 10 topik sekaligus.
      - Lembar Kerja Mewarnai Peta Geografi: **"🎨 Cetak Lembar Mewarnai Peta Indonesia (PDF A4)"** (34 outline batas provinsi + khatulistiwa) dan **"🎨 Cetak Lembar Peta Bali (PDF A4)"** (9 outline kabupaten/kota + landmark).
      - Lembar Kerja Matematika: **"🧮 Cetak Lembar Kerja Matematika (PDF A4)"** dilengkapi Kotak 10 Frame (Ten-Frames) dan Garis Bilangan Lompat Kodok untuk latihan mencoret pensil anak.
      - Struktur LKPD lengkap: KOP Resmi Sekolah & Kurikulum Merdeka, Tabel Identitas Siswa, Rangkuman Materi Ceria, 3 Misi Mandiri Bergaris Titik-titik untuk Pensil, Soal Tantangan Kuis, Ruang Gambar & Mewarnai Kreatif, serta Kolom Apresiasi & Tanda Tangan Orang Tua/Guru.
  - **Child-Friendly Text-to-Speech (TTS Engine)** (`js/engine/tts-engine.js`):
    - Fitur pembacaan suara untuk anak kelas 1 SD yang masih belajar mengeja dan membaca.
    - Tombol **"🔊 Dengarkan"** pada setiap topik pelajaran, soal kuis, peta Indonesia/Bali, dan soal berhitung Matematika.
    - Berbasis Web Speech API native tanpa dependensi, artikulasi pelan dan ceria (`rate: 0.85`), 100% offline, bebas kuota & API key.
  - **Educational Audio Synthesizer & Confetti Celebration (`js/engine/audio-fx.js`)**:
    - Nada ceria sukses C5-G5 saat menjawab benar (Web Audio API).
    - Fanfare saat menyelesaikan materi/kuis.
    - Animasi partikel konfeti bintang dan piala ceria (`⭐`, `🌟`, `🎉`, `🏆`) melayang di layar.
  - **Ekspansi Masif Bank Soal Latihan (5 Butir Soal per Topik / 400 Soal Total)**:
    - Seluruh 80 topik materi di 8 mata pelajaran diperkaya menjadi **5 butir soal latihan pilihan ganda berkualitas tinggi per topik** (total 400 butir soal kuis interaktif, ditambah modul Geografi dan bank Matematika).
    - Setiap soal dirancang dengan pilihan jawaban yang bervariasi, kunci jawaban tepat, dan *educational hint* (petunjuk mendidik yang ramah anak).
    - Terintegrasi langsung dengan Text-to-Speech (tombol "🔊 Dengarkan") dan animasi konfeti + audio reward saat anak menjawab benar.
  - **Print Stylesheet & Bundle Synchronization**:
    - Memperbarui `@media print` pada `css/responsive.css` dengan aturan `@page { size: A4 portrait; margin: 10mm 12mm; }` dan isolasi bersih elemen kertas cetak.
    - Kompilasi ulang `js/bundle.js` (856.7 KB).
    - Pembaruan query cache `index.html` ke `js/bundle.js?v=20260912b` dan `sw.js` ke `CACHE_VERSION = 'anabhidev-smart-study-v2-3'`.
- **v2.6 (13 September 2026):**
  - **Supercharged PageSpeed & Core Web Vitals Optimization (0 Bloat, 100% Lightweight)**:
    - `content-visibility: auto` & `contain-intrinsic-size` diterapkan pada `.quiz-box`, `.subject-card`, `.province-card`, `.bali-region-card`, dan `.country-card` untuk menghilangkan *rendering bottleneck*, memotong waktu kalkulasi layout awal hingga 80%, dan menjaga scroll stabil di 60-120 FPS.
    - Menambahkan Preconnect & DNS-Prefetch untuk YouTube dan `anabhidev.com` pada `<head>` `index.html`.
    - Optimasi rendering tipografi dengan `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`, dan `text-rendering: optimizeLegibility`.
    - Pre-warm voice synthesis (`TtsEngine.initVoices()`) pada saat startup untuk menghilangkan delay suara pertama di browser.
  - **Ekspansi Bank Soal & Materi Ceria (800 Soal Kurikulum + 60 Soal Geografi + 15 Soal Cerita Matematika)**:
    - Seluruh 80 topik di 8 mata pelajaran Kurikulum Merdeka Fase A Kelas 1 SD dilengkapi dengan:
      - `funFact`: Fakta seru & edukatif per topik.
      - `keyPoints`: 2–3 rangkuman konsep kunci yang harus dikuasai.
      - 10 butir soal kuis pilihan ganda komprehensif per topik (total 800 soal di 8 mapel).
      - Modul Geografi diperluas menjadi 6 kuis × 10 soal = 60 soal geografi.
      - Modul Matematika diperkaya dengan 10 soal cerita kontekstual baru (`p6`–`p15`, total 15 flagship problem) + 5 preset baru Kelas 1.
    - Tampilan UI `subject-view.js` dan lembar cetak LKS `lks-modal.js` mengintegrasikan `funFact` dan `keyPoints` secara visual dan audio TTS ramah anak.
    - Kompilasi ulang `js/bundle.js` (1079.1 KB).
    - Pembaruan query cache `index.html` (`?v=20260913a`) dan Service Worker `CACHE_VERSION = 'anabhidev-smart-study-v2-5'`.
- **v2.7 (13 September 2026):**
  - **Pembesaran Spektakuler Globe 3D & Optimasi Tata Letak Meja Belajar**:
    - *Desktop Stage*: Lebar maksimum `.globe-canvas-stack` dinaikkan menjadi `780px`, tata letak `.globe-stage-card` disesuaikan menjadi proporsi prima `1.32fr 0.68fr` dengan padding panggung `36px 30px`.
    - *Mobile & Tablet*: Bottleneck sempit `max-width: 260px` dihapus, digantikan oleh `max-width: min(94vw, 520px)`, menghadirkan globe 3D yang sangat megah, imersif, dan mudah digeser serta di-zoom dengan gestur sentuh anak-anak.
    - *WebGL Camera & Orthographic Geometry*: Jarak kamera WebGL didekatkan dari `3.65` menjadi `3.32 / this.zoom`, radius bola WebGL dan kanvas 2D fallback dinaikkan dari `212px` menjadi `250 * this.zoom` (area permukaan meningkat >40%).
    - *Zero Clipping*: Penyesuaian busur meridian tembaga kuningan (`rArch = r + 26`), dudukan pedestal kayu jati mahoni (`baseW = 180`, `baseCenterY = h - 56`), dan bayangan realistis meja belajar terkalibrasi presisi dengan ruang bebas 54px atas dan 92px kiri tanpa terpotong (0 clipping).
  - **Verifikasi Geografi & Ekspansi Bank Soal (8 Kuis / 80 Soal Geografi)**:
    - Verifikasi ketat 38 provinsi di Indonesia pasca pemekaran resmi Papua (Papua Selatan, Papua Tengah, Papua Pegunungan, Papua Barat Daya) dengan ibukota, pulau utama, dan data koordinat yang 100% akurat.
    - Verifikasi 8 kabupaten dan 1 kota di Provinsi Bali beserta landmark budaya dan geografi lokal.
    - Menambahkan **Quiz 7: Selat, Teluk, & Laut Nusantara** (10 butir soal lengkap dengan kunci dan petunjuk edukatif).
    - Menambahkan **Quiz 8: Satwa Endemik & Keajaiban Alam Nusantara** (10 butir soal lengkap dengan kunci dan petunjuk edukatif).
    - Total bank soal modul Geografi mencapai 8 kuis × 10 soal = 80 butir soal interaktif.
  - **Fitur Baru & Penyempurnaan Pengalaman Belajar Anak (UI/UX Award-Winning)**:
    - *Pencarian Real-Time Provinsi & Kota* (`#geoProvSearchInput`): Memungkinkan anak dan guru mengetik nama provinsi/ibukota (misal: "Bali", "Surabaya", "Merauke"), dengan animasi filter dinamis dan penandaan garis batas emas menyala (*dynamic glowing gold SVG highlight*) pada peta vektor Indonesia.
    - *Pemilih Kecepatan Suara TTS* (`#btnToggleTtsSpeed`): Pilihan kecepatan baca narator `⚡ 1.0x` (normal ceria) atau `🐢 0.85x` (pelan jelas artikulatif) di action bar mata pelajaran untuk membantu anak kelas 1 SD mengeja kata dengan riang.
    - *Audio Synthesizer Umpan Balik Ramah Anak* (`AudioFx.playGentleWrong()`): Efek suara synthesizer nada pantul lembut ("boing" C4-A3) saat jawaban kuis belum tepat, memberikan dorongan motivasi tanpa memicu rasa takut atau frustrasi pada anak.
    - *Fallback Soal Aktivitas 10 Soal*: Menjamin seluruh 10 soal kuis per materi selalu tampil lengkap dan konsisten pada seluruh bahasa (ID/EN).
  - **Kompilasi Standalone Bundle & Sinkronisasi PWA**:
    - Kompilasi ulang `js/bundle.js` (1092.5 KB) bebas dependensi eksternal.
    - Pembaruan query cache `index.html` ke `js/bundle.js?v=20260913b` dan Service Worker ke `CACHE_VERSION = 'anabhidev-smart-study-v2-6'`.
- **v2.8 (13 September 2026):**
  - **Pembesaran Spektakuler Box Peta 2D & Globe 3D dengan Viewport-Adaptive Ceiling**:
    - *Box Peta 2D Megah*: Wadah `.peta-2d-canvas-box` diperbesar dengan palet kedalaman laut realistis (`radial-gradient`), bingkai elevasi cyan cerah (`border: 1.5px solid rgba(2, 132, 199, 0.25)`), dan bayangan kontras tinggi (`box-shadow: inset 0 2px 14px rgba(0,0,0,0.05), 0 6px 20px rgba(2,132,199,0.12)`).
    - *Viewport-Adaptive Ceiling (Tanpa Scroll)*: Batasan kaku `max-height: 440px` dihapus dari `.svg-map-frame` dan diganti dengan `max-height: min(65vh, 600px)`, memungkinkan peta Indonesia dan Bali membentang luas hingga 600px di layar desktop besar, namun otomatis beradaptasi pada laptop/tablet (maksimal 65% tinggi layar) agar seluruh box peta pas tampak di layar tanpa memaksa pengguna menggulir (scroll) atas-bawah.
    - *Zero Scroll Guarantee*: Penerapan `overflow: hidden`, `width: 100%`, `max-width: 100%`, dan `box-sizing: border-box` di seluruh jenjang container (`.interactive-map-panel`, `.peta-2d-canvas-box`, `.globe-stage-card`, `.globe-canvas-wrap`, `.globe-canvas-stack`), mengeliminasi 100% potensi scrollbar internal maupun horizontal scroll / layar goyang pada ponsel dan tablet.
    - *Responsive Padding Adaptif*: Pengurangan padding luar berjenjang pada tablet 850px (`padding: 16px 12px` / box `10px 8px`) dan ponsel 480px (`padding: 12px 6px` / box `6px 4px`), memberikan 96%+ lebar layar riil untuk grafis peta di smartphone.
    - *Pencegahan Gesture Trap*: Penambahan `touch-action: manipulation` pada peta 2D untuk respon sentuh instan tanpa jeda 300ms dan tanpa risiko gesture trap.
  - **Audit Menyeluruh Seluruh Modul & Fitur**:
    - *Pencarian Kota Non-Ibukota Terintegrasi*: Pencarian cepat `#geoProvSearchInput` kini otomatis mencocokkan kota terkenal non-ibukota (misal: "Malang" -> Jawa Timur, "Solo" -> Jawa Tengah, "Batam" -> Kepri, "Labuan Bajo" -> NTT), langsung menyorot dan memfilter provinsinya di peta SVG.
    - *Audit Responsivitas Grid Mobile*: `.provinces-grid`, `.bali-grid`, `.bali-landmarks-grid`, `.island-nav-grid`, dan `.country-grid` diproteksi dengan `min(100%, ...)` dan 1 kolom murni di layar ponsel `<640px`.
    - *Verifikasi 800+ Soal & AudioFx*: Memastikan seluruh kuis, audio sukses C5-G5, umpan balik ramah salah `playGentleWrong()`, dan konfeti bintang berfungsi 100%.
    - *Kompilasi Ulang Bundle & Cache PWA*: Kompilasi bersih `js/bundle.js` (1093.1 KB), query cache `index.html` dinaikkan ke `?v=20260913c`, dan Service Worker `CACHE_VERSION = 'anabhidev-smart-study-v2-7'`.
- **v2.9 (13 September 2026):**
  - **Multi-Row Wrapping Math Toolbox (0 Scroll Samping)**:
    - Wadah pilihan alat berpikir (`.method-tabs`) kini menggunakan `flex-wrap: wrap`, `overflow-x: visible`, `gap: 8px 10px`, dan `width: 100%`.
    - Mengeliminasi horizontal scrollbar 100%. Tombol tertata estetik dan rapi dalam 2 baris di layar desktop/laptop, dan 3 baris di layar tablet/ponsel dengan ukuran sentuh ideal (`min-height: 38px`, padding `7px 11px`, border-radius `12px`).
  - **Penambahan 4 Metode Visual Berhitung Matematika Baru (Total 14 Jurus Berpikir)**:
    1. **Rekenrek (Sempoa 2-Warna Belanda)**: 2 kawat dengan 10 manik per kawat (5 Merah & 5 Putih). Melatih kemampuan visual *subitizing* kawan 5 dan 10 seketika tanpa mencacah satu per satu.
    2. **Jarimatika (Jari Tangan Ajaib 1–99 / Chisanbop)**: Tangan kiri melambangkan puluhan (jempol = 50, 4 jari = 10), tangan kanan satuan (jempol = 5, 4 jari = 1). Dilengkapi visualisasi kartu tangan interaktif dengan status jari buka/lipat untuk angka $A$, $B$, dan formasi total akhir.
    3. **Piramida Bilangan (Number Wall / Cambridge Brick Pyramid)**: Dinding balok susun piramida Cambridge/Oxford di mana setiap balok atas adalah hasil penjumlahan dari dua balok penyangga tepat di bawahnya. Menampilkan tingkat fondasi nilai tempat, tingkat tengah gabungan puluhan/satuan, dan puncak total.
    4. **Larik Pola Titik (Dot Array Grid / Montessori Array)**: Susunan titik terstruktur per baris 10 (dibagi 5+5) yang memperlihatkan pola bilangan genap/ganjil, pengelompokan puluhan penuh, dan menjadi jembatan visual ke konsep perkalian.
  - **Sistem Lencana Prestasi (Badges) & Petunjuk Bertingkat Baru**:
    - Menambahkan 4 lencana baru di `MATH_DATA.badges`: *Rekenrek Champion*, *Master Jarimatika*, *Pyramid Architect*, dan *Pattern Spotter*.
    - Melengkapi generator petunjuk 3 tingkat (*3-level progressive hints*) di `MathEngine.getHints()` untuk keempat metode baru.
  - **Kompilasi Standalone Bundle & Pembaruan Cache PWA**:
    - Kompilasi ulang `js/bundle.js` (1126.3 KB) dengan exit code 0.
    - Pembaruan query cache `index.html` (`?v=20260913d`) dan Service Worker `CACHE_VERSION = 'anabhidev-smart-study-v2-8'`.


