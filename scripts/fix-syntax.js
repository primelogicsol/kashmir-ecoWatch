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
  const oldC = c;
  
  // Clean up `<>` stray tags in the first title span
  c = c.replace(/<span className="block whitespace-nowrap"><>([^<]+)<\/span>/g, '<span className="block whitespace-nowrap">$1</span>');
  
  // Clean up `</>` stray tags in the second title span
  c = c.replace(/<span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">([^<]+)<\/><\/span>/g, '<span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">$1</span>');

  // And also if there's `<></>` left over anywhere:
  c = c.replace(/<span className="block whitespace-nowrap"><><\/span>/g, '');

  if (c !== oldC) {
    fs.writeFileSync(p, c);
    console.log('Fixed syntax in', p);
  }
}
