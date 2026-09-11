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
      soroban
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
  // SMART STRATEGY RECOMMENDATION
  // -------------------------------------------------------------
  static recommendStrategies(a, b) {
    const recs = [];
    const modA = a % 10;
    const modB = b % 10;

    if (a + b === 100 || (a + b) % 100 === 0) {
      recs.push('make-hundred');
      recs.push('decomposition');
    }

    if (modA === 9 || modB === 9 || modA === 8 || modB === 8) {
      if (!recs.includes('compensation')) recs.push('compensation');
    }

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
