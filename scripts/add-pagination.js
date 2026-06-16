const fs = require('fs');

const files = [
  { path: 'src/app/protected-network/species-intelligence/page.tsx', var: 'filteredSpecies' },
  { path: 'src/app/protected-network/corridors-and-connectivity/page.tsx', var: 'filteredCorridors' },
  { path: 'src/app/protected-network/monitoring-and-threats/page.tsx', var: 'filteredThreats' },
  { path: 'src/app/protected-network/reports-and-plans/page.tsx', var: 'filteredReports' },
  { path: 'src/app/protected-network/trails-and-sightings/page.tsx', var: 'filteredTrails' }
];

files.forEach(({ path, var: varName }) => {
  console.log(`Processing ${path}...`);
  let content = fs.readFileSync(path, 'utf8');

  // 1. Add ChevronLeft, ChevronRight
  if (!content.includes('ChevronLeft')) {
    content = content.replace(/\} from 'lucide-react';/, ', ChevronLeft, ChevronRight } from \'lucide-react\';');
  }

  // 2. Add state
  if (!content.includes('const [currentPage, setCurrentPage] = useState(1);')) {
    content = content.replace(
      /const \[selectedScope, setSelectedScope\] = useState\('all'\);/,
      'const [selectedScope, setSelectedScope] = useState(\'all\');\n  const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 9;'
    );
  }

  // 3. Reset pagination on search and filter change
  content = content.replace(/onChange=\{\(e\) => setSearchQuery\(e.target.value\)\}/g, 'onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}');
  content = content.replace(/onChange=\{\(e\) => setSelectedDistrict\(e.target.value\)\}/g, 'onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}');
  content = content.replace(/onChange=\{\(e\) => setSelectedScope\(e.target.value\)\}/g, 'onChange={(e) => { setSelectedScope(e.target.value); setCurrentPage(1); }}');

  // 4. Update map to slice
  const mapSearch = `{${varName}.map((`;
  const mapReplace = `{${varName}.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((`;
  if (content.includes(mapSearch)) {
    content = content.replace(mapSearch, mapReplace);
  }

  // 5. Inject pagination UI before the </div> that closes the grid
  const paginationUI = `
            {${varName}.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12 w-full col-span-full">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.ceil(${varName}.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(${varName}.length / itemsPerPage);
                      
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={\`w-8 h-8 rounded-lg text-sm font-medium transition-colors \${
                              currentPage === page
                                ? 'bg-emerald-500 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }\`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-slate-600 px-1">...</span>;
                      }
                      
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(${varName}.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(${varName}.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, ${varName}.length)} of {${varName}.length} records
                </div>
              </div>
            )}
`;

  if (!content.includes('Math.ceil(')) { // crude check to see if pagination is already there
    const replaceStr = `))}
${paginationUI}          </div>`;
    
    content = content.replace(/\)\)\}\s*<\/div>/, replaceStr);
  }

  fs.writeFileSync(path, content);
});
console.log('Successfully injected pagination into all 5 custom pages');
