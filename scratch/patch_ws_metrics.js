const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/wildlife-sanctuaries/page.tsx', 'utf8');

const newMetrics = `  const totalArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);

  const metrics = [
    { label: 'Total Sanctuaries',         value: allAreas.length,                               icon: 'Shield' as const },
    { label: 'Total Protected Biome',     value: \`\${Math.round(totalArea).toLocaleString()} km²\`, icon: 'Map' as const },
    { label: 'Kashmir Core Sanctuaries',  value: coreSanctuaries.length,                        icon: 'Shield' as const },
    { label: 'Trans-Divisional',          value: transSanctuaries.length,                       icon: 'Mountain' as const },
    { label: 'Transboundary Havens',      value: extendedSanctuaries.length,                    icon: 'Activity' as const },
    { label: 'Surveyed Districts',        value: new Set(allAreas.map(p => p.district)).size,   icon: 'MapPin' as const },
    { label: 'Flagship Wildlife',         value: '60+ Taxa',                                    icon: 'Eye' as const },
    { label: 'IUCN Categorization',       value: 'Category IV',                                 icon: 'TrendingUp' as const },
  ];`;

content = content.replace(/const metrics = \[[\s\S]*?Data Quality[\s\S]*?\];/, newMetrics);
fs.writeFileSync('./src/app/protected-network/wildlife-sanctuaries/page.tsx', content, 'utf8');
console.log('Updated wildlife sanctuaries metrics!');
