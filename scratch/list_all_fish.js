const fs = require('fs');
const text = fs.readFileSync('src/data/species/fish.ts', 'utf8');
const eqIdx = text.indexOf('= [');
const start = text.indexOf('[', eqIdx);
const end = text.lastIndexOf(']');
const fish = JSON.parse(text.substring(start, end + 1));

console.log('List of all 66 fish species:');
fish.forEach((f, i) => {
  console.log(`${i+1}. [${f.id}] ${f.commonName} (${f.scientificName}) - ${f.category} | ${f.conservationStatus} | Endemism: ${f.endemismStatus || 'none'} | Local: ${f.localName || 'none'}`);
});
