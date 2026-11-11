import { 
  Speaker, 
  AgendaItem, 
  ConferenceTrack, 
  WebinarSession, 
  CertificateRecord, 
  QnAItem, 
  ChatMessage, 
  SCIENTIFIC_WEBINARS,
  SAMPLE_CERTIFICATES,
  SAMPLE_QNA_ITEMS,
  SAMPLE_CHAT_MESSAGES,
  WEBINAR_KPIS,
  EventStatus
} from './webinars';

export {
  type Speaker, 
  type AgendaItem, 
  type ConferenceTrack, 
  type WebinarSession, 
  type CertificateRecord, 
  type QnAItem, 
  type ChatMessage, 
  type EventStatus,
  SCIENTIFIC_WEBINARS,
  SAMPLE_CERTIFICATES,
  SAMPLE_QNA_ITEMS,
  SAMPLE_CHAT_MESSAGES,
  WEBINAR_KPIS
};

export type HostingModel = 'kew-organized' | 'joint' | 'institution-hosted';
export type InstitutionCategory = 'University' | 'Research Institute' | 'Environmental NGO' | 'Scientific Society' | 'Government Agency';
export type VerificationStatus = 'verified' | 'pending' | 'under_review' | 'accreditation_in_progress' | 'rejected';
export type AbstractStatus = 'submitted' | 'under_review' | 'accepted' | 'revision_required' | 'rejected';
export type ConferenceStatus = EventStatus;

export type UserRole = 
  | 'KEW Super Administrator'
  | 'Institutional Administrator'
  | 'Conference Director'
  | 'Scientific Committee'
  | 'Session Moderator'
  | 'Speaker / Presenter'
  | 'Registered Delegate';

export interface Institution {
  id: string;
  name: string;
  shortName: string;
  category: InstitutionCategory;
  country: string;
  city: string;
  domain: string;
  website: string;
  authorizedRep: {
    name: string;
    title: string;
    email: string;
    phone?: string;
  };
  status: VerificationStatus;
  verifiedAt?: string;
  logo: string;
  tier: 'Standard Environmental (Free)' | 'Advanced Academic (Free)';
  resourceQuota: {
    maxConcurrentTracks: number;
    maxDelegatesPerHall: number;
    cloudStorageGB: number;
    liveRecordingHours: number;
  };
  bio: string;
  members: {
    id: string;
    name: string;
    role: string;
    email: string;
  }[];
}

export interface HostingApplication {
  id: string;
  institutionId: string;
  institutionName: string;
  conferenceTitle: string;
  proposedDates: {
    start: string;
    end: string;
    display: string;
  };
  hostingModel: HostingModel;
  expectedAttendees: number;
  tracksCount: number;
  scientificScope: string;
  fundingDisclosure: string;
  coSponsors: string[];
  status: 'approved' | 'pending_review' | 'under_evaluation' | 'revisions_requested' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  reviewNotes?: string;
}

export interface ConferenceSessionDetailed {
  id: string;
  conferenceId: string;
  trackId: string;
  trackName: string;
  title: string;
  sessionType: 'Plenary Keynote' | 'Parallel Technical Paper' | 'Panel Dialogue' | 'Workshop' | 'Roundtable';
  dayNumber: number;
  date: string;
  startTime: string;
  endTime: string;
  timeDisplay: string;
  roomCode: string;
  roomName: string;
  moderator: Speaker;
  speakers: Speaker[];
  abstract: string;
  status: EventStatus;
  recordingUrl?: string;
  slidesUrl?: string;
  proceedingsDoi?: string;
  questionsCount: number;
  attendeesCount: number;
}

export interface ConferenceDetailed {
  id: string;
  title: string;
  shortTitle: string;
  slug: string;
  hostingModel: HostingModel;
  hostInstitution: Institution;
  coHosts: string[];
  dates: {
    start: string;
    end: string;
    display: string;
    daysCount: number;
  };
  theme: string;
  description: string;
  status: EventStatus;
  isPeerReviewed: boolean;
  scientificCommittee: {
    name: string;
    affiliation: string;
    role: string;
  }[];
  tracks: {
    id: string;
    name: string;
    roomCode: string;
    theme: string;
    chair: string;
    chairAffiliation: string;
    sessionsCount: number;
  }[];
  dailyThemes: {
    dayNumber: number;
    date: string;
    title: string;
    highlight: string;
  }[];
  featuredSpeakers: Speaker[];
  abstractSubmissionsOpen: boolean;
  abstractDeadline?: string;
  proceedingsDoi?: string;
  registeredCount: number;
  maxCapacity: number;
  bannerImage: string;
  resourceLimits: {
    concurrentRooms: number;
    cloudStorageGB: number;
    recordingStatus: 'Authorized & Archiving' | 'Standby';
  };
}

export interface AbstractSubmission {
  id: string;
  conferenceId: string;
  conferenceTitle: string;
  trackId: string;
  trackName: string;
  title: string;
  authors: {
    name: string;
    affiliation: string;
    email: string;
    isPresenter: boolean;
  }[];
  abstractText: string;
  keywords: string[];
  status: AbstractStatus;
  submittedAt: string;
  assignedReviewers: string[];
  reviewerScores: {
    reviewerName: string;
    noveltyScore: number;
    methodologyScore: number;
    relevanceScore: number;
    recommendation: 'Accept' | 'Minor Revision' | 'Major Revision' | 'Reject';
    comments: string;
  }[];
  downloadUrl?: string;
}

export interface TimeZoneOption {
  code: string;
  label: string;
  offsetMinutes: number;
}

