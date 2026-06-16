const fs = require('fs');

const pages = [
  'src/app/field-reports/page.tsx',
  'src/app/field-reports/monthly-bulletins/page.tsx',
  'src/app/field-reports/species-surveys/page.tsx',
  'src/app/field-reports/wetland-assessments/page.tsx',
  'src/app/field-reports/risk-assessments/page.tsx',
  'src/app/field-reports/technical-reports/page.tsx',
  'src/app/library/page.tsx'
];

for (const p of pages) {
  if (!fs.existsSync(p)) continue;
  
  let c = fs.readFileSync(p, 'utf8');
  
  c = c.replace(/import \{ LiveMetricsBar \} from '@\/components\/common\/Heading';/g, "import { LiveMetricsBar } from '@/components/common/LiveMetricsBar';");
  
  fs.writeFileSync(p, c, 'utf8');
}
console.log('Fixed LiveMetricsBar imports');
