// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — DEDICATED LADAKH SCIENTIFIC ISSUE & 45-CHAPTER REPOSITORY
// "LADAKH'S ECOLOGICAL FRONTIERS: THE FRAGILE BALANCE BETWEEN CLIMATE, WATER,
//  DEVELOPMENT AND HIGH-ALTITUDE SURVIVAL"
//
// Comprises Three Interlocking Flagship Scientific Investigations:
//   01. When the Glaciers Stop Giving (15 Chapters · 7 Proposed Experiments)
//   02. How Many People Can a Cold Desert Sustain? (15 Chapters · 7 Proposed Experiments)
//   03. The Desert Is Not Empty (15 Chapters · 7 Proposed Experiments)
// + Companion KEW Ladakh Cold-Desert Cryosphere, Carrying Capacity & Ecology Observatory
// ─────────────────────────────────────────────────────────────────────────────

export interface LadakhExperimentProtocol {
  code: string;
  title: string;
  methodology: string;
}

export interface LadakhInvestigationPillar {
  investigationNumber: '01' | '02' | '03';
  id: string;
  dispatchSlug: string;
  kicker: string;
  title: string;
  subtitle: string;
  geographicalCoverage: string;
  empiricalAnchorSummary: string;
  centralHypothesis: string;
  proposedExperiments: LadakhExperimentProtocol[];
}

export interface LadakhChapterProtocol {
  globalChapterNumber: string; // '01' .. '45'
  investigationNumber: '01' | '02' | '03';
  investigationChapterNumber: string; // '01' .. '15'
  investigationTitle: string;
  investigationDispatchSlug: string;
  slug: string;
  title: string;
  subtitle: string;
  geographicalFocus: string;
  primaryQuestion: string;
  centralHypothesisLink: string;
  analyticalScope: string[];
  linkedExperiments: string[];
  primaryDocumentarySources: string[];
  unresolvedQuestions: string[];
  rightOfResponseEntities: string[];
  estimatedReadingMinutes: number;
}

export const LADAKH_ECOLOGICAL_FRONTIERS_SPEC = {
  issueSlug: 'ladakhs-ecological-frontiers',
  editionId: 'ed-issue-ladakh-ecological-frontiers',
  volumeLabel: 'SPECIAL REGIONAL SCIENTIFIC ISSUE · LADAKH',
  issueNumberLabel: 'DEDICATED SCIENTIFIC ISSUE · COLD-DESERT ECOLOGY',
  kicker:
    'TRANS-HIMALAYAN CRYOSPHERE · COLD-DESERT HYDROLOGY · ECOLOGICAL CARRYING CAPACITY · HIGH-ALTITUDE BIODIVERSITY',
  statusBadge:
    'Dedicated Ladakh Scientific Issue · 3 Flagship Investigations · 45 Chapters · 21 Proposed Scientific Experiments',
  title: "Ladakh's Ecological Frontiers",
  subtitle:
    'The Fragile Balance Between Climate, Water, Development and High-Altitude Survival',
  extendedSubtitle:
    'Why Ladakh’s cold-desert rain-shadow ecology, cryospheric water dependence, extreme seasonal visitor pressure, permafrost microbiomes, and high-altitude Ramsar wetlands demand a fundamentally different scientific and governance framework.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Ladakh Cryosphere, Cold-Desert Ecology, Carrying Capacity and Geospatial Intelligence Desk',
  geographicalScope:
    'Zanskar · Suru · Nubra · Leh · Kargil · Drass · Changthang · Pangong Tso · Tso Moriri · Tso Kar · Hemis · Karakoram · Hanle',
  kewObservatoryPath: '/earth-human-impact/ladakh-cold-desert-observatory',
  datasetApiPath: '/api/himalayan-dispatch/datasets/ladakh-ecological-frontiers-framework',
  heroStats: [
    { value: '3', label: 'Flagship scientific investigations' },
    { value: '45', label: 'Research chapters (15 × 3)' },
    { value: '21', label: 'Proposed scientific experiments' },
    { value: '0.21–0.37', label: 'Glacier loss (m w.e./yr · 2026)' },
    { value: '65', label: 'High-concern bird species (2026)' },
    { value: '12', label: 'Cold-desert observatory modules' },
  ],
} as const;

