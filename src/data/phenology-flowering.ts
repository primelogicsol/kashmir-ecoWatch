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
  kashmiriName?: string;
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
  shiftDays?: number;
  chillingRequirementHours?: number;
  frostVulnerabilityIndex?: 'Critical' | 'High' | 'Moderate' | 'Low';
  gddThreshold?: number;

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
    kashmiriName: 'Boi / Sosun',
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
    districtsCount: 8,
    mainHabitats: ['Meadow', 'Urban', 'Orchard'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['June'],
    dormancyMonths: ['November', 'December', 'January', 'February'],
    
    climateSignals: ['Early Warming', 'Late Frost'],
    climateShiftNotes: 'Spring warming has advanced the first bloom by 7-10 days in the central Kashmir valley over the last two decades. Vulnerable to late spring frosts which damage early emerging buds.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -9,
    chillingRequirementHours: 450,
    frostVulnerabilityIndex: 'High',
    gddThreshold: 180,
    
    pollinatorLinkages: ['Bumble Bees (Bombus)', 'Hoverflies'],
    shortDescription: 'A spring-flowering endemic iris whose violet blooms mark the transition to true spring in Kashmir valley foothills.',
    currentStatus: 'Spring bloom window active in lower elevation zones.',
    
    validation: {
      sourceName: 'SKUAST-K Phenological Shift Study',
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
    commonName: 'Common Almond',
    scientificName: 'Prunus dulcis',
    kashmiriName: 'Badam',
    family: 'Rosaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Introduced',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu'],
    elevationMin: 1500,
    elevationMax: 2200,
    districtsCount: 6,
    mainHabitats: ['Orchard', 'Agricultural', 'Urban'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'February',
    peakFloweringMonths: ['March'],
    latestFloweringMonth: 'April',
    fruitingMonths: ['July', 'August'],
    dormancyMonths: ['November', 'December', 'January'],
    
    climateSignals: ['Early Warming', 'Late Frost', 'Heat Stress'],
    climateShiftNotes: 'Earliest herald of Kashmiri spring (celebrated at Badamwari Srinagar). Mean first bloom has advanced by 12 days since 1980 due to February warming spikes. Late March snowstorms trigger catastrophic petal loss.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -12,
    chillingRequirementHours: 350,
    frostVulnerabilityIndex: 'Critical',
    gddThreshold: 140,
    
    pollinatorLinkages: ['Honeybees (Apis cerana)', 'Solitary Bees', 'Hoverflies'],
    shortDescription: 'The iconic earliest fruit bloom of Kashmir whose delicate pink flowers signal winter breaking.',
    currentStatus: 'Bud burst and initial petal expansion in south-facing orchards.',
    
    validation: {
      sourceName: 'ICAR-CITH Temperate Horticulture Bulletin',
      sourceType: 'Institutional Report',
      sourceYear: 2025,
      observationDate: '2025-03-05',
      confidence: 'High',
      lastReviewedDate: '2026-04-20'
    }
  },
  {
    id: 'pheno-003',
    speciesId: 'flora-003',
    commonName: 'Kashmir Saffron',
    scientificName: 'Crocus sativus',
    kashmiriName: 'Kong',
    family: 'Iridaceae',
    plantGroup: ['Herbs', 'Agricultural Plants'],
    nativeStatus: 'Introduced',
    conservationStatus: 'Not Evaluated',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu'],
    elevationMin: 1550,
    elevationMax: 1950,
    districtsCount: 4,
    mainHabitats: ['Agricultural'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'October',
    peakFloweringMonths: ['October', 'November'],
    latestFloweringMonth: 'November',
    fruitingMonths: [],
    dormancyMonths: ['May', 'June', 'July', 'August', 'September'],
    
    climateSignals: ['Drought', 'Heat Stress', 'Rainfall Shift'],
    climateShiftNotes: 'Autumn-blooming keystone crop of Pampore Karewas. Autumn flowering window delayed by 6 days due to September drought and elevated autumn temperatures. Stigma yield requires sharp diurnal temperature drops.',
    phenologyShiftIndicator: 'Delayed',
    shiftDays: 6,
    chillingRequirementHours: 200,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 300,
    
    pollinatorLinkages: ['Bees', 'Syrphid Flies', 'Vegetative Corm Sprouting'],
    shortDescription: 'World-renowned purple autumn crocus producing the highest-crocin saffron on Kashmir Karewa terraces.',
    currentStatus: 'Underground corm dormancy prior to late autumn spike emergence.',
    
    validation: {
      sourceName: 'SKUAST-K Saffron Research Station Pampore',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-10-25',
      confidence: 'High',
      lastReviewedDate: '2026-05-01'
    }
  },
  {
    id: 'pheno-004',
    speciesId: 'flora-004',
    commonName: 'Kashmir Apple',
    scientificName: 'Malus domestica',
    kashmiriName: 'Tsoonth',
    family: 'Rosaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Introduced',
    conservationStatus: 'LC',
    isMedicinal: false,
    isThreatened: false,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 1400,
    elevationMax: 2400,
    districtsCount: 18,
    mainHabitats: ['Orchard', 'Agricultural'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['August', 'September', 'October'],
    dormancyMonths: ['December', 'January', 'February'],
    
    climateSignals: ['Early Warming', 'Late Frost', 'Snowmelt Shift'],
    climateShiftNotes: 'Economic backbone of Himalayan horticulture. Blooming dates have shifted 8 days earlier. Inadequate winter chilling hours (<1000 hrs at <7.2°C) in lower valley basins impairs synchronous bloom.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -8,
    chillingRequirementHours: 1000,
    frostVulnerabilityIndex: 'Critical',
    gddThreshold: 250,
    
    pollinatorLinkages: ['Honeybees (Apis cerana & Apis mellifera)', 'Bumblebees', 'Mining Bees'],
    shortDescription: 'Premier fruit tree of the Western Himalayas whose pink-white April blossoms are essential to rural economy.',
    currentStatus: 'Pink bud to early blossom stage across valley orchards.',
    
    validation: {
      sourceName: 'Division of Fruit Science, SKUAST-K',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2025,
      observationDate: '2025-04-12',
      confidence: 'High',
      lastReviewedDate: '2026-05-10'
    }
  },
  {
    id: 'pheno-005',
    speciesId: 'flora-005',
    commonName: 'Common Walnut',
    scientificName: 'Juglans regia',
    kashmiriName: 'Doon',
    family: 'Juglandaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
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
    
    climateSignals: ['Late Frost', 'Early Warming'],
    climateShiftNotes: 'Catkin emergence and leaf-out advanced by 7 days. Male catkins and tender female flowers vulnerable to late April sub-zero chills.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -7,
    chillingRequirementHours: 800,
    frostVulnerabilityIndex: 'High',
    gddThreshold: 220,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'Massive indigenous broadleaved tree producing prized hard-shelled nuts; catkin drop is a key spring phenology benchmark.',
    currentStatus: 'Catkin emergence and tender leaf unfolding.',
    
    validation: {
      sourceName: 'GBIF Observation Dataset',
      sourceType: 'GBIF Specimen',
      sourceYear: 2025,
      observationDate: '2025-04-28',
      confidence: 'High',
      lastReviewedDate: '2026-05-02'
    }
  },
  {
    id: 'pheno-006',
    speciesId: 'flora-006',
    commonName: 'Chinar / Oriental Plane',
    scientificName: 'Platanus orientalis',
    kashmiriName: 'Boen / Bouin',
    family: 'Platanaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Introduced',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 1400,
    elevationMax: 2200,
    districtsCount: 12,
    mainHabitats: ['Urban', 'Forest', 'Riverine'],
    
    currentStage: 'Leaf-Out',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['October', 'November'],
    dormancyMonths: ['December', 'January', 'February', 'March'],
    
    climateSignals: ['Early Warming', 'Heat Stress'],
    climateShiftNotes: 'Crown leaf flush advanced by 5 days; autumn senescence and leaf color transition (green to ruby-gold) delayed by 10 days due to lingering warm autumns.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -5,
    chillingRequirementHours: 600,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 210,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'Cultural keystone tree of Kashmir Valley; massive hemispherical crown whose spring bud-burst and autumn foliage shift dictate seasonal rhythm.',
    currentStatus: 'Spring leaf expansion and spherical inflorescence emergence.',
    
    validation: {
      sourceName: 'CCN Heritage Chinar Phenology Register',
      sourceType: 'Flora Survey',
      sourceYear: 2025,
      observationDate: '2025-04-18',
      confidence: 'High',
      lastReviewedDate: '2026-05-12'
    }
  },
  {
    id: 'pheno-007',
    speciesId: 'flora-007',
    commonName: 'Himalayan Blue Poppy',
    scientificName: 'Meconopsis aculeata',
    kashmiriName: 'Gul-e-Neelam',
    family: 'Papaveraceae',
    plantGroup: ['Herbs', 'Threatened Flora', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'VU',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'Ladakh', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 3200,
    elevationMax: 4500,
    districtsCount: 14,
    mainHabitats: ['Alpine', 'Meadow', 'Rocky terrain'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'July',
    peakFloweringMonths: ['July', 'August'],
    latestFloweringMonth: 'September',
    fruitingMonths: ['September', 'October'],
    dormancyMonths: ['November', 'December', 'January', 'February', 'March', 'April', 'May'],
    
    climateSignals: ['Snowmelt Shift', 'Drought'],
    climateShiftNotes: 'High-elevation alpine sentinel. Flowering window is tightly linked to snowpack melt. Earlier snowmelt causes blooming to advance by 10 days, exposing flowers to erratic alpine hail storms.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -10,
    chillingRequirementHours: 1400,
    frostVulnerabilityIndex: 'Moderate',
    gddThreshold: 120,
    
    pollinatorLinkages: ['Bumblebees (Bombus tunicatus)', 'Alpine Hoverflies'],
    shortDescription: 'Striking sky-blue prickly poppy inhabiting high glacial moraines, screes, and alpine rock ledges.',
    currentStatus: 'Dormant beneath heavy alpine snowpack.',
    
    validation: {
      sourceName: 'Western Himalayan Alpine Flora Survey',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-07-22',
      confidence: 'High',
      lastReviewedDate: '2026-04-15'
    }
  },
  {
    id: 'pheno-008',
    speciesId: 'flora-008',
    commonName: 'Brahma Kamal / Snow Lotus',
    scientificName: 'Saussurea obvallata',
    kashmiriName: 'Kasturi Kamal',
    family: 'Asteraceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'VU',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Transboundary / Extended',
    regionsPresent: ['Kashmir Core', 'Ladakh', 'Gilgit-Baltistan'],
    elevationMin: 3800,
    elevationMax: 4800,
    districtsCount: 8,
    mainHabitats: ['Alpine', 'Rocky terrain'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'July',
    peakFloweringMonths: ['August'],
    latestFloweringMonth: 'September',
    fruitingMonths: ['September', 'October'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'],
    
    climateSignals: ['Snowmelt Shift', 'Heat Stress'],
    climateShiftNotes: 'Protected by boat-shaped papery translucent bracts creating a micro-greenhouse over the purple florets. Flowering advanced by 8 days along glaciated cols.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -8,
    chillingRequirementHours: 1600,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 90,
    
    pollinatorLinkages: ['High-altitude Flies', 'Bumblebees'],
    shortDescription: 'Sacred high-altitude composite with luminous chartreuse papery bracts flourishing above 4,000m.',
    currentStatus: 'Deep permafrost and snowpack dormancy.',
    
    validation: {
      sourceName: 'High Altitude Botanical Research Group',
      sourceType: 'University Thesis',
      sourceYear: 2024,
      observationDate: '2024-08-14',
      confidence: 'High',
      lastReviewedDate: '2026-05-08'
    }
  },
  {
    id: 'pheno-009',
    speciesId: 'flora-009',
    commonName: 'Kashmir Kutki / Kour',
    scientificName: 'Picrorhiza kurroa',
    kashmiriName: 'Kour',
    family: 'Plantaginaceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'EN',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 3000,
    elevationMax: 4300,
    districtsCount: 12,
    mainHabitats: ['Alpine', 'Meadow'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'June',
    peakFloweringMonths: ['July'],
    latestFloweringMonth: 'August',
    fruitingMonths: ['August', 'September'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    
    climateSignals: ['Snowmelt Shift', 'Drought'],
    climateShiftNotes: 'Rhizomatous perennial emerging instantly upon snow disappearance. Premature snow melt followed by dry June causes rhizome desiccation.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -7,
    chillingRequirementHours: 1300,
    frostVulnerabilityIndex: 'Moderate',
    gddThreshold: 110,
    
    pollinatorLinkages: ['Specialist Alpine Bees', 'Flies'],
    shortDescription: 'Critically important endangered liver tonic herb with blue-spiked inflorescences on high alpine meadows.',
    currentStatus: 'Dormant under winter snow cover.',
    
    validation: {
      sourceName: 'WII Threatened Flora Phenology Tracking',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-07-05',
      confidence: 'High',
      lastReviewedDate: '2026-04-25'
    }
  },
  {
    id: 'pheno-010',
    speciesId: 'flora-010',
    commonName: 'Kashmir Morel / Guchhi',
    scientificName: 'Morchella esculenta',
    kashmiriName: 'Kanaguchhi',
    family: 'Morchellaceae',
    plantGroup: ['Herbs', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'NT',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 1800,
    elevationMax: 3200,
    districtsCount: 14,
    mainHabitats: ['Forest'],
    
    currentStage: 'Peak Bloom',
    earliestFloweringMonth: 'March',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['April', 'May'],
    dormancyMonths: ['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February'],
    
    climateSignals: ['Snowmelt Shift', 'Early Warming', 'Rainfall Shift'],
    climateShiftNotes: 'Wild gourmet ascomycete fungus whose fruiting body flush occurs precisely during soil temperature transition from 4°C to 10°C after spring snowmelt. Fruiting advanced by 14 days over the last 15 years.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -14,
    chillingRequirementHours: 1200,
    frostVulnerabilityIndex: 'High',
    gddThreshold: 100,
    
    pollinatorLinkages: ['Wind Spore Dispersal', 'Mycophagous Beetles'],
    shortDescription: 'Prized wild honeycomb mushroom emerging from moist conifer needle beds following spring snowmelt.',
    currentStatus: 'Active ascocarp fruiting flush in moist deodar and fir slopes.',
    
    validation: {
      sourceName: 'Forest Research Institute (FRI) NTFP Monitoring',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2025,
      observationDate: '2025-04-04',
      confidence: 'High',
      lastReviewedDate: '2026-05-05'
    }
  },
  {
    id: 'pheno-011',
    speciesId: 'flora-011',
    commonName: 'Costus / Kuth',
    scientificName: 'Saussurea costus',
    kashmiriName: 'Kuth',
    family: 'Asteraceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'CR',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'AJK'],
    elevationMin: 2600,
    elevationMax: 3800,
    districtsCount: 6,
    mainHabitats: ['Alpine', 'Forest', 'Meadow'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'July',
    peakFloweringMonths: ['August'],
    latestFloweringMonth: 'September',
    fruitingMonths: ['September', 'October'],
    dormancyMonths: ['November', 'December', 'January', 'February', 'March', 'April', 'May'],
    
    climateSignals: ['Early Warming', 'Late Frost'],
    climateShiftNotes: 'Critically endangered Himalayan aromatic herb protected under CITES Appendix I. Flowering advanced by 6 days in Gurez and Lolab conservation nurseries.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -6,
    chillingRequirementHours: 1100,
    frostVulnerabilityIndex: 'Moderate',
    gddThreshold: 160,
    
    pollinatorLinkages: ['Bees', 'Butterflies', 'Flies'],
    shortDescription: 'Legendary endemic medicinal plant of Kashmir high valleys whose aromatic roots are internationally renowned.',
    currentStatus: 'Perennial root crown dormancy beneath subalpine snow.',
    
    validation: {
      sourceName: 'J&K Forest Department Red Data Survey',
      sourceType: 'Institutional Report',
      sourceYear: 2024,
      observationDate: '2024-08-02',
      confidence: 'High',
      lastReviewedDate: '2026-04-18'
    }
  },
  {
    id: 'pheno-012',
    speciesId: 'flora-012',
    commonName: 'Seabuckthorn',
    scientificName: 'Hippophae rhamnoides',
    kashmiriName: 'Tsermang / Charma',
    family: 'Elaeagnaceae',
    plantGroup: ['Shrubs', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Ladakh', 'Gilgit-Baltistan'],
    elevationMin: 2400,
    elevationMax: 4200,
    districtsCount: 8,
    mainHabitats: ['Cold Desert', 'Riverine'],
    
    currentStage: 'Leaf-Out',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['May'],
    latestFloweringMonth: 'June',
    fruitingMonths: ['August', 'September', 'October'],
    dormancyMonths: ['November', 'December', 'January', 'February', 'March'],
    
    climateSignals: ['Early Warming', 'Heat Stress', 'Snowmelt Shift'],
    climateShiftNotes: 'Cold desert super-plant fixing atmospheric nitrogen along river floodplains in Nubra and Indus. Flowering advanced by 8 days; berry ripening occurs earlier, reducing berry vitamin C concentration under high summer heat.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -8,
    chillingRequirementHours: 950,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 170,
    
    pollinatorLinkages: ['Wind Pollinated', 'Small Diptera'],
    shortDescription: 'Thorny, silver-leaved deciduous shrub whose vibrant orange berries survive sub-zero Ladakhi winters.',
    currentStatus: 'Bud swelling and catkin-like male inflorescence development.',
    
    validation: {
      sourceName: 'DIHAR-DRDO High Altitude Agro-Technology Report',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2024,
      observationDate: '2024-05-18',
      confidence: 'High',
      lastReviewedDate: '2026-05-14'
    }
  },
  {
    id: 'pheno-013',
    speciesId: 'flora-013',
    commonName: 'Wild Apricot',
    scientificName: 'Prunus armeniaca',
    kashmiriName: 'Chuli / Khubani',
    family: 'Rosaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Transboundary / Extended',
    regionsPresent: ['Ladakh', 'Gilgit-Baltistan', 'Jammu'],
    elevationMin: 2000,
    elevationMax: 3400,
    districtsCount: 10,
    mainHabitats: ['Orchard', 'Riverine', 'Cold Desert'],
    
    currentStage: 'Peak Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['July', 'August'],
    dormancyMonths: ['November', 'December', 'January', 'February', 'March'],
    
    climateSignals: ['Early Warming', 'Late Frost'],
    climateShiftNotes: 'Herald of spring across Ladakh and Gilgit-Baltistan valleys (Kargil, Hunza, Skardu). Blossom has advanced by 11 days. Sudden mountain temperature plunges during full bloom freeze pistils.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -11,
    chillingRequirementHours: 400,
    frostVulnerabilityIndex: 'Critical',
    gddThreshold: 150,
    
    pollinatorLinkages: ['Himalayan Honeybees (Apis laboriosa)', 'Solitary Bees', 'Syrphids'],
    shortDescription: 'Celebrated white-and-pink blossom of trans-Himalayan valleys supporting oasis horticulture and oil production.',
    currentStatus: 'Massive floral bloom across Indus and Hunza river terraces.',
    
    validation: {
      sourceName: 'ICIMOD Mountain Agriculture Tracking',
      sourceType: 'Institutional Report',
      sourceYear: 2025,
      observationDate: '2025-04-16',
      confidence: 'High',
      lastReviewedDate: '2026-05-11'
    }
  },
  {
    id: 'pheno-014',
    speciesId: 'flora-014',
    commonName: 'Himalayan Birch',
    scientificName: 'Betula utilis',
    kashmiriName: 'Burza / Bhojpatra',
    family: 'Betulaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'Ladakh', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 3000,
    elevationMax: 4200,
    districtsCount: 22,
    mainHabitats: ['Alpine', 'Forest'],
    
    currentStage: 'Leaf-Out',
    earliestFloweringMonth: 'May',
    peakFloweringMonths: ['May', 'June'],
    latestFloweringMonth: 'June',
    fruitingMonths: ['September', 'October'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    
    climateSignals: ['Snowmelt Shift', 'Early Warming'],
    climateShiftNotes: 'Treeline keystone species defining the upper arboreal limit of the Western Himalayas. Bud burst and pendulous male catkin development advanced by 9 days as upper slopes warm.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -9,
    chillingRequirementHours: 1500,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 110,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'White peeling-bark birch tree forming the critical subalpine treeline ecotone buffering glacial headwaters.',
    currentStatus: 'Tender leaf flushing and catkin elongation at treeline margins.',
    
    validation: {
      sourceName: 'Kashmir University Centre for Biodiversity',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2024,
      observationDate: '2024-05-24',
      confidence: 'High',
      lastReviewedDate: '2026-05-06'
    }
  },
  {
    id: 'pheno-015',
    speciesId: 'flora-015',
    commonName: 'Himalayan Mayapple',
    scientificName: 'Sinopodophyllum hexandrum',
    kashmiriName: 'Bankakri',
    family: 'Berberidaceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'EN',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 2400,
    elevationMax: 3600,
    districtsCount: 10,
    mainHabitats: ['Forest', 'Meadow'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'May',
    peakFloweringMonths: ['May', 'June'],
    latestFloweringMonth: 'June',
    fruitingMonths: ['July', 'August'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
    
    climateSignals: ['Early Warming', 'Late Frost'],
    climateShiftNotes: 'High-value podophyllotoxin anticancer plant. Emerging flower buds pop through forest litter directly after snow recession, advancing by 8 days.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -8,
    chillingRequirementHours: 1200,
    frostVulnerabilityIndex: 'High',
    gddThreshold: 140,
    
    pollinatorLinkages: ['Bumblebees', 'Queen Wasps'],
    shortDescription: 'Solitary white-pink cup-shaped flower emerging above umbrella-like lobed leaves in moist fir-spruce understories.',
    currentStatus: 'Emergence of solitary cup flowers alongside unfurling leaves.',
    
    validation: {
      sourceName: 'CSIR-IIIM Jammu Botanical Repository',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-05-12',
      confidence: 'High',
      lastReviewedDate: '2026-04-28'
    }
  },
  {
    id: 'pheno-016',
    speciesId: 'flora-016',
    commonName: 'Ban Oak',
    scientificName: 'Quercus leucotrichophora',
    kashmiriName: 'Banj',
    family: 'Fagaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: false,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Jammu', 'AJK'],
    elevationMin: 1000,
    elevationMax: 2200,
    districtsCount: 8,
    mainHabitats: ['Forest'],
    
    currentStage: 'Full Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['October', 'November', 'December'],
    dormancyMonths: ['January', 'February'],
    
    climateSignals: ['Early Warming', 'Drought'],
    climateShiftNotes: 'Dominant broadleaved tree of outer Shivalik and middle Chenab slopes. Catkin drop and new leaf flush advanced by 6 days; pre-monsoon heat waves stress acorn maturation.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -6,
    chillingRequirementHours: 500,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 200,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'Evergreen Himalayan oak with serrated leaves, silver-grey beneath; primary water recharge tree of Shivalik hills.',
    currentStatus: 'Pendulous male catkins shedding pollen in moist subtropical ravines.',
    
    validation: {
      sourceName: 'Jammu University Botanical Department',
      sourceType: 'University Thesis',
      sourceYear: 2024,
      observationDate: '2024-04-22',
      confidence: 'High',
      lastReviewedDate: '2026-05-04'
    }
  },
  {
    id: 'pheno-017',
    speciesId: 'flora-017',
    commonName: 'Himalayan Rhubarb',
    scientificName: 'Rheum webbianum',
    kashmiriName: 'Pambchalan',
    family: 'Polygonaceae',
    plantGroup: ['Herbs', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'VU',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Transboundary / Extended',
    regionsPresent: ['Kashmir Core', 'Ladakh', 'Gilgit-Baltistan'],
    elevationMin: 3000,
    elevationMax: 4400,
    districtsCount: 12,
    mainHabitats: ['Alpine', 'Rocky terrain'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'June',
    peakFloweringMonths: ['June', 'July'],
    latestFloweringMonth: 'August',
    fruitingMonths: ['August', 'September'],
    dormancyMonths: ['October', 'November', 'December', 'January', 'February', 'March', 'April', 'May'],
    
    climateSignals: ['Snowmelt Shift'],
    climateShiftNotes: 'Stout perennial herb with large rounded leaves and dense pyramidal yellowish flower spikes. Rapid response to snowmelt timing with bloom shift of -7 days.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -7,
    chillingRequirementHours: 1350,
    frostVulnerabilityIndex: 'Moderate',
    gddThreshold: 130,
    
    pollinatorLinkages: ['Flies', 'Beetles', 'Small Solitary Bees'],
    shortDescription: 'Robust subalpine wild rhubarb flourishing on rocky talus slopes and alpine gullies.',
    currentStatus: 'Rootstock dormant beneath high mountain snow cover.',
    
    validation: {
      sourceName: 'Western Himalayan Medicinal Plant Register',
      sourceType: 'Flora Survey',
      sourceYear: 2024,
      observationDate: '2024-06-28',
      confidence: 'High',
      lastReviewedDate: '2026-04-30'
    }
  },
  {
    id: 'pheno-018',
    speciesId: 'flora-018',
    commonName: 'Crown Imperial Fritillaria',
    scientificName: 'Fritillaria roylei',
    kashmiriName: 'Sheetkhar',
    family: 'Liliaceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'VU',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 2800,
    elevationMax: 4000,
    districtsCount: 8,
    mainHabitats: ['Meadow', 'Alpine', 'Forest'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'May',
    peakFloweringMonths: ['May', 'June'],
    latestFloweringMonth: 'June',
    fruitingMonths: ['July', 'August'],
    dormancyMonths: ['September', 'October', 'November', 'December', 'January', 'February', 'March', 'April'],
    
    climateSignals: ['Snowmelt Shift', 'Late Frost'],
    climateShiftNotes: 'Nodding bell-shaped yellowish-green to purple-checkered flowers. Bloom advanced by 10 days; highly vulnerable to sheep grazing and bulb extraction.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -10,
    chillingRequirementHours: 1250,
    frostVulnerabilityIndex: 'High',
    gddThreshold: 140,
    
    pollinatorLinkages: ['Bumblebees', 'Wasps', 'Hoverflies'],
    shortDescription: 'Exquisite subalpine bell lily flowering directly along melting snowbanks; prized bulb in traditional medicine.',
    currentStatus: 'Stem elongation and pendulous bud development on subalpine slopes.',
    
    validation: {
      sourceName: 'SKUAST-K Endangered Alpine Bulb Project',
      sourceType: 'Peer-Reviewed Study',
      sourceYear: 2025,
      observationDate: '2025-05-02',
      confidence: 'High',
      lastReviewedDate: '2026-05-10'
    }
  },
  {
    id: 'pheno-019',
    speciesId: 'flora-019',
    commonName: 'Himalayan Yew',
    scientificName: 'Taxus contorta',
    kashmiriName: 'Posthul',
    family: 'Taxaceae',
    plantGroup: ['Trees', 'Threatened Flora', 'Medicinal Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'EN',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 2100,
    elevationMax: 3300,
    districtsCount: 10,
    mainHabitats: ['Forest'],
    
    currentStage: 'Full Bloom',
    earliestFloweringMonth: 'March',
    peakFloweringMonths: ['April'],
    latestFloweringMonth: 'April',
    fruitingMonths: ['September', 'October', 'November'],
    dormancyMonths: ['December', 'January', 'February'],
    
    climateSignals: ['Early Warming', 'Drought'],
    climateShiftNotes: 'Dioecious ancient conifer source of taxol anticancer compounds. Male strobili pollen release advanced by 5 days; female cup-shaped seed maturation extends through autumn.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -5,
    chillingRequirementHours: 1100,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 180,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'Shade-tolerant ancient conifer of high conifer forests with soft needles and fleshy scarlet arils.',
    currentStatus: 'Pollen shedding from male strobili in dense old-growth stands.',
    
    validation: {
      sourceName: 'WII Threatened Conifer Assessment',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-04-06',
      confidence: 'High',
      lastReviewedDate: '2026-04-22'
    }
  },
  {
    id: 'pheno-020',
    speciesId: 'flora-020',
    commonName: 'White Willow',
    scientificName: 'Salix alba',
    kashmiriName: 'Veer',
    family: 'Salicaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'Ladakh'],
    elevationMin: 1400,
    elevationMax: 2400,
    districtsCount: 14,
    mainHabitats: ['Wetland', 'Riverine'],
    
    currentStage: 'Full Bloom',
    earliestFloweringMonth: 'March',
    peakFloweringMonths: ['March', 'April'],
    latestFloweringMonth: 'April',
    fruitingMonths: ['May', 'June'],
    dormancyMonths: ['November', 'December', 'January', 'February'],
    
    climateSignals: ['Early Warming', 'Late Frost'],
    climateShiftNotes: 'Riparian and wetland stabilizer; basis of Kashmir cricket bat and wicker wickerwork craft. Yellow-green catkin bloom advanced by 9 days, coinciding with early wetland waterfowl nesting.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -9,
    chillingRequirementHours: 550,
    frostVulnerabilityIndex: 'Moderate',
    gddThreshold: 160,
    
    pollinatorLinkages: ['Early Spring Honeybees', 'Diptera'],
    shortDescription: 'Moisture-loving riparian willow whose dense early spring catkins provide the primary nectar source for awakening bee colonies.',
    currentStatus: 'Full catkin bloom along Dal, Wular, and river floodplains.',
    
    validation: {
      sourceName: 'Wetland International South Asia Survey',
      sourceType: 'Institutional Report',
      sourceYear: 2025,
      observationDate: '2025-03-28',
      confidence: 'High',
      lastReviewedDate: '2026-05-02'
    }
  },
  {
    id: 'pheno-021',
    speciesId: 'flora-021',
    commonName: 'Indian Aconite / Monkshood',
    scientificName: 'Aconitum heterophyllum',
    kashmiriName: 'Patis',
    family: 'Ranunculaceae',
    plantGroup: ['Herbs', 'Medicinal Flora', 'Threatened Flora'],
    nativeStatus: 'Native',
    conservationStatus: 'CR',
    isMedicinal: true,
    isThreatened: true,
    
    primaryScope: 'Kashmir Core',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK'],
    elevationMin: 2700,
    elevationMax: 4000,
    districtsCount: 8,
    mainHabitats: ['Alpine', 'Meadow'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'August',
    peakFloweringMonths: ['August', 'September'],
    latestFloweringMonth: 'September',
    fruitingMonths: ['September', 'October'],
    dormancyMonths: ['November', 'December', 'January', 'February', 'March', 'April', 'May', 'June'],
    
    climateSignals: ['Drought', 'Snowmelt Shift'],
    climateShiftNotes: 'Late summer alpine herb producing stunning violet hood-like flowers. Phenology delayed or compressed by 4 days due to erratic summer monsoonal cloudbursts.',
    phenologyShiftIndicator: 'Delayed',
    shiftDays: 4,
    chillingRequirementHours: 1300,
    frostVulnerabilityIndex: 'Moderate',
    gddThreshold: 180,
    
    pollinatorLinkages: ['Long-tongued Bumblebees (Bombus ferganicus)'],
    shortDescription: 'Critically endangered alpine herb with blue-purple helmet flowers, renowned for non-toxic therapeutic alkaloids.',
    currentStatus: 'Tuberous root dormancy beneath alpine snow.',
    
    validation: {
      sourceName: 'IUCN SSC Himalayan Plant Specialist Group',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-08-20',
      confidence: 'High',
      lastReviewedDate: '2026-04-12'
    }
  },
  {
    id: 'pheno-022',
    speciesId: 'flora-022',
    commonName: 'Blue Pine / Kail',
    scientificName: 'Pinus wallichiana',
    kashmiriName: 'Kayur / Kail',
    family: 'Pinaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: false,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 1800,
    elevationMax: 3200,
    districtsCount: 20,
    mainHabitats: ['Forest'],
    
    currentStage: 'First Bloom',
    earliestFloweringMonth: 'April',
    peakFloweringMonths: ['April', 'May'],
    latestFloweringMonth: 'May',
    fruitingMonths: ['October', 'November'],
    dormancyMonths: ['December', 'January', 'February'],
    
    climateSignals: ['Early Warming', 'Drought'],
    climateShiftNotes: 'Pollen release advanced by 6 days in Pir Panjal. Massive yellow pollen clouds in late April disperse across valley floor.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -6,
    chillingRequirementHours: 900,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 200,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'Five-needled apex conifer dominating middle elevations; annual male strobili pollen shower is a key spring phenology event.',
    currentStatus: 'Male cone clusters ripening for wind pollen dispersion.',
    
    validation: {
      sourceName: 'FSI Phenological Phenome Survey',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-04-25',
      confidence: 'High',
      lastReviewedDate: '2026-05-02'
    }
  },
  {
    id: 'pheno-023',
    speciesId: 'flora-023',
    commonName: 'Wild Rose',
    scientificName: 'Rosa webbiana',
    kashmiriName: 'Gul-e-Surkh / Sia',
    family: 'Rosaceae',
    plantGroup: ['Shrubs'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Ladakh', 'Gilgit-Baltistan', 'Kashmir Core'],
    elevationMin: 2000,
    elevationMax: 3800,
    districtsCount: 12,
    mainHabitats: ['Cold Desert', 'Meadow', 'Rocky terrain'],
    
    currentStage: 'Leaf-Out',
    earliestFloweringMonth: 'May',
    peakFloweringMonths: ['June'],
    latestFloweringMonth: 'July',
    fruitingMonths: ['August', 'September'],
    dormancyMonths: ['November', 'December', 'January', 'February', 'March', 'April'],
    
    climateSignals: ['Early Warming', 'Heat Stress'],
    climateShiftNotes: 'Spiny shrub of arid inner valleys with bright pink fragrant flowers. Flowering onset shifted 7 days earlier across Zanskar and Leh ravines.',
    phenologyShiftIndicator: 'Advancing',
    shiftDays: -7,
    chillingRequirementHours: 850,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 170,
    
    pollinatorLinkages: ['Native Bees', 'Syrphid Flies', 'Beetles'],
    shortDescription: 'Fragrant wild pink rose flourishing on arid screes and Ladakh stream banks, producing vitamin-rich hips.',
    currentStatus: 'Leaf buds breaking and thorny shoots greening.',
    
    validation: {
      sourceName: 'University of Ladakh Botanical Monograph',
      sourceType: 'Flora Survey',
      sourceYear: 2024,
      observationDate: '2024-06-10',
      confidence: 'High',
      lastReviewedDate: '2026-04-26'
    }
  },
  {
    id: 'pheno-024',
    speciesId: 'flora-024',
    commonName: 'Deodar Cedar',
    scientificName: 'Cedrus deodara',
    kashmiriName: 'Diyar',
    family: 'Pinaceae',
    plantGroup: ['Trees'],
    nativeStatus: 'Native',
    conservationStatus: 'LC',
    isMedicinal: true,
    isThreatened: false,
    
    primaryScope: 'Trans-Divisional',
    regionsPresent: ['Kashmir Core', 'Jammu', 'AJK', 'Gilgit-Baltistan'],
    elevationMin: 1500,
    elevationMax: 3200,
    districtsCount: 18,
    mainHabitats: ['Forest'],
    
    currentStage: 'Dormancy',
    earliestFloweringMonth: 'October',
    peakFloweringMonths: ['October', 'November'],
    latestFloweringMonth: 'November',
    fruitingMonths: ['October', 'November'],
    dormancyMonths: ['January', 'February', 'March', 'April', 'May'],
    
    climateSignals: ['Autumn Warming', 'Drought'],
    climateShiftNotes: 'Unique conifer shedding pollen in late autumn rather than spring. Male cones shed yellow pollen clouds in October. Stable timing with minor 3-day advance.',
    phenologyShiftIndicator: 'Stable',
    shiftDays: -3,
    chillingRequirementHours: 700,
    frostVulnerabilityIndex: 'Low',
    gddThreshold: 320,
    
    pollinatorLinkages: ['Wind Pollinated'],
    shortDescription: 'Majestic sacred cedar of the Western Himalayas; remarkable for its autumn pollen dispersal and 13-month cone maturation cycle.',
    currentStatus: 'Early shoot dormancy with young barrel cones overwintering.',
    
    validation: {
      sourceName: 'Forest Survey of India Working Plan',
      sourceType: 'Government Botanical Survey',
      sourceYear: 2024,
      observationDate: '2024-10-15',
      confidence: 'High',
      lastReviewedDate: '2026-05-08'
    }
  }
];

export const phenologyDashboardMetrics = [
  { label: 'Validated Records', value: phenologyData.length, icon: 'Leaf' },
  { label: 'Advancing Phenology', value: phenologyData.filter(p => p.phenologyShiftIndicator === 'Advancing').length, icon: 'TrendingUp' },
  { label: 'Frost Vulnerable', value: phenologyData.filter(p => p.frostVulnerabilityIndex === 'Critical' || p.frostVulnerabilityIndex === 'High').length, icon: 'AlertTriangle' },
  { label: 'Active Bloom Window', value: phenologyData.filter(p => p.currentStage === 'Peak Bloom' || p.currentStage === 'First Bloom' || p.currentStage === 'Full Bloom').length, icon: 'ThermometerSun' }
];
