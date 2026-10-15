const fs = require('fs');
let content = fs.readFileSync('./src/app/protected-network/reports-and-plans/page.tsx', 'utf8');

content = content.replace(/const itemsPerPage = 9;/, 'const itemsPerPage = 12;');

const oldCard = `<Card className={\`\${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300\`} padding="lg">
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className={\`w-12 h-12 rounded-xl bg-gradient-to-br \${getTypeColor(report.type)} bg-opacity-20 flex items-center justify-center flex-shrink-0\`}>
                            <FileText className="w-6 h-6 text-emerald-400" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">{report.title}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              <Badge variant="info" size="sm" className="capitalize">{report.type}</Badge>
                              <Badge variant="default" size="sm">{report.year}</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-slate-400 mb-3 line-clamp-3">{report.description}</p>
                        <div className="text-xs text-slate-500 mb-3">
                          <span>Authors: <strong className="text-slate-300">{(report.authors || []).slice(0, 2).join(', ')}{report.authors.length > 2 ? ' + more' : ''}</strong></span>
                        </div>
                        {report.linkedAreas && report.linkedAreas.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {report.linkedAreas.slice(0, 2).map((area, idx) => (
                              <Badge key={idx} variant="default" size="sm">
                                {area.replace(/-/g, ' ')}
                              </Badge>
                            ))}
                            {report.linkedAreas.length > 2 && (
                              <Badge variant="default" size="sm">
                                +{report.linkedAreas.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                          Read Report
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (`;

const newCard = `<Card className={\`\${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/60 hover:border-emerald-500/30 transition-all duration-300 p-5 shadow-lg\`}>
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-start gap-3.5 mb-3">
                          <div className={\`w-11 h-11 rounded-xl bg-gradient-to-br \${getTypeColor(report.type)} bg-opacity-20 flex items-center justify-center shrink-0 border border-white/10 shadow-inner\`}>
                            <FileText className="w-5 h-5 text-emerald-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                              <Badge variant="info" size="sm" className="capitalize text-[10px]">{report.type}</Badge>
                              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5">{report.year}</span>
                            </div>
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">{report.title}</h3>
                          </div>
                        </div>

                        <p className="text-xs text-slate-300 mb-3 line-clamp-3 leading-relaxed">{report.description}</p>
                        
                        <div className="text-[11px] text-slate-400 mb-3 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{(report.authors || []).slice(0, 2).join(', ')}{report.authors.length > 2 ? ' et al.' : ''}</span>
                        </div>

                        {report.linkedAreas && report.linkedAreas.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {report.linkedAreas.slice(0, 2).map((area, idx) => (
                              <span key={idx} className="text-[10px] text-slate-300 bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 rounded truncate max-w-[120px]">
                                {area.replace(/-/g, ' ')}
                              </span>
                            ))}
                            {report.linkedAreas.length > 2 && (
                              <span className="text-[10px] text-slate-400 self-center px-1">
                                +{report.linkedAreas.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Verified
                        </span>
                        <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-xs font-semibold text-white">
                          Examine Document
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (`;

content = content.replace(oldCard, newCard);
fs.writeFileSync('./src/app/protected-network/reports-and-plans/page.tsx', content, 'utf8');
console.log('Updated reports and plans cards layout!');
