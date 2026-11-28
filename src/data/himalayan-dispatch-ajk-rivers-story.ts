// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — VOL. 01 / NO. 01 · DISPATCH 25 (AZAD JAMMU & KASHMIR)
// SPECIAL HISTORICAL & HYDROLOGICAL INVESTIGATION · WATER GOVERNANCE ·
// ENERGY JUSTICE · ENVIRONMENTAL ECONOMICS · COMMUNITY RIGHTS
//
// "THE RIVERS THAT NO LONGER BELONG TO THEIR VALLEYS:
//  AZAD JAMMU & KASHMIR — HYDROPOWER, RIVER DIVERSION, SUBMERGED CIVILIZATIONS
//  AND THE UNRESOLVED QUESTION OF ENVIRONMENTAL JUSTICE"
//
// STRICT BYLINE & BUREAU GOVERNANCE:
// - Public Byline: "Himalayan Dispatch Research Desk | Muzaffarabad Coverage"
// - Editorial Oversight: Himalayan Dispatch Central Editorial Board
// - NO Dr. Fayaz Ahmad Khan personal byline.
// - No local physical office in Muzaffarabad is implied.
// ─────────────────────────────────────────────────────────────────────────────

import { buildPreReleaseStage08GateLedger } from '@/lib/himalayan-dispatch-metrics';
import type { MagazineStory } from '@/types/himalayan-dispatch';
import {
  AJK_EDITORIAL_PRIORITIES_6,
  AJK_FOREST_EVIDENCE_PROTOCOLS_10,
  AJK_MINING_CONCESSION_QUESTIONS_8,
  AJK_RIVERS_MONOGRAPH_SPEC,
  MANGLA_RAISING_METRICS_2026,
  MUZAFFARABAD_DIVERSION_METRICS,
  MUZAFFARABAD_SCIENTIFIC_DOMAINS_10,
  WORLD_BANK_CUMULATIVE_FLOW_SCENARIO,
} from './himalayan-dispatch-ajk-rivers-monograph';

