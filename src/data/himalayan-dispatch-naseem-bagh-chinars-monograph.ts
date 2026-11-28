// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 14 & FLAGSHIP LIVING-HERITAGE INVESTIGATION
// "THE CHINARS IN THE SHADOW OF CONCRETE"
// Subtitle: "Naseem Bagh: When an Institution of Higher Learning Expands Within
//            a Landscape of Living Heritage"
//
// Placement: Dispatch 11 of 33 in Vol. 01 / No. 01 — immediately after
//            Dispatch 10 ("The National Park That Became a Golf Course") and
//            immediately before Dispatch 12 ("An Elegy for Winter").
//
// Scope: Naseem Bagh · University of Kashmir · Hazratbal · Dal Lake Shore ·
//        Srinagar · Kashmir Valley
// Architecture: 12 Thematic Volumes · 72 Proposed Research Chapters (6 per Volume) ·
//               15-Measure Naseem Bagh Ecological & Heritage Recovery Protocol (NBEHRP-15) ·
//               12-Registry KEW Naseem Bagh Living Heritage & Campus Ecology Observatory
//
// Strict Scientific, Legal & Institutional Safeguards:
// 1. Historical planting estimates (1,200+; 992) and contemporary counts (~700; 696; 710)
//    MUST NOT be subtracted to claim construction-caused tree loss—natural mortality,
//    replacements, boundary changes, and historical record accuracy must be evaluated.
// 2. Reported tree-removal counts (22 in 2011; 16+ at Hamzah Guest House; 2 in Jan 2010)
//    may overlap and MUST NOT be summed without primary incident-by-incident verification.
// 3. The University's 2021–22 land-use inventory (74.66 ha total) covers the reported
//    main-campus inventory, NOT Naseem Bagh independently.
// 4. No specific tree removal or building is declared illegal until statutory permissions
//    under the J&K Preservation of Specified Trees Act, 1969 (and applicable revenue/2009
//    notifications) are authenticated against the date of each intervention.
// 5. Formal Right of Response is guaranteed to the University of Kashmir and its
//    scientific, landscape, and administrative divisions.
// ─────────────────────────────────────────────────────────────────────────────

export interface NaseemBaghChronologyEntry {
  period: string;
  documentedDevelopment: string;
  sourceBasis: string;
}

export interface NaseemBaghCensusRecord {
  source: string;
  reportedChinars: string;
  numericReference: number | null;
  scopeAndCaveat: string;
}

export interface NaseemBaghInfrastructureCase {
  infrastructure: string;
  periodOrContext: string;
  principalQuestion: string;
  arboriculturalAndHeritageFocus: string;
}

export interface NaseemBaghMonographVolume {
  volumeRoman: string;
  volumeNumber: number;
  investigationTitle: string;
  chapterRange: string;
  analyticalScope: string;
}

export interface NaseemBaghMonographChapter {
  number: string; // '01' .. '72'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  scientificAndHistoricalFocus: string;
  primaryEvidenceAndMethods: string;
  researchStatus: string;
}

export interface NaseemBaghObservatoryRegistry {
  code: string;
  name: string;
  permanentFunction: string;
  evidentiaryStandard: string;
  connectedKewHref: string;
  connectedKewLabel: string;
}

