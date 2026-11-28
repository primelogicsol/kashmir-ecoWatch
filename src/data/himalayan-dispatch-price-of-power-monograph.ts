// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 12 & FLAGSHIP HYDROPOWER INVESTIGATION
// "THE PRICE OF POWER"
// Subtitle: "When Mountains Generate Electricity but Their People Remain in Darkness:
//            Hydropower, Environmental Sacrifice and Energy Justice in the Western Himalayas"
//
// Placement: Immediately after "Who Gave Development the Right to Exceed the Mountain?"
//            and immediately before "Nature Is Not a Contractor"
//            (Dispatch 21 of 31 in complete Vol. 01 / No. 01 sequence).
//
// Scope: Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan ·
//        Upper Indus Basin · Western Himalayas
// Architecture: 20 Thematic Volumes · 120 Proposed Chapters (6 per Volume) ·
//               15-Condition Western Himalayan Hydropower Integrity Protocol (WH-HIP) ·
//               16-Registry KEW Hydropower, Environmental Impact & Energy Justice Observatory
//
// Strict Scientific & Evidentiary Safeguards:
// 1. Installed or planned MW capacity is strictly distinguished from delivered generation.
// 2. Feeder-specific curtailment schedules and arithmetic capacity-vs-demand gaps are
//    never misrepresented as uniform region-wide outage measurements.
// 3. Reservoir-Triggered Seismicity (RTS) physics (effective stress σ'_n = σ_n - p and
//    hydrostatic mass/pressure) is presented as physical plausibility—never as an
//    earthquake prediction model or unverified attribution of specific earthquakes.
// 4. Forest diversion and reservoir submergence are never summed without overlap checks.
// 5. All 8 unestablished regional totals (Section XXX) remain explicitly unaggregated
//    until complete project-by-project primary records are authenticated.
// ─────────────────────────────────────────────────────────────────────────────

export interface RegionalHydropowerSummary {
  region: string;
  majorHydropowerResources: string;
  electricitySupplyChallenges: string;
  documented2026Snapshot: string;
}

export interface SelectedHydropowerProject {
  project: string;
  region: string;
  riverBasin: string;
  status: 'OPERATIONAL_SELECTED' | 'DEVELOPMENT_SELECTED';
  capacityLabel: string;
  capacityMwNumeric: number;
  forestDiversionNote?: string;
  submergenceNote?: string;
  engineeringAndGovernanceNote: string;
}

export interface HydropowerMonographVolumeSpec {
  volumeRoman: string;
  volumeNumber: number;
  investigationTitle: string;
  chapterRange: string;
  analyticalScope: string;
}

export interface HydropowerMonographChapter {
  number: string; // '001' / '01' .. '120'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  scientificAndPolicyFocus: string;
  primaryEvidenceAndMethods: string;
  researchStatus: string;
}

export interface HydropowerObservatoryRegistrySpec {
  code: string;
  name: string;
  permanentFunction: string;
  evidentiaryStandard: string;
  connectedKewHref: string;
  connectedKewLabel: string;
}

