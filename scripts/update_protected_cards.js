const fs = require('fs');
let content = fs.readFileSync('src/components/common/ProtectedCategoryPage.tsx', 'utf8');

const regex = /<Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white\/5 bg-\[#160C27\]" padding="none">[\s\S]*?<\/Card>/;

const newCard = `<Card className="group border border-white/5 bg-slate-900/50 h-full flex flex-col card-intelligence cursor-pointer" padding="none" onClick={() => router.push(\`/protected-network/national-parks/\${area.slug}\`)}>
                  <div className="p-5 sm:p-6 flex flex-col h-full gap-y-3">
                    {/* 1. Top badge row & 2. Action icons row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-2 items-center min-w-0">
                        <Badge variant="info" size="sm" className="capitalize text-xs">
                          {area.category.replace('_', ' ')}
                        </Badge>
                        {(area as any).scope && (
                          <Badge variant="default" size="sm" className="text-xs">{(area as any).scope}</Badge>
                        )}
                      </div>
                    </div>

                    {/* 3. Title */}
                    <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-emerald-400 transition-colors">
                      {area.name}
                    </h3>

                    {/* 4. Subtitle */}
                    <p className="text-xs text-slate-400 truncate">
                      {area.district} District
                    </p>

                    {/* 5. Metrics row */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 whitespace-nowrap overflow-hidden">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{area.district}</span>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <Activity className="w-3.5 h-3.5" />
                        <span>{area.area > 0 ? \`\${area.area} km²\` : 'TBC'}</span>
                      </div>
                      {(area as any).flagshipSpecies && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Shield className="w-3.5 h-3.5" />
                          <span>Flagship</span>
                        </div>
                      )}
                    </div>

                    {/* 6. Description */}
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed min-h-[2.75rem]">
                      {area.description}
                    </p>

                    {/* 7. Elevation / secondary info */}
                    <div className="text-xs flex items-center gap-1 text-slate-500 truncate">
                      <span>Altitude: {(area as any).altitudeRange || 'Varies'}</span>
                    </div>

                    {/* 8. Tag / threat / category chip zone (Fixed height) */}
                    <div className="h-[52px] flex flex-wrap gap-1.5 overflow-hidden content-start">
                      {area.ecosystems && area.ecosystems.length > 0 ? (
                        <>
                          {area.ecosystems.slice(0, 3).map((eco, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-300 max-w-[120px] truncate"
                            >
                              {eco}
                            </span>
                          ))}
                          {area.ecosystems.length > 3 && (
                            <span className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-400 shrink-0">
                              +{area.ecosystems.length - 3}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-600 italic mt-1">No ecosystem tags</span>
                      )}
                    </div>

                    {/* 9. CTA button (Pushed to bottom) */}
                    <Button
                      className="w-full py-2 text-sm rounded-lg mt-auto bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 text-white"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>`;

content = content.replace(regex, newCard);
fs.writeFileSync('src/components/common/ProtectedCategoryPage.tsx', content);