export const THE_RIVERS_THAT_NO_LONGER_BELONG_STORY: MagazineStory = {
  id: 'hd-story-ajk-rivers-valleys',
  slug: 'the-rivers-that-no-longer-belong-to-their-valleys',
  editionSlug: 'vol-01-no-01',
  editionLabel: 'VOL. 01 / NO. 01 · THE INAUGURAL ISSUE',
  departmentId: 'investigative-journalism',
  secondaryDepartmentIds: ['data-journalism', 'field-reports', 'editorials'],
  departmentRubric: AJK_RIVERS_MONOGRAPH_SPEC.kicker,
  folioCode:
    '25 / SPECIAL HISTORICAL & HYDROLOGICAL INVESTIGATION · AZAD JAMMU & KASHMIR · MONOGRAPH 17',
  title: AJK_RIVERS_MONOGRAPH_SPEC.title,
  subtitle: AJK_RIVERS_MONOGRAPH_SPEC.subtitle,
  excerpt: `${AJK_RIVERS_MONOGRAPH_SPEC.standfirst} ${AJK_RIVERS_MONOGRAPH_SPEC.overarchingQuestion}`,
  dateline:
    'MUZAFFARABAD · NEELUM VALLEY · MIRPUR · MANGLA · SUDHNOTI · BAGH · POONCH · UPPER JHELUM BASIN',
  region: AJK_RIVERS_MONOGRAPH_SPEC.geographicalFocus,
  readingTimeMinutes: 12,
  wordCount: 2731,
  proseWordCount: 2400,
  publishedAt: '2026-11-28',
  updatedAt: '2026-11-28',
  heroImage:
    '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
  heroCaption:
    'Himalayan river-confluence and steep mountain valley corridor context—illustrating the hydrological and civic stakes when upstream hydropower diversions and downstream storage reservoirs reshape river-dependent settlements (Illustrative archival plate — Kashmir EcoWatch Visual Archive; does not depict a specific Muzaffarabad or Mangla structure).',
  heroCredit: 'Kashmir EcoWatch Visual Archive (Illustrative archival plate)',
  journalistSlug: 'himalayan-dispatch-desk',
  bylineDisplay: AJK_RIVERS_MONOGRAPH_SPEC.bylineDisplay,
  bylineRole:
    'Azad Jammu & Kashmir Coverage · Hydrological Sciences, Water Resource Governance, Environmental Economics & Community Rights Desk (Oversight: Central Editorial Board)',
  factCheckedBy:
    'Stage 04 Documentary Audit (AJ&K 2019 SDG Report, World Bank CIA, AJ&K 2024–25 Accounts & 2025–2026 Press Disclosures) · Himalayan Dispatch Desk',
  scientificReviewer:
    'Internal KEW Fluvial Hydrology, Environmental Flows & Resource Economics Synthesis Completed · Stage 05 External Specialist Peer Review Pending (Pre-Release Stage 08)',
  workflowStage: 'editorial_approval',
  isPublished: true,
  isBigRead: true,
  hasCompletedIndependentReview: false,
  supplementaryDatasetUrl:
    '/himalayan-dispatch/issues/monograph-17-the-rivers-that-no-longer-belong-to-their-valleys',
  supplementaryDatasetLabel:
    'Open Monograph 17 Research Architecture (12 Thematic Volumes · 72 Proposed Chapters Across All 10 AJ&K Districts)',
  reportingBeatSlug: 'transboundary-rivers-hydropower',
  reportingBeatLabel:
    'Azad Jammu & Kashmir Hydrology, River Diversion, Reservoir Displacement & Resource Justice',
  seoTitle:
    'The Rivers That No Longer Belong to Their Valleys: Azad Jammu & Kashmir Hydropower, Mangla & Muzaffarabad | Himalayan Dispatch',
  seoKeywords: [
    'The Rivers That No Longer Belong to Their Valleys',
    'Azad Jammu and Kashmir environmental justice',
    'Muzaffarabad Neelum Jhelum river diversion 969 MW',
    'Mangla Dam Raising Project compensation 15780 acres 118 villages',
    'World Bank Neelum Jhelum cumulative impact assessment',
    'Sudhnoti deforestation FAO 2026',
    'AJK March 2026 mining concessions withdrawal',
    'Mirpur drinking water 2003 Mangla agreement',
  ],
  publicationStatusNote:
    'Stage 08 Pre-Release Regional Flagship Investigation · Filed by Himalayan Dispatch Research Desk | Muzaffarabad Coverage (Bureau In Establishment — No Local Office Implied; Field Gauge & Cadastral Verification Ongoing)',
  conceptualFolioDisclosure: `${AJK_RIVERS_MONOGRAPH_SPEC.bureauDisclosure} ${AJK_RIVERS_MONOGRAPH_SPEC.researchLimitationsDisclosure}`,
  publicationGates: buildPreReleaseStage08GateLedger({
    scientificReviewApplicable: true,
    evidenceSummary:
      'Grounded in Pakistan Ministry of Water Resources project specifications (Neelum–Jhelum 969 MW; 280 m³/s design diversion at Nauseri ~41 km upstream of Muzaffarabad), AJ&K P&DD 2019 Sustainable Development Report acknowledgments, World Bank cumulative-impact projections (650 m³/s to <100 m³/s; >84.6% under assessed cumulative scenario), 2025 >PKR 1.6B Muzaffarabad water-supply reporting (targeting 450,000 residents), Accountant General AJ&K 2024–25 financial statements on Mangla water-usage charges, May 2026 Business Recorder reporting on Ministry of Defence concerns over Mangla Raising compensation (15,780 acres / ~63.9 km², 118 villages, PKR 26B 2003 package), April 2026 FAO-cited Sudhnoti deforestation reporting, March 17, 2026 Dawn reporting on retrospective withdrawal of March 22, 2024 mining/herbal restrictions, and March 22, 2026 The News International reporting on springs and Mirpur water commitments.',
    scientificNote:
      'Strictly enforces three core scientific guardrails: (1) 280 m³/s is labeled as an engineering diversion capacity, not continuous measured river flow; (2) >84.6% (650 m³/s to <100 m³/s) is labeled as a World Bank cumulative-development scenario projection, never a verified present-day river measurement; and (3) 15,780 acres, 118 villages, and PKR 26B are explicitly scoped to the Mangla Dam Raising Project rather than cumulative 1960s-plus-raising totals. Fuelwood–electricity linkages are framed as empirical hypotheses requiring measurement rather than assumption.',
    ethicsAndVisualNote:
      'Filed strictly under "Himalayan Dispatch Research Desk | Muzaffarabad Coverage" with Central Editorial Board oversight and zero personal Dr. Fayaz Ahmad Khan byline; explicitly discloses that no regional correspondent or local Muzaffarabad office is implied; uses only governed KEW illustrative plates without external OpenAI/Panos/favicon hotlinks.',
    adminHoldNote:
      'Staged on localhost at Stage 08 awaiting Founding Administrator review and approval.',
  }),
  editorialMetadataTable: [
    {
      attribute: 'Dispatch Identity',
      assignment:
        'Flagship Azad Jammu & Kashmir Investigation (Placed immediately after The Price of Power / Gilgit-Baltistan and before The Western Himalayas Are Sitting on a Time Bomb)',
    },
    {
      attribute: 'Byline & Bureau Status',
      assignment:
        'Himalayan Dispatch Research Desk | Muzaffarabad Coverage (Muzaffarabad Bureau in establishment; no local physical office implied; no personal Dr. Fayaz Ahmad Khan byline)',
    },
    {
      attribute: 'Editorial Oversight',
      assignment: 'Himalayan Dispatch Central Editorial Board',
    },
    {
      attribute: 'Regional Coverage',
      assignment:
        'All 10 districts of Azad Jammu & Kashmir: Muzaffarabad, Neelum, Hattian Bala, Bagh, Haveli, Poonch, Sudhnoti, Kotli, Mirpur, and Bhimber',
    },
    {
      attribute: 'Companion Monograph',
      assignment:
        'Monograph 17 — 12 Thematic Volumes · 72 Proposed Chapters · 6 Ranked Regional Investigative Priorities',
    },
    {
      attribute: 'Permanent KEW Observatory',
      assignment:
        'AJ&K River Diversion, Reservoir Displacement & Resource Justice Observatory (/earth-human-impact/ajk-river-justice-observatory)',
    },
  ],
  chapters: [
    {
      numberRoman: 'I',
      title: 'The City That Lost Its River: Muzaffarabad After the Tunnel',
      subtitle:
        'When a capital built at the confluence of two great Himalayan rivers confronts shrunken channels, concentrated sewage, and a PKR 1.6 billion bill to replace what nature once provided',
      paragraphs: [
        'For centuries, Muzaffarabad’s geography was defined by the meeting of two powerful mountain waters at Domel: the cold, turquoise surge of the Neelum descending out of snowbound alpine gorges to join the Jhelum on its southward bend toward the plains. Residents drew water from riverside springs and intakes, summer breezes cooled across turbulent rapids, and high seasonal discharge diluted the waste of a growing valley capital. Then, in 2018, the 969-megawatt Neelum–Jhelum Hydropower Project began commercial operation—intercepting the Neelum at Nauseri, roughly 41 kilometres upstream of Muzaffarabad, and routing its water beneath the mountains through deep tunnels to emerge directly into the Jhelum well downstream of the city.',
        'Project engineering specifications report a design water-diversion capacity of 280 cubic metres per second—an engineering diversion figure rather than a continuous measured river discharge, yet large enough during low- and medium-flow months to transform the river channel passing through Muzaffarabad from a roaring Himalayan artery into shallow threads winding between exposed, sun-baked cobble bars. The environmental contradiction was immediate and stark: a city founded at the confluence of two major Himalayan rivers began struggling for clean water.',
        'Official and multilateral records soon registered what townspeople could see and smell from their riverbanks. In 2019, the Azad Jammu & Kashmir government’s own Sustainable Development Report acknowledged reduced river flow, drinking-water scarcity, falling riverside water tables, and mounting concerns over untreated sewage concentration following upstream hydropower diversion. Separately, a World Bank cumulative-impact assessment projected that under assessed cumulative hydropower diversions—combining upstream Kishanganga and Neelum–Jhelum infrastructure with further planned schemes—flows in the Neelum and Jhelum near Muzaffarabad could drop from a baseline scenario of approximately 650 m³/s to below 100 m³/s, a projected reduction exceeding 84.6 percent. While that World Bank projection models a cumulative-development scenario and must never be misquoted as a verified present-day river gauge reading, its physical warning is unmistakable: strip a river of more than four-fifths of its flow without first building comprehensive sewage treatment, and the remaining channel loses its natural capacity to dilute urban waste.',
        'In 2025, authorities commissioned a municipal water supply scheme costing more than PKR 1.6 billion to improve drinking-water availability for an estimated 450,000 people in Muzaffarabad. That expenditure crystallizes one of the sharpest questions in modern environmental economics: how much public money becomes necessary to artificially replace natural ecosystem services after those services have been disrupted by revenue-generating infrastructure?',
      ],
      bulletList: [
        ...MUZAFFARABAD_DIVERSION_METRICS.map(
          (m) => `${m.label}: ${m.value} — ${m.note}`
        ),
        `${WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.badge}: ${WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.baselineScenario} → ${WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.reducedScenario} (${WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.percentageReduction}). ${WORLD_BANK_CUMULATIVE_FLOW_SCENARIO.caveat}`,
      ],
      pullQuote: {
        quote: AJK_RIVERS_MONOGRAPH_SPEC.replacementCostQuestion,
        attribution:
          'Himalayan Dispatch Research Desk | Muzaffarabad Coverage',
        context: 'Muzaffarabad Confluence & Replacement-Cost Inquiry',
      },
    },
    {
      numberRoman: 'II',
      title: 'Ten Scientific Questions Beneath Muzaffarabad’s Exposed Riverbed',
      subtitle:
        'From continuous discharge hydrographs and hyporheic aquifer exchange to snow-trout survival, valley microclimate, and transboundary e-flow compliance',
      paragraphs: [
        'Moving Muzaffarabad’s river crisis from public grievance to indisputable accountability requires ten coordinated scientific investigations. First is empirical hydrology: publishing continuous, audited upstream discharge at Nauseri alongside downstream gauge series through Muzaffarabad so citizens do not have to rely on unverified claims or modelled projections alone. Second is water-quality stoichiometry: measuring biochemical oxygen demand, fecal coliforms, and pharmaceutical/nutrient concentrations where municipal drains meet diminished Neelum flows.',
        'Third and fourth concern aquatic ecology and hydrogeology: quantifying how diversion dams and low-flow reaches fragment cold-water Schizothorax snow-trout and Mahseer habitats, and measuring how lowered river stage severs hyporheic recharge into riverside aquifers and springs. Fifth and sixth address urban climatology and public health—testing Instrumentally whether exposed gravel beds and lost evaporative cooling have raised summer valley-floor temperatures in Muzaffarabad while tracking waterborne illness and household water-treatment costs.',
        'Seventh through tenth confront political economy and transboundary law: comparing local electricity allocation, winter load-shedding, and consumer tariffs inside AJ&K against exported megawatts; calculating the full replacement cost of lost river services; assessing cumulative transboundary flow alterations from both Kishanganga upstream and Neelum–Jhelum at Nauseri; and auditing whether legally promised minimum environmental flows are actually released, measured, and enforced.',
      ],
      bulletList: MUZAFFARABAD_SCIENTIFIC_DOMAINS_10.map(
        (d) => `${d.domain}: ${d.investigation}`
      ),
      plate: {
        imageUrl: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
        caption:
          'Western Himalayan river-valley water storage and alluvial margin context—illustrating how surface flows, groundwater recharge, and downstream water security form one indivisible hydrological system (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
        credit: 'Kashmir EcoWatch Visual Archive',
      },
    },
    {
      numberRoman: 'III',
      title: 'The Villages Beneath the Water: Six Decades of Mangla Submergence & Unfinished Justice',
      subtitle:
        'From the drowned heritage of Old Mirpur in the 1960s to May 2026 federal warnings over the 15,780-acre, 118-village Mangla Dam Raising Project',
      paragraphs: [
        'Follow the Jhelum downstream from Muzaffarabad’s constricted gorges into the southern foothills of Mirpur, and the opposite face of river transformation appears: not a valley stripped of its river, but ancestral valleys drowned beneath a vast national reservoir. Completed in the 1960s and raised four decades later, Mangla Dam submerged historic Old Mirpur, fertile alluvial farmland, wells, shrines, and graveyards whose weathered masonry still emerges like stone ghosts whenever reservoir levels drop—catalyzing waves of displacement and transnational migration that reshaped Mirpur’s social fabric forever.',
        'Crucially, displacement around Mangla is not merely twentieth-century history. Under the Mangla Dam Raising Project agreed in the early 2000s to add flood-storage and power capacity, fresh inundation and resettlement commitments were undertaken. In May 2026, Business Recorder reported that Pakistan’s Ministry of Defence had raised formal concerns with federal authorities over outstanding compensation linked to the Mangla Dam Raising Project—identifying 15,780 acres (approximately 63.9 km²) of land inundated by the dam-raising programme, 118 villages affected by displacement, an agreed 2003 compensation package of PKR 26 billion, and unresolved compensation issues persisting in 2026.',
        'Methodological precision is essential here: those 15,780 acres, 118 villages, and PKR 26 billion represent the later dam-raising programme alone, not the far larger cumulative submergence and human displacement of the original 1960s Mangla Dam. Meanwhile, the AJ&K government’s 2024–25 official financial statements record Mangla water-usage charges—offering an auditable public starting point to examine how regional financial entitlements, net hydel profit parity, and household electricity tariffs compare with the enduring sacrifices borne by reservoir-rim families. A reservoir may serve successive generations of distant electricity and irrigation consumers while the consequences of displacement remain woven into the daily lives of successive generations of affected families.',
      ],
      bulletList: MANGLA_RAISING_METRICS_2026.metrics.map(
        (m) => `${m.label}: ${m.value} (${m.sub}) — Mangla Dam Raising Project scope.`
      ),
      pullQuote: {
        quote: AJK_RIVERS_MONOGRAPH_SPEC.manglaGenerationalAxiom,
        attribution:
          'Himalayan Dispatch Research Desk | Muzaffarabad Coverage',
        context: 'Mangla Submergence & Fiscal Justice Dossier (1967–2026)',
      },
    },
    {
      numberRoman: 'IV',
      title: 'The Water Crisis in the Land of Rivers & the Forests Losing Their Mountains',
      subtitle:
        'Mirpur’s unfulfilled 2003 drinking-water commitments, drying chashma springs, and April 2026 FAO warnings on Sudhnoti watershed degradation',
      paragraphs: [
        'Nothing illustrates Azad Jammu & Kashmir’s environmental paradox more poignantly than communities living beside giant reservoirs or roaring tributaries while queueing for safe drinking water. On March 22, 2026, an investigation in The News International documented how shifting precipitation patterns, rising temperatures, upslope deforestation, unregulated urban expansion, and diminished natural recharge are straining springs and groundwater across AJ&K—while scrutinizing long-standing commitments under the 2003 Mangla Dam agreement to supply reliable drinking water to Mirpur and adjoining settlements. Possessing major Himalayan rivers does not automatically guarantee safe, affordable household water when extraction infrastructure looks outward while local spring-sheds deteriorate.',
        'Upslope, the forested watersheds that regulate those very springs face intensifying pressure. In April 2026, reporting citing the Food and Agriculture Organization (FAO) highlighted acute environmental stress in Sudhnoti district—where forest loss driven by urban expansion and domestic fuelwood demand is accelerating soil erosion and local water scarcity. Extending that inquiry across Neelum Valley, Sudhnoti, Bagh, Haveli, Poonch, Hattian Bala, and Muzaffarabad requires ten disciplined scientific protocols: multi-decadal Landsat canopy reconstruction from the 1970s onward, commercial timber-permit audits, habitat fragmentation and wildlife surveys, satellite fire tracking, spring-discharge measurements, slope-stability coupling, and independent survival audits of government afforestation drives.',
        'Above all, our research protocol insists on measuring—rather than casually assuming—whether recurring winter electricity outages and unaffordable power or gas tariffs in hydropower-hosting mountain districts are forcing families back onto forest firewood.',
      ],
      bulletList: AJK_FOREST_EVIDENCE_PROTOCOLS_10.slice(0, 6).map(
        (f) => `${f.investigation}: ${f.requiredEvidence}`
      ),
      plate: {
        imageUrl: '/images/environmental-pil/forest-moratorium-river-basin.jpg',
        caption:
          'Temperate Western Himalayan conifer watershed and mountain river corridor—illustrating the ecological coupling between intact upper-slope forest cover, perennial spring recharge, and downstream sediment stability (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
        credit: 'Kashmir EcoWatch Visual Archive',
      },
    },
    {
      numberRoman: 'V',
      title: 'The Mountains Returned to the Miners & Twenty-One Years After the 2005 Earthquake',
      subtitle:
        'Auditing the March 2026 retrospective reversal of mining and forest-herbal restrictions—and asking whether Muzaffarabad rebuilt resilience or merely rebuilt concrete',
      paragraphs: [
        'Alongside hydropower and forest stress, a decisive governance shift in early 2026 demands transparent documentary scrutiny. On March 17, 2026, Dawn reported that the AJ&K government had withdrawn—with retrospective effect—an earlier notification issued on March 22, 2024 that had restricted certain mining leases, quarry permits, and commercial contracts, including forest-based medicinal and herbal resource extraction. Complementing our separate Gilgit-Baltistan mineral investigation while addressing AJ&K’s distinct legal and ecological landscape, our inquiry asks eight concrete evidentiary questions: why the March 2024 safeguards were enacted, why they were retroactively rescinded two years later, which concessionaires benefited, where lease polygons overlap demarcated forests or protected habitats, whether local communities were consulted, what environmental clearances exist, and how much revenue remains within affected watersheds.',
        'Every river diversion, quarry cut, and hillside apartment block in AJ&K also sits atop one of Earth’s most active seismic syntaxes. Twenty-one years after the October 8, 2005 Mw 7.6 earthquake devastated Muzaffarabad, Bagh, and Rawalakot, historical remembrance must give way to an engineering audit of the 2005–2026 reconstruction era. Complementing The Western Himalayas Are Sitting on a Time Bomb (Dispatch 26), this pillar asks whether schools, hospitals, bridges, and multi-storey buildings erected across Muzaffarabad’s fault-zone terraces and steep riverbanks over the past two decades are demonstrably earthquake-resistant—or whether reconstruction expenditure reproduced structural exposure in taller concrete.',
      ],
      bulletList: AJK_MINING_CONCESSION_QUESTIONS_8.map(
        (q) => `Q${q.no} (${q.question}) → Evidence: ${q.evidenceRequired}`
      ),
    },
    {
      numberRoman: 'VI',
      title: 'Six Editorial Priorities, Ten Districts & Interactive Accountability Workbench',
      subtitle:
        'Explore the Muzaffarabad diversion ledger, Mangla submergence & water-charge accounts, 10-district risk profiles, and Monograph 17’s 12-volume blueprint',
      paragraphs: [
        'To ensure balanced coverage across all ten districts of Azad Jammu & Kashmir—Muzaffarabad, Neelum, Hattian Bala, Bagh, Haveli, Poonch, Sudhnoti, Kotli, Mirpur, and Bhimber—our Research Desk structures six ranked editorial priorities into Companion Monograph 17 (12 Thematic Volumes · 72 Proposed Chapters) and connects them permanently with Kashmir EcoWatch’s AJ&K River Diversion, Reservoir Displacement & Resource Justice Observatory (/earth-human-impact/ajk-river-justice-observatory).',
        'In strict adherence to Himalayan Dispatch’s charter, these six investigative pillars represent structured documentary baselines rather than a verified violation map: current continuous river discharge, cumulative 1960s-plus-raising reservoir totals, household compensation arrears, multi-decadal forest-loss rates, and active mining polygons remain open to primary verification and formal institutional Right of Reply from WAPDA, federal ministries, AJK-EPA, the Forest and Mines departments, and municipal authorities. Use the interactive workbench below to examine each dataset and district dossier.',
      ],
      bulletList: AJK_EDITORIAL_PRIORITIES_6.map(
        (p) => `Priority ${p.priority} — ${p.title}: ${p.significance} (${p.focus})`
      ),
    },
    {
      numberRoman: 'EPILOGUE',
      title: 'Whose Rivers Are They?',
      subtitle:
        'Why national low-carbon energy and downstream irrigation can never excuse leaving mountain communities short of water, electricity, and justice',
      paragraphs: [
        'Stand at Domel in Muzaffarabad where the Neelum once thundered into the Jhelum, or stand along the receding waterline of Mangla where the wells of Old Mirpur briefly resurface to the sky, and one truth links both ends of Azad Jammu & Kashmir. Across sixty years, the rivers of these valleys have been engineered with extraordinary technical ambition to power grids and irrigate plains far beyond the mountains.',
        'Generating electricity and storing water are legitimate national goals. Yet infrastructure loses its moral and scientific legitimacy when the city at the confluence must spend over PKR 1.6 billion to secure drinking water after its river is tunnelled away, when sewage concentrates in shrunken channels, when families displaced by reservoir raising still await settled accounts twenty-three years after a 2003 agreement, and when mountain households beside major powerhouses endure blackouts and drying springs.',
        'Until environmental flows are telemetered and legally inviolable, until municipal sanitation and safe local drinking water precede river diversion, and until legacy displacement and watershed royalties are audited in full public view, one question will continue echoing from Neelum to Mirpur: when a region’s rivers are valuable enough to sustain economies beyond its mountains, why must the communities living beside those rivers struggle to secure their own water, electricity and environmental future?',
      ],
      pullQuote: {
        quote: AJK_RIVERS_MONOGRAPH_SPEC.overarchingQuestion,
        attribution:
          'Himalayan Dispatch Research Desk | Muzaffarabad Coverage',
        context: 'Closing Inquiry · Azad Jammu & Kashmir Flagship Investigation',
      },
    },
  ],
  documentarySources: [
    {
      label:
        'KEW AJ&K River Diversion, Reservoir Displacement & Resource Justice Observatory',
      url: '/earth-human-impact/ajk-river-justice-observatory',
      relevance:
        'Permanent 10-registry Kashmir EcoWatch observatory tracking Muzaffarabad e-flows, Mangla fiscal accounts, 10-district watersheds, and concession transparency.',
    },
    {
      label:
        'Monograph 17 Architecture — The Rivers That No Longer Belong to Their Valleys (12 Volumes · 72 Chapters)',
      url: '/himalayan-dispatch/issues/monograph-17-the-rivers-that-no-longer-belong-to-their-valleys',
      relevance:
        'Complete 12-volume, 72-chapter research blueprint across all ten districts of Azad Jammu & Kashmir.',
    },
    {
      label:
        'World Bank — Neelum–Jhelum / Jhelum–Poonch Cumulative Hydropower Impact Assessment',
      url: 'https://documents.worldbank.org/',
      relevance:
        'Projected cumulative-development flow scenario near Muzaffarabad (~650 m³/s baseline to <100 m³/s; >84.6% projected reduction under assessed scenario).',
    },
    {
      label:
        'Planning & Development Department, AJ&K (2019 Sustainable Development Report) & Accountant General AJ&K (2024–25 Financial Statements)',
      url: 'https://pndajk.gov.pk/',
      relevance:
        'Official acknowledgments of post-diversion river-flow decline, drinking-water scarcity, and sewage concerns in Muzaffarabad, plus Mangla water-usage charge accounts.',
    },
    {
      label:
        'Dawn (2025–April 2026), Business Recorder (May 2026) & The News International (March 2026)',
      url: 'https://www.dawn.com/',
      relevance:
        'Documentary reporting on Muzaffarabad’s >PKR 1.6B water scheme, Ministry of Defence Mangla Raising compensation concerns (15,780 acres; 118 villages; PKR 26B), Sudhnoti FAO forest warnings, March 2026 retrospective mining notification withdrawal, and Mirpur drinking-water pledges.',
    },
  ],
  relatedKewModule: {
    label:
      'AJ&K River Diversion, Reservoir Displacement & Resource Justice Observatory',
    href: '/earth-human-impact/ajk-river-justice-observatory',
    scientificContext:
      'Explore Kashmir EcoWatch’s permanent 10-registry observatory auditing Neelum–Jhelum environmental flows, replacement waterworks costs, Mangla raising compensation & water-usage charges, spring depletion, forest-energy coupling, and mining concessions across all 10 AJ&K districts.',
  },
  corrections: [],
};
