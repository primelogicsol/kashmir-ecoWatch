const fs = require('fs');
const content = fs.readFileSync('./src/data/protected-network.ts', 'utf8');

const lines = content.split('\n');
let inNationalParks = false;
let parkLines = [];
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes("id: 'dachigam'")) {
    inNationalParks = true;
  }
  if (inNationalParks) {
    parkLines.push(`${i+1}: ${lines[i]}`);
    if (parkLines.length > 80) break;
  }
}
console.log(parkLines.join('\n'));
