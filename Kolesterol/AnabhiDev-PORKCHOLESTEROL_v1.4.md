<!-- ================================================================
AnabhiDev-PORKCHOLESTEROL — Meat & Cholesterol Interactive Comparison
Product / UX / Content Expansion
Development · Anabhi Dev
Version   : 1.4
Generated : 10 September 2026, 08:13:41
================================================================ -->

# AnabhiDev-PORKCHOLESTEROL v1.3
## Master PRD Expansion — Interactive Comparison of Common Indonesian Dishes

> **Status:** Expansion / replacement master scope for the previous v1.1 concept.
>
> **Primary language:** Bahasa Indonesia
>
> **Primary audience:** general users / friends / family who want a simple visual comparison of common lauk and their nutrition profile.
>
> **Important:** This is an educational comparison tool, not a diagnostic or medical decision tool.

---

# 1. Product Idea

Website interaktif untuk membandingkan makanan yang umum ditemui di Indonesia dari sudut pandang:

- calories
- total fat
- saturated fat
- cholesterol
- protein
- sodium, bila data tersedia

Fokus awal tetap pada:

1. Babi goreng biasa / polos
2. Samsam goreng biasa / polos
3. Babi guling lengkap
4. Samsam lengkap + bumbu/minyak

Kemudian diperluas agar user bisa membandingkan dengan lauk populer lain:

5. Ayam goreng / ayam lalapan
6. Bebek goreng
7. Daging sapi goreng / sapi panggang
8. Udang goreng / udang rebus sebagai pembanding
9. Ikan goreng / ikan bakar sebagai reference yang lebih lean
10. Kambing sebagai tambahan pembanding red meat
11. Cumi sebagai seafood comparison
12. Telur sebagai familiar food reference
13. Jeroan/hati sebagai **special high-cholesterol reference**, bukan makanan utama sehari-hari

Tujuan bukan untuk menentukan “mana yang haram dimakan”, tetapi membantu user melihat:

> **“Yang berubah itu apa? Dagingnya, kulitnya, lemaknya, minyaknya, porsinya, atau semuanya ikut naik?”**

---

# 2. Core Product Principle

Website harus membedakan dengan sangat jelas:

## A. Cholesterol
Dietary cholesterol dalam makanan.

## B. Saturated fat
Lemak jenuh yang sering lebih relevan ketika membahas dampak pola makan terhadap LDL pada banyak orang.

## C. Calories
Total energi.

## D. Portion
Porsi dapat mengubah total asupan secara besar walaupun angka per 100 g terlihat moderat.

## E. Preparation
Cara memasak, minyak, kulit, lemak, saus, dan bumbu dapat mengubah nutritional profile.

### Critical wording rule

DILARANG menyimpulkan:

> “Makanan A pasti menaikkan kolesterol darah X%.”

DILARANG mengubah pengalaman subjektif menjadi bukti medis.

Contoh yang diperbolehkan:

> “Versi lengkap dapat memiliki profil energi/lemak yang berbeda karena ada tambahan kulit, lemak, minyak, atau komponen lain. Besarnya perubahan bergantung pada bahan dan porsi aktual.”

---

# 3. Comparison Universe

## Primary comparison set

| Category | Food / preparation | Role |
|---|---|---|
| Pork | Babi goreng polos | baseline |
| Pork | Samsam goreng polos | baseline |
| Pork | Babi guling lengkap | signature comparison |
| Pork | Samsam lengkap + bumbu/minyak | signature comparison |
| Chicken | Ayam goreng | common fried reference |
| Chicken | Ayam lalapan | common meal reference |
| Duck | Bebek goreng | higher-fat comparison |
| Beef | Sapi goreng | common red-meat reference |
| Beef | Sapi panggang/rebus | preparation contrast |
| Seafood | Udang rebus | seafood baseline |
| Seafood | Udang goreng | fried seafood contrast |
| Seafood | Ikan bakar | relatively lean reference |
| Seafood | Ikan goreng | fried fish contrast |
| Red meat | Kambing | additional red-meat reference |
| Seafood | Cumi | seafood comparison |
| Egg | Telur goreng/rebus | familiar non-meat reference |
| Organ meat | Hati/jeroan | special high-cholesterol reference |

### Recommendation

