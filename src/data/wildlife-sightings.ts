import { Scope } from './geography';

export type ObservationType = 'Verified Observation' | 'Citizen Science Observation' | 'Camera Trap Observation' | 'Scientific Survey Record' | 'Community Report' | 'Historical Observation';
export type VerificationStatus = 'Unverified' | 'Community Reviewed' | 'Expert Verified' | 'Scientific Record' | 'Government Confirmed';
export type TaxonomicGroup = 'Birds' | 'Mammals' | 'Fish' | 'Reptiles' | 'Amphibians' | 'Butterflies' | 'Flora' | 'Medicinal Flora';
export type ConservationStatus = 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
export type Habitat = 'Forest' | 'Wetland' | 'Alpine' | 'Riverine' | 'Grassland' | 'Agricultural' | 'Urban';

export interface WildlifeSighting {
  id: string;
  observationType: ObservationType;
  verificationStatus: VerificationStatus;
  submissionDate: string;
  verificationDate?: string;
  
  // Species Information
  commonName: string;
  scientificName: string;
  taxonomicGroup: TaxonomicGroup;
  conservationStatus: ConservationStatus;
  isThreatened: boolean;
  
  // Observer Information
  observerName: string;
  observerType: 'Citizen Scientist' | 'Researcher' | 'Government Staff' | 'Protected Area Staff' | 'Community Member' | 'Photographer' | 'Birdwatcher' | 'NGO';
  affiliation?: string;
  
  // Location Intelligence
  scope: Scope;
  region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  administrativeUnit: string;
  protectedArea?: string;
  habitat: Habitat;
  locationAccuracy: 'Exact' | 'Approximate' | 'Generalized' | 'Sensitive Species Protected';
  coordinates?: { lat: number; lng: number }; // undefined if obscured
  elevation?: number;
  
  // Evidence
  evidenceType: ('Photograph' | 'Video' | 'Audio' | 'Camera Trap' | 'Direct Observation' | 'Tracks' | 'Scat' | 'Nest' | 'Carcass' | 'Sign Survey')[];
  
  // Observation Details
  observationDate: string;
  count: number;
  behavior: string;
  shortDescription: string;
}

// Automatically obscure sensitive species coordinates during rendering or data creation
const SENSITIVE_SPECIES = [
  'Hangul', 'Snow Leopard', 'Kashmir Musk Deer', 'Markhor', 'Western Tragopan', 'Black-necked Crane'
];

export const isSensitive = (name: string) => SENSITIVE_SPECIES.includes(name);

