// ================================================================
// AnabhiDev-BPC — Bali Private Chef & Culinary Consulting Website
// HTML5 · Vanilla CSS · Vanilla JavaScript
// Development · Anabhi Dev
// Version   : 1.1
// Generated : 28 August 2026, 02:56:40
// ----------------------------------------------------------------
// Form booking → WhatsApp deep-link.
//
// Form ini TIDAK mengirim data ke server mana pun. Konsekuensinya
// disengaja: tidak ada endpoint yang bisa di-spam, tidak ada data
// tamu yang tersimpan di sisi kita, dan tidak ada API key di
// frontend. Validasi di sini murni untuk UX — tidak ada yang bisa
// "di-bypass" karena tidak ada server yang mempercayainya.
//
// Butuh config.js dan main.js di-load lebih dulu.
// ================================================================

(function () {
  'use strict';

  var form = document.getElementById('bookingForm');
  if (!form) return;

  var statusEl = document.getElementById('formStatus');
  var noteEl   = document.getElementById('formNote');
  var submitEl = document.getElementById('formSubmit');


  /* ==============================================================
     1. ISI PILIHAN LAYANAN DARI CONFIG
     Daftar layanan hanya ditulis sekali, di config.js.
     ============================================================== */
  (function fillServices() {
    var sel = document.getElementById('fService');
    if (!sel || typeof CONFIG === 'undefined' || !CONFIG.SERVICES) return;

    CONFIG.SERVICES.forEach(function (s) {
      var opt = document.createElement('option');
      opt.value = s.id;
      opt.textContent = s.label;
      sel.appendChild(opt);
    });
  })();


  /* ==============================================================
     2. STATUS KANAL BOOKING
     Kalau nomor WhatsApp masih placeholder, tombol dimatikan sejak
     awal — bukan dibiarkan lalu gagal setelah tamu mengisi form.
     ============================================================== */
  function waReady() {
    return typeof window.buildWaLink === 'function' && window.buildWaLink('') !== null;
  }

  if (!waReady()) {
    if (submitEl) {
      submitEl.disabled = true;
      submitEl.style.opacity = '0.5';
      submitEl.style.cursor = 'not-allowed';
    }
    if (noteEl) {
      noteEl.textContent =
        'Booking channel not configured yet — the WhatsApp number is still a placeholder.';
    }
  }


  /* ==============================================================
     3. VALIDASI
     Pesan error menyebut field mana dan kenapa gagal, bukan
     "Invalid input" (SOP kategori 1, Form UX).
     ============================================================== */
  function getLang() {
    return (window.BPC_I18N && typeof window.BPC_I18N.getLanguage === 'function')
      ? window.BPC_I18N.getLanguage()
      : 'en';
  }

  function setError(id, messageEn, messageId) {
    var isId = getLang() === 'id';
    var message = (isId && messageId) ? messageId : messageEn;
    var input = document.getElementById(id);
    var err   = document.querySelector('[data-err-for="' + id + '"]');
    if (input) {
      input.classList.add('is-invalid');
      input.setAttribute('aria-invalid', 'true');
    }
    if (err) { err.textContent = message; err.hidden = false; }
  }

  function clearError(id) {
    var input = document.getElementById(id);
    var err   = document.querySelector('[data-err-for="' + id + '"]');
    if (input) {
      input.classList.remove('is-invalid');
      input.removeAttribute('aria-invalid');
    }
    if (err) { err.textContent = ''; err.hidden = true; }
  }

  function clearAllErrors() {
    ['fName', 'fPhone', 'fVilla', 'fDate', 'fGuests', 'fService', 'fEmail']
      .forEach(clearError);
  }

  function val(id) {
    var el = document.getElementById(id);
    return el ? String(el.value).trim() : '';
  }

  function todayISO() {
    var d = new Date();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return d.getFullYear() + '-' + m + '-' + day;
  }

  function validate() {
    clearAllErrors();
    var errors = [];

    if (val('fName').length < 2) {
      setError('fName',
        'Please enter your name (at least 2 characters).',
        'Mohon masukkan nama Anda (minimal 2 karakter).');
      errors.push('fName');
    }

    var digits = val('fPhone').replace(/[^0-9]/g, '');
    if (digits.length < 8) {
      setError('fPhone',
        'Please enter a WhatsApp number with at least 8 digits.',
        'Mohon masukkan nomor WhatsApp yang valid (minimal 8 digit).');
      errors.push('fPhone');
    }

    if (val('fVilla').length < 3) {
      setError('fVilla',
        'Please tell us the villa name or the area in Bali.',
        'Mohon masukkan nama vila atau area lokasi di Bali.');
      errors.push('fVilla');
    }

    var date = val('fDate');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      setError('fDate',
        'Please choose a date.',
        'Mohon pilih tanggal acara.');
      errors.push('fDate');
    } else if (date < todayISO()) {
      setError('fDate',
        'That date has already passed — please choose a later date.',
        'Tanggal tersebut sudah lewat — mohon pilih tanggal mendatang.');
      errors.push('fDate');
    }

    var guests = parseInt(val('fGuests'), 10);
    if (!guests || guests < 1) {
      setError('fGuests',
        'Please enter at least 1 guest.',
        'Mohon masukkan jumlah tamu minimal 1 orang.');
      errors.push('fGuests');
    } else if (guests > 150) {
      setError('fGuests',
        'For more than 150 guests, please message the chef directly.',
        'Untuk tamu lebih dari 150 orang, mohon hubungi chef secara langsung.');
      errors.push('fGuests');
    }

    if (!val('fService')) {
      setError('fService',
        'Please choose which service you are enquiring about.',
        'Mohon pilih jenis layanan yang Anda inginkan.');
      errors.push('fService');
    }

    var email = val('fEmail');
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('fEmail',
        'That email address does not look right.',
        'Format alamat email kurang tepat.');
      errors.push('fEmail');
    }

    return errors;
  }

  // Error hilang begitu field diperbaiki, tidak menunggu submit lagi.
  form.addEventListener('input', function (e) {
    if (e.target && e.target.id) clearError(e.target.id);
  });
  form.addEventListener('change', function (e) {
    if (e.target && e.target.id) clearError(e.target.id);
  });


  /* ==============================================================
     4. SUSUN PESAN WHATSAPP
     Format terbaca rapi di aplikasi WhatsApp: *tebal* untuk label,
     baris pemisah, dan tanpa emoji yang bisa rusak di sebagian
     perangkat.
     ============================================================== */
  function serviceLabel(id) {
    if (typeof CONFIG === 'undefined' || !CONFIG.SERVICES) return id;
    var found = null;
    CONFIG.SERVICES.forEach(function (s) { if (s.id === id) found = s.label; });
    return found || id;
  }

  function buildMessage() {
    var isId = getLang() === 'id';
    var line = '------------------------------';

    var header = isId ? '*PERMINTAAN RESERVASI BARU*' : '*NEW BOOKING ENQUIRY*';
    var footer = isId ? 'Dikirim melalui website' : 'Sent from the website';
    var lblNone = isId ? 'Tidak ada' : 'None';

    var parts = [
      header,
      line,
      (isId ? '*Nama:* ' : '*Name:* ') + val('fName'),
      (isId ? '*Kontak:* ' : '*Contact:* ') + val('fPhone'),
      (isId ? '*Lokasi/Vila:* ' : '*Villa / Location:* ') + val('fVilla'),
      (isId ? '*Tanggal:* ' : '*Date:* ') + val('fDate'),
      (isId ? '*Jumlah Tamu:* ' : '*Guests:* ') + val('fGuests'),
      (isId ? '*Layanan:* ' : '*Service:* ') + serviceLabel(val('fService'))
    ];

    if (val('fEmail')) parts.push((isId ? '*Email:* ' : '*Email:* ') + val('fEmail'));
    parts.push((isId ? '*Catatan/Diet:* ' : '*Notes:* ') + (val('fNotes') || lblNone));
    parts.push(line);
    parts.push(footer);

    return parts.join('\n');
  }


  /* ==============================================================
     5. SUBMIT
     ============================================================== */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (statusEl) { statusEl.textContent = ''; statusEl.className = 'form__status'; }

    // Honeypot: manusia tidak pernah mengisi field ini.
    var hp = document.getElementById('company');
    if (hp && hp.value) return;

    var errors = validate();
    var isId = getLang() === 'id';

    if (errors.length) {
      if (statusEl) {
        if (isId) {
          statusEl.textContent = errors.length === 1
            ? 'Mohon periksa kolom yang ditandai.'
            : 'Mohon periksa ' + errors.length + ' kolom yang ditandai.';
        } else {
          statusEl.textContent = errors.length === 1
            ? 'Please check the highlighted field.'
            : 'Please check the ' + errors.length + ' highlighted fields.';
        }
        statusEl.className = 'form__status is-err';
      }
      var first = document.getElementById(errors[0]);
      if (first) first.focus();
      return;
    }

    if (!waReady()) {
      if (statusEl) {
        statusEl.textContent = isId
          ? 'Nomor WhatsApp belum dikonfigurasi. Mohon coba lagi nanti.'
          : 'The WhatsApp number has not been set up yet. Please try again later.';
        statusEl.className = 'form__status is-err';
      }
      return;
    }

    var link = window.buildWaLink(buildMessage());
    if (!link) {
      if (statusEl) {
        statusEl.textContent = isId
          ? 'Tidak dapat membuka WhatsApp. Silakan hubungi chef secara langsung.'
          : 'Could not open WhatsApp. Please contact the chef directly.';
        statusEl.className = 'form__status is-err';
      }
      return;
    }

    if (statusEl) {
      statusEl.textContent = isId
        ? 'Membuka WhatsApp dengan detail pesanan Anda…'
        : 'Opening WhatsApp with your details…';
      statusEl.className = 'form__status is-ok';
    }

    window.open(link, '_blank', 'noopener');
  });

})();
