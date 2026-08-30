<!-- ================================================================
AnabhiDev-RS — Raja Siomay Website
Markdown · Status Deploy & Keputusan Menggantung
Development · Anabhi Dev
Version   : 1.2
Generated : 30 August 2026, 01:52:00
================================================================ -->

# STATUS — Raja Siomay Website

File ini mencatat **apa yang sudah/belum live** dan **apa yang masih menggantung**.
Berbeda dari `CLAUDE.md` yang berisi aturan (jarang berubah), file ini berubah terus.

Kalau isi file ini bertentangan dengan yang Anda tahu, **Anda yang benar** — perbaiki filenya.

---

## 1. Status deploy

**Belum ada satu file pun yang live.** Belum pernah diunggah ke hosting mana pun.

| File | Versi | Status |
|---|---|---|
| `index.html` | 1.2 | belum live |
| `menu.html` | 1.2 | belum live |
| `cabang.html` | 1.2 | belum live |
| `tentang.html` | 1.2 | belum live |
| `kontak.html` | 1.2 | belum live |
| `css/base.css` | 1.2 | belum live |
| `css/components.css` | 1.2 | belum live |
| `css/pages.css` | 1.2 | belum live |
| `js/main.js` | 1.2 | belum live |
| `js/gallery.js` | 1.1 | belum live |
| `llms.txt` | — | belum live |
| `assets/*` (6 file) | — | belum live |
| `favicon.ico`, `favicon.svg` | — | belum live |
| `robots.txt`, `sitemap.xml`, `_headers` | 1.1 | belum live |

**Yang perlu di-upload:** seluruh isi folder `Raja-Siomay/` **kecuali** `arsip/`,
`STATUS.md`, dan `CLAUDE.md` (tiga ini internal, jangan ikut ter-deploy).

Setelah deploy pertama, ubah kolom Status jadi `live · [tanggal]`.

> **Cache-busting:** seluruh aset memakai `?v=20260830a`. Setiap kali isi file
> CSS/JS/gambar diubah, **naikkan hurufnya** (`b`, `c`, …) di semua halaman yang
> merujuknya. Kalau terlewat, browser dan CDN akan tetap menyajikan versi lama.

---

## 2. 🔴 LANGKAH MANUAL — wajib dikerjakan manusia, tidak bisa lewat kode

### 2.1 Ganti domain di 5 halaman + 3 file pendukung — WAJIB sebelum live
Seluruh `canonical`, `og:url`, `og:image`, JSON-LD, `sitemap.xml`, `robots.txt`,
dan `llms.txt` memakai domain **placeholder** `https://rajasiomay.com/`.

**Find & replace** `https://rajasiomay.com/` dengan domain sebenarnya di seluruh
folder sebelum upload.

> **Akibat kalau terlewat:** canonical menunjuk domain asing → Google berpotensi
> tidak meng-index situs ini sama sekali, dan preview share WhatsApp/Instagram
> tidak akan memuat gambar.

### 2.2 Konfirmasi JAM BUKA, lalu tambahkan ke JSON-LD
Profil Google Maps hanya mencantumkan **jam tutup**. Jam buka tidak diketahui
kecuali Living World (10.00), jadi `openingHoursSpecification` sengaja
**tidak dipasang** — memasang jam karangan berisiko menampilkan “Tutup” padahal
buka di hasil pencarian Google.

Yang sudah pasti:

| Cabang | Buka | Tutup |
|---|---|---|
| Hasanuddin | belum diketahui | 20.00 |
| Gatot Subroto Barat | belum diketahui | 22.00 |
| Barito Barat | belum diketahui | 22.00 |
| Ahmad Yani Utara | belum diketahui | belum diketahui |
| Living World | 10.00 | belum diketahui (ikut jam mal) |

Setelah jam buka dikonfirmasi, tempel ke objek `Restaurant` di `index.html`
(sesuaikan jamnya per cabang):

```json
"openingHoursSpecification": [{
  "@type": "OpeningHoursSpecification",
  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
  "opens": "10:00",
  "closes": "20:00"
}]
```

### 2.3 Ganti foto stok dengan foto asli outlet — prioritas tertinggi
Semua foto masih dari Unsplash dan **bukan foto Raja Siomay**. Beberapa bahkan
bukan siomay sama sekali (ada bruschetta, nasi goreng, sushi di kartu menu dan
galeri). Untuk bisnis F&B, foto yang tidak cocok merusak kepercayaan lebih cepat
daripada apa pun di halaman ini.

