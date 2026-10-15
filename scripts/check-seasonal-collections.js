const fs = require('fs');
const content = fs.readFileSync('./src/data/seasonal-ecology.ts', 'utf8');

const collections = [
  'pollinatorWindows',
  'phenologyRecords',
  'habitatSignals',
  'waterTransitions',
  'speciesActivity',
  'climateWindows',
  'seasonalReports'
];

for (const v of collections) {
  const start = content.indexOf('const ' + v);
  if (start === -1) {
    console.log(v + ': NOT FOUND');
    continue;
  }
  const end = content.indexOf('];', start);
  const chunk = content.slice(start, end);
  const idMatches = chunk.match(/id:\s*['"][^'"]+['"]/g) || [];
  const nameMatches = chunk.match(/name:\s*['"][^'"]+['"]/g) || chunk.match(/title:\s*['"][^'"]+['"]/g) || [];
  console.log(v + ' (' + idMatches.length + '):');
  nameMatches.slice(0, 5).forEach(n => console.log('   - ' + n));
}
