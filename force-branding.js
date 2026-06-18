const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walk('C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/app');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;

  const jsxRegex = /title=\{\s*<>\s*(<span className="[^"]*">.*?<\/span>)\s*(<span className="[^"]*bg-gradient[^"]*">.*?<\/span>)\s*<\/>\s*\}/g;
  content = content.replace(jsxRegex, (match, span1, span2) => {
    if (span1.includes('Western Himalayan')) {
      return match;
    }
    const text1Match = span1.match(/>(.*?)</);
    const text2Match = span2.match(/>(.*?)</);
    const text1 = text1Match ? text1Match[1] : '';
    const text2 = text2Match ? text2Match[1] : '';
    const combinedName = (text1 + ' ' + text2).replace(/Western Himalayan/ig, '').trim();
    
    const gradientMatch = span2.match(/bg-gradient-to-r [^" ]+ [^" ]+ bg-clip-text text-transparent/);
    const gradientClasses = gradientMatch ? gradientMatch[0] : 'bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent';

    changed = true;
    return `title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible ${gradientClasses}">${combinedName}</span>
          </>}`;
  });

  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log('Updated JSX title in:', f);
  }
});
