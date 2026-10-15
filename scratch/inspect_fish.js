const fs = require('fs');

const text = fs.readFileSync('src/data/species/fish.ts', 'utf8');

const eqIdx = text.indexOf('= [');
const start = text.indexOf('[', eqIdx);
const end = text.lastIndexOf(']');
const jsonStr = text.substring(start, end + 1);
const fish = JSON.parse(jsonStr);

console.log('Total fish:', fish.length);

const categories = {};
const habitats = new Set();
const districts = new Set();

fish.forEach(f => {
  categories[f.category] = (categories[f.category] || 0) + 1;
  (f.habitats || []).forEach(h => habitats.add(h));
  (f.districts || []).forEach(d => districts.add(d));
});

console.log('Categories:', categories);
console.log('Habitats count:', habitats.size);
console.log('Districts count:', districts.size);
console.log('Districts:', Array.from(districts));

const threatened = fish.filter(f => ['CR', 'EN', 'VU'].includes(f.conservationStatus));
console.log('\nThreatened species (CR, EN, VU):', threatened.length);
threatened.forEach(f => console.log(`- ${f.commonName} (${f.scientificName}) [${f.conservationStatus}]: ${f.localName || 'No local name'}`));

const endemics = fish.filter(f => f.endemismStatus === 'kashmir-endemic' || f.endemismStatus === 'himalayan-endemic');
console.log('\nEndemics count:', endemics.length);
endemics.forEach(f => console.log(`- ${f.commonName} (${f.scientificName}) [${f.endemismStatus}]: ${f.localName || 'No local name'}`));
