const fs = require('fs');

const originalFile = fs.readFileSync('./src/data/protected-network.ts', 'utf8');
const newParksCode = fs.readFileSync('./scratch/new_national_parks.ts', 'utf8');

// Find start of export const nationalParksData
const startIdx = originalFile.indexOf('export const nationalParksData: ProtectedArea[] = [');
if (startIdx === -1) {
  console.error('Could not find start index!');
  process.exit(1);
}

const endMarker = 'export const wildlifeSanctuariesData: ProtectedArea[] = [';
const endIdx = originalFile.indexOf(endMarker);
if (endIdx === -1) {
  console.error('Could not find end index!');
  process.exit(1);
}

const before = originalFile.slice(0, startIdx);
const after = originalFile.slice(endIdx);

const updated = before + newParksCode + '\n\n\n\n' + after;
fs.writeFileSync('./src/data/protected-network.ts', updated, 'utf8');
console.log('Successfully updated src/data/protected-network.ts with 20 comprehensive National Parks!');
