// ================================================================
// AnabhiDev-PORKCHOLESTEROL — Meat & Cholesterol Interactive Comparison
// Vanilla JavaScript · Nutrition Reference Data (Master PRD v1.4)
// Development · Anabhi Dev
// Version   : 1.4
// Generated : 10 September 2026, 08:20:00
// ================================================================

var PORK_DATA = (function() {
  'use strict';

  // 1. Acuan Komposisi Pangan Resmi (Food Composition Anchors)
  var foodReferences = {
    leanPorkCookedUSDA: {
      id: 'leanPorkCookedUSDA',
      name: 'Daging Babi Tanpa Lemak Matang (USDA FDC 168248)',
      basis: '100 g',
      kcal: 165,
      totalFat: 5.5,
      saturatedFat: 1.9,
      cholesterol: 80,
      protein: 27.0,
      sodium: 65,
      source: 'USDA FoodData Central'
    },
    mixedPorkCookedUSDA: {
      id: 'mixedPorkCookedUSDA',
      name: 'Daging Babi Potongan Campur Matang (USDA FDC)',
      basis: '100 g',
      kcal: 260,
      totalFat: 17.0,
      saturatedFat: 6.2,
      cholesterol: 88,
      protein: 24.5,
      sodium: 75,
      source: 'USDA FoodData Central'
    },
    porkBellyCookedUSDA: {
      id: 'porkBellyCookedUSDA',
      name: 'Pork Belly / Samsam Matang (USDA FDC 167885)',
      basis: '100 g',
      kcal: 404,
      totalFat: 32.2,
      saturatedFat: 11.7,
      cholesterol: 104,
      protein: 25.0,
      sodium: 448,
      source: 'USDA FoodData Central'
    },
    porkBellyBroiledPhilFCT: {
      id: 'porkBellyBroiledPhilFCT',
      name: 'Pork Belly Panggang (Philippine FCT 2019)',
      basis: '100 g',
      kcal: 213,
      totalFat: 17.4,
      saturatedFat: 6.35,
      cholesterol: 72,
      protein: 13.9,
      sodium: 56,
      source: 'Philippine Food Composition Tables (FNRI)'
    },
    lardUSDA: {
      id: 'lardUSDA',
      name: 'Minyak Lemak Babi / Lard Murni (USDA FDC 171401)',
      basis: '100 g',
      kcal: 902,
      totalFat: 100.0,
      saturatedFat: 39.2,
      cholesterol: 95,
      protein: 0.0,
      sodium: 0,
      source: 'USDA FoodData Central'
    },
    vegetableOilCooking: {
      id: 'vegetableOilCooking',
      name: 'Minyak Goreng Nabati (Kelapa Sawit/Kelapa)',
      basis: '100 g',
      kcal: 884,
      totalFat: 100.0,
      saturatedFat: 49.3,
      cholesterol: 0,
      protein: 0.0,
      sodium: 0,
      source: 'USDA FoodData Central & Kemenkes TKPI'
    },
    bumbuBaliBaseGenep: {
      id: 'bumbuBaliBaseGenep',
      name: 'Bumbu Base Genep Rempah Tradisional Bali',
      basis: '100 g',
      kcal: 115,
      totalFat: 6.5,
      saturatedFat: 1.2,
      cholesterol: 0,
      protein: 2.1,
      sodium: 620,
      source: 'Estimasi Nutrisi Pangan Rempah Tradisional'
    },
    completeSidesBali: {
      id: 'completeSidesBali',
      name: 'Pelengkap Paket Bali (Nasi 150g, Lawar 50g, Sambal Embe)',
      basis: '1 porsi pelengkap',
      kcal: 285,
      totalFat: 5.8,
      saturatedFat: 2.8,
      cholesterol: 6,
      protein: 6.2,
      sodium: 410,
      source: 'Estimasi Porsi Rumah Makan Tradisional'
    }
  };

  // 2. Empat Varian Utama (Pork Core Story)
  var comparisonVariants = [
    {
      id: 'babi-goreng-polos',
      name: 'Babi Goreng Polos',
      category: 'pork',
      subtitle: 'Daging babi goreng sederhana tanpa bumbu tebal',
      badge: 'Baseline Standar',
      badgeClass: 'badge-blue',
      image: 'assets/img/babi-goreng-polos.jpg?v=20260910a',
      meatCut: 'Daging campur (lean + sedikit lemak)',
      skinFat: 'Minimal (hanya lemak menempel)',
      addedOil: 'Minimal (sisa tirisan minyak)',
      bumbu: 'Garam & merica standar',
      calories: 275,
      totalFat: 18.5,
      saturatedFat: 6.8,
      cholesterol: 88,
      protein: 25.5,
      sodium: 180,
      portionBasis: '100 g',
      servingNote: 'Porsi ~100 g daging goreng matang',
      interpretation: 'Titik tolak (baseline). Kalori dan lemak berasal murni dari potongan daging dan sedikit minyak penggorengan standar.',
      source: 'USDA FoodData Central & Estimasi Pangan'
    },
    {
      id: 'samsam-goreng-polos',
      name: 'Samsam Goreng Polos',
      category: 'pork',
      subtitle: 'Pork belly roll goreng renyah tanpa kuah siraman',
      badge: 'Lemak Alami Tinggi',
      badgeClass: 'badge-amber',
      image: 'assets/img/samsam-goreng-polos.jpg?v=20260910a',
      meatCut: 'Pork belly / samcan berlapis tebal',
      skinFat: 'Tinggi (kulit krispi + lemak subkutan)',
      addedOil: 'Minimal (hanya hasil proses goreng)',
      bumbu: 'Bumbu marinasi sederhana, tanpa kuah',
      calories: 395,
      totalFat: 31.5,
      saturatedFat: 11.5,
      cholesterol: 98,
      protein: 23.0,
      sodium: 220,
      portionBasis: '100 g',
      servingNote: 'Porsi ~100 g potongan samsam matang',
      interpretation: 'Samcan secara alami memiliki rasio lemak jenuh dan kalori yang jauh lebih tinggi daripada daging paha/has.',
      source: 'USDA FDC Pork Belly & FCT Data'
    },
    {
      id: 'babi-guling-lengkap',
      name: 'Babi Guling Lengkap',
      category: 'pork',
      subtitle: 'Daging guling rempah, kulit super renyah, kuah, lawar & sambal',
      badge: 'Signature Bali',
      badgeClass: 'badge-teal',
      image: 'assets/img/babi-guling-lengkap.jpg?v=20260910a',
      meatCut: 'Daging guling panggang rempah campur',
      skinFat: 'Kulit garing renyah + lapisan lemak gurih',
      addedOil: 'Minyak bumbu panggangan & kuah balung',
      bumbu: 'Base genep kuning, lawar kelapa, sambal embe, urutan',
      calories: 540,
      totalFat: 36.0,
      saturatedFat: 13.8,
      cholesterol: 114,
      protein: 28.5,
      sodium: 690,
      portionBasis: '1 porsi lengkap',
      servingNote: 'Porsi 1 piring lengkap (daging, kulit, lauk pendamping)',
      interpretation: 'Bumbu rempah base genep dan sambal melipatgandakan sodium. Kulit renyah dan rempah babi menambah lemak jenuh dan kalori secara signifikan.',
      source: 'Estimasi Komposisi Sajian Tradisional Bali'
    },
    {
      id: 'samsam-lengkap-bumbu',
      name: 'Samsam Lengkap + Bumbu & Minyak',
      category: 'pork',
      subtitle: 'Samsam guling berlemak disiram minyak babi bumbu gurih',
      badge: 'Kepadatan Lemak Maksimal',
      badgeClass: 'badge-red',
      image: 'assets/img/samsam-lengkap-bumbu.jpg?v=20260910a',
      meatCut: 'Samsam roll / pork belly utuh berlemak',
      skinFat: 'Sangat tinggi (kulit garing + lemak tebal)',
      addedOil: 'Siraman minyak babi (lard) bumbu rempah (+15–20g)',
      bumbu: 'Bumbu genep kental, kuah lemak gurih, sambal embe',
      calories: 635,
      totalFat: 49.5,
      saturatedFat: 18.6,
      cholesterol: 124,
      protein: 24.0,
      sodium: 740,
      portionBasis: '1 porsi lengkap',
      servingNote: 'Porsi 1 piring samsam lengkap dengan kuah siraman',
      interpretation: 'Kombinasi samcan berlemak dengan siraman minyak babi (lard) berbumbu menghasilkan kepadatan kalori dan asam lemak jenuh tertinggi.',
      source: 'Estimasi Berbasis Komposisi Bahan USDA & FCT'
    }
  ];

  // 3. Expanded Comparison Universe (Master Dataset PRD v1.4 Section 3 & 8)
  var allFoods = [
    // --- PORK ---
    {
      id: 'babi-goreng-polos',
      name: 'Babi Goreng Polos',
      category: 'pork',
      categoryLabel: 'Babi',
      preparation: 'Goreng biasa (fried)',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 275,
      totalFat: 18.5,
      saturatedFat: 6.8,
      cholesterol: 88,
      protein: 25.5,
      sodium: 180,
      confidence: 'verified',
      image: 'assets/img/babi-goreng-polos.jpg?v=20260910a',
      source: 'USDA FDC 168248 & TKPI',
      notes: 'Baseline daging campur goreng standar tanpa kuah/bumbu tebal'
    },
    {
      id: 'samsam-goreng-polos',
      name: 'Samsam Goreng Polos',
      category: 'pork',
      categoryLabel: 'Babi',
      preparation: 'Goreng garing (crispy fried)',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 395,
      totalFat: 31.5,
      saturatedFat: 11.5,
      cholesterol: 98,
      protein: 23.0,
      sodium: 220,
      confidence: 'verified',
      image: 'assets/img/samsam-goreng-polos.jpg?v=20260910a',
      source: 'USDA FDC 167885 (Pork Belly)',
      notes: 'Pork belly dengan lapisan lemak subkutan tebal & kulit renyah'
    },
    {
      id: 'babi-guling-lengkap',
      name: 'Babi Guling Lengkap',
      category: 'pork',
      categoryLabel: 'Babi',
      preparation: 'Panggang guling + bumbu + lawar',
      portionBasis: '1 porsi (~150 g lauk)',
      portionGrams: 150,
      calories: 540,
      totalFat: 36.0,
      saturatedFat: 13.8,
      cholesterol: 114,
      protein: 28.5,
      sodium: 690,
      confidence: 'estimate',
      image: 'assets/img/babi-guling-lengkap.jpg?v=20260910a',
      source: 'Estimasi Komposisi Pangan Bali',
      notes: 'Daging guling, kulit krispi, bumbu base genep, lawar, sambal embe'
    },
    {
      id: 'samsam-lengkap-bumbu',
      name: 'Samsam Lengkap + Minyak Bumbu',
      category: 'pork',
      categoryLabel: 'Babi',
      preparation: 'Panggang + siram kuah babi',
      portionBasis: '1 porsi (~160 g)',
      portionGrams: 160,
      calories: 635,
      totalFat: 49.5,
      saturatedFat: 18.6,
      cholesterol: 124,
      protein: 24.0,
      sodium: 740,
      confidence: 'estimate',
      image: 'assets/img/samsam-lengkap-bumbu.jpg?v=20260910a',
      source: 'Permodelan USDA Lard & Belly',
      notes: 'Samcan guling berlemak disiram minyak babi (lard) bumbu gurih'
    },

    // --- CHICKEN ---
    {
      id: 'ayam-goreng',
      name: 'Ayam Goreng (Dada/Paha)',
      category: 'chicken',
      categoryLabel: 'Ayam',
      preparation: 'Goreng tradisional (fried with skin)',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 260,
      totalFat: 15.2,
      saturatedFat: 4.1,
      cholesterol: 85,
      protein: 28.0,
      sodium: 240,
      confidence: 'verified',
      image: 'assets/img/ayam-goreng.jpg?v=20260910a',
      source: 'USDA FDC 171116 (Fried Chicken)',
      notes: 'Si paling akrab di warung; kulit dan serapan minyak tetap menyumbang lemak'
    },
    {
      id: 'ayam-lalapan',
      name: 'Ayam Goreng Lalapan Lengkap',
      category: 'chicken',
      categoryLabel: 'Ayam',
      preparation: 'Goreng + sambal terasi + lalap',
      portionBasis: '1 porsi (~180 g)',
      portionGrams: 180,
      calories: 385,
      totalFat: 22.5,
      saturatedFat: 5.8,
      cholesterol: 115,
      protein: 36.5,
      sodium: 580,
      confidence: 'reference',
      image: 'assets/img/ayam-goreng.jpg?v=20260910a',
      source: 'Estimasi Porsi Warung Indonesia',
      notes: '1 potong ayam goreng utuh paha/dada beserta sambal terasi berminyak'
    },

    // --- DUCK ---
    {
      id: 'bebek-goreng',
      name: 'Bebek Goreng Crispy',
      category: 'duck',
      categoryLabel: 'Bebek',
      preparation: 'Ungkep & deep-fried',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 337,
      totalFat: 28.4,
      saturatedFat: 8.7,
      cholesterol: 89,
      protein: 19.0,
      sodium: 210,
      confidence: 'verified',
      image: 'assets/img/bebek-goreng.jpg?v=20260910a',
      source: 'USDA FDC 172443 & TKPI',
      notes: 'Secara alami memiliki lapisan lemak subkutan tebal di bawah kulitnya'
    },

    // --- BEEF ---
    {
      id: 'daging-sapi-goreng',
      name: 'Daging Sapi Goreng (Empal)',
      category: 'beef',
      categoryLabel: 'Sapi',
      preparation: 'Ungkep manis & digoreng',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 285,
      totalFat: 17.5,
      saturatedFat: 6.9,
      cholesterol: 92,
      protein: 29.5,
      sodium: 320,
      confidence: 'reference',
      image: 'assets/img/daging-sapi.jpg?v=20260910a',
      source: 'USDA FDC 170208 & TKPI',
      notes: 'Potongan daging sapi empal dengan minyak goreng dan bumbu rempah manis'
    },
    {
      id: 'daging-sapi-panggang',
      name: 'Daging Sapi Panggang / Rebus',
      category: 'beef',
      categoryLabel: 'Sapi',
      preparation: 'Panggang / rebus tanpa minyak',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 215,
      totalFat: 10.2,
      saturatedFat: 3.9,
      cholesterol: 78,
      protein: 30.5,
      sodium: 65,
      confidence: 'verified',
      image: 'assets/img/daging-sapi.jpg?v=20260910a',
      source: 'USDA FDC 170204 (Lean Beef Broiled)',
      notes: 'Contoh kontras cara memasak: tanpa penyerapan minyak goreng'
    },

    // --- SEAFOOD ---
    {
      id: 'udang-rebus',
      name: 'Udang Rebus / Kukus',
      category: 'seafood',
      categoryLabel: 'Seafood',
      preparation: 'Rebus / kukus polos (boiled)',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 99,
      totalFat: 0.3,
      saturatedFat: 0.1,
      cholesterol: 189, // Tinggi kolesterol makanan, TAPI hampir 0 lemak jenuh & rendah kalori!
      protein: 24.0,
      sodium: 111,
      confidence: 'verified',
      image: 'assets/img/udang-seafood.jpg?v=20260910a',
      source: 'USDA FDC 175180 (Shrimp Cooked)',
      notes: 'Bukti nyata: kolesterol makanan tinggi (189 mg), tetapi lemak jenuh hampir nol (0.1 g)!'
    },
    {
      id: 'udang-goreng',
      name: 'Udang Goreng Bumbu',
      category: 'seafood',
      categoryLabel: 'Seafood',
      preparation: 'Goreng dengan bumbu minyak',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 242,
      totalFat: 12.8,
      saturatedFat: 2.6,
      cholesterol: 195,
      protein: 21.5,
      sodium: 480,
      confidence: 'reference',
      image: 'assets/img/udang-seafood.jpg?v=20260910a',
      source: 'USDA FDC 175182 & TKPI',
      notes: 'Minyak penggorengan melipatgandakan kalori dan lemak total'
    },
    {
      id: 'ikan-bakar',
      name: 'Ikan Bakar Jimbaran',
      category: 'seafood',
      categoryLabel: 'Seafood',
      preparation: 'Panggang api arang + bumbu',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 142,
      totalFat: 4.8,
      saturatedFat: 1.2,
      cholesterol: 58,
      protein: 24.5,
      sodium: 240,
      confidence: 'reference',
      image: 'assets/img/ikan-bakar.jpg?v=20260910a',
      source: 'USDA FDC Fish Broiled & TKPI',
      notes: 'Lauk lean: tinggi protein, rendah kolesterol, sangat rendah lemak jenuh'
    },
    {
      id: 'ikan-goreng',
      name: 'Ikan Goreng Garing',
      category: 'seafood',
      categoryLabel: 'Seafood',
      preparation: 'Deep-fried',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 232,
      totalFat: 12.5,
      saturatedFat: 2.8,
      cholesterol: 70,
      protein: 22.0,
      sodium: 310,
      confidence: 'verified',
      image: 'assets/img/ikan-bakar.jpg?v=20260910a',
      source: 'USDA FDC Fried Fish',
      notes: 'Penyerapan minyak menaikkan kalori ~65% dibanding ikan bakar'
    },
    {
      id: 'cumi-masak',
      name: 'Cumi Bakar / Tumis Bumbu',
      category: 'seafood',
      categoryLabel: 'Seafood',
      preparation: 'Panggang / tumis pedas manis',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 158,
      totalFat: 3.2,
      saturatedFat: 0.8,
      cholesterol: 233, // Tinggi dietary cholesterol, rendah sat fat!
      protein: 30.0,
      sodium: 260,
      confidence: 'verified',
      image: 'assets/img/cumi-dish.jpg?v=20260910a',
      source: 'USDA FDC 174221 (Squid Cooked)',
      notes: 'Cumi kaya protein dan rendah kalori, tetapi dietary cholesterol alaminya sangat tinggi'
    },

    // --- GOAT / RED MEAT ---
    {
      id: 'daging-kambing',
      name: 'Daging Kambing (Sate / Panggang)',
      category: 'goat',
      categoryLabel: 'Kambing',
      preparation: 'Panggang api arang (tanpa lemak gajih)',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 143,
      totalFat: 3.0,
      saturatedFat: 0.9,
      cholesterol: 75,
      protein: 27.1,
      sodium: 86,
      confidence: 'verified',
      image: 'assets/img/daging-kambing.jpg?v=20260910a',
      source: 'USDA FDC 174347 (Goat Cooked)',
      notes: 'Kambing tanpa gajih justru lebih rendah lemak dibanding sapi/bebek!'
    },

    // --- EGG ---
    {
      id: 'telur-rebus',
      name: 'Telur Ayam (Rebus / Balado)',
      category: 'egg',
      categoryLabel: 'Telur',
      preparation: 'Rebus / balado (1 butir besar)',
      portionBasis: '1 butir (~50 g)',
      portionGrams: 50,
      calories: 74,
      totalFat: 5.0,
      saturatedFat: 1.6,
      cholesterol: 186, // Kolesterol terkonsentrasi di kuning telur
      protein: 6.3,
      sodium: 70,
      confidence: 'verified',
      image: 'assets/img/telur.svg?v=20260910a',
      source: 'USDA FDC 171287 (Whole Egg)',
      notes: '1 butir telur mengandung ~186 mg kolesterol (di kuning), namun lemak jenuhnya moderat'
    },

    // --- ORGAN MEAT (Special High-Cholesterol Reference) ---
    {
      id: 'hati-jeroan',
      name: 'Hati Sapi / Jeroan Masak',
      category: 'organ',
      categoryLabel: 'Jeroan',
      preparation: 'Ungkep / tumis gurih',
      portionBasis: '100 g',
      portionGrams: 100,
      calories: 191,
      totalFat: 5.3,
      saturatedFat: 1.9,
      cholesterol: 396, // Referensi ekstrem dietary cholesterol
      protein: 29.1,
      sodium: 79,
      confidence: 'verified',
      image: 'assets/img/jeroan.svg?v=20260910a',
      source: 'USDA FDC 169451 (Beef Liver Cooked)',
      notes: 'Special reference: organ hati hewan memproduksi dan menyaring kolesterol, sehingga dietary cholesterol alaminya paling masif'
    }
  ];

  // 4. Mini Stories Komparasi Lauk (PRD v1.4 Section 12)
  var miniStories = [
    {
      id: 'story-ayam',
      food: 'Ayam',
      icon: '🐔',
      tagline: 'Si paling aman di obrolan warung—tapi kulit dan minyak tetap ikut rapat.',
      body: 'Dada ayam tanpa kulit memang juara lean protein. Namun di warung makan Indonesia, ayam hampir selalu disajikan goreng kremes dengan kulit garing dan bumbu minyak lengkuas. Begitu kulit dan minyak masuk, kalori dan lemaknya langsung bersaing dengan potongan daging merah biasa!'
    },
    {
      id: 'story-bebek',
      food: 'Bebek',
      icon: '🦆',
      tagline: 'Bebek nggak salah apa-apa. Tapi bagian kulit dan cara masaknya bikin ceritanya beda.',
      body: 'Daging bebek punya serat lebih padat dan lapisan lemak subkutan tebal tepat di bawah kulit. Saat diungkep lama dan digoreng garing, lemaknya meleleh menyatu dengan bumbu hitam/sambal, menjadikannya salah satu hidangan paling gurih sekaligus paling padat energi.'
    },
    {
      id: 'story-sapi',
      food: 'Sapi',
      icon: '🐄',
      tagline: 'Sapi juga bukan satu angka tunggal. Potongan dagingnya matters!',
      body: 'Bandingkan sirloin/ribeye berlemak dengan tenderloin atau daging paha (round cut). Cara masak juga sangat menentukan: daging sapi rebus sup bening punya profil lemak yang jauh lebih ringan dibanding empal goreng manis yang menyerap minyak penggorengan.'
    },
    {
      id: 'story-udang',
      food: 'Udang & Cumi',
      icon: '🦐',
      tagline: 'Nah ini yang suka bikin orang kaget: seafood tidak otomatis berarti semua angka rendah.',
      body: 'Udang dan cumi rebus mengandung kolesterol makanan (dietary cholesterol) yang tinggi (~189–233 mg per 100 g). TAPI lemak jenuhnya hampir nol (0.1–0.8 g) dan kalorinya sangat rendah! Ini bukti konkret kenapa dietary cholesterol tidak boleh disamakan begitu saja dengan lemak jenuh.'
    }
  ];

  // 5. Mitos vs Fakta Lengkap (PRD v1.4 Section 21)
  var mythsFacts = [
    {
      id: 'myth-1',
      myth: '“Semua seafood pasti rendah kolesterol karena dari laut.”',
      fact: 'Mitos! Udang (189 mg/100g) dan cumi-cumi (233 mg/100g) justru memiliki kadar dietary cholesterol alami yang sangat tinggi, bahkan melebihi daging sapi. Namun kelebihannya, asam lemak jenuh (saturated fat) seafood sangat rendah jika dimasak kukus atau bakar tanpa minyak goreng berlebih.',
      highlight: 'Perhatikan jenis seafood: ikan sangat rendah kolesterol, sedangkan krustasea (udang, kepiting) dan cumi tinggi kolesterol makanan.'
    },
    {
      id: 'myth-2',
      myth: '“Babi goreng biasa dan babi guling pasti sama saja isi kolesterol dan lemaknya, kan sama-sama babi.”',
      fact: 'Jelas beda jauh! Babi guling lengkap menyertakan kulit garing, lapisan lemak bawah kulit, bumbu base genep yang ditumis dengan minyak/lemak, serta lauk pelengkap seperti urutan dan lawar. Semua ini mengubah total kalori, lemak jenuh, dan dietary cholesterol secara drastis dibandingkan babi goreng polos.',
      highlight: 'Perbedaan utama ada pada potongan daging, kulit, dan minyak bumbu pelengkap.'
    },
    {
      id: 'myth-3',
      myth: '“Kalau setelah makan babi guling leher tidak kaku dan kepala tidak pusing, berarti kolesterol darah saya aman.”',
      fact: 'Mitos klasik yang berbahaya! Kolesterol tinggi di dalam darah (hiperkolesterolemia) umumnya SAMA SEKALI TIDAK MEMILIKI GEJALA (asimtomatik). Rasa pusing atau leher pegal setelah makan lebih sering dipicu oleh tekanan darah naik (akibat sodium/garam tinggi pada bumbu), rasa begah, dehidrasi, atau pengalihan aliran darah ke lambung (postprandial somnolence).',
      highlight: 'Satu-satunya cara mengetahui kadar kolesterol tubuh adalah lewat cek darah di laboratorium medis!'
    },
    {
      id: 'myth-4',
      myth: '“Minyak goreng atau minyak babi tambahan pasti otomatis melipatgandakan angka kolesterol 40–50%.”',
      fact: 'Tidak sesederhana itu. Minyak nabati (sawit/kelapa) mengandung 0 mg kolesterol. Minyak babi (lard) memang mengandung kolesterol (~95 mg / 100g), tetapi bila ditambahkan 10g ke masakan, tambahan kolesterolnya hanya sekitar 9.5 mg. Yang melonjak drastis justru LEMAK JENUH (+3.9g) dan KALORI (+90 kkal), bukan kolesterol murni yang langsung berlipat ganda.',
      highlight: 'Minyak tambahan menambah kalori dan lemak jenuh dalam jumlah besar, sedangkan kenaikan kolesterol makanan bergantung sumber lemaknya.'
    },
    {
      id: 'myth-5',
      myth: '“Kolesterol di makanan (dietary cholesterol) akan langsung jadi kolesterol darah 1 banding 1.”',
      fact: 'Fisiologi tubuh manusia lebih cerdas dari itu. Sekitar 70%–80% kolesterol di dalam darah diproduksi sendiri oleh organ hati kita. Pemicu terbesar yang merangsang hati memproduksi lebih banyak kolesterol jahat (LDL) justru adalah asupan TINGGI LEMAK JENUH (saturated fat) dan lemak trans, bukan semata-mata angka kolesterol pada label makanan.',
      highlight: 'Perhatikan kadar lemak jenuh (saturated fat) dan total kalori porsi makanan, bukan cuma angka kolesterol makanannya.'
    }
  ];

  // 6. Sumber Rujukan Ilmiah (Citations)
  var scientificSources = [
    {
      title: 'USDA FoodData Central (FDC)',
      organization: 'U.S. Department of Agriculture, Agricultural Research Service',
      description: 'Data acuan laboratorium komposisi pangan untuk Pork Belly, Lean Pork, Chicken, Duck, Beef, Shrimp, Fish, Goat, Egg, dan Beef Liver.',
      url: 'https://fdc.nal.usda.gov/'
    },
    {
      title: 'Philippine Food Composition Tables (Phil FCT)',
      organization: 'Food and Nutrition Research Institute (FNRI-DOST)',
      description: 'Data komposisi pangan babi panggang dan hidangan Asia Tenggara berlemak.',
      url: 'https://iFnri.fnri.dost.gov.ph/'
    },
    {
      title: 'Dietary Cholesterol and Cardiovascular Risk: A Science Advisory',
      organization: 'American Heart Association (AHA)',
      description: 'Panduan ilmiah mengenai perbedaan dietary cholesterol terhadap kolesterol LDL darah, serta peran dominan asupan saturated fat.',
      url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000743'
    },
    {
      title: 'High Cholesterol Overview & Blood Testing Guidance',
      organization: 'National Health Service (NHS UK) & MedlinePlus',
      description: 'Fakta medis bahwa hiperkolesterolemia bersifat asimtomatik dan memerlukan pemeriksaan profil lipid darah berkala.',
      url: 'https://www.nhs.uk/conditions/high-cholesterol/'
    },
    {
      title: 'Tabel Komposisi Pangan Indonesia (TKPI)',
      organization: 'Kementerian Kesehatan Republik Indonesia (Kemenkes RI)',
      description: 'Daftar komposisi gizi bahan makanan Indonesia untuk daging ternak, unggas, ikan, minyak, dan rempah bumbu tradisional.',
      url: 'https://www.kemkes.go.id/'
    }
  ];

  return {
    foodReferences: foodReferences,
    comparisonVariants: comparisonVariants,
    allFoods: allFoods,
    miniStories: miniStories,
    mythsFacts: mythsFacts,
    scientificSources: scientificSources
  };
})();
