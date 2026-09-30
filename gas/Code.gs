// ═══════════════════════════════════════════════════════════════════
//  AnabhiDev-Analytics — Universal Visitor Intelligence & REST API Hub
//  Module    : Headless Ingestion, PIN Auth & Real-Time Analytics Engine
//  Package   : Anabhi Dev Master Ecosystem (SOP v2.12 Compliance)
//  File      : gas/Code.gs
//  Author    : Development · Anabhi Dev
//  Version   : 1.3.0
//  Status    : PRODUCTION LIVE
//  Effective : Rabu, 30 September 2026 pukul 18.25.00 WITA
//  Admin UI  : https://anabhidev.com/adm1nLogs.html
// ═══════════════════════════════════════════════════════════════════

const SHEET_LOGS   = 'VisitorLogs';
const SHEET_CONFIG = 'Config';

// Konfigurasi Default Keamanan & Sesi
const MAX_FAILED_ATTEMPTS = 5;               // Maksimal salah ketik PIN sebelum lockout
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;  // 15 Menit lockout (Anti Brute-Force)
const SESSION_TTL_SEC     = 12 * 3600;       // 12 Jam Session Token (CacheService)
const DEFAULT_FALLBACK_PIN = '282828';       // Default PIN jika belum disetel di Script Properties

// ── 1. ROUTER: doGet (Pure Headless JSON REST API) ──────────────
function doGet(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const action = params.action;

  if (action === 'verifyPin') {
    return handleVerifyPin(params.pin);
  }

  if (action === 'verifyToken') {
    return handleVerifyToken(params.token);
  }

  if (action === 'getAnalytics') {
    return handleGetAnalytics(params.token, params.range);
  }

  if (action === 'setup') {
    if (params.key === 'SETUP_ANABHI') {
      const initRes = initializeSystem();
      return jsonResponse(initRes);
    }
  }

  // Default: JSON Status murni (Dashboard UI ada di anabhidev.com/adm1nLogs.html)
  return jsonResponse({
    status: 'online',
    service: 'AnabhiDev-Analytics Engine',
    version: '1.1.0',
    compliance: 'Master SOP AnabhiDev v2.12',
    dashboardUrl: 'https://anabhidev.com/adm1nLogs.html',
    timestamp: Utilities.formatDate(new Date(), 'Asia/Makassar', 'yyyy-MM-dd HH:mm:ss') + ' WITA'
  });
}

// ── 2. INGESTION: doPost (Receive Visitor Beacons Asynchronously) ─
function doPost(e) {
  try {
    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const sheet = getOrCreateLogsSheet();
    const now = new Date();
    const timestampWita = Utilities.formatDate(now, 'Asia/Makassar', 'yyyy-MM-dd HH:mm:ss') + ' WITA';

    const siteOrigin   = sanitizeStr(payload.siteOrigin || payload.origin || 'anabhidev.com');
    const pagePath     = sanitizeStr(payload.pagePath || payload.path || '/');
    const pageTitle    = sanitizeStr(payload.pageTitle || payload.title || '-');
    const referrer     = sanitizeStr(payload.referrer || 'Direct');
    const visitorId    = sanitizeStr(payload.visitorId || payload.vid || 'anon');
    const sessionId    = sanitizeStr(payload.sessionId || payload.sid || 'sess_anon');
    const deviceType   = sanitizeStr(payload.deviceType || 'Desktop');
    const os           = sanitizeStr(payload.os || 'Unknown');
    const browser      = sanitizeStr(payload.browser || 'Unknown');
    const screenRes    = sanitizeStr(payload.screen || '-');
    const viewport     = sanitizeStr(payload.viewport || '-');
    const durationSec  = Number(payload.duration || payload.dwellTime || 0);
    const scrollDepth  = Number(payload.scrollDepth || payload.scroll || 0);
    const language     = sanitizeStr(payload.language || 'id-ID');
    const timezone     = sanitizeStr(payload.timezone || 'Asia/Makassar');
    const ipAddress    = sanitizeStr(payload.ip || 'Anonymous/Protected');
    const city         = sanitizeStr(payload.city || '-');
    const region       = sanitizeStr(payload.region || '-');
    const country      = sanitizeStr(payload.country || 'ID');
    const isp          = sanitizeStr(payload.isp || payload.org || '-');
    const utmSource    = sanitizeStr(payload.utm_source || '-');
    const utmMedium    = sanitizeStr(payload.utm_medium || '-');
    const utmCampaign  = sanitizeStr(payload.utm_campaign || '-');

    const logRow = [
      timestampWita,
      siteOrigin,
      pagePath,
      pageTitle,
      referrer,
      visitorId,
      sessionId,
      deviceType,
      os,
      browser,
      screenRes,
      viewport,
      durationSec,
      scrollDepth,
      language,
      timezone,
      ipAddress,
      city,
      region,
      country,
      isp,
      utmSource,
      utmMedium,
      utmCampaign
    ];

    sheet.appendRow(logRow);

    return jsonResponse({
      status: 'success',
      message: 'Log beacon recorded successfully',
      timestamp: timestampWita
    });

  } catch (err) {
    return jsonResponse({
      status: 'error',
      message: err.toString()
    });
  }
}