**Jangan menjadikan semua item setara di homepage.**

Homepage tetap menonjolkan pork/Bali food comparison.

Other foods masuk ke:

> **“Bandingkan dengan lauk lain”**

agar scope terasa luas tetapi tidak kehilangan cerita utama.

---



# 3A. Critical Scope Clarification — Hero vs Main Content

This requirement overrides any ambiguous interpretation of the expanded comparison scope.

## Hero is FIXED

The hero MUST remain exactly about the original core comparison:

> **Babi Goreng Polos vs Babi Guling Lengkap**

The hero image remains an authentic **babi guling** image.

Do NOT rotate the hero into ayam, bebek, sapi, udang, ikan, kambing, cumi, telur, or jeroan.

Do NOT replace the hero headline with a generic “meat comparison” headline.

The expanded foods are supporting/reference content only.

## Other foods are secondary comparison content

Ayam, bebek, sapi, udang, ikan, kambing, cumi, telur, and jeroan must appear as additional comparison/reference items in:

- Sidebar navigation / food category navigation
- Main Content below the hero
- Comparison table
- Food cards/details
- Relevant interactive comparison controls

They must NOT replace or compete with the hero as the primary story.

## Page terminology

Use this structure consistently in PRD, UI, and code:

`Navbar / Sidebar → Hero → Main Content → Footer`

Use **Main Content** as the generic name for the complete content area below the hero and above the footer.

Inside Main Content, individual blocks should be called `sections`, for example:

- Comparison Section
- Nutrition Section
- Other Foods Section
- Myth vs Fact Section
- Sources Section

Do not call the entire area below the hero “content section”; reserve `section` for an individual content block.

## Required Main Content opening

Immediately below the hero, the first major section should continue the original story:

> **“Apa bedanya Babi Goreng Polos dengan Babi Guling Lengkap?”**

Only after this core explanation should the interface introduce:

> **“Kalau dibandingkan dengan ayam, bebek, sapi, udang, dan lauk lainnya bagaimana?”**

This preserves narrative hierarchy: **Pork-first → core comparison → broader reference comparison.**

# 4. Why These Additions

## Ayam
Wajib. Sangat familiar, mudah dipahami, dan menjadi baseline kuat terhadap babi.

## Bebek
Wajib. Menarik sebagai comparison karena pengguna sering menganggap “ayam vs bebek” serupa, padahal preparation dan bagian tubuh sangat menentukan.

## Sapi
Wajib. Menjadi red-meat reference selain pork.

## Udang
Wajib. Sangat menarik karena user sering menganggap:

> “Seafood pasti rendah kolesterol.”

Website harus menunjukkan bahwa **dietary cholesterol dan saturated fat bukan hal yang identik**.

## Ikan
Sangat disarankan sebagai reference yang lebih lean dan preparation contrast:

- ikan bakar
- ikan goreng

## Kambing
Disarankan. Menambah red-meat reference Indonesia yang sangat umum.

## Cumi
Disarankan. Menambah seafood comparison.

## Telur
Opsional tetapi sangat bagus sebagai familiar reference.

## Hati/jeroan
Disarankan sebagai **special reference**, bukan rekomendasi makanan.

Tujuannya untuk menunjukkan bahwa ada makanan tertentu yang secara alami dapat memiliki dietary cholesterol tinggi dan harus dibandingkan memakai sumber data yang tepat.

---

# 5. Homepage Information Architecture

## Hero

Hero tetap menggunakan **gambar babi guling autentik** sebagai visual utama.

Headline direction:

> **“Babi goreng, babi guling, ayam, bebek, sapi… sebenarnya bedanya seberapa jauh?”**

Subheadline:

> “Bukan cuma soal dagingnya. Kulit, lemak, minyak, bumbu, cara masak, dan ukuran porsi semuanya ikut main.”

CTA:

- Bandingkan sekarang
- Lihat tabel lengkap

Tone:
- santai
- conversational
- sedikit humor
- tidak sensationalist

---

# 6. Main Interactive: “Pilih Laukmu”

Buat selector/category chips:

- 🐷 Babi
- 🐔 Ayam
- 🦆 Bebek
- 🐄 Sapi
- 🐐 Kambing
- 🦐 Udang
- 🦑 Cumi
- 🐟 Ikan
- 🥚 Telur
- 🫀 Jeroan

