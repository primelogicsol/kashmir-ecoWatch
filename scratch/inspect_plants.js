const fs = require('fs');

const plantsContent = fs.readFileSync('src/data/species/plants.ts', 'utf8');
const plantIds = [...plantsContent.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
const plantNames = [...plantsContent.matchAll(/"commonName":\s*"([^"]+)"/g)].map(m => m[1]);
const sciNames = [...plantsContent.matchAll(/"scientificName":\s*"([^"]+)"/g)].map(m => m[1]);
const plantStatuses = [...plantsContent.matchAll(/"conservationStatus":\s*"([^"]+)"/g)].map(m => m[1]);
const plantEndemism = [...plantsContent.matchAll(/"endemismStatus":\s*"([^"]+)"/g)].map(m => m[1]);

console.log('Total plants in plants.ts:', plantIds.length);
console.log('Statuses in plants.ts:', plantStatuses.reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {}));
console.log('Endemism in plants.ts:', plantEndemism.reduce((acc, s) => { acc[s] = (acc[s] || 0) + 1; return acc; }, {}));

console.log('Sample species (first 10):');
for (let i = 0; i < 10; i++) {
  console.log(`${i+1}. ${plantNames[i]} (${sciNames[i]}) [${plantStatuses[i]}]`);
}
