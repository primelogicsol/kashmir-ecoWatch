const fs = require('fs');
let code = fs.readFileSync('src/data/species/birds.ts', 'utf8');

code = code.replace(/"Vulnerable"/g, '"vulnerable"')
           .replace(/"Least Concern"/g, '"least-concern"')
           .replace(/"High"/g, '"high"')
           .replace(/"Endemic"/g, '"endemic"')
           .replace(/"Breeding Endemic"/g, '"endemic"')
           .replace(/"Native"/g, '"native"')
           .replace(/"governmental"/g, '"government"')
           .replace(/"academic"/g, '"research"')
           .replace(/"Verified"/g, '"verified"');

fs.writeFileSync('src/data/species/birds.ts', code);
