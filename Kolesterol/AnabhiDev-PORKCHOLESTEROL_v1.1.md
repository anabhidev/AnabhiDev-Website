<!-- ================================================================
AnabhiDev-PORKCHOLESTEROL — Interactive Pork Nutrition Comparison
HTML · CSS · JavaScript
Development · Anabhi Dev
Version   : 1.1
Generated : 10 September 2026, 07:45:00
================================================================ -->

# PRD + Interactive Design Brief
## Babi Goreng Polos vs Babi Guling / Samsam Lengkap

### 1. Product Definition

**Working title:** Babi & Samsam: Polos vs Lengkap — Apa yang Sebenarnya Berubah?

**Product type:** Interactive Guide / Knowledge Base / Nutrition explainer.

**Primary purpose:**
Membantu pengunjung memahami bahwa perbedaan makanan "babi goreng polos" dengan "babi guling / samsam lengkap" bukan semata-mata soal nama masakan. Yang perlu dibandingkan adalah **potongan daging, jumlah lemak/kulit, minyak/lemak tambahan, bumbu, ukuran porsi, total lemak, saturated fat, energi, sodium, dan dietary cholesterol**.

**Core editorial stance:**
Jangan membuat klaim universal bahwa "babi guling lengkap pasti 40–50% lebih tinggi kolesterolnya". Angka 40–50% harus ditampilkan sebagai **kemungkinan pada kondisi/perbandingan tertentu**, bukan angka baku untuk semua resep. Ada data pangan yang menunjukkan perbedaan sekitar itu dapat terjadi akibat komposisi dan/atau proses memasak, tetapi data tersebut tidak otomatis membuktikan angka yang sama untuk satu porsi babi guling Bali tertentu.

**Key distinction:**
- Dietary cholesterol = kolesterol yang ada di makanan.
- Blood cholesterol (LDL/HDL/total) = kolesterol/lipoprotein yang diukur melalui darah.
- Saturated fat sangat penting untuk pembahasan karena asupan saturated fat dapat menaikkan LDL.

---

# 2. The Core Question

Hero question:

> **"Kalau daging babinya sama, apakah tambahan kulit/lemak + minyak/lemak masak + bumbu membuat hidangan lengkap jauh berbeda?"**

Secondary question:

> **"Benarkah angka kolesterolnya bisa berbeda 40–50%?"**

Answer pattern used by the UI:

> **Bisa terjadi pada perbandingan tertentu, tetapi 40–50% bukan angka universal.**

Then explain:
1. Preparation and portion size can change the nutrient density per 100 g.
2. Added lard/fat contributes fat, saturated fat, calories, and some dietary cholesterol.
3. Many bumbu ingredients themselves may contribute sodium/calories more than cholesterol.
4. The biggest health-relevant distinction is not always dietary cholesterol alone; saturated fat and the overall dietary pattern matter for LDL risk.

---

# 3. Scientific Guardrails

The website must **not** say:
- "Babi guling otomatis menaikkan kolesterol darah 50%."
- "Minyak babi membuat kolesterol pasti naik 50%."
- "Pusing setelah makan = kolesterol naik."
- "Umur 40 membuat tubuh otomatis tidak bisa makan babi."

The website may say:
- "Dietary cholesterol can differ between food preparations and portions."
- "Added pork fat/lard contains cholesterol and saturated fat."
- "Saturated fat can raise LDL cholesterol."
- "High blood cholesterol usually has no symptoms and requires a blood test."
- "Dizziness after a meal is not sufficient evidence that cholesterol rose; recurrent dizziness should be evaluated separately."

---

# 4. Evidence Anchors for the Web Content

## 4.1 Pork belly reference values

Use reference data only as **food-composition anchors**, not as exact values for a restaurant recipe.

One USDA-linked cooked pork belly dataset reports approximately:
- 404 kcal / 100 g
- 32.2 g total fat / 100 g
- 11.7 g saturated fat / 100 g
- 104 mg cholesterol / 100 g