Saat user memilih item, card menampilkan:

- gambar makanan
- preparation
- portion basis
- calories
- fat
- saturated fat
- cholesterol
- protein
- sodium (if available)

---

# 7. Main Interactive: “Polos vs Lengkap”

Comparison presets:

### Preset A
Babi goreng polos

### Preset B
Samsam goreng polos

### Preset C
Babi guling lengkap

### Preset D
Samsam lengkap + bumbu/minyak

### Preset E
Ayam goreng

### Preset F
Bebek goreng

### Preset G
Sapi goreng

### Preset H
Udang

### Preset I
Ikan bakar

---

# 8. Comparison Table — Master

Buat **tabel perbandingan besar** dengan sticky header dan filter.

Minimal columns:

| Food | Preparation | Portion Basis | Calories | Total Fat | Saturated Fat | Cholesterol | Protein | Sodium | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| Babi goreng polos | fried | 100 g | data | data | data | data | data | data | baseline |
| Samsam goreng polos | fried | 100 g | data | data | data | data | data | data | baseline |
| Babi guling lengkap | roasted + seasoning | serving / 100 g | data | data | data | data | data | data | complete preparation |
| Samsam lengkap | seasoned + oil | serving / 100 g | data | data | data | data | data | data | complete preparation |
| Ayam goreng | fried | 100 g | data | data | data | data | data | data | common chicken |
| Ayam lalapan | fried + sides | serving | data | data | data | data | data | data | serving-dependent |
| Bebek goreng | fried | 100 g | data | data | data | data | data | data | often skin-on |
| Sapi goreng | cooked/fried | 100 g | data | data | data | data | data | data | cut-dependent |
| Sapi panggang/rebus | cooked | 100 g | data | data | data | data | data | data | preparation contrast |
| Udang rebus | boiled | 100 g | data | data | data | data | data | data | seafood baseline |
| Udang goreng | fried | 100 g | data | data | data | data | data | data | oil changes profile |
| Ikan bakar | grilled | 100 g | data | data | data | data | data | data | reference |
| Ikan goreng | fried | 100 g | data | data | data | data | data | data | oil-dependent |
| Kambing | cooked | 100 g | data | data | data | data | data | data | cut-dependent |
| Cumi | cooked | 100 g | data | data | data | data | data | data | preparation-dependent |
| Telur | boiled/fried | 1 serving | data | data | data | data | data | data | familiar reference |
| Hati/jeroan | cooked | 100 g | data | data | data | data | data | data | special reference |

### Important

Never fill unsupported numbers just to complete the table.

Use:

- verified value
- range
- “data tidak tersedia”
- “estimasi”
- “sample/reference value”

with clear source labels.

---

# 9. “Apa yang Bikin Beda?”

Create an interactive component with switches:

- Daging
- Kulit
- Lemak terlihat
- Minyak tambahan
- Bumbu
- Saus
- Tepung
- Porsi

As the user toggles components, explain qualitatively and, only where supported by data, quantitatively:

> “Nah, di sinilah ceritanya mulai panjang. Bukan cuma babinya yang ikut makan minyak. 😄”

Do not invent nutrient deltas.

---

# 10. “40–50%?” Section

Keep the previous concept but revise the framing.

Headline:

> **“Katanya bisa beda 40–50%. Beneran?”**

Answer:

> “Bisa ada perbandingan tertentu yang menghasilkan selisih sekitar itu, tetapi 40–50% bukan angka baku yang berlaku untuk semua babi goreng, samsam, atau babi guling.”

Interactive demo:

- input A
- input B
- automatic percentage difference

Formula:

`differencePercent = ((B - A) / A) * 100`

Show:

> “Selisih ini berlaku untuk dua angka yang sedang dibandingkan, bukan hukum universal semua makanan.”

---

# 11. “Kolesterol vs Lemak Jenuh”

This must be a major educational section.

Visual:

Two large cards:

### Dietary Cholesterol
“Jumlah cholesterol yang memang ada di makanan.”

### Saturated Fat
“Jenis lemak yang sering lebih penting saat membahas dampak pola makan terhadap LDL.”

Then:

