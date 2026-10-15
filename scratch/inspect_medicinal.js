const fs = require('fs');

const medContent = fs.readFileSync('src/data/species/medicinal.ts', 'utf8');
const medIds = [...medContent.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
const medNames = [...medContent.matchAll(/"commonName":\s*"([^"]+)"/g)].map(m => m[1]);
const sciNames = [...medContent.matchAll(/"scientificName":\s*"([^"]+)"/g)].map(m => m[1]);
const medStatuses = [...medContent.matchAll(/"conservationStatus":\s*"([^"]+)"/g)].map(m => m[1]);
const medEndemism = [...medContent.matchAll(/"endemismStatus":\s*"([^"]+)"/g)].map(m => m[1]);

console.log('Total medicinal in medicinal.ts:', medIds.length);
console.log('Statuses in medicinal.ts:', medStatuses.reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {}));
console.log('Endemism in medicinal.ts:', medEndemism.reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {}));

console.log('Sample medicinal (first 10):');
for (let i = 0; i < 10; i++) {
  console.log(`${i+1}. ${medNames[i]} (${sciNames[i]}) [${medStatuses[i]}]`);
}
