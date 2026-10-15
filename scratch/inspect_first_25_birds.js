const fs = require('fs');
const vm = require('vm');

const text = fs.readFileSync('src/data/species/birds.ts', 'utf8');
const stripped = text
  .replace(/import\s+[^;]+;/, '')
  .replace(/export\s+const\s+birdsPhase1:\s*BiodiversitySpecies\[\]\s*=/, 'const birdsPhase1 =');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(stripped + '; this.birds = birdsPhase1;', sandbox);
const birds = sandbox.birds;

console.log('Bird IDs and names from 0 to 25:');
birds.slice(0, 25).forEach((b, i) => {
  console.log(`${i+1}. [${b.id}] ${b.commonName} (${b.scientificName}) - ${b.conservationStatus} | ${b.endemismStatus || 'none'} | Local: ${b.localName || 'none'}`);
});
