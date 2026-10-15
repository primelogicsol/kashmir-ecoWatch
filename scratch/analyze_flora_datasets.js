const fs = require('fs');

// Check all unique species between plants.ts and medicinal.ts
const plantsContent = fs.readFileSync('src/data/species/plants.ts', 'utf8');
const medContent = fs.readFileSync('src/data/species/medicinal.ts', 'utf8');

const plantNames = [...plantsContent.matchAll(/"commonName":\s*"([^"]+)"/g)].map(m => m[1]);
const plantScis = [...plantsContent.matchAll(/"scientificName":\s*"([^"]+)"/g)].map(m => m[1]);
const plantStatuses = [...plantsContent.matchAll(/"conservationStatus":\s*"([^"]+)"/g)].map(m => m[1]);
const plantEndemisms = [...plantsContent.matchAll(/"endemismStatus":\s*"([^"]+)"/g)].map(m => m[1]);

const medNames = [...medContent.matchAll(/"commonName":\s*"([^"]+)"/g)].map(m => m[1]);
const medScis = [...medContent.matchAll(/"scientificName":\s*"([^"]+)"/g)].map(m => m[1]);
const medStatuses = [...medContent.matchAll(/"conservationStatus":\s*"([^"]+)"/g)].map(m => m[1]);
const medEndemisms = [...medContent.matchAll(/"endemismStatus":\s*"([^"]+)"/g)].map(m => m[1]);

console.log('Plants count:', plantNames.length);
console.log('Medicinal count:', medNames.length);

const threatenedInPlants = plantStatuses.filter(s => ['CR', 'EN', 'VU'].includes(s)).length;
const threatenedInMed = medStatuses.filter(s => ['CR', 'EN', 'VU'].includes(s)).length;
console.log('Threatened in plants.ts:', threatenedInPlants);
console.log('Threatened in medicinal.ts:', threatenedInMed);

const endemicInPlants = plantEndemisms.filter(e => e.includes('endemic')).length;
const endemicInMed = medEndemisms.filter(e => e.includes('endemic')).length;
console.log('Endemic in plants.ts:', endemicInPlants);
console.log('Endemic in medicinal.ts:', endemicInMed);