> “Jadi jangan campur dua angka ini jadi satu cerita.”

Use citations immediately adjacent to health claims.

---

# 12. “Kenapa Ayam/Bebek/Sapi/Udang Ikut Dibandingkan?”

Create 4 mini stories:

### Ayam
> “Si paling aman di obrolan warung—tapi kulit dan minyak tetap ikut rapat.”

### Bebek
> “Bebek nggak salah apa-apa. Tapi bagian dan cara masaknya bisa bikin ceritanya beda.”

### Sapi
> “Sapi juga bukan satu angka. Potongan dagingnya matters.”

### Udang
> “Nah ini yang suka bikin orang kaget: seafood tidak otomatis berarti semua angka rendah.”

The humor must never replace factual explanation.

---

# 13. Food Detail Page / Drawer

Every food gets detail view.

Structure:

1. Food photo
2. Food name
3. preparation
4. portion basis
5. nutrition metrics
6. key ingredients
7. why values vary
8. source
9. caveat

Example:

## Babi Guling Lengkap

Show:

- whole roast photo
- plated photo
- close-up skin/fat
- condiment/bumbu photo if licensed

Content:

> “Nilai nutrisi satu porsi babi guling bisa sangat bervariasi. Bagian daging yang dimakan, kulit, lemak, porsi, dan komponen pendamping semuanya ikut menentukan.”

---

# 14. Image Requirements

## Hero images

Mandatory:

- babi guling whole roast
- plated babi guling
- close-up skin/crackling

## Pork

- babi goreng polos
- samsam goreng polos
- babi guling
- samsam lengkap

## Chicken

- ayam goreng
- ayam lalapan

## Duck

- bebek goreng

## Beef

- sapi goreng
- sapi panggang/rebus

## Seafood

- udang
- udang goreng
- ikan bakar
- ikan goreng
- cumi

## Additional

- kambing
- telur
- hati/jeroan

### Licensing

Prefer:

1. original photography
2. generated images
3. properly licensed stock
4. permission-cleared images

Never scrape random food photography and embed it without usage-right verification.

---

# 15. Image Art Direction

Photos must feel:

- appetizing
- realistic
- Indonesian
- culturally recognizable
- warm
- editorial

Avoid:

- cartoon pig
- fake laboratory food
- grotesque meat visuals
- excessive gore
- exaggerated “danger” styling

Hero should feel like:

> premium Indonesian food editorial

not:

> medical warning poster.

---

# 16. Sidebar / Navigation

Use Anabhi Dev visual identity.

Main navigation:

1. Beranda
2. Babi vs Babi Guling
3. Bandingkan Lauk
4. Tabel Nutrisi
5. Lemak vs Kolesterol
6. “40–50%?”
7. Mitos vs Fakta
8. Sources

Sidebar/logo:

- Anabhi Dev logo
- clickable to `https://anabhidev.com`

Footer:

`Development · Anabhi Dev`

---

# 17. Comparison Modes

## Mode 1 — Two Foods

Example:

> Babi goreng vs ayam goreng

## Mode 2 — Three Foods

Example:

> Babi vs ayam vs bebek

## Mode 3 — Food family

Example:

> Pork family

- babi goreng
- samsam goreng
- babi guling
- samsam lengkap

## Mode 4 — Preparation

Example:

> Udang rebus vs udang goreng

## Mode 5 — Meat category

Example:

> pork vs chicken vs beef vs duck

---

# 18. Smart Comparison Summary

At the bottom of every comparison, show:

### “Yang paling beda di sini?”

Break into:

- highest calories
- highest fat
- highest saturated fat
- highest dietary cholesterol
- highest protein

But use wording:

> “tertinggi dalam dataset ini”

instead of:

> “paling tidak sehat”

because nutrition depends on context, serving size, and individual needs.

---

# 19. Portion Simulator

Add slider:

`Porsi: 50 g → 75 g → 100 g → 150 g → 200 g`

Realtime display:

- calories
- fat
- saturated fat
- cholesterol
- protein

This feature is highly recommended because:

> **100 g vs satu piring** are not the same thing.

---

# 20. Cooking Method Simulator

Where data allows, compare:

- boiled
- grilled
- roasted
- fried
- deep fried

Show:

> “Cara masak juga ikut main.”

