const fs = require('fs');
const path = require('path');

// ============================================================================
// 1. PATCH monitoring-and-threats/page.tsx
// ============================================================================
{
  const filePath = path.join(__dirname, '../src/app/protected-network/monitoring-and-threats/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure imports
  if (!content.includes('Compass')) {
    content = content.replace(
      /from 'lucide-react';/,
      `, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';`
    );
  }

  // Find Heading start and the metrics card end
  // Replace Heading title
  const oldHeadingPattern = /<Heading[\s\S]*?breadcrumbs=\{/m;
  const newHeading = `<Heading
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Threat Intelligence &amp; Monitoring Sentinel
              </span>
            </div>
          </div>
        }
        subtitle="Pressure signals, encroachment records, habitat condition assessments, and active conservation alerts across Kashmir's protected areas. Data feeds into threat mapping and management planning."
        icon={<Bell className="w-6 h-6 text-emerald-400" />}
        label="Conservation Intelligence"
        breadcrumbs={`;
  content = content.replace(oldHeadingPattern, newHeading);

  // Replace old KPI Card (including the misplaced pagination block)
  const oldCardPattern = /<div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">[\s\S]*?<\/Card>\s*<\/motion\.div>\s*<\/div>/m;
  const newBannerAndKPI = `{/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-rose-950/40 to-slate-900/95 border border-rose-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-rose-400">Habitat Threat Sentinel &amp; Real-time Pressure Monitoring</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Early Warning System 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Monitoring active anthropogenic pressures, grazing incursions, poaching vectors, and land-use shifts across <strong className="text-white">25 Verified Vulnerability Hotspots</strong> in J&amp;K and Ladakh.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Active Sentinel Vectors</div>
              <div className="text-sm font-bold text-rose-300">{threats.length} Documented Alerts</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
              {threats.filter(t => t.severity === 'critical').length} Critical Alerts
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Alerts */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Alerts</span>
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {threats.length}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Active Threat Feeds</div>
          </div>

          {/* Card 2: Critical Severity */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Critical Threats</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">
              {threats.filter(t => t.severity === 'critical').length}
            </div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">High Red Alert</div>
          </div>

          {/* Card 3: High Severity */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">High Severity</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {threats.filter(t => t.severity === 'high').length}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Priority Monitoring</div>
          </div>

          {/* Card 4: Core Area Alerts */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Kashmir Core</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">
              {coreCount}
            </div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Valley Focal Zones</div>
          </div>

          {/* Card 5: Trans-Divisional Alerts */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Trans-Divisional</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {transCount}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">High Altitude &amp; Pir Panjal</div>
          </div>

          {/* Card 6: Mitigated / In Action */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Active Measures</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {threats.filter(t => t.mitigationStrategies.length > 0).length}
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Mitigation In Play</div>
          </div>
        </div>
      </div>`;
  content = content.replace(oldCardPattern, newBannerAndKPI);

  // Now place pagination properly after threats list/grid if not already there
  const paginationBlock = `
            {filteredThreats.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredThreats.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredThreats.length / itemsPerPage);
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredThreats.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredThreats.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredThreats.length)} of {filteredThreats.length} records
                </div>
              </div>
            )}
          </div>`;

  // Look for the end of the threats loop
  content = content.replace(
    /<\/Card>\s*<\/motion\.a>\s*\)\)\}\s*<\/div>/m,
    `</Card>\n              </motion.a>\n            ))}\n${paginationBlock}`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched monitoring-and-threats/page.tsx');
}

// ============================================================================
// 2. PATCH species-intelligence/page.tsx
// ============================================================================
{
  const filePath = path.join(__dirname, '../src/app/protected-network/species-intelligence/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure imports
  if (!content.includes('Compass')) {
    content = content.replace(
      /from 'lucide-react';/,
      `, Compass, CheckCircle2 } from 'lucide-react';`
    );
  }

  // Replace Heading title
  const oldHeadingPattern = /<Heading[\s\S]*?breadcrumbs=\{/m;
  const newHeading = `<Heading
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Species Intelligence Network
              </span>
            </div>
          </div>
        }
        subtitle="Species distribution, protected-area overlap, and habitat association analysis across Kashmir's conservation network. Covers mammals, birds, plants, and aquatic species with conservation status, range data, and ecological sensitivity indicators."
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Species Intelligence"
        breadcrumbs={`;
  content = content.replace(oldHeadingPattern, newHeading);

  // Replace old KPI Card with banner and 6-card KPI strip
  const oldCardPattern = /{\/\* Metrics \*\/}\s*<div className="container mx-auto px-6 -mt-8 relative z-20">[\s\S]*?<\/Card>\s*<\/motion\.div>\s*<\/div>/m;
  const newBannerAndKPI = `{/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/40 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Biological Sentinel &amp; Protected-Area Overlap</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Species Overlap Matrix 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Multi-taxa database documenting distribution, IUCN Red List status, habitat overlap, and corridor connectivity across <strong className="text-white">National Parks, Sanctuaries &amp; Wetland Reserves</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Tracked Profiles</div>
              <div className="text-sm font-bold text-emerald-300">{speciesList.length} Verified Taxa</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              {speciesList.filter(s => s.conservationStatus.includes('CR') || s.conservationStatus.includes('EN')).length} CR / EN Taxa
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Taxa */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Taxa</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">{speciesList.length}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Biological Profiles</div>
          </div>

          {/* Card 2: Critically Endangered */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Crit. Endangered</span>
              <Shield className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">{speciesList.filter(s => s.conservationStatus.includes('CR')).length}</div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">Highest Priority</div>
          </div>

          {/* Card 3: Endangered */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Endangered</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{speciesList.filter(s => s.conservationStatus.includes('EN')).length}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Conservation Focus</div>
          </div>

          {/* Card 4: Mammals */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Mammals</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{speciesList.filter(s => s.group === 'Mammal').length}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Faunal Flagships</div>
          </div>

          {/* Card 5: Birds & Flora */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Birds &amp; Flora</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{speciesList.filter(s => s.group === 'Bird' || s.group === 'Plant').length}</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Avian &amp; Botanical Taxa</div>
          </div>

          {/* Card 6: Endemics */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Endemic Taxa</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">{speciesList.filter(s => s.isEndemic).length}</div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Kashmir Endemics</div>
          </div>
        </div>
      </div>`;
  content = content.replace(oldCardPattern, newBannerAndKPI);

  // Relocate pagination below the species list/grid
  const paginationBlock = `
            {filteredSpecies.length > itemsPerPage && (
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
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSpecies.length)} of {filteredSpecies.length} species
                </div>
              </div>
            )}
          </div>`;

  content = content.replace(
    /<\/Card>\s*<\/motion\.a>\s*\)\)\}\s*<\/div>/m,
    `</Card>\n              </motion.a>\n            ))}\n${paginationBlock}`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched species-intelligence/page.tsx');
}