export const SUPPORTED_TIMEZONES: TimeZoneOption[] = [
  { code: 'IST', label: 'India Standard Time (IST, UTC+05:30)', offsetMinutes: 330 },
  { code: 'UTC', label: 'Coordinated Universal Time (UTC+00:00)', offsetMinutes: 0 },
  { code: 'EST', label: 'US Eastern Time (EST, UTC-05:00)', offsetMinutes: -300 },
  { code: 'PST', label: 'US Pacific Time (PST, UTC-08:00)', offsetMinutes: -480 },
  { code: 'CET', label: 'Central European Time (CET, UTC+01:00)', offsetMinutes: 60 },
  { code: 'BST', label: 'British Summer Time (BST, UTC+01:00)', offsetMinutes: 60 },
  { code: 'SGT', label: 'Singapore Standard Time (SGT, UTC+08:00)', offsetMinutes: 480 },
  { code: 'JST', label: 'Japan Standard Time (JST, UTC+09:00)', offsetMinutes: 540 }
];

// Institutions: Accreditation & MoUs in progress for 2027 co-hosting
export const VERIFIED_INSTITUTIONS: Institution[] = [
  {
    id: 'inst-ku',
    name: 'University of Kashmir',
    shortName: 'KU Srinagar',
    category: 'University',
    country: 'India',
    city: 'Srinagar',
    domain: 'kashmiruniversity.ac.in',
    website: 'https://kashmiruniversity.net',
    authorizedRep: {
      name: 'Department of Earth Sciences Representative',
      title: 'Nominated Academic Contact',
      email: 'earthsciences@kashmiruniversity.ac.in',
      phone: '+91 194 227 2000'
    },
    status: 'under_review',
    logo: '/images/bear.png',
    tier: 'Advanced Academic (Free)',
    resourceQuota: {
      maxConcurrentTracks: 4,
      maxDelegatesPerHall: 1000,
      cloudStorageGB: 50,
      liveRecordingHours: 100
    },
    bio: 'Premier state university with specialized research centers in Himalayan glaciology, high-altitude ecology, and mountain hydrology in the Jhelum basin. Bilateral MoU under preparation for 2027 summit co-hosting.',
    members: [
      { id: 'mem-ku-1', name: 'Nominated KU Faculty Lead', role: 'Academic Liaison', email: 'liaison@kashmiruniversity.ac.in' }
    ]
  },
  {
    id: 'inst-skuast',
    name: 'SKUAST-Kashmir',
    shortName: 'SKUAST-K',
    category: 'University',
    country: 'India',
    city: 'Shalimar, Srinagar',
    domain: 'skuastkashmir.ac.in',
    website: 'https://skuastkashmir.ac.in',
    authorizedRep: {
      name: 'Faculty of Horticulture / Agricultural Hydrology Contact',
      title: 'Nominated Academic Liaison',
      email: 'hydrology@skuastkashmir.ac.in'
    },
    status: 'under_review',
    logo: '/images/markhor.png',
    tier: 'Advanced Academic (Free)',
    resourceQuota: {
      maxConcurrentTracks: 4,
      maxDelegatesPerHall: 800,
      cloudStorageGB: 50,
      liveRecordingHours: 80
    },
    bio: 'Agricultural sciences and technology university conducting research on Karewa plateau hydrology, orchard soil physics, and temperate forest corridors. Participation in 2027 events subject to formal agreement.',
    members: []
  },
  {
    id: 'inst-wisa',
    name: 'Wetlands International South Asia',
    shortName: 'WISA',
    category: 'Environmental NGO',
    country: 'Regional / India',
    city: 'New Delhi & Srinagar',
    domain: 'wetlands-southasia.org',
    website: 'https://south-asia.wetlands.org',
    authorizedRep: {
      name: 'Regional Program Coordinator',
      title: 'Wetland Conservation Contact',
      email: 'contact@wetlands-southasia.org'
    },
    status: 'under_review',
    logo: '/images/tiger.png',
    tier: 'Standard Environmental (Free)',
    resourceQuota: {
      maxConcurrentTracks: 2,
      maxDelegatesPerHall: 500,
      cloudStorageGB: 25,
      liveRecordingHours: 50
    },
    bio: 'Regional non-governmental organization dedicated to sustaining and restoring wetlands and their biodiversity across South Asia. Dialogue ongoing for 2027 Ramsar symposium partnership.',
    members: []
  }
];

export const HOSTING_APPLICATIONS: HostingApplication[] = [
  {
    id: 'app-2027-001',
    institutionId: 'inst-ku',
    institutionName: 'University of Kashmir (Proposed Co-Host)',
    conferenceTitle: 'Western Himalayan Cryosphere Summit 2027',
    proposedDates: {
      start: '2027-05-27T04:00:00Z',
      end: '2027-05-29T12:00:00Z',
      display: 'May 27–29, 2027 (Proposed)'
    },
    hostingModel: 'joint',
    expectedAttendees: 600,
    tracksCount: 4,
    scientificScope: 'Geodetic mass balance, InSAR kinematics, late-summer meltwater budgets, and GLOF mitigation frameworks across J&K and Ladakh.',
    fundingDisclosure: 'Proposed non-commercial funding; academic sponsorship under evaluation.',
    coSponsors: ['Pending Institutional MoU'],
    status: 'under_evaluation',
    submittedAt: '2026-11-01T10:00:00Z',
    reviewNotes: 'Institutional co-hosting agreement in drafting; dates subject to scientific committee ratification.'
  },
  {
    id: 'app-2027-002',
    institutionId: 'inst-wisa',
    institutionName: 'Wetlands International South Asia (Proposed Co-Host)',
    conferenceTitle: 'Himalayan Wetlands & Ramsar Sanctuary Conservation Symposium 2027',
    proposedDates: {
      start: '2027-07-15T04:00:00Z',
      end: '2027-07-16T12:00:00Z',
      display: 'July 15–16, 2027 (Proposed)'
    },
    hostingModel: 'institution-hosted',
    expectedAttendees: 400,
    tracksCount: 2,
    scientificScope: 'Ramsar site boundaries, bathymetric siltation differencing, and flyway avifaunal censuses in Hokersar, Wular, and Haigam.',
    fundingDisclosure: 'Independent non-profit grant application in progress.',
    coSponsors: ['Pending Confirmation'],
    status: 'under_evaluation',
    submittedAt: '2026-11-05T11:00:00Z',
    reviewNotes: 'Under evaluation for institutional hosting approval.'
  }
];

