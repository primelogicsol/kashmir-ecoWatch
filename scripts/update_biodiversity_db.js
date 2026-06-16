const fs = require('fs');
let code = fs.readFileSync('src/data/biodiversity.ts', 'utf8');

if (!code.includes("import { birdsPhase1 } from './species/birds';")) {
    code = code.replace(/import \{.*?\} from 'lucide-react';/, match => match + "\nimport { birdsPhase1 } from './species/birds';");
}

// Modify the combined generator to use birdsPhase1, filling the rest with generated ones
const replaceGenerators = /export const biodiversityDatabase: BiodiversitySpecies\[\] = \[[\s\S]*?\];/;

const newDatabase = `export const biodiversityDatabase: BiodiversitySpecies[] = [
  ...mammalsDataRaw,
  ...birdsPhase1,
  ...generateSlots('BRD', 592 - birdsPhase1.length, birdsDataRaw, 'birds'),
  ...generateSlots('FSH', 23, fishDataRaw, 'fish'),
  ...generateSlots('PLT', 1834, plantsDataRaw, 'plants'),
  ...generateSlots('MED', 127, medicinalDataRaw, 'medicinal-plants'),
];`;

code = code.replace(replaceGenerators, newDatabase);
fs.writeFileSync('src/data/biodiversity.ts', code);