A Philippine Food Composition Table entry for broiled pork belly reports:
- 213 kcal / 100 g
- 17.4 g total fat / 100 g
- 6.35 g saturated fat / 100 g
- 72 mg cholesterol / 100 g

The difference illustrates why the app must label values as **reference food-composition values**, not as the exact nutrition facts of a specific Bali dish.

## 4.2 Lard reference

USDA-linked lard data report approximately:
- 902 kcal / 100 g
- 100 g fat / 100 g
- 39.2 g saturated fat / 100 g
- 95 mg cholesterol / 100 g

This is useful for the interactive calculator. Example using a 72 mg/100 g pork-belly reference:
- +5 g lard ≈ +4.8 mg cholesterol and +2.0 g saturated fat
- +10 g lard ≈ +9.5 mg cholesterol and +3.9 g saturated fat
- +20 g lard ≈ +19 mg cholesterol and +7.8 g saturated fat

This demonstrates an important point: **added lard can materially increase saturated fat and calories while its direct cholesterol contribution may be much smaller than a simplistic "+50% cholesterol" story.**

## 4.3 Example of a ~40–50% difference

A USDA ARS dataset for 96% lean ground pork reports cholesterol of approximately:
- 59 mg / 100 g raw
- 78 mg / 100 g pan-browned crumbles
- 85 mg / 100 g pan-broiled patties

The 59 → 85 mg comparison is about **+44%**. This is an example that a 40–50% difference can occur in a food-composition comparison, but it is **not evidence that Bali babi guling is always 44% or 50% higher than plain fried pork**.

The UI should explicitly label this as:

> **"Contoh data pangan, bukan angka baku babi guling."**

---

# 5. Main Comparison Matrix

The main table should compare four conceptual variants:

| Variant | Meat base | Skin / visible fat | Added oil / lard | Bumbu | Dietary cholesterol | Saturated fat | Calories | Sodium | Interpretation |
|---|---|---|---|---|---|---|---|---|---|
| Babi goreng polos | Pork | Low–medium depending cut | Minimal / cooking oil only | None/minimal | Moderate–high depending cut | Moderate–high | Moderate–high | Low–medium | Baseline |
| Samsam goreng polos | Pork belly / samsam | Usually high | Minimal / cooking oil only | None/minimal | High | High | High | Low–medium | Fat-dense base |
| Babi guling lengkap | Mixed pork cuts | Often skin + visible fat | Recipe-dependent | Full Balinese spice mix + sides | Potentially higher per serving due to composition/portion | Often substantially higher | Often substantially higher | Often higher | Most variable |
| Samsam lengkap + minyak/bumbu | Pork belly / samsam | High | Lard/oil may be added | Full seasoning | High; recipe-dependent | Very high potential | Very high potential | Often higher | Highest fat-density scenario |

**Important UI note:** exact mg values should only appear when the serving's recipe/input is specified. Otherwise show **Low / Medium / High / Variable** and explain why.

---

# 6. Interactive Calculator

## 6.1 Inputs

Create a friendly slider-based calculator.

Inputs:
1. Pork portion: 50–300 g.
2. Cut: lean pork / mixed pork / samsam-pork-belly.
3. Skin & visible fat: none / some / lots.
4. Added lard/pork fat: 0–30 g.
5. Added vegetable oil: 0–30 g.
6. Bumbu/sauce: 0–100 g.
7. Complete meal toggle: rice + sides + sambal.

## 6.2 Outputs

Show four large cards:
- Estimated dietary cholesterol (mg)
- Saturated fat (g)
- Total fat (g)
- Energy (kcal)

Secondary card:
- Sodium estimate / recipe variability warning.

## 6.3 Calculation transparency

Every estimate must show:

> **Reference-based estimate — not laboratory analysis of a restaurant portion.**

A collapsible "How this estimate is built" panel should show the components used.

No hidden magic numbers. Store all reference constants in one JS data object.

---

# 7. The "40–50%?" Interactive Section

Create a highly visual section titled:

## "Jadi 40–50% itu benar atau tidak?"

Three states:

