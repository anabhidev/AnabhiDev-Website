# STATUS DEPLOY — AnabhiDev-PORKCHOLESTEROL

**Development · Anabhi Dev**  
Versi Proyek: **1.4**  
Tanggal Update: **10 September 2026, 08:20:00 WITA**

---

## 1. Status File Aktif & Rencana Deploy

| Berkas | Status Lokal | Status Live | Keterangan |
|---|---|---|---|
| `index.html` | ✅ Selesai (v1.4) | Belum deploy | Halaman utama interaktif v1.4 sesuai narasi PRD Section 38 |
| `css/base.css` | ✅ Selesai (v1.4) | Belum deploy | Tokens, reset, overflow lock, width rules clamp(24px, 6vw, 180px) |
| `css/components.css` | ✅ Selesai (v1.4) | Belum deploy | Komponen visual: multi-food selector, portion sim, closing progression |
| `css/responsive.css` | ✅ Selesai (v1.4) | Belum deploy | Responsif tablet/mobile & print stylesheet |
| `js/data.js` | ✅ Selesai (v1.4) | Belum deploy | Master dataset: 4 varian babi, 17 lauk populer, 4 cerita, 5 mitos, 5 sumber |
| `js/calculator.js` | ✅ Selesai (v1.4) | Belum deploy | Engine komputasi babi, formula delta %, portion scaling, multi-food analysis |
| `js/ui.js` | ✅ Selesai (v1.4) | Belum deploy | Renderer v1.4: multi-food comparator, portion sim, method sim, master table |
| `js/app.js` | ✅ Selesai (v1.4) | Belum deploy | Inisialisasi aplikasi, bindings event, drawer, scrollspy |
| `assets/img/babi-guling-hero.jpg` | ✅ Siap | Belum deploy | Foto babi guling Bali autentik (hero tetap babi guling) |
| `assets/img/babi-goreng-polos.jpg` | ✅ Siap | Belum deploy | Foto babi goreng polos |
| `assets/img/samsam-goreng-polos.jpg` | ✅ Siap | Belum deploy | Foto samsam goreng renyah |
| `assets/img/babi-guling-lengkap.jpg` | ✅ Siap | Belum deploy | Foto piring komplit babi guling Bali |
| `assets/img/samsam-lengkap-bumbu.jpg` | ✅ Siap | Belum deploy | Foto sajian samsam lengkap kuah bumbu |
| `assets/img/anatomi-minyak-lemak.jpg` | ✅ Siap | Belum deploy | Still-life anatomi samcan, lard, dan bumbu |
| `assets/img/ayam-goreng.jpg` | ✅ Siap | Belum deploy | Foto ayam goreng lalapan |
| `assets/img/bebek-goreng.jpg` | ✅ Siap | Belum deploy | Foto bebek goreng krispi |
| `assets/img/daging-sapi.jpg` | ✅ Siap | Belum deploy | Foto sajian olahan daging sapi |
| `assets/img/udang-seafood.jpg` | ✅ Siap | Belum deploy | Foto udang rebus segar |
| `assets/img/ikan-bakar.jpg` | ✅ Siap | Belum deploy | Foto ikan bakar rempah lean |
| `assets/img/daging-kambing.jpg` | ✅ Siap | Belum deploy | Foto sate / olahan daging kambing |
| `assets/img/cumi-dish.jpg` | ✅ Siap | Belum deploy | Foto cumi bakar / tumis |
| `assets/img/telur.svg` | ✅ Siap | Belum deploy | Ilustrasi vektor telur ayam (familiar reference) |
| `assets/img/jeroan.svg` | ✅ Siap | Belum deploy | Ilustrasi vektor jeroan / hati sapi (high-cholesterol reference) |
| `assets/favicon.svg` | ✅ Selesai (v1.4) | Belum deploy | Ikon vektor babi emas & navy Anabhi Dev |
| `robots.txt` | ✅ Selesai (v1.4) | Belum deploy | Robots.txt ramah search engine & AI crawler |
| `sitemap.xml` | ✅ Selesai (v1.4) | Belum deploy | Sitemap XML standar |
| `llms.txt` | ✅ Selesai (v1.4) | Belum deploy | LLM knowledge context & citations |
| `arsip/` | ✅ Dibuat | N/A | Direktori cadangan versi lama |

---

## 2. Kepatuhan Standar Mutu & Master PRD v1.4

- **PRD v1.4 Section 38 (Alur Narasi Wajib)**:
  1. Navbar / Sidebar
  2. Hero — Babi Goreng Polos vs Babi Guling Lengkap (Hero tetap babi guling)
  3. Core pork comparison (4 varian utama masakan babi)
  4. What changes (Kalkulator piring sendiri: daging, kulit, minyak lard, minyak nabati, bumbu)
  5. 40–50% comparison demo (Slider formula relative delta, data USDA ARS 59 ke 85 mg)
  6. Cholesterol vs saturated fat & Minyak Babi (Split bowl lard vs nabati)
  7. Secondary food comparisons (4 Mini stories + Komparator 2–4 lauk + Smart summary)
  8. Master nutrition table (Filter kategori + Sortable columns + Mobile stacked cards)
  9. Portion simulator & Cooking method simulator (Gram scaling + 4 metode masak)
  10. Myth vs Fact (5 mitos vs fakta terverifikasi)
  11. Personal experience disclaimer (Edukasi rasa pusing/leher kaku, postprandial somnolence, sodium, lab test)
  12. Closing: “Dulu santai, sekarang kok beda?” (Progression 20-30, 30-40, 40+ + Catatan medis + Final takeaway card)
  13. Scientific Sources (5 sumber resmi: USDA ARS, Phil FCT, AHA, NHS UK, Kemenkes RI)
  14. Footer (Branding Anabhi Dev, tautan anabhidev.com, copyright 2026)

- **SOP Website v1.9 & Standar Coding v1.5**:
  - Logo Anabhi Dev (`https://anabhidev.com/logo.webp`) transparan tanpa background container putih.
  - Tautan logo dan footer mengarah ke `https://anabhidev.com`.
  - Credit footer: `Development · Anabhi Dev`.
  - Mandatory width rule: padding `clamp(24px, 6vw, 180px)`, tanpa batasan `max-width` px/ch pada `#main` atau teks.
  - Mobile drawer: `100dvh`, tombol escape, auto focus, touch targets > 44px.
  - Dark/Light mode theme switch dengan anti-FOUC script.
  - Seluruh script lulus uji syntax (`node -c`), seluruh 70 ID DOM terverifikasi valid, seluruh 16 file aset visual terverifikasi di disk.
