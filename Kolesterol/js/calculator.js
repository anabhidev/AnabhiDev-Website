// ================================================================
// AnabhiDev-PORKCHOLESTEROL — Meat & Cholesterol Interactive Comparison
// Vanilla JavaScript · Calculation Engine (Master PRD v1.4)
// Development · Anabhi Dev
// Version   : 1.4
// Generated : 10 September 2026, 08:20:00
// ================================================================

var PORK_CALCULATOR = (function() {
  'use strict';

  /**
   * Menghitung estimasi profil nutrisi babi berdasarkan input interaktif.
   * Linear dan transparan berdasarkan data acuan resmi PORK_DATA.
   */
  function calculateNutrition(params) {
    var p = Object.assign({
      portion: 100,
      cutType: 'mixed',
      skinFatLevel: 'some',
      lardGrams: 0,
      vegOilGrams: 0,
      bumbuGrams: 25,
      includeSides: false
    }, params);

    var refs = PORK_DATA.foodReferences;

    // 1. Potongan daging
    var meatRef;
    if (p.cutType === 'lean') {
      meatRef = refs.leanPorkCookedUSDA;
    } else if (p.cutType === 'belly') {
      meatRef = refs.porkBellyCookedUSDA;
    } else {
      meatRef = refs.mixedPorkCookedUSDA;
    }

    var meatRatio = p.portion / 100;
    var meatContrib = {
      label: 'Daging Babi (' + p.portion + ' g)',
      kcal: Math.round(meatRef.kcal * meatRatio),
      totalFat: Number((meatRef.totalFat * meatRatio).toFixed(1)),
      saturatedFat: Number((meatRef.saturatedFat * meatRatio).toFixed(1)),
      cholesterol: Math.round(meatRef.cholesterol * meatRatio),
      protein: Number((meatRef.protein * meatRatio).toFixed(1)),
      sodium: Math.round(meatRef.sodium * meatRatio)
    };

    // 2. Kulit & Lemak Tampak
    var skinGrams = 0;
    if (p.skinFatLevel === 'some') skinGrams = 15;
    if (p.skinFatLevel === 'lots') skinGrams = 30;

    var skinRatio = skinGrams / 100;
    var skinContrib = {
      label: 'Kulit & Lemak Tampak (' + skinGrams + ' g)',
      kcal: Math.round(560 * skinRatio),
      totalFat: Number((50.0 * skinRatio).toFixed(1)),
      saturatedFat: Number((18.5 * skinRatio).toFixed(1)),
      cholesterol: Math.round(105 * skinRatio),
      protein: Number((28.0 * skinRatio).toFixed(1)),
      sodium: Math.round(520 * skinRatio)
    };

    // 3. Minyak Babi (Lard)
    var lardRatio = p.lardGrams / 100;
    var lardContrib = {
      label: 'Ekstra Lemak Babi / Lard (' + p.lardGrams + ' g)',
      kcal: Math.round(refs.lardUSDA.kcal * lardRatio),
      totalFat: Number((refs.lardUSDA.totalFat * lardRatio).toFixed(1)),
      saturatedFat: Number((refs.lardUSDA.saturatedFat * lardRatio).toFixed(1)),
      cholesterol: Math.round(refs.lardUSDA.cholesterol * lardRatio),
      protein: 0,
      sodium: 0
    };

    // 4. Minyak Nabati
    var vegRatio = p.vegOilGrams / 100;
    var vegContrib = {
      label: 'Ekstra Minyak Nabati (' + p.vegOilGrams + ' g)',
      kcal: Math.round(refs.vegetableOilCooking.kcal * vegRatio),
      totalFat: Number((refs.vegetableOilCooking.totalFat * vegRatio).toFixed(1)),
      saturatedFat: Number((refs.vegetableOilCooking.saturatedFat * vegRatio).toFixed(1)),
      cholesterol: 0,
      protein: 0,
      sodium: 0
    };

    // 5. Bumbu Base Genep
    var bumbuRatio = p.bumbuGrams / 100;
    var bumbuContrib = {
      label: 'Bumbu Base Genep (' + p.bumbuGrams + ' g)',
      kcal: Math.round(refs.bumbuBaliBaseGenep.kcal * bumbuRatio),
      totalFat: Number((refs.bumbuBaliBaseGenep.totalFat * bumbuRatio).toFixed(1)),
      saturatedFat: Number((refs.bumbuBaliBaseGenep.saturatedFat * bumbuRatio).toFixed(1)),
      cholesterol: 0,
      protein: Number((refs.bumbuBaliBaseGenep.protein * bumbuRatio).toFixed(1)),
      sodium: Math.round(refs.bumbuBaliBaseGenep.sodium * bumbuRatio)
    };

    // 6. Pelengkap Nasi & Lawar
    var sidesContrib = {
      label: 'Paket Pelengkap Nasi & Lawar',
      kcal: p.includeSides ? refs.completeSidesBali.kcal : 0,
      totalFat: p.includeSides ? refs.completeSidesBali.totalFat : 0,
      saturatedFat: p.includeSides ? refs.completeSidesBali.saturatedFat : 0,
      cholesterol: p.includeSides ? refs.completeSidesBali.cholesterol : 0,
      protein: p.includeSides ? refs.completeSidesBali.protein : 0,
      sodium: p.includeSides ? refs.completeSidesBali.sodium : 0
    };

    var totalKcal = meatContrib.kcal + skinContrib.kcal + lardContrib.kcal + vegContrib.kcal + bumbuContrib.kcal + sidesContrib.kcal;
    var totalFat = Number((meatContrib.totalFat + skinContrib.totalFat + lardContrib.totalFat + vegContrib.totalFat + bumbuContrib.totalFat + sidesContrib.totalFat).toFixed(1));
    var totalSatFat = Number((meatContrib.saturatedFat + skinContrib.saturatedFat + lardContrib.saturatedFat + vegContrib.saturatedFat + bumbuContrib.saturatedFat + sidesContrib.saturatedFat).toFixed(1));
    var totalChol = meatContrib.cholesterol + skinContrib.cholesterol + lardContrib.cholesterol + vegContrib.cholesterol + bumbuContrib.cholesterol + sidesContrib.cholesterol;
    var totalProtein = Number((meatContrib.protein + skinContrib.protein + lardContrib.protein + vegContrib.protein + bumbuContrib.protein + sidesContrib.protein).toFixed(1));
    var totalSodium = meatContrib.sodium + skinContrib.sodium + lardContrib.sodium + vegContrib.sodium + bumbuContrib.sodium + sidesContrib.sodium;

    var baselineChol = 88;
    var cholDeltaPct = Math.round(((totalChol - baselineChol) / baselineChol) * 100);

    return {
      totals: {
        calories: totalKcal,
        totalFat: totalFat,
        saturatedFat: totalSatFat,
        cholesterol: totalChol,
        protein: totalProtein,
        sodium: totalSodium,
        cholDeltaPct: cholDeltaPct
      },
      components: [
        meatContrib,
        skinContrib,
        lardContrib,
        vegContrib,
        bumbuContrib,
        sidesContrib
      ],
      params: p
    };
  }

  /**
   * Menghitung persentase perbedaan formula interaktif:
   * % difference = ((complete - plain) / plain) * 100%
   */
  function calculatePercentageDelta(plainVal, completeVal) {
    if (plainVal <= 0) return 0;
    var diff = completeVal - plainVal;
    var pct = (diff / plainVal) * 100;
    return {
      diff: diff,
      percentage: Math.round(pct * 10) / 10,
      formulaText: '((' + completeVal + ' - ' + plainVal + ') ÷ ' + plainVal + ') × 100%'
    };
  }

  /**
   * Menskalakan nilai nutrisi makanan berdasarkan gramasi porsi
   * @param {Object} food - Objek makanan dari PORK_DATA.allFoods
   * @param {number} targetGrams - Porsi yang diinginkan (misal 50, 75, 100, 150, 200)
   */
  function scalePortion(food, targetGrams) {
    var baseGrams = food.portionGrams || 100;
    var ratio = targetGrams / baseGrams;
    return {
      food: food,
      targetGrams: targetGrams,
      calories: Math.round(food.calories * ratio),
      totalFat: Number((food.totalFat * ratio).toFixed(1)),
      saturatedFat: Number((food.saturatedFat * ratio).toFixed(1)),
      cholesterol: Math.round(food.cholesterol * ratio),
      protein: Number((food.protein * ratio).toFixed(1)),
      sodium: Math.round(food.sodium * ratio)
    };
  }

  /**
   * Menganalisis komparasi 2–4 makanan dan menghasilkan "Smart Comparison Summary"
   * (PRD v1.4 Section 18)
   */
  function analyzeMultiFoodComparison(foodIds) {
    var selected = [];
    foodIds.forEach(function(id) {
      var found = PORK_DATA.allFoods.find(function(f) { return f.id === id; });
      if (found) selected.push(found);
    });

    if (selected.length < 2) return null;

    // Cari nilai tertinggi dan terendah dalam dataset yang sedang dibandingkan
    var highestCal = selected.reduce(function(prev, curr) { return curr.calories > prev.calories ? curr : prev; });
    var highestFat = selected.reduce(function(prev, curr) { return curr.totalFat > prev.totalFat ? curr : prev; });
    var highestSat = selected.reduce(function(prev, curr) { return curr.saturatedFat > prev.saturatedFat ? curr : prev; });
    var highestChol = selected.reduce(function(prev, curr) { return curr.cholesterol > prev.cholesterol ? curr : prev; });
    var highestProt = selected.reduce(function(prev, curr) { return curr.protein > prev.protein ? curr : prev; });

    var lowestSat = selected.reduce(function(prev, curr) { return curr.saturatedFat < prev.saturatedFat ? curr : prev; });
    var lowestChol = selected.reduce(function(prev, curr) { return curr.cholesterol < prev.cholesterol ? curr : prev; });

    return {
      selectedFoods: selected,
      highest: {
        calories: highestCal,
        totalFat: highestFat,
        saturatedFat: highestSat,
        cholesterol: highestChol,
        protein: highestProt
      },
      lowest: {
        saturatedFat: lowestSat,
        cholesterol: lowestChol
      }
    };
  }

  return {
    calculateNutrition: calculateNutrition,
    calculatePercentageDelta: calculatePercentageDelta,
    scalePortion: scalePortion,
    analyzeMultiFoodComparison: analyzeMultiFoodComparison
  };
})();
