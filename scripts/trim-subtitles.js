const fs = require('fs');

const filePaths = [
  'src/app/accessibility/page.tsx',
  'src/app/districts/page.tsx',
  'src/app/made-with-love/page.tsx',
  'src/app/monitoring-overview/page.tsx',
  'src/app/privacy/page.tsx',
  'src/app/protected-network/page.tsx',
  'src/app/protected-network/trails-and-sightings/page.tsx',
  'src/app/protected-network/wetland-reserves/page.tsx',
  'src/app/risk-monitoring/earthquake/page.tsx',
  'src/app/risk-monitoring/soil-pollution/page.tsx',
  'src/app/risk-updates/page.tsx',
  'src/app/terms/page.tsx'
];

for (const p of filePaths) {
  let c = fs.readFileSync(p, 'utf8');
  const m = c.match(/subtitle="([^"]+)"/);
  if (m) {
    const text = m[1];
    let words = text.split(' ');
    if (words.length > 25) {
      // Trim to ~22 words and add a period
      let newText = words.slice(0, 22).join(' ').replace(/[,;:]$/, '') + '.';
      c = c.replace(`subtitle="${text}"`, `subtitle="${newText}"`);
      fs.writeFileSync(p, c);
      console.log('Trimmed subtitle in', p);
    }
  }
}
