<!-- ================================================================
     STANDAR PENULISAN KODE & PENAMAAN FILE
     Development · Anabhi Dev
     Version   : 1.5
     Generated : 6 September 2026, 06:23:39
     ================================================================ -->

# Standar Penulisan Kode & Penamaan File

**Development · Anabhi Dev**
Versi dokumen: **1.5** · 6 September 2026

> **Baru di v1.5:** Bagian **9.4 diperluas** — `assets/fonts/` masuk daftar berkas wajib folder deploy PWA, karena self-host font kini **wajib** untuk PWA (CSP `connect-src 'self'` ikut menempel ke `sw.js` dan memblokir font dari CDN — lihat kategori 18.12 SOP v1.9). Ditambah **9.6 — Aturan berkas aset self-host** (penamaan font, kapan pakai `?v=` dan kapan versi lewat nama berkas) dan **9.7 — Validasi khusus PWA sebelum menyerahkan**, turunan Bagian 8.5.
> **Di v1.4:** Bagian 9 — Aturan Berkas PWA (nama `sw.js`/`manifest.json` wajib tetap, versi ikon lewat nama berkas bukan `?v=`, `CACHE_VERSION` wajib naik tiap rilis) dan Bagian 10 — Standar Login Page (struktur wajib, palet menyesuaikan project; keamanan tetap di Bagian 7.4). Keduanya adalah sisi *penamaan & implementasi kode*; spesifikasi tampilan/teknis lengkapnya ada di kategori 18 & 19 SOP Checklist Standar Website v1.9.
> **Di v1.3:** Klarifikasi mendasar pembedaan aturan penamaan file & pengarsipan antara **Web Apps / Backend** (copy manual per modul) vs **Website Multi-Page / Static Site** (folder deploy wajib nama bersih tanpa versi, nomor versi disematkan pada file cadangan di `arsip/`).
> **Di v1.2:** Bagian 8 — Aturan Kerja dengan AI Coding Assistant.

---

## 1. Header File — WAJIB di semua file kode

**Template:**

```
[PREFIX] — [Nama Lengkap Project]
[Teknologi 1] · [Teknologi 2] · [Teknologi 3]
Development · Anabhi Dev
Version   : [x.y]
Generated : [tanggal, jam real saat file dibuat]
```

**Aturan:**

- **PREFIX** = kode project, HURUF BESAR, pakai tanda hubung. Contoh: `AnabhiDev-WEB`, `AnabhiDev-BPC`
- **Teknologi** = tulis stack yang BENAR-BENAR dipakai di file itu.
  Jangan tulis "Google Apps Script" kalau project memakai Supabase.
- Seluruh isi header menyesuaikan project yang dikerjakan.
  Contoh di dokumen ini hanya ilustrasi, bukan nilai tetap.

**Komentar per jenis file:**

| Ekstensi | Komentar |
|---|---|
| `.js` `.ts` `.gs` | `//` |
| `.html` | `<!--` `-->` |
| `.sql` | `--` |
| `.css` | `/*` `*/` |
| `.md` `.yml` | `<!--` `-->` atau `#` |

**Contoh jadi (file `.ts`):**

```ts
// ================================================================
// AnabhiDev-CSP — Child Smart Play Website
// Supabase · Edge Function · Deno · Gemini
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 9 August 2026, 09:34:13
// ================================================================
```

---

## 2. Timestamp

**Format:** `[tanggal] [bulan penuh] [tahun], [jam:menit:detik]`
**Contoh:** `9 August 2026, 09:34:13`

**Aturan:**

- Diambil **real-time** saat file dibuat
- **DILARANG menyalin timestamp dari file sebelumnya**
- Zona waktu: **WITA (Asia/Makassar)**
- Nama bulan: bahasa Inggris, ditulis penuh
- Tanggal 1 digit tanpa angka nol di depan → `9`, bukan `09`

---

## 3. Aturan Penamaan File Berdasarkan Jenis Project

> 🔴 **Prinsip Utama:** Cara deploy dan eksekusi menentukan aturan penamaan file.

### 3.1 Web Apps & Backend (Google Apps Script, Supabase Edge Functions, Dashboard PIN, Single-Page Tools)

