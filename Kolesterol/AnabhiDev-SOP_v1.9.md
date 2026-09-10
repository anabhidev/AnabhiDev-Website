<!-- ================================================================
AnabhiDev-SOP — SOP Checklist Standar Website 2026
Markdown · Internal Standard Document
Development · Anabhi Dev
Version   : 1.9
Generated : 6 September 2026, 06:23:39
================================================================ -->

# SOP Checklist Standar Website 2026 — Front-End, Back-End, Infrastruktur & Operasional
**Anabhi Dev — Internal Standard**

> 🔴 **Cakupan dokumen ini** *(v1.8, ditegaskan)* — SOP ini adalah **satu file untuk semua project**: project Anabhi Dev sendiri, project klien, maupun project Miss Fish Bali. Aturan teknisnya (performance, SEO, security, width, theming, PWA, login) **identik untuk semuanya**.
>
> Yang **berbeda per project** hanya soal **identitas**: logo, favicon/OG, kredit di header file, dan prefix nama file. Tiga titik itu diatur di **kategori 15** (logo), **kategori 2** (favicon/OG), dan **kategori 17** (kredit & prefix — termasuk tabel pemilihan edisi Standar Penulisan Kode). Ringkasnya:
>
> | Project milik | Logo & favicon | Kredit header file | Edisi Standar Coding |
> |---|---|---|---|
> | **Anabhi Dev sendiri** | Anabhi Dev | `Development · Anabhi Dev` | `Standar_Coding_AnabhiDev_v1.5.md` |
> | **Klien / brand turunan** | **Logo klien** (cek per project) | `Development · Anabhi Dev` | `Standar_Coding_AnabhiDev_v1.5.md` |
> | **Miss Fish Bali** | Miss Fish (selalu) | `IT Department · Miss Fish Bali` | `Standar_Coding_MissFishBali_v1.5.md` |
>
> Judul "Anabhi Dev — Internal Standard" menandakan **siapa yang menyusun & memelihara** dokumen ini, **bukan** batasan project mana yang boleh memakainya, dan **bukan** berarti semua project berkredit atau berlogo Anabhi Dev.

---

## Changelog v1.9 (6 September 2026)

> Revisi ini **memperbaiki dua aturan yang ternyata salah di v1.8** — keduanya ditemukan lewat pengujian PWA nyata memakai Chrome DevTools pada halaman live, bukan dari membaca dokumentasi. Ciri khas keduanya sama: **gagal dalam diam**, tanpa pesan error apa pun, sehingga lolos dari semua pemeriksaan berbasis pembacaan kode.

1. **🔴 Kategori 18.6 DIKOREKSI — `preventDefault()` pada `beforeinstallprompt` DILARANG** <span class="ci-badge badge-mandatory">MANDATORY</span> — v1.8 menginstruksikan memanggil `e.preventDefault()` lalu menyimpan event-nya. Itu keliru: `preventDefault()` adalah cara resmi memberi tahu Chrome *"jangan tampilkan banner install-mu, saya tangani sendiri"*, dan Chrome mematuhinya. Akibatnya **pop-up install bawaan Chrome tidak pernah muncul** dan pengguna terpaksa lewat menu titik tiga — persis keluhan yang muncul di lapangan. Diganti dengan **pola pop-up DAN tombol, keduanya aktif**: event disimpan tanpa `preventDefault()`, dan `prompt()` dibungkus `try/catch` karena bisa melempar `InvalidStateError` kalau banner Chrome sudah memakainya lebih dulu. Ditambah penjelasan **Site Engagement Score** — kenapa banner tidak selalu muncul di detik pertama, dan kenapa tombol tetap jadi jalur utama saat menginstruksikan pengguna.
2. **🔴 Kategori 18.12 (BARU) — Service Worker mewarisi CSP, dan itu memblokir aset lintas domain** <span class="ci-badge badge-mandatory">MANDATORY</span> — aturan `/*` di `_headers` menempel juga ke respons `sw.js`, sehingga `connect-src 'self'` ikut membatasi `fetch()` **yang dipanggil dari dalam Service Worker**, bukan hanya dari halaman. Pada PWA nyata ini, Google Fonts gagal total (`net::ERR_FAILED`, `font-face` termuat = 0) dan halaman diam-diam memakai font bawaan sistem selama berhari-hari tanpa ada yang menyadari — tidak ada pesan "CSP violation", hanya kegagalan yang terlihat seperti gangguan jaringan biasa. Konsekuensinya **self-host font dinaikkan dari "direkomendasikan" (kategori 1) menjadi WAJIB untuk PWA**.
3. **Kategori 1 — blok font diberi peringatan silang ke kategori 18** — opsi "pakai Google Fonts/CDN" tetap sah untuk website biasa, tetapi kini ditandai **dilarang untuk PWA ber-CSP ketat**, dengan rujukan ke 18.12.
4. **Kategori 18.10 — checklist verifikasi ditambah 3 item**: larangan `preventDefault()`, wajib membuka DevTools → Network memastikan **nol resource `ERR_FAILED`**, dan wajib self-host font.
5. **Kategori 18.11 — prompt siap pakai diperbarui** mengikuti kedua koreksi di atas, supaya AI coding assistant tidak mengulang kesalahan yang sama.

6. **Standar Penulisan Kode dinaikkan ke v1.5 mengikuti koreksi ini** — Bagian 9.4 (daftar berkas wajib folder deploy PWA) diperluas dengan `assets/fonts/`, ditambah **9.6 — Aturan berkas aset self-host** (penamaan font, tabel kapan pakai `?v=` vs ganti nama berkas) dan **9.7 — Validasi khusus PWA sebelum menyerahkan** (wajib buka DevTools → Network, nol `ERR_FAILED`). **Kedua edisi (Anabhi Dev & Miss Fish) sudah dinaikkan ke v1.5** dengan Bagian 9 yang identik kata per kata — diverifikasi otomatis, bukan diperiksa manual.

> **Pelajaran umum yang layak dibawa ke luar konteks PWA:** kegagalan yang paling mahal bukan yang memunculkan pesan error, melainkan yang **berhasil secara teknis tetapi salah secara hasil**. Dua-duanya di atas lolos dari review kode, syntax check, dan pemeriksaan struktur — dan baru ketahuan saat halaman benar-benar dibuka dengan browser sungguhan. Karena itu kategori 18.10 kini mewajibkan pemeriksaan Network panel, bukan sekadar "cek kode".

---

## Changelog v1.8 (4 September 2026)

> Revisi ini menambah **2 kategori baru** yang sebelumnya hidup sebagai dokumen terpisah, mengikuti pola peleburan yang sama seperti Addendum Cache-Busting di v1.7 — supaya tidak perlu melampirkan banyak dokumen setiap memulai project: (1) **Kategori 18 — PWA**, dilebur penuh dari `PANDUAN-PWA.md` v1.1, dan (2) **Kategori 19 — Standar Login Page**, dilebur dari `missfish-login-standard.md` v1.0 lalu dinaikkan jadi standar umum (struktur wajib, palet menyesuaikan project). Ditambah **daftar URL logo resmi per brand** di kategori 15.

1. **Kategori 18 (BARU) — PWA (Android & iOS)** <span class="ci-badge badge-mandatory">MANDATORY jika project dinyatakan PWA</span> — 4 syarat wajib install, bentuk `manifest.json` teraman (🔴 dilarang `id` berquery, 🔴 dilarang `?v=` pada URL ikon), aturan ikon maskable (konten ≤80% kanvas, 60–65% kalau berteks), 🔴 penjelasan splash Android 12+ = ikon aplikasi (tidak bisa dibedakan — jangan dijanjikan ke klien), splash iOS lewat `apple-touch-startup-image`, Service Worker anti "tidak update-update" (HTML network-first, aset cache-first, `CACHE_VERSION`, `SKIP_WAITING`), tombol install di halaman + deteksi hasil install **aplikasi vs pintasan**, `_headers` wajib, checklist verifikasi, dan prompt siap pakai untuk AI coding assistant. Seluruhnya lahir dari pembuatan PWA nyata (`mfb-emergency-call.pages.dev`), terbukti di Google Pixel, Vivo, dan iPhone.
2. **`PANDUAN-PWA.md` resmi dipensiunkan/dilebur** — isinya kini utuh di kategori 18, dan SOP ini tetap menjadi satu-satunya sumber kebenaran tunggal untuk standar website.
3. **Kategori 19 (BARU) — Standar Login Page (Split Layout)** — sebelumnya login page hanya diatur dari sisi **keamanan** di Blueprint E (panjang PIN, `inputmode`, rate limit, validasi server-side), tanpa satu pun aturan **tampilan**; akibatnya tiap aplikasi ber-login dibuat dari nol dengan tata letak berbeda meski dari satu rumah yang sama. Kategori ini menetapkan **struktur wajib** (split visual-kiri/form-kanan 65/35, urutan elemen panel kanan, panel kiri hidden di mobile) sementara **palet warna & font menyesuaikan identitas project** — pola pemisahan yang sama persis dengan hero Blueprint B.4 dan rule "logo mengikuti project" kategori 15. Ditambah aturan aksesibilitas & anti-enumerasi akun yang belum pernah ada sebelumnya.
4. **Kategori 15 — daftar URL logo resmi per brand (Anabhi Dev & Miss Fish Bali)** <span class="ci-badge badge-mandatory">MANDATORY</span> — sebelumnya hanya pasangan Anabhi Dev yang tercatat, sehingga logo Miss Fish di beberapa file terlanjur memakai URL image host pihak ketiga yang bisa mati sewaktu-waktu. Kriteria pemilihan berkas juga diperjelas: dipilih berdasarkan **warna latar tempat logo dipasang** (gelap vs terang), bukan berdasarkan lokasi elemennya (sidebar vs hero).
5. **🔴 Audit ambiguitas Anabhi Dev vs Miss Fish — 5 titik diperbaiki** *(v1.8, dipicu pertanyaan eksplisit user)* — SOP ini satu file untuk semua project, sementara Standar Penulisan Kode terbit **dua edisi** dengan aturan kredit yang **berlawanan**; sebelumnya SOP menulis seolah semua project berkredit "Anabhi Dev", yang berarti mengikuti SOP pada project Miss Fish **langsung melanggar Bagian 6 edisi Miss Fish**. Yang diperbaiki:
   - **Blok cakupan baru di bagian atas dokumen** — tabel 3 konteks project (Anabhi Dev / klien / Miss Fish) beserta logo, kredit, dan edisi Standar Coding masing-masing; plus penegasan bahwa judul "Anabhi Dev — Internal Standard" menandakan **siapa yang menyusun**, bukan batasan siapa yang boleh memakai.
   - **Kategori 17 — tabel pemilihan edisi** (`Standar_Coding_AnabhiDev_v1.4.md` vs `Standar_Coding_MissFishBali_v1.4.md`), dan aturan **kredit mengikuti edisi**, bukan selalu "Anabhi Dev". Rujukan ke nama berkas lama `Standar_Coding_Anabhi_Dev.md` (sudah tidak ada) juga diperbaiki di 4 tempat.
   - **Kategori 15 — RULE UMUM dipertajam jadi 3 baris, bukan 2.** Sebelumnya Miss Fish disamakan dengan klien, padahal perilakunya berbeda: di bawah payung **Anabhi Dev** logo **tidak selalu** Anabhi Dev (wajib dicek per project), sedangkan di bawah payung **Miss Fish** logo **selalu** Miss Fish tanpa kecuali (semuanya sistem internal satu kantor).
   - **Kategori 2 — blok meta/favicon/OG Anabhi Dev ditegaskan bukan template universal**; project Miss Fish memakai identitas Miss Fish, project klien wajib ditanyakan dulu.
   - **Prefix nama file** diperjelas: project klien tetap `AnabhiDev-` (Anabhi Dev yang mengerjakan), hanya project Miss Fish yang memakai `MFB-`.
6. **Pengecualian antar-kategori ditulis eksplisit, bukan dibiarkan bertabrakan** — ikon PWA wajib PNG (bukan WebP seperti kategori 1); ikon PWA berlatar solid (bukan transparan seperti logo kategori 15); `?v=` cache-busting kategori 1 **dilarang** pada URL ikon manifest; `sw.js`/`manifest.json`/`/` dikecualikan dari `immutable`; dan `max-width: 380px` pada `.login-form` adalah pengecualian sah dari larangan width kategori 1.

---

## Changelog v1.7 (28 Agustus 2026)

> Revisi ini menyelesaikan 2 integrasi penting: (1) **Penggabungan penuh Addendum Cache-Busting & Update Propagation** yang sebelumnya dokumen terpisah, kini menyatu ke dalam Kategori 1 (Front-end & Caching), Kategori 6 (Hosting & Deployment / Cloudflare), dan Kategori 11 (Verifikasi Otomatis) sebagai 1 file tunggal SSOT. (2) **Klarifikasi aturan penamaan file & arsip (Web Apps vs Website)** di Kategori 17 — menyelaraskan dengan *Standar Penulisan Kode & Penamaan File v1.3* bahwa website statis di folder deploy nama file wajib tetap bersih tanpa versi (`index.html`), dan nomor versi disematkan pada file cadangan di `arsip/`.

1. **Penggabungan Addendum Cache-Busting ke Kategori 1, 6, 11** — checklist komprehensif version query `?v=YYYYMMDD[a/b/c]`, alternatif durasi pendek (`max-age=300`) untuk aset yang sering diganti nama sama (foto tim/produk), penanganan Cloudflare edge cache vs purge manual, dan perintah verifikasi terminal siap-pakai.
2. **Kategori 17 — Pembedaan Aturan Penamaan File (Web Apps vs Website)** — folder deploy website nama file wajib tetap (`index.html`, `menu.html`), yang diberi versi adalah file lama saat masuk ke folder `arsip/` (`arsip/index_v1.1.html`). Untuk Web Apps (GAS, Supabase, dashboard single-file), file aktif di folder kerja boleh diberi versi langsung karena di-copy manual saat deploy.
3. **Dokumen Addendum Cache-Busting terpisah resmi dipensiunkan/dilebur** — SOP Checklist v1.7 ini menjadi satu-satunya sumber kebenaran tunggal untuk standar website.

---

## Changelog v1.6 (25 Agustus 2026)

> Revisi ini adalah audit menyeluruh atas potensi ambiguitas/tumpang tindih soal "logo Anabhi Dev" — dipicu pertanyaan eksplisit: rule intinya tetap **logo mengikuti project** (logo wajib ada, tapi tidak wajib logo Anabhi Dev), jadi setiap frasa yang berpotensi terbaca sebaliknya perlu diperjelas. Hasil audit: rule inti di kategori 15 sudah benar sejak v1.3, tapi ditemukan 2 gap penjelasan — (1) beberapa judul item baru v1.4 bisa disalahbaca kalau dibaca terpisah dari body-nya, (2) belum ada penjelasan eksplisit bahwa prefix nama file (`AnabhiDev-`) dan path hosting (`anabhidev.com/[NamaProject]/`) adalah dua hal yang independen dari logo yang tampil di halaman — ketiganya kebetulan sama-sama memuat kata "Anabhi Dev"/"anabhidev.com", tapi mengatur hal berbeda (siapa yang mengerjakan & di mana di-host, vs identitas visual project).

1. **Kategori 15 — judul 2 item v1.4 diperjelas** supaya tidak ambigu meski dibaca terpisah dari body: "Logo Anabhi Dev WAJIB jadi tautan..." diubah jadi "**Kalau** project memakai logo Anabhi Dev, logo itu WAJIB jadi tautan...". Isi aturan tidak berubah, cuma framing kalimat.
2. **Kategori 15 — item baru: path hosting `anabhidev.com/[NamaProject]/` TIDAK berarti logo yang tampil harus logo Anabhi Dev.** Path itu murni soal *di mana file di-host* (semua project Anabhi Dev, klien atau bukan, kemungkinan besar di-hosting di bawah domain yang sama) — independen dari *logo apa yang ditampilkan* di halaman (tetap ikut rule umum: logo project).
3. **Kategori 17 — item baru: prefix nama file `AnabhiDev-` TIDAK berarti logo yang tampil harus logo Anabhi Dev.** Prefix menandakan *siapa yang mengerjakan* (selalu Anabhi Dev, konsisten untuk semua project termasuk punya klien seperti `AnabhiDev-AM` untuk ARVENAA Meals) — independen dari *logo apa yang ditampilkan* di UI (tetap ikut rule umum kategori 15: logo project, bisa logo ARVENAA meski nama file `AnabhiDev-AM`).
4. **Tidak ditemukan tumpang tindih lain** pada pemeriksaan menyeluruh seluruh dokumen (kategori 1–17, Blueprint A–G) — seluruh referensi "logo" di luar kategori 15 sudah konsisten merujuk balik ke rule umum tersebut (Blueprint B.4, kategori 11) tanpa kontradiksi.

---

## Changelog v1.5 (25 Agustus 2026)

> Revisi ini mengoreksi reasoning item scrollbar custom (kategori 13, ditambahkan di v1.4) yang sebelumnya menyebut dugaan "perbedaan device/OS" sebagai penyebab tampilan scrollbar berbeda antar file — dugaan itu dilontarkan tanpa verifikasi dan keliru. Bukti sebenarnya sudah didapat: 1 screenshot berisi 3 file (`ANABHIDEV-NASATYA_v1_1.html`, `AnabhiDev-SOP_v1.3.html`, `AnabhiDev-AM_v2_3.html`) dibuka bersamaan di 1 laptop/browser yang sama, sehingga variabel device/OS sudah tereliminasi sepenuhnya. Hasilnya murni soal kode: file yang punya custom scrollbar CSS tampil ramping, file yang tidak punya tampil tebal-abu-abu default browser — bukan soal macOS vs Windows/Linux seperti dugaan sebelumnya. Isi aturan mandatory-nya (scrollbar custom wajib di sidebar/drawer) tidak berubah dari v1.4 — yang dikoreksi murni reasoning/bukti pendukungnya.

- [ ] **Reasoning item scrollbar custom (kategori 13) diperbaiki** — dari klaim "kemungkinan perbedaan device/OS" (belum terverifikasi) menjadi bukti langsung 1-laptop/1-browser (variabel device tereliminasi, perbedaan murni dari ada/tidaknya CSS scrollbar). Detail lengkap lihat kategori 13.

---

## Changelog v1.4 (25 Agustus 2026)

> Revisi ini menutup 4 gap yang ditemukan langsung dari pemakaian nyata: bug logo yang kembali tertutup kotak putih di beberapa file Web Interactive meski sumber logo sudah transparan (root cause: CSS container diberi `background:#ffffff` secara tidak sengaja, bukan masalah pada file gambar), scrollbar sidebar yang tidak konsisten gaya defaultnya antar file, logo yang belum jadi tautan navigasi balik ke `anabhidev.com`, dan progress indicator persentase di topbar SOP checklist yang dianggap tidak perlu. Juga menambah penegasan standar meta/favicon/OG untuk project Anabhi Dev sendiri, memakai `AnabhiDev - index.html` (situs utama anabhidev.com) sebagai patokan resmi.

1. **Kategori 13 (Dark/Light Mode & Theming) — item baru: scrollbar custom wajib.** Dibuktikan langsung dari 1 screenshot berisi 3 file dibuka bersamaan di 1 laptop/browser yang sama (`ANABHIDEV-NASATYA_v1_1.html`, `AnabhiDev-SOP_v1.3.html`, `AnabhiDev-AM_v2_3.html`) — variabel device/OS sudah tereliminasi karena satu mesin yang sama. Hasilnya: file yang punya custom scrollbar (SOP v1.3) tampil ramping, file yang tidak (AM/ARVENAA) tampil tebal-abu-abu khas default browser. Supaya sidebar terasa polished dan konsisten independen dari device pembuka, scrollbar custom tipis dinaikkan jadi mandatory baru, bukan lagi opsional.
2. **Kategori 15 (Standar Logo) — item baru: `background` pada container logo DILARANG; kalau logo Anabhi Dev yang dipakai, logo itu WAJIB jadi tautan.** Root cause bug "logo kembali putih" diidentifikasi tepat: `.brand-mark{background:#ffffff}` (atau padanannya) di beberapa file Web Interactive — bukan file `logo.webp`/`logo-black.webp` itu sendiri, yang sudah dikonfirmasi transparan. Ditambahkan juga aturan baru yang bersyarat, bukan mandatory logo Anabhi Dev di semua project: **kalau** project memang memakai logo Anabhi Dev (sesuai rule umum "logo mengikuti project" yang tidak berubah), logo itu (sidebar maupun hero) wajib dibungkus `<a href="https://anabhidev.com">` — supaya logo berfungsi ganda sebagai navigasi pulang ke situs utama.
3. **Kategori 14 (Header Mobile) — item baru: topbar tidak wajib menampilkan progress percentage.** Pola "0% (0/247)" yang dipakai di `AnabhiDev-SOP_v1.3.html` dicatat sebagai pola opsional milik file checklist itu sendiri, bukan pattern umum Blueprint B — supaya tidak tanpa sadar ditiru ke project Web Interactive lain yang tidak punya konsep checklist/progress.
4. **Kategori 2 (SEO Technical) — penegasan standar meta/favicon/OG untuk project Anabhi Dev sendiri**, dengan `AnabhiDev - index.html` (anabhidev.com) sebagai patokan resmi berisi nilai lengkap siap-pakai (favicon, apple-touch-icon, theme-color, OG lengkap dengan dimensi gambar, Twitter Card, `@graph` 4-tipe) — bukan cuma spesifikasi umum seperti sebelumnya.

---

## Changelog v1.3 (19 Agustus 2026)

> Revisi ini menaikkan standar Blueprint B (Web Interactive) ke pola yang jauh lebih matang, berdasarkan file produksi nyata (`AnabhiDev-AM_v2_3.html` — ARVENAA Meals) yang sudah lolos beberapa putaran perbaikan sebelumnya. Juga menutup satu gap konseptual besar: standar logo sebelumnya hanya menyebut 2 URL Anabhi Dev secara hardcode, padahal mayoritas project adalah pekerjaan untuk pihak lain (klien, kantor) yang punya identitas visual sendiri.

1. **Penamaan kategori Blueprint B diubah** dari istilah spesifik "guide/dokumentasi" menjadi **"Web Interactive / Interactive Product Brief"** — istilah umum yang dipakai sehari-hari untuk merujuk jenis halaman ini, apa pun isinya (brief produk, dokumentasi, SOP interaktif, dsb). Tidak ada lagi penamaan berdasarkan nama file contoh tertentu.
2. **Patokan referensi Blueprint B diganti total** dari `Master-Brief.html` (v1.2, masih menyisakan bug `78ch` yang perlu diperbaiki manual) ke **`AnabhiDev-AM_v2_3.html`** — file produksi yang sudah bersih dari awal, dengan pola kontras eksplisit per token warna, hero gradient dengan warna teks konstan, skip link, dan print stylesheet.
3. **Struktur hero WAJIB diperbarui** — dari "hero band datar, warna ikut light/dark mode" (pola v1.2 yang berpotensi bug kontras jika tidak dikerjakan hati-hati) menjadi **grid 2 kolom dengan gradient gelap solid + card logo putih**, di mana warna teks hero konstan di kedua mode karena backgroundnya tidak pernah berubah. Struktur ini wajib sama di semua project; yang boleh berbeda per-project **hanya nilai warna (color palette)** gradiennya.
4. **Kategori 15 (Standar Logo) ditulis ulang total** dari hardcode 2 URL Anabhi Dev menjadi **rule umum "logo mengikuti project yang dikerjakan"** — project Anabhi Dev sendiri pakai logo Anabhi Dev, project klien/kantor pakai logo project/klien tersebut. Dua URL Anabhi Dev tetap dicantumkan sebagai default/contoh, bukan satu-satunya nilai yang sah.
5. **5 item mandatory baru ditambahkan** ke kategori yang relevan: skip link (aksesibilitas), print stylesheet (`@media print`), tombol print/PDF di topbar, fokus otomatis ke item navigasi pertama saat drawer dibuka (bukan cuma dikembalikan saat ditutup), dan scrollspy wajib pakai `IntersectionObserver` (bukan `scroll` event manual).
6. **`Esc` global diperluas** — sebelumnya hanya menutup drawer, sekarang eksplisit disebutkan juga harus menutup modal/dialog apa pun yang sedang terbuka, drawer ditutup hanya jika tidak ada modal yang lebih prioritas.
7. **Komentar rasio kontras eksplisit** dijadikan bagian dari definisi token warna — setiap warna aksen yang dipakai untuk teks wajib punya catatan rasio kontras terukur (misal `/* varian gelap: kontras 6,7:1 di atas putih */`) langsung di baris CSS-nya, bukan diverifikasi terpisah di akhir saja.
8. **Item lama yang sudah tidak relevan dihapus/diselaraskan**: seluruh referensi ke `Master-Brief.html` sebagai patokan (di kategori 1, 14, dan Blueprint B) diperbarui ke patokan baru; catatan "masih menyisakan bug 78ch" dihapus karena patokan baru sudah bersih dari awal.

---

## Daftar Isi

> Cek daftar ini dulu untuk cari topik cepat sebelum baca isi lengkap `.md`.

**Bagian I — Fondasi (berlaku untuk semua jenis project)**

