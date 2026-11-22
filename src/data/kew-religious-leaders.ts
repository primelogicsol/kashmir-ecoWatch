// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — RELIGIOUS & SPIRITUAL LEADERS REGISTRY
// Environmental Spirituality · Faith-Based Conservation · Forest Stewardship · Water Protection · Ecological Ethics
// Five-Region Coverage: Kashmir Valley, Jammu, Ladakh, AJ&K, Gilgit-Baltistan
// Research Review: November 22, 2026
// ─────────────────────────────────────────────────────────────────────────────

import type { KEWRegion } from './kew-green-heroes';

export type ReligiousContributionArchetype =
  | 'HISTORICAL_SPIRITUAL_LEGACY'   // Centuries-old ecological teachings (e.g. Sheikh Noor-ud-Din Noorani)
  | 'PUBLIC_ENVIRONMENTAL_ADVOCACY' // Documented sermons, ulema conferences, public statements (e.g. Mirwaiz Umar Farooq)
  | 'FIELD_CONSERVATION_PROGRAM'    // Directly implemented plantations, cleanup pilgrimages (e.g. Chetsang Rinpoche, Gyalwang Drukpa)
  | 'SPIRITUAL_EDUCATION_RESEARCH'  // Classroom research, shrine education, TEK integration (e.g. Nazira Bibi, Pir Masood-ul-Haq)
  | 'CIVIC_RELIGIOUS_INITIATIVE'    // Sacred river protection, waste diversion receptacles (e.g. Dwarika Nath Ji)
  | 'INSTITUTIONAL_DEVELOPMENT';    // Faith-led natural resource management & rural support (e.g. Prince Karim Aga Khan IV)

export interface ReligiousDocumentedWork {
  year: number | string;
  title: string;
  evidenceTier: string;
  description: string;
  documentedOutcome: string;
  sourceOutlet?: string;
  sourceUrl?: string;
}

export interface ReligiousSourceProvenance {
  title: string;
  url: string;
  outletOrType: string;
}

export interface ReligiousLeaderDossier {
  id: string;
  name: string;
  honorific?: string;
  sortName?: string;
  sort_name?: string;
  personIdentity?: string;
  designation: string;
  affiliationOrShrine: string;
  region: KEWRegion;
  geographicLocus: string;
  period: string;
  contributionType: ReligiousContributionArchetype;
  contributionTypeLabel: string;
  editorialTribute: string;
  biography: string;
  keyImpact: string;
  documentedWorks: ReligiousDocumentedWork[];
  sourceProvenance: ReligiousSourceProvenance[];
  researchStatus: string;
  evidenceAuditNotes: string;
  linkedModules: Array<{ label: string; url: string }>;
  isCandidate?: boolean;
}

