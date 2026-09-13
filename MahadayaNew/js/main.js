/* ================================================================
AnabhiDev-MP — Mahadaya Partners Website
JavaScript · Main Script
Development · Anabhi Dev
Version   : 1.4
Generated : 13 September 2026, 10:00:00
================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Header Scroll & Back-to-Top (Unified RAF-Throttled Scroll Listener) ───
  const header = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');

  let scrollTicking = false;
  const updateScrollState = () => {
    scrollTicking = false;
    const y = window.scrollY;
    if (header) {
      if (y > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
    if (backToTop) {
      if (y > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateScrollState);
    }
  }, { passive: true });
  updateScrollState(); // Run on load

  // ─── Mobile Navigation Toggle ───
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      toggleBtn.classList.toggle('active');
      mainNav.classList.toggle('active');
      document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });
    // Close nav when clicking a link
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        toggleBtn.classList.remove('active');
        toggleBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ─── Scroll Reveal (IntersectionObserver + sweep pengaman) ───
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length > 0) {
    let pending = Array.from(revealElements);
    let sweepQueued = false;

    const reveal = (el) => {
      el.classList.add('visible');
      revealObserver.unobserve(el);
    };

    function prune() {
      pending = pending.filter(el => !el.classList.contains('visible'));
      if (pending.length === 0) window.removeEventListener('scroll', onScroll);
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) reveal(entry.target); });
      prune();
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    // IntersectionObserver hanya menghitung perpotongan sekali per frame.
    // Kalau scroll melompat (klik anchor, flick cepat di HP, atau frame drop di
    // device lemah), sebuah elemen bisa melewati viewport dalam satu frame —
    // observer tidak pernah melaporkannya intersecting dan elemen itu akan
    // tersangkut di opacity:0 selamanya. Sweep ini menutup celah tersebut:
    // apa pun yang sudah terlewati (top < tinggi viewport) langsung ditampilkan.
    // Dibungkus requestAnimationFrame sesuai aturan RAF-throttle SOP kategori 1
    // supaya pembacaan getBoundingClientRect tidak memicu forced reflow tiap event.
    const sweep = () => {
      sweepQueued = false;
      const vh = window.innerHeight;
      pending.forEach(el => {
        if (el.getBoundingClientRect().top < vh) reveal(el);
      });
      prune();
    };

    const onScroll = () => {
      if (sweepQueued) return;
      sweepQueued = true;
      requestAnimationFrame(sweep);
    };

    revealElements.forEach(el => revealObserver.observe(el));
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // ─── Counter Animation ───
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (target - startValue) * eased);
      el.textContent = prefix + current.toLocaleString('id-ID') + suffix;
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = prefix + target.toLocaleString('id-ID') + suffix;
      }
    }
    requestAnimationFrame(updateCounter);
  }

  // ─── Back to Top Click Action ───
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ─── Contact Form → WhatsApp Handoff ───
  // Situs ini statis (tanpa backend), jadi form tidak dikirim ke server.
  // Isian dirangkai jadi satu pesan lalu dibuka di WhatsApp — pengguna yang
  // menekan kirim. Tanpa JavaScript, <noscript> di halaman kontak mengarahkan
  // pengunjung ke tombol WhatsApp / email langsung.
  const WA_NUMBER = '628216339876';
  const contactForm = document.querySelector('#contact-form');

  if (contactForm) {
    const statusBox = contactForm.querySelector('.form-status');

    const setStatus = (message, kind) => {
      if (!statusBox) return;
      statusBox.textContent = message;
      statusBox.classList.remove('is-error', 'is-success');
      statusBox.classList.add(kind === 'error' ? 'is-error' : 'is-success');
      statusBox.hidden = false;
    };

    const markInvalid = (field, invalid) => {
      if (invalid) {
        field.setAttribute('aria-invalid', 'true');
      } else {
        field.removeAttribute('aria-invalid');
      }
    };

    // Bersihkan penanda error begitu pengguna mulai memperbaiki isiannya
    contactForm.querySelectorAll('.form-control').forEach(field => {
      field.addEventListener('input', () => markInvalid(field, false));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const val = (name) => {
        const el = contactForm.elements[name];
        return el ? el.value.trim() : '';
      };

      const name = val('name');
      const email = val('email');
      const message = val('message');

      // Validasi: pesan spesifik menyebut field mana yang bermasalah
      const problems = [];
      [['name', name, 'Nama Lengkap'], ['email', email, 'Email'], ['message', message, 'Pesan']]
        .forEach(([key, value, label]) => {
          const field = contactForm.elements[key];
          const empty = value === '';
          markInvalid(field, empty);
          if (empty) problems.push(label);
        });

      if (problems.length > 0) {
        setStatus('Mohon lengkapi dulu: ' + problems.join(', ') + '.', 'error');
        const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
        markInvalid(contactForm.elements.email, true);
        setStatus('Format email belum benar. Contoh yang valid: nama@instansi.go.id', 'error');
        contactForm.elements.email.focus();
        return;
      }

      const serviceSelect = contactForm.elements.service;
      const serviceText = serviceSelect && serviceSelect.value
        ? serviceSelect.options[serviceSelect.selectedIndex].text
        : '';

      const lines = [
        'Halo Mahadaya Partners, saya ingin berkonsultasi.',
        '',
        'Nama     : ' + name,
        'Email    : ' + email
      ];
      if (val('phone')) lines.push('Telepon  : ' + val('phone'));
      if (val('company')) lines.push('Instansi : ' + val('company'));
      if (serviceText) lines.push('Layanan  : ' + serviceText);
      lines.push('', 'Pesan:', message);

      const waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (opened) {
        setStatus('Pesan Anda sudah disiapkan di WhatsApp. Tekan kirim di sana untuk menyelesaikannya.', 'success');
      } else {
        // Pop-up diblokir browser — jangan diam, beri jalur manual
        setStatus('Browser memblokir jendela baru. Silakan hubungi kami langsung di +62 821-633-9876 atau info@mahadayapartners.com', 'error');
      }
    });
  }

  // ─── MTC Corporate Certification: Interactive Readiness Assessment ───
  const readinessChecks = document.querySelectorAll('.readiness-check');
  const levelDisplay = document.querySelector('#readiness-level-display');
  const fillBar = document.querySelector('#readiness-progress-fill');
  const percentText = document.querySelector('#readiness-percent-text');
  const feedbackText = document.querySelector('#readiness-feedback-text');
  const btnGetReadiness = document.querySelector('#btn-get-readiness');
  const hiddenScoreInput = document.querySelector('#lead-readiness-score');

  if (readinessChecks.length > 0) {
    const updateReadinessScore = () => {
      const total = readinessChecks.length;
      let checkedCount = 0;
      readinessChecks.forEach(ch => { if (ch.checked) checkedCount++; });

      const percentage = Math.round((checkedCount / total) * 100);
      if (fillBar) fillBar.style.width = percentage + '%';
      if (percentText) percentText.textContent = checkedCount + ' dari ' + total + ' kriteria terpenuhi (' + percentage + '%)';

      let level = 'Not Started';
      let feedback = 'Sistem manajemen belum terdokumentasi atau diimplementasikan. MTC dapat mendampingi dari tahap pondasi awal (Assessment, Training & Drafting SOP).';

      if (checkedCount === 0) {
        level = 'Not Started';
        feedback = 'Sistem manajemen belum berjalan. MTC siap mendampingi persiapan awal dari nol (Awareness, Gap Analysis & System Design).';
      } else if (checkedCount <= 2) {
        level = 'Early';
        feedback = 'Organisasi Anda memiliki kesadaran awal, namun dokumen kunci dan SOP belum konsisten berjalan. Dibutuhkan penyusunan sistem terstruktur.';
      } else if (checkedCount <= 4) {
        level = 'Developing';
        feedback = 'Sebagian SOP dan records sudah berjalan. Fokus berikutnya adalah formalisasi internal audit dan management review agar memenuhi klausul ISO.';
      } else if (checkedCount <= 6) {
        level = 'Nearly Ready';
        feedback = 'Pondasi operasional Anda sudah sangat kuat! Hanya butuh penutupan gap minor dan simulasi pre-audit readiness sebelum audit sertifikasi.';
      } else {
        level = 'Certification Ready';
        feedback = 'Selamat! Sistem manajemen Anda memenuhi kriteria kesiapan audit independen. MTC dapat mengoordinasikan jadwal audit dengan Certification Body.';
      }

      if (levelDisplay) levelDisplay.textContent = level;
      if (feedbackText) feedbackText.textContent = feedback;
      if (hiddenScoreInput) hiddenScoreInput.value = level + ' (' + checkedCount + '/' + total + ' - ' + percentage + '%)';
    };

    readinessChecks.forEach(ch => ch.addEventListener('change', updateReadinessScore));
    updateReadinessScore(); // Run initial calculation

    if (btnGetReadiness) {
      btnGetReadiness.addEventListener('click', () => {
        const formEl = document.querySelector('#lead-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
          const challengeField = formEl.querySelector('#main_challenge');
          if (challengeField && !challengeField.value) {
            challengeField.value = 'Hasil asesmen kesiapan mandiri: ' + (hiddenScoreInput ? hiddenScoreInput.value : '');
          }
        }
      });
    }
  }

  // ─── Smart Industry Recommendations for Corporate Lead Form ───
  const industrySelect = document.querySelector('#industry');
  const recommendationBanner = document.querySelector('#recommendation-banner');
  const recommendationText = document.querySelector('#recommendation-text');
  const isoCheckboxes = document.querySelectorAll('input[name="iso_standards"]');

  const industryRecommendations = {
    'Hospitality': {
      standards: ['ISO 9001', 'ISO 45001', 'ISO 22000', 'ISO 14001'],
      text: 'Rekomendasi terpadu Hospitality (Hotel, Resort, Villa & Resto): ISO 9001 (Quality) → ISO 45001 (K3) → ISO 22000 (Food Safety) → ISO 14001 (Lingkungan).'
    },
    'Food & Beverage': {
      standards: ['ISO 9001', 'ISO 22000', 'ISO 45001', 'ISO 14001'],
      text: 'Rekomendasi terpadu F&B & Bakery: ISO 9001 (Mutu Produk) → ISO 22000 (Keamanan Pangan) → ISO 45001 (Keselamatan Kerja) → ISO 14001 (Limbah/Lingkungan).'
    },
    'Education': {
      standards: ['ISO 9001', 'ISO 45001', 'ISO/IEC 27001'],
      text: 'Rekomendasi Lembaga Pendidikan & LPK: ISO 9001 (Kualitas Pelatihan) → ISO 45001 (K3 Kampus/Siswa) → ISO/IEC 27001 (Keamanan Data Siswa/Sistem).'
    },
    'Technology': {
      standards: ['ISO 9001', 'ISO/IEC 27001', 'ISO 45001'],
      text: 'Rekomendasi IT & Digital SaaS: ISO 9001 (Tata Kelola Software/Layanan) → ISO/IEC 27001 (Keamanan Informasi & Data) → ISO 45001 (Kesehatan Kerja).'
    }
  };

  if (industrySelect) {
    industrySelect.addEventListener('change', () => {
      const selected = industrySelect.value;
      const rec = industryRecommendations[selected];

      // Reset badges
      document.querySelectorAll('.checkbox-pill-label').forEach(el => el.classList.remove('recommended'));

      if (rec && recommendationBanner && recommendationText) {
        recommendationText.textContent = rec.text;
        recommendationBanner.classList.add('active');

        // Highlight and pre-select recommended standards
        isoCheckboxes.forEach(cb => {
          const parent = cb.closest('.checkbox-pill-label');
          if (rec.standards.includes(cb.value)) {
            cb.checked = true;
            if (parent) parent.classList.add('recommended');
          }
        });
      } else if (recommendationBanner) {
        recommendationBanner.classList.remove('active');
      }
    });
  }

  // ─── Corporate Certification Lead Form Handler ───
  const certForm = document.querySelector('#cert-lead-form');
  if (certForm) {
    const certStatusBox = certForm.querySelector('.form-status');
    const setCertStatus = (msg, kind) => {
      if (!certStatusBox) return;
      certStatusBox.textContent = msg;
      certStatusBox.classList.remove('is-error', 'is-success');
      certStatusBox.classList.add(kind === 'error' ? 'is-error' : 'is-success');
      certStatusBox.hidden = false;
    };

    certForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const getVal = (name) => {
        const el = certForm.elements[name];
        return el ? el.value.trim() : '';
      };

      const company = getVal('company');
      const contactName = getVal('contact_name');
      const position = getVal('position');
      const email = getVal('email');
      const whatsapp = getVal('whatsapp');
      const industry = getVal('industry');
      const employees = getVal('employees');
      const location = getVal('location');
      const certStatus = getVal('cert_status');
      const targetDate = getVal('target_date');
      const challenge = getVal('main_challenge');
      const message = getVal('message');
      const readiness = getVal('readiness_score') || 'Belum diisi';

      const selectedStandards = [];
      certForm.querySelectorAll('input[name="iso_standards"]:checked').forEach(cb => {
        selectedStandards.push(cb.value);
      });

      if (!company || !contactName || !whatsapp || !email) {
        setCertStatus('Mohon lengkapi Nama Perusahaan, Nama Kontak, WhatsApp, dan Email Anda.', 'error');
        return;
      }

      const msgLines = [
        '*KONSULTASI MTC CORPORATE CERTIFICATION & COMPLIANCE*',
        '-------------------------------------------',
        '• Perusahaan: ' + company,
        '• Nama Kontak: ' + contactName + (position ? ' (' + position + ')' : ''),
        '• WhatsApp: ' + whatsapp,
        '• Email: ' + email,
        '• Sektor / Industri: ' + (industry || '-'),
        '• Jumlah Karyawan: ' + (employees || '-'),
        '• Lokasi: ' + (location || '-'),
        '• Status Kesiapan Saat Ini: ' + (certStatus || '-'),
        '• Skor Asesmen Kesiapan: ' + readiness,
        '• Standar ISO Diminati: ' + (selectedStandards.length > 0 ? selectedStandards.join(', ') : 'Konsultasi Penentuan Standar'),
        '• Target Waktu: ' + (targetDate || '-'),
        '• Tantangan Utama: ' + (challenge || '-'),
        '• Catatan/Kebutuhan: ' + (message || '-'),
        '-------------------------------------------',
        'Dikirim melalui Portal Resmi MTC Corporate Certification'
      ];

      const waUrl = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msgLines.join('\n'));
      const opened = window.open(waUrl, '_blank', 'noopener,noreferrer');

      if (opened) {
        setCertStatus('Data konsultasi telah disiapkan. Jendela WhatsApp sedang dibuka untuk konfirmasi pengiriman.', 'success');
      } else {
        setCertStatus('Browser memblokir pop-up WhatsApp. Silakan hubungi tim kami langsung via WhatsApp di +62 821-633-9876.', 'error');
      }
    });
  }

  // ─── Active nav highlighting based on current page ───
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a:not(.btn)').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // ─── Hero Slider Carousel (Fusi Varian D Editorial + Varian U Slider) ───
  const heroSlider = document.querySelector('#hero-carousel');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = heroSlider.querySelectorAll('.hero-dot');
    let currentIdx = 0;
    let autoTimer = null;
    const duration = 6500; // 6.5 detik per slide

    const showSlide = (idx) => {
      currentIdx = (idx + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const isActive = i === currentIdx;
        slide.classList.toggle('active', isActive);
        slide.setAttribute('aria-hidden', !isActive);
      });
      dots.forEach((dot, i) => {
        const isActive = i === currentIdx;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    };

    const nextSlide = () => showSlide(currentIdx + 1);

    const startAutoPlay = () => {
      stopAutoPlay();
      autoTimer = setInterval(nextSlide, duration);
    };

    const stopAutoPlay = () => {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
    };

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        showSlide(idx);
        startAutoPlay();
      });
    });

    // Pause on hover / touch
    heroSlider.addEventListener('mouseenter', stopAutoPlay);
    heroSlider.addEventListener('mouseleave', startAutoPlay);
    heroSlider.addEventListener('touchstart', stopAutoPlay, { passive: true });
    heroSlider.addEventListener('touchend', startAutoPlay, { passive: true });

    // Keyboard accessibility
    heroSlider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        showSlide(currentIdx + 1);
        startAutoPlay();
      } else if (e.key === 'ArrowLeft') {
        showSlide(currentIdx - 1);
        startAutoPlay();
      }
    });

    // Jalankan auto-play hanya jika user tidak meminta reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && slides.length > 1) {
      startAutoPlay();
    }
  }

});
