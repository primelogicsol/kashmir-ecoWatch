const fs = require('fs');

const text = fs.readFileSync('src/data/species/mammals.ts', 'utf8');
const eqIdx = text.indexOf('= [');
const start = text.indexOf('[', eqIdx);
const end = text.lastIndexOf(']');
const mammals = JSON.parse(text.substring(start, end + 1));

console.log('Carnivora in mammals.ts:');
mammals.filter(m => m.category === 'Carnivora').forEach(m => {
  console.log(`- [${m.id}] ${m.commonName} (${m.scientificName}) [${m.conservationStatus}]`);
});

console.log('\nArtiodactyla in mammals.ts:');
mammals.filter(m => m.category === 'Artiodactyla').forEach(m => {
  console.log(`- [${m.id}] ${m.commonName} (${m.scientificName}) [${m.conservationStatus}]`);
});
