import { Scope } from './geography';

export type PollinatorType = 'Honey Bee' | 'Bumble Bee' | 'Solitary Bee' | 'Butterfly' | 'Moth' | 'Hoverfly' | 'Beetle' | 'Wasp' | 'Bird' | 'Other';
export type ActivityStatus = 'Resident' | 'Seasonal' | 'Migratory' | 'Altitudinal Migrant' | 'Specialist' | 'Generalist';
export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export interface PollinatorThreat {
  threatType: 'Pesticides' | 'Habitat Loss' | 'Climate Change' | 'Flowering Mismatch' | 'Drought' | 'Urbanization' | 'Monoculture Agriculture' | 'Invasive Species' | 'Pollution' | 'Disease';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  narrative: string;
}

export interface PollinatorValidation {
  sourceName: string;
  sourceUrl?: string;
  sourceType: 'Peer-Reviewed Study' | 'GBIF' | 'Research-grade iNaturalist' | 'Government biodiversity study' | 'University Survey' | 'Institutional Report' | 'Blog' | 'Other';
  sourceYear: number;
  confidence: 'High' | 'Medium' | 'Low';
  lastReviewedDate: string;
}

export interface Pollinator {
  id: string;
  commonName: string;
  scientificName: string;
  taxonomicGroup: PollinatorType;
  family: string;
  nativeStatus: 'Native' | 'Introduced' | 'Unknown';
  conservationStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'Not Evaluated';

  activityStatus: ActivityStatus[];
  
  // Phenology
  firstActivityMonth: Month;
  peakActivityMonth: Month;
  lastActivityMonth: Month;
  floweringWindow: string;
  pollinationWindow: string;
  dormancyWindow: string;

  // Flowering Intelligence
  flowerSpeciesCount: number;
  plantAssociations: string[];
  medicinalPlantAssociations: string[];
  cropAssociations: string[];
  orchardAssociations: string[];
  
  // Geography & Habitat
  primaryScope: Scope;
  regionsPresent: ('Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan')[];
  elevationMin: number;
  elevationMax: number;
  mainHabitats: ('Forest' | 'Wetland' | 'Alpine' | 'Meadow' | 'Grassland' | 'Orchard' | 'Agricultural' | 'Urban' | 'Riverine' | 'Cold Desert')[];
  
  // Profile
  shortDescription: string;
  currentStatus: string;
  
  // Threats & Validation
  threats: PollinatorThreat[];
  validation: PollinatorValidation;
}

