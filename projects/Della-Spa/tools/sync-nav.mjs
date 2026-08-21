#!/usr/bin/env node
// ================================================================
// AnabhiDev-DELLAWEB — Della Spa Production Website
// Node.js (tanpa dependency eksternal)
// Development · Anabhi Dev
// Version   : 1.5
// Generated : 21 August 2026, 02:14:07
// ----------------------------------------------------------------
// Menyinkronkan partials/nav.html ke semua file .html di root
// project, di antara penanda:
//   <!-- NAV:START --> ... <!-- NAV:END -->
//
// Cara pakai:
//   node tools/sync-nav.mjs
//   node tools/sync-nav.mjs --check    (cek saja, tanpa menulis)
//
// Jalankan dari root project (folder yang berisi index.html).
// ================================================================

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CHECK_ONLY = process.argv.includes('--check');

const MARK_START = '<!-- NAV:START -->';
const MARK_END   = '<!-- NAV:END -->';
const PARTIAL_START = '<!-- NAV-DESKTOP:START -->';
const PARTIAL_END   = '<!-- NAV-DRAWER:END -->';

function readPartial() {
  const path = join(ROOT, 'partials', 'nav.html');
  const raw = readFileSync(path, 'utf-8');

  const s = raw.indexOf(PARTIAL_START);
  const e = raw.indexOf(PARTIAL_END);
  if (s === -1 || e === -1) {
    throw new Error(`partials/nav.html tidak punya penanda ${PARTIAL_START} / ${PARTIAL_END}`);
  }

  // Ambil <nav>...</nav> desktop dan drawer secara terpisah,
  // karena tiap halaman punya DUA slot NAV:START/END berbeda
  // (satu di <header>, satu di <aside class="drawer">).
  const desktopMatch = raw.match(/<!-- NAV-DESKTOP:START -->([\s\S]*?)<!-- NAV-DESKTOP:END -->/);
  const drawerMatch  = raw.match(/<!-- NAV-DRAWER:START -->([\s\S]*?)<!-- NAV-DRAWER:END -->/);

  if (!desktopMatch || !drawerMatch) {
    throw new Error('Blok NAV-DESKTOP atau NAV-DRAWER tidak ditemukan di partials/nav.html');
  }

  return {
    desktop: desktopMatch[1].trim(),
    drawer: drawerMatch[1].trim()
  };
}

function listHtmlFiles() {
  return readdirSync(ROOT)
    .filter((f) => f.endsWith('.html'))
    .filter((f) => f !== 'font-lab.html');   // internal, bukan halaman production
}

function injectBoth(content, desktopNav, drawerNav) {
  const parts = content.split(MARK_START);
  if (parts.length < 3) {
    // 0 atau 1 kemunculan MARK_START berarti file ini belum
    // punya slot ganda (header + drawer) — dilewati, bukan error,
    // supaya file lama yang belum di-refactor tidak merusak proses.
    return { content, count: parts.length - 1 };
  }

  let out = parts[0];
  const navs = [desktopNav, drawerNav];
  let count = 0;

  for (let i = 1; i < parts.length; i++) {
    const seg = parts[i];
    const endIdx = seg.indexOf(MARK_END);
    if (endIdx === -1) {
      out += MARK_START + seg;
      continue;
    }
    const after = seg.slice(endIdx + MARK_END.length);
    const nav = navs[count] ?? navs[navs.length - 1];
    out += MARK_START + '\n' + nav + '\n' + MARK_END + after;
    count++;
  }

  return { content: out, count };
}

function main() {
  const { desktop, drawer } = readPartial();
  const files = listHtmlFiles();

  if (!files.length) {
    console.log('Tidak ada file .html di root project. Tidak ada yang disinkronkan.');
    return;
  }

  let changed = 0;
  let skipped = 0;

  for (const file of files) {
    const path = join(ROOT, file);
    const original = readFileSync(path, 'utf-8');
    const { content, count } = injectBoth(original, desktop, drawer);

    if (count === 0) {
      console.log(`  (dilewati, tidak ada penanda NAV) ${file}`);
      skipped++;
      continue;
    }

    if (content === original) {
      console.log(`  sudah sinkron            ${file}`);
      continue;
    }

    if (CHECK_ONLY) {
      console.log(`  BERBEDA — perlu sync     ${file}`);
    } else {
      writeFileSync(path, content, 'utf-8');
      console.log(`  disinkronkan (${count}x)          ${file}`);
    }
    changed++;
  }

  console.log('');
  console.log(CHECK_ONLY
    ? `Cek selesai. ${changed} file perlu sync, ${skipped} dilewati.`
    : `Selesai. ${changed} file disinkronkan, ${skipped} dilewati.`);

  if (CHECK_ONLY && changed > 0) process.exitCode = 1;   // untuk CI/pra-commit
}

main();
