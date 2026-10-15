const fs = require('fs');

const text = fs.readFileSync('src/data/species/mammals.ts', 'utf8');

const eqIdx = text.indexOf('= [');
const start = text.indexOf('[', eqIdx);
const end = text.lastIndexOf(']');
const mammals = JSON.parse(text.substring(start, end + 1));

console.log('Total mammals in mammals.ts:', mammals.length);

const statusCounts = {};
const categories = {};
const habitats = new Set();
const districts = new Set();
const endemics = [];
const threatened = [];

mammals.forEach(m => {
  statusCounts[m.conservationStatus] = (statusCounts[m.conservationStatus] || 0) + 1;
  categories[m.category] = (categories[m.category] || 0) + 1;
  (m.habitats || []).forEach(h => habitats.add(h));
  (m.districts || []).forEach(d => districts.add(d));

  if (['CR', 'EN', 'VU'].includes(m.conservationStatus)) {
    threatened.push(m);
  }
  if (m.endemismStatus && (m.endemismStatus.includes('endemic') || m.endemismStatus.includes('kashmir') || m.endemismStatus.includes('himalayan'))) {
    endemics.push(m);
  }
});

console.log('\nConservation Statuses:', statusCounts);
console.log('Threatened (CR, EN, VU):', threatened.length);
threatened.forEach(m => console.log(`- [${m.conservationStatus}] ${m.commonName} (${m.scientificName}) - ${m.localName || 'no local'}`));

console.log('\nEndemics count:', endemics.length);
endemics.forEach(m => console.log(`- ${m.commonName} (${m.scientificName}) [${m.endemismStatus}]`));

console.log('\nCategories:', categories);
console.log('Habitats count:', habitats.size);
console.log('Habitats list:', Array.from(habitats));
console.log('Districts count:', districts.size);
console.log('Districts:', Array.from(districts));
