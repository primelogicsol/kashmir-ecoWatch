const fs = require('fs');
const vm = require('vm');

const text = fs.readFileSync('src/data/species/birds.ts', 'utf8');

// Strip TypeScript import and types
const stripped = text
  .replace(/import\s+[^;]+;/, '')
  .replace(/export\s+const\s+birdsPhase1:\s*BiodiversitySpecies\[\]\s*=/, 'const birdsPhase1 =');

const sandbox = {};
vm.createContext(sandbox);
vm.runInContext(stripped + '; this.birds = birdsPhase1;', sandbox);

const birds = sandbox.birds;
console.log('Total birds in birds.ts:', birds.length);

const statusCounts = {};
const orders = {};
const families = {};
const habitats = new Set();
const districts = new Set();
const endemics = [];
const threatened = [];

birds.forEach(b => {
  statusCounts[b.conservationStatus] = (statusCounts[b.conservationStatus] || 0) + 1;
  const ord = b.taxonomy?.order || 'Unknown';
  orders[ord] = (orders[ord] || 0) + 1;
  (b.habitats || []).forEach(h => habitats.add(h));
  (b.districts || []).forEach(d => districts.add(d));

  if (['CR', 'EN', 'VU'].includes(b.conservationStatus)) {
    threatened.push(b);
  }
  if (b.endemismStatus && (b.endemismStatus.includes('endemic') || b.endemismStatus.includes('kashmir') || b.endemismStatus.includes('himalayan'))) {
    endemics.push(b);
  }
});

console.log('Conservation Statuses:', statusCounts);
console.log('Threatened Taxa count (CR, EN, VU):', threatened.length);
threatened.forEach(b => console.log(`- ${b.commonName} (${b.scientificName}) [${b.conservationStatus}] - ${b.localName || 'no local'}`));

console.log('\nEndemic Taxa count:', endemics.length);
endemics.forEach(b => console.log(`- ${b.commonName} (${b.scientificName}) [${b.endemismStatus}]`));

console.log('\nHabitats count:', habitats.size);
console.log('Habitats list:', Array.from(habitats).slice(0, 20));
console.log('Districts count:', districts.size);
console.log('Districts:', Array.from(districts));
