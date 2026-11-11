/**
 * EcoVoices: Environmental Music & Cultural Stewardship
 * In collaboration with SufiPulse USA
 * 
 * Canonical Music Publisher & Rights Holder: SufiPulse USA (https://sufipulse.com)
 * Environmental Science & Education Platform: Kashmir EcoWatch (https://kashmir-ecowatch.com)
 * 
 * Rights Notice:
 * All recordings, musical compositions, audio masters, lyrics, and promotional artwork
 * remain the sole intellectual property of SufiPulse USA and affiliated artists.
 * Kashmir EcoWatch presents these curated releases strictly for non-commercial ecological
 * education, environmental curriculum integration, and community awareness.
 */

export interface RelatedScientificModule {
  title: string;
  category: string;
  href: string;
  description: string;
}

export interface OutdoorClassroomActivity {
  activityTitle: string;
  recommendedTier: string;
  curriculumLink: string;
  duration: string;
  fieldHypothesis: string;
  materialsNeeded: string[];
  fieldworkMethod: string;
  measurableLearningOutcome: string;
}

export interface EcoVoiceRelease {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  catalogNumber: string;
  canonicalUrl: string;
  publisher: string;
  year: number;
  durationFormatted: string;
  audioSampleUrl?: string;
  videoEmbedId?: string;
  coverArtworkUrl: string;
  language: string;
  primaryTheme: string;
  themeCategory: 'water_stewardship' | 'river_conservation' | 'lake_wetland_ecology' | 'forest_alpine' | 'sacred_springs';
  observances: string[];
  kalamPoetOrSource?: string;
  musicalStyle: string;
  instrumentsUsed: string[];
  poeticExcerptOriginal: string;
  poeticExcerptTranslation: string;
  ecologicalDossier: string;
  relatedScientificModules: RelatedScientificModule[];
  outdoorClassroomActivity: OutdoorClassroomActivity;
  verifiedSufiPulseRelease: boolean;
}

export const ECOVOICES_THEME_CATEGORIES = [
  { id: 'all', label: 'All Environmental Releases', count: 3 },
  { id: 'water_stewardship', label: 'Water Stewardship', count: 1 },
  { id: 'river_conservation', label: 'River Conservation (Jhelum)', count: 1 },
  { id: 'lake_wetland_ecology', label: 'Lakes & Wetlands (Dal)', count: 1 }
] as const;

