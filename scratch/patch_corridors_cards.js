const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/corridors-and-connectivity/page.tsx', 'utf8');

content = content.replace(/const itemsPerPage = 9;/, 'const itemsPerPage = 12;');

const helperCode = `
  const getCorridorImage = (c: any) => {
    const name = c.name.toLowerCase();
    if (name.includes('markhor') || name.includes('cliff') || name.includes('pir panjal')) return '/images/markhor.png';
    if (name.includes('snow leopard') || name.includes('tahr') || name.includes('chenab')) return '/images/tiger.png';
    if (name.includes('bear') || name.includes('hangul') || name.includes('gurez')) return '/images/bear.png';
    return '/images/protected-network.png';
  };
`;

if (!content.includes('const getCorridorImage')) {
  content = content.replace(/(const getPriorityColor = [\s\S]*?\};)/, '$1\n' + helperCode);
}

const oldCard = `<Card 
                  className={\`\${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300\`} 
                  padding="lg"
                >
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 mb-3 line-clamp-2 leading-relaxed">{corridor.description}</p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 mb-3 line-clamp-2 leading-relaxed">{corridor.description}</p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-500 group-hover:text-emerald-400 transition-colors ml-4 flex-shrink-0" icon={<ArrowRight className="w-4 h-4" />} />
                    </div>
                  )}
                </Card>`;

const newCard = `<Card 
                  className={\`\${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} overflow-hidden card-intelligence border border-white/5 bg-slate-900/60 hover:border-emerald-500/30 transition-all shadow-lg\`} 
                  padding="none"
                >
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {/* Corridor Landscape Imagery */}
                        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                          <img
                            src={getCorridorImage(corridor)}
                            alt={corridor.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                          
                          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1">
                            <Badge variant={getPriorityColor(corridor.priority)} size="sm" className="font-bold shadow-md">
                              {corridor.priority} Priority
                            </Badge>
                            <Badge variant={getStatusColor(corridor.status)} size="sm" className="font-bold shadow-md">
                              {corridor.status}
                            </Badge>
                          </div>

                          <div className="absolute bottom-2.5 left-3 right-3">
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                              {corridor.name}
                            </h3>
                            <span className="text-[11px] text-emerald-300 font-mono drop-shadow-sm">{corridor.type}</span>
                          </div>
                        </div>

                        <div className="p-4">
                          <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                            {corridor.description}
                          </p>

                          {/* Quick specs */}
                          <div className="grid grid-cols-2 gap-2 py-1.5 px-2.5 rounded-lg bg-white/5 border border-white/5 mb-3 text-xs">
                            <div>
                              <div className="text-[9px] text-slate-400 uppercase font-semibold">Length</div>
                              <div className="text-white font-bold">{corridor.length}</div>
                            </div>
                            <div>
                              <div className="text-[9px] text-slate-400 uppercase font-semibold">Corridor Integrity</div>
                              <div className="text-emerald-400 font-bold">{corridor.connectivityIntegrity ? \`\${corridor.connectivityIntegrity}%\` : 'High'}</div>
                            </div>
                          </div>

                          {/* Linked PAs */}
                          {corridor.connectedAreas && corridor.connectedAreas.length > 0 && (
                            <div className="mb-2.5">
                              <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Connected Reserves</div>
                              <div className="flex flex-wrap gap-1">
                                {corridor.connectedAreas.slice(0, 3).map((ca, idx) => (
                                  <span key={idx} className="text-[10px] text-slate-300 bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                                    {ca}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 pt-0 mt-auto">
                        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                            {corridor.districts ? corridor.districts[0] : 'Regional'}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-600 group-hover:bg-emerald-500 transition-colors text-xs font-semibold text-white">
                            Corridor Telemetry
                            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-1 mb-2 line-clamp-1">{corridor.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-500 group-hover:text-emerald-400 transition-colors ml-4 flex-shrink-0" icon={<ArrowRight className="w-4 h-4" />} />
                    </div>
                  )}
                </Card>`;

content = content.replace(oldCard, newCard);
fs.writeFileSync('./src/app/protected-network/corridors-and-connectivity/page.tsx', content, 'utf8');
console.log('Updated corridors and connectivity cards layout!');
