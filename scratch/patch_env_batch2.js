const fs = require('fs');
const path = require('path');

// ─── 3. SOLID WASTE: src/app/environmental-monitoring/solid-waste/page.tsx ────
{
  const filePath = path.resolve('src/app/environmental-monitoring/solid-waste/page.tsx');
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
      "const [surgeFilter, setSurgeFilter] = useState('all');",
      "const [surgeFilter, setSurgeFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchCity && matchCollection && matchTreatment && matchSurge;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(d.risk_level)) ||
        (activeTypology === 'commercial' && (d.ward_category?.toLowerCase().includes('commercial') || d.ward_category?.toLowerCase().includes('market'))) ||
        (activeTypology === 'residential' && d.ward_category?.toLowerCase().includes('residential')) ||
        (activeTypology === 'tourist' && (d.ward_category?.toLowerCase().includes('tourist') || d.ward_category?.toLowerCase().includes('transit') || d.city_region?.toLowerCase().includes('gulmarg') || d.city_region?.toLowerCase().includes('pahalgam'))) ||
        (activeTypology === 'mapped' && d.collection_status === 'Mapped') ||
        (activeTypology === 'unlinked' && (!d.treatment_linkage || d.treatment_linkage.includes('None') || d.treatment_linkage.includes('Unlinked')));

      return matchSearch && matchScope && matchDistrict && matchCity && matchCollection && matchTreatment && matchSurge && matchTypology;`
    );

    content = content.replace(
      "[filter, cityFilter, collectionFilter, treatmentFilter, surgeFilter]",
      "[filter, cityFilter, collectionFilter, treatmentFilter, surgeFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}";
  const spotlightSolidWasteJSX = `
      {/* ── Solid Waste Typologies & Citizen Field Protocols ───────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Solid Waste Focus Typologies & Risk Tiers"
          typologySubtitle="Select a municipal solid waste profile, risk tier, or collection status to filter ward-level intelligence."
          typologyIcon={Trash2}
          typologies={[
            { id: 'all', label: 'All Wards & Sectors', count: solidWasteData.length, icon: Trash2, color: 'emerald' },
            { id: 'critical', label: 'Critical & High Risk', count: solidWasteData.filter(d => ['Critical', 'High'].includes(d.risk_level)).length, icon: Shield, color: 'rose' },
            { id: 'commercial', label: 'Commercial & Markets', count: solidWasteData.filter(d => d.ward_category?.toLowerCase().includes('commercial') || d.ward_category?.toLowerCase().includes('market')).length, icon: Building2, color: 'amber' },
            { id: 'residential', label: 'Residential Density', count: solidWasteData.filter(d => d.ward_category?.toLowerCase().includes('residential')).length, icon: Factory, color: 'cyan' },
            { id: 'tourist', label: 'Tourist & Pilgrim Hubs', count: solidWasteData.filter(d => d.ward_category?.toLowerCase().includes('tourist') || d.ward_category?.toLowerCase().includes('transit') || d.city_region?.toLowerCase().includes('gulmarg') || d.city_region?.toLowerCase().includes('pahalgam')).length, icon: MapPin, color: 'sky' },
            { id: 'mapped', label: 'Mapped Collection', count: solidWasteData.filter(d => d.collection_status === 'Mapped').length, icon: CheckCircle, color: 'teal' },
            { id: 'unlinked', label: 'Treatment Gaps', count: solidWasteData.filter(d => !d.treatment_linkage || d.treatment_linkage.includes('None') || d.treatment_linkage.includes('Unlinked')).length, icon: Activity, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={solidWasteData.length}
          entityLabel="monitored wards"
          spotlightTitle="Municipal Solid Waste Infrastructure & Hotspot Intelligence"
          spotlightSubtitle="Granular tracking of primary dumpsites, landfill diversion targets, and collection logistics across Kashmir's urban and rural local bodies."
          tabs={[
            {
              id: 'achan',
              label: 'Achan Saidapora Landfill Stress',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Primary Municipal Disposal</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Achan Landfill Site, Srinagar</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Receives ~550 TPD from Srinagar municipal limits. Existing engineered landfill cells face severe volumetric exhaustion, generating high biochemical oxygen demand (BOD) leachate.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Capacity Status: 92% footprint saturated</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Catchment Ingress Threat</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Anchar Lake Hydrological Link</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Subsurface unlined leachate plumes threaten neighboring Anchar Lake and tributary wetlands. Active reverse osmosis treatment units operate under strict NGT discharge supervision.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Discharge Standard: COD &lt; 250 mg/L</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Bioremediation Transition</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Legacy Waste Bio-Mining</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Trommel segregation lines and refuse-derived fuel (RDF) extraction projects aim to reclaim 12+ acres of legacy dumpsite land under Swachh Bharat Mission (Urban) 2.0.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Target Recovery: 350,000 MT legacy waste</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'lakefront',
              label: 'Dal Lakefront & Houseboat Zero-Discharge',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Waterborne Pontoon Collection Logistics</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Lakes and Waterways Development Authority (LCMA) operates motorized collection barges servicing 900+ registered houseboats and 58 interior island hamlets on Dal and Nigeen lakes.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Daily Marine Extraction: 22.4 TPD segregated waste</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Single-Use Plastic Ban &amp; Lake Barriers</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Trash booms deployed at Pokhribal, Meerak Shah canal, and Telbal nallah intercept floating polyethylene and PET containers before dispersing into open water basins.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Boom Efficiency: 89% surface macro-plastic interception</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="waste"
          observeTitle="Citizen Solid Waste Auditing &amp; Litter Surveillance Network"
          observeSubtitle="Document open illegal dumping, verify door-to-door segregation compliance, or report burning of municipal garbage."
          observeBadge="SWM Rule 2016 Compliant"
          protocols={[
            {
              number: '1',
              title: 'Open Municipal Waste Dumping Spotting',
              desc: 'Photograph and geo-tag unauthorized piles exceeding 2m³ within 100 meters of watercourses, schools, or fruit orchards.',
              benchmark: 'CPCB SWM Rules 2016 Rule 15',
              icon: Trash2,
              color: 'rose',
            },
            {
              number: '2',
              title: 'Open Burning of Garbage & Plastic Detection',
              desc: 'Report active smoldering or combustion of plastic packaging and domestic waste generating black acrid smoke.',
              benchmark: 'Air (Prevention & Control of Pollution) Act Sec 19',
              icon: AlertTriangle,
              color: 'amber',
            },
            {
              number: '3',
              title: 'Waste Segregation Compliance Check',
              desc: 'Audit whether local commercial shops or residential clusters utilize color-coded 2-bin (wet/dry) segregation systems.',
              benchmark: 'Swachh Bharat Urban Segregation Protocol',
              icon: CheckCircle,
              color: 'teal',
            },
            {
              number: '4',
              title: 'Leachate Runoff & Drainage Seepage Audit',
              desc: 'Identify dark anoxic runoff flowing out of waste transfer points or community garbage containers into public drains.',
              benchmark: 'CPCB Municipal Leachate Standards',
              icon: Droplets,
              color: 'cyan',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightSolidWasteJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/solid-waste/page.tsx');
  }
}

// ─── 4. BIO-WASTE: src/app/environmental-monitoring/bio-waste/page.tsx ──────────
{
  const filePath = path.resolve('src/app/environmental-monitoring/bio-waste/page.tsx');
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
      "const [surgeFilter, setSurgeFilter] = useState('all');",
      "const [surgeFilter, setSurgeFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchCity && matchCollection && matchTreatment && matchSurge;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(d.risk_level)) ||
        (activeTypology === 'mandi' && (d.ward_sector_name.toLowerCase().includes('mandi') || d.ward_category?.toLowerCase().includes('commercial') || d.primary_source?.toLowerCase().includes('market'))) ||
        (activeTypology === 'abattoir' && (d.primary_source?.toLowerCase().includes('abattoir') || d.primary_source?.toLowerCase().includes('meat') || d.primary_source?.toLowerCase().includes('slaughter'))) ||
        (activeTypology === 'surge' && ['High', 'Critical'].includes(d.seasonal_surge)) ||
        (activeTypology === 'mapped' && d.collection_status === 'Mapped');

      return matchSearch && matchScope && matchDistrict && matchCity && matchCollection && matchTreatment && matchSurge && matchTypology;`
    );

    content = content.replace(
      "[filter, cityFilter, collectionFilter, treatmentFilter, surgeFilter]",
      "[filter, cityFilter, collectionFilter, treatmentFilter, surgeFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}";
  const spotlightBioWasteJSX = `
      {/* ── Bio-Waste Typologies & Citizen Field Protocols ──────────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Bio-Waste Focus Typologies & Organic Streams"
          typologySubtitle="Select an organic waste stream, wholesale market node, or seasonal surge risk to explore bio-waste dynamics."
          typologyIcon={Leaf}
          typologies={[
            { id: 'all', label: 'All Organic Zones', count: bioWasteData.length, icon: Leaf, color: 'emerald' },
            { id: 'critical', label: 'Critical Risk', count: bioWasteData.filter(d => ['Critical', 'High'].includes(d.risk_level)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'mandi', label: 'Fruit & Veg Mandis', count: bioWasteData.filter(d => d.ward_sector_name.toLowerCase().includes('mandi') || d.ward_category?.toLowerCase().includes('commercial') || d.primary_source?.toLowerCase().includes('market')).length, icon: Building2, color: 'amber' },
            { id: 'abattoir', label: 'Abattoirs & Meat Markets', count: bioWasteData.filter(d => d.primary_source?.toLowerCase().includes('abattoir') || d.primary_source?.toLowerCase().includes('meat') || d.primary_source?.toLowerCase().includes('slaughter')).length, icon: Shield, color: 'violet' },
            { id: 'surge', label: 'High Seasonal Surges', count: bioWasteData.filter(d => ['High', 'Critical'].includes(d.seasonal_surge)).length, icon: Activity, color: 'sky' },
            { id: 'mapped', label: 'Mapped Processing', count: bioWasteData.filter(d => d.collection_status === 'Mapped').length, icon: CheckCircle, color: 'teal' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={bioWasteData.length}
          entityLabel="monitored zones"
          spotlightTitle="Organic Degradation & Biomethanation Intelligence"
          spotlightSubtitle="Managing high-moisture organic fractions from agricultural mandis, slaughterhouses, and seasonal apple harvesting."
          tabs={[
            {
              id: 'mandi-streams',
              label: 'Parimpora Fruit Mandi & Urban Wholesale Streams',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <span className="text-xs font-bold text-emerald-400 block mb-1">Wholesale Organic Volume</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Parimpora &amp; Sopore Mandis</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Asia's second largest fruit terminal creates seasonal peaks of over 85 TPD culled apples, pears, and stone fruits. Rapid putrefaction requires mechanized daily biomethanation feedstock loading.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Organic Moisture Content: &gt; 82%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Biogas Conversion Capacity</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Decentralized Waste-to-Energy</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      High-rate anaerobic digesters convert vegetable waste into methane for captive electricity and nutrient-rich bio-slurry fertilizer used in floriculture nurseries.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Biogas Yield: ~110 m³/ton organic feedstock</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Autumn Orchard Pruning</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Lignocellulosic Biomass Surges</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Post-harvest apple tree pruning in Baramulla, Shopian, and Pulwama yields 180,000+ tons of woody biomass. Pelletization into clean heating fuel prevents widespread open burning.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Diversion Potential: 64% clean fuel pelletization</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'biomedical',
              label: 'Biomedical & Pathogenic Segregation Integrity',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Tertiary Hospital Incinerator Corridors</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      SKIMS Soura, SMHS, and JLNM hospitals produce ~4.2 TPD yellow/red/blue bag biomedical streams. Monitored for continuous GPS barcoding, temperature double-chamber incinerator compliance (&gt;1100°C), and zero municipal landfill co-mingling.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Rule: Bio-Medical Waste Management Rules 2016</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Animal Husbandry &amp; Rendering Facilities</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Municipal rendering plants in Srinagar and Anantnag process offal and animal tissue into sterilized protein meal, safeguarding groundwater aquifers from anthropic pathogens.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Standard: FSSAI Meat &amp; Animal By-Product Hygiene Code</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="waste"
          observeTitle="Citizen Bio-Waste Surveillance &amp; Composting Health Network"
          observeSubtitle="Report foul odor outbreaks, uncollected mandi dumps, or verify community composting aerated pit operations."
          observeBadge="Biological Safeguards Active"
          protocols={[
            {
              number: '1',
              title: 'Putrefaction & Anaerobic Odor Indexing',
              desc: 'Evaluate decaying organic piles near residential or market perimeters on the standard anaerobic odor nuisance scale.',
              benchmark: 'CPCB Odor Monitoring Guideline',
              icon: Leaf,
              color: 'amber',
            },
            {
              number: '2',
              title: 'Mandi Organic Disposal Verification',
              desc: 'Verify if wholesale market produce waste is diverted directly to composting or anaerobic digestion facilities.',
              benchmark: 'SWM Rules 2016 Rule 15(v)',
              icon: Building2,
              color: 'emerald',
            },
            {
              number: '3',
              title: 'Decentralized Composting Temperature Test',
              desc: 'Check thermal rise (>55°C for 3 consecutive days) in aerated community compost bins to ensure pathogen sanitization.',
              benchmark: 'FCO Composting Quality Standard',
              icon: Activity,
              color: 'sky',
            },
            {
              number: '4',
              title: 'Abattoir Blood & Effluent Containment',
              desc: 'Inspect slaughtering points to guarantee blood and biological wastewater are not discharged into street gutters.',
              benchmark: 'Central Pollution Control Board Abattoir Norms',
              icon: AlertTriangle,
              color: 'rose',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightBioWasteJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/bio-waste/page.tsx');
  }
}

// ─── 5. SEWAGE: src/app/environmental-monitoring/sewage-wastewater/page.tsx ─────
{
  const filePath = path.resolve('src/app/environmental-monitoring/sewage-wastewater/page.tsx');
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
      "const [treatmentFilter, setTreatmentFilter] = useState('all');",
      "const [treatmentFilter, setTreatmentFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );

    // Update filteredData
    content = content.replace(
      "return matchSearch && matchScope && matchDistrict && matchCity && matchDrainage && matchTreatment && matchRisk;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(d.risk_level)) ||
        (activeTypology === 'dal' && (d.ward_sector_name.toLowerCase().includes('dal') || d.city_region?.toLowerCase().includes('dal') || d.discharge_destination?.toLowerCase().includes('dal'))) ||
        (activeTypology === 'jhelum' && (d.discharge_destination?.toLowerCase().includes('jhelum') || d.ward_sector_name.toLowerCase().includes('jhelum'))) ||
        (activeTypology === 'stp' && (d.treatment_status?.toLowerCase().includes('treated') || d.treatment_status?.toLowerCase().includes('stp'))) ||
        (activeTypology === 'raw' && (!d.treatment_status || d.treatment_status.toLowerCase().includes('untreated') || d.treatment_status.toLowerCase().includes('raw')));

      return matchSearch && matchScope && matchDistrict && matchCity && matchDrainage && matchTreatment && matchRisk && matchTypology;`
    );

    content = content.replace(
      "[filter, cityFilter, drainageFilter, treatmentFilter, riskFilter]",
      "[filter, cityFilter, drainageFilter, treatmentFilter, riskFilter, activeTypology]"
    );
  }

  // Insert Spotlight component right above ModuleScopeRow
  const targetScopeRow = "{/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}";
  const spotlightSewageJSX = `
      {/* ── Sewage & Wastewater Typologies & Citizen Field Protocols ───────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Sewage & Wastewater Typologies & Discharge Regimes"
          typologySubtitle="Filter by sewage outfall severity, receiving waterbody, treatment linkage, or unsewered vulnerability."
          typologyIcon={Waves}
          typologies={[
            { id: 'all', label: 'All Wards & Outfalls', count: sewageData.length, icon: Waves, color: 'emerald' },
            { id: 'critical', label: 'Critical Outfalls', count: sewageData.filter(d => ['Critical', 'High'].includes(d.risk_level)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'dal', label: 'Dal Lake Basin Catchment', count: sewageData.filter(d => d.ward_sector_name.toLowerCase().includes('dal') || d.city_region?.toLowerCase().includes('dal') || d.discharge_destination?.toLowerCase().includes('dal')).length, icon: Droplets, color: 'cyan' },
            { id: 'jhelum', label: 'River Jhelum Direct Ingress', count: sewageData.filter(d => d.discharge_destination?.toLowerCase().includes('jhelum') || d.ward_sector_name.toLowerCase().includes('jhelum')).length, icon: Factory, color: 'sky' },
            { id: 'stp', label: 'Connected to STP', count: sewageData.filter(d => d.treatment_status?.toLowerCase().includes('treated') || d.treatment_status?.toLowerCase().includes('stp')).length, icon: CheckCircle, color: 'teal' },
            { id: 'raw', label: 'Untreated Raw Discharge', count: sewageData.filter(d => !d.treatment_status || d.treatment_status.toLowerCase().includes('untreated') || d.treatment_status.toLowerCase().includes('raw')).length, icon: Activity, color: 'amber' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={sewageData.length}
          entityLabel="monitored wards"
          spotlightTitle="Urban Wastewater Infrastructure & Receiving Basin Limnology"
          spotlightSubtitle="Monitoring sewage treatment plants (STPs), pumping substations, fecal coliform counts, and point-source effluent discharge."
          tabs={[
            {
              id: 'stp-network',
              label: 'Dal & Anchar STP Ring Infrastructure',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Major Peripheral Treatment</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Hazratbal &amp; Habak STPs</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Combined treatment capacity of 16.7 MLD utilizing Sequential Batch Reactor (SBR) and Fluidized Aerobic Bed (FAB) technology to intercept municipal runoff from the northern university and residential belts.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">BOD Inflow: ~220 mg/L -> Effluent: &lt; 10 mg/L</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Eastern Shore Interception</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Laam &amp; Nishat Treatment Cells</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Servicing hotel chains and residential clusters along Boulevard and Foreshore Road. Designed with tertiary chlorination to neutralize fecal coliforms before lake effluent discharge.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Fecal Coliform: &lt; 100 MPN/100 mL target</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Historical Lagoon Rehabilitation</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Brari Numbal Lagoon System</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      A pivotal hydrological conduit between Dal Lake and River Jhelum. Remediated with aerators and specialized macrophyte wetlands to counteract severe past anoxic blackwater stagnation.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Restoration Index: Dissolved Oxygen restored to 4.8 mg/L</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'jhelum-outfalls',
              label: 'Jhelum River Trunk Outfalls & Doodh Ganga Basin',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Doodh Ganga Fluvial Contamination</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Municipal sewer overflows in Chanapora, Natipora, and Bagh-e-Mehtab empty untreated wastewater into Doodh Ganga, a primary potable water source downstream. Heavily scrutinized under National Green Tribunal (NGT) directives.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">NGT Compliance Mandate: 100% interceptor sewer commissioning</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Old City (Shah-e-Khas) Heritage Drainage</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dense medieval urban fabric relies on legacy masonry combined sewers discharging directly into River Jhelum through historical ghat outfalls. Phased diversion to centralized trunk sewers is underway.
                    </p>
                    <div className="text-[11px] text-indigo-300 font-mono">Active Outfall Count: 38 legacy gravity pipes</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="water"
          observeTitle="Citizen Sewage Surveillance &amp; Waterbody Ingress Reporting"
          observeSubtitle="Report untreated blackwater outfalls, photograph bursting manholes, or document septic sucker truck illegal dumping."
          observeBadge="Water Act Sec 24 Enforcement"
          protocols={[
            {
              number: '1',
              title: 'Untreated Sewage Outfall Geotagging',
              desc: 'Photograph raw sewage gushing from pipes into public watercourses; note water color, turbidity, and foaming.',
              benchmark: 'Water (Prevention and Control of Pollution) Act 1974',
              icon: Waves,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'Dissolved Oxygen & Blackwater Testing',
              desc: 'Test DO levels downstream of municipal outfalls using optical DO probes or chemical titration kits (target > 5.0 mg/L).',
              benchmark: 'CPCB Inland Surface Water Standard Class C',
              icon: Droplets,
              color: 'emerald',
            },
            {
              number: '3',
              title: 'Illegal Fecal Sludge Dumping Alert',
              desc: 'Report commercial cesspool tankers emptying un-manifested septic waste into rivers, canals, or roadside ditches.',
              benchmark: 'NGT National Policy on Fecal Sludge Management',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '4',
              title: 'Sewer Overflow & Urban Waterlogging',
              desc: 'Submit alerts for backflowing sewer manholes during rainfall inundating streets with contaminated blackwater.',
              benchmark: 'Urban Drainage Service Benchmark (MoHUA)',
              icon: Shield,
              color: 'violet',
            },
          ]}
        />
      </div>

`;

  if (!content.includes('EnvironmentalObserveSpotlight typologyTitle')) {
    content = content.replace(targetScopeRow, spotlightSewageJSX + '\n      ' + targetScopeRow);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched: src/app/environmental-monitoring/sewage-wastewater/page.tsx');
  }
}

console.log('Batch 2 complete');