export const pollinatorData: Pollinator[] = [
  {
    id: 'pol-001',
    commonName: 'Himalayan Bumble Bee',
    scientificName: 'Bombus rufofasciatus',
    taxonomicGroup: 'Bumble Bee',
    family: 'Apidae',
    nativeStatus: 'Native',
    conservationStatus: 'Not Evaluated',
    activityStatus: ['Seasonal', 'Altitudinal Migrant', 'Generalist'],
    
    firstActivityMonth: 'May',
    peakActivityMonth: 'July',
    lastActivityMonth: 'September',
    floweringWindow: 'May–September',
    pollinationWindow: 'June–August',
    dormancyWindow: 'October–April',
    
    flowerSpeciesCount: 24,
    plantAssociations: ['Saussurea', 'Rhododendron', 'Primula', 'Aconitum'],
    medicinalPlantAssociations: ['Aconitum heterophyllum', 'Picrorhiza kurroa'],
    cropAssociations: ['Buckwheat'],
    orchardAssociations: [],
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Ladakh', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 2200,
    elevationMax: 4200,
    mainHabitats: ['Alpine', 'Meadow', 'Forest'],
    
    shortDescription: 'A major alpine pollinator supporting wildflowers, medicinal plants, and high-elevation ecosystem productivity.',
    currentStatus: 'Dormant; awaiting snowmelt to initiate foraging.',
    
    threats: [
      { threatType: 'Climate Change', severity: 'High', narrative: 'Warming is pushing flowering periods earlier, causing a mismatch with queen emergence.' },
      { threatType: 'Flowering Mismatch', severity: 'Medium', narrative: 'Early snowmelt induces blooming before workers are active.' },
      { threatType: 'Habitat Loss', severity: 'Medium', narrative: 'Overgrazing of alpine meadows reduces nectar availability.' }
    ],
    validation: {
      sourceName: 'Peer-Reviewed Study on Himalayan Bombus',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2025,
      confidence: 'High',
      lastReviewedDate: '2026-06-05'
    }
  },
  {
    id: 'pol-002',
    commonName: 'Eastern Honey Bee',
    scientificName: 'Apis cerana',
    taxonomicGroup: 'Honey Bee',
    family: 'Apidae',
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    activityStatus: ['Resident', 'Generalist'],
    
    firstActivityMonth: 'March',
    peakActivityMonth: 'May',
    lastActivityMonth: 'November',
    floweringWindow: 'March–October',
    pollinationWindow: 'April–September',
    dormancyWindow: 'December–February',
    
    flowerSpeciesCount: 150,
    plantAssociations: ['Brassica', 'Trifolium', 'Robinia'],
    medicinalPlantAssociations: ['Crocus sativus'],
    cropAssociations: ['Mustard', 'Saffron'],
    orchardAssociations: ['Apple', 'Almond', 'Cherry', 'Apricot'],
    
    primaryScope: 'All',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 500,
    elevationMax: 2800,
    mainHabitats: ['Orchard', 'Agricultural', 'Forest', 'Urban'],
    
    shortDescription: 'The indigenous cavity-nesting honey bee, vital for early spring orchard pollination.',
    currentStatus: 'Highly active in valley orchards and agricultural zones.',
    
    threats: [
      { threatType: 'Pesticides', severity: 'Critical', narrative: 'Extensive use of neurotoxic insecticides in apple orchards causing mass mortality.' },
      { threatType: 'Disease', severity: 'High', narrative: 'Sacbrood virus wiping out native feral colonies.' }
    ],
    validation: {
      sourceName: 'SKUAST Orchard Pollinator Survey',
      sourceType: 'University Survey',
      sourceYear: 2026,
      confidence: 'High',
      lastReviewedDate: '2026-06-14'
    }
  },
  {
    id: 'pol-003',
    commonName: 'Apollo Butterfly',
    scientificName: 'Parnassius hardwickii',
    taxonomicGroup: 'Butterfly',
    family: 'Papilionidae',
    nativeStatus: 'Native',
    conservationStatus: 'VU',
    activityStatus: ['Seasonal', 'Specialist'],
    
    firstActivityMonth: 'June',
    peakActivityMonth: 'July',
    lastActivityMonth: 'August',
    floweringWindow: 'June–August',
    pollinationWindow: 'July',
    dormancyWindow: 'September–May',
    
    flowerSpeciesCount: 8,
    plantAssociations: ['Saxifraga', 'Sedum'],
    medicinalPlantAssociations: [],
    cropAssociations: [],
    orchardAssociations: [],
    
    primaryScope: 'Transboundary / Extended',
    regionsPresent: ['Kashmir Core', 'Ladakh', 'Gilgit-Baltistan'],
    elevationMin: 3000,
    elevationMax: 5000,
    mainHabitats: ['Alpine', 'Cold Desert'],
    
    shortDescription: 'High-altitude cold-adapted butterfly strictly linked to alpine succulents.',
    currentStatus: 'Overwintering as larvae under snowpack.',
    
    threats: [
      { threatType: 'Climate Change', severity: 'Critical', narrative: 'Upward shift of treeline is shrinking available alpine meadow habitat.' },
      { threatType: 'Habitat Loss', severity: 'Medium', narrative: 'Trekking routes disturbing primary feeding grounds.' }
    ],
    validation: {
      sourceName: 'ZSI Himalayan Lepidoptera Report',
      sourceType: 'Government biodiversity study',
      sourceYear: 2023,
      confidence: 'High',
      lastReviewedDate: '2026-05-10'
    }
  },
  {
    id: 'pol-004',
    commonName: 'Marmalade Hoverfly',
    scientificName: 'Episyrphus balteatus',
    taxonomicGroup: 'Hoverfly',
    family: 'Syrphidae',
    nativeStatus: 'Native',
    conservationStatus: 'Not Evaluated',
    activityStatus: ['Migratory', 'Generalist'],
    
    firstActivityMonth: 'April',
    peakActivityMonth: 'July',
    lastActivityMonth: 'October',
    floweringWindow: 'April–October',
    pollinationWindow: 'May–September',
    dormancyWindow: 'November–March',
    
    flowerSpeciesCount: 65,
    plantAssociations: ['Asteraceae', 'Apiaceae'],
    medicinalPlantAssociations: ['Taraxacum officinale'],
    cropAssociations: ['Coriander', 'Fennel'],
    orchardAssociations: ['Plum', 'Peach'],
    
    primaryScope: 'All',
    regionsPresent: ['Kashmir Core', 'Jammu', 'Ladakh'],
    elevationMin: 300,
    elevationMax: 3500,
    mainHabitats: ['Agricultural', 'Meadow', 'Orchard'],
    
    shortDescription: 'A highly mobile aphid-predatory hoverfly that doubles as a crucial open-flower pollinator.',
    currentStatus: 'Widespread and active across multiple agricultural corridors.',
    
    threats: [
      { threatType: 'Pesticides', severity: 'High', narrative: 'Broad-spectrum aphid sprays directly kill larvae and foraging adults.' }
    ],
    validation: {
      sourceName: 'GBIF Occurrence Records',
      sourceType: 'GBIF',
      sourceYear: 2025,
      confidence: 'High',
      lastReviewedDate: '2026-04-18'
    }
  },
  {
    id: 'pol-005',
    commonName: 'Orchard Mason Bee',
    scientificName: 'Osmia bicornis',
    taxonomicGroup: 'Solitary Bee',
    family: 'Megachilidae',
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    activityStatus: ['Seasonal', 'Specialist'],
    
    firstActivityMonth: 'March',
    peakActivityMonth: 'April',
    lastActivityMonth: 'May',
    floweringWindow: 'March–May',
    pollinationWindow: 'March–May',
    dormancyWindow: 'June–February',
    
    flowerSpeciesCount: 12,
    plantAssociations: ['Rosaceae trees'],
    medicinalPlantAssociations: [],
    cropAssociations: [],
    orchardAssociations: ['Apple', 'Almond', 'Cherry', 'Pear'],
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 1000,
    elevationMax: 2500,
    mainHabitats: ['Orchard', 'Forest', 'Urban'],
    
    shortDescription: 'Solitary, highly efficient early spring pollinator uniquely adapted for Rosaceae orchard blooms.',
    currentStatus: 'Emerging to pollinate early almond and cherry blooms.',
    
    threats: [
      { threatType: 'Habitat Loss', severity: 'High', narrative: 'Removal of deadwood, mud, and natural nesting cavities from clean orchard practices.' },
      { threatType: 'Pesticides', severity: 'Critical', narrative: 'Pre-bloom fungicide applications disrupting solitary bee reproduction.' }
    ],
    validation: {
      sourceName: 'Peer-Reviewed Study on Mason Bees J&K',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2024,
      confidence: 'High',
      lastReviewedDate: '2026-06-01'
    }
  },
  {
    id: 'pol-006',
    commonName: 'Himalayan Rubythroat',
    scientificName: 'Calliope pectoralis',
    taxonomicGroup: 'Bird',
    family: 'Muscicapidae',
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    activityStatus: ['Altitudinal Migrant', 'Specialist'],
    
    firstActivityMonth: 'May',
    peakActivityMonth: 'June',
    lastActivityMonth: 'September',
    floweringWindow: 'June-August',
    pollinationWindow: 'June-August',
    dormancyWindow: 'October-April (Wintering Downslope)',
    
    flowerSpeciesCount: 6,
    plantAssociations: ['Rhododendron anthopogon', 'Caragana'],
    medicinalPlantAssociations: [],
    cropAssociations: [],
    orchardAssociations: [],
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Ladakh'],
    elevationMin: 2800,
    elevationMax: 4500,
    mainHabitats: ['Alpine', 'Forest'],
    
    shortDescription: 'While primarily insectivorous, acts as a critical incidental pollinator for high-altitude scrub Rhododendrons.',
    currentStatus: 'Ascending to subalpine scrub zones.',
    
    threats: [
      { threatType: 'Habitat Loss', severity: 'Medium', narrative: 'Clearance of dwarf rhododendron scrub for alpine camping.' }
    ],
    validation: {
      sourceName: 'iNaturalist Observations',
      sourceType: 'Research-grade iNaturalist',
      sourceYear: 2026,
      confidence: 'Medium',
      lastReviewedDate: '2026-05-15'
    }
  }
];

export const pollinatorDashboardMetrics = [
  { label: 'Validated Pollinators', value: pollinatorData.length, icon: 'Bug' },
  { label: 'Active This Month', value: pollinatorData.filter(p => !p.currentStatus.toLowerCase().includes('dormant') && !p.currentStatus.toLowerCase().includes('overwintering')).length, icon: 'Activity' },
  { label: 'Threatened Species', value: pollinatorData.filter(p => ['VU','EN','CR'].includes(p.conservationStatus)).length, icon: 'AlertTriangle' },
  { label: 'Orchard Dependent', value: pollinatorData.filter(p => p.orchardAssociations.length > 0).length, icon: 'Apple' }
];