- **Sifat:** Kode di-copy/paste manual per file ke platform (GAS Editor, Supabase Dashboard, dll) atau diupload per modul/script. File HTML biasanya hanya 1 (single-page dashboard/app).
- **Format file aktif di folder kerja:** `[PREFIX]_[NamaFile]_v[versi].[ekstensi]` atau `[NamaFile]_v[versi].[ekstensi]`
  ```
  AnabhiDev-CSP_v1.2.html
  Auth_v1.4.gs
  Reports_v1.7.gs
  submit-task_v1.3.ts
  schema_v1.1.sql
  ```
- **Aturan:**
  - File aktif di folder kerja **BOLEH dan DIANJURKAN mencantumkan nomor versi** di nama file karena mempermudah pelacakan saat copy-paste manual.
  - Saat versi naik, file versi lama langsung dipindahkan ke folder `arsip/` (misal: `arsip/Auth_v1.3.gs`).

### 3.2 Website Multi-Page & Static Site (Company Profile, Marketing, Hospitality, E-Commerce)

- **Sifat:** Seluruh folder di-deploy/host langsung ke web server / CDN (Cloudflare Pages, Netlify, GitHub Pages, hosting statis).
- **Format file aktif di folder deploy:** **WAJIB NAMA BERSIH TANPA VERSI DAN TANPA PREFIX**
  ```
  index.html
  menu.html
  consulting.html
  contact.html
  css/base.css
  js/main.js
  ```
- **Aturan Mutlak:**
  - File aktif di dalam folder kerja/deploy **DILARANG di-rename memakai nomor versi** (jangan buat `index_v1.2.html` di root deploy). Me-rename file aktif akan merusak link internal (`href="menu.html"`), routing server, canonical URL, sitemap, dan memicu error 404.
  - **Versi file aktif tetap tercatat di dalam header file** (misal: `Version : 1.2` di header komentar `index.html`).
  - **Yang diberi nomor versi adalah file lama saat masuk ke subfolder `arsip/`!**
    - Contoh alur: Saat `index.html` (v1.1) di-update ke v1.2, salin isi file v1.1 lama ke `arsip/index_v1.1.html` (atau `arsip/AnabhiDev-BPC_index_v1.1.html`), sementara file di root tetap bernama `index.html` dengan header `Version : 1.2`.

---

## 4. Tabel Rangkuman Penamaan File

| Konteks Project | Nama File Aktif di Folder Kerja | Lokasi & Nama File Cadangan Lama (Arsip) | Nama di Platform / Server |
|---|---|---|---|
| **Web Apps / GAS** | `Auth_v1.4.gs` | `arsip/Auth_v1.3.gs` | `Auth.gs` (copy manual) |
| **Backend / Supabase** | `submit-task_v1.2.ts` | `arsip/submit-task_v1.1.ts` | `submit-task.ts` (upload CLI/dashboard) |
| **Website (Deploy Folder)** | `index.html` *(header v1.2)* | `arsip/index_v1.1.html` | `index.html` (auto deploy Cloudflare/Netlify) |
| **Website CSS/JS** | `css/components.css` *(header v1.2)* | `arsip/components_v1.1.css` | `css/components.css` |

---

## 5. Penomoran Versi

**Format:** `[MAYOR].[MINOR]` · Versi awal setiap project baru: **1.1**

- **MINOR** naik setiap ada perubahan.
  Ditulis sebagai **BILANGAN BULAT**, bukan desimal.
- **MAYOR** naik saat perubahan besar arsitektur:
  ganti platform/database · rombak total struktur · generasi baru sistem.
  Saat mayor naik, minor kembali ke 1.

**Urutan yang benar:**

```
1.1 → 1.2 → ... → 1.99 → 1.100 → 1.101 → ... → 1.999
lalu naik mayor:
1.999 → 2.1 → 2.2 → ...
```

**Catatan:**

- `1.100` dibaca "satu titik seratus", bukan "satu koma satu"
- Batas atas minor: **999**
- Dalam praktik jarang lewat 100 sebelum naik mayor

**Kasus khusus — project ditulis ulang total:**
Jika seluruh kode lama tidak dipakai lagi (ganti platform, database, hosting),
project dihitung **sebagai project baru** dan dimulai kembali dari `1.1`.
Kode lama disimpan sebagai arsip referensi, bukan basis versi.

---

## 6. Credit

**Gunakan:** `Development · Anabhi Dev`

**DILARANG mencantumkan:**

- Nama perorangan lainnya
- Nama pihak ketiga
- Mencampurkan dengan brand/organisasi lain

---

## 7. Standar Konfigurasi Gemini API

