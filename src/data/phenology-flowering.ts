import { Scope } from './geography';

export type PlantGroup = 'Trees' | 'Shrubs' | 'Herbs' | 'Grasses' | 'Sedges' | 'Ferns' | 'Aquatic Plants' | 'Medicinal Flora' | 'Threatened Flora';
export type PhenologyStage = 'First Bloom' | 'Full Bloom' | 'Peak Bloom' | 'Fruiting' | 'Leaf-Out' | 'Senescence' | 'Dormancy';
export type ClimateSignal = 'Early Warming' | 'Late Frost' | 'Snowmelt Shift' | 'Drought' | 'Heat Stress' | 'Rainfall Shift';
export type Month = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export interface PhenologyValidation {
  sourceName: string;
  sourceUrl?: string;
  sourceType: 'Peer-Reviewed Study' | 'Flora Survey' | 'Government Botanical Survey' | 'GBIF Specimen' | 'Research-grade iNaturalist' | 'University Thesis' | 'Institutional Report';
  sourceYear: number;
  observationDate: string;
  confidence: 'High' | 'Medium' | 'Low';
  lastReviewedDate: string;
}

export interface PhenologyRecord {
  id: string;
  speciesId: string;
  commonName: string;
  scientificName: string;
  family: string;
  plantGroup: PlantGroup[];
  nativeStatus: 'Native' | 'Introduced' | 'Unknown';
  conservationStatus: 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'Not Evaluated';

  isMedicinal: boolean;
  isThreatened: boolean;

  // Geography & Habitat
  primaryScope: Scope;
  regionsPresent: ('Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan')[];
  elevationMin: number;
  elevationMax: number;
  districtsCount: number;
  mainHabitats: ('Forest' | 'Wetland' | 'Alpine' | 'Meadow' | 'Grassland' | 'Orchard' | 'Agricultural' | 'Urban' | 'Riverine' | 'Cold Desert')[];

  // Phenology Windows
  currentStage: PhenologyStage;
  earliestFloweringMonth: Month;
  peakFloweringMonths: Month[];
  latestFloweringMonth: Month;
  fruitingMonths: Month[];
  dormancyMonths: Month[];

  // Climate Intelligence
  climateSignals: ClimateSignal[];
  climateShiftNotes: string;
  phenologyShiftIndicator: 'Advancing' | 'Stable' | 'Delayed' | 'Unknown';

  // Ecological Linkages
  pollinatorLinkages: string[];
  
  // Display & Content
  shortDescription: string;
  currentStatus: string;
  
  // Validation
  validation: PhenologyValidation;
}