export const NASEEM_BAGH_CHINARS_SPEC = {
  monographCode: 'MONOGRAPH 14 · LIVING BOTANICAL HERITAGE & ACADEMIC ACCOUNTABILITY',
  monographSlug: 'monograph-14-the-chinars-in-the-shadow-of-concrete',
  dispatchSlug: 'the-chinars-in-the-shadow-of-concrete',
  targetDispatchNumberIn33: '11',
  kicker:
    'SPECIAL HISTORICAL & ECOLOGICAL INVESTIGATION · LIVING HERITAGE · ACADEMIC INSTITUTIONAL ACCOUNTABILITY · LANDSCAPE TRANSFORMATION · URBAN ECOLOGY',
  editionRubric:
    'SPECIAL HISTORICAL & ECOLOGICAL INVESTIGATION · LIVING HERITAGE · ACADEMIC ACCOUNTABILITY · LANDSCAPE TRANSFORMATION',
  title: 'The Chinars in the Shadow of Concrete',
  subtitle:
    'Naseem Bagh: When an Institution of Higher Learning Expands Within a Landscape of Living Heritage',
  italicDeck:
    'An investigation into four centuries of botanical heritage, decades of institutional expansion and the environmental responsibilities of the university entrusted with its preservation.',
  leadQuestions:
    'What happens when an institution entrusted with educating future generations expands within one of Kashmir’s most historically significant Chinar landscapes? Can the pursuit of academic advancement be reconciled with the preservation of the ecological and cultural heritage surrounding it?',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Living Heritage, Botanical Sciences, Geospatial Intelligence and Academic Accountability Desk',
  geographicScope: 'Naseem Bagh · Hazratbal · Srinagar · Kashmir Valley',
  heroStats: [
    { value: '1,200+', label: 'Historical Mughal planting estimate' },
    { value: '~700', label: 'UoK 2021–22 audit (696 in UniCal)' },
    { value: '12 / 72', label: 'Proposed volumes / chapters' },
  ],
  incidentCards4: [
    {
      kicker: 'Historical planting estimate',
      figure: '1,200+',
      caption: 'Chinars associated with the historical Mughal garden (non-subtractable baseline)',
    },
    {
      kicker: 'University environmental audit, 2021–22',
      figure: '~700',
      caption: 'Chinars documented in Naseem Bagh (696 in UoK Institutional Calendar; 710 in Table 6)',
    },
    {
      kicker: 'Reported tree removal, 2011',
      figure: '22',
      caption: 'Chinars reported cut amid campus development and heritage park plans',
    },
    {
      kicker: 'Hamzah Guest House construction',
      figure: '16+',
      caption: 'Mature Chinars reportedly felled, per INTACH Kashmir’s Saleem Beg (overlap unverified)',
    },
  ],
  landscapeAxiom:
    'A historical garden is not merely a collection of surviving trees. It is the ecological and cultural relationship between those trees and the landscape surrounding them.',
  academicResponsibilityQuestion:
    'If environmental science cannot adequately influence land-use planning within the institution where it is taught, how can society confidently expect that science to influence development elsewhere?',
  closingEpilogueLine:
    'For decades, generations of students have received their education beneath the Chinars of Naseem Bagh. Perhaps it is time the institution itself reflects upon what those Chinars were capable of teaching it.',
  researchLimitationsNote:
    'Research Limitations & Evidentiary Safeguards: The University of Kashmir’s 2021–22 Environmental Audit (including visual verification of its tree inventory on page 23) and Institutional Calendar were examined alongside indexed journalistic extracts (Kashmir Life 2011, Outlook India 2023, Daily Excelsior May 2024, Mongabay Sept 2024, Kashmir Observer & Greater Kashmir Nov 2026). Historical planting estimates (1,200+; 992) and contemporary counts (~700; 696; 710) must never be directly subtracted to claim construction-caused loss, nor may the reported 22 and 16+ tree removals be summed without verifying incident overlap. Exact historical canopy loss, delayed construction-related root mortality, authenticated building/tree-felling permits under the J&K Preservation of Specified Trees Act, 1969, and total Naseem Bagh area transformed remain unverified and constitute the primary forensic objectives of Monograph 14.',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART III — 13-STAGE CHRONOLOGY OF A TRANSFORMING LANDSCAPE (MUGHAL ERA–NOV 2026)
// ─────────────────────────────────────────────────────────────────────────────

export const NASEEM_BAGH_CHRONOLOGY_13: NaseemBaghChronologyEntry[] = [
  {
    period: 'Mughal period (1586 / 1635)',
    documentedDevelopment:
      'Establishment under Emperor Akbar and subsequent Chinar avenue expansion under Shah Jahan (Azam Khan) overlooking Dal Lake.',
    sourceBasis: 'Mughal historical chronicles & INTACH Kashmir cultural-landscape records',
  },
  {
    period: '1948 onwards',
    documentedDevelopment:
      'Establishment of university higher education in Kashmir and progressive institutional expansion across Hazratbal and Naseem Bagh.',
    sourceBasis: 'University of Kashmir Institutional Calendar (UniCal)',
  },
  {
    period: '2007',
    documentedDevelopment:
      'New guest-house and campus construction activity initiated within Naseem Bagh; university cites security-force occupation of earlier guest facility.',
    sourceBasis: 'Kashmir Life (Feb 2011, citing Prof. B. A. Wafai)',
  },
  {
    period: 'March 2008',
    documentedDevelopment:
      'University authorities publicly announce plans to protect and develop Naseem Bagh as a Chinar heritage park.',
    sourceBasis: 'Contemporary press & institutional announcements (2008)',
  },
  {
    period: 'January 2010',
    documentedDevelopment:
      'Two Chinars reportedly felled for campus facilities shortly after public heritage-park announcements.',
    sourceBasis: 'Oneindia News & regional press archives (Jan 2010)',
  },
  {
    period: 'February 2011',
    documentedDevelopment:
      'Investigative reporting identifies 22 Chinars cut amid campus development and heritage-park plans; Zareef Ahmad Zareef alleges root damage to ~20 Chinars.',
    sourceBasis: 'Kashmir Life ("Unsafe in the University", Feb 2011)',
  },
  {
    period: 'November 2019',
    documentedDevelopment:
      'University issues campus safety advisory after unseasonal heavy snowfall damages mature Chinar limbs.',
    sourceBasis: 'University of Kashmir campus advisories (Nov 2019)',
  },
  {
    period: '2021–22',
    documentedDevelopment:
      'University Environmental Audit documents ~700 Chinars in Naseem Bagh (710 in Table 6; >500 in summary), reiterates Chinar heritage-park plans, and notes infrastructure pressure on green spaces.',
    sourceBasis: 'DIQA University of Kashmir Green/Environmental Audit 2021–22 (p. 23)',
  },
  {
    period: 'September 2023',
    documentedDevelopment:
      'National media investigates fading Mughal-garden character and heritage deterioration associated with concrete campus buildings.',
    sourceBasis: 'Outlook India Weekender investigation (Sept 2023)',
  },
  {
    period: 'May 2024',
    documentedDevelopment:
      'Dumping of construction waste and rubble reported inside Naseem Bagh root zones.',
    sourceBasis: 'Daily Excelsior report (May 2024)',
  },
  {
    period: 'September 2024',
    documentedDevelopment:
      'Environmental reporting documents continuing construction pressures in Naseem Bagh, including an indoor stadium facility.',
    sourceBasis: 'Mongabay-India report (Sept 2024)',
  },
  {
    period: '2025–26',
    documentedDevelopment:
      'A mature Chinar falling onto a newly constructed Institute of Music and Fine Arts (IMFA) block elevates tree-building proximity into a campus safety dispute.',
    sourceBasis: 'University safety statements & regional reporting (2025–26)',
  },
  {
    period: 'November 2026',
    documentedDevelopment:
      'Controversy over pruning/cutting of century-old heritage sweet chestnut trees renews public scrutiny; Environmental Policy Group (EPG) seeks independent inquiry.',
    sourceBasis: 'Kashmir Observer (Nov 13, 2026) & Greater Kashmir (Nov 17, 2026)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART IV — HERITAGE PARK COMMITMENTS VS. DOCUMENTARY EVIDENCE REQUIRED (7)
// ─────────────────────────────────────────────────────────────────────────────

export const HERITAGE_PARK_COMMITMENT_AUDIT_7: [string, string][] = [
  [
    '01 · Heritage designation',
    'Original statutory or University Council notification and enforceable legal protection status',
  ],
  [
    '02 · Heritage park master plan',
    'Approved geographical boundaries, zoning map, and core no-build buffer around Mughal avenues',
  ],
  [
    '03 · Construction restrictions',
    'Applicable campus planning regulations, floor-area limits, and root-zone setback rules',
  ],
  [
    '04 · Chinar protection',
    'Individual georeferenced tree inventories, girth/crown baselines, and arboricultural care plans',
  ],
  [
    '05 · Building approvals',
    'Approval dates, exact parcel footprints, alternative-site reviews, and environmental assessments',
  ],
  [
    '06 · Tree removal',
    'Statutory permissions under the 1969 Act, scientific justification, and verified replacement survival',
  ],
  [
    '07 · Heritage restoration',
    'Completed de-concreting, landscape rehabilitation work, expenditure, and measurable outcomes',
  ],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART V — 9 CAMPUS INFRASTRUCTURE DEVELOPMENTS REQUIRING FORENSIC AUDIT
// ─────────────────────────────────────────────────────────────────────────────

export const NASEEM_BAGH_INFRASTRUCTURE_CASES_9: NaseemBaghInfrastructureCase[] = [
  {
    infrastructure: 'Distance Education Department',
    periodOrContext: 'Campus academic expansion within garden precincts',
    principalQuestion: 'Original site selection, faculty/heritage objections, and footprint over historical lawn axes',
    arboriculturalAndHeritageFocus: 'Interruption of Mughal spatial geometry and pedestrian/vehicular soil compaction',
  },
  {
    infrastructure: 'Hamzah Guest House',
    periodOrContext: 'Initiated 2007; scrutinized in 2011 reporting',
    principalQuestion:
      'Reported felling of 16+ mature Chinars (INTACH Kashmir’s Saleem Beg) and alleged root damage to ~20 Chinars (Zareef Ahmad Zareef); security-occupation rationale cited for prior guest house',
    arboriculturalAndHeritageFocus: 'Foundation trenching across structural root plates and potential overlap with 2011 22-tree tally',
  },
  {
    infrastructure: 'Law Department building',
    periodOrContext: 'Substantial academic block construction',
    principalQuestion: 'Construction footprint, impervious apron expansion, and adjacent mature canopy modifications',
    arboriculturalAndHeritageFocus: 'Crown-building clearance conflicts and altered surface rainwater infiltration',
  },
  {
    infrastructure: 'Student hostels',
    periodOrContext: 'Residential expansion along garden sector margins',
    principalQuestion: 'Cumulative impact on historical garden continuity, sewage/utility trenching, and daily footfall',
    arboriculturalAndHeritageFocus: 'Subsurface utility excavations cutting absorbing root networks',
  },
  {
    infrastructure: 'Indoor stadium',
    periodOrContext: 'Highlighted in September 2024 environmental reporting',
    principalQuestion: 'Alternative non-heritage site assessment, large-span footprint, and environmental safeguards',
    arboriculturalAndHeritageFocus: 'High-volume soil sealing and loss of unbuilt permeable meadow ground',
  },
  {
    infrastructure: 'Institute of Music and Fine Arts (IMFA)',
    periodOrContext: 'New block impacted by fallen Chinar in 2025–26',
    principalQuestion:
      'Why building siting placed new academic rooms within the structural root and fall zone of mature Chinars',
    arboriculturalAndHeritageFocus: 'Post-construction reclassification of adjacent heritage trees as safety hazards',
  },
  {
    infrastructure: 'Internal roads and vehicle parking',
    periodOrContext: 'Progressive campus motorization and asphalt/concrete paving',
    principalQuestion: 'Extent of soil sealing, curb-cut root severance, and heavy-vehicle compaction over drip lines',
    arboriculturalAndHeritageFocus: 'Root-zone hypoxia (reduced O₂ diffusion) and suppressed natural regeneration',
  },
  {
    infrastructure: 'Staff accommodation',
    periodOrContext: 'Residential quarters and ancillary enclosures',
    principalQuestion: 'Historical land-use transformation from open Chinar grove to fenced residential plots',
    arboriculturalAndHeritageFocus: 'Fragmentation of continuous ground-story ecology and garden sightlines',
  },
  {
    infrastructure: 'Subsurface & overhead utility infrastructure',
    periodOrContext: 'Water, drainage, power cables, and heating/communication trenches',
    principalQuestion: 'Repeated unmonitored trench excavation directly through Chinar Root Protection Zones (RPZs)',
    arboriculturalAndHeritageFocus: 'Cumulative root-system severance and pathogen entry wounds (CODIT breakdown)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART VI — CONFLICT-LINKED INSTITUTIONAL SEQUENCE (5 MECHANISMS)
// ─────────────────────────────────────────────────────────────────────────────

export const CONFLICT_INSTITUTIONAL_SEQUENCE_5: [string, string][] = [
  [
    'Security-related occupation of existing facilities',
    'Cited institutional pressure in 2007–2011 to construct replacement guest accommodation (Hamzah Guest House)',
  ],
  [
    'Rapid university enrollment & department growth',
    'Sustained demand for lecture blocks, hostels, sports facilities, and administrative space',
  ],
  [
    'Limited immediately accessible land outside campus',
    'Internalization of development pressure onto open heritage lawns within Naseem Bagh boundaries',
  ],
  [
    'Administrative disruption & shifting tenures',
    'Weakened continuity of long-term heritage master-planning and conservation oversight',
  ],
  [
    'Temporary institutional arrangements',
    'Risk of permanent concrete transformation inside a four-century Mughal cultural landscape',
  ],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART VII — UOK 2021–22 MAIN-CAMPUS LAND-USE INVENTORY & CHINAR CENSUS LEDGER
// ─────────────────────────────────────────────────────────────────────────────

export const UOK_MAIN_CAMPUS_LAND_USE_2021_22: Array<{
  category: string;
  areaHa: number;
  shareOfReportedTotalPct: number;
}> = [
  { category: 'Parks', areaHa: 34.89, shareOfReportedTotalPct: 46.73 },
  { category: 'Green spaces', areaHa: 15.04, shareOfReportedTotalPct: 20.14 },
  { category: 'Built-up area', areaHa: 9.97, shareOfReportedTotalPct: 13.35 },
  { category: 'Playgrounds', areaHa: 7.59, shareOfReportedTotalPct: 10.17 },
  { category: 'Roads', areaHa: 6.03, shareOfReportedTotalPct: 8.08 },
  { category: 'Vehicle parking', areaHa: 0.88, shareOfReportedTotalPct: 1.18 },
];

export const UOK_REPORTED_TOTAL_CAMPUS_AREA_HA = 74.66; // Sum of 6 listed rows = 74.40 ha; audit reports 74.66 ha total main-campus inventory (distinct from Naseem Bagh standalone parcel)

export const NASEEM_BAGH_CHINAR_CENSUS_DISCREPANCY_7: NaseemBaghCensusRecord[] = [
  {
    source: 'Mughal garden historical planting tradition',
    reportedChinars: '1,200+',
    numericReference: 1200,
    scopeAndCaveat:
      'Historical cultural-landscape estimate associated with Akbar / Shah Jahan plantations; cannot be directly subtracted from modern counts without boundary and natural-mortality reconstruction.',
  },
  {
    source: 'Historical account cited in February 2011 reporting',
    reportedChinars: '992',
    numericReference: 992,
    scopeAndCaveat:
      'Historical enumeration cited in Kashmir Life (2011); parcel boundaries and survey date require archival verification.',
  },
  {
    source: "University official's reported initial inventory (cited 2011)",
    reportedChinars: '718',
    numericReference: 718,
    scopeAndCaveat:
      'Reported baseline prior to the removal of 22 trees discussed in 2011 investigative reporting.',
  },
  {
    source: 'UoK Institutional Calendar (UniCal) / Post-removal inventory',
    reportedChinars: '696',
    numericReference: 696,
    scopeAndCaveat:
      'Recorded in UoK Institutional Calendar alongside statement that academic departments were shifted from Naseem Bagh to develop it as a heritage garden (718 − 22 = 696).',
  },
  {
    source: 'UoK Environmental Audit 2021–22 (narrative text)',
    reportedChinars: 'Approximately 700',
    numericReference: 700,
    scopeAndCaveat:
      'Approximate figure cited for Naseem Bagh while reiterating Chinar heritage-park development plans.',
  },
  {
    source: 'UoK Environmental Audit 2021–22 (Table 6, p. 23)',
    reportedChinars: '710 across reported campus inventory',
    numericReference: 710,
    scopeAndCaveat:
      'Tabulated campus-wide Platanus orientalis count; includes saplings/younger replacements alongside ancient trees.',
  },
  {
    source: 'UoK Environmental Audit 2021–22 (executive summary)',
    reportedChinars: 'More than 500 in Naseem Bagh',
    numericReference: 500,
    scopeAndCaveat:
      'Conservative summary phrasing within the same 2021–22 audit—demonstrating why an individually georeferenced Tree Aadhaar census stratified by age/girth is indispensable.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART VIII — 12 INVISIBLE ROOT-ZONE & SOIL DEGRADATION MECHANISMS
// ─────────────────────────────────────────────────────────────────────────────

export const CONSTRUCTION_ROOT_STRESSORS_12: [string, string][] = [
  [
    '01 · Concrete & asphalt paving',
    'Seals soil pores, blocking rainwater percolation and reducing rhizosphere oxygen diffusion below root respiration needs',
  ],
  [
    '02 · Foundation excavation',
    'Severs structural buttress roots and fine absorbing feeder roots within the Critical Root Zone (12× DBH)',
  ],
  [
    '03 · Heavy construction machinery',
    'Compacts alluvial garden loams (bulk density >1.6 g/cm³), crushing macropores and halting fine-root regeneration',
  ],
  [
    '04 · Construction debris & cement washout',
    'Raises soil pH (alkaline lime/mortar leachate), contaminates topsoil, and obstructs natural surface drainage',
  ],
  [
    '05 · Excessive or unbalanced pruning',
    'Depletes foliar photosynthetic capacity, starves root carbohydrate reserves, and exposes heartwood to decay',
  ],
  [
    '06 · Grade changes & soil fill',
    'Buries root flares causing bark suffocation and collar rot, or strips nutrient-rich surface humus horizons',
  ],
  [
    '07 · Altered surface drainage',
    'Induces either anaerobic root-zone waterlogging or acute summer moisture deficits in mature crowns',
  ],
  [
    '08 · Repeated utility trenching',
    'Inflicts serial linear root amputations for cables, water pipes, and drains across multiple decades',
  ],
  [
    '09 · Close building proximity',
    'Creates permanent crown-wall conflicts and institutional pressure for repeated defensive limb lopping',
  ],
  [
    '10 · Impermeable heat-island surfaces',
    'Elevates local surface temperatures, vapour-pressure deficit, and summer evapotranspiration stress',
  ],
  [
    '11 · Mechanical trunk & flare wounds',
    'Breaches bark defences, enabling wood-decay fungi (Inonotus, Ganoderma, polypores) to hollow structural stems',
  ],
  [
    '12 · Progressive root-plate decay',
    'Silently undermines windthrow and snow-load stability years or decades after building completion',
  ],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART X — 14 QUANTITATIVE INDICATORS OF LOST HERITAGE
// ─────────────────────────────────────────────────────────────────────────────

export const HERITAGE_LOSS_INDICATORS_14: [string, string][] = [
  ['01 · Historical tree population', 'Number of documented mature Mughal/pre-1948 Chinar specimens'],
  ['02 · Current tree population', 'Individually georeferenced, QR-tagged census with girth and height'],
  ['03 · Mature canopy extent', 'Hectares of contiguous mature Platanus orientalis crown projection'],
  ['04 · Canopy fragmentation', 'Gap-fraction, patch isolation, and avenue-continuity indices over time'],
  ['05 · Tree age & girth distribution', 'Centuries-old veteran specimens (GBH >4 m) vs. post-2000 saplings'],
  ['06 · Built-up expansion', 'Square metres of historical garden converted to permanent buildings'],
  ['07 · Impermeable surface area', 'Asphalt roads, concrete walkways, curbs, and parking lots inside Naseem Bagh'],
  ['08 · Root-zone disturbance area', 'Cumulative Root Protection Area (BS 5837 RPA) intersected by trenches/slabs'],
  ['09 · Arboricultural tree health', 'Sonic tomography cavities, crown dieback %, bark wounds, and fungal conks'],
  ['10 · Above- & below-ground carbon', 'Allometric biomass carbon + centuries-old undisturbed garden soil organic carbon'],
  ['11 · Microclimate regulation', 'Summer land-surface temperature (LST) and sub-canopy cooling differential (°C)'],
  ['12 · Rainwater infiltration', 'Saturated hydraulic conductivity (Ksat) in open lawn vs. compacted/paved zones'],
  ['13 · Natural & assisted regeneration', 'Survival and recruitment rate of replacement Chinars to maturity'],
  ['14 · Historical landscape integrity', 'Preservation of Mughal charbagh/avenue geometry and Dal Lake visual-ecological axis'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XII — 11 ACADEMIC DISCIPLINES & INSTITUTIONAL INTROSPECTION QUESTIONS
// ─────────────────────────────────────────────────────────────────────────────

export const UOK_DISCIPLINARY_INTROSPECTION_11: [string, string][] = [
  ['Botany & Plant Taxonomy', 'Has every veteran Chinar and heritage sweet chestnut received a diagnostic health and pathology dossier?'],
  ['Environmental Science', 'Have cumulative soil, microclimatic, and root-zone construction impacts across Naseem Bagh been quantified?'],
  ['Geography & Regional Planning', 'Has the four-century spatial transformation from Mughal waterfront garden to built campus been mapped?'],
  ['Geoinformatics & Remote Sensing', 'Has multi-decadal canopy loss (1960s Corona, Landsat, high-res optical/LiDAR) been independently published?'],
  ['Hydrology & Soil Science', 'Have soil compaction, concrete sealing, and Dal-margin infiltration changes been empirically measured?'],
  ['Civil & Geotechnical Engineering', 'Were building foundations and utility corridors engineered outside BS 5837 Root Protection Zones?'],
  ['Law', 'Were Section 3 permissions under the J&K Preservation of Specified Trees Act, 1969 obtained and publicly archived?'],
  ['History & Archaeology', 'Has the Akbar–Shah Jahan avenue geometry and historical hut heritage been conserved as an integrated ensemble?'],
  ['Environmental Economics', 'Has the non-replaceable ecological and cultural asset value of 300–400-year Chinars entered project appraisals?'],
  ['Media Education & Journalism', 'Have decades of campus heritage controversies received sustained documentary archiving and public reporting?'],
  ['University Administration', 'Were off-garden alternative sites rigorously evaluated before placing new structures inside Naseem Bagh?'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XIII — 12 STATUTORY & INSTITUTIONAL DOCUMENTS REQUIRED FOR AUDIT
// ─────────────────────────────────────────────────────────────────────────────

export const REQUIRED_LEGAL_AND_UNIVERSITY_DOCUMENTS_12: [string, string][] = [
  ['01 · Specified Trees notifications', 'Verify statutory rules under J&K Preservation of Specified Trees Act, 1969 & March 2009 lopping/felling orders'],
  ['02 · Heritage park notifications', 'Authenticate 2008 and 2021–22 heritage-garden resolutions and legal landscape status'],
  ['03 · Campus master plans (1948–2026)', 'Establish authorized development zones versus protected Mughal garden precincts'],
  ['04 · Building construction approvals', 'Verify approval dates, site-selection minutes, and tree-setback conditions for all 9 structures'],
  ['05 · Statutory tree-felling permits', 'Verify Divisional Commissioner / competent authority permits for every Chinar felled or pruned'],
  ['06 · Arboricultural risk assessments', 'Examine pre-felling / pre-lopping scientific stability diagnostics (including 2025–26 IMFA & Nov 2026 cases)'],
  ['07 · Landscape Division registers', 'Reconcile 718, 696, ~700, 710, and >500 Chinar counts with individual tree numbers'],
  ['08 · University Council proceedings', 'Trace internal academic objections, heritage-committee advice, and departmental relocation orders'],
  ['09 · Civil contractor agreements', 'Verify binding root-protection fencing, penalty clauses, and debris-disposal rules (May 2024 audit)'],
  ['10 · Compensatory plantation ledgers', 'Audit sapling locations, age classes, and verified 10-year survival rates'],
  ['11 · Campus EIAs & green audits', 'Obtain underlying raw tables and spatial shapefiles for the 2021–22 DIQA Green Audit'],
  ['12 · Capital & conservation expenditure', 'Compare public funds spent on concrete construction inside Naseem Bagh vs. arboricultural care'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XV — 15-MEASURE NASEEM BAGH ECOLOGICAL & HERITAGE RECOVERY PROTOCOL
// ─────────────────────────────────────────────────────────────────────────────

export const NASEEM_BAGH_RECOVERY_PROTOCOL_15: [string, string][] = [
  ['01 · Independent heritage boundary survey', 'Cadastrally demarcate the historical Mughal garden and Dal-shore buffer as an inviolable heritage core'],
  ['02 · Moratorium on new sensitive-zone concrete', 'Halt new permanent buildings, stadiums, and asphalt parking inside Naseem Bagh pending forensic audit'],
  ['03 · Individual Chinar & heritage-tree geotagging', 'Assign open-access QR/RFID Tree Aadhaar IDs (girth, crown, age tier) to every tree in Naseem Bagh'],
  ['04 · Non-invasive arboricultural tomography', 'Conduct sonic/resistograph cavity diagnostics and mycological care across all ~700 Chinars'],
  ['05 · Multi-temporal canopy reconstruction', 'Publish matched-season archival photo, Corona, and VHR satellite canopy maps from 1965 to 2026'],
  ['06 · Enforceable Root Protection Zones (BS 5837)', 'Mandate 12×–15× DBH no-excavation, no-trenching, and no-machinery buffers around every heritage tree'],
  ['07 · Permeable surface & de-concreting programme', 'Replace concrete/asphalt aprons around Chinar root flares with porous gravel/turf and air-spade decompaction'],
  ['08 · Immediate construction-debris remediation', 'Remove all dumped rubble and alkaline mortar waste (addressing May 2024 findings) and restore topsoil'],
  ['09 · Native ground-story & avenue rehabilitation', 'Restore continuous Mughal Chinar sightlines, multi-age succession planting, and pervious meadow hydrology'],
  ['10 · Existing-building compatibility audit', 'Assess structural, drainage, and canopy conflicts at IMFA, Hamzah Guest House, Hostels, and Stadium sites'],
  ['11 · Scientific tree-safety & snow-load protocol', 'Protect students and buildings via cabling, crown-load balancing, and pedestrian routing—not panic lopping'],
  ['12 · Independent multi-disciplinary annual audit', 'Joint annual inspection by external ISA-certified arborists, INTACH heritage architects, and UoK scientists'],
  ['13 · Statutory Living Heritage Management Plan', 'Adopt a legally binding conservation plan approved by the University Council and statutory authorities'],
  ['14 · Public campus-tree transparency portal', 'Publish every tree census record, pruning/felling application, statutory permit, and audit online'],
  ['15 · Dedicated Living Heritage Endowment', 'Ring-fence multi-decade arboricultural financing insulated from changes in university administration'],
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XVI — FIVE-INVESTIGATION INSTITUTIONAL ENVIRONMENTAL HISTORY PENTAD
// ─────────────────────────────────────────────────────────────────────────────

export const KASHMIR_INSTITUTIONAL_HERITAGE_PENTAD_5: Array<{
  dispatchRef: string;
  investigation: string;
  publicAssetExamined: string;
  href: string;
}> = [
  {
    dispatchRef: 'Dispatch 05 · Monograph 10',
    investigation: 'The Laboratory That Kashmir Lost',
    publicAssetExamined: 'Environmental scientific infrastructure (Habak Limnological Laboratory)',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-laboratory-that-kashmir-lost',
  },
  {
    dispatchRef: 'Dispatch 06 · Monograph 11',
    investigation: 'The Art of Encroachment',
    publicAssetExamined: 'Aquatic ecological space (Dal Lake water-to-real-estate conversion)',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-art-of-encroachment',
  },
  {
    dispatchRef: 'Dispatch 10 · Monograph 09',
    investigation: 'The National Park That Became a Golf Course',
    publicAssetExamined: 'Statutorily protected natural landscapes (Sálim Ali / City Forest National Park)',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course',
  },
  {
    dispatchRef: 'Dispatch 11 · Monograph 14',
    investigation: 'The Chinars in the Shadow of Concrete',
    publicAssetExamined: 'Living botanical and cultural heritage (Naseem Bagh & University of Kashmir)',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/the-chinars-in-the-shadow-of-concrete',
  },
  {
    dispatchRef: 'Dispatch 17 · Monograph 04',
    investigation: 'Who Are We Researching For?',
    publicAssetExamined: 'Academic knowledge and scientific responsibility across five Himalayan regions',
    href: '/himalayan-dispatch/issues/volume-01-issue-01/who-are-we-researching-for',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XIX — 9 PRIMARY DOCUMENTARY SOURCES + STATUTORY REFERENCES
// ─────────────────────────────────────────────────────────────────────────────

export const NASEEM_BAGH_PRIMARY_SOURCES_10: Array<{
  source: string;
  url: string;
  significance: string;
}> = [
  {
    source: 'Kashmir Life — "Unsafe in the University" (February 2011)',
    url: 'https://kashmirlife.net/unsafe-in-the-university-1238/',
    significance:
      'Documents reported cutting of 22 Chinars (718 to 696), Zareef Ahmad Zareef’s allegation of ~20 root-damaged Chinars, and Prof. B. A. Wafai’s statement on 2007 guest-house construction.',
  },
  {
    source: 'University of Kashmir Institutional Calendar (UniCal)',
    url: 'https://kashmiruniversity.ac.in/download/UniCal.pdf',
    significance:
      'Records 696 Chinars and states that academic departments were shifted from Naseem Bagh to the main campus specifically to develop it as a heritage garden.',
  },
  {
    source: 'University of Kashmir Environmental / Green Audit (2021–22, DIQA)',
    url: 'https://diqa.uok.edu.in/Files/bd64e8ef-c9a0-43e4-97cc-7444b5ee897a/Custom/7.1.6_GA_21-22.pdf',
    significance:
      'Reports ~700 Chinars in Naseem Bagh (710 in Table 6, p. 23; >500 in summary), 74.66 ha main-campus land-use inventory, infrastructure pressures, and reiterated Chinar heritage-park plans.',
  },
  {
    source: 'Outlook India — Naseem Bagh Mughal Garden Deterioration (September 2023)',
    url: 'https://www.outlookindia.com/culture-society/naseem-bagh-historic-mughal-garden-s-legacy-fades-amidst-neglect-and-development-weekender_story-320315',
    significance:
      'National cultural-heritage investigation into concrete campus construction and fading Mughal garden identity.',
  },
  {
    source: 'Daily Excelsior — Construction Waste Dumping in Naseem Bagh (May 2024)',
    url: 'https://www.dailyexcelsior.com/ku-dumps-construction-waste-in-naseem-bagh/',
    significance:
      'Documents reported dumping of construction rubble inside Naseem Bagh and associated soil/root-zone concerns.',
  },
  {
    source: 'Mongabay-India — Pollution & Construction Threaten Dal Lake Chinar Trees (September 2024)',
    url: 'https://india.mongabay.com/2024/09/pollution-construction-threatens-kashmirs-iconic-dal-lake-chinar-trees/',
    significance:
      'Examines March 2009 felling/lopping restrictions, INTACH assessments, and continuing construction pressures including an indoor stadium.',
  },
  {
    source: 'Kashmir Observer — Campus Green Destruction (November 13, 2026)',
    url: 'https://kashmirobserver.net/2026/11/13/campus-green-destruction/',
    significance:
      'Contemporary scrutiny of campus tree management, safety-pruning defences, and the earlier Chinar fall on a new IMFA block.',
  },
  {
    source: 'Greater Kashmir — EPG Seeks Independent Inquiry into Campus Heritage Trees (November 17, 2026)',
    url: 'https://www.greaterkashmir.com/kashmir/epg-raises-serious-concerns-over-cutting-of-century-old-trees-at-kashmir-university-seeks-independent-inquiry-12815607',
    significance:
      'Documents Environmental Policy Group calls for an independent inquiry following heritage sweet chestnut tree interventions on campus.',
  },
  {
    source: 'India Code — Jammu & Kashmir Preservation of Specified Trees Act, 1969',
    url: 'https://www.indiacode.nic.in',
    significance:
      'Statutory framework (Section 3 permission regime and broad definition of felling/damaging specified trees including Chinar).',
  },
  {
    source: 'Kashmir EcoWatch — Chinar Monitoring & Arboricultural Surveillance Hub',
    url: '/environmental-monitoring/chinar-monitoring',
    significance:
      'KEW’s regional Platanus orientalis Digital Tree Aadhaar, NDVI canopy, pathology, and legal protection observatory.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// KEW NASEEM BAGH LIVING HERITAGE & CAMPUS ECOLOGY OBSERVATORY (12 REGISTRIES)
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_NASEEM_BAGH_OBSERVATORY_REGISTRIES_12: NaseemBaghObservatoryRegistry[] = [
  {
    code: 'NBHO-01',
    name: 'Naseem Bagh Individual Chinar & Heritage-Tree Georegistry',
    permanentFunction:
      'Tracks individual tree coordinates, GBH/DBH, crown spread, estimated age cohort (Mughal / pre-1948 / post-1948), and reconciled census IDs.',
    evidentiaryStandard:
      'Separates verified GPS/QR Tree Aadhaar entries from aggregate audit counts (718, 696, ~700, 710, >500).',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring/tree-registry',
    connectedKewLabel: 'KEW Tree Aadhaar Registry',
  },
  {
    code: 'NBHO-02',
    name: 'Mughal Landscape Geometry & Cadastral Boundary Ledger',
    permanentFunction:
      'Reconstructs Akbar/Shah Jahan avenue alignments, Dal Lake terrace sightlines, historical huts, and post-1948 parcel changes.',
    evidentiaryStandard:
      'Requires archival maps, revenue records, and INTACH cultural-landscape surveys; never conflates main campus (74.66 ha) with Naseem Bagh.',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring/gis-atlas',
    connectedKewLabel: 'KEW GIS Chinar Atlas',
  },
  {
    code: 'NBHO-03',
    name: 'Multi-Temporal Canopy & Impervious Surface Change Atlas',
    permanentFunction:
      'Maps mature Chinar crown continuity, gap fragmentation, building footprints, asphalt roads, and parking slabs across decades.',
    evidentiaryStandard:
      'Matched-phenology (late-summer/autumn leaf-on) high-resolution imagery only; illustrative photos never presented as change proof.',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring/canopy',
    connectedKewLabel: 'KEW Canopy & Satellite NDVI',
  },
  {
    code: 'NBHO-04',
    name: 'BS 5837 Root Protection Zone (RPZ) Intrusion Tracker',
    permanentFunction:
      'Models 12×–15× DBH root protection circles around mature Chinars against building foundations, curbs, and utility trenches.',
    evidentiaryStandard:
      'Applies ISA / BS 5837:2012 biomechanical equations; flags physical trenching verification status per building.',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring/biometrics',
    connectedKewLabel: 'KEW Growth & Biometrics',
  },
  {
    code: 'NBHO-05',
    name: 'Delayed Construction Mortality & Sonic Tomography Dossier',
    permanentFunction:
      'Monitors multi-year crown dieback, fungal heartwood decay, soil bulk density, and structural root-plate stability near concrete.',
    evidentiaryStandard:
      'Distinguishes direct felling, natural senescence, snowfall damage, and multi-year construction-induced root decline.',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring/tree-health',
    connectedKewLabel: 'KEW Tree Health & Pathology',
  },
  {
    code: 'NBHO-06',
    name: 'Tree-Building Proximity & Campus Safety Conflict Audit',
    permanentFunction:
      'Evaluates fall-zone setbacks, wind/snow-load engineering, and non-destructive risk mitigation around academic blocks (including IMFA).',
    evidentiaryStandard:
      'Integrates student/staff safety with pre-construction arboricultural siting standards.',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring',
    connectedKewLabel: 'KEW Chinar Monitoring Hub',
  },
  {
    code: 'NBHO-07',
    name: 'Campus Infrastructure & Alternative-Site Forensic Register',
    permanentFunction:
      'Maintains documentary files on all 9 Naseem Bagh construction categories, approval dates, and off-garden alternative-site assessments.',
    evidentiaryStandard:
      'Records institutional explanations (including 2007–2011 security-occupation displacement context) alongside heritage critiques.',
    connectedKewHref: '/earth-human-impact/urban-ecology',
    connectedKewLabel: 'KEW Urban Ecology',
  },
  {
    code: 'NBHO-08',
    name: 'Statutory Tree-Protection & Permit Verification Ledger',
    permanentFunction:
      'Cross-checks reported fellings and heavy prunings (Chinar and heritage sweet chestnut) against Section 3 permits under the 1969 Act.',
    evidentiaryStandard:
      'Zero unverified illegality claims; every incident remains "Permit Verification Pending" until official dockets are inspected.',
    connectedKewHref: '/governance/legislation-enforcement-observatory',
    connectedKewLabel: 'KEW Legal Observatory',
  },
  {
    code: 'NBHO-09',
    name: 'Heritage Park Commitments vs. Ground-Outcome Tracker',
    permanentFunction:
      'Tracks the 2008 announcement, UoK Institutional Calendar departmental-relocation pledge, and 2021–22 Green Audit heritage-park plan.',
    evidentiaryStandard:
      'Evaluates 7 verifiable indicators: legal notification, master plan, no-build rules, tree care, permits, and completed restoration.',
    connectedKewHref: '/governance/environmental-accountability-observatory',
    connectedKewLabel: 'KEW Accountability Observatory',
  },
  {
    code: 'NBHO-10',
    name: 'Soil Hydrology, De-Concreting & Debris Remediation Monitor',
    permanentFunction:
      'Tracks removal of construction rubble (May 2024 baseline), soil pH/compaction recovery, and permeable surface retrofits.',
    evidentiaryStandard:
      'Field infiltration (Ksat) and soil bulk-density measurements across paved vs. unpaved Chinar avenues.',
    connectedKewHref: '/environmental-monitoring/chinar-monitoring/climate-stress',
    connectedKewLabel: 'KEW Microclimate & Stress',
  },
  {
    code: 'NBHO-11',
    name: 'Academic Self-Scrutiny & Research Integration Index',
    permanentFunction:
      'Catalogues theses, environmental audits, faculty recommendations, and student field studies conducted on Naseem Bagh itself.',
    evidentiaryStandard:
      'Credits constructive faculty/departmental contributions while tracking institutional adoption of scientific advice.',
    connectedKewHref: '/research-library/environmental-research-observatory',
    connectedKewLabel: 'KEW Research Observatory',
  },
  {
    code: 'NBHO-12',
    name: 'Institutional Right-of-Response & Recovery Protocol Ledger',
    permanentFunction:
      'Publishes verbatim responses, master-plan clarifications, and conservation milestones submitted by the University of Kashmir.',
    evidentiaryStandard:
      'Guaranteed prominent, unedited right of reply paired with the 15-measure Naseem Bagh Recovery Protocol.',
    connectedKewHref: '/himalayan-dispatch/issues/monograph-14-the-chinars-in-the-shadow-of-concrete',
    connectedKewLabel: 'Monograph 14 (12 Vols · 72 Chs)',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XVII — COMPLETE 12-VOLUME, 72-CHAPTER MONOGRAPH ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

export const NASEEM_BAGH_MONOGRAPH_VOLUMES_12: NaseemBaghMonographVolume[] = [
  {
    volumeRoman: 'I',
    volumeNumber: 1,
    investigationTitle: 'The Mughal Origins and Historical Geography of Naseem Bagh',
    chapterRange: 'Chapters 01–06',
    analyticalScope:
      'Akbar’s 1586 foundation, Shah Jahan’s Chinar avenue design, Dal Lake shoreline hydrology, historical garden geometry, and cultural-landscape ontology.',
  },
  {
    volumeRoman: 'II',
    volumeNumber: 2,
    investigationTitle: 'Four Centuries of Chinar Heritage',
    chapterRange: 'Chapters 07–12',
    analyticalScope:
      'Botanical biology of Platanus orientalis var. orientalis, veteran tree longevity, historical planting estimates (1,200+; 992), and ecological keystone functions.',
  },
  {
    volumeRoman: 'III',
    volumeNumber: 3,
    investigationTitle: 'From Historical Garden to Educational Campus',
    chapterRange: 'Chapters 13–18',
    analyticalScope:
      'Post-1948 higher-education history, UoK Institutional Calendar heritage commitments, departmental shifts to main campus, and vernacular huts vs. concrete blocks.',
  },
  {
    volumeRoman: 'IV',
    volumeNumber: 4,
    investigationTitle: 'Political Conflict and Institutional Expansion',
    chapterRange: 'Chapters 19–24',
    analyticalScope:
      'Security-force occupation of earlier university guest accommodation, the 2007 Hamzah Guest House decision, administrative disruption, and alternative-site scrutiny.',
  },
  {
    volumeRoman: 'V',
    volumeNumber: 5,
    investigationTitle: 'The History of Concrete Development',
    chapterRange: 'Chapters 25–30',
    analyticalScope:
      'Forensic architectural and site-selection audit across Distance Education, Hamzah Guest House, Law, Hostels, Indoor Stadium, IMFA, Roads/Parking, and Staff Quarters.',
  },
  {
    volumeRoman: 'VI',
    volumeNumber: 6,
    investigationTitle: 'Chinar Felling, Pruning and Root-System Disturbance',
    chapterRange: 'Chapters 31–36',
    analyticalScope:
      'Documented 2010 (2 trees), 2011 (22 trees), and Hamzah (16+ trees) reports, overlap verification, Zareef’s ~20 root-damaged trees, IMFA fall, and Nov 2026 sweet chestnuts.',
  },
  {
    volumeRoman: 'VII',
    volumeNumber: 7,
    investigationTitle: 'The Mathematics of Canopy and Landscape Loss',
    chapterRange: 'Chapters 37–42',
    analyticalScope:
      'Reconciling 718 / 696 / ~700 / 710 / >500 counts, separating UoK’s 74.66 ha main-campus inventory from Naseem Bagh, and measuring 14 canopy/impervious indicators.',
  },
  {
    volumeRoman: 'VIII',
    volumeNumber: 8,
    investigationTitle: 'Tree Health, Soil Science and Urban Ecology',
    chapterRange: 'Chapters 43–48',
    analyticalScope:
      'Rhizosphere oxygen diffusion, soil compaction (>1.6 g/cm³), alkaline debris leachate, BS 5837 Root Protection Zones, CODIT wood decay, and decadal delayed mortality.',
  },
  {
    volumeRoman: 'IX',
    volumeNumber: 9,
    investigationTitle: 'Heritage Protection, Law and Institutional Responsibility',
    chapterRange: 'Chapters 49–54',
    analyticalScope:
      'J&K Preservation of Specified Trees Act 1969 (Section 3), March 2009 Chinar orders, 2008/2021–22 heritage-park pledges, and audit of 12 statutory/university records.',
  },
  {
    volumeRoman: 'X',
    volumeNumber: 10,
    investigationTitle: 'Academic Environmental Ethics and Professional Introspection',
    chapterRange: 'Chapters 55–60',
    analyticalScope:
      'Eleven-discipline self-examination across UoK’s scientific, legal, engineering, and administrative faculties, faculty conservation voices, and Right of Response.',
  },
  {
    volumeRoman: 'XI',
    volumeNumber: 11,
    investigationTitle: 'International Heritage Campus Conservation Models',
    chapterRange: 'Chapters 61–66',
    analyticalScope:
      'Comparative governance at Oxford, Cambridge, Harvard Arnold Arboretum, Kyoto, and Kew—reconciling world-class academic research with inviolable living heritage.',
  },
  {
    volumeRoman: 'XII',
    volumeNumber: 12,
    investigationTitle: 'The Naseem Bagh Ecological and Heritage Recovery Agenda',
    chapterRange: 'Chapters 67–72',
    analyticalScope:
      'The 15-measure Naseem Bagh Recovery Protocol, de-concreting engineering, living dendrology laboratory design, and endowment governance.',
  },
];

const NASEEM_BAGH_CHAPTER_TEMPLATES_6: Array<
  (vol: NaseemBaghMonographVolume) => {
    title: string;
    focus: string;
    methods: string;
  }
> = [
  (v) => ({
    title: `Archival Baseline, Primary Sources & Conceptual Framework — ${v.investigationTitle}`,
    focus: `Establishes verified historical records, definitions, and methodological guardrails governing ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Archival chronicles, UoK UniCal & 2021–22 Green Audit synthesis, and source provenance verification.',
  }),
  (v) => ({
    title: `Spatial, Botanical & Cadastral Reconstruction — ${v.investigationTitle}`,
    focus: `Reconstructs parcel boundaries, avenue geometry, and physical transformations relevant to ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Historical photography, Corona/VHR satellite orthophotos, cadastral overlays & GIS canopy mapping.',
  }),
  (v) => ({
    title: `Institutional Decisions, Campus Planning & Documentary Trail — ${v.investigationTitle}`,
    focus: `Examines administrative approvals, site-selection rationales, and conservation pledges within ${v.investigationTitle.toLowerCase()}.`,
    methods: 'University Council minutes, Landscape Division registers, RTI/statutory dockets & press archives.',
  }),
  (v) => ({
    title: `Arboricultural, Soil & Ecological Diagnostics — ${v.investigationTitle}`,
    focus: `Evaluates root-zone physics, crown vitality, soil permeability, and microclimatic consequences under ${v.investigationTitle.toLowerCase()}.`,
    methods: 'BS 5837 RPA modelling, sonic tomography, soil bulk-density/pH sampling & pathology assays.',
  }),
  (v) => ({
    title: `Quantitative Uncertainty, Census Reconciliation & Evidentiary Limits — ${v.investigationTitle}`,
    focus: `Separates verified counts from unverified overlaps or non-subtractable historical estimates in ${v.investigationTitle.toLowerCase()}.`,
    methods: 'Strict non-subtraction / non-addition audit rules & tree-by-tree Tree Aadhaar reconciliation.',
  }),
  (v) => ({
    title: `Governance Standards, Institutional Right of Response & Recovery Pathways — ${v.investigationTitle}`,
    focus: `Translates Volume ${v.volumeRoman} findings into enforceable campus heritage rules and University of Kashmir dialogue.`,
    methods: 'J&K Specified Trees Act 1969 compliance audit, NBEHRP-15 protocol & KEW Observatory integration.',
  }),
];

const SPECIFIC_NASEEM_BAGH_CHAPTER_OVERRIDES: Record<string, string> = {
  '01': 'Breeze of the Lake: Akbar (1586), Shah Jahan (1635) and the Original Mughal Geometry of Naseem Bagh',
  '06': 'Why a Historical Garden Is More Than Surviving Trunks: Canopy, Ground, Spacing and Dal Lake',
  '07': 'Botanical Architecture of the Centuries-Old Kashmir Chinar (Platanus orientalis var. orientalis)',
  '09': 'Interpreting the 1,200+ and 992 Historical Estimates Without Unscientific Subtraction',
  '13': 'From Royal Chinar Grove to Hazratbal University Precinct: Post-1948 Spatial Evolution',
  '15': 'The Institutional Calendar Contradiction: Shifting Departments Out While Pouring New Concrete In',
  '17': 'Lost Modesty: Historical Campus Huts, Adaptive Reuse and the Shift to Multi-Storey Concrete',
  '19': 'Security Occupation, Institutional Displacement and the 2007 Guest-House Rationale',
  '22': 'Testing the Alternative-Site Question: Did Conflict Pressure Require Building Inside Naseem Bagh?',
  '25': 'Hamzah Guest House, INTACH’s 16+ Felled-Chinar Account and Zareef’s 20-Tree Root-Damage Allegation',
  '27': 'Distance Education, Law Department, Hostels and Staff Quarters: Incremental Lawn Fragmentation',
  '29': 'The September 2024 Indoor Stadium & May 2024 Rubble Dumping: Anatomy of Continuing Pressure',
  '31': '2008 Heritage-Park Announcements vs. 2010–2011 Removals: Auditing the 22-Tree Report',
  '34': 'The 2025–26 IMFA Fallen-Chinar Incident: When New Buildings Turn Ancient Trees into "Safety Threats"',
  '36': 'November 2026 Heritage Sweet Chestnuts and the Call for an Independent Campus Tree Inquiry',
  '37': 'Reconciling 718, 696, ~700, 710 and >500: Inside the University’s Own Chinar Census Numbers',
  '39': 'Disentangling UoK’s 74.66-Hectare Main-Campus Land-Use Inventory from Naseem Bagh Proper',
  '43': 'What Concrete Does Underground: Soil Sealing, Compaction, Trenching and Root-Zone Hypoxia',
  '46': 'BS 5837 Root Protection Areas (12× DBH) and Multi-Decade Delayed Construction Mortality',
  '49': 'Section 3 of the J&K Preservation of Specified Trees Act, 1969 and the March 2009 Chinar Ban',
  '52': 'Twelve Statutory and University Records Required Before Any Removal Is Judged Lawful or Unlawful',
  '55': 'Eleven University Disciplines Facing One Living Mirror: Botany, Remote Sensing, Law and Engineering',
  '60': 'If Environmental Science Cannot Guide Its Own Campus, Where Can It Prevail?',
  '61': 'Oxford, Cambridge, Harvard Yard, Kyoto and Kew: How Great Universities Protect Living Heritage',
  '67': 'The 15-Measure Naseem Bagh Ecological & Heritage Recovery Protocol (NBEHRP-15)',
  '72': 'What the Chinars Were Capable of Teaching the University: Charter for a Living Heritage Arboretum',
};

function slugifyNaseemChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 76)
    .replace(/-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const NASEEM_BAGH_MONOGRAPH_CHAPTERS_72: NaseemBaghMonographChapter[] =
  NASEEM_BAGH_MONOGRAPH_VOLUMES_12.flatMap((vol, vIdx) =>
    NASEEM_BAGH_CHAPTER_TEMPLATES_6.map((tmpl, offset) => {
      const globalIdx = vIdx * 6 + offset + 1;
      const num = String(globalIdx).padStart(2, '0');
      const generated = tmpl(vol);
      const finalTitle = SPECIFIC_NASEEM_BAGH_CHAPTER_OVERRIDES[num] || generated.title;
      return {
        number: num,
        slug: slugifyNaseemChapter(num, finalTitle),
        volumeRoman: vol.volumeRoman,
        volumeTitle: vol.investigationTitle,
        title: finalTitle,
        scientificAndHistoricalFocus: generated.focus,
        primaryEvidenceAndMethods: generated.methods,
        researchStatus:
          'Proposed Monograph Research Chapter Protocol · Preliminary Documentary & Audit Scoping Established (Authenticated Permits, Cadastral Survey & Independent Arboricultural Fieldwork Ongoing)',
      };
    })
  );

export function getNaseemBaghChapterBySlug(
  chapterSlug: string
): NaseemBaghMonographChapter | undefined {
  return NASEEM_BAGH_MONOGRAPH_CHAPTERS_72.find((c) => c.slug === chapterSlug);
}