export const LADAKH_INVESTIGATIONS_3: LadakhInvestigationPillar[] = [
  {
    "investigationNumber": "01",
    "id": "inv-01-glaciers-stop-giving",
    "dispatchSlug": "when-the-glaciers-stop-giving",
    "kicker": "LADAKH SCIENTIFIC INVESTIGATION I · CRYOSPHERE, PERMAFROST & WATER SECURITY",
    "title": "When the Glaciers Stop Giving",
    "subtitle": "Cryospheric Retreat, Changing Snowmelt Dynamics, Permafrost Degradation and the Future of Ladakh's Water Security",
    "geographicalCoverage": "Zanskar, Suru, Nubra, Leh, Kargil, Drass and Changthang",
    "empiricalAnchorSummary": "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
    "centralHypothesis": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "proposedExperiments": [
      {
        "code": "EXP-01.1",
        "title": "Glacier retreat mapping, 1985–2026",
        "methodology": "Multi-decadal Landsat TM/ETM+/OLI and Sentinel-2 terminus and area-altitude delineation across Zanskar, Suru, Leh Range, Nubra, and Drass sub-basins using matched end-of-ablation scenes."
      },
      {
        "code": "EXP-01.2",
        "title": "Historical snowline elevation reconstruction",
        "methodology": "Equilibrium-line altitude (ELA) and transient snowline reconstruction combining optical reflectance series with 30 m digital elevation models."
      },
      {
        "code": "EXP-01.3",
        "title": "Glacier mass balance assessment",
        "methodology": "Geodetic DEM differencing (0.21–0.37 m w.e./yr benchmark validation) separating small Leh-range niche glaciers (<2 km²) from larger Karakoram trunk glaciers."
      },
      {
        "code": "EXP-01.4",
        "title": "Permafrost vulnerability modelling",
        "methodology": "Ground-surface temperature lapse-rate, solar-insolation, and InSAR ground-subsidence modelling across high passes (Khardung La, Chang La, Tanglang La) and Changthang basins."
      },
      {
        "code": "EXP-01.5",
        "title": "Glacial lake expansion and hazard mapping",
        "methodology": "Automated NDWI/SAR moraine-dammed lake inventory, freeboard geometry screening, and downstream runout routing across Zanskar, Suru, and Shyok valleys."
      },
      {
        "code": "EXP-01.6",
        "title": "Seasonal meltwater availability forecasting",
        "methodology": "Degree-day and energy-balance hydrograph coupling testing April–May spring sowing deficits versus July–August peak melt shifts."
      },
      {
        "code": "EXP-01.7",
        "title": "Village-level water security assessment",
        "methodology": "Field discharge gauging of traditional yura/kuhl headworks, alluvial springs, and churpon rotational irrigation schedules across 30 stratified oasis settlements."
      }
    ]
  },
  {
    "investigationNumber": "02",
    "id": "inv-02-cold-desert-carrying-capacity",
    "dispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "kicker": "LADAKH SCIENTIFIC INVESTIGATION II · TOURISM, URBANIZATION & CARRYING CAPACITY",
    "title": "How Many People Can a Cold Desert Sustain?",
    "subtitle": "Tourism, Urbanization, Infrastructure Expansion and the Ecological Carrying Capacity of Ladakh",
    "geographicalCoverage": "Leh, Kargil, Nubra, Pangong Tso, Tso Moriri, Hanle and Zanskar",
    "empiricalAnchorSummary": "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
    "centralHypothesis": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "proposedExperiments": [
      {
        "code": "EXP-02.1",
        "title": "Historical built-up area expansion mapping",
        "methodology": "High-resolution impervious-surface and agricultural-oasis conversion mapping across Leh, Kargil, Diskit/Hunder, Padum, and lakeshore corridors (1990–2026)."
      },
      {
        "code": "EXP-02.2",
        "title": "Tourist-to-resident seasonal pressure index",
        "methodology": "Monthly visitor arrival, hotel-bed occupancy, and camp-density ratios normalized against year-round resident populations across seven destination clusters."
      },
      {
        "code": "EXP-02.3",
        "title": "Regional water demand and availability modelling",
        "methodology": "Comparative audit of commercial borewell extraction and flush-hotel per-capita demand against traditional dry-composting (chakdon) household water budgets and aquifer recharge."
      },
      {
        "code": "EXP-02.4",
        "title": "Solid waste generation projections",
        "methodology": "Waste-stream characterization, landfill leachate screening, and pre/post-June 2026 single-use plastic restriction compliance audits."
      },
      {
        "code": "EXP-02.5",
        "title": "Satellite-based infrastructure footprint assessment",
        "methodology": "Spatial footprint quantification of highway widening, pass excavations, commercial camps, and utility-scale solar/transmission corridors."
      },
      {
        "code": "EXP-02.6",
        "title": "Tourism carbon footprint modelling",
        "methodology": "Aviation, high-altitude diesel vehicular convoys, diesel backup generators, and space-heating black-carbon/CO2 emissions inventory."
      },
      {
        "code": "EXP-02.7",
        "title": "Destination-specific ecological carrying capacity assessment",
        "methodology": "Limiting-factor carrying capacity thresholds bounded by dry-season freshwater yield, cold-climate wastewater treatment performance, and habitat disturbance buffers."
      }
    ]
  },
  {
    "investigationNumber": "03",
    "id": "inv-03-the-desert-is-not-empty",
    "dispatchSlug": "the-desert-is-not-empty",
    "kicker": "LADAKH SCIENTIFIC INVESTIGATION III · WETLANDS, WILDLIFE CORRIDORS & RANGELANDS",
    "title": "The Desert Is Not Empty",
    "subtitle": "High-Altitude Wetlands, Wildlife Corridors, Alpine Rangelands and the Ecological Integrity of Ladakh's Cold Desert",
    "geographicalCoverage": "Changthang, Hemis, Karakoram, Tso Kar, Tso Moriri, Pangong Tso and Hanle",
    "empiricalAnchorSummary": "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
    "centralHypothesis": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "proposedExperiments": [
      {
        "code": "EXP-03.1",
        "title": "Historical wetland extent change detection",
        "methodology": "Multi-decadal shoreline, emergent sedge-marsh, and hydroperiod change detection across Tso Moriri, Tso Kar, Pangong Tso, and Hanle marshes."
      },
      {
        "code": "EXP-03.2",
        "title": "Alpine rangeland productivity assessment",
        "methodology": "Growing-season NDVI/EVI and fractional-cover trend analysis calibrated with clipped above-ground biomass plots across Changthang pastures."
      },
      {
        "code": "EXP-03.3",
        "title": "Wildlife habitat suitability modelling",
        "methodology": "Ensemble species-distribution and occupancy modelling for snow leopard, Kiang, Tibetan argali, Tibetan gazelle, Black-necked crane, and Pallas’s cat."
      },
      {
        "code": "EXP-03.4",
        "title": "Landscape connectivity and fragmentation analysis",
        "methodology": "Circuit-theory and least-cost corridor mapping testing barrier effects of fenced highways, transmission lines, and perimeter walls."
      },
      {
        "code": "EXP-03.5",
        "title": "Grazing pressure versus vegetation regeneration assessment",
        "methodology": "Paired rotational Changpa grazing vs. exclosure plots measuring sedge recovery, winter forage deficits, and Pashmina pastoral resilience."
      },
      {
        "code": "EXP-03.6",
        "title": "Lake water quality and salinity trend analysis",
        "methodology": "Electrical conductivity, ionic composition, dissolved oxygen, and littoral nutrient monitoring across endorheic cold-desert lakes."
      },
      {
        "code": "EXP-03.7",
        "title": "Infrastructure–biodiversity conflict mapping",
        "methodology": "Spatial overlay of the 65 high-concern avian habitats, carnivore corridors, and permafrost soil zones against proposed linear and energy projects."
      }
    ]
  }
];

