const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('page.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const pages = walk('src/app');
for (const p of pages) {
  let c = fs.readFileSync(p, 'utf8');
  if (c.includes('</>}<span') || c.includes("of' '")) {
    console.log('Malformed:', p);
    
    // Fix seasonal-ecology/page.tsx
    if (p.includes('seasonal-ecology\\page.tsx')) {
       c = c.replace(/title=\{<><span className="block whitespace-nowrap">Seasonal Ecology<\/span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">of' '<\/span><\/>\}<span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Kashmir<\/span><\/>\}/g,
       `title={<><span className="block whitespace-nowrap">Seasonal Ecology</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">of Kashmir</span></>}`);
       fs.writeFileSync(p, c);
       console.log('Fixed seasonal-ecology!');
    }
  }
}
