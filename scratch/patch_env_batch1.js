const fs = require('fs');
const path = require('path');

// ─── 1. OVERVIEW: src/app/environmental-monitoring/page.tsx ────────────────────
{
  const filePath = path.resolve('src/app/environmental-monitoring/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Add EnvironmentalObserveSpotlight import
  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Insert Spotlight component right above Submodules Grid
  const targetSubmodules = "{/* Submodules Grid */}";
  const spotlightOverviewJSX = `
      {/* ── Cross-Domain Typologies & Citizen Surveillance Spotlight ──────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Environmental Monitoring Focus Typologies & Cross-Basin Domains"
          typologySubtitle="Select a monitoring domain or critical stress category to review specialized telemetry across the Kashmir valley."
          typologyIcon={Factory}
          typologies={[
            { id: 'all', label: 'All Domains', count: 10, icon: Globe, color: 'emerald' },
            { id: 'waste', label: 'Solid & Bio Waste', count: 11, icon: Trash2, color: 'amber' },
            { id: 'sewage', label: 'Sewage & STPs', count: 5, icon: Droplets, color: 'cyan' },
            { id: 'drinking', label: 'Potable Water Vulnerabilities', count: 2, icon: Waves, color: 'sky' },
            { id: 'air', label: 'Atmospheric Air Quality', count: 8, icon: Wind, color: 'violet' },
            { id: 'health', label: 'Ecological Sentinel Health', count: 6, icon: Shield, color: 'rose' },
            { id: 'resilience', label: 'Resilience Systems', count: 30, icon: ShieldCheck, color: 'teal' },
          ]}
          activeTypology={domainFilter === 'all' ? 'all' : domainFilter.includes('waste') ? 'waste' : domainFilter.includes('sewage') ? 'sewage' : domainFilter.includes('drinking') ? 'drinking' : domainFilter.includes('air') ? 'air' : domainFilter.includes('health') ? 'health' : 'resilience'}
          onSelectTypology={(id) => {
            if (id === 'all') setDomainFilter('all');
            else if (id === 'waste') setDomainFilter('solid-waste');
            else if (id === 'sewage') setDomainFilter('sewage-wastewater');
            else if (id === 'drinking') setDomainFilter('drinking-water');
            else if (id === 'air') setDomainFilter('air-pollution');
            else if (id === 'health') setDomainFilter('environmental-health');
            else if (id === 'resilience') setDomainFilter('environmental-resilience');
          }}
          showingCount={domainFilter === 'all' ? 10 : 1}
          totalCount={10}
          entityLabel="intelligence submodules"
          spotlightTitle="Western Himalayan Environmental Command & Baseline Intelligence"
          spotlightSubtitle="Cross-domain monitoring synthesis linking satellite remote sensing, ground telemetry, municipal audits, and citizen observation."
          tabs={[
            {
              id: 'cross-basin',
              label: 'Cross-Basin Urban Stress Corridors',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Urban Core Fluvial Axis</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Jhelum River &amp; Dal Lake Catchment</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Srinagar metropolitan area generates ~550 TPD municipal waste and 140+ MLD domestic wastewater. Direct outfalls into Doodh Ganga, Dal Lake, and Jhelum riverine channels require continuous BOD and microbial monitoring.
                    </p>
                    <div className="text-[11px] text-slate-500">Key Nodes: <span className="text-slate-300">Dalgate, Achan, Brari Numbal, Hazratbal</span></div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Downstream Wetland Sinks</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Hokersar &amp; Wular Ramsar Basins</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Agricultural nutrient runoff and untreated municipal sewage accumulate in major downstream wetlands, driving eutrophic Azolla mats and siltation that reduce vital flood absorption capacity.
                    </p>
                    <div className="text-[11px] text-slate-500">Key Nodes: <span className="text-slate-300">Wular Lake (#461), Hokersar (#1570), Mirgund</span></div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">High-Altitude Vulnerability</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Tourism &amp; Cryosphere Corridors</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Pahalgam, Gulmarg, and Sonamarg experience rapid 300% solid waste surges during peak tourist and pilgrim seasons. Waste accumulation in alpine catchments threatens glacial melt streams.
                    </p>
                    <div className="text-[11px] text-slate-500">Key Nodes: <span className="text-slate-300">Lidder Valley, Thajiwas Glacial Stream, Gulmarg Bowl</span></div>
                  </div>
                </div>
              ),
            },
            {
              id: 'seasonal-inversion',
              label: 'Winter Valley Thermal Inversion',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Valley Bowl Atmospheric Stagnation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      During November to February, calm winds and steep mountain topography trap particulate emissions from Kangri charcoal, apple wood bukharis, and brick kilns under cold valley floor air layers.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Telemetry Peak: PM2.5 exceeds 180 µg/m³ during Chillai Kalan</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Wetland Evaporative Mitigation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Large open water bodies like Wular and Dal Lake create microclimatic moisture corridors that modulate winter ground freezing, while open reeds filter atmospheric dust settling over lacustrine catchments.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Ecological Buffer: ~130 km² open water thermal damping</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="environmental"
          observeTitle="Citizen Environmental Surveillance &amp; Ground-Truth Network"
          observeSubtitle="Submit verifiable environmental observations across Kashmir, report illegal effluent discharge, waste burning, or track local compliance."
          observeBadge="Pan-Kashmir Active Protocol"
          protocols={[
            {
              number: '1',
              title: 'Handheld Sensor & Visual Smoke Plume Telemetry',
              desc: 'Log ambient PM2.5/PM10 readings using portable laser photometers or document open biomass/leaf burning plumes with GPS timestamp.',
              benchmark: 'CPCB NAAQS 24h Standard: PM2.5 <= 60 ug/m3',
              icon: Wind,
              color: 'violet',
            },
            {
              number: '2',
              title: 'Untreated Effluent Outfall Spotting',
              desc: 'Photograph and report untreated raw sewage or commercial discharge pipes pouring into Dal Lake, Doodh Ganga, or Jhelum tributaries.',
              benchmark: 'Water Act 1974 Section 24 Zero-Discharge Standard',
              icon: Droplets,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Municipal Solid Waste Dumping Geo-Tagging',
              desc: 'Record unmanaged open dumpsites exceeding 2m³ within 100m of water bodies, agricultural fields, or protected forest peripheries.',
              benchmark: 'Solid Waste Management Rules 2016 Rule 15',
              icon: Trash2,
              color: 'amber',
            },
            {
              number: '4',
              title: 'Stagnant Sullage & Noxious Odor Rating',
              desc: 'Assess hydrogen sulfide (H2S) odor intensity on the 5-point VDI scale and log standing septic blackwater creating vector hazards.',
              benchmark: 'CPHEEO Vector & Public Health Hygiene Norm',
              icon: AlertTriangle,
              color: 'rose',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetSubmodules, spotlightOverviewJSX + '\n      ' + targetSubmodules);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/page.tsx');
  }
}

// ─── 2. DASHBOARDS: src/app/environmental-monitoring/dashboards/page.tsx ────────
{
  const filePath = path.resolve('src/app/environmental-monitoring/dashboards/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';\nimport { Trash2, Droplets, Wind, Waves, Shield, Building2, Factory } from 'lucide-react';"
    );
  }

  const targetSection = '<div className="container mx-auto px-6 py-8">';
  const spotlightDashboardsJSX = `
      {/* ── Focus Typologies & Observation Spotlight ──────────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Environmental Analytics & District Stress Typologies"
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
          spotlightTitle="District Stress Synthesis & Real-Time Geospatial Analytics"
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
                      Satellite vegetation vigor (Sentinel-2 NDVI) and air quality predictions are rigorously ground-truthed against Jammu &amp; Kashmir Pollution Control Committee (JKPCC) certified laboratory samples.
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
              title: 'Waterbody Turbidity & Secchi Logging',
              desc: 'Measure euphotic depth and water clarity across urban lakes and river confluence zones following heavy rain events.',
              benchmark: 'ISO 7027 Turbidity Standard (< 5 NTU)',
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

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetSection, spotlightDashboardsJSX + '\n      ' + targetSection);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/dashboards/page.tsx');
  }
}

console.log('Batch 1 complete');
