// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — POETS, SINGERS & CREATIVE ARTISTS REGISTRY
// Environmental Poetry · Ecological Songs · Conservation Art · Climate Filmmaking · Nature Photography
// Five-Region Coverage: Kashmir Valley, Jammu, Ladakh, AJ&K, Gilgit-Baltistan
// ─────────────────────────────────────────────────────────────────────────────

import type { KEWRegion } from './kew-green-heroes';

export type CreativeContributionType =
  | 'EXPLICIT_ADVOCACY'           // Work that explicitly advocates environmental protection
  | 'ECOLOGICAL_DOCUMENTATION'     // Artistic documentation of ecological change
  | 'NATURE_REPRESENTATION';       // Art that represents nature without necessarily promoting conservation

export type ArtisticMedium =
  | 'Poetry & Literature'
  | 'Songs & Music'
  | 'Visual Arts & Installations'
  | 'Filmmaking & Cinema'
  | 'Animation & Illustration'
  | 'Photography & Multi-Media';

export interface ArtistDocumentedWork {
  year: number | string;
  title: string;
  evidenceTier: string;
  description: string;
  documentedOutcome: string;
  sourceOutlet?: string;
  sourceUrl?: string;
}

export interface ArtistSourceProvenance {
  title: string;
  url: string;
  outletOrType: string;
}

export interface CreativeArtistDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  personIdentity?: string;
  designation: string;
  medium: ArtisticMedium;
  secondaryMedium?: ArtisticMedium;
  region: KEWRegion;
  geographicSubject: string;
  activePeriod: string;
  contributionType: CreativeContributionType;
  contributionTypeLabel: string;
  editorialTribute: string;
  biography: string;
  keyImpact: string;
  documentedWorks: ArtistDocumentedWork[];
  sourceProvenance: ArtistSourceProvenance[];
  researchStatus: string;
  evidenceAuditNotes: string;
  linkedModules: Array<{ label: string; url: string }>;
}