Do not assume frying always produces a fixed nutrient increase; actual absorption varies.

---

# 21. Myth vs Fact

Minimum topics:

### Myth
“Semua seafood rendah kolesterol.”

### Fact
“Jenis seafood berbeda; dietary cholesterol dan saturated fat juga berbeda.”

### Myth
“Kalau tidak pusing berarti kolesterol aman.”

### Fact
“High cholesterol biasanya tidak punya gejala khas; kondisi kolesterol perlu dinilai dengan pemeriksaan darah.”

### Myth
“Minyak tambahan otomatis membuat cholesterol naik 40–50%.”

### Fact
“Tambahan minyak terutama menambah energy/fat; dampak terhadap cholesterol makanan bergantung pada komposisi bahan yang digunakan.”

### Myth
“Babi goreng polos dan babi guling lengkap pasti sama.”

### Fact
“Preparation, bagian daging, kulit, lemak, porsi, dan komponen tambahan dapat membuat profil nutrisi berbeda.”

---

# 22. Personal Experience Disclaimer

Keep a small card:

> **“Kamu merasa pusing setelah makan sesuatu?”**
>
> Jangan langsung menyimpulkan penyebabnya adalah kolesterol. Pusing punya banyak kemungkinan penyebab dan kolesterol tinggi sendiri biasanya tidak menimbulkan gejala yang khas.
>
> Kalau kekhawatiran utamanya adalah kolesterol darah, pemeriksaan darah adalah cara yang relevan untuk menilainya.

No diagnosis.

---

# 23. Data Model

Use frontend data objects.

Suggested structure:

```js
const foods = [
  {
    id: "babi-goreng-polos",
    category: "pork",
    name: "Babi Goreng Polos",
    preparation: "fried",
    portionBasis: "100 g",
    kcal: null,
    totalFat: null,
    saturatedFat: null,
    cholesterol: null,
    protein: null,
    sodium: null,
    evidenceLevel: "reference",
    image: "",
    source: ""
  }
];
```

All nutrient values must have metadata:

- source
- basis
- preparation
- date checked
- confidence/evidence level

---

# 24. Data Quality Rules

Never merge incompatible values without labeling.

Examples of incompatible basis:

- raw vs cooked
- skin-on vs skinless
- 100 g vs serving
- restaurant serving vs standardized database serving

Each value must state its basis.

Recommended source tiers:

### Tier 1
USDA FoodData Central / official government food composition databases

### Tier 2
Official national food composition tables

### Tier 3
Peer-reviewed literature

### Tier 4
Reputable nutrition databases with transparent sourcing

### Tier 5
Restaurant-specific nutrition data

### Avoid
Unsourced blogs / social posts as numeric evidence.

---

# 25. Table UX

Desktop:

- sticky table header
- horizontal scroll only if necessary
- sortable numeric columns
- filter chips

Mobile:

- comparison cards
- accordion details
- no tiny unreadable spreadsheet

Allow:

> “Compare selected”

with 2–4 foods.

---

# 26. Visual Language

Style:

**Editorial + scientific + Indonesian food culture + Anabhi Dev.**

Use:

- premium food photography
- warm neutrals
- charcoal
- off-white
- restrained accent colors
- strong type hierarchy
- big numbers
- simple bars
- thin rules

Avoid:

- hospital dashboard look
- excessive red warnings
- fake medical UI
- cartoonish food illustrations
- excessive gradients

---

# 27. Microcopy Direction

Use friendly phrases such as:

- “Nah, ini yang mulai menarik.”
- “Minyaknya ikut turun gelanggang.”
- “Kulitnya ternyata bukan figuran.”
- “Beda masak, beda cerita.”
- “Jangan bandingkan apel dengan satu piring nasi padang.”
- “Angka ini per 100 g, bukan satu piring penuh ya 😄”
- “Data dulu, asumsi belakangan.”

Humor must be occasional.

Never joke about serious medical symptoms.

---

# 28. Technical Architecture

Preferred:

- HTML
- CSS
- vanilla JavaScript

No backend required for MVP unless the implementation plan explicitly needs one.

Reusable components:

