const fs = require('fs');
const content = fs.readFileSync('src/data/forest-ecosystems.ts', 'utf8');

const regex = /"District_Name":\s*"([^"]+)",[\s\S]*?"Administrative_Scope":\s*"([^"]+)",[\s\S]*?"Forest_Cover_Class":\s*"([^"]+)",[\s\S]*?"Deforestation_Risk":\s*"([^"]+)",[\s\S]*?"Fragmentation_Level":\s*"([^"]+)",[\s\S]*?"Disturbance_Level":\s*"([^"]+)",[\s\S]*?"Regeneration_Status":\s*"([^"]+)"/g;

let match;
let count = 0;
while ((match = regex.exec(content)) !== null) {
  count++;
  console.log(`${match[1]} (${match[2]}): CoverClass=${match[3]} | DeforestationRisk=${match[4]} | Frag=${match[5]} | Disturbance=${match[6]} | Regen=${match[7]}`);
}
console.log('Total matched:', count);
