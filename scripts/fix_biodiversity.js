const fs = require('fs');
let code = fs.readFileSync('src/data/biodiversity.ts', 'utf8');

const correctedLines = `    references: ['report-15'],
  },
];

const threatenedComputed: BiodiversitySpecies[] = [
  ...mammalsDataRaw.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)),
  ...birdsDataRaw.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)),
  ...medicinalPlantsDataRaw.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)),
];

// Data access functions
export const getBiodiversityData = {
  mammals: {
    all: () => mammalsData,`;

code = code.replace(/    relatedSpecies: \['arnebia-benthamii'\],\n  \.\.\.mammalsDataRaw\.filter[\s\S]*?bySlug:/m, "    relatedSpecies: ['arnebia-benthamii'],\n" + correctedLines + "\n    bySlug:");

fs.writeFileSync('src/data/biodiversity.ts', code);
console.log('Fixed file corruption');
