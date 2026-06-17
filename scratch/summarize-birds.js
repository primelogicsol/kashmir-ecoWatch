const fs = require('fs');
const path = require('path');

const birdsFilePath = path.join(__dirname, '../src/data/species/birds.ts');
let birdsContent = fs.readFileSync(birdsFilePath, 'utf8');

// Strip imports & exports
birdsContent = birdsContent.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
birdsContent = birdsContent.replace(/export\s+const\s+birdsPhase1\s*:\s*BiodiversitySpecies\s*\[\s*\]/g, 'birdsPhase1');
birdsContent = birdsContent.replace(/\s+as\s+const/g, '');

let birdsPhase1;
eval(birdsContent);

console.log('Total birds:', birdsPhase1.length);

const orders = new Set();
const families = new Set();
const validationStatuses = {};
const conservationStatuses = {};
const ecologicalScopes = {};

birdsPhase1.forEach(b => {
  if (b.taxonomy && b.taxonomy.order) orders.add(b.taxonomy.order);
  if (b.taxonomy && b.taxonomy.family) families.add(b.taxonomy.family);
  
  const vStatus = b.validationStatus || 'undefined';
  validationStatuses[vStatus] = (validationStatuses[vStatus] || 0) + 1;
  
  const cStatus = b.conservationStatus || 'undefined';
  conservationStatuses[cStatus] = (conservationStatuses[cStatus] || 0) + 1;

  const scope = b.ecologicalScope || 'undefined';
  ecologicalScopes[scope] = (ecologicalScopes[scope] || 0) + 1;
});

console.log('Unique orders:', orders.size);
console.log('Unique families:', families.size);
console.log('Validation Statuses:', JSON.stringify(validationStatuses, null, 2));
console.log('Conservation Statuses:', JSON.stringify(conservationStatuses, null, 2));
console.log('Ecological Scopes:', JSON.stringify(ecologicalScopes, null, 2));
