const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/bird-and-habitat-areas/page.tsx', 'utf8');

const newMetrics = `  const coreIBAs = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transIBAs = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedIBAs = allAreas.filter(p => p.scope === 'Transboundary / Extended');
  const totalIBAArea = allAreas.reduce((sum, a) => sum + (a.area || 0), 0);

  const metrics = [
    { label: 'Total Designated IBAs',   value: allAreas.length,                               icon: 'Bird' as const },
    { label: 'Total Avian Sanctuary',   value: \`\${Math.round(totalIBAArea).toLocaleString()} km²\`, icon: 'Map' as const },
    { label: 'Kashmir Core IBAs',       value: coreIBAs.length,                               icon: 'Shield' as const },
    { label: 'Trans-Divisional IBAs',   value: transIBAs.length,                              icon: 'Mountain' as const },
    { label: 'Transboundary IBAs',      value: extendedIBAs.length,                           icon: 'Activity' as const },
    { label: 'Recorded Bird Species',   value: '599 Species',                                 icon: 'Eye' as const },
    { label: 'Flyway Rest Basins',      value: '28 Wetlands',                                 icon: 'Droplet' as const },
    { label: 'BirdLife / BNHS Global',  value: 'A1, A2, A3 Criteria',                         icon: 'Leaf' as const },
  ];`;

content = content.replace(/const metrics = \[[\s\S]*?Habitat Types[\s\S]*?\];/, newMetrics);
fs.writeFileSync('./src/app/protected-network/bird-and-habitat-areas/page.tsx', content, 'utf8');
console.log('Updated bird and habitat areas metrics!');
