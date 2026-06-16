const fs = require('fs');
let code = fs.readFileSync('src/components/common/BiodiversityCategoryPage.tsx', 'utf8');

const regex = /\{filteredSpecies\.map\(\(species, index\) => \([\s\S]*?<\/div>\n        \) : \(/;

const newGrid = `{currentSpecies.map((species, index) => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BiodiversityCard
                  species={species}
                  onQuickView={handleQuickView}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                />
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="border-white/10 text-white bg-slate-900/50 hover:bg-slate-800"
              >
                Previous
              </Button>
              
              <div className="flex items-center gap-1 mx-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                  .map((p, i, arr) => (
                    <React.Fragment key={p}>
                      {i > 0 && arr[i - 1] !== p - 1 && (
                        <span className="text-slate-500 px-2">...</span>
                      )}
                      <button
                        onClick={() => {
                          setCurrentPage(p);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={\`w-10 h-10 rounded-lg text-sm font-medium transition-colors \${
                          currentPage === p
                            ? 'bg-forest-500 text-white'
                            : 'text-slate-400 hover:bg-white/10 hover:text-white'
                        }\`}
                      >
                        {p}
                      </button>
                    </React.Fragment>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="border-white/10 text-white bg-slate-900/50 hover:bg-slate-800"
              >
                Next
              </Button>
            </div>
          )}
        </>
      ) : (`;

code = code.replace(regex, newGrid);

fs.writeFileSync('src/components/common/BiodiversityCategoryPage.tsx', code);
