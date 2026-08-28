<!-- ================================================================
     AnabhiDev-BPC — Bali Private Chef & Culinary Consulting Website
     Manifest Sumber Foto (placeholder development)
     Development · Anabhi Dev
     Version   : 1.1
     Generated : 28 August 2026, 01:38:04
     ================================================================ -->

# Manifest Foto — AnabhiDev-BPC

> 🔴 **SEMUA foto di bawah ini adalah PLACEHOLDER DEVELOPMENT.**
> SOP v1.6 Blueprint G: foto hospitality wajib mencerminkan properti dan
> masakan sungguhan sebelum live — stock generik yang "kelihatan mirip"
> merusak kredibilitas, dan kredibilitas visual itu yang menentukan
> keputusan booking. Ganti semua sebelum launch.

---

## Cara membaca tabel

- **Slug** — bagian setelah `images.unsplash.com/`.
  URL lengkap: `https://images.unsplash.com/[slug]?w=[lebar]&q=75`
  Lebar: `800` untuk kartu, `1600` untuk hero/background besar. `q` jangan di atas 80.
- **Lokasi** — isi field lokasi di metadata Unsplash, dicek satu per satu.
  `—` berarti metadata lokasi kosong.

---

## 2 jebakan yang sudah ditemukan (jangan diulang)

**1. Photo-id pendek ≠ slug URL.**
SOP kategori 12 menulis formatnya `photo-[ID]`. Yang dimaksud `[ID]` di situ
adalah **slug path**, bukan photo-id pendek yang terlihat di URL halaman
Unsplash. Contoh: foto `pjdwWq8kYg0` slug-nya `photo-1728050829052-2d1514f1d168`.
Memakai id pendek menghasilkan **404** (file 29 byte, gambar kosong).

**2. `premium_photo-*` DILARANG dipakai.**
Slug yang berawalan `premium_photo-` adalah Unsplash+ / Getty Images —
**berbayar, bukan lisensi bebas**, dan mengembalikan 404 di jalur
`images.unsplash.com` biasa. Semua kandidat premium sudah dibuang dari daftar
ini. Kalau nanti menambah foto baru, cek dulu slug-nya tidak berawalan
`premium_`.

---

## A. Foto dengan lokasi TERVERIFIKASI Bali / Indonesia

Dipakai untuk bagian yang secara implisit mengklaim "ini Bali".

| Slot | Slug | Dimensi | Lokasi di metadata |
|---|---|---|---|
| Hero utama | `photo-1647318350386-f65367466b01` | 5600×3733 | Pantai Lima Beach, Pererenan, Badung, Bali |
| On Villa Dining | `photo-1667992403195-d2241a40ca2d` | 5896×3931 | Bali, Indonesia |
| Private BBQ | `photo-1736492090527-65f0368154f7` | 4898×3265 | Bali, Indonesia |
| Menu — Indonesia | `photo-1539755530862-00f623c00f52` | 5472×3648 | Yogyakarta City, Indonesia |
| Detail plating | `photo-1594805938422-b330ad42a7bb` | 5263×3509 | Bali, Indonesia |
| Galeri — villa & kolam | `photo-1728050829052-2d1514f1d168` | 5464×3640 | Bali, Indonesia |
| Galeri — villa Seminyak | `photo-1728048756938-de1ccee0ab15` | 5464×3640 | Seminyak Beach, Bali |
| Galeri — Jimbaran | `photo-1678895575027-42c28b790963` | 6000×3376 | Menega Cafe, Jimbaran, Badung, Bali |
| Galeri — sunset | `photo-1669545192473-f4d88714fe2f` | 4000×2666 | Tanah Lot Temple, Tabanan, Bali |
| Galeri — interior villa | `photo-1611892440504-42a792e24d32` | 5775×3850 | Bali, Indonesia |

**Kenapa hero jatuh ke `photo-1647318350386...`:** foto dusk dengan lampu
hangat di sisi kanan dan sisi kiri yang gelap-kosong — ruang untuk headline
tanpa perlu menutup foto dengan kotak hitam. Cocok dengan arahan PRD bagian
17.5 dan token `--scrim-hero`.

---

## B. Foto tanpa klaim lokasi

Dipakai untuk close-up makanan, tangan, dan dapur — tidak mengklaim tempat,
jadi metadata lokasi tidak wajib.

| Slot | Slug | Dimensi | Keterangan |
|---|---|---|---|
| Chef story | `photo-1776353744117-9e8595e8092c` | 3130×2075 | Chef di dapur bercahaya redup |
| Catering | `photo-1555244162-803834f70033` | 7800×5200 | Meja buffet |
| Cooking Class | `photo-1683624328172-88fb24625ec1` | 5760×3840 | Beberapa orang menyiapkan makanan |
| Special Events | `photo-1562050344-f7ad946cee35` | 6124×4083 | Meja panjang, lilin, gelas |
| Menu — seafood | `photo-1519351635902-7c60d09cb2ed` | 5184×3888 | Lobster di talenan kayu |
| Menu — hidangan meja | `photo-1658218615127-40b7068bbae5` | 3984×2656 | Meja penuh hidangan |
| Consulting — dapur pro | `photo-1575691386840-d355059d6341` | 6000×4000 | Chef di dekat panci besar |
| Consulting — prep | `photo-1636647511729-6703539ba71f` | 6000×4000 | Memotong sayur di dapur |

---

## Aturan pakai

1. **Maksimal 2× pemakaian foto yang sama per halaman**, dan tidak boleh
   berulang di dua section yang berdampingan (SOP kategori 12).
2. **`alt` wajib ikut diganti** kalau fotonya diganti. Alt lama yang menempel
   di foto baru merusak SEO dan aksesibilitas.
3. **`width`/`height` wajib ditulis** di tag `<img>` untuk mencegah CLS.
4. Foto hero pakai `fetchpriority="high"`, **jangan** `loading="lazy"` —
   lazy-load pada elemen LCP justru memperburuk LCP.
5. Foto di bawah fold pakai `loading="lazy"` + `decoding="async"`.
6. Foto Unsplash **tidak** diberi version query `?v=` — itu hanya untuk aset
   milik sendiri. Cache-nya di luar kendali kita.

---

## Saat foto asli klien sudah ada

1. Simpan di `assets/img/` sebagai `.webp` (fallback `.jpg` bila perlu).
2. Hitung dimensi upload: ukuran tampil terbesar × 1.3–1.6. Cek breakpoint
   **mobile dulu** — biasanya justru mobile yang butuh lebih besar karena
   layoutnya satu kolom.
3. Export `quality` 75–85, bandingkan visual sebelum memutuskan.
4. Baru saat itu pasang version query `?v=YYYYMMDDx`.
5. Hapus seluruh URL `images.unsplash.com` dari kode.
