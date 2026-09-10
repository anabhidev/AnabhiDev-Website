// ================================================================
// AnabhiDev-PORKCHOLESTEROL — Meat & Cholesterol Interactive Comparison
// Vanilla JavaScript · Application Initialization (Master PRD v1.4)
// Development · Anabhi Dev
// Version   : 1.4
// Generated : 10 September 2026, 08:20:00
// ================================================================

(function() {
  'use strict';

  function initApp() {
    // 1. Inisialisasi Tema & Navigasi
    PORK_UI.initTheme();
    PORK_UI.initNavigation();

    // 2. Render Modul Inti Cerita Babi
    PORK_UI.initComparisonVariants();
    PORK_UI.initPercentTabs();
    PORK_UI.initSplitBowlView();

    // 3. Render Modul Perluasan Lauk Populer (PRD v1.4)
    PORK_UI.renderMiniStories();
    PORK_UI.initMultiFoodComparator();
    PORK_UI.initPortionSimulator();
    PORK_UI.initCookingMethodSimulator();

    // 4. Render Master Table & Kontrol Filter/Sort
    PORK_UI.renderComparisonTable();
    PORK_UI.initTableControls();

    // 5. Render Mitos vs Fakta & Sumber
    PORK_UI.renderMythsFacts();
    PORK_UI.renderSources();

    // 6. Bind Event Kalkulator Babi
    var calcInputs = [
      'calcPortion',
      'calcCut',
      'calcSkin',
      'calcLard',
      'calcVegOil',
      'calcBumbu',
      'calcSides'
    ];

    calcInputs.forEach(function(id) {
      var el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', PORK_UI.updateCalculatorUI);
      el.addEventListener('change', PORK_UI.updateCalculatorUI);
    });

    var presetBtns = document.querySelectorAll('.calc-preset-btn');
    presetBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        presetBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var preset = btn.getAttribute('data-preset');
        var portionInput = document.getElementById('calcPortion');
        var cutInput = document.getElementById('calcCut');
        var skinInput = document.getElementById('calcSkin');
        var lardInput = document.getElementById('calcLard');
        var vegOilInput = document.getElementById('calcVegOil');
        var bumbuInput = document.getElementById('calcBumbu');
        var sidesInput = document.getElementById('calcSides');

        if (preset === 'plain') {
          if (portionInput) portionInput.value = 100;
          if (cutInput) cutInput.value = 'lean';
          if (skinInput) skinInput.value = 'none';
          if (lardInput) lardInput.value = 0;
          if (vegOilInput) vegOilInput.value = 5;
          if (bumbuInput) bumbuInput.value = 0;
          if (sidesInput) sidesInput.checked = false;
        } else if (preset === 'samsam-plain') {
          if (portionInput) portionInput.value = 100;
          if (cutInput) cutInput.value = 'belly';
          if (skinInput) skinInput.value = 'some';
          if (lardInput) lardInput.value = 0;
          if (vegOilInput) vegOilInput.value = 5;
          if (bumbuInput) bumbuInput.value = 10;
          if (sidesInput) sidesInput.checked = false;
        } else if (preset === 'babi-guling') {
          if (portionInput) portionInput.value = 120;
          if (cutInput) cutInput.value = 'mixed';
          if (skinInput) skinInput.value = 'some';
          if (lardInput) lardInput.value = 10;
          if (vegOilInput) vegOilInput.value = 5;
          if (bumbuInput) bumbuInput.value = 35;
          if (sidesInput) sidesInput.checked = true;
        } else if (preset === 'samsam-lengkap') {
          if (portionInput) portionInput.value = 150;
          if (cutInput) cutInput.value = 'belly';
          if (skinInput) skinInput.value = 'lots';
          if (lardInput) lardInput.value = 20;
          if (vegOilInput) vegOilInput.value = 10;
          if (bumbuInput) bumbuInput.value = 50;
          if (sidesInput) sidesInput.checked = true;
        }

        PORK_UI.updateCalculatorUI();
      });
    });

    PORK_UI.updateCalculatorUI();

    // 7. Bind Event Slider 40–50%
    var deltaPlain = document.getElementById('deltaPlainSlider');
    var deltaComp = document.getElementById('deltaCompSlider');

    if (deltaPlain && deltaComp) {
      deltaPlain.addEventListener('input', PORK_UI.updatePercentDeltaDemo);
      deltaComp.addEventListener('input', PORK_UI.updatePercentDeltaDemo);
      PORK_UI.updatePercentDeltaDemo();
    }

    var usdaPresetBtn = document.getElementById('btnLoadUsdaExample');
    if (usdaPresetBtn && deltaPlain && deltaComp) {
      usdaPresetBtn.addEventListener('click', function() {
        deltaPlain.value = 59;
        deltaComp.value = 85;
        PORK_UI.updatePercentDeltaDemo();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