export const PRICE_OF_POWER_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 12 · HYDROPOWER, TECTONIC HAZARDS & ENERGY JUSTICE',
  monographSlug: 'monograph-12-the-price-of-power',
  dispatchSlug: 'the-price-of-power',
  targetDispatchNumberIn31: '21',
  kicker:
    'SPECIAL SCIENTIFIC & GEOPOLITICAL INVESTIGATION · HYDROPOWER ENGINEERING · TECTONIC HAZARDS · FOREST SUBMERGENCE · ENERGY JUSTICE',
  editionRubric:
    'SPECIAL SCIENTIFIC INVESTIGATION · HYDROPOWER · FOREST SUBMERGENCE · WILDLIFE DISPLACEMENT · TECTONIC HAZARDS · ENERGY JUSTICE',
  title: 'The Price of Power',
  subtitle:
    'When Mountains Generate Electricity but Their People Remain in Darkness',
  extendedSubtitle:
    'Hydropower, Environmental Sacrifice and Energy Justice in the Western Himalayas: An Investigation into Electricity Generation, Forest Submergence, Wildlife Disturbance, River Transformation, Geological Vulnerability and Unequal Benefit Distribution',
  italicDeck:
    'Who receives the electricity, who receives the revenue, and who inherits the environmental destruction and geological risks?',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Hydropower Engineering, Environmental Geology, Geospatial Intelligence and Energy Justice Desk',
  geographicScope:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Upper Indus Basin · Western Himalayas',
  heroStats: [
    { value: '1,300 MW', label: 'Reported J&K winter gap (Nov 2026)' },
    { value: '10,190 MW', label: '7 selected planned mega-projects' },
    { value: '20 / 120', label: 'Volumes / Proposed chapters' },
  ],
  observatoryHeroStats: [
    { value: '5 Regions', label: 'Indus · Jhelum · Chenab · Shyok · Neelum' },
    { value: '16', label: 'Permanent observatory registries' },
    { value: '15', label: 'Hydropower Integrity Protocol gates' },
  ],
  centralMandate:
    'Hydropower is a renewable low-carbon energy source, but renewable does not automatically mean environmentally harmless, geologically risk-free, or socially equitable. The central investigation establishes the geographical distribution of hydropower benefits against the geographical distribution of its environmental and geological costs.',
  closingQuestion:
    'Before celebrating how many megawatts our mountains can generate, should we not first establish how much of our mountains we are prepared to sacrifice, and for whose benefit?',
  unestablishedRegionalTotals8: [
    'Total historical forest submergence across all five Western Himalayan regions',
    'Total terrestrial and aquatic wildlife habitat lost to hydropower development',
    'Complete project-wise external vs. host-region electricity allocation ledger',
    'District-wise annual household and hospital outage duration (SAIDI / SAIFI)',
    'Total water-usage charges, royalties, and local development funds actually retained by host communities',
    'Total cumulative multi-decade population displacement and post-resettlement livelihood outcomes',
    'Project-specific causal attribution of any Western Himalayan earthquake to reservoir loading',
    'Complete hourly contemporary environmental-flow and hydropeaking compliance across all operational dams',
  ],
  researchLimitationsNote:
    'Research Limitations & Provenance Disclosure: Documented electricity gaps (Nov 27, 2026 J&K ~1,300 MW potential winter deficit against 3,362 MW prior winter peak; Nov 2026 Gilgit-Baltistan post-flood 157 MW capacity vs. 285 MW summer demand; AJ&K 350–600 MW seasonal demand; Nov 4, 2026 Ladakh isolated-mode grid operation), selected forest/submergence clearances (Sawalkote 847.17 ha forest diversion & 1,159.73 ha submergence with 88.94% in Ramban; Pakal Dul 195.96 ha; Kirthai-II 197 ha; Diamer-Basha 11,500 ha reservoir; Mangla historical ~251 km² / >110,000 displaced), and engineering proceedings (Neelum–Jhelum 2022/subsequent tunnel shutdowns in Pakistan National Assembly records; Ratle Feb 2026 NGT muck-disposal correspondence; Kishanganga 2013 PCA 9 m³/s minimum-release award) cite official and published records, though several indexed government PDFs require visual gazette/file authentication. Eight aggregate regional totals remain explicitly unestablished pending project-by-project primary document retrieval, and all 120 monograph chapters represent a proposed research architecture.',
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (After "Exceed the Mountain")',
      title: 'The Price of Power — Five-Region Hydropower & Energy Justice Investigation',
      detail:
        'Completes the three-part mountain engineering progression (Geological Limits → Ecological Limits → Hydropower & Energy Justice), uniting Nov 2026 power deficits, forest submergence, RTS physics, and tunnel/muck failures.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-price-of-power',
      ctaLabel: 'Read Investigation',
    },
    {
      level: '02 · Complete 20-Volume, 120-Chapter Monograph',
      title: 'Monograph 12 — 20 Thematic Volumes & 120 Research Chapters',
      detail:
        'Full investigative research architecture spanning historical dams, power-purchase allocations, SAIDI/SAIFI outage atlases, forest submergence, RTS & InSAR slope mechanics, GLOF cascades, and alternatives.',
      href: '/himalayan-dispatch/issues/monograph-12-the-price-of-power',
      ctaLabel: 'Open Monograph 12',
    },
    {
      level: '03 · Permanent KEW Intelligence Infrastructure',
      title: 'Hydropower, Environmental Impact & Energy Justice Observatory',
      detail:
        '16 permanent KEW registries paired with 16 power-grid, clearance, seismic, and satellite data sources and the 15-condition Hydropower Integrity Protocol.',
      href: '/earth-human-impact/hydropower-energy-justice-observatory',
      ctaLabel: 'Open KEW Observatory',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART II & III — NOVEMBER 2026 PARADOX & FIVE-REGION ENERGY CONTRADICTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const NOVEMBER_2026_ELECTRICITY_PARADOX = {
  jkWinterMetrics: [
    { figure: '1,456 MW', label: 'Jammu reported prior winter peak demand' },
    { figure: '1,906 MW', label: 'Kashmir reported prior winter peak demand' },
    { figure: '3,362 MW', label: 'Combined prior winter peak demand' },
    { figure: '1,300 MW', label: 'Potential winter supply gap raised Nov 27, 2026' },
    { figure: '329 MW', label: 'Additional central allocation (Dec 2026–Feb 2027)' },
    { figure: '6–8 hrs/day', label: 'Scheduled curtailment on specified high-loss Kashmir feeders (Nov 2026)' },
  ],
  gb2026FloodPowerMetrics: [
    { figure: '285 MW', label: 'Reported summer electricity demand' },
    { figure: '211.6 MW', label: 'Available hydro capacity prior to June 2026 flood damage' },
    { figure: '157 MW', label: 'Available hydro capacity after reported flood damage' },
    { figure: '128 MW', label: 'Arithmetic post-flood capacity-vs-demand gap' },
  ],
  caveat:
    'Kashmir 6–8 hour schedules apply to specified distribution-feeder loss categories (not uniform outages across every household); Gilgit-Baltistan’s 128 MW figure is the arithmetic difference between reported post-flood capacity (157 MW) and summer demand (285 MW).',
} as const;

export const FIVE_REGION_HYDROPOWER_MATRIX: RegionalHydropowerSummary[] = [
  {
    region: 'Kashmir Valley',
    majorHydropowerResources: 'Uri-I (480 MW), Uri-II (240 MW), Kishanganga (330 MW), Lower Jhelum, Upper Sindh',
    electricitySupplyChallenges: 'Steep winter heating demand coinciding with ~70–80% winter river-flow drop, scheduled/unscheduled feeder curtailment',
    documented2026Snapshot: '1,906 MW prior winter peak; 6–8 hr scheduled curtailment reported on specific feeder categories in Nov 2026.',
  },
  {
    region: 'Jammu Division',
    majorHydropowerResources: 'Salal (690 MW), Baglihar I & II (900 MW), Dulhasti (390 MW), Sewa-II (120 MW) & 5,690 MW Chenab cascade pipeline',
    electricitySupplyChallenges: 'Summer peak demand, distribution losses, and acute host-district submergence/slope burdens in Kishtwar, Ramban & Reasi',
    documented2026Snapshot: '1,456 MW prior winter peak; hosts Sawalkote (88.94% submergence in Ramban) & Ratle (Feb 2026 NGT muck proceedings).',
  },
  {
    region: 'Ladakh',
    majorHydropowerResources: 'Nimoo Bazgo (45 MW), Chutak (44 MW) and micro/small installations',
    electricitySupplyChallenges: 'Extreme winter freeze reductions, isolated valleys, and single-corridor transmission vulnerability',
    documented2026Snapshot: 'Oct 2026 seasonal availability review; Nov 4, 2026 emergency transmission shutdown required operating Nimoo Bazgo & Chutak in isolated island mode.',
  },
  {
    region: 'Azad Jammu & Kashmir',
    majorHydropowerResources: 'Mangla (1,310 MW refurbishment target), Neelum–Jhelum (969 MW), Patrind, Gulpur & Karot-associated infrastructure',
    electricitySupplyChallenges: 'Continuing load shedding, winter demand spikes, tariff/royalty grievances, and Neelum–Jhelum tunnel outages',
    documented2026Snapshot: '2026 reported demand of ~350 MW (summer) to ~600 MW (winter) alongside recurring outage grievances despite hosting major dams.',
  },
  {
    region: 'Gilgit-Baltistan',
    majorHydropowerResources: 'Numerous distributed valley hydro stations and developing Diamer-Basha (4,500 MW on GB–KP boundary)',
    electricitySupplyChallenges: 'Severe winter generation collapse, lack of national-grid integration, and glacial/monsoon flood damage to channels and powerhouses',
    documented2026Snapshot: 'Nov 2026 Water & Power Dept. report: flood damage since June cut capacity from 211.6 MW to 157 MW against 285 MW summer demand (128 MW arithmetic gap).',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART IV & VII — SELECTED OPERATIONAL (11) & DEVELOPMENT (7 = 10,190 MW) PROJECTS
// ─────────────────────────────────────────────────────────────────────────────

export const SELECTED_HYDROPOWER_PROJECTS_18: SelectedHydropowerProject[] = [
  // Operational Selected (11)
  { project: 'Uri-I', region: 'Kashmir', riverBasin: 'Jhelum', status: 'OPERATIONAL_SELECTED', capacityLabel: '480 MW', capacityMwNumeric: 480, engineeringAndGovernanceNote: 'Run-of-river barrage/tunnel below Baramulla; NHPC operated; winter generation drops sharply with low Jhelum baseflow.' },
  { project: 'Uri-II', region: 'Kashmir', riverBasin: 'Jhelum', status: 'OPERATIONAL_SELECTED', capacityLabel: '240 MW', capacityMwNumeric: 240, engineeringAndGovernanceNote: 'Downstream cascade below Uri-I near Salamabad; illustrates cumulative Jhelum reach modification.' },
  { project: 'Kishanganga', region: 'Kashmir', riverBasin: 'Kishanganga / Jhelum', status: 'OPERATIONAL_SELECTED', capacityLabel: '330 MW', capacityMwNumeric: 330, engineeringAndGovernanceNote: 'Inter-tributary tunnel diversion from Gurez to Bandipora/Wular; governed by 2013 PCA 9 m³/s minimum downstream flow award.' },
  { project: 'Salal', region: 'Jammu', riverBasin: 'Chenab', status: 'OPERATIONAL_SELECTED', capacityLabel: '690 MW', capacityMwNumeric: 690, engineeringAndGovernanceNote: 'Reasi district; severe reservoir siltation illustrates Himalayan sediment-trapping and turbine-abrasion physics.' },
  { project: 'Baglihar I & II', region: 'Jammu', riverBasin: 'Chenab', status: 'OPERATIONAL_SELECTED', capacityLabel: '900 MW', capacityMwNumeric: 900, engineeringAndGovernanceNote: 'Ramban district JKSPDC asset; surrounded by active Nashri–Ramban slope-instability terrain.' },
  { project: 'Dulhasti', region: 'Jammu', riverBasin: 'Chenab', status: 'OPERATIONAL_SELECTED', capacityLabel: '390 MW', capacityMwNumeric: 390, engineeringAndGovernanceNote: 'Kishtwar district; excavated through complex Higher Himalayan metamorphic geology.' },
  { project: 'Sewa-II', region: 'Jammu', riverBasin: 'Ravi / Sewa', status: 'OPERATIONAL_SELECTED', capacityLabel: '120 MW', capacityMwNumeric: 120, engineeringAndGovernanceNote: 'Kathua district high-head project.' },
  { project: 'Nimoo Bazgo', region: 'Ladakh', riverBasin: 'Indus', status: 'OPERATIONAL_SELECTED', capacityLabel: '45 MW', capacityMwNumeric: 45, engineeringAndGovernanceNote: 'Alchi / Leh; operated in isolated mode during Nov 4, 2026 emergency transmission shutdown.' },
  { project: 'Chutak', region: 'Ladakh', riverBasin: 'Suru / Indus', status: 'OPERATIONAL_SELECTED', capacityLabel: '44 MW', capacityMwNumeric: 44, engineeringAndGovernanceNote: 'Kargil district cold-desert run-of-river installation; operated in isolated mode Nov 4, 2026.' },
  { project: 'Mangla', region: 'Azad Jammu & Kashmir', riverBasin: 'Jhelum', status: 'OPERATIONAL_SELECTED', capacityLabel: 'Refurbishment target: 1,310 MW', capacityMwNumeric: 1310, submergenceNote: '~251 km² original 1960s reservoir (>110,000 displaced; later dam raising separate)', engineeringAndGovernanceNote: 'Mirpur district; historic archetype of massive local land/community displacement powering external grids.' },
  { project: 'Neelum–Jhelum', region: 'Azad Jammu & Kashmir', riverBasin: 'Neelum / Jhelum', status: 'OPERATIONAL_SELECTED', capacityLabel: '969 MW (availability requires verification)', capacityMwNumeric: 969, engineeringAndGovernanceNote: 'Muzaffarabad deep-tunnel diversion; commissioned 2018, hit by 2022 tailrace blockage and subsequent headrace tunnel shutdown (NA records) plus downstream Muzaffarabad flow reduction.' },

  // Major Development Selected (7 -> 10,190 MW combined planned capacity)
  { project: 'Pakal Dul', region: 'Jammu', riverBasin: 'Marusudar / Chenab', status: 'DEVELOPMENT_SELECTED', capacityLabel: '1,000 MW', capacityMwNumeric: 1000, forestDiversionNote: '195.96 ha reported forest/wildlife diversion under specified clearance', submergenceNote: 'Requires complete project records', engineeringAndGovernanceNote: 'Kishtwar storage/cascade project intersecting Dachhan/Kishtwar High Altitude wildlife landscape.' },
  { project: 'Ratle', region: 'Jammu', riverBasin: 'Chenab', status: 'DEVELOPMENT_SELECTED', capacityLabel: '850 MW', capacityMwNumeric: 850, engineeringAndGovernanceNote: 'Kishtwar; subject of Feb 2026 NGT proceedings reproducing proponent correspondence over improper muck/debris disposal into river.' },
  { project: 'Kiru', region: 'Jammu', riverBasin: 'Chenab', status: 'DEVELOPMENT_SELECTED', capacityLabel: '624 MW', capacityMwNumeric: 624, engineeringAndGovernanceNote: 'Kishtwar cascade segment between Kirthai/Kwar and Kholi/Dulhasti.' },
  { project: 'Kwar', region: 'Jammu', riverBasin: 'Chenab', status: 'DEVELOPMENT_SELECTED', capacityLabel: '540 MW', capacityMwNumeric: 540, engineeringAndGovernanceNote: 'Kishtwar cascade segment; cumulative tunnel, road, and muck concentration.' },
  { project: 'Sawalkote', region: 'Jammu', riverBasin: 'Chenab', status: 'DEVELOPMENT_SELECTED', capacityLabel: '1,856 MW', capacityMwNumeric: 1856, forestDiversionNote: '847.17 ha proposed forest diversion (~16,750 kanals)', submergenceNote: '1,159.73 ha (~11.6 km²; 88.94% in Ramban per 2026 govt statement)', engineeringAndGovernanceNote: 'Largest planned Chenab project; prime test case for Ramban district benefit-vs-burden accounting.' },
  { project: 'Kirthai-II', region: 'Jammu', riverBasin: 'Chenab', status: 'DEVELOPMENT_SELECTED', capacityLabel: '820 MW', capacityMwNumeric: 820, forestDiversionNote: '197 ha proposed forest diversion', submergenceNote: 'Requires complete project records', engineeringAndGovernanceNote: 'Upper Chenab / Paddar valley cascade component.' },
  { project: 'Diamer-Basha', region: 'GB–KP boundary region', riverBasin: 'Indus', status: 'DEVELOPMENT_SELECTED', capacityLabel: '4,500 MW', capacityMwNumeric: 4500, forestDiversionNote: 'Forest component requires verification', submergenceNote: '11,500 ha (115 km²) planned reservoir area', engineeringAndGovernanceNote: 'Massive roller-compacted concrete dam upstream of active tectonic structures; major resettlement, petroglyph heritage, and host-power questions.' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART V, VI, VIII, XXII, XXIII, XXIV, XXV & XXVI — ANALYTICAL MATRICES
// ─────────────────────────────────────────────────────────────────────────────

export const ELECTRICITY_ACCOUNTING_13: Array<[string, string]> = [
  ['01. Gross generation', 'Actual metered monthly electricity generated (MWh / GWh)'],
  ['02. Auxiliary consumption', 'Electricity consumed internally by powerhouse, gates & camp systems'],
  ['03. Net generation', 'Deliverable electricity injected at busbar'],
  ['04. Host-region entitlement', 'Contractually allocated free royalty power or right-of-first-refusal quota'],
  ['05. External allocation', 'Share contracted via PPAs to utilities outside the generating region'],
  ['06. Power Purchase Agreements (PPAs)', 'Tariff formulas, capacity charges, duration & beneficiary states/DISCOMs'],
  ['07. Royalties & water-usage charges', 'Statutory water cess/royalty payable and actually transferred to host treasury'],
  ['08. Local Area Development Funds', 'Funds disbursed and audited in project-affected panchayats/tehsils'],
  ['09. Transmission losses', 'High-voltage evacuation corridor losses prior to local substations'],
  ['10. Distribution (AT&C) losses', 'Technical transformer/line losses vs. commercial metering/billing gaps'],
  ['11. Winter/seasonal power imports', 'Costly short-term exchange purchases during low-flow winter months'],
  ['12. Unserved demand / curtailment', 'MWh of scheduled and unscheduled load shedding borne by host residents'],
  ['13. End-consumer tariffs', 'Effective INR/PKR per kWh paid by mountain households, hospitals & enterprises'],
];

export const OUTAGE_ATLAS_INDICATORS_12: Array<[string, string]> = [
  ['Scheduled curtailment', 'Published daily rostered cut hours per consumer feeder'],
  ['Unscheduled outages', 'Fault/overload trip frequency and duration'],
  ['Seasonal reliability gap', 'Winter heating peak vs. summer monsoon performance'],
  ['SAIDI', 'System Average Interruption Duration Index (hours/consumer/year)'],
  ['SAIFI', 'System Average Interruption Frequency Index (interruptions/consumer/year)'],
  ['Energy Not Supplied (ENS)', 'Metered or estimated MWh of unmet regional demand'],
  ['Voltage quality', 'Brownouts and voltage sags damaging household/medical equipment'],
  ['Hospital & oxygen-plant outages', 'Grid interruption hours forcing diesel generator reliance in healthcare'],
  ['Artisanal, orchard & cold-storage losses', 'Production and CA-storage hours lost to power cuts'],
  ['Remote hamlet & border access', 'Winter microgrid/grid uptime in snowbound settlements'],
  ['Winter energy poverty', 'Share of household income spent on electricity/heating fuels'],
  ['Dam-adjacent village reliability', 'Supply hours inside 10–25 km of operational powerhouses vs. distant cities'],
];

export const MATURE_FOREST_VS_PLANTATION_8: Array<[string, string]> = [
  ['Mature wildlife habitat (tragopan, musk deer, bear dens)', 'No — saplings lack canopy stratification, snags and microclimate'],
  ['Established forest soil & mycorrhizal networks', 'No — centuries-old organic horizons are irreversibly drowned or stripped'],
  ['Historical above- and below-ground carbon stocks', 'No — immediate carbon debt persists for decades'],
  ['Natural multi-species ecological succession', 'No — monoculture or degraded-slope plantations rarely replicate climax structure'],
  ['Complex pollinator, avian & fungal interactions', 'No — coevolved food webs are severed upon submergence'],
  ['Hillslope hydrological & spring recharge regulation', 'Only partially, and only after multi-decade root/litter recovery'],
  ['Long-established valley-bottom wildlife corridors', 'Only if replacement land physically reconnects severed elevation bands'],
  ['Traditional fodder, medicinal & minor-forest livelihoods', 'Depends on village proximity, legal access and native species mix'],
];

export const CANDIDATE_SACRIFICE_ZONE_DISTRICTS_10: Array<[string, string]> = [
  ['Kishtwar (Jammu)', 'Dulhasti + Pakal Dul, Ratle, Kiru, Kwar, Kirthai-II cascade tunnels, forest cuts & muck banks'],
  ['Ramban (Jammu)', 'Baglihar reservoir + 88.94% of proposed Sawalkote submergence + acute NH-44/Nashri slope instability'],
  ['Reasi (Jammu)', 'Salal siltation legacy, railway/road cuts & proposed downstream Chenab infrastructure'],
  ['Bandipora (Kashmir)', 'Kishanganga inter-basin tunnel outfall, Gurez river diversion & Wular inflow modification'],
  ['Baramulla (Kashmir)', 'Lower Jhelum, Uri-I & Uri-II barrages/tunnels alongside winter feeder curtailment'],
  ['Muzaffarabad (AJ&K)', 'Neelum–Jhelum diversion reducing urban river flows, drinking-water stress & tunnel failures'],
  ['Mirpur (AJ&K)', '1960s Mangla submergence (>110,000 displaced) and subsequent dam-raising land acquisition'],
  ['Diamer (Gilgit-Baltistan)', '4,500 MW Diamer-Basha 115 km² reservoir acquisition, petroglyphs & resettlement'],
  ['Gilgit & Skardu (GB)', 'Severe seasonal hydro dependency, flood-damaged channels (157 MW vs. 285 MW summer demand) & winter darkness'],
  ['Leh & Kargil (Ladakh)', 'Cold-desert flow collapse, fragile Indus/Suru ecology & single-line transmission isolation'],
];

export const ALTERNATIVES_TO_MEGA_DAMS_12: Array<[string, string]> = [
  ['01. Modernization & uprating of existing powerhouses', 'Gain generation and sediment resilience without submerging a single additional hectare'],
  ['02. High-efficiency & abrasion-resistant turbine retrofits', 'Recover output lost to Himalayan quartz silt wear'],
  ['03. Distributed rooftop & canal/wasteland solar PV', 'Daytime generation across Jammu, Ladakh, Gilgit, Mirpur & Kashmir institutional roofs'],
  ['04. Grid-scale & feeder-level battery storage (BESS)', 'Eliminate 2–4 hour evening peak curtailment and smooth hydropeaking'],
  ['05. Thermal building insulation (passive solar & envelope)', 'Slash Kashmir, Ladakh, AJ&K & GB winter electric-heating peaks at the root'],
  ['06. Cold-climate high-COP heat pumps', 'Deliver 2.5–3.5× the winter heat per kWh compared with crude nichrome heaters'],
  ['07. Distribution transformer & AT&C loss modernization', 'Deliver already-generated megawatts currently lost in overloaded wires'],
  ['08. Resilient multi-path regional grid interconnections', 'Prevent single-tower avalanche/landslide blackouts (as in Ladakh Nov 2026)'],
  ['09. Ecologically screened community micro-hydropower', 'Serve off-grid hamlets where cumulative tributary fragmentation is avoided'],
  ['10. Time-of-use & industrial demand-side management', 'Shift non-essential loads away from 6–10 p.m. winter heating peaks'],
  ['11. Closed-loop / off-river pumped hydro storage', 'Store solar/surplus energy without damming free-flowing mainstem rivers (site-screened)'],
  ['12. Solar–wind–hydro seasonal hybrid portfolios', 'Offset winter snowbound hydro lows with high-insolation cold-desert solar'],
];

export const HYDROPOWER_INTEGRITY_PROTOCOL_15: Array<[string, string]> = [
  ['01. Regional electricity demand audit', 'Prove genuine local/regional energy need after efficiency and loss reduction'],
  ['02. Least-impact alternatives analysis', 'Test insulation, solar+BESS, grid upgrades & existing-dam retrofits first'],
  ['03. Mandatory cumulative river-basin assessment', 'Evaluate combined cascades—never overriding geology/ecology on administrative exemptions'],
  ['04. Mature-forest ecological valuation', 'Measure canopy complexity, soil carbon & endemism rather than sapling counts'],
  ['05. Terrestrial & aquatic corridor protection', 'Safeguard ungulate/carnivore paths and rheophilic fish migration'],
  ['06. Dynamic seasonal environmental-flow & anti-hydropeaking rule', 'Enforce hourly telemetered hydrographs rather than flat minimum releases'],
  ['07. Pre-impoundment seismic & active-fault dossier', 'Operate multiyear microseismic & pore-pressure networks before filling'],
  ['08. Reservoir rim & rapid-drawdown slope modelling', 'Combine InSAR, piezometers & geotechnical stability factors'],
  ['09. Upstream cryosphere, GLOF & cloudburst cascade stress test', 'Design spillways and early-warning sirens for 2050–2080 compound extremes'],
  ['10. Full livelihood & social-network rehabilitation audit', 'Track post-resettlement household income, springs & commons over 10+ years'],
  ['11. Legally binding Host-Region Energy & Revenue Covenant', 'Guarantee reliable local winter power, ring-fenced royalties & public PPA disclosure'],
  ['12. Public downstream Emergency Action Plan', 'Publish inundation maps, siren drills & dam-break liability insurance'],
  ['13. Mass-balanced muck, quarry & spring-discharge ledger', 'Verify every cubic metre of tunnel spoil and monitor village springs'],
  ['14. Lifecycle carbon & financial performance accounting', 'Report gCO₂e/kWh (including methane/forest loss) and delivered cost vs. DPR'],
  ['15. Periodic FERC-style independent relicensing review', 'Re-evaluate ecological and safety conditions every 10–15 years'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XXVII — PERMANENT KEW HYDROPOWER, IMPACT & ENERGY JUSTICE OBSERVATORY (16 REGISTRIES + 16 SOURCES)
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_HYDROPOWER_OBSERVATORY_REGISTRIES_16: HydropowerObservatoryRegistrySpec[] = [
  { code: 'WHEJO-01', name: 'Hydropower Project Registry', permanentFunction: 'Geo-referenced inventory of operational, under-construction, and proposed projects across all 5 regions.', evidentiaryStandard: 'Separates rated engineering MW from verified net generation and commissioning status.', connectedKewHref: '/sectoral-eia', connectedKewLabel: 'Sectoral EIA Hub' },
  { code: 'WHEJO-02', name: 'Electricity Generation Intelligence', permanentFunction: 'Tracks monthly/seasonal generation curves showing summer snowmelt peaks vs. winter baseflow troughs.', evidentiaryStandard: 'Official CEA, NHPC, JKSPDC, WAPDA & NEPRA plant-level generation series.', connectedKewHref: '/water-systems', connectedKewLabel: 'Water Systems Hub' },
  { code: 'WHEJO-03', name: 'Regional Electricity Allocation Ledger', permanentFunction: 'Maps PPA beneficiaries, host-region free-power quotas, water royalties, and winter power-import costs.', evidentiaryStandard: 'Authenticated PPA/NRPC/CPPA-G allocation schedules—distinguishing contract rights from grid physics.', connectedKewHref: '/governance', connectedKewLabel: 'Governance Portal' },
  { code: 'WHEJO-04', name: 'Outage & Curtailment Atlas', permanentFunction: 'Monitors scheduled feeder cuts, unscheduled trips, SAIDI/SAIFI, and hospital/household winter darkness in dam-hosting districts.', evidentiaryStandard: 'Separates feeder-specific schedules from verified consumer-level outage telemetry.', connectedKewHref: '/earth-human-impact/hydropower-energy-justice-observatory#workbench', connectedKewLabel: 'Energy Justice Workbench' },
  { code: 'WHEJO-05', name: 'Forest Submergence Intelligence', permanentFunction: 'Tracks forest-diversion clearances, reservoir inundation polygons, and 10-year CAMPA survival/equivalence.', evidentiaryStandard: 'PARIVESH / forest records + Sentinel-2 polygons without double-counting diversion and submergence.', connectedKewHref: '/earth-human-impact/change-detection-observatory', connectedKewLabel: 'Change Detection Observatory' },
  { code: 'WHEJO-06', name: 'Wildlife Corridor Assessment', permanentFunction: 'Evaluates road, blasting, transmission, and submergence fragmentation across Hangul, Markhor, tragopan, and bear habitats.', evidentiaryStandard: 'Project-specific field/camera-trap verification rather than generic species lists.', connectedKewHref: '/biodiversity', connectedKewLabel: 'Biodiversity Intelligence' },
  { code: 'WHEJO-07', name: 'Reservoir Seismicity Intelligence', permanentFunction: 'Pairs pre- and post-impoundment earthquake catalogues, fault maps, water-level swings, and pore-pressure physics.', evidentiaryStandard: 'USGS/ISC catalogues + RTS physical mechanics—never claiming unverified earthquake causation.', connectedKewHref: '/risk-monitoring/natural-hazards', connectedKewLabel: 'Hazard Intelligence' },
  { code: 'WHEJO-08', name: 'Landslide & Slope Monitoring', permanentFunction: 'Tracks reservoir-rim saturation, rapid-drawdown instability, and road/portal toe cuts around major dams.', evidentiaryStandard: 'Sentinel-1 InSAR deformation time series paired with geotechnical field validation.', connectedKewHref: '/earth-human-impact', connectedKewLabel: 'Earth & Human Impact' },
  { code: 'WHEJO-09', name: 'River Environmental Flows & Hydropeaking', permanentFunction: 'Monitors downstream wetted depth, water temperature, fish passage, and hourly hydropeaking surges.', evidentiaryStandard: 'Hourly tailrace/barrage discharge logs tested against seasonal hydrograph requirements.', connectedKewHref: '/governance/legislation-enforcement-observatory', connectedKewLabel: 'Legal Observatory' },
  { code: 'WHEJO-10', name: 'Glacial Hazard & GLOF Cascade Intelligence', permanentFunction: 'Maps upstream moraine-dammed lakes, ice-avalanche paths, and compound flood waves above reservoirs.', evidentiaryStandard: 'Multi-temporal optical/SAR lake inventories and dam-spillway routing models.', connectedKewHref: '/earth-human-impact/aquatic-cryosphere', connectedKewLabel: 'Cryosphere Hub' },
  { code: 'WHEJO-11', name: 'Displacement & Rehabilitation Ledger', permanentFunction: 'Documents historical and active land acquisition (from 1960s Mangla to Sawalkote & Diamer-Basha) and long-term livelihood recovery.', evidentiaryStandard: 'Separates initial displacement cohorts from subsequent raisings and tracks non-monetary commons loss.', connectedKewHref: '/resources/environmental-pil', connectedKewLabel: 'Environmental PIL Portal' },
  { code: 'WHEJO-12', name: 'Muck Disposal & Spring Monitoring', permanentFunction: 'Audits excavated tunnel spoil volumes against approved muck banks and monitors village spring discharge/chemistry.', evidentiaryStandard: 'NGT/EC compliance records (e.g., Ratle Feb 2026) + pre/post-tunnel spring hydrogeology.', connectedKewHref: '/environmental-investigations', connectedKewLabel: 'Investigations Archive' },
  { code: 'WHEJO-13', name: 'Reservoir Carbon Accounting', permanentFunction: 'Calculates lifecycle gCO₂e/kWh across cement, steel, drowned biomass, reservoir methane, and fossil displacement.', evidentiaryStandard: 'Project-specific LCA bounds avoiding both "zero-carbon" myths and anti-hydro caricatures.', connectedKewHref: '/open-data', connectedKewLabel: 'KEW Open Data' },
  { code: 'WHEJO-14', name: 'Dam & Tunnel Safety Intelligence', permanentFunction: 'Tracks underground rockbursts, tunnel blockages (e.g., Neelum–Jhelum 2022+), flood damage (GB 2026), and emergency sirens.', evidentiaryStandard: 'Parliamentary/assembly disclosures, operator reports, and ICOLD safety benchmarks.', connectedKewHref: '/risk-monitoring/environmental-monitoring', connectedKewLabel: 'Monitoring Hub' },
  { code: 'WHEJO-15', name: 'Cumulative Basin Assessment', permanentFunction: 'Evaluates whole-river cascades across the Chenab, Jhelum, Neelum, Kishanganga, Shyok, Suru, and Upper Indus.', evidentiaryStandard: 'Basin-wide sediment, flow, habitat, and seismic coupling.', connectedKewHref: '/sectoral-eia', connectedKewLabel: 'Cumulative EIA Hub' },
  { code: 'WHEJO-16', name: 'Energy Justice Accountability', permanentFunction: 'Pairs district-level Electricity Benefit Ledgers against Environmental Burden Ledgers to test Sacrifice-Zone hypotheses.', evidentiaryStandard: '10 disaggregate intensity indicators (ha/MW, ha/GWh, host %, outage hrs) without arbitrary composite scores.', connectedKewHref: '/governance/environmental-accountability-observatory', connectedKewLabel: 'Accountability Observatory' },
];

export const PROPOSED_HYDROPOWER_DATA_SOURCES_16: Array<{
  source: string;
  application: string;
  url: string;
}> = [
  { source: 'Central Electricity Authority (CEA, India)', application: 'Generation, peak demand & capacity statistics', url: 'https://cea.nic.in/' },
  { source: 'Grid Controller of India (Grid-India)', application: 'Northern regional grid operations & frequency/flow reports', url: 'https://grid-india.in/' },
  { source: 'Northern Regional Power Committee (NRPC)', application: 'Entitlement allocations & seasonal energy availability', url: 'https://nrpc.gov.in/' },
  { source: 'J&K Power Development Department (PDD / KPDCL / JPDCL)', application: 'Distribution feeders, losses & curtailment schedules', url: 'https://jkpdd.nic.in/' },
  { source: 'NHPC Limited & JKSPDC', application: 'Project-level specifications, generation & O&M disclosures', url: 'https://www.nhpcindia.com/' },
  { source: 'PARIVESH (MoEFCC)', application: 'Forest diversion & environmental clearance filings', url: 'https://parivesh.nic.in/' },
  { source: 'WAPDA (Pakistan)', application: 'Mangla, Neelum–Jhelum & Diamer-Basha project records', url: 'https://wapda.gov.pk/' },
  { source: 'NEPRA & CPPA-G', application: 'State of Industry reports, tariffs & power-purchase data', url: 'https://nepra.org.pk/' },
  { source: 'AJ&K Electricity Department / Power Dev. Org.', application: 'Regional supply, demand & distribution records', url: 'https://ajk.gov.pk/' },
  { source: 'Gilgit-Baltistan Water and Power Department', application: 'Valley hydro stations, flood damage & seasonal shortages', url: 'https://gilgitbaltistan.gov.pk/' },
  { source: 'US Geological Survey (USGS) Earthquake Catalogue', application: 'Historical & contemporary seismic observations (incl. Koyna benchmark)', url: 'https://earthquake.usgs.gov/' },
  { source: 'International Seismological Centre (ISC)', application: 'Reviewed global & Himalayan bulletin seismicity', url: 'http://www.isc.ac.uk/' },
  { source: 'Copernicus Sentinel-1 InSAR', application: 'Millimetre-scale reservoir-rim & portal slope deformation', url: 'https://dataspace.copernicus.eu/' },
  { source: 'Sentinel-2 & NASA/USGS Landsat Archive', application: 'Multi-decadal reservoir inundation & forest-cover change', url: 'https://earthexplorer.usgs.gov/' },
  { source: 'Global Dam Watch (GDW)', application: 'Open global dam barrier & reservoir polygon datasets', url: 'https://www.globaldamwatch.org/' },
  { source: 'Global Energy Monitor (GEM)', application: 'Global Hydropower Tracker project-stage metadata', url: 'https://globalenergymonitor.org/' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XXVIII — COMPLETE 20-VOLUME, 120-CHAPTER MONOGRAPH ARCHITECTURE
// 6 Proposed Chapters per Volume (01–120) — Explicitly a Proposed Research Architecture
// ─────────────────────────────────────────────────────────────────────────────

export const HYDROPOWER_MONOGRAPH_VOLUMES_20: HydropowerMonographVolumeSpec[] = [
  { volumeRoman: 'I', volumeNumber: 1, investigationTitle: 'The Historical Development of Western Himalayan Hydropower', chapterRange: '01–06', analyticalScope: 'From early twentieth-century Mohra/Upper Sindh canals and 1960s Mangla to modern deep-tunnel cascades.' },
  { volumeRoman: 'II', volumeNumber: 2, investigationTitle: 'The Complete Regional Hydropower Inventory', chapterRange: '07–12', analyticalScope: 'Verified census of operational, under-construction, and proposed projects across Kashmir, Jammu, Ladakh, AJ&K, and GB.' },
  { volumeRoman: 'III', volumeNumber: 3, investigationTitle: 'Electricity Generation and Seasonal Variability', chapterRange: '13–18', analyticalScope: 'Snowmelt summer peaks versus 70–80% winter river-flow drops, capacity factors, and firm-power illusions.' },
  { volumeRoman: 'IV', volumeNumber: 4, investigationTitle: 'Ownership, Electricity Allocation and External Distribution', chapterRange: '19–24', analyticalScope: 'NHPC/JKSPDC/CVPPPL/WAPDA/IPP ownership, 12% free-power clauses, PPAs, water charges, and grid exports.' },
  { volumeRoman: 'V', volumeNumber: 5, investigationTitle: 'Regional Outages, Curtailment and Energy Poverty', chapterRange: '25–30', analyticalScope: 'Nov 2026 1,300 MW J&K gap, GB 128 MW flood deficit, Ladakh islanding, SAIDI/SAIFI, and winter heating poverty.' },
  { volumeRoman: 'VI', volumeNumber: 6, investigationTitle: 'Forest Submergence and Ecological Transformation', chapterRange: '31–36', analyticalScope: 'Sawalkote (847 ha forest / 1,160 ha submergence), Pakal Dul, Kirthai-II, Kinnaur 90% diversion lessons, and CAMPA limits.' },
  { volumeRoman: 'VII', volumeNumber: 7, investigationTitle: 'Wildlife Disturbance and Habitat Fragmentation', chapterRange: '37–42', analyticalScope: 'Pre-impoundment blasting, road cuts, night lighting, transmission collisions, and threatened Himalayan fauna.' },
  { volumeRoman: 'VIII', volumeNumber: 8, investigationTitle: 'River Ecology and Environmental Flows', chapterRange: '43–48', analyticalScope: 'Dewatered tunnel reaches, sediment starvation, thermal shifts, fish barriers, and hourly hydropeaking.' },
  { volumeRoman: 'IX', volumeNumber: 9, investigationTitle: 'Reservoir-Triggered Seismicity', chapterRange: '49–54', analyticalScope: 'Hydrostatic mass loading, pore-pressure diffusion (σ′_n = σ_n − p), Koyna M6.3 precedent, and pre-filling networks.' },
  { volumeRoman: 'X', volumeNumber: 10, investigationTitle: 'Himalayan Tectonics and Active Fault Systems', chapterRange: '55–60', analyticalScope: 'MCT, MBT, MFT, Balakot–Bagh, Kishtwar Window, and Raikot–Karakoram fault proximity to major dams.' },
  { volumeRoman: 'XI', volumeNumber: 11, investigationTitle: 'Landslides, Reservoir Slopes and Geotechnical Stability', chapterRange: '61–66', analyticalScope: 'Reservoir-rim saturation, rapid-drawdown pore-pressure lag, Nashri–Ramban slopes, and Sentinel-1 InSAR.' },
  { volumeRoman: 'XII', volumeNumber: 12, investigationTitle: 'Tunnel Excavation and Groundwater Disturbance', chapterRange: '67–72', analyticalScope: 'Neelum–Jhelum 2022+ tunnel collapses, rockbursts, fractured-aquifer ingress, and disappearing village springs.' },
  { volumeRoman: 'XIII', volumeNumber: 13, investigationTitle: 'Muck Disposal and Construction Pollution', chapterRange: '73–78', analyticalScope: 'Ratle Feb 2026 NGT muck-disposal record, mass-balance spoil accounting, river turbidity, and quarry scars.' },
  { volumeRoman: 'XIV', volumeNumber: 14, investigationTitle: 'Glaciers, GLOFs and Cascading Dam Hazards', chapterRange: '79–84', analyticalScope: 'Proglacial lakes, ice-rock avalanches, landslide-dam breaches, turbine silt abrasion, and spillway adequacy.' },
  { volumeRoman: 'XV', volumeNumber: 15, investigationTitle: 'Community Displacement and Rehabilitation', chapterRange: '85–90', analyticalScope: 'Mangla (>110,000 displaced), Sawalkote Ramban villages, Diamer-Basha (115 km²), cultural petroglyphs, and livelihoods.' },
  { volumeRoman: 'XVI', volumeNumber: 16, investigationTitle: 'Carbon Accounting and Environmental Economics', chapterRange: '91–96', analyticalScope: 'Embedded cement/steel carbon, drowned biomass, reservoir methane, and dual regional benefit-vs-burden ledgers.' },
  { volumeRoman: 'XVII', volumeNumber: 17, investigationTitle: 'Cumulative River-Basin Environmental Assessment', chapterRange: '97–102', analyticalScope: 'Chenab, Jhelum, Neelum, and Upper Indus cascades—and scrutiny of 2026 strategic CEIA relaxations.' },
  { volumeRoman: 'XVIII', volumeNumber: 18, investigationTitle: 'Transboundary Water and Hydropower Governance', chapterRange: '103–108', analyticalScope: 'Indus Waters Treaty design constraints, Kishanganga 2013 PCA award (9 m³/s), Neelum–Jhelum, and symmetrical science.' },
  { volumeRoman: 'XIX', volumeNumber: 19, investigationTitle: 'Alternative Energy Futures for Mountain Communities', chapterRange: '109–114', analyticalScope: 'Turbine uprating, rooftop/cold-desert solar, BESS, building thermal insulation, cold-climate heat pumps, and grid upgrades.' },
  { volumeRoman: 'XX', volumeNumber: 20, investigationTitle: 'Environmental Integrity and Energy Justice', chapterRange: '115–120', analyticalScope: 'Sacrifice-zone empirical testing, FERC/WCD/EU comparative lessons, 15-gate WH-HIP, and 16-registry KEW Observatory.' },
];

const VOLUME_CHAPTER_TEMPLATES_6: Array<
  (vol: HydropowerMonographVolumeSpec) => { title: string; focus: string; methods: string }
> = [
  (v) => ({
    title: `${v.investigationTitle}: Conceptual & Scientific Baseline`,
    focus: `Establishes physical equations, definitions, and historical context for ${v.investigationTitle.toLowerCase()} across all five Western Himalayan regions.`,
    methods: 'Peer-reviewed engineering/earth-science synthesis & primary archive scoping.',
  }),
  (v) => ({
    title: `Jhelum, Kishanganga & Neelum Basin Audit — ${v.investigationTitle}`,
    focus: `Examines Kashmir Valley and Azad Jammu & Kashmir project evidence (Uri, Lower Jhelum, Kishanganga, Neelum–Jhelum, Mangla) within ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Project DPRs, parliamentary/tribunal records, hydrographs & Sentinel optical/SAR series.',
  }),
  (v) => ({
    title: `Chenab & Ravi Cascade Audit — ${v.investigationTitle}`,
    focus: `Investigates Jammu Division projects (Salal, Baglihar, Dulhasti, Sawalkote, Ratle, Pakal Dul, Kiru, Kwar, Kirthai-II) for ${v.investigationTitle.toLowerCase()}.`,
    methods: 'PARIVESH clearances, CEA/JKSPDC/CVPPPL disclosures, CAG/NGT records & DEM analysis.',
  }),
  (v) => ({
    title: `Upper Indus, Ladakh & Gilgit-Baltistan Audit — ${v.investigationTitle}`,
    focus: `Evaluates high-altitude cold-desert and Karakoram infrastructure (Nimoo Bazgo, Chutak, GB valley stations, Diamer-Basha) under ${v.investigationTitle.toLowerCase()}.`,
    methods: 'UT Ladakh, GB Water & Power Dept., WAPDA/NEPRA records & cryosphere hazard mapping.',
  }),
  (v) => ({
    title: `Quantitative Measurement, Uncertainty & Unverified Data Gaps — ${v.investigationTitle}`,
    focus: `Defines instrumentation, mass-balance/statistical equations, error bounds, and missing public disclosures governing ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Reproducible open-data schema & Section XXX evidentiary quarantine audit.',
  }),
  (v) => ({
    title: `Governance Reform & Hydropower Integrity Protocol Integration — ${v.investigationTitle}`,
    focus: `Translates empirical findings from Volume ${v.volumeRoman} directly into enforceable licensing, monitoring, and host-community benefit rules.`,
    methods: 'Comparative FERC/EU/WCD legal engineering & KEW Observatory registry integration.',
  }),
];

// Curated anchor titles for key landmark chapters so table-of-contents browsing feels rich and specific
const SPECIFIC_CHAPTER_TITLE_OVERRIDES: Record<string, string> = {
  '01': 'From Mohra (1905) and Mangla (1967) to the Twenty-First-Century Tunnel Rush',
  '07': 'Building an Authenticated Five-Region Hydropower Census: Capacities vs. Reality',
  '13': 'The November 2026 Paradox: 3,362 MW Winter Demand, 1,300 MW Gap and Frozen Rivers',
  '16': 'Gilgit-Baltistan’s 2026 Flood Shock (211.6 MW to 157 MW) and Ladakh’s November 4 Islanding',
  '19': 'Anatomy of the 12% Free-Power Clause, PPAs and the 1,000 MW / 3,942 GWh Allocation Model',
  '25': 'Mapping the Outage Atlas: SAIDI, SAIFI and 6–8 Hour Feeder Schedules Beside Powerhouses',
  '31': 'Sawalkote’s 847-Hectare Forest Diversion and Ramban’s 88.94% Submergence Burden',
  '35': 'Why Saplings Are Not an Ancient Forest: Lessons from Kinnaur’s 90% Forest Diversion Study',
  '43': 'Dewatered Gorges and Hydropeaking: Why Monthly Average Releases Conceal Hourly Ecological Shock',
  '49': 'Physics of Reservoir-Triggered Seismicity: Hydrostatic Mass, Pore Pressure (σ′_n = σ_n − p) and Koyna 1967',
  '61': 'Rapid Drawdown and Saturated Rims: InSAR Detection of Reservoir-Induced Slope Creep',
  '67': 'Inside Unstable Mountains: Neelum–Jhelum’s 2022 Tailrace Blockage and Headrace Shutdowns',
  '71': 'When Tunnels Pierce Fractured Aquifers: Investigating Disappearing Mountain Springs',
  '73': 'Excavated Mountains Dumped in Rivers: The February 2026 Ratle NGT Muck-Disposal Record',
  '79': 'Upstream Glacial Lakes, Ice Avalanches and Compound Dam-Safety Stress Tests',
  '85': 'From 110,000 Displaced at Mangla to Diamer-Basha’s 115 km² Reservoir: Accounting Beyond Cash',
  '91': 'Lifecycle Carbon Accounting of Himalayan Dams: Cement, Drowned Biomass and Methane Bounds',
  '97': 'The Chenab Cascade and the 2026 Strategic Relaxation of Cumulative Impact Assessments',
  '103': 'Kishanganga (330 MW) and Neelum–Jhelum (969 MW): The 9 m³/s Award vs. Living River Ecology',
  '109': 'Beyond Continuous Mega-Dams: Insulation, Cold-Climate Heat Pumps, Solar+BESS and Turbine Retrofits',
  '115': 'Testing the Environmental Sacrifice Zone Hypothesis Across Ten Himalayan Districts',
  '120': 'The Mountains Pay. Who Receives the Power? Charter for Energy and Ecological Justice',
};

function slugifyHydroChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 76)
    .replace(/-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const HYDROPOWER_MONOGRAPH_CHAPTERS_120: HydropowerMonographChapter[] =
  HYDROPOWER_MONOGRAPH_VOLUMES_20.flatMap((vol, vIdx) =>
    VOLUME_CHAPTER_TEMPLATES_6.map((tmpl, offset) => {
      const globalIdx = vIdx * 6 + offset + 1;
      const num = String(globalIdx).padStart(2, '0');
      const generated = tmpl(vol);
      const finalTitle = SPECIFIC_CHAPTER_TITLE_OVERRIDES[num] || generated.title;
      return {
        number: num,
        slug: slugifyHydroChapter(num, finalTitle),
        volumeRoman: vol.volumeRoman,
        volumeTitle: vol.investigationTitle,
        title: finalTitle,
        scientificAndPolicyFocus: generated.focus,
        primaryEvidenceAndMethods: generated.methods,
        researchStatus:
          'Proposed Monograph Research Chapter Protocol · Preliminary Scoping Established (Project-by-Project Primary Document Authentication Ongoing)',
      };
    })
  );

export function getHydropowerChapterBySlug(
  chapterSlug: string
): HydropowerMonographChapter | undefined {
  return HYDROPOWER_MONOGRAPH_CHAPTERS_120.find((c) => c.slug === chapterSlug);
}
