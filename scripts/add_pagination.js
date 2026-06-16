const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');

// Replace view mode toggle and add pagination state
code = code.replace(
  /const \[drawerOpen, setDrawerOpen\] = useState\(false\);/,
  `const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;`
);

// Reset pagination on filter change
code = code.replace(
  /const handleFilterChange = \(newFilters: any\) => \{/,
  `const handleFilterChange = (newFilters: any) => {
    setCurrentPage(1);`
);

// Slice the species for the current page
code = code.replace(
  /const filteredSpecies = species;/,
  `const filteredSpecies = species; // Will implement actual filtering later
  const totalPages = Math.ceil(filteredSpecies.length / ITEMS_PER_PAGE);
  const paginatedSpecies = filteredSpecies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );`
);

// Update mapping to use paginatedSpecies
code = code.replace(
  /\{filteredSpecies\.map\(\(species, index\)/,
  `{paginatedSpecies.map((species, index)`
);

// Add professional pagination component below the grid
const paginationComponent = `
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1 mx-4">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNum = currentPage;
                if (currentPage < 3) pageNum = idx + 1;
                else if (currentPage > totalPages - 2) pageNum = totalPages - 4 + idx;
                else pageNum = currentPage - 2 + idx;
                
                if (pageNum < 1 || pageNum > totalPages) return null;
                
                return (
                  <Button
                    key={pageNum}
                    variant={pageNum === currentPage ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={pageNum === currentPage 
                      ? \`bg-gradient-to-r \${color}\`
                      : 'text-slate-400 hover:text-white'}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-slate-500">...</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="text-slate-400 hover:text-white"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-white/10 text-white hover:bg-white/5"
            >
              Next
            </Button>
          </div>
        )}
      </div>`;

code = code.replace(
  /          <\/div>\n        \) : \(/,
  `          </div>\n${paginationComponent}\n        ) : (`
);

fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
