/**
 * ================================================================
 * AnabhiDev-Analytics — Universal Client Tracking Beacon
 * Module    : Zero-Dependency Lightweight Client Telemetry (~1.5 KB)
 * Package   : Anabhi Dev Master Ecosystem (SOP v2.12 Compliance)
 * File      : js/anabhi-tracker.js
 * Author    : Development · Anabhi Dev
 * Version   : 1.1.0
 * Status    : PRODUCTION CANDIDATE
 * Effective : Rabu, 30 September 2026 pukul 17.15.00 WITA
 * ================================================================
 */
(function () {
  'use strict';

  // Endpoint Web App Google Apps Script
  const DEFAULT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzrKiLLezhkiQyGvO6-xZcDCqwbvVc0CvQBHUHr-iPrFgqIXR1hqdtT5m92GSbRZvLj/exec';

  const currentScript = document.currentScript || document.querySelector('script[data-analytics-endpoint]');
  const ENDPOINT = (currentScript && currentScript.getAttribute('data-analytics-endpoint')) || DEFAULT_ENDPOINT;

  // Jangan track jika di localhost kecuali data-track-local disetel
  const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  const allowLocal = currentScript && currentScript.hasAttribute('data-track-local');
  if (isLocal && !allowLocal) {
    return;
  }

  // ── 1. PERSISTENT VISITOR & SESSION UUID ─────────────────────────
  function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  let vid = localStorage.getItem('anabhi_vid');
  if (!vid) {
    vid = 'vid_' + getUuid();
    try { localStorage.setItem('anabhi_vid', vid); } catch (e) {}
  }

  let sid = sessionStorage.getItem('anabhi_sid');
  if (!sid) {
    sid = 'sid_' + getUuid();
    try { sessionStorage.setItem('anabhi_sid', sid); } catch (e) {}
  }

  // ── 2. CLIENT HARDWARE & BROWSER DETECTION ──────────────────────
  const ua = navigator.userAgent;

  let deviceType = 'Desktop';
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    deviceType = 'Tablet';
  } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated/i.test(ua)) {
    deviceType = 'Mobile';
  }

  let os = 'Unknown';
  if (/Windows NT/i.test(ua)) os = 'Windows';
  else if (/iPhone|iPad|iPod/i.test(ua)) os = 'iOS';
  else if (/Android/i.test(ua)) os = 'Android';
  else if (/Mac OS X/i.test(ua)) os = 'macOS';
  else if (/Linux/i.test(ua)) os = 'Linux';

  let browser = 'Unknown';
  if (/Edg\//i.test(ua)) browser = 'Edge';
  else if (/Chrome\//i.test(ua) && !/Edg\//i.test(ua)) browser = 'Chrome';
  else if (/Safari\//i.test(ua) && !/Chrome\//i.test(ua)) browser = 'Safari';
  else if (/Firefox\//i.test(ua)) browser = 'Firefox';

  const urlParams = new URLSearchParams(window.location.search);
  const utm_source   = urlParams.get('utm_source') || '';
  const utm_medium   = urlParams.get('utm_medium') || '';
  const utm_campaign = urlParams.get('utm_campaign') || '';

  const startTime = Date.now();
  let maxScrollPct = 0;

  function updateScroll() {
    const h = document.documentElement;
    const b = document.body;
    const st = 'scrollTop';
    const sh = 'scrollHeight';
    const percent = Math.round(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100) || 0;
    if (percent > maxScrollPct) {
      maxScrollPct = Math.min(100, Math.max(0, percent));
    }
  }

  window.addEventListener('scroll', updateScroll, { passive: true });

  // ── 3. TRANSMISSION ENGINE ──────────────────────────────────────
  function sendPayload(isFinal) {
    const dwellSeconds = Math.round((Date.now() - startTime) / 1000);

    const payload = {
      siteOrigin: window.location.hostname,
      pagePath: window.location.pathname,
      pageTitle: document.title || 'Untitled',
      referrer: document.referrer || 'Direct',
      visitorId: vid,
      sessionId: sid,
      deviceType: deviceType,
      os: os,
      browser: browser,
      screen: window.screen.width + 'x' + window.screen.height + ' (@' + (window.devicePixelRatio || 1) + 'x)',
      viewport: window.innerWidth + 'x' + window.innerHeight,
      duration: dwellSeconds,
      scrollDepth: maxScrollPct,
      language: navigator.language || 'id-ID',
      timezone: (Intl && Intl.DateTimeFormat) ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'Asia/Makassar',
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign,
      isFinal: isFinal ? 1 : 0
    };

    const dataBlob = new Blob([JSON.stringify(payload)], { type: 'text/plain;charset=UTF-8' });

    if (navigator.sendBeacon) {
      navigator.sendBeacon(ENDPOINT, dataBlob);
    } else {
      fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain' }
      }).catch(function () {});
    }
  }

  // Initial Pageview Ping (800ms setelah load)
  setTimeout(function () {
    updateScroll();
    sendPayload(false);
  }, 800);

  // Final Unload Ping
  let sentFinal = false;
  function handleExit() {
    if (sentFinal) return;
    sentFinal = true;
    updateScroll();
    sendPayload(true);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') {
      handleExit();
    }
  });

  window.addEventListener('pagehide', handleExit);
})();