export const phenologyData: PhenologyRecord[] = [
  {
    id: 'pheno-001',
    speciesId: 'flora-001',
    commonName: 'Kashmir Iris',
    scientificName: 'Iris kashmiriana',
    family: 'Iridaceae',
    plantGroup: ['Herbs', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core'],
    elevationMin: 1600,
    elevationMax: 2600,
    districtsCount: 6,
    mainHabitats: ['Meadow', 'Urban', 'Orchard'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['June'],
    dormancyMonths: ['November', 'December', 'January', 'February'],
    
    climateSignals: ['Early Warming', 'Late Frost'],
    climateShiftNotes: 'Spring warming has advanced the first bloom by 7-10 days in the central Kashmir valley over the last two decades. Vulnerable to late spring frosts which can damage early emerging buds.',
    phenologyShiftIndicator: 'Advancing',
    
    pollinatorLinkages: ['Bumble Bees', 'Hoverflies'],
    
    shortDescription: 'A spring-flowering Himalayan iris useful for tracking seasonal bloom timing in valley and foothill habitats.',
    currentStatus: 'Spring bloom window active in lower elevation zones.',
    
    validation: {
      sourceName: 'SKUAST Phenological Shift Study',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2024,
      observationDate: '2024-04-10',
      confidence: 'High',
      lastReviewedDate: '2026-05-15'
    }
  },
  {
    id: 'pheno-002',
    speciesId: 'flora-002',
    commonName: 'Himalayan Blue Poppy',
    scientificName: 'Meconopsis aculeata',
    family: 'Papaveraceae',
    plantGroup: ['Herbs', 'Threatened Flora', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'VU',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'Ladakh'],
    elevationMin: 3000,
    elevationMax: 4500,
    districtsCount: 8,
    mainHabitats: ['Alpine', 'Meadow'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'June',
    peakFloweringMonths: ['July', 'August'],
    latestFloweringMonth: 'August',
    fruitingMonths: ['September'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    
    climateSignals: ['Snowmelt Shift', 'Drought'],
    climateShiftNotes: 'Highly dependent on timing and volume of snowmelt. Early rapid melt followed by summer drought induces physiological stress and premature senescence.',
    phenologyShiftIndicator: 'Advancing',
    
    pollinatorLinkages: ['Alpine Bumble Bees', 'Solitary Bees'],
    
    shortDescription: 'An iconic alpine wildflower whose brief bloom window is strictly coupled to high-altitude snowpack melt dynamics.',
    currentStatus: 'Currently dormant beneath alpine snowpack.',
    
    validation: {
      sourceName: 'Flora of Jammu and Kashmir (Botanical Survey)',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2025,
      observationDate: '2025-07-15',
      confidence: 'High',
      lastReviewedDate: '2026-06-01'
    }
  },
  {
    id: 'pheno-003',
    speciesId: 'flora-003',
    commonName: 'Apple (Cultivar)',
    scientificName: 'Malus domestica',
    family: 'Rosaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Introduced',
    conservationStatus: 'Not Evaluated',
    isMedicinal: false,
    isThreatened: false,
    
    primaryScope: 'All',
    regionsPresent: ['Kashmir Core', 'Jammu'],
    elevationMin: 1500,
    elevationMax: 2400,
    districtsCount: 12,
    mainHabitats: ['Orchard', 'Agricultural'],
    
    currentStage: 'Peak Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['August', 'September', 'October'],
    dormancyMonths: ['December', 'January', 'February'],
    
    climateSignals: ['Late Frost', 'Early Warming', 'Rainfall Shift'],
    climateShiftNotes: 'Early spring warming triggers premature budburst, exposing blossoms to catastrophic late spring frosts. Continuous monitoring is critical for agrarian economy.',
    phenologyShiftIndicator: 'Advancing',
    
    pollinatorLinkages: ['Honey Bees', 'Mason Bees', 'Hoverflies'],
    
    shortDescription: 'The primary agricultural cash crop of Kashmir; highly sensitive to spring temperature anomalies during bloom.',
    currentStatus: 'Peak bloom currently active across major orchard districts.',
    
    validation: {
      sourceName: 'ICAR Apple Phenology Report',
      sourceType: 'Institutional Report',
      sourceYear: 2026,
      observationDate: '2026-04-20',
      confidence: 'High',
      lastReviewedDate: '2026-05-10'
    }
  },
  {
    id: 'pheno-004',
    speciesId: 'flora-004',
    commonName: 'Kutki',
    scientificName: 'Picrorhiza kurroa',
    family: 'Plantaginaceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'EN',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu'],
    elevationMin: 3000,
    elevationMax: 4300,
    districtsCount: 5,
    mainHabitats: ['Alpine', 'Meadow'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'June',
    peakFloweringMonths: ['July'],
    latestFloweringMonth: 'August',
    fruitingMonths: ['August', 'September'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    
    climateSignals: ['Snowmelt Shift'],
    climateShiftNotes: 'Emergence strictly tracks the receding snowline. Earlier snowmelt causes a temporal shift in root accumulation cycles.',
    phenologyShiftIndicator: 'Unknown',
    
    pollinatorLinkages: ['Specialist Alpine Bees'],
    
    shortDescription: 'Endangered medicinal alpine herb whose brief phenological cycle makes it highly vulnerable to early harvesting.',
    currentStatus: 'Dormant beneath subalpine snow cover.',
    
    validation: {
      sourceName: 'WII Threatened Flora Phenology tracking',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2023,
      observationDate: '2023-07-05',
      confidence: 'High',
      lastReviewedDate: '2026-04-25'
    }
  },
  {
    id: 'pheno-005',
    speciesId: 'flora-005',
    commonName: 'Common Walnut',
    scientificName: 'Juglans regia',
    family: 'Juglandaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: false,
    isThreatened: false,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 1200,
    elevationMax: 2800,
    districtsCount: 16,
    mainHabitats: ['Forest', 'Orchard', 'Agricultural'],
    
    currentStage: 'Leaf-Out',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['September', 'October'],
    dormancyMonths: ['December', 'January', 'February'],
    
    climateSignals: ['Late Frost'],
    climateShiftNotes: 'Emerging catkins and leaf buds are notoriously sensitive to late spring freezing events which destroy annual yields.',
    phenologyShiftIndicator: 'Advancing',
    
    pollinatorLinkages: ['Wind Pollinated'],
    
    shortDescription: 'Massive deciduous tree whose catkin emergence and leaf-out serve as a key spring phenological marker.',
    currentStatus: 'Leaf-out and catkin emergence in progress.',
    
    validation: {
      sourceName: 'GBIF Observation Dataset',
      sourceType: 'GBIF Specimen',
      sourceYear: 2025,
      observationDate: '2025-04-28',
      confidence: 'Medium',
      lastReviewedDate: '2026-05-02'
    }
  }
];

export const phenologyDashboardMetrics = [
  { label: 'Validated Records', value: phenologyData.length, icon: 'Leaf' },
  { label: 'Advancing Phenology', value: phenologyData.filter(p => p.phenologyShiftIndicator === 'Advancing').length, icon: 'TrendingUp' },
  { label: 'Frost Vulnerable', value: phenologyData.filter(p => p.climateSignals.includes('Late Frost')).length, icon: 'AlertTriangle' },
  { label: 'Active Peak Bloom', value: phenologyData.filter(p => p.currentStage === 'Peak Bloom').length, icon: 'Sun' }
];
