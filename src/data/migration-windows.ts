import { Scope } from './geography';

export type MigrationStatus = 'Resident' | 'Winter Visitor' | 'Summer Visitor' | 'Passage Migrant' | 'Altitudinal Migrant' | 'Breeding Migrant' | 'Local Seasonal Mover' | 'Vagrant' | 'Irruptive Visitor';
export type SeasonalStatus = 'Currently Arriving' | 'Currently Breeding' | 'Currently Wintering' | 'Currently Passing Through' | 'Currently Resident' | 'Currently Uncommon' | 'Currently Absent / Out of Season' | 'Status Unknown';
export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export interface MigrationThreat {
  threatType: 'Wetland Loss' | 'Water Level Change' | 'Hunting / Poaching' | 'Disturbance' | 'Tourism Pressure' | 'Climate Change' | 'Snow Cover Change' | 'Drought' | 'Flood Events' | 'Agricultural Change' | 'Pollution' | 'Power Lines / Collision Risk';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  narrative: string;
}

export interface ValidationSource {
  sourceName: string;
  sourceUrl?: string;
  sourceType: 'eBird' | 'Peer-Reviewed Study' | 'Government Survey' | 'Asian Waterbird Census' | 'Ramsar / KBA / IBA' | 'GBIF' | 'Avibase' | 'Verified Naturalist';
  sourceYear: number;
  confidence: 'High' | 'Medium' | 'Low';
  lastReviewedDate: string;
}

export interface MigrationWindow {
  id: string;
  speciesId: string;
  commonName: string;
  scientificName: string;
  taxonomicGroup: 'Waterfowl' | 'Waders' | 'Raptors' | 'Passerines' | 'Cranes' | 'Pheasants' | 'Others';
  conservationStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC';
  isThreatened: boolean;

  // Status
  primaryMigrationStatus: MigrationStatus;
  secondaryMigrationStatus?: MigrationStatus[];
  
  // Timing Windows
  springArrivalWindow?: string;
  summerPresenceWindow?: string;
  breedingWindow?: string;
  autumnPassageWindow?: string;
  winteringWindow?: string;
  departureWindow?: string;
  
  peakObservationMonths: Month[];
  lowObservationMonths: Month[];
  currentSeasonalStatus: SeasonalStatus;

  // Geographic Intelligence
  primaryScope: Scope;
  regionsPresent: ('Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan')[];
  districtsCount: number;
  districtTimingNotes: string;

  // Habitats
  mainHabitats: ('Wetland' | 'Lake' | 'Riverine' | 'Forest' | 'Alpine' | 'Grassland' | 'Agricultural' | 'Urban' | 'Cold Desert')[];
  
  // Intelligence
  shortDescription: string;
  hotspotsLinked: string[]; // IDs
  
  threats: MigrationThreat[];
  validation: ValidationSource;
}

