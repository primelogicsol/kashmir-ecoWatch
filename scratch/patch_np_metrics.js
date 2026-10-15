const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/national-parks/page.tsx', 'utf8');

const newChunk = `  const officialAreaSum = officialParks.reduce((acc, p) => acc + p.area, 0);
  const extendedAreaSum = extendedParks.reduce((acc, p) => acc + p.area, 0);
  const totalArea = allParks.reduce((acc, p) => acc + p.area, 0);

  const metrics = [
    { label: 'Total National Parks',    value: allParks.length,                           icon: 'Mountain'   as const },
    { label: 'Total Protected Biome',   value: \`\${Math.round(totalArea).toLocaleString()} km²\`, icon: 'Map'        as const },
    { label: 'Core & Trans Parks',       value: officialParks.length,                      icon: 'Shield'     as const },
    { label: 'Transboundary Parks',     value: extendedParks.length,                      icon: 'Activity'   as const },
    { label: 'Districts & Regions',      value: new Set(allParks.map(p => p.district)).size, icon: 'MapPin'   as const },
    { label: 'Earliest Designation',    value: 1975,                                      icon: 'Shield'     as const },
    { label: 'Highest Altitude Summit', value: '8,611 m (K2)',                            icon: 'TrendingUp' as const },
    { label: 'Flagship Apex Taxa',      value: '18 Species',                              icon: 'Eye'        as const },
  ];`;

content = content.replace(/const officialAreaSum = officialParks[\s\S]*?Ecosystem Types[\s\S]*?\];/, newChunk);
fs.writeFileSync('./src/app/protected-network/national-parks/page.tsx', content, 'utf8');
console.log('Successfully updated national parks page metrics!');