1. **Front-end & Performance** — Core Web Vitals (LCP/INP/CLS), blok CSS starter wajib, **aturan width MANDATORY (baru, diperluas)**, font loading (self-host vs CDN), DOM budget, GTM trade-off, path absolut vs root-relative, multi-band, form UX (`autocomplete`), audit font-weight
2. **SEO Technical** — robots.txt, sitemap, canonical (+ false-alarm staging), meta tags, structured data per tipe halaman, `@graph` untuk personal brand, heading hierarchy, statistik crawler-safe, meta keywords (jangan), favicon spec, `theme-color`/manifest, **patokan meta/favicon/OG lengkap Anabhi Dev (v1.4, baru)**, `hreflang` teknis, NAP consistency
3. **GEO (Generative Engine Optimization)** — `llms.txt`, AI crawler access, citation-friendly content, content freshness
4. **Security** — HTTPS/TLS, security headers, CSP (+ prasyarat nol-inline), CORS, secrets, input validation, rate limiting, dependency scanning, supply-chain/SRI, honeypot form
5. **Backend/Database/API** — RLS Supabase, policy read/write, optimasi performa RLS, storage RLS, error handling
6. **Hosting & Deployment / DevOps** — CI/CD, staging/production, branching, DNS, email DNS (SPF/DKIM/DMARC), custom error page, redirect chain, subdomain takeover, `.assetsignore`
7. **Analytics, Marketing & Ekosistem Pihak Ketiga** — Analytics bertingkat (Plausible vs GA4+GTM), Search Console (+ AI performance report baru), Google Ads vs AdSense, Google Maps, YouTube, reCAPTCHA, Site Kit, Meta Pixel, event taxonomy
8. **Legal & Compliance** — Privacy Policy, ToS, cookie consent, accessibility (kontras, skip link, `:focus-visible`, `aria-expanded`, touch target 24px AA/44-48px praktik baik)
9. **Pre-launch & Post-launch** — checklist go-live, validasi otomatis (brace balance, JSON-LD, width, theme), **default bahasa bilingual (baru)**, submit GSC
10. **Maintenance Rutin** — update dependency, broken link, SSL/domain expiry, backup + RTO/RPO
11. **Verifikasi Otomatis Sebelum Deploy** — perintah `grep`/Python siap pakai, **ditambah verifikasi width/theme/logo (v1.2)**, **ditambah verifikasi background container logo & scrollbar (v1.4, baru)**
12. **Aset Visual & Kredibilitas** — sumber foto, verifikasi metadata, max 2× pemakaian, larangan screenshot, cara ganti foto manual
13. **Dark/Light Mode & Theming** *(BARU)* — token `[data-theme]`, deteksi `prefers-color-scheme`, anti-FOUC, varian warna per mode, **scrollbar custom wajib (v1.4, baru)**
14. **Header Mobile — Posisi Hamburger, Judul, Toggle** *(BARU)* — aturan anti-tumpuk saat drawer dibuka, **catatan progress percentage bukan pattern wajib (v1.4, baru)**
15. **Standar Logo — Sumber & Penempatan** *(v1.3 — rule umum, logo mengikuti project yang dikerjakan; v1.4 — larangan `background` pada container + logo Anabhi Dev wajib jadi tautan KALAU logo Anabhi Dev yang dipakai; v1.6 — klarifikasi path hosting ≠ logo wajib Anabhi Dev)* — dua titik pemasangan wajib, **tabel URL logo resmi per brand: Anabhi Dev & Miss Fish Bali (v1.8, baru)**
16. **Bottom Navigation 5-Tab (Web App)** *(BARU)* — standar umum, bukan cuma dashboard
17. **Header File Kode & Penamaan File** *(BARU)* — cross-reference resmi ke `Standar_Coding_*_v1.4.md` (**dua edisi: Anabhi Dev & Miss Fish — v1.8, diperjelas**), **klarifikasi prefix file ≠ logo wajib Anabhi Dev (v1.6, baru)**
18. **PWA — Progressive Web App (Android & iOS)** *(BARU v1.8 — dilebur penuh dari `PANDUAN-PWA.md`; **v1.9 — 2 koreksi besar**)* — 4 syarat wajib install, `manifest.json` teraman (larangan `id` berquery & `?v=` pada ikon), ikon maskable ≤80% kanvas, splash Android 12+ vs iOS, Service Worker anti "tidak update-update", **🔴 larangan `preventDefault()` supaya pop-up install Chrome muncul + pola pop-up & tombol keduanya (18.6, v1.9)**, **aplikasi vs pintasan**, **🔴 Service Worker mewarisi CSP → self-host font wajib (18.12, v1.9)**, `_headers`, checklist verifikasi, prompt siap pakai
19. **Standar Login Page — Split Layout** *(BARU v1.8 — dilebur dari `missfish-login-standard.md`)* — struktur wajib (visual kiri / form kanan 65/35, urutan elemen, panel kiri hidden di mobile), palet & font menyesuaikan project, aksesibilitas & anti-enumerasi akun

**Bagian II — Blueprint per Jenis Project**

- **A.** Company Profile / Marketing / Personal Brand Portfolio — patokan `index-v2.html`
- **B.** Web Interactive / Interactive Product Brief — patokan **`AnabhiDev-AM_v2_3.html`** *(v1.3 — diganti dari `Master-Brief.html`)*
- **C.** Digital Name Card / vCard — patokan `wibawa.html`
- **D.** Online Shop / E-commerce — patokan `kanaka-gadget-template22-v6.html` (fitur/UX saja, catatan status teknis)
- **E.** Dashboard dengan Login PIN — patokan `MF-AIA_v2_10.html`
- **F.** Game Edukasi Anak — patokan `Anabhi_MathFun_v4_0.html`
- **G.** Hospitality-Specific SEO — lapisan tambahan di atas Blueprint A untuk hotel/resort/villa/restaurant

**Lainnya:** Key Findings · Alur Kerja Ideal (Performance Sejak Awal) · Prinsip Umum (Trade-off) · Recommendations · Caveats

---

## TL;DR
- Checklist ini menggabungkan ~180 item terstruktur dalam 19 kategori dengan reasoning per item dan ambang/threshold konkret (LCP < 2,5 dtk, INP < 200 ms, CLS < 0,1; kontras 4,5:1) sehingga langsung bisa dijadikan dua file: dokumen SOP Markdown dan halaman HTML interaktif berisi checkbox.
- Untuk stack Anabhi Dev (HTML/CSS/JS vanilla + Supabase/serverless + Cloudflare Pages/Netlify/Railway), prioritas tertinggi adalah: **enable RLS di setiap tabel Supabase** (default tabel terekspos lewat Data API), set security headers di level platform (`_headers`/`netlify.toml`), pakai analytics cookieless (Plausible) agar bebas cookie banner, dan pastikan AI crawler tidak terblokir oleh default Cloudflare.
- Item baru paling penting di 2026 adalah **GEO**: publikasikan `llms.txt`, jangan blokir AI crawler (GPTBot/ClaudeBot/PerplexityBot dll.) di robots.txt maupun Cloudflare WAF, dan tulis konten "citation-friendly" (jawaban langsung di awal, heading jelas, data/statistik).
- **Kategori baru v1.8:** **18 (PWA)** dan **19 (Login Page)**. Kalau project dinyatakan PWA, kategori 18 mandatory penuh — jebakan terbesarnya: install yang jadi *pintasan* alih-alih aplikasi (penyebab tersering: field `id` berquery di manifest), dan splash Android 12+ yang **tidak bisa** dibedakan dari ikon aplikasi (jangan pernah dijanjikan ke klien). Untuk login page, **struktur** split visual-kiri/form-kanan wajib sama di semua project sementara **palet warna** menyesuaikan identitas project.
- **Item MANDATORY baru v1.2:** aturan width — dilarang mutlak memberi `max-width` angka tetap pada container maupun elemen teks di halaman jenis guide/dashboard/brief. Ini pelanggaran yang sudah terjadi berulang di banyak file, termasuk file checklist versi sebelumnya sendiri.

## Key Findings
1. **Core Web Vitals tetap tiga metrik utama**: LCP < 2,5 dtk, INP < 200 ms, CLS < 0,1, dievaluasi pada persentil ke-75 data lapangan (Chrome UX Report/CrUX). INP (mengganti FID sejak Maret 2024) adalah metrik yang paling sering gagal — 43% website masih gagal ambang 200 ms ini, menjadikannya Core Web Vital yang paling sering gagal di 2026 — karena memerlukan perubahan arsitektur JavaScript, bukan sekadar kompresi aset. (Pass-rate global keseluruhan hanya ~55,9% origin per rilis CrUX Mei 2026.)
2. **Keamanan adalah lapisan pertahanan berlapis (defense in depth)**: security headers di level server/platform + validasi input sisi server + RLS di database. Untuk Supabase, RLS WAJIB di setiap tabel pada schema yang terekspos; tabel tanpa RLS = publik via API.
3. **GEO adalah disiplin baru 2026**: visibilitas di ChatGPT/Perplexity/Claude/Google AI Overviews bergantung pada apakah AI bisa meng-crawl dan mengutip konten. Memblokir bot yang salah = hilang dari AI search.
4. **Privasi & analitik**: alat cookieless seperti Plausible menghilangkan kebutuhan cookie banner untuk analytics, tetapi tetap perlu Privacy Policy; alat berbasis cookie (GA4) memerlukan consent banner di bawah ePrivacy/GDPR.
5. **Untuk solo developer**, otomatisasi adalah kunci: deploy preview otomatis (Cloudflare Pages/Netlify), monitoring uptime gratis, dependency scanning, dan backup terjadwal mengurangi beban operasional.
6. **Width yang tidak konsisten adalah bug paling sering berulang di seluruh riwayat project Anabhi Dev** *(baru v1.2)* — akar masalahnya bukan cuma satu selector (`.wrap`/`.main`), tapi pola berpikir "beri max-width supaya rapi" yang diterapkan tanpa sadar ke elemen teks (`p`, `ul`, `ol`). Standar lama menutup satu lubang tapi membuka lubang lain karena tidak eksplisit menyebut elemen teks.

---

## Details — Checklist Lengkap per Kategori

### 1. Front-end & Performance

**Core Web Vitals**
- [ ] **LCP < 2,5 detik (target "Good")** — diukur pada persentil ke-75 pengguna nyata. *Reasoning:* LCP mengukur kecepatan render konten utama; perbaikan tertinggi: preload gambar hero, inline critical CSS, preload font, server-side rendering.
- [ ] **INP < 200 ms** — *Reasoning:* INP mengukur responsivitas semua interaksi. Pecah long task JavaScript >50 ms, defer skrip pihak ketiga (chat widget, analytics), kurangi kompleksitas DOM.
- [ ] **CLS < 0,1** — *Reasoning:* set `width`/`height` eksplisit pada semua `<img>`, `<video>`, `<iframe>`, dan slot iklan; reservasi ruang untuk konten dinamis; hindari menyisipkan konten di atas konten yang sudah ada (cookie banner/pop-up).
- [ ] Pasang alert saat metrik melewati 80% ambang (INP > 160 ms, LCP > 2,0 dtk, CLS > 0,08) sebelum memengaruhi window CrUX 28 hari.

**Image Optimization**
- [ ] Gunakan format modern: **AVIF** (kompresi ~50% lebih baik dari JPEG) dengan fallback **WebP** (~25–35% lebih kecil dari JPEG, dukungan ~97% browser) lalu JPEG, via elemen `<picture>`. *Reasoning:* gambar = mayoritas page weight; format modern memangkas payload 50–80%.
- [ ] **Hitung dimensi final sebelum upload** — jangan asal pakai file mentah dari kamera/editor. Cek ukuran tampil terbesar di CSS (cek breakpoint mobile DAN desktop — biasanya **mobile yang lebih besar** karena layout 1 kolom, jadi cek itu dulu). Rumus: ukuran tampil terbesar (px) × density factor **1.3–1.6x** = dimensi file yang diupload.
  - *Contoh nyata (project anabhidev.com):* logo tampil maksimal 250×140px (mobile) → 250×1.6=400, 140×1.6=224 → upload di **400×224px**.
  - *Reasoning kenapa 1.3–1.6x, bukan 2x penuh:* 2x ("retina standard") paling tajam, tapi Lighthouse selalu anggap itu "oversized" dan tetap flag warning meski sudah dikompres maksimal — 1.3–1.6x titik tengah paling realistis antara tajam vs ringan.
  - Set `quality` di kisaran 75–85 saat export — cek visual dulu sebelum putuskan (test beberapa angka quality, bandingkan size vs ketajaman).
- [ ] Responsive images dengan `srcset` + `sizes`. *Reasoning:* jangan kirim gambar desktop ke layar mobile; hemat 60–70% delivery mobile.
- [ ] `loading="lazy"` untuk gambar di bawah fold; **JANGAN** lazy-load gambar above-the-fold/LCP. *Reasoning:* lazy-load gambar LCP justru memperburuk LCP.
- [ ] **Untuk LCP element** (biasanya hero image/foto utama di atas fold), pakai `fetchpriority="high"` — kebalikan dari lazy-load, supaya browser prioritaskan download-nya lebih awal.
- [ ] Selalu set `width` & `height` (atau `aspect-ratio`) untuk mencegah CLS.
- [ ] Kompres dengan Squoosh/ImageOptim/TinyPNG; cari sweet spot kualitas vs ukuran.

**CSS/JS & Font**
- [ ] Minify & bundle CSS/JS; inline critical CSS untuk above-the-fold.
- [ ] Defer/async skrip non-kritis. *Reasoning:* skrip render-blocking menaikkan LCP & INP.
- [ ] **Font (self-host, default direkomendasikan):** self-host WOFF2 + `font-display: swap` (atau `optional` untuk CLS nol); preload 1–2 font kritis dengan `<link rel="preload" as="font" crossorigin>`; subset karakter; batasi 2–3 weight; pakai variable font bila perlu. *Reasoning:* font menyebabkan FOIT/FOUT dan layout shift; WOFF2 memangkas transfer 60–70%.
- [ ] **Font (kalau pakai Google Fonts/CDN pihak ketiga) — 🔴 DILARANG untuk PWA, lihat kategori 18.12.** Pada PWA ber-CSP ketat, `connect-src 'self'` ikut menempel ke `sw.js` dan memblokir Service Worker mengambil font lintas domain; stylesheet gagal dengan `ERR_FAILED` tanpa pesan CSP, dan halaman diam-diam memakai font bawaan sistem. Untuk website biasa (non-PWA) opsi ini tetap sah: pasang `<link rel="preconnect">` ke `fonts.googleapis.com` dan `fonts.gstatic.com` (dengan `crossorigin` untuk yang kedua) — mempercepat koneksi sebelum font benar-benar di-request. Jangan import terlalu banyak font-weight yang tidak dipakai (tiap weight = 1 file terpisah yang didownload).

**DOM & JavaScript Runtime**
- [ ] **Jaga jumlah elemen DOM** — idealnya di bawah ~800 elemen per halaman (Lighthouse mulai warning di atas 1.500). Halaman dengan banyak card/grid (portfolio, produk, dll) gampang membengkak, pertimbangkan pagination/load-more kalau listnya sangat panjang.
- [ ] **Hindari forced reflow** di JavaScript — jangan baca properti geometris (`offsetHeight`, `offsetWidth`, `scrollHeight`, `getBoundingClientRect()`) lalu langsung tulis style di baris berikutnya tanpa pembungkus.
  - ✅ Bungkus baca+tulis dengan `requestAnimationFrame()`.
  - ✅ Untuk event yang sering nembak (`scroll`, `resize`), tambahkan **debounce** (resize) atau **RAF-throttle** (scroll) supaya fungsi tidak terpanggil berlebihan.
- [ ] **Trade-off Google Analytics/GTM** — biasanya kontributor terbesar untuk "unused JavaScript" dan Total Blocking Time (TBT) di hasil Lighthouse.
  - ❌ JANGAN coba defer/lazy-load GTM secara manual — di device lemah ini bisa **memperburuk** TBT (long tasks numpuk).
  - ❌ JANGAN matikan GTM cuma di mobile — desktop bisa ikut kena dampak negatif, dan kehilangan data analytics visitor mobile (biasanya mayoritas traffic).
  - ✅ Terima sebagai cost yang melekat selama masih pakai Google Analytics. Kalau performance adalah prioritas utama (mis. e-commerce sensitif loading speed), pertimbangkan alternatif lebih ringan (Plausible/Fathom — lihat kategori 7 — atau Cloudflare Web Analytics yang sudah include kalau pakai Cloudflare, tanpa perlu GTM tambahan).

**Caching**
- [ ] **Cache-Busting Wajib lewat Version Query (`?v=YYYYMMDDx`) sejak hari pertama** *(v1.7 — dilebur dari Addendum Cache-Busting)* <span class="ci-badge badge-mandatory">MANDATORY</span> — browser dan CDN Cloudflare meng-cache file berdasarkan URL lengkap sebagai kunci. Jangan ubah isi file tanpa mengubah URL jika ingin update langsung terlihat seketika tanpa purge manual.
  - **Format standar:** `[nama-file].[ext]?v=[YYYYMMDD][huruf-urutan]` (contoh: `css/style.css?v=20260828a`, revisi kedua hari yang sama: `?v=20260828b`).
  - **Checklist aset WAJIB ber-version-query:**
    - [ ] Setiap file CSS internal (`<link rel="stylesheet" href="css/style.css?v=...">`)
    - [ ] Setiap file JS internal (`<script src="js/main.js?v=..." defer>`)
    - [ ] Setiap gambar milik sendiri di HTML atau CSS yang berpotensi diganti (`assets/logo.webp?v=...`, `background: url('hero.webp?v=...')`)
    - [ ] Favicon SVG/PNG & Apple Touch Icon
    - [ ] File konfigurasi JSON / Manifest lokal
  - **TIDAK perlu version query:** Aset CDN pihak ketiga (Google Fonts, Unsplash, Pexels).
  - 🔴 **PENGECUALIAN MUTLAK — URL ikon di dalam `manifest.json` PWA DILARANG memakai `?v=`** *(v1.8, lihat kategori 18)* — query string di URL ikon manifest membuat pembuatan WebAPK gagal dan install jatuh jadi *pintasan*. Untuk ikon PWA, cache-busting dilakukan dengan **mengganti nama berkasnya** (`icon-512-2.png`), bukan menambah query. Berlaku juga untuk `sw.js` dan `manifest.json` itu sendiri — keduanya dikendalikan lewat `Cache-Control: max-age=0, must-revalidate` di `_headers`, bukan lewat version query.
  - **Alternatif Otomatis untuk file yang SERING diganti dengan nama sama (foto tim, foto produk):** Jangan pakai `immutable`, pasang cache durasi pendek di `_headers` (`max-age=300` / 5 menit, `must-revalidate`) agar revalidate otomatis tanpa perlu mengingat naik versi query tiap saat.
- [ ] Set `Cache-Control: public, max-age=31536000, immutable` untuk aset statis ber-hash milik kita sendiri (font, CSS, JS, gambar) lewat `_headers` (Cloudflare/Netlify) atau setara. *Reasoning:* caching browser & CDN mengurangi request ke origin.
- [ ] Manfaatkan CDN (Cloudflare/Netlify edge) untuk distribusi global, penting untuk audiens Bali/Asia-Pasifik.
- [ ] **Terima sebagai limitasi:** asset pihak ketiga (Google Fonts, GTM, Cloudflare beacon, dll) TIDAK BISA diatur cache-nya dari sisi kita — jangan buang waktu coba "fix" warning cache lifetime untuk aset jenis ini.

**Mobile, Accessibility & Cross-browser**
- [ ] Responsif penuh; uji di iPhone & Android mid-range (>60% trafik dari mobile; Google pakai skor mobile sebagai sinyal utama).
- [ ] **Aksesibilitas WCAG 2.2 AA dasar** (lihat kategori 8) — alt text, kontras 4,5:1, navigasi keyboard, ARIA bila HTML tak cukup.
- [ ] Cross-browser test: Chrome, Firefox, Safari, Edge (desktop + mobile).
- [ ] **Cegah horizontal scroll (overflow-x) di mobile** — selalu set `html, body { overflow-x: hidden; }` di semua project. Penting: `overflow-x: hidden` di `body` saja **tidak cukup** — browser dapat scroll di level `html`, sehingga kedua elemen harus di-set. Tambahkan juga `max-width: 100vw` pada section/wrapper yang memiliki elemen `position: absolute` berukuran besar (decorative blobs, hero shapes, background patterns) karena elemen absolute tidak ter-contain oleh `overflow: hidden` parent-nya secara konsisten di semua browser. *Reasoning:* horizontal scroll di mobile adalah salah satu UX error paling umum — membuat layout tampak rusak, merusak kepercayaan visitor, dan dapat menurunkan skor Lighthouse mobile.

**Tools & Cara Testing Performance**
> Pakai minimal 2–3 tool, jangan andalkan 1 saja — skor jelek di satu tool belum tentu representasi pengalaman visitor asli.

