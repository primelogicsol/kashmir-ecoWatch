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

// Check first 10 birds
console.log('First 5 birds:');
birds.slice(0, 5).forEach(b => console.log(b.id, b.commonName, b.districts, b.habitats));

// Check bird 10 to 15
console.log('\nBirds 10-15:');
birds.slice(10, 15).forEach(b => console.log(b.id, b.commonName, b.districts, b.habitats));
