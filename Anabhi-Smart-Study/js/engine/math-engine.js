// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Reusable Mathematics Strategy Engine
// Development · Anabhi Dev
// Version   : 2.0 (Math Toolbox Master Blueprint)
// Generated : 10 September 2026, 12:30:00
// ================================================================

export class MathEngine {
  /**
   * Menyelesaikan masalah penjumlahan (a + b) dengan 9 strategi terstruktur.
   * Perhitungan bersifat deterministik tanpa ketergantungan eksternal.
   */
  static solve(a, b, lang = 'id') {
    const numA = parseInt(a, 10) || 0;
    const numB = parseInt(b, 10) || 0;
    const sum = numA + numB;

    const decomposition = this.getDecompositionSteps(numA, numB, lang);
    const numberBonds = this.getNumberBondsSteps(numA, numB, lang);
    const makeHundred = this.getMakeHundredSteps(numA, numB, lang);
    const compensation = this.getCompensationSteps(numA, numB, lang);
    const numberLine = this.getNumberLineSteps(numA, numB, lang);
    const baseTen = this.getBaseTenSteps(numA, numB, lang);
    const barModel = this.getBarModelSteps(numA, numB, lang);
    const mentalMath = this.getMentalMathSteps(numA, numB, lang);
    const soroban = this.getSorobanSteps(numA, numB, lang);
    const tensFrame = this.getTensFrameSteps(numA, numB, lang);
    const rekenrek = this.getRekenrekSteps(numA, numB, lang);
    const jarimatika = this.getJarimatikaSteps(numA, numB, lang);
    const numberPyramid = this.getNumberPyramidSteps(numA, numB, lang);
    const dotArray = this.getDotArraySteps(numA, numB, lang);

    const recommended = this.recommendStrategies(numA, numB);

    return {
      a: numA,
      b: numB,
      sum,
      recommended,
      // Backward compatibility aliases
      placeValue: decomposition,
      makeRound: makeHundred,
      visualBlocks: baseTen,
      // Canonical strategy keys
      decomposition,
      numberBonds,
      makeHundred,
      compensation,
      numberLine,
      baseTen,
      barModel,
      mentalMath,
      soroban,
      tensFrame,
      rekenrek,
      jarimatika,
      numberPyramid,
      'number-pyramid': numberPyramid,
      dotArray,
      'dot-array': dotArray
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 1: Place Value / Decomposition (Pecah Puluhan & Satuan)
  // -------------------------------------------------------------
  static getDecompositionSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const hA = Math.floor(a / 100) * 100;
    const tA = Math.floor((a % 100) / 10) * 10;
    const uA = a % 10;

    const hB = Math.floor(b / 100) * 100;
    const tB = Math.floor((b % 100) / 10) * 10;
    const uB = b % 10;

    const hSum = hA + hB;
    const tSum = tA + tB;
    const uSum = uA + uB;
    const total = a + b;

    const partsA = [hA, tA, uA].filter(n => n > 0);
    const partsB = [hB, tB, uB].filter(n => n > 0);

    return {
      id: 'decomposition',
      title: isEn ? 'Split Numbers (Place Value)' : 'Pecah Angka (Nilai Tempat)',
      badge: isEn ? 'Decompose & Combine' : 'Pisahkan & Satukan',
      breakdownA: a + ' = ' + (partsA.join(' + ') || '0'),
      breakdownB: b + ' = ' + (partsB.join(' + ') || '0'),
      hSum,
      tSum,
      uSum,
      total,
      step1: hSum > 0 ? ((isEn ? 'Hundreds: ' : 'Ratusan: ') + hA + ' + ' + hB + ' = ' + hSum) : null,
      step2: (isEn ? 'Tens: ' : 'Puluhan: ') + tA + ' + ' + tB + ' = ' + tSum,
      step3: (isEn ? 'Ones: ' : 'Satuan: ') + uA + ' + ' + uB + ' = ' + uSum,
      stepFinal: hSum > 0
        ? ('Total: ' + hSum + ' + ' + tSum + ' + ' + uSum + ' = ' + total)
        : ('Total: ' + tSum + ' + ' + uSum + ' = ' + total),
      steps: [
        { desc: isEn ? 'Decompose both numbers into their place values' : 'Pecah angka pertama dan kedua ke nilai tempat masing-masing', val: a + ' = ' + tA + ' + ' + uA + ', ' + b + ' = ' + tB + ' + ' + uB },
        { desc: isEn ? 'Add the tens group' : 'Jumlahkan kelompok puluhan', val: tA + ' + ' + tB + ' = ' + tSum },
        { desc: isEn ? 'Add the ones group' : 'Jumlahkan kelompok satuan', val: uA + ' + ' + uB + ' = ' + uSum },
        { desc: isEn ? 'Combine all groups' : 'Gabungkan seluruh kelompok', val: tSum + ' + ' + uSum + ' = ' + total }
      ]
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 2: Number Bonds (Ikatan Bilangan Cabang & Gabung)
  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // STRATEGY 2: Number Bonds (Ikatan Bilangan Cabang & Gabung)
  // -------------------------------------------------------------
  static getNumberBondsSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const tA = Math.floor(a / 10) * 10;
    const uA = a % 10;
    const tB = Math.floor(b / 10) * 10;
    const uB = b % 10;

    const tSum = tA + tB;
    const uSum = uA + uB;
    const total = a + b;

    return {
      id: 'number-bonds',
      title: 'Number Bonds',
      badge: isEn ? 'Deconstruct & Bond' : 'Bongkar Pasang Lego',
      treeA: { root: a, branchLeft: tA, branchRight: uA },
      treeB: { root: b, branchLeft: tB, branchRight: uB },
      combinedBranches: [
        { label: isEn ? 'Tens Branch' : 'Cabang Puluhan', calc: tA + ' + ' + tB, result: tSum },
        { label: isEn ? 'Ones Branch' : 'Cabang Satuan', calc: uA + ' + ' + uB, result: uSum }
      ],
      finalBond: { left: tSum, right: uSum, root: total },
      summary: isEn
        ? ('Numbers broken into ' + tA + ', ' + uA + ' and ' + tB + ', ' + uB + '. Combined ' + tSum + ' + ' + uSum + ' = ' + total + '!')
        : ('Angka dibongkar menjadi ' + tA + ', ' + uA + ' dan ' + tB + ', ' + uB + '. Satukan ' + tSum + ' + ' + uSum + ' = ' + total + '!')
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 3: Make Ten / Make Hundred (Menuju Puluhan / Ratusan Bulat)
  // -------------------------------------------------------------
  static getMakeHundredSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const total = a + b;
    let target = 100;
    if (a >= 100) {
      target = Math.ceil((a + 1) / 100) * 100;
    } else if (a + b < 50) {
      target = Math.ceil(a / 10) * 10;
    }

    const need = target - a;

    if (need > 0 && b >= need) {
      const remainingB = b - need;
      return {
        id: 'make-hundred',
        title: (isEn ? 'Make ' : 'Bikin ') + target,
        badge: isEn ? ('Target ' + target + ' Round') : ('Target ' + target + ' Bulat'),
        target,
        need,
        remainingB,
        total,
        step1: isEn ? (a + ' needs ' + need + ' to reach ' + target + '.') : (a + ' butuh ' + need + ' untuk menjadi ' + target + '.'),
        step2: isEn ? ('Split ' + b + ' into ' + need + ' + ' + remainingB + '.') : ('Pecah ' + b + ' menjadi ' + need + ' + ' + remainingB + '.'),
        step3: a + ' + ' + need + ' = ' + target,
        step4: target + ' + ' + remainingB + ' = ' + total,
        visualPath: a + ' ──(+ ' + need + ')──► ' + target + ' ──(+ ' + remainingB + ')──► ' + total
      };
    } else {
      const modA = a % 10;
      const borrow = modA === 0 ? 0 : 10 - modA;
      const roundedA = a + borrow;
      const remB = b - borrow;
      return {
        id: 'make-hundred',
        title: isEn ? 'Make Round Tens' : 'Bikin Puluhan Bulat',
        badge: isEn ? 'Round Up Numbers' : 'Genapkan Angka',
        target: roundedA,
        need: borrow,
        remainingB: remB,
        total,
        step1: borrow > 0
          ? (isEn ? (a + ' needs ' + borrow + ' to reach ' + roundedA + '.') : (a + ' butuh ' + borrow + ' agar jadi ' + roundedA + '.'))
          : (isEn ? (a + ' is already a round ten.') : (a + ' sudah merupakan puluhan bulat.')),
        step2: borrow > 0
          ? (isEn ? ('Split ' + b + ' into ' + borrow + ' + ' + remB + '.') : ('Pecah ' + b + ' menjadi ' + borrow + ' + ' + remB + '.'))
          : (isEn ? 'Calculate directly with ease.' : 'Hitung langsung dengan nyaman.'),
        step3: a + ' + ' + borrow + ' = ' + roundedA,
        step4: roundedA + ' + ' + remB + ' = ' + total,
        visualPath: a + ' ──(+ ' + borrow + ')──► ' + roundedA + ' ──(+ ' + remB + ')──► ' + total
      };
    }
  }

  // -------------------------------------------------------------
  // STRATEGY 4: Compensation (Hampir Bulat, Kelebihan Dibalikin)
  // -------------------------------------------------------------
  static getCompensationSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const total = a + b;
    const modB = b % 10;
    const modA = a % 10;

    let baseNum = a;
    let roundedNum = b;
    let diff = 10 - modB;

    if (modB === 0) {
      diff = 0;
    } else if (modA >= 8 && modB < 8) {
      baseNum = b;
      roundedNum = a;
      diff = 10 - modA;
    }

    if (diff === 0 || diff > 4) {
      diff = (10 - (roundedNum % 10)) % 10;
      if (diff === 0) diff = 1;
    }

    const roundValue = roundedNum + diff;
    const intermediateSum = baseNum + roundValue;
    const finalAnswer = intermediateSum - diff;

    return {
      id: 'compensation',
      title: isEn ? 'Compensation (Near Round)' : 'Kompensasi (Hampir Bulat)',
      badge: isEn ? 'Round & Give Back 😎' : 'Kebanyakan Dibalikin 😎',
      baseNum,
      roundedNum,
      roundValue,
      diff,
      intermediateSum,
      total: finalAnswer,
      step1: isEn
        ? (roundedNum + ' is almost ' + roundValue + '. Round up first (add ' + diff + ').')
        : (roundedNum + ' hampir jadi ' + roundValue + '. Kita bulatkan dulu (tambah ' + diff + ').'),
      step2: baseNum + ' + ' + roundValue + ' = ' + intermediateSum,
      step3: isEn
        ? ('We added ' + diff + ' extra, now subtract it: ' + intermediateSum + ' - ' + diff + ' = ' + finalAnswer + '!')
        : ('Tadi kita melebihkan ' + diff + ', sekarang kita kurangi: ' + intermediateSum + ' - ' + diff + ' = ' + finalAnswer + '!'),
      friendlyQuote: isEn
        ? (roundedNum + ' is almost ' + roundValue + '. Friendly round numbers are so pleasant to work with!')
        : (roundedNum + ' hampir ' + roundValue + '. Angka bulat enak diajak kerja sama!')
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 5: Number Line (Garis Bilangan dengan Lompatan Chunk)
  // -------------------------------------------------------------
  static getNumberLineSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const total = a + b;
    const jumps = [];

    const tensJump = Math.floor(b / 10) * 10;
    const unitsJump = b % 10;

    let current = a;
    if (tensJump > 0) {
      const next = current + tensJump;
      jumps.push({
        from: current,
        to: next,
        amount: '+' + tensJump,
        label: isEn ? ('Tens jump (+' + tensJump + ')') : ('Lompat puluhan (+' + tensJump + ')'),
        color: '#ffb21b'
      });
      current = next;
    }

    if (unitsJump > 0) {
      const next = current + unitsJump;
      jumps.push({
        from: current,
        to: next,
        amount: '+' + unitsJump,
        label: isEn ? ('Ones jump (+' + unitsJump + ')') : ('Lompat satuan (+' + unitsJump + ')'),
        color: '#00cec9'
      });
      current = next;
    }

    if (jumps.length === 0) {
      jumps.push({ from: a, to: total, amount: '+' + b, label: isEn ? 'Direct jump' : 'Lompat langsung', color: '#00cec9' });
    }

    return {
      id: 'number-line',
      title: isEn ? 'Number Line' : 'Garis Bilangan',
      badge: isEn ? 'Chunk Jumps' : 'Lompatan Chunk',
      start: a,
      target: total,
      jumps,
      summary: isEn
        ? ('Start at ' + a + ' ➔ Big jumps ' + jumps.map(j => j.amount).join(' ') + ' ➔ Land on ' + total + '!')
        : ('Mulai dari ' + a + ' ➔ Lompat besar ' + jumps.map(j => j.amount).join(' ') + ' ➔ Tiba di ' + total + '!')
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 6: Base-Ten Blocks (Balok Puluhan & Satuan + Regrouping)
  // -------------------------------------------------------------
  static getBaseTenSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const flatsA = Math.floor(a / 100);
    const rodsA = Math.floor((a % 100) / 10);
    const cubesA = a % 10;

    const flatsB = Math.floor(b / 100);
    const rodsB = Math.floor((b % 100) / 10);
    const cubesB = b % 10;

    const rawCubes = cubesA + cubesB;
    const newRodsFromCubes = Math.floor(rawCubes / 10);
    const remainingCubes = rawCubes % 10;

    const rawRods = rodsA + rodsB + newRodsFromCubes;
    const newFlatsFromRods = Math.floor(rawRods / 10);
    const remainingRods = rawRods % 10;

    const totalFlats = flatsA + flatsB + newFlatsFromRods;
    const total = totalFlats * 100 + remainingRods * 10 + remainingCubes;

    return {
      id: 'base-ten',
      title: isEn ? 'Base-Ten Blocks' : 'Balok Nilai Tempat',
      badge: isEn ? 'Physical Regrouping' : 'Regrouping Nyata',
      flatsA, rodsA, cubesA,
      flatsB, rodsB, cubesB,
      rawCubes,
      newRodsFromCubes,
      remainingCubes,
      rawRods,
      newFlatsFromRods,
      remainingRods,
      totalFlats,
      total,
      regroupMessage: newRodsFromCubes > 0
        ? (isEn
            ? ('10 of ' + rawCubes + ' unit cubes merge into 1 new ten-rod! Leaving ' + remainingCubes + ' cubes.')
            : ('10 dari ' + rawCubes + ' kubus satuan bergabung jadi 1 batang puluhan baru! Sisa ' + remainingCubes + ' kubus.'))
        : (isEn ? 'Ones do not exceed 10, no regrouping needed.' : 'Satuan tidak melebihi 10, tidak perlu pengelompokan ulang.'),
      explanation: isEn
        ? ('Total: ' + (totalFlats > 0 ? (totalFlats + ' hundreds (' + (totalFlats * 100) + ') + ') : '') + remainingRods + ' tens (' + (remainingRods * 10) + ') + ' + remainingCubes + ' ones = ' + total + '!')
        : ('Total: ' + (totalFlats > 0 ? (totalFlats + ' ratusan (' + (totalFlats * 100) + ') + ') : '') + remainingRods + ' puluhan (' + (remainingRods * 10) + ') + ' + remainingCubes + ' satuan = ' + total + '!')
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 7: Bar / Tape Model (Model Batang Bagian & Keseluruhan)
  // -------------------------------------------------------------
  static getBarModelSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const total = a + b;
    const percentA = Math.max(15, Math.min(85, Math.round((a / total) * 100)));
    const percentB = 100 - percentA;

    return {
      id: 'bar-model',
      title: 'Bar / Tape Model',
      badge: isEn ? 'Part-Whole Relation' : 'Relasi Bagian & Total',
      partA: { value: a, percent: percentA, label: (isEn ? 'Part 1: ' : 'Bagian 1: ') + a, color: '#3498db' },
      partB: { value: b, percent: percentB, label: (isEn ? 'Part 2: ' : 'Bagian 2: ') + b, color: '#e67e22' },
      whole: { value: total, label: (isEn ? 'Total Whole = ' : 'Total Keseluruhan = ') + total },
      equation: a + ' + ' + b + ' = ' + total,
      concept: isEn ? 'Two part bars combine into one full-length bar.' : 'Dua batang bagian digabungkan membentuk satu batang utuh yang panjang.'
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 8: Mental Math / Split and Recombine (Angka Ramah)
  // -------------------------------------------------------------
  static getMentalMathSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const tensB = Math.floor(b / 10) * 10;
    const unitsB = b % 10;
    const step1 = a + tensB;
    const total = step1 + unitsB;

    return {
      id: 'mental-math',
      title: isEn ? 'Mental Math (Friendly Numbers)' : 'Mental Math (Angka Ramah)',
      badge: isEn ? 'Nimble in Mind' : 'Lincah di Kepala',
      step1Text: isEn ? ('Add tens first: ' + a + ' + ' + tensB + ' = ' + step1) : ('Tambahkan puluhannya dulu: ' + a + ' + ' + tensB + ' = ' + step1),
      step2Text: isEn ? ('Then add ones: ' + step1 + ' + ' + unitsB + ' = ' + total) : ('Lalu tambahkan satuannya: ' + step1 + ' + ' + unitsB + ' = ' + total),
      total,
      thoughtBubble: a + ' ... (+ ' + tensB + ') ➔ ' + step1 + ' ... (+ ' + unitsB + ') ➔ ' + total + '! 🚀'
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 9: Soroban / Japanese Abacus Visual
  // -------------------------------------------------------------
  static getSorobanSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const total = a + b;

    const encodeSoroban = (num) => {
      const h = Math.floor(num / 100);
      const t = Math.floor((num % 100) / 10);
      const u = num % 10;

      const getCol = (val) => ({
        val,
        upperActive: val >= 5, // 1 upper bead worth 5
        lowerCount: val % 5    // 0-4 lower beads worth 1 each
      });

      return {
        hundreds: getCol(h),
        tens: getCol(t),
        units: getCol(u)
      };
    };

    return {
      id: 'soroban',
      title: isEn ? 'Soroban (Japanese Abacus)' : 'Soroban (Sempoa Jepang)',
      badge: isEn ? 'Visual Beads 5 & 1' : 'Manik Visual 5 & 1',
      abacusA: encodeSoroban(a),
      abacusB: encodeSoroban(b),
      abacusTotal: encodeSoroban(total),
      total,
      principle: isEn ? 'Upper bead (heaven) equals 5. Lower beads (earth) equal 1 each.' : 'Manik atas (surga) bernilai 5. Manik bawah (bumi) masing-masing bernilai 1.'
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 10: Ten-Frames (Kotak 10 Frame Manipulatif Kelas 1 SD)
  // -------------------------------------------------------------
  static getTensFrameSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const sum = a + b;
    const uA = a % 10;
    const uB = b % 10;
    const tA = Math.floor(a / 10);
    const tB = Math.floor(b / 10);
    const tensBundles = tA + tB;

    const needToMake10 = uA === 0 ? 0 : (10 - uA);
    const canMake10 = needToMake10 > 0 && uB >= needToMake10;
    const remainingB = canMake10 ? (uB - needToMake10) : (uA === 0 ? uB : (uA + uB));
    const newTens = (uA + uB >= 10) ? 1 : 0;
    const totalTens = tensBundles + newTens;
    const finalUnits = (uA + uB) % 10;

    // Generate frame 1 slots (10 slots: 5x2)
    const frame1 = [];
    for (let i = 0; i < 10; i++) {
      if (i < uA) {
        frame1.push({ filled: true, source: 'a', color: '#ef4444', icon: '🔴' });
      } else if (canMake10 && i < uA + needToMake10) {
        frame1.push({ filled: true, source: 'b_transfer', color: '#f59e0b', icon: '🟡', transferred: true });
      } else {
        frame1.push({ filled: false });
      }
    }

    // Generate frame 2 slots (10 slots: 5x2)
    const frame2 = [];
    for (let i = 0; i < 10; i++) {
      if (i < remainingB) {
        frame2.push({ filled: true, source: 'b_rem', color: '#f59e0b', icon: '🟡' });
      } else {
        frame2.push({ filled: false });
      }
    }

    return {
      id: 'tens-frame',
      title: isEn ? 'Ten-Frames (Grade 1 Visual)' : 'Kotak 10 Frame (Visual Kelas 1 SD)',
      badge: isEn ? 'Grade 1 Concrete Math' : 'Manipulatif Kelas 1 SD',
      a,
      b,
      sum,
      uA,
      uB,
      tA,
      tB,
      tensBundles,
      needToMake10,
      canMake10,
      remainingB,
      totalTens,
      finalUnits,
      frame1,
      frame2,
      explanation: isEn
        ? `Frame 1 starts with ${uA} red counters. We borrow ${needToMake10} yellow stars from ${b} to fill Frame 1 into a FULL 10! Now we have ${totalTens} tens and ${finalUnits} ones. Total: ${sum}!`
        : `Kotak 1 awalnya ada ${uA} koin merah. Pinjam ${needToMake10} koin kuning dari ${b} untuk MENGGENAPKAN Kotak 1 jadi 10 PENUH! Sekarang terkumpul ${totalTens} puluhan dan tersisa ${finalUnits} satuan. Hasilnya: ${sum}! 🎉`
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 11: Rekenrek (Dutch 2-Color Counting Rack 5 & 10)
  // -------------------------------------------------------------
  static getRekenrekSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const sum = a + b;
    const tensA = Math.floor(a / 10);
    const uA = a % 10;
    const tensB = Math.floor(b / 10);
    const uB = b % 10;

    // Unit rod 1 (Operand A units)
    const redA = Math.min(uA, 5);
    const whiteA = Math.max(0, uA - 5);

    // Unit rod 2 (Operand B units)
    const redB = Math.min(uB, 5);
    const whiteB = Math.max(0, uB - 5);

    const combinedRed = redA + redB;
    const combinedWhite = whiteA + whiteB;
    const fullTensRods = tensA + tensB;
    const newTensFromUnits = (uA + uB >= 10) ? 1 : 0;
    const totalTens = fullTensRods + newTensFromUnits;
    const finalUnits = (uA + uB) % 10;

    return {
      id: 'rekenrek',
      title: isEn ? 'Rekenrek (Dutch 2-Color Counting Rack)' : 'Rekenrek (Sempoa 2-Warna Belanda)',
      badge: isEn ? 'Subitizing 5s & 10s' : 'Kawan 5 & 10 Seketika',
      a,
      b,
      sum,
      tensA,
      tensB,
      uA,
      uB,
      redA,
      whiteA,
      redB,
      whiteB,
      combinedRed,
      combinedWhite,
      fullTensRods,
      newTensFromUnits,
      totalTens,
      finalUnits,
      rod1: { activeRed: redA, activeWhite: whiteA, inactiveRed: 5 - redA, inactiveWhite: 5 - whiteA },
      rod2: { activeRed: redB, activeWhite: whiteB, inactiveRed: 5 - redB, inactiveWhite: 5 - whiteB },
      principle: isEn
        ? 'Rekenrek groups beads into 5 Red + 5 White. Eye subitizing spots 5+5=10 immediately without counting individual beads!'
        : 'Rekenrek mengelompokkan 5 Merah + 5 Putih. Mata anak langsung melihat 5+5=10 seketika tanpa perlu mencacah satu per satu!',
      explanation: isEn
        ? `Top rod displays ${uA} beads (${redA} red, ${whiteA} white). Bottom rod displays ${uB} beads (${redB} red, ${whiteB} white). Group the reds: ${redA} + ${redB} = ${combinedRed}. Add the whites: ${whiteA} + ${whiteB} = ${combinedWhite}. Plus ${fullTensRods} tens rods = ${sum}!`
        : `Kawat atas menggeser ${uA} manik (${redA} merah, ${whiteA} putih). Kawat bawah menggeser ${uB} manik (${redB} merah, ${whiteB} putih). Gabungkan merah: ${redA} + ${redB} = ${combinedRed}. Tambahkan putih: ${whiteA} + ${whiteB} = ${combinedWhite}. Ditambah ${fullTensRods} kawat puluhan = ${sum}! 🎉`
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 12: Jarimatika (Magic Finger Math 1–99)
  // -------------------------------------------------------------
  static getJarimatikaSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const sum = a + b;
    const hundreds = Math.floor(sum / 100) * 100;
    const tA = Math.floor((a % 100) / 10) * 10;
    const uA = a % 10;
    const tB = Math.floor((b % 100) / 10) * 10;
    const uB = b % 10;
    const tSum = Math.floor((sum % 100) / 10) * 10;
    const uSum = sum % 10;

    const getHandConfig = (tensVal, unitsVal) => ({
      left: {
        thumb: tensVal >= 50,
        fingers: Math.floor((tensVal % 50) / 10),
        val: tensVal
      },
      right: {
        thumb: unitsVal >= 5,
        fingers: unitsVal % 5,
        val: unitsVal
      }
    });

    const handA = getHandConfig(tA, uA);
    const handB = getHandConfig(tB, uB);
    const handSum = getHandConfig(tSum, uSum);

    return {
      id: 'jarimatika',
      title: isEn ? 'Jarimatika (Magic 10-Finger Math)' : 'Jarimatika (Jari Tangan Ajaib 1–99)',
      badge: isEn ? 'Fingers 1–99' : 'Jari Ajaib 1–99',
      a,
      b,
      sum,
      hundreds,
      tA,
      uA,
      tB,
      uB,
      tSum,
      uSum,
      handA,
      handB,
      handSum,
      principle: isEn
        ? 'Left Hand is Tens (thumb = 50, 4 fingers = 10 each). Right Hand is Ones (thumb = 5, 4 fingers = 1 each).'
        : 'Tangan Kiri adalah Puluhan (jempol bernilai 50, 4 jari bernilai 10). Tangan Kanan adalah Satuan (jempol bernilai 5, 4 jari bernilai 1).',
      steps: [
        {
          title: isEn ? `1. Form ${a} on Both Hands` : `1. Pasang ${a} di kedua tangan`,
          desc: isEn
            ? `Left hand sets ${tA} (thumb ${handA.left.thumb ? 'OPEN (50)' : 'folded'} + ${handA.left.fingers} fingers). Right hand sets ${uA} (thumb ${handA.right.thumb ? 'OPEN (5)' : 'folded'} + ${handA.right.fingers} fingers).`
            : `Tangan kiri pasang ${tA} (jempol ${handA.left.thumb ? 'BUKA (50)' : 'lipat'} + ${handA.left.fingers} jari tegak). Tangan kanan pasang ${uA} (jempol ${handA.right.thumb ? 'BUKA (5)' : 'lipat'} + ${handA.right.fingers} jari tegak).`
        },
        {
          title: isEn ? `2. Add ${b} Using Finger Rules` : `2. Tambahkan ${b} dengan aturan jari`,
          desc: isEn
            ? `Add tens +${tB} to left hand. Add ones +${uB} to right hand (when right hand crosses 9, fold fingers and carry +1 ten finger to the left hand!).`
            : `Buka puluhan +${tB} di tangan kiri. Buka satuan +${uB} di tangan kanan (jika jari kanan melewati 9, kuncupkan dan tambahkan +1 jari puluhan di tangan kiri!).`
        },
        {
          title: isEn ? `3. Read the Result (${sum})` : `3. Baca formasi jari akhir (${sum})`,
          desc: isEn
            ? `Left hand shows ${tSum}, Right hand shows ${uSum}${hundreds > 0 ? `, plus ${hundreds} carried hundreds` : ''}. Final total = ${sum}!`
            : `Tangan kiri terbaca ${tSum}, Tangan kanan terbaca ${uSum}${hundreds > 0 ? `, ditambah simpanan ${hundreds}` : ''}. Hasil akhir = ${sum}! ✨`
        }
      ]
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 13: Number Pyramid (Wall of Bricks)
  // -------------------------------------------------------------
  static getNumberPyramidSteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const sum = a + b;
    const tA = Math.floor(a / 10) * 10;
    const uA = a % 10;
    const tB = Math.floor(b / 10) * 10;
    const uB = b % 10;

    const tensCombined = tA + tB;
    const onesCombined = uA + uB;

    return {
      id: 'number-pyramid',
      title: isEn ? 'Number Pyramid (Wall of Bricks)' : 'Piramida Bilangan (Dinding Balok)',
      badge: isEn ? 'Part-Whole Wall' : 'Dinding Balok Logika',
      a,
      b,
      sum,
      tA,
      uA,
      tB,
      uB,
      tensCombined,
      onesCombined,
      peak: sum,
      principle: isEn
        ? 'In a number pyramid, every upper brick is the sum of the two bricks directly supporting it.'
        : 'Pada piramida bilangan, setiap balok di atas adalah hasil penjumlahan dari dua balok penyangga tepat di bawahnya.',
      explanation: isEn
        ? `Foundation bricks break ${a} into [${tA}, ${uA}] and ${b} into [${tB}, ${uB}]. Mid-layer combines tens (${tA}+${tB}=${tensCombined}) and ones (${uA}+${uB}=${onesCombined}). Top brick seals the total: ${tensCombined} + ${onesCombined} = ${sum}!`
        : `Balok fondasi memecah ${a} jadi [${tA}, ${uA}] dan ${b} jadi [${tB}, ${uB}]. Balok tingkat tengah menggabungkan puluhan (${tA}+${tB}=${tensCombined}) dan satuan (${uA}+${uB}=${onesCombined}). Balok puncak menyatukan total: ${tensCombined} + ${onesCombined} = ${sum}! 🏆`
    };
  }

  // -------------------------------------------------------------
  // STRATEGY 14: Dot Array Grid (Montessori & Pattern)
  // -------------------------------------------------------------
  static getDotArraySteps(a, b, lang = 'id') {
    const isEn = lang === 'en';
    const sum = a + b;
    const fullTensRows = Math.floor(sum / 10);
    const remainderDots = sum % 10;
    const tensA = Math.floor(a / 10);
    const unitsA = a % 10;
    const tensB = Math.floor(b / 10);
    const unitsB = b % 10;

    // Generate structured dot rows (up to 15 rows max for rendering)
    const totalRows = Math.min(Math.ceil(sum / 10) || 1, 15);
    const rows = [];
    let remA = a;
    let remB = b;

    for (let r = 0; r < totalRows; r++) {
      const rowSlots = [];
      for (let c = 0; c < 10; c++) {
        if (remA > 0) {
          rowSlots.push({ source: 'a', color: '#0ea5e9', active: true });
          remA--;
        } else if (remB > 0) {
          rowSlots.push({ source: 'b', color: '#f59e0b', active: true });
          remB--;
        } else {
          rowSlots.push({ empty: true });
        }
      }
      rows.push(rowSlots);
    }

    return {
      id: 'dot-array',
      title: isEn ? 'Dot Array Grid (Pattern & Structure)' : 'Larik Titik Pola (Struktur & Kelompok)',
      badge: isEn ? 'Pattern Array' : 'Larik Pola Terstruktur',
      a,
      b,
      sum,
      fullTensRows,
      remainderDots,
      tensA,
      unitsA,
      tensB,
      unitsB,
      rows,
      hasRemainder: remainderDots > 0,
      principle: isEn
        ? 'Arranging dots in 10-wide arrays (5+5) displays full tens visually and bridges into multiplication arrays.'
        : 'Menyusun titik dalam larik lebar 10 (5+5) memperlihatkan puluhan penuh dan menjadi jembatan menuju konsep perkalian.',
      explanation: isEn
        ? `${a} dots (blue) and ${b} dots (yellow) fill ${fullTensRows} full rows of 10 with ${remainderDots} leftover dots. Total: ${sum}!`
        : `${a} titik (biru) dan ${b} titik (kuning) mengisi ${fullTensRows} baris puluhan penuh dan menyisakan ${remainderDots} titik. Total: ${sum}! 🎈`
    };
  }

  // -------------------------------------------------------------
  // SMART STRATEGY RECOMMENDATION
  // -------------------------------------------------------------
  static recommendStrategies(a, b) {
    const recs = [];
    const modA = a % 10;
    const modB = b % 10;

    if (a <= 20 && b <= 20) {
      recs.push('tens-frame');
      recs.push('rekenrek');
    }

    if (a + b === 100 || (a + b) % 100 === 0) {
      recs.push('make-hundred');
      recs.push('decomposition');
    }

    if (modA === 9 || modB === 9 || modA === 8 || modB === 8) {
      if (!recs.includes('compensation')) recs.push('compensation');
    }

    if (a < 100 && b < 100 && !recs.includes('jarimatika')) recs.push('jarimatika');
    if (!recs.includes('number-pyramid')) recs.push('number-pyramid');
    if (!recs.includes('dot-array')) recs.push('dot-array');
    if (!recs.includes('rekenrek')) recs.push('rekenrek');
    if (!recs.includes('tens-frame')) recs.push('tens-frame');
    if (!recs.includes('decomposition')) recs.push('decomposition');
    if (!recs.includes('number-line')) recs.push('number-line');

    return recs;
  }

  // -------------------------------------------------------------
  // 3-LEVEL PROGRESSIVE HINT GENERATOR
  // -------------------------------------------------------------
  static getHints(a, b, strategyId = 'decomposition') {
    const total = a + b;

    switch (strategyId) {
      case 'rekenrek':
        return [
          '💡 Petunjuk 1 (Amati): Perhatikan manik merah (5) dan putih (5) pada kedua kawat Rekenrek.',
          '💡 Petunjuk 2 (Arahkan): Satukan kelompok manik merah: 5 merah atas + 5 merah bawah langsung membentuk 10 penuh!',
          '💡 Petunjuk 3 (Jawaban Dekat): Tambahkan sisa manik putih ke kelompok 10 tersebut: hasilnya adalah ' + total + '!'
        ];

      case 'jarimatika':
        return [
          '💡 Petunjuk 1 (Amati): Tangan kiri adalah puluhan (jempol 50, jari 10) dan tangan kanan adalah satuan (jempol 5, jari 1).',
          '💡 Petunjuk 2 (Arahkan): Bentuk angka ' + a + ' di kedua tangan, lalu tambahkan gerakan jari untuk ' + b + '.',
          '💡 Petunjuk 3 (Jawaban Dekat): Jika jari satuan melebihi 9, lipat jari kanan dan simpan +1 jari puluhan di tangan kiri: hasilnya adalah ' + total + '!'
        ];

      case 'number-pyramid':
        return [
          '💡 Petunjuk 1 (Amati): Pecah angka ' + a + ' dan ' + b + ' ke dalam 4 balok fondasi (puluhan & satuan).',
          '💡 Petunjuk 2 (Arahkan): Jumlahkan dua balok puluhan di tingkat tengah, lalu jumlahkan dua balok satuan di sebelahnya.',
          '💡 Petunjuk 3 (Jawaban Dekat): Satukan kedua balok tingkat tengah menuju puncak piramida: hasilnya adalah ' + total + '!'
        ];

      case 'dot-array':
        return [
          '💡 Petunjuk 1 (Amati): Lihat susunan titik dalam baris-baris berukuran 10 (dibagi 5+5).',
          '💡 Petunjuk 2 (Arahkan): Hitung berapa baris 10 penuh yang terbentuk oleh titik biru dan kuning.',
          '💡 Petunjuk 3 (Jawaban Dekat): Satukan baris-baris 10 penuh dengan sisa titik di baris paling bawah: hasilnya adalah ' + total + '!'
        ];

      case 'compensation':
        return [
          '💡 Petunjuk 1 (Amati): Coba perhatikan angka ' + b + '. Apakah ada angka bulat yang sangat dekat dengannya?',
          '💡 Petunjuk 2 (Arahkan): ' + b + ' sangat dekat dengan ' + (Math.ceil(b / 10) * 10) + '! Coba jumlahkan ' + a + ' + ' + (Math.ceil(b / 10) * 10) + ' dulu.',
          '💡 Petunjuk 3 (Jawaban Dekat): ' + a + ' + ' + (Math.ceil(b / 10) * 10) + ' = ' + (a + Math.ceil(b / 10) * 10) + '. Tadi kita melebihkan ' + (Math.ceil(b / 10) * 10 - b) + ', sekarang kurangi: hasilnya adalah ' + total + '!'
        ];

      case 'make-hundred':
        const target = a < 100 ? 100 : 200;
        const need = target - a;
        return [
          '💡 Petunjuk 1 (Amati): Berapa yang dibutuhkan oleh ' + a + ' agar menjadi ' + target + '?',
          '💡 Petunjuk 2 (Arahkan): ' + a + ' butuh ' + need + '. Coba ambil ' + need + ' dari ' + b + ', sisanya berapa?',
          '💡 Petunjuk 3 (Jawaban Dekat): Gabungkan ' + target + ' dengan sisa ' + (b - need) + ', hasilnya adalah ' + total + '!'
        ];

      case 'number-line':
        const tens = Math.floor(b / 10) * 10;
        return [
          '💡 Petunjuk 1 (Amati): Daripada melompat satu per satu, lompat puluhan besar dulu dari ' + a + '.',
          '💡 Petunjuk 2 (Arahkan): Lompat +' + tens + ' dari ' + a + ' mendarat di ' + (a + tens) + '. Sekarang tinggal melompat sisa satuannya!',
          '💡 Petunjuk 3 (Jawaban Dekat): Dari ' + (a + tens) + ', lompat +' + (b % 10) + ' mendarat tepat di ' + total + '!'
        ];

      case 'decomposition':
      default:
        const tA = Math.floor(a / 10) * 10;
        const tB = Math.floor(b / 10) * 10;
        const uA = a % 10;
        const uB = b % 10;
        return [
          '💡 Petunjuk 1 (Amati): Pisahkan puluhannya (' + tA + ' + ' + tB + ') dan satuannya (' + uA + ' + ' + uB + ').',
          '💡 Petunjuk 2 (Arahkan): Puluhannya bernilai ' + (tA + tB) + ', dan satuannya bernilai ' + (uA + uB) + '.',
          '💡 Petunjuk 3 (Jawaban Dekat): Jumlahkan ' + (tA + tB) + ' + ' + (uA + uB) + ' = ' + total + '!'
        ];
    }
  }

  // -------------------------------------------------------------
  // REUSABLE PROBLEM GENERATOR
  // -------------------------------------------------------------
  static generateAdditionProblem(options = {}) {
    const level = options.level || 2;
    let a, b;

    switch (level) {
      case 1:
        a = Math.floor(Math.random() * 40) + 11;
        b = Math.floor(Math.random() * (9 - (a % 10))) + 10;
        break;

      case 2:
        const candidates = [
          [67, 59], [58, 29], [46, 37], [78, 45], [59, 38], [87, 26]
        ];
        const pick = candidates[Math.floor(Math.random() * candidates.length)];
        a = pick[0];
        b = pick[1];
        break;

      case 3:
        const friends = [
          [68, 32], [49, 51], [75, 25], [63, 37], [82, 18], [55, 45]
        ];
        const fPick = friends[Math.floor(Math.random() * friends.length)];
        a = fPick[0];
        b = fPick[1];
        break;

      case 4:
        const large = [
          [125, 75], [135, 65], [148, 52], [115, 85], [150, 75]
        ];
        const lPick = large[Math.floor(Math.random() * large.length)];
        a = lPick[0];
        b = lPick[1];
        break;

      default:
        a = 67;
        b = 59;
    }

    const sol = this.solve(a, b);
    return {
      a,
      b,
      answer: a + b,
      level,
      solution: sol,
      hints: this.getHints(a, b, sol.recommended[0])
    };
  }

  // -------------------------------------------------------------
  // PROGRESS STORE (LOCAL STORAGE PERSISTENCE)
  // -------------------------------------------------------------
  static getProgress() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem('smartstudy_math_toolbox_progress');
        if (raw) return JSON.parse(raw);
      }
    } catch (e) {
      // Ignore
    }
    return {
      problemsSolved: 0,
      strategiesExplored: [],
      badges: [],
      recentHistory: []
    };
  }

  static recordStrategyExplored(strategyId) {
    try {
      const prog = this.getProgress();
      if (!prog.strategiesExplored.includes(strategyId)) {
        prog.strategiesExplored.push(strategyId);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('smartstudy_math_toolbox_progress', JSON.stringify(prog));
        }
      }
      return prog;
    } catch (e) {
      return null;
    }
  }

  static recordProblemSolved(a, b, strategyUsed) {
    try {
      const prog = this.getProgress();
      prog.problemsSolved += 1;
      prog.recentHistory.unshift({
        problem: a + ' + ' + b + ' = ' + (a + b),
        strategy: strategyUsed,
        time: new Date().toISOString()
      });
      if (prog.recentHistory.length > 20) prog.recentHistory.pop();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('smartstudy_math_toolbox_progress', JSON.stringify(prog));
      }
      return prog;
    } catch (e) {
      return null;
    }
  }
}
