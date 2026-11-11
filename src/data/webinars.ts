export interface Speaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  avatar: string;
  bio: string;
  orcid?: string;
  status?: 'Invited' | 'Proposed' | 'Confirmed';
}

export interface AgendaItem {
  time: string;
  title: string;
  speaker: string;
  affiliation: string;
  description?: string;
}

export interface ConferenceTrack {
  id: string;
  name: string;
  roomCode: string;
  theme: string;
  chair: string;
  sessions: {
    time: string;
    title: string;
    speaker: string;
    affiliation: string;
  }[];
}

export type EventStatus = 
  | 'draft' 
  | 'proposed' 
  | 'under_review' 
  | 'confirmed' 
  | 'registration_open' 
  | 'live' 
  | 'completed' 
  | 'archived';

export interface WebinarSession {
  id: string;
  title: string;
  slug: string;
  type: 'webinar' | 'conference' | 'symposium' | 'roundtable';
  status: EventStatus;
  isMultiDay: boolean;
  dateDisplay: string;
  startDate: string; // ISO
  endDate: string; // ISO
  timeZone: string;
  discipline: 'Cryosphere & Glaciology' | 'Limnology & Wetlands' | 'Forest Ecology' | 'Fluvial Geomorphology' | 'Environmental Law & NGT' | 'Atmospheric Physics';
  abstract: string;
  agenda: AgendaItem[];
  tracks?: ConferenceTrack[];
  speakers: Speaker[];
  coHosts: string[];
  registeredCount: number;
  maxCapacity: number;
  roomCode: string;
  recordingUrl?: string;
  proceedingsDoi?: string;
  materialsCount?: number;
  featured: boolean;
  bannerImage: string;
}

export interface CertificateRecord {
  id: string;
  recipientName: string;
  institution: string;
  webinarTitle: string;
  webinarId: string;
  webinarDate: string;
  role: 'Certified Delegate' | 'Keynote Speaker' | 'Expert Panelist' | 'Session Chair';
  attendancePercentage: number;
  hoursEarned: number;
  issueDate: string;
  hash: string;
  verified: boolean;
  isDemoRecord?: boolean;
}

export interface QnAItem {
  id: string;
  author: string;
  affiliation: string;
  question: string;
  upvotes: number;
  isAnswered: boolean;
  answer?: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  role: 'Host' | 'Speaker' | 'Panelist' | 'Delegate' | 'Moderator';
  message: string;
  timestamp: string;
  isSpeakerOnly?: boolean;
}

