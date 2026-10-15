const fs = require('fs');

const file = 'src/data/species/threatened.ts';
const content = fs.readFileSync(file, 'utf8');
const commonNames = [...content.matchAll(/"commonName":\s*"([^"]+)"/g)].map(m => m[1]);
const sciNames = [...content.matchAll(/"scientificName":\s*"([^"]+)"/g)].map(m => m[1]);
const statuses = [...content.matchAll(/"conservationStatus":\s*"([^"]+)"/g)].map(m => m[1]);
const taxa = [...content.matchAll(/"taxonomicGroup":\s*"([^"]+)"/g)].map(m => m[1]);

console.log('Total entries:', commonNames.length);
console.log('Taxa distribution:', taxa.reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {}));
console.log('Status distribution:', statuses.reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {}));

const sample = commonNames.map((name, i) => `${name} (${sciNames[i]}) - ${taxa[i]} [${statuses[i]}]`);
console.log('\nAll Species:');
sample.forEach((s, idx) => console.log(`${idx + 1}. ${s}`));