### 7.1 Model

**Model tetap:** `gemini-3.5-flash-lite`

- Berlaku untuk seluruh project Anabhi Dev
- Ditulis sebagai **KONSTANTA** di bagian atas file
- DILARANG menanam nama model di tengah kode
- Ganti model = cukup ubah satu baris

### 7.2 Blok konfigurasi

Semua nilai yang bisa berubah dikumpulkan dalam satu objek `CONFIG` di
bagian atas file.

```js
const CONFIG = {
  GEMINI_MODEL : 'gemini-3.5-flash-lite',
  APP_TITLE    : '[Nama Project]',
  APP_VERSION  : '[x.y]',
};
```

### 7.3 API Key

> **ATURAN MUTLAK:** API key TIDAK PERNAH ditulis di dalam kode.
> Selalu diambil dari penyimpanan rahasia platform.

| Platform | Cara ambil | Set di |
|---|---|---|
| Google Apps Script | `PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY')` | Project Settings → Script Properties |
| Supabase Edge Function | `Deno.env.get('GEMINI_API_KEY')` | Dashboard → Edge Functions → Secrets |
| Cloudflare Pages Functions | `env.GEMINI_API_KEY` | Settings → Environment variables |

### 7.4 PIN

- PIN divalidasi di **SISI SERVER**, bukan di browser
- Yang disimpan adalah **HASH**, bukan PIN asli
- PIN asli tidak pernah tersimpan di mana pun
- PIN **DILARANG** ditulis di file frontend

### 7.5 Endpoint

Susun endpoint dari konstanta model, jangan ditulis manual:

```js
const GEMINI_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/`
  + `${CONFIG.GEMINI_MODEL}:generateContent`;
```

---

# 8. Aturan Kerja dengan AI Coding Assistant

Berlaku untuk **Claude Code, Antigravity, Cursor, Copilot, atau AI coding assistant apa pun**,
di VS Code maupun aplikasi lain. Ditulis dari kejadian nyata — setiap aturan di
bawah ini lahir karena pernah bermasalah.

## 8.1 🔴 Batas wilayah kerja — MUTLAK

AI **HANYA** boleh mengubah isi **folder kerja** yang sedang dipakai.

Segala sesuatu **di luar folder kerja** — folder induk, folder saudara,
dokumen, presentasi, arsip lama:

- ✅ **Boleh dibaca**
- ❌ **DILARANG diubah, dipindah, dirapikan, diarsipkan, atau dihapus**

Kalau AI melihat ada yang perlu dirapikan di luar folder kerja:
**laporkan saja, jangan kerjakan.** Tunggu perintah eksplisit.

## 8.2 Arsip otomatis — versi lama masuk `arsip/`

Setiap kali AI membuat **versi baru** sebuah file, **versi lamanya langsung
dipindahkan** ke subfolder `arsip/` di dalam folder kerja — tanpa perlu diminta.

### Pola Web Apps / File Script Berversi:
```
folder-kerja/
├── Auth_v1.4.gs        ← yang dipakai aktif
├── Reports_v1.7.gs     ← yang dipakai aktif
├── ...file lain
└── arsip/
    ├── Auth_v1.3.gs    ← cadangan lama
    └── Reports_v1.6.gs ← cadangan lama
```

### Pola Website Multi-Page / Static Site (Deploy Folder):
```
Chef-Website/
├── index.html          ← yang dipakai aktif (header Version : 1.2)
├── menu.html           ← yang dipakai aktif (header Version : 1.1)
├── css/
│   └── components.css  ← yang dipakai aktif (header Version : 1.2)
└── arsip/
    ├── index_v1.1.html ← cadangan lama
    └── components_v1.1.css ← cadangan lama
