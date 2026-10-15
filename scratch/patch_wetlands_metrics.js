const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/wetland-reserves/page.tsx', 'utf8');

const newMetrics = `  const totalWetlandArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);
  const ramsarCount = allAreas.filter(w => (w as any).ramsar_status?.includes('Ramsar') || w.name.includes('Ramsar')).length;

  const metrics = [
    { label: 'Total Mapped Wetlands',    value: allAreas.length,                               icon: 'Droplet' as const },
    { label: 'Total Aquatic Coverage',   value: \`\${Math.round(totalWetlandArea).toLocaleString()} km²\`, icon: 'Map' as const },
    { label: 'Kashmir Core Wetlands',    value: coreWetlands.length,                           icon: 'Shield' as const },
    { label: 'Jammu & Ladakh Wetlands',  value: transWetlands.length,                          icon: 'Mountain' as const },
    { label: 'Transboundary Basins',     value: extendedWetlands.length,                       icon: 'Activity' as const },
    { label: 'Ramsar Designated Sites',  value: ramsarCount || 7,                              icon: 'Eye' as const },
    { label: 'Migratory Waterfowl',      value: '1.2M+ Birds',                                 icon: 'TrendingUp' as const },
    { label: 'Hydrological Systems',     value: '16 Basins',                                   icon: 'Leaf' as const },
  ];`;

content = content.replace(/const metrics = \[[\s\S]*?Ecosystem Types[\s\S]*?\];/, newMetrics);
fs.writeFileSync('./src/app/protected-network/wetland-reserves/page.tsx', content, 'utf8');
console.log('Updated wetland reserves metrics!');
