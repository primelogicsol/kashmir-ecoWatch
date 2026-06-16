const fs = require('fs');
let content = fs.readFileSync('src/components/common/WaterEntityListingPage.tsx', 'utf8');

const regex = /<Card className="glass-intense border-white\/10 p-6 h-full hover:border-white\/20 transition-all cursor-pointer group">[\s\S]*?<\/Card>/;

const newCard = `<Card className="group border border-white/5 bg-slate-900/50 h-full flex flex-col card-intelligence cursor-pointer" padding="none" onClick={() => router.push(\`/water-systems/\${entity.category.toLowerCase()}s/\${entity.slug}\`)}>
                  <div className="p-5 sm:p-6 flex flex-col h-full gap-y-3">
                    {/* 1. Top badge row & 2. Action icons row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex flex-wrap gap-2 items-center min-w-0">
                        <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                          {getCategory(entity)}
                        </Badge>
                        {entity.waterQuality && (
                          <Badge variant={getQualityBadge(entity.waterQuality.status)} size="sm" className="text-xs">
                            {entity.waterQuality.status}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <div className={\`w-8 h-8 rounded-lg bg-gradient-to-br \${color} flex items-center justify-center\`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* 3. Title */}
                    <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 leading-tight min-h-[2.5rem] group-hover:text-blue-400 transition-colors">
                      {entity.name}
                    </h3>

                    {/* 4. Subtitle */}
                    <p className="text-xs text-slate-400 truncate">
                      {entity.district} District
                    </p>

                    {/* 5. Metrics row */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 whitespace-nowrap overflow-hidden">
                      <div className="flex items-center gap-1.5 shrink-0">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{entity.district}</span>
                      </div>
                      {entity.area && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Activity className="w-3.5 h-3.5" />
                          <span>{entity.area} km²</span>
                        </div>
                      )}
                    </div>

                    {/* 6. Description */}
                    <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed min-h-[2.75rem]">
                      {entity.description}
                    </p>

                    {/* 7. Elevation / secondary info */}
                    <div className="text-xs flex items-center gap-1 text-slate-500 truncate">
                      <span>Elevation: {entity.elevation}m</span>
                    </div>

                    {/* 8. Tag / threat / category chip zone (Fixed height) */}
                    <div className="h-[52px] flex flex-wrap gap-1.5 overflow-hidden content-start">
                      {entity.threats && entity.threats.length > 0 ? (
                        <>
                          {entity.threats.slice(0, 3).map((threat, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-300 max-w-[120px] truncate"
                            >
                              {threat}
                            </span>
                          ))}
                          {entity.threats.length > 3 && (
                            <span className="text-[11px] px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-400 shrink-0">
                              +{entity.threats.length - 3}
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[11px] text-slate-600 italic mt-1">No active threats recorded</span>
                      )}
                    </div>

                    {/* 9. CTA button (Pushed to bottom) */}
                    <Button
                      className="w-full py-2 text-sm rounded-lg mt-auto bg-gradient-to-r from-blue-600 to-blue-500 border-0 text-white"
                      icon={<ArrowRight className="w-4 h-4" />}
                    >
                      View Details
                    </Button>
                  </div>
                </Card>`;

content = content.replace(regex, newCard);
fs.writeFileSync('src/components/common/WaterEntityListingPage.tsx', content);
