const fs = require('fs');

// Read existing datasets
const birdsRaw = fs.readFileSync('src/data/species/birds.ts', 'utf8');
const mammalsRaw = fs.readFileSync('src/data/species/mammals.ts', 'utf8');
const fishRaw = fs.readFileSync('src/data/species/fish.ts', 'utf8');
const medRaw = fs.readFileSync('src/data/species/medicinal.ts', 'utf8');
const plantsRaw = fs.readFileSync('src/data/species/plants.ts', 'utf8');

console.log('Datasets loaded successfully.');
