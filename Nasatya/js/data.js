const PRODUCTS = [
  {
    id:'therapy', name:'Nāsatyā Therapy', subtitle:'Minyak Therapy Multifungsi — P3K Serbaguna',
    category:'cat-basic', categoryLabel:'Basic Oil', color:'#4C8C56',
    sizes:[{size:'50ml',price:'Rp 120.000'},{size:'20ml',price:'Rp 60.000'},{size:'Roll-on 10ml',price:'Rp 30.000'}],
    bpom:'TR226082511',
    baseOil:['Extra Virgin Olive Oil'],
    essentialOil:['Peppermint','Clove / Cengkeh','Vetiver / Narwastu'],
    complaints:['Pegal, Linu & Kram','Pusing','Sakit Gigi & Sariawan','Maag & Ambeien','Diare & Sinusitis','Batuk & Pilek','Asam Urat','Gatal-gatal','Ketombe & Rambut Rontok','Luka Gores & Bakar','P3K Umum'],
    tags:['batuk-pilek','pegal-nyeri','sakit-kepala','pencernaan'],
    note:'Varian dasar (basic oil) — cocok jadi "kotak P3K cair" serbaguna dan sering dikombinasikan dengan varian lain untuk hasil optimal.'
  },
  {
    id:'refresh', name:'Nāsatyā Refresh', subtitle:'Pijat, Urut & Aromatherapy',
    category:'cat-basic', categoryLabel:'Basic Oil', color:'#2E86C1',
    sizes:[{size:'50ml',price:'Rp 120.000'},{size:'20ml',price:'Rp 60.000'},{size:'Roll-on 10ml',price:'Rp 30.000'}],
    bpom:'TR236041631',
    baseOil:['Extra Virgin Olive Oil','Virgin Coconut Oil'],
    essentialOil:['Peppermint','Clove / Cengkeh','Vetiver / Narwastu','Spearmint','Lemongrass'],
    complaints:['Pegal, Kram & Kesemutan','Bengkak & Memar','Sunburn','Sakit Pinggang & Leher','Nyeri Sendi & Otot','Migrain, Vertigo & Sakit Kepala','Ketombe & Kerontokan Rambut','Gatal karena Kutu/Jamur/Virus','Meriang','P3K Umum'],
    tags:['pegal-nyeri','sakit-kepala','batuk-pilek','gatal-kulit'],
    note:'Fokus pada pijat & aromaterapi — favorit untuk relaksasi otot setelah aktivitas berat/olahraga.'
  },
  {
    id:'sr-red', name:'Nāsatyā SR+ Red', subtitle:'Untuk Sakit Berat &amp; Menahun',
    category:'cat-srplus', categoryLabel:'SR+ Series', color:'#B5432F',
    sizes:[{size:'50ml',price:'Rp 300.000'}],
    bpom:'TR236061741',
    baseOil:['Extra Virgin Olive Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Vetiver','Lemongrass'],
    complaints:['Peradangan & Benjolan','Sakit Lutut','Frozen Shoulder','Otot Kaku','Saraf Kejepit','Sakit Pinggang Akut','GERD','Imun Tubuh','Sakit Berat & Menahun'],
    tags:['pegal-nyeri','sakit-berat','pencernaan'],
    note:'Diformulasikan khusus untuk kondisi sakit berat/menahun — bukan untuk keluhan ringan sehari-hari.'
  },
  {
    id:'sr-black', name:'Nāsatyā SR+ Black', subtitle:'Meningkatkan Stamina &amp; Vitalitas',
    category:'cat-srplus', categoryLabel:'SR+ Series', color:'#1C1C1C',
    sizes:[{size:'50ml',price:'Rp 300.000'}],
    bpom:'TR246063891',
    baseOil:['Extra Virgin Olive Oil','Grape Seed Oil'],
    essentialOil:['Frankincense','Cinnamon / Kayumanis','Bergamot','Cananga / Kenanga','Red Ginger / Jahe Merah'],
    complaints:['Hipertensi & Jantung','Kolesterol & Gula Darah','Stamina & Vitalitas Pria','Prostat','Trigger Finger','Plantar Fasciitis','Kesemutan','Imun Tubuh','Sakit Berat & Menahun'],
    tags:['kolesterol-jantung','stamina-pria','sakit-berat'],
    note:'Fokus stamina pria & kesehatan jantung — sering dikombinasikan dengan Varian Dasar untuk hasil metabolik optimal.'
  },
  {
    id:'sr-green', name:'Nāsatyā SR+ Green', subtitle:'Anti Nyeri, Regenerasi Sel Tubuh',
    category:'cat-srplus', categoryLabel:'SR+ Series', color:'#2E6B3E',
    sizes:[{size:'50ml',price:'Rp 300.000'}],
    bpom:'TR236066421',
    baseOil:['Extra Virgin Olive Oil','Virgin Coconut Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Spearmint'],
    complaints:['Scabies & Jamur','Gatal Alergi Kulit','Anti Virus & Bakteri','Gangguan Syaraf','Susah Tidur','Peredaran Darah & Gula Darah','Batuk Tak Kunjung Sembuh','Sakit Berat & Menahun'],
    tags:['gatal-kulit','susah-tidur','batuk-pilek','sakit-berat'],
    note:'Salah satu dari sedikit varian yang menyebut manfaat untuk batuk kronis/menahun, di luar varian dasar.'
  },
  {
    id:'skin', name:'Nāsatyā Skin', subtitle:'Perawatan Kulit Harian',
    category:'cat-skin', categoryLabel:'Skin Care', color:'#B5493C',
    sizes:[{size:'30ml',price:'Rp 200.000'}],
    bpom:'TR236061751',
    baseOil:['Extra Virgin Olive Oil','Grape Seed Oil','Virgin Coconut Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Lemongrass','Lavender'],
    complaints:['Jerawat & Kerutan','Pori-pori Besar','Selulit, Bisul & Kutil','Luka & Bekas Jerawat','Pelembab Kulit','Panu & Kurap','Stretch Mark','Kulit Kering & Kusam','Anti Aging'],
    tags:['masalah-kulit','gatal-kulit'],
    note:'Serum perawatan kulit umum — untuk kondisi kulit sensitif/alergi spesifik, lihat Nāsatyā Sense Skin atau Derma.'
  },
  {
    id:'sense-skin', name:'Nāsatyā Sense Skin', subtitle:'Untuk Kulit Sensitif',
    category:'cat-skin', categoryLabel:'Skin Care', color:'#D98A9E',
    sizes:[{size:'30ml',price:'Rp 200.000'}],
    bpom:'TR246012761',
    baseOil:['Extra Virgin Olive Oil','Grape Seed Oil','Virgin Coconut Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Spearmint','Lavender'],
    complaints:['Jerawat & Iritasi Kulit','Kulit Kemerahan & Sensitif','Gatal karena Alergi','Kulit Kering & Mengelupas','Pori-pori Besar & Selulit','Pelembab & Menutrisi Kulit','Anti Aging'],
    tags:['masalah-kulit','gatal-kulit'],
    note:'Versi Nāsatyā Skin yang diformulasikan lebih lembut, khusus kulit sensitif/mudah kemerahan.'
  },
  {
    id:'derma', name:'Nāsatyā Derma', subtitle:'Untuk Masalah Kulit Serius',
    category:'cat-skin', categoryLabel:'Skin Care', color:'#7A2E33',
    sizes:[{size:'30ml',price:'Rp 200.000'}],
    bpom:'TR236045971',
    baseOil:['Virgin Coconut Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Spearmint','Vetiver','Peppermint'],
    complaints:['Dermatitis Atopik & Psoriasis','Eksim & Ruam Kulit','Gatal karena Alergi','Kulit Kemerahan & Iritasi','Kulit Kering & Pecah-pecah','Masalah Autoimun/Genetik','Efek Obat Kimia/Vitamin Berlebih'],
    tags:['masalah-kulit','gatal-kulit'],
    note:'Diformulasikan untuk kondisi kulit yang lebih kompleks (dermatitis, psoriasis, autoimun) — bukan sekadar perawatan harian.'
  },
  {
    id:'balance', name:'Nāsatyā Balance', subtitle:'Menjaga Kesehatan Tubuh',
    category:'cat-khusus', categoryLabel:'Kesehatan Khusus', color:'#33443A',
    sizes:[{size:'50ml',price:'Rp 120.000'}],
    bpom:'TR236013411',
    baseOil:['Virgin Coconut Oil','Grape Seed Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Spearmint','Clove','Lemongrass'],
    complaints:['Gula Darah, Kolesterol & Asam Urat','Daya Tahan Tubuh','Stamina & Vitalitas','Metabolisme','Melancarkan Peredaran Darah','Menurunkan Tekanan Darah','Memperbaiki Pola Tidur'],
    tags:['kolesterol-jantung','susah-tidur'],
    gallery:['primary','ingredients'],
    note:'Manfaat gula darah/kolesterol/asam urat disebut brosur resmi optimal bila dikombinasikan dengan Varian Dasar (Therapy/Refresh).'
  },
  {
    id:'p-herba', name:'Nāsatyā P-Herba', subtitle:'Memperbaiki Kualitas Tidur',
    category:'cat-khusus', categoryLabel:'Kesehatan Khusus', color:'#A67C27',
    sizes:[{size:'50ml',price:'Rp 120.000'}],
    bpom:'TR236001931',
    baseOil:['Extra Virgin Olive Oil','Virgin Coconut Oil','Grape Seed Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Spearmint','Clove','Lemongrass'],
    complaints:['Gula Darah, Kolesterol & Asam Urat','Stamina & Vitalitas Pria','Menyuburkan Pria & Wanita','Metabolisme & Imun Tubuh','Anti Aging & Anti Oksidan','Kualitas Pola Tidur'],
    tags:['stamina-pria','susah-tidur','kolesterol-jantung'],
    gallery:['primary','ingredients'],
    note:'Manfaat gula darah/kolesterol/asam urat disebut brosur resmi optimal bila dikombinasikan dengan Varian Dasar.'
  },
  {
    id:'ss-yellow', name:'Nāsatyā SS Yellow', subtitle:'Kestabilan Hormon, Alergi &amp; Kulit',
    category:'cat-khusus', categoryLabel:'Kesehatan Khusus', color:'#C9A227',
    sizes:[{size:'50ml',price:'Rp 120.000'}],
    bpom:'TR246000511',
    baseOil:['Virgin Coconut Oil'],
    essentialOil:['Frankincense','Turmeric / Kunyit','Spearmint','Lemongrass'],
    complaints:['Jerawat & Alergi','Haid Tidak Lancar & Nyeri Haid','Menstabilkan Hormon','Imun Tubuh & Bekas Luka','Swing Mood','Kulit Sensitif & Kering','Memar/Lebam','Anti Aging'],
    tags:['masalah-kulit','gatal-kulit','wanita-hormon'],
    note:'Salah satu varian yang menyebut manfaat khusus wanita — nyeri haid & kestabilan hormon.'
  },
  {
    id:'harmony', name:'Nāsatyā Harmony', subtitle:'Untuk Susah Tidur &amp; Relaksasi',
    category:'cat-khusus', categoryLabel:'Kesehatan Khusus', color:'#7D5BA6',
    sizes:[{size:'50ml',price:'Rp 120.000'},{size:'Roll-on 10ml',price:'Rp 30.000'}],
    bpom:'TR236034511',
    baseOil:['Extra Virgin Olive Oil','Virgin Coconut Oil','Grape Seed Oil'],
    essentialOil:['Peppermint','Frankincense','Lavender','Spearmint','Lemongrass'],
    complaints:['Anti Depresan & Anti Stress','Sulit Tidur','Aritmia Jantung, Alzheimer & Demensia','Anti Aging & Anti Oksidan','Merelaksasi Otot & Sendi','Meringankan Gejala Diabetes','Sakit Kepala & Pusing'],
    tags:['susah-tidur','sakit-kepala','pegal-nyeri'],
    note:'Fokus relaksasi & kualitas tidur — juga disebut membantu meringankan ketergantungan/kecanduan obat pada brosur resmi.'
  },
  {
    id:'kayu-putih-plus', name:'Nāsatyā Kayu Putih Plus', subtitle:'Menghangatkan Tubuh',
    category:'cat-anak', categoryLabel:'Anak & Bayi', color:'#C7B441',
    sizes:[{size:'60ml',price:'Rp 60.000'},{size:'20ml / Roll-on',price:'Rp 25.000'}],
    bpom:'TR236046001',
    baseOil:['Extra Virgin Olive Oil','Virgin Coconut Oil'],
    essentialOil:['Peppermint','Cajuput / Kayu Putih','Eucalyptus'],
    complaints:['Masuk Angin, Mual & Perut Kembung','Pilek, Hidung Tersumbat & Flu','Gatal Gigitan Nyamuk/Kutu','Sesak Nafas','Pusing & Sakit Perut'],
    tags:['batuk-pilek','pencernaan','sakit-kepala'],
    note:'Kayu putih plus untuk seluruh keluarga (dewasa & anak lebih besar) — untuk bayi, gunakan Nāsatyā Telon.'
  },
  {
    id:'telon', name:'Nāsatyā Telon', subtitle:'Menjaga Kesehatan Keluarga (Bayi &amp; Anak)',
    category:'cat-anak', categoryLabel:'Anak & Bayi', color:'#D98E4A',
    sizes:[{size:'60ml',price:'Rp 60.000'},{size:'20ml / Roll-on',price:'Rp 25.000'}],
    bpom:'TR236013421',
    baseOil:['Virgin Coconut Oil'],
    essentialOil:['Star Anise / Adas Bintang','Eucalyptus'],
    complaints:['Kolik pada Bayi/Anak','Sakit Perut & Perut Kembung','Gatal Gigitan Nyamuk/Serangga','Melembabkan & Menghangatkan Kulit Bayi','Mencegah Masuk Angin & Pilek'],
    tags:['bayi-anak','batuk-pilek','pencernaan'],
    note:'Diformulasikan khusus untuk kulit bayi & anak — bahan lebih lembut dibanding varian dewasa.'
  }
];
