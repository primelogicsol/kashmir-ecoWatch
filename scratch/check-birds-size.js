const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Fayaz\\Sufipulseupdate2026\\KEW 2026\\kashmir-ecoWatch\\src/data/species/birds.ts', 'utf8');
content = content.replace(/import\s+[\s\S]*?;/g, '');
content = content.replace(/:\s*BiodiversitySpecies\[\]/g, '');
const sandbox = {};
const jsContent = content.replace(/export\s+const/g, 'sandbox.');
eval(jsContent);
const localSpecies = sandbox.birdsPhase1;

console.log('Total local species:', localSpecies.length);

const nonPlaceholders = localSpecies.filter(s => !s.scientificName.includes('sp. '));
console.log('Non-placeholder count:', nonPlaceholders.length);
console.log('Non-placeholder species list:');
for (const s of nonPlaceholders) {
  console.log(`- ID: ${s.id}, Common: ${s.commonName}, Scientific: ${s.scientificName}`);
}
