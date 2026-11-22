const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT_DIR, 'src', 'app');
const DATA_DIR = path.join(ROOT_DIR, 'src', 'data');

console.log('=== KASHMIR ECOWATCH (KEW) PLATFORM-WIDE COMPREHENSIVE AUDIT ===');
console.log('Audit Date: November 22, 2026');
console.log('Platform Root:', ROOT_DIR);

function discoverRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;

      const subDir = path.join(dir, entry.name);
      const subRoute = baseRoute ? `${baseRoute}/${entry.name}` : `/${entry.name}`;

      const pageFile = path.join(subDir, 'page.tsx');
      const pageJsFile = path.join(subDir, 'page.jsx');
      const pageTsFile = path.join(subDir, 'page.js');

      if (fs.existsSync(pageFile) || fs.existsSync(pageJsFile) || fs.existsSync(pageTsFile)) {
        routes.push({
          route: subRoute,
          filePath: fs.existsSync(pageFile) ? pageFile : (fs.existsSync(pageJsFile) ? pageJsFile : pageTsFile),
          isDynamic: subRoute.includes('[')
        });
      }

      routes = routes.concat(discoverRoutes(subDir, subRoute));
    }
  }
  return routes;
}

const rootPage = path.join(APP_DIR, 'page.tsx');
let allDiscoveredRoutes = [];
if (fs.existsSync(rootPage)) {
  allDiscoveredRoutes.push({ route: '/', filePath: rootPage, isDynamic: false });
}
allDiscoveredRoutes = allDiscoveredRoutes.concat(discoverRoutes(APP_DIR));
console.log(`Discovered ${allDiscoveredRoutes.length} page routes in src/app.`);

function discoverApiRoutes(dir, baseRoute = '/api') {
  let apis = [];
  if (!fs.existsSync(dir)) return apis;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
      const subDir = path.join(dir, entry.name);
      const subRoute = `${baseRoute}/${entry.name}`;
      const routeFile = path.join(subDir, 'route.ts');
      const routeJsFile = path.join(subDir, 'route.js');
      if (fs.existsSync(routeFile) || fs.existsSync(routeJsFile)) {
        apis.push({
          endpoint: subRoute,
          filePath: fs.existsSync(routeFile) ? routeFile : routeJsFile,
          isDynamic: subRoute.includes('[')
        });
      }
      apis = apis.concat(discoverApiRoutes(subDir, subRoute));
    }
  }
  return apis;
}
const allApiRoutes = discoverApiRoutes(path.join(APP_DIR, 'api'));
console.log(`Discovered ${allApiRoutes.length} API routes in src/app/api.`);

const dataFiles = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.json'));
console.log(`Discovered ${dataFiles.length} data files in src/data.`);

const routeSet = new Set(allDiscoveredRoutes.map(r => r.route));
function isValidRoute(urlPath) {
  const cleanPath = urlPath.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  if (routeSet.has(cleanPath)) return true;

  for (const r of allDiscoveredRoutes) {
    if (r.isDynamic) {
      const patternStr = r.route
        .replace(/\[\.\.\.[^\]]+\]/g, '.*')
        .replace(/\[[^\]]+\]/g, '[^/]+');
      const reg = new RegExp(`^${patternStr}$`);
      if (reg.test(cleanPath)) return true;
    }
  }
  return false;
}

const internalLinkRegex = /["'](\/[a-zA-Z0-9_\-\/]+(?:\?[a-zA-Z0-9_=&%\-]*)?(?:#[a-zA-Z0-9_\-]*)?)["']/g;
const brokenLinks = [];
const verifiedLinks = [];

for (const df of dataFiles) {
  const content = fs.readFileSync(path.join(DATA_DIR, df), 'utf-8');
  let match;
  while ((match = internalLinkRegex.exec(content)) !== null) {
    const rawUrl = match[1];
    if (rawUrl.startsWith('/api/') || rawUrl.startsWith('/images/') || rawUrl.startsWith('/icons/') || rawUrl.startsWith('/fonts/') || rawUrl.startsWith('/audio/') || rawUrl.startsWith('/_next/')) {
      continue;
    }
    if (rawUrl === '/' || rawUrl.length < 2) continue;

    const cleanPath = rawUrl.split('?')[0].split('#')[0];
    if (!isValidRoute(cleanPath)) {
      brokenLinks.push({ sourceFile: `src/data/${df}`, rawUrl, cleanPath });
    } else {
      verifiedLinks.push(rawUrl);
    }
  }
}

console.log(`Audited internal references in data files: ${verifiedLinks.length} valid links, ${brokenLinks.length} broken/mismatched links.`);

const personAppearances = {};
function scanPersonFile(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf-8');
  const nameMatches = [];
  const nameRegex = /name:\s*['"`]([^'"`]+)['"`]/g;
  let m;
  while ((m = nameRegex.exec(content)) !== null) {
    nameMatches.push({ file: fileName, name: m[1].trim() });
  }
  return nameMatches;
}

const dataPersonFiles = [
  'kew-green-heroes.ts',
  'kew-environmental-scientists.ts',
  'kew-environmental-advocates.ts',
  'kew-religious-leaders.ts',
  'kew-creative-artists.ts',
  'kew-politicians-officials.ts',
  'kew-ngos-community.ts',
  'kew-green-martyrs.ts',
  'kew-environmental-journalists.ts'
];

let totalPersonsFound = 0;
for (const f of dataPersonFiles) {
  const persons = scanPersonFile(f);
  totalPersonsFound += persons.length;
  for (const p of persons) {
    const norm = p.name.toLowerCase().replace(/^(dr\.|prof\.|adv\.|sheikh|saint|master|chaudhary|engr\.)\s+/i, '').trim();
    if (!personAppearances[norm]) personAppearances[norm] = [];
    personAppearances[norm].push({ file: p.file, rawName: p.name });
  }
}

const nameVariations = Object.entries(personAppearances)
  .filter(([, apps]) => apps.length > 1)
  .map(([canonicalKey, occurrences]) => ({ canonicalKey, occurrences }));

console.log(`Total Person entries scanned: ${totalPersonsFound}.`);
console.log(`Cross-module multi-entry entities detected: ${nameVariations.length}.`);

const artifactsDir = path.join(ROOT_DIR, 'artifacts');
if (!fs.existsSync(artifactsDir)) {
  fs.mkdirSync(artifactsDir, { recursive: true });
}
const reportPath = path.join(artifactsDir, 'platform-audit-report.json');
fs.writeFileSync(reportPath, JSON.stringify({
  auditTimestamp: new Date().toISOString(),
  auditReferenceDate: 'November 22, 2026',
  discoveredRoutesCount: allDiscoveredRoutes.length,
  discoveredApiRoutesCount: allApiRoutes.length,
  discoveredDataFilesCount: dataFiles.length,
  totalEntitiesAudited: totalPersonsFound,
  brokenLinks,
  crossModuleEntities: nameVariations,
  summary: {
    totalRoutesAudited: allDiscoveredRoutes.length,
    brokenInternalLinksCount: brokenLinks.length,
    crossModuleMultiRegistryEntitiesCount: nameVariations.length
  }
}, null, 2));
console.log('Audit results saved to:', reportPath);
if (brokenLinks.length > 0) {
  process.exitCode = 1;
}
