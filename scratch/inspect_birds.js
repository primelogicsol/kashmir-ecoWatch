const fs = require('fs');

const content = fs.readFileSync('src/data/species/birds.ts', 'utf8');

// Extract all species commonName, scientificName, conservationStatus, id, etc.
const matches = [...content.matchAll(/id:\s*"([^"]+)",[\s\S]*?commonName:\s*"([^"]+)",[\s\S]*?scientificName:\s*"([^"]+)",[\s\S]*?conservationStatus:\s*"([^"]+)"/g)];
console.log('Parsed species:', matches.length);
if (matches.length > 0) {
  console.log('First 5:', matches.slice(0, 5).map(m => ({ id: m[1], name: m[2], sci: m[3], status: m[4] })));
  console.log('Last 5:', matches.slice(-5).map(m => ({ id: m[1], name: m[2], sci: m[3], status: m[4] })));
}