export const SCIENTIFIC_WEBINARS: WebinarSession[] = [
  {
    id: 'kew-conf-2027-cryo',
    title: 'Western Himalayan Cryosphere Summit 2027: Glacier Change, Remote Sensing & Mountain Hydrology',
    slug: 'western-himalayan-cryosphere-summit-2027',
    type: 'conference',
    status: 'proposed',
    isMultiDay: true,
    dateDisplay: 'May 27–29, 2027 • Proposed (Planning Phase)',
    startDate: '2027-05-27T04:00:00Z',
    endDate: '2027-05-29T12:00:00Z',
    timeZone: 'IST (UTC+05:30)',
    discipline: 'Cryosphere & Glaciology',
    abstract: 'A premier 3-day multi-track international scientific conference in planning. Proposed to gather glaciologists, remote sensing geophysicists, hydrologists, and climate adaptation authorities to synthesize four decades of geodetic mass balance observations across Kolahoi, Thajiwas, and Machoi glaciers with downstream agricultural discharge models.',
    agenda: [
      { time: '09:30 - 10:15 IST', title: 'Proposed Plenary Inaugural: Geodetic Mass Balance Differencing of Western Himalayan Snouts', speaker: 'Invited Keynote Speaker', affiliation: 'University of Kashmir (Proposed)', description: 'TanDEM-X and Sentinel-2 differential analysis indicating Kolahoi terminus downwasting.' },
      { time: '10:30 - 12:00 IST', title: 'Parallel Track Sessions (Track A: Glaciology | Track B: Downstream Hydrology | Track C: GLOF Policy)', speaker: 'Proposed Session Chairs', affiliation: 'Virtual Breakout Halls' },
      { time: '13:00 - 14:30 IST', title: 'Invited Keynote: Supraglacial Debris Thickness & Thermal Insulating Gradients', speaker: 'Invited Cryosphere Researcher', affiliation: 'ICIMOD / European Glaciological Network (Invited)' },
      { time: '15:00 - 16:30 IST', title: 'Proposed Roundtable: Late-Summer Meltwater Dependency in Jhelum Paddy Basins', speaker: 'Panel Nominees', affiliation: 'Agricultural Universities & Hydrological Agencies' },
      { time: '16:45 - 17:30 IST', title: 'Statutory Synthesis & Communiqué Drafting for NGT & Policy Makers', speaker: 'Organizing Committee', affiliation: 'Conference Steering Group' }
    ],
    tracks: [
      {
        id: 'track-a',
        name: 'Track A: Glacial Mass Balance & InSAR Remote Sensing',
        roomCode: 'CRYO-ROOM-A',
        theme: 'Spaceborne radar interferometry, geodetic thinning, and snout retreat kinematics',
        chair: 'Invited Chair (KU Earth Sciences)',
        sessions: [
          { time: '10:30 - 11:15 IST', title: 'Kolahoi Glacier Downwasting Trends 1980–2027', speaker: 'Invited Researcher', affiliation: 'Proposed Keynote' },
          { time: '11:15 - 12:00 IST', title: 'TanDEM-X DEM Co-registration Uncertainties in Steep Himalayan Scarp', speaker: 'Invited Scientist', affiliation: 'Wadia Institute (Invited)' }
        ]
      },
      {
        id: 'track-b',
        name: 'Track B: Downstream Hydrological Basins & Agro-Ecology',
        roomCode: 'CRYO-ROOM-B',
        theme: 'Snow-water equivalent deficits, springhead connectivity, and irrigation canals',
        chair: 'Invited Chair (SKUAST-K)',
        sessions: [
          { time: '10:30 - 11:15 IST', title: 'Lidder Basin Discharge Variabilities in Late July and August', speaker: 'Invited Hydrologist', affiliation: 'Irrigation & Flood Control (Invited)' },
          { time: '11:15 - 12:00 IST', title: 'High-Density Apple Orchard Evapotranspiration vs Glacial Runoff', speaker: 'Invited Agro-ecologist', affiliation: 'SKUAST-K (Invited)' }
        ]
      },
      {
        id: 'track-c',
        name: 'Track C: GLOF Early Warning & Statutory Policy Frameworks',
        roomCode: 'CRYO-ROOM-C',
        theme: 'Proglacial lake expansions, moraine dam breach modeling, and civil protection',
        chair: 'Invited Legal & Disaster Management Chair',
        sessions: [
          { time: '10:30 - 11:15 IST', title: 'Satellite Automated Moraine Lake Outburst Early Warning Systems', speaker: 'Invited Engineer', affiliation: 'Disaster Management Cell (Invited)' },
          { time: '11:15 - 12:00 IST', title: 'Legal Precedents for Headwater Ecological Buffer Protection in Himalayan States', speaker: 'Invited Jurist', affiliation: 'Environmental Law Forum (Invited)' }
        ]
      }
    ],
    speakers: [
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
    coHosts: [
      'Proposed: University of Kashmir',
      'Proposed: SKUAST-Kashmir',
      'Proposed: Dr. Kumar Foundation USA'
    ],
    registeredCount: 0,
    maxCapacity: 1000,
    roomCode: 'CRYO-CONF-2027',
    proceedingsDoi: undefined,
    materialsCount: 0,
    featured: true,
    bannerImage: '/images/protected-network.png'
  },
  {
    id: 'conf-2027-wetlands',
    title: 'Himalayan Wetlands & Ramsar Conservation Symposium 2027: Wetland Ecology, Conservation & Hydrological Restoration',
    slug: 'himalayan-wetlands-ramsar-conservation-symposium',
    type: 'conference',
    status: 'proposed',
    isMultiDay: true,
    dateDisplay: 'July 15–16, 2027 • Proposed (Planning Phase)',
    startDate: '2027-07-15T04:00:00Z',
    endDate: '2027-07-16T12:00:00Z',
    timeZone: 'IST (UTC+05:30)',
    discipline: 'Limnology & Wetlands',
    abstract: 'Proposed international symposium dedicated to wetland ecology, hydrological connectivity, bathymetric siltation differencing, and waterbird habitat integrity across Hokersar, Wular, and Haigam Ramsar complexes.',
    agenda: [
      { time: '10:00 - 10:30 IST', title: 'Opening Remarks & Wetland Baselines', speaker: 'Proposed Chair', affiliation: 'Limnological Society' },
      { time: '10:30 - 11:30 IST', title: 'Empirical Findings: Multi-Decadal Hokersar Marsh Contraction', speaker: 'Invited Wetland Scientist', affiliation: 'KU Limnology Centre (Invited)' },
      { time: '11:45 - 12:45 IST', title: 'Hydraulic Desiltation Design vs Macrophyte Regeneration Dynamics', speaker: 'Invited Hydrologist', affiliation: 'Wetlands International South Asia (Invited)' }
    ],
    speakers: [
      {
        id: 'spk-4',
        name: 'Dr. Bushra Nazir (Nominated / Invited)',
        title: 'Senior Limnologist & Wetland Ecologist',
        institution: 'Limnology Research Centre, Srinagar',
        avatar: '/images/bear.png',
        bio: 'Researches benthic macro-invertebrate biotic indexing and waterbird carrying-capacity audits across J&K wetlands.',
        status: 'Invited'
      },
      {
        id: 'spk-5',
        name: 'Er. Asif Qadri (Nominated / Invited)',
        title: 'Ecological Hydrology Consultant',
        institution: 'Wetlands International South Asia',
        avatar: '/images/tiger.png',
        bio: 'Designs ecological water control structures and channel de-silting models across Wular Lake and Haigam wetland.',
        status: 'Invited'
      }
    ],
    coHosts: [
      'Proposed: Wetlands International South Asia',
      'Proposed: University of Kashmir Limnology Centre'
    ],
    registeredCount: 0,
    maxCapacity: 500,
    roomCode: 'WETLAND-CONF-2027',
    featured: true,
    bannerImage: '/images/bear.png'
  },
  {
    id: 'conf-2027-rivers',
    title: 'Western Himalayan River Systems Conference 2027: Fluvial Geomorphology, Mining Impacts & River Restoration',
    slug: 'western-himalayan-river-systems-conference-2027',
    type: 'conference',
    status: 'proposed',
    isMultiDay: true,
    dateDisplay: 'October 14–15, 2027 • Proposed (Planning Phase)',
    startDate: '2027-10-14T04:00:00Z',
    endDate: '2027-10-15T12:00:00Z',
    timeZone: 'IST (UTC+05:30)',
    discipline: 'Fluvial Geomorphology',
    abstract: 'Proposed 2-day conference examining mechanized riverbed excavator impacts on tributary hydraulics, acoustic Doppler scour profiling, alluvial aquifer de-watering, and statutory sand replenishment audit methodologies across Rambiara, Doodhganga, and Vaishaw rivers.',
    agenda: [
      { time: '10:00 - 10:45 IST', title: 'Hydrographic Cross-Section Surveys of Excavated Stream Beds', speaker: 'Invited Fluvial Geomorphologist', affiliation: 'SKUAST-K (Invited)' },
      { time: '11:00 - 12:00 IST', title: 'Aquifer Water Table Drawdown & Baseflow Decapitation', speaker: 'Invited Hydrologist', affiliation: 'Water Resources Agency (Invited)' }
    ],
    speakers: [
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
    coHosts: [
      'Proposed: SKUAST-K',
      'Proposed: Environmental Law Forum J&K'
    ],
    registeredCount: 0,
    maxCapacity: 500,
    roomCode: 'RIVERS-CONF-2027',
    featured: true,
    bannerImage: '/images/markhor.png'
  },
  {
    id: 'kew-web-2027-karewa',
    title: 'Pleistocene Karewa Plateaus Under Threat: Geomorphological Loss & Statutory Protections',
    slug: 'pleistocene-karewa-geomorphology-statutory-protection',
    type: 'roundtable',
    status: 'proposed',
    isMultiDay: false,
    dateDisplay: 'June 24, 2027 • Proposed Technical Roundtable',
    startDate: '2027-06-24T10:30:00Z',
    endDate: '2027-06-24T12:30:00Z',
    timeZone: 'IST (UTC+05:30)',
    discipline: 'Fluvial Geomorphology',
    abstract: 'An interdisciplinary scientific roundtable in planning to dissect the leveling of ancient Karewa lacustrine terraces in Budgam and Pulwama for clay embankment fill, examining loss of Paleolithic strata, saffron agro-ecology, and groundwater decapitation.',
    agenda: [
      { time: '16:00 - 16:30 IST', title: 'The Pleistocene Lacustrine Chronicle of Kashmir', speaker: 'Invited Geologist', affiliation: 'Geological Society (Invited)' }
    ],
    speakers: [],
    coHosts: ['Proposed: Geological Society of India (Kashmir Chapter)'],
    registeredCount: 0,
    maxCapacity: 400,
    roomCode: 'KAREWA-ROUND-2027',
    featured: false,
    bannerImage: '/images/tiger.png'
  },
  {
    id: 'kew-web-2027-forests',
    title: 'Subalpine Treeline Dynamics & Hangul Habitat Preservation in Greater Dachigam Landscape',
    slug: 'subalpine-treeline-dynamics-hangul-habitat',
    type: 'symposium',
    status: 'proposed',
    isMultiDay: false,
    dateDisplay: 'September 16, 2027 • Proposed Technical Webinar',
    startDate: '2027-09-16T09:00:00Z',
    endDate: '2027-09-16T11:30:00Z',
    timeZone: 'IST (UTC+05:30)',
    discipline: 'Forest Ecology',
    abstract: 'Proposed technical webinar synthesizing satellite canopy classification, camera-trap occupancy models, and winter grazing competition between domestic livestock and the critically endangered Kashmir Red Stag (Hangul).',
    agenda: [
      { time: '14:30 - 15:15 IST', title: 'Forest Canopy Density in Upper Dachigam Corridors', speaker: 'Invited Wildlife Biologist', affiliation: 'SKUAST-K Wildlife Division (Invited)' }
    ],
    speakers: [],
    coHosts: ['Proposed: Wildlife Trust of India', 'Proposed: SKUAST-K'],
    registeredCount: 0,
    maxCapacity: 600,
    roomCode: 'FOREST-WEB-2027',
    featured: false,
    bannerImage: '/images/protected-network.png'
  }
];

// Production truth: 0 issued certificates (the platform is preparing for its inaugural 2027 program)
export const SAMPLE_CERTIFICATES: CertificateRecord[] = [];

// Demonstration test vector for testing the cryptographic verification engine UI
export const DEMO_TEST_CERTIFICATE: CertificateRecord = {
  id: 'KEW-CERT-TEST-0001',
  recipientName: 'Demonstration Test Delegate',
  institution: 'Test Environment Institution',
  webinarTitle: 'Western Himalayan Cryosphere Summit (Verification Test Vector)',
  webinarId: 'kew-conf-2027-cryo',
  webinarDate: 'May 27–29, 2027 (Pre-Flight Test)',
  role: 'Certified Delegate',
  attendancePercentage: 100,
  hoursEarned: 18.0,
  issueDate: '2027-05-30',
  hash: '0x9fa4b2e8812c3f9104ad89bca74e2298cde381274abf192837482a17cbef0192',
  verified: true,
  isDemoRecord: true
};

export const SAMPLE_QNA_ITEMS: QnAItem[] = [
  {
    id: 'qna-demo-1',
    author: 'Visiting Researcher (Demonstration)',
    affiliation: 'Water Resources Planning Cell',
    question: 'How will the proposed 2027 conference reconcile TanDEM-X geodetic mass balance differencing with observed late-summer discharge drops in the Lidder canal off-takes?',
    upvotes: 3,
    isAnswered: true,
    answer: 'Proposed Conference Chair: In the planned 2027 sessions, ablation zone thinning data will be compared against discharge models from 1980 baselines.',
    timestamp: 'Planning Queue'
  }
];

export const SAMPLE_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'chat-demo-1',
    sender: 'KEW Technical Team',
    role: 'Host',
    message: 'Welcome to the Virtual Conference Pre-Flight Environment. Audio, video, and screen sharing streams are operational for 2027 session testing.',
    timestamp: '10:00 AM'
  }
];

export const WEBINAR_KPIS = [
  { label: 'Proposed Summits', value: '3 Proposed for 2027', icon: 'Layers', color: 'text-teal-400' },
  { label: 'Confirmed Delegates', value: '0 Confirmed', icon: 'Users', color: 'text-slate-400' },
  { label: 'Confirmed Partners', value: '0 Confirmed (Inviting)', icon: 'ShieldCheck', color: 'text-emerald-400' },
  { label: 'Proceedings DOIs', value: '0 Verified (Post-Event)', icon: 'FileText', color: 'text-slate-400' },
  { label: 'Virtual Halls', value: 'Setup & Pre-Flight Mode', icon: 'Video', color: 'text-rose-400' },
  { label: 'Issued Certificates', value: '0 Issued', icon: 'Award', color: 'text-slate-400' },
  { label: 'Conducted Sessions', value: 'No Sessions Conducted', icon: 'Clock', color: 'text-slate-400' },
  { label: 'Security Standard', value: 'LiveKit / WebRTC Ready', icon: 'Lock', color: 'text-emerald-300' }
];
