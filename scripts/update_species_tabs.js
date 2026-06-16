const fs = require('fs');
let code = fs.readFileSync('src/app/biodiversity/species/[slug]/page.tsx', 'utf8');

const regex = /\{\/\* Distribution \*\/\s*\{activeTab === 'distribution' && \([\s\S]*?\{\/\* Reports \*\/\s*\{activeTab === 'reports' && \([\s\S]*?\)\}/;

const newTabsContent = `{/* Distribution */}
        {activeTab === 'distribution' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Distribution Map</h2>
                <Button onClick={() => router.push('/atlas')} variant="outline" size="sm" className="border-white/20 text-white" icon={<Map className="w-4 h-4" />}>
                  Open Full Atlas
                </Button>
              </div>
              <div className="relative h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden">
                {/* Simulated map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map className="w-24 h-24 text-slate-600" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="p-4 rounded-xl glass-intense">
                    <div className="text-sm text-slate-400 mb-2">Protected Area Overlap</div>
                    <div className="flex flex-wrap gap-2">
                      {species.protectedAreas.map((pa, idx) => (
                        <Badge key={idx} variant="default">
                          {pa.replace(/-/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {(species as any).distributionPoints && (species as any).distributionPoints.length > 0 && (
              <Card className="glass-light border-white/5 p-8" padding="none">
                <h3 className="text-xl font-bold text-white mb-4">Confirmed Distribution Points</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(species as any).distributionPoints.map((dp: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl glass-intense border border-white/5">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-white">{dp.district}</span>
                        {dp.occurrenceType === 'confirmed' && (
                          <Badge variant="success" size="sm" className="ml-auto text-[10px]">Confirmed</Badge>
                        )}
                      </div>
                      <div className="text-sm text-slate-400 mb-1">Elevation: {dp.elevation}m</div>
                      <div className="text-sm text-slate-400 capitalize">Habitat: {dp.habitat.replace('-', ' ')}</div>
                      {dp.protectedArea && (
                        <div className="text-xs text-emerald-500 mt-2">Inside {dp.protectedArea.replace(/-/g, ' ')}</div>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </motion.div>
        )}

        {/* Ecology */}
        {activeTab === 'ecology' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <h2 className="text-2xl font-bold text-white mb-4">Ecological Role</h2>
              <p className="text-slate-300 leading-relaxed mb-6">{species.ecologicalRole}</p>
              
              <h3 className="text-xl font-bold text-white mb-4">Habitat Associations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.habitats.map((habitat, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-intense border border-white/5">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-forest-400" />
                      <span className="text-white font-medium">{habitat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Seasonality */}
        {activeTab === 'seasonality' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-forest-400" />
                <h2 className="text-2xl font-bold text-white">Seasonality & Phenology</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6">{species.seasonality}</p>

              {(species as any).migrationWindow && (
                <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-500/5 mt-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" /> Migration Window
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-400">Peak Period: </span>
                      <span className="text-white font-medium">{(species as any).migrationWindow.peakMonths.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Route Type: </span>
                      <span className="text-white font-medium capitalize">{(species as any).migrationWindow.routeType.replace('-', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400">Stopovers: </span>
                      <span className="text-white font-medium">{(species as any).migrationWindow.keyStopovers.join(', ')}</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        )}

        {/* Threats */}
        {activeTab === 'threats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Threats & Pressures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.threats.map((threat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-white font-medium">{threat}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Conservation */}
        {activeTab === 'conservation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Conservation Status</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="flex items-center gap-4">
                  <div className={\`w-4 h-4 rounded-full \${getConservationStatusColor(species.conservationStatus)}\`} />
                  <div>
                    <div className="text-2xl font-bold text-white">{species.conservationStatus}</div>
                    <div className="text-sm text-slate-400">IUCN Red List Category</div>
                  </div>
                </div>

                {(species as any).endemismStatus && (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white capitalize">{(species as any).endemismStatus.replace('-', ' ')}</div>
                      <div className="text-sm text-slate-400">Endemism Status</div>
                    </div>
                  </div>
                )}
              </div>

              {((species as any).conservationPriority !== undefined || (species as any).pressureIndex !== undefined) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 rounded-xl glass-intense border border-white/5">
                  {(species as any).conservationPriority !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Conservation Priority Index</span>
                        <span className="text-white font-bold">{(species as any).conservationPriority}/10</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-amber-500" 
                          style={{ width: \`\${((species as any).conservationPriority / 10) * 100}%\` }}
                        />
                      </div>
                    </div>
                  )}
                  {(species as any).pressureIndex !== undefined && (
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-400">Threat Pressure Index</span>
                        <span className="text-white font-bold">{(species as any).pressureIndex}/100</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-red-500" 
                          style={{ width: \`\${(species as any).pressureIndex}%\` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {species.conservationMeasures && species.conservationMeasures.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-white mb-4">Conservation Measures</h3>
                  <div className="space-y-2">
                    {species.conservationMeasures.map((measure, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-white">{measure}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}

        {/* Sightings */}
        {activeTab === 'sightings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Verified Sightings</h2>
                </div>
                <Button onClick={() => router.push('/biodiversity/wildlife-sightings')} className="bg-gradient-to-r from-emerald-600 to-emerald-500 border-0 text-white" icon={<Eye className="w-4 h-4" />}>
                  View All Sightings
                </Button>
              </div>
              <div className="text-center py-12">
                <div className="text-6xl font-bold text-white mb-2">{species.verifiedSightings || 0}</div>
                <div className="text-slate-400 mb-6">verified observations recorded</div>
                <p className="text-sm text-slate-500">
                  Note: Exact locations are masked for sensitive species to prevent disturbance
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <Book className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Related Reports & References</h2>
              </div>
              
              {(species as any).dataSource && (
                <div className="mb-8 p-5 rounded-xl border border-white/10 glass-intense">
                  <h3 className="text-lg font-bold text-white mb-3">Primary Data Source</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Reference</div>
                      <div className="text-white font-medium">{(species as any).dataSource.reference} ({(species as any).dataSource.year})</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Verification</div>
                      <div className="text-white font-medium">{(species as any).dataSource.verifiedBy}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Quality Flag</div>
                      <Badge variant={(species as any).dataSource.qualityFlag === 'high' ? 'success' : 'warning'} size="sm">
                        {(species as any).dataSource.qualityFlag}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Confidence Score</div>
                      <div className="text-emerald-400 font-bold">{(species as any).dataSource.confidence}%</div>
                    </div>
                  </div>
                </div>
              )}

              {species.references && species.references.length > 0 ? (
                <div className="space-y-4">
                  {species.references.map((ref, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass-intense border border-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium mb-1">Scientific Report {idx + 1}</div>
                          <div className="text-sm text-slate-400">Research Library Reference: {ref}</div>
                        </div>
                        <Button onClick={() => router.push('/library')} variant="outline" size="sm" className="border-white/20 text-white" icon={<ExternalLink className="w-4 h-4" />}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  No specific reports available for this species
                </div>
              )}
            </Card>
          </motion.div>
        )}`;

code = code.replace(regex, newTabsContent);
fs.writeFileSync('src/app/biodiversity/species/[slug]/page.tsx', code);
