import { AdminUnit, Scope } from './geography';

export type EcosystemType = 'Forest' | 'Wetland' | 'Lake' | 'River' | 'Spring' | 'Alpine' | 'Agricultural' | 'Urban' | 'Cold Desert';
export type SignalCategory = 'Stress' | 'Transition' | 'Species Use' | 'Suitability Shift';
export type HealthStatus = 'Excellent' | 'Stable' | 'Moderate Concern' | 'High Concern' | 'Critical';
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export interface HabitatScores {
  integrityScore: number;       // 0-100
  connectivityScore: number;    // 0-100
  speciesRichnessScore: number; // 0-100
  climateVulnerability: number; // 0-100 (Higher is worse)
  restorationPotential: number; // 0-100
  humanPressureScore: number;   // 0-100 (Higher is worse)
  overallHealthIndex: number;   // 0-100
}

export interface HabitatSignal {
  id: string;
  habitatName: string;
  ecosystemType: EcosystemType;
  primaryScope: Scope;
  region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  district: string; // 42 Unit Framework
  healthStatus: HealthStatus;
  trendDirection: 'Improving' | 'Stable' | 'Declining' | 'Rapid Decline';
  
  scores: HabitatScores;
  linkedSpeciesCount: number;
  
  activeSignals: {
    category: SignalCategory;
    name: string;
    description: string;
    severity?: 'Low' | 'Medium' | 'High' | 'Critical';
  }[];
  
  shortDescription: string;
  currentStatus: string;
  
  dominantFlora: string[];
  keyFauna: string[];
  
  restorationPriority: 'Low' | 'Medium' | 'High' | 'Critical';
  
  validationSource: string;
}

