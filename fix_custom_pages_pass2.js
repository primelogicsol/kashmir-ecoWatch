const fs = require('fs');

const files = [
  'src/app/protected-network/corridors-and-connectivity/page.tsx',
  'src/app/protected-network/monitoring-and-threats/page.tsx',
  'src/app/protected-network/reports-and-plans/page.tsx',
  'src/app/protected-network/species-intelligence/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/selectedScope/g, 'selectedEcologicalScope');
  content = content.replace(/setSelectedScope/g, 'setSelectedEcologicalScope');
  
  if (file.includes('reports-and-plans')) {
    // The variable inside the filter is probably 'report'
    content = content.replace(/\(plan as any\)/g, '(report as any)');
  }

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
}