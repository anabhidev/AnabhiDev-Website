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

export class ProgressStore {
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

export const store = new ProgressStore();

