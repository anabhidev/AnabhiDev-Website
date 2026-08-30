<!-- ================================================================
AnabhiDev-RS — Raja Siomay Website
Markdown · Aturan Project untuk AI Coding Assistant
Development · Anabhi Dev
Version   : 1.2
Generated : 30 August 2026, 01:58:00
================================================================ -->

# Aturan Project — Raja Siomay Website

Berisi **aturan** (jarang berubah). Status yang berubah terus ada di `STATUS.md`.
Kedua file ini sengaja dipisah supaya bagian yang basi tidak mencemari aturan
yang masih benar.

Dokumen induk yang mengatur project ini:
- `../AnabhiDev-SOP_v1.7.md` — apa yang dibangun (layout, width, tema, SEO, GEO)
- `../Standar_Coding_AnabhiDev_v1.3.md` — bagaimana file dinamai & diberi header

---

## 1. 🔴 Batas wilayah kerja

Folder kerja: **`Raja-Siomay/`** (folder tempat file ini berada).

Semua yang berada **di luar** folder ini — termasuk folder induk
`Raja Siomay/`, file `TIRU index FILE INI.html`, `index.html`,
`raja-siomay-v2.html`, dan folder `SALAH/` — berstatus **read-only**.

- ✅ Boleh dibaca sebagai referensi
- ❌ **DILARANG** diubah, dipindah, dirapikan, diarsipkan, atau dihapus

Kalau ada yang perlu dirapikan di luar folder kerja: **laporkan, jangan kerjakan.**

---

## 2. Identitas file

- **Prefix:** `AnabhiDev-RS`
- **Kredit:** `Development · Anabhi Dev` — tetap dicantumkan di footer, terlepas
  dari logo apa yang tampil. Dilarang mencantumkan nama perorangan lain.
- **Logo yang tampil = logo Raja Siomay**, bukan logo Anabhi Dev. Prefix file
  `AnabhiDev-` hanya menandakan siapa yang mengerjakan, bukan identitas visual.
- **Header wajib** di setiap file kode: prefix, nama project, stack yang
  benar-benar dipakai di file itu, kredit, `Version`, `Generated`
  (waktu nyata WITA, format `30 August 2026, 01:58:00` — **jangan salin
  timestamp dari file lain**).
- **Versi hanya naik kalau isinya benar-benar berubah.** Jangan menaikkan versi
  file yang tidak disentuh hanya supaya seragam.

---

## 3. Penamaan file — pola Website Statis

Ini **Website Multi-Page / Static Site**, bukan Web App. Karena itu:

- File aktif di folder deploy **WAJIB bernama bersih tanpa versi**:
  `index.html`, `menu.html`, `css/base.css`, `js/main.js`.
- **DILARANG** me-rename file aktif jadi `index_v1.2.html` — merusak link
  internal, canonical, sitemap, dan memicu 404.
- Versi file aktif dicatat di **header file** (`Version : 1.2`).
- Yang diberi nomor versi adalah **file lama saat masuk `arsip/`**:
  `arsip/index_v1.1.html`, `arsip/base_v1.1.css`.
- Setiap kali membuat versi baru, salin dulu versi lamanya ke `arsip/`
  **tanpa perlu diminta**. Jangan pernah menghapus isi `arsip/`.

Penomoran: `[MAYOR].[MINOR]`, mulai `1.1`, MINOR naik tiap perubahan
sebagai bilangan bulat (`1.9 → 1.10 → 1.11`, bukan desimal).

---

## 4. Aturan teknis yang mengikat di project ini

### Layout & width
- Ini halaman **marketing (SOP Blueprint A)**, jadi `max-width: 1240px` pada
  `.shell` **diperbolehkan** — larangan mutlak `max-width` di SOP kategori 1
  berlaku untuk halaman guide/dashboard/brief (Blueprint B/E), bukan di sini.
- `max-width: 100vw` hanya boleh pada wrapper section yang memuat elemen
  `position:absolute` besar (`.hero`, `.page-hero`, `.invite`) — **tidak pernah**
  pada `html`/`body` (100vw ikut menghitung lebar scrollbar Windows).
- Target wajib: **nol horizontal scroll dari 320px sampai 2560px.**

### 🔴 Jebakan yang sudah pernah menggigit di project ini
> Empat hal berikut **lolos dari pembacaan kode** dan baru ketahuan setelah
> perilakunya diukur langsung di browser. Jangan mengulang.

**1. `overflow-x: hidden` pada `body` mematikan `position: sticky`.**
Nilai `hidden` menjadikan `body` scroll container sendiri, sehingga navbar
sticky menempel ke container itu dan ikut tergulung ke atas — terukur: posisi
atas navbar `0px` berubah jadi `-1970px` setelah di-scroll. Yang dipakai sekarang:

    html, body {
      overflow-x: hidden;   /* fallback browser lama */
      overflow-x: clip;     /* mencegah scroll horizontal TANPA bikin scroll container */
      max-width: 100%;
    }

`clip` tetap memenuhi tujuan SOP (nol scroll horizontal) — sudah diuji 320–2560px.