- SiteHeader
- Sidebar
- HeroFood
- FoodSelector
- FoodCard
- ComparisonTable
- MetricCard
- ComparisonChart
- PortionSlider
- CookingMethodSelector
- IngredientBreakdown
- MythFactCard
- EvidenceCallout
- SourceList
- MobileDrawer
- ThemeToggle

---

# 29. Accessibility

Mandatory:

- semantic HTML
- keyboard navigation
- visible focus
- ARIA labels where needed
- 44×44 px touch target
- reduced motion
- sufficient contrast
- table/card content understandable without color alone

---

# 30. Performance

Mandatory:

- optimized hero image
- lazy-load non-hero images
- proper width/height attributes
- minimal JS
- no unnecessary dependencies
- clean console
- Core Web Vitals targets according to the current SOP

---

# 31. SEO / GEO

Include:

- title
- meta description
- canonical
- Open Graph
- favicon
- semantic headings
- structured data where applicable
- robots.txt
- sitemap.xml
- llms.txt

Health/nutrition claims should be citation-friendly.

---

# 32. SOP / CODING STANDARD

Before implementation, the coding agent MUST read:

- `AnabhiDev SOP v1.9`
- `Standar Coding Anabhi Dev v1.5`

Do not assume older standards are current if the v1.9 / v1.5 files exist in project root.

Follow exactly:

- file header
- timestamp WITA
- naming convention
- deployment naming
- versioning
- accessibility requirements
- performance requirements
- source/citation requirements
- security requirements
- validation requirements

---

# 33. Acceptance Criteria

## Content

- [ ] Pork comparison remains the main story.
- [ ] Chicken included.
- [ ] Duck included.
- [ ] Beef included.
- [ ] Shrimp included.
- [ ] Fish included.
- [ ] Goat included or clearly marked as phase 2.
- [ ] Squid included or clearly marked as phase 2.
- [ ] Egg optional.
- [ ] Organ meat special reference.
- [ ] Every numeric nutrition value has source/basis metadata.
- [ ] Unsupported values are not invented.
- [ ] No unsupported “40–50% universal rule”.
- [ ] No diagnosis from symptoms.

## UX

- [ ] Food selector works.
- [ ] Two-food comparison works.
- [ ] Multi-food comparison works.
- [ ] Portion slider works.
- [ ] Preparation comparison works where data exists.
- [ ] Table filtering works.
- [ ] Mobile comparison works.
- [ ] Navigation works.
- [ ] Hero image loads correctly.

## Visual

- [ ] Hero uses babi guling image.
- [ ] Multiple food photos exist.
- [ ] Images are properly licensed/generated.
- [ ] Sidebar/navbar use Anabhi Dev visual identity.
- [ ] Anabhi Dev logo links to anabhidev.com.
- [ ] Footer has `Development · Anabhi Dev`.

## Quality

- [ ] Console clean.
- [ ] No broken images.
- [ ] No horizontal overflow on normal mobile screens.
- [ ] Keyboard accessible.
- [ ] Reduced motion supported.
- [ ] Performance reviewed.

---

# 34. Recommended MVP Priority

## P0 — Must Have

1. Babi comparison
2. Chicken
3. Duck
4. Beef
5. Shrimp
6. Fish
7. Main comparison table
8. Portion simulator
9. Cholesterol vs saturated fat explanation
10. 40–50% myth/calculation section
11. Hero babi guling image
12. Anabhi Dev navigation branding

## P1 — Strongly Recommended

1. Goat
2. Squid
3. Cooking method comparison
4. Ingredient toggle
5. 2–4 food compare
6. Myth vs fact

## P2 — Optional

1. Egg
2. Organ meat detail page
3. User-created custom meal
4. Save/share comparison
5. printable comparison card

---

# 35. Final Product Definition

The website should answer this in under 10 seconds:

> **“Kalau dibandingkan, sebenarnya babi, ayam, bebek, sapi, dan seafood itu bedanya di mana?”**

Then answer the deeper question:

> **“Dan kalau makanannya lengkap dengan kulit, lemak, minyak, bumbu, dan porsi besar—apa yang sebenarnya berubah?”**

The product should make the user think:

> **“Ohhh… ternyata yang berubah bukan cuma ‘kolesterol’. Lemak, saturated fat, calories, portion, dan cara masak ikut main.”**

That is the core educational takeaway.

---

# 36. Antigravity Implementation Instruction