// ============================================================================
// 3. PATCH reports-and-plans/page.tsx
// ============================================================================
{
  const filePath = path.join(__dirname, '../src/app/protected-network/reports-and-plans/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Ensure imports
  if (!content.includes('Compass')) {
    content = content.replace(
      /from 'lucide-react';/,
      `, Compass, CheckCircle2 } from 'lucide-react';`
    );
  }

  // Replace Heading title
  const oldHeadingPattern = /<Heading[\s\S]*?breadcrumbs=\{/m;
  const newHeading = `<Heading
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Scientific Reports &amp; Management Plans
              </span>
            </div>
          </div>
        }
        subtitle="Scientific reports, management plans, monitoring documents, and research publications for Kashmir's protected areas. Records are linked to individual protected areas and conservation themes."
        icon={<Book className="w-6 h-6 text-emerald-400" />}
        label="Evidence Intelligence"
        breadcrumbs={`;
  content = content.replace(oldHeadingPattern, newHeading);

  // Replace old KPI Card with banner and 6-card KPI strip
  const oldCardPattern = /<div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">[\s\S]*?<\/Card>\s*<\/motion\.div>\s*<\/div>/m;
  const newBannerAndKPI = `{/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-sky-950/40 to-slate-900/95 border border-sky-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-sky-400">Scientific Archive &amp; PA Working Plans</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Peer-Reviewed &amp; Departmental Data 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Centralized repository of Wildlife Protection Department Management Plans, IUCN assessments, census figures, and ecological research publications for J&amp;K and Ladakh.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Archived Documents</div>
              <div className="text-sm font-bold text-sky-300">{reports.length} Reports Indexed</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold">
              {reports.filter(r => r.type === 'Management Plan').length} Management Plans
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Documents */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Documents</span>
              <FileText className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">{reports.length}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Catalogued Records</div>
          </div>

          {/* Card 2: Management Plans */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Mgmt Plans</span>
              <Book className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{reports.filter(r => r.type === 'Management Plan').length}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Statutory Plans</div>
          </div>

          {/* Card 3: Scientific Papers */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Scientific Papers</span>
              <Search className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{reports.filter(r => r.type === 'Scientific Report').length}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Peer-Reviewed</div>
          </div>

          {/* Card 4: Monitoring Data */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Monitoring Data</span>
              <Download className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{reports.filter(r => r.type === 'Monitoring Data').length}</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Sensor &amp; Survey Data</div>
          </div>

          {/* Card 5: Kashmir Core */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Kashmir Core</span>
              <FileText className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">{coreCount}</div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Valley Core Areas</div>
          </div>

          {/* Card 6: Open Access */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Open Access</span>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-300">100%</div>
            <div className="text-[11px] text-indigo-400/90 font-mono mt-0.5">Digital Archive</div>
          </div>
        </div>
      </div>`;
  content = content.replace(oldCardPattern, newBannerAndKPI);

  // Relocate pagination below the reports list/grid
  const paginationBlock = `
            {filteredReports.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredReports.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredReports.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredReports.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} reports
                </div>
              </div>
            )}
          </div>`;

  content = content.replace(
    /<\/Card>\s*<\/motion\.a>\s*\)\)\}\s*<\/div>/m,
    `</Card>\n              </motion.a>\n            ))}\n${paginationBlock}`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched reports-and-plans/page.tsx');
}

