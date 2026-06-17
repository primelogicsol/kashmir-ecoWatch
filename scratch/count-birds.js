const fs = require('fs');
const path = require('path');

const birdsFilePath = path.join(__dirname, '../src/data/species/birds.ts');
let birdsContent = fs.readFileSync(birdsFilePath, 'utf8');

// Strip out import statements
birdsContent = birdsContent.replace(/import\s+[\s\S]*?from\s+['"].*?['"];?/g, '');
// Strip "export const birdsPhase1: BiodiversitySpecies[]" -> "birdsPhase1"
birdsContent = birdsContent.replace(/export\s+const\s+birdsPhase1\s*:\s*BiodiversitySpecies\s*\[\s*\]/g, 'birdsPhase1');
// Strip "as const"
birdsContent = birdsContent.replace(/\s+as\s+const/g, '');

// Evaluate birdsPhase1
let birdsPhase1;
try {
  eval(birdsContent);
} catch (e) {
  console.error('Eval error:', e);
}

console.log('Total birds currently in database:', birdsPhase1 ? birdsPhase1.length : 0);
if (birdsPhase1 && birdsPhase1.length > 0) {
  console.log('First bird:', birdsPhase1[0].commonName, '(', birdsPhase1[0].scientificName, ')');
  console.log('Last bird:', birdsPhase1[birdsPhase1.length - 1].commonName);
}
