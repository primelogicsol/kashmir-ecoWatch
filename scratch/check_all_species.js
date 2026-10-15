const fs = require('fs');

['mammals', 'birds', 'fish', 'medicinal', 'plants', 'threatened'].forEach(type => {
  try {
    const content = fs.readFileSync('src/data/species/' + type + '.ts', 'utf8');
    const names = [...content.matchAll(/\bcommonName\s*:\s*"([^"]+)"/g)].map(m => m[1]);
    const statuses = [...content.matchAll(/\bconservationStatus\s*:\s*"([^"]+)"/g)].map(m => m[1]);
    const statusCounts = statuses.reduce((a, b) => { a[b] = (a[b] || 0) + 1; return a; }, {});
    console.log(type.padEnd(12), 'Total:', names.length, 'Statuses:', JSON.stringify(statusCounts));
  } catch(e) {
    console.log(type, 'error:', e.message);
  }
});
