const fs = require('fs');
const path = 'src/app/protected-network/trails-and-sightings/page.tsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
if (!content.includes('getUnitsForScope')) {
  content = content.replace(
    "import { Heading } from '@/components/common/Heading';",
    "import { Heading } from '@/components/common/Heading';\nimport { GEOGRAPHY, getUnitsForScope, Scope, getScopeForUnit } from '@/data/geography';"
  );
}

// 2. State
content = content.replace(
  /const \[selectedDistrict, setSelectedDistrict\] = useState\('all'\);/,
  "const [selectedDistrict, setSelectedDistrict] = useState('All');"
);
content = content.replace(
  /const \[selectedScope, setSelectedScope\] = useState\('all'\);/,
  "const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');"
);

// 3. Lists
content = content.replace(
  /const districtsList = useMemo\(\(\) => \{[\s\S]*?\}, \[\]\);/,
  "const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);\n  const availableScopes = [...GEOGRAPHY.scopes];"
);

// 4. Update UI
// Scope drop
content = content.replace(
  /<select\s+value=\{selectedScope\}[\s\S]*?<\/select>/,
  `<select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-[#160C27] border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {availableScopes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>`
);

// District drop
content = content.replace(
  /<select\s+value=\{selectedDistrict\}[\s\S]*?<\/select>/,
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

// Filter arrays
// For filteredReports
content = content.replace(
  /const matchesDistrict = selectedDistrict === 'all' \|\| districtsOfReport\.includes\(selectedDistrict\);/,
  `const matchesDistrict = selectedDistrict === 'All' || districtsOfReport.includes(selectedDistrict);`
);
content = content.replace(
  /const matchesScopeDropdown = selectedScope === 'all' \|\| scopesOfReport\.includes\(selectedScope\);/,
  `const matchesScopeDropdown = selectedScope === 'All' || scopesOfReport.includes(selectedScope as string);`
);

// For filteredTrails
content = content.replace(
  /const matchesDistrict = selectedDistrict === 'all' \|\| trail\.district_or_region === selectedDistrict;/,
  `const matchesDistrict = selectedDistrict === 'All' || trail.district_or_region === selectedDistrict;`
);
content = content.replace(
  /const matchesScopeDropdown = selectedScope === 'all' \|\| trail\.ecological_scope === selectedScope;/,
  `const matchesScopeDropdown = selectedScope === 'All' || trail.ecological_scope === selectedScope;`
);

// Reset handler
content = content.replace(/setSelectedDistrict\('all'\);/g, "setSelectedDistrict('All');");
content = content.replace(/setSelectedScope\('all'\);/g, "setSelectedScope('All');");

fs.writeFileSync(path, content);
console.log('Fixed Trails page');
