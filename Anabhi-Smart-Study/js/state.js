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

export const appState = new AppState();
