const fs = require('fs');

// Let's inspect species across all files that are threatened (CR, EN, VU, NT)
const threatenedInSources = {};

// 1. Birds
const birdsContent = fs.readFileSync('src/data/species/birds.ts', 'utf8');
const birdMatches = [...birdsContent.matchAll(/id:\s*"([^"]+)",\s*slug:\s*"([^"]+)",\s*commonName:\s*"([^"]+)",\s*scientificName:\s*"([^"]+)"(?:,\s*localName:\s*"([^"]*)")?[\s\S]*?conservationStatus:\s*"([^"]+)"/g)];
console.log('Bird matches parsed:', birdMatches.length);
const threatenedBirds = birdMatches.filter(m => ['CR', 'EN', 'VU'].includes(m[6]));
console.log('Threatened birds (CR, EN, VU):', threatenedBirds.length);

// 2. Mammals
const mammalsContent = fs.readFileSync('src/data/species/mammals.ts', 'utf8');
const mammalMatches = [...mammalsContent.matchAll(/"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"commonName":\s*"([^"]+)",\s*"scientificName":\s*"([^"]+)"[\s\S]*?"conservationStatus":\s*"([^"]+)"/g)];
console.log('Mammal matches parsed:', mammalMatches.length);
const threatenedMammals = mammalMatches.filter(m => ['CR', 'EN', 'VU'].includes(m[5]));
console.log('Threatened mammals (CR, EN, VU):', threatenedMammals.length);

// 3. Fish
const fishContent = fs.readFileSync('src/data/species/fish.ts', 'utf8');
const fishMatches = [...fishContent.matchAll(/"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"commonName":\s*"([^"]+)",\s*"scientificName":\s*"([^"]+)"[\s\S]*?"conservationStatus":\s*"([^"]+)"/g)];
console.log('Fish matches parsed:', fishMatches.length);
const threatenedFish = fishMatches.filter(m => ['CR', 'EN', 'VU'].includes(m[5]));
console.log('Threatened fish (CR, EN, VU):', threatenedFish.length);

// 4. Medicinal
const medContent = fs.readFileSync('src/data/species/medicinal.ts', 'utf8');
const medMatches = [...medContent.matchAll(/"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"commonName":\s*"([^"]+)",\s*"scientificName":\s*"([^"]+)"[\s\S]*?"conservationStatus":\s*"([^"]+)"/g)];
console.log('Medicinal matches parsed:', medMatches.length);
const threatenedMed = medMatches.filter(m => ['CR', 'EN', 'VU'].includes(m[5]));
console.log('Threatened medicinal (CR, EN, VU):', threatenedMed.length);

// 5. Plants
const plantsContent = fs.readFileSync('src/data/species/plants.ts', 'utf8');
const plantMatches = [...plantsContent.matchAll(/"id":\s*"([^"]+)",\s*"slug":\s*"([^"]+)",\s*"commonName":\s*"([^"]+)",\s*"scientificName":\s*"([^"]+)"[\s\S]*?"conservationStatus":\s*"([^"]+)"/g)];
console.log('Plants matches parsed:', plantMatches.length);
const threatenedPlants = plantMatches.filter(m => ['CR', 'EN', 'VU'].includes(m[5]));
console.log('Threatened plants (CR, EN, VU):', threatenedPlants.length);
