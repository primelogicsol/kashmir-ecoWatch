const fs = require('fs');
let code = fs.readFileSync('src/data/biodiversity.ts', 'utf8');

const regex = /export const birdsData: BiodiversitySpecies\[\] = \[[\s\S]*?(?=export const fishData)/;

const replacement = `export const birdsData: BiodiversitySpecies[] = [
  ...birdsPhase1,
  ...Array.from({ length: 592 - birdsPhase1.length }).map((_, i) => ({
    id: \`BRD-GEN-\${i}\`,
    slug: \`bird-pending-\${i}\`,
    commonName: 'Pending Validation',
    scientificName: 'Pending',
    taxonomicGroup: 'birds',
    conservationStatus: 'LC',
    description: 'Pending intelligence injection.',
    ecologicalRole: 'Pending',
    habitats: [],
    elevationRange: { min: 0, max: 0 },
    districts: [],
    protectedAreas: [],
    seasonality: 'Pending',
    threats: [],
    sensitivity: 'low',
    dataSource: { type: 'inventory', qualityFlag: 'unverified', confidence: 0 }
  } as any))
];

`;

code = code.replace(regex, replacement);
fs.writeFileSync('src/data/biodiversity.ts', code);