export const wildlifeSightingsData: WildlifeSighting[] = [
  {
    id: 'ws-001',
    observationType: 'Scientific Survey Record',
    verificationStatus: 'Government Confirmed',
    submissionDate: '2026-05-15',
    verificationDate: '2026-05-20',
    commonName: 'Hangul',
    scientificName: 'Cervus hanglu hanglu',
    taxonomicGroup: 'Mammals',
    conservationStatus: 'CR',
    isThreatened: true,
    observerName: 'Dept of Wildlife Protection',
    observerType: 'Government Staff',
    scope: 'Kashmir Core',
    region: 'Kashmir Core',
    administrativeUnit: 'Srinagar',
    protectedArea: 'Dachigam National Park',
    habitat: 'Forest',
    locationAccuracy: 'Sensitive Species Protected',
    elevation: 2400,
    evidenceType: ['Photograph', 'Direct Observation'],
    observationDate: '2026-05-10',
    count: 3,
    behavior: 'Feeding',
    shortDescription: 'Observed grazing in mixed temperate forest near a seasonal stream corridor.'
  },
  {
    id: 'ws-002',
    observationType: 'Camera Trap Observation',
    verificationStatus: 'Scientific Record',
    submissionDate: '2026-04-10',
    verificationDate: '2026-04-15',
    commonName: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    taxonomicGroup: 'Mammals',
    conservationStatus: 'VU',
    isThreatened: true,
    observerName: 'Snow Leopard Trust',
    observerType: 'Researcher',
    scope: 'Trans-Divisional',
    region: 'Ladakh',
    administrativeUnit: 'Leh',
    protectedArea: 'Hemis National Park',
    habitat: 'Alpine',
    locationAccuracy: 'Sensitive Species Protected',
    elevation: 4100,
    evidenceType: ['Camera Trap'],
    observationDate: '2026-04-05',
    count: 1,
    behavior: 'Hunting',
    shortDescription: 'Adult detected via remote camera trap moving along a high-altitude ridgeline.'
  },
  {
    id: 'ws-003',
    observationType: 'Citizen Science Observation',
    verificationStatus: 'Expert Verified',
    submissionDate: '2026-06-01',
    verificationDate: '2026-06-03',
    commonName: 'Black-necked Crane',
    scientificName: 'Grus nigricollis',
    taxonomicGroup: 'Birds',
    conservationStatus: 'NT',
    isThreatened: true,
    observerName: 'Tenzin Norboo',
    observerType: 'Birdwatcher',
    scope: 'Trans-Divisional',
    region: 'Ladakh',
    administrativeUnit: 'Leh',
    protectedArea: 'Changthang Cold Desert Sanctuary',
    habitat: 'Wetland',
    locationAccuracy: 'Sensitive Species Protected',
    elevation: 4500,
    evidenceType: ['Photograph'],
    observationDate: '2026-05-28',
    count: 2,
    behavior: 'Breeding',
    shortDescription: 'Mating pair observed foraging in the high-altitude marsh margins of Tso Kar.'
  },
  {
    id: 'ws-004',
    observationType: 'Citizen Science Observation',
    verificationStatus: 'Community Reviewed',
    submissionDate: '2026-06-12',
    commonName: 'Kashmir Flycatcher',
    scientificName: 'Ficedula subrubra',
    taxonomicGroup: 'Birds',
    conservationStatus: 'VU',
    isThreatened: true,
    observerName: 'Aadil Bhat',
    observerType: 'Photographer',
    scope: 'Kashmir Core',
    region: 'Kashmir Core',
    administrativeUnit: 'Baramulla',
    protectedArea: 'Gulmarg Biosphere Reserve',
    habitat: 'Forest',
    locationAccuracy: 'Approximate',
    coordinates: { lat: 34.05, lng: 74.38 },
    elevation: 2600,
    evidenceType: ['Photograph', 'Audio'],
    observationDate: '2026-06-10',
    count: 1,
    behavior: 'Territorial Display',
    shortDescription: 'Male singing from an exposed perch in old-growth fir forest.'
  },
  {
    id: 'ws-005',
    observationType: 'Verified Observation',
    verificationStatus: 'Scientific Record',
    submissionDate: '2026-05-20',
    verificationDate: '2026-05-25',
    commonName: 'Western Tragopan',
    scientificName: 'Tragopan melanocephalus',
    taxonomicGroup: 'Birds',
    conservationStatus: 'VU',
    isThreatened: true,
    observerName: 'Dr. Zafar Ahmed',
    observerType: 'Researcher',
    affiliation: 'WII',
    scope: 'Transboundary / Extended',
    region: 'AJK',
    administrativeUnit: 'Neelum',
    habitat: 'Forest',
    locationAccuracy: 'Sensitive Species Protected',
    elevation: 2800,
    evidenceType: ['Direct Observation', 'Audio'],
    observationDate: '2026-05-18',
    count: 2,
    behavior: 'Roosting',
    shortDescription: 'Pair located via dawn calls in dense temperate broadleaf-conifer mix.'
  },
  {
    id: 'ws-006',
    observationType: 'Community Report',
    verificationStatus: 'Unverified',
    submissionDate: '2026-06-14',
    commonName: 'Himalayan Brown Bear',
    scientificName: 'Ursus arctos isabellinus',
    taxonomicGroup: 'Mammals',
    conservationStatus: 'CR',
    isThreatened: true,
    observerName: 'Local Gujjar Herder',
    observerType: 'Community Member',
    scope: 'Kashmir Core',
    region: 'Kashmir Core',
    administrativeUnit: 'Ganderbal',
    habitat: 'Alpine',
    locationAccuracy: 'Generalized',
    coordinates: { lat: 34.25, lng: 74.95 },
    elevation: 3200,
    evidenceType: ['Tracks', 'Scat'],
    observationDate: '2026-06-12',
    count: 1,
    behavior: 'Foraging',
    shortDescription: 'Fresh tracks and scat found near a high-altitude summer pasture.'
  },
  {
    id: 'ws-007',
    observationType: 'Camera Trap Observation',
    verificationStatus: 'Expert Verified',
    submissionDate: '2026-03-15',
    verificationDate: '2026-03-20',
    commonName: 'Markhor',
    scientificName: 'Capra falconeri',
    taxonomicGroup: 'Mammals',
    conservationStatus: 'NT',
    isThreatened: true,
    observerName: 'Wildlife Trust of India',
    observerType: 'NGO',
    scope: 'Kashmir Core',
    region: 'Kashmir Core',
    administrativeUnit: 'Baramulla',
    protectedArea: 'Kazinag National Park',
    habitat: 'Alpine',
    locationAccuracy: 'Sensitive Species Protected',
    elevation: 3500,
    evidenceType: ['Camera Trap'],
    observationDate: '2026-03-10',
    count: 4,
    behavior: 'Feeding',
    shortDescription: 'Small herd traversing steep rocky slopes caught on remote sensor.'
  },
  {
    id: 'ws-008',
    observationType: 'Verified Observation',
    verificationStatus: 'Expert Verified',
    submissionDate: '2026-01-20',
    verificationDate: '2026-01-22',
    commonName: 'Bar-headed Goose',
    scientificName: 'Anser indicus',
    taxonomicGroup: 'Birds',
    conservationStatus: 'LC',
    isThreatened: false,
    observerName: 'Jammu Birding Club',
    observerType: 'Citizen Scientist',
    scope: 'Trans-Divisional',
    region: 'Jammu',
    administrativeUnit: 'Jammu',
    protectedArea: 'Gharana Wetland',
    habitat: 'Wetland',
    locationAccuracy: 'Exact',
    coordinates: { lat: 32.54, lng: 74.70 },
    elevation: 280,
    evidenceType: ['Photograph', 'Video'],
    observationDate: '2026-01-18',
    count: 1500,
    behavior: 'Resting',
    shortDescription: 'Massive wintering flock staging in the shallow marshes of Gharana.'
  },
  {
    id: 'ws-009',
    observationType: 'Scientific Survey Record',
    verificationStatus: 'Scientific Record',
    submissionDate: '2026-05-05',
    verificationDate: '2026-05-10',
    commonName: 'Golden Mahseer',
    scientificName: 'Tor putitora',
    taxonomicGroup: 'Fish',
    conservationStatus: 'EN',
    isThreatened: true,
    observerName: 'Fisheries Dept',
    observerType: 'Government Staff',
    scope: 'Transboundary / Extended',
    region: 'AJK',
    administrativeUnit: 'Mirpur',
    protectedArea: 'Poonch River Mahseer National Park',
    habitat: 'Riverine',
    locationAccuracy: 'Approximate',
    elevation: 400,
    evidenceType: ['Photograph', 'Direct Observation'],
    observationDate: '2026-05-01',
    count: 12,
    behavior: 'Migrating',
    shortDescription: 'Adults observed moving upstream during pre-monsoon survey.'
  },
  {
    id: 'ws-010',
    observationType: 'Citizen Science Observation',
    verificationStatus: 'Community Reviewed',
    submissionDate: '2026-06-08',
    commonName: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    taxonomicGroup: 'Birds',
    conservationStatus: 'LC',
    isThreatened: false,
    observerName: 'Sara Khan',
    observerType: 'Photographer',
    scope: 'Trans-Divisional',
    region: 'Jammu',
    administrativeUnit: 'Kishtwar',
    protectedArea: 'Kishtwar High Altitude National Park',
    habitat: 'Forest',
    locationAccuracy: 'Exact',
    coordinates: { lat: 33.55, lng: 76.10 },
    elevation: 3100,
    evidenceType: ['Photograph'],
    observationDate: '2026-06-05',
    count: 1,
    behavior: 'Foraging',
    shortDescription: 'Male foraging on the forest floor at the edge of the tree line.'
  }
];

export const wildlifeSightingsMetrics = [
  { label: 'Total Sightings', value: wildlifeSightingsData.length, icon: 'Eye' },
  { label: 'Expert Verified', value: wildlifeSightingsData.filter(d => ['Expert Verified', 'Scientific Record', 'Government Confirmed'].includes(d.verificationStatus)).length, icon: 'ShieldCheck' },
  { label: 'Citizen Science', value: wildlifeSightingsData.filter(d => d.observationType === 'Citizen Science Observation').length, icon: 'Users' },
  { label: 'Threatened Records', value: wildlifeSightingsData.filter(d => d.isThreatened).length, icon: 'AlertTriangle' },
];