```

**Tujuannya:** folder kerja **jumlah file aktifnya tidak pernah bertambah**, sehingga
tidak ada kebingungan file mana yang sedang berjalan atau di-deploy.

**Aturan turunan:**

- **JANGAN pernah menghapus** isi `arsip/` — cukup dipindah/disalin ke sana.
- Riwayat *"apa yang berubah"* sudah tercatat di **header file terbaru**
  (lihat Bagian 1). Tidak perlu buka file arsip untuk itu.
- File arsip gunanya **cuma satu**: cadangan kalau versi baru bermasalah / rollback.

## 8.3 Wajib menyebut file mana yang harus di-deploy

Setiap kali selesai bekerja, AI **WAJIB menyebut secara eksplisit**:

- File mana saja yang berubah
- File mana yang perlu di-copy / deploy
- **Kalau tidak ada yang berubah → katakan "TIDAK ADA, nol file"**

Jangan pernah membiarkan user menebak.

> ⚠️ **Tanggal file bukan penanda deploy.**
> Tanggal menjawab *"file mana yang baru diubah"*, **bukan**
> *"file mana yang perlu di-copy"*. File bisa punya tanggal sama tapi satu
> sudah live dan satu belum. Status deploy **harus dicatat terpisah**
> (lihat 8.9).

## 8.4 Konfirmasi sebelum eksekusi

1. **Jangan generate/ubah apa pun tanpa konfirmasi eksplisit.**
   Recap rencana → tunggu user bilang "ya/lanjut" → baru eksekusi.
2. **Jangan improvisasi di luar scope.** Kalau menemukan masalah lain saat
   bekerja, **laporkan dulu** — jangan langsung diperbaiki, kecuali sudah
   jelas SATU paket dengan yang diminta.
3. **Kalau ragu, tanya.** Lebih baik bertanya daripada salah generate.
4. **Jangan asumsikan kondisi nyata.** Untuk hal yang tidak bisa dilihat AI
   (isi spreadsheet, kondisi server, apa yang sudah dideploy) —
   **minta screenshot atau minta user cek**, jangan menebak.

## 8.5 Validasi wajib sebelum menyerahkan file

Bukan opsional.

**Semua file kode:**

1. **Cek syntax** — file harus benar-benar bisa di-parse.
2. **Bandingkan dengan file sebelum diedit** — pastikan **HANYA** baris yang
   direncanakan yang berubah. Baca file aslinya dulu; jangan mengandalkan ingatan.
3. **Cross-check setiap fungsi/konstanta eksternal yang dipanggil** — cari
   nama fungsinya, pastikan benar-benar ada dengan nama persis.
4. **Kalau ada algoritma/logika baru — SIMULASIKAN dulu dengan data nyata**
   sebelum menyatakan benar. Bandingkan hasil lama vs baru: harus identik
   (kecuali memang sengaja diubah).

**Khusus file `.html`:**

5. Extract semua blok `<script>` dan cek syntax-nya satu per satu.
6. **Scan komentar tersembunyi** (lihat 8.6).
7. Cross-check `id`/`class` duplikat kalau ada elemen baru.
8. Render, ambil awal `document.body.innerText` — harus langsung teks halaman
   normal, **bukan** teks header/deskripsi teknis.

> 💡 Validasi ini sebaiknya **dipasang sebagai hook otomatis**, bukan
> diandalkan pada ingatan AI. Yang diingat bisa terlewat; yang dieksekusi
> harness tidak.

## 8.6 🔴 Jebakan: sisa header di komentar panjang

Saat mengedit komentar panjang (`<!-- ... -->` atau blok `//`) dengan
replace parsial, **sisa teks lama sering tertinggal di luar komentar baru**,
atau penutup `-->` ikut terhapus. Akibatnya teks header muncul sebagai
**konten halaman yang terlihat user**.

**Aturan mutlak:**

- Untuk komentar panjang, **JANGAN** pakai replace parsial. Baca seluruh isi
  dulu, hitung persis baris awal–akhir, baru ganti utuh.
- Setelah edit, cek jumlah `<!--` dan `-->` **harus seimbang**, dan tidak ada
  `<!--` bersarang di dalam komentar.
- Cek tidak ada **2× baris `Version :` atau `Generated :`** tersisa — itu
  tanda header lama belum terhapus bersih.

## 8.7 Perubahan sebaiknya menambah, bukan mengganti

Ukuran keamanan sebuah perubahan: **berapa baris kode yang DIHAPUS.**

- Perubahan yang **murni menambah** (0 baris dihapus) hampir selalu aman.
- Setiap baris yang dihapus harus bisa dijelaskan **satu per satu**.
- Setelah edit, cek **jumlah dan nama fungsi** sebelum vs sesudah —
  tidak boleh ada yang hilang atau berubah nama tanpa disengaja.

## 8.8 Ketergantungan antar file harus kebal urutan

Kalau fungsi baru ditambahkan di **file A** lalu dipanggil dari **file B**,
dan deploy dilakukan **manual satu per satu**, maka urutan copy yang salah
bisa membuat sistem error.

