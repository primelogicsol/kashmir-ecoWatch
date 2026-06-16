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
  let match = c.match(/subtitle=\{\s*"([^"]+)"\s*\}/) || 
              c.match(/subtitle=\{\s*`([^`]+)`\s*\}/) || 
              c.match(/subtitle="([^"]+)"/);
  if (match) {
    const text = match[1].replace(/\s+/g, ' ').trim();
    const words = text.split(' ').length;
    if (words > 28) {
      console.log(p, 'has', words, 'words');
    }
  }
}