export const habitatSignalsData: HabitatSignal[] = [
  {
    id: 'hab-001',
    habitatName: 'Hokersar Wetland Reserve',
    ecosystemType: 'Wetland',
    primaryScope: 'Kashmir Core',
    region: 'Kashmir Core',
    district: 'Srinagar',
    healthStatus: 'Moderate Concern',
    trendDirection: 'Declining',
    
    scores: {
      integrityScore: 60,
      connectivityScore: 55,
      speciesRichnessScore: 85,
      climateVulnerability: 75,
      restorationPotential: 90,
      humanPressureScore: 85,
      overallHealthIndex: 64
    },
    linkedSpeciesCount: 187,
    
    activeSignals: [
      { category: 'Stress', name: 'Drying Trend', severity: 'High', description: 'Seasonal drying pressure increasing due to early summer droughts.' },
      { category: 'Stress', name: 'Siltation', severity: 'Critical', description: 'Inflow from Doodhganga bringing heavy silt load.' },
      { category: 'Stress', name: 'Encroachment', severity: 'High', description: 'Urban expansion on peripheral marsh boundaries.' },
      { category: 'Species Use', name: 'Wintering Habitat', severity: 'Low', description: 'Remains functional for migratory waterfowl.' }
    ],
    
    shortDescription: 'Queen Wetland of Kashmir. Critical wintering sink for Palearctic waterfowl but facing severe hydrological stress.',
    currentStatus: 'Winter habitat remains functional but seasonal drying pressure is increasing rapidly.',
    
    dominantFlora: ['Phragmites australis', 'Typha angustata', 'Trapa natans'],
    keyFauna: ['Northern Pintail', 'Greylag Goose', 'Mallard', 'Eurasian Coot'],
    
    restorationPriority: 'Critical',
    validationSource: 'Wetland Authority Monitoring 2026'
  },
  {
    id: 'hab-002',
    habitatName: 'Dachigam National Park (Lower)',
    ecosystemType: 'Forest',
    primaryScope: 'Kashmir Core',
    region: 'Kashmir Core',
    district: 'Srinagar',
    healthStatus: 'Stable',
    trendDirection: 'Stable',
    
    scores: {
      integrityScore: 85,
      connectivityScore: 70,
      speciesRichnessScore: 95,
      climateVulnerability: 40,
      restorationPotential: 80,
      humanPressureScore: 30,
      overallHealthIndex: 82
    },
    linkedSpeciesCount: 245,
    
    activeSignals: [
      { category: 'Transition', name: 'Spring Green-up', description: 'Timely canopy development observed in riverine broadleaf patches.' },
      { category: 'Species Use', name: 'Fawning Grounds', description: 'Hangul fawning activity detected in lower oak patches.' },
      { category: 'Stress', name: 'Invasive Species', severity: 'Medium', description: 'Robinia pseudoacacia expansion in disturbed lower areas.' }
    ],
    
    shortDescription: 'Highly protected riverine and mixed broadleaf forest ecosystem acting as the primary catchment for Dal Lake.',
    currentStatus: 'Ecosystem structure is highly stable with robust natural regeneration in core zones.',
    
    dominantFlora: ['Morus alba', 'Juglans regia', 'Quercus robur', 'Pinus griffithii'],
    keyFauna: ['Kashmir Stag (Hangul)', 'Asiatic Black Bear', 'Leopard'],
    
    restorationPriority: 'Low',
    validationSource: 'J&K Wildlife Department Census 2025'
  },
  {
    id: 'hab-003',
    habitatName: 'Wular Lake System',
    ecosystemType: 'Lake',
    primaryScope: 'Kashmir Core',
    region: 'Kashmir Core',
    district: 'Bandipora',
    healthStatus: 'High Concern',
    trendDirection: 'Rapid Decline',
    
    scores: {
      integrityScore: 45,
      connectivityScore: 60,
      speciesRichnessScore: 75,
      climateVulnerability: 80,
      restorationPotential: 85,
      humanPressureScore: 90,
      overallHealthIndex: 48
    },
    linkedSpeciesCount: 152,
    
    activeSignals: [
      { category: 'Stress', name: 'Willlow Plantation Expansion', severity: 'Critical', description: 'Massive conversion of open water to solid land via willow plantations.' },
      { category: 'Stress', name: 'Pollution', severity: 'High', description: 'Untreated sewage and agricultural runoff from Jhelum basin.' },
      { category: 'Suitability Shift', name: 'Contraction', severity: 'Critical', description: 'Lake surface area actively shrinking year over year.' }
    ],
    
    shortDescription: 'Largest freshwater lake in India, acting as the ultimate flood basin for the Kashmir Valley.',
    currentStatus: 'Ecosystem undergoing massive structural change due to siltation and willow encroachment.',
    
    dominantFlora: ['Salix alba', 'Nymphoides peltata', 'Nelumbo nucifera'],
    keyFauna: ['Common Carp', 'Whiskered Tern', 'Eurasian Otter'],
    
    restorationPriority: 'Critical',
    validationSource: 'Wular Conservation & Management Authority 2026'
  },
  {
    id: 'hab-004',
    habitatName: 'Hirpora Wildlife Sanctuary',
    ecosystemType: 'Alpine',
    primaryScope: 'Kashmir Core',
    region: 'Kashmir Core',
    district: 'Shopian',
    healthStatus: 'Moderate Concern',
    trendDirection: 'Declining',
    
    scores: {
      integrityScore: 75,
      connectivityScore: 80,
      speciesRichnessScore: 88,
      climateVulnerability: 65,
      restorationPotential: 70,
      humanPressureScore: 75,
      overallHealthIndex: 68
    },
    linkedSpeciesCount: 110,
    
    activeSignals: [
      { category: 'Stress', name: 'Grazing Pressure', severity: 'High', description: 'Intense summer grazing competing directly with Markhor.' },
      { category: 'Stress', name: 'Infrastructure Pressure', severity: 'Critical', description: 'Mughal Road traffic causing severe acoustic disturbance and fragmentation.' },
      { category: 'Transition', name: 'Snowmelt Timing', description: 'Snowmelt occurring 12 days earlier than historical average.' }
    ],
    
    shortDescription: 'Crucial sub-alpine and alpine corridor linking the Pir Panjal range to the valley floor.',
    currentStatus: 'High biodiversity value threatened by extreme linear infrastructure fragmentation.',
    
    dominantFlora: ['Betula utilis', 'Abies pindrow', 'Juniperus squamata'],
    keyFauna: ['Pir Panjal Markhor', 'Himalayan Brown Bear', 'Snow Partridge'],
    
    restorationPriority: 'High',
    validationSource: 'Peer-reviewed Markhor Habitat Study 2024'
  },
  {
    id: 'hab-005',
    habitatName: 'Shopian Apple Orchards',
    ecosystemType: 'Agricultural',
    primaryScope: 'Kashmir Core',
    region: 'Kashmir Core',
    district: 'Shopian',
    healthStatus: 'Moderate Concern',
    trendDirection: 'Stable',
    
    scores: {
      integrityScore: 50,
      connectivityScore: 40,
      speciesRichnessScore: 45,
      climateVulnerability: 85,
      restorationPotential: 60,
      humanPressureScore: 90,
      overallHealthIndex: 58
    },
    linkedSpeciesCount: 45,
    
    activeSignals: [
      { category: 'Transition', name: 'Pollinator Emergence', description: 'Orchard mason bees and honey bees highly active during brief bloom window.' },
      { category: 'Stress', name: 'Pesticide Load', severity: 'High', description: 'Intense chemical application severely limiting wild insect biodiversity.' },
      { category: 'Suitability Shift', name: 'Climate Vulnerability', severity: 'Medium', description: 'Late spring frosts frequently destroying entire crop yields.' }
    ],
    
    shortDescription: 'Vast monoculture apple landscapes replacing historical mixed agricultural and forest edge zones.',
    currentStatus: 'Economically productive but ecologically sterilized due to chemical inputs.',
    
    dominantFlora: ['Malus domestica'],
    keyFauna: ['Apis cerana', 'Orchard Mason Bee', 'Black Drongo'],
    
    restorationPriority: 'Medium',
    validationSource: 'SKUAST Agro-Ecology Report 2025'
  },
  {
    id: 'hab-006',
    habitatName: 'Deosai Plains',
    ecosystemType: 'Alpine',
    primaryScope: 'Transboundary / Extended',
    region: 'Gilgit-Baltistan',
    district: 'Skardu',
    healthStatus: 'Stable',
    trendDirection: 'Stable',
    scores: { integrityScore: 90, connectivityScore: 95, speciesRichnessScore: 85, climateVulnerability: 60, restorationPotential: 80, humanPressureScore: 20, overallHealthIndex: 88 },
    linkedSpeciesCount: 140,
    activeSignals: [
      { category: 'Transition', name: 'Late Snowmelt', description: 'Deep snowpack persisting later into summer window.' },
      { category: 'Species Use', name: 'Brown Bear Foraging', description: 'Critical summer foraging corridor for Himalayan Brown Bear.' }
    ],
    shortDescription: 'One of the highest plateaus in the world, renowned for its alpine flora and Brown Bear populations.',
    currentStatus: 'Highly intact high-altitude ecosystem with minimal human interference.',
    dominantFlora: ['Artemisia maritima', 'Polygonum affine'],
    keyFauna: ['Himalayan Brown Bear', 'Tibetan Wolf', 'Himalayan Marmot'],
    restorationPriority: 'Low',
    validationSource: 'Gilgit-Baltistan Wildlife Survey 2024'
  },
  {
    id: 'hab-007',
    habitatName: 'Pangong Tso Basin',
    ecosystemType: 'Cold Desert',
    primaryScope: 'Trans-Divisional',
    region: 'Ladakh',
    district: 'Leh',
    healthStatus: 'Moderate Concern',
    trendDirection: 'Declining',
    scores: { integrityScore: 70, connectivityScore: 60, speciesRichnessScore: 40, climateVulnerability: 85, restorationPotential: 50, humanPressureScore: 70, overallHealthIndex: 62 },
    linkedSpeciesCount: 65,
    activeSignals: [
      { category: 'Stress', name: 'Tourism Pressure', severity: 'Critical', description: 'Unregulated vehicular movement destroying fragile cold desert crust.' },
      { category: 'Species Use', name: 'Breeding Grounds', description: 'Bar-headed Goose and Black-necked Crane nesting areas.' }
    ],
    shortDescription: 'Transboundary endorheic lake system functioning as a critical high-altitude breeding sink.',
    currentStatus: 'Fragile ecosystem experiencing severe stress from unregulated tourism surges.',
    dominantFlora: ['Myricaria elegans', 'Caragana spp.'],
    keyFauna: ['Black-necked Crane', 'Bar-headed Goose', 'Kiang'],
    restorationPriority: 'High',
    validationSource: 'Ladakh Ecological Monitoring Network'
  }
];

export const dashboardMetrics = [
  { label: 'Habitats Tracked', value: habitatSignalsData.length, icon: 'Map' },
  { label: 'Critical / High Concern', value: habitatSignalsData.filter(h => h.healthStatus === 'Critical' || h.healthStatus === 'High Concern').length, icon: 'AlertTriangle' },
  { label: 'Declining Trend', value: habitatSignalsData.filter(h => h.trendDirection.includes('Declin')).length, icon: 'TrendingDown' },
  { label: 'Active Stress Signals', value: habitatSignalsData.flatMap(h => h.activeSignals).filter(s => s.category === 'Stress').length, icon: 'Activity' }
];
