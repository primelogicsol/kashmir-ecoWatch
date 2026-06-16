const fs = require('fs');
let content = fs.readFileSync('src/data/species/mammals.ts', 'utf8');

content = content.replace(/\"endemismStatus\":/g, '\"distributionPoints\": [],\n    \"endemismStatus\":');

fs.writeFileSync('src/data/species/mammals.ts', content);
console.log('Fixed distributionPoints in mammals.ts');
