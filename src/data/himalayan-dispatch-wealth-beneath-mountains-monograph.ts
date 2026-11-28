// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 16 & SPECIAL GEOLOGICAL / EXTRACTIVE INVESTIGATION
// "THE WEALTH BENEATH THE MOUNTAINS"
// Subtitle: "Gilgit-Baltistan’s Mineral Resources: Extraction, Environmental
//            Vulnerability, External Commercial Interests and the Question of
//            Local Ownership"
//
// Placement: Immediately after "The Price of Power" and immediately before
//            "The Western Himalayas Are Sitting on a Time Bomb"
//            (Dispatch 24 of 35 in complete Vol. 01 / No. 01 sequence).
//
// Attribution & Regional Bureau Honesty Rule:
//   Byline: "Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage"
//   Desk:   "Geological Sciences, Extractive Economics and Mineral Resource Governance"
//   Editorial Oversight: Dr. Fayaz Ahmad Khan, Founding Editor-in-Chief
//   (Personal byline of Founding Editor-in-Chief intentionally omitted; no
//    fictional regional correspondent or unestablished local bureau is claimed
//    until a genuine Gilgit-Baltistan correspondent is appointed and contributes.)
//
// Architecture: 18 Thematic Volumes · 108 Proposed Research Chapters (6 per Volume) ·
//               20-Gate Mineral Extraction Integrity Protocol (GB-MEIP-20) ·
//               18-Registry KEW Gilgit-Baltistan Mineral Extraction &
//               Environmental Accountability Observatory
// ─────────────────────────────────────────────────────────────────────────────

export interface MineralOccurrenceEntry {
  mineral: string;
  category: 'PRECIOUS_METAL' | 'BASE_STRATEGIC_METAL' | 'GEMSTONE' | 'CRITICAL_INDUSTRIAL';
  reportedOccurrences: string;
  classificationNote: string;
}

export interface MineralMonographVolume {
  volumeRoman: string;
  volumeNumber: number;
  investigationTitle: string;
  chapterRange: string;
  analyticalScope: string;
}

export interface MineralMonographChapter {
  number: string; // '01' .. '108'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  geologicalAndGovernanceFocus: string;
  primaryEvidenceAndMethods: string;
  researchStatus: string;
}

export interface GbMineralObservatoryRegistry {
  code: string;
  name: string;
  permanentFunction: string;
  evidentiaryStandard: string;
  connectedKewHref: string;
  connectedKewLabel: string;
}

