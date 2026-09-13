const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const moduleFiles = [
  'js/state.js',
  'js/store.js',
  'js/data/i18n.js',
  'js/data/subjects.js',
  'js/data/math-data.js',
  'js/data/geo-data.js',
  'js/data/bahasa-indonesia.js',
  'js/data/bahasa-inggris.js',
  'js/data/pancasila.js',
  'js/data/bahasa-bali.js',
  'js/data/seni-rupa.js',
  'js/data/pjok.js',
  'js/data/agama.js',
  'js/data/kokurikuler.js',
  'js/data/globe-paths.js',
  'js/data/map-vector-data.js',
  'js/engine/math-engine.js',
  'js/engine/geo-engine.js',
  'js/engine/tts-engine.js',
  'js/engine/audio-fx.js',
  'js/components/lks-modal.js',
  'js/components/ai-modal.js',
  'js/components/topbar.js',
  'js/components/sidebar.js',
  'js/components/video-modal.js',
  'js/components/quiz-runner.js',
  'js/components/lesson-view.js',
  'js/components/subject-view.js',
  'js/components/challenge-view.js',
  'js/components/progress-view.js',
  'js/app.js'
];

let bundleContent = `// ================================================================
// AnabhiDev-SMARTSTUDY — AnabhiDev Smart Study Web Interactive
// Standalone Bundle (Compatible with file:/// and http/https)
// Development · Anabhi Dev
// Version   : 2.9 (Math Visual 14 Methods & 800+ Questions)
// Generated : 13 September 2026
// ================================================================

(function () {
  'use strict';

`;

for (const relPath of moduleFiles) {
  const fullPath = path.join(rootDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${relPath}`);
    process.exit(1);
  }

  let code = fs.readFileSync(fullPath, 'utf8');

  // Strip multi-line and single-line import statements
  code = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');

  // Strip named exports: export { ... };
  code = code.replace(/export\s*\{[\s\S]*?\};?/g, '');

  // Replace inline exports
  code = code.replace(/export\s+default\s+/g, '');
  code = code.replace(/export\s+(const|let|var|class|function|async function)\s+/g, '$1 ');

  bundleContent += `\n  // --- Source: ${relPath} ---\n`;
  bundleContent += code.split('\n').map(line => '  ' + line).join('\n');
  bundleContent += '\n';
}

bundleContent += `
  // Bootstrap saat DOM siap
  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', () => {
      new App();
    });
  } else {
    new App();
  }

})();
`;

const outputPath = path.join(rootDir, 'js/bundle.js');
fs.writeFileSync(outputPath, bundleContent, 'utf8');
console.log(`Successfully built standalone bundle: ${outputPath} (${(bundleContent.length / 1024).toFixed(1)} KB)`);