// ── 3. SECURITY & AUTHENTICATION ENGINE ─────────────────────────
function getAdminPin() {
  const props = PropertiesService.getScriptProperties();
  const pin = props.getProperty('ADMIN_PIN');
  return pin ? String(pin).trim() : DEFAULT_FALLBACK_PIN;
}

function handleVerifyPin(inputPin) {
  const props = PropertiesService.getScriptProperties();
  const cache = CacheService.getScriptCache();
  const now = Date.now();

  const lockoutUntil = Number(props.getProperty('LOCKOUT_UNTIL') || 0);
  if (lockoutUntil > now) {
    const remainingSec = Math.ceil((lockoutUntil - now) / 1000);
    const remainingMin = Math.ceil(remainingSec / 60);
    return jsonResponse({
      success: false,
      locked: true,
      message: `Akses terkunci sementara karena salah PIN 5x. Coba lagi dalam ${remainingMin} menit (${remainingSec} detik).`,
      remainingSeconds: remainingSec
    });
  }

  const targetPin = getAdminPin();
  const cleanInput = inputPin ? String(inputPin).trim() : '';

  if (cleanInput === targetPin) {
    props.setProperty('FAILED_ATTEMPTS', '0');
    props.deleteProperty('LOCKOUT_UNTIL');

    const sessionToken = Utilities.getUuid();
    cache.put('TOKEN_' + sessionToken, 'VALID', SESSION_TTL_SEC);

    return jsonResponse({
      success: true,
      token: sessionToken,
      expiresIn: SESSION_TTL_SEC,
      message: 'Otentikasi berhasil. Selamat datang di Anabhi Analytics Hub.'
    });
  } else {
    let failed = Number(props.getProperty('FAILED_ATTEMPTS') || 0) + 1;
    props.setProperty('FAILED_ATTEMPTS', String(failed));

    if (failed >= MAX_FAILED_ATTEMPTS) {
      const lockTime = now + LOCKOUT_DURATION_MS;
      props.setProperty('LOCKOUT_UNTIL', String(lockTime));
      return jsonResponse({
        success: false,
        locked: true,
        message: 'PIN salah 5x berturut-turut! Sistem terkunci otomatis selama 15 menit demi keamanan.',
        remainingAttempts: 0
      });
    }

    const remaining = MAX_FAILED_ATTEMPTS - failed;
    return jsonResponse({
      success: false,
      locked: false,
      message: `PIN salah. Sisa kesempatan: ${remaining} kali sebelum terkunci 15 menit.`,
      remainingAttempts: remaining
    });
  }
}

function handleVerifyToken(token) {
  const cache = CacheService.getScriptCache();
  if (!token) return jsonResponse({ valid: false });
  const status = cache.get('TOKEN_' + token);
  return jsonResponse({ valid: status === 'VALID' });
}

function isAuthorized(token) {
  if (!token) return false;
  const cache = CacheService.getScriptCache();
  return cache.get('TOKEN_' + token) === 'VALID';
}

