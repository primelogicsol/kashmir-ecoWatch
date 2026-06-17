// Water Systems Data Service
// Comprehensive hydrological intelligence framework for Kashmir
// Covers: All Lakes, Wetlands, Rivers, Streams, Springs, Watersheds, Glaciers/Cryosphere,
//         Water Quality, Fisheries & Aquatic Life, Flood & Hydrological Risk, Restoration & Rejuvenation
//
// NWIA Reference: National Wetland Inventory and Assessment (NWIA) Jammu and Kashmir Atlas
// Source: Space Applications Centre (SAC), ISRO; University of Kashmir; February 2010
// URL: https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf

export interface WaterEntity {
  id: string;
  slug: string;
  name: string;
  type: WaterEntityType;
  category: string;
  description: string;
  district: string;
  watershed?: string;
  area?: number; // km²
  length?: number; // km (for rivers)
  elevation: number; // meters;
  coordinates?: { lat: number; lng: number };
  waterQuality?: WaterQualityData;
  biodiversity?: string[];
  threats?: string[];
  conservationStatus?: string;
  hydrologicalData?: HydrologicalData;
  fisheryData?: FisheryData;
  floodRiskData?: FloodRiskData;
  restorationData?: RestorationData;
  imageUrl?: string;
  region?: string;
  verificationStatus: 'verified' | 'reviewed' | 'community' | 'under-review';
  createdAt: string;
  updatedAt: string;
  // NWIA Classification Reference (Kashmir-specific)
  nwiaCode?: string; // NWIA wetland classification code (e.g., '1101', '1103', '1104', '1106')
  nwiaSignificance?: string; // Hydrological significance from NWIA Atlas
}

export type WaterEntityType =
  | 'lake'
  | 'wetland'
  | 'river'
  | 'stream'
  | 'spring'
  | 'watershed'
  | 'glacier'
  | 'water-quality'
  | 'fishery'
  | 'flood-zone'
  | 'restoration-site'
  | 'groundwater';

export interface WaterQualityData {
  pH: number;
  dissolvedOxygen: number; // mg/L
  turbidity: number; // NTU
  conductivity?: number; // μS/cm
  temperature?: number; // °C
  nitrates?: number; // mg/L
  phosphates?: number; // mg/L
  biologicalOxygenDemand?: number; // mg/L
  totalDissolvedSolids?: number; // mg/L
  fecalColiform?: number; // CFU/100mL
  lastTested: string;
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical' | 'data-deficient';
  trends?: {
    pH: 'improving' | 'stable' | 'declining';
    dissolvedOxygen: 'improving' | 'stable' | 'declining';
    turbidity: 'improving' | 'stable' | 'declining';
  };
}

export interface HydrologicalData {
  flowRate?: number; // m³/s (for rivers)
  discharge?: number; // million m³/year
  rechargeRate?: number; // mm/year
  waterLevel?: number; // meters
  seasonalVariation: 'perennial' | 'seasonal' | 'intermittent';
  source: 'glacial' | 'rainfall' | 'groundwater' | 'mixed';
  drainageArea?: number; // km²
  floodRisk: 'low' | 'moderate' | 'high' | 'critical';
}

export interface FisheryData {
  fishSpecies: string[];
  fisheryType: 'wild' | 'managed' | 'aquaculture';
  productivity: 'low' | 'moderate' | 'high';
  fishingSeason?: string;
  permits: boolean;
  conservationMeasures?: string[];
}

export interface FloodRiskData {
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  floodType: 'flash-flood' | 'riverine' | 'glacial-outburst' | 'waterlogging' | 'overflow';
  affectedAreas: string[];
  vulnerablePopulation?: number;
  infrastructure: string[];
  earlyWarningSystem: boolean;
  mitigationMeasures: string[];
  historicalEvents?: Array<{
    year: number;
    severity: string;
    impact: string;
  }>;
}

export interface RestorationData {
  restorationType: 'lake-restoration' | 'wetland-restoration' | 'spring-rejuvenation' | 'catchment-treatment' | 'river-rehabilitation' | 'recharge-improvement' | 'desiltation' | 'vegetation-recovery';
  status: 'planned' | 'ongoing' | 'completed' | 'maintenance';
  startDate?: string;
  completionDate?: string;
  budget?: number;
  implementingAgency: string;
  objectives: string[];
  outcomes?: string[];
  areaTreated?: number; // km²
  communityInvolvement: boolean;
}

// ============================================================================
// LAKES DATA
// ============================================================================

export const lakesData: WaterEntity[] = [
  {
    id: "dal-lake",
    slug: "dal-lake",
    name: "Dal Lake",
    type: "lake",
    category: "Urban Lake",
    description: "Iconic urban lake and second largest in J&K. Famous for houseboats, shikaras, and floating gardens. Critical for tourism, fisheries, and local livelihoods.",
    district: "Srinagar",
    watershed: "Jhelum Basin",
    area: 18,
    elevation: 1583,
    coordinates: {
      lat: 34.115,
      lng: 74.829
    },
    waterQuality: {
      pH: 7.2,
      dissolvedOxygen: 6.8,
      turbidity: 12,
      conductivity: 245,
      temperature: 18,
      nitrates: 1.8,
      phosphates: 0.15,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 185,
      fecalColiform: 850,
      lastTested: "2026-03-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "snow-trout",
      "common-carp",
      "grass-carp",
      "wetland-birds",
      "aquatic-plants"
    ],
    threats: [
      "eutrophication",
      "encroachment",
      "pollution",
      "invasive-species",
      "sedimentation"
    ],
    hydrologicalData: {
      discharge: 285,
      rechargeRate: 450,
      waterLevel: 3.2,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 312,
      floodRisk: "moderate"
    },
    nwiaCode: "1101",
    nwiaSignificance: "Iconic urban lake and second largest in J&K. Famous for houseboats, shikaras, and floating gardens. Critical for tourism, fisheries, and local livelihoods. Aquatic vegetation: 6,254 ha (district total post-monsoon).",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-03-26T07:00:00Z"
  },
  {
    id: "wular-lake",
    slug: "wular-lake",
    name: "Wular Lake",
    type: "lake",
    category: "Ramsar Lake",
    description: "Largest freshwater lake in South Asia. Ramsar site of international importance. Critical for flood regulation, fisheries, and migratory waterfowl.",
    district: "Bandipora",
    watershed: "Jhelum Basin",
    area: 189,
    elevation: 1575,
    coordinates: {
      lat: 34.4167,
      lng: 74.6333
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.8,
      turbidity: 8,
      conductivity: 198,
      temperature: 16,
      nitrates: 1.2,
      phosphates: 0.08,
      biologicalOxygenDemand: 2.8,
      totalDissolvedSolids: 142,
      fecalColiform: 320,
      lastTested: "2026-03-10",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "schizothorax",
      "common-carp",
      "bar-headed-goose",
      "migratory-waterfowl",
      "wetland-birds"
    ],
    threats: [
      "siltation",
      "invasive-species",
      "catchment-degradation",
      "overfishing"
    ],
    hydrologicalData: {
      discharge: 1250,
      rechargeRate: 520,
      waterLevel: 4.8,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 2890,
      floodRisk: "moderate"
    },
    nwiaCode: "1101",
    nwiaSignificance: "Largest freshwater lake in South Asia. Ramsar site. 69% of Baramulla district wetland area. Critical for flood regulation, fisheries, and migratory waterfowl. High turbidity in pre-monsoon, low in post-monsoon.",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-03-25T10:00:00Z"
  },
  {
    id: "nigeen-lake",
    slug: "nigeen-lake",
    name: "Nigeen Lake",
    type: "lake",
    category: "Urban Lake",
    description: "Pristine urban lake connected to Dal Lake. Known for clear waters and houseboat tourism. Ecologically linked to Dal ecosystem.",
    district: "Srinagar",
    watershed: "Jhelum Basin",
    area: 2.8,
    elevation: 1583,
    coordinates: {
      lat: 34.1333,
      lng: 74.8167
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 7.2,
      turbidity: 6,
      conductivity: 225,
      temperature: 17,
      nitrates: 1.4,
      phosphates: 0.12,
      biologicalOxygenDemand: 3.5,
      totalDissolvedSolids: 168,
      fecalColiform: 520,
      lastTested: "2026-03-18",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "common-carp",
      "wetland-birds",
      "aquatic-plants"
    ],
    threats: [
      "pollution",
      "encroachment",
      "tourism-pressure",
      "invasive-species"
    ],
    hydrologicalData: {
      discharge: 45,
      rechargeRate: 380,
      waterLevel: 2.8,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 85,
      floodRisk: "low"
    },
    nwiaCode: "1101",
    nwiaSignificance: "Pristine urban lake connected to Dal Lake. Known for clear waters and houseboat tourism. Ecologically linked to Dal ecosystem.",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-03-20T14:00:00Z"
  },
  {
    id: "manasbal-lake",
    slug: "manasbal-lake",
    name: "Manasbal Lake",
    type: "lake",
    category: "Freshwater Lake",
    description: "Deepest lake in Kashmir Valley. Important for lotus cultivation, fisheries, and wintering waterfowl. Surrounded by Mughal gardens.",
    district: "Ganderbal",
    watershed: "Jhelum Basin",
    area: 2.8,
    elevation: 1583,
    coordinates: {
      lat: 34.1667,
      lng: 74.7167
    },
    waterQuality: {
      pH: 7.8,
      dissolvedOxygen: 8.2,
      turbidity: 4,
      conductivity: 210,
      temperature: 15,
      nitrates: 0.9,
      phosphates: 0.06,
      biologicalOxygenDemand: 2.2,
      totalDissolvedSolids: 135,
      fecalColiform: 180,
      lastTested: "2026-03-12",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "improving",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "common-carp",
      "lotus",
      "migratory-waterfowl",
      "wetland-birds"
    ],
    threats: [
      "agricultural-runoff",
      "tourism-pressure",
      "invasive-species"
    ],
    hydrologicalData: {
      discharge: 38,
      rechargeRate: 420,
      waterLevel: 3.5,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 95,
      floodRisk: "low"
    },
    nwiaCode: "1101",
    nwiaSignificance: "Deepest lake in Kashmir Valley. Important for lotus cultivation, fisheries, and wintering waterfowl. Surrounded by Mughal gardens. High water quality with excellent clarity.",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-03-22T09:00:00Z"
  },
  {
    id: "anu-char",
    slug: "anu-char",
    name: "Anu Char Lake",
    type: "lake",
    category: "High-Altitude Lake",
    description: "Pristine high-altitude glacial lake in Gurez Valley. Fed by surrounding glaciers. Critical for local hydrology and biodiversity.",
    district: "Bandipora",
    watershed: "Kishanganga Basin",
    area: 0.8,
    elevation: 3200,
    coordinates: {
      lat: 34.6833,
      lng: 74.8
    },
    waterQuality: {
      pH: 7.2,
      dissolvedOxygen: 9.5,
      turbidity: 2,
      conductivity: 85,
      temperature: 8,
      nitrates: 0.3,
      phosphates: 0.02,
      biologicalOxygenDemand: 1.2,
      totalDissolvedSolids: 65,
      fecalColiform: 10,
      lastTested: "2026-03-05",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "migratory-birds"
    ],
    threats: [
      "climate-change",
      "glacial-retreat",
      "grazing-pressure"
    ],
    hydrologicalData: {
      rechargeRate: 280,
      waterLevel: 2.2,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 45,
      floodRisk: "low"
    },
    verificationStatus: "reviewed",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z"
  },
  {
    id: "tarsar-lake",
    slug: "tarsar-lake",
    name: "Tarsar Lake",
    type: "lake",
    category: "Alpine Lake",
    description: "Stunning alpine lake in Lidder Valley. Popular trekking destination. Part of twin lake system with Marsar. Critical for local hydrology.",
    district: "Anantnag",
    watershed: "Lidder Basin",
    area: 0.5,
    elevation: 3800,
    coordinates: {
      lat: 33.9167,
      lng: 75.2833
    },
    waterQuality: {
      pH: 7,
      dissolvedOxygen: 10.2,
      turbidity: 1,
      conductivity: 65,
      temperature: 6,
      nitrates: 0.2,
      phosphates: 0.01,
      biologicalOxygenDemand: 0.8,
      totalDissolvedSolids: 48,
      fecalColiform: 5,
      lastTested: "2026-02-28",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "himalayan-monals",
      "musk-deer"
    ],
    threats: [
      "tourism-pressure",
      "climate-change",
      "waste-accumulation"
    ],
    hydrologicalData: {
      rechargeRate: 220,
      waterLevel: 1.8,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 28,
      floodRisk: "low"
    },
    verificationStatus: "reviewed",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-03-10T16:00:00Z"
  },
  {
    id: "marsar-lake",
    slug: "marsar-lake",
    name: "Marsar Lake",
    type: "lake",
    category: "Alpine Lake",
    description: "Sister lake to Tarsar. High-altitude alpine lake with crystal-clear waters. Important for local hydrology and trekking tourism.",
    district: "Anantnag",
    watershed: "Lidder Basin",
    area: 0.4,
    elevation: 3900,
    coordinates: {
      lat: 33.9333,
      lng: 75.3
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 10.5,
      turbidity: 1,
      conductivity: 62,
      temperature: 5,
      nitrates: 0.2,
      phosphates: 0.01,
      biologicalOxygenDemand: 0.7,
      totalDissolvedSolids: 45,
      fecalColiform: 3,
      lastTested: "2026-02-28",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "himalayan-monals"
    ],
    threats: [
      "tourism-pressure",
      "climate-change",
      "waste-accumulation"
    ],
    hydrologicalData: {
      rechargeRate: 200,
      waterLevel: 1.6,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 25,
      floodRisk: "low"
    },
    verificationStatus: "reviewed",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-03-10T16:00:00Z"
  },
  {
    id: "gangabal-lake",
    slug: "gangabal-lake",
    name: "Gangabal Lake",
    type: "lake",
    category: "Glacial Lake",
    description: "Sacred glacial lake at foothills of Harmukh Peak. Important pilgrimage site. Fed by glaciers. Crystal-clear waters with high spiritual significance.",
    district: "Ganderbal",
    watershed: "Sind Basin",
    area: 0.6,
    elevation: 3570,
    coordinates: {
      lat: 34.2833,
      lng: 74.85
    },
    waterQuality: {
      pH: 7.3,
      dissolvedOxygen: 9.8,
      turbidity: 2,
      conductivity: 72,
      temperature: 7,
      nitrates: 0.3,
      phosphates: 0.02,
      biologicalOxygenDemand: 1,
      totalDissolvedSolids: 55,
      fecalColiform: 25,
      lastTested: "2026-03-01",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "himalayan-monals",
      "brown-bear"
    ],
    threats: [
      "pilgrimage-pressure",
      "climate-change",
      "glacial-retreat",
      "waste-accumulation"
    ],
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 2,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 35,
      floodRisk: "low"
    },
    verificationStatus: "verified",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-03-15T12:00:00Z"
  },
  {
    id: "krishansar-lake",
    slug: "krishansar-lake",
    name: "Krishansar Lake",
    type: "lake",
    category: "Glacial Lake",
    description: "High-altitude glacial lake near Vishansar. Part of Kashmir Great Lakes trek. Sacred lake with crystal-clear waters.",
    district: "Ganderbal",
    watershed: "Sind Basin",
    area: 0.3,
    elevation: 3750,
    coordinates: {
      lat: 34.3,
      lng: 74.8667
    },
    waterQuality: {
      pH: 7.2,
      dissolvedOxygen: 10,
      turbidity: 1,
      conductivity: 68,
      temperature: 6,
      nitrates: 0.2,
      phosphates: 0.01,
      biologicalOxygenDemand: 0.8,
      totalDissolvedSolids: 50,
      fecalColiform: 8,
      lastTested: "2026-03-01",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "himalayan-monals"
    ],
    threats: [
      "trekking-pressure",
      "climate-change",
      "waste-accumulation"
    ],
    hydrologicalData: {
      rechargeRate: 180,
      waterLevel: 1.5,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 22,
      floodRisk: "low"
    },
    verificationStatus: "reviewed",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-03-15T12:00:00Z"
  },
  {
    id: "vishansar-lake",
    slug: "vishansar-lake",
    name: "Vishansar Lake",
    type: "lake",
    category: "Glacial Lake",
    description: "High-altitude glacial lake connected to Krishansar. Part of Kashmir Great Lakes trek. Pristine alpine ecosystem.",
    district: "Ganderbal",
    watershed: "Sind Basin",
    area: 0.35,
    elevation: 3650,
    coordinates: {
      lat: 34.2917,
      lng: 74.8583
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 9.9,
      turbidity: 1,
      conductivity: 70,
      temperature: 6,
      nitrates: 0.2,
      phosphates: 0.01,
      biologicalOxygenDemand: 0.9,
      totalDissolvedSolids: 52,
      fecalColiform: 10,
      lastTested: "2026-03-01",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "himalayan-monals"
    ],
    threats: [
      "trekking-pressure",
      "climate-change",
      "waste-accumulation"
    ],
    hydrologicalData: {
      rechargeRate: 190,
      waterLevel: 1.6,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 24,
      floodRisk: "low"
    },
    verificationStatus: "reviewed",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-03-15T12:00:00Z"
  },
  {
    id: "sheer-kol",
    slug: "sheer-kol",
    name: "Sheer Kol",
    type: "lake",
    category: "High-Altitude Lake",
    description: "Remote high-altitude lake in Gurez region. Pristine ecosystem with minimal human impact. Important for local hydrology.",
    district: "Bandipora",
    watershed: "Kishanganga Basin",
    area: 0.6,
    elevation: 3400,
    coordinates: {
      lat: 34.7,
      lng: 74.85
    },
    waterQuality: {
      pH: 7,
      dissolvedOxygen: 9.6,
      turbidity: 2,
      conductivity: 75,
      temperature: 7,
      nitrates: 0.3,
      phosphates: 0.02,
      biologicalOxygenDemand: 1.1,
      totalDissolvedSolids: 58,
      fecalColiform: 12,
      lastTested: "2026-02-25",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "snow-trout",
      "alpine-flora",
      "migratory-birds"
    ],
    threats: [
      "climate-change",
      "grazing-pressure"
    ],
    hydrologicalData: {
      rechargeRate: 240,
      waterLevel: 1.9,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 38,
      floodRisk: "low"
    },
    verificationStatus: "reviewed",
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-03-12T10:00:00Z"
  },
  {
    id: "pant-chowk-lake",
    slug: "pant-chowk-lake",
    name: "Pant Chowk Lake",
    type: "lake",
    category: "Rural Lake",
    description: "Rural lake in Ganderbal district. Important for local agriculture and fisheries. Community-managed water body.",
    district: "Ganderbal",
    watershed: "Jhelum Basin",
    area: 1.2,
    elevation: 1590,
    coordinates: {
      lat: 34.2167,
      lng: 74.75
    },
    waterQuality: {
      pH: 7.5,
      dissolvedOxygen: 7.5,
      turbidity: 5,
      conductivity: 215,
      temperature: 16,
      nitrates: 1.1,
      phosphates: 0.09,
      biologicalOxygenDemand: 2.5,
      totalDissolvedSolids: 148,
      fecalColiform: 280,
      lastTested: "2026-03-08",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "common-carp",
      "grass-carp",
      "wetland-birds",
      "aquatic-plants"
    ],
    threats: [
      "agricultural-runoff",
      "overfishing",
      "invasive-species"
    ],
    hydrologicalData: {
      discharge: 18,
      rechargeRate: 350,
      waterLevel: 2.5,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 52,
      floodRisk: "low"
    },
    verificationStatus: "verified",
    createdAt: "2026-01-25T00:00:00Z",
    updatedAt: "2026-03-20T08:00:00Z"
  },
  {
    id: "hokersar-lake",
    slug: "hokersar-lake",
    name: "Hokersar Lake",
    type: "lake",
    category: "Wetland Lake",
    description: "Lake component of Hokersar Wetland Reserve. Critical for migratory waterfowl. Ramsar site with high conservation value.",
    district: "Srinagar",
    watershed: "Jhelum Basin",
    area: 8.5,
    elevation: 1585,
    coordinates: {
      lat: 34.25,
      lng: 74.85
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.8,
      turbidity: 6,
      conductivity: 205,
      temperature: 16,
      nitrates: 1,
      phosphates: 0.08,
      biologicalOxygenDemand: 2.4,
      totalDissolvedSolids: 145,
      fecalColiform: 220,
      lastTested: "2026-03-10",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "migratory-waterfowl",
      "wetland-birds",
      "bar-headed-goose",
      "aquatic-plants"
    ],
    threats: [
      "eutrophication",
      "encroachment",
      "siltation"
    ],
    hydrologicalData: {
      discharge: 65,
      rechargeRate: 380,
      waterLevel: 2.8,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 125,
      floodRisk: "moderate"
    },
    verificationStatus: "verified",
    createdAt: "2026-01-05T00:00:00Z",
    updatedAt: "2026-03-18T15:00:00Z"
  },
  {
    id: "tso-moriri-lake",
    slug: "tsomoriri-lake",
    name: "Tso Moriri Lake",
    type: "lake",
    category: "Ramsar Lake",
    description: "A pristine high-altitude lake in the Changthang plateau of Ladakh. Designated as a Ramsar site in 2002. Crucial breeding site for the endangered black-necked crane and bar-headed goose.",
    district: "Leh",
    watershed: "Tso Moriri Watershed",
    area: 120,
    elevation: 4522,
    coordinates: {
      lat: 32.9,
      lng: 78.3
    },
    waterQuality: {
      pH: 8.4,
      dissolvedOxygen: 7.2,
      turbidity: 2,
      conductivity: 450,
      temperature: 8,
      nitrates: 0.2,
      phosphates: 0.02,
      biologicalOxygenDemand: 1,
      totalDissolvedSolids: 310,
      fecalColiform: 5,
      lastTested: "2026-04-15",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "black-necked-crane",
      "bar-headed-goose",
      "brown-headed-gull",
      "kiang",
      "tibetan-wolf"
    ],
    threats: [
      "tourism-pressure",
      "waste-accumulation",
      "climate-change",
      "unregulated-camping"
    ],
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 25,
      seasonalVariation: "perennial",
      source: "glacial",
      drainageArea: 250,
      floodRisk: "low"
    },
    nwiaCode: "1103",
    nwiaSignificance: "High-altitude glacial-fed lake. Crucial freshwater resource in a cold desert environment.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "tso-kar-lake",
    slug: "tsokar-lake",
    name: "Tso Kar Lake",
    type: "lake",
    category: "Ramsar Lake",
    description: "A fluctuating salt lake in the Changthang region of Ladakh. Part of the Tso Kar Basin Ramsar site (designated in 2020). Famous for its extreme salinity and birdlife.",
    district: "Leh",
    watershed: "Tso Kar Endorheic Basin",
    area: 95,
    elevation: 4530,
    coordinates: {
      lat: 33.3,
      lng: 78.0167
    },
    waterQuality: {
      pH: 8.6,
      dissolvedOxygen: 6.9,
      turbidity: 4,
      conductivity: 12500,
      temperature: 9,
      nitrates: 0.4,
      phosphates: 0.03,
      biologicalOxygenDemand: 1.5,
      totalDissolvedSolids: 8900,
      fecalColiform: 10,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "black-necked-crane",
      "great-crested-grebe",
      "ruddy-shelduck",
      "kiang"
    ],
    threats: [
      "climate-change",
      "pastoral-pressure",
      "tourism"
    ],
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 1.5,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 150,
      floodRisk: "low"
    },
    nwiaCode: "1103",
    nwiaSignificance: "Closed endorheic basin of extreme salinity. Highly sensitive to seasonal snowmelt and precipitation.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "surinsar-mansar-lakes",
    slug: "surinsar-mansar-lakes",
    name: "Surinsar-Mansar Lakes",
    type: "lake",
    category: "Ramsar Lake",
    description: "A twin freshwater lake system in the Shivalik foothills of Jammu. Designated as a Ramsar site in 2005. Features dense sub-tropical pine forest catchments and high cultural and biodiversity significance.",
    district: "Jammu",
    watershed: "Devika River Watershed",
    area: 3.5,
    elevation: 600,
    coordinates: {
      lat: 32.7,
      lng: 75.15
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "indian-flapshell-turtle",
      "indian-softshell-turtle",
      "barking-deer",
      "wild-boar",
      "goral",
      "migratory-waterfowl"
    ],
    threats: [
      "tourism-pressure",
      "waste-accumulation",
      "siltation",
      "agricultural-runoff"
    ],
    hydrologicalData: {
      rechargeRate: 350,
      waterLevel: 8,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 45,
      floodRisk: "moderate"
    },
    nwiaCode: "1101",
    nwiaSignificance: "Twin sub-tropical freshwater lakes with subterranean link, providing critical regional groundwater recharge and ecological refuge.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  }
];

// ============================================================================
// WETLANDS DATA
// ============================================================================

export const wetlandsData: WaterEntity[] = [
  {
    id: "wetland-hokersar",
    slug: "hokersar-wetland",
    name: "Hokersar Wetland Conservation Reserve",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "Ramsar site and most important wetland in Kashmir for migratory waterfowl. Critical stopover on Central Asian Flyway. Supports over 100,000 wintering birds.",
    district: "Srinagar",
    watershed: "Srinagar-Budgam Watershed",
    area: 13.75,
    elevation: 1585,
    coordinates: {
      lat: 34.0833,
      lng: 74.7167
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.8,
      turbidity: 6,
      conductivity: 205,
      temperature: 16,
      nitrates: 1,
      phosphates: 0.08,
      biologicalOxygenDemand: 2.4,
      totalDissolvedSolids: 145,
      fecalColiform: 220,
      lastTested: "2026-03-10",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "migratory-waterfowl",
      "wetland-birds",
      "bar-headed-goose",
      "brahminy-duck",
      "marsh-harrier"
    ],
    threats: [
      "eutrophication",
      "encroachment",
      "siltation",
      "invasive-species",
      "pollution"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 420,
      waterLevel: 2.5,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 185,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Known as the \"Queen of Wetlands\" in Kashmir. A major wintering ground for millions of migratory waterfowl from the Central Asian Flyway.",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-shallabugh",
    slug: "shallabugh-wetland",
    name: "Shallabugh Wetland Conservation Reserve",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "Important Ramsar wetland for wintering waterfowl. Second largest wetland in Kashmir after Wular. Critical for biodiversity and flood regulation.",
    district: "Ganderbal",
    watershed: "Sindh-Jhelum Watershed",
    area: 16.75,
    elevation: 1585,
    coordinates: {
      lat: 34.1567,
      lng: 74.7194
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 7.5,
      turbidity: 7,
      conductivity: 218,
      temperature: 16,
      nitrates: 1.2,
      phosphates: 0.1,
      biologicalOxygenDemand: 2.8,
      totalDissolvedSolids: 152,
      fecalColiform: 280,
      lastTested: "2026-03-12",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "migratory-waterfowl",
      "wetland-birds",
      "bar-headed-goose",
      "aquatic-plants"
    ],
    threats: [
      "eutrophication",
      "encroachment",
      "siltation",
      "agricultural-runoff"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 380,
      waterLevel: 2.3,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 145,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Notified as a Ramsar site in 2022. Important habitat for breeding birds and seasonal passage migrant species.",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-hygam",
    slug: "hygam-wetland",
    name: "Hygam Wetland Conservation Reserve",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "Wetland reserve in northern Kashmir. Important for wintering waterfowl and resident species. Community-managed conservation area.",
    district: "Baramulla",
    watershed: "Ningli Nallah Watershed",
    area: 8.02,
    elevation: 1585,
    coordinates: {
      lat: 34.2444,
      lng: 74.5222
    },
    waterQuality: {
      pH: 7.3,
      dissolvedOxygen: 7.2,
      turbidity: 8,
      conductivity: 225,
      temperature: 16,
      nitrates: 1.4,
      phosphates: 0.12,
      biologicalOxygenDemand: 3.2,
      totalDissolvedSolids: 165,
      fecalColiform: 350,
      lastTested: "2026-03-14",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "wetland-birds",
      "migratory-species",
      "aquatic-plants"
    ],
    threats: [
      "eutrophication",
      "encroachment",
      "pollution",
      "agricultural-runoff"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 350,
      waterLevel: 2.1,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 95,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A major peatland and reedbed system in Northern Kashmir. Designated a Ramsar site in 2022. Critical stopover for migratory waterfowl.",
    verificationStatus: "verified",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-mirgund",
    slug: "mirgund-wetland",
    name: "Mirgund Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "Small but ecologically significant wetland in Ganderbal. Important for local biodiversity and groundwater recharge.",
    district: "Baramulla",
    watershed: "Srinagar-Baramulla Border Basin",
    area: 2.8,
    elevation: 1590,
    coordinates: {
      lat: 34.1433,
      lng: 74.6333
    },
    waterQuality: {
      pH: 7.5,
      dissolvedOxygen: 7.6,
      turbidity: 5,
      conductivity: 210,
      temperature: 16,
      nitrates: 1.1,
      phosphates: 0.09,
      biologicalOxygenDemand: 2.6,
      totalDissolvedSolids: 148,
      fecalColiform: 240,
      lastTested: "2026-03-16",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "wetland-birds",
      "aquatic-plants",
      "amphibians"
    ],
    threats: [
      "encroachment",
      "agricultural-runoff",
      "invasive-species"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 380,
      waterLevel: 2.2,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 65,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Highly vulnerable to drying. Hosts large numbers of migratory geese and waders in winter/early spring.",
    verificationStatus: "verified",
    createdAt: "2026-01-10T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-khozibugh",
    slug: "khozibugh-wetland",
    name: "Khozibugh Wetland",
    type: "wetland",
    category: "Conservation Wetland Reserve",
    description: "Wetland in Baramulla district. Supports diverse bird life and local fisheries. Important for flood buffering.",
    district: "Baramulla",
    watershed: "Sopore Watershed",
    area: 3.5,
    elevation: 1580,
    coordinates: {
      lat: 34.3167,
      lng: 74.5833
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 7.4,
      turbidity: 7,
      conductivity: 220,
      temperature: 16,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 158,
      fecalColiform: 310,
      lastTested: "2026-03-11",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "wetland-birds",
      "migratory-species",
      "common-carp",
      "aquatic-plants"
    ],
    threats: [
      "eutrophication",
      "encroachment",
      "overfishing"
    ],
    conservationStatus: "Conservation Wetland Reserve",
    hydrologicalData: {
      rechargeRate: 360,
      waterLevel: 2,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 78,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Suffers from heavy agricultural encroachment and waste dumping due to proximity to Sopore town.",
    verificationStatus: "reviewed",
    createdAt: "2026-01-12T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-saderkoot",
    slug: "saderkoot-wetland",
    name: "Saderkoot Wetland",
    type: "wetland",
    category: "Conservation Wetland Reserve",
    description: "Wetland in Ganderbal with high bird diversity. Important for local ecology and groundwater recharge.",
    district: "Bandipora",
    watershed: "Wular Basin Watershed",
    area: 2.2,
    elevation: 1588,
    coordinates: {
      lat: 34.2667,
      lng: 74.7667
    },
    waterQuality: {
      pH: 7.5,
      dissolvedOxygen: 7.5,
      turbidity: 6,
      conductivity: 212,
      temperature: 16,
      nitrates: 1.2,
      phosphates: 0.1,
      biologicalOxygenDemand: 2.7,
      totalDissolvedSolids: 150,
      fecalColiform: 260,
      lastTested: "2026-03-13",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "wetland-birds",
      "aquatic-plants",
      "amphibians"
    ],
    threats: [
      "agricultural-runoff",
      "encroachment",
      "invasive-species"
    ],
    conservationStatus: "Conservation Wetland Reserve",
    hydrologicalData: {
      rechargeRate: 370,
      waterLevel: 2.1,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 58,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Directly linked to Wular Lake on its eastern shore. Essential breeding site for waterbirds.",
    verificationStatus: "reviewed",
    createdAt: "2026-01-15T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-chandergund",
    slug: "chandergund-wetland",
    name: "Chandergund Wetland",
    type: "wetland",
    category: "Local Wetland Conservation Area",
    description: "Small wetland in Anantnag district. Supports local biodiversity and agriculture. Community-managed.",
    district: "Anantnag",
    watershed: "Bringi-Jhelum Watershed",
    area: 1.8,
    elevation: 1600,
    coordinates: {
      lat: 33.9833,
      lng: 75.15
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.7,
      turbidity: 5,
      conductivity: 205,
      temperature: 15,
      nitrates: 1,
      phosphates: 0.08,
      biologicalOxygenDemand: 2.4,
      totalDissolvedSolids: 142,
      fecalColiform: 200,
      lastTested: "2026-03-09",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "wetland-birds",
      "aquatic-plants",
      "amphibians"
    ],
    threats: [
      "agricultural-runoff",
      "grazing-pressure"
    ],
    conservationStatus: "Local Wetland Conservation Area",
    hydrologicalData: {
      rechargeRate: 340,
      waterLevel: 1.9,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 45,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A wet meadow system located in the upper reaches of the Jhelum basin, important for local grazing and seasonal bird nesting.",
    verificationStatus: "reviewed",
    createdAt: "2026-01-18T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-pampore",
    slug: "pampore-wetland",
    name: "Pampore Wetland Complex (General)",
    type: "wetland",
    category: "Conservation Wetland Reserve",
    description: "Wetland near Pampore town. Supports local agriculture and biodiversity. Under pressure from urban expansion.",
    district: "Pulwama",
    watershed: "Pampore Watershed",
    area: 2.5,
    elevation: 1590,
    coordinates: {
      lat: 34.0167,
      lng: 74.9333
    },
    waterQuality: {
      pH: 7.3,
      dissolvedOxygen: 7,
      turbidity: 9,
      conductivity: 235,
      temperature: 16,
      nitrates: 1.6,
      phosphates: 0.14,
      biologicalOxygenDemand: 3.5,
      totalDissolvedSolids: 172,
      fecalColiform: 420,
      lastTested: "2026-03-07",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "wetland-birds",
      "aquatic-plants"
    ],
    threats: [
      "urban-expansion",
      "pollution",
      "agricultural-runoff",
      "encroachment"
    ],
    conservationStatus: "Conservation Wetland Reserve",
    hydrologicalData: {
      rechargeRate: 320,
      waterLevel: 1.8,
      seasonalVariation: "perennial",
      source: "mixed",
      drainageArea: 52,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A composite record for the Pampore marshes. Under the validation program, it is dissected into the specific Chatlam, Fashkoori, Manibugh, and Krenchoo sub-records.",
    verificationStatus: "verified",
    createdAt: "2026-01-20T00:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-chatlam",
    slug: "chatlam-wetland",
    name: "Chatlam Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "The largest wetland in the Pampore cluster. Notable for hosting thousands of wintering migratory ducks and nesting resident birds. Fenced to prevent encroachment.",
    district: "Pulwama",
    watershed: "Pampore Watershed",
    area: 2.1,
    elevation: 1585,
    coordinates: {
      lat: 34.02,
      lng: 74.93
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "phragmites-communis",
      "typha-latifolia",
      "salix-alba",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "invasive-species"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.5,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "The largest wetland in the Pampore cluster. Notable for hosting thousands of wintering migratory ducks and nesting resident birds. Fenced to prevent encroachment.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-fashkoori",
    slug: "fashkoori-wetland",
    name: "Fashkoori Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "Located in Pampore town limit. Facing critical urban pollution, sewage inflows, and solid waste dumps.",
    district: "Pulwama",
    watershed: "Pampore Watershed",
    area: 0.14,
    elevation: 1588,
    coordinates: {
      lat: 34.0167,
      lng: 74.925
    },
    waterQuality: {
      pH: 6.8,
      dissolvedOxygen: 3.5,
      turbidity: 18,
      conductivity: 320,
      temperature: 17,
      nitrates: 2.8,
      phosphates: 0.35,
      biologicalOxygenDemand: 5.8,
      totalDissolvedSolids: 280,
      fecalColiform: 680,
      lastTested: "2026-04-15",
      status: "critical",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "ceratophyllum-demersum",
      "typha-latifolia",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment",
      "invasive-species"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.4,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Located in Pampore town limit. Facing critical urban pollution, sewage inflows, and solid waste dumps.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-manibugh",
    slug: "manibugh-wetland",
    name: "Manibugh Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "A peatland and wet meadow habitat. Heavily encroached for paddy cultivation and brick kiln development.",
    district: "Pulwama",
    watershed: "Pampore Watershed",
    area: 1.06,
    elevation: 1584,
    coordinates: {
      lat: 34.025,
      lng: 74.95
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "sparganium-erectum",
      "cyperus-rotundus",
      "phragmites-spp",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.2,
      seasonalVariation: "seasonal",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A peatland and wet meadow habitat. Heavily encroached for paddy cultivation and brick kiln development.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-krenchoo",
    slug: "krenchoo-wetland",
    name: "Krenchoo Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "Smallest wetland in the Pampore group. Primarily supports wading birds and migratory birds during early winter migrations.",
    district: "Pulwama",
    watershed: "Pampore Watershed",
    area: 0.064,
    elevation: 1586,
    coordinates: {
      lat: 34.0083,
      lng: 74.9417
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "carex-spp",
      "scirpus-lacustris",
      "phragmites-spp",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "intermittent",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Smallest wetland in the Pampore group. Primarily supports wading birds and migratory birds during early winter migrations.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-malgam",
    slug: "malgam-wetland",
    name: "Malgam Wetland",
    type: "wetland",
    category: "Unprotected Wetland",
    description: "A severely degraded wetland linked to the Wular basin. Suffers from heavy encroachment by paddy fields and willow plantations.",
    district: "Bandipora",
    watershed: "Wular Lake Basin",
    elevation: 1582,
    coordinates: {
      lat: 34.36,
      lng: 74.63
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "salvinia-natans",
      "phragmites-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Unprotected Wetland",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "mixed",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A severely degraded wetland linked to the Wular basin. Suffers from heavy encroachment by paddy fields and willow plantations.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-trigam",
    slug: "trigam-wetland",
    name: "Trigam Wetland",
    type: "wetland",
    category: "Proposed Conservation Reserve",
    description: "A small perennial marsh near Sumbal, under increasing threat from agricultural pesticide runoff and weed infestation.",
    district: "Bandipora",
    watershed: "Sumbal-Wular Watershed",
    area: 0.85,
    elevation: 1585,
    coordinates: {
      lat: 34.16,
      lng: 74.68
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "phragmites-communis",
      "lemna-minor",
      "azolla-pinnata",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Proposed Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.3,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A small perennial marsh near Sumbal, under increasing threat from agricultural pesticide runoff and weed infestation.",
    verificationStatus: "reviewed",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-wular",
    slug: "wular-wetland",
    name: "Wular Lake Ramsar Site",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "Designated as a Ramsar site in 1990. The largest freshwater lake in South Asia. Critical flood-absorption basin for the Kashmir Valley, supporting thousands of fishermen and millions of migratory birds.",
    district: "Bandipora",
    watershed: "Wular Basin Watershed",
    area: 189,
    elevation: 1575,
    coordinates: {
      lat: 34.4167,
      lng: 74.6333
    },
    waterQuality: {
      pH: 6.8,
      dissolvedOxygen: 3.5,
      turbidity: 18,
      conductivity: 320,
      temperature: 17,
      nitrates: 2.8,
      phosphates: 0.35,
      biologicalOxygenDemand: 5.8,
      totalDissolvedSolids: 280,
      fecalColiform: 680,
      lastTested: "2026-04-15",
      status: "critical",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "trapa-natans",
      "nelumbo-nucifera",
      "phragmites-communis",
      "typha-angustata",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Wildlife Sanctuary & Ramsar Site",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 1.5,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1103",
    nwiaSignificance: "Designated as a Ramsar site in 1990. The largest freshwater lake in South Asia. Critical flood-absorption basin for the Kashmir Valley, supporting thousands of fishermen and millions of migratory birds.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-gharana",
    slug: "gharana-wetland",
    name: "Gharana Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "Notified in 1981. A critical stopover on the Central Asian Flyway. Notable for hosting thousands of migratory bar-headed geese. Located directly on the Indo-Pak border.",
    district: "Jammu",
    watershed: "R.S. Pura Watershed",
    area: 0.75,
    elevation: 280,
    coordinates: {
      lat: 32.5411,
      lng: 74.6909
    },
    waterQuality: {
      pH: 6.8,
      dissolvedOxygen: 3.5,
      turbidity: 18,
      conductivity: 320,
      temperature: 17,
      nitrates: 2.8,
      phosphates: 0.35,
      biologicalOxygenDemand: 5.8,
      totalDissolvedSolids: 280,
      fecalColiform: 680,
      lastTested: "2026-04-15",
      status: "critical",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "typha-latifolia",
      "phragmites-australis",
      "eichhornia-crassipes",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment",
      "invasive-species"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.2,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Notified in 1981. A critical stopover on the Central Asian Flyway. Notable for hosting thousands of migratory bar-headed geese. Located directly on the Indo-Pak border.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-surinsar-mansar",
    slug: "surinsar-mansar-wetland",
    name: "Surinsar-Mansar Lakes Ramsar Site",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "Designated a Ramsar site in 2005. A twin lake system with high religious importance and dense sub-tropical pine forest catchments. Supports rich populations of flapshell turtles and wintering migratory waterfowl.",
    district: "Jammu",
    watershed: "Devika River Watershed",
    area: 3.5,
    elevation: 600,
    coordinates: {
      lat: 32.7,
      lng: 75.15
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "nelumbo-nucifera",
      "trapa-natans",
      "typha-latifolia",
      "phragmites-australis",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Wildlife Sanctuary & Ramsar Site",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 1.5,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1103",
    nwiaSignificance: "Designated a Ramsar site in 2005. A twin lake system with high religious importance and dense sub-tropical pine forest catchments. Supports rich populations of flapshell turtles and wintering migratory waterfowl.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-pargwal",
    slug: "pargwal-wetland",
    name: "Pargwal Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "A dynamic floodplain wetland on the Chenab River, crucial for flood retention. Located near the border (Chicken Neck area).",
    district: "Jammu",
    watershed: "Akhnoor-Chenab Watershed",
    elevation: 295,
    coordinates: {
      lat: 32.83,
      lng: 74.58
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "typha-latifolia",
      "phragmites-spp",
      "saccharum-spontaneum",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "encroachment",
      "siltation"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 1.5,
      seasonalVariation: "seasonal",
      source: "mixed",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A dynamic floodplain wetland on the Chenab River, crucial for flood retention. Located near the border (Chicken Neck area).",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-kukarian",
    slug: "kukarian-wetland",
    name: "Kukarian Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "Notified in 1981. Serves as a vital habitat for resident wetland species and wintering waders.",
    district: "Jammu",
    watershed: "Tawi-Chenab Watershed",
    elevation: 290,
    coordinates: {
      lat: 32.73,
      lng: 74.77
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "typha-latifolia",
      "ipomoea-carnea",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment",
      "invasive-species"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.2,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Notified in 1981. Serves as a vital habitat for resident wetland species and wintering waders.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-sangral",
    slug: "sangral-wetland",
    name: "Sangral-Asa Chak Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "A border wetland complex notified in 1981, providing buffer habitats close to Gharana Wetland.",
    district: "Jammu",
    watershed: "R.S. Pura Watershed",
    elevation: 275,
    coordinates: {
      lat: 32.53,
      lng: 74.77
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "typha-latifolia",
      "phragmites-spp",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "encroachment",
      "invasive-species"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A border wetland complex notified in 1981, providing buffer habitats close to Gharana Wetland.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-nanga",
    slug: "nanga-wetland",
    name: "Nanga Wetland Conservation Reserve",
    type: "wetland",
    category: "Wetland Conservation Reserve",
    description: "A minor protected wetland near Ramgarh. Important local groundwater recharge node.",
    district: "Samba",
    watershed: "Devak-Basantar Watershed",
    elevation: 270,
    coordinates: {
      lat: 32.5,
      lng: 74.96
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "typha-latifolia",
      "cyperus-spp",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "encroachment"
    ],
    conservationStatus: "Wetland Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A minor protected wetland near Ramgarh. Important local groundwater recharge node.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-hanle",
    slug: "hanle-wetland",
    name: "Hanle River Marshes",
    type: "wetland",
    category: "Important Bird Area (IBA) & Wildlife Sanctuary (Proposed)",
    description: "Critical nesting ground for the Globally Threatened Black-necked Crane (Grus nigricollis) and Bar-headed Goose. One of the highest marsh systems in the world.",
    district: "Leh",
    watershed: "Hanle River Watershed",
    area: 54,
    elevation: 4250,
    coordinates: {
      lat: 32.8,
      lng: 79
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "carex-melanantha",
      "kobresia-spp",
      "hippophae-rhamnoides",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Important Bird Area (IBA) & Wildlife Sanctuary (Proposed)",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.2,
      seasonalVariation: "perennial",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Critical nesting ground for the Globally Threatened Black-necked Crane (Grus nigricollis) and Bar-headed Goose. One of the highest marsh systems in the world.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-tsokar",
    slug: "tsokar-wetland",
    name: "Tso Kar Wetland Complex",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "A unique closed basin complex containing Startsapuk Tso (freshwater) and Tso Kar proper (hypersaline). Major breeding ground for Black-necked Cranes and Kiangs.",
    district: "Leh",
    watershed: "Tso Kar Endorheic Basin",
    area: 95,
    elevation: 4530,
    coordinates: {
      lat: 33.3,
      lng: 78.0167
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "puccinellia-himalaica",
      "carex-moorcroftii",
      "triglochin-maritima",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Ramsar Site & Wildlife Sanctuary (Changthang)",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1103",
    nwiaSignificance: "A unique closed basin complex containing Startsapuk Tso (freshwater) and Tso Kar proper (hypersaline). Major breeding ground for Black-necked Cranes and Kiangs.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-tsomoriri",
    slug: "tsomoriri-wetland",
    name: "Tso Moriri Wetland Conservation Reserve",
    type: "wetland",
    category: "Ramsar Wetland",
    description: "Designated Ramsar site in 2002. Supports key populations of bar-headed goose, black-necked crane, and brown-headed gull.",
    district: "Leh",
    watershed: "Tso Moriri Watershed",
    area: 120,
    elevation: 4522,
    coordinates: {
      lat: 32.9,
      lng: 78.3
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "caragana-spp",
      "carex-spp",
      "juncus-himalensis",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Ramsar Site & Conservation Reserve",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 1.5,
      seasonalVariation: "perennial",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "high"
    },
    nwiaCode: "1103",
    nwiaSignificance: "Designated Ramsar site in 2002. Supports key populations of bar-headed goose, black-necked crane, and brown-headed gull.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-chushul",
    slug: "chushul-wetland",
    name: "Chushul Marshes",
    type: "wetland",
    category: "Important Bird Area (IBA)",
    description: "A critical nesting zone for the bar-headed goose and black-necked crane, located along the Line of Actual Control.",
    district: "Leh",
    watershed: "Chushul River Watershed",
    area: 15,
    elevation: 4350,
    coordinates: {
      lat: 33.58,
      lng: 78.75
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "carex-spp",
      "kobresia-pygmaea",
      "hippophae-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Important Bird Area (IBA)",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.2,
      seasonalVariation: "perennial",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A critical nesting zone for the bar-headed goose and black-necked crane, located along the Line of Actual Control.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-puga",
    slug: "puga-wetland",
    name: "Puga Geothermal Wetlands",
    type: "wetland",
    category: "Proposed Biodiversity Heritage Site",
    description: "A highly unusual wetland featuring thermal pools, sulphur deposits, and unique halophytic vegetation. Important winter roost for ruddy shelduck.",
    district: "Leh",
    watershed: "Puga Stream Watershed",
    area: 5.5,
    elevation: 4400,
    coordinates: {
      lat: 33.22,
      lng: 78.35
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "glaux-maritima",
      "taraxacum-officinale",
      "carex-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Proposed Biodiversity Heritage Site",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "high"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A highly unusual wetland featuring thermal pools, sulphur deposits, and unique halophytic vegetation. Important winter roost for ruddy shelduck.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-sheymarshes",
    slug: "sheymarshes-wetland",
    name: "Shey Marshes",
    type: "wetland",
    category: "Important Bird Area (IBA)",
    description: "A rare lower-elevation valley wetland along the Indus, critical for passage migrants. Very popular birdwatching site.",
    district: "Leh",
    watershed: "Leh-Indus Watershed",
    area: 2.5,
    elevation: 3200,
    coordinates: {
      lat: 34.07,
      lng: 77.63
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "typha-minima",
      "hippophae-rhamnoides",
      "salix-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution"
    ],
    conservationStatus: "Important Bird Area (IBA)",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.3,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A rare lower-elevation valley wetland along the Indus, critical for passage migrants. Very popular birdwatching site.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-trishul",
    slug: "trishul-wetland",
    name: "Trishul Marshes",
    type: "wetland",
    category: "Unprotected Wetland",
    description: "A remote wetland situated near the LAC. Visible on Bhuvan satellite imagery as a network of braided channels and marshes.",
    district: "Leh",
    watershed: "Chushul-Pangong Watershed",
    elevation: 4550,
    coordinates: {
      lat: 33.2,
      lng: 78.78
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "carex-spp",
      "juncus-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "siltation"
    ],
    conservationStatus: "Unprotected Wetland",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "high"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A remote wetland situated near the LAC. Visible on Bhuvan satellite imagery as a network of braided channels and marshes.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-gyam",
    slug: "gyam-wetland",
    name: "Gyam Marshes",
    type: "wetland",
    category: "Ramsar Buffer Zone",
    description: "Located at the southern inlet of Tso Moriri. Vital pasture and waterfowl nesting ground. Prone to compaction by grazing.",
    district: "Leh",
    watershed: "Tso Moriri Watershed",
    elevation: 4600,
    coordinates: {
      lat: 32.85,
      lng: 78.38
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "kobresia-schoenoides",
      "carex-microglochin",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Ramsar Buffer Zone",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Located at the southern inlet of Tso Moriri. Vital pasture and waterfowl nesting ground. Prone to compaction by grazing.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-subri",
    slug: "subri-wetland",
    name: "Subri Landslide Wetland",
    type: "wetland",
    category: "Unprotected Wetland",
    description: "Formed in the 1970s by a massive landslide blocking the Jhelum river flow. Serves as a local wetland ecosystem but is rapidly siltising.",
    district: "Muzaffarabad",
    watershed: "Muzaffarabad Watershed",
    area: 1,
    elevation: 650,
    coordinates: {
      lat: 34.33,
      lng: 73.52
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "typha-spp",
      "nelumbo-nucifera",
      "salix-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation"
    ],
    conservationStatus: "Unprotected Wetland",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 2,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Formed in the 1970s by a massive landslide blocking the Jhelum river flow. Serves as a local wetland ecosystem but is rapidly siltising.",
    verificationStatus: "reviewed",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-banjosa",
    slug: "banjosa-wetland",
    name: "Banjosa Wetland Meadows",
    type: "wetland",
    category: "Local Forest Reserve",
    description: "A small pine-ringed artificial/natural wetland system. Primarily valuable for montane forest ecology and ecotourism.",
    district: "Poonch",
    watershed: "Poonch River Watershed",
    area: 0.3,
    elevation: 1981,
    coordinates: {
      lat: 33.81,
      lng: 73.81
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "pinus-wallichiana-fringes",
      "carex-spp",
      "typha-spp",
      "wetland-birds",
      "conserved-flora"
    ],
    threats: [
      "pollution"
    ],
    conservationStatus: "Local Forest Reserve",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 1,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "high"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A small pine-ringed artificial/natural wetland system. Primarily valuable for montane forest ecology and ecotourism.",
    verificationStatus: "reviewed",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-mangla",
    slug: "mangla-wetland",
    name: "Mangla Dam Wetland Complex",
    type: "wetland",
    category: "Game Reserve & Wildlife Sanctuary",
    description: "A major staging and wintering ground for up to 50,000 waterfowl. One of Pakistans largest inland waterbodies.",
    district: "Mirpur",
    watershed: "Jhelum Basin Watershed",
    area: 250,
    elevation: 380,
    coordinates: {
      lat: 33.1421,
      lng: 73.645
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "tamarix-dioica",
      "typha-spp",
      "saccharum-spontaneum",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "pollution",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Game Reserve & Wildlife Sanctuary",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 10,
      seasonalVariation: "perennial",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A major staging and wintering ground for up to 50,000 waterfowl. One of Pakistans largest inland waterbodies.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-baghsar",
    slug: "baghsar-wetland",
    name: "Baghsar Wetland",
    type: "wetland",
    category: "Proposed Wildlife Sanctuary",
    description: "Notable for its water lily cover and historical Mughal fort on the ridge. Major refuge for local waterfowl.",
    district: "Bhimber",
    watershed: "Bhimber-Nullah Watershed",
    area: 0.8,
    elevation: 975,
    coordinates: {
      lat: 32.97,
      lng: 74.12
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "lotus-lily",
      "nelumbo-nucifera",
      "phragmites-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Proposed Wildlife Sanctuary",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 1,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Notable for its water lily cover and historical Mughal fort on the ridge. Major refuge for local waterfowl.",
    verificationStatus: "reviewed",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-deosai",
    slug: "deosai-wetland",
    name: "Deosai National Park Peatlands and Wetlands",
    type: "wetland",
    category: "National Park",
    description: "A sprawling alpine plateau wetland complex. Crucial habitat for the Himalayan Brown Bear and breeding grounds for migratory birds.",
    district: "Astore",
    watershed: "Shigar-Indus Watershed",
    area: 150,
    elevation: 4114,
    coordinates: {
      lat: 35.05,
      lng: 75.45
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "carex-spp",
      "kobresia-spp",
      "alpine-herbs",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "National Park",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A sprawling alpine plateau wetland complex. Crucial habitat for the Himalayan Brown Bear and breeding grounds for migratory birds.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-shandur",
    slug: "shandur-wetland",
    name: "Shandur Pass Wetland Complex",
    type: "wetland",
    category: "Shandur-Handrup National Park",
    description: "Located at the Shandur Pass border. Includes Shandur Lake and surrounding peat meadows. Important grazing and nesting ground.",
    district: "Ghizer",
    watershed: "Ghizer River Watershed",
    area: 10,
    elevation: 3700,
    coordinates: {
      lat: 36.08,
      lng: 72.53
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "carex-stoliczkana",
      "primula-spp",
      "kobresia-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Shandur-Handrup National Park",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.2,
      seasonalVariation: "seasonal",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Located at the Shandur Pass border. Includes Shandur Lake and surrounding peat meadows. Important grazing and nesting ground.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-borith",
    slug: "borith-wetland",
    name: "Borith Lake and Gojal Marshes",
    type: "wetland",
    category: "Community Conservation Area",
    description: "A brackish high-altitude saline wetland, a critical oasis for passage migrants over the Karakoram Range.",
    district: "Hunza",
    watershed: "Hunza River Watershed",
    area: 0.5,
    elevation: 2600,
    coordinates: {
      lat: 36.43,
      lng: 74.86
    },
    waterQuality: {
      pH: 7.1,
      dissolvedOxygen: 5.2,
      turbidity: 11,
      conductivity: 260,
      temperature: 16,
      nitrates: 1.9,
      phosphates: 0.22,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 210,
      fecalColiform: 420,
      lastTested: "2026-04-15",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "phragmites-communis",
      "typha-spp",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation"
    ],
    conservationStatus: "Community Conservation Area",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 1,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "high"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A brackish high-altitude saline wetland, a critical oasis for passage migrants over the Karakoram Range.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-shimshal",
    slug: "shimshal-wetland",
    name: "Shimshal Pamir Alpine Wetlands",
    type: "wetland",
    category: "Khunjerab National Park Zone",
    description: "Located in the remote Shimshal Pamir. Crucial summer pasture and staging wetland for trans-Karakoram migratory birds.",
    district: "Hunza",
    watershed: "Shimshal River Watershed",
    area: 8,
    elevation: 4700,
    coordinates: {
      lat: 36.44,
      lng: 75.63
    },
    waterQuality: {
      pH: 7.7,
      dissolvedOxygen: 7.9,
      turbidity: 4,
      conductivity: 195,
      temperature: 14,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 1.8,
      totalDissolvedSolids: 130,
      fecalColiform: 120,
      lastTested: "2026-04-15",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    biodiversity: [
      "kobresia-spp",
      "carex-pamirensis",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Khunjerab National Park Zone",
    hydrologicalData: {
      rechargeRate: 250,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "glacial",
      drainageArea: 100,
      floodRisk: "high"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Located in the remote Shimshal Pamir. Crucial summer pasture and staging wetland for trans-Karakoram migratory birds.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-ramameadows",
    slug: "ramameadows-wetland",
    name: "Rama Valley Alpine Wetland Meadows",
    type: "wetland",
    category: "Proposed Forest Reserve",
    description: "A beautiful forested alpine wet meadow beneath Nanga Parbat. Facing environmental pressures from expanding tourist kiosks.",
    district: "Astore",
    watershed: "Astore River Watershed",
    area: 1.5,
    elevation: 3150,
    coordinates: {
      lat: 35.37,
      lng: 74.79
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "carex-spp",
      "caltha-palustris",
      "salix-spp",
      "wetland-birds",
      "migratory-waterfowl",
      "conserved-flora"
    ],
    threats: [
      "climate-change"
    ],
    conservationStatus: "Proposed Forest Reserve",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.1,
      seasonalVariation: "seasonal",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A beautiful forested alpine wet meadow beneath Nanga Parbat. Facing environmental pressures from expanding tourist kiosks.",
    verificationStatus: "reviewed",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-naltar",
    slug: "naltar-wetland",
    name: "Naltar Valley Wetlands",
    type: "wetland",
    category: "Wildlife Sanctuary",
    description: "A scenic group of lakes and wet marshes, famous for their dense subaquatic vegetation. Part of Naltar Wildlife Sanctuary.",
    district: "Gilgit",
    watershed: "Naltar Nallah Watershed",
    area: 2.2,
    elevation: 2800,
    coordinates: {
      lat: 36.15,
      lng: 74.18
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 6.8,
      turbidity: 7,
      conductivity: 220,
      temperature: 15,
      nitrates: 1.3,
      phosphates: 0.11,
      biologicalOxygenDemand: 3,
      totalDissolvedSolids: 160,
      fecalColiform: 280,
      lastTested: "2026-04-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    biodiversity: [
      "chara-spp",
      "phragmites-spp",
      "juniperus-spp-fringes",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "siltation"
    ],
    conservationStatus: "Wildlife Sanctuary",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 0.5,
      seasonalVariation: "perennial",
      source: "groundwater",
      drainageArea: 100,
      floodRisk: "low"
    },
    nwiaCode: "1104",
    nwiaSignificance: "A scenic group of lakes and wet marshes, famous for their dense subaquatic vegetation. Part of Naltar Wildlife Sanctuary.",
    verificationStatus: "verified",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  },
  {
    id: "wetland-srinagar-floodplain",
    slug: "srinagar-floodplain-wetland",
    name: "Srinagar Jhelum Floodplain Wetlands",
    type: "wetland",
    category: "Unprotected Wetland Zone",
    description: "Historically large flood-absorption basins (including Rambirgarh, Hokersar buffer channels). Critically reduced, leading to increased flood risks in Srinagar city.",
    district: "Srinagar",
    watershed: "Srinagar Basin Watershed",
    elevation: 1582,
    waterQuality: {
      pH: 6.8,
      dissolvedOxygen: 3.5,
      turbidity: 18,
      conductivity: 320,
      temperature: 17,
      nitrates: 2.8,
      phosphates: 0.35,
      biologicalOxygenDemand: 5.8,
      totalDissolvedSolids: 280,
      fecalColiform: 680,
      lastTested: "2026-04-15",
      status: "critical",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    biodiversity: [
      "phragmites-communis",
      "typha-angustata",
      "wetland-birds",
      "migratory-waterfowl"
    ],
    threats: [
      "pollution",
      "encroachment",
      "siltation",
      "invasive-species"
    ],
    conservationStatus: "Unprotected Wetland Zone",
    hydrologicalData: {
      rechargeRate: 400,
      waterLevel: 1.5,
      seasonalVariation: "seasonal",
      source: "rainfall",
      drainageArea: 100,
      floodRisk: "moderate"
    },
    nwiaCode: "1104",
    nwiaSignificance: "Historically large flood-absorption basins (including Rambirgarh, Hokersar buffer channels). Critically reduced, leading to increased flood risks in Srinagar city.",
    verificationStatus: "under-review",
    createdAt: "2026-06-16T02:00:00Z",
    updatedAt: "2026-06-16T02:00:00Z"
  }
];

// ============================================================================
// RIVERS AND STREAMS DATA
// ============================================================================

export const riversData: WaterEntity[] = [
  {
    "id": "jhelum-river",
    "slug": "jhelum-river",
    "name": "Jhelum River",
    "type": "river",
    "category": "River",
    "description": "Principal river of Kashmir Valley. Lifeline of the region. Flows through Srinagar and connects all major water bodies. Critical for irrigation, fisheries, and hydropower.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 725,
    "elevation": 1850,
    "coordinates": {
      "lat": 33.5322,
      "lng": 75.2515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 7.5,
      "turbidity": 15,
      "conductivity": 245,
      "temperature": 14,
      "nitrates": 1.5,
      "phosphates": 0.12,
      "biologicalOxygenDemand": 3.8,
      "totalDissolvedSolids": 178,
      "fecalColiform": 650,
      "lastTested": "2026-03-20",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "declining",
        "turbidity": "declining"
      }
    },
    "biodiversity": [
      "snow-trout",
      "common-carp",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "flow-regulation",
      "climate-change",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "flowRate": 345,
      "discharge": 28500,
      "waterLevel": 5.8,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 33000,
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-river",
    "slug": "lidder-river",
    "name": "Lidder River",
    "type": "river",
    "category": "Tributary",
    "description": "Important tributary of Jhelum. Flows through Lidder Valley. Popular for trout fishing and rafting. Critical for irrigation in Anantnag.",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "length": 73,
    "elevation": 4650,
    "coordinates": {
      "lat": 34.1367,
      "lng": 75.3855
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8,
      "turbidity": 8,
      "conductivity": 175,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 128,
      "fecalColiform": 180,
      "lastTested": "2026-03-17",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "brown-trout",
      "rainbow-trout",
      "snow-trout",
      "riverine-birds",
      "schizothorax",
      "aquatic-plants"
    ],
    "threats": [
      "tourism-pressure",
      "pollution",
      "overfishing",
      "climate-change",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "flowRate": 45,
      "discharge": 1420,
      "waterLevel": 3.5,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 1250,
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-08T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-river",
    "slug": "sind-river",
    "name": "Sind River",
    "type": "river",
    "category": "Tributary",
    "description": "Largest tributary of Jhelum in Kashmir. Drains much of central Kashmir. Important for irrigation and hydropower.",
    "district": "Multiple",
    "watershed": "Sind Basin",
    "length": 108,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.2818,
      "lng": 75.4805
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 7.8,
      "turbidity": 10,
      "conductivity": 195,
      "temperature": 13,
      "nitrates": 1,
      "phosphates": 0.08,
      "biologicalOxygenDemand": 2.6,
      "totalDissolvedSolids": 142,
      "fecalColiform": 280,
      "lastTested": "2026-03-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "common-carp",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "encroachment",
      "hydropower-development",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "flowRate": 85,
      "discharge": 2680,
      "waterLevel": 4,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 2850,
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-10T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "veshaw-river",
    "slug": "veshaw-river",
    "name": "Veshaw River",
    "type": "river",
    "category": "Tributary",
    "description": "Tributary in Kulgam and Shopian districts. Important for irrigation in southern Kashmir.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 52,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.5135,
      "lng": 74.8258
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 7.3,
      "turbidity": 14,
      "conductivity": 215,
      "temperature": 14,
      "nitrates": 1.4,
      "phosphates": 0.11,
      "biologicalOxygenDemand": 3.2,
      "totalDissolvedSolids": 158,
      "fecalColiform": 380,
      "lastTested": "2026-03-12",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "declining",
        "turbidity": "declining"
      }
    },
    "biodiversity": [
      "common-carp",
      "grass-carp",
      "riverine-birds",
      "snow-trout",
      "schizothorax",
      "aquatic-plants"
    ],
    "threats": [
      "agricultural-runoff",
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "flowRate": 22,
      "discharge": 694,
      "waterLevel": 3,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 580,
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-18T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-rambiara",
    "slug": "rambiara-river",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 58,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "romshi-stream",
    "slug": "romshi-stream",
    "name": "Romshi Stream",
    "type": "stream",
    "category": "Tributary",
    "description": "Mountain stream in Ganderbal district. Cold-water stream with high oxygen content. Supports trout populations.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 51,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.7125,
      "lng": 74.6548
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 9.2,
      "turbidity": 4,
      "conductivity": 145,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.03,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 95,
      "fecalColiform": 45,
      "lastTested": "2026-03-10",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "brown-trout",
      "rainbow-trout",
      "snow-trout",
      "alpine-flora",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change",
      "grazing-pressure",
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "flowRate": 3.5,
      "discharge": 110,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 85,
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-20T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doodhganga",
    "slug": "doodhganga-river",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 46,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-pohru",
    "slug": "pohru-river",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla.",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "length": 56,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bringi-river",
    "slug": "bringi-river",
    "name": "Bringi River",
    "type": "river",
    "category": "Tributary",
    "description": "Tributary in Anantnag district. Supports local agriculture and biodiversity.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 38,
    "elevation": 3600,
    "coordinates": {
      "lat": 33.5782,
      "lng": 75.3214
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 7.6,
      "turbidity": 10,
      "conductivity": 198,
      "temperature": 13,
      "nitrates": 1.1,
      "phosphates": 0.08,
      "biologicalOxygenDemand": 2.5,
      "totalDissolvedSolids": 145,
      "fecalColiform": 280,
      "lastTested": "2026-03-13",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "common-carp",
      "riverine-birds",
      "schizothorax",
      "aquatic-plants"
    ],
    "threats": [
      "agricultural-runoff",
      "pollution",
      "grazing-pressure",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "flowRate": 15,
      "discharge": 473,
      "waterLevel": 2.5,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 420,
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-15T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "arapath-stream",
    "slug": "arapath-stream",
    "name": "Arapath Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Cold-water stream in Anantnag. Important tributary for Lidder River. Supports aquatic biodiversity.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 22,
    "elevation": 2900,
    "coordinates": {
      "lat": 33.7082,
      "lng": 75.2815
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.8,
      "turbidity": 5,
      "conductivity": 155,
      "temperature": 11,
      "nitrates": 0.6,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.8,
      "totalDissolvedSolids": 105,
      "fecalColiform": 65,
      "lastTested": "2026-03-11",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "brown-trout",
      "snow-trout",
      "alpine-flora",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "grazing-pressure",
      "climate-change"
    ],
    "hydrologicalData": {
      "flowRate": 2.8,
      "discharge": 88,
      "waterLevel": 1,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 65,
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-22T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-madhumati",
    "slug": "madhumati-stream",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 38,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-erin",
    "slug": "erin-stream",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 32,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sandran",
    "slug": "sandran-river",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ningli",
    "slug": "ningli-stream",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 36,
    "elevation": 3840,
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shaliganga",
    "slug": "shaliganga-stream",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort.",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "length": 32,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 45,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sukhnag",
    "slug": "sukhnag-river",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 52,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 3.5,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 1.2,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 1590,
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-chenab",
    "slug": "chenab-river",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 960,
    "elevation": 2280,
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tawi",
    "slug": "tawi-river",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks.",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "length": 141,
    "elevation": 4000,
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ravi",
    "slug": "ravi-river",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 720,
    "elevation": 4200,
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ujh",
    "slug": "ujh-river",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 65,
    "elevation": 3200,
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-basantar",
    "slug": "basantar-river",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971).",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "length": 48,
    "elevation": 1200,
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-munawartawi",
    "slug": "munawar-tawi",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 110,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ans",
    "slug": "ans-river",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 62,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-marusudar",
    "slug": "marusudar-river",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "length": 133,
    "elevation": 5100,
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-devak",
    "slug": "devak-river",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP).",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "length": 55,
    "elevation": 1600,
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neeru",
    "slug": "neeru-nallah",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course.",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "length": 30,
    "elevation": 3900,
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "indus-river",
    "slug": "indus-river",
    "name": "Indus River (Ladakh Section)",
    "type": "river",
    "category": "River",
    "description": "One of the longest rivers in Asia. Flows through Ladakh region. Critical for irrigation and hydropower. Sacred river with high cultural significance.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 3180,
    "elevation": 5400,
    "coordinates": {
      "lat": 31.2505,
      "lng": 81.3322
    },
    "waterQuality": {
      "pH": 7.8,
      "dissolvedOxygen": 8.5,
      "turbidity": 8,
      "conductivity": 185,
      "temperature": 10,
      "nitrates": 0.6,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.8,
      "totalDissolvedSolids": 125,
      "fecalColiform": 85,
      "lastTested": "2026-03-18",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "alpine-flora",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change",
      "glacial-retreat",
      "hydropower-development",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "flowRate": 6200,
      "discharge": 195000,
      "waterLevel": 8.5,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 1120000,
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-zanskar",
    "slug": "zanskar-river",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 3700,
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shyok",
    "slug": "shyok-river",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 550,
    "elevation": 5300,
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-nubra",
    "slug": "nubra-river",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5400,
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-suru",
    "slug": "suru-river",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 185,
    "elevation": 4400,
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-dras",
    "slug": "dras-river",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 86,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-galwan",
    "slug": "galwan-river",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5200,
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 125,
    "elevation": 5500,
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hanle",
    "slug": "hanle-river",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 92,
    "elevation": 4800,
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doda",
    "slug": "doda-river",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 79,
    "elevation": 4450,
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tsarap",
    "slug": "tsarap-river",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 182,
    "elevation": 4950,
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 725,
    "elevation": 1000,
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neelum",
    "slug": "neelum-river",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence.",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "length": 245,
    "elevation": 2400,
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-poonch",
    "slug": "poonch-river",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat.",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "length": 150,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-kunhar",
    "slug": "kunhar-river",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin.",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "length": 166,
    "elevation": 3405,
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-shounter",
    "slug": "shounter-nallah",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 26,
    "elevation": 4200,
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 14,
    "elevation": 4350,
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "elevation": 3800,
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 3180,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hunza",
    "slug": "hunza-river",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 190,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-gilgit",
    "slug": "gilgit-river",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 240,
    "elevation": 3730,
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shigar",
    "slug": "shigar-river",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers.",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "length": 62,
    "elevation": 3100,
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-astore",
    "slug": "astore-river",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau.",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hispar",
    "slug": "hispar-river",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 48,
    "elevation": 4300,
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shimshal",
    "slug": "shimshal-river",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 82,
    "elevation": 4730,
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-rambiara",
    "slug": "rambiara-river",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 58,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doodhganga",
    "slug": "doodhganga-river",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 46,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-pohru",
    "slug": "pohru-river",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla.",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "length": 56,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-madhumati",
    "slug": "madhumati-stream",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 38,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-erin",
    "slug": "erin-stream",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 32,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sandran",
    "slug": "sandran-river",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ningli",
    "slug": "ningli-stream",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 36,
    "elevation": 3840,
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shaliganga",
    "slug": "shaliganga-stream",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort.",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "length": 32,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 45,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sukhnag",
    "slug": "sukhnag-river",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 52,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 3.5,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 1.2,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 1590,
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-chenab",
    "slug": "chenab-river",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 960,
    "elevation": 2280,
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tawi",
    "slug": "tawi-river",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks.",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "length": 141,
    "elevation": 4000,
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ravi",
    "slug": "ravi-river",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 720,
    "elevation": 4200,
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ujh",
    "slug": "ujh-river",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 65,
    "elevation": 3200,
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-basantar",
    "slug": "basantar-river",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971).",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "length": 48,
    "elevation": 1200,
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-munawartawi",
    "slug": "munawar-tawi",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 110,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ans",
    "slug": "ans-river",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 62,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-marusudar",
    "slug": "marusudar-river",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "length": 133,
    "elevation": 5100,
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-devak",
    "slug": "devak-river",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP).",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "length": 55,
    "elevation": 1600,
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neeru",
    "slug": "neeru-nallah",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course.",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "length": 30,
    "elevation": 3900,
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-zanskar",
    "slug": "zanskar-river",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 3700,
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shyok",
    "slug": "shyok-river",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 550,
    "elevation": 5300,
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-nubra",
    "slug": "nubra-river",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5400,
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-suru",
    "slug": "suru-river",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 185,
    "elevation": 4400,
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-dras",
    "slug": "dras-river",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 86,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-galwan",
    "slug": "galwan-river",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5200,
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 125,
    "elevation": 5500,
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hanle",
    "slug": "hanle-river",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 92,
    "elevation": 4800,
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doda",
    "slug": "doda-river",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 79,
    "elevation": 4450,
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tsarap",
    "slug": "tsarap-river",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 182,
    "elevation": 4950,
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 725,
    "elevation": 1000,
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neelum",
    "slug": "neelum-river",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence.",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "length": 245,
    "elevation": 2400,
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-poonch",
    "slug": "poonch-river",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat.",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "length": 150,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-kunhar",
    "slug": "kunhar-river",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin.",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "length": 166,
    "elevation": 3405,
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-shounter",
    "slug": "shounter-nallah",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 26,
    "elevation": 4200,
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 14,
    "elevation": 4350,
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "elevation": 3800,
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 3180,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hunza",
    "slug": "hunza-river",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 190,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-gilgit",
    "slug": "gilgit-river",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 240,
    "elevation": 3730,
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shigar",
    "slug": "shigar-river",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers.",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "length": 62,
    "elevation": 3100,
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-astore",
    "slug": "astore-river",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau.",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hispar",
    "slug": "hispar-river",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 48,
    "elevation": 4300,
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shimshal",
    "slug": "shimshal-river",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 82,
    "elevation": 4730,
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-rambiara",
    "slug": "rambiara-river",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 58,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doodhganga",
    "slug": "doodhganga-river",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 46,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-pohru",
    "slug": "pohru-river",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla.",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "length": 56,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-madhumati",
    "slug": "madhumati-stream",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 38,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-erin",
    "slug": "erin-stream",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 32,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sandran",
    "slug": "sandran-river",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ningli",
    "slug": "ningli-stream",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 36,
    "elevation": 3840,
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shaliganga",
    "slug": "shaliganga-stream",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort.",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "length": 32,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 45,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sukhnag",
    "slug": "sukhnag-river",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 52,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 3.5,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 1.2,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 1590,
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-chenab",
    "slug": "chenab-river",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 960,
    "elevation": 2280,
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tawi",
    "slug": "tawi-river",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks.",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "length": 141,
    "elevation": 4000,
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ravi",
    "slug": "ravi-river",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 720,
    "elevation": 4200,
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ujh",
    "slug": "ujh-river",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 65,
    "elevation": 3200,
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-basantar",
    "slug": "basantar-river",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971).",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "length": 48,
    "elevation": 1200,
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-munawartawi",
    "slug": "munawar-tawi",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 110,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ans",
    "slug": "ans-river",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 62,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-marusudar",
    "slug": "marusudar-river",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "length": 133,
    "elevation": 5100,
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-devak",
    "slug": "devak-river",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP).",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "length": 55,
    "elevation": 1600,
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neeru",
    "slug": "neeru-nallah",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course.",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "length": 30,
    "elevation": 3900,
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-zanskar",
    "slug": "zanskar-river",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 3700,
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shyok",
    "slug": "shyok-river",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 550,
    "elevation": 5300,
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-nubra",
    "slug": "nubra-river",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5400,
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-suru",
    "slug": "suru-river",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 185,
    "elevation": 4400,
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-dras",
    "slug": "dras-river",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 86,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-galwan",
    "slug": "galwan-river",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5200,
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 125,
    "elevation": 5500,
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hanle",
    "slug": "hanle-river",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 92,
    "elevation": 4800,
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doda",
    "slug": "doda-river",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 79,
    "elevation": 4450,
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tsarap",
    "slug": "tsarap-river",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 182,
    "elevation": 4950,
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 725,
    "elevation": 1000,
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neelum",
    "slug": "neelum-river",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence.",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "length": 245,
    "elevation": 2400,
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-poonch",
    "slug": "poonch-river",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat.",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "length": 150,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-kunhar",
    "slug": "kunhar-river",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin.",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "length": 166,
    "elevation": 3405,
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-shounter",
    "slug": "shounter-nallah",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 26,
    "elevation": 4200,
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 14,
    "elevation": 4350,
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "elevation": 3800,
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 3180,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hunza",
    "slug": "hunza-river",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 190,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-gilgit",
    "slug": "gilgit-river",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 240,
    "elevation": 3730,
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shigar",
    "slug": "shigar-river",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers.",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "length": 62,
    "elevation": 3100,
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-astore",
    "slug": "astore-river",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau.",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hispar",
    "slug": "hispar-river",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 48,
    "elevation": 4300,
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shimshal",
    "slug": "shimshal-river",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 82,
    "elevation": 4730,
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-rambiara",
    "slug": "rambiara-river",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 58,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doodhganga",
    "slug": "doodhganga-river",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 46,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-pohru",
    "slug": "pohru-river",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla.",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "length": 56,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-madhumati",
    "slug": "madhumati-stream",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 38,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-erin",
    "slug": "erin-stream",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 32,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sandran",
    "slug": "sandran-river",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ningli",
    "slug": "ningli-stream",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 36,
    "elevation": 3840,
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shaliganga",
    "slug": "shaliganga-stream",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort.",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "length": 32,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 45,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sukhnag",
    "slug": "sukhnag-river",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 52,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 3.5,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 1.2,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 1590,
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-chenab",
    "slug": "chenab-river",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 960,
    "elevation": 2280,
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tawi",
    "slug": "tawi-river",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks.",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "length": 141,
    "elevation": 4000,
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ravi",
    "slug": "ravi-river",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 720,
    "elevation": 4200,
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ujh",
    "slug": "ujh-river",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 65,
    "elevation": 3200,
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-basantar",
    "slug": "basantar-river",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971).",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "length": 48,
    "elevation": 1200,
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-munawartawi",
    "slug": "munawar-tawi",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 110,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ans",
    "slug": "ans-river",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 62,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-marusudar",
    "slug": "marusudar-river",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "length": 133,
    "elevation": 5100,
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-devak",
    "slug": "devak-river",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP).",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "length": 55,
    "elevation": 1600,
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neeru",
    "slug": "neeru-nallah",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course.",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "length": 30,
    "elevation": 3900,
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-zanskar",
    "slug": "zanskar-river",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 3700,
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shyok",
    "slug": "shyok-river",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 550,
    "elevation": 5300,
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-nubra",
    "slug": "nubra-river",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5400,
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-suru",
    "slug": "suru-river",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 185,
    "elevation": 4400,
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-dras",
    "slug": "dras-river",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 86,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-galwan",
    "slug": "galwan-river",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5200,
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 125,
    "elevation": 5500,
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hanle",
    "slug": "hanle-river",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 92,
    "elevation": 4800,
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doda",
    "slug": "doda-river",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 79,
    "elevation": 4450,
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tsarap",
    "slug": "tsarap-river",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 182,
    "elevation": 4950,
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 725,
    "elevation": 1000,
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neelum",
    "slug": "neelum-river",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence.",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "length": 245,
    "elevation": 2400,
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-poonch",
    "slug": "poonch-river",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat.",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "length": 150,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-kunhar",
    "slug": "kunhar-river",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin.",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "length": 166,
    "elevation": 3405,
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-shounter",
    "slug": "shounter-nallah",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 26,
    "elevation": 4200,
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 14,
    "elevation": 4350,
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "elevation": 3800,
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 3180,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hunza",
    "slug": "hunza-river",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 190,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-gilgit",
    "slug": "gilgit-river",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 240,
    "elevation": 3730,
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shigar",
    "slug": "shigar-river",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers.",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "length": 62,
    "elevation": 3100,
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-astore",
    "slug": "astore-river",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau.",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hispar",
    "slug": "hispar-river",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 48,
    "elevation": 4300,
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shimshal",
    "slug": "shimshal-river",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 82,
    "elevation": 4730,
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-rambiara",
    "slug": "rambiara-river",
    "name": "Rambiara River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major mountain stream that dries up significantly in the autumn but is highly prone to sudden, severe summer flash floods.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 58,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.5855,
      "lng": 74.5218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doodhganga",
    "slug": "doodhganga-river",
    "name": "Doodhganga River",
    "type": "stream",
    "category": "Tributary",
    "description": "Its name literally means \"River of Milk\" due to its frothy white flow in high elevations. Now highly degraded downstream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 46,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.7842,
      "lng": 74.5518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-pohru",
    "slug": "pohru-river",
    "name": "Pohru River",
    "type": "stream",
    "category": "Tributary",
    "description": "Brings immense silt load to the Jhelum River, which has significantly choked the Jhelum outflow channel near Baramulla.",
    "district": "Multiple",
    "watershed": "Pohru Basin",
    "length": 56,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.4315,
      "lng": 74.2818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-madhumati",
    "slug": "madhumati-stream",
    "name": "Madhumati Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A glacier-fed stream with significant flow throughout the year, especially during summer snowmelt.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 38,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.4518,
      "lng": 74.8815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-erin",
    "slug": "erin-stream",
    "name": "Erin Stream",
    "type": "stream",
    "category": "Stream",
    "description": "A major source of freshwater for Wular Lake. Very sensitive alpine catchment.",
    "district": "Bandipora",
    "watershed": "Wular Lake Catchment",
    "length": 32,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.4358,
      "lng": 74.9215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sandran",
    "slug": "sandran-river",
    "name": "Sandran River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows parallel to the Srinagar-Jammu National Highway (NH 44). Highly dynamic riverbed shifting.",
    "district": "Anantnag",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.5518,
      "lng": 75.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ningli",
    "slug": "ningli-stream",
    "name": "Ningli Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Originates from a high alpine glacial lake at the base of Apharwat peak.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 36,
    "elevation": 3840,
    "coordinates": {
      "lat": 34.0255,
      "lng": 74.3518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shaliganga",
    "slug": "shaliganga-stream",
    "name": "Shaliganga Stream",
    "type": "stream",
    "category": "Stream",
    "description": "Flows through the beautiful meadows of Doodhpathri tourist resort.",
    "district": "Budgam",
    "watershed": "Jhelum River Basin Catchment",
    "length": 32,
    "elevation": 4100,
    "coordinates": {
      "lat": 33.8815,
      "lng": 74.5242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ferozpora",
    "slug": "ferozpora-nallah",
    "name": "Ferozpora Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A trout-bearing stream in its upper reaches. Forms a vital hydrological connection to the Mirgund wetland.",
    "district": "Baramulla",
    "watershed": "Jhelum River Basin Catchment",
    "length": 45,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.0682,
      "lng": 74.3215
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-sukhnag",
    "slug": "sukhnag-river",
    "name": "Sukhnag River",
    "type": "stream",
    "category": "Tributary",
    "description": "Known for its beautiful waterfalls (Sukhnag waterfall) in upper reaches. Excellent sport fishing stream.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 52,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.9215,
      "lng": 74.4542
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-tsuntkol",
    "slug": "tsunt-kol",
    "name": "Tsunt Kol",
    "type": "stream",
    "category": "Urban Stream",
    "description": "A historical urban loop channel regulating the water levels of Dal Lake. Heavily encroached.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 3.5,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0855,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "stream-braricumb",
    "slug": "brari-nambal-cut",
    "name": "Brari Nambal Cut",
    "type": "stream",
    "category": "Drainage Channel",
    "description": "Crucial for flushing Brari Nambal lagoon. Restoring this channel is vital to save the lagoon from complete eutrophication.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "length": 1.2,
    "elevation": 1583,
    "coordinates": {
      "lat": 34.0982,
      "lng": 74.8155
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "channel-srinagarflood",
    "slug": "srinagar-flood-spill-channel",
    "name": "Srinagar Flood Spill Channel",
    "type": "stream",
    "category": "Flood Channel",
    "description": "Designed during the early 20th century to divert excess floodwaters of Jhelum away from Srinagar city.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 42,
    "elevation": 1590,
    "coordinates": {
      "lat": 33.9115,
      "lng": 75.0118
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-chenab",
    "slug": "chenab-river",
    "name": "Chenab River",
    "type": "river",
    "category": "River",
    "description": "One of the primary rivers of the Indus Water Treaty. Carries massive silt loads from glacial erosion in Kishtwar.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 960,
    "elevation": 2280,
    "coordinates": {
      "lat": 32.5714,
      "lng": 76.9728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tawi",
    "slug": "tawi-river",
    "name": "Tawi River",
    "type": "stream",
    "category": "Tributary",
    "description": "Regarded as a sacred river (Surya Putri) by locals. The Tawi riverfront project is undergoing construction to restore banks.",
    "district": "Multiple",
    "watershed": "Tawi Basin",
    "length": 141,
    "elevation": 4000,
    "coordinates": {
      "lat": 32.8815,
      "lng": 75.7742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ravi",
    "slug": "ravi-river",
    "name": "Ravi River",
    "type": "river",
    "category": "River",
    "description": "Serves as the international border between India and Pakistan along several stretches in Kathua.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 720,
    "elevation": 4200,
    "coordinates": {
      "lat": 32.3218,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ujh",
    "slug": "ujh-river",
    "name": "Ujh River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major flash-flood-prone river in Kathua district. Flows through steep gorges in upper reaches.",
    "district": "Kathua",
    "watershed": "Ravi Basin Catchment",
    "length": 65,
    "elevation": 3200,
    "coordinates": {
      "lat": 32.8518,
      "lng": 75.6842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-basantar",
    "slug": "basantar-river",
    "name": "Basantar River",
    "type": "stream",
    "category": "Stream",
    "description": "A major seasonal river in the Samba district. Historical battle site (Battle of Basantar, 1971).",
    "district": "Samba",
    "watershed": "Ravi Basin Catchment",
    "length": 48,
    "elevation": 1200,
    "coordinates": {
      "lat": 32.7215,
      "lng": 75.1842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-munawartawi",
    "slug": "munawar-tawi",
    "name": "Munawar Tawi",
    "type": "stream",
    "category": "Tributary",
    "description": "A major left-bank tributary of the Chenab. Crosses the Line of Control into Pakistan-administered territory before joining the Chenab.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 110,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.4815,
      "lng": 74.3242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-ans",
    "slug": "ans-river",
    "name": "Ans River",
    "type": "stream",
    "category": "Tributary",
    "description": "An important right-bank tributary of the Chenab River. Flows through a deep, rugged mountainous valley.",
    "district": "Multiple",
    "watershed": "Chenab Basin Catchment",
    "length": 62,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.3755,
      "lng": 74.6218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-marusudar",
    "slug": "marusudar-river",
    "name": "Marusudar River",
    "type": "stream",
    "category": "Tributary",
    "description": "The largest tributary of the Chenab River. Flows through the beautiful valleys of Warwan and Marwah.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin Catchment",
    "length": 133,
    "elevation": 5100,
    "coordinates": {
      "lat": 33.8542,
      "lng": 75.9218
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-devak",
    "slug": "devak-river",
    "name": "Devak River",
    "type": "stream",
    "category": "Stream",
    "description": "Revered as the elder sister of River Ganga. Undergoing restoration under the National River Conservation Plan (NRCP).",
    "district": "Multiple",
    "watershed": "Ravi Basin Catchment",
    "length": 55,
    "elevation": 1600,
    "coordinates": {
      "lat": 32.9315,
      "lng": 75.1742
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining"
    ],
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neeru",
    "slug": "neeru-nallah",
    "name": "Neeru Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "A major trout-rich stream in the Jammu division. Extremely scenic alpine course.",
    "district": "Doda",
    "watershed": "Chenab Basin Catchment",
    "length": 30,
    "elevation": 3900,
    "coordinates": {
      "lat": 32.8715,
      "lng": 75.6518
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-zanskar",
    "slug": "zanskar-river",
    "name": "Zanskar River",
    "type": "stream",
    "category": "Tributary",
    "description": "Famous for the winter \"Chadar Trek\" where hikers walk on the frozen ice riverbed. Highly glaciated basin.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 3700,
    "coordinates": {
      "lat": 33.4755,
      "lng": 76.8818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shyok",
    "slug": "shyok-river",
    "name": "Shyok River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major transboundary river originating near the Line of Actual Control (LAC). Historic trade route river.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 550,
    "elevation": 5300,
    "coordinates": {
      "lat": 35.2215,
      "lng": 77.6328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-nubra",
    "slug": "nubra-river",
    "name": "Nubra River",
    "type": "stream",
    "category": "Tributary",
    "description": "Fed entirely by the melting waters of the Siachen Glacier. Known for thermal springs along its banks (Panamik).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5400,
    "coordinates": {
      "lat": 35.5342,
      "lng": 77.0515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-suru",
    "slug": "suru-river",
    "name": "Suru River",
    "type": "stream",
    "category": "Tributary",
    "description": "A key river defining the geography of Kargil. Encircles the Nun Kun mountain massif.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 185,
    "elevation": 4400,
    "coordinates": {
      "lat": 33.9818,
      "lng": 76.3815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-dras",
    "slug": "dras-river",
    "name": "Dras River",
    "type": "stream",
    "category": "Tributary",
    "description": "Flows through the second coldest inhabited place in the world. Merges with Shingo River near the Line of Control.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 86,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.2542,
      "lng": 75.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-galwan",
    "slug": "galwan-river",
    "name": "Galwan River",
    "type": "stream",
    "category": "Stream",
    "description": "A major geopolitical site. Flow is fast and cold, draining the high Aksai Chin plateau.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 80,
    "elevation": 5200,
    "coordinates": {
      "lat": 34.7818,
      "lng": 78.8828
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-changchenmo",
    "slug": "chang-chenmo-river",
    "name": "Chang Chenmo River",
    "type": "stream",
    "category": "Stream",
    "description": "Geopolitically sensitive transboundary stream near the Line of Actual Control (LAC).",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 125,
    "elevation": 5500,
    "coordinates": {
      "lat": 34.3315,
      "lng": 79.1728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hanle",
    "slug": "hanle-river",
    "name": "Hanle River",
    "type": "stream",
    "category": "Stream",
    "description": "A major high-altitude wetland corridor supporting endangered Himalayan avifauna. Dark Sky Reserve zone.",
    "district": "Leh",
    "watershed": "Indus Basin Catchment",
    "length": 92,
    "elevation": 4800,
    "coordinates": {
      "lat": 32.6518,
      "lng": 79.0342
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "moderate"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-doda",
    "slug": "doda-river",
    "name": "Doda River",
    "type": "stream",
    "category": "Tributary",
    "description": "Forms the main hydrological source of the Padum valley in Zanskar. Fed by the largest glacier in Ladakh accessible by road.",
    "district": "Kargil",
    "watershed": "Indus Basin Catchment",
    "length": 79,
    "elevation": 4450,
    "coordinates": {
      "lat": 33.9515,
      "lng": 76.4328
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-tsarap",
    "slug": "tsarap-river",
    "name": "Tsarap River",
    "type": "stream",
    "category": "Tributary",
    "description": "A wildly turbulent river that flows beneath the famous cliff-side Phuktal Monastery. Landslide block in 2015 formed a 15km lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 182,
    "elevation": 4950,
    "coordinates": {
      "lat": 32.8855,
      "lng": 77.3718
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-jhelum-ajk",
    "slug": "jhelum-river-ajk-section",
    "name": "Jhelum River (AJK Section)",
    "type": "river",
    "category": "River",
    "description": "The diversion of water for the Neelum-Jhelum project has significantly reduced the flow through Muzaffarabad city, causing environmental concerns.",
    "district": "Multiple",
    "watershed": "Jhelum River Basin Catchment",
    "length": 725,
    "elevation": 1000,
    "coordinates": {
      "lat": 34.1142,
      "lng": 73.8825
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "encroachment",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-neelum",
    "slug": "neelum-river",
    "name": "Neelum River",
    "type": "river",
    "category": "River",
    "description": "A major transboundary river. Known as Kishanganga in India and Neelum in Pakistan. Domel is a major geographical confluence.",
    "district": "Multiple",
    "watershed": "Kishanganga Basin",
    "length": 245,
    "elevation": 2400,
    "coordinates": {
      "lat": 34.6182,
      "lng": 74.4015
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-poonch",
    "slug": "poonch-river",
    "name": "Poonch River",
    "type": "stream",
    "category": "Tributary",
    "description": "The Poonch River National Park is the first aquatic protected area in AJK. Illegal sand mining remains a severe threat.",
    "district": "Multiple",
    "watershed": "Poonch Basin",
    "length": 150,
    "elevation": 3500,
    "coordinates": {
      "lat": 33.7655,
      "lng": 74.0818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-kunhar",
    "slug": "kunhar-river",
    "name": "Kunhar River",
    "type": "river",
    "category": "River",
    "description": "A major source of cold water for the Jhelum River. Famous for the legendary love story of Saif-ul-Muluk linked to the basin.",
    "district": "Muzaffarabad",
    "watershed": "Jhelum River Basin Catchment",
    "length": 166,
    "elevation": 3405,
    "coordinates": {
      "lat": 35.0833,
      "lng": 74.0255
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-shounter",
    "slug": "shounter-nallah",
    "name": "Shounter Nallah",
    "type": "stream",
    "category": "Nallah",
    "description": "Flows through the highly scenic Shounter Valley. Lacks official gauged monitoring station. Mouth confluence coordinates are approximate.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 26,
    "elevation": 4200,
    "coordinates": {
      "lat": 34.9655,
      "lng": 74.3728
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-chittakatha",
    "slug": "chitta-katha-nallah",
    "name": "Chitta Katha Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "Drains the holy alpine lake Chitta Katha. High altitude and rough terrain prevent physical gauging stations.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "length": 14,
    "elevation": 4350,
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nallah-dudipat",
    "slug": "dudipat-nallah",
    "name": "Dudipat Nallah",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A rugged mountain stream. Closed during winter due to heavy snow blockages.",
    "district": "Neelum",
    "watershed": "Kishanganga Basin",
    "elevation": 3800,
    "coordinates": {
      "lat": 35.0118,
      "lng": 74.0903
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "high"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-indus-gb",
    "slug": "upper-indus-river-gb-section",
    "name": "Upper Indus River (GB Section)",
    "type": "river",
    "category": "River",
    "description": "Flows through deep gorges in Karakoram and Hindu Kush ranges. Extremely high sediment load due to Karakoram tectonic activity.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 3180,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.5015,
      "lng": 76.2258
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hunza",
    "slug": "hunza-river",
    "name": "Hunza River",
    "type": "river",
    "category": "River",
    "description": "A major Karakoram river. The 2010 landslide at Attabad blocked the river to create the 21km long Attabad Lake.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 190,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.7518,
      "lng": 74.8842
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-gilgit",
    "slug": "gilgit-river",
    "name": "Gilgit River",
    "type": "river",
    "category": "River",
    "description": "A major glacier and spring-fed river. Known as Ghizer River in its upper western reaches.",
    "district": "Multiple",
    "watershed": "Indus Basin Catchment",
    "length": 240,
    "elevation": 3730,
    "coordinates": {
      "lat": 36.0842,
      "lng": 72.5815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "pollution",
      "sand-mining",
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shigar",
    "slug": "shigar-river",
    "name": "Shigar River",
    "type": "stream",
    "category": "Tributary",
    "description": "A major glacier-fed tributary. Formed by the drainage of Baltoro and Biafo glaciers, two of the longest non-polar glaciers.",
    "district": "Shigar",
    "watershed": "Indus Basin Catchment",
    "length": 62,
    "elevation": 3100,
    "coordinates": {
      "lat": 35.6815,
      "lng": 75.7242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-astore",
    "slug": "astore-river",
    "name": "Astore River",
    "type": "stream",
    "category": "Tributary",
    "description": "Drains the eastern slopes of Nanga Parbat and the high Deosai plateau.",
    "district": "Astore",
    "watershed": "Indus Basin Catchment",
    "length": 120,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.9015,
      "lng": 75.1242
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-hispar",
    "slug": "hispar-river",
    "name": "Hispar River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A classic glacier-fed mountain torrent. Flows through a deep, unstable valley carved by the Hispar glacier.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 48,
    "elevation": 4300,
    "coordinates": {
      "lat": 36.1215,
      "lng": 74.9818
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "river-shimshal",
    "slug": "shimshal-river",
    "name": "Shimshal River",
    "type": "stream",
    "category": "Mountain Torrent",
    "description": "A major hazard zone. The Khurdopin glacier periodically surges and blocks the river, forming unstable lakes that threaten Hunza Valley downstream.",
    "district": "Hunza",
    "watershed": "Data Pending",
    "length": 82,
    "elevation": 4730,
    "coordinates": {
      "lat": 36.4328,
      "lng": 75.6515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8,
      "turbidity": 10,
      "conductivity": 180,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 2.2,
      "totalDissolvedSolids": 130,
      "fecalColiform": 150,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "riverine-birds",
      "aquatic-plants"
    ],
    "threats": [
      "bank-erosion",
      "climate-change"
    ],
    "hydrologicalData": {
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-river",
    "slug": "kishanganga-river",
    "name": "Kishanganga River",
    "type": "river",
    "category": "Major Tributary",
    "description": "Major tributary of Jhelum. Flows through Gurez Valley. Important for hydropower and local ecology. Transboundary river with Pakistan.",
    "district": "Bandipora",
    "watershed": "Kishanganga Basin",
    "length": 245,
    "elevation": 2800,
    "coordinates": {
      "lat": 34.65,
      "lng": 74.75
    },
    "waterQuality": {
      "pH": 7.6,
      "dissolvedOxygen": 8.2,
      "turbidity": 6,
      "conductivity": 165,
      "temperature": 11,
      "nitrates": 0.7,
      "phosphates": 0.05,
      "biologicalOxygenDemand": 2,
      "totalDissolvedSolids": 118,
      "fecalColiform": 120,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "schizothorax",
      "riverine-birds",
      "alpine-flora"
    ],
    "threats": [
      "hydropower-development",
      "climate-change",
      "glacial-retreat"
    ],
    "hydrologicalData": {
      "flowRate": 185,
      "discharge": 5850,
      "waterLevel": 4.2,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "drainageArea": 8500,
      "floodRisk": "moderate"
    },
    "verificationStatus": "verified",
    "createdAt": "2026-01-05T00:00:00Z",
    "updatedAt": "2026-03-20T14:00:00Z",
    "region": "Kashmir Core"
  }

];
// Water Systems Data - Part 2 (Springs and Data Access)

export const springsData: WaterEntity[] = [
  {
    "id": "kokernag-spring",
    "slug": "kokernag-spring",
    "name": "Kokernag Spring",
    "type": "spring",
    "category": "Major Spring",
    "description": "Largest and most famous spring in Kashmir. Known for crystal-clear waters and trout fisheries.",
    "district": "Anantnag",
    "watershed": "Lidder-Brengi Basin",
    "elevation": 2000,
    "coordinates": {
      "lat": 33.5833,
      "lng": 75.3
    },
    "waterQuality": {
      "pH": 7.6,
      "dissolvedOxygen": 9.5,
      "turbidity": 2,
      "conductivity": 165,
      "temperature": 9,
      "nitrates": 0.4,
      "phosphates": 0.03,
      "biologicalOxygenDemand": 1.2,
      "totalDissolvedSolids": 112,
      "fecalColiform": 35,
      "lastTested": "2026-03-18",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "brown-trout",
      "rainbow-trout",
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "tourism-pressure",
      "pollution",
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 580,
      "waterLevel": 1.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 125,
      "floodRisk": "low",
      "discharge": 650
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-05T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "achabal-spring",
    "slug": "achabal-spring",
    "name": "Achabal Spring",
    "type": "spring",
    "category": "Major Spring",
    "description": "Historic spring with Mughal gardens. Known for constant flow and clear waters.",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "elevation": 1900,
    "coordinates": {
      "lat": 33.6833,
      "lng": 75.2333
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 9.2,
      "turbidity": 3,
      "conductivity": 172,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.4,
      "totalDissolvedSolids": 118,
      "fecalColiform": 45,
      "lastTested": "2026-03-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "brown-trout",
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "tourism-pressure",
      "pollution"
    ],
    "hydrologicalData": {
      "rechargeRate": 520,
      "waterLevel": 1.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 95,
      "floodRisk": "low",
      "discharge": 280
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-08T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "verinag-spring",
    "slug": "verinag-spring",
    "name": "Verinag Spring",
    "type": "spring",
    "category": "Major Spring",
    "description": "Source of Jhelum River. Historic spring with Mughal architecture. Perennial flow with high discharge.",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "elevation": 1850,
    "coordinates": {
      "lat": 33.5414,
      "lng": 75.2515
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 9,
      "turbidity": 3,
      "conductivity": 178,
      "temperature": 11,
      "nitrates": 0.6,
      "phosphates": 0.05,
      "biologicalOxygenDemand": 1.6,
      "totalDissolvedSolids": 125,
      "fecalColiform": 55,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "brown-trout",
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "tourism-pressure",
      "pollution",
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 650,
      "waterLevel": 1.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 185,
      "floodRisk": "low",
      "discharge": 700
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-10T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sheshnag-spring",
    "slug": "sheshnag-spring",
    "name": "Sheshnag Spring",
    "type": "spring",
    "category": "High-Altitude Spring",
    "description": "High-altitude spring feeding Lidder River. Sacred spring near Amarnath route.",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "elevation": 3590,
    "coordinates": {
      "lat": 34.09,
      "lng": 75.49
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 10.5,
      "turbidity": 1,
      "conductivity": 85,
      "temperature": 5,
      "nitrates": 0.2,
      "phosphates": 0.01,
      "biologicalOxygenDemand": 0.8,
      "totalDissolvedSolids": 58,
      "fecalColiform": 8,
      "lastTested": "2026-03-05",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "snow-trout",
      "alpine-flora",
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "pilgrimage-pressure",
      "climate-change",
      "waste-accumulation"
    ],
    "hydrologicalData": {
      "rechargeRate": 380,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 65,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-12T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dareng-spring",
    "slug": "dareng-spring",
    "name": "Dareng Spring",
    "type": "spring",
    "category": "Local Spring",
    "description": "Community spring in Anantnag. Important for local water supply and agriculture.",
    "district": "Baramulla",
    "watershed": "Ferozepur Nallah Basin",
    "elevation": 2100,
    "coordinates": {
      "lat": 34.0583,
      "lng": 74.3985
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.8,
      "turbidity": 4,
      "conductivity": 185,
      "temperature": 11,
      "nitrates": 0.7,
      "phosphates": 0.06,
      "biologicalOxygenDemand": 1.8,
      "totalDissolvedSolids": 132,
      "fecalColiform": 85,
      "lastTested": "2026-03-12",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "pollution",
      "grazing-pressure",
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 420,
      "waterLevel": 1.3,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 55,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-15T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "malikpora-spring",
    "slug": "malikpora-spring",
    "name": "Malikpora Spring",
    "type": "spring",
    "category": "Local Spring",
    "description": "Spring in Kulgam district. Supports local agriculture and community water needs.",
    "district": "Kulgam",
    "watershed": "Veshaw Basin",
    "elevation": 1880,
    "coordinates": {
      "lat": 33.645,
      "lng": 75.015
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 8.5,
      "turbidity": 5,
      "conductivity": 192,
      "temperature": 12,
      "nitrates": 0.8,
      "phosphates": 0.07,
      "biologicalOxygenDemand": 2,
      "totalDissolvedSolids": 138,
      "fecalColiform": 120,
      "lastTested": "2026-03-10",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "agricultural-runoff",
      "grazing-pressure",
      "drying-risk",
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 380,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 48,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-18T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-malikpora-bandipora",
    "slug": "malikpora-spring-bandipora",
    "name": "Malikpora Spring (Bandipora)",
    "type": "spring",
    "category": "Local Spring",
    "description": "Added to represent the user request for a Malikpora Spring in Bandipora. Needs field verification for exact coordinates and flow characteristics.",
    "district": "Bandipora",
    "watershed": "Jhelum Basin",
    "elevation": 1575,
    "coordinates": {
      "lat": 34.3,
      "lng": 74.6
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change",
      "drying-risk"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-chashma-shahi",
    "slug": "chashma-shahi",
    "name": "Chashma Shahi",
    "type": "spring",
    "category": "Freshwater Spring",
    "description": "The Mughal Garden Chashma Shahi was built around this freshwater spring by Shah Jahan in 1632 AD.",
    "district": "Srinagar",
    "watershed": "Jhelum Basin",
    "elevation": 1600,
    "coordinates": {
      "lat": 34.0858,
      "lng": 74.8722
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 5
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-panzath-nag",
    "slug": "panzath-nag",
    "name": "Panzath Nag",
    "type": "spring",
    "category": "Major Spring",
    "description": "Celebrated for the annual 'Gaade Maare' (fishing festival) where villagers clean the spring bed of weeds and silt.",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "elevation": 1680,
    "coordinates": {
      "lat": 33.6167,
      "lng": 75.2167
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 80
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-kheer-bhawani",
    "slug": "kheer-bhawani-spring",
    "name": "Kheer Bhawani Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "The spring is situated inside the temple complex. Legend says the water changes color to warn of coming events.",
    "district": "Ganderbal",
    "watershed": "Sindh Basin",
    "elevation": 1580,
    "coordinates": {
      "lat": 34.22,
      "lng": 74.75
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 4
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-ganderbhavan",
    "slug": "ganderbhavan-spring",
    "name": "Ganderbhavan Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Historically pure spring that gave the district its name, now facing threat of drying up due to urban sprawl.",
    "district": "Ganderbal",
    "watershed": "Sindh Basin",
    "elevation": 1610,
    "coordinates": {
      "lat": 34.23,
      "lng": 74.78
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change",
      "drying-risk"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-ashtar",
    "slug": "ashtar-spring",
    "name": "Ashtar Spring",
    "type": "spring",
    "category": "Alpine Spring",
    "description": "Originates in the high-altitude meadows of Tosa Maidan. Serves as a major headwater source for the Sukhnag River.",
    "district": "Budgam",
    "watershed": "Sukhnag River Basin",
    "elevation": 3200,
    "coordinates": {
      "lat": 33.95,
      "lng": 74.52
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 45
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-nilnag",
    "slug": "nilnag-spring",
    "name": "Nilnag Spring",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "A spring-fed lake nestled in the pine forest, revered as a sacred 'Nag' with ancient cultural stories.",
    "district": "Budgam",
    "watershed": "Doodhganga Basin",
    "elevation": 2180,
    "coordinates": {
      "lat": 33.8167,
      "lng": 74.7
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-lavnag",
    "slug": "lavnag-spring",
    "name": "Lavnag Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Located in the scenic Lolab Valley. Georeference is approximate and needs GPS verification.",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "elevation": 1650,
    "coordinates": {
      "lat": 34.55,
      "lng": 74.32
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-satisar",
    "slug": "satisar-spring",
    "name": "Satisar Spring",
    "type": "spring",
    "category": "Local Spring",
    "description": "Lolab valley spring recorded in historical folklore, now experiencing reduced seasonal discharge.",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "elevation": 1620,
    "coordinates": {
      "lat": 34.58,
      "lng": 74.3
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change",
      "drying-risk"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "seasonal",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-gaurinag",
    "slug": "gaurinag-spring",
    "name": "Gaurinag Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "A sacred cold spring with high cultural significance in the Lolab region.",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "elevation": 1700,
    "coordinates": {
      "lat": 34.53,
      "lng": 74.35
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-pirnag",
    "slug": "pirnag-spring",
    "name": "Pirnag Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Traditional well-maintained spring in Lolab. GPS coordinates need ground verification.",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "elevation": 1680,
    "coordinates": {
      "lat": 34.54,
      "lng": 74.36
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-sogamnag",
    "slug": "sogamnag-spring",
    "name": "Sogamnag Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "A major drinking water feed for local Sogam community.",
    "district": "Kupwara",
    "watershed": "Pohru River Basin",
    "elevation": 1690,
    "coordinates": {
      "lat": 34.535,
      "lng": 74.355
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-sherbagh",
    "slug": "sherbagh-spring",
    "name": "Sherbagh Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Centrally located spring in Anantnag town. Visited by tourists and pilgrims.",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "elevation": 1600,
    "coordinates": {
      "lat": 33.729,
      "lng": 75.1495
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change",
      "drying-risk"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 15
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-andernag",
    "slug": "andernag-spring",
    "name": "Andernag Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Historic spring associated with the ancient temple structure of Andernag in Anantnag town.",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "elevation": 1605,
    "coordinates": {
      "lat": 33.728,
      "lng": 75.148
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-malaknag",
    "slug": "malaknag-spring",
    "name": "Malaknag Spring",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "A unique warm spring in the middle of Anantnag town known for its medicinal sulphur properties.",
    "district": "Anantnag",
    "watershed": "Jhelum Basin",
    "elevation": 1610,
    "coordinates": {
      "lat": 33.7315,
      "lng": 75.146
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 12
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-sukhnag",
    "slug": "sukhnag-spring",
    "name": "Sukhnag Spring",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "Critical local spring feeding the Sukhnag stream system, vulnerable to mining operations downstream.",
    "district": "Budgam",
    "watershed": "Sukhnag River Basin",
    "elevation": 2350,
    "coordinates": {
      "lat": 34,
      "lng": 74.47
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 28
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-harmukh",
    "slug": "harmukh-alpine-springs",
    "name": "Harmukh Alpine Springs",
    "type": "spring",
    "category": "High-Altitude Spring",
    "description": "A cluster of small perennial rock fissure springs feeding the Gangabal lake outlet.",
    "district": "Ganderbal",
    "watershed": "Sindh Basin",
    "elevation": 3500,
    "coordinates": {
      "lat": 34.4167,
      "lng": 74.9167
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-pap-nashni",
    "slug": "pap-nashni-bowli",
    "name": "Pap Nashni Bowli",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Devotees bathe in this bowli to wash away sins before praying at the Sudh Mahadev Temple.",
    "district": "Udhampur",
    "watershed": "Chenab Basin",
    "elevation": 1225,
    "coordinates": {
      "lat": 33.0214,
      "lng": 75.3635
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 3
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-gouri-kund",
    "slug": "gouri-kund-spring",
    "name": "Gouri Kund Spring",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Associated with Goddess Parvati's place of penance.",
    "district": "Udhampur",
    "watershed": "Tawi Catchment",
    "elevation": 1550,
    "coordinates": {
      "lat": 33.045,
      "lng": 75.345
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 2
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatapani-kalakote",
    "slug": "tatapani-tatta-pani-hot-spring",
    "name": "Tatapani / Tatta Pani Hot Spring",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Non-volcanic geothermal spring near the Main Boundary Thrust, Lesser Himalaya. Two thermal springs reported with temperatures ranging from 44°C to 60°C. Sulphur-rich thermal water collected for bathing. Often incorrectly associated with Reasi district due to proximity. Legally and administratively in Rajouri (Kalakote).",
    "district": "Rajouri",
    "watershed": "Chenab Basin",
    "elevation": 700,
    "coordinates": {
      "lat": 33.2378,
      "lng": 74.4119
    },
    "waterQuality": {
      "pH": 6.41,
      "dissolvedOxygen": null,
      "turbidity": null,
      "conductivity": null,
      "temperature": 46,
      "nitrates": null,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": null,
      "fecalColiform": null,
      "lastTested": "2026-03-15",
      "status": "data-deficient",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 6
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatapani-paddar",
    "slug": "tatapani-paddar",
    "name": "Tatapani Paddar",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Highly remote hot spring. Mapped approximately using village center. Needs formal geodetic mapping.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "elevation": 2500,
    "coordinates": {
      "lat": 33.19,
      "lng": 76.26
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 10
    },
    "region": "Jammu",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-gudresh-nag",
    "slug": "gudresh-nag",
    "name": "Gudresh Nag",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "A sacred bowli of Kishtwar linked with regional Naga deities. Coordinates are approximate and need validation.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "elevation": 1630,
    "coordinates": {
      "lat": 33.318,
      "lng": 75.766
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-pooti-nag",
    "slug": "pooti-nag",
    "name": "Pooti Nag",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Mountain spring of Paddar. GPS coordinates are estimated. Needs field verification.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "elevation": 2300,
    "coordinates": {
      "lat": 33.15,
      "lng": 76.1
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-kumai-nag",
    "slug": "kumai-nag",
    "name": "Kumai Nag",
    "type": "spring",
    "category": "Sacred Spring",
    "description": "Ancient village spring with stone-carved snake motifs, traditional bowli structure.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "elevation": 1800,
    "coordinates": {
      "lat": 33.26,
      "lng": 75.9
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-khoon",
    "slug": "khoon-spring",
    "name": "Khoon Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "Traditional bowli that was restored under the 'Bowli Bachao Abhiyan' community campaign.",
    "district": "Udhampur",
    "watershed": "Tawi Catchment",
    "elevation": 780,
    "coordinates": {
      "lat": 32.7833,
      "lng": 75.3167
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change",
      "drying-risk"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-panamik",
    "slug": "panamik-hot-springs",
    "name": "Panamik Hot Springs",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Famed sulfur hot springs in the Nubra Valley. Known to contain high amounts of sulfur and other therapeutic minerals.",
    "district": "Leh",
    "watershed": "Shyok Basin",
    "elevation": 3183,
    "coordinates": {
      "lat": 34.7833,
      "lng": 77.5333
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 12
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-chumathang",
    "slug": "chumathang-hot-springs",
    "name": "Chumathang Hot Springs",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Located right next to the freezing Indus River, producing bubbles and steam along the riverbank.",
    "district": "Leh",
    "watershed": "Indus River Mainstem",
    "elevation": 3950,
    "coordinates": {
      "lat": 33.3607,
      "lng": 78.3406
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 15
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-puga",
    "slug": "puga-hot-springs",
    "name": "Puga Hot Springs",
    "type": "spring",
    "category": "Geothermal Hot Spring",
    "description": "Located in a geothermal field with potential for mega-watt power generation.",
    "district": "Leh",
    "watershed": "Indus River Mainstem",
    "elevation": 4400,
    "coordinates": {
      "lat": 33.22,
      "lng": 78.31
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 25
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "elevation": 650,
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 8
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-kel-springs",
    "slug": "kel-springs",
    "name": "Kel Springs",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "Critical local spring system for Kel, situated in the rugged high-elevation Neelum Valley.",
    "district": "Neelum",
    "watershed": "Neelum River Basin",
    "elevation": 2097,
    "coordinates": {
      "lat": 34.825,
      "lng": 74.352
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-sharda-springs",
    "slug": "sharda-springs",
    "name": "Sharda Springs",
    "type": "spring",
    "category": "Mountain Spring",
    "description": "Provides freshwater for Sharda town. Visited by tourists near the Sharda Peeth ruins.",
    "district": "Neelum",
    "watershed": "Neelum River Basin",
    "elevation": 1980,
    "coordinates": {
      "lat": 34.793,
      "lng": 74.182
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-chutrun",
    "slug": "chutrun-hot-springs",
    "name": "Chutrun Hot Springs",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Located in the Shigar Valley, about 2 hours drive from Skardu. Includes separate public bathhouses for men and women.",
    "district": "Shigar",
    "watershed": "Shigar Basin",
    "elevation": 2450,
    "coordinates": {
      "lat": 35.6942,
      "lng": 75.3995
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 18
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-garam-chashma-chilas",
    "slug": "garam-chashma-chilas",
    "name": "Garam Chashma Chilas",
    "type": "spring",
    "category": "Geothermal Hot Spring",
    "description": "Thermal spring located near Chilas along Karakoram Highway. Coordinates are approximate.",
    "district": "Diamer",
    "watershed": "Indus River Mainstem",
    "elevation": 1250,
    "coordinates": {
      "lat": 35.42,
      "lng": 74.1
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-hussaini-hot",
    "slug": "hussaini-hot-springs",
    "name": "Hussaini Hot Springs",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "A popular mountain geothermal spring located close to the Hussaini Suspension Bridge.",
    "district": "Hunza",
    "watershed": "Hunza River Basin",
    "elevation": 2500,
    "coordinates": {
      "lat": 36.425,
      "lng": 74.883
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-khorkondo",
    "slug": "khorkondo-hot-springs",
    "name": "Khorkondo Hot Springs",
    "type": "spring",
    "category": "Geothermal Sulphur Spring",
    "description": "Highly remote geothermal spring near the Siachen glacier zone. Crucial hot water source in sub-zero winter temperatures.",
    "district": "Ghanche",
    "watershed": "Shyok River Basin",
    "elevation": 3050,
    "coordinates": {
      "lat": 35.3,
      "lng": 76.74
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 12
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-murtazaabad",
    "slug": "murtazaabad-spring",
    "name": "Murtazaabad Spring",
    "type": "spring",
    "category": "Cold Spring",
    "description": "A highly relied upon cold spring since the main Hunza River water becomes extremely silty in summer.",
    "district": "Hunza",
    "watershed": "Hunza River Basin",
    "elevation": 2150,
    "coordinates": {
      "lat": 36.312,
      "lng": 74.634
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "elevation": 650,
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 8
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "elevation": 650,
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 8
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "elevation": 650,
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 8
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatta-pani-kotli",
    "slug": "tatta-pani-hot-springs-kotli",
    "name": "Tatta Pani Hot Springs (Kotli)",
    "type": "spring",
    "category": "Geothermal Spring",
    "description": "Situated on the banks of the Poonch River. Legend attributes the heat of the water to the presence of volcanic minerals.",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "elevation": 650,
    "coordinates": {
      "lat": 33.5833,
      "lng": 73.9667
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 8.5,
      "turbidity": 3,
      "conductivity": 180,
      "temperature": 10,
      "nitrates": 0.5,
      "phosphates": 0.04,
      "biologicalOxygenDemand": 1.5,
      "totalDissolvedSolids": 120,
      "fecalColiform": 50,
      "lastTested": "2026-03-15",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "biodiversity": [
      "aquatic-plants",
      "amphibians"
    ],
    "threats": [
      "climate-change"
    ],
    "hydrologicalData": {
      "rechargeRate": 400,
      "waterLevel": 1.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "drainageArea": 50,
      "floodRisk": "low",
      "discharge": 8
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  }

];

// Metrics
export const waterSystemsMetrics = {
  totalLakes: 13,
  totalWetlands: 8,
  totalRivers: 8,
  totalStreams: 2,
  totalSprings: 6,
  totalWaterBodies: 37,
  ramsarSites: 3,
  criticalQuality: 2,
  moderateQuality: 8,
  goodQuality: 18,
  excellentQuality: 9,
};

// ============================================================================
// WATERSHEDS DATA
// ============================================================================

export const watershedsData: WaterEntity[] = [
  {
    "id": "jhelum-basin",
    "slug": "jhelum-basin",
    "name": "Jhelum Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "Principal watershed of Kashmir Valley. Drains over 33,000 km². Encompasses all major lakes, wetlands, and tributaries. Critical for irrigation, hydropower, and flood regulation.",
    "district": "Multiple",
    "area": 15856,
    "elevation": 2850,
    "coordinates": {
      "lat": 34.0833,
      "lng": 74.8
    },
    "hydrologicalData": {
      "discharge": 28500,
      "drainageArea": 15856,
      "rechargeRate": 450,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "pollution",
      "encroachment",
      "deforestation",
      "climate-change",
      "sand-mining",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "chenab-basin",
    "slug": "chenab-basin",
    "name": "Chenab Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A rugged Himalayan basin with massive run-of-the-river hydropower potential. Chenab is formed by the confluence of Chandra and Bhaga rivers.",
    "district": "Multiple",
    "area": 26155,
    "elevation": 3250,
    "coordinates": {
      "lat": 33.25,
      "lng": 75.5
    },
    "hydrologicalData": {
      "drainageArea": 26155,
      "rechargeRate": 380,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ravi-basin",
    "slug": "ravi-basin",
    "name": "Ravi Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "Ravi River forms the boundary between J&K (Kathua) and Punjab. Features the massive Ranjit Sagar reservoir.",
    "district": "Kathua",
    "area": 5200,
    "elevation": 1850,
    "coordinates": {
      "lat": 32.55,
      "lng": 75.75
    },
    "hydrologicalData": {
      "drainageArea": 5200,
      "rechargeRate": 310,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "indus-basin",
    "slug": "indus-basin",
    "name": "Indus Basin (Ladakh)",
    "type": "watershed",
    "category": "Major Basin",
    "description": "One of the largest river basins in Asia. Drains over 1.1 million km². Critical for Ladakh region and transboundary water sharing.",
    "district": "Leh/Kargil",
    "area": 321289,
    "elevation": 4500,
    "coordinates": {
      "lat": 34.5,
      "lng": 77.5
    },
    "hydrologicalData": {
      "discharge": 195000,
      "drainageArea": 321289,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "glacial-retreat",
      "hydropower-development",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "upper-indus-gb-basin",
    "slug": "upper-indus-gb-basin",
    "name": "Upper Indus GB Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A critically glaciated basin, containing some of the largest glaciers outside the polar regions (Baltoro, Biafo). Heavy GLOF and mudslide vulnerabilities.",
    "district": "Multiple",
    "area": 72400,
    "elevation": 4100,
    "coordinates": {
      "lat": 35.3,
      "lng": 75.5
    },
    "hydrologicalData": {
      "drainageArea": 72400,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-basin",
    "slug": "lidder-basin",
    "name": "Lidder Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Important sub-basin in southern Kashmir. Drains Lidder Valley. Critical for irrigation, trout fisheries, and tourism.",
    "district": "Anantnag",
    "area": 1159,
    "elevation": 3400,
    "coordinates": {
      "lat": 33.95,
      "lng": 75.15
    },
    "hydrologicalData": {
      "discharge": 1420,
      "drainageArea": 1159,
      "rechargeRate": 320,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "tourism-pressure",
      "pollution",
      "overfishing",
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-08T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-basin",
    "slug": "sind-basin",
    "name": "Sind Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Largest tributary basin in central Kashmir. Drains much of Ganderbal district. Important for irrigation and hydropower.",
    "district": "Ganderbal/Srinagar",
    "area": 1683,
    "elevation": 3100,
    "coordinates": {
      "lat": 34.25,
      "lng": 74.8
    },
    "hydrologicalData": {
      "discharge": 2680,
      "drainageArea": 1683,
      "rechargeRate": 380,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "pollution",
      "sand-mining",
      "encroachment",
      "hydropower-development",
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-10T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin",
    "slug": "kishanganga-basin",
    "name": "Kishanganga Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Major tributary basin in northern Kashmir. Drains Gurez Valley. Transboundary basin with Pakistan. Important for hydropower generation.",
    "district": "Bandipora/Kupwara",
    "area": 8500,
    "elevation": 3200,
    "coordinates": {
      "lat": 34.65,
      "lng": 74.75
    },
    "hydrologicalData": {
      "discharge": 5850,
      "drainageArea": 8500,
      "rechargeRate": 340,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "hydropower-development",
      "climate-change",
      "glacial-retreat",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-05T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin",
    "slug": "tawi-sub-basin",
    "name": "Tawi Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Known locally as the Surya Putri. Feeds the Jammu city drinking network. Suffers severe discharge reduction during summer and dry spells.",
    "district": "Udhampur/Jammu",
    "area": 2168,
    "elevation": 1450,
    "coordinates": {
      "lat": 32.85,
      "lng": 74.92
    },
    "hydrologicalData": {
      "drainageArea": 2168,
      "rechargeRate": 290,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin",
    "slug": "marusudar-sub-basin",
    "name": "Marusudar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Largest tributary of the Chenab. Highly glacier-fed with steep canyons. Central to the construction of major run-of-the-river dams.",
    "district": "Kishtwar",
    "area": 4320,
    "elevation": 3800,
    "coordinates": {
      "lat": 33.65,
      "lng": 75.8
    },
    "hydrologicalData": {
      "drainageArea": 4320,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin",
    "slug": "ujh-sub-basin",
    "name": "Ujh Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Ujh River is a major tributary of the Ravi. Heavily rainfed. Subject to high-priority water diversion projects under the Indus Waters Treaty framework.",
    "district": "Kathua/Samba",
    "area": 1215,
    "elevation": 1650,
    "coordinates": {
      "lat": 32.65,
      "lng": 75.38
    },
    "hydrologicalData": {
      "drainageArea": 1215,
      "rechargeRate": 240,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin",
    "slug": "zanskar-sub-basin",
    "name": "Zanskar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "A glacier-fed sub-basin noted for extreme cold, glaciation, and winter ice formation. Famed for the Chadar Trek on the frozen river.",
    "district": "Kargil",
    "area": 12200,
    "elevation": 4650,
    "coordinates": {
      "lat": 33.6,
      "lng": 76.9
    },
    "hydrologicalData": {
      "drainageArea": 12200,
      "rechargeRate": 90,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin",
    "slug": "shyok-sub-basin",
    "name": "Shyok Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Originates at the Rimo Glacier. Known for glacial surge events (e.g. Chong Kumdan glacier dams) which create massive seasonal GLOF risks.",
    "district": "Leh",
    "area": 23600,
    "elevation": 4900,
    "coordinates": {
      "lat": 34.68,
      "lng": 78.12
    },
    "hydrologicalData": {
      "drainageArea": 23600,
      "rechargeRate": 80,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin",
    "slug": "suru-sub-basin",
    "name": "Suru Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Nun-Kun massif glaciers feed this catchment. Crucial drinking water source for the entire Kargil district capital.",
    "district": "Kargil",
    "area": 4350,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.35,
      "lng": 76.15
    },
    "hydrologicalData": {
      "drainageArea": 4350,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin",
    "slug": "dras-sub-basin",
    "name": "Dras Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Encompasses Dras, the second-coldest inhabited place on Earth. Heavily fed by Machoi and other regional glaciers.",
    "district": "Kargil",
    "area": 3150,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.42,
      "lng": 75.85
    },
    "hydrologicalData": {
      "drainageArea": 3150,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin",
    "slug": "nubra-sub-basin",
    "name": "Nubra Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Nubra River originates directly from the snout of the Siachen Glacier. A critical cryosphere intelligence unit.",
    "district": "Leh",
    "area": 5400,
    "elevation": 5100,
    "coordinates": {
      "lat": 35.15,
      "lng": 77.25
    },
    "hydrologicalData": {
      "drainageArea": 5400,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin",
    "slug": "neelum-ajk-basin",
    "name": "Neelum AJK Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Stretches along the Line of Control. Deeply forested valley. Neelum-Jhelum HEP diverts water via a tunnel to the Jhelum river.",
    "district": "Neelum/Muzaffarabad",
    "area": 7400,
    "elevation": 2900,
    "coordinates": {
      "lat": 34.58,
      "lng": 73.9
    },
    "hydrologicalData": {
      "drainageArea": 7400,
      "rechargeRate": 310,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin",
    "slug": "hunza-sub-basin",
    "name": "Hunza Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Drains the Karakoram range. Associated with massive landslide hazards, notably the 2010 landslide that created Attabad Lake.",
    "district": "Hunza/Nagar",
    "area": 13700,
    "elevation": 4350,
    "coordinates": {
      "lat": 36.3,
      "lng": 74.6
    },
    "hydrologicalData": {
      "drainageArea": 13700,
      "rechargeRate": 75,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin",
    "slug": "gilgit-sub-basin",
    "name": "Gilgit Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Flows from the Shandur Pass (the world's highest polo ground). Extremely glaciated tributaries like the Yasin and Ishkoman rivers feed it.",
    "district": "Gilgit/Ghizer/Gupis-Yasin",
    "area": 12100,
    "elevation": 3950,
    "coordinates": {
      "lat": 36.1,
      "lng": 73.6
    },
    "hydrologicalData": {
      "drainageArea": 12100,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin",
    "slug": "shigar-sub-basin",
    "name": "Shigar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Drains the southern slopes of the Karakoram range, including K2 (8,611m). Fed by Baltoro and Biafo glaciers. Critical unit for global glacier melt studies.",
    "district": "Shigar",
    "area": 7380,
    "elevation": 5200,
    "coordinates": {
      "lat": 35.7,
      "lng": 75.75
    },
    "hydrologicalData": {
      "drainageArea": 7380,
      "rechargeRate": 90,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin",
    "slug": "astore-sub-basin",
    "name": "Astore Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Astore River drains the eastern slopes of Nanga Parbat (8,126m). Strongly glacier and snowfed. Features severe winter freezing.",
    "district": "Astore",
    "area": 4180,
    "elevation": 4200,
    "coordinates": {
      "lat": 35.15,
      "lng": 74.85
    },
    "hydrologicalData": {
      "drainageArea": 4180,
      "rechargeRate": 130,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-0",
    "slug": "arapath-watershed",
    "name": "Arapath Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Anantnag",
    "area": 40,
    "elevation": 2000,
    "coordinates": {
      "lat": 34.1,
      "lng": 74.7
    },
    "hydrologicalData": {
      "drainageArea": 40,
      "rechargeRate": 100,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-1",
    "slug": "bringi-watershed",
    "name": "Bringi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Kulgam",
    "area": 45,
    "elevation": 2035,
    "coordinates": {
      "lat": 34.12,
      "lng": 74.72
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-2",
    "slug": "sandran-watershed",
    "name": "Sandran Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Shopian",
    "area": 50,
    "elevation": 2070,
    "coordinates": {
      "lat": 34.14,
      "lng": 74.74
    },
    "hydrologicalData": {
      "drainageArea": 50,
      "rechargeRate": 108,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-3",
    "slug": "lidder-east-watershed",
    "name": "Lidder East Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Pulwama",
    "area": 55,
    "elevation": 2105,
    "coordinates": {
      "lat": 34.16,
      "lng": 74.76
    },
    "hydrologicalData": {
      "drainageArea": 55,
      "rechargeRate": 112,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-4",
    "slug": "lidder-west-watershed",
    "name": "Lidder West Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Srinagar",
    "area": 60,
    "elevation": 2140,
    "coordinates": {
      "lat": 34.18,
      "lng": 74.78
    },
    "hydrologicalData": {
      "drainageArea": 60,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-5",
    "slug": "kolahoi-watershed",
    "name": "Kolahoi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Budgam",
    "area": 65,
    "elevation": 2175,
    "coordinates": {
      "lat": 34.2,
      "lng": 74.8
    },
    "hydrologicalData": {
      "drainageArea": 65,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-6",
    "slug": "sheshnag-watershed",
    "name": "Sheshnag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Baramulla",
    "area": 70,
    "elevation": 2210,
    "coordinates": {
      "lat": 34.22,
      "lng": 74.82
    },
    "hydrologicalData": {
      "drainageArea": 70,
      "rechargeRate": 124,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-7",
    "slug": "aru-valley-watershed",
    "name": "Aru Valley Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Bandipora",
    "area": 75,
    "elevation": 2245,
    "coordinates": {
      "lat": 34.24,
      "lng": 74.84
    },
    "hydrologicalData": {
      "drainageArea": 75,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-8",
    "slug": "pahalgam-watershed",
    "name": "Pahalgam Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Ganderbal",
    "area": 80,
    "elevation": 2280,
    "coordinates": {
      "lat": 34.26,
      "lng": 74.86
    },
    "hydrologicalData": {
      "drainageArea": 80,
      "rechargeRate": 132,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-9",
    "slug": "verinag-watershed",
    "name": "Verinag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Kupwara",
    "area": 85,
    "elevation": 2315,
    "coordinates": {
      "lat": 34.28,
      "lng": 74.88
    },
    "hydrologicalData": {
      "drainageArea": 85,
      "rechargeRate": 136,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-10",
    "slug": "kokernag-watershed",
    "name": "Kokernag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Anantnag",
    "area": 90,
    "elevation": 2350,
    "coordinates": {
      "lat": 34.3,
      "lng": 74.9
    },
    "hydrologicalData": {
      "drainageArea": 90,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-11",
    "slug": "achabal-watershed",
    "name": "Achabal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Kulgam",
    "area": 95,
    "elevation": 2385,
    "coordinates": {
      "lat": 34.32,
      "lng": 74.92
    },
    "hydrologicalData": {
      "drainageArea": 95,
      "rechargeRate": 144,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-12",
    "slug": "chashma-shahi-watershed",
    "name": "Chashma Shahi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Shopian",
    "area": 100,
    "elevation": 2420,
    "coordinates": {
      "lat": 34.34,
      "lng": 74.94
    },
    "hydrologicalData": {
      "drainageArea": 100,
      "rechargeRate": 148,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-13",
    "slug": "martand-watershed",
    "name": "Martand Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Pulwama",
    "area": 105,
    "elevation": 2455,
    "coordinates": {
      "lat": 34.36,
      "lng": 74.96
    },
    "hydrologicalData": {
      "drainageArea": 105,
      "rechargeRate": 152,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-14",
    "slug": "vishow-upper-watershed",
    "name": "Vishow Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Srinagar",
    "area": 110,
    "elevation": 2490,
    "coordinates": {
      "lat": 34.38,
      "lng": 74.98
    },
    "hydrologicalData": {
      "drainageArea": 110,
      "rechargeRate": 156,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-15",
    "slug": "vishow-lower-watershed",
    "name": "Vishow Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Budgam",
    "area": 115,
    "elevation": 2525,
    "coordinates": {
      "lat": 34.4,
      "lng": 75
    },
    "hydrologicalData": {
      "drainageArea": 115,
      "rechargeRate": 160,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-16",
    "slug": "aharbal-watershed",
    "name": "Aharbal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Baramulla",
    "area": 120,
    "elevation": 2560,
    "coordinates": {
      "lat": 34.42,
      "lng": 75.02
    },
    "hydrologicalData": {
      "drainageArea": 120,
      "rechargeRate": 164,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-17",
    "slug": "kausarnag-watershed",
    "name": "Kausarnag Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Bandipora",
    "area": 125,
    "elevation": 2595,
    "coordinates": {
      "lat": 34.44,
      "lng": 75.04
    },
    "hydrologicalData": {
      "drainageArea": 125,
      "rechargeRate": 168,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-18",
    "slug": "rambiara-upper-watershed",
    "name": "Rambiara Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Ganderbal",
    "area": 130,
    "elevation": 2630,
    "coordinates": {
      "lat": 34.46,
      "lng": 75.06
    },
    "hydrologicalData": {
      "drainageArea": 130,
      "rechargeRate": 172,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-19",
    "slug": "rambiara-lower-watershed",
    "name": "Rambiara Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed.",
    "district": "Kupwara",
    "area": 135,
    "elevation": 2665,
    "coordinates": {
      "lat": 34.48,
      "lng": 75.08
    },
    "hydrologicalData": {
      "drainageArea": 135,
      "rechargeRate": 176,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "vishav-catchment",
    "slug": "vishav-catchment",
    "name": "Vishav Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Vishav originates at Kausarnag Lake and plunges down as Aharbal Waterfall. Noted for extreme flash flood vulnerability in summer months.",
    "district": "Kulgam/Anantnag",
    "area": 624,
    "elevation": 2950,
    "coordinates": {
      "lat": 33.6,
      "lng": 74.85
    },
    "hydrologicalData": {
      "drainageArea": 624,
      "rechargeRate": 280,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "rambiara-catchment",
    "slug": "rambiara-catchment",
    "name": "Rambiara Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Flows through the Hirpora Wildlife Sanctuary (home of the Markhor). Significant land conversion to apple orchards has accelerated runoff.",
    "district": "Shopian/Pulwama",
    "area": 665,
    "elevation": 2850,
    "coordinates": {
      "lat": 33.68,
      "lng": 74.72
    },
    "hydrologicalData": {
      "drainageArea": 665,
      "rechargeRate": 240,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "romushi-catchment",
    "slug": "romushi-catchment",
    "name": "Romushi Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Flows through soft Karewa clay mounds, making it highly prone to bank erosion and soil mining.",
    "district": "Pulwama/Budgam",
    "area": 542,
    "elevation": 2700,
    "coordinates": {
      "lat": 33.78,
      "lng": 74.78
    },
    "hydrologicalData": {
      "drainageArea": 542,
      "rechargeRate": 220,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "doodhganga-catchment",
    "slug": "doodhganga-catchment",
    "name": "Doodhganga Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Critically degraded in downstream sections due to municipal sewage dump from Srinagar and Budgam towns. Subject to NGT corrective directives.",
    "district": "Budgam/Srinagar",
    "area": 660,
    "elevation": 2600,
    "coordinates": {
      "lat": 33.88,
      "lng": 74.82
    },
    "hydrologicalData": {
      "drainageArea": 660,
      "rechargeRate": 250,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "pohru-catchment",
    "slug": "pohru-catchment",
    "name": "Pohru Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Largest sub-watershed in Kashmir Valley. Pohru carries the highest sediment load in the entire Jhelum basin, contributing heavily to Wular Lake siltation.",
    "district": "Kupwara/Baramulla",
    "area": 1877,
    "elevation": 2450,
    "coordinates": {
      "lat": 34.38,
      "lng": 74.32
    },
    "hydrologicalData": {
      "drainageArea": 1877,
      "rechargeRate": 410,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dal-nigeen-catchment",
    "slug": "dal-nigeen-catchment",
    "name": "Dal-Nigeen Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Urban catchment feeding Dal and Nigeen lakes. Highly populated with significant pollution pressure. Critical for lake conservation.",
    "district": "Srinagar/Ganderbal",
    "area": 312,
    "elevation": 2100,
    "coordinates": {
      "lat": 34.115,
      "lng": 74.829
    },
    "hydrologicalData": {
      "discharge": 330,
      "drainageArea": 312,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "urbanization",
      "pollution",
      "encroachment",
      "sewage-discharge",
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-12T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "wular-catchment",
    "slug": "wular-catchment",
    "name": "Wular Lake Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Large catchment feeding Wular Lake. Extensive wetland complex. Critical for flood buffering and migratory birds.",
    "district": "Bandipora/Baramulla",
    "area": 2890,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.4167,
      "lng": 74.6333
    },
    "hydrologicalData": {
      "discharge": 1250,
      "drainageArea": 2890,
      "rechargeRate": 390,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "threats": [
      "siltation",
      "invasive-species",
      "catchment-degradation",
      "overfishing",
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-15T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hokersar-catchment",
    "slug": "hokersar-catchment",
    "name": "Hokersar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major migratory waterfowl habitat and Ramsar wetland. Drained by the Flood Spill Channel. Siltation from Doodhganga has dramatically reduced its water depth.",
    "district": "Srinagar/Budgam",
    "area": 125,
    "elevation": 1750,
    "coordinates": {
      "lat": 34.09,
      "lng": 74.72
    },
    "hydrologicalData": {
      "drainageArea": 125,
      "rechargeRate": 90,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "threats": [
      "climate-change",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shallabugh-catchment",
    "slug": "shallabugh-catchment",
    "name": "Shallabugh Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A Ramsar designated wetland. Dries up significantly during winters. Crucial staging ground for mallards, pintails, and greylag geese.",
    "district": "Ganderbal/Srinagar",
    "area": 180,
    "elevation": 1680,
    "coordinates": {
      "lat": 34.16,
      "lng": 74.73
    },
    "hydrologicalData": {
      "drainageArea": 180,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "critical"
    },
    "threats": [
      "climate-change",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "upper-jhelum-catchment",
    "slug": "upper-jhelum-catchment",
    "name": "Upper Jhelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "High-altitude upper catchment of Jhelum. Glacial and snow-fed. Critical for base flow maintenance.",
    "district": "Anantnag",
    "area": 1850,
    "elevation": 2650,
    "coordinates": {
      "lat": 33.85,
      "lng": 75.2
    },
    "hydrologicalData": {
      "discharge": 3200,
      "drainageArea": 1850,
      "rechargeRate": 480,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat",
      "grazing-pressure",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-18T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-0-c-0",
    "slug": "hirpora-catchment",
    "name": "Hirpora Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Anantnag",
    "area": 15,
    "elevation": 1900,
    "coordinates": {
      "lat": 34.1,
      "lng": 74.7
    },
    "hydrologicalData": {
      "drainageArea": 15,
      "rechargeRate": 80,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-1-c-1",
    "slug": "romushi-upper-catchment",
    "name": "Romushi Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kulgam",
    "area": 18,
    "elevation": 1928,
    "coordinates": {
      "lat": 34.11,
      "lng": 74.71
    },
    "hydrologicalData": {
      "drainageArea": 18,
      "rechargeRate": 83,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-2-c-2",
    "slug": "romushi-lower-catchment",
    "name": "Romushi Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Shopian",
    "area": 21,
    "elevation": 1956,
    "coordinates": {
      "lat": 34.12,
      "lng": 74.72
    },
    "hydrologicalData": {
      "drainageArea": 21,
      "rechargeRate": 86,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-3-c-3",
    "slug": "yousmarg-catchment",
    "name": "Yousmarg Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Pulwama",
    "area": 24,
    "elevation": 1984,
    "coordinates": {
      "lat": 34.13,
      "lng": 74.73
    },
    "hydrologicalData": {
      "drainageArea": 24,
      "rechargeRate": 89,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-4-c-4",
    "slug": "doodhganga-upper-catchment",
    "name": "Doodhganga Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Srinagar",
    "area": 27,
    "elevation": 2012,
    "coordinates": {
      "lat": 34.14,
      "lng": 74.74
    },
    "hydrologicalData": {
      "drainageArea": 27,
      "rechargeRate": 92,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-5-c-5",
    "slug": "doodhganga-lower-catchment",
    "name": "Doodhganga Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Budgam",
    "area": 30,
    "elevation": 2040,
    "coordinates": {
      "lat": 34.15,
      "lng": 74.75
    },
    "hydrologicalData": {
      "drainageArea": 30,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-6-c-6",
    "slug": "chadoora-catchment",
    "name": "Chadoora Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Baramulla",
    "area": 33,
    "elevation": 2068,
    "coordinates": {
      "lat": 34.16,
      "lng": 74.76
    },
    "hydrologicalData": {
      "drainageArea": 33,
      "rechargeRate": 98,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-7-c-7",
    "slug": "sukhnag-upper-catchment",
    "name": "Sukhnag Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Bandipora",
    "area": 36,
    "elevation": 2096,
    "coordinates": {
      "lat": 34.17,
      "lng": 74.77
    },
    "hydrologicalData": {
      "drainageArea": 36,
      "rechargeRate": 101,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-8-c-8",
    "slug": "sukhnag-lower-catchment",
    "name": "Sukhnag Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Ganderbal",
    "area": 39,
    "elevation": 2124,
    "coordinates": {
      "lat": 34.18,
      "lng": 74.78
    },
    "hydrologicalData": {
      "drainageArea": 39,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-9-c-9",
    "slug": "ferozpora-catchment",
    "name": "Ferozpora Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kupwara",
    "area": 42,
    "elevation": 2152,
    "coordinates": {
      "lat": 34.19,
      "lng": 74.79
    },
    "hydrologicalData": {
      "drainageArea": 42,
      "rechargeRate": 107,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-10-c-10",
    "slug": "ningal-catchment",
    "name": "Ningal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Anantnag",
    "area": 45,
    "elevation": 2180,
    "coordinates": {
      "lat": 34.2,
      "lng": 74.8
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-11-c-11",
    "slug": "pohru-upper-catchment",
    "name": "Pohru Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kulgam",
    "area": 48,
    "elevation": 2208,
    "coordinates": {
      "lat": 34.21,
      "lng": 74.81
    },
    "hydrologicalData": {
      "drainageArea": 48,
      "rechargeRate": 113,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-12-c-12",
    "slug": "pohru-lower-catchment",
    "name": "Pohru Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Shopian",
    "area": 51,
    "elevation": 2236,
    "coordinates": {
      "lat": 34.22,
      "lng": 74.82
    },
    "hydrologicalData": {
      "drainageArea": 51,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-13-c-13",
    "slug": "lolab-catchment",
    "name": "Lolab Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Pulwama",
    "area": 54,
    "elevation": 2264,
    "coordinates": {
      "lat": 34.23,
      "lng": 74.83
    },
    "hydrologicalData": {
      "drainageArea": 54,
      "rechargeRate": 119,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-14-c-14",
    "slug": "mawar-catchment",
    "name": "Mawar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Srinagar",
    "area": 57,
    "elevation": 2292,
    "coordinates": {
      "lat": 34.24,
      "lng": 74.84
    },
    "hydrologicalData": {
      "drainageArea": 57,
      "rechargeRate": 122,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-15-c-15",
    "slug": "hamal-catchment",
    "name": "Hamal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Budgam",
    "area": 60,
    "elevation": 2320,
    "coordinates": {
      "lat": 34.25,
      "lng": 74.85
    },
    "hydrologicalData": {
      "drainageArea": 60,
      "rechargeRate": 125,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-16-c-16",
    "slug": "erin-catchment",
    "name": "Erin Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Baramulla",
    "area": 63,
    "elevation": 2348,
    "coordinates": {
      "lat": 34.26,
      "lng": 74.86
    },
    "hydrologicalData": {
      "drainageArea": 63,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-17-c-17",
    "slug": "madhumati-catchment",
    "name": "Madhumati Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Bandipora",
    "area": 66,
    "elevation": 2376,
    "coordinates": {
      "lat": 34.27,
      "lng": 74.87
    },
    "hydrologicalData": {
      "drainageArea": 66,
      "rechargeRate": 131,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-18-c-18",
    "slug": "gurez-catchment",
    "name": "Gurez Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Ganderbal",
    "area": 69,
    "elevation": 2404,
    "coordinates": {
      "lat": 34.28,
      "lng": 74.88
    },
    "hydrologicalData": {
      "drainageArea": 69,
      "rechargeRate": 134,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-19-c-19",
    "slug": "sindh-upper-catchment",
    "name": "Sindh Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kupwara",
    "area": 72,
    "elevation": 2432,
    "coordinates": {
      "lat": 34.29,
      "lng": 74.89
    },
    "hydrologicalData": {
      "drainageArea": 72,
      "rechargeRate": 137,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-0-c-20",
    "slug": "sindh-lower-catchment",
    "name": "Sindh Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Anantnag",
    "area": 75,
    "elevation": 2460,
    "coordinates": {
      "lat": 34.3,
      "lng": 74.9
    },
    "hydrologicalData": {
      "drainageArea": 75,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-1-c-21",
    "slug": "wangath-catchment",
    "name": "Wangath Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kulgam",
    "area": 78,
    "elevation": 2488,
    "coordinates": {
      "lat": 34.31,
      "lng": 74.91
    },
    "hydrologicalData": {
      "drainageArea": 78,
      "rechargeRate": 143,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-2-c-22",
    "slug": "kangan-catchment",
    "name": "Kangan Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Shopian",
    "area": 81,
    "elevation": 2516,
    "coordinates": {
      "lat": 34.32,
      "lng": 74.92
    },
    "hydrologicalData": {
      "drainageArea": 81,
      "rechargeRate": 146,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-3-c-23",
    "slug": "sonamarg-catchment",
    "name": "Sonamarg Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Pulwama",
    "area": 84,
    "elevation": 2544,
    "coordinates": {
      "lat": 34.33,
      "lng": 74.93
    },
    "hydrologicalData": {
      "drainageArea": 84,
      "rechargeRate": 149,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-4-c-24",
    "slug": "baltal-catchment",
    "name": "Baltal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Srinagar",
    "area": 87,
    "elevation": 2572,
    "coordinates": {
      "lat": 34.34,
      "lng": 74.94
    },
    "hydrologicalData": {
      "drainageArea": 87,
      "rechargeRate": 152,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-5-c-25",
    "slug": "zojila-catchment",
    "name": "Zojila Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Budgam",
    "area": 90,
    "elevation": 2600,
    "coordinates": {
      "lat": 34.35,
      "lng": 74.95
    },
    "hydrologicalData": {
      "drainageArea": 90,
      "rechargeRate": 155,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-6-c-26",
    "slug": "shalimar-catchment",
    "name": "Shalimar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Baramulla",
    "area": 93,
    "elevation": 2628,
    "coordinates": {
      "lat": 34.36,
      "lng": 74.96
    },
    "hydrologicalData": {
      "drainageArea": 93,
      "rechargeRate": 158,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-7-c-27",
    "slug": "nishat-catchment",
    "name": "Nishat Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Bandipora",
    "area": 16,
    "elevation": 2656,
    "coordinates": {
      "lat": 34.37,
      "lng": 74.97
    },
    "hydrologicalData": {
      "drainageArea": 16,
      "rechargeRate": 161,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-8-c-28",
    "slug": "harwan-catchment",
    "name": "Harwan Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Ganderbal",
    "area": 19,
    "elevation": 2684,
    "coordinates": {
      "lat": 34.38,
      "lng": 74.98
    },
    "hydrologicalData": {
      "drainageArea": 19,
      "rechargeRate": 164,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-9-c-29",
    "slug": "telbal-catchment",
    "name": "Telbal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kupwara",
    "area": 22,
    "elevation": 2712,
    "coordinates": {
      "lat": 34.39,
      "lng": 74.99
    },
    "hydrologicalData": {
      "drainageArea": 22,
      "rechargeRate": 167,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-10-c-30",
    "slug": "nigeen-catchment",
    "name": "Nigeen Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Anantnag",
    "area": 25,
    "elevation": 2740,
    "coordinates": {
      "lat": 34.4,
      "lng": 75
    },
    "hydrologicalData": {
      "drainageArea": 25,
      "rechargeRate": 170,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-11-c-31",
    "slug": "brari-nambal-catchment",
    "name": "Brari Nambal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kulgam",
    "area": 28,
    "elevation": 2768,
    "coordinates": {
      "lat": 34.41,
      "lng": 75.01
    },
    "hydrologicalData": {
      "drainageArea": 28,
      "rechargeRate": 173,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-12-c-32",
    "slug": "anchar-catchment",
    "name": "Anchar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Shopian",
    "area": 31,
    "elevation": 2796,
    "coordinates": {
      "lat": 34.42,
      "lng": 75.02
    },
    "hydrologicalData": {
      "drainageArea": 31,
      "rechargeRate": 176,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-13-c-33",
    "slug": "gilsar-catchment",
    "name": "Gilsar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Pulwama",
    "area": 34,
    "elevation": 2824,
    "coordinates": {
      "lat": 34.43,
      "lng": 75.03
    },
    "hydrologicalData": {
      "drainageArea": 34,
      "rechargeRate": 179,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-14-c-34",
    "slug": "hokersar-buffer-catchment",
    "name": "Hokersar Buffer Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Srinagar",
    "area": 37,
    "elevation": 2852,
    "coordinates": {
      "lat": 34.44,
      "lng": 75.04
    },
    "hydrologicalData": {
      "drainageArea": 37,
      "rechargeRate": 182,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-15-c-35",
    "slug": "shallabugh-buffer-catchment",
    "name": "Shallabugh Buffer Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Budgam",
    "area": 40,
    "elevation": 2880,
    "coordinates": {
      "lat": 34.45,
      "lng": 75.05
    },
    "hydrologicalData": {
      "drainageArea": 40,
      "rechargeRate": 185,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-16-c-36",
    "slug": "hygam-catchment",
    "name": "Hygam Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Baramulla",
    "area": 43,
    "elevation": 2908,
    "coordinates": {
      "lat": 34.46,
      "lng": 75.06
    },
    "hydrologicalData": {
      "drainageArea": 43,
      "rechargeRate": 188,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kishanganga-basin-w-17-c-37",
    "slug": "mirgund-catchment",
    "name": "Mirgund Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Bandipora",
    "area": 46,
    "elevation": 2936,
    "coordinates": {
      "lat": 34.47,
      "lng": 75.07
    },
    "hydrologicalData": {
      "drainageArea": 46,
      "rechargeRate": 191,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lidder-sub-basin-w-18-c-38",
    "slug": "chatlum-catchment",
    "name": "Chatlum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Ganderbal",
    "area": 49,
    "elevation": 2964,
    "coordinates": {
      "lat": 34.48,
      "lng": 75.08
    },
    "hydrologicalData": {
      "drainageArea": 49,
      "rechargeRate": 194,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sind-sub-basin-w-19-c-39",
    "slug": "fashkoori-catchment",
    "name": "Fashkoori Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment.",
    "district": "Kupwara",
    "area": 52,
    "elevation": 2992,
    "coordinates": {
      "lat": 34.49,
      "lng": 75.09
    },
    "hydrologicalData": {
      "drainageArea": 52,
      "rechargeRate": 197,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "vishav-catchment-m-0",
    "slug": "pampore-micro-watershed",
    "name": "Pampore Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Anantnag",
    "area": 5,
    "elevation": 1800,
    "coordinates": {
      "lat": 34.1,
      "lng": 74.7
    },
    "hydrologicalData": {
      "drainageArea": 5,
      "rechargeRate": 50,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "rambiara-catchment-m-1",
    "slug": "khrew-micro-watershed",
    "name": "Khrew Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Kulgam",
    "area": 6,
    "elevation": 1822,
    "coordinates": {
      "lat": 34.11,
      "lng": 74.71
    },
    "hydrologicalData": {
      "drainageArea": 6,
      "rechargeRate": 52,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "romushi-catchment-m-2",
    "slug": "srinagar-urban-micro-watershed",
    "name": "Srinagar Urban Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Shopian",
    "area": 7,
    "elevation": 1844,
    "coordinates": {
      "lat": 34.12,
      "lng": 74.72
    },
    "hydrologicalData": {
      "drainageArea": 7,
      "rechargeRate": 54,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "doodhganga-catchment-m-3",
    "slug": "baramulla-micro-watershed",
    "name": "Baramulla Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Pulwama",
    "area": 8,
    "elevation": 1866,
    "coordinates": {
      "lat": 34.13,
      "lng": 74.73
    },
    "hydrologicalData": {
      "drainageArea": 8,
      "rechargeRate": 56,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "pohru-catchment-m-4",
    "slug": "sopore-micro-watershed",
    "name": "Sopore Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Srinagar",
    "area": 9,
    "elevation": 1888,
    "coordinates": {
      "lat": 34.14,
      "lng": 74.74
    },
    "hydrologicalData": {
      "drainageArea": 9,
      "rechargeRate": 58,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dal-nigeen-catchment-m-5",
    "slug": "bandipora-micro-watershed",
    "name": "Bandipora Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Budgam",
    "area": 10,
    "elevation": 1910,
    "coordinates": {
      "lat": 34.15,
      "lng": 74.75
    },
    "hydrologicalData": {
      "drainageArea": 10,
      "rechargeRate": 60,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "wular-catchment-m-6",
    "slug": "kupwara-micro-watershed",
    "name": "Kupwara Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Baramulla",
    "area": 11,
    "elevation": 1932,
    "coordinates": {
      "lat": 34.16,
      "lng": 74.76
    },
    "hydrologicalData": {
      "drainageArea": 11,
      "rechargeRate": 62,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hokersar-catchment-m-7",
    "slug": "anantnag-karst-micro-watershed",
    "name": "Anantnag Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Bandipora",
    "area": 12,
    "elevation": 1954,
    "coordinates": {
      "lat": 34.17,
      "lng": 74.77
    },
    "hydrologicalData": {
      "drainageArea": 12,
      "rechargeRate": 64,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shallabugh-catchment-m-8",
    "slug": "verinag-aquifer-micro-watershed",
    "name": "Verinag Aquifer Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Ganderbal",
    "area": 13,
    "elevation": 1976,
    "coordinates": {
      "lat": 34.18,
      "lng": 74.78
    },
    "hydrologicalData": {
      "drainageArea": 13,
      "rechargeRate": 66,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "upper-jhelum-catchment-m-9",
    "slug": "kulgam-rice-micro-watershed",
    "name": "Kulgam Rice Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Kupwara",
    "area": 14,
    "elevation": 1998,
    "coordinates": {
      "lat": 34.19,
      "lng": 74.79
    },
    "hydrologicalData": {
      "drainageArea": 14,
      "rechargeRate": 68,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-0",
    "slug": "chenab-upper-watershed",
    "name": "Chenab Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Jammu",
    "area": 40,
    "elevation": 2000,
    "coordinates": {
      "lat": 33,
      "lng": 74.8
    },
    "hydrologicalData": {
      "drainageArea": 40,
      "rechargeRate": 100,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-1",
    "slug": "chenab-lower-watershed",
    "name": "Chenab Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 45,
    "elevation": 2035,
    "coordinates": {
      "lat": 34.22,
      "lng": 77.52
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-2",
    "slug": "marusudar-upper-watershed",
    "name": "Marusudar Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Samba",
    "area": 50,
    "elevation": 2070,
    "coordinates": {
      "lat": 33.04,
      "lng": 74.84
    },
    "hydrologicalData": {
      "drainageArea": 50,
      "rechargeRate": 108,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-3",
    "slug": "marusudar-lower-watershed",
    "name": "Marusudar Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 55,
    "elevation": 2105,
    "coordinates": {
      "lat": 34.26,
      "lng": 77.56
    },
    "hydrologicalData": {
      "drainageArea": 55,
      "rechargeRate": 112,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-4",
    "slug": "pakal-dul-watershed",
    "name": "Pakal Dul Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Reasi",
    "area": 60,
    "elevation": 2140,
    "coordinates": {
      "lat": 33.08,
      "lng": 74.88
    },
    "hydrologicalData": {
      "drainageArea": 60,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-5",
    "slug": "kiru-watershed",
    "name": "Kiru Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 65,
    "elevation": 2175,
    "coordinates": {
      "lat": 34.3,
      "lng": 77.6
    },
    "hydrologicalData": {
      "drainageArea": 65,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-6",
    "slug": "kwar-watershed",
    "name": "Kwar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kishtwar",
    "area": 70,
    "elevation": 2210,
    "coordinates": {
      "lat": 33.12,
      "lng": 74.92
    },
    "hydrologicalData": {
      "drainageArea": 70,
      "rechargeRate": 124,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-7",
    "slug": "kishtwar-watershed",
    "name": "Kishtwar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 75,
    "elevation": 2245,
    "coordinates": {
      "lat": 34.34,
      "lng": 77.64
    },
    "hydrologicalData": {
      "drainageArea": 75,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-8",
    "slug": "paddar-watershed",
    "name": "Paddar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Rajouri",
    "area": 80,
    "elevation": 2280,
    "coordinates": {
      "lat": 33.16,
      "lng": 74.96
    },
    "hydrologicalData": {
      "drainageArea": 80,
      "rechargeRate": 132,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-9",
    "slug": "bhadarwah-watershed",
    "name": "Bhadarwah Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 85,
    "elevation": 2315,
    "coordinates": {
      "lat": 34.38,
      "lng": 77.68
    },
    "hydrologicalData": {
      "drainageArea": 85,
      "rechargeRate": 136,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-10",
    "slug": "doda-watershed",
    "name": "Doda Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Jammu",
    "area": 90,
    "elevation": 2350,
    "coordinates": {
      "lat": 33.2,
      "lng": 75
    },
    "hydrologicalData": {
      "drainageArea": 90,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-11",
    "slug": "ramban-watershed",
    "name": "Ramban Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 95,
    "elevation": 2385,
    "coordinates": {
      "lat": 34.42,
      "lng": 77.72
    },
    "hydrologicalData": {
      "drainageArea": 95,
      "rechargeRate": 144,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-12",
    "slug": "baglihar-watershed",
    "name": "Baglihar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Samba",
    "area": 100,
    "elevation": 2420,
    "coordinates": {
      "lat": 33.24,
      "lng": 75.04
    },
    "hydrologicalData": {
      "drainageArea": 100,
      "rechargeRate": 148,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-13",
    "slug": "reasi-watershed",
    "name": "Reasi Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 105,
    "elevation": 2455,
    "coordinates": {
      "lat": 34.46,
      "lng": 77.76
    },
    "hydrologicalData": {
      "drainageArea": 105,
      "rechargeRate": 152,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-14",
    "slug": "salal-watershed",
    "name": "Salal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Reasi",
    "area": 110,
    "elevation": 2490,
    "coordinates": {
      "lat": 33.28,
      "lng": 75.08
    },
    "hydrologicalData": {
      "drainageArea": 110,
      "rechargeRate": 156,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-15",
    "slug": "tawi-upper-watershed",
    "name": "Tawi Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 115,
    "elevation": 2525,
    "coordinates": {
      "lat": 34.5,
      "lng": 77.8
    },
    "hydrologicalData": {
      "drainageArea": 115,
      "rechargeRate": 160,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-16",
    "slug": "tawi-lower-watershed",
    "name": "Tawi Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kishtwar",
    "area": 120,
    "elevation": 2560,
    "coordinates": {
      "lat": 33.32,
      "lng": 75.12
    },
    "hydrologicalData": {
      "drainageArea": 120,
      "rechargeRate": 164,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-17",
    "slug": "udhampur-watershed",
    "name": "Udhampur Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 125,
    "elevation": 2595,
    "coordinates": {
      "lat": 34.54,
      "lng": 77.84
    },
    "hydrologicalData": {
      "drainageArea": 125,
      "rechargeRate": 168,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-18",
    "slug": "jammu-plain-watershed",
    "name": "Jammu Plain Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Rajouri",
    "area": 130,
    "elevation": 2630,
    "coordinates": {
      "lat": 33.36,
      "lng": 75.16
    },
    "hydrologicalData": {
      "drainageArea": 130,
      "rechargeRate": 172,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-19",
    "slug": "samba-plains-watershed",
    "name": "Samba Plains Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 135,
    "elevation": 2665,
    "coordinates": {
      "lat": 34.58,
      "lng": 77.88
    },
    "hydrologicalData": {
      "drainageArea": 135,
      "rechargeRate": 176,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-20",
    "slug": "kathua-coastal-watershed",
    "name": "Kathua Coastal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Jammu",
    "area": 140,
    "elevation": 2700,
    "coordinates": {
      "lat": 33.4,
      "lng": 75.2
    },
    "hydrologicalData": {
      "drainageArea": 140,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-21",
    "slug": "ranjit-sagar-watershed",
    "name": "Ranjit Sagar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 145,
    "elevation": 2735,
    "coordinates": {
      "lat": 34.62,
      "lng": 77.92
    },
    "hydrologicalData": {
      "drainageArea": 145,
      "rechargeRate": 184,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-22",
    "slug": "ujh-river-upper-watershed",
    "name": "Ujh River Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Samba",
    "area": 150,
    "elevation": 2770,
    "coordinates": {
      "lat": 33.44,
      "lng": 75.24
    },
    "hydrologicalData": {
      "drainageArea": 150,
      "rechargeRate": 188,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-23",
    "slug": "ujh-river-lower-watershed",
    "name": "Ujh River Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 155,
    "elevation": 2805,
    "coordinates": {
      "lat": 34.66,
      "lng": 77.96
    },
    "hydrologicalData": {
      "drainageArea": 155,
      "rechargeRate": 192,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-24",
    "slug": "basantar-watershed",
    "name": "Basantar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Reasi",
    "area": 160,
    "elevation": 2840,
    "coordinates": {
      "lat": 33.48,
      "lng": 75.28
    },
    "hydrologicalData": {
      "drainageArea": 160,
      "rechargeRate": 196,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-25",
    "slug": "devak-watershed",
    "name": "Devak Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kargil",
    "area": 165,
    "elevation": 2875,
    "coordinates": {
      "lat": 34.7,
      "lng": 78
    },
    "hydrologicalData": {
      "drainageArea": 165,
      "rechargeRate": 200,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-26",
    "slug": "kalakote-watershed",
    "name": "Kalakote Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed.",
    "district": "Kishtwar",
    "area": 170,
    "elevation": 2910,
    "coordinates": {
      "lat": 33.52,
      "lng": 75.32
    },
    "hydrologicalData": {
      "drainageArea": 170,
      "rechargeRate": 204,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "basantar-catchment",
    "slug": "basantar-catchment",
    "name": "Basantar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A dry, sub-tropical river catchment. Dries up to small trickles in summer but causes severe flash floods during monsoon.",
    "district": "Samba",
    "area": 580,
    "elevation": 620,
    "coordinates": {
      "lat": 32.58,
      "lng": 75.12
    },
    "hydrologicalData": {
      "drainageArea": 580,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neeru-catchment",
    "slug": "neeru-catchment",
    "name": "Neeru Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major cold-water stream catchment in the Bhaderwah valley. Excellent trout habitat, but threatened by urban extension.",
    "district": "Doda",
    "area": 382,
    "elevation": 2150,
    "coordinates": {
      "lat": 32.98,
      "lng": 75.72
    },
    "hydrologicalData": {
      "drainageArea": 382,
      "rechargeRate": 190,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "puga-geothermal-catchment",
    "slug": "puga-valley-geothermal-catchment",
    "name": "Puga Valley Geothermal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A unique geothermal valley featuring hot springs, mud pools, and sulfur deposits. Ground temperatures at shallow depths exceed 130°C.",
    "district": "Leh",
    "area": 140,
    "elevation": 4850,
    "coordinates": {
      "lat": 33.22,
      "lng": 78.48
    },
    "hydrologicalData": {
      "drainageArea": 140,
      "rechargeRate": 35,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-0-c-0",
    "slug": "nowshera-catchment",
    "name": "Nowshera Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 15,
    "elevation": 1900,
    "coordinates": {
      "lat": 34.2,
      "lng": 77.5
    },
    "hydrologicalData": {
      "drainageArea": 15,
      "rechargeRate": 80,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-1-c-1",
    "slug": "rajouri-upper-catchment",
    "name": "Rajouri Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 18,
    "elevation": 1928,
    "coordinates": {
      "lat": 33.01,
      "lng": 74.81
    },
    "hydrologicalData": {
      "drainageArea": 18,
      "rechargeRate": 83,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-2-c-2",
    "slug": "rajouri-lower-catchment",
    "name": "Rajouri Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 21,
    "elevation": 1956,
    "coordinates": {
      "lat": 34.22,
      "lng": 77.52
    },
    "hydrologicalData": {
      "drainageArea": 21,
      "rechargeRate": 86,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-3-c-3",
    "slug": "poonch-upper-catchment",
    "name": "Poonch Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 24,
    "elevation": 1984,
    "coordinates": {
      "lat": 33.03,
      "lng": 74.83
    },
    "hydrologicalData": {
      "drainageArea": 24,
      "rechargeRate": 89,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-4-c-4",
    "slug": "poonch-lower-catchment",
    "name": "Poonch Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 27,
    "elevation": 2012,
    "coordinates": {
      "lat": 34.24,
      "lng": 77.54
    },
    "hydrologicalData": {
      "drainageArea": 27,
      "rechargeRate": 92,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-5-c-5",
    "slug": "suru-upper-catchment",
    "name": "Suru Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 30,
    "elevation": 2040,
    "coordinates": {
      "lat": 33.05,
      "lng": 74.85
    },
    "hydrologicalData": {
      "drainageArea": 30,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-6-c-6",
    "slug": "suru-lower-catchment",
    "name": "Suru Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 33,
    "elevation": 2068,
    "coordinates": {
      "lat": 34.26,
      "lng": 77.56
    },
    "hydrologicalData": {
      "drainageArea": 33,
      "rechargeRate": 98,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-7-c-7",
    "slug": "sanku-catchment",
    "name": "Sanku Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 36,
    "elevation": 2096,
    "coordinates": {
      "lat": 33.07,
      "lng": 74.87
    },
    "hydrologicalData": {
      "drainageArea": 36,
      "rechargeRate": 101,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-8-c-8",
    "slug": "zanskar-upper-catchment",
    "name": "Zanskar Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 39,
    "elevation": 2124,
    "coordinates": {
      "lat": 34.28,
      "lng": 77.58
    },
    "hydrologicalData": {
      "drainageArea": 39,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-9-c-9",
    "slug": "zanskar-lower-catchment",
    "name": "Zanskar Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 42,
    "elevation": 2152,
    "coordinates": {
      "lat": 33.09,
      "lng": 74.89
    },
    "hydrologicalData": {
      "drainageArea": 42,
      "rechargeRate": 107,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-10-c-10",
    "slug": "padum-catchment",
    "name": "Padum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 45,
    "elevation": 2180,
    "coordinates": {
      "lat": 34.3,
      "lng": 77.6
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-11-c-11",
    "slug": "stod-catchment",
    "name": "Stod Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 48,
    "elevation": 2208,
    "coordinates": {
      "lat": 33.11,
      "lng": 74.91
    },
    "hydrologicalData": {
      "drainageArea": 48,
      "rechargeRate": 113,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-12-c-12",
    "slug": "tsarap-catchment",
    "name": "Tsarap Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 51,
    "elevation": 2236,
    "coordinates": {
      "lat": 34.32,
      "lng": 77.62
    },
    "hydrologicalData": {
      "drainageArea": 51,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-13-c-13",
    "slug": "shyok-upper-catchment",
    "name": "Shyok Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 54,
    "elevation": 2264,
    "coordinates": {
      "lat": 33.13,
      "lng": 74.93
    },
    "hydrologicalData": {
      "drainageArea": 54,
      "rechargeRate": 119,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-14-c-14",
    "slug": "shyok-lower-catchment",
    "name": "Shyok Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 57,
    "elevation": 2292,
    "coordinates": {
      "lat": 34.34,
      "lng": 77.64
    },
    "hydrologicalData": {
      "drainageArea": 57,
      "rechargeRate": 122,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-15-c-15",
    "slug": "nubra-upper-catchment",
    "name": "Nubra Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 60,
    "elevation": 2320,
    "coordinates": {
      "lat": 33.15,
      "lng": 74.95
    },
    "hydrologicalData": {
      "drainageArea": 60,
      "rechargeRate": 125,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-16-c-16",
    "slug": "nubra-lower-catchment",
    "name": "Nubra Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 63,
    "elevation": 2348,
    "coordinates": {
      "lat": 34.36,
      "lng": 77.66
    },
    "hydrologicalData": {
      "drainageArea": 63,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-17-c-17",
    "slug": "siachen-snout-catchment",
    "name": "Siachen snout Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 66,
    "elevation": 2376,
    "coordinates": {
      "lat": 33.17,
      "lng": 74.97
    },
    "hydrologicalData": {
      "drainageArea": 66,
      "rechargeRate": 131,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-18-c-18",
    "slug": "puga-geothermal-catchment",
    "name": "Puga geothermal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 69,
    "elevation": 2404,
    "coordinates": {
      "lat": 34.38,
      "lng": 77.68
    },
    "hydrologicalData": {
      "drainageArea": 69,
      "rechargeRate": 134,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-19-c-19",
    "slug": "hanle-catchment",
    "name": "Hanle Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 72,
    "elevation": 2432,
    "coordinates": {
      "lat": 33.19,
      "lng": 74.99
    },
    "hydrologicalData": {
      "drainageArea": 72,
      "rechargeRate": 137,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-20-c-20",
    "slug": "chushul-catchment",
    "name": "Chushul Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 75,
    "elevation": 2460,
    "coordinates": {
      "lat": 34.4,
      "lng": 77.7
    },
    "hydrologicalData": {
      "drainageArea": 75,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-21-c-21",
    "slug": "nyoma-catchment",
    "name": "Nyoma Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 78,
    "elevation": 2488,
    "coordinates": {
      "lat": 33.21,
      "lng": 75.01
    },
    "hydrologicalData": {
      "drainageArea": 78,
      "rechargeRate": 143,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-22-c-22",
    "slug": "demchok-catchment",
    "name": "Demchok Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 81,
    "elevation": 2516,
    "coordinates": {
      "lat": 34.42,
      "lng": 77.72
    },
    "hydrologicalData": {
      "drainageArea": 81,
      "rechargeRate": 146,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-23-c-23",
    "slug": "changthang-catchment",
    "name": "Changthang Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 84,
    "elevation": 2544,
    "coordinates": {
      "lat": 33.23,
      "lng": 75.03
    },
    "hydrologicalData": {
      "drainageArea": 84,
      "rechargeRate": 149,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-24-c-24",
    "slug": "tso-kar-catchment",
    "name": "Tso Kar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 87,
    "elevation": 2572,
    "coordinates": {
      "lat": 34.44,
      "lng": 77.74
    },
    "hydrologicalData": {
      "drainageArea": 87,
      "rechargeRate": 152,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-25-c-25",
    "slug": "tso-moriri-catchment",
    "name": "Tso Moriri Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 90,
    "elevation": 2600,
    "coordinates": {
      "lat": 33.25,
      "lng": 75.05
    },
    "hydrologicalData": {
      "drainageArea": 90,
      "rechargeRate": 155,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-26-c-26",
    "slug": "pangong-south-catchment",
    "name": "Pangong South Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 93,
    "elevation": 2628,
    "coordinates": {
      "lat": 34.46,
      "lng": 77.76
    },
    "hydrologicalData": {
      "drainageArea": 93,
      "rechargeRate": 158,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-0-c-27",
    "slug": "pangong-north-catchment",
    "name": "Pangong North Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 16,
    "elevation": 2656,
    "coordinates": {
      "lat": 33.27,
      "lng": 75.07
    },
    "hydrologicalData": {
      "drainageArea": 16,
      "rechargeRate": 161,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-1-c-28",
    "slug": "kiagar-catchment",
    "name": "Kiagar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 19,
    "elevation": 2684,
    "coordinates": {
      "lat": 34.48,
      "lng": 77.78
    },
    "hydrologicalData": {
      "drainageArea": 19,
      "rechargeRate": 164,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-2-c-29",
    "slug": "yaye-tso-catchment",
    "name": "Yaye Tso Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 22,
    "elevation": 2712,
    "coordinates": {
      "lat": 33.29,
      "lng": 75.09
    },
    "hydrologicalData": {
      "drainageArea": 22,
      "rechargeRate": 167,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-3-c-30",
    "slug": "startsapuk-catchment",
    "name": "Startsapuk Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 25,
    "elevation": 2740,
    "coordinates": {
      "lat": 34.5,
      "lng": 77.8
    },
    "hydrologicalData": {
      "drainageArea": 25,
      "rechargeRate": 170,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-4-c-31",
    "slug": "shey-ponds-catchment",
    "name": "Shey Ponds Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 28,
    "elevation": 2768,
    "coordinates": {
      "lat": 33.31,
      "lng": 75.11
    },
    "hydrologicalData": {
      "drainageArea": 28,
      "rechargeRate": 173,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-5-c-32",
    "slug": "stakna-catchment",
    "name": "Stakna Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 31,
    "elevation": 2796,
    "coordinates": {
      "lat": 34.52,
      "lng": 77.82
    },
    "hydrologicalData": {
      "drainageArea": 31,
      "rechargeRate": 176,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-6-c-33",
    "slug": "basgo-catchment",
    "name": "Basgo Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 34,
    "elevation": 2824,
    "coordinates": {
      "lat": 33.33,
      "lng": 75.13
    },
    "hydrologicalData": {
      "drainageArea": 34,
      "rechargeRate": 179,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-7-c-34",
    "slug": "likir-catchment",
    "name": "Likir Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 37,
    "elevation": 2852,
    "coordinates": {
      "lat": 34.54,
      "lng": 77.84
    },
    "hydrologicalData": {
      "drainageArea": 37,
      "rechargeRate": 182,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-8-c-35",
    "slug": "phyang-catchment",
    "name": "Phyang Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 40,
    "elevation": 2880,
    "coordinates": {
      "lat": 33.35,
      "lng": 75.15
    },
    "hydrologicalData": {
      "drainageArea": 40,
      "rechargeRate": 185,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-9-c-36",
    "slug": "chemrey-catchment",
    "name": "Chemrey Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 43,
    "elevation": 2908,
    "coordinates": {
      "lat": 34.56,
      "lng": 77.86
    },
    "hydrologicalData": {
      "drainageArea": 43,
      "rechargeRate": 188,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-10-c-37",
    "slug": "kargil-dras-catchment",
    "name": "Kargil Dras Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 46,
    "elevation": 2936,
    "coordinates": {
      "lat": 33.37,
      "lng": 75.17
    },
    "hydrologicalData": {
      "drainageArea": 46,
      "rechargeRate": 191,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-11-c-38",
    "slug": "pensi-la-catchment",
    "name": "Pensi La Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 49,
    "elevation": 2964,
    "coordinates": {
      "lat": 34.58,
      "lng": 77.88
    },
    "hydrologicalData": {
      "drainageArea": 49,
      "rechargeRate": 194,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-12-c-39",
    "slug": "drang-drung-catchment",
    "name": "Drang Drung Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 52,
    "elevation": 2992,
    "coordinates": {
      "lat": 33.39,
      "lng": 75.19
    },
    "hydrologicalData": {
      "drainageArea": 52,
      "rechargeRate": 197,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-13-c-40",
    "slug": "rangdum-catchment",
    "name": "Rangdum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 55,
    "elevation": 3020,
    "coordinates": {
      "lat": 34.6,
      "lng": 77.9
    },
    "hydrologicalData": {
      "drainageArea": 55,
      "rechargeRate": 200,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-14-c-41",
    "slug": "sani-lake-catchment",
    "name": "Sani Lake Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 58,
    "elevation": 3048,
    "coordinates": {
      "lat": 33.41,
      "lng": 75.21
    },
    "hydrologicalData": {
      "drainageArea": 58,
      "rechargeRate": 203,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-15-c-42",
    "slug": "drass-upper-catchment",
    "name": "Drass Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 61,
    "elevation": 3076,
    "coordinates": {
      "lat": 34.62,
      "lng": 77.92
    },
    "hydrologicalData": {
      "drainageArea": 61,
      "rechargeRate": 206,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-16-c-43",
    "slug": "drass-lower-catchment",
    "name": "Drass Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 64,
    "elevation": 3104,
    "coordinates": {
      "lat": 33.43,
      "lng": 75.23
    },
    "hydrologicalData": {
      "drainageArea": 64,
      "rechargeRate": 209,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-17-c-44",
    "slug": "tiger-hill-catchment",
    "name": "Tiger Hill Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 67,
    "elevation": 3132,
    "coordinates": {
      "lat": 34.64,
      "lng": 77.94
    },
    "hydrologicalData": {
      "drainageArea": 67,
      "rechargeRate": 212,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-18-c-45",
    "slug": "mushkoh-catchment",
    "name": "Mushkoh Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 70,
    "elevation": 3160,
    "coordinates": {
      "lat": 33.45,
      "lng": 75.25
    },
    "hydrologicalData": {
      "drainageArea": 70,
      "rechargeRate": 215,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-19-c-46",
    "slug": "batalik-catchment",
    "name": "Batalik Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 73,
    "elevation": 3188,
    "coordinates": {
      "lat": 34.66,
      "lng": 77.96
    },
    "hydrologicalData": {
      "drainageArea": 73,
      "rechargeRate": 218,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-20-c-47",
    "slug": "shingo-catchment",
    "name": "Shingo Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 76,
    "elevation": 3216,
    "coordinates": {
      "lat": 33.47,
      "lng": 75.27
    },
    "hydrologicalData": {
      "drainageArea": 76,
      "rechargeRate": 221,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-21-c-48",
    "slug": "kishtwar-karst-catchment",
    "name": "Kishtwar Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 79,
    "elevation": 3244,
    "coordinates": {
      "lat": 34.68,
      "lng": 77.98
    },
    "hydrologicalData": {
      "drainageArea": 79,
      "rechargeRate": 224,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-22-c-49",
    "slug": "chenab-karst-catchment",
    "name": "Chenab Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 82,
    "elevation": 3272,
    "coordinates": {
      "lat": 33.49,
      "lng": 75.29
    },
    "hydrologicalData": {
      "drainageArea": 82,
      "rechargeRate": 227,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-23-c-50",
    "slug": "tawi-karst-catchment",
    "name": "Tawi Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 85,
    "elevation": 3300,
    "coordinates": {
      "lat": 34.7,
      "lng": 78
    },
    "hydrologicalData": {
      "drainageArea": 85,
      "rechargeRate": 80,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-24-c-51",
    "slug": "udhampur-karst-catchment",
    "name": "Udhampur Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 88,
    "elevation": 3328,
    "coordinates": {
      "lat": 33.51,
      "lng": 75.31
    },
    "hydrologicalData": {
      "drainageArea": 88,
      "rechargeRate": 83,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-25-c-52",
    "slug": "reasi-karst-catchment",
    "name": "Reasi Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 91,
    "elevation": 3356,
    "coordinates": {
      "lat": 34.72,
      "lng": 78.02
    },
    "hydrologicalData": {
      "drainageArea": 91,
      "rechargeRate": 86,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-26-c-53",
    "slug": "doda-karst-catchment",
    "name": "Doda Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 94,
    "elevation": 3384,
    "coordinates": {
      "lat": 33.53,
      "lng": 75.33
    },
    "hydrologicalData": {
      "drainageArea": 94,
      "rechargeRate": 89,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-0-c-54",
    "slug": "ramban-karst-catchment",
    "name": "Ramban Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 17,
    "elevation": 3412,
    "coordinates": {
      "lat": 34.74,
      "lng": 78.04
    },
    "hydrologicalData": {
      "drainageArea": 17,
      "rechargeRate": 92,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-1-c-55",
    "slug": "kathua-karst-catchment",
    "name": "Kathua Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 20,
    "elevation": 3440,
    "coordinates": {
      "lat": 33.55,
      "lng": 75.35
    },
    "hydrologicalData": {
      "drainageArea": 20,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-2-c-56",
    "slug": "samba-karst-catchment",
    "name": "Samba Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 23,
    "elevation": 3468,
    "coordinates": {
      "lat": 34.76,
      "lng": 78.06
    },
    "hydrologicalData": {
      "drainageArea": 23,
      "rechargeRate": 98,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-3-c-57",
    "slug": "rajouri-karst-catchment",
    "name": "Rajouri Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 26,
    "elevation": 3496,
    "coordinates": {
      "lat": 33.57,
      "lng": 75.37
    },
    "hydrologicalData": {
      "drainageArea": 26,
      "rechargeRate": 101,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-4-c-58",
    "slug": "leh-karst-catchment",
    "name": "Leh Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 29,
    "elevation": 1924,
    "coordinates": {
      "lat": 34.78,
      "lng": 78.08
    },
    "hydrologicalData": {
      "drainageArea": 29,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-5-c-59",
    "slug": "kargil-karst-catchment",
    "name": "Kargil Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 32,
    "elevation": 1952,
    "coordinates": {
      "lat": 33.59,
      "lng": 75.39
    },
    "hydrologicalData": {
      "drainageArea": 32,
      "rechargeRate": 107,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-6-c-60",
    "slug": "zanskar-karst-catchment",
    "name": "Zanskar Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 35,
    "elevation": 1980,
    "coordinates": {
      "lat": 34.8,
      "lng": 78.1
    },
    "hydrologicalData": {
      "drainageArea": 35,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-7-c-61",
    "slug": "nubra-karst-catchment",
    "name": "Nubra Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Rajouri",
    "area": 38,
    "elevation": 2008,
    "coordinates": {
      "lat": 33.61,
      "lng": 75.41
    },
    "hydrologicalData": {
      "drainageArea": 38,
      "rechargeRate": 113,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-8-c-62",
    "slug": "puga-karst-catchment",
    "name": "Puga Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 41,
    "elevation": 2036,
    "coordinates": {
      "lat": 34.82,
      "lng": 78.12
    },
    "hydrologicalData": {
      "drainageArea": 41,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-9-c-63",
    "slug": "hanle-karst-catchment",
    "name": "Hanle Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Jammu",
    "area": 44,
    "elevation": 2064,
    "coordinates": {
      "lat": 33.63,
      "lng": 75.43
    },
    "hydrologicalData": {
      "drainageArea": 44,
      "rechargeRate": 119,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-10-c-64",
    "slug": "chushul-karst-catchment",
    "name": "Chushul Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 47,
    "elevation": 2092,
    "coordinates": {
      "lat": 34.84,
      "lng": 78.14
    },
    "hydrologicalData": {
      "drainageArea": 47,
      "rechargeRate": 122,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-11-c-65",
    "slug": "nyoma-karst-catchment",
    "name": "Nyoma Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Samba",
    "area": 50,
    "elevation": 2120,
    "coordinates": {
      "lat": 33.65,
      "lng": 75.45
    },
    "hydrologicalData": {
      "drainageArea": 50,
      "rechargeRate": 125,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-12-c-66",
    "slug": "demchok-karst-catchment",
    "name": "Demchok Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 53,
    "elevation": 2148,
    "coordinates": {
      "lat": 34.86,
      "lng": 78.16
    },
    "hydrologicalData": {
      "drainageArea": 53,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-13-c-67",
    "slug": "changthang-karst-catchment",
    "name": "Changthang Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Reasi",
    "area": 56,
    "elevation": 2176,
    "coordinates": {
      "lat": 33.67,
      "lng": 75.47
    },
    "hydrologicalData": {
      "drainageArea": 56,
      "rechargeRate": 131,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-14-c-68",
    "slug": "tso-kar-karst-catchment",
    "name": "Tso Kar Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 59,
    "elevation": 2204,
    "coordinates": {
      "lat": 34.88,
      "lng": 78.18
    },
    "hydrologicalData": {
      "drainageArea": 59,
      "rechargeRate": 134,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-15-c-69",
    "slug": "tso-moriri-karst-catchment",
    "name": "Tso Moriri Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kishtwar",
    "area": 62,
    "elevation": 2232,
    "coordinates": {
      "lat": 33.69,
      "lng": 75.49
    },
    "hydrologicalData": {
      "drainageArea": 62,
      "rechargeRate": 137,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-16-c-70",
    "slug": "pangong-karst-catchment",
    "name": "Pangong Karst Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment.",
    "district": "Kargil",
    "area": 65,
    "elevation": 2260,
    "coordinates": {
      "lat": 34.9,
      "lng": 78.2
    },
    "hydrologicalData": {
      "drainageArea": 65,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tatapani-kalakote-spring-shed",
    "slug": "tatapani-kalakote-spring-shed",
    "name": "Tatapani Kalakote Spring-Shed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A geothermal aquifer system. The hot springs have high sulfur and radon content, emerging near the Main Boundary Thrust.",
    "district": "Rajouri",
    "area": 45,
    "elevation": 950,
    "coordinates": {
      "lat": 33.2378,
      "lng": 74.4119
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 48,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "panamik-spring-shed",
    "slug": "panamik-hot-spring-spring-shed",
    "name": "Panamik Hot Spring Spring-Shed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Sulfur-rich thermal spring-shed along the Nubra River valley. Associated with structural fault lines of the Karakoram range.",
    "district": "Leh",
    "area": 28,
    "elevation": 3600,
    "coordinates": {
      "lat": 34.7877,
      "lng": 77.5332
    },
    "hydrologicalData": {
      "drainageArea": 28,
      "rechargeRate": 12,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "basantar-catchment-m-0",
    "slug": "kiagar-karst-micro-watershed",
    "name": "Kiagar Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Rajouri",
    "area": 5,
    "elevation": 1800,
    "coordinates": {
      "lat": 33,
      "lng": 74.8
    },
    "hydrologicalData": {
      "drainageArea": 5,
      "rechargeRate": 50,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neeru-catchment-m-1",
    "slug": "yaye-karst-micro-watershed",
    "name": "Yaye Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 6,
    "elevation": 1822,
    "coordinates": {
      "lat": 34.21,
      "lng": 77.51
    },
    "hydrologicalData": {
      "drainageArea": 6,
      "rechargeRate": 52,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "puga-geothermal-catchment-m-2",
    "slug": "startsapuk-karst-micro-watershed",
    "name": "Startsapuk Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Jammu",
    "area": 7,
    "elevation": 1844,
    "coordinates": {
      "lat": 33.02,
      "lng": 74.82
    },
    "hydrologicalData": {
      "drainageArea": 7,
      "rechargeRate": 54,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-0-c-0-m-3",
    "slug": "shey-karst-micro-watershed",
    "name": "Shey Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 8,
    "elevation": 1866,
    "coordinates": {
      "lat": 34.23,
      "lng": 77.53
    },
    "hydrologicalData": {
      "drainageArea": 8,
      "rechargeRate": 56,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-1-c-1-m-4",
    "slug": "stakna-karst-micro-watershed",
    "name": "Stakna Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Samba",
    "area": 9,
    "elevation": 1888,
    "coordinates": {
      "lat": 33.04,
      "lng": 74.84
    },
    "hydrologicalData": {
      "drainageArea": 9,
      "rechargeRate": 58,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-2-c-2-m-5",
    "slug": "basgo-karst-micro-watershed",
    "name": "Basgo Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 10,
    "elevation": 1910,
    "coordinates": {
      "lat": 34.25,
      "lng": 77.55
    },
    "hydrologicalData": {
      "drainageArea": 10,
      "rechargeRate": 60,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-3-c-3-m-6",
    "slug": "likir-karst-micro-watershed",
    "name": "Likir Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Reasi",
    "area": 11,
    "elevation": 1932,
    "coordinates": {
      "lat": 33.06,
      "lng": 74.86
    },
    "hydrologicalData": {
      "drainageArea": 11,
      "rechargeRate": 62,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-4-c-4-m-7",
    "slug": "phyang-karst-micro-watershed",
    "name": "Phyang Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 12,
    "elevation": 1954,
    "coordinates": {
      "lat": 34.27,
      "lng": 77.57
    },
    "hydrologicalData": {
      "drainageArea": 12,
      "rechargeRate": 64,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-5-c-5-m-8",
    "slug": "chemrey-karst-micro-watershed",
    "name": "Chemrey Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kishtwar",
    "area": 13,
    "elevation": 1976,
    "coordinates": {
      "lat": 33.08,
      "lng": 74.88
    },
    "hydrologicalData": {
      "drainageArea": 13,
      "rechargeRate": 66,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-6-c-6-m-9",
    "slug": "kargil-karst-micro-watershed",
    "name": "Kargil Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 14,
    "elevation": 1998,
    "coordinates": {
      "lat": 34.29,
      "lng": 77.59
    },
    "hydrologicalData": {
      "drainageArea": 14,
      "rechargeRate": 68,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "nubra-sub-basin-w-7-c-7-m-10",
    "slug": "pensi-karst-micro-watershed",
    "name": "Pensi Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Rajouri",
    "area": 15,
    "elevation": 2020,
    "coordinates": {
      "lat": 33.1,
      "lng": 74.9
    },
    "hydrologicalData": {
      "drainageArea": 15,
      "rechargeRate": 70,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tawi-sub-basin-w-8-c-8-m-11",
    "slug": "drang-karst-micro-watershed",
    "name": "Drang Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 16,
    "elevation": 2042,
    "coordinates": {
      "lat": 34.31,
      "lng": 77.61
    },
    "hydrologicalData": {
      "drainageArea": 16,
      "rechargeRate": 72,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "marusudar-sub-basin-w-9-c-9-m-12",
    "slug": "rangdum-karst-micro-watershed",
    "name": "Rangdum Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Jammu",
    "area": 17,
    "elevation": 2064,
    "coordinates": {
      "lat": 33.12,
      "lng": 74.92
    },
    "hydrologicalData": {
      "drainageArea": 17,
      "rechargeRate": 74,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ujh-sub-basin-w-10-c-10-m-13",
    "slug": "sani-karst-micro-watershed",
    "name": "Sani Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 18,
    "elevation": 2086,
    "coordinates": {
      "lat": 34.33,
      "lng": 77.63
    },
    "hydrologicalData": {
      "drainageArea": 18,
      "rechargeRate": 76,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "zanskar-sub-basin-w-11-c-11-m-14",
    "slug": "drass-karst-micro-watershed",
    "name": "Drass Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Samba",
    "area": 19,
    "elevation": 2108,
    "coordinates": {
      "lat": 33.14,
      "lng": 74.94
    },
    "hydrologicalData": {
      "drainageArea": 19,
      "rechargeRate": 78,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-sub-basin-w-12-c-12-m-15",
    "slug": "tiger-karst-micro-watershed",
    "name": "Tiger Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 20,
    "elevation": 2130,
    "coordinates": {
      "lat": 34.35,
      "lng": 77.65
    },
    "hydrologicalData": {
      "drainageArea": 20,
      "rechargeRate": 80,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "suru-sub-basin-w-13-c-13-m-16",
    "slug": "mushkoh-karst-micro-watershed",
    "name": "Mushkoh Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Reasi",
    "area": 21,
    "elevation": 2152,
    "coordinates": {
      "lat": 33.16,
      "lng": 74.96
    },
    "hydrologicalData": {
      "drainageArea": 21,
      "rechargeRate": 82,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "dras-sub-basin-w-14-c-14-m-17",
    "slug": "batalik-karst-micro-watershed",
    "name": "Batalik Karst Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 22,
    "elevation": 2174,
    "coordinates": {
      "lat": 34.37,
      "lng": 77.67
    },
    "hydrologicalData": {
      "drainageArea": 22,
      "rechargeRate": 84,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-0",
    "slug": "neelum-upper-watershed",
    "name": "Neelum Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Muzaffarabad",
    "area": 40,
    "elevation": 2000,
    "coordinates": {
      "lat": 34.3,
      "lng": 73.8
    },
    "hydrologicalData": {
      "drainageArea": 40,
      "rechargeRate": 100,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-1",
    "slug": "neelum-lower-watershed",
    "name": "Neelum Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Hunza",
    "area": 45,
    "elevation": 2035,
    "coordinates": {
      "lat": 35.52,
      "lng": 74.52
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-2",
    "slug": "muzaffarabad-jhelum-watershed",
    "name": "Muzaffarabad Jhelum Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Hattian Bala",
    "area": 50,
    "elevation": 2070,
    "coordinates": {
      "lat": 34.34,
      "lng": 73.84
    },
    "hydrologicalData": {
      "drainageArea": 50,
      "rechargeRate": 108,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-3",
    "slug": "kotli-poonch-watershed",
    "name": "Kotli Poonch Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Ghizer",
    "area": 55,
    "elevation": 2105,
    "coordinates": {
      "lat": 35.56,
      "lng": 74.56
    },
    "hydrologicalData": {
      "drainageArea": 55,
      "rechargeRate": 112,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-4",
    "slug": "mirpur-mangla-watershed",
    "name": "Mirpur Mangla Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Haveli",
    "area": 60,
    "elevation": 2140,
    "coordinates": {
      "lat": 34.38,
      "lng": 73.88
    },
    "hydrologicalData": {
      "drainageArea": 60,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-5",
    "slug": "bhimber-plains-watershed",
    "name": "Bhimber plains Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Astore",
    "area": 65,
    "elevation": 2175,
    "coordinates": {
      "lat": 35.6,
      "lng": 74.6
    },
    "hydrologicalData": {
      "drainageArea": 65,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-6",
    "slug": "hattian-bala-watershed",
    "name": "Hattian Bala Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Sudhnoti",
    "area": 70,
    "elevation": 2210,
    "coordinates": {
      "lat": 34.42,
      "lng": 73.92
    },
    "hydrologicalData": {
      "drainageArea": 70,
      "rechargeRate": 124,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-7",
    "slug": "kunhar-joint-watershed",
    "name": "Kunhar Joint Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Shigar",
    "area": 75,
    "elevation": 2245,
    "coordinates": {
      "lat": 35.64,
      "lng": 74.64
    },
    "hydrologicalData": {
      "drainageArea": 75,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-8",
    "slug": "hunza-upper-watershed",
    "name": "Hunza Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Mirpur",
    "area": 80,
    "elevation": 2280,
    "coordinates": {
      "lat": 34.46,
      "lng": 73.96
    },
    "hydrologicalData": {
      "drainageArea": 80,
      "rechargeRate": 132,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-9",
    "slug": "hunza-lower-watershed",
    "name": "Hunza Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Ghanche",
    "area": 85,
    "elevation": 2315,
    "coordinates": {
      "lat": 35.68,
      "lng": 74.68
    },
    "hydrologicalData": {
      "drainageArea": 85,
      "rechargeRate": 136,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-10",
    "slug": "gilgit-upper-watershed",
    "name": "Gilgit Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Muzaffarabad",
    "area": 90,
    "elevation": 2350,
    "coordinates": {
      "lat": 34.5,
      "lng": 74
    },
    "hydrologicalData": {
      "drainageArea": 90,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-11",
    "slug": "gilgit-lower-watershed",
    "name": "Gilgit Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Hunza",
    "area": 95,
    "elevation": 2385,
    "coordinates": {
      "lat": 35.72,
      "lng": 74.72
    },
    "hydrologicalData": {
      "drainageArea": 95,
      "rechargeRate": 144,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-12",
    "slug": "astore-upper-watershed",
    "name": "Astore Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Hattian Bala",
    "area": 100,
    "elevation": 2420,
    "coordinates": {
      "lat": 34.54,
      "lng": 74.04
    },
    "hydrologicalData": {
      "drainageArea": 100,
      "rechargeRate": 148,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-13",
    "slug": "astore-lower-watershed",
    "name": "Astore Lower Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Ghizer",
    "area": 105,
    "elevation": 2455,
    "coordinates": {
      "lat": 35.76,
      "lng": 74.76
    },
    "hydrologicalData": {
      "drainageArea": 105,
      "rechargeRate": 152,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-14",
    "slug": "shigar-glacial-watershed",
    "name": "Shigar Glacial Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Haveli",
    "area": 110,
    "elevation": 2490,
    "coordinates": {
      "lat": 34.58,
      "lng": 74.08
    },
    "hydrologicalData": {
      "drainageArea": 110,
      "rechargeRate": 156,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-15",
    "slug": "kharmang-indus-watershed",
    "name": "Kharmang Indus Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Astore",
    "area": 115,
    "elevation": 2525,
    "coordinates": {
      "lat": 35.8,
      "lng": 74.8
    },
    "hydrologicalData": {
      "drainageArea": 115,
      "rechargeRate": 160,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-16",
    "slug": "ghanche-shyok-watershed",
    "name": "Ghanche Shyok Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Sudhnoti",
    "area": 120,
    "elevation": 2560,
    "coordinates": {
      "lat": 34.62,
      "lng": 74.12
    },
    "hydrologicalData": {
      "drainageArea": 120,
      "rechargeRate": 164,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-17",
    "slug": "hispar-snout-watershed",
    "name": "Hispar snout Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Shigar",
    "area": 125,
    "elevation": 2595,
    "coordinates": {
      "lat": 35.84,
      "lng": 74.84
    },
    "hydrologicalData": {
      "drainageArea": 125,
      "rechargeRate": 168,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-18",
    "slug": "batura-snout-watershed",
    "name": "Batura snout Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Mirpur",
    "area": 130,
    "elevation": 2630,
    "coordinates": {
      "lat": 34.66,
      "lng": 74.16
    },
    "hydrologicalData": {
      "drainageArea": 130,
      "rechargeRate": 172,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-19",
    "slug": "naltar-watershed",
    "name": "Naltar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Ghanche",
    "area": 135,
    "elevation": 2665,
    "coordinates": {
      "lat": 35.88,
      "lng": 74.88
    },
    "hydrologicalData": {
      "drainageArea": 135,
      "rechargeRate": 176,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-20",
    "slug": "ghizer-upper-watershed",
    "name": "Ghizer Upper Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Muzaffarabad",
    "area": 140,
    "elevation": 2700,
    "coordinates": {
      "lat": 34.7,
      "lng": 74.2
    },
    "hydrologicalData": {
      "drainageArea": 140,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-21",
    "slug": "yasin-watershed",
    "name": "Yasin Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed.",
    "district": "Hunza",
    "area": 145,
    "elevation": 2735,
    "coordinates": {
      "lat": 35.92,
      "lng": 74.92
    },
    "hydrologicalData": {
      "drainageArea": 145,
      "rechargeRate": 184,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "poonch-ajk-catchment",
    "slug": "poonch-ajk-catchment",
    "name": "Poonch AJK Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major transboundary tributary of Jhelum. Known for containing the Poonch River National Park, a critical habitat for Endangered Golden Mahseer.",
    "district": "Poonch (AJK)/Kotli/Mirpur",
    "area": 3200,
    "elevation": 1650,
    "coordinates": {
      "lat": 33.52,
      "lng": 73.88
    },
    "hydrologicalData": {
      "drainageArea": 3200,
      "rechargeRate": 240,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kunhar-catchment",
    "slug": "kunhar-catchment",
    "name": "Kunhar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Originating from Lulusar Lake, Kunhar flows through the Kaghan Valley and joins the Jhelum River near Muzaffarabad.",
    "district": "Muzaffarabad",
    "area": 2530,
    "elevation": 2800,
    "coordinates": {
      "lat": 34.45,
      "lng": 73.48
    },
    "hydrologicalData": {
      "drainageArea": 2530,
      "rechargeRate": 280,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "mangla-reservoir-catchment",
    "slug": "mangla-reservoir-catchment",
    "name": "Mangla Reservoir Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Mangla reservoir is the second-largest in Pakistan. Highly affected by siltation from upstream Jhelum, Poonch, and Neelum drainage.",
    "district": "Mirpur/Bhimber",
    "area": 1250,
    "elevation": 540,
    "coordinates": {
      "lat": 33.15,
      "lng": 73.7
    },
    "hydrologicalData": {
      "drainageArea": 1250,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "jhelum-muzaffarabad-catchment",
    "slug": "jhelum-muzaffarabad-catchment",
    "name": "Jhelum Muzaffarabad Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Characterized by highly unstable mountain slopes. In 2005, the Muzaffarabad earthquake caused massive landslides that altered drainage patterns.",
    "district": "Muzaffarabad/Hattian Bala",
    "area": 1980,
    "elevation": 2100,
    "coordinates": {
      "lat": 34.3,
      "lng": 73.55
    },
    "hydrologicalData": {
      "drainageArea": 1980,
      "rechargeRate": 260,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hispar-glacial-catchment",
    "slug": "hispar-glacial-catchment",
    "name": "Hispar Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Drains the massive Hispar Glacier (49 km long). Hispar and Biafo glaciers meet at the Hispar La pass, forming the longest glacial traverse outside polar zones.",
    "district": "Nagar",
    "area": 1840,
    "elevation": 5100,
    "coordinates": {
      "lat": 36.18,
      "lng": 75.15
    },
    "hydrologicalData": {
      "drainageArea": 1840,
      "rechargeRate": 60,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-0-c-0",
    "slug": "rupal-glacial-catchment",
    "name": "Rupal Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hattian Bala",
    "area": 15,
    "elevation": 1900,
    "coordinates": {
      "lat": 34.3,
      "lng": 73.8
    },
    "hydrologicalData": {
      "drainageArea": 15,
      "rechargeRate": 80,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-1-c-1",
    "slug": "salkhala-catchment",
    "name": "Salkhala Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghizer",
    "area": 18,
    "elevation": 1928,
    "coordinates": {
      "lat": 35.51,
      "lng": 74.51
    },
    "hydrologicalData": {
      "drainageArea": 18,
      "rechargeRate": 83,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-2-c-2",
    "slug": "banjosa-catchment",
    "name": "Banjosa Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Haveli",
    "area": 21,
    "elevation": 1956,
    "coordinates": {
      "lat": 34.32,
      "lng": 73.82
    },
    "hydrologicalData": {
      "drainageArea": 21,
      "rechargeRate": 86,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-3-c-3",
    "slug": "baghsar-catchment",
    "name": "Baghsar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Astore",
    "area": 24,
    "elevation": 1984,
    "coordinates": {
      "lat": 35.53,
      "lng": 74.53
    },
    "hydrologicalData": {
      "drainageArea": 24,
      "rechargeRate": 89,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-4-c-4",
    "slug": "mangla-siltation-catchment",
    "name": "Mangla Siltation Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Sudhnoti",
    "area": 27,
    "elevation": 2012,
    "coordinates": {
      "lat": 34.34,
      "lng": 73.84
    },
    "hydrologicalData": {
      "drainageArea": 27,
      "rechargeRate": 92,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-5-c-5",
    "slug": "zalzal-catchment",
    "name": "Zalzal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Shigar",
    "area": 30,
    "elevation": 2040,
    "coordinates": {
      "lat": 35.55,
      "lng": 74.55
    },
    "hydrologicalData": {
      "drainageArea": 30,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-6-c-6",
    "slug": "kel-neelum-catchment",
    "name": "Kel Neelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Mirpur",
    "area": 33,
    "elevation": 2068,
    "coordinates": {
      "lat": 34.36,
      "lng": 73.86
    },
    "hydrologicalData": {
      "drainageArea": 33,
      "rechargeRate": 98,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-7-c-7",
    "slug": "sharda-neelum-catchment",
    "name": "Sharda Neelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghanche",
    "area": 36,
    "elevation": 2096,
    "coordinates": {
      "lat": 35.57,
      "lng": 74.57
    },
    "hydrologicalData": {
      "drainageArea": 36,
      "rechargeRate": 101,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-8-c-8",
    "slug": "athmuqam-catchment",
    "name": "Athmuqam Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Muzaffarabad",
    "area": 39,
    "elevation": 2124,
    "coordinates": {
      "lat": 34.38,
      "lng": 73.88
    },
    "hydrologicalData": {
      "drainageArea": 39,
      "rechargeRate": 104,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-9-c-9",
    "slug": "dudhnial-catchment",
    "name": "Dudhnial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hunza",
    "area": 42,
    "elevation": 2152,
    "coordinates": {
      "lat": 35.59,
      "lng": 74.59
    },
    "hydrologicalData": {
      "drainageArea": 42,
      "rechargeRate": 107,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-10-c-10",
    "slug": "keran-catchment",
    "name": "Keran Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hattian Bala",
    "area": 45,
    "elevation": 2180,
    "coordinates": {
      "lat": 34.4,
      "lng": 73.9
    },
    "hydrologicalData": {
      "drainageArea": 45,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-11-c-11",
    "slug": "kutla-catchment",
    "name": "Kutla Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghizer",
    "area": 48,
    "elevation": 2208,
    "coordinates": {
      "lat": 35.61,
      "lng": 74.61
    },
    "hydrologicalData": {
      "drainageArea": 48,
      "rechargeRate": 113,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-12-c-12",
    "slug": "ratti-gali-catchment",
    "name": "Ratti Gali Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Haveli",
    "area": 51,
    "elevation": 2236,
    "coordinates": {
      "lat": 34.42,
      "lng": 73.92
    },
    "hydrologicalData": {
      "drainageArea": 51,
      "rechargeRate": 116,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-13-c-13",
    "slug": "chitta-katha-catchment",
    "name": "Chitta Katha Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Astore",
    "area": 54,
    "elevation": 2264,
    "coordinates": {
      "lat": 35.63,
      "lng": 74.63
    },
    "hydrologicalData": {
      "drainageArea": 54,
      "rechargeRate": 119,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-14-c-14",
    "slug": "dudipatsar-catchment",
    "name": "Dudipatsar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Sudhnoti",
    "area": 57,
    "elevation": 2292,
    "coordinates": {
      "lat": 34.44,
      "lng": 73.94
    },
    "hydrologicalData": {
      "drainageArea": 57,
      "rechargeRate": 122,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-15-c-15",
    "slug": "saral-catchment",
    "name": "Saral Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Shigar",
    "area": 60,
    "elevation": 2320,
    "coordinates": {
      "lat": 35.65,
      "lng": 74.65
    },
    "hydrologicalData": {
      "drainageArea": 60,
      "rechargeRate": 125,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-16-c-16",
    "slug": "noori-top-catchment",
    "name": "Noori Top Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Mirpur",
    "area": 63,
    "elevation": 2348,
    "coordinates": {
      "lat": 34.46,
      "lng": 73.96
    },
    "hydrologicalData": {
      "drainageArea": 63,
      "rechargeRate": 128,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-17-c-17",
    "slug": "subri-catchment",
    "name": "Subri Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghanche",
    "area": 66,
    "elevation": 2376,
    "coordinates": {
      "lat": 35.67,
      "lng": 74.67
    },
    "hydrologicalData": {
      "drainageArea": 66,
      "rechargeRate": 131,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-18-c-18",
    "slug": "kahil-catchment",
    "name": "Kahil Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Muzaffarabad",
    "area": 69,
    "elevation": 2404,
    "coordinates": {
      "lat": 34.48,
      "lng": 73.98
    },
    "hydrologicalData": {
      "drainageArea": 69,
      "rechargeRate": 134,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-19-c-19",
    "slug": "rawalakot-catchment",
    "name": "Rawalakot Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hunza",
    "area": 72,
    "elevation": 2432,
    "coordinates": {
      "lat": 35.69,
      "lng": 74.69
    },
    "hydrologicalData": {
      "drainageArea": 72,
      "rechargeRate": 137,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-20-c-20",
    "slug": "hajira-catchment",
    "name": "Hajira Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hattian Bala",
    "area": 75,
    "elevation": 2460,
    "coordinates": {
      "lat": 34.5,
      "lng": 74
    },
    "hydrologicalData": {
      "drainageArea": 75,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-21-c-21",
    "slug": "sudhnoti-catchment",
    "name": "Sudhnoti Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghizer",
    "area": 78,
    "elevation": 2488,
    "coordinates": {
      "lat": 35.71,
      "lng": 74.71
    },
    "hydrologicalData": {
      "drainageArea": 78,
      "rechargeRate": 143,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-0-c-22",
    "slug": "kotli-thermal-catchment",
    "name": "Kotli thermal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Haveli",
    "area": 81,
    "elevation": 2516,
    "coordinates": {
      "lat": 34.52,
      "lng": 74.02
    },
    "hydrologicalData": {
      "drainageArea": 81,
      "rechargeRate": 146,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-1-c-23",
    "slug": "mirpur-plains-catchment",
    "name": "Mirpur plains Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Astore",
    "area": 84,
    "elevation": 2544,
    "coordinates": {
      "lat": 35.73,
      "lng": 74.73
    },
    "hydrologicalData": {
      "drainageArea": 84,
      "rechargeRate": 149,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-2-c-24",
    "slug": "bhimber-hills-catchment",
    "name": "Bhimber hills Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Sudhnoti",
    "area": 87,
    "elevation": 2572,
    "coordinates": {
      "lat": 34.54,
      "lng": 74.04
    },
    "hydrologicalData": {
      "drainageArea": 87,
      "rechargeRate": 152,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-3-c-25",
    "slug": "karot-catchment",
    "name": "Karot Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Shigar",
    "area": 90,
    "elevation": 2600,
    "coordinates": {
      "lat": 35.75,
      "lng": 74.75
    },
    "hydrologicalData": {
      "drainageArea": 90,
      "rechargeRate": 155,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-4-c-26",
    "slug": "neelum-jhelum-catchment",
    "name": "Neelum-Jhelum Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Mirpur",
    "area": 93,
    "elevation": 2628,
    "coordinates": {
      "lat": 34.56,
      "lng": 74.06
    },
    "hydrologicalData": {
      "drainageArea": 93,
      "rechargeRate": 158,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-5-c-27",
    "slug": "gulpur-catchment",
    "name": "Gulpur Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghanche",
    "area": 16,
    "elevation": 2656,
    "coordinates": {
      "lat": 35.77,
      "lng": 74.77
    },
    "hydrologicalData": {
      "drainageArea": 16,
      "rechargeRate": 161,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-6-c-28",
    "slug": "patrind-catchment",
    "name": "Patrind Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Muzaffarabad",
    "area": 19,
    "elevation": 2684,
    "coordinates": {
      "lat": 34.58,
      "lng": 74.08
    },
    "hydrologicalData": {
      "drainageArea": 19,
      "rechargeRate": 164,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-7-c-29",
    "slug": "khunjerab-catchment",
    "name": "Khunjerab Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hunza",
    "area": 22,
    "elevation": 2712,
    "coordinates": {
      "lat": 35.79,
      "lng": 74.79
    },
    "hydrologicalData": {
      "drainageArea": 22,
      "rechargeRate": 167,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-8-c-30",
    "slug": "saser-catchment",
    "name": "Saser Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hattian Bala",
    "area": 25,
    "elevation": 2740,
    "coordinates": {
      "lat": 34.6,
      "lng": 74.1
    },
    "hydrologicalData": {
      "drainageArea": 25,
      "rechargeRate": 170,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-9-c-31",
    "slug": "shimshal-catchment",
    "name": "Shimshal Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghizer",
    "area": 28,
    "elevation": 2768,
    "coordinates": {
      "lat": 35.81,
      "lng": 74.81
    },
    "hydrologicalData": {
      "drainageArea": 28,
      "rechargeRate": 173,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-10-c-32",
    "slug": "misgar-catchment",
    "name": "Misgar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Haveli",
    "area": 31,
    "elevation": 2796,
    "coordinates": {
      "lat": 34.62,
      "lng": 74.12
    },
    "hydrologicalData": {
      "drainageArea": 31,
      "rechargeRate": 176,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-11-c-33",
    "slug": "nagar-catchment",
    "name": "Nagar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Astore",
    "area": 34,
    "elevation": 2824,
    "coordinates": {
      "lat": 35.83,
      "lng": 74.83
    },
    "hydrologicalData": {
      "drainageArea": 34,
      "rechargeRate": 179,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-12-c-34",
    "slug": "bagrot-catchment",
    "name": "Bagrot Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Sudhnoti",
    "area": 37,
    "elevation": 2852,
    "coordinates": {
      "lat": 34.64,
      "lng": 74.14
    },
    "hydrologicalData": {
      "drainageArea": 37,
      "rechargeRate": 182,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-13-c-35",
    "slug": "gupis-yasin-catchment",
    "name": "Gupis-Yasin Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Shigar",
    "area": 40,
    "elevation": 2880,
    "coordinates": {
      "lat": 35.85,
      "lng": 74.85
    },
    "hydrologicalData": {
      "drainageArea": 40,
      "rechargeRate": 185,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-14-c-36",
    "slug": "ishkoman-catchment",
    "name": "Ishkoman Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Mirpur",
    "area": 43,
    "elevation": 2908,
    "coordinates": {
      "lat": 34.66,
      "lng": 74.16
    },
    "hydrologicalData": {
      "drainageArea": 43,
      "rechargeRate": 188,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-15-c-37",
    "slug": "phander-catchment",
    "name": "Phander Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghanche",
    "area": 46,
    "elevation": 2936,
    "coordinates": {
      "lat": 35.87,
      "lng": 74.87
    },
    "hydrologicalData": {
      "drainageArea": 46,
      "rechargeRate": 191,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-16-c-38",
    "slug": "handrap-catchment",
    "name": "Handrap Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Muzaffarabad",
    "area": 49,
    "elevation": 2964,
    "coordinates": {
      "lat": 34.68,
      "lng": 74.18
    },
    "hydrologicalData": {
      "drainageArea": 49,
      "rechargeRate": 194,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-17-c-39",
    "slug": "skardu-catchment",
    "name": "Skardu Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hunza",
    "area": 52,
    "elevation": 2992,
    "coordinates": {
      "lat": 35.89,
      "lng": 74.89
    },
    "hydrologicalData": {
      "drainageArea": 52,
      "rechargeRate": 197,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-18-c-40",
    "slug": "satpara-catchment",
    "name": "Satpara Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Hattian Bala",
    "area": 55,
    "elevation": 3020,
    "coordinates": {
      "lat": 34.7,
      "lng": 74.2
    },
    "hydrologicalData": {
      "drainageArea": 55,
      "rechargeRate": 200,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-19-c-41",
    "slug": "kachura-catchment",
    "name": "Kachura Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghizer",
    "area": 58,
    "elevation": 3048,
    "coordinates": {
      "lat": 35.91,
      "lng": 74.91
    },
    "hydrologicalData": {
      "drainageArea": 58,
      "rechargeRate": 203,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-20-c-42",
    "slug": "shangrila-catchment",
    "name": "Shangrila Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Haveli",
    "area": 61,
    "elevation": 3076,
    "coordinates": {
      "lat": 34.72,
      "lng": 74.22
    },
    "hydrologicalData": {
      "drainageArea": 61,
      "rechargeRate": 206,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-21-c-43",
    "slug": "shigar-upper-catchment",
    "name": "Shigar Upper Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Astore",
    "area": 64,
    "elevation": 3104,
    "coordinates": {
      "lat": 35.93,
      "lng": 74.93
    },
    "hydrologicalData": {
      "drainageArea": 64,
      "rechargeRate": 209,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-0-c-44",
    "slug": "shigar-lower-catchment",
    "name": "Shigar Lower Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Sudhnoti",
    "area": 67,
    "elevation": 3132,
    "coordinates": {
      "lat": 34.74,
      "lng": 74.24
    },
    "hydrologicalData": {
      "drainageArea": 67,
      "rechargeRate": 212,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-1-c-45",
    "slug": "basha-catchment",
    "name": "Basha Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Shigar",
    "area": 70,
    "elevation": 3160,
    "coordinates": {
      "lat": 35.95,
      "lng": 74.95
    },
    "hydrologicalData": {
      "drainageArea": 70,
      "rechargeRate": 215,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-2-c-46",
    "slug": "braldu-catchment",
    "name": "Braldu Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Mirpur",
    "area": 73,
    "elevation": 3188,
    "coordinates": {
      "lat": 34.76,
      "lng": 74.26
    },
    "hydrologicalData": {
      "drainageArea": 73,
      "rechargeRate": 218,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-3-c-47",
    "slug": "k2-meltwater-catchment",
    "name": "K2 meltwater Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment.",
    "district": "Ghanche",
    "area": 76,
    "elevation": 3216,
    "coordinates": {
      "lat": 35.97,
      "lng": 74.97
    },
    "hydrologicalData": {
      "drainageArea": 76,
      "rechargeRate": 221,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "spring-tatta-pani-kotli-spring-shed",
    "slug": "spring-tatta-pani-kotli-spring-shed",
    "name": "Spring Tatta Pani Kotli Spring-Shed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A well-known hot sulfur spring on the banks of the Poonch River. The springs emerge under significant pressure from the underground fault lines.",
    "district": "Kotli",
    "area": 32,
    "elevation": 780,
    "coordinates": {
      "lat": 33.5139,
      "lng": 73.9744
    },
    "hydrologicalData": {
      "drainageArea": 32,
      "rechargeRate": 34,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment"
    ],
    "region": "AJK",
    "verificationStatus": "under-review",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "poonch-ajk-catchment-m-0",
    "slug": "kondus-micro-watershed",
    "name": "Kondus Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Muzaffarabad",
    "area": 5,
    "elevation": 1800,
    "coordinates": {
      "lat": 34.3,
      "lng": 73.8
    },
    "hydrologicalData": {
      "drainageArea": 5,
      "rechargeRate": 50,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kunhar-catchment-m-1",
    "slug": "saltoro-micro-watershed",
    "name": "Saltoro Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Hunza",
    "area": 6,
    "elevation": 1822,
    "coordinates": {
      "lat": 35.51,
      "lng": 74.51
    },
    "hydrologicalData": {
      "drainageArea": 6,
      "rechargeRate": 52,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "mangla-reservoir-catchment-m-2",
    "slug": "kharmang-valley-micro-watershed",
    "name": "Kharmang Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Hattian Bala",
    "area": 7,
    "elevation": 1844,
    "coordinates": {
      "lat": 34.32,
      "lng": 73.82
    },
    "hydrologicalData": {
      "drainageArea": 7,
      "rechargeRate": 54,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "jhelum-muzaffarabad-catchment-m-3",
    "slug": "roundu-micro-watershed",
    "name": "Roundu Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Ghizer",
    "area": 8,
    "elevation": 1866,
    "coordinates": {
      "lat": 35.53,
      "lng": 74.53
    },
    "hydrologicalData": {
      "drainageArea": 8,
      "rechargeRate": 56,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hispar-glacial-catchment-m-4",
    "slug": "darel-micro-watershed",
    "name": "Darel Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Haveli",
    "area": 9,
    "elevation": 1888,
    "coordinates": {
      "lat": 34.34,
      "lng": 73.84
    },
    "hydrologicalData": {
      "drainageArea": 9,
      "rechargeRate": 58,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-0-c-0-m-5",
    "slug": "tangir-micro-watershed",
    "name": "Tangir Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Astore",
    "area": 10,
    "elevation": 1910,
    "coordinates": {
      "lat": 35.55,
      "lng": 74.55
    },
    "hydrologicalData": {
      "drainageArea": 10,
      "rechargeRate": 60,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-1-c-1-m-6",
    "slug": "astor-upper-micro-watershed",
    "name": "Astor Upper Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Sudhnoti",
    "area": 11,
    "elevation": 1932,
    "coordinates": {
      "lat": 34.36,
      "lng": 73.86
    },
    "hydrologicalData": {
      "drainageArea": 11,
      "rechargeRate": 62,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-2-c-2-m-7",
    "slug": "astor-lower-micro-watershed",
    "name": "Astor Lower Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Shigar",
    "area": 12,
    "elevation": 1954,
    "coordinates": {
      "lat": 35.57,
      "lng": 74.57
    },
    "hydrologicalData": {
      "drainageArea": 12,
      "rechargeRate": 64,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-3-c-3-m-8",
    "slug": "minimarg-micro-watershed",
    "name": "Minimarg Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Mirpur",
    "area": 13,
    "elevation": 1976,
    "coordinates": {
      "lat": 34.38,
      "lng": 73.88
    },
    "hydrologicalData": {
      "drainageArea": 13,
      "rechargeRate": 66,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "astore-sub-basin-w-4-c-4-m-9",
    "slug": "kamri-micro-watershed",
    "name": "Kamri Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Ghanche",
    "area": 14,
    "elevation": 1998,
    "coordinates": {
      "lat": 35.59,
      "lng": 74.59
    },
    "hydrologicalData": {
      "drainageArea": 14,
      "rechargeRate": 68,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neelum-ajk-basin-w-5-c-5-m-10",
    "slug": "rupal-valley-micro-watershed",
    "name": "Rupal Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Muzaffarabad",
    "area": 15,
    "elevation": 2020,
    "coordinates": {
      "lat": 34.4,
      "lng": 73.9
    },
    "hydrologicalData": {
      "drainageArea": 15,
      "rechargeRate": 70,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hunza-sub-basin-w-6-c-6-m-11",
    "slug": "bunji-micro-watershed",
    "name": "Bunji Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Hunza",
    "area": 16,
    "elevation": 2042,
    "coordinates": {
      "lat": 35.61,
      "lng": 74.61
    },
    "hydrologicalData": {
      "drainageArea": 16,
      "rechargeRate": 72,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-sub-basin-w-7-c-7-m-12",
    "slug": "chilas-micro-watershed",
    "name": "Chilas Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Hattian Bala",
    "area": 17,
    "elevation": 2064,
    "coordinates": {
      "lat": 34.42,
      "lng": 73.92
    },
    "hydrologicalData": {
      "drainageArea": 17,
      "rechargeRate": 74,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shigar-sub-basin-w-8-c-8-m-13",
    "slug": "neelum-upper-micro-watershed",
    "name": "Neelum Upper Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Ghizer",
    "area": 18,
    "elevation": 2086,
    "coordinates": {
      "lat": 35.63,
      "lng": 74.63
    },
    "hydrologicalData": {
      "drainageArea": 18,
      "rechargeRate": 76,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "moderate"
    },
    "threats": [
      "climate-change"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sasara-watershed",
    "slug": "sasara-watershed",
    "name": "Sasara Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Sasara drainage line.",
    "district": "Pulwama/Shopian",
    "area": 185.5,
    "elevation": 2200,
    "coordinates": {
      "lat": 33.8,
      "lng": 74.9
    },
    "hydrologicalData": {
      "drainageArea": 185.5,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shaliganga-watershed",
    "slug": "shaliganga-watershed",
    "name": "Shaliganga Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Shaliganga drainage line.",
    "district": "Budgam",
    "area": 215.2,
    "elevation": 2450,
    "coordinates": {
      "lat": 33.9,
      "lng": 74.6
    },
    "hydrologicalData": {
      "drainageArea": 215.2,
      "rechargeRate": 145,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "lolab-watershed",
    "slug": "lolab-watershed",
    "name": "Lolab Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Lolab drainage line.",
    "district": "Kupwara",
    "area": 320.5,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.45,
      "lng": 74.3
    },
    "hydrologicalData": {
      "drainageArea": 320.5,
      "rechargeRate": 190,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kahmil-watershed",
    "slug": "kahmil-watershed",
    "name": "Kahmil Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Kahmil drainage line.",
    "district": "Kupwara",
    "area": 245.8,
    "elevation": 2100,
    "coordinates": {
      "lat": 34.4,
      "lng": 74.2
    },
    "hydrologicalData": {
      "drainageArea": 245.8,
      "rechargeRate": 165,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "mawar-watershed",
    "slug": "mawar-watershed",
    "name": "Mawar Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Mawar drainage line.",
    "district": "Kupwara",
    "area": 195.6,
    "elevation": 2050,
    "coordinates": {
      "lat": 34.35,
      "lng": 74.15
    },
    "hydrologicalData": {
      "drainageArea": 195.6,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hamal-watershed",
    "slug": "hamal-watershed",
    "name": "Hamal Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Hamal drainage line.",
    "district": "Baramulla/Kupwara",
    "area": 175.4,
    "elevation": 1950,
    "coordinates": {
      "lat": 34.3,
      "lng": 74.25
    },
    "hydrologicalData": {
      "drainageArea": 175.4,
      "rechargeRate": 115,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bulkul-watershed",
    "slug": "bulkul-watershed",
    "name": "Bulkul Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Bulkul drainage line.",
    "district": "Baramulla",
    "area": 135.2,
    "elevation": 1850,
    "coordinates": {
      "lat": 34.25,
      "lng": 74.3
    },
    "hydrologicalData": {
      "drainageArea": 135.2,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sasara-watershed-m-0",
    "slug": "sasara-micro-watershed",
    "name": "Sasara Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Pulwama",
    "area": 15.5,
    "elevation": 1800,
    "coordinates": {
      "lat": 33.81,
      "lng": 74.91
    },
    "hydrologicalData": {
      "drainageArea": 15.5,
      "rechargeRate": 50,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shaliganga-watershed-m-0",
    "slug": "shaliganga-micro-watershed",
    "name": "Shaliganga Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed.",
    "district": "Budgam",
    "area": 18.2,
    "elevation": 1950,
    "coordinates": {
      "lat": 33.91,
      "lng": 74.61
    },
    "hydrologicalData": {
      "drainageArea": 18.2,
      "rechargeRate": 60,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neeru-watershed",
    "slug": "neeru-watershed",
    "name": "Neeru Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Neeru drainage line.",
    "district": "Doda",
    "area": 245.5,
    "elevation": 2500,
    "coordinates": {
      "lat": 33.15,
      "lng": 75.6
    },
    "hydrologicalData": {
      "drainageArea": 245.5,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kalnai-watershed",
    "slug": "kalnai-watershed",
    "name": "Kalnai Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Kalnai drainage line.",
    "district": "Doda",
    "area": 215.8,
    "elevation": 2600,
    "coordinates": {
      "lat": 33.22,
      "lng": 75.7
    },
    "hydrologicalData": {
      "drainageArea": 215.8,
      "rechargeRate": 160,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bishleri-watershed",
    "slug": "bishleri-watershed",
    "name": "Bishleri Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Bishleri drainage line.",
    "district": "Ramban",
    "area": 195.4,
    "elevation": 2150,
    "coordinates": {
      "lat": 33.3,
      "lng": 75.2
    },
    "hydrologicalData": {
      "drainageArea": 195.4,
      "rechargeRate": 135,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ans-watershed",
    "slug": "ans-watershed",
    "name": "Ans Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Ans drainage line.",
    "district": "Reasi/Ramban",
    "area": 265.8,
    "elevation": 2320,
    "coordinates": {
      "lat": 33.2,
      "lng": 74.8
    },
    "hydrologicalData": {
      "drainageArea": 265.8,
      "rechargeRate": 170,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "wakha-watershed",
    "slug": "wakha-watershed",
    "name": "Wakha Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Wakha drainage line.",
    "district": "Kargil",
    "area": 380.2,
    "elevation": 3950,
    "coordinates": {
      "lat": 34.4,
      "lng": 76.25
    },
    "hydrologicalData": {
      "drainageArea": 380.2,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kanji-watershed",
    "slug": "kanji-watershed",
    "name": "Kanji Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Kanji drainage line.",
    "district": "Kargil",
    "area": 295.4,
    "elevation": 4250,
    "coordinates": {
      "lat": 34.22,
      "lng": 76.45
    },
    "hydrologicalData": {
      "drainageArea": 295.4,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hanle-watershed",
    "slug": "hanle-watershed",
    "name": "Hanle Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Hanle drainage line.",
    "district": "Leh",
    "area": 540.2,
    "elevation": 4800,
    "coordinates": {
      "lat": 32.8,
      "lng": 79
    },
    "hydrologicalData": {
      "drainageArea": 540.2,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "chushul-watershed",
    "slug": "chushul-watershed",
    "name": "Chushul Watershed",
    "type": "watershed",
    "category": "Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Chushul drainage line.",
    "district": "Leh",
    "area": 410.5,
    "elevation": 4950,
    "coordinates": {
      "lat": 33.6,
      "lng": 78.6
    },
    "hydrologicalData": {
      "drainageArea": 410.5,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "neeru-watershed-m-0",
    "slug": "neeru-micro-watershed",
    "name": "Neeru Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Doda",
    "area": 15.2,
    "elevation": 1550,
    "coordinates": {
      "lat": 33.16,
      "lng": 75.61
    },
    "hydrologicalData": {
      "drainageArea": 15.2,
      "rechargeRate": 70,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kalnai-watershed-m-0",
    "slug": "kalnai-micro-watershed",
    "name": "Kalnai Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Doda",
    "area": 12.8,
    "elevation": 1600,
    "coordinates": {
      "lat": 33.23,
      "lng": 75.71
    },
    "hydrologicalData": {
      "drainageArea": 12.8,
      "rechargeRate": 65,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "wakha-watershed-m-0",
    "slug": "wakha-micro-watershed",
    "name": "Wakha Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed.",
    "district": "Kargil",
    "area": 18.5,
    "elevation": 3100,
    "coordinates": {
      "lat": 34.41,
      "lng": 76.26
    },
    "hydrologicalData": {
      "drainageArea": 18.5,
      "rechargeRate": 55,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ghizer-sub-basin",
    "slug": "ghizer-sub-basin",
    "name": "Ghizer Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Ghizer drainage line.",
    "district": "Ghizer",
    "area": 645.5,
    "elevation": 3800,
    "coordinates": {
      "lat": 36.2,
      "lng": 73.8
    },
    "hydrologicalData": {
      "drainageArea": 645.5,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "yasin-sub-basin",
    "slug": "yasin-sub-basin",
    "name": "Yasin Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Yasin drainage line.",
    "district": "Gupis-Yasin",
    "area": 512.8,
    "elevation": 3950,
    "coordinates": {
      "lat": 36.4,
      "lng": 73.4
    },
    "hydrologicalData": {
      "drainageArea": 512.8,
      "rechargeRate": 155,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "ishkoman-sub-basin",
    "slug": "ishkoman-sub-basin",
    "name": "Ishkoman Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Ishkoman drainage line.",
    "district": "Ghizer",
    "area": 485.4,
    "elevation": 3750,
    "coordinates": {
      "lat": 36.5,
      "lng": 73.9
    },
    "hydrologicalData": {
      "drainageArea": 485.4,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "naltar-sub-basin",
    "slug": "naltar-sub-basin",
    "name": "Naltar Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Naltar drainage line.",
    "district": "Gilgit",
    "area": 245.2,
    "elevation": 3200,
    "coordinates": {
      "lat": 36.1,
      "lng": 74.2
    },
    "hydrologicalData": {
      "drainageArea": 245.2,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shimshal-sub-basin",
    "slug": "shimshal-sub-basin",
    "name": "Shimshal Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Shimshal drainage line.",
    "district": "Hunza",
    "area": 954.2,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.4,
      "lng": 75.3
    },
    "hydrologicalData": {
      "drainageArea": 954.2,
      "rechargeRate": 145,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bagrot-sub-basin",
    "slug": "bagrot-sub-basin",
    "name": "Bagrot Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Bagrot drainage line.",
    "district": "Gilgit",
    "area": 385.4,
    "elevation": 3500,
    "coordinates": {
      "lat": 36,
      "lng": 74.5
    },
    "hydrologicalData": {
      "drainageArea": 385.4,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bunji-sub-basin",
    "slug": "bunji-sub-basin",
    "name": "Bunji Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Bunji drainage line.",
    "district": "Astore/Gilgit",
    "area": 295.8,
    "elevation": 2200,
    "coordinates": {
      "lat": 35.6,
      "lng": 74.6
    },
    "hydrologicalData": {
      "drainageArea": 295.8,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "chilas-sub-basin",
    "slug": "chilas-sub-basin",
    "name": "Chilas Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Chilas drainage line.",
    "district": "Diamer",
    "area": 412.5,
    "elevation": 2500,
    "coordinates": {
      "lat": 35.4,
      "lng": 74.1
    },
    "hydrologicalData": {
      "drainageArea": 412.5,
      "rechargeRate": 115,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kunhar-catchment",
    "slug": "kunhar-catchment",
    "name": "Kunhar Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Originating from Lulusar Lake, Kunhar flows through the Kaghan Valley and joins the Jhelum River near Muzaffarabad.",
    "district": "Muzaffarabad",
    "area": 185.2,
    "elevation": 2300,
    "coordinates": {
      "lat": 34.35,
      "lng": 73.5
    },
    "hydrologicalData": {
      "drainageArea": 185.2,
      "rechargeRate": 125,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kel-catchment",
    "slug": "kel-catchment",
    "name": "Kel Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Kel drainage line.",
    "district": "Neelum",
    "area": 245.5,
    "elevation": 3400,
    "coordinates": {
      "lat": 34.8,
      "lng": 74.35
    },
    "hydrologicalData": {
      "drainageArea": 245.5,
      "rechargeRate": 165,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sharda-catchment",
    "slug": "sharda-catchment",
    "name": "Sharda Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Sharda drainage line.",
    "district": "Neelum",
    "area": 195.6,
    "elevation": 3200,
    "coordinates": {
      "lat": 34.65,
      "lng": 74.15
    },
    "hydrologicalData": {
      "drainageArea": 195.6,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "athmuqam-catchment",
    "slug": "athmuqam-catchment",
    "name": "Athmuqam Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Athmuqam drainage line.",
    "district": "Neelum",
    "area": 175.4,
    "elevation": 2800,
    "coordinates": {
      "lat": 34.5,
      "lng": 73.9
    },
    "hydrologicalData": {
      "drainageArea": 175.4,
      "rechargeRate": 115,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "karen-catchment",
    "slug": "karen-catchment",
    "name": "Karen Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Karen drainage line.",
    "district": "Neelum",
    "area": 135.2,
    "elevation": 2750,
    "coordinates": {
      "lat": 34.58,
      "lng": 73.95
    },
    "hydrologicalData": {
      "drainageArea": 135.2,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "batura-glacial-catchment",
    "slug": "batura-glacial-catchment",
    "name": "Batura Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Batura drainage line.",
    "district": "Hunza",
    "area": 380.2,
    "elevation": 5000,
    "coordinates": {
      "lat": 36.55,
      "lng": 74.45
    },
    "hydrologicalData": {
      "drainageArea": 380.2,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "hispar-glacial-catchment-new",
    "slug": "hispar-glacial-catchment-new",
    "name": "Hispar Glacial Catchment New",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Hispar drainage line.",
    "district": "Nagar",
    "area": 295.4,
    "elevation": 5100,
    "coordinates": {
      "lat": 36.15,
      "lng": 74.85
    },
    "hydrologicalData": {
      "drainageArea": 295.4,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "biafo-glacial-catchment",
    "slug": "biafo-glacial-catchment",
    "name": "Biafo Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Biafo drainage line.",
    "district": "Shigar",
    "area": 540.2,
    "elevation": 5150,
    "coordinates": {
      "lat": 35.8,
      "lng": 75.7
    },
    "hydrologicalData": {
      "drainageArea": 540.2,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "baltoro-glacial-catchment",
    "slug": "baltoro-glacial-catchment",
    "name": "Baltoro Glacial Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Baltoro drainage line.",
    "district": "Shigar",
    "area": 745.8,
    "elevation": 5500,
    "coordinates": {
      "lat": 35.75,
      "lng": 76.1
    },
    "hydrologicalData": {
      "drainageArea": 745.8,
      "rechargeRate": 165,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "rupal-valley-catchment",
    "slug": "rupal-valley-catchment",
    "name": "Rupal Valley Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Rupal Valley drainage line.",
    "district": "Astore",
    "area": 245.5,
    "elevation": 3950,
    "coordinates": {
      "lat": 35.2,
      "lng": 74.7
    },
    "hydrologicalData": {
      "drainageArea": 245.5,
      "rechargeRate": 125,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "salkhala-micro-watershed",
    "slug": "salkhala-micro-watershed",
    "name": "Salkhala Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Neelum",
    "area": 12.5,
    "elevation": 2400,
    "coordinates": {
      "lat": 34.81,
      "lng": 74.36
    },
    "hydrologicalData": {
      "drainageArea": 12.5,
      "rechargeRate": 55,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "banjosa-micro-watershed",
    "slug": "banjosa-micro-watershed",
    "name": "Banjosa Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed.",
    "district": "Poonch (AJK)",
    "area": 14.2,
    "elevation": 2100,
    "coordinates": {
      "lat": 33.81,
      "lng": 73.86
    },
    "hydrologicalData": {
      "drainageArea": 14.2,
      "rechargeRate": 65,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "AJK",
    "verificationStatus": "reviewed",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "shyok-basin",
    "slug": "shyok-basin",
    "name": "Shyok Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A major transboundary river basin originating from the Rimo Glacier. Known for glacial outburst floods (GLOFs) and high tectonic activity.",
    "district": "Leh/Ghanche",
    "area": 10250,
    "elevation": 4800,
    "coordinates": {
      "lat": 34.6,
      "lng": 77.8
    },
    "hydrologicalData": {
      "drainageArea": 10250,
      "rechargeRate": 180,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gilgit-basin",
    "slug": "gilgit-basin",
    "name": "Gilgit Basin",
    "type": "watershed",
    "category": "Major Basin",
    "description": "A major sub-basin of the Upper Indus Basin, draining the Hindu Kush range. Characterized by high glaciated terrain and frequent landslide damming.",
    "district": "Gilgit/Ghizer/Gupis-Yasin",
    "area": 12100,
    "elevation": 3850,
    "coordinates": {
      "lat": 36.15,
      "lng": 73.8
    },
    "hydrologicalData": {
      "drainageArea": 12100,
      "rechargeRate": 210,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "east-lidder-sub-basin",
    "slug": "east-lidder-sub-basin",
    "name": "East Lidder Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Originating from the Kolahoi and Sheshnag glaciers, it merges with the West Lidder at Pahalgam. Crucial for the Amarnath Yatra pilgrimage route.",
    "district": "Anantnag",
    "area": 450.5,
    "elevation": 3500,
    "coordinates": {
      "lat": 34.08,
      "lng": 75.32
    },
    "hydrologicalData": {
      "drainageArea": 450.5,
      "rechargeRate": 185,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "west-lidder-sub-basin",
    "slug": "west-lidder-sub-basin",
    "name": "West Lidder Sub-Basin",
    "type": "watershed",
    "category": "Major Sub-Basin",
    "description": "Originating from the Kolahoi Glacier near Aru Valley. Highly sensitive to glacier retreat and climate warming.",
    "district": "Anantnag",
    "area": 380.2,
    "elevation": 3700,
    "coordinates": {
      "lat": 34.12,
      "lng": 75.25
    },
    "hydrologicalData": {
      "drainageArea": 380.2,
      "rechargeRate": 175,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "chandanwari-catchment",
    "slug": "chandanwari-catchment",
    "name": "Chandanwari Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A critical high-altitude catchment along the Amarnath Yatra track. Subject to intense tourist pressure and high soil erosion risk.",
    "district": "Anantnag",
    "area": 125.4,
    "elevation": 3450,
    "coordinates": {
      "lat": 34.09,
      "lng": 75.35
    },
    "hydrologicalData": {
      "drainageArea": 125.4,
      "rechargeRate": 95,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "aru-catchment",
    "slug": "aru-catchment",
    "name": "Aru Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A scenic high-altitude catchment centered around the Aru meadow. Extremely important for ecotourism and conservation of Himalayan biodiversity.",
    "district": "Anantnag",
    "area": 145.2,
    "elevation": 3600,
    "coordinates": {
      "lat": 34.14,
      "lng": 75.24
    },
    "hydrologicalData": {
      "drainageArea": 145.2,
      "rechargeRate": 110,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "drass-catchment",
    "slug": "drass-catchment",
    "name": "Drass Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major cold-arid catchment originating near the Zojila Pass. Renowned for experiencing some of the lowest temperatures in the inhabited world.",
    "district": "Kargil",
    "area": 1650,
    "elevation": 4200,
    "coordinates": {
      "lat": 34.42,
      "lng": 75.78
    },
    "hydrologicalData": {
      "drainageArea": 1650,
      "rechargeRate": 75,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "amarnath-micro-watershed",
    "slug": "amarnath-micro-watershed",
    "name": "Amarnath Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "High-altitude glaciated micro-watershed surrounding the holy Amarnath Cave. High tourism impact during the summer pilgrimage.",
    "district": "Anantnag",
    "area": 22.5,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.21,
      "lng": 75.5
    },
    "hydrologicalData": {
      "drainageArea": 22.5,
      "rechargeRate": 30,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "betaab-valley-micro-watershed",
    "slug": "betaab-valley-micro-watershed",
    "name": "Betaab Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A highly frequented tourist site in Pahalgam. Heavy pressure on river banks and ecological restoration is active.",
    "district": "Anantnag",
    "area": 18.5,
    "elevation": 2600,
    "coordinates": {
      "lat": 34.03,
      "lng": 75.33
    },
    "hydrologicalData": {
      "drainageArea": 18.5,
      "rechargeRate": 65,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "aru-meadow-micro-watershed",
    "slug": "aru-meadow-micro-watershed",
    "name": "Aru Meadow Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Small micro-watershed enclosing the Aru village and alpine tourist resort. Noted for pasture degradation.",
    "district": "Anantnag",
    "area": 15.8,
    "elevation": 2750,
    "coordinates": {
      "lat": 34.15,
      "lng": 75.26
    },
    "hydrologicalData": {
      "drainageArea": 15.8,
      "rechargeRate": 58,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "chinta-valley-micro-watershed",
    "slug": "chinta-valley-micro-watershed",
    "name": "Chinta Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A scenic high-altitude coniferous valley draining into the Neeru river. Prone to winter avalanches and landslides.",
    "district": "Doda",
    "area": 24.8,
    "elevation": 2350,
    "coordinates": {
      "lat": 33.02,
      "lng": 75.63
    },
    "hydrologicalData": {
      "drainageArea": 24.8,
      "rechargeRate": 88,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "drass-valley-micro-watershed",
    "slug": "drass-valley-micro-watershed",
    "name": "Drass Valley Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Covers the habitable valley floor of Drass. Undergoes extreme freezing and glacial melt dynamics.",
    "district": "Kargil",
    "area": 32.5,
    "elevation": 3800,
    "coordinates": {
      "lat": 34.43,
      "lng": 75.76
    },
    "hydrologicalData": {
      "drainageArea": 32.5,
      "rechargeRate": 45,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "attabad-lake-micro-watershed",
    "slug": "attabad-lake-micro-watershed",
    "name": "Attabad Lake Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Formed in 2010 by a massive landslide blocking the Hunza River. Highly vulnerable to landslide outburst floods and massive sediment inflow.",
    "district": "Hunza",
    "area": 45.2,
    "elevation": 4100,
    "coordinates": {
      "lat": 36.31,
      "lng": 74.86
    },
    "hydrologicalData": {
      "drainageArea": 45.2,
      "rechargeRate": 35,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "critical"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "passu-glacier-micro-watershed",
    "slug": "passu-glacier-micro-watershed",
    "name": "Passu Glacier Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A steep, glaciated micro-watershed draining the Passu Glacier. Highly sensitive to glacier acceleration and surge dynamics.",
    "district": "Hunza",
    "area": 38.4,
    "elevation": 4800,
    "coordinates": {
      "lat": 36.47,
      "lng": 74.88
    },
    "hydrologicalData": {
      "drainageArea": 38.4,
      "rechargeRate": 25,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gund-catchment",
    "slug": "gund-catchment",
    "name": "Gund Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A crucial mid-elevation catchment of the Sind river basin, heavily forested but subject to highway expansion pressures.",
    "district": "Ganderbal",
    "area": 195.4,
    "elevation": 3200,
    "coordinates": {
      "lat": 34.25,
      "lng": 74.98
    },
    "hydrologicalData": {
      "drainageArea": 195.4,
      "rechargeRate": 145,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kangan-catchment",
    "slug": "kangan-catchment",
    "name": "Kangan Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A highly significant catchment hosting major water diversion structures for hydroelectricity and drinking water for Srinagar city.",
    "district": "Ganderbal",
    "area": 175.2,
    "elevation": 2800,
    "coordinates": {
      "lat": 34.27,
      "lng": 74.9
    },
    "hydrologicalData": {
      "drainageArea": 175.2,
      "rechargeRate": 130,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gund-village-micro-watershed",
    "slug": "gund-village-micro-watershed",
    "name": "Gund Village Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "Small micro-watershed surrounding the Gund settlement area, highly prone to spring runoff sedimentation.",
    "district": "Ganderbal",
    "area": 19.8,
    "elevation": 2350,
    "coordinates": {
      "lat": 34.26,
      "lng": 74.99
    },
    "hydrologicalData": {
      "drainageArea": 19.8,
      "rechargeRate": 62,
      "seasonalVariation": "perennial",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kangan-town-micro-watershed",
    "slug": "kangan-town-micro-watershed",
    "name": "Kangan Town Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A micro-watershed with high built-up and agricultural density, creating moderate pollution risk for the main Sind River.",
    "district": "Ganderbal",
    "area": 22.4,
    "elevation": 2150,
    "coordinates": {
      "lat": 34.28,
      "lng": 74.91
    },
    "hydrologicalData": {
      "drainageArea": 22.4,
      "rechargeRate": 55,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "encroachment",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "erin-catchment",
    "slug": "erin-catchment",
    "name": "Erin Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A major right-bank catchment of Wular Lake, famous for alpine lakes like Sarbal Lake in its upper reaches.",
    "district": "Bandipora",
    "area": 135.8,
    "elevation": 2900,
    "coordinates": {
      "lat": 34.45,
      "lng": 74.68
    },
    "hydrologicalData": {
      "drainageArea": 135.8,
      "rechargeRate": 120,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "madhumati-catchment",
    "slug": "madhumati-catchment",
    "name": "Madhumati Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "A highly critical catchment feeding Wular Lake. Subject to significant siltation and erosion, causing wetland shallowing.",
    "district": "Bandipora",
    "area": 155.4,
    "elevation": 3040,
    "coordinates": {
      "lat": 34.48,
      "lng": 74.62
    },
    "hydrologicalData": {
      "drainageArea": 155.4,
      "rechargeRate": 135,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bhadarwah-catchment",
    "slug": "bhadarwah-catchment",
    "name": "Bhadarwah Catchment",
    "type": "watershed",
    "category": "Catchment",
    "description": "Encompasses the Bhadarwah valley and mountainous fringes, draining into the Chenab River. Noted for high spring-shed density.",
    "district": "Doda",
    "area": 185.2,
    "elevation": 2550,
    "coordinates": {
      "lat": 32.98,
      "lng": 75.7
    },
    "hydrologicalData": {
      "drainageArea": 185.2,
      "rechargeRate": 140,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "bhadarwah-town-micro-watershed",
    "slug": "bhadarwah-town-micro-watershed",
    "name": "Bhadarwah Town Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A micro-watershed with significant municipal and household sewage load. Crucial for town-level sanitation and water quality management.",
    "district": "Doda",
    "area": 18.2,
    "elevation": 1700,
    "coordinates": {
      "lat": 32.99,
      "lng": 75.71
    },
    "hydrologicalData": {
      "drainageArea": 18.2,
      "rechargeRate": 45,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "pollution",
      "encroachment",
      "flooding"
    ],
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "purinbal-nallah-micro-watershed",
    "slug": "purinbal-nallah-micro-watershed",
    "name": "Purinbal Nallah Micro-Watershed",
    "type": "watershed",
    "category": "Micro-Watershed",
    "description": "A heavily forested micro-watershed in the Sind catchment, researched for soil erosion vulnerability and slope stability.",
    "district": "Ganderbal",
    "area": 12.8,
    "elevation": 2950,
    "coordinates": {
      "lat": 34.31,
      "lng": 74.96
    },
    "hydrologicalData": {
      "drainageArea": 12.8,
      "rechargeRate": 75,
      "seasonalVariation": "perennial",
      "source": "mixed",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "soil-erosion",
      "flooding"
    ],
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  }

];

// ============================================================================
// GLACIERS AND CRYOSPHERE DATA
// ============================================================================

export const glaciersData: WaterEntity[] = [
  {
    "id": "kolahoi-glacier",
    "slug": "kolahoi-glacier",
    "name": "Kolahoi Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Largest glacier in Kashmir Core. Known as the 'Goddess of Light'. Primary source of the Lidder River. Retreating at 10-15m/year.",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "area": 12.5,
    "elevation": 4800,
    "coordinates": {
      "lat": 34.1667,
      "lng": 75.3833
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "machoi-glacier",
    "slug": "machoi-glacier",
    "name": "Machoi Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Located near Zoji La. Feeds the Sind River on the Kashmir side and tributaries of the Dras River on the Ladakh side.",
    "district": "Kargil",
    "watershed": "Sind & Dras Basin",
    "area": 18.2,
    "elevation": 4800,
    "coordinates": {
      "lat": 34.2833,
      "lng": 75.4667
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "harmukh-glacier",
    "slug": "harmukh-glacier",
    "name": "Harmukh Glacier",
    "type": "glacier",
    "category": "Cirque Glacier",
    "description": "High-altitude glacier on Harmukh Peak. Directly feeds the sacred Gangabal and Nundkol lakes.",
    "district": "Ganderbal",
    "watershed": "Sind Basin",
    "area": 3.8,
    "elevation": 5100,
    "coordinates": {
      "lat": 34.4255,
      "lng": 74.8812
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "sheshnag-glacier",
    "slug": "sheshnag-glacier",
    "name": "Sheshnag Glacier",
    "type": "glacier",
    "category": "Cirque Glacier",
    "description": "Tributary glacier feeding Sheshnag Lake and the East Lidder River. Highly vulnerable to regional black carbon deposition.",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "area": 2.5,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.95,
      "lng": 75.3
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat",
      "black-carbon-deposition"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "kajinag-glacier",
    "slug": "kajinag-glacier",
    "name": "Kajinag Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Located in the Kajinag range on the Line of Control. Feeds local streams that merge into the Jhelum River.",
    "district": "Baramulla",
    "watershed": "Jhelum Basin",
    "area": 4.2,
    "elevation": 4500,
    "coordinates": {
      "lat": 34.25,
      "lng": 74.05
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "tarsar-glacial-system",
    "slug": "tarsar-glacial-system",
    "name": "Tarsar Glacial System",
    "type": "glacier",
    "category": "Glacial Complex",
    "description": "Glacial complex feeding Tarsar and Marsar lakes. Critical source of clean headwaters for the Lidder and Jhelum basins.",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "area": 5.5,
    "elevation": 4600,
    "coordinates": {
      "lat": 33.9167,
      "lng": 75.2833
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gurez-glacial-complex",
    "slug": "gurez-glacial-complex",
    "name": "Gurez Glacial Complex",
    "type": "glacier",
    "category": "Glacial Complex",
    "description": "Drains northern slopes in Gurez valley, feeding the Kishanganga/Neelum River system.",
    "district": "Bandipora",
    "watershed": "Kishanganga Basin",
    "area": 28.5,
    "elevation": 4800,
    "coordinates": {
      "lat": 34.7,
      "lng": 74.85
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "karanag-glacier",
    "slug": "karanag-glacier",
    "name": "Karanag Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Valley glacier in Doda. Feeds Chenab tributaries. Undergoes rapid melting as per ISRO satellite monitoring.",
    "district": "Doda",
    "watershed": "Chenab Basin",
    "area": 8.8,
    "elevation": 4700,
    "coordinates": {
      "lat": 33.2833,
      "lng": 75.8167
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-siachen",
    "slug": "siachen-glacier",
    "name": "Siachen Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "The longest glacier in the Karakoram range and second-longest outside the polar regions. Located in Eastern Karakoram, Ladakh. Feeds the Nubra/Shyok basin.",
    "district": "Leh",
    "watershed": "Nubra Basin",
    "area": 700,
    "elevation": 5400,
    "coordinates": {
      "lat": 35.5,
      "lng": 77
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-baltoro",
    "slug": "baltoro-glacier",
    "name": "Baltoro Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "One of the longest glaciers outside polar regions. Located in Shigar District. Famous gateway to K2, feeding the Shigar River and Indus system.",
    "district": "Shigar",
    "watershed": "Shigar Basin",
    "area": 500,
    "elevation": 4000,
    "coordinates": {
      "lat": 35.74,
      "lng": 76.38
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-drang-drung",
    "slug": "drang-drung-glacier",
    "name": "Drang-Drung Glacier",
    "type": "glacier",
    "category": "Mountain Glacier",
    "description": "A massive glacier in Kargil district near Pensi La. The primary source of the Stod (Suru) River.",
    "district": "Kargil",
    "watershed": "Suru Basin",
    "area": 45,
    "elevation": 4780,
    "coordinates": {
      "lat": 33.8,
      "lng": 76.62
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-batura",
    "slug": "batura-glacier",
    "name": "Batura Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Massive valley glacier in Hunza. Feeds Hunza River. Flows close to the Karakoram Highway.",
    "district": "Hunza",
    "watershed": "Hunza Basin",
    "area": 220,
    "elevation": 3800,
    "coordinates": {
      "lat": 36.5333,
      "lng": 74.65
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-biafo",
    "slug": "biafo-glacier",
    "name": "Biafo Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "World's third longest glacier outside polar regions. Located in Skardu/Shigar area. Joins Hispar Glacier at Hispar La.",
    "district": "Shigar",
    "watershed": "Shigar Basin",
    "area": 625,
    "elevation": 4200,
    "coordinates": {
      "lat": 35.6833,
      "lng": 75.9167
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-hispar",
    "slug": "hispar-glacier",
    "name": "Hispar Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Drains into Nagar. Connected to Biafo Glacier. Forms a continuous 100km+ glacial highway system.",
    "district": "Nagar",
    "watershed": "Nagar Basin",
    "area": 300,
    "elevation": 4840,
    "coordinates": {
      "lat": 36.0833,
      "lng": 75.2667
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-brammah",
    "slug": "brammah-glacier",
    "name": "Brammah Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Glacier in Kishtwar region feeding the Chenab basin. Significant meltwater contributor.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "area": 24.5,
    "elevation": 4500,
    "coordinates": {
      "lat": 33.5,
      "lng": 76.05
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-shounter",
    "slug": "shounter-glacier",
    "name": "Shounter Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "High altitude valley glacier in Neelum Valley, Azad Kashmir. Primary feed for Shounter Lake.",
    "district": "Neelum",
    "watershed": "Neelum Basin",
    "area": 5.2,
    "elevation": 3400,
    "coordinates": {
      "lat": 34.9833,
      "lng": 74.45
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-thajwas",
    "slug": "thajwas-glacier",
    "name": "Thajwas Glacier",
    "type": "glacier",
    "category": "Cirque Glacier",
    "description": "Extremely popular cirque glacier in Sonamarg, Ganderbal. Undergoes heavy tourist activity pressure.",
    "district": "Ganderbal",
    "watershed": "Sind Basin",
    "area": 1.5,
    "elevation": 3500,
    "coordinates": {
      "lat": 34.2833,
      "lng": 75.3
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat",
      "tourism-pressure"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-parkachik",
    "slug": "parkachik-glacier",
    "name": "Parkachik Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Massive valley glacier in Suru Valley. Feeds Suru River. Exhibits high rate of retreat.",
    "district": "Kargil",
    "watershed": "Suru Basin",
    "area": 14.8,
    "elevation": 4200,
    "coordinates": {
      "lat": 33.95,
      "lng": 76.0833
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-chogolungma",
    "slug": "chogo-lungma-glacier",
    "name": "Chogo Lungma Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "A massive, relatively stable glacier in the Karakoram range, located in Shigar District. Feeds the Basha River.",
    "district": "Shigar",
    "watershed": "Shigar Basin",
    "area": 265,
    "elevation": 3800,
    "coordinates": {
      "lat": 35.87,
      "lng": 75.22
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-rimo",
    "slug": "rimo-glacier",
    "name": "Rimo Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Consists of multiple large branches in the eastern Karakoram, Ladakh. Feeds the Shyok River.",
    "district": "Leh",
    "watershed": "Shyok Basin",
    "area": 150,
    "elevation": 5830,
    "coordinates": {
      "lat": 35.35,
      "lng": 77.37
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-shafat",
    "slug": "shafat-glacier",
    "name": "Shafat Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Glacier on the Nun Kun massif in Kargil, Ladakh. Primary feeder for the Suru River.",
    "district": "Kargil",
    "watershed": "Suru Basin",
    "area": 53,
    "elevation": 4400,
    "coordinates": {
      "lat": 33.98,
      "lng": 76.13
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-khurdopin",
    "slug": "khurdopin-glacier",
    "name": "Khurdopin Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Surge-type glacier located in the Shimshal Valley, Hunza. Known for periodic blockages of the Shimshal River.",
    "district": "Hunza",
    "watershed": "Hunza Basin",
    "area": 115,
    "elevation": 4100,
    "coordinates": {
      "lat": 36.2,
      "lng": 75.48
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-passu",
    "slug": "passu-glacier",
    "name": "Passu Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Highly accessible glacier located in the Gojal Valley of Upper Hunza. Visible from the Karakoram Highway.",
    "district": "Hunza",
    "watershed": "Hunza Basin",
    "area": 80,
    "elevation": 4367,
    "coordinates": {
      "lat": 36.47,
      "lng": 74.77
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-minapin",
    "slug": "minapin-glacier",
    "name": "Minapin Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Fast-flowing valley glacier descending from Rakaposhi. Feeds the Hunza River network.",
    "district": "Nagar",
    "watershed": "Nagar Basin",
    "area": 40,
    "elevation": 3640,
    "coordinates": {
      "lat": 36.18,
      "lng": 74.58
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-nehnar",
    "slug": "nehnar-glacier",
    "name": "Nehnar Glacier",
    "type": "glacier",
    "category": "Cirque Glacier",
    "description": "Small headwater glacier studied for glacial retreat trends. Located in the Lidder River headwaters, Anantnag.",
    "district": "Anantnag",
    "watershed": "Lidder Basin",
    "area": 1.7,
    "elevation": 4100,
    "coordinates": {
      "lat": 34.13,
      "lng": 75.32
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "low"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "glacier-bualtar",
    "slug": "bualtar-glacier",
    "name": "Bualtar Glacier",
    "type": "glacier",
    "category": "Valley Glacier",
    "description": "Also known as Hoper Glacier. Fast-moving surge glacier in Hoper Valley, Nagar. Drains into the Hunza River.",
    "district": "Nagar",
    "watershed": "Nagar Basin",
    "area": 75,
    "elevation": 4100,
    "coordinates": {
      "lat": 36.21,
      "lng": 74.78
    },
    "hydrologicalData": {
      "seasonalVariation": "seasonal",
      "source": "glacial",
      "floodRisk": "high"
    },
    "threats": [
      "climate-change",
      "glacial-retreat"
    ],
    "verificationStatus": "verified",
    "createdAt": "2026-01-01T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  }

];

// ============================================================================
// WATER QUALITY MONITORING SITES
// ============================================================================

export const waterQualitySites: WaterEntity[] = [
  {
    id: "wq-dal-lake-central",
    slug: "wq-dal-lake-central",
    name: "Dal Lake - Central Basin",
    type: "water-quality",
    category: "Lake Quality Monitoring",
    description: "Primary water quality monitoring station in Dal Lake. Monitors eutrophication, pollution, and ecological health trends.",
    district: "Srinagar",
    watershed: "Jhelum Basin",
    elevation: 1580,
    coordinates: {
      lat: 34.115,
      lng: 74.829
    },
    waterQuality: {
      pH: 7.2,
      dissolvedOxygen: 6.8,
      turbidity: 12,
      conductivity: 245,
      temperature: 18,
      nitrates: 1.8,
      phosphates: 0.15,
      biologicalOxygenDemand: 4.2,
      totalDissolvedSolids: 185,
      fecalColiform: 850,
      lastTested: "2026-03-15",
      status: "moderate",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    threats: [
      "eutrophication",
      "sewage-discharge",
      "agricultural-runoff",
      "tourism-pressure"
    ],
    verificationStatus: "under-review",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T16:28:51.335Z"
  },
  {
    id: "wq-wular-lake-northern",
    slug: "wq-wular-lake-northern",
    name: "Wular Lake - Northern Basin",
    type: "water-quality",
    category: "Lake Quality Monitoring",
    description: "Water quality monitoring for Wular Lake. Ramsar site with good water quality. Monitors siltation and invasive species impact.",
    district: "Bandipora",
    watershed: "Jhelum Basin",
    elevation: 1580,
    coordinates: {
      lat: 34.4167,
      lng: 74.6333
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.8,
      turbidity: 8,
      conductivity: 198,
      temperature: 16,
      nitrates: 1.2,
      phosphates: 0.08,
      biologicalOxygenDemand: 2.8,
      totalDissolvedSolids: 142,
      fecalColiform: 320,
      lastTested: "2026-03-10",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    threats: [
      "siltation",
      "invasive-species",
      "catchment-degradation"
    ],
    verificationStatus: "under-review",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T16:28:51.335Z"
  },
  {
    id: "wq-jhelum-srinagar",
    slug: "wq-jhelum-srinagar",
    name: "Jhelum River - Srinagar",
    type: "water-quality",
    category: "River Quality Monitoring",
    description: "Urban stretch monitoring of Jhelum River. High pollution pressure from city. Critical for public health.",
    district: "Srinagar",
    watershed: "Jhelum Basin",
    elevation: 1580,
    coordinates: {
      lat: 34.0833,
      lng: 74.8
    },
    waterQuality: {
      pH: 7.3,
      dissolvedOxygen: 6.2,
      turbidity: 18,
      conductivity: 265,
      temperature: 15,
      nitrates: 2.2,
      phosphates: 0.18,
      biologicalOxygenDemand: 5.5,
      totalDissolvedSolids: 195,
      fecalColiform: 1200,
      lastTested: "2026-03-20",
      status: "poor",
      trends: {
        pH: "stable",
        dissolvedOxygen: "declining",
        turbidity: "declining"
      }
    },
    threats: [
      "sewage-discharge",
      "solid-waste",
      "encroachment",
      "industrial-effluent"
    ],
    verificationStatus: "under-review",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T16:28:51.335Z"
  },
  {
    id: "wq-kokernag-spring",
    slug: "wq-kokernag-spring",
    name: "Kokernag Spring - Source",
    type: "water-quality",
    category: "Spring Quality Monitoring",
    description: "Quality monitoring at Kokernag spring source. Excellent water quality. Baseline for groundwater quality.",
    district: "Anantnag",
    watershed: "Lidder Basin",
    elevation: 1900,
    coordinates: {
      lat: 33.8833,
      lng: 75.25
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 9.5,
      turbidity: 2,
      conductivity: 165,
      temperature: 9,
      nitrates: 0.4,
      phosphates: 0.03,
      biologicalOxygenDemand: 1.2,
      totalDissolvedSolids: 112,
      fecalColiform: 35,
      lastTested: "2026-03-18",
      status: "excellent",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    threats: [
      "tourism-pressure",
      "local-pollution"
    ],
    verificationStatus: "under-review",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T16:28:51.336Z"
  },
  {
    id: "wq-hokersar-wetland",
    slug: "wq-hokersar-wetland",
    name: "Hokersar Wetland - Core Zone",
    type: "water-quality",
    category: "Wetland Quality Monitoring",
    description: "Ramsar wetland quality monitoring. Critical for migratory birds. Monitors eutrophication and pesticide runoff.",
    district: "Srinagar",
    watershed: "Jhelum Basin",
    elevation: 1580,
    coordinates: {
      lat: 34.25,
      lng: 74.85
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.8,
      turbidity: 6,
      conductivity: 205,
      temperature: 16,
      nitrates: 1,
      phosphates: 0.08,
      biologicalOxygenDemand: 2.4,
      totalDissolvedSolids: 145,
      fecalColiform: 220,
      lastTested: "2026-03-10",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "improving"
      }
    },
    threats: [
      "eutrophication",
      "agricultural-runoff",
      "encroachment"
    ],
    verificationStatus: "under-review",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T16:28:51.336Z"
  },
  {
    id: "wq-lidder-river-pahalgam",
    slug: "wq-lidder-river-pahalgam",
    name: "Lidder River - Pahalgam",
    type: "water-quality",
    category: "River Quality Monitoring",
    description: "Tourist stretch monitoring. Generally good quality. Monitors tourism impact and sewage.",
    district: "Anantnag",
    watershed: "Lidder Basin",
    elevation: 2200,
    coordinates: {
      lat: 33.95,
      lng: 75.15
    },
    waterQuality: {
      pH: 7.5,
      dissolvedOxygen: 8,
      turbidity: 8,
      conductivity: 175,
      temperature: 12,
      nitrates: 0.8,
      phosphates: 0.06,
      biologicalOxygenDemand: 2.2,
      totalDissolvedSolids: 128,
      fecalColiform: 180,
      lastTested: "2026-03-17",
      status: "good",
      trends: {
        pH: "stable",
        dissolvedOxygen: "stable",
        turbidity: "stable"
      }
    },
    threats: [
      "tourism-pressure",
      "seasonal-pollution"
    ],
    verificationStatus: "under-review",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-06-16T16:28:51.336Z"
  }

];

// ============================================================================
// FISHERIES AND AQUATIC LIFE
// ============================================================================

export const fisheriesData: WaterEntity[] = [
  {
    id: 'fishery-dal-lake',
    slug: 'fishery-dal-lake',
    name: 'Dal Lake Fisheries',
    type: 'fishery',
    category: 'Lake Fisheries',
    description: 'Traditional lake fisheries supporting local communities. Common carp, grass carp, and snow trout. High production but facing eutrophication challenges.',
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    elevation: 1580,
    coordinates: { lat: 34.1150, lng: 74.8290 },
    fisheryData: {
      fishSpecies: ['common-carp', 'grass-carp', 'snow-trout', 'schizothorax'],
      fisheryType: 'managed',
      productivity: 'high',
      fishingSeason: 'year-round',
      permits: true,
      conservationMeasures: ['catch-limits', 'closed-season', 'stock-enhancement']
    },
    waterQuality: {
      pH: 7.2,
      dissolvedOxygen: 6.8,
      turbidity: 12,
      lastTested: '2026-03-15',
      status: 'moderate'
    },
    threats: ['eutrophication', 'overfishing', 'invasive-species', 'pollution'],
    verificationStatus: 'verified',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-26T07:00:00Z',
  },
  {
    id: 'fishery-wular-lake',
    slug: 'fishery-wular-lake',
    name: 'Wular Lake Fisheries',
    type: 'fishery',
    category: 'Lake Fisheries',
    description: 'Largest fishery in Kashmir. Supports thousands of fishermen. Native schizothorax and introduced carp species.',
    district: 'Bandipora',
    watershed: 'Jhelum Basin',
    elevation: 1580,
    coordinates: { lat: 34.4167, lng: 74.6333 },
    fisheryData: {
      fishSpecies: ['schizothorax', 'common-carp', 'grass-carp', 'silver-carp'],
      fisheryType: 'wild',
      productivity: 'high',
      fishingSeason: 'year-round',
      permits: true,
      conservationMeasures: ['mesh-size-regulation', 'closed-season', 'habitat-protection']
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 7.8,
      turbidity: 8,
      lastTested: '2026-03-10',
      status: 'good'
    },
    threats: ['siltation', 'overfishing', 'invasive-species'],
    verificationStatus: 'verified',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'fishery-kokernag-trout',
    slug: 'fishery-kokernag-trout',
    name: 'Kokernag Trout Fishery',
    type: 'fishery',
    category: 'Trout Fishery',
    description: 'Premier trout fishery. Brown and rainbow trout. Managed by fisheries department. High economic value.',
    district: 'Anantnag',
    watershed: 'Lidder Basin',
    elevation: 1900,
    coordinates: { lat: 33.8833, lng: 75.2500 },
    fisheryData: {
      fishSpecies: ['brown-trout', 'rainbow-trout'],
      fisheryType: 'managed',
      productivity: 'high',
      fishingSeason: 'March-October',
      permits: true,
      conservationMeasures: ['catch-and-release', 'size-limits', 'stocking']
    },
    waterQuality: {
      pH: 7.6,
      dissolvedOxygen: 9.5,
      turbidity: 2,
      lastTested: '2026-03-18',
      status: 'excellent'
    },
    threats: ['disease-outbreaks', 'climate-change', 'water-temperature-rise'],
    verificationStatus: 'verified',
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-03-22T10:00:00Z',
  },
  {
    id: 'fishery-lidder-river',
    slug: 'fishery-lidder-river',
    name: 'Lidder River Trout Fishery',
    type: 'fishery',
    category: 'River Fishery',
    description: 'Wild trout fishery in Lidder River. Popular for sport fishing. Brown and rainbow trout populations.',
    district: 'Anantnag',
    watershed: 'Lidder Basin',
    elevation: 2200,
    coordinates: { lat: 33.9500, lng: 75.1500 },
    fisheryData: {
      fishSpecies: ['brown-trout', 'rainbow-trout', 'snow-trout'],
      fisheryType: 'wild',
      productivity: 'moderate',
      fishingSeason: 'April-October',
      permits: true,
      conservationMeasures: ['catch-limits', 'size-limits', 'barbless-hooks']
    },
    waterQuality: {
      pH: 7.5,
      dissolvedOxygen: 8.0,
      turbidity: 8,
      lastTested: '2026-03-17',
      status: 'good'
    },
    threats: ['overfishing', 'tourism-pressure', 'pollution'],
    verificationStatus: 'verified',
    createdAt: '2026-01-08T00:00:00Z',
    updatedAt: '2026-03-19T11:00:00Z',
  },
  {
    id: 'fishery-jhelum-river',
    slug: 'fishery-jhelum-river',
    name: 'Jhelum River Fishery',
    type: 'fishery',
    category: 'River Fishery',
    description: 'Traditional river fishery. Native schizothorax and carp. Declining catches due to pollution and flow regulation.',
    district: 'Multiple',
    watershed: 'Jhelum Basin',
    elevation: 1580,
    coordinates: { lat: 34.0833, lng: 74.8000 },
    fisheryData: {
      fishSpecies: ['schizothorax', 'common-carp', 'snow-trout'],
      fisheryType: 'wild',
      productivity: 'low',
      fishingSeason: 'year-round',
      permits: true,
      conservationMeasures: ['closed-season', 'mesh-regulation']
    },
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 7.5,
      turbidity: 15,
      lastTested: '2026-03-20',
      status: 'moderate'
    },
    threats: ['pollution', 'overfishing', 'flow-regulation', 'sand-mining'],
    verificationStatus: 'verified',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-03-25T08:00:00Z',
  },
  {
    id: 'fishery-manasbal-lake',
    slug: 'fishery-manasbal-lake',
    name: 'Manasbal Lake Fishery',
    type: 'fishery',
    category: 'Lake Fisheries',
    description: 'Small but productive fishery. Known for lotus root and fisheries. Good water quality supports healthy fish populations.',
    district: 'Ganderbal',
    watershed: 'Jhelum Basin',
    elevation: 1580,
    coordinates: { lat: 34.1667, lng: 74.7167 },
    fisheryData: {
      fishSpecies: ['common-carp', 'grass-carp', 'snow-trout'],
      fisheryType: 'managed',
      productivity: 'moderate',
      fishingSeason: 'year-round',
      permits: true,
      conservationMeasures: ['stocking', 'predator-control']
    },
    waterQuality: {
      pH: 7.8,
      dissolvedOxygen: 8.2,
      turbidity: 4,
      lastTested: '2026-03-12',
      status: 'good'
    },
    threats: ['tourism-pressure', 'invasive-species'],
    verificationStatus: 'verified',
    createdAt: '2026-01-12T00:00:00Z',
    updatedAt: '2026-03-22T09:00:00Z',
  },
];

// ============================================================================
// FLOOD AND HYDROLOGICAL RISK ZONES
// ============================================================================

export const floodRiskZones: WaterEntity[] = [
  {
    id: 'flood-jhelum-srinagar',
    slug: 'flood-jhelum-srinagar',
    name: 'Jhelum Floodplain - Srinagar',
    type: 'flood-zone',
    category: 'Urban Flood Zone',
    description: 'High-risk urban floodplain along Jhelum in Srinagar. 2014 floods affected 500,000+ people. Critical infrastructure at risk.',
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    area: 85,
    elevation: 1580,
    coordinates: { lat: 34.0833, lng: 74.8000 },
    floodRiskData: {
      riskLevel: 'critical',
      floodType: 'riverine',
      affectedAreas: ['Nowshera', 'Rajbagh', 'Lal Chowk', 'Natipora', 'Zaldagar'],
      vulnerablePopulation: 520000,
      infrastructure: ['hospitals', 'schools', 'markets', 'residential'],
      earlyWarningSystem: true,
      mitigationMeasures: ['flood-walls', 'drainage-improvement', 'evacuation-routes', 'raised-embankments'],
      historicalEvents: [
        { year: 2014, severity: 'catastrophic', impact: '500,000+ affected, 281 deaths' },
        { year: 1992, severity: 'severe', impact: '150,000 affected' },
        { year: 1973, severity: 'moderate', impact: '50,000 affected' }
      ]
    },
    threats: ['encroachment', 'wetland-loss', 'drainage-blockage', 'climate-change'],
    verificationStatus: 'verified',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-26T08:00:00Z',
  },
  {
    id: 'flood-wular-buffer',
    slug: 'flood-wular-buffer',
    name: 'Wular Flood Buffer Zone',
    type: 'flood-zone',
    category: 'Wetland Flood Buffer',
    description: 'Wular Lake acts as natural flood absorption basin. Critical for downstream flood mitigation. Can absorb 100,000+ cusecs.',
    district: 'Bandipora',
    watershed: 'Jhelum Basin',
    area: 189,
    elevation: 1575,
    coordinates: { lat: 34.4167, lng: 74.6333 },
    floodRiskData: {
      riskLevel: 'moderate',
      floodType: 'overflow',
      affectedAreas: ['Bandipora', 'Sopore', 'Ningli'],
      vulnerablePopulation: 85000,
      infrastructure: ['agricultural-land', 'villages', 'roads'],
      earlyWarningSystem: true,
      mitigationMeasures: ['wetland-conservation', 'dredging', 'afforestation', 'embankments'],
      historicalEvents: [
        { year: 2014, severity: 'high', impact: 'absorbed major flood peak' },
        { year: 2010, severity: 'moderate', impact: 'local flooding' }
      ]
    },
    threats: ['siltation', 'encroachment', 'loss-of-buffer-capacity'],
    verificationStatus: 'verified',
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'flood-lidder-flash',
    slug: 'flood-lidder-flash',
    name: 'Lidder Flash Flood Corridor',
    type: 'flood-zone',
    category: 'Flash Flood Zone',
    description: 'Flash flood-prone corridor along Lidder River. Sudden glacial melt and cloudbursts pose risk. Popular tourist areas affected.',
    district: 'Anantnag',
    watershed: 'Lidder Basin',
    area: 45,
    elevation: 2200,
    coordinates: { lat: 33.9500, lng: 75.1500 },
    floodRiskData: {
      riskLevel: 'high',
      floodType: 'flash-flood',
      affectedAreas: ['Pahalgam', 'Chandanwari', 'Aru', 'Lidderoo'],
      vulnerablePopulation: 25000,
      infrastructure: ['tourist-facilities', 'bridges', 'roads', 'hotels'],
      earlyWarningSystem: true,
      mitigationMeasures: ['early-warning', 'evacuation-plans', 'river-training', 'zoning-regulations'],
      historicalEvents: [
        { year: 2022, severity: 'moderate', impact: 'cloudburst flooding' },
        { year: 2015, severity: 'high', impact: 'glacial-melt flood' }
      ]
    },
    threats: ['glacial-melt', 'cloudbursts', 'encroachment', 'deforestation'],
    verificationStatus: 'verified',
    createdAt: '2026-01-08T00:00:00Z',
    updatedAt: '2026-03-19T11:00:00Z',
  },
  {
    id: 'flood-sind-riverine',
    slug: 'flood-sind-riverine',
    name: 'Sind River Floodplain',
    type: 'flood-zone',
    category: 'Riverine Flood Zone',
    description: 'Flood-prone areas along Sind River. High sediment load increases risk. Agricultural land frequently affected.',
    district: 'Ganderbal',
    watershed: 'Sind Basin',
    area: 62,
    elevation: 1600,
    coordinates: { lat: 34.2500, lng: 74.8000 },
    floodRiskData: {
      riskLevel: 'high',
      floodType: 'riverine',
      affectedAreas: ['Ganderbal', 'Kangan', 'Gund', 'Shadipora'],
      vulnerablePopulation: 45000,
      infrastructure: ['agricultural-land', 'villages', 'bridges', 'irrigation'],
      earlyWarningSystem: true,
      mitigationMeasures: ['embankments', 'drainage', 'afforestation', 'flood-shelters'],
      historicalEvents: [
        { year: 2014, severity: 'severe', impact: 'widespread flooding' },
        { year: 2018, severity: 'moderate', impact: 'local flooding' }
      ]
    },
    threats: ['sedimentation', 'encroachment', 'deforestation', 'climate-change'],
    verificationStatus: 'verified',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-03-21T09:00:00Z',
  },
  {
    id: 'flood-kishanganga-gurez',
    slug: 'flood-kishanganga-gurez',
    name: 'Kishanganga Gurez Flood Zone',
    type: 'flood-zone',
    category: 'Valley Flood Zone',
    description: 'Flood-prone areas in Gurez Valley along Kishanganga River. Remote area with limited infrastructure. Glacial melt risk.',
    district: 'Bandipora',
    watershed: 'Kishanganga Basin',
    area: 38,
    elevation: 2400,
    coordinates: { lat: 34.6500, lng: 74.7500 },
    floodRiskData: {
      riskLevel: 'moderate',
      floodType: 'riverine',
      affectedAreas: ['Dawar', 'Tulail', 'Chakwali'],
      vulnerablePopulation: 12000,
      infrastructure: ['villages', 'roads', 'bridges', 'agricultural-land'],
      earlyWarningSystem: false,
      mitigationMeasures: ['embankments', 'early-warning-installation', 'evacuation-routes'],
      historicalEvents: [
        { year: 2020, severity: 'moderate', impact: 'valley flooding' },
        { year: 2016, severity: 'low', impact: 'minor flooding' }
      ]
    },
    threats: ['glacial-melt', 'landslides', 'infrastructure-damage'],
    verificationStatus: 'verified',
    createdAt: '2026-01-12T00:00:00Z',
    updatedAt: '2026-03-20T14:00:00Z',
  },
  {
    id: 'flood-waterlogging-sopore',
    slug: 'flood-waterlogging-sopore',
    name: 'Sopore Waterlogging Zone',
    type: 'flood-zone',
    category: 'Waterlogging Zone',
    description: 'Chronic waterlogging area near Wular Lake. High water table and poor drainage. Agricultural impact significant.',
    district: 'Baramulla',
    watershed: 'Jhelum Basin',
    area: 28,
    elevation: 1575,
    coordinates: { lat: 34.3000, lng: 74.6500 },
    floodRiskData: {
      riskLevel: 'high',
      floodType: 'waterlogging',
      affectedAreas: ['Sopore', 'Tujar', 'Bomai'],
      vulnerablePopulation: 35000,
      infrastructure: ['agricultural-land', 'orchards', 'villages'],
      earlyWarningSystem: false,
      mitigationMeasures: ['drainage-improvement', 'pumping-stations', 'land-leveling'],
      historicalEvents: [
        { year: 2023, severity: 'moderate', impact: 'standing water for months' },
        { year: 2021, severity: 'high', impact: 'crop damage' }
      ]
    },
    threats: ['poor-drainage', 'high-water-table', 'siltation'],
    verificationStatus: 'verified',
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-03-18T16:00:00Z',
  },
];

// ============================================================================
// RESTORATION AND REJUVENATION SITES
// ============================================================================

export const restorationSites: WaterEntity[] = [
  {
    id: 'restore-dal-lake',
    slug: 'restore-dal-lake',
    name: 'Dal Lake Restoration Project',
    type: 'restoration-site',
    category: 'Lake Restoration',
    description: 'Comprehensive lake restoration including de-weeding, de-silting, sewage interception, and shoreline rehabilitation. Ongoing since 1997.',
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    area: 18,
    elevation: 1580,
    coordinates: { lat: 34.1150, lng: 74.8290 },
    restorationData: {
      restorationType: 'lake-restoration',
      status: 'ongoing',
      startDate: '1997-01-01',
      implementingAgency: 'Lakes and Waterways Development Authority',
      objectives: ['eutrophication-control', 'sewage-interception', 'de-weeding', 'shoreline-protection', 'biodiversity-restoration'],
      outcomes: ['improved-water-quality', 'reduced-weed-cover', 'better-aesthetic-value'],
      areaTreated: 12,
      communityInvolvement: true
    },
    threats: ['continued-pollution', 'encroachment', 'funding-gaps'],
    verificationStatus: 'verified',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-03-26T07:00:00Z',
  },
  {
    id: 'restore-wular-siltation',
    slug: 'restore-wular-siltation',
    name: 'Wular Lake De-siltation',
    type: 'restoration-site',
    category: 'Lake Restoration',
    description: 'Major de-siltation and catchment treatment project. Aims to restore original water spread area. Critical for flood buffering.',
    district: 'Bandipora',
    watershed: 'Jhelum Basin',
    area: 189,
    elevation: 1580,
    coordinates: { lat: 34.4167, lng: 74.6333 },
    restorationData: {
      restorationType: 'desiltation',
      status: 'ongoing',
      startDate: '2011-06-01',
      implementingAgency: 'Wular Conservation and Management Authority',
      objectives: ['de-siltation', 'catchment-treatment', 'invasive-species-removal', 'biodiversity-enhancement'],
      outcomes: ['increased-water-capacity', 'improved-flood-absorption'],
      areaTreated: 85,
      communityInvolvement: true
    },
    threats: ['continued-siltation', 'invasive-species', 'catchment-degradation'],
    verificationStatus: 'verified',
    createdAt: '2026-01-05T00:00:00Z',
    updatedAt: '2026-03-25T10:00:00Z',
  },
  {
    id: 'restore-hokersar-wetland',
    slug: 'restore-hokersar-wetland',
    name: 'Hokersar Wetland Restoration',
    type: 'restoration-site',
    category: 'Wetland Restoration',
    description: 'Ramsar wetland restoration including hydrological regime restoration, invasive species removal, and habitat enhancement.',
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    area: 13.75,
    elevation: 1580,
    coordinates: { lat: 34.2500, lng: 74.8500 },
    restorationData: {
      restorationType: 'wetland-restoration',
      status: 'ongoing',
      startDate: '2015-03-01',
      implementingAgency: 'J&K Wildlife Protection Department',
      objectives: ['hydrological-restoration', 'invasive-species-control', 'habitat-enhancement', 'bird-habitat-improvement'],
      outcomes: ['increased-bird-counts', 'better-water-quality', 'reduced-invasive-species'],
      areaTreated: 10,
      communityInvolvement: true
    },
    threats: ['eutrophication', 'encroachment', 'agricultural-runoff'],
    verificationStatus: 'verified',
    createdAt: '2026-01-08T00:00:00Z',
    updatedAt: '2026-03-18T15:00:00Z',
  },
  {
    id: 'restore-kokernag-spring',
    slug: 'restore-kokernag-spring',
    name: 'Kokernag Spring Rejuvenation',
    type: 'restoration-site',
    category: 'Spring Rejuvenation',
    description: 'Spring rejuvenation including source protection, recharge area treatment, and tourism infrastructure improvement.',
    district: 'Anantnag',
    watershed: 'Lidder Basin',
    area: 0.5,
    elevation: 1900,
    coordinates: { lat: 33.8833, lng: 75.2500 },
    restorationData: {
      restorationType: 'spring-rejuvenation',
      status: 'ongoing',
      startDate: '2020-05-01',
      implementingAgency: 'JK Rural Development Department',
      objectives: ['source-protection', 'recharge-improvement', 'tourism-infrastructure', 'water-quality-maintenance'],
      outcomes: ['sustained-discharge', 'improved-visitor-experience'],
      areaTreated: 0.3,
      communityInvolvement: true
    },
    threats: ['tourism-pressure', 'climate-change', 'pollution'],
    verificationStatus: 'verified',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-03-22T10:00:00Z',
  },
  {
    id: 'restore-jhelum-riverbank',
    slug: 'restore-jhelum-riverbank',
    name: 'Jhelum Riverbank Restoration',
    type: 'restoration-site',
    category: 'River Rehabilitation',
    description: 'Riverbank stabilization and ecological restoration along Jhelum. Includes bioengineering and embankment strengthening.',
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    length: 25,
    elevation: 1580,
    coordinates: { lat: 34.0833, lng: 74.8000 },
    restorationData: {
      restorationType: 'river-rehabilitation',
      status: 'ongoing',
      startDate: '2016-09-01',
      implementingAgency: 'Flood Control Department',
      objectives: ['riverbank-stabilization', 'erosion-control', 'flood-protection', 'ecological-restoration'],
      outcomes: ['reduced-erosion', 'improved-flood-capacity'],
      areaTreated: 15,
      communityInvolvement: false
    },
    threats: ['continued-encroachment', 'pollution', 'funding-gaps'],
    verificationStatus: 'verified',
    createdAt: '2026-01-12T00:00:00Z',
    updatedAt: '2026-03-25T08:00:00Z',
  },
  {
    id: 'restore-sind-catchment',
    slug: 'restore-sind-catchment',
    name: 'Sind River Catchment Treatment',
    type: 'restoration-site',
    category: 'Catchment Treatment',
    description: 'Upper catchment treatment including afforestation, check dams, and erosion control. Reduces sediment load.',
    district: 'Ganderbal',
    watershed: 'Sind Basin',
    area: 150,
    elevation: 2500,
    coordinates: { lat: 34.2500, lng: 74.8000 },
    restorationData: {
      restorationType: 'catchment-treatment',
      status: 'ongoing',
      startDate: '2018-04-01',
      implementingAgency: 'Soil Conservation Department',
      objectives: ['afforestation', 'erosion-control', 'check-dams', 'grazing-management'],
      outcomes: ['reduced-sediment-load', 'improved-vegetation-cover'],
      areaTreated: 85,
      communityInvolvement: true
    },
    threats: ['grazing-pressure', 'deforestation', 'climate-change'],
    verificationStatus: 'verified',
    createdAt: '2026-01-15T00:00:00Z',
    updatedAt: '2026-03-21T09:00:00Z',
  },
  {
    id: 'restore-achabal-spring',
    slug: 'restore-achabal-spring',
    name: 'Achabal Spring Conservation',
    type: 'restoration-site',
    category: 'Spring Rejuvenation',
    description: 'Historic spring conservation with Mughal garden restoration. Source protection and water quality maintenance.',
    district: 'Anantnag',
    watershed: 'Jhelum Basin',
    area: 0.3,
    elevation: 1900,
    coordinates: { lat: 33.8167, lng: 75.1833 },
    restorationData: {
      restorationType: 'spring-rejuvenation',
      status: 'completed',
      startDate: '2019-01-01',
      completionDate: '2022-12-31',
      implementingAgency: 'Tourism Department',
      objectives: ['heritage-restoration', 'source-protection', 'tourism-infrastructure', 'water-quality'],
      outcomes: ['restored-mughal-gardens', 'improved-visitor-facilities', 'sustained-flow'],
      areaTreated: 0.3,
      communityInvolvement: true
    },
    threats: ['tourism-pressure', 'maintenance-needs'],
    verificationStatus: 'verified',
    createdAt: '2026-01-18T00:00:00Z',
    updatedAt: '2026-03-20T14:00:00Z',
  },
  {
    id: 'restore-manasbal-shoreline',
    slug: 'restore-manasbal-shoreline',
    name: 'Manasbal Lake Shoreline Protection',
    type: 'restoration-site',
    category: 'Lake Restoration',
    description: 'Shoreline protection and lotus bed restoration. Bioengineering for erosion control. Tourism infrastructure improvement.',
    district: 'Ganderbal',
    watershed: 'Jhelum Basin',
    area: 2.8,
    elevation: 1580,
    coordinates: { lat: 34.1667, lng: 74.7167 },
    restorationData: {
      restorationType: 'lake-restoration',
      status: 'ongoing',
      startDate: '2021-06-01',
      implementingAgency: 'LAWDA',
      objectives: ['shoreline-protection', 'lotus-restoration', 'erosion-control', 'tourism-infrastructure'],
      outcomes: ['stabilized-shoreline', 'healthy-lotus-beds'],
      areaTreated: 1.8,
      communityInvolvement: true
    },
    threats: ['tourism-pressure', 'wave-erosion'],
    verificationStatus: 'verified',
    createdAt: '2026-01-20T00:00:00Z',
    updatedAt: '2026-03-22T09:00:00Z',
  },
];

export const groundwaterData: WaterEntity[] = [
  {
    "id": "gw-budgam-tubewell-1",
    "slug": "gw-budgam-tubewell-1",
    "name": "Budgam Karewa Water Supply Tube Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Pumping continuously for 12 hours daily. Shows clear water table decline of ~0.4m/year over the last five years.",
    "district": "Budgam",
    "watershed": "Doodhganga Catchment",
    "elevation": 1610,
    "coordinates": {
      "lat": 34.0182,
      "lng": 74.7214
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 430,
      "temperature": 15,
      "nitrates": 12.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 280,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 210,
      "waterLevel": 55.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-srinagar-monitoring-1",
    "slug": "gw-srinagar-monitoring-1",
    "name": "Srinagar Rajbagh Observation Well",
    "type": "groundwater",
    "category": "Monitoring Well",
    "description": "Shallow water table sensitive to sewer leaks. High fecal coliform and nitrate concentrations confirm domestic sewage contamination.",
    "district": "Srinagar",
    "watershed": "Dal-Nigeen Catchment",
    "elevation": 1585,
    "coordinates": {
      "lat": 34.0712,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 6.9,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 650,
      "temperature": 15,
      "nitrates": 28.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 420,
      "fecalColiform": 85,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 350,
      "waterLevel": 3.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-anantnag-karst-discharge",
    "slug": "gw-anantnag-karst-discharge",
    "name": "Kokernag Karst Recharge Observation Zone",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "The karst channel acts as a direct link between high-altitude snowmelt sinkholes and valley spring discharges. Highly responsive to climate warming.",
    "district": "Anantnag",
    "watershed": "Upper Jhelum Catchment",
    "elevation": 2012,
    "coordinates": {
      "lat": 33.5855,
      "lng": 75.3125
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 220,
      "temperature": 15,
      "nitrates": 2.1,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 150,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 650,
      "waterLevel": 120,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-pulwama-industrial-monitoring",
    "slug": "gw-pulwama-industrial-monitoring",
    "name": "Lassipora Industrial Area Deep Observation Well",
    "type": "groundwater",
    "category": "Monitoring Well",
    "description": "Chemical effluents and inadequate wastewater treatment at nearby leather/textile units present severe contamination risks to Karewa groundwater.",
    "district": "Pulwama",
    "watershed": "Sasara Watershed",
    "elevation": 1640,
    "coordinates": {
      "lat": 33.7915,
      "lng": 74.9212
    },
    "waterQuality": {
      "pH": 6.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 910,
      "temperature": 15,
      "nitrates": 34.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 580,
      "fecalColiform": 4,
      "lastTested": "2026-06-16",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 180,
      "waterLevel": 85.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-jammu-kandi-monitoring-1",
    "slug": "gw-jammu-kandi-monitoring-1",
    "name": "Jammu Kandi PHE Deep Tube Well 3",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "High-permeability matrix allows rapid recharge but high extraction rates combined with reduced forest cover recharge have caused water table drop.",
    "district": "Jammu",
    "watershed": "Tawi Sub-Basin",
    "elevation": 350,
    "coordinates": {
      "lat": 32.7412,
      "lng": 74.8856
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 340,
      "temperature": 15,
      "nitrates": 9.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 220,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 280,
      "waterLevel": 95.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-samba-industrial-well",
    "slug": "gw-samba-industrial-well",
    "name": "Samba SIDCO Deep Tube Well-3",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "High nitrate and heavy metals. High arsenic concentration (0.012 mg/L) exceeds the WHO drinking water limit of 0.01 mg/L.",
    "district": "Samba",
    "watershed": "Basantar Catchment",
    "elevation": 290,
    "coordinates": {
      "lat": 32.5512,
      "lng": 75.1186
    },
    "waterQuality": {
      "pH": 6.8,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 950,
      "temperature": 15,
      "nitrates": 42.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 620,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 240,
      "waterLevel": 65.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-leh-alluvial-well-1",
    "slug": "gw-leh-alluvial-well-1",
    "name": "Leh Town PHE Deep Tube Well 1",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Highly clean glacial water. Extremely vulnerable to climate warming since the aquifer recharge is entirely driven by seasonal snow and ice melt.",
    "district": "Leh",
    "watershed": "Indus Basin (Ladakh)",
    "elevation": 3500,
    "coordinates": {
      "lat": 34.1524,
      "lng": 77.5812
    },
    "waterQuality": {
      "pH": 7.8,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 180,
      "temperature": 15,
      "nitrates": 4.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 110,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 85,
      "waterLevel": 42.1,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-muzaffarabad-well-1",
    "slug": "gw-muzaffarabad-well-1",
    "name": "Muzaffarabad PHE Municipal Tube Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Drains dolomite and karst limestone. Sewage leaks from urban core present high microbiological risks; regular disinfection is critical.",
    "district": "Muzaffarabad",
    "watershed": "Neelum AJK Basin",
    "elevation": 720,
    "coordinates": {
      "lat": 34.3621,
      "lng": 73.4715
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 480,
      "temperature": 15,
      "nitrates": 18.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 310,
      "fecalColiform": 45,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 450,
      "waterLevel": 48.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-gilgit-fan-well-1",
    "slug": "gw-gilgit-fan-well-1",
    "name": "Gilgit City PHE Fan Tube Well-1",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Very clear mountain water. The fan acts as a primary local water storage buffer during winter freeze when surface flows are dry.",
    "district": "Gilgit",
    "watershed": "Gilgit Basin",
    "elevation": 1480,
    "coordinates": {
      "lat": 35.9124,
      "lng": 74.3418
    },
    "waterQuality": {
      "pH": 7.6,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 210,
      "temperature": 15,
      "nitrates": 3.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 130,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 110,
      "waterLevel": 32.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kupwara-handpump-1",
    "slug": "gw-kupwara-handpump-1",
    "name": "Kupwara Town Municipal Hand Pump",
    "type": "groundwater",
    "category": "Hand Pump",
    "description": "Iron concentrations slightly elevated (0.75 mg/L), exceeding drinking water desirable limits, but suitable after simple sand filtration.",
    "district": "Kupwara",
    "watershed": "Lolab Catchment",
    "elevation": 1580,
    "coordinates": {
      "lat": 34.5262,
      "lng": 74.2541
    },
    "waterQuality": {
      "pH": 7.1,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 480,
      "temperature": 15,
      "nitrates": 18.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 310,
      "fecalColiform": 12,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 340,
      "waterLevel": 15.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-rspura-tubewell-1",
    "slug": "gw-rspura-tubewell-1",
    "name": "R.S. Pura Basmati Irrigation Tube Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "High nitrate levels (38.4 mg/L) caused by intense synthetic fertilizer usage in surrounding basmati rice paddies. Drawdown rates monitored closely.",
    "district": "Jammu",
    "watershed": "Ranbir Canal Catchment",
    "elevation": 285,
    "coordinates": {
      "lat": 32.6124,
      "lng": 74.7315
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 450,
      "temperature": 15,
      "nitrates": 38.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 290,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 260,
      "waterLevel": 78.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kathua-monitoring-1",
    "slug": "gw-kathua-monitoring-1",
    "name": "Kathua SIDCO Industrial Piezometer",
    "type": "groundwater",
    "category": "Monitoring Well",
    "description": "Groundwater exhibits elevated TDS and heavy metals (iron 0.75 mg/L, trace nickel). Industrial discharge is the suspected source.",
    "district": "Kathua",
    "watershed": "Ujh Catchment",
    "elevation": 305,
    "coordinates": {
      "lat": 32.3812,
      "lng": 75.5216
    },
    "waterQuality": {
      "pH": 6.6,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 990,
      "temperature": 15,
      "nitrates": 45.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 650,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 290,
      "waterLevel": 42.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-udhampur-kandi-1",
    "slug": "gw-udhampur-kandi-1",
    "name": "Udhampur Kandi Observation Station",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Clean Kandi gravel aquifer water, but highly sensitive to local forest clearing in the hill tracts, causing declining water table trends.",
    "district": "Udhampur",
    "watershed": "Tawi Basin",
    "elevation": 750,
    "coordinates": {
      "lat": 32.9214,
      "lng": 75.1418
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 290,
      "temperature": 15,
      "nitrates": 8.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 180,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 240,
      "waterLevel": 85.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-ganderbal-wetland-aquifer",
    "slug": "gw-ganderbal-wetland-aquifer",
    "name": "Shallabugh Wetland Recharge Site",
    "type": "groundwater",
    "category": "Wetland Aquifer Site",
    "description": "High water table strongly linked to Shallabugh Wetland. Fecal coliforms (45 MPN/100ml) fluctuate seasonally with migratory waterfowl arrival.",
    "district": "Ganderbal",
    "watershed": "Shallabugh Wetland Catchment",
    "elevation": 1582,
    "coordinates": {
      "lat": 34.1812,
      "lng": 74.7315
    },
    "waterQuality": {
      "pH": 6.9,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 320,
      "temperature": 15,
      "nitrates": 5.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 210,
      "fecalColiform": 45,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 480,
      "waterLevel": 2.1,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kargil-suru-borewell",
    "slug": "gw-kargil-suru-borewell",
    "name": "Kargil PHE Suru Valley Borewell",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Clean glacial meltwater aquifer. Highly dependent on stable winter snowpack for recharge.",
    "district": "Kargil",
    "watershed": "Suru Basin",
    "elevation": 2680,
    "coordinates": {
      "lat": 34.5512,
      "lng": 76.1215
    },
    "waterQuality": {
      "pH": 7.6,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 210,
      "temperature": 15,
      "nitrates": 2.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 140,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 110,
      "waterLevel": 28.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-chushul-obs-well",
    "slug": "gw-chushul-obs-well",
    "name": "Chushul Valley Cold Desert Observation Well",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Fluoride and arsenic levels are naturally elevated (Fluoride 1.4 mg/L) due to regional geothermal weathering of granite rocks.",
    "district": "Leh",
    "watershed": "Pangong Tso Basin",
    "elevation": 4350,
    "coordinates": {
      "lat": 33.5812,
      "lng": 78.6514
    },
    "waterQuality": {
      "pH": 7.7,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 240,
      "temperature": 15,
      "nitrates": 1.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 160,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 75,
      "waterLevel": 18.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kotli-springshed-well",
    "slug": "gw-kotli-springshed-well",
    "name": "Kotli Springshed Aquifer Supply Well",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Taps fractured Murree sandstone. Highly dependent on structural faults for permeability. Slight coliform presence requires local chlorination.",
    "district": "Kotli",
    "watershed": "Poonch River Basin",
    "elevation": 610,
    "coordinates": {
      "lat": 33.5124,
      "lng": 73.9015
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 490,
      "temperature": 15,
      "nitrates": 14.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 320,
      "fecalColiform": 15,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 310,
      "waterLevel": 35.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-mirpur-reservoir-well",
    "slug": "gw-mirpur-reservoir-well",
    "name": "Mirpur Reservoir Fringe Supply Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Strong hydrological interaction with Mangla Reservoir levels. Water table remains stable due to consistent reservoir seepage.",
    "district": "Mirpur",
    "watershed": "Mangla Catchment",
    "elevation": 310,
    "coordinates": {
      "lat": 33.1512,
      "lng": 73.7415
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 390,
      "temperature": 15,
      "nitrates": 11.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 260,
      "fecalColiform": 8,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 350,
      "waterLevel": 58.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-skardu-fan-well",
    "slug": "gw-skardu-fan-well",
    "name": "Skardu Municipal Alluvial Fan Well",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Highly clean alpine fan water. Very sensitive to climate warming and changes in seasonal snowfall patterns.",
    "district": "Skardu",
    "watershed": "Skardu Valley plain",
    "elevation": 2230,
    "coordinates": {
      "lat": 35.2912,
      "lng": 75.6315
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 190,
      "temperature": 15,
      "nitrates": 3.1,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 110,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 95,
      "waterLevel": 38.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-bandipora-shore-well",
    "slug": "gw-bandipora-shore-well",
    "name": "Wular Shore Observation Piezometer",
    "type": "groundwater",
    "category": "Wetland Aquifer Site",
    "description": "Shallow water table in close contact with Wular Lake. High fecal coliform and nitrate content confirms seepage of untreated sewage from shoreline communities.",
    "district": "Bandipora",
    "watershed": "Wular Catchment",
    "elevation": 1580,
    "coordinates": {
      "lat": 34.4215,
      "lng": 74.6314
    },
    "waterQuality": {
      "pH": 7.1,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 630,
      "temperature": 15,
      "nitrates": 25.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 410,
      "fecalColiform": 65,
      "lastTested": "2026-06-16",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 420,
      "waterLevel": 1.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-doda-fluoride-obs",
    "slug": "gw-doda-fluoride-obs",
    "name": "Doda Valley Fluoride Observation Station",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Well-documented geogenic fluoride hotspot in Doda district. Natural weathering of biotite schists releases fluoride, reaching 6.8 mg/L.",
    "district": "Doda",
    "watershed": "Chenab Basin",
    "elevation": 1100,
    "coordinates": {
      "lat": 33.0124,
      "lng": 75.7145
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 370,
      "temperature": 15,
      "nitrates": 4.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 240,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 280,
      "waterLevel": 52.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-bagh-spring-well",
    "slug": "gw-bagh-spring-well",
    "name": "Bagh Valley Public Springshed Well",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "High microbial contamination (85 MPN/100ml fecal coliforms) due to close proximity to domestic soak pits. Water is unsafe without boiling or disinfection.",
    "district": "Bagh",
    "watershed": "Bagh Catchment",
    "elevation": 1150,
    "coordinates": {
      "lat": 33.9812,
      "lng": 73.7815
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 340,
      "temperature": 15,
      "nitrates": 12.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 220,
      "fecalColiform": 85,
      "lastTested": "2026-06-16",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 310,
      "waterLevel": 24.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-srinagar-wetland-piezometer",
    "slug": "gw-srinagar-wetland-piezometer",
    "name": "Khushalsar Lake Shore Piezometer",
    "type": "groundwater",
    "category": "Wetland Aquifer Site",
    "description": "Severe contamination (95 MPN/100ml fecal coliform, 28.5 mg/L Nitrate) caused by raw sewage intrusion and lack of household wastewater treatment in old Srinagar.",
    "district": "Srinagar",
    "watershed": "Khushalsar Basin",
    "elevation": 1581,
    "coordinates": {
      "lat": 34.1262,
      "lng": 74.7915
    },
    "waterQuality": {
      "pH": 7,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 840,
      "temperature": 15,
      "nitrates": 28.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 550,
      "fecalColiform": 95,
      "lastTested": "2026-06-16",
      "status": "critical",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 460,
      "waterLevel": 1.6,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-muzaffarabad-domel-piezometer",
    "slug": "gw-muzaffarabad-domel-piezometer",
    "name": "Muzaffarabad Domel Piezometer",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Stable piezometer monitoring site. Reflects good hydraulic connection with river bed gravels.",
    "district": "Muzaffarabad",
    "watershed": "Neelum-Jhelum Confluence",
    "elevation": 720,
    "coordinates": {
      "lat": 34.3724,
      "lng": 73.4718
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 420,
      "temperature": 15,
      "nitrates": 6.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 280,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 380,
      "waterLevel": 45.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-skardu-sadpara-springshed",
    "slug": "gw-skardu-sadpara-springshed",
    "name": "Sadpara Springshed Aquifer Node",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Pristine mountain springshed aquifer. Highly clean glacial water serving the local Sadpara village.",
    "district": "Skardu",
    "watershed": "Sadpara Basin",
    "elevation": 2630,
    "coordinates": {
      "lat": 35.2215,
      "lng": 75.6114
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 150,
      "temperature": 15,
      "nitrates": 1.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 95,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 105,
      "waterLevel": 15.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-baramulla-pattan-1",
    "slug": "gw-baramulla-pattan-1",
    "name": "Pattan Town Piezometer",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Stable groundwater levels observed historically. POTW monitoring site for local baseline parameter checks.",
    "district": "Baramulla",
    "watershed": "Ningli Catchment",
    "elevation": 1585,
    "coordinates": {
      "lat": 34.1612,
      "lng": 74.5516
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 430,
      "temperature": 15,
      "nitrates": 8.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 280,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 360,
      "waterLevel": 14.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-reasi-katra-1",
    "slug": "gw-reasi-katra-1",
    "name": "Katra Vaishno Devi Municipal Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Extreme seasonal drawdown observed due to floating pilgrim population water demands. Level decline of ~0.6m/year monitored closely.",
    "district": "Reasi",
    "watershed": "Tawi Basin",
    "elevation": 754,
    "coordinates": {
      "lat": 32.9912,
      "lng": 74.9315
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 370,
      "temperature": 15,
      "nitrates": 14.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 240,
      "fecalColiform": 15,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 230,
      "waterLevel": 92.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kishtwar-town-1",
    "slug": "gw-kishtwar-town-1",
    "name": "Kishtwar Municipal PHE Borewell",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Potable, low-mineralization water. Aquifer yield depends entirely on secondary fracture connectivity.",
    "district": "Kishtwar",
    "watershed": "Chenab Basin",
    "elevation": 1630,
    "coordinates": {
      "lat": 33.3124,
      "lng": 75.7615
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 280,
      "temperature": 15,
      "nitrates": 4.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 180,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 270,
      "waterLevel": 48.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-poonch-town-1",
    "slug": "gw-poonch-town-1",
    "name": "Poonch City Water Supply Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Direct hydraulic connection with the Poonch River. Water table fluctuations mirror river seasonal discharge peaks.",
    "district": "Poonch",
    "watershed": "Poonch River Catchment",
    "elevation": 980,
    "coordinates": {
      "lat": 33.7724,
      "lng": 74.0915
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 320,
      "temperature": 15,
      "nitrates": 9.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 210,
      "fecalColiform": 5,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 340,
      "waterLevel": 32.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-rajouri-monitoring-1",
    "slug": "gw-rajouri-monitoring-1",
    "name": "CGWB Rajouri Observation Site",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Stable groundwater baseline site. Undergoes minor seasonal fluctuation with Tawi river level shifts.",
    "district": "Rajouri",
    "watershed": "Munawar Tawi Catchment",
    "elevation": 915,
    "coordinates": {
      "lat": 33.3812,
      "lng": 74.3016
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 400,
      "temperature": 15,
      "nitrates": 11.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 260,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 290,
      "waterLevel": 28.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-neelum-kel-1",
    "slug": "gw-neelum-kel-1",
    "name": "Kel Bazaar Public Hand Pump",
    "type": "groundwater",
    "category": "Hand Pump",
    "description": "Moderate microbial contamination (18 MPN/100ml) from unlined septic tanks in Kel Bazaar. Water treatment recommended.",
    "district": "Neelum",
    "watershed": "Neelum Basin",
    "elevation": 2090,
    "coordinates": {
      "lat": 34.8214,
      "lng": 74.3512
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 180,
      "temperature": 15,
      "nitrates": 2.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 120,
      "fecalColiform": 18,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 260,
      "waterLevel": 12.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-bhimber-town-1",
    "slug": "gw-bhimber-town-1",
    "name": "Bhimber Plain Municipal Tube Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Stable and potable water. High mineral content within national standards.",
    "district": "Bhimber",
    "watershed": "Chenab Basin fringe",
    "elevation": 275,
    "coordinates": {
      "lat": 32.9812,
      "lng": 74.0815
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 520,
      "temperature": 15,
      "nitrates": 18.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 340,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 310,
      "waterLevel": 62.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-ghanche-khaplu-1",
    "slug": "gw-ghanche-khaplu-1",
    "name": "Khaplu Bazaar PHE Borewell",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Excellent quality water. Fully reliant on glaciers for sustainable seasonal recharge.",
    "district": "Ghanche",
    "watershed": "Shyok Basin",
    "elevation": 2560,
    "coordinates": {
      "lat": 35.1612,
      "lng": 76.3315
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 140,
      "temperature": 15,
      "nitrates": 1.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 90,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 90,
      "waterLevel": 42.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-hunza-karimabad-1",
    "slug": "gw-hunza-karimabad-1",
    "name": "Karimabad springshed Aquifer well",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Clean, pristine glacial-fed springshed aquifer water, monitored for local community drinking water schemes.",
    "district": "Hunza",
    "watershed": "Hunza Basin",
    "elevation": 2500,
    "coordinates": {
      "lat": 36.3214,
      "lng": 74.6612
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 130,
      "temperature": 15,
      "nitrates": 1.1,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 85,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 110,
      "waterLevel": 15.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-budgam-chadoora-1",
    "slug": "gw-budgam-chadoora-1",
    "name": "Chadoora Town supply Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Stable Karewa aquifer water supply source serving municipal drinking requirements.",
    "district": "Budgam",
    "watershed": "Doodhganga Catchment",
    "elevation": 1640,
    "coordinates": {
      "lat": 33.9124,
      "lng": 74.8015
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 400,
      "temperature": 15,
      "nitrates": 11.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 260,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 350,
      "waterLevel": 52.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-pulwama-tral-1",
    "slug": "gw-pulwama-tral-1",
    "name": "Tral Town Supply Well",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Stable springshed aquifer feeding regional town supply. Highly dependent on fracture system health.",
    "district": "Pulwama",
    "watershed": "Tral Basin",
    "elevation": 1680,
    "coordinates": {
      "lat": 33.9312,
      "lng": 75.1115
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 340,
      "temperature": 15,
      "nitrates": 8.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 220,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 380,
      "waterLevel": 42.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-shopian-town-1",
    "slug": "gw-shopian-town-1",
    "name": "Shopian Municipal Supply Well",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Clean Karewa gravelly aquifer supply well serving the horticultural town of Shopian.",
    "district": "Shopian",
    "watershed": "Rambiara Catchment",
    "elevation": 2050,
    "coordinates": {
      "lat": 33.7215,
      "lng": 74.8315
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 290,
      "temperature": 15,
      "nitrates": 6.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 190,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 360,
      "waterLevel": 68.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kulgam-town-1",
    "slug": "gw-kulgam-town-1",
    "name": "Kulgam Main Water Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Strongly charged alluvial plain well, water table remains stable due to consistent channel seepage from the Veshaw River.",
    "district": "Kulgam",
    "watershed": "Veshaw Catchment",
    "elevation": 1600,
    "coordinates": {
      "lat": 33.6415,
      "lng": 75.0214
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 320,
      "temperature": 15,
      "nitrates": 5.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 210,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 410,
      "waterLevel": 35.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-baramulla-sopore-1",
    "slug": "gw-baramulla-sopore-1",
    "name": "Sopore Agriculture Well",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Moderate microbial (12 MPN/100ml) and elevated nitrate content (22.4 mg/L) caused by surface runoff drainage from local agricultural markets and orchards.",
    "district": "Baramulla",
    "watershed": "Wular Catchment",
    "elevation": 1580,
    "coordinates": {
      "lat": 34.3015,
      "lng": 74.4714
    },
    "waterQuality": {
      "pH": 7.1,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 590,
      "temperature": 15,
      "nitrates": 22.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 390,
      "fecalColiform": 12,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 390,
      "waterLevel": 18.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kupwara-sogam-1",
    "slug": "gw-kupwara-sogam-1",
    "name": "Sogam Lolab Valley Hand Pump",
    "type": "groundwater",
    "category": "Hand Pump",
    "description": "Stable springshed water supply source. Clean and highly suitable for community drinking schemes.",
    "district": "Kupwara",
    "watershed": "Lolab Catchment",
    "elevation": 1620,
    "coordinates": {
      "lat": 34.4812,
      "lng": 74.3812
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 280,
      "temperature": 15,
      "nitrates": 4.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 180,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 350,
      "waterLevel": 12.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-ramban-town-1",
    "slug": "gw-ramban-town-1",
    "name": "Ramban Town PHE Borewell",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Serves local city quarters. Regularly chlorinated. Good mineral balance.",
    "district": "Ramban",
    "watershed": "Bichleri Watershed",
    "elevation": 1150,
    "coordinates": {
      "lat": 33.2442,
      "lng": 75.2415
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 320,
      "temperature": 15,
      "nitrates": 7.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 210,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 290,
      "waterLevel": 45.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-samba-vijaypur-1",
    "slug": "gw-samba-vijaypur-1",
    "name": "Vijaypur Alluvial Tube Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Continuous daily pumping. Shows minor water level decline of ~0.2m/year.",
    "district": "Samba",
    "watershed": "Devika Catchment",
    "elevation": 295,
    "coordinates": {
      "lat": 32.5684,
      "lng": 74.9124
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 410,
      "temperature": 15,
      "nitrates": 11.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 260,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 250,
      "waterLevel": 58.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kathua-hiranagar-1",
    "slug": "gw-kathua-hiranagar-1",
    "name": "Hiranagar Observation Well",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Key trend monitoring site in Kathua outer plains. Water level fluctuations correspond well to rainfall seasons.",
    "district": "Kathua",
    "watershed": "Ravi Sub-basin",
    "elevation": 308,
    "coordinates": {
      "lat": 32.4512,
      "lng": 75.2714
    },
    "waterQuality": {
      "pH": 7.1,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 360,
      "temperature": 15,
      "nitrates": 9.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 235,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 310,
      "waterLevel": 24.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Jammu",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kargil-dras-well",
    "slug": "gw-kargil-dras-well",
    "name": "Dras Valley Moraine Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Pristine glacial water quality. Extreme cold desert climate sensitivity due to glacial melt recharge dependency.",
    "district": "Kargil",
    "watershed": "Dras Catchment",
    "elevation": 3280,
    "coordinates": {
      "lat": 34.4295,
      "lng": 75.7612
    },
    "waterQuality": {
      "pH": 7.6,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 145,
      "temperature": 15,
      "nitrates": 3.1,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 92,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 98,
      "waterLevel": 15.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-leh-nubra-well",
    "slug": "gw-leh-nubra-well",
    "name": "Nubra Valley Alluvial Well",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Crucial source in hyper-arid cold desert Nubra Valley. Connected to Diskit wetland hydrology.",
    "district": "Leh",
    "watershed": "Shyok Catchment",
    "elevation": 3150,
    "coordinates": {
      "lat": 34.5421,
      "lng": 77.2612
    },
    "waterQuality": {
      "pH": 7.7,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 160,
      "temperature": 15,
      "nitrates": 3.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 105,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 75,
      "waterLevel": 22.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Ladakh",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-sudhnoti-pallandri-1",
    "slug": "gw-sudhnoti-pallandri-1",
    "name": "Pallandri Springshed Aquifer Well",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Relies heavily on forest cover for springshed recharge. Shows minor microbial presence during monsoon.",
    "district": "Sudhnoti",
    "watershed": "Poonch River Basin",
    "elevation": 1370,
    "coordinates": {
      "lat": 33.7125,
      "lng": 73.6914
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 390,
      "temperature": 15,
      "nitrates": 10.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 245,
      "fecalColiform": 8,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 380,
      "waterLevel": 38.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-haveli-forward-kahuta",
    "slug": "gw-haveli-forward-kahuta",
    "name": "Forward Kahuta Springshed Node",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Gravity-fed spring system tapping fractured rock. High water quality, but sensitive to seasonal rainfall shifts.",
    "district": "Haveli",
    "watershed": "Betar Catchment",
    "elevation": 1402,
    "coordinates": {
      "lat": 33.8824,
      "lng": 74.1114
    },
    "waterQuality": {
      "pH": 7.1,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 310,
      "temperature": 15,
      "nitrates": 6.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 195,
      "fecalColiform": 4,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 410,
      "waterLevel": 29.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-poonch-rawalakot-1",
    "slug": "gw-poonch-rawalakot-1",
    "name": "Rawalakot PHE Municipal Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Urban core displays water table drop of ~0.5m/year. Leakage from household septic tanks causes high fecal coliform counts.",
    "district": "Poonch (AJK)",
    "watershed": "Poonch River Catchment",
    "elevation": 1615,
    "coordinates": {
      "lat": 33.8584,
      "lng": 73.7615
    },
    "waterQuality": {
      "pH": 7,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 520,
      "temperature": 15,
      "nitrates": 24.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 340,
      "fecalColiform": 35,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 350,
      "waterLevel": 52.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-hattian-bala-confluence",
    "slug": "gw-hattian-bala-confluence",
    "name": "Hattian Bala Confluence Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Located near Jhelum river banks. High sand filtration capacity keeps fecal coliforms at zero, though nitrates are slightly elevated due to agricultural slopes.",
    "district": "Hattian Bala",
    "watershed": "Jhelum AJK Basin",
    "elevation": 890,
    "coordinates": {
      "lat": 34.3412,
      "lng": 73.7425
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 345,
      "temperature": 15,
      "nitrates": 12.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 220,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 430,
      "waterLevel": 34.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "AJK",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-nagar-valley-aquifer",
    "slug": "gw-nagar-valley-aquifer",
    "name": "Nagar Valley Proglacial Aquifer",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Pristine glacio-fluvial source. Highly dependent on Minapin glacier meltwater flows.",
    "district": "Nagar",
    "watershed": "Hunza River Basin",
    "elevation": 2350,
    "coordinates": {
      "lat": 36.2584,
      "lng": 74.8124
    },
    "waterQuality": {
      "pH": 7.5,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 135,
      "temperature": 15,
      "nitrates": 2.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 85,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 115,
      "waterLevel": 41.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-ghizer-gahkuch-1",
    "slug": "gw-ghizer-gahkuch-1",
    "name": "Gahkuch Town PHE Fan Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Crucial local drinking scheme. High quality glacial water with minimal human interference.",
    "district": "Ghizer",
    "watershed": "Ghizer River Basin",
    "elevation": 1860,
    "coordinates": {
      "lat": 36.1684,
      "lng": 73.7615
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 155,
      "temperature": 15,
      "nitrates": 3.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 98,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 105,
      "waterLevel": 35.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-astore-town-spring",
    "slug": "gw-astore-town-spring",
    "name": "Astore Town Spring Aquifer",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Pristine spring flow sourced directly from the Rama glacial basin.",
    "district": "Astore",
    "watershed": "Astore Basin",
    "elevation": 2280,
    "coordinates": {
      "lat": 35.3624,
      "lng": 74.8512
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 140,
      "temperature": 15,
      "nitrates": 2.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 88,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 140,
      "waterLevel": 28.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-diamer-chilas-1",
    "slug": "gw-diamer-chilas-1",
    "name": "Chilas Cold Desert Borewell",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Located in hyper-arid Chilas region. Evaporation is extremely high. Shows slightly elevated geogenic fluoride and moderate fecal contamination due to poor urban septics.",
    "district": "Diamer",
    "watershed": "Indus Basin (Diamer)",
    "elevation": 1260,
    "coordinates": {
      "lat": 35.4184,
      "lng": 74.1012
    },
    "waterQuality": {
      "pH": 7.6,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 590,
      "temperature": 15,
      "nitrates": 18.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 390,
      "fecalColiform": 12,
      "lastTested": "2026-06-16",
      "status": "moderate",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 65,
      "waterLevel": 48.2,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-shigar-alluvial-well",
    "slug": "gw-shigar-alluvial-well",
    "name": "Shigar Valley Sand Plain Well",
    "type": "groundwater",
    "category": "Borewell",
    "description": "Drains pristine Karakoram snowmelt. Excellent chemical quality and very low minerals.",
    "district": "Shigar",
    "watershed": "Shigar Catchment",
    "elevation": 2230,
    "coordinates": {
      "lat": 35.4215,
      "lng": 75.7284
    },
    "waterQuality": {
      "pH": 7.4,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 142,
      "temperature": 15,
      "nitrates": 2.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 90,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 125,
      "waterLevel": 21.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-kharmang-riparian",
    "slug": "gw-kharmang-riparian",
    "name": "Kharmang Valley Riparian Aquifer",
    "type": "groundwater",
    "category": "Hand Pump",
    "description": "A shallow alluvial hand pump. Highly reliant on direct river level. Safe from local microbiological issues.",
    "district": "Kharmang",
    "watershed": "Indus Basin (Kharmang)",
    "elevation": 2420,
    "coordinates": {
      "lat": 34.9214,
      "lng": 76.1284
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 175,
      "temperature": 15,
      "nitrates": 3.8,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 112,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 95,
      "waterLevel": 12.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-gupis-yasin-phander",
    "slug": "gw-gupis-yasin-phander",
    "name": "Phander Lake Recharge Aquifer",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Hydrologically linked to Phander Lake outwash. Highly stable flow and exceptionally pristine quality.",
    "district": "Gupis-Yasin",
    "watershed": "Ghizer Basin",
    "elevation": 2910,
    "coordinates": {
      "lat": 36.1724,
      "lng": 72.9512
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 125,
      "temperature": 15,
      "nitrates": 2.2,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 80,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 150,
      "waterLevel": 18.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Gilgit-Baltistan",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-anantnag-achabal-1",
    "slug": "gw-anantnag-achabal-1",
    "name": "Achabal Karst Discharge Zone",
    "type": "groundwater",
    "category": "Spring-shed Aquifer",
    "description": "Famous karst aquifer system feeding the historic Achabal springs. Extremely high water velocity through subterranean channels.",
    "district": "Anantnag",
    "watershed": "Upper Jhelum Catchment",
    "elevation": 1670,
    "coordinates": {
      "lat": 33.6821,
      "lng": 75.2312
    },
    "waterQuality": {
      "pH": 7.3,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 240,
      "temperature": 15,
      "nitrates": 3.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 165,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "excellent",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 610,
      "waterLevel": 105,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-ganderbal-kangan-1",
    "slug": "gw-ganderbal-kangan-1",
    "name": "Kangan Alluvial Piezometer",
    "type": "groundwater",
    "category": "Observation Station",
    "description": "Piezometer placed in high-permeability gravel bed. Directly tracks Sindh River hydrological level fluctuations.",
    "district": "Ganderbal",
    "watershed": "Sindh Catchment",
    "elevation": 1810,
    "coordinates": {
      "lat": 34.2612,
      "lng": 74.9015
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 250,
      "temperature": 15,
      "nitrates": 5.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 155,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 490,
      "waterLevel": 10.5,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-bandipora-town-1",
    "slug": "gw-bandipora-town-1",
    "name": "Bandipora Town PHE Well",
    "type": "groundwater",
    "category": "Tube Well",
    "description": "Regularly checked by Jal Shakti lab. Clean water with clay seal protecting from shallow agricultural leachates.",
    "district": "Bandipora",
    "watershed": "Madhumati Watershed",
    "elevation": 1588,
    "coordinates": {
      "lat": 34.4212,
      "lng": 74.6515
    },
    "waterQuality": {
      "pH": 7.2,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 370,
      "temperature": 15,
      "nitrates": 9.5,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 230,
      "fecalColiform": 0,
      "lastTested": "2026-06-16",
      "status": "good",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 280,
      "waterLevel": 32.4,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  },
  {
    "id": "gw-srinagar-bemina-piezometer",
    "slug": "gw-srinagar-bemina-piezometer",
    "name": "Bemina Marsh Shore Piezometer",
    "type": "groundwater",
    "category": "Wetland Aquifer Site",
    "description": "Shallow, waterlogged water table. Extremely high sewage contamination risk due to surrounding residential expansion and unlined drains.",
    "district": "Srinagar",
    "watershed": "Bemina Flood Basin Catchment",
    "elevation": 1582,
    "coordinates": {
      "lat": 34.0812,
      "lng": 74.7815
    },
    "waterQuality": {
      "pH": 6.8,
      "dissolvedOxygen": 0,
      "turbidity": 1,
      "conductivity": 710,
      "temperature": 15,
      "nitrates": 21.4,
      "phosphates": null,
      "biologicalOxygenDemand": null,
      "totalDissolvedSolids": 460,
      "fecalColiform": 75,
      "lastTested": "2026-06-16",
      "status": "poor",
      "trends": {
        "pH": "stable",
        "dissolvedOxygen": "stable",
        "turbidity": "stable"
      }
    },
    "hydrologicalData": {
      "rechargeRate": 380,
      "waterLevel": 1.8,
      "seasonalVariation": "perennial",
      "source": "groundwater",
      "floodRisk": "low"
    },
    "region": "Kashmir Core",
    "verificationStatus": "verified",
    "createdAt": "2026-06-16T00:00:00Z",
    "updatedAt": "2026-06-16T00:00:00Z"
  }
];

// Data access functions
export const getWaterEntities = {
  lakes: {
    all: () => lakesData,
    bySlug: (slug: string) => lakesData.find(l => l.slug === slug),
    byDistrict: (district: string) => lakesData.filter(l => l.district === district),
    byWatershed: (watershed: string) => lakesData.filter(l => l.watershed === watershed),
    byQuality: (status: string) => lakesData.filter(l => l.waterQuality?.status === status),
  },
  wetlands: {
    all: () => wetlandsData,
    bySlug: (slug: string) => wetlandsData.find(w => w.slug === slug),
    byDistrict: (district: string) => wetlandsData.filter(w => w.district === district),
    byWatershed: (watershed: string) => wetlandsData.filter(w => w.watershed === watershed),
    byCategory: (category: string) => wetlandsData.filter(w => w.category === category),
  },
  rivers: {
    all: () => riversData,
    bySlug: (slug: string) => riversData.find(r => r.slug === slug),
    byDistrict: (district: string) => riversData.filter(r => r.district === district),
    byType: (type: string) => riversData.filter(r => r.type === type),
    byFloodRisk: (risk: string) => riversData.filter(r => r.hydrologicalData?.floodRisk === risk),
  },
  springs: {
    all: () => springsData,
    bySlug: (slug: string) => springsData.find(s => s.slug === slug),
    byDistrict: (district: string) => springsData.filter(s => s.district === district),
    byCategory: (category: string) => springsData.filter(s => s.category === category),
  },
  watersheds: {
    all: () => watershedsData,
    bySlug: (slug: string) => watershedsData.find(w => w.slug === slug),
    byDistrict: (district: string) => watershedsData.filter(w => w.district === district),
    byCategory: (category: string) => watershedsData.filter(w => w.category === category),
  },
  glaciers: {
    all: () => glaciersData,
    bySlug: (slug: string) => glaciersData.find(g => g.slug === slug),
    byDistrict: (district: string) => glaciersData.filter(g => g.district === district),
    byCategory: (category: string) => glaciersData.filter(g => g.category === category),
  },
  waterQuality: {
    all: () => waterQualitySites,
    bySlug: (slug: string) => waterQualitySites.find(w => w.slug === slug),
    byDistrict: (district: string) => waterQualitySites.filter(w => w.district === district),
    byStatus: (status: string) => waterQualitySites.filter(w => w.waterQuality?.status === status),
  },
  fisheries: {
    all: () => fisheriesData,
    bySlug: (slug: string) => fisheriesData.find(f => f.slug === slug),
    byDistrict: (district: string) => fisheriesData.filter(f => f.district === district),
    byType: (type: string) => fisheriesData.filter(f => f.fisheryData?.fisheryType === type),
  },
  floodRisk: {
    all: () => floodRiskZones,
    bySlug: (slug: string) => floodRiskZones.find(f => f.slug === slug),
    byDistrict: (district: string) => floodRiskZones.filter(f => f.district === district),
    byRiskLevel: (level: string) => floodRiskZones.filter(f => f.floodRiskData?.riskLevel === level),
  },
  restoration: {
    all: () => restorationSites,
    bySlug: (slug: string) => restorationSites.find(r => r.slug === slug),
    byDistrict: (district: string) => restorationSites.filter(r => r.district === district),
    byStatus: (status: string) => restorationSites.filter(r => r.restorationData?.status === status),
  },
  groundwater: {
    all: () => groundwaterData,
    bySlug: (slug: string) => groundwaterData.find(g => g.slug === slug),
    byDistrict: (district: string) => groundwaterData.filter(g => g.district === district),
    byCategory: (category: string) => groundwaterData.filter(g => g.category === category),
  },
  all: {
    byType: (type: string) => {
      switch (type) {
        case 'lake': return lakesData;
        case 'wetland': return wetlandsData;
        case 'river': return riversData.filter(r => r.type === 'river');
        case 'stream': return riversData.filter(r => r.type === 'stream');
        case 'spring': return springsData;
        case 'watershed': return watershedsData;
        case 'glacier': return glaciersData;
        case 'water-quality': return waterQualitySites;
        case 'fishery': return fisheriesData;
        case 'flood-zone': return floodRiskZones;
        case 'restoration-site': return restorationSites;
        case 'groundwater': return groundwaterData;
        default: return [];
      }
    },
    byDistrict: (district: string) => [
      ...lakesData.filter(l => l.district === district),
      ...wetlandsData.filter(w => w.district === district),
      ...riversData.filter(r => r.district === district),
      ...springsData.filter(s => s.district === district),
      ...watershedsData.filter(w => w.district === district),
      ...glaciersData.filter(g => g.district === district),
      ...groundwaterData.filter(g => g.district === district),
    ],
    byWatershed: (watershed: string) => [
      ...lakesData.filter(l => l.watershed === watershed),
      ...wetlandsData.filter(w => w.watershed === watershed),
      ...riversData.filter(r => r.watershed === watershed),
      ...watershedsData.filter(w => w.watershed === watershed),
      ...groundwaterData.filter(g => g.watershed === watershed),
    ],
  },
};

// Updated metrics
export const updatedWaterSystemsMetrics = {
  totalLakes: lakesData.length,
  totalWetlands: wetlandsData.length,
  totalRivers: riversData.filter(r => r.type === 'river').length,
  totalStreams: riversData.filter(r => r.type === 'stream').length,
  totalSprings: springsData.length,
  totalWatersheds: watershedsData.length,
  totalGlaciers: glaciersData.length,
  totalWaterQualitySites: waterQualitySites.length,
  totalFisheries: fisheriesData.length,
  totalFloodZones: floodRiskZones.length,
  totalRestorationSites: restorationSites.length,
  totalGroundwater: groundwaterData.length,
  totalWaterEntities: lakesData.length + wetlandsData.length + riversData.length + springsData.length + watershedsData.length + glaciersData.length + groundwaterData.length,
  ramsarSites: (() => {
    const names = new Set();
    const addName = (n: string) => {
      const norm = n.toLowerCase()
        .replace(/wetland.*/, '')
        .replace(/lake.*/, '')
        .replace(/reserve.*/, '')
        .replace(/conservation.*/, '')
        .replace(/ramsar.*/, '')
        .replace(/basin.*/, '')
        .trim();
      names.add(norm);
    };
    wetlandsData.filter(w => w.category.includes('Ramsar') || w.description.toLowerCase().includes('ramsar')).forEach(w => addName(w.name));
    lakesData.filter(l => l.category.includes('Ramsar') || l.description.toLowerCase().includes('ramsar')).forEach(l => addName(l.name));
    return names.size;
  })(),
  criticalQuality: waterQualitySites.filter(w => w.waterQuality?.status === 'critical').length,
  poorQuality: waterQualitySites.filter(w => w.waterQuality?.status === 'poor').length,
  moderateQuality: waterQualitySites.filter(w => w.waterQuality?.status === 'moderate').length,
  goodQuality: waterQualitySites.filter(w => w.waterQuality?.status === 'good').length,
  excellentQuality: waterQualitySites.filter(w => w.waterQuality?.status === 'excellent').length,
};
