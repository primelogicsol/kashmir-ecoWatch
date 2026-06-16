import { Scope } from './geography';

export type FloraCategory = 'Conifer' | 'Broadleaf Tree' | 'Shrub' | 'Herb' | 'Alpine Flora' | 'Aquatic Plant' | 'Fern' | 'Medicinal' | 'Other';
export type ConservationStatus = 'CR' | 'EN' | 'VU' | 'NT' | 'LC' | 'Not Evaluated';

export interface FloraIntelligence {
  id: string;
  scientificName: string;
  commonName: string;
  kashmiriName?: string;
  family: string;
  category: FloraCategory[];
  
  conservationStatus: ConservationStatus;
  endemicToKashmir: boolean;
  
  // Habitat & Geography
  primaryHabitats: string[];
  altitudeRange: {
    min: number; // in meters
    max: number; // in meters
  };
  primaryScope: Scope;
  districtsPresent: string[];
  
  // Phenology Link (Flowering)
  floweringSeason?: string;
  fruitingSeason?: string;
  
  // Pollinator Link
  primaryPollinators: string[];
  
  // Medicinal & Cultural uses
  medicinalUses?: string[];
  traditionalImportance?: string;
  
  // Threats & Conservation
  primaryThreats: string[];
  
  confidenceLevel: 'High' | 'Medium' | 'Low';
}