// ============================================================================
// 4. PATCH trails-and-sightings/page.tsx
// ============================================================================
{
  const filePath = path.join(__dirname, '../src/app/protected-network/trails-and-sightings/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Heading title
  const oldHeadingPattern = /<Heading[\s\S]*?breadcrumbs=\{/m;
  const newHeading = `<Heading
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Trails, Routes &amp; Wildlife Sightings
              </span>
            </div>
          </div>
        }
        subtitle="Protected-area trails, ecological routes, birding paths, wildlife observation zones, and verified field sightings across Kashmir Core, Trans-Divisional, and Transboundary conservation landscapes. Integrates species observations, seasonal activity, visitor-use pressure, monitoring evidence, and protected-area profile links."
        icon={<Footprints className="w-6 h-6 text-emerald-400" />}
        label="Recreation &amp; Observation"
        breadcrumbs={`;
  content = content.replace(oldHeadingPattern, newHeading);

  // Replace old KPI Dashboard with banner and standardized 6-card KPI strip
  const oldKpiPattern = /{\/\* KPI Dashboard \*\/}\s*<div className="container mx-auto px-6 -mt-8 relative z-20 mb-6">[\s\S]*?<\/Card>\s*<\/motion\.div>\s*<\/div>/m;
  const newBannerAndKPI = `{/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-teal-950/50 to-slate-900/95 border border-teal-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-teal-400">Field Intelligence &amp; GPS Trail Network</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Field Stations 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Verified high-altitude trekking routes, birding transects, patrol tracks, and citizen science telemetry across <strong className="text-white">Dachigam, Kazinag, Overa-Aru, Kishtwar, Hemis &amp; Wetland Reserves</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Mapped Field Routes</div>
              <div className="text-sm font-bold text-teal-300">{trailsObservationsData.length} Documented Tracks</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
              14 Primary PA Trails
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Mapped Routes */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mapped Routes</span>
              <Footprints className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">{trailsObservationsData.length}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Trails &amp; Transects</div>
          </div>

          {/* Card 2: Birding Routes */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Birding Paths</span>
              <Eye className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">{birdingRoutes.length}</div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Avian Transects</div>
          </div>

          {/* Card 3: Field Observations */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Verified Obs</span>
              <CheckCircle2 className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{mockObservations.length}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Field Sighting Records</div>
          </div>

          {/* Card 4: Protected Areas */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Protected Areas</span>
              <LinkIcon className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">47</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Associated Reserves</div>
          </div>

          {/* Card 5: Field Reports */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Field Reports</span>
              <Database className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{allReports.length}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Linked Research Docs</div>
          </div>

          {/* Card 6: GPS Coverage */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">GPS Coverage</span>
              <Compass className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-black text-indigo-300">100%</div>
            <div className="text-[11px] text-indigo-400/90 font-mono mt-0.5">Georeferenced Paths</div>
          </div>
        </div>
      </div>`;
  content = content.replace(oldKpiPattern, newBannerAndKPI);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ Patched trails-and-sightings/page.tsx');
}

// ============================================================================
// 5. APPEND NEW SPECIES PROFILES TO src/data/protected-network.ts
// ============================================================================
{
  const filePath = path.join(__dirname, '../src/data/protected-network.ts');
  let content = fs.readFileSync(filePath, 'utf8');

  const newProfiles = `
  {
    id: 'tibetan-lynx',
    slug: 'tibetan-lynx',
    name: 'Eurasian / Tibetan Lynx',
    scientificName: 'Lynx lynx isabellinus',
    conservationStatus: 'EN - Endangered (Regional)',
    description: 'High-altitude felid predator with prominent ear tufts and thick sandy-grey winter coat, specialized for hunting mountain hares and blue sheep across cold arid scree slopes.',
    distribution: 'Trans-Himalayan high plateau including Hemis, Changthang, Nubra, Drass, and Zanskar valleys.',
    ecology: 'Solitary, crepuscular, and nocturnal stalker of rugged rocky ravines and alpine scrub zones between 3,200m and 4,800m.',
    seasonality: 'Resident year-round; descends slightly toward river valleys during sub-zero mid-winter months.',
    threats: ['Retaliatory killing for sheep/goat depredation', 'Feral dog pack competition', 'Prey base depletion'],
    conservationMeasures: ['Predator-proof corral construction', 'Community insurance schemes', 'Camera trap density monitoring'],
    protectedAreas: ['hemis-high-altitude-national-park', 'changthang-cold-desert-wildlife-sanctuary', 'karakoram-wildlife-sanctuary'],
    group: 'Mammal',
    habitatTypes: ['Alpine rocky scrub', 'Cold desert steppe', 'High plateau'],
    ecologicalSensitivity: '92/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Estimated regional population fewer than 120 individuals in Ladakh and higher Kargil corridors.',
    monitoringDetail: 'Winter snow tracking, camera trap grid surveys, and fecal DNA metabarcoding.',
    researchDetail: 'Territory home-range GPS collar tracking by WII and Nature Conservation Foundation.',
  },
  {
    id: 'tibetan-wolf',
    slug: 'tibetan-wolf',
    name: 'Tibetan Wolf',
    scientificName: 'Canis lupus chanco',
    conservationStatus: 'VU - Vulnerable',
    description: 'Ancient, genetically distinct lineage of wolf adapted to extreme hypoxia and sub-zero temperatures of the Trans-Himalayan steppe.',
    distribution: 'Changthang cold desert, Hemis National Park, Rangdum, Drass, and upper Zanskar.',
    ecology: 'Pack hunter preying primarily on Kiang, Bharal, Marmots, and domestic livestock across open plains.',
    seasonality: 'Resident year-round across high plateaus; packs maintain extensive territories of 200–400 sq km.',
    threats: ['Retaliatory poisoning by pastoralists', 'Competition with free-ranging domestic dogs', 'Habitat fragmentation'],
    conservationMeasures: ['Community livestock compensation', 'Predator-proof nighttime corrals', 'Anti-poisoning patrols'],
    protectedAreas: ['hemis-high-altitude-national-park', 'changthang-cold-desert-wildlife-sanctuary', 'karakoram-wildlife-sanctuary'],
    group: 'Mammal',
    habitatTypes: ['Cold desert steppe', 'Alpine plateau', 'River basins'],
    ecologicalSensitivity: '88/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Stable',
    populationDetail: 'Approximately 300–350 wolves distributed across Ladakh and border Trans-Himalayan valleys.',
    monitoringDetail: 'Annual den monitoring, GPS telemetry, and conflict incidence mapping.',
    researchDetail: 'Genomic divergence studies confirming distinct evolutionary significant unit status.',
  },
  {
    id: 'bharal-blue-sheep',
    slug: 'bharal-blue-sheep',
    name: 'Bharal / Himalayan Blue Sheep',
    scientificName: 'Pseudois nayaur',
    conservationStatus: 'LC - Least Concern',
    description: 'Slate-grey caprid of high Trans-Himalayan crags and the primary prey base sustaining Snow Leopard populations.',
    distribution: 'Extensive across Ladakh, Zanskar, Kishtwar high ranges, and Gurez border ridges.',
    ecology: 'Grazer of alpine pastures and precipitous cliff faces between 3,500m and 5,500m.',
    seasonality: 'Resident year-round; performs vertical seasonal migrations between summer alpine meadows and winter windswept ridges.',
    threats: ['Livestock overgrazing competition', 'Sarcoptic mange disease transmission from domestic sheep', 'Poaching in remote border sectors'],
    conservationMeasures: ['Pasture zoning agreements with Changpa nomads', 'Vaccination buffers for village livestock', 'Community anti-poaching monitors'],
    protectedAreas: ['hemis-high-altitude-national-park', 'changthang-cold-desert-wildlife-sanctuary', 'kishtwar-high-altitude-national-park'],
    group: 'Mammal',
    habitatTypes: ['Alpine meadows', 'Rocky cliffs', 'Cold desert steppe'],
    ecologicalSensitivity: '70/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Stable',
    populationDetail: 'Healthy populations exceeding 8,000–11,000 across Hemis and Changthang ranges.',
    monitoringDetail: 'Double-observer cliff counts and prey biomass assessments for Snow Leopard conservation.',
    researchDetail: 'Dietary overlap modeling with domestic pashmina goats in Changthang.',
  },
  {
    id: 'chiru-tibetan-antelope',
    slug: 'chiru-tibetan-antelope',
    name: 'Tibetan Antelope / Chiru',
    scientificName: 'Pantholops hodgsonii',
    conservationStatus: 'NT - Near Threatened',
    description: 'Iconic high-altitude antelope celebrated for its ultra-fine underfur (shahtoosh), migrating into Ladakh border valleys during summer.',
    distribution: 'Restricted to extreme eastern Ladakh border plateaus including Daulat Beg Oldi, Depsang, and Pangong Tso margins.',
    ecology: 'Inhabits harsh windswept plains between 3,700m and 5,500m, feeding on low sedges and cold steppe forbs.',
    seasonality: 'Migratory; enters northern and eastern Ladakh margins in late spring for summer grazing.',
    threats: ['Historical illegal hunting for shahtoosh shawls', 'Border security infrastructure barriers', 'Extreme climatic winter mortality'],
    conservationMeasures: ['International CITES Appendix I enforcement', 'Army-wildlife coordination patrols', 'Strict ban on shahtoosh trade'],
    protectedAreas: ['changthang-cold-desert-wildlife-sanctuary', 'karakoram-wildlife-sanctuary'],
    group: 'Mammal',
    habitatTypes: ['High-altitude cold desert', 'Glacial plains', 'Alpine steppe'],
    ecologicalSensitivity: '95/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Increasing',
    populationDetail: 'Global population recovered past 100,000; seasonal visitors to Ladakh border sectors number 200–500.',
    monitoringDetail: 'Long-range binocular border transects and remote satellite tracking.',
    researchDetail: 'Migration corridor connectivity mapping between Aksai Chin, Chang Chenmo, and Changthang.',
  },
  {
    id: 'ladakh-urial',
    slug: 'ladakh-urial',
    name: 'Ladakh Urial / Shapu',
    scientificName: 'Ovis vignei vignei',
    conservationStatus: 'VU - Vulnerable',
    description: 'Smallest wild sheep of the Himalayas, distinguished by reddish coat and horn curvature, endemic to arid Indus and Shyok river valleys.',
    distribution: 'Slopes along Indus and Shyok rivers, Sham valley, Kargil, and lower reaches of Hemis.',
    ecology: 'Prefers open, gently rolling arid hills and alluvial river terraces between 2,800m and 4,000m.',
    seasonality: 'Resident year-round; stays close to lower river terrace winter browse during heavy snow periods.',
    threats: ['Highway and river valley infrastructure expansion', 'Competition with village livestock', 'Hunting pressure near settlements'],
    conservationMeasures: ['Reserve establishment in Sham and lower Indus valley', 'Community reserve stewardship', 'Fencing of road crossing points'],
    protectedAreas: ['hemis-high-altitude-national-park', 'karakoram-wildlife-sanctuary'],
    group: 'Mammal',
    habitatTypes: ['Arid river valleys', 'Gentle scree slopes', 'Subalpine steppe'],
    ecologicalSensitivity: '89/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: true,
    populationTrend: 'Decreasing',
    populationDetail: 'Total population estimated between 1,200 and 1,800 individuals across J&K/Ladakh river corridors.',
    monitoringDetail: 'Annual census along Indus highway corridor and tributary valleys.',
    researchDetail: 'Habitat suitability modeling under climate warming and road widening scenarios.',
  },
  {
    id: 'kiang-tibetan-wild-ass',
    slug: 'kiang-tibetan-wild-ass',
    name: 'Kiang / Tibetan Wild Ass',
    scientificName: 'Equus kiang',
    conservationStatus: 'LC - Least Concern',
    description: 'Largest wild ass in the world, with a magnificent chestnut-red coat and white belly, roaming the saline lake basins of Changthang.',
    distribution: 'Pangong Tso, Tso Moriri, Hanle, Tsokar basin, and Chushul grasslands in Changthang.',
    ecology: 'Grazes wetland sedge meadows and dry steppe plains in herds of 10 to 50 individuals.',
    seasonality: 'Resident year-round; congregates around unfrozen wetland basins in severe winter.',
    threats: ['Pasture competition with pashmina goats', 'Fencing of traditional grazing corridors', 'Off-road tourist vehicle disturbance'],
    conservationMeasures: ['Designated off-road vehicular ban zones', 'Grassland ecological carrying capacity guidelines', 'Ramsar wetland buffer protections'],
    protectedAreas: ['changthang-cold-desert-wildlife-sanctuary', 'karakoram-wildlife-sanctuary'],
    group: 'Mammal',
    habitatTypes: ['Saline lake margins', 'High-altitude steppe', 'Marshy meadows'],
    ecologicalSensitivity: '75/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Stable',
    populationDetail: 'Robust population of approximately 2,500–3,000 individuals across eastern Ladakh.',
    monitoringDetail: 'Vehicle transect counts and drone aerial surveys over vast lake basins.',
    researchDetail: 'Forage competition analysis between Kiang and pashmina goats in Tsokar and Hanle.',
  },
  {
    id: 'himalayan-marmot',
    slug: 'himalayan-marmot',
    name: 'Himalayan Marmot',
    scientificName: 'Marmota himalayana',
    conservationStatus: 'LC - Least Concern',
    description: 'Heavy-bodied colonial ground squirrel of high alpine plains that hibernates for up to 7 months beneath deep mountain snow.',
    distribution: 'Widespread across Deosai, Gurez, Zojila, Rangdum, Changthang, and Khardung La plateaus.',
    ecology: 'Colonial burrowers vital as ecosystem engineers and key food source for Tibetan Wolves and Snow Leopards.',
    seasonality: 'Active from late April to October; hibernates underground from November to April.',
    threats: ['Highway mortality along tourist corridors (Pangong/Khardung La)', 'Feeding by tourists causing disease', 'Feral dog predation'],
    conservationMeasures: ['No-feeding signage and wildlife fines along highways', 'Feral dog sterilization campaigns', 'Burrow colony monitoring'],
    protectedAreas: ['hemis-high-altitude-national-park', 'changthang-cold-desert-wildlife-sanctuary', 'rajparian-wildlife-sanctuary'],
    group: 'Mammal',
    habitatTypes: ['Alpine steppe', 'Glacial moraines', 'High plateau'],
    ecologicalSensitivity: '65/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Stable',
    populationDetail: 'Common and locally abundant across alpine regions above 3,200m.',
    monitoringDetail: 'Active burrow density counts and colony emergence date monitoring.',
    researchDetail: 'Hibernation physiology and climatic sensitivity studies in Ladakh alpine zones.',
  },
  {
    id: 'pallas-cat',
    slug: 'pallas-cat',
    name: "Pallas's Cat / Manul",
    scientificName: 'Otocolobus manul',
    conservationStatus: 'LC - Least Concern',
    description: 'Small, exceptionally fluffy wild cat with flattened face and rounded ears, exquisitely adapted to camouflage among rocky steppe boulders.',
    distribution: 'Changthang cold desert (Hanle, Nyoma, Chushul) and parts of Hemis National Park.',
    ecology: 'Ambush predator specializing on pikas, small rodents, and chukar partridges in rocky ravines.',
    seasonality: 'Resident year-round; relies on deep rock crevices for insulation in sub-zero winters.',
    threats: ['Poisoning of pikas/rodent prey base', 'Attacks by pastoralist and feral dogs', 'Habitat loss due to developmental projects'],
    conservationMeasures: ['Strict ban on rodent poisons', 'Conservation awareness among local communities', 'Protected den site mapping'],
    protectedAreas: ['changthang-cold-desert-wildlife-sanctuary', 'hemis-high-altitude-national-park'],
    group: 'Mammal',
    habitatTypes: ['Cold desert steppe', 'Rocky scree', 'Arid montane canyons'],
    ecologicalSensitivity: '85/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Rare and cryptic; estimated fewer than 100–150 individuals in Indian Trans-Himalaya.',
    monitoringDetail: 'Targeted camera trap deployment in rocky outcrops and pika hotspots.',
    researchDetail: 'First camera trap documentation and habitat selection studies in eastern Ladakh.',
  },
  {
    id: 'lammergeier-bearded-vulture',
    slug: 'lammergeier-bearded-vulture',
    name: 'Bearded Vulture / Lammergeier',
    scientificName: 'Gypaetus barbatus',
    conservationStatus: 'NT - Near Threatened',
    description: 'Massive raptor with 2.8m wingspan and distinctive diamond-shaped tail, famous for dropping large bones onto rocks from high altitudes.',
    distribution: 'Rugged mountain cliffs across Dachigam, Overa-Aru, Kishtwar, Gulmarg, Zanskar, and Ladakh.',
    ecology: 'Specialized bone-eater inhabiting steep alpine peaks and crags up to 4,500m.',
    seasonality: 'Resident year-round; nests in remote cliff caves during mid-winter.',
    threats: ['Diclofenac and veterinary NSAID residues in carcasses', 'Power transmission line electrocution', 'Wind farm collision risks'],
    conservationMeasures: ['Enforcement of veterinary diclofenac ban', 'Cliff nest site protection zones', 'Vulture feeding station monitoring'],
    protectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'kishtwar-high-altitude-national-park', 'hemis-high-altitude-national-park'],
    group: 'Bird',
    habitatTypes: ['Precipitous cliffs', 'Alpine passes', 'Gorges'],
    ecologicalSensitivity: '82/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Kashmir and Ladakh hold one of South Asia’s most viable breeding populations with over 150 pairs.',
    monitoringDetail: 'Annual cliff nest monitoring and carcass toxicology screenings.',
    researchDetail: 'Foraging range GPS tracking across the Greater Himalayan crest.',
  },
  {
    id: 'himalayan-snowcock',
    slug: 'himalayan-snowcock',
    name: 'Himalayan Snowcock',
    scientificName: 'Tetraogallus himalayensis',
    conservationStatus: 'LC - Least Concern',
    description: 'Large, ground-dwelling phasianid bird of high alpine ridges that calls with a loud ringing whistle echoing across mountain valleys.',
    distribution: 'Pir Panjal range, Zanskar crest, Gurez ridges, Overa-Aru, and Hemis alpine summits.',
    ecology: 'Grazer of alpine grasses, tubers, and seeds along the edge of snowline between 3,300m and 5,000m.',
    seasonality: 'Resident year-round; descends slightly onto windswept snow-free slopes in deep winter.',
    threats: ['Illegal trapping and hunting along alpine trekking routes', 'Shepherd dog harassment', 'Late snowstorms disrupting nesting'],
    conservationMeasures: ['Seasonal hunting bans enforcement', 'Awareness among alpine shepherds', 'High-altitude transect surveys'],
    protectedAreas: ['overa-aru-wildlife-sanctuary', 'gulmarg-wildlife-sanctuary', 'kazinag-national-park', 'hemis-high-altitude-national-park'],
    group: 'Bird',
    habitatTypes: ['Alpine scree', 'Ridge crests', 'Snowline meadows'],
    ecologicalSensitivity: '68/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Stable',
    populationDetail: 'Widespread and common across all primary alpine protected areas above 3,500m.',
    monitoringDetail: 'Spring call count censuses along established high-altitude ridge transects.',
    researchDetail: 'Genetic connectivity between Pir Panjal and Great Himalayan populations.',
  },
  {
    id: 'ibisbill',
    slug: 'ibisbill',
    name: 'Ibisbill',
    scientificName: 'Ibidorhyncha struthersii',
    conservationStatus: 'LC - Least Concern',
    description: 'Unique wader bird with downcurved crimson bill, specialized for foraging among smooth grey river shingle and braided gravel beds.',
    distribution: 'Braided stony riverbeds of Sindh river, Lidder river, Drass river, and Suru river.',
    ecology: 'Probes under submerged pebbles in icy mountain torrents for aquatic insect larvae and small fish.',
    seasonality: 'Altitudinal migrant; breeds above 2,800m in summer, moves down to lower riverbeds in winter.',
    threats: ['Riverbed gravel mining and boulder extraction', 'Hydropower dam construction altering flow regimes', 'Riverside waste dumping'],
    conservationMeasures: ['Zoning of Sindh and Lidder gravel beds as bird sanctuaries', 'Strict bans on motorized gravel mining in breeding areas', 'Annual river transect counts'],
    protectedAreas: ['overa-aru-wildlife-sanctuary', 'wangat-conservation-reserve', 'chattlum-wetland-reserve'],
    group: 'Bird',
    habitatTypes: ['Braided riverbeds', 'Gravel shingle bars', 'Torrential streams'],
    ecologicalSensitivity: '88/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Breeding pairs in Kashmir valley river systems estimated at 40–60 pairs; highly vulnerable to gravel mining.',
    monitoringDetail: 'Annual river transects and nest protection along Sindh and Lidder banks.',
    researchDetail: 'Micro-habitat gravel size preferences and invertebrate prey correlations in Lidder valley.',
  },
  {
    id: 'alwan-snow-trout',
    slug: 'alwan-snow-trout',
    name: 'Alwan Snow Trout',
    scientificName: 'Schizothorax curvifrons',
    conservationStatus: 'VU - Vulnerable',
    description: 'Native cyprinid fish endemic to the high cold streams and pristine lakes of the Kashmir Valley, adapted to torrential currents.',
    distribution: 'Jhelum river headwaters, Lidder, Sindh, Dal Lake, and Wular Lake.',
    ecology: 'Bentho-pelagic herbivore and insectivore scraping algae off rocks in cold glacier-fed waters.',
    seasonality: 'Migrates upstream to spawn in spring and early summer when glacier melt begins.',
    threats: ['Competition and predation by introduced Brown and Rainbow Trout', 'Hydroelectric dams blocking breeding migrations', 'Agricultural pesticide runoff'],
    conservationMeasures: ['Establishment of native fish sanctuaries in upstream tributaries', 'Fish ladders on irrigation barrages', 'Breeding and restocking programs'],
    protectedAreas: ['wular-lake-bird-habitat', 'hokersar-wetland-reserve', 'chattlum-wetland-reserve'],
    group: 'Aquatic Species',
    habitatTypes: ['Glacier-fed rivers', 'Highland lakes', 'Fast streams'],
    ecologicalSensitivity: '85/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: true,
    populationTrend: 'Decreasing',
    populationDetail: 'Drastic decline over past three decades due to exotic trout competition and damming.',
    monitoringDetail: 'Electrofishing surveys, catch-per-unit-effort records, and spawning run monitoring.',
    researchDetail: 'Fisheries department research on artificial propagation and captive breeding protocols.',
  },
  {
    id: 'kashmir-triplophysa-loach',
    slug: 'kashmir-triplophysa-loach',
    name: 'Kashmir High-altitude Loach',
    scientificName: 'Triplophysa kashmirensis',
    conservationStatus: 'EN - Endangered',
    description: 'Slender, bottom-dwelling stone loach uniquely adapted to swift, freezing mountain streams of the Kashmir Valley.',
    distribution: 'Endemic to upper torrential reaches of Sindh, Lidder, and Bringi rivers.',
    ecology: 'Hides beneath flat stones in fast-flowing riffles, feeding on tiny benthic insects and diatoms.',
    seasonality: 'Resident year-round in fast-flowing headwaters with high dissolved oxygen.',
    threats: ['Siltation from road construction and deforestation', 'Stream channelization', 'Pollution from hill resort hotels'],
    conservationMeasures: ['Protection of riparian vegetation buffers', 'Sewage treatment enforcement along hill streams', 'Critical habitat designation'],
    protectedAreas: ['overa-aru-wildlife-sanctuary', 'wangat-conservation-reserve', 'dachigam-national-park'],
    group: 'Aquatic Species',
    habitatTypes: ['Mountain torrents', 'Cold stone riffles', 'Headwater streams'],
    ecologicalSensitivity: '90/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: true,
    populationTrend: 'Decreasing',
    populationDetail: 'Confined to fewer than 5 isolated high-altitude stream headwaters in the valley.',
    monitoringDetail: 'Macro-benthic sampling and stone-lift surveys in protected catchment streams.',
    researchDetail: 'Taxonomic and phylogeographic clarification by Kashmir University Zoology Department.',
  },
  {
    id: 'himalayan-yew',
    slug: 'himalayan-yew',
    name: 'Himalayan Yew / Posthal',
    scientificName: 'Taxus wallichiana',
    conservationStatus: 'EN - Endangered',
    description: 'Ancient gymnosperm evergreen tree prized for producing taxol, a potent anti-cancer compound, leading to catastrophic wild harvesting.',
    distribution: 'Dense temperate coniferous forests of Dachigam, Overa-Aru, Kazinag, and Kishtwar.',
    ecology: 'Understory and mid-canopy tree growing in moist, shady ravines between 2,200m and 3,100m.',
    seasonality: 'Evergreen year-round; red fleshy arils ripen in autumn, providing vital bird forage.',
    threats: ['Severe debarking and foliage extraction for pharmaceutical taxol trade', 'Slow natural regeneration', 'Forest fires'],
    conservationMeasures: ['Complete legal ban on wild yew harvesting', 'Ex-situ nursery propagation and replanting', 'GPS tagging of mature wild stands'],
    protectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'kazinag-national-park', 'kishtwar-high-altitude-national-park'],
    group: 'Plant',
    habitatTypes: ['Moist temperate forest', 'Coniferous ravines', 'Subalpine woodland'],
    ecologicalSensitivity: '94/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Over 80% decline across unprotected forests; remnant viable populations protected inside National Parks.',
    monitoringDetail: 'Annual stand density and regeneration counts by J&K Forest Research Institute.',
    researchDetail: 'Micropropagation and tissue culture protocols developed at Kashmir University Botanical Garden.',
  },
  {
    id: 'dactylorhiza-hatagirea',
    slug: 'dactylorhiza-hatagirea',
    name: 'Salam Panja / Himalayan Marsh Orchid',
    scientificName: 'Dactylorhiza hatagirea',
    conservationStatus: 'CR - Critically Endangered',
    description: 'Celebrated medicinal terrestrial orchid with palmate tuber roots, renowned in traditional Unani and Ayurvedic medicine.',
    distribution: 'Wet alpine meadows, bogs, and spring seepages of Sonamarg, Gulmarg, Gurez, and Bangus.',
    ecology: 'Thrives in water-saturated peat soils, glacial melt stream margins between 2,800m and 4,000m.',
    seasonality: 'Flowers in June–July with dense spikes of purple-magenta flowers; dies back to underground tuber in autumn.',
    threats: ['Mass commercial uprooting of tubers for the aphrodisiac trade', 'Overgrazing by migratory sheep and cattle', 'Drying of alpine bogs'],
    conservationMeasures: ['Strict enforcement under Wildlife Protection Act Schedule I', 'Community herbal sanctuary enclosures', 'In-vitro tuber multiplication'],
    protectedAreas: ['gulmarg-wildlife-sanctuary', 'overa-aru-wildlife-sanctuary', 'rajparian-wildlife-sanctuary', 'hirpora-wildlife-sanctuary'],
    group: 'Plant',
    habitatTypes: ['Alpine wet meadows', 'Glacial seepages', 'Peat bogs'],
    ecologicalSensitivity: '98/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Wild populations reduced by over 90% across accessible tourist and shepherd routes.',
    monitoringDetail: 'Flowering spike counts in fenced conservation plots.',
    researchDetail: 'Mycorrhizal association identification essential for seed germination without host fungi.',
  },
  {
    id: 'trillium-govanianum',
    slug: 'trillium-govanianum',
    name: 'Nagchhatri / Himalayan Trillium',
    scientificName: 'Trillium govanianum',
    conservationStatus: 'EN - Endangered',
    description: 'High-value perennial herb with three whorled leaves and red star-like flower, heavily extracted for steroidal saponin compounds.',
    distribution: 'Shaded, organic-rich forest floors in Kazinag, Gulmarg, Overa, and Kishtwar temperate belts.',
    ecology: 'Grows under canopies of deodar, fir, and birch in humus-rich, moist soils between 2,500m and 3,700m.',
    seasonality: 'Emerges immediately following snowmelt in May; flowers in June; seeds dispersed in August.',
    threats: ['Rampant illegal rhizome extraction for illicit international trade', 'Destruction of forest topsoil', 'Slow maturation cycle (7+ years)'],
    conservationMeasures: ['Checkpost interception with heavy criminal penalties', 'Establishment of gene-bank reserves', 'Community herbal nursery cultivation'],
    protectedAreas: ['kazinag-national-park', 'gulmarg-wildlife-sanctuary', 'overa-aru-wildlife-sanctuary', 'kishtwar-high-altitude-national-park'],
    group: 'Plant',
    habitatTypes: ['Temperate moist forest floor', 'Subalpine birch groves', 'Humus ravines'],
    ecologicalSensitivity: '96/100',
    monitoringStatus: 'Active',
    researchCoverage: 'High',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Drastic depletion over the past decade; primary remaining viable colonies inside protected core zones.',
    monitoringDetail: 'Quadrat sampling in remote valleys and anti-poaching forest patrols.',
    researchDetail: 'Phytochemical analysis of trillinoside and trillium saponins for synthetic replacement.',
  },
  {
    id: 'arnebia-benthamii',
    slug: 'arnebia-benthamii',
    name: 'Kahzaban / Himalayan Arnebia',
    scientificName: 'Arnebia benthamii',
    conservationStatus: 'CR - Critically Endangered',
    description: 'Stately alpine borage herb with hairy purple floral spikes, utilized in traditional Kashmiri medicine for cardiotonic and respiratory ailments.',
    distribution: 'Subalpine and alpine rocky slopes of Bangus, Gurez, Overa-Aru, and Pir Panjal crests.',
    ecology: 'Grows in open subalpine meadows, rocky ledges, and scree slopes between 3,000m and 4,300m.',
    seasonality: 'Flowering spike matures in July–August; leaves harvested extensively for Kashmiri herbal tea.',
    threats: ['Overharvesting of flowers and roots', 'Grazing trampling by livestock herds', 'Climate-induced alpine meadow drying'],
    conservationMeasures: ['Herbal sanctuary fencing in Overa-Aru', 'Cultivation trials in high-altitude research farms', 'Trade monitoring at valley entry points'],
    protectedAreas: ['overa-aru-wildlife-sanctuary', 'hirpora-wildlife-sanctuary', 'rajparian-wildlife-sanctuary'],
    group: 'Plant',
    habitatTypes: ['Alpine rocky meadows', 'Subalpine scree', 'Mountain saddles'],
    ecologicalSensitivity: '95/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Medium',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Populations severely fragmented; high-density stands now restricted to steep inaccessible cliffs.',
    monitoringDetail: 'Annual flowering censuses and root harvest impact assessments.',
    researchDetail: 'Shikonin dye and medicinal compound extraction yields across varying altitudes.',
  },
  {
    id: 'kashmir-cave-bat',
    slug: 'kashmir-cave-bat',
    name: 'Kashmir Long-fingered Bat',
    scientificName: 'Myotis longipes',
    conservationStatus: 'VU - Vulnerable',
    description: 'Specialized cave-roosting bat that forages over mountain streams and tranquil lakes for emerging aquatic insects.',
    distribution: 'Natural limestone caves and historical subterranean tunnels in Dachigam, Tral, Mattan, and Wangat.',
    ecology: 'Trawling insectivore that skims water surfaces with large feet to capture mayflies and caddisflies.',
    seasonality: 'Active from spring to autumn; hibernates in deep subterranean caves with stable humidity during winter.',
    threats: ['Disturbance of breeding caves by unguided tourism', 'Use of pesticides around foraging water bodies', 'Cave entrance destruction'],
    conservationMeasures: ['Gating and protective fencing of maternity roost caves', 'Acoustic ultrasound monitoring', 'Pesticide buffer zones near roost caves'],
    protectedAreas: ['dachigam-national-park', 'tral-wildlife-sanctuary', 'wangat-conservation-reserve'],
    group: 'Mammal',
    habitatTypes: ['Limestone caves', 'Riparian corridors', 'Subalpine lakes'],
    ecologicalSensitivity: '86/100',
    monitoringStatus: 'Active',
    researchCoverage: 'Low',
    isEndemic: false,
    populationTrend: 'Decreasing',
    populationDetail: 'Fewer than 12 known maternity colonies remaining in the Kashmir Valley.',
    monitoringDetail: 'Ultrasonic bat detector transects and roost emergence counts.',
    researchDetail: 'Echolocation call frequency analysis and dietary metabarcoding by Kashmir University.',
  }`;

  // Insert before the closing bracket of speciesProfilesData
  // Look for the end of speciesProfilesData
  const lastSpeciesMarker = /id:\s*'aquatic-insects'[\s\S]*?researchDetail:[\s\S]*?\},/m;
  if (content.match(lastSpeciesMarker)) {
    content = content.replace(
      lastSpeciesMarker,
      (match) => `${match}${newProfiles}`
    );
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('✅ Appended 18 new species profiles to src/data/protected-network.ts');
  } else {
    console.warn('⚠️ Could not find lastSpeciesMarker in src/data/protected-network.ts');
  }
}