export const CONFERENCES_DETAILED: ConferenceDetailed[] = [
  {
    id: 'kew-conf-2027-cryo',
    title: 'Western Himalayan Cryosphere Summit 2027: Glacier Change, Remote Sensing & Mountain Hydrology',
    shortTitle: 'Cryosphere Summit 2027',
    slug: 'western-himalayan-cryosphere-summit-2027',
    hostingModel: 'joint',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: [
      'Proposed: University of Kashmir',
      'Proposed: SKUAST-Kashmir',
      'Proposed: Dr. Kumar Foundation USA'
    ],
    dates: {
      start: '2027-05-27T04:00:00Z',
      end: '2027-05-29T12:00:00Z',
      display: 'May 27–29, 2027 · Proposed (Planning Phase)',
      daysCount: 3
    },
    theme: 'Integrating spaceborne InSAR, UAV photogrammetry, and glacier discharge models into downstream water resilience and statutory Himalayan environmental governance.',
    description: 'A planned multi-track international scientific summit designed to synthesize four decades of Western Himalayan cryospheric datasets. Proposed structure features 4 breakout tracks, keynote plenaries, and double-blind peer-reviewed proceedings. Dates, speakers, and institutional co-hosts are currently in planning and subject to formal confirmation.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Prof. M. Farooq (Nominated Co-Chair)', affiliation: 'University of Kashmir', role: 'Proposed Summit Co-Chair' },
      { name: 'Prof. Elena Rostova (Nominated Director)', affiliation: 'ETH Zurich / ICIMOD Affiliate', role: 'Proposed Program Director' },
      { name: 'Dr. Tariq Ahmad (Nominated Lead)', affiliation: 'SKUAST-Kashmir', role: 'Proposed Hydrological Tracks Lead' }
    ],
    tracks: [
      {
        id: 'track-cryo-a',
        name: 'Track A · Glacial Mass Balance & InSAR Remote Sensing',
        roomCode: 'CRYO-ROOM-A',
        theme: 'Spaceborne radar interferometry, geodetic thinning, and snout retreat kinematics',
        chair: 'Nominated Chair (KU Earth Sciences)',
        chairAffiliation: 'University of Kashmir',
        sessionsCount: 4
      },
      {
        id: 'track-cryo-b',
        name: 'Track B · Downstream Hydrological Basins & Agro-Ecology',
        roomCode: 'CRYO-ROOM-B',
        theme: 'Snow-water equivalent deficits, springhead connectivity, and irrigation canals',
        chair: 'Nominated Chair (SKUAST-K)',
        chairAffiliation: 'SKUAST-Kashmir',
        sessionsCount: 4
      },
      {
        id: 'track-cryo-c',
        name: 'Track C · GLOF Early Warning & Statutory Policy Frameworks',
        roomCode: 'CRYO-ROOM-C',
        theme: 'Proglacial lake expansions, moraine dam breach modeling, and civil protection',
        chair: 'Nominated Legal & Disaster Chair',
        chairAffiliation: 'NGT Bar / Disaster Management Authority',
        sessionsCount: 3
      },
      {
        id: 'track-cryo-d',
        name: 'Track D · High-Altitude Cryospheric Ecosystems & Permafrost',
        roomCode: 'CRYO-ROOM-D',
        theme: 'Permafrost creep, rock glacier stability, and subnival flora migration',
        chair: 'Nominated Alpine Chair',
        chairAffiliation: 'Cryospheric Sciences Network',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      {
        dayNumber: 1,
        date: 'May 27, 2027',
        title: 'Day 1: Western Himalayan Cryosphere Dynamics & Terminus Mass Loss',
        highlight: 'Proposed Plenary Address + Opening of Parallel Technical Tracks A & B'
      },
      {
        dayNumber: 2,
        date: 'May 28, 2027',
        title: 'Day 2: Downstream Hydrology, Springshed Depletion & Agro-Ecological Vulnerability',
        highlight: 'Proposed Roundtable + Parallel Tracks B, C & D'
      },
      {
        dayNumber: 3,
        date: 'May 29, 2027',
        title: 'Day 3: GLOF Early Warning Sensors, Statutory Policy & Summit Communiqué',
        highlight: 'Proposed Communiqué Drafting & Conference Summary'
      }
    ],
    featuredSpeakers: [
      {
        id: 'spk-1',
        name: 'Prof. M. Farooq (Nominated / Invited)',
        title: 'Professor & Head of Earth Sciences',
        institution: 'University of Kashmir',
        avatar: '/images/bear.png',
        bio: 'Senior glaciologist with extensive field and satellite geodetic mass balance research across Western Himalayan glacier basins.',
        status: 'Invited'
      },
      {
        id: 'spk-2',
        name: 'Prof. Elena Rostova (Nominated / Invited)',
        title: 'Senior Cryosphere Research Fellow',
        institution: 'ETH Zurich & ICIMOD Affiliate',
        avatar: '/images/tiger.png',
        bio: 'Specialist in supraglacial debris thermal physics, high-altitude UAV photogrammetry, and Hindu Kush-Himalayan cryospheric ablation modeling.',
        status: 'Invited'
      },
      {
        id: 'spk-3',
        name: 'Dr. Tariq Ahmad (Nominated / Invited)',
        title: 'Associate Professor of Agricultural Hydrology',
        institution: 'SKUAST-Kashmir',
        avatar: '/images/markhor.png',
        bio: 'Researcher on Karewa springshed hydraulics, watershed water budgets, and high-density horticultural irrigation resilience.',
        status: 'Invited'
      }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'April 15, 2027',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 1000,
    bannerImage: '/images/protected-network.png',
    resourceLimits: {
      concurrentRooms: 4,
      cloudStorageGB: 50,
      recordingStatus: 'Standby'
    }
  },
  {
    id: 'conf-2027-wetlands',
    title: 'Himalayan Wetlands & Ramsar Conservation Symposium 2027: Wetland Ecology, Conservation & Hydrological Restoration',
    shortTitle: 'Wetlands Symposium 2027',
    slug: 'himalayan-wetlands-ramsar-conservation-symposium',
    hostingModel: 'institution-hosted',
    hostInstitution: VERIFIED_INSTITUTIONS[2],
    coHosts: [
      'Proposed: Wetlands International South Asia',
      'Proposed: University of Kashmir Limnology Centre'
    ],
    dates: {
      start: '2027-07-15T04:00:00Z',
      end: '2027-07-16T12:00:00Z',
      display: 'July 15–16, 2027 · Proposed (Planning Phase)',
      daysCount: 2
    },
    theme: 'Restoring hydrological connectivity, bathymetric siltation control, and waterbird habitat integrity across Hokersar, Wular, and Haigam Ramsar complexes.',
    description: 'An international symposium in planning under the Kashmir EcoWatch Collaborative Infrastructure. Proposed to evaluate ecological dredge engineering, agricultural siltation dynamics, and migratory flyway conservation across J&K wetlands.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Er. Asif Qadri (Nominated Director)', affiliation: 'Wetlands International South Asia', role: 'Proposed Symposium Director' },
      { name: 'Dr. Bushra Nazir (Nominated Chair)', affiliation: 'KU Limnology Centre', role: 'Proposed Scientific Chair' }
    ],
    tracks: [
      {
        id: 'track-wet-a',
        name: 'Track A · Wetland Bathymetry & Hydro-Ecological Restoration',
        roomCode: 'WETLAND-TRACK-1',
        theme: 'Dredge silt dynamics, macrophyte expansion, and flood channel conveyance',
        chair: 'Nominated Chair',
        chairAffiliation: 'Wetlands Conservation Network',
        sessionsCount: 3
      },
      {
        id: 'track-wet-b',
        name: 'Track B · Avifauna Census & Ramsar Governance Jurisprudence',
        roomCode: 'WETLAND-TRACK-2',
        theme: 'Central Asian Flyway monitoring, winter waterbird indices, and wetland litigation',
        chair: 'Nominated Chair',
        chairAffiliation: 'Ornithological Research Group',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      {
        dayNumber: 1,
        date: 'July 15, 2027',
        title: 'Day 1: Limnological Integrity & Dredging Engineering',
        highlight: 'Proposed Remote Sensing Bathymetric Differencing'
      },
      {
        dayNumber: 2,
        date: 'July 16, 2027',
        title: 'Day 2: Central Asian Flyway Avifaunal Population Ecology',
        highlight: 'Proposed Panel on Transboundary Ramsar Management'
      }
    ],
    featuredSpeakers: [
      {
        id: 'spk-4',
        name: 'Dr. Bushra Nazir (Nominated / Invited)',
        title: 'Senior Limnologist & Wetland Ecologist',
        institution: 'Limnology Research Centre, Srinagar',
        avatar: '/images/bear.png',
        bio: 'Researches benthic macro-invertebrate biotic indexing and waterbird carrying-capacity audits across J&K wetlands.',
        status: 'Invited'
      }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'June 10, 2027',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 500,
    bannerImage: '/images/bear.png',
    resourceLimits: {
      concurrentRooms: 2,
      cloudStorageGB: 25,
      recordingStatus: 'Standby'
    }
  },
  {
    id: 'conf-2027-rivers',
    title: 'Western Himalayan River Systems Conference 2027: Fluvial Geomorphology, Mining Impacts & River Restoration',
    shortTitle: 'River Systems Conference 2027',
    slug: 'western-himalayan-river-systems-conference-2027',
    hostingModel: 'kew-organized',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: [
      'Proposed: SKUAST-K',
      'Proposed: Environmental Law Forum J&K'
    ],
    dates: {
      start: '2027-11-18T04:00:00Z',
      end: '2027-11-19T12:00:00Z',
      display: 'November 18–19, 2027 · Proposed (Planning Phase)',
      daysCount: 2
    },
    theme: 'Riverbed mining, urban expansion, infrastructure, environmental change and sectoral EIA.',
    description: 'A planned 2-day conference examining mechanized excavator impacts on river hydraulics across Rambiara, Doodhganga, and Vaishaw rivers. Proposed to evaluate hydrographic cross-section surveys, fish fauna impacts, and legal benchmarks under NGT jurisprudence.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Dr. Tariq Ahmad (Nominated Chair)', affiliation: 'SKUAST-K', role: 'Proposed Conference Chair' }
    ],
    tracks: [
      {
        id: 'track-geo-1',
        name: 'Track A · River Cross-Section Hydrodynamics & Scouring',
        roomCode: 'GEO-ROOM-1',
        theme: 'Hydrographic surveying and sediment equilibrium models',
        chair: 'Nominated Chair',
        chairAffiliation: 'Fluvial Research Group',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      {
        dayNumber: 1,
        date: 'November 18, 2027',
        title: 'Day 1: Hydro-acoustic Scour Profiling',
        highlight: 'Proposed Survey Methodology of Excavated Riverbeds'
      },
      {
        dayNumber: 2,
        date: 'November 19, 2027',
        title: 'Day 2: Statutory Replenishment Audits & NGT Compliance',
        highlight: 'Proposed Guidelines on Sustainable Riverbed Mining'
      }
    ],
    featuredSpeakers: [
      {
        id: 'spk-3',
        name: 'Dr. Tariq Ahmad (Nominated / Invited)',
        title: 'Associate Professor of Agricultural Hydrology',
        institution: 'SKUAST-Kashmir',
        avatar: '/images/markhor.png',
        bio: 'Lead researcher on fluvial geomorphology, sediment budgets, and river corridor restoration.',
        status: 'Invited'
      }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'October 1, 2027',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 500,
    bannerImage: '/images/markhor.png',
    resourceLimits: {
      concurrentRooms: 1,
      cloudStorageGB: 20,
      recordingStatus: 'Standby'
    }
  },
  {
    id: 'conf-2027-biodiversity',
    title: 'Western Himalayan Biodiversity & Protected Landscapes Congress',
    shortTitle: 'Biodiversity Congress 2027',
    slug: 'western-himalayan-biodiversity-congress-2027',
    hostingModel: 'kew-organized',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: ['Proposed: Wildlife Conservation Network', 'Proposed: University of Kashmir'],
    dates: {
      start: '2027-09-23T04:00:00Z',
      end: '2027-09-24T12:00:00Z',
      display: 'September 23–24, 2027 · Proposed (Planning Phase)',
      daysCount: 2
    },
    theme: 'Wildlife, forests, pollinators, species protection, ecological corridors and nature-based conservation.',
    description: 'A planned 2-day congress synthesizing regional endangered mammal distributions (Hangul, Markhor, Snow Leopard), subalpine treeline corridor dynamics, and community conservation models.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Dr. Khursheed Ahmad (Nominated Chair)', affiliation: 'SKUAST-K', role: 'Proposed Conference Chair' }
    ],
    tracks: [
      {
        id: 'track-bio-1',
        name: 'Track A · Flagship Mammal Populations & Corridors',
        roomCode: 'BIODIV-HALL-1',
        theme: 'Radio-telemetry and camera-trap monitoring in protected sanctuaries',
        chair: 'Nominated Chair',
        chairAffiliation: 'Wildlife Sciences',
        sessionsCount: 3
      },
      {
        id: 'track-bio-2',
        name: 'Track B · Endemic Flora & Subalpine Ethnobotany',
        roomCode: 'BIODIV-HALL-2',
        theme: 'Medicinal plant conservation and nursery propagation',
        chair: 'Nominated Botanist',
        chairAffiliation: 'Botany Department',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      { dayNumber: 1, date: 'September 23, 2027', title: 'Day 1: Threatened Species & Habitat Corridors', highlight: 'Hangul and Markhor Habitat Corridors' },
      { dayNumber: 2, date: 'September 24, 2027', title: 'Day 2: Ethnobotany, Pollinators & Community Forestry', highlight: 'Alpine Flora and Pollinator Baselines' }
    ],
    featuredSpeakers: [
      { id: 'spk-bio-1', name: 'Dr. Khursheed Ahmad (Invited)', title: 'Head of Wildlife Sciences', institution: 'SKUAST-K', avatar: '/images/bear.png', bio: 'Senior wildlife biologist specializing in high-altitude ungulates.', status: 'Invited' }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'August 15, 2027',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 600,
    bannerImage: '/images/tiger.png',
    resourceLimits: { concurrentRooms: 2, cloudStorageGB: 25, recordingStatus: 'Standby' }
  },
  {
    id: 'conf-2028-climate',
    title: 'Western Himalayan Climate, Disaster & Resilience Summit',
    shortTitle: 'Climate & Disaster Summit 2028',
    slug: 'climate-disaster-resilience-summit-2028',
    hostingModel: 'joint',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: ['Proposed: Disaster Management Authority', 'Proposed: Regional Meteorological Center'],
    dates: {
      start: '2028-03-16T04:00:00Z',
      end: '2028-03-18T12:00:00Z',
      display: 'March 16–18, 2028 · Proposed (Planning Phase)',
      daysCount: 3
    },
    theme: 'Atmospheric change, floods, landslides, avalanches, earthquakes, wildfire and regional preparedness.',
    description: 'A planned 3-day multi-hazard summit evaluating compound environmental shocks across Western Himalayan transportation corridors, seismic fault lines, and floodplains.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Er. R. K. Raina (Nominated Chair)', affiliation: 'Disaster Management Authority', role: 'Proposed Chair' }
    ],
    tracks: [
      {
        id: 'track-haz-1',
        name: 'Track A · InSAR Slope Creep & Debris Flow Warning',
        roomCode: 'HAZARD-HALL-A',
        theme: 'Remote sensing of active landslide corridors and highway exposure',
        chair: 'Nominated Geophysicist',
        chairAffiliation: 'Hazard Group',
        sessionsCount: 3
      },
      {
        id: 'track-haz-2',
        name: 'Track B · Seismic Gap & Structural Resilience',
        roomCode: 'HAZARD-HALL-B',
        theme: 'Seismicity, vernacular Taq construction, and urban exposure',
        chair: 'Nominated Structural Engineer',
        chairAffiliation: 'Engineering Faculty',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      { dayNumber: 1, date: 'March 16, 2028', title: 'Day 1: Slope Stability & InSAR Monitoring', highlight: 'NH44 Landslide Real-time InSAR Profiling' },
      { dayNumber: 2, date: 'March 17, 2028', title: 'Day 2: Hydrological Floods & Early Warning', highlight: 'Compound Basin Flooding Simulations' },
      { dayNumber: 3, date: 'March 18, 2028', title: 'Day 3: Seismic Hazard & Community Preparedness', highlight: 'Disaster Risk Reduction Policy Matrix' }
    ],
    featuredSpeakers: [
      { id: 'spk-haz-1', name: 'Er. R. K. Raina (Invited)', title: 'Chief Hazard Specialist', institution: 'Disaster Authority', avatar: '/images/bear.png', bio: 'Expert in mountain slope stabilization and compound hazard mitigation.', status: 'Invited' }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'February 1, 2028',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 600,
    bannerImage: '/images/bear.png',
    resourceLimits: { concurrentRooms: 2, cloudStorageGB: 30, recordingStatus: 'Standby' }
  },
  {
    id: 'conf-2028-eia',
    title: 'Sustainable Himalayan Economies & Sectoral EIA Congress',
    shortTitle: 'Sectoral EIA Congress 2028',
    slug: 'sustainable-himalayan-economies-eia-congress-2028',
    hostingModel: 'kew-organized',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: ['Proposed: Tourism Development Council', 'Proposed: Handicraft Artisans Guild'],
    dates: {
      start: '2028-06-15T04:00:00Z',
      end: '2028-06-16T12:00:00Z',
      display: 'June 15–16, 2028 · Proposed (Planning Phase)',
      daysCount: 2
    },
    theme: 'Environmental impacts of tourism, horticulture, handicrafts, agriculture and infrastructure.',
    description: 'A planned 2-day congress presenting cumulative Sectoral Environmental Impact Assessments across mountain tourism carrying capacities, orchard chemical inputs, and artisan dyeing effluents.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Dr. M. S. Wani (Nominated Chair)', affiliation: 'Ecological Economics Faculty', role: 'Proposed Chair' }
    ],
    tracks: [
      {
        id: 'track-eia-1',
        name: 'Track A · High-Altitude Tourism Footprints & Carrying Capacity',
        roomCode: 'EIA-HALL-1',
        theme: 'Meadow degradation, single-use waste, and hotel sewage footprints',
        chair: 'Nominated Chair',
        chairAffiliation: 'Tourism EIA Panel',
        sessionsCount: 3
      },
      {
        id: 'track-eia-2',
        name: 'Track B · Agro-Chemicals, Horticulture & Handicraft Lifecycles',
        roomCode: 'EIA-HALL-2',
        theme: 'Orchard runoff, water usage, and natural dye lifecycle assessments',
        chair: 'Nominated Agronomist',
        chairAffiliation: 'Horticulture Sciences',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      { dayNumber: 1, date: 'June 15, 2028', title: 'Day 1: Tourism & Mountain Infrastructure Impacts', highlight: 'Meadow Carrying Capacity Framework' },
      { dayNumber: 2, date: 'June 16, 2028', title: 'Day 2: Agriculture, Horticulture & Craft Lifecycles', highlight: 'Sectoral Cumulative Mitigation Dossiers' }
    ],
    featuredSpeakers: [
      { id: 'spk-eia-1', name: 'Dr. M. S. Wani (Invited)', title: 'Director of Environmental Economics', institution: 'SKUAST-K', avatar: '/images/markhor.png', bio: 'Pioneered carrying-capacity modeling for alpine resort destinations.', status: 'Invited' }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'May 1, 2028',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 500,
    bannerImage: '/images/markhor.png',
    resourceLimits: { concurrentRooms: 2, cloudStorageGB: 25, recordingStatus: 'Standby' }
  },
  {
    id: 'conf-2028-education',
    title: 'Western Himalayan Environmental Education & Civil Society Congress',
    shortTitle: 'Environmental Education Congress 2028',
    slug: 'environmental-education-civil-society-congress-2028',
    hostingModel: 'joint',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: ['Proposed: State School Education Board', 'Proposed: Kashmir Environmental NGO Alliance'],
    dates: {
      start: '2028-09-21T04:00:00Z',
      end: '2028-09-22T12:00:00Z',
      display: 'September 21–22, 2028 · Proposed (Planning Phase)',
      daysCount: 2
    },
    theme: 'Outdoor Classroom, youth research, NGOs, environmental communication, scientific inclusion and restoration.',
    description: 'A planned 2-day educational convention establishing standardized school field protocols, authenticating NGO stewardship metrics, and celebrating student environmental research.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Prof. Nighat Ara (Nominated Chair)', affiliation: 'Educational Pedagogy Institute', role: 'Proposed Chair' }
    ],
    tracks: [
      {
        id: 'track-edu-1',
        name: 'Track A · Experiential Outdoor Education & Field Protocols',
        roomCode: 'EDU-HALL-1',
        theme: 'Integrating Western Himalayan field science into school eco-clubs',
        chair: 'Nominated Educator',
        chairAffiliation: 'Science Pedagogy',
        sessionsCount: 3
      },
      {
        id: 'track-edu-2',
        name: 'Track B · Grassroots NGO Impact & Community Restoration',
        roomCode: 'EDU-HALL-2',
        theme: 'Auditing volunteer conservation impact and CSR transparency',
        chair: 'Nominated Civil Society Lead',
        chairAffiliation: 'NGO Forum',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      { dayNumber: 1, date: 'September 21, 2028', title: 'Day 1: School Field Science & Eco-Clubs', highlight: 'Outdoor Classroom Curriculum Standard' },
      { dayNumber: 2, date: 'September 22, 2028', title: 'Day 2: NGO Impact Verification & EcoVoices', highlight: 'Civil Society Restoration Accreditation' }
    ],
    featuredSpeakers: [
      { id: 'spk-edu-1', name: 'Prof. Nighat Ara (Invited)', title: 'Dean of Environmental Pedagogy', institution: 'University of Kashmir', avatar: '/images/tiger.png', bio: 'Champion of experiential outdoor classroom learning in montane high schools.', status: 'Invited' }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'August 1, 2028',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 600,
    bannerImage: '/images/tiger.png',
    resourceLimits: { concurrentRooms: 2, cloudStorageGB: 25, recordingStatus: 'Standby' }
  },
  {
    id: 'conf-2028-synthesis',
    title: 'Western Himalayan Earth Systems, Conservation & Restoration Congress',
    shortTitle: 'Earth Systems & Restoration Congress 2028',
    slug: 'earth-systems-restoration-congress-2028',
    hostingModel: 'kew-organized',
    hostInstitution: VERIFIED_INSTITUTIONS[0],
    coHosts: ['Proposed: Pan-Himalayan Earth Science Consortium', 'Proposed: Botanical Survey of India'],
    dates: {
      start: '2028-11-16T04:00:00Z',
      end: '2028-11-18T12:00:00Z',
      display: 'November 16–18, 2028 · Proposed (Planning Phase)',
      daysCount: 3
    },
    theme: 'Satellite change detection, ecological recovery, spatial intelligence, conservation policy and the two-year scientific synthesis.',
    description: 'The culminating 3-day congress reviewing 104 activities from the 2027–2028 program. Synthesizing ecological baselines, GIS atlas layers, restoration effectiveness, and defining the 2029–2030 research priorities.',
    status: 'proposed',
    isPeerReviewed: false,
    scientificCommittee: [
      { name: 'Scientific Secretariat Joint Committee', affiliation: 'Kashmir EcoWatch', role: 'Secretariat Chairs' }
    ],
    tracks: [
      {
        id: 'track-syn-1',
        name: 'Track A · Decadal Satellite Earth Observation Synthesis',
        roomCode: 'SYNTHESIS-HALL-A',
        theme: 'Two-year satellite change detection and land transformation',
        chair: 'Nominated Earth Scientist',
        chairAffiliation: 'Earth System Group',
        sessionsCount: 3
      },
      {
        id: 'track-syn-2',
        name: 'Track B · Two-Year Restoration & Policy Roadmap (2029–2030)',
        roomCode: 'SYNTHESIS-HALL-B',
        theme: 'Translating scientific evidence into regional environmental governance',
        chair: 'Nominated Policy Chair',
        chairAffiliation: 'Policy Forum',
        sessionsCount: 3
      }
    ],
    dailyThemes: [
      { dayNumber: 1, date: 'November 16, 2028', title: 'Day 1: Two-Year Remote Sensing & Cryosphere Synthesis', highlight: 'Decadal Glaciological & Land Change Synthesis' },
      { dayNumber: 2, date: 'November 17, 2028', title: 'Day 2: Water, Forests & Ecological Restoration Outcomes', highlight: 'Comprehensive Watershed Health Evaluation' },
      { dayNumber: 3, date: 'November 18, 2028', title: 'Day 3: Western Himalayan Research Priorities 2029–2030', highlight: 'Institutional Program Declaration & DOI Index' }
    ],
    featuredSpeakers: [
      { id: 'spk-syn-1', name: 'Scientific Secretariat (KEW)', title: 'Director of Scientific Research', institution: 'Kashmir EcoWatch', avatar: '/images/bear.png', bio: 'Leading the integrated Western Himalayan environmental intelligence framework.', status: 'Invited' }
    ],
    abstractSubmissionsOpen: true,
    abstractDeadline: 'October 1, 2028',
    proceedingsDoi: undefined,
    registeredCount: 0,
    maxCapacity: 800,
    bannerImage: '/images/bear.png',
    resourceLimits: { concurrentRooms: 3, cloudStorageGB: 40, recordingStatus: 'Standby' }
  }
];