export const floraData: FloraIntelligence[] = [
  // Conifers
  {
    id: 'fl-001',
    scientificName: 'Pinus wallichiana',
    commonName: 'Blue Pine / Bhutan Pine',
    kashmiriName: 'Kail / Kayur',
    family: 'Pinaceae',
    category: ['Conifer'],
    conservationStatus: 'LC',
    endemicToKashmir: false,
    primaryHabitats: ['Temperate Forest', 'Sub-alpine Forest'],
    altitudeRange: { min: 1800, max: 3400 },
    primaryScope: 'Trans-Divisional',
    districtsPresent: ['Anantnag', 'Baramulla', 'Kupwara', 'Bandipora', 'Shopian', 'Srinagar'],
    floweringSeason: 'April - June',
    fruitingSeason: 'September - November (Second Year)',
    primaryPollinators: ['Wind'],
    traditionalImportance: 'Timber construction, traditional architecture (Dhajji Dewari).',
    primaryThreats: ['Timber Smuggling', 'Forest Fires', 'Dwarf Mistletoe Infection'],
    confidenceLevel: 'High'
  },
  {
    id: 'fl-002',
    scientificName: 'Abies pindrow',
    commonName: 'West Himalayan Fir',
    kashmiriName: 'Budlu',
    family: 'Pinaceae',
    category: ['Conifer'],
    conservationStatus: 'LC',
    endemicToKashmir: false,
    primaryHabitats: ['Temperate Forest', 'Sub-alpine Forest'],
    altitudeRange: { min: 2000, max: 3300 },
    primaryScope: 'Trans-Divisional',
    districtsPresent: ['Anantnag', 'Shopian', 'Baramulla', 'Kupwara'],
    floweringSeason: 'April - May',
    fruitingSeason: 'October - November',
    primaryPollinators: ['Wind'],
    primaryThreats: ['Deforestation', 'Climate Change (Warming)'],
    confidenceLevel: 'High'
  },
  
  // Broadleaf
  {
    id: 'fl-003',
    scientificName: 'Platanus orientalis',
    commonName: 'Oriental Plane',
    kashmiriName: 'Chinar / Booune',
    family: 'Platanaceae',
    category: ['Broadleaf Tree'],
    conservationStatus: 'NT',
    endemicToKashmir: false,
    primaryHabitats: ['Riverine', 'Urban', 'Valley Floor'],
    altitudeRange: { min: 1500, max: 2200 },
    primaryScope: 'Kashmir Core',
    districtsPresent: ['Srinagar', 'Anantnag', 'Pulwama', 'Ganderbal', 'Baramulla'],
    floweringSeason: 'April - May',
    fruitingSeason: 'September - October',
    primaryPollinators: ['Wind'],
    traditionalImportance: 'Cultural symbol of Kashmir, heritage tree, shade.',
    primaryThreats: ['Urbanization', 'Root Paving', 'Fungal Infections'],
    confidenceLevel: 'High'
  },
  {
    id: 'fl-004',
    scientificName: 'Juglans regia',
    commonName: 'Persian Walnut',
    kashmiriName: 'Doon',
    family: 'Juglandaceae',
    category: ['Broadleaf Tree', 'Other'],
    conservationStatus: 'NT',
    endemicToKashmir: false,
    primaryHabitats: ['Cultivated', 'Valley Floor', 'Lower Temperate'],
    altitudeRange: { min: 1500, max: 2500 },
    primaryScope: 'Kashmir Core',
    districtsPresent: ['Shopian', 'Kulgam', 'Anantnag', 'Pulwama', 'Kupwara'],
    floweringSeason: 'April - May',
    fruitingSeason: 'September - October',
    primaryPollinators: ['Wind'],
    medicinalUses: ['Bark (Dandasa) used for dental hygiene', 'Leaves used as astringent'],
    traditionalImportance: 'Major cash crop, traditional wood carving (Walnut wood).',
    primaryThreats: ['Climate Change (Early spring frost)', 'Pest Infestations'],
    confidenceLevel: 'High'
  },

  // Aquatic
  {
    id: 'fl-005',
    scientificName: 'Nelumbo nucifera',
    commonName: 'Sacred Lotus',
    kashmiriName: 'Pamposh',
    family: 'Nelumbonaceae',
    category: ['Aquatic Plant'],
    conservationStatus: 'LC',
    endemicToKashmir: false,
    primaryHabitats: ['Lake', 'Wetland', 'Slow-moving Rivers'],
    altitudeRange: { min: 1500, max: 1600 },
    primaryScope: 'Kashmir Core',
    districtsPresent: ['Srinagar', 'Bandipora'],
    floweringSeason: 'July - August',
    fruitingSeason: 'September - October',
    primaryPollinators: ['Bees', 'Beetles'],
    medicinalUses: ['Rhizome (Nadru) is a staple food, seeds used in traditional medicine.'],
    traditionalImportance: 'Iconic aquatic plant of Dal & Wular Lakes; cultural/religious significance.',
    primaryThreats: ['Lake Eutrophication', 'Pollution', 'Weed Encroachment'],
    confidenceLevel: 'High'
  },
  
  // Medicinal & Alpine Endemics
  {
    id: 'fl-006',
    scientificName: 'Saussurea costus',
    commonName: 'Costus',
    kashmiriName: 'Kuth',
    family: 'Asteraceae',
    category: ['Medicinal', 'Alpine Flora', 'Herb'],
    conservationStatus: 'CR',
    endemicToKashmir: true,
    primaryHabitats: ['Sub-alpine scrub', 'Alpine meadows'],
    altitudeRange: { min: 2500, max: 3200 },
    primaryScope: 'Trans-Divisional',
    districtsPresent: ['Kupwara', 'Bandipora', 'Anantnag (Pahalgam)'],
    floweringSeason: 'July - August',
    fruitingSeason: 'September',
    primaryPollinators: ['Bumblebees', 'Butterflies'],
    medicinalUses: ['Root extracts used for asthma, ulcers, rheumatoid arthritis, and perfumery.'],
    traditionalImportance: 'Highly valuable medicinal trade item historically.',
    primaryThreats: ['Over-harvesting', 'Illegal Smuggling', 'Habitat Degradation'],
    confidenceLevel: 'Medium'
  },
  {
    id: 'fl-007',
    scientificName: 'Fritillaria cirrhosa',
    commonName: 'Yellow Himalayan Fritillary',
    kashmiriName: 'Ahm Chu',
    family: 'Liliaceae',
    category: ['Medicinal', 'Alpine Flora', 'Herb'],
    conservationStatus: 'VU',
    endemicToKashmir: false,
    primaryHabitats: ['Alpine meadows', 'Rocky slopes'],
    altitudeRange: { min: 3000, max: 4000 },
    primaryScope: 'Trans-Divisional',
    districtsPresent: ['Anantnag', 'Ganderbal'],
    floweringSeason: 'June - July',
    primaryPollinators: ['Bumblebees'],
    medicinalUses: ['Bulbs used for treating respiratory conditions, coughs.'],
    primaryThreats: ['Over-grazing', 'Unregulated collection for traditional medicine'],
    confidenceLevel: 'Medium'
  },
  {
    id: 'fl-008',
    scientificName: 'Trillium govanianum',
    commonName: 'Himalayan Trillium',
    kashmiriName: 'Tripater',
    family: 'Melanthiaceae',
    category: ['Medicinal', 'Herb'],
    conservationStatus: 'EN',
    endemicToKashmir: false,
    primaryHabitats: ['Moist Temperate Forest', 'Sub-alpine Forest undergrowth'],
    altitudeRange: { min: 2500, max: 3300 },
    primaryScope: 'Trans-Divisional',
    districtsPresent: ['Kupwara', 'Anantnag', 'Shopian'],
    floweringSeason: 'May - June',
    fruitingSeason: 'July - August',
    primaryPollinators: ['Flies', 'Beetles'],
    medicinalUses: ['Rhizomes used for sexual disorders, dysentery, anti-inflammatory properties.'],
    primaryThreats: ['Mass illegal extraction for international medicinal trade', 'Deforestation'],
    confidenceLevel: 'High'
  },
  {
    id: 'fl-009',
    scientificName: 'Artemisia absinthium',
    commonName: 'Wormwood',
    kashmiriName: 'Tethwan',
    family: 'Asteraceae',
    category: ['Medicinal', 'Herb', 'Shrub'],
    conservationStatus: 'LC',
    endemicToKashmir: false,
    primaryHabitats: ['Dry slopes', 'Wastelands', 'Meadow margins'],
    altitudeRange: { min: 1500, max: 2800 },
    primaryScope: 'Kashmir Core',
    districtsPresent: ['Srinagar', 'Budgam', 'Pulwama', 'Baramulla'],
    floweringSeason: 'July - September',
    primaryPollinators: ['Wind', 'Small insects'],
    medicinalUses: ['Anti-helminthic (deworming), stomachic, febrifuge.'],
    traditionalImportance: 'Commonly used in Kashmiri households as an herbal remedy.',
    primaryThreats: ['Habitat conversion'],
    confidenceLevel: 'High'
  },
  {
    id: 'fl-010',
    scientificName: 'Aconitum heterophyllum',
    commonName: 'Indian Atees',
    kashmiriName: 'Patis',
    family: 'Ranunculaceae',
    category: ['Medicinal', 'Alpine Flora', 'Herb'],
    conservationStatus: 'EN',
    endemicToKashmir: false,
    primaryHabitats: ['Alpine and Sub-alpine meadows'],
    altitudeRange: { min: 2500, max: 3900 },
    primaryScope: 'Trans-Divisional',
    districtsPresent: ['Anantnag', 'Bandipora', 'Kupwara', 'Ganderbal'],
    floweringSeason: 'July - September',
    primaryPollinators: ['Bumblebees'],
    medicinalUses: ['Tubers used for dyspepsia, fever, and digestive disorders.'],
    primaryThreats: ['Over-harvesting for trade', 'Premature harvesting preventing seed dispersal'],
    confidenceLevel: 'High'
  }
];

export const floraMetrics = {
  totalFloraTracked: 1834,
  totalMedicinalFlora: 127,
  threatenedSpecies: 145, // CR, EN, VU
  endemicToKashmir: 62,
};

export const getFlora = {
  all: () => floraData,
  byId: (id: string) => floraData.find(f => f.id === id),
  byDistrict: (district: string) => floraData.filter(f => f.districtsPresent.includes(district)),
  byStatus: (status: ConservationStatus) => floraData.filter(f => f.conservationStatus === status),
  medicinalOnly: () => floraData.filter(f => f.category.includes('Medicinal')),
  threatenedOnly: () => floraData.filter(f => ['CR', 'EN', 'VU'].includes(f.conservationStatus)),
};
