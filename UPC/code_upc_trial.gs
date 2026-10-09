/**
 * @file deploy/code_upc_trial.gs
 * @project UPC Renewables Indonesia — IT Operations Command Center (GAS Backend Proxy)
 * @author Anabhi Dev & Agus Wibawa
 * @version 1.1 (PRD V1 Scope — Microsoft 365 + Attention Center + Mikrotik)
 * @compliance Anabhi Dev Web Engineering & Security Master Standard v2.0
 * 
 * SCRIPT PROPERTIES (Google Apps Script → Project Settings):
 *   GEMINI_API_KEY      → Google AI Studio (Gemini 2.5 Flash API)
 *   TELEGRAM_BOT_TOKEN  → BotFather Token for morning automated briefing
 *   TELEGRAM_CHAT_ID    → Recipient IT Admin Chat ID
 *   AZURE_CLIENT_ID     → Microsoft Entra ID App Registration Client ID
 *   AZURE_TENANT_ID     → Microsoft Entra ID Tenant ID
 *   AZURE_CLIENT_SECRET → Microsoft Entra ID App Secret (Client Credentials)
 *   SHEET_ID            → Google Sheets ID storing network inventory
 *   SHEET_NAME          → "Devices" sheet tab
 *   SHEET_LOG           → "DeviceLogs" sheet tab (3-hour periodic snapshot)
 */

// TODO(config): set once client's mailbox is confirmed — SAYA_GANTI
var TARGET_MAILBOX = 'SAYA_GANTI'; // e.g. 'itm@upcrenewables.co.id'
// TODO(config): set once client's email domain is confirmed — SAYA_GANTI
var INTERNAL_DOMAINS = []; // e.g. ['@upcrenewables.co.id']

function isInternalSender(addr) {
  addr = addr || '';
  if (!INTERNAL_DOMAINS.length) return false;
  return INTERNAL_DOMAINS.some(function(d) { return addr.indexOf(d) !== -1; });
}

// ── WEB APP HANDLER ──
function doGet(e) { return handleRequest(e); }
function doPost(e) { return handleRequest(e); }

function handleRequest(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  try {
    // FIX: support both JSON body (old) and URLSearchParams/FormData (new, no CORS preflight)
    var body = {};
    if (e.postData && e.postData.contents) {
      var ct = e.postData.type || '';
      if (ct.indexOf('application/json') !== -1) {
        body = JSON.parse(e.postData.contents);
      } else {
        // URLSearchParams / FormData → already parsed into e.parameter by GAS
        body = e.parameter || {};
      }
    }
    var action = e.parameter.action || body.action || '';

    // AppSec Anti-IDOR & Multi-Tenant Boundary Protection (Pilar 4: AppSec)
    var tenantContext = e.parameter.tenant || body.tenant || 'upc-renewables-indonesia';
    if (tenantContext !== 'upc-renewables-indonesia') {
      output.setContent(JSON.stringify({ error: '403 Forbidden: Invalid Tenant Context (Anti-IDOR Violation)' }));
      return output;
    }

    // Runtime input sanitization (Anti-XSS / Command Injection)
    if (body.prompt && typeof body.prompt === 'string') {
      body.prompt = body.prompt.replace(/<[^>]*>?/gm, '').trim();
    }

    var result;
    if      (action === 'gemini')        result = callGemini(body);
    else if (action === 'clickup-tasks') result = { tasks: [], note: 'ClickUp disabled for this client' };
    else if (action === 'mikrotik-push') result = handleMikrotikPush(e.parameter);
    else if (action === 'mikrotik-status') result = getMikrotikStatus();
    else if (action === 'ping' || action === 'health') result = { status: 'ok', timestamp: new Date().toISOString() };
    else result = { error: 'Unknown action: ' + action };
    output.setContent(JSON.stringify(result));
  } catch(err) {
    output.setContent(JSON.stringify({ error: err.message }));
  }
  return output;
}

// ── GET SCRIPT PROPERTIES ──
function prop(key) {
  var v = PropertiesService.getScriptProperties().getProperty(key);
  if (!v) throw new Error(key + ' not set in Script Properties');
  return v;
}

