// StatMalaysia hand-in (Node 22, standard library only).
// Copies the site (app/) and its screenshots (screenshots/) from this
// repository into the output directory and writes output/dossier.json,
// the summary the judge reads, built with the vendored make.fun library.
// The grader runs this program twice and requires identical bytes both
// times, so it does no timestamps, no randomness and no network calls.
//
// Local check:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

// Where the repository root is, and where the output goes.
const repoRoot = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Start from a clean output directory so a stale file can never leak in.
rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

// The site itself: plain static files, no build step.
cpSync(join(repoRoot, 'app'), join(outputDir, 'app'), { recursive: true });

// The screenshots, if the repository has any.
const shotsDir = join(repoRoot, 'screenshots');
if (existsSync(shotsDir)) {
  cpSync(shotsDir, join(outputDir, 'screenshots'), { recursive: true });
}

// The dossier must be byte for byte what the library writes from app/ and
// screenshots/; the gate rebuilds it with its own copy and compares.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);

// A short human-readable summary of what was handed in.
const appFiles = existsSync(join(outputDir, 'app')) ? 'app/' : '(missing app/)';
console.log(`handed in ${appFiles} + screenshots/ -> ${outputDir} (dossier.json ${dossier.length} bytes)`);