export const migrationData: MigrationWindow[] = [
  {
    id: 'mw-001',
    speciesId: 'sp-001',
    commonName: 'Black-necked Crane',
    scientificName: 'Grus nigricollis',
    taxonomicGroup: 'Cranes',
    conservationStatus: 'VU',
    isThreatened: true,
    primaryMigrationStatus: 'Breeding Migrant',
    springArrivalWindow: 'April–May',
    breedingWindow: 'May–August',
    departureWindow: 'September–October',
    peakObservationMonths: ['June', 'July', 'August'],
    lowObservationMonths: ['December', 'January', 'February'],
    currentSeasonalStatus: 'Currently Breeding', // Simulated summer state
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Ladakh'],
    districtsCount: 2, // Leh, Kargil
    districtTimingNotes: 'Arrives in Changthang high-altitude lakes (Tso Kar, Pangong) as ice thaws. Strictly a summer breeder in the active KEW geography.',
    mainHabitats: ['Wetland', 'Lake', 'Cold Desert'],
    shortDescription: 'A high-altitude breeding crane linked to Ladakh wetlands and highly vulnerable to disturbance.',
    hotspotsLinked: ['hotspot-tsokar', 'hotspot-pangong'],
    threats: [
      { threatType: 'Disturbance', severity: 'High', narrative: 'Feral dogs heavily predate on eggs and chicks near pastoralist camps.' },
      { threatType: 'Tourism Pressure', severity: 'Medium', narrative: 'Off-road vehicles near wetland breeding sites.' }
    ],
    validation: {
      sourceName: 'WII Crane Survey',
      sourceType: 'Government Survey',
      sourceYear: 2025,
      confidence: 'High',
      lastReviewedDate: '2026-06-01'
    }
  },
  {
    id: 'mw-002',
    speciesId: 'sp-002',
    commonName: 'Northern Pintail',
    scientificName: 'Anas acuta',
    taxonomicGroup: 'Waterfowl',
    conservationStatus: 'LC',
    isThreatened: false,
    primaryMigrationStatus: 'Winter Visitor',
    springArrivalWindow: 'Late October–November',
    winteringWindow: 'November–March',
    departureWindow: 'March–Early April',
    peakObservationMonths: ['December', 'January', 'February'],
    lowObservationMonths: ['June', 'July', 'August'],
    currentSeasonalStatus: 'Currently Absent / Out of Season',
    primaryScope: 'All',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    districtsCount: 15,
    districtTimingNotes: 'Peaks in Hokersar and Wular between Dec-Feb. Leaves earlier from Jammu plains than from Kashmir Valley.',
    mainHabitats: ['Wetland', 'Lake'],
    shortDescription: 'A widespread wintering duck flocking in thousands across Jhelum valley wetlands.',
    hotspotsLinked: ['hotspot-hokersar', 'hotspot-gharana'],
    threats: [
      { threatType: 'Wetland Loss', severity: 'Critical', narrative: 'Siltation and encroachment of wintering sinks in the Kashmir Valley.' },
      { threatType: 'Hunting / Poaching', severity: 'Medium', narrative: 'Illegal shooting outside protected wetland borders.' }
    ],
    validation: {
      sourceName: 'Asian Waterbird Census Kashmir',
      sourceType: 'Asian Waterbird Census',
      sourceYear: 2026,
      confidence: 'High',
      lastReviewedDate: '2026-06-10'
    }
  },
  {
    id: 'mw-003',
    speciesId: 'sp-003',
    commonName: 'Kashmir Flycatcher',
    scientificName: 'Ficedula subrubra',
    taxonomicGroup: 'Passerines',
    conservationStatus: 'VU',
    isThreatened: true,
    primaryMigrationStatus: 'Summer Visitor',
    secondaryMigrationStatus: ['Breeding Migrant'],
    springArrivalWindow: 'Mid April–May',
    breedingWindow: 'May–July',
    departureWindow: 'September',
    peakObservationMonths: ['May', 'June', 'July'],
    lowObservationMonths: ['November', 'December', 'January', 'February'],
    currentSeasonalStatus: 'Currently Breeding',
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core'],
    districtsCount: 6,
    districtTimingNotes: 'Restricted summer breeder in mixed deciduous-coniferous forests of Pir Panjal and Shamshabari ranges.',
    mainHabitats: ['Forest'],
    shortDescription: 'An endemic breeder arriving in spring to nest in old-growth temperate forests.',
    hotspotsLinked: ['hotspot-gulmarg', 'hotspot-overa-aru'],
    threats: [
      { threatType: 'Climate Change', severity: 'High', narrative: 'Warming alters the phenology of insect emergence during chick-rearing.' }
    ],
    validation: {
      sourceName: 'eBird Kashmir Region Data',
      sourceType: 'eBird',
      sourceYear: 2026,
      confidence: 'High',
      lastReviewedDate: '2026-06-12'
    }
  },
  {
    id: 'mw-004',
    speciesId: 'sp-004',
    commonName: 'Bar-headed Goose',
    scientificName: 'Anser indicus',
    taxonomicGroup: 'Waterfowl',
    conservationStatus: 'LC',
    isThreatened: false,
    primaryMigrationStatus: 'Winter Visitor',
    secondaryMigrationStatus: ['Breeding Migrant'],
    springArrivalWindow: 'October (Jammu)',
    winteringWindow: 'November–March (Jammu)',
    breedingWindow: 'May–July (Ladakh)',
    autumnPassageWindow: 'September–October',
    departureWindow: 'April',
    peakObservationMonths: ['January', 'February', 'June', 'July'],
    lowObservationMonths: ['August', 'September'],
    currentSeasonalStatus: 'Currently Breeding', // Breeding in Ladakh, absent in Jammu
    primaryScope: 'All',
    regionsPresent: ['Jammu', 'Ladakh'],
    districtsCount: 5,
    districtTimingNotes: 'Complex timing: Winter visitor to Jammu plains (Gharana) but summer breeder in high-altitude Ladakh (Tso Moriri).',
    mainHabitats: ['Wetland', 'Lake', 'Cold Desert'],
    shortDescription: 'Famous trans-Himalayan migrant; winters in Jammu plains and breeds in Ladakh cold deserts.',
    hotspotsLinked: ['hotspot-gharana', 'hotspot-tsomoriri'],
    threats: [
      { threatType: 'Disturbance', severity: 'Medium', narrative: 'Border fencing and agricultural disturbance at wintering grounds.' },
      { threatType: 'Wetland Loss', severity: 'High', narrative: 'Draining of shallow marshes in Jammu division.' }
    ],
    validation: {
      sourceName: 'Peer-Reviewed Migration Tracking Study',
      sourceType: 'Peer-Reviewed Study',
      sourceUrl: 'https://example.org/bar-headed-tracking',
      sourceYear: 2024,
      confidence: 'High',
      lastReviewedDate: '2026-05-15'
    }
  },
  {
    id: 'mw-005',
    speciesId: 'sp-005',
    commonName: 'Western Tragopan',
    scientificName: 'Tragopan melanocephalus',
    taxonomicGroup: 'Pheasants',
    conservationStatus: 'VU',
    isThreatened: true,
    primaryMigrationStatus: 'Altitudinal Migrant',
    secondaryMigrationStatus: ['Resident'],
    springArrivalWindow: 'Moves upslope April',
    breedingWindow: 'May–June (Upslope)',
    autumnPassageWindow: 'Moves downslope October',
    winteringWindow: 'November–March (Downslope)',
    peakObservationMonths: ['May', 'October'], // Vocal periods
    lowObservationMonths: ['January', 'August'],
    currentSeasonalStatus: 'Currently Resident',
    primaryScope: 'Transboundary / Extended',
    regionsPresent: ['Kashmir Core', 'AJK'],
    districtsCount: 8,
    districtTimingNotes: 'Strictly resident but performs distinct altitudinal shifts depending on the snowline across Pir Panjal and Neelum valley.',
    mainHabitats: ['Forest', 'Alpine'],
    shortDescription: 'Shy, vulnerable pheasant migrating vertically between thick undergrowth and subalpine zones based on snow cover.',
    hotspotsLinked: ['hotspot-kazinag'],
    threats: [
      { threatType: 'Hunting / Poaching', severity: 'High', narrative: 'Winter trapping when birds descend to lower, more accessible elevations.' },
      { threatType: 'Snow Cover Change', severity: 'Medium', narrative: 'Erratic winter snow depth disrupts traditional altitudinal movement patterns.' }
    ],
    validation: {
      sourceName: 'WII Pheasant Survey J&K',
      sourceType: 'Government Survey',
      sourceYear: 2023,
      confidence: 'High',
      lastReviewedDate: '2026-04-10'
    }
  },
  {
    id: 'mw-006',
    speciesId: 'sp-006',
    commonName: 'Eurasian Woodcock',
    scientificName: 'Scolopax rusticola',
    taxonomicGroup: 'Waders',
    conservationStatus: 'LC',
    isThreatened: false,
    primaryMigrationStatus: 'Winter Visitor',
    secondaryMigrationStatus: ['Passage Migrant'],
    springArrivalWindow: 'Late October',
    winteringWindow: 'November-February',
    departureWindow: 'March',
    peakObservationMonths: ['December', 'January'],
    lowObservationMonths: ['June', 'July', 'August'],
    currentSeasonalStatus: 'Currently Absent / Out of Season',
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    districtsCount: 12,
    districtTimingNotes: 'Secretive winter visitor arriving in late autumn. Often detected along damp forest edges and valley floor orchards.',
    mainHabitats: ['Forest', 'Agricultural', 'Wetland'],
    shortDescription: 'A highly cryptic wader that winters in damp valley floors and orchard floors across Kashmir.',
    hotspotsLinked: [],
    threats: [
      { threatType: 'Hunting / Poaching', severity: 'High', narrative: 'Targeted by recreational hunters during winter.' }
    ],
    validation: {
      sourceName: 'eBird Kashmir Region',
      sourceType: 'eBird',
      sourceYear: 2026,
      confidence: 'High',
      lastReviewedDate: '2026-06-01'
    }
  },
  {
    id: 'mw-007',
    speciesId: 'sp-007',
    commonName: 'Rosy Starling',
    scientificName: 'Pastor roseus',
    taxonomicGroup: 'Passerines',
    conservationStatus: 'LC',
    isThreatened: false,
    primaryMigrationStatus: 'Passage Migrant',
    secondaryMigrationStatus: ['Summer Visitor'],
    springArrivalWindow: 'May',
    autumnPassageWindow: 'August-September',
    peakObservationMonths: ['May', 'August', 'September'],
    lowObservationMonths: ['December', 'January', 'February'],
    currentSeasonalStatus: 'Currently Passing Through',
    primaryScope: 'All',
    regionsPresent: ['Kashmir Core', 'Jammu', 'Ladakh', 'Gilgit-Baltistan'],
    districtsCount: 30,
    districtTimingNotes: 'Passes in massive nomadic flocks. Present in Kashmir valley during spring passage, with massive roosts forming in autumn.',
    mainHabitats: ['Agricultural', 'Grassland', 'Urban'],
    shortDescription: 'Highly gregarious passage migrant forming massive, noisy flocks in agricultural landscapes.',
    hotspotsLinked: [],
    threats: [
      { threatType: 'Agricultural Change', severity: 'Medium', narrative: 'Pesticide use reducing locust and insect food sources during passage.' }
    ],
    validation: {
      sourceName: 'GBIF Occurrence Records',
      sourceType: 'GBIF',
      sourceYear: 2025,
      confidence: 'High',
      lastReviewedDate: '2026-05-20'
    }
  }
];

export const migrationDashboardMetrics = [
  { label: 'Total Tracked', value: 592, icon: 'Bird' },
  { label: 'Winter Visitors', value: 214, icon: 'Snowflake' },
  { label: 'Summer Breeders', value: 186, icon: 'Sun' },
  { label: 'Threatened Migrants', value: 34, icon: 'AlertTriangle' }
];
