const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/monitoring-and-threats/page.tsx', 'utf8');

content = content.replace(/const itemsPerPage = 9;/, 'const itemsPerPage = 12;');

const oldCard = `<Card className={\`\${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300 p-6 \${getSeverityColor(threat.severity)} group-hover:scale-[1.01] transition-transform\`}>
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-start gap-4 mb-3">
                          <div className={\`w-3 h-3 rounded-full mt-2 shrink-0 \${
                            threat.severity === 'critical' ? 'signal-pulse bg-red-500' :
                            threat.severity === 'high' ? 'signal-pulse bg-red-500' :
                            threat.severity === 'medium' ? 'signal-pulse bg-amber-500' :
                            'signal-pulse bg-blue-500'
                          }\`} />
                          <div>
                            <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">{threat.name}</h3>
                            <span className="inline-block mt-1">
                              <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                                {threat.severity.toUpperCase()}
                              </Badge>
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-3 line-clamp-3">{threat.description}</p>
                        <div className="text-xs text-slate-400">
                          <span>{threat.affectedAreas.length} affected areas</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                          View Intel
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (`;

const newCard = `<Card className={\`\${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/60 hover:border-emerald-500/30 transition-all duration-300 p-5 \${getSeverityColor(threat.severity)} shadow-lg\`}>
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        {/* Threat Header Header Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className={\`w-2.5 h-2.5 rounded-full shrink-0 \${
                              threat.severity === 'critical' ? 'bg-red-500 animate-ping' :
                              threat.severity === 'high' ? 'bg-amber-500 animate-pulse' :
                              'bg-emerald-500'
                            }\`} />
                            <Badge variant={getSeverityBadge(threat.severity)} size="sm" className="font-bold">
                              {threat.severity.toUpperCase()} ALERT
                            </Badge>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {threat.affectedAreas.length} Reserves At Risk
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors leading-snug">
                          {threat.name}
                        </h3>

                        <p className="text-xs text-slate-300 mb-3 line-clamp-3 leading-relaxed">
                          {threat.description}
                        </p>

                        {/* Affected Areas Tags */}
                        {threat.affectedAreas && threat.affectedAreas.length > 0 && (
                          <div className="mb-3">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Priority Impact Zones</div>
                            <div className="flex flex-wrap gap-1">
                              {threat.affectedAreas.slice(0, 3).map((area, idx) => (
                                <span key={idx} className="text-[10px] text-slate-300 bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                                  {area}
                                </span>
                              ))}
                              {threat.affectedAreas.length > 3 && (
                                <span className="text-[10px] text-slate-400 self-center px-1">
                                  +{threat.affectedAreas.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Mitigation Strategies if present */}
                        {threat.mitigationStrategies && threat.mitigationStrategies.length > 0 && (
                          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300 flex items-center gap-1.5 mb-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span className="truncate">Mitigation: {threat.mitigationStrategies[0]}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Activity className="w-3.5 h-3.5 text-emerald-400" />
                          Live Sentinel
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-xs font-semibold text-white">
                          Threat Analysis
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (`;

content = content.replace(oldCard, newCard);
fs.writeFileSync('./src/app/protected-network/monitoring-and-threats/page.tsx', content, 'utf8');
console.log('Updated monitoring and threats card layout!');