**Selalu bungkus pemanggilan lintas-file yang baru:**

```js
if (typeof namaFungsiBaru_ === 'function') {
  namaFungsiBaru_({ ... });
}
```

Dengan begitu, kalau satu file tertinggal, fiturnya cuma dilewati —
sistem tetap jalan, tidak mati.

## 8.9 Catat status deploy secara terpisah

AI **tidak bisa melihat** apa yang sudah live di server/platform. Satu-satunya
sumber kebenaran adalah user.

Karena itu, di dalam folder kerja simpan **file status** (misal `STATUS.md`)
yang mencatat:

- File mana sudah live, file mana belum
- Versi/nomor deploy dan tanggalnya — supaya jelas target rollback
- Langkah manual yang belum dikerjakan
- Keputusan yang masih menggantung

**AI wajib memperbarui file ini setiap kali status berubah.**
Kalau isinya bertentangan dengan yang user katakan, **user yang benar** —
lalu file diperbaiki.

Pisahkan dari file **aturan** (misal `CLAUDE.md`): aturan tidak berubah,
status berubah terus. Kalau digabung, bagian yang basi akan mencemari
aturan yang masih benar.

## 8.10 Langkah manual WAJIB disebut eksplisit

Kalau sebuah perubahan butuh langkah manual yang **tidak bisa dilakukan kode**
(tambah kolom di spreadsheet, set environment variable, buat sheet, ubah
konfigurasi platform) — AI **wajib menyebutnya terpisah dan mencolok**,
bukan diselipkan di tengah penjelasan.

Sebutkan juga **akibatnya kalau terlewat**.

## 8.11 Jangan ubah angka yang sudah dilihat orang lain

Kalau perubahan akan mengubah **angka atau perilaku yang sudah dilihat user
lain** (laporan manajemen, dashboard atasan, notifikasi) — **komunikasikan
dulu sebelum deploy.** Jangan mendadak.

Perubahan diam-diam pada laporan = kepercayaan hilang, walaupun angka barunya
lebih benar.

## 8.12 Catat batasan lingkungan

Di file aturan project, catat **apa yang TIDAK ada** di mesin/platform —
supaya AI tidak menyarankan hal yang mustahil. Contoh:

- Tool yang tidak terpasang (`jq`, Python, dll)
- Perintah yang tidak jalan untuk ekstensi tertentu
- Tidak ada staging environment
- Tidak ada test otomatis
- Cara deploy yang sebenarnya (manual copy-paste? CLI? CI?)

## 8.13 Laporkan hasil apa adanya

- Kalau ada yang gagal → **katakan, sertakan pesan errornya**
- Kalau ada langkah yang dilewati → **katakan**
- Kalau data belum cukup untuk menyimpulkan → **katakan**, jangan
  mengklaim keberhasilan dari 1–2 sampel
- Kalau AI sendiri yang salah → **perbaiki dan sebutkan singkat**, lalu lanjut

---

# 9. Aturan Berkas PWA *(baru di v1.4)*

> Bagian ini mengatur **penamaan, versi, dan header** berkas khas PWA — bukan cara membuat PWA.
> Aturan teknis lengkapnya (manifest, ikon, splash, Service Worker, tombol install, verifikasi)
> ada di **kategori 18 SOP Checklist Standar Website v1.9**, yang sudah melebur `PANDUAN-PWA.md`.
> Keduanya dipakai bersamaan: SOP mengatur *apa* yang dibuat, dokumen ini *bagaimana berkasnya diberi nama & versi*.

## 9.1 Nama berkas PWA — tetap, tanpa versi

Berkas PWA dipanggil browser lewat **nama yang sudah dipatok**, jadi masuk kategori
**Website / Static Site** (Bagian 3.2): nama di folder deploy **wajib tetap**.

| Berkas | Nama wajib | Kenapa tidak boleh diberi versi |
|---|---|---|
| Service Worker | `sw.js` | Didaftarkan lewat `navigator.serviceWorker.register('/sw.js')`; ganti nama = SW lama tidak pernah tergantikan |
| Manifest | `manifest.json` | Ditunjuk `<link rel="manifest">`; ganti nama = manifest tidak terbaca, tombol install hilang |
| Header Cloudflare | `_headers` | Nama persis tanpa ekstensi, wajib di root folder deploy — salah taruh **diabaikan diam-diam tanpa error** |
| Halaman utama | `index.html` | `start_url` manifest & precache Service Worker menunjuk ke sini |