export const LADAKH_CHAPTERS_45: LadakhChapterProtocol[] = [
  {
    "globalChapterNumber": "01",
    "investigationNumber": "01",
    "investigationChapterNumber": "01",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-01-ladakh-s-cryospheric-systems",
    "title": "Ladakh's cryospheric systems",
    "subtitle": "Typology of Trans-Himalayan cirque, valley, debris-covered, and rock glaciers across the Indus, Shyok, Zanskar, and Suru basins",
    "geographicalFocus": "Zanskar · Suru · Nubra · Leh · Kargil · Drass · Changthang",
    "primaryQuestion": "How do Ladakh’s small, high-altitude cold-arid glaciers differ physically and hydrologically from monsoon-influenced Greater Himalayan icefields?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Typology of Trans-Himalayan cirque, valley, debris-covered, and rock glaciers across the Indus, Shyok, Zanskar, and Suru basins",
      "Evaluates cold-desert biophysical constraints across Zanskar · Suru · Nubra · Leh · Kargil · Drass · Changthang without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Zanskar · Suru · Nubra · Leh · Kargil · Drass · Changthang remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "02",
    "investigationNumber": "01",
    "investigationChapterNumber": "02",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-02-historical-climatology",
    "title": "Historical climatology",
    "subtitle": "Instrumental station records, rain-shadow orography, and the ~0.02°C/year warming synthesis across elevation bands",
    "geographicalFocus": "Leh · Kargil · Drass · Changthang",
    "primaryQuestion": "What do homogenized station records and reanalysis series reveal about elevation-dependent warming and diurnal temperature ranges in Ladakh?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Instrumental station records, rain-shadow orography, and the ~0.02°C/year warming synthesis across elevation bands",
      "Evaluates cold-desert biophysical constraints across Leh · Kargil · Drass · Changthang without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Kargil · Drass · Changthang remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "03",
    "investigationNumber": "01",
    "investigationChapterNumber": "03",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-03-glacier-retreat-and-mass-balance",
    "title": "Glacier retreat and mass balance",
    "subtitle": "Evaluating the 0.21–0.37 m w.e./year annual mass-loss synthesis and small-glacier vulnerability above village oases",
    "geographicalFocus": "Leh Range · Zanskar · Suru · Drass",
    "primaryQuestion": "Why are small (<2 km²) Leh-range and Zanskar cirque glaciers losing mass disproportionately faster than trunk icestreams?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Evaluating the 0.21–0.37 m w.e./year annual mass-loss synthesis and small-glacier vulnerability above village oases",
      "Evaluates cold-desert biophysical constraints across Leh Range · Zanskar · Suru · Drass without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh Range · Zanskar · Suru · Drass remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "04",
    "investigationNumber": "01",
    "investigationChapterNumber": "04",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-04-karakoram-glacier-variability",
    "title": "Karakoram glacier variability",
    "subtitle": "Surge dynamics, mass-balance heterogeneity, and Shyok–Nubra tributary hazards in the Eastern Karakoram",
    "geographicalFocus": "Nubra · Siachen · Shyok · Eastern Karakoram",
    "primaryQuestion": "How does Karakoram glacier surge behavior complicate downstream bridge, road, and river-flow planning in Nubra and Shyok?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Surge dynamics, mass-balance heterogeneity, and Shyok–Nubra tributary hazards in the Eastern Karakoram",
      "Evaluates cold-desert biophysical constraints across Nubra · Siachen · Shyok · Eastern Karakoram without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Nubra · Siachen · Shyok · Eastern Karakoram remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "05",
    "investigationNumber": "01",
    "investigationChapterNumber": "05",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-05-seasonal-snow-cover-dynamics",
    "title": "Seasonal snow cover dynamics",
    "subtitle": "Winter snow-water equivalent (SWE), snow-drought frequency, and earlier spring snowline recession",
    "geographicalFocus": "Drass · Kargil · Zanskar · Changthang",
    "primaryQuestion": "How severely is earlier spring snowpack disappearance reducing April–May soil moisture and initial stream baseflow?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Winter snow-water equivalent (SWE), snow-drought frequency, and earlier spring snowline recession",
      "Evaluates cold-desert biophysical constraints across Drass · Kargil · Zanskar · Changthang without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Drass · Kargil · Zanskar · Changthang remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "06",
    "investigationNumber": "01",
    "investigationChapterNumber": "06",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-06-western-disturbances",
    "title": "Western Disturbances",
    "subtitle": "Synoptic shifts in winter-spring baroclinic troughs, rain-on-snow thresholds, and unseasonal summer convective cloudbursts",
    "geographicalFocus": "Trans-Himalayan Ladakh",
    "primaryQuestion": "Are changing Western Disturbance tracks and rarer intense summer moisture intrusions altering Ladakh’s precipitation phase and erosion regime?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Synoptic shifts in winter-spring baroclinic troughs, rain-on-snow thresholds, and unseasonal summer convective cloudbursts",
      "Evaluates cold-desert biophysical constraints across Trans-Himalayan Ladakh without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Trans-Himalayan Ladakh remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "07",
    "investigationNumber": "01",
    "investigationChapterNumber": "07",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-07-permafrost-degradation",
    "title": "Permafrost degradation",
    "subtitle": "Active-layer deepening, thermokarst subsidence, rock-slope destabilization, and high-pass highway deformation",
    "geographicalFocus": "Changthang · Khardung La · Chang La · Tanglang La",
    "primaryQuestion": "Where is thawing mountain permafrost destabilizing high passes, military/civilian roads, and Changthang wet-meadow hydrology?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Active-layer deepening, thermokarst subsidence, rock-slope destabilization, and high-pass highway deformation",
      "Evaluates cold-desert biophysical constraints across Changthang · Khardung La · Chang La · Tanglang La without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Changthang · Khardung La · Chang La · Tanglang La remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "08",
    "investigationNumber": "01",
    "investigationChapterNumber": "08",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-08-glacial-lake-expansion",
    "title": "Glacial lake expansion",
    "subtitle": "Proglacial and supraglacial lake formation, area expansion rates, and moraine-dam stability across Zanskar and Suru",
    "geographicalFocus": "Zanskar · Suru · Nubra · Leh",
    "primaryQuestion": "Which newly formed or rapidly expanding moraine-dammed lakes sit directly upstream of inhabited oases, bridges, and micro-hydro channels?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Proglacial and supraglacial lake formation, area expansion rates, and moraine-dam stability across Zanskar and Suru",
      "Evaluates cold-desert biophysical constraints across Zanskar · Suru · Nubra · Leh without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Zanskar · Suru · Nubra · Leh remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "09",
    "investigationNumber": "01",
    "investigationChapterNumber": "09",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-09-glof-vulnerability",
    "title": "GLOF vulnerability",
    "subtitle": "Reconstructing past outburst events (e.g., Gya-Miru 2014) and auditing early-warning readiness for downstream villages",
    "geographicalFocus": "Leh · Zanskar · Suru · Shyok",
    "primaryQuestion": "Do vulnerable Ladakh valleys possess functioning telemetry, inundation maps, and last-mile community evacuation protocols for GLOFs?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Reconstructing past outburst events (e.g., Gya-Miru 2014) and auditing early-warning readiness for downstream villages",
      "Evaluates cold-desert biophysical constraints across Leh · Zanskar · Suru · Shyok without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Zanskar · Suru · Shyok remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "10",
    "investigationNumber": "01",
    "investigationChapterNumber": "10",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-10-groundwater-recharge",
    "title": "Groundwater recharge",
    "subtitle": "Alluvial fan hydrogeology, snowmelt-to-aquifer infiltration pathways, and winter baseflow storage",
    "geographicalFocus": "Leh Valley · Indus Alluvial Fans · Kargil",
    "primaryQuestion": "How much of Leh and Kargil’s pumped groundwater depends on seasonal snowmelt recharge that is now shifting in timing?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Alluvial fan hydrogeology, snowmelt-to-aquifer infiltration pathways, and winter baseflow storage",
      "Evaluates cold-desert biophysical constraints across Leh Valley · Indus Alluvial Fans · Kargil without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh Valley · Indus Alluvial Fans · Kargil remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "11",
    "investigationNumber": "01",
    "investigationChapterNumber": "11",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-11-springs-and-traditional-irrigation",
    "title": "Springs and traditional irrigation",
    "subtitle": "Gravity-fed yura/kuhl channels, zing storage ponds, and the churpon community water-governance institution",
    "geographicalFocus": "Leh · Kargil · Zanskar · Nubra · Sham Valley",
    "primaryQuestion": "Can centuries-old churpon rotational water-sharing rules adapt when snowmelt arrives weeks before or after critical barley sowing windows?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Gravity-fed yura/kuhl channels, zing storage ponds, and the churpon community water-governance institution",
      "Evaluates cold-desert biophysical constraints across Leh · Kargil · Zanskar · Nubra · Sham Valley without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Kargil · Zanskar · Nubra · Sham Valley remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "12",
    "investigationNumber": "01",
    "investigationChapterNumber": "12",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-12-artificial-glaciers-and-ice-stupas",
    "title": "Artificial glaciers and ice stupas",
    "subtitle": "Quantitative hydrological evaluation of Chewang Norphel cascades, ice stupas, and spring-grafting storage limits",
    "geographicalFocus": "Leh · Sham · Nubra · Zanskar",
    "primaryQuestion": "What exact fraction of village spring irrigation demand do artificial glaciers and ice stupas supply, and what are their climatic elevation limits?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Quantitative hydrological evaluation of Chewang Norphel cascades, ice stupas, and spring-grafting storage limits",
      "Evaluates cold-desert biophysical constraints across Leh · Sham · Nubra · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Sham · Nubra · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "13",
    "investigationNumber": "01",
    "investigationChapterNumber": "13",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-13-agricultural-water-security",
    "title": "Agricultural water security",
    "subtitle": "Barley, wheat, buckwheat, apricot, and sea-buckthorn water stress, oasis abandonment, and fallow terrace trends",
    "geographicalFocus": "Kargil · Suru · Leh · Nubra · Zanskar",
    "primaryQuestion": "Where has unreliable spring meltwater already triggered agricultural terrace abandonment and rural livelihood out-migration?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Barley, wheat, buckwheat, apricot, and sea-buckthorn water stress, oasis abandonment, and fallow terrace trends",
      "Evaluates cold-desert biophysical constraints across Kargil · Suru · Leh · Nubra · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Kargil · Suru · Leh · Nubra · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "14",
    "investigationNumber": "01",
    "investigationChapterNumber": "14",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-14-future-climate-scenarios",
    "title": "Future climate scenarios",
    "subtitle": "Downscaled CMIP6 SSP2-4.5 and SSP5-8.5 cryospheric-hydrological projections and \"peak water\" inflection timelines",
    "geographicalFocus": "All Ladakh Sub-Basins (2030–2100)",
    "primaryQuestion": "In which Ladakh sub-catchments has glacier \"peak water\" already passed versus those still experiencing transient melt amplification?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Downscaled CMIP6 SSP2-4.5 and SSP5-8.5 cryospheric-hydrological projections and \"peak water\" inflection timelines",
      "Evaluates cold-desert biophysical constraints across All Ladakh Sub-Basins (2030–2100) without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across All Ladakh Sub-Basins (2030–2100) remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "15",
    "investigationNumber": "01",
    "investigationChapterNumber": "15",
    "investigationTitle": "When the Glaciers Stop Giving",
    "investigationDispatchSlug": "when-the-glaciers-stop-giving",
    "slug": "inv-01-ch-15-long-term-water-security-modelling",
    "title": "Long-term water security modelling",
    "subtitle": "Integrated basin-to-village water budget reconciling cryospheric loss, ecosystem flows, agriculture, and urban demand",
    "geographicalFocus": "UT Ladakh (7 Sub-Regions)",
    "primaryQuestion": "What integrated water-budget governance is required so Ladakh’s oases survive the transition toward a diminished cryosphere?",
    "centralHypothesisLink": "Changes in the timing and volume of snow and glacier melt may undermine Ladakh's traditional water management systems, even before its glaciers disappear.",
    "analyticalScope": [
      "Integrated basin-to-village water budget reconciling cryospheric loss, ecosystem flows, agriculture, and urban demand",
      "Evaluates cold-desert biophysical constraints across UT Ladakh (7 Sub-Regions) without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-01.1: Glacier retreat mapping, 1985–2026",
      "EXP-01.2: Historical snowline elevation reconstruction",
      "EXP-01.3: Glacier mass balance assessment"
    ],
    "primaryDocumentarySources": [
      "A 2026 scientific synthesis reported regional warming of approximately 0.02°C annually, earlier snowmelt, and glacier mass losses ranging between 0.21 and 0.37 metres of water equivalent (m w.e.) annually.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across UT Ladakh (7 Sub-Regions) remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "16",
    "investigationNumber": "02",
    "investigationChapterNumber": "01",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-01-cold-desert-ecological-sensitivity",
    "title": "Cold-desert ecological sensitivity",
    "subtitle": "Low primary productivity, skeletal soils, short frost-free windows, and multi-decade disturbance recovery rates",
    "geographicalFocus": "Leh · Kargil · Nubra · Changthang · Zanskar",
    "primaryQuestion": "Why do physical disturbances—tire tracks, trenches, waste dumps, and borewells—persist for decades in a high-altitude cold desert?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Low primary productivity, skeletal soils, short frost-free windows, and multi-decade disturbance recovery rates",
      "Evaluates cold-desert biophysical constraints across Leh · Kargil · Nubra · Changthang · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Kargil · Nubra · Changthang · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "17",
    "investigationNumber": "02",
    "investigationChapterNumber": "02",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-02-historical-tourism-expansion",
    "title": "Historical tourism expansion",
    "subtitle": "From 1974 restricted opening (527 visitors) to >500,000+ annual arrivals and the 2026 parliamentary committee warnings",
    "geographicalFocus": "Leh · Nubra · Pangong · Tso Moriri · Zanskar",
    "primaryQuestion": "How did five decades of exponential visitor growth outpace municipal water, sewage, and ecological zoning institutions?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "From 1974 restricted opening (527 visitors) to >500,000+ annual arrivals and the 2026 parliamentary committee warnings",
      "Evaluates cold-desert biophysical constraints across Leh · Nubra · Pangong · Tso Moriri · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Nubra · Pangong · Tso Moriri · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "18",
    "investigationNumber": "02",
    "investigationChapterNumber": "03",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-03-population-and-seasonal-visitor-pressure",
    "title": "Population and seasonal visitor pressure",
    "subtitle": "Quantifying the May–September visitor-to-resident surge alongside year-round administrative and logistical footprints",
    "geographicalFocus": "Leh · Diskit/Hunder · Spangmik/Pangong · Padum · Kargil",
    "primaryQuestion": "What happens to municipal lifelines when summer transient populations rival or exceed permanent town residents within a 120-day window?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Quantifying the May–September visitor-to-resident surge alongside year-round administrative and logistical footprints",
      "Evaluates cold-desert biophysical constraints across Leh · Diskit/Hunder · Spangmik/Pangong · Padum · Kargil without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Diskit/Hunder · Spangmik/Pangong · Padum · Kargil remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "19",
    "investigationNumber": "02",
    "investigationChapterNumber": "04",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-04-urban-land-use-transformation",
    "title": "Urban land-use transformation",
    "subtitle": "Conversion of irrigated agricultural oases, willow/poplar belts, and alluvial floodways into commercial concrete in Leh and Kargil",
    "geographicalFocus": "Leh Municipal Area · Choglamsar · Kargil Town",
    "primaryQuestion": "How much prime irrigated oasis land and natural flash-flood drainage path in Leh and Kargil has been sealed under permanent construction?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Conversion of irrigated agricultural oases, willow/poplar belts, and alluvial floodways into commercial concrete in Leh and Kargil",
      "Evaluates cold-desert biophysical constraints across Leh Municipal Area · Choglamsar · Kargil Town without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh Municipal Area · Choglamsar · Kargil Town remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "20",
    "investigationNumber": "02",
    "investigationChapterNumber": "05",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-05-hotel-and-accommodation-development",
    "title": "Hotel and accommodation development",
    "subtitle": "Proliferation of guesthouses, heated luxury hotels, and seasonal lakeshore glamping camps",
    "geographicalFocus": "Leh · Nubra · Pangong Tso · Tso Moriri · Hanle",
    "primaryQuestion": "Are hotel registrations and seasonal camp permits linked to verified aquifer yield and wastewater treatment capacity?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Proliferation of guesthouses, heated luxury hotels, and seasonal lakeshore glamping camps",
      "Evaluates cold-desert biophysical constraints across Leh · Nubra · Pangong Tso · Tso Moriri · Hanle without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Nubra · Pangong Tso · Tso Moriri · Hanle remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "21",
    "investigationNumber": "02",
    "investigationChapterNumber": "06",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-06-groundwater-extraction",
    "title": "Groundwater extraction",
    "subtitle": "Unmetered commercial borewells, declining water tables in upper/central Leh, and spring interference",
    "geographicalFocus": "Leh Town · Saboo · Skara · Diskit",
    "primaryQuestion": "Is intensive summer borewell pumping by commercial establishments drawing down the shallow aquifers that feed traditional springs?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Unmetered commercial borewells, declining water tables in upper/central Leh, and spring interference",
      "Evaluates cold-desert biophysical constraints across Leh Town · Saboo · Skara · Diskit without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh Town · Saboo · Skara · Diskit remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "22",
    "investigationNumber": "02",
    "investigationChapterNumber": "07",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-07-tourism-related-water-consumption",
    "title": "Tourism-related water consumption",
    "subtitle": "The 3×–5× per-capita water multiplier between flush-toilet hotels and traditional Ladakhi dry-composting (chakdon) homes",
    "geographicalFocus": "Leh · Nubra · Kargil · Zanskar",
    "primaryQuestion": "How did the rapid shift from dry composting toilets to water-intensive flush plumbing transform Ladakh’s urban water balance?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "The 3×–5× per-capita water multiplier between flush-toilet hotels and traditional Ladakhi dry-composting (chakdon) homes",
      "Evaluates cold-desert biophysical constraints across Leh · Nubra · Kargil · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Nubra · Kargil · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "23",
    "investigationNumber": "02",
    "investigationChapterNumber": "08",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-08-sewage-and-wastewater-management",
    "title": "Sewage and wastewater management",
    "subtitle": "Fecal sludge management, septic seepage into alluvial gravel, and cold-temperature STP operational constraints",
    "geographicalFocus": "Leh · Kargil · Lakeshore Corridors",
    "primaryQuestion": "How effectively do Leh and Kargil’s sewage and fecal-sludge treatment plants operate across peak summer surges and sub-zero winters?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Fecal sludge management, septic seepage into alluvial gravel, and cold-temperature STP operational constraints",
      "Evaluates cold-desert biophysical constraints across Leh · Kargil · Lakeshore Corridors without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Kargil · Lakeshore Corridors remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "24",
    "investigationNumber": "02",
    "investigationChapterNumber": "09",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-09-solid-waste-and-plastic-pollution",
    "title": "Solid waste and plastic pollution",
    "subtitle": "Evaluating landfill accumulation, glass/packaging mountains, and the June 2026 Ladakh single-use plastic & littering restrictions",
    "geographicalFocus": "Leh (Bombgarh) · Kargil · Pangong · Khardung La · Nubra",
    "primaryQuestion": "Have the June 2026 administrative restrictions on single-use plastics and littering produced measurable reductions at high passes and lakeshores?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Evaluating landfill accumulation, glass/packaging mountains, and the June 2026 Ladakh single-use plastic & littering restrictions",
      "Evaluates cold-desert biophysical constraints across Leh (Bombgarh) · Kargil · Pangong · Khardung La · Nubra without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh (Bombgarh) · Kargil · Pangong · Khardung La · Nubra remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "25",
    "investigationNumber": "02",
    "investigationChapterNumber": "10",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-10-vehicular-and-atmospheric-emissions",
    "title": "Vehicular and atmospheric emissions",
    "subtitle": "High-altitude incomplete combustion, tourist taxi/SUV convoys, diesel generators, and local black-carbon deposition near snowfields",
    "geographicalFocus": "Khardung La · Chang La · Leh Bowl · NH-1",
    "primaryQuestion": "What black-carbon and particulate loads are generated by summer vehicular queues on glaciated passes above 5,000 metres?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "High-altitude incomplete combustion, tourist taxi/SUV convoys, diesel generators, and local black-carbon deposition near snowfields",
      "Evaluates cold-desert biophysical constraints across Khardung La · Chang La · Leh Bowl · NH-1 without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Khardung La · Chang La · Leh Bowl · NH-1 remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "26",
    "investigationNumber": "02",
    "investigationChapterNumber": "11",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-11-highway-and-infrastructure-expansion",
    "title": "Highway and infrastructure expansion",
    "subtitle": "All-weather tunnels (Zojila, Shinku La), pass widening, borrow-pit scarring, and debris-flow susceptibility",
    "geographicalFocus": "Zanskar · Drass–Kargil · Leh–Manali · Nubra",
    "primaryQuestion": "How will year-round tunnel connectivity transform Zanskar and Kargil’s visitor seasonality, slope stability, and land markets?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "All-weather tunnels (Zojila, Shinku La), pass widening, borrow-pit scarring, and debris-flow susceptibility",
      "Evaluates cold-desert biophysical constraints across Zanskar · Drass–Kargil · Leh–Manali · Nubra without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Zanskar · Drass–Kargil · Leh–Manali · Nubra remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "27",
    "investigationNumber": "02",
    "investigationChapterNumber": "12",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-12-high-altitude-construction-impacts",
    "title": "High-altitude construction impacts",
    "subtitle": "Riverbed boulder/sand mining along the Indus, Zanskar, Suru, and Shyok and thermal challenges of imported concrete",
    "geographicalFocus": "Indus · Zanskar · Suru · Shyok Corridors",
    "primaryQuestion": "What geomorphological and thermal-energy costs arise when passive solar mud-brick/rammed-earth architecture is replaced by concrete?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Riverbed boulder/sand mining along the Indus, Zanskar, Suru, and Shyok and thermal challenges of imported concrete",
      "Evaluates cold-desert biophysical constraints across Indus · Zanskar · Suru · Shyok Corridors without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Indus · Zanskar · Suru · Shyok Corridors remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "28",
    "investigationNumber": "02",
    "investigationChapterNumber": "13",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-13-renewable-energy-development-footprints",
    "title": "Renewable energy development footprints",
    "subtitle": "Auditing ultra-mega solar park siting (Pang / Changthang), transmission corridors, water cleaning needs, and pastoral land rights",
    "geographicalFocus": "Pang · Changthang · Leh–Kaithal Transmission Corridor",
    "primaryQuestion": "How can Ladakh’s solar potential be developed without enclosing tens of thousands of acres of Changpa winter grazing commons without ecological EIAs?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Auditing ultra-mega solar park siting (Pang / Changthang), transmission corridors, water cleaning needs, and pastoral land rights",
      "Evaluates cold-desert biophysical constraints across Pang · Changthang · Leh–Kaithal Transmission Corridor without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Pang · Changthang · Leh–Kaithal Transmission Corridor remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "29",
    "investigationNumber": "02",
    "investigationChapterNumber": "14",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-14-ecological-carrying-capacity",
    "title": "Ecological carrying capacity",
    "subtitle": "Multi-constraint mathematical formulation bounded by dry-season water, sewage assimilation, and wildlife disturbance",
    "geographicalFocus": "Leh · Nubra · Pangong · Tso Moriri · Hanle · Zanskar",
    "primaryQuestion": "What are the scientifically defensible daily and seasonal visitor ceilings for each fragile Ladakh destination?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Multi-constraint mathematical formulation bounded by dry-season water, sewage assimilation, and wildlife disturbance",
      "Evaluates cold-desert biophysical constraints across Leh · Nubra · Pangong · Tso Moriri · Hanle · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Leh · Nubra · Pangong · Tso Moriri · Hanle · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "30",
    "investigationNumber": "02",
    "investigationChapterNumber": "15",
    "investigationTitle": "How Many People Can a Cold Desert Sustain?",
    "investigationDispatchSlug": "how-many-people-can-a-cold-desert-sustain",
    "slug": "inv-02-ch-15-sustainable-development-thresholds",
    "title": "Sustainable development thresholds",
    "subtitle": "Enforceable borewell metering, eco-fee reinvestment, passive-solar building codes, and dry-sanitation incentives",
    "geographicalFocus": "UT Ladakh Governance Framework",
    "primaryQuestion": "Which binding statutory thresholds can reconcile local Ladakhi livelihood aspirations with cold-desert biophysical limits?",
    "centralHypothesisLink": "Conventional infrastructure and tourism planning may overestimate Ladakh's development capacity by failing to account for seasonal freshwater availability, waste assimilation limits and ecosystem recovery rates.",
    "analyticalScope": [
      "Enforceable borewell metering, eco-fee reinvestment, passive-solar building codes, and dry-sanitation incentives",
      "Evaluates cold-desert biophysical constraints across UT Ladakh Governance Framework without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-02.1: Historical built-up area expansion mapping",
      "EXP-02.2: Tourist-to-resident seasonal pressure index",
      "EXP-02.3: Regional water demand and availability modelling"
    ],
    "primaryDocumentarySources": [
      "A 2026 parliamentary committee identified growing tourism, urbanization, water scarcity, and waste management as significant challenges to Ladakh's fragile ecosystem; in June 2026, the Ladakh administration announced strengthened restrictions on single-use plastics and littering.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across UT Ladakh Governance Framework remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "31",
    "investigationNumber": "03",
    "investigationChapterNumber": "01",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-01-cold-desert-ecosystem-evolution",
    "title": "Cold-desert ecosystem evolution",
    "subtitle": "Tectonic uplift of the Tibetan–Ladakh plateau, aridity adaptation, and the 2025 Changthang permafrost soil microbiome discovery",
    "geographicalFocus": "Changthang · Indus Suture · Karakoram · Zanskar",
    "primaryQuestion": "How did millions of years of high-altitude aridity and freeze-thaw dynamics create specialized soil microbiomes (2025 PMC study) and endemic food webs?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Tectonic uplift of the Tibetan–Ladakh plateau, aridity adaptation, and the 2025 Changthang permafrost soil microbiome discovery",
      "Evaluates cold-desert biophysical constraints across Changthang · Indus Suture · Karakoram · Zanskar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Changthang · Indus Suture · Karakoram · Zanskar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "32",
    "investigationNumber": "03",
    "investigationChapterNumber": "02",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-02-high-altitude-biodiversity-inventory",
    "title": "High-altitude biodiversity inventory",
    "subtitle": "Synthesizing vascular flora, mammals, invertebrates, and the September 2026 finding of 65 bird species of high conservation concern",
    "geographicalFocus": "All Ladakh Biogeographic Zones",
    "primaryQuestion": "Why did the September 2026 environmental assessment flag 65 avian species in Ladakh as high conservation concern, and which habitats are most threatened?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Synthesizing vascular flora, mammals, invertebrates, and the September 2026 finding of 65 bird species of high conservation concern",
      "Evaluates cold-desert biophysical constraints across All Ladakh Biogeographic Zones without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across All Ladakh Biogeographic Zones remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "33",
    "investigationNumber": "03",
    "investigationChapterNumber": "03",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-03-changthang-rangeland-ecology",
    "title": "Changthang rangeland ecology",
    "subtitle": "Sedge-dominated wet meadows (Kobresia), steppe graminoids, nutrient cycling, and climate-driven aridification",
    "geographicalFocus": "Rupshu · Hanley · Nyoma · Durbuk (Changthang)",
    "primaryQuestion": "Are Changthang’s narrow sedge marshes—less than 5% of land area yet critical for survival—shrinking under warming and water diversion?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Sedge-dominated wet meadows (Kobresia), steppe graminoids, nutrient cycling, and climate-driven aridification",
      "Evaluates cold-desert biophysical constraints across Rupshu · Hanley · Nyoma · Durbuk (Changthang) without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Rupshu · Hanley · Nyoma · Durbuk (Changthang) remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "34",
    "investigationNumber": "03",
    "investigationChapterNumber": "04",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-04-snow-leopard-habitat-connectivity",
    "title": "Snow leopard habitat connectivity",
    "subtitle": "Landscape genetics, prey density (bharal & ibex), homestay conservation models, and linear barrier risks",
    "geographicalFocus": "Hemis · Sham · Zanskar · Changthang · Karakoram",
    "primaryQuestion": "Where do road upgrades, fencing, and feral dog packs threaten snow leopard movement corridors outside core national park boundaries?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Landscape genetics, prey density (bharal & ibex), homestay conservation models, and linear barrier risks",
      "Evaluates cold-desert biophysical constraints across Hemis · Sham · Zanskar · Changthang · Karakoram without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Hemis · Sham · Zanskar · Changthang · Karakoram remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "35",
    "investigationNumber": "03",
    "investigationChapterNumber": "05",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-05-kiang-and-wild-ungulate-populations",
    "title": "Kiang and wild ungulate populations",
    "subtitle": "Tibetan wild ass (Kiang), Tibetan argali, Tibetan gazelle (Goa), Ladakh urial, blue sheep, and Asiatic ibex range dynamics",
    "geographicalFocus": "Changthang · Indus Gorge · Hemis · Karakoram",
    "primaryQuestion": "How are wild ungulates navigating forage competition, wire fencing, and shrinking unfenced steppe valleys across eastern Ladakh?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Tibetan wild ass (Kiang), Tibetan argali, Tibetan gazelle (Goa), Ladakh urial, blue sheep, and Asiatic ibex range dynamics",
      "Evaluates cold-desert biophysical constraints across Changthang · Indus Gorge · Hemis · Karakoram without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Changthang · Indus Gorge · Hemis · Karakoram remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "36",
    "investigationNumber": "03",
    "investigationChapterNumber": "06",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-06-black-necked-crane-conservation",
    "title": "Black-necked crane conservation",
    "subtitle": "Breeding pair trajectories, nesting-island submergence/desiccation, and feral-dog predation around waste sites",
    "geographicalFocus": "Tso Kar · Tso Moriri · Hanle · Chushul Marshes",
    "primaryQuestion": "Why has feral-dog predation—fueled by uncollected food waste—emerged alongside hydroperiod shifts as a primary threat to Black-necked crane chicks?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Breeding pair trajectories, nesting-island submergence/desiccation, and feral-dog predation around waste sites",
      "Evaluates cold-desert biophysical constraints across Tso Kar · Tso Moriri · Hanle · Chushul Marshes without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Tso Kar · Tso Moriri · Hanle · Chushul Marshes remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "37",
    "investigationNumber": "03",
    "investigationChapterNumber": "07",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-07-tso-moriri-wetland-ecology",
    "title": "Tso Moriri wetland ecology",
    "subtitle": "Oligotrophic high-altitude Ramsar hydrology (4,522 m), inflow stream sediment fans, and shoreline visitor management",
    "geographicalFocus": "Tso Moriri (Korzok · Peldo Le)",
    "primaryQuestion": "How have changing glacial inflows and Korzok shoreline tourism pressures affected Tso Moriri’s Ramsar ecological character?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Oligotrophic high-altitude Ramsar hydrology (4,522 m), inflow stream sediment fans, and shoreline visitor management",
      "Evaluates cold-desert biophysical constraints across Tso Moriri (Korzok · Peldo Le) without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Tso Moriri (Korzok · Peldo Le) remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "38",
    "investigationNumber": "03",
    "investigationChapterNumber": "08",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-08-tso-kar-wetland-complex",
    "title": "Tso Kar wetland complex",
    "subtitle": "Coupled freshwater Startsapuk Tso and hypersaline Tso Kar dynamics, salt-crust microhabitats, and 2020 Ramsar obligations",
    "geographicalFocus": "Tso Kar Basin (Rupshu Plateau)",
    "primaryQuestion": "Is evaporative concentration or inflow alteration changing the delicate freshwater–hypersaline balance of the Tso Kar Ramsar complex?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Coupled freshwater Startsapuk Tso and hypersaline Tso Kar dynamics, salt-crust microhabitats, and 2020 Ramsar obligations",
      "Evaluates cold-desert biophysical constraints across Tso Kar Basin (Rupshu Plateau) without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Tso Kar Basin (Rupshu Plateau) remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "39",
    "investigationNumber": "03",
    "investigationChapterNumber": "09",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-09-pangong-tso-ecosystem-dynamics",
    "title": "Pangong Tso ecosystem dynamics",
    "subtitle": "Transboundary brackish limnology, littoral crustacean/algal productivity, and unregulated western-shore commercialization",
    "geographicalFocus": "Pangong Tso (Lukung · Spangmik · Man · Merak)",
    "primaryQuestion": "What baseline water-chemistry and shoreline-restoration standards are urgently needed along Pangong Tso’s heavily visited western shore?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Transboundary brackish limnology, littoral crustacean/algal productivity, and unregulated western-shore commercialization",
      "Evaluates cold-desert biophysical constraints across Pangong Tso (Lukung · Spangmik · Man · Merak) without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Pangong Tso (Lukung · Spangmik · Man · Merak) remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "40",
    "investigationNumber": "03",
    "investigationChapterNumber": "10",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-10-migratory-bird-corridors",
    "title": "Migratory bird corridors",
    "subtitle": "Trans-Himalayan Central Asian Flyway staging posts along the Indus riverine marshes (Shey, Thiksey, Puga, Hanle)",
    "geographicalFocus": "Indus Valley Marshes · Hanle · Nubra · Suru",
    "primaryQuestion": "How do valley-bottom riverine marshes along the Indus sustain migratory birds crossing the world’s highest mountain barrier?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Trans-Himalayan Central Asian Flyway staging posts along the Indus riverine marshes (Shey, Thiksey, Puga, Hanle)",
      "Evaluates cold-desert biophysical constraints across Indus Valley Marshes · Hanle · Nubra · Suru without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Indus Valley Marshes · Hanle · Nubra · Suru remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "41",
    "investigationNumber": "03",
    "investigationChapterNumber": "11",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-11-pastoralism-and-grazing-systems",
    "title": "Pastoralism and grazing systems",
    "subtitle": "Changpa rotational transhumance, customary pasture allocation, winter dzasak snow disasters, and ecological co-evolution",
    "geographicalFocus": "Changthang Plateau & Zanskar Doksa Pastures",
    "primaryQuestion": "Why must conservation science recognize mobile Changpa pastoralism as a co-evolved ecological stewardship system rather than an intruder?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Changpa rotational transhumance, customary pasture allocation, winter dzasak snow disasters, and ecological co-evolution",
      "Evaluates cold-desert biophysical constraints across Changthang Plateau & Zanskar Doksa Pastures without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Changthang Plateau & Zanskar Doksa Pastures remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "42",
    "investigationNumber": "03",
    "investigationChapterNumber": "12",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-12-pashmina-producing-rangeland-sustainability",
    "title": "Pashmina-producing rangeland sustainability",
    "subtitle": "Changra goat winter thermal stress, warmer-winter fibre-micron risks, forage scarcity, and pastoral youth out-migration",
    "geographicalFocus": "Nyoma · Korzok · Samad · Kharnak · Hanley",
    "primaryQuestion": "How are warming winters, erratic blizzards, and pasture enclosures affecting the ecological and economic viability of authentic Ladakh Pashmina?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Changra goat winter thermal stress, warmer-winter fibre-micron risks, forage scarcity, and pastoral youth out-migration",
      "Evaluates cold-desert biophysical constraints across Nyoma · Korzok · Samad · Kharnak · Hanley without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Nyoma · Korzok · Samad · Kharnak · Hanley remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "43",
    "investigationNumber": "03",
    "investigationChapterNumber": "13",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-13-infrastructure-and-habitat-fragmentation",
    "title": "Infrastructure and habitat fragmentation",
    "subtitle": "Roads, chain-link enclosures, powerlines (avian electrocution/collision), and Hanle Dark Sky Reserve light-pollution governance",
    "geographicalFocus": "Changthang · Hanle · Indus Corridor · Karakoram",
    "primaryQuestion": "What wildlife-friendly linear design standards—undergrounding/bird diverters, unfenced underpasses, dark-sky lighting—must become mandatory in Ladakh?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Roads, chain-link enclosures, powerlines (avian electrocution/collision), and Hanle Dark Sky Reserve light-pollution governance",
      "Evaluates cold-desert biophysical constraints across Changthang · Hanle · Indus Corridor · Karakoram without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Changthang · Hanle · Indus Corridor · Karakoram remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "44",
    "investigationNumber": "03",
    "investigationChapterNumber": "14",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-14-protected-areas-and-ramsar-obligations",
    "title": "Protected areas and Ramsar obligations",
    "subtitle": "Governance audit of Hemis National Park, Changthang & Karakoram Sanctuaries, boundary rationalizations, and Ramsar management plans",
    "geographicalFocus": "Hemis · Changthang · Karakoram · Tso Moriri · Tso Kar",
    "primaryQuestion": "Do Ladakh’s protected areas and Ramsar wetlands have legally notified, community-co-governed management plans with transparent boundaries?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Governance audit of Hemis National Park, Changthang & Karakoram Sanctuaries, boundary rationalizations, and Ramsar management plans",
      "Evaluates cold-desert biophysical constraints across Hemis · Changthang · Karakoram · Tso Moriri · Tso Kar without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Hemis · Changthang · Karakoram · Tso Moriri · Tso Kar remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  },
  {
    "globalChapterNumber": "45",
    "investigationNumber": "03",
    "investigationChapterNumber": "15",
    "investigationTitle": "The Desert Is Not Empty",
    "investigationDispatchSlug": "the-desert-is-not-empty",
    "slug": "inv-03-ch-15-regional-ecosystem-restoration-strategy",
    "title": "Regional ecosystem restoration strategy",
    "subtitle": "Replacing the colonial \"wasteland\" classification with Cold-Desert Ecological Function Zoning across UT Ladakh",
    "geographicalFocus": "Entire UT Ladakh Cold-Desert Biome",
    "primaryQuestion": "How can statutory reclassification of \"barren/wasteland\" commons protect permafrost soils, wetlands, corridors, and pastoral livelihoods simultaneously?",
    "centralHypothesisLink": "Landscapes conventionally classified as barren or unproductive may perform critical ecological functions that remain inadequately represented in infrastructure planning and environmental assessments.",
    "analyticalScope": [
      "Replacing the colonial \"wasteland\" classification with Cold-Desert Ecological Function Zoning across UT Ladakh",
      "Evaluates cold-desert biophysical constraints across Entire UT Ladakh Cold-Desert Biome without applying humid-plains engineering assumptions.",
      "Distinguishes established peer-reviewed and official records from proposed field/satellite experiments."
    ],
    "linkedExperiments": [
      "EXP-03.1: Historical wetland extent change detection",
      "EXP-03.2: Alpine rangeland productivity assessment",
      "EXP-03.3: Wildlife habitat suitability modelling"
    ],
    "primaryDocumentarySources": [
      "A September 2026 report covering an environmental assessment identified 65 bird species in Ladakh as being of high conservation concern amid infrastructure, tourism, and climate pressures, while 2025 peer-reviewed research (PMC) documented rich microbial diversity within Changthang's permafrost-affected soils.",
      "Remote-sensing optical/SAR archives, station hydro-meteorological series, and statutory UT Ladakh / parliamentary records."
    ],
    "unresolvedQuestions": [
      "Sub-basin and village-scale primary field measurements across Entire UT Ladakh Cold-Desert Biome remain part of the proposed 2026–2030 experimental protocol.",
      "Requires formal institutional right-of-response and community consultation with Hill Councils (LAHDC Leh & Kargil) and village/pastoral assemblies."
    ],
    "rightOfResponseEntities": [
      "UT Ladakh Administration & Department of Forest, Ecology & Environment",
      "Ladakh Autonomous Hill Development Councils (LAHDC Leh & LAHDC Kargil)",
      "Local Gobas, Churpons & Changpa Pastoral Associations"
    ],
    "estimatedReadingMinutes": 9
  }
];

export const LADAKH_OBSERVATORY_MODULES_12: Array<{
  code: string;
  title: string;
  focus: string;
}> = [
  {
    "code": "LAD-OBS-01",
    "title": "Trans-Himalayan Glacier & Cirque Ice Mass-Balance Ledger",
    "focus": "Tracks geodetic mass loss (0.21–0.37 m w.e./yr synthesis) separating small village-feeding cirque ice from Karakoram trunks."
  },
  {
    "code": "LAD-OBS-02",
    "title": "Snowline, SWE & Churpon Sowing-Window Monitor",
    "focus": "Couples MODIS/Sentinel snowpack depletion timing with April–June oasis irrigation schedules across Leh, Kargil, Suru, and Zanskar."
  },
  {
    "code": "LAD-OBS-03",
    "title": "Permafrost Active-Layer & High-Pass Deformation Watch",
    "focus": "InSAR subsidence, rock-glacier creep, and Changthang wet-meadow permafrost microbiome sensitivity mapping."
  },
  {
    "code": "LAD-OBS-04",
    "title": "Moraine-Dammed Glacial Lake & GLOF Runout Registry",
    "focus": "Monitors expanding glacial lakes and downstream community warning readiness across Zanskar, Suru, Leh, and Shyok."
  },
  {
    "code": "LAD-OBS-05",
    "title": "Artificial Glaciers, Ice Stupas & Spring Hydrograph Archive",
    "focus": "Empirically audits storage volumes, melt duration, and elevation thresholds of artificial-glacier interventions."
  },
  {
    "code": "LAD-OBS-06",
    "title": "Seasonal Visitor-to-Resident Carrying Capacity Index",
    "focus": "Tracks monthly arrival peaks against permanent populations across Leh, Nubra, Pangong, Tso Moriri, Hanle, and Zanskar."
  },
  {
    "code": "LAD-OBS-07",
    "title": "Urban Borewell, Aquifer Drawdown & Flush-vs-Chakdon Water Audit",
    "focus": "Models commercial groundwater extraction and wastewater generation against alluvial snowmelt recharge."
  },
  {
    "code": "LAD-OBS-08",
    "title": "Solid Waste, Sewage & June 2026 Plastic-Ban Compliance Tracker",
    "focus": "Evaluates high-altitude STP performance, landfill burdens, and field enforcement of June 2026 single-use plastic restrictions."
  },
  {
    "code": "LAD-OBS-09",
    "title": "Solar Park, Highway & Linear Infrastructure Footprint Mapper",
    "focus": "Quantifies spatial enclosure and slope disturbance from pass widening, tunnels, transmission corridors, and mega-solar siting."
  },
  {
    "code": "LAD-OBS-10",
    "title": "High-Altitude Ramsar & Endorheic Wetland Health Ledger",
    "focus": "Monitors shoreline extent, salinity, and breeding waterfowl across Tso Moriri, Tso Kar, Pangong Tso, and Hanle marshes."
  },
  {
    "code": "LAD-OBS-11",
    "title": "65 High-Concern Avian Taxa & Snow Leopard–Ungulate Corridor Atlas",
    "focus": "Integrates September 2026 avian conservation-concern priorities with unfenced carnivore/ungulate movement connectivity."
  },
  {
    "code": "LAD-OBS-12",
    "title": "Changthang Rangeland, Pashmina Pastoralism & \"Non-Barren\" Soil Registry",
    "focus": "Documents sedge-meadow productivity, rotational Changpa stewardship, and permafrost soil microbial biodiversity (2025 PMC)."
  }
];

export const LADAKH_PRIMARY_SOURCES_8: Array<{
  source: string;
  significance: string;
}> = [
  {
    "source": "2026 Cryospheric & Agro-Climatic Synthesis (Indian Agricultural Research Journals & Trans-Himalayan Glaciology Corpus)",
    "significance": "Reports regional warming of ~0.02°C annually, earlier snowmelt onset, and glacier mass losses ranging between 0.21 and 0.37 m w.e. annually across Ladakh sub-basins."
  },
  {
    "source": "Parliamentary Standing Committee Environmental Assessment on Ladakh (2026)",
    "significance": "Identifies rapid tourism growth, unplanned urbanization, acute seasonal water scarcity, and solid/liquid waste management as major threats to Ladakh's fragile cold-desert ecosystem."
  },
  {
    "source": "UT Ladakh Administration Single-Use Plastic & Littering Restrictions Notification (June 2026 · PIB)",
    "significance": "Strengthened administrative restrictions on single-use plastics and commercial/tourist littering across fragile high-altitude corridors and wetlands."
  },
  {
    "source": "Ladakh Avian Conservation Assessment Coverage (September 2026 · KNO / Wildlife Synthesis)",
    "significance": "Identifies 65 bird species in Ladakh of high conservation concern amid compounding pressures from infrastructure expansion, unregulated tourism, free-ranging dogs, and climate change."
  },
  {
    "source": "Changthang Permafrost-Affected Soil Microbiome Study (2025 · PubMed Central / Peer-Reviewed)",
    "significance": "Demonstrates rich, functionally critical microbial diversity within Changthang permafrost-affected cold-desert soils, refuting administrative assumptions that arid steppes are biologically barren."
  },
  {
    "source": "Ramsar Information Sheets — Tso Moriri (2002) & Tso Kar Wetland Complex (2020)",
    "significance": "Establishes international ecological-character baselines for Black-necked crane breeding marshes and endorheic cold-desert hydrology."
  },
  {
    "source": "ICIMOD & Geodetic High-Mountain Asia Cryosphere Inventories (1985–2026)",
    "significance": "Provides regional remote-sensing benchmarks distinguishing Karakoram glacier surge heterogeneity from Zanskar and Leh-range ice recession."
  },
  {
    "source": "LAHDC Leh & Kargil Vision Documents and Traditional Churpon / Chakdon Ethnographic Records",
    "significance": "Documents indigenous gravity-channel water allocation and dry-composting sanitation adaptations to cold-desert water scarcity."
  }
];

export const LADAKH_RESEARCH_LIMITATIONS_6: string[] = [
  "The 21 proposed original scientific experiments (7 per investigation) represent structured research protocols; full multi-sensor satellite processing through late 2026 and stratified 30-village field gauging remain ongoing.",
  "Regional glacier mass-loss ranges (0.21–0.37 m w.e./yr) and ~0.02°C/yr warming derive from published 2026 scientific syntheses and should not be extrapolated uniformly to every individual cirque or surging Karakoram glacier without local geodetic DEM differencing.",
  "Exact metered groundwater extraction volumes for private commercial borewells in Leh, Nubra, and Kargil are not yet publicly compiled in an audited municipal register.",
  "Post-June 2026 plastic-restriction compliance rates require multi-season field waste audits across summer 2026 and 2027 tourist peaks.",
  "Sensitive nesting coordinates of Black-necked cranes and denning sites of snow leopards or Pallas’s cats are intentionally generalized to prevent disturbance.",
  "Strategic border zones across eastern Ladakh and the northern Karakoram carry statutory airspace, field-access, and high-resolution data restrictions that bound civilian field sampling."
];

export function getLadakhChaptersByInvestigation(
  investigationNumber: '01' | '02' | '03'
): LadakhChapterProtocol[] {
  return LADAKH_CHAPTERS_45.filter((ch) => ch.investigationNumber === investigationNumber);
}

export function getLadakhChapterBySlug(slug: string): LadakhChapterProtocol | undefined {
  return LADAKH_CHAPTERS_45.find((ch) => ch.slug === slug);
}

export function getAdjacentLadakhChapters(slug: string): {
  prev: LadakhChapterProtocol | null;
  next: LadakhChapterProtocol | null;
} {
  const idx = LADAKH_CHAPTERS_45.findIndex((ch) => ch.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? LADAKH_CHAPTERS_45[idx - 1] : null,
    next: idx < LADAKH_CHAPTERS_45.length - 1 ? LADAKH_CHAPTERS_45[idx + 1] : null,
  };
}

export function buildLadakhFrontiersFrameworkJson(): Record<string, unknown> {
  return {
    issue: LADAKH_ECOLOGICAL_FRONTIERS_SPEC,
    investigationsCount: LADAKH_INVESTIGATIONS_3.length,
    chaptersCount: LADAKH_CHAPTERS_45.length,
    experimentsCount: LADAKH_INVESTIGATIONS_3.reduce(
      (acc, inv) => acc + inv.proposedExperiments.length,
      0
    ),
    investigations: LADAKH_INVESTIGATIONS_3,
    chapters: LADAKH_CHAPTERS_45,
    observatoryModules: LADAKH_OBSERVATORY_MODULES_12,
    primarySources: LADAKH_PRIMARY_SOURCES_8,
    researchLimitations: LADAKH_RESEARCH_LIMITATIONS_6,
  };
}

function escapeCsv(val: string | number): string {
  const s = String(val ?? '');
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function buildLadakhFrontiersFrameworkCsv(): string {
  const headers = [
    'global_chapter_number',
    'investigation_number',
    'investigation_chapter_number',
    'investigation_title',
    'slug',
    'research_domain',
    'subtitle',
    'geographical_focus',
    'primary_question',
    'central_hypothesis',
    'estimated_reading_minutes',
  ];
  const rows = LADAKH_CHAPTERS_45.map((ch) =>
    [
      ch.globalChapterNumber,
      ch.investigationNumber,
      ch.investigationChapterNumber,
      ch.investigationTitle,
      ch.slug,
      ch.title,
      ch.subtitle,
      ch.geographicalFocus,
      ch.primaryQuestion,
      ch.centralHypothesisLink,
      ch.estimatedReadingMinutes,
    ]
      .map(escapeCsv)
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}
