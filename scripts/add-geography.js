const fs = require('fs');

const files = [
  { path: 'src/app/protected-network/species-intelligence/page.tsx', var: 'filteredSpecies', item: 'species' },
  { path: 'src/app/protected-network/corridors-and-connectivity/page.tsx', var: 'filteredCorridors', item: 'corridor' },
  { path: 'src/app/protected-network/monitoring-and-threats/page.tsx', var: 'filteredThreats', item: 'threat' },
  { path: 'src/app/protected-network/reports-and-plans/page.tsx', var: 'filteredReports', item: 'report' },
  { path: 'src/app/protected-network/trails-and-sightings/page.tsx', var: 'filteredTrails', item: 'trail' }
];

files.forEach(({ path, var: varName, item }) => {
  console.log(`Processing ${path}...`);
  let content = fs.readFileSync(path, 'utf8');

  // 1. Add imports
  if (!content.includes('getUnitsForScope')) {
    content = content.replace(
      "import { Heading } from '@/components/common/Heading';",
      "import { Heading } from '@/components/common/Heading';\nimport { GEOGRAPHY, getUnitsForScope, getScopeForUnit, Scope } from '@/data/geography';"
    );
  }

  // 2. Update state definitions
  content = content.replace(
    /const \[selectedDistrict, setSelectedDistrict\] = useState\('all'\);/,
    "const [selectedDistrict, setSelectedDistrict] = useState('All');"
  );
  content = content.replace(
    /const \[selectedScope, setSelectedScope\] = useState\('all'\);/,
    "const [selectedScope, setSelectedScope] = useState<Scope>('All');"
  );
  
  // 3. Insert available lists below state
  if (!content.includes('availableDistricts')) {
    content = content.replace(
      /const itemsPerPage = 9;/,
      "const itemsPerPage = 9;\n\n  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope).sort(), [selectedScope]);\n  const availableScopes = [...GEOGRAPHY.scopes];"
    );
  }

  // 4. Update filtering logic inside useMemo
  // Replace the district dropdown check
  const districtCheckOld = new RegExp(`const matchesDistrict = selectedDistrict === 'all' \\|\\| \\(${item}\\.districts? && ${item}\\.districts?\\.includes\\(selectedDistrict\\)\\);`);
  const districtCheckOld2 = new RegExp(`const matchesDistrict = selectedDistrict === 'all' \\|\\| \\(${item}\\.district && ${item}\\.district === selectedDistrict\\);`);
  
  const districtCheckNew = `const matchesDistrict = selectedDistrict === 'All' || (${item}.district === selectedDistrict || (${item}.districts && ${item}.districts.includes(selectedDistrict)));`;
  
  if (content.match(districtCheckOld)) {
     content = content.replace(districtCheckOld, districtCheckNew);
  } else if (content.match(districtCheckOld2)) {
     content = content.replace(districtCheckOld2, districtCheckNew);
  } else {
    // If not found precisely, just replace by finding `const matchesDistrict = `
    content = content.replace(/const matchesDistrict =[^;]+;/, districtCheckNew);
  }

  // Replace scope dropdown check
  const scopeCheckNew = `const matchesScopeDropdown = selectedScope === 'All' || getScopeForUnit(${item}.district || (${item}.districts && ${item}.districts[0])) === selectedScope || ${item}.scope === selectedScope;`;
  content = content.replace(/const matchesScopeDropdown =[^;]+;/, scopeCheckNew);

  // 5. Update dropdown UI
  // Scope Dropdown
  content = content.replace(
    /<select[^>]+value=\{selectedScope\}[^>]+>[\s\S]*?<\/select>/,
    `<select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as Scope); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#160C27] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {availableScopes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>`
  );

  // District Dropdown
  content = content.replace(
    /<select[^>]+value=\{selectedDistrict\}[^>]+>[\s\S]*?<\/select>/,
    `<select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#160C27] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units in {selectedScope}</option>
                {availableDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>`
  );

  // 6. Fix reset filters
  content = content.replace(/setSelectedDistrict\('all'\);/g, "setSelectedDistrict('All');");
  content = content.replace(/setSelectedScope\('all'\);/g, "setSelectedScope('All');");

  fs.writeFileSync(path, content);
});
console.log('Successfully injected Geographic framework into all 5 custom pages');
