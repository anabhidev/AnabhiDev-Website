#!/usr/bin/env node
// ================================================================
// AnabhiDev-DELLAWEB — Della Spa Production Website
// Node.js (tanpa dependency eksternal)
// Development · Anabhi Dev
// Version   : 1.0
// Generated : 23 August 2026, 12:00:00
// ----------------------------------------------------------------
// Titik kontrol TUNGGAL untuk 2 hal yang tersebar di banyak file
// HTML statis (vanilla, tanpa templating engine):
//   1. Domain situs (canonical, og:url, JSON-LD @id, sitemap, dst)
//   2. URL logo (masih di-hosting sementara di anabhidev.com/projects/
//      Della-Spa/assets/ — pindah ke domain sendiri setelah asset
//      final di-upload ke hosting Della)
//
// KENAPA SCRIPT, BUKAN FUNGSI JS RUNTIME DI BROWSER:
// Kalau logo diganti lewat JavaScript saat halaman sudah render,
// browser sempat menampilkan URL LAMA dulu baru "melompat" ke URL
// baru begitu JS jalan — flicker yang terlihat pengunjung, dan
// berisiko CLS. Cara paling aman untuk situs statis adalah
// find-replace terkontrol di source HTML SEBELUM di-deploy,
// persis pola tools/sync-nav.mjs di folder ini.
//
// Cara pakai:
//   node tools/migrate-domain.mjs --check              (lihat dulu apa yang akan berubah, TANPA menulis)
//   node tools/migrate-domain.mjs --domain=example.com (ganti domain saja)
//   node tools/migrate-domain.mjs --logo=https://example.com/assets  (ganti prefix folder logo saja)
//   node tools/migrate-domain.mjs --domain=example.com --logo=https://example.com/assets  (ganti dua-duanya)
//
// Jalankan dari root project (folder yang berisi index.html).
// SELALU jalankan --check dulu sebelum menjalankan tanpa flag itu.
// ================================================================

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// ----------------------------------------------------------------
// NILAI SAAT INI — SATU-SATUNYA tempat string lama didefinisikan.
// Kalau domain/logo berubah lagi di masa depan (migrasi ke-2, dst),
// update dua baris ini dulu supaya script tetap tahu apa yang
// harus dicari, baru jalankan lagi.
// ----------------------------------------------------------------
const CURRENT_DOMAIN = 'www.dellaspamelasti.com';
const CURRENT_LOGO_PREFIX = 'https://anabhidev.com/projects/Della-Spa/assets';

// File yang ikut di-scan. hero-preview.html sengaja diikutkan
// (masih berisi URL logo) walau bukan halaman production —
// supaya tidak ada referensi lama tersisa di mana pun.
const TARGET_EXTENSIONS = ['.html', '.xml', '.txt', '.webmanifest'];

function parseArgs() {
  const args = process.argv.slice(2);
  const checkOnly = args.includes('--check');
  const domainArg = args.find((a) => a.startsWith('--domain='));
  const logoArg = args.find((a) => a.startsWith('--logo='));

  return {
    checkOnly,
    newDomain: domainArg ? domainArg.split('=')[1] : null,
    newLogoPrefix: logoArg ? logoArg.split('=').slice(1).join('=') : null
  };
}

function listTargetFiles() {
  return readdirSync(ROOT).filter((f) =>
    TARGET_EXTENSIONS.some((ext) => f.endsWith(ext))
  );
}

function countOccurrences(content, needle) {
  if (!needle) return 0;
  return content.split(needle).length - 1;
}

function main() {
  const { checkOnly, newDomain, newLogoPrefix } = parseArgs();

  if (!newDomain && !newLogoPrefix) {
    console.log('Tidak ada perubahan diminta. Pakai salah satu atau kedua flag ini:');
    console.log('  --domain=domain-baru.com');
    console.log('  --logo=https://domain-baru.com/assets');
    console.log('');
    console.log('Contoh cek dulu (aman, tidak menulis apa pun):');
    console.log('  node tools/migrate-domain.mjs --check --domain=dellaspamelasti.com --logo=https://dellaspamelasti.com/assets');
    return;
  }

  if (newDomain && newDomain.startsWith('http')) {
    console.log('⚠️  --domain jangan pakai "https://" di depan — cukup nama domain saja.');
    console.log('   Contoh benar : --domain=dellaspamelasti.com');
    console.log('   Contoh salah : --domain=https://dellaspamelasti.com');
    process.exitCode = 1;
    return;
  }

  const files = listTargetFiles();
  let totalDomainReplaced = 0;
  let totalLogoReplaced = 0;
  let filesChanged = 0;

  console.log(checkOnly ? '=== MODE CEK — tidak ada file yang ditulis ===\n' : '=== MENULIS PERUBAHAN ===\n');

  for (const file of files) {
    const path = join(ROOT, file);
    const original = readFileSync(path, 'utf-8');
    let content = original;

    const domainCount = newDomain ? countOccurrences(content, CURRENT_DOMAIN) : 0;
    const logoCount = newLogoPrefix ? countOccurrences(content, CURRENT_LOGO_PREFIX) : 0;

    if (domainCount === 0 && logoCount === 0) continue;

    if (newDomain && domainCount > 0) {
      content = content.split(CURRENT_DOMAIN).join(newDomain);
    }
    if (newLogoPrefix && logoCount > 0) {
      content = content.split(CURRENT_LOGO_PREFIX).join(newLogoPrefix);
    }

    const parts = [];
    if (domainCount > 0) parts.push(`domain ${domainCount}x`);
    if (logoCount > 0) parts.push(`logo ${logoCount}x`);
    console.log(`  ${file}  →  ${parts.join(', ')}`);

    totalDomainReplaced += domainCount;
    totalLogoReplaced += logoCount;

    if (!checkOnly) {
      writeFileSync(path, content, 'utf-8');
    }
    filesChanged++;
  }

  console.log('');
  console.log(`${filesChanged} file ${checkOnly ? 'akan berubah' : 'diubah'}.`);
  if (newDomain) console.log(`Domain: ${totalDomainReplaced}x kemunculan "${CURRENT_DOMAIN}" → "${newDomain}"`);
  if (newLogoPrefix) console.log(`Logo  : ${totalLogoReplaced}x kemunculan "${CURRENT_LOGO_PREFIX}" → "${newLogoPrefix}"`);

  if (checkOnly) {
    console.log('');
    console.log('Ini baru PRATINJAU. Jalankan ulang tanpa --check untuk benar-benar menulis file.');
  } else {
    console.log('');
    console.log('⚠️  JANGAN LUPA: update juga CURRENT_DOMAIN dan/atau CURRENT_LOGO_PREFIX');
    console.log('   di bagian atas file ini (tools/migrate-domain.mjs), supaya kalau nanti');
    console.log('   perlu migrasi lagi, script ini masih tahu apa yang harus dicari.');
  }
}

main();