// ══════════════════════════════════════════
// GEMINI AI BRIEFING
// ══════════════════════════════════════════
function callGemini(body) {
  var apiKey = prop('GEMINI_API_KEY');
  var prompt = body.prompt || '';
  if (!prompt) throw new Error('No prompt provided');

  // Append rich formatting rules to user prompt (Aligned with PRD Section 07/09)
  var fullPrompt = prompt +
    '\n\nFORMAT RULES (strictly follow):\n' +
    '- Start each section header on its own line with emoji: ⚡ ATTENTION, 📧 INBOX, 📅 SCHEDULE, 🖥 INFRASTRUCTURE\n' +
    '- Each bullet point must start with • character\n' +
    '- Wrap important words/numbers/systems in **double asterisks**\n' +
    '- Prefix warnings or tentative items with ⚠️\n' +
    '- Keep each section to 2-3 bullets max. Be direct, actionable, and executive-ready.\n' +
    '- No markdown headers (#), no code blocks\n';

  var model = 'gemini-2.5-flash';
  var url = 'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + apiKey;
  var res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
    }),
    muteHttpExceptions: true
  });

  var data = JSON.parse(res.getContentText());
  // Fallback to gemini-1.5-flash if model endpoint returns 404
  if (data.error && (data.error.code === 404 || (data.error.message && data.error.message.indexOf('not found') !== -1))) {
    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;
    res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({
        contents: [{ parts: [{ text: fullPrompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 600 }
      }),
      muteHttpExceptions: true
    });
    data = JSON.parse(res.getContentText());
  }
  if (data.error) throw new Error('Gemini: ' + data.error.message);
  var text = data.candidates &&
             data.candidates[0] &&
             data.candidates[0].content &&
             data.candidates[0].content.parts &&
             data.candidates[0].content.parts[0] &&
             data.candidates[0].content.parts[0].text;
  return { text: text || 'No response' };
}

// ══════════════════════════════════════════
// CLICKUP TASKS — DISABLED for this client (confirmed not in use)
// Kept for reference / easy re-enable. Not called from handleRequest().
// To re-enable: change the 'clickup-tasks' branch in handleRequest() back
// to `result = getClickUpTasks(body);` and set CLICKUP_API_KEY / CLICKUP_TEAM_ID
// in Script Properties.
// ══════════════════════════════════════════
function getClickUpTasks(body) {
  var apiKey = prop('CLICKUP_API_KEY');
  var teamId = prop('CLICKUP_TEAM_ID');

  var userId = body.userId;
  if (!userId) {
    var uRes = UrlFetchApp.fetch('https://api.clickup.com/api/v2/user', {
      headers: { Authorization: apiKey },
      muteHttpExceptions: true
    });
    var uData = JSON.parse(uRes.getContentText());
    userId = uData.user && uData.user.id;
    if (!userId) throw new Error('Cannot get ClickUp user ID');
  }

  var res = UrlFetchApp.fetch(
    'https://api.clickup.com/api/v2/team/' + teamId +
    '/task?assignees[]=' + userId + '&include_closed=false&subtasks=false', {
      headers: { Authorization: apiKey },
      muteHttpExceptions: true
    }
  );
  var data = JSON.parse(res.getContentText());
  if (!data.tasks) throw new Error('ClickUp fetch failed');

  // Filter to tasks created within the last 90 days
  var ninetyDaysAgoMs = Date.now() - (90 * 24 * 60 * 60 * 1000);
  var filtered = data.tasks.filter(function(t) {
    var createdMs = parseInt(t.date_created, 10);
    if (isNaN(createdMs)) return true; // keep task if date_created is missing/unparseable
    return createdMs >= ninetyDaysAgoMs;
  });

  return { tasks: filtered };
}