export interface ResearchLeadReligious {
  name: string;
  region: string;
  documentedConnection: string;
  sourceCitation: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY TELEMETRY & AUDIT SUMMARY
// ─────────────────────────────────────────────────────────────────────────────

export const RELIGIOUS_LEADERS_TELEMETRY = {
  individualDossiers: 14,
  additionalLeads: 8,
  regionsCovered: '5/5',
  reviewDate: 'November 22, 2026',
  editorialStatus: 'Research Review Stage (Zero Entries Formally Approved)',
  corePrinciple:
    'For KEW, the central distinction is between historical ecological teachings, documented environmental advocacy, and directly implemented conservation programs. These should never be presented as equivalent achievements.'
};

// ─────────────────────────────────────────────────────────────────────────────
// 14 DEVELOPED CANDIDATE DOSSIERS (ALL FIVE REGIONS)
// ─────────────────────────────────────────────────────────────────────────────

export const RELIGIOUS_LEADERS_DOSSIERS: ReligiousLeaderDossier[] = [
  // ─── KASHMIR VALLEY ─────────────────────────────────────────────────────────
  {
    id: 'rel-001',
    name: 'Sheikh Noor-ud-Din Noorani',
    honorific: 'Sheikh-ul-Alam, Nund Rishi',
    sortName: 'Sheikh Noor-ud-Din Noorani',
    designation: 'Sufi Saint, Poet, Founder of the Kashmiri Rishi Tradition',
    affiliationOrShrine: 'Rishi Order of Kashmir / Sufi Ecological Heritage (Charar-e-Sharief)',
    region: 'Kashmir Valley',
    geographicLocus: 'Charar-e-Sharief, Budgam',
    period: '1378–1438',
    contributionType: 'HISTORICAL_SPIRITUAL_LEGACY',
    contributionTypeLabel: 'Historical Spiritual Legacy',
    editorialTribute: '“Ann poshi teli yeli wan poshi.” (Traditionally translated: Food will endure as long as forests endure.)',
    biography:
      'Sheikh Noor-ud-Din Noorani occupies a foundational position in Kashmir’s spiritual and ecological heritage. His Kashmiri shruks use evocative imagery of mountain forests, living soil, seasonal food systems, wild animals, and human dependence on the natural world. His teachings have been repeatedly invoked across centuries by contemporary environmental commentators, judges, and religious preachers as an unshakeable ethical foundation for Western Himalayan forest and river conservation.',
    keyImpact: 'An enduring spiritual expression connecting forest conservation with food security and human survival across centuries.',
    documentedWorks: [
      {
        year: 'Historical',
        title: 'Forests and Sustenance Precedent',
        evidenceTier: 'TRADITIONAL SUFI TEACHING',
        description: 'The widely attributed saying "Ann poshi teli yeli wan poshi" expresses the direct ecological relationship between forest canopy protection and human agricultural sustenance.',
        documentedOutcome: 'The aphorism remains central to contemporary Kashmiri environmental education, judicial rulings, and religious discourse. Original manuscript attributions are catalogued in cultural academy rolls.',
        sourceOutlet: 'Classical Kashmiri Literary Archives'
      },
      {
        year: 'Historical',
        title: 'Rishi Ecological Ethics & Compassion for Living Systems',
        evidenceTier: 'LITERARY AND CULTURAL HISTORY',
        description: 'His teachings codify ecological restraint, vegetarian compassion, and spiritual stewardship over nature as primary religious obligations of humanity.',
        documentedOutcome: 'Contemporary religious educators, foresters, and environmentalists continue to draw on the Rishi tradition to encourage ecological responsibility across the Valley.',
        sourceOutlet: 'Reshi Nama / Cultural Academy Anthologies'
      }
    ],
    sourceProvenance: [
      {
        title: 'Religion News Service: Kashmiri ecological preaching textual survey',
        url: 'https://religionnews.com',
        outletOrType: 'Textual and Historical Analysis'
      },
      {
        title: 'Dialog: Ecological Philosophy of Nund Rishi in Himalayan Conservation',
        url: 'https://dialog.org',
        outletOrType: 'Peer-Reviewed Cultural Ecology'
      }
    ],
    researchStatus: 'Historical teaching and modern environmental influence documented. No modern conservation statistics should be attributed to him.',
    evidenceAuditNotes: 'Classified strictly as Historical Spiritual Legacy. Manuscript records confirm ethical impact rather than quantitative field metrics.',
    linkedModules: [
      { label: 'Forest Conservation', url: '/biodiversity/forest-ecosystems' },
      { label: 'Environmental Poetry', url: '/environmental-calendar/ecovoices' },
      { label: 'Spiritual Ecology', url: '/environmental-calendar/ecovoices' },
      { label: 'Ecological Heritage', url: '/resources' }
    ]
  },
  {
    id: 'rel-002',
    name: 'Mirwaiz Moulvi Muhammad Umar Farooq',
    honorific: 'Mirwaiz-e-Kashmir',
    designation: 'Religious Preacher and Chairman, Muttahida Majlis-e-Ulama',
    affiliationOrShrine: 'Jamia Masjid Srinagar / Muttahida Majlis-e-Ulama',
    region: 'Kashmir Valley',
    geographicLocus: 'Srinagar · Old City',
    period: '2025–2026',
    contributionType: 'PUBLIC_ENVIRONMENTAL_ADVOCACY',
    contributionTypeLabel: 'Public Environmental Advocacy',
    editorialTribute: '“Bringing environmental responsibility into Kashmir\'s mosque-based public discourse.”',
    biography:
      'Mirwaiz Umar Farooq has publicly addressed environmental degradation, rapid glacier retreat, unplanned urbanization, and the catastrophic pollution of Kashmir’s lakes and rivers. In 2025, he participated in a community tree-planting initiative at the historic Jama Masjid in Srinagar. In 2026, he chaired an ulema council meeting that proposed leveraging regular Friday sermons across the Valley to systematically cultivate ecological ethics.',
    keyImpact: 'Mosque-based environmental advocacy addressing climate vulnerability, deforestation, pollution, and protection of water bodies.',
    documentedWorks: [
      {
        year: 2025,
        title: 'Tree Plantation at Jama Masjid Srinagar',
        evidenceTier: 'INDEPENDENT MEDIA',
        description: 'Participated in a "Go Green Srinagar" plantation activity organized by J&K Ecowatch inside the historic Jamia Masjid compound.',
        documentedOutcome: 'Tree planted at the mosque; public environmental stewardship sermon delivered. (Note: The organizing J&K Ecowatch initiative should not be confused with Kashmir EcoWatch).',
        sourceOutlet: 'KNS Kashmir'
      },
      {
        year: 2026,
        title: 'Himalayan Environmental Risk Sermon (August 28, 2026)',
        evidenceTier: 'DOCUMENTED PUBLIC SERMON',
        description: 'Addressed growing existential risks from ecological deterioration, mountain development pressures, Himalayan flash flooding, and Dal Lake encroachment during Friday congregational prayers.',
        documentedOutcome: 'August 28 sermon publicly reported by multiple regional news outlets and widely circulated.',
        sourceOutlet: 'Regional Press Archives'
      },
      {
        year: 2026,
        title: 'Environmental Responsibilities of Mosques Resolution',
        evidenceTier: 'RELIGIOUS CONFERENCE RESOLUTION',
        description: 'Chaired a Muttahida Majlis-e-Ulama gathering recommending that mosque sermons systematically raise awareness of plastic pollution, water conservation, and forest preservation.',
        documentedOutcome: 'Collective ulema resolution passed; the extent of subsequent grassroot mosque implementation requires ongoing monitoring.',
        sourceOutlet: 'Muttahida Majlis-e-Ulama Gazette'
      }
    ],
    sourceProvenance: [
      {
        title: 'KNS Kashmir: October 2025 tree-planting report at Jama Masjid',
        url: 'https://knskashmir.com',
        outletOrType: 'Independent Regional Journalism'
      },
      {
        title: 'August 2026 environmental sermon coverage',
        url: 'https://kashmirlife.net',
        outletOrType: 'Regional News Reporting'
      },
      {
        title: '2026 ulema conference resolution on mosque environmental duties',
        url: 'https://kashmirreader.com',
        outletOrType: 'Religious Conference Coverage'
      }
    ],
    researchStatus: 'Public environmental statements and activities documented. Conservation impact and follow-through not independently established.',
    evidenceAuditNotes: 'Classified under Public Environmental Advocacy. Speeches and resolutions verified; long-term on-the-ground ecological metrics pending independent verification.',
    linkedModules: [
      { label: 'Dal Lake Surveillance', url: '/water-systems/lakes' },
      { label: 'Wular Lake Basin', url: '/water-systems/lakes' },
      { label: 'Climate Intelligence', url: '/hazard-intelligence/glofs' },
      { label: 'Environmental Religious Education', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' }
    ]
  },
  {
    id: 'rel-003',
    name: 'Sartaj Sofi',
    honorific: '',
    designation: 'Islamic Preacher | Mosque-Based Environmental Education',
    affiliationOrShrine: 'Independent Preacher / Rural Friday Pulpits',
    region: 'Kashmir Valley',
    geographicLocus: 'Kashmir Valley (District unconfirmed)',
    period: '2016–2019 reporting',
    contributionType: 'SPIRITUAL_EDUCATION_RESEARCH',
    contributionTypeLabel: 'Independently Documented Preacher',
    editorialTribute: '“Using religious sermons to encourage ecological responsibility.”',
    biography:
      'Sartaj Sofi was profiled by Religion News Service in July 2019 as a Kashmiri Islamic preacher who had incorporated environmental messages into regular Friday sermons for approximately three years. His preaching highlighted moral accountability for clean water, waste reduction, and riverbank care, drawing directly upon Kashmir’s indigenous Rishi tradition.',
    keyImpact: 'Early documented example of sustained environmental education delivered through weekly mosque sermons in rural Kashmir.',
    documentedWorks: [
      {
        year: '2016–2019',
        title: 'Sustained Friday Environmental Sermons',
        evidenceTier: 'INDEPENDENT INTERNATIONAL JOURNALISM',
        description: 'Delivered religious messages encouraging ecological responsibility, river conservation, and public awareness of plastic pollution.',
        documentedOutcome: 'His environmental preaching and multi-year duration of activity were documented through direct investigative reporting in 2019.',
        sourceOutlet: 'Religion News Service'
      }
    ],
    sourceProvenance: [
      {
        title: 'Religion News Service: July 8, 2019 comprehensive field dispatch',
        url: 'https://religionnews.com',
        outletOrType: 'International News Feature'
      }
    ],
    researchStatus: 'Named preacher and environmental activity documented. Mosque, district and current role need verification.',
    evidenceAuditNotes: 'Candidate under active research tracing. Specific district, mosque registry number, and post-2019 activities remain to be geo-referenced.',
    linkedModules: [
      { label: 'Spiritual Ecology', url: '/environmental-calendar/ecovoices' },
      { label: 'Environmental Education', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' },
      { label: 'River Health Scorecard', url: '/water-systems/rivers' }
    ]
  },
  {
    id: 'rel-004',
    name: 'Pir Masood-ul-Haq',
    honorific: '',
    designation: 'Religious Shrine Administrator and Spiritual Educator',
    affiliationOrShrine: 'Dargah Hazratbal Shrine, Srinagar',
    region: 'Kashmir Valley',
    geographicLocus: 'Hazratbal, Srinagar',
    period: 'Year: 2019',
    contributionType: 'SPIRITUAL_EDUCATION_RESEARCH',
    contributionTypeLabel: 'Documented Spiritual Education',
    editorialTribute: '“Connecting the Rishi spiritual tradition with contemporary environmental responsibility.”',
    biography:
      'Pir Masood-ul-Haq was identified in 2019 reporting as an administrator at the renowned Hazratbal shrine on the western shores of Dal Lake. He outlined systematic institutional efforts to encourage pilgrims and visitors to appreciate ecological responsibility through the teachings of Sheikh Noor-ud-Din and Kashmiri Rishi mysticism.',
    keyImpact: 'Environmental education conducted through one of Kashmir\'s premier religious and spiritual institutions on the banks of Dal Lake.',
    documentedWorks: [
      {
        year: 2019,
        title: 'Hazratbal Pilgrim Environmental Awareness Initiative',
        evidenceTier: 'INDEPENDENT JOURNALISTIC INTERVIEW',
        description: 'Explained how Rishi teachings could be used to encourage responsible treatment of nature, lake hygiene, and waste reduction among shrine visitors.',
        documentedOutcome: 'Religious-institution environmental education described in a published first-person journalistic interview.',
        sourceOutlet: 'Religion News Service'
      }
    ],
    sourceProvenance: [
      {
        title: 'Religion News Service: Hazratbal shrine environmental reporting',
        url: 'https://religionnews.com',
        outletOrType: 'Feature Interview'
      }
    ],
    researchStatus: 'Historical role documented. Current affiliation and measurable environmental results unknown.',
    evidenceAuditNotes: 'Classified under Spiritual Education. Qualitative interview archived; visitor waste diversion data not formally audited.',
    linkedModules: [
      { label: 'Hazratbal Basin Intelligence', url: '/water-systems/lakes' },
      { label: 'Dal Lake Scorecard', url: '/water-systems/lakes' },
      { label: 'Spiritual Ecology', url: '/environmental-calendar/ecovoices' }
    ]
  },

  // ─── JAMMU ──────────────────────────────────────────────────────────────────
  {
    id: 'rel-005',
    name: 'Dwarika Nath Ji',
    honorific: 'Pandit',
    designation: 'Priest, Aap Shambu Mandir, Jammu',
    affiliationOrShrine: 'Aap Shambu Mandir, Roop Nagar, Jammu',
    region: 'Jammu',
    geographicLocus: 'Tawi River Basin · Jammu',
    period: 'Year: 2026',
    contributionType: 'CIVIC_RELIGIOUS_INITIATIVE',
    contributionTypeLabel: 'Government-Documented Activity',
    editorialTribute: '“Encouraging environmentally responsible worship to help protect the Tawi River.”',
    biography:
      'Dwarika Nath Ji participated in a Jammu Municipal Corporation initiative designed to curb the disposal of religious offerings and single-use plastic waste into the sacred Tawi River. He publicly urged worshippers to support cleaner religious practices, divert floral and ritual waste, and utilize dedicated collection receptacles.',
    keyImpact: 'Religious-community leadership in preventing ceremonial offerings and polythene from contaminating the Tawi River basin.',
    documentedWorks: [
      {
        year: 2026,
        title: 'Suryaputri Tawi Religious Waste Management Initiative',
        evidenceTier: 'OFFICIAL MUNICIPAL ENVIRONMENTAL PROGRAM',
        description: 'Supported dedicated Visarjan Patras for the collection of religious materials and publicly appealed to devotees not to discard ceremonial items or plastics into the river.',
        documentedOutcome: 'Public endorsement delivered at the August 14, 2026, municipal initiative. Receptacles were installed by the municipal corporation, not personally by the priest.',
        sourceOutlet: 'Swachh JK / JMC Portal'
      }
    ],
    sourceProvenance: [
      {
        title: 'Jammu Municipal Corporation environmental waste management program press bulletin',
        url: 'https://swachhjk.org',
        outletOrType: 'Official Municipal Gazette'
      }
    ],
    researchStatus: 'Named religious leader and environmental activity documented. Waste diversion quantities and collection-system performance not established.',
    evidenceAuditNotes: 'Documented civic-religious partnership. The head priests of Raghunath Temple and Shalimar Mandir also participated but remained unnamed in official records; KEW omits unverified anonymous records.',
    linkedModules: [
      { label: 'Tawi River Basin', url: '/water-systems/rivers' },
      { label: 'Solid Waste Surveillance', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Water Pollution Monitor', url: '/water-systems/water-quality' },
      { label: 'Faith-Based Environmental Education', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' }
    ]
  },

  // ─── AZAD JAMMU & KASHMIR (AJ&K) ─────────────────────────────────────────────
  {
    id: 'rel-006',
    name: 'Muhammad Ameen Butt',
    honorific: '',
    designation: 'Religious Organization Leader | Markazi Jamiat Ahl-e-Hadith, AJ&K',
    affiliationOrShrine: 'Markazi Jamiat Ahl-e-Hadith, Azad Jammu & Kashmir',
    region: 'Azad Jammu & Kashmir',
    geographicLocus: 'Neelum Valley / Sharda · Muzaffarabad',
    period: 'Year: 2025',
    contributionType: 'INSTITUTIONAL_DEVELOPMENT',
    contributionTypeLabel: 'Organizational Environmental Record',
    editorialTribute: '“Connecting faith-based public service with forest protection and community tree planting.”',
    biography:
      'Muhammad Ameen Butt is associated with the leadership of Markazi Jamiat Ahl-e-Hadith in AJ&K. In July 2025, the organization published his environmental message during the launch of its Clean Green Program, encouraging forest protection, watershed care, and community planting initiatives around Sharda and the upper Neelum Valley.',
    keyImpact: 'Faith-based environmental messaging supporting tree planting and coniferous forest conservation across the Neelum Valley.',
    documentedWorks: [
      {
        year: 2025,
        title: 'Clean Green Neelum Valley Program',
        evidenceTier: 'ORIGINAL RELIGIOUS ORGANIZATION PUBLICATION',
        description: 'Issued formal religious call for environmental protection, anti-littering campaigns, and expanded tree cover as part of the organization\'s Clean Green initiative.',
        documentedOutcome: 'Environmental program launch and leadership statement publicly documented. Total saplings planted, exact locations, and survival rates require independent ground auditing.',
        sourceOutlet: 'Markazi Jamiat Ahle Hadith AJK Gazette'
      }
    ],
    sourceProvenance: [
      {
        title: 'Original Clean Green campaign statement',
        url: 'https://ahlehadithajk.org',
        outletOrType: 'Institutional Organizational Publication'
      },
      {
        title: 'Markazi Jamiat Ahle Hadith AJK Leadership Directory',
        url: 'https://ahlehadithajk.org',
        outletOrType: 'Organizational Record'
      }
    ],
    researchStatus: 'Environmental statement documented by the organization. His title varies between pages (Ameer vs Nazim-e-Ala); appointment history requires reconciliation.',
    evidenceAuditNotes: 'Institutional example in AJ&K. Another example noted: Green Kashmir Campaign at Jamia Khadim ul Haramain Masjid in Muzaffarabad; no named individual imam identified in primary sources.',
    linkedModules: [
      { label: 'Neelum Valley Forests', url: '/biodiversity/forest-ecosystems' },
      { label: 'Community Forestry', url: '/biodiversity/forest-ecosystems' },
      { label: 'Faith-Based Conservation', url: '/resources' },
      { label: 'Environmental Education', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' }
    ]
  },

  // ─── LADAKH ─────────────────────────────────────────────────────────────────
  {
    id: 'rel-007',
    name: 'Drikung Kyabgon Chetsang Rinpoche',
    honorific: 'His Holiness',
    designation: 'Buddhist Spiritual Leader | Founder, Go Green Go Organic Initiative',
    affiliationOrShrine: 'Drikung Kagyu Order / Drikung Dharma Foundation / Ladakh Administration',
    region: 'Ladakh',
    geographicLocus: 'Chushul / Phyang / Shayok',
    period: '2015–2026',
    contributionType: 'FIELD_CONSERVATION_PROGRAM',
    contributionTypeLabel: 'Official Green Ambassador',
    editorialTribute: '“Connecting Buddhist environmental ethics with community planting, organic agriculture and conservation.”',
    biography:
      'Drikung Kyabgon Chetsang Rinpoche is a prominent Buddhist spiritual leader who established the Go Green Go Organic initiative. His conservation programs have involved high-altitude mountain communities, monasteries, local government departments, and volunteers across Ladakh. In June 2022, the Ladakh UT administration officially conferred upon him the title of Green Ambassador.',
    keyImpact: 'Government-recorded leadership of large-scale planting campaigns, alpine botanical sanctuaries, and organic agriculture restoration initiatives.',
    documentedWorks: [
      {
        year: 2022,
        title: 'Chushul Community Afforestation Campaign (Phase 11)',
        evidenceTier: 'OFFICIAL LADAKH GOVERNMENT RECORD',
        description: 'Guided the eleventh phase of Go Green Go Organic involving high-altitude border village communities in massive plantation drives.',
        documentedOutcome: 'The Ladakh administration reported the planting of approximately 150,000 saplings and formally conferred the Green Ambassador of Ladakh title.',
        sourceOutlet: 'Ladakh UT Administration'
      },
      {
        year: 2025,
        title: 'Himalayan Botanical Garden, Shayok',
        evidenceTier: 'CONSERVATION PROJECT REPORT',
        description: 'Laid the foundation stone for an alpine botanical garden designed to conserve endangered medicinal plants, sea buckthorn, and cold-desert flora.',
        documentedOutcome: 'Project initiated in June 2025; long-term botanical establishment and biodiversity survivability require continuing field verification.',
        sourceOutlet: 'Reach Ladakh Bulletin'
      },
      {
        year: 2026,
        title: 'Drikung Dharma Foundation Plantation, Phyang',
        evidenceTier: 'OFFICIAL GOVERNMENT ANNOUNCEMENT',
        description: 'Guided an institutional plantation drive developed in partnership with the SankalpTaru Foundation to plant 2,100 fruit and native saplings.',
        documentedOutcome: 'A drive involving 2,100 cherry saplings was inaugurated in May 2026.',
        sourceOutlet: 'Ladakh Raj Niwas Gazette'
      }
    ],
    sourceProvenance: [
      {
        title: 'Official Green Ambassador Recognition Roll, UT Ladakh',
        url: 'https://ladakh.gov.in',
        outletOrType: 'Official Government Order'
      },
      {
        title: 'FAO Mountain Partnership conservation leadership record',
        url: 'https://fao.org/mountain-partnership',
        outletOrType: 'UN International Agency Record'
      },
      {
        title: 'Reach Ladakh: Shayok botanical garden report',
        url: 'https://reachladakh.com',
        outletOrType: 'Regional News Dispatch'
      }
    ],
    researchStatus: 'Conservation leadership, government award and planting activities documented. Tree survival, water demand and habitat impacts need scientific evaluation.',
    evidenceAuditNotes: 'Essential Scientific Safeguard: Planting trees in cold-desert habitats must be evaluated through SEIAE. Water consumption, sapling survival rates, and native steppe impacts require scientific monitoring.',
    linkedModules: [
      { label: 'Ladakh Conservation', url: '/protected-network/atlas' },
      { label: 'Cold-Desert Biodiversity', url: '/biodiversity' },
      { label: 'Climate Adaptation', url: '/hazard-intelligence/glofs' },
      { label: 'Community Forestry', url: '/biodiversity/forest-ecosystems' },
      { label: 'Ecological Restoration', url: '/water-systems/restoration' }
    ]
  },
  {
    id: 'rel-008',
    name: 'Gyalwang Drukpa',
    honorific: 'His Holiness',
    designation: 'Buddhist Spiritual Leader | Drukpa Lineage | Founder, Live to Love',
    affiliationOrShrine: 'Drukpa Order of Tibetan Buddhism / Live to Love International',
    region: 'Ladakh',
    geographicLocus: 'Leh / Liktsey · Indus Valley',
    period: '2009–2023',
    contributionType: 'FIELD_CONSERVATION_PROGRAM',
    contributionTypeLabel: 'Documented Conservation Leadership',
    editorialTribute: '“Transforming pilgrimage into an opportunity for environmental protection and public service.”',
    biography:
      'The Gyalwang Drukpa has actively promoted ecological responsibility across the Himalayas through the Live to Love humanitarian movement, eco-pilgrimages, mountain trail cleanups, and community plantation initiatives. His renowned Eco Pad Yatra programs engage volunteers and monastic practitioners in walking hundreds of miles to remove synthetic trash from fragile alpine trails.',
    keyImpact: 'Long-running religious environmental initiatives integrating waste removal, high-altitude trail stewardship, and community plantation drives.',
    documentedWorks: [
      {
        year: 2009,
        title: 'Himalayan Eco Pad Yatra Mountain Trail Cleanups',
        evidenceTier: 'HISTORICAL ENVIRONMENTAL PROGRAM',
        description: 'Pioneered walking pilgrimages combining spiritual practice with the physical collection of plastic and metal waste along remote trekking routes.',
        documentedOutcome: 'Multiple cleanup pilgrimages across Ladakh and Himachal Pradesh, resulting in tonnes of non-biodegradable waste evacuated from alpine watersheds.',
        sourceOutlet: 'Buddhistdoor Global'
      },
      {
        year: 2016,
        title: 'Fourth Eco-Cycle Yatra (3,000 km Environmental Pilgrimage)',
        evidenceTier: 'INDEPENDENT REGIONAL JOURNALISM',
        description: 'Led an environmental cycling pilgrimage promoting climate awareness, anti-littering ethics, and renewable energy adoption across the Himalayas.',
        documentedOutcome: 'A 3,000-kilometre expedition successfully concluded in Leh, educating dozens of wayside communities.',
        sourceOutlet: 'Reach Ladakh'
      },
      {
        year: 2023,
        title: 'Liktsey Plantation Initiative',
        evidenceTier: 'OFFICIAL LADAKH GOVERNMENT RECORD',
        description: 'Guided a mass community plantation organized by Live to Love, Young Drukpa Association, and regional authorities.',
        documentedOutcome: 'The Ladakh administration reported approximately 150,000 saplings planted in May 2023.',
        sourceOutlet: 'Ladakh Administration Press Release'
      }
    ],
    sourceProvenance: [
      {
        title: 'Buddhistdoor Global: Environmental pilgrimage history of Gyalwang Drukpa',
        url: 'https://buddhistdoor.net',
        outletOrType: 'International Journalistic Feature'
      },
      {
        title: 'Official 2023 Liktsey planting record',
        url: 'https://ladakh.gov.in',
        outletOrType: 'Government Press Note'
      }
    ],
    researchStatus: 'Environmental programs and official activity documented. Collective planting figures belong to participating organizations, not one individual.',
    evidenceAuditNotes: 'Evaluated under Field Conservation. Collective numbers attributed to collaborative civic networks; SEIAE survival rate audits recommended for Liktsey plantings.',
    linkedModules: [
      { label: 'Mountain Waste Management', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Plastic Pollution Surveillance', url: '/environmental-monitoring/plastic-pollution' },
      { label: 'Ecological Pilgrimages', url: '/environmental-calendar/ecovoices' },
      { label: 'Community Conservation', url: '/protected-network/atlas' }
    ]
  },
  {
    id: 'rel-009',
    name: 'Drukpa Thuksey Rinpoche',
    honorific: '',
    designation: 'Buddhist Spiritual Leader | Live to Love Community Conservation',
    affiliationOrShrine: 'Drukpa Order / Live to Love Ladakh',
    region: 'Ladakh',
    geographicLocus: 'Liktsey / Changthang',
    period: '2023–2026',
    contributionType: 'FIELD_CONSERVATION_PROGRAM',
    contributionTypeLabel: '2026 Government Record',
    editorialTribute: '“Mobilizing communities to participate in conservation activities across Ladakh\'s high-altitude landscapes.”',
    biography:
      'Drukpa Thuksey Rinpoche has been directly associated with major community afforestation and environmental stewardship drives in Ladakh. Official government event records identify his leadership in the 2023 Liktsey campaign and document a separate 15,000-tree afforestation initiative organized in the Changthang plateau in May 2026.',
    keyImpact: 'Religious leadership connected to documented large-scale community planting and watershed protection initiatives across Changthang.',
    documentedWorks: [
      {
        year: 2023,
        title: 'Liktsey Community Planting Campaign',
        evidenceTier: 'OFFICIAL GOVERNMENT EVENT RECORD',
        description: 'Participated in the inauguration of a major planting program supported by religious organizations, youth collectives, and local administration.',
        documentedOutcome: 'Approximately 150,000 saplings reported planted collectively across the Liktsey riverside sector.',
        sourceOutlet: 'Government of India PIB'
      },
      {
        year: 2026,
        title: 'Changthang High-Altitude Plantation Program',
        evidenceTier: 'OFFICIAL GOVERNMENT RECORD',
        description: 'Organized an afforestation campaign associated with local village development, windbreak establishment, and water-security initiatives.',
        documentedOutcome: 'Government announcement records a 15,000-tree planting drive successfully carried out in May 2026.',
        sourceOutlet: 'Ladakh UT Administration'
      }
    ],
    sourceProvenance: [
      {
        title: 'Ladakh Administration Official Bulletin, May 14, 2026',
        url: 'https://ladakh.gov.in',
        outletOrType: 'Government Event Bulletin'
      },
      {
        title: 'PIB India: Ladakh environmental afforestation events',
        url: 'https://pib.gov.in',
        outletOrType: 'National Press Release'
      }
    ],
    researchStatus: 'Direct conservation activity documented. Plantation-site ecology, irrigation demand and survival rates require independent scientific review.',
    evidenceAuditNotes: 'Classified under Field Conservation. High-altitude tree plantings in Changthang (above 4,000m) require strict botanical evaluation of water consumption.',
    linkedModules: [
      { label: 'Changthang Steppe Ecology', url: '/biodiversity' },
      { label: 'Community Tree Planting', url: '/biodiversity/forest-ecosystems' },
      { label: 'Water Security in Cold Deserts', url: '/water-systems/watersheds' }
    ]
  },
  {
    id: 'rel-010',
    name: 'Gyan Thinlay',
    honorific: 'Venerable',
    designation: 'Buddhist Monk | Deputy Chairman, Go Green Go Organic Ladakh',
    affiliationOrShrine: 'Go Green Go Organic Ladakh / Chushul Monastic Community',
    region: 'Ladakh',
    geographicLocus: 'Chushul · Eastern Ladakh',
    period: 'Year: 2022',
    contributionType: 'FIELD_CONSERVATION_PROGRAM',
    contributionTypeLabel: 'Field Conservation Documented',
    editorialTribute: '“Combining monastic service with practical community participation in environmental programs.”',
    biography:
      'Gyan Thinlay was identified in a 2022 environmental investigative report as a Buddhist monk and deputy chairman of Go Green Go Organic Ladakh. The investigation detailed his hands-on operational leadership at Chushul, where local villagers raised saplings in cold-frame nurseries and engineered glacial meltwater irrigation channels for mass community plantations.',
    keyImpact: 'Operational field involvement in community nurseries, indigenous irrigation channels, and planting programs in Chushul.',
    documentedWorks: [
      {
        year: 2022,
        title: 'Chushul Tree Nursery and Community Plantation',
        evidenceTier: 'INDEPENDENT ENVIRONMENTAL JOURNALISM',
        description: 'Helped coordinate a community nursery and organized village-level irrigation distribution for high-altitude afforestation.',
        documentedOutcome: 'A nursery of approximately 150,000 saplings was documented; long-term sapling survival and ecological appropriateness remain under academic review.',
        sourceOutlet: 'Rural21 Investigation'
      }
    ],
    sourceProvenance: [
      {
        title: 'Rural21: "Tree planting in Ladakh: Boon or bane?" by Athar Parvaiz',
        url: 'https://rural21.com',
        outletOrType: 'Investigative Environmental Journalism'
      }
    ],
    researchStatus: 'Monastic and environmental field role documented in 2022. Current organizational position not established.',
    evidenceAuditNotes: 'Crucial case study in cold-desert conservation. Demonstrates dedicated monastic mobilization while highlighting the need for scientific survival monitoring.',
    linkedModules: [
      { label: 'Community Nurseries', url: '/biodiversity/forest-ecosystems' },
      { label: 'High-Altitude Irrigation', url: '/water-systems/watersheds' },
      { label: 'Ladakh Cold-Desert Ecology', url: '/biodiversity' }
    ]
  },

  // ─── GILGIT-BALTISTAN ────────────────────────────────────────────────────────
  {
    id: 'rel-011',
    name: 'Prince Karim Aga Khan IV',
    honorific: 'His Highness',
    designation: '49th Imam of the Shia Ismaili Muslims | Founder, AKRSP',
    affiliationOrShrine: 'Ismaili Imamat / Aga Khan Development Network (AKDN)',
    region: 'Gilgit-Baltistan',
    geographicLocus: 'Hunza / Ghizer / Gilgit / Baltistan',
    period: '1936–2025',
    contributionType: 'INSTITUTIONAL_DEVELOPMENT',
    contributionTypeLabel: 'Historical Institutional Legacy',
    editorialTribute: '“Connecting community development with the long-term stewardship of mountain resources.”',
    biography:
      'Prince Karim Aga Khan IV was a global spiritual leader whose development institutions transformed rural livelihoods, irrigation infrastructure, environmental resilience, and natural-resource management in Gilgit-Baltistan over four decades. The Aga Khan Rural Support Programme (AKRSP), founded under his guidance in 1982, pioneered mountain irrigation channels, community forestry, and institutional adaptation frameworks that became a global model.',
    keyImpact: 'Decades-long institutional legacy supporting community-led mountain development, water security, and climate resilience in the Karakoram.',
    documentedWorks: [
      {
        year: 1982,
        title: 'Establishment of the Aga Khan Rural Support Programme (AKRSP)',
        evidenceTier: 'INSTITUTIONAL HISTORY',
        description: 'Founded the flagship regional rural development initiative supporting village organizations, high-altitude irrigation channels, and community forestry.',
        documentedOutcome: 'AKRSP mobilized thousands of village organizations, planting tens of millions of trees and constructing hundreds of mountain water channels across GB and Chitral.',
        sourceOutlet: 'Dawn / World Bank Evaluation Archives'
      },
      {
        year: 'Historical',
        title: 'Community Irrigation & Mountain Ecological Resilience',
        evidenceTier: 'INDEPENDENT HISTORICAL REPORTING',
        description: 'Institutions founded under his leadership supported gravity-fed irrigation channels, slope terracing, and disaster-resilience infrastructure across vulnerable Karakoram valleys.',
        documentedOutcome: 'Hundreds of mountain agricultural basins safeguarded against flash floods and glacial fluctuations; credit shared with participating village communities.',
        sourceOutlet: 'International Development Compendiums'
      }
    ],
    sourceProvenance: [
      {
        title: 'Dawn: February 7, 2025 commemorative review of development in Gilgit-Baltistan',
        url: 'https://dawn.com',
        outletOrType: 'National Broadsheet Record'
      },
      {
        title: 'AKDN Environment and Climate priorities compendium',
        url: 'https://akdn.org',
        outletOrType: 'Official Institutional Archive'
      }
    ],
    researchStatus: 'Historical spiritual leadership and institutional development record documented. Project outcomes should be independently audited.',
    evidenceAuditNotes: 'Classified under Historical Institutional Legacy. Massive regional impact through AKRSP, with field implementation carried out by local village organizations.',
    linkedModules: [
      { label: 'Mountain Communities', url: '/resources' },
      { label: 'Climate Adaptation', url: '/hazard-intelligence/glofs' },
      { label: 'Water Security', url: '/water-systems/watersheds' },
      { label: 'Forest Restoration', url: '/biodiversity/forest-ecosystems' },
      { label: 'Community Conservation', url: '/protected-network/atlas' }
    ]
  },
  {
    id: 'rel-012',
    name: 'Prince Rahim Aga Khan V',
    honorific: 'His Highness',
    designation: '50th Imam of the Shia Ismaili Muslims',
    affiliationOrShrine: 'Ismaili Imamat / Former Chair, AKDN Environment and Climate Committee',
    region: 'Gilgit-Baltistan',
    geographicLocus: 'Gilgit-Baltistan (Regional institutional connection)',
    period: '2025–2026',
    contributionType: 'INSTITUTIONAL_DEVELOPMENT',
    contributionTypeLabel: 'Current Spiritual Leadership Candidate',
    editorialTribute: '“Environmental stewardship as a responsibility of faith-led development institutions.”',
    biography:
      'Prince Rahim Aga Khan V succeeded his father as spiritual leader of the Ismaili community in February 2025. His official biography specifically emphasizes his deep commitment to environmental protection and climate-change mitigation through his previous role as Chairman of the AKDN Environment and Climate Committee. His spiritual community and affiliated network maintain deep, longstanding ties to the fragile valleys of Gilgit-Baltistan.',
    keyImpact: 'Executive and spiritual leadership within a global development network with institutional climate-resilience responsibilities in Gilgit-Baltistan.',
    documentedWorks: [
      {
        year: '2020–2026',
        title: 'AKDN Environment and Climate Committee Leadership',
        evidenceTier: 'OFFICIAL INSTITUTIONAL BIOGRAPHY',
        description: 'Served as committee chairman guiding the network\'s transition towards net-zero carbon operations, climate-smart infrastructure, and mountain cryosphere resilience.',
        documentedOutcome: 'Environmental policy framework formally established across network entities operating in high-mountain valleys of Pakistan. Specific regional field projects require ongoing documentation.',
        sourceOutlet: 'The Ismaili / AKDN Official'
      }
    ],
    sourceProvenance: [
      {
        title: 'The Ismaili: Official biography of Prince Rahim Aga Khan',
        url: 'https://the.ismaili',
        outletOrType: 'Official Institutional Publication'
      },
      {
        title: 'Dawn: 2026 Gilgit-Baltistan regional visit and climate priorities',
        url: 'https://dawn.com',
        outletOrType: 'National Media Report'
      }
    ],
    researchStatus: 'Spiritual identity and environmental committee role documented. Individual field conservation achievements not yet established.',
    evidenceAuditNotes: 'Candidate Dossier. High-level institutional policy verified; field-level verification in GB valleys to be updated as projects mature.',
    linkedModules: [
      { label: 'AKDN Climate Action', url: '/resources' },
      { label: 'Gilgit-Baltistan Mountain Sustainability', url: '/resources' },
      { label: 'Cryosphere Intelligence', url: '/water-systems/glaciers' }
    ],
    isCandidate: true
  },
  {
    id: 'rel-013',
    name: 'Maulana Attaullah Shahab',
    honorific: 'Maulana',
    designation: 'Religious and Community Leader | Former Member, Gilgit-Baltistan Council',
    affiliationOrShrine: 'Gilgit-Baltistan Council / Regional Ulema Forum',
    region: 'Gilgit-Baltistan',
    geographicLocus: 'Gilgit · Hunza · Indus Basin',
    period: 'Year: 2026',
    contributionType: 'PUBLIC_ENVIRONMENTAL_ADVOCACY',
    contributionTypeLabel: 'Faith-Based Action Candidate',
    editorialTribute: '“Connecting the ecological threats facing Gilgit-Baltistan with collective environmental responsibility.”',
    biography:
      'Maulana Attaullah Shahab participated in public launch consultations for the Al Mizan Forest Programme, a 2026 partnership involving Islamic Help UK and WWF-Pakistan. He highlighted the urgent consequences of glacier melting, erratic river flows, and ecological pressures across Gilgit-Baltistan, urging religious communities to embrace environmental preservation.',
    keyImpact: 'Public faith-based support for an international multi-stakeholder ecological restoration and forestation partnership in Gilgit-Baltistan.',
    documentedWorks: [
      {
        year: 2026,
        title: 'Al Mizan Forest Programme Consultations',
        evidenceTier: 'PUBLISHED PARTNERSHIP ANNOUNCEMENT',
        description: 'Participated in public consultations discussing Islamic principles of environmental stewardship (Al-Mizan) and Karakoram climate risks.',
        documentedOutcome: 'A three-year partnership announced (2026–2029) proposing forest restoration across several regions of Pakistan including GB. Note: The announced target of 2.7M+ trees is a project projection, not a completed planting outcome.',
        sourceOutlet: 'Gilgit Media Network (GMN)'
      }
    ],
    sourceProvenance: [
      {
        title: 'GMN — Gilgit Media Network: Al Mizan Forest Programme launch coverage',
        url: 'https://gilgitmedianetwork.com',
        outletOrType: 'Regional Media Report'
      },
      {
        title: 'UNEP: Al-Mizan — A Covenant for the Earth framework',
        url: 'https://unep.org',
        outletOrType: 'UN Environmental Guidance'
      }
    ],
    researchStatus: 'Public participation documented. Individual implementation responsibilities and project outcomes pending.',
    evidenceAuditNotes: 'Candidate Dossier. Faith-based advocacy verified; plantation execution and survival numbers require independent post-planting auditing.',
    linkedModules: [
      { label: 'Al-Mizan Framework', url: '/resources' },
      { label: 'GB Cryosphere Hazards', url: '/hazard-intelligence/glofs' },
      { label: 'Forest Restoration', url: '/biodiversity/forest-ecosystems' }
    ],
    isCandidate: true
  },
  {
    id: 'rel-014',
    name: 'Nazira Bibi',
    honorific: '',
    designation: 'Ismaili Religious Educator and Community Teacher',
    affiliationOrShrine: 'Ismaili Tariqa and Religious Education Board (ITREB), Pakistan',
    region: 'Gilgit-Baltistan',
    geographicLocus: 'Gilgit-Baltistan (Regional Learning Centers)',
    period: 'Year: 2026',
    contributionType: 'SPIRITUAL_EDUCATION_RESEARCH',
    contributionTypeLabel: 'Religious Education Research Candidate',
    editorialTribute: '“Integrating traditional ecological knowledge into religious education to cultivate environmental responsibility.”',
    biography:
      'Nazira Bibi is a religious educator based in Gilgit-Baltistan whose 2026 research investigated incorporating traditional ecological knowledge (TEK) into Ismaili secondary religious education. Her classroom action research connected ancestral mountain agricultural practices with Islamic environmental ethics, student reflection, and sustainable resource use.',
    keyImpact: 'Six-month educational intervention connecting Indigenous mountain ecological knowledge with faith-based environmental learning.',
    documentedWorks: [
      {
        year: 2026,
        title: 'Traditional Ecological Knowledge in Religious Education',
        evidenceTier: 'INSTITUTE OF ISMAILI STUDIES CONFERENCE RESEARCH',
        description: 'Conducted classroom action research integrating customary ecological practices and moral responsibility into religious education curricula.',
        documentedOutcome: 'Study reported measurably enhanced environmental awareness and reflective thinking among participating students. Classify as faith-based educator, not as a senior religious authority.',
        sourceOutlet: 'Institute of Ismaili Studies (IIS) London'
      }
    ],
    sourceProvenance: [
      {
        title: 'Institute of Ismaili Studies International Conference Proceedings',
        url: 'https://iis.ac.uk',
        outletOrType: 'Academic Conference Publication'
      },
      {
        title: 'Original Research Abstract, Page 24',
        url: 'https://iis.ac.uk',
        outletOrType: 'Scholarly Abstract'
      }
    ],
    researchStatus: 'Educational research and institutional role documented. Classify as a faith-based environmental educator, not as a senior religious authority.',
    evidenceAuditNotes: 'Candidate Dossier. Scholarly action research verified. Valuable model for integrating Indigenous wisdom into religious instruction.',
    linkedModules: [
      { label: 'Indigenous Ecological Knowledge', url: '/resources' },
      { label: 'Environmental Education', url: '/environmental-calendar/outdoor-classroom/field-learning-programs' },
      { label: 'Mountain Sustainability', url: '/resources' },
      { label: 'Spiritual Ecology', url: '/environmental-calendar/ecovoices' }
    ],
    isCandidate: true
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// ADDITIONAL RELIGIOUS FIGURES FOR RESEARCH (8 LEADS)
// ─────────────────────────────────────────────────────────────────────────────

export const RESEARCH_LEAD_RELIGIOUS: ResearchLeadReligious[] = [
  {
    name: 'Farooq Ahmed',
    region: 'Kashmir Valley',
    documentedConnection: 'Srinagar imam interviewed in international reporting about environmental degradation, plastic pollution, and the ethical role of religious pulpits.',
    sourceCitation: 'Religion News Service, July 2019'
  },
  {
    name: 'Fayaz Ahmed Rather',
    region: 'Kashmir Valley, Aishmuqam',
    documentedConnection: 'Religious preacher and Waqf administrator interviewed regarding traditional Rishi ecological ethics and forest preservation in the Lidder Valley.',
    sourceCitation: 'Religion News Service, July 2019'
  },
  {
    name: 'Mufti Nasir-ul-Islam Farooqi',
    region: 'Kashmir Valley',
    documentedConnection: 'Participant at the 2026 ulema conference discussing mosque-based environmental responsibility; individual implementation record requires confirmation.',
    sourceCitation: 'Kashmir Life, August 2026'
  },
  {
    name: 'Drubpon Khamtak Rinpoche Jigmet Nawang Namgyal',
    region: 'Ladakh',
    documentedConnection: 'Religious leader associated with operational coordination of the massive 2023 Liktsey planting campaign.',
    sourceCitation: 'Government of India PIB, May 2023'
  },
  {
    name: 'Chosjey Togdan Rinpoche',
    region: 'Ladakh',
    documentedConnection: 'Spiritual figure who spoke on ecosystem balance and cold-desert plant protection at the 2022 Chushul plantation event.',
    sourceCitation: 'Reach Ladakh / India Press Bulletin, 2022'
  },
  {
    name: 'Jigme Migyur Palmo',
    region: 'Ladakh',
    documentedConnection: 'Drukpa Buddhist nun actively involved in Himalayan environmental cleanup pilgrimages and community waste education.',
    sourceCitation: 'The Indian Express Lifestyle News, 2021'
  },
  {
    name: 'Muhammad Ilyas',
    region: 'Azad Jammu & Kashmir',
    documentedConnection: 'Listed as Ameer of Markazi Jamiat Ahl-e-Hadith AJ&K during Clean Green initiative; personal environmental contributions need confirmation.',
    sourceCitation: 'Markazi Jamiat Ahle Hadith AJK Official Portal, 2025'
  },
  {
    name: 'Shaykh Sultan Niaz ul Hassan',
    region: 'International, with GB project coverage',
    documentedConnection: 'Founder of Islamic Help UK, associated with the multi-region 2026 faith-based Al Mizan Forest Programme covering Gilgit-Baltistan.',
    sourceCitation: 'Islamabad Mail / Al Mizan Framework Announcement, 2026'
  }
];