**2. `transition: visibility .46s` menunda elemen jadi bisa difokus.**
Chrome menahan `visibility` di `hidden` sepanjang durasi transisi dan baru
membalik di akhir, jadi `element.focus()` saat drawer dibuka diam-diam gagal dan
fokus tertinggal di `<body>`. Pola yang benar — `0s` tanpa delay saat MEMBUKA,
`0s` dengan delay saat MENUTUP:

    .drawer         { visibility: hidden;  transition: transform .46s var(--ease-out), visibility 0s linear .46s; }
    .drawer.is-open { visibility: visible; transition: transform .46s var(--ease-out), visibility 0s linear 0s; }

Berlaku juga untuk `.drawer-scrim`, `.lightbox`, dan `.to-top`. Tambahan:
bungkus `.focus()` dengan `requestAnimationFrame` supaya gaya sempat
di-recalculate lebih dulu.

**3. Urutan sumber CSS mengalahkan niat.**
`.nav__cta { display: none }` di dalam media query kalah oleh
`.btn { display: inline-flex }` yang ditulis di file yang dimuat belakangan
(spesifisitas sama, urutan menentukan). Akibatnya tombol "Pesan" tetap tampil di
mobile dan mendorong hamburger keluar layar. Kalau menyembunyikan elemen yang
juga memakai class komponen, naikkan spesifisitasnya (`.nav .nav__cta`) — jangan
mengandalkan urutan file. Hal yang sama berlaku untuk atribut `hidden`: butuh
`[hidden] { display: none !important; }` di `base.css`.

**4. Pseudo-element `z-index: -1` tenggelam di belakang background section.**
Garis emas offset pada `.frame::before` tidak terlihat karena elemen induknya
tidak membuat stacking context. Fix: beri `z-index: 0` pada `.frame` dan
`.hero__art`.

### Warna & tema
- Semua warna lewat token di `css/base.css`. **Jangan menulis hex langsung**
  di selector — kecuali pada pasangan yang memang terkunci berdua
  (mis. `::selection`).
- Tiga set token: `:root, [data-theme="light"]` (aktif), `[data-theme="dark"]`
  (ada tapi dimatikan), dan `--inv-*` untuk permukaan gelap konstan (hero,
  ajakan pesan, footer) yang **tidak ikut berganti tema**.
- **Mode gelap sengaja dimatikan, kodenya jangan dihapus.** Saklarnya dua:
  `DARK_MODE` di skrip inline `<head>` kelima halaman, dan `DARK_MODE_ENABLED`
  di `js/main.js`. Keduanya harus `true` bersamaan.
- **`--gold` berbeda nilai per mode** (terang di mode gelap, gelap di mode
  terang). Warna teks di atas bidang `--gold` memakai `--on-gold`, yang juga
  dibalik per mode. `--gold` hanya untuk teks/ornamen yang lolos kontras —
  jangan membuat token "gold gelap" terpisah lalu memakainya untuk teks
  (bug ini sudah pernah terjadi dengan `--gold-deep`, tokennya kini dihapus).
- Setiap token teks wajib punya **komentar rasio kontras hasil ukur** di
  barisnya. Verifikasi ulang setiap kali warna diubah.

### Aksesibilitas
- Skip link sebagai elemen pertama di `<body>`.
- Hamburger **kanan**, logo **kiri**, tombol tema menempel di sisi hamburger.
  Drawer masuk dari kanan sehingga tidak pernah menutupi logo.
- Drawer: `Esc` menutup (lightbox lebih dulu kalau terbuka), klik scrim
  menutup, `aria-expanded` di-toggle, fokus pindah ke item nav pertama saat
  dibuka dan **kembali ke tombol hamburger** saat ditutup, tinggi `100dvh`,
  `visibility: hidden` saat tertutup supaya tidak masuk urutan Tab.
- Satu `<h1>` per halaman, hierarki heading tidak boleh melompat —
  **termasuk di footer**.
- Target sentuh minimal 24×24px; kontrol utama 44×44px.

### Performa
- Angka statistik ditulis **final di HTML** (`data-count="5"` isinya `5`);
  JS yang me-reset ke 0 lalu menaikkannya. Jangan dibalik — crawler dan LLM
  membaca HTML mentah, bukan hasil render.
- Event `scroll` di-throttle dengan `requestAnimationFrame`, `resize`
  di-debounce.
- **`background-attachment: fixed` DILARANG** — rusak di iOS Safari dan tidak
  terlihat saat test di desktop.
- Setiap aset lokal (`css/`, `js/`, `assets/`) wajib memakai version query
  `?v=YYYYMMDD[huruf]`. **Naikkan hurufnya setiap kali isi file berubah**,
  kalau tidak update tidak akan terlihat di browser/CDN yang sudah meng-cache.
- Font: hanya weight yang benar-benar dipakai di CSS yang boleh dimuat.
  Saat ini: Marcellus (400) + Jost (300/400/500).

