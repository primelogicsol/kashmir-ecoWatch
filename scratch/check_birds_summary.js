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

console.log('Total birds:', birds.length);

const statuses = {};
birds.forEach(b => {
  statuses[b.conservationStatus] = (statuses[b.conservationStatus] || 0) + 1;
});
console.log('Conservation Statuses:', statuses);

const threatened = birds.filter(b => ['CR', 'EN', 'VU'].includes(b.conservationStatus));
console.log('Threatened (CR, EN, VU):', threatened.length);
threatened.forEach(b => console.log(`- [${b.conservationStatus}] ${b.commonName} (${b.scientificName})`));

const endemics = birds.filter(b => b.endemismStatus && (b.endemismStatus.includes('endemic') || b.endemismStatus.includes('kashmir') || b.endemismStatus.includes('himalayan')));
console.log('Endemic taxa count:', endemics.length);
const kashmirEndemics = birds.filter(b => b.endemismStatus === 'kashmir-endemic');
console.log('Strict Kashmir endemics:', kashmirEndemics.length);
const nwHimalayan = birds.filter(b => b.endemismStatus === 'northwest-himalayan');
console.log('Northwest Himalayan endemics:', nwHimalayan.length);
const himalayan = birds.filter(b => b.endemismStatus === 'himalayan-endemic');
console.log('Himalayan endemics:', himalayan.length);

// Let's check districts
const districtSet = new Set();
birds.forEach(b => (b.districts || []).forEach(d => districtSet.add(d)));
console.log('Districts count:', districtSet.size);
console.log('Districts:', Array.from(districtSet));
