const fs = require('fs');
const path = require('path');

// 1. PATCH corridors-and-connectivity/page.tsx
{
  const filePath = path.join(__dirname, '../src/app/protected-network/corridors-and-connectivity/page.tsx');
  let code = fs.readFileSync(filePath, 'utf8');

  // Replace metrics block with banner + 6-card KPI strip
  const marker1 = '{/* Metrics */}';
  const marker2 = '{/* Tab + Filters — single row */}';
  const idx1 = code.indexOf(marker1);
  const idx2 = code.indexOf(marker2);

  if (idx1 !== -1 && idx2 !== -1) {
    const bannerAndKpis = `{/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-teal-950/70 to-slate-900/95 border border-teal-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-teal-400">Trans-Himalayan Wildlife Linkages &amp; Corridors</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Monitoring critical movement pathways including <strong className="text-white">Dachigam–Tral Hangul Axis</strong>, <strong className="text-white">Pir Panjal Markhor Passages</strong>, and <strong className="text-white">Great Himalayan Snow Leopard Corridors</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Corridor Length</div>
              <div className="text-sm font-bold text-teal-300">~1,420 km Mapped</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
              {corridors.length} Verified Linkages
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Corridors */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Corridors</span>
              <Map className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {corridors.length}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Identified Linkages</div>
          </div>

          {/* Card 2: Critical Priority */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Critical Priority</span>
              <TrendingUp className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-red-300">
              {corridors.filter(c => c.priority === 'Critical').length}
            </div>
            <div className="text-[11px] text-red-400/90 font-mono mt-0.5">Immediate Action Req.</div>
          </div>

          {/* Card 3: Active Status */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Active Corridors</span>
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {corridors.filter(c => c.status === 'Active').length}
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Functional Movement</div>
          </div>

          {/* Card 4: Threatened Corridors */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Threatened</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {corridors.filter(c => c.status === 'Threatened' || c.status === 'Degraded').length}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">High Encroachment</div>
          </div>

          {/* Card 5: Core Scope */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Kashmir Core</span>
              <Map className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {coreCount}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Valley Ecosystems</div>
          </div>

          {/* Card 6: Trans & Extended */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Transboundary</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {transCount + extendedCount}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Regional Linkages</div>
          </div>
        </div>
      </div>\n\n      `;
    code = code.slice(0, idx1) + bannerAndKpis + code.slice(idx2);
  }

  // Insert pagination after the corridors loop
  const cardEndMarker = '</Card>\n              </motion.a>\n            ))}';
  const cardEndMarkerCRLF = '</Card>\r\n              </motion.a>\r\n            ))}';
  let targetIdx = code.indexOf(cardEndMarker);
  let len = cardEndMarker.length;
  if (targetIdx === -1) {
    targetIdx = code.indexOf(cardEndMarkerCRLF);
    len = cardEndMarkerCRLF.length;
  }
  if (targetIdx !== -1) {
    const paginationSnippet = `\n\n            {filteredCorridors.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full col-span-full">
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
                    {Array.from({ length: Math.ceil(filteredCorridors.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredCorridors.length / itemsPerPage);
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCorridors.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredCorridors.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCorridors.length)} of {filteredCorridors.length} records
                </div>
              </div>
            )}`;
    code = code.slice(0, targetIdx + len) + paginationSnippet + code.slice(targetIdx + len);
  }

  fs.writeFileSync(filePath, code, 'utf8');
  console.log('Updated corridors-and-connectivity/page.tsx');
}
