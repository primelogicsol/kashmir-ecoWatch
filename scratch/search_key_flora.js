const fs = require('fs');

const plantsContent = fs.readFileSync('src/data/species/plants.ts', 'utf8');
const searchList = [
  'Platanus', 'Chinar', 'Cedrus', 'Deodar', 'Pinus', 'Abies', 'Juglans', 
  'Nelumbo', 'Saussurea', 'Fritillaria', 'Trillium', 'Aconitum', 'Artemisia',
  'Betula', 'Taxus', 'Ulmus', 'Podophyllum', 'Picrorhiza', 'Dactylorhiza'
];

searchList.forEach(query => {
  const count = (plantsContent.match(new RegExp(query, 'gi')) || []).length;
  console.log(query.padEnd(15), 'matches:', count);
});
