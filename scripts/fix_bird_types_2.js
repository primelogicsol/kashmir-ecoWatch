const fs = require('fs');
let code = fs.readFileSync('src/data/species/birds.ts', 'utf8');
code = code.replace(/id: "src-00[1-8]", /g, '');
code = code.replace(/"research"/g, '"monitoring"');
fs.writeFileSync('src/data/species/birds.ts', code);
