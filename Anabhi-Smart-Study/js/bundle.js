// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// Standalone Bundle (Compatible with file:/// and http/https)
// Development · Anabhi Dev
// Version   : 2.0 (High Contrast Audit & Bilingual ID/EN)
// Generated : 11 September 2026
// ================================================================

(function () {
  'use strict';


  // --- Source: js/state.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Application State & Bus
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 11:02:00
  // ================================================================
  
  class AppState {
    constructor() {
      this.subscribers = new Set();
  
      // Inisialisasi status collapse sidebar desktop dari localStorage
      let savedCollapse = false;
      try {
        savedCollapse = localStorage.getItem('anabhidev_smart_study_sidebar_collapsed') === 'true';
      } catch (e) {}
  
      // Inisialisasi bahasa (Default: 'id' sesuai instruksi user)
      let savedLang = 'id';
      try {
        const stored = localStorage.getItem('anabhidev-smart-study-lang');
        if (stored === 'en' || stored === 'id') savedLang = stored;
      } catch (e) {}
  
      // Inisialisasi tema (Default: 'light' sesuai instruksi user)
      let savedTheme = 'light';
      try {
        const stored = localStorage.getItem('anabhidev-smart-study-theme');
        if (stored === 'dark' || stored === 'light') savedTheme = stored;
      } catch (e) {}
  
      document.documentElement.setAttribute('lang', savedLang);
      document.documentElement.setAttribute('data-theme', savedTheme);
  
      this.state = {
        currentRoute: 'home', // 'home' | 'subject' | 'tantangan' | 'progress' | 'all-subjects'
        currentSubjectId: null,
        currentTopicId: null,
        sidebarCollapsed: savedCollapse,
        drawerOpen: false,
        activeMathMethod: 'place-value',
        mathA: 65,
        mathB: 35,
        activeGeoTab: 'earth', // 'earth' | 'provinces' | 'cities' | 'bali' | 'quizzes'
        selectedProvinceId: 'bali',
        searchCityQuery: '',
        modalVideo: null, // { title, url }
        lang: savedLang, // 'id' | 'en' (Default: 'id')
        theme: savedTheme // 'light' | 'dark' (Default: 'light')
      };
    }
  
    get() {
      return this.state;
    }
  
    set(partial) {
      this.state = { ...this.state, ...partial };
      
      // Simpan collapse status ke localStorage jika ada perubahan
      if ('sidebarCollapsed' in partial) {
        try {
          localStorage.setItem('anabhidev_smart_study_sidebar_collapsed', String(this.state.sidebarCollapsed));
        } catch (e) {}
      }
  
      // Simpan bahasa jika berubah
      if ('lang' in partial) {
        try {
          localStorage.setItem('anabhidev-smart-study-lang', this.state.lang);
          document.documentElement.setAttribute('lang', this.state.lang);
        } catch (e) {}
      }
  
      // Simpan tema jika berubah
      if ('theme' in partial) {
        try {
          localStorage.setItem('anabhidev-smart-study-theme', this.state.theme);
          document.documentElement.setAttribute('data-theme', this.state.theme);
        } catch (e) {}
      }
  
      this.notify();
    }
  
    subscribe(callback) {
      this.subscribers.add(callback);
      return () => this.subscribers.delete(callback);
    }
  
    notify() {
      for (const sub of this.subscribers) {
        try {
          sub(this.state);
        } catch (err) {
          console.error('[State] Error in subscriber:', err);
        }
      }
    }
  
    toggleTheme() {
      const next = this.state.theme === 'dark' ? 'light' : 'dark';
      this.set({ theme: next });
    }
  
    toggleLang() {
      const next = this.state.lang === 'id' ? 'en' : 'id';
      this.set({ lang: next });
    }
  
    toggleSidebar() {
      this.set({ sidebarCollapsed: !this.state.sidebarCollapsed });
    }
  
    toggleDrawer(forceState) {
      const next = typeof forceState === 'boolean' ? forceState : !this.state.drawerOpen;
      this.set({ drawerOpen: next });
    }
  
    navigate(route, subjectId = null, topicId = null) {
      this.set({
        currentRoute: route,
        currentSubjectId: subjectId,
        currentTopicId: topicId,
        drawerOpen: false
      });
      // Update URL hash
      if (route === 'home') {
        window.location.hash = '#home';
      } else if (route === 'subject' && subjectId) {
        window.location.hash = `#subject/${subjectId}`;
      } else if (route === 'tantangan') {
        window.location.hash = '#tantangan';
      } else if (route === 'progress') {
        window.location.hash = '#progress';
      } else if (route === 'all-subjects') {
        window.location.hash = '#semua-pelajaran';
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  
  const appState = new AppState();
  

  // --- Source: js/store.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · LocalStorage Progress Store (v1)
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 09:55:00
  // ================================================================
  
  const STORAGE_KEY = 'anabhidev-smart-study-progress';
  const SCHEMA_VERSION = 1;
  
  function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  const DEFAULT_STATE = {
    version: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    stars: 15,
    streakDays: 1,
    lastVisitDate: getTodayString(),
    completedLessons: ['matematika:65+35', 'geografi:earth-intro'],
    quizRecords: {},
    badges: [
      { id: 'first-step', name: 'Langkah Pertama', icon: '🌟', desc: 'Membuka Smart Study dan mulai belajar!' },
      { id: 'math-ninja', name: 'Math Ninja', icon: '🧮', desc: 'Mencoba trik matematika seru!' }
    ],
    dailyChallenge: {
      date: getTodayString(),
      completedCount: 0,
      targetCount: 3,
      claimed: false
    },
    settings: {
      soundEffects: true
    }
  };
  
  class ProgressStore {
    constructor() {
      this.data = this.load();
      this.checkStreak();
    }
  
    getProgress() {
      return this.data || {};
    }
  
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { ...DEFAULT_STATE };
        const parsed = JSON.parse(raw);
        if (parsed.version !== SCHEMA_VERSION) {
          // Safe migration if needed
          return { ...DEFAULT_STATE, ...parsed, version: SCHEMA_VERSION };
        }
        return parsed;
      } catch (e) {
        console.warn('[Store] Gagal membaca LocalStorage, menggunakan nilai awal:', e);
        return { ...DEFAULT_STATE };
      }
    }
  
    save() {
      try {
        this.data.updatedAt = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      } catch (e) {
        console.warn('[Store] Gagal menyimpan LocalStorage:', e);
      }
    }
  
    checkStreak() {
      const today = getTodayString();
      if (this.data.lastVisitDate !== today) {
        const lastDate = new Date(this.data.lastVisitDate);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          this.data.streakDays = (this.data.streakDays || 0) + 1;
        } else if (diffDays > 1) {
          this.data.streakDays = 1;
        }
        this.data.lastVisitDate = today;
  
        // Reset daily challenge if new day
        if (this.data.dailyChallenge?.date !== today) {
          this.data.dailyChallenge = {
            date: today,
            completedCount: 0,
            targetCount: 3,
            claimed: false
          };
        }
        this.save();
      }
    }
  
    addStars(count = 1) {
      this.data.stars = (this.data.stars || 0) + count;
      this.save();
      return this.data.stars;
    }
  
    completeLesson(lessonKey) {
      if (!this.data.completedLessons) this.data.completedLessons = [];
      if (!this.data.completedLessons.includes(lessonKey)) {
        this.data.completedLessons.push(lessonKey);
        this.addStars(5);
        this.incrementDailyChallenge();
        this.save();
      }
    }
  
    isLessonCompleted(lessonKey) {
      return (this.data.completedLessons || []).includes(lessonKey);
    }
  
    recordQuizResult(quizId, score, total) {
      if (!this.data.quizRecords) this.data.quizRecords = {};
      this.data.quizRecords[quizId] = {
        score,
        total,
        date: new Date().toISOString()
      };
      if (score === total) {
        this.addStars(10);
        this.checkAndAwardBadge('quiz-master', 'Bintang Kuis', '🏆', 'Menjawab kuis dengan nilai sempurna 100!');
      } else {
        this.addStars(Math.max(1, score * 2));
      }
      this.incrementDailyChallenge();
      this.save();
    }
  
    incrementDailyChallenge() {
      if (!this.data.dailyChallenge) {
        this.data.dailyChallenge = { date: getTodayString(), completedCount: 0, targetCount: 3, claimed: false };
      }
      if (this.data.dailyChallenge.completedCount < this.data.dailyChallenge.targetCount) {
        this.data.dailyChallenge.completedCount++;
        if (this.data.dailyChallenge.completedCount >= this.data.dailyChallenge.targetCount && !this.data.dailyChallenge.claimed) {
          this.data.dailyChallenge.claimed = true;
          this.addStars(15);
          this.checkAndAwardBadge('daily-hero', 'Pahlawan Harian', '🎯', 'Menuntaskan semua tantangan harian hari ini!');
        }
        this.save();
      }
    }
  
    checkAndAwardBadge(badgeId, name, icon, desc) {
      if (!this.data.badges) this.data.badges = [];
      if (!this.data.badges.some(b => b.id === badgeId)) {
        this.data.badges.push({ id: badgeId, name, icon, desc });
        this.save();
      }
    }
  
    resetProgress() {
      this.data = { ...DEFAULT_STATE, lastVisitDate: getTodayString() };
      this.save();
    }
  }
  
  const store = new ProgressStore();
  
  

  // --- Source: js/data/i18n.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Internationalization (i18n) Dictionary
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 11:00:00
  // ================================================================
  
  const I18N = {
    id: {
      appName: 'Smart Study',
      gradeBadge: 'SD Kelas 1B',
      mainNav: 'Navigasi Utama',
      home: 'Beranda',
      allSubjects: 'Semua Pelajaran',
      subjectsKicker: 'Mata Pelajaran',
      activitiesKicker: 'Aktivitas & Rapor',
      dailyChallenge: 'Tantangan Harian',
      progress: 'Rapor & Bintang',
      footerTagline: 'Belajar Seru & Berkarakter',
      developmentCredit: 'Development · Anabhi Dev',
      
      // Topbar
      starsTitle: 'Total Bintang yang Dikumpulkan',
      streakTitle: 'Hari Belajar Berturut-turut',
      days: 'Hari',
      installApp: 'Install App',
      installTitle: 'Install Smart Study di Tablet / Laptop',
      themeLight: 'Ganti ke tema terang',
      themeDark: 'Ganti ke tema gelap',
      langSwitch: 'Ganti ke Bahasa Inggris (Switch to English)',
  
      // Hero
      pill: 'Media Belajar Interaktif SD Kelas 1',
      heroTitlePrefix: 'Belajar Jadi ',
      heroTitleAccent: 'Lebih Seru!',
      heroSubtitle: 'Yuk belajar, coba trik baru, terus jadi makin jago! 🚀',
      heroLead: 'Ubah materi sekolah jadi petualangan interaktif. Ada jurus cepat matematika 65 + 35, keliling Bumi dan 38 provinsi Indonesia, hingga misi seru harian.',
      heroBtnMath: '🧮 Coba Matematika (65 + 35) ↓',
      heroBtnGeo: '🌍 Jelajah 38 Provinsi & Globe ↓',
      featureMathTitle: 'Flagship Matematika',
      featureMathDesc: '5 jurus asyik: Nilai Tempat s/d Anzan',
      featureGeoTitle: 'Geografi Nusantara',
      featureGeoDesc: 'Bumi bulat bola, 38 provinsi & Bali',
      featureBadgeTitle: 'Bintang & Lencana',
      featureBadgeDesc: 'Progres tersimpan privat di perangkat',
      
      // Subjects Section
      tenSubjectsEyebrow: '10 Mapel',
      tenSubjectsBadge: 'Jadwal Kelas 1B Lengkap',
      whatToLearnTitle: 'Mau Belajar Apa Hari Ini?',
      whatToLearnSub: 'Pilih salah satu mata pelajaran di bawah untuk mulai berpetualang!',
      openSubject: 'Buka Materi ➔',
      topicsCountLabel: 'Topik Belajar',
  
      // Math
      mathFlagshipBadge: '🧮 Flagship Interactive Experience',
      presetLabel: 'Pilih Preset atau Masukkan Angkamu Sendiri:',
      randomProblem: '🎲 Acak Soal Baru',
      chooseThinkingTool: '🛠️ Pilih Alat Berpikirmu:',
      modeVisual: '👁️ Mode Belajar Visual',
      modeCompare: '⚖️ Bandingkan Cara (Compare)',
      num1Label: 'Angka 1',
      num2Label: 'Angka 2',
      resultLabel: 'Hasil',
      practiceEyebrow: 'Latihan',
      practiceTurboBadge: 'Asah Otak Mode Turbo',
      practiceTitle: 'Tantang Dirimu Sendiri!',
      practiceHeader: 'Coba Sendiri dengan Jurus Pilihanmu!',
      practiceQuestionPrefix: 'Soal Latihan',
      of: 'dari',
      checkAnswer: 'Cek Jawaban ➔',
      hintLabel: 'Petunjuk',
      prevQuestion: '← Soal Sebelumnya',
      nextQuestion: 'Soal Berikutnya →',
      answerPlaceholder: 'Jawaban',
      practiceSuccess: '🎉 <strong>YES! Otak mode turbo!</strong> Jawabanmu tepat sekali! Hebat!',
      practiceWrong: '😄 <strong>Belum nih!</strong> Coba cek satuannya lagi atau intip tombol petunjuk!',
      showAnotherWaySuccess: '🎉 Yesss! Kamu Berhasil Menemukan Jawabannya!',
      showAnotherWayPrompt: 'Mau lihat bagaimana soal ini diselesaikan dengan cara lain yang nggak kalah keren?',
      showAnotherWayBtn: '✨ Kasih Lihat Cara Lain!',
      badgesSectionTitle: '🏆 Lencana Eksplorasi Alat Berpikir',
      badgesSectionSub: 'Koleksi jurus yang sudah kamu coba!',
      problemsSolvedBadge: 'Soal Terselesaikan',
      tryThisWay: 'Coba Cara Ini ➔',
      topicPrefix: 'Topik',
      independentMission: 'Misi Mandiri:',
      visualExplorations: 'Eksplorasi Visual',
      stopAutoRotate: '⏸ Berhenti',
      startAutoRotate: '▶ Putar',
      videosHeaderEyebrow: 'Video Pembelajaran',
      videosHeaderTitle: 'Tontonan Penguat Konsep',
      playVideo: '▶ Putar Video',
  
      // Geography
      geoBadge: '🌍 Modul Geografi & Nusantara',
      geoBadge: '🌍 Modul Geografi & Dunia',
      tabEarth: '1. Bumi & Globe 3D',
      tabProvinces: '2. 38 Provinsi & Ibu Kota',
      tabCities: '3. Kota Terkenal (Malang, dll)',
      tabBali: '4. Jelajah Bali (8+1)',
      tabQuizzes: '5. Kuis Geografi',
      tabCountries: '2. Negara-Negara di Dunia',
      tabProvinces: '3. 38 Provinsi & Ibu Kota',
      tabCities: '4. Kota Terkenal (Malang, dll)',
      tabBali: '5. Jelajah Bali (8+1)',
      tabQuizzes: '6. Kuis Geografi',
      earthShapeBadge: 'Bentuk Asli: Hampir Bulat Sempurna (Bola)',
      rotateLeft: '⟲ Putar Kiri',
      autoRotate: '⏯ Otomatis',
      rotateRight: '⟳ Putar Kanan',
      focusIndonesia: '🇮🇩 Fokus Indonesia',
      zoomIn: '🔍 Perbesar',
      zoomOut: '🔎 Perkecil',
      globeTouchTip: '💡 Sentuh, geser atau cubit untuk memutar bola dunia secara bebas!',
      globeTouchTip: '💡 Sentuh, geser atau cubit untuk memutar bola dunia seperti globe meja asli!',
      searchCountryPlaceholder: '🔍 Cari negara, ibu kota, atau benua (misal: Jepang, Kairo, Brasil)...',
      foundCountriesPrefix: 'Menampilkan',
      countriesCountSuffix: 'Negara Sahabat di Dunia',
      continentAll: 'Semua Benua',
      continentAsia: '🌏 Asia',
      continentEurope: '🌍 Eropa',
      continentAfrica: '🌍 Afrika',
      continentNorthAmerica: '🌎 Amerika Utara',
      continentSouthAmerica: '🌎 Amerika Selatan',
      continentOceania: '🌏 Oseania',
      currencyLabel: 'Mata Uang:',
      landmarkLabel: 'Ikon & Landmark:',
      languageLabel: 'Bahasa:',
      focusOnGlobeBtn: '🌍 Lihat di Globe',
      countryFunFactBadge: '✨ Fakta Seru Edukatif',
      showingProvincesPrefix: 'Menampilkan',
      provincesCountSuffix: 'dari 38 Provinsi',
      capitalLabel: 'Ibu Kota:',
      nonCapitalBadge: 'Bukan Ibu Kota',
      mandatoryExampleBadge: '⭐ (Contoh Wajib)',
      partOfProvince: 'Bagian dari Provinsi:',
      cityDisclaimer: '📢 <strong>Penting Diketahui:</strong> Kota-kota di bawah ini adalah <u>kota-kota terkenal di Indonesia yang BUKAN merupakan ibu kota provinsi</u>. Daftar ini merupakan pilihan edukatif terkurasi dan bukan daftar seluruh kota di Indonesia.',
      searchCityPlaceholder: 'Cari kota (misal: Malang, Solo, Cirebon)...',
      foundCitiesPrefix: 'Ditemukan',
      citiesSuffix: 'Kota Terkenal',
      specialBaliPill: '🌺 Modul Spesial Pulau Dewata',
      govCenterLabel: 'Ibu Kota / Pusat:',
      geoSourceTitle: 'Sumber Data Geografi Resmi:',
      curationStatus: 'Status Kurasi:',
      scopeLabel: 'Cakupan:',
  
      // Quizzes
      scoreLabel: 'Skor:',
      showHintBtn: '💡 Lihat Petunjuk',
      hideHintBtn: '💡 Tutup Petunjuk',
      finishQuizBtn: 'Selesai & Kumpulkan Bintang 🏆',
      nextQBtn: 'Soal Berikutnya ➔',
      quizFinishedTitle: 'Kuis Selesai!',
      quizFinishedPerfect: 'Luar biasa! Kamu menjawab semua pertanyaan dengan benar!',
      quizFinishedGood: 'Hebat! Terus berlatih agar makin jago!',
      retryQuizBtn: '🔄 Ulangi Kuis',
      continueNextSubjectBtn: 'Lanjut Belajar Lain ➔',
      quizCorrectFeedback: '🎉 <strong>YES! Keren banget!</strong> Jawabanmu tepat sekali.',
      quizWrongFeedback: '😄 <strong>Hampir!</strong> Jawaban yang tepat adalah',
  
      // Challenge
      challengeBadge: '🎯 Micro-Learning 3–5 Menit',
      challengeTitle: 'Tantangan Harian Anak Pintar',
      challengeSub: 'Selesaikan 3 aktivitas kecil hari ini untuk menjaga streak dan mendapatkan bintang emas tambahan!',
      todayTargetPrefix: 'Target Hari Ini:',
      doneCountLabel: 'Beres',
      challengeSuccessMsg: '🎉 <strong>YEAH! Tantangan hari ini beres!</strong> Kamu mendapatkan +15 Bintang Emas &amp; lencana Pahlawan Harian! 🏆',
      challengePrompt: 'Selesaikan tantangan di bawah ini dengan mengklik tombol "Mulai"!',
      statusDone: '✅ Selesai',
      statusPending: 'Belum',
      repeatLessonBtn: 'Ulangi Materi',
  
      // Progress / Report
      reportBadge: '📈 Rapor Belajar Anak & Ringkasan Orang Tua',
      reportTitle: 'Pencapaian & Koleksi Bintang',
      reportSub: 'Pantau perkembangan belajar anak secara positif, ramah, dan tanpa tekanan nilai sekolah.',
      totalGoldStars: 'Total Bintang Emas',
      activeStreak: 'Streak Belajar Aktif',
      badgesWon: 'Lencana Dimenangkan',
      levelLabel: 'Level: Makin Jago',
      kidBadgesTitle: 'Koleksi Lencana Anak',
      parentSummaryTitle: 'Ringkasan Pendampingan Orang Tua',
      parentPrivacyNotice: 'Privasi Terjaga 100% (Lokal di Perangkat)',
      parentSummaryDesc: 'Seluruh progres belajar, bintang, dan lencana tersimpan aman di browser/tablet ini tanpa mengirim data pribadi ke server luar. Cocok untuk review santai bersama ananda setiap sore atau malam hari.',
      completedLabel: 'Selesai',
      resetProgressBtn: '⚠️ Reset Progres Belajar',
      resetConfirmPrompt: 'Apakah Ayah/Bunda yakin ingin mereset progres belajar ananda dari awal?',
      resetSuccessAlert: 'Progres berhasil direset. Mari mulai petualangan belajar baru!'
    },
  
    en: {
      appName: 'Smart Study',
      gradeBadge: 'Grade 1B',
      mainNav: 'Main Navigation',
      home: 'Home',
      allSubjects: 'All Subjects',
      subjectsKicker: 'Subjects',
      activitiesKicker: 'Activities & Report',
      dailyChallenge: 'Daily Challenge',
      progress: 'Report & Stars',
      footerTagline: 'Fun & Mindful Learning',
      developmentCredit: 'Development · Anabhi Dev',
  
      // Topbar
      starsTitle: 'Total Gold Stars Collected',
      streakTitle: 'Consecutive Days Learning',
      days: 'Days',
      installApp: 'Install App',
      installTitle: 'Install Smart Study on Tablet / Laptop',
      themeLight: 'Switch to light theme',
      themeDark: 'Switch to dark theme',
      langSwitch: 'Ganti ke Bahasa Indonesia (Switch to Indonesian)',
  
      // Hero
      pill: 'Interactive Learning for Grade 1',
      heroTitlePrefix: 'Learning Made ',
      heroTitleAccent: 'More Fun!',
      heroSubtitle: "Let's learn, try new tricks, and level up! 🚀",
      heroLead: 'Turn school lessons into an interactive adventure. Master quick math tricks like 65 + 35, explore Earth and Indonesia’s 38 provinces, and complete fun daily missions.',
      heroBtnMath: '🧮 Try Math (65 + 35) ↓',
      heroBtnGeo: '🌍 Explore 38 Provinces & Globe ↓',
      featureMathTitle: 'Flagship Mathematics',
      featureMathDesc: '5 fun methods: Place Value to Anzan',
      featureGeoTitle: 'Indonesian & World Geography',
      featureGeoDesc: 'Spherical Earth, 38 provinces & Bali',
      featureBadgeTitle: 'Stars & Badges',
      featureBadgeDesc: 'Progress saved privately on device',
  
      // Subjects Section
      tenSubjectsEyebrow: '10 Subjects',
      tenSubjectsBadge: 'Complete Grade 1B Curriculum',
      whatToLearnTitle: 'What Do You Want to Learn Today?',
      whatToLearnSub: 'Choose a subject below to embark on your learning journey!',
      openSubject: 'Open Lessons ➔',
      topicsCountLabel: 'Learning Topics',
  
      // Math
      mathFlagshipBadge: '🧮 Flagship Interactive Experience',
      presetLabel: 'Choose a Preset or Enter Your Own Numbers:',
      randomProblem: '🎲 New Random Problem',
      chooseThinkingTool: '🛠️ Choose Your Thinking Tool:',
      modeVisual: '👁️ Visual Learning Mode',
      modeCompare: '⚖️ Compare Strategies',
      num1Label: 'Number 1',
      num2Label: 'Number 2',
      resultLabel: 'Result',
      practiceEyebrow: 'Practice',
      practiceTurboBadge: 'Turbo Brain Workout',
      practiceTitle: 'Challenge Yourself!',
      practiceHeader: 'Try It Yourself With Your Favorite Strategy!',
      practiceQuestionPrefix: 'Practice Question',
      of: 'of',
      checkAnswer: 'Check Answer ➔',
      hintLabel: 'Hint',
      prevQuestion: '← Previous Question',
      nextQuestion: 'Next Question →',
      answerPlaceholder: 'Answer',
      practiceSuccess: '🎉 <strong>YES! Turbo brain mode!</strong> Your answer is spot on! Excellent!',
      practiceWrong: '😄 <strong>Not quite yet!</strong> Check the units place or peek at the hint button!',
      showAnotherWaySuccess: '🎉 Yesss! You Found the Answer!',
      showAnotherWayPrompt: 'Want to see how this problem is solved another cool way?',
      showAnotherWayBtn: '✨ Show Another Way!',
      badgesSectionTitle: '🏆 Thinking Tool Exploration Badges',
      badgesSectionSub: 'Collection of thinking tools you have explored!',
      problemsSolvedBadge: 'Problems Solved',
      tryThisWay: 'Try This Way ➔',
      topicPrefix: 'Topic',
      independentMission: 'Independent Mission:',
      visualExplorations: 'Visual Explorations',
      stopAutoRotate: '⏸ Pause',
      startAutoRotate: '▶ Spin',
      videosHeaderEyebrow: 'Learning Videos',
      videosHeaderTitle: 'Concept Enrichment Videos',
      playVideo: '▶ Play Video',
  
      // Geography
      geoBadge: '🌍 Geography & Archipelago Module',
      geoBadge: '🌍 Geography & World Module',
      tabEarth: '1. Earth & 3D Globe',
      tabProvinces: '2. 38 Provinces & Capitals',
      tabCities: '3. Famous Cities (Malang, etc)',
      tabBali: '4. Explore Bali (8+1)',
      tabQuizzes: '5. Geography Quizzes',
      tabCountries: '2. World Countries',
      tabProvinces: '3. 38 Provinces & Capitals',
      tabCities: '4. Famous Cities (Malang, etc)',
      tabBali: '5. Explore Bali (8+1)',
      tabQuizzes: '6. Geography Quizzes',
      earthShapeBadge: 'True Shape: Almost Perfect Sphere (Ball)',
      rotateLeft: '⟲ Rotate Left',
      autoRotate: '⏯ Auto-Spin',
      rotateRight: '⟳ Rotate Right',
      focusIndonesia: '🇮🇩 Focus Indonesia',
      zoomIn: '🔍 Zoom In',
      zoomOut: '🔎 Zoom Out',
      globeTouchTip: '💡 Touch, drag or pinch to freely spin and explore the real Earth!',
      globeTouchTip: '💡 Touch, drag or pinch to freely spin the globe just like a real desk globe!',
      searchCountryPlaceholder: '🔍 Search country, capital, or continent (e.g. Japan, Cairo, Brazil)...',
      foundCountriesPrefix: 'Showing',
      countriesCountSuffix: 'World Countries',
      continentAll: 'All Continents',
      continentAsia: '🌏 Asia',
      continentEurope: '🌍 Europe',
      continentAfrica: '🌍 Africa',
      continentNorthAmerica: '🌎 North America',
      continentSouthAmerica: '🌎 South America',
      continentOceania: '🌏 Oceania',
      currencyLabel: 'Currency:',
      landmarkLabel: 'Icon & Landmark:',
      languageLabel: 'Language:',
      focusOnGlobeBtn: '🌍 View on Globe',
      countryFunFactBadge: '✨ Fun Fact for Kids',
      showingProvincesPrefix: 'Showing',
      provincesCountSuffix: 'of 38 Provinces',
      capitalLabel: 'Capital:',
      nonCapitalBadge: 'Non-Capital City',
      mandatoryExampleBadge: '⭐ (Mandatory Sample)',
      partOfProvince: 'Part of Province:',
      cityDisclaimer: '📢 <strong>Important Notice:</strong> The cities listed below are <u>well-known Indonesian cities that are NOT provincial capitals</u>. This is a curated educational sample, not an exhaustive list of all cities in Indonesia.',
      searchCityPlaceholder: 'Search city (e.g. Malang, Solo, Cirebon)...',
      foundCitiesPrefix: 'Found',
      citiesSuffix: 'Famous Cities',
      specialBaliPill: '🌺 Island of the Gods Special Module',
      govCenterLabel: 'Capital / Government Center:',
      geoSourceTitle: 'Official Geography Source:',
      curationStatus: 'Curation Status:',
      scopeLabel: 'Scope:',
  
      // Quizzes
      scoreLabel: 'Score:',
      showHintBtn: '💡 Show Hint',
      hideHintBtn: '💡 Hide Hint',
      finishQuizBtn: 'Finish & Collect Stars 🏆',
      nextQBtn: 'Next Question ➔',
      quizFinishedTitle: 'Quiz Finished!',
      quizFinishedPerfect: 'Outstanding! You answered every question correctly!',
      quizFinishedGood: 'Great job! Keep practicing to become a true master!',
      retryQuizBtn: '🔄 Retry Quiz',
      continueNextSubjectBtn: 'Continue Other Lessons ➔',
      quizCorrectFeedback: '🎉 <strong>YES! Super cool!</strong> Your answer is completely correct.',
      quizWrongFeedback: '😄 <strong>Almost!</strong> The correct answer is',
  
      // Challenge
      challengeBadge: '🎯 3–5 Min Micro-Learning',
      challengeTitle: 'Smart Kid Daily Challenge',
      challengeSub: 'Complete 3 quick activities today to maintain your streak and earn bonus gold stars!',
      todayTargetPrefix: "Today's Target:",
      doneCountLabel: 'Done',
      challengeSuccessMsg: "🎉 <strong>YEAH! Today's challenge is completed!</strong> You earned +15 Gold Stars &amp; the Daily Hero badge! 🏆",
      challengePrompt: 'Complete the challenges below by clicking "Start"!',
      statusDone: '✅ Done',
      statusPending: 'Pending',
      repeatLessonBtn: 'Review Lesson',
  
      // Progress / Report
      reportBadge: '📈 Student Learning Report & Parent Summary',
      reportTitle: 'Achievements & Star Collection',
      reportSub: "Track your child's learning journey positively, playfully, and without school grade pressure.",
      totalGoldStars: 'Total Gold Stars',
      activeStreak: 'Active Learning Streak',
      badgesWon: 'Badges Earned',
      levelLabel: 'Level: Leveling Up',
      kidBadgesTitle: "Child's Badge Collection",
      parentSummaryTitle: 'Parent Mentoring Summary',
      parentPrivacyNotice: '100% Private (Local to Device)',
      parentSummaryDesc: 'All learning progress, stars, and badges are stored securely in this browser/tablet without sending personal data to external servers. Ideal for a relaxing review with your child every afternoon or evening.',
      completedLabel: 'Completed',
      resetProgressBtn: '⚠️ Reset Learning Progress',
      resetConfirmPrompt: 'Are you sure you want to reset all learning progress from the beginning?',
      resetSuccessAlert: 'Progress has been reset. Let’s start a brand new learning journey!'
    }
  };
  
  function t(key, lang = 'id') {
    const currentLang = (lang === 'en') ? 'en' : 'id';
    return I18N[currentLang][key] || I18N['id'][key] || key;
  }
  
  

  // --- Source: js/data/subjects.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Subjects Master Registry
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 09:40:00
  // ================================================================
  
  const SUBJECTS = [
    {
      id: 'matematika',
      slug: 'matematika',
      name: 'Matematika',
      nameEn: 'Mathematics',
      shortName: 'Math',
      shortNameEn: 'Math',
      icon: '🧮',
      badge: 'Flagship Interactive',
      badgeEn: 'Flagship Interactive',
      accentColor: '#056268',
      accentLight: '#e9f8f8',
      accentBorder: '#5be0df',
      description: 'Bongkar angka dengan trik seru! Ada 9 jurus berhitung asyik.',
      descriptionEn: 'Explore numbers with fun tricks! 9 exciting calculation tools.',
      topicsCount: 9,
      order: 1
    },
    {
      id: 'geografi',
      slug: 'geografi',
      name: 'Geografi',
      nameEn: 'Geography',
      shortName: 'Geografi',
      shortNameEn: 'Geography',
      icon: '🌍',
      badge: 'Jelajah Nusantara & Dunia',
      badgeEn: 'Explore Archipelago & World',
      accentColor: '#1d7198',
      accentLight: '#e8f4fa',
      accentBorder: '#5ce3de',
      description: 'Kenali bentuk Bumi, 38 provinsi Indonesia, negara dunia, kota terkenal, dan Pulau Bali!',
      descriptionEn: 'Discover round Earth, 38 Indonesian provinces, world countries, famous cities, and Bali!',
      topicsCount: 10,
      order: 2
    },
    {
      id: 'bahasa-indonesia',
      slug: 'bahasa-indonesia',
      name: 'Bahasa Indonesia',
      nameEn: 'Indonesian Language',
      shortName: 'B. Indonesia',
      shortNameEn: 'Indonesian',
      icon: '📖',
      badge: 'Membaca Ceria',
      badgeEn: 'Joyful Reading',
      accentColor: '#b24a1b',
      accentLight: '#fdf1eb',
      accentBorder: '#f89a6b',
      description: 'Mengenal huruf vokal, konsonan, suku kata, dan menyusun kalimat seru.',
      descriptionEn: 'Learn vowels, consonants, syllables, and assemble cheerful sentences.',
      topicsCount: 10,
      order: 3
    },
    {
      id: 'bahasa-inggris',
      slug: 'bahasa-inggris',
      name: 'Bahasa Inggris',
      nameEn: 'English',
      shortName: 'English',
      shortNameEn: 'English',
      icon: '🔤',
      badge: 'Fun English',
      badgeEn: 'Fun English',
      accentColor: '#2b5ea8',
      accentLight: '#edf3fc',
      accentBorder: '#7ea9eb',
      description: 'Belajar sapaan, warna, angka, dan binatang dalam bahasa Inggris.',
      descriptionEn: 'Learn greetings, colors, numbers, and friendly animals in English.',
      topicsCount: 10,
      order: 4
    },
    {
      id: 'pancasila',
      slug: 'pancasila',
      name: 'Pendidikan Pancasila',
      nameEn: 'Civics & Pancasila',
      shortName: 'Pancasila',
      shortNameEn: 'Civics',
      icon: '🦅',
      badge: 'Anak Hebat',
      badgeEn: 'Great Kids',
      accentColor: '#962b2b',
      accentLight: '#fceeeb',
      accentBorder: '#e87272',
      description: 'Mengenal lambang Garuda, nilai gotong royong, dan aturan tertib di sekolah.',
      descriptionEn: 'Discover the Garuda emblem, teamwork values, and positive school habits.',
      topicsCount: 10,
      order: 5
    },
    {
      id: 'bahasa-bali',
      slug: 'bahasa-bali',
      name: 'Bahasa Bali',
      nameEn: 'Balinese Language',
      shortName: 'B. Bali',
      shortNameEn: 'Balinese',
      icon: '🌴',
      badge: 'Budaya Luhur',
      badgeEn: 'Noble Culture',
      accentColor: '#8a6a1f',
      accentLight: '#fdf7e8',
      accentBorder: '#e8c468',
      description: 'Mengenal kruna dasar, salam harian, warna, dan anggota tubuh basa Bali.',
      descriptionEn: 'Learn basic words, daily greetings, colors, and body parts in Balinese.',
      topicsCount: 10,
      order: 6
    },
    {
      id: 'seni-rupa',
      slug: 'seni-rupa',
      name: 'Seni Rupa',
      nameEn: 'Visual Arts',
      shortName: 'Seni Rupa',
      shortNameEn: 'Visual Arts',
      icon: '🎨',
      badge: 'Kreasi Warna',
      badgeEn: 'Color Creations',
      accentColor: '#7b359c',
      accentLight: '#f7eeff',
      accentBorder: '#c387df',
      description: 'Campuran warna primer & sekunder, bentuk bidang, dan membuat pola indah.',
      descriptionEn: 'Primary and secondary color mixing, basic shapes, and playful pattern making.',
      topicsCount: 10,
      order: 7
    },
    {
      id: 'pjok',
      slug: 'pjok',
      name: 'PJOK',
      nameEn: 'Physical Education',
      shortName: 'Olahraga',
      shortNameEn: 'Sports & PE',
      icon: '🏃',
      badge: 'Badan Bugar',
      badgeEn: 'Fit Body',
      accentColor: '#1e7b45',
      accentLight: '#edfbf2',
      accentBorder: '#5be08f',
      description: 'Gerak lokomotor, koordinasi tubuh, dan kebiasaan hidup bersih & sehat.',
      descriptionEn: 'Locomotor movements, body coordination, and healthy daily habits.',
      topicsCount: 10,
      order: 8
    },
    {
      id: 'agama',
      slug: 'agama',
      name: 'Agama & Budi Pekerti',
      nameEn: 'Character & Ethics',
      shortName: 'Budi Pekerti',
      shortNameEn: 'Character',
      icon: '🌱',
      badge: 'Hati Baik',
      badgeEn: 'Kind Heart',
      accentColor: '#366d62',
      accentLight: '#ecf7f4',
      accentBorder: '#76cebd',
      description: 'Belajar bersyukur, sopan santun, tolong menolong, dan menyayangi sesama.',
      descriptionEn: 'Learn gratitude, polite manners, mutual kindness, and caring for others.',
      topicsCount: 10,
      order: 9
    },
    {
      id: 'kokurikuler',
      slug: 'kokurikuler',
      name: 'Kokurikuler',
      nameEn: 'Co-curricular Missions',
      shortName: 'Kokurikuler',
      shortNameEn: 'Missions',
      icon: '🧩',
      badge: 'Misi Mandiri',
      badgeEn: 'Independence',
      accentColor: '#c27803',
      accentLight: '#fff8eb',
      accentBorder: '#ffc15e',
      description: 'Misi mingguan seru anak mandiri: bereskan meja, rawat tanaman, senyum sapa.',
      descriptionEn: 'Exciting weekly self-reliance missions: tidy desk, water plants, greet others.',
      topicsCount: 10,
      order: 10
    }
  ];
  
  function getSubjectName(sub, lang = 'id') {
    if (!sub) return '';
    return (lang === 'en' && sub.nameEn) ? sub.nameEn : sub.name;
  }
  
  function getSubjectBadge(sub, lang = 'id') {
    if (!sub) return '';
    return (lang === 'en' && sub.badgeEn) ? sub.badgeEn : sub.badge;
  }
  
  function getSubjectDesc(sub, lang = 'id') {
    if (!sub) return '';
    return (lang === 'en' && sub.descriptionEn) ? sub.descriptionEn : sub.description;
  }
  

  // --- Source: js/data/math-data.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Mathematics Flagship Data & Math Toolbox
  // Development · Anabhi Dev
  // Version   : 2.0 (Math Toolbox Master Blueprint)
  // Generated : 10 September 2026, 12:00:00
  // ================================================================
  
  const MATH_DATA = {
    id: 'matematika',
    title: 'Math Toolbox — Satu Soal, Banyak Cara!',
    titleEn: 'Math Toolbox — One Problem, Many Ways!',
    subtitle: 'Matematika bukan cuma berhitung satu per satu. Temukan pola, pilih alat berpikirmu, dan gunakan cara yang paling kamu suka!',
    subtitleEn: "Math isn't just counting one by one. Spot patterns, choose your thinking tool, and use the way you love most!",
    signaturePrompt: 'Satu soal. Banyak cara. Kamu pilih cara yang paling kamu suka. 😎',
    signaturePromptEn: 'One problem. Many ways. You choose the way that fits you best. 😎',
  
    // Soal Flagship & Signature Sesuai Blueprint v1.0
    flagship: {
      a: 67,
      b: 59,
      answer: 126,
      recommended: ['compensation', 'make-hundred', 'decomposition', 'number-line'],
      reason: 'Angka 59 hampir 60! Coba jurus Kompensasi atau Bikin 100.',
      reasonEn: 'Number 59 is almost 60! Try Compensation or Make 100.'
    },
    secondSignature: {
      a: 68,
      b: 32,
      answer: 100,
      recommended: ['make-hundred', 'decomposition'],
      reason: 'Wih! 68 dan 32 pasangan serasi yang langsung pas jadi 100!',
      reasonEn: '68 and 32 are a perfect pair that instantly makes 100!'
    },
    thirdSignature: {
      a: 125,
      b: 75,
      answer: 200,
      recommended: ['make-hundred', 'number-bonds', 'number-line'],
      reason: '25 + 75 = 100! Digabung 100 pertama langsung melesat jadi 200!',
      reasonEn: '25 + 75 = 100! Combined with the first 100, it leaps to 200!'
    },
  
    // 4 Slot Video YouTube Matematika & Penjumlahan Terkurasi
    videoSlots: [
      {
        id: 'math-yt-1',
        title: '1. Berhitung Cepat Jari Tanpa Sempoa (TK & SD)',
        description: 'Jurus kilat menghitung penjumlahan hanya dengan formasi jari tangan tanpa alat bantu.',
        url: 'https://www.youtube.com/watch?v=bdx64w2lG_Y',
        channel: 'MA Kids Fun House',
        ageFit: 'Kelas 1–6 SD'
      },
      {
        id: 'math-yt-2',
        title: '2. Jarimatika Jurus Zero: Trik Penjumlahan Jari',
        description: 'Trik ceria berhitung penjumlahan dengan gerakan jari tangan ala Jarimatika super asyik.',
        url: 'https://www.youtube.com/watch?v=3DrTPVa6yVQ',
        channel: 'Ayo Cerdas Indonesia',
        ageFit: 'Kelas 1–6 SD'
      },
      {
        id: 'math-yt-3',
        title: '3. Kuis Matematika Dasar: Asah Otak Penjumlahan',
        description: 'Kuis interaktif melatih kecepatan dan ketepatan berhitung jumlah-jumlahan dasar dengan riang.',
        url: 'https://www.youtube.com/watch?v=DQYkGL0X-yA',
        channel: 'Quiz QUPU',
        ageFit: 'Kelas 1–6 SD'
      },
      {
        id: 'math-yt-4',
        title: '4. Cara Menghitung Penjumlahan Bersusun (Nilai Tempat)',
        description: 'Panduan langkah demi langkah menghitung penjumlahan susun panjang & pendek dengan mudah dan jelas.',
        url: 'https://www.youtube.com/watch?v=uY1Wndy5N0o',
        channel: 'Bu Retno - Belajar Matematika',
        ageFit: 'Kelas 1–6 SD'
      }
    ],
  
    // 9 Strategi Berpikir (Strategy Library)
    methods: [
      {
        id: 'decomposition',
        name: 'Pecah Angka',
        nameEn: 'Split Numbers',
        badge: 'Nilai Tempat',
        badgeEn: 'Place Value',
        icon: '🧩',
        summary: 'Pisahkan puluhan dan satuan, jumlahkan masing-masing kelompok, lalu satukan kembali hasilnya!',
        summaryEn: 'Separate tens and ones, add each group, then combine them back together!',
        whyGood: 'Sangat mudah karena otak kita terbiasa menghitung puluhan dan satuan secara terpisah.',
        whyGoodEn: 'Super intuitive because our brain naturally groups tens and ones separately.'
      },
      {
        id: 'number-bonds',
        name: 'Number Bonds',
        nameEn: 'Number Bonds',
        badge: 'Bongkar Pasang',
        badgeEn: 'Deconstruct & Bond',
        icon: '🔗',
        summary: 'Bongkar angka menjadi cabang-cabang bagian yang ramah, lalu hubungkan kembali membentuk total.',
        summaryEn: 'Break numbers into friendly branches, then reconnect them to find the total.',
        whyGood: 'Membantu melihat bahwa angka bisa dibongkar pasang seperti balok lego.',
        whyGoodEn: 'Helps you see that numbers can be disassembled and rebuilt like Lego blocks.'
      },
      {
        id: 'make-hundred',
        name: 'Bikin 100',
        nameEn: 'Make 100',
        badge: 'Make Ten / Hundred',
        badgeEn: 'Round to 100',
        icon: '🔟',
        summary: 'Pinjam sedikit dari angka sebelah untuk menggenapkan angka utama menjadi 100 bulat yang nyaman!',
        summaryEn: 'Borrow a little from the other number to round up to a friendly, solid 100!',
        whyGood: 'Menghitung dari 100 itu super enteng dan bebas pusing.',
        whyGoodEn: 'Adding from 100 is effortless and stress-free.'
      },
      {
        id: 'compensation',
        name: 'Kompensasi',
        nameEn: 'Compensation',
        badge: 'Hampir Bulat',
        badgeEn: 'Near Round',
        icon: '⚖️',
        summary: 'Jika angka hampir bulat (seperti 59 → 60), genapkan dulu! Nanti di akhir tinggal kembalikan kelebihannya.',
        summaryEn: 'If a number is nearly round (like 59 → 60), round up first! Then subtract the extra at the end.',
        whyGood: 'Jurus favorit para jagoan mental math untuk angka yang berakhiran 8 atau 9.',
        whyGoodEn: 'Favorite strategy of mental math champions for numbers ending in 8 or 9.'
      },
      {
        id: 'number-line',
        name: 'Garis Bilangan',
        nameEn: 'Number Line',
        badge: 'Lompatan Chunk',
        badgeEn: 'Chunk Jumps',
        icon: '📏',
        summary: 'Melompat di garis bilangan dengan langkah-langkah besar (+50, lalu +9) tanpa perlu melompat satu-satu.',
        summaryEn: 'Hop along the number line with big chunk jumps (+50, then +9) instead of counting by ones.',
        whyGood: 'Mata bisa langsung melihat perjalanan jarak dari titik awal ke titik akhir.',
        whyGoodEn: 'Your eyes clearly see the journey from starting point to the destination.'
      },
      {
        id: 'base-ten',
        name: 'Balok Nilai Tempat',
        nameEn: 'Base-Ten Blocks',
        badge: 'Base-Ten Blocks',
        badgeEn: 'Manipulatives',
        icon: '🧱',
        summary: 'Gunakan batang puluhan (rods) dan kubus satuan (cubes). Bila ada 10 kubus, tukar menjadi 1 batang baru!',
        summaryEn: 'Use 10-rods and 1-cubes. Whenever you have 10 cubes, trade them for 1 new rod (regrouping)!',
        whyGood: 'Wujud fisik nyata dari konsep menyimpan (regrouping / carrying).',
        whyGoodEn: 'The real physical foundation of carrying and regrouping.'
      },
      {
        id: 'bar-model',
        name: 'Bar / Tape Model',
        nameEn: 'Bar / Tape Model',
        badge: 'Model Batang',
        badgeEn: 'Tape Diagram',
        icon: '📦',
        summary: 'Gunakan batang proporsional untuk membandingkan ukuran bagian pertama, bagian kedua, dan total gabungannya.',
        summaryEn: 'Use proportional bars to visualize part-whole relationships and the combined total.',
        whyGood: 'Jembatan terbaik untuk memahami soal cerita dan relasi bagian-ke-keseluruhan.',
        whyGoodEn: 'The best bridge for understanding word problems and part-whole logic.'
      },
      {
        id: 'mental-math',
        name: 'Mental Math',
        nameEn: 'Mental Math',
        badge: 'Angka Ramah',
        badgeEn: 'Friendly Numbers',
        icon: '🧠',
        summary: 'Atur angka di pikiran menjadi bentuk yang paling enak diajak kerja sama sebelum dieksekusi.',
        summaryEn: 'Rearrange numbers in your mind into the friendliest shapes before calculating.',
        whyGood: 'Melatih kelenturan berpikir (number sense) di kepala.',
        whyGoodEn: 'Builds mental flexibility and strong numerical intuition.'
      },
      {
        id: 'soroban',
        name: 'Soroban Abacus',
        nameEn: 'Soroban Abacus',
        badge: 'Sempoa Jepang',
        badgeEn: 'Japanese Abacus',
        icon: '🧮',
        summary: 'Pendekatan sempoa visual: manik atas bernilai 5 (surga) dan manik bawah bernilai 1 (bumi).',
        summaryEn: 'Visual bead abacus: upper bead equals 5 (heaven) and lower beads equal 1 (earth).',
        whyGood: 'Dasar visual berhitung cepat yang melatih fokus dan bayangan mental.',
        whyGoodEn: 'Visual foundation for high-speed calculation and vivid mental math imaging.'
      },
      {
        id: 'tens-frame',
        name: 'Kotak 10 Frame',
        nameEn: 'Ten-Frames',
        badge: 'Kelas 1 SD',
        badgeEn: 'Grade 1 Math',
        icon: '🔴',
        summary: 'Alat peraga visual Kotak 10 (Ten-Frame) standar Kelas 1 SD untuk melihat pengelompokan Kawan 10 dan sisa satuannya secara nyata!',
        summaryEn: 'Visual Ten-Frame manipulatives designed for 1st graders to intuitively spot Make-10 pairs and leftover units!',
        whyGood: 'Sangat cocok untuk anak Kelas 1 SD karena dapat menghitung benda nyata dan melihat kapan kotak terisi penuh 10.',
        whyGoodEn: 'Perfect for 1st graders to count concrete objects and visualize when a frame reaches a full ten.'
      }
    ],
  
    // Preset Pilihan Cepat Soal Flagship & Variasi (Termasuk Level Khusus Kelas 1 SD)
    presetExamples: [
      // --- Level 1: Sahabat 10 (Kelas 1 SD) ---
      { a: 7, b: 5, level: 'sd1', label: '7 + 5 (Kawan 10 Dasar)', labelEn: '7 + 5 (Make 10 Basic)', highlight: true },
      { a: 8, b: 6, level: 'sd1', label: '8 + 6 (Bikin 10 Ceria)', labelEn: '8 + 6 (Make 10 Fun)' },
      { a: 9, b: 4, level: 'sd1', label: '9 + 4 (Hampir 10)', labelEn: '9 + 4 (Near 10)' },
      { a: 8, b: 7, level: 'sd1', label: '8 + 7 (Dobel + 1)', labelEn: '8 + 7 (Doubles + 1)' },
      // --- Level 2: Menembus Puluhan (Kelas 1 SD) ---
      { a: 15, b: 8, level: 'sd1', label: '15 + 8 (Lompat Puluhan)', labelEn: '15 + 8 (Jump Tens)' },
      { a: 24, b: 13, level: 'sd1', label: '24 + 13 (Puluhan Bersahabat)', labelEn: '24 + 13 (Friendly Tens)' },
      { a: 36, b: 19, level: 'sd1', label: '36 + 19 (Dekat 20)', labelEn: '36 + 19 (Near 20)' },
      // --- Level 3: Mahir Ratusan & Flagship Soal ---
      { a: 67, b: 59, level: 'master', label: '67 + 59 (Flagship Master)', labelEn: '67 + 59 (Flagship Master)', highlight: true },
      { a: 68, b: 32, level: 'master', label: '68 + 32 (Pas 100 Bulat)', labelEn: '68 + 32 (Make 100)' },
      { a: 125, b: 75, level: 'master', label: '125 + 75 (Ratusan)', labelEn: '125 + 75 (Hundreds)' }
    ],
  
    // Bank Soal Latihan Multi-Strategi
    practiceProblems: [
      {
        id: 'p1',
        a: 67,
        b: 59,
        answer: 126,
        question: '67 + 59 = ?',
        story: 'Kadek mengumpulkan 67 kerang di pantai Sanur, lalu Wayan memberinya 59 kerang lagi. Berapa total kerang mereka sekarang?',
        storyEn: 'Kadek collected 67 seashells at Sanur Beach, then Wayan gave him 59 more. How many seashells do they have in total?',
        recommended: ['compensation', 'make-hundred', 'decomposition'],
        hints: [
          '💡 Petunjuk 1: Coba perhatikan angka 59. Angka ini hampir jadi angka berapa yang bulat ya?',
          '💡 Petunjuk 2: 59 hampir jadi 60! Coba bayangkan 67 + 60 dulu. Berapa hasilnya?',
          '💡 Petunjuk 3: 67 + 60 = 127. Karena tadi kita melebihkan 1, sekarang kurangi 1: 127 - 1 = 126! 🎉'
        ],
        hintsEn: [
          '💡 Hint 1: Look closely at 59. What round number is it almost close to?',
          '💡 Hint 2: 59 is almost 60! First imagine 67 + 60. What do you get?',
          '💡 Hint 3: 67 + 60 = 127. Since we added 1 too many, subtract 1 now: 127 - 1 = 126! 🎉'
        ],
        explanation: '59 → 60. Maka 67 + 60 = 127. Lalu kembalikan 1: 127 - 1 = 126!',
        explanationEn: '59 → 60. Then 67 + 60 = 127. Subtract 1: 127 - 1 = 126!'
      },
      {
        id: 'p2',
        a: 68,
        b: 32,
        answer: 100,
        question: '68 + 32 = ?',
        story: 'Ibu membeli 68 kue lapis dan 32 lemper untuk perayaan sekolah. Berapa jumlah kue semuanya?',
        storyEn: 'Mom bought 68 layer cakes and 32 sticky rice snacks for the school festival. How many cakes are there altogether?',
        recommended: ['make-hundred', 'decomposition'],
        hints: [
          '💡 Petunjuk 1: Coba lihat satuannya: 8 + 2. Pas banget menghasilkan berapa?',
          '💡 Petunjuk 2: 8 + 2 = 10. Sekarang puluhan: 60 + 30 = 90.',
          '💡 Petunjuk 3: 90 + 10 = 100 bulat sempurna! Keren banget kan?'
        ],
        hintsEn: [
          '💡 Hint 1: Check the ones digits: 8 + 2. What perfect number do they make?',
          '💡 Hint 2: 8 + 2 = 10. Now add the tens: 60 + 30 = 90.',
          '💡 Hint 3: 90 + 10 = 100 perfectly! Awesome, right?'
        ],
        explanation: '68 butuh 32 untuk menjadi 100. Pasangan sempurna langsung menghasilkan 100!',
        explanationEn: '68 needs 32 to become 100. Perfect partners instantly make 100!'
      },
      {
        id: 'p3',
        a: 125,
        b: 75,
        answer: 200,
        question: '125 + 75 = ?',
        story: 'Di perpustakaan ada 125 buku dongeng dan 75 buku ensiklopedia. Berapa jumlah buku seluruhnya?',
        storyEn: 'In the library there are 125 storybooks and 75 encyclopedias. How many books are there in total?',
        recommended: ['make-hundred', 'number-line'],
        hints: [
          '💡 Petunjuk 1: Fokus ke ekornya: 25 + 75 itu pasangan istimewa loh!',
          '💡 Petunjuk 2: 25 + 75 = 100. Sekarang satukan dengan 100 yang ada di depan 125.',
          '💡 Petunjuk 3: 100 + 100 = 200! Tepat sekali!'
        ],
        hintsEn: [
          '💡 Hint 1: Look at the endings: 25 + 75 is a famous pair!',
          '💡 Hint 2: 25 + 75 = 100. Now combine with the 100 in front of 125.',
          '💡 Hint 3: 100 + 100 = 200! Exactly right!'
        ],
        explanation: '125 + 75 = 100 + (25 + 75) = 100 + 100 = 200!',
        explanationEn: '125 + 75 = 100 + (25 + 75) = 100 + 100 = 200!'
      },
      {
        id: 'p4',
        a: 49,
        b: 51,
        answer: 100,
        question: '49 + 51 = ?',
        story: 'Budi punya 49 kelereng biru dan 51 kelereng merah. Berapa kelereng Budi semuanya?',
        storyEn: 'Budi has 49 blue marbles and 51 red marbles. How many marbles does Budi have in total?',
        recommended: ['compensation', 'make-hundred'],
        hints: [
          '💡 Petunjuk 1: Pindahkan 1 kelereng dari 51 ke 49.',
          '💡 Petunjuk 2: Sekarang kedua kelompok sama-sama menjadi 50 dan 50!',
          '💡 Petunjuk 3: 50 + 50 = 100! Seimbang dan sangat cepat!'
        ],
        hintsEn: [
          '💡 Hint 1: Move 1 marble from 51 to 49.',
          '💡 Hint 2: Now both piles become 50 and 50!',
          '💡 Hint 3: 50 + 50 = 100! Balanced and super quick!'
        ],
        explanation: 'Pindahkan 1 dari 51 ke 49 → menjadi 50 + 50 = 100!',
        explanationEn: 'Shift 1 from 51 to 49 → becomes 50 + 50 = 100!'
      },
      {
        id: 'p5',
        a: 58,
        b: 29,
        answer: 87,
        question: '58 + 29 = ?',
        story: 'Ada 58 burung di pohon beringin dan datang lagi 29 burung. Berapa burung semuanya?',
        storyEn: 'There are 58 birds on the banyan tree and 29 more join in. How many birds are there altogether?',
        recommended: ['compensation', 'number-line'],
        hints: [
          '💡 Petunjuk 1: 29 hampir jadi 30 (cuma kurang 1).',
          '💡 Petunjuk 2: Hitung 58 + 30 = 88.',
          '💡 Petunjuk 3: Kurangi 1 karena tadi kebanyakan: 88 - 1 = 87!'
        ],
        hintsEn: [
          '💡 Hint 1: 29 is almost 30 (just 1 away).',
          '💡 Hint 2: Add 58 + 30 = 88.',
          '💡 Hint 3: Subtract 1 because we added 1 too many: 88 - 1 = 87!'
        ],
        explanation: '58 + 30 = 88. Lalu 88 - 1 = 87!',
        explanationEn: '58 + 30 = 88. Then 88 - 1 = 87!'
      }
    ],
  
    // Pertanyaan Metakognisi Setelah Berhasil
    metacognition: {
      question: 'Kenapa kamu memilih cara ini?',
      questionEn: 'Why did you choose this strategy?',
      options: [
        { id: 'opt1', text: '🧩 Angkanya gampang dipecah puluhan & satuan', textEn: '🧩 Numbers easily split into tens & ones' },
        { id: 'opt2', text: '🔟 Bisa langsung dibikin pas 100', textEn: '🔟 Can quickly round up to 100' },
        { id: 'opt3', text: '⚖️ Enak dibulatkan lalu dikembalikan lebihnya', textEn: '⚖️ Easy to round up then adjust the difference' },
        { id: 'opt4', text: '📏 Paling jelas dan kelihatan di garis bilangan', textEn: '📏 Clearest and easiest to see on number line' },
        { id: 'opt5', text: '⚡ Cara ini terasa paling santai di kepalaku', textEn: '⚡ Feels most effortless in my head' }
      ]
    },
  
    // Lencana Penghargaan Eksplorasi (Reward Mindset)
    badges: [
      { id: 'badge-decomp', name: 'Number Builder', icon: '🧩', desc: 'Mencoba jurus Pecah Angka', descEn: 'Tried Split Numbers strategy' },
      { id: 'badge-make100', name: 'Hundred Maker', icon: '🔟', desc: 'Menggenapkan angka ke 100', descEn: 'Rounded numbers up to 100' },
      { id: 'badge-line', name: 'Number Line Rider', icon: '📏', desc: 'Melompat chunk di Garis Bilangan', descEn: 'Made chunk jumps on Number Line' },
      { id: 'badge-blocks', name: 'Block Master', icon: '🧱', desc: 'Menata balok dan regrouping', descEn: 'Regrouped Base-Ten blocks' },
      { id: 'badge-comp', name: 'Balance Wizard', icon: '⚖️', desc: 'Menguasai jurus Kompensasi', descEn: 'Mastered Compensation trick' },
      { id: 'badge-abacus', name: 'Abacus Explorer', icon: '🧮', desc: 'Menjelajahi sempoa Soroban', descEn: 'Explored Soroban abacus beads' }
    ]
  };
  

  // --- Source: js/data/geo-data.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Geography Master Dataset & Bali Module
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 09:45:00
  // ================================================================
  
  const GEO_DATA = {
    id: 'geografi',
    title: 'Geografi — Jelajah Bumi & Nusantara',
    titleEn: 'Geography — Discover Earth & Indonesia',
    subtitle: 'Yuk keliling Bumi yang bulat, kenali 38 provinsi Indonesia, cari kota-kota seru, dan jelajahi pulau dewata Bali! 🌍',
    subtitleEn: 'Explore the spherical Earth, learn 38 Indonesian provinces, find famous cities, and explore Bali! 🌍',
  
    // Metadata Sumber Data Resmi (Sesuai Syarat Mandatori)
    metadata: {
      source: 'Kementerian Dalam Negeri Republik Indonesia & Badan Pusat Statistik (BPS) 2026',
      reviewedAt: '2026-09-10',
      curator: 'Development · Anabhi Dev',
      scope: 'Daftar Negara-Negara di Dunia (6 Benua Lengkap), 38 Provinsi Resmi Indonesia, 38 Ibu Kota, Kota Terkenal Non-Ibu Kota Terpilih, dan 8 Kabupaten + 1 Kota Provinsi Bali.'
    },
  
    // 3 Slot Video YouTube Geografi (Otomatis tersembunyi bila url kosong)
    videoSlots: [
      {
        id: 'geo-yt-1',
        title: '1. Mengenal Bumi & Globe yang Berputar',
        description: 'Kenapa Bumi tampak bulat seperti bola biru dari luar angkasa? Yuk tonton penjelasannya!',
        url: '',
        ageFit: 'Kelas 1 SD'
      },
      {
        id: 'geo-yt-2',
        title: '2. Keliling Dunia & Benua Sahabat',
        description: 'Mengenal benua Asia, Afrika, Eropa, Amerika, dan Australia dengan seru.',
        url: '',
        ageFit: 'Kelas 1 SD'
      },
      {
        id: 'geo-yt-3',
        title: '3. Indonesia yang Luas: 38 Provinsi Indah',
        description: 'Jelajah nusantara dari Sabang sampai Merauke, dari Miangas hingga Pulau Rote.',
        url: '',
        ageFit: 'Kelas 1 SD'
      }
    ],
  
    // 1. Pengenalan Bumi & Fakta Bentuk Bola
    earthIntro: {
      heading: 'Bumi Kita: Rumah Berbentuk Bola yang Indah',
      headingEn: 'Our Earth: A Beautiful Spherical Home',
      funFactBadge: '🌍 Fakta Keren Antariksa',
      funFactBadgeEn: '🌍 Space Wonder Fact',
      explanation: 'Tahukah kamu? Bumi tempat kita tinggal berbentuk hampir bulat sempurna seperti bola! Para astronaut di luar angkasa melihat Bumi seperti kelereng biru berkilau yang berputar anggun. Walaupun di kutubnya sedikit pepat (istilah ilmiahnya geoid / oblate spheroid), dari luar Bumi tampak bulat bola bundar!',
      explanationEn: 'Did you know? The Earth we live on is almost a perfect sphere! Astronauts in outer space see Earth as a shining blue marble gracefully spinning. Although slightly flattened at the poles (scientifically an oblate spheroid), from space Earth appears beautifully spherical and round!',
      highlights: [
        { icon: '🌐', title: 'Hampir Bulat Seperti Bola', titleEn: 'Spherical Like a Globe', desc: 'Bukan datar seperti piring, melainkan bola 3D raksasa yang berputar siang dan malam.', descEn: 'Not flat like a disc, but a massive 3D sphere spinning day and night.' },
        { icon: '🌊', title: '70% Tertutup Air', titleEn: '70% Covered by Water', desc: 'Lautan luas membuat Bumi berwarna biru cerah dipandang dari antariksa.', descEn: 'Vast oceans make Earth look brilliantly blue from outer space.' },
        { icon: '🔄', title: 'Bumi Terus Berputar (Rotasi)', titleEn: 'Earth Continuously Rotates', desc: 'Perputaran Bumi pada porosnya membuat ada waktu pagi ceria dan malam berbintang.', descEn: 'Rotation on its axis brings bright sunny mornings and starry nights.' },
        { icon: '🇮🇩', title: 'Indonesia di Garis Khatulistiwa', titleEn: 'Indonesia on the Equator', desc: 'Negara kita berada tepat di tengah Bumi, jadi hangat dan mendapat sinar matahari sepanjang tahun!', descEn: 'Our archipelago sits right on the Equator, enjoying warm sunshine all year round!' }
      ]
    },
  
    // 1.5. Daftar Negara-Negara di Dunia (6 Benua Lengkap)
    countries: [
      {
          "id": "indonesia",
          "name": "Indonesia",
          "nameEn": "Indonesia",
          "capital": "Jakarta / IKN Nusantara",
          "continent": "Asia",
          "flag": "🇮🇩",
          "currency": "Rupiah (IDR)",
          "landmark": "Monas, Candi Borobudur, & Danau Toba",
          "language": "Bahasa Indonesia",
          "funFact": "Negara kepulauan terbesar di dunia dengan lebih dari 17.000 pulau eksotis.",
          "coords": [
              106.8,
              -6.2
          ]
      },
      {
          "id": "malaysia",
          "name": "Malaysia",
          "nameEn": "Malaysia",
          "capital": "Kuala Lumpur",
          "continent": "Asia",
          "flag": "🇲🇾",
          "currency": "Ringgit (MYR)",
          "landmark": "Menara Kembar Petronas & Batu Caves",
          "language": "Bahasa Melayu",
          "funFact": "Punya menara kembar tertinggi di dunia yang dihubungkan jembatan udara megah.",
          "coords": [
              101.7,
              3.1
          ]
      },
      {
          "id": "singapura",
          "name": "Singapura",
          "nameEn": "Singapore",
          "capital": "Singapura",
          "continent": "Asia",
          "flag": "🇸🇬",
          "currency": "Dolar Singapura (SGD)",
          "landmark": "Patung Merlion & Gardens by the Bay",
          "language": "Inggris, Melayu, Mandarin, Tamil",
          "funFact": "Negara pulau terbersih dan paling hijau dengan pohon-pohon buatan raksasa bercahaya.",
          "coords": [
              103.8,
              1.35
          ]
      },
      {
          "id": "brunei",
          "name": "Brunei Darussalam",
          "nameEn": "Brunei",
          "capital": "Bandar Seri Begawan",
          "continent": "Asia",
          "flag": "🇧🇳",
          "currency": "Dolar Brunei (BND)",
          "landmark": "Masjid Sultan Omar Ali Saifuddien",
          "language": "Bahasa Melayu",
          "funFact": "Kubah masjid megahnya terbuat dari emas murni 24 karat yang berkilau indah.",
          "coords": [
              114.9,
              4.9
          ]
      },
      {
          "id": "thailand",
          "name": "Thailand",
          "nameEn": "Thailand",
          "capital": "Bangkok",
          "continent": "Asia",
          "flag": "🇹🇭",
          "currency": "Baht (THB)",
          "landmark": "Grand Palace & Kuil Fajar Wat Arun",
          "language": "Bahasa Thai",
          "funFact": "Dijuluki Negeri Gajah Putih dan Negeri Senyuman (Land of Smiles).",
          "coords": [
              100.5,
              13.75
          ]
      },
      {
          "id": "filipina",
          "name": "Filipina",
          "nameEn": "Philippines",
          "capital": "Manila",
          "continent": "Asia",
          "flag": "🇵🇭",
          "currency": "Peso Filipina (PHP)",
          "landmark": "Bukit Cokelat Bohol & Kota Bersejarah Intramuros",
          "language": "Filipino / Tagalog & Inggris",
          "funFact": "Punya bukit-bukit kapur unik yang berubah warna kecokelatan saat musim kemarau.",
          "coords": [
              121,
              14.6
          ]
      },
      {
          "id": "vietnam",
          "name": "Vietnam",
          "nameEn": "Vietnam",
          "capital": "Hanoi",
          "continent": "Asia",
          "flag": "🇻🇳",
          "currency": "Dong (VND)",
          "landmark": "Teluk Ha Long & Jembatan Emas Da Nang",
          "language": "Bahasa Vietnam",
          "funFact": "Teluk Ha Long punya ribuan pulau batu karang yang menjulang tinggi di atas zamrud laut.",
          "coords": [
              105.8,
              21
          ]
      },
      {
          "id": "jepang",
          "name": "Jepang",
          "nameEn": "Japan",
          "capital": "Tokyo",
          "continent": "Asia",
          "flag": "🇯🇵",
          "currency": "Yen (JPY)",
          "landmark": "Gunung Fuji & Menara Tokyo",
          "language": "Bahasa Jepang",
          "funFact": "Negara matahari terbit dengan kereta cepat Shinkansen yang super tepat waktu.",
          "coords": [
              139.7,
              35.7
          ]
      },
      {
          "id": "korea-selatan",
          "name": "Korea Selatan",
          "nameEn": "South Korea",
          "capital": "Seoul",
          "continent": "Asia",
          "flag": "🇰🇷",
          "currency": "Won (KRW)",
          "landmark": "Istana Gyeongbokgung & Menara N Seoul",
          "language": "Bahasa Korea (Hangeul)",
          "funFact": "Negara ginseng asal musik K-Pop dan serial animasi ramah anak seperti Pororo & Tayo.",
          "coords": [
              126.98,
              37.56
          ]
      },
      {
          "id": "tiongkok",
          "name": "Tiongkok",
          "nameEn": "China",
          "capital": "Beijing",
          "continent": "Asia",
          "flag": "🇨🇳",
          "currency": "Yuan / Renminbi (CNY)",
          "landmark": "Tembok Besar Tiongkok & Kota Terlarang",
          "language": "Mandarin",
          "funFact": "Tembok besarnya membentang ribuan kilometer melintasi pegunungan gagah.",
          "coords": [
              116.4,
              39.9
          ]
      },
      {
          "id": "india",
          "name": "India",
          "nameEn": "India",
          "capital": "New Delhi",
          "continent": "Asia",
          "flag": "🇮🇳",
          "currency": "Rupee India (INR)",
          "landmark": "Taj Mahal & Gerbang India (India Gate)",
          "language": "Hindi & Inggris",
          "funFact": "Taj Mahal dari marmer putih dibangun sebagai lambang cinta yang megah.",
          "coords": [
              77.2,
              28.6
          ]
      },
      {
          "id": "arab-saudi",
          "name": "Arab Saudi",
          "nameEn": "Saudi Arabia",
          "capital": "Riyadh",
          "continent": "Asia",
          "flag": "🇸🇦",
          "currency": "Riyal (SAR)",
          "landmark": "Ka'bah di Makkah & Masjid Nabawi Madinah",
          "language": "Bahasa Arab",
          "funFact": "Tempat dua kota suci umat Islam yang dikunjungi jutaan orang dari seluruh penjuru dunia.",
          "coords": [
              46.7,
              24.7
          ]
      },
      {
          "id": "uea",
          "name": "Uni Emirat Arab",
          "nameEn": "United Arab Emirates",
          "capital": "Abu Dhabi",
          "continent": "Asia",
          "flag": "🇦🇪",
          "currency": "Dirham (AED)",
          "landmark": "Burj Khalifa Dubai & Masjid Agung Sheikh Zayed",
          "language": "Bahasa Arab",
          "funFact": "Punya Burj Khalifa, gedung tertinggi di dunia yang menembus awan setinggi 828 meter!",
          "coords": [
              54.4,
              24.5
          ]
      },
      {
          "id": "turki",
          "name": "Turki",
          "nameEn": "Turkey",
          "capital": "Ankara",
          "continent": "Asia",
          "flag": "🇹🇷",
          "currency": "Lira Turki (TRY)",
          "landmark": "Hagia Sophia & Balon Udara Cappadocia",
          "language": "Bahasa Turki",
          "funFact": "Negara unik yang berada di dua benua sekaligus: sebagian di Asia dan sebagian di Eropa!",
          "coords": [
              32.85,
              39.93
          ]
      },
      {
          "id": "palestina",
          "name": "Palestina",
          "nameEn": "Palestine",
          "capital": "Yerusalem Timur",
          "continent": "Asia",
          "flag": "🇵🇸",
          "currency": "Shekel & Dinar",
          "landmark": "Masjid Al-Aqsa & Kubah As-Sakhrah",
          "language": "Bahasa Arab",
          "funFact": "Tanah bersejarah para nabi dengan pohon zaitun tertua di dunia yang berbuah lebat.",
          "coords": [
              35.2,
              31.8
          ]
      },
      {
          "id": "qatar",
          "name": "Qatar",
          "nameEn": "Qatar",
          "capital": "Doha",
          "continent": "Asia",
          "flag": "🇶🇦",
          "currency": "Riyal Qatar (QAR)",
          "landmark": "Museum Seni Islam & Pulau The Pearl",
          "language": "Bahasa Arab",
          "funFact": "Negara modern yang pernah sukses menjadi tuan rumah Piala Dunia sepak bola.",
          "coords": [
              51.5,
              25.3
          ]
      },
      {
          "id": "iran",
          "name": "Iran",
          "nameEn": "Iran",
          "capital": "Teheran",
          "continent": "Asia",
          "flag": "🇮🇷",
          "currency": "Rial Iran (IRR)",
          "landmark": "Menara Azadi & Reruntuhan Kuno Persepolis",
          "language": "Bahasa Persia (Farsi)",
          "funFact": "Pusat peradaban Persia kuno yang terkenal dengan karpet anyaman tangan bernilai tinggi.",
          "coords": [
              51.4,
              35.7
          ]
      },
      {
          "id": "pakistan",
          "name": "Pakistan",
          "nameEn": "Pakistan",
          "capital": "Islamabad",
          "continent": "Asia",
          "flag": "🇵🇰",
          "currency": "Rupee Pakistan (PKR)",
          "landmark": "Masjid Faisal & Puncak Gunung K2",
          "language": "Urdu & Inggris",
          "funFact": "Punya puncak gunung K2, gunung tertinggi kedua di dunia yang diselimuti salju abadi.",
          "coords": [
              73,
              33.7
          ]
      },
      {
          "id": "timor-leste",
          "name": "Timor Leste",
          "nameEn": "Timor-Leste",
          "capital": "Dili",
          "continent": "Asia",
          "flag": "🇹🇱",
          "currency": "Dolar AS (USD)",
          "landmark": "Patung Cristo Rei Dili & Pantai Areia Branca",
          "language": "Tetum & Portugis",
          "funFact": "Tetangga timur pulau Timor dengan terumbu karang pulau Atauro yang sangat kaya hayati.",
          "coords": [
              125.6,
              -8.55
          ]
      },
      {
          "id": "kamboja",
          "name": "Kamboja",
          "nameEn": "Cambodia",
          "capital": "Phnom Penh",
          "continent": "Asia",
          "flag": "🇰🇭",
          "currency": "Riel (KHR)",
          "landmark": "Kompleks Candi Angkor Wat",
          "language": "Bahasa Khmer",
          "funFact": "Angkor Wat adalah monumen keagamaan terbesar di dunia yang dibangun ribuan tahun lalu.",
          "coords": [
              104.9,
              11.55
          ]
      },
      {
          "id": "inggris",
          "name": "Inggris (Britania Raya)",
          "nameEn": "United Kingdom",
          "capital": "London",
          "continent": "Eropa",
          "flag": "🇬🇧",
          "currency": "Poundsterling (GBP)",
          "landmark": "Menara Jam Big Ben, London Eye, & Tower Bridge",
          "language": "Bahasa Inggris",
          "funFact": "Asal mula bahasa Inggris internasional dan bus tingkat merah ikonik yang lucu.",
          "coords": [
              -0.12,
              51.5
          ]
      },
      {
          "id": "prancis",
          "name": "Prancis",
          "nameEn": "France",
          "capital": "Paris",
          "continent": "Eropa",
          "flag": "🇫🇷",
          "currency": "Euro (EUR)",
          "landmark": "Menara Eiffel & Museum Seni Louvre",
          "language": "Bahasa Prancis",
          "funFact": "Menara Eiffel terbuat dari besi tempa dan bisa bertambah tinggi 15 cm saat musim panas!",
          "coords": [
              2.35,
              48.85
          ]
      },
      {
          "id": "jerman",
          "name": "Jerman",
          "nameEn": "Germany",
          "capital": "Berlin",
          "continent": "Eropa",
          "flag": "🇩🇪",
          "currency": "Euro (EUR)",
          "landmark": "Gerbang Brandenburg & Kastil Neuschwanstein",
          "language": "Bahasa Jerman",
          "funFact": "Kastil Neuschwanstein di Jerman menjadi inspirasi kastil dongeng Cinderella di Disney!",
          "coords": [
              13.4,
              52.5
          ]
      },
      {
          "id": "italia",
          "name": "Italia",
          "nameEn": "Italy",
          "capital": "Roma",
          "continent": "Eropa",
          "flag": "🇮🇹",
          "currency": "Euro (EUR)",
          "landmark": "Colosseum Roma & Menara Miring Pisa",
          "language": "Bahasa Italia",
          "funFact": "Negara asal pizza dan pasta lezat! Menara Pisa miring karena tanahnya lunak saat dibangun.",
          "coords": [
              12.5,
              41.9
          ]
      },
      {
          "id": "belanda",
          "name": "Belanda",
          "nameEn": "Netherlands",
          "capital": "Amsterdam",
          "continent": "Eropa",
          "flag": "🇳🇱",
          "currency": "Euro (EUR)",
          "landmark": "Kincir Angin Zaanse Schans & Kebun Tulip Keukenhof",
          "language": "Bahasa Belanda",
          "funFact": "Negara kincir angin dan bunga tulip yang memiliki lebih banyak sepeda daripada penduduknya!",
          "coords": [
              4.9,
              52.37
          ]
      },
      {
          "id": "spanyol",
          "name": "Spanyol",
          "nameEn": "Spain",
          "capital": "Madrid",
          "continent": "Eropa",
          "flag": "🇪🇸",
          "currency": "Euro (EUR)",
          "landmark": "Katedral Sagrada Familia Barcelona & Istana Alhambra",
          "language": "Bahasa Spanyol",
          "funFact": "Katedral megah Sagrada Familia karya arsitek Gaudi sudah dibangun lebih dari 140 tahun.",
          "coords": [
              -3.7,
              40.4
          ]
      },
      {
          "id": "swiss",
          "name": "Swiss",
          "nameEn": "Switzerland",
          "capital": "Bern",
          "continent": "Eropa",
          "flag": "🇨🇭",
          "currency": "Franc Swiss (CHF)",
          "landmark": "Pegunungan Alpen & Puncak Matterhorn",
          "language": "Jerman, Prancis, Italia, Romansh",
          "funFact": "Terkenal dengan cokelat lezat, jam tangan presisi, dan desa pegunungan yang sangat bersih.",
          "coords": [
              7.45,
              46.95
          ]
      },
      {
          "id": "rusia",
          "name": "Rusia",
          "nameEn": "Russia",
          "capital": "Moskow",
          "continent": "Eropa",
          "flag": "🇷🇺",
          "currency": "Rubel Rusia (RUB)",
          "landmark": "Lapangan Merah & Katedral Santo Basil",
          "language": "Bahasa Rusia",
          "funFact": "Negara dengan wilayah terluas di dunia, mencakup 11 zona waktu yang berbeda!",
          "coords": [
              37.6,
              55.75
          ]
      },
      {
          "id": "norwegia",
          "name": "Norwegia",
          "nameEn": "Norway",
          "capital": "Oslo",
          "continent": "Eropa",
          "flag": "🇳🇴",
          "currency": "Krone Norwegia (NOK)",
          "landmark": "Fjord Geiranger & Fenomena Cahaya Aurora Borealis",
          "language": "Bahasa Norwegia",
          "funFact": "Di bagian utaranya matahari tidak pernah terbenam di musim panas (Midnight Sun)!",
          "coords": [
              10.75,
              59.9
          ]
      },
      {
          "id": "yunani",
          "name": "Yunani",
          "nameEn": "Greece",
          "capital": "Athena",
          "continent": "Eropa",
          "flag": "🇬🇷",
          "currency": "Euro (EUR)",
          "landmark": "Kuil Parthenon di Bukit Akropolis & Pulau Santorini",
          "language": "Bahasa Yunani",
          "funFact": "Tempat lahirnya pesta olahraga Olimpiade dunia pada ribuan tahun yang lalu.",
          "coords": [
              23.7,
              38
          ]
      },
      {
          "id": "portugal",
          "name": "Portugal",
          "nameEn": "Portugal",
          "capital": "Lisabon",
          "continent": "Eropa",
          "flag": "🇵🇹",
          "currency": "Euro (EUR)",
          "landmark": "Menara Belém & Trem Kuning Nomor 28",
          "language": "Bahasa Portugis",
          "funFact": "Punya kue tart telur custard manis Pastel de Nata yang terkenal di seluruh dunia.",
          "coords": [
              -9.14,
              38.72
          ]
      },
      {
          "id": "vatikan",
          "name": "Vatikan",
          "nameEn": "Vatican City",
          "capital": "Kota Vatikan",
          "continent": "Eropa",
          "flag": "🇻🇦",
          "currency": "Euro (EUR)",
          "landmark": "Basilika Santo Petrus & Kapel Sistina",
          "language": "Latin & Italia",
          "funFact": "Negara berdaulat terkecil di dunia, seluruh wilayahnya berada di dalam kota Roma.",
          "coords": [
              12.45,
              41.9
          ]
      },
      {
          "id": "swedia",
          "name": "Swedia",
          "nameEn": "Sweden",
          "capital": "Stockholm",
          "continent": "Eropa",
          "flag": "🇸🇪",
          "currency": "Krona Swedia (SEK)",
          "landmark": "Museum Kapal Laut Kuno Vasa & Kota Tua Gamla Stan",
          "language": "Bahasa Swedia",
          "funFact": "Tempat pemberian Penghargaan Nobel bergengsi bagi tokoh ilmuwan dan perdamaian dunia.",
          "coords": [
              18.06,
              59.33
          ]
      },
      {
          "id": "austria",
          "name": "Austria",
          "nameEn": "Austria",
          "capital": "Wina",
          "continent": "Eropa",
          "flag": "🇦🇹",
          "currency": "Euro (EUR)",
          "landmark": "Istana Schönbrunn & Gedung Opera Wina",
          "language": "Bahasa Jerman",
          "funFact": "Kota musik klasik dunia, rumah bagi komponis Mozart dan Beethoven berkarya.",
          "coords": [
              16.37,
              48.2
          ]
      },
      {
          "id": "belgia",
          "name": "Belgia",
          "nameEn": "Belgium",
          "capital": "Brussel",
          "continent": "Eropa",
          "flag": "🇧🇪",
          "currency": "Euro (EUR)",
          "landmark": "Monumen Atomium & Alun-alun Grand Place",
          "language": "Belanda, Prancis, Jerman",
          "funFact": "Terkenal dengan wafel renyah manis dan cokelat praline berbentuk kerang laut.",
          "coords": [
              4.35,
              50.85
          ]
      },
      {
          "id": "mesir",
          "name": "Mesir",
          "nameEn": "Egypt",
          "capital": "Kairo",
          "continent": "Afrika",
          "flag": "🇪🇬",
          "currency": "Pound Mesir (EGP)",
          "landmark": "Piramida Agung Giza & Patung Sphinx Raksasa",
          "language": "Bahasa Arab",
          "funFact": "Piramida Giza dibangun batu demi batu ribuan tahun lalu dan menjadi keajaiban dunia!",
          "coords": [
              31.23,
              30.04
          ]
      },
      {
          "id": "afrika-selatan",
          "name": "Afrika Selatan",
          "nameEn": "South Africa",
          "capital": "Pretoria / Cape Town",
          "continent": "Afrika",
          "flag": "🇿🇦",
          "currency": "Rand (ZAR)",
          "landmark": "Gunung Meja (Table Mountain) & Safari Kruger",
          "language": "11 Bahasa Resmi (Zulu, Xhosa, Afrikaans, dll)",
          "funFact": "Punya pantai Boulders tempat ribuan penguin liar berenang dan bermain di pantai.",
          "coords": [
              28.2,
              -25.75
          ]
      },
      {
          "id": "maroko",
          "name": "Maroko",
          "nameEn": "Morocco",
          "capital": "Rabat",
          "continent": "Afrika",
          "flag": "🇲🇦",
          "currency": "Dirham Maroko (MAD)",
          "landmark": "Masjid Hassan II Casablanca & Kota Biru Chefchaouen",
          "language": "Arab & Berber",
          "funFact": "Kota Chefchaouen dicat serba biru langit yang memesona di kaki pegunungan Rif.",
          "coords": [
              -6.85,
              34.02
          ]
      },
      {
          "id": "kenya",
          "name": "Kenya",
          "nameEn": "Kenya",
          "capital": "Nairobi",
          "continent": "Afrika",
          "flag": "🇰🇪",
          "currency": "Shilling Kenya (KES)",
          "landmark": "Cagar Alam Liar Maasai Mara & Gunung Kenya",
          "language": "Swahili & Inggris",
          "funFact": "Tempat melihat migrasi besar jutaan zebra dan rusa wildebeest menyeberangi sungai.",
          "coords": [
              36.8,
              -1.29
          ]
      },
      {
          "id": "madagaskar",
          "name": "Madagaskar",
          "nameEn": "Madagascar",
          "capital": "Antananarivo",
          "continent": "Afrika",
          "flag": "🇲🇬",
          "currency": "Ariary (MGA)",
          "landmark": "Jalan Pohon Baobab Raksasa (Avenue of the Baobabs)",
          "language": "Malagasi & Prancis",
          "funFact": "Pulau unik rumah bagi hewan lemur bermata bulat yang tidak ditemukan di alam lain.",
          "coords": [
              47.5,
              -18.88
          ]
      },
      {
          "id": "nigeria",
          "name": "Nigeria",
          "nameEn": "Nigeria",
          "capital": "Abuja",
          "continent": "Afrika",
          "flag": "🇳🇬",
          "currency": "Naira (NGN)",
          "landmark": "Batu Raksasa Zuma Rock & Taman Nasional Yankari",
          "language": "Bahasa Inggris",
          "funFact": "Negara dengan jumlah penduduk terbanyak di benua Afrika dan industri film Nollywood.",
          "coords": [
              7.5,
              9.07
          ]
      },
      {
          "id": "ghana",
          "name": "Ghana",
          "nameEn": "Ghana",
          "capital": "Accra",
          "continent": "Afrika",
          "flag": "🇬🇭",
          "currency": "Cedi (GHS)",
          "landmark": "Kastil Pesisir Elmina & Danau Volta Buatan",
          "language": "Bahasa Inggris",
          "funFact": "Salah satu produsen biji kakao terbaik di dunia untuk membuat cokelat lezat.",
          "coords": [
              -0.19,
              5.6
          ]
      },
      {
          "id": "aljazair",
          "name": "Aljazair",
          "nameEn": "Algeria",
          "capital": "Aljir",
          "continent": "Afrika",
          "flag": "🇩🇿",
          "currency": "Dinar Aljazair (DZD)",
          "landmark": "Monumen Martir & Gurun Pasir Sahara Tassili",
          "language": "Bahasa Arab",
          "funFact": "Negara dengan wilayah terluas di seluruh benua Afrika, sebagian besar gurun Sahara.",
          "coords": [
              3.06,
              36.75
          ]
      },
      {
          "id": "ethiopia",
          "name": "Ethiopia",
          "nameEn": "Ethiopia",
          "capital": "Addis Ababa",
          "continent": "Afrika",
          "flag": "🇪🇹",
          "currency": "Birr Ethiopia (ETB)",
          "landmark": "Gereja Batu Utuh Lalibela & Pegunungan Simien",
          "language": "Bahasa Amharik",
          "funFact": "Tempat asal mula ditemukannya tanaman kopi pertama kali di dunia oleh penggembala kambing!",
          "coords": [
              38.75,
              9.03
          ]
      },
      {
          "id": "tanzania",
          "name": "Tanzania",
          "nameEn": "Tanzania",
          "capital": "Dodoma",
          "continent": "Afrika",
          "flag": "🇹🇿",
          "currency": "Shilling Tanzania (TZS)",
          "landmark": "Gunung Salju Kilimanjaro & Kawah Ngorongoro",
          "language": "Swahili & Inggris",
          "funFact": "Gunung Kilimanjaro adalah puncak tertinggi di benua Afrika yang memiliki salju di khatulistiwa!",
          "coords": [
              35.75,
              -6.17
          ]
      },
      {
          "id": "amerika-serikat",
          "name": "Amerika Serikat",
          "nameEn": "United States",
          "capital": "Washington, D.C.",
          "continent": "Amerika Utara",
          "flag": "🇺🇸",
          "currency": "Dolar AS (USD)",
          "landmark": "Patung Liberty New York & Ngarai Grand Canyon",
          "language": "Bahasa Inggris",
          "funFact": "Patung Liberty adalah hadiah persahabatan dari rakyat Prancis kepada Amerika Serikat.",
          "coords": [
              -77.04,
              38.9
          ]
      },
      {
          "id": "kanada",
          "name": "Kanada",
          "nameEn": "Canada",
          "capital": "Ottawa",
          "continent": "Amerika Utara",
          "flag": "🇨🇦",
          "currency": "Dolar Kanada (CAD)",
          "landmark": "Menara CN Toronto, Danau Louise, & Air Terjun Niagara",
          "language": "Inggris & Prancis",
          "funFact": "Negara dengan garis pantai terpanjang di dunia dan terkenal dengan sirup maple manis.",
          "coords": [
              -75.7,
              45.42
          ]
      },
      {
          "id": "meksiko",
          "name": "Meksiko",
          "nameEn": "Mexico",
          "capital": "Mexico City",
          "continent": "Amerika Utara",
          "flag": "🇲🇽",
          "currency": "Peso Meksiko (MXN)",
          "landmark": "Piramida Maya Chichen Itza & Katedral Metropolitan",
          "language": "Bahasa Spanyol",
          "funFact": "Asal mula makanan lezat taco dan tradisi festival ceria Hari Orang Mati (Dia de Muertos).",
          "coords": [
              -99.13,
              19.43
          ]
      },
      {
          "id": "kuba",
          "name": "Kuba",
          "nameEn": "Cuba",
          "capital": "Havana",
          "continent": "Amerika Utara",
          "flag": "🇨🇺",
          "currency": "Peso Kuba (CUP)",
          "landmark": "Kawasan Kota Tua Havana & Mobil Klasik Warna-Warni",
          "language": "Bahasa Spanyol",
          "funFact": "Di jalanan kotanya masih beroperasi ribuan mobil klasik antik era tahun 1950-an!",
          "coords": [
              -82.36,
              23.11
          ]
      },
      {
          "id": "kosta-rika",
          "name": "Kosta Rika",
          "nameEn": "Costa Rica",
          "capital": "San Jose",
          "continent": "Amerika Utara",
          "flag": "🇨🇷",
          "currency": "Colon (CRC)",
          "landmark": "Hutan Hujan Tropis Monteverde & Gunung Api Arenal",
          "language": "Bahasa Spanyol",
          "funFact": "Negara paling ramah lingkungan dengan keanekaragaman burung tukan dan kungkang (sloth).",
          "coords": [
              -84.08,
              9.93
          ]
      },
      {
          "id": "panama",
          "name": "Panama",
          "nameEn": "Panama",
          "capital": "Panama City",
          "continent": "Amerika Utara",
          "flag": "🇵🇦",
          "currency": "Balboa & USD",
          "landmark": "Terusan Kanal Panama",
          "language": "Bahasa Spanyol",
          "funFact": "Terusan Panama adalah kanal buatan manusia yang memotong benua dan menghubungkan dua samudra!",
          "coords": [
              -79.52,
              8.98
          ]
      },
      {
          "id": "brasil",
          "name": "Brasil",
          "nameEn": "Brazil",
          "capital": "Brasilia",
          "continent": "Amerika Selatan",
          "flag": "🇧🇷",
          "currency": "Real Brasil (BRL)",
          "landmark": "Patung Kristus Penebus Rio & Hutan Hujan Amazon",
          "language": "Bahasa Portugis",
          "funFact": "Hutan Amazon menghasilkan banyak oksigen dunia dan sungai Amazon adalah sungai terpanjang.",
          "coords": [
              -47.88,
              -15.79
          ]
      },
      {
          "id": "argentina",
          "name": "Argentina",
          "nameEn": "Argentina",
          "capital": "Buenos Aires",
          "continent": "Amerika Selatan",
          "flag": "🇦🇷",
          "currency": "Peso Argentina (ARS)",
          "landmark": "Air Terjun Raksasa Iguazu & Gletser Perito Moreno",
          "language": "Bahasa Spanyol",
          "funFact": "Negara tari Tango dan juara dunia sepak bola dengan gletser es biru yang spektakuler.",
          "coords": [
              -58.38,
              -34.6
          ]
      },
      {
          "id": "kolombia",
          "name": "Kolombia",
          "nameEn": "Colombia",
          "capital": "Bogota",
          "continent": "Amerika Selatan",
          "flag": "🇨🇴",
          "currency": "Peso Kolombia (COP)",
          "landmark": "Lembah Palem Raksasa Cocora & Kota Bersejarah Cartagena",
          "language": "Bahasa Spanyol",
          "funFact": "Punya pohon palem lilin Quindio yang bisa tumbuh tinggi menjulang hingga 60 meter!",
          "coords": [
              -74.07,
              4.71
          ]
      },
      {
          "id": "chili",
          "name": "Chili",
          "nameEn": "Chile",
          "capital": "Santiago",
          "continent": "Amerika Selatan",
          "flag": "🇨🇱",
          "currency": "Peso Chili (CLP)",
          "landmark": "Gurun Terkering Atacama & Patung Moai Pulau Paskah",
          "language": "Bahasa Spanyol",
          "funFact": "Bentuk negaranya sangat panjang dan ramping seperti cabai, membentang 4.300 km!",
          "coords": [
              -70.67,
              -33.45
          ]
      },
      {
          "id": "peru",
          "name": "Peru",
          "nameEn": "Peru",
          "capital": "Lima",
          "continent": "Amerika Selatan",
          "flag": "🇵🇪",
          "currency": "Sol Peru (PEN)",
          "landmark": "Kota Kuno di Atas Awan Machu Picchu & Gunung Pelangi",
          "language": "Spanyol & Quechua",
          "funFact": "Machu Picchu adalah benteng kota batu bangsa Inca kuno yang tersembunyi di puncak gunung.",
          "coords": [
              -77.04,
              -12.05
          ]
      },
      {
          "id": "uruguay",
          "name": "Uruguay",
          "nameEn": "Uruguay",
          "capital": "Montevideo",
          "continent": "Amerika Selatan",
          "flag": "🇺🇾",
          "currency": "Peso Uruguay (UYU)",
          "landmark": "Monumen Jari Pasir La Mano & Pantai Punta del Este",
          "language": "Bahasa Spanyol",
          "funFact": "Tuan rumah Piala Dunia sepak bola pertama di dunia pada tahun 1930 dan menjadi juara pertama!",
          "coords": [
              -56.16,
              -34.9
          ]
      },
      {
          "id": "venezuela",
          "name": "Venezuela",
          "nameEn": "Venezuela",
          "capital": "Caracas",
          "continent": "Amerika Selatan",
          "flag": "🇻🇪",
          "currency": "Bolivar (VES)",
          "landmark": "Air Terjun Angel Falls (Tertinggi di Dunia)",
          "language": "Bahasa Spanyol",
          "funFact": "Air Terjun Angel Falls menjatuhkan airnya dari tebing gunung setinggi hampir 1 kilometer!",
          "coords": [
              -66.9,
              10.48
          ]
      },
      {
          "id": "ekuador",
          "name": "Ekuador",
          "nameEn": "Ecuador",
          "capital": "Quito",
          "continent": "Amerika Selatan",
          "flag": "🇪🇨",
          "currency": "Dolar AS (USD)",
          "landmark": "Monumen Garis Khatulistiwa (Mitad del Mundo) & Kepulauan Galapagos",
          "language": "Bahasa Spanyol",
          "funFact": "Nama Ekuador diambil dari kata \"Khatulistiwa\", tempat kura-kura raksasa Galapagos hidup.",
          "coords": [
              -78.47,
              -0.18
          ]
      },
      {
          "id": "australia",
          "name": "Australia",
          "nameEn": "Australia",
          "capital": "Canberra",
          "continent": "Oseania",
          "flag": "🇦🇺",
          "currency": "Dolar Australia (AUD)",
          "landmark": "Gedung Opera Sydney & Karang Penghalang Besar (Great Barrier Reef)",
          "language": "Bahasa Inggris",
          "funFact": "Satu-satunya benua yang dihuni hewan berkantung unik seperti kanguru dan koala!",
          "coords": [
              149.13,
              -35.28
          ]
      },
      {
          "id": "selandia-baru",
          "name": "Selandia Baru",
          "nameEn": "New Zealand",
          "capital": "Wellington",
          "continent": "Oseania",
          "flag": "🇳🇿",
          "currency": "Dolar Selandia Baru (NZD)",
          "landmark": "Pedesaan Dongeng Hobbiton & Fjord Milford Sound",
          "language": "Inggris & Maori",
          "funFact": "Rumah bagi burung Kiwi yang tidak bisa terbang dan pemandangan alam magis film Lord of the Rings.",
          "coords": [
              174.78,
              -41.29
          ]
      },
      {
          "id": "fiji",
          "name": "Fiji",
          "nameEn": "Fiji",
          "capital": "Suva",
          "continent": "Oseania",
          "flag": "🇫🇯",
          "currency": "Dolar Fiji (FJD)",
          "landmark": "Kepulauan Terumbu Karang Mamanuca & Sungai Navua",
          "language": "Fiji, Hindi, Inggris",
          "funFact": "Kepulauan tropis yang terkenal dengan sambutan hangat ramah dan terumbu karang warna-warni.",
          "coords": [
              178.44,
              -18.14
          ]
      },
      {
          "id": "papua-nugini",
          "name": "Papua Nugini",
          "nameEn": "Papua New Guinea",
          "capital": "Port Moresby",
          "continent": "Oseania",
          "flag": "🇵🇬",
          "currency": "Kina (PGK)",
          "landmark": "Pegunungan Dataran Tinggi & Habitat Burung Cenderawasih",
          "language": "Tok Pisin, Hiri Motu, Inggris",
          "funFact": "Negara dengan keragaman bahasa terbanyak di dunia, memiliki lebih dari 800 bahasa daerah!",
          "coords": [
              147.18,
              -9.44
          ]
      },
      {
          "id": "samoa",
          "name": "Samoa",
          "nameEn": "Samoa",
          "capital": "Apia",
          "continent": "Oseania",
          "flag": "🇼🇸",
          "currency": "Tala Samoa (WST)",
          "landmark": "Kolam Laut To Sua Ocean Trench & Pantai Lalomanu",
          "language": "Samoa & Inggris",
          "funFact": "Kolam laut To Sua adalah lubang alami raksasa di tengah hutan hijau yang berisi air laut jernih.",
          "coords": [
              -171.76,
              -13.83
          ]
      }
  ],
  
    // 2. Seluruh 38 Provinsi Indonesia + 38 Ibu Kota Lengkap
    provinces: [
      // --- SUMATRA (10) ---
      { id: 'aceh', name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', icon: '🕌', funFact: 'Dikenal sebagai Serambi Mekkah dengan Masjid Raya Baiturrahman yang megah.' },
      { id: 'sumut', name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatra', icon: '🏞️', funFact: 'Punya Danau Toba yang merupakan danau vulkanik terbesar di dunia.' },
      { id: 'sumbar', name: 'Sumatera Barat', capital: 'Padang', island: 'Sumatra', icon: '🏠', funFact: 'Terkenal dengan Rumah Gadang dan masakan rendang yang sedap.' },
      { id: 'riau', name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', icon: '🌴', funFact: 'Kaya akan sungai besar dan kebudayaan Melayu yang kental.' },
      { id: 'kepri', name: 'Kepulauan Riau', capital: 'Tanjungpinang', island: 'Sumatra', icon: '⛵', funFact: 'Terdiri dari ribuan pulau cantik di dekat Selat Malaka.' },
      { id: 'jambi', name: 'Jambi', capital: 'Jambi', island: 'Sumatra', icon: '🏛️', funFact: 'Punya Kompleks Candi Muaro Jambi yang amat luas dan bersejarah.' },
      { id: 'bengkulu', name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', icon: '🌺', funFact: 'Habitat asli bunga raksasa langka di dunia, Rafflesia arnoldii.' },
      { id: 'sumsel', name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatra', icon: '🌉', funFact: 'Ikon Jembatan Ampera yang gagah melintasi Sungai Musi.' },
      { id: 'babel', name: 'Kepulauan Bangka Belitung', capital: 'Pangkalpinang', island: 'Sumatra', icon: '🏖️', funFact: 'Pantai berpasir putih dengan batu-batu granit raksasa yang eksotis.' },
      { id: 'lampung', name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', icon: '🐘', funFact: 'Pintu gerbang pulau Sumatra dan rumah konservasi gajah di Way Kambas.' },
  
      // --- JAWA (6) ---
      { id: 'banten', name: 'Banten', capital: 'Serang', island: 'Jawa', icon: '🦏', funFact: 'Habitat badak bercula satu di Taman Nasional Ujung Kulon.' },
      { id: 'dki', name: 'DKI Jakarta', capital: 'Jakarta', island: 'Jawa', icon: '🏙️', funFact: 'Ibu kota negara dengan monumen Monas berpuncak emas yang berkilau.' },
      { id: 'jabar', name: 'Jawa Barat', capital: 'Bandung', island: 'Jawa', icon: '⛰️', funFact: 'Kota kembang berhawa sejuk, alat musik tradisional angklung dari bambu.' },
      { id: 'jateng', name: 'Jawa Tengah', capital: 'Semarang', island: 'Jawa', icon: '🛕', funFact: 'Memiliki Candi Borobudur yang megah dan pusat batik nusantara.' },
      { id: 'diy', name: 'DI Yogyakarta', capital: 'Yogyakarta', island: 'Jawa', icon: '👑', funFact: 'Kota istimewa budaya dengan Keraton dan Jalan Malioboro yang ramah.' },
      { id: 'jatim', name: 'Jawa Timur', capital: 'Surabaya', island: 'Jawa', icon: '🌋', funFact: 'Kota Pahlawan dan pesona pemandangan Gunung Bromo yang memukau.' },
  
      // --- BALI & NUSA TENGGARA (3) ---
      { id: 'bali', name: 'Bali', capital: 'Denpasar', island: 'Bali & Nusa Tenggara', icon: '🌺', funFact: 'Pulau Dewata yang termasyhur di dunia dengan tari, gamelan, dan pura indah.' },
      { id: 'ntb', name: 'Nusa Tenggara Barat', capital: 'Mataram', island: 'Bali & Nusa Tenggara', icon: '🏔️', funFact: 'Gunung Rinjani yang menjulang tinggi dan keindahan pantai pulau Lombok.' },
      { id: 'ntt', name: 'Nusa Tenggara Timur', capital: 'Kupang', island: 'Bali & Nusa Tenggara', icon: '🦎', funFact: 'Habitat asli hewan purba komodo di Pulau Komodo dan Labuan Bajo.' },
  
      // --- KALIMANTAN (5) ---
      { id: 'kalbar', name: 'Kalimantan Barat', capital: 'Pontianak', island: 'Kalimantan', icon: '🧭', funFact: 'Dilintasi garis khatulistiwa dengan Tugu Khatulistiwa di Pontianak.' },
      { id: 'kalteng', name: 'Kalimantan Tengah', capital: 'Palangka Raya', island: 'Kalimantan', icon: '🦧', funFact: 'Hutan tropis lebat yang menjadi rumah orangutan di Tanjung Puting.' },
      { id: 'kalsel', name: 'Kalimantan Selatan', capital: 'Banjarmasin', island: 'Kalimantan', icon: '🛶', funFact: 'Kota Seribu Sungai dengan pasar terapung Lok Baintan yang unik.' },
      { id: 'kaltim', name: 'Kalimantan Timur', capital: 'Samarinda', island: 'Kalimantan', icon: '🌳', funFact: 'Daerah pesisir dan sungai Mahakam yang luas serta kawasan IKN.' },
      { id: 'kaltara', name: 'Kalimantan Utara', capital: 'Tanjung Selor', island: 'Kalimantan', icon: '🌿', funFact: 'Provinsi termuda di pulau Kalimantan dengan alam yang asri.' },
  
      // --- SULAWESI (6) ---
      { id: 'sulut', name: 'Sulawesi Utara', capital: 'Manado', island: 'Sulawesi', icon: '🤿', funFact: 'Taman Laut Bunaken yang terkenal dengan terumbu karang warna-warni.' },
      { id: 'gorontalo', name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', icon: '🌽', funFact: 'Dikenal sebagai lumbung jagung dan pesona laut Teluk Tomini.' },
      { id: 'sulteng', name: 'Sulawesi Tengah', capital: 'Palu', island: 'Sulawesi', icon: '🐦', funFact: 'Rumah burung langka Maleo dan patung megalitik Lembah Bada.' },
      { id: 'sulbar', name: 'Sulawesi Barat', capital: 'Mamuju', island: 'Sulawesi', icon: '⛵', funFact: 'Pelaut ulung Mandar dengan perahu tradisional Sandeq yang gesit.' },
      { id: 'sulsel', name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', icon: '🏰', funFact: 'Benteng Rotterdam bersejarah, budaya Toraja, dan pantai Losari.' },
      { id: 'sultra', name: 'Sulawesi Tenggara', capital: 'Kendari', island: 'Sulawesi', icon: '🐠', funFact: 'Kepulauan Wakatobi yang merupakan surga penyelam dunia.' },
  
      // --- MALUKU (2) ---
      { id: 'maluku', name: 'Maluku', capital: 'Ambon', island: 'Kepulauan Maluku', icon: '🎶', funFact: 'Ambon Manise yang dijuluki Kota Musik Dunia oleh UNESCO.' },
      { id: 'malut', name: 'Maluku Utara', capital: 'Sofifi', island: 'Kepulauan Maluku', icon: '🌰', funFact: 'Kepulauan rempah cengkih dan pala yang dicari penjelajah dunia tempo dulu.' },
  
      // --- PAPUA (6) ---
      { id: 'papua-barat', name: 'Papua Barat', capital: 'Manokwari', island: 'Papua', icon: '🦜', funFact: 'Kota bersejarah Manokwari dan alam pegunungan Arfak yang menakjubkan.' },
      { id: 'papua-barat-daya', name: 'Papua Barat Daya', capital: 'Sorong', island: 'Papua', icon: '🏝️', funFact: 'Pintu gerbang menuju keajaiban pulau karang Raja Ampat.' },
      { id: 'papua', name: 'Papua', capital: 'Jayapura', island: 'Papua', icon: '🏞️', funFact: 'Danau Sentani yang indah dan burung Cenderawasih yang elok.' },
      { id: 'papua-selatan', name: 'Papua Selatan', capital: 'Merauke', island: 'Papua', icon: '🌅', funFact: 'Ujung paling timur Indonesia tempat matahari terbit lebih awal.' },
      { id: 'papua-tengah', name: 'Papua Tengah', capital: 'Nabire', island: 'Papua', icon: '🦈', funFact: 'Taman Nasional Teluk Cenderawasih dengan hiu paus yang ramah.' },
      { id: 'papua-pegunungan', name: 'Papua Pegunungan', capital: 'Wamena', island: 'Papua', icon: '⛰️', funFact: 'Satu-satunya provinsi tanpa laut di Indonesia, di Lembah Baliem yang sejuk.' }
    ],
  
    // 3. Kota-kota Terkenal di Indonesia yang BUKAN Ibu Kota Provinsi
    // Catatan: Wajib ada Malang -> Jawa Timur, non-eksklusif, dan tidak memuat ibu kota provinsi!
    famousNonCapitalCities: [
      {
        name: 'Malang',
        province: 'Jawa Timur',
        island: 'Jawa',
        icon: '🍎',
        desc: 'Kota sejuk penghasil apel malang yang manis, dekat dengan Gunung Bromo, dan kota pendidikan favorit.',
        isCapital: false
      },
      {
        name: 'Surakarta (Solo)',
        province: 'Jawa Tengah',
        island: 'Jawa',
        icon: '🏛️',
        desc: 'Kota budaya batik halus dengan Keraton Kasunanan dan pasar Klewer yang terkenal.',
        isCapital: false
      },
      {
        name: 'Bukittinggi',
        province: 'Sumatera Barat',
        island: 'Sumatra',
        icon: '🕰️',
        desc: 'Kota berhawa sejuk dengan menara Jam Gadang dan Ngarai Sianok yang memukau.',
        isCapital: false
      },
      {
        name: 'Cirebon',
        province: 'Jawa Barat',
        island: 'Jawa',
        icon: '🦐',
        desc: 'Kota Udang di pesisir utara Jawa Barat dengan batik mega mendung khas keraton.',
        isCapital: false
      },
      {
        name: 'Bogor',
        province: 'Jawa Barat',
        island: 'Jawa',
        icon: '🌧️',
        desc: 'Dikenal sebagai Kota Hujan dengan Kebun Raya Bogor tertua di Asia Tenggara.',
        isCapital: false
      },
      {
        name: 'Banyuwangi',
        province: 'Jawa Timur',
        island: 'Jawa',
        icon: '🔥',
        desc: 'The Sunrise of Java di ujung timur pulau Jawa, terkenal dengan Kawah Ijen api biru.',
        isCapital: false
      },
      {
        name: 'Singaraja',
        province: 'Bali',
        island: 'Bali & Nusa Tenggara',
        icon: '🐬',
        desc: 'Kota pendidikan di pesisir utara Bali (Buleleng), dekat dengan pantai Lovina lumba-lumba.',
        isCapital: false
      },
      {
        name: 'Labuan Bajo',
        province: 'Nusa Tenggara Timur',
        island: 'Bali & Nusa Tenggara',
        icon: '⛵',
        desc: 'Kota pelabuhan eksotis pintu masuk menuju habitat hewan langka Komodo.',
        isCapital: false
      },
      {
        name: 'Balikpapan',
        province: 'Kalimantan Timur',
        island: 'Kalimantan',
        icon: '⛽',
        desc: 'Kota Minyak yang bersih, modern, dan tertata rapi di pesisir Selat Makassar.',
        isCapital: false
      },
      {
        name: 'Magelang',
        province: 'Jawa Tengah',
        island: 'Jawa',
        icon: '🛕',
        desc: 'Kota lembah di antara pegunungan, tempat berdirinya Candi Borobudur nan agung.',
        isCapital: false
      }
    ],
  
    // 4. Modul Khusus: Jelajah Provinsi Bali (8 Kabupaten + 1 Kota)
    // Wajib mencakup seluruh nama kabupaten/kota dan ibu kota / pusat pemerintahan masing-masing!
    baliModule: {
      title: 'Jelajah Pulau Dewata: 8 Kabupaten & 1 Kota',
      titleEn: 'Discover the Island of Gods: 8 Regencies & 1 City',
      description: 'Provinsi Bali memiliki 8 Kabupaten dan 1 Kota. Masing-masing memiliki pusat pemerintahan dan pesona kebudayaan tersendiri.',
      descriptionEn: 'Bali Province comprises 8 Regencies and 1 City, each with its own administrative center and rich cultural charm.',
      regions: [
        {
          name: 'Kabupaten Jembrana',
          capital: 'Negara',
          type: 'Kabupaten',
          icon: '🐃',
          highlight: 'Tradisi balapan kerbau Makepung dan pelabuhan Gilimanuk pintu barat Bali.'
        },
        {
          name: 'Kabupaten Tabanan',
          capital: 'Tabanan',
          type: 'Kabupaten',
          icon: '🌾',
          highlight: 'Lumbung beras Bali dengan sawah bertingkat Jatiluwih dan Pura Tanah Lot.'
        },
        {
          name: 'Kabupaten Badung',
          capital: 'Mangupura',
          type: 'Kabupaten',
          icon: '🏄',
          highlight: 'Pusat pariwisata internasional dengan pantai Kuta, Seminyak, dan Pura Uluwatu.'
        },
        {
          name: 'Kabupaten Gianyar',
          capital: 'Gianyar',
          type: 'Kabupaten',
          icon: '🎨',
          highlight: 'Pusat seni, patung, dan tari di Ubud, serta kebun binatang ramah anak.'
        },
        {
          name: 'Kabupaten Klungkung',
          capital: 'Semarapura',
          type: 'Kabupaten',
          icon: '🏛️',
          highlight: 'Kerthi Gosa lukisan wayang Kamasan dan gugusan pulau Nusa Penida.'
        },
        {
          name: 'Kabupaten Bangli',
          capital: 'Bangli',
          type: 'Kabupaten',
          icon: '🌋',
          highlight: 'Satu-satunya kabupaten tanpa pantai di Bali, punya Danau Batur dan desa terbersih Penglipuran.'
        },
        {
          name: 'Kabupaten Karangasem',
          capital: 'Amlapura',
          type: 'Kabupaten',
          icon: '⛰️',
          highlight: 'Gunung Agung yang sakral, Istana Air Tirta Gangga, dan Pura Besakih.'
        },
        {
          name: 'Kabupaten Buleleng',
          capital: 'Singaraja',
          type: 'Kabupaten',
          icon: '🐬',
          highlight: 'Wilayah Bali Utara yang luas, pantai Lovina tempat bermain lumba-lumba, dan air terjun Gitgit.'
        },
        {
          name: 'Kota Denpasar',
          capital: 'Denpasar',
          type: 'Kota',
          icon: '🏙️',
          highlight: 'Pusat pemerintahan dan ekonomi provinsi Bali dengan Lapangan Renon dan Pasar Badung.'
        }
      ]
    },
  
    // 5. Kuis Geografi Interaktif
    quizzes: [
      {
          "id": "quiz-world-capitals",
          "title": "Kuis 4: Tebak Ibu Kota Negara di Dunia",
          "desc": "Jelajahi dunia! Seberapa hebat kamu mengingat ibu kota negara-negara sahabat?",
          "questions": [
              {
                  "q": "Apa ibu kota negara Jepang?",
                  "options": [
                      "Tokyo",
                      "Kyoto",
                      "Osaka",
                      "Sapporo"
                  ],
                  "answer": "Tokyo",
                  "hint": "Kota metropolitan terbesar dengan Menara Tokyo yang terkenal."
              },
              {
                  "q": "Apa ibu kota negara Arab Saudi?",
                  "options": [
                      "Riyadh",
                      "Jeddah",
                      "Makkah",
                      "Madinah"
                  ],
                  "answer": "Riyadh",
                  "hint": "Pusat pemerintahan dan ekonomi kerajaan di tengah gurun Nejd."
              },
              {
                  "q": "Apa ibu kota negara Inggris (Britania Raya)?",
                  "options": [
                      "London",
                      "Manchester",
                      "Liverpool",
                      "Edinburgh"
                  ],
                  "answer": "London",
                  "hint": "Kota bersejarah tempat Menara Big Ben dan jam raksasanya berdentang."
              },
              {
                  "q": "Apa ibu kota negara Mesir di Afrika?",
                  "options": [
                      "Kairo",
                      "Iskandariyah",
                      "Giza",
                      "Luxor"
                  ],
                  "answer": "Kairo",
                  "hint": "Kota di tepi Sungai Nil dekat dengan piramida megah."
              },
              {
                  "q": "Apa ibu kota negara Australia?",
                  "options": [
                      "Canberra",
                      "Sydney",
                      "Melbourne",
                      "Brisbane"
                  ],
                  "answer": "Canberra",
                  "hint": "Bukan Sydney atau Melbourne, melainkan kota terencana yang indah di pedalaman!"
              }
          ]
      },
      {
        id: 'quiz-prov-capital',
        title: 'Kuis 1: Tebak Ibu Kota Provinsi',
        desc: 'Uji hafalanmu tentang ibu kota dari 38 provinsi di Indonesia!',
        questions: [
          { q: 'Apa ibu kota Provinsi Jawa Timur?', options: ['Surabaya', 'Malang', 'Bandung', 'Semarang'], answer: 'Surabaya', hint: 'Kota Pahlawan yang terkenal dengan Tugu Pahlawan!' },
          { q: 'Apa ibu kota Provinsi Bali?', options: ['Singaraja', 'Denpasar', 'Gianyar', 'Mangupura'], answer: 'Denpasar', hint: 'Kota di tengah Bali yang memiliki Monumen Bajra Sandhi.' },
          { q: 'Apa ibu kota Provinsi Sumatera Barat?', options: ['Bukittinggi', 'Padang', 'Medan', 'Pekanbaru'], answer: 'Padang', hint: 'Kota asal kuliner rendang yang mendunia!' },
          { q: 'Apa ibu kota Provinsi Papua Pegunungan?', options: ['Jayapura', 'Wamena', 'Merauke', 'Nabire'], answer: 'Wamena', hint: 'Kota sejuk di Lembah Baliem.' },
          { q: 'Apa ibu kota Provinsi Kalimantan Timur?', options: ['Balikpapan', 'Samarinda', 'Pontianak', 'Banjarmasin'], answer: 'Samarinda', hint: 'Kota di tepi Sungai Mahakam.' }
        ]
      },
      {
        id: 'quiz-city-province',
        title: 'Kuis 2: Tebak Asal Provinsi Kota Terkenal',
        desc: 'Kota-kota ini sangat terkenal, tapi bukan ibu kota provinsi! Di mana ya lokasinya?',
        questions: [
          { q: 'Kota Malang yang sejuk dan terkenal dengan buah apel berada di provinsi mana?', options: ['Jawa Timur', 'Jawa Barat', 'Jawa Tengah', 'DI Yogyakarta'], answer: 'Jawa Timur', hint: 'Kota ini dekat dengan Gunung Bromo dan berhawa sejuk.' },
          { q: 'Kota Surakarta (Solo) yang terkenal dengan keraton dan batiknya berada di provinsi mana?', options: ['Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'Banten'], answer: 'Jawa Tengah', hint: 'Berada di dekat Yogyakarta, terkenal dengan lagu Bengawan Solo.' },
          { q: 'Kota Bukittinggi dengan ikon Jam Gadang berada di provinsi mana?', options: ['Sumatera Barat', 'Riau', 'Sumatera Utara', 'Jambi'], answer: 'Sumatera Barat', hint: 'Kawasan Minangkabau berhawa sejuk di pegunungan Bukit Barisan.' },
          { q: 'Kota Singaraja yang terkenal di Bali Utara berada di kabupaten apa?', options: ['Buleleng', 'Badung', 'Tabanan', 'Jembrana'], answer: 'Buleleng', hint: 'Daerah pesisir utara tempat pantai Lovina lumba-lumba berada.' },
          { q: 'Kota Labuan Bajo gerbang menuju pulau Komodo berada di provinsi mana?', options: ['Nusa Tenggara Timur', 'Nusa Tenggara Barat', 'Bali', 'Maluku'], answer: 'Nusa Tenggara Timur', hint: 'Singkatannya NTT, terkenal dengan tenun ikatnya.' }
        ]
      },
      {
        id: 'quiz-bali-regions',
        title: 'Kuis 3: Jelajah Bali 8 Kabupaten & 1 Kota',
        desc: 'Cocokkan nama kabupaten di Bali dengan pusat pemerintahannya!',
        questions: [
          { q: 'Ibu kota / pusat pemerintahan Kabupaten Badung adalah...', options: ['Mangupura', 'Kuta', 'Denpasar', 'Gianyar'], answer: 'Mangupura', hint: 'Pusat pemerintahannya bernama Mangupura di Sempidi.' },
          { q: 'Ibu kota / pusat pemerintahan Kabupaten Buleleng adalah...', options: ['Singaraja', 'Lovina', 'Seririt', 'Tabanan'], answer: 'Singaraja', hint: 'Pernah menjadi ibu kota Sunda Kecil pada masa lampau.' },
          { q: 'Ibu kota / pusat pemerintahan Kabupaten Jembrana adalah...', options: ['Negara', 'Gilimanuk', 'Tabanan', 'Amlapura'], answer: 'Negara', hint: 'Kota Negara yang terkenal dengan tradisi Makepung.' },
          { q: 'Ibu kota / pusat pemerintahan Kabupaten Karangasem adalah...', options: ['Amlapura', 'Candidasa', 'Klungkung', 'Bangli'], answer: 'Amlapura', hint: 'Pusat pemerintahan di timur Bali di bawah kaki Gunung Agung.' },
          { q: 'Satu-satunya kabupaten di Bali yang TIDAK memiliki wilayah pantai adalah...', options: ['Bangli', 'Gianyar', 'Tabanan', 'Klungkung'], answer: 'Bangli', hint: 'Kabupaten di dataran tinggi yang memiliki Danau Batur.' }
        ]
      }
    ]
  };
  
  

  // --- Source: js/data/bahasa-indonesia.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Bahasa Indonesia Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Kurikulum Merdeka Fase A/B)
  // ================================================================
  
  const BAHASA_INDONESIA_DATA = {
    id: 'bahasa-indonesia',
    title: 'Bahasa Indonesia — Membaca, Menulis, & Merangkai Kata',
    titleEn: 'Indonesian Language — Reading, Writing, & Word Crafting',
    subtitle: 'Mari bermain fonik vokal konsonan, mengeja suku kata, menyusun kalimat S-P-O, dan membaca dongeng fabel! 📖',
    subtitleEn: 'Explore phonics, rhythmic syllables, proper sentence structures, and magical Indonesian folklore! 📖',
    topics: [
      {
        id: 'bi-vokal-konsonan',
        title: 'Mengenal Huruf Vokal & Konsonan',
        titleEn: 'Introduction to Vowels & Consonants',
        desc: 'Ada 5 huruf vokal bernyanyi nyaring: A, I, U, E, O. Huruf vokal membuat suara kata menjadi terbuka dan jelas terdengar. Sahabatnya adalah 21 huruf konsonan (B, C, D, F, G, H, J, K, L, M, N, P, Q, R, S, T, V, W, X, Y, Z) yang membentuk ragam bunyi ketika dipadukan!',
        descEn: 'There are 5 singing vowels: A, I, U, E, O which produce open and vibrant sounds. They partner with 21 consonant letters to form meaningful words and melodious sentences!',
        checklist: [
          'Misi 1: Ucapkan 5 huruf vokal (A - I - U - E - O) dengan suara lantang dan artikulasi bibir yang tepat.',
          'Misi 2: Temukan 3 benda di dalam rumahmu yang diawali huruf vokal (misal: apel, ember, obat).',
          'Misi 3: Tuliskan huruf vokal dengan pensil warna merah dan huruf konsonan dengan pensil warna biru.'
        ],
        checklistEn: [
          'Mission 1: Pronounce the 5 vowels (A - I - U - E - O) clearly aloud with proper lip shapes.',
          'Mission 2: Identify 3 household objects starting with a vowel letter (e.g. apple, eraser, umbrella).',
          'Mission 3: Write vowels with a red colored pencil and consonants with a blue colored pencil.'
        ],
        activities: [
          { q: 'Manakah kelompok huruf vokal yang benar?', options: ['A, I, U, E, O', 'B, C, D, F, G', 'A, B, C, D, E', 'K, L, M, N, O'], answer: 'A, I, U, E, O', hint: 'Huruf vokal adalah huruf hidup yang bersuara nyaring!' },
          { q: 'Huruf pertama pada kata "ELANG" dan "EMBER" adalah huruf vokal...', options: ['E', 'A', 'I', 'O'], answer: 'E', hint: 'E-L-A-N-G bersuara /e/ atau /é/.' },
          { q: 'Ada berapa huruf vokal pada kata "INDONESIA"?', options: ['5 vokal (I, O, E, I, A)', '3 vokal', '2 vokal', '7 vokal'], answer: '5 vokal (I, O, E, I, A)', hint: 'Hitung huruf I, O, E, I, dan A yang ada di kata Indonesia.' }
        ],
        activitiesEn: [
          { q: 'Which of the following is the correct vowel group?', options: ['A, I, U, E, O', 'B, C, D, F, G', 'A, B, C, D, E', 'K, L, M, N, O'], answer: 'A, I, U, E, O', hint: 'Vowels are open vocal sounds with clear voices!' },
          { q: 'The initial letter in "ELANG" and "EMBER" is the vowel...', options: ['E', 'A', 'I', 'O'], answer: 'E', hint: 'Both words begin with the letter E.' }
        ]
      },
      {
        id: 'bi-suku-kata',
        title: 'Mengeja Suku Kata Pola KV & KVK',
        titleEn: 'Spelling Syllables (CV & CVC Patterns)',
        desc: 'Suku kata adalah ketukan bunyi saat kita mengucapkan sebuah kata. Pola KV (Konsonan-Vokal) seperti BA-JU, KU-DA, RO-TI. Pola KVK (Konsonan-Vokal-Konsonan) seperti PEN-SIL, RUM-PUT, RUM-AH. Mengeja suku kata membuat kita membaca lebih lancar dan percaya diri!',
        descEn: 'A syllable is a single beat of speech sound. Combining Consonant-Vowel (CV like ba-ju) and Consonant-Vowel-Consonant (CVC like pen-sil) helps build reading fluency rapidly!',
        checklist: [
          'Misi 1: Tepuk tangan sesuai jumlah suku kata saat mengucapkan namamu sendiri (contoh: Bi-ma = 2 tepukan).',
          'Misi 2: Eja dan tuliskan 4 kata berpola KV-KV (misal: sa-pi, ma-ta, bo-la, bu-ku) di buku latihan.',
          'Misi 3: Sambungkan dua suku kata acak menjadi satu kata baru yang memiliki arti jelas.'
        ],
        checklistEn: [
          'Mission 1: Clap hands matching syllable counts while saying your full name.',
          'Mission 2: Spell and write down 4 CV-CV words (e.g. sa-pi, ma-ta, bo-la, bu-ku) in your notebook.',
          'Mission 3: Connect two random syllables together to form a meaningful everyday word.'
        ],
        activities: [
          { q: 'BO + LA bila digabungkan dibaca...', options: ['BOLA', 'BALO', 'LOBI', 'BOLA-BOLA'], answer: 'BOLA', hint: 'Benda bulat yang sering ditendang saat main sepak bola ⚽' },
          { q: 'Kata "PELANGI" terdiri dari berapa suku kata?', options: ['3 suku kata (pe - la - ngi)', '2 suku kata', '4 suku kata', '1 suku kata'], answer: '3 suku kata (pe - la - ngi)', hint: 'Hitung ketukan saat kamu mengucapkan: pe... la... ngi!' },
          { q: 'Suku kata yang tepat untuk melengkapi kata "SE-PA-..." adalah...', options: ['TU (menjadi SEPATU)', 'KO', 'RI', 'NA'], answer: 'TU (menjadi SEPATU)', hint: 'Alas kaki yang kita pakai saat berangkat ke sekolah 👟' }
        ],
        activitiesEn: [
          { q: 'BO + LA combined is read as...', options: ['BOLA', 'BALO', 'LOBI', 'BOLA-BOLA'], answer: 'BOLA', hint: 'A round ball used in soccer ⚽' },
          { q: 'How many syllables does the word "PELANGI" have?', options: ['3 syllables (pe - la - ngi)', '2 syllables', '4 syllables', '1 syllable'], answer: '3 syllables (pe - la - ngi)', hint: 'Count each verbal beat: pe - la - ngi!' }
        ]
      },
      {
        id: 'bi-susun-kalimat',
        title: 'Menyusun Kalimat Ceria Berpola S-P-O',
        titleEn: 'Structuring Sentences (Subject - Predicate - Object)',
        desc: 'Kalimat lengkap yang runtut terdiri dari: Subjek (siapa pelakunya), Predikat (apa kegiatannya / kata kerja), dan Objek (benda yang dikenai kegiatan). Contoh: "Rani (S) menyiram (P) bunga (O)". Kalimat yang baik diawali huruf kapital dan diakhiri tanda titik!',
        descEn: 'A clear complete sentence consists of Subject (who), Predicate (action verb), and Object (the recipient of action). Example: "Rani waters flowers". It starts with a capital letter and finishes with a period!',
        checklist: [
          'Misi 1: Buat 1 kalimat tentang kegiatan pagimu menggunakan pola Subjek + Predikat + Objek.',
          'Misi 2: Garis bawahi mana kata kerjanya (Predikat) pada kalimat yang kamu buat.',
          'Misi 3: Bacakan kalimatmu dengan intonasi yang tegas dan ceria kepada ayah atau ibu.'
        ],
        checklistEn: [
          'Mission 1: Write 1 complete sentence about your morning routine using S-P-O format.',
          'Mission 2: Underline the action verb (Predicate) in your written sentence.',
          'Mission 3: Read your sentence aloud proudly to your parents or guardian.'
        ],
        activities: [
          { q: 'Susun kata acak berikut: [membaca] - [buku] - [Budi]', options: ['Budi membaca buku', 'Buku Budi membaca', 'Membaca Budi buku', 'Budi buku membaca'], answer: 'Budi membaca buku', hint: 'Letakkan orang yang melakukan kegiatan (Subjek) di depan.' },
          { q: 'Pada kalimat "Ibu memasak nasi", kata "memasak" bertindak sebagai...', options: ['Predikat (kata kerja)', 'Subjek', 'Objek', 'Tanda baca'], answer: 'Predikat (kata kerja)', hint: 'Memasak adalah tindakan atau kegiatan yang dilakukan Ibu.' },
          { q: 'Manakah kalimat berikut yang paling lengkap dan benar?', options: ['Siti menyapu halaman.', 'Menyapu halaman Siti.', 'Halaman menyapu Siti.', 'Siti halaman.'], answer: 'Siti menyapu halaman.', hint: 'Urutan: Subjek (Siti) + Predikat (menyapu) + Objek (halaman).' }
        ],
        activitiesEn: [
          { q: 'Arrange the scrambled words: [membaca] - [buku] - [Budi]', options: ['Budi membaca buku', 'Buku Budi membaca', 'Membaca Budi buku', 'Budi buku membaca'], answer: 'Budi membaca buku', hint: 'Subject comes first: who is doing the reading action?' }
        ]
      },
      {
        id: 'bi-tanda-baca',
        title: 'Tanda Baca & Huruf Kapital',
        titleEn: 'Punctuation Marks & Capital Letters',
        desc: 'Huruf kapital dipakai di awal kalimat, nama orang (Dayu, Edo), hari (Senin, Selasa), dan nama tempat (Jakarta, Bali). Tanda titik (.) digunakan untuk mengakhiri kalimat berita. Tanda tanya (?) untuk bertanya. Tanda seru (!) untuk perintah atau ungkapan penuh semangat!',
        descEn: 'Capital letters are used at sentence beginnings, names of people, days, and places. Use a period (.) for statements, a question mark (?) for inquiries, and an exclamation mark (!) for commands and enthusiasm!',
        checklist: [
          'Misi 1: Tulis namamu dan nama kota tempat tinggalmu dengan huruf kapital di awal kata.',
          'Misi 2: Tulis satu kalimat tanya menggunakan kata tanya "Di mana" atau "Kapan" diakhiri tanda tanya (?).',
          'Misi 3: Temukan 3 tanda titik pada buku cerita favoritmu hari ini.'
        ],
        checklistEn: [
          'Mission 1: Write your full name and hometown name with proper capitalized initials.',
          'Mission 2: Formulate an inquisitive question starting with "Where" or "When" ending with (?).',
          'Mission 3: Hunt and point out 3 period punctuation marks in your bedtime storybook.'
        ],
        activities: [
          { q: 'Tanda baca yang tepat untuk kalimat: "Siapa nama sahabat barumu..." adalah...', options: ['Tanda tanya (?)', 'Tanda titik (.)', 'Tanda seru (!)', 'Tanda koma (,)'], answer: 'Tanda tanya (?)', hint: 'Kata "Siapa" menunjukkan kalimat pertanyaan.' },
          { q: 'Penulisan huruf kapital yang benar pada nama orang dan tempat adalah...', options: ['Made berlibur ke Denpasar.', 'made berlibur ke denpasar.', 'Made berlibur Ke denpasar.', 'made Berlibur ke Denpasar.'], answer: 'Made berlibur ke Denpasar.', hint: 'Nama orang (Made) dan nama kota (Denpasar) diawali huruf kapital.' },
          { q: 'Tanda seru (!) biasanya dipakai untuk kalimat...', options: ['Perintah atau ajakan penuh semangat', 'Pertanyaan ingin tahu', 'Kalimat berita santai', 'Kalimat berhitung'], answer: 'Perintah atau ajakan penuh semangat', hint: 'Contoh: "Jagalah kebersihan kelas kita!"' }
        ],
        activitiesEn: [
          { q: 'Which punctuation mark fits best: "Where is my pencil..."?', options: ['Question mark (?)', 'Period (.)', 'Exclamation mark (!)', 'Comma (,)'], answer: 'Question mark (?)', hint: 'It asks an inquiry question.' }
        ]
      },
      {
        id: 'bi-pantun-puisi',
        title: 'Puisi Ceria & Pantun Anak Nusantara',
        titleEn: 'Children Poetry & Indonesian Pantun',
        desc: 'Puisi dan pantun adalah karya sastra indah penuh irama. Pantun anak jenaka biasanya bersajak a-b-a-b, terdiri dari 4 baris: baris 1-2 adalah sampiran yang memikat, dan baris 3-4 adalah isi yang menyampaikan nasehat kebaikan atau canda riang!',
        descEn: 'Poetry and pantun celebrate the rhythm of language. Indonesian pantun typically follows an a-b-a-b rhyme scheme across 4 lines: 2 introductory lines and 2 advice or joyful concluding lines!',
        checklist: [
          'Misi 1: Baca pantun anak di bawah dengan intonasi ceria di hadapan anggota keluargamu.',
          'Misi 2: Temukan kata yang bersajak sama (rima akhir) pada baris pertama dan ketiga.',
          'Misi 3: Coba buat 2 baris puisi sederhana tentang bunga mawar atau kucing kesayangan.'
        ],
        checklistEn: [
          'Mission 1: Recite a 4-line children pantun poem out loud with joyful facial expressions.',
          'Mission 2: Find rhyming words matching between the first and third lines.',
          'Mission 3: Draft a 2-line mini poem praising a colorful flower or a beloved pet kitten.'
        ],
        activities: [
          { q: 'Perhatikan pantun ini: "Pohon beringin daunnya lebat / Tempat berteduh di waktu siang / Ayo kawan belajar giat / Agar masa depan gilang-gemilang". Baris yang merupakan ISI nasehat adalah...', options: ['Baris ke-3 dan ke-4', 'Baris ke-1 dan ke-2', 'Hanya baris ke-1', 'Hanya baris ke-2'], answer: 'Baris ke-3 dan ke-4', hint: 'Nasehat pantun selalu berada di dua baris terakhir (baris 3 dan 4).' },
          { q: 'Rima bunyi akhir pada bait pantun tradisional umumnya berpola...', options: ['a - b - a - b', 'a - a - a - b', 'b - b - b - a', 'bebas tanpa rima'], answer: 'a - b - a - b', hint: 'Bunyi baris 1 seirama baris 3, bunyi baris 2 seirama baris 4.' }
        ],
        activitiesEn: [
          { q: 'In traditional Indonesian Pantun, which lines contain the core advice / message?', options: ['Lines 3 and 4', 'Lines 1 and 2', 'Line 1 only', 'Line 2 only'], answer: 'Lines 3 and 4', hint: 'The moral message is always found in the concluding couplet (lines 3 & 4).' }
        ]
      },
      {
        id: 'bi-dongeng-fabel',
        title: 'Membaca Pemahaman & Fabel Nusantara',
        titleEn: 'Reading Comprehension & Animal Fables',
        desc: 'Fabel adalah cerita dongeng di mana hewan-hewan dapat berbicara dan bertingkah seperti manusia. Membaca fabel membantu kita memahami karakter tokoh, alur awal-tengah-akhir, dan memetik pesan budi pekerti yang luhur!',
        descEn: 'Fables are charming stories where animals talk and act like humans. Reading fables sharpens comprehension, teaches narrative sequencing, and imparts memorable moral virtues!',
        checklist: [
          'Misi 1: Baca dongeng fabel "Kancil dan Buaya" atau fabel pilihanmu bersama orang tua.',
          'Misi 2: Tuliskan siapa nama tokoh yang cerdik atau baik hati dalam cerita tersebut.',
          'Misi 3: Ceritakan kembali dengan kata-katamu sendiri apa pesan moral dari dongeng itu.'
        ],
        checklistEn: [
          'Mission 1: Read a short fable story such as "The Clever Mouse Deer & The Crocodiles".',
          'Mission 2: Write down the name of the kindhearted protagonist character.',
          'Mission 3: Retell in your own words what moral lesson was taught by the ending.'
        ],
        activities: [
          { q: 'Cerita dongeng dengan tokoh hewan yang bertingkah laku seperti manusia disebut...', options: ['Fabel', 'Legenda', 'Mite', 'Biografi'], answer: 'Fabel', hint: 'Fabel adalah kisah hewan jenaka penuh pesan moral.' },
          { q: 'Dalam fabel "Semut dan Belalang", Semut rajin mengumpulkan makanan saat musim kemarau, sedangkan Belalang malas dan hanya bernyanyi. Sikap Semut mengajarkan kita untuk...', options: ['Rajin bekerja dan mempersiapkan masa depan', 'Malas-malasan setiap hari', 'Menghabiskan makanan sekaligus', 'Mengejek teman lain'], answer: 'Rajin bekerja dan mempersiapkan masa depan', hint: 'Semut yang rajin tidak akan kelaparan saat musim dingin tiba 🐜' }
        ],
        activitiesEn: [
          { q: 'What do we call fictional stories where animal characters speak and behave like people?', options: ['Fable', 'Biography', 'Encyclopedia', 'Atlas'], answer: 'Fable', hint: 'Aesop and folklore animal tales are known as fables.' }
        ]
      }
  ,
      {
        id: 'bi-kata-ajaib',
        title: '4 Kata Ajaib: Tolong, Maaf, Terima Kasih, & Permisi',
        titleEn: '4 Magic Words: Please, Sorry, Thank You, & Excuse Me',
        desc: 'Ada 4 kata ajaib yang membuat semua orang tersenyum dan senang: "Tolong" saat butuh bantuan, "Maaf" saat berbuat salah atau tidak sengaja, "Terima Kasih" saat menerima kebaikan, dan "Permisi" saat lewat di depan orang lain. Membiasakan kata ajaib sejak Kelas 1 SD menjadikan kita anak berbudi pekerti luhur!',
        descEn: 'There are 4 magical words that bring smiles and warmth everywhere: "Please" when asking for help, "Sorry" when making an accidental mistake, "Thank you" when receiving kindness, and "Excuse me" when passing by others. Practicing these words makes us wonderful polite learners!',
        checklist: [
          "Misi 1: Ucapkan \"Terima kasih\" kepada Ibu atau Ayah saat disiapkan sarapan pagi yang lezat.",
          "Misi 2: Praktikkan kata \"Tolong\" dengan suara santun saat meminta bantuan mengambilkan buku.",
          "Misi 3: Buat kartu gambar bertuliskan \"4 KATA AJAIB\" dan tempelkan di dekat meja belajarmu."
  ],
        checklistEn: [
          "Mission 1: Say \"Thank you\" warmly to your parents when they prepare your meal.",
          "Mission 2: Practice saying \"Please\" politely when requesting assistance.",
          "Mission 3: Create a cheerful drawing card showing the \"4 Magic Words\" near your desk."
  ],
        activities: [
          {
                  "q": "Saat Budi tidak sengaja menjatuhkan pensil milik Siti, kata ajaib yang harus diucapkan Budi adalah...",
                  "options": [
                          "Maaf",
                          "Terima kasih",
                          "Tolong",
                          "Biarin saja"
                  ],
                  "answer": "Maaf",
                  "hint": "Gunakan kata ini ketika kita berbuat salah atau ada ketidaksengajaan."
          },
          {
                  "q": "Ketika Kadek diberi kue bolu lezat oleh nenek, Kadek mengucapkan...",
                  "options": [
                          "Terima kasih, Nenek!",
                          "Tolong!",
                          "Permisi!",
                          "Maaf!"
                  ],
                  "answer": "Terima kasih, Nenek!",
                  "hint": "Ungkapan rasa syukur atas kebaikan orang lain."
          },
          {
                  "q": "Saat kita hendak berjalan lewat di depan guru yang sedang berbincang, kita bersikap membungkuk dan berkata...",
                  "options": [
                          "Permisi, Pak Guru",
                          "Awas minggir",
                          "Tolong",
                          "Diam"
                  ],
                  "answer": "Permisi, Pak Guru",
                  "hint": "Kata santun untuk meminta izin lewat."
          }
  ],
        activitiesEn: [
          {
                  "q": "When you accidentally bump into a friend, you should say...",
                  "options": [
                          "Sorry",
                          "Thank you",
                          "Please",
                          "Go away"
                  ],
                  "answer": "Sorry",
                  "hint": "Say this to express regret when an accident occurs."
          },
          {
                  "q": "When grandmother gives you a delicious treat, you say...",
                  "options": [
                          "Thank you, Grandma!",
                          "Please!",
                          "Excuse me!",
                          "Sorry!"
                  ],
                  "answer": "Thank you, Grandma!",
                  "hint": "Show gratitude for kindness received."
          }
  ]
      },
      {
        id: 'bi-cerita-bergambar',
        title: 'Membaca Cerita Bergambar & Menemukan Pesan Moral',
        titleEn: 'Reading Picture Books & Discovering Moral Lessons',
        desc: 'Cerita bergambar membantu imajinasi kita terbang tinggi! Gambar menunjukkan suasana tempat dan ekspresi wajah tokoh, sedangkan tulisan menceritakan alur kisahnya. Dari setiap cerita, kita bisa belajar mana perbuatan baik yang patut ditiru dan mana perbuatan buruk yang harus dihindari.',
        descEn: 'Picture books ignite our imagination! Vibrant illustrations show character emotions and magical settings, while words guide the story plot. Through every tale, we discover valuable moral wisdom to live by every day.',
        checklist: [
          "Misi 1: Ambil buku cerita bergambar favoritmu dan bacalah satu halaman dengan suara lantang dan intonasi tepat.",
          "Misi 2: Ceritakan kembali kepada Ayah/Ibu siapa tokoh utama cerita tersebut dan apa sifat baiknya.",
          "Misi 3: Gambarkan adegan paling seru dari cerita tersebut di buku gambarmu."
  ],
        checklistEn: [
          "Mission 1: Pick your favorite picture book and read one page aloud with cheerful expressions.",
          "Mission 2: Retell the main character and their good habits to your parents.",
          "Mission 3: Draw your favorite scene from the story in your drawing book."
  ],
        activities: [
          {
                  "q": "Dalam cerita \"Semut dan Belalang\", Semut rajin mengumpulkan makanan sedangkan Belalang hanya bermain. Pesan baiknya adalah...",
                  "options": [
                          "Rajin bekerja dan mempersiapkan masa depan",
                          "Bermain terus sepanjang hari",
                          "Tidak mau berbagi makanan",
                          "Tidur seharian di pohon"
                  ],
                  "answer": "Rajin bekerja dan mempersiapkan masa depan",
                  "hint": "Semut tidak kelaparan saat musim hujan karena rajin bekerja."
          },
          {
                  "q": "Tokoh yang memiliki sifat baik dan suka menolong dalam cerita disebut tokoh...",
                  "options": [
                          "Protagonis (tokoh baik)",
                          "Antagonis (tokoh jahat)",
                          "Penonton",
                          "Penulis"
                  ],
                  "answer": "Protagonis (tokoh baik)",
                  "hint": "Tokoh teladan yang dicintai pembaca."
          },
          {
                  "q": "Unsur cerita yang menceritakan kapan dan di mana peristiwa terjadi dinamakan...",
                  "options": [
                          "Latar (tempat & waktu)",
                          "Judul",
                          "Penerbit",
                          "Halaman"
                  ],
                  "answer": "Latar (tempat & waktu)",
                  "hint": "Contoh: di hutan lebat pada pagi hari yang cerah."
          }
  ],
        activitiesEn: [
          {
                  "q": "In the fable of the Ant and the Grasshopper, the hardworking Ant teaches us to...",
                  "options": [
                          "Work hard and prepare for tomorrow",
                          "Play all day and sleep",
                          "Never share anything",
                          "Ignore our goals"
                  ],
                  "answer": "Work hard and prepare for tomorrow",
                  "hint": "Diligent preparation brings safety and happiness."
          }
  ]
      },
      {
        "id": "bi-kalimat-tanya",
      "title": "Kalimat Tanya & 6 Kata Ajaib Tanya (5W1H)",
      "titleEn": "Question Sentences & Question Words",
      "desc": "Kalimat tanya digunakan untuk mencari tahu hal yang belum kita ketahui. Selalu diakhiri dengan tanda tanya (?). Ada 6 kata tanya sakti: APA (benda/kejadian), SIAPA (orang), DI MANA (tempat), KAPAN (waktu), MENGAPA (alasan), dan BAGAIMANA (cara/keadaan)!",
      "descEn": "Question sentences help us discover new knowledge and are always sealed with a question mark (?). We use: WHAT (objects/events), WHO (people), WHERE (places), WHEN (time), WHY (reasons), and HOW (manners/states)!",
      "checklist": [
        "Misi 1: Gunakan kata \"Siapa\" untuk menanyakan nama lengkap teman barumu di kelas.",
        "Misi 2: Cari dan lingkari tanda tanya (?) pada buku cerita kesukaanmu.",
        "Misi 3: Susunlah 3 kalimat tanya sopan yang ditujukan kepada Ayah, Ibu, atau Bapak/Ibu Guru."
      ],
      "checklistEn": [
        "Mission 1: Use the word \"Who\" to politely ask a new classmate their name.",
        "Mission 2: Find and circle question marks (?) in your favorite storybook.",
        "Mission 3: Formulate 3 respectful questions addressed to your parents or teacher."
      ],
      "activities": [
        {
          "q": "Kata tanya yang tepat untuk menanyakan nama seseorang adalah...",
          "options": [
            "Siapa",
            "Kapan",
            "Berapa",
            "Di mana"
          ],
          "answer": "Siapa",
          "hint": "\"... namamu?\" -> Siapa namamu?"
        },
        {
          "q": "Tanda baca yang wajib ditaruh di akhir kalimat tanya adalah...",
          "options": [
            "Tanda tanya (?)",
            "Tanda titik (.)",
            "Tanda seru (!)",
            "Tanda koma (,)"
          ],
          "answer": "Tanda tanya (?)",
          "hint": "Bentuknya seperti kait payung dengan titik di bawahnya ❓"
        },
        {
          "q": "\"... kamu tinggal?\" Kata tanya yang tepat untuk menanyakan tempat tinggal adalah...",
          "options": [
            "Di mana",
            "Siapa",
            "Mengapa",
            "Kapan"
          ],
          "answer": "Di mana",
          "hint": "Menanyakan lokasi atau tempat keberadaan rumah 🏡"
        }
      ],
      "activitiesEn": [
        {
          "q": "Which word asks for a person's name?",
          "options": [
            "Who",
            "When",
            "How much",
            "Where"
          ],
          "answer": "Who",
          "hint": "\"Who are you?\" asks about a person."
        },
        {
          "q": "What punctuation ends every question?",
          "options": [
            "Question mark (?)",
            "Period (.)",
            "Exclamation mark (!)",
            "Comma (,)"
          ],
          "answer": "Question mark (?)",
          "hint": "It curves like an umbrella handle ❓"
        }
      ]
    },
    {
      "id": "bi-cerita-pengalaman",
      "title": "Bercerita Pengalaman Diri & Membuat Kartu Ceria",
      "titleEn": "Sharing Personal Experiences & Crafting Cheerful Cards",
      "desc": "Setiap anak memiliki pengalaman seru yang berharga, seperti membantu ibu memasak, bermain bola bersama teman, atau memelihara kucing. Menceritakan pengalaman melatih keberanian berbicara di depan kelas dan menumbuhkan rasa percaya diri!",
      "descEn": "Every child holds delightful personal stories, like cooking with mom, playing soccer with pals, or caring for pets. Sharing real experiences cultivates classroom confidence and expressive storytelling!",
      "checklist": [
        "Misi 1: Ceritakan kegiatan pagimu hari ini dalam 3 kalimat berurutan (bangun tidur - mandi - sarapan).",
        "Misi 2: Buatlah kartu ucapan terima kasih berhias bunga untuk Ibu atau Ayah tercinta.",
        "Misi 3: Tuliskan cita-cita impianmu dengan huruf tegak yang rapi di buku catatan."
      ],
      "checklistEn": [
        "Mission 1: Describe your morning routine today in 3 sequential sentences.",
        "Mission 2: Craft a colorful thank-you card with flowers for your beloved parents.",
        "Mission 3: Write down your dream future profession neatly in your notebook."
      ],
      "activities": [
        {
          "q": "Saat menceritakan pengalaman di depan kelas, sikap tubuh kita sebaiknya...",
          "options": [
            "Berdiri tegak, tersenyum, dan suara jelas terdengar",
            "Menunduk dan berbisik malu",
            "Membelakangi teman-teman",
            "Tertawa berlebihan tanpa bicara"
          ],
          "answer": "Berdiri tegak, tersenyum, dan suara jelas terdengar",
          "hint": "Percaya diri dan ramah membuat pendengar senang mendengarkan ceritamu!"
        },
        {
          "q": "Tulisan \"Terima kasih Ayah dan Ibu atas kasih sayangnya\" cocok ditulis di dalam...",
          "options": [
            "Kartu ucapan kasih sayang",
            "Buku nota belanjaan",
            "Kamus bahasa",
            "Tiket karcis"
          ],
          "answer": "Kartu ucapan kasih sayang",
          "hint": "Ungkapan tulus untuk orang tua yang merawat kita ❤️"
        },
        {
          "q": "Urutan bercerita yang runtut dimulai dari...",
          "options": [
            "Awal kejadian, jalannya peristiwa, lalu akhir cerita",
            "Akhir cerita dulu baru awal",
            "Acak sesuka hati",
            "Hanya bagian lucunya saja"
          ],
          "answer": "Awal kejadian, jalannya peristiwa, lalu akhir cerita",
          "hint": "Kronologis: ada permulaan, isi kegiatan, dan kesan penutup."
        }
      ],
      "activitiesEn": [
        {
          "q": "When sharing a story in front of class, we should...",
          "options": [
            "Stand straight, smile, and speak clearly",
            "Hide our face and whisper",
            "Turn our back to friends",
            "Run out of class"
          ],
          "answer": "Stand straight, smile, and speak clearly",
          "hint": "Confidence and warmth captivate your audience!"
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/bahasa-inggris.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · English Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Global Vocabulary)
  // ================================================================
  
  const ENGLISH_DATA = {
    id: 'bahasa-inggris',
    title: 'English — Fun & Easy Global Vocabulary',
    titleEn: 'English — Fun & Easy Global Vocabulary',
    subtitle: 'Easy peasy! Learn friendly greetings, colorful shapes, school supplies, and daily action verbs! 🇬🇧',
    subtitleEn: 'Easy peasy! Learn friendly greetings, colorful shapes, school supplies, and daily action verbs! 🇬🇧',
    topics: [
      {
        id: 'eng-greetings',
        title: 'Warm Greetings & Everyday Politeness',
        titleEn: 'Warm Greetings & Everyday Politeness',
        desc: 'Polite greetings make everyone smile! Use "Good morning" at sunrise, "Good afternoon" after noon, and "Good night" before sleeping. Always remember magic words: "Please", "Thank you", and "Excuse me"!',
        descEn: 'Polite greetings make everyone smile! Use "Good morning" at sunrise, "Good afternoon" after noon, and "Good night" before sleeping. Always remember magic words: "Please", "Thank you", and "Excuse me"!',
        checklist: [
          'Mission 1: Greet three friends or family members with "Good morning" with a warm smile.',
          'Mission 2: Say "Thank you very much!" whenever someone hands you food or helps you.',
          'Mission 3: Practice saying "Excuse me, may I pass?" politely in front of a mirror.'
        ],
        checklistEn: [
          'Mission 1: Greet three friends or family members with "Good morning" with a warm smile.',
          'Mission 2: Say "Thank you very much!" whenever someone hands you food or helps you.',
          'Mission 3: Practice saying "Excuse me, may I pass?" politely in front of a mirror.'
        ],
        activities: [
          { q: 'How do you greet your teacher at 7:30 in the morning?', options: ['Good morning', 'Good night', 'Good evening', 'Goodbye'], answer: 'Good morning', hint: 'Morning is when the sun begins to rise ☀️' },
          { q: 'What is the magic word when you receive a nice gift?', options: ['Thank you', 'Please', 'Sorry', 'Excuse me'], answer: 'Thank you', hint: 'Express your gratitude with "Thank you"!' },
          { q: 'What do you say when you accidentally bump into someone?', options: ['I am sorry / Excuse me', 'Good morning', 'You are welcome', 'Goodbye'], answer: 'I am sorry / Excuse me', hint: 'Say sorry politely when making a mistake.' }
        ],
        activitiesEn: [
          { q: 'How do you greet your teacher at 7:30 in the morning?', options: ['Good morning', 'Good night', 'Good evening', 'Goodbye'], answer: 'Good morning', hint: 'Morning is when the sun begins to rise ☀️' },
          { q: 'What is the magic word when you receive a nice gift?', options: ['Thank you', 'Please', 'Sorry', 'Excuse me'], answer: 'Thank you', hint: 'Express your gratitude with "Thank you"!' }
        ]
      },
      {
        id: 'eng-colors-shapes',
        title: 'Rainbow Colors & Geometric Shapes',
        titleEn: 'Rainbow Colors & Geometric Shapes',
        desc: 'Our world is filled with vibrant colors: Red, Blue, Yellow, Green, Purple, and Orange! Match them with shapes like Circle (round like a coin), Square (four equal sides), Triangle (three sharp corners), and Star (sparkling in the sky)!',
        descEn: 'Our world is filled with vibrant colors: Red, Blue, Yellow, Green, Purple, and Orange! Match them with shapes like Circle (round like a coin), Square (four equal sides), Triangle (three sharp corners), and Star (sparkling in the sky)!',
        checklist: [
          'Mission 1: Find 1 red item, 1 blue item, and 1 yellow item in your study room.',
          'Mission 2: Draw a yellow star ⭐ and a green triangle 🔺 on your sketchpad.',
          'Mission 3: Name the color of the clear daytime sky in English (Blue).'
        ],
        checklistEn: [
          'Mission 1: Find 1 red item, 1 blue item, and 1 yellow item in your study room.',
          'Mission 2: Draw a yellow star ⭐ and a green triangle 🔺 on your sketchpad.',
          'Mission 3: Name the color of the clear daytime sky in English (Blue).'
        ],
        activities: [
          { q: 'What color is the fresh summer grass?', options: ['Green', 'Red', 'Blue', 'Black'], answer: 'Green', hint: 'Leaves and grass are vivid green 🌿' },
          { q: 'Which shape is round like a full moon or a clock?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], answer: 'Circle', hint: 'A circle has no straight edges or corners ⭕' },
          { q: 'A ripe red apple is described as...', options: ['A red apple', 'A blue apple', 'A green circle', 'A yellow banana'], answer: 'A red apple', hint: 'Red is the color of ripe strawberries and apples 🍎' }
        ],
        activitiesEn: [
          { q: 'What color is the fresh summer grass?', options: ['Green', 'Red', 'Blue', 'Black'], answer: 'Green', hint: 'Leaves and grass are vivid green 🌿' },
          { q: 'Which shape is round like a full moon or a clock?', options: ['Circle', 'Square', 'Triangle', 'Rectangle'], answer: 'Circle', hint: 'A circle has no straight edges or corners ⭕' }
        ]
      },
      {
        id: 'eng-family-pets',
        title: 'My Loving Family & Cute Pets',
        titleEn: 'My Loving Family & Cute Pets',
        desc: 'Meet our dearest family members: Father, Mother, Brother, Sister, Grandfather, and Grandmother. And meet lovely pets: Cat (purring kitten), Dog (faithful puppy), Rabbit (long-eared bunny), and Fish (swimming in water)!',
        descEn: 'Meet our dearest family members: Father, Mother, Brother, Sister, Grandfather, and Grandmother. And meet lovely pets: Cat (purring kitten), Dog (faithful puppy), Rabbit (long-eared bunny), and Fish (swimming in water)!',
        checklist: [
          'Mission 1: Draw your happy family portrait and write "Father", "Mother", and "Me" below.',
          'Mission 2: Imitate the sound of a pet Cat ("Meow") and a pet Dog ("Woof woof").',
          'Mission 3: Say "I love my family" aloud to your parents.'
        ],
        checklistEn: [
          'Mission 1: Draw your happy family portrait and write "Father", "Mother", and "Me" below.',
          'Mission 2: Imitate the sound of a pet Cat ("Meow") and a pet Dog ("Woof woof").',
          'Mission 3: Say "I love my family" aloud to your parents.'
        ],
        activities: [
          { q: 'Who is your mother\'s mother?', options: ['Grandmother', 'Sister', 'Aunt', 'Brother'], answer: 'Grandmother', hint: 'The warm grandmother who tells wonderful stories 👵' },
          { q: 'Which animal says "Woof! Woof!" and wags its tail?', options: ['Dog', 'Cat', 'Bird', 'Fish'], answer: 'Dog', hint: 'Man\'s best four-legged friend 🐕' },
          { q: '"My younger sister" means...', options: ['Adik perempuanku', 'Kakak laki-lakiku', 'Ayahku', 'Ibuku'], answer: 'Adik perempuanku', hint: 'Sister means saudara perempuan.' }
        ],
        activitiesEn: [
          { q: 'Who is your mother\'s mother?', options: ['Grandmother', 'Sister', 'Aunt', 'Brother'], answer: 'Grandmother', hint: 'The warm grandmother who tells wonderful stories 👵' },
          { q: 'Which animal says "Woof! Woof!" and wags its tail?', options: ['Dog', 'Cat', 'Bird', 'Fish'], answer: 'Dog', hint: 'Man\'s best four-legged friend 🐕' }
        ]
      },
      {
        id: 'eng-classroom',
        title: 'Classroom Objects & School Bag',
        titleEn: 'Classroom Objects & School Bag',
        desc: 'Let\'s unpack our school backpack: Pencil (to write), Eraser / Rubber (to wipe errors), Ruler (to draw straight lines), Book (to read), Notebook (to write notes), and Scissors (for craft paper)!',
        descEn: 'Let\'s unpack our school backpack: Pencil (to write), Eraser / Rubber (to wipe errors), Ruler (to draw straight lines), Book (to read), Notebook (to write notes), and Scissors (for craft paper)!',
        checklist: [
          'Mission 1: Check your pencil case and count your pencils in English (1, 2, 3...).',
          'Mission 2: Point to your eraser and say: "This is my eraser."',
          'Mission 3: Keep your study desk neat and tidy before starting your homework.'
        ],
        checklistEn: [
          'Mission 1: Check your pencil case and count your pencils in English (1, 2, 3...).',
          'Mission 2: Point to your eraser and say: "This is my eraser."',
          'Mission 3: Keep your study desk neat and tidy before starting your homework.'
        ],
        activities: [
          { q: 'What object do you use to erase pencil marks on paper?', options: ['Eraser', 'Ruler', 'Sharpener', 'Scissors'], answer: 'Eraser', hint: 'It rubs away pencil mistakes cleanly ✏️' },
          { q: 'Where do you pack your textbooks, pencil case, and bottle?', options: ['School bag / Backpack', 'Plate', 'Shoe', 'Pillow'], answer: 'School bag / Backpack', hint: 'You carry it on your shoulders to school 🎒' }
        ],
        activitiesEn: [
          { q: 'What object do you use to erase pencil marks on paper?', options: ['Eraser', 'Ruler', 'Sharpener', 'Scissors'], answer: 'Eraser', hint: 'It rubs away pencil mistakes cleanly ✏️' }
        ]
      },
      {
        id: 'eng-numbers-actions',
        title: 'Numbers 1 to 20 & Action Verbs',
        titleEn: 'Numbers 1 to 20 & Action Verbs',
        desc: 'Counting is energetic and exciting: One, Two, Three, Four, Five... up to Twenty! Combine numbers with joyful actions: Walk, Run, Jump, Dance, Sing, Read, Write, and Sleep!',
        descEn: 'Counting is energetic and exciting: One, Two, Three, Four, Five... up to Twenty! Combine numbers with joyful actions: Walk, Run, Jump, Dance, Sing, Read, Write, and Sleep!',
        checklist: [
          'Mission 1: Count your 10 fingers aloud in English: One to Ten.',
          'Mission 2: Jump three times while shouting: "One! Two! Three! Jump!"',
          'Mission 3: Sing the English alphabet or number rhyme with clapping rhythm.'
        ],
        checklistEn: [
          'Mission 1: Count your 10 fingers aloud in English: One to Ten.',
          'Mission 2: Jump three times while shouting: "One! Two! Three! Jump!"',
          'Mission 3: Sing the English alphabet or number rhyme with clapping rhythm.'
        ],
        activities: [
          { q: 'What number comes directly after "NINE"?', options: ['TEN (10)', 'EIGHT (8)', 'SEVEN (7)', 'ELEVEN (11)'], answer: 'TEN (10)', hint: '8, 9, ... what comes next?' },
          { q: 'Which action verb means moving fast on your feet?', options: ['Run', 'Sleep', 'Sit', 'Eat'], answer: 'Run', hint: 'Athletes run swiftly in track races 🏃' }
        ],
        activitiesEn: [
          { q: 'What number comes directly after "NINE"?', options: ['TEN (10)', 'EIGHT (8)', 'SEVEN (7)', 'ELEVEN (11)'], answer: 'TEN (10)', hint: '8, 9, ... what comes next?' }
        ]
      },
      {
        id: 'eng-food-routine',
        title: 'Healthy Food & Daily Routine',
        titleEn: 'Healthy Food & Daily Routine',
        desc: 'Fuel your day with nutritious food: Bread, Milk, Egg, Rice, Vegetables, and Fruits! Follow a sparkling daily routine: Wake up, Brush teeth, Wash face, Eat breakfast, and Study hard!',
        descEn: 'Fuel your day with nutritious food: Bread, Milk, Egg, Rice, Vegetables, and Fruits! Follow a sparkling daily routine: Wake up, Brush teeth, Wash face, Eat breakfast, and Study hard!',
        checklist: [
          'Mission 1: Name 2 fruits you enjoy eating in English (e.g. Apple, Banana, Orange).',
          'Mission 2: Say: "I brush my teeth twice a day" before going to bed.',
          'Mission 3: Drink a fresh glass of water or milk to stay hydrated.'
        ],
        checklistEn: [
          'Mission 1: Name 2 fruits you enjoy eating in English (e.g. Apple, Banana, Orange).',
          'Mission 2: Say: "I brush my teeth twice a day" before going to bed.',
          'Mission 3: Drink a fresh glass of water or milk to stay hydrated.'
        ],
        activities: [
          { q: 'What healthy white drink comes from dairy cows?', options: ['Milk', 'Soda', 'Coffee', 'Tea'], answer: 'Milk', hint: 'Rich in calcium for strong bones and teeth 🥛' },
          { q: 'What do you do right after waking up in the morning?', options: ['Brush teeth and wash face', 'Go to sleep', 'Play video games', 'Watch TV until noon'], answer: 'Brush teeth and wash face', hint: 'Keep fresh hygiene at dawn 🪥' }
        ],
        activitiesEn: [
          { q: 'What healthy white drink comes from dairy cows?', options: ['Milk', 'Soda', 'Coffee', 'Tea'], answer: 'Milk', hint: 'Rich in calcium for strong bones and teeth 🥛' }
        ]
      }
  ,
      {
        id: 'en-fruits-food',
        title: 'Delicious Fruits & Healthy Food',
        titleEn: 'Delicious Fruits & Healthy Food',
        desc: 'Eating colorful fruits keeps our body energetic and strong! Let us learn their English names: Red Apple 🍎, Yellow Banana 🍌, Juicy Orange 🍊, Sweet Mango 🥭, and Crispy Watermelon 🍉. For healthy meals: White Rice 🍚, Fresh Milk 🥛, and Warm Bread 🍞!',
        descEn: 'Eating colorful fruits keeps our body energetic and strong! Let us learn their English names: Red Apple 🍎, Yellow Banana 🍌, Juicy Orange 🍊, Sweet Mango 🥭, and Crispy Watermelon 🍉. For healthy meals: White Rice 🍚, Fresh Milk 🥛, and Warm Bread 🍞!',
        checklist: [
          "Mission 1: Point to 3 fruits at home and say their English names aloud.",
          "Mission 2: Practice saying the sentence: \"I like to eat sweet apples and fresh bananas!\"",
          "Mission 3: Spell out the words: A-P-P-L-E and M-I-L-K."
  ],
        checklistEn: [
          "Mission 1: Point to 3 fruits at home and say their English names aloud.",
          "Mission 2: Practice saying the sentence: \"I like to eat sweet apples and fresh bananas!\"",
          "Mission 3: Spell out the words: A-P-P-L-E and M-I-L-K."
  ],
        activities: [
          {
                  "q": "What is the English name for \"Apel Merah\"?",
                  "options": [
                          "Red Apple",
                          "Yellow Banana",
                          "Green Grapes",
                          "Orange Juice"
                  ],
                  "answer": "Red Apple",
                  "hint": "The fruit is crunchy, sweet, and red 🍎"
          },
          {
                  "q": "Monkeys love to eat this yellow fruit. It is called a...",
                  "options": [
                          "Banana",
                          "Watermelon",
                          "Strawberry",
                          "Pineapple"
                  ],
                  "answer": "Banana",
                  "hint": "Yellow curved fruit that tastes sweet 🍌"
          },
          {
                  "q": "\"I drink fresh ... every morning.\" The correct word is...",
                  "options": [
                          "milk",
                          "pencil",
                          "chair",
                          "book"
                  ],
                  "answer": "milk",
                  "hint": "A white nutritious drink that strengthens bones 🥛"
          }
  ],
        activitiesEn: [
          {
                  "q": "What is the English name for \"Apel Merah\"?",
                  "options": [
                          "Red Apple",
                          "Yellow Banana",
                          "Green Grapes",
                          "Orange Juice"
                  ],
                  "answer": "Red Apple",
                  "hint": "The fruit is crunchy, sweet, and red 🍎"
          },
          {
                  "q": "Monkeys love to eat this yellow fruit. It is called a...",
                  "options": [
                          "Banana",
                          "Watermelon",
                          "Strawberry",
                          "Pineapple"
                  ],
                  "answer": "Banana",
                  "hint": "Yellow curved fruit that tastes sweet 🍌"
          }
  ]
      },
      {
        id: 'en-body-parts',
        title: 'My Body Parts & 5 Senses',
        titleEn: 'My Body Parts & 5 Senses',
        desc: 'Our body is a miraculous gift! We have two Eyes 👀 to see rainbow colors, two Ears 👂 to hear bird songs, one Nose 👃 to smell fresh flowers, one Mouth 👄 to speak polite words, and two Hands ✋ to help our friends!',
        descEn: 'Our body is a miraculous gift! We have two Eyes 👀 to see rainbow colors, two Ears 👂 to hear bird songs, one Nose 👃 to smell fresh flowers, one Mouth 👄 to speak polite words, and two Hands ✋ to help our friends!',
        checklist: [
          "Mission 1: Touch your head, shoulders, knees, and toes while singing the classic rhyme.",
          "Mission 2: Count your fingers in English from 1 to 10 proudly.",
          "Mission 3: Say aloud: \"I see with my eyes, I hear with my ears, I smile with my mouth!\""
  ],
        checklistEn: [
          "Mission 1: Touch your head, shoulders, knees, and toes while singing the classic rhyme.",
          "Mission 2: Count your fingers in English from 1 to 10 proudly.",
          "Mission 3: Say aloud: \"I see with my eyes, I hear with my ears, I smile with my mouth!\""
  ],
        activities: [
          {
                  "q": "We use our ... to see colorful stars in the sky.",
                  "options": [
                          "eyes",
                          "ears",
                          "feet",
                          "elbows"
                  ],
                  "answer": "eyes",
                  "hint": "Two organs on our face that can open and close 👀"
          },
          {
                  "q": "We use our ... to listen to good stories and music.",
                  "options": [
                          "ears",
                          "nose",
                          "knees",
                          "hands"
                  ],
                  "answer": "ears",
                  "hint": "Located on the left and right sides of our head 👂"
          },
          {
                  "q": "How many fingers do you have on both hands?",
                  "options": [
                          "10 fingers",
                          "5 fingers",
                          "20 fingers",
                          "8 fingers"
                  ],
                  "answer": "10 fingers",
                  "hint": "Count: 1, 2, 3, 4, 5 on one hand, and 5 on the other hand!"
          }
  ],
        activitiesEn: [
          {
                  "q": "We use our ... to see colorful stars in the sky.",
                  "options": [
                          "eyes",
                          "ears",
                          "feet",
                          "elbows"
                  ],
                  "answer": "eyes",
                  "hint": "Two organs on our face that can open and close 👀"
          },
          {
                  "q": "How many fingers do you have on both hands?",
                  "options": [
                          "10 fingers",
                          "5 fingers",
                          "20 fingers",
                          "8 fingers"
                  ],
                  "answer": "10 fingers",
                  "hint": "Count: 1 to 10 on both hands!"
          }
  ]
      },
      {
        "id": "en-animals-zoo",
      "title": "Wild Animals & Farm Friends",
      "titleEn": "Wild Animals & Farm Friends",
      "desc": "Animals live in nature, on peaceful farms, and in zoos! Farm animals like cows (moo!), ducks (quack!), and sheep (baa!) help us. Wild animals like roaring lions, tall giraffes, and mighty elephants roam majestic grasslands!",
      "descEn": "Animals thrive on peaceful farms and in the wild! Learn names and sounds: cows moo, ducks quack, sheep baa, while lions roar and elephants trumpet in safari lands!",
      "checklist": [
        "Mission 1: Imitate the sounds of 4 animals (cow, cat, duck, lion) with your friends.",
        "Mission 2: Spell and write 5 animal words (cat, dog, cow, lion, duck) in your notebook.",
        "Mission 3: Draw a safari animal and write: \"This is a [lion/elephant]!\""
      ],
      "checklistEn": [
        "Mission 1: Imitate the sounds of 4 animals (cow, cat, duck, lion) with your friends.",
        "Mission 2: Spell and write 5 animal words (cat, dog, cow, lion, duck) in your notebook.",
        "Mission 3: Draw a safari animal and write: \"This is a [lion/elephant]!\""
      ],
      "activities": [
        {
          "q": "What sound does a duck make in English?",
          "options": [
            "Quack! Quack!",
            "Moo! Moo!",
            "Meow! Meow!",
            "Roar! Roar!"
          ],
          "answer": "Quack! Quack!",
          "hint": "Ducks swim in ponds and quack merrily 🦆"
        },
        {
          "q": "Which animal has a very long neck to reach tall tree leaves?",
          "options": [
            "Giraffe",
            "Elephant",
            "Rabbit",
            "Monkey"
          ],
          "answer": "Giraffe",
          "hint": "The tallest yellow spotted mammal in the savanna 🦒"
        },
        {
          "q": "\"An ELEPHANT is very...\"",
          "options": [
            "Big and strong",
            "Tiny and small",
            "Flying in the sky",
            "Swimming like a fish"
          ],
          "answer": "Big and strong",
          "hint": "Elephants have long trunks and huge ears 🐘"
        }
      ],
      "activitiesEn": [
        {
          "q": "What sound does a duck make?",
          "options": [
            "Quack! Quack!",
            "Moo! Moo!",
            "Meow! Meow!",
            "Roar! Roar!"
          ],
          "answer": "Quack! Quack!",
          "hint": "Ducks say quack 🦆"
        },
        {
          "q": "Which animal has a long neck?",
          "options": [
            "Giraffe",
            "Elephant",
            "Rabbit",
            "Turtle"
          ],
          "answer": "Giraffe",
          "hint": "The tall yellow mammal 🦒"
        }
      ]
    },
    {
      "id": "en-weather-seasons",
      "title": "Weather, Seasons & Clothes to Wear",
      "titleEn": "Weather, Seasons & Clothes to Wear",
      "desc": "The sky changes every day! It can be sunny (warm sunshine), rainy (bring an umbrella!), cloudy (clouds cover the sun), or windy (leaves fly around!). We wear warm jackets when it is cold and t-shirts when it is hot!",
      "descEn": "Observe the sky outside! Learn weather words: sunny, rainy, cloudy, windy, and match with proper attire like raincoats, hats, t-shirts, and shoes!",
      "checklist": [
        "Mission 1: Look out the window and describe today's weather: \"Today is sunny/rainy!\"",
        "Mission 2: Identify 3 clothes you wear to school (shirt, skirt/shorts, shoes).",
        "Mission 3: Sing the English song: \"Rain, rain, go away, come again another day!\""
      ],
      "checklistEn": [
        "Mission 1: Look out the window and describe today's weather: \"Today is sunny/rainy!\"",
        "Mission 2: Identify 3 clothes you wear to school (shirt, skirt/shorts, shoes).",
        "Mission 3: Sing the English song: \"Rain, rain, go away, come again another day!\""
      ],
      "activities": [
        {
          "q": "When it is RAINING heavily, we should bring an...",
          "options": [
            "Umbrella ☂️",
            "Ice cream 🍦",
            "Sunglasses 🕶️",
            "Fan"
          ],
          "answer": "Umbrella ☂️",
          "hint": "An umbrella shields us from raindrops!"
        },
        {
          "q": "On a bright SUNNY day, the sky is bright and we see the...",
          "options": [
            "Sun ☀️",
            "Snow ❄️",
            "Stars at noon",
            "Thunder"
          ],
          "answer": "Sun ☀️",
          "hint": "The golden sun shines brightly in the blue sky."
        },
        {
          "q": "\"Put on your ... to protect your feet when walking outside.\"",
          "options": [
            "Shoes 👟",
            "Hat 🧢",
            "Gloves",
            "Scarf"
          ],
          "answer": "Shoes 👟",
          "hint": "We wear comfortable shoes on our feet."
        }
      ],
      "activitiesEn": [
        {
          "q": "When it rains, carry an...",
          "options": [
            "Umbrella ☂️",
            "Ice cream",
            "Sunglasses",
            "Pillow"
          ],
          "answer": "Umbrella ☂️",
          "hint": "Shields from rain!"
        },
        {
          "q": "Sunny day features the bright...",
          "options": [
            "Sun ☀️",
            "Snow",
            "Raincoat",
            "Flashlight"
          ],
          "answer": "Sun ☀️",
          "hint": "Golden ball in the sky!"
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/pancasila.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Pendidikan Pancasila Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Karakter Pelajar Pancasila)
  // ================================================================
  
  const PANCASILA_DATA = {
    id: 'pancasila',
    title: 'Pendidikan Pancasila — Anak Hebat Berkarakter Luhur',
    titleEn: 'Pancasila Education — Noble Character & Citizenship',
    subtitle: 'Mengenal 5 simbol Garuda Pancasila, hak & kewajiban, budaya tertib antre, dan indahnya gotong royong! 🇮🇩',
    subtitleEn: 'Discover the 5 Garuda symbols, civic rights & duties, orderly queuing, and mutual cooperation spirit! 🇮🇩',
    topics: [
      {
        id: 'pan-simbol',
        title: 'Mengenal 5 Simbol Sila Garuda Pancasila',
        titleEn: 'The 5 Pancasila Shield Symbols & Meaning',
        desc: 'Burung Garuda adalah lambang negara kita yang perkasa. Di dadanya terdapat perisai dengan 5 simbol mulia: Sila 1 Bintang Emas (Ketuhanan), Sila 2 Rantai Emas (Kemanusiaan), Sila 3 Pohon Beringin (Persatuan), Sila 4 Kepala Banteng (Musyawarah), dan Sila 5 Padi & Kapas (Keadilan Sosial)!',
        descEn: 'Garuda Pancasila is our proud national emblem. On its chest is a shield bearing 5 sacred symbols: Golden Star (Faith), Gold Chain (Humanity), Banyan Tree (Unity), Bull Head (Deliberation), and Rice & Cotton (Social Justice)!',
        checklist: [
          'Misi 1: Hafalkan bunyi 5 sila Pancasila dengan intonasi lantang dan sikap berdiri tegap.',
          'Misi 2: Gambar perisai Pancasila dan warnai simbol Bintang Emas di buku gambarmu.',
          'Misi 3: Sebutkan simbol sila ke-3 (Pohon Beringin) dan jelaskan artinya tempat berteduh semua rakyat.'
        ],
        checklistEn: [
          'Mission 1: Recite the 5 Pancasila principles aloud standing tall with dignity.',
          'Mission 2: Draw the Pancasila shield and color the golden star symbol in your sketchbook.',
          'Mission 3: Name the 3rd principle symbol (Banyan Tree) and explain its meaning of unity and shelter.'
        ],
        activities: [
          { q: 'Simbol sila pertama "Ketuhanan Yang Maha Esa" adalah...', options: ['Bintang Emas', 'Rantai Emas', 'Pohon Beringin', 'Kepala Banteng'], answer: 'Bintang Emas', hint: 'Bintang emas bersudut lima di perisai tengah burung Garuda ⭐' },
          { q: 'Padi dan Kapas melambangkan sila ke...', options: ['Kelima (5)', 'Pertama (1)', 'Kedua (2)', 'Ketiga (3)'], answer: 'Kelima (5)', hint: 'Keadilan sosial bagi seluruh rakyat Indonesia.' },
          { q: 'Semboyan yang dicengkeram oleh kaki burung Garuda adalah...', options: ['Bhinneka Tunggal Ika', 'Tut Wuri Handayani', 'Bersatu Kita Teguh', 'Garuda Jaya'], answer: 'Bhinneka Tunggal Ika', hint: 'Artinya: Berbeda-beda tetapi tetap satu jua 🇮🇩' }
        ],
        activitiesEn: [
          { q: 'What is the symbol of the 1st principle "Belief in the One and Only God"?', options: ['Golden Star', 'Gold Chain', 'Banyan Tree', 'Bull Head'], answer: 'Golden Star', hint: 'A golden five-pointed star in the center of the shield ⭐' }
        ]
      },
      {
        id: 'pan-penerapan',
        title: 'Penerapan Nilai Pancasila Sehari-hari',
        titleEn: 'Applying Pancasila Values in Daily Life',
        desc: 'Pancasila bukan hanya dihafal, tapi diamalkan! Berdoa sebelum makan dan belajar adalah contoh Sila 1. Menghibur teman yang bersedih adalah Sila 2. Rukun bermain tanpa bertengkar adalah Sila 3. Memilih ketua kelas dengan musyawarah adalah Sila 4. Berbagi bekal makanan secara adil adalah Sila 5!',
        descEn: 'Pancasila comes alive through our daily actions: Praying before meals (Principle 1), Comforting friends (Principle 2), Playing harmoniously (Principle 3), Voting for class leader (Principle 4), and Sharing fairly (Principle 5)!',
        checklist: [
          'Misi 1: Berdoa dengan khusyuk sebelum mulai belajar dan sebelum tidur malam.',
          'Misi 2: Bantu saudaramu atau teman yang sedang kesulitan merapikan peralatan bermain.',
          'Misi 3: Tuliskan satu kebaikan yang kamu lakukan hari ini di buku jurnal harian.'
        ],
        checklistEn: [
          'Mission 1: Say your prayers mindfully before morning study and evening bedtime.',
          'Mission 2: Help your sibling or classmate tidy up learning supplies.',
          'Mission 3: Record one kind deed you accomplished today in your reflective journal.'
        ],
        activities: [
          { q: 'Berdoa dengan tertib sebelum memulai pelajaran di kelas merupakan contoh pengamalan sila ke...', options: ['Pertama (1)', 'Kedua (2)', 'Ketiga (3)', 'Keempat (4)'], answer: 'Pertama (1)', hint: 'Sila pertama berkaitan dengan ibadah dan rasa syukur kepada Tuhan.' },
          { q: 'Ketika ada teman yang terjatuh saat lari di halaman sekolah, sikapmu adalah...', options: ['Menolongnya berdiri dan membawanya ke UKS', 'Menertawakannya', 'Pura-pura tidak melihat', 'Menyalahkannya'], answer: 'Menolongnya berdiri dan membawanya ke UKS', hint: 'Sikap kemanusiaan yang adil dan beradab (Sila ke-2).' }
        ],
        activitiesEn: [
          { q: 'Praying respectfully before studying at school exemplifies which principle?', options: ['First (1st)', 'Second (2nd)', 'Third (3rd)', 'Fourth (4th)'], answer: 'First (1st)', hint: 'The first principle relates to reverence for God.' }
        ]
      },
      {
        id: 'pan-hak-kewajiban',
        title: 'Hak & Kewajiban Anak di Rumah & Sekolah',
        titleEn: 'Children\'s Rights & Responsibilities',
        desc: 'Hak adalah sesuatu yang berhak kita terima dengan layak (seperti hak mendapat kasih sayang, makan sehat, dan belajar). Kewajiban adalah tugas yang harus kita laksanakan dengan penuh tanggung jawab (seperti menghormati orang tua, belajar tekun, dan menjaga kebersihan kamar)!',
        descEn: 'Rights are what every child deserves to receive (love, nutritious food, safe education). Responsibilities are duties we must honor (respecting elders, studying diligently, keeping our space clean)!',
        checklist: [
          'Misi 1: Rapikan tempat tidurmu sendiri setelah bangun pagi tanpa disuruh.',
          'Misi 2: Sebutkan 2 hak anak di rumah (hak mendapat kasih sayang dan perlindungan).',
          'Misi 3: Buat jadwal harian antara waktu belajar, membantu orang tua, dan bermain.'
        ],
        checklistEn: [
          'Mission 1: Make your own bed neatly after waking up without reminders.',
          'Mission 2: Name two rights of children at home (love and protection).',
          'Mission 3: Draft a balanced daily timetable for study, chores, and play.'
        ],
        activities: [
          { q: 'Mendapatkan kasih sayang dari orang tua dan bimbingan guru di sekolah adalah contoh...', options: ['Hak anak', 'Kewajiban anak', 'Hukuman anak', 'Permintaan sepihak'], answer: 'Hak anak', hint: 'Hak adalah sesuatu yang patut diterima anak untuk tumbuh kembang.' },
          { q: 'Manakah yang merupakan KEWAJIBAN siswa di sekolah?', options: ['Belajar tekun dan mematuhi tata tertib', 'Bermain terus sepanjang hari', 'Mengotori meja kelas', 'Pulang sebelum bel berbunyi'], answer: 'Belajar tekun dan mematuhi tata tertib', hint: 'Kewajiban adalah tanggung jawab murid di lingkungan sekolah.' }
        ],
        activitiesEn: [
          { q: 'Receiving parental love and teacher guidance is an example of...', options: ['A child\'s right', 'A child\'s punishment', 'A chore', 'An option'], answer: 'A child\'s right', hint: 'Rights protect children and foster growth.' }
        ]
      },
      {
        id: 'pan-tertib-antre',
        title: 'Aturan, Tata Tertib, & Budaya Antre',
        titleEn: 'Classroom Rules & Patient Queuing Culture',
        desc: 'Aturan dibuat agar hidup kita tertib, aman, dan nyaman. Contoh aturan di sekolah: datang tepat waktu, mendengarkan guru saat menjelaskan, dan mengantre giliran saat mencuci tangan atau di kantin dengan sabar tanpa saling dorong!',
        descEn: 'Rules exist to maintain harmony, safety, and mutual peace. Examples include arriving on time, listening attentively to teachers, and patiently queuing without pushing!',
        checklist: [
          'Misi 1: Praktikkan berdiri tertib di barisan saat upacara bendera atau antre masuk kelas.',
          'Misi 2: Angkat tangan kanan dengan sopan saat ingin bertanya atau berpendapat di kelas.',
          'Misi 3: Ingatkan teman dengan ramah jika ada yang lupa mencuci tangan sebelum makan.'
        ],
        checklistEn: [
          'Mission 1: Stand patiently in line during morning assembly or when entering class.',
          'Mission 2: Raise your right hand politely before speaking or answering questions.',
          'Mission 3: Kindly remind classmates to wash hands with soap before mealtime.'
        ],
        activities: [
          { q: 'Saat membeli makanan di kantin sekolah yang sedang ramai, sikap tertib yang benar adalah...', options: ['Mengantre dengan sabar di belakang teman', 'Menyerobot ke baris paling depan', 'Mendorong teman di depan', 'Berteriak memanggil penjual'], answer: 'Mengantre dengan sabar di belakang teman', hint: 'Budaya antre melatih kesabaran dan menghargai hak orang lain.' },
          { q: 'Mengapa di kelas perlu ada aturan dan tata tertib bersama?', options: ['Agar suasana belajar menjadi aman, tertib, dan nyaman', 'Agar murid merasa takut', 'Agar guru bisa beristirahat', 'Hanya sebagai hiasan dinding'], answer: 'Agar suasana belajar menjadi aman, tertib, dan nyaman', hint: 'Tata tertib menjaga keteraturan bersama seluruh murid.' }
        ],
        activitiesEn: [
          { q: 'When buying food at a busy school canteen, what is the proper civic behavior?', options: ['Queue patiently behind others', 'Cut to the front', 'Push other students', 'Yell loudly'], answer: 'Queue patiently behind others', hint: 'Queuing shows respect and emotional maturity.' }
        ]
      },
      {
        id: 'pan-keberagaman',
        title: 'Bhinneka Tunggal Ika & Keragaman Teman',
        titleEn: 'Unity in Diversity (Bhinneka Tunggal Ika)',
        desc: 'Indonesia kaya akan keberagaman suku bangsa (Jawa, Sunda, Batak, Bali, Dayak, Papua, dll), bahasa daerah, dan agama. Meskipun berbeda suku dan warna kulit, semboyan kita tetap "Bhinneka Tunggal Ika" — Berbeda-beda tetapi tetap satu jua!',
        descEn: 'Indonesia embraces rich ethnic diversity across hundreds of tribes, regional dialects, and faiths. Despite differences, our motto "Bhinneka Tunggal Ika" binds us as one unified family!',
        checklist: [
          'Misi 1: Tanyakan kepada 3 teman sekelas dari suku atau daerah asal manakah orang tuanya.',
          'Misi 2: Pelajari 1 kata sapaan bahasa daerah sahabatmu (misal: "Sampurasun" atau "Om Swastyastu").',
          'Misi 3: Tulis pesan persahabatan: "Kita semua sahabat satu Indonesia".'
        ],
        checklistEn: [
          'Mission 1: Ask 3 classmates about their cultural or ancestral home islands.',
          'Mission 2: Learn 1 traditional regional greeting word from a classmate.',
          'Mission 3: Pen a friendship note: "We are all proud brothers and sisters of Indonesia".'
        ],
        activities: [
          { q: 'Apa arti semboyan nasional "Bhinneka Tunggal Ika"?', options: ['Berbeda-beda tetapi tetap satu jua', 'Bersatu kita teguh bercerai kita runtuh', 'Maju tak gentar membela yang benar', 'Adil dan makmur sejahtera'], answer: 'Berbeda-beda tetapi tetap satu jua', hint: 'Walau berbeda suku, agama, dan budaya, bangsa Indonesia tetap bersatu 🇮🇩' },
          { q: 'Jika sahabat barumu berasal dari daerah yang berbeda logat bahasanya, sikapmu adalah...', options: ['Menghargai dan senang berteman dengannya', 'Mengejek logatnya', 'Menjauhinya', 'Menyuruhnya berganti logat'], answer: 'Menghargai dan senang berteman dengannya', hint: 'Menghargai keberagaman adalah ciri pelajar berkarakter Pancasila.' }
        ],
        activitiesEn: [
          { q: 'What is the translation of "Bhinneka Tunggal Ika"?', options: ['Unity in Diversity (Different yet one)', 'Strength in silence', 'Victory through peace', 'Ever onward'], answer: 'Unity in Diversity (Different yet one)', hint: 'It honors mutual solidarity amid diverse backgrounds.' }
        ]
      },
      {
        id: 'pan-gotong-royong',
        title: 'Gotong Royong & Peduli Lingkungan',
        titleEn: 'Gotong Royong & Environmental Stewardship',
        desc: 'Gotong royong adalah warisan budaya luhur bangsa Indonesia di mana pekerjaan dilakukan bersama-sama secara sukarela. Pekerjaan berat seperti membersihkan selokan atau piket kelas menjadi ringan dan cepat selesai jika dikerjakan bersama!',
        descEn: 'Gotong royong is Indonesia\'s timeless tradition of communal voluntary teamwork. Heavy chores such as classroom cleaning or garden tending become swift and delightful when carried out together!',
        checklist: [
          'Misi 1: Laksanakan piket kelas dengan penuh semangat bersama regu piketmu.',
          'Misi 2: Pungut sampah yang tercecer di halaman sekolah dan masukkan ke tempat sampah yang sesuai.',
          'Misi 3: Bersihkan meja makan dan cuci piringmu sendiri setelah selesai makan di rumah.'
        ],
        checklistEn: [
          'Mission 1: Perform your classroom cleaning duty with enthusiasm alongside your team.',
          'Mission 2: Pick up stray litter on the school yard and place it into the correct bin.',
          'Mission 3: Clear the dining table and wash your personal cup after dinner at home.'
        ],
        activities: [
          { q: 'Manfaat utama dari kegiatan gotong royong membersihkan kelas adalah...', options: ['Pekerjaan berat menjadi ringan dan cepat selesai', 'Membuat anak-anak bertengkar', 'Menghabiskan waktu sia-sia', 'Membuat kelas semakin kotor'], answer: 'Pekerjaan berat menjadi ringan dan cepat selesai', hint: 'Kerja sama membuat pekerjaan besar terasa ringan.' },
          { q: 'Contoh nyata semangat gotong royong di lingkungan sekolah adalah...', options: ['Bekerja sama menyiram tanaman di kebun sekolah', 'Mengerjakan ujian bersama secara menyontek', 'Meninggalkan sampah di laci meja', 'Mendorong teman saat bermain'], answer: 'Bekerja sama menyiram tanaman di kebun sekolah', hint: 'Gotong royong selalu untuk hal-hal positif dan bermanfaat bagi lingkungan.' }
        ],
        activitiesEn: [
          { q: 'What is the main benefit of communal gotong royong teamwork?', options: ['Heavy tasks become light and finish faster', 'Causes chaos', 'Wastes time', 'Makes spaces dirtier'], answer: 'Heavy tasks become light and finish faster', hint: 'Cooperation lightens any heavy load.' }
        ]
      }
  ,
      {
        id: 'pp-musyawarah-cilik',
        title: 'Musyawarah Cilik & Menghargai Pendapat Teman',
        titleEn: 'Junior Deliberation & Respecting Friends’ Opinions',
        desc: 'Sila ke-4 Pancasila mengajarkan kita untuk bermusyawarah saat mengambil keputusan bersama. Di kelas, anak-anak berdiskusi secara tertib, mendengarkan saat teman lain berbicara tanpa memotong, dan menerima hasil kesepakatan bersama dengan hati gembira!',
        descEn: 'The 4th principle of Pancasila teaches us democratic deliberation. In the classroom, children discuss peacefully, listen patiently without interrupting, and cheerfully support agreed decisions!',
        checklist: [
          "Misi 1: Dengarkan teman berbicara sampai selesai tanpa menyela saat diskusi kelompok.",
          "Misi 2: Angkat tanganmu terlebih dahulu sebelum menyampaikan usul atau pendapat di kelas.",
          "Misi 3: Berikan tepuk tangan hangat untuk ide bagus yang disampaikan oleh sahabatmu."
  ],
        checklistEn: [
          "Mission 1: Listen to your friend until they finish speaking without interrupting.",
          "Mission 2: Raise your hand politely before sharing ideas in class discussions.",
          "Mission 3: Applaud warmly for creative ideas shared by your classmates."
  ],
        activities: [
          {
                  "q": "Sikap yang benar saat teman sedang menyampaikan pendapatnya adalah...",
                  "options": [
                          "Mendengarkan dengan tenang dan tertib",
                          "Mengobrol sendiri dengan teman lain",
                          "Mengejek pendapat teman",
                          "Memotong pembicaraannya"
                  ],
                  "answer": "Mendengarkan dengan tenang dan tertib",
                  "hint": "Hormati teman yang sedang mendapat giliran berbicara."
          },
          {
                  "q": "Musyawarah untuk mufakat merupakan pengamalan Pancasila sila ke-...",
                  "options": [
                          "4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan)",
                          "1",
                          "2",
                          "3"
                  ],
                  "answer": "4 (Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan)",
                  "hint": "Disimbolkan dengan lambang Kepala Banteng yang gagah."
          },
          {
                  "q": "Setelah keputusan musyawarah kelas disepakati bersama, sikap kita adalah...",
                  "options": [
                          "Melaksanakan keputusan dengan ikhlas dan gembira",
                          "Menolak karena bukan ide kita",
                          "Marah-marah",
                          "Pulang ke rumah"
                  ],
                  "answer": "Melaksanakan keputusan dengan ikhlas dan gembira",
                  "hint": "Keputusan bersama harus ditaati demi kebaikan seluruh warga kelas."
          }
  ],
        activitiesEn: [
          {
                  "q": "The best attitude when a classmate is speaking is to...",
                  "options": [
                          "Listen calmly and respectfully",
                          "Chat with someone else loudly",
                          "Laugh at their idea",
                          "Interrupt them immediately"
                  ],
                  "answer": "Listen calmly and respectfully",
                  "hint": "Show respect while others speak."
          }
  ]
      },
      {
        id: 'pp-fasilitas-sekolah',
        title: 'Menjaga Fasilitas Bersama & Lingkungan Sekolah',
        titleEn: 'Caring for School Facilities & Shared Spaces',
        desc: 'Sekolah adalah rumah kedua kita. Meja, kursi, papan tulis, buku perpustakaan, dan toilet adalah fasilitas bersama yang harus dijaga dengan penuh kasih sayang. Tidak mencoret-coret meja dan selalu membuang sampah pada tempatnya adalah wujud cinta kepada sekolah.',
        descEn: 'School is our joyful second home. Desks, chairs, library books, and playgrounds are shared treasures. Refraining from writing on desks and always placing trash into bins reflects our deep respect for our community.',
        checklist: [
          "Misi 1: Periksa laci meja belajarmu, pastikan bersih dari sampah kertas atau plastik.",
          "Misi 2: Matikan keran air wastafel setelah selesai mencuci tangan agar air tidak terbuang percuma.",
          "Misi 3: Kembalikan buku perpustakaan sekolah tepat waktu ke rak yang rapi."
  ],
        checklistEn: [
          "Mission 1: Check your classroom desk drawer and keep it free of litter.",
          "Mission 2: Turn off the water tap firmly after washing hands to conserve water.",
          "Mission 3: Return library books punctually and gently place them on the shelf."
  ],
        activities: [
          {
                  "q": "Mencoret-coret dinding atau meja sekolah dengan spidol adalah perbuatan yang...",
                  "options": [
                          "Tidak terpuji dan merusak fasilitas",
                          "Hebat dan keren",
                          "Patut dicontoh",
                          "Membuat sekolah makin bersih"
                  ],
                  "answer": "Tidak terpuji dan merusak fasilitas",
                  "hint": "Fasilitas sekolah harus dirawat agar rapi dan nyaman digunakan semua anak."
          },
          {
                  "q": "Setelah selesai membaca buku cerita di perpustakaan sekolah, buku harus...",
                  "options": [
                          "Dikembalikan ke rak buku secara rapi",
                          "Ditinggal tergeletak di lantai",
                          "Dibawa pulang tanpa izin",
                          "Dirobek halamannya"
                  ],
                  "answer": "Dikembalikan ke rak buku secara rapi",
                  "hint": "Agar teman lain mudah menemukannya saat ingin membaca."
          },
          {
                  "q": "Menjaga kebersihan dan keasrian lingkungan sekolah adalah tanggung jawab...",
                  "options": [
                          "Seluruh warga sekolah (siswa, guru, dan penjaga)",
                          "Hanya tukang kebun saja",
                          "Hanya kepala sekolah",
                          "Hanya ketua kelas"
                  ],
                  "answer": "Seluruh warga sekolah (siswa, guru, dan penjaga)",
                  "hint": "Semua orang yang belajar dan bekerja di sekolah wajib bergotong royong."
          }
  ],
        activitiesEn: [
          {
                  "q": "Doodling on school walls and classroom desks is...",
                  "options": [
                          "Disrespectful and damages shared property",
                          "Cool and funny",
                          "Encouraged by teachers",
                          "Helpful"
                  ],
                  "answer": "Disrespectful and damages shared property",
                  "hint": "Shared school facilities should be treasured."
          }
  ]
      },
      {
        "id": "pancasila-bendera-lagu",
      "title": "Bangga Sebagai Anak Indonesia: Bendera & Lagu Kebangsaan",
      "titleEn": "Proud Indonesian Children: National Flag & Anthem",
      "desc": "Bendera negara kita adalah Sang Merah Putih. Merah melambangkan keberanian membela kebenaran, dan putih melambangkan kesucian hati serta budi luhur. Lagu kebangsaan Indonesia Raya ciptaan W.R. Supratman kita nyanyikan dengan sikap tegap dan penuh rasa hormat!",
      "descEn": "Our national flag is the Red and White (Sang Merah Putih). Red embodies courage and righteousness, while white symbolizes purity of heart. We sing Indonesia Raya with dignity, standing tall and proud!",
      "checklist": [
        "Misi 1: Berdiri tegap sempurna dan tidak bercanda saat lagu Indonesia Raya berkumandang.",
        "Misi 2: Gambarlah Bendera Merah Putih dengan posisi warna merah di bagian atas dan putih di bagian bawah.",
        "Misi 3: Hafalkan bait pertama lagu kebangsaan Indonesia Raya dengan nada yang khidmat."
      ],
      "checklistEn": [
        "Mission 1: Stand upright attentively without chatting when the national anthem plays.",
        "Mission 2: Draw the Red & White flag with red on top and white on bottom.",
        "Mission 3: Memorize the first stanza of Indonesia Raya with heartfelt pride."
      ],
      "activities": [
        {
          "q": "Posisi warna yang benar pada bendera Sang Merah Putih adalah...",
          "options": [
            "Merah di atas, Putih di bawah",
            "Putih di atas, Merah di bawah",
            "Merah di kiri, Putih di kanan",
            "Biru di atas, Merah di bawah"
          ],
          "answer": "Merah di atas, Putih di bawah",
          "hint": "Merah di atas bermakna api keberanian menaungi kesucian jiwa 🇮🇩"
        },
        {
          "q": "Pencipta lagu kebangsaan Indonesia Raya adalah pahlawan nasional...",
          "options": [
            "Wage Rudolf (W.R.) Supratman",
            "Ir. Soekarno",
            "Moh. Hatta",
            "Ki Hajar Dewantara"
          ],
          "answer": "Wage Rudolf (W.R.) Supratman",
          "hint": "Beliau memainkan biola saat lagu pertama kali diperdengarkan pada Sumpah Pemuda 1928."
        },
        {
          "q": "Sikap yang benar saat upacara bendera hari Senin adalah...",
          "options": [
            "Berdiri tegap, pandangan ke arah bendera, tertib dan khidmat",
            "Duduk mengobrol dengan teman",
            "Bermain ponsel",
            "Berlari-larian di lapangan"
          ],
          "answer": "Berdiri tegap, pandangan ke arah bendera, tertib dan khidmat",
          "hint": "Menghormati jasa para pahlawan yang telah memperjuangkan kemerdekaan."
        }
      ],
      "activitiesEn": [
        {
          "q": "Correct position of Indonesian flag colors:",
          "options": [
            "Red on top, White on bottom",
            "White on top, Red on bottom",
            "Green and Yellow",
            "Blue on top"
          ],
          "answer": "Red on top, White on bottom",
          "hint": "Red on top, white beneath 🇮🇩"
        }
      ]
    },
    {
      "id": "pancasila-sopan-santun",
      "title": "Tata Krama, Sopan Santun, & Menghormati yang Lebih Tua",
      "titleEn": "Good Manners, Politeness, & Respecting Elders",
      "desc": "Sopan santun adalah cermin budi pekerti luhur bangsa Indonesia. Kita wajib menghormati orang tua, guru, kakek-nenek, dan kakak, serta menyayangi adik. Berpamitan saat pergi, memberi salam saat bertemu, dan bertutur kata santun mencerminkan pribadi berakhlak mulia!",
      "descEn": "Politeness mirrors noble character. We respect parents, teachers, grandparents, and care gently for younger siblings. Saying greetings, bidding farewell, and using polite speech honors our community!",
      "checklist": [
        "Misi 1: Berpamitan dan mencium tangan Ayah serta Ibu sebelum berangkat ke sekolah.",
        "Misi 2: Ucapkan salam \"Selamat Pagi/Siang\" saat berpapasan dengan Bapak/Ibu Guru di koridor.",
        "Misi 3: Tidak memotong pembicaraan ketika orang tua atau orang yang lebih tua sedang berbicara."
      ],
      "checklistEn": [
        "Mission 1: Kiss parents' hands and bid polite farewell before departing for school.",
        "Mission 2: Greet your teachers warmly whenever passing by them in the school hallway.",
        "Mission 3: Listen respectfully without interrupting when elders are conversing."
      ],
      "activities": [
        {
          "q": "Sebelum berangkat sekolah, kebiasaan baik yang wajib kita lakukan kepada orang tua adalah...",
          "options": [
            "Berpamitan sopan dan memohon doa restu",
            "Langsung lari tanpa bicara",
            "Meminta uang jajan berlebihan sambil marah",
            "Pura-pura tidur"
          ],
          "answer": "Berpamitan sopan dan memohon doa restu",
          "hint": "Doa restu orang tua membuat langkah belajar kita berkah dan lancar!"
        },
        {
          "q": "Ketika bertemu guru di halaman sekolah, ucapan yang santun adalah...",
          "options": [
            "\"Selamat pagi Ibu/Bapak Guru!\" sambil tersenyum",
            "\"Hai kamu!\"",
            "Lewat begitu saja tanpa menoleh",
            "Menutup muka"
          ],
          "answer": "\"Selamat pagi Ibu/Bapak Guru!\" sambil tersenyum",
          "hint": "Guru adalah orang tua kita selama berada di sekolah 🏫"
        },
        {
          "q": "Jika tidak sengaja berjalan di depan orang yang lebih tua yang sedang duduk, kita mengucapkan...",
          "options": [
            "\"Permisi, numpang lewat...\" sambil sedikit membungkuk",
            "\"Awas, minggir!\"",
            "\"Jangan halangi jalanku\"",
            "Diam saja"
          ],
          "answer": "\"Permisi, numpang lewat...\" sambil sedikit membungkuk",
          "hint": "Sikap sopan dan santun khas adat nusantara."
        }
      ],
      "activitiesEn": [
        {
          "q": "Before leaving for school, we should...",
          "options": [
            "Say goodbye politely to parents",
            "Run away silently",
            "Shout angrily",
            "Hide under bed"
          ],
          "answer": "Say goodbye politely to parents",
          "hint": "Polite farewell shows love!"
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/bahasa-bali.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Bahasa Bali Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Kearifan Lokal Dewata)
  // ================================================================
  
  const BAHASA_BALI_DATA = {
    id: 'bahasa-bali',
    title: 'Bahasa Bali — Melajah Basa & Budaya Bali',
    titleEn: 'Balinese Language — Exploring Heritage & Dialect',
    subtitle: 'Rahajeng semeng! Ngiring melajah anggah-ungguhing basa, kruna aran, gending rare, tur satua Bali 🌴',
    subtitleEn: 'Welcome! Let\'s learn polite Balinese speech levels, traditional children songs, numbers, and folk fables 🌴',
    topics: [
      {
        id: 'bali-salam',
        title: 'Salam Panganjali & Kruna Tata Krama',
        titleEn: 'Balinese Greetings & Politeness (Tata Krama)',
        desc: 'Masyarakat Bali menjunjung tinggi tata krama bertutur kata. Salam panganjali "Om Swastyastu" diucapkan dengan cakupan tangan di dada saat bertemu. Ucapkan "Matur suksma" untuk berterima kasih, "Mewali" untuk membalas terima kasih, dan "Rahajeng semeng" untuk selamat pagi!',
        descEn: 'Balinese society honors courteous speech. The universal greeting "Om Swastyastu" is offered with hands folded in front of the heart. Say "Matur suksma" for thank you and "Mewali" for you are welcome!',
        checklist: [
          'Misi 1: Latih salam "Om Swastyastu" dengan menangkupkan kedua telapak tangan di depan dada.',
          'Misi 2: Ucapkan "Matur suksma" saat menerima sesuatu dari orang tua atau gurumu.',
          'Misi 3: Hafalkan arti ucapan "Rahajeng semeng" (Selamat pagi) dan "Rahajeng wengi" (Selamat malam).'
        ],
        checklistEn: [
          'Mission 1: Practice the greeting "Om Swastyastu" with hands folded respectfully at chest level.',
          'Mission 2: Say "Matur suksma" warmly when receiving guidance or a gift.',
          'Mission 3: Memorize the meaning of "Rahajeng semeng" (Good morning) and "Rahajeng wengi" (Good night).'
        ],
        activities: [
          { q: 'Salam Panganjali umat Hindu dan masyarakat Bali saat bertegur sapa adalah...', options: ['Om Swastyastu', 'Matur suksma', 'Sampurasun', 'Horas'], answer: 'Om Swastyastu', hint: 'Diucapkan dengan menangkupkan kedua tangan di depan dada 🙏' },
          { q: 'Bila seseorang berbuat baik atau memberi bantuan, kita mengucapkan...', options: ['Matur suksma', 'Rahajeng wengi', 'Ampura', 'Nggih'], answer: 'Matur suksma', hint: 'Matur suksma artinya terima kasih banyak.' },
          { q: '"Rahajeng semeng" dalam bahasa Indonesia artinya...', options: ['Selamat pagi', 'Selamat siang', 'Selamat malam', 'Selamat jalan'], answer: 'Selamat pagi', hint: 'Semeng artinya waktu pagi hari saat matahari terbit.' }
        ],
        activitiesEn: [
          { q: 'The traditional Balinese welcoming greeting with folded hands is...', options: ['Om Swastyastu', 'Matur suksma', 'Sampurasun', 'Horas'], answer: 'Om Swastyastu', hint: 'Offered with hands pressed gently at heart level 🙏' }
        ]
      },
      {
        id: 'bali-kruna-aran',
        title: 'Kruna Aran ring Jeroan (Benda di Rumah)',
        titleEn: 'Balinese Nouns for Household Objects',
        desc: 'Kruna aran adalah kata benda dalam bahasa Bali. Di jeroan (rumah), ada meja (méja), kursi (kursi), pintu (jelanan), jendela (jendela/kori), tempat tidur (pedeman/pesarean), dan dapur (pawaregan). Mengenal kruna aran memperkaya kosakata harian!',
        descEn: 'Kruna aran refers to nouns in Balinese. Common house items include jelanan (door), pedeman (bed), and pawaregan (kitchen). Learning these nouns builds conversational confidence!',
        checklist: [
          'Misi 1: Tunjuk pintu rumahmu dan sebutkan kruna Balinya ("Jelanan").',
          'Misi 2: Sebutkan sebutan dapur tradisional Bali ("Pawaregan") kepada orang tuamu.',
          'Misi 3: Tuliskan 3 kruna aran benda yang ada di kamarmu pada buku catatan.'
        ],
        checklistEn: [
          'Mission 1: Point to the entrance door and pronounce its Balinese noun ("Jelanan").',
          'Mission 2: Mention the traditional kitchen term ("Pawaregan") to your family.',
          'Mission 3: Write down 3 household nouns in Balinese in your study notepad.'
        ],
        activities: [
          { q: 'Pintu rumah dalam bahasa Bali halus/lumrah sering disebut...', options: ['Jelanan / Kori', 'Pawaregan', 'Pedeman', 'Pelinggih'], answer: 'Jelanan / Kori', hint: 'Akses keluar masuk ruangan atau pekarangan rumah.' },
          { q: 'Tempat memasak makanan di rumah (dapur) dalam bahasa Bali disebut...', options: ['Pawaregan', 'Bale dauh', 'Bale daja', 'Jaba'], answer: 'Pawaregan', hint: 'Ruangan tempat menyiapkan masakan lezat.' }
        ],
        activitiesEn: [
          { q: 'The entrance door or gate in Balinese is referred to as...', options: ['Jelanan / Kori', 'Pawaregan', 'Pedeman', 'Pelinggih'], answer: 'Jelanan / Kori', hint: 'The gateway or doorway.' }
        ]
      },
      {
        id: 'bali-wilangan',
        title: 'Wilangan Angka Basa Bali (1 - 20)',
        titleEn: 'Balinese Numbers & Counting (1 to 20)',
        desc: 'Berhitung dalam bahasa Bali sangat unik dan berirama: 1 (Sa/Besik), 2 (Dua), 3 (Telu), 4 (Papat), 5 (Lima), 6 (Nem), 7 (Pitu), 8 (Kutus), 9 (Sia), 10 (Dasa). Selanjutnya 11 (Solas), 12 (Roras), hingga 20 (Duang dasa)!',
        descEn: 'Counting in Balinese has a rhythmic flow: Sa (1), Dua (2), Telu (3), Papat (4), Lima (5), Nem (6), Pitu (7), Kutus (8), Sia (9), Dasa (10), Solas (11), Roras (12)... up to Duang dasa (20)!',
        checklist: [
          'Misi 1: Hitung jarimu dari 1 sampai 10 memakai wilangan Bali: Sa, Dua, Telu, Papat, Lima...',
          'Misi 2: Ucapkan angka 8 dalam bahasa Bali ("Kutus") dengan jelas.',
          'Misi 3: Hitung jumlah buku di tas sekolahmu menggunakan wilangan Bali.'
        ],
        checklistEn: [
          'Mission 1: Count your 10 fingers using Balinese numerals: Sa, Dua, Telu, Papat, Lima...',
          'Mission 2: Pronounce the number 8 in Balinese ("Kutus") distinctly.',
          'Mission 3: Tally your school textbooks using Balinese counting words.'
        ],
        activities: [
          { q: 'Angka 3 dalam wilangan bahasa Bali disebut...', options: ['Telu', 'Papat', 'Pitu', 'Nem'], answer: 'Telu', hint: '1=Sa, 2=Dua, 3=Telu.' },
          { q: 'Angka 10 dalam bahasa Bali adalah...', options: ['Dasa', 'Solas', 'Kutus', 'Sia'], answer: 'Dasa', hint: 'Sepuluh dalam bahasa Bali.' },
          { q: 'Angka 11 dalam bahasa Bali disebut...', options: ['Solas', 'Roras', 'Telulas', 'Patbelas'], answer: 'Solas', hint: 'Sebelas diucapkan solas.' }
        ],
        activitiesEn: [
          { q: 'Number 3 in Balinese counting is called...', options: ['Telu', 'Papat', 'Pitu', 'Nem'], answer: 'Telu', hint: 'Sa (1), Dua (2), Telu (3).' }
        ]
      },
      {
        id: 'bali-gending-rare',
        title: 'Gending Rare (Tembang Ceria Anak Bali)',
        titleEn: 'Gending Rare (Traditional Balinese Children Songs)',
        desc: 'Gending rare adalah lagu dolanan tradisional anak-anak Bali yang dinyanyikan saat bermain di bawah sinar bulan purnama atau saat santai. Lagu terkenalnya: "Putri Cening Ayu", "Meong-meong", dan "Dadong Dauh" yang sarat nasehat bakti kepada orang tua!',
        descEn: 'Gending rare are joyful traditional folksongs sung by Balinese children during playtime under moonlight. Famous tunes include "Putri Cening Ayu" and "Meong-meong", teaching kindness and affection!',
        checklist: [
          'Misi 1: Dengarkan atau nyanyikan bait pertama tembang "Putri Cening Ayu".',
          'Misi 2: Tirukan lirik lagu "Meong-meong alih jek bikule" sambil bertepuk tangan.',
          'Misi 3: Ceritakan pesan nasehat lagu Putri Cening Ayu (anak yang penurut dan menyayangi ibu).'
        ],
        checklistEn: [
          'Mission 1: Listen to or sing the opening stanza of "Putri Cening Ayu".',
          'Mission 2: Recite the playful rhyme "Meong-meong" while clapping rhythmically.',
          'Mission 3: Reflect on the moral lesson of honoring and helping mothers.'
        ],
        activities: [
          { q: 'Gending rare yang menceritakan kucing mengejar tikus (biku) yang nakal adalah...', options: ['Meong-meong', 'Putri Cening Ayu', 'Macepet-cepetan', 'Ratu Anom'], answer: 'Meong-meong', hint: 'Liriknya: "Meong-meong, alih ja bikule..." 🐱' },
          { q: 'Tembang "Putri Cening Ayu" menceritakan nasehat seorang ibu yang hendak pergi ke...', options: ['Peken (Pasar)', 'Carik (Sawah)', 'Pasih (Pantai)', 'Gunung'], answer: 'Peken (Pasar)', hint: 'Lirik: "Putri cening ayu, ngijeng cening jumah, meme luas kapeken..."' }
        ],
        activitiesEn: [
          { q: 'Which Balinese children song depicts a cat chasing a mischievous mouse?', options: ['Meong-meong', 'Putri Cening Ayu', 'Macepet-cepetan', 'Ratu Anom'], answer: 'Meong-meong', hint: 'Lyrical line: "Meong-meong, alih ja bikule..." 🐱' }
        ]
      },
      {
        id: 'bali-rahina-nyepi',
        title: 'Pura, Upacara, & Rahina Suci Nyepi',
        titleEn: 'Temples, Ceremonies, & Sacred Nyepi Day',
        desc: 'Pulau Bali terkenal dengan ribuan Pura megah dan upacara tradisi yang asri. Saat menyambut Tahun Baru Saka (Hari Raya Nyepi), umat Hindu melaksanakan Catur Brata Penyepian: Amati Geni (tidak menyalakan api/lampu), Amati Karya (tidak bekerja), Amati Lelungan (tidak bepergian), dan Amati Lelanguan (tidak bersenang-senang)!',
        descEn: 'Bali is celebrated worldwide for thousands of sacred shrines. During Nyepi (Balinese Day of Silence), four contemplative observances (Catur Brata Penyepian) are practiced to cleanse nature and the human spirit!',
        checklist: [
          'Misi 1: Sebutkan nama Pura terbesar di Bali yang terletak di lereng Gunung Agung (Pura Besakih).',
          'Misi 2: Pahami makna "Amati Geni" saat Nyepi (tidak menyalakan lampu agar hening dan tenang).',
          'Misi 3: Buat gambar ornamen janur atau canang sari sederhana di buku sketsamu.'
        ],
        checklistEn: [
          'Mission 1: Name Bali\'s largest Mother Temple on Mount Agung (Pura Besakih).',
          'Mission 2: Explain the significance of "Amati Geni" (no lighting of fire/lamps for quiet serenity).',
          'Mission 3: Sketch a simple floral Canang Sari offering in your art book.'
        ],
        activities: [
          { q: 'Salah satu bagian dari Catur Brata Penyepian yang artinya tidak menyalakan api/lampu adalah...', options: ['Amati Geni', 'Amati Karya', 'Amati Lelungan', 'Amati Lelanguan'], answer: 'Amati Geni', hint: 'Geni artinya api atau sumber cahaya penerangan.' },
          { q: 'Ibu dari seluruh Pura di Bali yang berdiri megah di lereng Gunung Agung adalah...', options: ['Pura Agung Besakih', 'Pura Tanah Lot', 'Pura Uluwatu', 'Pura Tirta Empul'], answer: 'Pura Agung Besakih', hint: 'Terletak di Kabupaten Karangasem.' }
        ],
        activitiesEn: [
          { q: 'Which observance of Nyepi\'s Catur Brata means refraining from lighting fire and lamps?', options: ['Amati Geni', 'Amati Karya', 'Amati Lelungan', 'Amati Lelanguan'], answer: 'Amati Geni', hint: 'Geni signifies fire or artificial light.' }
        ]
      },
      {
        id: 'bali-satua',
        title: 'Satua Bali (Dongeng Tradisional & Satwa)',
        titleEn: 'Satua Bali (Fables & Traditional Wisdom)',
        desc: 'Satua Bali adalah cerita dongeng rakyat berbahasa Bali yang diwariskan turun-temurun. Cerita populer seperti "Satua I Siap Selem" (induk ayam hitam yang melindungi anak-anaknya dari musang I Meng) mengajarkan kasih sayang orang tua dan kecerdikan mengalahkan bahaya!',
        descEn: 'Satua Bali are folklore fables passed through oral traditions. Classic stories like "Satua I Siap Selem" (the clever black hen protecting her chicks from the wildcat) teach bravery, motherly love, and wisdom!',
        checklist: [
          'Misi 1: Dengarkan cerita Satua "I Siap Selem" dari orang tua atau gurumu.',
          'Misi 2: Sebutkan siapa tokoh cerdik dan pemberani dalam cerita I Siap Selem (I Mengkadut).',
          'Misi 3: Petik pesan moral bahwa kasih sayang ibu selalu melindungi kita dari marabahaya.'
        ],
        checklistEn: [
          'Mission 1: Listen to the traditional fable "I Siap Selem".',
          'Mission 2: Identify the clever little chick character in the story.',
          'Mission 3: Discuss the moral message of maternal bravery and resilience.'
        ],
        activities: [
          { q: 'Dalam satua Bali "I Siap Selem", tokoh Siap Selem adalah seekor...', options: ['Ayam betina berbulu hitam', 'Kucing belang', 'Bebek putih', 'Kera abu-abu'], answer: 'Ayam betina berbulu hitam', hint: 'Siap artinya ayam, selem artinya hitam.' },
          { q: 'Pesan moral utama dari Satua I Siap Selem adalah...', options: ['Kasih sayang ibu yang rela berkorban dan kecerdikan menghadapi bahaya', 'Kekuatan fisik yang jahat selalu menang', 'Malas mencari makan', 'Meninggalkan teman sendirian'], answer: 'Kasih sayang ibu yang rela berkorban dan kecerdikan menghadapi bahaya', hint: 'Ibu ayam melindungi semua anak-anaknya dari bahaya.' }
        ],
        activitiesEn: [
          { q: 'In the Balinese fable "I Siap Selem", what creature is Siap Selem?', options: ['A black hen mother', 'A striped tiger', 'A white duck', 'A brown monkey'], answer: 'A black hen mother', hint: 'Siap means chicken, selem means black.' }
        ]
      }
  ,
      {
        id: 'bb-ceciren-buron',
        title: 'Ceciren Buron & Suarannyane (Nama Hewan & Suaranya)',
        titleEn: 'Animal Names & Sounds in Balinese (Ceciren Buron)',
        desc: 'Ring wewidangan Bali, akeh pisan wenten buron (hewan) sane ramah. Meong (kucing) maswara "ngeong-ngeong", Cicing (anjing) maswara "kungkung", Siap (ayam) maswara "kukuruyuk", Bebek maswara "kwek-kwek", lan Bojog (kera) sane mekedekan ring Ubud. Malajah basa Bali indik buron puniki ngulangunin pisan!',
        descEn: 'In Bali, many friendly animals live alongside people. Meong (cat) purrs "meow", Cicing (dog) barks, Siap (chicken) crows at sunrise, Bebek (duck) waddles, and Bojog (monkey) plays in Ubud forests. Learning animal names in Balinese is so colorful and enjoyable!',
        checklist: [
          "Misi 1: Tiru suara Siap (ayam jantan) lan Meong (kucing) ngangge basa Bali sane patut.",
          "Misi 2: Sebutkan 3 wastan buron (nama hewan) sane sering kacingak ring pekarangan umah.",
          "Misi 3: Nyanyikan gending anak-anak Bali \"Meong-meong Alih Ja Bikule\" sareng rerama."
  ],
        checklistEn: [
          "Mission 1: Mimic rooster (Siap) and cat (Meong) sounds cheerfully in Balinese.",
          "Mission 2: Name 3 animals frequently spotted around Balinese house compounds.",
          "Mission 3: Sing the traditional Balinese children song \"Meong-meong\" with your parents."
  ],
        activities: [
          {
                  "q": "Wastan buron \"Kucing\" ring Basa Bali inggih punika...",
                  "options": [
                          "Meong",
                          "Bojog",
                          "Sampi",
                          "Bebek"
                  ],
                  "answer": "Meong",
                  "hint": "Hewan berbulu lucu yang suka makan ikan 🐱"
          },
          {
                  "q": "Buron sane meawak ageng, ma-tanduk, lan seneng ngamah padang mawasta...",
                  "options": [
                          "Sampi (Sapi)",
                          "Kedis (Burung)",
                          "Bikul (Tikus)",
                          "Lelipi (Ular)"
                  ],
                  "answer": "Sampi (Sapi)",
                  "hint": "Sering membantu petani membajak sawah subak 🐂"
          },
          {
                  "q": "Suaran siap muani (ayam jantan) ring semeng rikala matan ai terbit inggih punika...",
                  "options": [
                          "Kukuruyuk!",
                          "Meong!",
                          "Kwek-kwek!",
                          "Cit-cit!"
                  ],
                  "answer": "Kukuruyuk!",
                  "hint": "Membangunkan anak-anak untuk mandi dan sekolah 🌅"
          }
  ],
        activitiesEn: [
          {
                  "q": "The Balinese word for \"Cat\" is...",
                  "options": [
                          "Meong",
                          "Bojog",
                          "Sampi",
                          "Bebek"
                  ],
                  "answer": "Meong",
                  "hint": "A cute furry pet that purrs 🐱"
          }
  ]
      },
      {
        id: 'bb-sarwa-sekar',
        title: 'Sarwa Sekar & Tetanduran (Bunga & Tanaman Asri Bali)',
        titleEn: 'Flowers & Plants of Bali (Sarwa Sekar & Tetanduran)',
        desc: 'Pekarangan umah ring Bali asri pisan kadagingin sekar (bunga) sane miik ngalub. Wenten Sekar Jepun (Kamboja) sane mawarna putih lan kuning, Sekar Sandat sane miik sumingkir, Sekar Mawar barak, lan Sekar Pacah. Sekar-sekar puniki kaanggen canang sari pinaka rasa suksma majeng Ida Sang Hyang Widhi Wasa.',
        descEn: 'Balinese home compounds are lush with fragrant blossoms. Sekar Jepun (Frangipani) shines in radiant yellow and white, Sekar Sandat perfumes the breeze, along with vibrant red roses. These lovely flowers adorn sacred offerings expressing gratitude to Nature and the Creator.',
        checklist: [
          "Misi 1: Ruruh (temukan) 1 sekar Jepun sane ulung ring natahe, ambung miiknyane sane sumingkir.",
          "Misi 2: Sebutkan 3 warna sekar sane wenten ring pekarangan umah (putih, barak, kuning).",
          "Misi 3: Siram tetanduran sekar ring natahe saban sore mangda tetep seger lan nedeng kembang."
  ],
        checklistEn: [
          "Mission 1: Pick up a fallen Frangipani (Jepun) blossom and enjoy its sweet gentle fragrance.",
          "Mission 2: Name 3 flower colors found in your garden (white, red, golden yellow).",
          "Mission 3: Water the flower garden every afternoon to help the blossoms stay radiant."
  ],
        activities: [
          {
                  "q": "Sekar Jepun punika ring basa Indonesia kabaos bunga...",
                  "options": [
                          "Kamboja",
                          "Melati",
                          "Matahari",
                          "Anggrek"
                  ],
                  "answer": "Kamboja",
                  "hint": "Bunga khas Pulau Bali yang sering disematkan di telinga 🌺"
          },
          {
                  "q": "Bunga sane warnanyane barak (merah) kabaos sekar...",
                  "options": [
                          "Barak",
                          "Selem",
                          "Pelung",
                          "Gading"
                  ],
                  "answer": "Barak",
                  "hint": "Barak = Merah dalam Basa Bali."
          },
          {
                  "q": "Tetanduran ring natahe patut kasiram saban rahina mangda...",
                  "options": [
                          "Subur lan seger (tidak layu)",
                          "Gering (sakit)",
                          "Mati",
                          "Gundul"
                  ],
                  "answer": "Subur lan seger (tidak layu)",
                  "hint": "Tanaman butuh air dan sinar matahari untuk tumbuh subur."
          }
  ],
        activitiesEn: [
          {
                  "q": "The iconic Balinese flower \"Sekar Jepun\" is known in English as...",
                  "options": [
                          "Frangipani",
                          "Sunflower",
                          "Lotus",
                          "Tulip"
                  ],
                  "answer": "Frangipani",
                  "hint": "Famous fragrant tropical blossom of Bali 🌺"
          }
  ]
      },
      {
        "id": "bali-bebadetan",
      "title": "Paribasa Bali: Bebadetan (Teka-Teki Ceria)",
      "titleEn": "Balinese Riddles: Bebadetan",
      "desc": "Bebadetan inggih punika sesimbingan utawi cecimpedan teka-teki mabasa Bali sane ngicenin kalecegan nalar lan rasa bungah. Conto: \"Apa ke anak cerik ngemu getih?\" Pasaur: Tabia (cabe)! \"Apa ke memene maring-ring, pianakne ngelanting?\" Pasaur: Punyan biu!",
      "descEn": "Bebadetan are traditional Balinese riddles that spark laughter and witty deductive thinking among children. Examples include riddles describing chili peppers, bananas, and coconut trees!",
      "checklist": [
        "Misi 1: Tebak 2 bebadetan ceria sareng rerama ring jeroan.",
        "Misi 2: Eja kruna pasaur bebadetan: TABIA (cabe), BIU (pisang), lan NYUH (kelapa).",
        "Misi 3: Gendingang sasimbingan cerik puniki sareng kanca-kanca ring kelas."
      ],
      "checklistEn": [
        "Mission 1: Guess 2 cheerful Balinese riddles together with parents at home.",
        "Mission 2: Spell the answer words: TABIA (chili), BIU (banana), and NYUH (coconut).",
        "Mission 3: Share these humorous traditional riddles with school friends."
      ],
      "activities": [
        {
          "q": "Teka-teki Bali: \"Anak cerik ngemu getih\" pasaur pastikannyane inggih punika...",
          "options": [
            "Tabia (cabe barak) 🌶️",
            "Batu",
            "Don kayu",
            "Air"
          ],
          "answer": "Tabia (cabe barak) 🌶️",
          "hint": "Bentukne cenik barak, rasane lalah nyelekket!"
        },
        {
          "q": "\"Bebadetan\" ring basa Indonesia mateges...",
          "options": [
            "Teka-teki atau tebak-tebakan ceria",
            "Lagu tidur",
            "Buku tulis",
            "Kamus"
          ],
          "answer": "Teka-teki atau tebak-tebakan ceria",
          "hint": "Bermain tebak-tebakan jenaka khas budaya Bali."
        }
      ],
      "activitiesEn": [
        {
          "q": "Balinese riddle \"Anak cerik ngemu getih\" refers to...",
          "options": [
            "Tabia (red chili) 🌶️",
            "Rock",
            "Wood",
            "Water"
          ],
          "answer": "Tabia (red chili) 🌶️",
          "hint": "Tiny red and very spicy!"
        }
      ]
    },
    {
      "id": "bali-upacara-melasti",
      "title": "Upacara Tradisi Bali: Melasti & Pawai Ogoh-Ogoh",
      "titleEn": "Balinese Cultural Celebrations: Melasti & Ogoh-Ogoh",
      "desc": "Sadurung rahina Nyepi, umat Hindu ring Bali ngamargiang Upacara Melasti nuju segara utawi danu anggen nyuciang pratima lan sarwa prabot suci. Ri kala wengi Pengerupukan, alit-alite seneng pisan nyaksiang pawai patung Ogoh-ogoh sane megah!",
      "descEn": "Prior to Nyepi, Balinese communities perform the holy Melasti procession towards beaches or sacred lakes for spiritual purification. On Pengerupukan eve, massive artistic Ogoh-ogoh statues are joyfully paraded!",
      "checklist": [
        "Misi 1: Ngaruruh arti Upacara Melasti (nyuciang bhuana alit lan bhuana agung nuju segara).",
        "Misi 2: Menggambar miniatur Ogoh-ogoh sane kreatif ring buku gambar.",
        "Misi 3: Menjaga karesikan lan ketertiban ri kala nonton pawai budaya adat Bali."
      ],
      "checklistEn": [
        "Mission 1: Learn the essence of Melasti (sacred purification ritual at the sea).",
        "Mission 2: Sketch a miniature creative Ogoh-ogoh drawing in your art book.",
        "Mission 3: Keep environment clean and courteous while watching cultural parades."
      ],
      "activities": [
        {
          "q": "Genah sane katuju ri kala Upacara Melasti inggih punika...",
          "options": [
            "Segara (pantai) utawi danu 🌊",
            "Pasar",
            "Bioskop",
            "Lapangan bola"
          ],
          "answer": "Segara (pantai) utawi danu 🌊",
          "hint": "Mencari tirta amerta pembersih di perairan laut suci."
        },
        {
          "q": "Patung raksasa ageng sane kaarak ri kala wengi Pengerupukan mawasta...",
          "options": [
            "Ogoh-ogoh 👹",
            "Barong",
            "Rangda",
            "Topeng"
          ],
          "answer": "Ogoh-ogoh 👹",
          "hint": "Karya seni patung bambu dan kertas kreasi pemuda banjar."
        }
      ],
      "activitiesEn": [
        {
          "q": "The holy destination for the Melasti ritual is the...",
          "options": [
            "Sea (beach) or lake 🌊",
            "Shopping mall",
            "Cinema",
            "Office"
          ],
          "answer": "Sea (beach) or lake 🌊",
          "hint": "Sacred waters for spiritual purification."
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/seni-rupa.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Seni Rupa Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Eksplorasi Visual Kreatif)
  // ================================================================
  
  const SENI_RUPA_DATA = {
    id: 'seni-rupa',
    title: 'Seni Rupa — Imajinasi, Warna, & Bentuk Kreatif',
    titleEn: 'Visual Arts — Imagination, Color, & Creative Shapes',
    subtitle: 'Ayo melukis garis berirama, mencampur warna pelangi, membuat kolase alam, dan membentuk karya 3D! 🎨',
    subtitleEn: 'Explore expressive lines, blend primary colors, build organic collages, and sculpt 3D artwork! 🎨',
    topics: [
      {
        id: 'sr-unsur-dasar',
        title: 'Unsur Seni Rupa: Titik, Garis, & Bidang',
        titleEn: 'Art Elements: Points, Lines, & Shapes',
        desc: 'Semua karya gambar berawal dari sebuah TITIK kecil. Ketika titik ditarik bergerak, jadilah GARIS (lurus, lengkung, bergelombang, zig-zag, spiral). Ketika ujung garis bertemu kembali, terbentuklah BIDANG datar yang indah!',
        descEn: 'Every great masterpiece begins with a tiny POINT. Connecting points creates dynamic LINES (straight, curvy, wavy, zig-zag, spiral). Closing lines together yields flat 2D SHAPES!',
        checklist: [
          'Misi 1: Buat 5 jenis garis berbeda (garis lurus, gelombang ombak, zig-zag petir, spiral obat nyamuk, dan putus-putus).',
          'Misi 2: Hubungkan 4 garis lurus sama panjang untuk membentuk bidang bujur sangkar.',
          'Misi 3: Coba gambar pohon rindang hanya menggunakan garis lengkung dan titik-titik dedaunan.'
        ],
        checklistEn: [
          'Mission 1: Draw 5 distinct line types (straight, ocean wave, lightning zig-zag, spiral, dashed).',
          'Mission 2: Connect four equal straight lines to create a square shape.',
          'Mission 3: Sketch a lush canopy tree using only curvy lines and dotted point leaves.'
        ],
        activities: [
          { q: 'Garis yang bentuknya naik turun tajam seperti kilatan petir disebut garis...', options: ['Zig-zag', 'Lengkung', 'Lurus mendatar', 'Lingkaran'], answer: 'Zig-zag', hint: 'Garis zig-zag bersudut lancip dan tegas ⚡' },
          { q: 'Unsur seni rupa paling awal dan paling sederhana adalah...', options: ['Titik', 'Warna', 'Ruang', 'Tekstur'], answer: 'Titik', hint: 'Titik adalah tanda terkecil tempat mulainya sebuah goresan pensil.' }
        ],
        activitiesEn: [
          { q: 'A sharp, angled back-and-forth line resembling lightning is called a...', options: ['Zig-zag line', 'Curvy line', 'Horizontal line', 'Circular line'], answer: 'Zig-zag line', hint: 'Zig-zags feature sharp points ⚡' }
        ]
      },
      {
        id: 'sr-lingkaran-warna',
        title: 'Lingkaran Warna: Primer & Sekunder',
        titleEn: 'Color Wheel: Primary & Secondary Colors',
        desc: 'Warna Primer adalah warna pokok murni yang tidak bisa dibuat dari warna lain: MERAH, KUNING, dan BIRU. Jika dicampur berpasangan, terciptalah Warna Sekunder: Merah + Kuning = JINGGA (Oranye), Kuning + Biru = HIJAU, Merah + Biru = UNGU!',
        descEn: 'Primary colors are pure foundational pigments: RED, YELLOW, and BLUE. Blending them pairs creates Secondary colors: Red + Yellow = ORANGE, Yellow + Blue = GREEN, Red + Blue = PURPLE!',
        checklist: [
          'Misi 1: Campurkan cat air / krayon kuning dan biru untuk membuktikan bahwa hasilnya menjadi hijau segar.',
          'Misi 2: Warnai gambar matahari terbenam dengan perpaduan warna jingga dan merah menyala.',
          'Misi 3: Sebutkan 3 warna primer dengan suara percaya diri di depan kelas atau keluarga.'
        ],
        checklistEn: [
          'Mission 1: Mix yellow and blue watercolor pigments to witness how lush green appears.',
          'Mission 2: Color a sunset scenery using radiant blends of orange and fiery red.',
          'Mission 3: Confidently name the three primary colors (Red, Yellow, Blue).'
        ],
        activities: [
          { q: 'Manakah yang termasuk kelompok 3 warna primer?', options: ['Merah, Kuning, Biru', 'Hijau, Ungu, Jingga', 'Hitam, Putih, Abu-abu', 'Cokelat, Merah muda, Emas'], answer: 'Merah, Kuning, Biru', hint: 'Tiga warna pokok dasar yang menjadi asal mula warna lainnya 🎨' },
          { q: 'Jika warna MERAH dicampur dengan warna KUNING, akan menghasilkan warna...', options: ['Jingga (Oranye)', 'Hijau', 'Ungu', 'Cokelat'], answer: 'Jingga (Oranye)', hint: 'Warna hangat seperti buah jeruk matang 🍊' },
          { q: 'Warna HIJAU daun dihasilkan dari percampuran warna...', options: ['Kuning dan Biru', 'Merah dan Biru', 'Merah dan Kuning', 'Putih dan Hitam'], answer: 'Kuning dan Biru', hint: 'Campuran warna cerah sinar matahari (kuning) dan langit (biru).' }
        ],
        activitiesEn: [
          { q: 'Which trio constitutes the primary colors?', options: ['Red, Yellow, Blue', 'Green, Purple, Orange', 'Black, White, Gray', 'Brown, Pink, Gold'], answer: 'Red, Yellow, Blue', hint: 'The fundamental root colors 🎨' }
        ]
      },
      {
        id: 'sr-kolase-mozaik',
        title: 'Karya Kolase & Mozaik dari Bahan Alam',
        titleEn: 'Collage & Mosaic with Natural Materials',
        desc: 'Kolase adalah teknik menempel berbagai macam bahan (daun kering, ranting kecil, biji jagung, cangkang telur) pada bidang gambar. Mozaik menempel kepingan bahan sejenis yang disusun rapi membentuk pola indah. Keduanya melatih motorik halus dan cinta lingkungan!',
        descEn: 'Collage involves pasting varied textured materials (dry leaves, twigs, corn seeds, eggshells) onto canvas. Mosaic places uniform small pieces neatly into patterned artworks, nurturing fine motor dexterity!',
        checklist: [
          'Misi 1: Kumpulkan 5 helai daun kering yang gugur di halaman dengan beragam ukuran.',
          'Misi 2: Buat bentuk ikan atau kura-kura dari susunan daun kering yang ditempel dengan lem.',
          'Misi 3: Beri bingkai sederhana pada karya kolasemu dan pajang di meja belajar.'
        ],
        checklistEn: [
          'Mission 1: Collect 5 fallen dry leaves of different shapes and textures from the garden.',
          'Mission 2: Paste the dried leaves to shape a fish or tortoise on heavy paper.',
          'Mission 3: Add a colorful paper frame and display your finished collage on your desk.'
        ],
        activities: [
          { q: 'Karya seni rupa yang dibuat dengan menempelkan berbagai bahan alam pada gambar disebut...', options: ['Kolase', 'Patung', 'Seni Grafis', 'Pahat'], answer: 'Kolase', hint: 'Teknik tempel bahan alami seperti daun, biji, dan kertas.' },
          { q: 'Bahan alam manakah di sekitar rumah yang bisa dipakai untuk membuat kolase?', options: ['Daun kering dan biji-bijian', 'Limbah plastik kotor', 'Batu bata berat', 'Kaca tajam berbahaya'], answer: 'Daun kering dan biji-bijian', hint: 'Pilihlah bahan alami yang aman, bersih, dan ramah lingkungan 🍂' }
        ],
        activitiesEn: [
          { q: 'The art technique of pasting organic items like dried leaves and seeds is called...', options: ['Collage', 'Sculpture', 'Lithography', 'Etching'], answer: 'Collage', hint: 'Collage assembles pasted mixed textures.' }
        ]
      },
      {
        id: 'sr-geometris-organis',
        title: 'Bentuk Geometris vs Bentuk Organis',
        titleEn: 'Geometric Shapes vs Organic Nature Forms',
        desc: 'Bentuk GEOMETRIS adalah bentuk teratur yang diukur matematis: persegi, lingkaran, segitiga, trapesium. Bentuk ORGANIS adalah bentuk alami yang mengalir bebas tanpa batas lurus, seperti bentuk awan di langit, tetesan air, daun monstera, dan kontur batu karang!',
        descEn: 'GEOMETRIC shapes have precise regular measurements: squares, circles, triangles. ORGANIC shapes flow freely without rigid boundaries, echoing clouds, water droplets, and jungle foliage!',
        checklist: [
          'Misi 1: Gambar sebuah rumah yang tersusun dari gabungan bentuk geometris (atap segitiga, dinding kotak, jendela bundar).',
          'Misi 2: Gambar bentuk organis tetesan air hujan 💧 dan awan bergelombang ☁️ di buku gambarmu.',
          'Misi 3: Warnai gambar tersebut dengan gradasi warna muda ke tua.'
        ],
        checklistEn: [
          'Mission 1: Sketch a friendly house using geometric shapes (triangle roof, square walls, circular window).',
          'Mission 2: Draw organic water droplets 💧 and billowing cumulus clouds ☁️.',
          'Mission 3: Blend shading from light tints to deep hues using colored pencils.'
        ],
        activities: [
          { q: 'Manakah di bawah ini yang merupakan contoh bentuk organis dari alam?', options: ['Bentuk awan di langit dan daun pohon', 'Bentuk kubus dan segitiga sama sisi', 'Bentuk balok penggaris', 'Bentuk meja persegi panjang'], answer: 'Bentuk awan di langit dan daun pohon', hint: 'Bentuk organis mengalir bebas dan tidak kaku seperti alam semesta.' },
          { q: 'Roda sepeda dan uang koin memiliki bentuk dasar geometris...', options: ['Lingkaran', 'Persegi', 'Segitiga', 'Trapesium'], answer: 'Lingkaran', hint: 'Bentuk bulat tanpa sudut ⭕' }
        ],
        activitiesEn: [
          { q: 'Which of the following is an organic form found in nature?', options: ['Clouds and tree leaves', 'Cubes and equilateral triangles', 'Plastic rulers', 'Square tiles'], answer: 'Clouds and tree leaves', hint: 'Organic shapes are fluid and non-geometric.' }
        ]
      },
      {
        id: 'sr-batik-motif',
        title: 'Mengenal Ragam Hias Motif Batik Nusantara',
        titleEn: 'Indonesian Batik Patterns & Cultural Motifs',
        desc: 'Batik adalah mahakarya warisan budaya dunia Indonesia (UNESCO). Tiap daerah punya motif khas penuh doa: Motif Kawung (bulat lonjong seperti buah kolang-kaling melambangkan kesucian hati), Mega Mendung Cirebon (awan bertingkat pembawa kesejukan), dan Parang (ombak samudra pantang menyerah)!',
        descEn: 'Batik is an internationally recognized Indonesian cultural treasure (UNESCO). Renowned motifs include Kawung (purity of heart), Mega Mendung (cooling cloud horizons), and Parang (resilience like ocean waves)!',
        checklist: [
          'Misi 1: Amati pakaian batik yang ada di rumahmu, lalu perhatikan motif polanya yang berulang.',
          'Misi 2: Rancang motif batik Kawung sederhana di atas kertas kotak berpetak.',
          'Misi 3: Warnai motif rancanganmu dengan kombinasi warna cokelat soga dan krem.'
        ],
        checklistEn: [
          'Mission 1: Inspect a piece of batik clothing at home and observe its repeating motifs.',
          'Mission 2: Draft a simplified Kawung motif layout on grid paper.',
          'Mission 3: Color your pattern with traditional earth tones of soga brown and warm cream.'
        ],
        activities: [
          { q: 'Motif batik Mega Mendung yang berbentuk gumpalan awan bertingkat berasal dari daerah...', options: ['Cirebon', 'Yogyakarta', 'Solo', 'Papua'], answer: 'Cirebon', hint: 'Cirebon di pesisir utara Jawa Barat terkenal dengan Mega Mendung ☁️' },
          { q: 'Batik telah diakui oleh badan dunia PBB sebagai Warisan Budaya Dunia asli milik bangsa...', options: ['Indonesia', 'Inggris', 'Jepang', 'Australia'], answer: 'Indonesia', hint: 'Ditetapkan oleh UNESCO pada 2 Oktober 2009 🇮🇩' }
        ],
        activitiesEn: [
          { q: 'The iconic Mega Mendung layered cloud batik motif originates from...', options: ['Cirebon', 'Yogyakarta', 'Solo', 'Papua'], answer: 'Cirebon', hint: 'Cirebon on the northern coast of West Java ☁️' }
        ]
      },
      {
        id: 'sr-tiga-dimensi',
        title: 'Karya 3D: Berkreasi dengan Plastisin & Clay',
        titleEn: '3D Art: Sculpting with Modeling Clay & Playdough',
        desc: 'Karya seni rupa Tiga Dimensi (3D) memiliki panjang, lebar, dan tinggi (volume), sehingga bisa dilihat dan disentuh dari segala arah! Membentuk plastisin menjadi patung hewan kecil (kucing, kura-kura, burung) melatih kekuatan jari dan imajinasi spasial anak!',
        descEn: 'Three-Dimensional (3D) artwork possesses length, width, and depth (volume), allowing it to be viewed from all sides. Molding clay into miniature animals sharpens finger muscles and spatial creativity!',
        checklist: [
          'Misi 1: Remas dan bentuk bola plastisin menjadi bulat sempurna dengan kedua telapak tanganmu.',
          'Misi 2: Buat patung kura-kura mini lengkap dengan tempurung bertekstur dan empat kaki.',
          'Misi 3: Ceritakan kepada teman atau orang tua kisah tentang patung kura-kura yang kamu buat.'
        ],
        checklistEn: [
          'Mission 1: Knead and roll a ball of modeling clay between your palms until smooth.',
          'Mission 2: Sculpt a miniature tortoise complete with a patterned shell and four legs.',
          'Mission 3: Share a creative short story about your sculpted tortoise to family or peers.'
        ],
        activities: [
          { q: 'Ciri utama dari karya seni rupa tiga dimensi (3D) adalah...', options: ['Memiliki panjang, lebar, volume/tinggi, serta dapat dilihat dari segala sisi', 'Hanya bisa dilihat dari depan saja', 'Hanya memiliki warna hitam dan putih', 'Tidak bisa disentuh tangan'], answer: 'Memiliki panjang, lebar, volume/tinggi, serta dapat dilihat dari segala sisi', hint: 'Karya 3D memiliki ruang dan volume nyata seperti patung dan guci.' },
          { q: 'Bahan lunak buatan yang mudah dibentuk berulang kali dengan tangan untuk membuat miniatur patung adalah...', options: ['Plastisin / Clay', 'Batu kali keras', 'Kaca bening', 'Besi baja'], answer: 'Plastisin / Clay', hint: 'Lunak, warna-warni, dan aman dimainkan anak-anak.' }
        ],
        activitiesEn: [
          { q: 'What defines a three-dimensional (3D) artwork?', options: ['It possesses length, width, and volume/depth viewable from all angles', 'It is strictly flat', 'It has only one flat side', 'It cannot be touched'], answer: 'It possesses length, width, and volume/depth viewable from all angles', hint: '3D pieces occupy tangible spatial volume.' }
        ]
      }
  ,
      {
        id: 'sr-lempung-plastisin',
        title: 'Membentuk Lempung Lunak & Plastisin Warna-Warni',
        titleEn: 'Sculpting Colorful Clay & Soft Dough',
        desc: 'Bermain plastisin dan lempung lunak (clay) sangat menyenangkan! Jari-jemari kita belajar meremas, memilin menjadi silinder panjang seperti cacing, membulatkan seperti bakso, dan menekan pipih. Kita bisa membentuk miniatur buah jeruk, kura-kura mungil, atau mangkuk kecil buatan sendiri!',
        descEn: 'Shaping soft clay and playdough is pure sensory joy! Children practice rolling clay into smooth spheres, snake-like coils, and gentle slabs. We can sculpt miniature fruits, tiny friendly turtles, or adorable miniature cups with our own hands!',
        checklist: [
          "Misi 1: Pilin plastisin menjadi 5 bulatan kecil lalu susun berderet membentuk ulat lucu.",
          "Misi 2: Campur plastisin warna kuning dan biru sedikit demi sedikit, amati perubahan warnanya menjadi hijau!",
          "Misi 3: Letakkan hasil kreasi miniatur plastisinmu di atas tatakan karton dan tunjukkan kepada keluarga."
  ],
        checklistEn: [
          "Mission 1: Roll dough into 5 small balls and line them up to make an adorable caterpillar.",
          "Mission 2: Knead blue and yellow dough together and watch them transform magically into green!",
          "Mission 3: Display your clay sculpture on a small cardboard pedestal for your family to admire."
  ],
        activities: [
          {
                  "q": "Teknik meremas dan memutar plastisin di antara dua telapak tangan akan menghasilkan bentuk...",
                  "options": [
                          "Bulat (bola)",
                          "Segitiga",
                          "Garis lurus",
                          "Bintang"
                  ],
                  "answer": "Bulat (bola)",
                  "hint": "Seperti gerakan saat membuat bulatan adonan bakso."
          },
          {
                  "q": "Jika kita mencampurkan lempung warna merah dengan lempung warna kuning, akan menghasilkan warna baru yaitu...",
                  "options": [
                          "Oranye (Jingga)",
                          "Hijau",
                          "Ungu",
                          "Hitam"
                  ],
                  "answer": "Oranye (Jingga)",
                  "hint": "Warna hangat seperti buah jeruk 🍊"
          },
          {
                  "q": "Bahan plastisin atau clay memiliki sifat...",
                  "options": [
                          "Lunak dan mudah dibentuk",
                          "Keras seperti batu",
                          "Cair seperti air",
                          "Tajam"
                  ],
                  "answer": "Lunak dan mudah dibentuk",
                  "hint": "Bisa ditekan dan ditarik sesuka hati tanpa patah."
          }
  ],
        activitiesEn: [
          {
                  "q": "Rolling dough between both palms creates a smooth...",
                  "options": [
                          "Sphere (round ball)",
                          "Sharp triangle",
                          "Flat paper",
                          "Box"
                  ],
                  "answer": "Sphere (round ball)",
                  "hint": "Like rolling a tiny bouncy ball."
          }
  ]
      },
      {
        id: 'sr-cap-cetak-alami',
        title: 'Seni Cap Cetak dari Bahan Alam & Pelepah Pisang',
        titleEn: 'Natural Printmaking with Banana Stems & Leaves',
        desc: 'Alam di sekitar kita menyediakan kuas dan cetakan yang unik! Potongan pelepah pisang memiliki pori-pori seperti bunga mawar. Potongan belimbing menghasilkan cetakan bintang emas. Daun yang berurat tegas menghasilkan tekstur guratan daun yang memesona jika diolesi cat air lalu dicapkan ke kertas putih.',
        descEn: 'Mother Nature provides extraordinary organic stamps! Sliced banana stems reveal rose-like petal pores. Starfruit slices create shimmering golden stars. Veined leaves produce intricate forest textures when pressed onto art paper with watercolors.',
        checklist: [
          "Misi 1: Carilah sehelai daun kering yang urat daunnya menonjol di halaman rumah.",
          "Misi 2: Oleskan cat air tipis-tipis pada permukaan urat daun, lalu tekan secara perlahan di kertas putih.",
          "Misi 3: Buat pola berulang dari cap pelepah pisang membentuk taman bunga yang mekar indah."
  ],
        checklistEn: [
          "Mission 1: Find a fallen leaf with prominent veins in the garden.",
          "Mission 2: Brush watercolor lightly across the leaf veins and press gently onto drawing paper.",
          "Mission 3: Stamp repeated banana stem prints to compose an enchanting blooming meadow."
  ],
        activities: [
          {
                  "q": "Potongan melintang buah belimbing yang dicapkan pada kertas gambar akan menghasilkan bentuk...",
                  "options": [
                          "Bintang ⭐",
                          "Lingkaran ⚪",
                          "Segitiga 🔺",
                          "Garis lurus ➖"
                  ],
                  "answer": "Bintang ⭐",
                  "hint": "Buah belimbing memiliki 5 sayap runcing seperti bintang."
          },
          {
                  "q": "Saat mencetak cap daun dengan cat air, cat yang dioleskan sebaiknya...",
                  "options": [
                          "Pas dan tidak terlalu basah/berlebihan",
                          "Sangat tebal sampai banjir",
                          "Kering total tanpa air",
                          "Minyak goreng"
                  ],
                  "answer": "Pas dan tidak terlalu basah/berlebihan",
                  "hint": "Cat yang pas membuat guratan urat daun tercetak jelas dan rapi."
          },
          {
                  "q": "Bahan alam yang dapat digunakan untuk membuat karya seni cetak cap adalah...",
                  "options": [
                          "Pelepah pisang, daun, dan kentang",
                          "Kaca tajam",
                          "Batu bata kasar",
                          "Paku besi"
                  ],
                  "answer": "Pelepah pisang, daun, dan kentang",
                  "hint": "Bahan alami yang lunak, aman, dan bertekstur indah."
          }
  ],
        activitiesEn: [
          {
                  "q": "A cross-section slice of starfruit stamped on paper creates a shape of a...",
                  "options": [
                          "Star ⭐",
                          "Square",
                          "Circle",
                          "Triangle"
                  ],
                  "answer": "Star ⭐",
                  "hint": "Starfruit features 5 distinct ridges."
          }
  ]
      },
      {
        "id": "seni-origami-kertas",
      "title": "Seni Melipat Kertas (Origami Ceria: Perahu & Burung)",
      "titleEn": "Paper Folding Art (Origami: Boats & Birds)",
      "desc": "Melipat kertas adalah seni tradisional yang mengasah ketelitian tangan dan koordinasi mata. Dari selembar kertas persegi warna-warni, kita bisa membuat perahu layar yang bisa mengapung, kodok yang bisa melompat, atau burung bangau yang cantik!",
      "descEn": "Origami sharpens fine-motor precision and spatial thinking. Transform a single colorful square sheet into a floating sailboat, a leaping frog, or an elegant swan without using scissors or glue!",
      "checklist": [
        "Misi 1: Lipat perahu kertas sederhana lalu uji apakah bisa terapung di mangkuk air.",
        "Misi 2: Buat lipatan kepala anjing atau kucing lucu dan beri mata dengan spidol hitam.",
        "Misi 3: Pastikan setiap garis lipatan ditekan rapi dengan ujung kuku agar bentuknya simetris."
      ],
      "checklistEn": [
        "Mission 1: Fold a simple paper sailboat and test if it floats in a bowl of water.",
        "Mission 2: Craft a cute origami cat/dog face and draw whiskers with a marker.",
        "Mission 3: Crease every fold crisply with your fingernail for symmetrical perfection."
      ],
      "activities": [
        {
          "q": "Bentuk kertas dasar yang paling sering dipakai dalam seni melipat origami adalah...",
          "options": [
            "Persegi / bujur sangkar sama sisi 🟧",
            "Lingkaran bundar",
            "Bintang",
            "Garis lurus"
          ],
          "answer": "Persegi / bujur sangkar sama sisi 🟧",
          "hint": "Kertas origami memiliki keempat sisi yang sama panjang."
        },
        {
          "q": "Keterampilan yang dilatih saat melipat kertas origami adalah...",
          "options": [
            "Ketelitian, kesabaran, dan motorik halus tangan",
            "Berlari cepat",
            "Bicara keras",
            "Menendang bola"
          ],
          "answer": "Ketelitian, kesabaran, dan motorik halus tangan",
          "hint": "Jari jemari menjadi terampil, luwes, dan sabar menekuk kertas."
        }
      ],
      "activitiesEn": [
        {
          "q": "The most common paper shape used in origami is...",
          "options": [
            "Square with equal sides 🟧",
            "Circle",
            "Triangle",
            "Wavy strip"
          ],
          "answer": "Square with equal sides 🟧",
          "hint": "Four identical sides and corners."
        }
      ]
    },
    {
      "id": "seni-apresiasi-karya",
      "title": "Apresiasi Karya Seni: Memamerkan Gambar Sendiri",
      "titleEn": "Art Appreciation: Exhibiting & Presenting Artwork",
      "desc": "Setiap goresan gambar anak-anak memiliki cerita dan keunikan tersendiri. Menjelaskan gambar sendiri di depan teman melatih rasa percaya diri. Menghargai karya teman dengan kata-kata pujian yang baik menumbuhkan rasa persahabatan!",
      "descEn": "Every artwork is an authentic expression of imagination. Presenting your own drawing in front of friends fosters pride, while offering genuine compliments to classmates nurtures warm artistic fellowship!",
      "checklist": [
        "Misi 1: Pilih 1 gambar terbaik buatanmu dan ceritakan maknanya kepada Ayah atau Ibu.",
        "Misi 2: Berikan 1 kata pujian tulus (\"Gambarmu indah sekali warnanya!\") kepada teman sekelas.",
        "Misi 3: Buat bingkai tepi sederhana dari kertas karton untuk memajang karyamu di dinding kamar."
      ],
      "checklistEn": [
        "Mission 1: Select your best drawing and explain its story proudly to your parents.",
        "Mission 2: Give a sincere compliment to a classmate's artwork.",
        "Mission 3: Craft a simple border frame out of cardboard to display on your bedroom wall."
      ],
      "activities": [
        {
          "q": "Sikap yang baik ketika teman sedang memamerkan hasil gambarnya adalah...",
          "options": [
            "Mendengarkan dengan ramah dan memberi tepuk tangan apresiasi",
            "Mengejek gambarnya jelek",
            "Mengabaikan sambil bermain sendiri",
            "Merobek gambarnya"
          ],
          "answer": "Mendengarkan dengan ramah dan memberi tepuk tangan apresiasi",
          "hint": "Saling menghargai membuat semua anak makin semangat berkarya! 👏"
        },
        {
          "q": "Kumpulan hasil karya seni dan lembar tugas siswa yang disimpan rapi disebut...",
          "options": [
            "Portofolio karya seni",
            "Koran bekas",
            "Katalog belanja",
            "Buku telepon"
          ],
          "answer": "Portofolio karya seni",
          "hint": "Koleksi dokumentasi kemajuan belajar anak dari awal hingga akhir semester."
        }
      ],
      "activitiesEn": [
        {
          "q": "How should we react when a friend exhibits their artwork?",
          "options": [
            "Listen warmly and applaud enthusiastically 👏",
            "Tease them meanly",
            "Rip their paper",
            "Look away"
          ],
          "answer": "Listen warmly and applaud enthusiastically 👏",
          "hint": "Kind encouragement inspires everyone!"
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/pjok.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · PJOK Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Kebugaran Jasmani Anak)
  // ================================================================
  
  const PJOK_DATA = {
    id: 'pjok',
    title: 'PJOK — Tubuh Bugar, Jiwa Sehat, & Gerak Ceria',
    titleEn: 'Physical Education — Active Fitness & Vital Health',
    subtitle: 'Ayo bergerak lincah! Latih gerak lokomotor, senam irama, cuci tangan 6 langkah, dan gizi seimbang Isi Piringku! ⚽',
    subtitleEn: 'Stay vibrant and energetic! Master locomotor drills, rhythmic gymnastics, clean hygiene, and balanced nutrition! ⚽',
    topics: [
      {
        id: 'pjok-lokomotor',
        title: 'Gerak Dasar Lokomotor (Berpindah Tempat)',
        titleEn: 'Locomotor Skills (Traveling Movements)',
        desc: 'Gerak LOKOMOTOR adalah gerakan tubuh yang menyebabkan berpindah tempat dari satu titik ke titik lain. Contoh utamanya: BERJALAN santai, BERLARI kencang, MELOMPAT dengan tolakan dua kaki, dan MENCONGKANG (gallop) lincah seperti kuda berlari!',
        descEn: 'LOCOMOTOR movements transport your body across space from one spot to another. Core fundamentals include WALKING upright, RUNNING swiftly, JUMPING off two feet, and GALLOPING like a playful pony!',
        checklist: [
          'Misi 1: Praktikkan berjalan lurus di atas satu garis lantai sepanjang 5 meter dengan pandangan ke depan.',
          'Misi 2: Lakukan lari pelan (jogging) di tempat selama 30 detik untuk pemanasan.',
          'Misi 3: Lakukan 5 kali lompatan katak dengan mendarat mengeper menggunakan kedua lutut lentur.'
        ],
        checklistEn: [
          'Mission 1: Walk along a straight floor tape line for 5 meters keeping balanced posture.',
          'Mission 2: Jog gently in place for 30 seconds as a light aerobic warm-up.',
          'Mission 3: Perform 5 frog jumps landing softly with cushioned, bent knees.'
        ],
        activities: [
          { q: 'Gerakan tubuh yang membuat kita berpindah tempat disebut gerak...', options: ['Lokomotor', 'Non-lokomotor', 'Manipulatif', 'Statik'], answer: 'Lokomotor', hint: 'Lokomotor berarti bergerak berpindah posisi (contoh: berjalan dan berlari).' },
          { q: 'Saat berlari cepat, ayunan kedua tangan yang benar adalah...', options: ['Mengayun teratur ke depan dan ke belakang berlawanan arah langkah kaki', 'Diam di samping pinggang', 'Diangkat lurus ke atas kepala', 'Dimasukkan ke dalam saku celana'], answer: 'Mengayun teratur ke depan dan ke belakang berlawanan arah langkah kaki', hint: 'Ayunan lengan seirama membantu keseimbangan dan menambah dorongan lari.' }
        ],
        activitiesEn: [
          { q: 'Body movements that transport you across from one location to another are called...', options: ['Locomotor', 'Non-locomotor', 'Manipulative', 'Static'], answer: 'Locomotor', hint: 'Walking and running travel through space.' }
        ]
      },
      {
        id: 'pjok-non-lokomotor',
        title: 'Gerak Dasar Non-Lokomotor (Tanpa Berpindah)',
        titleEn: 'Non-Locomotor Skills (Stationary Movements)',
        desc: 'Gerak NON-LOKOMOTOR adalah gerakan tubuh yang dilakukan di tempat tanpa berpindah posisi. Contoh: MEMBUNGKUK menyentuh ujung sepatu, MELIUKKAN badan ke kanan dan kiri, MEMUTAR pinggang, serta MENGAYUN lengan untuk peregangan otot agar lentur dan terhindar dari cedera!',
        descEn: 'NON-LOCOMOTOR movements are performed right in place without moving from your base. Core examples include BENDING down to toes, SWAYING side to side, TWISTING the torso, and STRETCHING limbs to prevent cramps!',
        checklist: [
          'Misi 1: Berdiri tegak, bungkukkan badan perlahan dan sentuh ujung jari kaki tanpa menekuk lutut selama 8 hitungan.',
          'Misi 2: Rentangkan kedua tangan ke samping dan liukkan badan ke kiri dan kanan seperti pohon tertiup angin.',
          'Misi 3: Putar kedua pergelangan tangan dan bahu ke arah depan dan belakang sebanyak 8 putaran.'
        ],
        checklistEn: [
          'Mission 1: Stand tall, hinge forward slowly to touch toes without bending knees for 8 counts.',
          'Mission 2: Stretch arms wide and sway torso side to side like a palm tree in gentle breeze.',
          'Mission 3: Roll wrists and shoulders forward and backward smoothly for 8 rotations.'
        ],
        activities: [
          { q: 'Manakah di bawah ini yang merupakan contoh gerak non-lokomotor?', options: ['Meliukkan badan ke samping di tempat', 'Berlari mengelilingi lapangan', 'Melompat melewati rintangan kardus', 'Berenang menyeberangi kolam'], answer: 'Meliukkan badan ke samping di tempat', hint: 'Non-lokomotor dilakukan diam di tempat tanpa melangkah berpindah.' },
          { q: 'Apa manfaat melakukan gerakan peregangan otot sebelum berolahraga?', options: ['Mencegah cedera otot dan membuat tubuh lebih lentur', 'Membuat tubuh cepat lelah', 'Menurunkan detak jantung mendadak', 'Agar bisa tidur saat olahraga'], answer: 'Mencegah cedera otot dan membuat tubuh lebih lentur', hint: 'Peregangan menyiapkan otot dan sendi agar siap bergerak aktif.' }
        ],
        activitiesEn: [
          { q: 'Which of the following is an example of stationary non-locomotor movement?', options: ['Swaying torso sideways in place', 'Sprinting across field', 'Jumping hurdles', 'Swimming across pool'], answer: 'Swaying torso sideways in place', hint: 'Non-locomotor stays rooted in one place.' }
        ]
      },
      {
        id: 'pjok-manipulatif',
        title: 'Gerak Dasar Manipulatif (Menggunakan Alat)',
        titleEn: 'Manipulative Skills (Ball & Object Control)',
        desc: 'Gerak MANIPULATIF melibatkan penguasaan anggota tubuh terhadap suatu benda atau alat olahraga (seperti bola atau raket). Keterampilan dasarnya: MELEMPAR bola ke sasaran, MENANGKAP bola dengan kedua tangan lentur, MENENDANG bola ke gawang, dan MENGGIRING bola!',
        descEn: 'MANIPULATIVE movements develop coordination when interacting with equipment like balls and racquets. Fundamental drills include THROWING accurately, CATCHING with soft hands, KICKING toward targets, and DRIBBLING smoothly!',
        checklist: [
          'Misi 1: Lempar bola plastik kecil ke atas dan tangkap kembali dengan kedua tangan sebanyak 5 kali tanpa jatuh.',
          'Misi 2: Tendang bola pelan ke arah sasaran botol plastik dari jarak 3 meter.',
          'Misi 3: Giring bola dengan kaki bagian dalam melewati 3 rintangan kerucut/botol.'
        ],
        checklistEn: [
          'Mission 1: Toss a small ball upwards and catch it with both hands 5 times without dropping.',
          'Mission 2: Kick a ball gently towards a plastic bottle target from a 3-meter distance.',
          'Mission 3: Dribble a soccer ball using the inside of your foot around 3 cones.'
        ],
        activities: [
          { q: 'Menendang, melempar, dan menangkap bola termasuk ke dalam kelompok gerak...', options: ['Manipulatif', 'Lokomotor', 'Non-lokomotor', 'Non-aktif'], answer: 'Manipulatif', hint: 'Manipulatif menggunakan benda atau objek luar sebagai alat olahraga 🎾' },
          { q: 'Saat hendak menangkap bola lemparan dari teman, posisi kedua telapak tangan yang benar adalah...', options: ['Terbuka membentuk mangkuk menghadap ke arah datangnya bola', 'Mengepal kaku ke bawah', 'Disilangkan di belakang punggung', 'Menutup kedua mata'], answer: 'Terbuka membentuk mangkuk menghadap ke arah datangnya bola', hint: 'Jari-jari lentur siap meredam benturan bola.' }
        ],
        activitiesEn: [
          { q: 'Kicking, tossing, and catching a ball belong to which category of movement skills?', options: ['Manipulative', 'Locomotor', 'Non-locomotor', 'Static'], answer: 'Manipulative', hint: 'Involves handling external sport gear or balls 🎾' }
        ]
      },
      {
        id: 'pjok-senam-irama',
        title: 'Aktivitas Senam Irama / Ritmik Ceria',
        titleEn: 'Rhythmic Gymnastics & Musical Movement',
        desc: 'Senam Irama memadukan gerakan langkah kaki dan ayunan lengan yang selaras mengikuti irama ketukan musik atau hitungan ceria. Senam ini melatih koordinasi otak kiri dan kanan, kelenturan tubuh, rasa percaya diri, serta memupuk keceriaan bersama kawan!',
        descEn: 'Rhythmic gymnastics blends footwork and sweeping arm gestures synchronized to upbeat musical tempos. It builds bilateral brain coordination, cardiovascular endurance, and social joy!',
        checklist: [
          'Misi 1: Langkah kaki ke samping kanan dan kiri secara bergantian mengikuti ketukan musik 1-2-3-4.',
          'Misi 2: Ayunkan kedua lengan ke atas dan ke bawah seirama dengan langkah kakimu.',
          'Misi 3: Ajak saudaramu senam bersama di pagi hari selama 5 menit di teras rumah.'
        ],
        checklistEn: [
          'Mission 1: Step sideways right and left alternately matching a cheerful 1-2-3-4 music tempo.',
          'Mission 2: Swing both arms overhead and down in cadence with your footwork.',
          'Mission 3: Lead your family in a 5-minute sunny morning rhythmic exercise routine.'
        ],
        activities: [
          { q: 'Unsur terpenting yang memandu gerakan pada senam irama adalah...', options: ['Ketukan irama musik atau tempo hitungan', 'Berat beban alat', 'Kecepatan lari kencang', 'Ketinggian lompatan'], answer: 'Ketukan irama musik atau tempo hitungan', hint: 'Gerakan harus selaras dan kompak dengan ritme musik 🎶' },
          { q: 'Senam irama yang dilakukan bersama teman-teman sekelas melatih rasa...', options: ['Kekompakan dan kebersamaan', 'Egois ingin menang sendiri', 'Rasa malas bergerak', 'Kecurigaan'], answer: 'Kekompakan dan kebersamaan', hint: 'Senam bersama menumbuhkan harmoni dan persahabatan.' }
        ],
        activitiesEn: [
          { q: 'What is the most crucial pacing element in rhythmic aerobic exercise?', options: ['Musical rhythm and count tempo', 'Heavy barbell weight', 'Max sprint speed', 'Jump height'], answer: 'Musical rhythm and count tempo', hint: 'Movement syncs with the musical beat 🎶' }
        ]
      },
      {
        id: 'pjok-kebersihan-diri',
        title: 'Menjaga Kebersihan Diri & Cuci Tangan 6 Langkah',
        titleEn: 'Personal Hygiene & 6-Step Handwashing',
        desc: 'Tubuh yang sehat berawal dari kebersihan diri: Mandi 2 kali sehari memakai sabun, sikat gigi pagi setelah sarapan dan malam sebelum tidur, serta memotong kuku kotor. Cuci tangan 6 langkah memakai sabun dan air mengalir selama 20 detik membasmi kuman dan virus penyakit!',
        descEn: 'Vibrant health blooms from clean hygiene habits: Showering twice daily, brushing teeth morning and night, and clipping fingernails. Proper 6-step handwashing with soap for 20 seconds eliminates germs!',
        checklist: [
          'Misi 1: Praktikkan 6 langkah cuci tangan pakai sabun (telapak, punggung tangan, sela jari, kunci jari, putar ibu jari, dan ujung kuku).',
          'Misi 2: Sikat gigimu secara menyeluruh dengan pasta gigi berfluoride sebelum tidur malam ini.',
          'Misi 3: Periksa kuku jari tanganmu; jika sudah panjang dan hitam, mintalah bantuan orang tua untuk memotongnya rapi.'
        ],
        checklistEn: [
          'Mission 1: Demonstrate the 6 handwashing steps using soap under flowing water for 20 seconds.',
          'Mission 2: Brush your teeth thoroughly with circular strokes before bedtime tonight.',
          'Mission 3: Check fingernails; trim them clean with parental assistance if overgrown.'
        ],
        activities: [
          { q: 'Berapa durasi waktu minimal yang disarankan dokter saat mencuci tangan pakai sabun?', options: ['20 detik', '2 detik', '1 menit tanpa henti', 'Hanya celup air saja'], answer: '20 detik', hint: 'Cukup untuk menyanyikan lagu "Selamat Ulang Tahun" 2 kali 🧼' },
          { q: 'Kapan waktu yang paling tepat untuk menyikat gigi agar terhindar dari gigi berlubang?', options: ['Pagi setelah sarapan dan malam sebelum tidur', 'Hanya seminggu sekali', 'Hanya saat sakit gigi', 'Tengah malam saat tidur'], answer: 'Pagi setelah sarapan dan malam sebelum tidur', hint: 'Membersihkan sisa makanan agar kuman tidak merusak lapisan gigi.' }
        ],
        activitiesEn: [
          { q: 'What is the recommended minimum duration for effective handwashing with soap?', options: ['20 seconds', '2 seconds', '10 minutes', 'Just a quick splash'], answer: '20 seconds', hint: 'Equal to singing the "Happy Birthday" song twice 🧼' }
        ]
      },
      {
        id: 'pjok-gizi-seimbang',
        title: 'Gizi Seimbang: Isi Piringku & Istirahat Cukup',
        titleEn: 'Balanced Nutrition (Isi Piringku) & Quality Sleep',
        desc: 'Prinsip "Isi Piringku" mengajarkan porsi gizi seimbang dalam satu piring makan: 1/3 Makanan Pokok (nasi/kentang/ubi), 1/3 Sayuran segar, 1/6 Lauk-pauk berprotein (ikan/telur/tahu), dan 1/6 Buah-buahan manis alami. Minum air putih 8 gelas sehari dan tidur 8-9 jam agar tubuh tumbuh optimal!',
        descEn: 'The "Isi Piringku" guide balances every plate: 1/3 Staple carbs (rice/potatoes), 1/3 Fresh greens & veggies, 1/6 Healthy protein (fish/eggs/tofu), and 1/6 Fresh fruit! Hydrate with 8 glasses of water and rest 8-9 hours every night!',
        checklist: [
          'Misi 1: Amati piring makan siangmu dan sebutkan mana sayuran serta lauk proteinnya.',
          'Misi 2: Minum minimal 6-8 gelas air putih bersih sepanjang hari hari ini.',
          'Misi 3: Tidur tepat waktu pukul 20.30 malam dan hindari menatap layar gadget sebelum tidur.'
        ],
        checklistEn: [
          'Mission 1: Examine your lunch plate and identify the vegetable and protein portions.',
          'Mission 2: Drink at least 6 to 8 cups of fresh pure water throughout the day.',
          'Mission 3: Go to sleep on schedule by 8:30 PM, putting aside screens for restful sleep.'
        ],
        activities: [
          { q: 'Dalam pedoman gizi seimbang "Isi Piringku", sumber energi makanan pokok contohnya adalah...', options: ['Nasi, jagung, dan ubi', 'Permen manis dan lolipop', 'Keripik asin pedas', 'Minuman soda bersoda'], answer: 'Nasi, jagung, dan ubi', hint: 'Karbohidrat kompleks yang memberikan tenaga belajar dan bermain 🍚' },
          { q: 'Berapa jam waktu tidur malam yang dianjurkan untuk anak usia sekolah dasar agar tumbuh tinggi dan cerdas?', options: ['8 sampai 9 jam', 'Hanya 2 jam', '15 jam seharian', 'Tidak perlu tidur'], answer: '8 sampai 9 jam', hint: 'Tidur cukup memulihkan stamina dan memicu hormon pertumbuhan.' }
        ],
        activitiesEn: [
          { q: 'In the balanced nutrition plate guide, which food serves as a healthy staple carbohydrate?', options: ['Steamed rice, corn, and sweet potato', 'Cotton candy and lollipops', 'Processed spicy crisps', 'Fizzy soda drinks'], answer: 'Steamed rice, corn, and sweet potato', hint: 'Wholesome carbohydrates fuel active play and study 🍚' }
        ]
      }
  ,
      {
        id: 'pjok-keseimbangan',
        title: 'Latihan Keseimbangan Tubuh: Sikap Bangau & Jinjit',
        titleEn: 'Body Balance Training: Crane Stand & Tip-Toe Walking',
        desc: 'Keseimbangan tubuh yang kuat mencegah kita mudah terjatuh saat berlari atau bermain. Ada keseimbangan diam (statis) seperti berdiri satu kaki meniru burung bangau dengan kedua tangan direntangkan. Ada pula keseimbangan bergerak (dinamis) seperti berjalan jinjit di atas garis lurus tanpa oleng!',
        descEn: 'A resilient sense of balance prevents falls during joyful games. Static balance involves holding poses like the graceful Crane Stand on one foot with arms outstretched. Dynamic balance involves walking tip-toe along a chalk line with poised composure!',
        checklist: [
          "Misi 1: Praktikkan sikap berdiri burung bangau (satu kaki ditekuk) selama 10 hitungan tanpa bergoyang.",
          "Misi 2: Berjalan jinjit di atas lantai lurus sejauh 3 meter dengan kedua tangan direntangkan ke samping.",
          "Misi 3: Lakukan gerakan menarik napas panjang dan hembuskan perlahan untuk mendinginkan tubuh."
  ],
        checklistEn: [
          "Mission 1: Hold the Crane Stand pose on one foot for 10 calm seconds without wobbling.",
          "Mission 2: Walk tip-toe along a straight floor tile seam for 3 meters with arms spread wide.",
          "Mission 3: Take deep relaxing breaths to cool down after balance exercises."
  ],
        activities: [
          {
                  "q": "Berdiri dengan satu kaki ditekuk dan kedua tangan direntangkan ke samping meniru gerakan...",
                  "options": [
                          "Burung Bangau",
                          "Katak melompat",
                          "Kuda berlari",
                          "Ikan berenang"
                  ],
                  "answer": "Burung Bangau",
                  "hint": "Burung anggun berkaki panjang yang sering berdiri tenang di tepi sawah."
          },
          {
                  "q": "Tujuan utama dari merentangkan kedua tangan saat berjalan di titian atau garis lurus adalah...",
                  "options": [
                          "Menjaga keseimbangan tubuh agar tidak oleng/jatuh",
                          "Mengejar layang-layang",
                          "Mendinginkan ketiak",
                          "Terbang ke awan"
                  ],
                  "answer": "Menjaga keseimbangan tubuh agar tidak oleng/jatuh",
                  "hint": "Tangan bertindak sebagai penyeimbang beban kiri dan kanan."
          },
          {
                  "q": "Latihan keseimbangan dilakukan di tempat yang...",
                  "options": [
                          "Aman, rata, dan tidak licin",
                          "Tangga yang curam",
                          "Lantai basah berlumut",
                          "Jalan raya ramai kendaraan"
                  ],
                  "answer": "Aman, rata, dan tidak licin",
                  "hint": "Keselamatan adalah hal paling utama saat berolahraga."
          }
  ],
        activitiesEn: [
          {
                  "q": "Standing poised on one foot with arms outstretched mimics the posture of a...",
                  "options": [
                          "Graceful Crane",
                          "Jumping frog",
                          "Galloping horse",
                          "Swimming fish"
                  ],
                  "answer": "Graceful Crane",
                  "hint": "A tall marsh bird known for steady balance."
          }
  ]
      },
      {
        id: 'pjok-makanan-sehat',
        title: 'Piring Makanku Sehat: Gizi Seimbang & Air Putih',
        titleEn: 'My Healthy Plate: Balanced Nutrition & Fresh Water',
        desc: 'Agar tubuh anak Kelas 1 SD tumbuh tinggi, cerdas, dan jarang sakit, kita perlu menyantap makanan bergizi seimbang! Panduan "Isi Piringku": sepertiga makanan pokok (nasi/kentang), sepertiga sayuran segar (bayam/wortel), dan sepertiganya lauk pauk (telur/ikan/tempe) plus buah manis, serta minum 6-8 gelas air putih setiap hari!',
        descEn: 'To grow energetic, clever, and robust, 1st graders enjoy balanced nutritious plates! The "Healthy Plate" guide: 1/3 whole grains, 1/3 crisp greens, and 1/3 protein (eggs/fish/tempeh) topped with juicy fruits and 6-8 glasses of fresh water daily!',
        checklist: [
          "Misi 1: Habiskan porsi sayur hijau (bayam, brokoli, atau wortel) saat makan siang hari ini.",
          "Misi 2: Bawa botol minum air putih ke sekolah dan minum secara teratur setelah berolahraga.",
          "Misi 3: Cuci tangan dengan sabun di air mengalir sebelum memegang makanan."
  ],
        checklistEn: [
          "Mission 1: Enjoy your portion of colorful vegetables with your lunch today.",
          "Mission 2: Carry a reusable water bottle to school and hydrate regularly during exercise.",
          "Mission 3: Wash hands thoroughly with soap under running water before every meal."
  ],
        activities: [
          {
                  "q": "Makanan yang kaya akan vitamin dan serat untuk kesehatan mata dan pencernaan adalah...",
                  "options": [
                          "Sayuran hijau dan buah-buahan segar",
                          "Permen manis dan chiki",
                          "Minuman soda bersoda",
                          "Gorengan minyak jelantah"
                  ],
                  "answer": "Sayuran hijau dan buah-buahan segar",
                  "hint": "Wortel, bayam, apel, dan pepaya menyehatkan tubuh."
          },
          {
                  "q": "Berapa gelas air putih yang disarankan diminum oleh anak setiap hari?",
                  "options": [
                          "6 sampai 8 gelas air putih",
                          "Hanya 1 sendok",
                          "100 gelas",
                          "Tidak perlu minum sama sekali"
                  ],
                  "answer": "6 sampai 8 gelas air putih",
                  "hint": "Tubuh kita membutuhkan air agar tidak lemas dan dehidrasi."
          },
          {
                  "q": "Sebelum makan, kita wajib mencuci tangan menggunakan...",
                  "options": [
                          "Sabun dan air bersih yang mengalir",
                          "Cukup dilap ke celana",
                          "Tisu kotor",
                          "Air kopi"
                  ],
                  "answer": "Sabun dan air bersih yang mengalir",
                  "hint": "Kuman dan bakteri di tangan mati oleh sabun."
          }
  ],
        activitiesEn: [
          {
                  "q": "Foods rich in vital vitamins and dietary fiber for strong health are...",
                  "options": [
                          "Fresh vegetables and juicy fruits",
                          "Sugary candies and soda",
                          "Greasy deep-fried chips",
                          "Ice pops only"
                  ],
                  "answer": "Fresh vegetables and juicy fruits",
                  "hint": "Natural garden produce nourishes our organs."
          }
  ]
      },
      {
        "id": "pjok-aktivitas-air",
      "title": "Pengenalan Aktivitas Air & Keselamatan Kolam",
      "titleEn": "Water Activities & Swimming Pool Safety",
      "desc": "Bermain air sangat menyenangkan dan menyegarkan tubuh! Namun kita harus selalu berhati-hati di sekitar kolam renang: jangan pernah berlari di tepi kolam yang licin, selalu didampingi orang tua/guru, lakukan pemanasan sebelum masuk air, dan belajar bernapas dengan teknik bubbling!",
      "descEn": "Splashing in water is delightful and healthy! However, pool safety is essential: never run on slippery wet decks, always swim under adult supervision, warm up properly, and practice blowing rhythmic bubbles!",
      "checklist": [
        "Misi 1: Hafalkan aturan penting kolam renang: berjalan hati-hati, tidak boleh berlari di lantai basah.",
        "Misi 2: Lakukan pemanasan peregangan tangan dan kaki selama 5 menit sebelum masuk air.",
        "Misi 3: Latihan meniup gelembung air (bubbling) di baskom atau kolam dangkal bersama orang tua."
      ],
      "checklistEn": [
        "Mission 1: Remember vital safety rules: walk cautiously, never run on wet pool decks.",
        "Mission 2: Perform 5 minutes of arm and leg stretching exercises before entering water.",
        "Mission 3: Practice blowing rhythmic water bubbles in shallow water with adult supervision."
      ],
      "activities": [
        {
          "q": "Mengapa dilarang berlari di lantai sekitar tepi kolam renang?",
          "options": [
            "Karena lantainya basah dan licin, rawan terpeleset jatuh",
            "Supaya tidak berkeringat",
            "Supaya kolamnya sepi",
            "Hanya larangan tanpa alasan"
          ],
          "answer": "Karena lantainya basah dan licin, rawan terpeleset jatuh",
          "hint": "Keselamatan nomor satu! Berjalanlah dengan tenang di area basah."
        },
        {
          "q": "Sebelum menceburkan diri ke dalam air kolam, kita wajib melakukan...",
          "options": [
            "Pemanasan dan peregangan otot",
            "Makan makanan berat",
            "Tidur terlentang",
            "Minum soda"
          ],
          "answer": "Pemanasan dan peregangan otot",
          "hint": "Pemanasan mencegah otot mengalami kram saat berenang."
        }
      ],
      "activitiesEn": [
        {
          "q": "Why is running prohibited near the swimming pool deck?",
          "options": [
            "The wet tiles are slippery and risky for falling",
            "To avoid sweating",
            "To keep it quiet",
            "No reason"
          ],
          "answer": "The wet tiles are slippery and risky for falling",
          "hint": "Safety first: always walk calmly on wet surfaces."
        }
      ]
    },
    {
      "id": "pjok-pola-tidur",
      "title": "Istirahat Cukup & Pola Tidur Sehat Anak Sekolah",
      "titleEn": "Adequate Rest & Healthy Sleep Habits for Schoolers",
      "desc": "Setelah seharian belajar dan berolahraga, tubuh kita membutuhkan istirahat untuk memulihkan energi dan tumbuh tinggi. Anak usia SD membutuhkan tidur nyenyak selama 9–10 jam setiap malam. Tidur tepat waktu membuat kita bangun segar, ceria, dan tidak mengantuk di kelas!",
      "descEn": "After a lively day of learning and sports, our body repairs tissues and grows taller during sleep. Primary schoolers need 9–10 hours of sound sleep each night. Early bedtime yields energized morning vigor!",
      "checklist": [
        "Misi 1: Pasang jam tidur malam teratur, maksimal pukul 20.30–21.00 sudah terlelap.",
        "Misi 2: Menggosok gigi dan mematikan gawai/layar ponsel minimal 30 menit sebelum tidur.",
        "Misi 3: Merapikan selimut dan bantal sendiri begitu bangun pagi dengan rasa syukur."
      ],
      "checklistEn": [
        "Mission 1: Set a regular bedtime schedule, falling asleep peacefully by 8:30–9:00 PM.",
        "Mission 2: Brush your teeth and turn off all digital screens 30 minutes before sleep.",
        "Mission 3: Make your bed and fold blankets independently upon waking up."
      ],
      "activities": [
        {
          "q": "Berapa jam durasi tidur malam yang ideal untuk anak usia SD Kelas 1?",
          "options": [
            "9 sampai 10 jam setiap malam",
            "Hanya 3 jam",
            "15 jam sepanjang hari",
            "1 jam saja"
          ],
          "answer": "9 sampai 10 jam setiap malam",
          "hint": "Tidur yang cukup membantu pertumbuhan tulang, otak, dan daya tahan tubuh."
        },
        {
          "q": "Akibat buruk jika sering begadang dan tidur larut malam adalah...",
          "options": [
            "Bangun kesiangan, tubuh lemas, dan sulit konsentrasi belajar",
            "Makin pintar",
            "Tubuh makin kuat",
            "Nilai selalu 100"
          ],
          "answer": "Bangun kesiangan, tubuh lemas, dan sulit konsentrasi belajar",
          "hint": "Kurang tidur membuat daya tangkap otak melambat dan mudah mengantuk."
        }
      ],
      "activitiesEn": [
        {
          "q": "Ideal night sleep duration for Grade 1 children is...",
          "options": [
            "9 to 10 hours every night",
            "3 hours",
            "15 hours non-stop",
            "1 hour"
          ],
          "answer": "9 to 10 hours every night",
          "hint": "Sleep fuels brain and body development."
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/agama.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Pendidikan Agama & Budi Pekerti Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Nilai Universal Kebaikan)
  // ================================================================
  
  const AGAMA_DATA = {
    id: 'agama',
    title: 'Pendidikan Agama — Budi Pekerti & Kasih Sayang Semesta',
    titleEn: 'Religious Education — Universal Ethics & Compassion',
    subtitle: 'Mari bersyukur atas ciptaan Tuhan, berbakti kepada orang tua, menyayangi satwa, dan rukun antarumat beragama! 🙏',
    subtitleEn: 'Cultivate gratitude for divine creation, honor parents, show empathy to animals, and foster interfaith harmony! 🙏',
    topics: [
      {
        id: 'ag-bersyukur',
        title: 'Bersyukur Atas Ciptaan Tuhan Yang Maha Esa',
        titleEn: 'Gratitude for the Wonders of Creation',
        desc: 'Tuhan Yang Maha Esa menciptakan alam semesta yang indah: matahari yang menghangatkan bumi, udara bersih untuk bernapas, air jernih untuk minum, serta tubuh yang sehat dan sempurna. Rasa syukur diwujudkan dengan menjaga kesehatan, beribadah rajin, dan memelihara alam sekitar!',
        descEn: 'God created the majestic cosmos: warming sunlight, fresh air to breathe, crystalline water, and healthy human bodies. We honor creation through heartfelt prayers, joyful gratitude, and caring for nature!',
        checklist: [
          'Misi 1: Ucapkan doa syukur saat bangun di pagi hari atas nafas dan hari baru yang cerah.',
          'Misi 2: Sebutkan 3 ciptaan Tuhan yang paling kamu kagumi saat melihat pemandangan alam (misal: gunung, laut, burung).',
          'Misi 3: Matikan keran air setelah digunakan agar tidak membuang-buang berkah air bersih.'
        ],
        checklistEn: [
          'Mission 1: Say a morning prayer of gratitude for a fresh healthy day upon waking.',
          'Mission 2: Name 3 creations of nature that inspire your awe (e.g. mountains, ocean, colorful birds).',
          'Mission 3: Turn off the water tap tightly after use to conserve precious natural water.'
        ],
        activities: [
          { q: 'Cara terbaik menunjukkan rasa syukur atas nikmat tubuh yang sehat adalah...', options: ['Menjaga kesehatan dengan makan teratur dan berolahraga', 'Malas mandi dan makan sembarangan', 'Begadang main game sampai larut', 'Mengeluh setiap hari'], answer: 'Menjaga kesehatan dengan makan teratur dan berolahraga', hint: 'Merawat tubuh adalah amanah dan ungkapan terima kasih kepada Tuhan.' },
          { q: 'Matahari terbit di timur memberikan kehangatan dan vitamin D. Matahari adalah ciptaan...', options: ['Tuhan Yang Maha Kuasa', 'Pabrik manusia', 'Robot antariksa', 'Komputer canggih'], answer: 'Tuhan Yang Maha Kuasa', hint: 'Seluruh tata surya dan benda langit diciptakan oleh Tuhan Yang Maha Esa ☀️' }
        ],
        activitiesEn: [
          { q: 'What is the most sincere way to show gratitude for a healthy body?', options: ['Caring for physical health with nutritious meals and active exercise', 'Neglecting hygiene and skipping meals', 'Staying up all night gaming', 'Complaining constantly'], answer: 'Caring for physical health with nutritious meals and active exercise', hint: 'Treating your body kindly honors divine creation.' }
        ]
      },
      {
        id: 'ag-budi-pekerti',
        title: 'Budi Pekerti: Kasih Sayang Kepada Orang Tua & Guru',
        titleEn: 'Noble Character: Devotion to Parents & Teachers',
        desc: 'Ayah dan ibu telah merawat kita dengan penuh kasih sayang sejak bayi. Guru mendidik dan mengajarkan kita ilmu pengetahuan dengan sabar. Berbakti kepada orang tua dan guru dilakukan dengan bertutur kata santun, mendengarkan nasehat baik, dan tidak membantah dengan kasar!',
        descEn: 'Parents nurture us with unconditional love from infancy. Teachers patiently illuminate our minds with wisdom. We honor them through polite words, heedful obedience to wholesome advice, and respectful helpfulness!',
        checklist: [
          'Misi 1: Ucapkan terima kasih dan peluk ayah atau ibumu hari ini dengan tulus.',
          'Misi 2: Dengarkan nasehat guru di kelas tanpa memotong pembicaraan dengan gaduh.',
          'Misi 3: Cium tangan orang tua dengan takzim saat berpamitan berangkat ke sekolah.'
        ],
        checklistEn: [
          'Mission 1: Hug and say a sincere "Thank you, Mom and Dad" for their ceaseless love.',
          'Mission 2: Listen attentively to teacher instructions without disruptive talking.',
          'Mission 3: Show customary warm respect when bidding farewell before departing for school.'
        ],
        activities: [
          { q: 'Saat orang tua atau guru sedang menasehati kita demi kebaikan, sikap yang santun adalah...', options: ['Mendengarkan dengan tenang dan penuh rasa hormat', 'Membantah sambil berteriak', 'Menutup telinga dan lari', 'Mengejek nasehatnya'], answer: 'Mendengarkan dengan tenang dan penuh rasa hormat', hint: 'Mendengarkan dengan hormat adalah tanda anak berbakti dan berbudi luhur.' },
          { q: 'Bagaimana cara berbakti kepada orang tua saat di rumah?', options: ['Membantu merapikan rumah dan berbicara dengan nada lembut', 'Meminta uang jajan berlebihan', 'Membuat rumah berantakan', 'Malas belajar'], answer: 'Membantu merapikan rumah dan berbicara dengan nada lembut', hint: 'Membantu meringankan beban orang tua mendatangkan keberkahan.' }
        ],
        activitiesEn: [
          { q: 'When parents or teachers provide thoughtful advice, how should a well-mannered student respond?', options: ['Listen respectfully and calmly', 'Shout back angrily', 'Plug ears and storm out', 'Mock the guidance'], answer: 'Listen respectfully and calmly', hint: 'Respectful listening embodies noble character.' }
        ]
      },
      {
        id: 'ag-sayang-makhluk',
        title: 'Menyayangi Makhluk Hidup & Menjaga Lingkungan',
        titleEn: 'Compassion for Living Beings & Animal Welfare',
        desc: 'Hewan dan tumbuhan adalah sesama makhluk ciptaan Tuhan. Kucing, burung, ikan, dan pohon berhak hidup nyaman di bumi. Tidak boleh menyiksa hewan, tidak memetik bunga sembarangan, memberi makan hewan peliharaan, dan menyiram tanaman adalah wujud kasih sayang universal!',
        descEn: 'Animals and plants are our fellow earthly cohabitants created by God. Pets and wildlife deserve kindness. Refraining from harming animals, watering potted plants, and preserving green foliage manifests universal empathy!',
        checklist: [
          'Misi 1: Beri makan atau minum hewan peliharaanmu (atau kucing liar sekitar rumah) dengan ramah.',
          'Misi 2: Siram tanaman di pot atau halaman rumahmu di sore hari yang sejuk.',
          'Misi 3: Jangan menginjak rumput taman atau merusak ranting pohon yang sedang bersemi.'
        ],
        checklistEn: [
          'Mission 1: Feed or provide fresh clean water to a pet or a gentle neighborhood stray.',
          'Mission 2: Water potted flowers or garden plants in the soothing cool afternoon.',
          'Mission 3: Avoid trampling fresh grass beds or breaking budding flowering branches.'
        ],
        activities: [
          { q: 'Jika melihat anak kucing yang kelaparan di pinggir jalan, tindakan mulia yang patut dilakukan adalah...', options: ['Memberinya sedikit makanan atau susu dan memperlakukannya lembut', 'Menendang atau melemparinya batu', 'Menakut-nakutinya dengan suara keras', 'Membiarkannya kehujanan'], answer: 'Memberinya sedikit makanan atau susu dan memperlakukannya lembut', hint: 'Menyayangi hewan adalah perbuatan terpuji yang dicintai Tuhan 🐱' },
          { q: 'Mengapa kita perlu menyiram tanaman di sekitar pekarangan rumah kita?', options: ['Agar tanaman tumbuh subur dan menghasilkan udara segar oksigen', 'Agar tanaman cepat mati', 'Agar halaman becek berlumpur', 'Hanya membuang waktu'], answer: 'Agar tanaman tumbuh subur dan menghasilkan udara segar oksigen', hint: 'Tanaman yang subur memberi kesejukan dan keindahan lingkungan.' }
        ],
        activitiesEn: [
          { q: 'If you encounter a hungry little kitten, what is the compassionate action?', options: ['Offer a bowl of clean water or food gently', 'Kick pebbles at it', 'Shout to terrorize it', 'Trap it in the cold rain'], answer: 'Offer a bowl of clean water or food gently', hint: 'Gentleness to animals reflects pure kindness 🐱' }
        ]
      },
      {
        id: 'ag-enam-agama',
        title: '6 Agama Resmi di Indonesia & Tempat Ibadahnya',
        titleEn: '6 Recognized Religions & Sacred Places of Worship',
        desc: 'Indonesia mengakui 6 agama resmi yang hidup rukun berdampingan: Islam (Masjid), Kristen Protestan (Gereja), Katolik (Gereja), Hindu (Pura), Buddha (Vihara), dan Konghucu (Klenteng/Litang). Semua agama mengajarkan kebaikan, kejujuran, dan persaudaraan sejati!',
        descEn: 'Indonesia officially recognizes 6 faiths coexisting in harmony: Islam (Mosque), Protestantism (Church), Catholicism (Church), Hinduism (Pura), Buddhism (Vihara), and Confucianism (Klenteng). All religions advocate truth, peace, and love!',
        checklist: [
          'Misi 1: Sebutkan nama tempat ibadah untuk agamamu sendiri dan letaknya di kotamu.',
          'Misi 2: Pasangkan 3 agama dengan tempat ibadahnya (Islam-Masjid, Hindu-Pura, Kristen-Gereja).',
          'Misi 3: Ucapkan salam perdamaian kepada teman yang berbeda agama dengan senyum persahabatan.'
        ],
        checklistEn: [
          'Mission 1: Name the place of worship for your family\'s faith community.',
          'Mission 2: Match 3 religions to their houses of worship (Islam-Mosque, Hindu-Pura, Christian-Church).',
          'Mission 3: Extend a peaceful, friendly greeting to peers of different faiths.'
        ],
        activities: [
          { q: 'Tempat ibadah suci bagi umat Hindu di Bali dan nusantara disebut...', options: ['Pura', 'Masjid', 'Gereja', 'Vihara'], answer: 'Pura', hint: 'Pura dengan candi bentar yang anggun nan asri 🛕' },
          { q: 'Umat Islam melaksanakan ibadah sholat berjamaah di...', options: ['Masjid', 'Pura', 'Klenteng', 'Candi'], answer: 'Masjid', hint: 'Masjid dengan kubah megah dan menara azan 🕌' },
          { q: 'Vihara adalah tempat ibadah suci bagi pemeluk agama...', options: ['Buddha', 'Konghucu', 'Katolik', 'Islam'], answer: 'Buddha', hint: 'Pemeluk agama Buddha beribadah di Vihara.' }
        ],
        activitiesEn: [
          { q: 'The sacred place of worship for Hindu communities in Bali and Indonesia is...', options: ['Pura', 'Mosque', 'Church', 'Vihara'], answer: 'Pura', hint: 'Pura shrines featuring ornate split gates 🛕' }
        ]
      },
      {
        id: 'ag-toleransi',
        title: 'Sikap Toleransi & Menghargai Perbedaan',
        titleEn: 'Interfaith Tolerance & Respecting Differences',
        desc: 'Toleransi adalah sikap saling menghormati dan menghargai keyakinan orang lain tanpa membeda-bedakan. Saat teman sedang berpuasa atau beribadah, kita tidak boleh mengganggunya. Kita saling mengucapkan selamat hari raya dan tetap bermain bersama dengan ceria!',
        descEn: 'Tolerance means deeply respecting others\' spiritual beliefs without prejudice. When friends observe fasting or prayers, we offer quiet respect. We exchange heartfelt festive greetings and remain great buddies!',
        checklist: [
          'Misi 1: Jaga ketenangan saat temanmu yang berbeda agama sedang khusyuk berdoa.',
          'Misi 2: Berikan ucapan selamat hari raya (Idul Fitri, Natal, Nyepi, Waisak, Imlek) kepada temanmu saat perayaannya.',
          'Misi 3: Duduk dan makan bersama teman di sekolah tanpa pernah membeda-bedakan agamanya.'
        ],
        checklistEn: [
          'Mission 1: Maintain serene silence when a classmate of another faith offers prayer.',
          'Mission 2: Wish warm holiday greetings (Eid, Christmas, Nyepi, Vesak, Lunar New Year) to celebrants.',
          'Mission 3: Sit and share lunch with schoolmates warmly regardless of faith traditions.'
        ],
        activities: [
          { q: 'Ketika tetangga atau temanmu sedang melaksanakan ibadah di rumahnya, sikap toleransi yang tepat adalah...', options: ['Menjaga ketenangan dan tidak menyetel musik keras-keras', 'Berteriak di depan pintu rumahnya', 'Mengajak main bola di depan jendelanya', 'Membunyikan klakson kencang'], answer: 'Menjaga ketenangan dan tidak menyetel musik keras-keras', hint: 'Menghargai waktu ibadah orang lain menciptakan lingkungan yang damai dan rukun.' },
          { q: 'Bolehkah kita memilih-milih teman bermain hanya berdasarkan agamanya saja?', options: ['Tidak boleh, kita harus berteman rukun dengan semua anak tanpa membeda-bedakan', 'Boleh saja sesuka hati', 'Hanya bermain dengan tetangga sebelah', 'Harus memusuhi teman yang berbeda'], answer: 'Tidak boleh, kita harus berteman rukun dengan semua anak tanpa membeda-bedakan', hint: 'Semua anak Indonesia adalah sahabat yang sederajat.' }
        ],
        activitiesEn: [
          { q: 'When a neighbor is observing peaceful prayers at home, what is the right civic attitude?', options: ['Keep quiet and refrain from blasting loud music', 'Shout outside their doorway', 'Play soccer right at their window', 'Honk horns repeatedly'], answer: 'Keep quiet and refrain from blasting loud music', hint: 'Respecting worship hours creates community peace.' }
        ]
      },
      {
        id: 'ag-kejujuran-amal',
        title: 'Kejujuran, Doa, & Gemar Berbuat Kebaikan',
        titleEn: 'Honesty, Prayerful Reflection, & Daily Kindness',
        desc: 'Kejujuran adalah mutiara hati: berkata benar apa adanya, mengakui kesalahan bila berbuat salah, dan mengembalikan barang temuan kepada pemiliknya. Berbuat baik tidak harus menunggu kaya; tersenyum ramah, menyapa santun, dan menolong teman adalah sedekah / amal kebajikan yang mulia!',
        descEn: 'Honesty is the pearl of the heart: speaking the truth, owning up to mistakes, and returning lost items. Kindness requires no wealth; a warm smile, gentle words, and helping hands are priceless treasures of virtue!',
        checklist: [
          'Misi 1: Katakan hal yang sebenarnya dengan jujur kepada orang tua tanpa rasa takut.',
          'Misi 2: Jika menemukan pensil atau penghapus jatuh di kelas, serahkan kepada guru agar kembali ke pemiliknya.',
          'Misi 3: Sisihkan sedikit uang sakumu ke dalam kotak amal atau celengan kebaikan.'
        ],
        checklistEn: [
          'Mission 1: Speak the transparent truth to your parents courageously.',
          'Mission 2: Hand over any lost pencil found on the floor to the teacher for safekeeping.',
          'Mission 3: Set aside a small portion of allowance into a charity coin box.'
        ],
        activities: [
          { q: 'Ketika kamu tidak sengaja menjatuhkan penggaris teman hingga patah, sikap jujur yang benar adalah...', options: ['Meminta maaf dan berterus terang dengan jujur', 'Menuduh teman lain yang merusaknya', 'Menyembunyikannya di bawah lemari', 'Pura-pura tidak tahu dan tertawa'], answer: 'Meminta maaf dan berterus terang dengan jujur', hint: 'Anak pemberani berani berkata jujur dan bertanggung jawab.' },
          { q: 'Perbuatan suka menolong orang lain tanpa mengharapkan pamrih pujian disebut perbuatan...', options: ['Ikhlas dan beramal kebajikan', 'Sombong', 'Pamer di media sosial', 'Terpaksa'], answer: 'Ikhlas dan beramal kebajikan', hint: 'Ikhlas artinya berbuat baik tulus karena cinta kepada Tuhan dan sesama.' }
        ],
        activitiesEn: [
          { q: 'If you accidentally drop a friend\'s ruler and break it, what is the honest integrity reaction?', options: ['Apologize sincerely and admit the mishap truthfully', 'Blame someone else falsely', 'Hide the pieces under the carpet', 'Pretend nothing happened'], answer: 'Apologize sincerely and admit the mishap truthfully', hint: 'Integrity means taking honest responsibility.' }
        ]
      }
  ,
      {
        id: 'ag-kebersihan-ibadah',
        title: 'Menjaga Kesucian Diri & Kebersihan Tempat Ibadah',
        titleEn: 'Purity of Self & Cleanliness of Worship Sanctuaries',
        desc: 'Kebersihan adalah bagian dari keimanan. Sebelum menghadap Tuhan Yang Maha Esa untuk beribadah, kita membersihkan diri: berwudu / cuci tangan dan kaki, mengenakan pakaian yang rapi dan suci, serta menjaga keheningan tempat ibadah (Masjid, Pura, Gereja, Vihara, Klenteng) agar semua orang beribadah dengan damai.',
        descEn: 'Cleanliness is an essential facet of devotion. Before offering heartfelt prayers, we cleanse our body, put on neat attire, and lovingly maintain the tranquility of worship sanctuaries so everyone experiences divine peace.',
        checklist: [
          "Misi 1: Cuci tangan, wajah, dan kaki hingga bersih sebelum memulai ibadah dan doa bersama.",
          "Misi 2: Susun sandal dan sepatumu secara rapi di rak pintu masuk tempat ibadah.",
          "Misi 3: Tidak berbicara keras atau berlarian saat berada di dalam rumah ibadah yang hening."
  ],
        checklistEn: [
          "Mission 1: Cleanse hands, face, and feet with fresh water before commencing sacred prayer.",
          "Mission 2: Neatly align your sandals or shoes on the designated sanctuary entryway rack.",
          "Mission 3: Maintain respectful silence and composure inside places of worship."
  ],
        activities: [
          {
                  "q": "Sebelum masuk ke tempat ibadah untuk bersembahyang, pakaian yang kita kenakan harus...",
                  "options": [
                          "Bersih, rapi, dan sopan",
                          "Kotor penuh lumpur",
                          "Pakaian tidur robek",
                          "Pakaian basah kuyup"
                  ],
                  "answer": "Bersih, rapi, dan sopan",
                  "hint": "Sebagai wujud penghormatan dan rasa syukur kepada Tuhan."
          },
          {
                  "q": "Sikap kita ketika berada di dalam rumah ibadah adalah...",
                  "options": [
                          "Khusyuk, tenang, dan tertib",
                          "Bermain bola di dalam ruangan",
                          "Berteriak-teriak memanggil teman",
                          "Makan permen karet"
                  ],
                  "answer": "Khusyuk, tenang, dan tertib",
                  "hint": "Tempat ibadah digunakan untuk berdoa dengan penuh ketulusan."
          },
          {
                  "q": "Menjaga kebersihan tempat ibadah adalah kewajiban dari...",
                  "options": [
                          "Seluruh jemaah / umat yang beribadah",
                          "Hanya pengurus saja",
                          "Tidak ada yang wajib",
                          "Orang lain"
                  ],
                  "answer": "Seluruh jemaah / umat yang beribadah",
                  "hint": "Rumah ibadah adalah milik bersama untuk mendekatkan diri kepada Tuhan."
          }
  ],
        activitiesEn: [
          {
                  "q": "Attire worn during sacred moments of prayer should always be...",
                  "options": [
                          "Clean, neat, and reverent",
                          "Muddy and torn",
                          "Sleepwear",
                          "Dirty"
                  ],
                  "answer": "Clean, neat, and reverent",
                  "hint": "Expressing heartfelt respect before God."
          }
  ]
      },
      {
        id: 'ag-amanah-janji',
        title: 'Menepati Janji & Menjaga Amanah (Dapat Dipercaya)',
        titleEn: 'Keeping Promises & Honoring Trusts (Being Faithful)',
        desc: 'Anak yang bertakwa dan berakhlak mulia selalu menepati janji yang diucapkan. Bila meminjam barang teman, barang itu dijaga baik-baik dan dikembalikan tepat waktu. Kejujuran dan sifat dapat dipercaya (amanah) membuat kita disayangi oleh Tuhan, disukai guru, dan memiliki banyak sahabat setia!',
        descEn: 'Children with pure upright hearts treasure their promises. When borrowing a friend’s pencil or book, they handle it gently and return it promptly. Trustworthiness earns divine blessings, teacher appreciation, and enduring lifelong friendships!',
        checklist: [
          "Misi 1: Kembalikan buku atau mainan yang kamu pinjam dari teman sambil mengucapkan terima kasih.",
          "Misi 2: Tepati janji membantumu merapikan mainan sendiri setelah selesai bermain di rumah.",
          "Misi 3: Jangan membuka rahasia atau pesan titipan yang diamanahkan orang tua kepadamu."
  ],
        checklistEn: [
          "Mission 1: Return borrowed books or pencils to your classmates with a cheerful smile.",
          "Mission 2: Fulfill your commitment to tidy up playthings after playtime at home.",
          "Mission 3: Honor the trusted tasks and words entrusted to you by your elders."
  ],
        activities: [
          {
                  "q": "Bila kita berjanji kepada teman untuk belajar bersama jam 4 sore, maka kita harus...",
                  "options": [
                          "Datang tepat waktu sesuai janji",
                          "Lupa dan pergi tidur",
                          "Sengaja membatalkan tanpa kabar",
                          "Marah-marah"
                  ],
                  "answer": "Datang tepat waktu sesuai janji",
                  "hint": "Menepati janji adalah ciri anak hebat yang dapat dipercaya."
          },
          {
                  "q": "Ketika meminjam penghapus milik teman, sikap yang benar adalah...",
                  "options": [
                          "Menggunakan dengan hati-hati lalu mengembalikan",
                          "Menyembunyikan di tas kita",
                          "Merobeknya menjadi dua",
                          "Membuang ke kolam"
                  ],
                  "answer": "Menggunakan dengan hati-hati lalu mengembalikan",
                  "hint": "Barang titipan atau pinjaman harus dijaga dengan penuh tanggung jawab."
          },
          {
                  "q": "Sikap orang yang jujur dan dapat dipercaya disebut...",
                  "options": [
                          "Amanah",
                          "Pembohong",
                          "Penakut",
                          "Kasar"
                  ],
                  "answer": "Amanah",
                  "hint": "Sifat terpuji yang dicintai Tuhan dan sesama manusia."
          }
  ],
        activitiesEn: [
          {
                  "q": "When we promise a friend to study together at 4 PM, we should...",
                  "options": [
                          "Arrive punctually as committed",
                          "Sleep and forget deliberately",
                          "Ghost them without notice",
                          "Complain loudly"
                  ],
                  "answer": "Arrive punctually as committed",
                  "hint": "Honoring commitments reflects personal integrity."
          }
  ]
      },
      {
        "id": "agama-sikap-berdoa",
      "title": "Tata Tertib Berdoa & Sikap Khidmat Beribadah",
      "titleEn": "Reverence in Prayer & Respectful Worship Manner",
      "desc": "Berdoa adalah saat kita berkomunikasi secara tulus dengan Tuhan Yang Maha Esa. Saat berdoa, kita harus menunjukkan rasa hormat: menenangkan hati, duduk dengan sikap tegak atau bersimpuh rapi, tidak bercanda atau bermain-main, dan memanjatkan doa dengan tulus!",
      "descEn": "Prayer is an intimate communion with the Almighty Creator. Reverence requires calming our minds, maintaining respectful posture, ceasing playful chattering, and petitioning heartfelt gratitude humbly!",
      "checklist": [
        "Misi 1: Berdoa dengan khidmat sebelum mulai belajar di sekolah dan sebelum makan.",
        "Misi 2: Menjaga ketenangan dan tidak mengganggu saudara/teman yang sedang beribadah.",
        "Misi 3: Mengucapkan syukur atas berkah kesehatan dan keluarga bahagia setiap bangun pagi."
      ],
      "checklistEn": [
        "Mission 1: Pray attentively before commencing school lessons and prior to meals.",
        "Mission 2: Maintain peaceful silence without disturbing family/friends during worship.",
        "Mission 3: Offer daily gratitude for health and family blessings each morning."
      ],
      "activities": [
        {
          "q": "Sikap tubuh yang benar dan terpuji saat sedang berdoa kepada Tuhan adalah...",
          "options": [
            "Khidmat, tenang, menunduk sopan, dan tidak bercanda",
            "Sambil berlari ke sana kemari",
            "Sambil mengobrol dengan teman",
            "Bermain lempar kertas"
          ],
          "answer": "Khidmat, tenang, menunduk sopan, dan tidak bercanda",
          "hint": "Menghormati keagungan Tuhan Yang Maha Esa dengan segenap hati."
        },
        {
          "q": "Sebelum kita menyantap makanan yang disediakan Ibu, kewajiban kita adalah...",
          "options": [
            "Mencuci tangan bersih dan berdoa bersyukur",
            "Langsung makan terburu-buru",
            "Mencela makanannya",
            "Membongkar piring"
          ],
          "answer": "Mencuci tangan bersih dan berdoa bersyukur",
          "hint": "Mensyukuri rezeki berkah makanan bergizi yang disiapkan orang tua."
        }
      ],
      "activitiesEn": [
        {
          "q": "Proper, respectful posture during prayer to the Creator:",
          "options": [
            "Reverent, peaceful, bowed respectfully without chattering",
            "Running around loudly",
            "Gossiping with friends",
            "Throwing toys"
          ],
          "answer": "Reverent, peaceful, bowed respectfully without chattering",
          "hint": "Honoring God with a humble, grateful heart."
        }
      ]
    },
    {
      "id": "agama-tolong-menolong",
      "title": "Menolong Sesama Tanpa Pamrih & Menyayangi Teman",
      "titleEn": "Helping Others Selflessly & Caring for Friends",
      "desc": "Tuhan mengajarkan kita untuk saling tolong-menolong dalam kebaikan. Ketika melihat teman yang terjatuh di halaman sekolah, teman yang lupa membawa pensil, atau adik yang kesulitan mengikat tali sepatu, bantulah dengan senyuman tulus tanpa meminta imbalan!",
      "descEn": "All spiritual teachings urge selfless charity and kindness. When a classmate trips, lacks a pencil, or a sibling struggles with shoelaces, reach out warmly without asking anything in return!",
      "checklist": [
        "Misi 1: Membantu membangkitkan teman yang tersandung di lapangan dan menghiburnya.",
        "Misi 2: Meminjamkan alat tulis kepada kawan sebangku yang membutuhkan dengan ikhlas.",
        "Misi 3: Membantu orang tua merapikan mainan atau menyapu lantai rumah secara sukarela."
      ],
      "checklistEn": [
        "Mission 1: Help up a friend who tripped in the playground and offer comforting words.",
        "Mission 2: Share and lend pencils kindly to a seatmate in need.",
        "Mission 3: Help parents gather toys or sweep room floors enthusiastically at home."
      ],
      "activities": [
        {
          "q": "Jika melihat teman terjatuh di halaman sekolah hingga lututnya tergores, kita sebaiknya...",
          "options": [
            "Segera menolongnya berdiri dan mengantarnya ke ruang UKS",
            "Menertawakannya beramai-ramai",
            "Membiarkannya menangis sendirian",
            "Memotretnya"
          ],
          "answer": "Segera menolongnya berdiri dan mengantarnya ke ruang UKS",
          "hint": "Tolong-menolong adalah budi pekerti mulia yang diajarkan semua agama."
        },
        {
          "q": "Membantu orang lain dengan \"ikhlas tanpa pamrih\" artinya...",
          "options": [
            "Membantu tulus dari hati tanpa meminta uang atau pujian",
            "Membantu hanya jika dibayar",
            "Membantu sambil marah-marah",
            "Membantu hanya di depan kamera"
          ],
          "answer": "Membantu tulus dari hati tanpa meminta uang atau pujian",
          "hint": "Kebaikan sejati bersumber dari cinta kasih murni dalam sanubari."
        }
      ],
      "activitiesEn": [
        {
          "q": "When a friend trips in the yard, what is the virtuous action?",
          "options": [
            "Help them stand up gently and guide them to medical room",
            "Laugh at them loudly",
            "Walk away ignoring",
            "Tease them"
          ],
          "answer": "Help them stand up gently and guide them to medical room",
          "hint": "Caring for companions reflects moral beauty."
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/kokurikuler.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Kokurikuler / Proyek P5 Subject Data
  // Development · Anabhi Dev
  // Version   : 2.0 (Comprehensive LKS & Proyek Pelajar Pancasila)
  // ================================================================
  
  const KOKURIKULER_DATA = {
    id: 'kokurikuler',
    title: 'Kokurikuler & Proyek P5 — Kreasi Cilik Berdampak Nyata',
    titleEn: 'Co-Curricular & P5 Projects — Hands-on Discovery & Innovation',
    subtitle: 'Belajar kontekstual dan aksi nyata: pilah sampah ramah bumi, permainan tradisional, eksperimen sains, dan kebun sekolah! 🌱',
    subtitleEn: 'Contextual project-based learning: waste segregation, traditional games, science experiments, and eco school gardening! 🌱',
    topics: [
      {
        id: 'p5-sampah-lestari',
        title: 'P5 Gaya Hidup Berkelanjutan: Pilah Sampah Mandiri',
        titleEn: 'P5 Sustainable Lifestyle: Waste Segregation Mission',
        desc: 'Bumi kita membutuhkan bantuan kita untuk tetap bersih dan hijau! Sampah ORGANIK (sisa makanan, kulit buah, daun) bisa diolah menjadi pupuk kompos penyubur tanaman. Sampah ANORGANIK (botol plastik, kaleng, kardus) dapat didaur ulang menjadi pot bunga atau tempat pensil kreatif!',
        descEn: 'Our home planet needs our mindful care! ORGANIC waste (food peels, fallen leaves) turns into nutrient-rich compost. INORGANIC recyclables (plastic bottles, tin cans, cardboard) can be upcycled into cheerful pencil holders and planters!',
        checklist: [
          'Misi 1: Sediakan 2 kantong/tempat sampah berbeda di rumah: Hijau untuk organik dan Kuning untuk plastik.',
          'Misi 2: Kumpulkan 1 botol plastik bekas minuman, bersihkan, dan hias menjadi pot tanaman mini.',
          'Misi 3: Lakukan operasi semut selama 5 menit: kumpulkan sampah kering di sekitarmu dan buang ke tempatnya.'
        ],
        checklistEn: [
          'Mission 1: Set up 2 separate bins at home: Green for organic peels and Yellow for recyclable plastics.',
          'Mission 2: Clean and decorate 1 recycled plastic bottle into a tabletop succulent planter.',
          'Mission 3: Complete a 5-minute litter sweep around your yard and dispose of trash responsibly.'
        ],
        activities: [
          { q: 'Sisa kulit pisang dan dedaunan kering yang berguguran termasuk ke dalam kelompok sampah...', options: ['Organik (dapat membusuk alami)', 'Anorganik (plastik)', 'Limbah B3 beracun', 'Batu mulia'], answer: 'Organik (dapat membusuk alami)', hint: 'Organik berasal dari makhluk hidup dan dapat diolah jadi kompos 🍂' },
          { q: 'Apa tindakan terbaik untuk memanfaatkan botol plastik air mineral bekas yang masih bersih?', options: ['Mendaur ulang menjadi pot tanaman gantung atau tempat pensil', 'Membakarnya di pekarangan hingga berasap tebal', 'Membuangnya ke selokan atau sungai', 'Menimbunnya di dalam tanah'], answer: 'Mendaur ulang menjadi pot tanaman gantung atau tempat pensil', hint: 'Daur ulang (Upcycling) mengurangi timbunan sampah plastik di bumi.' }
        ],
        activitiesEn: [
          { q: 'Fallen dry leaves and fruit peels belong to which waste category?', options: ['Organic (naturally compostable)', 'Inorganic (plastic)', 'Hazardous chemical', 'Mineral'], answer: 'Organic (naturally compostable)', hint: 'Organic waste decomposes into rich soil fertilizer 🍂' }
        ]
      },
      {
        id: 'p5-kearifan-lokal',
        title: 'P5 Kearifan Lokal: Melestarikan Permainan Tradisional',
        titleEn: 'P5 Local Wisdom: Reviving Heritage Games',
        desc: 'Sebelum ada ponsel pintar, anak-anak Indonesia bermain permainan tradisional yang menyehatkan fisik dan mempererat persahabatan: Engklek (melompat dengan satu kaki di petak kotak), Egrang batok kelapa (keseimbangan kaki), Gobak Sodor (ketangkasan dan strategi tim), serta Congklak (berhitung biji kerang)!',
        descEn: 'Traditional Indonesian games build agile physical stamina and authentic social bonds: Engklek (hopscotch jumping), Coconut-shell Stilts (balance mastery), Gobak Sodor (tactical teamwork), and Congklak (mathematical shell counting)!',
        checklist: [
          'Misi 1: Gambar petak Engklek di lantai halaman dengan kapur tulis dan mainkan bersama teman.',
          'Misi 2: Buat sepasang egrang batok kelapa sederhana bersama ayah menggunakan tali tambang.',
          'Misi 3: Praktikkan sikap sportif: bersalaman dan memberi selamat kepada tim lawan saat menang atau kalah.'
        ],
        checklistEn: [
          'Mission 1: Chalk an Engklek hopscotch grid on the yard pavement and hop through the tiles.',
          'Mission 2: Craft coconut shell stilts with sturdy rope alongside your family.',
          'Mission 3: Practice good sportsmanship by congratulating opponents regardless of the score.'
        ],
        activities: [
          { q: 'Permainan tradisional melompat dengan satu kaki melintasi kotak-kotak berurutan yang digambar di tanah adalah...', options: ['Engklek / Sunda Manda', 'Bermain game online di HP', 'Menonton bioskop', 'Catur papan'], answer: 'Engklek / Sunda Manda', hint: 'Melatih keseimbangan kaki dan ketepatan melompat.' },
          { q: 'Nilai karakter luhur yang kita pelajari dari permainan tradisional beregu (seperti Gobak Sodor) adalah...', options: ['Kekompakan, strategi tim, dan sikap sportif jujur', 'Boleh curang asal menang', 'Menangis jika kalah', 'Mengejek teman yang jatuh'], answer: 'Kekompakan, strategi tim, dan sikap sportif jujur', hint: 'Sportivitas dan kerja sama adalah kunci permainan yang membahagiakan.' }
        ],
        activitiesEn: [
          { q: 'The classic one-legged hopping game jumping through chalked grid boxes is...', options: ['Engklek (Hopscotch)', 'Mobile video gaming', 'Watching movies', 'Chess tournament'], answer: 'Engklek (Hopscotch)', hint: 'Trains leg strength and single-foot balancing balance.' }
        ]
      },
      {
        id: 'p5-celengan-mandiri',
        title: 'P5 Kewirausahaan Cilik: Celengan Mandiri & Nilai Berhemat',
        titleEn: 'P5 Junior Entrepreneurship: Smart Savings & Budgeting',
        desc: 'Menjadi anak mandiri dimulai dari bijak mengatur uang saku. Kita belajar membedakan KEBUTUHAN (hal penting seperti buku tulis, makanan sehat, dan pensil) dengan KEINGINAN (mainan mewah atau jajan berlebihan). Menabung uang logam sisa jajan di celengan membuat kita siap menghadapi masa depan!',
        descEn: 'Independence starts with financial literacy. We distinguish between NEEDS (essential textbooks, wholesome food) and WANTS (fancy trinkets, sugary snacks). Saving daily change in a piggy bank prepares us for future success!',
        checklist: [
          'Misi 1: Buat celengan buatanmu sendiri dari kaleng biskuit bekas atau kotak kardus sepatu.',
          'Misi 2: Sisihkan uang koin Rp1.000 atau Rp2.000 dari sisa uang sakumu ke dalam celengan setiap hari.',
          'Misi 3: Tuliskan 1 barang impian yang ingin kamu beli sendiri dari hasil menabung selama 3 bulan.'
        ],
        checklistEn: [
          'Mission 1: Upcycle a clean tin can or shoebox into a personalized savings bank.',
          'Mission 2: Deposit small spare change into your coin bank every single afternoon.',
          'Mission 3: Write down 1 meaningful goal you wish to achieve from 3 months of savings.'
        ],
        activities: [
          { q: 'Manakah di bawah ini yang merupakan contoh KEBUTUHAN utama seorang siswa sekolah?', options: ['Buku tulis dan pensil untuk belajar', 'Mainan robot mahal keluaran terbaru', 'Baju pesta yang mewah', 'Pulsa game online'], answer: 'Buku tulis dan pensil untuk belajar', hint: 'Kebutuhan adalah barang pokok yang sangat diperlukan untuk menuntut ilmu ✏️' },
          { q: 'Pepatah bijak nusantara mengatakan "Hemat pangkal kaya, rajin pangkal..."', options: ['Pandai', 'Malas', 'Bosan', 'Lapar'], answer: 'Pandai', hint: 'Rajin belajar membuat kita pintar dan berwawasan luas.' }
        ],
        activitiesEn: [
          { q: 'Which of the following represents an essential NEED for an elementary student?', options: ['Notebooks and pencils for class', 'Expensive luxury video game gadgets', 'Designer party costumes', 'Online gaming credits'], answer: 'Notebooks and pencils for class', hint: 'Needs are essential tools for learning ✏️' }
        ]
      },
      {
        id: 'p5-eksperimen-sains',
        title: 'P5 Rekayasa Sains: Eksperimen Pelangi & Erupsi Soda',
        titleEn: 'P5 STEM Discovery: Rainbow Density & Fizzy Eruption',
        desc: 'Sains itu seru dan menakjubkan! Kita bisa membuat simulasi "Gunung Berapi Meletus" menggunakan soda kue dapur dicampur cuka dan pewarna merah (reaksi asam-basa menghasilkan gas karbon dioksida berbusa!), atau eksperimen "Massa Jenis Pelangi" dari larutan air gula berbagai warna!',
        descEn: 'Science is thrilling discovery! Create a foaming "Volcanic Eruption" mixing baking soda, vinegar, and red dye (an acid-base reaction producing fizzy CO2 bubbles), or demonstrate "Rainbow Density Columns" with tiered sugar-water solutions!',
        checklist: [
          'Misi 1: Siapkan 1 sendok soda kue, tuangkan sedikit cuka dapur, dan amati busa gas yang mendesis meletup.',
          'Misi 2: Celupkan batang seledri atau bunga putih ke dalam air berwarna merah semalaman; amati kapilaritas batang air.',
          'Misi 3: Tuliskan hasil pengamatan eksperimenmu di tabel lembar observasi sains.'
        ],
        checklistEn: [
          'Mission 1: Mix a spoonful of baking soda with vinegar in a cup; observe bubbling carbon dioxide foam.',
          'Mission 2: Place a white carnation stem in red dyed water overnight; observe capillary water conduction.',
          'Mission 3: Record your scientific observations neatly in your STEM lab notebook.'
        ],
        activities: [
          { q: 'Ketika bubuk soda kue dicampur dengan tetesan cuka dapur, muncul busa gas. Gas apakah itu?', options: ['Gas Karbon Dioksida (CO2)', 'Gas Racun', 'Gas Oksigen murni', 'Uap air dingin'], answer: 'Gas Karbon Dioksida (CO2)', hint: 'Reaksi kimia asam cuka dan basa soda menghasilkan gelembung CO2 yang mendesis.' },
          { q: 'Mengapa minyak goreng selalu mengapung di atas permukaan air saat dituangkan ke dalam gelas?', options: ['Karena massa jenis minyak lebih ringan daripada air', 'Karena minyak membeku', 'Karena air mengandung garam', 'Karena minyak takut air'], answer: 'Karena massa jenis minyak lebih ringan daripada air', hint: 'Benda dengan kerapatan massa jenis lebih kecil akan selalu terapung di atas cairan yang lebih padat.' }
        ],
        activitiesEn: [
          { q: 'When baking soda reacts with vinegar, what gas creates the energetic bubbling foam?', options: ['Carbon Dioxide (CO2)', 'Toxic gas', 'Pure Oxygen', 'Ice vapor'], answer: 'Carbon Dioxide (CO2)', hint: 'An acid-base reaction releases bubbly carbon dioxide.' }
        ]
      },
      {
        id: 'p5-anti-bullying',
        title: 'P5 Bangunlah Jiwa Raganya: Sahabat Hebat Anti-Bullying',
        titleEn: 'P5 Wellbeing: Kind Friends Against Bullying',
        desc: 'Setiap anak berhak belajar dan bermain di sekolah dengan rasa aman dan gembira. Tolak perundungan (bullying): STOP mengejek nama orang tua, STOP memanggil julukan buruk, STOP mengucilkan kawan, dan STOP bermain kasar! Jadilah pembela kebaikan (upstander) yang melindungi teman!',
        descEn: 'Every child has the absolute right to learn and thrive in an emotionally and physically safe classroom. STOP name-calling, STOP mocking appearance, STOP excluding peers, and STOP physical aggression! Be a brave, compassionate upstander!',
        checklist: [
          'Misi 1: Tulis ikrar di selembar kertas: "Aku Pelajar Hebat, Suka Menolong & Menolak Mengejek Teman".',
          'Misi 2: Ajak teman yang sedang duduk sendirian di pojok kelas untuk bergabung bermain bersama regumu.',
          'Misi 3: Segera lapor kepada guru jika melihat ada teman yang diganggu atau disakiti orang lain.'
        ],
        checklistEn: [
          'Mission 1: Pen a personal pledge: "I am a Kindhearted Scholar; I Uplift and Never Tease Friends".',
          'Mission 2: Invite a lonely student sitting alone at recess to join your group games.',
          'Mission 3: Promptly inform a trusted teacher whenever you witness unfair bullying behavior.'
        ],
        activities: [
          { q: 'Jika kamu melihat seorang teman baru diejek atau disoraki oleh anak lain, sikap terbaikmu adalah...', options: ['Membelanya, mengajaknya menjauh, dan melaporkan kejadian kepada guru', 'Ikut-ikutan mengejek agar dianggap hebat', 'Merekamnya sambil tertawa', 'Menyuruh teman tersebut menangis'], answer: 'Membelanya, mengajaknya menjauh, dan melaporkan kejadian kepada guru', hint: 'Jadilah upstander pemberani yang membela teman yang tertindas.' },
          { q: 'Manakah ucapan yang mencerminkan tutur kata sahabat sejati?', options: ['"Ayo kita bermain dan belajar bersama!"', '"Kamu tidak boleh ikut main bersama kami!"', '"Lihat bajumu jelek sekali!"', '"Namamu aneh!"'], answer: '"Ayo kita bermain dan belajar bersama!"', hint: 'Kata-kata yang hangat menumbuhkan kebahagiaan bersama.' }
        ],
        activitiesEn: [
          { q: 'If you witness a classmate being teased or excluded, what is the upstander action?', options: ['Stand by their side, invite them over, and notify a teacher', 'Join in the cruel laughter', 'Record it for amusement', 'Tell them it is their fault'], answer: 'Stand by their side, invite them over, and notify a teacher', hint: 'An upstander protects and seeks supportive adult help.' }
        ]
      },
      {
        id: 'p5-kebun-sekolah',
        title: 'P5 Rekayasa & Lingkungan: Proyek Berkebun Hidroponik / Sayur',
        titleEn: 'P5 Urban Agriculture: School Gardening & Hydroponics',
        desc: 'Menanam tanaman adalah petualangan sains yang mengasyikkan! Dari sebutir biji kacang hijau kecil di atas kapas basah, ia akan berkecambah mengeluarkan akar putih, batang lentur, hingga helai daun hijau yang menyerap sinar matahari melalui fotosintesis. Kita belajar merawat kehidupan dengan sabar!',
        descEn: 'Planting seeds is a living science journey! Watch a mung bean sprout from moist cotton, developing roots, stems, and sun-seeking green leaves via photosynthesis. Nurturing plants teaches patience, ecology, and stewardship!',
        checklist: [
          'Misi 1: Siapkan wadah gelas plastik bekas, beri kapas basah, dan taburkan 5 butir biji kacang hijau.',
          'Misi 2: Letakkan di tempat yang terkena sinar matahari pagi dan basahi kapas setiap pagi.',
          'Misi 3: Catat tinggi pertumbuhan batang kecambah setiap hari selama 7 hari di tabel jurnal tanaman.'
        ],
        checklistEn: [
          'Mission 1: Line a clear plastic cup with damp cotton balls and scatter 5 mung bean seeds.',
          'Mission 2: Place by a sunny windowsill and mist the cotton moist daily.',
          'Mission 3: Measure and graph the stem growth height in centimeters over 7 consecutive days.'
        ],
        activities: [
          { q: 'Tiga hal utama yang dibutuhkan oleh biji tanaman untuk berkecambah dan tumbuh subur adalah...', options: ['Air, udara (oksigen), dan sinar matahari yang cukup', 'Minyak goreng, susu, dan garam', 'Ruangan gelap gulita tanpa udara', 'Plastik pembungkus yang kedap udara'], answer: 'Air, udara (oksigen), dan sinar matahari yang cukup', hint: 'Air memicu perkecambahan biji dan sinar matahari memberi energi fotosintesis 🌱' },
          { q: 'Bagian tanaman yang tumbuh ke bawah masuk ke dalam tanah untuk menyerap air dan mineral adalah...', options: ['Akar', 'Daun', 'Bunga', 'Buah'], answer: 'Akar', hint: 'Akar menopang tanaman kokoh dan menyerap air tanah.' }
        ],
        activitiesEn: [
          { q: 'What primary elements do sprouting seeds need to flourish into vibrant seedlings?', options: ['Water, air (oxygen), and adequate sunlight', 'Cooking oil, milk, and salt', 'Pitch darkness without ventilation', 'Airtight plastic wrap'], answer: 'Water, air (oxygen), and adequate sunlight', hint: 'Moisture triggers germination and sunlight powers photosynthesis 🌱' }
        ]
      }
  ,
      {
        id: 'p5-suara-demokrasi',
        title: 'Suara Demokrasi Cilik: Musyawarah Regu Piket Kelas',
        titleEn: 'Junior Democracy: Classroom Chores Team Deliberation',
        desc: 'Dalam Projek Profil Pelajar Pancasila tema "Suara Demokrasi", anak Kelas 1 SD diajak bermusyawarah secara nyata: menentukan giliran regu piket kelas, menyepakati aturan bermain saat istirahat, dan memilih ketua kelompok belajar dengan cara angkat tangan yang adil dan transparan.',
        descEn: 'In the P5 theme "Voice of Democracy", 1st grade learners experience real democratic participation: organizing classroom cleaning teams, setting fair playground rules, and electing team coordinators through honest hand-raising ballots.',
        checklist: [
          "Misi 1: Usulkan satu ide permainan tradisional seru untuk dimainkan bersama saat jam istirahat.",
          "Misi 2: Ikuti pemungutan suara pemilihan ketua kelompok dengan mengangkat tangan secara tertib.",
          "Misi 3: Laksanakan tugas piket membersihkan papan tulis sesuai hari regu piketmu dengan riang gembira."
  ],
        checklistEn: [
          "Mission 1: Propose a fun playground game idea during classroom morning meeting.",
          "Mission 2: Participate in team coordinator election by raising hands orderly.",
          "Mission 3: Fulfill your chalkboard cleaning chore on your designated duty day enthusiastically."
  ],
        activities: [
          {
                  "q": "Cara demokratis yang paling adil untuk memilih ketua kelompok belajar adalah...",
                  "options": [
                          "Pemungutan suara (voting) bersama seluruh anggota",
                          "Ditentukan sendiri oleh yang paling galak",
                          "Melempar koin ke lantai",
                          "Berkelahi"
                  ],
                  "answer": "Pemungutan suara (voting) bersama seluruh anggota",
                  "hint": "Setiap anak memiliki hak suara yang sama dan setara."
          },
          {
                  "q": "Bila usulan kita tidak terpilih dalam musyawarah kelas, sikap Pelajar Pancasila adalah...",
                  "options": [
                          "Menerima dengan lapang dada dan mendukung yang terpilih",
                          "Menangis di pojokan",
                          "Merusak papan tulis",
                          "Tidak mau masuk sekolah"
                  ],
                  "answer": "Menerima dengan lapang dada dan mendukung yang terpilih",
                  "hint": "Jiwa besar dan sportivitas adalah kunci kerukunan bersama."
          },
          {
                  "q": "Tujuan utama pembagian regu piket kelas adalah...",
                  "options": [
                          "Menjaga kebersihan kelas secara gotong royong dan adil",
                          "Menghukum anak yang nakal",
                          "Membuat anak capek",
                          "Supaya tidak perlu belajar"
                  ],
                  "answer": "Menjaga kebersihan kelas secara gotong royong dan adil",
                  "hint": "Pekerjaan berat menjadi ringan jika dibagi bersama."
          }
  ],
        activitiesEn: [
          {
                  "q": "The fairest democratic method to select a study group leader is...",
                  "options": [
                          "A shared vote where every member casts a voice",
                          "Letting the loudest kid decide alone",
                          "Flipping a random coin",
                          "Quarreling"
                  ],
                  "answer": "A shared vote where every member casts a voice",
                  "hint": "Every learner has equal voice."
          }
  ]
      },
      {
        id: 'p5-sayang-bumi',
        title: 'Aku Sayang Bumi: Menanam Biji Kacang Hijau di Pot Daur Ulang',
        titleEn: 'I Love Mother Earth: Sprouting Mung Beans in Recycled Pots',
        desc: 'Projek sains cilik yang penuh keajaiban! Kita memanfaatkan gelas plastik bekas air mineral sebagai pot mini ramah lingkungan. Diberi kapas basah dan 5 butir biji kacang hijau. Dalam 3 hari, biji bertunas kecil, mengeluarkan akar putih halus, dan tumbuh daun hijau mungil menghadap sinar matahari!',
        descEn: 'A magical junior botanical adventure! Children repurpose clean used beverage cups as eco-friendly mini pots. Lined with moist cotton and 5 mung bean seeds, within 3 days delicate white roots emerge and bright green sprouts reach upward for sunlight!',
        checklist: [
          "Misi 1: Siapkan 1 gelas plastik bekas yang sudah dicuci bersih dan letakkan kapas basah di dasarnya.",
          "Misi 2: Taburkan 5 biji kacang hijau di atas kapas basah, lalu letakkan di tempat yang terkena cahaya matahari.",
          "Misi 3: Catat dan amati tinggi tunas kacang hijau setiap pagi di buku jurnal sains cilikmu."
  ],
        checklistEn: [
          "Mission 1: Prepare one clean recycled plastic cup and place moist cotton at the base.",
          "Mission 2: Scatter 5 green mung bean seeds onto the cotton and set near natural window sunlight.",
          "Mission 3: Measure and record the sprout growth height each morning in your science journal."
  ],
        activities: [
          {
                  "q": "Dua hal penting yang dibutuhkan biji kacang hijau agar bertunas subur adalah...",
                  "options": [
                          "Air (kelembapan) dan cahaya matahari",
                          "Minyak goreng dan es batu",
                          "Pasir panas tanpa air",
                          "Gula pasir manis"
                  ],
                  "answer": "Air (kelembapan) dan cahaya matahari",
                  "hint": "Air memicu perkecambahan biji dan sinar matahari memberi energi tumbuh."
          },
          {
                  "q": "Memanfaatkan gelas plastik bekas air mineral untuk pot tanaman adalah contoh aksi...",
                  "options": [
                          "Daur ulang (Recycle) dan cinta lingkungan",
                          "Membuang sampah sembarangan",
                          "Merusak alam",
                          "Membuang uang"
                  ],
                  "answer": "Daur ulang (Recycle) dan cinta lingkungan",
                  "hint": "Mengurangi sampah plastik dengan menjadikannya barang bermanfaat 🌱"
          },
          {
                  "q": "Bagian tumbuhan yang pertama kali muncul dari biji menembus ke bawah adalah...",
                  "options": [
                          "Akar halus untuk menyerap air",
                          "Buah lebat",
                          "Bunga mawar",
                          "Batang raksasa"
                  ],
                  "answer": "Akar halus untuk menyerap air",
                  "hint": "Akar berfungsi mencengkeram dan mencari air di dalam kapas."
          }
  ],
        activitiesEn: [
          {
                  "q": "Two essential elements required for seeds to germinate into healthy sprouts are...",
                  "options": [
                          "Moisture (water) and sunlight",
                          "Cooking oil and ice cubes",
                          "Dry hot sand without water",
                          "Sugar powder"
                  ],
                  "answer": "Moisture (water) and sunlight",
                  "hint": "Water unlocks germination and light fuels growth."
          }
  ]
      },
      {
        "id": "p5-bazar-wirausaha",
      "title": "Kewirausahaan Cilik: Bazar Minuman Sehat Jeruk Peras",
      "titleEn": "Little Entrepreneurs: Fresh Orange Juice Stand",
      "desc": "Belajar berwirausaha melatih kreativitas, kerja sama tim, dan kejujuran berhitung. Siswa bersama kelompok menyiapkan buah jeruk segar, memeras dengan alat manual, menghitung modal belanja, melayani pembeli dengan 3S (Senyum, Salam, Sapa), dan mencatat hasil penjualan!",
      "descEn": "Early entrepreneurship builds teamwork, financial honesty, and customer courtesy. Students collaborate to squeeze fresh orange juice, compute ingredient costs, serve peers with warm smiles, and record earnings!",
      "checklist": [
        "Misi 1: Hitung modal membeli 10 buah jeruk dan gelas kertas bersama kelompokmu.",
        "Misi 2: Praktikkan 3S (Senyum, Salam, Sapa) saat melayani teman yang membeli minuman.",
        "Misi 3: Hitung total uang hasil penjualan dan pisahkan modal dengan keuntungan bersih."
      ],
      "checklistEn": [
        "Mission 1: Calculate total ingredient expenses for 10 fresh oranges and paper cups.",
        "Mission 2: Practice warm hospitality (Smile, Greet, Thank) when serving peer customers.",
        "Mission 3: Tally final cash receipts and separate initial costs from net earnings."
      ],
      "activities": [
        {
          "q": "Sikap pedagang cilik yang jujur dan disenangi pembeli adalah...",
          "options": [
            "Melayani dengan senyuman ramah dan mengembalikan kembalian tepat",
            "Mengurangi takaran sembunyi-sembunyi",
            "Marah jika pembeli bertanya",
            "Memberi kembalian palsu"
          ],
          "answer": "Melayani dengan senyuman ramah dan mengembalikan kembalian tepat",
          "hint": "Kejujuran adalah modal utama dalam berwirausaha yang sukses berkah."
        },
        {
          "q": "Jika modal membeli bahan Rp 10.000 dan hasil penjualan terkumpul Rp 15.000, maka kita mendapat...",
          "options": [
            "Keuntungan (laba) sebesar Rp 5.000",
            "Rugi Rp 5.000",
            "Habis modal",
            "Tidak ada hasil"
          ],
          "answer": "Keuntungan (laba) sebesar Rp 5.000",
          "hint": "Laba = Uang Hasil Penjualan dikurangi Modal Awal."
        }
      ],
      "activitiesEn": [
        {
          "q": "An honest young shopkeeper always...",
          "options": [
            "Serves with cheerful smiles and provides exact change",
            "Cheats on measurements",
            "Scolds customers",
            "Overcharges"
          ],
          "answer": "Serves with cheerful smiles and provides exact change",
          "hint": "Integrity wins customer trust!"
        }
      ]
    },
    {
      "id": "p5-exhibition-day",
      "title": "Pameran Portofolio & Perayaan Hari Belajar (Exhibition Day)",
      "titleEn": "Learning Exhibition Day & Portfolio Celebration",
      "desc": "Perayaan Belajar (Exhibition Day) adalah puncak apresiasi Projek P5 di akhir semester. Siswa mendekorasi stan pameran kelas, memajang karya kolase alam, tanaman pot daur ulang, celengan kreatif, dan mempresentasikan hasil belajarnya kepada orang tua yang hadir!",
      "descEn": "Exhibition Day is the joyful culmination of P5 projects. Students decorate classroom display booths, exhibit nature collages, recycled planters, and handmade piggy banks, explaining their creations to visiting parents!",
      "checklist": [
        "Misi 1: Pilih 3 karya portofolio paling membanggakan selama belajar semester ini.",
        "Misi 2: Hias stan pameran mejamu dengan taplak rapi dan papan nama karya bertulisan indah.",
        "Misi 3: Sambut orang tua dan guru dengan presentasi ceria: \"Selamat datang di stanku!\""
      ],
      "checklistEn": [
        "Mission 1: Curate your 3 proudest creative artifacts accomplished this school semester.",
        "Mission 2: Decorate your display desk with neat runners and artistic label cards.",
        "Mission 3: Welcome visiting parents and teachers with enthusiastic presentations!"
      ],
      "activities": [
        {
          "q": "Tujuan utama diadakannya Perayaan Hari Belajar (Exhibition Day) adalah...",
          "options": [
            "Mengapresiasi proses belajar siswa dan berbagi kebahagiaan karya",
            "Mencari juara 1 dan menjatuhkan yang lain",
            "Menjual barang mahal",
            "Hanya piknik"
          ],
          "answer": "Mengapresiasi proses belajar siswa dan berbagi kebahagiaan karya",
          "hint": "P5 menekankan penguatan karakter dan kebanggaan atas karya sendiri."
        },
        {
          "q": "Saat orang tua berkunjung ke meja pameranmu, sikap yang tepat adalah...",
          "options": [
            "Menjelaskan cerita di balik karyamu dengan bangga dan santun",
            "Kabur sembunyi di bawah meja",
            "Meminta pulang cepat",
            "Menangis tersedu-sedu"
          ],
          "answer": "Menjelaskan cerita di balik karyamu dengan bangga dan santun",
          "hint": "Orang tua sangat senang dan bangga mendengar celoteh cerdas putranya!"
        }
      ],
      "activitiesEn": [
        {
          "q": "Primary goal of the P5 Learning Exhibition Day:",
          "options": [
            "Celebrate student learning journeys and appreciate creative efforts",
            "Compete aggressively",
            "Sell expensive trinkets",
            "Skip classes"
          ],
          "answer": "Celebrate student learning journeys and appreciate creative efforts",
          "hint": "Affirming character, collaboration, and joyful growth."
        }
      ]
    }
    ]
  };
  

  // --- Source: js/data/globe-paths.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // Political World Map Vector Paths & Labels for 3D Globe
  // Development · Anabhi Dev
  // Version   : 1.2
  // Generated : 11 September 2026
  // ================================================================
  
  const GLOBE_COUNTRIES = [{"name":"Fiji","fill":"#ff9ff3","d":"M2048,603.4L2048,606.2L2044.4,607.6L2040.7,608.8L2040,606.7L2042.9,605.5L2044.7,605.2L2048,603.4Z M2037.3,611.6L2038.7,610.6L2040.7,612.3L2039.8,615.3L2036.2,616L2033.1,615.3L2032.6,612.8L2034.7,610.9L2037.3,611.6Z M1.2,603.1L0.5,605.9L0,606.2L0,603.4L1.2,603.1Z"},{"name":"Tanzania","fill":"#2bcbba","d":"M1216.9,517.4L1217.8,518L1238.5,529.6L1238.9,532.9L1247,538.6L1244.4,545.6L1244.7,548.8L1248.4,550.9L1248.5,552.4L1247,555.8L1247.3,557.6L1246.9,560.3L1248.9,563.8L1251.3,569.4L1253.4,570.7L1253.4,570.7L1248.8,574L1242.6,576.2L1239.2,576.1L1237.2,577.8L1233.2,578L1231.7,578.7L1224.9,577.1L1220.6,577.5L1219,569.8L1217.1,567.1L1215.9,565.6L1210.4,564.5L1207.1,562.8L1203.5,561.8L1201.3,560.9L1198.9,559.4L1198.9,559.4L1195.8,552.3L1192.5,549.1L1191.4,545.8L1191.9,542.8L1190.9,537.6L1193.3,537.3L1195.3,535.3L1197.5,532.3L1198.9,531.1L1198.9,529.3L1197.7,528L1197.3,525.7L1197.3,525.7L1199,525L1199.3,521.7L1197.1,518.5L1199,517.8L1205.3,517.8L1216.9,517.4Z"},{"name":"W. Sahara","fill":"#ff6b6b","d":"M974.7,354.7L974.7,355L974.6,356.1L974.6,364.8L955.9,364.5L956.1,379L950.8,379.5L949.4,382.5L950.4,390.7L928.2,390.6L926.9,392.5L927.2,390.1L927.3,390.1L940.1,389.7L940.8,387.6L943.1,385.1L945,377.2L952.9,371.1L955.6,363.9L957.3,363.5L959.2,359.1L964,358.5L966,359.2L968.6,359.2L970.5,357.9L974,357.7L973.8,354.7L974.7,354.7Z"},{"name":"Canada","fill":"#706fd3","d":"M325.2,233.2L324.4,233.2L313.4,227.6L309.3,225.2L299,222.8L295.9,217.8L296.7,214.3L289.4,211.9L288.4,207.3L281.5,203.2L281.4,200.2L281.4,200.2L284.6,197.5L284.4,193.9L274.7,190.3L268.9,183.8L265.4,179.7L260.1,177.1L256.3,174.8L253.3,171.9L247.6,173.7L242,176.9L237,173.2L233,170.7L227.5,169.1L221.9,168.9L221.9,136.5L221.9,115.4L221.9,115.4L232.6,116.8L241.5,119.5L247.4,120L252.4,117.7L259.3,115.9L267.8,116.6L276.3,114.1L285.6,112.7L289.5,115L293.8,113.7L295,111L299,111.6L308.6,116.7L316.2,112.9L316.9,117.2L323.9,116.3L326.1,114.6L333,114.9L341.7,117.3L355,119.4L362.8,120.4L368.4,120L376,122.9L368,125.7L378.3,126.9L393.7,126.3L398.5,125.3L404.6,128.7L410.8,125.8L405,123.4L408.6,121.4L415.6,121.2L420.1,120.6L424.7,122L430.4,125.1L436.8,124.6L446.8,127.2L455.7,126.3L464,126.4L463.3,122.9L468.4,121.9L477.2,123.8L477.2,129.2L480.8,124.6L485.3,124.8L487.9,119.1L481.8,115.6L475.2,113.3L475.6,107L482.4,102.9L489.9,103.8L495.6,106.3L503.4,112.7L498.3,115.5L508.9,116.6L508.9,122.5L516.5,118L523.3,121.7L521.6,125.9L527.1,129.7L533,125.6L537.2,120.7L537.5,114.4L545.6,114.9L554,115.7L561.6,118.5L561.9,121.4L557.7,124.4L561.7,127.4L561,130.2L549.9,134.2L541.9,135.1L536.1,133.4L534.4,136.2L528.9,141L527.2,143.5L520.6,147.3L512.5,147.7L508,150.1L507.6,153.8L501,154.5L494,159.1L487.9,165.6L485.7,170L485.3,176.6L493.7,177.6L496.3,182.9L498.9,187.2L506.9,186.1L517.5,188.6L523.2,190.7L527.2,193.4L534.4,195L540.4,197.4L549.8,197.7L556,198.3L555,203.2L556.8,208.9L560.9,215.3L569.4,220.7L573.8,218.8L576.8,213L573.9,204L569.9,201L579,198.3L585.4,194.3L588.6,190.4L588.1,186.6L584.2,181.7L577.3,177.5L584,171.5L581.6,166.4L579.7,157.5L583.6,156.2L593.4,157.7L599.2,158.3L603.9,156.8L609.2,158.7L616.2,162L618,164.2L628.1,164.6L627.9,169.4L629.8,176.6L635,177.5L639.1,180.8L647.4,177.7L652.8,171.4L656.6,168.8L661,173.8L668.4,181.1L674.7,187.9L672.4,191.5L680,194.7L685.1,198L694.2,199.4L697.8,201.2L700.1,206L704.5,206.8L706.8,209L707.2,215.3L703.1,217.5L699,219.5L689.6,221.5L682.5,226.2L672.9,227.1L660.7,225.9L652.2,225.9L646.3,226.3L641.5,230.3L634.2,232.9L626,240.4L619.5,245.6L624.3,244.7L633.5,237.2L645.4,232.5L653.9,231.9L658.9,234.7L653.6,238.5L655.4,244.7L657.2,249L664.6,251.8L674,251L679.7,244.6L680.1,248.7L683.8,250.8L676.8,254.5L664.2,257.9L658.5,260.2L652.2,264.3L647.8,263.9L647.6,259L657.5,254.3L648.4,254.5L642.1,255.2L638.3,252L638.3,244.2L635.8,242.6L632,243.6L630.1,242.1L625.8,246.4L624,250.8L622,253.4L619.6,254.3L617.8,254.5L617.2,256L606.7,256L598.1,256L595.5,257L589.5,261.1L588.8,261.6L587,263.8L581.8,263.8L576.2,263.8L573.6,264.7L574.5,265.8L575,267.6L574.9,268.2L567.5,271L561.6,271.9L555,274.9L553.6,274.9L551.7,274L551,273.2L551.1,272.6L552.4,270.6L555.1,267.5L556.7,264.1L555.6,259.2L554.4,254L548.4,251.4L549.2,250.3L548.3,249.6L546.8,249.6L545.6,248.7L545.3,247.4L544.2,248L542.7,247.8L543,247.2L541.7,246.7L541.1,245.2L536.7,243.4L532.1,241.5L526.6,239.3L521.2,237.2L516.1,238.8L514.3,238.9L507.3,237.4L502.7,238.1L497.2,236.4L491.3,235.5L487.4,235.1L485.6,234.2L484.6,231L482.7,231.1L482.7,233.2L470.9,233.2L451.4,233.2L432.1,233.2L415,233.2L397.9,233.2L381.2,233.2L363.8,233.2L358.2,233.2L341.3,233.2L325.2,233.2Z M546.2,156.7L550.4,154.1L558.2,154.1L558.1,155.2L551.4,158.4L547.4,158.3L546.2,156.7Z M570.2,97.8L563.9,94.8L564.1,92.8L566.9,92.4L579.9,93L589.7,96.1L590.2,97.7L584.2,97.5L578,97.4L571.8,98.2L570.2,97.8Z M567.1,158.8L569.3,157.1L571.6,157.2L573.1,158.4L570.8,161.4L568.3,160.9L566.8,159.2L567.1,158.8Z M491.4,85.4L488.4,87.7L480.1,87.2L473.2,85.7L476.2,83.2L484.4,81.7L489.4,83.6L491.4,85.4Z M490.2,71L487.6,71.2L476.9,70.8L475.4,69.2L486.8,69.3L490.8,70.3L490.2,71Z M473.6,63.9L480.4,65.9L478.8,67.9L470.4,69.1L465.8,67.8L463.3,65.7L462.9,63.3L470.3,63.5L473.6,63.9Z M522.5,88.8L513.3,88.1L498.2,86.3L496.3,83.1L495.6,80.3L489.8,77.8L478.1,77.1L471.5,75.4L473.6,73L485.4,73.4L491.7,75.2L502.9,75.2L507.8,77.1L506.5,79.2L513,80.5L516.6,81.9L524.3,82.1L532.6,82.6L541.6,81.4L553.2,80.9L562.5,81.3L568.6,83.4L569.8,85.8L566.3,87.3L557.8,88.5L550.5,87.8L534.2,88.7L522.5,88.8Z M391,67.4L399.1,68.3L397.2,70L386.6,71.6L378.1,69.8L382.7,68L391,67.4Z M392.7,63.7L400.1,64.8L393.2,66L383.8,65.9L383.9,65.1L389.7,63.4L392.7,63.7Z M707.7,220.1L704.7,223.6L700.9,228.6L704.6,226.7L708.4,227.9L706.4,229.9L711.5,231.5L714.1,230.1L719.8,231.8L718,236L722,235L722.7,238L724.5,241.6L722.1,246.6L719.5,246.8L715.8,245.7L717,241.1L715.4,240.3L708.8,245.3L705.4,245.1L709.5,242.4L704,241L697.9,241.4L686.8,241.2L686,239.5L689.5,237.5L687,236L691.8,232.5L697.7,223.5L701.2,220.2L706.2,218.3L708.8,218.5L707.7,220.1Z M546.8,141.6L553,143.5L559.5,145.3L560.1,148L564.2,147.6L568.3,149.5L563.3,151.3L554.4,149.9L551.2,147.3L545.6,150.4L537.5,153.3L535.5,150L527.8,150.5L532.7,147.7L533.5,143.2L535.4,138L539.5,138.5L540.6,141L543.5,140.1L546.8,141.6Z M575.9,100.4L581.3,98.1L593.9,101L601.7,103.7L602.5,106.2L613,104.9L619,108.5L632.7,110.8L637.6,113.1L643,118.4L632.6,121.1L646,124.8L655,126L663.2,131.3L672.1,131.6L670.4,135.6L660.4,142.2L653.4,139.8L644.4,134.3L637.1,135L636.4,138.3L642.3,141.6L650.1,144.2L652.4,145.7L656.1,151.4L654.1,155.5L647,153.9L632.7,149.4L640.7,154.3L646.7,157.7L647.6,159.7L632.2,157.4L620,154.1L613.1,151.3L615,149.7L606.6,146.8L598.3,144L598.4,145.7L581.9,146.6L577.1,144.7L580.9,140.5L591.5,140.4L603.3,139.6L601.4,137.6L603.3,134.8L610.7,129.2L609.1,126.7L606.9,124.8L598.2,122L586.7,120.1L590.3,118.6L584.3,115.1L579.3,114.8L574.8,112.8L571.8,114.5L561.5,115.2L540.8,114L528.7,112.3L519.5,111.4L514.8,109.4L520.7,106.8L512.6,106.8L510.8,101.1L515.2,96L521.1,93.7L535.7,92.1L531.6,95.8L536,99.4L541.3,94.8L555.7,92.4L565.5,98.3L564.6,102L575.9,100.4Z M486.4,90.3L498.2,90.5L509.1,91.8L500.6,96.9L493.8,98L487.7,102.3L481.2,102L477.7,97.1L477.8,94.2L480.7,91.8L486.4,90.3Z M325.1,79L325.1,79L334.7,74.7L346.4,71L355.2,71.1L363,70.3L362.2,74.7L357.8,76.6L352.5,76.9L341.9,79.3L332.8,80.2L325.1,79Z M269,204.6L274.5,204.1L272.8,210.6L277.7,215.2L275.5,215.1L272,212.5L269.9,209.9L267.1,208.1L266,205.6L266.4,203.8L269,204.6Z M423.9,60.9L435,61.6L450.4,63.7L454.8,66.4L457,68.8L447.7,68.2L438.3,66.3L425.7,66.1L431.2,64.4L424.3,63L423.9,60.9Z M321.4,236L318.5,236.8L309.2,234.2L307.5,232.2L302.4,230.2L301.3,228.6L295.5,227.6L293.3,224.5L293.8,223.2L299.8,224.4L303.2,225.3L308.6,225.9L310.5,227.8L313.3,230.5L319,232.9L321.4,236Z M332.6,88.5L340.7,89.6L355.2,90L360.8,91.6L366.9,94L359.7,95.4L345.8,99.4L338.7,103.4L338.7,105.9L323.7,108.6L320.7,106.2L307.6,103.1L310,100.7L314,96.6L318.9,92.8L313.4,89.4L332.6,88.5Z M410.6,80.5L415.7,79.6L421.7,79.8L422.7,82.6L419.2,85.3L399.9,86.2L385.6,88.7L376.9,88.8L376.2,86.9L388,84.4L362.3,85.1L354.4,84.1L362.1,78.5L367.5,76.9L383.5,78.8L393.6,82.2L403.5,82.6L395.4,77.2L400.6,75.1L406.5,75.8L408.4,78.5L410.6,80.5Z M418,96.3L424.4,98.6L427.9,104.1L429.7,108.1L439.3,110.9L449.5,113.6L448.9,116.1L439.6,116.6L443.2,118.8L441.3,120.9L431,120L421.2,118.4L414.6,118.8L403.9,120.7L389.5,121.6L379.4,122.1L376.3,119.4L368.5,117.9L363.5,118.5L356.5,114L360.3,113.4L369,112.4L377.1,112.7L384.5,111.7L373.5,110.4L361.3,110.8L353.3,110.7L350.3,108.6L363.4,106.3L354.7,106.4L344.7,104.9L349.5,100.6L353.5,98.4L368.7,94.9L374.5,96L371.7,98.7L384.3,97L392.2,99.8L398.7,96.9L403.9,98.8L408.5,104.4L411.4,102L407.3,96.2L412.4,95.4L418,96.3Z M452.6,98.4L446.4,94.7L453.1,91.9L459.9,93.1L470,92.4L471.5,94L466.2,96.8L474.8,99.2L473.8,104.3L464.4,106.5L459,106.1L455,103.9L440.9,99.5L441,97.7L452.6,98.4Z M417.6,93.3L425.2,93.1L429.5,94.3L424.5,98.1L415.6,94.1L417.6,93.3Z M463.6,75.5L468,78.2L468.2,81.1L465.6,85.3L456.2,85.9L450.1,85L450.2,81.7L440.9,82.1L440.5,77.7L446.6,77.9L455.2,76L463.2,76.3L463.6,75.5Z M477.8,53.5L481.7,51.7L487.5,51.3L485.1,50L498.3,49.7L505.6,52.8L515.1,54L524.5,55.1L529,58.8L535.8,60.7L528,62.4L517.5,66.6L507.4,67L495.6,66.3L489.5,64L489.6,61.9L494.1,60.4L483.7,60.5L477.4,58.6L473.8,56L477.8,53.5Z M503,46.1L511.4,45L518.1,44.8L529.2,43.9L537.6,41.8L544.7,42.1L550.8,43.7L555.1,40.6L562.6,39.7L572.8,39.1L590.2,38.8L593.2,39.5L609.7,38.5L622,38.9L634.3,39.2L649.5,39.7L661.7,40.4L672.1,41.9L671.9,43.5L658,45.9L644.2,47.1L639.1,48.3L651.5,48.3L638.1,51.8L628.8,53.4L619.1,58L607.3,59L603.7,60.1L586.5,60.7L594.3,61.5L590.4,62.5L595.1,65.3L589.7,67.2L580.9,68.8L578.2,71.1L570.3,72.8L571.1,74.1L580.8,73.8L580.9,75.2L565.7,78.6L550.8,77.1L534.1,77.9L525.7,77.3L514.9,77L514.2,74.2L524.7,72.9L521.9,68.8L525.4,68.4L540.6,70.9L532.8,67.2L523.6,66.2L528.2,64L538.3,62.6L539.9,60.6L531.9,58.4L529.5,55.5L545,55.7L549.5,56.3L558.4,54.2L545.6,53.6L525.7,54L515.6,52L510.9,49.7L504.2,48.1L503,46.1Z M596.1,128.3L592.4,130L586,130.3L584.6,127.5L587,124.3L592.2,123.5L596.7,125.1L596.7,127.5L596.1,128.3Z M476.4,116.7L479.9,118.9L476.3,120.8L468.7,119.1L464,119.7L456.3,117.2L461.3,115.4L465.2,113L471.3,114.6L474.7,115.6L476.4,116.7Z M657,228.3L658.9,227.8L666.4,229.2L672.2,231.6L672.4,232.6L669.6,232.7L662.2,231L657,228.3Z M659.8,244.4L661.8,247.2L665.9,247.9L671.2,247.8L668.4,250.1L666.3,250.5L659.1,248.1L657.7,246.2L659.8,244.4Z"},{"name":"United States of America","fill":"#f7d794","d":"M325.2,233.2L341.3,233.2L358.2,233.2L363.8,233.2L381.2,233.2L397.9,233.2L415,233.2L432.1,233.2L451.4,233.2L470.9,233.2L482.7,233.2L482.7,231.1L484.6,231L485.6,234.2L487.4,235.1L491.3,235.5L497.2,236.4L502.7,238.1L507.3,237.4L514.3,238.9L516.1,238.8L521.2,237.2L526.6,239.3L532.1,241.5L536.7,243.4L541.1,245.2L541.7,246.7L543,247.2L542.7,247.8L544.2,248L545.3,247.4L545.6,248.7L546.8,249.6L548.3,249.6L549.2,250.3L548.4,251.4L554.4,254L555.6,259.2L556.7,264.1L555.1,267.5L552.4,270.6L551.1,272.6L551,273.2L551.7,274L553.6,274.9L555,274.9L561.6,271.9L567.5,271L574.9,268.2L575,267.6L574.5,265.8L573.6,264.7L576.2,263.8L581.8,263.8L587,263.8L588.8,261.6L589.5,261.1L595.5,257L598.1,256L606.7,256L617.2,256L617.8,254.5L619.6,254.3L622,253.4L624,250.8L625.8,246.4L630.1,242.1L632,243.6L635.8,242.6L638.3,244.2L638.3,252L642.1,255.2L643,257.1L637,259.8L631.1,261.8L625.1,263.5L622.1,266.9L621.1,268.1L621.1,271.2L623,274.2L625.3,274.3L624.7,272.2L626.4,273.5L626,275.1L622.1,276.1L619.4,275.9L615.2,276.9L612.7,277.2L609.4,277.5L604.7,279.1L613,278.1L614.7,279.2L606.7,280.9L603.1,280.9L603.3,280.2L601.6,281.8L603.2,282L602,286.1L597.9,290.5L597.4,289L596.2,288.7L594.3,287.3L595.5,290.4L596.9,291.4L597,293.5L595.2,295.7L592,300.3L591.5,300.1L593.2,296.2L590.3,294L589.7,289.3L588.6,291.7L589.8,295.3L586,294.5L589.9,296.3L590.2,301.7L591.8,302.1L592.4,304.1L593.2,309.8L589.6,314L583.7,315.7L580,319L577.1,319.4L574.2,321.5L573.4,323.4L567.2,327.1L564,329.8L561.3,333.1L560.4,337.2L561.4,341.1L563.3,346L565.8,350L565.9,352.5L568.6,359.1L568.4,362.9L568.1,365.1L566.7,368.6L565,369.3L562.2,368.6L561.3,366.1L559.2,364.8L556.1,359.9L553.5,355.6L552.6,353.4L553.8,349.6L552.2,346.5L547.8,341.7L545.6,340.8L539.8,343.4L538.8,343.1L536,340.5L532.5,339.1L526,339.8L521,339.1L516.7,339.5L514.3,340.4L515.3,341.9L515.2,344.2L516.5,345.4L515.4,346.1L513.3,345.3L511.1,346.4L507,346.2L502.7,343.2L497.8,343.9L493.6,342.6L490.1,343L485.3,344.3L480.1,348.5L474.5,351L471.4,353.7L470.1,356.2L470,360.2L470.3,362.9L471.4,364.8L469.2,365L465.1,363.7L460.7,362L459.1,359.3L457.8,355.3L454.5,352.1L452.5,348.8L449.7,344.9L445.7,342.6L441,342.7L437.4,347.2L432.7,345.5L429.8,343.8L428.3,340.6L426.5,337.7L423.1,335.2L420.2,333.4L418.1,331.4L408.2,331.4L408.2,333.7L403.7,333.7L392.4,333.7L379.4,329.7L370.8,327L371.4,325.9L364.1,326.5L357.7,326.9L356.7,324L353,320.7L350.4,320.1L349.8,318.4L346.6,318.1L344.5,316.6L339.2,316L337.8,315.1L337.1,312L331.6,306.3L326.8,298.4L327,297.1L324.5,295.2L320.1,290.4L319.3,285.8L316.3,282.7L317.6,277.9L317.4,273.1L315.5,268.7L317.8,263.3L318.5,258.2L319.2,253L318.1,245.4L316.3,240.5L314.7,237.9L315.4,236.8L323.6,238.7L326.6,244.1L328,242.6L327.1,237.9L325.2,233.2Z M139.9,397.8L140.9,398.3L141.9,399L143.3,401L143.2,401.3L141,402.5L139.1,403.4L138.3,404.4L136.9,403.6L137.1,402L136.1,399.9L136.4,399.3L137.4,398.4L137,397.2L137.3,396.7L137.8,396.8L139.9,397.8Z M136.6,393.9L136.1,394.6L134.2,395L133.2,393.8L132.5,393.3L132.5,392.9L133,392.5L135.1,393L136.6,393.9Z M132.2,391.5L132,392.1L129,392L129.4,391.3L132.2,391.5Z M125,388.5L125.5,388.8L127.1,390.7L126.8,391L126.4,391L124.4,390.8L123.7,389.5L123.5,389.2L125,388.5Z M117.4,385.6L117.5,386.9L116.8,387.5L114.9,386.5L115.2,386.1L116.1,385.5L117.4,385.6Z M77,168.5L81.5,169L82,171.2L78.5,172.1L74.8,171L71.4,169.5L77,168.5Z M152.3,182.2L156.1,182.6L158.5,184.4L153.6,187.1L147.9,189.2L145,187.8L144.1,185.1L149.3,183.1L152.3,182.2Z M221.9,115.4L221.9,115.4L221.9,136.5L221.9,168.9L227.5,169.1L233,170.7L237,173.2L242,176.9L247.6,173.7L253.3,171.9L256.3,174.8L260.1,177.1L265.4,179.7L268.9,183.8L274.7,190.3L284.4,193.9L284.6,197.5L281.4,200.2L281.4,200.2L281.4,200.2L278.3,198.1L273.3,196.3L271.6,191.3L264.3,186.7L261.2,181.3L255.8,181L246.7,180.8L240.1,179.2L228.3,173.3L222.9,172.2L212.9,170.2L205,170.7L193.8,168.1L187.1,165.6L180.8,166.8L181.9,170.8L178.8,171.2L172.2,172.3L167.2,174.3L160.9,175.5L160.1,172.1L162.6,166.5L168.7,164.8L167.1,163.4L159.9,166.5L156,170.3L147.8,174.4L152,177.1L146.6,181.2L140.5,183.6L134.8,185.3L133.4,187.8L124.5,190.8L122.7,193.5L116,195.9L112.1,195.4L106.8,197L101,199L96.3,200.9L86.6,202.5L85.7,201.5L91.9,198.9L97.5,197.1L103.5,194L110.6,193.4L113.4,191L121.3,187.6L122.5,186.5L126.7,184.5L127.7,180.2L130.6,176.8L124,178.5L122.2,177.6L119.1,179.6L115.4,176.7L113.9,178.8L111.8,176L106.1,178.2L102.6,178.2L102.1,174.8L103.1,172.8L99.5,170.7L92.1,171.8L87.3,169.1L83.4,167.8L83.3,164.6L79,162.1L81.2,158.9L85.8,155.7L87.8,152.8L92.4,152.4L96.3,153.3L100.9,150.5L105,151L109.4,149.2L108.3,146.6L105.1,145.6L109.4,143.4L105.9,143.5L99.8,144.7L98.1,146L93.6,144.7L85.6,145.4L77.2,144L74.8,141.7L67.6,138.4L75.6,136L88.3,133.3L93,133.3L92.2,136.1L104.2,135.9L99.6,132.3L92.6,130.2L88.6,127.3L83.1,124.9L75.3,123.1L78.5,120.1L88.6,119.9L95.8,117.4L97.1,114.6L102.9,111.9L108.5,111.2L119.2,108.7L124.5,109.1L133.2,106.1L141.8,107.2L146,109.8L148.5,108.7L158.1,109.1L157.8,110.4L166.5,111.3L172.3,110.8L184.2,112.6L195.2,113.1L199.6,113.8L207.1,112.9L215.8,114.6L221.9,115.4L221.9,115.4Z M47,149.1L50.5,150.2L54.1,149.6L58.7,151.1L64.3,151.9L63.9,152.5L59.6,153.7L55.2,152.5L53.1,151.5L48.1,151.8L46.7,151.3L47,149.1Z"},{"name":"Kazakhstan","fill":"#70a1ff","d":"M1521,232L1516.7,235.8L1511.9,236.3L1511.7,242L1508.5,244.6L1497.2,242.7L1493.1,252.9L1490.2,254.2L1478.9,256.5L1484,266.4L1480.1,267.8L1480.6,271.1L1477.1,270.2L1474.2,268.2L1465.8,267.6L1456.4,267.4L1454.3,268.1L1446.2,265.7L1443,266.9L1442.1,270.2L1432.7,268.3L1429,269.1L1427.7,271.6L1424.4,272.6L1416.9,276.6L1414.4,280.6L1412.3,280.7L1410.8,278L1403.5,277.8L1402.4,273.1L1399.6,273.1L1400,267.4L1393.2,263.2L1383.5,263.7L1376.8,264.5L1371.4,259.4L1366.7,257.2L1357.9,253.2L1356.8,252.7L1342.2,256L1342.4,277L1339.5,277.3L1335.5,272.8L1331.7,271.2L1325.2,272.4L1322.7,274.3L1322.4,272.9L1323.8,270.5L1322.7,268.6L1316.1,266.6L1313.5,261.5L1310.4,260.1L1310.2,258.2L1315.7,258.8L1315.9,254.6L1320.8,253.7L1325.7,254.5L1326.8,249L1325.8,245.5L1320.1,245.7L1315.2,244.3L1308.6,246.8L1303.3,248L1300.4,247.1L1301,244.2L1297.4,240.4L1293.2,240.5L1288.3,236.7L1291.6,232.4L1290,231.2L1294.5,225L1300.4,228.3L1301.1,224.1L1312.8,217.9L1321.7,217.8L1334.2,221.7L1341,224L1347,221.6L1356,221.5L1363.3,224.5L1365,222.8L1372.9,223L1374.4,220.3L1365.1,216.4L1370.6,213.6L1369.5,212.1L1375,210.6L1370.9,206.7L1373.5,204.8L1394.8,202.8L1397.6,201.4L1411.8,199.3L1416.9,196.9L1427.1,198.1L1428.9,204L1434.9,202.7L1442.2,204.6L1441.7,207.7L1447.2,207.4L1461.4,202L1459.3,203.8L1466.6,208.2L1479.3,222.6L1482.3,219.7L1490.2,222.9L1498.4,221.5L1501.5,222.5L1504.2,225.8L1508.2,226.9L1510.6,229.3L1518,228.5L1521,232Z"},{"name":"Uzbekistan","fill":"#ff9f43","d":"M1342.4,277L1342.2,256L1356.8,252.7L1357.9,253.2L1366.7,257.2L1371.4,259.4L1376.8,264.5L1383.5,263.7L1393.2,263.2L1400,267.4L1399.6,273.1L1402.4,273.1L1403.5,277.8L1410.8,278L1412.3,280.7L1414.4,280.6L1416.9,276.6L1424.4,272.6L1427.7,271.6L1429.4,272.1L1424.6,275.8L1428.8,277.9L1432.9,276.5L1439.6,279.5L1432.3,283.6L1428,283.1L1425.6,283.2L1424.8,281.6L1426,279L1418.4,280.3L1416.6,284L1413.9,287.1L1409.1,286.8L1407.7,289.3L1411.8,290.7L1413.1,294.9L1409.9,300.7L1405.6,299.5L1402.4,299.4L1402.6,296L1395,293.5L1389.1,290.7L1385.3,288.1L1378.8,284.1L1376,278.3L1374.1,277.2L1368,277.5L1365.8,276.3L1365.2,271.8L1357.5,268.8L1352.7,272.1L1347.9,274.1L1348.8,276.9L1342.4,277Z"},{"name":"Papua New Guinea","fill":"#e056fd","d":"M1826.1,526.8L1836,530.7L1846.5,534L1850.4,536.9L1853.6,539.7L1854.5,543.1L1864,546.6L1865.3,549.6L1860.1,550.2L1861.4,554L1866.4,557.8L1870.1,563.8L1873.4,563.6L1873.2,566.1L1877.6,567.1L1875.8,568.2L1881.9,570.6L1881.3,572.2L1877.5,572.6L1876.1,571.1L1871.2,570.5L1865.5,569.6L1861,566L1857.8,562.9L1854.9,557.9L1847.4,555.4L1842.6,557L1839.1,558.9L1839.9,563.1L1835.4,565.1L1832.2,564.1L1826.3,563.9L1826.2,545.3L1826.1,526.8Z M1892.4,532.8L1894.5,534.6L1895.2,537.6L1893.4,539.1L1892.3,535.8L1891,533.6L1888.4,531.7L1885.2,529.3L1881.1,527.6L1882.7,526.2L1885.8,527.8L1887.7,529.1L1890.1,530.4L1892.4,532.8Z M1884.7,545.2L1881.6,546.6L1878.7,547.9L1875.7,547.9L1871,546.3L1867.8,544.7L1868.2,542.9L1873.3,543.8L1876.5,543.3L1877.3,540.6L1878.1,540.5L1878.7,543.5L1881.9,543L1883.5,541.1L1886.7,539.1L1886.1,535.7L1889.5,535.6L1890.6,536.5L1890.5,539.7L1888.6,543.2L1885.6,543.6L1884.7,545.2Z M1904.4,542.4L1906.1,543.7L1908.9,547.3L1911.6,549.2L1910.8,550.8L1909.2,551.4L1906.7,549.2L1904.2,545.6L1903,541.2L1903.8,540.7L1904.4,542.4Z"},{"name":"Indonesia","fill":"#10ac84","d":"M1826.1,526.8L1826.2,545.3L1826.3,563.9L1821.3,559.2L1815.5,558.1L1814.1,559.7L1806.9,559.9L1809.3,555.2L1812.9,553.6L1811.4,547.5L1808.7,542.7L1797.6,537.9L1792.9,537.4L1784.4,532.1L1782.7,534.9L1780.5,535.4L1779.2,533.3L1779.2,530.8L1774.9,528L1781,526L1785.1,526.1L1784.6,524.6L1776.3,524.6L1774,521.2L1768.9,520.1L1766.5,517.3L1774.2,516L1777.1,514.1L1786.2,516.4L1787.1,518.6L1788.7,527.8L1794.6,531.2L1799.4,525.1L1805.9,521.7L1810.9,521.7L1815.8,523.7L1820,525.7L1826.1,526.8Z M1734.9,562.6L1735.5,563.7L1735.6,565.4L1731.9,569.7L1727,570.9L1726.4,570.3L1726.9,568.3L1729.3,564.8L1734.9,562.6Z M1787.5,551.2L1787,546.9L1788,544.9L1789.2,543L1790.4,544.6L1790.4,547.4L1787.5,551.2Z M1694.6,488.5L1691.4,493.6L1695.6,499L1694.6,501.6L1701,506.9L1694.2,507.5L1692.3,511.4L1692.6,516.6L1687.1,520.5L1686.9,526.1L1684.8,534.8L1683.9,532.8L1677.5,535.4L1675.2,531.9L1671.1,531.6L1668.3,529.7L1661.5,531.8L1659.5,529L1655.7,529.3L1651.1,528.7L1650.2,521.1L1647.3,519.5L1644.6,514.6L1643.8,509.6L1644.5,504.4L1647.9,500.6L1648.8,504.4L1652.7,507.6L1656.4,506.4L1660,506.9L1663.3,504L1666,503.5L1671.4,505.1L1676.1,503.9L1679,495.9L1681.2,494L1683.1,487.5L1689.7,487.5L1694.6,488.5Z M1760,527.9L1766.2,529.6L1768.3,534L1763.5,531.6L1758.7,531.1L1755.5,531.5L1751.6,531.3L1753,528.2L1760,527.9Z M1745.8,533.6L1741.8,532.5L1740.7,530.1L1746.5,529.8L1747.9,531.7L1745.8,533.6Z M1751.8,499.6L1752.2,502.7L1755.6,503.2L1756.1,505.6L1755.8,510.5L1752.9,510L1752,513.4L1754.3,516.4L1752.7,517.1L1750.5,513.5L1748.8,506.2L1749.9,501.7L1751.8,499.6Z M1723.3,507L1729.9,506.8L1735.5,502.7L1736.5,503.9L1731.9,509.6L1727.6,510.7L1722.2,509.5L1712.7,509.8L1707.7,510.7L1706.9,515L1712,520L1715.1,517.4L1725.7,515.5L1725.2,518.1L1722.7,517.3L1720.3,520.6L1715.2,522.8L1720.6,530.1L1719.6,532.1L1724.7,538.6L1724.7,542.4L1721.6,544.1L1719.4,542.1L1722.1,537.4L1716.6,539.6L1715.1,538L1715.9,535.8L1711.8,532.5L1712.2,526.9L1708.4,528.7L1708.9,535.3L1709.1,543.4L1705.5,544.3L1703.1,542.6L1704.7,537.4L1703.8,531.9L1701.4,531.8L1699.7,527.9L1702,524.2L1702.8,519.7L1705.7,511.1L1706.9,508.8L1711.7,504.6L1716.1,506.2L1723.3,507Z M1708.3,570.4L1700.8,566.4L1706.1,565.3L1709.1,567L1711.1,568.7L1710.7,570.3L1708.3,570.4Z M1714.3,560.6L1718.1,560.1L1723.2,558L1722.4,561.2L1713.8,562.8L1706.2,562.1L1706.2,560L1710.7,558.9L1714.3,560.6Z M1696.8,559.6L1700.3,559.1L1701.7,561.5L1695.1,562.7L1691.2,563.4L1688.1,563.4L1690.1,560.1L1693.2,560.1L1694.7,558.1L1696.8,559.6Z M1641.2,548.5L1641.9,550.6L1652.8,551.1L1654.1,548.8L1664.7,551.5L1666.7,555.2L1675.3,556.2L1682.2,559.6L1675.7,561.8L1669.5,559.5L1664.3,559.7L1658.4,559.2L1653.1,558.2L1646.5,556L1642.3,555.5L1640,556.2L1629.6,553.8L1628.6,551.4L1623.4,551L1627.3,545.5L1634.2,545.9L1638.8,548.1L1641.2,548.5Z M1617.7,518.2L1618.7,522.1L1620.7,525.3L1624.9,525.8L1627.6,529.4L1626.2,536.5L1626,545.3L1619.7,545.4L1614.9,540.7L1607.6,536L1605.2,532.6L1600.8,527.9L1598,523.7L1593.7,515.7L1588.7,511L1587,506.1L1584.9,501.6L1579.8,498L1576.8,493.2L1572.5,490L1566.6,483.7L1566.1,480.8L1569.8,481.1L1578.6,482.2L1583.6,487.7L1588,491.6L1591.1,493.9L1596.5,500.1L1602.3,500.1L1607.1,504L1610.4,508.8L1614.7,511.4L1612.4,516.1L1615.7,518L1617.7,518.2Z"},{"name":"Argentina","fill":"#54a0ff","d":"M633.5,811.4L635.7,814.1L638.6,818.3L646,821.8L653.9,823.2L651.4,826L646,826.3L643.1,824.3L639.6,824.1L633.6,824.1L633.5,811.4Z M696.2,683.9L694.8,688.4L693.2,694.3L693.3,700L692.1,701.2L691.6,704.9L691.2,707.9L698.4,712.7L697.7,716.7L701.2,719.2L700.9,721.9L695.5,729.2L687,732.3L675.6,733.5L669.4,732.9L670.6,736.3L669.4,740.5L670.5,743.4L667,745.4L661.2,746.2L655.7,744.1L653.6,745.6L654.3,751.3L658.2,753L661.3,751.2L663,754.1L657.8,755.9L653.2,759.4L652.4,765.2L651,768.2L645.6,768.2L641.2,771.1L639.5,775.4L645.1,779.6L650.6,780.7L648.6,785.8L641.9,789L638.2,795.7L633,797.9L630.7,800.6L632.5,806.5L636.3,809.8L633.9,809.5L628.6,808.6L614.9,807.9L612.5,804.6L612.6,800.3L608.8,800.7L606.8,798.6L606.3,792.6L610.7,790.1L612.5,786.5L611.9,783.6L614.9,778.7L616.9,771.2L616.3,767.9L618.8,766.8L618.2,764.6L615.6,763.5L617.4,761.1L614.9,758.9L613.6,752.4L615.8,751.2L614.9,744.3L616.2,738.5L617.7,733.4L621.1,731.3L619.4,725.8L619.4,720.5L623.7,716.8L623.6,712.1L626.8,706.5L626.8,701.3L625.4,700.3L622.7,690.4L626.2,684.6L625.7,679.1L627.7,673.9L631.5,668.6L635.5,665L633.8,662.8L635,661L634.8,651.5L641,648.7L642.9,642.8L642.2,641.3L647,636.2L654.4,637.6L657.8,641.7L660,637.1L666.5,637.4L667.4,638.6L677.9,647.9L682.5,648.7L689.5,652.9L695.3,655.1L696.1,657.7L690.5,666.3L696.3,667.9L702.7,668.7L707.2,667.8L712.3,663.4L713.2,658.4L716.1,657.3L718.9,660.6L718.8,665.2L714,668.3L710.2,670.6L703.8,676.1L696.2,683.9Z"},{"name":"Chile","fill":"#e056fd","d":"M633.5,811.4L633.6,824.1L639.6,824.1L643.1,824.3L641.2,826.6L636.3,828.4L633.5,828.2L630.1,827.7L626,826L620.1,825.2L612.9,822L607.1,819L599.3,812.6L603.9,813.8L611.9,817.6L619.5,819.6L622.4,817L624.3,813.1L629.5,810.8L633.5,811.4Z M628.1,612L630.9,615.9L631.7,620L634.6,622.4L632.8,627.9L635.9,634.3L638.1,642.1L642.2,641.3L642.9,642.8L641,648.7L634.8,651.5L635,661L633.8,662.8L635.5,665L631.5,668.6L627.7,673.9L625.7,679.1L626.2,684.6L622.7,690.4L625.4,700.3L626.8,701.3L626.8,706.5L623.6,712.1L623.7,716.8L619.4,720.5L619.4,725.8L621.1,731.3L617.7,733.4L616.2,738.5L614.9,744.3L615.8,751.2L613.6,752.4L614.9,758.9L617.4,761.1L615.6,763.5L618.2,764.6L618.8,766.8L616.3,767.9L616.9,771.2L614.9,778.7L611.9,783.6L612.5,786.5L610.7,790.1L606.3,792.6L606.8,798.6L608.8,800.7L612.6,800.3L612.5,804.6L614.9,807.9L628.6,808.6L633.9,809.5L628.8,809.5L626.1,810.9L621,812.9L620.1,818.3L617.6,818.4L611.2,816.5L604.7,812.6L604.7,812.6L597.6,809.3L595.9,805.7L597.5,802.4L594.6,798.6L593.9,788.9L596.3,783.4L602.3,779L593.7,777.4L599.1,772.3L601,762.9L607.3,764.9L610.3,753.1L606.5,751.6L604.7,758.7L601.1,757.9L602.9,749.8L604.9,739.2L607.5,735.3L605.8,729.8L605.4,723.4L607.8,723.2L611.3,714L615.2,704.9L617.6,696.4L616.3,687.9L618,683.2L617.3,676.2L620.6,669.2L621.7,658.2L623.5,646.4L625.3,633.7L624.8,624.4L623.7,616.4L626.6,614.9L628.1,612Z"},{"name":"Dem. Rep. Congo","fill":"#cf6a87","d":"M1190.9,537.6L1191.9,542.8L1191.4,545.8L1192.5,549.1L1195.8,552.3L1198.9,559.4L1198.9,559.4L1196.6,558.9L1189,559.8L1187.5,560.5L1185.8,564.1L1187.1,566.6L1186.1,573.4L1185.4,579.1L1186.9,580.1L1190.9,582.3L1192.5,581.3L1193,587.4L1188.6,587.4L1186.3,584.2L1184.2,581.8L1179.8,581L1178.5,578L1175.1,579.8L1170.5,579L1168.6,576.5L1165,575.9L1162.3,576.1L1162,574.3L1160,574.2L1157.4,573.8L1153.9,574.7L1151.4,574.5L1150,575.1L1150.3,568.3L1148.4,566.2L1148,562.7L1148.9,559.3L1147.7,557.1L1147.6,553.5L1140.7,553.5L1141.2,551.5L1138.3,551.5L1138,552.5L1134.5,552.7L1133,556L1132.2,557.4L1129,556.6L1127.2,557.4L1123.4,557.9L1121.2,554.9L1119.9,553.1L1118.3,549.7L1116.9,545.4L1100.1,545.4L1098.1,546L1096.4,545.9L1094.1,546.7L1093.3,544.9L1094.8,544.3L1094.9,541.9L1095.9,540.4L1097.9,539.2L1099.4,539.8L1101.4,537.6L1104.5,537.7L1104.8,539.3L1107,540.3L1110.3,536.7L1113.6,533.9L1115.1,532.1L1114.9,527.4L1117.3,521.9L1119.9,519L1123.7,516.2L1124.3,514.4L1124.5,512.3L1125.4,510.4L1125.1,507.1L1125.8,502.1L1126.9,498.5L1128.6,495.5L1129,492.1L1129.5,488.1L1131.7,485.2L1134.8,483.4L1139.4,485.3L1143.1,487.4L1147.2,488L1151.5,489.1L1153.2,485.6L1153.9,485.2L1156.5,485.8L1162.9,482.9L1165.1,484.1L1167,484L1167.8,482.6L1169.9,482.1L1174.2,482.7L1177.9,482.8L1179.7,482.2L1183.2,486.9L1185.7,487.6L1187.3,486.7L1189.9,487L1193.1,485.8L1194.4,488.3L1199.4,492L1199.4,492L1199.1,498.7L1201.3,499.5L1199.5,501.5L1197.3,503L1195.2,506L1194,508.6L1193.6,513.2L1192.3,515.3L1192.3,519.6L1190.6,521.2L1190.4,524.6L1189.6,525L1189.1,528.2L1190.6,530.7L1190.9,537.6Z"},{"name":"Somalia","fill":"#c8d6e5","d":"M1260.6,521.6L1257.2,516.9L1257.1,496.2L1262.1,489.7L1263.7,487.9L1267.3,487.8L1272.4,483.8L1279.8,483.5L1295.9,466.5L1299.8,461.7L1302.4,458.2L1302.4,455.3L1302.4,449.5L1302.4,447.2L1302.5,447.1L1302.5,447.1L1304.3,447L1306.9,446.1L1309.9,445.6L1312.6,443.6L1314.8,443.6L1314.9,445.2L1314.4,448.5L1314.4,451.5L1313.2,453.5L1311.6,459.7L1308.8,466L1305.3,473.3L1300.4,481.6L1295.6,488L1288.9,495.8L1283.2,500.4L1274.7,506L1269.4,510.3L1263.2,517.2L1261.9,520.2L1260.6,521.6Z"},{"name":"Kenya","fill":"#55efc4","d":"M1247,538.6L1238.9,532.9L1238.5,529.6L1217.8,518L1216.9,517.4L1216.8,511.4L1218.4,509.1L1221.2,505.3L1223.3,501.2L1220.8,494.6L1220.1,491.8L1217.5,487.8L1221,484.4L1224.8,480.7L1227.8,481.6L1227.8,484.8L1229.7,486.7L1233.7,486.7L1240.9,491.5L1242.7,491.6L1244,491.4L1245.3,492.1L1249,492.5L1250.7,490.2L1255.9,487.8L1258.2,489.7L1262.1,489.7L1257.1,496.2L1257.2,516.9L1260.6,521.6L1256.6,523.8L1255.2,526.2L1253.1,526.6L1252.2,530.6L1250.4,532.9L1249.3,536.7L1247,538.6Z"},{"name":"Sudan","fill":"#ffb142","d":"M1163.8,465.2L1159.4,462.7L1157.5,461.1L1157.1,459.3L1158,456.9L1158,454.6L1154.7,451L1154.1,448.6L1154.1,447.2L1152,445.6L1152,442.3L1150.8,440.1L1148.8,440.4L1149.4,438.3L1150.8,435.9L1150.2,433.6L1152.1,431.8L1150.9,430.5L1152.4,427L1155,422.8L1159.9,423.2L1159.6,400.6L1159.7,398.2L1166.2,398.2L1166.2,386.8L1189.1,386.8L1211.2,386.8L1233.7,386.8L1235.6,392.4L1234.3,393.5L1235.1,399.3L1237.2,406.1L1239.4,407.5L1242.5,409.6L1239.6,412.9L1235.4,413.8L1233.6,415.5L1233.1,419.3L1230.6,427.7L1231.2,430L1230.3,434.8L1228,440.4L1224.6,443.3L1222.2,447.6L1221.6,449.9L1218.9,451.5L1217.2,457.5L1217.3,462.6L1217.2,458.2L1216.4,458L1216.5,455.2L1215.8,453.3L1212.9,451L1212.2,446.9L1212.9,442.7L1210.3,442.3L1209.9,443.6L1206.5,443.9L1207.8,445.5L1208.3,449L1205.2,452.1L1202.4,456.2L1199.4,456.8L1194.6,453.5L1192.5,454.6L1191.9,456.3L1189,457.4L1188.8,458.5L1183.1,458.5L1182.3,457.4L1178.2,457.2L1176.2,458.1L1174.6,457.7L1171.7,454.3L1170.7,452.8L1166.6,453.6L1165.1,456.2L1163.6,461.3L1161.6,462.3L1159.9,463L1163.8,465.2Z"},{"name":"Chad","fill":"#706fd3","d":"M1159.6,400.6L1159.9,423.2L1155,422.8L1152.4,427L1150.9,430.5L1152.1,431.8L1150.2,433.6L1150.8,435.9L1149.4,438.3L1148.8,440.4L1150.8,440.1L1152,442.3L1152,445.6L1154.1,447.2L1154.1,448.6L1150.5,449.6L1147.6,451.9L1143.5,458.1L1138.1,460.7L1132.6,460.4L1131,460.9L1131.6,462.9L1128.6,464.9L1126.2,467.1L1119,469.3L1117.6,468L1116.7,467.9L1115.6,469.3L1110.9,469.8L1111.8,468.2L1110,464.3L1109.2,462L1106.7,461L1103.4,457.7L1104.6,455L1107.2,455.6L1108.8,455.2L1112,455.2L1108.9,450L1109.1,446.3L1108.7,442.5L1106.5,438.8L1107,436.2L1103.4,436L1103.4,432.4L1101,430.3L1103.5,422.8L1110.7,417.4L1111,410L1113.2,398.5L1114.5,396L1112.1,394.1L1112,392.3L1109.9,390.8L1108.5,381.9L1114.2,378.8L1136.9,389.7L1159.6,400.6Z"},{"name":"Haiti","fill":"#33d9b2","d":"M616,399.8L616.5,402.9L616.1,405.1L614.7,406.1L616.2,407.8L616.1,409.3L612.3,408.4L609.6,408.8L606.1,408.4L603.5,409.4L600.4,407.7L600.9,405.8L606.2,406.6L610.4,407.1L612.5,405.8L609.9,403.3L609.9,401.2L606.4,400.3L607.6,398.7L611.1,399L616,399.8Z"},{"name":"Dominican Rep.","fill":"#ff5252","d":"M616.1,409.3L616.2,407.8L614.7,406.1L616.1,405.1L616.5,402.9L616,399.8L616.7,398.9L621.2,398.9L624.6,400.4L626.1,400.2L627.1,402.2L630.2,402.1L630,403.8L632.6,404L635.3,406.1L633.2,408.4L630.5,407.2L627.9,407.4L626,407.2L625,408.2L622.8,408.6L622,407.2L620.1,408L617.8,411.9L616.3,411L616.1,409.3Z"},{"name":"Russia","fill":"#ff793f","d":"M2040.7,107.5L2048,105.2L2048,109L2041.8,109.3L2040.7,107.5Z M1303.3,248L1300.7,251.4L1295.2,252.4L1289.6,258.2L1294.7,263.6L1294.2,267.5L1300.4,274.2L1300.4,274.2L1297,276.4L1296,277.9L1293.5,277.5L1289.6,274.1L1288,273.9L1284.4,272.5L1282.7,270.2L1277.4,269L1273.9,269.9L1272.9,268.9L1265.2,266.1L1256.8,265.2L1252,264.2L1251.3,264.9L1244,260.1L1237.6,258L1232.6,254.6L1236.8,253.7L1241.5,248.9L1238.3,246.7L1246.7,244.4L1246.6,243.1L1241.4,244L1241.6,241.5L1244.6,239.9L1250.1,239.5L1251,237.6L1249.7,234.5L1252,231.5L1251.9,229.8L1243.6,228L1240.2,228L1236.7,225.4L1232.4,226.3L1225.1,224.3L1225.3,223.2L1223.2,220.7L1218.7,220.4L1218.2,218.6L1219.7,217.5L1216,214.3L1210.1,214.8L1208.4,214.5L1207,215.8L1204.8,215.6L1204.8,215.6L1203.4,212L1202.1,210.1L1203.2,209.5L1207.8,209.7L1210,208.5L1208.4,207L1204.5,206L1204.9,204.9L1202.5,203.9L1199,200.2L1200.2,198.6L1199.6,196L1194.1,194.6L1191.1,195.3L1190.3,193.9L1184.3,192.5L1182.5,189.1L1182,186.3L1179.2,185L1181.7,183.2L1180,177.9L1184,174.6L1183.2,173.7L1183.2,173.7L1189.6,170.5L1183.7,167.8L1183.7,167.8L1195.9,160.5L1201.2,157.3L1203.3,154.4L1194.9,150.5L1197.2,146.7L1192.1,142.5L1195.9,137.6L1189.3,131.2L1194.5,126.9L1185.8,123.1L1186.7,119.1L1191.3,118.6L1200.9,116.3L1200.9,116.3L1206.8,114.3L1216.1,117.8L1231.7,119.1L1253.2,125.5L1257.6,128.2L1258,132L1251.6,135L1242.4,136.5L1217,132.2L1212.8,132.9L1222.1,137.1L1222.4,139.7L1222.8,145.6L1230.1,147.3L1234.6,148.8L1235.3,146L1231.9,143.6L1235.5,141.4L1249.2,144.9L1254,143.6L1250.2,139.4L1263.5,133.8L1268.7,134.2L1274,136.1L1277.3,132.2L1272.6,128.8L1275.4,125.4L1271.2,121.9L1287.1,123.7L1290.4,126.9L1283.2,127.6L1283.2,130.8L1287.7,132.7L1296.5,131.5L1297.9,127.9L1309.7,125.2L1329.6,120.3L1333.9,120.6L1328.3,124L1335.3,124.6L1339.4,122.7L1350.1,122.5L1358.5,120.1L1365,123.6L1371.5,119.8L1365.5,116.5L1368.5,114.6L1385.3,116.4L1393.1,118.1L1413.8,124.6L1417.6,121.7L1411.8,118.6L1411.6,117.4L1404.8,116.9L1406.6,114.2L1403.6,109.7L1403.4,107.9L1413.9,102.8L1417.7,97.6L1421.9,96.5L1436.9,98L1438.1,101.1L1432.7,105.8L1436.3,107.6L1438.1,111.6L1436.8,119.3L1443.1,122.8L1440.6,126.6L1429.5,134.7L1436,135.6L1438.3,133.5L1444.5,132L1446,129.2L1451,126.5L1447.6,123.3L1450.3,119.5L1444.1,119.1L1442.7,115.9L1447.3,110.2L1439.9,105.5L1450,101.7L1448.7,97.7L1451.6,97.5L1454.6,100.7L1452.3,106.2L1458.4,107.2L1455.8,103.1L1465.3,100.9L1477.1,100.6L1487.6,103.8L1482.6,99.1L1482,93L1491.9,91.9L1505.6,92.1L1517.9,91.4L1513.3,88.4L1519.9,84.7L1526.4,84.5L1537.5,81.7L1552.5,80.9L1554.4,79.4L1569.3,78.8L1574,80.1L1586.8,77.1L1597.2,77.2L1598.8,74.7L1604.2,72.3L1617.6,70L1627.4,71.8L1619.7,73.2L1632.5,74.1L1634.1,76.9L1639.3,75.5L1655.9,75.6L1668.7,78.4L1673.3,80.5L1671.9,83.5L1665.6,85.2L1650.6,88.3L1646.4,90L1653.4,90.8L1661.8,92.2L1667,91.2L1669.9,94.8L1672.4,93.3L1681.5,92.4L1699.7,93.4L1701.1,96L1724.9,96.9L1725.2,92.5L1737.3,93.5L1746.4,93.5L1755.5,96.5L1758.2,100.1L1754.8,102.5L1761.9,107L1770.9,109.3L1776.4,103.3L1785.5,105.9L1795.2,104.4L1806.2,106.1L1810.4,104.5L1819.7,105.3L1815.6,100L1823.1,97.6L1874.5,101.3L1879.3,104.6L1894.2,109L1917.2,107.9L1928.5,108.8L1933.3,111.2L1932.6,115.4L1939.6,117L1947.2,115.8L1957.3,115.7L1968,116.8L1978.8,116.2L1988.7,121.2L1995.8,119.4L1991.2,115.8L1993.7,113.2L2011.8,114.8L2023.7,114.5L2040,117.2L2048,119.7L2048,142.3L2048,142.4L2040.6,144.9L2033.3,144.5L2038.4,147.5L2041.8,152.2L2044.4,153.7L2045.1,156.1L2043.6,157.6L2033,156.3L2017.1,160.6L2012,161.3L2003.3,165.3L1995.1,168.8L1993,171.3L1984.9,167.4L1970,171.9L1967.4,169.8L1962,172.2L1954.4,171.4L1952.5,175.2L1945.7,180.7L1945.9,183L1952.4,184.2L1951.6,192.5L1946.3,192.7L1943.9,197.5L1946.3,199.9L1936.3,202.8L1934.3,209.3L1925.9,210.7L1924.2,216.5L1916,221.8L1913.9,217.9L1911.4,209.6L1908.2,196.9L1911,189.1L1915.8,185.7L1916.1,183L1924.9,181.7L1935.1,174.6L1944.9,168.7L1955.1,164.2L1959.7,156.2L1952.8,156.6L1949.3,161.3L1934.9,167.6L1930.3,160.6L1915.6,162.5L1901.3,172L1906,175.5L1893.3,177L1884.5,177.6L1884.9,173.5L1876.1,172.6L1869.1,175.4L1851.7,174.4L1832.9,176.1L1814.5,187.2L1792.7,200.6L1801.7,201.4L1804.5,204.9L1810,206.2L1813.6,203.4L1819.9,203.7L1828.1,210L1828.3,214.8L1823.8,220.5L1823.4,227.3L1820.8,236.4L1812.2,244.6L1810.3,248.6L1802.6,255.2L1794.9,261.8L1791.3,265.1L1783.7,268.5L1780.1,268.5L1776.5,265.8L1768.9,269.9L1768,271.8L1768,271.8L1768,271.8L1768,271.8L1767.2,270.8L1767.2,270.8L1767.2,267.9L1770.1,267.8L1770.9,261.1L1769.4,256.2L1774.3,254.2L1781.2,255.2L1785,249.6L1787,243.4L1789.2,241.3L1792.1,236.2L1782.7,237.9L1777.8,240.1L1769.2,240.1L1766.9,234.8L1760.1,230.7L1750.2,228.9L1748.1,223.3L1746.1,219.9L1744,217.4L1740.5,211.7L1735.5,209.6L1727,207.9L1719.4,208L1712.4,209.1L1707.7,211.9L1710.8,213.2L1710.9,216.4L1707.7,218.2L1702.6,224.2L1702.6,226.7L1694.6,230.3L1687.8,228.2L1681,228.7L1678,226.8L1674.6,226.1L1666.3,230.2L1658.8,231.1L1653.5,232.5L1646.4,231.6L1641.1,231.6L1637.7,228.7L1632.1,226L1626.4,225.2L1619.2,226L1613.8,227L1605.7,224.7L1604.6,220.4L1597.9,218.9L1592.8,218.3L1586.4,215.9L1580.5,221.8L1582.8,225.2L1577.3,229.1L1569.1,227.7L1563.4,227.5L1559.6,224.8L1553.7,224.7L1548.7,223L1540.1,225.7L1529.2,230.6L1523.2,231.6L1521,232L1518,228.5L1510.6,229.3L1508.2,226.9L1504.2,225.8L1501.5,222.5L1498.4,221.5L1490.2,222.9L1482.3,219.7L1479.3,222.6L1466.6,208.2L1459.3,203.8L1461.4,202L1447.2,207.4L1441.7,207.7L1442.2,204.6L1434.9,202.7L1428.9,204L1427.1,198.1L1416.9,196.9L1411.8,199.3L1397.6,201.4L1394.8,202.8L1373.5,204.8L1370.9,206.7L1375,210.6L1369.5,212.1L1370.6,213.6L1365.1,216.4L1374.4,220.3L1372.9,223L1365,222.8L1363.3,224.5L1356,221.5L1347,221.6L1341,224L1334.2,221.7L1321.7,217.8L1312.8,217.9L1301.1,224.1L1300.4,228.3L1294.5,225L1290,231.2L1291.6,232.4L1288.3,236.7L1293.2,240.5L1297.4,240.4L1301,244.2L1300.4,247.1L1303.3,248Z M1557.5,51.1L1569.8,49.8L1580.9,52.6L1594,58.1L1592.5,63.3L1580.1,64L1564.3,62.3L1554.8,60.2L1550.5,56.1L1542.7,54.9L1557.5,51.1Z M1609,61L1623.5,64.2L1621.8,66.5L1589.7,68.7L1600.1,61.2L1604.8,60.6L1609,61Z M1813.8,78.9L1828.8,79.1L1849.4,82.1L1844.9,86.4L1823.9,86.2L1814.5,87.5L1803.2,83.8L1806.3,79.9L1813.8,78.9Z M1867.2,83.4L1881.5,84.9L1874.9,87.1L1865.8,86.6L1855.3,84.3L1856.6,82.5L1867.2,83.4Z M1819.7,94.6L1825.1,92.4L1832.2,91.8L1840.3,94L1840.9,95.5L1832.3,95.5L1820.7,94.9L1819.7,94.6Z M1279.1,53.5L1290.2,52.5L1298.9,52.4L1300,54L1303.3,52.6L1308.7,51.7L1317.1,52.9L1314.9,53.8L1307.3,54.5L1302.2,55L1301.4,55.9L1294.7,56.8L1288.5,55.5L1291.8,53.7L1279.1,53.5Z M1153.3,202.9L1142.9,203L1135.8,202.4L1137.1,199.9L1145,198L1151,199L1153.5,199.9L1152.9,201.5L1153.3,202.9Z M1328.4,92.4L1342,87.5L1340.5,84.9L1353.2,81.9L1372,78.2L1390.9,77.1L1400.7,75L1411.7,74.3L1415.7,76.5L1411.9,78.3L1391.7,81.1L1374.3,83.8L1356.7,89.3L1348.2,94.8L1339.3,100.3L1340.4,105L1351.3,109.7L1348,110.2L1329.4,109.4L1327.9,106.9L1317.6,105.4L1316.7,102.3L1322.5,101.1L1322.3,98L1333.6,93.1L1328.4,92.4Z M1837,206.5L1839,212L1838.8,217.6L1841.2,223.3L1846.9,233.4L1838.5,231.5L1835,239.7L1840.5,245.6L1840.4,249.5L1836.1,246.1L1832.3,250.5L1831.3,245.7L1831.9,240.2L1831.3,234L1832.6,229.7L1832.8,222.1L1829.5,216.5L1830,208.8L1835.3,206.2L1833,203.5L1835.5,202.7L1837,206.5Z M28.9,129.7L28.4,133.2L32.2,134.6L30.9,130.5L46.3,131.3L57.5,136.7L51.8,139.1L42.5,139.7L42.4,145.3L40.1,146.5L34.7,146.3L30.4,144.3L22.8,142.7L21.6,140.2L15.8,139.3L9.3,140L6.2,138L7.5,135.9L0.7,137.2L3.2,139.9L0,142.3L0,119.7L13.9,124L28.9,129.7Z M7.4,108.7L0,109L0,105.2L0.7,104.9L5.6,104.9L13.8,106.6L13.3,107.3L7.4,108.7Z M1214.2,250.5L1215.7,249.1L1219.8,250.3L1221.6,250.5L1222.3,251.6L1223.2,251.8L1223.2,252.3L1226,253.7L1231.8,253.3L1230.7,255.4L1224.5,256.3L1216.8,259.6L1213.6,258.5L1214.8,255.8L1208.6,254.1L1209.6,253L1215.1,251.2L1214.2,250.5Z"},{"name":"Bahamas","fill":"#33d9b2","d":"M574.7,359.6L577.4,359.1L581.1,359.3L581.3,360.8L575.1,361.7L574.7,359.6Z M581.5,358.2L586,360.7L585,364.8L583.9,364L584,361.1L581.5,358.8L581.5,358.2Z M579.2,368.6L580.9,368.8L582.9,373.5L582.9,376.8L581.5,377.1L580.1,373.8L577.9,372.2L579.2,368.6Z"},{"name":"Falkland Is.","fill":"#ff9ff3","d":"M675.8,807L682.7,803.6L687.5,805L690.9,802.7L695.5,805.3L693.8,807.3L686.1,809L683.5,807L678.7,809.5L675.8,807Z"},{"name":"Norway","fill":"#feca57","d":"M1110.1,58.7L1112.3,56.8L1120.7,56.6L1127.8,58.6L1146.6,62.8L1132.2,65.1L1129.1,69.3L1124.1,70.3L1121.4,75L1114.5,75.3L1102.3,71.8L1107.5,69.8L1098.9,68.1L1087.8,63.3L1083.4,58.9L1098.9,56.8L1102,58.8L1110.1,58.7Z M1200.9,116.3L1191.3,118.6L1186.7,119.1L1189.1,115.1L1181.8,112.8L1172.9,114.8L1170.1,118.9L1164.7,121.5L1158.6,120.1L1151.2,120.4L1144.9,117.4L1141.5,118.9L1137.9,119.1L1137.1,122.8L1126.4,121.9L1124.9,125.1L1119.4,125.1L1115.6,129.1L1110,135.4L1101.1,143.4L1103.2,145.4L1101.2,147.6L1095.6,147.5L1091.9,152.9L1092.2,160.4L1095.9,163.3L1094,170L1089.2,173.9L1086.7,177.2L1082.9,173.7L1071.7,180.3L1064.1,181.6L1056.2,178.7L1054.2,172.6L1052.4,159.5L1057.6,155.8L1072.7,151L1083.9,145.1L1094.3,137.2L1108,126.2L1117.5,122L1133.1,114.8L1145.6,112.3L1155,112.6L1163.6,107.9L1174,108.2L1184.2,107L1202,111.2L1194.7,112.7L1200.9,116.3Z M1179.9,56.6L1171.5,59.6L1155,60.3L1138.2,59.4L1137.2,57.8L1129,57.7L1122.8,55.1L1140.4,53.5L1148.6,54.9L1154.4,53.2L1168.8,54.6L1179.9,56.6Z M1164.7,69.1L1151.9,71.4L1141.9,70.1L1145.8,68.6L1142.4,66.8L1154.2,65.7L1156.4,67.8L1164.7,69.1Z"},{"name":"Greenland","fill":"#dff9fb","d":"M758,41.9L777.1,38.5L797,38.8L804.3,36.7L824.4,36.2L869.8,36.9L905.4,41.4L894.9,43.6L873.1,43.8L842.5,44.4L845.4,45.4L865.5,44.8L882.7,46.7L893.7,45L898.4,47L892.2,50.3L906.7,48.2L934.3,46L951.4,47.1L954.5,49.5L931.4,53.6L928.1,54.9L910,55.9L923.1,56.2L916.5,60.3L911.9,64L912.1,70.3L918.9,74L910,74.3L900.7,76.1L911.2,79.1L912.5,83.9L906.4,84.4L913.8,89.3L901.2,89.7L907.8,92.1L905.9,94.1L897.9,95L889.9,95L897.1,98.8L897.1,101.4L885.9,99L883,100.5L890.6,101.9L898.1,105.4L900.2,110L890.1,111.1L885.7,108.9L878.7,105.6L880.6,109.5L874,112.5L889,112.7L896.9,113L881.6,118L866.1,122.5L849.5,124.4L843.2,124.5L837.3,126.7L829.4,132.7L817.2,136.7L813.3,136.9L805.7,138.3L797.5,139.6L792.6,143.1L792.6,147.1L789.7,150.9L780.4,155.4L782.7,159.9L780.1,164.6L777.2,170.1L769.2,170.5L760.8,165.8L749.4,165.8L743.9,162.7L740.1,157.1L730.3,150L727.4,146.3L726.6,141.2L718.7,136L720.8,131.8L717,129.8L722.6,123.1L731.2,121L733.4,118.6L734.6,114.2L728.1,116.2L725,117L719.9,117.9L712.9,116L712.5,112.1L714.8,109.1L720,109L731.6,110.5L721.9,106.9L716.8,105L711.1,105.8L706.4,104.4L712.7,99.1L709.3,96.9L704.7,93L697.9,87L690.6,84.8L690.7,82.4L675.4,79.1L663.4,78.6L648.2,78.9L634.3,79.3L627.7,77.5L617.8,73.9L632.7,72.1L644.2,71.8L619.8,70.3L607,68L607.8,65.8L629.3,63.1L650.2,60.3L652.4,58.3L637,56.2L642,54L661.7,50L670,49.4L667.6,46.8L681.1,45.3L698.6,44.4L716,44.4L722.2,46.1L737.3,43L750.9,45.1L758.9,45.6L770.7,47.4L757.2,44.4L758,41.9Z"},{"name":"Fr. S. Antarctic Lands","fill":"#48dbfb","d":"M1416.2,788.6L1419.8,790.4L1425.2,791.1L1425.4,792.2L1423.8,794.8L1415.1,795.2L1414.9,792.1L1415.8,789.8L1416.2,788.6Z"},{"name":"Timor-Leste","fill":"#1dd1a1","d":"M1734.9,562.6L1735.6,561.2L1740.5,560L1744.5,559.8L1746.2,559.1L1748.4,559.8L1746.3,561.3L1740.4,563.8L1735.6,565.4L1735.5,563.7L1734.9,562.6Z"},{"name":"South Africa","fill":"#786fa6","d":"M1117,674.6L1119.7,671.8L1122,673.3L1122.9,675.7L1125.5,676.2L1129,677.2L1132.1,676.8L1137.2,673.9L1137.2,652.9L1138.7,653.8L1142.1,659.2L1141.6,662.6L1142.8,664.6L1146.9,664L1149.8,661.5L1152.5,659.8L1153.8,657.1L1156.6,655.8L1159,656.4L1161.7,658L1166.4,658.3L1170,657L1170.6,655.2L1171.6,652.5L1174.7,652L1176.4,649.9L1178.3,646.1L1183.4,641.9L1191.4,637.7L1193.8,637.7L1196.5,638.7L1198.4,638L1201.4,638.6L1204.2,646.6L1205.6,650.6L1204.6,657L1205.1,659L1202.3,658L1200.6,658.4L1200.1,660L1198.5,662.2L1198.6,664.1L1202,667.2L1205.3,666.6L1206.5,664.1L1210.8,664.1L1209.3,668.3L1208.7,673L1207.2,675.6L1203.3,678.4L1202.2,679.3L1199.8,682.2L1198.2,685.1L1195,689.2L1188.6,695L1184.5,698.4L1180.2,701L1174.3,703.2L1171.4,703.5L1170.7,705.1L1167.2,704.3L1164.4,705.3L1158.2,704.3L1154.8,704.9L1152.4,704.6L1146.6,706.9L1141.7,707.8L1138.2,709.9L1135.6,710.1L1133.2,708.1L1131.3,707.9L1128.8,705.4L1128.5,706.2L1127.8,704.7L1127.8,701.3L1126,697.5L1127.8,696.5L1127.7,692.1L1123.9,686.8L1121.1,682L1121.1,682L1117,674.6Z M1188.9,676.7L1186.4,675L1183.7,676.1L1180.6,678.4L1177.6,682L1181.9,686.3L1183.9,685.8L1184.9,684L1188.1,683.1L1189.1,681.2L1190.8,678.4L1188.9,676.7Z"},{"name":"Lesotho","fill":"#ff9f43","d":"M1188.9,676.7L1190.8,678.4L1189.1,681.2L1188.1,683.1L1184.9,684L1183.9,685.8L1181.9,686.3L1177.6,682L1180.6,678.4L1183.7,676.1L1186.4,675L1188.9,676.7Z"},{"name":"Mexico","fill":"#22a6b3","d":"M357.7,326.9L364.1,326.5L371.4,325.9L370.8,327L379.4,329.7L392.4,333.7L403.7,333.7L408.2,333.7L408.2,331.4L418.1,331.4L420.2,333.4L423.1,335.2L426.5,337.7L428.3,340.6L429.8,343.8L432.7,345.5L437.4,347.2L441,342.7L445.7,342.6L449.7,344.9L452.5,348.8L454.5,352.1L457.8,355.3L459.1,359.3L460.7,362L465.1,363.7L469.2,365L471.4,364.8L469.2,369.8L468.2,373.9L467.8,381.5L467.2,384.3L468.2,387.4L470,390.2L471.1,394.6L474.9,398.8L476.2,402.1L478.4,404.9L484.5,406.4L486.8,408.8L491.8,407.2L496.2,406.6L500.4,405.6L504,404.6L507.6,402.3L509,399L509.4,394.2L510.4,392.5L514.3,391L520.3,389.7L525.3,389.9L528.8,389.4L530.1,390.6L529.9,393.4L526.9,396.8L525.5,400.2L526.6,401.2L525.7,403.7L524.3,408.1L522.9,406.7L521.7,406.8L520.6,406.8L518.6,410.3L517.5,409.6L516.8,409.9L516.9,410.7L511.6,410.6L506.3,410.6L506.3,413.8L503.7,413.9L505.8,415.8L508,417.1L508.6,418.3L509.5,418.6L509.4,420.6L502.1,420.6L499.3,425.2L500.1,426.3L499.5,427.6L499.3,429.3L492.9,423.2L490,421.3L485.3,419.8L482.1,420.2L477.6,422.4L474.7,422.9L470.7,421.4L466.4,420.4L461.1,417.8L456.8,417L450.4,414.3L445.6,411.6L444.2,410.1L441,409.7L435.2,407.9L432.8,405.3L426.7,402.1L423.9,398.5L422.5,395.8L424.4,395.2L423.8,393.6L425.1,392.1L425.2,390.1L423.2,387.6L422.7,385.3L420.8,382.4L415.8,376.8L410.1,372.3L407.3,368.8L402.4,366.5L401.4,365.1L402.3,361.6L399.4,360.2L396,357.5L394.6,353.5L391.5,353L388.2,350L385.5,347.3L385.3,345.5L382.2,341.2L380.2,336.9L380.3,334.7L376.2,332.4L374.3,332.7L371,331.1L370.1,333.4L371.1,336.1L371.6,340.4L373.6,342.8L377.8,346.7L378.7,348L379.6,348.4L380.4,350.4L381.4,350.3L382.5,354L384.2,355.4L385.5,357.4L389,360.3L390.9,365.6L392.6,368.1L394.2,370.8L394.5,373.8L397.2,374L399.5,376.5L401.6,379.1L401.4,380.1L399.1,382.2L398,382.2L396.5,378.7L392.8,375.5L388.7,372.7L385.8,371.3L386,367.1L385.1,364L382.4,362.3L378.5,359.7L377.8,360.5L376.3,359L372.8,357.6L369.5,354.3L369.9,353.9L372.2,354.2L374.3,352.1L374.5,349.5L370.2,345.4L366.8,343.9L364.7,340.3L362.6,336.6L360,332L357.7,326.9Z"},{"name":"Uruguay","fill":"#0abde3","d":"M696.2,683.9L699.9,683.3L705.6,687.7L707.7,687.5L713.5,691.2L718,694.3L721.3,698.2L718.8,700.9L720.4,704.1L717.9,707.7L711.5,710.8L707.3,709.7L704.2,710.3L698.9,707.9L695.1,708.1L691.6,704.9L692.1,701.2L693.3,700L693.2,694.3L694.8,688.4L696.2,683.9Z"},{"name":"Brazil","fill":"#2ed573","d":"M720.4,704.1L718.8,700.9L721.3,698.2L718,694.3L713.5,691.2L707.7,687.5L705.6,687.7L699.9,683.3L696.2,683.9L703.8,676.1L710.2,670.6L714,668.3L718.8,665.2L718.9,660.6L716.1,657.3L713.2,658.4L714.4,655.1L715.1,651.8L715.1,648.7L713.1,647.6L711,648.5L708.8,648.3L708.2,646.1L707.6,640.9L706.6,639.2L702.7,637.6L700.4,638.8L694.4,637.7L694.8,629.9L693.1,626.8L694.9,625.6L694.3,622.4L695.9,619.9L696.9,615.4L695.6,611.9L692.4,610.3L691.8,608L692.7,604.7L681.8,604.5L679.6,597.9L681.2,597.8L681.2,595.3L680.1,593.7L679.8,590.4L676.5,588.7L672.9,588.7L670.6,587.1L666.7,586L664.5,583.8L658.1,582.9L651.9,577.8L652.4,574L651.7,571.8L652.3,567.5L644.9,568.5L641.9,570.6L636.9,572.9L635.6,574.7L632.7,574.8L628.5,574.3L625.2,575.3L622.7,574.6L623,566L618.4,569.3L613.3,569.2L611.2,566.2L607.4,565.8L608.6,563.4L605.5,559.9L603.1,554.8L604.6,553.8L604.6,551.4L608,549.7L607.5,546.6L608.9,544.7L609.3,542L615.8,538.1L620.5,537L621.3,536.2L626.4,536.5L628.9,520.9L629.1,518.4L628.2,515.1L625.7,513.1L625.7,508.9L628.9,508L630,508.6L630.2,506.4L626.9,505.8L626.8,502.2L637.9,502.4L639.8,500.4L641.4,502.2L642.5,505.6L643.5,504.9L646.7,507.9L651.1,507.5L652.2,505.8L656.4,504.4L658.8,503.5L659.4,501.1L663.5,499.5L663.2,498.3L658.4,497.8L657.6,494.2L657.8,490.4L655.3,488.9L656.3,488.4L660.5,489.1L665.1,490.5L666.7,489.2L670.8,488.3L677.2,486.2L679.2,484L678.5,482.4L681.5,482.2L682.8,483.5L682,486L684,486.8L685.3,489.5L683.7,491.5L682.8,496.3L684.3,499.2L684.7,501.8L688.2,504.5L691,504.8L691.6,503.7L693.4,503.4L696,502.4L697.8,500.9L701,501.4L702.4,501.2L705.4,501.7L706,500.5L705,499.4L705.6,497.7L707.9,498.2L710.6,497.6L713.8,498.8L716.3,500L718.1,498.5L719.3,498.7L720.1,500.3L722.8,499.9L725,497.8L726.8,493.6L730.1,488.4L732.1,488.1L733.5,491.2L736.7,501.2L739.7,502.1L739.9,506L735.6,510.7L737.3,512.4L747.4,513.3L747.6,519L751.9,515.3L759.1,517.4L768.5,520.8L771.3,524.2L770.4,527.3L777,525.6L788.1,528.6L796.6,528.3L805,533.1L812.2,539.4L816.6,541.1L821.5,541.3L823.5,543.1L825.5,550.3L826.4,553.8L824.2,563.2L821.3,566.9L813.2,574.8L809.6,581.2L805.4,586.2L804,586.3L802.4,590.5L802.8,601.1L801.2,609.9L800.6,613.6L798.8,615.9L797.8,623.5L792,630.9L791.1,636.8L786.5,639.3L785.1,642.7L779,642.7L770,644.8L766,647.4L759.6,649L752.9,653.6L748.1,659.2L747.3,663.5L748.2,666.6L747.2,672.3L745.9,675.1L741.9,678.3L735.6,688.3L730.6,692.8L726.7,695.4L724.1,700.9L720.4,704.1Z"},{"name":"Bolivia","fill":"#54a0ff","d":"M628.5,574.3L632.7,574.8L635.6,574.7L636.9,572.9L641.9,570.6L644.9,568.5L652.3,567.5L651.7,571.8L652.4,574L651.9,577.8L658.1,582.9L664.5,583.8L666.7,586L670.6,587.1L672.9,588.7L676.5,588.7L679.8,590.4L680.1,593.7L681.2,595.3L681.2,597.8L679.6,597.9L681.8,604.5L692.7,604.7L691.8,608L692.4,610.3L695.6,611.9L696.9,615.4L695.9,619.9L694.3,622.4L694.9,625.6L693.1,626.8L693,625L687.7,622.1L682.4,622L672.5,623.7L669.8,628.7L669.6,631.8L667.4,638.6L666.5,637.4L660,637.1L657.8,641.7L654.4,637.6L647,636.2L642.2,641.3L638.1,642.1L635.9,634.3L632.8,627.9L634.6,622.4L631.7,620L630.9,615.9L628.1,612L631.7,605.9L629.2,601.1L630.6,599.2L629.5,597.1L631.8,594.2L631.9,589.4L632.1,585.4L633.4,583.5L628.5,574.3Z"},{"name":"Peru","fill":"#ffbe76","d":"M626.4,536.5L621.3,536.2L620.5,537L615.8,538.1L609.3,542L608.9,544.7L607.5,546.6L608,549.7L604.6,551.4L604.6,553.8L603.1,554.8L605.5,559.9L608.6,563.4L607.4,565.8L611.2,566.2L613.3,569.2L618.4,569.3L623,566L622.7,574.6L625.2,575.3L628.5,574.3L633.4,583.5L632.1,585.4L631.9,589.4L631.8,594.2L629.5,597.1L630.6,599.2L629.2,601.1L631.7,605.9L628.1,612L626.6,614.9L623.7,616.4L618,613.1L617.5,610.8L606.2,605.1L596,598.8L591.6,595.3L589.2,590.6L590.2,589L585.4,581.5L579.7,571L574.4,559.7L572,557.1L570.3,552.9L565.8,549.2L561.8,546.9L563.6,544.4L560.9,538.9L562.6,535L567.2,531.4L567.8,533.7L566.2,535.1L566.4,537.2L568.7,536.7L571,537.3L573.4,540.2L576.6,537.9L577.7,534L581.2,529.1L588,526.8L594.2,520.9L596,517.2L595.2,512.9L596.7,512.3L600.5,515L602.3,517.7L605,519.2L608.3,525.1L612.5,525.8L615.7,524.3L617.7,525.3L621.2,524.8L625.5,527.5L621.8,533.3L623.5,533.4L626.4,536.5Z"},{"name":"Colombia","fill":"#f9ca24","d":"M643.5,504.9L642.5,505.6L641.4,502.2L639.8,500.4L637.9,502.4L626.8,502.2L626.9,505.8L630.2,506.4L630,508.6L628.9,508L625.7,508.9L625.7,513.1L628.2,515.1L629.1,518.4L628.9,520.9L626.4,536.5L623.5,533.4L621.8,533.3L625.5,527.5L621.2,524.8L617.7,525.3L615.7,524.3L612.5,525.8L608.3,525.1L605,519.2L602.3,517.7L600.5,515L596.7,512.3L595.2,512.9L592.8,511.5L590,509.6L588.4,510.5L583.5,509.7L582.2,507.3L581.1,507.4L575.4,504.1L574.6,502.4L576.8,502L576.5,499.1L577.8,497L580.7,496.7L583.1,493.1L585.2,490.1L583.1,488.7L584.2,485.4L582.9,480.2L584.1,478.7L583.2,473.9L580.9,470.9L581.7,468.1L583.5,468.5L584.6,466.9L583.3,463.5L583.9,462.7L586.9,462.9L591.2,458.9L593.5,458.3L593.6,456.4L594.6,451.6L597.9,448.9L601.4,448.8L601.9,447.7L606.4,448.1L610.8,445.3L613,444L615.8,441.2L617.8,441.6L619.3,443.1L618.2,445L614.5,446L613.1,448.8L610.9,450.4L609.2,452.5L608.6,456.6L607,459.9L609.9,460.3L610.6,462.9L611.9,464.2L612.3,466.5L611.7,468.6L611.9,469.8L613.3,470.2L614.6,472.2L621.9,471.7L625.2,472.4L629.3,477.3L631.6,476.7L635.6,477L638.9,476.3L640.9,477.3L639.9,480.4L638.6,482.3L638.2,486.4L639.3,490.2L640.9,491.8L641.1,493.1L638.2,496L640.3,497.2L641.8,499.2L643.5,504.9Z"},{"name":"Panama","fill":"#ffda79","d":"M583.9,462.7L583.3,463.5L584.6,466.9L583.5,468.5L581.7,468.1L580.9,470.9L579,469.3L577.8,466.2L579.2,464.7L577.8,464.3L576.7,462.4L573.9,460.8L571.4,461.2L570.3,463.2L568,464.6L566.7,464.8L566.2,466L568.9,469.1L567.3,469.8L566.5,470.6L563.8,470.9L562.9,467.5L562.1,468.5L560.2,468.2L559.1,465.9L556.8,465.5L555.3,464.8L552.8,464.8L552.7,466.1L552,465.2L552.3,464.1L552.8,462.9L552.6,461.9L553.4,461.2L552.2,460.4L552.2,458.1L554.4,457.6L556.4,459.6L556.3,460.8L558.6,461.1L559.1,460.6L560.7,462L563.5,461.6L565.9,460.2L569.4,459L571.3,457.3L574.5,457.7L574.2,458.2L577.4,458.4L579.9,459.4L581.8,461.1L583.9,462.7Z"},{"name":"Costa Rica","fill":"#cd84f1","d":"M554.4,457.6L552.2,458.1L552.2,460.4L553.4,461.2L552.6,461.9L552.8,462.9L552.3,464.1L552,465.2L548.9,463.9L547.8,462.8L548.4,461.8L548.2,460.5L546.6,459.1L544.4,458L542.4,457.3L542.1,455.6L540.6,454.6L540.9,456.3L539.8,457.6L538.5,456.1L536.7,455.5L535.9,454.3L535.9,452.6L536.7,450.8L535.1,450L536.4,448.9L537.2,448.2L541,449.7L542.3,449L544.1,449.4L545.1,450.6L546.7,451L548.1,449.8L549.5,452.9L551.7,455.2L554.4,457.6Z"},{"name":"Nicaragua","fill":"#706fd3","d":"M548.1,449.8L546.7,451L545.1,450.6L544.1,449.4L542.3,449L541,449.7L537.2,448.2L536.4,448.9L534.4,447.1L531.8,444.8L530.5,442.9L528.1,441.1L525.3,438.6L525.9,437.7L526.8,438.5L527.3,438.1L529,437.9L529.7,436.6L530.6,436.5L530.5,433.8L531.8,433.6L533,433.7L534.2,432.1L535.9,433.3L536.5,432.6L537.5,431.9L539.5,430.3L539.6,429.2L540.1,429.2L540.9,427.9L541.5,427.7L542.4,428.6L543.6,428.8L544.8,428.1L546.3,428.1L548.2,427.3L549,426.6L551,426.7L550.5,427.2L550.2,428.5L550.8,430.6L549.5,432.5L548.9,434.8L548.7,437.3L549,438.8L549.1,441.3L548.3,441.9L547.7,444.3L548.1,445.8L547,447.3L547.2,448.8L548.1,449.8Z"},{"name":"Honduras","fill":"#33d9b2","d":"M551,426.7L549,426.6L548.2,427.3L546.3,428.1L544.8,428.1L543.6,428.8L542.4,428.6L541.5,427.7L540.9,427.9L540.1,429.2L539.6,429.2L539.5,430.3L537.5,431.9L536.5,432.6L535.9,433.3L534.2,432.1L533,433.7L531.8,433.6L530.5,433.8L530.6,436.5L529.7,436.6L529,437.9L527.3,438.1L526.3,436.4L524.6,435.9L525,433.6L524.2,433L523,432.6L520.5,433.2L520.3,432.5L518.6,431.6L517.4,430.4L515.7,429.9L516.9,428.5L516.4,427.4L516.8,426.3L519.5,424.7L522.1,422.5L522.7,422.7L523.9,421.7L525.6,421.7L526.1,422.1L527,421.8L529.6,422.4L532.2,422.2L534.1,421.6L534.7,420.9L536.6,421.2L537.9,421.6L539.4,421.5L540.5,421L543.1,421.8L544,421.9L545.8,423L547.4,424.3L549.5,425.1L551,426.7Z"},{"name":"El Salvador","fill":"#ff5252","d":"M515.7,429.9L517.4,430.4L518.6,431.6L520.3,432.5L520.5,433.2L523,432.6L524.2,433L525,433.6L524.6,435.9L523.9,437.2L520.6,437.1L518.6,436.6L516.2,435.4L513.1,435.1L511.5,433.9L511.6,433L513.6,431.6L514.6,431L514.3,430.3L515.7,429.9Z"},{"name":"Guatemala","fill":"#34ace0","d":"M499.3,429.3L499.5,427.6L500.1,426.3L499.3,425.2L502.1,420.6L509.4,420.6L509.5,418.6L508.6,418.3L508,417.1L505.8,415.8L503.7,413.9L506.3,413.8L506.3,410.6L511.6,410.6L516.9,410.7L516.8,415.2L516.4,421.6L518.1,421.6L519.9,422.6L520.4,421.8L522.1,422.5L519.5,424.7L516.8,426.3L516.4,427.4L516.9,428.5L515.7,429.9L514.3,430.3L514.6,431L513.6,431.6L511.6,433L511.5,433.9L508.5,432.9L505,432.8L502.4,431.6L499.3,429.3Z"},{"name":"Belize","fill":"#33d9b2","d":"M516.9,410.7L516.8,409.9L517.5,409.6L518.6,410.3L520.6,406.8L521.7,406.8L521.7,407.6L522.8,407.6L522.7,409.2L521.8,411.6L522.3,412.5L521.7,414.5L522,415.1L521.4,418L520.2,419.5L519.2,419.6L518.1,421.6L516.4,421.6L516.8,415.2L516.9,410.7Z"},{"name":"Venezuela","fill":"#ff9ff3","d":"M678.5,482.4L679.2,484L677.2,486.2L670.8,488.3L666.7,489.2L665.1,490.5L660.5,489.1L656.3,488.4L655.3,488.9L657.8,490.4L657.6,494.2L658.4,497.8L663.2,498.3L663.5,499.5L659.4,501.1L658.8,503.5L656.4,504.4L652.2,505.8L651.1,507.5L646.7,507.9L643.5,504.9L641.8,499.2L640.3,497.2L638.2,496L641.1,493.1L640.9,491.8L639.3,490.2L638.2,486.4L638.6,482.3L639.9,480.4L640.9,477.3L638.9,476.3L635.6,477L631.6,476.7L629.3,477.3L625.2,472.4L621.9,471.7L614.6,472.2L613.3,470.2L611.9,469.8L611.7,468.6L612.3,466.5L611.9,464.2L610.6,462.9L609.9,460.3L607,459.9L608.6,456.6L609.2,452.5L610.9,450.4L613.1,448.8L614.5,446L618.2,445L618,446.4L614.7,447L616.6,449.6L616.5,452.6L614,455.9L616.1,460.4L618.6,460L619.9,455.9L618.1,453.9L617.8,449.6L624.9,447.3L624.1,444.6L626.1,442.8L628.1,446.8L632.1,446.9L635.8,450.1L636.1,452L641.2,452L647.2,451.4L650.5,454L654.8,454.7L658,452.9L658.1,451.5L665.1,451.1L672,451L667.1,452.7L669.1,455.4L673.6,455.8L677.9,458.6L678.8,463.2L681.8,463.1L684,464.4L679.5,467.7L679,469.8L681,471.9L679.6,473L676.1,473.9L676.2,476.5L674.6,478.1L678.5,482.4Z"},{"name":"Guyana","fill":"#feca57","d":"M702.4,501.2L701,501.4L697.8,500.9L696,502.4L693.4,503.4L691.6,503.7L691,504.8L688.2,504.5L684.7,501.8L684.3,499.2L682.8,496.3L683.7,491.5L685.3,489.5L684,486.8L682,486L682.8,483.5L681.5,482.2L678.5,482.4L674.6,478.1L676.2,476.5L676.1,473.9L679.6,473L681,471.9L679,469.8L679.5,467.7L684,464.4L687.8,466.5L691.3,470.2L691.5,473.1L693.6,473.3L696.6,476L698.9,478L698,483.1L694.5,484.6L694.8,486L693.8,488.9L696.3,493L698.1,493L698.9,496.2L702.4,501.2Z"},{"name":"Suriname","fill":"#ff6b6b","d":"M713.8,498.8L710.6,497.6L707.9,498.2L705.6,497.7L705,499.4L706,500.5L705.4,501.7L702.4,501.2L698.9,496.2L698.1,493L696.3,493L693.8,488.9L694.8,486L694.5,484.6L698,483.1L698.9,478L705.7,479.2L706.3,478.1L710.9,477.7L717,479.3L714.1,484.1L714.5,488L716.8,491.4L715.8,493.9L715.3,496.5L713.8,498.8Z"},{"name":"France","fill":"#30336b","d":"M730.1,488.4L726.8,493.6L725,497.8L722.8,499.9L720.1,500.3L719.3,498.7L718.1,498.5L716.3,500L713.8,498.8L715.3,496.5L715.8,493.9L716.8,491.4L714.5,488L714.1,484.1L717,479.3L719,479.9L723.2,481.2L729.2,486L730.1,488.4Z M1059.2,230.6L1061.9,232.1L1070.1,233.1L1067.2,237L1066.5,241.1L1064.9,242.1L1062.3,241.5L1062.5,243L1058.3,246.2L1058.3,248.8L1061,247.9L1062.9,250.4L1062.7,252L1064.4,254.1L1062.4,255.8L1063.9,260.2L1066.9,261L1066.3,263.4L1061.1,266.6L1049.9,265.1L1041.6,266.9L1041,270.4L1034.4,271.1L1028,268.5L1025.9,269.8L1015.5,267.2L1013.2,265L1016.1,261.6L1017.2,250.2L1011.3,244.3L1007.1,241.4L998.4,239.2L997.9,235L1005.3,233.8L1014.8,235.3L1013,228.8L1018.4,231.3L1031.6,226.8L1033.3,222.2L1038.3,221L1039.1,223L1041.8,223.1L1044.4,225.4L1048.4,228.1L1051.3,227.6L1056.3,230.2L1057.6,230.7L1059.2,230.6Z M1073.8,269.5L1077.4,267.3L1078.4,272.2L1076.5,276.6L1073.9,275.4L1072.6,271.6L1073.8,269.5Z"},{"name":"Ecuador","fill":"#1dd1a1","d":"M595.2,512.9L596,517.2L594.2,520.9L588,526.8L581.2,529.1L577.7,534L576.6,537.9L573.4,540.2L571,537.3L568.7,536.7L566.4,537.2L566.2,535.1L567.8,533.7L567.2,531.4L570.2,527.1L569,524.6L566.8,527.3L563.4,524.8L564.5,523.2L563.6,518L565.6,517.2L566.6,513.6L568.8,510L568.4,507.6L571.5,506.4L575.4,504.1L581.1,507.4L582.2,507.3L583.5,509.7L588.4,510.5L590,509.6L592.8,511.5L595.2,512.9Z"},{"name":"Puerto Rico","fill":"#f368e0","d":"M646.9,406.7L649.8,407.2L650.9,408.3L649.4,409.7L645.1,409.7L641.8,409.9L641.5,407.5L642.3,406.6L646.9,406.7Z"},{"name":"Jamaica","fill":"#ff9f43","d":"M582.7,406.8L586.5,407.3L589.6,408.7L590.5,410.2L586.5,410.3L584.8,411.3L581.6,410.4L578.3,408.3L579,407L581.4,406.6L582.7,406.8Z"},{"name":"Cuba","fill":"#ee5253","d":"M556,380.1L560.9,380.5L565.4,380.6L570.7,382.5L573,384.6L578.3,383.9L580.3,385.3L585.1,388.8L588.7,391.4L590.5,391.3L593.9,392.4L593.5,394L597.7,394.3L602,396.6L601.3,397.9L597.6,398.7L593.7,398.9L589.8,398.5L581.7,399L585.5,395.9L583.2,394.4L579.5,394L577.5,392.4L576.2,389.1L573,389.4L567.7,387.8L565.9,386.6L558.5,385.8L556.5,384.6L558.7,383.2L553.1,382.9L549,385.9L546.7,386L545.8,387.4L543,388L540.6,387.4L543.6,385.7L544.8,383.6L547.4,382.4L550.3,381.3L554.6,380.7L556,380.1Z"},{"name":"Zimbabwe","fill":"#0abde3","d":"M1201.4,638.6L1198.4,638L1196.5,638.7L1193.8,637.7L1191.4,637.7L1187.8,635.1L1183.4,634.2L1181.7,630.6L1181.7,628.6L1179.3,628L1172.8,621.8L1171.1,618.5L1169.9,617.4L1167.7,612.9L1174.1,613.5L1175.9,614.2L1177.9,614L1181,610.4L1186,605.7L1188,605.2L1188.7,603.3L1191.9,601L1196.2,600.2L1196.6,602.3L1201.3,602.2L1204,603.4L1205.2,604.8L1207.9,605.3L1210.9,607.1L1210.9,614.3L1209.8,618.2L1209.5,622.5L1210.4,624.2L1209.8,627.5L1208.9,628L1207.4,632.1L1201.4,638.6Z"},{"name":"Botswana","fill":"#10ac84","d":"M1191.4,637.7L1183.4,641.9L1178.3,646.1L1176.4,649.9L1174.7,652L1171.6,652.5L1170.6,655.2L1170,657L1166.4,658.3L1161.7,658L1159,656.4L1156.6,655.8L1153.8,657.1L1152.5,659.8L1149.8,661.5L1146.9,664L1142.8,664.6L1141.6,662.6L1142.1,659.2L1138.7,653.8L1137.2,652.9L1137.2,636.3L1142.8,636.1L1143,615.8L1147.2,615.6L1156,613.7L1158.1,616L1161.8,613.8L1163.5,613.8L1166.7,612.5L1167.7,612.9L1169.9,617.4L1171.1,618.5L1172.8,621.8L1179.3,628L1181.7,628.6L1181.7,630.6L1183.4,634.2L1187.8,635.1L1191.4,637.7Z"},{"name":"Namibia","fill":"#54a0ff","d":"M1137.2,652.9L1137.2,673.9L1132.1,676.8L1129,677.2L1125.5,676.2L1122.9,675.7L1122,673.3L1119.7,671.8L1117,674.6L1112.8,670.3L1110.5,666.1L1109.3,660.6L1107.9,656.5L1106,647.7L1105.8,640.9L1105.1,637.8L1102.9,635.4L1100,630.7L1097,623.9L1095.7,620.3L1091.1,614.8L1090.8,610.4L1093.5,609.3L1096.9,608.4L1100.6,608.5L1104,611.1L1104.8,610.7L1127.9,610.5L1131.8,613.2L1145.6,614L1156.1,611.7L1160.7,610.4L1164.4,610.7L1166.7,612L1166.7,612.5L1163.5,613.8L1161.8,613.8L1158.1,616L1156,613.7L1147.2,615.6L1143,615.8L1142.8,636.1L1137.2,636.3L1137.2,652.9Z"},{"name":"Senegal","fill":"#5f27cd","d":"M928.9,434.7L926.6,430.2L923.7,428.2L926.2,427.1L929,423.1L930.3,420.2L932.3,418.4L935.1,418.9L937.9,417.6L941.1,417.6L943.8,419.2L947.6,420.8L951,424.9L954.8,428.8L955,432.4L956.1,435.6L958.3,437.2L958.8,439.4L958.5,441.2L957.7,441.5L954.6,441.1L954.1,441.7L952.9,441.8L948.8,440.5L946.1,440.4L935.5,440.2L934,440.8L932.1,440.6L929.1,441.5L928.2,437.2L933.4,437.3L934.7,436.5L935.8,436.5L937.9,435.1L940.3,436.3L942.8,436.4L945.2,435.2L944.1,433.5L942.2,434.5L940.4,434.5L938.2,433.1L936.4,433.1L935.1,434.5L928.9,434.7Z"},{"name":"Mali","fill":"#c8d6e5","d":"M958.5,441.2L958.8,439.4L958.3,437.2L956.1,435.6L955,432.4L954.8,428.8L956.7,427.8L957.6,424.5L959.4,424.3L963.4,425.9L966.6,424.8L968.8,425.2L969.7,423.9L992.5,423.8L993.8,419.8L992.8,419.1L990,394.6L987.3,370L996,369.9L1015.2,382.3L1034.4,394.7L1035.7,397.4L1039.3,399L1041.9,400L1042,403.6L1048.3,403L1048.3,416.1L1045.2,419.9L1044.7,423.4L1039.6,424.3L1031.9,424.8L1029.8,426.8L1026.1,427.1L1022.5,427.1L1021.1,426L1017.9,426.8L1012.6,429.2L1011.5,431L1007.1,433.5L1006.3,435L1004,436.1L1001.2,435.4L999.6,436.7L998.8,440.6L994.3,445.4L994.4,447.3L992.9,449.7L993.3,453L990.9,453.8L989.6,454.6L988.7,452.1L987.1,452.8L986.1,452.7L985,454.3L980.6,454.3L979.1,453.4L978.3,453.9L976.6,452.3L976.9,450.6L976.2,449.9L975,450.5L975.2,448.6L976.3,447.2L974,444.8L973.3,443.2L972.1,442L970.9,441.8L969.6,442.6L967.7,443.4L966.2,444.6L963.7,444.2L962.2,442.7L961.2,442.5L959.7,443.3L958.8,443.3L958.5,441.2Z"},{"name":"Mauritania","fill":"#ffda79","d":"M926.9,392.5L928.2,390.6L950.4,390.7L949.4,382.5L950.8,379.5L956.1,379L955.9,364.5L974.6,364.8L974.6,356.1L996,369.9L987.3,370L990,394.6L992.8,419.1L993.8,419.8L992.5,423.8L969.7,423.9L968.8,425.2L966.6,424.8L963.4,425.9L959.4,424.3L957.6,424.5L956.7,427.8L954.8,428.8L951,424.9L947.6,420.8L943.8,419.2L941.1,417.6L937.9,417.6L935.1,418.9L932.3,418.4L930.3,420.2L929.9,417.1L931.4,414.3L932.1,409L931.5,403.4L930.8,400.5L931.4,397.7L929.9,395L926.9,392.5Z"},{"name":"Benin","fill":"#cd84f1","d":"M1039.3,476.4L1034.6,477.1L1033.2,473.1L1033.5,460.1L1032.3,458.9L1032.1,456.1L1030.1,454.1L1028.4,452.4L1029.1,449.4L1031.1,448.8L1032.2,446.3L1035,445.8L1036.3,444.1L1038.2,442.4L1040.2,442.4L1044.5,445.7L1044.3,447.6L1045.6,450.9L1044.5,453.2L1045.1,454.8L1042.3,458.3L1040.6,460L1039.5,463.6L1039.6,467.2L1039.3,476.4Z"},{"name":"Niger","fill":"#706fd3","d":"M1108.5,381.9L1109.9,390.8L1112,392.3L1112.1,394.1L1114.5,396L1113.2,398.5L1111,410L1110.7,417.4L1103.5,422.8L1101,430.3L1103.4,432.4L1103.4,436L1107,436.2L1106.5,438.8L1104.9,439.2L1104.7,441L1103.6,441.1L1099.8,434.9L1098.4,434.7L1094,437.8L1089.6,436.2L1086.5,435.8L1084.9,436.6L1081.5,436.5L1078.2,438.9L1075.3,439L1068.4,436.1L1065.7,437.5L1062.8,437.4L1060.7,435.2L1055,433.1L1048.9,433.8L1047.4,435L1046.6,438.3L1044.9,440.6L1044.5,445.7L1040.2,442.4L1038.2,442.4L1036.3,444.1L1036.4,440.2L1029.8,438.9L1029.6,436.1L1026.4,432.4L1025.7,429.8L1026.1,427.1L1029.8,426.8L1031.9,424.8L1039.6,424.3L1044.7,423.4L1045.2,419.9L1048.3,416.1L1048.3,403L1056.3,400.5L1072.8,389.3L1092.3,378.5L1101.3,380.9L1104.5,384L1108.5,381.9Z"},{"name":"Nigeria","fill":"#778beb","d":"M1039.3,476.4L1039.6,467.2L1039.5,463.6L1040.6,460L1042.3,458.3L1045.1,454.8L1044.5,453.2L1045.6,450.9L1044.3,447.6L1044.5,445.7L1044.9,440.6L1046.6,438.3L1047.4,435L1048.9,433.8L1055,433.1L1060.7,435.2L1062.8,437.4L1065.7,437.5L1068.4,436.1L1075.3,439L1078.2,438.9L1081.5,436.5L1084.9,436.6L1086.5,435.8L1089.6,436.2L1094,437.8L1098.4,434.7L1099.8,434.9L1103.6,441.1L1104.7,441L1106.9,443.2L1106.3,444.3L1106,446.2L1101.2,450.6L1099.7,454.2L1098.9,457.2L1097.7,458.4L1096.6,462.4L1093.5,464.7L1092.6,467.6L1091.4,469.9L1090.8,472.3L1086.9,474.2L1083.7,471.9L1081.6,472L1078.2,475.3L1076.5,475.3L1073.8,480.8L1072.4,484.9L1066.5,486.9L1064.3,486.6L1062.1,487.9L1057.6,487.8L1054.5,484.2L1052.6,480.1L1048.6,476.3L1044.3,476.4L1039.3,476.4Z"},{"name":"Cameroon","fill":"#ff5252","d":"M1106.5,438.8L1108.7,442.5L1109.1,446.3L1108.9,450L1112,455.2L1108.8,455.2L1107.2,455.6L1104.6,455L1103.4,457.7L1106.7,461L1109.2,462L1110,464.3L1111.8,468.2L1110.9,469.8L1108.1,475.5L1106.7,476.6L1106.3,481L1106.8,483.4L1106.4,485.1L1109.1,488L1109.5,490.1L1111.6,493L1114.2,494.9L1114.5,497.5L1115.1,499.1L1114.7,502.2L1110.2,500.8L1105.6,499.3L1098.4,499.1L1097.7,498.8L1094.3,499.5L1090.9,498.8L1088.2,499.1L1078.9,499L1079.7,494.5L1077.5,490.8L1074.9,489.8L1073.7,487.2L1072.3,486.4L1072.4,484.9L1073.8,480.8L1076.5,475.3L1078.2,475.3L1081.6,472L1083.7,471.9L1086.9,474.2L1090.8,472.3L1091.4,469.9L1092.6,467.6L1093.5,464.7L1096.6,462.4L1097.7,458.4L1098.9,457.2L1099.7,454.2L1101.2,450.6L1106,446.2L1106.3,444.3L1106.9,443.2L1104.7,441L1104.9,439.2L1106.5,438.8Z"},{"name":"Togo","fill":"#34ace0","d":"M1029.1,449.4L1028.4,452.4L1030.1,454.1L1032.1,456.1L1032.3,458.9L1033.5,460.1L1033.2,473.1L1034.6,477.1L1030,478.3L1028.8,476.3L1027.2,472.7L1026.8,469.8L1028.1,464.7L1026.6,462.6L1026.1,458.2L1026.1,454L1023.7,451.1L1024.1,449.3L1029.1,449.4Z"},{"name":"Ghana","fill":"#33d9b2","d":"M1024.1,449.3L1023.7,451.1L1026.1,454L1026.1,458.2L1026.6,462.6L1028.1,464.7L1026.8,469.8L1027.2,472.7L1028.8,476.3L1030,478.3L1021.1,481.6L1017.9,483.6L1012.8,485.2L1007.8,483.6L1008,481.3L1005.5,476.4L1007,470L1009.4,465.2L1007.9,457.1L1007.1,452.9L1007.3,449.6L1017.2,449.4L1019.7,449.8L1021.5,448.9L1024.1,449.3Z"},{"name":"Côte d'Ivoire","fill":"#ff9ff3","d":"M978.3,453.9L979.1,453.4L980.6,454.3L985,454.3L986.1,452.7L987.1,452.8L988.7,452.1L989.6,454.6L990.9,453.8L993.3,453L995.8,454.2L996.8,456.1L999.4,457.3L1001.4,455.9L1004,455.7L1007.9,457.1L1009.4,465.2L1007,470L1005.5,476.4L1008,481.3L1007.8,483.6L1005.2,483.6L1001.2,482.5L997.5,482.6L990.8,483.6L986.9,485.2L981.2,487.3L980.1,487.2L980.6,482.5L981.1,481.8L980.9,479.5L978.5,477.1L976.7,476.8L975.1,475.2L976.3,472.7L975.7,469.9L976,468.3L976.9,468.3L977.2,465.8L976.8,464.7L977.3,463.9L979.4,463.2L978,458.7L976.7,456.3L977.2,454.4L978.3,453.9Z"},{"name":"Guinea","fill":"#feca57","d":"M946.1,440.4L948.8,440.5L952.9,441.8L954.1,441.7L954.6,441.1L957.7,441.5L958.5,441.2L958.8,443.3L959.7,443.3L961.2,442.5L962.2,442.7L963.7,444.2L966.2,444.6L967.7,443.4L969.6,442.6L970.9,441.8L972.1,442L973.3,443.2L974,444.8L976.3,447.2L975.2,448.6L975,450.5L976.2,449.9L976.9,450.6L976.6,452.3L978.3,453.9L977.2,454.4L976.7,456.3L978,458.7L979.4,463.2L977.3,463.9L976.8,464.7L977.2,465.8L976.9,468.3L976,468.3L974.4,468.1L973.2,470.4L971.6,470.4L970.5,469.2L970.9,466.9L968.5,463.4L967,464.1L965.8,464.2L964.2,464.5L964.3,462.4L963.4,460.9L963.6,459.3L962.3,456.9L960.8,454.9L956.2,454.8L954.9,455.9L953.3,456L952.3,457.3L951.7,458.9L948.6,461.4L946.1,458L943.9,455.8L942.5,455L941.1,453.9L940.4,451.4L939.6,450.1L937.9,449.2L940.5,446.4L942.2,446.5L943.7,445.6L944.9,445.6L945.8,444.8L945.3,442.9L946,442.3L946.1,440.4Z"},{"name":"Guinea-Bissau","fill":"#ff6b6b","d":"M929.1,441.5L932.1,440.6L934,440.8L935.5,440.2L946.1,440.4L946,442.3L945.3,442.9L945.8,444.8L944.9,445.6L943.7,445.6L942.2,446.5L940.5,446.4L937.9,449.2L934.9,446.8L932.5,446.4L931.2,444.8L931.2,444L929.5,442.8L929.1,441.5Z"},{"name":"Liberia","fill":"#48dbfb","d":"M976,468.3L975.7,469.9L976.3,472.7L975.1,475.2L976.7,476.8L978.5,477.1L980.9,479.5L981.1,481.8L980.6,482.5L980.1,487.2L978.6,487.2L972.8,484.5L967.6,480.2L962.8,477.1L958.9,473.4L960.3,471.6L960.6,469.9L963.2,466.8L965.8,464.2L967,464.1L968.5,463.4L970.9,466.9L970.5,469.2L971.6,470.4L973.2,470.4L974.4,468.1L976,468.3Z"},{"name":"Sierra Leone","fill":"#1dd1a1","d":"M948.6,461.4L951.7,458.9L952.3,457.3L953.3,456L954.9,455.9L956.2,454.8L960.8,454.9L962.3,456.9L963.6,459.3L963.4,460.9L964.3,462.4L964.2,464.5L965.8,464.2L963.2,466.8L960.6,469.9L960.3,471.6L958.9,473.4L957.4,473L953.3,470.7L950.3,467.6L949.3,465.6L948.6,461.4Z"},{"name":"Burkina Faso","fill":"#f368e0","d":"M993.3,453L992.9,449.7L994.4,447.3L994.3,445.4L998.8,440.6L999.6,436.7L1001.2,435.4L1004,436.1L1006.3,435L1007.1,433.5L1011.5,431L1012.6,429.2L1017.9,426.8L1021.1,426L1022.5,427.1L1026.1,427.1L1025.7,429.8L1026.4,432.4L1029.6,436.1L1029.8,438.9L1036.4,440.2L1036.3,444.1L1035,445.8L1032.2,446.3L1031.1,448.8L1029.1,449.4L1024.1,449.3L1021.5,448.9L1019.7,449.8L1017.2,449.4L1007.3,449.6L1007.1,452.9L1007.9,457.1L1004,455.7L1001.4,455.9L999.4,457.3L996.8,456.1L995.8,454.2L993.3,453Z"},{"name":"Central African Rep.","fill":"#ff9f43","d":"M1179.7,482.2L1177.9,482.8L1174.2,482.7L1169.9,482.1L1167.8,482.6L1167,484L1165.1,484.1L1162.9,482.9L1156.5,485.8L1153.9,485.2L1153.2,485.6L1151.5,489.1L1147.2,488L1143.1,487.4L1139.4,485.3L1134.8,483.4L1131.7,485.2L1129.5,488.1L1129,492.1L1125.3,491.7L1121.5,490.8L1118.1,493.8L1115.1,499.1L1114.5,497.5L1114.2,494.9L1111.6,493L1109.5,490.1L1109.1,488L1106.4,485.1L1106.8,483.4L1106.3,481L1106.7,476.6L1108.1,475.5L1110.9,469.8L1115.6,469.3L1116.7,467.9L1117.6,468L1119,469.3L1126.2,467.1L1128.6,464.9L1131.6,462.9L1131,460.9L1132.6,460.4L1138.1,460.7L1143.5,458.1L1147.6,451.9L1150.5,449.6L1154.1,448.6L1154.7,451L1158,454.6L1158,456.9L1157.1,459.3L1157.5,461.1L1159.4,462.7L1163.8,465.2L1166.9,467.5L1166.9,469.3L1170.8,472.3L1173.1,474.8L1174.6,478.2L1178.8,480.4L1179.7,482.2Z"},{"name":"Congo","fill":"#cf6a87","d":"M1129,492.1L1128.6,495.5L1126.9,498.5L1125.8,502.1L1125.1,507.1L1125.4,510.4L1124.5,512.3L1124.3,514.4L1123.7,516.2L1119.9,519L1117.3,521.9L1114.9,527.4L1115.1,532.1L1113.6,533.9L1110.3,536.7L1107,540.3L1104.8,539.3L1104.5,537.7L1101.4,537.6L1099.4,539.8L1097.9,539.2L1095.8,537.2L1094.1,538.2L1091.8,540.7L1087.1,534.6L1091.4,531.5L1089.3,527.7L1091.2,526.3L1095.1,525.6L1095.5,523.1L1098.6,525.8L1103.6,526.1L1105.3,523.4L1106.1,519.6L1105.4,515.1L1102.8,511.8L1105.2,505.2L1103.8,504.1L1099.6,504.5L1098,501.6L1098.4,499.1L1105.6,499.3L1110.2,500.8L1114.7,502.2L1115.1,499.1L1118.1,493.8L1121.5,490.8L1125.3,491.7L1129,492.1Z"},{"name":"Gabon","fill":"#0abde3","d":"M1088.2,499.1L1090.9,498.8L1094.3,499.5L1097.7,498.8L1098.4,499.1L1098,501.6L1099.6,504.5L1103.8,504.1L1105.2,505.2L1102.8,511.8L1105.4,515.1L1106.1,519.6L1105.3,523.4L1103.6,526.1L1098.6,525.8L1095.5,523.1L1095.1,525.6L1091.2,526.3L1089.3,527.7L1091.4,531.5L1087.1,534.6L1081.3,528.9L1077.5,524.2L1074.1,518.3L1074.2,516.4L1075.5,514.6L1076.9,510.5L1078,506.3L1079.9,505.9L1088.2,506L1088.2,499.1Z"},{"name":"Eq. Guinea","fill":"#10ac84","d":"M1078.9,499L1088.2,499.1L1088.2,506L1079.9,505.9L1078,506.3L1076.9,505.4L1078.9,499Z"},{"name":"Zambia","fill":"#54a0ff","d":"M1198.9,559.4L1201.3,560.9L1203.5,561.8L1207.1,562.8L1210.4,564.5L1213,567L1214.5,571.9L1213.5,573.4L1212.4,578L1213.5,582.7L1211.7,584.7L1210,590L1213,591.5L1195.7,596.2L1196.2,600.2L1191.9,601L1188.7,603.3L1188,605.2L1186,605.7L1181,610.4L1177.9,614L1175.9,614.2L1174.1,613.5L1167.7,612.9L1166.7,612.5L1166.7,612L1164.4,610.7L1160.7,610.4L1156.1,611.7L1152.4,608.1L1148.5,603.5L1148.8,585.4L1160.6,585.4L1160.1,583.5L1161,581.4L1160,578.7L1160.6,575.9L1160,574.2L1162,574.3L1162.3,576.1L1165,575.9L1168.6,576.5L1170.5,579L1175.1,579.8L1178.5,578L1179.8,581L1184.2,581.8L1186.3,584.2L1188.6,587.4L1193,587.4L1192.5,581.3L1190.9,582.3L1186.9,580.1L1185.4,579.1L1186.1,573.4L1187.1,566.6L1185.8,564.1L1187.5,560.5L1189,559.8L1196.6,558.9L1198.9,559.4Z"},{"name":"Malawi","fill":"#5f27cd","d":"M1210.4,564.5L1215.9,565.6L1217.1,567.1L1219,569.8L1220.6,577.5L1219,581.9L1220.6,589.3L1222.6,589.2L1224.6,591L1227,595.1L1227.5,602.4L1225,603.6L1223.3,607.6L1219.6,604.1L1219.2,600.1L1220.4,597.4L1220,595.1L1217.8,593.7L1216.2,594.2L1213,591.5L1210,590L1211.7,584.7L1213.5,582.7L1212.4,578L1213.5,573.4L1214.5,571.9L1213,567L1210.4,564.5Z"},{"name":"Mozambique","fill":"#c8d6e5","d":"M1220.6,577.5L1224.9,577.1L1231.7,578.7L1233.2,578L1237.2,577.8L1239.2,576.1L1242.6,576.2L1248.8,574L1253.4,570.7L1253.4,570.7L1253.4,570.7L1254.3,573.2L1254,578.9L1254.7,583.9L1255,592.8L1256,595.6L1254.3,599.6L1252.1,603.6L1248.4,607.1L1243.2,609.3L1236.8,612L1230.4,618.2L1228.2,619.2L1224.2,623.2L1221.9,624.5L1221.4,628.6L1224.1,632.9L1225.2,636.3L1225.3,638L1226.3,637.7L1226.1,643.2L1225.2,645.9L1226.6,646.9L1225.7,649.2L1223.3,651.3L1218.7,653.2L1211.8,656.3L1209.3,658.4L1209.8,660.8L1211.3,661.1L1210.8,664.1L1206.5,664.1L1206,661.6L1205.1,659L1204.6,657L1205.6,650.6L1204.2,646.6L1201.4,638.6L1207.4,632.1L1208.9,628L1209.8,627.5L1210.4,624.2L1209.5,622.5L1209.8,618.2L1210.9,614.3L1210.9,607.1L1207.9,605.3L1205.2,604.8L1204,603.4L1201.3,602.2L1196.6,602.3L1196.2,600.2L1195.7,596.2L1213,591.5L1216.2,594.2L1217.8,593.7L1220,595.1L1220.4,597.4L1219.2,600.1L1219.6,604.1L1223.3,607.6L1225,603.6L1227.5,602.4L1227,595.1L1224.6,591L1222.6,589.2L1220.6,589.3L1219,581.9L1220.6,577.5Z"},{"name":"eSwatini","fill":"#ffda79","d":"M1206.5,664.1L1205.3,666.6L1202,667.2L1198.6,664.1L1198.5,662.2L1200.1,660L1200.6,658.4L1202.3,658L1205.1,659L1206,661.6L1206.5,664.1Z"},{"name":"Angola","fill":"#cd84f1","d":"M1097.9,539.2L1095.9,540.4L1094.9,541.9L1094.8,544.3L1093.3,544.9L1091.8,540.7L1094.1,538.2L1095.8,537.2L1097.9,539.2Z M1094.1,546.7L1096.4,545.9L1098.1,546L1100.1,545.4L1116.9,545.4L1118.3,549.7L1119.9,553.1L1121.2,554.9L1123.4,557.9L1127.2,557.4L1129,556.6L1132.2,557.4L1133,556L1134.5,552.7L1138,552.5L1138.3,551.5L1141.2,551.5L1140.7,553.5L1147.6,553.5L1147.7,557.1L1148.9,559.3L1148,562.7L1148.4,566.2L1150.3,568.3L1150,575.1L1151.4,574.5L1153.9,574.7L1157.4,573.8L1160,574.2L1160.6,575.9L1160,578.7L1161,581.4L1160.1,583.5L1160.6,585.4L1148.8,585.4L1148.5,603.5L1152.4,608.1L1156.1,611.7L1145.6,614L1131.8,613.2L1127.9,610.5L1104.8,610.7L1104,611.1L1100.6,608.5L1096.9,608.4L1093.5,609.3L1090.8,610.4L1090.2,606.9L1091,601.8L1093,596.6L1093.3,594.2L1095.1,589.1L1096.5,586.7L1099.7,583L1101.6,580.5L1102.2,576.3L1101.9,573L1100.2,571L1098.6,567.6L1097.2,564.1L1097.6,563L1099.3,560.7L1097.6,555.2L1096.4,551.4L1093.6,547.8L1094.1,546.7Z"},{"name":"Burundi","fill":"#706fd3","d":"M1197.3,525.7L1197.7,528L1198.9,529.3L1198.9,531.1L1197.5,532.3L1195.3,535.3L1193.3,537.3L1190.9,537.6L1190.6,530.7L1189.1,528.2L1192.6,528.6L1194.3,525.4L1197.3,525.7Z"},{"name":"Israel","fill":"#33d9b2","d":"M1227.2,325.9L1226.2,327.7L1224.2,326.9L1223,330.7L1224.4,331.4L1222.9,332.1L1222.7,333.6L1225.4,332.9L1225.5,335.1L1222.7,344.2L1222.1,342.7L1218.9,334.4L1218.9,334.4L1218.9,334.4L1220.6,332.5L1220.2,332.2L1221.7,329.5L1222.9,325.2L1223.7,323.8L1223.8,323.7L1225.7,323.8L1226.3,322.8L1227.8,322.7L1227.9,325L1227.1,325.9L1227.2,325.9Z"},{"name":"Lebanon","fill":"#ff5252","d":"M1227.8,322.7L1226.3,322.8L1225.7,323.8L1223.8,323.7L1225.9,319.1L1228.7,315.1L1228.8,314.9L1231.3,315.2L1232.3,317.4L1229.2,319.6L1227.8,322.7Z"},{"name":"Madagascar","fill":"#f8a5c2","d":"M1305.8,582.9L1307.4,585.4L1308.8,589.1L1309.7,596L1311.2,598.6L1310.6,601.4L1309.6,603L1307.7,599.7L1306.6,601.4L1307.7,605.6L1307.2,608L1305.6,609.3L1305.2,614.1L1303,620.8L1300.2,628.6L1296.7,639.4L1294.5,647.3L1291.9,653.9L1287.3,655.2L1282.3,657.6L1279.1,656.2L1274.5,654.2L1273,651.2L1272.6,646.1L1270.6,641.6L1270.1,637.5L1271.1,633.4L1273.7,632.4L1273.7,630.5L1276.4,626.2L1277,622.6L1275.6,619.9L1274.6,616.3L1274.1,611L1276.1,607.9L1276.9,604.3L1279.7,604L1282.9,602.9L1285,601.8L1287.5,601.8L1290.7,598.5L1295.4,595L1297.1,592.2L1296.3,589.7L1298.7,590.4L1301.9,586.5L1302,583L1303.9,580.5L1305.8,582.9Z"},{"name":"Palestine","fill":"#33d9b2","d":"M1225.4,332.9L1222.7,333.6L1222.9,332.1L1224.4,331.4L1223,330.7L1224.2,326.9L1226.2,327.7L1226.2,331.2L1225.4,332.9Z"},{"name":"Gambia","fill":"#ff9ff3","d":"M928.9,434.7L935.1,434.5L936.4,433.1L938.2,433.1L940.4,434.5L942.2,434.5L944.1,433.5L945.2,435.2L942.8,436.4L940.3,436.3L937.9,435.1L935.8,436.5L934.7,436.5L933.4,437.3L928.2,437.2L928.9,434.7Z"},{"name":"Tunisia","fill":"#feca57","d":"M1077.9,339.6L1075.5,329.4L1072,327.1L1072,325.7L1067.3,322.3L1066.8,318L1070.3,314.9L1071.7,310.2L1070.8,304.7L1071.9,301.8L1078.1,299.5L1082.1,300.2L1081.9,303.1L1086.7,301L1087.1,302.1L1084.3,304.9L1084.3,307.5L1086.2,308.9L1085.5,313.8L1081.7,316.7L1082.8,319.8L1085.8,319.9L1087.2,322.6L1089.4,323.5L1089,327.9L1086.3,329.5L1084.5,331.3L1080.6,333.5L1081.2,335.9L1080.7,338.3L1077.9,339.6Z"},{"name":"Algeria","fill":"#f7d794","d":"M974.6,356.1L974.7,355L974.7,354.7L974.7,347.9L983.8,343.7L989.5,342.9L994.2,341.3L996.4,338.5L1003,336.2L1003.2,332L1006.5,331.5L1009.1,329.4L1016.6,328.5L1017.6,326.2L1016.1,325L1014.1,319L1013.8,315.6L1011.7,311.9L1017.1,308.8L1023.3,307.8L1026.9,305.5L1032.3,303.8L1042,302.7L1051.4,302.3L1054.3,303.1L1059.6,300.9L1065.7,300.8L1068,302.2L1071.9,301.8L1070.8,304.7L1071.7,310.2L1070.3,314.9L1066.8,318L1067.3,322.3L1072,325.7L1072,327.1L1075.5,329.4L1077.9,339.6L1079.8,344.6L1080.1,347.2L1079.1,351.9L1079.5,354.5L1078.8,357.6L1079.3,361.2L1077,363.6L1080.4,367.7L1080.6,370.1L1082.6,373.3L1085.3,372.3L1089.8,374.9L1092.3,378.5L1072.8,389.3L1056.3,400.5L1048.3,403L1042,403.6L1041.9,400L1039.3,399L1035.7,397.4L1034.4,394.7L1015.2,382.3L996,369.9L974.6,356.1Z"},{"name":"Jordan","fill":"#48dbfb","d":"M1226.2,327.7L1227.2,325.9L1233.5,328.2L1244.7,322.1L1247,329L1245.9,329.9L1234.5,332.8L1240.2,338.4L1238.3,339.4L1237.4,341.3L1233,342.1L1231.7,344.1L1229.2,345.9L1222.9,345L1222.7,344.2L1225.5,335.1L1225.4,332.9L1226.2,331.2L1226.2,327.7Z"},{"name":"United Arab Emirates","fill":"#1dd1a1","d":"M1317.4,374.1L1318.4,373.8L1318.7,375.4L1323.1,374.5L1327.8,374.6L1331.2,374.8L1335.1,370.9L1339.4,367.3L1343,363.8L1344.1,365.7L1344.8,370.2L1341.9,370.2L1341.5,373.9L1342.5,374.7L1339.9,375.8L1339.9,378.2L1338.2,380.5L1338.1,382.8L1336.9,384L1319.8,381.1L1317.6,375.4L1317.4,374.1Z"},{"name":"Qatar","fill":"#f368e0","d":"M1313.1,371.2L1312.7,367L1314.2,364L1315.8,363.4L1317.5,365.2L1317.6,368.6L1316.3,371.9L1314.8,372.3L1313.1,371.2Z"},{"name":"Kuwait","fill":"#ff9f43","d":"M1296.9,341.5L1298.1,344L1297.6,345.3L1299.4,349.6L1295.4,349.7L1294,347L1288.9,346.5L1293.1,341L1296.9,341.5Z"},{"name":"Iraq","fill":"#ee5253","d":"M1247,329L1244.7,322.1L1257.3,316.2L1259.4,309.3L1258.9,305.2L1262,303.8L1264.9,300.2L1267.4,299.3L1274,300.1L1276,301.5L1278.7,300.5L1282.4,307.3L1286.1,309L1286.6,312.4L1283.7,314.3L1282.4,318.8L1286.3,324.2L1293.3,327.3L1296.2,331.6L1295.3,335.7L1297.1,335.7L1297.1,338.8L1300.3,341.7L1296.9,341.5L1293.1,341L1288.9,346.5L1278.3,346L1262.3,334.6L1253.8,330.6L1247,329Z"},{"name":"Oman","fill":"#0abde3","d":"M1338.1,382.8L1338.2,380.5L1339.9,378.2L1339.9,375.8L1342.5,374.7L1341.5,373.9L1341.9,370.2L1344.8,370.2L1347.4,374.1L1350.6,376.2L1354.7,376.9L1358.1,377.9L1360.7,381.2L1362.2,383.1L1364.2,383.8L1364.2,385.1L1362.2,388.5L1361.3,390.1L1358.9,391.9L1356.7,395.8L1354.2,395.5L1353,396.8L1352.1,399.7L1352.8,403.5L1352.2,404.2L1349.6,404.2L1346,406.3L1345.5,409.1L1344.2,410.3L1340.7,410.3L1338.4,411.7L1338.5,414L1335.7,415.6L1332.6,415L1328.8,417L1326.1,417.3L1324.3,413.3L1319.8,403.9L1336.9,398.2L1340.7,386.8L1338.1,382.8Z M1344.1,365.7L1343,363.8L1344.6,361.8L1345.3,362.3L1344.8,364.7L1344.1,365.7Z"},{"name":"Vanuatu","fill":"#10ac84","d":"M1975.3,602.4L1978.9,605.7L1977,606.4L1975.1,603.9L1975.3,602.4Z M1972.9,601.1L1972.1,599.6L1971.9,595.2L1974.7,597L1975.6,601.5L1974.1,600.8L1972.9,601.1Z"},{"name":"Cambodia","fill":"#54a0ff","d":"M1607.6,442.7L1606.2,435.8L1609.9,431.1L1617.2,430L1622.6,430.8L1627.3,433L1629.8,429.1L1634.9,431.2L1636.2,435L1635.5,441.8L1625.9,446.2L1628.4,449.6L1622.5,450.1L1617.5,452.3L1612.8,451.5L1610.5,448.5L1607.6,442.7Z"},{"name":"Thailand","fill":"#ff6348","d":"M1622.6,430.8L1617.2,430L1609.9,431.1L1606.2,435.8L1607.6,442.7L1602.5,440.1L1597.6,440.2L1598.5,435.7L1593.4,435.7L1593,442L1589.9,450.3L1588.1,455.3L1588.5,459.4L1592.2,459.6L1594.5,464.8L1595.5,469.7L1598.7,473L1602.1,473.7L1605.1,476.6L1603.2,478.9L1599.5,479.6L1599,476.7L1594.4,474.2L1593.4,475.2L1591.1,473L1590.2,470.2L1587.1,467L1584.4,464.3L1583.4,467.7L1582.4,464.5L1583,460.9L1584.7,455.5L1587.4,449.6L1590.5,444.3L1588.3,439.2L1588.4,436.5L1587.8,433.3L1584,428.8L1582.6,426L1584.6,424.9L1586.7,420L1584.3,416.2L1580.7,412.1L1578,407.1L1580.4,406L1583,399.9L1587,399.6L1590.3,397.2L1593.5,395.8L1596,397.6L1596.3,401L1600.2,401.3L1598.8,407.3L1598.9,412.4L1604.9,409L1606.6,410L1609.9,409.8L1611.1,407.8L1615.4,408.2L1619.7,412.8L1620.1,418.5L1624.7,423.4L1624.4,428.2L1622.6,430.8Z"},{"name":"Laos","fill":"#c8d6e5","d":"M1634.9,431.2L1629.8,429.1L1627.3,433L1622.6,430.8L1624.4,428.2L1624.7,423.4L1620.1,418.5L1619.7,412.8L1615.4,408.2L1611.1,407.8L1609.9,409.8L1606.6,410L1604.9,409L1598.9,412.4L1598.8,407.3L1600.2,401.3L1596.3,401L1596,397.6L1593.5,395.8L1594.8,393.8L1599.6,390L1600.1,391.4L1603.1,391.5L1602.3,385L1605.2,384.2L1608.6,388.7L1611.1,393.9L1618.1,393.9L1620.3,398.9L1616.7,400.4L1615.1,402.4L1621.9,405.8L1626.6,412.5L1630.2,417.5L1634.5,421.5L1635.9,425.5L1634.9,431.2Z"},{"name":"Myanmar","fill":"#ffda79","d":"M1593.5,395.8L1590.3,397.2L1587,399.6L1583,399.9L1580.4,406L1578,407.1L1580.7,412.1L1584.3,416.2L1586.7,420L1584.6,424.9L1582.6,426L1584,428.8L1587.8,433.3L1588.4,436.5L1588.3,439.2L1590.5,444.3L1587.4,449.6L1584.7,455.5L1584.1,451.3L1585.9,446.9L1583.9,443.5L1584.4,437.3L1582.1,434.4L1580.2,427.6L1579.2,420.4L1576.8,415.7L1573,418.5L1566.5,422.6L1563.4,422.1L1559.8,420.8L1561.8,413.7L1560.6,408.4L1556.1,401.8L1556.8,399.8L1553.5,399L1549.5,394.4L1549.1,389.8L1551.1,390.7L1551.2,386.6L1554,385.3L1553.4,382.8L1554.7,380.9L1554.9,375L1559.4,376.3L1561.9,371.6L1562.2,368.9L1565.3,364.1L1565.2,360.8L1572.5,356.9L1576.6,357.9L1576.1,354.4L1578.1,353.4L1577.7,351.2L1581,350.8L1582.9,354.1L1585.4,355.5L1585.6,359.9L1585.3,364.6L1579.9,369.3L1579.3,376.1L1585.3,375.1L1586.6,380.3L1590.2,381.4L1588.6,386.2L1592.8,388.3L1595.3,389.4L1599.4,387.7L1599.6,390L1594.8,393.8L1593.5,395.8Z"},{"name":"Vietnam","fill":"#ffa502","d":"M1617.5,452.3L1622.5,450.1L1628.4,449.6L1625.9,446.2L1635.5,441.8L1636.2,435L1634.9,431.2L1635.9,425.5L1634.5,421.5L1630.2,417.5L1626.6,412.5L1621.9,405.8L1615.1,402.4L1616.7,400.4L1620.3,398.9L1618.1,393.9L1611.1,393.9L1608.6,388.7L1605.2,384.2L1608.3,382.8L1612.8,382.8L1618.4,382.2L1623.2,379.2L1625.9,381.3L1631.1,382.3L1630.2,385.6L1633,387.9L1638.7,389.4L1631.1,394.3L1626.3,399.6L1625.1,403.6L1629.5,409.6L1634.8,417L1639.9,420.5L1643.4,425.1L1646,435.6L1645.2,445.6L1640.5,449.4L1634,453L1629.3,457.8L1622.2,463.1L1620.2,459.4L1621.8,455.6L1617.5,452.3Z"},{"name":"North Korea","fill":"#706fd3","d":"M1768,271.8L1768,271.8L1768,271.8L1768,271.8Z M1767.2,270.8L1767.2,270.8L1768,271.8L1765.8,271.5L1763.4,273.4L1761.7,275.3L1761.9,279.4L1758.9,280.7L1757.9,281.7L1755.8,283.4L1752,284.3L1749.5,285.8L1749.3,288.3L1748.7,288.9L1750.9,289.8L1754.2,292.3L1753.3,293.7L1750.9,294.1L1746.9,294.4L1744.7,296.9L1742.2,296.7L1741.8,297.2L1739,296.2L1738.3,297.2L1736.7,297.7L1736.5,296.6L1735,296.1L1733.5,295.2L1735,292.7L1736.4,292L1735.9,291L1737.3,287.9L1736.9,287L1733.6,286.4L1730.9,284.9L1735.6,281.2L1741.8,278.1L1745.7,274.1L1748.4,275.9L1753.4,276.1L1752.5,273.1L1761.3,270.6L1763.5,267.5L1767.2,270.8Z"},{"name":"South Korea","fill":"#33d9b2","d":"M1741.8,297.2L1742.2,296.7L1744.7,296.9L1746.9,294.4L1750.9,294.1L1753.3,293.7L1754.2,292.3L1759.1,299.1L1760.5,302.7L1760.5,309.3L1758.4,312.4L1753.2,313.5L1748.7,315.9L1743.6,316.4L1742.9,313.3L1744,309L1741.5,303.1L1745.7,302.1L1741.8,297.2Z"},{"name":"Mongolia","fill":"#eccc68","d":"M1523.2,231.6L1529.2,230.6L1540.1,225.7L1548.7,223L1553.7,224.7L1559.6,224.8L1563.4,227.5L1569.1,227.7L1577.3,229.1L1582.8,225.2L1580.5,221.8L1586.4,215.9L1592.8,218.3L1597.9,218.9L1604.6,220.4L1605.7,224.7L1613.8,227L1619.2,226L1626.4,225.2L1632.1,226L1637.7,228.7L1641.1,231.6L1646.4,231.6L1653.5,232.5L1658.8,231.1L1666.3,230.2L1674.6,226.1L1678,226.8L1681,228.7L1687.8,228.2L1685,232.5L1681,238.2L1682.4,240.5L1685.7,239.8L1691.3,240.7L1695.7,238.6L1700.2,240.4L1705.4,244.3L1704.8,246.4L1700.3,245.7L1692,246.5L1688,248.1L1683.8,251.9L1675.2,254.1L1669.5,257.1L1663.6,255.9L1660.4,255.4L1657.4,259.1L1659.3,261.3L1660.2,263.2L1656.2,265.1L1652.1,268.1L1645.5,270.1L1636.9,270.3L1627.8,272.3L1621.1,275.4L1618.6,273.6L1611.7,273.6L1603.3,270.1L1597.7,269.3L1590.1,270.1L1578.4,268.8L1572.1,268.9L1568.8,265.6L1566.2,260.3L1562.7,259.7L1555.8,256.1L1548.1,255.3L1541.4,254.4L1539.3,251.9L1541.5,245.3L1537.6,240.7L1529.5,238.5L1524.7,235.5L1523.2,231.6Z"},{"name":"India","fill":"#ff6b81","d":"M1577.7,351.2L1578.1,353.4L1576.1,354.4L1576.6,357.9L1572.5,356.9L1565.2,360.8L1565.3,364.1L1562.2,368.9L1561.9,371.6L1559.4,376.3L1554.9,375L1554.7,380.9L1553.4,382.8L1554,385.3L1551.2,386.6L1548.2,377.6L1546.6,377.6L1545.7,381.2L1542.6,378.3L1544.3,375.1L1546.9,374.7L1549.5,369.9L1546.2,368.9L1541,369L1535.5,368.2L1535,364.3L1532.3,364L1527.8,361.5L1525.8,365.4L1529.9,368.4L1526.4,370.5L1525.1,372.6L1528.6,374.1L1527.6,377.6L1529.6,381.8L1530.5,386.5L1529.7,388.6L1525.8,388.5L1518.8,389.7L1519.1,394L1516.1,397.4L1507.9,401.2L1501.5,407.9L1497.3,411.5L1491.6,415.2L1491.6,417.8L1488.7,419.2L1483.6,421.3L1481,421.6L1479.3,425.9L1480.4,433.3L1480.7,438L1478.3,443.4L1478.3,453.1L1475.4,453.4L1472.8,457.7L1474.5,459.6L1469.3,461.2L1467.4,465L1465.1,466.7L1459.7,461.4L1457.1,453.4L1454.9,447.7L1452.9,445L1449.9,439.5L1448.5,432.4L1447.5,428.8L1442.3,421L1440,410L1438.3,402.7L1438.3,395.8L1437.2,390.5L1428.9,393.9L1424.9,393.2L1417.5,386.3L1420.2,384.3L1418.5,382L1411.8,377.2L1415.6,373.4L1428.2,373.4L1427,368.6L1423.8,365.7L1423.2,361.3L1419.5,358.7L1425.7,352.8L1432.3,353.2L1438.3,347.2L1441.9,341.5L1447.4,335.8L1447.3,331.7L1452.1,328.4L1447.5,325.6L1445.6,321.8L1443.6,316.8L1446.3,314.3L1455,315.7L1461.3,314.9L1466.8,310.1L1472.9,316.7L1472.3,321.4L1474.6,324.3L1474.4,327.2L1470.3,326.4L1471.9,332.7L1477.5,336.3L1485.4,340.3L1481.8,342.9L1479.6,348.2L1485.1,350.3L1490.5,353.1L1497.9,356.3L1505.7,357.1L1509,360L1513.4,360.5L1520.2,361.8L1525,361.7L1525.6,359.5L1524.9,355.9L1525.3,353.4L1528.8,352.2L1529.3,356.7L1529.4,357.8L1534.5,360L1538.1,359.1L1542.9,359.5L1547.6,359.3L1548,355.8L1545.7,354L1550.2,353.3L1555.4,349.1L1562,345.4L1566.7,346.8L1570.8,344.4L1573.5,348L1571.5,350.4L1577.7,351.2Z"},{"name":"Bangladesh","fill":"#33d9b2","d":"M1551.2,386.6L1551.1,390.7L1549.1,389.8L1549.5,394.4L1547.8,391.4L1547.5,388.5L1546.4,385.8L1544.1,382.5L1538.8,382.3L1539.3,384.6L1537.6,387.8L1535.1,386.6L1534.3,387.7L1532.7,387L1530.5,386.5L1529.6,381.8L1527.6,377.6L1528.6,374.1L1525.1,372.6L1526.4,370.5L1529.9,368.4L1525.8,365.4L1527.8,361.5L1532.3,364L1535,364.3L1535.5,368.2L1541,369L1546.2,368.9L1549.5,369.9L1546.9,374.7L1544.3,375.1L1542.6,378.3L1545.7,381.2L1546.6,377.6L1548.2,377.6L1551.2,386.6Z"},{"name":"Bhutan","fill":"#ff9ff3","d":"M1545.7,354L1548,355.8L1547.6,359.3L1542.9,359.5L1538.1,359.1L1534.5,360L1529.4,357.8L1529.3,356.7L1533,352.5L1536.1,351L1540.2,352.3L1543.2,352.5L1545.7,354Z"},{"name":"Nepal","fill":"#feca57","d":"M1525.3,353.4L1524.9,355.9L1525.6,359.5L1525,361.7L1520.2,361.8L1513.4,360.5L1509,360L1505.7,357.1L1497.9,356.3L1490.5,353.1L1485.1,350.3L1479.6,348.2L1481.8,342.9L1485.4,340.3L1487.8,338.9L1492.4,340.7L1498.1,344.4L1501.3,345.2L1503.2,347.9L1507.6,349.1L1512.2,351.6L1518.7,352.9L1525.3,353.4Z"},{"name":"Pakistan","fill":"#ff6b6b","d":"M1466.8,310.1L1461.3,314.9L1455,315.7L1446.3,314.3L1443.6,316.8L1445.6,321.8L1447.5,325.6L1452.1,328.4L1447.3,331.7L1447.4,335.8L1441.9,341.5L1438.3,347.2L1432.3,353.2L1425.7,352.8L1419.5,358.7L1423.2,361.3L1423.8,365.7L1427,368.6L1428.2,373.4L1415.6,373.4L1411.8,377.2L1407.7,375.8L1406,371.7L1401.6,367.4L1391.1,368.4L1381.9,368.5L1373.9,369.3L1376,362.7L1384.2,359.8L1383.7,357.2L1381,356.2L1380.9,351.2L1375.4,348.7L1373.1,345.3L1370.3,342.3L1379.8,345.2L1385.5,344.4L1388.9,345.1L1390.1,343.8L1394,344.3L1401.4,342L1401.6,337.1L1404.8,333.9L1409,333.9L1409.7,332.3L1414,331.6L1416.1,332.1L1418.3,330.5L1418,327.1L1420.4,323.7L1424.1,322.2L1421.8,318.5L1427.2,318.6L1428.8,316.6L1428.6,314.4L1431.4,312L1430.7,309.2L1429.4,306.8L1432.7,304.3L1438.8,303.1L1445.4,302.4L1448.3,301.4L1451.6,300.8L1455.8,303.4L1457.5,307.8L1466.8,310.1Z"},{"name":"Afghanistan","fill":"#48dbfb","d":"M1402.4,299.4L1405.6,299.5L1409.9,300.7L1411.6,301.4L1415.7,299.6L1417.6,300.7L1419.5,298L1422.9,298.2L1423.8,297.3L1424.4,295L1426.8,293.1L1429.9,294.3L1429.3,296.1L1431,296.4L1430.5,301.1L1432.7,303L1434.7,301.8L1437.2,301.2L1440.8,298.7L1444.7,299.1L1450.6,299.1L1451.6,300.8L1448.3,301.4L1445.4,302.4L1438.8,303.1L1432.7,304.3L1429.4,306.8L1430.7,309.2L1431.4,312L1428.6,314.4L1428.8,316.6L1427.2,318.6L1421.8,318.5L1424.1,322.2L1420.4,323.7L1418,327.1L1418.3,330.5L1416.1,332.1L1414,331.6L1409.7,332.3L1409,333.9L1404.8,333.9L1401.6,337.1L1401.4,342L1394,344.3L1390.1,343.8L1388.9,345.1L1385.5,344.4L1379.8,345.2L1370.3,342.3L1375.5,337.1L1375,333.5L1370.7,332.5L1370.2,328.9L1368.4,324.4L1370.8,321.3L1368.3,320.4L1369.9,316.3L1372.2,309.2L1378,311.3L1382.3,310.6L1383.5,308L1388,307.2L1391.2,305.4L1392.3,300.9L1397.1,299.8L1398,297.7L1400.7,299.3L1402.4,299.4Z"},{"name":"Tajikistan","fill":"#1dd1a1","d":"M1409.9,300.7L1413.1,294.9L1411.8,290.7L1407.7,289.3L1409.1,286.8L1413.9,287.1L1416.6,284L1418.4,280.3L1426,279L1424.8,281.6L1425.6,283.2L1428,283.1L1425.9,284.8L1419.7,283.9L1419.2,287.1L1425.3,286.7L1432.4,288.5L1443.1,287.7L1444.6,292.9L1446.4,292.4L1449.9,293.7L1449.7,295.9L1450.6,299.1L1444.7,299.1L1440.8,298.7L1437.2,301.2L1434.7,301.8L1432.7,303L1430.5,301.1L1431,296.4L1429.3,296.1L1429.9,294.3L1426.8,293.1L1424.4,295L1423.8,297.3L1422.9,298.2L1419.5,298L1417.6,300.7L1415.7,299.6L1411.6,301.4L1409.9,300.7Z"},{"name":"Kyrgyzstan","fill":"#f368e0","d":"M1427.7,271.6L1429,269.1L1432.7,268.3L1442.1,270.2L1443,266.9L1446.2,265.7L1454.3,268.1L1456.4,267.4L1465.8,267.6L1474.2,268.2L1477.1,270.2L1480.6,271.1L1479.8,272.4L1470.8,275.4L1468.8,277.7L1461.5,278.4L1459.4,282L1453.3,281.2L1449.4,282.4L1444,285L1444.8,286.4L1443.1,287.7L1432.4,288.5L1425.3,286.7L1419.2,287.1L1419.7,283.9L1425.9,284.8L1428,283.1L1432.3,283.6L1439.6,279.5L1432.9,276.5L1428.8,277.9L1424.6,275.8L1429.4,272.1L1427.7,271.6Z"},{"name":"Turkmenistan","fill":"#ff9f43","d":"M1322.7,274.3L1325.2,272.4L1331.7,271.2L1335.5,272.8L1339.5,277.3L1342.4,277L1348.8,276.9L1347.9,274.1L1352.7,272.1L1357.5,268.8L1365.2,271.8L1365.8,276.3L1368,277.5L1374.1,277.2L1376,278.3L1378.8,284.1L1385.3,288.1L1389.1,290.7L1395,293.5L1402.6,296L1402.4,299.4L1400.7,299.3L1398,297.7L1397.1,299.8L1392.3,300.9L1391.2,305.4L1388,307.2L1383.5,308L1382.3,310.6L1378,311.3L1372.2,309.2L1371.7,304.4L1367.5,304.2L1361,299.2L1356.4,298.5L1350.1,295.7L1346.1,295.1L1343.6,296.2L1339.8,296L1335.8,299.3L1330.8,300.4L1329.7,296.4L1330.5,290.4L1326.1,288.5L1327.5,284.6L1323.8,284.3L1325,279.5L1330.4,280.9L1335.4,279L1331.2,275.6L1329.6,272.4L1325,273.8L1324.5,278L1322.7,274.3Z"},{"name":"Iran","fill":"#7bed9f","d":"M1300.3,341.7L1297.1,338.8L1297.1,335.7L1295.3,335.7L1296.2,331.6L1293.3,327.3L1286.3,324.2L1282.4,318.8L1283.7,314.3L1286.6,312.4L1286.1,309L1282.4,307.3L1278.7,300.5L1278.7,300.5L1275.6,296L1276.7,294.2L1274.9,287.7L1278.8,286.1L1279.7,288.2L1282.6,290.8L1286.5,291.6L1288.6,291.4L1295.3,287.2L1297.4,286.8L1299.1,288.5L1297.1,291.3L1300.7,294.3L1302.1,294L1303.9,298.2L1309.3,299.4L1313.2,302.2L1321.3,303.2L1330.2,301.7L1330.8,300.4L1335.8,299.3L1339.8,296L1343.6,296.2L1346.1,295.1L1350.1,295.7L1356.4,298.5L1361,299.2L1367.5,304.2L1371.7,304.4L1372.2,309.2L1369.9,316.3L1368.3,320.4L1370.8,321.3L1368.4,324.4L1370.2,328.9L1370.7,332.5L1375,333.5L1375.5,337.1L1370.3,342.3L1373.1,345.3L1375.4,348.7L1380.9,351.2L1381,356.2L1383.7,357.2L1384.2,359.8L1376,362.7L1373.9,369.3L1363.1,367.6L1356.9,366.3L1350.5,365.6L1348.1,358.6L1345.4,357.6L1341,358.6L1335.3,361.4L1328.3,359.5L1322.6,355.1L1317.1,353.5L1313.3,348.1L1309.1,340.5L1306,341.4L1302.4,339.5L1300.3,341.7Z"},{"name":"Syria","fill":"#0abde3","d":"M1227.2,325.9L1227.1,325.9L1227.9,325L1227.8,322.7L1229.2,319.6L1232.3,317.4L1231.3,315.2L1228.8,314.9L1228.3,310.6L1229.7,308.2L1231.2,307L1232.7,305.7L1233,302.5L1234.9,303.7L1241.1,302.1L1244.2,303.1L1248.8,303.1L1255.4,301L1258.5,301.1L1264.9,300.2L1262,303.8L1258.9,305.2L1259.4,309.3L1257.3,316.2L1244.7,322.1L1233.5,328.2L1227.2,325.9Z"},{"name":"Armenia","fill":"#10ac84","d":"M1288.6,291.4L1286.5,291.6L1284.2,288.3L1284.2,287.4L1281.7,287.4L1280,285.9L1278.8,286.1L1276.6,284.4L1272.4,283L1272.9,280.2L1271.9,278.2L1279.8,277.3L1281,278.8L1283.2,279.8L1282,281.3L1285.1,283.2L1283.5,285L1285.9,286.6L1288.4,287.5L1288.6,291.4Z"},{"name":"Sweden","fill":"#54a0ff","d":"M1086.7,177.2L1089.2,173.9L1094,170L1095.9,163.3L1092.2,160.4L1091.9,152.9L1095.6,147.5L1101.2,147.6L1103.2,145.4L1101.1,143.4L1110,135.4L1115.6,129.1L1119.4,125.1L1124.9,125.1L1126.4,121.9L1137.1,122.8L1137.9,119.1L1141.5,118.9L1149,121.6L1157.9,125.5L1158.1,134.3L1160,136.5L1150.2,138.1L1144.7,142.1L1145.6,145.6L1136.5,150.1L1125.5,155L1121.4,163L1125.4,167L1130.9,170.2L1125.7,176.6L1119.7,177.9L1117.6,187.5L1114.3,192.8L1107.4,192.3L1104.2,196.8L1097.6,197.1L1095.8,191.7L1091.1,185.2L1086.7,177.2Z"},{"name":"Belarus","fill":"#5f27cd","d":"M1184.3,192.5L1190.3,193.9L1191.1,195.3L1194.1,194.6L1199.6,196L1200.2,198.6L1199,200.2L1202.5,203.9L1204.9,204.9L1204.5,206L1208.4,207L1210,208.5L1207.8,209.7L1203.2,209.5L1202.1,210.1L1203.4,212L1204.8,215.6L1204.8,215.6L1199.9,215.9L1198.2,217.2L1197.8,220L1195.6,219.5L1190.4,219.8L1188.9,218.4L1186.8,219.4L1184.7,218.6L1180.2,218.5L1173.8,217.1L1168.1,216.7L1163.7,216.8L1160.6,218.4L1157.8,218.6L1157.7,216L1156,213.4L1159.4,212.2L1159.4,210L1157.8,207.8L1157.6,205.3L1163.1,205.3L1169.3,203.2L1170.6,200L1175.3,198.2L1174.7,195.6L1178.2,194.7L1184.3,192.5Z"},{"name":"Ukraine","fill":"#c8d6e5","d":"M1204.8,215.6L1207,215.8L1208.4,214.5L1210.1,214.8L1216,214.3L1219.7,217.5L1218.2,218.6L1218.7,220.4L1223.2,220.7L1225.3,223.2L1225.1,224.3L1232.4,226.3L1236.7,225.4L1240.2,228L1243.6,228L1251.9,229.8L1252,231.5L1249.7,234.5L1251,237.6L1250.1,239.5L1244.6,239.9L1241.6,241.5L1241.4,244L1236.9,244.5L1233.1,246.3L1227.8,246.6L1222.9,248.8L1223.2,251.8L1222.3,251.6L1221.6,250.5L1219.8,250.3L1215.7,249.1L1214.2,250.5L1213.4,249.9L1204.6,248.4L1204.2,246.3L1198.9,247L1196.8,250.1L1192.4,254.3L1189.8,253.4L1187.2,254.3L1184.6,253.2L1186,252.6L1187,250.7L1188.6,248.8L1188.2,247.8L1189.4,247.4L1189.9,248.2L1193.3,248.3L1194.8,247.9L1193.7,247.3L1194.1,246.5L1192.2,245L1191.3,242.7L1189.3,241.7L1189.7,239.8L1187.1,238.3L1184.8,238L1180.6,236.3L1176.8,236.8L1175.4,237.7L1173,237.7L1171.6,239L1167.4,239.6L1165.5,240.4L1162.8,239L1159.2,239L1155.7,238.4L1153.2,239.6L1152.8,238.1L1149.6,236.5L1150.8,234.2L1152.3,232.8L1153.6,233.1L1152.1,230.5L1157.3,225.8L1160.1,225.1L1160.7,223.5L1157.8,218.6L1160.6,218.4L1163.7,216.8L1168.1,216.7L1173.8,217.1L1180.2,218.5L1184.7,218.6L1186.8,219.4L1188.9,218.4L1190.4,219.8L1195.6,219.5L1197.8,220L1198.2,217.2L1199.9,215.9L1204.8,215.6Z"},{"name":"Poland","fill":"#ffda79","d":"M1157.6,205.3L1157.8,207.8L1159.4,210L1159.4,212.2L1156,213.4L1157.7,216L1157.8,218.6L1160.7,223.5L1160.1,225.1L1157.3,225.8L1152.1,230.5L1153.6,233.1L1152.3,232.8L1146.9,230.6L1142.8,231.4L1140.1,230.8L1136.8,232L1133.9,230L1131.6,230.8L1131.3,230.4L1128.6,227.6L1124.4,227.3L1123.9,225.5L1120,224.9L1119.1,226.3L1116,225.2L1116.4,223.6L1112.1,223.1L1109.4,221.3L1107.1,217.6L1107.5,215.7L1106.1,212.6L1104.1,210.6L1105.7,209.1L1104.3,206.2L1108.2,204.5L1117.1,201.9L1124.3,200L1129.9,200.9L1130.4,202.3L1135.8,202.4L1142.9,203L1153.3,202.9L1156.2,203.5L1157.6,205.3Z"},{"name":"Austria","fill":"#cd84f1","d":"M1120.6,238.2L1120.2,240.6L1117,240.6L1118.1,241.8L1116.2,245.5L1115.1,246.4L1110.1,246.6L1107.2,247.9L1102.5,247.4L1094.4,245.9L1093.1,244L1087.5,245L1086.9,246L1083.4,245.2L1080.5,245.1L1077.9,244L1078.8,242.6L1078.6,241.6L1080.3,241.3L1083.2,242.9L1084,241.4L1089,241.6L1093.1,240.6L1095.8,240.8L1097.6,242L1098.1,241L1097.3,237.3L1099.3,236.6L1101.3,233.9L1105.6,235.8L1108.8,233.4L1110.8,233L1115.2,234.8L1117.9,234.5L1120.5,235.5L1120,236.3L1120.6,238.2Z"},{"name":"Hungary","fill":"#706fd3","d":"M1149.6,236.5L1152.8,238.1L1153.2,239.6L1149.7,240.8L1147,244.7L1143.6,248.5L1139,249.6L1135.5,249.3L1131.1,250.8L1131.1,250.8L1129,251.7L1124.3,250.6L1120,248.1L1118.2,247.4L1117.1,245.5L1116.2,245.5L1118.1,241.8L1117,240.6L1120.2,240.6L1120.6,238.2L1123.5,239.7L1125.6,240.3L1130.4,239.6L1130.8,238.5L1133.1,238.3L1135.9,237.4L1136.5,237.8L1139.1,237.1L1140.5,235.7L1142.3,235.4L1148.4,237.1L1149.6,236.5Z"},{"name":"Moldova","fill":"#33d9b2","d":"M1175.4,237.7L1176.8,236.8L1180.6,236.3L1184.8,238L1187.1,238.3L1189.7,239.8L1189.3,241.7L1191.3,242.7L1192.2,245L1194.1,246.5L1193.7,247.3L1194.8,247.9L1193.3,248.3L1189.9,248.2L1189.4,247.4L1188.2,247.8L1188.6,248.8L1187,250.7L1186,252.6L1184.6,253.2L1183.6,250.6L1184.2,248.2L1184,245.7L1180.7,242.3L1178.9,239.9L1177.2,238.2L1175.4,237.7Z"},{"name":"Romania","fill":"#ff5252","d":"M1184.6,253.2L1187.2,254.3L1189.8,253.4L1192.4,254.3L1192.5,255.8L1189.8,257L1188.1,256.5L1186.5,263.4L1183.1,262.8L1179,260.7L1172.3,262L1169.5,263.5L1161.1,263.2L1156.7,262.3L1154.5,262.7L1152.9,260.4L1151.9,259.4L1153.2,258.4L1151.8,257.7L1150,259L1146.7,257.3L1146.2,255L1142.8,253.6L1142.1,251.8L1139,249.6L1143.6,248.5L1147,244.7L1149.7,240.8L1153.2,239.6L1155.7,238.4L1159.2,239L1162.8,239L1165.5,240.4L1167.4,239.6L1171.6,239L1173,237.7L1175.4,237.7L1177.2,238.2L1178.9,239.9L1180.7,242.3L1184,245.7L1184.2,248.2L1183.6,250.6L1184.6,253.2Z"},{"name":"Lithuania","fill":"#34ace0","d":"M1174.7,195.6L1175.3,198.2L1170.6,200L1169.3,203.2L1163.1,205.3L1157.6,205.3L1156.2,203.5L1153.3,202.9L1152.9,201.5L1153.5,199.9L1151,199L1145,198L1143.8,193.2L1150.3,191.5L1159.8,191.9L1165.4,191.3L1166.2,192.5L1169.3,192.9L1174.7,195.6Z"},{"name":"Latvia","fill":"#33d9b2","d":"M1179.2,185L1182,186.3L1182.5,189.1L1184.3,192.5L1178.2,194.7L1174.7,195.6L1169.3,192.9L1166.2,192.5L1165.4,191.3L1159.8,191.9L1150.3,191.5L1143.8,193.2L1144,189L1146.8,185.4L1152.1,183.4L1156.7,187.7L1161.2,187.6L1162.3,183.2L1167.2,182.2L1169.7,182.9L1174.5,185L1179.2,185Z"},{"name":"Estonia","fill":"#ff9ff3","d":"M1183.2,173.7L1183.2,173.7L1184,174.6L1180,177.9L1181.7,183.2L1179.2,185L1174.5,185L1169.7,182.9L1167.2,182.2L1162.3,183.2L1163,179.9L1160.9,180.6L1157.3,178.6L1156.8,175.3L1164,173.7L1171.1,172.9L1177.3,173.8L1183.2,173.7L1183.2,173.7Z"},{"name":"Germany","fill":"#f0932b","d":"M1104.3,206.2L1105.7,209.1L1104.1,210.6L1106.1,212.6L1107.5,215.7L1107.1,217.6L1109.4,221.3L1106.9,221.9L1105.4,221.2L1104,222.3L1099.9,223.4L1097.8,224.8L1093.6,226L1094.6,227.7L1095.2,230.1L1098.1,231.5L1101.3,233.9L1099.3,236.6L1097.3,237.3L1098.1,241L1097.6,242L1095.8,240.8L1093.1,240.6L1089,241.6L1084,241.4L1083.2,242.9L1080.3,241.3L1078.6,241.6L1072.5,239.9L1071.3,241.1L1066.5,241.1L1067.2,237L1070.1,233.1L1061.9,232.1L1059.2,230.6L1059.5,228.1L1058.4,226.8L1059,223L1058.1,217L1061.5,217L1062.9,214.9L1064.3,209.7L1063.3,207.7L1064.4,206.5L1069.1,206.2L1070.2,207.5L1074.1,204.7L1072.8,202.5L1072.5,199.3L1076.8,200.1L1080.4,199.2L1080.5,201.4L1086.3,202.7L1086.2,204.8L1092,203.7L1095.2,202.1L1101.6,204.4L1104.3,206.2Z"},{"name":"Bulgaria","fill":"#ff6b6b","d":"M1152.9,260.4L1154.5,262.7L1156.7,262.3L1161.1,263.2L1169.5,263.5L1172.3,262L1179,260.7L1183.1,262.8L1186.5,263.4L1183.5,265.7L1181.4,269.8L1183.3,273L1178.4,272.3L1172.6,274.1L1172.5,276.9L1167.3,277.4L1163.3,275.4L1158.8,277L1154.6,276.8L1154.2,273.1L1151.3,271.2L1152.3,270.4L1151.6,269.8L1152.6,268L1154.8,266.2L1152,263.7L1151.5,261.6L1152.9,260.4Z"},{"name":"Greece","fill":"#48dbfb","d":"M1173.6,311.2L1172.8,312.9L1164.7,313.3L1164.7,312.4L1157.8,311.3L1158.8,308.9L1161.9,310.8L1166.4,310.5L1170.6,310.9L1170.5,311.9L1173.6,311.2Z M1154.6,276.8L1158.8,277L1163.3,275.4L1167.3,277.4L1172.5,276.9L1172.6,274.1L1175.3,275.6L1173.6,279.1L1172.2,279.8L1168.8,279.6L1165.8,279.1L1158.9,280.5L1162.9,283.7L1160,284.7L1156.8,284.7L1153.8,281.7L1152.7,283L1154,286.4L1156.8,289.1L1154.7,290.3L1157.9,292.9L1160.7,294.6L1160.8,297.8L1155.5,296.3L1157.2,299.2L1153.6,299.8L1155.7,304.8L1151.9,304.9L1147.3,302.4L1145.1,297.8L1144.1,294.1L1141.9,291.4L1139,288.2L1138.6,286.6L1141.3,283.8L1141.6,282L1143.5,281.1L1143.6,279.7L1147.3,279.1L1149.5,277.9L1152.6,278L1153.5,277L1154.6,276.8Z"},{"name":"Turkey","fill":"#1dd1a1","d":"M1278.7,300.5L1276,301.5L1274,300.1L1267.4,299.3L1264.9,300.2L1258.5,301.1L1255.4,301L1248.8,303.1L1244.2,303.1L1241.1,302.1L1234.9,303.7L1233,302.5L1232.7,305.7L1231.2,307L1229.7,308.2L1227.6,305.6L1229.7,303.5L1226.2,304L1221.5,302.7L1217.6,305.9L1208.9,306.6L1204.3,303.5L1198.2,303.3L1196.9,305.7L1193,306.4L1187.5,303.3L1181.2,303.5L1177.9,297.8L1173.7,294.6L1176.5,290.2L1172.9,287.5L1179.2,282.1L1188,281.8L1190.3,277.5L1201.2,278.3L1208,274.6L1214.7,273L1224.1,272.8L1234,276.8L1242.2,279L1248.8,278.2L1253.7,278.7L1260.4,275.7L1266.5,275.4L1271.9,278.2L1272.9,280.2L1272.4,283L1276.6,284.4L1278.8,286.1L1274.9,287.7L1276.7,294.2L1275.6,296L1278.7,300.5L1278.7,300.5Z M1172.6,274.1L1178.4,272.3L1183.3,273L1183.9,275.2L1188.9,277L1187.9,278.4L1181.1,278.8L1178.7,280.5L1173.9,283.6L1172.2,280.9L1172.2,279.8L1173.6,279.1L1175.3,275.6L1172.6,274.1Z"},{"name":"Albania","fill":"#f368e0","d":"M1143.6,279.7L1143.5,281.1L1141.6,282L1141.3,283.8L1138.6,286.6L1137.7,286.2L1137.6,284.9L1134.4,283L1133.9,280.3L1134.4,276.4L1135.2,274.7L1134.2,273.8L1134.2,273.8L1133.8,272L1136.3,269.2L1136.6,270.2L1138.2,269.7L1139.4,271.2L1140.8,271.8L1141.1,273.9L1141.1,273.9L1140.4,275.8L1141.2,278.3L1143.6,279.7Z"},{"name":"Croatia","fill":"#ff9f43","d":"M1118.2,247.4L1120,248.1L1124.3,250.6L1129,251.7L1131.1,250.8L1132.5,253L1134.3,254.7L1132.1,256.8L1129.5,255.5L1125.6,255.6L1120.7,254.7L1118.1,254.8L1116.8,256L1114.8,254.7L1113.6,257L1116.4,259.7L1117.6,261.5L1120.2,263.6L1122.4,264.8L1124.6,267.2L1129.6,269.4L1129,270.3L1129,270.3L1123.6,268.2L1120.3,266.2L1115.1,264.5L1110.3,260.3L1111.5,259.9L1108.9,257.5L1108.8,255.6L1105.1,254.7L1103.4,257.1L1101.7,255.2L1101.8,253.2L1102,253.2L1106,253.3L1107,252.4L1109,253.3L1111.2,253.4L1111.2,251.8L1113.2,251.3L1113.7,249L1118.2,247.4Z"},{"name":"Switzerland","fill":"#ee5253","d":"M1078.6,241.6L1078.8,242.6L1077.9,244L1080.5,245.1L1083.4,245.2L1083,247.6L1080.4,248.5L1076.2,247.8L1075,250.1L1072.3,250.3L1071.3,249.4L1068.1,251.3L1065.4,251.6L1062.9,250.4L1061,247.9L1058.3,248.8L1058.3,246.2L1062.5,243L1062.3,241.5L1064.9,242.1L1066.5,241.1L1071.3,241.1L1072.5,239.9L1078.6,241.6Z"},{"name":"Luxembourg","fill":"#0abde3","d":"M1058.4,226.8L1059.5,228.1L1059.2,230.6L1057.6,230.7L1056.3,230.2L1056.9,227L1058.4,226.8Z"},{"name":"Belgium","fill":"#10ac84","d":"M1059,223L1058.4,226.8L1056.9,227L1056.3,230.2L1051.3,227.6L1048.4,228.1L1044.4,225.4L1041.8,223.1L1039.1,223L1038.3,221L1042.9,219.9L1042.9,219.9L1042.9,219.9L1047,220.3L1052.3,219.2L1055.9,221.7L1059,223Z"},{"name":"Netherlands","fill":"#54a0ff","d":"M1063.3,207.7L1064.3,209.7L1062.9,214.9L1061.5,217L1058.1,217L1059,223L1055.9,221.7L1052.3,219.2L1047,220.3L1042.9,219.9L1042.9,219.9L1045.8,218.3L1050.8,210L1058.6,207.6L1063.3,207.7Z"},{"name":"Portugal","fill":"#5f27cd","d":"M972.6,273.7L974.7,272.3L977,271.5L978.4,274.3L981.8,274.2L982.7,273.5L986.1,273.7L987.7,276.6L985,278.1L985,282.6L984,283.4L983.8,286.1L981.3,286.6L983.6,290L982,293.7L984,295.4L983.2,296.9L981.1,299.1L981.6,301L979.3,302.4L976.3,301.6L973.4,302.3L974.2,297.8L973.7,294.3L971.2,293.8L969.8,291.6L970.3,287.9L972.5,285.8L972.9,283.5L974.1,280.1L974,277.7L972.9,275.7L972.6,273.7Z"},{"name":"Spain","fill":"#badc58","d":"M981.6,301L981.1,299.1L983.2,296.9L984,295.4L982,293.7L983.6,290L981.3,286.6L983.8,286.1L984,283.4L985,282.6L985,278.1L987.7,276.6L986.1,273.7L982.7,273.5L981.8,274.2L978.4,274.3L977,271.5L974.7,272.3L972.6,273.7L972.9,269.7L970.6,267.2L978.6,263.1L985.6,264.1L993.2,264.1L999.3,265.1L1004,264.8L1013.2,265L1015.5,267.2L1025.9,269.8L1028,268.5L1034.4,271.1L1041,270.4L1041.3,273.7L1035.9,277.5L1028.6,278.7L1028.1,280.6L1024.6,283.7L1022.4,288.4L1024.6,291.6L1021.3,294.2L1020.1,297.9L1015.8,299L1011.8,303.4L1004.6,303.5L999.1,303.3L995.6,305.4L993.4,307.5L990.6,307L988.5,305.1L986.9,301.8L981.6,301Z"},{"name":"Ireland","fill":"#ffda79","d":"M988.7,205.6L989.7,209.6L985.4,214.7L975.3,218.1L967.2,217.2L971.9,211.3L968.9,205.5L976.6,201L980.9,198.4L982.1,201.4L980.9,204.5L984.4,204.4L988.7,205.6Z"},{"name":"New Caledonia","fill":"#cd84f1","d":"M1967.1,631.9L1971.8,635.4L1974.7,638.1L1972.6,639.4L1969.4,637.9L1965.4,635.3L1961.7,632.3L1957.9,628.3L1957.1,626.4L1959.6,626.5L1962.8,628.4L1965.3,630.3L1967.1,631.9Z"},{"name":"Solomon Is.","fill":"#706fd3","d":"M1946.3,571.6L1947.9,573.6L1943.9,573.6L1941.7,570.1L1945.1,571.4L1946.3,571.6Z M1943.8,566.6L1942.9,567.7L1938.7,562.7L1937.5,559.3L1939.5,559.3L1941.5,563.9L1943.8,566.6Z M1939.1,568.2L1936.9,568.3L1933.4,567.7L1932.2,566.8L1932.5,564.6L1936.3,565.5L1938.1,566.7L1939.1,568.2Z M1932.2,557.6L1933.5,559.4L1933.8,560.6L1929.3,558.2L1926.2,556.1L1924,554.2L1924.9,553.6L1927.5,555L1932.2,557.6Z M1918,551.9L1920.2,553.8L1919.1,554.1L1916.6,552.8L1914.3,550.5L1914.6,549.5L1918,551.9Z"},{"name":"New Zealand","fill":"#686de0","d":"M2030.3,739.9L2028.1,743L2025.3,746.9L2020.9,749.2L2019.9,747.7L2017.6,746.8L2020.9,742.2L2019,739L2012.9,736.8L2013,734.7L2017.1,732.7L2018.1,728.3L2017.8,724.7L2015.5,720.8L2015.7,719.8L2013,717.5L2008.5,712.5L2006.1,708.4L2008.2,708L2011.3,711.1L2015.7,712.6L2017.3,717.7L2021.5,723.7L2021.6,719.8L2024.2,721.3L2025,725.6L2029.6,727.5L2033.4,728L2036.7,725.8L2039.6,726.4L2038.2,731.5L2036.5,734.8L2032.1,734.7L2030.6,736.4L2031.1,738.9L2030.3,739.9Z M1989.2,759.8L1994.1,756.8L1997.5,753.9L2000,749.6L2002.2,748.2L2003,745L2007,742.4L2008.3,744.8L2009.6,747.1L2013.6,744.8L2015.3,747.2L2015.3,749.6L2013.2,752.3L2009.4,756.5L2006.5,758.7L2008.6,761.5L2004.2,761.5L1999.4,763.7L1997.9,767.4L1994.6,773.2L1990.2,775.7L1987.3,777.3L1982.1,777.2L1978.4,775.3L1972.2,774.9L1971.3,772.9L1974.3,768.6L1981.5,763L1985.1,761.9L1989.2,759.8Z"},{"name":"Australia","fill":"#ff9f43","d":"M1864.2,744.2L1867.6,744.5L1868,751.3L1866.1,753.2L1865.5,757.8L1863.5,756.3L1859.5,760.2L1858.4,759.9L1854.9,759.7L1851.3,754.9L1850.6,751.1L1847.3,746.2L1847.4,743.6L1851.2,744.1L1856.6,746L1859.7,745.2L1864.2,744.2Z M1741.6,695.3L1735.6,698.2L1730.7,699.5L1729.6,702.5L1727.5,704.8L1722.7,704.9L1719.1,705.4L1714.1,704.4L1710,705L1706.1,705.3L1702.7,708.3L1701,708.1L1698.2,709.7L1695.4,711.5L1691.3,711.3L1687.5,711.3L1681.4,707.6L1678.4,706.5L1678.5,703.3L1681.3,702.5L1682.3,701.2L1682.1,699.2L1682.8,695.2L1682.1,691.8L1679.1,686.1L1678.2,682.8L1678.4,679.6L1676.2,675.9L1676,674.2L1673.5,672L1672.8,667.5L1669.6,663L1668.8,660.6L1671.3,663L1669.4,657.8L1672.2,659.4L1673.9,661.6L1673.8,658.7L1670.9,654.2L1670.4,652.4L1669.1,650.7L1669.7,647.4L1670.9,646L1671.6,643.2L1671,639.9L1673.4,635.8L1673.8,640.1L1676.2,636.2L1680.8,634.3L1683.6,631.9L1688,629.8L1690.5,629.3L1692.1,630L1696.6,627.9L1700,627.3L1700.9,626L1702.4,625.5L1705.6,625.6L1711.5,624L1714.6,621.5L1716.1,618.4L1719.4,615.5L1719.7,613.3L1719.8,610.2L1723.8,605.3L1726.2,610.2L1728.6,609.1L1726.6,606.4L1728.4,603.7L1730.9,604.9L1731.6,600.6L1734.7,597.8L1736.1,595.5L1738.9,594.5L1739,593L1741.5,593.6L1741.6,592.2L1744.1,591.4L1746.9,590.6L1751.1,593.2L1754.2,596.6L1757.8,596.6L1761.4,597.2L1760.2,594L1762.9,589.5L1765.5,588L1764.6,586.6L1767.1,583.3L1770.5,581.3L1773.4,582L1778.2,580.9L1778.1,578L1773.9,576.1L1777,575.3L1780.7,576.7L1783.8,579.1L1788.5,580.5L1790.2,579.9L1793.7,581.7L1797,580.1L1799.2,580.5L1800.5,579.5L1803.1,582.3L1801.6,585.3L1799.4,587.6L1797.5,587.8L1798.1,590.1L1796.5,592.9L1794.4,595.7L1794.8,597.3L1799.4,600.5L1803.7,602.3L1806.7,604.2L1810.8,607.6L1812.4,607.6L1815.4,609.1L1816.2,610.8L1821.7,612.8L1825.4,610.8L1826.5,607.8L1827.7,605.2L1828.4,602.1L1830.1,597.6L1829.3,594.8L1829.7,593.2L1829.1,589.9L1829.8,585.6L1830.9,584.5L1830,582.6L1831.4,579.6L1832.5,576.4L1832.6,574.8L1834.8,572.7L1836.4,575.5L1836.8,579L1838.2,579.7L1838.4,582.1L1840.5,585L1840.9,588.2L1840.7,590.3L1842.8,594.8L1846.4,592.6L1848.3,595L1851,597.2L1850.4,599.8L1851.6,604.6L1852.5,607.5L1853.9,608.2L1855.5,613L1854.9,616L1856.8,619.9L1862.9,622.8L1867,625.5L1870.8,628L1870,629.4L1873.3,632.9L1875.5,639.1L1877.8,637.9L1880.1,640.3L1881.5,639.4L1882.5,645.5L1886.5,649L1889.1,651.1L1893.6,655.7L1895.2,660.3L1895.3,663.6L1894.9,667.1L1897.6,671.9L1897.3,676.9L1896.3,679.6L1894.8,684.7L1894.9,687.9L1893.8,692L1891.3,697.2L1887.1,700L1885,704.4L1883.1,707.2L1881.4,712.1L1879.2,714.9L1877.8,719.2L1877,723.1L1877.3,724.9L1874.1,726.9L1867.7,727.1L1862.4,729.4L1859.8,731.6L1856.4,734.1L1851.7,731.6L1848.2,730.6L1849.1,727.6L1846,728.7L1841,732.8L1836.1,731.2L1832.8,730.3L1829.6,729.9L1824.1,728.3L1820.4,724.8L1819.3,720.5L1818,717.6L1815.2,715.3L1809.8,714.6L1811.6,711.8L1810.2,707.6L1807.5,711.5L1802.4,712.6L1805.4,709.4L1806.2,706.2L1808.4,703.4L1808,699.2L1803.4,704L1799.8,706L1797.6,710.5L1793.2,708.1L1793.4,705.1L1789.8,701L1786.8,698.9L1787.9,697.6L1780.6,694.1L1776.6,693.9L1771.1,691.2L1760.9,691.7L1753.5,693.8L1747.1,695.7L1741.6,695.3Z"},{"name":"Sri Lanka","fill":"#34ace0","d":"M1489.3,469.2L1488.4,475.1L1486,476.7L1481.1,478L1478.4,473.5L1477.4,465.3L1480,456.1L1483.9,459.3L1486.5,463.3L1489.3,469.2Z"},{"name":"China","fill":"#feca57","d":"M1646.8,408.5L1642.1,406.7L1642,401.8L1644.8,399.2L1651,397.6L1654.3,397.8L1655.5,400L1653,402.5L1651.7,405.7L1646.8,408.5Z M1480.6,271.1L1480.1,267.8L1484,266.4L1478.9,256.5L1490.2,254.2L1493.1,252.9L1497.2,242.7L1508.5,244.6L1511.7,242L1511.9,236.3L1516.7,235.8L1521,232L1523.2,231.6L1524.7,235.5L1529.5,238.5L1537.6,240.7L1541.5,245.3L1539.3,251.9L1541.4,254.4L1548.1,255.3L1555.8,256.1L1562.7,259.7L1566.2,260.3L1568.8,265.6L1572.1,268.9L1578.4,268.8L1590.1,270.1L1597.7,269.3L1603.3,270.1L1611.7,273.6L1618.6,273.6L1621.1,275.4L1627.8,272.3L1636.9,270.3L1645.5,270.1L1652.1,268.1L1656.2,265.1L1660.2,263.2L1659.3,261.3L1657.4,259.1L1660.4,255.4L1663.6,255.9L1669.5,257.1L1675.2,254.1L1683.8,251.9L1688,248.1L1692,246.5L1700.3,245.7L1704.8,246.4L1705.4,244.3L1700.2,240.4L1695.7,238.6L1691.3,240.7L1685.7,239.8L1682.4,240.5L1681,238.2L1685,232.5L1687.8,228.2L1694.6,230.3L1702.6,226.7L1702.6,224.2L1707.7,218.2L1710.9,216.4L1710.8,213.2L1707.7,211.9L1712.4,209.1L1719.4,208L1727,207.9L1735.5,209.6L1740.5,211.7L1744,217.4L1746.1,219.9L1748.1,223.3L1750.2,228.9L1760.1,230.7L1766.9,234.8L1769.2,240.1L1777.8,240.1L1782.7,237.9L1792.1,236.2L1789.2,241.3L1787,243.4L1785,249.6L1781.2,255.2L1774.3,254.2L1769.4,256.2L1770.9,261.1L1770.1,267.8L1767.2,267.9L1767.2,270.8L1763.5,267.5L1761.3,270.6L1752.5,273.1L1753.4,276.1L1748.4,275.9L1745.7,274.1L1741.8,278.1L1735.6,281.2L1730.9,284.9L1723,286.5L1718.8,289.2L1712.7,290.7L1715.7,288.1L1714.5,285.9L1719,282L1716,279.1L1711,281.1L1704.6,285L1701.1,288.7L1695.5,289L1692.6,291.6L1695.6,295.5L1700.3,296.4L1700.5,299L1705,300.6L1711.4,296.6L1716.4,298.8L1720.1,298.9L1721,301.9L1712.9,303.5L1710.3,306.6L1704.8,309.4L1701.8,313.4L1708,316.5L1710.2,322.1L1713.7,327.3L1717.5,331.7L1717.4,335.9L1713.9,337.5L1715.2,340.5L1718.6,342.3L1717.7,346.9L1716.2,351.4L1713.1,351.9L1708.9,358.1L1704.3,365.6L1699,372.4L1691.2,377.6L1683.3,382.4L1676.9,383L1673.4,385.6L1671.4,383.7L1668.2,386.6L1660.3,389.4L1654.2,390.3L1652.3,396.3L1649.2,396.6L1647.7,392.5L1649,390.3L1641.4,388.5L1638.7,389.4L1633,387.9L1630.2,385.6L1631.1,382.3L1625.9,381.3L1623.2,379.2L1618.4,382.2L1612.8,382.8L1608.3,382.8L1605.2,384.2L1602.3,385L1603.1,391.5L1600.1,391.4L1599.6,390L1599.4,387.7L1595.3,389.4L1592.8,388.3L1588.6,386.2L1590.2,381.4L1586.6,380.3L1585.3,375.1L1579.3,376.1L1579.9,369.3L1585.3,364.6L1585.6,359.9L1585.4,355.5L1582.9,354.1L1581,350.8L1577.7,351.2L1571.5,350.4L1573.5,348L1570.8,344.4L1566.7,346.8L1562,345.4L1555.4,349.1L1550.2,353.3L1545.7,354L1543.2,352.5L1540.2,352.3L1536.1,351L1533,352.5L1529.3,356.7L1528.8,352.2L1525.3,353.4L1518.7,352.9L1512.2,351.6L1507.6,349.1L1503.2,347.9L1501.3,345.2L1498.1,344.4L1492.4,340.7L1487.8,338.9L1485.4,340.3L1477.5,336.3L1471.9,332.7L1470.3,326.4L1474.4,327.2L1474.6,324.3L1472.3,321.4L1472.9,316.7L1466.8,310.1L1457.5,307.8L1455.8,303.4L1451.6,300.8L1450.6,299.1L1449.7,295.9L1449.9,293.7L1446.4,292.4L1444.6,292.9L1443.1,287.7L1444.8,286.4L1444,285L1449.4,282.4L1453.3,281.2L1459.4,282L1461.5,278.4L1468.8,277.7L1470.8,275.4L1479.8,272.4L1480.6,271.1Z"},{"name":"Taiwan","fill":"#ff9ff3","d":"M1716.8,373.2L1713.4,382.3L1710.9,387L1707.9,382.2L1707.3,378L1710.6,372.4L1715.2,368.1L1717.8,369.8L1716.8,373.2Z"},{"name":"Italy","fill":"#6ab04c","d":"M1083.4,245.2L1086.9,246L1087.5,245L1093.1,244L1094.4,245.9L1102.5,247.4L1101.9,250.2L1103.3,252.6L1098.8,251.8L1094.1,253.8L1094.5,256.7L1093.8,258.3L1095.6,261.2L1101,264L1103.8,268.7L1110.1,273.3L1114.6,273.3L1116,274.5L1114.4,275.7L1119.5,277.7L1123.7,279.5L1128.5,282.4L1129.1,283.5L1128.1,285.5L1124.9,282.9L1120,281.9L1117.6,285.6L1121.7,287.7L1121,290.7L1118.6,291L1115.6,295.9L1113.2,296.3L1113.2,294.6L1114.4,291.6L1115.6,290.3L1113.4,287L1111.7,284.2L1109.3,283.5L1107.6,281L1104,280L1101.5,277.7L1097.3,277.3L1092.9,274.7L1087.7,271L1083.8,267.8L1082,262.1L1079.2,261.5L1074.6,259.6L1071.9,260.4L1068.7,263L1066.3,263.4L1066.9,261L1063.9,260.2L1062.4,255.8L1064.4,254.1L1062.7,252L1062.9,250.4L1065.4,251.6L1068.1,251.3L1071.3,249.4L1072.3,250.3L1075,250.1L1076.2,247.8L1080.4,248.5L1083,247.6L1083.4,245.2Z M1108,295L1112.3,294.5L1110.2,299L1111.1,300.7L1109.9,303.7L1105.6,301.5L1102.7,300.9L1094.7,298L1095.5,295.1L1102.2,295.6L1108,295Z M1073.6,279.3L1076.4,277.6L1079.8,281.6L1079,289.1L1076.4,288.8L1074.1,290.7L1071.9,289.2L1071.7,282.3L1070.4,279L1073.6,279.3Z"},{"name":"Denmark","fill":"#ff6b6b","d":"M1080.4,199.2L1076.8,200.1L1072.5,199.3L1070.2,196.2L1070,190.4L1071,188.8L1072.6,187.1L1077.6,186.8L1079.6,185.2L1084.2,183.6L1084,186.5L1082.3,188.4L1083,190L1086.1,190.8L1084.7,193L1083,192.3L1078.9,196.4L1080.4,199.2Z M1094.4,192.8L1096.2,195.6L1092.8,200.2L1086.8,197L1086,194.7L1094.4,192.8Z"},{"name":"United Kingdom","fill":"#eb4d4b","d":"M988.7,205.6L984.4,204.4L980.9,204.5L982.1,201.4L980.9,198.4L985.7,198.1L991.8,201.6L988.7,205.6Z M1006.4,208.2L1006.4,208.2L1007.2,204.9L1003.4,201.4L1003.3,201.3L996.4,200.3L995.1,198.8L997.2,196.2L995.3,194.7L992.2,197.3L991.9,191.9L989,189L991.1,183.1L995.5,178.5L1000,178.9L1006.9,178.4L1000.8,184.6L1006.6,183.8L1012.9,183.8L1011.4,188.5L1006.3,193.6L1012.1,193.9L1012.6,194.5L1017.7,201.2L1021.6,202.2L1025.1,208.6L1026.7,210.9L1033.6,212L1032.9,215.6L1030,217.3L1032.2,220.2L1027.1,223.2L1019.5,223.1L1009.8,224.7L1007.2,223.6L1003.4,226.3L998.2,225.6L994.2,227.8L991.1,226.6L999.5,220.7L1004.6,219.4L1004.5,219.4L995.6,218.5L994,216.2L1000,214.5L996.9,211.4L997.9,207.7L1006.4,208.2Z"},{"name":"Iceland","fill":"#1dd1a1","d":"M941.5,133.9L940.1,137.6L946.6,141.5L939.2,145.8L922.8,149.7L917.9,150.8L910.4,149.9L894.5,148.1L900.1,145.6L887.7,142.8L897.8,141.7L897.6,140.1L885.6,138.7L889.5,135L898.1,134.2L906.9,138.1L915.6,135L922.7,136.6L932,133.5L941.5,133.9Z"},{"name":"Azerbaijan","fill":"#f368e0","d":"M1288,273.9L1289.6,274.1L1293.5,277.5L1296,277.9L1297,276.4L1300.4,274.2L1303.4,277.1L1306.3,281.2L1308.9,281.5L1310.7,283L1306,283.4L1305,287.9L1304,289.9L1301.9,291.2L1302.1,294L1300.7,294.3L1297.1,291.3L1299.1,288.5L1297.4,286.8L1295.3,287.2L1288.6,291.4L1288.4,287.5L1285.9,286.6L1283.5,285L1285.1,283.2L1282,281.3L1283.2,279.8L1281,278.8L1279.8,277.3L1281.2,276.4L1285.5,278.1L1288.5,278.4L1289.3,277.7L1286.5,274.6L1288,273.9Z M1286.5,291.6L1282.6,290.8L1279.7,288.2L1278.8,286.1L1280,285.9L1281.7,287.4L1284.2,287.4L1284.2,288.3L1286.5,291.6Z"},{"name":"Georgia","fill":"#ff9f43","d":"M1251.3,264.9L1252,264.2L1256.8,265.2L1265.2,266.1L1272.9,268.9L1273.9,269.9L1277.4,269L1282.7,270.2L1284.4,272.5L1288,273.9L1286.5,274.6L1289.3,277.7L1288.5,278.4L1285.5,278.1L1281.2,276.4L1279.8,277.3L1271.9,278.2L1266.5,275.4L1260.4,275.7L1261.2,273.3L1259.8,269.4L1256.5,267.3L1253.4,266.6L1251.3,264.9Z"},{"name":"Philippines","fill":"#3742fa","d":"M1711.4,439.7L1708.5,435.4L1713.4,435.6L1715.4,437.6L1713.8,442.6L1711.4,439.7Z M1721.4,455.2L1722.8,453.6L1723.4,450.1L1726.6,449.8L1725.7,453.6L1729.9,448.1L1729.3,453.5L1727.3,455.4L1725.5,459L1723.7,460.7L1720.2,456.7L1721.4,455.2Z M1742.9,464.1L1743.5,467.9L1743.9,471.1L1741.9,476.3L1739.8,470.5L1737.2,473.4L1739,477.6L1737.4,480.3L1730.7,476.9L1729.1,472.8L1730.8,470.1L1727.2,467.4L1725.4,469.8L1722.7,469.6L1718.5,472.7L1717.6,471.1L1719.8,466.3L1723.4,464.7L1726.5,462.5L1728.5,465.1L1732.8,463.6L1733.8,461L1737.8,460.9L1737.5,456.5L1742.1,459.2L1742.5,462L1742.9,464.1Z M1698.2,459L1690.6,464.4L1693.4,460.4L1697.5,456.9L1700.9,453L1703.9,447.3L1704.9,452L1701.1,455.1L1698.2,459Z M1720,408.3L1719,410.7L1721,414.8L1719.5,419.5L1716.1,421.4L1715.2,426L1716.5,430.5L1719.5,431.1L1722,430.4L1729.1,433.6L1728.6,436.7L1730.5,438.1L1729.9,440.7L1725.4,437.9L1723.3,434.9L1721.9,437L1718.2,433.6L1713.1,434.4L1710.2,433.2L1710.5,430.8L1712.3,429.4L1710.6,428.1L1709.9,430.1L1707.1,426.8L1706.2,424.4L1706,418.9L1708.3,420.8L1708.9,411.9L1710.7,406.7L1714.2,406.7L1717.7,408.4L1719.4,406.9L1720,408.3Z M1718.3,447.1L1717.4,444.3L1720.8,446.1L1724.4,446.1L1724.3,448.5L1721.7,450.9L1718.1,452.6L1717.9,450L1718.3,447.1Z M1738,442.8L1739.6,449.2L1735.2,447.7L1735.3,449.6L1736.7,453.1L1734,454.3L1733.7,450.3L1732,450L1731.1,446.6L1734.5,447.1L1734.4,444.9L1730.9,440.6L1736.4,440.7L1738,442.8Z"},{"name":"Malaysia","fill":"#2ed573","d":"M1593.4,475.2L1594.4,474.2L1599,476.7L1599.5,479.6L1603.2,478.9L1605.1,476.6L1606.4,477.1L1609.7,480.6L1612.1,484.4L1612.5,488.2L1611.8,490.8L1612.4,492.8L1612.8,496.1L1614.8,497.7L1617.1,502.7L1616.9,504.6L1612.9,505L1607.5,500.8L1600.8,496.3L1600.1,493.4L1596.8,489.6L1596.1,484.9L1594,481.8L1594.6,477.6L1593.4,475.2Z M1694.6,488.5L1689.7,487.5L1683.1,487.5L1681.2,494L1679,495.9L1676.1,503.9L1671.4,505.1L1666,503.5L1663.3,504L1660,506.9L1656.4,506.4L1652.7,507.6L1648.8,504.4L1647.9,500.6L1652,502.5L1656.4,501.5L1657.6,496.7L1660,495.6L1666.8,494.4L1670.9,489.9L1673.7,486.3L1676.3,489.2L1677.5,487.3L1680.2,487.4L1680.5,483.8L1680.8,481L1685.2,477.1L1688,472.6L1690.3,472.6L1693.3,475.5L1693.5,477.9L1697.3,479.5L1702,481.2L1701.6,483.5L1697.8,483.7L1698.8,486.5L1694.6,488.5Z"},{"name":"Brunei","fill":"#10ac84","d":"M1680.8,481L1680.5,483.8L1680.2,487.4L1677.5,487.3L1676.3,489.2L1673.7,486.3L1675.9,484.1L1680.8,481Z"},{"name":"Slovenia","fill":"#54a0ff","d":"M1102.5,247.4L1107.2,247.9L1110.1,246.6L1115.1,246.4L1116.2,245.5L1117.1,245.5L1118.2,247.4L1113.7,249L1113.2,251.3L1111.2,251.8L1111.2,253.4L1109,253.3L1107,252.4L1106,253.3L1102,253.2L1103.3,252.6L1101.9,250.2L1102.5,247.4Z"},{"name":"Finland","fill":"#5f27cd","d":"M1186.7,119.1L1185.8,123.1L1194.5,126.9L1189.3,131.2L1195.9,137.6L1192.1,142.5L1197.2,146.7L1194.9,150.5L1203.3,154.4L1201.2,157.3L1195.9,160.5L1183.7,167.8L1183.7,167.8L1183.7,167.8L1173.4,168.3L1163.4,170.3L1154.1,171.5L1150.8,168.4L1145.3,166.6L1146.6,161L1143.8,155.8L1146.5,152.5L1151.7,148.9L1164.7,142.8L1168.5,141.6L1167.9,139.2L1160,136.5L1158.1,134.3L1157.9,125.5L1149,121.6L1141.5,118.9L1144.9,117.4L1151.2,120.4L1158.6,120.1L1164.7,121.5L1170.1,118.9L1172.9,114.8L1181.8,112.8L1189.1,115.1L1186.7,119.1Z"},{"name":"Slovakia","fill":"#c8d6e5","d":"M1152.3,232.8L1150.8,234.2L1149.6,236.5L1148.4,237.1L1142.3,235.4L1140.5,235.7L1139.1,237.1L1136.5,237.8L1135.9,237.4L1133.1,238.3L1130.8,238.5L1130.4,239.6L1125.6,240.3L1123.5,239.7L1120.6,238.2L1120,236.3L1120.5,235.5L1121.3,234.3L1123.8,234.4L1125.8,233.8L1125.9,233.3L1127,233L1127.4,231.7L1128.7,231.5L1129.6,230.4L1131.3,230.4L1131.6,230.8L1133.9,230L1136.8,232L1140.1,230.8L1142.8,231.4L1146.9,230.6L1152.3,232.8Z"},{"name":"Czechia","fill":"#ffda79","d":"M1109.4,221.3L1112.1,223.1L1116.4,223.6L1116,225.2L1119.1,226.3L1120,224.9L1123.9,225.5L1124.4,227.3L1128.6,227.6L1131.3,230.4L1129.6,230.4L1128.7,231.5L1127.4,231.7L1127,233L1125.9,233.3L1125.8,233.8L1123.8,234.4L1121.3,234.3L1120.5,235.5L1117.9,234.5L1115.2,234.8L1110.8,233L1108.8,233.4L1105.6,235.8L1101.3,233.9L1098.1,231.5L1095.2,230.1L1094.6,227.7L1093.6,226L1097.8,224.8L1099.9,223.4L1104,222.3L1105.4,221.2L1106.9,221.9L1109.4,221.3Z"},{"name":"Eritrea","fill":"#cd84f1","d":"M1231.2,430L1230.6,427.7L1233.1,419.3L1233.6,415.5L1235.4,413.8L1239.6,412.9L1242.5,409.6L1245.8,416.2L1247.4,421.4L1250.5,424.2L1258.3,429.6L1261.4,432.8L1264.5,436.1L1266.3,438L1269.1,439.8L1267.4,441.1L1264.9,440.6L1263,438.8L1260.6,435.5L1258.1,433.6L1256.7,431.7L1251.7,429.4L1247.8,429.3L1246.4,428.1L1243.1,429.5L1239.6,426.9L1237.9,431.1L1231.2,430Z"},{"name":"Japan","fill":"#ea8685","d":"M1831.2,289.1L1825.9,294.8L1826,300.7L1823.9,305.2L1824.8,308.1L1821.9,312.1L1814.6,314.8L1804.6,315.1L1796.5,321.6L1792.7,319.4L1792.5,315.2L1782.6,316.4L1775.8,319.1L1769.2,319.2L1774.9,323.4L1771.1,333.1L1767.5,335.5L1764.7,333.3L1766.1,328.1L1762.5,326.5L1760.2,322.6L1765.6,320.8L1768.6,317.3L1774.3,314.3L1778.4,310.4L1789.8,308.7L1795.9,309.9L1801.8,299.8L1805.6,302.5L1813.9,296.8L1817.2,294.6L1820.8,287.6L1819.8,281.2L1822.2,277.6L1828.2,276.6L1831.3,284.5L1831.2,289.1Z M1846.7,261.9L1850.7,259.5L1852,265.9L1843.5,267.4L1838.6,273.1L1829.6,269.2L1826.5,275.4L1820.2,275.5L1819.4,269.9L1822.2,265.5L1828.3,265.2L1830,257.3L1831.6,252.9L1838.3,258.8L1842.7,260.7L1846.7,261.9Z M1777,321.6L1780.2,318.2L1783.4,318.9L1785.8,316.5L1789.9,317.7L1790.7,319.7L1787.5,323.1L1785.1,321.3L1782.2,322.6L1780.7,325.9L1777,324.3L1777,321.6Z"},{"name":"Paraguay","fill":"#33d9b2","d":"M693.1,626.8L694.8,629.9L694.4,637.7L700.4,638.8L702.7,637.6L706.6,639.2L707.6,640.9L708.2,646.1L708.8,648.3L711,648.5L713.1,647.6L715.1,648.7L715.1,651.8L714.4,655.1L713.2,658.4L712.3,663.4L707.2,667.8L702.7,668.7L696.3,667.9L690.5,666.3L696.1,657.7L695.3,655.1L689.5,652.9L682.5,648.7L677.9,647.9L667.4,638.6L669.6,631.8L669.8,628.7L672.5,623.7L682.4,622L687.7,622.1L693,625L693.1,626.8Z"},{"name":"Yemen","fill":"#ff5252","d":"M1319.8,403.9L1324.3,413.3L1326.1,417.3L1322,418.8L1320.9,421.3L1320.8,423.3L1315.1,425.7L1306,428.3L1300.9,432.3L1298.4,432.7L1296.7,432.3L1293.4,434.7L1289.8,435.8L1285,436.1L1283.6,436.4L1282.3,437.9L1280.8,438.3L1279.9,439.8L1277.1,439.6L1275.3,440.4L1271.4,440.1L1269.9,436.8L1270.1,433.7L1269.1,432L1268,427.8L1266.4,425.5L1267.5,425.2L1266.9,422.6L1267.6,421.5L1267.4,419L1269.9,417.2L1269.3,414.8L1270.8,412L1273.1,413.5L1274.7,413L1281.2,412.8L1282.3,413.4L1287.8,414L1290,413.7L1291.4,415.6L1294,414.6L1298.1,408.7L1303.4,406.1L1319.8,403.9Z"},{"name":"Saudi Arabia","fill":"#fed330","d":"M1222.9,345L1229.2,345.9L1231.7,344.1L1233,342.1L1237.4,341.3L1238.3,339.4L1240.2,338.4L1234.5,332.8L1245.9,329.9L1247,329L1253.8,330.6L1262.3,334.6L1278.3,346L1288.9,346.5L1294,347L1295.4,349.7L1299.4,349.6L1301.7,354.5L1304.5,355.8L1305.4,357.8L1309.3,360.2L1309.7,362.5L1309.1,364.4L1309.8,366.3L1311.4,367.9L1312.2,369.8L1313.1,371.2L1314.8,372.3L1316.3,371.9L1317.4,374.1L1317.6,375.4L1319.8,381.1L1336.9,384L1338.1,382.8L1340.7,386.8L1336.9,398.2L1319.8,403.9L1303.4,406.1L1298.1,408.7L1294,414.6L1291.4,415.6L1290,413.7L1287.8,414L1282.3,413.4L1281.2,412.8L1274.7,413L1273.1,413.5L1270.8,412L1269.3,414.8L1269.9,417.2L1267.4,419L1266.6,416.6L1264.9,414.9L1264.5,412.6L1261.5,410.5L1258.5,405.8L1256.9,401.1L1253,397.2L1250.4,396.3L1246.7,390.9L1246,386.9L1246.2,383.5L1243,377.2L1240.3,375L1237.2,373.8L1235.4,370.6L1235.7,369.3L1234.1,366.3L1232.4,365.1L1230.2,360.8L1226.8,356.3L1223.9,352.4L1221,352.4L1221.9,349.3L1222.2,347.3L1222.9,345Z"},{"name":"Antarctica","fill":"#e8f0fe","d":"M747.2,956L750.1,956L758.5,954.8L767.1,956L774.1,958.5L776.6,961.9L777.3,964.4L777.5,967.3L768.7,969L759.4,970.5L748.7,971.8L736.8,972.9L723.3,972.6L715.9,970.7L716.9,968.4L729,966.8L733.9,964.9L737.5,962.5L740,960.3L743.5,958.3L747.2,956L747.2,956Z M646.9,968.6L659.7,968.8L672,969.3L676.2,967L679.2,965L685.1,967.3L683.4,970.2L681.8,972.8L669.8,972L657.1,972.4L650,970.5L650,970.2L646.9,968.6Z M603.5,917.4L603.5,917.4L607.4,916.8L614,917L615.6,914.1L616,912L615.9,907.4L619.1,904.7L624.3,903.8L627.3,906L628.7,908.1L631.1,910.6L633,913.1L634.6,915.7L635.3,918.2L634.3,920.5L632.7,922.6L626,923.4L619.7,924.5L612.2,924.4L615,922.1L608.3,922.9L601.9,923.7L597.6,922L597.3,919.7L603.5,917.4Z M441.9,921L441.9,921L445.4,920L452.7,920.8L460.9,921.2L467.1,922L473.4,921.3L476.7,924.6L472.3,924.1L465.4,924.3L458.3,924.1L450.7,924.5L444.9,923.3L441.9,921Z M326.4,931L326.4,931L327.6,929.1L334.4,930.1L341.8,931L348.6,930L345.4,932L340,933.5L332.1,933L326.4,931Z M299.9,929.9L299.9,929.9L304,928.7L309.7,930L318.4,932.3L315.1,932L307.7,931.5L299.9,929.9Z M92.7,959.1L92.7,959.1L96.1,957L106.7,957.9L112.4,959.7L116.7,961.7L118.3,964.2L107.4,965L99.9,963L96.6,961L96.3,960.7L92.7,959.1Z M2048,993.9L2048,1024L0,1024L0,993.9L0.3,994L5.4,990.7L15.6,992.4L16.3,992.2L22.3,990.4L23.1,990.5L23.7,990.5L32,992.9L39.2,990.5L40.5,990.2L57.2,989.2L62.6,990.5L65.3,991.2L73.8,993.1L90,994.6L102.8,996.3L124.7,997.7L141.1,996.1L165.3,997.2L179,999L194.1,997.3L209.9,995.8L211.1,993.1L188.7,992.9L170.3,991.6L165.5,989.3L150.3,988.1L151.3,985.5L153.4,983.2L155.5,981.1L154.4,978.7L144.9,977.2L140.6,975.2L131.8,973.4L145.6,973.7L158.7,972.8L167,974.7L177.1,973L186.5,970.9L191,969L189,966.7L181.7,965.1L173.3,963.5L161.6,963.1L151.4,962.3L140.3,961.8L136.7,959.7L129.3,957.9L124.9,955.9L123.1,949.4L125.9,950L131,951.8L140.3,951.2L149.4,950.4L154.1,952.9L163.1,952.3L170.7,951.1L177.8,949.5L184.2,947.6L192.8,947.1L192.6,945L190.6,942.8L192.3,940.8L199.6,939.8L203,941.7L211.7,940.6L218.2,939.2L226.4,939L234.1,938.5L241.7,937.2L247.9,935.9L254.8,934.7L259.2,935L263.1,935.5L271.6,934.7L279.2,935.7L287,935.6L294.4,934.8L302.1,935.4L310.6,935.9L318.5,935.7L326.8,935.8L335.2,935.9L343,935.7L348.8,934L355.7,933.1L362.9,934.4L369.7,933.4L375.8,931.4L379.5,933.1L381.5,935.1L385.1,937L391,935.4L397.8,937.5L405.5,938.2L412.1,939.7L420.1,939.4L427.4,938.4L436,938.6L443.6,939.4L451.4,940.4L454.4,937.9L450.8,936L448,934L440.6,933.6L437.4,931.5L436.2,929.3L434.2,925.1L438.5,925.9L446,926.2L453.3,925.9L460,926.8L465.8,928.5L468.3,930.5L476,930.8L483.3,930L491.1,928.9L498.1,928.2L503.9,929.6L511.5,929.1L516.4,924.8L521,927.3L527.5,928.3L534.7,927.8L539.4,930L546.8,930.2L553.7,930.9L560.5,932.1L565,930L567.2,928L572.9,930.2L580.7,929.7L586.5,930.9L590.4,932.8L598,932.2L603.9,931L609.7,929.6L616.6,928.8L624.6,928.1L631.8,927.3L637.4,926.1L640.7,924.3L642.1,921.9L641.4,919.5L639.6,917.3L637.6,915.1L635.8,912.9L634.4,910.8L634.1,908.6L634.6,906.4L637.3,904.3L639.5,901.9L640.4,899.7L639.3,897.2L638.6,895L641.4,892.5L644.5,890.8L648.2,888.7L652.1,886.9L656.7,885.2L658.9,882.8L662,881.2L665.6,879.7L671.1,879.4L674.6,877.6L678.6,876.5L683.3,875.8L687.4,874.4L690.7,872.6L695.1,871.9L698.5,873.4L696.3,875.3L690.6,877L688.1,878.2L683.9,877.3L679.2,877.8L675.3,879.2L671.2,880.6L668.4,882.3L667.6,884.5L667.9,886.7L670.6,888.5L666.7,889.9L661.4,890.3L658.2,892.2L654.9,894L651.3,896.5L650.4,898.6L652.4,900.9L655.5,902.7L660.1,904L664.5,905.8L666.8,908.1L668,910.2L669.7,912.4L672.4,914.3L674.1,916.4L674.8,921.7L676.5,923.8L677,926L678.7,928.2L678,931.2L674.8,933.6L671.5,935.5L663.9,936.3L661.4,938.3L657.9,940.2L649.3,942.3L641.7,943.2L634.6,944.4L626.9,945.6L622.4,948L613.2,948.2L603.2,948L594.2,948.4L584.6,948.4L586.4,950.6L595.1,951.6L601.4,953.2L605,955.2L598.6,957L588.8,956.4L580.7,957.9L580.4,960.2L580.1,962.5L586.8,964.4L588,966.5L595.3,968.6L607.3,969.5L617.6,971L625.7,972.8L636.1,974.6L650.2,975.5L664.1,977.1L673.8,978.7L684.4,980.6L690,983.3L692.8,985.4L699.7,983.4L709,981.7L719,980L730.8,978.5L740.9,976.9L755.1,976.8L769,977.6L780.5,979L784.1,976.5L792.1,974.8L806.4,974.7L817.7,973.5L828.4,972.3L840.2,971.5L852.8,970.5L861.6,969L857.6,967L855.1,965L855.1,962.9L844.1,963.1L832.4,964L821.2,964L819.7,961.9L820.5,957.7L823,956.4L831.2,955.1L840.7,953.8L847.7,952.1L854.6,950.4L859.7,948.2L867.5,947.2L875.2,946.4L879.1,946L887.9,945.7L896.2,945L903.3,943.8L910.2,942.5L916.4,941.2L924.3,939.4L929.3,937.5L934.7,935.8L936.3,933.6L930.3,932.2L932.3,929.9L936.1,928.1L942,927L948.3,925.7L954.1,923.9L958.5,921.7L961.3,919L965.4,917.4L972.2,917.8L975,919.7L981.8,919.9L982,917.8L984.9,915.5L991.1,916.1L992.5,918.2L999.3,918.5L1006.7,917.5L1013.8,916.9L1020.2,917.2L1022.7,919.5L1028.9,917.6L1034.7,916.6L1041.2,915.9L1047.5,915.1L1053.3,913.7L1059.7,912.9L1064.6,911.6L1068,909.6L1072.3,911.1L1078.2,910.3L1082.3,913L1085.5,915L1092,913.9L1094.6,911.6L1100.4,910.1L1107.8,910.4L1110.1,912.5L1114.7,910.4L1120.9,909.7L1127.5,909.5L1133.6,909.6L1139.9,910.3L1146,910.6L1148.7,912.5L1152.4,914.2L1158.6,913.2L1165.3,913L1171.8,913L1178.1,912.9L1183.8,912.1L1189.8,911.4L1194.8,909.8L1200.2,908.8L1206,908.3L1210.3,906.7L1213.5,903.6L1216.7,901.7L1222.6,902.6L1224.8,904.6L1229.7,905.9L1235.6,905.5L1239.6,907.5L1243.9,908.9L1249.7,907.6L1251.7,905.2L1256.8,904.2L1262.7,902.3L1268.3,901.5L1275,900.4L1279.4,899.1L1284.1,897.8L1288.6,896.6L1293.9,897.2L1299,895.2L1302.7,893.7L1308.1,893.8L1312.7,892.5L1313.8,890.4L1318.6,888.9L1323.3,887.8L1329,886.9L1334.2,886.4L1339.2,886.8L1344.6,887.3L1349.2,888.9L1349.7,891.3L1354.7,893.2L1358.2,894.8L1365,895.5L1368.8,897L1373.5,898.6L1378.9,898.9L1383.5,897.8L1388.4,895.5L1393.7,896.7L1399.3,897.4L1404.7,898L1410.2,898.5L1415.9,898.5L1420.6,904.4L1420.4,905.8L1419.7,908.4L1414.2,909.8L1409.8,912L1410.6,914.2L1416.9,914.1L1416.1,916.3L1413.2,918.4L1410.6,920.8L1414.9,922.5L1421.5,923.1L1428.1,922.1L1431.2,919.9L1433.1,917.8L1436.2,916L1439.8,914.3L1441.2,912.3L1444.2,909.5L1447.8,908.9L1454.2,908.7L1459.9,908.1L1465.7,907.2L1468.5,904.9L1470.2,902.8L1474.1,900.7L1479.6,899.3L1484.4,898.1L1487.6,896.2L1490.8,895.2L1494.9,894.3L1500.6,894.9L1505.7,894.3L1511.3,893.7L1517.5,894L1521.6,892.5L1524.5,888.7L1526.7,890.2L1529.3,892.9L1534.1,894L1539.6,894.5L1545,893.8L1550.8,894.2L1556.2,894.3L1559.8,893.8L1564.5,894.1L1568.9,895.3L1574,894.6L1580.1,894.6L1585.4,893.8L1591.3,894.6L1595.1,892.7L1598,890.8L1601.9,889.2L1609,885L1612.7,885.8L1617,887.3L1620.8,889.3L1628.1,892.8L1633.6,892.9L1638.9,892.9L1645,892.2L1651.1,891.4L1655.8,889.9L1659.7,888.2L1666.1,888L1670.3,886.8L1674.7,887.9L1677.6,889.7L1681.6,891.4L1687.9,891.2L1691.8,892.7L1698.6,894.1L1705.7,894.7L1711.6,894.2L1716.1,892.5L1719.9,890.7L1725,890.2L1730.1,891L1736,891.6L1741.4,890.7L1746.5,890.7L1751.5,891.2L1756.7,891.8L1761.9,890.8L1768,889.9L1773.8,889.7L1780.3,889.7L1785.5,889.1L1790.6,888.7L1792.2,885.9L1792.4,883.5L1796,885.1L1797,887.7L1798.9,890L1801.2,891.9L1806,892.9L1812.5,892.6L1819.9,892.5L1825,892.1L1832.5,892.1L1837.9,892L1845.3,892.2L1851.7,892.7L1855.7,894.5L1854.6,896.6L1858.3,898.2L1864.4,899.6L1870.7,901L1878.1,902L1885.8,902.9L1891.6,903.8L1898,903.9L1901.7,902L1906.7,903.6L1911.1,905.4L1916.1,906.7L1923,907.3L1929.6,907.9L1932.3,910.2L1938.8,911.5L1943.2,913.5L1949.5,914.4L1956.1,914.3L1962.2,914.6L1969,914.5L1975.8,915L1982.2,915.7L1988.1,917.1L1994,918.2L1998,919.9L1997.3,922.1L1994.3,924.1L1991.7,926.7L1989.7,928.7L1987.1,931L1979.6,931.9L1976.2,933.9L1968.9,935.1L1966.3,937.4L1962.4,939.5L1958.3,941.3L1956,943.6L1954.5,945.7L1954,948.3L1954.1,950.4L1957.3,952.6L1958.5,954.8L1961.2,956.8L1971.8,957.6L1974,960L1963.8,960.9L1955.1,962.1L1944.3,962.3L1939.5,965.6L1938.5,968.3L1936,970.4L1933,972.5L1940.6,974.4L1943.5,976.7L1948.4,978.8L1955.3,980.7L1963.2,982.5L1971.8,984.3L1984.8,986.1L1987.7,988.9L2004.1,990.1L2005.2,990.5L2009.5,992.2L2025.2,990.8L2038.2,992.6L2048,993.9Z"},{"name":"N. Cyprus","fill":"#ff9ff3","d":"M1210.2,312.1L1210.6,312.1L1211.4,310.7L1215.5,310.8L1220.7,309.1L1216.9,311.5L1217.3,312.6L1216.7,312.4L1215.6,312.8L1214.7,312.7L1214.4,312.9L1214.3,312.3L1213.9,312L1212.8,311.9L1211.3,312.4L1210.2,312.1Z"},{"name":"Cyprus","fill":"#feca57","d":"M1210.2,312.1L1211.3,312.4L1212.8,311.9L1213.9,312L1214.3,312.3L1214.4,312.9L1214.7,312.7L1215.6,312.8L1216.7,312.4L1217.3,312.6L1217.4,313L1211.6,315.3L1208.8,314.6L1207.5,312.3L1210.2,312.1Z"},{"name":"Morocco","fill":"#ff6b6b","d":"M1011.7,311.9L1013.8,315.6L1014.1,319L1016.1,325L1017.6,326.2L1016.6,328.5L1009.1,329.4L1006.5,331.5L1003.2,332L1003,336.2L996.4,338.5L994.2,341.3L989.5,342.9L983.8,343.7L974.7,347.9L974.7,354.7L973.8,354.7L974,357.7L970.5,357.9L968.6,359.2L966,359.2L964,358.5L959.2,359.1L957.3,363.5L955.6,363.9L952.9,371.1L945,377.2L943.1,385.1L940.8,387.6L940.1,389.7L927.3,390.1L927.2,390.1L927.4,387.5L929.6,385.9L931.5,383L931.1,381.1L933.1,377L936.2,373.4L938.2,372.5L939.7,369.2L939.8,366.2L941.9,362.6L945.6,360.6L949.2,354.8L949.4,354.7L952.2,352.5L957.5,351.9L962,348L964.8,346.5L969.6,341.7L968.2,334.6L970.3,329.7L971.1,326.7L974.7,322.9L980.5,320.3L984.7,317.9L988.5,312.1L990.3,308.6L994.5,308.6L997.9,311L1003.3,310.6L1009.2,311.9L1011.7,311.9Z"},{"name":"Egypt","fill":"#f3a683","d":"M1233.7,386.8L1211.2,386.8L1189.1,386.8L1166.2,386.8L1166.2,365.9L1166.2,345.7L1164.5,341.1L1166,337.6L1165.1,335.1L1167.2,332.4L1174.7,332.3L1180.2,333.8L1185.9,335.5L1188.5,336.4L1192.9,334.6L1195.2,333L1200.2,332.5L1204.3,333.2L1205.8,336L1207.1,334.2L1211.7,335.5L1216.1,335.8L1218.9,334.4L1218.9,334.4L1222.1,342.7L1222.7,344.2L1221.1,346.5L1219.8,350.8L1218.3,353.7L1217,354.7L1215.1,352.9L1212.5,350.3L1208.5,342.2L1207.9,342.7L1210.2,348.7L1213.7,354.4L1218,363.3L1220.1,366.4L1221.9,369.6L1227.1,375.9L1225.9,376.9L1226.1,380.6L1232.7,385.7L1233.7,386.8Z"},{"name":"Libya","fill":"#f5cd79","d":"M1166.2,386.8L1166.2,398.2L1159.7,398.2L1159.6,400.6L1136.9,389.7L1114.2,378.8L1108.5,381.9L1104.5,384L1101.3,380.9L1092.3,378.5L1089.8,374.9L1085.3,372.3L1082.6,373.3L1080.6,370.1L1080.4,367.7L1077,363.6L1079.3,361.2L1078.8,357.6L1079.5,354.5L1079.1,351.9L1080.1,347.2L1079.8,344.6L1077.9,339.6L1080.7,338.3L1081.2,335.9L1080.6,333.5L1084.5,331.3L1086.3,329.5L1089,327.9L1089.4,323.5L1096,325.4L1098.4,325L1103.2,325.9L1110.7,328.4L1113.4,333.5L1118.5,334.6L1126.5,337L1132.6,339.8L1135.4,338.3L1138.1,335.7L1136.8,331.4L1138.5,328.6L1142.6,325.9L1146.6,325.2L1154.3,326.3L1156.2,328.9L1158.3,328.9L1160.1,329.9L1165.8,330.5L1167.2,332.4L1165.1,335.1L1166,337.6L1164.5,341.1L1166.2,345.7L1166.2,365.9L1166.2,386.8Z"},{"name":"Ethiopia","fill":"#ffeaa7","d":"M1295.9,466.5L1279.8,483.5L1272.4,483.8L1267.3,487.8L1263.7,487.9L1262.1,489.7L1258.2,489.7L1255.9,487.8L1250.7,490.2L1249,492.5L1245.3,492.1L1244,491.4L1242.7,491.6L1240.9,491.5L1233.7,486.7L1229.7,486.7L1227.8,484.8L1227.8,481.6L1224.8,480.7L1221.4,474.5L1218.8,473.2L1217.8,470.9L1215,468.1L1211.5,467.7L1213.4,464.5L1216.4,464.3L1217.3,462.6L1217.2,457.5L1218.9,451.5L1221.6,449.9L1222.2,447.6L1224.6,443.3L1228,440.4L1230.3,434.8L1231.2,430L1237.9,431.1L1239.6,426.9L1243.1,429.5L1246.4,428.1L1247.8,429.3L1251.7,429.4L1256.7,431.7L1258.1,433.6L1260.6,435.5L1263,438.8L1264.9,440.6L1262.9,443.2L1261,445.8L1261.5,447.4L1261.5,449.1L1264.7,449.2L1266.1,448.8L1267.4,449.8L1266.1,451.9L1268.2,455L1270.3,457.7L1272.5,459.8L1291.1,466.5L1295.9,466.5Z"},{"name":"Djibouti","fill":"#ff9f43","d":"M1264.9,440.6L1267.4,441.1L1269.1,439.8L1270.4,441.5L1270.3,443.9L1267,445.2L1269.4,446.8L1267.4,449.8L1266.1,448.8L1264.7,449.2L1261.5,449.1L1261.5,447.4L1261,445.8L1262.9,443.2L1264.9,440.6Z"},{"name":"Somaliland","fill":"#ee5253","d":"M1302.5,447.1L1302.5,447.1L1302.4,447.2L1302.4,449.5L1302.4,455.3L1302.4,458.2L1299.8,461.7L1295.9,466.5L1291.1,466.5L1272.5,459.8L1270.3,457.7L1268.2,455L1266.1,451.9L1267.4,449.8L1269.4,446.8L1271.3,447.8L1272.4,450.2L1275,452.6L1277.8,452.6L1283.2,451.1L1289.4,450.5L1294.4,448.7L1297.2,448.3L1299.2,447.3L1302.5,447.1L1302.5,447.1Z"},{"name":"Uganda","fill":"#0abde3","d":"M1216.9,517.4L1205.3,517.8L1199,517.8L1197.1,518.5L1193.7,520.2L1192.3,519.6L1192.3,515.3L1193.6,513.2L1194,508.6L1195.2,506L1197.3,503L1199.5,501.5L1201.3,499.5L1199.1,498.7L1199.4,492L1199.4,492L1201.8,490.5L1205.4,491.8L1209.9,490.4L1214,490.4L1217.5,487.8L1220.1,491.8L1220.8,494.6L1223.3,501.2L1221.2,505.3L1218.4,509.1L1216.8,511.4L1216.9,517.4Z"},{"name":"Rwanda","fill":"#10ac84","d":"M1197.1,518.5L1199.3,521.7L1199,525L1197.3,525.7L1197.3,525.7L1194.3,525.4L1192.6,528.6L1189.1,528.2L1189.6,525L1190.4,524.6L1190.6,521.2L1192.3,519.6L1193.7,520.2L1197.1,518.5Z"},{"name":"Bosnia and Herz.","fill":"#54a0ff","d":"M1129.6,269.4L1124.6,267.2L1122.4,264.8L1120.2,263.6L1117.6,261.5L1116.4,259.7L1113.6,257L1114.8,254.7L1116.8,256L1118.1,254.8L1120.7,254.7L1125.6,255.6L1129.5,255.5L1132.1,256.8L1132.1,256.8L1134.2,256.8L1132.8,259.3L1135.5,261.5L1134.7,264.1L1133.3,264.4L1132.3,264.9L1130.4,266.2L1129.6,269.4Z"},{"name":"North Macedonia","fill":"#5f27cd","d":"M1151.3,271.2L1154.2,273.1L1154.6,276.8L1153.5,277L1152.6,278L1149.5,277.9L1147.3,279.1L1143.6,279.7L1141.2,278.3L1140.4,275.8L1141.1,273.9L1141.1,273.9L1141.9,273.9L1142.1,272.8L1145.5,271.9L1146.7,271.7L1148.7,271.3L1151.3,271.2Z"},{"name":"Serbia","fill":"#c8d6e5","d":"M1131.1,250.8L1131.1,250.8L1135.5,249.3L1139,249.6L1142.1,251.8L1142.8,253.6L1146.2,255L1146.7,257.3L1150,259L1151.8,257.7L1153.2,258.4L1151.9,259.4L1152.9,260.4L1151.5,261.6L1152,263.7L1154.8,266.2L1152.6,268L1151.6,269.8L1152.3,270.4L1151.3,271.2L1148.7,271.3L1146.7,271.7L1146.6,271.2L1147.2,270.6L1147.9,269.2L1147.1,269.2L1146,268.2L1145,267.9L1144.3,267L1143.2,266.6L1142.4,265.8L1141.4,266.1L1140.6,268L1139.2,268.4L1139.7,268L1137.5,266.8L1135.7,266.2L1134.8,265.4L1133.3,264.4L1134.7,264.1L1135.5,261.5L1132.8,259.3L1134.2,256.8L1132.1,256.8L1132.1,256.8L1134.3,254.7L1132.5,253L1131.1,250.8Z"},{"name":"Montenegro","fill":"#ffda79","d":"M1138.2,269.7L1136.6,270.2L1136.3,269.2L1133.8,272L1134.2,273.8L1133,273.3L1131.4,271.5L1129,270.3L1129.6,269.4L1130.4,266.2L1132.3,264.9L1133.3,264.4L1134.8,265.4L1135.7,266.2L1137.5,266.8L1139.7,268L1139.2,268.4L1138.2,269.7Z"},{"name":"Kosovo","fill":"#cd84f1","d":"M1141.1,273.9L1140.8,271.8L1139.4,271.2L1138.2,269.7L1139.2,268.4L1140.6,268L1141.4,266.1L1142.4,265.8L1143.2,266.6L1144.3,267L1145,267.9L1146,268.2L1147.1,269.2L1147.9,269.2L1147.2,270.6L1146.6,271.2L1146.7,271.7L1145.5,271.9L1142.1,272.8L1141.9,273.9L1141.1,273.9Z"},{"name":"Trinidad and Tobago","fill":"#706fd3","d":"M673.1,450.8L676.4,450L677.6,450.2L677.3,454.5L672.6,455.1L671.6,454.6L673.2,453L673.1,450.8Z"},{"name":"S. Sudan","fill":"#33d9b2","d":"M1199.4,492L1194.4,488.3L1193.1,485.8L1189.9,487L1187.3,486.7L1185.7,487.6L1183.2,486.9L1179.7,482.2L1178.8,480.4L1174.6,478.2L1173.1,474.8L1170.8,472.3L1166.9,469.3L1166.9,467.5L1163.8,465.2L1159.9,463L1161.6,462.3L1163.6,461.3L1165.1,456.2L1166.6,453.6L1170.7,452.8L1171.7,454.3L1174.6,457.7L1176.2,458.1L1178.2,457.2L1182.3,457.4L1183.1,458.5L1188.8,458.5L1189,457.4L1191.9,456.3L1192.5,454.6L1194.6,453.5L1199.4,456.8L1202.4,456.2L1205.2,452.1L1208.3,449L1207.8,445.5L1206.5,443.9L1209.9,443.6L1210.3,442.3L1212.9,442.7L1212.2,446.9L1212.9,451L1215.8,453.3L1216.5,455.2L1216.4,458L1217.2,458.2L1217.3,462.6L1216.4,464.3L1213.4,464.5L1211.5,467.7L1215,468.1L1217.8,470.9L1218.8,473.2L1221.4,474.5L1224.8,480.7L1221,484.4L1217.5,487.8L1214,490.4L1209.9,490.4L1205.4,491.8L1201.8,490.5L1199.4,492Z"}];
  
  const GLOBE_LABELS = [{"x":260,"y":520,"size":24,"fill":"rgba(255,255,255,0.75)","text":"PACIFIC OCEAN"},{"x":1840,"y":520,"size":24,"fill":"rgba(255,255,255,0.75)","text":"PACIFIC OCEAN"},{"x":860,"y":560,"size":22,"fill":"rgba(255,255,255,0.75)","text":"ATLANTIC OCEAN"},{"x":1420,"y":640,"size":22,"fill":"rgba(255,255,255,0.75)","text":"INDIAN OCEAN"},{"x":1024,"y":120,"size":20,"fill":"rgba(255,255,255,0.75)","text":"ARCTIC OCEAN"},{"x":1024,"y":920,"size":20,"fill":"rgba(255,255,255,0.75)","text":"SOUTHERN OCEAN"},{"x":500,"y":506,"size":14,"fill":"#fed330","text":"EQUATOR / KHATULISTIWA (0°)"},{"x":1500,"y":506,"size":14,"fill":"#fed330","text":"EQUATOR / KHATULISTIWA (0°)"},{"x":505.9,"y":194.9,"size":18,"fill":"#ffffff","text":"CANADA"},{"x":509.9,"y":298.3,"size":18,"fill":"#ffffff","text":"USA"},{"x":1855.8,"y":560.2,"size":12,"fill":"#ffffff","text":"PAPUA NEW GUINEA"},{"x":1715.7,"y":510.6,"size":13,"fill":"#55efc4","text":"INDONESIA 🇮🇩"},{"x":653.7,"y":726.6,"size":12,"fill":"#ffffff","text":"ARGENTINA"},{"x":617.5,"y":732.8,"size":12,"fill":"#ffffff","text":"CHILE"},{"x":1540.9,"y":179.8,"size":18,"fill":"#ffffff","text":"RUSSIA"},{"x":1126.9,"y":139.2,"size":12,"fill":"#ffffff","text":"NORWAY"},{"x":1042.8,"y":248.6,"size":12,"fill":"#ffffff","text":"FRANCE"},{"x":570.4,"y":392.4,"size":12,"fill":"#ffffff","text":"CUBA"},{"x":1122.9,"y":578.2,"size":12,"fill":"#ffffff","text":"ANGOLA"},{"x":1291.3,"y":618.2,"size":12,"fill":"#ffffff","text":"MADAGASCAR"},{"x":1345.8,"y":397.3,"size":12,"fill":"#ffffff","text":"OMAN"},{"x":1748.8,"y":288.8,"size":12,"fill":"#ffffff","text":"NORTH KOREA"},{"x":1155.6,"y":289.6,"size":12,"fill":"#ffffff","text":"GREECE"},{"x":1233.9,"y":297.7,"size":12,"fill":"#ffffff","text":"TURKEY"},{"x":2022.3,"y":733.3,"size":12,"fill":"#ffffff","text":"NEW ZEALAND"},{"x":1782,"y":651.4,"size":18,"fill":"#ffffff","text":"AUSTRALIA"},{"x":1625.1,"y":303.8,"size":18,"fill":"#ffffff","text":"CHINA"},{"x":1095.8,"y":270.9,"size":12,"fill":"#ffffff","text":"ITALY"},{"x":1078.7,"y":195.8,"size":12,"fill":"#ffffff","text":"DENMARK"},{"x":1006.5,"y":209.4,"size":12,"fill":"#ffffff","text":"UNITED KINGDOM"},{"x":1293.7,"y":286.3,"size":12,"fill":"#ffffff","text":"AZERBAIJAN"},{"x":1717,"y":428.6,"size":12,"fill":"#ffffff","text":"PHILIPPINES"},{"x":1676.9,"y":495.1,"size":12,"fill":"#ffffff","text":"MALAYSIA"},{"x":1797.7,"y":312.8,"size":12,"fill":"#ffffff","text":"JAPAN"},{"x":1008.7,"y":931.4,"size":12,"fill":"#ffffff","text":"ANTARCTICA"}];
  

  // --- Source: js/data/map-vector-data.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // Authentic Cartographic Vector Data for Indonesia, Bali & World
  // Source: Natural Earth & Indonesian Geospatial Agency (BIG / Bakosurtanal)
  // Development · Anabhi Dev
  // Version   : 2.0
  // Generated : 12 September 2026
  // ================================================================
  
  const REAL_INDONESIA_PATHS = [
    {
      "id": "ID.3700",
      "name": "Maluku Utara",
      "island": "Maluku",
      "color": "#0891b2",
      "d": "M588.9,124.1 L590.2,125.5 L588.4,124.9 L587.9,123.9 Z",
      "cx": 588.9,
      "cy": 124.6
    },
    {
      "id": "ID.AC",
      "name": "Aceh",
      "island": "Sumatra",
      "color": "#10b981",
      "d": "M32.1,58.0 L32.9,57.7 L34.1,58.4 L34.2,60.6 Z M1.0,3.3 L2.1,2.9 L2.7,3.7 L2.1,4.7 Z M13.3,49.9 L15.0,50.4 L17.4,52.7 L18.6,53.2 L19.5,54.5 L20.5,54.2 L21.2,56.1 L18.9,56.3 L18.8,55.8 L14.7,53.1 L12.6,52.9 L8.9,50.3 L10.0,49.3 L10.3,47.7 L12.1,48.2 Z M45.9,57.8 L43.7,56.6 L42.5,57.0 L40.5,56.6 L39.1,54.7 L38.7,50.8 L37.9,47.8 L35.2,47.0 L33.7,45.5 L32.7,42.8 L31.3,42.3 L28.7,38.2 L26.6,35.9 L24.7,35.0 L21.6,35.1 L19.6,34.0 L15.8,29.5 L14.8,29.4 L13.0,28.1 L6.8,22.1 L6.0,22.0 L3.8,19.2 L1.6,13.6 L0.1,12.1 L0.9,10.5 L0.0,8.3 L3.3,6.6 L4.8,7.3 L6.3,6.9 L10.6,8.5 L11.3,10.0 L14.3,12.0 L17.9,12.7 L22.3,12.7 L25.0,11.7 L27.2,11.7 L31.7,13.4 L35.1,11.9 L37.7,14.5 L41.5,17.1 L43.1,21.0 L43.0,22.3 L44.0,22.1 L46.2,22.9 L47.3,24.0 L47.2,26.0 L46.0,26.0 L44.2,26.9 L43.4,30.8 L40.2,34.5 L42.2,39.1 L43.5,40.6 L41.7,41.8 L42.8,43.5 L42.3,44.4 L42.8,47.0 L44.9,48.4 L45.1,50.4 L44.5,52.0 L46.2,55.6 Z",
      "cx": 25.9,
      "cy": 34.2
    },
    {
      "id": "ID.KI",
      "name": "Kalimantan Timur",
      "island": "Kalimantan",
      "color": "#0369a1",
      "d": "M334.3,27.9 L333.0,27.1 L332.5,25.5 L334.5,25.5 Z M337.6,24.6 L336.0,23.6 L335.9,23.0 L336.8,23.0 Z M331.9,24.4 L331.8,25.1 L328.2,24.5 L328.3,23.3 L330.2,23.6 Z M334.4,17.1 L332.7,16.1 L333.6,14.8 L335.0,15.7 Z M337.2,14.5 L337.7,15.9 L336.3,16.2 L334.2,14.6 Z M285.1,57.2 L287.8,56.1 L289.4,57.0 L291.7,53.1 L291.6,51.3 L293.9,50.0 L294.0,48.2 L293.0,48.1 L292.5,46.4 L292.8,45.0 L294.9,44.2 L297.8,41.3 L298.9,40.8 L298.2,39.7 L296.6,39.5 L296.6,36.3 L299.0,33.0 L300.0,33.8 L302.3,33.0 L302.9,31.1 L302.4,30.4 L302.8,28.2 L303.9,26.9 L303.0,24.5 L303.4,20.8 L302.7,20.3 L303.8,18.1 L304.0,16.2 L306.4,14.4 L306.7,12.8 L309.4,14.4 L310.9,12.8 L313.6,12.5 L314.8,13.8 L316.3,13.2 L316.8,12.2 L317.5,13.1 L319.5,12.4 L320.9,12.9 L326.2,12.5 L326.9,12.2 L330.3,14.5 L332.2,14.7 L331.4,15.3 L329.4,14.8 L329.8,15.8 L331.6,16.4 L334.2,18.1 L333.3,18.5 L336.3,19.2 L335.0,20.6 L336.4,21.2 L335.3,22.2 L332.3,22.0 L331.1,20.2 L332.0,22.6 L325.6,22.7 L327.5,23.2 L327.8,24.6 L329.3,25.5 L331.1,25.4 L330.0,27.4 L329.9,29.2 L331.4,29.3 L331.9,30.3 L333.9,30.4 L333.2,31.9 L335.0,32.0 L332.9,32.8 L335.8,33.0 L334.3,34.4 L336.6,35.1 L337.3,37.2 L339.7,39.2 L341.5,42.1 L339.4,43.6 L338.9,45.3 L336.5,45.5 L338.5,46.2 L338.5,47.8 L339.4,48.7 L341.3,49.1 L342.5,50.9 L347.1,53.2 L346.7,53.7 L350.0,55.0 L351.8,56.3 L353.8,59.1 L356.0,59.3 L356.0,60.4 L353.1,62.9 L351.4,62.3 L349.7,63.1 L347.6,62.6 L347.0,63.2 L346.0,62.4 L344.1,62.3 L342.3,61.6 L341.0,59.5 L339.7,59.6 L341.8,62.7 L341.3,63.7 L340.1,63.0 L338.6,63.5 L337.4,65.0 L337.4,65.9 L336.0,68.2 L334.1,74.1 L335.1,76.1 L334.5,77.0 L333.8,79.6 L334.7,81.3 L334.1,83.4 L336.3,81.8 L336.5,83.2 L335.7,85.8 L336.9,87.1 L333.5,88.0 L332.9,89.0 L332.0,87.7 L331.6,89.2 L330.4,90.3 L328.5,93.6 L325.5,94.6 L325.0,93.2 L323.9,92.7 L325.1,94.4 L324.8,96.2 L322.6,97.1 L321.6,98.1 L321.9,99.9 L318.6,101.5 L317.1,102.8 L319.4,102.3 L320.8,104.3 L320.9,106.0 L318.4,108.3 L319.6,107.8 L320.2,108.7 L322.0,108.1 L323.1,108.4 L322.7,110.9 L320.0,110.3 L314.9,110.2 L314.1,110.0 L312.4,111.3 L311.4,108.9 L311.6,106.9 L310.3,106.2 L310.1,103.1 L308.3,99.4 L307.4,99.3 L308.9,97.9 L309.5,97.9 L310.6,95.9 L310.5,92.8 L309.5,93.1 L307.8,91.4 L305.3,90.2 L304.5,88.6 L303.9,85.8 L303.1,84.8 L302.1,81.9 L302.1,80.6 L302.9,77.3 L300.6,77.4 L298.0,80.2 L297.4,79.0 L298.0,76.7 L296.9,73.5 L297.1,72.3 L298.5,69.8 L298.2,68.3 L296.9,66.9 L293.4,68.0 L292.4,68.8 L288.2,69.5 L285.3,68.7 L283.2,68.9 L282.2,69.6 L279.4,70.4 L281.4,67.7 L281.7,65.8 L280.4,65.3 L280.4,64.2 L285.0,60.5 Z",
      "cx": 320.9,
      "cy": 54.9
    },
    {
      "id": "ID.JT",
      "name": "Jawa Tengah",
      "island": "Jawa",
      "color": "#b45309",
      "d": "M215.5,195.0 L216.1,195.7 L213.1,195.1 L213.5,194.5 Z M244.8,200.7 L244.6,200.6 L243.3,200.4 L242.6,199.3 L242.2,195.7 L240.8,195.0 L238.1,194.6 L236.9,191.4 L234.4,193.8 L232.6,193.4 L231.4,196.5 L225.7,195.3 L222.3,195.4 L221.5,194.5 L217.5,194.4 L216.3,195.1 L214.4,194.5 L214.1,193.5 L213.1,194.3 L212.1,193.5 L212.2,192.5 L210.9,189.8 L209.2,189.4 L209.4,187.2 L211.1,186.8 L212.4,185.5 L212.5,183.7 L213.8,181.8 L215.1,182.2 L215.3,181.4 L217.4,182.2 L220.5,182.3 L223.1,181.6 L225.9,181.8 L228.5,182.5 L232.8,181.8 L235.2,182.9 L236.9,182.4 L238.2,180.7 L239.2,178.5 L239.4,175.7 L240.2,175.1 L243.0,174.1 L244.9,174.8 L246.1,177.6 L246.7,178.1 L250.6,178.0 L251.5,176.9 L253.2,177.4 L254.2,178.3 L253.6,179.3 L253.3,181.7 L253.6,184.5 L251.3,186.9 L248.0,186.3 L247.7,187.1 L247.7,190.3 L248.3,191.5 L248.0,192.9 L249.7,194.0 L249.5,196.2 L246.9,197.4 L245.0,199.1 Z",
      "cx": 232.5,
      "cy": 188.1
    },
    {
      "id": "ID.BE",
      "name": "Bengkulu",
      "island": "Sumatra",
      "color": "#047857",
      "d": "M116.8,168.3 L115.5,168.5 L112.4,166.6 L113.4,165.7 L116.8,166.9 Z M93.7,125.3 L95.7,123.5 L98.1,122.3 L99.6,121.3 L100.8,122.3 L101.7,124.4 L104.4,127.0 L106.9,128.4 L109.5,128.8 L112.0,131.2 L112.3,132.8 L115.2,133.0 L116.1,133.9 L115.8,135.4 L118.4,137.1 L120.3,135.5 L122.0,136.9 L123.5,137.1 L124.2,138.4 L124.0,139.8 L122.3,139.8 L122.6,140.6 L119.8,143.2 L118.8,143.6 L121.0,145.6 L124.2,146.5 L126.6,146.5 L127.5,149.4 L134.0,151.6 L134.2,152.8 L136.6,157.1 L136.2,157.7 L134.4,158.9 L132.9,158.3 L131.5,158.4 L131.1,157.6 L127.6,154.9 L123.8,153.3 L123.0,152.3 L120.3,150.3 L114.3,146.5 L114.0,144.4 L112.6,141.4 L110.2,140.2 L103.5,136.2 L99.9,131.6 L98.4,128.9 L94.9,126.8 Z",
      "cx": 116.7,
      "cy": 142.7
    },
    {
      "id": "ID.BT",
      "name": "Banten",
      "island": "Jawa",
      "color": "#fbbf24",
      "d": "M160.3,181.0 L160.3,182.5 L159.3,183.2 L159.3,181.4 Z M182.1,176.3 L182.2,177.3 L180.3,177.6 L177.7,177.1 L177.2,177.6 L177.1,179.9 L177.6,182.4 L178.8,183.6 L178.0,184.4 L177.5,186.7 L175.7,186.7 L172.2,184.8 L170.8,184.6 L168.2,185.2 L167.1,185.1 L163.9,185.8 L161.3,185.1 L160.5,184.5 L161.9,182.9 L163.4,184.9 L165.8,181.9 L165.6,180.7 L166.4,179.8 L166.9,180.7 L167.9,180.3 L168.5,179.1 L168.4,176.1 L169.1,173.7 L171.3,170.8 L172.4,172.2 L173.2,172.6 L174.4,171.5 L177.9,172.6 L180.4,172.0 L181.4,172.7 L180.8,173.4 L181.1,175.0 Z",
      "cx": 171.3,
      "cy": 179.7
    },
    {
      "id": "ID.KB",
      "name": "Kalimantan Barat",
      "island": "Kalimantan",
      "color": "#0284c7",
      "d": "M210.4,105.2 L210.0,106.2 L208.5,106.6 L208.1,105.2 L209.4,104.7 Z M219.4,96.0 L221.7,96.7 L222.1,98.1 L217.8,100.8 L216.8,100.2 L217.1,96.5 Z M240.7,122.8 L238.4,123.8 L236.5,125.9 L235.7,123.4 L234.1,123.0 L230.6,125.1 L229.7,123.5 L230.2,121.9 L229.6,120.0 L228.8,119.6 L229.6,118.2 L228.7,116.9 L228.3,114.7 L227.5,113.4 L227.9,111.5 L227.0,109.4 L224.4,108.2 L226.2,105.4 L226.5,102.3 L225.8,100.2 L224.3,99.3 L224.1,97.6 L222.8,97.4 L221.2,95.6 L220.4,96.0 L217.6,94.3 L216.4,95.2 L214.4,94.5 L214.1,91.8 L217.2,92.6 L215.2,90.5 L214.0,90.7 L211.9,89.4 L211.5,87.4 L210.6,85.8 L211.6,85.1 L213.2,85.5 L212.6,84.7 L212.1,81.6 L214.1,81.8 L212.1,80.4 L211.0,78.6 L208.3,77.3 L208.6,75.7 L208.0,74.5 L208.2,72.9 L207.0,70.2 L208.2,69.3 L208.7,67.7 L207.8,65.1 L208.6,64.5 L209.6,61.9 L210.0,59.3 L212.2,57.6 L213.5,55.5 L213.3,53.7 L216.5,52.7 L217.4,52.1 L216.1,54.2 L216.4,55.3 L217.8,55.7 L217.9,57.8 L218.5,58.7 L221.0,61.1 L222.4,61.4 L223.1,62.7 L224.9,64.0 L226.0,64.2 L227.5,66.7 L228.8,66.8 L229.9,67.8 L231.9,68.6 L235.2,67.6 L236.2,66.2 L241.2,64.8 L243.5,65.6 L246.3,65.7 L247.9,65.1 L250.4,65.3 L251.6,63.7 L254.4,63.0 L255.4,59.8 L255.3,58.6 L259.5,56.7 L263.9,56.7 L265.1,56.2 L267.6,56.7 L266.8,58.5 L268.7,58.2 L272.2,59.2 L273.3,60.0 L274.8,59.6 L277.1,60.6 L279.3,59.0 L280.7,57.4 L282.8,57.0 L285.1,57.2 L285.0,60.5 L280.4,64.2 L280.4,65.3 L281.7,65.8 L281.4,67.7 L279.4,70.4 L277.6,72.7 L277.4,74.1 L276.1,74.9 L274.4,74.8 L273.0,75.3 L275.1,77.8 L275.5,79.5 L274.9,81.6 L273.4,82.5 L272.4,84.2 L273.2,85.1 L272.6,87.0 L271.2,85.9 L268.9,86.7 L262.8,89.7 L259.9,90.6 L256.1,90.5 L249.4,95.0 L248.5,97.5 L246.2,98.9 L245.0,100.4 L242.2,102.9 L240.4,102.9 L239.2,104.3 L240.6,104.9 L240.9,106.1 L240.6,109.6 L240.9,111.7 L243.0,115.6 L243.2,120.4 L242.2,120.9 Z",
      "cx": 237.5,
      "cy": 83.5
    },
    {
      "id": "ID.BB",
      "name": "Kepulauan Bangka Belitung",
      "island": "Sumatra",
      "color": "#16a34a",
      "d": "M180.7,128.2 L178.6,127.4 L179.8,126.3 L181.3,126.7 Z M189.9,125.5 L188.7,126.6 L187.6,125.7 L189.3,124.7 Z M192.2,120.7 L194.8,120.4 L196.9,120.6 L197.6,121.6 L198.0,120.9 L200.0,122.0 L201.1,123.1 L201.5,124.7 L200.4,126.8 L200.6,128.7 L198.9,129.1 L198.7,130.1 L197.5,130.4 L197.0,129.1 L195.5,127.7 L195.2,129.1 L192.2,130.7 L191.6,130.2 L192.2,128.9 L191.2,127.4 L191.6,126.0 L191.2,124.1 L191.9,123.5 Z M178.4,129.3 L175.6,129.5 L174.5,127.9 L169.2,126.1 L167.6,125.9 L166.2,123.2 L166.7,121.2 L164.9,119.8 L164.2,116.6 L161.4,115.9 L160.7,115.2 L159.1,116.1 L157.0,116.4 L155.8,115.5 L154.6,115.8 L154.6,113.6 L157.7,111.8 L157.9,110.5 L157.2,109.3 L158.8,107.9 L160.7,107.2 L161.3,108.5 L162.4,109.1 L161.7,109.9 L162.7,110.8 L164.2,111.0 L163.2,109.7 L162.6,107.1 L164.3,106.9 L165.4,106.5 L167.4,107.9 L167.4,109.1 L169.6,112.0 L169.5,113.8 L171.3,118.8 L172.7,120.4 L179.9,121.5 L178.5,122.3 L177.6,123.6 L176.9,126.1 L176.9,127.2 L178.8,128.0 Z",
      "cx": 177.5,
      "cy": 120.4
    },
    {
      "id": "ID.BA",
      "name": "Bali",
      "island": "Bali & Nusa Tenggara",
      "color": "#ec4899",
      "d": "M312.4,203.8 L313.2,205.2 L312.7,205.8 L310.9,204.8 Z M299.2,196.6 L301.7,197.3 L304.0,196.9 L305.6,195.3 L306.8,195.1 L311.0,196.6 L314.2,199.4 L312.7,201.3 L308.7,203.3 L307.2,204.9 L307.6,206.2 L306.1,206.7 L305.5,206.3 L306.8,204.8 L306.3,203.9 L302.9,201.2 L300.9,200.4 L298.6,200.4 L297.3,199.6 L296.0,197.9 L295.7,196.1 L297.0,196.6 Z",
      "cx": 305.4,
      "cy": 201
    },
    {
      "id": "ID.JI",
      "name": "Jawa Timur",
      "island": "Jawa",
      "color": "#ea580c",
      "d": "M294.2,182.1 L294.2,182.8 L292.7,182.4 L293.1,181.0 Z M308.3,177.1 L311.2,178.0 L311.0,178.5 L308.4,178.2 L307.2,179.7 L306.0,178.2 L306.8,177.2 Z M268.6,163.0 L269.0,164.3 L267.1,164.7 L266.8,163.9 L267.6,163.0 Z M280.2,179.2 L281.4,179.3 L288.1,178.7 L290.1,180.1 L287.1,181.2 L286.0,182.5 L283.5,182.3 L282.4,183.0 L281.9,184.2 L276.3,184.3 L275.8,184.5 L271.2,183.7 L269.9,183.7 L269.4,181.9 L270.7,181.1 L271.4,180.0 L274.7,179.4 L275.8,179.6 Z M254.2,178.3 L254.9,178.8 L257.3,179.3 L258.7,178.9 L260.1,180.4 L261.9,180.4 L264.4,179.8 L266.4,180.3 L267.9,180.1 L267.7,181.4 L268.9,182.3 L268.1,182.7 L269.3,184.0 L268.1,184.3 L269.6,185.1 L270.8,184.4 L271.4,185.2 L271.3,187.3 L270.7,189.1 L271.9,190.0 L274.8,190.7 L276.2,191.7 L277.8,191.8 L278.7,192.5 L282.0,191.0 L286.0,191.1 L288.0,190.4 L289.0,189.5 L290.9,190.6 L292.6,190.5 L294.4,191.2 L295.7,192.3 L295.6,195.0 L294.5,200.8 L294.9,202.4 L295.5,201.6 L296.2,203.8 L298.1,204.3 L298.3,206.0 L294.9,205.6 L295.1,204.5 L293.9,203.8 L292.4,204.3 L289.9,203.9 L289.2,204.1 L286.7,202.6 L285.3,202.9 L284.2,202.0 L280.8,201.2 L279.8,200.3 L277.6,199.7 L274.6,200.5 L273.4,201.8 L272.4,201.4 L270.1,202.6 L266.7,201.9 L265.2,201.1 L259.1,201.0 L257.1,200.5 L255.5,202.2 L254.9,201.6 L252.2,201.6 L252.1,201.0 L249.5,200.8 L248.2,201.3 L247.0,200.3 L246.5,201.0 L244.8,200.7 L245.0,199.1 L246.9,197.4 L249.5,196.2 L249.7,194.0 L248.0,192.9 L248.3,191.5 L247.7,190.3 L247.7,187.1 L248.0,186.3 L251.3,186.9 L253.6,184.5 L253.3,181.7 L253.6,179.3 Z",
      "cx": 274.6,
      "cy": 189.1
    },
    {
      "id": "ID.KS",
      "name": "Kalimantan Selatan",
      "island": "Kalimantan",
      "color": "#38bdf8",
      "d": "M321.0,129.6 L319.9,128.2 L321.0,125.8 L321.4,126.3 Z M315.9,127.6 L316.8,125.2 L318.8,123.7 L318.9,126.4 L319.8,127.7 L319.2,128.0 L319.7,130.9 L319.9,133.6 L317.3,135.6 L316.2,135.5 L316.7,134.1 L316.4,132.3 L315.4,130.1 Z M322.7,110.9 L322.3,113.1 L319.0,113.4 L320.2,114.1 L319.9,115.3 L320.1,117.8 L319.6,119.3 L318.3,120.6 L316.8,117.9 L316.4,120.7 L317.1,120.6 L318.7,122.5 L317.3,123.1 L315.2,127.2 L314.7,129.6 L312.8,130.0 L311.7,131.0 L309.2,132.4 L301.7,135.7 L299.0,137.1 L296.7,138.7 L295.4,138.7 L295.4,136.4 L294.9,134.1 L294.9,131.6 L293.7,129.9 L293.7,126.8 L293.0,127.3 L292.9,128.9 L290.3,128.2 L292.3,121.8 L292.7,120.0 L294.5,119.1 L296.7,117.0 L297.1,115.1 L298.3,113.0 L298.1,110.7 L301.4,109.7 L304.2,107.1 L304.5,105.1 L304.1,103.1 L305.2,98.2 L308.9,96.9 L308.9,97.9 L307.4,99.3 L308.3,99.4 L310.1,103.1 L310.3,106.2 L311.6,106.9 L311.4,108.9 L312.4,111.3 L314.1,110.0 L314.9,110.2 L320.0,110.3 Z",
      "cx": 309.8,
      "cy": 120.8
    },
    {
      "id": "ID.NT",
      "name": "Nusa Tenggara Timur",
      "island": "Bali & Nusa Tenggara",
      "color": "#e11d48",
      "d": "M406.1,226.5 L406.9,226.6 L406.9,227.8 L405.0,229.1 L402.5,228.6 Z M428.3,222.8 L427.4,223.1 L427.7,224.6 L426.6,224.7 L426.3,223.7 L427.5,222.0 L429.0,222.2 Z M372.2,201.3 L373.8,201.0 L372.7,201.8 L372.6,203.4 L371.2,202.9 Z M369.1,198.8 L370.6,199.1 L370.6,200.3 L369.7,200.0 L368.8,201.7 L369.2,202.6 L367.9,202.4 L367.8,200.2 L368.3,198.3 Z M423.5,196.4 L423.4,197.1 L421.1,197.6 L420.4,198.8 L419.3,198.8 L421.0,196.8 Z M425.2,193.6 L425.8,193.8 L425.7,195.7 L421.6,196.2 L421.5,195.0 L423.7,193.5 Z M439.2,195.3 L438.3,197.5 L436.6,197.7 L436.1,196.1 L434.4,196.5 L435.5,194.8 L436.6,194.3 L437.4,195.4 L439.5,192.3 L440.3,192.9 L440.2,194.4 Z M419.4,233.5 L419.0,231.4 L422.4,230.3 L424.1,229.1 L425.0,227.8 L427.3,226.1 L427.1,228.2 L427.7,229.8 L426.8,229.7 L425.3,230.7 L424.8,231.8 L421.6,232.6 L421.3,233.2 Z M377.2,220.8 L373.1,218.8 L372.7,218.1 L369.8,217.4 L368.8,218.1 L367.0,217.4 L365.4,217.4 L363.4,216.6 L361.9,215.1 L363.1,213.1 L365.1,212.2 L371.8,211.4 L374.7,211.8 L376.4,210.4 L377.4,211.4 L378.3,212.6 L380.9,213.5 L381.4,215.5 L384.4,215.4 L385.9,216.7 L387.3,218.9 L389.1,220.0 L389.7,221.9 L388.0,223.6 L385.9,224.0 L384.3,225.3 L383.4,224.6 L379.9,224.1 L378.1,222.5 Z M431.0,196.4 L430.7,195.9 L429.1,198.4 L428.4,197.7 L426.9,198.7 L425.8,197.9 L424.4,197.8 L426.3,196.1 L427.9,195.4 L427.9,194.7 L426.4,194.7 L427.0,193.9 L429.3,193.6 L428.6,194.9 L429.4,195.5 L430.4,193.2 L431.4,193.5 L432.7,192.5 L434.8,193.4 L432.4,194.4 Z M451.9,191.8 L452.7,192.8 L452.5,194.6 L447.2,195.6 L445.4,195.6 L442.0,196.5 L440.7,195.8 L441.8,194.1 L441.6,192.9 L442.4,191.8 L444.1,191.5 L444.7,192.6 L445.6,192.0 Z M432.5,220.3 L430.0,219.8 L431.1,218.0 L431.0,216.3 L431.5,213.8 L434.1,211.9 L435.9,209.8 L437.9,210.9 L439.0,210.1 L439.9,212.0 L440.7,211.8 L441.2,210.1 L442.4,209.0 L442.7,207.2 L444.4,207.0 L446.2,205.4 L449.6,203.8 L450.0,205.5 L452.1,204.1 L453.2,205.2 L453.0,207.1 L450.5,207.2 L450.2,208.0 L451.2,209.4 L451.8,211.6 L451.0,212.4 L450.5,214.2 L448.7,215.6 L447.1,217.8 L444.2,219.9 L442.5,221.9 L438.1,222.1 L436.8,223.6 L435.3,223.9 L433.8,225.0 L432.2,225.1 L430.1,224.6 L428.5,224.9 L428.8,223.3 L429.6,222.4 L432.6,221.0 Z M420.6,192.3 L421.2,195.1 L419.5,195.5 L419.5,197.0 L418.1,196.7 L418.8,198.3 L418.2,199.2 L414.7,200.2 L412.4,201.3 L408.0,201.3 L406.4,202.4 L403.4,203.7 L401.8,203.2 L401.2,204.1 L400.8,203.0 L397.5,202.5 L396.7,204.4 L394.1,204.1 L392.7,204.8 L390.6,204.7 L389.2,203.1 L388.2,203.8 L386.4,203.6 L385.7,202.9 L382.6,203.0 L380.6,203.4 L378.9,202.7 L376.7,203.4 L375.9,204.3 L374.1,202.4 L374.0,200.3 L375.0,198.8 L377.2,197.1 L378.4,197.2 L379.9,195.6 L382.3,195.3 L385.5,195.3 L385.5,194.6 L387.7,195.9 L391.1,195.9 L391.9,196.7 L395.8,197.9 L397.2,199.2 L398.5,199.2 L399.1,199.6 L400.5,198.7 L400.5,197.7 L401.5,198.2 L403.8,197.6 L404.7,197.8 L406.3,196.8 L406.8,198.1 L408.3,198.5 L410.6,199.8 L413.7,198.8 L413.5,197.3 L415.0,196.1 L417.4,195.5 L419.2,194.4 L420.2,193.1 L419.1,192.9 L417.1,193.6 L417.8,191.8 L418.8,191.2 Z",
      "cx": 412.9,
      "cy": 206.4
    },
    {
      "id": "ID.SE",
      "name": "Sulawesi Selatan",
      "island": "Sulawesi",
      "color": "#5b21b6",
      "d": "M389.1,180.3 L391.7,180.4 L391.8,180.9 L388.3,180.8 Z M387.1,177.4 L387.5,178.2 L386.0,178.6 L385.2,177.4 L385.2,176.4 Z M397.4,116.4 L395.6,117.2 L392.5,115.2 L390.8,115.2 L389.7,115.8 L388.9,114.4 L389.5,113.6 L388.4,112.2 L384.9,111.7 L382.1,112.8 L381.6,113.8 L376.7,117.1 L378.0,120.1 L379.6,120.8 L380.4,127.4 L380.8,128.3 L379.5,131.3 L379.6,133.8 L380.1,134.8 L379.9,138.0 L380.6,140.8 L381.3,141.5 L380.6,144.5 L379.5,145.2 L379.5,147.0 L379.0,149.3 L380.8,152.0 L382.1,156.2 L380.0,154.6 L376.8,156.0 L374.0,155.7 L372.5,157.6 L370.2,157.5 L369.9,156.6 L369.0,157.2 L368.2,155.8 L367.0,156.3 L367.0,155.3 L365.6,152.9 L366.3,149.3 L367.0,148.7 L367.9,145.9 L367.3,144.0 L368.7,141.1 L369.0,137.4 L368.6,134.4 L369.1,132.5 L368.4,133.2 L366.1,128.7 L366.8,126.2 L366.5,125.4 L365.3,121.1 L368.4,119.9 L366.9,116.8 L366.4,114.6 L368.5,114.5 L370.3,113.5 L369.5,111.6 L368.9,108.6 L367.6,107.7 L367.9,106.0 L370.5,104.0 L371.1,102.6 L373.6,101.1 L375.2,101.0 L377.3,101.5 L378.9,100.5 L379.5,100.9 L382.3,104.2 L385.1,106.1 L393.3,107.3 L394.8,107.9 L400.0,111.8 L399.8,113.7 Z M383.7,161.4 L383.4,166.7 L383.0,168.7 L382.3,163.8 L382.1,159.5 L382.6,158.3 Z",
      "cx": 378.4,
      "cy": 135.2
    },
    {
      "id": "ID.KR",
      "name": "Kepulauan Riau",
      "island": "Sumatra",
      "color": "#14b8a6",
      "d": "M144.3,91.5 L145.0,92.7 L144.0,94.7 L142.6,94.2 L141.7,95.5 L141.3,93.8 L140.1,92.9 L141.0,91.2 L141.9,91.7 L143.1,90.6 Z M143.3,82.3 L143.8,82.4 L146.1,84.5 L146.0,85.0 L143.7,83.2 Z M138.9,75.6 L138.2,74.9 L139.4,74.3 L139.8,75.4 Z M126.6,73.6 L128.1,75.5 L128.0,77.2 L126.7,76.8 L125.6,75.3 L125.7,73.7 Z M132.9,74.9 L131.2,73.8 L131.4,73.1 L132.5,73.8 Z M137.8,72.9 L139.2,73.3 L138.1,74.2 L136.6,73.0 L136.8,72.0 Z M133.8,71.3 L134.7,72.1 L133.9,72.3 L132.8,71.3 Z M126.9,71.6 L125.6,71.7 L124.9,70.9 L126.0,69.9 Z M137.3,69.2 L137.0,70.5 L135.9,71.5 L134.4,71.2 L133.6,70.1 L135.6,68.6 Z M205.3,40.7 L204.3,40.2 L205.4,38.4 L206.0,38.7 Z M160.1,41.0 L160.6,42.0 L158.9,42.4 L159.3,41.0 L158.7,39.8 Z M166.7,37.0 L167.4,37.7 L167.5,39.0 L166.4,38.5 Z M147.0,88.7 L144.1,89.7 L142.7,89.0 L143.7,85.8 L144.6,85.5 L146.9,87.4 L147.4,88.3 L148.6,87.5 L149.8,88.8 L151.1,89.4 L148.7,89.8 Z M138.5,69.8 L140.9,68.1 L143.8,68.0 L144.8,69.4 L144.8,72.1 L144.2,73.3 L142.4,73.1 L141.4,71.7 L141.8,70.1 L139.8,71.0 L138.8,70.9 Z M193.7,28.8 L195.8,27.0 L193.1,26.5 L191.9,24.3 L195.2,20.7 L196.5,23.0 L197.8,24.2 L198.2,26.0 L197.0,28.9 L194.9,29.4 Z",
      "cx": 150,
      "cy": 67.5
    },
    {
      "id": "ID.IB",
      "name": "Papua Barat Daya",
      "island": "Papua",
      "color": "#c026d3",
      "d": "M580.0,129.1 L578.5,129.3 L576.4,128.2 L576.5,127.3 L578.6,128.7 Z M591.9,96.1 L591.2,95.0 L592.0,93.8 L592.6,94.2 Z M588.9,92.6 L588.4,91.2 L589.3,89.8 L589.6,90.6 Z M522.4,83.9 L520.9,84.8 L519.1,84.4 L520.8,83.4 Z M535.7,77.0 L537.0,77.1 L535.4,78.5 L532.3,79.3 L529.6,79.2 L529.7,78.0 L534.1,77.9 Z M530.8,66.5 L534.9,65.2 L540.0,66.2 L542.3,67.2 L543.0,69.0 L541.6,70.8 L539.3,69.9 L538.2,70.7 L537.1,70.4 L535.9,69.0 L534.6,68.9 L532.9,66.5 L531.9,67.5 L534.9,70.1 L536.0,69.7 L537.1,70.7 L535.8,71.7 L533.8,72.0 L533.0,69.8 L531.3,70.5 L531.1,71.9 L532.1,71.6 L533.1,72.4 L532.4,73.4 L529.6,73.5 L530.3,72.2 L531.1,71.9 L530.1,69.3 L529.2,69.8 L525.9,68.9 L528.4,68.8 L528.6,67.7 L526.9,68.2 L526.5,67.2 L528.1,66.7 L528.8,67.1 L530.0,66.1 Z M528.7,95.4 L527.5,97.0 L522.4,96.5 L519.1,94.8 L523.6,92.6 L526.8,92.2 L528.9,91.5 L528.8,92.2 L530.2,93.9 L528.8,95.1 L530.2,95.6 L529.3,96.4 Z M534.9,84.4 L532.9,80.5 L533.4,80.0 L536.6,78.8 L537.3,79.3 L538.8,79.1 L539.5,80.0 L539.1,83.9 L538.3,85.8 L536.3,85.6 Z M600.8,129.0 L598.6,128.3 L597.3,127.2 L598.0,124.1 L601.5,124.6 L601.2,123.7 L597.5,123.6 L596.1,125.2 L595.2,125.5 L593.6,123.7 L592.1,123.1 L591.9,125.5 L589.9,124.4 L589.1,123.3 L589.8,122.7 L588.8,121.3 L588.3,122.5 L586.2,122.8 L584.3,119.7 L584.1,121.0 L582.1,119.3 L581.0,117.0 L581.9,116.5 L581.6,113.4 L584.3,111.0 L584.2,108.5 L583.3,110.0 L581.3,111.7 L581.3,115.5 L579.7,116.6 L580.2,118.7 L577.5,121.2 L578.3,123.1 L575.4,126.4 L574.5,126.9 L572.4,126.6 L570.7,127.5 L568.0,124.9 L568.4,124.8 L566.8,120.9 L567.2,120.0 L569.2,120.2 L569.9,118.8 L568.3,117.4 L567.9,114.6 L566.1,115.6 L564.6,113.9 L565.0,113.4 L563.8,112.0 L560.1,109.7 L558.0,109.3 L556.2,110.0 L554.7,109.3 L555.7,107.6 L554.4,107.5 L558.1,105.5 L559.8,105.5 L564.1,106.0 L566.5,107.3 L568.0,106.1 L571.0,102.0 L573.1,101.0 L575.3,101.3 L576.9,103.2 L577.3,102.1 L578.6,103.5 L580.0,102.5 L581.0,103.0 L581.3,105.4 L581.7,102.1 L583.4,104.2 L583.3,101.5 L582.1,101.0 L585.9,100.3 L584.4,99.7 L585.3,98.6 L583.5,98.7 L582.8,98.1 L585.2,96.6 L585.0,95.7 L581.4,96.9 L580.4,97.8 L577.3,98.0 L574.9,97.6 L569.4,99.0 L567.4,98.5 L565.6,99.5 L563.4,97.7 L560.1,99.1 L558.0,97.6 L555.7,96.8 L554.1,94.6 L553.3,92.2 L554.6,90.2 L553.1,90.7 L552.7,89.1 L553.7,88.1 L551.2,89.2 L551.3,87.9 L549.9,88.7 L549.6,87.8 L547.5,87.4 L545.3,87.8 L544.4,86.2 L542.9,86.3 L543.7,87.4 L541.9,88.3 L540.6,87.3 L538.0,87.3 L539.0,84.6 L541.3,83.6 L542.3,81.5 L542.0,77.5 L546.6,76.0 L546.2,76.7 L551.8,74.9 L555.0,71.4 L557.6,70.0 L560.2,69.2 L564.5,69.2 L567.6,70.5 L568.7,70.3 L570.0,71.3 L571.6,71.6 L575.4,74.4 L581.0,74.5 L584.7,73.9 L587.8,76.0 L586.3,76.6 L585.8,77.6 L587.3,80.5 L588.6,81.4 L589.9,83.6 L589.2,84.9 L588.9,87.1 L587.1,88.9 L588.4,94.5 L588.4,96.6 L589.2,99.8 L591.4,101.9 L592.6,105.4 L593.7,107.2 L594.8,106.8 L593.8,103.6 L593.8,102.1 L594.9,101.3 L594.4,100.0 L595.3,98.4 L595.4,100.5 L596.6,102.4 L596.9,106.7 L593.5,109.8 L593.6,110.6 L591.8,112.4 L590.6,114.3 L590.7,115.8 L606.8,121.0 Z",
      "cx": 562.9,
      "cy": 95.3
    },
    {
      "id": "ID.SU",
      "name": "Sumatera Utara",
      "island": "Sumatra",
      "color": "#059669",
      "d": "M53.7,98.1 L52.8,99.3 L51.2,98.6 L51.8,95.8 L53.0,94.3 L53.9,95.9 Z M54.7,94.5 L54.5,96.1 L50.4,90.7 L52.1,90.6 L53.6,93.4 Z M55.3,87.7 L58.5,88.0 L58.7,88.8 L56.3,89.2 L54.0,89.0 L53.8,88.2 Z M52.4,65.4 L53.8,65.8 L51.4,65.6 L51.7,64.7 Z M79.1,50.8 L79.1,50.8 L79.1,50.8 L79.1,50.8 Z M79.1,50.8 L79.1,50.8 L79.1,50.8 Z M63.2,86.1 L62.0,80.6 L61.3,80.7 L61.1,78.3 L60.2,77.5 L59.0,73.3 L56.8,68.9 L56.2,67.1 L57.1,64.9 L55.7,63.3 L54.6,63.8 L52.7,61.3 L51.2,60.5 L48.6,59.9 L45.9,57.8 L46.2,55.6 L44.5,52.0 L45.1,50.4 L44.9,48.4 L42.8,47.0 L42.3,44.4 L42.8,43.5 L41.7,41.8 L43.5,40.6 L42.2,39.1 L40.2,34.5 L43.4,30.8 L44.2,26.9 L46.0,26.0 L47.2,26.0 L47.3,27.2 L46.1,27.9 L46.0,28.8 L47.2,27.7 L47.9,29.1 L50.5,29.6 L53.6,31.4 L54.2,33.1 L55.5,34.2 L58.0,34.9 L61.4,36.7 L66.2,39.7 L67.8,41.2 L70.2,41.8 L71.8,43.8 L73.8,45.2 L74.2,47.4 L73.6,48.8 L75.1,48.4 L76.3,51.3 L76.2,49.1 L77.3,48.6 L79.1,50.8 L79.1,50.8 L79.1,50.8 L79.1,50.8 L78.7,53.9 L79.3,56.5 L79.3,60.9 L80.5,61.8 L81.6,65.0 L80.3,66.2 L76.7,68.0 L76.2,68.9 L77.5,70.8 L78.5,71.5 L78.7,76.1 L78.2,77.8 L72.9,76.4 L71.1,76.2 L72.5,77.7 L74.4,80.8 L74.4,81.8 L73.0,82.4 L71.0,82.0 L69.5,81.1 L65.9,82.6 Z M30.7,70.1 L33.3,70.0 L35.3,68.3 L37.1,68.9 L40.4,73.1 L41.9,73.7 L44.3,76.0 L43.8,77.2 L43.7,81.2 L42.9,82.4 L41.0,82.4 L39.5,78.7 L36.0,76.9 L35.9,75.9 L33.6,72.4 Z",
      "cx": 58.7,
      "cy": 62.8
    },
    {
      "id": "ID.RI",
      "name": "Riau",
      "island": "Sumatra",
      "color": "#6ee7b7",
      "d": "M123.4,79.1 L122.7,78.8 L122.9,76.9 L123.6,76.2 L124.9,77.4 L124.8,78.7 Z M120.8,71.4 L123.0,73.7 L121.7,74.4 L117.1,71.8 L115.0,72.2 L115.9,70.0 L117.2,69.8 Z M112.3,73.0 L111.4,73.6 L110.4,73.1 L108.8,71.2 L108.8,69.3 L108.2,68.2 L108.3,66.6 L109.4,66.6 L112.3,68.9 L112.0,71.0 Z M100.5,57.3 L101.3,58.9 L100.6,61.5 L98.5,62.6 L96.8,61.8 L95.7,59.4 L96.3,57.4 L97.6,57.5 L99.3,56.3 Z M78.7,53.9 L79.1,50.8 L80.2,53.8 L83.0,56.6 L84.6,56.9 L87.6,58.8 L88.2,60.4 L89.0,60.4 L88.0,58.2 L86.7,56.4 L86.7,55.1 L88.1,54.3 L90.3,54.3 L90.6,55.3 L94.2,57.8 L95.5,61.8 L96.3,62.7 L98.8,63.4 L101.6,63.4 L105.4,66.3 L106.9,67.0 L107.4,69.0 L108.2,70.0 L108.2,71.7 L109.0,72.9 L112.5,75.8 L113.8,76.3 L115.5,76.0 L118.6,76.2 L121.4,78.6 L121.8,80.3 L116.6,83.3 L115.6,83.5 L114.6,84.8 L116.3,83.7 L119.4,83.0 L121.9,81.1 L123.2,80.7 L124.0,79.5 L126.0,78.7 L128.7,80.0 L129.8,81.8 L130.4,81.3 L132.1,82.7 L132.8,86.4 L129.8,86.6 L129.8,87.8 L128.5,88.2 L127.4,89.7 L128.5,89.6 L127.8,91.5 L128.3,91.7 L129.0,90.1 L130.6,89.8 L132.5,90.7 L132.5,91.4 L130.4,92.1 L128.7,92.0 L130.1,92.7 L129.9,93.4 L127.7,94.2 L127.6,95.5 L126.7,96.9 L128.1,97.5 L123.1,98.2 L120.4,98.2 L118.7,98.7 L117.0,100.5 L115.1,103.3 L112.2,102.3 L110.7,100.5 L109.6,100.2 L107.0,100.7 L105.2,102.6 L103.5,103.2 L102.0,102.3 L99.8,101.9 L95.3,98.7 L92.1,95.5 L91.5,94.4 L89.3,93.3 L88.2,91.7 L87.5,89.6 L88.9,89.0 L88.7,85.8 L83.5,82.2 L81.4,82.8 L79.8,82.3 L78.1,79.4 L78.2,77.8 L78.7,76.1 L78.5,71.5 L77.5,70.8 L76.2,68.9 L76.7,68.0 L80.3,66.2 L81.6,65.0 L80.5,61.8 L79.3,60.9 L79.3,56.5 Z M118.2,75.2 L115.7,75.2 L113.9,75.7 L111.5,74.4 L112.9,72.8 L112.6,70.5 L113.6,70.5 L115.0,72.4 L116.8,72.1 L120.7,74.3 L121.2,75.3 L120.6,76.6 Z M105.0,63.7 L106.0,63.5 L108.5,64.2 L110.2,64.3 L112.3,65.2 L112.8,68.3 L111.6,68.1 L110.0,66.4 L107.0,66.0 L105.9,65.2 Z",
      "cx": 107.9,
      "cy": 76.2
    },
    {
      "id": "ID.SW",
      "name": "Sulawesi Utara",
      "island": "Sulawesi",
      "color": "#8b5cf6",
      "d": "M450.2,30.1 L449.2,28.8 L449.5,27.6 L450.5,27.9 L449.8,28.9 Z M452.4,16.7 L453.1,17.8 L452.5,18.5 L450.6,17.3 L450.7,15.9 L449.5,15.1 L449.4,13.6 L450.5,13.9 Z M470.4,12.0 L469.3,11.7 L468.9,10.5 L469.9,10.9 Z M468.2,11.2 L467.6,9.4 L466.7,7.8 L468.3,9.5 Z M467.9,4.4 L467.7,2.0 L468.0,0.2 L469.2,0.0 L470.2,0.7 L470.1,2.6 L471.1,3.9 L469.6,5.9 L469.7,7.7 L469.0,8.4 L467.5,7.9 L469.4,4.9 Z M416.8,57.5 L420.9,57.3 L423.8,58.1 L424.6,57.7 L427.9,58.4 L429.6,58.2 L430.5,57.2 L432.6,56.4 L435.0,54.9 L436.0,52.6 L439.0,52.3 L439.3,51.4 L438.3,51.1 L438.2,49.9 L439.2,49.0 L440.3,49.2 L442.6,47.7 L442.3,46.2 L445.2,43.9 L445.3,44.7 L447.4,44.8 L447.3,46.0 L448.6,47.4 L449.2,46.4 L448.9,48.5 L447.1,48.5 L445.6,52.2 L443.8,55.4 L442.7,55.9 L440.4,58.1 L440.0,59.3 L438.2,62.3 L438.4,62.7 L435.6,64.4 L431.8,65.3 L427.0,66.2 L425.4,66.9 L422.7,66.4 L423.3,64.6 L422.2,62.0 L419.2,60.3 L418.5,58.8 Z",
      "cx": 447,
      "cy": 36.3
    },
    {
      "id": "ID.LA",
      "name": "Lampung",
      "island": "Sumatra",
      "color": "#22c55e",
      "d": "M464.1,105.9 L462.4,105.1 L462.0,103.1 L461.3,102.6 L460.6,100.4 L461.6,98.5 L462.4,98.9 L462.4,101.8 L463.8,104.5 Z M487.8,86.3 L487.4,86.9 L484.2,86.5 L485.5,85.5 Z M481.7,79.8 L479.2,79.8 L480.0,77.3 L481.3,78.5 Z M479.7,71.8 L480.9,72.2 L480.4,73.1 L480.7,74.9 L478.5,76.1 L478.2,72.5 Z M515.4,69.5 L513.9,68.0 L512.5,67.6 L511.5,65.7 L515.6,68.9 Z M482.4,65.7 L482.9,66.1 L483.3,68.5 L482.2,67.1 Z M482.2,56.6 L482.5,57.8 L481.5,58.5 L481.5,56.5 Z M480.9,56.5 L479.9,55.7 L480.5,55.0 L481.4,55.8 Z M458.0,96.5 L462.4,95.8 L467.7,96.1 L466.6,96.9 L462.2,97.6 L456.8,98.0 L454.0,98.7 L454.1,97.8 L452.6,96.6 L453.8,96.3 L454.7,96.0 Z M441.8,94.4 L447.7,95.5 L448.8,95.9 L449.1,94.9 L450.1,95.1 L450.3,96.3 L451.6,95.5 L452.3,97.5 L448.2,98.0 L447.7,98.9 L445.3,98.3 L440.7,100.1 L438.6,100.2 L437.4,97.6 L438.1,95.2 L440.2,94.6 Z M493.5,93.4 L491.7,93.0 L488.2,93.2 L485.6,94.0 L483.2,92.6 L483.9,89.2 L484.7,89.7 L486.8,87.8 L488.9,88.3 L490.0,89.2 L491.0,89.1 L493.3,90.8 L494.7,91.2 L495.0,92.6 Z M486.7,78.4 L488.8,78.0 L490.5,79.1 L489.4,80.7 L488.3,81.0 L486.8,80.2 L486.4,79.1 L483.9,80.2 L483.5,78.7 L483.9,77.5 L482.8,77.3 L481.3,75.7 L481.4,73.1 L482.0,72.9 L483.6,74.0 L484.4,72.4 L485.3,72.7 L486.2,74.0 L487.0,74.6 L486.0,77.3 Z M497.2,35.9 L494.1,36.3 L493.4,35.3 L493.1,33.2 L492.5,33.0 L494.2,29.9 L496.3,27.7 L498.3,27.4 L499.9,29.9 L499.3,32.6 L498.3,35.0 Z M492.8,78.2 L489.5,73.1 L487.3,72.0 L486.7,71.2 L486.9,67.0 L486.5,65.2 L486.9,63.5 L484.6,61.4 L483.8,59.4 L484.1,56.6 L485.1,55.2 L483.3,54.5 L482.6,51.8 L481.6,52.2 L481.4,49.4 L483.3,45.5 L482.9,44.7 L483.6,41.3 L485.1,38.6 L488.3,34.7 L490.3,34.1 L490.4,34.9 L488.9,37.5 L487.8,38.4 L487.7,40.0 L489.0,40.3 L490.2,41.4 L490.0,42.8 L490.7,44.1 L490.0,47.8 L488.9,50.0 L488.0,50.3 L485.1,52.6 L485.5,54.3 L487.7,55.5 L489.6,54.3 L489.7,52.3 L491.4,50.4 L493.0,50.2 L493.5,49.2 L491.8,48.3 L493.2,46.5 L495.8,44.4 L497.2,43.6 L501.1,43.0 L500.7,44.9 L501.6,45.5 L501.3,50.6 L497.4,53.0 L495.6,53.5 L495.3,54.8 L494.1,55.5 L495.7,57.1 L501.5,58.7 L501.7,61.6 L503.8,62.1 L504.4,63.1 L499.4,62.1 L498.4,61.2 L495.2,61.3 L493.4,60.4 L492.0,60.4 L490.5,60.2 L489.8,60.9 L489.4,63.0 L490.2,65.3 L489.9,67.8 L492.0,72.2 L492.5,73.7 L495.5,78.0 L498.8,80.9 L496.5,80.5 L495.2,78.9 Z",
      "cx": 482.7,
      "cy": 69.7
    },
    {
      "id": "ID.SB",
      "name": "Sumatera Barat",
      "island": "Sumatra",
      "color": "#34d399",
      "d": "M81.6,130.2 L80.7,131.2 L78.8,131.5 L78.3,130.5 L78.4,128.6 L77.8,127.4 L78.0,126.3 L81.5,129.0 Z M73.6,121.3 L76.0,124.5 L72.1,123.4 L70.9,121.8 L71.7,119.7 L73.3,120.4 Z M98.1,122.3 L95.7,123.5 L93.7,125.3 L92.0,123.2 L90.4,120.4 L91.2,118.8 L90.6,116.7 L89.4,115.6 L87.2,112.4 L86.9,111.2 L85.9,110.3 L85.8,108.6 L83.3,107.7 L83.5,106.7 L82.7,106.2 L83.2,104.4 L82.7,104.3 L81.3,101.2 L79.1,99.1 L76.5,96.0 L73.6,93.8 L72.7,91.9 L72.4,89.9 L70.2,88.0 L67.1,87.2 L65.7,86.1 L64.6,86.6 L63.2,86.1 L65.9,82.6 L69.5,81.1 L71.0,82.0 L73.0,82.4 L74.4,81.8 L74.4,80.8 L72.5,77.7 L71.1,76.2 L72.9,76.4 L78.2,77.8 L78.1,79.4 L79.8,82.3 L81.4,82.8 L83.5,82.2 L88.7,85.8 L88.9,89.0 L87.5,89.6 L88.2,91.7 L89.3,93.3 L91.5,94.4 L92.1,95.5 L95.3,98.7 L99.8,101.9 L102.0,102.3 L103.5,103.2 L103.8,104.6 L104.7,105.1 L104.1,106.2 L102.4,107.0 L102.5,110.2 L99.3,113.6 L96.0,113.9 L94.3,113.7 L94.9,116.9 L96.8,119.2 Z M81.6,133.3 L81.3,131.3 L82.0,130.4 L85.8,133.8 L85.8,134.6 L85.9,135.5 L84.6,135.9 L86.2,138.2 L84.7,137.7 L84.1,135.6 Z M60.6,104.2 L60.5,104.9 L63.2,108.7 L64.3,111.6 L66.5,113.8 L66.4,116.3 L64.1,116.9 L60.8,115.3 L59.5,113.1 L55.9,108.3 L56.6,106.7 L56.7,104.7 L60.1,103.8 Z",
      "cx": 80.7,
      "cy": 107.7
    },
    {
      "id": "ID.MA",
      "name": "Maluku",
      "island": "Maluku",
      "color": "#06b6d4",
      "d": "M498.9,191.7 L498.7,192.8 L497.1,192.7 L497.1,191.8 Z M511.2,191.7 L509.4,192.3 L508.2,191.5 L510.4,191.2 Z M490.9,192.3 L489.6,191.8 L490.7,191.0 L492.1,191.9 Z M493.0,190.1 L497.3,191.3 L496.2,192.4 L492.5,191.3 L492.1,190.2 Z M542.3,190.3 L543.6,190.5 L541.0,191.8 L539.5,192.0 L539.3,192.9 L537.5,193.6 L538.9,191.8 L541.7,189.4 Z M522.2,185.4 L523.4,185.8 L523.7,187.2 L522.4,189.1 L521.2,188.9 L519.6,187.1 L520.2,185.2 Z M543.1,182.3 L542.8,183.2 L540.7,183.6 L541.1,182.9 Z M486.2,183.4 L485.9,181.3 L487.6,181.6 L487.7,182.3 Z M543.9,179.1 L542.4,180.4 L541.2,180.2 L541.5,179.1 Z M555.2,174.2 L556.1,175.3 L555.9,176.5 L554.6,175.2 L552.9,175.2 L552.7,174.3 Z M505.6,176.0 L505.0,176.6 L503.4,175.6 L504.7,174.2 L505.9,174.9 Z M598.2,168.5 L597.3,168.4 L598.3,165.9 L599.0,166.1 Z M599.0,165.2 L597.8,165.4 L597.3,164.3 L598.8,164.2 Z M597.1,163.2 L595.6,164.7 L594.8,163.3 L593.1,162.6 L594.6,161.2 Z M600.7,163.8 L600.0,162.9 L600.7,161.1 L601.4,161.9 Z M589.9,156.8 L591.0,157.1 L591.1,158.7 L592.7,160.3 L594.1,161.0 L592.8,161.9 L589.7,159.2 Z M567.1,151.0 L568.7,154.8 L567.7,156.2 L566.6,155.4 L566.7,152.5 L565.8,150.8 Z M568.4,150.0 L568.8,151.8 L568.0,151.9 L567.8,150.3 Z M482.5,127.0 L481.5,127.1 L480.9,126.1 L482.4,125.7 Z M500.5,122.1 L500.1,120.9 L501.9,120.7 L502.5,121.5 Z M498.8,121.3 L499.0,122.2 L497.7,122.0 L498.1,122.9 L496.4,124.0 L497.0,122.4 L493.8,124.6 L492.6,123.6 L494.4,121.8 L496.3,121.6 L498.2,120.3 Z M503.9,120.6 L504.6,120.1 L505.0,121.8 L504.1,121.1 L503.4,121.9 L502.5,120.6 Z M486.6,117.0 L487.4,117.2 L488.0,118.5 L485.8,117.6 Z M490.3,116.7 L488.2,116.5 L489.2,115.4 L490.0,115.3 Z M493.3,112.1 L492.8,113.2 L491.1,113.5 L491.3,112.8 Z M474.7,182.3 L476.2,183.9 L477.3,183.8 L478.0,184.9 L476.1,185.1 L473.8,186.2 L472.4,188.5 L471.7,188.0 L468.3,187.9 L466.5,187.3 L464.3,187.8 L462.6,189.2 L462.1,189.0 L462.5,187.1 L463.4,186.3 L464.6,184.3 L468.4,184.7 L470.3,184.4 L472.9,182.8 Z M549.2,175.3 L550.8,174.3 L551.1,175.2 L551.9,174.7 L552.4,175.7 L550.9,176.6 L551.8,179.0 L551.0,181.9 L549.7,183.6 L547.1,185.8 L546.0,188.4 L545.5,187.1 L544.7,188.2 L542.9,188.1 L542.4,186.2 L543.6,185.2 L543.2,183.3 L544.2,183.7 L544.1,181.9 L545.0,180.0 L546.5,179.4 L547.2,178.0 Z M592.4,170.2 L590.5,171.1 L588.4,168.9 L589.1,164.1 L590.4,164.3 L589.4,163.3 L589.0,160.2 L589.6,159.5 L592.1,161.3 L592.0,162.0 L594.4,163.6 L595.7,165.8 Z M592.9,152.1 L594.5,149.3 L595.3,149.5 L595.1,147.9 L596.5,147.5 L598.3,149.2 L597.5,150.0 L599.3,151.4 L598.5,154.0 L599.5,154.8 L597.3,155.5 L599.6,158.0 L598.5,161.7 L597.1,162.4 L592.7,160.1 L592.0,159.1 L592.0,155.5 L593.1,154.3 L593.1,153.2 L590.6,152.4 L591.4,151.6 Z M571.8,151.4 L573.3,146.1 L574.5,146.1 L573.5,150.6 L572.4,151.4 L571.3,152.7 L571.0,154.9 L569.3,156.7 L570.6,152.2 Z M463.3,117.8 L464.7,115.7 L466.1,116.6 L467.8,115.5 L469.6,114.8 L474.2,114.5 L476.5,115.2 L479.9,116.4 L480.2,117.5 L479.2,117.5 L479.5,118.4 L481.0,118.4 L482.6,119.1 L482.4,122.4 L481.8,123.3 L480.6,123.2 L478.0,125.0 L474.9,126.5 L472.6,126.0 L466.2,123.0 L465.8,121.8 L464.3,120.7 Z M518.1,109.0 L521.4,110.6 L524.9,111.6 L529.4,111.2 L531.7,112.8 L533.1,113.3 L533.9,114.7 L534.6,117.6 L536.1,117.6 L537.9,120.1 L537.3,122.0 L537.6,124.6 L533.9,123.4 L530.9,121.3 L526.4,119.8 L524.1,118.8 L523.8,117.6 L522.6,116.9 L517.3,116.5 L516.7,117.1 L517.7,118.7 L516.5,119.1 L514.5,118.3 L512.6,118.3 L510.7,117.5 L508.4,117.7 L508.7,116.1 L507.0,115.4 L504.3,117.8 L504.1,119.0 L501.2,119.6 L499.9,118.9 L498.0,116.0 L496.4,115.7 L496.7,114.4 L495.7,113.9 L494.7,115.8 L494.6,117.3 L493.6,118.6 L492.7,121.3 L492.3,120.8 L492.7,118.8 L492.4,117.6 L491.2,115.6 L493.7,114.0 L495.2,113.8 L495.4,112.0 L496.1,110.6 L499.3,110.5 L501.3,110.0 L502.6,110.3 L506.7,110.3 L509.5,109.3 L509.7,110.7 L510.6,111.6 L514.2,109.9 L515.5,108.8 Z",
      "cx": 528.3,
      "cy": 150.7
    },
    {
      "id": "ID.NB",
      "name": "Nusa Tenggara Barat",
      "island": "Bali & Nusa Tenggara",
      "color": "#f43f5e",
      "d": "M341.0,198.3 L340.0,197.8 L340.0,195.4 L342.5,194.9 Z M363.6,195.6 L362.4,195.4 L362.7,194.1 L364.0,194.3 Z M323.8,196.4 L327.6,197.3 L329.2,199.0 L328.4,201.4 L325.9,205.1 L326.9,206.5 L325.0,206.8 L325.6,205.7 L324.5,206.0 L324.6,207.4 L323.6,206.7 L321.7,207.0 L320.9,206.4 L318.8,206.9 L316.2,205.4 L319.5,204.1 L319.6,202.1 L318.8,200.2 L319.8,199.6 L322.2,197.2 Z M344.9,197.8 L343.2,196.0 L343.5,195.0 L345.9,193.9 L349.1,194.1 L351.1,197.2 L352.0,197.7 L354.0,196.0 L357.0,196.4 L357.7,197.6 L357.2,199.9 L358.2,198.7 L358.2,197.2 L359.4,196.4 L362.0,196.5 L363.0,198.8 L362.9,201.2 L365.3,200.8 L364.4,202.8 L362.2,203.0 L360.8,202.1 L358.9,202.5 L358.7,203.5 L361.3,203.7 L361.6,204.3 L359.9,204.5 L358.8,203.9 L354.6,204.9 L353.4,204.0 L354.1,202.6 L353.5,202.2 L350.1,205.1 L349.0,204.8 L346.3,206.3 L344.0,206.0 L341.5,207.4 L338.2,208.4 L335.8,208.1 L335.2,209.0 L333.5,209.3 L329.9,208.1 L329.4,206.0 L330.6,204.7 L329.5,203.0 L330.7,200.6 L332.8,200.4 L335.8,198.2 L339.4,199.9 L339.5,198.8 L341.1,198.7 L341.7,200.3 L342.2,199.4 L342.5,200.8 L343.7,200.9 L344.9,203.2 L346.1,202.8 L347.3,203.5 L348.7,202.1 L351.8,201.8 L349.6,199.6 L347.7,199.5 Z",
      "cx": 343.2,
      "cy": 201.4
    },
    {
      "id": "ID.SG",
      "name": "Sulawesi Tenggara",
      "island": "Sulawesi",
      "color": "#4c1d95",
      "d": "M435.9,160.1 L435.4,160.2 L434.3,158.7 L435.3,158.6 Z M429.0,150.7 L427.9,150.5 L427.6,148.9 L428.8,149.2 Z M403.4,147.6 L404.1,147.1 L405.6,148.9 L405.6,152.5 L404.3,153.1 L403.0,152.0 L401.8,150.1 L402.4,147.7 Z M420.1,130.7 L421.9,130.5 L422.7,131.9 L421.5,133.9 L420.3,134.2 L418.6,132.7 L418.1,131.5 L419.3,130.3 Z M389.7,115.8 L390.8,115.2 L392.5,115.2 L395.6,117.2 L397.4,116.4 L400.1,116.5 L404.3,117.9 L406.5,118.1 L408.6,119.8 L407.9,121.0 L409.1,121.8 L407.3,121.9 L408.0,123.0 L406.7,124.6 L407.5,126.1 L409.1,127.1 L410.4,127.1 L411.8,129.0 L413.8,129.7 L412.2,130.6 L413.7,131.0 L414.1,132.7 L416.6,132.7 L415.5,131.6 L416.6,131.7 L417.6,133.7 L417.6,136.6 L416.8,137.3 L414.1,135.6 L415.7,138.0 L413.1,136.8 L411.6,137.5 L410.6,137.2 L405.9,139.0 L405.0,141.8 L406.4,143.1 L404.4,144.0 L401.8,143.5 L400.1,143.9 L397.8,142.6 L396.7,141.3 L397.2,135.0 L398.0,135.1 L398.5,132.8 L397.4,131.9 L394.4,131.3 L393.0,129.3 L391.4,128.8 L387.3,125.2 L386.9,123.8 L388.4,121.1 L389.6,120.0 L389.3,118.1 Z M415.3,140.4 L416.1,144.9 L414.2,146.9 L413.6,149.2 L414.5,150.5 L413.8,151.9 L412.9,152.2 L412.3,150.1 L411.7,151.7 L410.8,151.1 L408.9,151.4 L409.7,147.5 L410.6,146.8 L409.3,143.5 L410.4,142.0 L411.8,141.8 L414.1,140.2 Z M416.6,149.1 L415.9,148.1 L416.5,146.3 L417.2,142.9 L417.0,140.4 L417.8,137.8 L419.4,136.5 L422.0,139.0 L422.4,140.7 L422.6,142.7 L421.1,141.2 L420.0,141.7 L419.6,144.5 L418.9,145.5 L419.2,146.9 L418.7,148.2 L419.8,147.7 L422.4,149.2 L422.7,149.9 L421.8,151.2 L420.6,151.7 L419.3,151.4 L417.8,152.4 L418.5,153.4 L417.2,155.7 L415.8,155.0 L414.4,155.6 L413.2,153.3 L415.6,149.5 Z",
      "cx": 411.5,
      "cy": 139.2
    },
    {
      "id": "ID.ST",
      "name": "Sulawesi Tengah",
      "island": "Sulawesi",
      "color": "#7c3aed",
      "d": "M430.6,100.5 L429.5,100.4 L429.3,98.6 L430.2,99.4 Z M419.0,99.4 L418.5,99.4 L418.9,97.3 L419.7,98.3 Z M425.8,94.7 L426.5,95.1 L426.0,96.5 L424.7,96.3 L424.4,94.2 L425.0,93.0 Z M399.4,78.2 L400.3,79.2 L399.8,79.8 L396.8,79.3 Z M402.4,77.0 L402.6,76.1 L403.4,77.9 L400.5,78.4 L399.7,78.1 L400.4,76.8 Z M365.7,86.3 L367.4,84.8 L367.0,84.4 L368.1,83.3 L369.9,86.7 L369.9,84.4 L368.9,82.8 L368.3,80.8 L368.5,75.5 L367.6,75.7 L366.2,74.8 L366.7,73.5 L369.0,75.2 L369.8,72.8 L368.2,70.4 L369.4,69.6 L369.1,68.8 L369.9,66.8 L371.6,66.1 L371.4,63.9 L371.9,62.8 L374.4,61.3 L374.9,58.9 L375.8,59.0 L376.0,60.9 L379.3,61.8 L381.0,58.5 L381.6,58.7 L382.6,57.4 L382.7,53.8 L383.9,53.1 L387.7,53.6 L389.3,54.6 L392.0,53.4 L391.8,54.4 L392.6,56.0 L394.9,56.8 L399.2,56.0 L400.0,57.0 L401.7,56.4 L403.3,56.8 L400.4,58.4 L398.1,58.0 L393.2,60.1 L391.3,60.0 L390.2,60.5 L389.3,62.1 L388.2,62.7 L389.7,64.1 L390.9,64.2 L390.9,65.9 L388.4,66.1 L387.8,66.8 L385.8,66.4 L384.4,66.8 L381.2,65.4 L378.6,65.6 L376.7,66.4 L375.3,68.0 L373.3,71.0 L372.8,73.6 L371.9,74.8 L371.6,76.8 L373.4,83.3 L375.8,86.6 L377.1,87.3 L378.3,86.7 L379.7,87.7 L381.0,89.6 L380.8,91.2 L382.6,93.8 L384.8,92.8 L385.8,93.6 L387.2,93.3 L388.5,93.9 L389.8,92.3 L390.2,90.5 L391.2,89.7 L394.4,85.2 L396.8,84.4 L397.7,86.2 L400.8,86.4 L403.5,85.8 L404.2,83.9 L404.9,83.3 L410.9,82.8 L412.5,83.4 L415.4,82.8 L416.1,82.3 L413.4,81.7 L412.7,81.2 L414.0,80.6 L417.0,80.3 L417.7,79.6 L420.1,79.7 L422.6,80.6 L423.5,82.3 L422.6,86.0 L421.6,86.8 L419.1,85.2 L418.2,83.7 L417.7,84.4 L414.0,85.2 L412.8,88.0 L411.7,88.8 L409.4,92.3 L407.8,94.0 L405.2,95.9 L402.7,96.1 L399.5,97.7 L398.0,100.6 L395.8,100.9 L394.2,99.4 L392.3,99.0 L392.9,100.1 L392.9,102.1 L393.7,100.8 L395.8,102.9 L396.5,104.4 L398.4,104.6 L400.2,106.1 L401.2,107.9 L403.4,110.8 L403.4,112.0 L405.9,113.6 L406.1,114.4 L408.0,115.3 L407.5,116.9 L410.4,118.9 L409.9,119.9 L408.6,119.8 L406.5,118.1 L404.3,117.9 L400.1,116.5 L397.4,116.4 L399.8,113.7 L400.0,111.8 L394.8,107.9 L393.3,107.3 L385.1,106.1 L382.3,104.2 L379.5,100.9 L378.9,100.5 L377.3,101.5 L375.2,101.0 L373.6,101.1 L371.1,102.6 L370.3,101.4 L370.6,100.2 L368.7,97.6 L368.1,95.4 L367.3,94.5 L365.0,93.7 L364.9,93.1 L366.5,90.9 L366.0,89.5 Z M414.6,90.4 L415.5,89.0 L416.6,89.1 L420.0,88.4 L420.7,89.4 L420.1,89.9 L420.6,91.9 L423.1,89.2 L425.1,89.9 L425.1,92.3 L424.1,93.2 L422.7,93.6 L422.1,92.2 L421.1,93.0 L421.1,95.3 L420.0,95.3 L418.9,94.4 L420.0,93.3 L419.5,90.7 L418.5,91.3 L417.1,93.8 L415.4,95.0 L414.4,92.9 Z",
      "cx": 396.1,
      "cy": 85.6
    },
    {
      "id": "ID.PA",
      "name": "Papua",
      "island": "Papua",
      "color": "#a21caf",
      "d": "M665.5,194.5 L665.3,195.4 L659.9,194.7 L660.0,193.7 L662.1,191.7 L664.4,191.8 L664.5,193.3 Z M663.3,170.3 L662.2,170.0 L661.3,167.9 L663.3,168.7 Z M603.4,85.0 L606.7,85.0 L605.8,85.6 L603.1,85.7 Z M600.0,78.7 L601.0,77.8 L600.5,79.6 L598.8,79.4 L597.9,78.1 L599.1,76.6 L600.4,77.6 Z M651.5,182.3 L655.1,179.8 L657.5,179.0 L661.2,178.4 L664.1,178.6 L666.3,181.4 L668.5,182.0 L667.1,184.6 L666.9,186.1 L665.3,187.7 L665.4,189.5 L663.0,191.2 L661.6,191.5 L660.7,192.9 L658.1,194.8 L655.6,195.4 L653.8,194.9 L648.5,194.6 L645.1,195.4 L645.1,194.8 L647.1,189.7 L647.8,189.2 L649.4,185.6 Z M622.0,91.1 L613.0,88.2 L609.2,87.9 L608.2,86.9 L609.1,86.5 L615.8,87.2 L620.5,87.1 L623.8,88.1 L628.8,88.0 L631.2,88.5 L631.6,89.3 L629.3,89.5 L628.0,90.4 L624.9,90.8 L623.0,90.3 Z M607.1,72.9 L607.6,71.8 L610.4,72.3 L611.6,72.1 L613.3,73.0 L614.4,72.1 L618.0,74.7 L620.2,77.7 L621.8,77.5 L623.1,78.0 L621.9,79.5 L619.5,80.3 L617.0,79.5 L615.6,79.9 L614.3,78.7 L613.4,75.0 L612.7,74.1 L611.5,75.3 L608.6,73.3 Z M596.9,106.7 L597.5,108.6 L598.6,108.9 L599.9,107.6 L599.4,111.4 L600.5,113.0 L601.8,112.9 L602.2,114.3 L607.6,115.1 L609.9,114.7 L612.5,111.7 L614.5,110.5 L614.2,110.0 L616.8,108.5 L617.5,105.1 L619.2,103.4 L622.3,101.5 L624.3,96.0 L630.0,96.3 L634.2,94.0 L637.5,93.2 L637.0,91.2 L635.3,90.3 L635.9,88.6 L639.2,87.3 L642.1,85.3 L646.3,83.3 L648.4,83.3 L650.9,85.2 L655.6,86.6 L660.7,87.7 L663.0,89.8 L668.1,91.1 L671.0,92.8 L680.8,96.6 L685.7,95.7 L686.5,96.9 L688.5,97.7 L689.4,96.8 L693.1,97.3 L695.4,98.3 L694.7,100.1 L699.3,99.8 L699.5,110.6 L700.0,139.7 L700.0,161.9 L699.6,164.3 L698.0,166.4 L697.8,167.9 L698.9,170.6 L699.9,171.2 L699.0,207.8 L697.1,206.8 L693.3,202.7 L691.6,199.8 L687.5,196.0 L683.9,193.2 L683.0,191.5 L684.2,189.9 L682.3,190.9 L677.4,191.1 L675.5,191.9 L672.9,192.2 L671.7,191.7 L670.8,190.1 L668.6,191.0 L665.7,193.6 L664.5,191.0 L665.9,190.1 L665.8,187.6 L667.1,186.6 L667.4,184.8 L668.8,181.7 L666.6,180.8 L665.5,178.4 L662.3,175.6 L665.8,175.8 L667.4,176.5 L669.9,176.5 L666.8,175.2 L663.5,174.4 L660.4,171.6 L660.6,170.7 L663.2,170.8 L666.3,170.0 L669.4,172.1 L667.4,170.1 L664.5,169.4 L662.1,167.5 L662.7,166.5 L658.7,162.8 L657.5,160.0 L657.1,157.7 L655.6,154.4 L657.3,153.9 L654.6,153.4 L653.7,152.6 L657.1,151.0 L654.9,151.1 L652.3,151.9 L652.4,146.9 L650.9,147.7 L649.8,146.4 L649.9,145.4 L648.3,146.0 L646.4,143.7 L644.3,143.1 L642.4,141.7 L641.5,141.8 L639.5,139.3 L638.5,140.4 L634.2,139.0 L634.1,138.3 L632.1,139.2 L624.5,135.3 L623.1,135.3 L619.4,133.9 L618.3,132.9 L614.4,132.5 L609.7,131.6 L606.5,132.2 L602.2,130.0 L600.8,129.0 L606.8,121.0 L590.7,115.8 L590.6,114.3 L591.8,112.4 L593.6,110.6 L593.5,109.8 Z",
      "cx": 644.3,
      "cy": 135.3
    },
    {
      "id": "ID.JR",
      "name": "Jawa Barat",
      "island": "Jawa",
      "color": "#d97706",
      "d": "M177.5,186.7 L178.0,184.4 L178.8,183.6 L177.6,182.4 L177.1,179.9 L177.2,177.6 L177.7,177.1 L180.3,177.6 L182.2,177.3 L182.1,176.3 L184.6,177.3 L185.3,175.1 L185.2,172.8 L185.9,170.3 L187.5,171.1 L190.5,170.9 L192.3,173.3 L194.6,173.8 L195.5,174.5 L197.4,173.7 L201.6,175.4 L203.2,174.6 L203.1,173.9 L205.5,174.0 L205.7,175.4 L207.0,176.8 L208.3,177.4 L209.5,181.3 L211.6,181.9 L213.8,181.8 L212.5,183.7 L212.4,185.5 L211.1,186.8 L209.4,187.2 L209.2,189.4 L210.9,189.8 L212.2,192.5 L212.1,193.5 L213.1,194.3 L211.9,194.4 L211.3,195.3 L209.4,195.0 L208.2,196.9 L206.4,197.0 L200.9,196.2 L199.6,196.4 L198.7,195.6 L196.9,195.3 L195.4,194.1 L192.7,193.1 L189.8,193.2 L188.2,192.8 L179.7,192.7 L177.8,192.4 L177.4,190.5 L179.6,187.5 L179.5,186.4 L178.2,186.1 Z",
      "cx": 195.5,
      "cy": 184.2
    },
    {
      "id": "ID.1024",
      "name": "Papua Barat",
      "island": "Papua",
      "color": "#d946ef",
      "d": "M134.4,158.9 L136.2,157.7 L136.6,157.1 L137.9,157.8 L138.5,158.9 L141.4,158.9 L143.2,158.0 L144.5,157.9 L145.0,156.7 L143.9,155.2 L144.4,154.0 L144.3,151.2 L147.4,149.3 L149.5,148.8 L151.9,147.5 L153.9,146.9 L155.8,144.9 L155.9,143.4 L157.9,142.2 L158.4,140.2 L161.5,141.7 L162.6,143.0 L163.0,144.3 L164.7,145.7 L166.4,145.7 L166.4,147.8 L167.9,150.2 L167.7,155.8 L168.3,157.1 L167.8,158.6 L168.0,161.8 L167.6,163.7 L167.8,167.6 L167.3,170.2 L166.6,171.3 L166.3,170.4 L164.6,170.1 L163.6,168.0 L162.7,168.0 L160.0,165.4 L159.1,165.3 L159.0,166.9 L158.2,167.2 L158.9,169.8 L157.5,170.2 L152.5,168.0 L151.2,166.8 L149.9,166.4 L148.6,167.5 L151.2,171.0 L151.7,172.6 L149.4,172.9 L149.0,171.6 L146.6,169.6 L145.3,169.0 L144.6,167.5 L142.3,166.2 L140.4,164.4 L140.5,163.6 L139.0,163.1 L139.1,161.9 L137.2,160.4 L135.1,159.8 Z",
      "cx": 153,
      "cy": 159.6
    },
    {
      "id": "ID.JK",
      "name": "DKI Jakarta",
      "island": "Jawa",
      "color": "#f59e0b",
      "d": "M181.4,172.7 L181.8,173.3 L185.2,172.8 L185.3,175.1 L184.6,177.3 L182.1,176.3 L181.1,175.0 L180.8,173.4 Z",
      "cx": 182.8,
      "cy": 174.5
    },
    {
      "id": "ID.GO",
      "name": "Gorontalo",
      "island": "Sulawesi",
      "color": "#a78bfa",
      "d": "M403.3,56.8 L403.9,57.1 L407.2,56.7 L409.7,57.4 L413.2,59.4 L414.2,58.7 L414.9,57.1 L416.8,57.5 L418.5,58.8 L419.2,60.3 L422.2,62.0 L423.3,64.6 L422.7,66.4 L419.4,66.4 L416.8,63.7 L415.4,64.2 L410.6,64.5 L405.7,64.6 L403.3,65.1 L401.4,65.0 L400.6,65.6 L397.9,66.0 L396.2,64.7 L393.8,64.6 L393.5,65.4 L390.9,65.9 L390.9,64.2 L389.7,64.1 L388.2,62.7 L389.3,62.1 L390.2,60.5 L391.3,60.0 L393.2,60.1 L398.1,58.0 L400.4,58.4 Z",
      "cx": 404.7,
      "cy": 62
    },
    {
      "id": "ID.YO",
      "name": "DI Yogyakarta",
      "island": "Jawa",
      "color": "#f59e0b",
      "d": "M243.3,200.4 L241.1,200.2 L237.9,199.4 L231.4,196.5 L232.6,193.4 L234.4,193.8 L236.9,191.4 L238.1,194.6 L240.8,195.0 L242.2,195.7 L242.6,199.3 Z",
      "cx": 238.3,
      "cy": 196.3
    },
    {
      "id": "ID.KT",
      "name": "Kalimantan Tengah",
      "island": "Kalimantan",
      "color": "#0ea5e9",
      "d": "M290.3,128.2 L289.6,127.7 L290.9,124.9 L289.3,127.2 L287.5,127.4 L287.4,125.2 L286.3,127.3 L284.1,128.5 L281.6,129.2 L280.4,129.1 L280.4,126.7 L280.0,125.1 L277.7,125.2 L276.1,126.6 L274.4,125.3 L273.5,123.9 L272.3,123.4 L271.2,121.7 L271.0,123.4 L270.1,124.7 L271.2,125.2 L265.5,129.3 L264.1,129.6 L262.1,128.3 L260.8,128.0 L258.1,129.1 L255.1,132.1 L253.9,131.7 L254.1,129.0 L253.5,126.6 L253.7,124.7 L252.1,121.1 L251.2,122.4 L251.7,123.1 L250.0,124.1 L247.9,123.0 L245.7,123.3 L242.4,125.3 L240.1,125.7 L237.8,125.0 L238.5,124.0 L240.7,122.8 L242.2,120.9 L243.2,120.4 L243.0,115.6 L240.9,111.7 L240.6,109.6 L240.9,106.1 L240.6,104.9 L239.2,104.3 L240.4,102.9 L242.2,102.9 L245.0,100.4 L246.2,98.9 L248.5,97.5 L249.4,95.0 L256.1,90.5 L259.9,90.6 L262.8,89.7 L268.9,86.7 L271.2,85.9 L272.6,87.0 L273.2,85.1 L272.4,84.2 L273.4,82.5 L274.9,81.6 L275.5,79.5 L275.1,77.8 L273.0,75.3 L274.4,74.8 L276.1,74.9 L277.4,74.1 L277.6,72.7 L279.4,70.4 L282.2,69.6 L283.2,68.9 L285.3,68.7 L288.2,69.5 L292.4,68.8 L293.4,68.0 L296.9,66.9 L298.2,68.3 L298.5,69.8 L297.1,72.3 L296.9,73.5 L298.0,76.7 L297.4,79.0 L298.0,80.2 L300.6,77.4 L302.9,77.3 L302.1,80.6 L302.1,81.9 L303.1,84.8 L303.9,85.8 L304.5,88.6 L305.3,90.2 L307.8,91.4 L309.5,93.1 L310.5,92.8 L310.6,95.9 L309.5,97.9 L308.9,97.9 L308.9,96.9 L305.2,98.2 L304.1,103.1 L304.5,105.1 L304.2,107.1 L301.4,109.7 L298.1,110.7 L298.3,113.0 L297.1,115.1 L296.7,117.0 L294.5,119.1 L292.7,120.0 L292.3,121.8 Z",
      "cx": 276,
      "cy": 103.7
    },
    {
      "id": "ID.SL",
      "name": "Sumatera Selatan",
      "island": "Sumatra",
      "color": "#15803d",
      "d": "M145.2,111.2 L144.6,113.4 L145.4,113.0 L146.9,113.9 L147.8,115.6 L149.0,114.9 L150.5,116.0 L150.6,117.2 L148.8,119.9 L148.5,123.4 L149.3,121.2 L150.8,119.0 L151.6,120.3 L152.6,119.6 L154.4,120.2 L155.6,119.6 L161.9,120.1 L161.8,122.3 L162.8,123.9 L164.4,124.2 L164.8,126.7 L166.1,127.9 L168.1,128.1 L168.8,129.2 L169.2,132.2 L167.2,134.0 L166.6,135.3 L165.9,138.6 L168.0,140.8 L166.9,143.4 L166.4,145.7 L164.7,145.7 L163.0,144.3 L162.6,143.0 L161.5,141.7 L158.4,140.2 L157.9,142.2 L155.9,143.4 L155.8,144.9 L153.9,146.9 L151.9,147.5 L149.5,148.8 L147.4,149.3 L144.3,151.2 L144.4,154.0 L143.9,155.2 L145.0,156.7 L144.5,157.9 L143.2,158.0 L141.4,158.9 L138.5,158.9 L137.9,157.8 L136.6,157.1 L134.2,152.8 L134.0,151.6 L127.5,149.4 L126.6,146.5 L124.2,146.5 L121.0,145.6 L118.8,143.6 L119.8,143.2 L122.6,140.6 L122.3,139.8 L124.0,139.8 L124.2,138.4 L123.5,137.1 L122.0,136.9 L120.3,135.5 L118.4,137.1 L115.8,135.4 L116.1,133.9 L115.2,133.0 L112.3,132.8 L112.0,131.2 L109.5,128.8 L111.9,127.2 L112.2,126.5 L115.1,127.7 L117.3,127.3 L120.1,125.0 L121.0,123.4 L120.9,121.8 L124.8,122.2 L126.0,121.6 L125.4,120.5 L126.0,119.0 L127.4,120.4 L129.8,122.0 L129.7,119.5 L131.0,118.9 L130.5,117.8 L130.6,115.5 L135.7,112.6 L139.2,113.0 L142.1,112.4 L143.6,110.7 Z",
      "cx": 140.7,
      "cy": 132.9
    },
    {
      "id": "ID.SR",
      "name": "Sulawesi Barat",
      "island": "Sulawesi",
      "color": "#6d28d9",
      "d": "M366.5,125.4 L363.6,124.6 L362.3,125.6 L359.7,126.0 L358.2,126.9 L356.8,123.8 L356.9,123.0 L355.5,120.0 L356.8,119.4 L357.1,116.6 L355.5,116.7 L355.2,115.4 L356.0,113.1 L357.4,113.4 L358.8,112.3 L360.6,110.2 L360.3,106.8 L361.4,103.9 L363.2,103.2 L363.5,101.1 L362.6,99.2 L362.8,97.4 L362.2,94.7 L362.6,94.2 L362.5,92.1 L364.3,90.3 L365.2,86.7 L365.7,86.3 L366.0,89.5 L366.5,90.9 L364.9,93.1 L365.0,93.7 L367.3,94.5 L368.1,95.4 L368.7,97.6 L370.6,100.2 L370.3,101.4 L371.1,102.6 L370.5,104.0 L367.9,106.0 L367.6,107.7 L368.9,108.6 L369.5,111.6 L370.3,113.5 L368.5,114.5 L366.4,114.6 L366.9,116.8 L368.4,119.9 L365.3,121.1 Z",
      "cx": 363.7,
      "cy": 107.5
    },
    {
      "id": "ID.JA",
      "name": "Jambi",
      "island": "Sumatra",
      "color": "#0d9488",
      "d": "M128.1,97.5 L128.2,98.5 L129.2,98.3 L131.4,100.3 L134.3,101.4 L136.0,100.5 L139.9,101.7 L142.3,101.0 L142.7,103.3 L143.5,104.9 L143.9,108.3 L145.2,111.2 L143.6,110.7 L142.1,112.4 L139.2,113.0 L135.7,112.6 L130.6,115.5 L130.5,117.8 L131.0,118.9 L129.7,119.5 L129.8,122.0 L127.4,120.4 L126.0,119.0 L125.4,120.5 L126.0,121.6 L124.8,122.2 L120.9,121.8 L121.0,123.4 L120.1,125.0 L117.3,127.3 L115.1,127.7 L112.2,126.5 L111.9,127.2 L109.5,128.8 L106.9,128.4 L104.4,127.0 L101.7,124.4 L100.8,122.3 L99.6,121.3 L98.1,122.3 L96.8,119.2 L94.9,116.9 L94.3,113.7 L96.0,113.9 L99.3,113.6 L102.5,110.2 L102.4,107.0 L104.1,106.2 L104.7,105.1 L103.8,104.6 L103.5,103.2 L105.2,102.6 L107.0,100.7 L109.6,100.2 L110.7,100.5 L112.2,102.3 L115.1,103.3 L117.0,100.5 L118.7,98.7 L120.4,98.2 L123.1,98.2 Z",
      "cx": 119.1,
      "cy": 112.2
    }
  ];
  
  const REAL_BALI_PATHS = [
    {
      "name": "Badung",
      "color": "#f87171",
      "d": "M467.1,122 L474.4,130.3 L476.5,137.6 L474.4,150.2 L475.6,164.6 L473.7,169.5 L474.4,176.5 L467.6,185.3 L465.4,198.3 L461,203.4 L463.1,222.2 L463.2,230.2 L465.8,237.9 L469.8,244.2 L471.5,250.3 L470.4,257.1 L470.6,263.1 L468,265 L466.6,270.2 L463.5,274.4 L465.1,280.6 L469.4,289.3 L474.2,301.5 L474.3,306.2 L471.4,312.9 L471,316.9 L469,316.3 L466.2,311.5 L461.2,312.2 L451.5,315.8 L442.8,322.1 L437.2,324.5 L437.5,333.5 L436.6,342.1 L434.8,351.2 L434.1,359.4 L435,362.9 L439.3,372.8 L441.6,382.4 L446.6,389.5 L441.2,393.1 L440,399.4 L438.3,401.8 L439.4,404.3 L442,404.5 L445.3,408.2 L445.2,411.1 L453.3,416.4 L458.1,416.6 L455.7,411.8 L457.5,408.6 L456.4,401.5 L460,399.1 L461.2,408.9 L462.7,415.5 L466.1,422.3 L468.9,422.7 L468,425.7 L457.2,442 L446.9,446.4 L435.2,449.9 L420.7,450 L409.6,448.9 L403.6,448.9 L388.7,444.1 L386.6,439.8 L387.1,435 L390,431 L397.1,429.8 L403.6,425.8 L404.5,421.1 L411.7,418.1 L417.6,413.2 L420.8,412.9 L428,414.3 L431.4,409.1 L432.1,403.2 L430.9,400.6 L426.9,397.8 L422.8,397.4 L422.8,395.7 L426.8,394.9 L427.4,390.8 L431.8,383.7 L430.3,374.4 L425.4,365.5 L421.9,361.8 L417.8,354.6 L410.6,349.1 L405.8,343.9 L397,340.4 L394.3,336.8 L397.6,332.5 L399.7,327.9 L408.6,323.2 L415.2,322.7 L420.6,317.4 L422.3,311.1 L422,302.9 L430.1,282.5 L432.8,272.8 L438.8,262.2 L439.6,259.2 L437.4,251 L437.5,244.7 L436.4,241.2 L437.6,238.4 L441.9,234.6 L446.4,235.8 L447.1,249.7 L445.3,254.3 L445.3,258.6 L447.2,259.3 L449.9,254.8 L450.4,248 L454.6,237.7 L456.8,229.9 L456,220.4 L456,211.1 L452,198.3 L449.5,192.8 L449.1,186.7 L451.9,177.4 L454.9,174.3 L455.9,170.9 L453.6,161.2 L449.7,151.6 L446.1,147.8 L444.2,143.2 L445.3,136.3 L444.8,132.3 L440.4,123.9 L445.4,123.5 L453.8,125.5 L463.3,124.2 L467.1,122 Z",
      "cx": 442.7,
      "cy": 306.4
    },
    {
      "name": "Bangli",
      "color": "#818cf8",
      "d": "M579.7,93.7 L583.2,97 L583.3,101.2 L580.6,108.3 L580.6,117.9 L586.1,127.1 L585.4,131 L579.2,136.5 L565.3,151.8 L562,155 L558.7,161.7 L560.9,172.3 L560.6,175.4 L556.3,183.9 L555.3,190 L556.7,196 L560.6,206.7 L565.1,216.4 L565.4,223.2 L564,228.5 L559.9,238.1 L556,244.7 L552,244 L542,246.3 L537.9,250.2 L535.9,256.4 L532.7,259.6 L529.9,266.9 L529.7,275.3 L528.9,275.4 L523.1,277 L519.1,274.1 L516.6,263.9 L515.9,256 L516.2,244.9 L512.9,225.7 L518.7,215.9 L520.5,207.6 L520,205.9 L522.2,197.4 L517.3,195.4 L515.7,193.1 L518.5,183.5 L517.9,176.7 L514.9,173.5 L511.8,173.3 L502.6,175.9 L501.1,175 L495.4,165.9 L491.2,166 L485.9,170 L482.8,170 L480.5,166.7 L475.6,164.6 L474.4,150.2 L476.5,137.6 L474.4,130.3 L467.1,122 L469.7,120.4 L471.9,115.7 L473.2,106.3 L472.4,92.6 L474.9,90.6 L482,88.3 L487.2,84.1 L491.8,83.5 L495.9,87.2 L499.8,87.8 L504.3,90 L511.8,84 L513.3,81.1 L513.8,75 L517.9,75.3 L518.9,81.3 L522.4,82 L529.5,79.4 L537.6,84.6 L548.7,83.4 L551.8,84.3 L560.2,90.6 L567.7,94.6 L571.5,95 L579.7,93.7 Z",
      "cx": 527.1,
      "cy": 160.5
    },
    {
      "name": "Buleleng",
      "color": "#38bdf8",
      "d": "M84.5,46.5 L89.1,46.4 L90.3,47.8 L84.3,50.7 L84.5,46.5 Z M587,87.7 L579.7,93.7 L571.5,95 L567.7,94.6 L560.2,90.6 L551.8,84.3 L548.7,83.4 L537.6,84.6 L529.5,79.4 L522.4,82 L518.9,81.3 L517.9,75.3 L513.8,75 L513.3,81.1 L511.8,84 L504.3,90 L499.8,87.8 L495.9,87.2 L491.8,83.5 L487.2,84.1 L482,88.3 L474.9,90.6 L472.4,92.6 L473.2,106.3 L471.9,115.7 L469.7,120.4 L467.1,122 L463.3,124.2 L453.8,125.5 L445.4,123.5 L440.4,123.9 L435.7,125.1 L430.7,132.8 L427,135.5 L416.9,137.5 L410.6,141.2 L408.7,146.8 L407.5,153.6 L403.2,159.7 L380,164.8 L370,162 L362.9,158.6 L352,160.7 L342.9,160.1 L335.3,155.8 L331.7,155.8 L323.9,159.1 L321.1,161.5 L318.7,168.1 L316.5,180.8 L313.6,184.9 L308.1,187.8 L302.8,195.8 L302.2,199 L297.1,199.5 L293,197.8 L283.7,189 L272.4,179.6 L262.2,177.2 L255.9,177.9 L251,177.2 L246.9,175 L242,167.7 L240.1,157.8 L238.7,139.2 L239.6,133.4 L238.6,131.3 L231.5,132.2 L224.8,131.7 L218.9,133.7 L212.6,130.4 L203.2,115.3 L198.6,112.4 L189.6,110.9 L179.1,105.2 L175.2,105 L172.9,108.3 L170.1,117.1 L166.4,117.9 L158.9,114.1 L147.9,110.7 L142.5,107.5 L136,102.1 L127,92.4 L123.1,90.5 L115.1,92.2 L109.8,96.1 L105.7,98 L101.7,98.2 L91.5,95.9 L87.4,97.4 L78.5,103.6 L72.6,103.2 L68,99 L60.4,94.4 L56.2,86.7 L56.1,84.8 L52.4,82.6 L47.7,82.8 L44.9,80.6 L45.9,73.6 L44.2,67.6 L38.5,60.8 L39.4,52 L42.5,47.5 L49.3,46.5 L65.5,48.5 L69,47.2 L71.9,48.7 L77.4,56 L81,59.2 L87,68.7 L87.2,70.6 L84,74.3 L84.7,78.2 L89.6,78.8 L98.7,71.4 L101.8,68 L108.3,66.5 L114.1,62.9 L119.4,60.8 L123.3,61.3 L125.5,63.2 L123.8,67.5 L125.5,71.2 L130.3,70.1 L135.1,67.1 L137.5,62.7 L139,64.5 L143.9,65.1 L149.4,70.6 L152,66.8 L157.5,73.2 L161.9,73 L167.4,75.8 L171.4,74.1 L177.1,73.8 L186.1,79.6 L200.1,82.2 L204.8,85.9 L211.8,87.2 L217.5,89.4 L224,89.8 L237.5,94.4 L239.5,96.1 L243.5,95.8 L247.7,99.7 L252,98 L255.3,100.3 L259.2,99.9 L267,101.9 L275,101.3 L283.8,97.6 L289.9,97.1 L291.9,94.4 L297.1,95.1 L304,93.6 L308.1,94.8 L331.8,93.7 L338.4,91.3 L341.7,91.2 L346,86 L351.2,85.1 L355.2,82.5 L357.2,78.9 L366.9,74.3 L368.4,71.2 L372.5,67.5 L376.2,62 L379.8,59.8 L383.6,54.8 L391.6,50.9 L404,40.6 L409.9,39.8 L415.4,36.2 L426.3,30.9 L441.6,30 L451.1,36.4 L454.9,37.1 L467.1,41.4 L471.8,41.4 L483.7,44.2 L488,47.8 L496.2,51.8 L502.1,53.4 L506.1,53.4 L513.7,57.3 L522.1,56.3 L530.8,64.5 L537.2,65.9 L544,68.8 L547.2,68.8 L557.4,73 L563.3,77.9 L574.1,79.8 L583.5,83.4 L587,87.7 Z",
      "cx": 291.7,
      "cy": 95.5
    },
    {
      "name": "Denpasar",
      "color": "#ec4899",
      "d": "M453,389.4 L456.6,392 L454.3,395.9 L451.4,394.9 L453,389.4 Z M446.6,389.5 L441.6,382.4 L439.3,372.8 L435,362.9 L434.1,359.4 L434.8,351.2 L436.6,342.1 L437.5,333.5 L437.2,324.5 L442.8,322.1 L451.5,315.8 L461.2,312.2 L466.2,311.5 L469,316.3 L471,316.9 L480.2,334.1 L482.2,336.2 L489.1,339 L492.4,341.5 L488.6,343.9 L483.4,348.7 L481,353.9 L483,358.2 L482.8,362.1 L484.3,367.1 L482.1,374.8 L476.3,377.5 L473,377.8 L462.2,382.5 L463.2,384.2 L468,382 L475.4,386 L473.6,389.8 L469.6,394 L462.4,393.5 L459.2,391 L460.4,384.5 L456,385.4 L453.8,388.3 L446.6,389.5 Z",
      "cx": 462.3,
      "cy": 363.1
    },
    {
      "name": "Gianyar",
      "color": "#a78bfa",
      "d": "M528.9,275.4 L531.8,275.3 L533.8,278.8 L534.3,283.9 L537.8,294.2 L539.2,304.4 L534.4,305.6 L529.4,309.1 L526.8,314.5 L518.9,318.3 L513.9,323.9 L505.6,328.3 L494.7,340.3 L492.4,341.5 L489.1,339 L482.2,336.2 L480.2,334.1 L471,316.9 L471.4,312.9 L474.3,306.2 L474.2,301.5 L469.4,289.3 L465.1,280.6 L463.5,274.4 L466.6,270.2 L468,265 L470.6,263.1 L470.4,257.1 L471.5,250.3 L469.8,244.2 L465.8,237.9 L463.2,230.2 L463.1,222.2 L461,203.4 L465.4,198.3 L467.6,185.3 L474.4,176.5 L473.7,169.5 L475.6,164.6 L480.5,166.7 L482.8,170 L485.9,170 L491.2,166 L495.4,165.9 L501.1,175 L502.6,175.9 L511.8,173.3 L514.9,173.5 L517.9,176.7 L518.5,183.5 L515.7,193.1 L517.3,195.4 L522.2,197.4 L520,205.9 L520.5,207.6 L518.7,215.9 L512.9,225.7 L516.2,244.9 L515.9,256 L516.6,263.9 L519.1,274.1 L523.1,277 L528.9,275.4 Z",
      "cx": 497.4,
      "cy": 248.4
    },
    {
      "name": "Jembrana",
      "color": "#34d399",
      "d": "M56.2,86.7 L60.4,94.4 L68,99 L72.6,103.2 L78.5,103.6 L87.4,97.4 L91.5,95.9 L101.7,98.2 L105.7,98 L109.8,96.1 L115.1,92.2 L123.1,90.5 L127,92.4 L136,102.1 L142.5,107.5 L147.9,110.7 L158.9,114.1 L166.4,117.9 L170.1,117.1 L172.9,108.3 L175.2,105 L179.1,105.2 L189.6,110.9 L198.6,112.4 L203.2,115.3 L212.6,130.4 L218.9,133.7 L224.8,131.7 L231.5,132.2 L238.6,131.3 L239.6,133.4 L238.7,139.2 L240.1,157.8 L242,167.7 L246.9,175 L251,177.2 L255.9,177.9 L262.2,177.2 L272.4,179.6 L283.7,189 L293,197.8 L297.1,199.5 L302.2,199 L306.6,204.6 L305.8,210.2 L302,215.1 L300.7,222.9 L300.7,230.5 L296,245.8 L290.7,242.7 L279.8,237.4 L277.8,237.4 L261.4,231.3 L255.1,229.7 L248.7,229.6 L244.3,227.2 L244.1,225.1 L238.2,221.9 L235.7,217.8 L213.2,211.3 L199.3,208.3 L178.6,208.6 L174.3,209.7 L158.2,212.1 L151.1,213.9 L140.2,214.7 L131.5,212.8 L122.6,211.6 L118,209.1 L118.4,207.6 L114.2,200.8 L104.9,191.8 L99.2,185.7 L98.5,182.2 L90.2,178.1 L84.9,172.6 L84.5,168.1 L85.5,163.7 L83.4,160.1 L78.2,156.3 L74.1,151.6 L68.6,147.5 L65.8,144 L63.4,137.6 L60.5,133.5 L58.1,127.9 L50.6,120.1 L47.3,114.4 L44.4,105.2 L42.3,96.1 L39.4,93.4 L38.1,89.2 L39.2,85.4 L42,84.5 L48,88.9 L51.1,88.9 L52.5,86.1 L56.2,86.7 Z",
      "cx": 160.7,
      "cy": 155
    },
    {
      "name": "Karangasem",
      "color": "#2dd4bf",
      "d": "M587,87.7 L592.8,92.6 L599.9,93.9 L602.6,97.5 L608.2,99.7 L612.2,105.5 L626,112.9 L629.7,115.5 L639.2,120.1 L642.8,124.4 L651.7,133.2 L656.7,140.4 L657.9,144 L664.3,148.8 L665.2,151.6 L671.8,157.2 L672.6,160.6 L677.9,170.2 L684,174.8 L691.9,175.6 L696.2,177.2 L698.2,179.4 L704.5,181.7 L706.4,184 L714.7,188.9 L716.6,194.1 L720.8,198.3 L721.9,210.7 L715.3,218 L712.5,223.9 L708.2,228.7 L699.7,234.9 L695.9,235.6 L691,239.5 L687.1,240.2 L680.1,243.9 L678.7,249.3 L671.4,255 L667.4,265.7 L657.8,269.4 L652.1,273.1 L650.4,271.6 L641,267.6 L631.8,266.8 L628.7,264.2 L620.4,265.8 L614.8,268.6 L612.5,274 L616.1,279.5 L613.4,281 L613.4,285.4 L597.4,291.7 L595.2,279.9 L594,270.7 L585.2,266.5 L577.7,269.5 L562.3,278 L555.6,277 L554.9,273.2 L556,269.6 L561.5,268.1 L562.7,266 L563,260.1 L561.8,254 L556.9,253.1 L550.2,254.8 L549.9,252.3 L556,244.7 L559.9,238.1 L564,228.5 L565.4,223.2 L565.1,216.4 L560.6,206.7 L556.7,196 L555.3,190 L556.3,183.9 L560.6,175.4 L560.9,172.3 L558.7,161.7 L562,155 L565.3,151.8 L579.2,136.5 L585.4,131 L586.1,127.1 L580.6,117.9 L580.6,108.3 L583.3,101.2 L583.2,97 L579.7,93.7 L587,87.7 Z",
      "cx": 620.6,
      "cy": 200.6
    },
    {
      "name": "Klungkung",
      "color": "#fb923c",
      "d": "M590.3,364 L587.6,369.5 L577.5,377.8 L574.7,375.1 L577.1,371 L580.7,369.7 L586.9,364.3 L590.3,364 Z M608.7,355.4 L616.7,358.2 L625.3,358.4 L633.1,357.2 L635.5,355.9 L641.1,355.6 L647.4,358.4 L651.7,363.9 L653.6,372.5 L656,376.5 L660,379.7 L659.8,382.5 L662.3,385.7 L667.9,389.8 L674.9,398.8 L675.1,403 L677.3,405.3 L677.5,409.7 L673.9,409.8 L669.8,415 L667.5,415.3 L664.4,422.4 L665.6,425.5 L661.6,427.8 L658.3,432.5 L652.7,432.8 L650,430.3 L645.4,430 L640.1,426.3 L638.7,426.8 L634.2,423.6 L624.6,422.1 L621.6,416.8 L614.9,410.7 L609.1,411.5 L607.3,408.4 L601.4,406.2 L601.1,402.9 L594.9,397.5 L588.6,395.6 L583.3,397.1 L582.1,394.7 L584.4,391.7 L581.8,388.9 L582.4,386 L580.2,382.4 L591.5,370.8 L597.7,362.8 L601.6,361.3 L602.5,357.8 L605.3,355.6 L608.7,355.4 Z M584.1,351 L592.8,353.2 L594.4,356.3 L592.4,359.4 L583.2,366.8 L579.5,367.9 L571.9,366.7 L569.2,361.6 L575.2,360.5 L579.9,358.4 L581.1,352.2 L584.1,351 Z M597.4,291.7 L592.5,291.8 L587.9,294.2 L582,300.4 L573.3,303.6 L567.4,304.5 L555,305.3 L549.4,304.1 L539.2,304.4 L537.8,294.2 L534.3,283.9 L533.8,278.8 L531.8,275.3 L528.9,275.4 L529.7,275.3 L529.9,266.9 L532.7,259.6 L535.9,256.4 L537.9,250.2 L542,246.3 L552,244 L556,244.7 L549.9,252.3 L550.2,254.8 L556.9,253.1 L561.8,254 L563,260.1 L562.7,266 L561.5,268.1 L556,269.6 L554.9,273.2 L555.6,277 L562.3,278 L577.7,269.5 L585.2,266.5 L594,270.7 L595.2,279.9 L597.4,291.7 Z",
      "cx": 597,
      "cy": 346.9
    },
    {
      "name": "Tabanan",
      "color": "#fbbf24",
      "d": "M394.3,336.8 L388,328.8 L386.4,322 L376.4,310.8 L362.1,298.6 L354.9,292.9 L347.7,288.4 L347.1,286.5 L340.5,284.3 L339,278.9 L332.7,272.5 L329.5,271.3 L326.5,267.3 L317.9,263 L311.3,255.6 L306.2,251.3 L296,245.8 L300.7,230.5 L300.7,222.9 L302,215.1 L305.8,210.2 L306.6,204.6 L302.2,199 L302.8,195.8 L308.1,187.8 L313.6,184.9 L316.5,180.8 L318.7,168.1 L321.1,161.5 L323.9,159.1 L331.7,155.8 L335.3,155.8 L342.9,160.1 L352,160.7 L362.9,158.6 L370,162 L380,164.8 L403.2,159.7 L407.5,153.6 L408.7,146.8 L410.6,141.2 L416.9,137.5 L427,135.5 L430.7,132.8 L435.7,125.1 L440.4,123.9 L444.8,132.3 L445.3,136.3 L444.2,143.2 L446.1,147.8 L449.7,151.6 L453.6,161.2 L455.9,170.9 L454.9,174.3 L451.9,177.4 L449.1,186.7 L449.5,192.8 L452,198.3 L456,211.1 L456,220.4 L456.8,229.9 L454.6,237.7 L450.4,248 L449.9,254.8 L447.2,259.3 L445.3,258.6 L445.3,254.3 L447.1,249.7 L446.4,235.8 L441.9,234.6 L437.6,238.4 L436.4,241.2 L437.5,244.7 L437.4,251 L439.6,259.2 L438.8,262.2 L432.8,272.8 L430.1,282.5 L422,302.9 L422.3,311.1 L420.6,317.4 L415.2,322.7 L408.6,323.2 L399.7,327.9 L397.6,332.5 L394.3,336.8 Z",
      "cx": 391.8,
      "cy": 223.8
    }
  ];
  

  // --- Source: js/engine/math-engine.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Reusable Mathematics Strategy Engine
  // Development · Anabhi Dev
  // Version   : 2.0 (Math Toolbox Master Blueprint)
  // Generated : 10 September 2026, 12:30:00
  // ================================================================
  
  class MathEngine {
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
        tensFrame
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
    // SMART STRATEGY RECOMMENDATION
    // -------------------------------------------------------------
    static recommendStrategies(a, b) {
      const recs = [];
      const modA = a % 10;
      const modB = b % 10;
  
      if (a <= 20 && b <= 20) {
        recs.push('tens-frame');
      }
  
      if (a + b === 100 || (a + b) % 100 === 0) {
        recs.push('make-hundred');
        recs.push('decomposition');
      }
  
      if (modA === 9 || modB === 9 || modA === 8 || modB === 8) {
        if (!recs.includes('compensation')) recs.push('compensation');
      }
  
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
  

  // --- Source: js/engine/geo-engine.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Geography Engine & 3D Desktop Globe
  // Development · Anabhi Dev
  // Version   : 1.2
  // Generated : 10 September 2026, 21:30:00
  // ================================================================
  
  
  
  
  class GeoEngine {
    // Ambil semua negara di dunia
    static getAllCountries() {
      return GEO_DATA.countries || [];
    }
  
    // Filter negara berdasarkan benua
    static getCountriesByContinent(continent) {
      const list = GEO_DATA.countries || [];
      if (!continent || continent === 'Semua' || continent === 'All') return list;
      return list.filter(c => c.continent.toLowerCase() === continent.toLowerCase());
    }
  
    // Cari negara berdasarkan nama (ID & EN), ibukota, benua, mata uang, atau landmark
    static searchCountries(query) {
      const list = GEO_DATA.countries || [];
      if (!query) return list;
      const q = query.trim().toLowerCase();
      return list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.nameEn.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q) ||
        c.currency.toLowerCase().includes(q) ||
        c.landmark.toLowerCase().includes(q)
      );
    }
  
    // Ambil negara berdasarkan id
    static getCountryById(id) {
      return (GEO_DATA.countries || []).find(c => c.id === id);
    }
  
    // Ambil semua provinsi
    static getAllProvinces() {
      return GEO_DATA.provinces || [];
    }
  
    // Filter provinsi berdasarkan pulau
    static getProvincesByIsland(islandName) {
      if (!islandName || islandName === 'Semua') return GEO_DATA.provinces;
      return GEO_DATA.provinces.filter(p => p.island.toLowerCase().includes(islandName.toLowerCase()));
    }
  
    // Cari provinsi atau ibu kota
    static searchProvinces(query) {
      if (!query) return GEO_DATA.provinces;
      const q = query.trim().toLowerCase();
      return GEO_DATA.provinces.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.capital.toLowerCase().includes(q) ||
        p.island.toLowerCase().includes(q)
      );
    }
  
    // Ambil data kota non-ibu kota terkenal (termasuk Malang -> Jatim)
    static getNonCapitalCities(query = '') {
      const list = GEO_DATA.famousNonCapitalCities || [];
      if (!query) return list;
      const q = query.trim().toLowerCase();
      return list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.province.toLowerCase().includes(q) ||
        c.island.toLowerCase().includes(q)
      );
    }
  
    // Ambil data modul Bali (8 Kabupaten + 1 Kota)
    static getBaliRegions() {
      return (GEO_DATA.baliModule && GEO_DATA.baliModule.regions) || [];
    }
  
    // Ambil data kuis geografi
    static getQuizzes() {
      return GEO_DATA.quizzes || [];
    }
  }
  
  /**
   * 3D Desktop Globe Visualizer (Classic Schoolroom Desk Globe Stand & Political Map)
   * Menampilkan bola bumi politik 3D berwarna-warni sesuai referensi foto globe meja fisik:
   * - Peta politik dunia: negara-negara penuh warna pastel cerah, batas tegas, nama negara & samudra jelas.
   * - Kerangka dudukan meja mewah: Busur meridian logam berskala derajat (0°-90°), poros miring 23.5°,
   *   tiang vertikal krom, dan kaki penyangga bundar berkilau dengan bayangan realistis.
   * - Rotasi 3D halus 60fps dengan kontrol sentuh/geser, tombol putar, zoom, dan fokus instan.
   */
  class GlobeVisualizer {
    constructor(canvasElement, overlayElement = null) {
      this.canvas = canvasElement;
      this.overlayCanvas = overlayElement;
      this.ctx = null;
      this.overlayCtx = null;
      this.gl = null;
      this.useWebGL = false;
  
      // Parameter Rotasi & Posisi Bola
      this.rotation = 118;   // Derajat bujur — default menghadap ke Indonesia (118° BT)
      this.tilt = 6;         // Derajat lintang pandangan kamera
      this.axialTilt = 23.5; // Kemiringan sumbu bumi asli 23.5 derajat
      this.zoom = 1.0;       // Rentang zoom 0.8x s/d 2.0x
      this.isRotating = true;
      this.animId = null;
  
      // Target Animasi Halus (Lerp ke koordinat tujuan)
      this.targetRotation = null;
      this.targetTilt = null;
      this.focusedLocation = { lon: 118, lat: -2, name: 'INDONESIA 🇮🇩' };
  
      // Status Pointer (Mouse / Touch Tablet)
      this.pointerDown = false;
      this.lastX = 0;
      this.lastY = 0;
      this.pulseAngle = 0;
  
      // Aset Tekstur Peta Politik Dunia
      this.textureLoaded = false;
      this.offscreenCanvas = null;
      this.earthImage = null;
  
      this.initRenderer();
      this.initEvents();
    }
  
    initRenderer() {
      if (!this.canvas) return;
  
      if (this.overlayCanvas && typeof this.overlayCanvas.getContext === 'function') {
        this.overlayCtx = this.overlayCanvas.getContext('2d');
      }
  
      // Siapkan offscreen canvas 2048x1024 untuk tekstur
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenCanvas.width = 2048;
      this.offscreenCanvas.height = 1024;
      this.drawProceduralPoliticalTexture(this.offscreenCanvas);
      this.textureLoaded = true;
  
      // Coba inisialisasi WebGL
      try {
        this.gl = this.canvas.getContext('webgl', { antialias: true, alpha: true, premultipliedAlpha: false }) ||
                  this.canvas.getContext('experimental-webgl');
      } catch (e) {
        this.gl = null;
      }
  
      if (this.gl) {
        this.initWebGL();
      } else if (typeof this.canvas.getContext === 'function') {
        this.ctx = this.canvas.getContext('2d');
      }
  
      // Muat peta politik SVG beresolusi tinggi bila lingkungan mengizinkan
      this.loadPoliticalMapSvg();
    }
  
    // Menghasilkan tekstur peta dunia politik lengkap (177 negara + samudra + garis lintang bujur + pin Indonesia)
    drawProceduralPoliticalTexture(canvas) {
      const ctx = canvas.getContext('2d');
      const W = canvas.width;
      const H = canvas.height;
  
      // 1. Latar Samudra Biru Cerah Meja Sekolah (sesuai referensi fisik)
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, H);
      oceanGrad.addColorStop(0, '#1a78b5');
      oceanGrad.addColorStop(0.35, '#2192cf');
      oceanGrad.addColorStop(0.5, '#28a9e0');
      oceanGrad.addColorStop(0.65, '#2192cf');
      oceanGrad.addColorStop(1, '#1a78b5');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, W, H);
  
      // 2. Garis Lintang & Bujur (Graticules Halus)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      for (let lat = -75; lat <= 75; lat += 15) {
        const y = ((90 - lat) / 180) * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      for (let lon = -180; lon <= 180; lon += 30) {
        const x = ((lon + 180) / 360) * W;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
  
      // 3. Garis Khatulistiwa (Ekuator) Emas Tegas
      const eqY = H / 2;
      ctx.strokeStyle = '#f5cd79';
      ctx.lineWidth = 3;
      ctx.setLineDash([10, 6]);
      ctx.beginPath();
      ctx.moveTo(0, eqY);
      ctx.lineTo(W, eqY);
      ctx.stroke();
      ctx.setLineDash([]);
  
      // 4. Render Semua 177 Negara Dunia secara Vektor Instan (Path2D)
      if (typeof Path2D !== 'undefined' && Array.isArray(GLOBE_COUNTRIES)) {
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = '#1e293b';
        ctx.lineJoin = 'round';
        for (let i = 0; i < GLOBE_COUNTRIES.length; i++) {
          const country = GLOBE_COUNTRIES[i];
          try {
            const path = new Path2D(country.d);
            ctx.fillStyle = country.fill || '#55efc4';
            ctx.fill(path);
            ctx.stroke(path);
          } catch (e) {}
        }
      }
  
      // 5. Highlight Khusus Wilayah Indonesia (Zamrud Cerah & Batas Putih Tegas)
      const indo = (GLOBE_COUNTRIES || []).find(c => c.name === 'Indonesia');
      if (indo && typeof Path2D !== 'undefined') {
        try {
          const indoPath = new Path2D(indo.d);
          ctx.save();
          ctx.fillStyle = '#10ac84';
          ctx.fill(indoPath);
          ctx.lineWidth = 2.2;
          ctx.strokeStyle = '#ffffff';
          ctx.stroke(indoPath);
          ctx.restore();
        } catch (e) {}
      }
  
      // 6. Label Khatulistiwa & Samudra Dunia
      ctx.font = 'bold 15px Arial, sans-serif';
      ctx.fillStyle = '#fed330';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EQUATOR / KHATULISTIWA (0°)', 500, eqY - 8);
      ctx.fillText('EQUATOR / KHATULISTIWA (0°)', 1500, eqY - 8);
  
      // 7. Label Teks Negara & Samudra (Teks Bergaris Tepi Gelap agar Kontras Tinggi)
      if (Array.isArray(GLOBE_LABELS)) {
        for (let i = 0; i < GLOBE_LABELS.length; i++) {
          const lbl = GLOBE_LABELS[i];
          if (!lbl || lbl.text.includes('EQUATOR')) continue;
  
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
  
          if (lbl.text.includes('OCEAN')) {
            // Label Samudra
            ctx.font = `italic bold ${lbl.size || 22}px Arial, sans-serif`;
            ctx.fillStyle = lbl.fill || 'rgba(255,255,255,0.75)';
            ctx.strokeStyle = 'rgba(10, 50, 90, 0.75)';
            ctx.lineWidth = 3.5;
            ctx.strokeText(lbl.text, lbl.x, lbl.y);
            ctx.fillText(lbl.text, lbl.x, lbl.y);
          } else if (lbl.text.includes('INDONESIA')) {
            // Pin Marker & Badge Indonesia
            ctx.beginPath();
            ctx.arc(1715.7, 523.6, 7, 0, Math.PI * 2);
            ctx.fillStyle = '#ff4757';
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#ffffff';
            ctx.stroke();
  
            // Kotak Badge
            ctx.fillStyle = 'rgba(15, 32, 67, 0.92)';
            ctx.strokeStyle = '#55efc4';
            ctx.lineWidth = 2;
            ctx.beginPath();
            if (typeof ctx.roundRect === 'function') {
              ctx.roundRect(lbl.x - 72, lbl.y - 12, 144, 24, 12);
            } else {
              ctx.rect(lbl.x - 72, lbl.y - 12, 144, 24);
            }
            ctx.fill();
            ctx.stroke();
  
            ctx.fillStyle = '#55efc4';
            ctx.font = 'bold 13px Arial, sans-serif';
            ctx.fillText('INDONESIA 🇮🇩', lbl.x, lbl.y);
          } else {
            // Nama Negara Terkemuka
            ctx.font = `bold ${lbl.size || 13}px Arial, sans-serif`;
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#1e293b';
            ctx.lineWidth = 3;
            ctx.strokeText(lbl.text, lbl.x, lbl.y);
            ctx.fillText(lbl.text, lbl.x, lbl.y);
          }
          ctx.restore();
        }
      }
    }
  
    loadPoliticalMapSvg() {
      try {
        this.earthImage = new Image();
        this.earthImage.onload = () => {
          try {
            if (this.offscreenCanvas) {
              const octx = this.offscreenCanvas.getContext('2d');
              octx.drawImage(this.earthImage, 0, 0, 2048, 1024);
            }
            if (this.gl && this.earthTexture) {
              const gl = this.gl;
              gl.bindTexture(gl.TEXTURE_2D, this.earthTexture);
              gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offscreenCanvas);
              gl.generateMipmap(gl.TEXTURE_2D);
            }
            this.textureLoaded = true;
            this.draw();
          } catch (e) {
            // Tekstur vektor canvas sudah aktif dan sempurna
          }
        };
        this.earthImage.onerror = () => {
          // Tekstur vektor canvas sudah aktif dan sempurna
        };
        this.earthImage.src = 'assets/img/earth_political.svg';
      } catch (e) {}
    }
  
    initWebGL() {
      const gl = this.gl;
      this.useWebGL = true;
  
      // Vertex Shader
      const vsSource = `
        attribute vec3 aPos;
        attribute vec2 aUV;
        uniform mat4 uMVP;
        varying vec2 vUV;
        varying vec3 vNorm;
        void main() {
          vUV = aUV;
          vNorm = aPos;
          gl_Position = uMVP * vec4(aPos, 1.0);
        }
      `;
  
      // Fragment Shader: Pencahayaan terang alami globe meja kelas (warna negara cerah & specular terkontrol)
      const fsSource = `
        precision mediump float;
        uniform sampler2D uSampler;
        uniform vec3 uSunDir;
        varying vec2 vUV;
        varying vec3 vNorm;
        void main() {
          vec4 tex = texture2D(uSampler, vUV);
          vec3 n = normalize(vNorm);
          float diff = max(dot(n, uSunDir), 0.0);
          float light = clamp(0.72 + 0.28 * diff, 0.0, 1.0); // Terang jelas, tidak pernah saturasi putih
          
          // Pantulan kilap halus terkontrol (anti-bleach / anti-white bug saat zoom)
          vec3 halfDir = normalize(uSunDir + vec3(0.0, 0.0, 1.0));
          float spec = pow(max(dot(n, halfDir), 0.0), 36.0) * 0.18;
          
          gl_FragColor = vec4(clamp(tex.rgb * light + vec3(spec), 0.0, 1.0), 1.0);
        }
      `;
  
      const program = this.createShaderProgram(gl, vsSource, fsSource);
      if (!program) {
        this.useWebGL = false;
        this.ctx = this.canvas.getContext('2d');
        this.textureLoaded = true;
        return;
      }
  
      this.program = program;
      this.attribs = {
        pos: gl.getAttribLocation(program, 'aPos'),
        uv: gl.getAttribLocation(program, 'aUV')
      };
      this.uniforms = {
        mvp: gl.getUniformLocation(program, 'uMVP'),
        sampler: gl.getUniformLocation(program, 'uSampler'),
        sunDir: gl.getUniformLocation(program, 'uSunDir')
      };
  
      // Geometri Bola Sferis UV
      this.createSphereMesh(gl, 1.0, 48, 48);
  
      // Buat Tekstur WebGL dari Offscreen Canvas
      this.earthTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.earthTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.offscreenCanvas);
      try {
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      } catch (e) {
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      }
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  
      gl.enable(gl.DEPTH_TEST);
      gl.depthFunc(gl.LEQUAL);
      gl.clearColor(0.0, 0.0, 0.0, 0.0);
    }
  
    createShaderProgram(gl, vs, fs) {
      const vShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vShader, vs);
      gl.compileShader(vShader);
      if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
        console.warn('[WebGL] Vertex shader error:', gl.getShaderInfoLog(vShader));
        return null;
      }
  
      const fShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fShader, fs);
      gl.compileShader(fShader);
      if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
        console.warn('[WebGL] Fragment shader error:', gl.getShaderInfoLog(fShader));
        return null;
      }
  
      const prog = gl.createProgram();
      gl.attachShader(prog, vShader);
      gl.attachShader(prog, fShader);
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
        console.warn('[WebGL] Link error:', gl.getProgramInfoLog(prog));
        return null;
      }
      return prog;
    }
  
    createSphereMesh(gl, radius, latBands, lonBands) {
      const positions = [];
      const uvs = [];
      const indices = [];
  
      for (let lat = 0; lat <= latBands; lat++) {
        const theta = (lat * Math.PI) / latBands;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
  
        for (let lon = 0; lon <= lonBands; lon++) {
          const phi = (lon * 2 * Math.PI) / lonBands;
          const sinPhi = Math.sin(phi);
          const cosPhi = Math.cos(phi);
  
          const x = cosPhi * sinTheta;
          const y = cosTheta;
          const z = sinPhi * sinTheta;
          const u = 1 - (lon / lonBands);
          const v = lat / latBands;
  
          positions.push(radius * x, radius * y, radius * z);
          uvs.push(u, v);
        }
      }
  
      for (let lat = 0; lat < latBands; lat++) {
        for (let lon = 0; lon < lonBands; lon++) {
          const first = lat * (lonBands + 1) + lon;
          const second = first + lonBands + 1;
          indices.push(first, second, first + 1);
          indices.push(second, second + 1, first + 1);
        }
      }
  
      this.posBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
      this.uvBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uvs), gl.STATIC_DRAW);
  
      this.indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  
      this.indexCount = indices.length;
    }
  
    initEvents() {
      const target = this.canvas;
      if (!target) return;
  
      const activePointers = new Map();
      let initialPinchDist = 0;
      let initialZoom = 1.0;
  
      target.addEventListener('pointerdown', (e) => {
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        this.isRotating = false;
        this.targetRotation = null;
        this.targetTilt = null;
  
        if (activePointers.size === 1) {
          this.pointerDown = true;
          this.lastX = e.clientX;
          this.lastY = e.clientY;
        } else if (activePointers.size === 2) {
          // Mulai gestur cubit (pinch zoom)
          this.pointerDown = false;
          const pts = Array.from(activePointers.values());
          initialPinchDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          initialZoom = this.zoom;
        }
  
        if (typeof target.setPointerCapture === 'function') {
          target.setPointerCapture(e.pointerId);
        }
      });
  
      window.addEventListener('pointermove', (e) => {
        if (!activePointers.has(e.pointerId)) return;
        activePointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  
        if (activePointers.size === 2) {
          // Multi-touch pinch zoom
          const pts = Array.from(activePointers.values());
          const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
          if (initialPinchDist > 5) {
            const ratio = currentDist / initialPinchDist;
            this.zoom = Math.max(0.9, Math.min(2.0, initialZoom * ratio));
            this.draw();
          }
        } else if (this.pointerDown && activePointers.size === 1) {
          // 1-finger / mouse rotate
          const dx = e.clientX - this.lastX;
          const dy = e.clientY - this.lastY;
          this.rotation += dx * 0.45;
          this.tilt = Math.max(-45, Math.min(45, this.tilt - dy * 0.35));
          this.lastX = e.clientX;
          this.lastY = e.clientY;
          this.draw();
        }
      });
  
      const onPointerEnd = (e) => {
        activePointers.delete(e.pointerId);
        if (activePointers.size === 0) {
          this.pointerDown = false;
        } else if (activePointers.size === 1) {
          const remaining = Array.from(activePointers.values())[0];
          this.lastX = remaining.x;
          this.lastY = remaining.y;
          this.pointerDown = true;
        }
      };
  
      window.addEventListener('pointerup', onPointerEnd);
      window.addEventListener('pointercancel', onPointerEnd);
  
      target.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.08 : -0.08;
        this.zoomBy(delta);
      }, { passive: false });
    }
  
    startLoop() {
      const render = () => {
        if (this.isRotating) {
          this.rotation += 0.25;
        }
  
        // Animasi pergerakan halus (Lerp)
        if (this.targetRotation !== null) {
          const diffR = this.targetRotation - this.rotation;
          this.rotation += diffR * 0.1;
          if (Math.abs(diffR) < 0.2) {
            this.rotation = this.targetRotation;
            this.targetRotation = null;
          }
        }
        if (this.targetTilt !== null) {
          const diffT = this.targetTilt - this.tilt;
          this.tilt += diffT * 0.1;
          if (Math.abs(diffT) < 0.2) {
            this.tilt = this.targetTilt;
            this.targetTilt = null;
          }
        }
  
        this.pulseAngle = (this.pulseAngle + 0.05) % (Math.PI * 2);
  
        this.draw();
        this.animId = requestAnimationFrame(render);
      };
      render();
    }
  
    stopLoop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }
  
    toggleAutoRotate() {
      this.isRotating = !this.isRotating;
      this.targetRotation = null;
      return this.isRotating;
    }
  
    rotateBy(deltaDeg) {
      this.rotation += deltaDeg;
      this.targetRotation = null;
      this.draw();
    }
  
    zoomBy(delta) {
      this.zoom = Math.max(0.9, Math.min(2.0, this.zoom + delta));
      this.draw();
    }
  
    focusCoordinates(lon, lat, name = null) {
      this.isRotating = false;
      const normCurrent = ((this.rotation % 360) + 360) % 360;
      const target = lon;
      let diff = target - normCurrent;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
  
      this.targetRotation = this.rotation + diff;
      this.targetTilt = Math.max(-30, Math.min(30, lat));
      this.zoom = Math.max(1.15, this.zoom);
      if (name) {
        this.focusedLocation = { lon, lat, name };
      }
    }
  
    focusIndonesia() {
      this.focusCoordinates(118, -2, 'INDONESIA 🇮🇩');
    }
  
    draw() {
      if (this.useWebGL && this.gl) {
        this.drawWebGL();
      } else {
        this.draw2D();
      }
      this.drawOverlay();
    }
  
    drawWebGL() {
      const gl = this.gl;
      const canvas = this.canvas;
      const w = canvas.width;
      const h = canvas.height;
  
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  
      gl.useProgram(this.program);
  
      // Matriks Proyeksi Perspektif (Near 0.01 mencegah bug clipping putih saat zoom)
      const fov = 45 * Math.PI / 180;
      const aspect = w / h;
      const pMat = this.createPerspectiveMatrix(fov, aspect, 0.01, 100.0);
  
      // Jarak kamera disesuaikan dengan posisi globe meja yang lebih besar (diameter ~440px di kanvas 720)
      const dist = 3.65 / this.zoom;
      let mvMat = this.createIdentityMatrix();
      mvMat = this.mat4Translate(mvMat, 0.08, 0.18, -dist);
      // Kemiringan pandangan pengguna (pitch)
      mvMat = this.mat4RotateX(mvMat, this.tilt * Math.PI / 180);
      // Kemiringan sumbu bumi asli 23.5° (tilted ke kanan seperti foto referensi)
      mvMat = this.mat4RotateZ(mvMat, -this.axialTilt * Math.PI / 180);
      // Rotasi bola bumi pada porosnya (yaw)
      mvMat = this.mat4RotateY(mvMat, this.rotation * Math.PI / 180);
  
      const mvpMat = this.mat4Multiply(pMat, mvMat);
      gl.uniformMatrix4fv(this.uniforms.mvp, false, new Float32Array(mvpMat));
  
      // Arah cahaya dari kanan-atas depan
      gl.uniform3f(this.uniforms.sunDir, 0.75, 0.45, 1.25);
  
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.earthTexture);
      gl.uniform1i(this.uniforms.sampler, 0);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
      gl.enableVertexAttribArray(this.attribs.pos);
      gl.vertexAttribPointer(this.attribs.pos, 3, gl.FLOAT, false, 0, 0);
  
      gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
      gl.enableVertexAttribArray(this.attribs.uv);
      gl.vertexAttribPointer(this.attribs.uv, 2, gl.FLOAT, false, 0, 0);
  
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
      gl.drawElements(gl.TRIANGLES, this.indexCount, gl.UNSIGNED_SHORT, 0);
    }
  
    draw2D() {
      const canvas = this.canvas;
      if (!canvas || !this.ctx) return;
      const ctx = this.ctx;
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2 + 18;
      const cy = h / 2 - 35;
      const r = 210 * this.zoom;
  
      ctx.clearRect(0, 0, w, h);
  
      // Bola Samudra
      const ocean = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.1, cx, cy, r);
      ocean.addColorStop(0, '#28a9e0');
      ocean.addColorStop(0.7, '#2192cf');
      ocean.addColorStop(1, '#156596');
  
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = ocean;
      ctx.fill();
      ctx.clip();
  
      // Gambar tekstur jika siap dengan wrap-around aman anti-blank
      if (this.offscreenCanvas) {
        const rotNorm = ((this.rotation % 360) + 360) % 360;
        const tw = this.offscreenCanvas.width;
        const th = this.offscreenCanvas.height;
        const sx = (rotNorm / 360) * tw;
        const sw = tw * 0.5;
  
        const part1W = Math.min(sw, tw - sx);
        const destPart1W = (part1W / sw) * (r * 2);
        ctx.drawImage(this.offscreenCanvas, sx, 0, part1W, th, cx - r, cy - r, destPart1W, r * 2);
  
        if (part1W < sw) {
          const part2W = sw - part1W;
          const destPart2W = (part2W / sw) * (r * 2);
          ctx.drawImage(this.offscreenCanvas, 0, 0, part2W, th, cx - r + destPart1W, cy - r, destPart2W, r * 2);
        }
      }
  
      // Shading 3D
      const shade = ctx.createRadialGradient(cx - r * 0.35, cy - r * 0.35, r * 0.15, cx, cy, r);
      shade.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      shade.addColorStop(0.65, 'rgba(0, 0, 0, 0)');
      shade.addColorStop(1, 'rgba(10, 35, 60, 0.6)');
      ctx.fillStyle = shade;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
  
      ctx.restore();
    }
  
    /**
     * Menggambar Kerangka Dudukan Globe Meja Klasik (Desk Stand) & Busur Meridian Berskala
     * Persis seperti foto referensi meja sekolah fisik (images2):
     * - Busur meridian perak krom di sisi kiri dengan angka derajat lintang 0° - 90°
     * - Pin kutub atas & bawah pada kemiringan 23.5°
     * - Tiang penyangga silinder krom vertikal
     * - Piringan kaki penyangga bertingkat (tiered pedestal base) dengan kilau logam & bayangan meja
     */
    drawOverlay() {
      const overlay = this.overlayCanvas;
      if (!overlay || !this.overlayCtx) return;
      const ctx = this.overlayCtx;
      const w = overlay.width;
      const h = overlay.height;
  
      ctx.clearRect(0, 0, w, h);
  
      // Koordinat pusat bola bumi pada panggung (ukuran besar)
      const cx = w / 2 + 18;
      const cy = h / 2 - 35;
      const r = 212 * this.zoom;
  
      // Sudut kemiringan sumbu bumi asli 23.5°
      const tiltAngle = this.axialTilt * Math.PI / 180;
      const sinA = Math.sin(tiltAngle);
      const cosA = Math.cos(tiltAngle);
  
      // Titik Kutub Utara & Kutub Selatan pada permukaan bola
      const northX = cx + r * sinA;
      const northY = cy - r * cosA;
      const southX = cx - r * sinA;
      const southY = cy + r * cosA;
  
      // Radius busur meridian logam (sedikit di luar bola)
      const rArch = r + 28;
      const archThick = 20;
  
      // -------------------------------------------------------------
      // 1. Bayangan Dudukan Meja (Tabletop Shadow)
      // -------------------------------------------------------------
      const baseCenterX = cx;
      const baseCenterY = h - 68;
      const shadowGrad = ctx.createRadialGradient(baseCenterX, baseCenterY + 14, 25, baseCenterX, baseCenterY + 14, 200);
      shadowGrad.addColorStop(0, 'rgba(3, 10, 20, 0.55)');
      shadowGrad.addColorStop(0.5, 'rgba(5, 15, 30, 0.25)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(baseCenterX, baseCenterY + 14, 200, 28, 0, 0, Math.PI * 2);
      ctx.fill();
  
      // -------------------------------------------------------------
      // 2. Kaki Penyangga Bundar Bertingkat (Chrome Tiered Pedestal Base)
      // -------------------------------------------------------------
      // Piringan Bawah Terlebar
      const baseW = 168;
      const baseH = 26;
      const baseGrad1 = ctx.createLinearGradient(baseCenterX - baseW, baseCenterY, baseCenterX + baseW, baseCenterY);
      baseGrad1.addColorStop(0, '#475569');
      baseGrad1.addColorStop(0.2, '#94a3b8');
      baseGrad1.addColorStop(0.45, '#ffffff');
      baseGrad1.addColorStop(0.7, '#cbd5e1');
      baseGrad1.addColorStop(0.9, '#64748b');
      baseGrad1.addColorStop(1, '#334155');
  
      ctx.fillStyle = baseGrad1;
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.ellipse(baseCenterX, baseCenterY, baseW, baseH, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  
      // Piringan Tingkat Kedua (Tengah)
      const baseGrad2 = ctx.createLinearGradient(baseCenterX - baseW * 0.82, baseCenterY - 12, baseCenterX + baseW * 0.82, baseCenterY - 12);
      baseGrad2.addColorStop(0, '#334155');
      baseGrad2.addColorStop(0.25, '#cbd5e1');
      baseGrad2.addColorStop(0.5, '#ffffff');
      baseGrad2.addColorStop(0.75, '#94a3b8');
      baseGrad2.addColorStop(1, '#475569');
  
      ctx.fillStyle = baseGrad2;
      ctx.beginPath();
      ctx.ellipse(baseCenterX, baseCenterY - 12, baseW * 0.82, baseH * 0.8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  
      // Kerucut Penopang (Conical Neck)
      const neckGrad = ctx.createLinearGradient(baseCenterX - 50, baseCenterY - 30, baseCenterX + 50, baseCenterY - 30);
      neckGrad.addColorStop(0, '#475569');
      neckGrad.addColorStop(0.3, '#ffffff');
      neckGrad.addColorStop(0.7, '#94a3b8');
      neckGrad.addColorStop(1, '#334155');
  
      ctx.fillStyle = neckGrad;
      ctx.beginPath();
      ctx.moveTo(baseCenterX - 55, baseCenterY - 10);
      ctx.lineTo(baseCenterX - 22, baseCenterY - 45);
      ctx.lineTo(baseCenterX + 22, baseCenterY - 45);
      ctx.lineTo(baseCenterX + 55, baseCenterY - 10);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  
      // Tiang Silinder Krom Vertikal (Vertical Spindle)
      const stemGrad = ctx.createLinearGradient(baseCenterX - 14, 0, baseCenterX + 14, 0);
      stemGrad.addColorStop(0, '#334155');
      stemGrad.addColorStop(0.3, '#f8fafc');
      stemGrad.addColorStop(0.7, '#cbd5e1');
      stemGrad.addColorStop(1, '#475569');
  
      ctx.fillStyle = stemGrad;
      ctx.beginPath();
      ctx.rect(baseCenterX - 14, baseCenterY - 95, 28, 52);
      ctx.fill();
      ctx.stroke();
  
      // Cincin Sambungan Bawah (Lower Collar)
      ctx.fillStyle = '#cbd5e1';
      ctx.beginPath();
      ctx.ellipse(baseCenterX, baseCenterY - 45, 26, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  
      // -------------------------------------------------------------
      // 3. Lengan Sambungan ke Busur Meridian (Lower Arm Bracket)
      // -------------------------------------------------------------
      ctx.fillStyle = stemGrad;
      ctx.beginPath();
      ctx.moveTo(baseCenterX - 14, baseCenterY - 95);
      ctx.quadraticCurveTo(baseCenterX - 25, baseCenterY - 105, southX - 18 * sinA, southY + 18 * cosA + 10);
      ctx.lineTo(southX - 34 * sinA, southY + 34 * cosA + 15);
      ctx.quadraticCurveTo(baseCenterX + 10, baseCenterY - 90, baseCenterX + 14, baseCenterY - 95);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
  
      // -------------------------------------------------------------
      // 4. Busur Meridian Logam Berskala (Calibrated Semi-Meridian Arch)
      // -------------------------------------------------------------
      // Busur membentang dari kutub utara ke kutub selatan di sisi kiri bola
      const startAngle = -Math.PI / 2 + tiltAngle;
      const endAngle = Math.PI / 2 + tiltAngle;
  
      ctx.save();
      // Gradien Logam Krom Busur
      const archGrad = ctx.createLinearGradient(cx - rArch, cy, cx, cy);
      archGrad.addColorStop(0, '#94a3b8');
      archGrad.addColorStop(0.35, '#ffffff');
      archGrad.addColorStop(0.75, '#cbd5e1');
      archGrad.addColorStop(1, '#64748b');
  
      // Badan Utama Busur (Tebal 18px)
      ctx.strokeStyle = archGrad;
      ctx.lineWidth = archThick;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.arc(cx, cy, rArch, startAngle, endAngle, false);
      ctx.stroke();
  
      // Garis Batas Luar & Dalam (Bevel Rims)
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, rArch - archThick / 2, startAngle, endAngle, false);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy, rArch + archThick / 2, startAngle, endAngle, false);
      ctx.stroke();
  
      // Garis Kilap Putih Spekular
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, rArch - 2, startAngle + 0.1, endAngle - 0.1, false);
      ctx.stroke();
  
      // Tanda Skala Derajat Lintang (0° hingga 90° Utara & Selatan)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.2;
      ctx.font = 'bold 8.5px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
  
      for (let deg = -90; deg <= 90; deg += 10) {
        const a = (deg * Math.PI / 180) + tiltAngle + Math.PI;
        const cosT = Math.cos(a);
        const sinT = Math.sin(a);
  
        const xInner = cx + (rArch - archThick / 2) * cosT;
        const yInner = cy + (rArch - archThick / 2) * sinT;
        const isMajor = deg % 30 === 0;
        const tickLen = isMajor ? archThick * 0.7 : archThick * 0.45;
        const xOuter = cx + (rArch - archThick / 2 + tickLen) * cosT;
        const yOuter = cy + (rArch - archThick / 2 + tickLen) * sinT;
  
        ctx.beginPath();
        ctx.moveTo(xInner, yInner);
        ctx.lineTo(xOuter, yOuter);
        ctx.stroke();
  
        // Angka derajat pada garis utama
        if (isMajor && Math.abs(deg) !== 90) {
          const xText = cx + (rArch + 4) * cosT;
          const yText = cy + (rArch + 4) * sinT;
          ctx.save();
          ctx.translate(xText, yText);
          ctx.rotate(a + Math.PI / 2);
          ctx.fillText(`${Math.abs(deg)}°`, 0, 0);
          ctx.restore();
        }
      }
      ctx.restore();
  
      // -------------------------------------------------------------
      // 5. Pin & Baut Kutub Atas dan Bawah (North & South Pole Finials)
      // -------------------------------------------------------------
      // Pin Kutub Utara
      const pinLen = 28;
      const nPinStartX = cx + (r - 4) * sinA;
      const nPinStartY = cy - (r - 4) * cosA;
      const nPinEndX = cx + (rArch + 12) * sinA;
      const nPinEndY = cy - (rArch + 12) * cosA;
  
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(nPinStartX, nPinStartY);
      ctx.lineTo(nPinEndX, nPinEndY);
      ctx.stroke();
  
      // Baut Krom Kutub Utara
      ctx.fillStyle = '#f8fafc';
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(nPinEndX, nPinEndY, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  
      // Pin Kutub Selatan
      const sPinStartX = cx - (r - 4) * sinA;
      const sPinStartY = cy + (r - 4) * cosA;
      const sPinEndX = cx - (rArch + 12) * sinA;
      const sPinEndY = cy + (rArch + 12) * cosA;
  
      ctx.strokeStyle = '#475569';
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(sPinStartX, sPinStartY);
      ctx.lineTo(sPinEndX, sPinEndY);
      ctx.stroke();
  
      // Baut Krom Kutub Selatan
      ctx.beginPath();
      ctx.arc(sPinEndX, sPinEndY, 7.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
  
      // -------------------------------------------------------------
      // 6. Penanda Lokasi Aktif / Fokus (Radar Pulse & Label)
      // -------------------------------------------------------------
      if (this.focusedLocation) {
        const coord = this.project3DPoint(this.focusedLocation.lon, this.focusedLocation.lat, r, cx, cy);
        if (coord && coord.isFront) {
          const px = coord.x;
          const py = coord.y;
  
          // Gelombang Radar Emas
          const pulseR = 12 + Math.sin(this.pulseAngle) * 6;
          ctx.strokeStyle = `rgba(255, 178, 27, ${0.45 + Math.sin(this.pulseAngle) * 0.35})`;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(px, py, pulseR, 0, Math.PI * 2);
          ctx.stroke();
  
          // Pin Emas Merah
          ctx.fillStyle = '#ffb21b';
          ctx.beginPath();
          ctx.arc(px, py, 7, 0, Math.PI * 2);
          ctx.fill();
  
          ctx.fillStyle = '#e53e3e';
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fill();
  
          // Kartu Label Lokasi Mengambang
          const labelText = this.focusedLocation.name;
          const labelW = 164;
          const labelH = 38;
          const labelX = px + 12;
          const labelY = py - labelH / 2;
  
          ctx.fillStyle = 'rgba(15, 32, 67, 0.92)';
          ctx.strokeStyle = '#55efc4';
          ctx.lineWidth = 1.5;
          this.drawRoundedRect(ctx, labelX, labelY, labelW, labelH, 10);
          ctx.fill();
          ctx.stroke();
  
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 12px Arial, sans-serif';
          ctx.textAlign = 'left';
          ctx.textBaseline = 'middle';
          ctx.fillText(labelText, labelX + 12, labelY + 14);
  
          ctx.fillStyle = '#55efc4';
          ctx.font = 'bold 9.5px Arial, sans-serif';
          ctx.fillText(`${this.focusedLocation.lat >= 0 ? this.focusedLocation.lat + '° LU' : Math.abs(this.focusedLocation.lat) + '° LS'}, ${this.focusedLocation.lon}° BT`, labelX + 12, labelY + 27);
        }
      }
    }
  
    project3DPoint(lonDeg, latDeg, radius, cx, cy) {
      const DEG2RAD = Math.PI / 180;
      const phi = latDeg * DEG2RAD;
      const theta = lonDeg * DEG2RAD;
  
      const x0 = Math.cos(phi) * Math.sin(theta);
      const y0 = Math.sin(phi);
      const z0 = Math.cos(phi) * Math.cos(theta);
  
      // 1. Rotasi bujur (Yaw)
      const rotY = this.rotation * DEG2RAD;
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x0 * cosY - z0 * sinY;
      const y1 = y0;
      const z1 = x0 * sinY + z0 * cosY;
  
      // 2. Kemiringan sumbu bumi asli 23.5°
      const rotZ = -this.axialTilt * DEG2RAD;
      const cosZ = Math.cos(rotZ);
      const sinZ = Math.sin(rotZ);
      const x2 = x1 * cosZ - y1 * sinZ;
      const y2 = x1 * sinZ + y1 * cosZ;
      const z2 = z1;
  
      // 3. Kemiringan pandangan (Pitch)
      const rotX = this.tilt * DEG2RAD;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const x3 = x2;
      const y3 = y2 * cosX - z2 * sinX;
      const z3 = y2 * sinX + z2 * cosX;
  
      return {
        x: cx + x3 * radius,
        y: cy - y3 * radius,
        z: z3,
        isFront: z3 > 0.05
      };
    }
  
    drawRoundedRect(ctx, x, y, width, height, radius) {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    }
  
    // Matriks Pembantu 4x4 (Standar Column-Major WebGL)
    createIdentityMatrix() {
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];
    }
  
    createPerspectiveMatrix(fovRad, aspect, near, far) {
      const f = 1.0 / Math.tan(fovRad / 2);
      const nf = 1 / (near - far);
      return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) * nf, -1,
        0, 0, 2 * far * near * nf, 0
      ];
    }
  
    mat4Multiply(a, b) {
      const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
      const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
      const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
      const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  
      const out = new Array(16);
      let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
      out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  
      b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
      out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  
      b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
      out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  
      b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
      out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
      out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
      out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
      out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
      return out;
    }
  
    mat4Translate(m, x, y, z) {
      const out = m.slice();
      out[12] = m[0] * x + m[4] * y + m[8] * z + m[12];
      out[13] = m[1] * x + m[5] * y + m[9] * z + m[13];
      out[14] = m[2] * x + m[6] * y + m[10] * z + m[14];
      out[15] = m[3] * x + m[7] * y + m[11] * z + m[15];
      return out;
    }
  
    mat4RotateX(m, rad) {
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
      const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
      const out = m.slice();
      out[4] = a10 * c + a20 * s;
      out[5] = a11 * c + a21 * s;
      out[6] = a12 * c + a22 * s;
      out[7] = a13 * c + a23 * s;
      out[8] = a20 * c - a10 * s;
      out[9] = a21 * c - a11 * s;
      out[10] = a22 * c - a12 * s;
      out[11] = a23 * c - a13 * s;
      return out;
    }
  
    mat4RotateY(m, rad) {
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
      const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
      const out = m.slice();
      out[0] = a00 * c - a20 * s;
      out[1] = a01 * c - a21 * s;
      out[2] = a02 * c - a22 * s;
      out[3] = a03 * c - a23 * s;
      out[8] = a00 * s + a20 * c;
      out[9] = a01 * s + a21 * c;
      out[10] = a02 * s + a22 * c;
      out[11] = a03 * s + a23 * c;
      return out;
    }
  
    mat4RotateZ(m, rad) {
      const s = Math.sin(rad);
      const c = Math.cos(rad);
      const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
      const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
      const out = m.slice();
      out[0] = a00 * c + a10 * s;
      out[1] = a01 * c + a11 * s;
      out[2] = a02 * c + a12 * s;
      out[3] = a03 * c + a13 * s;
      out[4] = a10 * c - a00 * s;
      out[5] = a11 * c - a01 * s;
      out[6] = a12 * c - a02 * s;
      out[7] = a13 * c - a03 * s;
      return out;
    }
  }
  

  // --- Source: js/components/ai-modal.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · AI Tutor Modal Component
  // Development · Anabhi Dev
  // Version   : 2.3 (Gemini 1.5 Flash Cloudflare & Local Key Support)
  // ================================================================
  
  
  
  
  class AiTutorModalComponent {
    constructor() {
      this.modalEl = null;
      this.messages = [];
      this.isLoading = false;
      this.initModal();
    }
  
    initModal() {
      let el = document.getElementById('aiTutorModal');
      if (!el) {
        el = document.createElement('div');
        el.id = 'aiTutorModal';
        el.className = 'video-modal-overlay';
        el.style.display = 'none';
        document.body.appendChild(el);
      }
      this.modalEl = el;
      this.attachOverlayClose();
    }
  
    attachOverlayClose() {
      this.modalEl.addEventListener('click', (e) => {
        if (e.target === this.modalEl) {
          this.close();
        }
      });
    }
  
    open(initialPrompt = '') {
      this.render();
      this.modalEl.style.display = 'flex';
      document.body.style.overflow = 'hidden';
  
      if (initialPrompt && initialPrompt.trim()) {
        this.sendQuestion(initialPrompt.trim());
      }
    }
  
    close() {
      this.modalEl.style.display = 'none';
      document.body.style.overflow = '';
    }
  
    getApiKey() {
      return localStorage.getItem('anabhi_gemini_api_key') || '';
    }
  
    setApiKey(key) {
      if (key && key.trim()) {
        localStorage.setItem('anabhi_gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('anabhi_gemini_api_key');
      }
    }
  
    async sendQuestion(questionText) {
      if (!questionText || this.isLoading) return;
  
      const state = appState.get();
      const currentSub = state.currentSubjectId || 'Umum';
  
      this.messages.push({ role: 'user', text: questionText });
      this.isLoading = true;
      this.render();
  
      try {
        let reply = '';
        const localKey = this.getApiKey();
  
        // Coba panggil Cloudflare Pages Function /api/ai-tutor bila ada atau bila tanpa local key
        if (!localKey && (window.location.protocol === 'http:' || window.location.protocol === 'https:')) {
          try {
            const cfResp = await fetch('/api/ai-tutor', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                prompt: questionText,
                subject: currentSub,
                studentGrade: 'Kelas 1 SD'
              })
            });
            if (cfResp.ok) {
              const data = await cfResp.json();
              reply = data.reply;
            }
          } catch (e) {
            // Cloudflare endpoint not available or local testing
          }
        }
  
        // Jika belum terjawab dan ada localKey, panggil langsung Google Gemini API
        if (!reply && localKey) {
          const sysMsg = 'Kamu adalah Kakak Belajar Pintar dari Anabhi Dev Smart Study untuk siswa SD. Berikan penjelasan yang ramah, santun, ceria, edukatif dengan analogi sederhana. JANGAN langsung membocorkan jawaban soal ujian, melainkan pandu langkah berpikirnya. Mata pelajaran: ' + currentSub;
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${localKey}`;
          
          const gResp = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { role: 'user', parts: [{ text: `${sysMsg}\n\nPertanyaan Anak: "${questionText}"` }] }
              ],
              generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
            })
          });
  
          if (gResp.ok) {
            const gData = await gResp.json();
            reply = gData.candidates?.[0]?.content?.parts?.[0]?.text;
          } else {
            const errText = await gResp.text();
            throw new Error('Gemini API Error: ' + errText);
          }
        }
  
        if (!reply) {
          reply = `Halo Sahabat Juara! 🌟 Untuk mengaktifkan Kakak Belajar AI:
  1. **Di Cloudflare Pages**: Tambahkan Environment Variable 'GEMINI_API_KEY' di Cloudflare Dashboard (Settings ➔ Environment variables).
  2. **Di Komputer Lokal**: Klik tombol ⚙️ Pengaturan di pojok atas dialog ini dan masukkan Gemini API Key milikmu.
  
  Kakak siap membantu menjelaskan materi pelajaran apa saja!`;
        }
  
        this.messages.push({ role: 'ai', text: reply });
      } catch (err) {
        this.messages.push({
          role: 'ai',
          text: 'Wah, terjadi kendala saat menghubungi AI: ' + err.message + '. Silakan periksa koneksi internet atau Gemini API Key.'
        });
      } finally {
        this.isLoading = false;
        this.render();
        const chatBox = this.modalEl.querySelector('#aiChatHistory');
        if (chatBox) chatBox.scrollTop = chatBox.scrollHeight;
      }
    }
  
    render() {
      const state = appState.get();
      const lang = state.lang || 'id';
      const isEn = lang === 'en';
      const apiKey = this.getApiKey();
  
      this.modalEl.innerHTML = `
        <div class="video-modal-dialog" style="max-width:680px; width:92%; max-height:88vh; display:flex; flex-direction:column; padding:0; overflow:hidden; border-radius:24px; border:2px solid var(--teal);">
          <!-- Modal Header -->
          <div style="background:var(--navy); color:#fff; padding:18px 24px; display:flex; justify-content:space-between; align-items:center;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:26px;">🤖</span>
              <div>
                <h3 style="margin:0; font-size:17px; font-weight:850; color:#fff;">
                  ${isEn ? 'Smart AI Tutor — Ask Anything!' : 'Kakak Belajar Pintar — Tanya Seputar Pelajaran'}
                </h3>
                <span style="font-size:11.5px; opacity:0.85;">Powered by Google Gemini · Anabhi Dev Smart Study</span>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="iconbtn" id="btnAiSettingsToggle" type="button" title="Pengaturan API Key" style="background:rgba(255,255,255,0.15); color:#fff; border-radius:10px; width:34px; height:34px;">⚙️</button>
              <button class="btn-close-modal" id="btnAiClose" type="button" aria-label="Tutup" style="color:#fff; font-size:22px; width:34px; height:34px; border:none; background:transparent; cursor:pointer;">✕</button>
            </div>
          </div>
  
          <!-- Panel Pengaturan API Key (Tersembunyi secara default) -->
          <div id="aiSettingsPanel" style="display:none; background:var(--surface); border-bottom:1px solid var(--line); padding:16px 24px;">
            <h4 style="margin:0 0 6px; font-size:13px; font-weight:800; color:var(--ink);">🔑 Pengaturan Gemini API Key</h4>
            <p style="margin:0 0 10px; font-size:12px; color:var(--muted); line-height:1.5;">
              Di Cloudflare Pages, kunci aman disimpan di <strong>Environment Variables (GEMINI_API_KEY)</strong>. Untuk testing di komputer lokal, Kakak bisa memasukkan API Key di bawah:
            </p>
            <div style="display:flex; gap:8px;">
              <input type="password" id="inputLocalGeminiKey" placeholder="Tempel AIzaSy... API Key di sini" value="${apiKey}" style="flex:1; padding:8px 12px; border-radius:10px; border:1px solid var(--line); font-size:12.5px; background:var(--card); color:var(--ink);">
              <button class="btn primary" id="btnSaveLocalKey" type="button" style="padding:6px 14px; font-size:12px;">Simpan Kunci</button>
            </div>
          </div>
  
          <!-- Chat History -->
          <div id="aiChatHistory" style="flex:1; overflow-y:auto; padding:20px 24px; display:flex; flex-direction:column; gap:16px; min-height:240px; max-height:420px; background:var(--card);">
            ${this.messages.length === 0 ? `
              <div style="text-align:center; padding:30px 10px; color:var(--muted);">
                <span style="font-size:42px; display:block; margin-bottom:12px;">🌟</span>
                <strong style="display:block; font-size:16px; color:var(--ink); margin-bottom:6px;">
                  ${isEn ? 'Hello! What do you want to learn today?' : 'Halo Sobat Juara! Mau tanya apa hari ini?'}
                </strong>
                <p style="font-size:13px; margin:0 0 16px; line-height:1.6;">
                  ${isEn ? 'I can explain math tricks, nature wonders, history, or help guide your homework step by step!' : 'Kakak AI siap membimbingmu memahami cara cepat berhitung, mengenal rahasia alam bumi, cerita rakyat, dan konsep pelajaran!'}
                </p>
  
                <!-- Quick starter chips -->
                <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px;">
                  <button class="region-chip starter-q-chip" data-q="Jelasin dong kak trik berhitung cepat 67 + 59!" type="button" style="font-size:12px;">
                    🧮 Trik 67 + 59
                  </button>
                  <button class="region-chip starter-q-chip" data-q="Kenapa bumi berbentuk bola dan tampak biru dari luar angkasa?" type="button" style="font-size:12px;">
                    🌍 Kenapa Bumi Bulat?
                  </button>
                  <button class="region-chip starter-q-chip" data-q="Apa saja tradisi unik dan tempat terkenal di Pulau Bali?" type="button" style="font-size:12px;">
                    🏝️ Budaya Pulau Bali
                  </button>
                  <button class="region-chip starter-q-chip" data-q="Bagaimana cara menyusun kalimat S-P-O yang benar?" type="button" style="font-size:12px;">
                    📖 Pola Kalimat S-P-O
                  </button>
                </div>
              </div>
            ` : ''}
  
            ${this.messages.map(m => `
              <div style="display:flex; gap:10px; align-items:flex-start; ${m.role === 'user' ? 'justify-content:flex-end;' : 'justify-content:flex-start;'}">
                ${m.role === 'ai' ? '<span style="font-size:24px;">🤖</span>' : ''}
                <div style="max-width:82%; padding:12px 16px; border-radius:18px; font-size:13.5px; line-height:1.65; ${
                  m.role === 'user' 
                    ? 'background:var(--teal); color:#071a2b; font-weight:600; border-bottom-right-radius:4px;' 
                    : 'background:var(--surface); color:var(--ink); border:1px solid var(--line); border-bottom-left-radius:4px; white-space:pre-wrap;'
                }">
                  ${m.text}
                </div>
                ${m.role === 'user' ? '<span style="font-size:24px;">🧒</span>' : ''}
              </div>
            `).join('')}
  
            ${this.isLoading ? `
              <div style="display:flex; gap:10px; align-items:center;">
                <span style="font-size:24px;">🤖</span>
                <div style="background:var(--surface); border:1px solid var(--line); border-radius:18px; padding:10px 18px; font-size:13px; color:var(--muted);">
                  ✨ Kakak AI sedang merangkai penjelasan ceria...
                </div>
              </div>
            ` : ''}
          </div>
  
          <!-- Chat Input Bar -->
          <div style="padding:14px 20px; background:var(--surface); border-top:1px solid var(--line); display:flex; gap:10px; align-items:center;">
            <input type="text" id="aiUserInput" placeholder="${isEn ? 'Ask a question about your lesson...' : 'Ketik pertanyaan belajarmu di sini...'}" style="flex:1; padding:10px 16px; border-radius:14px; border:1px solid var(--line); font-size:13.5px; background:var(--card); color:var(--ink);">
            <button class="btn primary" id="btnAiSend" type="button" style="padding:10px 18px; font-weight:800; font-size:13px;">
              ${isEn ? 'Send 🚀' : 'Kirim 🚀'}
            </button>
          </div>
        </div>
      `;
  
      this.attachEvents();
    }
  
    attachEvents() {
      const btnClose = this.modalEl.querySelector('#btnAiClose');
      if (btnClose) btnClose.addEventListener('click', () => this.close());
  
      const btnSettings = this.modalEl.querySelector('#btnAiSettingsToggle');
      const settingsPanel = this.modalEl.querySelector('#aiSettingsPanel');
      if (btnSettings && settingsPanel) {
        btnSettings.addEventListener('click', () => {
          settingsPanel.style.display = settingsPanel.style.display === 'none' ? 'block' : 'none';
        });
      }
  
      const btnSaveKey = this.modalEl.querySelector('#btnSaveLocalKey');
      const inputKey = this.modalEl.querySelector('#inputLocalGeminiKey');
      if (btnSaveKey && inputKey) {
        btnSaveKey.addEventListener('click', () => {
          this.setApiKey(inputKey.value);
          alert('Kunci Gemini API berhasil disimpan!');
          settingsPanel.style.display = 'none';
        });
      }
  
      const btnSend = this.modalEl.querySelector('#btnAiSend');
      const inputUser = this.modalEl.querySelector('#aiUserInput');
      const doSend = () => {
        if (inputUser && inputUser.value.trim()) {
          const q = inputUser.value.trim();
          inputUser.value = '';
          this.sendQuestion(q);
        }
      };
  
      if (btnSend) btnSend.addEventListener('click', doSend);
      if (inputUser) {
        inputUser.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') doSend();
        });
      }
  
      const starterChips = this.modalEl.querySelectorAll('.starter-q-chip');
      starterChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const q = chip.getAttribute('data-q');
          this.sendQuestion(q);
        });
      });
    }
  }
  

  // --- Source: js/components/topbar.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Topbar & Install Prompt Handler
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 11:05:00
  // ================================================================
  
  
  
  
  
  class TopbarComponent {
    constructor(container) {
      this.container = container;
      this.deferredPrompt = null;
      this.isStandalone = false;
  
      this.checkStandalone();
      this.initInstallPromptListener();
    }
  
    checkStandalone() {
      this.isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          window.navigator.standalone === true;
    }
  
    initInstallPromptListener() {
      // SOP 1.9 Kategori 18.6: DILARANG preventDefault() agar native Chrome pop-up tetap aktif!
      window.addEventListener('beforeinstallprompt', (e) => {
        this.deferredPrompt = e;
        this.render(); // Render ulang agar tombol Install di UI terlihat
      });
  
      window.addEventListener('appinstalled', () => {
        this.deferredPrompt = null;
        this.isStandalone = true;
        this.render();
        console.log('[PWA] Aplikasi Smart Study berhasil diinstall!');
      });
    }
  
    render() {
      const s = store.data;
      const state = appState.get();
      const lang = state.lang || 'id';
      const currentTheme = state.theme || 'light';
      const showInstallBtn = !this.isStandalone && this.deferredPrompt !== null;
  
      this.container.innerHTML = `
        <div class="topbar-left">
          <button class="iconbtn" id="menuBtn" type="button" aria-label="Buka menu navigasi drawer" aria-expanded="false" aria-controls="sidebar">
            ☰
          </button>
          <div class="hdr-title" id="topbarBrandBtn" title="Kembali ke Beranda" style="cursor:pointer;">
            <span class="app-name">Smart Study</span>
            <span class="grade-badge">${t('gradeBadge', lang)}</span>
            <span id="runMode" class="run-mode-badge" style="font-size:11px; opacity:0.75; font-weight:600; margin-left:4px;">${this.isStandalone ? '· aplikasi' : '· browser'}</span>
          </div>
        </div>
  
        <div class="topbar-right">
          <!-- Bintang Belajar -->
          <div class="stat-pill" title="${t('starsTitle', lang)}">
            <span class="icon">⭐</span>
            <span id="starCount">${s.stars || 0}</span>
          </div>
  
          <!-- Streak Harian -->
          <div class="stat-pill" title="${t('streakTitle', lang)}">
            <span class="icon">🔥</span>
            <span id="streakCount">${s.streakDays || 1} ${t('days', lang)}</span>
          </div>
  
          <!-- Tombol Tanya AI Tutor (Gemini) -->
          <button class="iconbtn" id="aiTutorBtn" type="button" aria-label="Tanya AI Tutor" title="Tanya AI Tutor (Gemini)" style="background:linear-gradient(135deg, #0ea5e9, #6366f1); color:#fff; border-radius:12px; padding:0 10px; width:auto; font-size:12px; font-weight:800; display:flex; align-items:center; gap:5px; border:none; cursor:pointer;">
            <span>🤖</span> <span>Tanya AI</span>
          </button>
  
          <!-- Tombol Ganti Bahasa ID / EN (Default: ID) -->
          <button class="iconbtn" id="langToggleBtn" type="button" aria-label="${t('langSwitch', lang)}" title="${t('langSwitch', lang)}" style="font-size:12px; font-weight:800; padding:0 10px; width:auto; min-width:44px;">
            ${lang === 'id' ? '🌐 ID' : '🌐 EN'}
          </button>
  
          <!-- Toggle Tema Terang/Gelap (Default: Light) -->
          <button class="iconbtn" id="themeToggleBtn" type="button" aria-label="${currentTheme === 'dark' ? t('themeLight', lang) : t('themeDark', lang)}" title="${currentTheme === 'dark' ? t('themeLight', lang) : t('themeDark', lang)}">
            ${currentTheme === 'dark' ? '☀️' : '🌙'}
          </button>
  
          <!-- Tombol Install PWA (SOP 1.9 Kategori 18) -->
          ${showInstallBtn ? `
            <button class="btn-pwa-install" id="pwaInstallBtn" type="button" title="${t('installTitle', lang)}">
              <span>📲</span> ${t('installApp', lang)}
            </button>
          ` : ''}
        </div>
      `;
  
      this.attachEvents();
    }
  
    attachEvents() {
      const aiTutorBtn = this.container.querySelector('#aiTutorBtn');
      if (aiTutorBtn) {
        aiTutorBtn.addEventListener('click', () => {
          if (window.aiTutorModal) {
            window.aiTutorModal.open();
          }
        });
      }
  
      const brandBtn = this.container.querySelector('#topbarBrandBtn');
      if (brandBtn) {
        brandBtn.addEventListener('click', () => {
          appState.navigate('home');
        });
      }
  
      const menuBtn = this.container.querySelector('#menuBtn');
      if (menuBtn) {
        menuBtn.addEventListener('click', () => {
          appState.toggleDrawer();
        });
      }
  
      const themeBtn = this.container.querySelector('#themeToggleBtn');
      if (themeBtn) {
        themeBtn.addEventListener('click', () => {
          appState.toggleTheme();
        });
      }
  
      const langBtn = this.container.querySelector('#langToggleBtn');
      if (langBtn) {
        langBtn.addEventListener('click', () => {
          appState.toggleLang();
        });
      }
  
      const installBtn = this.container.querySelector('#pwaInstallBtn');
      if (installBtn && this.deferredPrompt) {
        installBtn.addEventListener('click', async () => {
          try {
            await this.deferredPrompt.prompt();
            const { outcome } = await this.deferredPrompt.userChoice;
            if (outcome === 'accepted') {
              this.deferredPrompt = null;
              this.render();
            }
          } catch (err) {
            console.warn('[PWA] Prompt install mungkin sudah digunakan oleh native banner:', err);
          }
        });
      }
    }
  }
  

  // --- Source: js/components/sidebar.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Collapsible Sidebar & Mobile Drawer
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 11:08:00
  // ================================================================
  
  
  
  
  
  class SidebarComponent {
    constructor(sidebarElement, scrimElement, shellElement) {
      this.sidebar = sidebarElement;
      this.scrim = scrimElement;
      this.shell = shellElement;
  
      this.initKeyboardEvents();
    }
  
    initKeyboardEvents() {
      window.addEventListener('keydown', (e) => {
        // Tombol Esc menutup mobile drawer (SOP Kategori 14)
        if (e.key === 'Escape' && appState.get().drawerOpen) {
          appState.toggleDrawer(false);
        }
      });
  
      if (this.scrim) {
        this.scrim.addEventListener('click', () => {
          appState.toggleDrawer(false);
        });
      }
    }
  
    render() {
      const state = appState.get();
      const lang = state.lang || 'id';
  
      // Sinkronisasi kelas collapsed pada .shell
      if (state.sidebarCollapsed) {
        this.shell.classList.add('collapsed');
      } else {
        this.shell.classList.remove('collapsed');
      }
  
      // Sinkronisasi status drawer mobile
      if (state.drawerOpen) {
        this.sidebar.classList.add('open');
        if (this.scrim) this.scrim.classList.add('show');
      } else {
        this.sidebar.classList.remove('open');
        if (this.scrim) this.scrim.classList.remove('show');
      }
  
      this.sidebar.innerHTML = `
        <!-- Logo Anabhi Dev Saja di Atas Sidebar: Besar, Seukuran Sidebar, Tanpa Title Web (SOP 2.0) -->
        <div class="sidebar-top-branding">
          <a class="logo-box" href="https://anabhidev.com" target="_blank" rel="noopener noreferrer" aria-label="Kunjungi anabhidev.com">
            <img src="https://anabhidev.com/logo.webp" alt="Anabhi Dev" width="512" height="180" loading="eager">
          </a>
          <button class="btn-collapse-toggle" id="sidebarCollapseBtn" type="button" aria-label="Ciutkan atau perlebar sidebar" title="${state.sidebarCollapsed ? 'Perlebar Sidebar' : 'Ciutkan Sidebar'}">
            ${state.sidebarCollapsed ? '»' : '«'}
          </button>
        </div>
  
        <!-- Menu Utama -->
        <div class="kicker">${t('mainNav', lang)}</div>
        <nav class="nav" aria-label="Navigasi Utama">
          <button class="nav-item ${state.currentRoute === 'home' ? 'active' : ''}" data-route="home" data-tooltip="${t('home', lang)}">
            <span class="icon">🏠</span>
            <span class="label">${t('home', lang)}</span>
          </button>
          <button class="nav-item ${state.currentRoute === 'all-subjects' ? 'active' : ''}" data-route="all-subjects" data-tooltip="${t('allSubjects', lang)}">
            <span class="icon">📚</span>
            <span class="label">${t('allSubjects', lang)}</span>
          </button>
        </nav>
  
        <!-- 10 Mata Pelajaran Lengkap -->
        <div class="kicker">${t('subjectsKicker', lang)}</div>
        <nav class="nav" aria-label="Mata Pelajaran">
          ${SUBJECTS.map(sub => {
            const isActive = state.currentRoute === 'subject' && state.currentSubjectId === sub.id;
            const displayName = getSubjectName(sub, lang);
  
            return `
              <button class="nav-item ${isActive ? 'active' : ''}" data-route="subject" data-subject-id="${sub.id}" data-tooltip="${displayName}">
                <span class="icon">${sub.icon}</span>
                <span class="label">${displayName}</span>
              </button>
            `;
          }).join('')}
        </nav>
  
        <!-- Fitur Tambahan: Tantangan & Progress -->
        <div class="kicker">${t('activitiesKicker', lang)}</div>
        <nav class="nav" aria-label="Aktivitas">
          <button class="nav-item ${state.currentRoute === 'tantangan' ? 'active' : ''}" data-route="tantangan" data-tooltip="${t('dailyChallenge', lang)}">
            <span class="icon">🎯</span>
            <span class="label">${t('dailyChallenge', lang)}</span>
          </button>
          <button class="nav-item ${state.currentRoute === 'progress' ? 'active' : ''}" data-route="progress" data-tooltip="${t('progress', lang)}">
            <span class="icon">📈</span>
            <span class="label">${t('progress', lang)}</span>
          </button>
        </nav>
  
        <!-- Footer Kredit Resmi (Standar Coding 1.5 Bagian 6) -->
        <div class="sidebar-foot">
          <strong>ANABHIDEV SMART STUDY</strong>
          ${t('footerTagline', lang)}
          <br>
          ${t('developmentCredit', lang)}
        </div>
      `;
  
      this.attachEvents();
    }
  
    attachEvents() {
      const collapseBtn = this.sidebar.querySelector('#sidebarCollapseBtn');
      if (collapseBtn) {
        collapseBtn.addEventListener('click', () => {
          appState.toggleSidebar();
        });
      }
  
      const navItems = this.sidebar.querySelectorAll('.nav-item');
      navItems.forEach(item => {
        item.addEventListener('click', () => {
          const route = item.getAttribute('data-route');
          const subjectId = item.getAttribute('data-subject-id');
          appState.navigate(route, subjectId);
        });
      });
    }
  }
  

  // --- Source: js/components/video-modal.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · YouTube Safe Video Modal Component
  // Development · Anabhi Dev
  // Version   : 2.0 (Resilient file:/// & http/https Player Support)
  // Generated : 11 September 2026
  // ================================================================
  
  class VideoModalComponent {
    constructor(modalContainer) {
      this.container = modalContainer;
      this.initEvents();
    }
  
    initEvents() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.container.classList.contains('show')) {
          this.close();
        }
      });
  
      this.container.addEventListener('click', (e) => {
        if (e.target === this.container) {
          this.close();
        }
      });
    }
  
    open(title, youtubeUrl) {
      if (!youtubeUrl) return;
  
      // Ekstrak ID YouTube dengan aman
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=[&]?|&v=)([^#&?]*).*/;
      const match = youtubeUrl.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;
  
      const directUrl = videoId
        ? `https://www.youtube.com/watch?v=${videoId}`
        : youtubeUrl;
      const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
        : youtubeUrl;
      const thumbUrl = videoId
        ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
        : '';
  
      const isFileProtocol = (typeof window !== 'undefined' && window.location.protocol === 'file:');
  
      // Buat template modal yang adaptif
      this.container.innerHTML = `
        <div class="video-modal-content" role="dialog" aria-modal="true" aria-labelledby="modalVideoTitle">
          <div class="video-modal-header">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <strong id="modalVideoTitle" style="font-size:15px; font-weight:800; color:var(--ink);">${title || 'Video Pembelajaran'}</strong>
              <a href="${directUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="padding:4px 10px; font-size:11.5px; text-decoration:none; display:inline-flex; align-items:center; gap:5px; background:rgba(239,68,68,0.12); color:#ef4444; border-color:rgba(239,68,68,0.3);">
                <span>▶ Buka di YouTube</span> ↗
              </a>
            </div>
            <button class="iconbtn" id="btnModalClose" type="button" aria-label="Tutup video" style="color:var(--ink); border-color:var(--line); height:36px; min-width:36px;">
              ✕
            </button>
          </div>
  
          <div class="video-iframe-wrap" id="videoWrapper">
            ${isFileProtocol ? `
              <div id="filePlayerPoster" style="position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#0b1526; cursor:pointer; text-align:center; padding:16px;">
                ${thumbUrl ? `<img src="${thumbUrl}" alt="${title}" style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter:brightness(0.65); transition:filter 0.2s;" />` : ''}
                
                <!-- Tombol Play Merah YouTube -->
                <div style="position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; gap:12px;">
                  <div id="btnPosterPlay" style="width:76px; height:52px; background:#ff0000; border-radius:16px; display:flex; align-items:center; justify-content:center; box-shadow:0 10px 25px rgba(255,0,0,0.5), 0 0 0 4px rgba(255,255,255,0.25); transition:transform 0.18s ease-in-out;">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <div style="background:rgba(15,23,42,0.88); color:#ffffff; padding:7px 16px; border-radius:20px; font-size:13px; font-weight:700; border:1px solid rgba(255,255,255,0.25); backdrop-filter:blur(6px); letter-spacing:0.3px;">
                    ▶ Putar Video (Popup Jendela Bebas Gangguan)
                  </div>
                </div>
              </div>
            ` : `
              <iframe
                id="ytEmbedIframe"
                src="${embedUrl}"
                title="${title || 'Video Pembelajaran'}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                loading="lazy">
              </iframe>
            `}
          </div>
  
          <div class="video-modal-footer" style="padding:12px 18px; background:var(--surface); border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; font-size:12.5px;">
            <div style="color:var(--muted); max-width:480px; line-height:1.45;">
              ${isFileProtocol ? `
                💡 <strong>Mode Berkas Lokal (file://):</strong> Browser melindungi privasi dengan membatasi iframe YouTube (Error 153). Klik tombol putar untuk membuka jendela video interaktif bebas gangguan, atau jalankan <code>start-server.bat</code> untuk pemutar tersemat.
              ` : `
                💡 <strong>Info:</strong> Bila pemutar lokal terhalang aturan privasi, tonton video langsung melalui tombol di sebelah kanan.
              `}
            </div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              ${isFileProtocol ? `
                <button class="btn" id="btnForceEmbed" type="button" style="font-size:12px; padding:6px 12px;">
                  🔄 Paksa Sematkan Iframe
                </button>
              ` : ''}
              <a href="${directUrl}" id="btnOpenDirect" target="_blank" rel="noopener noreferrer" class="btn primary" style="padding:7px 14px; font-size:12.5px; text-decoration:none; display:inline-flex; align-items:center; gap:6px;">
                <span>▶ Tonton di YouTube</span> ↗
              </a>
            </div>
          </div>
        </div>
      `;
  
      this.container.classList.add('show');
  
      // Handler tombol tutup
      const closeBtn = this.container.querySelector('#btnModalClose');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close());
      }
  
      // Helper membuka video dalam popup elegan
      const launchVideoPopup = () => {
        const width = Math.min(window.screen.availWidth || 960, 960);
        const height = Math.min(window.screen.availHeight || 560, 560);
        const left = Math.max(0, Math.floor((window.screen.availWidth - width) / 2));
        const top = Math.max(0, Math.floor((window.screen.availHeight - height) / 2));
        const popup = window.open(
          directUrl,
          'ytPlayer_' + (videoId || 'vid'),
          `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=no`
        );
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
          window.open(directUrl, '_blank', 'noopener,noreferrer');
        }
      };
  
      // Handler klik poster / tombol play di file://
      const poster = this.container.querySelector('#filePlayerPoster');
      if (poster) {
        poster.addEventListener('click', launchVideoPopup);
      }
  
      // Handler paksa sematkan iframe jika user menginginkannya
      const forceEmbedBtn = this.container.querySelector('#btnForceEmbed');
      if (forceEmbedBtn) {
        forceEmbedBtn.addEventListener('click', () => {
          const wrap = this.container.querySelector('#videoWrapper');
          if (wrap) {
            wrap.innerHTML = `
              <iframe
                id="ytEmbedIframe"
                src="${embedUrl}"
                title="${title || 'Video Pembelajaran'}"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                loading="lazy">
              </iframe>
            `;
          }
          forceEmbedBtn.style.display = 'none';
        });
      }
    }
  
    close() {
      this.container.innerHTML = '';
      this.container.classList.remove('show');
    }
  }
  
  

  // --- Source: js/components/quiz-runner.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Reusable Quiz Engine Component
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 10:25:00
  // ================================================================
  
  
  
  
  
  class QuizRunner {
    constructor(container, quizData, onComplete) {
      this.container = container;
      this.quiz = quizData;
      this.onComplete = onComplete;
      this.currentIndex = 0;
      this.score = 0;
      this.answered = false;
      this.showHint = false;
  
      this.render();
    }
  
    render() {
      const lang = appState.get().lang || 'id';
      const q = this.quiz.questions[this.currentIndex];
      const isLast = this.currentIndex === this.quiz.questions.length - 1;
  
      this.container.innerHTML = `
        <div class="quiz-box">
          <div class="quiz-header">
            <div>
              <span class="subject-badge">${this.quiz.title}</span>
              <div style="font-size:12px; color:var(--muted); margin-top:4px;">
                ${t('practiceQuestionPrefix', lang)} ${this.currentIndex + 1} ${t('of', lang)} ${this.quiz.questions.length}
              </div>
            </div>
            <div style="font-weight:800; color:var(--teal); font-size:13.5px;">
              ${t('scoreLabel', lang)} ${this.score}
            </div>
          </div>
  
          <div class="quiz-question">${q.q}</div>
  
          <div class="quiz-options">
            ${q.options.map(opt => `
              <button class="quiz-opt-btn" data-answer="${opt}" type="button">
                <span>⚪</span>
                <span>${opt}</span>
              </button>
            `).join('')}
          </div>
  
          ${q.hint ? `
            <button class="btn" id="btnToggleHint" type="button" style="font-size:12px; padding:6px 12px; min-height:36px;">
              ${this.showHint ? t('hideHintBtn', lang) : t('showHintBtn', lang)}
            </button>
            <div class="hint-panel ${this.showHint ? 'show' : ''}" id="hintPanel">
              ${q.hint}
            </div>
          ` : ''}
  
          <div class="feedback-banner" id="feedbackBanner"></div>
  
          <div style="margin-top:20px; display:flex; justify-content:flex-end;">
            <button class="btn primary" id="btnNextQuestion" type="button" style="display:none;">
              ${isLast ? t('finishQuizBtn', lang) : t('nextQBtn', lang)}
            </button>
          </div>
        </div>
      `;
  
      this.attachEvents();
    }
  
    attachEvents() {
      const q = this.quiz.questions[this.currentIndex];
      const optionBtns = this.container.querySelectorAll('.quiz-opt-btn');
      const feedbackBanner = this.container.querySelector('#feedbackBanner');
      const nextBtn = this.container.querySelector('#btnNextQuestion');
      const hintBtn = this.container.querySelector('#btnToggleHint');
      const hintPanel = this.container.querySelector('#hintPanel');
  
      if (hintBtn) {
        hintBtn.addEventListener('click', () => {
          this.showHint = !this.showHint;
          hintPanel.classList.toggle('show', this.showHint);
          const curLang = appState.get().lang || 'id';
          hintBtn.textContent = this.showHint ? t('hideHintBtn', curLang) : t('showHintBtn', curLang);
        });
      }
  
      optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (this.answered) return;
  
          const selected = btn.getAttribute('data-answer');
          const isCorrect = selected === q.answer;
  
          optionBtns.forEach(b => {
            b.disabled = true;
            if (b.getAttribute('data-answer') === q.answer) {
              b.classList.add('correct');
              b.querySelector('span').textContent = '✅';
            }
          });
  
          const currentLang = appState.get().lang || 'id';
          if (isCorrect) {
            this.score++;
            btn.classList.add('correct');
            feedbackBanner.className = 'feedback-banner success show';
            feedbackBanner.innerHTML = t('quizCorrectFeedback', currentLang);
          } else {
            btn.classList.add('wrong');
            btn.querySelector('span').textContent = '❌';
            feedbackBanner.className = 'feedback-banner warning show';
            feedbackBanner.innerHTML = `${t('quizWrongFeedback', currentLang)} <u>${q.answer}</u>. ${currentLang === 'en' ? 'Keep trying!' : 'Semangat terus!'}`;
          }
  
          this.answered = true;
          nextBtn.style.display = 'inline-flex';
        });
      });
  
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (this.currentIndex < this.quiz.questions.length - 1) {
            this.currentIndex++;
            this.answered = false;
            this.showHint = false;
            this.render();
          } else {
            // Kuis Selesai!
            store.recordQuizResult(this.quiz.id, this.score, this.quiz.questions.length);
            this.showCompletionScreen();
          }
        });
      }
    }
  
    showCompletionScreen() {
      const currentLang = appState.get().lang || 'id';
      const isPerfect = this.score === this.quiz.questions.length;
      this.container.innerHTML = `
        <div class="quiz-box" style="text-align:center; padding:36px 20px;">
          <div style="font-size:52px; margin-bottom:12px;">${isPerfect ? '🏆' : '🌟'}</div>
          <h3 style="font-size:22px; margin:0 0 8px;">${t('quizFinishedTitle', currentLang)}</h3>
          <p style="font-size:14px; color:var(--muted); margin:0 0 18px;">
            ${isPerfect ? t('quizFinishedPerfect', currentLang) : t('quizFinishedGood', currentLang)}
          </p>
          <div style="font-size:26px; font-weight:850; color:var(--teal); margin-bottom:20px;">
            ${t('scoreLabel', currentLang)} ${this.score} / ${this.quiz.questions.length}
          </div>
          <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
            <button class="btn" id="btnRetryQuiz" type="button">${t('retryQuizBtn', currentLang)}</button>
            <button class="btn primary" id="btnFinishQuiz" type="button">${t('continueNextSubjectBtn', currentLang)}</button>
          </div>
        </div>
      `;
  
      const retryBtn = this.container.querySelector('#btnRetryQuiz');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          this.currentIndex = 0;
          this.score = 0;
          this.answered = false;
          this.showHint = false;
          this.render();
        });
      }
  
      const finishBtn = this.container.querySelector('#btnFinishQuiz');
      if (finishBtn && this.onComplete) {
        finishBtn.addEventListener('click', () => {
          this.onComplete();
        });
      }
    }
  }
  
  

  // --- Source: js/components/lesson-view.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Mathematics Flagship Lesson View & Math Toolbox
  // Development · Anabhi Dev
  // Version   : 2.0 (Math Toolbox Master Blueprint)
  // Generated : 10 September 2026, 13:30:00
  // ================================================================
  
  
  
  
  
  
  
  class MathLessonView {
    constructor(container, videoModal) {
      this.container = container;
      this.videoModal = videoModal;
      this.currentPracticeIndex = 0;
      this.practiceHintLevel = 0;
      this.practiceAnswered = false;
      this.viewMode = 'visual'; // 'visual' | 'compare'
      this.userMetacognition = null;
      this.selectedMathLevel = 'all';
      this.counterIconA = '🔴';
      this.counterIconB = '🟡';
    }
  
    render() {
      const state = appState.get();
      const lang = state.lang || 'id';
      const isEn = lang === 'en';
      const a = state.mathA !== undefined ? state.mathA : 67;
      const b = state.mathB !== undefined ? state.mathB : 59;
      const activeMethod = state.activeMathMethod || 'compensation';
      const solution = MathEngine.solve(a, b, lang);
  
      // Filter slot video YouTube yang memiliki url
      const availableVideos = MATH_DATA.videoSlots.filter(v => v.url && v.url.trim().length > 0);
      const progress = MathEngine.getProgress();
  
      this.container.innerHTML = `
        <!-- Header Matematika Flagship / Math Toolbox -->
        <div class="section-header">
          <div class="math-hero-badge">🧰 ${t('mathFlagshipBadge', lang)}</div>
          <h2 class="section-title">${isEn && MATH_DATA.titleEn ? MATH_DATA.titleEn : MATH_DATA.title}</h2>
          <p class="section-sub">${isEn && MATH_DATA.subtitleEn ? MATH_DATA.subtitleEn : MATH_DATA.subtitle}</p>
        </div>
  
        <!-- Kotak Kontrol Bilangan & Preset Soal Flagship -->
        <div class="math-control-card">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
            <div style="font-size:12px; font-weight:800; color:var(--muted); text-transform:uppercase;">
              ${t('presetLabel', lang)}
            </div>
            <button class="btn" id="btnRandomMathProblem" type="button" style="padding:4px 12px; font-size:12px;">
              ${t('randomProblem', lang)}
            </button>
          </div>
  
          <!-- Filter Level Soal (Termasuk Kelas 1 SD) -->
          <div class="preset-level-tabs">
            <button class="level-pill-btn ${this.selectedMathLevel === 'all' ? 'active' : ''}" data-level="all" type="button">Semua Soal</button>
            <button class="level-pill-btn ${this.selectedMathLevel === 'sd1' ? 'active' : ''}" data-level="sd1" type="button">🟢 Kelas 1 SD: Dasar (1–50)</button>
            <button class="level-pill-btn ${this.selectedMathLevel === 'master' ? 'active' : ''}" data-level="master" type="button">🔴 Mahir: Flagship (67 + 59)</button>
          </div>
  
          <div class="math-presets">
            ${MATH_DATA.presetExamples
              .filter(ex => this.selectedMathLevel === 'all' || ex.level === this.selectedMathLevel)
              .map(ex => `
              <button class="preset-chip ${ex.a === a && ex.b === b ? 'active' : ''}" data-a="${ex.a}" data-b="${ex.b}" type="button">
                ${isEn && ex.labelEn ? ex.labelEn : ex.label}
              </button>
            `).join('')}
          </div>
  
          <!-- Input Angka Interaktif -->
          <div class="math-input-row">
            <div class="math-num-box">
              <label for="inputMathA">${t('num1Label', lang)}</label>
              <input type="number" class="math-num-input" id="inputMathA" value="${a}" min="0" max="999">
            </div>
            <span class="math-operator">+</span>
            <div class="math-num-box">
              <label for="inputMathB">${t('num2Label', lang)}</label>
              <input type="number" class="math-num-input" id="inputMathB" value="${b}" min="0" max="999">
            </div>
            <span class="math-operator">=</span>
            <div class="math-num-box">
              <label>${t('resultLabel', lang)}</label>
              <div class="math-num-input" style="background:var(--teal-soft); color:var(--teal-soft-ink); display:grid; place-items:center;">
                ${solution.sum}
              </div>
            </div>
          </div>
  
          <!-- Smart Recommendation Banner -->
          ${this.renderSmartRecommendation(a, b, solution, lang)}
        </div>
  
        <!-- Mode Switcher & Strategy Navigation -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
          <div style="font-size:14px; font-weight:800; color:var(--ink);">
            ${t('chooseThinkingTool', lang)}
          </div>
          <div style="display:flex; gap:6px;">
            <button class="btn ${this.viewMode === 'visual' ? 'primary' : ''}" id="btnModeVisual" type="button" style="font-size:12px; padding:6px 14px;">
              ${t('modeVisual', lang)}
            </button>
            <button class="btn ${this.viewMode === 'compare' ? 'primary' : ''}" id="btnModeCompare" type="button" style="font-size:12px; padding:6px 14px;">
              ${t('modeCompare', lang)}
            </button>
          </div>
        </div>
  
        <!-- Tab Switcher 9 Metode Berpikir -->
        <div class="method-tabs" role="tablist">
          ${MATH_DATA.methods.map(m => `
            <button class="method-tab-btn ${activeMethod === m.id && this.viewMode === 'visual' ? 'active' : ''}" data-method="${m.id}" role="tab" type="button">
              <span>${m.icon}</span>
              <span>${isEn && m.nameEn ? m.nameEn : m.name}</span>
            </button>
          `).join('')}
        </div>
  
        <!-- Panel Konten Utama (Visual atau Compare) -->
        <div class="method-content-panel">
          ${this.viewMode === 'compare' ? this.renderCompareContent(a, b, solution, lang) : this.renderMethodContent(activeMethod, solution, lang)}
        </div>
  
        <!-- Mode Latihan Interaktif (Practice Mode) -->
        ${this.renderPracticeSection()}
  
        <!-- Progress & Badges Showcase -->
        ${this.renderProgressBadges(progress, lang)}
  
        <!-- 4 Slot Video YouTube Matematika -->
        ${availableVideos.length > 0 ? `
          <div class="section" style="margin-top:44px;">
            <div class="eyebrow"><span class="no">▶</span><span class="lbl">${t('videosHeaderEyebrow', lang) || 'VIDEO PENGAYAAN'}</span></div>
            <h3 style="font-size:20px; font-weight:800; margin:0 0 12px;">${t('videosHeaderTitle', lang) || 'Trik Berhitung Asyik di YouTube'}</h3>
            <div class="video-grid">
              ${availableVideos.map(v => `
                <div class="video-card">
                  <div>
                    <span class="subject-badge">${v.ageFit}</span>
                    <h4 style="margin:8px 0 4px; font-size:15px; font-weight:800;">${v.title}</h4>
                    <p style="margin:0; font-size:12px; color:var(--muted);">${v.description}</p>
                  </div>
                  <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;">
                    <button class="btn primary btn-play-video" data-title="${v.title}" data-url="${v.url}" type="button" style="flex:1;">
                      ${t('playVideo', lang) || 'Putar Video'}
                    </button>
                    <a href="${v.url}" target="_blank" rel="noopener noreferrer" class="btn" style="text-decoration:none; padding:8px 12px; font-size:12px;" title="Tonton langsung di YouTube">
                      ↗
                    </a>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      `;
  
      this.attachEvents();
    }
  
    renderSmartRecommendation(a, b, sol, lang = 'id') {
      const isEn = lang === 'en';
      let recText = isEn
        ? 'Exciting numbers! Try different strategies to find the one you love best.'
        : 'Angka ini seru! Coba berbagai strategi untuk menemukan cara paling nyaman.';
      let jumpMethod = sol.recommended[0] || 'decomposition';
  
      if (b === 59 || a === 59 || b % 10 === 9 || a % 10 === 9) {
        recText = isEn
          ? '💡 <strong>Smart Tip:</strong> An operand ends in 9 (almost round)! Perfect for <strong>Compensation</strong> or <strong>Make 100</strong>!'
          : '💡 <strong>Trik Cerdas:</strong> Ada angka yang berakhiran 9 (hampir bulat)! Sangat cocok pakai jurus <strong>Kompensasi</strong> atau <strong>Bikin 100</strong>!';
        jumpMethod = 'compensation';
      } else if (a + b === 100 || (a + b) % 100 === 0) {
        recText = isEn
          ? `💡 <strong>Smart Tip:</strong> Perfect pair! ${a} and ${b} instantly make ${a + b}! Try <strong>Make 100</strong>!`
          : `💡 <strong>Trik Cerdas:</strong> Pasangan serasi! ${a} dan ${b} langsung pas membentuk ${a + b}! Coba jurus <strong>Bikin 100</strong>!`;
        jumpMethod = 'make-hundred';
      }
  
      return `
        <div class="math-smart-recommendation">
          <div class="rec-text">${recText}</div>
          <button class="btn" id="btnJumpRecommended" data-method="${jumpMethod}" type="button" style="padding:4px 12px; font-size:12px; border-color:var(--teal); color:var(--teal);">
            ${t('tryThisWay', lang)}
          </button>
        </div>
      `;
    }
  
    renderMethodContent(methodId, sol, lang = 'id') {
      const isEn = lang === 'en';
  
      switch (methodId) {
        // 1. Decomposition (Pecah Puluhan & Satuan)
        case 'decomposition':
        case 'place-value':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🧩</span> ${sol.decomposition.title}</h3>
              <span class="subject-badge">${sol.decomposition.badge}</span>
            </div>
            <p style="font-size:14px; color:var(--muted); margin:0 0 18px;">
              ${isEn ? 'Separate numbers into groups of <strong>tens</strong> and <strong>ones</strong>. Add each group, then combine the totals!' : 'Pisahkan bilangan menjadi kelompok <strong>puluhan</strong> dan <strong>satuan</strong>. Hitung masing-masing kelompok, lalu satukan hasilnya!'}
            </p>
            <div class="place-value-grid">
              <div class="pv-tile">
                <div class="tile-title">${isEn ? '1. Decompose' : '1. Urai Bilangan'}</div>
                <div class="tile-equation" style="font-size:17px;">${sol.decomposition.breakdownA}</div>
                <div class="tile-equation" style="font-size:17px; margin-top:6px;">${sol.decomposition.breakdownB}</div>
              </div>
              <div class="pv-tile">
                <div class="tile-title">${isEn ? '2. Add Tens' : '2. Jumlahkan Puluhan'}</div>
                <div class="tile-equation">${sol.decomposition.step2}</div>
              </div>
              <div class="pv-tile">
                <div class="tile-title">${isEn ? '3. Add Ones' : '3. Jumlahkan Satuan'}</div>
                <div class="tile-equation">${sol.decomposition.step3}</div>
              </div>
              <div class="pv-tile" style="border-color:var(--teal); background:var(--teal-soft);">
                <div class="tile-title" style="color:var(--teal-soft-ink);">${isEn ? '4. Final Result' : '4. Hasil Akhir'}</div>
                <div class="tile-equation" style="color:var(--teal-soft-ink);">${sol.decomposition.stepFinal}</div>
              </div>
            </div>
          `;
  
        // 2. Number Bonds (Ikatan Bilangan)
        case 'number-bonds':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🔗</span> ${sol.numberBonds.title}</h3>
              <span class="subject-badge">${sol.numberBonds.badge}</span>
            </div>
            <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
              ${sol.numberBonds.summary}
            </p>
            <div class="nb-tree-box">
              <svg class="nb-svg" viewBox="0 0 540 220">
                <!-- Pohon Cabang Angka A -->
                <circle cx="120" cy="40" r="26" fill="var(--teal)" />
                <text x="120" y="47" text-anchor="middle" font-weight="900" font-size="16" fill="#ffffff">${sol.a}</text>
                <line x1="120" y1="66" x2="70" y2="120" stroke="var(--line)" stroke-width="3" />
                <line x1="120" y1="66" x2="170" y2="120" stroke="var(--line)" stroke-width="3" />
                <circle cx="70" cy="130" r="22" fill="var(--paper)" stroke="var(--teal)" stroke-width="2" />
                <text x="70" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeA.branchLeft}</text>
                <circle cx="170" cy="130" r="22" fill="var(--paper)" stroke="var(--teal)" stroke-width="2" />
                <text x="170" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeA.branchRight}</text>
  
                <!-- Operator Tambah -->
                <text x="225" y="135" text-anchor="middle" font-weight="900" font-size="24" fill="var(--muted)">+</text>
  
                <!-- Pohon Cabang Angka B -->
                <circle cx="330" cy="40" r="26" fill="#e67e22" />
                <text x="330" y="47" text-anchor="middle" font-weight="900" font-size="16" fill="#ffffff">${sol.b}</text>
                <line x1="330" y1="66" x2="280" y2="120" stroke="var(--line)" stroke-width="3" />
                <line x1="330" y1="66" x2="380" y2="120" stroke="var(--line)" stroke-width="3" />
                <circle cx="280" cy="130" r="22" fill="var(--paper)" stroke="#e67e22" stroke-width="2" />
                <text x="280" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeB.branchLeft}</text>
                <circle cx="380" cy="130" r="22" fill="var(--paper)" stroke="#e67e22" stroke-width="2" />
                <text x="380" y="136" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberBonds.treeB.branchRight}</text>
  
                <!-- Gabungan Akhir -->
                <path d="M 70,152 Q 225,210 460,130" fill="none" stroke="var(--green)" stroke-width="2.5" stroke-dasharray="4,4" />
                <circle cx="470" cy="130" r="30" fill="var(--green)" />
                <text x="470" y="137" text-anchor="middle" font-weight="900" font-size="17" fill="#ffffff">${sol.sum}</text>
                <text x="470" y="176" text-anchor="middle" font-weight="800" font-size="12" fill="var(--green)">TOTAL</text>
              </svg>
              <div style="font-size:14px; font-weight:800; color:var(--ink); margin-top:8px;">
                ${isEn ? 'Tens' : 'Puluhan'} (${sol.numberBonds.combinedBranches[0].calc} = ${sol.numberBonds.combinedBranches[0].result}) + ${isEn ? 'Ones' : 'Satuan'} (${sol.numberBonds.combinedBranches[1].calc} = ${sol.numberBonds.combinedBranches[1].result}) = ${sol.sum}!
              </div>
            </div>
          `;
  
        // 3. Make Ten / Make Hundred
        case 'make-hundred':
        case 'make-round':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🔟</span> ${sol.makeHundred.title}</h3>
              <span class="subject-badge">${sol.makeHundred.badge}</span>
            </div>
            <div class="round-strategy-banner">
              🎯 <strong>${isEn ? 'Smart Route:' : 'Rute Pintar:'}</strong> ${sol.makeHundred.step1}
            </div>
            <div class="pathway-flow">
              <div class="pathway-node">${sol.a}</div>
              <div class="pathway-arrow">
                <span>+${sol.makeHundred.need}</span>
                <span style="font-size:16px;">➔</span>
              </div>
              <div class="pathway-node" style="background:#ffb21b; color:#1a202c;">${sol.makeHundred.target}</div>
              <div class="pathway-arrow">
                <span>+${sol.makeHundred.remainingB}</span>
                <span style="font-size:16px;">➔</span>
              </div>
              <div class="pathway-node" style="background:var(--green);">${sol.sum} 🎉</div>
            </div>
            <div class="round-step-box">
              <div style="font-size:15px; font-weight:750; margin-bottom:8px;">${isEn ? 'Step-by-step Explanation:' : 'Langkah Penjelasan:'}</div>
              <div style="display:flex; flex-direction:column; gap:8px; font-size:14px;">
                <div>👉 <strong>${isEn ? 'Step 1:' : 'Langkah 1:'}</strong> ${sol.makeHundred.step1}</div>
                <div>👉 <strong>${isEn ? 'Step 2:' : 'Langkah 2:'}</strong> ${sol.makeHundred.step2}</div>
                <div>👉 <strong>${isEn ? 'Step 3:' : 'Langkah 3:'}</strong> ${sol.makeHundred.step3}</div>
                <div style="color:var(--teal); font-weight:800;">👉 <strong>${isEn ? 'Step 4:' : 'Langkah 4:'}</strong> ${sol.makeHundred.step4}</div>
              </div>
            </div>
          `;
  
        // 4. Compensation (Kompensasi / Hampir Bulat)
        case 'compensation':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>⚖️</span> ${sol.compensation.title}</h3>
              <span class="subject-badge">${sol.compensation.badge}</span>
            </div>
            <div class="comp-quote">
              ${sol.compensation.friendlyQuote}
            </div>
            <div class="comp-card-box">
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:14px; margin-bottom:18px;">
                <div style="background:var(--card); padding:16px; border-radius:12px; border:1px solid var(--line); text-align:center;">
                  <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? '1. Round Up First' : '1. Bulatkan Dulu'}</div>
                  <div style="font-size:20px; font-weight:900; color:#e67e22; margin-top:4px;">
                    ${sol.compensation.roundedNum} ➔ ${sol.compensation.roundValue}
                  </div>
                  <div style="font-size:12px; color:var(--muted); margin-top:4px;">(${isEn ? 'Added ' : 'Ditambah '}${sol.compensation.diff})</div>
                </div>
                <div style="background:var(--card); padding:16px; border-radius:12px; border:1px solid var(--line); text-align:center;">
                  <div style="font-size:11px; font-weight:800; color:var(--muted); text-transform:uppercase;">${isEn ? '2. Easy Calculation' : '2. Hitung Enteng'}</div>
                  <div style="font-size:20px; font-weight:900; color:var(--teal); margin-top:4px;">
                    ${sol.compensation.baseNum} + ${sol.compensation.roundValue} = ${sol.compensation.intermediateSum}
                  </div>
                  <div style="font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Super easy in your head!' : 'Sangat gampang di kepala!'}</div>
                </div>
                <div style="background:var(--card); padding:16px; border-radius:12px; border:1px solid var(--green); text-align:center;">
                  <div style="font-size:11px; font-weight:800; color:var(--green); text-transform:uppercase;">${isEn ? '3. Subtract Extra' : '3. Balikin Kelebihannya'}</div>
                  <div style="font-size:20px; font-weight:900; color:var(--green); margin-top:4px;">
                    ${sol.compensation.intermediateSum} - ${sol.compensation.diff} = ${sol.sum}
                  </div>
                  <div style="font-size:12px; color:var(--muted); margin-top:4px;">${isEn ? 'Fast and exact answer!' : 'Jawaban tepat dan kilat!'}</div>
                </div>
              </div>
              <div style="font-size:14px; color:var(--ink);">
                👉 ${sol.compensation.step3}
              </div>
            </div>
          `;
  
        // 5. Number Line (Garis Bilangan)
        case 'number-line':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>📏</span> ${sol.numberLine.title}</h3>
              <span class="subject-badge">${sol.numberLine.badge}</span>
            </div>
            <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
              ${sol.numberLine.summary}
            </p>
            <div class="number-line-container">
              <svg class="number-line-svg" viewBox="0 0 560 120">
                <!-- Garis Dasar -->
                <line x1="30" y1="90" x2="520" y2="90" stroke="var(--ink)" stroke-width="3" />
                <polygon points="520,85 535,90 520,95" fill="var(--ink)" />
  
                <!-- Titik Awal & Kodok Ceria Melompat -->
                <circle cx="60" cy="90" r="8" fill="var(--teal)" />
                <text x="60" y="116" text-anchor="middle" font-weight="800" font-size="14" fill="var(--ink)">${sol.numberLine.start}</text>
                <g class="frog-hopper" transform="translate(60, 58)">
                  <text x="0" y="0" font-size="28" text-anchor="middle" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))">🐸</text>
                </g>
  
                <!-- Busur Lompatan 1 (Puluhan) -->
                ${sol.numberLine.jumps[0] ? `
                  <path d="M 60,90 Q 185,12 300,90" fill="none" stroke="#ffb21b" stroke-width="3.5" stroke-dasharray="6,4" />
                  <text x="185" y="38" text-anchor="middle" font-weight="900" font-size="14" fill="#ffb21b">Lompat ${sol.numberLine.jumps[0].amount}</text>
                  <circle cx="300" cy="90" r="7" fill="#ffb21b" />
                  <text x="300" y="116" text-anchor="middle" font-weight="800" font-size="13" fill="var(--ink)">${sol.numberLine.jumps[0].to}</text>
                  <text x="300" y="86" font-size="15" text-anchor="middle">🪷</text>
                ` : ''}
  
                <!-- Busur Lompatan 2 (Satuan) -->
                ${sol.numberLine.jumps[1] ? `
                  <path d="M 300,90 Q 395,30 480,90" fill="none" stroke="var(--teal)" stroke-width="3.5" />
                  <text x="395" y="52" text-anchor="middle" font-weight="900" font-size="14" fill="var(--teal)">Lompat ${sol.numberLine.jumps[1].amount}</text>
                ` : ''}
  
                <!-- Titik Target Akhir -->
                <circle cx="480" cy="90" r="9" fill="var(--green)" />
                <text x="480" y="80" font-size="18" text-anchor="middle">🎯</text>
                <text x="480" y="116" text-anchor="middle" font-weight="900" font-size="16" fill="var(--green)">${sol.sum} 🎉</text>
              </svg>
            </div>
          `;
  
        // 6. Base-Ten Blocks (Balok Nilai Tempat)
        case 'base-ten':
        case 'visual-blocks':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🧱</span> ${sol.baseTen.title}</h3>
              <span class="subject-badge">${sol.baseTen.badge}</span>
            </div>
            <div class="round-strategy-banner" style="background:rgba(0,206,201,0.1); border-color:var(--teal); color:var(--ink);">
              💡 <strong>${isEn ? 'Regrouping Concept:' : 'Konsep Regrouping:'}</strong> ${sol.baseTen.regroupMessage}
            </div>
            <div class="blocks-stage">
              <div style="font-weight:750; font-size:13px; margin-bottom:8px;">${isEn ? `Number ${sol.a} (${sol.baseTen.rodsA} Ten-Rods & ${sol.baseTen.cubesA} Unit-Cubes):` : `Angka ${sol.a} (${sol.baseTen.rodsA} Batang Puluhan & ${sol.baseTen.cubesA} Kubus Satuan):`}</div>
              <div class="blocks-group">
                <div class="rod-stack">
                  ${Array(Math.min(10, sol.baseTen.rodsA)).fill(0).map(() => `<div class="rod" title="${isEn ? '1 Rod = 10' : '1 Batang = 10'}"></div>`).join('')}
                </div>
                <div class="cube-stack">
                  ${Array(sol.baseTen.cubesA).fill(0).map(() => `<div class="cube" title="${isEn ? '1 Cube = 1' : '1 Kubus = 1'}"></div>`).join('')}
                </div>
              </div>
  
              <div style="font-weight:750; font-size:13px; margin:18px 0 8px;">${isEn ? `Number ${sol.b} (${sol.baseTen.rodsB} Ten-Rods & ${sol.baseTen.cubesB} Unit-Cubes):` : `Angka ${sol.b} (${sol.baseTen.rodsB} Batang Puluhan & ${sol.baseTen.cubesB} Kubus Satuan):`}</div>
              <div class="blocks-group">
                <div class="rod-stack">
                  ${Array(Math.min(10, sol.baseTen.rodsB)).fill(0).map(() => `<div class="rod" title="${isEn ? '1 Rod = 10' : '1 Batang = 10'}"></div>`).join('')}
                </div>
                <div class="cube-stack">
                  ${Array(sol.baseTen.cubesB).fill(0).map(() => `<div class="cube" title="${isEn ? '1 Cube = 1' : '1 Kubus = 1'}"></div>`).join('')}
                </div>
              </div>
  
              <div style="border-top:2px dashed var(--line); margin:18px 0; padding-top:14px;">
                <div style="font-weight:800; font-size:14px; margin-bottom:8px; color:var(--teal);">${isEn ? 'Combined Blocks:' : 'Hasil Penggabungan Seluruh Balok:'}</div>
                <div class="blocks-group">
                  ${sol.baseTen.totalFlats > 0 ? `
                    <div class="flat-block">
                      100 (${isEn ? 'Flat' : 'Ratusan'})
                    </div>
                  ` : ''}
                  <div class="rod-stack">
                    ${Array(sol.baseTen.remainingRods).fill(0).map(() => `<div class="rod" style="background:#10ac84;" title="${isEn ? 'Ten-Rod' : 'Batang Puluhan'}"></div>`).join('')}
                  </div>
                  <div class="cube-stack">
                    ${Array(sol.baseTen.remainingCubes).fill(0).map(() => `<div class="cube" style="background:#2ed573;" title="${isEn ? 'Unit Cube' : 'Kubus Satuan'}"></div>`).join('')}
                  </div>
                </div>
                <p style="margin:12px 0 0; font-size:13px; color:var(--muted);">${sol.baseTen.explanation}</p>
              </div>
            </div>
          `;
  
        // 7. Bar / Tape Model
        case 'bar-model':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>📦</span> ${sol.barModel.title}</h3>
              <span class="subject-badge">${sol.barModel.badge}</span>
            </div>
            <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
              ${sol.barModel.concept}
            </p>
            <div class="bar-model-wrap">
              <div style="font-size:14px; font-weight:800; text-align:center; color:var(--teal); margin-bottom:10px;">
                ${sol.barModel.whole.label}
              </div>
              <div class="bar-tape">
                <div class="bar-part" style="width:${sol.barModel.partA.percent}%; background:#3498db;">
                  ${sol.barModel.partA.label}
                </div>
                <div class="bar-part" style="width:${sol.barModel.partB.percent}%; background:#e67e22;">
                  ${sol.barModel.partB.label}
                </div>
              </div>
              <div style="display:flex; justify-content:space-between; font-size:12.5px; color:var(--muted); margin-top:8px;">
                <span>◀── ${sol.barModel.partA.percent}% ──▶</span>
                <span>◀── ${sol.barModel.partB.percent}% ──▶</span>
              </div>
              <div style="text-align:center; font-size:16px; font-weight:850; color:var(--ink); margin-top:16px;">
                ${sol.barModel.equation}
              </div>
            </div>
          `;
  
        // 8. Mental Math (Angka Ramah)
        case 'mental-math':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🧠</span> ${sol.mentalMath.title}</h3>
              <span class="subject-badge">${sol.mentalMath.badge}</span>
            </div>
            <div class="anzan-mind-board">
              <div style="font-size:12.5px; letter-spacing:1px; text-transform:uppercase; color:#ffb21b; font-weight:800;">
                ${isEn ? 'Mental Journey' : 'Papan Imajinasi Pikiran'}
              </div>
              <div style="font-size:24px; font-weight:900; margin:12px 0;">
                ${sol.mentalMath.thoughtBubble}
              </div>
              <div class="anzan-bead-row">
                <div class="anzan-bead">${sol.a}</div>
                <div style="font-size:24px; font-weight:900; display:grid; place-items:center;">+</div>
                <div class="anzan-bead" style="background:#5be0df; color:#0e2e48;">${sol.b}</div>
                <div style="font-size:24px; font-weight:900; display:grid; place-items:center;">=</div>
                <div class="anzan-bead" style="background:#2ed573; color:#ffffff;">${sol.sum}</div>
              </div>
              <div style="font-size:13.5px; color:rgba(255,255,255,0.85); max-width:440px; margin:0 auto; line-height:1.6;">
                ${sol.mentalMath.step1Text}<br>${sol.mentalMath.step2Text}
              </div>
            </div>
          `;
  
        // 9. Soroban (Sempoa Jepang)
        case 'soroban':
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🧮</span> ${sol.soroban.title}</h3>
              <span class="subject-badge">${sol.soroban.badge}</span>
            </div>
            <p style="font-size:14px; color:var(--muted); margin:0 0 14px;">
              ${sol.soroban.principle}
            </p>
            <div class="soroban-frame">
              <div class="soroban-cols">
                <!-- Kolom Ratusan -->
                <div class="soroban-col">
                  <div class="soroban-rod"></div>
                  <div class="soroban-bead-item ${sol.soroban.abacusTotal.hundreds.upperActive ? 'active' : ''}" title="${isEn ? 'Upper Bead (Value 5)' : 'Manik Atas (Nilai 5)'}"></div>
                  <div class="soroban-beam"></div>
                  ${[1, 2, 3, 4].map(idx => `
                    <div class="soroban-bead-item ${idx <= sol.soroban.abacusTotal.hundreds.lowerCount ? 'active' : ''}" title="${isEn ? 'Lower Bead (Value 1)' : 'Manik Bawah (Nilai 1)'}"></div>
                  `).join('')}
                  <div style="margin-top:8px; font-size:14px; font-weight:900; color:#faedcd;">${sol.soroban.abacusTotal.hundreds.val}</div>
                </div>
  
                <!-- Kolom Puluhan -->
                <div class="soroban-col">
                  <div class="soroban-rod"></div>
                  <div class="soroban-bead-item ${sol.soroban.abacusTotal.tens.upperActive ? 'active' : ''}" title="${isEn ? 'Upper Bead (Value 5)' : 'Manik Atas (Nilai 5)'}"></div>
                  <div class="soroban-beam"></div>
                  ${[1, 2, 3, 4].map(idx => `
                    <div class="soroban-bead-item ${idx <= sol.soroban.abacusTotal.tens.lowerCount ? 'active' : ''}" title="${isEn ? 'Lower Bead (Value 1)' : 'Manik Bawah (Nilai 1)'}"></div>
                  `).join('')}
                  <div style="margin-top:8px; font-size:14px; font-weight:900; color:#faedcd;">${sol.soroban.abacusTotal.tens.val}</div>
                </div>
  
                <!-- Kolom Satuan -->
                <div class="soroban-col">
                  <div class="soroban-rod"></div>
                  <div class="soroban-bead-item ${sol.soroban.abacusTotal.units.upperActive ? 'active' : ''}" title="${isEn ? 'Upper Bead (Value 5)' : 'Manik Atas (Nilai 5)'}"></div>
                  <div class="soroban-beam"></div>
                  ${[1, 2, 3, 4].map(idx => `
                    <div class="soroban-bead-item ${idx <= sol.soroban.abacusTotal.units.lowerCount ? 'active' : ''}" title="${isEn ? 'Lower Bead (Value 1)' : 'Manik Bawah (Nilai 1)'}"></div>
                  `).join('')}
                  <div style="margin-top:8px; font-size:14px; font-weight:900; color:#faedcd;">${sol.soroban.abacusTotal.units.val}</div>
                </div>
              </div>
              <div style="text-align:center; color:#faedcd; font-size:15px; font-weight:900; margin-top:14px;">
                ${isEn ? `Bead Formation: ${sol.sum} ✨` : `Formasi Manik Terbaca: ${sol.sum} ✨`}
              </div>
            </div>
          `;
  
        // 10. Ten-Frames (Kotak 10 Frame Khusus Kelas 1 SD)
        case 'tens-frame': {
          const tf = sol.tensFrame;
          const iconA = this.counterIconA || '🔴';
          const iconB = this.counterIconB || '🟡';
          return `
            <div class="method-header">
              <h3 class="method-title"><span>🔴</span> ${tf.title}</h3>
              <span class="subject-badge">${tf.badge}</span>
            </div>
  
            <div class="round-strategy-banner" style="background:rgba(239,68,68,0.08); border-color:#ef4444; color:var(--ink);">
              🎯 <strong>${isEn ? 'Make-10 Magic:' : 'Keajaiban Kawan 10:'}</strong> ${tf.explanation}
            </div>
  
            <!-- Pilihan Ikon Manipulatif Benda Riil (Kelas 1 SD) -->
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
              <div style="font-size:13px; font-weight:800; color:var(--ink);">
                ${isEn ? 'Choose Visual Counters:' : 'Pilih Bentuk Benda Riil (Mudah Dihitung):'}
              </div>
              <div class="concrete-toggle-bar" style="display:flex; gap:6px;">
                <button class="btn btn-counter-icon ${iconA === '🔴' ? 'primary' : ''}" data-icon-a="🔴" data-icon-b="🟡" type="button" style="padding:4px 10px; font-size:12px;">🔴 Koin Ceria</button>
                <button class="btn btn-counter-icon ${iconA === '🍎' ? 'primary' : ''}" data-icon-a="🍎" data-icon-b="⭐" type="button" style="padding:4px 10px; font-size:12px;">🍎 Apel & Bintang</button>
                <button class="btn btn-counter-icon ${iconA === '🚗' ? 'primary' : ''}" data-icon-a="🚗" data-icon-b="🚀" type="button" style="padding:4px 10px; font-size:12px;">🚗 Mobil & Roket</button>
              </div>
            </div>
  
            <!-- Tens-Frames Canvas Box -->
            <div class="tens-frame-box">
              <!-- Bundel Puluhan Jika Ada -->
              ${tf.tensBundles > 0 ? `
                <div style="margin-bottom:16px; padding:12px 16px; background:var(--card); border-radius:12px; border:1px solid var(--line);">
                  <div style="font-size:12.5px; font-weight:800; color:var(--teal); margin-bottom:6px;">
                    📦 ${isEn ? `Bundles of Tens (${tf.tA * 10} + ${tf.tB * 10} = ${tf.tensBundles * 10})` : `Bundel Puluhan Awal (${tf.tA * 10} + ${tf.tB * 10} = ${tf.tensBundles * 10})`}
                  </div>
                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    ${Array(tf.tensBundles).fill(0).map((_, i) => `
                      <div style="background:var(--teal-soft); color:var(--teal-soft-ink); font-size:11.5px; font-weight:800; padding:4px 10px; border-radius:8px; border:1px solid var(--teal);">
                        🔟 10 Penuh (#${i+1})
                      </div>
                    `).join('')}
                  </div>
                </div>
              ` : ''}
  
              <!-- Dua Kotak 10 Utama (Frame 1 & Frame 2) -->
              <div class="tens-frames-flex">
                <!-- Kotak 1: Mulai dari Satuan A, digenapkan jadi 10 -->
                <div class="ten-frame-card ${tf.canMake10 || tf.uA === 0 ? 'full-ten' : ''}">
                  <div class="ten-frame-header">
                    <span>${tf.canMake10 ? '🔟' : '📦'}</span>
                    <span>${isEn ? 'Frame 1 (Base)' : 'Kotak 10 Pertama'}</span>
                  </div>
                  <div class="ten-frame-grid">
                    ${tf.frame1.map(slot => `
                      <div class="frame-slot ${slot.filled ? 'filled' : ''} ${slot.transferred ? 'transferred' : ''}" title="${slot.transferred ? (isEn ? 'Borrowed from B to make 10' : 'Dipinjam dari B agar pas 10') : ''}">
                        ${slot.filled ? (slot.transferred ? iconB : iconA) : ''}
                      </div>
                    `).join('')}
                  </div>
                  <div class="ten-frame-summary-badge">
                    ${tf.canMake10 ? (isEn ? '✅ FULL 10 (+1 Ten)!' : '✅ GENAP 10 PENUH (+1 Puluhan)!') : `${tf.uA}/10`}
                  </div>
                </div>
  
                <!-- Simbol Tambah -->
                <div style="font-size:28px; font-weight:900; color:var(--muted); align-self:center;">+</div>
  
                <!-- Kotak 2: Sisa Satuan B -->
                <div class="ten-frame-card">
                  <div class="ten-frame-header">
                    <span>📦</span>
                    <span>${isEn ? 'Frame 2 (Remaining)' : 'Kotak 10 Kedua (Sisa)'}</span>
                  </div>
                  <div class="ten-frame-grid">
                    ${tf.frame2.map(slot => `
                      <div class="frame-slot ${slot.filled ? 'filled' : ''}">
                        ${slot.filled ? iconB : ''}
                      </div>
                    `).join('')}
                  </div>
                  <div class="ten-frame-summary-badge">
                    ${isEn ? `Remaining: ${tf.finalUnits} units` : `Tersisa: ${tf.finalUnits} Satuan`}
                  </div>
                </div>
  
                <!-- Simbol Sama Dengan -->
                <div style="font-size:28px; font-weight:900; color:var(--teal); align-self:center;">=</div>
  
                <!-- Kartu Total Hasil -->
                <div class="ten-frame-card" style="border-color:var(--teal); background:var(--teal-soft); min-width:140px;">
                  <div class="ten-frame-header" style="color:var(--teal-soft-ink);">
                    <span>🎉 Total</span>
                  </div>
                  <div style="font-size:36px; font-weight:900; color:var(--teal-soft-ink); margin:8px 0;">
                    ${tf.sum}
                  </div>
                  <div style="font-size:11.5px; font-weight:800; color:var(--teal-soft-ink);">
                    ${tf.totalTens} Puluhan + ${tf.finalUnits} Satuan
                  </div>
                </div>
              </div>
  
              <!-- Panduan Suara Ramah untuk Anak SD -->
              <div style="margin-top:14px; padding:12px 18px; background:var(--surface); border-radius:12px; font-size:13px; line-height:1.6; color:var(--ink);">
                🧒 <strong>Cara Berpikir Sahabat Juara:</strong><br>
                1. Letakkan <strong>${tf.uA}</strong> ${iconA} di kotak pertama.<br>
                2. Ambil <strong>${tf.needToMake10}</strong> ${iconB} dari angka kedua untuk <strong>menggenapkan kotak pertama jadi 10 PENUH</strong>! 🔟<br>
                3. Di kotak kedua masih tersisa <strong>${tf.finalUnits}</strong> ${iconB}.<br>
                4. Gabungkan: <strong>${tf.totalTens * 10} + ${tf.finalUnits} = ${tf.sum}</strong>! Super mudah tanpa menghitung jari satu per satu! 🎈
              </div>
            </div>
          `;
        }
  
        default:
          return '';
      }
    }
  
    renderCompareContent(a, b, sol, lang = 'id') {
      const isEn = lang === 'en';
  
      return `
        <div class="method-header">
          <h3 class="method-title"><span>⚖️</span> ${isEn ? 'Compare Strategies Mode' : 'Mode Bandingkan Cara (Compare)'}</h3>
          <span class="subject-badge">${isEn ? 'One Problem, Three Angles' : 'Satu Soal Tiga Sudut Pandang'}</span>
        </div>
        <p style="font-size:14px; color:var(--muted); margin:0 0 16px;">
          ${isEn ? `See how three different thinking tools solve <strong>${a} + ${b} = ${sol.sum}</strong> in their own way:` : `Lihat bagaimana tiga alat berpikir berbeda menyelesaikan <strong>${a} + ${b} = ${sol.sum}</strong> dengan caranya masing-masing:`}
        </p>
        <div class="compare-grid">
          <!-- 1. Pecah Angka -->
          <div class="compare-card">
            <div style="font-size:16px; font-weight:800; color:var(--teal); margin-bottom:8px;">
              ${isEn ? '🧩 Split Numbers' : '🧩 Pecah Angka'}
            </div>
            <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">${isEn ? 'Place Value (Tens & Ones)' : 'Nilai Tempat (Puluhan & Satuan)'}</div>
            <div style="font-size:14px; line-height:1.6;">
              <div>• ${isEn ? 'Tens: ' : 'Puluhan: '} ${Math.floor(a/10)*10} + ${Math.floor(b/10)*10} = ${Math.floor(a/10)*10 + Math.floor(b/10)*10}</div>
              <div>• ${isEn ? 'Ones: ' : 'Satuan: '} ${a%10} + ${b%10} = ${(a%10)+(b%10)}</div>
              <div style="font-weight:800; color:var(--teal); margin-top:6px;">
                Total = ${sol.sum}
              </div>
            </div>
          </div>
  
          <!-- 2. Bikin 100 -->
          <div class="compare-card">
            <div style="font-size:16px; font-weight:800; color:#e67e22; margin-bottom:8px;">
              ${isEn ? ('🔟 Make ' + sol.makeHundred.target) : '🔟 Bikin 100'}
            </div>
            <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">${isEn ? 'Round to Hundred' : 'Genapkan Angka Bulat'}</div>
            <div style="font-size:14px; line-height:1.6;">
              <div>• ${isEn ? `${a} needs ${sol.makeHundred.need} to reach ${sol.makeHundred.target}` : `${a} butuh ${sol.makeHundred.need} menuju ${sol.makeHundred.target}`}</div>
              <div>• ${isEn ? `Remaining from partner: ${sol.makeHundred.remainingB}` : `Sisa teman: ${sol.makeHundred.remainingB}`}</div>
              <div style="font-weight:800; color:#e67e22; margin-top:6px;">
                ${sol.makeHundred.target} + ${sol.makeHundred.remainingB} = ${sol.sum}
              </div>
            </div>
          </div>
  
          <!-- 3. Kompensasi -->
          <div class="compare-card">
            <div style="font-size:16px; font-weight:800; color:var(--green); margin-bottom:8px;">
              ${isEn ? '⚖️ Compensation' : '⚖️ Kompensasi'}
            </div>
            <div style="font-size:13px; color:var(--muted); margin-bottom:12px;">${isEn ? 'Round & Give Back' : 'Bulatkan & Kembalikan'}</div>
            <div style="font-size:14px; line-height:1.6;">
              <div>• ${isEn ? `${sol.compensation.roundedNum} rounded to ${sol.compensation.roundValue}` : `${sol.compensation.roundedNum} dijadikan ${sol.compensation.roundValue}`}</div>
              <div>• ${sol.compensation.baseNum} + ${sol.compensation.roundValue} = ${sol.compensation.intermediateSum}</div>
              <div style="font-weight:800; color:var(--green); margin-top:6px;">
                ${sol.compensation.intermediateSum} - ${sol.compensation.diff} = ${sol.sum}
              </div>
            </div>
          </div>
        </div>
      `;
    }
  
    renderPracticeSection() {
      const state = appState.get();
      const lang = state.lang || 'id';
      const isEn = lang === 'en';
      const p = MATH_DATA.practiceProblems[this.currentPracticeIndex];
  
      const currentStory = (isEn && p.storyEn) ? p.storyEn : p.story;
      const currentHints = (isEn && p.hintsEn) ? p.hintsEn : p.hints;
  
      return `
        <div class="section" style="margin-top:40px;">
          <div class="eyebrow"><span class="no">⚡</span><span class="lbl">${t('practiceTurboBadge', lang)}</span></div>
          <h3 style="font-size:22px; font-weight:850; margin:0 0 16px;">${t('practiceHeader', lang)}</h3>
  
          <div class="quiz-box">
            <div style="font-size:12px; color:var(--muted); margin-bottom:6px;">
              ${t('practiceQuestionPrefix', lang)} ${this.currentPracticeIndex + 1} ${t('of', lang)} ${MATH_DATA.practiceProblems.length}
            </div>
            <div class="quiz-question">${currentStory}</div>
            <div style="font-size:28px; font-weight:900; color:var(--teal); margin-bottom:18px;">
              ${p.question}
            </div>
  
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:16px; flex-wrap:wrap;">
              <input type="number" id="practiceAnswerInput" class="math-num-input" style="width:140px; height:52px;" placeholder="${t('answerPlaceholder', lang)}" ${this.practiceAnswered ? 'disabled' : ''}>
              <button class="btn primary" id="btnSubmitPractice" type="button" ${this.practiceAnswered ? 'disabled' : ''}>
                ${t('checkAnswer', lang)}
              </button>
              <button class="btn" id="btnMathHint" type="button">
                ${t('hintLabel', lang)} (${this.practiceHintLevel}/3)
              </button>
            </div>
  
            <!-- Numeric Keypad Ramah Anak di Tablet -->
            <div class="num-keypad">
              ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '⌫'].map(k => `
                <button class="keypad-btn" data-key="${k}" type="button">${k}</button>
              `).join('')}
            </div>
  
            <!-- Panel Petunjuk Progresif 3 Tingkat -->
            <div class="hint-panel ${this.practiceHintLevel > 0 ? 'show' : ''}" id="mathHintPanel">
              ${currentHints.slice(0, this.practiceHintLevel).join('<br><br>')}
            </div>
  
            <!-- Feedback Ramah Anak -->
            <div class="feedback-banner" id="mathFeedbackBanner"></div>
  
            <!-- "Mau Lihat Cara Lain?" Callout setelah berhasil -->
            <div class="show-another-way-banner" id="showAnotherWayBanner" style="display:${this.practiceAnswered ? 'block' : 'none'};">
              <h4 style="margin:0 0 6px; font-size:16px; font-weight:850; color:var(--teal);">${t('showAnotherWaySuccess', lang)}</h4>
              <p style="margin:0 0 14px; font-size:13.5px; color:var(--ink);">
                ${t('showAnotherWayPrompt', lang)}
              </p>
              <button class="btn primary" id="btnShowAnotherWay" type="button" style="padding:8px 20px;">
                ${t('showAnotherWayBtn', lang)}
              </button>
            </div>
  
            <!-- Refleksi Metakognisi: "Kenapa kamu pilih cara ini?" -->
            ${this.practiceAnswered ? `
              <div class="metacognition-box">
                <div style="font-size:14px; font-weight:800; color:var(--ink);">
                  💭 ${isEn ? MATH_DATA.metacognition.questionEn : MATH_DATA.metacognition.question}
                </div>
                <div class="meta-options-grid">
                  ${MATH_DATA.metacognition.options.map(opt => `
                    <button class="meta-chip ${this.userMetacognition === opt.id ? 'selected' : ''}" data-meta="${opt.id}" type="button">
                      ${isEn ? opt.textEn : opt.text}
                    </button>
                  `).join('')}
                </div>
              </div>
            ` : ''}
  
            <div style="margin-top:24px; display:flex; justify-content:space-between; align-items:center;">
              <button class="btn" id="btnPrevPractice" type="button" ${this.currentPracticeIndex === 0 ? 'disabled' : ''}>
                ${t('prevQuestion', lang)}
              </button>
              <button class="btn primary" id="btnNextPractice" type="button" ${this.currentPracticeIndex === MATH_DATA.practiceProblems.length - 1 ? 'disabled' : ''}>
                ${t('nextQuestion', lang)}
              </button>
            </div>
          </div>
        </div>
      `;
    }
  
    renderProgressBadges(progress, lang = 'id') {
      const isEn = lang === 'en';
  
      return `
        <div class="section" style="margin-top:36px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:14px;">
            <div>
              <h4 style="margin:0; font-size:17px; font-weight:850;">${t('badgesSectionTitle', lang)}</h4>
              <p style="margin:2px 0 0; font-size:12.5px; color:var(--muted);">${t('badgesSectionSub', lang)}</p>
            </div>
            <span class="subject-badge">${progress.problemsSolved} ${t('problemsSolvedBadge', lang)}</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(160px, 1fr)); gap:12px;">
            ${MATH_DATA.badges.map(b => `
              <div style="background:var(--card); border:1px solid var(--line); border-radius:14px; padding:14px; text-align:center;">
                <div style="font-size:28px;">${b.icon}</div>
                <div style="font-size:13px; font-weight:800; margin-top:6px;">${b.name}</div>
                <div style="font-size:11px; color:var(--muted); margin-top:2px;">${isEn && b.descEn ? b.descEn : b.desc}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  
    attachEvents() {
      // Preset Level Tabs (Kelas 1 SD Filter)
      const levelBtns = this.container.querySelectorAll('.level-pill-btn[data-level]');
      levelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedMathLevel = btn.getAttribute('data-level');
          this.render();
        });
      });
  
      // Concrete Counter Icon Toggle (Benda Riil Koin, Apel, Mobil)
      const counterBtns = this.container.querySelectorAll('.btn-counter-icon');
      counterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.counterIconA = btn.getAttribute('data-icon-a') || '🔴';
          this.counterIconB = btn.getAttribute('data-icon-b') || '🟡';
          this.render();
        });
      });
  
      // Preset Chip clicks
      const chips = this.container.querySelectorAll('.preset-chip');
      chips.forEach(c => {
        c.addEventListener('click', () => {
          const a = parseInt(c.getAttribute('data-a'), 10);
          const b = parseInt(c.getAttribute('data-b'), 10);
          appState.set({ mathA: a, mathB: b });
          this.render();
        });
      });
  
      // Random problem generator button
      const btnRandom = this.container.querySelector('#btnRandomMathProblem');
      if (btnRandom) {
        btnRandom.addEventListener('click', () => {
          const pGen = MathEngine.generateAdditionProblem({ level: Math.floor(Math.random() * 3) + 2 });
          appState.set({ mathA: pGen.a, mathB: pGen.b });
          this.render();
        });
      }
  
      // Smart recommendation quick jump
      const btnJump = this.container.querySelector('#btnJumpRecommended');
      if (btnJump) {
        btnJump.addEventListener('click', () => {
          const method = btnJump.getAttribute('data-method');
          this.viewMode = 'visual';
          appState.set({ activeMathMethod: method });
          MathEngine.recordStrategyExplored(method);
          this.render();
        });
      }
  
      // Mode Switcher buttons
      const btnModeVisual = this.container.querySelector('#btnModeVisual');
      const btnModeCompare = this.container.querySelector('#btnModeCompare');
      if (btnModeVisual && btnModeCompare) {
        btnModeVisual.addEventListener('click', () => {
          this.viewMode = 'visual';
          this.render();
        });
        btnModeCompare.addEventListener('click', () => {
          this.viewMode = 'compare';
          this.render();
        });
      }
  
      // Number Inputs
      const inputA = this.container.querySelector('#inputMathA');
      const inputB = this.container.querySelector('#inputMathB');
      if (inputA && inputB) {
        const updateInputs = () => {
          const a = parseInt(inputA.value, 10) || 0;
          const b = parseInt(inputB.value, 10) || 0;
          appState.set({ mathA: a, mathB: b });
          this.render();
        };
        inputA.addEventListener('change', updateInputs);
        inputB.addEventListener('change', updateInputs);
      }
  
      // Strategy Tabs
      const tabBtns = this.container.querySelectorAll('.method-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const method = btn.getAttribute('data-method');
          this.viewMode = 'visual';
          appState.set({ activeMathMethod: method });
          MathEngine.recordStrategyExplored(method);
          this.render();
        });
      });
  
      // Practice submit & hints
      const p = MATH_DATA.practiceProblems[this.currentPracticeIndex];
      const answerInput = this.container.querySelector('#practiceAnswerInput');
      const submitBtn = this.container.querySelector('#btnSubmitPractice');
      const hintBtn = this.container.querySelector('#btnMathHint');
      const feedbackBanner = this.container.querySelector('#mathFeedbackBanner');
  
      if (hintBtn) {
        hintBtn.addEventListener('click', () => {
          if (this.practiceHintLevel < 3) {
            this.practiceHintLevel++;
          } else {
            this.practiceHintLevel = 1;
          }
          this.render();
        });
      }
  
      if (submitBtn && answerInput) {
        submitBtn.addEventListener('click', () => {
          const userAns = parseInt(answerInput.value, 10);
          if (isNaN(userAns)) return;
  
          if (userAns === p.answer) {
            this.practiceAnswered = true;
            store.completeLesson('matematika:' + p.id);
            MathEngine.recordProblemSolved(p.a, p.b, p.recommended ? p.recommended[0] : 'general');
            feedbackBanner.className = 'feedback-banner success show';
            feedbackBanner.innerHTML = `🎉 <strong>Yesss! ${p.answer}! Tepat Sekali!</strong> Kamu hebat!`;
            this.render();
          } else {
            feedbackBanner.className = 'feedback-banner warning show';
            const diff = Math.abs(userAns - p.answer);
            if (diff <= 3) {
              feedbackBanner.innerHTML = 'Hampir banget! 😄 Coba cek langkah terakhir atau lihat petunjuk!';
            } else {
              feedbackBanner.innerHTML = 'Belum pas 😄 Coba cek kembali bagian puluhan atau satuannya ya!';
            }
          }
        });
      }
  
      // "Show Another Way" Button
      const btnAnotherWay = this.container.querySelector('#btnShowAnotherWay');
      if (btnAnotherWay) {
        btnAnotherWay.addEventListener('click', () => {
          // Set state to flagship or current problem and switch to compare mode
          this.viewMode = 'compare';
          appState.set({ mathA: p.a, mathB: p.b });
          this.render();
          window.scrollTo({ top: 120, behavior: 'smooth' });
        });
      }
  
      // Metacognition chip clicks
      const metaChips = this.container.querySelectorAll('.meta-chip');
      metaChips.forEach(mc => {
        mc.addEventListener('click', () => {
          this.userMetacognition = mc.getAttribute('data-meta');
          this.render();
        });
      });
  
      // Keypad Clicks
      const keypadBtns = this.container.querySelectorAll('.keypad-btn');
      keypadBtns.forEach(kb => {
        kb.addEventListener('click', () => {
          if (!answerInput || this.practiceAnswered) return;
          const key = kb.getAttribute('data-key');
          if (key === 'C') {
            answerInput.value = '';
          } else if (key === '⌫') {
            answerInput.value = answerInput.value.slice(0, -1);
          } else {
            answerInput.value += key;
          }
        });
      });
  
      // Practice Prev/Next
      const prevBtn = this.container.querySelector('#btnPrevPractice');
      const nextBtn = this.container.querySelector('#btnNextPractice');
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          if (this.currentPracticeIndex > 0) {
            this.currentPracticeIndex--;
            this.practiceHintLevel = 0;
            this.practiceAnswered = false;
            this.userMetacognition = null;
            this.render();
          }
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          if (this.currentPracticeIndex < MATH_DATA.practiceProblems.length - 1) {
            this.currentPracticeIndex++;
            this.practiceHintLevel = 0;
            this.practiceAnswered = false;
            this.userMetacognition = null;
            this.render();
          }
        });
      }
  
      // Video Play Buttons (Safe modal + Error 153 resilience)
      const playBtns = this.container.querySelectorAll('.btn-play-video');
      playBtns.forEach(pb => {
        pb.addEventListener('click', () => {
          const title = pb.getAttribute('data-title');
          const url = pb.getAttribute('data-url');
          if (this.videoModal) {
            this.videoModal.open(title, url);
          }
        });
      });
    }
  }
  

  // --- Source: js/components/subject-view.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Subject View Coordinator
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 10:35:00
  // ================================================================
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  class SubjectViewComponent {
    constructor(container, videoModal) {
      this.container = container;
      this.videoModal = videoModal;
      this.globeVis = null;
      this.selectedContinent = 'Semua';
      this.searchCountryQuery = '';
      this.selectedIsland = 'Semua';
      this.searchCityQuery = '';
      this.activeQuizIndex = 0;
      this.activeRegion = 'indonesia';
      this.selectedMapIsland = 'Semua';
    }
  
    render(subjectId) {
      if (this.globeVis) {
        this.globeVis.stopLoop();
        this.globeVis = null;
      }
  
      if (subjectId === 'matematika') {
        const mathView = new MathLessonView(this.container, this.videoModal);
        mathView.render();
        return;
      }
  
      if (subjectId === 'geografi') {
        this.renderGeography();
        return;
      }
  
      // Render 8 mata pelajaran lainnya secara konsisten dan terstruktur
      this.renderGenericSubject(subjectId);
    }
  
    // ==========================================================
    // MODUL GEOGRAFI MANDATORI LENGKAP
    // ==========================================================
    renderGeography() {
      const state = appState.get();
      const lang = state.lang || 'id';
      const activeTab = state.activeGeoTab || 'earth';
      const availableVideos = GEO_DATA.videoSlots.filter(v => v.url && v.url.trim().length > 0);
  
      this.container.innerHTML = `
        <div class="section-header">
          <div class="math-hero-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink); border-color:var(--teal);">
            ${t('geoBadge', lang)}
          </div>
          <h2 class="section-title">${(lang === 'en' && GEO_DATA.titleEn) ? GEO_DATA.titleEn : GEO_DATA.title}</h2>
          <p class="section-sub">${(lang === 'en' && GEO_DATA.subtitleEn) ? GEO_DATA.subtitleEn : GEO_DATA.subtitle}</p>
        </div>
  
        <!-- Tab Sub-Navigasi Geografi (Hierarki: Dunia -> Negara -> Provinsi -> Kota -> Bali -> Kuis) -->
        <div class="geo-nav-tabs" role="tablist">
          <button class="geo-tab-btn ${activeTab === 'earth' ? 'active' : ''}" data-geo-tab="earth" type="button">
            <span>🌐</span> ${t('tabEarth', lang)}
          </button>
          <button class="geo-tab-btn ${activeTab === 'countries' ? 'active' : ''}" data-geo-tab="countries" type="button">
            <span>🗺️</span> ${t('tabCountries', lang)}
          </button>
          <button class="geo-tab-btn ${activeTab === 'provinces' ? 'active' : ''}" data-geo-tab="provinces" type="button">
            <span>🇮🇩</span> ${t('tabProvinces', lang)}
          </button>
          <button class="geo-tab-btn ${activeTab === 'cities' ? 'active' : ''}" data-geo-tab="cities" type="button">
            <span>🏙️</span> ${t('tabCities', lang)}
          </button>
          <button class="geo-tab-btn ${activeTab === 'bali' ? 'active' : ''}" data-geo-tab="bali" type="button">
            <span>🌴</span> ${t('tabBali', lang)}
          </button>
          <button class="geo-tab-btn ${activeTab === 'quizzes' ? 'active' : ''}" data-geo-tab="quizzes" type="button">
            <span>🎯</span> ${t('tabQuizzes', lang)}
          </button>
        </div>
  
        <!-- Area Konten Tab -->
        <div id="geoTabContent">
          ${this.getGeoTabHtml(activeTab, lang)}
        </div>
  
        <!-- 3 Slot Video YouTube Geografi (Otomatis sembunyi jika kosong) -->
        ${availableVideos.length > 0 ? `
          <div class="section" style="margin-top:40px;">
            <div class="eyebrow"><span class="no">▶</span><span class="lbl">${t('videosHeaderEyebrow', lang)}</span></div>
            <h3 style="font-size:20px; font-weight:800; margin:0 0 12px;">${lang === 'en' ? 'Visual Explorations' : 'Eksplorasi Visual'}</h3>
            <div class="video-grid">
              ${availableVideos.map(v => `
                <div class="video-card">
                  <div>
                    <span class="subject-badge">${v.ageFit}</span>
                    <h4 style="margin:8px 0 4px; font-size:15px; font-weight:800;">${v.title}</h4>
                    <p style="margin:0; font-size:12px; color:var(--muted);">${v.description}</p>
                  </div>
                  <button class="btn primary btn-play-video" data-title="${v.title}" data-url="${v.url}" type="button">
                    ${t('playVideo', lang)}
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
  
        <!-- Metadata Box Sumber Resmi -->
        <div class="metadata-source-box">
          <strong>${t('geoSourceTitle', lang)}</strong> ${GEO_DATA.metadata.source}<br>
          <strong>${t('curationStatus', lang)}</strong> ${lang === 'en' ? 'Verified as of' : 'Diverifikasi per'} ${GEO_DATA.metadata.reviewedAt} ${lang === 'en' ? 'by' : 'oleh'} ${GEO_DATA.metadata.curator}.<br>
          <strong>${t('scopeLabel', lang)}</strong> ${GEO_DATA.metadata.scope}
        </div>
      `;
  
      this.attachGeoEvents();
  
      if (activeTab === 'earth') {
        const canvas = this.container.querySelector('#globeCanvas');
        const overlay = this.container.querySelector('#globeOverlay');
        if (canvas) {
          this.globeVis = new GlobeVisualizer(canvas, overlay);
          this.globeVis.startLoop();
        }
      } else if (activeTab === 'quizzes') {
        this.renderSelectedQuiz();
      }
    }
  
    getGeoTabHtml(tab, lang = 'id') {
      switch (tab) {
        case 'earth':
          return `
            <div class="globe-stage-card">
              <div class="globe-canvas-wrap">
                <div class="globe-canvas-stack">
                  <canvas id="globeCanvas" width="720" height="720"></canvas>
                  <canvas id="globeOverlay" width="720" height="720"></canvas>
                </div>
                <div class="globe-controls">
                  <button class="btn" id="btnGlobeRotateLeft" type="button">${t('rotateLeft', lang)}</button>
                  <button class="btn" id="btnGlobeAutoRotate" type="button">${t('autoRotate', lang)}</button>
                  <button class="btn" id="btnGlobeRotateRight" type="button">${t('rotateRight', lang)}</button>
                  <button class="btn primary" id="btnGlobeFocusIndonesia" type="button">${t('focusIndonesia', lang)}</button>
                  <div class="globe-zoom-group">
                    <button class="iconbtn" id="btnGlobeZoomIn" type="button" aria-label="${t('zoomIn', lang)}" title="${t('zoomIn', lang)}">➕</button>
                    <button class="iconbtn" id="btnGlobeZoomOut" type="button" aria-label="${t('zoomOut', lang)}" title="${t('zoomOut', lang)}">➖</button>
                  </div>
                </div>
                <div class="globe-touch-tip">
                  ${t('globeTouchTip', lang)}
                </div>
              </div>
  
              <div class="globe-info-copy">
                <span class="globe-shape-badge">
                  <span>🪐</span> ${t('earthShapeBadge', lang)}
                </span>
                <h3>${(lang === 'en' && GEO_DATA.earthIntro.headingEn) ? GEO_DATA.earthIntro.headingEn : GEO_DATA.earthIntro.heading}</h3>
                <p style="font-size:14px; color:var(--muted); line-height:1.65;">
                  ${(lang === 'en' && GEO_DATA.earthIntro.explanationEn) ? GEO_DATA.earthIntro.explanationEn : GEO_DATA.earthIntro.explanation}
                </p>
  
                <div class="globe-highlight-list">
                  ${GEO_DATA.earthIntro.highlights.map(h => `
                    <div class="globe-highlight-item">
                      <span class="icon">${h.icon}</span>
                      <div>
                        <strong>${(lang === 'en' && h.titleEn) ? h.titleEn : h.title}</strong>
                        <p>${(lang === 'en' && h.descEn) ? h.descEn : h.desc}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
  
            <!-- PUSAT JELAJAH PETA & KAWASAN REGIONAL (Peta Indonesia, Bali, Benua Asia/Eropa/dll) -->
            <div class="geo-region-explorer-section" style="margin-top:32px;">
              <div class="interactive-map-header">
                <div>
                  <div class="eyebrow"><span class="no">📍</span><span class="lbl">${lang === 'en' ? 'Interactive Regional Map Explorer' : 'Pusat Jelajah Peta & Kawasan Interaktif'}</span></div>
                  <h3 class="interactive-map-title">${lang === 'en' ? 'Explore Indonesia, Bali, & Continents' : 'Jelajahi Peta Indonesia, Bali, & Benua Dunia'}</h3>
                  <p style="font-size:13.5px; color:var(--muted); margin:4px 0 0;">
                    ${lang === 'en' ? 'Select a region below to inspect detailed maps, key landmarks, cultural facts, and orient the 3D globe.' : 'Pilih kawasan di bawah untuk melihat peta detail, landmark ikonik, fakta budaya, dan putar globe 3D langsung ke wilayah tersebut.'}
                  </p>
                </div>
              </div>
  
              <div class="geo-region-filter-bar">
                <button class="region-chip ${(this.activeRegion || 'indonesia') === 'indonesia' ? 'active' : ''}" data-region="indonesia" type="button">
                  🇮🇩 ${lang === 'en' ? 'Indonesia Map (38 Prov)' : 'Peta Indonesia (38 Prov)'}
                </button>
                <button class="region-chip ${this.activeRegion === 'bali' ? 'active' : ''}" data-region="bali" type="button">
                  🏝️ ${lang === 'en' ? 'Bali Island Map' : 'Peta Pulau Bali'}
                </button>
                <button class="region-chip ${this.activeRegion === 'asia' ? 'active' : ''}" data-region="asia" type="button">
                  🌏 ${lang === 'en' ? 'Asia Continent' : 'Benua Asia'}
                </button>
                <button class="region-chip ${this.activeRegion === 'europe' ? 'active' : ''}" data-region="europe" type="button">
                  🏰 ${lang === 'en' ? 'Europe Continent' : 'Benua Eropa'}
                </button>
                <button class="region-chip ${this.activeRegion === 'africa' ? 'active' : ''}" data-region="africa" type="button">
                  🦁 ${lang === 'en' ? 'Africa Continent' : 'Benua Afrika'}
                </button>
                <button class="region-chip ${this.activeRegion === 'americas' ? 'active' : ''}" data-region="americas" type="button">
                  🗽 ${lang === 'en' ? 'Americas Continent' : 'Benua Amerika'}
                </button>
                <button class="region-chip ${this.activeRegion === 'oceania' ? 'active' : ''}" data-region="oceania" type="button">
                  🦘 ${lang === 'en' ? 'Oceania Continent' : 'Benua Oseania'}
                </button>
                <button class="region-chip ${this.activeRegion === 'world' ? 'active' : ''}" data-region="world" type="button">
                  🌍 ${lang === 'en' ? 'All Continents & Oceans' : 'Seluruh Benua & Samudra'}
                </button>
              </div>
  
              <div id="geoRegionContent" class="geo-region-content">
                ${this.getRegionContentHtml(this.activeRegion || 'indonesia', lang)}
              </div>
            </div>
          `;
  
  
        case 'countries': {
          let list = GeoEngine.getCountriesByContinent(this.selectedContinent);
          if (this.searchCountryQuery) {
            const q = this.searchCountryQuery.trim().toLowerCase();
            list = list.filter(c =>
              c.name.toLowerCase().includes(q) ||
              c.nameEn.toLowerCase().includes(q) ||
              c.capital.toLowerCase().includes(q) ||
              c.continent.toLowerCase().includes(q) ||
              c.currency.toLowerCase().includes(q) ||
              c.landmark.toLowerCase().includes(q)
            );
          }
          const continents = ['Semua', 'Asia', 'Eropa', 'Afrika', 'Amerika Utara', 'Amerika Selatan', 'Oseania'];
  
          return `
            <div class="filter-bar" style="flex-direction:column; align-items:stretch; gap:16px;">
              <div class="search-input-box" style="width:100%;">
                <span class="search-icon">🔍</span>
                <input type="text" id="countrySearchInput" placeholder="${t('searchCountryPlaceholder', lang)}" value="${this.searchCountryQuery}">
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <div class="island-chips">
                  ${continents.map(c => `
                    <button class="chip-btn ${this.selectedContinent === c ? 'active' : ''}" data-continent="${c}" type="button">
                      ${c === 'Semua' ? t('continentAll', lang) :
                        c === 'Asia' ? t('continentAsia', lang) :
                        c === 'Eropa' ? t('continentEurope', lang) :
                        c === 'Afrika' ? t('continentAfrica', lang) :
                        c === 'Amerika Utara' ? t('continentNorthAmerica', lang) :
                        c === 'Amerika Selatan' ? t('continentSouthAmerica', lang) :
                        t('continentOceania', lang)}
                    </button>
                  `).join('')}
                </div>
                <div style="font-weight:800; font-size:13px; color:var(--teal);">
                  ${t('foundCountriesPrefix', lang)} ${list.length} ${t('countriesCountSuffix', lang)}
                </div>
              </div>
            </div>
  
            <div class="country-grid">
              ${list.map(c => `
                <div class="country-card">
                  <div>
                    <div class="country-card-header">
                      <span class="country-flag-icon">${c.flag}</span>
                      <span class="subject-badge">${c.continent}</span>
                    </div>
                    <h4 class="country-name">${c.name} <span class="country-en-sub">(${c.nameEn})</span></h4>
                    
                    <div class="country-info-row">
                      <span>🏛️ ${t('capitalLabel', lang)}</span>
                      <strong>${c.capital}</strong>
                    </div>
                    <div class="country-info-row">
                      <span>💰 ${t('currencyLabel', lang)}</span>
                      <strong>${c.currency}</strong>
                    </div>
                    <div class="country-info-row">
                      <span>🗣️ ${t('languageLabel', lang)}</span>
                      <span>${c.language}</span>
                    </div>
                    <div class="country-landmark-box">
                      <span class="landmark-tag">📍 ${t('landmarkLabel', lang)}</span>
                      <p class="landmark-text">${c.landmark}</p>
                    </div>
                    <div class="country-fun-fact">
                      <span class="fact-badge">${t('countryFunFactBadge', lang)}</span>
                      <p>${c.funFact}</p>
                    </div>
                  </div>
                  <button class="btn primary btn-focus-country-globe" data-lon="${c.coords[0]}" data-lat="${c.coords[1]}" data-name="${c.name} ${c.flag}" type="button">
                    ${t('focusOnGlobeBtn', lang)}
                  </button>
                </div>
              `).join('')}
            </div>
          `;
        }
  
        case 'provinces':
          const provinces = GeoEngine.getProvincesByIsland(this.selectedIsland);
          const islands = ['Semua', 'Sumatra', 'Jawa', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Kepulauan Maluku', 'Papua'];
  
          return `
            <div class="filter-bar">
              <div class="island-chips">
                ${islands.map(isl => `
                  <button class="chip-btn ${this.selectedIsland === isl ? 'active' : ''}" data-island="${isl}" type="button">
                    ${isl}
                  </button>
                `).join('')}
              </div>
              <div style="font-weight:800; font-size:13px; color:var(--teal);">
                ${t('showingProvincesPrefix', lang)} ${provinces.length} ${t('provincesCountSuffix', lang)}
              </div>
            </div>
  
            <div class="provinces-grid">
              ${provinces.map(p => `
                <div class="province-card">
                  <div>
                    <div class="province-header">
                      <span style="font-size:24px;">${p.icon}</span>
                      <span class="subject-badge">${p.island}</span>
                    </div>
                    <h4 class="province-name">${p.name}</h4>
                    <div class="capital-row">
                      <span>🏛️ ${t('capitalLabel', lang)}</span>
                      <strong>${p.capital}</strong>
                    </div>
                    <p class="province-fact">💡 ${p.funFact}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
  
        case 'cities':
          const cities = GeoEngine.getNonCapitalCities(this.searchCityQuery);
  
          return `
            <div style="background:var(--accent-soft); border:1px solid var(--accent); border-radius:14px; padding:14px 18px; margin-bottom:20px; font-size:13px; color:var(--accent-ink); line-height:1.6;">
              ${t('cityDisclaimer', lang)}
            </div>
  
            <div class="filter-bar">
              <div class="search-input-box">
                <span class="search-icon">🔍</span>
                <input type="text" id="citySearchInput" placeholder="${t('searchCityPlaceholder', lang)}" value="${this.searchCityQuery}">
              </div>
              <div style="font-size:13px; font-weight:800; color:var(--teal);">
                ${t('foundCitiesPrefix', lang)} ${cities.length} ${t('citiesSuffix', lang)}
              </div>
            </div>
  
            <div class="provinces-grid">
              ${cities.map(c => `
                <div class="province-card" style="${c.name === 'Malang' ? 'border: 2px solid var(--teal); background: var(--teal-soft);' : ''}">
                  <div>
                    <div class="province-header">
                      <span style="font-size:24px;">${c.icon}</span>
                      <span class="subject-badge" style="background:#ffb21b; color:#0e2e48;">${t('nonCapitalBadge', lang)}</span>
                    </div>
                    <h4 class="province-name" style="color:${c.name === 'Malang' ? 'var(--teal-soft-ink)' : 'inherit'};">
                      ${c.name} ${c.name === 'Malang' ? t('mandatoryExampleBadge', lang) : ''}
                    </h4>
                    <div class="capital-row">
                      <span>📍 ${t('partOfProvince', lang)}</span>
                      <strong>${c.province} (${c.island})</strong>
                    </div>
                    <p class="province-fact">✨ ${c.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
  
        case 'bali':
          const bali = GEO_DATA.baliModule;
  
          return `
            <div class="bali-header-banner">
              <span class="pill" style="background:rgba(255,255,255,0.2); margin-bottom:10px;">
                ${t('specialBaliPill', lang)}
              </span>
              <h3 style="font-size:24px; font-weight:850; margin:6px 0 8px;">${(lang === 'en' && bali.titleEn) ? bali.titleEn : bali.title}</h3>
              <p style="font-size:14px; margin:0; opacity:0.95; line-height:1.6;">${(lang === 'en' && bali.descriptionEn) ? bali.descriptionEn : bali.description}</p>
            </div>
  
            <div class="bali-grid">
              ${bali.regions.map(r => `
                <div class="bali-region-card">
                  <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                    <span class="region-type">${r.type}</span>
                    <span style="font-size:22px;">${r.icon}</span>
                  </div>
                  <h4>${r.name}</h4>
                  <div class="bali-gov-center">
                    🏛️ ${t('govCenterLabel', lang)} <strong>${r.capital}</strong>
                  </div>
                  <p style="margin:8px 0 0; font-size:12.5px; color:var(--muted); line-height:1.55;">
                    ${r.highlight}
                  </p>
                </div>
              `).join('')}
            </div>
          `;
  
        case 'quizzes':
          return `
            <div style="display:flex; gap:8px; margin-bottom:20px; flex-wrap:wrap;">
              ${GEO_DATA.quizzes.map((qz, idx) => `
                <button class="btn ${this.activeQuizIndex === idx ? 'primary' : ''} btn-select-quiz" data-idx="${idx}" type="button">
                  ${qz.title}
                </button>
              `).join('')}
            </div>
            <div id="quizContainer"></div>
          `;
  
        default:
          return '';
      }
    }
  
    getRegionContentHtml(region, lang = 'id') {
      const isEn = lang === 'en';
      switch (region) {
        case 'indonesia': {
          const island = this.selectedMapIsland || 'Semua';
          const normIsland = island.toLowerCase().replace('sumatera', 'sumatra');
          let list = GEO_DATA.provinces || [];
          if (island !== 'Semua') {
            if (island === 'Maluku & Papua') {
              list = list.filter(p => p.island === 'Kepulauan Maluku' || p.island === 'Papua');
            } else {
              list = list.filter(p => p.island.toLowerCase().includes(normIsland));
            }
          }
          const islands = [
            { id: 'Semua', name: isEn ? 'All Archipelago (38)' : 'Semua Nusantara (38)', count: 38 },
            { id: 'Sumatra', name: 'Sumatera', count: 10 },
            { id: 'Jawa', name: 'Jawa', count: 6 },
            { id: 'Kalimantan', name: 'Kalimantan', count: 5 },
            { id: 'Sulawesi', name: 'Sulawesi', count: 6 },
            { id: 'Bali & Nusa Tenggara', name: 'Bali & Nusa Tenggara', count: 3 },
            { id: 'Maluku & Papua', name: 'Maluku & Papua', count: 8 }
          ];
  
          return `
            <div class="interactive-map-panel">
              <div class="interactive-map-header">
                <div>
                  <h4 class="interactive-map-title">
                    🇮🇩 ${isEn ? 'Republic of Indonesia — 2D Interactive Map (38 Provinces)' : 'Peta 2D Interaktif Indonesia — 38 Provinsi & Kepulauan'}
                  </h4>
                  <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">
                    ${isEn ? 'Click on any island on the vector map or choose a button below to explore provinces and unique facts.' : 'Sentuh atau klik pulau pada peta vektor 2D di bawah ini untuk menjelajahi keunikan dan ibu kota provinsi.'}
                  </p>
                </div>
                <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:var(--teal-soft); color:var(--teal-soft-ink); font-weight:700;">
                  🗺️ ${isEn ? '2D Vector Atlas' : 'Peta Vektor 2D Interaktif'}
                </span>
              </div>
  
              <!-- Visual 2D SVG Map of Indonesia (Authentic Administrative Boundaries) -->
              <div class="peta-2d-canvas-box" style="margin-bottom:16px;">
                <svg class="svg-map-frame" viewBox="0 0 700 234" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                  <!-- Lautan / Background perairan -->
                  <rect width="700" height="234" rx="14" fill="currentColor" style="color:var(--surface); opacity:0.6;"/>
                  <defs>
                    <linearGradient id="oceanGradId" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
                      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.22"/>
                    </linearGradient>
                  </defs>
                  <rect width="700" height="234" rx="14" fill="url(#oceanGradId)"/>
  
                  <!-- Garis Khatulistiwa 0 Derajat -->
                  <line x1="10" y1="82" x2="690" y2="82" stroke="#ef4444" stroke-width="1.2" stroke-dasharray="5,3" opacity="0.65"/>
                  <text x="18" y="78" fill="#ef4444" font-size="9" font-weight="750" letter-spacing="0.8">GARIS KHATULISTIWA (EQUATOR 0°)</text>
  
                  <!-- Arah Mata Angin Kompas -->
                  <g transform="translate(675, 24)" opacity="0.8">
                    <circle cx="0" cy="0" r="14" fill="var(--card)" stroke="var(--line)" stroke-width="1.2"/>
                    <path d="M 0 -9 L 3 0 L 0 2 L -3 0 Z" fill="#ef4444"/>
                    <path d="M 0 9 L 3 0 L 0 2 L -3 0 Z" fill="var(--muted)"/>
                    <text x="0" y="-10.5" text-anchor="middle" font-size="7.5" font-weight="900" fill="#ef4444">U</text>
                  </g>
  
                  <!-- 34 Authentic Administrative Provinces -->
                  ${REAL_INDONESIA_PATHS.map(p => {
                    const isMatch = island === 'Semua' || (island === 'Maluku & Papua' ? (p.island === 'Maluku' || p.island === 'Papua') : p.island.toLowerCase().includes(normIsland));
                    const cls = `svg-province-interactive ${isMatch && island !== 'Semua' ? 'active-province' : ''}`;
                    const stroke = isMatch && island !== 'Semua' ? '#ffb21b' : '#ffffff';
                    const strokeWidth = isMatch && island !== 'Semua' ? '1.5' : '0.6';
                    const opacity = isMatch ? '1' : '0.45';
                    return `
                      <path class="${cls}"
                            data-province-name="${p.name}"
                            data-province-island="${p.island}"
                            d="${p.d}"
                            fill="${p.color}"
                            stroke="${stroke}"
                            stroke-width="${strokeWidth}"
                            opacity="${opacity}">
                        <title>${p.name} (${p.island})</title>
                      </path>
                    `;
                  }).join('')}
  
                  <!-- Label Kepulauan Utama -->
                  <text x="80" y="110" font-size="9.5" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">SUMATERA</text>
                  <text x="215" y="200" font-size="9.5" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">JAWA</text>
                  <text x="270" y="80" font-size="9.5" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">KALIMANTAN</text>
                  <text x="370" y="105" font-size="9" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">SULAWESI</text>
                  <text x="300" y="215" font-size="8" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">BALI & NT</text>
                  <text x="475" y="115" font-size="8.5" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">MALUKU</text>
                  <text x="590" y="150" font-size="10.5" font-weight="800" fill="var(--ink)" opacity="0.85" style="pointer-events:none; text-shadow:0 1px 2px #fff;">PAPUA</text>
                </svg>
  
                <!-- Legend Bar di Bawah Peta 2D -->
                <div class="peta-2d-legend-bar">
                  <span>💡 <strong>Tips:</strong> Klik batas provinsi langsung pada peta di atas untuk menjelajahi profilnya.</span>
                  <span>🇮🇩 <strong>Atlas Vektor Asli:</strong> 34 Batas Provinsi Resmi · Garis Khatulistiwa · 3 Zona Waktu</span>
                </div>
              </div>
  
              <!-- Filter Kepulauan Indonesia -->
              <div class="island-nav-grid">
                ${islands.map(isl => `
                  <button class="island-card-btn ${island === isl.id ? 'active' : ''}" data-map-island="${isl.id}" type="button">
                    <strong>🏝️ ${isl.name}</strong>
                    <span>${isl.count} ${isEn ? 'Provinces' : 'Provinsi'}</span>
                  </button>
                `).join('')}
              </div>
  
              <!-- Ringkasan Wilayah Terpilih -->
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <span style="font-size:13.5px; font-weight:700; color:var(--ink);">
                  ${isEn ? 'Displaying' : 'Menampilkan'}: <span style="color:var(--teal); font-weight:800;">${island}</span> (${list.length} ${isEn ? 'provinces' : 'provinsi'})
                </span>
              </div>
  
              <!-- Grid Provinsi Indonesia (Bersih tanpa undefined & tanpa tombol link globe) -->
              <div class="provinces-grid">
                ${list.map((p, idx) => `
                  <div class="province-card" id="provCard_${p.id}" data-province-name="${p.name}">
                    <div>
                      <div class="province-header">
                        <span class="province-no" style="font-size:22px; display:inline-flex; align-items:center; justify-content:center; width:38px; height:38px; background:var(--surface); border-radius:50%;">
                          ${p.icon || '🏛️'}
                        </span>
                        <span class="subject-badge">${p.island}</span>
                      </div>
                      <h4 class="province-name">${p.name}</h4>
                      <div class="capital-row">
                        <span>🏛️ ${isEn ? 'Capital City' : 'Ibu Kota'}:</span>
                        <strong>${p.capital}</strong>
                      </div>
                      <div class="country-landmark-box" style="margin-top:10px;">
                        <span class="landmark-tag">✨ ${isEn ? 'Unique Fact' : 'Fakta Unik & Ciri Khas'}</span>
                        <p class="landmark-text" style="font-size:12.5px; line-height:1.55; margin:4px 0 0;">${p.funFact}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }
  
        case 'bali': {
          const bali = GEO_DATA.baliModule;
          const landmarks = [
            { name: 'Pura Tanah Lot', reg: 'Tabanan', icon: '🌊', desc: isEn ? 'Ancient sea temple perched on an offshore rock formation with spectacular sunset views.' : 'Pura suci di atas batu karang lepas pantai dengan pemandangan matahari terbenam memukau.' },
            { name: 'Pura Luhur Uluwatu', reg: 'Badung', icon: '🌅', desc: isEn ? 'Cliffside temple 70 meters above the Indian Ocean, famous for evening Kecak fire dance.' : 'Pura megah di puncak tebing karang curam 70 meter di atas Samudra Hindia dengan Tari Kecak api.' },
            { name: 'Pura Agung Besakih', reg: 'Karangasem', icon: '⛰️', desc: isEn ? 'The Mother Temple of Bali nestled on the slopes of sacred Mount Agung (3,142m).' : 'Ibu dari seluruh Pura di Bali yang berdiri kokoh dan anggun di lereng Gunung Agung.' },
            { name: 'Danau & Pura Ulun Danu Beratan', reg: 'Tabanan (Bedugul)', icon: '🌸', desc: isEn ? 'Picturesque water temple located on the tranquil shores of Lake Beratan in cool Bedugul.' : 'Pura danau yang tampak terapung di Danau Beratan dengan udara pegunungan Bedugul yang sejuk.' },
            { name: 'Terasering Sawah Jatiluwih', reg: 'Tabanan', icon: '🌾', desc: isEn ? 'UNESCO World Heritage terraced rice fields preserved with the thousand-year Subak cooperative water system.' : 'Hamparan sawah berundak spektakuler Warisan Budaya Dunia UNESCO dengan sistem irigasi Subak.' },
            { name: 'Pura Tirta Empul', reg: 'Gianyar (Tampaksiring)', icon: '💧', desc: isEn ? 'Sacred water spring temple where worshippers take holy cleansing baths (Melukat).' : 'Pura mata air suci yang digunakan untuk ritual penyucian diri dan ketenangan jiwa (Melukat).' },
            { name: 'Mandala Suci Wenara Wana (Monkey Forest)', reg: 'Gianyar (Ubud)', icon: '🐒', desc: isEn ? 'Sacred monkey sanctuary in Ubud enveloped by dense tropical banyan forests and historic temples.' : 'Kawasan hutan suci di Ubud yang dihuni ratusan kera abu-abu ramah dan pohon beringin rimbun.' }
          ];
  
          return `
            <div class="interactive-map-panel">
              <div class="interactive-map-header">
                <div>
                  <h4 class="interactive-map-title">
                    🏝️ ${isEn ? 'Island of Bali — 2D Interactive Map (8 Regencies & 1 City)' : 'Peta 2D Interaktif Pulau Bali — 8 Kabupaten & 1 Kota Madya'}
                  </h4>
                  <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">
                    ${isEn ? 'Explore the Island of Gods by clicking regencies or landmark pins directly on the 2D map below.' : 'Jelajahi Pulau Dewata dengan mengklik kabupaten atau pin landmark langsung pada peta 2D di bawah.'}
                  </p>
                </div>
                <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:linear-gradient(135deg, #ffedd5, #fed7aa); color:#9a3412; font-weight:800;">
                  🌺 Peta Vektor 2D Bali
                </span>
              </div>
  
              <!-- Visual 2D SVG Map of Bali (Authentic Regency Boundaries) -->
              <div class="peta-2d-canvas-box" style="margin-bottom:20px;">
                <svg class="svg-map-frame" viewBox="0 0 760 480" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                  <!-- Lautan sekeliling Bali -->
                  <rect width="760" height="480" rx="16" fill="currentColor" style="color:var(--surface); opacity:0.6;"/>
                  <defs>
                    <linearGradient id="baliOceanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.1"/>
                      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.2"/>
                    </linearGradient>
                    <filter id="baliShadow" x="-5%" y="-5%" width="120%" height="120%">
                      <feDropShadow dx="1" dy="2" stdDeviation="2.5" flood-opacity="0.2"/>
                    </filter>
                  </defs>
                  <rect width="760" height="480" rx="16" fill="url(#baliOceanGrad)"/>
  
                  <!-- Label Lautan & Selat -->
                  <text x="380" y="38" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle" letter-spacing="2">LAUT BALI (UTARA)</text>
                  <text x="35" y="240" font-size="11" font-weight="700" fill="var(--muted)" text-anchor="middle" transform="rotate(-90 35 240)" letter-spacing="1">SELAT BALI (BARAT)</text>
                  <text x="730" y="240" font-size="11" font-weight="700" fill="var(--muted)" text-anchor="middle" transform="rotate(90 730 240)" letter-spacing="1">SELAT LOMBOK (TIMUR)</text>
                  <text x="380" y="470" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle" letter-spacing="2">SAMUDRA HINDIA (SELATAN)</text>
  
                  <!-- 9 Authentic Regencies & City -->
                  ${REAL_BALI_PATHS.map(r => `
                    <g class="svg-regency-interactive" data-regency="${r.name}" filter="url(#baliShadow)">
                      <path d="${r.d}" fill="${r.color}" stroke="#ffffff" stroke-width="1.6"/>
                      <text x="${r.cx}" y="${r.cy}" font-size="12" font-weight="800" fill="#0f172a" text-anchor="middle" style="pointer-events:none; text-shadow:0 1px 4px rgba(255,255,255,0.95);">${r.name}</text>
                      <title>${r.name} - Klik untuk melihat profil</title>
                    </g>
                  `).join('')}
  
                  <!-- Pin Landmark Ikonik Bali (Calibrated to Authentic Coastline) -->
                  ${landmarks.map((lm, idx) => {
                    const pinCoords = [
                      { x: 350, y: 292 }, // 1. Tanah Lot
                      { x: 395, y: 442 }, // 2. Uluwatu
                      { x: 585, y: 185 }, // 3. Besakih
                      { x: 380, y: 155 }, // 4. Danau Beratan
                      { x: 350, y: 195 }, // 5. Jatiluwih
                      { x: 505, y: 215 }, // 6. Tirta Empul
                      { x: 480, y: 265 }  // 7. Ubud Monkey Forest
                    ][idx] || { x: 400, y: 250 };
                    return `
                      <g class="svg-landmark-pin" data-landmark="${lm.name}" transform="translate(${pinCoords.x}, ${pinCoords.y})">
                        <circle cx="0" cy="0" r="10" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
                        <text x="0" y="3.5" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle">${idx + 1}</text>
                        <title>${idx + 1}. ${lm.name} (${lm.reg})</title>
                      </g>
                    `;
                  }).join('')}
                </svg>
  
                <!-- Legend Bar Bali -->
                <div class="peta-2d-legend-bar">
                  <span>📍 <strong>Pin Merah 1–7:</strong> Landmark Terkenal (1.Tanah Lot · 2.Uluwatu · 3.Besakih · 4.Bedugul · 5.Jatiluwih · 6.Tirta Empul · 7.Monkey Forest)</span>
                  <span>🌺 <strong>Kearifan:</strong> Tri Hita Karana & Sistem Subak UNESCO</span>
                </div>
              </div>
  
              <!-- 8 Kabupaten + 1 Kota Grid (Bersih tanpa undefined) -->
              <div class="eyebrow" style="margin-top:16px;">
                <span class="no">🏛️</span>
                <span class="lbl">${isEn ? '8 Regencies & 1 Administrative City in Bali' : 'Daftar 8 Kabupaten & 1 Kota Madya di Bali'}</span>
              </div>
              <div class="bali-grid" style="margin-top:10px;">
                ${bali.regions.map(r => `
                  <div class="bali-region-card" id="baliCard_${r.name.replace(/\s+/g, '_')}" data-regency="${r.name}">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                      <span class="region-type">${r.type}</span>
                      <span style="font-size:24px;">${r.icon}</span>
                    </div>
                    <h4 style="margin:4px 0 6px;">${r.name}</h4>
                    <div class="bali-gov-center">
                      🏛️ ${t('govCenterLabel', lang)}: <strong>${r.capital}</strong>
                    </div>
                    <p style="margin:8px 0 0; font-size:12.5px; color:var(--muted); line-height:1.55;">
                      ${r.highlight}
                    </p>
                  </div>
                `).join('')}
              </div>
  
              <!-- Landmark Ikonik Bali Explorer -->
              <div class="eyebrow" style="margin-top:28px;">
                <span class="no">📍</span>
                <span class="lbl">${isEn ? '7 Iconic Bali Landmarks & World Heritage' : '7 Destinasi Landmark Ikonik & Warisan Dunia di Bali'}</span>
              </div>
              <div class="bali-landmarks-grid">
                ${landmarks.map((lm, idx) => `
                  <div class="bali-landmark-item" id="landmarkCard_${idx + 1}">
                    <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                      <span style="font-size:22px;">${lm.icon}</span>
                      <h5 style="margin:0; font-size:14.5px; font-weight:800;">${lm.name}</h5>
                    </div>
                    <span class="subject-badge" style="font-size:11px; margin-bottom:8px; display:inline-block;">📍 ${lm.reg}</span>
                    <p style="margin:0; font-size:12.5px; color:var(--muted); line-height:1.5;">${lm.desc}</p>
                  </div>
                `).join('')}
              </div>
  
              <!-- Budaya & Tradisi Luhur Bali -->
              <div class="continent-stats-banner" style="margin-top:24px; background:linear-gradient(135deg, rgba(230,81,0,0.08), rgba(255,178,27,0.12)); border:1px solid #ffb21b;">
                <h4 style="margin:0 0 10px; font-size:16px; font-weight:800; color:var(--ink);">🌺 ${isEn ? 'Balinese Wisdom & Living Traditions' : 'Kearifan Lokal & Seni Budaya Luhur Bali'}</h4>
                <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:12px; font-size:12.5px; color:var(--muted);">
                  <div><strong>🌊 Subak:</strong> ${isEn ? 'Egalitarian community irrigation system recognized by UNESCO.' : 'Sistem irigasi sawah tradisional berbasis gotong royong yang diakui UNESCO.'}</div>
                  <div><strong>🎭 Seni Tari:</strong> ${isEn ? 'Tari Kecak, Tari Barong, Tari Pendet & gamelan semar pegulingan.' : 'Tari Kecak, Tari Barong, Tari Pendet, Legong, dan gamelan Bali.'}</div>
                  <div><strong>✨ Hari Raya Nyepi:</strong> ${isEn ? 'Balinese New Year of total silence, no lights, and meditation.' : 'Tahun Baru Saka yang hening dengan Catur Brata Penyepian tanpa polusi suara/cahaya.'}</div>
                </div>
              </div>
            </div>
          `;
        }
  
        case 'asia':
        case 'europe':
        case 'africa':
        case 'americas':
        case 'oceania': {
          const continentConfig = {
            asia: {
              title: isEn ? 'Asia Continent' : 'Benua Asia',
              icon: '🌏',
              filter: 'Asia',
              vb: '1050 80 950 620',
              vbX: 1050, vbY: 80, vbW: 950, vbH: 620,
              stats: [
                { label: isEn ? 'Area' : 'Luas Wilayah', val: '44,58 juta km² (Terbesar)' },
                { label: isEn ? 'Population' : 'Populasi', val: '> 4,7 Miliar (Terpadat)' },
                { label: isEn ? 'Highest Peak' : 'Puncak Tertinggi', val: 'Gunung Everest (8.848 m)' },
                { label: isEn ? 'Longest River' : 'Sungai Terpanjang', val: 'Sungai Yangtze (6.300 km)' }
              ],
              desc: isEn ? 'The largest continent on Earth, spanning from tropical Indonesia to the Himalayas and the Arctic tundra.' : 'Benua terluas di dunia dengan ragam kebudayaan tertua, membentang dari khatulistiwa nusantara hingga puncak Himalaya.'
            },
            europe: {
              title: isEn ? 'Europe Continent' : 'Benua Eropa',
              icon: '🏰',
              filter: 'Eropa',
              vb: '900 40 480 380',
              vbX: 900, vbY: 40, vbW: 480, vbH: 380,
              stats: [
                { label: isEn ? 'Area' : 'Luas Wilayah', val: '10,18 juta km²' },
                { label: isEn ? 'Population' : 'Populasi', val: '± 750 Juta' },
                { label: isEn ? 'Mountain Range' : 'Pegunungan', val: 'Pegunungan Alpen' },
                { label: isEn ? 'Longest River' : 'Sungai Terpanjang', val: 'Sungai Volga (3.530 km)' }
              ],
              desc: isEn ? 'Known as the Blue Continent with historic castles, advanced science, and classical art heritage.' : 'Dikenal sebagai Benua Biru dengan warisan arsitektur megah, kastil bersejarah, sains modern, dan seni rupa klasik.'
            },
            africa: {
              title: isEn ? 'Africa Continent' : 'Benua Afrika',
              icon: '🦁',
              filter: 'Afrika',
              vb: '840 280 540 560',
              vbX: 840, vbY: 280, vbW: 540, vbH: 560,
              stats: [
                { label: isEn ? 'Area' : 'Luas Wilayah', val: '30,37 juta km² (Ke-2 Terbesar)' },
                { label: isEn ? 'Population' : 'Populasi', val: '± 1,4 Miliar' },
                { label: isEn ? 'Longest River' : 'Sungai Terpanjang', val: 'Sungai Nil (6.650 km)' },
                { label: isEn ? 'Largest Desert' : 'Gurun Terluas', val: 'Gurun Sahara (9,2 juta km²)' }
              ],
              desc: isEn ? 'The cradle of ancient civilizations, home to incredible wildlife safaris and the immense Sahara Desert.' : 'Benua eksotis dengan sabana satwa liar terbesar, peradaban kuno Mesir piramida, dan Sungai Nil yang panjang.'
            },
            americas: {
              title: isEn ? 'Americas Continent' : 'Benua Amerika',
              icon: '🗽',
              filter: 'Amerika',
              vb: '140 60 840 880',
              vbX: 140, vbY: 60, vbW: 840, vbH: 880,
              stats: [
                { label: isEn ? 'Area' : 'Luas Wilayah', val: '42,55 juta km²' },
                { label: isEn ? 'Population' : 'Populasi', val: '± 1 Miliar' },
                { label: isEn ? 'Rainforest' : 'Hutan Terluas', val: 'Hutan Hujan Amazon' },
                { label: isEn ? 'Longest Range' : 'Pegunungan Terpanjang', val: 'Pegunungan Andes (7.000 km)' }
              ],
              desc: isEn ? 'Spanning both North and South hemispheres with Niagara Falls, Grand Canyon, and the Amazon lungs of Earth.' : 'Membentang dari kutub utara ke selatan, rumah bagi paru-paru dunia Hutan Amazon dan air terjun spektakuler.'
            },
            oceania: {
              title: isEn ? 'Oceania & Australia' : 'Benua Oseania & Australia',
              icon: '🦘',
              filter: 'Oseania',
              vb: '1480 440 540 460',
              vbX: 1480, vbY: 440, vbW: 540, vbH: 460,
              stats: [
                { label: isEn ? 'Area' : 'Luas Wilayah', val: '8,52 juta km² (Terkecil)' },
                { label: isEn ? 'Population' : 'Populasi', val: '± 45 Juta' },
                { label: isEn ? 'Coral Reef' : 'Karang Laut Terbesar', val: 'Great Barrier Reef' },
                { label: isEn ? 'Endemic Animals' : 'Satwa Khas', val: 'Kanguru, Koala, Platipus' }
              ],
              desc: isEn ? 'The island continent surrounded by the Pacific and Indian oceans, celebrated for marsupial wildlife and coral reefs.' : 'Benua kepulauan yang dikelilingi samudra luas, terkenal dengan hewan berkantung kanguru dan terumbu karang raksasa.'
            }
          };
  
          const cfg = continentConfig[region];
          const countries = (GEO_DATA.countries || []).filter(c => c.continent.toLowerCase().includes(cfg.filter.toLowerCase()));
  
          const CONTINENT_COUNTRIES_MAP = {
            asia: ['afghanistan', 'armenia', 'azerbaijan', 'bahrain', 'bangladesh', 'bhutan', 'brunei', 'cambodia', 'china', 'cyprus', 'georgia', 'india', 'indonesia', 'iran', 'iraq', 'israel', 'japan', 'jordan', 'kazakhstan', 'kuwait', 'kyrgyzstan', 'laos', 'lebanon', 'malaysia', 'maldives', 'mongolia', 'myanmar', 'nepal', 'north korea', 'oman', 'pakistan', 'palestine', 'philippines', 'qatar', 'saudi arabia', 'singapore', 'south korea', 'sri lanka', 'syria', 'taiwan', 'tajikistan', 'thailand', 'timor-leste', 'turkey', 'turkmenistan', 'united arab emirates', 'uzbekistan', 'vietnam', 'yemen'],
            europe: ['albania', 'andorra', 'austria', 'belarus', 'belgium', 'bosnia and herz.', 'bulgaria', 'croatia', 'czechia', 'czech rep.', 'denmark', 'estonia', 'finland', 'france', 'germany', 'greece', 'hungary', 'iceland', 'ireland', 'italy', 'kosovo', 'latvia', 'liechtenstein', 'lithuania', 'luxembourg', 'malta', 'moldova', 'monaco', 'montenegro', 'netherlands', 'north macedonia', 'norway', 'poland', 'portugal', 'romania', 'russia', 'san marino', 'serbia', 'slovakia', 'slovenia', 'spain', 'sweden', 'switzerland', 'ukraine', 'united kingdom', 'vatican'],
            africa: ['algeria', 'angola', 'benin', 'botswana', 'burkina faso', 'burundi', 'cabo verde', 'cameroon', 'central african rep.', 'chad', 'comoros', 'congo', 'dem. rep. congo', 'djibouti', 'egypt', 'eq. guinea', 'eritrea', 'eswatini', 'ethiopia', 'gabon', 'gambia', 'ghana', 'guinea', 'guinea-bissau', 'ivory coast', 'cote d\'ivoire', 'kenya', 'lesotho', 'liberia', 'libya', 'madagascar', 'malawi', 'mali', 'mauritania', 'mauritius', 'morocco', 'mozambique', 'namibia', 'niger', 'nigeria', 'rwanda', 'sao tome and principe', 'senegal', 'seychelles', 'sierra leone', 'somalia', 'somaliland', 'south africa', 'south sudan', 'sudan', 'tanzania', 'togo', 'tunisia', 'uganda', 'w. sahara', 'zambia', 'zimbabwe'],
            americas: ['antigua and barbuda', 'argentina', 'bahamas', 'barbados', 'belize', 'bolivia', 'brazil', 'canada', 'chile', 'colombia', 'costa rica', 'cuba', 'dominica', 'dominican rep.', 'ecuador', 'el salvador', 'grenada', 'guatemala', 'guyana', 'haiti', 'honduras', 'jamaica', 'mexico', 'nicaragua', 'panama', 'paraguay', 'peru', 'saint kitts and nevis', 'saint lucia', 'saint vincent and the grenadines', 'suriname', 'trinidad and tobago', 'united states of america', 'uruguay', 'venezuela', 'greenland', 'falkland is.'],
            oceania: ['australia', 'fiji', 'kiribati', 'marshall islands', 'micronesia', 'nauru', 'new zealand', 'palau', 'papua new guinea', 'samoa', 'solomon is.', 'tonga', 'tuvalu', 'vanuatu', 'new caledonia']
          };
          const continentCountryList = CONTINENT_COUNTRIES_MAP[region] || [];
  
          return `
            <div class="interactive-map-panel">
              <div class="interactive-map-header">
                <div>
                  <h4 class="interactive-map-title">${cfg.icon} ${cfg.title}</h4>
                  <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">${cfg.desc}</p>
                </div>
                <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:var(--surface); font-weight:700;">
                  🌍 Atlas Regional 2D
                </span>
              </div>
  
              <!-- Visual 2D SVG Map of Continent (Authentic Vectors) -->
              <div class="peta-2d-canvas-box" style="margin-bottom:16px;">
                <svg class="svg-map-frame" viewBox="${cfg.vb}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                  <!-- Lautan Background -->
                  <defs>
                    <linearGradient id="${region}OceanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.12"/>
                      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.22"/>
                    </linearGradient>
                  </defs>
                  <rect x="${cfg.vbX}" y="${cfg.vbY}" width="${cfg.vbW}" height="${cfg.vbH}" fill="url(#${region}OceanGrad)"/>
  
                  <!-- Countries in Vector Map -->
                  ${GLOBE_COUNTRIES.map(c => {
                    const isThisContinent = continentCountryList.includes(c.name.toLowerCase()) || countries.some(fc => (fc.nameEn || fc.name).toLowerCase() === c.name.toLowerCase() || c.name.toLowerCase().includes((fc.nameEn || fc.name).toLowerCase()));
                    const cls = isThisContinent ? 'svg-country-interactive highlighted' : 'svg-country-interactive dimmed';
                    const fill = isThisContinent ? c.fill : '#475569';
                    const stroke = isThisContinent ? '#ffffff' : '#334155';
                    const strokeWidth = isThisContinent ? '1' : '0.4';
                    const opacity = isThisContinent ? '1' : '0.28';
                    return `
                      <path class="${cls}"
                            data-country-name="${c.name}"
                            d="${c.d}"
                            fill="${fill}"
                            stroke="${stroke}"
                            stroke-width="${strokeWidth}"
                            opacity="${opacity}">
                        <title>${c.name}</title>
                      </path>
                    `;
                  }).join('')}
                </svg>
                <div class="peta-2d-legend-bar">
                  <span>💡 <strong>Tips:</strong> Klik negara berwarna di peta atau kartu di bawah untuk melihat ibu kota dan keunikan budayanya.</span>
                  <span>✨ <strong>Wilayah:</strong> ${cfg.title} (${countries.length} Negara Pilihan)</span>
                </div>
              </div>
  
              <!-- Banner Statistik Benua -->
              <div class="continent-stats-banner">
                ${cfg.stats.map(s => `
                  <div class="stat-box">
                    <div class="stat-val">${s.val}</div>
                    <div class="stat-label">${s.label}</div>
                  </div>
                `).join('')}
              </div>
  
              <div class="eyebrow" style="margin-top:20px;"><span class="no">🗺️</span><span class="lbl">${isEn ? 'Featured Countries in this Continent' : 'Daftar Negara Pilihan di Benua Ini'}</span></div>
              <div class="country-grid" style="margin-top:12px;">
                ${countries.map(c => `
                  <div class="country-card" data-country-name="${c.name}">
                    <div>
                      <div class="country-card-header">
                        <span class="country-flag-icon">${c.flag}</span>
                        <span class="subject-badge">${c.continent}</span>
                      </div>
                      <h4 class="country-name">${c.name} <span class="country-en-sub">(${c.nameEn})</span></h4>
                      <div class="country-info-row">
                        <span>🏛️ ${t('capitalLabel', lang)}</span>
                        <strong>${c.capital}</strong>
                      </div>
                      <div class="country-info-row">
                        <span>💰 ${t('currencyLabel', lang)}</span>
                        <strong>${c.currency}</strong>
                      </div>
                      <div class="country-landmark-box">
                        <span class="landmark-tag">📍 ${t('landmarkLabel', lang)}</span>
                        <p class="landmark-text">${c.landmark}</p>
                      </div>
                      <div class="country-fun-fact">
                        <span class="fact-badge">${t('countryFunFactBadge', lang)}</span>
                        <p>${c.funFact}</p>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }
  
        case 'world':
        default: {
          return `
            <div class="interactive-map-panel">
              <div class="interactive-map-header">
                <div>
                  <h4 class="interactive-map-title">🌍 ${isEn ? 'Planet Earth — 7 Continents & 5 Oceans' : 'Planet Bumi — 7 Benua & 5 Samudra Luas'}</h4>
                  <p style="font-size:13px; color:var(--muted); margin:4px 0 0;">
                    ${isEn ? 'Earth is our spherical blue home rotating in space. 70% of its surface is water.' : 'Bumi adalah bola raksasa rumah kita bersama di alam semesta. Sekitar 70% permukaannya tertutup perairan samudra.'}
                  </p>
                </div>
                <span class="subject-badge" style="font-size:12px; padding:6px 14px; background:var(--surface); font-weight:700;">
                  🌐 Ringkasan Dunia 2D
                </span>
              </div>
  
              <!-- Visual 2D SVG Map of Planet Earth (All 177 Countries & Oceans) -->
              <div class="peta-2d-canvas-box" style="margin-bottom:20px;">
                <svg class="svg-map-frame" viewBox="0 0 2048 1024" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
                  <!-- Lautan Luas Dunia -->
                  <rect width="2048" height="1024" rx="16" fill="currentColor" style="color:var(--surface); opacity:0.6;"/>
                  <defs>
                    <linearGradient id="worldOceanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.12"/>
                      <stop offset="100%" stop-color="#0369a1" stop-opacity="0.25"/>
                    </linearGradient>
                  </defs>
                  <rect width="2048" height="1024" rx="16" fill="url(#worldOceanGrad)"/>
  
                  <!-- Garis Khatulistiwa Equator 0° -->
                  <line x1="0" y1="512" x2="2048" y2="512" stroke="#ef4444" stroke-width="2" stroke-dasharray="8,6" opacity="0.75"/>
                  <text x="30" y="504" fill="#ef4444" font-size="16" font-weight="800" letter-spacing="1">GARIS KHATULISTIWA (EQUATOR 0°)</text>
  
                  <!-- Garis Meridian Utama 0° (Greenwich) -->
                  <line x1="1024" y1="0" x2="1024" y2="1024" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.6"/>
                  <text x="1034" y="32" fill="#3b82f6" font-size="14" font-weight="800" letter-spacing="1">PRIME MERIDIAN (0°)</text>
  
                  <!-- 177 Authentic Countries Vectors -->
                  ${GLOBE_COUNTRIES.map(c => `
                    <path class="svg-country-interactive"
                          data-country-name="${c.name}"
                          d="${c.d}"
                          fill="${c.fill}"
                          stroke="#ffffff"
                          stroke-width="0.8"
                          opacity="0.95">
                      <title>${c.name}</title>
                    </path>
                  `).join('')}
  
                  <!-- Great Oceans & Regional Labels -->
                  ${GLOBE_LABELS.map(lbl => `
                    <text x="${lbl.x}" y="${lbl.y}" font-size="${lbl.size}" font-weight="800" fill="${lbl.fill}" text-anchor="middle" letter-spacing="2" style="pointer-events:none; text-shadow:0 1px 4px rgba(0,0,0,0.5);">${lbl.text}</text>
                  `).join('')}
                </svg>
  
                <!-- Legend Bar Peta Dunia -->
                <div class="peta-2d-legend-bar">
                  <span>🌐 <strong>Atlas Dunia Vektor Lengkap:</strong> 177 Negara · 7 Benua · 5 Samudra Luas · Garis Khatulistiwa 0°</span>
                  <span>💡 <strong>Eksplorasi:</strong> Arahkan kursor atau sentuh negara untuk melihat namanya.</span>
                </div>
              </div>
  
              <!-- Ringkasan 7 Benua -->
              <div class="eyebrow" style="margin-top:16px;"><span class="no">🌍</span><span class="lbl">${isEn ? 'The 7 Continents on Earth' : '7 Benua Besar di Muka Bumi'}</span></div>
              <div class="island-nav-grid" style="margin-top:10px;">
                <div class="island-card-btn"><strong>🌏 Asia</strong><span>Terluas & terpadat</span></div>
                <div class="island-card-btn"><strong>🦁 Afrika</strong><span>Gurun Sahara & Nil</span></div>
                <div class="island-card-btn"><strong>🗽 Amerika Utara</strong><span>Kanada, AS, Meksiko</span></div>
                <div class="island-card-btn"><strong>🌴 Amerika Selatan</strong><span>Hutan Amazon & Andes</span></div>
                <div class="island-card-btn"><strong>❄️ Antartika</strong><span>Kutub Selatan es abadi</span></div>
                <div class="island-card-btn"><strong>🏰 Eropa</strong><span>Benua Biru bersejarah</span></div>
                <div class="island-card-btn"><strong>🦘 Oseania / Australia</strong><span>Kanguru & Karang Laut</span></div>
              </div>
  
              <!-- 5 Samudra Luas -->
              <div class="eyebrow" style="margin-top:24px;"><span class="no">🌊</span><span class="lbl">${isEn ? 'The 5 Great Oceans' : '5 Samudra Luas Dunia'}</span></div>
              <div class="bali-landmarks-grid" style="margin-top:10px;">
                <div class="bali-landmark-item">
                  <h5>🌊 Samudra Pasifik</h5>
                  <p>${isEn ? 'The largest ocean on Earth, covering more area than all land combined.' : 'Samudra terluas dan terdalam di dunia yang mencakup sepertiga permukaan Bumi.'}</p>
                </div>
                <div class="bali-landmark-item">
                  <h5>🚢 Samudra Atlantik</h5>
                  <p>${isEn ? 'The second largest ocean, separating the Americas from Europe and Africa.' : 'Samudra berbentuk huruf S yang memisahkan Benua Amerika dengan Eropa dan Afrika.'}</p>
                </div>
                <div class="bali-landmark-item">
                  <h5>🏝️ Samudra Hindia</h5>
                  <p>${isEn ? 'Warm tropical ocean washing the shores of Indonesia, India, and East Africa.' : 'Samudra tropis hangat yang mengelilingi perairan selatan nusantara dan benua Asia.'}</p>
                </div>
                <div class="bali-landmark-item">
                  <h5>🧊 Samudra Arktik</h5>
                  <p>${isEn ? 'The smallest and shallowest ocean, located around the frozen North Pole.' : 'Samudra paling utara di Kutub Utara yang sebagian besar permukaannya membeku tertutup es.'}</p>
                </div>
                <div class="bali-landmark-item">
                  <h5>❄️ Samudra Selatan / Antarktika</h5>
                  <p>${isEn ? 'Encircles the entire Antarctic continent with freezing currents and icebergs.' : 'Mengelilingi Benua Antartika dengan arus dingin dan gunung es terapung.'}</p>
                </div>
              </div>
            </div>
          `;
        }
      }
    }
  
    bindFocusCountryButtons() {
      const focusBtns = this.container.querySelectorAll('.btn-focus-country-globe');
      focusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const lon = parseFloat(btn.getAttribute('data-lon'));
          const lat = parseFloat(btn.getAttribute('data-lat'));
          const name = btn.getAttribute('data-name');
          appState.set({ activeGeoTab: 'earth' });
          this.renderGeography();
          if (this.globeVis) {
            this.globeVis.focusCoordinates(lon, lat, name);
          }
        });
      });
    }
  
    attachGeoEvents() {
      // Nav tabs switcher
      const tabBtns = this.container.querySelectorAll('.geo-tab-btn');
      tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const tab = btn.getAttribute('data-geo-tab');
          appState.set({ activeGeoTab: tab });
          this.renderGeography();
        });
      });
  
      // Continent filters
      const continentChips = this.container.querySelectorAll('.chip-btn[data-continent]');
      continentChips.forEach(c => {
        c.addEventListener('click', () => {
          this.selectedContinent = c.getAttribute('data-continent');
          this.renderGeography();
        });
      });
  
      // Country search input
      const countryInput = this.container.querySelector('#countrySearchInput');
      if (countryInput) {
        countryInput.addEventListener('input', (e) => {
          this.searchCountryQuery = e.target.value;
          const grid = this.container.querySelector('.country-grid');
          if (grid) {
            let list = GeoEngine.getCountriesByContinent(this.selectedContinent);
            const q = this.searchCountryQuery.trim().toLowerCase();
            if (q) {
              list = list.filter(c =>
                c.name.toLowerCase().includes(q) ||
                c.nameEn.toLowerCase().includes(q) ||
                c.capital.toLowerCase().includes(q) ||
                c.continent.toLowerCase().includes(q) ||
                c.currency.toLowerCase().includes(q) ||
                c.landmark.toLowerCase().includes(q)
              );
            }
            grid.innerHTML = list.map(c => `
              <div class="country-card">
                <div>
                  <div class="country-card-header">
                    <span class="country-flag-icon">${c.flag}</span>
                    <span class="subject-badge">${c.continent}</span>
                  </div>
                  <h4 class="country-name">${c.name} <span class="country-en-sub">(${c.nameEn})</span></h4>
                  
                  <div class="country-info-row">
                    <span>🏛️ ${t('capitalLabel', appState.get().lang || 'id')}</span>
                    <strong>${c.capital}</strong>
                  </div>
                  <div class="country-info-row">
                    <span>💰 ${t('currencyLabel', appState.get().lang || 'id')}</span>
                    <strong>${c.currency}</strong>
                  </div>
                  <div class="country-info-row">
                    <span>🗣️ ${t('languageLabel', appState.get().lang || 'id')}</span>
                    <span>${c.language}</span>
                  </div>
                  <div class="country-landmark-box">
                    <span class="landmark-tag">📍 ${t('landmarkLabel', appState.get().lang || 'id')}</span>
                    <p class="landmark-text">${c.landmark}</p>
                  </div>
                  <div class="country-fun-fact">
                    <span class="fact-badge">${t('countryFunFactBadge', appState.get().lang || 'id')}</span>
                    <p>${c.funFact}</p>
                  </div>
                </div>
                <button class="btn primary btn-focus-country-globe" data-lon="${c.coords[0]}" data-lat="${c.coords[1]}" data-name="${c.name} ${c.flag}" type="button">
                  ${t('focusOnGlobeBtn', appState.get().lang || 'id')}
                </button>
              </div>
            `).join('');
  
            // Re-bind focus buttons in new grid
            this.bindFocusCountryButtons();
          }
        });
      }
  
      // Bind focus country buttons
      this.bindFocusCountryButtons();
  
      // Island filters
      const chipBtns = this.container.querySelectorAll('.chip-btn[data-island]');
      chipBtns.forEach(c => {
        c.addEventListener('click', () => {
          this.selectedIsland = c.getAttribute('data-island');
          this.renderGeography();
        });
      });
  
      // City search input
      const cityInput = this.container.querySelector('#citySearchInput');
      if (cityInput) {
        cityInput.addEventListener('input', (e) => {
          this.searchCityQuery = e.target.value;
          const grid = this.container.querySelector('.provinces-grid');
          if (grid) {
            const cities = GeoEngine.getNonCapitalCities(this.searchCityQuery);
            grid.innerHTML = cities.map(c => `
              <div class="province-card" style="${c.name === 'Malang' ? 'border: 2px solid var(--teal); background: var(--teal-soft);' : ''}">
                <div>
                  <div class="province-header">
                    <span style="font-size:24px;">${c.icon}</span>
                    <span class="subject-badge" style="background:#ffb21b; color:#0e2e48;">Bukan Ibu Kota</span>
                  </div>
                  <h4 class="province-name" style="color:${c.name === 'Malang' ? 'var(--teal-soft-ink)' : 'inherit'};">
                    ${c.name} ${c.name === 'Malang' ? '⭐ (Contoh Wajib)' : ''}
                  </h4>
                  <div class="capital-row">
                    <span>📍 Bagian dari Provinsi:</span>
                    <strong>${c.province} (${c.island})</strong>
                  </div>
                  <p class="province-fact">✨ ${c.desc}</p>
                </div>
              </div>
            `).join('');
          }
        });
      }
  
      // Globe controls
      const btnRotateLeft = this.container.querySelector('#btnGlobeRotateLeft');
      const btnRotateRight = this.container.querySelector('#btnGlobeRotateRight');
      const btnAutoRotate = this.container.querySelector('#btnGlobeAutoRotate');
      const btnFocusId = this.container.querySelector('#btnGlobeFocusIndonesia');
      const btnZoomIn = this.container.querySelector('#btnGlobeZoomIn');
      const btnZoomOut = this.container.querySelector('#btnGlobeZoomOut');
  
      if (btnRotateLeft) {
        btnRotateLeft.addEventListener('click', () => {
          if (this.globeVis) this.globeVis.rotateBy(-25);
        });
      }
      if (btnRotateRight) {
        btnRotateRight.addEventListener('click', () => {
          if (this.globeVis) this.globeVis.rotateBy(25);
        });
      }
      if (btnAutoRotate) {
        btnAutoRotate.addEventListener('click', () => {
          if (this.globeVis) {
            const isSpinning = this.globeVis.toggleAutoRotate();
            btnAutoRotate.textContent = isSpinning ? '⏸ Berhenti' : '▶ Putar';
          }
        });
      }
      if (btnFocusId) {
        btnFocusId.addEventListener('click', () => {
          if (this.globeVis) {
            this.globeVis.focusIndonesia();
          }
        });
      }
      if (btnZoomIn) {
        btnZoomIn.addEventListener('click', () => {
          if (this.globeVis) {
            this.globeVis.zoomBy(0.25);
          }
        });
      }
      if (btnZoomOut) {
        btnZoomOut.addEventListener('click', () => {
          if (this.globeVis) {
            this.globeVis.zoomBy(-0.25);
          }
        });
      }
  
      // Quiz tabs
      const quizSelectBtns = this.container.querySelectorAll('.btn-select-quiz');
      quizSelectBtns.forEach(qb => {
        qb.addEventListener('click', () => {
          this.activeQuizIndex = parseInt(qb.getAttribute('data-idx'), 10);
          this.renderGeography();
        });
      });
  
      const quizWrap = this.container.querySelector('#quizContainer');
      if (quizWrap) {
        const qz = GEO_DATA.quizzes[this.activeQuizIndex];
        new QuizRunner(quizWrap, qz, () => {
          appState.navigate('progress');
        });
      }
  
      // Video play
      const playBtns = this.container.querySelectorAll('.btn-play-video');
      playBtns.forEach(pb => {
        pb.addEventListener('click', () => {
          const title = pb.getAttribute('data-title');
          const url = pb.getAttribute('data-url');
          if (this.videoModal) {
            this.videoModal.open(title, url);
          }
        });
      });
  
      // Pasang listener Pusat Jelajah Peta Regional di bawah bola dunia
      this.attachRegionContentEvents();
    }
  
    attachRegionContentEvents() {
      const lang = appState.get().lang || 'id';
  
      // 1. Region chips (Tab Peta: Indonesia, Bali, Asia, Eropa, dll)
      const regionChips = this.container.querySelectorAll('.region-chip[data-region]');
      regionChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const targetRegion = chip.getAttribute('data-region');
          this.activeRegion = targetRegion;
          regionChips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
  
          const contentEl = this.container.querySelector('#geoRegionContent');
          if (contentEl) {
            contentEl.innerHTML = this.getRegionContentHtml(this.activeRegion, lang);
            this.attachRegionContentEvents();
          }
        });
      });
  
      // 2. Island filter buttons in Indonesia Map
      const islandBtns = this.container.querySelectorAll('.island-card-btn[data-map-island]');
      islandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.selectedMapIsland = btn.getAttribute('data-map-island');
          const contentEl = this.container.querySelector('#geoRegionContent');
          if (contentEl) {
            contentEl.innerHTML = this.getRegionContentHtml('indonesia', lang);
            this.attachRegionContentEvents();
          }
        });
      });
  
      // 3. Interactive SVG Islands in Indonesia Map (Klik langsung pulau di peta 2D)
      const svgIslands = this.container.querySelectorAll('.svg-island-interactive[data-island]');
      svgIslands.forEach(el => {
        el.addEventListener('click', () => {
          const isl = el.getAttribute('data-island');
          this.selectedMapIsland = isl;
          const contentEl = this.container.querySelector('#geoRegionContent');
          if (contentEl) {
            contentEl.innerHTML = this.getRegionContentHtml('indonesia', lang);
            this.attachRegionContentEvents();
          }
        });
      });
  
      // 3b. Interactive SVG Provinces in Indonesia Map (Klik langsung batas provinsi di peta asli)
      const svgProvinces = this.container.querySelectorAll('.svg-province-interactive[data-province-name]');
      svgProvinces.forEach(el => {
        el.addEventListener('click', () => {
          const provName = el.getAttribute('data-province-name');
          svgProvinces.forEach(p => p.classList.remove('active-province'));
          el.classList.add('active-province');
  
          const allCards = this.container.querySelectorAll('.province-card');
          let targetCard = null;
          allCards.forEach(c => {
            const cardProv = c.getAttribute('data-province-name') || '';
            if (cardProv.toLowerCase() === provName.toLowerCase() || c.textContent.toLowerCase().includes(provName.toLowerCase())) {
              targetCard = c;
            }
          });
  
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.boxShadow = '0 0 0 3.5px var(--teal)';
            setTimeout(() => { targetCard.style.boxShadow = ''; }, 2000);
          }
        });
      });
  
      // 4. Interactive SVG Regencies in Bali Map (Klik langsung kabupaten di peta Bali)
      const svgRegencies = this.container.querySelectorAll('.svg-regency-interactive[data-regency]');
      svgRegencies.forEach(el => {
        el.addEventListener('click', () => {
          const reg = el.getAttribute('data-regency');
          svgRegencies.forEach(r => r.classList.remove('active'));
          el.classList.add('active');
  
          const targetCard = this.container.querySelector(`[id^="baliCard_"][id*="${reg}"]`) ||
            Array.from(this.container.querySelectorAll('.bali-region-card')).find(c => c.textContent.toLowerCase().includes(reg.toLowerCase()));
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.boxShadow = '0 0 0 3.5px var(--teal)';
            setTimeout(() => { targetCard.style.boxShadow = ''; }, 2000);
          }
        });
      });
  
      // 5. Interactive Landmark Pins in Bali Map
      const landmarkPins = this.container.querySelectorAll('.svg-landmark-pin[data-landmark]');
      landmarkPins.forEach(pin => {
        pin.addEventListener('click', () => {
          const lmName = pin.getAttribute('data-landmark');
          const allLmCards = this.container.querySelectorAll('.bali-landmark-item');
          allLmCards.forEach(c => {
            if (c.textContent.includes(lmName)) {
              c.scrollIntoView({ behavior: 'smooth', block: 'center' });
              c.style.boxShadow = '0 0 0 3.5px #ef4444';
              setTimeout(() => { c.style.boxShadow = ''; }, 2000);
            }
          });
        });
      });
  
      // 6. Interactive SVG Countries in Continent & World Maps (Klik negara pada peta)
      const svgCountries = this.container.querySelectorAll('.svg-country-interactive[data-country-name]');
      svgCountries.forEach(el => {
        el.addEventListener('click', () => {
          const cName = el.getAttribute('data-country-name');
          const allCountryCards = this.container.querySelectorAll('.country-card');
          let targetCard = null;
          allCountryCards.forEach(c => {
            const cardCountry = c.getAttribute('data-country-name') || '';
            if (cardCountry.toLowerCase() === cName.toLowerCase() || c.textContent.toLowerCase().includes(cName.toLowerCase())) {
              targetCard = c;
            }
          });
  
          if (targetCard) {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.style.boxShadow = '0 0 0 3.5px var(--teal)';
            setTimeout(() => { targetCard.style.boxShadow = ''; }, 2000);
          }
        });
      });
    }
  
    // ==========================================================
    // 8 MATA PELAJARAN LAINNYA
    // ==========================================================
    renderGenericSubject(subjectId) {
      const state = appState.get();
      const lang = state.lang || 'id';
      const isEn = lang === 'en';
      const meta = SUBJECTS.find(s => s.id === subjectId);
      if (!meta) return;
  
      let subjectData = null;
      if (subjectId === 'bahasa-indonesia') subjectData = BAHASA_INDONESIA_DATA;
      else if (subjectId === 'bahasa-inggris') subjectData = ENGLISH_DATA;
      else if (subjectId === 'pancasila') subjectData = PANCASILA_DATA;
      else if (subjectId === 'bahasa-bali') subjectData = BAHASA_BALI_DATA;
      else if (subjectId === 'seni-rupa') subjectData = SENI_RUPA_DATA;
      else if (subjectId === 'pjok') subjectData = PJOK_DATA;
      else if (subjectId === 'agama') subjectData = AGAMA_DATA;
      else if (subjectId === 'kokurikuler') subjectData = KOKURIKULER_DATA;
  
      if (!subjectData) {
        this.container.innerHTML = `<p>${isEn ? 'Content is being prepared.' : 'Materi sedang dipersiapkan.'}</p>`;
        return;
      }
  
      const title = (isEn && subjectData.titleEn) ? subjectData.titleEn : subjectData.title;
      const subtitle = (isEn && subjectData.subtitleEn) ? subjectData.subtitleEn : subjectData.subtitle;
      const badge = getSubjectBadge(meta, lang);
  
      this.container.innerHTML = `
        <div class="section-header">
          <div class="math-hero-badge" style="background:${meta.accentLight}; color:${meta.accentColor}; border-color:${meta.accentBorder};">
            ${meta.icon} ${badge}
          </div>
          <h2 class="section-title">${title}</h2>
          <p class="section-sub">${subtitle}</p>
        </div>
  
        <div style="display:flex; flex-direction:column; gap:24px;">
          ${subjectData.topics.map((top, idx) => {
            const topTitle = (isEn && top.titleEn) ? top.titleEn : top.title;
            const topDesc = (isEn && top.descEn) ? top.descEn : top.desc;
            const checklist = (isEn && top.checklistEn) ? top.checklistEn : top.checklist;
  
            return `
              <div class="quiz-box">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
                  <span class="no" style="background:var(--navy); color:#fff; border-radius:6px; padding:2px 8px; font-size:11px; font-weight:800;">
                    ${isEn ? 'Topic' : 'Topik'} ${idx + 1}
                  </span>
                  <h3 style="margin:0; font-size:18px; font-weight:800;">${topTitle}</h3>
                </div>
                <p style="margin:0 0 16px; font-size:13.5px; color:var(--muted); line-height:1.6;">
                  ${topDesc}
                </p>
  
                ${checklist ? `
                  <div style="background:var(--paper); border-radius:12px; padding:14px; margin-bottom:16px;">
                    <strong style="font-size:13px; display:block; margin-bottom:8px;">${isEn ? 'Independent Mission:' : 'Misi Mandiri:'}</strong>
                    <ul style="margin:0; padding-left:20px; font-size:13px; color:var(--ink);">
                      ${checklist.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                  </div>
                ` : ''}
  
                <!-- Mini Quiz / Interaktivitas Topik -->
                ${top.activities ? `
                  <div class="topic-activity-wrap" id="act_${top.id}"></div>
                ` : ''}
              </div>
            `;
          }).join('')}
        </div>
      `;
  
      // Render kuis di tiap topik
      subjectData.topics.forEach(top => {
        // Untuk bahasa-inggris, gunakan top.activities aslinya sesuai user request ("kecuali pelajaran bahasa inggris")
        const activities = (isEn && top.activitiesEn) ? top.activitiesEn : top.activities;
        if (activities) {
          const wrap = this.container.querySelector(`#act_${top.id}`);
          if (wrap) {
            const fakeQuiz = {
              id: top.id,
              title: (isEn && top.titleEn) ? top.titleEn : top.title,
              questions: activities
            };
            new QuizRunner(wrap, fakeQuiz, () => {
              store.completeLesson(`${subjectId}:${top.id}`);
            });
          }
        }
      });
    }
  }
  
  

  // --- Source: js/components/challenge-view.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Daily Challenge Component
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 10:40:00
  // ================================================================
  
  
  
  
  
  class ChallengeViewComponent {
    constructor(container) {
      this.container = container;
    }
  
    render() {
      const lang = appState.get().lang || 'id';
      const dc = store.data.dailyChallenge || { completedCount: 0, targetCount: 3, claimed: false };
      const pct = Math.min(100, Math.round((dc.completedCount / dc.targetCount) * 100));
  
      const challengeTasks = [
        {
          id: 'c1',
          icon: '🧮',
          title: lang === 'en' ? 'Quick Calculation Practice' : 'Latihan Hitung Cepat',
          desc: lang === 'en' ? 'Try one addition trick in the Mathematics module.' : 'Coba satu jurus penjumlahan di modul Matematika.',
          done: dc.completedCount >= 1,
          actionLabel: lang === 'en' ? 'Open Math' : 'Buka Matematika',
          route: 'subject',
          subjectId: 'matematika'
        },
        {
          id: 'c2',
          icon: '🌍',
          title: lang === 'en' ? 'Explore 1 Indonesian Province' : 'Jelajah 1 Provinsi Indonesia',
          desc: lang === 'en' ? 'Find out the capital of your favorite province.' : 'Cari tahu ibu kota salah satu provinsi favoritmu.',
          done: dc.completedCount >= 2,
          actionLabel: lang === 'en' ? 'Open Geography' : 'Buka Geografi',
          route: 'subject',
          subjectId: 'geografi'
        },
        {
          id: 'c3',
          icon: '📖',
          title: lang === 'en' ? 'Cheerful Greeting of the Day' : 'Sapaan Ceria Hari Ini',
          desc: lang === 'en' ? 'Learn a greeting in English or Balinese.' : 'Pelajari salam dalam bahasa Inggris atau bahasa Bali.',
          done: dc.completedCount >= 3,
          actionLabel: lang === 'en' ? 'Open English' : 'Buka B. Inggris',
          route: 'subject',
          subjectId: 'bahasa-inggris'
        }
      ];
  
      this.container.innerHTML = `
        <div class="section-header">
          <div class="math-hero-badge" style="background:#fff6e0; color:#946808; border-color:#ffb21b;">
            ${t('challengeBadge', lang)}
          </div>
          <h2 class="section-title">${t('challengeTitle', lang)}</h2>
          <p class="section-sub">${t('challengeSub', lang)}</p>
        </div>
  
        <!-- Kartu Progress Tantangan -->
        <div class="quiz-box" style="background:linear-gradient(135deg, var(--card), var(--paper));">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <strong style="font-size:16px;">${t('todayTargetPrefix', lang)} ${dc.completedCount} ${t('of', lang)} ${dc.targetCount} ${t('doneCountLabel', lang)}</strong>
            <span style="font-weight:900; font-size:18px; color:var(--teal);">${pct}%</span>
          </div>
  
          <div style="height:14px; background:var(--line); border-radius:999px; overflow:hidden; margin-bottom:18px;">
            <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, #ffb21b, #1e7b45); border-radius:999px; transition:width 0.4s ease;"></div>
          </div>
  
          ${pct === 100 ? `
            <div class="feedback-banner success show" style="display:flex; margin-top:0;">
              ${t('challengeSuccessMsg', lang)}
            </div>
          ` : `
            <div style="font-size:13px; color:var(--muted);">
              ${t('challengePrompt', lang)}
            </div>
          `}
        </div>
  
        <!-- Daftar 3 Tugas Tantangan -->
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:18px; margin-top:24px;">
          ${challengeTasks.map(task => `
            <div class="quiz-box" style="margin-bottom:0; display:flex; flex-direction:column; justify-content:space-between; ${task.done ? 'border-color:var(--green); background:var(--green-soft);' : ''}">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                  <span style="font-size:28px;">${task.icon}</span>
                  <span class="subject-badge" style="${task.done ? 'background:var(--green); color:#fff;' : ''}">
                    ${task.done ? t('statusDone', lang) : t('statusPending', lang)}
                  </span>
                </div>
                <h4 style="margin:0 0 6px; font-size:16px; font-weight:800;">${task.title}</h4>
                <p style="margin:0; font-size:12.5px; color:var(--muted); line-height:1.5;">${task.desc}</p>
              </div>
              <div style="margin-top:16px;">
                <button class="btn ${task.done ? '' : 'primary'} btn-start-task" data-route="${task.route}" data-subject="${task.subjectId}" type="button" style="width:100%;">
                  ${task.done ? t('repeatLessonBtn', lang) : task.actionLabel + ' ➔'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
  
      this.attachEvents();
    }
  
    attachEvents() {
      const taskBtns = this.container.querySelectorAll('.btn-start-task');
      taskBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const route = btn.getAttribute('data-route');
          const subject = btn.getAttribute('data-subject');
          appState.navigate(route, subject);
        });
      });
    }
  }
  
  

  // --- Source: js/components/progress-view.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Progress & Parent Summary View
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 10:42:00
  // ================================================================
  
  
  
  
  
  
  class ProgressViewComponent {
    constructor(container) {
      this.container = container;
    }
  
    render() {
      const s = store.data;
      const lang = appState.get().lang || 'id';
      const completedCount = (s.completedLessons || []).length;
      const totalEstimate = 25;
      const overallPct = Math.min(100, Math.round((completedCount / totalEstimate) * 100));
  
      this.container.innerHTML = `
        <div class="section-header">
          <div class="math-hero-badge" style="background:#edfbf2; color:#1e7b45; border-color:#5be08f;">
            ${t('reportBadge', lang)}
          </div>
          <h2 class="section-title">${t('reportTitle', lang)}</h2>
          <p class="section-sub">${t('reportSub', lang)}</p>
        </div>
  
        <!-- Ringkasan Statistik Utama -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:28px;">
          <div class="quiz-box" style="margin:0; text-align:center;">
            <div style="font-size:36px; margin-bottom:4px;">⭐</div>
            <div style="font-size:28px; font-weight:900; color:var(--ink);">${s.stars || 0}</div>
            <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('totalGoldStars', lang)}</div>
          </div>
  
          <div class="quiz-box" style="margin:0; text-align:center;">
            <div style="font-size:36px; margin-bottom:4px;">🔥</div>
            <div style="font-size:28px; font-weight:900; color:var(--ink);">${s.streakDays || 1} ${t('days', lang)}</div>
            <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('activeStreak', lang)}</div>
          </div>
  
          <div class="quiz-box" style="margin:0; text-align:center;">
            <div style="font-size:36px; margin-bottom:4px;">🏆</div>
            <div style="font-size:28px; font-weight:900; color:var(--ink);">${(s.badges || []).length}</div>
            <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('badgesWon', lang)}</div>
          </div>
  
          <div class="quiz-box" style="margin:0; text-align:center;">
            <div style="font-size:36px; margin-bottom:4px;">🚀</div>
            <div style="font-size:28px; font-weight:900; color:var(--teal);">${overallPct}%</div>
            <div style="font-size:12px; color:var(--muted); font-weight:700;">${t('levelLabel', lang)}</div>
          </div>
        </div>
  
        <!-- Koleksi Lencana (Badges) -->
        <div class="section">
          <h3 style="font-size:19px; font-weight:800; margin:0 0 14px;">${t('kidBadgesTitle', lang)}</h3>
          <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(240px, 1fr)); gap:14px;">
            ${(s.badges || []).map(b => `
              <div class="quiz-box" style="margin:0; display:flex; align-items:center; gap:14px; padding:16px;">
                <span style="font-size:32px;">${b.icon}</span>
                <div>
                  <strong style="font-size:14px; display:block;">${(lang === 'en' && b.nameEn) ? b.nameEn : b.name}</strong>
                  <span style="font-size:12px; color:var(--muted);">${(lang === 'en' && b.descEn) ? b.descEn : b.desc}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
  
        <!-- Panduan Khusus Orang Tua / Pendamping -->
        <div class="quiz-box" style="margin-top:30px; border-left:5px solid var(--teal);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
            <h3 style="font-size:17px; font-weight:800; margin:0;">${t('parentSummaryTitle', lang)}</h3>
            <span class="subject-badge">${t('parentPrivacyNotice', lang)}</span>
          </div>
          <p style="font-size:13px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
            ${t('parentSummaryDesc', lang)}
          </p>
  
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${SUBJECTS.slice(0, 5).map(sub => {
              const count = (s.completedLessons || []).filter(k => k.startsWith(sub.id)).length;
              const subPct = Math.min(100, count * 35);
              return `
                <div>
                  <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:750; margin-bottom:4px;">
                    <span>${sub.icon} ${getSubjectName(sub, lang)}</span>
                    <span style="color:var(--teal);">${subPct}% ${t('completedLabel', lang)}</span>
                  </div>
                  <div style="height:8px; background:var(--paper); border-radius:999px; overflow:hidden;">
                    <div style="width:${subPct}%; height:100%; background:var(--teal); border-radius:999px;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
  
          <div style="margin-top:24px; display:flex; justify-content:flex-end;">
            <button class="btn" id="btnResetProgress" type="button" style="color:var(--red); border-color:var(--red-soft);">
              ${t('resetProgressBtn', lang)}
            </button>
          </div>
        </div>
      `;
  
      this.attachEvents();
    }
  
    attachEvents() {
      const resetBtn = this.container.querySelector('#btnResetProgress');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          const lang = appState.get().lang || 'id';
          if (confirm(t('resetConfirmPrompt', lang))) {
            store.resetProgress();
            alert(t('resetSuccessAlert', lang));
            this.render();
          }
        });
      }
    }
  }
  
  

  // --- Source: js/app.js ---
  // ================================================================
  // AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
  // JavaScript · ES Module · Main Application Router & Bootstrap
  // Development · Anabhi Dev
  // Version   : 1.1
  // Generated : 10 September 2026, 11:10:00
  // ================================================================
  
  
  
  
  
  
  
  
  
  
  
  
  
  class App {
    constructor() {
      this.topbarEl = document.getElementById('topbar');
      this.sidebarEl = document.getElementById('sidebar');
      this.scrimEl = document.getElementById('scrim');
      this.shellEl = document.getElementById('shell');
      this.mainEl = document.getElementById('main');
      this.videoModalEl = document.getElementById('videoModal');
  
      // Komponen UI
      this.aiModal = new AiTutorModalComponent();
      window.aiTutorModal = this.aiModal;
      this.topbar = new TopbarComponent(this.topbarEl);
      this.sidebar = new SidebarComponent(this.sidebarEl, this.scrimEl, this.shellEl);
      this.videoModal = new VideoModalComponent(this.videoModalEl);
      this.subjectView = new SubjectViewComponent(this.mainEl, this.videoModal);
      this.challengeView = new ChallengeViewComponent(this.mainEl);
      this.progressView = new ProgressViewComponent(this.mainEl);
  
      this.initPWA();
      this.initRouting();
      this.bindState();
    }
  
    initPWA() {
      const isLocalOrHttps = window.location.protocol === 'https:' ||
                             window.location.hostname === 'localhost' ||
                             window.location.hostname === '127.0.0.1';
      if ('serviceWorker' in navigator && isLocalOrHttps) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('./sw.js')
            .then((reg) => {
              console.log('[PWA] Service Worker aktif terdaftar:', reg.scope);
              reg.addEventListener('updatefound', () => {
                const nw = reg.installing;
                if (!nw) return;
                nw.addEventListener('statechange', () => {
                  if (nw.state === 'installed' && navigator.serviceWorker.controller) {
                    nw.postMessage({ type: 'SKIP_WAITING' });
                  }
                });
              });
            })
            .catch((err) => {
              console.warn('[PWA] Pendaftaran Service Worker dilewati:', err);
            });
        });
      }
    }
  
    initRouting() {
      const handleHash = () => {
        const hash = window.location.hash || '#home';
        if (hash.startsWith('#subject/')) {
          const subjectId = hash.replace('#subject/', '');
          appState.set({ currentRoute: 'subject', currentSubjectId: subjectId, drawerOpen: false });
        } else if (hash === '#tantangan') {
          appState.set({ currentRoute: 'tantangan', drawerOpen: false });
        } else if (hash === '#progress') {
          appState.set({ currentRoute: 'progress', drawerOpen: false });
        } else if (hash === '#semua-pelajaran') {
          appState.set({ currentRoute: 'all-subjects', drawerOpen: false });
        } else {
          appState.set({ currentRoute: 'home', currentSubjectId: null, drawerOpen: false });
        }
      };
  
      window.addEventListener('hashchange', handleHash);
      handleHash();
    }
  
    bindState() {
      appState.subscribe((state) => {
        this.topbar.render();
        this.sidebar.render();
        this.renderMain(state);
      });
  
      // Initial render
      this.topbar.render();
      this.sidebar.render();
      this.renderMain(appState.get());
    }
  
    renderMain(state) {
      switch (state.currentRoute) {
        case 'home':
          this.renderHome();
          break;
        case 'subject':
          this.subjectView.render(state.currentSubjectId);
          break;
        case 'tantangan':
          this.challengeView.render();
          break;
        case 'progress':
          this.progressView.render();
          break;
        case 'all-subjects':
          this.renderAllSubjects();
          break;
        default:
          this.renderHome();
      }
    }
  
    renderHome() {
      try {
        const state = appState.get();
        const lang = state.lang || 'id';
        const isEn = lang === 'en';
        const progress = (store && typeof store.getProgress === 'function')
          ? store.getProgress()
          : (store && store.data ? store.data : {});
  
        this.mainEl.innerHTML = `
        <!-- 1. Dashboard Pelajar Ceria (Greeting, Streak, & Bintang) -->
        <section class="dashboard-greeting-card" style="background:linear-gradient(135deg, var(--card), var(--surface)); border:1px solid var(--line); border-radius:24px; padding:28px; margin-bottom:28px; box-shadow:var(--shadow);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px;">
            <div>
              <div class="pill" style="margin-bottom:10px;"><span class="dot"></span> ${isEn ? 'Student Learning Dashboard' : 'Dashboard Pelajar Cerdas'}</div>
              <h1 style="margin:0 0 8px; font-size:26px; font-weight:850; color:var(--ink);">
                ${isEn ? 'Welcome Back, Champion! 🌟' : 'Halo Sobat Juara! Semangat Belajar Hari Ini 🌟'}
              </h1>
              <p style="margin:0; font-size:14px; color:var(--muted); max-width:600px; line-height:1.6;">
                ${isEn ? 'Every day is a fresh adventure to collect stars, master new skills, and explore the universe!' : 'Setiap hari adalah petualangan seru untuk menambah ilmu, melatih nalar, dan mengumpulkan bintang prestasi!'}
              </p>
            </div>
  
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <div style="background:var(--card); border:1px solid var(--line); border-radius:16px; padding:12px 18px; text-align:center; min-width:110px;">
                <span style="font-size:22px;">🔥</span>
                <strong style="display:block; font-size:18px; color:var(--ink);">${progress.streakDays || 1} ${isEn ? 'Days' : 'Hari'}</strong>
                <span style="font-size:11px; color:var(--muted);">${isEn ? 'Learning Streak' : 'Streak Semangat'}</span>
              </div>
              <div style="background:var(--card); border:1px solid var(--line); border-radius:16px; padding:12px 18px; text-align:center; min-width:110px;">
                <span style="font-size:22px;">⭐</span>
                <strong style="display:block; font-size:18px; color:var(--ink);">${progress.stars || 15}</strong>
                <span style="font-size:11px; color:var(--muted);">${isEn ? 'Stars Collected' : 'Bintang Juara'}</span>
              </div>
            </div>
          </div>
  
          <!-- Bar Lanjutkan Belajar Terakhir -->
          <div style="margin-top:24px; padding-top:20px; border-top:1px solid var(--line); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:12px;">
              <span style="font-size:24px; background:var(--teal-soft); border-radius:12px; padding:6px 10px;">🧮</span>
              <div>
                <span style="font-size:11px; font-weight:700; color:var(--muted); text-transform:uppercase;">${isEn ? 'Continue Where You Left Off:' : 'Lanjutkan Belajar Terakhir:'}</span>
                <strong style="display:block; font-size:14.5px; color:var(--ink);">${isEn ? 'Mathematics — Math Toolbox (Decomposition & Number Line)' : 'Matematika — Math Toolbox (Pecah Angka & Garis Bilangan)'}</strong>
              </div>
            </div>
            <button class="btn primary" id="btnResumeLearning" type="button">
              ${isEn ? 'Resume Learning ➔' : 'Lanjutkan Belajar ➔'}
            </button>
          </div>
        </section>
  
        <!-- 2. Tantangan Hari Ini & Misi Ceria -->
        <section style="margin-bottom:32px;">
          <div style="background:linear-gradient(135deg, rgba(91,224,223,0.12), rgba(255,178,27,0.12)); border:1px solid var(--teal); border-radius:20px; padding:22px 26px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                <span style="font-size:20px;">🎯</span>
                <h3 style="margin:0; font-size:17px; font-weight:850; color:var(--ink);">${isEn ? 'Daily Quest Ready!' : 'Misi Tantangan Hari Ini Siap!'}</h3>
              </div>
              <p style="margin:0; font-size:13px; color:var(--muted);">
                ${isEn ? 'Complete 3 interactive mini quizzes to earn bonus achievement points and unlock new avatars.' : 'Selesaikan 3 kuis interaktif hari ini untuk mendapatkan bonus poin bintang dan lencana pahlawan cilik.'}
              </p>
            </div>
            <button class="btn secondary" id="btnGoToChallenge" type="button" style="background:var(--card); font-weight:750;">
              ${isEn ? 'Open Daily Challenge 🚀' : 'Buka Tantangan Harian 🚀'}
            </button>
          </div>
        </section>
  
        <!-- 3. Dua Modul Flagship Unggulan -->
        <section style="margin-bottom:36px;">
          <div class="section-header" style="margin-bottom:18px;">
            <div class="eyebrow"><span class="no">⭐</span><span class="lbl">${isEn ? 'Featured Interactive Modules' : 'Modul Pembelajaran Unggulan'}</span></div>
            <h2 class="section-title">${isEn ? 'Master Key Subjects Interactively' : 'Pelajari Modul Unggulan Interaktif'}</h2>
            <p class="section-sub">${isEn ? 'Explore deep conceptual visualizers for Mathematics and Geography' : 'Dilengkapi visualizer konsep mendalam untuk Matematika dan Geografi'}</p>
          </div>
  
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:20px;">
            <!-- Card Matematika -->
            <div class="subject-card" data-subject-id="matematika" style="cursor:pointer; border:2px solid var(--teal); background:var(--card); padding:24px;">
              <div class="subject-card-top" style="margin-bottom:14px;">
                <div class="subject-icon" style="background:var(--teal-soft); color:var(--teal-soft-ink); font-size:28px;">🧮</div>
                <span class="subject-badge" style="background:var(--teal-soft); color:var(--teal-soft-ink);">Flagship v2.0</span>
              </div>
              <h3 style="font-size:20px; font-weight:850; margin:0 0 8px;">${isEn ? 'Math Toolbox — One Problem, Many Ways!' : 'Math Toolbox — Satu Soal, Banyak Cara!'}</h3>
              <p style="font-size:13.5px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
                ${isEn ? 'Master multi-strategy thinking: Number Bonds, Compensation, Number Line, Base-Ten Blocks, and Soroban Abacus!' : 'Kuasai 9 jurus berpikir fleksibel: Pecah Angka, Number Bonds, Bikin 100, Kompensasi, Garis Bilangan, Balok Satuan, hingga Sempoa Soroban!'}
              </p>
              <div class="subject-card-footer" style="padding-top:12px; border-top:1px solid var(--line);">
                <span style="font-weight:700; color:var(--teal);">${isEn ? '9 Thinking Strategies' : '9 Jurus Berpikir'}</span>
                <span style="font-weight:800; color:var(--ink);">${isEn ? 'Explore Math ➔' : 'Eksplorasi Matematika ➔'}</span>
              </div>
            </div>
  
            <!-- Card Geografi -->
            <div class="subject-card" data-subject-id="geografi" style="cursor:pointer; border:2px solid #2192cf; background:var(--card); padding:24px;">
              <div class="subject-card-top" style="margin-bottom:14px;">
                <div class="subject-icon" style="background:rgba(33,146,207,0.15); color:#2192cf; font-size:28px;">🌍</div>
                <span class="subject-badge" style="background:rgba(33,146,207,0.15); color:#2192cf;">Globe 3D & Peta 2D</span>
              </div>
              <h3 style="font-size:20px; font-weight:850; margin:0 0 8px;">${isEn ? 'Geography — Earth & 2D Indonesian Map' : 'Geografi — Bumi Bulat & Peta 2D Indonesia'}</h3>
              <p style="font-size:13.5px; color:var(--muted); line-height:1.6; margin:0 0 16px;">
                ${isEn ? 'Turn the enlarged 3D Globe, inspect the interactive 2D Map of Indonesia with 38 provinces, and discover the 9 regencies of Bali!' : 'Putar Globe 3D meja sekolah, jelajahi Peta 2D Interaktif Indonesia 38 provinsi, dan kenali 8 kabupaten + 1 kota di Pulau Bali!'}
              </p>
              <div class="subject-card-footer" style="padding-top:12px; border-top:1px solid var(--line);">
                <span style="font-weight:700; color:#2192cf;">38 Prov & 177 Negara</span>
                <span style="font-weight:800; color:var(--ink);">${isEn ? 'Explore Geography ➔' : 'Jelajah Geografi ➔'}</span>
              </div>
            </div>
          </div>
        </section>
  
        <!-- 4. Tombol Akses Cepat ke Katalog Lengkap -->
        <section style="text-align:center; padding:24px; background:var(--surface); border:1px dashed var(--line); border-radius:18px; margin-bottom:36px;">
          <h4 style="margin:0 0 6px; font-size:16px; font-weight:800; color:var(--ink);">${isEn ? 'Looking for Other Subjects?' : 'Ingin Belajar Mata Pelajaran Lainnya?'}</h4>
          <p style="margin:0 0 14px; font-size:13px; color:var(--muted);">
            ${isEn ? 'Check out all 10 subjects including English, Indonesian, Civics, Balinese, Arts, PE, and P5 Projects.' : 'Buka katalog 10 mata pelajaran lengkap: Bahasa Indonesia, Bahasa Inggris, Pancasila, Bahasa Bali, Seni Rupa, PJOK, Agama, dan Proyek P5.'}
          </p>
          <button class="btn primary" id="btnOpenAllSubjects" type="button">
            ${isEn ? 'View All 10 Subjects Catalog 📚' : 'Buka Katalog 10 Mata Pelajaran 📚'}
          </button>
        </section>
  
        <!-- 5. Kutipan Motivasi Pelajar -->
        <blockquote style="margin:0 0 32px; padding:18px 24px; background:var(--card); border-left:4px solid var(--teal); border-radius:12px; font-style:italic; font-size:13.5px; color:var(--muted); line-height:1.6;">
          ${isEn ? '“One problem has many ways. Never be afraid to make mistakes, because every step is a beginning of real learning!” — Anabhi Dev Smart Study' : '“Satu soal memiliki banyak cara. Jangan pernah takut salah, karena dari situlah pemikiran kreatif dan rasa ingin tahu kita berkembang!” — Anabhi Dev Smart Study'}
        </blockquote>
  
        <!-- Footer Aplikasi -->
        <footer class="app-footer">
          <strong>AnabhiDev Smart Study</strong> — ${(typeof t === 'function') ? t('pill', lang) : 'Media Belajar Interaktif SD Kelas 1'}<br>
          ${(typeof t === 'function') ? t('developmentCredit', lang) : 'Development · Anabhi Dev'} · 2026
        </footer>
      `;
  
      // Event listeners di dashboard beranda
      const btnResume = this.mainEl.querySelector('#btnResumeLearning');
      if (btnResume) {
        btnResume.addEventListener('click', () => {
          appState.navigate('subject', 'matematika');
        });
      }
  
      const btnChallenge = this.mainEl.querySelector('#btnGoToChallenge');
      if (btnChallenge) {
        btnChallenge.addEventListener('click', () => {
          appState.navigate('tantangan');
        });
      }
  
      const btnAll = this.mainEl.querySelector('#btnOpenAllSubjects');
      if (btnAll) {
        btnAll.addEventListener('click', () => {
          appState.navigate('all-subjects');
        });
      }
  
      const subjectCards = this.mainEl.querySelectorAll('.subject-card[data-subject-id]');
      subjectCards.forEach(card => {
        card.addEventListener('click', () => {
          const id = card.getAttribute('data-subject-id');
          appState.navigate('subject', id);
        });
      });
      } catch (err) {
        console.error('[App] Error in renderHome:', err);
      }
    }
  
    renderAllSubjects() {
      const state = appState.get();
      const lang = state.lang || 'id';
      const isEn = lang === 'en';
  
      let activeCategory = 'all';
      let searchQuery = '';
  
      const renderCatalogGrid = () => {
        let filtered = SUBJECTS;
        if (activeCategory === 'core') {
          filtered = filtered.filter(s => ['matematika', 'geografi', 'bahasa-indonesia', 'bahasa-inggris'].includes(s.id));
        } else if (activeCategory === 'character') {
          filtered = filtered.filter(s => ['pancasila', 'agama'].includes(s.id));
        } else if (activeCategory === 'skills') {
          filtered = filtered.filter(s => ['seni-rupa', 'pjok'].includes(s.id));
        } else if (activeCategory === 'local') {
          filtered = filtered.filter(s => ['bahasa-bali', 'kokurikuler'].includes(s.id));
        }
  
        if (searchQuery.trim()) {
          const q = searchQuery.trim().toLowerCase();
          filtered = filtered.filter(s => {
            const name = getSubjectName(s, lang).toLowerCase();
            const desc = getSubjectDesc(s, lang).toLowerCase();
            return name.includes(q) || desc.includes(q);
          });
        }
  
        const gridEl = this.mainEl.querySelector('#catalogGrid');
        const countEl = this.mainEl.querySelector('#catalogCount');
        if (countEl) {
          countEl.textContent = `${filtered.length} ${isEn ? 'subjects found' : 'mata pelajaran ditemukan'}`;
        }
  
        if (gridEl) {
          gridEl.innerHTML = filtered.map(sub => {
            const displayName = getSubjectName(sub, lang);
            const badge = getSubjectBadge(sub, lang);
            const desc = getSubjectDesc(sub, lang);
  
            return `
              <div class="subject-card" data-subject-id="${sub.id}" style="cursor:pointer;">
                <div>
                  <div class="subject-card-top">
                    <div class="subject-icon" style="background:${sub.accentLight}; color:${sub.accentColor};">${sub.icon}</div>
                    <span class="subject-badge" style="background:${sub.accentLight}; color:${sub.accentColor};">${badge}</span>
                  </div>
                  <h3>${displayName}</h3>
                  <p>${desc}</p>
                </div>
                <div class="subject-card-footer">
                  <span>${sub.topicsCount} ${t('topicsCountLabel', lang)} • 6 LKS</span>
                  <span>${t('openSubject', lang)} ➔</span>
                </div>
              </div>
            `;
          }).join('');
  
          gridEl.querySelectorAll('.subject-card[data-subject-id]').forEach(card => {
            card.addEventListener('click', () => {
              const id = card.getAttribute('data-subject-id');
              appState.navigate('subject', id);
            });
          });
        }
      };
  
      this.mainEl.innerHTML = `
        <!-- Header Katalog Semua Pelajaran -->
        <section class="section-header" style="margin-bottom:24px;">
          <div class="eyebrow"><span class="no">📚</span><span class="lbl">${isEn ? 'Curriculum Directory · Elementary Grades' : 'Direktori Kurikulum Lengkap · SD Fase A & B'}</span></div>
          <h2 class="section-title">${isEn ? 'All 10 Subjects Catalog' : 'Katalog 10 Mata Pelajaran Lengkap'}</h2>
          <p class="section-sub">
            ${isEn ? 'Browse through the complete curriculum. Each subject contains detailed concepts, student worksheets (LKS), and interactive quizzes.' : 'Jelajahi seluruh mata pelajaran sekolah. Setiap pelajaran dilengkapi ringkasan konsep, lembar kerja siswa (LKS), dan kuis interaktif.'}
          </p>
        </section>
  
        <!-- Bar Pencarian & Filter Kategori -->
        <div class="filter-bar" style="flex-direction:column; align-items:stretch; gap:14px; margin-bottom:28px;">
          <div class="search-input-box" style="width:100%;">
            <span class="search-icon">🔍</span>
            <input type="text" id="allSubjectsSearchInput" placeholder="${isEn ? 'Search subjects, topics, or keywords...' : 'Cari nama pelajaran, topik, atau kata kunci...'}">
          </div>
  
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div class="island-chips" id="catalogCategoryChips">
              <button class="chip-btn active" data-cat="all" type="button">
                ${isEn ? 'All Subjects (10)' : 'Semua Pelajaran (10)'}
              </button>
              <button class="chip-btn" data-cat="core" type="button">
                ${isEn ? 'Core Subjects (4)' : 'Pelajaran Utama (4)'}
              </button>
              <button class="chip-btn" data-cat="character" type="button">
                ${isEn ? 'Character & Civics (2)' : 'Karakter & Nilai (2)'}
              </button>
              <button class="chip-btn" data-cat="skills" type="button">
                ${isEn ? 'Arts & PE (2)' : 'Seni & Raga (2)'}
              </button>
              <button class="chip-btn" data-cat="local" type="button">
                ${isEn ? 'Local & P5 Project (2)' : 'Muatan Lokal & P5 (2)'}
              </button>
            </div>
            <div id="catalogCount" style="font-weight:750; font-size:13px; color:var(--teal);">
              10 ${isEn ? 'subjects found' : 'mata pelajaran'}
            </div>
          </div>
        </div>
  
        <!-- Grid Daftar Mata Pelajaran -->
        <div class="subject-grid" id="catalogGrid"></div>
  
        <!-- Footer Aplikasi -->
        <footer class="app-footer" style="margin-top:40px;">
          <strong>AnabhiDev Smart Study</strong> — ${(typeof t === 'function') ? t('pill', lang) : 'Media Belajar Interaktif SD Kelas 1'}<br>
          ${(typeof t === 'function') ? t('developmentCredit', lang) : 'Development · Anabhi Dev'} · 2026
        </footer>
      `;
  
      // Pasang listener input pencarian
      const searchInput = this.mainEl.querySelector('#allSubjectsSearchInput');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value;
          renderCatalogGrid();
        });
      }
  
      // Pasang listener chip kategori
      const catChips = this.mainEl.querySelectorAll('#catalogCategoryChips .chip-btn');
      catChips.forEach(btn => {
        btn.addEventListener('click', () => {
          catChips.forEach(c => c.classList.remove('active'));
          btn.classList.add('active');
          activeCategory = btn.getAttribute('data-cat');
          renderCatalogGrid();
        });
      });
  
      renderCatalogGrid();
    }
  }
  
  // Bootstrap saat DOM siap
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      new App();
    });
  } else {
    new App();
  }
  

  // Bootstrap saat DOM siap
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      new App();
    });
  } else {
    new App();
  }

})();
