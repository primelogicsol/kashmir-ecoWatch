const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/species-intelligence/page.tsx', 'utf8');

// Change itemsPerPage to 12
content = content.replace(/const itemsPerPage = 9;/, 'const itemsPerPage = 12;');

// Helper function for species image
const helperCode = `
  const getSpeciesImage = (species: any) => {
    const name = species.name.toLowerCase();
    if (name.includes('hangul') || name.includes('stag') || name.includes('deer')) return '/images/bear.png';
    if (name.includes('markhor') || name.includes('ibex') || name.includes('tahr') || name.includes('sheep') || name.includes('goral') || name.includes('capra')) return '/images/markhor.png';
    if (name.includes('snow leopard') || name.includes('leopard') || name.includes('lynx') || name.includes('cat') || name.includes('panthera')) return '/images/tiger.png';
    if (name.includes('bear') || name.includes('wolf') || name.includes('otter')) return '/images/bear.png';
    return '/images/protected-network.png';
  };
`;

if (!content.includes('const getSpeciesImage')) {
  content = content.replace(/(const getStatusColor = [\s\S]*?\};)/, '$1\n' + helperCode);
}

// Upgrade card rendering
const oldCardMarkup = `<Card className="h-full flex flex-col justify-between card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300" padding="lg">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={getStatusColor(species.conservationStatus)} size="sm">
                            {species.conservationStatus.split(' ')[0]}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {species.name}
                        </h3>
                        <p className="text-sm text-slate-400 italic">{species.scientificName}</p>
                      </div>
                    </div>

                    {/* Protected Area Overlap */}
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 uppercase mb-2">Protected Area Overlap</div>
                      <div className="flex flex-wrap gap-2">
                        {species.protectedAreas.slice(0, 3).map((pa, idx) => (
                          <Badge key={idx} variant="default" size="sm">
                            {pa.replace(/-/g, ' ')}
                          </Badge>
                        ))}
                        {species.protectedAreas.length > 3 && (
                          <Badge variant="default" size="sm">
                            +{species.protectedAreas.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Threats & Conservation */}
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{species.threats.length} threats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>{species.conservationMeasures.length} measures</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                      View Species Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>`;

const newCardMarkup = `<Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/60 hover:border-emerald-500/30 transition-all shadow-lg" padding="none">
                  {/* Photo Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                    <img
                      src={getSpeciesImage(species)}
                      alt={species.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    
                    {/* Top overlay badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1">
                      <Badge variant={getStatusColor(species.conservationStatus)} size="sm" className="font-bold shadow-md">
                        {species.conservationStatus.split(' ')[0]}
                      </Badge>
                      {species.isEndemic && (
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-full backdrop-blur-md">
                          Kashmir Endemic
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay with title */}
                    <div className="absolute bottom-2.5 left-3 right-3">
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                        {species.name}
                      </h3>
                      <p className="text-xs text-emerald-300/90 italic drop-shadow-sm truncate">{species.scientificName}</p>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                      {species.description}
                    </p>

                    {/* Protected Area Overlap */}
                    <div className="mb-3">
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Protected Area Strongholds</div>
                      <div className="flex flex-wrap gap-1">
                        {species.protectedAreas.slice(0, 3).map((pa, idx) => (
                          <span key={idx} className="text-[10px] text-slate-300 bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                            {pa.replace(/-/g, ' ')}
                          </span>
                        ))}
                        {species.protectedAreas.length > 3 && (
                          <span className="text-[10px] text-slate-400 self-center px-1 font-medium">
                            +{species.protectedAreas.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Threats & Measures quick stats */}
                    <div className="grid grid-cols-2 gap-2 py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/5 mb-3 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="truncate">{species.threats.length} threats logged</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{species.conservationMeasures.length} active measures</span>
                      </div>
                    </div>

                    <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {species.conservationStatus}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 group-hover:bg-emerald-500 transition-colors text-xs font-semibold text-white">
                        Intel Profile
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>`;

content = content.replace(oldCardMarkup, newCardMarkup);
fs.writeFileSync('./src/app/protected-network/species-intelligence/page.tsx', content, 'utf8');
console.log('Updated species intelligence cards layout!');