### State A — "Bisa"
Shows the USDA ARS ground-pork example where 59 → 85 mg/100 g is about +44%.

### State B — "Tapi bukan otomatis"
Shows that recipe, cooking method, cut, skin/fat, portion size and concentration from water loss all affect the final value.

### State C — "Yang lebih penting"
Shows that saturated fat is a major dietary factor affecting LDL, and overall eating pattern matters.

A small formula card:

> **% difference = (complete − plain) ÷ plain × 100%**

The user can drag two sample values and see the percentage update.

---

# 8. "Minyak Babi Itu Yang Beda" Section

This section directly addresses the common argument without attacking anyone.

Title:

> **"Apakah minyak/lemak tambahan benar-benar membuat perbedaan?"**

Visual: split bowl.

Left:
- Pork only
- Native pork fat
- Dietary cholesterol from pork

Right:
- Pork
- Added lard/fat
- Extra saturated fat
- Extra calories
- Some added dietary cholesterol

Key message:

> **Ya, tambahan lard/fat bisa membuat hidangan lebih berat secara nutrisi. Tetapi dampaknya tidak boleh disederhanakan menjadi "kolesterol naik 40–50%" hanya karena ada minyak.**

---

# 9. Symptom / Personal Experience Section

Title:

> **"Kalau setelah makan saya merasa pusing, apakah itu berarti kolesterol naik?"**

Answer:

> **Belum tentu.** High blood cholesterol usually has no symptoms. Dizziness has many possible causes and should not be used alone to infer a cholesterol spike.

The website can gently say:

> "Pengalaman pribadi tetap valid sebagai sinyal untuk memperhatikan pola makan, tetapi bukan alat diagnosis. Kalau pusing sering berulang, periksa tekanan darah, gula darah, profil lipid, dan faktor lain bersama tenaga kesehatan."

Do not diagnose the user.

---

# 10. Image Direction

The visual design should include food photography throughout the guide.

## Required image set

1. **Hero:** close-up Balinese babi guling with crispy skin.
2. **Babi guling complete plate:** rice, pork skin/meat, sambal, vegetables, traditional Balinese sides.
3. **Samsam guling:** close-up of pork belly/samsam with visible layers of skin, meat and fat.
4. **Samsam complete:** plated portion with bumbu and sauce/oil visible.
5. **Plain pork:** simple fried pork pieces without elaborate garnish.
6. **Ingredient anatomy:** pork + visible fat + skin + lard/oil + spice paste, ideally as a clean editorial still-life.

## Licensing rule

Prefer:
1. original/generated visuals, or
2. properly licensed / permission-cleared images.

Do not scrape and embed random web photographs directly into production without checking rights.

Web search visual references used during planning include examples from articles showing babi guling and samsam guling, but those should be treated as **reference imagery unless usage rights are confirmed**.

Suggested visual references:
- Balinese roast pork example: Tripatrek / Balinese Roast Pork.
- Complete babi guling plate: What's New Indonesia.
- Samsam guling: Bali Post / IDN Times examples.

---

# 11. UX / Information Architecture

Recommended navigation:

- Overview
- Polos vs Lengkap
- Apa yang berubah?
- Calculator
- 40–50%?
- Minyak & Saturated Fat
- Pengalaman Pusing
- Sources

On mobile, use a compact sticky tab/drawer.

Primary CTA:

> **"Bandingkan sekarang"**

Secondary CTA:

> **"Lihat sumber"**

---

# 12. Visual Design

## Design language

**Editorial + scientific + Balinese food culture.**

Avoid:
- hospital-like UI,
- generic nutrition dashboard aesthetics,
- aggressive red warning cards everywhere,
- cartoon pigs,
- sensational "DANGER" styling.

Use:
- warm food photography,
- deep charcoal / warm off-white surfaces,
- restrained earthy accent colors,
- thin rules,
- generous whitespace,
- bold large numerals for comparison,
- compact citations close to claims.

## Hero layout

Desktop:
- left: headline, short explanation, CTA
- right: large food image with subtle data overlays