export const ECOVOICES_RELEASES: EcoVoiceRelease[] = [
  {
    id: 'pani-gawah-hai',
    slug: 'pani-gawah-hai',
    title: 'PANI GAWAH HAI | Kashmir Water Bears Witness',
    subtitle: 'A Sufi Symphony on Kashmir\'s Freshwater Heritage & Riparian Memory',
    catalogNumber: 'SP-USA-ENV-001',
    canonicalUrl: 'https://sufipulse.com/release-detail/pani-gawah-hai-kashmir-water-bears-witness-sufipulse-usa',
    publisher: 'SufiPulse USA',
    year: 2024,
    durationFormatted: '6:42',
    videoEmbedId: 'pani-gawah-hai-kashmir',
    coverArtworkUrl: 'https://images.openai.com/static-rsc-4/1F5SpbTvOv3X-FxO0y7s_eeVAGrUPKncR2yqdmZG3xmM56H2kOX-cd1oJmCyBfIg_bCT5TgO0BByDbf3_rEJSgDBxMJitUF9A4Hfg5zAljySks4LKW9ztrzm2mYTXIzbLtijfSzRKiTZ6h9nzUGYNrlhbdFaUUCpB7EEk2yitmw?purpose=inline',
    language: 'Kashmiri & Urdu with English Poetic Gloss',
    primaryTheme: 'Water Stewardship & Freshwater Riparian Memory',
    themeCategory: 'water_stewardship',
    observances: [
      'World Water Day (March 22)',
      'J&K Freshwater Basin Week (September 24)',
      'World Environment Day (June 5)'
    ],
    kalamPoetOrSource: 'Traditional Kashmiri Mystical Idiom & Contemporary Sufi Ecology',
    musicalStyle: 'Spiritual Symphony with Traditional Kashmiri Santoor & Rabab',
    instrumentsUsed: ['Kashmiri Santoor', 'Afghan Rabab', 'Sarangi', 'Frame Drum (Daf)', 'Ambient Himalayan Soundscapes'],
    poeticExcerptOriginal: 'پانِ گواہ چُھ، سارسار درؠیاو گواہ چُھ،\nکوہِ ہِمالایہِ پؠٹھہٕ یِم آپ ژھَلَن چِھ۔\nامانت چھِ امۍ ژھیل، گژھہِ نہٕ زاہ زایہِ گژھُن۔',
    poeticExcerptTranslation: 'Water bears witness; every roaring mountain river bears witness,\nFlowing pure from the glacial crests of the Himalayas.\nThis crystalline flow is a sacred trust; let not its sanctity be squandered.',
    ecologicalDossier: 'In Kashmir\'s Western Himalayan hydrology, headwater streams provide drinking water, irrigation for terraced paddy and apple orchards, and crucial ecological replenishment for downstream valley wetlands. "PANI GAWAH HAI" translates hydrological accountability into an acoustic testament. It counters the commodification of water by invoking the ancient Himalayan concept of "Aab-e-Hayat" (the water of life) and the duty of custodianship over high-altitude glaciers, alpine tarns, and valley floodplains.',
    relatedScientificModules: [
      {
        title: 'Kashmir Water Systems Observatory',
        category: 'Hydrology',
        href: '/water-systems',
        description: 'Comprehensive hydrological basin monitoring, basin discharge rates, and watershed health metrics.'
      },
      {
        title: 'Drinking Water Aquifers & Springs',
        category: 'Groundwater',
        href: '/water-systems/drinking-water-sources',
        description: 'Geospatial mapping of pristine mountain aquifers, municipal intake channels, and community spring catchments.'
      },
      {
        title: 'Water Quality Laboratory Testing Layers',
        category: 'Ecotoxicology',
        href: '/water-systems/water-quality',
        description: 'Physicochemical testing metrics: Dissolved Oxygen, BOD5, Electrical Conductivity, and microbial indicators.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'Sentinel Spring Transect & Hydrological Memory Audit',
      recommendedTier: 'Intermediate Tier (14–15 Years) & Advanced Tier (16–17 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '3 Hours (1 Hour Preparation & Acoustic Listening + 2 Hours Catchment Sampling)',
      fieldHypothesis: 'Pristine mountain headwater springs exhibit neutral pH (7.2–7.6) and high Dissolved Oxygen (> 7.5 mg/L), whereas downstream canal outfalls exhibit dissolved oxygen depletion (< 4.0 mg/L) caused by unbuffered runoff.',
      materialsNeeded: [
        'Portable digital DO meter or chemical Winkler titration kit',
        'Calibrated handheld pH/EC multi-parameter probe',
        'Sterile 500 mL HDPE sampling bottles',
        'Audio player for listening to PANI GAWAH HAI at field station base',
        'EcoWatch Sentinel Spring Observation Sheet'
      ],
      fieldworkMethod: '1. Listen to the opening movement of "PANI GAWAH HAI" in the field classroom to establish thematic focus on water as a living legal and moral witness.\n2. Conduct a 3-point water quality transect along a local stream: Point A (Pristine spring head), Point B (Agricultural canal inflow), Point C (Downstream settlement egress).\n3. Record pH, DO, Temperature, and visual clarity.\n4. Interview two village elders regarding water discharge volumes and historical perennial permanence over the last 30 years.\n5. Log findings into the Kashmir EcoWatch Student Field Observation Registry.',
      measurableLearningOutcome: 'Students quantify the physicochemical degradation gradient along a catchment transect and synthesize oral environmental memory with empirical sensor data.'
    },
    verifiedSufiPulseRelease: true
  },
  {
    id: 'sufi-cry-for-a-river',
    slug: 'sufi-cry-for-a-river',
    title: 'Sufi Cry for a River | A Cry for the Jhelum (Vyeth)',
    subtitle: 'Elegy for Kashmir\'s Lifeline: The Hydrological & Cultural Trajectory of River Jhelum',
    catalogNumber: 'SP-USA-ENV-002',
    canonicalUrl: 'https://sufipulse.com/release-detail/sufi-cry-for-a-river',
    publisher: 'SufiPulse USA',
    year: 2024,
    durationFormatted: '7:15',
    videoEmbedId: 'sufi-cry-for-a-river',
    coverArtworkUrl: 'https://images.openai.com/static-rsc-4/-7mhzx6TzC7dPW7WH2naj-1lysCDSv-IJZ8GQ6y8toJ3VaF9GbT-YQWZuaso4d7ci-la-CZZP9r3dO9h8WkLiu5ArqEIV4h6cf5MKfvqbiWau0JdcnzdMQ6XEahAFowGoqtJCCgc9B1UMtd8Zdi9HOnJOHOs365CHpqQt9mEkjY?purpose=inline',
    language: 'Kashmiri & Urdu',
    primaryTheme: 'River Conservation, Hydrological Integrity & Siltation Defense',
    themeCategory: 'river_conservation',
    observances: [
      'International Day of Action for Rivers (March 14)',
      'World River Day (Fourth Sunday of September)',
      'Kashmir Flood Remembrance Day (September 7)'
    ],
    kalamPoetOrSource: 'Classical Kashmiri Kalam & Contemporary Riverine Lament',
    musicalStyle: 'Meditative Kashmiri Sufiana Qalam with Ney and Mournful Strings',
    instrumentsUsed: ['Persian Ney', 'Kashmiri Saaz', 'Acoustic Guitar', 'Clay Matka Percussion', 'Harmonium'],
    poeticExcerptOriginal: 'وؠتھ چھےٚ رَوان دَواں، سؠنہِ مَنٛز چھُ ژِٹھ پؠوان،\nکتھ کٔنۍ زِ اَمۍ سٕنٛدِ سٲرؠ کُنٛڈ گٔے مژھِ مَنٛز گُم؟\nیِتھ تَنہِ روٗد نہٕ کینہہ، صِرِف وؠتھ چھےٚ ژھۆپہِ پٲٹھۍ نالان۔',
    poeticExcerptTranslation: 'The Vyeth flows on, weeping in silence through her winding course,\nHow have her pristine springs been swallowed by encroaching silt and debris?\nHer ancient voice is suffocated, yet the river cries out in every eddy.',
    ecologicalDossier: 'The River Jhelum (known as Vyeth in Kashmiri, Hydaspes in ancient Greek) originates at the sacred limestone spring of Verinag and meanders across the Kashmir valley floor before passing through Wular Lake and exiting into the Baramulla gorge. The river has suffered from severe loss of carrying capacity (reduced from ~45,000 cusecs to under 28,000 cusecs in un-dredged stretches), widespread illegal riverbed sand mining, destruction of flood spill channels, and untreated municipal sewage outfalls. "Sufi Cry for a River" gives voice to this wounded artery, bridging hydraulic vulnerability with the valley\'s deep literary affection for the river.',
    relatedScientificModules: [
      {
        title: 'River Jhelum Hydrological Monitoring System',
        category: 'Rivers & Floods',
        href: '/water-systems/rivers',
        description: 'Flow velocities, gauge heights at Ram Munshi Bagh and Sangam, siltation indices, and flood spill channels.'
      },
      {
        title: 'Flood Hazard Intelligence & Drainage Modeling',
        category: 'Disaster Risk',
        href: '/water-systems/flood-risk',
        description: '100-year flood inundation zones, channel geometry profiling, and wetland absorption buffer modeling.'
      },
      {
        title: 'Benthic Macroinvertebrate & Fish Biodiversity',
        category: 'Aquatic Life',
        href: '/biodiversity/fish',
        description: 'Schizothorax (snow trout) migration corridors and ecological status of native coldwater ichthyofauna.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'River Morphology, Bank Stability & Macroinvertebrate Bio-Assessment',
      recommendedTier: 'Advanced Tier (16–17 Years) & Undergraduate Tier (18–22 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '4 Hours Field Expedition',
      fieldHypothesis: 'Riparian reaches with intact willow-reed root systems display significantly lower bank erosion and host pollution-sensitive Ephemeroptera-Plecoptera-Trichoptera (EPT) insect larvae compared to embanked urban reaches.',
      materialsNeeded: [
        'D-frame aquatic kick-net (500 μm mesh)',
        'White enamel sorting trays and fine forceps',
        'CPCB Macroinvertebrate Identification Key (Western Himalaya)',
        'Turbidity tube (120 cm graduated)',
        'GPS-enabled mobile device for field geotagging'
      ],
      fieldworkMethod: '1. Conduct five 1-minute kick-net sampling runs across a 100-meter riffle zone along the Jhelum or a tributary.\n2. Sort organisms into taxonomic orders and calculate the Family Biotic Index (FBI).\n3. Measure turbidity and estimate percentage bank vegetation cover.\n4. Correlate findings with the lyrical themes of ecological mourning in "Sufi Cry for a River".\n5. Generate an Environmental Action Sheet proposing riparian re-vegetation with native Salix (willow) and Phragmites.',
      measurableLearningOutcome: 'Students calculate biological water quality index using living indicator organisms and diagnose the hydrological impact of bank degradation.'
    },
    verifiedSufiPulseRelease: true
  },
  {
    id: 'mirror-of-hazratbal-wound-of-dal',
    slug: 'mirror-of-hazratbal-wound-of-dal',
    title: 'Mirror of Hazratbal, Wound of Dal',
    subtitle: 'Sacred Reflections, Ecological Trauma & the Restoration of Dal Lake',
    catalogNumber: 'SP-USA-ENV-003',
    canonicalUrl: 'https://sufipulse.com/release-detail/mirror-of-hazratbal-wound-of-dal',
    publisher: 'SufiPulse USA',
    year: 2024,
    durationFormatted: '8:04',
    videoEmbedId: 'mirror-of-hazratbal-wound-of-dal',
    coverArtworkUrl: 'https://images.openai.com/static-rsc-4/eItUN97blPIUO8Ru5NPQ01tlJVm96evnDiz9mwzjLeIlCGqfyGT2mGf_0qHQmq06PSXz_gZyDBy_vQUjDVg3nvi9gUD0v23ogMsmMlV3pXGZgw1LN3YOo1uvLKi84UQtncg4B0wxYcKt_ZtegvIfA4e_Ik5se99v74qgGvV_Y4Y?purpose=inline',
    language: 'Kashmiri & Urdu',
    primaryTheme: 'Dal Lake & Wetland Ecological Healing',
    themeCategory: 'lake_wetland_ecology',
    observances: [
      'World Wetlands Day (February 2)',
      'World Environment Day (June 5)',
      'Himalayan Biodiversity Day (May 22)'
    ],
    kalamPoetOrSource: 'Mystical Eulogy on Hazratbal Sanctum & the Living Waters of Dal',
    musicalStyle: 'Soulful Qawwali / Sufi Chamber Orchestration with Santoor & Bamboo Flute',
    instrumentsUsed: ['Kashmiri Santoor', 'Bansuri (Bamboo Flute)', 'Harmonium', 'Tabla & Daf', 'Cellos and Viola'],
    poeticExcerptOriginal: 'حضرت بَلو پؠٹھہٕ وٕچھِو ڈَل کِتھ کٔنۍ چُھ رووان،\nآئی نہٕ زاہ صَفٲئی، صِرِف لالچ چھےٚ گۄڈنۍ وِتھان۔\nپَمپوش گٔے بیگان، ناگہٕ لۆسِ گٔے کَمزور۔',
    poeticExcerptTranslation: 'Gaze from Hazratbal upon how Dal Lake weeps in silent decline,\nPurity has slipped away as unchecked greed expands its borders.\nThe sacred lotus flowers grow rare; the living freshwater springs grow frail.',
    ecologicalDossier: 'Dal Lake is the ecological crown and cultural centerpiece of Srinagar, covering an open-water and marsh basin historically exceeding 25 sq km, now contracted to approximately 11.5 sq km of clear open water. Nutrient-rich inflows from agricultural runoff and domestic settlements around the Telbal catchment have accelerated cultural eutrophication, leading to explosive proliferation of invasive Azolla cristata, submerged weeds (Myriophyllum, Ceratophyllum), and progressive siltation of the lake bed. "Mirror of Hazratbal, Wound of Dal" invokes the sacred landscape of the Hazratbal shrine overlooking the lake, contrasting the divine reflection of the sanctum with the physical degradation of the waters below.',
    relatedScientificModules: [
      {
        title: 'Dal Lake Basin Ecosystem Observatory',
        category: 'Lakes & Basins',
        href: '/water-systems/lakes',
        description: 'Bathymetric maps, water volume calculations, floating vegetable garden dynamics, and water renewal rates.'
      },
      {
        title: 'Kashmir Ramsar Wetlands & Conservation Network',
        category: 'Wetlands',
        href: '/water-systems/wetlands',
        description: 'Hokersar, Mirgund, Shallabugh, and Wular: bird migration counts, weed harvesting telemetry, and buffer zone mapping.'
      },
      {
        title: 'Eutrophication & Macrophyte Intelligence Layer',
        category: 'Environmental Monitoring',
        href: '/environmental-monitoring/dashboards',
        description: 'Nitrate (NO3) and orthophosphate (PO4) concentrations, chlorophyll-a remote sensing, and trophic state indices.'
      }
    ],
    outdoorClassroomActivity: {
      activityTitle: 'Secchi Disk Transparency & Macrophyte Zone Mapping in Dal Lake',
      recommendedTier: 'Intermediate Tier (14–15 Years) & Foundation Tier (11–13 Years)',
      curriculumLink: '/environmental-calendar/outdoor-classroom/curriculum',
      duration: '2.5 Hours Shikara-Based Field Lab',
      fieldHypothesis: 'Open-water pelagic basins in Dal Lake display greater light penetration (Secchi depth > 1.8 m) and balanced native charophyte flora, whereas enclosed bays with heavy houseboat concentrations show Secchi depth < 0.9 m and high invasive weed density.',
      materialsNeeded: [
        'Standard 20 cm black-and-white Secchi disk with calibrated metric rope',
        'Water thermometer',
        'Plant specimen jars for macrophyte voucher pressing',
        'Field guide to Kashmir Wetland Macrophytes (EcoWatch Field Guide #4)',
        'Audio recording of "Mirror of Hazratbal, Wound of Dal"'
      ],
      fieldworkMethod: '1. Embark on a licensed field study tour from Hazratbal jetty to Nagin basin via Mirbehri.\n2. Lower Secchi disk on the shady side of the boat; record disappearance and reappearance depths.\n3. Sample surface water temperature and document macrophyte species composition (Nelumbo nucifera, Nymphaea alba, Potamogeton crispus, Azolla).\n4. Discuss the cultural and spiritual responsibility of keeping the lake mirror clear.\n5. Produce an illustrated "State of the Dal" field report comparing findings to Lake Conservation and Management Authority (LCMA) historical records.',
      measurableLearningOutcome: 'Students determine trophic state parameters through physical transparency measurement and link aquatic botany to cultural stewardship.'
    },
    verifiedSufiPulseRelease: true
  }
];

export const ECOVOICES_COLLABORATION_FRAMEWORK = {
  title: 'EcoVoices: Scientific Knowledge Meets Creative Stewardship',
  coFounders: ['Kashmir EcoWatch', 'SufiPulse USA'],
  sufiPulseRole: {
    title: 'Music Publisher & Cultural Arts Contributor',
    description: 'SufiPulse USA (sufipulse.com) serves as the canonical publisher, composer, and rights holder for all musical works, lyrical arrangements, master recordings, and artistic media. SufiPulse maintains absolute ownership and artistic autonomy over all musical releases.',
    responsibilities: [
      'Original music composition, studio production, and high-fidelity mastering',
      'Curation of authentic Sufi kalam, classical Kashmiri verses, and contemporary ecological lyrics',
      'Artisan and musical contributor rights management and digital licensing',
      'Publishing and hosting official audio/video media on sufipulse.com and international streaming platforms'
    ]
  },
  ecoWatchRole: {
    title: 'Environmental Science & Pedagogical Outreach Platform',
    description: 'Kashmir EcoWatch (kashmir-ecowatch.com) serves as the independent scientific authority, educational curriculum architect, and environmental observatory. EcoWatch anchors each musical piece to verified scientific data and field diagnostics.',
    responsibilities: [
      'Thematic classification and scientific validation of environmental themes',
      'Development of Outdoor Classroom student field sheets, teacher guides, and hypotheses',
      'Linking songs to real-time water quality, forest canopy, and river gauge telemetry',
      'Integrating music into official United Nations and Kashmir Environmental Calendar observances',
      'Facilitating student creative writing, ecological poetry, and community stewardship projects'
    ]
  },
  institutionalBoundary: 'Neither organization compromises its core mandate: SufiPulse remains a cultural music publisher, while Kashmir EcoWatch remains an uncompromised, non-commercial scientific research and monitoring platform. No advertising, commercial promotion, or sponsored product placement compromises the ecological integrity of either platform.'
};

export interface SufiPulseCreativePathway {
  id: string;
  name: string;
  title: string;
  canonicalUrl: string;
  roleType: 'contributor_application' | 'curated_publication';
  summary: string;
  detailedScope: string;
  primaryLanguages: string[];
  eligibleFormats: string[];
  sufiPulseRole: string;
  badgeLabel: string;
}

export const SUFIPULSE_CREATIVE_PATHWAYS: SufiPulseCreativePathway[] = [
  {
    id: 'writers',
    name: 'Ahl-e-Qalam',
    title: 'Writers & Poets',
    canonicalUrl: 'https://sufipulse.com/writers',
    roleType: 'contributor_application',
    badgeLabel: 'Application Open',
    summary: 'Develop original ecological songs, poetry, and lyrical compositions about glaciers, lakes, rivers, forests, and Western Himalayan stewardship.',
    detailedScope: 'Open to writers composing in Kashmiri, Urdu, English, Hindi, and regional dialects. Submissions can range from classical Kashmiri vakh/shruk idioms and Sufiana kalam to contemporary free verse and secular conservation anthems.',
    primaryLanguages: ['Kashmiri (Koshur)', 'Urdu', 'English', 'Hindi', 'Pahari / Shina / Balti'],
    eligibleFormats: ['Poem / Kalam', 'Song Lyrics', 'Choral Libretto', 'Spoken Word Script'],
    sufiPulseRole: 'Editorial review, lyrical refinement, composition commissioning, and rights agreements.'
  },
  {
    id: 'vocalists',
    name: 'Ahl-e-Sada',
    title: 'Vocalists & Singers',
    canonicalUrl: 'https://sufipulse.com/vocalists',
    roleType: 'contributor_application',
    badgeLabel: 'Auditions Open',
    summary: 'Interpret and record approved environmental compositions in contemporary, traditional, Sufiana, acoustic folk, and choral arrangements.',
    detailedScope: 'Vocal performers and soloists are invited to audition with a vocal sample or demo. Selected vocalists are matched with curated ecological poetry and recorded in studio for official release.',
    primaryLanguages: ['Kashmiri', 'Urdu', 'English', 'Multilingual'],
    eligibleFormats: ['Vocal Demo / Audio Sample', 'A cappella Recording', 'Studio Track'],
    sufiPulseRole: 'Vocal auditions, studio recording sessions, vocal production, and audio mastering.'
  },
  {
    id: 'producers',
    name: 'Ahl-e-Naghma',
    title: 'Producers & Composers',
    canonicalUrl: 'https://sufipulse.com/producers',
    roleType: 'contributor_application',
    badgeLabel: 'Commissioning Open',
    summary: 'Compose melodies, orchestrate instrumental arrangements, engineer soundscapes, and produce complete environmental musical works.',
    detailedScope: 'Open to music directors, studio arrangers, audio engineers, and sound designers skilled in blending Western Himalayan acoustic instruments with modern orchestral and ambient textures.',
    primaryLanguages: ['Universal Acoustic / Music'],
    eligibleFormats: ['Instrumental Demo', 'Full Arrangement Draft', 'Field Soundscape Composition'],
    sufiPulseRole: 'Studio infrastructure, master recording production, mixing, and digital distribution.'
  },
  {
    id: 'instrumentalists',
    name: 'Saaz-kaaran',
    title: 'Instrumentalists & Master Musicians',
    canonicalUrl: 'https://sufipulse.com/producers',
    roleType: 'contributor_application',
    badgeLabel: 'Performer Roster',
    summary: 'Distinct participation pathway for virtuosos of the Kashmiri Santoor, Rabab, Bansuri (bamboo flute), Saaz, Sarangi, percussion, and acoustic strings.',
    detailedScope: 'Inviting instrumental masters and emerging players to contribute acoustic tracks, organic meditative drones, and solo accompaniment for environmental songs.',
    primaryLanguages: ['Acoustic Instrumental'],
    eligibleFormats: ['Solo Instrumental Audio', 'Ensemble Recording', 'Acoustic Drone Sample'],
    sufiPulseRole: 'Session tracking, acoustic engineering, artist attribution, and performance licensing.'
  },
  {
    id: 'literary_contributors',
    name: 'Ahl-e-Tahreer',
    title: 'Literary Contributors & Essayists',
    canonicalUrl: 'https://sufipulse.com/literary-contributors',
    roleType: 'contributor_application',
    badgeLabel: 'Editorial Intake',
    summary: 'Author environmental essays, philosophical reflections on nature, indigenous ecological memory, and creative interpretations of science.',
    detailedScope: 'Connecting Western Himalayan field research with literary craft. Scholars, environmentalists, cultural historians, and thinkers write in-depth essays on valley ecology.',
    primaryLanguages: ['English', 'Urdu', 'Kashmiri'],
    eligibleFormats: ['Reflective Essay (1,000–3,500 words)', 'Ecological Memoir', 'Field Commentary'],
    sufiPulseRole: 'Literary editorial intake, peer critique, copyediting, and anthological curation.'
  },
  {
    id: 'literary_journal',
    name: 'Ahl-e-Tahreer Publication',
    title: 'Literary Journal & Ecological Archive',
    canonicalUrl: 'https://sufipulse.com/literary-journal',
    roleType: 'curated_publication',
    badgeLabel: 'Curated Publication Destination',
    summary: 'The official published journal showcasing selected poems, essays, and ecological critiques. (Note: A publishing destination, not an application role).',
    detailedScope: 'Once literary and poetic works complete editorial review, they are formally published in the SufiPulse Literary Journal with permanent archival attribution and educational citations.',
    primaryLanguages: ['Multilingual Edition'],
    eligibleFormats: ['Published Quarterly Volumes', 'Digital Archive Editions'],
    sufiPulseRole: 'Final volume design, ISBN/ISSN archival publication, and global reader distribution.'
  }
];

export interface EnvironmentalThemeRegistryItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  scopeSummary: string;
  scientificHref: string;
  kashmirContext: string;
  recommendedStyles: string[];
}

export const ECOVOICES_ENVIRONMENTAL_THEMES: EnvironmentalThemeRegistryItem[] = [
  {
    id: 'glaciers_snow',
    number: 'THEME-01',
    title: 'Glaciers, Cryosphere & Snowpack',
    subtitle: 'Headwaters of the Western Himalaya & Climate Sentinels',
    scopeSummary: 'Rapid ablation of Kolahoi and Machoi glaciers, retreating snowlines, and early spring melt runoff anomalies.',
    scientificHref: '/water-systems/glaciers',
    kashmirContext: 'Over 80% of Kashmir summer river flow originates from cryospheric melt. Poetic witness to vanishing snowfields.',
    recommendedStyles: ['Meditative Santoor Drones', 'Choral Requiem', 'Classical Kashmiri Lament']
  },
  {
    id: 'lakes_wetlands',
    number: 'THEME-02',
    title: 'Lakes & Wetlands (Dal, Wular, Nagin & Hokersar)',
    subtitle: 'Sacred Mirrors, Floating Gardens & Eutrophication Defense',
    scopeSummary: 'Nutrient loading (nitrate/phosphate), macrophyte choking, siltation of Wular, and houseboat untreated effluents.',
    scientificHref: '/water-systems/lakes',
    kashmirContext: 'Dal Lake is the cultural heart of Srinagar. Creative works evoke the sacred mirror of Hazratbal and riparian healing.',
    recommendedStyles: ['Sufiana Qalam', 'Acoustic Folk Anthems', 'Reflective Environmental Essays']
  },
  {
    id: 'rivers_springs',
    number: 'THEME-03',
    title: 'Rivers & Springs (Jhelum & Sacred Nagas)',
    subtitle: 'Kashmir Lifeline, Floodplain Memory & Karst Aquifers',
    scopeSummary: 'Reduced carrying capacity of the Jhelum (Vyeth), riverbed gravel mining, and degradation of village freshwater springs.',
    scientificHref: '/water-systems/rivers',
    kashmirContext: 'From Verinag spring through Srinagar to the Baramulla gorge, the Jhelum carries three millennia of literary memory.',
    recommendedStyles: ['Sufi River Laments', 'Rabab & Flute Ballads', 'Oral History Narratives']
  },
  {
    id: 'forests_trees',
    number: 'THEME-04',
    title: 'Forests & Heritage Trees (Fir, Deodar & Chinar)',
    subtitle: 'Old-Growth Subalpine Canopies & The Living Shrines of Kashmir',
    scopeSummary: 'Abies pindrow and Pinus wallichiana canopy density, treeline shifts, and legal protection of mature heritage Chinars.',
    scientificHref: '/protected-network',
    kashmirContext: 'Sheikh Noor-ud-Din declared "Ann Poshi Teli Yeli Van Poshi" (Food will thrive only while forests thrive).',
    recommendedStyles: ['Classical Kashmiri Shruks', 'Wind Harmonics', 'Contemporary Eco-Poetry']
  },
  {
    id: 'biodiversity_wildlife',
    number: 'THEME-05',
    title: 'Biodiversity & Endangered Wildlife',
    subtitle: 'Hangul Deer, Western Tragopan & Western Himalayan Ichthyofauna',
    scopeSummary: 'Critical winter habitat in Dachigam for Cervus hanglu hanglu, high-altitude pheasant nesting, and native snow trout.',
    scientificHref: '/biodiversity',
    kashmirContext: 'Hangul is the state animal and Western Himalayan icon, surviving under intensive habitat fragmentation.',
    recommendedStyles: ['Storytelling Songs', 'Youth Chants', 'Nature Ballads']
  },
  {
    id: 'climate_change',
    number: 'THEME-06',
    title: 'Climate Change & Alpine Vulnerability',
    subtitle: 'Shifting Precipitation, Warmer Winters & Mountain Risk',
    scopeSummary: 'Thermal satellite analysis of microclimates, winter drought spikes (Chilai Kalan disruptions), and erratic hail cycles.',
    scientificHref: '/risk-monitoring/climate-change',
    kashmirContext: 'Kashmir apple orchards and saffron terraces are already experiencing altered phenological flowering windows.',
    recommendedStyles: ['Contemporary Spoken Word', 'Modern Acoustic Song', 'Scientific Poetry']
  },
  {
    id: 'pollution_waste',
    number: 'THEME-07',
    title: 'Pollution, Toxic Effluents & Solid Waste',
    subtitle: 'Downtown Srinagar Drainage, Industrial Mordants & Plastic Litter',
    scopeSummary: 'Untreated municipal stormwater channels, chemical dye effluents in downtown canals, and single-use plastic clogging.',
    scientificHref: '/risk-monitoring/water-pollution',
    kashmirContext: 'Urban tributaries like Doodh Ganga and Khushalsar suffer from heavy localized anthropogenic contamination.',
    recommendedStyles: ['Protest Poetry', 'Fast-Paced Percussive Songs', 'Youth Spoken Word']
  },
  {
    id: 'ecological_restoration',
    number: 'THEME-08',
    title: 'Ecological Restoration & Nature-Based Solutions',
    subtitle: 'Willow-Reed Root Enclosures, Wetland Dredging & Reforestation',
    scopeSummary: 'Community soil bio-engineering, native riparian planting (Salix, Phragmites), and spring recharge protection.',
    scientificHref: '/water-systems/restoration',
    kashmirContext: 'Restoring historic flood spill channels and wetland retention buffers to protect Srinagar from catastrophic floods.',
    recommendedStyles: ['Inspirational Anthem', 'Community Choir Songs', 'Educational Lyrics']
  },
  {
    id: 'environmental_ethics',
    number: 'THEME-09',
    title: 'Environmental Ethics, Mysticism & Sacred Custody',
    subtitle: 'Lalleshwari Vakhs, Sufi Ecological Principles & Universal Responsibility',
    scopeSummary: 'The moral imperatives of stewardship: water as a living legal witness ("Aab-e-Hayat") and intergenerational equity.',
    scientificHref: '/environmental-calendar',
    kashmirContext: 'Centuries of syncretic Kashmiri philosophy rooted in profound environmental reverence across all communities.',
    recommendedStyles: ['Sacred Kalam', 'Sufiana Symphony', 'Philosophical Essays']
  },
  {
    id: 'himalayan_heritage',
    number: 'THEME-10',
    title: 'Western Himalayan Living Heritage & Seasons',
    subtitle: 'Traditional Water Mills, Agrarian Seasons & Nomadic Pastoralism',
    scopeSummary: 'The seasonal rhythms of Kashmir: Navreh, Badamwari bloom, Harud harvest, Wandha winter, and pastoral high-altitude migrations.',
    scientificHref: '/trails-sightings/protected-area-trails',
    kashmirContext: 'Gujjars, Bakarwals, and valley agrarians whose lives are intricately woven into mountain seasonal phenology.',
    recommendedStyles: ['Folk Songs (Wanwun)', 'Rabab & Daf Ballads', 'Cultural Memoirs']
  }
];

export const YOUTH_ECOVOICES_FRAMEWORK = {
  title: 'Youth EcoVoices: Schools, Colleges & Young Artists',
  tagline: 'Empowering the next generation of Western Himalayan environmental storytellers',
  ageGroups: [
    { tier: 'Junior Eco-Chant (Ages 8–12)', format: 'Classroom nature poems, school choir chants, riparian memory sketches' },
    { tier: 'Youth Anthems (Ages 13–18)', format: 'Original acoustic songs, spoken word poetry, river quality field memoirs' },
    { tier: 'University & Collegiate (Ages 18–25)', format: 'In-depth essays, full instrumental compositions, multilingual songs' }
  ],
  guardianSafeguardPolicy: 'All submissions from participants under 18 years of age must be submitted under the supervision of a verified school teacher, academic principal, or legal guardian. Student contact details are kept strictly confidential and will never be published or shared commercially.',
  educationalIntegration: 'Selected youth works are featured during Kashmir Environmental Calendar observances, published in the student library, and performed in the Outdoor Classroom.'
};
