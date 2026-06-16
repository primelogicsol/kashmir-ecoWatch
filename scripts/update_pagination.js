const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');

// 1. Add ChevronLeft and ChevronRight to imports
code = code.replace(/import \{([\s\S]*?)\} from 'lucide-react';/, (match, p1) => {
  if (!p1.includes('ChevronLeft')) {
    return `import {${p1}, ChevronLeft, ChevronRight} from 'lucide-react';`;
  }
  return match;
});

// 2. Update state to currentPage instead of displayCount
code = code.replace(/const \[displayCount, setDisplayCount\] = useState\(9\);/, 'const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 9;');

// 3. Reset currentPage when filters change
code = code.replace(/const handleFilterChange = \(newFilters: any\) => \{\s*setActiveFilters\(newFilters\);\s*\};/, 'const handleFilterChange = (newFilters: any) => { setActiveFilters(newFilters); setCurrentPage(1); };');

// 4. Update the render logic
const listRegex = /<div className=\{viewMode === 'grid' \? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'\}>[\s\S]*?<\/div>/;

const newRenderLogic = `
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredSpecies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((species, index) => (
                <motion.div
                  key={species.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (index % 12) * 0.05 }}
                >
                  <BiodiversityCard
                    species={species}
                    onQuickView={handleQuickView}
                    variant={viewMode === 'list' ? 'compact' : 'default'}
                  />
                </motion.div>
              ))}
            </div>`;
code = code.replace(listRegex, newRenderLogic);

// 5. Update pagination UI
const loadMoreRegex = /\{filteredSpecies\.length > displayCount && \([\s\S]*?<\/div>\s*\)\}/;

const paginationUI = `
            {filteredSpecies.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.ceil(filteredSpecies.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
                      
                      // Show first, last, current, and adjacent pages
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
                      
                      // Show ellipses
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-slate-600 px-1">...</span>;
                      }
                      
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredSpecies.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredSpecies.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSpecies.length)} of {filteredSpecies.length} records
                </div>
              </div>
            )}
`;

code = code.replace(loadMoreRegex, paginationUI);

fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
console.log('Successfully updated pagination to a professional style!');