Mobile:
- headline first
- image second
- comparison cards third

## Data visualizations

Use simple horizontal bars or grouped bars.

Do not imply laboratory precision when the inputs are estimates.

---

# 13. Components

Suggested reusable components:

- `SiteHeader`
- `HeroComparison`
- `FoodVariantCard`
- `ComparisonTable`
- `NutritionMetricCard`
- `IngredientBreakdown`
- `CalculatorPanel`
- `PercentDifferenceDemo`
- `EvidenceCallout`
- `SymptomDisclaimer`
- `SourceList`
- `ThemeToggle`
- `MobileDrawer`

Keep components modular even if implemented in vanilla HTML/CSS/JS.

---

# 14. Data Model (Frontend-only MVP)

```js
const foodReferences = {
  porkBellyCookedUSDA: {
    kcal: 404,
    fat: 32.2,
    saturatedFat: 11.7,
    cholesterol: 104,
    sodium: 448,
    basis: '100 g'
  },
  porkBellyBroiledPhilFCT: {
    kcal: 213,
    fat: 17.4,
    saturatedFat: 6.35,
    cholesterol: 72,
    sodium: 56,
    basis: '100 g'
  },
  lardUSDA: {
    kcal: 902,
    fat: 100,
    saturatedFat: 39.2,
    cholesterol: 95,
    sodium: 0,
    basis: '100 g'
  }
};
```

These are reference constants, not restaurant measurements.

---

# 15. Calculation Rules

1. Scale base food composition linearly by edible grams for MVP.
2. Scale added lard by grams.
3. Keep vegetable oil contribution at zero dietary cholesterol but add calories/fat according to the selected reference oil.
4. Treat bumbu as a separate variable because recipes vary greatly.
5. Never output more decimal precision than meaningful for an estimate.
6. Always label outputs as estimated/reference-based.
7. Add an uncertainty badge when a user selects "complete meal" because rice, sambal, skin, organ meats, and side dishes can change the total considerably.

---

# 16. Accessibility

Required:
- keyboard navigation,
- visible focus,
- semantic headings,
- `aria-label` for sliders,
- value announced in accessible text,
- minimum 44×44 px touch targets,
- reduced-motion support,
- adequate contrast,
- no color-only meaning.

---

# 17. Performance

Target:
- LCP < 2.5 s
- INP < 200 ms
- CLS < 0.1

Images:
- WebP/AVIF where possible.
- Explicit width/height to avoid layout shift.
- Lazy load below-the-fold images.
- Hero image gets priority loading.
- No giant unoptimized original photos.

Use lightweight vanilla HTML/CSS/JS for the MVP unless the project standards explicitly require another stack.

---

# 18. SEO / GEO

Suggested title:

> Babi Goreng vs Babi Guling & Samsam Lengkap: Kolesterol, Lemak, dan Minyak

Suggested meta description:

> Bandingkan babi goreng polos dengan babi guling dan samsam lengkap. Pahami dietary cholesterol, saturated fat, porsi, minyak babi, dan kenapa angka 40–50% tidak boleh dianggap sebagai angka baku.

Use clear citation-friendly headings and answer the main question near the top.

Add:
- `robots.txt`
- `sitemap.xml`
- `llms.txt`
- Open Graph metadata
- canonical URL

---

# 19. Content / Source Rules

Every substantive nutrition or health claim should have a nearby source label.

Primary sources preferred:
- American Heart Association (cholesterol / saturated fat / cardiovascular guidance)
- NHS / MedlinePlus (symptoms and testing)
- USDA / USDA ARS (food composition references)
- Philippine Food Composition Tables where useful for Southeast Asian food references

Food photos require separate rights checking.

---

# 20. Acceptance Criteria

## Product
- [ ] User can compare plain vs complete variants in under 10 seconds.
- [ ] User can change portion size.
- [ ] User can change added lard/fat.
- [ ] Nutrient cards update instantly.
- [ ] Percentage difference demo updates instantly.
- [ ] Sources are visible next to claims.

