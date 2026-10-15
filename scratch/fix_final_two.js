const fs = require('fs');
const path = require('path');

// 1. utility-incidents: add Shield to imports
{
  const p = path.resolve('src/app/environmental-monitoring/utility-incidents/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('ShieldCheck, AlertTriangle', 'ShieldCheck, Shield, AlertTriangle');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed Shield import in utility-incidents/page.tsx');
}

// 2. dashboards: insert EnvironmentalObserveSpotlight JSX right above {/* Dashboard Modules */}
{
  const p = path.resolve('src/app/environmental-monitoring/dashboards/page.tsx');
  let c = fs.readFileSync(p, 'utf8');

  const spotlightJSX = `
      {/* ── Focus Typologies & Observation Spotlight ──────────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Environmental Analytics &amp; District Stress Typologies"
          typologySubtitle="Select an analytical focus stream to interrogate stress heatmaps, atmospheric trends, and waste performance indices."
          typologyIcon={BarChart3}
          typologies={[
            { id: 'all', label: 'All Dashboards', count: 6, icon: Layers, color: 'violet' },
            { id: 'district', label: 'District Comparisons', count: 8, icon: MapPin, color: 'emerald' },
            { id: 'stress', label: 'Cumulative Stress Heatmaps', count: 12, icon: AlertTriangle, color: 'rose' },
            { id: 'water', label: 'Hydrological Analytics', count: 4, icon: Droplets, color: 'cyan' },
            { id: 'air', label: 'Air Quality Forecasts', count: 8, icon: Wind, color: 'sky' },
            { id: 'waste', label: 'Waste Auditing Tracker', count: 5, icon: Trash2, color: 'amber' },
          ]}
          activeTypology="all"
          onSelectTypology={() => {}}
          showingCount={6}
          totalCount={6}
          entityLabel="active analytical suites"
          spotlightTitle="District Stress Synthesis &amp; Real-Time Geospatial Analytics"
          spotlightSubtitle="Cross-referencing CPCB air monitoring stations, satellite telemetry, and municipal waste inventories across 10 Kashmir districts."
          tabs={[
            {
              id: 'disparity',
              label: 'District Stress Stratification',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">High Stress Urban Hubs</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Srinagar &amp; Pulwama</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Srinagar (78/100) and Pulwama (71/100) record elevated stress due to vehicular density, brick kiln emissions, unsewered municipal runoff, and critical pressure on Achan and peripheral waterbodies.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Incident Density: 87+ active tracking cases</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Moderate Mixed Agro-Urban</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Anantnag &amp; Budgam</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Anantnag (62/100) and Budgam (52/100) exhibit moderate stress driven by rapid commercial ribbon development, pesticide wash-off in orchard soils, and localized industrial stone crushing clusters.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Stress Index: 57 avg composite rating</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Stable Forest Catchments</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Ganderbal &amp; Kupwara</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Ganderbal (45/100) and Kupwara (38/100) maintain the highest ecological integrity with extensive intact coniferous forest cover, high headwater dilution capacity, and low industrial footprints.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Air Quality Baseline: AQI 64-76 (Good/Satisfactory)</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'telemetry',
              label: 'Integrated Sensor Architecture',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Copernicus &amp; Open-Meteo Integration</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Automated hourly API synchronizations feed US AQI, particulate concentrations (PM2.5, PM10), gaseous pollutants (NO2, SO2), and GloFAS river discharge hydrographs directly into KEW dashboards.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Telemetry Frequency: Continuous 60-min interval</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Municipal Ground-Truth Calibrations</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Satellite vegetation vigor (Sentinel-2 NDVI) and air quality predictions are rigorously ground-truthed against certified laboratory samples.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Calibration Ratio: 94.2% statistical confidence</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="environmental"
          observeTitle="Environmental Analytics Ground-Truth &amp; Field Audit Hub"
          observeSubtitle="Corroborate analytical dashboard trends with verified field measurements, report data anomalies, or submit geo-tagged ward observations."
          observeBadge="Analytics Field Sync Active"
          protocols={[
            {
              number: '1',
              title: 'Automated Sensor Ground-Truthing',
              desc: 'Cross-check automated continuous air or hydrological sensor outputs with portable calibrated photometers and colorimeters.',
              benchmark: 'ISO/IEC 17025 Calibration Tolerance (+-5%)',
              icon: Eye,
              color: 'violet',
            },
            {
              number: '2',
              title: 'Ward Infrastructure Deficiency Audit',
              desc: 'Document broken sewerage conduits, non-functional aeration pumps at STPs, or overflow at waste collection points.',
              benchmark: 'CPHEEO Urban Drainage Maintenance Schedule',
              icon: Building2,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Waterbody Turbidity &amp; Secchi Logging',
              desc: 'Measure euphotic depth and water clarity across urban lakes and river confluence zones following heavy rain events.',
              benchmark: 'ISO 7027 Turbidity Standard (&lt; 5 NTU)',
              icon: Droplets,
              color: 'sky',
            },
            {
              number: '4',
              title: 'Public Health Environmental Nuisance Rating',
              desc: 'Audit community complaints regarding smoke, landfill smells, and open sewage drains to rank ward-level environmental priority.',
              benchmark: 'MoHUA Citizen Service Delivery Benchmark',
              icon: AlertTriangle,
              color: 'amber',
            },
          ]}
        />
      </div>
`;

  const anchor = '{/* Dashboard Modules */}';
  if (c.includes(anchor)) {
    c = c.replace(anchor, spotlightJSX + '\n      ' + anchor);
    fs.writeFileSync(p, c, 'utf8');
    console.log('Fixed dashboards/page.tsx');
  } else {
    console.log('Could not find anchor in dashboards/page.tsx');
  }
}