export const SESSIONS_DETAILED: ConferenceSessionDetailed[] = [
  {
    id: 'session-cryo-d1-plenary',
    conferenceId: 'kew-conf-2027-cryo',
    trackId: 'track-cryo-a',
    trackName: 'Track A · Glacial Mass Balance & InSAR Remote Sensing',
    title: 'Proposed Plenary: Geodetic Mass Balance Differencing of Western Himalayan Snouts (1980–2027)',
    sessionType: 'Plenary Keynote',
    dayNumber: 1,
    date: '2027-05-27',
    startTime: '09:30',
    endTime: '10:30',
    timeDisplay: '09:30 - 10:30 IST (Proposed)',
    roomCode: 'CRYO-ROOM-A',
    roomName: 'Virtual Auditorium A (In Planning)',
    moderator: {
      id: 'spk-1',
      name: 'Prof. M. Farooq (Nominated / Invited)',
      title: 'Professor & Head of Earth Sciences',
      institution: 'University of Kashmir',
      avatar: '/images/bear.png',
      bio: 'Senior glaciologist with extensive field and satellite geodetic mass balance research.',
      status: 'Invited'
    },
    speakers: [
      {
        id: 'spk-1',
        name: 'Prof. M. Farooq (Nominated / Invited)',
        title: 'Professor & Head of Earth Sciences',
        institution: 'University of Kashmir',
        avatar: '/images/bear.png',
        bio: 'Senior glaciologist with extensive field and satellite geodetic mass balance research.',
        status: 'Invited'
      }
    ],
    abstract: 'Proposed inaugural presentation to synthesize four decades of topographic map contours, SRTM DEMs, TanDEM-X radar interferometry, and Sentinel-2 optical disparity grids across the Kolahoi glacier complex.',
    status: 'proposed',
    questionsCount: 0,
    attendeesCount: 0
  },
  {
    id: 'session-cryo-d1-insar',
    conferenceId: 'kew-conf-2027-cryo',
    trackId: 'track-cryo-a',
    trackName: 'Track A · Glacial Mass Balance & InSAR Remote Sensing',
    title: 'Proposed Technical Session: TanDEM-X DEM Co-registration Uncertainties in Steep Himalayan Scarp Topography',
    sessionType: 'Parallel Technical Paper',
    dayNumber: 1,
    date: '2027-05-27',
    startTime: '10:45',
    endTime: '12:00',
    timeDisplay: '10:45 - 12:00 IST (Proposed)',
    roomCode: 'CRYO-ROOM-A',
    roomName: 'Virtual Hall A (In Planning)',
    moderator: {
      id: 'spk-2',
      name: 'Nominated Session Moderator',
      title: 'Cryosphere Researcher',
      institution: 'Scientific Committee',
      avatar: '/images/tiger.png',
      bio: 'Specialist in supraglacial thermal physics and radar analysis.'
    },
    speakers: [],
    abstract: 'Evaluating aspect-dependent phase distortions and non-glaciated stable terrain elevation biases across steep cirque walls in the Greater Himalayan Range.',
    status: 'proposed',
    questionsCount: 0,
    attendeesCount: 0
  },
  {
    id: 'session-wetlands-d1-bathymetry',
    conferenceId: 'conf-2027-wetlands',
    trackId: 'track-wet-a',
    trackName: 'Track A · Wetland Bathymetry & Hydro-Ecological Restoration',
    title: 'Proposed Keynote: Hokersar & Wular Bathymetric Infilling Differential Analysis & Dredging Strategies',
    sessionType: 'Plenary Keynote',
    dayNumber: 1,
    date: '2027-07-15',
    startTime: '10:00',
    endTime: '11:30',
    timeDisplay: '10:00 - 11:30 IST (Proposed)',
    roomCode: 'WETLAND-TRACK-1',
    roomName: 'Virtual Auditorium (Wetlands)',
    moderator: {
      id: 'spk-5',
      name: 'Er. Asif Qadri (Nominated / Invited)',
      title: 'Ecological Hydrology Consultant',
      institution: 'Wetlands International South Asia',
      avatar: '/images/tiger.png',
      bio: 'Hydrological consultant on wetland water control and dredge designs.'
    },
    speakers: [],
    abstract: 'Proposed presentation evaluating sediment infilling in Hokersar and the northern littoral zones of Wular Lake, examining how mechanized dredge spoils must be repurposed.',
    status: 'proposed',
    questionsCount: 0,
    attendeesCount: 0
  }
];

