const fs = require('fs');

const pages = [
  'src/app/water-systems/page.tsx',
  'src/app/water-systems/dashboards/page.tsx',
  'src/app/water-systems/lakes/page.tsx',
  'src/app/water-systems/wetlands/page.tsx',
  'src/app/water-systems/rivers/page.tsx',
  'src/app/water-systems/springs/page.tsx',
  'src/app/water-systems/watersheds/page.tsx',
  'src/app/water-systems/glaciers/page.tsx',
  'src/app/water-systems/drinking-water-sources/page.tsx',
  'src/app/water-systems/water-quality/page.tsx',
  'src/app/water-systems/algal-bloom-intelligence/page.tsx',
  'src/app/water-systems/fisheries/page.tsx',
  'src/app/water-systems/restoration/page.tsx',
  'src/app/water-systems/flood-risk/page.tsx'
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');

  // Deduplicate Button import
  const buttonMatches = c.match(/import \{ Button \}.*?;/g);
  if (buttonMatches && buttonMatches.length > 1) {
     let first = true;
     c = c.replace(/import \{ Button \}.*?;\n?/g, (match) => {
        if (first) {
           first = false;
           return match;
        }
        return '';
     });
     fs.writeFileSync(p, c, 'utf8');
     console.log('Fixed duplicate Button in', p);
  }
}