## Scientific integrity
- [ ] No universal 40–50% claim.
- [ ] 40–50% is shown only as a possible example supported by a clearly labeled food-composition example.
- [ ] Dietary cholesterol and blood cholesterol are explicitly separated.
- [ ] Saturated fat is explained as an important LDL-related factor.
- [ ] Dizziness is not presented as proof of a cholesterol spike.

## UX
- [ ] Mobile responsive.
- [ ] Dark/light mode if required by project template.
- [ ] Keyboard accessible.
- [ ] Reduced motion works.
- [ ] Mobile drawer works.
- [ ] No console errors.

## Performance
- [ ] No oversized images.
- [ ] Core Web Vitals tested.
- [ ] Images have dimensions.
- [ ] No layout shift from the comparison chart.

---

# 21. Antigravity Build Instruction

Before coding:

1. Read the project-root **SOP 1.9** and **Standar Coding 1.5** files supplied for this project.
2. Treat those documents as normative for architecture, file naming, headers, deployment, accessibility, performance, SEO/GEO, testing, and verification.
3. If the requested SOP 1.9 or Coding Standard 1.5 is absent, **do not invent a replacement standard silently**. Report the missing document before implementation.
4. Use this PRD as the product/content source of truth.
5. Build the MVP as a polished Interactive Guide / Knowledge Base, not as a generic nutrition dashboard.
6. Do not add authentication, backend, database, or analytics unless the project standards or later requirements explicitly require them.
7. Keep the calculator deterministic and transparent.
8. Every health/nutrition claim must be source-labeled.
9. Add loading/error/empty states where technically relevant.
10. Test desktop and mobile layouts, keyboard flow, reduced motion, and calculation edge cases.
11. Verify that the percentage demo never implies that 40–50% is a universal rule.
12. Use original/licensed images or generated images; do not hotlink arbitrary copyrighted photographs for production.

---

# 22. Suggested File Structure

```text
/
├─ index.html
├─ css/
│  ├─ base.css
│  ├─ components.css
│  └─ responsive.css
├─ js/
│  ├─ data.js
│  ├─ calculator.js
│  ├─ ui.js
│  └─ app.js
├─ assets/
│  ├─ img/
│  │  ├─ babi-guling-hero.webp
│  │  ├─ babi-guling-complete.webp
│  │  ├─ samsam-guling.webp
│  │  ├─ samsam-complete.webp
│  │  ├─ pork-plain.webp
│  │  └─ pork-fat-lard.webp
│  └─ favicon.svg
├─ robots.txt
├─ sitemap.xml
├─ llms.txt
└─ arsip/
```

For a multi-page static site, follow the supplied coding standard for active deploy filenames and versioning rules.

---

# 23. Copy Deck

## Hero
**Babi Goreng Polos vs Babi Guling / Samsam Lengkap**

**Yang berubah bukan cuma rasanya.**

Lihat bagaimana potongan daging, kulit, lemak, minyak/lemak tambahan, bumbu, dan ukuran porsi bisa mengubah profil nutrisinya.

CTA: **Bandingkan sekarang**

## Evidence strip
**40–50%? Bisa terjadi pada contoh tertentu. Bukan angka baku semua hidangan.**

## Bottom line
**Kalau mau membandingkan secara fair, samakan dulu gram dagingnya. Baru lihat tambahan kulit/lemak, minyak, bumbu, dan porsi lengkapnya.**

---

# 24. Final Product Principle

This is an **educational comparison site**, not a medical diagnosis site.

The strongest version of the argument is not:

> "Saya benar, babi guling pasti 50% lebih berkolesterol."

The stronger and more defensible message is:

> **"Babi guling/samsam lengkap bisa mempunyai profil nutrisi yang jauh lebih berat daripada versi polos, terutama ketika kulit/lemak dan lemak tambahan bertambah. Besarnya perbedaan kolesterol makanan tergantung bahan, resep, porsi, dan proses memasak; angka 40–50% bisa terjadi pada contoh tertentu tetapi bukan aturan universal."**

That is the statement the interactive website should make easy for a friend to verify.
