const fs = require('fs');
const path = require('path');

// ─── 9. ENVIRONMENTAL HEALTH: src/app/environmental-monitoring/environmental-health/page.tsx
{
  const filePath = path.resolve('src/app/environmental-monitoring/environmental-health/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Add activeTypology state
  if (!content.includes('activeTypology')) {
    content = content.replace(
      "const [restoPriorityFilter, setRestoPriorityFilter] = useState('all');",
      "const [restoPriorityFilter, setRestoPriorityFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchDistrict && matchScope && matchEcosystem && matchStress && matchResto && matchSearch;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(r.stressLevel)) ||
        (activeTypology === 'wetland' && r.ecosystemType === 'Wetland') ||
        (activeTypology === 'riverine' && r.ecosystemType === 'Riverine') ||
        (activeTypology === 'forest' && (r.ecosystemType === 'Temperate Forest' || r.ecosystemType === 'Sub-Alpine')) ||
        (activeTypology === 'alpine' && r.ecosystemType === 'Alpine') ||
        (activeTypology === 'urgent' && r.restorationPriority === 'Urgent');

      return matchDistrict && matchScope && matchEcosystem && matchStress && matchResto && matchSearch && matchTypology;`
    );

    content = content.replace(
      "[ecologicalHealthRegistry, filter, ecosystemFilter, stressFilter, restoPriorityFilter]",
      "[ecologicalHealthRegistry, filter, ecosystemFilter, stressFilter, restoPriorityFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── Scope Row ─────────────────────────────────────────────────────────── */}";
  const spotlightHealthJSX = `
      {/* ── Ecological Health Typologies & Citizen Field Protocols ─────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Ecological Health Typologies & Bio-Indicator Sentinel Belts"
          typologySubtitle="Select an ecological biome, stress rating, or restoration priority to monitor remote-sensing and biological health scores."
          typologyIcon={Activity}
          typologies={[
            { id: 'all', label: 'All Ecosystem Units', count: ecologicalHealthRegistry.length, icon: Leaf, color: 'emerald' },
            { id: 'critical', label: 'High / Critical Stress', count: ecologicalHealthRegistry.filter(r => ['Critical', 'High'].includes(r.stressLevel)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'wetland', label: 'Wetland Habitats (Ramsar)', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Wetland').length, icon: Waves, color: 'cyan' },
            { id: 'riverine', label: 'Fluvial Riverine Corridors', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Riverine').length, icon: Droplets, color: 'sky' },
            { id: 'forest', label: 'Temperate & Sub-Alpine Forests', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Temperate Forest' || r.ecosystemType === 'Sub-Alpine').length, icon: TreePine, color: 'teal' },
            { id: 'alpine', label: 'High Alpine Grasslands', count: ecologicalHealthRegistry.filter(r => r.ecosystemType === 'Alpine').length, icon: Mountain, color: 'indigo' },
            { id: 'urgent', label: 'Urgent Restoration Priority', count: ecologicalHealthRegistry.filter(r => r.restorationPriority === 'Urgent').length, icon: Shield, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={ecologicalHealthRegistry.length}
          entityLabel="ecosystem units"
          spotlightTitle="Sentinel Bio-Indicators & Remote Sensing Telemetry"
          spotlightSubtitle="Coupling Copernicus Sentinel-2 MSI NDVI vegetation indices with ground-truthed biotic index benchmarks across Kashmir's biomes."
          tabs={[
            {
              id: 'bio-indicators',
              label: 'Macroinvertebrate & Fish Hypoxia Signals',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Coldwater Salmonid Sentinels</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Brown Trout (*Salmo trutta fario*)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Require dissolved oxygen &gt; 7.0 mg/L and water temperatures &lt; 18°C in Lidder, Sind, and Madhumati streams. Sudden fish distress flags acute oxygen depletion or toxic pesticide runoff.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Biotic Index: Intolerant stenothermal species</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Benthic Macroinvertebrates</span>
                    <h5 className="text-sm font-semibold text-white mb-2">EPT Taxa (Mayfly, Stonefly, Caddisfly)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Abundance of Ephemeroptera, Plecoptera, and Trichoptera larvae in mountain streams signifies pristine oligotrophic conditions, while dominance of Chironomid bloodworms flags organic sewage ingress.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Protocol: CPCB Biological Water Quality Criteria</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Macrophyte Encroachment</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Azolla &amp; Water Hyacinth Blooms</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dense surface carpets of *Azolla cristata* on Dal and Wular lakes choke solar irradiance, creating sub-surface anoxia that suffocates indigenous *Schizothorax* snow trout breeding gravels.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Satellite Index: Sentinel-2 NDCI Chlorophyll Proxy</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'canopy-ndvi',
              label: 'Copernicus Sentinel-2 NDVI & Forest Stress',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Coniferous Canopy Vigor Tracking</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Normalized Difference Vegetation Index (NDVI) monitoring across Gulmarg, Lidder, and Pir Panjal fir/pine forests detects early moisture stress and bark beetle defoliation prior to visible canopy dieback.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">NDVI Resolution: 10m spatial resolution at 5-day revisit</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Alpine Meadow Soil Desiccation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Overgrazing and unseasonal heatwaves dry high-altitude hummocky turf soils, accelerating gully erosion along pastoral trekking trails in Gurez, Sonamarg, and Tarsar cirques.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Soil Moisture Proxy: Sentinel-1 SAR C-band backscatter</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="environmental"
          observeTitle="Citizen Ecological Health Sentinel &amp; Bio-Indicator Hub"
          observeSubtitle="Submit benthic stream samples, log fish distress incidents, or record invasive vegetative mats on local waterbodies."
          observeBadge="CPCB Biomonitoring Standard"
          protocols={[
            {
              number: '1',
              title: 'Benthic Macroinvertebrate Kick-Sampling',
              desc: 'Rinse riffle gravel into a 500-micron net; tally presence of Mayflies, Stoneflies, and Caddisflies to calculate stream biotic index.',
              benchmark: 'CPCB Biological Water Quality Criteria (BWQC)',
              icon: FlaskConical,
              color: 'emerald',
            },
            {
              number: '2',
              title: 'Fish Distress & Hypoxia Event Logging',
              desc: 'Document fish gasping at the water surface, erratic swimming, or mortality with water temperature and weather conditions.',
              benchmark: 'Inland Fisheries Environmental Assessment Protocol',
              icon: Droplets,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Invasive Weed Carpet Geo-Mapping',
              desc: 'Photograph dense Azolla, Alternanthera, or Lemna blooms choking wetland bays and record estimated surface area.',
              benchmark: 'Ramsar Wetland Invasive Species Management Standard',
              icon: Leaf,
              color: 'teal',
            },
            {
              number: '4',
              title: 'Conifer Dieback & Forest Pest Survey',
              desc: 'Flag patches of red-needle discoloration, defoliation, or resin bleeding on Deodar and Blue Pine forest perimeters.',
              benchmark: 'Forest Survey of India Pest & Blight Protocol',
              icon: TreePine,
              color: 'amber',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightHealthJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/environmental-health/page.tsx');
  }
}

// ─── 10. RESILIENCE: src/app/environmental-monitoring/environmental-resilience/page.tsx
{
  const filePath = path.resolve('src/app/environmental-monitoring/environmental-resilience/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Add activeTypology state
  if (!content.includes('activeTypology')) {
    content = content.replace(
      "const [riskFilter, setRiskFilter] = useState('all');",
      "const [riskFilter, setRiskFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchDomain && matchStatus && matchPriority && matchRisk;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && (d.priorityLevel === 'Critical' || d.riskExposure === 'Extreme' || d.riskExposure === 'High')) ||
        (activeTypology === 'flood' && (d.resilienceDomain === 'Flood Resilience' || d.resilienceDomain === 'Water System')) ||
        (activeTypology === 'infrastructure' && (d.resilienceDomain === 'Critical Infrastructure' || d.resilienceDomain === 'Wastewater & Sanitation')) ||
        (activeTypology === 'ecosystem' && (d.resilienceDomain === 'Ecosystem Recovery' || d.resilienceDomain === 'Restoration Readiness')) ||
        (activeTypology === 'climate' && (d.resilienceDomain === 'Climate Extremes' || d.resilienceDomain === 'Landslide Resilience' || d.resilienceDomain === 'Forest Fire Resilience')) ||
        (activeTypology === 'community' && (d.resilienceDomain === 'Community Preparedness' || d.resilienceDomain === 'Remote Area Access'));

      return matchSearch && matchScope && matchDistrict && matchDomain && matchStatus && matchPriority && matchRisk && matchTypology;`
    );

    content = content.replace(
      "[filter, domainFilter, statusFilter, priorityFilter, riskFilter]",
      "[filter, domainFilter, statusFilter, priorityFilter, riskFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE ROW ─────────────────────────────────────────────────────── */}";
  const spotlightResilienceJSX = `
      {/* ── Resilience Typologies & Citizen Field Protocols ────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Environmental Resilience Typologies & Stress Buffers"
          typologySubtitle="Select a resilience archetype, ecological sponge buffer, or recovery capacity tier across Kashmir's ecosystems."
          typologyIcon={ShieldCheck}
          typologies={[
            { id: 'all', label: 'All Resilience Systems', count: resilienceRegistry.length, icon: ShieldCheck, color: 'emerald' },
            { id: 'critical', label: 'Critical Priority / High Risk', count: resilienceRegistry.filter(d => d.priorityLevel === 'Critical' || d.riskExposure === 'Extreme' || d.riskExposure === 'High').length, icon: AlertTriangle, color: 'rose' },
            { id: 'flood', label: 'Flood Sponge & Hydrological Buffers', count: resilienceRegistry.filter(d => d.resilienceDomain === 'Flood Resilience' || d.resilienceDomain === 'Water System').length, icon: Waves, color: 'cyan' },
            { id: 'infrastructure', label: 'Lifeline Infrastructure Systems', count: resilienceRegistry.filter(d => d.resilienceDomain === 'Critical Infrastructure' || d.resilienceDomain === 'Wastewater & Sanitation').length, icon: Building2, color: 'sky' },
            { id: 'ecosystem', label: 'Ecosystem & Forest Recovery', count: resilienceRegistry.filter(d => d.resilienceDomain === 'Ecosystem Recovery' || d.resilienceDomain === 'Restoration Readiness').length, icon: TreePine, color: 'teal' },
            { id: 'climate', label: 'Climate Extremes & Slope Safety', count: resilienceRegistry.filter(d => d.resilienceDomain === 'Climate Extremes' || d.resilienceDomain === 'Landslide Resilience' || d.resilienceDomain === 'Forest Fire Resilience').length, icon: Mountain, color: 'amber' },
            { id: 'community', label: 'Community & Remote Area Readiness', count: resilienceRegistry.filter(d => d.resilienceDomain === 'Community Preparedness' || d.resilienceDomain === 'Remote Area Access').length, icon: Activity, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={resilienceRegistry.length}
          entityLabel="resilience systems"
          spotlightTitle="Ecosystem Adaptation & Climate Shock Absorption Capacity"
          spotlightSubtitle="Benchmarking watershed retention capacity, flood detention sponge wetlands, and mountain slope binding resilience."
          tabs={[
            {
              id: 'sponges',
              label: 'Kashmir Natural Sponge Wetlands & Flood Detention',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Ramsar Site #1570</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Hokersar Wetland Sponge Basin</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Acts as the primary flood retention basin downstream of Srinagar, capable of buffering 45+ million cubic meters of flood surge from the Jhelum spill channel during peak snowmelt.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Retention Capacity: 45.2 MCM surge buffer</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Parihaspora Fluvial Plain</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Mirgund &amp; Shallabugh Wetlands</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Shallow interconnected marshes absorb Sukhnag and Ferozpora nallah flash runoff, decelerating flood wave velocities before entering Wular Lake.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Attenuation Rate: 38% peak hydrograph dampening</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Fluvial Riparian Buffer</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Jhelum River Willow &amp; Poplar Bunds</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Extensive root networks of indigenous *Salix tetrasperma* and *Populus ciliata* bind riverbank alluvial silts, preventing catastrophic levee breaches during high shear stress flows.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Bank Stabilization: 84 km vegetative revetment</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'springsheds',
              label: 'Karst Springshed & Microclimate Buffers',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">South Kashmir Karst Aquifer Recharge</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Limestone aquifers in Achabal, Kokernag, and Verinag provide perennial baseflow to River Jhelum even during extreme autumn dry spells, sustaining downstream drinking water and irrigation systems.
                    </p>
                    <div className="text-[11px] text-sky-300 font-mono">Hydrological Stability: Baseflow sustains 28% of dry-season Jhelum discharge</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Agro-Forestry Microclimate Modulation</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Terraced apple orchards and walnut groves on karewa slopes reduce wind velocities and soil moisture evaporation, mitigating frost damage and stabilizing fragile lacustrine clays.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Resilience Index: Karewa soil erosion reduced by 52%</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="resilience"
          observeTitle="Citizen Resilience Monitoring &amp; Climate Adaptation Watch"
          observeSubtitle="Audit riparian buffer health, verify wetland flood storage integrity, or report slope erosion along mountain highways."
          observeBadge="Ecosystem-based Adaptation Active"
          protocols={[
            {
              number: '1',
              title: 'Wetland Flood Storage & Encroachment Audit',
              desc: 'Inspect peripheral demarcations of declared wetlands for earth filling, road construction, or conversion to dry agriculture.',
              benchmark: 'Ramsar Convention Wise Use Guidelines',
              icon: Waves,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'Riparian Buffer Vegetation Canopy Assessment',
              desc: 'Measure the continuous width (target > 15m) of natural tree and shrub cover along riverbanks to assess bank stability.',
              benchmark: 'USFS Stream Visual Assessment Protocol (SVAP)',
              icon: TreePine,
              color: 'emerald',
            },
            {
              number: '3',
              title: 'Slope Infiltration & Soil Runoff Testing',
              desc: 'Document surface gullying and sheetwash on deforested mountain slopes following intense cloudburst events.',
              benchmark: 'FAO Soil Conservation Field Manual',
              icon: Mountain,
              color: 'amber',
            },
            {
              number: '4',
              title: 'Community Emergency Water Source Readiness',
              desc: 'Audit backup community handpumps, covered village springs, and rooftop rainwater harvesting drums in remote areas.',
              benchmark: 'Sphere Humanitarian Minimum Water Standards',
              icon: ShieldCheck,
              color: 'teal',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightResilienceJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/environmental-resilience/page.tsx');
  }
}

// ─── 11. SDG MONITORING: src/app/environmental-monitoring/sdg-monitoring/page.tsx
{
  const filePath = path.resolve('src/app/environmental-monitoring/sdg-monitoring/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Add activeTypology state
  if (!content.includes('activeTypology')) {
    content = content.replace(
      "const [confidenceFilter, setConfidenceFilter] = useState('all');",
      "const [confidenceFilter, setConfidenceFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchGoal && matchStatus && matchTrend && matchPriority && matchConfidence;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'sdg6' && d.goalNumber === 6) ||
        (activeTypology === 'sdg11' && d.goalNumber === 11) ||
        (activeTypology === 'sdg12' && d.goalNumber === 12) ||
        (activeTypology === 'sdg13' && d.goalNumber === 13) ||
        (activeTypology === 'sdg15' && d.goalNumber === 15) ||
        (activeTypology === 'critical' && (d.status === 'Critical' || d.status === 'Off Track'));

      return matchSearch && matchScope && matchDistrict && matchGoal && matchStatus && matchTrend && matchPriority && matchConfidence && matchTypology;`
    );

    content = content.replace(
      "[filter, goalFilter, statusFilter, trendFilter, priorityFilter, confidenceFilter]",
      "[filter, goalFilter, statusFilter, trendFilter, priorityFilter, confidenceFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "<ModuleScopeRow filteredCount={filteredData.length} totalCount={sdgIndicators.length}";
  const spotlightSdgJSX = `
      {/* ── SDG Focus Typologies & Citizen Field Protocols ────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="UN Sustainable Development Goal (SDG) Typologies"
          typologySubtitle="Select a target UN SDG framework, water goal, urban sustainability metric, or off-track indicator."
          typologyIcon={Globe}
          typologies={[
            { id: 'all', label: 'All 36 SDG Indicators', count: sdgIndicators.length, icon: Globe, color: 'emerald' },
            { id: 'critical', label: 'Off Track / Critical Gap', count: sdgIndicators.filter(d => d.status === 'Critical' || d.status === 'Off Track').length, icon: AlertTriangle, color: 'rose' },
            { id: 'sdg6', label: 'SDG 6: Clean Water & Sanitation', count: sdgIndicators.filter(d => d.goalNumber === 6).length, icon: Droplets, color: 'cyan' },
            { id: 'sdg11', label: 'SDG 11: Sustainable Cities', count: sdgIndicators.filter(d => d.goalNumber === 11).length, icon: Building2, color: 'amber' },
            { id: 'sdg12', label: 'SDG 12: Responsible Consumption', count: sdgIndicators.filter(d => d.goalNumber === 12).length, icon: RefreshCw, color: 'teal' },
            { id: 'sdg13', label: 'SDG 13: Climate Action', count: sdgIndicators.filter(d => d.goalNumber === 13).length, icon: Wind, color: 'sky' },
            { id: 'sdg15', label: 'SDG 15: Life on Land', count: sdgIndicators.filter(d => d.goalNumber === 15).length, icon: TreePine, color: 'indigo' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={sdgIndicators.length}
          entityLabel="monitored SDG indicators"
          spotlightTitle="UN Agenda 2030 Himalayan Environmental Performance"
          spotlightSubtitle="Benchmarking Jammu &amp; Kashmir district indicators against NITI Aayog SDG India Index 3.0 and global UN thresholds."
          tabs={[
            {
              id: 'targets-water',
              label: 'SDG 6 (Clean Water) & SDG 11 (Sustainable Cities)',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Target 6.3</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Halving Untreated Wastewater</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Kashmir urban centers currently treat ~48% of domestic blackwater. The 2030 target mandates 100% treatment coverage to protect River Jhelum and Ramsar lacustrine ecosystems.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Current Progress: 58.2% | Target: 100% (2030)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Target 11.6</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Urban Air &amp; Municipal Waste</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Srinagar Smart City initiative targets reduction of annual mean PM2.5 to under 40 µg/m³ and 100% scientific municipal solid waste segregation at source under SBM-Urban 2.0.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Current Segregation: 62% | Air Score: 68/100</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Target 15.1 &amp; 15.4</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Conservation of Mountain Ecosystems</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Conservation of sub-alpine birch (*Betula utilis*) corridors and high-altitude wetland habitats across Ladakh, Gurez, and Pir Panjal under protected network frameworks.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Protected Area Coverage: 12.8% of geographical area</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'niti-index',
              label: 'NITI Aayog SDG India Index Alignment',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Front-Runner Environmental Category</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      J&amp;K ranks in the 'Front Runner' tier (score 65–99) for SDG 15 (Life on Land) due to extensive forest cover (47% including recorded forest area) and tree density in North Kashmir.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">NITI Score: 74/100 for Goal 15</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Performer Category Catch-Up Challenges</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      SDG 6 and SDG 12 require accelerated capital investment in rural tap water chlorination reliability and elimination of legacy municipal waste dumping near riverbanks.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">NITI Score: 58/100 for Goal 6 (Needs Improvement)</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="environmental"
          observeTitle="Citizen SDG Ground-Truthing &amp; Community Indicators"
          observeSubtitle="Audit local village tap water, verify waste collection at school level, or report conservation milestones for UN tracking."
          observeBadge="UN Agenda 2030 Active"
          protocols={[
            {
              number: '1',
              title: 'SDG 6.3.2 Ambient Water Quality Testing',
              desc: 'Measure core ambient water quality parameters (DO, pH, Electrical Conductivity) to compute the global water quality index.',
              benchmark: 'UN-Water Global Environmental Monitoring System (GEMS)',
              icon: Droplets,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'SDG 11.6.1 Municipal Waste Collection Tally',
              desc: 'Audit whether municipal collection trucks service residential streets at least 3 times per week with dry/wet separation.',
              benchmark: 'UN-Habitat Waste Wise Cities Tool (WaCT)',
              icon: Building2,
              color: 'amber',
            },
            {
              number: '3',
              title: 'SDG 12.5 Waste Recycling & Diversion Audit',
              desc: 'Estimate the percentage of plastic and cardboard packaging collected by informal scrap dealers (kabadis) in your ward.',
              benchmark: 'MoEFCC Plastic Waste Management Rules',
              icon: RefreshCw,
              color: 'teal',
            },
            {
              number: '4',
              title: 'SDG 15.1 Forest Cover Boundary Check',
              desc: 'Document and flag boundary pillars where state demarcated forest land is cleared for horticulture or road building.',
              benchmark: 'Forest Conservation Act 1980 / J&K Forest Act',
              icon: TreePine,
              color: 'emerald',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightSdgJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/sdg-monitoring/page.tsx');
  }
}

// ─── 12. UTILITY INCIDENTS: src/app/environmental-monitoring/utility-incidents/page.tsx
{
  const filePath = path.resolve('src/app/environmental-monitoring/utility-incidents/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Add activeTypology state
  if (!content.includes('activeTypology')) {
    content = content.replace(
      "const [severityFilter, setSeverityFilter] = useState('all');",
      "const [severityFilter, setSeverityFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchCategory && matchStatus && matchSeverity;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && (d.severity === 'Critical' || d.severity === 'High')) ||
        (activeTypology === 'active' && d.status === 'Active') ||
        (activeTypology === 'water' && (d.utility_type?.toLowerCase().includes('water') || d.incident_category?.toLowerCase().includes('water') || d.incident_title?.toLowerCase().includes('water'))) ||
        (activeTypology === 'sewage' && (d.utility_type?.toLowerCase().includes('sewage') || d.incident_category?.toLowerCase().includes('drain') || d.incident_title?.toLowerCase().includes('sewer'))) ||
        (activeTypology === 'power' && (d.utility_type?.toLowerCase().includes('power') || d.utility_type?.toLowerCase().includes('electric')));

      return matchSearch && matchScope && matchDistrict && matchCategory && matchStatus && matchSeverity && matchTypology;`
    );

    content = content.replace(
      "[filter, categoryFilter, statusFilter, severityFilter]",
      "[filter, categoryFilter, statusFilter, severityFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE ROW ─────────────────────────────────────────────────────── */}";
  const spotlightUtilityJSX = `
      {/* ── Utility Incidents Typologies & Citizen Field Protocols ─────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Utility Breakdown Typologies & Service Incident Regimes"
          typologySubtitle="Filter incidents by critical failure severity, active response status, water main bursts, or drainage blockages."
          typologyIcon={AlertTriangle}
          typologies={[
            { id: 'all', label: 'All Incidents', count: utilityIncidentsData.length, icon: AlertTriangle, color: 'emerald' },
            { id: 'critical', label: 'Critical / High Severity', count: utilityIncidentsData.filter(d => d.severity === 'Critical' || d.severity === 'High').length, icon: Shield, color: 'rose' },
            { id: 'active', label: 'Active Unresolved Cases', count: utilityIncidentsData.filter(d => d.status === 'Active').length, icon: Activity, color: 'amber' },
            { id: 'water', label: 'Water Mains & Supply Failures', count: utilityIncidentsData.filter(d => d.utility_type?.toLowerCase().includes('water') || d.incident_category?.toLowerCase().includes('water') || d.incident_title?.toLowerCase().includes('water')).length, icon: Droplets, color: 'cyan' },
            { id: 'sewage', label: 'Sewer & Drainage Blockages', count: utilityIncidentsData.filter(d => d.utility_type?.toLowerCase().includes('sewage') || d.incident_category?.toLowerCase().includes('drain') || d.incident_title?.toLowerCase().includes('sewer')).length, icon: Waves, color: 'sky' },
            { id: 'power', label: 'Pumping Substation Outages', count: utilityIncidentsData.filter(d => d.utility_type?.toLowerCase().includes('power') || d.utility_type?.toLowerCase().includes('electric')).length, icon: Zap, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={utilityIncidentsData.length}
          entityLabel="tracked incidents"
          spotlightTitle="Municipal Utility Reliability & Rapid Response Command"
          spotlightSubtitle="Live incident tracking covering potable pipeline fractures, sub-zero freeze bursts, sewage pumping disruptions, and power outages."
          tabs={[
            {
              id: 'freeze-thaw',
              label: 'Winter Frost Freeze-Thaw Pipeline Fractures',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Sub-Zero Mechanics</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Exposed Distribution Pipe Freezing</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Temperatures dropping to -8°C during Chillai Kalan freeze shallow galvanized iron (GI) pipes crossing bridges and uninsulated exterior walls, leading to catastrophic longitudinal splitting upon morning thaw.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Peak Incident Season: January 5 to February 10</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Pumping Station Cavitation</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Trash Rake Icing &amp; Pump Tripping</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Floating slush and frazil ice jam intake trash racks at major drainage pump stations along River Jhelum, triggering impeller cavitation and automatic motor shutdown.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Operating Standard: Heated intake bar screens</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Rapid Repair SLA</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Jal Shakti Emergency Flying Squads</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dedicated welding teams equipped with generator-driven hot-air thawing equipment maintain 4-hour target turnaround times for critical trunk feeder line fractures.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Response Standard: 4-hour critical turnaround SLA</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'spillway-breach',
              label: 'Canal Breaches & Embankment Slumping',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Flood Spill Channel Riprap Erosion</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      High velocity water during spring cloudbursts scours earthen toe protection along the Padshahi Bagh–Wular flood spill channel, threatening adjacent farmland in Narbal and Hajin.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Surveillance Frequency: 12-hour patrol during flood alerts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Sewer Siphon Chokepoints</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Subsurface sewer siphons traversing beneath navigation canals in Srinagar require high-velocity hydro-jetting to clear gravel and non-biodegradable silt deposits.
                    </p>
                    <div className="text-[11px] text-sky-300 font-mono">Maintenance Protocol: Monthly vacuum desilting cycle</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="infrastructure"
          observeTitle="Citizen Utility Breakdown Dispatch &amp; Pipe Burst Reporting"
          observeSubtitle="Report high-pressure water main bursts, electric pump tripping, open sewer manholes, or canal leaks for emergency intervention."
          observeBadge="PHE Emergency Response Active"
          protocols={[
            {
              number: '1',
              title: 'Water Main Burst & Road Undermining',
              desc: 'Photograph surface water geysers or asphalt sinking caused by high-pressure distribution pipe fractures.',
              benchmark: 'Jal Shakti Department Emergency Response Norm',
              icon: Droplets,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'Missing Manhole Cover & Drain Hazard',
              desc: 'Log open or displaced cast-iron sewer manhole lids on public roads posing fatal hazards to pedestrians and traffic.',
              benchmark: 'Municipal Safety & Street Hazard Code',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '3',
              title: 'Drainage Pumping Station Power Tripping',
              desc: 'Verify if neighborhood stormwater pumps fail during rainstorms due to local electrical feeder disruptions.',
              benchmark: 'Urban Drainage Operating Protocol (SMC)',
              icon: Zap,
              color: 'amber',
            },
            {
              number: '4',
              title: 'Canal Bank Seepage & Sandbag Breach Check',
              desc: 'Identify water piping or muddy seepage through irrigation canal walls or emergency sandbag reinforcements.',
              benchmark: 'Irrigation & Flood Control Department Manual',
              icon: Waves,
              color: 'teal',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightUtilityJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/utility-incidents/page.tsx');
  }
}

// ─── 13. HAZARD INTELLIGENCE: src/app/hazard-intelligence/page.tsx ─────────────
{
  const filePath = path.resolve('src/app/hazard-intelligence/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Insert Spotlight component right above Submodules Grid
  const targetSubmodules = "{/* Submodules Grid */}";
  const spotlightHazardJSX = `
      {/* ── Multi-Hazard Typologies & Early Warning Citizen Protocols ──────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Western Himalayan Hazard Typologies & Crisis Regimes"
          typologySubtitle="Select a geological, meteorological, or cryospheric hazard category to review real-time alerts across Kashmir and Ladakh."
          typologyIcon={AlertTriangle}
          typologies={[
            { id: 'all', label: 'All Hazard Domains', count: 8, icon: AlertTriangle, color: 'rose' },
            { id: 'floods', label: 'Riverine & Flash Floods', count: 41, icon: Waves, color: 'blue' },
            { id: 'landslides', label: 'Slope Instability & Debris Flows', count: 48, icon: Mountain, color: 'amber' },
            { id: 'avalanches', label: 'Alpine Snowpack & Avalanches', count: 18, icon: Snowflake, color: 'sky' },
            { id: 'earthquakes', label: 'Seismic Faults & Quakes', count: 12, icon: Activity, color: 'rose' },
            { id: 'glofs', label: 'Glacial Outburst Floods (GLOFs)', count: 18, icon: Droplets, color: 'teal' },
            { id: 'fires', label: 'Wildfires & Forest Hotspots', count: 6, icon: Flame, color: 'orange' },
          ]}
          activeTypology={hazardFilter}
          onSelectTypology={(id) => setHazardFilter(id)}
          showingCount={hazardFilter === 'all' ? 8 : 1}
          totalCount={8}
          entityLabel="hazard submodules"
          spotlightTitle="Multi-Hazard Early Warning & Cryospheric Risk Synthesis"
          spotlightSubtitle="Integrating USGS seismic sensors, GloFAS flood forecasts, IMD meteorological radars, and field observers across 44 Himalayan districts."
          tabs={[
            {
              id: 'landslide-corridors',
              label: 'NH-44 & Mountain Highway Slope Instability',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Critical Highway Chokepoint</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Ramban-Banihal NH-44 Sector</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Sheared Murree formation siltstones and Panjal volcanics subjected to continuous road widening cut-slopes trigger recurring rockfalls and mudslides at Panthyal, Mehar, and Cafeteria Morh.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Hazard Index: Critical during rainfall > 25 mm/24h</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Trans-Himalayan Arterial</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Zoji La (NH-1) Pass Axis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Elevated at 3,528m connecting Kashmir to Ladakh. Prone to severe wind-slab avalanches and spring freeze-thaw rock detachment along steep serpentine cliffs near Gumri and Captain Morh.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Mitigation: 14.15 km all-weather Zoji La tunnel</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">High-Altitude Cryosphere</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Glacial Moraine Lake Outbursts</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Over 18 expanding proglacial lakes in Zanskar, Karakoram, and Upper Indus basin monitored via Sentinel-2 satellite imagery for moraine dam breaches and ice avalanche impact surges.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Early Warning: High-resolution satellite altimetry</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'seismic-faults',
              label: 'Seismic Hazards & Active Himalayan Faults',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Main Boundary Thrust (MBT) &amp; Kashmir Seismic Gap</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      The tectonic collision between the Indian and Eurasian plates creates immense strain accumulation. The 2005 Kashmir earthquake (M7.6) ruptured the Muzaffarabad fault; active monitoring tracks microseismicity in Chenab and Pir Panjal.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Seismic Zone: Zone V (Highest Seismic Vulnerability)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-blue-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">River Jhelum Hydraulic Flood Routing</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Automated ultrasonic river gauges at Sangam (Anantnag), Ram Munshi Bagh (Srinagar), and Asham (Bandipora) provide continuous discharge hydrographs to detect impending flood stage exceedance (target &lt; 21 ft at Sangam).
                    </p>
                    <div className="text-[11px] text-blue-300 font-mono">Flood Stage Benchmark: 21.0 ft (Alert) | 23.0 ft (Danger)</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="hazard"
          observeTitle="Citizen Disaster &amp; Hazard Early Warning Sentinel Network"
          observeSubtitle="Dispatch immediate crowd-sourced field alerts for flash floods, slope tension cracks, road blockages, or avalanche chutes."
          observeBadge="SDMA Disaster Protocol Active"
          protocols={[
            {
              number: '1',
              title: 'Slope Tension Crack & Subsidence Spotting',
              desc: 'Photograph newly emerging ground fractures or tilted telephone poles on mountain slopes indicating imminent landsliding.',
              benchmark: 'Geological Survey of India Landslide Warning Protocol',
              icon: Mountain,
              color: 'amber',
            },
            {
              number: '2',
              title: 'Rapid River Gauge Water Level Spotting',
              desc: 'Log and photograph river level markings on bridges or gauge poles during intense rainfall and cloudburst events.',
              benchmark: 'Central Water Commission (CWC) Flood Alert Standard',
              icon: Waves,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'Avalanche Crown Fracture Observation',
              desc: 'Document visible fracture lines, shooting cracks in snowpack, or recent avalanche debris across backcountry ski and transit routes.',
              benchmark: 'Defence Geoinformatics Research Establishment (DGRE)',
              icon: Snowflake,
              color: 'sky',
            },
            {
              number: '4',
              title: 'Forest Smoke Plume & Thermal Hotspot Dispatch',
              desc: 'Report smoke plumes in pine forest ridges with GPS coordinates to mobilize local forest protection fire crews.',
              benchmark: 'Forest Survey of India Fire Alert Protocol',
              icon: Flame,
              color: 'rose',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetSubmodules, spotlightHazardJSX + '\n      ' + targetSubmodules);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/hazard-intelligence/page.tsx');
  }
}

// ─── 14. NGO IMPACT: src/app/ngo-impact/page.tsx ───────────────────────────────
{
  const filePath = path.resolve('src/app/ngo-impact/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Insert Spotlight component right above Featured NGOs
  const targetFeatured = "{/* ─── 4. FEATURED NGOs ─────────────────────────────────────────────────── */}";
  const spotlightNgoJSX = `
        {/* ── NGO Focus Typologies & Citizen Field Protocols ───────────────── */}
        <div>
          <EnvironmentalObserveSpotlight
            typologyTitle="Civil Society Focus Typologies & Conservation Guilds"
            typologySubtitle="Select a grassroots intervention theme, verified NGO status, or volunteer program across Kashmir's civil society network."
            typologyIcon={Users}
            typologies={[
              { id: 'all', label: 'All Organizations', count: ngoRegistryData.length, icon: Users, color: 'emerald' },
              { id: 'verified', label: 'Verified & Audited NGOs', count: ngoRegistryData.filter(d => d.verification_status.includes('verified') || d.verification_status.includes('reviewed')).length, icon: ShieldCheck, color: 'teal' },
              { id: 'lakes', label: 'Lake & Wetland Conservation', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('water') || f.toLowerCase().includes('lake') || f.toLowerCase().includes('wetland'))).length, icon: Droplet, color: 'cyan' },
              { id: 'waste', label: 'Solid Waste & Cleanups', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('waste') || f.toLowerCase().includes('pollution'))).length, icon: Recycle, color: 'amber' },
              { id: 'forest', label: 'Forests & Reforestation', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('forest') || f.toLowerCase().includes('biodiversity') || f.toLowerCase().includes('tree'))).length, icon: Leaf, color: 'emerald' },
              { id: 'climate', label: 'Climate Education & Advocacy', count: ngoRegistryData.filter(d => d.focus_areas.some(f => f.toLowerCase().includes('climate') || f.toLowerCase().includes('education') || f.toLowerCase().includes('youth'))).length, icon: Book, color: 'violet' },
            ]}
            activeTypology={selectedFocus === 'all' ? 'all' : selectedFocus.toLowerCase().includes('water') ? 'lakes' : selectedFocus.toLowerCase().includes('waste') ? 'waste' : selectedFocus.toLowerCase().includes('forest') ? 'forest' : 'all'}
            onSelectTypology={(id) => {
              if (id === 'all') setSelectedFocus('all');
              else if (id === 'lakes') setSelectedFocus('Water Conservation');
              else if (id === 'waste') setSelectedFocus('Solid Waste');
              else if (id === 'forest') setSelectedFocus('Forest Conservation');
            }}
            showingCount={ngoRegistryData.length}
            totalCount={ngoRegistryData.length}
            entityLabel="registered NGOs"
            spotlightTitle="Grassroots Environmental Impact & Volunteer Mobilization"
            spotlightSubtitle="Documenting certified environmental NGOs, lake restoration volunteer brigades, community afforestation, and public action."
            tabs={[
              {
                id: 'lake-cleanups',
                label: 'Community Lake Cleanups & De-Weeding Drives',
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                      <span className="text-xs font-bold text-cyan-400 block mb-1">Grassroots Water Action</span>
                      <h5 className="text-sm font-semibold text-white mb-2">Dal Lake &amp; Anchar Youth Volunteer Coalitions</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Student environmental clubs and shikarawallas conduct weekend plastic retrieval drives, extracting 12+ tons of floating polyethylene and PET bottles from interior lake channels.
                      </p>
                      <div className="text-[11px] text-cyan-300 font-mono">Volunteer Metric: 2,400+ citizen hours logged</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                      <span className="text-xs font-bold text-emerald-400 block mb-1">Reforestation Drives</span>
                      <h5 className="text-sm font-semibold text-white mb-2">Community Springshed &amp; Native Afforestation</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Plantation of indigenous deodar, walnut, and willow saplings in degraded sub-catchments to restore vanishing village drinking springs and mitigate mudslides.
                      </p>
                      <div className="text-[11px] text-emerald-300 font-mono">Saplings Planted: 85,000+ with 88% survival rate</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                      <span className="text-xs font-bold text-violet-400 block mb-1">Alpine Mountain Ethics</span>
                      <h5 className="text-sm font-semibold text-white mb-2">High-Altitude Leave-No-Trace Campaigns</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Trekking associations partner to evacuate plastic litter and metal cans from high alpine meadows (Kashmir Great Lakes trail, Tarsar-Marsar, Kolahoi basecamp).
                      </p>
                      <div className="text-[11px] text-violet-300 font-mono">High-Altitude Waste Evacuated: 6.8 MT safely disposed</div>
                    </div>
                  </div>
                ),
              },
              {
                id: 'verification-audit',
                label: 'NGO Governance & Field Verification Standards',
                content: (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                      <h5 className="text-sm font-semibold text-white mb-2">Transparent Field Audit Protocol</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Every partner organization featured in the KEW directory undergoes rigorous field verification: verifying 12A/80G status, auditing geotagged project impact reports, and confirming local community beneficiary feedback.
                      </p>
                      <div className="text-[11px] text-teal-300 font-mono">Governance: 100% verified grassroots impact documentation</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                      <h5 className="text-sm font-semibold text-white mb-2">Student &amp; Youth Eco-Clubs</h5>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        Over 140 school and college environmental clubs across Kashmir receive educational toolkits, field water-testing vials, and training on citizen biodiversity documenting.
                      </p>
                      <div className="text-[11px] text-amber-300 font-mono">Youth Network: Active in all 10 Kashmir valley districts</div>
                    </div>
                  </div>
                ),
              },
            ]}
            observeCategory="community"
            observeTitle="Citizen Volunteer Action &amp; Community Project Verification"
            observeSubtitle="Submit reports on completed cleanup drives, audit sapling survival rates, or nominate grassroots conservation leaders."
            observeBadge="Civil Society Impact Active"
            protocols={[
              {
                number: '1',
                title: 'Volunteer Cleanup Brand & Weight Audit',
                desc: 'Weigh collected trash by plastic type (PET, multi-layer packaging) and tally corporate producer brands for accountability.',
                benchmark: 'Break Free From Plastic Global Brand Audit Protocol',
                icon: Recycle,
                color: 'amber',
              },
              {
                number: '2',
                title: 'Community Tree Sapling Survival Check',
                desc: 'Inspect community plantation sites at 6-month and 12-month intervals to record sapling height, browsing damage, and survival %.',
                benchmark: 'MoEFCC National Afforestation & Eco-Development Board',
                icon: Leaf,
                color: 'emerald',
              },
              {
                number: '3',
                title: 'Local Waterbody Guardian Observation',
                desc: 'Adopt a local pond, spring, or canal section; perform monthly water clarity checks and report illegal dumping encroachment.',
                benchmark: 'WASH Community Scorecard Protocol',
                icon: Droplet,
                color: 'cyan',
              },
              {
                number: '4',
                title: 'Wildlife Rescue & Injured Fauna Alert',
                desc: 'Report distressed migratory waterfowl, injured Hangul, or human-wildlife encounters to rapid NGO response units.',
                benchmark: 'Wildlife Protection Act 1972 Rescue Standard',
                icon: Heart,
                color: 'rose',
              },
            ]}
          />
        </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetFeatured, spotlightNgoJSX + '\n        ' + targetFeatured);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/ngo-impact/page.tsx');
  }
}

console.log('Batch 4 complete');
