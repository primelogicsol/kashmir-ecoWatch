const fs = require('fs');

let code = fs.readFileSync('src/data/biodiversity.ts', 'utf8');

const generator = `
export const generateSlots = (prefix: string, targetCount: number, currentData: BiodiversitySpecies[], group: string): BiodiversitySpecies[] => {
  const slots: BiodiversitySpecies[] = [...currentData];
  const start = currentData.length + 1;
  for (let i = start; i <= targetCount; i++) {
    const id = \`KEW-\${prefix}-\${String(i).padStart(4, '0')}\`;
    slots.push({
      id,
      slug: id.toLowerCase(),
      commonName: \`\${group === 'medicinal-plants' ? 'Medicinal' : group.charAt(0).toUpperCase() + group.slice(1)} Slot \${id}\`,
      scientificName: 'Awaiting source-backed taxonomy',
      taxonomicGroup: group as any,
      conservationStatus: 'LC',
      description: 'Framework record slot awaiting field validation and ecological data population.',
      ecologicalRole: 'Pending assessment',
      habitats: [],
      elevationRange: { min: 0, max: 0 },
      districts: [],
      protectedAreas: [],
      seasonality: 'Pending',
      threats: [],
      sensitivity: 'low',
      validationStatus: 'Pending source validation'
    } as any);
  }
  return slots;
};
`;

code = code.replace(/export const mammalsData: BiodiversitySpecies\[\] = \[/, generator + '\nconst mammalsDataRaw: BiodiversitySpecies[] = [');
code = code.replace(/export const birdsData: BiodiversitySpecies\[\] = \[/, 'const birdsDataRaw: BiodiversitySpecies[] = [');
code = code.replace(/export const fishData: BiodiversitySpecies\[\] = \[/, 'const fishDataRaw: BiodiversitySpecies[] = [');
code = code.replace(/export const plantsData: BiodiversitySpecies\[\] = \[/, 'const plantsDataRaw: BiodiversitySpecies[] = [');
code = code.replace(/export const medicinalPlantsData: BiodiversitySpecies\[\] = \[/, 'const medicinalPlantsDataRaw: BiodiversitySpecies[] = [');

code = code.replace(/export const threatenedSpeciesData: BiodiversitySpecies\[\] = \[/, 'const threatenedComputed: BiodiversitySpecies[] = [');
code = code.replace(/...mammalsData/g, '...mammalsDataRaw');
code = code.replace(/...birdsData/g, '...birdsDataRaw');
code = code.replace(/...medicinalPlantsData/g, '...medicinalPlantsDataRaw');

code += `
export const mammalsData = generateSlots('MAM', 67, mammalsDataRaw, 'mammals');
export const birdsData = generateSlots('BRD', 312, birdsDataRaw, 'birds');
export const fishData = generateSlots('AQU', 23, fishDataRaw, 'fish');
export const plantsData = generateSlots('FLR', 1834, plantsDataRaw, 'plants');
export const medicinalPlantsData = generateSlots('MED', 127, medicinalPlantsDataRaw, 'medicinal-plants');
export const threatenedSpeciesData = generateSlots('THR', 89, threatenedComputed, 'threatened');
`;

fs.writeFileSync('src/data/biodiversity.ts', code);
console.log('Successfully refactored biodiversity.ts to generate 2,452 slots!');
