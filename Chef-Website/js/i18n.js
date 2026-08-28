// ================================================================
// AnabhiDev-BPC — Bali Private Chef & Culinary Consulting Website
// HTML5 · Vanilla CSS · Vanilla JavaScript
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 28 August 2026, 17:15:00
// ----------------------------------------------------------------
// Sistem Translasi Multi-Bahasa (EN / ID)
// Default: English ('en'). Pilihan disimpan di localStorage.
// ================================================================

(function () {
  'use strict';

  var STORAGE_KEY = 'bpc_lang';
  var DEFAULT_LANG = 'en';

  var DICTIONARY = {
    en: {
      // ---- Navigation & Global ----
      'nav.experience': 'Experience',
      'nav.services': 'Services',
      'nav.menu': 'Menu',
      'nav.consulting': 'Consulting',
      'nav.gallery': 'Gallery',
      'nav.book': 'Book your experience',

      // ---- Index: Hero ----
      'hero.eyebrow': 'Private chef · Bali',
      'hero.title': 'Private dining,<br>crafted just for you',
      'hero.lead': 'A chef, a menu and an evening built around your villa, your guests and the occasion — prepared and served where you are staying.',
      'hero.micro': 'Villa Dining <span aria-hidden="true">·</span> Private BBQ <span aria-hidden="true">·</span> Catering <span aria-hidden="true">·</span> Cooking Class <span aria-hidden="true">·</span> Special Events',
      'hero.cta_book': 'Book your experience',
      'hero.cta_services': 'View our services',

      // ---- Index: Experience ----
      'exp.eyebrow': 'The private chef experience',
      'exp.title': 'A dining experience shaped around you.',
      'exp.p1': 'Restaurant-level cooking, brought into a private space. The menu is planned with you beforehand — around what you like, what you avoid, how many of you there are, and what the evening is for.',
      'exp.p2': 'No fixed covers, no set seating time. The kitchen comes to your villa and leaves it as it was found.',
      'exp.link': 'Plan your evening',

      // ---- Index: Services ----
      'services.eyebrow': 'What we offer',
      'services.title': 'Our services',
      'services.lead': 'Six ways the chef works in Bali. Each one is quoted per occasion — tell us the date, the location and the number of guests.',
      'services.s1_title': 'On Villa Dining',
      'services.s1_desc': 'The chef cooks and serves in your villa. Menu agreed in advance, kitchen left clean.',
      'services.s2_title': 'Private BBQ',
      'services.s2_desc': 'Grill-led menus built around the day\'s catch, meats and house-made sauces.',
      'services.s3_title': 'Catering',
      'services.s3_desc': 'Larger groups — villa parties, corporate gatherings, celebrations and weddings.',
      'services.s4_title': 'Cooking Class',
      'services.s4_desc': 'Hands-on sessions in your own kitchen, working through a menu you get to keep.',
      'services.s5_title': 'Special Events',
      'services.s5_desc': 'Proposals, anniversaries, birthdays and dinners that need the table to feel like the occasion.',
      'services.s6_title': 'Wine & Mixology',
      'services.s6_desc': 'Curated wine pairings and bespoke cocktails to elevate your private dining experience.',

      // ---- Index: Meet Chef ----
      'chef.eyebrow': 'Meet your chef',
      'chef.title': 'Cooking that stays personal.',
      'chef.lead': 'Chef biography to be supplied by the client.',
      'chef.p1_title': 'Fresh & local ingredients',
      'chef.p1_desc': 'Bought for the menu, not held in stock.',
      'chef.p2_title': 'Personalised menu',
      'chef.p2_desc': 'Agreed with you before the date, not on arrival.',
      'chef.p3_title': 'Professional & discreet',
      'chef.p3_desc': 'On time, self-contained, and out of your way.',

      // ---- Index: Consulting Teaser ----
      'consulting_teaser.eyebrow': 'For restaurants & hospitality',
      'consulting_teaser.title': 'Culinary expertise beyond the dining table.',
      'consulting_teaser.lead': 'The same kitchen experience, applied to businesses — concept direction, menu development, kitchen standards and team training.',
      'consulting_teaser.link': 'Learn about consulting',

      // ---- Index: Gallery ----
      'gallery.eyebrow': 'Recent work',
      'gallery.title': 'In the kitchen & at the table',
      'gallery.lead': 'A selection from private villas, intimate dinners and events across Bali.',

      // ---- Index: Expectations (Values) ----
      'expect.eyebrow': 'The standard',
      'expect.title': 'What you can expect',
      'expect.lead': 'Every booking is handled with the same attention to detail, from the first conversation to the final clean-up.',
      'expect.v1_title': 'Fresh ingredients',
      'expect.v1_desc': 'Locally sourced seafood, organic produce and premium imported meats selected daily.',
      'expect.v2_title': 'Professional chef',
      'expect.v2_desc': 'Years of professional kitchen experience brought directly into your private space.',
      'expect.v3_title': 'Personalised menu',
      'expect.v3_desc': 'Every menu is custom-built around your dietary preferences, allergies and occasion.',
      'expect.v4_title': 'We come to you',
      'expect.v4_desc': 'Available at private villas, residences and event venues throughout Bali.',
      'expect.v5_title': 'Attention to detail',
      'expect.v5_desc': 'Impeccable table setting, thoughtful plating and seamless pacing throughout the meal.',
      'expect.v6_title': 'Impeccable service',
      'expect.v6_desc': 'Warm, professional, discreet service that lets you relax and enjoy your guests.',

      // ---- Index & Menu: Cuisine Collection ----
      'cuisines.eyebrow': 'Our menu',
      'cuisines.title': 'Cuisine collection',
      'cuisines.lead': 'A starting point, not a fixed card. Menus are built per booking — tell the chef what you are in the mood for.',
      'cuisines.c1': 'Balinese',
      'cuisines.c2': 'Indonesian',
      'cuisines.c3': 'Asian',
      'cuisines.c4': 'Western',
      'cuisines.c5': 'Seafood & BBQ',
      'cuisines.c6': 'Vegetarian & Vegan',
      'cuisines.btn_view': 'View menu & experiences',

      // ---- Index: Booking Form ----
      'booking.eyebrow': 'Reserve a date',
      'booking.title': 'Plan your dining experience.',
      'booking.lead': 'Share your date, location and what you have in mind. We will confirm availability and start shaping the menu with you.',
      'booking.info_title': 'Direct conversation',
      'booking.info_desc': 'Submitting this form opens WhatsApp with your details pre-filled. You will speak directly with the chef — no automated responses, no third-party booking agents.',
      'booking.label_name': 'Your name',
      'booking.label_service': 'Service type',
      'booking.label_date': 'Preferred date',
      'booking.label_guests': 'Number of guests',
      'booking.label_location': 'Villa / location in Bali',
      'booking.label_phone': 'WhatsApp / phone number',
      'booking.label_email': 'Email address',
      'booking.label_notes': 'Occasion, dietary needs or special requests',
      'booking.opt': '(optional)',
      'booking.placeholder_location': 'e.g. Seminyak, Canggu, Uluwatu, Ubud',
      'booking.submit': 'Send booking request',
      'booking.note': 'Opens WhatsApp with your details filled in. Nothing is stored on this site.',

      // ---- Menu Page ----
      'menu_hero.eyebrow': 'Culinary Repertoire',
      'menu_hero.title': 'A Menu Without Limits',
      'menu_hero.lead': 'Menus curated around your occasion, guest preferences, cuisine, and available seasonal ingredients.',
      'menu_cuisines.eyebrow': 'What we cook',
      'menu_cuisines.title': 'Cuisine collection',
      'menu_cuisines.lead': 'We draw from a broad culinary repertoire to craft your menu. The collections below are a starting point.',
      'menu_exp.eyebrow': 'Dining formats',
      'menu_exp.title': 'Dining experiences',
      'menu_exp.lead': 'Whether an intimate dinner or a celebration, each format is tailored to your occasion.',
      'menu_exp.e1_title': 'Plated Course Dining',
      'menu_exp.e1_desc': 'Multi-course degustation menus with restaurant-grade presentation, course pacing, and optional wine pairing.',
      'menu_exp.e2_title': 'Family Style Sharing',
      'menu_exp.e2_desc': 'Generous platters served to the center of the table — relaxed, social dining celebrating local flavors.',
      'menu_exp.e3_title': 'Live Grill & BBQ',
      'menu_exp.e3_desc': 'Fresh seafood, premium cuts, and vegetables grilled live at your villa terrace or poolside.',
      'menu_exp.e4_title': 'Canapés & Cocktail Dining',
      'menu_exp.e4_desc': 'Bite-sized culinary creations and hand-crafted cocktails for mingling, sunset gatherings, and cocktail hours.',
      'menu_exp.e5_title': 'Hands-on Masterclass',
      'menu_exp.e5_desc': 'Interactive cooking classes in your villa kitchen, learning the secrets of Balinese and Asian flavors.',
      'menu_exp.e6_title': 'Bespoke Degustation',
      'menu_exp.e6_desc': 'Custom multi-course dining built completely around rare seasonal ingredients and your personal palate.',
      'menu_dietary.eyebrow': 'Dietary & Sourcing',
      'menu_dietary.title': 'Thoughtful sourcing, zero compromises.',
      'menu_dietary.p1': 'We work directly with local fishermen, organic farmers in Bedugul, and ethical suppliers across Bali to ensure every ingredient meets exacting standards.',
      'menu_dietary.p2': 'Whether your party requires vegetarian, vegan, gluten-free, halal-friendly, or allergy-conscious preparation, we ensure every guest enjoys a thoughtfully prepared meal without compromise.',
      'menu_cta.title': 'Have something special in mind?',
      'menu_cta.lead': 'Let us design a menu tailored exclusively to your tastes and occasion.',
      'menu_cta.btn': 'Start a consultation',

      // ---- Consulting Page ----
      'cons_hero.eyebrow': 'B2B & Hospitality Services',
      'cons_hero.title': 'Culinary Consulting & Kitchen Advisory',
      'cons_hero.lead': 'Elevating restaurants, villas, and hospitality brands across Bali through concept design, menu engineering, and operational excellence.',
      'cons_hero.cta_consult': 'Request a consultation',
      'cons_hero.cta_capabilities': 'Explore capabilities',
      'cons_cap.eyebrow': 'What we deliver',
      'cons_cap.title': 'Consulting capabilities',
      'cons_cap.lead': 'Hands-on culinary and operational advisory designed to build profitable, memorable dining operations.',
      'cons_cap.c1_title': 'Concept & Brand Identity',
      'cons_cap.c1_desc': 'Defining the culinary DNA, brand narrative, and guest journey for new and repositioned venues.',
      'cons_cap.c2_title': 'Menu Engineering',
      'cons_cap.c2_desc': 'Developing high-margin, culinary-forward menus optimized for prep efficiency and consistency.',
      'cons_cap.c3_title': 'Kitchen & Flow Design',
      'cons_cap.c3_desc': 'Ergonomic kitchen layout planning, station flow optimization, and equipment specification.',
      'cons_cap.c4_title': 'Team Training & Mentorship',
      'cons_cap.c4_desc': 'Comprehensive culinary coaching, service culture development, and kitchen leadership training.',
      'cons_cap.c5_title': 'SOP & Recipe Standardization',
      'cons_cap.c5_desc': 'Detailed recipe cards, prep checklists, sanitation standards, and quality control systems.',
      'cons_cap.c6_title': 'Cost Control & Waste Optimization',
      'cons_cap.c6_desc': 'Yield management, food cost auditing, and sustainable zero-waste kitchen practices.',
      'cons_proc.eyebrow': 'How we work',
      'cons_proc.title': 'Our consulting approach',
      'cons_proc.lead': 'A structured four-phase process ensuring measurable improvements from audit to ongoing success.',
      'cons_proc.p1_num': '01',
      'cons_proc.p1_title': 'Discovery & Audit',
      'cons_proc.p1_desc': 'In-depth assessment of your current culinary operations, guest feedback, margins, and market positioning.',
      'cons_proc.p2_num': '02',
      'cons_proc.p2_title': 'Strategy & Concept',
      'cons_proc.p2_desc': 'Developing the concept brief, menu architecture, cost modeling, and operational roadmap.',
      'cons_proc.p3_num': '03',
      'cons_proc.p3_title': 'Implementation & Training',
      'cons_proc.p3_desc': 'Hands-on kitchen execution, recipe tastings, staff training, and launch preparation.',
      'cons_proc.p4_num': '04',
      'cons_proc.p4_title': 'Optimization & Review',
      'cons_proc.p4_desc': 'Post-launch auditing, yield adjustments, and ongoing advisory to sustain culinary excellence.',
      'cons_aud.eyebrow': 'Client spectrum',
      'cons_aud.title': 'Who we work with',
      'cons_aud.lead': 'Tailored consulting programs for every scale of hospitality operation.',
      'cons_aud.a1_title': 'New Concepts',
      'cons_aud.a1_desc': 'Entrepreneurs and investors launching restaurants, beach clubs, or boutique dining concepts.',
      'cons_aud.a2_title': 'Existing Restaurants',
      'cons_aud.a2_desc': 'Established dining venues seeking menu revitalisation, cost reduction, or operational turnaround.',
      'cons_aud.a3_title': 'Hospitality Groups',
      'cons_aud.a3_desc': 'Resorts and hotel brands looking to standardize multi-outlet culinary standards and training.',
      'cons_aud.a4_title': 'Luxury Villas',
      'cons_aud.a4_desc': 'Private estates and management companies upgrading their in-house guest dining programs.',
      'cons_cta.title': "Let's Talk About Your Culinary Direction.",
      'cons_cta.lead': 'Share your project details and vision. We will arrange an initial discovery discussion.',
      'cons_cta.btn': 'Schedule a consultation',

      // ---- Footer ----
      'footer.tagline': 'Private dining, catering and culinary consulting in Bali.',
      'footer.explore': 'Explore',
      'footer.services': 'Services',
      'footer.contact': 'Contact',
      'footer.link_exp': 'Experience',
      'footer.link_services': 'Services',
      'footer.link_gallery': 'Gallery',
      'footer.link_book': 'Book',
      'footer.link_villa': 'Villa dining',
      'footer.link_bbq': 'Private BBQ',
      'footer.link_menu': 'Menu & experiences',
      'footer.link_consulting': 'Culinary consulting',
      'footer.rights': 'All rights reserved.',
      'footer.credit': 'Development · Anabhi Dev'
    },

    id: {
      // ---- Navigasi & Global ----
      'nav.experience': 'Pengalaman',
      'nav.services': 'Layanan',
      'nav.menu': 'Menu',
      'nav.consulting': 'Konsultasi',
      'nav.gallery': 'Galeri',
      'nav.book': 'Pesan Pengalaman Anda',

      // ---- Index: Hero ----
      'hero.eyebrow': 'Chef Privat · Bali',
      'hero.title': 'Santapan Privat,<br>Dirancang Khusus Untuk Anda',
      'hero.lead': 'Chef profesional, menu eksklusif, dan malam istimewa yang disesuaikan dengan vila, tamu, dan momen berharga Anda — disajikan langsung di tempat Anda menginap.',
      'hero.micro': 'Villa Dining <span aria-hidden="true">·</span> Private BBQ <span aria-hidden="true">·</span> Katering <span aria-hidden="true">·</span> Kelas Memasak <span aria-hidden="true">·</span> Acara Spesial',
      'hero.cta_book': 'Pesan Pengalaman Anda',
      'hero.cta_services': 'Lihat Layanan Kami',

      // ---- Index: Pengalaman ----
      'exp.eyebrow': 'Pengalaman chef privat',
      'exp.title': 'Pengalaman bersantap yang berpusat pada Anda.',
      'exp.p1': 'Masakan standar restoran terbaik, dihadirkan ke ruang privat Anda. Menu dirancang bersama Anda sebelumnya — disesuaikan dengan selera, pantangan, jumlah tamu, dan suasana yang diinginkan.',
      'exp.p2': 'Tanpa batas waktu duduk, tanpa antre. Dapur kami hadir ke vila Anda dan meninggalkannya dalam keadaan bersih sempurna seperti semula.',
      'exp.link': 'Rencanakan Malam Anda',

      // ---- Index: Layanan ----
      'services.eyebrow': 'Layanan Kami',
      'services.title': 'Pilihan Layanan',
      'services.lead': 'Enam cara chef melayani Anda di Bali. Setiap layanan disesuaikan dengan pesanan — sampaikan tanggal, lokasi vila, dan jumlah tamu Anda.',
      'services.s1_title': 'On Villa Dining',
      'services.s1_desc': 'Chef memasak dan menyajikan langsung di vila Anda. Menu disepakati sebelumnya, dapur ditinggalkan bersih rapi.',
      'services.s2_title': 'Private BBQ',
      'services.s2_desc': 'Menu panggangan istimewa dari tangkapan laut segar harian, daging premium, dan saus racikan khas.',
      'services.s3_title': 'Katering',
      'services.s3_desc': 'Untuk rombongan besar — pesta vila, gathering perusahaan, perayaan ulang tahun, dan pernikahan intim.',
      'services.s4_title': 'Kelas Memasak',
      'services.s4_desc': 'Sesi memasak privat interaktif di dapur vila Anda, mempelajari resep autentik yang bisa Anda bawa pulang.',
      'services.s5_title': 'Acara Spesial',
      'services.s5_desc': 'Lamaran romantis, perayaan anniversary, dan jamuan makan malam yang membutuhkan sentuhan suasana berkelas.',
      'services.s6_title': 'Wine & Mixology',
      'services.s6_desc': 'Kurasi perpaduan wine terbaik dan koktail racikan khusus untuk menyempurnakan santapan privat Anda.',

      // ---- Index: Profil Chef ----
      'chef.eyebrow': 'Profil Chef Anda',
      'chef.title': 'Keahlian kuliner yang personal.',
      'chef.lead': 'Biografi dan perjalanan kuliner chef akan segera dilengkapi.',
      'chef.p1_title': 'Bahan Segar & Lokal',
      'chef.p1_desc': 'Dibeli khusus untuk menu Anda hari itu, bukan stok simpanan.',
      'chef.p2_title': 'Menu yang Dipersonalisasi',
      'chef.p2_desc': 'Disepakati bersama Anda sebelum hari H, bukan saat kedatangan.',
      'chef.p3_title': 'Profesional & Berkelas',
      'chef.p3_desc': 'Tepat waktu, mandiri, dan menjaga privasi serta kenyamanan Anda.',

      // ---- Index: Teaser Konsultasi ----
      'consulting_teaser.eyebrow': 'Untuk Restoran & Perhotelan',
      'consulting_teaser.title': 'Keahlian kuliner untuk industri bisnis.',
      'consulting_teaser.lead': 'Keahlian dapur profesional yang sama, diterapkan untuk bisnis kuliner Anda — perancangan konsep, pengembangan menu, standar dapur, hingga pelatihan tim.',
      'consulting_teaser.link': 'Pelajari Layanan Konsultasi',

      // ---- Index: Galeri ----
      'gallery.eyebrow': 'Karya Terbaru',
      'gallery.title': 'Di Balik Dapur & Meja Jamuan',
      'gallery.lead': 'Koleksi momen dari vila privat, jamuan makan malam intim, dan acara berkesan di seluruh Bali.',

      // ---- Index: Standar Layanan (Nilai) ----
      'expect.eyebrow': 'Standar Keunggulan',
      'expect.title': 'Komitmen Kami Untuk Anda',
      'expect.lead': 'Setiap reservasi ditangani dengan perhatian penuh terhadap detail, mulai dari konsultasi awal hingga pembersihan akhir.',
      'expect.v1_title': 'Bahan Baku Segar',
      'expect.v1_desc': 'Hasil laut segar harian, sayuran organik lokal, dan daging impor premium pilihan.',
      'expect.v2_title': 'Chef Berpengalaman',
      'expect.v2_desc': 'Pengalaman bertahun-tahun di dapur profesional dihadirkan langsung ke vila Anda.',
      'expect.v3_title': 'Menu Personal',
      'expect.v3_desc': 'Setiap menu diracik khusus sesuai preferensi selera, alergi, dan kebutuhan diet Anda.',
      'expect.v4_title': 'Kami Datang ke Vila Anda',
      'expect.v4_desc': 'Tersedia untuk seluruh vila privat, residen, dan venue acara di berbagai area Bali.',
      'expect.v5_title': 'Presisi & Detail',
      'expect.v5_desc': 'Penataan meja yang anggun, plating artistik, dan ritme penyajian yang mengalir sempurna.',
      'expect.v6_title': 'Pelayanan Ramah & Diskrit',
      'expect.v6_desc': 'Pelayanan hangat dan profesional yang membuat Anda leluasa menikmati waktu bersama tamu.',

      // ---- Index & Menu: Koleksi Masakan ----
      'cuisines.eyebrow': 'Pilihan Menu',
      'cuisines.title': 'Koleksi Masakan',
      'cuisines.lead': 'Inspirasi awal, bukan batasan kaku. Setiap menu dirancang khusus — sampaikan cita rasa yang Anda dambakan.',
      'cuisines.c1': 'Khas Bali',
      'cuisines.c2': 'Nusantara',
      'cuisines.c3': 'Asian Modern',
      'cuisines.c4': 'Western',
      'cuisines.c5': 'Seafood & BBQ',
      'cuisines.c6': 'Vegetarian & Vegan',
      'cuisines.btn_view': 'Lihat Menu & Pengalaman Lengkap',

      // ---- Index: Form Reservasi ----
      'booking.eyebrow': 'Reservasi Tanggal',
      'booking.title': 'Rencanakan Jamuan Privat Anda.',
      'booking.lead': 'Sampaikan tanggal, lokasi vila, dan konsep acara Anda. Kami akan mengonfirmasi ketersediaan dan mulai merancang menu bersama Anda.',
      'booking.info_title': 'Komunikasi Langsung',
      'booking.info_desc': 'Mengirimkan formulir ini akan membuka WhatsApp dengan detail pesanan Anda yang terisi rapi. Anda akan terhubung langsung dengan tim chef — tanpa balasan bot otomatis.',
      'booking.label_name': 'Nama Anda',
      'booking.label_service': 'Pilihan Layanan',
      'booking.label_date': 'Tanggal Acara',
      'booking.label_guests': 'Jumlah Tamu',
      'booking.label_location': 'Nama Vila / Lokasi di Bali',
      'booking.label_phone': 'Nomor WhatsApp / Telepon',
      'booking.label_email': 'Alamat Email',
      'booking.label_notes': 'Kebutuhan diet, alergi, atau permintaan khusus',
      'booking.opt': '(opsional)',
      'booking.placeholder_location': 'contoh: Seminyak, Canggu, Uluwatu, Ubud',
      'booking.submit': 'Kirim Permintaan Reservasi',
      'booking.note': 'Membuka WhatsApp dengan detail yang terisi. Tidak ada data pribadi yang disimpan di situs ini.',

      // ---- Menu Page ----
      'menu_hero.eyebrow': 'Repertoar Kuliner',
      'menu_hero.title': 'Kreasi Menu Tanpa Batas',
      'menu_hero.lead': 'Menu yang dikurasi khusus seputar momen acara Anda, preferensi tamu, dan ketersediaan bahan musiman terbaik.',
      'menu_cuisines.eyebrow': 'Cita Rasa Pilihan',
      'menu_cuisines.title': 'Koleksi Masakan',
      'menu_cuisines.lead': 'Kami memadukan beragam keahlian kuliner untuk meracik menu Anda. Koleksi di bawah ini adalah titik awal kreasi kita.',
      'menu_exp.eyebrow': 'Format Jamuan',
      'menu_exp.title': 'Pengalaman Bersantap',
      'menu_exp.lead': 'Dari jamuan makan malam intim hingga pesta perayaan, setiap format dirancang pas untuk momen Anda.',
      'menu_exp.e1_title': 'Plated Course Dining',
      'menu_exp.e1_desc': 'Menu degustasi multi-course dengan presentasi sekelas fine dining restoran, ritme penyajian teratur, dan opsi wine pairing.',
      'menu_exp.e2_title': 'Family Style Sharing',
      'menu_exp.e2_desc': 'Piring-piring sajian berlimpah di tengah meja — suasana santap akrab dan santai merayakan cita rasa autentik.',
      'menu_exp.e3_title': 'Live Grill & BBQ',
      'menu_exp.e3_desc': 'Seafood segar, daging pilihan, dan sayuran panggang yang dimasak langsung di teras vila atau pinggir kolam Anda.',
      'menu_exp.e4_title': 'Canapés & Cocktail Dining',
      'menu_exp.e4_desc': 'Kudapan canapé berkelas dan koktail racikan segar untuk momen sunset gathering dan jamuan cocktail privat.',
      'menu_exp.e5_title': 'Kelas Memasak Privat',
      'menu_exp.e5_desc': 'Pengalaman memasak interaktif di dapur vila Anda, mempelajari rahasia rempah autentik Bali dan Asia.',
      'menu_exp.e6_title': 'Degustasi Eksklusif',
      'menu_exp.e6_desc': 'Menu multi-course khusus yang sepenuhnya dibuat dari bahan musiman langka sesuai selera personal Anda.',
      'menu_dietary.eyebrow': 'Kualitas Bahan & Diet',
      'menu_dietary.title': 'Bahan terbaik, tanpa kompromi.',
      'menu_dietary.p1': 'Kami bekerja sama langsung dengan nelayan lokal, petani organik di Bedugul, dan distributor etis terpercaya di Bali untuk memastikan kualitas bahan tertinggi.',
      'menu_dietary.p2': 'Baik tamu Anda membutuhkan menu vegetarian, vegan, bebas gluten, ramah halal, maupun bebas alergen tertentu, kami memastikan setiap hidangan disajikan istimewa tanpa kompromi.',
      'menu_cta.title': 'Punya Konsep Menu Khusus?',
      'menu_cta.lead': 'Mari diskusikan menu impian yang dirancang eksklusif untuk selera dan acara Anda.',
      'menu_cta.btn': 'Mulai Konsultasi Menu',

      // ---- Consulting Page ----
      'cons_hero.eyebrow': 'Layanan B2B & Hospitaliti',
      'cons_hero.title': 'Konsultasi Kuliner & Tata Kelola Dapur',
      'cons_hero.lead': 'Meningkatkan standar restoran, vila mewah, dan brand hospitaliti di Bali melalui desain konsep, rekayasa menu, dan efisiensi operasional.',
      'cons_hero.cta_consult': 'Ajukan Konsultasi',
      'cons_hero.cta_capabilities': 'Lihat Keahlian Kami',
      'cons_cap.eyebrow': 'Layanan Kami',
      'cons_cap.title': 'Keahlian Konsultasi',
      'cons_cap.lead': 'Pendampingan langsung di bidang kuliner dan operasional untuk membangun bisnis F&B yang menguntungkan dan berkesan.',
      'cons_cap.c1_title': 'Konsep & Identitas Brand',
      'cons_cap.c1_desc': 'Menentukan DNA kuliner, narasi merek, dan pengalaman tamu untuk pembukaan baru maupun reposisi bisnis.',
      'cons_cap.c2_title': 'Rekayasa Menu (Menu Engineering)',
      'cons_cap.c2_desc': 'Merancang menu berorientasi profit tinggi dengan konsistensi rasa dan efisiensi waktu persiapan dapur.',
      'cons_cap.c3_title': 'Tata Letak & Alur Dapur',
      'cons_cap.c3_desc': 'Perencanaan tata letak dapur ergonomis, alur kerja stasiun masak, serta spesifikasi peralatan yang tepat.',
      'cons_cap.c4_title': 'Pelatihan Tim & Mentorship',
      'cons_cap.c4_desc': 'Pelatihan teknik memasak, pembentukan budaya pelayanan prima, dan kepemimpinan operasional dapur.',
      'cons_cap.c5_title': 'Standarisasi Resep & SOP',
      'cons_cap.c5_desc': 'Penyusunan recipe card presisi, checklist persiapan, standar sanitasi higienis, dan sistem kontrol mutu.',
      'cons_cap.c6_title': 'Kontrol Biaya & Optimasi Limbah',
      'cons_cap.c6_desc': 'Manajemen yield bahan, audit food cost, dan implementasi dapur ramah lingkungan minim limbah (zero-waste).',
      'cons_proc.eyebrow': 'Metode Kerja',
      'cons_proc.title': 'Pendekatan Konsultasi Kami',
      'cons_proc.lead': 'Proses empat tahap terstruktur yang menjamin peningkatan terukur dari tahap audit hingga keberhasilan jangka panjang.',
      'cons_proc.p1_num': '01',
      'cons_proc.p1_title': 'Analisis & Audit',
      'cons_proc.p1_desc': 'Penilaian mendalam terhadap operasional dapur, ulasan tamu, margin keuntungan, dan posisi pasar saat ini.',
      'cons_proc.p2_num': '02',
      'cons_proc.p2_title': 'Strategi & Konsep',
      'cons_proc.p2_desc': 'Penyusunan konsep kuliner, struktur arsitektur menu, kalkulasi modal/biaya, dan peta jalan operasional.',
      'cons_proc.p3_num': '03',
      'cons_proc.p3_title': 'Implementasi & Pelatihan',
      'cons_proc.p3_desc': 'Eksekusi langsung di dapur, sesi food tasting resep, pelatihan staf menyeluruh, dan persiapan peluncuran.',
      'cons_proc.p4_num': '04',
      'cons_proc.p4_title': 'Evaluasi & Optimasi',
      'cons_proc.p4_desc': 'Audit pasca-peluncuran, penyesuaian porsi & yield, serta konsultasi berkelanjutan demi keunggulan mutu.',
      'cons_aud.eyebrow': 'Klien Kami',
      'cons_aud.title': 'Mitra Kerjasama Kami',
      'cons_aud.lead': 'Program konsultasi yang disesuaikan untuk berbagai skala bisnis hospitaliti.',
      'cons_aud.a1_title': 'Konsep Baru',
      'cons_aud.a1_desc': 'Pengusaha dan investor yang akan membuka restoran, beach club, atau kafe berkonsep baru.',
      'cons_aud.a2_title': 'Restoran yang Sudah Berjalan',
      'cons_aud.a2_desc': 'Restoran yang membutuhkan revitalisasi menu, perbaikan food cost, atau peningkatan standar dapur.',
      'cons_aud.a3_title': 'Grup Hospitaliti & Resor',
      'cons_aud.a3_desc': 'Resor dan hotel yang ingin menstandarkan kualitas masakan serta pelatihan staf di beberapa outlet.',
      'cons_aud.a4_title': 'Vila Mewah & Properti Privat',
      'cons_aud.a4_desc': 'Manajemen vila privat yang ingin meningkatkan fasilitas dan standar jamuan in-villa dining tamu.',
      'cons_cta.title': 'Mari Diskusikan Arah Kuliner Bisnis Anda.',
      'cons_cta.lead': 'Sampaikan visi dan kebutuhan proyek Anda. Kami siap menjadwalkan sesi diskusi awal.',
      'cons_cta.btn': 'Jadwalkan Konsultasi',

      // ---- Footer ----
      'footer.tagline': 'Santapan privat, katering, dan konsultasi kuliner di Bali.',
      'footer.explore': 'Jelajahi',
      'footer.services': 'Layanan',
      'footer.contact': 'Kontak',
      'footer.link_exp': 'Pengalaman',
      'footer.link_services': 'Layanan',
      'footer.link_gallery': 'Galeri',
      'footer.link_book': 'Reservasi',
      'footer.link_villa': 'Villa dining',
      'footer.link_bbq': 'Private BBQ',
      'footer.link_menu': 'Menu & pengalaman',
      'footer.link_consulting': 'Konsultasi kuliner',
      'footer.rights': 'Hak cipta dilindungi.',
      'footer.credit': 'Development · Anabhi Dev'
    }
  };

  /**
   * Mengambil bahasa aktif saat ini.
   * @returns {string} 'en' atau 'id'
   */
  function getCurrentLanguage() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'id' || saved === 'en') return saved;
    } catch (e) {
      // localStorage mungkin diblokir di private browsing
    }
    return DEFAULT_LANG;
  }

  /**
   * Menerapkan bahasa ke seluruh DOM.
   * @param {string} lang 'en' atau 'id'
   */
  function applyLanguage(lang) {
    if (!DICTIONARY[lang]) lang = DEFAULT_LANG;

    // Simpan ke storage
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    // Update atribut HTML
    document.documentElement.lang = lang;

    var dict = DICTIONARY[lang];

    // Update elemen dengan data-i18n
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        if (dict[key].indexOf('<') !== -1) {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    }

    // Update placeholder
    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var pEl = placeholders[j];
      var pKey = pEl.getAttribute('data-i18n-placeholder');
      if (dict[pKey] !== undefined) {
        pEl.setAttribute('placeholder', dict[pKey]);
      }
    }

    // Update tombol toggle active state
    var toggleBtns = document.querySelectorAll('[data-lang-btn]');
    for (var k = 0; k < toggleBtns.length; k++) {
      var btn = toggleBtns[k];
      var btnLang = btn.getAttribute('data-lang-btn');
      var isActive = btnLang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    }

    // Dispatch custom event untuk komponen lain (seperti booking generator)
    window.dispatchEvent(new CustomEvent('bpc:languageChanged', { detail: { lang: lang } }));
  }

  // Inisialisasi event listener tombol toggle
  function initToggleListeners() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest ? e.target.closest('[data-lang-btn]') : null;
      if (btn) {
        var targetLang = btn.getAttribute('data-lang-btn');
        if (targetLang && (targetLang === 'en' || targetLang === 'id')) {
          applyLanguage(targetLang);
        }
      }
    });
  }

  // Auto init saat script dimuat
  var initialLang = getCurrentLanguage();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      applyLanguage(initialLang);
      initToggleListeners();
    });
  } else {
    applyLanguage(initialLang);
    initToggleListeners();
  }

  // Expose global helper jika dibutuhkan
  window.BPC_I18N = {
    getLanguage: getCurrentLanguage,
    setLanguage: applyLanguage,
    t: function (key) {
      var lang = getCurrentLanguage();
      return (DICTIONARY[lang] && DICTIONARY[lang][key]) || key;
    }
  };

})();