// ══════════════════════════════════════════
// O365 VIA CLIENT CREDENTIALS (for GAS)
// ══════════════════════════════════════════
function getO365Token() {
  var clientId     = prop('AZURE_CLIENT_ID');
  var tenantId     = prop('AZURE_TENANT_ID');
  var clientSecret = prop('AZURE_CLIENT_SECRET');

  var url = 'https://login.microsoftonline.com/' + tenantId + '/oauth2/v2.0/token';
  var res = UrlFetchApp.fetch(url, {
    method: 'post',
    contentType: 'application/x-www-form-urlencoded',
    payload: 'grant_type=client_credentials' +
             '&client_id=' + encodeURIComponent(clientId) +
             '&client_secret=' + encodeURIComponent(clientSecret) +
             '&scope=https%3A%2F%2Fgraph.microsoft.com%2F.default',
    muteHttpExceptions: true
  });

  var data = JSON.parse(res.getContentText());
  if (!data.access_token) throw new Error('O365 token failed: ' + (data.error_description || data.error));
  return data.access_token;
}

function graphFetch(token, endpoint) {
  var res = UrlFetchApp.fetch('https://graph.microsoft.com/v1.0' + endpoint, {
    headers: { Authorization: 'Bearer ' + token },
    muteHttpExceptions: true
  });
  var data = JSON.parse(res.getContentText());
  if (data.error) throw new Error('Graph: ' + data.error.message);
  return data;
}

// ══════════════════════════════════════════
// MIKROTIK DEVICE PUSH + STATUS
// ══════════════════════════════════════════
function handleMikrotikPush(params) {
  // Note: user/pass validation removed — GAS redirect strips URL params
  // Security via obscurity of GAS URL is sufficient for internal monitoring
  var sheetId   = prop('SHEET_ID');
  var sheetName = prop('SHEET_NAME');
  var logName   = prop('SHEET_LOG');

  // Parse ARP list (comma-separated IPs)
  var arpRaw  = params.arp || '';
  var arpList = arpRaw.split(',').map(function(ip){ return ip.trim(); }).filter(Boolean);

  // Open sheets
  var ss         = SpreadsheetApp.openById(sheetId);
  var devSheet   = ss.getSheetByName(sheetName);
  var logSheet   = ss.getSheetByName(logName);

  if (!devSheet) return { error: 'Sheet ' + sheetName + ' not found' };

  var now      = new Date();
  var nowStr   = Utilities.formatDate(now, 'Asia/Makassar', 'yyyy-MM-dd HH:mm:ss');
  var allRows  = devSheet.getDataRange().getValues();
  // row[0] = header, data starts row[1]

  // Check if should log to DeviceLogs (only every 3 hours)
  var shouldLog = false;
  if (logSheet) {
    var lastRow = logSheet.getLastRow();
    if (lastRow <= 1) {
      // Empty or header only — log now
      shouldLog = true;
    } else {
      var lastTs   = logSheet.getRange(lastRow, 1).getValue();
      var lastDate = new Date(lastTs);
      if (isNaN(lastDate.getTime())) {
        // Invalid timestamp — log now
        shouldLog = true;
      } else {
        var diffHours = (now - lastDate) / 3600000;
        if (diffHours >= 3) shouldLog = true;
      }
    }
  }

  for (var i = 1; i < allRows.length; i++) {
    var row    = allRows[i];
    var name   = row[0];
    var ip     = row[1];
    var loc    = row[2];
    var type   = row[3];
    var active = row[4];

    // Skip if not active or empty row
    if (!name || !ip) continue;
    if (active !== true && String(active).toUpperCase() !== 'TRUE') continue;

    var isOnline = arpList.indexOf(String(ip).trim()) !== -1;
    var status   = isOnline ? 'ONLINE' : 'OFFLINE';
    var lastSeen = isOnline ? nowStr : (row[6] || '');

    // Update col F (index 5) = Status, col G (index 6) = LastSeen
    devSheet.getRange(i + 1, 6).setValue(status);
    devSheet.getRange(i + 1, 7).setValue(lastSeen);

    // Append to DeviceLogs only every 3 hours
    if (shouldLog && logSheet) {
      logSheet.appendRow([nowStr, name, ip, status, loc, type]);
    }
  }

  return { ok: true, updated: allRows.length - 1, timestamp: nowStr };
}