export const WEALTH_BENEATH_MOUNTAINS_SPEC = {
  monographCode: 'MONOGRAPH 16 · MINERAL GOVERNANCE, EXTRACTIVE ECONOMICS & ENVIRONMENTAL JUSTICE',
  monographSlug: 'monograph-16-the-wealth-beneath-the-mountains',
  dispatchSlug: 'the-wealth-beneath-the-mountains',
  targetDispatchNumberIn35: '24',
  kicker:
    'SPECIAL GEOLOGICAL & ENVIRONMENTAL INVESTIGATION · MINERAL RESOURCE GOVERNANCE · EXTRACTIVE ECONOMICS · ENVIRONMENTAL JUSTICE · GEOPOLITICAL INTERESTS',
  editionRubric:
    'SPECIAL GEOLOGICAL INVESTIGATION · MINERAL EXPLOITATION · EXTERNAL COMMERCIAL INTERESTS · RESOURCE OWNERSHIP · ENVIRONMENTAL JUSTICE',
  title: 'The Wealth Beneath the Mountains',
  subtitle:
    'Gilgit-Baltistan’s Mineral Resources: Extraction, Environmental Vulnerability, External Commercial Interests and the Question of Local Ownership',
  italicDeck:
    'Who owns the mineral wealth, who receives its economic benefits, and who inherits the environmental liabilities after the mountains have been excavated?',
  leadStandfirst:
    'Beneath the glaciers, valleys and towering mountains of Gilgit-Baltistan lies an extraordinary geological inheritance where the Himalayan, Karakoram and Hindu Kush systems converge. As commercial interest in its mineral resources expands, who will control their extraction, who will receive the economic benefits, and who will inherit the environmental consequences?',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage',
  deskAttribution:
    'Geological Sciences, Extractive Economics and Mineral Resource Governance',
  editorialOversight: 'Dr. Fayaz Ahmad Khan, Founding Editor-in-Chief',
  targetFutureBureauByline: 'Himalayan Dispatch | Gilgit-Baltistan Bureau (Upon Correspondent Appointment)',
  dateline: 'GILGIT-BALTISTAN · KARAKORAM · UPPER INDUS BASIN',
  geographicScope: 'Gilgit-Baltistan · Karakoram · Upper Indus Basin · Western Himalayas',
  heroStats: [
    { value: '43,494 km²', label: 'Reported mineral-interest area (not active mines)' },
    { value: '590 / 0', label: 'Portal study entries / Displayed private leases' },
    { value: '18 / 108', label: 'Proposed volumes / research chapters' },
  ],
  royaltyComparisonStats: {
    baseGovernmentRoyaltyPkr: 100,
    earlierCommunityEntitlementPkr: 200, // 2x government royalty
    amended2024CommunityEntitlementPkr: 30, // 30% of government royalty
    illustrativeReductionPct: 85,
  },
  acidMineDrainageReaction: '2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺',
  portalPrincipleQuote:
    'A geological occurrence registry is not sufficient. Society also needs a transparent ownership, environmental clearance, extraction and revenue registry.',
  closingEpilogueQuestion:
    'Before the world begins calculating how much wealth can be extracted from the mountains of Gilgit-Baltistan, should Gilgit-Baltistan not first calculate how much wealth it will retain, how much nature it will lose, and what will remain for the generations that inherit those mountains?',
  unverifiedQuantities7: [
    'Total number of currently operational mines across Gilgit-Baltistan',
    'Actual number and beneficial ownership of foreign-controlled concessions or joint ventures',
    'Economically recoverable mineral reserves (as distinct from geological occurrences)',
    'Annual physical mineral and gemstone extraction volumes across formal and informal sites',
    'Verified mining-attributable forest, alpine-pasture, or protected-area habitat loss',
    'Analytical upstream/downstream heavy-metal, mercury, cyanide, or acid-drainage measurements',
    'Verified regional economic value retention and post-2024 community royalty disbursements',
  ],
  researchLimitationsNote:
    'Research Status & Evidentiary Safeguards: Preliminary investigation synthesizes the Gilgit-Baltistan Mines & Minerals public portal (590 numbered study-area/auctionable entries vs. zero records displayed in the public private-leaseholder view at inspection), the 43,494 km² investment-forum figure (an area of mineral-development interest, NOT excavated land), April 27, 2025 Shigar protests & PGMA objections, the August 9, 2026 Dawn investigation citing GB-EPA warnings on mechanized placer gold mining, and indexed text of consolidated GB Mining Concession Rules (recording a shift from 2× government royalty to 30% community share in 2024, awaiting visual authentication against original gazetted pages). Geological occurrences must never be misrepresented as recoverable billion/trillion-dollar reserves; mercury/cyanide pollution and protected-area overlaps must never be alleged without site-level proof; and Dispatch 24 carries "Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage" until a genuine regional correspondent is appointed.',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PROPOSED FIVE-REGION BUREAU & CORRESPONDENT ATTRIBUTION CHARTER
// ─────────────────────────────────────────────────────────────────────────────

export const PROPOSED_FIVE_REGION_BUREAU_CHARTER: Array<{
  bureau: string;
  principalCoverage: string;
  interimAttributionUntilAppointed: string;
}> = [
  {
    bureau: 'Gilgit-Baltistan Bureau',
    principalCoverage: 'Gilgit, Skardu, Hunza, Nagar, Shigar, Diamer, Ghizer, Astore and Kharmang',
    interimAttributionUntilAppointed: 'Himalayan Dispatch Research Desk | Gilgit-Baltistan Coverage',
  },
  {
    bureau: 'Jammu Bureau',
    principalCoverage: 'Jammu, Kishtwar, Doda, Ramban, Reasi, Rajouri, Poonch and Kathua',
    interimAttributionUntilAppointed: 'Himalayan Dispatch Research Desk | Jammu Coverage',
  },
  {
    bureau: 'Kashmir Bureau',
    principalCoverage: 'Srinagar and all ten districts of the Kashmir Valley',
    interimAttributionUntilAppointed: 'Himalayan Dispatch Research Desk | Kashmir Coverage',
  },
  {
    bureau: 'Ladakh Bureau',
    principalCoverage: 'Leh, Kargil, Zanskar, Nubra, Changthang and Trans-Himalayan landscapes',
    interimAttributionUntilAppointed: 'Himalayan Dispatch Research Desk | Ladakh Coverage',
  },
  {
    bureau: 'Muzaffarabad Bureau',
    principalCoverage: 'Muzaffarabad, Neelum, Mirpur, Poonch, Kotli and Azad Jammu & Kashmir',
    interimAttributionUntilAppointed: 'Himalayan Dispatch Research Desk | Azad Jammu & Kashmir Coverage',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART I — 14 DOCUMENTED REGIONAL MINERAL OCCURRENCES (NOT RESERVES)
// ─────────────────────────────────────────────────────────────────────────────

export const GB_MINERAL_OCCURRENCES_14: MineralOccurrenceEntry[] = [
  {
    mineral: 'Gold (Placer & Primary)',
    category: 'PRECIOUS_METAL',
    reportedOccurrences: 'Indus and Gilgit rivers and their glacier-fed tributaries',
    classificationNote: 'Alluvial placer occurrences actively worked; primary lode reserves require drilling verification',
  },
  {
    mineral: 'Copper',
    category: 'BASE_STRATEGIC_METAL',
    reportedOccurrences: 'Bagrot, Danyor, Sher Qila, Singal and other mineralized zones',
    classificationNote: 'Sulfidic/arc mineralization occurrences; Measured/Indicated reserve tonnages unestablished',
  },
  {
    mineral: 'Ruby',
    category: 'GEMSTONE',
    reportedOccurrences: 'Hunza and Nagar marble-hosted belts',
    classificationNote: 'High-value corundum occurrences; historic artisanal and formal extraction',
  },
  {
    mineral: 'Aquamarine',
    category: 'GEMSTONE',
    reportedOccurrences: 'Shigar, Haramosh, Nagar and adjoining Karakoram valleys',
    classificationNote: 'World-renowned miarolitic pegmatite crystal occurrences',
  },
  {
    mineral: 'Topaz',
    category: 'GEMSTONE',
    reportedOccurrences: 'Shigar, Rondu, Astore, Hunza and adjoining valleys',
    classificationNote: 'Pegmatite- and hydrothermal-hosted gemstone occurrences',
  },
  {
    mineral: 'Tourmaline',
    category: 'GEMSTONE',
    reportedOccurrences: 'Pegmatite-bearing geological formations across Karakoram–Haramosh',
    classificationNote: 'Gem-grade elbaite/schorl occurrences; pocket-scale variability prevents simple reserve extrapolation',
  },
  {
    mineral: 'Garnet',
    category: 'GEMSTONE',
    reportedOccurrences: 'Hunza, Nagar, Ishkoman, Shigar and Kharmang',
    classificationNote: 'Metamorphic and pegmatitic occurrences',
  },
  {
    mineral: 'Lithium-bearing minerals',
    category: 'CRITICAL_INDUSTRIAL',
    reportedOccurrences: 'Shengus pegmatite formations (lepidolite / spodumene occurrences)',
    classificationNote: 'Mineralogical occurrence only—must NOT be represented as commercially mineable lithium reserves',
  },
  {
    mineral: 'Graphite',
    category: 'CRITICAL_INDUSTRIAL',
    reportedOccurrences: 'Nagar, Hunza and Chalt metamorphic belts',
    classificationNote: 'Flake/crystalline occurrences requiring grade, flake-size, and feasibility studies',
  },
  {
    mineral: 'Iron',
    category: 'BASE_STRATEGIC_METAL',
    reportedOccurrences: 'Chilas, Ishkoman, Haramosh and other reported locations',
    classificationNote: 'Mafic-ultramafic and skarn occurrences',
  },
  {
    mineral: 'Molybdenum',
    category: 'BASE_STRATEGIC_METAL',
    reportedOccurrences: 'Hunza, Skardu, Chilas and Astore',
    classificationNote: 'Granitoid-associated occurrences requiring systematic assaying',
  },
  {
    mineral: 'Rare earth elements (REEs)',
    category: 'CRITICAL_INDUSTRIAL',
    reportedOccurrences: 'Selected alkaline/pegmatite occurrences requiring further characterization',
    classificationNote: 'Geochemical anomalies/occurrences only—commercial extractability unverified',
  },
  {
    mineral: 'Marble and dimension limestone',
    category: 'CRITICAL_INDUSTRIAL',
    reportedOccurrences: 'Multiple regional carbonate and metamorphic formations',
    classificationNote: 'Quarrying subject to slope-stability, blasting, and transport constraints',
  },
  {
    mineral: 'Uranium occurrences',
    category: 'CRITICAL_INDUSTRIAL',
    reportedOccurrences: 'Areas identified in historical geological investigations',
    classificationNote: 'Historical radiometric/geological reports; subject to federal statutory controls',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART III–X — COMPARATIVE MATRICES (TRADITIONAL VS INDUSTRIAL, 2025 PROTESTS,
//              PLACER GOLD, VALUE CHAIN, CONTAMINANTS, GEOTECHNICAL HAZARDS)
// ─────────────────────────────────────────────────────────────────────────────

export const TRADITIONAL_VS_INDUSTRIAL_EXTRACTION_6: [string, string][] = [
  [
    'Operational footprint · Smaller local workings',
    'Industrial/mechanized: Potentially extensive open-cut, bench, or multi-kilometre river disturbance',
  ],
  [
    'Labour & skill · Local miners & mineral lore',
    'Industrial/mechanized: Heavy dependence on external capital, excavators, and technical contractors',
  ],
  [
    'Production scale · Limited pocket/seasonal output',
    'Industrial/mechanized: High-throughput rock and alluvial processing volumes',
  ],
  [
    'Risk profile · Informal tunnel & silica hazards',
    'Industrial/mechanized: Tailings, heavy blasting, fuel/chemical storage, and channel-scale scour risks',
  ],
  [
    'Commercial network · Local rough-stone traders',
    'Industrial/mechanized: National corporate consortia and international export supply chains',
  ],
  [
    'Oversight · Historically minimal field inspection',
    'Industrial/mechanized: Demands continuous instrumentation, hydrological audits, and financial bonding',
  ],
];

export const SHIGAR_2025_CONTROVERSY_AUDIT_7: [string, string][] = [
  ['01 · Loss of traditional mineral rights', 'Audit historical customary shamilat/community rights vs. contemporary statutory titles'],
  ['02 · External corporate control', 'Verify beneficial ownership of concessionaires and joint-venture partners'],
  ['03 · Inadequate public consultation', 'Examine official legislative hearing transcripts, Shigar representations & PGMA submissions'],
  ['04 · Reduced local economic benefits', 'Authenticate pre-2024 vs. 2024 amended royalty-sharing gazettes and actual payouts'],
  ['05 · Displacement of small-scale miners', 'Compare historical local permit allocations against auctionable block criteria'],
  ['06 · Unassessed environmental harm', 'Inspect project-level EIAs/IEEs filed with the GB Environmental Protection Agency'],
  ['07 · Centralization of licensing power', 'Analyze statutory allocation of authority across GB Assembly, Mines Dept. & federal bodies'],
];

export const PLACER_GOLD_RIVER_DISTURBANCES_8: [string, string][] = [
  ['01 · Active riverbed excavation', 'Alters channel cross-section, thalweg alignment, and riffle-pool hydraulics'],
  ['02 · Bulk gravel & cobble removal', 'Triggers localized bed incision and hungry-water downstream scour'],
  ['03 · Riverbank undercutting', 'Destabilizes alluvial terraces and erodes scarce irrigated orchard/agricultural plots'],
  ['04 · Excavation near bridges & highways', 'Exposes bridge piers and Karakoram/valley road embankments to flood scour'],
  ['05 · Fine sediment & wash-plant discharge', 'Elevates suspended-solids turbidity, smothering cold-water benthic habitats and Diamer-Basha inflows'],
  ['06 · In-channel heavy machinery', 'Introduces diesel/hydraulic oil leaks, noise, and riparian compaction'],
  ['07 · Disrupted sediment transport continuity', 'Alters downstream bar formation and reservoir sedimentation regimes'],
  ['08 · High-flow / GLOF-season operation', 'Exposes workers, dredgers, and riverside settlements to sudden glacier-melt flood surges'],
];

export const EXTERNAL_INVESTMENT_PARTICIPANTS_7: [string, string][] = [
  ['Local mining communities', 'Are customary rights, land access, and artisanal livelihoods legally safeguarded?'],
  ['Gilgit-Baltistan enterprises', 'What share of active leases, cutting/polishing, and assaying is locally owned?'],
  ['Companies from elsewhere in Pakistan', 'What contractual jobs, taxes, and value-addition remain inside Gilgit-Baltistan?'],
  ['Chinese investors & purchasers', 'Which documented concessions, JVs, or off-take agreements exist beyond forum announcements?'],
  ['Other international investors', 'What beneficial-ownership, environmental-bonding, and disclosure standards apply?'],
  ['Public-sector mineral corporations', 'How are exploration data, JV terms, and public revenues audited by the Auditor-General?'],
  ['International gemstone & bullion buyers', 'What fraction of final retail value accrues at downstream sorting, cutting, and luxury stages?'],
];

export const GEMSTONE_VALUE_CHAIN_6: [string, string][] = [
  ['Stage 01 · High-altitude extraction', 'Local miners bear physical tunnel, rockfall, cold, and silica risks for modest rough shares'],
  ['Stage 02 · Rough mineral sale', 'Unprocessed stones sold into intermediary trading networks—flagged by GB Mines Dept. as regional value loss'],
  ['Stage 03 · Sorting, grading & authentication', 'Gemmological classification separates specimen/facet grade from commercial rough'],
  ['Stage 04 · Precision cutting & lapidary polishing', 'Transforms rough weight into calibrated gemstones with major price multiplication'],
  ['Stage 05 · Lab certification & jewellery setting', 'International gem-lab origin certificates and precious-metal design capture high margins'],
  ['Stage 06 · International luxury retail', 'Global showroom branding captures the peak share of final consumer price'],
];

export const WATER_POLLUTION_CONTAMINANTS_10: [string, string][] = [
  ['Suspended sediment (TSS / NTU)', 'Turbidity plumes from placer washing and waste-rock runoff across Upper Indus tributaries'],
  ['Arsenic (As)', 'Potential mobilization from arsenopyrite/sulfide host rocks into mountain drinking/irrigation water'],
  ['Lead (Pb)', 'Potential heavy-metal release where galena-bearing polymetallic veins are excavated'],
  ['Mercury (Hg)', 'Requires strict verification—must NEVER be alleged unless amalgamation use or lab detection is proven'],
  ['Cadmium (Cd)', 'Trace-metal bioaccumulation hazard associated with sphalerite/sulfide mineralization'],
  ['Dissolved Copper (Cu)', 'Acute gill toxicity to cold-water fish and macroinvertebrates above low-µg/L thresholds'],
  ['Sulphate (SO₄²⁻)', 'Primary hydrochemical indicator of sulfide mineral weathering'],
  ['Acidity / Low pH (AMD)', 'Acid mine drainage via pyrite oxidation (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺)'],
  ['Petroleum hydrocarbons', 'Diesel, lubricants, and hydraulic fluid spills from riverside excavators and generators'],
  ['Flotation / leaching reagents', 'Industrial processing chemicals—must be verified per site rather than assumed'],
];

export const GEOLOGICAL_SLOPE_HAZARDS_9: [string, string][] = [
  ['01 · Steep-slope benching & adits', 'Reduces factor of safety on glacially over-steepened Karakoram–Hindu Kush valley walls'],
  ['02 · Underground tunnel networks', 'Redistributes local in-situ rock stresses across fractured metamorphic/plutonic rock'],
  ['03 · Uncontrolled blasting', 'Generates peak particle velocity (PPV) vibrations, widening joint planes and rockfall chutes'],
  ['04 · Toe-of-slope excavation', 'Removes basal mechanical support beneath colluvial and moraine talus cones'],
  ['05 · Unengineered waste-rock dumps', 'Surcharges steep gullies with loose spoil vulnerable to cloudburst debris flows'],
  ['06 · Subsurface drainage interception', 'Alters fissure pore-water pressures and mountain spring discharge'],
  ['07 · Active-channel gravel mining', 'Triggers lateral bank collapse below riverside villages and road benches'],
  ['08 · High-gradient haulage roads', 'Cuts unbuttressed switchbacks across permafrost and landslide-prone slopes'],
  ['09 · Unsealed abandoned workings', 'Creates long-term localized crown-pillar collapse and acid-seepage liabilities'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XII–XVIII — WILDLIFE, OCCUPATIONAL HAZARDS, CRIRSCO TIERS, 15 QUESTIONS,
//                  AND 20-GATE MINERAL EXTRACTION INTEGRITY PROTOCOL
// ─────────────────────────────────────────────────────────────────────────────

export const PROTECTED_AREAS_AND_WILDLIFE_10: [string, string][] = [
  ['Snow leopard (Panthera uncia)', 'High-alpine habitat fragmentation, blasting disturbance, and haul-road access nearCKNP/Khunjerab'],
  ['Himalayan brown bear (Ursus arctos isabellinus)', 'Denning and alpine-meadow foraging disruption (Deosai & adjoining buffer valleys)'],
  ['Himalayan ibex (Capra sibirica)', 'Displacement from steep cliff escape terrain by high-elevation pegmatite/metal workings'],
  ['Markhor (Capra falconeri)', 'Disturbance of critical winter cliff-scrub habitats along Indus, Gilgit, and Astore gorges'],
  ['Marco Polo sheep (Ovis ammon polii)', 'Sensitivity within restricted transboundary Khunjerab–Pamir high-pass corridors'],
  ['Himalayan musk deer (Moschus leucogaster)', 'Subalpine birch-conifer disturbance and heightened poaching access via mining tracks'],
  ['High-altitude avifauna', 'Blasting noise, dust deposition, and riparian shingle-bar nesting loss'],
  ['Upper Indus cold-water fisheries', 'Placer siltation of spawning gravels and trace-metal gill stress'],
  ['Fragile alpine cushion flora', 'Stripping of skeletal high-elevation soils requiring centuries to regenerate'],
  ['Endemic medicinal plants', 'Direct excavation and unregulated harvesting along newly opened exploration trails'],
];

export const OCCUPATIONAL_MINING_HAZARDS_10: [string, string][] = [
  ['01 · Unsupported tunnel collapse', 'Audit timbering, rock-bolting, and geotechnical roof-support engineering'],
  ['02 · High-wall & portal rockfall', 'Verify scaling protocols, protective canopies, and freeze-thaw slope checks'],
  ['03 · Crystalline silica dust (silicosis)', 'Measure dry-drilling respirable quartz exposure and wet-suppression/PPE use'],
  ['04 · Blasting & explosive injuries', 'Inspect licensed shot-firer training, magazine storage, and misfire procedures'],
  ['05 · Underground oxygen deficiency & gases', 'Verify mechanical ventilation and gas monitoring in deep gemstone adits'],
  ['06 · Extreme high-altitude hypothermia', 'Audit winter shelter, heated camps, and frostbite protection above 3,500 m'],
  ['07 · Remote cliff-trail evacuation lag', 'Assess trauma stabilization and helicopter/ambulance reach times'],
  ['08 · Informal share-system labour', 'Examine written contracts, social security, disability cover, and wage floors'],
  ['09 · Adolescent / child labour risk', 'Require independent unannounced labour inspections at remote sorting/mining camps'],
  ['10 · Unrecorded fatal accidents', 'Establish a verified historical occupational mortality and compensation ledger'],
];

export const GEOLOGICAL_CONFIDENCE_TIERS_6: [string, string][] = [
  ['01 · Mineral occurrence', 'Field or lab identification of a mineral; establishes zero commercial tonnage or viability'],
  ['02 · Exploration target', 'Conceptual mineralized zone warranting mapping, trenching, and geochemical sampling'],
  ['03 · Inferred mineral resource', 'Low-confidence tonnage/grade estimate; insufficient to support economic mine planning'],
  ['04 · Indicated mineral resource', 'Reasonable geological continuity supporting preliminary pre-feasibility evaluation'],
  ['05 · Measured mineral resource', 'High-confidence 3D drilling, sampling, and density characterization'],
  ['06 · Economically mineable reserve', 'Verified portion of Indicated/Measured resource proven viable after engineering, environmental, and legal modifying factors'],
];

export const ECONOMIC_VS_LIABILITY_BALANCE_10: [string, string][] = [
  ['Benefit 01 · Gross mineral sales ↔ Liability 01 · Permanently excavated mountain & alluvial land', 'Must compare audited sales invoices against georeferenced disturbed hectares'],
  ['Benefit 02 · Government royalties ↔ Liability 02 · Forest, pasture & cushion-flora loss', 'Compare treasury receipts against ecological replacement and grazing losses'],
  ['Benefit 03 · Community royalty share ↔ Liability 03 · Riverbed incision & bank erosion', 'Audit actual village receipts (2× vs. 30% rule) against lost riverside orchards'],
  ['Benefit 04 · Local miner wages ↔ Liability 04 · Wildlife corridor fragmentation', 'Pair payroll retention with camera-trap biodiversity baselines'],
  ['Benefit 05 · Capital equipment inflow ↔ Liability 05 · Surface & groundwater contamination', 'Require baseline and quarterly ICP-MS water chemistry'],
  ['Benefit 06 · National export earnings ↔ Liability 06 · Unstabilized waste-rock & tailings', 'Track post-closure acid-drainage and debris-flow stabilization costs'],
  ['Benefit 07 · Local lapidary value-add ↔ Liability 07 · Silicosis, injuries & fatalities', 'Account for lifelong respiratory healthcare and survivor compensation'],
  ['Benefit 08 · Access roads built ↔ Liability 08 · Slope destabilization & blasting damage', 'Evaluate landslide incidence along cut-and-cast mining tracks'],
  ['Benefit 09 · Fiscal tax revenue ↔ Liability 09 · Irrigation channel & agricultural siltation', 'Quantify downstream farming productivity impacts'],
  ['Benefit 10 · Regional development funds ↔ Liability 10 · Orphaned mine closure & reclamation debt', 'Mandate ring-fenced escrow reclamation bonds before excavation'],
];

export const REGULATORY_ACCOUNTABILITY_CHAIN_12: [string, string][] = [
  ['GB Mines and Minerals Department', 'Who receives study areas, exploration licences, and mining leases—and why is the public private-lease table blank?'],
  ['GB Environmental Protection Agency (GB-EPA)', 'How many active operations hold valid IEEs/EIAs, and how were Aug 2026 placer-gold warnings enforced?'],
  ['GB Forest, Wildlife & Environment Dept.', 'Are CKNP, Khunjerab, Deosai, Qurumber, community conservation areas, and wildlife corridors buffered?'],
  ['Revenue & Settlement Authorities', 'How are customary village shamilat rights and private terraces demarcated before licensing?'],
  ['Gilgit-Baltistan Legislative Assembly', 'What committee scrutiny, public hearings, and gazette transparency govern 2024–2025 rule changes?'],
  ['Federal Ministries & Investment Councils', 'What authority do federal bodies exercise over strategic minerals and foreign joint ventures?'],
  ['Geological Survey of Pakistan (GSP)', 'Which mineral occurrences have peer-reviewedMeasured/Indicated resource reports?'],
  ['Pakistan Mineral Development Corp. (PMDC)', 'What public-sector exploration leases, joint ventures, and production figures exist in GB?'],
  ['Auditor-General of Pakistan', 'Are royalty assessments, 30% vs. 2× community transfers, and environmental bonds audited?'],
  ['Private & JV Mining Companies', 'Are beneficial owners, EIA conditions, worker insurance, and reclamation escrows disclosed?'],
  ['District Administrations & Police', 'How are illegal riverside dredgers and community grievances handled across districts?'],
  ['Affected Valley Communities & PGMA', 'Do village councils and local miners hold enforceable consultation and benefit-sharing seats?'],
];

export const HISTORICAL_EXTRACTION_PERIODS_11: [string, string][] = [
  ['Before 1947', 'Customary princely/community mineral stewardship, artisanal gold panning, and high-mountain gem gathering'],
  ['1947–1970', 'Administrative transition and reconnaissance geological mapping across Gilgit and Baltistan'],
  ['1971–1985', 'Institutionalization of national exploration agencies, Hunza ruby workings, and Karakoram Highway access'],
  ['1986–2000', 'Expansion of Shigar–Haramosh–Nagar pegmatite gemstone extraction and rough-stone trading networks'],
  ['2001–2008', 'Rising domestic/external exploration interest and mechanized equipment entry'],
  ['2009–2015', 'Governance restructuring (2009 Order) and contested regional vs. federal resource jurisdiction'],
  ['2016–2020', 'Promulgation of GB Mining Concession Rules and CPEC-era mineral investment promotion'],
  ['2021–2023', 'Moratoria, title scrutiny, digital portal rollout (590 study-area entries), and licensing debates'],
  ['2024', 'Consolidated regulatory amendments—including reported shift in community royalty formula (2× to 30%)'],
  ['2025', 'April 27 Shigar mass protest and PGMA objections over mineral ownership and consultation'],
  ['2026', 'August 2026 GB-EPA / Dawn warnings on mechanized placer gold mining, river scour, and Diamer-Basha risks'],
];

export const FIFTEEN_UNANSWERED_QUESTIONS_GB: [string, string][] = [
  ['01', 'How many mineral concessions and exploration licences are currently active across Gilgit-Baltistan?'],
  ['02', 'How many active concessions are beneficially owned and controlled by Gilgit-Baltistan residents?'],
  ['03', 'How many concessions involve corporate leaseholders domiciled elsewhere in Pakistan?'],
  ['04', 'How many concessions involve Chinese or other foreign investors, joint ventures, or off-take contracts?'],
  ['05', 'What is the verified hectare footprint under active excavation (as distinct from the 43,494 km² interest estimate)?'],
  ['06', 'How many tonnes/carats of metallic, industrial, and gem minerals are extracted annually?'],
  ['07', 'What is the independently audited ex-mine vs. international retail commercial value?'],
  ['08', 'What percentage of total value-chain wealth is retained inside Gilgit-Baltistan?'],
  ['09', 'How much royalty revenue actually reaches affected villages under pre-2024 and post-2024 rules?'],
  ['10', 'How many operating sites hold valid, publicly accessible GB-EPA environmental clearances?'],
  ['11', 'How many concessions intersect or border national parks, glaciers, or wildlife movement corridors?'],
  ['12', 'How many kilometres of the Indus, Gilgit, Hunza, Shigar, and Shyok rivers show mechanized placer disturbance?'],
  ['13', 'How many miners have suffered silicosis, disabling injuries, or fatal tunnel/rockfall accidents?'],
  ['14', 'How many hectares of mined terrain have achieved verified ecological restoration?'],
  ['15', 'Who holds legally enforceable financial liability for acid drainage, waste rock, and slope failure after closure?'],
];

export const MINERAL_INTEGRITY_PROTOCOL_20: [string, string][] = [
  ['Gate 01 · Verified geological resource report', 'Independent CRIRSCO-grade study separating occurrences from mineable reserves'],
  ['Gate 02 · Open competitive cadastre', 'Public digital publication of all applications, bids, coordinates, and lease statuses'],
  ['Gate 03 · Beneficial ownership disclosure', 'EITI-standard disclosure of ultimate natural-person owners and JV partners'],
  ['Gate 04 · Customary & shamilat rights audit', 'Authenticated revenue and village-commons demarcation prior to licensing'],
  ['Gate 05 · Meaningful community consent', 'Documented public hearings in local languages and community agreement protocols'],
  ['Gate 06 · Site-specific EIA & baseline data', 'Independent pre-mining water, soil, air, noise, and biodiversity baselines'],
  ['Gate 07 · Cumulative sub-basin cap', 'Watershed-wide limit on simultaneous riverbed and slope excavations'],
  ['Gate 08 · Protected-area no-go buffer', 'Strict exclusion from national parks (CKNP, Khunjerab, Deosai, Qurumber) and core buffers'],
  ['Gate 09 · Wildlife corridor clearance', 'Seasonal blasting/haulage bans across Markhor, ibex, brown bear, and snow-leopard routes'],
  ['Gate 10 · Geotechnical slope-stability proof', '3D limit-equilibrium / finite-element slope and portal engineering'],
  ['Gate 11 · Blasting PPV & compound-hazard audit', 'Strict vibration limits and multi-hazard landslide/seismic screening'],
  ['Gate 12 · Glacier, moraine & GLOF exclusion', 'Zero excavation or spoil dumping on glaciers, ice-cored moraines, or GLOF runout paths'],
  ['Gate 13 · Upper Indus water-quality protection', 'Zero untreated wash-water, mercury/cyanide ban or closed-loop proof, and AMD testing'],
  ['Gate 14 · Engineered waste-rock & tailings containment', 'Geochemically characterized, flood-proofed spoil containment outside river channels'],
  ['Gate 15 · Underground miner safety & silicosis prevention', 'Mandatory roof bolting, ventilation, wet drilling, trauma evac, and worker insurance'],
  ['Gate 16 · Equitable & ring-fenced community royalty', 'Transparent direct transfer of fair community royalties audited publicly each year'],
  ['Gate 17 · Regional lapidary & value-addition covenant', 'Investment in local gem cutting, testing labs, certification, and technical training'],
  ['Gate 18 · Upfront escrow reclamation bond', 'Full-cost bank-guaranteed closure and ecological restoration bond before ground-breaking'],
  ['Gate 19 · Independent third-party monitoring', 'Unannounced inspections by GB-EPA, university geologists, and community observers'],
  ['Gate 20 · Public compliance & automatic suspension trigger', 'Online telemetry/audit ledger with automatic licence suspension upon grave breach'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XX — 18-REGISTRY KEW GILGIT-BALTISTAN MINERAL EXTRACTION &
//           ENVIRONMENTAL ACCOUNTABILITY OBSERVATORY + 12 EXTERNAL DATA SOURCES
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_GB_MINERAL_OBSERVATORY_REGISTRIES_18: GbMineralObservatoryRegistry[] = [
  {
    code: 'GBMEO-01',
    name: 'Mineral Resource Registry',
    permanentFunction: 'Catalogues all 14+ mineral groups across Gilgit-Baltistan with strict CRIRSCO confidence tags.',
    evidentiaryStandard: 'Separates mineral occurrences from Measured/Indicated resources and mineable reserves.',
    connectedKewHref: '/earth-human-impact/mining-extraction',
    connectedKewLabel: 'KEW Mining & Extraction Hub',
  },
  {
    code: 'GBMEO-02',
    name: 'Mining Concession Cadastre',
    permanentFunction: 'Tracks the 590 portal study/auction entries alongside verified exploration and mining leases.',
    evidentiaryStandard: 'Never conflates study-area rows with operational mines; flags missing private-lease disclosures.',
    connectedKewHref: '/earth-human-impact/spatial-intelligence-atlas',
    connectedKewLabel: 'KEW Spatial Impact Atlas',
  },
  {
    code: 'GBMEO-03',
    name: 'Corporate Ownership Registry',
    permanentFunction: 'Documents leaseholder domicile, corporate structure, and beneficial ownership.',
    evidentiaryStandard: 'EITI-aligned company-register and gazette authentication.',
    connectedKewHref: '/governance/legislation-enforcement-observatory',
    connectedKewLabel: 'KEW Legal Observatory',
  },
  {
    code: 'GBMEO-04',
    name: 'External Investment Intelligence',
    permanentFunction: 'Audits domestic non-GB, Chinese, and other international JVs and off-take agreements.',
    evidentiaryStandard: 'Signed concession/JV records only—distinguished from investment-forum MOUs.',
    connectedKewHref: '/governance/environmental-accountability-observatory',
    connectedKewLabel: 'KEW Accountability Observatory',
  },
  {
    code: 'GBMEO-05',
    name: 'Satellite Mining Detection',
    permanentFunction: 'Uses Sentinel-2 optical and historical Landsat series to map actual ground excavation.',
    evidentiaryStandard: 'Distinguishes active quarry/pit scars from natural scree and glacial moraines.',
    connectedKewHref: '/earth-human-impact/change-detection-observatory',
    connectedKewLabel: 'KEW Satellite Observatory',
  },
  {
    code: 'GBMEO-06',
    name: 'Riverbed Extraction Monitoring',
    permanentFunction: 'Monitors mechanized placer-gold dredgers, gravel bars, bank erosion, and bridge scour.',
    evidentiaryStandard: 'Grounded in GB-EPA compliance dockets and VHR river-corridor imagery.',
    connectedKewHref: '/earth-human-impact/aquatic-cryosphere/river-corridor-change',
    connectedKewLabel: 'KEW River Corridor Change',
  },
  {
    code: 'GBMEO-07',
    name: 'Forest & Protected Area Overlap',
    permanentFunction: 'Computes spatial proximity/overlap with CKNP, Khunjerab, Deosai, Qurumber, and forests.',
    evidentiaryStandard: 'Requires Protected Planet / FWEGB polygon verification before claiming overlap.',
    connectedKewHref: '/protected-network',
    connectedKewLabel: 'KEW Protected Network',
  },
  {
    code: 'GBMEO-08',
    name: 'Wildlife Habitat Intelligence',
    permanentFunction: 'Screens concessions against snow leopard, Markhor, ibex, brown bear, and Marco Polo sheep ranges.',
    evidentiaryStandard: 'Pairs camera-trap and IUCN habitat envelopes with verified haul-road footprints.',
    connectedKewHref: '/biodiversity',
    connectedKewLabel: 'KEW Biodiversity Hub',
  },
  {
    code: 'GBMEO-09',
    name: 'Water Contamination Monitoring',
    permanentFunction: 'Tracks TSS turbidity, pH, sulfate, arsenic, lead, copper, and verified reagent indicators.',
    evidentiaryStandard: 'Upstream-vs-downstream paired sampling; zero unverified mercury/cyanide claims.',
    connectedKewHref: '/water-systems',
    connectedKewLabel: 'KEW Water Systems',
  },
  {
    code: 'GBMEO-10',
    name: 'Mine Waste Intelligence',
    permanentFunction: 'Inventories waste-rock dumps, placer wash-tailings, and sulfide acid-drainage potential.',
    evidentiaryStandard: 'Geochemical acid-base accounting and gully debris-flow exposure mapping.',
    connectedKewHref: '/earth-human-impact/land-earth-systems',
    connectedKewLabel: 'KEW Land & Earth Systems',
  },
  {
    code: 'GBMEO-11',
    name: 'Geological Hazard Assessment',
    permanentFunction: 'Combines Sentinel-1 InSAR slope deformation, fault proximity, and blasting-induced rockfall risk.',
    evidentiaryStandard: 'Strictly separates localized mine-induced rock failure from tectonic earthquakes.',
    connectedKewHref: '/hazard-intelligence/multi-hazard-resilience-command-center',
    connectedKewLabel: 'KEW Multi-Hazard Command Center',
  },
  {
    code: 'GBMEO-12',
    name: 'Cryosphere Vulnerability',
    permanentFunction: 'Evaluates mining proximity to Karakoram glaciers, permafrost slopes, and GLOF channels.',
    evidentiaryStandard: 'ICIMOD / satellite glacier-lake and runout-path spatial screening.',
    connectedKewHref: '/earth-human-impact/aquatic-cryosphere/glacier-recession',
    connectedKewLabel: 'KEW Glacier Recession',
  },
  {
    code: 'GBMEO-13',
    name: 'Occupational Safety Registry',
    permanentFunction: 'Documents miner injuries, tunnel collapses, silicosis screening, labour inspections, and insurance.',
    evidentiaryStandard: 'Verified hospital, labour-inspectorate, and compensation records.',
    connectedKewHref: '/governance/legislation-enforcement-observatory',
    connectedKewLabel: 'KEW Enforcement Ledger',
  },
  {
    code: 'GBMEO-14',
    name: 'Community Royalty Ledger',
    permanentFunction: 'Audits pre-2024 (2× royalty) vs. 2024-amended (30%) rules and actual village disbursements.',
    evidentiaryStandard: 'Requires visual authentication of original gazettes and Auditor-General reports.',
    connectedKewHref: '/governance/environmental-manifesto-observatory',
    connectedKewLabel: 'KEW Fiscal Governance',
  },
  {
    code: 'GBMEO-15',
    name: 'Regional Value Retention',
    permanentFunction: 'Models rough-mineral price leakage vs. local lapidary, assaying, and enterprise value capture.',
    evidentiaryStandard: 'Audited trade, wage, and local-processing accounts rather than rough guesses.',
    connectedKewHref: '/research-library/environmental-research-observatory',
    connectedKewLabel: 'KEW Research Observatory',
  },
  {
    code: 'GBMEO-16',
    name: 'Environmental Clearance Registry',
    permanentFunction: 'Tracks IEE/EIA filings, public hearing minutes, and clearance conditions at GB-EPA.',
    evidentiaryStandard: 'Primary GB-EPA docket verification.',
    connectedKewHref: '/sectoral-eia',
    connectedKewLabel: 'KEW Sectoral EIA Hub',
  },
  {
    code: 'GBMEO-17',
    name: 'Legal Compliance Intelligence',
    permanentFunction: 'Records stop-work notices, fines, litigation, and 2025–2026 statutory rule challenges.',
    evidentiaryStandard: 'Authenticated judicial, EPA, and departmental orders with Right of Response.',
    connectedKewHref: '/governance/legislation-enforcement-observatory',
    connectedKewLabel: 'KEW Legal Compliance',
  },
  {
    code: 'GBMEO-18',
    name: 'Mine Restoration Tracker',
    permanentFunction: 'Monitors closure bonds, backfilling, slope stabilization, and native alpine revegetation.',
    evidentiaryStandard: 'Multi-year post-closure field and NDVI recovery verification.',
    connectedKewHref: '/earth-human-impact/environmental-restoration',
    connectedKewLabel: 'KEW Environmental Restoration',
  },
];

export const GB_MINERAL_EXTERNAL_DATA_SOURCES_12: Array<{
  source: string;
  url: string;
  application: string;
}> = [
  {
    source: 'GB Mines and Minerals Public Portal',
    url: 'https://portal.minesandmineralsgb.gog.pk/',
    application: '590 study-area/auctionable entries, concession rules, and lease-table audit',
  },
  {
    source: 'Geological Survey of Pakistan (GSP)',
    url: 'https://gsp.gov.pk/',
    application: 'Quadrangle geological maps, pegmatite/sulfide reports, and mineral characterization',
  },
  {
    source: 'GB Environmental Protection Agency (GB-EPA)',
    url: 'https://gbepa.gog.pk/',
    application: 'IEE/EIA approvals, placer-gold compliance notices, and river-protection orders',
  },
  {
    source: 'GB Forest, Wildlife & Environment Dept. (FWEGB)',
    url: 'https://fwegb.gov.pk/',
    application: 'Official protected-area boundaries (CKNP, Khunjerab, Deosai, Qurumber) & wildlife rules',
  },
  {
    source: 'GB Law & Prosecution Dept. (Consolidated Rules)',
    url: 'https://lpd.gbit.gov.pk/',
    application: 'Statutory verification of GB Mining Concession Rules and 2024 royalty amendments',
  },
  {
    source: 'Auditor-General of Pakistan',
    url: 'https://agp.gov.pk/',
    application: 'Public financial audits of mineral royalties, departmental receipts, and community transfers',
  },
  {
    source: 'Copernicus Sentinel-2 Multispectral Archive',
    url: 'https://dataspace.copernicus.eu/',
    application: '10 m optical detection of surface excavation, river wash-plants, and turbidity plumes',
  },
  {
    source: 'Copernicus Sentinel-1 InSAR',
    url: 'https://dataspace.copernicus.eu/',
    application: 'Millimetre-scale slope deformation screening above mining benches and riverbanks',
  },
  {
    source: 'USGS / NASA Landsat Archive (1972–2026)',
    url: 'https://www.usgs.gov/mission-areas/mineral-resources',
    application: 'Multi-decadal mining footprint reconstruction & international mineral deposit research',
  },
  {
    source: 'UN Comtrade International Trade Database',
    url: 'https://comtradeplus.un.org/',
    application: 'National mineral/gemstone export benchmarks (noting national totals do not prove GB origin)',
  },
  {
    source: 'Extractive Industries Transparency Initiative (EITI)',
    url: 'https://eiti.org/',
    application: 'International beneficial-ownership, contract-disclosure, and royalty reconciliation standards',
  },
  {
    source: 'Protected Planet (WDPA) & Global Forest Watch',
    url: 'https://www.protectedplanet.net/',
    application: 'Protected-area spatial screening and tree-cover disturbance cross-checks',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XXI — COMPLETE 18-VOLUME, 108-CHAPTER MONOGRAPH ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

export const GB_MINERAL_MONOGRAPH_VOLUMES_18: MineralMonographVolume[] = [
  {
    volumeRoman: 'I',
    volumeNumber: 1,
    investigationTitle: 'Geological Evolution and Mineral Formation',
    chapterRange: 'Chapters 01–06',
    analyticalScope:
      'Collision of the Indian, Karakoram, Kohistan-Ladakh Arc, and Eurasian plates; pegmatite, skarn, hydrothermal, and alluvial placer metallogeny.',
  },
  {
    volumeRoman: 'II',
    volumeNumber: 2,
    investigationTitle: 'Historical Mineral Extraction and Community Ownership',
    chapterRange: 'Chapters 07–12',
    analyticalScope:
      'Pre-1947 customary mineral rights, artisanal gold panning along the Indus, village shamilat commons, and local gemstone knowledge.',
  },
  {
    volumeRoman: 'III',
    volumeNumber: 3,
    investigationTitle: 'Complete Regional Mineral Resource Inventory',
    chapterRange: 'Chapters 13–18',
    analyticalScope:
      'Systematic audit of all 14+ mineral categories across GB—strictly distinguishing occurrences from CRIRSCO-verified reserves.',
  },
  {
    volumeRoman: 'IV',
    volumeNumber: 4,
    investigationTitle: 'Mining Concessions and Legislative Evolution',
    chapterRange: 'Chapters 19–24',
    analyticalScope:
      '1947–2026 regulatory history, the 43,494 km² interest estimate, the 590 portal study entries, and the empty public leaseholder view.',
  },
  {
    volumeRoman: 'V',
    volumeNumber: 5,
    investigationTitle: 'The 2025 Mineral Rights Controversy',
    chapterRange: 'Chapters 25–30',
    analyticalScope:
      'The April 27, 2025 Shigar protest, PGMA objections, consultation deficits, and constitutional debates over regional resource authority.',
  },
  {
    volumeRoman: 'VI',
    volumeNumber: 6,
    investigationTitle: 'Domestic and Foreign Corporate Interests',
    chapterRange: 'Chapters 31–36',
    analyticalScope:
      'Beneficial ownership mapping across GB firms, non-GB Pakistani companies, public corporations, and Chinese/international joint ventures.',
  },
  {
    volumeRoman: 'VII',
    volumeNumber: 7,
    investigationTitle: 'The Global Strategic Minerals Race',
    chapterRange: 'Chapters 37–42',
    analyticalScope:
      'Evaluating copper, Shengus lithium occurrences, Chalt/Nagar graphite, molybdenum, and REEs without speculative valuation hype.',
  },
  {
    volumeRoman: 'VIII',
    volumeNumber: 8,
    investigationTitle: 'Gold Mining and Riverbed Destabilization',
    chapterRange: 'Chapters 43–48',
    analyticalScope:
      'August 2026 GB-EPA / Dawn warnings, mechanized Indus/Gilgit placer dredging, bank erosion, bridge scour, and Diamer-Basha sediment risks.',
  },
  {
    volumeRoman: 'IX',
    volumeNumber: 9,
    investigationTitle: 'Mining-Related Water and Soil Contamination',
    chapterRange: 'Chapters 49–54',
    analyticalScope:
      'Upper Indus hydrochemistry, pyrite oxidation & acid mine drainage (2FeS₂ + 7O₂ + 2H₂O), heavy metals, and strict reagent verification.',
  },
  {
    volumeRoman: 'X',
    volumeNumber: 10,
    investigationTitle: 'Tectonic Vulnerability and Geological Instability',
    chapterRange: 'Chapters 55–60',
    analyticalScope:
      'Slope undercutting, blasting vibrations, adit stress redistribution, waste-rock loading, and separating local rock failure from tectonic quakes.',
  },
  {
    volumeRoman: 'XI',
    volumeNumber: 11,
    investigationTitle: 'Glaciers, Permafrost and Compound Disaster Risks',
    chapterRange: 'Chapters 61–66',
    analyticalScope:
      'High-altitude mining interactions with Karakoram glaciers, ice-cored moraines, permafrost thaw, GLOF channels, and cloudburst debris flows.',
  },
  {
    volumeRoman: 'XII',
    volumeNumber: 12,
    investigationTitle: 'Forests, Wildlife and Protected Areas',
    chapterRange: 'Chapters 67–72',
    analyticalScope:
      'Spatial screening of concessions against CKNP, Khunjerab, Deosai, Qurumber, snow leopard, Markhor, brown bear, and Marco Polo sheep habitats.',
  },
  {
    volumeRoman: 'XIII',
    volumeNumber: 13,
    investigationTitle: 'Occupational Health and Mining Safety',
    chapterRange: 'Chapters 73–78',
    analyticalScope:
      'Underground tunnel collapses, crystalline silica / silicosis, high-altitude cold exposure, informal share labour, and mortality registries.',
  },
  {
    volumeRoman: 'XIV',
    volumeNumber: 14,
    investigationTitle: 'Community Royalties and Financial Accountability',
    chapterRange: 'Chapters 79–84',
    analyticalScope:
      'Authenticating the 2× royalty vs. 2024 30% community-entitlement rule (illustrative 85% drop), AGP audits, and village revenue tracking.',
  },
  {
    volumeRoman: 'XV',
    volumeNumber: 15,
    investigationTitle: 'International Mineral Trade and Regional Value Retention',
    chapterRange: 'Chapters 85–90',
    analyticalScope:
      'Tracing rough gemstones from Shigar and Hunza to global luxury retail; building local lapidary, gem-testing, and enterprise ownership.',
  },
  {
    volumeRoman: 'XVI',
    volumeNumber: 16,
    investigationTitle: 'Scientific Institutions and Regulatory Capacity',
    chapterRange: 'Chapters 91–96',
    analyticalScope:
      'Assessing staffing, laboratories, inspection budgets, and statutory coordination across GB Mines Dept., GB-EPA, FWEGB, GSP, and Karakoram University.',
  },
  {
    volumeRoman: 'XVII',
    volumeNumber: 17,
    investigationTitle: 'Sustainable Extraction and Mine Restoration',
    chapterRange: 'Chapters 97–102',
    analyticalScope:
      'Engineered tailings, AMD neutralization, escrow closure bonds, alpine soil reconstruction, and artisanal-miner safety modernization.',
  },
  {
    volumeRoman: 'XVIII',
    volumeNumber: 18,
    investigationTitle: 'The Future of Mineral Resource Governance in Gilgit-Baltistan',
    chapterRange: 'Chapters 103–108',
    analyticalScope:
      'Implementing the 20-Gate Mineral Extraction Integrity Protocol (GB-MEIP-20), EITI transparency, and KEW’s 18-registry permanent observatory.',
  },
];

const GB_MINERAL_CHAPTER_TEMPLATES_6: Array<
  (vol: MineralMonographVolume) => {
    title: string;
    focus: string;
    methods: string;
  }
> = [
  (v) => ({
    title: `Geological, Legal & Documentary Baseline — ${v.investigationTitle}`,
    focus: `Establishes authenticated primary sources, geological definitions, and evidentiary boundaries for ${v.investigationTitle.toLowerCase()}.`,
    methods: 'GSP geological memoirs, GB Mines Portal dockets, gazetted rules & academic synthesis.',
  }),
  (v) => ({
    title: `Spatial Mapping, Cadastre & Remote Sensing — ${v.investigationTitle}`,
    focus: `Maps valley-by-valley occurrences, concession polygons, and land-cover footprints under ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Sentinel-2 optical, Sentinel-1 InSAR, historical Landsat & WDPA/FWEGB GIS overlays.',
  }),
  (v) => ({
    title: `Institutional, Commercial & Community Dynamics — ${v.investigationTitle}`,
    focus: `Examines licensing decisions, corporate structures, and local stakeholder perspectives in ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Corporate beneficial-ownership checks, Assembly/PGMA records & community testimony protocols.',
  }),
  (v) => ({
    title: `Environmental, Hydrological & Geotechnical Field Protocols — ${v.investigationTitle}`,
    focus: `Specifies water, sediment, slope-stability, and ecological sampling required for ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Paired upstream/downstream ICP-MS hydrochemistry, AMD testing & geotechnical slope modelling.',
  }),
  (v) => ({
    title: `Economic Accounting, Unverified Gaps & Uncertainty — ${v.investigationTitle}`,
    focus: `Separates verified receipts from unverified reserves or unauthenticated gazette extracts in ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Twin Benefit/Liability balance sheets, Auditor-General dockets & strict non-extrapolation rules.',
  }),
  (v) => ({
    title: `20-Gate Integrity Protocol & KEW Observatory Integration — ${v.investigationTitle}`,
    focus: `Translates Volume ${v.volumeRoman} findings into enforceable safeguards and public accountability registries.`,
    methods: 'GB-MEIP-20 gate engineering, EITI disclosure standards & KEW Mining Observatory integration.',
  }),
];

const SPECIFIC_GB_MINERAL_CHAPTER_OVERRIDES: Record<string, string> = {
  '01': 'Where Three Mountain Ranges Collide: Metallogeny of the Himalaya, Karakoram and Hindu Kush',
  '07': 'Before Modern Concessions: Customary Shamilat Rights, Gold Washers and High-Valley Gem Lore',
  '13': 'Fourteen Mineral Groups Across Gilgit-Baltistan: Occurrences vs. Mineable Reserves',
  '19': 'Decoding the 43,494 km² Investment Figure, 590 Portal Entries and the Blank Private-Lease Table',
  '25': 'Shigar, April 27, 2025: Community Protests, PGMA Objections and the Battle Over Mineral Ownership',
  '31': 'Following Beneficial Ownership: Local Miners, Domestic Corporations and Foreign Joint Ventures',
  '37': 'Shengus Lithium, Chalt Graphite and Copper: Preventing Speculative Critical-Mineral Hype',
  '43': 'August 2026 on the Indus: Mechanized Placer Gold Dredging, GB-EPA Warnings and Diamer-Basha Risks',
  '49': 'Pyrite Oxidation (2FeS₂ + 7O₂ + 2H₂O), Heavy Metals and Protecting Upper Indus Waters',
  '55': 'Blasting Fractured Slopes: Geotechnical Hazards Without False Earthquake-Trigger Claims',
  '61': 'Mining Beneath Glaciers and GLOF Channels: Compound Multi-Hazard Screening in the Karakoram',
  '67': 'Concessions Beside CKNP, Khunjerab, Deosai and Qurumber: Spatial Buffers for Iconic Wildlife',
  '73': 'Inside the Pegmatite Adit: Silicosis, Roof Collapse, High-Altitude Cold and Uninsured Labour',
  '79': 'From Twice the Royalty (PKR 200) to Thirty Percent (PKR 30): Authenticating the 2024 Rule Change',
  '85': 'Rough Stones Out, Luxury Margins Elsewhere: Rebuilding Value Retention Inside Gilgit-Baltistan',
  '91': 'Can Regulation Catch Up With Excavators? Auditing Capacity at GB-EPA, Mines Dept. and GSP',
  '97': 'Escrow Closure Bonds, Tailings Containment and Restoring Skeletal Alpine Soils',
  '103': 'The 20-Gate Mineral Extraction Integrity Protocol (GB-MEIP-20)',
  '108': 'The Mountains May Be Rich—Will Their People Share That Wealth? Charter for Resource Justice',
};

function slugifyGbMineralChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 76)
    .replace(/-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const GB_MINERAL_MONOGRAPH_CHAPTERS_108: MineralMonographChapter[] =
  GB_MINERAL_MONOGRAPH_VOLUMES_18.flatMap((vol, vIdx) =>
    GB_MINERAL_CHAPTER_TEMPLATES_6.map((tmpl, offset) => {
      const globalIdx = vIdx * 6 + offset + 1;
      const num = String(globalIdx).padStart(2, '0');
      const generated = tmpl(vol);
      const finalTitle = SPECIFIC_GB_MINERAL_CHAPTER_OVERRIDES[num] || generated.title;
      return {
        number: num,
        slug: slugifyGbMineralChapter(num, finalTitle),
        volumeRoman: vol.volumeRoman,
        volumeTitle: vol.investigationTitle,
        title: finalTitle,
        geologicalAndGovernanceFocus: generated.focus,
        primaryEvidenceAndMethods: generated.methods,
        researchStatus:
          'Proposed Monograph Research Chapter Protocol · Preliminary Portal, Regulatory & Reporting Synthesis Established (Gazette Page Authentication, Lease Cadastre & Field Sampling Ongoing)',
      };
    })
  );

export function getGbMineralChapterBySlug(
  chapterSlug: string
): MineralMonographChapter | undefined {
  return GB_MINERAL_MONOGRAPH_CHAPTERS_108.find((c) => c.slug === chapterSlug);
}
