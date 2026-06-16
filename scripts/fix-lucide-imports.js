const fs = require('fs');

const files = [
  'wildlife-sightings',
  'birding-hotspots',
  'migration-windows',
  'pollinator-activity',
  'phenology-flowering',
  'habitat-signals',
  'seasonal-activity',
  'district-profiles'
];

files.forEach(f => {
  const path = 'src/app/biodiversity/' + f + '/page.tsx';
  let code = fs.readFileSync(path, 'utf8');

  // Extract the lucide-react import statement
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*(?:'|")lucide-react(?:'|");/;
  const match = code.match(importRegex);
  if (!match) return;

  const existingImportsStr = match[1];
  const existingImports = existingImportsStr.split(',').map(s => s.trim()).filter(Boolean);

  // Extract all icons used in the KPI array
  // The array looks like: { label: '...', value: ..., icon: IconName, color: '...' }
  const kpiArrayRegex = /\{\s*\[([\s\S]*?)\]\.map/;
  const kpiArrayMatch = code.match(kpiArrayRegex);
  
  if (kpiArrayMatch) {
    const kpiBlock = kpiArrayMatch[1];
    const iconRegex = /icon:\s*([A-Z][a-zA-Z0-9]*)/g;
    let iconMatch;
    const requiredIcons = new Set();
    while ((iconMatch = iconRegex.exec(kpiBlock)) !== null) {
      requiredIcons.add(iconMatch[1]);
    }

    let added = false;
    requiredIcons.forEach(icon => {
      if (!existingImports.includes(icon)) {
        existingImports.push(icon);
        added = true;
      }
    });

    if (added) {
      const newImportStr = `import {\n  ${existingImports.join(', ')}\n} from 'lucide-react';`;
      code = code.replace(importRegex, newImportStr);
      fs.writeFileSync(path, code, 'utf8');
      console.log('Updated imports in', f);
    } else {
      console.log('No updates needed in', f);
    }
  }
});