- **DILARANG** membuat `sw_v1.2.js` atau `manifest_v1.3.json` di folder deploy.
- Versi berkas-berkas ini tetap tercatat di **header komentar** file (Bagian 1), dan
  cadangan lamanya diberi nomor versi **saat masuk `arsip/`** — `arsip/sw_v1.2.js`,
  `arsip/manifest_v1.3.json`. Persis pola Bagian 3.2.

## 9.2 Ikon PWA — versi lewat NAMA BERKAS, bukan query

- 🔴 **Ikon PWA adalah pengecualian dari cache-busting `?v=`.** Query string pada URL ikon
  di dalam `manifest.json` membuat pembuatan **WebAPK gagal** — hasil install jatuh jadi
  *pintasan*, bukan aplikasi.
- Cache-busting ikon dilakukan dengan **menaikkan angka di nama berkasnya**:
  ```
  icon-192-2.png    ->  icon-192-3.png
  icon-512-2.png    ->  icon-512-3.png
  icon-512-maskable-2.png -> icon-512-maskable-3.png
  ```
- Ini **satu-satunya tempat** di seluruh standar ini di mana nomor urut ditempel pada nama
  berkas aktif di folder deploy. Alasannya bukan gaya penamaan, tapi keterbatasan teknis
  WebAPK — jangan dijadikan preseden untuk berkas lain.
- Nomor urut ikon **bukan** nomor versi project (Bagian 5). Keduanya berjalan sendiri-sendiri.
- Ikon PWA wajib **PNG** — bukan WebP/SVG, keduanya ditolak untuk keperluan install.

## 9.3 `CACHE_VERSION` — konstanta, wajib naik tiap rilis

- Ditulis sebagai **konstanta di baris paling atas** `sw.js`, tidak pernah ditanam di
  tengah kode — pola yang sama dengan `CONFIG` di Bagian 7.2.
- **Formatnya mengikuti versi berkas di header** (Bagian 5), dengan titik diganti tanda hubung
  karena dipakai sebagai nama cache:
  ```js
  var CACHE_VERSION = 'nama-app-v1-1';   // header sw.js: Version : 1.1
  ```
- 🔴 **Wajib dinaikkan setiap kali `sw.js` atau berkas precache-nya berubah.** Lupa menaikkan =
  pengguna terkunci di versi lama, dan tidak ada cara memperbaikinya dari jarak jauh selain
  meminta pengguna membersihkan data aplikasi satu per satu.
- Menaikkan `CACHE_VERSION` **dan** menaikkan `Version` di header adalah **satu paket** — jangan
  yang satu saja.

## 9.4 Berkas wajib ada dalam folder deploy PWA

```
folder-deploy/
├── index.html
├── manifest.json
├── sw.js
├── _headers
├── assets/
│   ├── icon-192-2.png
│   ├── icon-512-2.png
│   ├── icon-512-maskable-2.png
│   ├── splash-*.png          ← khusus iOS, per ukuran layar
│   └── fonts/
│       └── nama-font.woff2   ← WAJIB self-host (lihat 9.6)
└── arsip/
    ├── sw_v1.2.js
    └── manifest_v1.3.json
```

## 9.6 Aturan berkas aset self-host *(baru di v1.5)*

Pada PWA, **seluruh aset kritis wajib di-host sendiri** — font, ikon, logo. Bukan pilihan
gaya, melainkan konsekuensi teknis: aturan `/*` di `_headers` menempel juga ke respons
`sw.js`, sehingga `connect-src 'self'` ikut membatasi `fetch()` **dari dalam Service
Worker**. Aset CDN akan gagal dengan `net::ERR_FAILED` **tanpa pesan CSP**, dan yang lebih
penting: aset CDN **tidak jalan offline**, padahal offline adalah alasan utama membuat PWA.

| Jenis aset | Lokasi | Penamaan |
|---|---|---|
| Font | `assets/fonts/` | Sebutkan varian di nama: `montserrat-latin-var.woff2` |
| Ikon PWA | `assets/` | Versi lewat **nama berkas** — `icon-512-2.png` (lihat 9.2) |
| Logo & gambar | `assets/` | Boleh `?v=` (lihat tabel di bawah) |

**Kapan pakai `?v=`, kapan ganti nama berkas** — ini sering tertukar:

