const fs = require('fs');
const path = require('path');

const updates = [
  {
    file: 'src/app/seasonal-ecology/seasonal-landscapes/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Seasonal Landscapes &amp; Biome Dynamics"',
  },
  {
    file: 'src/app/seasonal-ecology/bloom-mapping/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Bloom Mapping &amp; Floral Landscapes"',
  },
  {
    file: 'src/app/seasonal-ecology/migration-windows/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Migration Windows &amp; Avian Flyways"',
  },
  {
    file: 'src/app/seasonal-ecology/pollinator-windows/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Pollinator Windows &amp; Activity Timing"',
  },
  {
    file: 'src/app/seasonal-ecology/phenology-records/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Flowering &amp; Phenology Records"',
  },
  {
    file: 'src/app/seasonal-ecology/habitat-signals/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Seasonal Habitat Signals &amp; Transitions"',
  },
  {
    file: 'src/app/seasonal-ecology/water-transitions/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Water &amp; Wetland Transitions"',
  },
  {
    file: 'src/app/seasonal-ecology/species-activity/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Seasonal Species Activity &amp; Ethology"',
  },
  {
    file: 'src/app/seasonal-ecology/climate-windows/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Climate &amp; Visibility Windows"',
  },
  {
    file: 'src/app/seasonal-ecology/reports-references/page.tsx',
    oldTitle: /title="[^"]+"/,
    newTitle: 'title="Seasonal Reports &amp; Research References"',
  },
];

updates.forEach(({ file, oldTitle, newTitle }) => {
  const p = path.join(__dirname, '..', file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(oldTitle, newTitle);
    // Replace outer <main ...> with <div ...> if present
    content = content.replace(/<main className="min-h-screen[^"]*">/, '<div className="min-h-screen mx-auto bg-slate-950">');
    content = content.replace(/<\/main>\s*;\s*}\s*$/, '</div>\n  );\n}\n');
    fs.writeFileSync(p, content, 'utf8');
    console.log(`✅ Patched ${file}`);
  }
});
