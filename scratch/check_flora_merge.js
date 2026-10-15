const fs = require('fs');

const plantsContent = fs.readFileSync('src/data/species/plants.ts', 'utf8');
const medContent = fs.readFileSync('src/data/species/medicinal.ts', 'utf8');
const floraIntelContent = fs.readFileSync('src/data/flora-intelligence.ts', 'utf8');

const plantCount = (plantsContent.match(/"id":/g) || []).length;
const medCount = (medContent.match(/"id":/g) || []).length;
const floraIntelCount = (floraIntelContent.match(/id:\s*'fl-/g) || []).length;

console.log('plants.ts:', plantCount);
console.log('medicinal.ts:', medCount);
console.log('flora-intelligence.ts:', floraIntelCount);

// Check districts present in plants.ts
const plantDistricts = [...plantsContent.matchAll(/"districts":\s*\[([^\]]+)\]/g)].flatMap(m => JSON.parse('[' + m[1] + ']'));
const distCounts = plantDistricts.reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {});
console.log('Districts in plants.ts:', Object.keys(distCounts));

// Check habitats present in plants.ts
const plantHabitats = [...plantsContent.matchAll(/"habitats":\s*\[([^\]]+)\]/g)].flatMap(m => JSON.parse('[' + m[1] + ']'));
const habCounts = plantHabitats.reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {});
console.log('Habitats in plants.ts:', Object.keys(habCounts));

// Check statuses in plants.ts
const plantStatuses = [...plantsContent.matchAll(/"conservationStatus":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Statuses in plants.ts:', plantStatuses.reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {}));
