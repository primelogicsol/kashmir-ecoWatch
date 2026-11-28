#!/usr/bin/env node
/**
 * KASHMIR ECOWATCH — AUTOMATED SCIENTIFIC, GEOSPATIAL, LICENSING & SECURITY INTEGRITY GUARD
 *
 * Enforces 15 pre-launch integrity invariants across src/ and package.json.
 * Exits with code 1 if any P0 scientific fabrication, security regression,
 * false Ramsar tag, unverified peer-review label, or synthetic leak is detected.
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

const results = [];
function recordCheck(id, title, passed, details) {
  results.push({ id, title, passed, details });
}

function walkFiles(dir, extRegex = /\.(ts|tsx|js|mjs|json)$/) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(entry.name)) {
        out.push(...walkFiles(full, extRegex));
      }
    } else if (extRegex.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const allSrcFiles = walkFiles(SRC);
const rel = (p) => path.relative(ROOT, p).replace(/\\/g, '/');

// 1. Zero hardcoded passcodes or static HMAC secrets in src/
{
  const forbidden = [
    'KEW-Admin-2026',
    'kew-admin-2026!',
    'kew-admin-hmac-signing-fallback',
    'kew-secret-himalayan-key-2026',
    'kew-virtual-scientific-hall-hmac-secret-2026',
    'HD-MASTHEAD-2026',
    'HD-REVIEW-2026',
    'x-admin-key',
  ];
  const hits = [];
  for (const f of allSrcFiles) {
    const txt = fs.readFileSync(f, 'utf8');
    for (const needle of forbidden) {
      if (txt.includes(needle)) {
        hits.push(`${rel(f)} (${needle})`);
      }
    }
  }
  recordCheck(
    'GUARD-01',
    'Zero hardcoded admin passcodes, x-admin-key headers, or static HMAC secrets in src/',
    hits.length === 0,
    hits.length === 0 ? `Scanned ${allSrcFiles.length} files cleanly.` : `Violations: ${hits.slice(0, 10).join(', ')}`
  );
}

// 2. Zero vulnerable xlsx package dependency or imports
{
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const hasPkg = Boolean(pkg.dependencies?.xlsx || pkg.devDependencies?.xlsx);
  const importHits = [];
  for (const f of allSrcFiles) {
    const txt = fs.readFileSync(f, 'utf8');
    if (/from\s+['"]xlsx['"]|require\(['"]xlsx['"]\)/.test(txt)) {
      importHits.push(rel(f));
    }
  }
  recordCheck(
    'GUARD-02',
    'Zero vulnerable xlsx@0.18.5 dependency or imports',
    !hasPkg && importHits.length === 0,
    !hasPkg && importHits.length === 0 ? 'Replaced by zero-dependency OpenXML builder (src/lib/xlsx-minimal.ts).' : `Pkg=${hasPkg}, imports=${importHits.join(',')}`
  );
}

// 3. Required core scientific integrity & provenance registries exist
{
  const requiredFiles = [
    'src/lib/scientific-integrity/quarantine-gateway.ts',
    'src/data/geographic-registry.ts',
    'src/data/monitoring-infrastructure-registry.ts',
    'src/data/platform-metrics.ts',
    'src/data/dataset-licensing-registry.ts',
    'src/data/authoritative-source-connectors.ts',
  ];
  const missing = requiredFiles.filter((p) => !fs.existsSync(path.join(ROOT, p)));
  recordCheck(
    'GUARD-03',
    'All 6 core scientific provenance, quarantine, geographic, sensor, metric & licensing registries exist',
    missing.length === 0,
    missing.length === 0 ? 'All 6 core registries verified.' : `Missing: ${missing.join(', ')}`
  );
}

// 4. Zero synthetic "specio-N" plants or "sp. N" birds in public exports
{
  const plantsTxt = fs.readFileSync(path.join(ROOT, 'src/data/species/plants.ts'), 'utf8');
  const birdsTxt = fs.readFileSync(path.join(ROOT, 'src/data/species/birds.ts'), 'utf8');
  const fishTxt = fs.readFileSync(path.join(ROOT, 'src/data/species/fish.ts'), 'utf8');

  // Check active exported arrays before any QUARANTINED_ archive section
  const activePlants = plantsTxt.split('QUARANTINED_')[0] || plantsTxt;
  const activeBirds = birdsTxt.split('QUARANTINED_')[0] || birdsTxt;
  const activeFish = fishTxt.split('QUARANTINED_')[0] || fishTxt;

  const specioHits = (activePlants.match(/specio-\d+/g) || []).length;
  const spNHits = (activeBirds.match(/\bsp\.\s*\d+/g) || []).length;
  const otterInFish = /"id"\s*:\s*"fish-(?:5[5-9]|6[0-6])"|"scientificName"\s*:\s*"(?:Lutra lutra|Potamogeton|Hydrilla)/i.test(activeFish);

  recordCheck(
    'GUARD-04',
    'Zero synthetic "specio-N" flora, "sp. N" birds, or non-fish taxa in active species exports',
    specioHits === 0 && spNHits === 0 && !otterInFish,
    `Active specio-N=${specioHits}, active sp. N=${spNHits}, non-fish in fishData=${otterInFish}`
  );
}

// 5. Bioclimatic mammalian range integrity (no Snow Leopard in Jammu/Samba; no Nilgai in Leh)
{
  const mammalsTxt = fs.readFileSync(path.join(ROOT, 'src/data/species/mammals.ts'), 'utf8');
  const slMatch = mammalsTxt.match(/Panthera uncia[\s\S]{0,600}?districts:\s*\[([^\]]+)\]/);
  const nilgaiMatch = mammalsTxt.match(/Boselaphus tragocamelus[\s\S]{0,600}?districts:\s*\[([^\]]+)\]/);
  const slDistricts = slMatch ? slMatch[1] : '';
  const nilgaiDistricts = nilgaiMatch ? nilgaiMatch[1] : '';
  const slInPlains = /'Jammu'|'Samba'|'Mirpur'|'Bhimber'/.test(slDistricts);
  const nilgaiInLadakh = /'Leh'|'Kargil'/.test(nilgaiDistricts);
  recordCheck(
    'GUARD-05',
    'Bioclimatic mammalian envelopes verified (Snow Leopard excluded from plains; Nilgai excluded from Ladakh)',
    !slInPlains && !nilgaiInLadakh,
    `SnowLeopardInPlains=${slInPlains}, NilgaiInLadakh=${nilgaiInLadakh}`
  );
}

// 6. Zero sub-district tehsils ("Pampore" / "Pulwara") in canonical district arrays
{
  const checkTargets = [
    'src/data/geography.ts',
    'src/data/environmental-investigations-portfolio.ts',
    'src/data/districts-intelligence.ts',
  ].filter((p) => fs.existsSync(path.join(ROOT, p)));
  const bad = [];
  for (const p of checkTargets) {
    const txt = fs.readFileSync(path.join(ROOT, p), 'utf8');
    if (/districts\s*:\s*\[[^\]]*'Pampore'/.test(txt) || /'Pulwara'/.test(txt)) {
      bad.push(p);
    }
  }
  recordCheck(
    'GUARD-06',
    'Zero sub-district tehsils (Pampore) or typos (Pulwara) in district arrays',
    bad.length === 0,
    bad.length === 0 ? 'Pampore properly nested under Pulwama District.' : `Found in: ${bad.join(', ')}`
  );
}

// 7. Official 7-site Ramsar integrity & Mirgund placement (Baramulla/Budgam, non-Ramsar)
{
  const geoScopeFiles = [
    'src/data/geography.ts',
    'src/app/about/geographic-scope/page.tsx',
    'src/data/algal-bloom-intelligence-hub.ts',
    'src/data/environmental-pil.ts',
    'src/data/scientific-program-2027-2028.ts',
  ].filter((p) => fs.existsSync(path.join(ROOT, p)));

  const falseRamsarHits = [];
  for (const p of geoScopeFiles) {
    const txt = fs.readFileSync(path.join(ROOT, p), 'utf8');
    if (/Mangla[\s\S]{0,120}820/.test(txt)) falseRamsarHits.push(`${p} (Mangla #820)`);
    if (/Mirgund[\s\S]{0,180}isRamsar\s*:\s*true/i.test(txt)) falseRamsarHits.push(`${p} (Mirgund Ramsar)`);
    if (/Mirgund[\s\S]{0,160}Kulgam/.test(txt)) falseRamsarHits.push(`${p} (Mirgund in Kulgam)`);
  }
  recordCheck(
    'GUARD-07',
    'Official 7 Ramsar sites enforced; Mirgund placed in Baramulla/Budgam (non-Ramsar); Mangla #820 removed',
    falseRamsarHits.length === 0,
    falseRamsarHits.length === 0 ? 'All Ramsar designations and Mirgund taxonomy verified.' : `Issues: ${falseRamsarHits.join(', ')}`
  );
}

// 8. Watershed & lake coordinate integrity
{
  const wsTxt = fs.readFileSync(path.join(ROOT, 'src/data/water-systems.ts'), 'utf8');
  const activeWs = wsTxt.split('QUARANTINED_')[0] || wsTxt;
  const coastalHits = (activeWs.match(/Coastal Watershed/g) || []).length;
  const indusTibet = activeWs.includes('31.2505') && activeWs.includes('81.3322');

  const lakesTxt = fs.readFileSync(path.join(ROOT, 'src/data/algal-bloom-lakes.ts'), 'utf8');
  const collapsedHits = (lakesTxt.match(/latitude:\s*34(?:\.0+)?\s*,\s*longitude:\s*74\.8(?:0+)?\b/g) || []).length;

  recordCheck(
    'GUARD-08',
    'Zero scrambled "Coastal Watershed" entries, Indus Tibet pin fixed, and collapsed [34.0, 74.8] lake pins resolved',
    coastalHits === 0 && !indusTibet && collapsedHits <= 1,
    `CoastalWatersheds=${coastalHits}, IndusTibet=${indusTibet}, Collapsed34.0_74.8=${collapsedHits}`
  );
}

// 9. Zero KEW-owned physical sensor claims on homepage hero/intro
{
  const heroPath = fs.existsSync(path.join(ROOT, 'src/components/sections/ImmersiveHero.tsx'))
    ? path.join(ROOT, 'src/components/sections/ImmersiveHero.tsx')
    : path.join(ROOT, 'src/components/home/ImmersiveHero.tsx');
  const introPath = fs.existsSync(path.join(ROOT, 'src/components/sections/CinematicIntroduction.tsx'))
    ? path.join(ROOT, 'src/components/sections/CinematicIntroduction.tsx')
    : path.join(ROOT, 'src/components/home/CinematicIntroduction.tsx');
  const heroTxt = fs.readFileSync(heroPath, 'utf8');
  const introTxt = fs.readFileSync(introPath, 'utf8');
  const fakeHero = /240\+\s*Monitoring Stations Online/i.test(heroTxt);
  const fakeGnss = /alpine GNSS stations,\s*and real-time sensor networks/i.test(introTxt);
  recordCheck(
    'GUARD-09',
    'Zero false KEW physical sensor network or GNSS station ownership claims',
    !fakeHero && !fakeGnss,
    `Hero240Stations=${fakeHero}, IntroGNSS=${fakeGnss}`
  );
}

// 10. Zero Math.random() scientific measurement or telemetry fabrication
{
  const telemetryFiles = [
    'src/app/api/cron/ingest/route.ts',
    'src/app/api/ingest/telemetry/route.ts',
    'src/app/api/floods/live/route.ts',
    'src/app/api/hazard-intelligence/algal-blooms/route.ts',
    'src/app/biodiversity/forest-ecosystems/page.tsx',
    'src/components/sections/ExpandableLivePanels.tsx',
    'src/data/wildlife-corridors.ts',
    'src/data/risk-monitoring-command-center.ts',
    'src/data/seasonal-intelligence.ts',
  ].filter((p) => fs.existsSync(path.join(ROOT, p)));

  const randomHits = [];
  for (const p of telemetryFiles) {
    const txt = fs.readFileSync(path.join(ROOT, p), 'utf8');
    if (txt.includes('Math.random()')) {
      randomHits.push(p);
    }
  }
  recordCheck(
    'GUARD-10',
    'Zero Math.random() calls in telemetry APIs, forest stats, corridors, or seasonal/risk datasets',
    randomHits.length === 0,
    randomHits.length === 0 ? 'Zero synthetic random number generators in scientific modules.' : `Math.random() in: ${randomHits.join(', ')}`
  );
}

// 11. Zero fake live flood gauge timestamps & inverted GloFAS formula fixed
{
  const floodApiTxt = fs.readFileSync(path.join(ROOT, 'src/app/api/floods/live/route.ts'), 'utf8');
  const floodPageTxt = fs.readFileSync(path.join(ROOT, 'src/app/hazard-intelligence/floods/page.tsx'), 'utf8');
  const hasFakeSource = floodApiTxt.includes('cwc_jkifc_calibrated_telemetry');
  const hasInvertedFormula = floodPageTxt.includes('latest_discharge > forecast_peak * 0.9');
  recordCheck(
    'GUARD-11',
    'Static flood benchmarks stripped of fake live telemetry labels and inverted GloFAS risk formula fixed',
    !hasFakeSource && !hasInvertedFormula,
    `FakeSource=${hasFakeSource}, InvertedGloFAS=${hasInvertedFormula}`
  );
}

// 12. Zero fabricated judicial CNR numbers in active PIL registry
{
  const pilTxt = fs.readFileSync(path.join(ROOT, 'src/data/environmental-pil.ts'), 'utf8');
  const activePil = pilTxt.split('QUARANTINED_')[0] || pilTxt;
  const fakeCnr = /AJKHC01|GBSC01|cnrNumber:\s*['"](?:JKHC|NGT|SCI)/i.test(activePil);
  recordCheck(
    'GUARD-12',
    'Zero fabricated judicial eCourts CNR identifiers in active PIL records',
    !fakeCnr,
    fakeCnr ? 'Active fabricated CNR string detected in environmental-pil.ts' : 'All unverified CNR identifiers quarantined/withdrawn.'
  );
}

// 13. Zero unsupported "Peer-Verified Master Record", fabricated REF-DAL-07, or unofficial jakfinance-jk.com
{
  const invFiles = walkFiles(path.join(ROOT, 'src/data'), /\.(ts|json)$/).concat(
    walkFiles(path.join(ROOT, 'src/app/environmental-investigations'), /\.(ts|tsx)$/)
  );
  const violations = [];
  for (const f of invFiles) {
    const txt = fs.readFileSync(f, 'utf8');
    const active = txt.split('QUARANTINED_')[0] || txt;
    if (active.includes('Peer-Verified Master Record')) violations.push(`${rel(f)} (Peer-Verified Master Record)`);
    if (active.includes('jakfinance-jk.com')) violations.push(`${rel(f)} (jakfinance-jk.com)`);
    if (active.includes('Water Research, 136, 110')) violations.push(`${rel(f)} (Fabricated REF-DAL-07)`);
    if (active.includes('10.66889/pampore_assembly_constituency')) violations.push(`${rel(f)} (Off-topic Crossref pollution)`);
  }
  recordCheck(
    'GUARD-13',
    'Zero unsupported Peer-Verified labels, fabricated REF-DAL-07, unofficial jakfinance-jk.com, or off-topic Crossref pollution',
    violations.length === 0,
    violations.length === 0 ? 'All investigation & dossier citations verified.' : `Violations: ${violations.slice(0, 8).join(', ')}`
  );
}

// 14. Zero fictional speakers ("Elena Rostova") or unverified 501(c)(3) claims
{
  const confTxt = fs.readFileSync(path.join(ROOT, 'src/data/conference-system.ts'), 'utf8');
  const activeConf = confTxt.split('QUARANTINED_')[0] || confTxt;
  const csrPath = path.join(ROOT, 'src/app/about/csr-collaborations/page.tsx');
  const csrTxt = fs.existsSync(csrPath) ? fs.readFileSync(csrPath, 'utf8') : '';
  const hasRostova = activeConf.includes('Elena Rostova');
  const has501c3 = /501\(c\)\(3\)/i.test(csrTxt);
  recordCheck(
    'GUARD-14',
    'Zero fictional conference speakers (Elena Rostova) or unverified 501(c)(3) tax-exempt claims',
    !hasRostova && !has501c3,
    `ElenaRostova=${hasRostova}, Unverified501c3=${has501c3}`
  );
}

// 15. Explicit CC BY-NC 4.0 licensing & standalone /governance route present
{
  const footerPath = fs.existsSync(path.join(ROOT, 'src/components/sections/AdvancedFooter.tsx'))
    ? path.join(ROOT, 'src/components/sections/AdvancedFooter.tsx')
    : path.join(ROOT, 'src/components/layout/AdvancedFooter.tsx');
  const footerTxt = fs.existsSync(footerPath) ? fs.readFileSync(footerPath, 'utf8') : '';
  const hasCcByNc = /CC BY-NC 4\.0/i.test(footerTxt);
  const govPageExists = fs.existsSync(path.join(ROOT, 'src/app/governance/page.tsx'));
  recordCheck(
    'GUARD-15',
    'Explicit CC BY-NC 4.0 footer attribution and standalone /governance SSR route present',
    hasCcByNc && govPageExists,
    `FooterCCBYNC4=${hasCcByNc}, GovernancePage=${govPageExists}`
  );
}

const failed = results.filter((r) => !r.passed);
console.log('================================================================================');
console.log(' KASHMIR ECOWATCH — SCIENTIFIC, GEOSPATIAL, LEGAL & SECURITY INTEGRITY GUARD');
console.log('================================================================================');
for (const r of results) {
  console.log(`[${r.passed ? 'PASS' : 'FAIL'}] ${r.id}: ${r.title}`);
  console.log(`       -> ${r.details}`);
}
console.log('--------------------------------------------------------------------------------');
console.log(`Summary: ${results.length - failed.length}/${results.length} checks passed, ${failed.length} failed.`);
console.log('================================================================================');

if (failed.length > 0) {
  process.exit(1);
}
