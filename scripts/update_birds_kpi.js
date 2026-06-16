const fs = require('fs');
let code = fs.readFileSync('src/app/biodiversity/birds/page.tsx', 'utf8');

const oldKpis = /const metrics = \[[\s\S]*?\];/;

const newKpis = `const metrics = [
    { label: 'Target Slots', value: species.length, icon: 'Activity' as const },
    { label: 'Validated Data', value: species.filter(s => s.commonName !== 'Pending Validation').length, icon: 'CheckCircle' as const },
    { label: 'Threatened Taxa', value: species.filter(s => ['CR', 'EN', 'VU', 'cr', 'en', 'vu'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Endemic', value: species.filter(s => s.endemismStatus && (s.endemismStatus.includes('endemic') || s.endemismStatus.includes('himalayan'))).length, icon: 'MapPin' as const },
    { label: 'Monitoring Sites', value: 14, icon: 'Map' as const },
    { label: 'Active Sightings', value: '2.4K+', icon: 'Eye' as const },
    { label: 'Data Sources', value: 12, icon: 'Database' as const },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' as const },
  ];`;

code = code.replace(oldKpis, newKpis);
fs.writeFileSync('src/app/biodiversity/birds/page.tsx', code);
