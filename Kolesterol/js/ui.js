// ================================================================
// AnabhiDev-PORKCHOLESTEROL — Meat & Cholesterol Interactive Comparison
// Vanilla JavaScript · UI Renderer & Interactive Components (Master PRD v1.4)
// Development · Anabhi Dev
// Version   : 1.4
// Generated : 10 September 2026, 08:20:00
// ================================================================

var PORK_UI = (function() {
  'use strict';

  var activeVariantIndex = 0;
  var selectedMultiFoodIds = ['babi-guling-lengkap', 'ayam-goreng', 'udang-rebus'];
  var currentSortCol = 'calories';
  var currentSortDir = 'desc';
  var currentTableFilter = 'all';

  /**
   * Render dan update tampilan komparasi 4 varian utama babi
   */
  function initComparisonVariants() {
    var container = document.getElementById('variantCardsGrid');
    var detailContainer = document.getElementById('variantDetailDisplay');
    if (!container || !detailContainer) return;

    var variants = PORK_DATA.comparisonVariants;
    container.innerHTML = '';

    variants.forEach(function(v, idx) {
      var card = document.createElement('article');
      card.className = 'variant-card' + (idx === activeVariantIndex ? ' active' : '');
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', idx === activeVariantIndex ? 'true' : 'false');
      card.setAttribute('data-index', idx);

      card.innerHTML =
        '<div class="vcard-img-wrap">' +
          '<img src="' + v.image + '" alt="' + v.name + '" width="400" height="300" loading="' + (idx < 2 ? 'eager' : 'lazy') + '">' +
          '<span class="vcard-badge ' + v.badgeClass + '">' + v.badge + '</span>' +
        '</div>' +
        '<div class="vcard-body">' +
          '<h3 class="vcard-title">' + v.name + '</h3>' +
          '<p class="vcard-sub">' + v.subtitle + '</p>' +
          '<div class="vcard-quick-stats">' +
            '<div class="qstat"><span class="qlabel">Kalori</span><strong class="qval">' + v.calories + ' <small>kkal</small></strong></div>' +
            '<div class="qstat"><span class="qlabel">Kolesterol</span><strong class="qval highlight">' + v.cholesterol + ' <small>mg</small></strong></div>' +
            '<div class="qstat"><span class="qlabel">Lemak Jenuh</span><strong class="qval">' + v.saturatedFat + ' <small>g</small></strong></div>' +
          '</div>' +
        '</div>';

      function selectCard() {
        activeVariantIndex = idx;
        var allCards = container.querySelectorAll('.variant-card');
        allCards.forEach(function(c, cIdx) {
          c.classList.toggle('active', cIdx === idx);
          c.setAttribute('aria-pressed', cIdx === idx ? 'true' : 'false');
        });
        renderVariantDetail(variants[idx]);
      }

      card.addEventListener('click', selectCard);
      card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectCard();
        }
      });

      container.appendChild(card);
    });

    renderVariantDetail(variants[activeVariantIndex]);
  }

  /**
   * Render detail visual & bar perbandingan untuk varian babi terpilih
   */
  function renderVariantDetail(v) {
    var display = document.getElementById('variantDetailDisplay');
    if (!display) return;

    var maxKcal = 800;
    var maxFat = 65;
    var maxSatFat = 25;
    var maxChol = 160;
    var maxProt = 40;
    var maxSod = 1000;

    var pctKcal = Math.min(100, Math.round((v.calories / maxKcal) * 100));
    var pctFat = Math.min(100, Math.round((v.totalFat / maxFat) * 100));
    var pctSatFat = Math.min(100, Math.round((v.saturatedFat / maxSatFat) * 100));
    var pctChol = Math.min(100, Math.round((v.cholesterol / maxChol) * 100));
    var pctProt = Math.min(100, Math.round((v.protein / maxProt) * 100));
    var pctSod = Math.min(100, Math.round((v.sodium / maxSod) * 100));

    var baseline = PORK_DATA.comparisonVariants[0];
    var diffText = '';
    if (v.id === 'babi-goreng-polos') {
      diffText = 'Ini adalah titik tolak (baseline) perbandingan kita. Belum ada siraman bumbu kuning base genep, kulit babi guling renyah, maupun minyak babi ekstra.';
    } else {
      var dChol = v.cholesterol - baseline.cholesterol;
      var dSat = (v.saturatedFat - baseline.saturatedFat).toFixed(1);
      var dCal = v.calories - baseline.calories;
      diffText = 'Dibandingkan babi goreng polos: <strong>+' + dCal + ' kkal</strong> energi, <strong>+' + dSat + ' g</strong> lemak jenuh, dan <strong>+' + dChol + ' mg</strong> estimasi dietary cholesterol. Perubahan terbesar disumbang oleh lapisan lemak/kulit dan siraman minyak bumbu rempah!';
    }

    display.innerHTML =
      '<div class="detail-header">' +
        '<div>' +
          '<span class="vcard-badge ' + v.badgeClass + '">' + v.badge + '</span>' +
          '<h3 class="detail-title">' + v.name + '</h3>' +
          '<p class="detail-serving"><span class="badge-serving">Basis Porsi:</span> ' + v.servingNote + '</p>' +
        '</div>' +
        '<div class="detail-tagline">' + v.interpretation + '</div>' +
      '</div>' +

      '<div class="bars-container">' +
        '<div class="bar-row">' +
          '<div class="bar-meta">' +
            '<span class="bar-label">Dietary Cholesterol (Kolesterol Makanan)</span>' +
            '<strong class="bar-val hi-chol">' + v.cholesterol + ' mg</strong>' +
          '</div>' +
          '<div class="bar-track"><div class="bar-fill bar-chol" style="width:' + pctChol + '%"></div></div>' +
          '<span class="bar-hint">Batas acuan umum: ~300 mg/hari (AHA merekomendasikan serendah mungkin dalam pola makan seimbang)</span>' +
        '</div>' +

        '<div class="bar-row">' +
          '<div class="bar-meta">' +
            '<span class="bar-label">Saturated Fat (Lemak Jenuh)</span>' +
            '<strong class="bar-val hi-sat">' + v.saturatedFat + ' g</strong>' +
          '</div>' +
          '<div class="bar-track"><div class="bar-fill bar-sat" style="width:' + pctSatFat + '%"></div></div>' +
          '<span class="bar-hint">🔴 Penting: Asupan lemak jenuh inilah yang paling merangsang hati memproduksi kolesterol LDL di darah!</span>' +
        '</div>' +

        '<div class="bar-row">' +
          '<div class="bar-meta">' +
            '<span class="bar-label">Total Fat (Lemak Total)</span>' +
            '<strong class="bar-val">' + v.totalFat + ' g</strong>' +
          '</div>' +
          '<div class="bar-track"><div class="bar-fill bar-fat" style="width:' + pctFat + '%"></div></div>' +
        '</div>' +

        '<div class="bar-row">' +
          '<div class="bar-meta">' +
            '<span class="bar-label">Kalori Total</span>' +
            '<strong class="bar-val">' + v.calories + ' kkal</strong>' +
          '</div>' +
          '<div class="bar-track"><div class="bar-fill bar-cal" style="width:' + pctKcal + '%"></div></div>' +
        '</div>' +

        '<div class="bar-row">' +
          '<div class="bar-meta">' +
            '<span class="bar-label">Protein</span>' +
            '<strong class="bar-val">' + v.protein + ' g</strong>' +
          '</div>' +
          '<div class="bar-track"><div class="bar-fill bar-prot" style="width:' + pctProt + '%"></div></div>' +
        '</div>' +

        '<div class="bar-row">' +
          '<div class="bar-meta">' +
            '<span class="bar-label">Sodium / Natrium</span>' +
            '<strong class="bar-val">' + v.sodium + ' mg</strong>' +
          '</div>' +
          '<div class="bar-track"><div class="bar-fill bar-sod" style="width:' + pctSod + '%"></div></div>' +
          '<span class="bar-hint">Bumbu rempah &amp; sambal menaikkan sodium secara signifikan. Asupan garam tinggi sering memicu kenaikan tekanan darah!</span>' +
        '</div>' +
      '</div>' +

      '<div class="detail-diff-box">' +
        '<div class="diff-icon">💡</div>' +
        '<div class="diff-body">' +
          '<strong>Apa yang sebenarnya berubah pada varian ini?</strong>' +
          '<p>' + diffText + '</p>' +
        '</div>' +
      '</div>';
  }

  /**
   * Render dan update tampilan Kalkulator Interaktif Babi
   */
  function updateCalculatorUI() {
    var portionInput = document.getElementById('calcPortion');
    var cutInput = document.getElementById('calcCut');
    var skinInput = document.getElementById('calcSkin');
    var lardInput = document.getElementById('calcLard');
    var vegOilInput = document.getElementById('calcVegOil');
    var bumbuInput = document.getElementById('calcBumbu');
    var sidesInput = document.getElementById('calcSides');

    if (!portionInput || !cutInput) return;

    var portionVal = Number(portionInput.value);
    var lardVal = Number(lardInput.value);
    var vegOilVal = Number(vegOilInput.value);
    var bumbuVal = Number(bumbuInput.value);

    var lblPortion = document.getElementById('valPortion');
    if (lblPortion) lblPortion.textContent = portionVal + ' g';

    var lblLard = document.getElementById('valLard');
    if (lblLard) lblLard.textContent = lardVal + ' g';

    var lblVegOil = document.getElementById('valVegOil');
    if (lblVegOil) lblVegOil.textContent = vegOilVal + ' g';

    var lblBumbu = document.getElementById('valBumbu');
    if (lblBumbu) lblBumbu.textContent = bumbuVal + ' g';

    var res = PORK_CALCULATOR.calculateNutrition({
      portion: portionVal,
      cutType: cutInput.value,
      skinFatLevel: skinInput.value,
      lardGrams: lardVal,
      vegOilGrams: vegOilVal,
      bumbuGrams: bumbuVal,
      includeSides: sidesInput.checked
    });

    var outChol = document.getElementById('outChol');
    var outSatFat = document.getElementById('outSatFat');
    var outTotalFat = document.getElementById('outTotalFat');
    var outKcal = document.getElementById('outKcal');
    var outProtein = document.getElementById('outProtein');
    var outSodium = document.getElementById('outSodium');
    var outDeltaBadge = document.getElementById('outDeltaBadge');

    if (outChol) outChol.textContent = res.totals.cholesterol;
    if (outSatFat) outSatFat.textContent = res.totals.saturatedFat;
    if (outTotalFat) outTotalFat.textContent = res.totals.totalFat;
    if (outKcal) outKcal.textContent = res.totals.calories;
    if (outProtein) outProtein.textContent = res.totals.protein;
    if (outSodium) outSodium.textContent = res.totals.sodium;

    if (outDeltaBadge) {
      var d = res.totals.cholDeltaPct;
      var sign = d > 0 ? '+' : '';
      outDeltaBadge.textContent = sign + d + '% vs Baseline Polos';
      outDeltaBadge.className = 'calc-badge ' + (d > 30 ? 'badge-warn' : (d > 0 ? 'badge-info' : 'badge-neutral'));
    }

    var breakdownTableBody = document.getElementById('calcBreakdownBody');
    if (breakdownTableBody) {
      breakdownTableBody.innerHTML = '';
      res.components.forEach(function(comp) {
        if (comp.kcal === 0 && comp.cholesterol === 0 && comp.totalFat === 0) return;
        var tr = document.createElement('tr');
        tr.innerHTML =
          '<td><strong>' + comp.label + '</strong></td>' +
          '<td>' + comp.cholesterol + ' mg</td>' +
          '<td>' + comp.saturatedFat + ' g</td>' +
          '<td>' + comp.totalFat + ' g</td>' +
          '<td>' + comp.kcal + ' kkal</td>' +
          '<td>' + comp.protein + ' g</td>' +
          '<td>' + comp.sodium + ' mg</td>';
        breakdownTableBody.appendChild(tr);
      });
    }

    var uncertaintyBanner = document.getElementById('calcUncertaintyBanner');
    if (uncertaintyBanner) {
      uncertaintyBanner.style.display = sidesInput.checked ? 'flex' : 'none';
    }
  }

  /**
   * Render dan update Simulasi Live Persentase 40–50%
   */
  function updatePercentDeltaDemo() {
    var plainSlider = document.getElementById('deltaPlainSlider');
    var compSlider = document.getElementById('deltaCompSlider');
    if (!plainSlider || !compSlider) return;

    var plainVal = Number(plainSlider.value);
    var compVal = Number(compSlider.value);

    var plainDisplay = document.getElementById('deltaPlainVal');
    var compDisplay = document.getElementById('deltaCompVal');
    var pctDisplay = document.getElementById('deltaResultPct');
    var formulaDisplay = document.getElementById('deltaFormulaText');
    var explDisplay = document.getElementById('deltaExplText');

    if (plainDisplay) plainDisplay.textContent = plainVal + ' mg';
    if (compDisplay) compDisplay.textContent = compVal + ' mg';

    var calc = PORK_CALCULATOR.calculatePercentageDelta(plainVal, compVal);

    if (pctDisplay) {
      var sign = calc.percentage > 0 ? '+' : '';
      pctDisplay.textContent = sign + calc.percentage + '%';
      pctDisplay.className = 'pct-big ' + (calc.percentage >= 40 && calc.percentage <= 55 ? 'highlight-gold' : '');
    }

    if (formulaDisplay) {
      formulaDisplay.textContent = calc.formulaText + ' = ' + (calc.percentage > 0 ? '+' : '') + calc.percentage + '%';
    }

    if (explDisplay) {
      if (calc.percentage >= 40 && calc.percentage <= 50) {
        explDisplay.innerHTML = '✨ <strong>Cocok dengan rentang 40–50%:</strong> Angka ini membuktikan bahwa perbedaan 40–50% <em>secara matematis bisa terjadi</em> pada perbandingan tertentu (seperti data USDA ARS 59 → 85 mg = +44% saat daging kehilangan kadar air), tetapi angka ini <strong>bukan rumus baku universal untuk semua babi guling!</strong>';
      } else if (calc.percentage > 50) {
        explDisplay.innerHTML = '📈 <strong>Lebih dari +50%:</strong> Terjadi bila pembanding awalnya adalah daging sangat tanpa lemak (lean), lalu dibandingkan dengan porsi samsam lengkap berlemak ganda.';
      } else if (calc.percentage > 0) {
        explDisplay.innerHTML = '📊 <strong>Kenaikan moderat (+' + calc.percentage + '%):</strong> Terjadi pada porsi babi guling wajar dengan potongan daging berimbang dan minyak bumbu secukupnya.';
      } else {
        explDisplay.innerHTML = '⚖️ Nilai varian lengkap sama atau lebih rendah dari pembanding.';
      }
    }
  }

  /**
   * Init Tab pada Bagian "Jadi 40–50% Itu Benar atau Tidak?"
   */
  function initPercentTabs() {
    var tabBtns = document.querySelectorAll('.state-tab-btn');
    var tabPanels = document.querySelectorAll('.state-tab-panel');
    if (!tabBtns.length) return;

    tabBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var targetId = btn.getAttribute('data-target');
        tabBtns.forEach(function(b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tabPanels.forEach(function(p) {
          p.classList.remove('active');
          p.hidden = true;
        });

        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        var targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.hidden = false;
        }
      });
    });
  }

  /**
   * Interactive Split View Minyak & Lemak
   */
  function initSplitBowlView() {
    var lardToggle = document.getElementById('splitLardToggle');
    var oilToggle = document.getElementById('splitOilToggle');
    var rightChol = document.getElementById('splitRightChol');
    var rightSatFat = document.getElementById('splitRightSatFat');
    var rightCal = document.getElementById('splitRightCal');
    var splitInsight = document.getElementById('splitInsightText');

    if (!lardToggle || !oilToggle) return;

    function updateSplit() {
      var isLard = lardToggle.checked;
      var isOil = oilToggle.checked;

      var chol = 104;
      var satFat = 11.7;
      var cal = 404;

      if (isLard) {
        chol += 14;
        satFat += 5.9;
        cal += 135;
      }
      if (isOil) {
        satFat += 7.4;
        cal += 133;
      }

      if (rightChol) rightChol.textContent = chol + ' mg';
      if (rightSatFat) rightSatFat.textContent = satFat.toFixed(1) + ' g';
      if (rightCal) rightCal.textContent = cal + ' kkal';

      if (splitInsight) {
        if (isLard && !isOil) {
          splitInsight.innerHTML = '<strong>Efek 15g Minyak Babi (Lard):</strong> Menyumbang <strong>+14 mg kolesterol</strong> makanan, tapi melompatkan lemak jenuh sebesar <strong>+5.9 g</strong> dan kalori <strong>+135 kkal</strong>. Perubahan lemak jenuh dan kalorinya jauh lebih dominan dibanding kolesterolnya!';
        } else if (!isLard && isOil) {
          splitInsight.innerHTML = '<strong>Efek 15g Minyak Nabati:</strong> Kolesterol makanan <strong>TIDAK BERTAMBAH SAMA SEKALI (0 mg)</strong> karena tumbuhan bebas kolesterol! Namun kalori dan lemak total tetap naik tinggi.';
        } else if (isLard && isOil) {
          splitInsight.innerHTML = '<strong>Kombinasi Ekstra Lemak Babi + Minyak Goreng:</strong> Tambahan lemak total melimpah (+270 kkal, +13.3g lemak jenuh), hidangan terasa sangat berat dan lambat dicerna.';
        } else {
          splitInsight.innerHTML = 'Mangkuk kanan hanya berisi samcan babi standar tanpa siraman minyak tambahan.';
        }
      }
    }

    lardToggle.addEventListener('change', updateSplit);
    oilToggle.addEventListener('change', updateSplit);
    updateSplit();
  }

  /**
   * Render Mini Stories Komparasi Lauk (PRD v1.4 Section 12)
   */
  function renderMiniStories() {
    var container = document.getElementById('miniStoriesGrid');
    if (!container) return;

    container.innerHTML = '';
    PORK_DATA.miniStories.forEach(function(s) {
      var col = document.createElement('article');
      col.className = 'story-card';
      col.innerHTML =
        '<div class="story-icon">' + s.icon + '</div>' +
        '<h3 class="story-food">' + s.food + '</h3>' +
        '<div class="story-tagline">“' + s.tagline + '”</div>' +
        '<p class="story-body">' + s.body + '</p>';
      container.appendChild(col);
    });
  }

  /**
   * Render Multi-Food Comparator (Compare 2-4 Foods, PRD v1.4 Section 6 & 17)
   */
  function initMultiFoodComparator() {
    var chipsContainer = document.getElementById('multiFoodChips');
    var cardsContainer = document.getElementById('multiFoodCards');
    var summaryContainer = document.getElementById('multiFoodSummary');
    if (!chipsContainer || !cardsContainer || !summaryContainer) return;

    // Render chips untuk semua makanan
    chipsContainer.innerHTML = '';
    PORK_DATA.allFoods.forEach(function(f) {
      var chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'food-chip' + (selectedMultiFoodIds.indexOf(f.id) !== -1 ? ' active' : '');
      chip.setAttribute('data-id', f.id);
      chip.innerHTML = f.name;

      chip.addEventListener('click', function() {
        var idx = selectedMultiFoodIds.indexOf(f.id);
        if (idx !== -1) {
          // Unselect (minimal 2 makanan tetap terpilih)
          if (selectedMultiFoodIds.length > 2) {
            selectedMultiFoodIds.splice(idx, 1);
            chip.classList.remove('active');
          }
        } else {
          // Select (maksimal 4 makanan)
          if (selectedMultiFoodIds.length < 4) {
            selectedMultiFoodIds.push(f.id);
            chip.classList.add('active');
          } else {
            // Ganti item terakhir
            var removedId = selectedMultiFoodIds.shift();
            var prevChip = chipsContainer.querySelector('[data-id="' + removedId + '"]');
            if (prevChip) prevChip.classList.remove('active');
            selectedMultiFoodIds.push(f.id);
            chip.classList.add('active');
          }
        }
        renderMultiFoodDisplay();
      });

      chipsContainer.appendChild(chip);
    });

    renderMultiFoodDisplay();
  }

  /**
   * Update tampilan kartu komparasi 2-4 makanan & Smart Summary
   */
  function renderMultiFoodDisplay() {
    var cardsContainer = document.getElementById('multiFoodCards');
    var summaryContainer = document.getElementById('multiFoodSummary');
    if (!cardsContainer || !summaryContainer) return;

    var analysis = PORK_CALCULATOR.analyzeMultiFoodComparison(selectedMultiFoodIds);
    if (!analysis) return;

    // Render cards
    cardsContainer.innerHTML = '';
    analysis.selectedFoods.forEach(function(f) {
      var card = document.createElement('div');
      card.className = 'mfood-card';
      card.innerHTML =
        '<div class="mfood-img-wrap">' +
          '<img src="' + f.image + '" alt="' + f.name + '" width="300" height="225" loading="lazy">' +
          '<span class="vcard-badge badge-teal">' + f.categoryLabel + '</span>' +
        '</div>' +
        '<div class="mfood-body">' +
          '<h4 class="mfood-name">' + f.name + '</h4>' +
          '<div class="mfood-prep"><small>Masak: ' + f.preparation + ' (' + f.portionBasis + ')</small></div>' +
          '<div class="mfood-metrics">' +
            '<div class="mmetric"><span class="mlbl">Kalori</span><strong class="mval">' + f.calories + ' <small>kkal</small></strong></div>' +
            '<div class="mmetric"><span class="mlbl">Total Lemak</span><strong class="mval">' + f.totalFat + ' <small>g</small></strong></div>' +
            '<div class="mmetric highlight-sat"><span class="mlbl">Lemak Jenuh</span><strong class="mval">' + f.saturatedFat + ' <small>g</small></strong></div>' +
            '<div class="mmetric highlight-chol"><span class="mlbl">Kolesterol</span><strong class="mval">' + f.cholesterol + ' <small>mg</small></strong></div>' +
            '<div class="mmetric"><span class="mlbl">Protein</span><strong class="mval">' + f.protein + ' <small>g</small></strong></div>' +
            '<div class="mmetric"><span class="mlbl">Sodium</span><strong class="mval">' + f.sodium + ' <small>mg</small></strong></div>' +
          '</div>' +
          '<div class="mfood-notes"><small>' + f.notes + '</small></div>' +
        '</div>';
      cardsContainer.appendChild(card);
    });

    // Smart Summary: "Yang Paling Beda di Sini?" (PRD v1.4 Section 18)
    summaryContainer.innerHTML =
      '<div class="smart-summary-card">' +
        '<h4>💡 Yang Paling Beda di Pilihan Ini? (Tertinggi dalam Dataset Terpilih)</h4>' +
        '<div class="smart-summary-grid">' +
          '<div class="ss-item"><span>Tertinggi Kalori</span><strong>' + analysis.highest.calories.name + ' (' + analysis.highest.calories.calories + ' kkal)</strong></div>' +
          '<div class="ss-item"><span>Tertinggi Lemak Jenuh</span><strong style="color:var(--red-warn);">' + analysis.highest.saturatedFat.name + ' (' + analysis.highest.saturatedFat.saturatedFat + ' g)</strong></div>' +
          '<div class="ss-item"><span>Tertinggi Kolesterol</span><strong style="color:var(--accent);">' + analysis.highest.cholesterol.name + ' (' + analysis.highest.cholesterol.cholesterol + ' mg)</strong></div>' +
          '<div class="ss-item"><span>Tertinggi Protein</span><strong>' + analysis.highest.protein.name + ' (' + analysis.highest.protein.protein + ' g)</strong></div>' +
        '</div>' +
        '<p class="ss-caveat"><em>*Catatan: Label "tertinggi" adalah fakta statistik komparasi porsi dalam pilihan aktif di atas, bukan cap "paling tidak sehat", karena nilai nutrisi selalu bergantung pada ukuran porsi dan kebutuhan harian masing-masing tubuh.</em></p>' +
      '</div>';
  }

  /**
   * Render Portion Simulator (PRD v1.4 Section 19)
   */
  function initPortionSimulator() {
    var selectFood = document.getElementById('portionFoodSelect');
    var slider = document.getElementById('portionSlider');
    var valDisplay = document.getElementById('portionValDisplay');
    var outGrid = document.getElementById('portionOutGrid');
    if (!selectFood || !slider || !outGrid) return;

    // Populate select
    selectFood.innerHTML = '';
    PORK_DATA.allFoods.forEach(function(f) {
      var opt = document.createElement('option');
      opt.value = f.id;
      opt.textContent = f.name + ' (' + f.categoryLabel + ')';
      selectFood.appendChild(opt);
    });
    selectFood.value = 'babi-guling-lengkap';

    function updatePortionView() {
      var targetGrams = Number(slider.value);
      if (valDisplay) valDisplay.textContent = targetGrams + ' gram';

      var food = PORK_DATA.allFoods.find(function(f) { return f.id === selectFood.value; });
      if (!food) return;

      var scaled = PORK_CALCULATOR.scalePortion(food, targetGrams);

      outGrid.innerHTML =
        '<div class="ps-metric-card featured">' +
          '<span>Dietary Cholesterol</span>' +
          '<strong>' + scaled.cholesterol + ' <small>mg</small></strong>' +
        '</div>' +
        '<div class="ps-metric-card featured">' +
          '<span>Saturated Fat</span>' +
          '<strong>' + scaled.saturatedFat + ' <small>g</small></strong>' +
        '</div>' +
        '<div class="ps-metric-card">' +
          '<span>Total Lemak</span>' +
          '<strong>' + scaled.totalFat + ' <small>g</small></strong>' +
        '</div>' +
        '<div class="ps-metric-card">' +
          '<span>Kalori</span>' +
          '<strong>' + scaled.calories + ' <small>kkal</small></strong>' +
        '</div>' +
        '<div class="ps-metric-card">' +
          '<span>Protein</span>' +
          '<strong>' + scaled.protein + ' <small>g</small></strong>' +
        '</div>' +
        '<div class="ps-metric-card">' +
          '<span>Sodium</span>' +
          '<strong>' + scaled.sodium + ' <small>mg</small></strong>' +
        '</div>';
    }

    selectFood.addEventListener('change', updatePortionView);
    slider.addEventListener('input', updatePortionView);
    updatePortionView();
  }

  /**
   * Render Cooking Method Simulator (PRD v1.4 Section 20)
   */
  function initCookingMethodSimulator() {
    var buttons = document.querySelectorAll('.cook-method-btn');
    var display = document.getElementById('cookingMethodDisplay');
    if (!buttons.length || !display) return;

    var methods = {
      rebus: {
        title: 'Rebus / Kukus (Boiled / Steamed)',
        badge: 'Paling Rendah Lemak Tambahan',
        desc: 'Tanpa minyak goreng. Lemak alami mencair keluar ke air rebusan. Kolesterol makanan tetap berada di jaringan daging, tetapi lemak total dan kalori berada pada titik terendah.',
        calEffect: 'Baseline (+0 kkal)',
        fatEffect: 'Lemak berkurang (-10% hingga -25%)',
        cholEffect: 'Tidak bertambah'
      },
      bakar: {
        title: 'Panggang / Bakar Api (Grilled / Broiled)',
        badge: 'Lemak Meleleh Keluar',
        desc: 'Sebagian besar lemak subkutan menetes keluar saat dipanggang. Namun jika diolesi kecap manis berminyak atau mentega, kalori dan sodium dapat meningkat dari bumbu olesan.',
        calEffect: 'Moderat (+50 kkal dari bumbu olesan)',
        fatEffect: 'Lemak alami menetes keluar',
        cholEffect: 'Tidak bertambah'
      },
      goreng: {
        title: 'Goreng Biasa (Pan-Fried)',
        badge: 'Menyerap Minyak Sedang',
        desc: 'Daging atau lauk menyerap minyak goreng (+5g hingga +10g per potong). Minyak nabati tidak menambah kolesterol (0 mg kolesterol), tetapi menaikkan kalori (+45 hingga +90 kkal) dan total lemak secara nyata.',
        calEffect: 'Meningkat (+70–120 kkal)',
        fatEffect: 'Total lemak naik (+8–14 g)',
        cholEffect: '0 mg jika minyak nabati'
      },
      deepfried: {
        title: 'Goreng Garing Tepung (Deep-Fried Crispy)',
        badge: 'Penyerapan Minyak Tertinggi',
        desc: 'Lapisan tepung krispi bertindak seperti spons yang menyerap minyak goreng dalam jumlah masif (+15g hingga +25g minyak). Kalori dan lemak total melonjak tajam.',
        calEffect: 'Melonjak (+150–250 kkal)',
        fatEffect: 'Lemak total melipatgandakan diri',
        cholEffect: '0 mg jika minyak nabati, namun lemak jenuh sawit tinggi'
      }
    };

    function renderMethod(methodKey) {
      var m = methods[methodKey];
      if (!m) return;

      display.innerHTML =
        '<div class="cook-method-card">' +
          '<div class="cm-head">' +
            '<h4>' + m.title + '</h4>' +
            '<span class="vcard-badge badge-teal">' + m.badge + '</span>' +
          '</div>' +
          '<p class="cm-desc">' + m.desc + '</p>' +
          '<div class="cm-effects-grid">' +
            '<div class="cm-eff"><span>Efek Kalori</span><strong>' + m.calEffect + '</strong></div>' +
            '<div class="cm-eff"><span>Efek Lemak</span><strong>' + m.fatEffect + '</strong></div>' +
            '<div class="cm-eff"><span>Efek Kolesterol</span><strong>' + m.cholEffect + '</strong></div>' +
          '</div>' +
        '</div>';
    }

    buttons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        buttons.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderMethod(btn.getAttribute('data-method'));
      });
    });

    renderMethod('bakar');
  }

  /**
   * Render Master Nutrition Comparison Table (PRD v1.4 Section 8 & 25)
   */
  function renderComparisonTable() {
    var tbody = document.getElementById('compTableBody');
    var mobileCardsContainer = document.getElementById('compMobileCards');
    if (!tbody || !mobileCardsContainer) return;

    // Filter foods
    var filtered = PORK_DATA.allFoods.filter(function(f) {
      if (currentTableFilter === 'all') return true;
      return f.category === currentTableFilter;
    });

    // Sort foods
    filtered.sort(function(a, b) {
      var valA = a[currentSortCol];
      var valB = b[currentSortCol];
      if (typeof valA === 'string') {
        return currentSortDir === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return currentSortDir === 'asc' ? (valA - valB) : (valB - valA);
    });

    tbody.innerHTML = '';
    mobileCardsContainer.innerHTML = '';

    filtered.forEach(function(v) {
      // Desktop Table Row
      var tr = document.createElement('tr');
      tr.innerHTML =
        '<td class="td-name">' +
          '<strong>' + v.name + '</strong>' +
          '<span class="vcard-badge badge-blue">' + v.categoryLabel + '</span>' +
        '</td>' +
        '<td>' + v.preparation + '</td>' +
        '<td>' + v.portionBasis + '</td>' +
        '<td class="num-cell"><strong>' + v.calories + '</strong></td>' +
        '<td class="num-cell">' + v.totalFat + ' g</td>' +
        '<td class="num-cell highlight-sat">' + v.saturatedFat + ' g</td>' +
        '<td class="num-cell highlight-chol"><strong>' + v.cholesterol + ' mg</strong></td>' +
        '<td class="num-cell">' + v.protein + ' g</td>' +
        '<td class="num-cell">' + v.sodium + ' mg</td>' +
        '<td class="td-note"><small>' + v.notes + '</small></td>' +
        '<td class="td-source"><small>' + v.source + '</small></td>';
      tbody.appendChild(tr);

      // Mobile Card
      var mcard = document.createElement('article');
      mcard.className = 'table-mobile-card';
      mcard.innerHTML =
        '<div class="tmc-header">' +
          '<h4>' + v.name + '</h4>' +
          '<span class="vcard-badge badge-teal">' + v.categoryLabel + '</span>' +
        '</div>' +
        '<p class="tmc-sub">Masak: ' + v.preparation + ' (' + v.portionBasis + ')</p>' +
        '<div class="tmc-grid">' +
          '<div class="tmc-item"><span>Kalori</span><strong>' + v.calories + ' kkal</strong></div>' +
          '<div class="tmc-item highlight-chol"><span>Kolesterol</span><strong>' + v.cholesterol + ' mg</strong></div>' +
          '<div class="tmc-item highlight-sat"><span>Lemak Jenuh</span><strong>' + v.saturatedFat + ' g</strong></div>' +
          '<div class="tmc-item"><span>Total Lemak</span><strong>' + v.totalFat + ' g</strong></div>' +
          '<div class="tmc-item"><span>Protein</span><strong>' + v.protein + ' g</strong></div>' +
          '<div class="tmc-item"><span>Sodium</span><strong>' + v.sodium + ' mg</strong></div>' +
        '</div>' +
        '<div class="tmc-detail">' +
          '<div class="tmc-note">' + v.notes + '</div>' +
          '<small style="color:var(--muted); margin-top:4px; display:block;">Sumber: ' + v.source + '</small>' +
        '</div>';
      mobileCardsContainer.appendChild(mcard);
    });
  }

  /**
   * Filter & Sort Handler untuk Master Table
   */
  function initTableControls() {
    var filterBtns = document.querySelectorAll('.table-filter-btn');
    var sortHeaders = document.querySelectorAll('table.comp-table th[data-sort]');

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        currentTableFilter = btn.getAttribute('data-cat');
        renderComparisonTable();
      });
    });

    sortHeaders.forEach(function(th) {
      th.addEventListener('click', function() {
        var col = th.getAttribute('data-sort');
        if (currentSortCol === col) {
          currentSortDir = currentSortDir === 'asc' ? 'desc' : 'asc';
        } else {
          currentSortCol = col;
          currentSortDir = 'desc';
        }

        sortHeaders.forEach(function(h) {
          h.classList.remove('sorted-asc', 'sorted-desc');
        });
        th.classList.add(currentSortDir === 'asc' ? 'sorted-asc' : 'sorted-desc');

        renderComparisonTable();
      });
    });
  }

  /**
   * Render Mitos vs Fakta Lengkap
   */
  function renderMythsFacts() {
    var container = document.getElementById('mythsFactsContainer');
    if (!container) return;

    var items = PORK_DATA.mythsFacts;
    container.innerHTML = '';

    items.forEach(function(item, idx) {
      var card = document.createElement('article');
      card.className = 'myth-card';
      card.innerHTML =
        '<div class="myth-header">' +
          '<span class="myth-badge">MITOS #' + (idx + 1) + '</span>' +
          '<h3 class="myth-title">' + item.myth + '</h3>' +
        '</div>' +
        '<div class="fact-body">' +
          '<div class="fact-label">FAKTA ILMIAH:</div>' +
          '<p>' + item.fact + '</p>' +
          '<div class="fact-takeaway"><strong>Kunci:</strong> ' + item.highlight + '</div>' +
        '</div>';
      container.appendChild(card);
    });
  }

  /**
   * Render Scientific Sources
   */
  function renderSources() {
    var container = document.getElementById('sourcesListContainer');
    if (!container) return;

    var sources = PORK_DATA.scientificSources;
    container.innerHTML = '';

    sources.forEach(function(s, idx) {
      var item = document.createElement('li');
      item.className = 'source-item';
      item.innerHTML =
        '<div class="src-num">0' + (idx + 1) + '</div>' +
        '<div class="src-content">' +
          '<h4 class="src-title"><a href="' + s.url + '" target="_blank" rel="noopener noreferrer">' + s.title + ' ↗</a></h4>' +
          '<div class="src-org">' + s.organization + '</div>' +
          '<p class="src-desc">' + s.description + '</p>' +
        '</div>';
      container.appendChild(item);
    });
  }

  /**
   * Inisialisasi Tema (Dark/Light mode) sesuai SOP Kategori 13
   */
  function initTheme() {
    var themeBtn = document.getElementById('themeBtn');
    var metaTheme = document.getElementById('metaTheme');
    var root = document.documentElement;

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      try {
        localStorage.setItem('pork-cholesterol-theme', theme);
      } catch(e) {}
      if (metaTheme) {
        metaTheme.setAttribute('content', theme === 'dark' ? '#0b1829' : '#f4f7fa');
      }
      if (themeBtn) {
        themeBtn.innerHTML = theme === 'dark' ? '☼' : '☾';
        themeBtn.setAttribute('title', theme === 'dark' ? 'Ganti ke tema terang' : 'Ganti ke tema gelap');
      }
    }

    var currentTheme = root.getAttribute('data-theme') || 'light';
    applyTheme(currentTheme);

    if (themeBtn) {
      themeBtn.addEventListener('click', function() {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    }
  }

  /**
   * Inisialisasi Navigasi Mobile Drawer & Scrollspy sesuai SOP Kategori 14
   */
  function initNavigation() {
    var menuBtn = document.getElementById('menuBtn');
    var sidebar = document.getElementById('sidebar');
    var scrim = document.getElementById('scrim');
    var navLinks = document.querySelectorAll('.nav a');
    var sections = document.querySelectorAll('main section[id]');

    function openDrawer() {
      if (!sidebar) return;
      sidebar.classList.add('open');
      if (scrim) scrim.classList.add('show');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'true');
      }
      var firstLink = sidebar.querySelector('.nav a');
      if (firstLink) firstLink.focus();
    }

    function closeDrawer() {
      if (!sidebar) return;
      sidebar.classList.remove('open');
      if (scrim) scrim.classList.remove('show');
      if (menuBtn) {
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.focus();
      }
    }

    if (menuBtn) {
      menuBtn.addEventListener('click', function() {
        var isOpen = sidebar && sidebar.classList.contains('open');
        if (isOpen) closeDrawer();
        else openDrawer();
      });
    }

    if (scrim) {
      scrim.addEventListener('click', closeDrawer);
    }

    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 1050) {
          closeDrawer();
        }
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key !== 'Escape') return;
      if (sidebar && sidebar.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Scrollspy dengan IntersectionObserver
    if ('IntersectionObserver' in window && sections.length > 0) {
      var spy = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function(a) {
            var href = a.getAttribute('href');
            a.classList.toggle('active', href === '#' + id);
          });
        });
      }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

      sections.forEach(function(sec) {
        spy.observe(sec);
      });
    }
  }

  return {
    initComparisonVariants: initComparisonVariants,
    updateCalculatorUI: updateCalculatorUI,
    updatePercentDeltaDemo: updatePercentDeltaDemo,
    initPercentTabs: initPercentTabs,
    initSplitBowlView: initSplitBowlView,
    renderMiniStories: renderMiniStories,
    initMultiFoodComparator: initMultiFoodComparator,
    initPortionSimulator: initPortionSimulator,
    initCookingMethodSimulator: initCookingMethodSimulator,
    renderComparisonTable: renderComparisonTable,
    initTableControls: initTableControls,
    renderMythsFacts: renderMythsFacts,
    renderSources: renderSources,
    initTheme: initTheme,
    initNavigation: initNavigation
  };
})();
