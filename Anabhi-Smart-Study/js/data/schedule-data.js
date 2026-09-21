// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// JavaScript · ES Module · Schedule Data (Jadwal Pelajaran Kelas 1B)
// Development · Anabhi Dev
// Version   : 2.0 (Tahun Pelajaran 2026/2027)
// Generated : 21 September 2026, 11:15:00 WITA
// ================================================================

export const SCHEDULE_DATA = {
  academicYear: '2026/2027',
  grade: 'Kelas 1B',
  title: 'Jadwal Pelajaran Kelas 1B',
  titleEn: 'Grade 1B Class Schedule',
  subtitle: 'Tahun Pelajaran 2026/2027 · SD Kelas 1B Kurikulum Merdeka',
  subtitleEn: 'Academic Year 2026/2027 · Grade 1B Merdeka Curriculum',
  schoolHours: '07.30 – 12.30 WITA',
  posterImage: 'assets/img/jadwal-kelas-1b.jpg',

  // 10 Slot Jam Pembelajaran Resmi SD Kelas 1B
  periods: [
    { no: 1, time: '07.30 – 08.05', duration: '35m', isBreak: false },
    { no: 2, time: '08.05 – 08.40', duration: '35m', isBreak: false },
    { no: 3, time: '08.40 – 09.15', duration: '35m', isBreak: false },
    { no: 4, time: '09.15 – 09.30', duration: '15m', isBreak: true, label: 'Istirahat Pertama 🌼' },
    { no: 5, time: '09.30 – 10.05', duration: '35m', isBreak: false },
    { no: 6, time: '10.05 – 10.40', duration: '35m', isBreak: false },
    { no: 7, time: '10.40 – 11.15', duration: '35m', isBreak: false },
    { no: 8, time: '11.15 – 11.30', duration: '15m', isBreak: true, label: 'Istirahat Kedua 🌼' },
    { no: 9, time: '11.30 – 12.05', duration: '35m', isBreak: false },
    { no: 10, time: '12.05 – 12.30', duration: '25m', isBreak: false }
  ],

  // Rincian Jadwal per Hari (Senin s/d Jumat)
  days: {
    senin: {
      id: 'senin',
      dayIndex: 1,
      name: 'Senin',
      nameEn: 'Monday',
      badgeColor: '#15803d',
      badgeBg: 'rgba(21, 128, 61, 0.12)',
      tagline: 'Awal pekan penuh berkah, nalar matematika, dan dasar budi pekerti luhur!',
      schedule: [
        { period: 1, time: '07.30 – 08.05', subjectId: 'agama', name: 'Agama dan Budi Pekerti', nameEn: 'Religious & Moral Education', icon: '🙏', tip: 'Doa harian, rasa syukur, dan budi pekerti luhur.' },
        { period: 2, time: '08.05 – 08.40', subjectId: 'agama', name: 'Agama dan Budi Pekerti', nameEn: 'Religious & Moral Education', icon: '🙏', tip: 'Cerita keteladanan dan budi pekerti.' },
        { period: 3, time: '08.40 – 09.15', subjectId: 'agama', name: 'Agama dan Budi Pekerti', nameEn: 'Religious & Moral Education', icon: '🙏', tip: 'Praktik doa dan sikap sopan santun.' },
        { period: 4, time: '09.15 – 09.30', isBreak: true, name: 'Istirahat Pertama 🌼', note: 'Cuci tangan pakai sabun, makan bekal sehat, dan minum air putih!' },
        { period: 5, time: '09.30 – 10.05', subjectId: 'matematika', name: 'Matematika', nameEn: 'Mathematics', icon: '🧮', tip: 'Konsep bilangan 1–20, nilai tempat, dan Math Toolbox.' },
        { period: 6, time: '10.05 – 10.40', subjectId: 'matematika', name: 'Matematika', nameEn: 'Mathematics', icon: '🧮', tip: 'Latihan nalar berhitung asyik dan penjumlahan.' },
        { period: 7, time: '10.40 – 11.15', subjectId: 'pancasila', name: 'Pendidikan Pancasila', nameEn: 'Pancasila Education', icon: '🇮🇩', tip: 'Mengenal simbol Garuda dan sila-sila Pancasila.' },
        { period: 8, time: '11.15 – 11.30', isBreak: true, name: 'Istirahat Kedua 🌼', note: 'Tarik nafas segar, regangkan badan, dan rapikan alat tulis!' },
        { period: 9, time: '11.30 – 12.05', subjectId: 'pancasila', name: 'Pendidikan Pancasila', nameEn: 'Pancasila Education', icon: '🇮🇩', tip: 'Aturan hidup rukun di rumah dan di sekolah.' },
        { period: 10, time: '12.05 – 12.30', subjectId: 'kokurikuler', name: 'Kokurikuler', nameEn: 'Co-curricular (P5)', icon: '🎨', tip: 'Projek penguatan karakter profil pelajar Pancasila.' }
      ]
    },
    selasa: {
      id: 'selasa',
      dayIndex: 2,
      name: 'Selasa',
      nameEn: 'Tuesday',
      badgeColor: '#4338ca',
      badgeBg: 'rgba(67, 56, 202, 0.12)',
      tagline: 'Tubuh sehat bugar berolahraga, cinta tanah air, dan asah logika!',
      schedule: [
        { period: 1, time: '07.30 – 08.05', subjectId: 'pjok', name: 'PJOK', nameEn: 'Physical Education (PJOK)', icon: '🏃', tip: 'Pemanasan, senam sehat, dan gerak lokomotor!' },
        { period: 2, time: '08.05 – 08.40', subjectId: 'pjok', name: 'PJOK', nameEn: 'Physical Education (PJOK)', icon: '🏃', tip: 'Permainan gerak dasar dan kelincahan tubuh.' },
        { period: 3, time: '08.40 – 09.15', subjectId: 'pjok', name: 'PJOK', nameEn: 'Physical Education (PJOK)', icon: '🏃', tip: 'Pendinginan, minum air, dan ganti pakaian bersih.' },
        { period: 4, time: '09.15 – 09.30', isBreak: true, name: 'Istirahat Pertama 🌼', note: 'Minum air secukupnya dan nikmati camilan bernutrisi!' },
        { period: 5, time: '09.30 – 10.05', subjectId: 'pancasila', name: 'Pendidikan Pancasila', nameEn: 'Pancasila Education', icon: '🇮🇩', tip: 'Menghargai perbedaan dan saling menyayangi sesama teman.' },
        { period: 6, time: '10.05 – 10.40', subjectId: 'pancasila', name: 'Pendidikan Pancasila', nameEn: 'Pancasila Education', icon: '🇮🇩', tip: 'Kerja bakti dan gotong royong membersihkan kelas.' },
        { period: 7, time: '10.40 – 11.15', subjectId: 'matematika', name: 'Matematika', nameEn: 'Mathematics', icon: '🧮', tip: 'Bongkar pasang angka (Number Bonds) & garis bilangan.' },
        { period: 8, time: '11.15 – 11.30', isBreak: true, name: 'Istirahat Kedua 🌼', note: 'Istirahat mata sejenak dan buang sampah pada tempatnya!' },
        { period: 9, time: '11.30 – 12.05', subjectId: 'matematika', name: 'Matematika', nameEn: 'Mathematics', icon: '🧮', tip: 'Permainan kuis berhitung ceria dan jurus cepat.' },
        { period: 10, time: '12.05 – 12.30', isFree: true, name: 'Selesai Belajar / Pulang Ceria', note: 'Merapikan tas sekolah dan bersiap pulang!' }
      ]
    },
    rabu: {
      id: 'rabu',
      dayIndex: 3,
      name: 'Rabu',
      nameEn: 'Wednesday',
      badgeColor: '#0369a1',
      badgeBg: 'rgba(3, 105, 161, 0.12)',
      tagline: 'Kaya literasi bahasa Indonesia, lestarikan basa Bali, dan eksplorasi seni!',
      schedule: [
        { period: 1, time: '07.30 – 08.05', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Mengenal huruf abjad, bunyi vokal, dan konsonan.' },
        { period: 2, time: '08.05 – 08.40', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Membaca suku kata dan nama-nama benda di sekitar.' },
        { period: 3, time: '08.40 – 09.15', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Menyimak cerita dongeng anak bergambar.' },
        { period: 4, time: '09.15 – 09.30', isBreak: true, name: 'Istirahat Pertama 🌼', note: 'Makan bekal sehat bersama teman dengan santun.' },
        { period: 5, time: '09.30 – 10.05', subjectId: 'bahasa-bali', name: 'Bahasa Bali', nameEn: 'Balinese Language', icon: '🌺', tip: 'Mabasa Bali alus, kruna aran sarwa buron & entik-entikan.' },
        { period: 6, time: '10.05 – 10.40', subjectId: 'bahasa-bali', name: 'Bahasa Bali', nameEn: 'Balinese Language', icon: '🌺', tip: 'Gending Rare Bali (Meyong-Meyong, Dadong Dauh).' },
        { period: 7, time: '10.40 – 11.15', subjectId: 'seni-rupa', name: 'Seni Rupa', nameEn: 'Visual Arts', icon: '🎨', tip: 'Garis, bidang, dan warna-warni ceria.' },
        { period: 8, time: '11.15 – 11.30', isBreak: true, name: 'Istirahat Kedua 🌼', note: 'Cuci tangan dari cat/krayon dan rapikan meja belajar.' },
        { period: 9, time: '11.30 – 12.05', subjectId: 'seni-rupa', name: 'Seni Rupa', nameEn: 'Visual Arts', icon: '🎨', tip: 'Menggambar bebas kreasi imajinatif.' },
        { period: 10, time: '12.05 – 12.30', isFree: true, name: 'Selesai Belajar / Pulang Ceria', note: 'Merapikan tas sekolah dan bersiap pulang!' }
      ]
    },
    kamis: {
      id: 'kamis',
      dayIndex: 4,
      name: 'Kamis',
      nameEn: 'Thursday',
      badgeColor: '#be123c',
      badgeBg: 'rgba(190, 18, 60, 0.12)',
      tagline: 'Perkuat membaca mandiri, kreasi artistik, dan projek seru kolaboratif!',
      schedule: [
        { period: 1, time: '07.30 – 08.05', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Latihan menulis kalimat sederhana dengan huruf tegak rapi.' },
        { period: 2, time: '08.05 – 08.40', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Membaca nyaring dengan intonasi yang tepat.' },
        { period: 3, time: '08.40 – 09.15', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Tanya jawab kosakata baru bergambar.' },
        { period: 4, time: '09.15 – 09.30', isBreak: true, name: 'Istirahat Pertama 🌼', note: 'Cuci tangan sebelum makan dan rapikan kotak bekal.' },
        { period: 5, time: '09.30 – 10.05', subjectId: 'bahasa-indonesia', name: 'Bahasa Indonesia', nameEn: 'Indonesian Language', icon: '📖', tip: 'Menceritakan kembali gambar berseri secara berurutan.' },
        { period: 6, time: '10.05 – 10.40', subjectId: 'seni-rupa', name: 'Seni Rupa', nameEn: 'Visual Arts', icon: '🎨', tip: 'Membuat kolase atau karya lipat kertas sederhana.' },
        { period: 7, time: '10.40 – 11.15', subjectId: 'kokurikuler', name: 'Kokurikuler', nameEn: 'Co-curricular (P5)', icon: '🌱', tip: 'Aktivitas eksplorasi lingkungan dan kebersamaan.' },
        { period: 8, time: '11.15 – 11.30', isBreak: true, name: 'Istirahat Kedua 🌼', note: 'Minum air putih dan periksa perlengkapan sekolah.' },
        { period: 9, time: '11.30 – 12.05', subjectId: 'kokurikuler', name: 'Kokurikuler', nameEn: 'Co-curricular (P5)', icon: '🌱', tip: 'Projek kreativitas dan gotong royong kelompok.' },
        { period: 10, time: '12.05 – 12.30', isFree: true, name: 'Selesai Belajar / Pulang Ceria', note: 'Merapikan tas sekolah dan bersiap pulang!' }
      ]
    },
    jumat: {
      id: 'jumat',
      dayIndex: 5,
      name: 'Jumat',
      nameEn: 'Friday',
      badgeColor: '#047857',
      badgeBg: 'rgba(4, 120, 87, 0.12)',
      tagline: 'Jumat bersih ceria, penguatan karakter P5, dan English vocabulary!',
      schedule: [
        { period: 1, time: '07.30 – 08.05', subjectId: 'kokurikuler', name: 'Kokurikuler', nameEn: 'Co-curricular (P5)', icon: '🌟', tip: 'Senam pagi ceria dan gerakan peduli lingkungan sekolah.' },
        { period: 2, time: '08.05 – 08.40', subjectId: 'kokurikuler', name: 'Kokurikuler', nameEn: 'Co-curricular (P5)', icon: '🌟', tip: 'Projek penguatan karakter Profil Pelajar Pancasila.' },
        { period: 3, time: '08.40 – 09.15', subjectId: 'kokurikuler', name: 'Kokurikuler', nameEn: 'Co-curricular (P5)', icon: '🌟', tip: 'Refleksi karya dan penanaman nilai akhlak mulia.' },
        { period: 4, time: '09.15 – 09.30', isBreak: true, name: 'Istirahat Pertama 🌼', note: 'Makan bekal sehat sebelum kelas bahasa Inggris.' },
        { period: 5, time: '09.30 – 10.05', subjectId: 'bahasa-inggris', name: 'Bahasa Inggris', nameEn: 'English Language', icon: '🇬🇧', tip: 'Greetings, colors, fruits, and cheerful alphabet songs!' },
        { period: 6, time: '10.05 – 10.40', subjectId: 'bahasa-inggris', name: 'Bahasa Inggris', nameEn: 'English Language', icon: '🇬🇧', tip: 'Numbers 1–10 in English and interactive matching fun.' },
        { period: 7, time: '10.40 – 11.15', isFree: true, name: 'Pulang Ceria Akhir Pekan 🎉', note: 'Selamat berakhir pekan dan selamat berkumpul bersama keluarga!' },
        { period: 8, time: '11.15 – 11.30', isFree: true, name: '-', note: '' },
        { period: 9, time: '11.30 – 12.05', isFree: true, name: '-', note: '' },
        { period: 10, time: '12.05 – 12.30', isFree: true, name: '-', note: '' }
      ]
    }
  }
};

/**
 * Mendapatkan jadwal berdasarkan indeks hari JavaScript (0=Minggu, 1=Senin, ..., 6=Sabtu)
 */
export function getScheduleByDayIndex(dayIndex) {
  switch (dayIndex) {
    case 1: return { key: 'senin', ...SCHEDULE_DATA.days.senin, isWeekend: false };
    case 2: return { key: 'selasa', ...SCHEDULE_DATA.days.selasa, isWeekend: false };
    case 3: return { key: 'rabu', ...SCHEDULE_DATA.days.rabu, isWeekend: false };
    case 4: return { key: 'kamis', ...SCHEDULE_DATA.days.kamis, isWeekend: false };
    case 5: return { key: 'jumat', ...SCHEDULE_DATA.days.jumat, isWeekend: false };
    default:
      // Akhir Pekan (Sabtu / Minggu) -> Berikan pratinjau hari Senin
      return {
        key: 'weekend',
        isWeekend: true,
        weekendName: dayIndex === 6 ? 'Sabtu' : 'Minggu',
        nextDay: SCHEDULE_DATA.days.senin
      };
  }
}

/**
 * Mengelompokkan slot pelajaran yang berurutan untuk tampilan ringkasan (Grouping Block)
 */
export function getGroupedDailySchedule(dayKey) {
  const day = SCHEDULE_DATA.days[dayKey];
  if (!day) return [];

  const groups = [];
  let currentGroup = null;

  for (const item of day.schedule) {
    if (item.isFree && item.name === '-') continue;

    if (item.isBreak) {
      if (currentGroup) {
        groups.push(currentGroup);
        currentGroup = null;
      }
      groups.push({
        type: 'break',
        name: item.name,
        time: item.time,
        note: item.note,
        isBreak: true
      });
      continue;
    }

    if (item.isFree) {
      if (currentGroup) {
        groups.push(currentGroup);
        currentGroup = null;
      }
      groups.push({
        type: 'free',
        name: item.name,
        time: item.time,
        note: item.note
      });
      continue;
    }

    // Mata Pelajaran
    if (currentGroup && currentGroup.subjectId === item.subjectId) {
      currentGroup.periodEnd = item.period;
      currentGroup.timeEnd = item.time.split(' – ')[1] || item.time;
      currentGroup.periodCount += 1;
    } else {
      if (currentGroup) {
        groups.push(currentGroup);
      }
      const [start, end] = item.time.split(' – ');
      currentGroup = {
        type: 'subject',
        subjectId: item.subjectId,
        name: item.name,
        nameEn: item.nameEn,
        icon: item.icon,
        tip: item.tip,
        periodStart: item.period,
        periodEnd: item.period,
        timeStart: start,
        timeEnd: end || start,
        periodCount: 1
      };
    }
  }

  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
}