| Berkas | Cara memberi versi | Alasan |
|---|---|---|
| Ikon di `manifest.json` | 🔴 **Ganti nama berkas** | `?v=` pada URL ikon manifest bisa menggagalkan pembuatan WebAPK |
| Font | **Ganti nama berkas** | Dirujuk dari `@font-face` **dan** `PRECACHE`; nama tetap membuat keduanya sinkron |
| Logo & gambar biasa | `?v=YYYYMMDDx` | Aman, mengikuti aturan cache-busting umum |

- **Berkas font WAJIB masuk `PRECACHE`** di `sw.js`. Kalau tidak, font tidak tersimpan
  dan halaman offline tampil dengan font bawaan sistem — gagal senyap, tidak ada error.
- **Pakai variable font kalau tersedia** — satu berkas untuk seluruh rentang weight.
  Contoh nyata: Montserrat 400–700 cukup **satu berkas 37 KB**, bukan empat berkas terpisah.
- **Setelah self-host, perketat CSP-nya**: `style-src 'self' 'unsafe-inline'` dan
  `font-src 'self'` — tidak ada lagi domain luar yang perlu diizinkan. Self-host membuat
  CSP **lebih ketat**, bukan lebih longgar.

## 9.7 Validasi khusus PWA sebelum menyerahkan *(baru di v1.5)*

Turunan **Bagian 8.5**. Untuk PWA, validasi berbasis pembacaan kode **tidak cukup** —
dua kegagalan termahal pada project PWA nyata (banner install tidak muncul, font tidak
termuat) sama-sama lolos syntax check, review kode, dan pemeriksaan struktur. Keduanya
baru ketahuan saat halaman dibuka dengan browser sungguhan.

- [ ] **Buka DevTools → Network, muat ulang halaman: pastikan NOL resource `ERR_FAILED`.**
  Wajib, bukan opsional. Kegagalan aset pada PWA sering senyap.
- [ ] **Cek `manifest.json`** bebas field `id` berquery dan bebas `?v=` pada URL ikon.
- [ ] **Cek `sw.js`** benar-benar punya `fetch` handler, dan `CACHE_VERSION` sudah dinaikkan.
- [ ] **Cek nol rujukan ke CDN pihak ketiga** di `index.html` — font, ikon, maupun logo.
  ```bash
  grep -nE "https://(fonts|cdn|unpkg|ajax)." index.html    # hasil harus KOSONG
  ```
- [ ] **Cek `e.preventDefault()` TIDAK ada** pada `beforeinstallprompt` — itu mematikan
  banner install bawaan Chrome (kategori 18.6 SOP v1.9).
- [ ] **Verifikasi berkas font benar-benar ada** di `assets/fonts/` dan tercantum di `PRECACHE`.

## 9.5 Kaitan dengan aturan kerja AI (Bagian 8)

- **8.3 (sebut file yang harus di-deploy):** untuk PWA, **wajib sebut juga apakah `CACHE_VERSION`
  sudah dinaikkan** — bukan cuma daftar file. Deploy `sw.js` tanpa menaikkan `CACHE_VERSION`
  terlihat "berhasil" tapi tidak berefek apa pun ke pengguna.
- **8.4 (jangan asumsikan kondisi nyata):** hasil install **tidak boleh ditebak**. Pasang penanda
  `display-mode` di halaman (kategori 18 SOP) dan minta user membuka aplikasi dari ikon home
  screen — itu bukti definitif aplikasi vs pintasan.
- **8.5 (validasi sebelum menyerahkan):** untuk PWA, tambahkan cek `manifest.json` bebas field
  `id` berquery dan bebas `?v=` pada URL ikon, serta `sw.js` benar-benar punya `fetch` handler.
  **Sejak v1.5 wajib juga membuka DevTools → Network dan memastikan nol `ERR_FAILED`** —
  daftar lengkapnya di 9.7. Validasi berbasis pembacaan kode saja terbukti tidak cukup:
  dua bug termahal pada PWA nyata lolos dari semua pemeriksaan statis.
- **8.10 (langkah manual disebut eksplisit):** cara install di iPhone (Safari → Bagikan → Add to
  Home Screen) **wajib disebut terpisah dan mencolok** — iOS tidak punya prompt install otomatis,
  dan Chrome di iOS tidak bisa sama sekali.
- **8.12 (batasan lingkungan):** catat di file aturan project bahwa **domain `*.pages.dev` tidak
  punya tombol Purge Cache** — kalau tampilan tidak berubah setelah upload, penyebabnya cache di
  HP (Service Worker), bukan Cloudflare. Jangan buang waktu mencari tombol yang tidak ada.

