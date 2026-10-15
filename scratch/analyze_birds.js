const fs = require('fs');

const content = fs.readFileSync('src/data/species/birds.ts', 'utf8');
const idMatches = content.match(/id:\s*"BRD-\d+"/g) || [];
console.log('Total birds:', idMatches.length);

const seasonalityMatches = [...content.matchAll(/seasonality:\s*"([^"]+)"/g)].map(m => m[1]);
const sCounts = {};
seasonalityMatches.forEach(s => sCounts[s] = (sCounts[s] || 0) + 1);
console.log('Seasonalities:', sCounts);

const conservationMatches = [...content.matchAll(/conservationStatus:\s*"([^"]+)"/g)].map(m => m[1]);
const cCounts = {};
conservationMatches.forEach(s => cCounts[s] = (cCounts[s] || 0) + 1);
console.log('Conservation:', cCounts);
