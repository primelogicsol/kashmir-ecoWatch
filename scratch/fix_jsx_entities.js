const fs = require('fs');
const path = require('path');

const files = [
  'src/app/environmental-monitoring/page.tsx',
  'src/app/environmental-monitoring/dashboards/page.tsx',
  'src/app/environmental-monitoring/solid-waste/page.tsx',
  'src/app/environmental-monitoring/bio-waste/page.tsx',
  'src/app/environmental-monitoring/sewage-wastewater/page.tsx',
  'src/app/environmental-monitoring/drinking-water/page.tsx',
  'src/app/environmental-monitoring/critical-infrastructure/page.tsx',
  'src/app/environmental-monitoring/air-pollution/page.tsx',
  'src/app/environmental-monitoring/environmental-health/page.tsx',
  'src/app/environmental-monitoring/environmental-resilience/page.tsx',
  'src/app/environmental-monitoring/sdg-monitoring/page.tsx',
  'src/app/environmental-monitoring/utility-incidents/page.tsx',
  'src/app/hazard-intelligence/page.tsx',
  'src/app/ngo-impact/page.tsx',
];

for (const relPath of files) {
  const fullPath = path.resolve(relPath);
  if (!fs.existsSync(fullPath)) continue;
  let content = fs.readFileSync(fullPath, 'utf8');

  // Fix -> in JSX text
  content = content.replace(/->/g, '&rarr;');
  // Fix raw > in JSX text
  content = content.replace(/rainfall >/g, 'rainfall &gt;');
  content = content.replace(/oxygen >/g, 'oxygen &gt;');
  content = content.replace(/rise \(>55/g, 'rise (&gt;55');
  content = content.replace(/width \(target >/g, 'width (target &gt;');
  content = content.replace(/temperature >/g, 'temperature &gt;');
  content = content.replace(/target >/g, 'target &gt;');
  content = content.replace(/cells >/g, 'cells &gt;');
  content = content.replace(/> 25 mm/g, '&gt; 25 mm');
  content = content.replace(/> 7.0 mg/g, '&gt; 7.0 mg');
  content = content.replace(/> 15m/g, '&gt; 15m');
  content = content.replace(/> 5.0 mg/g, '&gt; 5.0 mg');
  content = content.replace(/> 82%/g, '&gt; 82%');
  content = content.replace(/> 1100/g, '&gt; 1100');
  content = content.replace(/> 2,000/g, '&gt; 2,000');
  content = content.replace(/>55/g, '&gt;55');
  content = content.replace(/< 18°C/g, '&lt; 18°C');
  content = content.replace(/< 10 mg/g, '&lt; 10 mg');
  content = content.replace(/< 100 MPN/g, '&lt; 100 MPN');
  content = content.replace(/< 250 mg/g, '&lt; 250 mg');
  content = content.replace(/< 1 NTU/g, '&lt; 1 NTU');
  content = content.replace(/< Ringelmann/g, '&lt; Ringelmann');
  content = content.replace(/< 2,000/g, '&lt; 2,000');
  content = content.replace(/< 15 µg/g, '&lt; 15 µg');
  content = content.replace(/< 21 ft/g, '&lt; 21 ft');
  content = content.replace(/< 21.0 ft/g, '&lt; 21.0 ft');

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log(`Cleaned JSX entities in: ${relPath}`);
}
