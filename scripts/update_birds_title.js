const fs = require('fs');
let code = fs.readFileSync('src/app/biodiversity/birds/page.tsx', 'utf8');
code = code.replace('title="Birds"', 'title="Kashmir Birds"');
fs.writeFileSync('src/app/biodiversity/birds/page.tsx', code);