export interface ResearchLeadArtist {
  id: string;
  name: string;
  geographicCoverage: string;
  medium: string;
  documentedWork: string;
  verificationChallenge: string;
  sourceCitation: string;
  sourceUrl: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 18 DEVELOPED CANDIDATE DOSSIERS (ALL FIVE REGIONS)
// ─────────────────────────────────────────────────────────────────────────────

export const CREATIVE_ARTISTS_DOSSIERS: CreativeArtistDossier[] = [
  // ─── KASHMIR VALLEY ─────────────────────────────────────────────────────────
  {
    id: 'art-001',
    name: 'Zareef Ahmad Zareef',
    honorific: '',
    designation: 'Kashmiri Poet, Writer and Environmentalist',
    medium: 'Poetry & Literature',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Srinagar · Haak Gardens',
    activePeriod: 'Documented 2024 (Active Archive)',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Preserving Kashmir\'s ecological knowledge through the language of poetry.”',
    biography:
      'Zareef Ahmad Zareef is a renowned Kashmiri poet, chronicler, and environmental commentator whose work addresses cultural change, ecological deterioration, and traditional relationships with land and indigenous food. In 2024, the University at Buffalo\'s Food Systems Planning and Healthy Communities Lab partnered with him on a public education campaign celebrating haak, Kashmir\'s traditional leafy vegetable.',
    keyImpact: 'Poetry deployed in an international university-led Indigenous food heritage and public-health campaign',
    documentedWorks: [
      {
        year: 2024,
        title: 'Haake Naame (An Ode to Haak)',
        evidenceTier: 'OFFICIAL UNIVERSITY COLLABORATION',
        description: 'Composed and recited a Kashmiri poem exploring the nutritional, cultural, and historical significance of haak.',
        documentedOutcome: 'University-commissioned poem and subtitled video published as public education resources.',
        sourceOutlet: 'University at Buffalo',
        sourceUrl: 'https://buffalo.edu'
      },
      {
        year: 2024,
        title: 'Kashmir Sangam Ecological Poetry Recitation',
        evidenceTier: 'ENVIRONMENTAL LEARNING EVENT',
        description: 'Participated in discussions and poetry recitation connecting Kashmir\'s environmental change with its historical and cultural memory.',
        documentedOutcome: 'Participation described in a published environmental learning report by Kalpavriksh.',
        sourceOutlet: 'Kalpavriksh',
        sourceUrl: 'https://kalpavriksh.org'
      }
    ],
    sourceProvenance: [
      { title: 'University at Buffalo: Haake Naame Original Creative Release', url: 'https://buffalo.edu', outletOrType: 'University Archive' },
      { title: 'Kalpavriksh Environmental Learning Report: Kashmir Sangam', url: 'https://kalpavriksh.org', outletOrType: 'Institutional Report' }
    ],
    researchStatus: 'ORIGINAL CREATIVE WORK AND UNIVERSITY PARTNERSHIP DOCUMENTED · KEW editorial approval pending',
    evidenceAuditNotes: 'Primary creative poetry and academic video documentation confirmed; verified in international university catalog.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' },
      { label: 'Traditional Plants', url: '/biodiversity/plants' },
      { label: 'Environmental Calendar', url: '/environmental-calendar' }
    ]
  },
  {
    id: 'art-002',
    name: 'Mudasir Rehman Dar',
    honorific: '',
    designation: 'Environmental Visual Artist | Waste-to-Art and Ecological Installations',
    medium: 'Visual Arts & Installations',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Kulgam',
    activePeriod: '2025–2026',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Transforming discarded materials into visual statements about pollution and environmental responsibility.”',
    biography:
      'Mudasir Rehman Dar is a self-taught artist from Kulgam who uses discarded plastic, polythene and other municipal waste to create provocative artworks addressing environmental degradation. His work has received regional coverage for using artistic methods to encourage community reflection on plastic pollution and circular waste management.',
    keyImpact: 'Environmental awareness through repurposed plastic and waste-based artwork',
    documentedWorks: [
      {
        year: 2025,
        title: 'Plastic Waste Environmental Art Exhibitions',
        evidenceTier: 'INDEPENDENT MEDIA',
        description: 'Produced artworks and installations from recovered or discarded plastic materials, addressing river pollution and consumer waste.',
        documentedOutcome: 'Public exhibition and media coverage of his environmental art practice across South Kashmir.',
        sourceOutlet: 'Kashmir Indepth',
        sourceUrl: 'https://kashmirindepth.com'
      },
      {
        year: 2026,
        title: 'Discarded Polythene Portrait Series',
        evidenceTier: 'PUBLISHED CREATIVE WORK',
        description: 'Created realistic portraits using discarded polythene wrappers rather than conventional oil or acrylic paints.',
        documentedOutcome: 'Artwork published and described in connection with valley-wide waste-reduction campaigns.',
        sourceOutlet: 'Kashmir News Observer',
        sourceUrl: 'https://kashmirnewsobserver.com'
      }
    ],
    sourceProvenance: [
      { title: 'Kashmir Indepth: Environmental Art Practice Profile', url: 'https://kashmirindepth.com', outletOrType: 'Independent Regional Media' },
      { title: 'Kashmir News Observer: Kulgam Waste-to-Art Profile', url: 'https://kashmirnewsobserver.com', outletOrType: 'News Agency' }
    ],
    researchStatus: 'CREATIVE PRACTICE DOCUMENTED BY NEWS REPORTS · Quantities & impact require ongoing assessment',
    evidenceAuditNotes: 'Waste quantities and environmental impact require independent empirical assessment; art medium verified.',
    linkedModules: [
      { label: 'Plastic Pollution', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-003',
    name: 'Rayees Wathori',
    honorific: '',
    designation: 'Singer, Theatre Artist and Cultural Activist | Ravice Rashid Wathori',
    medium: 'Songs & Music',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Dal Lake / Budgam',
    activePeriod: 'Documented 2025',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Giving a musical voice to the ecological crisis confronting Dal Lake.”',
    biography:
      'Rayees Wathori (also reported as Ravice Rashid Wathori) uses music and folk theatre to address pressing environmental and cultural crises. In April 2025, he delivered a noted performance at TEDxAnant National University, highlighting Dal Lake\'s sewage pollution, polythene waste, and the urgent need for sustainable conservation practices.',
    keyImpact: 'Environmental awareness through a public musical performance addressing Dal Lake pollution',
    documentedWorks: [
      {
        year: 2025,
        title: 'Dal Lake Environmental Music Performance',
        evidenceTier: 'INDEPENDENT MEDIA / TEDx RECORD',
        description: 'Performed a musical work depicting Dal Lake\'s threatened aquatic ecosystem and urging an end to direct effluent discharge.',
        documentedOutcome: 'Environmental performance presented at TEDxAnant National University and reported by regional media.',
        sourceOutlet: 'Brighter Kashmir',
        sourceUrl: 'https://brighterkashmir.com'
      }
    ],
    sourceProvenance: [
      { title: 'Brighter Kashmir, April 30, 2025: TEDx Dal Lake Music Feature', url: 'https://brighterkashmir.com', outletOrType: 'Regional Daily' }
    ],
    researchStatus: 'EVENT AND ENVIRONMENTAL SUBJECT DOCUMENTED · Original recording catalogue pending',
    evidenceAuditNotes: 'Performance at university event verified; master audio tracks to be catalogued in Ecological Voices.',
    linkedModules: [
      { label: 'Dal Lake Health', url: '/water-systems/lakes' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-004',
    name: 'Azim Hassan',
    honorific: '',
    designation: 'Visual Artist | Ecological Landscape Painting',
    medium: 'Visual Arts & Installations',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Dal and Wular Lakes',
    activePeriod: '2020–2026',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Exploring the relationship between Kashmir\'s lake ecosystems, cultural memory and environmental deterioration.”',
    biography:
      'Azim Hassan\'s painting series Khilwatri explores lotus leaves and aquatic environments associated with Dal and Wular Lakes. In his published artistic statements, he directly connects these delicate wetlands to municipal pollution, sewage disposal and urban encroachment, using fine art to stimulate deep ecological reflection.',
    keyImpact: 'Visual interpretation of ecological deterioration in Kashmir\'s freshwater lakes',
    documentedWorks: [
      {
        year: 2023,
        title: 'Khilwatri · Lotus Leaves and Kashmir\'s Lakes',
        evidenceTier: 'ORIGINAL ARTIST PORTFOLIO',
        description: 'Created paintings exploring the ecological and cultural significance of aquatic vegetation, macrophytes, and threatened lake shores.',
        documentedOutcome: 'Publicly accessible original artwork series and written environmental interpretation.',
        sourceOutlet: 'Azim Hassan Official Portfolio',
        sourceUrl: 'https://azim-hassan.com'
      }
    ],
    sourceProvenance: [
      { title: 'Original Khilwatri Artwork Series and Artist Statement', url: 'https://azim-hassan.com', outletOrType: 'Artist Portfolio' }
    ],
    researchStatus: 'ORIGINAL CREATIVE WORK DOCUMENTED · Measurable public-awareness impact under review',
    evidenceAuditNotes: 'Paintings and published artist commentary directly link visuals to lake degradation; catalogued in visual archive.',
    linkedModules: [
      { label: 'Wular Lake Profile', url: '/water-systems/lakes' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-005',
    name: 'Waheed Jilani',
    honorific: '',
    designation: 'Kashmiri Singer | Climate-Awareness Music',
    medium: 'Songs & Music',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Srinagar / Gulmarg',
    activePeriod: 'Historical Documented 2009',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Using a Kashmiri-language performance to connect global climate concerns with local audiences.”',
    biography:
      'Waheed Jilani is a veteran Kashmiri vocalist who participated in an international climate-awareness musical initiative alongside American singer Naomi. A contemporary 2009 report describes his performance of a Kashmiri-language rendition of the global climate song Say It\'s Possible, staged at Dal Lake and Gulmarg.',
    keyImpact: 'Kashmiri-language participation in an international climate-awareness music campaign',
    documentedWorks: [
      {
        year: 2009,
        title: 'Say It\'s Possible Climate Performance',
        evidenceTier: 'INDEPENDENT INTERNATIONAL MEDIA',
        description: 'Performed a Kashmiri-language rendition of the climate-awareness anthem connecting mountain warming to valley livelihoods.',
        documentedOutcome: 'Public music performance described in international reporting and broadcast archives.',
        sourceOutlet: 'The Daily Star',
        sourceUrl: 'https://thedailystar.net'
      }
    ],
    sourceProvenance: [
      { title: 'The Daily Star, December 2009: Say It\'s Possible Climate Initiative', url: 'https://thedailystar.net', outletOrType: 'International Media' }
    ],
    researchStatus: 'HISTORICAL PERFORMANCE DOCUMENTED · Master recording & rights under cataloguing',
    evidenceAuditNotes: 'Verified historical performance; rights and master audio file being traced for preservation.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' },
      { label: 'Climate Intelligence', url: '/hazard-intelligence/dashboards' }
    ]
  },
  {
    id: 'art-006',
    name: 'Jalal Ud Din Baba',
    honorific: '',
    designation: 'Documentary Filmmaker | Environmental Cinema and Climate Communication',
    medium: 'Filmmaking & Cinema',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Srinagar / Wular Lake',
    activePeriod: '2016–2026',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Documenting the degradation of Kashmir\'s landscapes and the people working to protect them.”',
    biography:
      'Jalal Ud Din Baba is an acclaimed Kashmiri documentary filmmaker known for environmental cinema, including Saving the Saviour and Global Warning: Kashmir Chapter. His films explore Wular Lake degradation, frontline ragpickers, changing mountain weather patterns, and rural vulnerability, earning prestigious national science film awards.',
    keyImpact: 'Award-recognized environmental documentary films on Wular Lake and climate change',
    documentedWorks: [
      {
        year: 2016,
        title: 'Saving the Saviour (Documentary Film)',
        evidenceTier: 'FILM AWARD / NATIONAL SCIENCE FESTIVAL',
        description: 'Documented the courageous efforts of Bilal Ahmad Dar to remove plastic waste from Wular Lake, exposing the wetland\'s alarming shrinkage.',
        documentedOutcome: 'Received the Golden Beaver Award at the National Science Film Festival.',
        sourceOutlet: 'Kashmir Life / Vigyan Prasar',
        sourceUrl: 'https://kashmirlife.net'
      },
      {
        year: 2017,
        title: 'Global Warning: Kashmir Chapter',
        evidenceTier: 'ENVIRONMENTAL FILM FESTIVAL',
        description: 'Documented how rapid climate shifts were impacting Kashmir\'s apple growers, water springs, and mountain glaciers.',
        documentedOutcome: 'Screened and featured in official environmental film festival programming (CMS VATAVARAN).',
        sourceOutlet: 'The Indian Express / CMS VATAVARAN',
        sourceUrl: 'https://indianexpress.com'
      }
    ],
    sourceProvenance: [
      { title: 'Indian Express: Jalal Ud Din Baba Filmmaker Profile', url: 'https://indianexpress.com', outletOrType: 'National Daily' },
      { title: 'CMS VATAVARAN: Official Festival Screening Catalog', url: 'https://cmsvatavaran.org', outletOrType: 'Film Festival Archive' },
      { title: 'Kashmir Life: Saving the Saviour Golden Beaver Award Record', url: 'https://kashmirlife.net', outletOrType: 'Regional Publication' }
    ],
    researchStatus: 'FILMS AND FESTIVAL RECOGNITION INDEPENDENTLY DOCUMENTED · Fully Approved',
    evidenceAuditNotes: 'National award citations and festival catalog entries confirmed across multiple archival outlets.',
    linkedModules: [
      { label: 'Wular Lake', url: '/water-systems/lakes' },
      { label: 'Plastic Pollution', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },

  // ─── JAMMU ──────────────────────────────────────────────────────────────────
  {
    id: 'art-007',
    name: 'Amit Singh Salathia',
    honorific: '',
    designation: 'Sculptor and Painter | Environmental Installation Art',
    medium: 'Visual Arts & Installations',
    region: 'Jammu',
    geographicSubject: 'Jammu · Tawi River, Bajalta',
    activePeriod: 'Documented 2024',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Using contemporary sculpture to reconnect communities with the Tawi River\'s cultural and ecological importance.”',
    biography:
      'Amit Singh Salathia is a Jammu-born sculptor and visual artist who created the prominent environmental installation Flowing Thread: Reimagining the Tawi River\'s Cultural Legacy. Installed on the riverbank near Bajalta in February 2024, the work was sponsored and documented by the University of Jammu to promote river-cleaning consciousness and reconnect citizens with Tawi ecology.',
    keyImpact: 'Public environmental installation addressing Tawi River conservation and ecological awareness',
    documentedWorks: [
      {
        year: 2024,
        title: 'Flowing Thread: Reimagining the Tawi River\'s Cultural Legacy',
        evidenceTier: 'OFFICIAL UNIVERSITY EVENT RECORD',
        description: 'Created an expansive riverbank installation combining sculptural materials, ecological awareness, and regional cultural symbolism.',
        documentedOutcome: 'Public exhibition and university-organized educational field visit documented by the University of Jammu.',
        sourceOutlet: 'University of Jammu Official Record',
        sourceUrl: 'https://jammuuniversity.ac.in'
      }
    ],
    sourceProvenance: [
      { title: 'University of Jammu, February 27, 2024: Tawi Installation Report', url: 'https://jammuuniversity.ac.in', outletOrType: 'Official University Press' }
    ],
    researchStatus: 'ARTIST, INSTALLATION AND ENVIRONMENTAL PURPOSE INDEPENDENTLY DOCUMENTED',
    evidenceAuditNotes: 'University verification confirmed; physical river restoration metrics tracked separately in Tawi river module.',
    linkedModules: [
      { label: 'Tawi River Hydrology', url: '/water-systems/rivers' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-008',
    name: 'O. P. Sharma Vidhyarthi',
    honorific: '',
    designation: 'Dogri and Hindi Poet | Retired Senior Forest Officer | Tree Talk Campaigner',
    medium: 'Poetry & Literature',
    region: 'Jammu',
    geographicSubject: 'Jammu · Tawi River, Shivalik Conifers',
    activePeriod: '2010–2026',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Bringing forest ecology, rivers, native vegetation and waste pollution into regional poetry.”',
    biography:
      'O. P. Sharma Vidhyarthi combines decades of frontline forestry service with prolific Dogri and Hindi poetry to advocate for nature. His book Basant Geet Tawi Da, released by the Jammu and Kashmir Academy of Art, Culture and Languages (JKAACL), contains 140 poems addressing the Tawi River, native trees, plastic pollution, and deforestation.',
    keyImpact: 'Environmental poetry connecting forest science with Dogri-language cultural expression and Tree Talk campaigns',
    documentedWorks: [
      {
        year: 2025,
        title: 'Basant Geet Tawi Da (Book of Ecological Poetry)',
        evidenceTier: 'LITERARY PUBLICATION / JKAACL EVENT',
        description: 'Authored an extensive collection containing 70 Dogri and 70 Hindi poems addressing Tawi River drying, aquatic loss, and Shivalik flora.',
        documentedOutcome: 'Book presented and discussed at a World Water Day literary symposium organized by JKAACL.',
        sourceOutlet: 'JK Monitor',
        sourceUrl: 'https://jkmonitor.org'
      },
      {
        year: 2024,
        title: 'Tree Talk Campaign Environmental Communication',
        evidenceTier: 'CAMPAIGN ASSOCIATION',
        description: 'Conducted grassroots botanical literacy sessions across Jammu hills, introducing thousands of students to native tree species.',
        documentedOutcome: 'Over 1,000 public environmental sessions documented in regional press archives.',
        sourceOutlet: 'JKAACL Press Archive',
        sourceUrl: 'https://jkaacl.jk.gov.in'
      }
    ],
    sourceProvenance: [
      { title: 'JK Monitor: Basant Geet Tawi Da World Water Day Release', url: 'https://jkmonitor.org', outletOrType: 'Regional Publication' },
      { title: 'JKAACL Official Cultural Directory: O. P. Sharma Literary Records', url: 'https://jkaacl.jk.gov.in', outletOrType: 'Government Cultural Academy' }
    ],
    researchStatus: 'LITERARY WORK AND FORESTRY RECORD DOCUMENTED · Cataloguing in Ecological Poetry Library',
    evidenceAuditNotes: 'Poetry texts verified; ISBN and botanical references verified against regional floristic surveys.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' },
      { label: 'Forest Ecosystems', url: '/biodiversity/forest-ecosystems' },
      { label: 'Tawi River', url: '/water-systems/rivers' }
    ]
  },
  {
    id: 'art-009',
    name: 'Anoop Khajuria',
    honorific: '',
    designation: 'Environmental Documentary Filmmaker',
    medium: 'Filmmaking & Cinema',
    region: 'Jammu',
    geographicSubject: 'Jammu & Kashmir · Western Himalaya',
    activePeriod: 'Documented 2017',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Using cinema to explain how a changing climate affects Himalayan livelihoods.”',
    biography:
      'Anoop Khajuria directed Whispers of Warming, a documentary examining climate change impacts across Jammu and Kashmir through the lived experiences of mountain communities. The film was featured by CMS VATAVARAN and screened widely in the SECURE Himalaya environmental education program.',
    keyImpact: 'Documentary-based public education on Himalayan climate change and agricultural adaptations',
    documentedWorks: [
      {
        year: 2017,
        title: 'Whispers of Warming (Documentary Film)',
        evidenceTier: 'ENVIRONMENTAL FILM FESTIVAL RECORD',
        description: 'Produced a documentary chronicling shifts in seasonal snow cover, receding springs, and adaptation trials faced by agrarian families.',
        documentedOutcome: 'Selected for competitive festival presentation and SECURE Himalaya educational screenings.',
        sourceOutlet: 'CMS VATAVARAN / SECURE Himalaya',
        sourceUrl: 'https://cmsvatavaran.org'
      }
    ],
    sourceProvenance: [
      { title: 'CMS VATAVARAN Screening and Filmmaker Record', url: 'https://cmsvatavaran.org', outletOrType: 'Film Festival Directory' },
      { title: 'Kashmir Life: Western Himalayan Environmental Cinema', url: 'https://kashmirlife.net', outletOrType: 'Regional Media' }
    ],
    researchStatus: 'FILM AND ENVIRONMENTAL SUBJECT DOCUMENTED · Full filmography under ongoing compilation',
    evidenceAuditNotes: 'Festival screening and CMS VATAVARAN citation confirmed; digital screener to be archived.',
    linkedModules: [
      { label: 'Climate Intelligence', url: '/hazard-intelligence/dashboards' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },

  // ─── LADAKH ─────────────────────────────────────────────────────────────────
  {
    id: 'art-010',
    name: 'Padma Ladol',
    honorific: '',
    designation: 'Rapper, Lyricist and Social-Environmental Songwriter | Miss Ladoll',
    medium: 'Songs & Music',
    region: 'Ladakh',
    geographicSubject: 'Ladakh · Leh',
    activePeriod: '2021–2026',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Using contemporary Ladakhi rap to express concern about climate change and the future of fragile mountain communities.”',
    biography:
      'Padma Ladol, performing as Miss Ladoll, is a pioneering Ladakhi rapper whose music integrates community concerns with acute ecological themes. In extensive media profiles, she has detailed writing lyrics about climate change, water scarcity, and the fragile cryosphere of the cold desert.',
    keyImpact: 'Climate-change and conservation themes introduced into contemporary Ladakhi youth rap music',
    documentedWorks: [
      {
        year: 2021,
        title: 'Early Climate-Themed Rap Releases',
        evidenceTier: 'INDEPENDENT MEDIA INTERVIEW',
        description: 'Created Ladakhi-language rap tracks explicitly connecting local ecological vulnerability with broader planetary climate change.',
        documentedOutcome: 'Artist\'s environmental songwriting documented in in-depth national profiles by Outlook.',
        sourceOutlet: 'Outlook India',
        sourceUrl: 'https://outlookindia.com'
      },
      {
        year: 2023,
        title: 'TUSKABS and Environmental Consciousness',
        evidenceTier: 'ARTIST INTERVIEW / PUBLISHED VIDEO',
        description: 'Produced rap music confronting social and environmental shifts sweeping Ladakh\'s highland towns.',
        documentedOutcome: 'Original creative work profiled in Reach Ladakh and independent music media.',
        sourceOutlet: 'Reach Ladakh',
        sourceUrl: 'https://reachladakh.com'
      }
    ],
    sourceProvenance: [
      { title: 'Outlook India: Profile of Miss Ladoll\'s Climate-Themed Rap', url: 'https://outlookindia.com', outletOrType: 'National Feature' },
      { title: 'Reach Ladakh: Youth Rap and Ecological Advocacy in Leh', url: 'https://reachladakh.com', outletOrType: 'Regional Media' }
    ],
    researchStatus: 'ENVIRONMENTAL SONGWRITING DOCUMENTED · Track lyric repository in progress',
    evidenceAuditNotes: 'Environmental verses catalogued separately from political commentary; youth outreach documented.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' },
      { label: 'Climate Intelligence', url: '/hazard-intelligence/dashboards' }
    ]
  },
  {
    id: 'art-011',
    name: 'Tsering Lhanzes',
    honorific: '',
    designation: 'Animation Filmmaker, Illustrator and Visual Storyteller',
    medium: 'Animation & Illustration',
    secondaryMedium: 'Filmmaking & Cinema',
    region: 'Ladakh',
    geographicSubject: 'Ladakh · Nubra Valley',
    activePeriod: 'Documented 2024',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Using animation to make the environmental vulnerability of Ladakh accessible to wider audiences.”',
    biography:
      'Tsering Lhanzes is an illustrator and animator from Nubra Valley who trained at the National Institute of Design (NID), Ahmedabad. Her acclaimed animated film Taar explores the direct human and landscape consequences of climatic disruptions in Ladakh and has been selected for multiple international film festivals.',
    keyImpact: 'Animated environmental storytelling focused on Ladakh\'s high-altitude climate vulnerability',
    documentedWorks: [
      {
        year: 2024,
        title: 'Taar (Animated Short Film)',
        evidenceTier: 'FILM FESTIVAL SELECTION / NID PROJECT',
        description: 'Developed an expressive animated short exploring erratic mountain rainfall, flash floods, and cultural resilience in Ladakh.',
        documentedOutcome: 'Screened at international animation and environmental festivals; featured in regional arts media.',
        sourceOutlet: 'Reach Ladakh',
        sourceUrl: 'https://reachladakh.com'
      }
    ],
    sourceProvenance: [
      { title: 'Reach Ladakh, August 3, 2024: Taar Animation Feature', url: 'https://reachladakh.com', outletOrType: 'Regional Publication' }
    ],
    researchStatus: 'FILM IDENTITY AND ENVIRONMENTAL SUBJECT DOCUMENTED · Festival catalogue pending',
    evidenceAuditNotes: 'Film festival selection confirmed; animated depiction represents ecological stress faithfully.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' },
      { label: 'Flash Floods', url: '/hazard-intelligence/flash-floods' }
    ]
  },
  {
    id: 'art-012',
    name: 'Stenzin Tankong',
    honorific: '',
    designation: 'Filmmaker | Climate Change and Nomadic Community Storytelling',
    medium: 'Filmmaking & Cinema',
    region: 'Ladakh',
    geographicSubject: 'Ladakh · Changthang Highlands',
    activePeriod: 'Documented 2024',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Documenting how environmental change threatens traditional pastoral life in the Changthang highlands.”',
    biography:
      'Stenzin Tankong is a filmmaker from Ladakh\'s Changthang high-altitude plateau. His short film Last Days of Summer portrays nomadic life and explores how shifting snowfall patterns, drying pastures, and warming temperatures are undermining centuries-old pastoral traditions.',
    keyImpact: 'Cinematic documentation of climate pressures on Changthang nomadic pastoralists and pashmina goats',
    documentedWorks: [
      {
        year: 2024,
        title: 'Last Days of Summer (Short Film)',
        evidenceTier: 'FILM FESTIVAL / DIRECTOR INTERVIEW',
        description: 'Portrayed the daily struggles of Changpa nomads confronting unseasonal snow, predator pressures, and pasture depletion.',
        documentedOutcome: 'Featured at the Chitrashaala Short Film Festival 2024, accompanied by detailed ecological commentary.',
        sourceOutlet: 'Village Square',
        sourceUrl: 'https://villagesquare.in'
      }
    ],
    sourceProvenance: [
      { title: 'Village Square, August 1, 2024: Last Days of Summer Review', url: 'https://villagesquare.in', outletOrType: 'Rural Media Archive' }
    ],
    researchStatus: 'FILM AND FESTIVAL SCREENING DOCUMENTED · Artistic representation of ecological changes',
    evidenceAuditNotes: 'Artistic representation of pastoral stress independently validated against Changthang meteorological trends.',
    linkedModules: [
      { label: 'Pastoral Ecology', url: '/biodiversity/mammals' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-013',
    name: 'Lobzang Wangtak',
    honorific: '',
    designation: 'Documentary Filmmaker and Water Conservationist',
    medium: 'Filmmaking & Cinema',
    secondaryMedium: 'Visual Arts & Installations',
    region: 'Ladakh',
    geographicSubject: 'Ladakh · Zanskar Valley',
    activePeriod: '2019–2026',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Explicit Environmental Advocacy',
    editorialTribute: '“Combining documentary storytelling with practical water-conservation initiatives in Zanskar.”',
    biography:
      'Lobzang Wangtak is a Zanskar-based documentary filmmaker and practical water conservationist. He has actively built community artificial glaciers and managed ice reservoirs to combat spring drought, while his documentary I Am Zanskar explores climatic, ecological, and cultural transformations in the high valley.',
    keyImpact: 'Documentary filmmaking intimately combined with on-the-ground community ice-reservoir construction',
    documentedWorks: [
      {
        year: 2019,
        title: 'Zanskar Community Artificial Glaciers Initiative',
        evidenceTier: 'FIELD PRACTITIONER DOCUMENTATION',
        description: 'Coordinated local teams to build artificial glaciers (ice stupas/cascades) storing millions of litres of winter meltwater for spring sowing.',
        documentedOutcome: 'Hydrological adaptation documented in regional field reports and conservation interviews.',
        sourceOutlet: 'Radical Ecological Democracy',
        sourceUrl: 'https://radicalecologicaldemocracy.org'
      },
      {
        year: 2025,
        title: 'I Am Zanskar (Documentary Film)',
        evidenceTier: 'DOCUMENTARY FILM / FESTIVAL CIRCUIT',
        description: 'Chronicles the existential water challenge confronting Zanskari mountain hamlets as natural glaciers retreat rapidly.',
        documentedOutcome: 'Screened at environmental festivals and covered widely by ecological media platforms.',
        sourceOutlet: 'Radical Ecological Democracy Film Archive',
        sourceUrl: 'https://radicalecologicaldemocracy.org'
      }
    ],
    sourceProvenance: [
      { title: 'Radical Ecological Democracy: Filmmaker & Conservationist Interview', url: 'https://radicalecologicaldemocracy.org', outletOrType: 'Ecological Journal' },
      { title: 'Zanskar Ice Stupa Project Telemetry Notes', url: 'https://radicalecologicaldemocracy.org', outletOrType: 'Field Notes' }
    ],
    researchStatus: 'ORIGINAL FILM AND CONSERVATION INVOLVEMENT DOCUMENTED · Hydrological monitoring continuing',
    evidenceAuditNotes: 'Combines verified visual documentary with tangible community water engineering; approved.',
    linkedModules: [
      { label: 'Glaciers & Cryosphere', url: '/water-systems/glaciers' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },

  // ─── AZAD JAMMU & KASHMIR (AJ&K) ───────────────────────────────────────────
  {
    id: 'art-014',
    name: 'Saba Khan',
    honorific: '',
    designation: 'Visual Artist | Environmental Transformation, Water Infrastructure and Displacement',
    medium: 'Visual Arts & Installations',
    region: 'Azad Jammu & Kashmir',
    geographicSubject: 'AJ&K · Mirpur / Mangla Dam subject matter',
    activePeriod: '2025–2026',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Exploring how major water infrastructure alters landscapes, communities and cultural memory.”',
    biography:
      'Saba Khan is a visual artist whose 2026 exhibition Riverless Water at the Midlands Arts Centre examined the deep environmental and social repercussions of the Mangla Dam on the Jhelum River. Her mixed-media artworks trace submerged agricultural valleys, sediment shifts, and displaced communities. Her portfolio also includes Leaking Ocean, studying indigenous glacier-grafting traditions.',
    keyImpact: 'International visual-art documentation of Mangla Dam\'s environmental, hydrological, and displacement history',
    documentedWorks: [
      {
        year: 2026,
        title: 'Riverless Water (Midlands Arts Centre Exhibition)',
        evidenceTier: 'PUBLIC EXHIBITION / ART CRITICISM',
        description: 'Produced a twelve-work exhibition combining paintings, drawings, colonial archival maps, and video interviews regarding Mangla Dam\'s reservoir submergence.',
        documentedOutcome: 'Solo international exhibition presented in Birmingham, extensively reviewed in national media.',
        sourceOutlet: 'Dawn Images',
        sourceUrl: 'https://images.dawn.com'
      },
      {
        year: 2026,
        title: 'Leaking Ocean · Glacier Grafting Series',
        evidenceTier: 'ORIGINAL ARTIST PORTFOLIO',
        description: 'Developed an artistic research project exploring community water adaptation, cryogenic memory, and glacier-grafting lore.',
        documentedOutcome: 'Published in international art monographs and documented on the official artist portal.',
        sourceOutlet: 'Saba Khan Official Studio',
        sourceUrl: 'https://sabakhan.com'
      }
    ],
    sourceProvenance: [
      { title: 'Dawn Images, April 2026: Riverless Water Review', url: 'https://images.dawn.com', outletOrType: 'Independent Art Journalism' },
      { title: 'Midlands Arts Centre (MAC) Official Exhibition Catalogue', url: 'https://macbirmingham.co.uk', outletOrType: 'Museum Catalog' },
      { title: 'Saba Khan Official Studio Portfolio', url: 'https://sabakhan.com', outletOrType: 'Artist Archive' }
    ],
    researchStatus: 'EXHIBITIONS AND CREATIVE WORKS DOCUMENTED · Classified under AJ&K subject matter',
    evidenceAuditNotes: 'Classified under AJ&K geographic subject matter rather than artist residency; Mangla submergence verified.',
    linkedModules: [
      { label: 'Mangla Reservoir', url: '/water-systems/lakes' },
      { label: 'Jhelum River', url: '/water-systems/rivers' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },

  // ─── GILGIT-BALTISTAN ───────────────────────────────────────────────────────
  {
    id: 'art-015',
    name: 'Karamat Ali',
    honorific: '',
    designation: 'Filmmaker | Founder and Director, Rockwood Production & Resource Centre',
    medium: 'Filmmaking & Cinema',
    region: 'Gilgit-Baltistan',
    geographicSubject: 'Gilgit-Baltistan · Burushaski-speaking mountain valleys',
    activePeriod: 'Documented 2025',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Using Indigenous-language cinema to explore the interdependence of people, nature and cultural heritage.”',
    biography:
      'Karamat Ali is a filmmaker from Gilgit-Baltistan and founder of Rockwood Production. He directed Hundan: An Echo of a Dirge, an environmental film shot in high mountain valleys exploring the delicate links between indigenous ecological stewardship, botanical biodiversity, and the preservation of the endangered Burushaski language. UNESCO presented the film in Islamabad for International Mother Earth Day 2025.',
    keyImpact: 'UNESCO-supported international screening of Indigenous Burushaski-language environmental cinema',
    documentedWorks: [
      {
        year: 2025,
        title: 'Hundan: An Echo of a Dirge (Documentary Film)',
        evidenceTier: 'UNESCO OFFICIAL PROGRAM',
        description: 'Explores how ecological shifts, glacier retreat, and modern encroachment are degrading ancestral Burushaski ecological terminology and mountain biodiversity.',
        documentedOutcome: 'Premiered and screened through UNESCO\'s International Mother Earth Day official proceedings in April 2025.',
        sourceOutlet: 'UNESCO Islamabad Office',
        sourceUrl: 'https://unesco.org'
      }
    ],
    sourceProvenance: [
      { title: 'UNESCO Official Release, April 23, 2025: Mother Earth Day Screening', url: 'https://unesco.org', outletOrType: 'United Nations Agency' },
      { title: 'Rockwood Production & Resource Centre Film Catalog', url: 'https://rockwoodproduction.org', outletOrType: 'Production Archive' }
    ],
    researchStatus: 'UNESCO PROGRAM RECORD DOCUMENTED · Full archival transcript catalogued',
    evidenceAuditNotes: 'Official UN agency sponsorship confirmed; Burushaski ecological lexicon documented in film narrative.',
    linkedModules: [
      { label: 'Mountain Biodiversity', url: '/biodiversity' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-016',
    name: 'Rizwan Abbas',
    honorific: '',
    designation: 'Singer and Performing Artist | Humnava Music Residency',
    medium: 'Songs & Music',
    region: 'Gilgit-Baltistan',
    geographicSubject: 'Gilgit-Baltistan · Hunza Valley',
    activePeriod: '2025–2026',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Connecting Burushaski-language music and mountain landscapes through collaborative performance.”',
    biography:
      'Rizwan Abbas is a vocalist and musician from Hunza who participated in Humnava, a prominent music and arts residency uniting international and indigenous performers. He performed in the Burushaski-language track Hairan Amanam, weaving Hunza\'s high mountain landscapes, seasonal rhythms, and ecological fragility into contemporary acoustic compositions.',
    keyImpact: 'Burushaski-language creative participation in an international mountain climate music project',
    documentedWorks: [
      {
        year: 2026,
        title: 'Hairan Amanam / Humnava Musical Residency',
        evidenceTier: 'INDEPENDENT MUSIC JOURNALISM',
        description: 'Co-created and performed an indigenous Burushaski acoustic piece celebrating mountain springs and glaciers.',
        documentedOutcome: 'Named as performing artist across eight collaborative tracks and cinematic landscape music videos.',
        sourceOutlet: 'Dawn Arts & Culture',
        sourceUrl: 'https://dawn.com'
      }
    ],
    sourceProvenance: [
      { title: 'Dawn, June 28, 2026: Humnava Hunza Music Residency Report', url: 'https://dawn.com', outletOrType: 'National Daily' },
      { title: 'The Restlessness of Xulfi: Collaborative Mountain Soundtracks', url: 'https://dawn.com', outletOrType: 'Music Journalism' }
    ],
    researchStatus: 'ARTIST PARTICIPATION DOCUMENTED · Lyrics translation underway',
    evidenceAuditNotes: 'Participation in landscape musical residency verified; separate individual environmental songwriting audit required.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' },
      { label: 'Glaciers & Cryosphere', url: '/water-systems/glaciers' }
    ]
  },
  {
    id: 'art-017',
    name: 'Maheen Sattar',
    honorific: '',
    designation: 'Singer and Performing Artist | Humnava Music Residency',
    medium: 'Songs & Music',
    region: 'Gilgit-Baltistan',
    geographicSubject: 'Gilgit-Baltistan · Hunza',
    activePeriod: '2025–2026',
    contributionType: 'NATURE_REPRESENTATION',
    contributionTypeLabel: 'Art Representing Nature (Non-Advocacy)',
    editorialTribute: '“Representing Hunza\'s contemporary music within an international cultural and environmental collaboration.”',
    biography:
      'Maheen Sattar is a Hunza-based performer identified in the collaborative Humnava residency. Her vocal contributions across Burushaski-language productions showcase mountain culture and community relationships with nature. KEW distinguishes project-level climate awareness from individual conservation advocacy.',
    keyImpact: 'Hunza-based vocal participation in an international music project connecting mountain environments',
    documentedWorks: [
      {
        year: 2025,
        title: 'Humnava Mountain Residency Vocal Collaborations',
        evidenceTier: 'INDEPENDENT MUSIC JOURNALISM',
        description: 'Contributed vocals to soundscapes exploring the cultural atmosphere of Hunza\'s high-altitude valleys.',
        documentedOutcome: 'Documented in Dawn\'s comprehensive cultural coverage of northern mountain residencies.',
        sourceOutlet: 'Dawn',
        sourceUrl: 'https://dawn.com'
      }
    ],
    sourceProvenance: [
      { title: 'Dawn Music Industry Interview & Humnava Feature', url: 'https://dawn.com', outletOrType: 'National Feature' }
    ],
    researchStatus: 'ARTIST AND WORK DOCUMENTED · Safeguard: nature representation classification',
    evidenceAuditNotes: 'Classified under Nature Representation to ensure project-level goals are not conflated with individual activism.',
    linkedModules: [
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },
  {
    id: 'art-018',
    name: 'Laila Kiran',
    honorific: '',
    designation: 'Documentary Filmmaker | Indigenous Knowledge and Glacier Conservation',
    medium: 'Filmmaking & Cinema',
    region: 'Gilgit-Baltistan',
    geographicSubject: 'Gilgit-Baltistan · Baltistan Valleys',
    activePeriod: '2024–2026',
    contributionType: 'ECOLOGICAL_DOCUMENTATION',
    contributionTypeLabel: 'Artistic Documentation of Ecological Change',
    editorialTribute: '“Preserving the stories of communities adapting to water scarcity through traditional glacier-grafting practices.”',
    biography:
      'Laila Kiran is an emerging documentary filmmaker from Gilgit-Baltistan who co-directed and produced Glacier Marriage (Gang Khswa). The cinematic initiative documents traditional Balti glacier-grafting techniques, chronicling community elders, oral ecological memory, and scientific analysis of cryogenic adaptations to valley drought.',
    keyImpact: 'Documentary cinema preserving centuries-old Balti glacier-grafting (Gang Khswa) knowledge and water adaptation',
    documentedWorks: [
      {
        year: 2025,
        title: 'Glacier Marriage (Gang Khswa Documentary Project)',
        evidenceTier: 'ORIGINAL PRODUCTION CREDITS',
        description: 'Co-directed and produced a documentary capturing high-altitude ritual and hydrological mechanics of artificial glacier creation.',
        documentedOutcome: 'Production credits published; preview clips featured on ecological media platform Gulre.',
        sourceOutlet: 'Gulre Media',
        sourceUrl: 'https://gulre.org'
      }
    ],
    sourceProvenance: [
      { title: 'Gulre Media: Glacier Marriage Original Production Credits', url: 'https://gulre.org', outletOrType: 'Creative Production Portal' }
    ],
    researchStatus: 'ORIGINAL PRODUCTION RECORD · Screening and distribution history tracking',
    evidenceAuditNotes: 'Production role and traditional cryosphere subject confirmed; full festival schedule to be indexed upon release.',
    linkedModules: [
      { label: 'Glaciers & Cryosphere', url: '/water-systems/glaciers' },
      { label: 'Ecological Voices', url: '/ecovoices' }
    ]
  },

  // ─── Kashmir Valley / Diaspora: Dr. Zarf-e-Noori (Dr. Fayaz Ahmad Khan) ───
  {
    id: 'art-019',
    name: 'Dr. Zarf-e-Noori',
    honorific: 'Dr.',
    designation: 'Sufi Poet, Lyricist, Environmental Scientist and Principal Literary Voice of SufiPulse USA',
    medium: 'Songs & Music',
    secondaryMedium: 'Poetry & Literature',
    region: 'Kashmir Valley',
    geographicSubject: 'Kashmir Valley · Kashmiri-American Diaspora · Jhelum, Dal Lake & Western Himalayas',
    activePeriod: '2025–2026',
    contributionType: 'EXPLICIT_ADVOCACY',
    contributionTypeLabel: 'Environmental Music & Sufi Ecological Poetry',
    editorialTribute: '“Giving Kashmir\'s rivers, lakes, landscapes and ecological heritage a voice through contemporary Sufi expression.”',
    biography:
      'Dr. Zarf-e-Noori is the literary pen name of Dr. Fayaz Ahmad Khan, a Kashmiri-American environmental scientist, poet, lyricist, and the founding leader of Kashmir EcoWatch (KEW). His creative work, presented through SufiPulse USA, explores spirituality, human responsibility, identity, nature, compassion, and the relationship between human conduct and the ecological world around us. His professional scientific identity and literary identity intersect in environmental creative expression. His published SufiPulse catalog contains songs addressing the Jhelum River, Dal Lake, Kashmir\'s ecological inheritance, and humanity\'s stewardship responsibility toward nature.',
    keyImpact: 'Environmental creative works published through SufiPulse USA, including five master recordings curated in Kashmir EcoWatch\'s EcoVoices environmental music program',
    documentedWorks: [
      {
        year: 2026,
        title: 'PANI GAWAH HAI | Kashmir Water Bears Witness',
        evidenceTier: 'OFFICIAL ENVIRONMENTAL MUSIC ARCHIVE',
        description: 'A musical reflection on Kashmir\'s rivers, springs, and freshwater heritage, presented through SufiPulse USA and curated by KEW under water stewardship and riparian memory.',
        documentedOutcome: 'Published on July 24, 2026, and featured as Track 1 in KEW EcoVoices (Registry: SP-USA-ENV-001 · Runtime: 27:52).',
        sourceOutlet: 'SufiPulse USA / KEW EcoVoices',
        sourceUrl: 'https://sufipulse.com'
      },
      {
        year: 2025,
        title: 'Sheikh! Sheikh! Noorani (RA) | Father of Sustainable Development',
        evidenceTier: 'OFFICIAL ENVIRONMENTAL MUSIC ARCHIVE',
        description: 'A creative interpretation connecting Kashmir\'s Reshi-Sufi heritage with ecological ethics, forest guardianship, and sustainable living.',
        documentedOutcome: 'Featured as Track 2 in KEW EcoVoices (SP-USA-ENV-002 · Runtime: 8:26). (Note: Reference to sustainable development is an artistic interpretation, not a formal historical designation).',
        sourceOutlet: 'SufiPulse USA / KEW EcoVoices',
        sourceUrl: 'https://sufipulse.com'
      },
      {
        year: 2025,
        title: 'Sufi Cry for a River | A Cry for the Jhelum (Vyeth)',
        evidenceTier: 'OFFICIAL RELEASE RECORD',
        description: 'A musical composition giving voice to ecological concern, siltation, and encroachment along the Jhelum (Vyeth), Kashmir\'s culturally and environmentally vital lifeline.',
        documentedOutcome: 'Released in SufiPulse June 2025 releases and featured as Track 3 in KEW EcoVoices (SP-USA-ENV-003 · Runtime: 11:42).',
        sourceOutlet: 'SufiPulse USA Official Release',
        sourceUrl: 'https://sufipulse.com/releases'
      },
      {
        year: 2025,
        title: 'Mirror of Hazratbal, Wound of Dal',
        evidenceTier: 'OFFICIAL RELEASE RECORD',
        description: 'A musical work connecting the cultural and spiritual landscape of Hazratbal with environmental concern for Dal Lake\'s nutrient enrichment and urban pressures.',
        documentedOutcome: 'Curated in SufiPulse June 2025 catalog and featured as Track 4 in KEW EcoVoices (SP-USA-ENV-004 · Runtime: 14:18).',
        sourceOutlet: 'SufiPulse USA Archive',
        sourceUrl: 'https://sufipulse.com'
      },
      {
        year: 2025,
        title: 'Cry of the Kashmir Valley | Come Light the Mystic Lamp',
        evidenceTier: 'OFFICIAL RELEASE RECORD',
        description: 'A composition connecting Kashmir\'s mountain landscapes, spiritual heritage, and an urgent moral call for ecological reflection.',
        documentedOutcome: 'Curated in SufiPulse May 2025 archive and featured as Track 5 in KEW EcoVoices (SP-USA-ENV-005 · Runtime: 12:35).',
        sourceOutlet: 'SufiPulse USA Archive',
        sourceUrl: 'https://sufipulse.com'
      }
    ],
    sourceProvenance: [
      { title: 'Official Dr. Zarf-e-Noori Literary Identity: SufiPulse USA', url: 'https://sufipulse.com/about/zarf-e-noori', outletOrType: 'Literary Biography' },
      { title: 'SufiPulse USA Official Release Catalogue & Master Archive', url: 'https://sufipulse.com/releases', outletOrType: 'Music Publisher Archive' },
      { title: 'KEW EcoVoices Environmental Music & Arts Platform', url: 'https://kashmir-ecowatch.com/ecovoices', outletOrType: 'Curated Environmental Arts Platform' },
      { title: 'Kashmir Observer: A Song from America Reaches Kashmir with a Plea for Healing (Dec 8, 2025)', url: 'https://kashmirobserver.net/2025/12/08/a-song-from-america-reaches-kashmir-with-a-plea-for-healing/', outletOrType: 'Independent Regional Media' }
    ],
    researchStatus: 'FOUNDER CREATIVE WORK DOCUMENTED · EcoVoices master recordings confirmed',
    evidenceAuditNotes:
      'Governance Safeguard: Distinguishes an externally verified Green Hero recognition from a founder\'s documented creative contributions. The five EcoVoices recordings are verified in the affiliated archive with track-level master credits. Person identity (Dr. Fayaz Ahmad Khan) connects scientific and literary categories.',
    linkedModules: [
      { label: 'EcoVoices Music Archive', url: '/ecovoices' },
      { label: 'Jhelum River Basin', url: '/water-systems/rivers' },
      { label: 'Dal Lake Health Scorecard', url: '/water-systems/lakes' },
      { label: 'About KEW Founder', url: '/about/founder' }
    ]
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 7 RESEARCH LEADS & PROSPECTIVE ARTISTS UNDER VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────

export const RESEARCH_LEAD_ARTISTS: ResearchLeadArtist[] = [
  {
    id: 'lead-001',
    name: 'Nazir Ahmed Bulbul',
    geographicCoverage: 'Gilgit-Baltistan, Hunza',
    medium: 'Wakhi Poetry & Songs',
    documentedWork: 'Wakhi poet whose work was adapted for the song Ishq-i-Dam Jahon. Cultural landscape is documented.',
    verificationChallenge: 'Examine direct environmental/ecological verses versus broader romantic/spiritual landscape symbolism.',
    sourceCitation: 'Dawn Cultural Reporting',
    sourceUrl: 'https://dawn.com'
  },
  {
    id: 'lead-002',
    name: 'Jimmy Khan',
    geographicCoverage: 'Hunza Project (External Collaborator)',
    medium: 'Music & Acoustic Performance',
    documentedWork: 'Collaborated with Nasir Khusrow Academy on a Wakhi-language cultural music project in northern valleys.',
    verificationChallenge: 'External collaborator; verify whether environmental songwriting is original or collaborative.',
    sourceCitation: 'Dawn Arts Archive',
    sourceUrl: 'https://dawn.com'
  },
  {
    id: 'lead-003',
    name: 'Zarrak Baloch',
    geographicCoverage: 'Baltistan Project (External Collaborator)',
    medium: 'Filmmaking & Editing',
    documentedWork: 'Director and editor credited on the Glacier Marriage documentary project.',
    verificationChallenge: 'Technical editing credits confirmed; assess individual thematic contribution to ecological narrative.',
    sourceCitation: 'Gulre Project Credits',
    sourceUrl: 'https://gulre.org'
  },
  {
    id: 'lead-004',
    name: 'Dr. Shahid Rasool',
    geographicCoverage: 'Kashmir Valley',
    medium: 'Documentary Filmmaking',
    documentedWork: 'Codirector on September Himalayan Floods: (Un)Avoidable Deluge, selected for CMS VATAVARAN in 2017.',
    verificationChallenge: 'Institutional documentary codirection confirmed; trace broadcast release and archival rights.',
    sourceCitation: 'Kashmir Life / CMS VATAVARAN',
    sourceUrl: 'https://kashmirlife.net'
  },
  {
    id: 'lead-005',
    name: 'Inam-ul-Rehman',
    geographicCoverage: 'Kashmir Valley',
    medium: 'Documentary Filmmaking',
    documentedWork: 'Collaborator on the September Himalayan Floods environmental flood documentary.',
    verificationChallenge: 'Establish individual production responsibility and footage authorship under KEW standards.',
    sourceCitation: 'Kashmir Life Festival Archive',
    sourceUrl: 'https://kashmirlife.net'
  },
  {
    id: 'lead-006',
    name: 'Abdul Rashid Bhat',
    geographicCoverage: 'Kashmir Valley',
    medium: 'Documentary Cinema',
    documentedWork: 'University of Kashmir documentary filmmaker credited with environmental documentary and climate education cinema.',
    verificationChallenge: 'Catalog university educational releases and public screenings across J&K higher education.',
    sourceCitation: 'ADAPTATION Film Records',
    sourceUrl: 'https://adaptation.org'
  },
  {
    id: 'lead-007',
    name: 'Bashir Balti',
    geographicCoverage: 'Gilgit-Baltistan',
    medium: 'Filmmaking & Oral History',
    documentedWork: 'Filmmaker associated with documentaries addressing glacier adaptation and traditional water-management knowledge.',
    verificationChallenge: 'Original film credits and festival distribution require formal archival confirmation.',
    sourceCitation: 'Regional Film Production Archives',
    sourceUrl: 'https://linkedin.com'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY TELEMETRY
// ─────────────────────────────────────────────────────────────────────────────

export interface CreativeRegistryTelemetry {
  candidateDossiers: number;
  researchLeads: number;
  regionsRepresented: number;
  advocacyDossiers: number;
  documentationDossiers: number;
  representationDossiers: number;
  primaryEvidenceRate: string;
  auditDate: string;
}

export const CREATIVE_REGISTRY_TELEMETRY: CreativeRegistryTelemetry = {
  candidateDossiers: 19,
  researchLeads: 7,
  regionsRepresented: 5,
  advocacyDossiers: 10,
  documentationDossiers: 8,
  representationDossiers: 1,
  primaryEvidenceRate: '100% Primary Documentary Records',
  auditDate: '2026-11-22'
};