When implementing this PRD:

1. Read this entire file.
2. Read current SOP v1.9.
3. Read current Coding Standard v1.5.
4. Inspect the existing project structure before creating files.
5. Preserve the original pork-first concept while expanding the comparison universe.
6. Build actual working interactions, not static mockups.
7. Use real/cited data wherever available.
8. Clearly label estimates/reference values.
9. Use Indonesian as default language.
10. Keep microcopy casual, funny in small doses, and culturally natural.
11. Use babi guling as the hero image.
12. Include multiple authentic food images throughout the site.
13. Use Anabhi Dev visual identity in the sidebar/navbar and clickable Anabhi Dev logo.
14. Perform a full requirement review against this PRD before completion.


# 37. Closing Section — “Dulu Santai, Sekarang Kok Beda?”

Tambahkan section penutup setelah seluruh comparison, edukasi, dan myth-vs-fact selesai.

## Purpose

Section ini menjadi **closing narrative**, bukan medical conclusion. Tujuannya menghubungkan pengalaman orang yang memasuki usia 40-an dengan pesan bahwa toleransi makan, kondisi kesehatan, kebiasaan, berat badan, aktivitas, genetika, dan faktor lain dapat berubah seiring waktu.

## Tone

Santai, lucu, relatable, sedikit “iya juga ya 😅”, tetapi jangan mengklaim bahwa umur 40 otomatis membuat seseorang merasakan kolesterol.

Suggested headline:

> **“Umur 20–40 makan santai… masuk 40-an kok mulai beda cerita? 😅”**

Suggested copy direction:

> “Waktu masih muda, makan begini-begitu mungkin terasa biasa saja. Masuk 40-an, sebagian orang mulai merasa badan tidak ‘sefleksibel’ dulu. Tapi jangan langsung menyalahkan kolesterol—usia hanyalah salah satu bagian dari cerita. Kondisi metabolik, berat badan, aktivitas, pola makan, genetika, tekanan darah, tidur, dan banyak faktor lain juga bisa berubah.”

Then use a humorous progression visual:

**20–30:**
> “Babi guling? Gas.” 😎

**30–40:**
> “Masih gas… tapi mulai mikir dua kali.” 😅

**40+:**
> “Mulai kenal konsep: ‘besok jangan dulu makan yang berat-berat.’ 😂”

### Critical medical wording

Jangan menulis:

> “Sebelum 40 tidak terasa, setelah 40 baru terasa kolesterolnya.”

Jangan menulis:

> “Pusing setelah makan babi guling berarti kolesterol naik.”

Gunakan:

> “Pengalaman tubuh bisa terasa berbeda seiring bertambahnya usia, tetapi gejala seperti pusing tidak dapat digunakan untuk menyimpulkan kolesterol sedang tinggi.”

### Final takeaway card

Create a large closing card:

> **“Jadi masalahnya bukan: ‘Babi guling boleh atau tidak?’**
>
> **Yang lebih berguna: lihat bagian yang dimakan, cara masak, minyak, lemak, porsi, frekuensi, dan kondisi tubuhmu sekarang.”**

Secondary line:

> **“Dulu kuat satu piring. Sekarang mungkin badan minta negotiating dulu. 😄”**

Add small disclaimer:

> “Ini adalah edukasi umum, bukan diagnosis. Kalau ada keluhan berulang atau kekhawatiran tentang kolesterol, pemeriksaan kesehatan lebih bermakna daripada menebak dari satu kali makan.”

# 38. Final Page Flow

The complete narrative order must be:

1. Navbar / Sidebar
2. Hero — **Babi Goreng Polos vs Babi Guling Lengkap**
3. Core pork comparison
4. What changes: meat / skin / fat / oil / seasoning / portion
5. 40–50% comparison demo
6. Cholesterol vs saturated fat
7. Secondary food comparisons: chicken / duck / beef / shrimp / fish / etc.
8. Master nutrition table
9. Portion simulator
10. Cooking method comparison
11. Myth vs Fact
12. Personal experience disclaimer
13. **Closing: “Dulu santai, sekarang kok beda?”**
14. Final takeaway
15. Sources
16. Footer

The closing must feel like the natural end of the story and must not change the core scientific positioning of the website.
