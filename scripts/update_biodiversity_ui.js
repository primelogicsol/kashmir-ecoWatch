const fs = require('fs');
const filePath = 'src/components/common/BiodiversityCategoryPage.tsx';
let code = fs.readFileSync(filePath, 'utf8');

// 1. Add ChevronLeft and ChevronRight to imports
if (!code.includes('ChevronLeft')) {
  code = code.replace(/import \{([\s\S]*?)\} from 'lucide-react';/, (match, p1) => {
    return `import {${p1}, ChevronLeft, ChevronRight} from 'lucide-react';`;
  });
}

// 2. Change state from displayCount to currentPage
code = code.replace(/const \[displayCount, setDisplayCount\] = useState\(9\);/g, 'const [currentPage, setCurrentPage] = useState(1);\n  const itemsPerPage = 9;');

// 3. Reset currentPage when filters change
code = code.replace(/const handleFilterChange = \(newFilters: any\) => \{\s*setActiveFilters\(newFilters\);\s*\};/g, 'const handleFilterChange = (newFilters: any) => {\n    setActiveFilters(newFilters);\n    setCurrentPage(1);\n  };');

// 4. Update the KPI block
const oldKPI = `<Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.Activity;
                return (
                  <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                    <MetricIcon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white tabular-nums">
                      {metric.value.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>`;

const newKPI = `<Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.Activity;
                return (
                  <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                    <MetricIcon className={\`w-4 h-4 \${color.includes('emerald') ? 'text-emerald-500' : 'text-slate-500'} mx-auto mb-1\`} />
                    <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                      {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>`;

code = code.replace(oldKPI, newKPI);

// 5. Update the slice logic
code = code.replace(/filteredSpecies\.slice\(0, displayCount\)/g, 'filteredSpecies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)');

// 6. Replace the Load More block with professional pagination
const oldLoadMoreRegex = /\{filteredSpecies\.length > displayCount && \([\s\S]*?<\/div>\s*\)\}/;

const newPagination = `{filteredSpecies.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12">
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
                    {Array.from({ length: Math.ceil(filteredSpecies.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
                      
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
            )}`;

code = code.replace(oldLoadMoreRegex, newPagination);

fs.writeFileSync(filePath, code);
console.log('Update script completed successfully!');