### Konten
- **Jangan mengarang fakta bisnis** — harga, jam buka, alamat, jumlah cabang,
  rating. Kalau belum dikonfirmasi, tulis di `STATUS.md` sebagai langkah
  manual, jangan diisi tebakan.
- **Rating Google DILARANG ditampilkan** di halaman mana pun — tidak ada angka
  bintang, tidak ada jumlah ulasan, dan `aggregateRating` tidak dipasang di
  JSON-LD. Keputusan klien, 30 Agustus 2026. `llms.txt` juga meminta mesin
  penjawab tidak menyimpulkan skor dari halaman ini.
- **Testimoni: hanya ulasan positif, dan hanya yang teksnya bisa dikutip PERSIS**
  seperti tertulis di Google Maps. Ulasan yang di Google tampil sebagai
  "Translated by Google" TIDAK boleh dikutip dari versi Inggrisnya — itu
  kata-kata mesin penerjemah, bukan kata penulisnya. Salin teks aslinya dulu.
- Nama, alamat, dan telepon (NAP) harus **identik persis** di semua halaman,
  JSON-LD, `llms.txt`, dan Google Business Profile.

---

## 5. Validasi wajib sebelum menyerahkan file

Bukan opsional. Dijalankan manual karena repo ini tidak punya test otomatis.

1. **Cek keseimbangan tag** dan `<!--` vs `-->` di setiap HTML.
2. **Cek tidak ada dua baris `Version :` / `Generated :`** — tanda header lama
   belum terhapus bersih saat mengedit komentar panjang. Untuk komentar
   panjang, **jangan replace parsial**: baca utuh, hitung baris, ganti utuh.
3. **JSON-LD harus lolos `JSON.parse`.**
4. **Satu `<h1>`, heading tidak melompat, tidak ada `id` duplikat.**
5. **Setiap `<img>` punya `alt`**; aset lokal punya version query; tautan
   internal menunjuk file yang benar-benar ada.
6. **Ukur overflow horizontal** di 320/360/414/768/1024/1280/1440/1920/2560 —
   `scrollWidth` harus sama dengan `clientWidth` di semua lebar.
7. **Hitung ulang rasio kontras** setiap pasangan warna teks.
8. **Uji perilaku navbar & drawer di browser sungguhan**, bukan dari membaca
   kode: sticky setelah scroll, buka/tutup drawer, `aria-expanded`, perpindahan
   dan pengembalian fokus, `Esc`, klik overlay, ukuran target sentuh.
   Lihat daftar jebakan di bagian 4 — ketiganya lolos dari review kode.
9. **Render, ambil awal `document.body.innerText`** — harus langsung teks
   halaman normal, bukan teks header/deskripsi teknis.

---

## 6. Batasan lingkungan mesin ini

- **Python tidak terpasang** (`python` hanya stub Microsoft Store).
- **ImageMagick tidak ada** — `convert` di PATH adalah `convert.exe` bawaan
  Windows. Pemrosesan gambar dikerjakan lewat **Node.js** (v24) + modul `zlib`.
- **Tidak ada staging**, tidak ada CI/CD, tidak ada test otomatis.
- **Deploy manual**: upload isi folder ke hosting statis.
- Chrome headless di mesin ini **memaksa lebar jendela minimum (~500px)** —
  screenshot `--window-size=414` menghasilkan render lebar yang dipotong,
  bukan layout mobile sungguhan. Untuk mengukur mobile, pakai CDP
  `Emulation.setDeviceMetricsOverride`, jangan percaya screenshotnya.
- Saat memakai CDP, endpoint `/json/list` bisa mengembalikan target
  **background_page milik ekstensi** di posisi pertama. Wajib difilter
  `t.type === 'page'` sebelum mengambil `webSocketDebuggerUrl`, kalau tidak
  seluruh perintah dikirim ke target yang salah dan hasilnya membingungkan
  (halaman seolah tidak pernah dimuat).
- Heredoc bash dan `node -e` **tidak cocok untuk menulis file berisi backtick,
  kutip bersarang, atau `${...}`** — bash menelannya lebih dulu. Untuk file
  seperti itu, tulis lewat file script terpisah atau editor.

---

## 7. Cara kerja yang diharapkan

- **Konfirmasi dulu sebelum eksekusi**: recap rencana, tunggu persetujuan.
- **Jangan improvisasi di luar scope.** Menemukan masalah lain saat bekerja →
  laporkan, jangan langsung perbaiki, kecuali jelas satu paket dengan yang diminta.
- **Perubahan sebaiknya menambah, bukan mengganti.** Setiap baris yang dihapus
  harus bisa dijelaskan satu per satu.
- **Selalu sebut eksplisit file mana yang berubah dan mana yang perlu di-deploy.**
  Kalau tidak ada yang berubah → katakan "TIDAK ADA, nol file".
- **Langkah manual disebut terpisah dan mencolok**, beserta akibat kalau terlewat.
- **Laporkan hasil apa adanya.** Gagal → sebutkan errornya. Ada langkah yang
  dilewati → katakan. Kalau sesuatu hanya "kelihatan benar" tapi belum diukur,
  katakan belum diukur.
