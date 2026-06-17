const fs = require('fs');

const files = [
  'src/app/protected-network/corridors-and-connectivity/page.tsx',
  'src/app/protected-network/monitoring-and-threats/page.tsx',
  'src/app/protected-network/reports-and-plans/page.tsx',
  'src/app/protected-network/species-intelligence/page.tsx'
];

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');

  // Replace state declarations
  content = content.replace(/const \[activeTab, setActiveTab\].*?;\n/g, '');
  content = content.replace(/const \[selectedScope, setSelectedScope\].*?;\n/g, "const [selectedEcologicalScope, setSelectedEcologicalScope] = useState<Scope | 'All'>('All');\n");
  
  // Dependencies array
  content = content.replace(/activeTab, searchQuery, selectedDistrict, selectedScope/g, 'searchQuery, selectedDistrict, selectedEcologicalScope');

  // Dropdown value and onChange
  content = content.replace(/value=\{selectedScope\}/g, 'value={selectedEcologicalScope}');
  content = content.replace(/setSelectedScope\(e\.target\.value as Scope\)/g, "setSelectedEcologicalScope(e.target.value as Scope | 'All')");
  
  // Replace the top tabs HTML block
  const tabsRegex = /<div className="flex bg-black\/40 rounded-xl p-1 mb-8[\s\S]*?<\/div>/;
  const newTabsHtml = `
        <div className="flex bg-black/40 rounded-xl p-1 mb-8 overflow-x-auto hide-scrollbar">
          {['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'].map((scope) => (
            <button
              key={scope}
              onClick={() => {
                setSelectedEcologicalScope(scope as any);
                setSelectedDistrict('All');
                setCurrentPage(1);
              }}
              className={\`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap \${
                selectedEcologicalScope === scope 
                  ? 'bg-emerald-500 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }\`}
            >
              {scope}
            </button>
          ))}
        </div>
`;
  content = content.replace(tabsRegex, newTabsHtml);

  if (file.includes('corridors')) {
    content = content.replace(/\/\/ 1\. Tab scope filter[\s\S]*?matchesTab = .*?;/g, '');
    content = content.replace(/\/\/ 4\. Ecological Scope Dropdown[\s\S]*?matchesScopeDropdown = .*?;/g, "const matchesScope = selectedEcologicalScope === 'All' || getScopeForUnit((corridor as any).district || ((corridor as any).districts && (corridor as any).districts[0])) === selectedEcologicalScope || (corridor as any).scope === selectedEcologicalScope;");
    content = content.replace(/matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown/, 'matchesSearch && matchesDistrict && matchesScope');
  } 
  else if (file.includes('monitoring-and-threats')) {
    content = content.replace(/\/\/ 1\. Tab scope filter[\s\S]*?matchesTab = .*?;/g, '');
    content = content.replace(/\/\/ 4\. Ecological Scope Dropdown[\s\S]*?matchesScopeDropdown = .*?;/g, "const matchesScope = selectedEcologicalScope === 'All' || getScopeForUnit((threat as any).district || ((threat as any).districts && (threat as any).districts[0])) === selectedEcologicalScope || (threat as any).scope === selectedEcologicalScope;");
    content = content.replace(/matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown/, 'matchesSearch && matchesDistrict && matchesScope');
  }
  else if (file.includes('reports-and-plans')) {
    content = content.replace(/\/\/ 1\. Tab scope filter[\s\S]*?matchesTab = .*?;/g, '');
    content = content.replace(/\/\/ 4\. Ecological Scope Dropdown[\s\S]*?matchesScopeDropdown = .*?;/g, "const matchesScope = selectedEcologicalScope === 'All' || getScopeForUnit((plan as any).district || ((plan as any).districts && (plan as any).districts[0])) === selectedEcologicalScope || (plan as any).scope === selectedEcologicalScope;");
    content = content.replace(/matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown/, 'matchesSearch && matchesDistrict && matchesScope');
  }
  else if (file.includes('species-intelligence')) {
    content = content.replace(/\/\/ 1\. Tab scope filter[\s\S]*?matchesTab = .*?;/g, '');
    content = content.replace(/\/\/ 4\. Ecological Scope Dropdown[\s\S]*?matchesScopeDropdown = .*?;/g, "const matchesScope = selectedEcologicalScope === 'All' || getScopeForUnit((species as any).district || ((species as any).districts && (species as any).districts[0])) === selectedEcologicalScope || (species as any).scope === selectedEcologicalScope;");
    content = content.replace(/matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown/, 'matchesSearch && matchesDistrict && matchesScope');
  }

  fs.writeFileSync(file, content);
  console.log('Fixed', file);
}