Cara ganti: cari `<img` di file HTML, ubah bagian di dalam `src="..."`,
**dan perbarui `alt="..."`** supaya menjelaskan foto yang baru.

Jumlah foto yang perlu diganti: beranda 12, menu 4, tentang 9, cabang 0, kontak 0.

### 2.4 Isi tautan Instagram
Footer di kelima halaman masih menunjuk `https://www.instagram.com/` (halaman
umum). Ganti dengan akun Instagram Raja Siomay. Ada di `p-footer` — cari
`aria-label="Instagram Raja Siomay"`.

### 2.5 Konfirmasi menu & harga pelengkap
Terkonfirmasi dari Google Maps: **Siomay Goreng Dan Kukus**, **Take Away Siomay**,
**Siomay Ayam Hampers** (cabang Hasanuddin), serta **Es Teh** (cabang Gatsu Barat).

Item pelengkap di `menu.html` (**Tahu Isi, Kentang, Kol Gulung, Pare, Telur**,
semuanya “mulai Rp 1.000”) adalah isian wajar untuk kedai siomay tapi
**belum dikonfirmasi pemilik**. Cocokkan dengan menu asli sebelum live.

Harga juga masuk ke JSON-LD `Menu` di `menu.html` — kalau berubah, ubah di
**dua tempat**: teks halaman dan blok JSON-LD.

### 2.6 Nomor telepon 2 cabang Denpasar Utara
Cabang **Ahmad Yani Utara** dan **Living World** belum punya nomor telepon
terdaftar di Google Maps. Di website, kartu kedua cabang ini sengaja tidak
menampilkan tombol WhatsApp dan diberi catatan bahwa pertanyaan diarahkan ke
nomor pusat. Begitu nomornya ada, isi field `telepon`, `teleponIntl`, dan `wa`
untuk kedua cabang, lalu bangun ulang halamannya.

### 2.7 🟡 Verifikasi bintang testimoni sebelum live
Empat testimoni yang dipasang dipilih karena **teksnya bisa dikutip persis**
seperti tertulis di Google Maps (bukan hasil terjemahan Google):

| Penulis | Cabang | Kutipan |
|---|---|---|
| Sharon Julya | Hasanuddin | “Good price, good siomay! Would love to repeat order for sure.” |
| Ida Ayu Gayatri Kesumayathi | Gatsu Barat | “Finally, Raja Siomay near my office. Rasa ga pernah ngecewain, selalu repeat order.” |
| Embun Dinihari | Gatsu Barat | “I order pack of siomay for my birthday party…” |
| Amal Yusuf | Gatsu Barat | “Siomay ter the best se dunia.” |

**Data yang diberikan tidak mencantumkan jumlah bintang per ulasan**, jadi
keempatnya dipilih karena isinya jelas positif — bukan karena terverifikasi
bintang 5. Buka Google Maps, pastikan keempatnya memang bintang 5, dan ganti
yang ternyata bukan.

**Kandidat tambahan** (positif, tapi di Google tampil sebagai terjemahan —
salin dulu teks asli berbahasa Indonesianya, jangan pakai versi Inggrisnya):

- **Yudhiet Nur Prasetyo** (Local Guide · 165 ulasan) — Barito Barat — ulasan
  paling kuat: menyebut “siomay paling enak di Bali”, pelayanan ramah, tempat bersih.
- **Sri Purnami** — Barito Barat — siomay enak, staf ramah, tempat bersih.
- **Lady YF** (Local Guide · 1.219 ulasan) — Living World — “Food: 5”.

Cara menambah: buka `testimoni.js` di folder kerja generator, tambahkan objek
baru, lalu bangun ulang. Kalau generator tidak tersedia, sunting langsung blok
`<figure class="testi">` di `index.html` (3 teratas) dan `tentang.html` (semua).

---

## 3. Keputusan yang sudah diambil