export const ABSTRACT_SUBMISSIONS: AbstractSubmission[] = [
  {
    id: 'abs-2027-001',
    conferenceId: 'kew-conf-2027-cryo',
    conferenceTitle: 'Western Himalayan Cryosphere Summit 2027',
    trackId: 'track-cryo-a',
    trackName: 'Track A · Glacial Mass Balance & InSAR Remote Sensing',
    title: 'Spaceborne Differential InSAR Coherence Tracking Across Kolahoi Glacier Terminus (Proposed Submission)',
    authors: [
      { name: 'Lead Author Nominee', affiliation: 'Department of Earth Sciences', email: 'author@academic.edu', isPresenter: true }
    ],
    abstractText: 'Presents methodological framework for processing Sentinel-1 radar pairs using TOPSAR split-beam interferometry to calculate line-of-sight displacement during summer ablation seasons.',
    keywords: ['InSAR', 'Sentinel-1', 'Kolahoi Glacier', 'Terminus Recession', 'Geodetic Mass Balance'],
    status: 'submitted',
    submittedAt: '2026-11-08T14:22:00Z',
    assignedReviewers: [],
    reviewerScores: []
  }
];

export interface ScheduleConflictResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateConferenceSchedule(
  candidateSession: {
    id?: string;
    conferenceId: string;
    roomCode: string;
    date: string;
    startTime: string;
    endTime: string;
    speakerNames: string[];
    moderatorName?: string;
  },
  existingSessions: ConferenceSessionDetailed[],
  conference: ConferenceDetailed
): ScheduleConflictResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const sessDate = new Date(candidateSession.date);
  const confStart = new Date(conference.dates.start.split('T')[0]);
  const confEnd = new Date(conference.dates.end.split('T')[0]);

  if (sessDate < confStart || sessDate > confEnd) {
    errors.push(
      `Session date (${candidateSession.date}) is outside configured conference dates (${conference.dates.display}).`
    );
  }

  const parseMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + (m || 0);
  };

  const candStart = parseMinutes(candidateSession.startTime);
  const candEnd = parseMinutes(candidateSession.endTime);

  if (candEnd <= candStart) {
    errors.push(`Session end time (${candidateSession.endTime}) must be strictly after start time (${candidateSession.startTime}).`);
  }

  for (const existing of existingSessions) {
    if (existing.id === candidateSession.id) continue;
    if (existing.date !== candidateSession.date) continue;

    const existStart = parseMinutes(existing.startTime);
    const existEnd = parseMinutes(existing.endTime);

    const isOverlapping = Math.max(candStart, existStart) < Math.min(candEnd, existEnd);

    if (isOverlapping) {
      if (existing.roomCode === candidateSession.roomCode) {
        errors.push(
          `Room Conflict: Virtual Hall "${candidateSession.roomCode}" is already scheduled for "${existing.title}" (${existing.startTime} - ${existing.endTime}).`
        );
      }

      const candidateSpeakersLower = candidateSession.speakerNames.map(s => s.toLowerCase().trim());
      const existingSpeakersLower = existing.speakers.map(s => s.name.toLowerCase().trim());

      for (const spk of candidateSpeakersLower) {
        if (existingSpeakersLower.includes(spk)) {
          errors.push(
            `Speaker Overlap: Speaker "${spk}" is already scheduled in simultaneous session "${existing.title}" in room ${existing.roomCode}.`
          );
        }
      }

      if (candidateSession.moderatorName && existing.moderator) {
        if (candidateSession.moderatorName.toLowerCase().trim() === existing.moderator.name.toLowerCase().trim()) {
          errors.push(
            `Moderator Double-Booking: Moderator "${candidateSession.moderatorName}" is already assigned to "${existing.title}" at this exact time.`
          );
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function formatTimeWithTimezone(timeString: string, targetTimezoneCode: string = 'IST'): string {
  const tz = SUPPORTED_TIMEZONES.find(t => t.code === targetTimezoneCode);
  if (!tz || targetTimezoneCode === 'IST') {
    return `${timeString} IST`;
  }

  try {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (!isNaN(hours) && !isNaN(minutes)) {
      const diffMinutes = tz.offsetMinutes - 330;
      let totalMinutes = hours * 60 + minutes + diffMinutes;
      if (totalMinutes < 0) totalMinutes += 1440;
      totalMinutes = totalMinutes % 1440;
      const targetHours = Math.floor(totalMinutes / 60);
      const targetMins = totalMinutes % 60;
      const pad = (n: number) => n.toString().padStart(2, '0');
      return `${pad(targetHours)}:${pad(targetMins)} ${tz.code}`;
    }
  } catch {
    // fallback
  }
  return `${timeString} (${tz.code})`;
}
