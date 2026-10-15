const fs = require('fs');

const { mammals } = require('./threatened_mammals_data');
const { birds } = require('./threatened_birds_data');
const { fish } = require('./threatened_fish_data');
const { flora } = require('./threatened_flora_data');

const allThreatened = [...mammals, ...birds, ...fish, ...flora];

console.log('Total verified threatened species compiled:', allThreatened.length);

const statusCounts = allThreatened.reduce((acc, s) => { acc[s.conservationStatus] = (acc[s.conservationStatus] || 0) + 1; return acc; }, {});
console.log('IUCN Status Breakdown:', statusCounts);

const taxaCounts = allThreatened.reduce((acc, s) => { acc[s.taxonomicGroup] = (acc[s.taxonomicGroup] || 0) + 1; return acc; }, {});
console.log('Taxonomic Group Breakdown:', taxaCounts);

const fileHeader = `// Comprehensive 60-Species Western Himalayan Threatened Species Intelligence Database
// Strictly verified Critically Endangered (CR), Endangered (EN), Vulnerable (VU), and Near Threatened (NT)
// Across Kashmir Core, Jammu Division, Ladakh Division, Azad Kashmir (AJK), and Gilgit-Baltistan (GB).
import { type BiodiversitySpecies } from '../../types/biodiversity';

export const threatenedPhase1: BiodiversitySpecies[] = ${JSON.stringify(allThreatened, null, 2)};
`;

fs.writeFileSync('src/data/species/threatened.ts', fileHeader);
console.log('Successfully wrote to src/data/species/threatened.ts');

// Also update threatened_database.csv
let csv = 'Species ID,Common Name,Scientific Name,Kashmiri Name,Taxonomic Group,IUCN Status,National Status,Elevation Min,Elevation Max,Estimated Population,Trafficking Corridor,Sensitivity\n';
allThreatened.forEach(s => {
  csv += `${s.id},"${s.commonName}","${s.scientificName}","${s.localName || ''}",${s.taxonomicGroup},${s.conservationStatus},"${s.nationalStatus || ''}",${s.elevationRange.min},${s.elevationRange.max},"${s.estimatedWildPopulation || ''}","${s.traffickingCorridor || ''}",${s.sensitivity}\n`;
});
fs.writeFileSync('threatened_database.csv', csv);
console.log('Successfully updated threatened_database.csv');
