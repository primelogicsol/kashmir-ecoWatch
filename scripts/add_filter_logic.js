const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');

const filterLogic = `  const filteredSpecies = species.filter(s => {
    let match = true;
    if (activeFilters.searchQuery && !s.commonName.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) {
      match = false;
    }
    if (activeFilters.conservationStatus && activeFilters.conservationStatus !== 'all') {
      if (s.conservationStatus !== activeFilters.conservationStatus) match = false;
    }
    if (activeFilters.habitat && activeFilters.habitat !== 'all') {
      if (!s.habitats.includes(activeFilters.habitat)) match = false;
    }
    return match;
  }); // Applied activeFilters`;

code = code.replace(
  'const filteredSpecies = species; // Apply filters here based on activeFilters',
  filterLogic
);

fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