// ── 4. ANALYTICS AGGREGATOR & REPORTING ENGINE ─────────────────
function handleGetAnalytics(token, rangeParam) {
  if (!isAuthorized(token)) {
    return jsonResponse({
      status: 'unauthorized',
      message: 'Sesi telah kedaluwarsa atau token tidak valid. Silakan masukkan PIN kembali.'
    });
  }

  const range = rangeParam || '7d';
  const sheet = getOrCreateLogsSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow <= 1) {
    return jsonResponse({
      status: 'success',
      totalRecords: 0,
      kpi: { pageviews: 0, uniques: 0, avgDurationSec: 0, avgScrollDepth: 0 },
      trends: { labels: [], views: [], uniques: [] },
      topPages: [],
      topReferrers: [],
      deviceBreakdown: { Desktop: 0, Mobile: 0, Tablet: 0 },
      osBreakdown: {},
      geoBreakdown: [],
      recentLogs: []
    });
  }

  const data = sheet.getRange(2, 1, lastRow - 1, 24).getValues();
  const now = new Date();

  const filtered = data.filter(row => {
    if (!row[0]) return false;
    const rowDateStr = String(row[0]).split(' ')[0];
    const rowDate = new Date(rowDateStr);
    if (isNaN(rowDate.getTime())) return true;

    if (range === 'today') {
      const todayStr = Utilities.formatDate(now, 'Asia/Makassar', 'yyyy-MM-dd');
      return rowDateStr === todayStr;
    } else if (range === '7d') {
      const diffDays = (now - rowDate) / (1000 * 3600 * 24);
      return diffDays <= 7;
    } else if (range === '30d') {
      const diffDays = (now - rowDate) / (1000 * 3600 * 24);
      return diffDays <= 30;
    }
    return true;
  });

  const uniqueVisitors = new Set();
  const pageCounts     = {};
  const referrerCounts = {};
  const deviceCounts   = { Desktop: 0, Mobile: 0, Tablet: 0 };
  const osCounts       = {};
  const browserCounts  = {};
  const geoCounts      = {};
  const dailyTrends    = {};
  const hourlyCounts   = new Array(24).fill(0);
  const dayOfWeekCounts= new Array(7).fill(0); // 0=Min, 1=Sen, 2=Sel, 3=Rab, 4=Kam, 5=Jum, 6=Sab
  const engagementTiers = { bounce: 0, skim: 0, read: 0, deep: 0 };
  const scrollMilestones = { p25: 0, p50: 0, p75: 0, p100: 0 };
  let totalDuration    = 0;
  let durationCount    = 0;
  let totalScroll      = 0;
  let scrollCount      = 0;

  filtered.forEach(row => {
    const timestampStr = String(row[0] || '');
    const dateKey      = timestampStr.split(' ')[0] || 'Unknown';
    const timePart     = timestampStr.split(' ')[1] || '00:00:00';
    const hourVal      = parseInt(timePart.split(':')[0], 10);
    if (!isNaN(hourVal) && hourVal >= 0 && hourVal < 24) {
      hourlyCounts[hourVal]++;
    }

    const rowDateObj = new Date(dateKey);
    if (!isNaN(rowDateObj.getTime())) {
      dayOfWeekCounts[rowDateObj.getDay()]++;
    }

    const pagePath     = String(row[2] || '/');
    const pageTitle    = String(row[3] || '-');
    const referrer     = String(row[4] || 'Direct');
    const vid          = String(row[5] || 'anon');
    const device       = String(row[7] || 'Desktop');
    const os           = String(row[8] || 'Unknown');
    const browser      = String(row[9] || 'Unknown');
    const dur          = Number(row[12] || 0);
    const scroll       = Number(row[13] || 0);
    const city         = String(row[17] || '-');
    const country      = String(row[19] || 'ID');

    uniqueVisitors.add(vid);

    // Engagement funnel tiers
    if (dur < 5) engagementTiers.bounce++;
    else if (dur < 20) engagementTiers.skim++;
    else if (dur < 60) engagementTiers.read++;
    else engagementTiers.deep++;

    // Scroll depth milestones
    if (scroll >= 100) scrollMilestones.p100++;
    else if (scroll >= 75) scrollMilestones.p75++;
    else if (scroll >= 50) scrollMilestones.p50++;
    else if (scroll >= 25) scrollMilestones.p25++;

    if (dur > 0 && dur < 3600) {
      totalDuration += dur;
      durationCount++;
    }
    if (scroll > 0) {
      totalScroll += scroll;
      scrollCount++;
    }

    if (!dailyTrends[dateKey]) {
      dailyTrends[dateKey] = { views: 0, uniqueSet: new Set() };
    }
    dailyTrends[dateKey].views++;
    dailyTrends[dateKey].uniqueSet.add(vid);

    const pageKey = pagePath;
    if (!pageCounts[pageKey]) pageCounts[pageKey] = { path: pagePath, title: pageTitle, views: 0 };
    pageCounts[pageKey].views++;

    const refKey = normalizeReferrer(referrer);
    referrerCounts[refKey] = (referrerCounts[refKey] || 0) + 1;

    if (deviceCounts[device] !== undefined) deviceCounts[device]++;
    else deviceCounts['Desktop']++;

    osCounts[os] = (osCounts[os] || 0) + 1;
    browserCounts[browser] = (browserCounts[browser] || 0) + 1;

    const geoKey = (city && city !== '-') ? `${city}, ${country}` : country;
    geoCounts[geoKey] = (geoCounts[geoKey] || 0) + 1;
  });

  const trendLabels = Object.keys(dailyTrends).sort();
  const trendViews  = trendLabels.map(k => dailyTrends[k].views);
  const trendUnique = trendLabels.map(k => dailyTrends[k].uniqueSet.size);

  const topPages = Object.values(pageCounts)
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  const topReferrers = Object.entries(referrerCounts)
    .map(([source, count]) => ({ source, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const geoBreakdown = Object.entries(geoCounts)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // Mengembalikan hingga 50 log terakhir dengan seluruh 24 kolom data lengkap
  const recentLogs = filtered.slice(-50).reverse().map(r => ({
    timestamp: r[0] || '-',
    site: r[1] || 'anabhidev.com',
    path: r[2] || '/',
    title: r[3] || '-',
    referrer: r[4] || 'Direct',
    visitorId: r[5] || 'anon',
    sessionId: r[6] || 'sess_anon',
    device: r[7] || 'Desktop',
    os: r[8] || 'Unknown',
    browser: r[9] || 'Unknown',
    screen: r[10] || '-',
    viewport: r[11] || '-',
    duration: Number(r[12] || 0),
    scroll: Number(r[13] || 0),
    language: r[14] || 'id-ID',
    timezone: r[15] || 'Asia/Makassar',
    ip: r[16] || 'Protected',
    city: r[17] || '-',
    region: r[18] || '-',
    country: r[19] || 'ID',
    location: (r[17] && r[17] !== '-') ? `${r[17]}, ${r[19]}` : (r[19] || 'ID'),
    isp: r[20] || '-',
    utmSource: r[21] || '-',
    utmMedium: r[22] || '-',
    utmCampaign: r[23] || '-'
  }));

  const avgDuration = durationCount > 0 ? Math.round(totalDuration / durationCount) : 0;
  const avgScroll   = scrollCount > 0 ? Math.round(totalScroll / scrollCount) : 0;

  return jsonResponse({
    status: 'success',
    totalRecords: filtered.length,
    kpi: {
      pageviews: filtered.length,
      uniques: uniqueVisitors.size,
      avgDurationSec: avgDuration,
      avgScrollDepth: avgScroll
    },
    trends: {
      labels: trendLabels,
      views: trendViews,
      uniques: trendUnique
    },
    topPages: topPages,
    topReferrers: topReferrers,
    deviceBreakdown: deviceCounts,
    osBreakdown: osCounts,
    browserBreakdown: browserCounts,
    hourlyBreakdown: hourlyCounts,
    dayOfWeekBreakdown: dayOfWeekCounts,
    engagementTiers: engagementTiers,
    scrollMilestones: scrollMilestones,
    geoBreakdown: geoBreakdown,
    recentLogs: recentLogs
  });
}

// ── 5. UTILITIES & INITIALIZER ──────────────────────────────────
function getOrCreateLogsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_LOGS);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_LOGS);
    setupSheetHeaders(sheet);
  } else if (sheet.getLastRow() === 0) {
    setupSheetHeaders(sheet);
  }

  return sheet;
}

