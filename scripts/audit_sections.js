const fs = require('fs');
const path = require('path');

const sectionFiles = [
  'src/components/sections/ImmersiveHero.tsx',
  'src/components/sections/AsymmetricModuleSurface.tsx',
  'src/components/sections/EarthHumanImpactSection.tsx',
  'src/components/sections/SectoralEiaSection.tsx',
  'src/components/sections/MapIntelligenceCore.tsx',
  'src/components/sections/ExpandableLivePanels.tsx',
  'src/components/sections/OnboardingStrip.tsx',
  'src/components/sections/DistrictIntelligenceStrip.tsx',
  'src/components/sections/FeaturedEntityStrip.tsx',
  'src/components/sections/PublicParticipationIntelligence.tsx',
  'src/components/sections/EducationStewardshipActionSection.tsx',
  'src/components/sections/NextGenDashboardPreview.tsx',
  'src/components/sections/AlertResponseSystem.tsx',
  'src/components/sections/PremiumStickyHeader.tsx',
  'src/components/sections/AdvancedFooter.tsx',
];

console.log('=== HOMEPAGE SECTIONS MOBILE AUDIT ===');
sectionFiles.forEach(sf => {
  if (!fs.existsSync(sf)) {
    console.log('Missing file:', sf);
    return;
  }
  const content = fs.readFileSync(sf, 'utf8');
  const fixed = [...content.matchAll(/(?:min-w|w)-\[(\d+)px\]/g)]
    .map(m => ({ match: m[0], val: parseInt(m[1], 10) }))
    .filter(m => m.val > 300);
  
  const tables = (content.match(/<table/g) || []).length;
  const overflowTables = (content.match(/overflow-x-auto/g) || []).length;
  
  const hasNowrapWithoutTruncate = [...content.matchAll(/whitespace-nowrap(?!.*?truncate)/g)].length;

  console.log(`\nFile: ${path.basename(sf)}`);
  console.log(`  Lines: ${content.split('\n').length}`);
  if (fixed.length > 0) console.log(`  Fixed widths > 300px:`, fixed);
  if (tables > 0) console.log(`  Tables: ${tables}, Overflow wrappers: ${overflowTables}`);
});
