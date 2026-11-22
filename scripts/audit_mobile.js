const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(fullPath));
      } else {
        results.push(fullPath);
      }
    });
  } catch (e) {}
  return results;
}

const allFiles = walk('src');
const tsxFiles = allFiles.filter(f => f.endsWith('.tsx') || f.endsWith('.jsx'));

console.log('=== KASHMIR ECOWATCH COMPREHENSIVE RESPONSIVE AUDIT ===');
console.log('Total TSX/JSX source files:', tsxFiles.length);

// 1. Route Inventory
const appRoutes = [];
tsxFiles.forEach(f => {
  if (f.endsWith('page.tsx')) {
    const rel = path.relative(path.join('src', 'app'), f);
    let route = '/' + rel.replace(/[\\/]page\.tsx$/, '').replace(/\\/g, '/');
    if (route === '/.') route = '/';
    appRoutes.push(route);
  }
});
console.log('Total Routes in App:', appRoutes.length);

// Categorize routes
const categories = {
  homepage: appRoutes.filter(r => r === '/'),
  about: appRoutes.filter(r => r.startsWith('/about')),
  biodiversity: appRoutes.filter(r => r.startsWith('/biodiversity')),
  protectedAreas: appRoutes.filter(r => r.startsWith('/protected')),
  waterSystems: appRoutes.filter(r => r.startsWith('/water')),
  hazardIntelligence: appRoutes.filter(r => r.startsWith('/hazard')),
  environmentalMonitoring: appRoutes.filter(r => r.startsWith('/environmental-monitoring')),
  earthHumanImpact: appRoutes.filter(r => r.startsWith('/earth-human-impact')),
  sectoralEia: appRoutes.filter(r => r.startsWith('/sectoral-eia')),
  seasonalEcology: appRoutes.filter(r => r.startsWith('/seasonal-ecology')),
  districts: appRoutes.filter(r => r.startsWith('/districts')),
  dashboards: appRoutes.filter(r => r.includes('dashboard')),
  atlasGIS: appRoutes.filter(r => r.includes('atlas') || r.includes('map')),
  citizenScienceParticipation: appRoutes.filter(r => r.includes('citizen') || r.includes('contribute') || r.includes('submit') || r.includes('report') || r.includes('volunteer')),
  webinarsConferences: appRoutes.filter(r => r.startsWith('/webinars')),
  adminAuth: appRoutes.filter(r => r.startsWith('/admin') || r.startsWith('/auth')),
  other: [],
};

const categorizedRoutes = new Set(Object.values(categories).flat());
categories.other = appRoutes.filter(r => !categorizedRoutes.has(r));

console.log('\n--- Route Distribution ---');
for (const [cat, routes] of Object.entries(categories)) {
  console.log(`- ${cat}: ${routes.length} routes`);
}

// 2. Fixed width elements > 320px (Risk of horizontal overflow on 320px - 390px viewports)
const fixedWidths = [];
tsxFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.matchAll(/(?:w|min-w|max-w)-\[(\d+)px\]/g);
  for (const m of matches) {
    const val = parseInt(m[1], 10);
    if (val > 320 && (m[0].startsWith('w-') || m[0].startsWith('min-w-'))) {
      fixedWidths.push({ file: path.relative('src', f), match: m[0], val });
    }
  }
});
console.log('\n--- Fixed Widths > 320px ---');
console.log('Total occurrences:', fixedWidths.length);
console.log('Top occurrences:', fixedWidths.slice(0, 15));

// 3. Tables missing overflow-x containers
const tableIssues = [];
tsxFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  if (content.includes('<table') && !content.includes('overflow-x-auto') && !content.includes('overflow-x-scroll')) {
    tableIssues.push(path.relative('src', f));
  }
});
console.log('\n--- Tables without explicit overflow-x wrapper ---');
console.log('Total files with <table> lacking overflow-x container:', tableIssues.length);
console.log('Sample files:', tableIssues.slice(0, 10));

// 4. Inspect CSS and Viewport configuration
const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
console.log('\n--- Viewport Meta in layout.tsx ---');
const vpMatch = layoutContent.match(/export const viewport[\s\S]*?};/);
console.log(vpMatch ? vpMatch[0] : 'No viewport export found');

const globalsCss = fs.readFileSync('src/app/globals.css', 'utf8');
console.log('\n--- Globals CSS Responsive Guardrails ---');
console.log('Has html/body overflow-x guard:', globalsCss.includes('overflow-x: hidden') || globalsCss.includes('overflow-x: clip'));
console.log('Has mobile tap-target styling:', globalsCss.includes('touch-action') || globalsCss.includes('tap-highlight'));

// 5. Header / Navigation evaluation
const headerContent = fs.readFileSync('src/components/sections/PremiumStickyHeader.tsx', 'utf8');
console.log('\n--- Mobile Header & Navigation Analysis ---');
console.log('Mobile menu breakpoint:', headerContent.includes('hidden lg:flex') ? 'Desktop hides at lg (1024px)' : 'Other');
console.log('Has quick action bar for mobile GIS / Alerts / Search:', headerContent.includes('Launch Interactive Atlas'));