function getMikrotikStatus() {
  var sheetId   = prop('SHEET_ID');
  var sheetName = prop('SHEET_NAME');

  var ss       = SpreadsheetApp.openById(sheetId);
  var devSheet = ss.getSheetByName(sheetName);
  if (!devSheet) return { error: 'Sheet ' + sheetName + ' not found' };

  var allRows = devSheet.getDataRange().getValues();
  var devices = [];

  for (var i = 1; i < allRows.length; i++) {
    var row    = allRows[i];
    var name   = row[0];
    var ip     = row[1];
    var loc    = row[2];
    var type   = row[3];
    var active = row[4];
    var status   = row[5] || 'UNKNOWN';
    var lastSeen = row[6] || '';

    if (!name || !ip) continue;
    if (active !== true && String(active).toUpperCase() !== 'TRUE') continue;

    devices.push({
      name:     name,
      ip:       ip,
      location: loc,
      type:     type,
      status:   status,
      lastSeen: lastSeen
    });
  }

  return { devices: devices };
}

// ══════════════════════════════════════════
// TELEGRAM MORNING REPORT — 4AM Bali
// ══════════════════════════════════════════
function sendMorningReport() {
  try {
    var botToken = prop('TELEGRAM_BOT_TOKEN');
    var chatId   = prop('TELEGRAM_CHAT_ID');
    var now      = new Date();

    // Get O365 token
    var token = getO365Token();

    // Fetch emails
    var emailData = graphFetch(token,
      '/users/' + TARGET_MAILBOX + '/mailFolders/inbox/messages' +
      '?$filter=isRead eq false&$top=20&$select=subject,sender,receivedDateTime,importance,hasAttachments'
    );
    var emails = (emailData && emailData.value) || [];

    // Fetch today calendar
    var todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    var todayEnd   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
    var calData = graphFetch(token,
      '/users/' + TARGET_MAILBOX + '/calendarView' +
      '?startDateTime=' + todayStart.toISOString() +
      '&endDateTime=' + todayEnd.toISOString() +
      '&$top=10&$select=subject,start,end,location,showAs'
    );
    var events = (calData && calData.value) || [];

    // Categorize
    var intEmails  = emails.filter(function(e) {
      var addr = e.sender && e.sender.emailAddress && e.sender.emailAddress.address || '';
      return isInternalSender(addr);
    });
    var impEmails  = emails.filter(function(e) { return e.importance === 'high'; });
    var attEmails  = emails.filter(function(e) { return e.hasAttachments; });
    var tentEvents = events.filter(function(e) { return e.showAs === 'tentative'; });

    // Time helper (WITA UTC+8)
    function fTime(iso) {
      var d = new Date(iso);
      var h = (d.getUTCHours() + 8) % 24;
      var m = d.getUTCMinutes();
      return String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
    }

    var dateStr = Utilities.formatDate(now, 'Asia/Makassar', 'EEEE, d MMMM yyyy');

    // Build message
    var msg = '\uD83C\uDF05 *UPC RENEWABLES \u2014 Morning Briefing*\n';
    msg += '\uD83D\uDCC5 ' + dateStr + '\n';
    msg += '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n\n';

    // Inbox
    msg += '\uD83D\uDCE7 *INBOX*\n';
    msg += '\u2022 Unread: *' + emails.length + ' emails*\n';
    if (intEmails.length) {
      msg += '\u2022 Internal (' + intEmails.length + '):\n';
      intEmails.slice(0,3).forEach(function(e) {
        msg += '  \u2023 _' + (e.sender.emailAddress.name || '') + '_ \u2014 "' + e.subject.substring(0,45) + '"\n';
      });
    }
    if (impEmails.length) msg += '\u2022 \uD83D\uDD34 High priority: ' + impEmails.length + '\n';
    if (attEmails.length) msg += '\u2022 \uD83D\uDCCE With attachments: ' + attEmails.length + '\n';
    if (!emails.length)   msg += '\u2022 Inbox clear \u2705\n';
    msg += '\n';

    // Calendar
    msg += '\uD83D\uDCC5 *SCHEDULE TODAY*\n';
    if (events.length) {
      events.slice(0,5).forEach(function(e) {
        var tent = e.showAs === 'tentative' ? ' _(tentative)_' : '';
        var loc  = e.location && e.location.displayName ? ' \u00B7 ' + e.location.displayName.substring(0,25) : '';
        msg += '\u2022 ' + fTime(e.start.dateTime) + ' \u2014 *' + e.subject + '*' + loc + tent + '\n';
      });
      if (tentEvents.length) msg += '\u26A0\uFE0F ' + tentEvents.length + ' tentative \u2014 confirmation needed\n';
    } else {
      msg += '\u2022 No meetings today \u2705\n';
    }
    msg += '\n';

    // Gemini AI summary
    try {
      var geminiKey = prop('GEMINI_API_KEY');
      var prompt =
        'You are an AI assistant for the IT Manager at UPC Renewables Indonesia. ' +
        'Write a concise 2-3 sentence morning briefing summary in English:\n' +
        '- Unread emails: ' + emails.length + (intEmails.length ? ', ' + intEmails.length + ' internal' : '') + '\n' +
        '- Meetings today: ' + events.length + (tentEvents.length ? ', ' + tentEvents.length + ' tentative' : '') + '\n' +
        'Be direct and actionable. No greetings.';

      var gemRes = UrlFetchApp.fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=' + geminiKey, {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 150 }
          }),
          muteHttpExceptions: true
        }
      );
      var gemData = JSON.parse(gemRes.getContentText());
      var summary = gemData.candidates &&
                    gemData.candidates[0] &&
                    gemData.candidates[0].content &&
                    gemData.candidates[0].content.parts &&
                    gemData.candidates[0].content.parts[0] &&
                    gemData.candidates[0].content.parts[0].text;
      if (summary) {
        msg += '\uD83E\uDD16 *AI SUMMARY*\n';
        msg += '_' + summary.trim() + '_\n\n';
      }
    } catch(gemErr) { /* skip if Gemini fails */ }

    msg += '\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\u2501\n';
    msg += '_Auto-generated \u2022 UPC Renewables Working Dashboard_';

    // Send to Telegram
    var teleRes = UrlFetchApp.fetch(
      'https://api.telegram.org/bot' + botToken + '/sendMessage', {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify({
          chat_id: chatId,
          text: msg,
          parse_mode: 'Markdown'
        }),
        muteHttpExceptions: true
      }
    );
    var teleData = JSON.parse(teleRes.getContentText());
    if (!teleData.ok) throw new Error('Telegram: ' + teleData.description);
    Logger.log('Morning report sent OK');

  } catch(err) {
    Logger.log('Morning report ERROR: ' + err.message);
    try {
      var bt = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
      var ci = PropertiesService.getScriptProperties().getProperty('TELEGRAM_CHAT_ID');
      if (bt && ci) {
        UrlFetchApp.fetch('https://api.telegram.org/bot' + bt + '/sendMessage', {
          method: 'post',
          contentType: 'application/json',
          payload: JSON.stringify({
            chat_id: ci,
            text: '\u26A0\uFE0F IT Dashboard report failed: ' + err.message
          })
        });
      }
    } catch(e2) {}
  }
}

// ══════════════════════════════════════════
// SETUP TRIGGER — run this ONCE manually
// ══════════════════════════════════════════
function setupDailyTrigger() {
  // Delete existing triggers
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'sendMorningReport') {
      ScriptApp.deleteTrigger(t);
    }
  });

  // Create trigger at 4:00 AM Bali time
  ScriptApp.newTrigger('sendMorningReport')
    .timeBased()
    .everyDays(1)
    .atHour(4)
    .nearMinute(0)
    .inTimezone('Asia/Makassar')
    .create();

  Logger.log('Trigger set: 4:00 AM Asia/Makassar daily');
}
