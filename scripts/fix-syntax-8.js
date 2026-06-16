const fs = require('fs');

const subPages = [
  'src/app/field-reports/monthly-bulletins/page.tsx',
  'src/app/field-reports/risk-assessments/page.tsx',
  'src/app/field-reports/species-surveys/page.tsx',
  'src/app/field-reports/technical-reports/page.tsx',
  'src/app/field-reports/wetland-assessments/page.tsx'
];

for (const p of subPages) {
  if (!fs.existsSync(p)) continue;
  let c = fs.readFileSync(p, 'utf8');
  
  // Clean up duplicate React
  c = c.replace(/import React from 'react';\n/g, "");
  
  // Clean up duplicate LiveMetricsBar
  let lines = c.split('\n');
  let newLines = [];
  let seenLiveMetrics = false;
  
  for (let line of lines) {
     if (line.includes("import { LiveMetricsBar }")) {
        if (!seenLiveMetrics) {
           seenLiveMetrics = true;
           newLines.push(line);
        }
     } else {
        newLines.push(line);
     }
  }
  
  fs.writeFileSync(p, newLines.join('\n'), 'utf8');
}
console.log('Cleaned up duplicate imports');
