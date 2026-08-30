// ================================================================
// AnabhiDev-BPC — Nature Private Chef & Culinary Consulting Website
// HTML5 · Vanilla CSS · Vanilla JavaScript
// Development · Anabhi Dev
// Version   : 1.6
// Generated : 30 August 2026, 13:54:30
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
      'nav.consulting': 'BBQ & Events',
      'nav.gallery': 'Gallery',
      'nav.book': 'Book your experience',

      // ---- Index: Hero ----
      'hero.eyebrow': 'Private chef · Bali',
      'hero.title': 'Private dining, crafted just for you',
      'hero.lead': 'A chef, a menu and an evening built around your villa, your guests and the occasion — prepared and served where you are staying.',
      'hero.micro': 'Breakfast <span aria-hidden="true">·</span> Lunch <span aria-hidden="true">·</span> Dinner <span aria-hidden="true">·</span> Cooking Class <span aria-hidden="true">·</span> BBQ Party',
      'hero.cta_book': 'Book your experience',
      'hero.cta_services': 'View our services',

      // ---- Index: Strip highlight di bawah hero ----
      'strip.heading': 'Featured experiences',
      'strip.s1_title': 'Dining in your villa',
      'strip.s1_desc': 'Breakfast, lunch or dinner, cooked and served where you are staying.',
      'strip.s2_title': 'Floating breakfast',
      'strip.s2_desc': 'Served on the pool, plated for two. Ingredients and preparation included.',
      'strip.s3_title': 'Cooking class',
      'strip.s3_desc': 'Cook alongside the chef in your own kitchen, and keep the recipes.',

      // ---- Index: Experience ----
      'exp.eyebrow': 'The private chef experience',
      'exp.title': 'A dining experience shaped around you.',
      'exp.p1': 'Restaurant-level cooking, brought into a private space. The menu is planned with you beforehand — around what you like, what you avoid, how many of you there are, and what the evening is for.',
      'exp.p2': 'No fixed covers, no set seating time. The kitchen comes to your villa and leaves it as it was found.',
      'exp.link': 'Plan your evening',

      // ---- Index: Services ----
      'services.eyebrow': 'What we offer',
      'services.title': 'Our services',
      'services.lead': 'Six ways Chef Galung works in Bali. Each one is quoted per occasion — tell us the date, the villa and how many of you there are.',
      'services.s1_title': 'Floating Breakfast',
      'services.s1_desc': 'Breakfast set afloat on your villa pool, plated for two.',
      'services.s2_title': 'Breakfast',
      'services.s2_desc': 'A proper start to the day, cooked in your own kitchen.',
      'services.s3_title': 'Lunch',
      'services.s3_desc': 'Light plates or a full spread, served whenever suits the day.',
      'services.s4_title': 'Dinner',
      'services.s4_desc': 'The main event — courses paced around your evening.',
      'services.s5_title': 'Cooking Class',
      'services.s5_desc': 'Cook alongside the chef in your own kitchen, and keep the recipes.',
      'services.s6_title': 'BBQ Party',
      'services.s6_desc': 'Grill-led menus and whole roasts for larger groups and celebrations.',

      // ---- Index: Meet Chef ----
      'chef.eyebrow': 'Meet your chef',
      'chef.title': 'Chef Galung',
      'chef.lead': 'Eleven years in Bali kitchens, most of them on the Bukit peninsula.',
      'chef.bio1': 'Chef Galung started as Chef de Cuisine at Semara Luxury Villa and Finns Beach Club in 2015, then spent close to seven years at The Ungasan Clifftop Resort and Sundays Beach Club — first as Chef de Cuisine, later as Executive Sous Chef — including work alongside Australian chef James Viles. From 2023 to 2026 he was Executive Chef at Banana Day Club in Bingin.',
      'chef.bio2': 'High-end Western cooking is where he trained. Balinese and Indonesian food is where he comes from. Nature Private Chef is where the two meet — in your villa, at your table.',
      'chef.p1_title': 'Fresh & local ingredients',
      'chef.p1_desc': 'Bought for the menu, not held in stock.',
      'chef.p2_title': 'Personalised menu',
      'chef.p2_desc': 'Agreed with you before the date, not on arrival.',
      'chef.p3_title': 'Professional & discreet',
      'chef.p3_desc': 'On time, self-contained, and out of your way.',

      // ---- Index: Consulting Teaser ----
      'consulting_teaser.eyebrow': 'For groups & celebrations',
      'consulting_teaser.title': 'Whole roasts, open fire, one long table.',
      'consulting_teaser.lead': 'BBQ parties and Balinese babi guling, cooked over fire at your villa — built for larger groups and the occasions worth gathering for.',
      'consulting_teaser.link': 'BBQ & events',

      // ---- Index: Gallery ----
      'gallery.eyebrow': 'Moments & tables',
      'gallery.title': 'Gallery',
      'gallery.lead': 'A selection from private villas, intimate dinners and events across Bali.',

      // ---- Index: Expectations (Values) ----
      'expect.eyebrow': 'The standard',
      'expect.title': 'What you can expect',
      'expect.lead': 'Every booking is handled with the same attention to detail, from the first conversation to the final clean-up.',
      'expect.v1_title': 'Fresh ingredients',
      'expect.v1_desc': 'Bought for your menu, close to the date.',
      'expect.v2_title': 'Professional chef',
      'expect.v2_desc': 'Trained kitchen discipline, in a private setting.',
      'expect.v3_title': 'Personalised menu',
      'expect.v3_desc': 'Dietary needs and preferences handled in advance.',
      'expect.v4_title': 'We come to you',
      'expect.v4_desc': 'Your villa, your table, your timing.',
      'expect.v5_title': 'Attention to detail',
      'expect.v5_desc': 'Set-up, service and clean-up all included.',
      'expect.v6_title': 'Impeccable service',
      'expect.v6_desc': 'Unobtrusive and professional presence in your space.',

      // ---- Index & Menu: Cuisine Collection ----
      'cuisines.eyebrow': 'Our menu',
      'cuisines.title': 'Cuisine collection',
      'cuisines.lead': 'A starting point, not a fixed card. Menus are built per booking — tell the chef what you are in the mood for.',
      'cuisines.c1': 'Balinese',
      'cuisines.c2': 'Indonesian',
      'cuisines.c3': 'Asian',
      'cuisines.c4': 'Western',
      'cuisines.c5': 'Grill & BBQ',
      'cuisines.c6': 'Vegetarian & Vegan',
      'cuisines.btn_view': 'View menu & experiences',

      // ---- Index: Booking Form ----
      'booking.eyebrow': 'Book',
      'booking.title': 'Tell us about your occasion.',
      'booking.lead': 'Share the date, where you are staying and how many of you there are. The chef replies on WhatsApp with availability and a menu direction.',
      'booking.info_title': 'Direct conversation',
      'booking.info_desc': 'Submitting this form opens WhatsApp with your details pre-filled. You will speak directly with the chef — no automated responses, no third-party booking agents.',
      'booking.label_name': 'Your name',
      'booking.label_service': 'Service',
      'booking.label_date': 'Date',
      'booking.label_guests': 'Number of guests',
      'booking.label_location': 'Villa or area in Bali',
      'booking.label_phone': 'WhatsApp number',
      'booking.label_email': 'Email',
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

      // ---- Menu Page: Philosophy ----
      'menu_phil.eyebrow': 'How we craft menus',
      'menu_phil.title': 'Menu philosophy',
      'menu_phil.p1_title': 'Signature execution',
      'menu_phil.p1_desc': 'Dishes elevated through professional technique and refined presentation.',
      'menu_phil.p2_title': 'Seasonal ingredients',
      'menu_phil.p2_desc': 'Guided by what is fresh, local, and in season at the market.',
      'menu_phil.p3_title': 'Guest preferences',
      'menu_phil.p3_desc': 'Tailored to your party\'s unique tastes and dietary requirements.',
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

      // ---- Halaman Menu: paket & harga ----
      'menu_pkg.eyebrow': 'Set menus',
      'menu_pkg.title': 'Menus & prices',
      'menu_pkg.lead': 'Every package includes all ingredients and preparation by the chef. There is no separate chef fee. Prices are a starting point — the final quote depends on your date, group size and any changes to the menu.',
      'menu_pkg.choose': 'Choose one:',
      'menu_pkg.starter': 'Starter',
      'menu_pkg.soup': 'Soup',
      'menu_pkg.main': 'Main',
      'menu_pkg.dessert': 'Dessert',
      'menu_pkg.p1_title': 'Floating Breakfast',
      'menu_pkg.p1_price': 'from IDR 800,000 · per package, 2 guests',
      'menu_pkg.p1_note': 'The floating tray itself is provided by the villa.',
      'menu_pkg.p2_title': 'Breakfast',
      'menu_pkg.p2_price': 'from IDR 420,000 · per person, per menu',
      'menu_pkg.p2_note': 'Each option is served with sliced fruit and juice.',
      'menu_pkg.p3_title': 'Balinese Dinner',
      'menu_pkg.p3_price': 'from IDR 350,000 · per person',
      'menu_pkg.p4_title': 'Thai Vegetarian',
      'menu_pkg.p4_price': 'from IDR 400,000 · per person',
      'menu_pkg.p5_title': 'Premium Meat',
      'menu_pkg.p5_price': 'from IDR 450,000 · per person',
      'menu_pkg.p6_title': 'Premium Lobster',
      'menu_pkg.p6_price': 'from IDR 650,000 · per person',
      'menu_pkg.p6_note': 'Includes a bread basket and infused water.',
      'menu_pkg.p7_title': 'Balinese Babi Guling',
      'menu_pkg.p7_price': 'from IDR 4,750,000 · 10 to 13 guests',
      'menu_pkg.p7_link': 'See BBQ & events',
      'menu_pkg.cta': 'Ask about a date',


      // ---- Footer ----
      'footer.tagline': 'Breakfast, lunch, dinner and BBQ, cooked in your villa across Bali.',
      'footer.explore': 'Explore',
      'footer.services': 'Services',
      'footer.contact': 'Contact',
      'footer.link_exp': 'Experience',
      'footer.link_services': 'Services',
      'footer.link_gallery': 'Gallery',
      'footer.link_book': 'Book',
      'footer.link_villa': 'Dining in your villa',
      'footer.link_bbq': 'Cooking class',
      'footer.link_menu': 'Menu & prices',
      'footer.link_consulting': 'BBQ & events',
      'footer.rights': 'All rights reserved.',
      'footer.credit': 'Development · Anabhi Dev',

      // ---- Breadcrumb ----
      'crumb.home': 'Home',
      'crumb.menu': 'Menu & prices',
      'crumb.bbq': 'BBQ & events',

      // ---- FAQ ----
      'faq.eyebrow': 'Before you book',
      'faq.title': 'Common questions',
      'faq.q1': 'Do you bring the ingredients?',
      'faq.a1': 'Yes. Every package includes all ingredients and preparation by the chef, and there is no separate chef fee on top.',
      'faq.q2': 'Which areas do you cover?',
      'faq.a2': 'Chef Galung is based in Uluwatu and travels to villas across Bali. Tell us where you are staying and we will confirm before you book.',
      'faq.q3': 'How far ahead should I book?',
      'faq.a3': 'Send the date on WhatsApp and the chef will come back with availability. Weekends and holiday dates go early, so earlier is safer.',
      'faq.q4': 'Can you cook for dietary requirements?',
      'faq.a4': 'Vegetarian, vegan, gluten-free, halal-friendly and allergy-conscious preparation are all handled. Tell us before the date rather than on arrival, so the shopping can be planned around it.',
      'faq.q5': 'Do you clean up afterwards?',
      'faq.a5': 'Yes. The kitchen and the work area are cleared as if no one had cooked there.',
      'faq.q6': 'How does payment work?',
      'faq.a6': 'Every booking is quoted per occasion and settled directly with the chef over WhatsApp. There is no online payment and nothing is stored on this site.',

      // ---- Halaman 404 ----
      'nf.eyebrow': 'Error 404',
      'nf.title': 'This page has moved on.',
      'nf.lead': 'The link you followed does not lead anywhere on this site any more. Everything below is still here.',
      'nf.l1': 'Home',
      'nf.l2': 'Menu & prices',
      'nf.l3': 'BBQ & events',
      'nf.l4': 'Book a date',
      'nf.cta': 'Back to home',
      'nf.next': 'Where to go next',
      // ---- Halaman BBQ & Events ----
      'bbq_hero.eyebrow': 'For groups & celebrations',
      'bbq_hero.title': 'BBQ party & whole roasts',
      'bbq_hero.lead': 'Cooking over fire at your villa, for the occasions worth gathering for — birthdays, farewells, and tables that need more than a menu.',
      'bbq_hero.cta_book': 'Request a date',
      'bbq_hero.cta_see': 'See the packages',
      'bbq_bg.eyebrow': 'The centrepiece',
      'bbq_bg.title': 'Balinese babi guling',
      'bbq_bg.lead': 'A whole suckling pig, turned over an open fire and served the traditional way. Cooked on site, carved at your table.',
      'bbq_bg.i1_title': 'What is served',
      'bbq_bg.i1_desc': 'Whole babi guling, sayur urab, jukut ares, steamed rice, and black rice pudding with mango and coconut milk.',
      'bbq_bg.i2_title': 'Group size',
      'bbq_bg.i2_desc': 'Built for 10 to 13 guests. Larger groups quoted on request.',
      'bbq_bg.i3_title': 'From',
      'bbq_bg.i3_desc': 'IDR 4,750,000 per package. All ingredients and preparation included — no separate chef fee.',
      'bbq_bg.cta': 'Ask about a date',
      'bbq_grill.eyebrow': 'Also on the fire',
      'bbq_grill.title': 'Grill menus',
      'bbq_grill.lead': 'Priced per person and quoted per occasion. Ingredients and preparation are always included.',
      'bbq_grill.g1_title': 'Premium meat',
      'bbq_grill.g1_desc': 'Greek salad, grilled sirloin, deep-fried potato, sautéed vegetables, and blueberry cheesecake. From IDR 450,000 per person.',
      'bbq_grill.g2_title': 'Balinese dinner',
      'bbq_grill.g2_desc': 'Sayur urab, jukut ares, ayam betutu, sate lilit and dadar gulung. From IDR 350,000 per person.',
      'bbq_grill.g3_title': 'Family style',
      'bbq_grill.g3_desc': 'Platters set down the middle of the table for everyone to share. Quoted per group and per menu.',
      'bbq_grill.btn': 'See the full menu',
      'bbq_how.eyebrow': 'How it works',
      'bbq_how.title': 'From message to table',
      'bbq_how.h1_title': 'Tell us the occasion',
      'bbq_how.h1_desc': 'Date, villa, number of guests, and anything the group cannot eat.',
      'bbq_how.h2_title': 'Agree the menu',
      'bbq_how.h2_desc': 'The chef replies on WhatsApp with a menu direction and a quote.',
      'bbq_how.h3_title': 'We bring everything',
      'bbq_how.h3_desc': 'Ingredients, equipment and the fire. Nothing needed from the villa.',
      'bbq_how.h4_title': 'Cooked on site',
      'bbq_how.h4_desc': 'Roasting starts hours ahead so it is ready when your guests are.',
      'bbq_how.h5_title': 'Served your way',
      'bbq_how.h5_desc': 'Carved at the table, or plated and paced as courses.',
      'bbq_how.h6_title': 'Kitchen left clean',
      'bbq_how.h6_desc': 'The work area is cleared as if no one had cooked there.',
      'bbq_cta.title': 'Planning something bigger?',
      'bbq_cta.lead': 'Send the date and the number of guests. The chef will come back with a menu and a price.',
      'bbq_cta.btn': 'Request a date',
    },

    id: {
      // ---- Navigasi & Global ----
      'nav.experience': 'Pengalaman',
      'nav.services': 'Layanan',
      'nav.menu': 'Menu',
      'nav.consulting': 'BBQ & Acara',
      'nav.gallery': 'Galeri',
      'nav.book': 'Reservasi Sekarang',

      // ---- Index: Hero ----
      'hero.eyebrow': 'Chef Privat · Bali',
      'hero.title': 'Santapan Privat, Khusus Untuk Anda',
      'hero.lead': 'Chef profesional, menu eksklusif, dan malam istimewa yang disesuaikan dengan vila, tamu, dan momen berharga Anda — disajikan langsung di tempat Anda menginap.',
      'hero.micro': 'Sarapan <span aria-hidden="true">·</span> Makan Siang <span aria-hidden="true">·</span> Makan Malam <span aria-hidden="true">·</span> Kelas Memasak <span aria-hidden="true">·</span> BBQ Party',
      'hero.cta_book': 'Reservasi Sekarang',
      'hero.cta_services': 'Lihat Layanan Kami',

      // ---- Index: Strip Sorotan di bawah hero ----
      'strip.heading': 'Sorotan Layanan',
      'strip.s1_title': 'Santap di Vila Anda',
      'strip.s1_desc': 'Sarapan, makan siang, atau makan malam — dimasak dan disajikan di tempat Anda menginap.',
      'strip.s2_title': 'Floating Breakfast',
      'strip.s2_desc': 'Disajikan mengapung di kolam, untuk dua orang. Bahan dan persiapan sudah termasuk.',
      'strip.s3_title': 'Kelas Memasak',
      'strip.s3_desc': 'Memasak bersama chef di dapur Anda sendiri, resepnya boleh dibawa pulang.',

      // ---- Index: Pengalaman ----
      'exp.eyebrow': 'Pengalaman chef privat',
      'exp.title': 'Pengalaman bersantap yang berpusat pada Anda.',
      'exp.p1': 'Masakan standar restoran terbaik, dihadirkan ke ruang privat Anda. Menu dirancang bersama Anda sebelumnya — disesuaikan dengan selera, pantangan, jumlah tamu, dan suasana yang diinginkan.',
      'exp.p2': 'Tanpa batas waktu duduk, tanpa antre. Dapur kami hadir ke vila Anda dan meninggalkannya dalam keadaan bersih sempurna seperti semula.',
      'exp.link': 'Rencanakan Malam Anda',

      // ---- Index: Layanan ----
      'services.eyebrow': 'Layanan Kami',
      'services.title': 'Pilihan Layanan',
      'services.lead': 'Enam cara Chef Galung bekerja di Bali. Setiap layanan dihitung per acara — sampaikan tanggal, vila, dan jumlah tamu Anda.',
      'services.s1_title': 'Floating Breakfast',
      'services.s1_desc': 'Sarapan mengapung di kolam vila Anda, disajikan untuk dua orang.',
      'services.s2_title': 'Sarapan',
      'services.s2_desc': 'Awal hari yang layak, dimasak langsung di dapur Anda.',
      'services.s3_title': 'Makan Siang',
      'services.s3_desc': 'Hidangan ringan atau sajian lengkap, kapan pun waktunya pas.',
      'services.s4_title': 'Makan Malam',
      'services.s4_desc': 'Acara utamanya — hidangan disajikan mengikuti ritme malam Anda.',
      'services.s5_title': 'Kelas Memasak',
      'services.s5_desc': 'Memasak bersama chef di dapur Anda sendiri, resepnya boleh dibawa pulang.',
      'services.s6_title': 'BBQ Party',
      'services.s6_desc': 'Menu panggangan dan babi guling utuh untuk rombongan besar dan perayaan.',

      // ---- Index: Profil Chef ----
      'chef.eyebrow': 'Profil Chef Anda',
      'chef.title': 'Chef Galung',
      'chef.lead': 'Sebelas tahun di dapur-dapur Bali, sebagian besar di kawasan Bukit.',
      'chef.bio1': 'Chef Galung memulai sebagai Chef de Cuisine di Semara Luxury Villa dan Finns Beach Club pada 2015, lalu hampir tujuh tahun di The Ungasan Clifftop Resort dan Sundays Beach Club — mula-mula sebagai Chef de Cuisine, kemudian Executive Sous Chef — termasuk bekerja bersama chef Australia James Viles. Dari 2023 sampai 2026 ia menjabat Executive Chef di Banana Day Club, Bingin.',
      'chef.bio2': 'Masakan Western kelas atas adalah tempat ia ditempa. Masakan Bali dan Indonesia adalah asalnya. Nature Private Chef adalah titik temu keduanya — di vila Anda, di meja Anda.',
      'chef.p1_title': 'Bahan Segar & Lokal',
      'chef.p1_desc': 'Dibeli khusus untuk menu Anda hari itu, bukan stok simpanan.',
      'chef.p2_title': 'Menu yang Dipersonalisasi',
      'chef.p2_desc': 'Disepakati bersama Anda sebelum hari H, bukan saat kedatangan.',
      'chef.p3_title': 'Profesional & Berkelas',
      'chef.p3_desc': 'Tepat waktu, mandiri, dan menjaga privasi serta kenyamanan Anda.',

      // ---- Index: Teaser Konsultasi ----
      'consulting_teaser.eyebrow': 'Untuk Rombongan & Perayaan',
      'consulting_teaser.title': 'Panggangan utuh, api terbuka, satu meja panjang.',
      'consulting_teaser.lead': 'BBQ party dan babi guling khas Bali, dimasak di atas bara di vila Anda — dirancang untuk rombongan besar dan momen yang layak dirayakan.',
      'consulting_teaser.link': 'BBQ & Acara',

      // ---- Index: Galeri ----
      'gallery.eyebrow': 'Momen & Meja Jamuan',
      'gallery.title': 'Galeri',
      'gallery.lead': 'Koleksi momen dari vila privat, jamuan makan malam intim, dan acara berkesan di seluruh Bali.',

      // ---- Index: Standar Layanan (Nilai) ----
      'expect.eyebrow': 'Standar Keunggulan',
      'expect.title': 'Komitmen Kami Untuk Anda',
      'expect.lead': 'Setiap reservasi ditangani dengan perhatian penuh terhadap detail, mulai dari konsultasi awal hingga pembersihan akhir.',
      'expect.v1_title': 'Bahan Baku Segar',
      'expect.v1_desc': 'Dibeli khusus untuk menu Anda, mendekati tanggal acara.',
      'expect.v2_title': 'Chef Berpengalaman',
      'expect.v2_desc': 'Disiplin dapur profesional, dalam suasana privat.',
      'expect.v3_title': 'Menu Personal',
      'expect.v3_desc': 'Kebutuhan diet dan preferensi diurus jauh sebelum hari H.',
      'expect.v4_title': 'Kami Datang ke Vila Anda',
      'expect.v4_desc': 'Vila Anda, meja Anda, waktu Anda.',
      'expect.v5_title': 'Presisi & Detail',
      'expect.v5_desc': 'Penataan, penyajian, dan pembersihan sudah termasuk.',
      'expect.v6_title': 'Pelayanan Ramah & Diskrit',
      'expect.v6_desc': 'Kehadiran yang profesional dan tidak mengganggu di ruang Anda.',

      // ---- Index & Menu: Koleksi Masakan ----
      'cuisines.eyebrow': 'Pilihan Menu',
      'cuisines.title': 'Koleksi Masakan',
      'cuisines.lead': 'Inspirasi awal, bukan batasan kaku. Setiap menu dirancang khusus — sampaikan cita rasa yang Anda dambakan.',
      'cuisines.c1': 'Khas Bali',
      'cuisines.c2': 'Nusantara',
      'cuisines.c3': 'Asian Modern',
      'cuisines.c4': 'Western',
      'cuisines.c5': 'Panggangan & BBQ',
      'cuisines.c6': 'Vegetarian & Vegan',
      'cuisines.btn_view': 'Lihat Menu & Pengalaman Lengkap',

      // ---- Index: Form Reservasi ----
      'booking.eyebrow': 'Reservasi',
      'booking.title': 'Ceritakan momen acara Anda.',
      'booking.lead': 'Sampaikan tanggal, tempat Anda menginap, dan jumlah tamu. Chef akan membalas via WhatsApp dengan ketersediaan dan arah menunya.',
      'booking.info_title': 'Komunikasi Langsung',
      'booking.info_desc': 'Mengirimkan formulir ini akan membuka WhatsApp dengan detail pesanan Anda yang terisi rapi. Anda akan terhubung langsung dengan tim chef — tanpa balasan bot otomatis.',
      'booking.label_name': 'Nama Anda',
      'booking.label_service': 'Layanan',
      'booking.label_date': 'Tanggal',
      'booking.label_guests': 'Jumlah Tamu',
      'booking.label_location': 'Vila atau area di Bali',
      'booking.label_phone': 'Nomor WhatsApp',
      'booking.label_email': 'Email',
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

      // ---- Menu Page: Filosofi Menu ----
      'menu_phil.eyebrow': 'Cara Kami Meracik Menu',
      'menu_phil.title': 'Filosofi Menu',
      'menu_phil.p1_title': 'Eksekusi Signature',
      'menu_phil.p1_desc': 'Hidangan yang diangkat lewat teknik profesional dan presentasi yang rapi.',
      'menu_phil.p2_title': 'Bahan Musiman',
      'menu_phil.p2_desc': 'Mengikuti apa yang segar, lokal, dan sedang musim di pasar.',
      'menu_phil.p3_title': 'Preferensi Tamu',
      'menu_phil.p3_desc': 'Disesuaikan dengan selera dan kebutuhan diet rombongan Anda.',
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

      // ---- Halaman Menu: paket & harga ----
      'menu_pkg.eyebrow': 'Paket Menu',
      'menu_pkg.title': 'Menu & Harga',
      'menu_pkg.lead': 'Setiap paket sudah termasuk seluruh bahan dan persiapan oleh chef. Tidak ada biaya chef terpisah. Harga di bawah adalah titik awal — penawaran akhir menyesuaikan tanggal, jumlah tamu, dan perubahan menu.',
      'menu_pkg.choose': 'Pilih salah satu:',
      'menu_pkg.starter': 'Pembuka',
      'menu_pkg.soup': 'Sup',
      'menu_pkg.main': 'Hidangan Utama',
      'menu_pkg.dessert': 'Penutup',
      'menu_pkg.p1_title': 'Floating Breakfast',
      'menu_pkg.p1_price': 'mulai IDR 800.000 · per paket, 2 orang',
      'menu_pkg.p1_note': 'Nampan apungnya sendiri disediakan oleh pihak vila.',
      'menu_pkg.p2_title': 'Sarapan',
      'menu_pkg.p2_price': 'mulai IDR 420.000 · per orang, per menu',
      'menu_pkg.p2_note': 'Setiap pilihan disajikan dengan potongan buah dan jus.',
      'menu_pkg.p3_title': 'Makan Malam Bali',
      'menu_pkg.p3_price': 'mulai IDR 350.000 · per orang',
      'menu_pkg.p4_title': 'Thai Vegetarian',
      'menu_pkg.p4_price': 'mulai IDR 400.000 · per orang',
      'menu_pkg.p5_title': 'Daging Premium',
      'menu_pkg.p5_price': 'mulai IDR 450.000 · per orang',
      'menu_pkg.p6_title': 'Lobster Premium',
      'menu_pkg.p6_price': 'mulai IDR 650.000 · per orang',
      'menu_pkg.p6_note': 'Sudah termasuk keranjang roti dan air infus.',
      'menu_pkg.p7_title': 'Babi Guling Khas Bali',
      'menu_pkg.p7_price': 'mulai IDR 4.750.000 · 10 sampai 13 orang',
      'menu_pkg.p7_link': 'Lihat BBQ & Acara',
      'menu_pkg.cta': 'Tanyakan Tanggalnya',


      // ---- Footer ----
      'footer.tagline': 'Sarapan, makan siang, makan malam, dan BBQ — dimasak di vila Anda di seluruh Bali.',
      'footer.explore': 'Jelajahi',
      'footer.services': 'Layanan',
      'footer.contact': 'Kontak',
      'footer.link_exp': 'Pengalaman',
      'footer.link_services': 'Layanan',
      'footer.link_gallery': 'Galeri',
      'footer.link_book': 'Reservasi',
      'footer.link_villa': 'Santap di Vila Anda',
      'footer.link_bbq': 'Kelas Memasak',
      'footer.link_menu': 'Menu & Harga',
      'footer.link_consulting': 'BBQ & acara',
      'footer.rights': 'Hak cipta dilindungi.',
      'footer.credit': 'Development · Anabhi Dev',

      // ---- Breadcrumb ----
      'crumb.home': 'Beranda',
      'crumb.menu': 'Menu & Harga',
      'crumb.bbq': 'BBQ & Acara',

      // ---- FAQ ----
      'faq.eyebrow': 'Sebelum Memesan',
      'faq.title': 'Pertanyaan yang Sering Diajukan',
      'faq.q1': 'Apakah bahan-bahannya dibawa oleh chef?',
      'faq.a1': 'Ya. Setiap paket sudah termasuk seluruh bahan dan persiapan oleh chef, dan tidak ada biaya chef terpisah di luar itu.',
      'faq.q2': 'Area mana saja yang dilayani?',
      'faq.a2': 'Chef Galung berbasis di Uluwatu dan mendatangi vila di seluruh Bali. Sampaikan lokasi menginap Anda, akan kami konfirmasi sebelum pemesanan.',
      'faq.q3': 'Berapa jauh hari sebaiknya memesan?',
      'faq.a3': 'Kirimkan tanggalnya lewat WhatsApp, chef akan membalas dengan ketersediaan. Akhir pekan dan musim liburan cepat penuh, jadi lebih awal lebih aman.',
      'faq.q4': 'Bisakah memasak untuk kebutuhan diet tertentu?',
      'faq.a4': 'Vegetarian, vegan, bebas gluten, ramah halal, dan penanganan alergi semuanya bisa. Sampaikan sebelum hari H, bukan saat chef tiba, supaya belanjanya bisa direncanakan.',
      'faq.q5': 'Apakah dapurnya dibersihkan setelah selesai?',
      'faq.a5': 'Ya. Dapur dan area kerja dirapikan seolah tidak ada yang pernah memasak di sana.',
      'faq.q6': 'Bagaimana cara pembayarannya?',
      'faq.a6': 'Setiap pemesanan dihitung per acara dan diselesaikan langsung dengan chef lewat WhatsApp. Tidak ada pembayaran online, dan tidak ada data yang disimpan di situs ini.',

      // ---- Halaman 404 ----
      'nf.eyebrow': 'Error 404',
      'nf.title': 'Halaman ini sudah tidak ada.',
      'nf.lead': 'Tautan yang Anda ikuti tidak lagi menuju ke mana pun di situs ini. Semua yang di bawah ini masih ada.',
      'nf.l1': 'Beranda',
      'nf.l2': 'Menu & Harga',
      'nf.l3': 'BBQ & Acara',
      'nf.l4': 'Pesan Tanggal',
      'nf.cta': 'Kembali ke Beranda',
      'nf.next': 'Ke mana selanjutnya',
    },
      // ---- Halaman BBQ & Acara ----
      'bbq_hero.eyebrow': 'Untuk Rombongan & Perayaan',
      'bbq_hero.title': 'BBQ Party & Panggangan Utuh',
      'bbq_hero.lead': 'Memasak di atas bara di vila Anda, untuk momen yang layak dirayakan bersama — ulang tahun, perpisahan, dan meja yang butuh lebih dari sekadar menu.',
      'bbq_hero.cta_book': 'Ajukan Tanggal',
      'bbq_hero.cta_see': 'Lihat Paketnya',
      'bbq_bg.eyebrow': 'Hidangan Utama',
      'bbq_bg.title': 'Babi Guling Khas Bali',
      'bbq_bg.lead': 'Babi guling utuh, diputar di atas api terbuka dan disajikan secara tradisional. Dimasak di tempat, dipotong di meja Anda.',
      'bbq_bg.i1_title': 'Yang Disajikan',
      'bbq_bg.i1_desc': 'Babi guling utuh, sayur urab, jukut ares, nasi putih, dan bubur ketan hitam dengan mangga serta santan.',
      'bbq_bg.i2_title': 'Jumlah Tamu',
      'bbq_bg.i2_desc': 'Dirancang untuk 10 sampai 13 tamu. Rombongan lebih besar dihitung terpisah.',
      'bbq_bg.i3_title': 'Mulai Dari',
      'bbq_bg.i3_desc': 'IDR 4.750.000 per paket. Seluruh bahan dan persiapan sudah termasuk — tanpa biaya chef terpisah.',
      'bbq_bg.cta': 'Tanyakan Tanggalnya',
      'bbq_grill.eyebrow': 'Juga di Atas Bara',
      'bbq_grill.title': 'Menu Panggangan',
      'bbq_grill.lead': 'Dihitung per orang dan disesuaikan per acara. Bahan dan persiapan selalu sudah termasuk.',
      'bbq_grill.g1_title': 'Daging Premium',
      'bbq_grill.g1_desc': 'Greek salad, sirloin panggang, kentang goreng, tumis sayuran, dan blueberry cheesecake. Mulai IDR 450.000 per orang.',
      'bbq_grill.g2_title': 'Makan Malam Bali',
      'bbq_grill.g2_desc': 'Sayur urab, jukut ares, ayam betutu, sate lilit, dan dadar gulung. Mulai IDR 350.000 per orang.',
      'bbq_grill.g3_title': 'Sajian Bersama',
      'bbq_grill.g3_desc': 'Piring besar diletakkan di tengah meja untuk dinikmati bersama. Dihitung per rombongan dan per menu.',
      'bbq_grill.btn': 'Lihat Menu Lengkap',
      'bbq_how.eyebrow': 'Cara Kerjanya',
      'bbq_how.title': 'Dari Pesan Sampai ke Meja',
      'bbq_how.h1_title': 'Sampaikan Acaranya',
      'bbq_how.h1_desc': 'Tanggal, vila, jumlah tamu, dan hal yang tidak bisa dimakan rombongan Anda.',
      'bbq_how.h2_title': 'Sepakati Menunya',
      'bbq_how.h2_desc': 'Chef membalas via WhatsApp dengan arah menu dan penawaran harga.',
      'bbq_how.h3_title': 'Semua Kami Bawa',
      'bbq_how.h3_desc': 'Bahan, peralatan, dan apinya. Tidak ada yang perlu disiapkan vila.',
      'bbq_how.h4_title': 'Dimasak di Tempat',
      'bbq_how.h4_desc': 'Pemanggangan dimulai beberapa jam lebih awal agar siap tepat saat tamu Anda siap.',
      'bbq_how.h5_title': 'Disajikan Sesuai Selera',
      'bbq_how.h5_desc': 'Dipotong langsung di meja, atau disajikan berurutan sebagai hidangan bertahap.',
      'bbq_how.h6_title': 'Dapur Ditinggal Bersih',
      'bbq_how.h6_desc': 'Area kerja dirapikan seolah tidak ada yang pernah memasak di sana.',
      'bbq_cta.title': 'Merencanakan Acara Lebih Besar?',
      'bbq_cta.lead': 'Kirimkan tanggal dan jumlah tamu Anda. Chef akan kembali dengan menu dan harganya.',
      'bbq_cta.btn': 'Ajukan Tanggal',
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