| Hal | Keputusan |
|---|---|
| **Rating Google** | **TIDAK ditampilkan di mana pun.** Tidak ada angka bintang, tidak ada jumlah ulasan, dan `aggregateRating` tidak dipasang di JSON-LD. `llms.txt` bahkan secara eksplisit meminta mesin penjawab tidak menyimpulkan skor dari halaman ini. |
| **Testimoni** | Hanya ulasan positif yang dipajang, ditandai visual bintang 5. Lihat 2.7 untuk verifikasi. |
| **Mode gelap** | **Dimatikan**, kodenya **tidak dihapus**. Situs terkunci di tema terang. Saklarnya dua: `DARK_MODE` di skrip inline `<head>` kelima halaman, dan `DARK_MODE_ENABLED` di `js/main.js`. Ubah keduanya jadi `true` → mode gelap + tombolnya hidup lagi tanpa menulis ulang satu baris pun. Rasio kontras mode gelap sudah diverifikasi, jadi tidak perlu dihitung ulang saat diaktifkan. |
| **Navbar** | Sticky di semua halaman, mengecil saat di-scroll. Sudah diuji di 1440px dan 390px. |
| **Band gelap** | Hero, ajakan pesan, dan footer tetap gelap permanen apa pun temanya — ini pilihan desain, bukan sisa mode gelap. |

---

## 4. Keputusan yang masih menggantung

| Hal | Status |
|---|---|
| Domain final | **belum ditentukan** — lihat 2.1 |
| Jam buka tiap cabang | **belum diketahui** — lihat 2.2 |
| Nomor telepon 2 cabang Denpasar Utara | belum ada — lihat 2.6 |
| Akun Instagram | belum diberikan — lihat 2.4 |
| Foto asli outlet & produk | belum ada — lihat 2.3 |
| Analytics | belum dipasang. Rekomendasi: Cloudflare Web Analytics atau Plausible (cookieless → tidak perlu cookie banner). GA4 butuh consent banner. |
| Halaman Kebijakan Privasi | belum dibuat. Baru wajib kalau nanti memasang analytics berbasis cookie atau form yang mengirim data ke server. |

---

## 5. Setelah live

- Submit `sitemap.xml` ke Google Search Console.
- Kalau pakai Cloudflare: buka **AI Crawl Control**, pastikan bot retrieval
  (OAI-SearchBot, Claude-SearchBot, PerplexityBot) **di-allow** — sejak 1 Juli 2025
  Cloudflare memblokir AI crawler secara default untuk domain baru.
- Samakan nama, alamat, dan telepon (NAP) **persis** dengan Google Business Profile
  kelima cabang. Alamat di situs sudah disalin apa adanya dari Google Maps.
- Tambahkan tautan website ke kelima profil Google Maps (empat di antaranya masih
  kosong: “Add website”).
- Tes PageSpeed Insights + satu tool lain (GTmetrix/Pingdom lokasi Asia).

---

## 6. Batasan lingkungan

- **Tidak ada staging** — perubahan langsung ke production saat di-upload.
- **Tidak ada test otomatis** di repo; validasi dijalankan manual (lihat `CLAUDE.md`).
- **Python tidak terpasang** (`python` hanya stub Microsoft Store).
  **ImageMagick juga tidak ada** — `convert` di PATH adalah `convert.exe` bawaan
  Windows. Pemrosesan gambar dikerjakan lewat **Node.js** (v24) + modul `zlib`.
- **Deploy manual** — upload folder, bukan CI/CD.
- Form kontak **tidak punya backend**: pesan dirangkai jadi teks lalu dibuka di
  WhatsApp. Tidak ada data yang dikirim ke server mana pun.

---

## 7. Riwayat

| Tanggal | Versi | Catatan |
|---|---|---|
| 30 Agustus 2026 | 1.2 | Data 5 cabang dimutakhirkan dari Google Maps (alamat, kode pos, plus code, telepon, jam tutup, rentang harga, jenis layanan) — cabang 4 & 5 yang tadinya “coming soon” ternyata sudah buka. Testimoni diganti ke 4 ulasan positif terverifikasi teksnya; rating & jumlah ulasan dihapus total. Mode gelap dimatikan (kode dipertahankan). **Tiga bug diperbaiki:** navbar sticky tidak menempel (`overflow-x:hidden` pada body), fokus tidak pindah ke drawer saat dibuka, dan fokus tidak kembali ke hamburger saat ditutup. Belum live. |
| 30 Agustus 2026 | 1.1 | Rilis pertama folder kerja `Raja-Siomay/`. Situs satu-file lama dipecah jadi 5 halaman + `css/` + `js/`, hero dirancang ulang, aset logo dibuat ulang jadi transparan. Belum live. |
