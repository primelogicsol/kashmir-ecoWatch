const fs = require('fs');
let code = fs.readFileSync('src/data/biodiversity.ts', 'utf8');

const marker = "    relatedSpecies: ['arnebia-benthamii'],\n    references: ['report-15'],\n  },\n];\n";
const bottomHalf = `
const threatenedComputed: BiodiversitySpecies[] = [
  ...mammalsDataRaw.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)),
  ...birdsDataRaw.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)),
  ...medicinalPlantsDataRaw.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)),
];

export const mammalsData = generateSlots('MAM', 67, mammalsDataRaw, 'mammals');
export const birdsData = generateSlots('BRD', 312, birdsDataRaw, 'birds');
export const fishData = generateSlots('AQU', 23, fishDataRaw, 'fish');
export const plantsData = generateSlots('FLR', 1834, plantsDataRaw, 'plants');
export const medicinalPlantsData = generateSlots('MED', 127, medicinalPlantsDataRaw, 'medicinal-plants');
export const threatenedSpeciesData = generateSlots('THR', 89, threatenedComputed, 'threatened');

export const getBiodiversityData = {
  mammals: {
    all: () => mammalsData,
    bySlug: (slug: string) => mammalsData.find(s => s.slug === slug),
    byConservationStatus: (status: string) => mammalsData.filter(s => s.conservationStatus === status),
    byDistrict: (district: string) => mammalsData.filter(s => s.districts.includes(district)),
    byProtectedArea: (pa: string) => mammalsData.filter(s => s.protectedAreas.includes(pa)),
  },
  birds: {
    all: () => birdsData,
    bySlug: (slug: string) => birdsData.find(s => s.slug === slug),
    byConservationStatus: (status: string) => birdsData.filter(s => s.conservationStatus === status),
    byCategory: (category: string) => birdsData.filter(s => s.category === category),
  },
  fish: {
    all: () => fishData,
    bySlug: (slug: string) => fishData.find(s => s.slug === slug),
  },
  plants: {
    all: () => plantsData,
    bySlug: (slug: string) => plantsData.find(s => s.slug === slug),
  },
  medicinalPlants: {
    all: () => medicinalPlantsData,
    bySlug: (slug: string) => medicinalPlantsData.find(s => s.slug === slug),
    byConservationStatus: (status: string) => medicinalPlantsData.filter(s => s.conservationStatus === status),
  },
  threatened: {
    all: () => threatenedSpeciesData,
    bySlug: (slug: string) => threatenedSpeciesData.find(s => s.slug === slug),
    byTaxonomicGroup: (group: string) => threatenedSpeciesData.filter(s => s.taxonomicGroup === group),
  },
  all: {
    bySlug: (slug: string): BiodiversitySpecies | undefined => {
      return [
        ...mammalsData,
        ...birdsData,
        ...fishData,
        ...plantsData,
        ...medicinalPlantsData,
      ].find(s => s.slug === slug);
    },
  },
};

export const biodiversityMetrics = {
  totalSpeciesTarget: 2452,
  totalSpeciesEntered: 0,
  totalSpecies: 2452,
  mammals: 67,
  birds: 312,
  fish: 23,
  plants: 1834,
  medicinalPlants: 127,
  threatened: 89,
  activeSightings: 4521,
  protectedAreaOverlap: 47,
};
`;

const parts = code.split("    relatedSpecies: ['arnebia-benthamii'],");
code = parts[0] + marker + bottomHalf;
fs.writeFileSync('src/data/biodiversity.ts', code);
console.log('Fixed end of file properly');
