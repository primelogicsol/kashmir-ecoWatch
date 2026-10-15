const fs = require('fs');
const text = fs.readFileSync('src/data/species/fish.ts', 'utf8');
const eqIdx = text.indexOf('= [');
const start = text.indexOf('[', eqIdx);
const end = text.lastIndexOf(']');
const fish = JSON.parse(text.substring(start, end + 1));

const habCount = {};
fish.forEach(f => {
  (f.habitats || []).forEach(h => {
    habCount[h] = (habCount[h] || 0) + 1;
  });
});

console.log('Habitats sorted by frequency:');
const sorted = Object.entries(habCount).sort((a,b) => b[1] - a[1]);
sorted.slice(0, 30).forEach(([h, count]) => console.log(`  ${h}: ${count}`));
