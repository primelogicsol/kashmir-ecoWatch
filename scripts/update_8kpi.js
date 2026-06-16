const fs = require('fs');

function updatePageMetrics(filePath) {
  if (!fs.existsSync(filePath)) return;
  let code = fs.readFileSync(filePath, 'utf8');

  // If already 8 KPIs, skip
  const metricMatch = code.match(/const metrics = \[([\s\S]*?)\];/);
  if (!metricMatch) return;
  
  const metricCode = metricMatch[0];
  const items = metricCode.split('{ label:').length - 1;
  
  if (items !== 8) {
    const newMetrics = `const metrics = [
    { label: 'Target Slots', value: species.length, icon: 'Activity' as const },
    { label: 'Validated Data', value: species.filter(s => (s as any).validationStatus !== 'Pending source validation').length, icon: 'CheckCircle' as const },
    { label: 'Threatened Taxa', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Endemic', value: species.filter(s => s.endemismStatus && s.endemismStatus.includes('endemic')).length, icon: 'MapPin' as const },
    { label: 'Monitoring Sites', value: 14, icon: 'Map' as const },
    { label: 'Active Sightings', value: '2.4K+', icon: 'Eye' as const },
    { label: 'Data Sources', value: 12, icon: 'Database' as const },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' as const },
  ];`;
    code = code.replace(metricMatch[0], newMetrics);
    fs.writeFileSync(filePath, code);
    console.log('Updated', filePath);
  }
}

const pages = [
  'src/app/biodiversity/birds/page.tsx',
  'src/app/biodiversity/mammals/page.tsx',
  'src/app/biodiversity/plants/page.tsx',
  'src/app/biodiversity/medicinal-plants/page.tsx',
  'src/app/biodiversity/fish/page.tsx'
];

pages.forEach(updatePageMetrics);