| Tool | Kelebihan | Catatan |
|---|---|---|
| [PageSpeed Insights](https://pagespeed.web.dev) | Resmi dari Google, paling detail soal SEO/Accessibility | Mobile test pakai **device emulasi lemah (Moto G Power)** + **Slow 4G** — kondisi terburuk yang disengaja, bukan kondisi rata-rata |
| [GTmetrix](https://gtmetrix.com) | Bisa pilih device asli (iPhone, Pixel) | Versi gratis lokasi server terbatas (biasanya USA) |
| [Pingdom Tools](https://tools.pingdom.com) | Bisa pilih lokasi server (pilih **Asia/Tokyo** untuk representasi visitor Indonesia) | Lebih simpel, kurang detail |
| [WebPageTest](https://webpagetest.org) | Paling detail (filmstrip per detik, bisa test dari berbagai lokasi & device asli) | Lebih teknis, butuh waktu lebih untuk baca hasilnya |

- [ ] Selalu cross-check skor PageSpeed dengan minimal 1 tool lain (GTmetrix/Pingdom) sebelum ambil keputusan besar berdasarkan skor semata.
- *Reasoning:* PageSpeed mobile sengaja simulasi kondisi ekstrim; kalau skor jelek cuma karena itu (bukan kondisi rata-rata visitor asli), itu bukan masalah darurat.

**Target Skor PageSpeed (4 kategori × 2 platform + 1 kategori baru)**
> PageSpeed selalu test 2 platform terpisah (Mobile & Desktop). Masing-masing punya 4 kategori bernilai 0–100: Performance, Accessibility, Best Practices, SEO. Ada kategori ke-5 baru di 2026, **Agentic Browsing**, format beda (misal "2/2", bukan 0–100).

- [ ] **Performance** — target realistis: desktop 95–98+, mobile 80–90+ (mobile 100 murni sangat sulit kalau pakai analytics + custom font).
- [ ] **Accessibility** — target: 100, realistis dicapai.
- [ ] **Best Practices** — target: 100.
- [ ] **SEO** — target: 100.
- [ ] **Agentic Browsing** (kategori baru, masih berkembang) — target: lolos semua. Soal kualitas halaman untuk dibaca AI agent/browser otomatis (bukan manusia). Biasanya otomatis lolos kalau HTML semantic-nya rapi (heading hierarchy benar, landmark elements `<nav>`/`<main>`/`<footer>` terisi, tidak ada struktur HTML yang kacau).

**Blok CSS Starter Wajib (copy-paste di awal setiap project baru)**
> *Reasoning:* SOP yang hanya jadi bacaan sering terlewat saat kerja cepat. Blok ini menutup celah itu — bukan checklist untuk dicek, tapi kode siap tempel yang otomatis menutup 4 masalah paling sering ditemukan berulang di project-project sebelumnya (overflow horizontal, fokus keyboard tak terlihat, animasi tak bisa dimatikan, teks screen-reader-only).
```css
/* Overflow lock — WAJIB html DAN body, body saja tidak cukup */
html, body { overflow-x: hidden; max-width: 100%; }

/* Focus indicator — jangan andalkan default browser, kontrasnya sering < 3:1 */
:focus-visible { outline: 2px solid var(--accent, #2E9FF2); outline-offset: 2px; }

/* Screen-reader-only text */
.sr-only {
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

/* Hormati preferensi motion pengguna */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
```
- [ ] **JANGAN pakai `background-attachment: fixed`** — rusak di iOS Safari (background jitter atau tidak scroll sama sekali). Bug ini **tidak terlihat saat testing di desktop**, jadi mudah lolos QA kalau tidak sengaja dicek di iPhone. Kalau butuh efek parallax, pakai `transform` via JS/CSS animation, bukan `background-attachment`.
- [ ] **ATURAN WIDTH — MANDATORY, TIDAK BISA DITAWAR** *(v1.2 — diperluas dari aturan lama yang hanya menyebut `.main`)*
  > *Kenapa dinaikkan jadi mandatory:* pelanggaran aturan ini sudah terjadi berulang di 5+ file berbeda — termasuk file checklist SOP versi sebelumnya sendiri (`.card{max-width:900px}`). Aturan lama menutup satu selector (`.main`) tapi diam-diam membiarkan elemen teks lain (`p`, `ul`, `ol`, `.lead`) tetap dibatasi `max-width:78ch`/`70ch`, sehingga bug yang sama muncul lagi dalam bentuk berbeda: section berhenti di garis kanan yang tidak konsisten satu sama lain.

  Untuk **semua** halaman jenis guide / dokumentasi / dashboard / brief interaktif (Blueprint B & E):

  1. **DILARANG** memberi `max-width` berupa angka px tetap pada container mana pun — `.wrap`, `.main`, `.container`, `.inner`, `.content`, `.section`, `section`, `article`, atau nama class apa pun yang membungkus konten utama.
  2. **DILARANG** memberi `max-width` (baik satuan px maupun `ch`) pada elemen teks — `p`, `ul`, `ol`, `li`, `.lead`, `blockquote`, atau elemen naratif lain di halaman jenis ini. **Semua section wajib berakhir di garis kanan yang sama persis** — paragraf, bullet list, tabel, blok kode, dan callout card tidak boleh ada yang berhenti lebih awal dari yang lain.
  3. Lebar dibatasi **HANYA** lewat `padding` kiri-kanan pada container utama, memakai `clamp()` responsif — bukan angka tetap:
     ```css
     #main { padding: 40px clamp(24px, 6vw, 180px) 100px; }
     ```
     *Kenapa `clamp(24px, 6vw, 180px)`, bukan `clamp(24px, 3.5vw, 64px)`:* di layar ultrawide (2560px+), padding berbasis `vw` kecil (3.5vw) menghasilkan baris teks sangat panjang (~200 karakter) yang melelahkan mata — sementara `max-width` angka tetap menyisakan ruang kosong dan membuat section berakhir tidak sejajar (bug yang justru ingin dihindari aturan ini). `6vw` dengan batas atas `180px` adalah jalan tengah: padding ikut melebar di layar sangat lebar (menyempitkan kolom teks secara alami tanpa `max-width`), tapi di layar ≤1440px (mayoritas kasus nyata) hasilnya nyaris identik dengan padding kecil biasa karena `6vw` masih di bawah batas atas `180px` pada resolusi tersebut.
  4. Lebar **wajib mengikuti lebar browser** di semua breakpoint. Browser dikecilkan → konten ikut mengecil. **Nol horizontal scroll** di lebar berapa pun, dari 320px sampai 3840px+.
  5. Aturan `max-width: 65–75ch` untuk long-form text **hanya** berlaku untuk artikel/blog murni (Blueprint A) — bukan untuk guide/dokumentasi/dashboard/brief (Blueprint B/E).
  6. **Elemen yang tidak bisa menyempit secara alami wajib ditangani eksplisit** — ini penyebab horizontal scroll yang paling sering **lolos** dari deteksi `overflow-x:hidden` karena bukan soal container, tapi soal elemen di dalamnya yang menolak mengecil:
     ```css
     .grid > *, .row > *, .flex > * { min-width: 0; }
     pre, code { overflow-x: auto; max-width: 100%; }
     .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
     img, svg, video, canvas, iframe { max-width: 100%; height: auto; }
     ```
     *Reasoning:* default flex/grid item adalah `min-width:auto` — item menolak mengecil di bawah lebar konten intrinsiknya. Satu baris kode panjang atau satu kata tanpa spasi di dalam card cukup untuk melebarkan seluruh grid dan memicu horizontal scroll, meski `overflow-x:hidden` sudah terpasang di `html,body`.
  7. **`max-width:100vw` pada `html`/`body` DILARANG** — pakai `max-width:100%`. *Reasoning:* `100vw` menghitung termasuk lebar scrollbar (~15px) di browser yang scrollbar-nya memakan ruang layout (Windows/Linux non-overlay) — menyebabkan overflow horizontal ~15px yang tidak terlihat di Mac (scrollbar overlay) tapi nyata di Windows/Linux. `max-width:100vw` tetap boleh dipakai khusus pada wrapper elemen `position:absolute` besar (lihat item overflow lock di atas) — konteksnya berbeda dari batas lebar `html`/`body`.
- [ ] **Jump navigation wajib `scroll-margin-top`** — untuk halaman dengan sidebar `position:fixed` + jump link (`href="#section"`), setiap target section wajib:
  ```css
  section[id] { scroll-margin-top: calc(var(--header-h) + 16px); }
  ```
  *Reasoning:* tanpa ini, judul section yang dituju selalu tertutup sebagian oleh header fixed saat diklik dari sidebar — bug yang terasa murah meski fungsinya "jalan".
- [ ] **`100dvh`, bukan `100vh`, untuk elemen full-height di mobile** (drawer, overlay, modal) — beri fallback:
  ```css
  height: 100vh;
  height: 100dvh;
  ```
  *Reasoning:* `100vh` di mobile Safari dihitung termasuk area address bar yang bisa collapse/expand, membuat elemen full-height terpotong atau meninggalkan gap saat address bar berubah ukuran. `100dvh` (dynamic viewport height) mengikuti tinggi viewport aktual yang terlihat.
- [ ] **Aturan `max-width` disesuaikan jenis halaman, bukan angka default yang sama untuk semua** — *Reasoning:* satu ukuran tidak cocok untuk semua kebutuhan.
  - **Guide/dokumentasi/dashboard interaktif** (sidebar + konten): lihat aturan MANDATORY di atas — tanpa `max-width` sama sekali pada container maupun elemen teks.
  - **Artikel/blog/long-form text**: `max-width: 65–75ch` (karakter, bukan px) — panjang baris optimal untuk keterbacaan teks panjang.
  - **Marketing/landing page**: `max-width: 1200px` umum dipakai, section besar (hero, CTA) boleh full-bleed dengan konten di dalam tetap dibatasi.
- [ ] **Font loading dari CDN pihak ketiga tetap render-blocking walau sudah `preconnect`** — *Reasoning:* `preconnect` cuma mempercepat koneksi, bukan menghilangkan sifat render-blocking dari CSS font itu sendiri. Pola lengkap yang benar-benar menurunkan render-blocking time (terukur ~750ms saving pada kasus nyata):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=...">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..." media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=..."></noscript>
```
- [ ] **Strategi path (root-relative vs absolut) — pilih sadar, bukan default begitu saja.** *Reasoning:* path root-relative (`/logo.webp`, `/cv/`) **rusak saat file dibuka langsung dari lokal** (`file://`) — browser membaca `/` sebagai root drive (`C:/`), bukan root domain, karena tidak ada server yang menerjemahkan path tersebut.
  - Kalau workflow butuh preview lokal (double-click file, cek sebelum upload ke server) — **wajib pakai URL absolut penuh** (`https://domain.com/...`), bukan root-relative.
  - Trade-off: kalau ganti domain nanti, perlu find-replace manual di semua file. Ini trade-off yang disadari dan diterima, bukan oversight.
- [ ] **Struktur multi-band (alternating dark/light section)** — kalau section terakhir sebelum footer dan footer sendiri berada dalam warna band yang sama (misal sama-sama dark), berikan sedikit variasi surface color (bukan ganti band sepenuhnya) supaya footer tetap terasa sebagai lapisan terpisah, bukan menyatu tanpa batas dengan section di atasnya. *Reasoning:* tanpa variasi ini, batas antar section jadi tidak terbaca secara visual meski secara kode itu 2 elemen berbeda.
- [ ] **Konsistensi nada label tombol/link per konteks, bukan per elemen individual** — CTA button besar (ajakan bertindak langsung) boleh personal/kata kerja ("WhatsApp Me", "Hubungi Saya"). Link dalam daftar kontak/footer (sejajar dengan Email, LinkedIn, GitHub) harus ikut nada netral kolom tersebut ("WhatsApp" saja, bukan "WhatsApp Me") — supaya tidak menonjol sendirian di antara item sejenis dalam satu daftar.
- [ ] **Form UX — `type` dan `autocomplete` yang tepat pada setiap input**, bukan semua `type="text"`. *Reasoning:* input type yang benar memicu keyboard mobile yang sesuai (numpad untuk nomor, keyboard email dengan simbol `@` mudah diakses, dst) dan `autocomplete` memungkinkan browser mengisi otomatis dari data tersimpan user — mengurangi friksi pengisian form, terutama di mobile.
  ```html
  <input type="email" autocomplete="email">
  <input type="tel" autocomplete="tel">
  <input type="text" autocomplete="name">
  <input type="date">
  ```
  - [ ] Pesan error validasi jelas dan spesifik (bukan cuma "Invalid input") — sebutkan field mana dan kenapa gagal.
  - [ ] Validasi client-side untuk UX instan, **tetap wajib validasi server-side** (client-side bisa di-bypass, lihat kategori 4).
- [ ] **Audit font-weight yang di-load vs yang benar-benar dipakai** — tiap weight Google Fonts = 1 file terpisah yang didownload, meski tidak semuanya dipakai di CSS. Verifikasi sebelum deploy:
```bash
grep -rhoE "font-weight: [0-9]+" css/ | sort | uniq -c
# Bandingkan dengan weight yang di-load di URL Google Fonts —
# hapus weight yang di-load tapi 0 kemunculan di CSS.
```

### 2. SEO Technical
- [ ] **robots.txt** — kontrol crawler; JANGAN blokir aset CSS/JS atau halaman penting; uji di Google Search Console.
- [ ] **sitemap.xml** — submit ke GSC; segmentasi per tipe konten bila besar.
- [ ] **Canonical URL** — set `<link rel="canonical">` ke versi utama untuk hindari duplicate content.
- [ ] **Meta tags** — `title` unik (~50–60 char), `meta description` (~150–160 char), Open Graph (`og:title/description/image`), Twitter Card. *Reasoning:* mengontrol tampilan di SERP & social share.
- [ ] **Structured data / JSON-LD** — baseline `WebSite` + `Organization` (atau `LocalBusiness`); tambahkan tipe spesifik per bisnis. *Reasoning:* memungkinkan rich result & dipakai AI untuk memahami entitas. Studi kasus Google Search Central mencatat Rotten Tomatoes menambahkan structured data ke 100.000 halaman dan mengukur CTR 25% lebih tinggi; Nestlé mencatat halaman dengan rich result punya CTR 82% lebih tinggi dibanding halaman tanpa rich result.
  - Untuk UMKM/F&B/hospitality Bali: gunakan subtype paling spesifik — `Restaurant` (servesCuisine, menu, acceptsReservations), `Hotel`/`LodgingBusiness` (numberOfRooms, checkinTime), atau subtype `LocalBusiness` lain. Wajib: `@type`, `name`, `address` (PostalAddress); sangat disarankan: `telephone` format internasional, `geo` (GeoCoordinates), `openingHoursSpecification` (format 24-jam "08:00").
  - Tambahkan `FAQPage`, `BreadcrumbList`, `Product`/`Service` sesuai halaman. Validasi dengan Rich Results Test + Schema Markup Validator.
- [ ] **Heading hierarchy** — satu `<h1>` per halaman, `<h2>`/`<h3>` bertingkat logis. **Tidak boleh loncat level, termasuk di dalam footer.** *Reasoning:* Lighthouse Accessibility menurunkan skor dari 100 kalau ada loncatan level heading di mana pun di halaman — termasuk footer yang sering dianggap "area terpisah" dan luput dari perhatian saat audit. Kasus nyata: section terakhir pakai `<h2>`, footer di bawahnya pakai `<h4>` (melompati `<h3>`) — perbaikannya footer heading harus `<h3>`, mengikuti level section sebelumnya secara berurutan, bukan direset sembarangan karena "cuma footer".
- [ ] **Internal linking** & **URL structure/slug** — slug deskriptif, pendek, lowercase, pakai hyphen.
- [ ] **Statistik/angka penting wajib tertulis final di HTML mentah, bukan hasil akhir dari animasi JavaScript** — *Reasoning:* crawler (Google) dan LLM (ChatGPT/Claude/Perplexity saat browsing) membaca HTML mentah, bukan hasil render setelah JavaScript jalan. Kalau angka statistik ditulis `0` di HTML lalu di-animasikan naik ke angka final lewat JS (count-up effect), yang terbaca crawler/LLM adalah **`0`** — bukan angka sebenarnya. Ini terutama merusak untuk bisnis yang mengandalkan kredibilitas angka ("65+ tahun pengalaman", "130 kamar", dst) di kanal yang justru paling relevan untuk calon klien yang riset lewat AI.
  - **Fix yang benar:** tulis angka final langsung di HTML (`<span data-count="65">65</span>`), lalu JS **reset ke 0 di awal** dan animasikan naik ke angka yang sudah ada di `data-count` — bukan sebaliknya (JS mengisi angka dari 0). Urutannya: HTML benar dulu untuk mesin, animasi untuk manusia adalah lapisan visual di atasnya.
- [ ] **Peta Structured Data (JSON-LD) per tipe halaman** — jangan pasang schema generik yang sama di semua halaman; sesuaikan tipe dengan fungsi halaman:
  | Tipe Halaman | Schema Wajib |
  |---|---|
  | Homepage | `WebSite` + `Organization`/`ProfessionalService`/`LocalBusiness` |
  | About/Profil | `AboutPage` + `Person` (kalau personal brand) |
  | Layanan/Produk | `Service`/`Product` + `ItemList` (kalau daftar) + `Offer` (kalau ada harga) |
  | Kontak | `ContactPage` + `ContactPoint` |
  | Artikel/Blog | `Article`/`BlogPosting` |
  | Semua halaman dengan breadcrumb visual | `BreadcrumbList` — kalau breadcrumb sudah ada di UI tapi schema-nya belum, itu quick win rich result yang sering terlewat |
- [ ] **`@graph` dengan 4 tipe minimal untuk personal brand/portfolio** (beda dari e-commerce/organisasi besar) — sertakan `WebSite`, `Person` (dengan `jobTitle`, `knowsAbout`, `areaServed`, `sameAs` ke profil sosial), `ProfessionalService`/`Organization`, dan `ItemList` untuk produk/portfolio kalau ada. *Reasoning:* `Person` penting khusus untuk GEO — AI search lebih sering mencari entitas `Person` untuk pertanyaan "siapa developer/ahli di [kategori] di [lokasi]" dibanding `Organization`, karena pertanyaan semacam itu secara alami mencari individu, bukan badan usaha.
- [ ] **Canonical URL saat masih staging/testing di path non-root** (misal `domain.com/index-v2` sebelum di-rename jadi `domain.com/index.html`) — canonical yang menunjuk ke root domain (`domain.com/`) akan di-flag Lighthouse SEO sebagai **"no valid canonical"**. **Ini false alarm**, bukan bug — akan otomatis hilang begitu file dipindah ke path yang cocok dengan canonical-nya. *Reasoning:* jangan panik atau coba "fix" hal ini selama masih di staging path; fix yang dipaksakan saat staging justru berpotensi salah setelah file dipindah ke lokasi final.
- [ ] **Meta keywords — JANGAN dipasang.** *Reasoning:* Google sudah lama tidak memakainya sebagai sinyal ranking; hanya membuang waktu development. Bukan checklist "harus ada", tapi catatan eksplisit "tidak perlu dikerjakan".
- [ ] **Favicon sesuai spesifikasi Google** — persegi (1:1), minimal 8×8px, direkomendasikan lebih besar dari 48×48px, URL stabil, dapat di-crawl Googlebot. *Reasoning:* favicon bisa muncul di hasil Google Search kalau memenuhi guideline ini — bukan cuma dekorasi tab browser.
  ```html
  <link rel="icon" href="/favicon.ico">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  ```
- [ ] **`theme-color`** — 🟡 disarankan, bukan wajib. Mempengaruhi warna UI browser mobile (address bar) supaya selaras dengan brand.
  ```html
  <meta name="theme-color" content="#0B1829">
  ```
- [ ] **Web App Manifest** — 🟢 opsional untuk website biasa (company profile/hospitality), 🟡 disarankan kalau website berkarakter aplikasi (dashboard, customer portal, booking app) yang butuh terasa "installable". 🔴 **Kalau project memang dinyatakan PWA, manifest berhenti jadi opsional dan seluruh aturan kategori 18 berlaku penuh** *(v1.8)* — termasuk penamaan `manifest.json` (bukan `.webmanifest`), Content-Type `application/manifest+json`, dan larangan `?v=` pada URL ikon di dalamnya.
- [ ] **Untuk project Anabhi Dev sendiri — patokan resmi meta/favicon/OG lengkap: `AnabhiDev - index.html` (anabhidev.com)** *(v1.4, item baru)* <span class="ci-badge badge-mandatory">MANDATORY</span> — bukan sekadar spesifikasi umum di atas, tapi nilai siap-pakai yang sudah live di situs utama:
  ```html
  <link rel="icon" href="https://anabhidev.com/favicon.ico" sizes="any">
  <link rel="icon" type="image/svg+xml" href="https://anabhidev.com/favicon.svg">
  <link rel="apple-touch-icon" href="https://anabhidev.com/apple-touch-icon.png">
  <meta name="theme-color" content="#08111D">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Anabhi Dev">
  <meta property="og:title" content="[Judul Halaman]">
  <meta property="og:description" content="[Deskripsi halaman]">
  <meta property="og:url" content="[URL halaman]">
  <meta property="og:image" content="https://anabhidev.com/og-image.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="[Alt text gambar]">
  <meta property="og:locale" content="en_ID">
  <meta property="og:locale:alternate" content="id_ID">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Judul Halaman]">
  <meta name="twitter:description" content="[Deskripsi halaman]">
  <meta name="twitter:image" content="https://anabhidev.com/og-image.jpg">
  ```
  *Reasoning:* sebelum v1.4, kategori ini hanya menyebut spesifikasi favicon secara umum tanpa nilai konkret siap-pakai untuk project Anabhi Dev sendiri — akibatnya beberapa file Web Interactive (termasuk `ANABHIDEV-NASATYA_v1_1.html`) dibuat tanpa favicon maupun OG image sama sekali. `og:title`/`og:description`/`og:url`/`og:image:alt` **wajib disesuaikan per halaman**, jangan disalin identik dari homepage — field lain (`favicon`, `theme-color`, `og:site_name`, `og:image`, `twitter:*`) memang seharusnya konstan mengikuti identitas Anabhi Dev di semua halaman miliknya. Aturan "logo mengikuti project" di kategori 15 **tidak otomatis berlaku sama** di sini — favicon/OG image bisa tetap pakai milik Anabhi Dev meski logo di halaman pakai logo klien, tergantung konteks (favicon browser tab biasanya tetap identitas siapa yang meng-host/deploy, bukan selalu klien). Kalau ragu, tanyakan ke user, jangan berasumsi.
  🔴 **Blok siap-pakai di atas HANYA untuk project Anabhi Dev sendiri (anabhidev.com), bukan template yang disalin ke semua project** *(v1.8, klarifikasi)* — untuk **project Miss Fish**, favicon/OG/`og:site_name` memakai identitas **Miss Fish Bali**, bukan Anabhi Dev, karena sistem internal kantor tidak di-host maupun diidentifikasi sebagai produk Anabhi Dev. Untuk **project klien**, tanyakan dulu: favicon biasanya mengikuti siapa yang meng-host/mengoperasikan, dan itu belum tentu Anabhi Dev.
- [ ] **`@graph` JSON-LD wajib ada, bukan opsional, untuk semua halaman Anabhi Dev yang di-index** *(v1.4, penegasan)* — lihat pola lengkap 4-tipe di item `@graph` (di bawah) dan Blueprint A. File Web Interactive yang **tidak** di-index (`noindex`, seperti brief/knowledge base internal) boleh melewati item ini karena JSON-LD tidak berguna untuk halaman yang sengaja disembunyikan dari crawler — tapi tetap pasang favicon meski `noindex` (favicon soal identitas visual tab browser, bukan soal SEO indexing).
- [ ] **`hreflang` — implementasi teknis** (untuk website benar-benar multilingual, bukan toggle bahasa satu file seperti `data-en`/`data-id`):
  ```html
  <link rel="alternate" hreflang="en" href="https://example.com/en/">
  <link rel="alternate" hreflang="id" href="https://example.com/id/">
  <link rel="alternate" hreflang="x-default" href="https://example.com/en/">
  ```
  - [ ] Setiap versi bahasa saling merujuk balik (reciprocal) — halaman EN merujuk ke ID dan sebaliknya, bukan cuma satu arah.
  - [ ] Kode bahasa benar (ISO 639-1: `en`, `id`, bukan `eng`/`ind`).
  - [ ] `x-default` diarahkan ke versi bahasa fallback (biasanya English) untuk visitor yang bahasanya tidak match versi manapun.
  - [ ] Konsisten dengan canonical — jangan sampai `hreflang` menunjuk ke URL yang beda dengan canonical halaman tersebut.
  - Untuk hotel/hospitality Bali dengan target market internasional, `hreflang` **worth diimplementasi** kalau memang ada versi bahasa terpisah per URL — beda dari toggle satu-file yang cukup pakai `data-en`/`data-id` (lihat kategori 9 & 11).
- [ ] **NAP Consistency untuk local SEO** (Name, Address, Phone) — nama bisnis, alamat, dan nomor telepon harus **identik persis** di semua tempat: website, Google Business Profile, structured data, social media, direktori lain. *Reasoning:* Google memakai konsistensi NAP sebagai sinyal kepercayaan untuk local search; alamat yang beda format ("Jl. Sunset Road No. 88" vs "Jalan Sunset Road 88") di tempat berbeda melemahkan sinyal ini meski secara makna sama.

### 3. GEO (Generative Engine Optimization) — baru di 2026
- [ ] **Publikasikan `llms.txt` di root** — file Markdown standar yang diusulkan Jeremy Howard (Answer.AI) pada September 2024, spec di llmstxt.org. Struktur: H1 nama situs (satu-satunya bagian wajib), blockquote ringkasan, section markdown opsional, lalu section H2 berisi daftar link `[nama](url): catatan`. Opsional: sediakan `llms-full.txt` berisi konten lengkap. *Reasoning:* memberi LLM peta konten ringkas & "LLM-friendly" karena context window terbatas. Catatan: ini proposal komunitas, bukan RFC resmi dan belum dikonfirmasi sebagai sinyal sitasi oleh vendor LLM mana pun — biaya rendah, jadi tetap layak dibuat.
- [ ] **Pastikan AI crawler TIDAK terblokir** di robots.txt. User-agent retrieval/search yang ingin diizinkan agar dapat sitasi:
  - **OpenAI:** `OAI-SearchBot` (sitasi di ChatGPT search) & `ChatGPT-User` (fetch saat user bertanya); `GPTBot` = training (boleh diblok bila tak mau dipakai training, tanpa kehilangan sitasi).
  - **Anthropic:** `Claude-SearchBot` (indexing search) & `Claude-User` (fetch live); `ClaudeBot` = training.
  - **Perplexity:** `PerplexityBot` (search/sitasi, mengikuti robots.txt) & `Perplexity-User` (fetch live).
  - **Google:** `Google-Extended` = product token untuk kontrol training Gemini/grounding (memblokirnya TIDAK memengaruhi ranking Google Search).
  - **Bing/Microsoft:** `bingbot` melayani search klasik sekaligus grounding Copilot — Microsoft belum punya token opt-out training terpisah seperti Google-Extended.
  - *Reasoning:* blokir bot yang salah = hilang dari AI search. Pola kanonik: izinkan bot retrieval, boleh blok bot training.
- [ ] **Cek default Cloudflare** — Cloudflare sejak 1 Juli 2025 memblokir AI crawler secara default untuk domain baru (sebagai penyedia infrastruktur internet pertama yang melakukan ini). Buka dashboard → AI Crawl Control / setting bot dan pastikan bot retrieval yang diinginkan di-allow; pastikan WAF/rate-limit tidak mengembalikan 402/403/429 ke bot yang sudah diizinkan. *Reasoning:* situs bisa ranking #1 di Google tapi invisible di ChatGPT/Perplexity bila bot diblok. (Catatan: default block ini hanya menyasar AI crawler — tidak memblokir Googlebot/Bingbot, jadi ranking search klasik tak terpengaruh.)
- [ ] **Server-side rendering / HTML statis** untuk konten penting — AI crawler hanya membaca HTML yang dikembalikan server, bukan konten yang dirender JS sisi klien. (Keuntungan stack vanilla/static.)
- [ ] **Konten citation-friendly** — jawaban langsung di awal paragraf, heading jelas (satu topik per section), bullet/numbered list, sertakan data/statistik & kutipan. *Reasoning:* studi GEO (Aggarwal et al., presentasi KDD 2024, diuji pada 10.000 query) menemukan lima teknik teratas (Cite Sources, Quotation Addition, Statistics Addition, Fluency Optimization, Authoritative Voice) menaikkan visibilitas di jawaban AI 30–40%, dengan lift relatif hingga +115,1% untuk situs peringkat ke-5 yang menambah sitasi sumber.
- [ ] **Content freshness** — beri timestamp "Last updated"; AI memberi bobot pada konten terbaru.

### 4. Security (Back-end & Infrastruktur)
- [ ] **HTTPS/TLS** — paksa HTTPS; SSL certificate valid (otomatis di Cloudflare/Netlify).
- [ ] **HTTP Security Headers** (set di level server/platform — `_headers` Cloudflare/Netlify, selalu pada semua response termasuk error page):
  - [ ] `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload` — paksa HTTPS. (Gunakan max-age pendek di dev agar localhost tak terkunci.)
  - [ ] `Content-Security-Policy` — mulai mode `Content-Security-Policy-Report-Only` lalu enforce; hindari `unsafe-inline`/`unsafe-eval`, pakai nonce/hash. *Reasoning:* pertahanan utama vs XSS (OWASP merekomendasikan strict CSP).
  - [ ] `X-Content-Type-Options: nosniff` — set global termasuk respons API/aset.
  - [ ] `X-Frame-Options: DENY` atau lebih baik CSP `frame-ancestors 'none'` — anti clickjacking.
  - [ ] `Referrer-Policy: strict-origin-when-cross-origin`.
  - [ ] `Permissions-Policy` — matikan fitur browser yang tak dipakai (camera, mic, geolocation).
- [ ] **CORS** — konfigurasi origin yang diizinkan secara eksplisit; jangan pakai wildcard `*` untuk endpoint terautentikasi.
- [ ] **Secrets management** — JANGAN hardcode API key; pakai environment variables; jangan commit `.env`; gunakan service key Supabase hanya di server.
- [ ] **Input validation & sanitization** — validasi di sisi server (client-side hanya untuk UX, bisa di-bypass); pakai allowlist; parameterized queries untuk cegah SQL injection; output encoding context-aware untuk cegah XSS. Validasi file upload by header bukan ekstensi; rename file dengan nama acak.
- [ ] **Rate limiting** — pada endpoint API & form untuk cegah abuse/DoS.
- [ ] **Dependency scanning** — `npm audit` rutin; aktifkan Dependabot di GitHub.
- [ ] **Supply-chain security untuk script/CSS pihak ketiga** — *Reasoning:* website bisa punya security header, RLS, dan validasi input sempurna, tapi tetap rentan kalau satu script CDN pihak ketiga (font, library, widget chat) disusupi/dimodifikasi tanpa sepengetahuan kita — CDN yang di-compromise bisa menyuntikkan kode jahat ke semua website yang memuatnya.
  - [ ] Buat inventaris semua script/CSS eksternal yang dimuat (nama, sumber, versi, fungsi).
  - [ ] Pakai **Subresource Integrity (SRI)** untuk aset statis dari CDN pihak ketiga yang jarang berubah versi:
    ```html
    <script src="https://cdn.example.com/library.js"
            integrity="sha384-..."
            crossorigin="anonymous"></script>
    ```
    Browser akan menolak memuat file kalau hash-nya tidak cocok dengan yang didaftarkan — mencegah CDN yang disusupi mengeksekusi kode berbeda dari yang dimaksud.
  - [ ] Hapus library yang tidak lagi dipakai — setiap dependency aktif menambah permukaan risiko.
- [ ] **Auth & authorization** — pakai Supabase Auth; JANGAN pakai `user_metadata` di RLS (bisa dimodifikasi user); session timeout wajar.
- [ ] **Backup database** — terjadwal & teruji restore (lihat kategori 5).
- [ ] **Prasyarat CSP tanpa `unsafe-inline`: nol inline script dan nol inline style di seluruh halaman.** *Reasoning:* CSP ketat akan mematikan semua `<script>...</script>` inline dan `style="..."` inline — kalau masih ada, fungsionalitas halaman (tabs, toggle, animasi) akan diam-diam berhenti bekerja setelah CSP diaktifkan, bukan error yang jelas terlihat.
  - [ ] Pindahkan semua `<script>` inline ke file `.js` eksternal dengan `<script src="..." defer>`.
  - [ ] Pindahkan semua `style="..."` inline ke `class` CSS. Verifikasi sebelum deploy: `grep -c 'style="' *.html` harus 0.
- [ ] **Form statis (tanpa backend sendiri, pakai Formspree/Web3Forms dkk) — honeypot + rate limit wajib**, bukan opsional. *Reasoning:* form publik tanpa proteksi adalah target spam bot otomatis dalam hitungan hari setelah live, bukan kalau-kalau.
  - [ ] Tambahkan **honeypot field** — input tersembunyi (bukan `type="hidden"`, pakai CSS `position:absolute;opacity:0` supaya bot form-filler tetap mengisinya) yang manusia tidak akan lihat/isi; kalau field itu terisi saat submit, tolak submission secara diam-diam.
  - [ ] Aktifkan **rate limiting** di sisi provider form (biasanya sudah ada opsi ini) untuk mencegah submit berulang otomatis.
  - [ ] Untuk proteksi lebih kuat, tambahkan reCAPTCHA/hCaptcha — tapi pertimbangkan trade-off UX (friction tambahan untuk pengguna asli).

### 5. Backend/Database/API (Supabase/serverless/BaaS)
- [ ] **Enable RLS di SETIAP tabel** pada schema publik. *Reasoning:* tanpa RLS, siapa pun dengan anon key bisa baca/ubah seluruh data. Tabel dibuat lewat SQL editor TIDAK otomatis enable RLS — tambahkan `ALTER TABLE ... ENABLE ROW LEVEL SECURITY` di setiap migration.
- [ ] **Tulis RLS policy yang benar** — `USING` untuk read/delete, `WITH CHECK` untuk write; UPDATE perlu keduanya (+ SELECT policy). Selalu tambahkan role `authenticated` (jangan andalkan hanya `auth.uid()` untuk menyaring anon).
- [ ] **Optimasi performa RLS** — bungkus fungsi auth: pakai `(select auth.uid())` bukan `auth.uid()` (peningkatan >100x di tabel besar); tambahkan index pada kolom yang dipakai di policy (mis. `user_id`). *Reasoning:* missing index = pembunuh performa nomor satu.
- [ ] **Uji policy dari client SDK / fitur impersonation Supabase**, bukan dari SQL Editor (SQL Editor bypass RLS).
- [ ] **Schema design & indexing** — normalisasi wajar; index pada foreign key & kolom filter.
- [ ] **Storage RLS** — bucket Supabase Storage perlu policy pada `storage.objects`; default menolak upload tanpa policy.
- [ ] **Error handling & logging** — log security event (login, kegagalan, validasi); jangan bocorkan info sensitif di pesan error.
- [ ] **Staging vs production** — environment terpisah; jangan tes di DB produksi.
- [ ] **API key rotation** — rotasi berkala; manfaatkan model API key baru Supabase (publishable/secret keys menggantikan anon/service_role JWT lama).
- [ ] **Manfaatkan Security Advisor Supabase** (Splinter linter) untuk deteksi tabel tanpa RLS & kolom sensitif terekspos; Supabase juga kirim email alert bila ada tabel RLS-disabled.

### 6. Hosting & Deployment / DevOps
- [ ] **CI/CD otomatis** — hubungkan repo GitHub ke Cloudflare Pages/Netlify; setiap commit/PR memicu build & deploy preview.
- [ ] **Staging vs production** — Cloudflare Pages & Netlify membuat deploy preview per branch/PR; preview Cloudflare otomatis ber-header `X-Robots-Tag: noindex` (aman dari indexing). *Reasoning:* uji di environment production-identik sebelum merge.
- [ ] **Branching sederhana untuk solo dev** — `main` = production, branch fitur → PR → preview → merge. Hindari commit langsung ke main.
- [ ] **Domain & DNS** — set A/CNAME benar; aktifkan DNSSEC untuk cegah DNS cache poisoning/spoofing.
- [ ] **Email DNS (jika ada custom email)** — SPF, DKIM, DMARC wajib di 2026. Gmail (Nov 2025) menolak permanen email non-compliant; Microsoft menyusul. Setup urutan: DKIM & SPF dulu (biarkan autentikasi ≥48 jam), lalu DMARC mulai `p=none` → naikkan ke `quarantine`/`reject`. *Reasoning:* tanpa ini email masuk spam / domain mudah di-spoof.
- [ ] **CDN configuration** — cache aset, aktifkan HTTP/2 & HTTP/3.
- [ ] **Custom error pages** — 404 & 500 yang ramah pengguna, dengan navigasi/CTA untuk membantu user kembali ke konten yang berguna. *Reasoning:* jangan redirect semua 404 ke homepage begitu saja — itu membingungkan user yang mengharapkan konten spesifik dan menghilangkan sinyal ke Google soal halaman mana yang benar-benar hilang.
- [ ] **Redirect rules** — pilih www vs non-www (redirect 301 satu ke lainnya); paksa http→https.
  - [ ] **Hindari redirect chain** (URL A → B → C → tujuan akhir) — setiap hop tambahan menambah latency dan berisiko salah satu link di tengah rantai putus. Redirect harus langsung dari URL lama ke tujuan akhir, satu langkah.
  - [ ] Cek tidak ada redirect loop (A → B → A).
- [ ] **DNS cleanup rutin — DNS record lama adalah permukaan serangan yang sering diabaikan.** *Reasoning:* subdomain/DNS record yang menunjuk ke layanan yang sudah tidak dipakai (misal `old.domain.com` masih di-`CNAME`-kan ke hosting yang sudah berhenti dipakai) bisa jadi celah **subdomain takeover** — pihak lain mendaftarkan layanan di alamat yang sama dan mengambil alih subdomain tersebut, karena DNS masih menunjuk ke sana meski layanan aslinya sudah mati.
  - [ ] Audit berkala: DNS record apa saja yang masih ada, cocokkan dengan layanan yang benar-benar masih aktif.
  - [ ] Hapus subdomain lama, verification record TXT lama, dan CNAME yang tidak lagi dipakai.
- [ ] **Monitoring & uptime** — alat gratis (UptimeRobot: 50 monitor, interval 5 menit di free tier) atau Better Stack (10 monitor, interval 3 menit gratis, plus log & status page).
- [ ] **Version control** — commit message bermakna; jangan commit secrets; `.gitignore` rapi.
- [ ] **`.assetsignore` untuk Cloudflare Workers + Static Assets** — buat file ini di root project, exclude `.git`, `node_modules`, `.env`, `.DS_Store`, dll (format sama seperti `.gitignore`). *Reasoning:* Cloudflare **Pages** otomatis exclude file-file ini, tapi Cloudflare **Workers + Static Assets TIDAK** — harus manual, atau file sensitif bisa ikut ter-deploy.
- [ ] **Test akses `yourdomain.com/.git/HEAD` setelah deploy** — harus return 404, bukan isi file. *Reasoning:* kebocoran folder `.git` ke publik bisa mengekspos seluruh riwayat source code.
- [ ] **Cloudflare Cache-Busting & Purge Strategy** *(v1.7 — dilebur dari Addendum Cache-Busting)*:
  - Version query (`?v=`) menyelesaikan 95% masalah update tanpa perlu purge manual.
  - **Purge manual Cloudflare (`Caching → Configuration → Purge Everything`) TETAP WAJIB dilakukan saat:**
    - Mengganti isi file TANPA sempat menaikkan versi query (human error).
    - Perubahan pada redirect rules, file `_headers`, atau konfigurasi DNS.
    - Setelah deploy besar / go-live pertama untuk memastikan edge cache bersih sempurna.
- [ ] **Purge cache Cloudflare setelah deploy** (`Caching → Configuration → Purge Everything`) — supaya hasil test/perubahan tidak kena cache lama saat verifikasi.

### 7. Analytics, Marketing & Ekosistem Pihak Ketiga
> *Reasoning restrukturisasi:* kategori ini diperluas dari sekadar "Analytics & Monitoring" karena ekosistem tracking/marketing modern (Google, Meta) punya banyak layanan dengan fungsi berbeda — memasukkan semuanya sebagai "pasang Google Analytics" saja terlalu menyederhanakan dan berisiko developer memasang layanan yang tidak relevan (misal AdSense di website corporate).

**Analytics — pilih berdasarkan kebutuhan project, bukan default tunggal:**
- [ ] **Opsi A — Privacy-first (Plausible/Fathom)**: cookieless, tanpa cookie banner untuk analytics, hosting EU. *Cocok untuk:* project personal/portfolio, klien dengan target market Eropa yang ketat GDPR, atau saat kesederhanaan compliance jadi prioritas. *Reasoning:* GA4 berbasis cookie butuh consent banner di bawah ePrivacy/GDPR; banner menurunkan akurasi data (studi independen Orbit Media: GA4 hanya menangkap ~55,6% trafik aktual karena penolakan consent). Script ringan, tak memperlambat halaman.
- [ ] **Opsi B — GA4 + Google Tag Manager**: *Cocok untuk:* project yang butuh integrasi penuh ekosistem Google (Google Ads conversion tracking, remarketing, e-commerce tracking mendalam, Looker Studio dashboard). Trade-off: butuh cookie consent banner sesuai GDPR/ePrivacy kalau target market Eropa.
  - [ ] GTM dipakai sebagai pengelola tag (GA4, Ads, Meta Pixel, conversion tag) — bukan pasang script manual satu-satu di HTML.
  - [ ] **Google Consent Mode** dikonfigurasi kalau ada cookie banner — supaya tracking tetap dapat data teragregasi (dengan estimasi) meski user menolak consent, bukan kehilangan data sepenuhnya.
- [ ] Kedua opsi **tidak saling eksklusif** untuk project besar — beberapa tim pakai Plausible untuk dashboard internal cepat + GA4 untuk kebutuhan Ads/marketing. Putuskan sesuai kompleksitas, jangan pasang keduanya tanpa alasan (duplikasi tracking membingungkan data).
- [ ] **Google Search Console** — verifikasi domain, submit sitemap (salah satu langkah setup paling berleverage untuk indexing & alert error). *Beda dari GA4:* tidak perlu tracking script, cukup verifikasi kepemilikan domain.
  - [ ] **Search Generative AI performance report** (fitur baru — resmi rilis 3 Juni 2026, diperluas 23 Juni 2026) — laporan terpisah di Search Console yang menunjukkan impression halaman di dalam AI Overviews, AI Mode, dan fitur AI di Discover. Belum termasuk data klik. Rollout bertahap per wilayah — cek ketersediaan di properti masing-masing.

**Ekosistem Google lainnya — pasang sesuai kebutuhan, bukan semua sekaligus:**
- [ ] **Google Ads** (beriklan, keluar biaya) — beda dari **Google AdSense** (menampilkan iklan orang lain, dapat bayaran). *Untuk website corporate/hospitality: Google Ads relevan kalau marketing aktif; AdSense umumnya TIDAK relevan* karena mengganggu branding profesional.
  - [ ] Kalau pakai Google Ads: conversion tracking terpasang, remarketing dikonfigurasi sesuai kebutuhan.
- [ ] **Google AdSense** — 🟡 kategori khusus, bukan standar wajib untuk website corporate/hospitality — tapi tersedia sebagai opsi kalau ada project dengan model monetisasi dari iklan (blog, media, content-heavy website). Kalau dipakai:
  - [ ] Situs harus melalui proses review Google sebelum iklan bisa tampil — ajukan lewat AdSense dashboard, siapkan konten yang cukup (bukan halaman kosong/under construction).
  - [ ] Script AdSense dipasang lewat GTM (konsisten dengan pola tag management lain), bukan hardcode terpisah.
  - [ ] Penempatan iklan tidak boleh mengganggu Core Web Vitals (hindari iklan yang menyebabkan CLS — pastikan ruang iklan sudah dialokasikan sebelum iklan dimuat) maupun UX inti (jangan menutupi CTA utama atau konten yang dicari user).
  - [ ] Kalau website yang sama juga punya tujuan lain (misal company profile dengan blog), pertimbangkan AdSense hanya di section blog — bukan di halaman utama/profil perusahaan, supaya branding profesional tidak terganggu iklan pihak ketiga.
- [ ] **Google Maps** — embed sederhana lewat iframe untuk kebutuhan dasar (tampilkan lokasi); Google Maps Platform API untuk fitur lanjutan (directions, places autocomplete, distance calculation). *Untuk hospitality sangat penting* — lokasi jadi salah satu keputusan utama tamu. Kalau pakai API: API key dibatasi (restricted) ke domain tertentu, billing dimonitor.
- [ ] **YouTube embed** — kalau website punya video (company profile, tur properti, tutorial). *Reasoning:* jangan asal embed banyak video di satu halaman — resource YouTube cukup berat dan bisa memperlambat performance; pertimbangkan lazy-load embed (thumbnail dulu, iframe dimuat saat diklik).
- [ ] **Google reCAPTCHA / anti-bot protection** — wajib di setiap form (contact, booking, login, newsletter). Lihat juga kategori 4 (honeypot + rate limit sebagai lapisan tambahan, bukan pengganti).
- [ ] **Sign in with Google** — 🟢 opsional, hanya kalau website punya member area/customer portal/dashboard yang butuh otentikasi user.
- [ ] **Google Site Kit** — 🟡 khusus WordPress. Plugin resmi Google yang menghubungkan Search Console, Analytics, AdSense, PageSpeed Insights, Ads, Tag Manager dalam satu dashboard — lebih rapi daripada pasang banyak plugin Google terpisah. Tidak relevan untuk stack static HTML/vanilla JS.

**Meta (Facebook/Instagram) Ads:**
- [ ] **Meta Pixel** — dipasang lewat GTM (bukan hardcode manual) kalau ada campaign Facebook/Instagram Ads. Sama seperti Google Ads, hanya relevan kalau marketing aktif di platform tersebut.
- [ ] Consent untuk Meta Pixel mengikuti aturan cookie consent yang sama dengan GA4 (lihat kategori 8).

**Event taxonomy — analytics yang berguna, bukan cuma angka pengunjung:**
- [ ] **Definisikan event conversion sebelum implementasi tracking**, bukan pasang GA4 lalu bingung mau lihat apa. *Reasoning:* "10.000 visitor" tidak actionable; "1.200 orang lihat kamar → 430 klik booking → 82 booking selesai" baru bisa dipakai untuk keputusan bisnis.
  - Contoh event untuk website hospitality: `page_view`, `view_room`, `view_restaurant`, `click_call`, `click_whatsapp`, `click_email`, `click_map`, `click_booking`, `booking_started`, `booking_completed`.
  - Sesuaikan taxonomy dengan funnel bisnis masing-masing (consulting: `view_service` → `click_contact` → `form_submitted`; online shop: `view_product` → `add_to_cart` → `checkout_started` → `purchase_completed`).
- [ ] **Verifikasi tidak ada duplikasi tracking** setelah live — cek DevTools Network tab, pastikan tidak ada 2× GA4 property atau 2× GTM container ter-fire bersamaan (ini sering terjadi tanpa disadari, misal dari sisa kode lama yang belum dihapus).

**Monitoring & Error Tracking:**
- [ ] **Error tracking** — Sentry (free tier) atau alternatif (GlitchTip self-host/free, Better Stack). *Reasoning:* deteksi error produksi (JavaScript error, API error, form submission error) sebelum dilaporkan user.
- [ ] **Performance monitoring** — Lighthouse CI di pipeline, PageSpeed Insights, GTmetrix; pantau CrUX field data, bukan hanya lab.
- [ ] **Reporting berkala** — Looker Studio untuk gabungkan GA4 + Search Console + Ads dalam satu dashboard, kalau kompleksitas project butuh (🟢 opsional untuk project kecil).

### 8. Legal & Compliance dasar
- [ ] **Privacy Policy** — jelaskan data apa dikumpulkan, cookie, layanan pihak ketiga, hak user. *Reasoning:* wajib meski pakai analytics cookieless, terutama untuk klien Eropa via Upwork.
- [ ] **Terms of Service** — terutama untuk web app/transaksi.
- [ ] **Cookie consent** — bila pakai cookie non-esensial (GA4, pixel iklan), wajib banner GDPR/ePrivacy dengan opsi "Reject" semudah "Accept"; bila pakai Plausible/Fathom tanpa cookie, banner tidak diperlukan untuk analytics.
- [ ] **Accessibility compliance** — WCAG 2.2 AA jadi standar de facto (European Accessibility Act berlaku sejak 28 Juni 2025; ADA di AS). Item dasar:
  - [ ] Alt text pada setiap gambar informatif; `alt=""` untuk dekoratif.
  - [ ] Kontras teks ≥ 4,5:1 (≥ 3:1 untuk teks besar/komponen UI). Cek dengan WebAIM Contrast Checker.
    - [ ] **Hitung tabel kontras di AWAL project, bukan di akhir.** *Reasoning:* warna brand yang cantik secara visual sering gagal 4,5:1 saat dipakai untuk teks kecil — kalau baru ketahuan di akhir, solusinya sering "ganti warna brand" yang mengorbankan identitas. Solusi yang lebih baik: siapkan **varian gelap khusus teks kecil** dari warna brand sejak awal (contoh: brand cyan terang untuk background/ikon/border, varian cyan lebih gelap khusus untuk teks kecil di atas background terang).
  - [ ] Navigasi keyboard penuh; focus indicator terlihat (kontras ≥ 3:1, outline ≥ 2px); tanpa keyboard trap.
    - [ ] **`:focus-visible` custom wajib di-set**, jangan andalkan default browser — default sering kontrasnya < 3:1 terutama di atas background berwarna gelap/terang non-putih.
  - [ ] **Skip link wajib di setiap halaman** — link tersembunyi di awal `<body>` (`<a class="skip-link" href="#main-content">Skip to main content</a>`) yang baru terlihat saat mendapat fokus keyboard (Tab pertama). *Reasoning:* item dasar WCAG yang sering terlewat karena tidak terlihat kalau tidak sengaja dites dengan keyboard.
  - [ ] Semantic HTML & ARIA bila perlu; satu H1; label pada form input.
    - [ ] **`aria-expanded` (dan atribut ARIA state lain seperti `aria-selected`, `aria-checked`) wajib benar-benar di-toggle lewat JavaScript, bukan cuma ditulis statis di HTML.** *Reasoning:* ini bug senyap yang **tidak terdeteksi Lighthouse** — atribut `aria-expanded="false"` yang ditulis di HTML tapi tidak pernah diubah JS saat elemen dibuka/ditutup (misal accordion FAQ, hamburger menu) membuat screen reader selamanya membaca "collapsed" meski secara visual elemen itu sedang terbuka. Verifikasi manual: buka elemen interaktif, cek di DevTools apakah atribut `aria-*` di HTML benar-benar berubah nilainya.
  - [ ] Jangan andalkan warna saja untuk menyampaikan makna.
  - [ ] Uji dengan axe DevTools/WAVE/Lighthouse (otomatis hanya menangkap ~30–40% isu; sisanya manual + screen reader NVDA/VoiceOver).

### 9. Pre-launch & Post-launch
**Pre-launch (mulai 2–4 minggu sebelum go-live):**
- [ ] Hapus `noindex` dari staging — *Reasoning:* tag noindex yang ikut ke produksi bisa men-deindex seluruh situs dalam hitungan hari (kesalahan paling katastrofik & paling bisa dicegah).
- [ ] Cek broken link (internal & eksternal).
- [ ] Uji semua form end-to-end — submit, terima email konfirmasi, cek tidak masuk spam; test tap-to-call & WhatsApp click-to-chat di mobile.
- [ ] Mobile test pada device nyata; cek layout jump.
- [ ] Page speed test (Lighthouse/PageSpeed).
- [ ] Cross-browser test.
- [ ] Set 301 redirect dari URL lama (bila migrasi) — *Reasoning:* lupa redirect bisa menghapus ranking yang terkumpul bertahun-tahun.
- [ ] HTTPS aktif; redirect www/non-www & http→https.
- [ ] Validasi structured data (Rich Results Test).
- [ ] Cek konten: typo, placeholder/lorem ipsum, ejaan nama brand.

**Validasi otomatis wajib sebelum present file ke user/klien (tiap kali generate/edit file HTML besar):**
> *Reasoning:* untuk file besar hasil banyak edit berurutan, kesalahan struktural (kurung liar sisa edit, atribut yang lupa disinkronkan) mudah lolos kalau hanya dicek visual. Checklist ini jalankan otomatis lewat script/perintah terminal, bukan baca manual — lihat kategori 11 untuk perintah siap pakai.
- [ ] CSS brace balance = 0 (jumlah `{` sama dengan jumlah `}` — tidak ada `}` liar sisa dari edit sebelumnya).
- [ ] JSON-LD valid parse (`json.loads()`/validator sungguhan, bukan asumsi "kelihatannya benar").
- [ ] 0 inline event handler (`on*=`) kecuali yang sengaja dan terdokumentasi (misal `onload` untuk pola font-loading di kategori 1).
- [ ] 0 link `href="#"` yang mati/menggantung tanpa fungsi.
- [ ] Semua `target="_blank"` punya `rel="noopener noreferrer"` — *Reasoning:* tanpa ini, halaman tujuan bisa mengakses `window.opener` (celah keamanan reverse tabnabbing).
- [ ] Semua `<img>` punya `width` + `height` + `alt`.
- [ ] Heading sequence tidak loncat level (lihat kategori 2).
- [ ] **Default bahasa = bilingual satu-teks, BUKAN toggle** *(v1.2)* — istilah teknis ditulis dalam Bahasa Inggris (`max-width`, `localStorage`, `debounce`, `adapter`, `token`, dll — apa adanya, tanpa terjemahan paksa), penjelasan/narasi dalam Bahasa Indonesia, dalam satu alur teks yang sama. **Tanpa** tombol toggle EN/ID. *Reasoning:* ini pola komunikasi asli yang sudah dipakai sehari-hari (campur istilah teknis Inggris + penjelasan Indonesia) — menambah toggle penuh EN/ID sebagai default menambah beban development (perlu isi dua versi teks penuh) untuk kebutuhan yang jarang benar-benar diminta.
  - Toggle EN/ID (`data-en`/`data-id`) **hanya** dibuat kalau diminta eksplisit oleh yang memesan (misal: *"buatkan 2 bahasa"*). Kalau tidak disebutkan sama sekali dalam permintaan → default bilingual satu-teks seperti di atas.
- [ ] **Untuk file bilingual dengan pola `data-en`/`data-id` (toggle bahasa satu file, bukan halaman terpisah per bahasa) — HANYA berlaku kalau toggle memang diminta:** jumlah atribut `data-en` harus **sama persis** dengan jumlah `data-id`. *Reasoning:* mismatch berarti ada teks yang tidak akan ter-translate saat tombol toggle dipencet — bug yang hanya ketahuan kalau secara manual mencoba toggle ke tiap bahasa dan membandingkan, bukan dari tampilan default. Verifikasi: `grep -c 'data-en=' file.html` harus sama dengan `grep -c 'data-id=' file.html`.

**Post-launch (2 minggu pertama paling kritis):**
- [ ] Submit sitemap ke GSC dalam 1 jam pertama; pakai URL Inspection untuk request indexing homepage & 5 halaman utama.
- [ ] Setup monitoring uptime & error tracking.
- [ ] Backup pertama & uji restore.
- [ ] Pantau 404 log & perbaiki.
- [ ] Live-site speed test dengan trafik nyata.
- [ ] Verifikasi analytics & form benar-benar merekam data.

### 10. Maintenance rutin
- [ ] **Update dependency** rutin (`npm audit`, Dependabot) — cara nomor satu cegah peretasan.
- [ ] **Cek broken link** berkala.
- [ ] **Cek SSL & domain expiry** — set reminder; SSL otomatis tapi domain perlu perpanjang manual.
- [ ] **Review analytics** bulanan; identifikasi halaman berperforma & masalah.
- [ ] **Content freshness untuk GEO** — perbarui cornerstone content, tambah data baru & timestamp "Last updated".
- [ ] **Backup terjadwal** — verifikasi backup berjalan; uji restore periodik. *Reasoning:* backup yang belum pernah dites restore-nya belum bisa dianggap backup yang reliable — banyak kegagalan backup baru ketahuan justru saat benar-benar dibutuhkan.
  - [ ] **Tentukan RTO (Recovery Time Objective)** — berapa lama maksimal website boleh down sebelum harus kembali online. Contoh untuk website corporate sederhana: RTO 4 jam.
  - [ ] **Tentukan RPO (Recovery Point Objective)** — berapa banyak perubahan/data maksimal yang boleh hilang kalau terjadi insiden. Contoh: RPO 24 jam (artinya backup harian sudah cukup, kehilangan maksimal 1 hari kerja perubahan).
  - [ ] Untuk website static (GitHub + Cloudflare Pages), recovery jauh lebih sederhana dibanding server dengan database — tapi tetap jangan jadikan GitHub sebagai satu-satunya salinan; source control ≠ backup penuh (pertimbangkan mirror repository atau export berkala).
- [ ] **Rotasi API key** & review RLS policy saat menambah tabel/fitur.
- [ ] **Re-audit security headers** & cek CrUX/Core Web Vitals setiap deploy besar.

### 11. Verifikasi Otomatis Sebelum Deploy (kategori baru)
> *Reasoning:* checklist yang hanya dibaca sering terlewat di tengah kerja cepat. Kategori ini kumpulan perintah `grep`/Python siap tempel di terminal — hasilnya angka pasti, bukan kesan visual "kayaknya sudah benar".

- [ ] **Verifikasi Cache-Busting sebelum deploy (v1.7, dilebur dari Addendum):**
```bash
# 1. Cek link CSS/JS/gambar lokal yang MASIH TANPA version query (hasil harus KOSONG untuk file yang diedit):
grep -ohE '(href|src)="[^"]*\.(css|js)"' *.html | grep -v '?v='

# 2. Cek konsistensi versi query di seluruh halaman HTML:
grep -ohE '\?v=[0-9a-z]+' *.html | sort | uniq -c
```
- [ ] **Overflow lock terpasang di html DAN body:**
```bash
grep -A2 "^html, body\|^html,body" style.css
# Harus muncul overflow-x: hidden pada selektor gabungan html,body — bukan body saja.
```
- [ ] **Kurung CSS seimbang per file:**
```bash
for f in css/*.css; do
  o=$(grep -o '{' "$f" | wc -l); c=$(grep -o '}' "$f" | wc -l)
  echo "$f: buka=$o tutup=$c $([ "$o" = "$c" ] && echo OK || echo MISMATCH)"
done
```
- [ ] **JSON-LD valid (parse sungguhan, bukan asumsi):**
```python
import json, re, glob
for f in glob.glob('*.html'):
    scripts = re.findall(r'<script type="application/ld\\+json">(.*?)</script>', open(f).read(), re.S)
    for i, s in enumerate(scripts):
        try: json.loads(s)
        except Exception as e: print(f'{f} schema {i+1}: ERROR — {e}')
```
- [ ] **Nol inline style (prasyarat CSP ketat):**
```bash
for f in *.html; do echo "$f: $(grep -o 'style="' "$f" | wc -l)"; done
```
- [ ] **Class CSS cocok dengan HTML (tidak ada class yang didefinisikan tapi tidak dipakai, atau dipakai tapi tidak didefinisikan):**
```bash
# Ganti NAMA-CLASS dengan class yang mau dicek
echo "CSS: $(grep -c '\\.NAMA-CLASS' style.css)  HTML: $(grep -c 'NAMA-CLASS' index.html)"
```
- [ ] **Link internal tidak 404** — verifikasi setiap `href="....html"` yang disebut di navigasi/footer benar-benar ada sebagai file:
```bash
for f in $(grep -ohE 'href="[a-z-]+\\.html' *.html | sed 's/href="//' | sort -u); do
  [ -f "$f" ] || echo "404: $f"
done
```
- [ ] **Kontras warna dihitung dengan formula WCAG (bukan kira-kira):**
```python
def lum(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16)/255 for i in (0,2,4)]
    f=lambda c: c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)
def contrast(a,b):
    l1,l2=sorted([lum(a),lum(b)],reverse=True); return (l1+0.05)/(l2+0.05)
# contrast('#5A6878','#FFFFFF') -> harus >= 4.5 untuk teks normal, >= 3.0 untuk teks besar/UI
```
- [ ] **Data-en / data-id seimbang (untuk file bilingual):**
```bash
echo "en: $(grep -o 'data-en=' file.html | wc -l)  id: $(grep -o 'data-id=' file.html | wc -l)"
```
- [ ] **Setelah `present_files`/kirim file ke user: sertakan HANYA file yang benar-benar berubah pada sesi itu** — jangan kirim ulang file yang isinya identik dengan versi sebelumnya. *Reasoning:* mengirim file yang tidak berubah membuat user tidak tahu perubahan mana yang nyata, dan berisiko user menganggap sesuatu sudah diperbaiki padahal file yang dikirim adalah versi lama yang di-generate ulang tanpa perubahan isi.
- [ ] **Verifikasi width sebelum kirim file (v1.2, WAJIB untuk Blueprint B/E):**
```bash
# 1. Cari max-width terlarang di container & elemen teks — hasil harus KOSONG
grep -nE "^\s*(\.wrap|\.main|\.container|\.inner|\.content|p|ul|ol|\.lead)\b[^}]*max-width" file.html \
  | grep -v "max-width:none\|max-width:100%"

# 2. Cari semua angka px/ch tetap pada max-width — pastikan hanya muncul di dalam @media
grep -oE "max-width:\s*[0-9]+(px|ch)" file.html | sort | uniq -c

# 3. Elemen yang wajib bisa mengecil — cek keberadaan aturan berikut di CSS
grep -c "min-width:\s*0" file.html   # harus > 0 kalau ada .grid/.row/.flex
grep -c "<table" file.html            # tiap tabel wajib dibungkus .table-wrap{overflow-x:auto}
```
- [ ] **Verifikasi theme (dark/light) sebelum kirim file (v1.2, lihat kategori 13):**
```bash
grep -c "data-theme" file.html        # harus > 0
grep -c "prefers-color-scheme" file.html  # harus > 0
```
- [ ] **Verifikasi logo terpasang (v1.2, lihat kategori 15):**
```bash
grep -c "anabhidev.com/logo" file.html   # harus >= 2 (sidebar + hero)
```
- [ ] **Verifikasi container logo bebas `background` solid, dan logo Anabhi Dev jadi tautan (v1.4, lihat kategori 15):**
```bash
# 1. Cari background solid di selector yang kemungkinan container logo — tinjau manual tiap hasil
grep -nE "\.(logo-box|brand-mark|logo-wrap|sidebar-logo)\b[^}]*background:\s*#" file.html

# 2. Kalau project pakai logo Anabhi Dev, pastikan dibungkus tautan ke anabhidev.com
grep -B2 "anabhidev.com/logo" file.html | grep -c 'href="https://anabhidev.com"'
# harus sama dengan jumlah kemunculan logo Anabhi Dev (biasanya 2: sidebar + hero)
```
- [ ] **Verifikasi scrollbar custom terpasang pada elemen scrollable visible (v1.4, lihat kategori 13):**
```bash
grep -c "scrollbar-width\|::-webkit-scrollbar" file.html   # harus > 0 untuk sidebar/drawer
```

### 12. Aset Visual & Kredibilitas (kategori baru)
> *Reasoning:* satu foto yang salah konteks (screenshot dashboard di website hospitality, foto lokasi yang salah negara) bisa merusak kepercayaan pengunjung lebih besar daripada skor Lighthouse yang kurang sempurna — ini bukan cuma soal estetika, tapi kredibilitas.

- [ ] **Sumber foto berlisensi bebas komersial** — pilihan utama: Unsplash, Pexels (kualitas tinggi, metadata lokasi eksplisit dan mudah diverifikasi). Cadangan: Pixabay, Burst, StockSnap, Reshot, Kaboompics, Freepik (cek lisensi tier), Wikimedia Commons (untuk landmark/budaya, lisensi bervariasi per file — cek satu-satu).
- [ ] **Verifikasi metadata sebelum pakai** — buka halaman foto di situs sumber, cek field lokasi/tag eksplisit. **Jangan asumsikan foto "kelihatannya Bali" itu benar Bali** — banyak foto tropis di stock photo sebenarnya dari Thailand/Maldives/Filipina. Kalau metadata tidak mencantumkan lokasi sama sekali, jangan pakai untuk konten yang mengklaim lokasi spesifik.
- [ ] **Maksimal 2× pemakaian foto yang sama per halaman**, idealnya tidak berulang sama sekali di section yang berdekatan. *Reasoning:* foto yang sama muncul berkali-kali di satu halaman (apalagi di section berurutan) terasa seperti bug/kemalasan, bukan desain — dan ini pola yang mudah tidak sengaja terjadi kalau menambah section baru dengan copy-paste dari section sebelumnya tanpa mengganti gambar.
- [ ] **Larangan screenshot teknis (dashboard, kode, spreadsheet) sebagai foto utama di website non-teknis** (hospitality, F&B, retail, dll) — foto harus dari "dunia visual" yang sama dengan bisnisnya (interior, produk, orang bekerja di konteks nyata), bukan artefak proses development.
- [ ] **Format URL gambar & cara ganti manual (untuk non-developer/tim):**
  - Unsplash: `https://images.unsplash.com/photo-[ID]?w=800&q=75` — ganti angka `w=` sesuai kebutuhan ukuran (800 kartu, 1600 hero/background besar), `q=` jangan di atas 80.
  - Pexels: `https://images.pexels.com/photos/[ID]/pexels-photo-[ID].jpeg?auto=compress&cs=tinysrgb&w=800`.
  - Cari teks `<img` di file HTML, ganti hanya bagian di dalam `src="..."`, dan **update `alt="..."` supaya tetap menjelaskan foto yang baru** — alt text lama yang menempel di foto baru merusak SEO dan aksesibilitas.
  - Kalau foto dipakai sebagai `background-image` di file `.css` (bukan `<img>` di HTML), cari `url('...')`, ganti hanya bagian ID foto, jangan ubah instruksi tampilan di sekitarnya (`center/cover no-repeat`).



### 13. Dark/Light Mode & Theming *(kategori baru v1.2)*
> *Reasoning:* sebelumnya tidak ada aturan sama sekali soal theming di standar ini, padahal ini sudah jadi ekspektasi standar untuk web app modern — bukan lagi fitur "nice to have".

- [ ] **Token warna wajib lewat `[data-theme]`, bukan hardcode.** Struktur minimal:
  ```css
  :root, [data-theme="light"] {
    --bg: #F7F9FC; --ink: #0A2540; --gold: #9C7A2E; /* varian gelap untuk kontras di atas terang */
  }
  [data-theme="dark"] {
    --bg: #0B1829; --ink: #E8EEF7; --gold: #E8C468; /* varian terang untuk kontras di atas gelap */
  }
  ```
  *Reasoning:* satu sumber kebenaran per warna, gampang diaudit kontrasnya per mode tanpa cari-cari hex code tersebar di banyak selector.
- [ ] **Toggle wajib ada di header** — posisi mengikuti aturan kategori 14 (menempel di sisi yang sama dengan hamburger).
- [ ] **Deteksi awal: `prefers-color-scheme`, lalu override `localStorage` kalau user pernah memilih manual:**
  ```js
  const saved = localStorage.getItem('theme');
  const theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  ```
- [ ] **Anti-FOUC (Flash of Unstyled Content)** — script pembaca theme di atas **wajib** jalan sebelum `<body>` di-render, ditaruh inline di `<head>` (bukan file eksternal yang menunggu network). *Trade-off yang harus disadari:* ini bertentangan dengan prasyarat CSP nol-inline-script (kategori 4). Untuk file HTML tunggal/preview lokal → pakai inline (FOUC yang terlihat lebih merusak UX daripada risiko CSP). Untuk website production dengan CSP ketat → pakai `nonce` atau `sha256` hash khusus untuk script ini di header CSP, bukan `unsafe-inline` global.
- [ ] **Warna aksen (gold/amber) WAJIB punya varian terpisah per mode, bukan dipakai sama di kedua mode.** *Reasoning:* warna gold/amber yang kontrasnya cukup di atas background terang seringkali kontrasnya turun signifikan di atas background gelap (dan sebaliknya) — sekadar "membalik" background tanpa menyesuaikan warna aksen menghasilkan teks yang gagal kontras 4,5:1 di salah satu mode.
- [ ] **`<meta name="theme-color">` ikut berubah saat toggle ditekan** — update lewat JS setiap kali `data-theme` berubah, supaya address bar mobile ikut menyesuaikan warna.
- [ ] **Kontras 4,5:1 wajib diverifikasi di KEDUA mode secara terpisah** (pakai formula WCAG di kategori 11), bukan hanya mode default/light.
- [ ] **Scrollbar custom tipis WAJIB untuk sidebar/drawer** *(v1.4, item baru — reasoning dikoreksi di v1.5)* <span class="ci-badge badge-mandatory">MANDATORY</span> — jangan andalkan scrollbar default browser.
  ```css
  .sidebar{ scrollbar-width:thin; scrollbar-color:var(--border) transparent; }
  .sidebar::-webkit-scrollbar{ width:6px; }
  .sidebar::-webkit-scrollbar-track{ background:transparent; }
  .sidebar::-webkit-scrollbar-thumb{ background:var(--border); border-radius:3px; }
  ```
  *Reasoning:* dibuktikan langsung dari satu screenshot dengan 3 file dibuka bersamaan di satu laptop/browser yang sama (jadi variabel device/OS sudah tereliminasi) — `AnabhiDev-SOP_v1.3.html` (custom scrollbar terpasang: `scrollbar-width:thin` + `::-webkit-scrollbar{width:6px}`) tampil ramping dan menyatu warna, sedangkan `AnabhiDev-AM_v2_3.html` (nol styling scrollbar) tampil tebal dan abu-abu mencolok khas scrollbar default. `ANABHIDEV-NASATYA_v1_1.html` juga nol styling scrollbar, tapi kebetulan tidak menunjukkan masalah di screenshot itu karena kontennya pendek sehingga scrollbar-nya belum sempat muncul — bukan bukti bahwa file itu sudah benar, hanya belum teruji. Kesimpulannya murni soal kode: tanpa `scrollbar-width`/`scrollbar-color` (Firefox) dan `::-webkit-scrollbar*` (Chrome/Edge/Safari), tampilan sidebar 100% bergantung pada scrollbar default browser begitu kontennya cukup panjang untuk memicu scroll — terapkan di setiap elemen `overflow-y:auto`/`overflow:auto` yang scrollable secara visible (sidebar, drawer mobile), bukan cuma scrollbar utama halaman (`html`/`body`).

### 14. Header Mobile — Posisi Hamburger, Judul, Toggle *(kategori baru v1.2)*
> *Reasoning:* pola tumpang tindih antara judul dan hamburger menu saat drawer dibuka adalah bug berulang — ditemukan di `HoL_preview.html` (hamburger kiri + judul kiri, keduanya bertabrakan saat drawer terbuka).

- [ ] **Aturan posisi — MANDATORY, cermin satu sama lain:**

  | Hamburger | Judul/nama web/app | Theme toggle |
  |---|---|---|
  | Kiri | **Kanan** | Kiri (menempel sebelah hamburger) |
  | Kanan | **Kiri** | Kanan (menempel sebelah hamburger) |

  *Reasoning:* kalau judul dan hamburger ada di sisi yang sama, drawer yang terbuka (biasanya slide dari sisi hamburger) akan menutupi judul. Menaruh judul di sisi berlawanan menjamin keduanya tidak pernah bertabrakan di lebar layar berapa pun. Theme toggle **selalu** menempel di sisi yang sama dengan hamburger — supaya semua kontrol interaktif terkumpul di satu sisi, memudahkan jangkauan ibu jari (thumb zone) tanpa menyeberang layar.
  - **Patokan benar:** `AnabhiDev-AM_v2_3.html` — topbar terpisah (58px, `.topbar`) dengan hamburger kanan, sidebar slide dari kanan, judul kiri dengan `.hdr-title`.
  - **Patokan salah — JANGAN ditiru:** `HoL_preview.html` — hamburger kiri dan judul kiri (baris CSS `@media(max-width:768px)`), bertabrakan saat drawer dibuka.
- [ ] **Judul wajib `min-width:0` + `text-overflow:ellipsis`** — supaya judul/nama app yang panjang tidak pernah mendorong tombol hamburger/toggle keluar dari area layar yang terlihat.
  ```css
  .hdr-title { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  ```
- [ ] **Drawer/sidebar mobile — checklist interaksi wajib:**
  - [ ] Tombol `Esc` menutup drawer **DAN** modal/dialog apa pun yang sedang terbuka *(v1.3, diperjelas)* — kalau ada modal yang lebih prioritas terbuka bersamaan, `Esc` menutup modal dulu, bukan langsung menutup drawer di baliknya.
    ```js
    document.addEventListener('keydown', function(e){
      if (e.key !== 'Escape') return;
      if (modal.classList.contains('show')) { closeModal(); return; }
      if (sidebar.classList.contains('open')) closeDrawer();
    });
    ```
  - [ ] Klik di area overlay (di luar drawer) menutup drawer.
  - [ ] `aria-expanded` pada tombol hamburger benar-benar di-toggle lewat JS saat drawer dibuka/ditutup (lihat kategori 8 — bug senyap yang lolos Lighthouse tapi merusak screen reader).
  - [ ] **Fokus otomatis pindah ke item navigasi pertama di dalam drawer saat drawer dibuka** *(v1.3, item baru)* — bukan cuma dikembalikan ke tombol hamburger saat drawer ditutup. *Reasoning:* pengguna keyboard/screen reader yang baru membuka drawer seharusnya langsung berada di konten drawer, bukan harus menekan Tab dulu untuk masuk.
    ```js
    function openDrawer(){
      sidebar.classList.add('open');
      menuBtn.setAttribute('aria-expanded', 'true');
      var first = sidebar.querySelector('.nav a');
      if (first) first.focus();
    }
    ```
  - [ ] Fokus keyboard dikembalikan ke tombol hamburger saat drawer ditutup (bukan hilang begitu saja).
  - [ ] Tinggi drawer/overlay pakai `100dvh` (lihat kategori 1), bukan `100vh`.
- [ ] **Touch target hamburger & theme toggle minimal 44×44px** — ini kontrol yang paling sering dipencet di seluruh halaman, harus jadi target sentuh paling nyaman (lihat standar touch target di kategori 8/Blueprint F).
- [ ] **Scrollspy (highlight item navigasi aktif sesuai posisi scroll) wajib pakai `IntersectionObserver`** *(v1.3, item baru)*, bukan `scroll` event manual dengan perhitungan `offsetTop`. *Reasoning:* `IntersectionObserver` tidak berjalan di main thread pada setiap event scroll (lebih hemat performa, tidak berkontribusi ke INP yang buruk — lihat kategori 1), dan lebih akurat menangani section dengan tinggi tidak seragam.
  ```js
  var spy = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (!en.isIntersecting) return;
      navLinks.forEach(function(a){
        a.classList.toggle('active', a.getAttribute('href') === '#' + en.target.id);
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  sections.forEach(function(s){ spy.observe(s); });
  ```
- [ ] **Skip link wajib** *(v1.3, item baru)* — `<a href="#main" class="sr-only">Lompat ke konten utama</a>` sebagai elemen pertama di `<body>`, sebelum topbar. *Reasoning:* pengguna keyboard/screen reader tanpa skip link harus menekan Tab berkali-kali melewati seluruh item navigasi sebelum mencapai konten utama di setiap halaman — skip link memungkinkan lompat langsung.
- [ ] **Print stylesheet wajib untuk halaman jenis Web Interactive/Brief** *(v1.3, item baru)* — `@media print` yang menyembunyikan topbar/sidebar/tombol aksi/modal, membuat layout jadi single-column tanpa padding sidebar, dan mencegah section terpotong di tengah (`break-inside: avoid`). Disertai tombol print/PDF eksplisit di topbar (`onclick="window.print()"`), bukan mengandalkan pengguna tahu shortcut `Ctrl+P`.
  ```css
  @media print{
    .topbar,.sidebar,.drawer-scrim,.actions,.modal-backdrop{display:none !important}
    .shell{display:block;padding-top:0}
    #main{padding:0}
    .section{break-inside:avoid}
  }
  ```
- [ ] **Progress percentage di topbar BUKAN pattern wajib Blueprint B** *(v1.4, item baru)* — pola `0% (0/247)` di topbar (dipakai file checklist SOP ini sendiri karena isinya memang checklist) adalah kebutuhan spesifik file itu, bukan standar umum yang harus ditiru ke semua Web Interactive. *Reasoning:* Web Interactive lain (product brief, dokumentasi, knowledge base) umumnya tidak punya konsep "progress" yang bermakna — memaksakan elemen ini ke topbar project yang tidak relevan cuma menambah noise visual dan kompleksitas JS tanpa nilai bagi pembaca. Tambahkan indikator progress ke topbar **hanya** kalau project memang berbasis checklist/tracker; kalau ragu, defaultnya tidak perlu.

### 15. Standar Logo — Sumber & Penempatan *(kategori v1.2, ditulis ulang total di v1.3)*
> *Reasoning:* kategori 1 sudah mengatur ukuran/dimensi upload logo, tapi belum pernah mengatur **di mana** logo dipasang di layout — akibatnya logo sering tertinggal atau tidak konsisten posisinya antar project. Versi v1.2 sempat men-hardcode 2 URL Anabhi Dev sebagai satu-satunya sumber logo yang sah — ini keliru untuk mayoritas pekerjaan Anabhi Dev yang sebenarnya adalah project untuk pihak lain (klien, kantor, brand turunan) yang punya identitas visual sendiri. v1.3 menulis ulang kategori ini jadi rule umum.

- [ ] **Dua titik pemasangan wajib untuk halaman guide/dashboard/brief (Blueprint B/E):**
  - **Sidebar/header** — logo versi kecil (~40px), biasanya di atas judul/brand text sidebar.
  - **Hero body** — logo versi besar (~150px), di area konten utama hero, bukan sekadar dekorasi sidebar saja.
- [ ] **RULE UMUM — logo mengikuti project yang dikerjakan, bukan selalu logo Anabhi Dev** *(v1.3, MANDATORY)* <span class="ci-badge badge-mandatory">MANDATORY</span>
  Ada **tiga** konteks, dan ketiganya berperilaku berbeda — jangan disamaratakan *(v1.8, dipertajam)*:

  | Konteks | Logo yang dipasang | Seragam? |
  |---|---|---|
  | **Project Anabhi Dev sendiri** (SOP ini, portfolio, tooling internal) | Logo Anabhi Dev | Ya |
  | **Project klien / brand turunan** (ARVENAA, HoL, Bali Private Chef, dll) | Logo **klien/brand tersebut**, bukan logo Anabhi Dev di posisi utama | **Tidak** — beda klien, beda logo |
  | **Project Miss Fish Bali** (sistem internal kantor) | Logo Miss Fish Bali | **Ya — SELALU, tanpa kecuali** |

  - 🔴 **Beda penting antara baris 2 dan 3.** Di bawah payung **Anabhi Dev**, logo **tidak selalu** logo Anabhi Dev — mayoritas justru logo klien, jadi **wajib dicek per project**. Di bawah payung **Miss Fish**, logo **selalu** Miss Fish di semua aplikasi (IT Dashboard, HR Tracker, Emergency Call, LMS, dst) karena semuanya sistem internal satu kantor yang sama — **tidak ada kasus "project Miss Fish tapi logonya brand lain"**. Konsekuensi praktisnya: untuk project Miss Fish tidak perlu bertanya logo mana yang dipakai; untuk project di bawah Anabhi Dev, **wajib** dipastikan dulu.
  - *Reasoning:* mayoritas pekerjaan Anabhi Dev adalah project untuk pihak lain — memaksa logo Anabhi Dev tampil sebagai identitas utama di produk klien salah secara profesional (klien tidak sedang membeli "produk Anabhi Dev", mereka membeli jasa development). Ini juga mencegah kebutuhan bikin SOP logo terpisah untuk tiap klien — cukup satu rule: **logo = based on project apa yang sedang dikerjakan.**
  - Kredit di header file (kategori 17) **tetap** dicantumkan terlepas dari logo apa yang tampil di sidebar/hero — ini yang membedakan "identitas produk" (logo project) dari "siapa yang mengerjakan" (kredit). Keduanya tidak saling menggantikan. **Nilainya mengikuti edisi Standar Penulisan Kode** yang dipakai: `Development · Anabhi Dev` untuk project Anabhi Dev & kliennya, `IT Department · Miss Fish Bali` untuk project Miss Fish — lihat tabel edisi di kategori 17. *Catatan:* untuk project Miss Fish, kredit **dan** logo sama-sama Miss Fish; untuk project klien, kredit Anabhi Dev tapi logo klien — hanya di sinilah keduanya berbeda.
- [ ] **Dua titik pemasangan wajib untuk halaman Web Interactive/Brief (Blueprint B) dan Dashboard (Blueprint E):**
  - **Sidebar** — logo versi kecil, transparan menyatu dengan warna sidebar, tinggi kontainer logo sekitar 100–115px (bukan mepet penuh navbar/topbar). Lihat pola `.logo-box` di `AnabhiDev-AM_v2_3.html`.
  - **Hero body** — logo versi besar dalam card putih terpisah (bukan logo polos tanpa bingkai), lihat kategori Blueprint B untuk detail struktur hero.
- [ ] 🔴 **Sumber logo resmi — SATU pasang per brand, jangan cari/karang URL lain** *(v1.8, diperbarui — daftar URL resmi Anabhi Dev & Miss Fish Bali)* <span class="ci-badge badge-mandatory">MANDATORY</span>
  Setiap brand punya **dua berkas** yang berpasangan, dibedakan berdasarkan **warna latar tempat logo dipasang**, bukan berdasarkan lokasi elemennya:

  | Brand | Latar **gelap** (sidebar gelap, panel login, hero gradient) | Latar **terang/putih** (card putih hero, dokumen cetak) |
  |---|---|---|
  | **Anabhi Dev** | `https://anabhidev.com/logo.webp` *(latar transparan)* | `https://anabhidev.com/logo-black.webp` |
  | **Miss Fish Bali** | `https://anabhidev.com/MFB/missfish-logo.webp` *(latar transparan)* | `https://anabhidev.com/MFB/missfish-logo-white.webp` |

  - **Berkas latar-gelap berlatar transparan** — inilah alasan `background` pada container logo sidebar DILARANG (lihat item `background` di bawah): logonya memang sudah didesain menyatu dengan sidebar gelap, tidak butuh kotak putih di baliknya.
  - **Berkas kedua dipakai saat logo berada di atas area terang** — misalnya card putih di hero (Blueprint B.4) atau lampiran/cetak (`@media print`).
  - **Login page (kategori 19)** memakai berkas **latar-gelap**, karena kedua panelnya berlatar gelap.
  - Untuk project lain, pola path yang konsisten: `https://anabhidev.com/[NamaProject]/img/logo.webp` (latar gelap) dan `https://anabhidev.com/[NamaProject]/img/logo-hero.webp` (latar terang) — contoh nyata: `https://anabhidev.com/Arvenaa/Meals/img/logo.webp`.
  - *Catatan implementasi:* URL di tabel ini sudah dikonfirmasi — pasang langsung tanpa verifikasi ulang tiap kali, dan **jangan** menggantinya dengan URL image host pihak ketiga (ibb.co, imgur, dsb) yang bisa mati sewaktu-waktu. Kalau ada brand baru, mintakan pasangan URL-nya ke user lalu tambahkan ke tabel ini — jangan berimprovisasi sendiri.
- [ ] **Path hosting `anabhidev.com/[NamaProject]/` TIDAK berarti logo yang tampil harus logo Anabhi Dev** *(v1.6, item baru, klarifikasi)* — path itu murni soal **di mana file logo di-host** (kemungkinan besar semua project Anabhi Dev, klien atau bukan, di-hosting di bawah domain yang sama), independen sepenuhnya dari **logo apa yang ditampilkan** di halaman (tetap ikut RULE UMUM di atas: logo project). *Reasoning:* contoh `https://anabhidev.com/Arvenaa/Meals/img/logo.webp` isinya tetap **logo ARVENAA**, bukan logo Anabhi Dev — domain di URL menunjukkan siapa yang meng-host, bukan identitas visual yang dikandungnya. Jangan sampai kemiripan kata "anabhidev.com" di path membuat asumsi keliru bahwa logonya juga harus Anabhi Dev.
- [ ] **Pakai URL absolut penuh**, bukan root-relative (lihat kategori 1) — supaya logo tetap tampil saat file dibuka langsung dari lokal (`file://`) sebelum diupload ke hosting.
- [ ] **`alt` deskriptif wajib** (contoh: `alt="ARVENAA Meals"` atau `alt="Anabhi Dev"`, bukan `alt="logo"` generik) + `width`/`height` eksplisit di tag `<img>` untuk mencegah CLS saat logo dimuat.
- [ ] **Kalau ragu logo mana yang dipakai, tanyakan dulu** — jangan berasumsi logo Anabhi Dev otomatis dipakai hanya karena Anabhi Dev yang mengerjakan filenya. Konteks percakapan (nama project, siapa kliennya) biasanya sudah menjawab, tapi kalau tidak jelas, konfirmasi ke user sebelum memasang logo yang salah.
- [ ] **`background` pada container logo DILARANG kecuali memang bagian dari desain card (lihat Blueprint B.4 — card logo putih di hero)** *(v1.4, item baru)* <span class="ci-badge badge-mandatory">MANDATORY</span> — untuk container logo di **sidebar**, `background` wajib `transparent`.
  ```css
  /* BENAR — sidebar, logo menyatu dengan warna sidebar */
  .logo-box{ background:transparent; }

  /* SALAH — root cause bug "logo jadi kotak putih" yang ditemukan berulang */
  .brand-mark{ background:#ffffff; }
  ```
  *Reasoning:* bug "logo Anabhi Dev tertutup kotak putih" yang berulang kali muncul di beberapa file Web Interactive (termasuk `ANABHIDEV-NASATYA_v1_1.html`) **bukan** disebabkan oleh file `logo.webp`/`logo-black.webp` — kedua file tersebut sudah dikonfirmasi transparan dari sumbernya. Penyebabnya CSS container logo diberi `background:#ffffff` secara eksplisit (kemungkinan niat awal supaya logo "kelihatan" di atas background gelap, padahal logo Anabhi Dev memang didesain kontras untuk background gelap tanpa perlu kotak putih di baliknya — bandingkan dengan pola `.logo-box{background:transparent}` yang sudah benar di `AnabhiDev-AM_v2_3.html` dan `AnabhiDev-SOP_v1.3.html`). Verifikasi sebelum deploy: cari selector container logo (`.logo-box`, `.brand-mark`, atau sejenisnya) dan pastikan tidak ada `background` solid berwarna di baris CSS-nya, kecuali item ini memang card putih hero yang sengaja (lihat Blueprint B.4).
- [ ] **Kalau project memakai logo Anabhi Dev, logo itu WAJIB jadi tautan ke `https://anabhidev.com`** *(v1.4, item baru)* <span class="ci-badge badge-mandatory">MANDATORY</span> — syarat "kalau" di judul ini sengaja ditulis eksplisit karena rule utama kategori ini tetap **logo mengikuti project** (lihat item RULE UMUM di atas); item ini cuma menambah satu detail teknis untuk kasus ketika logo Anabhi Dev-lah yang dipakai, bukan mewajibkan logo Anabhi Dev muncul di project manapun. Berlaku untuk **kedua** titik pemasangan (sidebar maupun hero) ketika kondisinya terpenuhi.
  ```html
  <a class="logo-box" href="https://anabhidev.com" aria-label="Kunjungi anabhidev.com">
    <img src="https://anabhidev.com/logo.webp" alt="Anabhi Dev" width="512" height="180" loading="eager">
  </a>
  ```
  *Reasoning:* logo yang tidak bisa diklik adalah peluang navigasi yang hilang — pola umum di web modern adalah logo brand selalu jadi tautan pulang ke situs utama brand tersebut. Ini tidak berlaku untuk logo project/klien (lihat rule umum): logo klien menautkan ke identitas klien, bukan ke `anabhidev.com`.

### 16. Bottom Navigation 5-Tab (Web App) *(kategori baru v1.2)*
> *Reasoning:* sebelumnya pola ini hanya tersirat di Blueprint E (dashboard). Dinaikkan jadi standar umum karena relevan untuk semua web app dengan banyak halaman/fungsi yang diakses bolak-balik (bukan cuma dashboard ber-PIN).

- [ ] **Kapan dipakai:** web app dengan 3–5 fungsi/halaman utama yang sama-sama sering diakses bolak-balik (contoh: Input, Today, Dasbor, Log, Riwayat). **Bukan** untuk company profile/marketing statis (Blueprint A) atau Web Interactive/Brief read-only (Blueprint B tanpa elemen app) — di situ navigasi sidebar/jump-link lebih tepat.
- [ ] **Maksimal 5 tab.** Lebih dari 5 → pertimbangkan pengelompokan ulang fungsi atau navigasi sekunder, jangan dipaksa muat di bottom nav (target sentuh jadi terlalu sempit).
- [ ] **Tab aktif memakai nada warna terpisah dari makna warna lain yang sudah dipakai di halaman** — contoh: kalau hijau sudah dipakai untuk menandai "status selesai" di kartu/list, tab aktif di bottom nav sebaiknya memakai token hijau yang berbeda (mis. `--green-nav` vs `--green-success`) supaya makna warna tidak tercampur antara "navigasi aktif" dan "item selesai".
- [ ] **Touch target tiap tab minimal 44×44px**, dengan area sentuh mencakup ikon + label, bukan cuma ikon (lihat kategori 8/14).
- [ ] **Hanya tampil di mobile/tablet** (breakpoint sesuai kategori 1) — di desktop biasanya digantikan sidebar, kecuali app memang didesain mobile-first murni.
- [ ] **`aria-current="page"` pada tab aktif** untuk aksesibilitas, di-update lewat JS saat berpindah tab (bukan navigasi full page-reload kalau app bersifat SPA-like).

### 17. Header File Kode & Penamaan File *(kategori baru v1.2)*
> *Reasoning:* sebelumnya Standar Penulisan Kode berjalan sebagai dokumen terpisah tanpa ditautkan ke SOP website ini. Kategori ini menyatukan keduanya sebagai satu rujukan, supaya setiap file yang dihasilkan otomatis mengikuti standar penamaan & header tanpa perlu melampirkan dua dokumen terpisah setiap kali.

- [ ] 🔴 **Rujukan resmi — PILIH EDISI SESUAI PEMILIK PROJECT** *(v1.8, diperjelas)* <span class="ci-badge badge-mandatory">MANDATORY</span>
  SOP ini **satu file untuk semua project**, tapi Standar Penulisan Kode terbit dalam **dua edisi** yang isinya identik kecuali bagian kredit & prefix. Pakai **satu** edisi saja per project — jangan dicampur:

  | Project milik | Edisi yang dipakai | Credit di header file | Contoh prefix |
  |---|---|---|---|
  | **Anabhi Dev** (portfolio, tooling internal) **atau klien Anabhi Dev** (ARVENAA, HoL, dll) | `Standar_Coding_AnabhiDev_v1.5.md` | `Development · Anabhi Dev` | `AnabhiDev-AM`, `AnabhiDev-CSP` |
  | **Miss Fish Bali** (sistem internal kantor) | `Standar_Coding_MissFishBali_v1.5.md` | `IT Department · Miss Fish Bali` | `MFB-IT`, `MFB-SYS` |

  ✅ **Kedua edisi sudah di v1.5** (6 Sep 2026). Bagian 9 pada keduanya **identik kata per kata** — sudah diverifikasi otomatis setelah menormalkan kredit & prefix. Yang membedakan hanya identitas: kredit di Bagian 6 dan prefix nama berkas. Kalau salah satu edisi diubah di Bagian 9, **edisi satunya wajib diubah sama persis** — perbedaan di situ selalu berarti salah satunya basi.

  - 🔴 **Kredit di header file mengikuti EDISI, bukan selalu "Anabhi Dev".** Untuk project Miss Fish, header file berkredit `IT Department · Miss Fish Bali` dan **DILARANG mencantumkan "Anabhi Dev"** — itu sistem internal kantor, bukan pekerjaan jasa yang dikreditkan ke pihak luar. *Reasoning:* dua edisi ini memang sengaja dipisah persis karena aturan kreditnya berlawanan; membaca SOP ini seolah-olah kredit selalu "Anabhi Dev" akan langsung melanggar Bagian 6 edisi Miss Fish.
  - **Kalau tidak jelas project ini milik siapa, tanyakan** — jangan menebak dari nama folder saja.

  Ringkasan poin wajib yang **sama di kedua edisi** (detail lengkap ada di dokumen edisinya masing-masing):
  - **Header file wajib** di setiap file kode: `[PREFIX] — [Nama Lengkap Project]`, daftar teknologi yang **benar-benar dipakai** di file itu, `Development · Anabhi Dev`, `Version`, `Generated` (timestamp real-time, WITA, format `28 August 2026, 08:45:00`).
  - **Prefix** = kode project, HURUF BESAR + tanda hubung, **mengikuti edisi**: edisi Anabhi Dev → `AnabhiDev-WEB`, `AnabhiDev-SOP`, `AnabhiDev-BPC` (Bali Private Chef), `AnabhiDev-AM` (ARVENAA Meals), `AnabhiDev-CSP` (Child Smart Play); edisi Miss Fish → `MFB-IT`, `MFB-SYS`. Project klien tetap memakai prefix `AnabhiDev-` karena Anabhi Dev yang mengerjakan (lihat item klarifikasi di bawah) — yang **tidak** memakai prefix `AnabhiDev-` hanyalah project Miss Fish, karena itu sistem internal kantor dengan edisi standar tersendiri.
  - **Pembedaan Penamaan File (Web Apps vs Website Deploy Folder) — v1.7 / Standar Coding v1.4:**
    - **Web Apps & Backend (GAS, Supabase, Single-File Dashboard/App):** File aktif di folder kerja **BOLEH memakai versi** (`Auth_v1.4.gs`, `submit-task_v1.3.ts`, `AnabhiDev-AM_v2_3.html`) karena kode di-copy/paste manual per modul saat deploy. Saat versi naik, file lama dipindahkan ke `arsip/` (`arsip/Auth_v1.3.gs`).
    - **Website Multi-Page & Static Site (Cloudflare Pages, Netlify, Hosting Statis):** File aktif di folder deploy **WAJIB TETAP BERSIH TANPA VERSI** (`index.html`, `menu.html`, `consulting.html`, `contact.html`, `css/base.css`). **DILARANG me-rename file aktif deploy menjadi `index_v1.2.html`** karena akan memicu 404 pada routing, sitemap, canonical, dan internal link. Versi file aktif tercatat di header file (`Version : 1.2`), dan **yang diberi nomor versi adalah file cadangan lama saat dipindahkan ke `arsip/`** (contoh: `arsip/index_v1.1.html`, `arsip/components_v1.1.css`).
  - **Penomoran versi:** `[MAYOR].[MINOR]`, mulai `1.1`, MINOR naik tiap perubahan (bilangan bulat), MAYOR naik saat perubahan arsitektur besar (ganti platform/database/rombak total) — MINOR reset ke 1 saat MAYOR naik.
  - **Credit:** **satu nilai sesuai edisi** (lihat tabel di atas) — `Development · Anabhi Dev` untuk edisi Anabhi Dev, `IT Department · Miss Fish Bali` untuk edisi Miss Fish. Kedua edisi sama-sama melarang mencantumkan nama perorangan, pihak ketiga, atau mencampur dua brand dalam satu header. Nilai kredit ini berlaku terlepas dari logo apa yang dipasang di UI (lihat kategori 15) — kredit di header file dan identitas visual produk adalah dua hal terpisah.
- [ ] **Prefix nama file `AnabhiDev-` TIDAK berarti logo yang tampil di halaman harus logo Anabhi Dev** *(v1.6, item baru, klarifikasi)* — prefix menandakan **siapa yang mengerjakan** file itu (selalu Anabhi Dev, konsisten untuk semua project termasuk milik klien), independen sepenuhnya dari **logo apa yang ditampilkan** di UI (tetap ikut rule umum kategori 15: logo project). *Reasoning:* `AnabhiDev-AM` adalah nama file untuk project ARVENAA Meals — prefix-nya "AnabhiDev" karena Anabhi Dev yang mengerjakan, tapi logo yang tampil di dalam file itu tetap **logo ARVENAA**, bukan logo Anabhi Dev. Pola yang sama berlaku untuk path hosting (lihat kategori 15) — ketiganya (prefix file, path hosting, logo tampilan) kebetulan sama-sama memuat kata "Anabhi Dev"/"anabhidev.com", tapi mengatur tiga hal yang sepenuhnya independen: siapa developernya, di mana file/aset di-host, dan identitas visual project yang ditampilkan ke pengunjung.
- [ ] **Berlaku untuk SEMUA file yang dihasilkan** mengikuti standar website ini (Blueprint A–G) — SOP website ini mengatur *apa* yang dibangun (layout, width, theme, dst), `Standar_Coding_[edisi]_v1.4.md` mengatur *bagaimana file itu diberi nama & header*. Keduanya dipakai bersamaan, bukan saling menggantikan.
- [ ] **Konfigurasi Gemini API** (kalau project memakainya) mengikuti bagian 7 di `Standar_Coding_[edisi]_v1.4.md` — model konstanta, blok `CONFIG`, API key selalu dari secrets/environment platform (tidak pernah hardcode), PIN divalidasi server-side dengan hash tersimpan (bukan PIN asli).

---

### 18. PWA — Progressive Web App (Android & iOS) *(kategori baru v1.8)*
> *Reasoning:* sebelum v1.8, PWA hanya tersinggung sepintas di kategori 2 (Web App Manifest disebut "opsional") dan Blueprint F (Service Worker "bila memungkinkan") — tanpa aturan konkret. Padahal pembuatan PWA nyata (`mfb-emergency-call.pages.dev`) menemukan banyak jebakan yang tidak terlihat dari dokumentasi umum: install yang jadi *pintasan* alih-alih aplikasi, splash screen yang tidak bisa dibedakan dari ikon di Android 12+, dan PWA yang "tidak update-update". Seluruh isi kategori ini dilebur penuh dari `PANDUAN-PWA.md` v1.1 — dokumen itu **resmi dipensiunkan/dilebur**, dan SOP ini menjadi satu-satunya sumber kebenaran tunggal (pola yang sama seperti peleburan Addendum Cache-Busting di v1.7). Setiap aturan di bawah lahir dari kegagalan nyata di lapangan (terbukti di Google Pixel, Vivo, iPhone), bukan teori.

**Kapan kategori ini dipakai**

- [ ] **PWA dipakai kalau produknya berkarakter aplikasi** — dashboard, tools operasional lapangan, emergency call, web app ber-login, game anak (Blueprint E & F). 🟢 **Tidak wajib** untuk company profile / marketing / hospitality statis (Blueprint A) — di situ cukup favicon + `theme-color` (kategori 2), tidak perlu Service Worker.
- [ ] **Kalau project dinyatakan PWA, SELURUH kategori ini menjadi MANDATORY** <span class="ci-badge badge-mandatory">MANDATORY</span> — bukan sebagian. PWA setengah jadi (manifest ada tapi Service Worker tanpa `fetch` handler) menghasilkan tombol install yang **tidak pernah muncul**, dan ini sulit didiagnosis belakangan.

**18.1 Empat syarat wajib — kalau satu tidak terpenuhi, tombol install TIDAK AKAN PERNAH muncul**

| # | Syarat | Catatan |
|---|---|---|
| 1 | **HTTPS** | Cloudflare Pages / Netlify otomatis. Tanpa HTTPS, Service Worker ditolak browser |
| 2 | **`manifest.json` valid** | Lihat 18.2 |
| 3 | **Service Worker dengan `fetch` handler** | Handler kosong pun tidak cukup — harus benar-benar menangani `fetch` |
| 4 | **Ikon 192px & 512px PNG** | Harus PNG. WebP/SVG **tidak diterima** — perhatikan ini berbeda dari aturan umum kategori 1 yang mengutamakan WebP |

- [ ] Keempat syarat di atas diverifikasi **sebelum** menyerahkan file, bukan diasumsikan.

**18.2 `manifest.json` — bentuk paling aman**

- [ ] Pakai bentuk minimal berikut sebagai basis:
  ```json
  {
    "name": "Nama Lengkap Aplikasi",
    "short_name": "Nama Pendek",
    "description": "Keterangan singkat.",
    "start_url": "/",
    "scope": "/",
    "display": "standalone",
    "background_color": "#0A0A0A",
    "theme_color": "#0A0A0A",
    "icons": [
      { "src": "/assets/icon-192-2.png", "sizes": "192x192",
        "type": "image/png", "purpose": "any" },
      { "src": "/assets/icon-512-2.png", "sizes": "512x512",
        "type": "image/png", "purpose": "any" },
      { "src": "/assets/icon-512-maskable-2.png", "sizes": "512x512",
        "type": "image/png", "purpose": "maskable" }
    ]
  }
  ```
- [ ] 🔴 **DILARANG mengisi `id` dengan query string** <span class="ci-badge badge-mandatory">MANDATORY</span> — `"id": "/?nama-app"` membuat pembuatan **WebAPK gagal** dan Chrome jatuh ke *pintasan*. *Bukti lapangan:* satu HP yang tadinya berhasil install sebagai aplikasi ikut rusak setelah `id` diubah begini. **Paling aman: hilangkan field `id` sepenuhnya** — defaultnya mengikuti `start_url`.
- [ ] 🔴 **DILARANG memakai version query `?v=` pada URL ikon di manifest** <span class="ci-badge badge-mandatory">MANDATORY</span> — ini **pengecualian eksplisit dari aturan cache-busting kategori 1**. Untuk cache-busting ikon PWA, **ganti nama filenya** (`icon-512-2.png`), jangan `icon-512.png?v=2`.
- [ ] **Path ikon wajib absolut** (`/assets/...`), bukan relatif (`./assets/...`).
- [ ] **`start_url` wajib berada di dalam `scope`.**
- [ ] **Sederhanakan.** `orientation`, `categories`, `shortcuts` tidak wajib — hilangkan kalau ragu. Makin sedikit field, makin kecil peluang manifest ditolak.
- [ ] **Content-Type manifest di-set eksplisit** lewat `_headers` (Cloudflare default mengirim `application/json`):
  ```
  /manifest.json
    Content-Type: application/manifest+json; charset=utf-8
    Cache-Control: public, max-age=0, must-revalidate
  ```

**18.3 Ikon — aturan per platform**

| Berkas | Ukuran | `purpose` | Dipakai untuk |
|---|---|---|---|
| `icon-192-2.png` | 192×192 | `any` | Fallback + `apple-touch-icon` iOS |
| `icon-512-2.png` | 512×512 | `any` | Cadangan; splash di Android ≤11 |
| `icon-512-maskable-2.png` | 512×512 | `maskable` | **Ikon aplikasi** di Android 12+ |

- [ ] **Latar ikon solid**, samakan dengan `background_color`. **Jangan transparan** — hasilnya tidak terduga di berbagai launcher. *(Catatan: ini berbeda dari aturan logo kategori 15 yang mewajibkan sumber logo transparan — ikon PWA adalah aset terpisah, bukan file logo yang sama.)*
- [ ] 🔴 **Ikon `maskable`: konten maksimal 80% kanvas** <span class="ci-badge badge-mandatory">MANDATORY</span> — Android memotong ikon jadi lingkaran/rounded dan hanya menyisakan bagian tengah. Logo bertulisan yang mepet tepi **akan terpotong hurufnya**. → Aman di kisaran **60–65%** kalau logonya memuat teks.
- [ ] **PNG harus benar-benar standar** — kalau PNG dibuat lewat script sendiri, verifikasi struktur chunk + CRC-nya. PNG cacat bisa membuat pembuatan WebAPK gagal **tanpa pesan error apa pun**.

**18.4 🔴 Splash screen — beda total antara Android dan iOS**

Bagian yang paling sering disalahpahami, dan sumber janji-ke-klien yang tidak bisa ditepati.

| Versi Android | Sumber gambar splash |
|---|---|
| **11 ke bawah** | Ikon terbesar dari manifest — bisa dibedakan dari ikon app |
| **12 ke atas** | **Ikon aplikasi itu sendiri** — TIDAK BISA dibedakan |

- [ ] 🔴 **Di Android 12+, splash = ikon aplikasi. Tidak ada cara membuat keduanya berbeda lewat manifest.** Sejak Android 12 splash diambil alih sistem operasi: memakai ikon aplikasi di atas `background_color`, dipotong bulat; Chrome tidak lagi memilih gambar sendiri dari manifest. **Kalau ada permintaan "ikon app A, splash B" — jelaskan sejak awal bahwa ini mustahil di Android modern**, jangan dijanjikan lalu gagal di akhir. Yang bisa diatur di Android hanyalah **warna latar** lewat `background_color`.
- [ ] **iOS tidak membaca manifest untuk splash** — harus disediakan file gambar per ukuran layar lewat `apple-touch-startup-image`. **Karena iOS memakai file terpisah, di iPhone splash BISA dibuat berbeda dari ikon aplikasi** — hanya Android yang tidak bisa.
  ```html
  <link rel="apple-touch-startup-image" href="/assets/splash-1170x2532.png"
        media="(device-width:390px) and (device-height:844px) and (-webkit-device-pixel-ratio:3)">
  ```
- [ ] **Sediakan minimal 6 ukuran iPhone umum** (piksel, bukan CSS px):

  | Piksel | Perangkat |
  |---|---|
  | 750×1334 | iPhone SE / 8 |
  | 1125×2436 | iPhone X / XS / 11 Pro |
  | 1170×2532 | iPhone 12 / 13 / 14 |
  | 1179×2556 | iPhone 14 / 15 Pro |
  | 1284×2778 | iPhone 12–14 Pro Max |
  | 1290×2796 | iPhone 14 / 15 Pro Max |

  Perangkat yang tidak cocok media query mana pun tetap mendapat layar `background_color` polos — jadi ini pelengkap, bukan syarat.
- [ ] **Durasi splash TIDAK BISA diatur** — ditentukan sistem operasi, muncul selama aplikasi memuat. Halaman yang ringan (lihat kategori 1) otomatis menghasilkan splash yang singkat. Ini alasan tambahan kenapa budget performa kategori 1 berlaku penuh untuk PWA.
- [ ] **Meta iOS pelengkap terpasang:**
  ```html
  <link rel="apple-touch-icon" href="/assets/icon-192-2.png">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="Nama Pendek">
  ```

**18.5 Service Worker — anti "PWA tidak update-update"**

Keluhan paling umum pada PWA. Penyebabnya selalu strategi cache yang salah, bukan hosting.

- [ ] **`CACHE_VERSION` sebagai konstanta di baris atas, WAJIB dinaikkan tiap rilis** — sejalan dengan penomoran versi kategori 17.
- [ ] **HTML: network-first** (selalu coba versi terbaru, cache hanya dipakai saat offline). **Aset: cache-first.**
- [ ] **Precache per-item (`c.add` di dalam `Promise.all`), bukan `addAll`** — satu URL gagal tidak menggagalkan seluruh instalasi.
- [ ] **Hapus cache lama saat `activate`**, lalu `clients.claim()`.
- [ ] **Dengarkan pesan `SKIP_WAITING`** supaya halaman bisa memaksa versi baru aktif tanpa menunggu semua tab ditutup.
  ```js
  var CACHE_VERSION = 'nama-app-v1-1';   // WAJIB dinaikkan tiap rilis

  var PRECACHE = [ '/', '/index.html', '/manifest.json', '/assets/icon-192-2.png' ];

  self.addEventListener('install', function (e) {
    e.waitUntil(
      caches.open(CACHE_VERSION).then(function (c) {
        // per-item, bukan addAll — satu URL gagal tidak menggagalkan semuanya
        return Promise.all(PRECACHE.map(function (u) {
          return c.add(new Request(u, { cache: 'reload' })).catch(function () {});
        }));
      }).then(function () { return self.skipWaiting(); })
    );
  });

  self.addEventListener('activate', function (e) {
    e.waitUntil(
      caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (k) {
          if (k !== CACHE_VERSION) return caches.delete(k);   // buang cache lama
        }));
      }).then(function () { return self.clients.claim(); })
    );
  });

  // Halaman minta versi baru langsung mengambil alih
  self.addEventListener('message', function (e) {
    if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
  });

  self.addEventListener('fetch', function (e) {
    var req = e.request;
    if (req.method !== 'GET') return;

    var isDoc = req.mode === 'navigate' ||
                (req.headers.get('accept') || '').indexOf('text/html') !== -1;

    if (isDoc) {
      // HTML: network-first — selalu coba versi terbaru, cache hanya saat offline
      e.respondWith(
        fetch(req).then(function (res) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
          return res;
        }).catch(function () {
          return caches.match(req).then(function (hit) {
            return hit || caches.match('/index.html');
          });
        })
      );
      return;
    }

    // Aset: cache-first
    e.respondWith(
      caches.match(req).then(function (hit) {
        return hit || fetch(req).then(function (res) {
          if (res && (res.status === 200 || res.type === 'opaque')) {
            var copy = res.clone();
            caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
          }
          return res;
        }).catch(function () { return hit; });
      })
    );
  });
  ```
- [ ] **Di halaman: kirim `SKIP_WAITING` saat versi baru terdeteksi, lalu reload sekali dengan guard anti-loop.**
  ```js
  if ('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/sw.js').then(function(reg){
        reg.addEventListener('updatefound', function(){
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', function(){
            if (nw.state === 'installed' && navigator.serviceWorker.controller){
              nw.postMessage({ type:'SKIP_WAITING' });
            }
          });
        });
      }).catch(function(){});

      var reloaded = false;   // guard: cegah reload berulang
      navigator.serviceWorker.addEventListener('controllerchange', function(){
        if (reloaded) return;
        reloaded = true;
        window.location.reload();
      });
    });
  }
  ```
- [ ] 🔴 **`_headers` wajib untuk cache PWA** <span class="ci-badge badge-mandatory">MANDATORY</span> — `sw.js` yang ter-cache = pengguna **terkunci di versi lama selamanya**. Perhatikan `sw.js`, `manifest.json`, dan `/` **dikecualikan** dari aturan `immutable` kategori 1:
  ```
  /sw.js
    Cache-Control: public, max-age=0, must-revalidate

  /manifest.json
    Content-Type: application/manifest+json; charset=utf-8
    Cache-Control: public, max-age=0, must-revalidate

  /
    Cache-Control: public, max-age=0, must-revalidate

  /*.png
    Cache-Control: public, max-age=31536000, immutable
  ```

**18.6 Pop-up install Chrome + tombol di halaman — keduanya, bukan salah satu**

> **🔴 KOREKSI v1.9 — aturan v1.8 pada bagian ini SALAH dan sudah diganti.**
> v1.8 menginstruksikan memanggil `e.preventDefault()`. Jangan lakukan itu.

Pertanyaan yang sering muncul di lapangan: *"kenapa situs lain punya banner install otomatis, PWA saya tidak?"* Jawabannya satu baris kode:

```js
window.addEventListener('beforeinstallprompt', function(e){
  e.preventDefault();   // <-- INI yang mematikan banner Chrome
  ...
});
```

`preventDefault()` adalah cara resmi memberi tahu Chrome *"jangan tampilkan banner install-mu, saya tangani sendiri lewat tombol saya."* Chrome patuh sepenuhnya — banner tidak akan pernah muncul, dan pengguna terpaksa lewat menu titik tiga.

| Perilaku | Banner Chrome | Tombol di halaman |
|---|---|---|
| Pakai `preventDefault()` | ❌ Tidak pernah muncul | ✅ Memicu install |
| **Tanpa `preventDefault()`** | ✅ **Muncul sendiri** | ✅ Tetap jalan, perlu `try/catch` |

**Kenapa keduanya, bukan salah satu:** pengguna awam sering menutup pop-up secara refleks tanpa membaca. Banner memberi jalur cepat untuk yang paham; tombol menangkap sisanya. Menghapus salah satunya berarti kehilangan sebagian pengguna.

- [ ] **🔴 JANGAN panggil `e.preventDefault()`** — cukup simpan event-nya. Ini yang membuat banner Chrome muncul sendiri.
- [ ] **Bungkus `prompt()` dengan `try/catch`** — kalau banner Chrome sudah memakai event itu lebih dulu, `prompt()` melempar `InvalidStateError`. Tanpa `try/catch`, tombol jadi mati diam-diam.
- [ ] **Tangkap `beforeinstallprompt`**, simpan, panggil `prompt()` saat tombol ditekan.
- [ ] **Kalau event tidak muncul dalam ~3 detik, tetap tampilkan tombol** — isinya petunjuk manual, dibedakan antara iOS dan Android.
- [ ] **Setelah `outcome === 'accepted'`, tunggu event `appinstalled` ~9 detik.** Kalau tidak menyala, beri tahu pengguna bahwa yang terbentuk **kemungkinan pintasan**, beserta langkah bersih-bersihnya (18.7).
- [ ] **Sembunyikan tombol kalau `display-mode` sudah `standalone`.**
  ```js
  var installBtn = document.getElementById('installBtn');
  var deferredPrompt = null, installed = false;

  function isInstalled(){
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }

  // TANPA preventDefault -> Chrome menampilkan bannernya sendiri,
  // dan kita tetap menyimpan event-nya sebagai cadangan untuk tombol.
  window.addEventListener('beforeinstallprompt', function(e){
    deferredPrompt = e;
    installBtn.hidden = false;
  });

  // Chrome menahan prompt -> tetap tampilkan tombol, isinya petunjuk manual
  setTimeout(function(){
    if (!deferredPrompt && !isInstalled()) installBtn.hidden = false;
  }, 3000);

  window.addEventListener('appinstalled', function(){
    installed = true;                    // hanya menyala untuk install SUNGGUHAN
    installBtn.hidden = true;
  });

  if (isInstalled()) installBtn.hidden = true;

  installBtn.addEventListener('click', function(){
    if (deferredPrompt){
      // Kalau banner Chrome sudah memakai event ini lebih dulu,
      // prompt() melempar InvalidStateError -> jatuh ke petunjuk manual.
      try { deferredPrompt.prompt(); }
      catch (err) { deferredPrompt = null; tampilkanPetunjukManual(); return; }

      deferredPrompt.userChoice.then(function(res){
        deferredPrompt = null;
        if (res.outcome !== 'accepted') return;
        // Kalau 'appinstalled' tidak menyala dalam ~9 detik,
        // besar kemungkinan yang terbentuk pintasan, bukan aplikasi.
        setTimeout(function(){
          if (!installed && !isInstalled()) tampilkanPeringatanPintasan();
        }, 9000);
      });
      return;
    }
    tampilkanPetunjukManual();   // bedakan iOS vs Android
  });
  ```
- [ ] **Utamakan tombol di halaman daripada menu ⋮ Chrome.** `prompt()` adalah jalur install resmi — **tidak punya opsi pintasan sama sekali**. Menu ⋮ Chrome memunculkan dialog kedua di mana pengguna bisa salah memilih "Create shortcut".
- [ ] **Sadari batas kendali kita: banner Chrome tunduk pada Site Engagement Score.** Chrome diam-diam menghitung seberapa sering dan lama sebuah situs dipakai, lalu menawarkan install setelah ambang tertentu terlampaui. Artinya banner **tidak selalu muncul di kunjungan pertama**, dan tidak ada cara memaksanya lewat kode. *Konsekuensi praktis:* saat menulis instruksi untuk pengguna (WhatsApp, manual, handover), **sebut tombol di halaman sebagai cara utama** dan banner sebagai bonus — jangan sebaliknya, supaya tidak ada yang menunggu banner yang belum tentu datang.
- [ ] **Tombol install memenuhi target sentuh** kategori 8/14 (44–48px untuk elemen sentuh utama).

**18.12 🔴 Service Worker mewarisi CSP — aset lintas domain akan diblokir**

> Ditemukan 6 Sep 2026 pada PWA nyata. **Gagal dalam diam**: tidak ada pesan "CSP violation", hanya `net::ERR_FAILED` yang terlihat seperti gangguan jaringan biasa.

Aturan `/*` di `_headers` menempel ke **semua respons**, termasuk respons `sw.js`. Service Worker lalu menjalankan skripnya di bawah CSP itu — sehingga `connect-src` membatasi `fetch()` **yang dipanggil dari dalam Service Worker**, bukan hanya `fetch()` dari halaman.

Rantai kegagalannya:

```
Aturan /* di _headers menempel juga ke sw.js
  -> sw.js mewarisi CSP connect-src 'self'
  -> fetch() DARI DALAM Service Worker ke domain luar diblokir
  -> .catch() di fetch handler mengembalikan undefined
  -> merespons dengan undefined = net::ERR_FAILED
```

Pada kasus nyata, seluruh stylesheet Google Fonts gagal dimuat. Buktinya di Chrome DevTools: `font-face` termuat = **0**, dan hanya stylesheet inline yang masuk. Halaman memakai font bawaan sistem selama berhari-hari **tanpa ada yang menyadari**, karena tampilannya tetap "wajar" — hanya bukan font yang dimaksud.

- [ ] **🔴 Self-host semua aset kritis pada PWA — font, ikon, logo.** Untuk PWA ini bukan lagi rekomendasi seperti di kategori 1, melainkan **wajib**. Aset dari CDN pihak ketiga akan diblokir oleh CSP yang ketat, dan lebih buruk lagi: **tidak jalan saat offline**, padahal offline adalah alasan utama membuat PWA.
- [ ] **Masukkan berkas font ke `PRECACHE`** supaya ikut tersimpan dan benar-benar jalan offline.
- [ ] **Setelah self-host, perketat CSP-nya** — `style-src` dan `font-src` tidak lagi perlu domain luar. Self-host membuat CSP lebih ketat, bukan lebih longgar:
  ```
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  ```
- [ ] **Pakai variable font kalau tersedia** — satu berkas untuk seluruh rentang weight. Pada kasus nyata Montserrat 400–700 cukup **satu berkas 37 KB**, bukan empat berkas terpisah. Periksa dengan membandingkan URL `woff2` di CSS Google Fonts: kalau semua weight menunjuk berkas yang sama, itu variable font dan boleh dideklarasikan `font-weight: 400 700`.
  ```css
  @font-face{
    font-family:'Montserrat';
    font-style:normal;
    font-weight:400 700;          /* rentang, bukan satu nilai */
    font-display:swap;
    src:url('/assets/fonts/montserrat-latin-var.woff2') format('woff2');
    unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,
      U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,
      U+2212,U+2215,U+FEFF,U+FFFD;
  }
  ```
  ⚠️ Kalau ternyata berkasnya **berbeda per weight**, itu font statis — jangan pakai rentang `400 700`, karena browser akan memalsukan tebal (*faux bold*) dan hasilnya jelek.
- [ ] **Preload font dengan `crossorigin`** — atribut ini tetap wajib walaupun font-nya satu domain, karena permintaan font selalu bermode CORS:
  ```html
  <link rel="preload" href="/assets/fonts/nama-font.woff2" as="font" type="font/woff2" crossorigin>
  ```

**18.7 🔴 Aplikasi vs Pintasan — beda besar**

| | Aplikasi (WebAPK) | Pintasan |
|---|---|---|
| Ikon | Bersih | **Ada lambang Chrome kecil** |
| Address bar saat dibuka | Tidak ada | **Ada** |
| Splash screen | Ada | Tidak ada |
| `display-mode: standalone` | `true` | `false` |

- [ ] 🔴 **Penanda `display-mode` terpasang di halaman** <span class="ci-badge badge-mandatory">MANDATORY</span> — supaya hasil install bisa **dipastikan tanpa menebak**. Buka aplikasi dari ikon di layar utama, lihat penanda itu: **ini bukti definitif**, sejalan dengan aturan 8.4 Standar Coding (jangan asumsikan kondisi nyata yang tidak bisa dilihat).
  ```js
  var app = window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
  document.getElementById('runMode').textContent = app ? '· aplikasi' : '· browser';
  ```
- [ ] **Kalau hasilnya pintasan — urutan bersih-bersih (langkah 2 & 3 paling sering terlewat):**
  1. Hapus ikon dari layar utama — pilih **Uninstall**, bukan *Remove*
  2. Chrome → ⋮ → **Settings → Site settings** → situs tersebut → **Delete**
  3. **Tutup Chrome dari recent apps**
  4. Buka situsnya lagi, tunggu ~10 detik sambil scroll
  5. Tekan tombol install, pilih **Install** (bukan *Create shortcut*)
- [ ] **Kalau tetap gagal:** buka `chrome://webapks` di HP — halaman itu menampilkan WebAPK yang terdaftar beserta status kegagalannya.

**18.8 Cara install untuk pengguna akhir (masukkan ke manual/handover)**

| Platform | Cara |
|---|---|
| **Android** | Tekan tombol install di halaman. Kalau tidak muncul: ⋮ → *Install and create shortcut* → pilih **Install** |
| **iPhone** | Safari → tombol Bagikan ⬆️ → **Add to Home Screen** → **Add** |

- [ ] **iOS tidak punya prompt install otomatis dan tidak mendukung `beforeinstallprompt`** — selalu manual lewat Safari. **Chrome di iOS tidak bisa.** Sebutkan ini eksplisit saat handover (sejalan aturan 8.10 Standar Coding: langkah manual wajib disebut mencolok).

**18.9 Catatan Cloudflare Pages untuk PWA**

- [ ] **Tidak ada tombol Purge Cache untuk domain `*.pages.dev`** — dan memang tidak dibutuhkan; setiap upload membuat deployment baru.
- [ ] **Kalau tampilan tidak berubah setelah upload, penyebabnya cache di HP** (Service Worker / data aplikasi), **bukan Cloudflare**. Jangan buang waktu mencari tombol purge.
- [ ] **`_headers` wajib di root folder deploy**, nama persis `_headers` tanpa ekstensi. Salah taruh → **diabaikan diam-diam, tanpa pesan error**.
- [ ] **Format `_headers`:** pola path di kolom 0, header menjorok **2 spasi**.

**18.10 Checklist verifikasi PWA sebelum menyerahkan**

```
[ ] HTTPS aktif
[ ] manifest.json: nol `id` berquery, nol `?v=` di URL ikon, path absolut
[ ] Content-Type manifest = application/manifest+json
[ ] Ikon 192 & 512 PNG, HTTP 200, terbukti valid (chunk + CRC)
[ ] Ikon maskable: konten <= 80% kanvas (60-65% kalau ada teks)
[ ] sw.js punya fetch handler, HTML network-first, CACHE_VERSION dinaikkan
[ ] sw.js Cache-Control must-revalidate
[ ] apple-touch-icon + apple-touch-startup-image untuk iOS
[ ] Uji ambil manifest & ikon dengan beberapa User-Agent (cek pemblokiran bot)
[ ] Penanda display-mode terpasang di halaman
[ ] Uji install nyata di Android DAN iPhone — jangan hanya desktop
[ ] JANGAN ada e.preventDefault() pada beforeinstallprompt   <-- mematikan
    banner install bawaan Chrome (18.6)
[ ] DevTools > Network: NOL resource ERR_FAILED — kegagalan aset pada PWA
    sering senyap, tanpa pesan CSP (18.12)
[ ] Font di-self-host, masuk PRECACHE, font-src 'self' (18.12)
```

**18.11 Prompt siap pakai untuk AI coding assistant**

> Salin blok di bawah saat memulai project PWA baru (dipakai bersama aturan Bagian 8 `Standar_Coding_*.md`).

```
Buatkan PWA yang bisa dipasang di Android dan iOS. Ikuti aturan berikut —
semuanya lahir dari kegagalan nyata, jangan disederhanakan:

MANIFEST
- Sediakan manifest.json dengan: name, short_name, start_url "/", scope "/",
  display "standalone", background_color, theme_color.
- JANGAN sertakan field "id". Kalau terpaksa, jangan pernah pakai query string
  di dalamnya — itu membuat pembuatan WebAPK gagal dan install jadi pintasan.
- Path ikon harus ABSOLUT (/assets/...), dan JANGAN pakai query string "?v="
  pada URL ikon. Untuk cache-busting, ganti nama file.
- Sertakan 3 ikon: 192 any, 512 any, 512 maskable. Semua PNG.
- Set Content-Type manifest ke application/manifest+json lewat _headers.

IKON
- Latar solid sama dengan background_color, jangan transparan.
- Ikon maskable: konten maksimal 80% kanvas (60-65% kalau logo ada teksnya),
  karena Android memotongnya jadi lingkaran.
- Pastikan PNG benar-benar standar (chunk + CRC valid).

SPLASH SCREEN
- Android 12+ memakai IKON APLIKASI sebagai splash — tidak bisa dibedakan.
  Jangan janjikan splash berbeda dari ikon di Android.
- iOS butuh file terpisah lewat apple-touch-startup-image per ukuran layar.
  Sediakan minimal 6 ukuran iPhone umum.
- Durasi splash tidak bisa diatur, ditentukan sistem operasi.

FONT & ASET
- Self-host semua aset kritis (font, ikon, logo). JANGAN dari CDN pihak ketiga.
  CSP connect-src 'self' ikut menempel ke sw.js dan memblokir fetch lintas
  domain DARI DALAM Service Worker — stylesheet CDN gagal dengan ERR_FAILED
  tanpa pesan CSP, dan halaman diam-diam memakai font bawaan sistem.
- Masukkan berkas font ke PRECACHE agar ikut jalan offline.
- Pakai variable font kalau tersedia (satu berkas untuk seluruh rentang weight).
- Preload font dengan atribut crossorigin, walau font-nya satu domain.

SERVICE WORKER
- Wajib punya fetch handler.
- HTML: network-first. Aset: cache-first.
- CACHE_VERSION sebagai konstanta, hapus cache lama saat activate.
- Dengarkan pesan SKIP_WAITING; di halaman, kirim SKIP_WAITING saat versi baru
  terdeteksi lalu reload sekali (dengan guard anti-loop).
- Set sw.js Cache-Control: max-age=0, must-revalidate di _headers.

TOMBOL INSTALL
- JANGAN panggil e.preventDefault() pada beforeinstallprompt — itu mematikan
  banner install bawaan Chrome sehingga pengguna terpaksa lewat menu titik tiga.
  Cukup simpan event-nya.
- Tangkap beforeinstallprompt, panggil prompt() saat tombol ditekan, BUNGKUS
  dengan try/catch: kalau banner Chrome sudah memakai event itu, prompt()
  melempar InvalidStateError dan tombol jadi mati diam-diam.
- Kalau event tidak muncul dalam 3 detik, tetap tampilkan tombol berisi
  petunjuk manual (bedakan iOS dan Android).
- Setelah outcome 'accepted', tunggu event appinstalled ~9 detik. Kalau tidak
  menyala, beri tahu pengguna bahwa yang terbentuk kemungkinan pintasan,
  beserta langkah bersih-bersihnya.
- Sembunyikan tombol kalau display-mode sudah standalone.

VERIFIKASI
- Buka DevTools > Network dan pastikan NOL resource ERR_FAILED sebelum
  menyatakan selesai. Kegagalan aset pada PWA sering senyap.
- Tampilkan penanda di halaman: "aplikasi" kalau display-mode standalone,
  "browser" kalau tidak. Ini bukti definitif hasil install.
- Sebelum menyerahkan: uji ambil manifest dan ikon dengan beberapa
  User-Agent untuk memastikan tidak ada pemblokiran bot.
```

---

### 19. Standar Login Page — Split Layout *(kategori baru v1.8)*
> *Reasoning:* sebelum v1.8, login page hanya diatur sepotong di Blueprint E (standar PIN: panjang digit, `inputmode`, rate limit, validasi server-side) — semuanya soal **keamanan**, tidak ada satu pun soal **layout & tampilan**. Akibatnya setiap aplikasi ber-login dibuat dari nol dengan tata letak berbeda-beda meski dari satu rumah yang sama. Kategori ini dilebur dari `missfish-login-standard.md` v1.0 dan dinaikkan jadi standar umum. **Pola pemisahannya sama persis dengan Blueprint B.4 (hero):** *struktur* wajib identik di semua project, *palet warna & font* menyesuaikan identitas project yang dikerjakan (sejalan rule umum kategori 15 "logo mengikuti project").

**19.1 Struktur — WAJIB sama di semua project**

```
┌─────────────────────────────┬──────────────────┐
│                             │                  │
│       LEFT PANEL            │   RIGHT PANEL    │
│         65–70%              │     30–35%       │
│                             │                  │
│  Visual/Ilustrasi           │  [Logo]          │
│  (berbeda per aplikasi)     │  App Title       │
│  Background gelap solid     │  Welcome back    │
│                             │  Subtitle        │
│  + Quote / Tagline          │  [Email]         │
│    (opsional)               │  [Password/PIN]  │
│                             │  Forgot password │
│                             │  [Sign In]       │
│                             │  Footer note     │
│                             │                  │
└─────────────────────────────┴──────────────────┘
```

- [ ] **Split layout: visual di kiri, form di kanan** <span class="ci-badge badge-mandatory">MANDATORY</span> — form **selalu di kanan**, tidak dipindah ke tengah atau kiri. Panel kiri boleh berbeda visualnya per aplikasi; panel kanan **selalu konsisten**.
- [ ] **Urutan elemen panel kanan tidak boleh diubah:** Logo → App Title → "Welcome back" → Subtitle → Error slot → Input Email → Input Password/PIN → Forgot password → Tombol Sign In → Footer note.
- [ ] **Rasio & responsive:**

  | Breakpoint | Perilaku |
  |---|---|
  | **Desktop** | Split 65/35 |
  | **Tablet** (≤1024px) | Split 55/45 |
  | **Mobile** (≤768px) | Panel kiri **hidden**, form full screen |

- [ ] **Panel kiri wajib `display:none` di mobile** — jangan dipaksa tampil (memakan tinggi layar, mendorong form ke bawah lipatan). Karena panel kiri hilang di mobile, **dilarang menaruh informasi fungsional di sana** (instruksi login, kontak admin, tautan penting) — isinya harus murni dekoratif/motivasional.
- [ ] **Divider tipis di tepi kanan panel kiri** — gradient transparan → `rgba(255,255,255,.1)` → transparan, bukan garis solid.

**19.2 Palet & tipografi — menyesuaikan project**

> Struktur di 19.1 wajib. Nilai warna & font di bawah adalah **default Miss Fish** (black luxury) — dipakai apa adanya untuk project Miss Fish, dan **diganti mengikuti identitas project** untuk project lain, persis seperti aturan gradient hero Blueprint B.4.

- [ ] **Token warna didefinisikan sebagai variabel CSS**, bukan hex yang bertebaran di banyak selector:
  ```css
  :root {
    --black:       #0A0A0A;   /* background utama & panel kiri */
    --black2:      #0F0F0F;   /* background panel kanan */
    --black3:      #1C1C1E;   /* background input */
    --gold:        #C9A05A;   /* aksen utama */
    --gold2:       #D4AF6E;   /* aksen terang, untuk gradient tombol */
    --border:      #2C2C2E;   /* border input */
    --muted:       #8E8E93;   /* subtitle */
    --placeholder: #636366;   /* placeholder input */
    --red:         #FF3B30;   /* error */
  }
  ```
- [ ] **Yang WAJIB dipertahankan lintas project, apa pun paletnya:**
  - Kedua panel berlatar **gelap** (jangan panel kiri terang, kanan gelap — atau sebaliknya).
  - **Satu warna aksen** dipakai konsisten untuk: App Title, border input saat `:focus`, tautan "Forgot password", dan gradient tombol Sign In. Jangan pakai dua aksen berbeda di satu halaman login.
  - **Font judul serif** (default `Georgia, serif`) vs **font UI sans-serif** (`-apple-system, 'Helvetica Neue', Arial`) — kontras dua jenis huruf ini bagian dari identitas, jangan disamakan jadi sans-serif semua.
  - `border-radius` input & tombol **12px**.
- [ ] **Tipografi acuan:**

  | Elemen | Font | Size | Weight | Warna |
  |---|---|---|---|---|
  | App Title | serif | 30px | 700 | `--gold` |
  | Welcome back | serif | 30px | 700 | `#fff` |
  | Subtitle | sans-serif | 14px | 400 | `--muted` |
  | Input | sans-serif | 15px | 400 | `#fff` |
  | Tombol | sans-serif | 15px | 700 | `--black` |
  | Forgot password | sans-serif | 13px | 400 | `--gold` |
  | Footer note | sans-serif | 11.5px | 400 | `--placeholder` |

- [ ] 🔴 **Setiap pasangan warna teks/latar di atas wajib diverifikasi kontras 4,5:1** (kategori 8) saat paletnya diganti per project — jangan asumsikan aksen baru otomatis lolos hanya karena default-nya lolos. Aksen terang di atas latar gelap paling sering meleset. Tulis rasio terukurnya sebagai komentar di baris token warnanya, sesuai pola kategori 13.

**19.3 CSS acuan (panel kanan — form)**

```css
/* ── PAGE WRAPPER ── */
.login-page { display: flex; min-height: 100vh; background: var(--black); }

/* ── LEFT PANEL ── */
.login-left {
  flex: 0 0 65%; position: relative;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding: 56px 64px; overflow: hidden; background: var(--black);
}
.login-divider {
  position: absolute; top: 0; right: 0; bottom: 0; width: 1px;
  background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent);
}
.login-quote-wrap { position: relative; z-index: 2; }
.login-quote-label {
  font-size: 10px; font-weight: 700; letter-spacing: 4px;
  text-transform: uppercase; color: var(--gold); margin-bottom: 20px;
}
.login-quote-text {
  font-family: Georgia, serif; font-size: clamp(26px, 3vw, 44px);
  font-weight: 700; color: #fff; line-height: 1.25;
  max-width: 560px; margin-bottom: 20px;
}
.login-quote-author {
  font-size: 13px; font-weight: 500;
  color: rgba(255,255,255,0.4); letter-spacing: 1px;
}

/* ── RIGHT PANEL ── */
.login-right {
  flex: 0 0 35%; display: flex; flex-direction: column;
  justify-content: center; align-items: center;
  padding: 48px 36px; background: var(--black2); position: relative;
}
.login-logo { width: 220px; margin-bottom: 20px; object-fit: contain; }
.login-app-title {
  font-family: Georgia, serif; font-size: 30px; font-weight: 700;
  color: var(--gold); margin-bottom: 20px; text-align: center; line-height: 1.2;
}
.login-title {
  font-family: Georgia, serif; font-size: 30px; font-weight: 700;
  color: #fff; margin: 0 0 10px; text-align: center;
}
.login-subtitle { font-size: 14px; color: var(--muted); margin: 0 0 32px; text-align: center; }
.login-form { width: 100%; max-width: 380px; }

.login-field {
  width: 100%; padding: 15px 16px; border-radius: 12px;
  background: var(--black3); border: 1.5px solid var(--border);
  color: #fff; font-size: 15px; outline: none; text-align: left;
  transition: border-color .2s; margin-bottom: 12px;
  font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; display: block;
}
.login-field::placeholder { color: var(--placeholder); }
.login-field:focus { border-color: var(--gold); }

.login-error { font-size: 13px; color: var(--red); margin-bottom: 10px; display: none; }

.login-forgot-row { display: flex; justify-content: flex-end; margin: -4px 0 20px; }
.login-forgot { font-size: 13px; color: var(--gold); cursor: pointer; }

.login-btn {
  width: 100%; padding: 15px; border-radius: 12px; border: none;
  background: linear-gradient(135deg, var(--gold), var(--gold2));
  color: var(--black); font-weight: 700; font-size: 15px;
  cursor: pointer; transition: opacity .2s;
  font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif; display: block;
}
.login-btn:hover { opacity: .87; }
.login-btn:disabled { opacity: .6; cursor: default; }

.login-note {
  margin-top: 28px; font-size: 11.5px; color: var(--placeholder);
  text-align: center; line-height: 1.7;
}

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .login-left  { flex: 0 0 55%; padding: 40px 48px; }
  .login-right { flex: 0 0 45%; }
}
@media (max-width: 768px) {
  .login-left  { display: none; }
  .login-right { flex: 1; }
}
```

> ⚠️ **Catatan width (kategori 1):** `max-width: 380px` pada `.login-form` adalah **pengecualian yang sah** dari larangan `max-width` angka tetap. Larangan itu menyasar container & elemen teks di halaman guide/dashboard/brief yang harus bisa memanfaatkan lebar layar; form login justru **wajib** dibatasi supaya field tidak melar tak terbaca di layar lebar. Pengecualian ini **hanya** berlaku untuk `.login-form`, bukan untuk `.login-right` atau elemen teks lain.

**19.4 HTML acuan**

```html
<div class="login-page">

  <!-- LEFT PANEL: ganti visual sesuai aplikasi -->
  <div class="login-left">
    <!-- Visual / Canvas / Ilustrasi di sini -->
    <div class="login-quote-wrap">
      <div class="login-quote-label">Today's Thought</div>
      <div class="login-quote-text">"Quote of the day..."</div>
      <div class="login-quote-author">— Author</div>
    </div>
    <div class="login-divider"></div>
  </div>

  <!-- RIGHT PANEL: selalu sama -->
  <div class="login-right">

    <!-- Logo versi latar-gelap (kategori 15). Contoh Miss Fish Bali: -->
    <img class="login-logo" width="220" height="80"
      src="https://anabhidev.com/MFB/missfish-logo.webp" alt="Miss Fish Bali">

    <!-- App Title: ganti sesuai nama aplikasi -->
    <div class="login-app-title">IT Realtime Dashboard</div>

    <!-- Heading: selalu sama -->
    <h1 class="login-title">Welcome back</h1>
    <p class="login-subtitle">Sign in to access your dashboard.</p>

    <div class="login-form">
      <div class="login-error" id="login-error">
        Please enter your email and password.
      </div>

      <input class="login-field" type="email" id="login-email"
        placeholder="Email address" autocomplete="username">
      <input class="login-field" type="password" id="login-password"
        placeholder="Password" autocomplete="current-password">

      <div class="login-forgot-row">
        <span class="login-forgot">Forgot password?</span>
      </div>

      <button class="login-btn" onclick="doLogin()">Sign In</button>

      <p class="login-note">
        This system is restricted to authorized personnel only.<br>
        Unauthorized access is prohibited.
      </p>
    </div>

  </div>
</div>
```

**19.5 Panel kiri — varian per aplikasi**

- [ ] **Visual panel kiri dibuat sesuai konteks aplikasi**, bukan disalin antar project:

  | Aplikasi | Visual | Quote |
  |---|---|---|
  | IT Dashboard | Animated particle network + topologi jaringan (canvas: router, workstation, server rack) | Random dari pool, rotate harian |
  | HR / Document Tracker | Abstract luxury pattern + decorative circles | Motivational |
  | *(Aplikasi baru)* | Ilustrasi sesuai konteks aplikasi | Sesuaikan tema |

- [ ] **Latar panel kiri tetap gelap solid**, ornamen/pattern tetap **subtle** (opacity rendah) — panel kiri tidak boleh ramai/colorful sampai bersaing perhatian dengan form.
- [ ] **Animasi canvas menghormati `prefers-reduced-motion`** (kategori 8) — particle network yang terus bergerak wajib berhenti/diam kalau user meminta reduced motion.
- [ ] **Animasi canvas dihentikan saat tab tidak terlihat** (`document.hidden`) — halaman login sering dibiarkan terbuka lama; canvas loop yang jalan terus membakar baterai tanpa ada yang melihat.

**19.6 Aksesibilitas & keamanan login page**

- [ ] **`autocomplete` diisi benar** — `username` / `current-password` pada input (kategori 1, form UX), supaya password manager bekerja.
- [ ] **Untuk login PIN, ikut Blueprint E**: `inputmode="numeric"`, panjang PIN konsisten, `type="password"`, rate limit percobaan gagal, dan **validasi di server** — PIN/password **tidak pernah** dibandingkan sebagai plain text di JavaScript client-side. Kategori ini mengatur **tampilan**; aturan **keamanan** login tetap di Blueprint E dan bagian 7.4 `Standar_Coding_*.md`.
- [ ] **Pesan error tampil di slot `.login-error` yang sudah tersedia**, bukan `alert()` — dan disertai `aria-live="polite"` supaya terbaca screen reader.
- [ ] **Pesan error tidak membocorkan mana yang salah** ("Email atau password salah", bukan "Password salah untuk email ini") — mencegah enumerasi akun.
- [ ] **Tombol Sign In disabled + label berubah saat proses berjalan** — mencegah double submit.
- [ ] **`:focus-visible` terlihat jelas** pada input & tombol (kategori 8) — border aksen saat `:focus` sudah menutup ini untuk input, pastikan tombol juga punya.
- [ ] **Footer note menyebut pembatasan akses** ("restricted to authorized personnel only") — disesuaikan departemen/organisasi project.

**19.7 Checklist aplikasi baru**

Yang **diganti** saat membuat login page baru:

```
[ ] App Title      -> nama aplikasi
[ ] Subtitle       -> konteks aplikasi
[ ] Footer note    -> sesuaikan departemen/organisasi
[ ] Logo           -> logo project, versi LATAR-GELAP (tabel URL resmi kategori 15)
[ ] Panel kiri     -> visual/ilustrasi sesuai konteks
[ ] Quote pool     -> sesuaikan tema (kalau dipakai)
[ ] Token warna    -> palet project, lalu verifikasi ulang kontras 4,5:1
[ ] doLogin()      -> logic autentikasi (validasi tetap server-side)
```

Yang **TIDAK** boleh diubah:

```
[ ] Split layout, form selalu di kanan
[ ] Urutan elemen panel kanan
[ ] Kedua panel berlatar gelap
[ ] Satu warna aksen konsisten (title/focus/link/tombol)
[ ] Kontras judul serif vs UI sans-serif
[ ] border-radius 12px pada input & tombol
[ ] Panel kiri hidden di mobile
```

**19.8 Do's & Don'ts**

| ✅ Do | ❌ Don't |
|---|---|
| Serif untuk judul, sans-serif untuk UI | Samakan semua jadi sans-serif |
| Satu warna aksen konsisten se-halaman | Campur dua aksen berbeda |
| Latar gelap di kedua panel | Panel kiri terang, kanan gelap |
| Form selalu di kanan | Pindahkan form ke tengah/kiri |
| Logo project di atas form | Hilangkan logo |
| Visual kiri subtle (opacity rendah) | Visual kiri ramai/colorful |
| Panel kiri hidden di mobile | Paksa panel kiri tampil di mobile |
| Info fungsional selalu di panel kanan | Taruh instruksi penting di panel kiri |
| Ganti palet mengikuti project | Pakai gold Miss Fish di project klien lain |

---

---

## Alur Kerja Ideal — Performance Sejak Awal Development (Bukan Belakangan)

> Insight dari pengalaman optimasi anabhidev.com (Juni 2026): optimasi yang dilakukan **setelah** situs jadi & live ("perbaikan belakangan") jauh lebih boros waktu dibanding dipikirkan dari awal.

1. **Siapkan semua gambar dalam ukuran final SEBELUM ditaruh di project** — jangan taruh file mentah dulu lalu "nanti dioptimasi". Begitu desain/layout fix, langsung hitung ukuran tampil → resize → compress → baru dimasukkan ke project.
2. **Tulis HTML semantic dari awal** (`<nav>`, `<main>`, `<header>`, `<footer>`, heading `<h1>`–`<h6>` berurutan) — ini sekali jalan benerin SEO + Accessibility + Agentic Browsing sekaligus, lebih mudah dibanding dirapikan belakangan.
3. **Pasang Analytics/GTM di awal, tapi sadari trade-off-nya dari awal juga** — jangan kaget nanti pas cek performance kalau itu jadi kontributor terbesar TBT.
4. **Setiap kali nambah gambar baru ke project**, ulangi langkah hitung-resize-compress dari poin 1 — jangan numpuk "nanti dioptimasi sekalian" di akhir.
5. **Test PageSpeed + GTmetrix secara berkala selama development**, bukan cuma di akhir — supaya kalau ada regresi (skor turun karena perubahan baru), gampang dilacak penyebabnya (perubahan masih sedikit, beda dengan cek di akhir setelah banyak perubahan menumpuk).

## Prinsip Umum — Trade-off yang Perlu Diingat

1. **Skor sempurna ≠ tujuan akhir.** Tujuan akhirnya adalah pengalaman user yang baik. Kalau skor rendah cuma karena simulasi device ekstrim (bukan kondisi rata-rata visitor), itu bukan masalah darurat.
2. **Selalu cek dampak sebelum & sesudah setiap perubahan.** Satu fix bisa memperbaiki satu metric tapi memperburuk metric lain (contoh nyata: defer GTM manual bikin TBT mobile naik drastis, padahal niatnya improve performance).
3. **Pihak ketiga (Analytics, Font, CDN beacon) selalu punya cost.** Tidak semua "unused JavaScript" atau "cache lifetime" warning bisa/harus difix — kadang itu trade-off yang sudah sepadan dengan benefitnya (data analytics, branding font, dll).
4. **Resize gambar = win paling mudah & murah.** Dari semua optimasi, resize+compress gambar yang tepat sasaran biasanya kasih hasil paling nyata dengan effort paling kecil.


# Bagian II — Blueprint per Jenis Project

> Bagian I di atas adalah fondasi wajib yang berlaku untuk semua project apa pun bentuknya. Bagian II ini konteks tambahan spesifik per jenis output — dipakai sebagai patokan arah desain & struktur, bukan pengganti Bagian I. Setiap project baru: cek Bagian I dulu (fondasi), lalu blueprint yang relevan di bawah untuk konteks jenisnya.

## A. Company Profile / Marketing / Personal Brand Portfolio

**Patokan referensi:** struktur `index-v2.html` (redesign anabhidev.com).

**Kenapa jadi patokan:** dari semua file yang sudah dibuat, ini yang paling lengkap secara teknis — `data-en`/`data-id` seimbang persis 109:109, schema `@graph` 4-tipe lengkap (`WebSite` + `Person` + `ProfessionalService` + `ItemList`/`Offer`), band alternating dark/light rapi, canonical/OG/h1 semua ada.

- [ ] **Struktur band alternating** — `.band-dark` / `.band-light` bergantian per section, bukan flat satu warna sepanjang halaman. *Reasoning:* memberi ritme visual dan membantu mata membedakan batas antar section tanpa perlu border tebal.
- [ ] **Section umum untuk profile/marketing:** hero (headline + CTA) → credibility/social proof (logo klien, angka pencapaian) → services/produk → cara kerja/proses → testimoni → CTA penutup → footer dengan info kontak lengkap.
- [ ] **Token warna bernama jelas** di `:root` — jangan hex code langsung tersebar di banyak tempat; satu sumber kebenaran untuk tiap warna brand, termasuk varian gelap/terang untuk kontras (lihat kategori 8 Bagian I).
- [ ] **`@graph` 4-tipe minimal** untuk personal brand (lihat kategori 2/3 Bagian I) — terutama `Person` untuk visibilitas di AI search.
- [ ] Untuk versi bilingual satu file: pakai pola `data-en`/`data-id` konsisten di semua elemen teks, validasi jumlahnya seimbang sebelum ship (lihat kategori 9 & 11 Bagian I).

## B. Web Interactive / Interactive Product Brief

**Patokan referensi:** struktur **`AnabhiDev-AM_v2_3.html`** (ARVENAA Meals) *(v1.3 — diganti dari `Master-Brief.html`)*.
**Catatan soal patokan ini:** file ini sudah bersih dari awal — token warna dengan komentar rasio kontras eksplisit per baris, hero gradient dengan warna teks konstan (tidak perlu 2 set warna hero per mode), skip link, print stylesheet, scrollspy `IntersectionObserver`, fokus otomatis ke drawer. Tidak ada catatan "perlu diperbaiki dulu sebelum dicontoh" seperti patokan versi sebelumnya — pakai apa adanya sebagai baseline.

**Istilah:** kategori ini disebut **"Web Interactive"** dalam percakapan sehari-hari, apa pun isi kontennya — bisa product brief, dokumentasi, SOP interaktif, atau knowledge base. Jangan memberi nama kategori berdasarkan nama file contoh tertentu (dulu sempat disebut "Master Brief" karena nama file, ini keliru — nama file bukan nama kategori).

**JANGAN dijadikan patokan struktur (walau boleh dipakai untuk hal lain, misal referensi bug yang harus dihindari):**
- `MissFishLMS_CourseGuide_v2_1.html` — bug `max-width` yang membuat konten mentok di tengah, menyisakan ruang kosong besar di layar lebar.
- `Master-Brief_1_1.html` — `.wrap{max-width:1120px}`, pelanggaran mandatory kategori 1.
- `Master-Brief.html` (versi v1.2) — benar di level container, tapi masih menyisakan `p{max-width:78ch}`/`ul,ol{max-width:78ch}` yang melanggar mandatory kategori 1. Sudah digantikan sepenuhnya oleh `AnabhiDev-AM_v2_3.html` yang tidak punya masalah ini dari awal.
- `HoL_preview.html` — `max-width` tetap pada beberapa elemen teks (`.hero-description{max-width:850px}`), dan hamburger + judul sama-sama di kiri (lihat kategori 14).

### B.1 — Layout & Width (fondasi)
- [ ] **Ikuti ATURAN WIDTH MANDATORY kategori 1 secara penuh** — tanpa `max-width` px/ch sama sekali pada container maupun elemen teks. Batasi lebar hanya lewat `padding` container sesuai formula `clamp(24px,6vw,180px)`.
- [ ] **Topbar terpisah dari sidebar** — topbar tipis (~58px) full-width paling atas berisi judul halaman + tombol aksi (theme, print, hamburger), sidebar mulai di bawah topbar, bukan digabung jadi satu blok sidebar-atas seperti pola lama. Lihat `.topbar` di `AnabhiDev-AM_v2_3.html`.
- [ ] **Layout sidebar sticky + konten scrollable** — sidebar `position: fixed` dari bawah topbar sampai bawah layar, area konten (`#main`) `grid-column`/`margin-left` selebar sidebar.
- [ ] **Section numbering** — nomor urut di depan judul section (01, 02, 03...) membantu orientasi di dokumen panjang.
- [ ] **`.grid-safe > * { min-width: 0; }`** pada semua elemen grid/flex turunan langsung — mencegah anak grid menolak mengecil dan memicu horizontal scroll (lihat kategori 1).

### B.2 — Navigasi & Aksesibilitas
- [ ] **Skip link wajib** — `<a href="#main" class="sr-only">Lompat ke konten utama</a>` sebagai elemen pertama di `<body>` (lihat kategori 14).
- [ ] **Jump navigation dengan scrollspy `IntersectionObserver`** — daftar section di sidebar dengan `href="#id-section"`, highlight item aktif otomatis sesuai kategori 14 (bukan `scroll` event manual), setiap target section punya `scroll-margin-top`.
- [ ] **Drawer mobile lengkap sesuai kategori 14** — hamburger kanan/judul kiri, `Esc` menutup drawer & modal, fokus otomatis ke item nav pertama saat dibuka, fokus kembali ke hamburger saat ditutup, `100dvh`, touch target 44×44px.

### B.3 — Bahasa & Tema
- [ ] **Bahasa: default bilingual satu-teks** (lihat kategori 9) — istilah teknis English, penjelasan Indonesia, tanpa toggle. Toggle EN/ID hanya kalau diminta eksplisit, ditaruh di header sesuai posisi pada kategori 14.
- [ ] **Dark/light mode wajib** (lihat kategori 13) — token warna dengan **komentar rasio kontras eksplisit per baris** (contoh: `--teal:#056268; /* varian gelap: kontras 6,7:1 di atas putih */`), toggle di topbar, posisi mengikuti kategori 14.

### B.4 — Hero (struktur WAJIB, warna fleksibel per project)
> *Reasoning:* struktur di bawah ini wajib sama untuk semua project Blueprint B — yang boleh berbeda **hanya nilai warna (color palette)** gradiennya, disesuaikan brand/project yang sedang dikerjakan. Ini bukan soal selera visual, tapi soal menghindari bug kontras yang sudah pernah terjadi (hero yang warnanya ikut berubah per light/dark mode memerlukan 2 set warna teks yang gampang lolos tanpa diuji salah satu modenya).
- [ ] **Grid 2 kolom** — kolom kiri berisi copy (pill/eyebrow, judul besar, sub-judul, deskripsi, CTA, tag pills), kolom kanan berisi card logo. Di breakpoint mobile, grid jadi 1 kolom dan card logo pindah ke atas (`order:-1`) sebelum copy.
  ```css
  .hero{ display:grid; grid-template-columns:1.1fr .9fr; gap:30px; padding:66px; }
  @media (max-width:1050px){ .hero{ grid-template-columns:minmax(0,1fr); } .hero-art{ order:-1; } }
  ```
- [ ] **Background gradient gelap solid, TIDAK ikut berubah per light/dark mode** — gradient dipilih dari palette project (contoh ARVENAA: `linear-gradient(135deg,#185a84 0%,#1d7198 52%,#177f9b 100%)`), sehingga warna teks di atasnya (putih, cyan aksen, gold aksen) tetap konstan dan tidak perlu diverifikasi ulang kontrasnya di kedua mode — cukup sekali karena background-nya tidak pernah berubah.
- [ ] **Card logo putih terpisah di kolom kanan** — bukan logo polos mengambang. Card putih dengan padding, border-radius, dan shadow, isinya logo project (lihat kategori 15 soal sumber logo — project apa yang dikerjakan menentukan logo mana yang dipasang di sini).
  ```css
  .hero-logo-frame{ width:min(100%,390px); aspect-ratio:1122/1243; background:#fff;
    border-radius:20px; padding:16px; box-shadow:0 20px 45px rgba(0,0,0,.18); }
  ```
- [ ] **Elemen copy hero minimal:** pill/eyebrow kecil (status atau kategori produk), judul besar 2 baris dengan baris kedua warna aksen berbeda, sub-judul kutipan/tagline, 1 paragraf deskripsi singkat, 2 tombol CTA (primer solid + sekunder outline), baris tag pills kecil di bawah CTA.
- [ ] **Logo terpasang di 2 titik** (sidebar kecil transparan ~100-115px + hero card putih besar) sesuai kategori 15 — sumber logo ditentukan oleh project yang dikerjakan.

### B.5 — Cetak & Ekspor
- [ ] **Print stylesheet wajib** (`@media print`, lihat kategori 14) — sembunyikan topbar/sidebar/tombol aksi/modal, layout jadi single-column, `section { break-inside: avoid; }`.
- [ ] **Tombol print/PDF eksplisit di topbar** — `onclick="window.print()"`, jangan mengandalkan pengguna tahu shortcut keyboard.

## C. Digital Name Card / vCard

**Patokan referensi:** `wibawa.html`, pola `index-*.html` (digital name card versi lain).

- [ ] **Struktur minimal** — foto/logo, nama, jabatan, 1-2 CTA utama (WhatsApp, simpan kontak), daftar link sosial/portfolio.
- [ ] **Mobile-first murni** — mayoritas dibuka dari HP setelah scan QR code atau share link, desktop adalah kasus sekunder.
- [ ] **vCard/QR code** — sediakan tombol "Simpan Kontak" yang generate file `.vcf`, atau tampilkan QR code yang mengarah ke link kartu itu sendiri.
- [ ] **Loading harus sangat cepat** — ini sering diakses di kondisi jaringan tidak ideal (venue acara, pameran); minimalkan aset, hindari font custom berat kalau tidak esensial.

## D. Online Shop / E-commerce

**Patokan referensi fitur & UX:** `kanaka-gadget-template22-v6.html` (full — katalog, keranjang, checkout, admin) untuk pola fitur yang lengkap; `kanaka-gadget-mockup-v11__7_.html` untuk versi ringan/compro tanpa detail produk mendalam.

> **Catatan status:** kedua file Kanaka ini adalah **mockup fitur & UX**, teknisnya (SEO, schema, keamanan) belum digarap — memang belum ada tujuan komersial ke arah situ. Dipakai di sini murni sebagai referensi pola fitur, bukan patokan kualitas teknis siap-deploy. Kalau nanti dikembangkan jadi toko sungguhan, checklist di bawah wajib dipenuhi terlebih dulu.

- [ ] **Fitur inti dari referensi Kanaka:** katalog produk dengan filter/kategori, keranjang belanja, alur checkout, panel admin untuk kelola produk/stok, integrasi WhatsApp untuk konfirmasi order.
- [ ] **Sebelum live — wajib ditambahkan (belum ada di file referensi):**
  - [ ] Schema `Product` + `Offer` per item produk — tanpa ini, produk tidak akan muncul di rich result Google Shopping/Search.
  - [ ] Canonical URL + Open Graph per halaman produk — tanpa OG, share link produk ke WhatsApp/social media tidak ada preview gambar/harga.
  - [ ] **Ganti semua inline `onclick`/`onchange` ke event listener di file JS eksternal** — file referensi punya puluhan inline handler, ini menutup opsi CSP ketat (lihat kategori 4 & 11 Bagian I).
  - [ ] Persistensi keranjang lewat `localStorage` — supaya isi keranjang tidak hilang saat pengguna refresh halaman.
  - [ ] Halaman kebijakan wajib: Privacy Policy, Terms of Service, Kebijakan Retur/Refund (lihat kategori 8 Bagian I) — untuk toko online ini bukan opsional, terutama kalau menerima pembayaran online.
  - [ ] Validasi input form checkout di sisi server, bukan cuma client-side (lihat kategori 4 Bagian I).

## E. Dashboard dengan Login PIN

**Patokan referensi:** `MF-AIA_v2_10.html` — token desain paling rapi dan konsisten dari semua file yang ada.

- [ ] **Token warna & font standar** (dari referensi, bisa dipakai ulang untuk project sejenis):
  - Warna: `--black: #0A0A0A`, `--sidebar-bg: #111111`, `--surface: #F7F7F5`, `--gold: #C9A84C` (aksen), `--border: #E8E8E5`.
  - Font: `Inter` untuk UI, `Georgia` untuk elemen editorial/serif, `monospace` untuk kode/angka teknis.
- [ ] **Standar PIN login:**
  - [ ] Panjang PIN konsisten (4 atau 6 digit) di seluruh sistem, jangan campur.
  - [ ] Gunakan `inputmode="numeric"` pada input PIN supaya keyboard mobile otomatis menampilkan numpad, bukan keyboard huruf penuh.
  - [ ] `type="password"` atau setara untuk menyembunyikan digit PIN saat diketik, kecuali ada toggle "tampilkan" eksplisit.
  - [ ] Rate limit percobaan PIN salah (lockout sementara setelah beberapa kali gagal) — mencegah brute force sederhana.
  - [ ] PIN **tidak boleh** disimpan/dibandingkan sebagai plain text di client-side JavaScript yang bisa dilihat lewat DevTools — kalau butuh keamanan sungguhan (bukan sekadar gate ringan), validasi PIN harus di server.
- [ ] **Tampilan halaman login mengikuti kategori 19 (Standar Login Page)** *(v1.8)* — split layout visual-kiri/form-kanan, struktur wajib sama, palet menyesuaikan project. Standar PIN di atas mengatur **keamanan**, kategori 19 mengatur **tampilan** — keduanya dipakai bersamaan, bukan saling menggantikan.
- [ ] **Kalau dashboard dipakai di lapangan lewat HP, pertimbangkan menjadikannya PWA** (kategori 18) *(v1.8)* — dashboard operasional yang dibuka berkali-kali sehari jauh lebih enak dari ikon home screen daripada lewat tab browser. Kalau diputuskan PWA, kategori 18 berlaku penuh.
- [ ] **Layout dashboard standar** — sidebar navigasi kiri (fixed) untuk desktop; di mobile, lihat kategori 16 (Bottom Navigation 5-Tab) sebagai pola navigasi utama, bukan hamburger-only.
- [ ] **Header dengan info user/logout**, area konten kanan dengan card/grid untuk ringkasan data.

## F. Game Edukasi Anak

**Patokan referensi:** `Anabhi_MathFun_v4_0.html`.

- [ ] **Font besar & jelas** — ukuran teks jauh lebih besar dari standar web dewasa; anak-anak (terutama yang belum lancar baca) butuh keterbacaan maksimal.
- [ ] **Target sentuh minimal 24×24px (WCAG 2.2 level AA, dengan spacing exception)**, direkomendasikan 44–48px untuk elemen sentuh utama. *Reasoning:* seringkali disebut "44px = standar WCAG", padahal levelnya sebenarnya berbeda. WCAG 2.2 Success Criterion 2.5.8 (level **AA**, yang jadi acuan wajib) hanya mensyaratkan **24×24 CSS pixel** — boleh lebih kecil kalau ada jarak (spacing) cukup ke elemen sentuh lain. 44×44px itu level **AAA** (lebih ketat, opsional) dan juga angka dari Apple Human Interface Guidelines untuk iOS. 48×48px adalah rekomendasi Google Material Design untuk Android. Untuk elemen sentuh utama (tombol CTA, ikon navigasi), pakai 44–48px sebagai praktik baik — tapi jangan sebut ini "wajib WCAG", karena level wajibnya (AA) sebenarnya 24px.
- [ ] **Tanpa iklan** — mutlak untuk konten anak, baik dari sisi keselamatan (klik tidak sengaja ke situs luar) maupun etika.
- [ ] **Feedback visual & audio yang jelas** — respons instan (warna, animasi, suara) untuk setiap aksi benar/salah; anak-anak butuh konfirmasi lebih eksplisit dibanding UI dewasa.
- [ ] **Offline-capable bila memungkinkan** — game anak sering dipakai di kondisi koneksi tidak stabil (mobil, area publik); pertimbangkan Service Worker untuk cache aset dasar. **Kalau diputuskan offline-capable, ikuti kategori 18 (PWA) secara penuh** *(v1.8)* — jangan menulis Service Worker ad-hoc, karena strategi cache yang salah menghasilkan game yang "tidak update-update" di HP anak/orang tua dan sangat sulit dibersihkan dari jarak jauh.
- [ ] **Warna cerah & kontras tinggi**, tapi tetap penuhi kontras 4,5:1 minimal (lihat kategori 8 Bagian I) — menarik secara visual tidak boleh mengorbankan keterbacaan.

## G. Hospitality-Specific SEO (Hotel/Resort/Villa/Restaurant)

> Blueprint tambahan — bukan pengganti Blueprint A (Company Profile), tapi lapisan konten & SEO khusus yang ditumpuk di atasnya untuk bisnis hospitality. Relevan untuk stack Jagadita dan project hospitality lain.

- [ ] **NAP Consistency** (Name, Address, Phone) — identik persis di website, Google Business Profile, structured data, dan semua direktori/social media (lihat kategori 2 Bagian I).
- [ ] **Structured data spesifik hospitality**, bukan `LocalBusiness` generik:
  | Jenis Bisnis | Schema |
  |---|---|
  | Hotel/Resort | `Hotel` atau `LodgingBusiness` — `numberOfRooms`, `checkinTime`, `checkoutTime`, `amenityFeature` |
  | Restoran/F&B | `Restaurant` — `servesCuisine`, `menu`, `acceptsReservations`, `priceRange` |
  | Semua | `geo` (GeoCoordinates), `openingHoursSpecification` (format 24 jam), `telephone` format internasional |
- [ ] **Konten wajib per halaman properti:** nama, alamat lengkap, koordinat GPS, telepon, jam check-in/check-out (hotel) atau jam buka (restoran), jenis kamar/menu, fasilitas/amenities, galeri foto, CTA reservasi/booking yang jelas, tautan Google Business Profile & Google Maps.
- [ ] **Foto** — ikuti standar kategori 12 Bagian I (verifikasi lokasi, larangan screenshot, max 2× pemakaian). Untuk hospitality secara khusus: foto harus mencerminkan properti/lokasi sungguhan, bukan stock generik yang "kelihatan mirip" — kredibilitas visual sangat menentukan keputusan booking.
- [ ] **Info transportasi & atraksi sekitar** — jarak ke bandara/landmark, cara menuju lokasi; membantu keputusan tamu dan memperkuat sinyal lokal untuk SEO.
- [ ] **`hreflang`** relevan untuk target market internasional (lihat kategori 2 Bagian I) — terutama untuk destinasi wisata seperti Bali yang tamunya multi-bahasa.

---

## Recommendations
1. **Gunakan dua file ini sebagai pasangan:** `.md` ini untuk dibaca/referensi/version-control di repo, `.html` (anabhidev-website-sop-checklist.html) untuk dipakai langsung sebagai tracker interaktif saat development.
   > **Dokumen yang sudah dilebur & dipensiunkan** — jangan dipakai lagi sebagai rujukan terpisah karena isinya sudah utuh di sini dan berpotensi jadi versi basi: `AnabhiDev-SOP-Addendum-CacheBusting.md` (dilebur v1.7 → kategori 1, 6, 11), `PANDUAN-PWA.md` (dilebur v1.8 → kategori 18), `missfish-login-standard.md` (dilebur v1.8 → kategori 19).
2. **Tiered approach sesuai jenis proyek:**
   - *Landing page statis sederhana (UMKM/F&B Bali):* fokus kategori 1, 2, 3, 6, 7, 8, 9. Lewati kategori 4/5 yang berat backend.
   - *Web app dengan Supabase:* tambahkan SELURUH kategori 4 & 5 — RLS adalah yang non-negotiable.
   - *Web app ber-login (dashboard, tools operasional):* tambahkan kategori **19** (tampilan login) di atas standar keamanan Blueprint E *(v1.8)*.
   - *PWA (dipasang di HP):* tambahkan SELURUH kategori **18** — setengah-setengah tidak berlaku; tombol install tidak akan pernah muncul kalau salah satu dari 4 syarat wajibnya tidak terpenuhi *(v1.8)*.
3. **Quick wins berleverage tinggi (kerjakan dulu):** enable RLS semua tabel; set security headers via `_headers`; pasang Plausible; publikasikan `llms.txt` + cek robots.txt/Cloudflare AI bot; submit sitemap ke GSC; setup UptimeRobot.
4. **Threshold yang mengubah keputusan:** jika INP > 200 ms di CrUX → audit & pecah long task JS sebelum tambah fitur. Jika tabel Supabase muncul warning "RLS disabled" di dashboard → STOP, jangan deploy. Jika email custom domain masuk spam → cek SPF/DKIM/DMARC sebelum kirim kampanye. Jika halaman tak muncul saat diuji di ChatGPT/Perplexity → cek robots.txt & setting AI Crawl Control Cloudflare.
5. **Otomatisasi untuk solo dev:** andalkan deploy preview Cloudflare/Netlify, Dependabot, dan backup terjadwal agar beban maintenance minimal.

## Caveats
- **Klaim ambang LCP 2,0 dtk & "Core Web Vitals 2.0"** banyak muncul di blog agensi SEO komersial tetapi TIDAK terkonfirmasi di dokumentasi resmi web.dev/Google Search Central; perlakukan sebagai spekulasi, pakai 2,5 dtk sebagai standar resmi.
- **`llms.txt` adalah proposal komunitas**, bukan standar resmi yang dijamin dihormati LLM mana pun; nilainya saat ini belum terbukti sebagai sinyal sitasi — tetapi biaya implementasi rendah.
- **Status "tanpa cookie banner" untuk Plausible** valid di bawah GDPR menurut penilaian hukum mereka, tetapi sebagian ahli berpendapat ePrivacy Directive tetap relevan untuk akses ke perangkat; bila ragu dan target Eropa kritikal, konsultasikan ahli hukum.
- **User-agent & kebijakan AI crawler berubah cepat**; verifikasi ulang berkala. Cloudflare juga menemukan (Agustus 2025) Perplexity memakai stealth crawler yang melanggar robots.txt — jadi mengizinkan `PerplexityBot` di robots.txt tak menjamin perilaku crawler patuh 100%.
- Checklist ini komprehensif tapi **bukan pengganti audit keamanan profesional** untuk aplikasi yang memproses data sensitif/pembayaran.
