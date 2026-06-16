const fs = require('fs');
let code = fs.readFileSync('src/data/species/birds.ts', 'utf8');
code = code.replace(/name:/g, 'reference:');
code = code.replace(/reliabilityScore:/g, 'confidence:');
code = code.replace(/lastUpdated:/g, 'verificationDate:');
fs.writeFileSync('src/data/species/birds.ts', code);
