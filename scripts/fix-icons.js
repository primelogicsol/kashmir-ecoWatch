const fs = require('fs');
let c = fs.readFileSync('src/app/seasonal-ecology/page.tsx', 'utf8');
c = c.replace(/<Icons className="w-6 h-6 text-emerald-400" \/>/g, '<Sun className="w-6 h-6 text-emerald-400" />');
fs.writeFileSync('src/app/seasonal-ecology/page.tsx', c);
console.log('Fixed Icons to Sun');