function setupSheetHeaders(sheet) {
  const headers = [
    'Timestamp (WITA)',
    'Site Origin',
    'Page Path',
    'Page Title',
    'Referrer',
    'Visitor ID',
    'Session ID',
    'Device Type',
    'OS',
    'Browser',
    'Screen Res',
    'Viewport',
    'Duration (s)',
    'Scroll Depth (%)',
    'Language',
    'Timezone',
    'IP Address',
    'City',
    'Region',
    'Country',
    'ISP / ASN',
    'UTM Source',
    'UTM Medium',
    'UTM Campaign'
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#08111D');
  headerRange.setFontColor('#F5F1EA');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('center');
  sheet.setFrozenRows(1);

  for (let col = 1; col <= headers.length; col++) {
    sheet.autoResizeColumn(col);
  }
}

function initializeSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateLogsSheet();
  const props = PropertiesService.getScriptProperties();

  if (!props.getProperty('ADMIN_PIN')) {
    props.setProperty('ADMIN_PIN', DEFAULT_FALLBACK_PIN);
  }

  return {
    status: 'initialized',
    sheetName: sheet.getName(),
    pinConfigured: true,
    currentDefaultPin: DEFAULT_FALLBACK_PIN,
    message: 'System initialization completed successfully. Default PIN is ' + DEFAULT_FALLBACK_PIN
  };
}

function normalizeReferrer(ref) {
  if (!ref || ref === '-' || ref === 'null') return 'Direct / None';
  try {
    if (ref.includes('linkedin.com')) return 'LinkedIn';
    if (ref.includes('wa.me') || ref.includes('whatsapp.com')) return 'WhatsApp';
    if (ref.includes('google.com')) return 'Google Search';
    if (ref.includes('instagram.com')) return 'Instagram';
    if (ref.includes('github.com')) return 'GitHub';
    if (ref.includes('anabhidev.com')) return 'Internal Ecosystem';
    const domain = ref.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
    return domain || 'External Web';
  } catch (e) {
    return 'Other';
  }
}

function sanitizeStr(val) {
  if (val === null || val === undefined) return '-';
  const str = String(val).trim();
  return str.length > 500 ? str.substring(0, 500) : str;
}

function jsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
