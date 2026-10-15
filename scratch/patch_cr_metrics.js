const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/conservation-reserves/page.tsx', 'utf8');

const newMetrics = `  const coreReserves = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transReserves = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedReserves = allAreas.filter(p => p.scope === 'Transboundary / Extended');
  const totalCRArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);

  const metrics = [
    { label: 'Total Conservation Units', value: allAreas.length,                               icon: 'Leaf' as const },
    { label: 'Total Stewardship Area',   value: \`\${Math.round(totalCRArea).toLocaleString()} km²\`, icon: 'Map' as const },
    { label: 'Kashmir Core Reserves',    value: coreReserves.length,                           icon: 'Shield' as const },
    { label: 'Trans-Divisional Reserves',value: transReserves.length,                          icon: 'Mountain' as const },
    { label: 'Community Landscapes',     value: extendedReserves.length,                       icon: 'Activity' as const },
    { label: 'Governed Districts',       value: new Set(allAreas.map(p => p.district)).size,   icon: 'MapPin' as const },
    { label: 'Corridor Nodes',           value: '35+ Corridors',                               icon: 'TrendingUp' as const },
    { label: 'Protected Status',         value: 'IUCN Category V',                             icon: 'Eye' as const },
  ];`;

content = content.replace(/const metrics = \[[\s\S]*?Data Quality[\s\S]*?\];/, newMetrics);
fs.writeFileSync('./src/app/protected-network/conservation-reserves/page.tsx', content, 'utf8');
console.log('Updated conservation reserves metrics!');
