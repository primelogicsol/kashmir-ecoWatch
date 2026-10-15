const fs = require('fs');
const path = require('path');

// ─── 6. DRINKING WATER: src/app/environmental-monitoring/drinking-water/page.tsx
{
  const filePath = path.resolve('src/app/environmental-monitoring/drinking-water/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Import EnvironmentalObserveSpotlight
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
      "return matchSearch && matchScope && matchDistrict && matchSupply && matchQuality && matchRisk;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(d.risk_level)) ||
        (activeTypology === 'surface' && (d.supply_type?.toLowerCase().includes('surface') || d.supply_type?.toLowerCase().includes('river') || d.supply_type?.toLowerCase().includes('canal'))) ||
        (activeTypology === 'ground' && (d.supply_type?.toLowerCase().includes('ground') || d.supply_type?.toLowerCase().includes('tubewell') || d.supply_type?.toLowerCase().includes('borewell'))) ||
        (activeTypology === 'spring' && (d.supply_type?.toLowerCase().includes('spring') || d.supply_type?.toLowerCase().includes('gravity'))) ||
        (activeTypology === 'safe' && d.risk_level === 'Low');

      return matchSearch && matchScope && matchDistrict && matchSupply && matchQuality && matchRisk && matchTypology;`
    );

    content = content.replace(
      "[filter, supplyFilter, qualityFilter, riskFilter]",
      "[filter, supplyFilter, qualityFilter, riskFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}";
  const spotlightDrinkingWaterJSX = `
      {/* ── Drinking Water Typologies & Citizen Field Protocols ────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Drinking Water Supply Typologies & Potability Vulnerabilities"
          typologySubtitle="Select a water source typology, treatment scheme, or risk tier to audit potable supply health across Kashmir."
          typologyIcon={Droplets}
          typologies={[
            { id: 'all', label: 'All Water Sources', count: drinkingWaterData.length, icon: Droplets, color: 'emerald' },
            { id: 'critical', label: 'High / Critical Risk', count: drinkingWaterData.filter(d => ['Critical', 'High'].includes(d.risk_level)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'surface', label: 'Surface River & Canal Schemes', count: drinkingWaterData.filter(d => d.supply_type?.toLowerCase().includes('surface') || d.supply_type?.toLowerCase().includes('river') || d.supply_type?.toLowerCase().includes('canal')).length, icon: Waves, color: 'cyan' },
            { id: 'ground', label: 'Deep Aquifer & Tubewells', count: drinkingWaterData.filter(d => d.supply_type?.toLowerCase().includes('ground') || d.supply_type?.toLowerCase().includes('tubewell') || d.supply_type?.toLowerCase().includes('borewell')).length, icon: MapPin, color: 'indigo' },
            { id: 'spring', label: 'Spring-Fed Gravity Networks', count: drinkingWaterData.filter(d => d.supply_type?.toLowerCase().includes('spring') || d.supply_type?.toLowerCase().includes('gravity')).length, icon: FlaskConical, color: 'sky' },
            { id: 'safe', label: 'Safe Baseline Schemes', count: drinkingWaterData.filter(d => d.risk_level === 'Low').length, icon: CheckCircle, color: 'teal' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={drinkingWaterData.length}
          entityLabel="monitored supplies"
          spotlightTitle="Potable Supply Infrastructure & Water Quality Benchmarks"
          spotlightSubtitle="Surveillance of Public Health Engineering (PHE / Jal Shakti) filtration plants, chlorination dosages, and pipeline contamination."
          tabs={[
            {
              id: 'filtration',
              label: 'Rangil & Doodhpathri WTP Command Basins',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Northern Potable Backbone</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Rangil Water Treatment Plant</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Supplies ~36 MGD treated water drawn from the glacial Sind River via the Sind Extension Canal. Operates rapid gravity sand filters and automated alum dosing for low post-melt turbidity.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Service Population: ~650,000 residents</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Southern Urban Supply</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Doodh Ganga / Kralpora WTP</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Supplies uptown Srinagar (Chanapora, Hyderpora, Rawalpora). High vulnerability during autumn/monsoon rainstorms due to upstream soil erosion and agricultural runoff in Budgam.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Capacity: 10 MGD with dual flocculation basins</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Springshed Gravity Schemes</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Rural Pir Panjal &amp; Anantnag Springs</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Community drinking water relies directly on natural karst springs (Achabal, Kokernag, Verinag). Vulnerable to surface microbial ingress where intake chambers lack fenced catchment sanitary buffers.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Risk Profile: Fecal coliform spikes post-rainfall</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'disinfection',
              label: 'Chlorination Integrity & Microbial Safety',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Free Residual Chlorine (FRC) Monitoring</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Terminal consumer tap water must maintain minimum 0.2 mg/L free chlorine to safeguard against cross-contamination from negative pressure leaks in aging distribution networks.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Standard: BIS 10500:2012 Drinking Water Specification</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Bacteriological Surveillance &amp; Turbidity</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Periodic testing for E. coli / total coliform in peripheral overhead storage reservoirs (ESRs) ensures zero pathogenic transmission across schools and hospitals.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Target: 0 MPN/100 mL coliform count</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="water"
          observeTitle="Citizen Potable Water Quality Surveillance &amp; Tap Testing Network"
          observeSubtitle="Test tap water for residual chlorine, check turbidity, or report suspected waterborne illness outbreaks in your neighborhood."
          observeBadge="BIS 10500 Potability Standard"
          protocols={[
            {
              number: '1',
              title: 'Free Residual Chlorine DPD Colorimetry',
              desc: 'Use DPD-1 test tablets or strips to measure active chlorine in tap water (acceptable range: 0.2 to 0.5 mg/L).',
              benchmark: 'BIS 10500:2012 Drinking Water Standard',
              icon: FlaskConical,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'Turbidity & Sedimentation Observation',
              desc: 'Inspect water clarity against white background or measure using portable nephelometer (acceptable: < 1 NTU, max: 5 NTU).',
              benchmark: 'Central Public Health Engineering Organization',
              icon: Droplets,
              color: 'teal',
            },
            {
              number: '3',
              title: 'H2S Strip Paper Coliform Screening',
              desc: 'Incubate a sample with hydrogen sulfide test paper for 24 hours at 35°C; black coloration indicates pathogenic coliform presence.',
              benchmark: 'WHO Field Bacteriological Water Protocol',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '4',
              title: 'Pipeline Leakage & Contamination Ingress',
              desc: 'Photograph broken or submerged potable water distribution pipes passing through dirty drainage ditches.',
              benchmark: 'Jal Shakti Mission Distribution Safety Standard',
              icon: Shield,
              color: 'amber',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightDrinkingWaterJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/drinking-water/page.tsx');
  }
}

// ─── 7. CRITICAL INFRASTRUCTURE: src/app/environmental-monitoring/critical-infrastructure/page.tsx
{
  const filePath = path.resolve('src/app/environmental-monitoring/critical-infrastructure/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Import EnvironmentalObserveSpotlight
  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Add activeTypology state
  if (!content.includes('activeTypology')) {
    content = content.replace(
      "const [statusFilter, setStatusFilter] = useState('all');",
      "const [statusFilter, setStatusFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchAsset && matchPriority && matchStatus;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && (d.priority_level === 'Critical' || d.risk_exposure.includes('Critical') || d.risk_exposure.includes('High'))) ||
        (activeTypology === 'water' && (d.asset_type.toLowerCase().includes('water') || d.asset_type.toLowerCase().includes('reservoir') || d.asset_type.toLowerCase().includes('wtp'))) ||
        (activeTypology === 'flood' && (d.asset_type.toLowerCase().includes('flood') || d.asset_type.toLowerCase().includes('drain') || d.asset_type.toLowerCase().includes('spill') || d.asset_type.toLowerCase().includes('bund'))) ||
        (activeTypology === 'waste' && (d.asset_type.toLowerCase().includes('waste') || d.asset_type.toLowerCase().includes('landfill') || d.asset_type.toLowerCase().includes('transfer'))) ||
        (activeTypology === 'hydro' && (d.asset_type.toLowerCase().includes('dam') || d.asset_type.toLowerCase().includes('power') || d.asset_type.toLowerCase().includes('hydro')));

      return matchSearch && matchScope && matchDistrict && matchAsset && matchPriority && matchStatus && matchTypology;`
    );

    content = content.replace(
      "[filter, assetFilter, priorityFilter, statusFilter]",
      "[filter, assetFilter, priorityFilter, statusFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}";
  const spotlightInfraJSX = `
      {/* ── Critical Infrastructure Typologies & Citizen Field Protocols ──── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Critical Infrastructure Typologies & Asset Resilience"
          typologySubtitle="Select an infrastructure category, flood protection barrier, or vulnerability tier across Kashmir's lifeline systems."
          typologyIcon={Building2}
          typologies={[
            { id: 'all', label: 'All Lifeline Assets', count: infrastructureData.length, icon: Building2, color: 'emerald' },
            { id: 'critical', label: 'Critical / High Exposure', count: infrastructureData.filter(d => d.priority_level === 'Critical' || d.risk_exposure.includes('Critical') || d.risk_exposure.includes('High')).length, icon: AlertTriangle, color: 'rose' },
            { id: 'water', label: 'Potable WTPs & Reservoirs', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('water') || d.asset_type.toLowerCase().includes('reservoir') || d.asset_type.toLowerCase().includes('wtp')).length, icon: Droplet, color: 'cyan' },
            { id: 'flood', label: 'Flood Spillways & Embankments', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('flood') || d.asset_type.toLowerCase().includes('drain') || d.asset_type.toLowerCase().includes('spill') || d.asset_type.toLowerCase().includes('bund')).length, icon: Shield, color: 'sky' },
            { id: 'waste', label: 'Waste Transfer & Landfills', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('waste') || d.asset_type.toLowerCase().includes('landfill') || d.asset_type.toLowerCase().includes('transfer')).length, icon: Trash2, color: 'amber' },
            { id: 'hydro', label: 'Dams & Hydropower Basins', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('dam') || d.asset_type.toLowerCase().includes('power') || d.asset_type.toLowerCase().includes('hydro')).length, icon: Zap, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={infrastructureData.length}
          entityLabel="monitored assets"
          spotlightTitle="Lifeline Asset Hardening & Urban Flood Defense Infrastructure"
          spotlightSubtitle="Geo-inventory of critical water treatment plants, flood spill gates, wastewater pump stations, and mountain highway lifelines."
          tabs={[
            {
              id: 'flood-spill',
              label: 'Flood Spill Channel & Bund Defense Infrastructure',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <span className="text-xs font-bold text-sky-400 block mb-1">Primary Bypass Lifeline</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Padshahi Bagh Spill Channel Head</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Engineered to divert up to 17,000 cusecs excess flood discharge from River Jhelum around Srinagar city limits into Wular Lake via Hokersar wetland.
                    </p>
                    <div className="text-[11px] text-sky-300 font-mono">Current Safe Discharge: 12,500 cusecs</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Urban Drainage Hubs</span>
                    <h5 className="text-sm font-semibold text-white mb-2">High-Capacity Stormwater Pump Stations</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Over 84 dewatering stations in Srinagar (Bemina, Kursu, Dalgate, Shalteng) provide mechanical discharge into River Jhelum during high river stage conditions.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Pumping Reliability: 99.4% dual diesel backup</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Mountain Corridors</span>
                    <h5 className="text-sm font-semibold text-white mb-2">NH-44 &amp; Z-Morh Lifeline Tunnels</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      All-weather road connectivity through avalanche and landslide corridors. Protected with specialized rockfall barriers, avalanche sheds, and subsurface drainage conduits.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Corridor Clearance: 24/7 winter snowcutter deployment</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'wtp-stp',
              label: 'Treatment Plants & Energy Backups',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Potable Water Treatment Redundancy</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Critical WTPs (Rangil, Kralpora, Alasteng, Nishat) maintain automated backwash cycles and reserve chemical stores to withstand high-turbidity glacial snowmelt events.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Standard: Central Public Health &amp; Environmental Engineering Org</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Substation &amp; Generator Resilience</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dedicated 33kV express electrical feeders connect essential hospital facilities, municipal pumping stations, and cryogenic oxygen plants to prevent freeze-thaw blackout disruptions.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Uptime SLA: 99.9% emergency dual-grid feed</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="infrastructure"
          observeTitle="Citizen Lifeline Infrastructure Watch &amp; Hazard Reporting"
          observeSubtitle="Inspect river embankments for cracks, report stormwater pumping failures, or flag infrastructure encroachments."
          observeBadge="Lifeline Protection Active"
          protocols={[
            {
              number: '1',
              title: 'Embankment & Bund Crack Inspection',
              desc: 'Photograph slumping, tension cracks, or animal burrowing along River Jhelum flood protection earthen bunds.',
              benchmark: 'Central Water Commission Dam & Bund Safety Code',
              icon: Shield,
              color: 'sky',
            },
            {
              number: '2',
              title: 'Stormwater Dewatering Station Status',
              desc: 'Verify if local neighborhood dewatering pumps are operational during seasonal inundation and cloudbursts.',
              benchmark: 'Urban Flood Disaster Management Guidelines (NDMA)',
              icon: Droplet,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'WTP Chemical Coagulant & Chlorination Dosing',
              desc: 'Inspect municipal treatment plants for adequate alum and chlorine supply reserves during winter access isolation.',
              benchmark: 'PHE Infrastructure Operating Manual',
              icon: FlaskConical,
              color: 'teal',
            },
            {
              number: '4',
              title: 'Buffer Zone & Floodplain Encroachment',
              desc: 'Log unauthorized concrete construction within 100 meters of riverbanks, canals, and flood retention wetlands.',
              benchmark: 'J&K Water Resources Regulation & Management Act 2010',
              icon: AlertTriangle,
              color: 'rose',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightInfraJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/critical-infrastructure/page.tsx');
  }
}

// ─── 8. AIR POLLUTION: src/app/environmental-monitoring/air-pollution/page.tsx ──
{
  const filePath = path.resolve('src/app/environmental-monitoring/air-pollution/page.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Import EnvironmentalObserveSpotlight
  if (!content.includes('EnvironmentalObserveSpotlight')) {
    content = content.replace(
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';",
      "import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';\nimport { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';"
    );
  }

  // Add activeTypology state
  if (!content.includes('activeTypology')) {
    content = content.replace(
      "const [aqiFilter, setAqiFilter] = useState('all');",
      "const [aqiFilter, setAqiFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchAqi;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'unhealthy' && (d.aqi >= 100 || d.aqiCategory === 'Poor' || d.aqiCategory === 'Very Poor' || d.aqiCategory === 'Severe')) ||
        (activeTypology === 'kiln' && (d.district === 'Budgam' || d.district === 'Pulwama')) ||
        (activeTypology === 'highway' && (d.district === 'Ramban' || d.district === 'Anantnag' || d.district === 'Baramulla')) ||
        (activeTypology === 'alpine' && (d.scope?.toLowerCase().includes('regional') || d.district === 'Ganderbal' || d.district === 'Kupwara' || d.aqi < 50)) ||
        (activeTypology === 'satisfactory' && d.aqi < 100);

      return matchSearch && matchScope && matchDistrict && matchAqi && matchTypology;`
    );

    content = content.replace(
      "[liveData, filter, aqiFilter]",
      "[liveData, filter, aqiFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above the data section
  const targetDataSection = "{/* ── DATA SECTION ─────────────────────────────────────────────────── */}";
  const spotlightAirJSX = `
      {/* ── Air Quality Typologies & Citizen Field Protocols ───────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Air Quality Focus Typologies & Particulate Regimes"
          typologySubtitle="Filter telemetry stations by air quality severity, brick kiln emission corridors, highway dust, or pristine alpine baselines."
          typologyIcon={Wind}
          typologies={[
            { id: 'all', label: 'All Monitoring Stations', count: liveData.length, icon: Wind, color: 'emerald' },
            { id: 'unhealthy', label: 'Moderate & Unhealthy AQI', count: liveData.filter(d => d.aqi >= 80).length, icon: AlertTriangle, color: 'rose' },
            { id: 'kiln', label: 'Brick Kiln Corridors (Budgam/Pulwama)', count: liveData.filter(d => ['Budgam', 'Pulwama'].includes(d.district)).length, icon: Cloud, color: 'amber' },
            { id: 'highway', label: 'NH-44 & Transit Belts', count: liveData.filter(d => ['Ramban', 'Anantnag', 'Baramulla'].includes(d.district)).length, icon: TrendingUp, color: 'violet' },
            { id: 'alpine', label: 'High-Altitude Baselines', count: liveData.filter(d => ['Ganderbal', 'Kupwara'].includes(d.district) || d.aqi < 50).length, icon: Shield, color: 'sky' },
            { id: 'satisfactory', label: 'Good & Satisfactory AQI', count: liveData.filter(d => d.aqi < 80).length, icon: Zap, color: 'teal' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={liveData.length}
          entityLabel="active telemetry stations"
          spotlightTitle="Himalayan Atmospheric Dynamics & Particulate Inversion"
          spotlightSubtitle="Continuous multi-pollutant monitoring analyzing PM2.5, PM10, thermal air stagnation, and winter biomass smoke."
          tabs={[
            {
              id: 'winter-smog',
              label: 'Winter Chillai Kalan Valley Stagnation',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <span className="text-xs font-bold text-violet-400 block mb-1">Atmospheric Inversion</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Thermal Trapping Mechanics</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Cold mountain breezes cascade down surrounding Pir Panjal and Zabarwan ridges into the flat valley basin, creating an impenetrable warm inversion lid at 200–400m altitude.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Ventilation Coefficient: &lt; 2,000 m²/s during Dec-Jan</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Biomass Heating Footprint</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Kangri Charcoal &amp; Bukharis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Residential heating relies heavily on traditional charcoal Kangris and wood-fired bukharis. Emits fine black carbon and volatile organic compounds (VOCs) lingering in urban air.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">PM2.5 Peak: 160–240 µg/m³ during calm morning hours</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Point Sources</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Brick Kiln Clusters</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Over 280 traditional Bull's Trench brick kilns across Budgam and Pulwama burn low-grade coal and agricultural stubble, creating dense particulate plumes across adjacent karewa lands.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Mitigation Policy: Transition to Zig-Zag induced draft kilns</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'standards',
              label: 'NAAQS & WHO Ambient Standards',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Central Pollution Control Board Standards</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      National Ambient Air Quality Standards (NAAQS) benchmark 24-hour PM2.5 at 60 µg/m³ and PM10 at 100 µg/m³. Exceedances trigger public health advisories for children and elderly residents.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Standard: NAAQS (Notification No. B-29016/20/90/PCI-L)</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">WHO Air Quality Guidelines (AQG 2021)</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Stringent international guideline recommending 24h PM2.5 &lt; 15 µg/m³. KEW continuous monitors compare local readings against both national and international thresholds.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">WHO Benchmark: 15 µg/m³ (24h) | 5 µg/m³ (Annual)</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="air"
          observeTitle="Citizen Air Quality Surveillance &amp; Open Burning Reporting"
          observeSubtitle="Submit handheld PM2.5 readings, photograph dense smoke plumes, or report illegal orchard biomass burning."
          observeBadge="NAAQS Air Monitoring Active"
          protocols={[
            {
              number: '1',
              title: 'Handheld Laser Sensor PM2.5 Reading',
              desc: 'Record 5-minute average PM2.5/PM10 concentrations using calibrated optical particle counters (Sensirion/Plantower).',
              benchmark: 'NAAQS 24h Benchmark: PM2.5 <= 60 ug/m3',
              icon: Wind,
              color: 'sky',
            },
            {
              number: '2',
              title: 'Visual Smoke Plume Opacity Assessment',
              desc: 'Observe industrial or brick kiln smoke stacks against a clear sky using standard Ringelmann smoke charts (target < Ringelmann 1).',
              benchmark: 'CPCB Brick Kiln Stack Emission Norms',
              icon: Cloud,
              color: 'amber',
            },
            {
              number: '3',
              title: 'Open Orchard & Stubble Burning Spotting',
              desc: 'Geo-tag active burning of pruned apple branches, rice straw, or municipal trash generating roadside smog.',
              benchmark: 'Air Act 1981 Section 19 Prohibition',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '4',
              title: 'Vehicular Smoke & Idling Corridor Survey',
              desc: 'Document black exhaust emissions from heavy commercial diesel trucks on urban choke points (Pantha Chowk, Batamaloo).',
              benchmark: 'Motor Vehicles Act BS-VI Emission Norms',
              icon: Zap,
              color: 'violet',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetDataSection, spotlightAirJSX + '\n      ' + targetDataSection);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/air-pollution/page.tsx');
  }
}

console.log('Batch 3 complete');