---

# 10. Standar Login Page *(baru di v1.4)*

> Sama seperti Bagian 9: di sini hanya **aturan berkas & implementasi kode**.
> Spesifikasi tampilan lengkap (struktur split layout, token warna, tipografi, CSS/HTML acuan,
> aksesibilitas) ada di **kategori 19 SOP Checklist Standar Website v1.9**, dilebur dari
> `missfish-login-standard.md`.

## 10.1 Struktur wajib, palet menyesuaikan project

- **Struktur** login page (split: visual di kiri, form di kanan; urutan elemen panel kanan;
  panel kiri hidden di mobile) **wajib sama di semua project**.
- **Palet warna & font** menyesuaikan identitas project yang dikerjakan — pola pemisahan yang
  sama dengan aturan logo: *struktur milik standar, identitas visual milik project*.
- Konsekuensinya untuk kode: **warna login page wajib ditulis sebagai variabel CSS di `:root`**,
  bukan hex yang tersebar di banyak selector. Ganti project = ganti isi `:root`, tidak menyentuh
  satu pun selector lain.

## 10.2 Penamaan berkas

- Halaman login mengikuti aturan jenis project (Bagian 3):
  - **Website multi-page / static site:** nama berkas tetap bersih — `login.html`, `css/login.css`.
  - **Web app single-file / dashboard:** boleh berversi — `AnabhiDev-CSP_v1.2.html` — karena di-copy manual.
- **Prefix class CSS `login-`** dipakai konsisten (`.login-page`, `.login-right`, `.login-field`,
  `.login-btn`) supaya blok CSS login bisa dipindah antar project tanpa bentrok nama dengan CSS
  halaman lain.
- **Logo memakai URL resmi brand versi latar-gelap** (kedua panel login berlatar gelap).
  Logo yang dipasang **mengikuti project yang dikerjakan**, bukan otomatis logo Anabhi Dev:

  | Brand | Latar **gelap** (login page, sidebar gelap) | Latar **terang/putih** (card putih, cetak) |
  |---|---|---|
  | **Anabhi Dev** | `https://anabhidev.com/logo.webp` *(transparan)* | `https://anabhidev.com/logo-black.webp` |
  | **Miss Fish Bali** | `https://anabhidev.com/MFB/missfish-logo.webp` *(transparan)* | `https://anabhidev.com/MFB/missfish-logo-white.webp` |

  🔴 **Jangan memakai image host pihak ketiga** (ibb.co, imgur, dsb) yang bisa mati
  sewaktu-waktu. Kredit `Development · Anabhi Dev` (Bagian 6) tetap dicantumkan terlepas
  dari logo apa yang tampil — keduanya hal terpisah. Daftar lengkap ada di kategori 15 SOP.

## 10.3 Batas kode: tampilan di sini, keamanan tetap di Bagian 7.4

Bagian ini **tidak** melonggarkan satu pun aturan keamanan. Yang tetap berlaku mutlak:

- PIN/password divalidasi di **SISI SERVER**, bukan di browser (Bagian 7.4).
- Yang disimpan **HASH**, bukan PIN/password asli.
- **DILARANG** menaruh PIN, password, atau API key di berkas frontend — termasuk di dalam
  fungsi `doLogin()` pada contoh kode mana pun.
- Fungsi `doLogin()` di contoh SOP adalah **kerangka**, bukan implementasi siap pakai.
  Isinya wajib memanggil endpoint server.

## 10.4 Pesan error

- Pesan error tampil di **slot yang sudah disediakan di markup**, bukan `alert()`.
- Pesan error **tidak membocorkan mana yang salah** — tulis "Email atau password salah",
  bukan "Password salah untuk email ini". Yang kedua memberi tahu penyerang bahwa email
  tersebut terdaftar (enumerasi akun).

---

<!-- ================================================================
     Dokumen ini adalah acuan. Seluruh nama, prefix, teknologi, dan
     versi pada contoh menyesuaikan project yang sedang dikerjakan.
     ================================================================ -->

> Dokumen ini adalah **acuan**. Seluruh nama, prefix, teknologi, dan versi
> pada contoh menyesuaikan project yang sedang dikerjakan.
>
> Versi dokumen standar: **1.4 (Anabhi Dev Edition)**
