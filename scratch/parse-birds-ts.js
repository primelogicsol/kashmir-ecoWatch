const fs = require('fs');

let content = fs.readFileSync('C:\\Users\\Fayaz\\Sufipulseupdate2026\\KEW 2026\\kashmir-ecoWatch\\src/data/species/birds.ts', 'utf8');

// Strip TypeScript annotations and imports to make it parseable in vanilla Node
content = content.replace(/import\s+[\s\S]*?;/g, '');
content = content.replace(/:\s*BiodiversitySpecies\[\]/g, '');

// Evaluate or parse the arrays
// To make it simple, let's evaluate it in a context
const sandbox = {};
try {
  // Replace export const with const
  const jsContent = content.replace(/export\s+const/g, 'sandbox.');
  eval(jsContent);
  const keys = Object.keys(sandbox);
  console.log('Exported arrays:', keys);
  for (const key of keys) {
    if (Array.isArray(sandbox[key])) {
      console.log(`Array "${key}" length:`, sandbox[key].length);
      // Check if all elements have scientificName and commonName
      const emptySci = sandbox[key].filter(s => !s.scientificName || s.scientificName.includes('sp. '));
      console.log(`Array "${key}" elements with empty/placeholder scientificName:`, emptySci.length);
    }
  }
} catch (e) {
  console.error('Error evaluating:', e);
}
